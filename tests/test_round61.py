"""Round 61 — Kris's picks built: Asgard dressed in the painted pieces (walls, towers, gate, the citadel and two halls, the world-tree circle,
the crystal Bifröst, the iron-cradle notch, the cream rune-paving), the story panels in the cut-scenes, the combined sky panel ordered; the potions
rebalanced and expanded (healing by realm, elixirs, mana, spell oils, coatings, flasks thrown with P held, boons, stronger wards); the round 60
paintings wired (forge monsters, moving hearths).
Run: python tests/test_round61.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"

with game(new=True, painted=True) as g:
    g.wait(4500)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ps.asgardDown=1; ps.bifrost=1; await w(3200);
      var P=ZASG.plan(ws), D=ws._asgDress||[], keys=D.filter(function(o){ return o.texture; }).map(function(o){ return o.texture.key; }), has=function(id){ return keys.some(function(k){ return k.indexOf('_'+id+'_')>=0; }); };
      var lots=ZASG.lots(ws), solid=lots.every(function(L){ return ws.wd.tiles[L.y][L.x]===T.BUILDING_WALL; }), bif=(ws._bifRb&&ws._bifRb.list||[]).filter(function(o){ return o.texture&&/bif_b/.test(o.texture.key); }).length;
      return {walls:has('asgA_wall'), towA:has('asgA_tower'), towC:has('asgC_tower'), gate:has('asgA_gate'), keep:has('asg_keep_a'), halls:has('asg_keep_b')&&has('asg_keep_c'), circle:has('asg_circle_c'), lots:lots.map(function(L){ return L.id; }), solid:solid,
        bif:bif, ground:ZScn.ground('plaza','asgslab'), notch:ZASG.NOTCH, notchImg:!!(ws._asgNotch&&ws._asgNotch.texture&&/notch_c/.test(ws._asgNotch.texture.key)), heart:ZASG.heart(ws)}; })()""" % W)
    check('Asgard wears Kris\'s picks: A walls, both towers, the A gate, the citadel of spires with the two halls beside it (solid), the world-tree circle at the heart, %d crystal Bifröst slabs, the iron-cradle notch, the cream rune-paving (%s)' % (r['bif'], r['ground']),
          r['walls'] and r['towA'] and r['towC'] and r['gate'] and r['keep'] and r['halls'] and r['circle'] and r['solid'] and r['lots'] == ['asg_keep_a', 'asg_keep_b', 'asg_keep_c'] and r['bif'] >= 6 and r['ground'] == 'tx_asg_b' and r['notchImg'], r)
    r = g.js("""(async()=>{ %s var o={sink:ZASG.panelOf('sink'), sky:ZASG.panelOf('sky'), lake:ZASG.panelOf('lake')}; var done=0; ZCINE.panel(o.sink,'test',900,function(){ done=1; }); await w(300); var el=document.getElementById('zcine-panel'); o.shown=!!el&&/pn_musp_sink_a/.test(el.innerHTML); o.z=el&&parseInt(el.style.zIndex);
      await w(1900); o.done=done; o.gone=!document.getElementById('zcine-panel'); var none=0; ZCINE.panel(null,'',500,function(){ none=1; }); o.none=none;
      o.sinkCode=/panelOf\(["']sink/.test(ZESC.sink.toString()); o.descCode=/panelOf\(["']sky/.test(ZASG.descend.toString())&&/panelOf\(["']lake/.test(ZASG.descend.toString()); return o; })()""" % W)
    check('The story panels play in the cut-scenes: Muspelheim sinks (%s), Asgard opens in the sky (%s — the joined panel C once painted), Asgard on the lake (%s); over the HUD, then gone' % (r['sink'], r['sky'], r['lake']),
          r['sink'] == 'pn_musp_sink_a' and r['sky'] == 'pn_asg_sky_c' and r['lake'] == 'pn_asg_lake_a' and r['shown'] and r['z'] > 1000 and r['done'] == 1 and r['gone'] and r['none'] == 1 and r['sinkCode'] and r['descCode'], r)

    # ── the potions ──
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.unlockedSections=[1,2,3,4]; ps.gold=99999; openBuildingShop('apothecary',ps,ws); var el=document.getElementById('camp-content'), names=Array.from(el.querySelectorAll('.si-name')).map(function(n){ return n.textContent; }), txt=el.textContent;
      closeModal('camp'); var price=function(k){ return ITEMS[k].buy; };
      return {n:names.length, old:['Health Potion','Mega Potion','Life Flask','Area 1 Potion','Minor Potion'].filter(function(x){ return names.indexOf(x)>=0; }), has:['Minor Healing','Superior Healing','Grand Elixir','Troll-blood Tonic','Mana Draught','Arcane Surge','Runic Tea','Frostbite Oil','Gloam Oil','Fire Coating','Silvered Edge','Fire Flask','Smoke Pellet','Giant\\'s Draught','Phoenix Draught','Prismatic Ward'].filter(function(x){ return names.indexOf(x)<0; }),
        heads:['Spell oils','Weapon coatings','Flasks','Boons','Element wards'].filter(function(x){ return txt.indexOf(x)<0; }), prices:[price('pot_heal1'),price('pot_heal2'),price('pot_heal3'),price('pot_heal4'),price('pot_elixir'),price('pot_grand'),price('boon_phoenix'),price('ward_fire'),price('ward_prism')]}; })()""")
    check('The apothecary shelves: the new potions in groups (%d rows), the old healing potions retired; prices %s' % (r['n'], r['prices']),
          not r['old'] and not r['has'] and not r['heads'] and r['prices'] == [15, 35, 75, 130, 140, 380, 450, 70, 180], r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; var drink=function(id){ ps.inventory.push(id); window._useItem(ps.inventory.lastIndexOf(id)); };
      ps.maxHp=200; ps.hp=50; drink('pot_heal2'); o.h2=ps.hp; ps.hp=50; drink('pot_elixir'); o.el=ps.hp; ps.hp=10; drink('pot_grand'); o.gr=ps.hp;
      ps.hp=20; drink('pot_troll'); await w(2100); o.troll=ps.hp; ps.maxMana=60; ps.mana=0; drink('pot_mana'); o.m1=ps.mana; drink('pot_mana2'); o.m2=ps.mana===ps.maxMana;
      ps.gold=0; var old=ps.maxHp; drink('boon_giant'); o.giant=[old,ps.maxHp]; ps.buffs.zp_giant=Date.now()-1; await w(300); o.giantOff=ps.maxHp;
      drink('boon_gold'); drink('boon_xp'); o.g=ZPOT.g(100); o.x=ZPOT.x(100); drink('ward_fire'); drink('ward_prism'); var S=ZHit.sums(ps); o.res=[Math.round(S.res.fire*100),Math.round(S.res.water*100)]; o.left=ps.inventory.filter(function(k){ return /^(pot_|boon_|ward_)/.test(k); }).length;
      o.hud=document.getElementById('zpot-hud')&&document.getElementById('zpot-hud').textContent; return o; })()""" % W)
    check('Drinking: Healing +45 (%d), Elixir half (%d), Grand Elixir full (%d), Troll-blood heals over time (%d), mana +40 / all (%s/%s), Giant\'s +25%% then off (%s→%d), gold and XP ×1.3 (%d/%d), wards +45%% and the Prismatic +20%% (%s)' % (r['h2'], r['el'], r['gr'], r['troll'], r['m1'], r['m2'], r['giant'], r['giantOff'], r['g'], r['x'], r['res']),
          r['h2'] == 95 and r['el'] == 150 and r['gr'] == 200 and r['troll'] >= 35 and r['m1'] == 40 and r['m2'] and r['giant'] == [200, 250] and r['giantOff'] == 200 and r['g'] == 130 and r['x'] == 130 and r['res'][0] >= 45 and r['res'][1] >= 20 and r['left'] == 0 and r['hud'] and 'Gilded' in r['hud'], r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}, drink=function(id){ ps.inventory.push(id); window._useItem(ps.inventory.lastIndexOf(id)); };
      var m=(ws.worldMonsters||[]).filter(function(q){ return !q.dead; })[0]; if(!m)return {none:1}; m.hp=m.maxHp=99999; var hit=function(kind){ m._zpOilT=0; return ZHit.dmg(ws,m,30,kind,{}); };
      drink('oil_frost'); hit('spell'); o.slow=m._slowT>0; drink('oil_ember'); hit('spell'); o.burn=m._burnT>0; drink('oil_venom'); hit('spell'); hit('spell'); hit('spell'); hit('spell'); o.pois=(m._zpPois||[]).length;
      drink('oil_root'); m._cc=null; hit('spell'); o.root=!!((m._m&&m._m.stunT>0)||m._stun>0); drink('oil_shade'); ps.hp=10; ps.maxHp=500; hit('spell'); o.drain=ps.hp>10; o.oneOil=ps.zpOil;
      drink('coat_fire'); o.els=ZHit.hero('melee').els; o.mult=ZPOT.mult('melee',{}); drink('coat_silver'); for(var i=0;i<5;i++)hit('melee'); o.strip=m._zpStrip>Date.now(); o.def=ZHit.defOf(m);
      ps.mana=0; ps.maxMana=50; drink('pot_surge'); var tome=Object.keys(ITEMS).find(function(k){ return ITEMS[k].spellId==='frost_bolt'; }); ps.equip.spell=tome; ws._spellCd=0; ws._castSpell(); o.surgeCast=ws._spellCd>0&&ps.mana===0;
      drink('pot_tea'); ws._spellCd=0; ps.mana=50; ws._castSpell(); o.teaCd=Math.round(ws._spellCd*100)/100; return o; })()""" % W)
    check('Spell oils on a spell hit: Frostbite slows, Cinder burns, Nightshade poisons (stacks %s), Bramble roots, Gloam drains (one oil at a time: %s); a Fire Coating makes the blade fire (%s, ×%s); the Silvered Edge breaks armour on the 5th hit; Arcane Surge casts with no mana; Runic Tea cuts the cooldown (%s s)' % (r.get('pois'), r.get('oneOil'), r.get('els'), r.get('mult'), r.get('teaCd')),
          r.get('slow') and r.get('burn') and r.get('pois') == 3 and r.get('root') and r.get('drain') and r.get('oneOil') == 'shade' and r.get('els') and r['els'][0] == 'fire' and abs(r['mult'] - 1.15) < 1e-9 and r['strip'] and r['def'] == 0 and r['surgeCast'] and abs(r['teaCd'] - 0.56) < 0.02, r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.inventory=ps.inventory.filter(function(k){ return !(ITEMS[k]&&ITEMS[k].slot==='use'); });
      for(var i=0;i<5;i++)ps.inventory.push('pot_heal1'); ps.gold=9999; for(var j=0;j<6;j++){ window._buyItem('flask_frost',45); } o.flasks=ps.inventory.filter(function(k){ return k==='flask_frost'; }).length; o.heal=ps.inventory.filter(function(k){ return k==='pot_heal1'; }).length;
      var m=(ws.worldMonsters||[]).filter(function(q){ return !q.dead&&!q.isBoss; })[0]; m.x=ws.player.x; m.y=ws.player.y+120; m._cc=null; ws.player.dir='down'; if(ws._heroSt)ws._heroSt.dir='down'; ps.hp=30;
      var ev=new KeyboardEvent('keydown',{key:'p'}); document.dispatchEvent(ev); await w(600); document.dispatchEvent(new KeyboardEvent('keyup',{key:'p'})); await w(700);
      o.thrown=ps.inventory.filter(function(k){ return k==='flask_frost'; }).length; o.frozen=!!(m._stun>0||(m._m&&m._m.stunT>0)||m._slowT>0); o.healKept=ps.inventory.filter(function(k){ return k==='pot_heal1'; }).length;
      ps.hp=10; document.dispatchEvent(new KeyboardEvent('keydown',{key:'p'})); await w(80); document.dispatchEvent(new KeyboardEvent('keyup',{key:'p'})); await w(300); o.tap=ps.inventory.filter(function(k){ return k==='pot_heal1'; }).length; o.flaskAfterTap=ps.inventory.filter(function(k){ return k==='flask_frost'; }).length;
      updateInventoryModal(ps); o.row=!!document.getElementById('zquick-row')&&/Hold P/.test(document.getElementById('zquick-row').textContent); return o; })()""" % W)
    check('The bag: five healing potions and five Frost Flasks besides (%d, the sixth refused); holding P throws the readied flask (%d left, the foe frozen); a tap still drinks (%d healing left); the quick-use row shows the flask' % (r['flasks'], r['thrown'], r['tap']),
          r['flasks'] == 5 and r['heal'] == 5 and r['thrown'] == 4 and r['frozen'] and r['healKept'] == 5 and r['tap'] == 4 and r['flaskAfterTap'] == 4 and r['row'], r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.buffs={}; ps.inventory.push('boon_phoenix'); window._useItem(ps.inventory.lastIndexOf('boon_phoenix')); ps.maxHp=100; ps.hp=0; ws._worldPlayerDied(); await w(400);
      var o={hp:ps.hp, dying:!!ws._dying, gone:!ZPOT.on(ps,'zp_phoenix')}; return o; })()""" % W)
    check('The Phoenix Draught: you fall and rise again at 40%% (%s HP), once' % r['hp'], r['hp'] == 40 and not r['dying'] and r['gone'], r)
    r = g.js("""(()=>{ var D=null; return {painted:['pot_heal1','oil_frost','coat_silver','flask_thunder','boon_phoenix','ward_prism'].every(function(k){ return ZIcon.has('ic_'+k); }), cave:['potion','mega_potion','potion_a1'].every(function(k){ return ITEMS[k].buy===0&&ITEMS[k].heal>0; }), icons:['pot_heal1','oil_frost','flask_fire','ward_prism'].every(function(k){ return ITEMS[k]._k===k; })}; })()""")
    check('The old potions stay usable when carried (off the shelves); every new potion has its painted icon (wave 63 in)', r['cave'] and r['icons'] and r['painted'], r)
    # the round 60 paintings, wired
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'); ZFORGE.enter(ws,'volcano_s',0); await w(6000); var D=game.scene.getScene('Dungeon'), mons=D.monsters.filter(function(m){ return !m.dead; }); var o={painted:mons.filter(function(m){ return m._za; }).length, n:mons.length};
      ZFORGE.enter(ws,'volcano_n',3); await w(6000); D=game.scene.getScene('Dungeon'); var H=D._forgeHearth; o.loop=!!(H&&H.vis&&H.vis._zanim&&H.vis._zanim.anims.isPlaying); D._exitToWorld(null); await w(1500); return o; })()""" % W)
    check('The forge monsters are painted (%d of %d) and the forge hearth moves in the painting' % (r['painted'], r['n']), r['n'] >= 3 and r['painted'] == r['n'] and r['loop'], r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

req = json.load(open(os.path.join(os.path.dirname(__file__), '..', 'sprites', 'requests', 'scenery.json'), encoding='utf8'))
ids = {q['id']: q for q in req['requests']}
c = ids.get('sc_pn_asg_sky_c', {})
check('Ordered (wave 63): the potion icons (%d) and the joined sky panel C (no lion; refs %s)' % (sum(len(ids[k].get('items', ids[k].get('poses', []))) for k in ('sc_ic_pot_1', 'sc_ic_pot_2') if k in ids), c.get('refs')),
      'sc_ic_pot_1' in ids and 'sc_ic_pot_2' in ids and c and 'NO lion' in json.dumps(c) and (c.get('refs') or [])[-2:] == ['sc_pn_asg_sky_a', 'sc_pn_asg_sky_b'])
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
