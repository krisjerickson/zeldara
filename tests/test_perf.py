"""Performance round: load time, large-animal culling, HUD/label dirty checks, freed scratch grids,
lazy ground patterns (no visual difference), lazy monster visuals, bit-packed saves (v7 -> v8),
island rows shared outside the island's box.   Run: python tests/test_perf.py  (after node build.mjs)"""
import sys, os, json, time
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
def until(g, expr, ms=20000, step=200):
    t=time.time()
    while (time.time()-t)*1000<ms:
        if g.js(expr): return True
        g.wait(step)
    return False
errs=[]

# ── 1. load: Title → Boot → World (report) + everything that only needs a fresh world ──────────
with game(new=None) as g:
    g.js("window._t0=performance.now(); game.scene.getScene('Title').scene.start('Boot',{newGame:true})")
    g.page.wait_for_function("game.scene.isActive('World')&&game.scene.getScene('World').player&&game.scene.getScene('World')._ready", timeout=120000, polling=50)
    ms=g.js("performance.now()-_t0"); gen=g.js("_worldData.buildMs")
    print('INFO Boot -> World %.0f ms headless (world build %d ms)'%(ms,gen))
    check('Boot reaches the World without the old 60-frame progress delay (< 30 s headless)', ms<30000, round(ms))
    g.wait(800)
    # scratch grids
    r=g.ws("{h:ws.wd.map.height, ga:ws.wd.map.gateAt, cd:ws.wd.map.coastDist.constructor.name, n:ws.wd.map.coastDist.length, mx:Math.max.apply(null,Array.from(ws.wd.map.coastDist.subarray(0,5000)))}")
    check('World-map scratch grids freed (height, gateAt) and coastDist is one byte per tile', r['h'] is None and r['ga'] is None and r['cd']=='Uint8ClampedArray' and r['n']==1200*1200, r)
    # lazy patterns: few made at load, every mounted chunk has all of its patterns
    p=g.ws("""(function(){ var P=_wpIsPat(), used={}; for(var i=0;i<ws.wd.kind.length;i++)if(P[ws.wd.kind[i]])used[ws.wd.kind[i]]=1;
      var miss=[]; ws._wr.chunks.forEach(function(ch,k){ var L=_wpPatKindsIn(ws.wd,ch.cx,ch.cy,ch.cx,ch.cy); if(L.length)miss.push(k); });
      var px=0; for(var k in _WPC)px+=_WPC[k].w*_WPC[k].h*4; return {made:Object.keys(_WPC).length, usedInWorld:Object.keys(used).length, allKinds:WK_REG.list.filter(function(k,i){return P[i];}).length, mb:px/1048576, chunks:ws._wr.chunks.size, missing:miss}; })()""")
    print('INFO patterns at load: %d made (%.1f MB) of %d used on the mainland / %d defined'%(p['made'],p['mb'],p['usedInWorld'],p['allKinds']))
    check('Ground patterns are warmed lazily (only those near the spawn at load)', 0<p['made']<p['usedInWorld'], p)
    check('...and every chunk on screen was painted with its patterns', p['chunks']>0 and not p['missing'], p['missing'])
    wk=g.js("({worker:!!_WPW.w, err:_WPW.err||null, ms:_WPW.ms||null})")
    check('The chunk-paint worker runs in this build (minified code keeps its toString() sources working)', wk['worker'] and not wk['err'] and wk['ms'], wk)
    # on-demand pattern = eagerly warmed pattern (pixel-identical chunk)
    cmp=g.js("""(async function(){ var ws=game.scene.getScene('World'), wd=ws.wd, n=Math.ceil(WORLD_W/WCH), pick=null;
      for(var cy=0;cy<n&&!pick;cy++)for(var cx=0;cx<n&&!pick;cx++){ var L=_wpPatKindsIn(wd,cx,cy,cx,cy); if(L.length>=2)pick={cx:cx,cy:cy,kinds:L}; }
      if(!pick)return {err:'no chunk with unmade patterns'};
      var paint=async function(){ var j=wpChunkJob(wd,pick.cx,pick.cy); while(!j.step(40))await new Promise(function(r){setTimeout(r,5);}); var c=j.out.canvas; return c.getContext('2d').getImageData(0,0,c.width,c.height).data; };
      var before=pick.kinds.filter(function(k){ return !!_WPC[k]; }).length;
      var a=await paint(); var made=pick.kinds.filter(function(k){ return !!_WPC[k]; }).length;
      pick.kinds.forEach(function(k){ delete _WPC[k]; }); _wpWarmPatterns(); var b=await paint();
      var diff=0; for(var i=0;i<a.length;i++)if(a[i]!==b[i])diff++;
      return {chunk:[pick.cx,pick.cy], kinds:pick.kinds.length, before:before, madeOnDemand:made, diffBytes:diff, bytes:a.length, all:Object.keys(_WPC).length}; })()""")
    check('A chunk whose patterns were not warmed makes them on demand and paints pixel-identical to eager warming', cmp.get('before')==0 and cmp.get('madeOnDemand',0)>=1 and cmp.get('diffBytes')==0, cmp)
    # large animals: sleep far away, drawn only on screen
    g.js("sbUnlockAll()"); g.wait(300)
    a=g.ws("""(function(){ var L=ws._largeAnimals, v=ws.cameras.main.worldView, px=ws.player.x, py=ws.player.y, g=ws._lifeGfx;
      var onScr=function(a){ return !a.dead&&a.x>v.x-96&&a.x<v.right+96&&a.y>v.y-96&&a.y<v.bottom+96; };
      var vis=L.filter(onScr).length; g.clear(); ws._updateLargeAnimals(0.016); var none=g.commandBuffer.length;
      var far=L.find(function(a){ return !a.dead&&Math.hypot(a.x-px,a.y-py)>2500; }); var fx=far.x, fy=far.y; far.state='wander'; far.vx=60; far.vy=40;
      var near=L.find(function(a){ return a!==far&&!a.dead; }); var sx=near.x, sy=near.y, st=near.state; near.x=px+150; near.y=py; near.state='idle'; near.wanderTimer=5;
      g.clear(); ws._updateLargeAnimals(0.25); var one=g.commandBuffer.length; var farMoved=(far.x!==fx||far.y!==fy);
      near.x=sx; near.y=sy; near.state=st; g.clear(); ws._updateLargeAnimals(0.016);
      return {animals:L.length, visibleAtStart:vis, cmdsNoneOnScreen:none, cmdsOneOnScreen:one, farMoved:farMoved}; })()""")
    check('Large animals off screen issue no Graphics commands (was ~31K/frame)', a['visibleAtStart']>0 or a['cmdsNoneOnScreen']==0, a)
    check('...one animal on screen is drawn, a far one (>1700 px) sleeps', 0<a['cmdsOneOnScreen']<2000 and not a['farMoved'], a)
    # HUD + labels: nothing rewritten while nothing changes
    g.js("""(()=>{ window._M={}; var ids=['hp-bar','hp-val','mana-val','xp-bar','lv-val','gold-val','region-name','section-dots','comp-panel','action-spell-slot','quest-list-container','world-labels','mmh-zone'];
      window._MO=new MutationObserver(function(l){ l.forEach(function(m){ var t=m.target.nodeType===3?m.target.parentNode:m.target, id=null; while(t&&!id){ if(ids.indexOf(t.id)>=0)id=t.id; t=t.parentNode; } if(id&&!(id==='world-labels'&&m.attributeName==='style'))_M[id]=(_M[id]||0)+1; }); });
      _MO.observe(document.body,{subtree:true,attributes:true,childList:true,characterData:true}); })()""")
    f0=g.js("game.loop.frame"); g.wait(1500); f1=g.js("game.loop.frame")
    idle=g.js("JSON.parse(JSON.stringify(_M))")
    check('HUD, quest list and world labels are not rewritten while nothing changes (%d frames)'%(f1-f0), not idle and f1-f0>=2, idle)
    g.ws("(ps.gold+=7, 0)"); g.wait(400)
    chg=g.js("[JSON.parse(JSON.stringify(_M)), document.getElementById('gold-val').textContent]"); gold=g.ws("ps.gold")
    check('...and a change (gold) rewrites only the gold element', chg[0].get('gold-val',0)>=1 and chg[1]==str(gold)+'g' and set(chg[0])=={'gold-val'}, chg)
    # legacy world monsters: name label + texture made on first wake
    m=g.ws("""(function(){ var L=ws.worldMonsters, leg=L.filter(function(m){ return !m.mx&&!m.dead; }), mx=L.filter(function(m){ return m.mx&&!m.dead; });
      var far=function(m){ return Math.hypot(m.x-ws.player.x,m.y-ws.player.y)>1800; };
      var t=leg.find(function(m){ return far(m)&&m._lazyVis; }), tm=mx.find(function(m){ return far(m)&&m._lazyVis; });
      window._lz=t; window._lzm=tm; ps.godMode=true;
      return {legacy:leg.length, legacyLazy:leg.filter(function(m){return !!m._lazyVis;}).length, mx:mx.length, mxLazy:mx.filter(function(m){return !!m._lazyVis;}).length,
        texts:ws.children.list.reduce(function(a,o){ return a+(o.list?o.list.filter(function(c){return c.type==='Text';}).length:0); },0), lazyTex:(t&&t.body&&t.body.texture.key)}; })()""")
    print('INFO monsters: %d legacy (%d lazy), %d engine (%d lazy), %d Text labels in containers'%(m['legacy'],m['legacyLazy'],m['mx'],m['mxLazy'],m['texts']))
    check('Far legacy world monsters have no name label / real texture yet', m['legacyLazy']>0 and m['lazyTex']=='mx__lazy', m)
    for tag,var in [('a legacy','_lz')]+([('an engine (09 patch)','_lzm')] if m['mxLazy'] else []):
        g.ws(f"(function(){{ var t=window.{var}; ws.player.x=t.x+120; ws.player.y=t.y; ws.player.cont.setPosition(ws.player.x,ws.player.y); ws.cameras.main.centerOn(ws.player.x,ws.player.y); }})()")
        ok=until(g, f"!window.{var}._lazyVis", 6000)
        w=g.js(f"(function(){{ var t=window.{var}; return {{name:t.nameT&&t.nameT.text, inCont:!!(t.nameT&&t.cont.list.indexOf(t.nameT)>=0), tex:t.body.texture.key}}; }})()")
        check(f'...{tag} monster gets its name label and sprite texture when it wakes near the hero', ok and w['inCont'] and 'Lv.' in (w['name'] or '') and w['tex']!='mx__lazy', w)
    g.js("_MO.disconnect()")
    errs+=g.errs

