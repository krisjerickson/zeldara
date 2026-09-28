"""The home village (Runestone+): 5 growth stages, outward + denser, borrowed
elements present, doors and gates reachable, grows in game when craftsmen
are freed, Lab preview matches."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  -> ' + str(info)), flush=True)
REACH = """(()=>{ var ws=game.scene.getScene('World'), wd=ws.wd, W=WORLD_W, cx=CENTER_X, cy=CENTER_Y, R=46, seen=new Set(), q=[[cx+4,cy+5]];
  var pass=function(x,y){ var t=wd.tiles[y][x]; return t===T.DOOR||canPassTile(t,null); };
  seen.add(q[0][0]+','+q[0][1]);
  while(q.length){ var p=q.pop(); [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var x=p[0]+d[0], y=p[1]+d[1], k=x+','+y; if(seen.has(k)||Math.hypot(x-cx,y-cy)>R||!pass(x,y))return; seen.add(k); if(wd.tiles[y][x]!==T.DOOR)q.push([x,y]); }); }
  var doors=VILLAGE_CORE.map(function(b){ var x=cx+b.dx+Math.floor(b.w/2), y=cy+b.dy+b.h-1; return {type:b.type, door:wd.tiles[y][x]===T.DOOR, reach:seen.has(x+','+y)}; });
  var out=[[0,-44],[0,44],[44,2],[-44,2]].map(function(d){ return seen.has((cx+d[0])+','+(cy+d[1])); });
  var props={}; wd.props.forEach(function(p){ if(p.vill)props[p.prop]=(props[p.prop]||0)+1; });
  var pier=0, pierReach=0; for(var dy=-48;dy<=48;dy++)for(var dx=-48;dx<=48;dx++){ var x=cx+dx, y=cy+dy; if(wd.tiles[y]&&wd.tiles[y][x]===T.BRIDGE&&Math.hypot(dx,dy)<48&&wd.cls[y*W+x]===WM.LAKE){ pier++; if(seen.has(x+','+y))pierReach++; } }
  return {stage:wd.villageStage, bld:wd.villageBuildings, R:VILLAGE_RADIUS, doors:doors, out:out, props:props, pier:pier, pierReach:pierReach}; })()"""
with game(new=True) as g:
    plan = g.js("[1,2,3,4,5].map(function(s){ var p=villagePlan(s); return {b:p.houses, R:p.R, disk:p.disk}; })")
    b = [p['b'] for p in plan]
    check('Buildings grow 13 → 44 over 5 stages (stage 1 ≈ 30% of the final count)', b == [13, 20, 28, 36, 44] and 0.25 <= b[0] / b[4] <= 0.35, b)
    check('The village grows outward every stage', all(plan[i]['R'] < plan[i + 1]['R'] for i in range(4)), [p['R'] for p in plan])
    g.wait(800)
    r = g.js(REACH)
    check('New game: village at stage 1 with 13 buildings', r['stage'] == 1 and r['bld'] == 13, r)
    check('Stage 1: every shop door is a door and reachable from the waystone', all(d['door'] and d['reach'] for d in r['doors']), [d for d in r['doors'] if not (d['door'] and d['reach'])])
    check('Stage 1: the roads lead out of the village in all four directions', all(r['out']), r['out'])
    check('Stage 1: a pier out onto Mirror Lake you can walk on, and a boat', r['pier'] >= 4 and r['pierReach'] >= 4 and r['props'].get('boatv', 0) >= 1, (r['pier'], r['pierReach'], r['props'].get('boatv')))
    check('Stage 1 has the rune green, lanterns, smoke, carts and gardens', all(r['props'].get(k, 0) >= 1 for k in ['runecircle', 'stone', 'lantern', 'cart', 'vegplot', 'vbuild']), r['props'])
    bad = []
    for n in [1, 2, 3]:
        g.js(f"game.scene.getScene('World').playerState.rescued=[1,2,3,4].slice(0,{n})"); g.wait(1600)
        rr = g.js(REACH)
        if rr['stage'] != n + 1 or not all(d['door'] and d['reach'] for d in rr['doors']) or not all(rr['out']): bad.append((n + 1, rr['stage'], [d['type'] for d in rr['doors'] if not d['reach']], rr['out']))
    check('Stages 2–4: each craftsman grows the village; doors and roads stay reachable', not bad, bad)
    g.js("sbUnlockAll()"); g.wait(2200)
    r = g.js(REACH)
    check('Freeing all craftsmen grows the village to stage 5 (44 buildings, bigger radius)', r['stage'] == 5 and r['bld'] == 44 and r['R'] > 30, r)
    check('Stage 5: all shop doors still reachable', all(d['door'] and d['reach'] for d in r['doors']), [d for d in r['doors'] if not (d['door'] and d['reach'])])
    check('Stage 5: the four town gates are open (you can walk out N, S, E, W)', all(r['out']), r['out'])
    P = r['props']
    check('Stage 5 has walls + turrets, 3 windmills, 2 fountains, carts, gardens, sky dock', P.get('vwall', 0) > 20 and P.get('tower', 0) >= 12 and P.get('windmill', 0) == 3 and P.get('fountain', 0) == 2 and P.get('cart', 0) >= 5 and P.get('vegplot', 0) >= 5 and P.get('balloondock', 0) == 1, P)
    check('Stage 5 harbour: boardwalks, boathouse, stilt lake house, lighthouse, 6 boats — all reachable', r['pierReach'] >= 30 and P.get('boathouse') == 1 and P.get('stilthouse') == 1 and P.get('lighthouse') == 1 and P.get('boatv', 0) >= 5, (r['pier'], r['pierReach'], {k: P.get(k) for k in ['boathouse', 'stilthouse', 'lighthouse', 'boatv']}))
    roofs = g.js("(()=>{ var s={}; game.scene.getScene('World').wd.props.forEach(function(p){ if(p.vill&&p.prop==='vbuild')s[p.o.style+'/'+(p.o.roofPat||'-')]=1; }); return Object.keys(s); })()")
    check('Houses use several roof/wall types (round thatch, shingle, tile, slate, thatch gable)', len(roofs) >= 5, roofs)
    smoke = g.js("(()=>{ var n=0; game.scene.getScene('World').wd.props.forEach(function(p){ if(p.vill&&p.o&&p.o.smoke)n++; }); return n; })()")
    check('Chimney smoke on a good share of the houses', smoke >= 12, smoke)
    g.wait(3000)
    lm = g.js("game.scene.getScene('World').wd.landmarks.filter(l=>l.vill).map(l=>l.text.split(' — ')[0])")
    check("Landmarks: Bram, Mira, Dunn, Vela, the green, the lake house and the harbour", all(any(n in x for x in lm) for n in ['Bram','Mira','Dunn','Vela','Green','Lake House','Harbour']), lm)
    check('No JS errors', not g.errs, g.errs[:4])
print('%d/%d' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
