"""Round 42 — the wave 42 edge-piece sheets are ordered (4 sheets, 48 pieces) and wired: every static feature of the Lab's
terrain cards can stand in the world (painted when its picture is in), and the creatures of the moving cards use their
painted pictures. Kris's picks stay as they are; the test switches everything on to check the paths (with ?scenery=fake
stand-ins for the pictures not painted yet).
Run: python tests/test_round42.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

ALL = """(()=>{ window._PICK0=JSON.parse(JSON.stringify(ZWE.PICK)); var P=ZWE.PICK;
  P.lake.feat=['logs','flowers','stones','puddle','bramble','icefloe']; P.sea.feat=['shells','wrack','marram','sandripples']; P.marsh.feat=['logs','toadstools','duckweed','mudcracks']; P.lava.feat=['obsidian','sulphur','basalt','lavaplate']; P.snow.feat=['icicles','pines','puddles','snowripples','reedsdry']; P.cliff.feat=['moss','alpine','rubble'];
  P.sea.fx=P.sea.fx.concat(['crabs','gulls']); P.lake.fx=P.lake.fx.concat(['dragonflies','fish','butterflies']); P.marsh.fx=P.marsh.fx.concat(['frogs','fireflies']); P.cliff.fx=P.cliff.fx.concat(['birds']); return true; })()"""
JOB = """(async (a)=>{ var ws=game.scene.getScene('World'), wd=ws.wd, j=wpChunkJob(wd,a[0],a[1]), n=0; while(!j.step(30)&&n<4000){ n++; await new Promise(r=>setTimeout(r,5)); }
  var o=j.out; return {zfx:o.zfx?Object.keys(o.zfx):[], err:Object.keys(WP_ERR)}; })"""

with game(new=True, painted=True, query='?scenery=fake') as g:
    g.wait(2500)
    r = g.js("""(()=>{ var S=ZSCN.SHEETS.filter(function(s){ return s.wave===42; }), ids=[].concat.apply([],S.map(function(s){ return s.items.map(function(i){ return i[0]; }); }));
      var used={}; Object.keys(ZWE.FEATPAINT).forEach(function(k){ ZWE.FEATPAINT[k].forEach(function(i){ used[i]=1; }); }); Object.keys(ZWE.CRIT).forEach(function(k){ ZWE.CRIT[k].forEach(function(i){ used[i]=1; }); });
      return {sheets:S.map(function(s){ return s.id; }), n:ids.length, uniq:new Set(ids).size, wired:ids.filter(function(i){ return used[i]; }).length, unwired:ids.filter(function(i){ return !used[i]; }), has:ids.every(function(i){ return ZScn.has(i); })}; })()""")
    check('Wave 42: four edge sheets, 48 new pieces, all with stand-ins until painted; %d of them already wired to a feature or creature' % r['wired'],
          r['sheets'] == ['sc_edge_3', 'sc_edge_4', 'sc_edge_5', 'sc_edge_6'] and r['n'] == 48 and r['uniq'] == 48 and r['has'] and r['wired'] == 48, r)
    r = g.js("({lake:ZWE.PICK.lake.feat, marsh:ZWE.PICK.marsh.feat, sea:ZWE.PICK.sea.feat||null})")
    check("Kris's picks keep the logs at lake and marsh (round 43 switched on the rest of his picks)", 'logs' in r['lake'] and 'logs' in r['marsh'], r)
    g.js(ALL)
    out = {}
    for name, c in [('lake', [21, 16]), ('sea', [30, 16]), ('marsh', [21, 18]), ('cliff', [19, 15]), ('snow', [18, 30])]:
        out[name] = g.js(JOB, c)
    fx = set(sum([v['zfx'] for v in out.values()], []))
    check('With every feature and creature switched on, chunks paint without errors and creatures find their places (%s)' % sorted(fx),
          all(v['err'] == [] for v in out.values()) and {'crabs', 'dragonflies'} <= fx, out)
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'); var k=ZWE.critTex(ws,'leaves'), c=ZWE.critTex(ws,'crabs'); ws._wr.chunks.forEach(function(ch){ ws._wrUnmount(ch); }); ws._wr.chunks.clear(); ws._updateChunks(false);
      await new Promise(r=>setTimeout(r,9000)); var em=0; ws._wr.chunks.forEach(function(ch){ ch.objs.forEach(function(o){ if(o._zfx)em++; }); }); return {leaves:k.length, crabs:c.length, em:em, err:Object.keys(WP_ERR)}; })()""")
    check('Painted creature textures are made from the pictures (3 leaves, a crab) and the emitters mount (%d)' % r['em'], r['leaves'] == 3 and r['crabs'] == 1 and r['em'] >= 1 and r['err'] == [], r)
    g.js("(()=>{ ZWE.PICK=window._PICK0; })()")
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No page errors', errs == [], errs[:4])

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
