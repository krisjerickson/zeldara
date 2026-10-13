"""Round 48 — the painted sheets of waves 49 and 50 wired in: the sleeping hero in the house bed, the 8-frame butterflies and dragonflies, the
painted empty space (rock and sea textures, fog banks, clouds and peaks, the night sky, the creatures), and the painted area effects (warnings,
ground patches, bursts, the hero's skills and spells).
Run: python tests/test_round48.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

with game(new=True, painted=True) as g:
    g.wait(5000)
    r = g.js("""(()=>{ var ids=[]; ZSCN.SHEETS.filter(function(S){ return S.wave===49||S.wave===50; }).forEach(function(S){ (S.items||[]).forEach(function(it){ ids.push(it[0]); }); }); var miss=ids.filter(function(id){ return S0(id); });
      function S0(id){ return /^tx_/.test(id)?!ZScn.timg[id]:!ZScn.has(id); } return {n:ids.length, miss:miss.slice(0,12)}; })()""")
    check('All %d pictures of waves 49 and 50 are in the game' % r['n'], r['n'] >= 100 and not r['miss'], r)
    r = g.js("({s:ZWE.frames('an_sleep2_m'),w:ZWE.frames('an_wake2_f'),b:ZWE.frames('an_butterfly2'),d:ZWE.frames('an_dragonfly2')})")
    check('Animation frames: sleeping and waking (4 each), butterfly and dragonfly (8 each)', r == {'s': 4, 'w': 4, 'b': 8, 'd': 8}, r)
    # ── sleep ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'); ws._enterBuilding({type:'house'}); await new Promise(r=>setTimeout(r,2200)); var b=game.scene.getScene('Building'), bb=null;
      b._bedIms.forEach(function(im){ var q=im.getBounds(); if(!bb||q.width*q.height>bb.width*bb.height)bb=q; }); b._rest(); await new Promise(r=>setTimeout(r,1200));
      var sl=b.children.list.find(function(c){ return c.texture&&/an_sleep2/.test(c.texture.key); }), o={hero:b.bCont.visible, bed:bb?[Math.round(bb.width),Math.round(bb.height)]:null, pic:sl?[Math.round(sl.displayWidth),Math.round(sl.displayHeight)]:null};
      await new Promise(r=>setTimeout(r,6000)); b._exitBuilding(); await new Promise(r=>setTimeout(r,1000)); return o; })()""")
    check('Sleeping uses the new painted frames, the bed the size of the house bed (bed %s, picture %s), the hero out of the room' % (r['bed'], r['pic']),
          r['pic'] and r['bed'] and abs(r['pic'][0] - r['bed'][0]) <= r['bed'][0] * 0.2 and not r['hero'], r)
    # ── painted area effects ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), p=ws.player, A=MX.A(ws), x=p.x, y=p.y; ws.playerState.godMode=true;
      MX.tele.circle(A,x-160,y,60,'#ff9040',5); MX.tele.cone(A,x,y-160,0.6,120,0.5,'#ff5030',5); MX.zone(A,{x:x+160,y:y,r:50,t:8,st:'poison'}); ws._spellNovaEffect(x,y+160,70,0xff6600,0,'fire','x');
      await new Promise(r=>setTimeout(r,250)); var im=ws.children.list.filter(function(o){ return o.texture&&/^zfx_/.test(o.texture.key); }).map(function(o){ return [o.texture.key.slice(4),Math.round(o.displayWidth),Math.round(o.alpha*100)]; });
      return im; })()""")
    keys = sorted(set(k for k, w, a in r))
    zone = [w for k, w, a in r if k == 'fx_zone_poison']
    check('Painted area effects: warning circle and wedge, the poison patch (%s px for a 50 px radius) and the fire nova (%s)' % (zone, keys),
          {'fx_tele_circle', 'fx_zone_poison', 'fx_burst_fire'} <= set(keys) and zone and 90 <= zone[0] <= 110 and all(a > 20 for k, w, a in r if k != 'fx_burst_fire'), r)      # round 50: monster attack drawings show at 60 % of their opacity
    # ── the painted empty space ──
    L = """(([id,floor])=>{var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.id===id); ws.playerState.godMode=true;
      var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
      if(game.scene.isActive('Dungeon'))game.scene.stop('Dungeon'); if(game.scene.isActive('World'))ws.scene.sleep('World'); game.scene.start('Dungeon',data);})"""
    out = {}
    for sid, fl in (('s3_dungeon', 0), ('mage_rift_tower', 1), ('s3_b_sky_cloister', 1), ('s2_b_crystal_grotto', 0)):
        g.js(L, [sid, fl]); g.wait(5000)
        out[sid] = g.js("""(()=>{ var d=game.scene.getScene('Dungeon'), m=d._lab, S=d._zv; for(var i=0;i<3;i++)ZVOID.creature(d); return {k:ZVOID.kindOf(m.zvoid), rock:m.zvoid.rock, dr:S&&S.dr?S.dr.length:0, ids:S&&S.dr?Array.from(new Set(S.dr.map(function(q){ return q.o.texture.key.slice(4); }))):[], crit:S?S.crit.map(function(c){ return c.texture.key; }):[]}; })()""")
    o = out
    check('The empty space is painted: fog banks over the abyss, the milky way / nebulae / aurora / planet round the shadow tower, clouds and far peaks round the sky cloister; painted creatures (%s)' % {k: (v['k'], v['dr']) for k, v in o.items()},
          o['s3_dungeon']['dr'] >= 6 and 'vd_fog_bank_1' in o['s3_dungeon']['ids'] and 'vd_milkyway' in o['mage_rift_tower']['ids'] and 'vd_peak_1' in o['s3_b_sky_cloister']['ids']
          and any('vd_' in c for v in o.values() for c in v['crit']), o)
    check('Underground rock follows the element: water sites in ore-veined granite (%s)' % o['s2_b_crystal_grotto']['rock'], o['s2_b_crystal_grotto']['rock'] == 'tx_v_ore', o['s2_b_crystal_grotto'])
    g.js("(()=>{ var ws=game.scene.getScene('World'); game.scene.stop('Dungeon'); ws.scene.wake('World'); })()"); g.wait(1500)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
