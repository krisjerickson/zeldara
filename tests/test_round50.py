"""Round 50 — the monsters' area and line attacks partly see-through and drawn under the hero and his familiars (Kris: "they are a bit too
distracting in the game, especially when they cover up the hero and familiars").
Run: python tests/test_round50.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

L = """(([id,floor])=>{var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.id===id); ws.playerState.godMode=true;
  var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
  if(game.scene.isActive('Dungeon'))game.scene.stop('Dungeon'); if(game.scene.isActive('World'))ws.scene.sleep('World'); game.scene.start('Dungeon',data);})"""
# every kind of area / line attack fired at the hero, with a monster standing just below him (so its own depth is above his)
FIRE = """(async (key)=>{ var s=game.scene.getScene(key), A=MX.A(s), AT=MX.ATK, P=A.p(), mons=(s.worldMonsters||s.monsters||[]).filter(function(m){ return !m.dead&&m._m; });
  mons.sort(function(a,b){ return Math.hypot(a.x-P.x,a.y-P.y)-Math.hypot(b.x-P.x,b.y-P.y); }); var mon=mons[0], m=mon._m; mon.x=P.x+40; mon.y=P.y+50; if(mon.cont)mon.cont.setPosition(mon.x,mon.y);
  var a=Math.atan2(P.y-mon.y,P.x-mon.x), n0=(s.children.list.length);
  MX.tele.circle(A,P.x,P.y+30,60,'#ff5030',3); MX.tele.cone(A,mon.x,mon.y,a,140,0.5,'#ff5030',3); MX.tele.line(A,mon.x,mon.y,a,160,'#ff4040',3);
  MX.zone(A,{x:P.x,y:P.y+20,r:60,t:6,st:'poison'}); AT.breath.fire(A,mon,m,P,{col:'#ff9040',r:120},{a0:a}); AT.beam.fire(A,mon,m,P,{col:'#ff6060',len:200},{a0:a});
  AT.gust.fire(A,mon,m,P,{r:150}); AT.pull.fire(A,mon,m,P,{col:'#ff7090',m:0}); var db={t:0}; AT.drain.fire(A,mon,m,P,{},db); AT.drain.act(A,mon,m,P,{},db,0.016);
  var rb={}; AT.ring.fire(A,mon,m,P,{gap:1},rb); AT.ring.act(A,mon,m,P,{gap:1},rb,0.1); MX.fxRing(A,P.x,P.y+10,50,'#c8b090');
  var shot=null; MX.proj(A,{x:mon.x,y:mon.y,vx:-100,vy:-100,kind:'rock',col:'#9a8a78',dmg:1,src:mon}); var proj=MX.fx(A).proj||MX.fx(A).shots||[]; shot=proj.length?proj[proj.length-1]:null;
  await new Promise(function(r){ setTimeout(r,120); });
  var h=s.pCont||s.player.cont, F=s._famVisuals||{}, cap=h.depth; Object.keys(F).forEach(function(k){ if(F[k].active&&F[k].depth<cap)cap=F[k].depth; });
  var L=(s._zmfxL||[]).filter(function(o){ return o.scene&&o.visible!==false&&!o.parentContainer; }), above=L.filter(function(o){ return o.depth>=cap; }).map(function(o){ return [o.type,o.texture&&o.texture.key,o.depth]; });
  var op=L.filter(function(o){ return o._zab>0.05; }).map(function(o){ return Math.round(o.alpha/o._zab*100)/100; });
  var allP=s.children.list.filter(function(o){ return o.visible&&o.texture&&/zfx_fx_|zsoft_/.test(o.texture.key)&&!/fx_pj_|zs_/.test(o.texture.key); }), pics=allP.map(function(o){ return o.texture.key.replace('zfx_',''); });
  above=above.concat(allP.filter(function(o){ return o.depth>=cap; }).map(function(o){ return ['pic',o.texture.key,o.depth]; }));
  var g=shot&&(shot.g||shot.vis||shot.o); return {n:L.length, above:above, op:Array.from(new Set(op)), pics:Array.from(new Set(pics)), heroD:h.depth, cap:cap, monD:mon.cont?mon.cont.depth:null, shotIn:!!(g&&g._zm), monIn:!!(mon.cont&&mon.cont._zm)}; })"""

with game(new=True, painted=True) as g:
    g.wait(4000)
    g.js("(()=>{ var ps=game.scene.getScene('World').playerState; ps.godMode=true; ps.ownedFamiliars=['fam_fire','fam_water']; ps.familiar='fam_fire'; ps.familiar2='fam_water'; })()"); g.wait(2500)
    for key, site in (('Dungeon', 's2_dungeon'), ('World', None)):
        if site: g.js(L, [site, 0]); g.wait(6000)
        if key == 'Dungeon': g.js("(()=>{ var d=game.scene.getScene('Dungeon'); if(d._darkRT){ d._labDark=0; d._darkRT.setVisible(false); } })()")
        r = g.js(FIRE, key)
        check('%s: %d monster attack drawings (and every painted picture on them), none above the hero or his familiars (hero %.5f, lowest %.5f; a monster below him at %s)' % (key, r['n'], r['heroD'], r['cap'], r['monD']), r['n'] >= 12 and not r['above'], r['above'][:6])
        check('%s: each at 60%% of the opacity its attack asks for (%s)' % (key, r['op']), r['op'] and all(abs(x - 0.6) < 0.02 for x in r['op']), r)
        check('%s: the painted pictures among them (%s)' % (key, ', '.join(r['pics'][:8])), any('breath' in p for p in r['pics']) and any('tele_circle' in p for p in r['pics']) and any('zone' in p for p in r['pics']), r['pics'])
        check('%s: shots and the monsters themselves are left as they were' % key, not r['shotIn'] and not r['monIn'], r)
        if key == 'Dungeon':
            g.js("(()=>{ var d=game.scene.getScene('Dungeon'); d.cameras.main.setZoom(2.2); game.loop.sleep(); })()"); g.shot('/tmp/round50_dungeon.png'); g.js("game.loop.wake()")
            g.js("(()=>{ var ws=game.scene.getScene('World'); game.scene.stop('Dungeon'); ws.scene.wake('World'); })()"); g.wait(3000)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
