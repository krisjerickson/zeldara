"""Round 72 — the latency deep dive (doc 33), part 2: the game's own work per frame, without the drawing.
Headless Chromium draws WebGL on the CPU, which swamps everything else (probe_profile.py: ~97% of the main thread). So here the drawing is
switched off and the game's step (Phaser's update of every scene, the game's code, the timers) is timed on its own — the part that is the
same on any machine — and the drawing load is counted instead (draw calls, objects, glowing ADD sprites, texture memory, canvas pixels).
Run: python tests/probe_js.py [phone]   (phone: 844×390 at 3× pixels, the CPU slowed 4×)"""
import re, os, sys, json
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from harness import PHASER, INDEX
PHONE = len(sys.argv) > 1 and sys.argv[1] == 'phone'
OUT = os.environ.get('PROBE_OUT', '')
HOOK = r"""(()=>{ var P=window.__J={steps:[],parts:{},on:false}; var cb=game.loop.callback; game.loop.callback=function(t,d){ var a=performance.now(); var r=cb.call(this,t,d); if(P.on)P.steps.push(performance.now()-a); return r; };
  var part=function(o,k,label){ var f=o[k]; if(typeof f!=='function'||f._j)return; var g=function(){ var a=performance.now(); try{ return f.apply(this,arguments); } finally { if(P.on){ var d=performance.now()-a, T=P.parts[label]||(P.parts[label]={n:0,ms:0,max:0}); T.n++; T.ms+=d; if(d>T.max)T.max=d; } } }; g._j=1; o[k]=g; };
  game.scene.scenes.forEach(function(s){ part(s.sys,'sceneUpdate','scene update: '+s.sys.settings.key); });
  var ws=game.scene.getScene('World'); ['_updateChunks','_wrMount','_wrUnmount','_movePlayer','_updateWorldMonsters','_updateSpells','_checkInteraction','_runicTick','_updateSiteLabels','_revealFog','_drawWorldFog','_emitUI','_updateLife','_updateLargeAnimals','_updatePlayerProj','_monWake','_updateCamps','_updateCritters','_updateFairies'].forEach(function(k){ part(ws,k,'World.'+k); });
  if(typeof ZScn!=='undefined')part(ZScn,'texture','ZScn.texture (a painting → a texture)'); if(typeof MX!=='undefined')part(MX,'tick','MX.tick (monster brains)');
  P.ph={}; var wj=window.wpChunkJob; if(wj&&!wj._j){ window.wpChunkJob=function(){ var J=wj.apply(this,arguments), st=J.step; J.step=function(b){ var ph=J.phase(), a=performance.now(), r=st.call(J,b), d=performance.now()-a; if(P.on){ var T=P.ph[ph]||(P.ph[ph]={n:0,ms:0,max:0}); T.n++; T.ms+=d; if(d>T.max)T.max=d; } return r; }; return J; }; window.wpChunkJob._j=1; }
})()"""
DRAW = r"""(async()=>{ ZPERF.hookGL(); ZPERF.dc=0; var n=0, t0=performance.now(); await new Promise(function(r){ var f=function(){ n++; if(performance.now()-t0<3000)requestAnimationFrame(f); else r(); }; requestAnimationFrame(f); });
  var ws=game.scene.getScene('World'), L=ws.children.list, vis=0, add=0, txt=0, gfx=0; L.forEach(function(o){ if(!o.visible||o.alpha===0)return; vis++; if(o.blendMode===1)add++; if(o.type==='Text')txt++; if(o.type==='Graphics')gfx++; });
  var mem=0, nt=0; Object.keys(game.textures.list).forEach(function(k){ var T=game.textures.list[k]; (T.source||[]).forEach(function(s){ mem+=(s.width||0)*(s.height||0)*4; nt++; }); });
  return {drawsPerFrame:Math.round(ZPERF.dc/Math.max(1,n)), objects:L.length, visible:vis, addGlow:add, texts:txt, graphics:gfx, textures:nt, textureMB:Math.round(mem/1048576), canvas:game.canvas.width+'x'+game.canvas.height, quality:typeof ZQUAL!=='undefined'?ZQUAL.mode:'', big:Object.keys(game.textures.list).map(function(k){ var s=(game.textures.list[k].source||[])[0]; return s?[k,s.width,s.height]:null; }).filter(Boolean).sort(function(a,b){ return b[1]*b[2]-a[1]*a[2]; }).slice(0,6), dpr:window.devicePixelRatio, zoom:ws.cameras.main.zoom}; })()"""