# ── 2. saves: an old v7 save (number-array fog) loads, re-saves bit-packed as v8, and reloads ─
W=150*150
fog=[1 if (i%7==0 or 3000<i<3400) else 0 for i in range(W)]
old=json.dumps({'saveVersion':7,'gold':77,'level':2,'unlockedSections':[1],'completedQuests':[],'ownedMounts':[],'inventory':[],'exploredGridArr':fog,'activatedWaystones':['ws_village']})
want=sum(fog)
with game(new=False, save=old) as g:
    g.wait(500)
    r=g.ws("{v:ps.saveVersion, n:ps.exploredGrid.length, sum:Array.from(ps.exploredGrid).reduce(function(a,b){return a+b;},0), c7:ps.exploredGrid[7], c8:ps.exploredGrid[8], c3200:ps.exploredGrid[3200], gold:ps.gold, bk:!!localStorage.getItem('qoz_v2_backup_v7')}")
    check('v7 save (exploredGridArr) migrates to v8 with its fog intact and a v7 backup kept', r['v']==8 and r['n']==W and r['sum']>=want and r['c7']==1 and r['c8']==0 and r['c3200']==1 and r['gold']==77 and r['bk'], r)
    g.ws("ws._save()")
    raw=g.js("ZSave.read()"); sv=json.loads(raw)
    check('New save is v8, bit-packed (no number array) and small', sv['saveVersion']==8 and 'exploredGridArr' not in sv and isinstance(sv.get('exploredBits'),str) and len(sv['exploredBits'])<4000 and len(raw)<10000, (len(raw), len(sv.get('exploredBits',''))))
    live=g.ws("Array.from(ps.exploredGrid).join('')")
    errs+=g.errs
