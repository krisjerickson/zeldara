"""Round 41 — Kris's round 40 terrain picks in the world (a blend per place, both blends on land-against-land edges, wet-sand
shine and foam on the sea, falling leaves, will-o'-wisps, pulsing lava cracks, logs and mossy rocks), and the painted edge
pieces (sc_edge_1/2, page edges-0) used along the edges.
Run: python tests/test_round41.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

JOB = """(async (a)=>{ var ws=game.scene.getScene('World'), wd=ws.wd, j=wpChunkJob(wd,a[0],a[1]), n=0; while(!j.step(30)&&n<4000){ n++; await new Promise(r=>setTimeout(r,5)); }
  var o=j.out; return {flip:!!o.flip, zfx:o.zfx?Object.keys(o.zfx):[], cracks:!!o.cracks, err:Object.keys(WP_ERR)}; })"""

with game(new=True, painted=True) as g:
    g.wait(2500)
    r = g.js("({f:ZWE.field(), lakeFeat:ZWE.feat('lake','logs'), marshFeat:ZWE.feat('marsh','logs'), fx:[ZWE.fx('sea','sheen'),ZWE.fx('sea','foamdrift'),ZWE.fx('cliff','leaves'),ZWE.fx('marsh','wisps'),ZWE.fx('lava','cracks')]})")
    bl = r['f']['bl']
    check('His picks are the settings: land edges carry the grass lip AND the frost, lakes the damp bank, the sea turquoise shallows, the marsh lush banks, lava glowing cracks; logs at lakes and marsh; shine, foam, leaves, wisps and pulsing cracks move',
          bl[0] == (1 << 7) | (1 << 8) and bl[1] == 1 << 4 and bl[2] == 1 << 6 and bl[3] == 1 << 8 and bl[4] == 1 << 9 and r['lakeFeat'] and r['marshFeat'] and all(r['fx']), r)
    r = g.js("(()=>{ var ids=['ed_tuft_a','ed_tuft_b','ed_tuft_dry','ed_reeds','ed_cattails','ed_lily','ed_pebbles','ed_shells','ed_driftwood','ed_shore_rock','ed_foam','ed_bank','ed_talus_a','ed_talus_b','ed_foot_boulder','ed_cliff_grass','ed_roots','ed_mud_clods','ed_snow_drift','ed_snow_lip','ed_ice_shards','ed_crust_shards','ed_ember_rocks','ed_ash_heap']; return {miss:ids.filter(function(i){ return !ZScn.has(i); }), page:ZScn.META.items.ed_reeds&&ZScn.META.items.ed_reeds[0], tuft:ZWE.painted('tuft',0.1), shore:ZWE.painted('shore_rock',0)}; })()")
    check('All 24 painted edge pieces are in the game (page %s) and the painter picks them' % r['page'], r['miss'] == [] and r['page'] == 'edges-0' and r['tuft'] == 'ed_tuft_a' and r['shore'] == 'ed_shore_rock', r)
    sea = g.js(JOB, [30, 16]); marsh = g.js(JOB, [21, 18])
    check('Chunks paint with the new pieces and movements without errors (sea: %s; marsh: %s)' % (sea['zfx'], marsh['zfx']), sea['flip'] and sea['err'] == [] and marsh['err'] == [], [sea, marsh])
    r = g.js("""(async ()=>{ var wd=game.scene.getScene('World').wd, KL=WK_REG.list, W=WORLD_W, best=null, lv=null;
      for(var cy=0;cy<38&&!best;cy++)for(var cx=0;cx<38&&!best;cx++){ var lava=0, crust=0; for(var y=cy*32;y<cy*32+32;y+=4)for(var x=cx*32;x<cx*32+32;x+=4){ var k=KL[wd.kind[y*W+x]]; if(k&&k.lava)lava++; else if(k&&/crust|ash/.test(k.id))crust++; } if(lava>4&&crust>4)best=[cx,cy]; }
      if(!best)return {none:true}; var j=wpChunkJob(wd,best[0],best[1]), n=0; while(!j.step(30)&&n<4000){ n++; await new Promise(r=>setTimeout(r,5)); } return {c:best,cracks:!!j.out.cracks,embers:!!(j.out.zfx&&j.out.zfx.embers)}; })()""")
    check('A lava chunk gets its pulsing cracks and embers', not r.get('none') and r['cracks'] and r['embers'], r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No page errors', errs == [], errs[:4])

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
