"""Round 37 — the element system: six elements, up to two on monsters and gear (bosses one), one hit function with defence as a
share, the four named steps, hero resistances, axes and crossbows, the forge tree, gems as adventuring rewards and a stingy
jeweller, gem setting, tonics that work, the mount fixes, and the Tome's Elements / Forge tree / Paths pages.
Run: python tests/test_round37.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

with game(new=True) as g:
    g.wait(1500); g.js("document.getElementById('btn-new')&&document.getElementById('btn-new').click()"); g.wait(800)
    # 1 — the wheel and the steps
    r = g.js("""(()=>{ var t=ZEL.tier, o={};
      o.wheel=[t(['water'],['fire']),t(['fire'],['grass']),t(['grass'],['earth']),t(['earth'],['water']),t(['storm'],['shadow']),t(['shadow'],['storm'])];
      o.back=[t(['fire'],['water']),t(['grass'],['fire']),t(['earth'],['grass']),t(['water'],['earth'])];
      o.same=ZEL.LIST.map(function(e){ return t([e],[e]); }); o.none=[t([],['fire']),t(['fire'],[]),t(['fire'],['storm'])];
      o.bane=t(['fire','storm'],['grass','shadow']); o.warded=t(['fire'],['fire','water']); o.cancel=t(['water'],['fire','earth']); o.best=t(['fire','water'],['water']);
      o.all=[t('all',['grass','shadow']),t('all',['fire'])]; o.boss=[t(['fire','storm'],['grass','shadow'],true),t(['fire'],['fire','water'],true)];
      o.mult=[ZEL.mult(2,'melee'),ZEL.mult(1,'melee'),ZEL.mult(-1,'melee'),ZEL.mult(-2,'melee'),ZEL.mult(1,'melee',true),ZEL.mult(-1,'melee',true),ZEL.mult(2,'familiar'),ZEL.mult(-1,'familiar')];
      o.names=[ZEL.TIER['2'].n,ZEL.TIER['1'].n,ZEL.TIER['-1'].n,ZEL.TIER['-2'].n]; return o; })()""")
    check('The wheel: water > fire > grass > earth > water, storm and shadow against each other; the reverse and the same element resist',
          r['wheel'] == [1]*6 and r['back'] == [-1]*4 and r['same'] == [-1]*6 and r['none'] == [0, 0, 0], r)
    check('Two elements: a two-element weapon finding two weaknesses is Bane (+2), a foe whose two elements both turn the hit is Warded (−2), a weakness and a resistance cancel, a weapon uses its better element; "all" stops at Weak; bosses stop at one step',
          r['bane'] == 2 and r['warded'] == -2 and r['cancel'] == 0 and r['best'] == -1 and r['all'] == [1, 1] and r['boss'] == [1, -1], r)
    check('The steps are named, not numbered: Bane, Weak, Resists, Warded (×2, ×1.5, ×0.6, ×0.35); bosses ×1.25 / ×0.8; a familiar gains only ×1.2 from a weakness and loses in full',
          r['mult'] == [2, 1.5, 0.6, 0.35, 1.25, 0.8, 1.2, 0.6] and r['names'] == ['Bane', 'Weak', 'Resists', 'Warded'], r)
    # 2 — monsters
    r = g.js("""(()=>{ var kit=MON_ROSTER.filter(function(R){ return MX.kit(R.id); }), miss=kit.filter(function(R){ return !MON_EL[R.id]; }).map(function(R){ return R.id; }), bad=kit.filter(function(R){ var e=MON_EL[R.id]||[]; return e.length>2||e.some(function(x){ return !ZEL.E[x]; })||(e.length===2&&e[0]===e[1]); }).map(function(R){ return R.id; });
      var two=kit.filter(function(R){ return (MON_EL[R.id]||[]).length===2; }), twoLow=two.filter(function(R){ return R.tier<4&&R.seg==='main'; }).map(function(R){ return R.id; });
      var per={}; kit.forEach(function(R){ var e=(MON_EL[R.id]||[])[0]||'none'; per[R.q]=per[R.q]||{}; per[R.q][e]=(per[R.q][e]||0)+1; });
      var bosses=Object.keys(BOSS_EL).every(function(k){ return typeof BOSS_EL[k]==='string'&&ZEL.E[BOSS_EL[k]]; });
      var ws=game.scene.getScene('World'), b={isBoss:true,bossKey:'lava_titan',def:{boss:true}}, w={isBoss:true,bossKey:'cw_q2_c',def:{}}, m={isBoss:true,bossKey:'mg_ember_observatory',mageBoss:true,def:{}}, el={rid:'thistle_hog',def:{elite:true,sec:1}}, leg={type:'goblin_king',def:{boss:true},isBoss:true}, isl={type:'isl_boss_3',isBoss:true,def:{boss:true}};
      return {n:kit.length,miss:miss,bad:bad,two:two.length,per:per,bosses:bosses,live:[ZEL.mon(b),ZEL.monBoss(b),ZEL.mon(w),ZEL.monBoss(w),ZEL.mon(m),ZEL.monBoss(m),ZEL.mon(el),ZEL.mon(leg),ZEL.mon(isl)],
        wardens:Object.keys(CASTLE_ISLANDS).every(function(k){ return WARDEN_EL[k]&&WARDEN_EL[k].length>=1&&WARDEN_EL[k].length<=2; }),masters:MAGE_TOWERS.every(function(M){ var e=MASTER_EL[M.key], s=ZEL.SPELL[ITEMS[M.spell].spellId]; return e&&e.length<=2&&(!s||e[0]===s); })}; })()""")
    check('Every monster with a kit has its element entry: at most two, never the same twice (%d monsters, %d with two)' % (r['n'], r['two']), r['miss'] == [] and r['bad'] == [] and 15 <= r['two'] <= 60, [r['miss'][:5], r['bad'][:5]])
    check('Each realm is led by its own element but not made of it alone (no realm more than three quarters one element)', all(max(v.values()) <= 0.75 * sum(v.values()) for v in r['per'].values()) and
          max(r['per']['1'], key=r['per']['1'].get) == 'grass' and max(r['per']['2'], key=r['per']['2'].get) == 'water' and max(r['per']['3'], key=r['per']['3'].get) == 'earth' and max(r['per']['4'], key=r['per']['4'].get) == 'fire', r['per'])
    check('Bosses have ONE element and count as bosses; castle wardens, tower masters and site elites are unique foes with up to two; a master\'s first element is the element of the spell he teaches',
          r['bosses'] and r['live'][0] == ['fire'] and r['live'][1] is True and r['live'][2] == ['water', 'shadow'] and r['live'][3] is False and r['live'][4] == ['fire', 'storm'] and r['live'][5] is False and
          r['live'][6] == ['shadow', 'earth'] and r['live'][7] == ['earth'] and r['live'][8] == ['earth'] and r['wardens'] and r['masters'], r['live'])
    # 3 — the one hit function
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; function mk(rid,q){ var m=MX.spawn(ws,rid,ws.player.x+60,ws.player.y,{q:q||1,temp:true}); m._noLoot=true; ws.worldMonsters.push(m); return m; }
      var hog=mk('thistle_hog'), slug=mk('magma_slug',4); o.def=[ZHit.defOf(hog),ZHit.defOf(slug)]; var r0=Math.random; Math.random=function(){ return 0.99; };
      ps.equip.lHand='iron_sword'; ps.equip.gauntlets=null; o.plain=ZHit.dmg(ws,slug,100,'melee'); o.pct=Math.round(100*100/(100+1.5*o.def[1]));
      o.small=ZHit.dmg(ws,slug,9,'spell',{el:[]}); o.smallOld=Math.max(1,9-o.def[1]);
      ps.equip.lHand='flame_iron'; o.fireHog=ZHit.dmg(ws,hog,50,'melee'); o.tHog=ZHit.last.t; o.fireSlug=ZHit.dmg(ws,slug,100,'melee'); o.tSlug=ZHit.last.t;
      ps.equip.lHand='iron_sword'; ps.equip.gauntlets='fire_gauntlets'; o.lend=ZHit.dmg(ws,hog,50,'melee'); o.lendT=ZHit.last.t; ps.equip.gauntlets=null;
      ps.equip.lHand='elemental_sovereign'; ZHit.dmg(ws,hog,50,'melee'); o.allT=ZHit.last.t;
      ps.equip.lHand='iron_sword'; ps.equip.ring1='ruby_ring'; ps.equip.lHand='flame_iron'; o.ring=ZHit.dmg(ws,hog,50,'melee'); ps.equip.ring1=null;
      o.fam=[ZHit.dmg(ws,slug,20,'familiar',{el:['water']}),ZHit.dmg(ws,slug,20,'familiar',{el:['fire']}),ZHit.dmg(ws,slug,20,'familiar',{el:['grass']})]; o.famOld=Math.max(1,20-o.def[1]+1);
      ps.equip.rHand='crossbow'; o.arrow=[ZHit.hero('ranged',{sub:'fire'}).els,ZHit.hero('ranged',{sub:'normal'}).els]; ps.equip.rHand='ember_crossbow'; o.xbow=[ZHit.hero('ranged',{sub:'cold'}).els,ZHit.hero('ranged',{sub:'fire'}).els]; ps.equip.rHand='geyser_arbalest'; o.arb=ZHit.hero('ranged',{sub:'thorn'}).els;
      o.spell=ZHit.hero('spell',{spell:'tidal_wave'}).els; Math.random=r0; hog.dead=true; slug.dead=true; return o; })()""")
    check('Monster defence is a share now (100 against defence %d → %d), so a small hit no longer drops to 1 (9 → %d; the old rule gave %d)' % (r['def'][1], r['plain'], r['small'], r['smallOld']),
          r['plain'] == r['pct'] and r['small'] > r['smallOld'] and r['small'] >= 7, r)
    check('A fire sword on a grass monster is Weak (its +3 fire joins the hit: (50+3)×1.5), on a fire monster Resists; fire gauntlets lend their element to a plain blade; the Sovereign finds the weakness; a ruby ring adds its tenth',
          r['fireHog'] == 80 and r['tHog'] == 1 and r['tSlug'] == -1 and r['fireSlug'] < r['plain'] and r['lendT'] == 1 and r['allT'] == 1 and r['ring'] == 87, r)
    check('Familiars do not get much stronger: a hit is never above the old subtract rule (%d), a weakness adds only a fifth, a resistance costs in full' % r['famOld'],
          r['fam'][1] <= r['famOld'] and r['fam'][0] <= round(r['famOld'] * 1.2) + 1 and r['fam'][2] < r['fam'][1], r['fam'])      # [water: weak · fire: its kit already resists fire familiars, no second cut · grass: resisted]
    check('Arrows carry the element (fire arrow → fire); an element crossbow adds its own to the dart\'s (never more than two); a spell strikes with its own element',
          r['arrow'] == [['fire'], []] and r['xbow'] == [['fire', 'water'], ['fire']] and r['arb'] == ['fire', 'water'] and r['spell'] == ['water'], r)
    # 4 — the hero's side
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.equip.body='dragon_armor'; ps.equip.head='iron_helm~fire'; ps.equip.shield='obsidian_shield'; ps.equip.feet='dragon_boots'; ps.equip.pants='dragon_leggings';
      var S=ZHit.sums(ps); o.res=S.res.fire; o.taken=[ZHit.taken(100,{rid:'magma_slug'},ps),ZHit.taken(100,{rid:'thistle_hog'},ps),ZHit.taken(100,{bossKey:'cw_q3_b',isBoss:true,def:{}},ps)];
      o.dur=[ZHit.stDur('burn',4,ps),ZHit.stDur('slow',4,ps)]; ps.equip.body='leather'; ps.equip.head=null; ps.equip.shield=null; ps.equip.feet=null; ps.equip.pants=null;
      _heroBuffApply(ps,'res_water',120000); o.ward=ZHit.sums(ps).res.water; ps.buffs={};
      ps.level=11; ps.equip.mWeapon=null; ps.equip.head='mage_hood'; o.pow=[ZHit.spellPow(ps,ITEMS.fireball_tome,1),ZHit.spellPow(ps,ITEMS.fireball_tome,1.5)]; ps.equip.mWeapon='ember_staff'; o.staff=[ZHit.spellPow(ps,ITEMS.fireball_tome,1.5),ZHit.spellPow(ps,ITEMS.frost_bolt_tome,1.5)]; ps.level=1; ps.equip.head=null; ps.equip.mWeapon=null; return o; })()""")
    check('Armor resists: five fire pieces stop at −50%% (a fire monster\'s 100 becomes %d), a grass monster is unchanged, a two-element warden strikes with the element you resist least; burning is halved too, slowing is not' % r['taken'][0],
          r['res'] == 0.5 and r['taken'][0] == 50 and r['taken'][1] == 100 and r['taken'][2] == 100 and r['dur'] == [2, 4] and abs(r['ward'] - 0.3) < 1e-9, r)
    check('Spell power grows with level (3%% each) and mage gear, and a staff of the spell\'s element adds a quarter (Fireball 15: %s; with the Ember Staff %d, Frost Bolt with it %d)' % (r['pow'], r['staff'][0], r['staff'][1]),
          r['pow'] == [round(15 * 1.38), round(15 * 1.5 * 1.38)] and r['staff'][0] == round(15 * 1.5 * 1.38 * 1.25) and r['staff'][1] == round(12 * 1.5 * 1.38), r)
    # 5 — items, forge
    r = g.js("""(()=>{ var o={}, I=ITEMS; o.n=Object.keys(I).length; o.axes=Object.keys(I).filter(function(k){ return I[k].cls==='axe'; }).length; o.xbows=Object.keys(I).filter(function(k){ return I[k].cls==='xbow'; }).length;
      var sov=Object.keys(I).filter(function(k){ return I[k].sov; }).concat(['elemental_sovereign']), slots={}; sov.forEach(function(k){ slots[I[k].slot+(I[k].cls?':'+I[k].cls:'')]=1; }); o.sov=Object.keys(slots).sort();
      o.sovAll=sov.every(function(k){ return I[k].el==='all'||(I[k].res&&Object.keys(I[k].res).length===6); }); o.sovNoSrc=sov.filter(function(k){ return k!=='elemental_sovereign'&&(I[k].buy||CRAFT_RECIPES.some(function(r){ return r.result===k; })); });
      o.two=CRAFT_RECIPES.filter(function(r){ return Array.isArray(I[r.result].el)&&I[r.result].el.length===2; }).map(function(r){ return r.result; });
      o.desc=CRAFT_RECIPES.every(function(r){ var d=I[r.result].desc; return Object.keys(r.needs).every(function(k){ return d.indexOf(I[k].name)>=0; })&&d.indexOf(r.gold+'g')>=0; });
      o.gold=[ZForge.recipe('volcano_lord').gold,ZForge.recipe('elemental_sovereign').gold]; o.thunder=Object.keys(ZForge.recipe('thunder_iron').needs); o.t4=Object.keys(ZForge.recipe('volcano_lord').needs);
      o.gems=ZEL.LIST.map(function(e){ return [I[ZEL.E[e].gem].gemEl===e&&!I[ZEL.E[e].gem].rare, I[ZEL.E[e].rare].gemEl===e&&!!I[ZEL.E[e].rare].rare]; });
      o.lanes=ZForge.LANES.every(function(L){ return L.nodes.every(function(id,i){ return I[id]&&(i===0||ZForge.recipe(id).needs[L.nodes[i-1]]===1); }); });
      o.oldPot=['minor_potion','potion_a1','life_flask'].every(function(k){ return I[k]&&!I[k].buy; }); o.unused=['elementDmg'].map(function(){ return Object.keys(I).filter(function(k){ return I[k].elementDmg&&!I[k].el; }); })[0]; return o; })()""")
    check('New gear: %d items in all, %d axes, %d crossbows; five forged two-element weapons and three arbalests' % (r['n'], r['axes'], r['xbows']), r['n'] == 267 and r['axes'] >= 15 and r['xbows'] >= 13 and len(r['two']) == 8, r['two'])
    check('The Sovereign set: one piece of every kind of equipment, each with all six elements, and none of the new pieces can be bought or forged yet',
          r['sov'] == sorted(['back', 'body', 'feet', 'gauntlets', 'head', 'lHand', 'lHand:axe', 'mWeapon', 'neck', 'pants', 'rHand', 'rHand:xbow', 'ring', 'shield']) and r['sovAll'] and r['sovNoSrc'] == [], r)
    check('Forge: every description is written from its recipe; prices halved (Volcano Lord %d g, Sovereign %d g); the storm line uses Topaz (the emerald is the grass gem); a last step needs the rare gem; every lane is a true chain; one gem and one rare gem per element' % tuple(r['gold']),
          r['desc'] and r['gold'] == [1500, 2500] and 'gem_topaz' in r['thunder'] and 'fire_opal' in r['t4'] and r['lanes'] and all(a and b for a, b in r['gems']) and r['oldPot'] and r['unused'] == [], r)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.gold=3000; ps.inventory=['hand_axe','gem_amber','gem_amber','iron_helm','gem_ruby','gem_ruby','gem_ruby','gem_topaz','gem_topaz','dragon_helm','band_ring','sov_crown','iron_sword'];
      openForgeModal(ps,ws); o.tree=document.querySelectorAll('#camp-content .zf-node').length; o.can=document.querySelector('#camp-content [data-fnode="granite_axe"]').classList.contains('can');
      window._craftItem('granite_axe'); o.made=ps.inventory.indexOf('granite_axe')>=0&&ps.inventory.indexOf('hand_axe')<0&&ps.gold===2850&&ps.forged.granite_axe===1; o.open=document.getElementById('modal-camp').style.display!=='none'&&document.querySelector('#camp-content [data-fnode="granite_axe"]').classList.contains('own'); closeModal('camp');
      var i=ps.inventory.indexOf('iron_helm'); o.set1=ZLoot.setGem(ps,i,'fire'); o.id1=ps.inventory.filter(function(x){ return x.indexOf('iron_helm')===0; })[0]; o.it1=[ITEMS[o.id1].name,ITEMS[o.id1].res,ITEMS[o.id1]._k];
      o.set2=ZLoot.setGem(ps,ps.inventory.indexOf(o.id1),'storm'); o.id2=ps.inventory.filter(function(x){ return x.indexOf('iron_helm')===0; })[0]; o.set3=ZLoot.setGem(ps,ps.inventory.indexOf(o.id2),'water');
      o.dragon=[ZEL.canSet('dragon_helm','fire'),ZEL.canSet('dragon_helm','water'),ZEL.canSet('sov_crown','fire'),ZEL.canSet('iron_sword','fire')];
      ps.inventory.push('gem_ruby'); o.ring=ZLoot.setGem(ps,ps.inventory.indexOf('band_ring'),'fire'); var rg=ITEMS['band_ring~fire']; o.ringIt=[rg.res.fire,rg.elPow.fire,rg.slot];
      window._equipItem(ps.inventory.indexOf(o.id2),'head'); o.worn=ps.equip.head===o.id2&&ZHit.sums(ps).res.fire===0.1&&ZHit.sums(ps).res.storm===0.1; o.save=JSON.parse(JSON.stringify(ps)).equip.head; return o; })()""")
    check('The blacksmith shows the forging tree (%d tiles); a weapon you can make is marked ready; forging takes the parts and gold, remembers it and keeps the tree open' % r['tree'], r['tree'] >= 45 and r['can'] and r['made'] and r['open'], r)
    check('Gem setting: a helm takes a ruby (−10%% fire), then a second gem for more gems and gold, never a third; a piece with an element of its own takes one more; Sovereign pieces and weapons take none; a set ring also adds damage; the piece is worn and saved as a plain id (%s)' % r['save'],
          r['set1'] == '' and r['id1'] == 'iron_helm~fire' and r['it1'] == ['Iron Helm (Fire)', {'fire': 0.1}, 'iron_helm'] and r['set2'] == '' and r['id2'] == 'iron_helm~fire~storm' and r['set3'] != '' and
          r['dragon'] == [False, True, False, False] and r['ring'] == '' and r['ringIt'] == [0.1, 0.08, 'ring'] and r['worn'] and r['save'] == 'iron_helm~fire~storm', r)
    # 6 — gems as rewards, the jeweller
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.inventory=[]; ps.gold=10000; ps.jwl=null; ps.unlockedSections=[1];
      var st=ZLoot.shelf(ps); o.shelf=JSON.parse(JSON.stringify(st)); o.noCoin=ZLoot.buyGem(ps,'gem_ruby')!==''; ps.inventory=['dungeon_coin','dungeon_coin','dungeon_coin','dungeon_coin','dungeon_coin','dungeon_coin'];
      o.buy=ZLoot.buyGem(ps,'gem_ruby'); o.after=[ps.gold,ZLoot.count(ps,'dungeon_coin'),ZLoot.count(ps,'gem_ruby')]; o.again=ZLoot.buyGem(ps,'gem_ruby')!==''; o.rare=ZLoot.COMMON.indexOf('fire_opal')<0&&ZLoot.COMMON.indexOf('skystone')<0;
      ps.completedQuests=(ps.completedQuests||[]).concat(['s1_dungeon']); o.refill=ZLoot.shelf(ps).gem_ruby;
      var got=function(f){ var n=ps.inventory.length; f(); return ps.inventory.slice(n); };
      o.castle=got(function(){ ZLoot.site({_castle:{key:'q2_c'},time:null},ps,2); }); ps.castlesDone=['q2_c']; o.castle2=got(function(){ var r0=Math.random; Math.random=function(){ return 0.9; }; ZLoot.site({_castle:{key:'q2_c'}},ps,2); Math.random=r0; });
      o.mage=got(function(){ ZLoot.site({_mage:{key:'monolith'}},ps,3); }); o.vault=got(function(){ ZLoot.site({_site:{design:'x'},_wasDone:false},ps,3); }); o.isle=got(function(){ ZLoot.site({_isIsland:true,_wasDone:false},ps,2); });
      o.boss=got(function(){ ZLoot.site({siteType:'tower',_site:{boss:true},_wasDone:false,monsters:[{isBoss:true,bossKey:'shadow_lord',def:{boss:true}}]},ps,4); });
      var A={ps:function(){ return ps; },float:function(){}}; var r0=Math.random; Math.random=function(){ return 0; }; o.kill=got(function(){ ZLoot.kill(A,{rid:'magma_slug',alpha:true,x:0,y:0,def:{name:'x',r:10}}); }); o.elite=got(function(){ ZLoot.kill(A,{rid:'thistle_hog',x:0,y:0,def:{name:'x',r:10,elite:true,sec:1}}); });
      Math.random=function(){ return 0.99; }; o.common=got(function(){ ZLoot.kill(A,{rid:'thistle_hog',x:0,y:0,def:{name:'x',r:10}}); }); Math.random=r0;
      o.none=got(function(){ ZLoot.kill(A,{rid:'rat_swarm',alpha:true,x:0,y:0,def:{name:'x',r:10}}); });
      o.realm=[1,2,3,4].map(function(q){ return ZLoot.REALM[q].every(function(k){ return ITEMS[k]&&ITEMS[k].gemEl&&!ITEMS[k].rare; })&&ITEMS[ZLoot.REALM_RARE[q]].rare===1; });
      o.camps=Object.keys(CAMP_TYPES).every(function(q){ return CAMP_TYPES[q].every(function(C){ return !C.r.items||C.r.items.every(function(k){ return !!ITEMS[k]; }); }); }); return o; })()""")
    check('The jeweller: one of each common gem on the shelf (storm and shadow from the Highlands on), five times its worth in gold AND three Dungeon Coins; sold out after one; rare gems never sold; the shelf refills when another place is cleared',
          r['shelf'] == {'gem_ruby': 1, 'gem_sapphire': 1, 'gem_emerald': 1, 'gem_amber': 1, 'gem_topaz': 0, 'gem_onyx': 0} and r['noCoin'] and r['buy'] == '' and r['after'] == [9750, 3, 1] and r['again'] and r['rare'] and r['refill'] == 1, r)
    check('Adventuring pays in gems of the guardian\'s element: a two-element warden gives one of each and coins (%s), a master two of his (%s), a vault and an island the realm\'s rare gem, a realm boss two gems, the rare one, three coins — and the Ashlands tower the Night Edge' % (r['castle'], r['mage']),
          sorted(r['castle']) == sorted(['gem_sapphire', 'gem_onyx', 'dungeon_coin', 'dungeon_coin']) and r['castle2'] == ['dungeon_coin'] and sorted(r['mage']) == sorted(['gem_amber', 'gem_amber', 'dungeon_coin', 'dungeon_coin']) and
          'rough_crystal' in r['vault'] and r['vault'].count('dungeon_coin') == 2 and 'raw_iron' in r['vault'] and r['isle'][0] == 'pearl' and
          sorted(r['boss']) == sorted(['gem_onyx', 'gem_onyx', 'moon_shard', 'dungeon_coin', 'dungeon_coin', 'dungeon_coin', 'night_edge']), r)
    check('Strong monsters drop the gem of their own element (an alpha: %s; a site elite also a coin: %s); a common one almost never; a monster without an element nothing; every realm and camp gem is a real item' % (r['kill'], r['elite']),
          r['kill'] == ['gem_ruby'] and r['elite'][0] in ('gem_amber', 'gem_onyx', 'rough_crystal', 'moon_shard') and r['elite'][-1] == 'dungeon_coin' and r['common'] == [] and r['none'] == [] and all(r['realm']) and r['camps'], r)
    # 7 — potions, mounts
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.buffs={}; ps.hp=5; ps.maxHp=100; ps.inventory=['strength_tonic','antidote','ward_fire','potion'];
      var S=MX.S(ws); S.poisonT=5; S.slowT=5; window._useItem(0); o.tonic=_heroBuffActive(ps,'atkUp'); window._useItem(0); o.cure=S.poisonT===0&&S.slowT===0; window._useItem(0); o.ward=_heroBuffActive(ps,'res_fire')&&ZHit.sums(ps).res.fire>=0.3;
      ps.inventory=['ward_fire','strength_tonic','potion']; ps.hp=5; ws._quickUsePotion(); o.quick=ps.inventory.join(',');
      o.dragon=[MOUNTS.dragon.spdMult,MOUNTS.dragon.canCross,MOUNTS.void_serpent.spdMult]; o.best=Object.keys(MOUNTS).every(function(k){ return k==='dragon'||MOUNTS[k].spdMult<MOUNTS.dragon.spdMult; }); o.phoenix=FIRE_SAFE_MOUNTS.indexOf('ember_phoenix')>=0;
      o.src=Object.keys(MOUNTS).every(function(k){ return !!MOUNTS[k].src; }); ps.ownedMounts=[]; ps.gold=150; window._buyHorse(); o.poor=ps.ownedMounts.length===0; ps.gold=500; window._buyHorse(); o.horse=ps.ownedMounts.join(',')+':'+ps.gold;
      ps.completedQuests=['s1_skyport','s2_skyport','s3_skyport']; o.eagle0=_zMountChecks(ps); ps.completedQuests.push('s4_skyport'); o.eagle1=_zMountChecks(ps)&&ps.ownedMounts.indexOf('sky_eagle')>=0;
      window._atStables=true; openMountsModal(ps,ws); o.stable=/for sale here|Buy/.test(document.getElementById('mounts-content').innerHTML)===false; ps.ownedMounts=[]; _renderMountsModal(ps); o.sale=/window\\._buyHorse/.test(document.getElementById('mounts-content').innerHTML); closeModal('mounts'); return o; })()""")
    check('The tonic gives its 2-minute boost, the antidote ends poison and slow, a ward draught gives +30% resistance; the quick-potion key drinks only healing potions', r['tonic'] and r['cure'] and r['ward'] and r['quick'] == 'ward_fire,strength_tonic', r)
    check('Mounts: the stables sell the horse for 200 g (%s); the Dragon is the fastest and crosses everything; the Ember Phoenix is safe on lava; the Sky Eagle comes with the fourth Sky Port; every mount names where it comes from' % r['horse'],
          r['dragon'] == [2.2, 'all', 2] and r['best'] and r['phoenix'] and r['src'] and r['poor'] and r['horse'] == 'horse:300' and r['eagle0'] is False and r['eagle1'] and r['stable'] and r['sale'], r)
    # 8 — the Tome
    r = g.js("""(()=>{ var o={}, ps=game.scene.getScene('World').playerState; ps.inventory=['flame_iron']; ps.castlesDone=['q1_b']; ps.mageDone=['hearthfire']; ps.forged={flame_iron:1};
      var tx=function(e){ return e.lines.map(function(l){ return (l[0]+': '+String(l[1]).replace(/<[^>]+>/g,' ')).replace(/[^\\x20-\\x7e]/g,'').replace(/\\s+/g,' '); }).join(' | '); };
      o.mon=tx(Tome.entry('monster','kelp_wraith')); o.plain=tx(Tome.entry('monster','rat_swarm')); o.boss=tx(Tome.entry('monster','boss_lava_titan')); o.warden=tx(Tome.entry('monster','cw_drowned_abbot'));
      o.item=tx(Tome.entry('item','stormfire_blade')); o.armor=tx(Tome.entry('item','dragon_armor')); o.gem=tx(Tome.entry('item','fire_opal')); o.sov=Tome.entry('item','sov_plate').hint; o.spell=tx(Tome.entry('spell','tidal_wave')); o.fam=tx(Tome.entry('familiar','fam_fire')); o.mount=tx(Tome.entry('mount','sky_eagle'));
      Tome.ui.cat='elements'; Tome.open(); o.tabs=document.querySelectorAll('#tome-tabs button').length; o.wheel=document.querySelectorAll('#tome-grid .ze-n').length; o.realms=document.querySelectorAll('#tome-grid .ze-t tr').length;
      document.querySelector('#tome-grid [data-tel="water"]').click(); o.elDet=document.getElementById('tome-detail').textContent;
      document.querySelector('#tome-tabs [data-tcat="forge"]').click(); o.forge=document.querySelectorAll('#tome-grid .zf-node').length; document.querySelector('#tome-grid [data-fnode="nightbloom_axe"]').click(); o.fDet=document.getElementById('tome-detail').textContent; o.noBtn=!document.querySelector('#tome-detail .forge-btn');
      document.querySelector('#tome-tabs [data-tcat="paths"]').click(); o.paths={n:document.querySelectorAll('#tome-grid .zp-node').length,on:document.querySelectorAll('#tome-grid .zp-node.on').length,realms:document.querySelectorAll('#tome-grid .zp-realm').length,bars:document.querySelectorAll('#tome-grid .zp-bar').length};
      document.querySelector('#tome-grid [data-pnode="item:sp_war_stomp"]').click(); o.pDet=document.getElementById('tome-detail').textContent;
      document.querySelector('#tome-tabs [data-tcat="monster"]').click(); o.back=document.querySelectorAll('#tome-grid .tome-card').length>200&&!document.getElementById('tome-grid').classList.contains('tome-page'); closeModal('tome'); return o; })()""")
    check('Tome entries: a monster shows its elements, what it is weak to and resists, and the gem it drops; a monster without an element says so; a boss has one; an item shows element, protection, recipe and where its gem is found; spells, familiars and mounts too',
          'Element: Water Shadow' in r['mon'].replace('  ', ' ') and 'Weak to: Earth Storm' in r['mon'].replace('  ', ' ') and 'Resists' in r['mon'] and 'Drops' in r['mon'] and 'never weak' in r['plain'] and 'Element: Fire' in r['boss'] and 'Weak to: Water' in r['boss'] and
          'Water Shadow' in r['warden'].replace('  ', ' ') and 'Forged from: Magma Cleaver + Storm Blade + Skystone + 1200 g' in r['item'] and 'Protects' in r['armor'] and 'Never sold' in r['gem'] and 'No one yet knows' in r['sov'] and 'Element: Water' in r['spell'] and 'Best against: Grass' in r['fam'] and 'All four Sky Ports' in r['mount'], r)
    check('Tome pages: Elements (the wheel of six, the realm table, a click explains an element), Forge tree (%d tiles, read-only), Paths (%d steps, %d already yours; the road, skills, spells, familiars, forge lines) — and the old chapters still work' % (r['forge'], r['paths']['n'], r['paths']['on']),
          r['tabs'] == 11 and r['wheel'] == 6 and r['realms'] >= 5 and 'Beats' in r['elDet'] and 'Sapphire' in r['elDet'] and r['forge'] >= 45 and 'Nightbloom Axe' in r['fDet'] and r['noBtn'] and
          r['paths']['n'] == 12 + 16 + 24 and r['paths']['on'] >= 2 and r['paths']['realms'] == 4 and r['paths']['bars'] == 7 and 'War Stomp' in r['pDet'] and 'Earth' in r['pDet'] and r['back'], r)
    # 9 — a real fight, and an old save
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.equip={lHand:'flame_iron'}; ps.atk=40; ps.inventory=[]; closeModal('inventory');
      var m=MX.spawn(ws,'thistle_hog',ws.player.x+30,ws.player.y,{q:1,temp:true,hpMult:40}); m._noLoot=true; ws.worldMonsters.push(m); ws.player.dir='right'; var hp=m.hp; ws.worldAtkTimer=0; ws._worldAttack(); o.hit=hp-m.hp; o.t=ZHit.last&&ZHit.last.t; o.swing=ws.worldAtkTimer;
      ps.equip.lHand='battle_axe'; ws.worldAtkTimer=0; ws._worldAttack(); o.axe=ws.worldAtkTimer; m.dead=true; if(m.cont)m.cont.setVisible(false);
      o.old=JSON.stringify({lHand:ITEMS.gem_emerald.gemEl,ring:ITEMS.emerald_ring.el,th:ITEMS.thunder_god.el,arc:ITEMS.arcane_staff.el||null}); return o; })()""")
    check('In the world: a Flame Iron swing on a Thistle Hog is Weak (%s damage, step %s); an axe swings slower (%.2f s against %.2f s)' % (r['hit'], r['t'], r['axe'], r['swing']), r['hit'] > 55 and r['t'] == 1 and r['axe'] > r['swing'], r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No page errors', errs == [], errs[:4])

with game(new=True, painted=True, query='?scenery=fake') as g:
    g.wait(2500)
    r = g.js("({miss:Object.keys(ITEMS).filter(function(k){ return !ZIcon.has('ic_'+k); }),ui:['el_storm','el_shadow','tm_forge','tm_paths','tm_elements'].filter(function(k){ return !ZIcon.has(k); }),set:ZIcon.item('iron_helm~fire',2).indexOf('zi-b')>=0})")
    check('Every new item and symbol is ordered on an icon sheet (stand-in pictures), and a gem-set piece shows its base item\'s icon', r['miss'] == [] and r['ui'] == [] and r['set'], r)

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