RESET = "(()=>{ var P=window.__J; P.steps=[]; Object.keys(P.parts).forEach(function(k){ P.parts[k]={n:0,ms:0,max:0}; }); P.t0=performance.now(); P.on=true; })()"
REPORT = r"""(()=>{ var P=window.__J; P.on=false; var S=P.steps.slice().sort(function(a,b){ return a-b; }), q=function(p){ return S.length?Math.round(S[Math.min(S.length-1,Math.floor(S.length*p))]*10)/10:0; }, secs=(performance.now()-P.t0)/1000;
  var parts=Object.keys(P.parts).map(function(k){ var T=P.parts[k]; return {what:k,msPerFrame:Math.round(T.ms/Math.max(1,S.length)*100)/100,max:Math.round(T.max*10)/10,calls:T.n}; }).filter(function(x){ return x.calls; }).sort(function(a,b){ return b.msPerFrame-a.msPerFrame; }).slice(0,12);
  var ph=Object.keys(P.ph||{}).map(function(k){ var T=P.ph[k]; return 'phase '+k+': '+T.n+' slices, '+Math.round(T.ms)+' ms, max '+Math.round(T.max); }); P.ph={};
  return {phases:ph, frames:S.length, fps:Math.round(S.length/secs), stepP50:q(0.5), stepP95:q(0.95), stepMax:q(1), over16:S.filter(function(d){ return d>16.7; }).length, over33:S.filter(function(d){ return d>33; }).length, parts:parts}; })()"""
TP = "(()=>{ var ws=game.scene.getScene('World'), w=ws.wd.waystones.find(function(q){ return q.region===%d; }); ws.player.x=w.x*TILE+16; ws.player.y=(w.y+2)*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y); })()"
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
    ctx = b.new_context(viewport={"width": 844, "height": 390} if PHONE else {"width": 1280, "height": 800}, device_scale_factor=3 if PHONE else 1, is_mobile=PHONE, has_touch=PHONE)
    pg = ctx.new_page(); cdp = ctx.new_cdp_session(pg); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    html = open(INDEX, encoding='utf-8').read(); root = os.path.dirname(os.path.abspath(INDEX))
    def _serve(r):
        u = r.request.url.split('zeldara.test/', 1)[1].split('?')[0]; f = os.path.join(root, u)
        if u.startswith('assets/'): return r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
        return r.fulfill(body=html, content_type="text/html")
    pg.route("http://zeldara.test/**", _serve)
    if PHONE: cdp.send("Emulation.setCPUThrottlingRate", {"rate": 4})
    pg.goto("http://zeldara.test/index.html"+(("?quality="+os.environ["QUALITY"]) if os.environ.get("QUALITY") else "")); pg.wait_for_function("typeof game!=='undefined'&&game.scene&&game.scene.isActive('Title')", timeout=240000)
    res = {'mode': 'phone' if PHONE else 'desktop', 'titleMs': round(pg.evaluate("performance.now()")), 'htmlKB': round(len(html) / 1024)}
    pg.evaluate("(()=>{ try{ ZFT.on=false; ZLEAVE.on=false; ZDeath.auto=true; }catch(e){} window.__ng=performance.now(); game.scene.getScene('Title').scene.start('Boot',{newGame:true}); })()")
    pg.wait_for_function("game.scene.isActive('World')&&!!game.scene.getScene('World').player", timeout=300000); res['newGameMs'] = round(pg.evaluate("performance.now()-__ng"))
    pg.wait_for_timeout(5000); res['draw village'] = pg.evaluate(DRAW); print(res, flush=True)
    pg.evaluate(TP % 4); pg.wait_for_timeout(8000); res['draw realm 4'] = pg.evaluate(DRAW); print('draw realm 4', res['draw realm 4'], flush=True)
    pg.evaluate("(()=>{ var ws=game.scene.getScene('World'); ws.player.x=(CENTER_X+0.5)*TILE; ws.player.y=(CENTER_Y+5)*TILE; ws.player.cont.setPosition(ws.player.x,ws.player.y); })()"); pg.wait_for_timeout(5000)
    pg.evaluate(HOOK); pg.evaluate("(()=>{ window.__render=game.renderer.render; game.renderer.render=function(){}; })()")
    def walk(keys, ms):
        for k in keys: pg.keyboard.down(k); pg.wait_for_timeout(ms); pg.keyboard.up(k)
    def phase(label, setup=None, keys=('ArrowRight', 'ArrowLeft'), ms=3000, settle=0):
        if setup: pg.evaluate(setup)
        if settle: pg.wait_for_timeout(settle)
        pg.evaluate(RESET); walk(keys, ms); r = pg.evaluate(REPORT); res[label] = r
        print('\n==', label, {k: r[k] for k in ['frames', 'fps', 'stepP50', 'stepP95', 'stepMax', 'over16', 'over33']}, flush=True)
        for x in r['parts'][:9]: print('    ', x, flush=True)
        print('     chunk painting by phase (where each slice started):', r.get('phases'), flush=True)
    phase('village (walking)', keys=('ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'))
    for reg in ([1, 2] if os.environ.get('SHORT') else [1, 2, 3, 4]):
        phase('realm %d — the first seconds after arriving (streaming the ground)' % reg, TP % reg, keys=('ArrowRight',), ms=3000)
        phase('realm %d — walking' % reg, None, keys=('ArrowLeft', 'ArrowRight'), ms=3000, settle=3000)
    if not os.environ.get('SHORT'): phase('realm 4 — standing', None, keys=('Shift',), ms=3000)
    res['errors'] = errs[:5]
    if OUT: open(OUT, 'w').write(json.dumps(res, indent=1))
    b.close()
