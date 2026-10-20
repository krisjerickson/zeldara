"""Round 72 — the latency deep dive (doc 33): where the lag comes from.
For each scene of a scripted run it records the frame times (median, 95th percentile, frames over 50 ms), the long tasks, which timers and
which parts of the game's frame cost the most, and the input delay (a key press → the hero moving).
Run:  python tests/probe_latency.py            (desktop size)
      python tests/probe_latency.py phone      (844×390 at 3× pixels, the CPU slowed 4× — a mid-range phone)
Headless Chromium draws WebGL on the CPU (SwiftShader), so the 'render' numbers are far higher than on a real graphics chip; the
JavaScript numbers (update, timers, chunk painting, DOM) are the ones to read."""
import re, os, sys, json
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from harness import PHASER, INDEX
PHONE = len(sys.argv) > 1 and sys.argv[1] == 'phone'
OUT = os.environ.get('PROBE_OUT', '')
INIT = r"""(()=>{ var P=window.__LAT={timers:{},frames:[],long:[],dom:0,t0:performance.now()};
  var wrap=function(fn,kind){ if(typeof fn!=='function')return fn; var src=(fn.name||'')+':'+String(fn).replace(/\s+/g,' ').slice(0,90); return function(){ var a=performance.now(); try{ return fn.apply(this,arguments); } finally { var d=performance.now()-a, T=P.timers[src]||(P.timers[src]={n:0,ms:0,max:0,kind:kind}); T.n++; T.ms+=d; if(d>T.max)T.max=d; } }; };
  var si=window.setInterval; window.setInterval=function(fn,ms){ var a=[].slice.call(arguments); a[0]=wrap(fn,'interval '+ms); return si.apply(window,a); };
  var st=window.setTimeout; window.setTimeout=function(fn,ms){ var a=[].slice.call(arguments); if(typeof fn==='function'&&(ms||0)>=50)a[0]=wrap(fn,'timeout'); return st.apply(window,a); };
  try{ new PerformanceObserver(function(l){ l.getEntries().forEach(function(e){ P.long.push([Math.round(e.startTime),Math.round(e.duration)]); }); }).observe({type:'longtask',buffered:true}); }catch(e){}
  var last=0, tick=function(ts){ if(last)P.frames.push(ts-last); last=ts; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  try{ new MutationObserver(function(m){ P.dom+=m.length; }).observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true}); }catch(e){}
})();"""
# the game's own frame, split: each scene's update and the renderer; the world's big parts
HOOK = r"""(()=>{ var P=window.__LAT; P.parts={}; var part=function(o,k,label){ var f=o[k]; if(typeof f!=='function'||f._lat)return; var g=function(){ var a=performance.now(); try{ return f.apply(this,arguments); } finally { var d=performance.now()-a, T=P.parts[label]||(P.parts[label]={n:0,ms:0,max:0}); T.n++; T.ms+=d; if(d>T.max)T.max=d; } }; g._lat=1; o[k]=g; };
  game.scene.scenes.forEach(function(s){ part(s,'update','update:'+s.sys.settings.key); }); part(game.renderer,'render','render (WebGL)');
  var ws=game.scene.getScene('World'); ['_updateChunks','_movePlayer','_updateWorldMonsters','_updateSpells','_checkInteraction','_runicTick','_updateSiteLabels','_revealFog','_drawWorldFog','_emitUI','_wrMount','_wrUnmount','_updateLife','_updateLargeAnimals','_updatePlayerProj','_monWake'].forEach(function(k){ part(ws,k,'world.'+k); });
  if(typeof ZScn!=='undefined')part(ZScn,'texture','ZScn.texture (painted picture → texture)'); if(typeof ZAtlas!=='undefined'){ ['load','frames','tex','ensure'].forEach(function(k){ part(ZAtlas,k,'ZAtlas.'+k); }); }
})()"""
RESET = "(()=>{ var P=window.__LAT; P.frames=[]; P.long=[]; P.dom=0; P.timers={}; Object.keys(P.parts||{}).forEach(function(k){ P.parts[k]={n:0,ms:0,max:0}; }); P.tr=performance.now(); })()"
REPORT = r"""(()=>{ var P=window.__LAT, F=P.frames.slice().sort(function(a,b){ return a-b; }), q=function(p){ return F.length?Math.round(F[Math.min(F.length-1,Math.floor(F.length*p))]):0; }, secs=(performance.now()-P.tr)/1000;
  var top=function(o,n){ return Object.keys(o).map(function(k){ return [k,o[k]]; }).sort(function(a,b){ return b[1].ms-a[1].ms; }).slice(0,n).map(function(e){ return {what:e[0].slice(0,110),msPerSec:Math.round(e[1].ms/secs*10)/10,calls:e[1].n,max:Math.round(e[1].max)}; }); };
  return {secs:Math.round(secs*10)/10, frames:F.length, fps:Math.round(F.length/secs), p50:q(0.5), p95:q(0.95), max:q(1), over50:F.filter(function(d){ return d>50; }).length, over100:F.filter(function(d){ return d>100; }).length,
    longTasks:P.long.length, longMs:P.long.reduce(function(a,e){ return a+e[1]; },0), domPerSec:Math.round(P.dom/secs), objs:(game.scene.getScene('World').children.list||[]).length,
    parts:top(P.parts||{},12), timers:top(P.timers,10), heapMB:performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576):null}; })()"""
