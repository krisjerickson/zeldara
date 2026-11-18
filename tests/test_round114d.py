"""Round 114d: tree chopping removed altogether. Kris: "1. driftwood is good 2. turn into gold 3. keep name 4. remove chopping entirely".
python tests/test_round114d.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
with game(painted=True) as g:
    g.wait(3000)
    a = g.js("""(()=>{ var ws=%s, P=WorldScene.prototype; return {code:typeof ZCHOP==='undefined'&&!P._chopTree&&!P._chopInit&&typeof _chopStump==='undefined', log:!ITEMS.wood_log, axe:ITEMS.axe&&ITEMS.axe.name, cue:!(ZAUD.CUES||[]).some(function(c){ return (c[0]||c.id)==='sfx_chop'; })}; })()""" % WS)
    check("No chopping code, no wood logs, the chop sound gone; the Woodcutter's Axe keeps its name (%s)" % a, a['code'] and a['log'] and a['axe'] == "Woodcutter's Axe", a)
    # an old save with wood: it becomes gold when it loads (the world calls _zWoodToGold as it starts)
    b = g.js("""(()=>{ var ps={wood:7,chopped:['1_2_tree'],gold:10,inventory:['bread','wood_log','wood_log'],equip:{}}; _zWoodToGold(ps,null); var P=WorldScene.prototype, src=Object.getOwnPropertyNames(P).some(function(k){ try{ return typeof P[k]==='function'&&P[k].toString().indexOf('_zWoodToGold(')>=0; }catch(e){ return false; } });
      return {gold:ps.gold, wood:ps.wood, chopped:ps.chopped, inv:ps.inventory, called:src}; })()""")
    check('An old save: its 7 wood and 2 logs become 45 gold as it loads, and nothing of chopping is left in it (%s)' % b, b['gold'] == 55 and b.get('wood') is None and b.get('chopped') is None and b['inv'] == ['bread'] and b['called'], b)
    c = g.js("""(()=>{ var q=ZNPCQ.Q.find(function(x){ return x.id==='bench'; }), st=q&&q.steps[0]; return {k:st&&st.k, n:st&&st.items&&st.items.length, at:st&&st.items&&st.items.map(function(i){ return i.at; }), wood:JSON.stringify(q).indexOf('wood_log')>=0}; })()""")
    check("Bram's bench: five pieces of driftwood on the shores (it asked for chopped logs) (%s)" % c, c['k'] == 'fetch' and c['n'] == 5 and all(x.startswith('shore:') for x in c['at']) and not c['wood'], c)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No page errors', errs == [], errs[:4])
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
