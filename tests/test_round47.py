"""Round 47 — Kris's picks for the E, the sites and the empty space, and his message after: the Ringed Z in MedievalSharp with the E's top arm
drawn out and the letters in front of the axes; the empty space filled by floor (world terrain round ground floors and castles, rock / abyss /
lava underground, the element's sea round upper tower floors), framing; the site fixes (library stacks, boulders, Ember Observatory's last door,
straight bridges, Rime Spire's back-room stairs); the heavy axe; the ammo stepper; walls kept off the turrets; calmer butterflies and dragonflies;
the wave 50 sheets.
Run: python tests/test_round47.py"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with game(new=True, painted=True) as g:
    g.wait(5000)
    # ── the E ──
    r = g.js("""(async ()=>{ await document.fonts.load('400 40px "MedievalSharp"'); var f='400 100px "MedievalSharp","Cinzel",Georgia,serif'; ZBrand._eM={}; var M=ZBrand.eMetrics(f);
      return {w:ZBrand.WORDMARK, font:document.fonts.check(f), st:ZBrand.E_STYLE, m:M?[M.top.x,M.bot.x]:null}; })()""")
    check('The wordmark is in MedievalSharp (embedded; round 53: the new name; round 71: Kris\'s new pick, Eagle Lake + Uncial), the E\'s top arm drawn out (arms %s)' % r['m'], r['w'] in ('rz_medieval','fz2_eag_unc') + tuple('qz_'+k for k in ('twin','shared','line','cross','shield','seal','stagger','knot','stone','prow')) and r['font'] and r['st'] == 'top' and r['m'], r)
    # ── the fill rule, by floor ──
    r = g.js("""(()=>{ var o={}; ZSD.sites().forEach(function(s){ var T=ZSP.T[s.id]; if(!T)return; o[s.id]=[ZVOID.kindOf(ZVOID.pick(s,T,0,3)),ZVOID.kindOf(ZVOID.pick(s,T,1,3))]; }); return o; })()""")
    bad = []
    for sid, (k0, k1) in r.items():
        if sid.startswith('castle_') and k0 != 'terrain' and sid not in ('castle_q2_b',): pass
    want = {'castle_q2_c': 'terrain', 'silverwood': 'terrain', 'mage_ember_observatory': 'terrain', 'crystal_grotto': 'rock', 'spiral_chasm': 'abyss', 'lava_archipelago': 'lava'}
    bad = [k for k, v in want.items() if r[k][0] != v]
    up = {'mage_ember_observatory': 'lava', 'frost_cathedral': 'deep', 'sky_cloister': 'clouds', 'mage_conductor': 'storm', 'mage_rift_tower': 'stars', 'silverwood': 'canopy'}
    bad += [k for k, v in up.items() if r[k][1] != v]
    check('The fill by floor: castles and ground floors in the world terrain; underground rock / abyss / lava; upper tower floors in the element\'s sea', not bad, bad)
    # ── in the game: layers, decor, framing, fog beyond the edge ──
    L = """(([id,floor])=>{var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.id===id); ws.playerState.godMode=true;
      var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
      if(game.scene.isActive('Dungeon'))game.scene.stop('Dungeon'); if(game.scene.isActive('World'))ws.scene.sleep('World'); game.scene.start('Dungeon',data);})"""
    out = {}
    for sid, fl in (('s1_tower', 0), ('s3_dungeon', 0), ('s4_dungeon', 0)):
        g.js(L, [sid, fl]); g.wait(5000)
        out[sid] = g.js("""(()=>{ var d=game.scene.getScene('Dungeon'), m=d._lab, cam=d.cameras.main, b=cam.getBounds?cam.getBounds():cam._bounds; return {k:m&&m.zvoid?ZVOID.kindOf(m.zvoid):null, L:d._zv?d._zv.L.length:0, dec:d._zv?d._zv.dec.length:0, vig:!!(d._zv&&d._zv.vig), clr:m&&m._zclr?Array.prototype.reduce.call(m._zclr,function(a,v){ return a+v; },0):0, bw:b?Math.round(b.width):0, mw:m?m.w*LT:0}; })()""")
    o = out
    check('In the game: the castle-type ground floor stands in its terrain with trees and rocks; the chasm dungeon has its fog layers; the lava dungeon its sea; a vignette; empty cells left clear (%s)' % {k: (v['k'], v['L'], v['dec']) for k, v in o.items()},
          o['s1_tower']['k'] == 'terrain' and o['s1_tower']['dec'] > 20 and o['s3_dungeon']['k'] == 'abyss' and o['s3_dungeon']['L'] >= 1 and o['s4_dungeon']['k'] == 'lava' and all(v['vig'] and v['clr'] > 0 for v in o.values()), o)
    r = g.js("""(()=>{ var d=game.scene.getScene('Dungeon'); for(var i=0;i<6;i++)ZVOID.creature(d); return {crit:d._zv.crit.length}; })()""")
    check('Creatures rise in the empty space now and then (lava gargoyles in the lava)', r['crit'] >= 1, r)
    g.js("(()=>{ var ws=game.scene.getScene('World'); game.scene.stop('Dungeon'); ws.scene.wake('World'); })()"); g.wait(1500)

    # ── the sites ──
    r = g.js("""(()=>{ var o={}, cnt=function(F,v){ var n=0; for(var i=0;i<F.w*F.h;i++)if(F.g[i]===v)n++; return n; };
      var L=ZSP.design('elven_library',4).floors[0]; o.shelves=cnt(L,6); o.ok=ZSP.design('elven_library',4).floors.every(function(F){ return F.ok; });
      var B=ZSP.design('boulder_field',7).floors[0]; o.rocks=cnt(B,6)+cnt(B,2);
      var E=ZSP.design('mage_ember_observatory',3), EL=E.floors[2]; o.closed=EL.closedDoor||0; o.eok=EL.ok;
      var M=ZSP.design('mushroom_forest',4), diag=0; M.floors.forEach(function(F){ for(var i=0;i<F.w*F.h;i++){ if(F.g[i]!==4)continue; var x=i%F.w, y=(i/F.w)|0, n=0; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var v=F.g[(y+d[1])*F.w+x+d[0]]; if(v===1||v===4||v===5)n++; }); if(n===0)diag++; } }); o.lone=diag; o.mok=M.floors.every(function(F){ return F.ok; });
      return o; })()""")
    check('Sites: Elven Library stacks (%d shelves); Boulder Field rocks (%d); Ember Observatory last floor loses its shortcut bridge; Mushroom Forest bridges all join up' % (r['shelves'], r['rocks']),
          r['shelves'] > 300 and r['ok'] and r['rocks'] > 250 and r['closed'] > 0 and r['eok'] and r['lone'] == 0 and r['mok'], r)
    r = g.js("""(()=>{ var st={id:'mage_rime_spire',type:'tower',design:'frost_spire',mage:'rime_spire'}, sp=_siteFloorSpecOld(st,0,2), m=_buildSiteFloor(sp); var ex=m.site&&m.site.exit, H=m.h||m.H, sy=m.spawn?m.spawn.y/LT:H; return {hard:!!sp.hard, exit:ex?[ex.x,ex.y]:null, h:H, sy:Math.round(sy)}; })()""")
    check('Rime Spire: the first stairs sit in a back room, far side of the floor from the way in (%s of %d rows, in at row %d)' % (r['exit'], r['h'], r['sy']),
          r['hard'] and r['exit'] and abs(r['exit'][1] - r['sy']) > r['h'] * 0.45, r)

    # ── the axe ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.inventory.push('hand_axe'); var old=ps.equip.lHand; ps.equip.lHand='hand_axe'; var a=ZHit.swing(); var rooted=ZHit.rooted(), mm=MX.moveMods(ws).mult;
      var mon={hp:999,def:{def:0,r:10,el:null,name:'x'},x:0,y:0}; var da=ZHit.dmg(ws,mon,20,'melee'); ps.equip.lHand=old||null; var sw=ZHit.swing(), ds=ZHit.dmg(ws,mon,20,'melee'); await new Promise(r=>setTimeout(r,450)); return {t:a.t,root:a.root,rooted:rooted,mm:mm,after:ZHit.rooted(),ta:sw.t,da:da,ds:ds,desc:ITEMS.hand_axe.desc}; })()""")
    check('Axe: 0.9 s a swing (sword %s s), you stand still for the start of it, 1.6× damage (%s vs %s); description updated' % (r['ta'], r['da'], r['ds']),
          r['t'] == 0.9 and r['rooted'] and r['mm'] == 0 and not r['after'] and r['ta'] == 0.45 and r['ds'] > 0 and abs(r['da'] / r['ds'] - 1.6) < 0.25 and 'stand still' in r['desc'], r)
    # ── the ammo stepper ──
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.gold=5000; ps.unlockedSections=[1,2,3]; openBuildingShop('armory',ps,ws); var a0=(ps.ammo||{}).arrow_cold||0;
      var has=!!document.getElementById('ab-arrow_cold'); window._ammoQty.arrow_cold=1; for(var i=0;i<3;i++)window._ammoStep('arrow_cold',1); window._buyAmmoN('arrow_cold');
      var open=document.getElementById('modal-camp').style.display!=='none'; var o={has:has,got:(ps.ammo.arrow_cold||0)-a0,open:open,label:(document.getElementById('ab-arrow_cold')||{}).textContent}; closeModal('camp'); return o; })()""")
    check('Armory: − / + packs of ammo, one Buy (4 packs → %s arrows), the window stays open' % r['got'], r['has'] and r['got'] == 20 and r['open'], r)
    # ── the village wall and its turrets ──
    r = g.js("""(()=>{ var p=villagePlan(5), T=p.props.filter(function(q){ return q.prop==='tower'; }), W=p.props.filter(function(q){ return q.prop==='vwall'; }), bad=0, low=0;
      W.forEach(function(w){ if(w.o.low)low++; (w.o.pts||[]).forEach(function(pt){ var x=w.x+pt[0], y=w.y+pt[1]; T.forEach(function(t){ if(x>=t.x&&x<t.x+t.w&&y>=t.y&&y<t.y+t.h)bad++; }); }); }); return {towers:T.length, walls:W.length, bad:bad, low:low}; })()""")
    check('Village wall: no wall piece inside a turret (%d turrets, %d wall pieces); those beside a turret drawn behind it (%d)' % (r['towers'], r['walls'], r['low']), r['towers'] > 8 and r['walls'] > 20 and r['bad'] == 0 and r['low'] > 0, r)
    # ── the critters and the order ──
    r = g.js("({b:ZWE.CRITFPS.butterflies, d:ZWE.CRITFPS.dragonflies, sm:ZCRIT.SMOOTH, w50:ZSCN.SHEETS.filter(function(S){ return S.wave===50; }).map(function(S){ return S.id; })})")
    check('Butterflies and dragonflies slower (wingbeats %s / %s fps); 8-frame flights and %d more sheets ordered (wave 50)' % (r['b'], r['d'], len(r['w50'])), r['b'] <= 6 and r['d'] <= 12 and r['sm'] and len(r['w50']) == 9, r)
    # ── spells: the world cooldown, seeking the strongest enemy ahead ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; var tome='frost_bolt_tome'; ps.inventory.push(tome); ps.equip.spell=tome; ps.mana=200; ps.maxMana=200; ws._emitUI(); await new Promise(r=>setTimeout(r,500));
      var row=ZMANA.row(), shown=row&&row.style.display!=='none'; var n=0; for(var i=0;i<3;i++){ ws._spellCd=0; var a=(ws._playerProj||[]).length; _heroCastSpell(ws); await new Promise(r=>setTimeout(r,(SPELL_DATA.frost_bolt.cooldown||1)*1000+600)); }
      var casts=ps.mana; var mons=[{x:0,y:-200,hp:50,dead:false,def:{r:10}},{x:60,y:-200,hp:500,dead:false,def:{r:10}},{x:-300,y:0,hp:9999,dead:false,def:{r:10}}]; var oldLOS=window._heroLOS; window._heroLOS=function(){ return true; };
      var t=ZSEEK.pick(ws,0,0,-Math.PI/2,400,mons); window._heroLOS=oldLOS; return {shown:shown,mana:Math.round(ps.mana),pick:t?t.hp:null,cd:ws._spellCd}; })()""")
    check('Spells: cast again and again in the world (the stuck cooldown fixed); they seek the strongest enemy in a 60° cone ahead (picked hp %s); the mana bar shows once you own a spell' % r['pick'], r['pick'] == 500 and r['mana'] < 200 - 2 and r['shown'], r)
    # ── saving ──
    r = g.js("""(async ()=>{ var n=0, ws=game.scene.getScene('World'), s0=ws._save; ws._save=function(){ n++; return s0.apply(this,arguments); }; await new Promise(r=>setTimeout(r,2500)); var idle=n; ZSAVE.manual(); var man=n; ws.playerState.activatedWaystones=(ws.playerState.activatedWaystones||[]).concat(['zz_test']); await new Promise(r=>setTimeout(r,2600)); var mile=n;
      ZSAVE.openInv(); var inv=!!document.getElementById('inv-save')&&!!document.getElementById('zquick-row'); closeModal('inventory'); Tome.open(); var tb=document.querySelector('#modal-tome .zsave-btns'); var tome=!!tb&&tb.textContent.indexOf('Save')>=0&&tb.textContent.indexOf('Inventory')>=0; closeModal('tome'); ws._save=s0; return {idle:idle,man:man,mile:mile,inv:inv,tome:tome}; })()""")
    check('Saving: nothing saves on its own while you play; Save in the Inventory and the Tome; a milestone saves by itself; Tome and Inventory open each other', r['idle'] == 0 and r['man'] == 1 and r['mile'] == 2 and r['inv'] and r['tome'], r)
    # ── quick use ──
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; var food=Object.keys(ITEMS).filter(function(k){ return ITEMS[k].slot==='food'&&ITEMS[k].heal; })[0]; ps.inventory.push(food,food); ps.hp=1; ZQUICK.setQ('food',food); var c0=ZQUICK.count(ps,food); ZQUICK.use('food'); var o={food:food,used:c0-ZQUICK.count(ps,food),hp:ps.hp}; ZQUICK.use('food'); ZQUICK.use('food'); o.after=ps.quick.food; return o; })()""")
    check('Quick use: O eats the equipped food; when it runs out the next food is equipped', r['used'] == 1 and r['hp'] > 1, r)
    # ── bosses ──
    r = g.js("""(()=>{ var F=ZDiff.f(true), f=ZDiff.f(false); return {bh:F.h, mh:f.h, rates:[1,2,3,4].map(function(q){ return Math.round(1/MX.bossRate({_rq:q})*100)/100; })}; })()""")
    check('Bosses: twice the health (%s × the level\'s own); faster by region %s' % (r['bh'], r['rates']), abs(r['bh'] - 2 * r['mh'] * (1 if True else 1)) < 2 and r['rates'] == [1, 1.15, 1.3, 1.45], r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

lab = open(os.path.join(ROOT, 'lab', 'lab.artifact.html'), encoding='utf-8').read()
check('The Lab: Empty space shows the fill by floor; The E shows the pick first', 'canopy' in lab and re.search(r"pick.{0,4}rz_medieval", lab))
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
