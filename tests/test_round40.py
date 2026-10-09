"""Round 40 — ten more terrain-edge options per place in the Lab; the picked edges built into the world (rounded outlines,
clean ink line / layered edges, sand grain, pieces, moving water, particles, a Dev switch to the old look); painted edge
pieces used when their sheets are in; and the round 37 leftovers: element numbers per difficulty level, tree chopping,
ordinary monsters' armor weight, gem marks on set pieces.
Run: python tests/test_round40.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

JOB = """(async (a)=>{ var ws=game.scene.getScene('World'), wd=ws.wd, j=wpChunkJob(wd,a[0],a[1]), n=0; while(!j.step(30)&&n<4000){ n++; await new Promise(r=>setTimeout(r,5)); }
  var o=j.out; return {flip:!!o.flip, nf:o.flip?o.flip.nf:0, zfx:o.zfx?Object.keys(o.zfx):[], canvas:!!o.canvas, err:Object.keys(WP_ERR)}; })"""

with game(new=True, painted=True, query='?scenery=fake') as g:
    g.wait(2500)
    # 1 — the Lab cards (ZEdge is in the game build too)
    r = g.js("""(()=>{ var n=0, bad=[], kinds={}, t0=performance.now(); ZEdge.SCENES.forEach(function(sc){ (ZEdge.MORE[sc.id]||[]).forEach(function(M){ n++; kinds[M.kind]=(kinds[M.kind]||0)+1; var cv=document.createElement('canvas'); cv.width=192; cv.height=108;
        try{ ZEdge.frame(cv.getContext('2d'),sc.id,M.id,1.7,192,108,cv); }catch(e){ bad.push(sc.id+'_'+M.id+': '+e.message); } }); });
      return {n:n,bad:bad,kinds:kinds,per:ZEdge.SCENES.map(function(s){ return ZEdge.MORE[s.id].length; }),pick:ZEdge.PICKFX,ms:Math.round(performance.now()-t0)}; })()""")
    check('Lab: ten new cards for each of the six places (%d), mixing blends %d, movement %d, things that stay put %d; every one draws (%d ms for all)' % (r['n'], r['kinds'].get('blend', 0), r['kinds'].get('move', 0), r['kinds'].get('stat', 0), r['ms']),
          r['n'] == 60 and r['per'] == [10] * 6 and r['bad'] == [] and r['kinds'].get('blend') == 24 and r['kinds'].get('move') == 18 and r['kinds'].get('stat') == 18 and r['pick']['lake'] == ['rings', 'lap'], r)
    # 2 — the world painter with the new edges
    r = g.js("({on:ZWE.on, S:ZWE.S, pick:ZWE.PICK, field:ZWE.field(), btn:(document.getElementById('sb-edges')||{}).textContent||'', kt:(function(){ var KT=_wpKindTables(), c={}; for(var i=0;i<KT.n;i++){ c[KT.cls[i]]=(c[KT.cls[i]]||0)+1; } return c; })()})")
    check('World: the new edges are on by default (16 samples a tile; lakes and sea the clean ink line, the rest layered), every liquid ground is sorted into lake / sea / marsh / lava, and the Dev panel has the switch',
          r['on'] and r['S'] == 16 and r['field']['st'] == [2, 1, 1, 2, 2] and all(str(c) in r['kt'] for c in range(5)) and 'Terrain edges' in r['btn'], r)
    lake = g.js(JOB, [21, 16]); sea = g.js(JOB, [30, 16])
    check('A lake chunk gets the lapping flipbook (%d frames) and rain rings; a sea chunk rolling waves and spray; nothing failed while painting' % lake['nf'],
          lake['flip'] and lake['nf'] == 16 and 'rings' in lake['zfx'] and sea['flip'] and 'spray' in sea['zfx'] and lake['err'] == [] and sea['err'] == [], [lake, sea])
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'); await new Promise(r=>setTimeout(r,4000)); var n=0, fl=0, em=0; ws._wr.chunks.forEach(function(ch){ n++; if(ch.flip)fl++; ch.objs.forEach(function(o){ if(o._zfx)em++; }); });
      return {n:n,fl:fl,em:em,err:Object.keys(WP_ERR)}; })()""")
    check('Mounted around the hero: %d chunks, %d with moving water, %d particle emitters (rings, spray, fog, mist, glitter, embers)' % (r['n'], r['fl'], r['em']), r['n'] > 0 and r['fl'] >= 1 and r['em'] >= 1 and r['err'] == [], r)
    r = g.js("({tuft:ZWE.painted('tuft',0.2), reed:ZWE.painted('reed',0.7), drift:ZWE.painted('drift',0), none:ZWE.painted('nothing',0)})")
    check('Painted edge pieces: with the edge sheets in (here the stand-ins), tufts, reeds and drifts use their painted pictures', r['tuft'] in ('ed_tuft_a', 'ed_tuft_b') and r['reed'] in ('ed_reeds', 'ed_cattails') and r['drift'] == 'ed_snow_drift' and r['none'] is None, r)
    # 3 — the old look
    r = g.js("""(async ()=>{ ZWE.on=false; var j=wpChunkJob(game.scene.getScene('World').wd,21,16), n=0; while(!j.step(30)&&n<4000){ n++; await new Promise(r=>setTimeout(r,5)); } ZWE.on=true; return {flip:!!j.out.flip,canvas:!!j.out.canvas}; })()""")
    check('Switched to the old look, a chunk paints as before (no flipbook)', r['canvas'] and not r['flip'], r)
    # 4 — element numbers per difficulty level
    r = g.js("""(()=>{ var ps=game.scene.getScene('World').playerState, o={}; [0,1,2,3].forEach(function(l){ ps.difficulty=l; o[l]=[ZEL.mult(2),ZEL.mult(1),ZEL.mult(-1),ZEL.mult(-2),ZEL.mult(1,'melee',true),ZEL.resCap()]; }); ps.difficulty=3;
      Tome.ui.cat='elements'; Tome.open(); o.tome=(document.querySelector('#tome-grid .ze-diff')||{}).textContent||''; closeModal('tome'); ps.difficulty=1; return o; })()""")
    check('Element steps follow the difficulty level (Wayfarer = round 37: Bane 2, Weak 1.5, Resists 0.6, Warded 0.35, cap 50 %%; Ragnarök %s), and the Tome says so' % r['3'],
          r['1'] == [2, 1.5, 0.6, 0.35, 1.25, 0.5] and r['0'][0] > r['1'][0] > r['2'][0] > r['3'][0] and r['0'][5] > r['3'][5] and 'Ragnar' in r['tome'] and '×1.8' in r['tome'], r)
    r = g.js("({ord:ZDiff.hit(20,62,100,0), boss:ZDiff.armor(20,62), was:Math.round(20*100/(100+1.5*62))})")
    check('Ordinary monsters: armor counts a third more against them (20 attack on 62 defense: %s, was %s); bosses unchanged' % (r['ord'], r['was']), r['ord'] < r['was'] and r['ord'] >= 1, r)
    # 5 — gem marks
    r = g.js("({two:ZIcon.item('iron_helm~fire~storm',2), one:ZIcon.item('iron_helm~water',2), plain:ZIcon.item('iron_helm',2)})")
    check('A gem-set piece wears a small gem per set element on its icon; a plain piece does not',
          r['two'].count('<i style="background') == 2 and 'zi-gems' in r['one'] and 'zi-gems' not in r['plain'] and 'Set with Fire and Storm' in r['two'], r['two'][:200])
    # 6 — tree chopping
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), wd=ws.wd, ps=ws.playerState, p=null, o={};
      var hx=ws.player.x/TILE, hy=ws.player.y/TILE, bd=1e9; wd.props.forEach(function(q){ if(!ZCHOP.isTree(q))return; var d=Math.hypot(q.x-hx,q.y-hy); if(d<bd&&wd.tiles[q.y+(q.h||1)]&&!ALWAYS_BLOCKED.has(wd.tiles[q.y+(q.h||1)][q.x])){ bd=d; p=q; } });
      if(!p)return {none:true}; o.prop=p.prop; var key=ZCHOP.key(p);
      ps.equip.lHand='wooden_sword'; ws.player.x=(p.x+(p.w||1)/2)*TILE; ws.player.y=(p.y+(p.h||1)+0.5)*TILE; ws.player.cont.setPosition(ws.player.x,ws.player.y); o.noAxe=ws._chopTree(ws.player.x,ws.player.y,'up');
      ps.equip.lHand='axe'; var w0=ps.wood||0, t0=wd.tiles[p.y][p.x]; o.cut=ws._chopTree(ws.player.x,ws.player.y,'up'); o.wood=(ps.wood||0)-w0; o.saved=ps.chopped.indexOf(key)>=0; o.was=t0===T.PROP; o.walk=!ALWAYS_BLOCKED.has(wd.tiles[p.y][p.x]); o.again=ws._chopTree(ws.player.x,ws.player.y,'up')&&ws._chopFind(ws.player.x,ws.player.y,'up')===p;
      var keep=ps.chopped.slice(); ps.chopped=[]; ws._chopInit(); o.back=wd.tiles[p.y][p.x]===T.PROP&&!wd._chopped.has(key); ps.chopped=keep; ws._chopInit(); o.down=wd._chopped.has(key);
      o.axeOk=ZCHOP.canChop({equip:{lHand:'battle_axe'}}); return o; })()""")
    check('Chopping: no tree falls to a sword; an axe fells the one in front (%s), gives wood (+%s), frees the ground, is saved, and comes back for a save that never felled it' % (r.get('prop'), r.get('wood')),
          not r.get('none') and r['noAxe'] is False and r['cut'] and r['wood'] >= 1 and r['saved'] and r['was'] and r['walk'] and not r['again'] and r['back'] and r['down'] and r['axeOk'], r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No page errors', errs == [], errs[:4])

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