LAG = r"""(async()=>{ var ws=game.scene.getScene('World'), out=[]; var key=function(type,k,c){ var ev=new KeyboardEvent(type,{key:k,code:k,bubbles:true}); Object.defineProperty(ev,'keyCode',{get:function(){ return c; }}); document.dispatchEvent(ev); };
  for(var i=0;i<12;i++){ var x0=ws.player.x, t0=performance.now(), fr=0, done=false; key('keydown','ArrowRight',39);
    await new Promise(function(r){ var f=function(){ fr++; if(Math.abs(ws.player.x-x0)>0.5||fr>60){ out.push([Math.round(performance.now()-t0),fr]); r(); } else requestAnimationFrame(f); }; requestAnimationFrame(f); });
    await new Promise(function(r){ setTimeout(r,120); }); key('keyup','ArrowRight',39); await new Promise(function(r){ setTimeout(r,250); }); }
  out.sort(function(a,b){ return a[0]-b[0]; }); return {median:out[out.length>>1], worst:out[out.length-1], all:out}; })()"""
def main():
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--enable-precise-memory-info"])
        ctx = b.new_context(viewport={"width": 844, "height": 390} if PHONE else {"width": 1280, "height": 800}, device_scale_factor=3 if PHONE else 1, is_mobile=PHONE, has_touch=PHONE)
        pg = ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
        html = open(INDEX, encoding='utf-8').read(); root = os.path.dirname(os.path.abspath(INDEX))
        def _serve(r):
            u = r.request.url.split('zeldara.test/', 1)[1].split('?')[0]; f = os.path.join(root, u)
            if u.startswith('assets/'): return r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
            return r.fulfill(body=html, content_type="text/html")
        pg.route("http://zeldara.test/**", _serve); pg.add_init_script(INIT)
        if PHONE: cdp = ctx.new_cdp_session(pg); cdp.send("Emulation.setCPUThrottlingRate", {"rate": 4})
        t0 = pg.evaluate("performance.now()"); pg.goto("http://zeldara.test/index.html"); pg.wait_for_function("typeof game!=='undefined'&&game.scene&&game.scene.isActive('Title')", timeout=120000)
        boot = {'titleMs': round(pg.evaluate("performance.now()")), 'jsKB': round(len(html) / 1024)}
        pg.evaluate("(()=>{ try{ ZFT.on=false; ZLEAVE.on=false; ZDeath.auto=true; }catch(e){} game.scene.getScene('Title').scene.start('Boot',{newGame:true}); window.__ng=performance.now(); })()")
        pg.wait_for_function("game.scene.isActive('World')&&!!game.scene.getScene('World').player", timeout=180000)
        boot['newGameToWorldMs'] = round(pg.evaluate("performance.now()-window.__ng"))
        pg.wait_for_timeout(2500); pg.evaluate(HOOK); res = {'mode': 'phone' if PHONE else 'desktop', 'boot': boot, 'scenes': {}}
        print('boot', boot, flush=True)
        def walk(keys, ms=2500):
            for k in keys: pg.keyboard.down(k); pg.wait_for_timeout(ms); pg.keyboard.up(k)
        def scene(label, setup=None, keys=('ArrowRight', 'ArrowLeft'), ms=2500, settle=2500):
            if setup: pg.evaluate(setup)
            pg.wait_for_timeout(settle); pg.evaluate(RESET); walk(keys, ms); r = pg.evaluate(REPORT); res['scenes'][label] = r
            print('\n==', label, {k: r[k] for k in ['fps', 'p50', 'p95', 'max', 'over50', 'over100', 'longTasks', 'longMs', 'domPerSec', 'objs', 'heapMB']}, flush=True)
            for x in r['parts'][:8]: print('   part ', x, flush=True)
            for x in r['timers'][:6]: print('   timer', x, flush=True)
        TP = "(()=>{ var ws=game.scene.getScene('World'), w=ws.wd.waystones.find(function(q){ return q.region===%d; }); ws.player.x=w.x*TILE+16; ws.player.y=(w.y+2)*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y); ws.cameras.main.centerOn(ws.player.x,ws.player.y); })()"
        scene('village (day)', keys=('ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'))
        res['inputLag village'] = pg.evaluate(LAG); print('input lag (ms, frames)', res['inputLag village'], flush=True)
        for reg in [1, 2, 3, 4]: scene('realm %d' % reg, TP % reg, settle=3500)
        scene('realm 4 at night', "(()=>{ try{ sbNight(); }catch(e){} })()")
        res['inputLag realm'] = pg.evaluate(LAG); print('input lag realm', res['inputLag realm'], flush=True)
        # the moments that hitch: opening menus, entering a site
        t = pg.evaluate("""(async()=>{ var o={}, w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }, key=function(k,c){ ['keydown','keyup'].forEach(function(ty){ var ev=new KeyboardEvent(ty,{key:k,bubbles:true}); Object.defineProperty(ev,'keyCode',{get:function(){ return c; }}); document.dispatchEvent(ev); }); };
          var tm=function(k,c){ var a=performance.now(); key(k,c); return new Promise(function(r){ requestAnimationFrame(function(){ requestAnimationFrame(function(){ r(Math.round(performance.now()-a)); }); }); }); };
          for(var K of [['inventory','i',73],['tome','t',84],['map','b',66],['quests','q',81]]){ o[K[0]]=await tm(K[1],K[2]); await w(700); o[K[0]+'Open']=_openOverlays().join(','); key('Escape',27); await w(500); if(_openOverlays().length){ key(K[1],K[2]); await w(500); } }
          return o; })()""")
        res['open'] = t; print('\nopening (ms to the next frame):', t, flush=True)
        pg.evaluate(TP % 1); pg.wait_for_timeout(2500)
        e = pg.evaluate("(async()=>{ var ws=game.scene.getScene('World'), s=ws.wd.sites.find(function(q){ return /dungeon/.test(q.type)&&!/island/.test(q.id||''); })||ws.wd.sites[0]; var a=performance.now(); try{ ws._enterSite?ws._enterSite(s):ws.scene.launch('Dungeon',{site:s}); }catch(x){ return {err:String(x)}; }"
                        "for(var i=0;i<200&&!game.scene.isActive('Dungeon');i++)await new Promise(function(r){ setTimeout(r,25); }); var b=performance.now(); await new Promise(function(r){ setTimeout(r,1500); }); return {site:s.id, msToDungeon:Math.round(b-a), active:game.scene.isActive('Dungeon')}; })()")
        res['enterSite'] = e; print('enter a site:', e, flush=True)
        if e.get('active'):
            pg.evaluate("(()=>{ var D=game.scene.getScene('Dungeon'); ['update'].forEach(function(){}); })()")
            pg.evaluate(RESET); walk(('ArrowRight', 'ArrowDown', 'ArrowLeft'), 2000); r = pg.evaluate(REPORT); res['scenes']['in a site'] = r
            print('\n== in a site', {k: r[k] for k in ['fps', 'p50', 'p95', 'max', 'over50', 'longTasks', 'domPerSec']}, flush=True)
            for x in r['parts'][:6]: print('   part ', x, flush=True)
            for x in r['timers'][:6]: print('   timer', x, flush=True)
        res['errors'] = errs[:5]
        if OUT: open(OUT, 'w').write(json.dumps(res, indent=1))
        b.close()
main()
