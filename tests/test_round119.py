"""Round 119: shield monsters are slow to turn when you get behind them (09-monster-engine MX.TURN), and the economy review
(tools/economy → the Lab's Economy tab, LECO).
python tests/test_round119.py   (after node build.mjs)"""
import sys, os, json, math; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]), flush=True)
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# a shield monster facing the hero; the hero steps round behind it; the monster's turning is ticked by hand (the scene is paused)
TURN = """(()=>{ var ws=game.scene.getScene('World'); game.scene.pause('World'); var P=ws.player, mon=MX.spawn(ws,'shieldwall_dwarves',P.x+60,P.y);
  ws.worldMonsters.push(mon); var m=mon._m; m.aggro=true; m.face=Math.PI; var A=function(){ return Math.atan2(P.y-mon.y,P.x-mon.x); }, off=function(){ return Math.abs(Math.atan2(Math.sin(A()-m.face),Math.cos(A()-m.face))); };
  var X=mon.x, Y=mon.y, t=function(s){ for(var i=0;i<Math.round(s/0.05);i++){ mon.x=X; mon.y=Y; try{ MX.tick(ws,mon,0.05); }catch(e){} } mon.x=X; mon.y=Y; };
  var o={}; t(0.3); o.front=+off().toFixed(2);                          /* the hero in front: it keeps facing him */
  P.x=X+60; o.behind0=+off().toFixed(2); t(0.4); o.after04=+off().toFixed(2);   /* behind it: for half a second it does not turn */
  t(1.0); o.after14=+off().toFixed(2); t(2.2); o.after36=+off().toFixed(2);
  o.turn=MX.TURN; mon.dead=true; if(mon.cont)mon.cont.destroy(); ws.worldMonsters.splice(ws.worldMonsters.indexOf(mon),1); game.scene.resume('World'); return o; })()"""
with game() as g:
    g.wait(3500)
    o = g.js(TURN)
    check('A shield monster keeps its front to a hero in front of it (%s)' % o, o['front'] < 0.2, o)
    check('…when the hero gets behind it, it waits half a second before it starts to turn (%.2f → %.2f rad)' % (o['behind0'], o['after04']), o['behind0'] > 3 and abs(o['after04'] - o['behind0']) < 0.05, o)
    turned = o['after04'] - o['after14']
    check('…then turns slowly: %.2f rad in a second (it used to be 1.8), and is round again within about 3.5 s (%.2f)' % (turned, o['after36']), 0.7 <= turned <= 0.95 and o['after36'] < 1.2, o)
    errs = [x for x in g.errs if 'favicon' not in x and '404' not in x and 'decode audio' not in x]
    check('No page errors', errs == [], errs[:4])
# the economy review
M = json.load(open(os.path.join(R, 'sprites', 'requests', 'economy_model.json')))
tin = sum(sum(v.values()) for v in M['sources'].values()); tout = sum(sum(v.values()) for v in M['sinks'].values())
inside = sum(v['Monsters inside sites'] for v in M['sources'].values())
check('Economy model: every realm measured (in %d g, out %d g; monsters inside sites %d %% of all gold)' % (tin, tout, inside / tin * 100), len(M['sources']) == 4 and tin > 100000 and 0.6 < inside / tin < 0.9)
check('…every site run is costed (%d sites, the rematch outpays the first win at the boss sites)' % len(M['sites']),
      len(M['sites']) >= 40 and all(s['again'] > s['first'] for s in M['sites'] if s['kind'].startswith('Boss')))
lab = open(os.path.join(R, 'lab', 'lab.artifact.html'), encoding='utf8').read()
ids = ['cut', 'prize', 'chests', 'alpha', 'floor', 'squeeze', 'pity', 'collect', 'death', 'xpmoments', 'overflow', 'ledger', 'rarity', 'bounty', 'sinks', 'maps', 'coins']
q = lambda t: ("id:'%s'" % t) in lab or ('id:"%s"' % t) in lab
check('The Lab has the Economy tab, its live numbers and all %d proposals' % len(ids), q('economy') and 'LECO.M=' in lab and all(("id:'%s',grp:" % i) in lab or ('id:"%s",grp:' % i) in lab for i in ids))
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
