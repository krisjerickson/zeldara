"""Round 44 — Kris's Oct 10 list: familiars and mounts wait at the village edge; the final village less cluttered (every door reachable), carts
smaller, boats in the water; bigger stairs; rugs never stretched; the bed rest (lights out); the house furniture no longer vanishes; the Clockwork Owl
can be hurt; a performance readout, off-screen chunks not drawn, chunk mounting spread over frames.
Run: python tests/test_round44.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

with game(new=True, painted=True) as g:
    g.wait(5000)
    # ── the village at its last stage ──
    g.js("(()=>{ game.scene.getScene('World').playerState.rescued=['a','b','c','d']; })()"); g.wait(3500)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), wd=ws.wd, W=WORLD_W, H=WORLD_H, seen=new Uint8Array(W*H), q=[[CENTER_X,CENTER_Y]], R=VILLAGE_RADIUS+3; seen[CENTER_Y*W+CENTER_X]=1;
      while(q.length){ var c=q.pop(); [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var x=c[0]+d[0], y=c[1]+d[1]; if(Math.hypot(x-CENTER_X,y-CENTER_Y)>R)return; var k=y*W+x; if(seen[k])return; if(!canPassTile(wd.tiles[y][x],null))return; seen[k]=1; q.push([x,y]); }); }
      var b=wd.props.filter(function(p){ return p.vill&&p.prop==='vbuild'; }), bad=[]; b.forEach(function(p){ var dx=p.x+((p.o&&p.o.doorX)||Math.floor(p.w/2)), dy=p.y+p.h, ok=false; for(var j=0;j<=1;j++)for(var i=-1;i<=1;i++)if(seen[(dy+j)*W+dx+i])ok=true; if(!ok)bad.push(p.o.core||p.o.pid||(p.x-CENTER_X)+','+(p.y-CENTER_Y)); });
      var carts=wd.props.filter(function(p){ return p.vill&&p.prop==='cart'; }).map(function(p){ var n=0; for(var i=0;i<p.w;i++)if(wd.tiles[p.y][p.x+i]===T.PROP)n++; return n; });
      var WA=function(x,y){ var K=WK_REG.list[wd.kind[y*W+x]]; return wd.cls[y*W+x]===WM.LAKE&&!!(K&&K.liquid); };
      var boats=wd.props.filter(function(p){ return p.vill&&p.prop==='boatv'; }).map(function(p){ var w=0, n=0; for(var j=-2;j<=1;j++)for(var i=0;i<3;i++){ n++; if(WA(p.x+i,p.y+j))w++; } return w/n; });
      return {stage:wd.villageStage, buildings:b.length, bad:bad, carts:carts, boats:boats}; })()""")
    check('The finished village: %d buildings (was 44), every door reachable from the green on foot%s; each cart blocks one tile %s; every boat lies in open water %s' % (r['buildings'], '' if not r['bad'] else ' — NOT: ' + str(r['bad']), r['carts'], r['boats']),
          r['stage'] == 5 and r['buildings'] <= 40 and r['bad'] == [] and all(c <= 1 for c in r['carts']) and len(r['boats']) >= 1 and all(b >= 0.99 for b in r['boats']), r)
    # ── mount and familiars at the village edge ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, p=ws.player, o={};
      ps.ownedMounts=(ps.ownedMounts||[]).concat(['horse']); ps.mount='horse'; ps.ownedFamiliars=['fam_grass']; ps.familiar='fam_grass'; ps.parkedMount=null;
      var put=function(tx,ty){ p.x=tx*TILE+16; p.y=ty*TILE+16; p.cont.setPosition(p.x,p.y); ws.cameras.main.centerOn(p.x,p.y); };
      put(CENTER_X+VILLAGE_RADIUS+6,CENTER_Y+2); await new Promise(r=>setTimeout(r,1500)); o.ridingOutside=ps.mount==='horse';
      put(CENTER_X+VILLAGE_RADIUS-3,CENTER_Y+2); await new Promise(r=>setTimeout(r,1500));
      var P=ps.parkedMount; o.parked=!!P&&!ps.mount; o.parkOut=P?Math.hypot(P.x/TILE-CENTER_X-0.5,P.y/TILE-CENTER_Y-0.5)-VILLAGE_RADIUS:null; o.call=ws._callMount();
      put(CENTER_X-8,CENTER_Y+3); await new Promise(r=>setTimeout(r,2500)); var v=ws._famVisuals&&ws._famVisuals.fam_grass; o.famOut=v?Math.hypot(v.x/TILE-CENTER_X-0.5,v.y/TILE-CENTER_Y-0.5)-VILLAGE_RADIUS:null;
      put(CENTER_X-VILLAGE_RADIUS-6,CENTER_Y+2); await new Promise(r=>setTimeout(r,2500)); v=ws._famVisuals&&ws._famVisuals.fam_grass; o.famNear=v?Math.round(Math.hypot(v.x-p.x,v.y-p.y)):null;
      o.call2=ws._callMount(); return o; })()""")
    check('Riding into the village leaves the horse at its edge (%.1f tiles outside) and it cannot be called inside; familiars wait at the edge (%.1f tiles outside) and come across when the hero leaves by the far side (%s px from him)' % (r.get('parkOut') or -9, r.get('famOut') or -9, r.get('famNear')),
          r['ridingOutside'] and r['parked'] and r['parkOut'] is not None and r['parkOut'] >= 0 and r['call'] is False and r['famOut'] is not None and r['famOut'] >= 0 and r['famNear'] is not None and r['famNear'] < 120 and r['call2'] is True, r)
    # ── the house: furniture every time, rugs, the bed rest ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), o={runs:[]}; ws.playerState.hp=3;
      for(var i=0;i<3;i++){ ws._enterBuilding({type:i===1?'tavern':'house'}); await new Promise(r=>setTimeout(r,1800)); var b=game.scene.getScene('Building'), n=0, empty=0;
        b.children.list.forEach(function(x){ if(x.type==='Image'&&/^spr_/.test(x.texture.key)){ n++; if(x.frame.width<=1)empty++; } }); o.runs.push([n,empty]);
        if(i<2){ b._exitBuilding(); await new Promise(r=>setTimeout(r,1200)); } }
      var b=game.scene.getScene('Building'); o.bed=b._bedIms.length; var L0=b._lightIms.map(function(l){ return l.alpha; }); b._npcInteract(); await new Promise(r=>setTimeout(r,2700));
      o.resting=b._resting; o.dim=b._lightIms.every(function(l,i){ return l.alpha<L0[i]*0.6; }); await new Promise(r=>setTimeout(r,5000)); o.after=b._resting; o.hp=ws.playerState.hp===ws.playerState.maxHp; b._exitBuilding(); await new Promise(r=>setTimeout(r,1000)); return o; })()""")
    check('The house shows all its furniture on every visit %s; resting puts the hero to bed, the lights go down, and he gets up rested' % r['runs'],
          all(x[1] == 0 and x[0] > 8 for x in r['runs']) and r['bed'] >= 1 and r['resting'] and r['dim'] and r['after'] is False and r['hp'], r)
    r = g.js("""(()=>{ var M={sprites:[]}; addSprite(M,0,0,4,4,function(){}); var it=ZScn.META.items.ir_rug_red; var bad=ZScn.has('ir_rug_red')?ZScn.rect({sprites:[]},'ir_rug_red',0,0,160,96,{strict:true}):'none'; var ok=ZScn.has('ir_rug_red')?ZScn.rect({sprites:[]},'ir_rug_red',0,0,58,68,{strict:true}):'none';
      var m=buildInterior('house'), flat=m.sprites.filter(function(s){ return s.flat; }).length; return {stretched:bad, fits:ok, flat:flat}; })()""")
    check('A painted rug is never stretched out of shape (a 5 × 3 rug falls back to the crisp drawn one, %s; a rug of its own shape is used, %s)' % (r['stretched'], r['fits']),
          r['stretched'] in (False, 'none') and r['fits'] in (True, 'none') and r['flat'] >= 1, r)
    # ── stairs ──
    r = g.js("""(()=>{ var m={sprites:[],lights:[]}, c=document.createElement('canvas').getContext('2d'); var n0=0; cavernMarkers(m,c,{x:5,y:5},{x:9,y:9},{rockTop:'#555',floorA:'#444'},{game:true}); var w=m.sprites.map(function(s){ return s.canvas.width/(s.res||1); }); return {w:w}; })()""")
    check('Stairs up and down are drawn bigger (%s px wide; were about 52)' % [round(x) for x in r['w']], len(r['w']) == 0 or all(x >= 66 for x in r['w']), r)
    # ── the Clockwork Owl ──
    r = g.js("""(()=>{ var src=MX.MOVE.weeping.toString(); return {invuln:/seen\\)\\{[^}]*invuln/.test(src)}; })()""")
    check('The Clockwork Owl freezes when you face it but can be hurt (no more invulnerability while watched)', r['invuln'] is False, r)
    # ── the Tome: weapon wheel, element guide, monsters by element ──
    r = g.js("""(()=>{ var ps=game.scene.getScene('World').playerState; ps.equip.lHand='flame_iron'; Tome.ui.cat='arms'; Tome.open(); var sq=[].slice.call(document.querySelectorAll('.zw-sq')), C=300;
      var pos=function(id){ var b=document.querySelector('[data-awp="'+id+'"]'); return b?[parseFloat(b.style.left)+21-C,parseFloat(b.style.top)+21-C]:null; }, ang=function(p){ return (Math.atan2(p[1],p[0])*180/Math.PI+360)%360; };
      var sf=pos('stormfire_blade'), fi=pos('inferno_edge'), wa=pos('glacier_sword'), tips=document.querySelectorAll('.zw-tips li').length, now=(document.querySelector('.zw-now')||{}).textContent||'';
      Tome.ui.cat='monster'; Tome.ui.mg='el'; Tome.render(); var secs=[].slice.call(document.querySelectorAll('#tome-grid .tome-sec h4')).map(function(h){ return h.textContent.slice(0,40); }); closeModal('tome');
      return {n:sq.length, fireAng:fi&&Math.round(ang(fi)), waterAng:wa&&Math.round(ang(wa)), dualR:sf&&Math.round(Math.hypot(sf[0],sf[1])), tips:tips, now:now.slice(0,80), secs:secs.length, first:secs[0]}; })()""")
    check('Tome: the weapon wheel places %d forged weapons by element (fire at %s°, water at %s°; the two-element Stormfire Blade %s px from the middle, between its slices), %d tips on how elements work and a line on what you carry; monsters can be shown by element (%d sections)' % (r['n'], r['fireAng'], r['waterAng'], r['dualR'], r['tips'], r['secs']),
          r['n'] >= 25 and r['fireAng'] is not None and abs(r['fireAng'] - 330) <= 25 and abs(r['waterAng'] - 270) <= 25 and r['dualR'] is not None and r['dualR'] < 200 and r['tips'] >= 5 and 'Fire' in r['now'] and r['secs'] >= 6, r)
    # ── the adventure-site designs (07zw ZSD; shown in the Lab) ──
    r = g.js("""(()=>{ var S=ZSD.sites(), bad=[], n=0, fl=0, minBig=99, types={}, archDup=0, t0=performance.now();
      S.forEach(function(s){ types[s.type]=(types[s.type]||0)+1; var A=ZSD.archOf(s); if(new Set(A).size<3)archDup++;
        [0,1,2].forEach(function(o){ var d=ZSD.design(s,o); n++; minBig=Math.min(minBig,d.bigger); d.floors.forEach(function(F,i){ fl++; var R=ZSD.regions(F);
          if(R.sizes.length!==1)bad.push(s.id+'/'+o+'/'+i+': '+R.sizes.length+' parts'); var end=F.down||F.goal; if(!F.up||!end)bad.push(s.id+'/'+o+'/'+i+': stairs');
          else if(F.far<Math.min(F.w,F.h)*0.8)bad.push(s.id+'/'+o+'/'+i+': short walk '+F.far);      // the way on is at least most of a floor's width away on foot
          if(i>0){ var P=d.floors[i-1].down; if(P&&Math.abs(P[0]-F.up[0])+Math.abs(P[1]-F.up[1])>6)bad.push(s.id+'/'+o+'/'+i+': arrival'); } }); }); });
      return {sites:S.length, types:types, designs:n, floors:fl, bad:bad.slice(0,6), nbad:bad.length, minBig:minBig, archDup:archDup, ms:Math.round(performance.now()-t0)}; })()""")
    check('Adventure sites: %d sites (%s), %d designs with %d floors — each floor in one piece, you arrive where you left the floor below and the way on is far away; floors at least %.1f× the old (all %d checked in %d ms)' % (r['sites'], r['types'], r['designs'], r['floors'], r['minBig'], r['floors'], r['ms']),
          r['sites'] == 53 and r['designs'] == 159 and r['nbad'] == 0 and r['minBig'] >= 2 and r['archDup'] == 0, r)
    # ── performance ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'); ZPERF.toggle(true); await new Promise(r=>setTimeout(r,2600)); var h=ZPERF.hist.slice(-1)[0]||null, box=!!document.getElementById('zperf'); ZPERF.toggle(false);
      var off=0, on=0; ws._wr.chunks.forEach(function(ch){ if(ch._off)off++; else on++; }); var hidden=0; ws._wr.chunks.forEach(function(ch){ if(ch._off)ch.objs.forEach(function(o){ if(!o.visible)hidden++; }); });
      return {row:h, box:box, off:off, on:on, hidden:hidden, ready:(ws._wr.ready||[]).length}; })()""")
    check('Performance readout (F9 / Dev panel) shows fps, frame times, draw calls and painting (%s); chunks off screen are not drawn (%d of %d)' % (r['row'] and (str(r['row']['fps']) + ' fps'), r['off'], r['off'] + r['on']),
          r['box'] and r['row'] and 'draws' in r['row'] and r['on'] >= 1 and (r['off'] == 0 or r['hidden'] > 0), r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No page errors', errs == [], errs[:4])

# the Lab: Adventure sites and How it all fits
import re
from playwright.sync_api import sync_playwright
R0 = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
html = open(os.path.join(R0, 'lab', 'index.html'), encoding='utf-8').read()
def serve(rq):
    u = rq.request.url
    if u.endswith('.webp'):
        f = os.path.join(R0, 'assets', 'scenery', os.path.basename(u))
        if os.path.exists(f): rq.fulfill(path=f, content_type='image/webp')
        else: rq.fulfill(status=404, body='')
    else: rq.fulfill(body=html, content_type='text/html')
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(viewport={'width': 1400, 'height': 1000}); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=os.environ.get('PHASER_JS', os.path.join(R0, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')), content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort()); pg.route("http://lab.test/**", serve)
    pg.goto('http://lab.test/?tabs=all'); pg.wait_for_timeout(2500); pg.click('.lab-tab[data-tab="asites"]'); pg.wait_for_timeout(3000)
    r = pg.evaluate("""()=>{ var o={chips:document.querySelectorAll('.as-site').length, cards:document.querySelectorAll('.br-card[data-tab=asites]').length};
      document.querySelector('[data-asite="lava_archipelago"]').click(); o.head=(document.querySelector('.as-head h3')||{}).textContent;
      document.querySelector('.br-card[data-id="lava_archipelago__1"] .br-pick').click(); document.querySelector('.br-card[data-id="lava_archipelago__2"] .br-pick').click();
      o.picked=[0,1,2].filter(function(i){ return LBR.picked('asites','lava_archipelago__'+i); }); o.done=document.querySelectorAll('.as-site.done').length; return o; }""")
    pg.click('.lab-tab[data-tab="codex"]'); pg.wait_for_timeout(2000); r['codex'] = pg.evaluate("()=>document.querySelectorAll('.br-card[data-tab=codex]').length")
    check('Lab: Adventure sites — %d sites to pick from, three options each plus three painting approaches; one pick per site; How it all fits — %d ideas' % (r['chips'], r['codex']),
          r['chips'] == 53 and r['cards'] == 6 and r['head'] == 'Lava Archipelago' and r['picked'] == [2] and r['done'] == 1 and r['codex'] == 6 and errs == [], [r, errs[:3]])
    b.close()

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