with game(new=False, save=raw) as g:
    g.wait(500)
    back=g.ws("Array.from(ps.exploredGrid).join('')")
    check('...and reloading the v8 save gives back exactly the same fog grid', back==live and back.count('1')==live.count('1')>=want, back.count('1'))
    errs+=g.errs

# ── 3. islands: rows outside the island's box share one sea row, which nothing writes ─────────
with game(new=True) as g:
    g.wait(500)
    r=g.js("""(function(){ var out={}; ['1a','2a','3b'].forEach(function(key){ _ISL_WD=null; var t0=performance.now(), wd=_buildIslandWorld(key), ms=performance.now()-t0;
      var rows=new Set(wd.tiles), shared=wd.tiles[0], outside=true; for(var y=0;y<WORLD_H;y++){ var inb=y>=ISL_OY&&y<ISL_OY+ISL_N; if(!inb&&wd.tiles[y]!==shared)outside=false; }
      var bytes=0; rows.forEach(function(r){ bytes+=r.byteLength; }); out[key]={ms:Math.round(ms),uniqueRows:rows.size,tileBytes:bytes,outsideShared:outside,flatBytes:wd.kind.byteLength+wd.zone.byteLength+wd.region.byteLength+wd.cls.byteLength}; }); _ISL_WD=null; return out; })()""")
    print('INFO island grids', r)
    check('Island tile rows outside the box share ONE row (tiles %.0f KB instead of 1.4 MB)'%(r['1a']['tileBytes']/1024), all(v['outsideShared'] and v['uniqueRows']<=96+1 for v in r.values()), r)
    g.ws("ws._sailTo('1a','dock')")
    ok=until(g, "!!(game.scene.getScene('Island')&&game.scene.getScene('Island')._ready&&game.scene.isActive('Island'))", 30000)
    check('Sailing to the island works', ok)
    if ok:
        g.js("(()=>{ var I=game.scene.getScene('Island'); I.playerState.godMode=true; })()")
        for k in ['ArrowLeft','ArrowUp','ArrowRight','ArrowDown']: g.hold(k,700)
        s=g.js("(()=>{ var I=game.scene.getScene('Island'), row=I.wd.tiles[0], bad=0; for(var i=0;i<row.length;i++)if(row[i]!==T.OCEAN)bad++; return {bad:bad, same:I.wd.tiles[0]===I.wd.tiles[WORLD_H-1], chunks:I._wr.chunks.size}; })()")
        check('...after walking around the island the shared sea row is untouched', s['bad']==0 and s['same'] and s['chunks']>0, s)
    errs+=g.errs

check('No JS errors', not errs, errs[:4])
print('%d/%d'%(sum(res),len(res)))
sys.exit(0 if all(res) else 1)
