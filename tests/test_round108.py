"""Round 108: Oswin's first task — the camp's chest opens once its guards are beaten, and no guard hides for good.
  Kris: "i defeated the first 3 monsters for the first quest, but i wasn't able to open the chest".
  Night creatures (hidden and untouchable by day) no longer guard camps; guards still hiding when the rest fall burst out to fight;
  Oswin's camp is one with a chest, and he names it. The camps stay where they were (saves keep their ids).
  Also (Kris: "any other issues like this … lets make sure to correct wherever this might have happened"):
  a spirit's Binder that is a night creature no longer vanishes by day; every camp beaten counts for the Sovereign gauntlets.
python tests/test_round108.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]))
with game() as g:
    g.wait(3000)
    h = g.js("(()=>{ var ws=game.scene.getScene('World'); var C=ws._camps.find(c=>c.id==='c1_16'); return C?[C.T.name,C.tx,C.ty]:null; })()")
    check('The camps are where they were before round 108 (c1_16: %s)' % h, h == ['Bandit Stash', 751, 457], h)
    k = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, P=()=>ZSov.progress(ps).find(p=>p.piece==='sov_gauntlets').have, a=P(); var C=ws._camps.find(c=>c.id.startsWith('c1_')&&c.T.r.k==='food'&&c.state==='guarded'); C.guards.forEach(m=>ws._worldMonsterDied(m)); return {a:a, b:P(), k:C.T.r.k}; })()""")
    check('A food camp beaten now counts for the Sovereign gauntlets (%s)' % k, k['b'] == k['a'] + 1, k)
    n = g.js("""(async()=>{ var ws=game.scene.getScene('World'), A=MX.A(ws); A.night=function(){ return 0; }; var C0=ws._camps.find(c=>c.id==='c1_16'); ws.player.x=C0.x+600; ws.player.y=C0.y; await new Promise(r=>setTimeout(r,800)); var m=MX.spawn(ws,'bramble_wolf',ws.player.x+150,ws.player.y,{q:1,temp:true}); m._binder='sb_test'; ws.worldMonsters.push(m); m._m.aggro=false;
      var w=MX.spawn(ws,'bramble_wolf',ws.player.x-150,ws.player.y,{q:1,temp:true}); ws.worldMonsters.push(w); w._m.aggro=false;
      for(var i=0;i<5;i++){ MX.tick(ws,m,0.05); MX.tick(ws,w,0.05); } return {binderHidden:!!m._m.hidden, binderVis:m.cont.visible, roamerHidden:!!w._m.hidden}; })()""")
    check('By day a night creature roams unseen, but a Binder that is one stays to be fought (%s)' % n, not n['binderHidden'] and n['binderVis'] and n['roamerHidden'], n)
    a = g.js("(()=>{ var ws=game.scene.getScene('World'), bad=[], n=0; ws._camps.forEach(C=>C.guards.forEach(m=>{ n++; if(m.tags&&m.tags.indexOf('night')>=0)bad.push(C.id+':'+m.rid); })); return {n:n, bad:bad}; })()")
    check('No camp in the world is guarded by a night creature (%d guards)' % a['n'], a['n'] > 100 and not a['bad'], a)
    b = g.js("(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ZOSW.give(ws); var C=ZOSW.camp(ws); window._C=C; return {k:C.T.r.k, name:C.T.name, n:C.guards.length, east:C.tx>CENTER_X, line:ZOSW.remind(ws)}; })()")
    check('Oswin\'s purse is in a camp with a chest, east of the village, and he names it (%s)' % b, b['k'] == 'chest' and b['east'] and b['name'] in b['line'], b)
    f = g.js("(()=>{ var ws=game.scene.getScene('World'), T=ws.playerState.tq, keep=T.campId, o=ws._camps.find(C=>C.sec===1&&C.T.r.k!=='chest'&&C.state==='guarded'); T.campId=o.id; var C=ZOSW.camp(ws), r={was:o.T.name, now:C.T.name, k:C.T.r.k, id:T.campId===C.id}; T.campId=keep; return r; })()")
    check('An older save whose camp has no chest is given one that has (%s)' % f, f['k'] == 'chest' and f['id'], f)
    c = g.js("""(()=>{ var ws=game.scene.getScene('World'); var G=_C.guards, last=G[G.length-1]; last._m=last._m||{}; last._m.hidden=true; last._m.lurk=true; last.cont.setVisible(false);
      G.slice(0,-1).forEach(m=>ws._worldMonsterDied(m)); return {state:_C.state, hidden:!!last._m.hidden, vis:last.cont.visible, aggro:!!last._m.aggro}; })()""")
    check('The last guard, still hiding when the rest fall, bursts out to fight (%s)' % c, c['state'] == 'guarded' and not c['hidden'] and c['vis'] and c['aggro'], c)
    d = g.js("(()=>{ var ws=game.scene.getScene('World'); _C.guards.forEach(m=>ws._worldMonsterDied(m)); ws.player.x=_C.x; ws.player.y=_C.y+20; return {state:_C.state, tq:ws.playerState.tq.camp, g:ws.playerState.gold}; })()")
    g.wait(1500)
    g.page.keyboard.down('Tab'); g.wait(400); g.page.keyboard.up('Tab'); g.wait(800)
    e = g.js("(()=>{ var ws=game.scene.getScene('World'); return {state:_C.state, g:ws.playerState.gold}; })()")
    check('All beaten: Oswin\'s purse is paid, and Tab opens the chest (%s → %s)' % (d, e), d['state'] == 'open' and d['tq'] == 3 and e['state'] == 'spent' and e['g'] > d['g'], (d, e))
print('%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
