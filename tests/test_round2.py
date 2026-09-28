"""Round 2 features: boss-site seal, multi-phase guardians + extra health, world camps,
split-once, mount seat, castle islands + teachers + skills, village interiors.
Run from the repo root after `node build.mjs`: python tests/test_round2.py"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  -> ' + str(info)), flush=True)

KILL = """(()=>{ var d=game.scene.getScene('Dungeon'); (d._bossGroup||[]).forEach(m=>{ if(m.dead)return; if(m.bars)m.bars.forEach(b=>b.hp=0); MX._src='melee'; m.hp=0; MX._src=null; if(!m.dead)d._monsterDied(m); }); })()"""
PH = "(()=>{ var d=game.scene.getScene('Dungeon'); return d?{ph:d._bossPhase, done:!!d._bossDefeated, n:(d._bossGroup||[]).length, bars:((d._bossGroup||[])[0]||{}).bars?1:0}:null; })()"

with game(new=True) as g:
    g.wait(600)
    # ── split once ──
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'); var A=MX.A(ws); var m=A.spawn('clover_slime',ws.player.x+60,ws.player.y,{q:1}); var n0=ws.worldMonsters.length;
      m.hp=0; var kids=ws.worldMonsters.slice(n0); var n1=ws.worldMonsters.length; kids.forEach(function(k){ k.hp=0; }); return [kids.length, ws.worldMonsters.length-n1]; })()""")
    check('Splitting monsters split once; their children just die', r[0] >= 1 and r[1] <= 0, r)

    # ── boss-site seal ──
    r = g.ws("""(()=>{ var s=ws.wd.sites.find(x=>x.boss&&x.type==='tower'&&x.section===1), g0=_bossSiteGate(ps,s,ws.wd.sites);
      ps.bonusCleared=ws.wd.sites.filter(x=>x.bonus&&x.section===1&&(x.type==='tower'||x.type==='dungeon')).map(x=>x.id); var g1=_bossSiteGate(ps,s,ws.wd.sites); ps.bonusCleared=[]; return [g0.open,g0.need,g1.open]; })()""")
    check('★ boss tower is sealed until the quadrant\'s other towers + dungeons are cleared', r[0] is False and r[1] >= 1 and r[2] is True, r)

    # ── camps ──
    r = g.ws("""(()=>{ var c={}, gu=0, roam=0; ws._camps.forEach(C=>{ c[C.sec]=(c[C.sec]||0)+1; gu+=C.guards.length; }); ws.worldMonsters.forEach(m=>{ if(m.mx&&!m.campId&&!m.temp)roam++; }); return {c:c, gu:gu, roam:roam, types:new Set(ws._camps.map(C=>C.T.id)).size}; })()""")
    check('Camps: 33 per quadrant, 60 themed purpose types (15 per quadrant), guards outnumber roamers ~2:1', r['c'] == {'1': 33, '2': 33, '3': 33, '4': 33} and r['types'] == 60 and r['gu'] > r['roam'] * 1.5, r)
    g.ws("""(()=>{ ps.godMode=true; var C=ws._camps.find(C=>C.sec===1&&C.T.r.k==='food'); window._C=C; ws.player.x=C.x-80; ws.player.y=C.y+60; ws.player.cont.setPosition(ws.player.x,ws.player.y); })()""")
    g.wait(400)
    g.ws("""(()=>{ _C.guards.forEach(m=>{ MX._src='melee'; m.hp=0; MX._src=null; ws._worldMonsterDied(m); }); })()"""); g.wait(700)
    r = g.js("({st:_C.state, loot:_C.loot.length, banner:(document.getElementById('camp-banner')||{}).className})")
    check('Clearing a camp celebrates (banner + fanfare) and drops its food', r['loot'] > 0 and 'on' in (r['banner'] or ''), r)

    # ── mount seat ──
    r = g.ws("""(()=>{ var mk=Object.keys(MOUNTS).find(k=>k!=='horse'&&CHAR_BY_ID['mt_'+k]&&CHX.MOUNT_SEAT[CHAR_BY_ID['mt_'+k].spec.kind]!==null); ps.ownedMounts=[mk]; ps.mount=mk; var p=ws.player; p.dir='right'; CHX.mountTick(ws,p,mk,false,0.016); return [p.sprite.y-p.sprite.displayHeight*(1-CHX.MOUNT_KEEP), p.mountSpr.y, p.mountSpr.displayHeight]; })()""")
    check('Mounted hero sits on top of the mount (legs hidden, seated on its back — not halfway through it)', r and r[0] < r[1] - r[2] * 0.35, r)
    g.ws("(()=>{ ps.mount=null; CHX.mountTick(ws,ws.player,null,false,0.016); })()")

    # ── skills: never sold, 12 learnable ──
    r = g.js("""(()=>{ var sp=Object.keys(ITEMS).filter(k=>ITEMS[k].slot==='special'), sold=[]; Object.keys(BUILDING_SLOTS).forEach(b=>{ sp.forEach(k=>{ if(BUILDING_SLOTS[b](ITEMS[k]))sold.push(b+':'+k); }); });
      var taught=Object.keys(CASTLE_ISLANDS).map(k=>CASTLE_ISLANDS[k].skill); return {n:sp.length, sold:sold, taught:new Set(taught).size, all:sp.every(k=>taught.indexOf(k)>=0), q:Object.keys(CASTLE_ISLANDS).map(k=>ITEMS[CASTLE_ISLANDS[k].skill].secReq===CASTLE_ISLANDS[k].sec).every(Boolean)}; })()""")
    check('12 special skills, none sold in shops, each taught by exactly one castle master (by quadrant)', r['n'] == 12 and not r['sold'] and r['taught'] == 12 and r['all'] and r['q'], r)

    # ── harbors + islands ──
    r = g.ws("ws.wd.sites.filter(s=>s.type==='harbor').map(s=>[s.section,s.castle||''])")
    per = {q: [c for s, c in r if s == q] for q in [1, 2, 3, 4]}
    check('4 harbors per quadrant: 1 familiar island + 3 castle islands', all(len(v) == 4 and v.count('') == 1 for v in per.values()), per)

    # ── castle run: island → castle → warden → teacher → skill ──
    g.ws("""(()=>{ ps.godMode=true; ps.equip.special=null; var site=ws.wd.sites.find(s=>s.castle==='q2_c'); ws.scene.sleep('World'); ws.scene.launch('Island',{site:site,worldScene:ws,skipCutscene:true}); })()"""); g.wait(2500)
    r = g.js("(()=>{ var I=game.scene.getScene('Island'); return {name:I.islData.name, castle:!!I.castle, mons:I.monsters.length, gate:game.textures.exists('castle_gate_q2_c')}; })()")
    check('Castle island: its own name, roster monsters, a castle gate to enter', r['castle'] and r['name'] == 'Abbey Isle' and r['mons'] >= 8 and r['gate'], r)
    g.js("game.scene.getScene('Island')._enterAdventure()"); g.wait(2500)
    r = g.js("(()=>{ var d=game.scene.getScene('Dungeon'); return {c:!!d._castle, style:d._labSpec&&d._labSpec.style&&d._labSpec.style.id, max:d.maxFloors}; })()")
    check('The castle is a tower-style dungeon with its own look', r['c'] and r['style'] == 'drowned_abbey' and r['max'] == 3, r)
    g.js("""(()=>{ var d=game.scene.getScene('Dungeon'); var cs=CastleRun.site('q2_c'); d.scene.restart({site:cs,floor:cs.floors-1,maxFloors:cs.floors,worldScene:d.worldScene,returnScene:'Island',theme:'tower'}); })()"""); g.wait(3000)
    r = g.js("(()=>{ var d=game.scene.getScene('Dungeon'), b=(d._bossGroup||[])[0]; return {boss:b&&b.def.name, mx:!!(b&&b.mx), captive:!!d._captive, phases:BossPhases.count(d._bossKey)}; })()")
    check('Top floor: a one-phase warden and a caged master', r['boss'] == 'The Drowned Abbot' and r['mx'] and r['captive'] and r['phases'] == 1, r)
    g.js(KILL); g.wait(900)
    g.js("game.scene.getScene('Dungeon')._openBossChest()"); g.wait(2600)
    for _ in range(20):
        if g.js("game.scene.isActive('Island')&&!game.scene.isActive('Dungeon')"): break
        g.wait(500)
    r = g.ws("({learned:ps.skillsLearned||[], eq:ps.equip.special, done:ps.castlesDone||[], q:ps.completedQuests.filter(q=>/_tower$/.test(q)), act:game.scene.getScenes(true).map(s=>s.scene.key)})")
    check('Freeing the master teaches the skill and equips it (no main quest touched), back on the island', r['learned'] == ['sp_shieldbash'] and r['eq'] == 'sp_shieldbash' and r['done'] == ['q2_c'] and not r['q'] and 'Island' in r['act'], r)
    g.js("game.scene.getScene('Island')._exitToWorld()"); g.wait(800)
    for _ in range(10):
        if g.js("game.scene.isActive('World')"): break
        g.wait(500)

    # ── new skills work in the world ──
    r = g.ws("""(()=>{ ps.equip.special='sp_timeslow'; ws._specialCd=0; ws._useSpecial(); var ts=ws._timeSlow; ps.equip.special='sp_meteor'; ws._specialCd=0;
      var w=ws.wd.waystones.find(w=>w.region===1), sp=ws._fairySpot(w.x+6,w.y+6,2); ws.player.x=sp.x*TILE+16; ws.player.y=sp.y*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y); ws.player.dir='right'; ws.pdir='right';
      var m=MX.spawn(ws,'thistle_hog',ws.player.x+110,ws.player.y,{q:1}); m.section=1; ws.worldMonsters.push(m); m._m.stunT=10; m.maxHp=m._hp=500;
      window._mm=ws.worldMonsters.filter(m=>!m.dead).map(m=>[m,m.hp]); ws._aimOverride=0; ws._useSpecial(); return ts; })()""")
    for _ in range(20):
        g.wait(500)
        if g.ws("window._mm.reduce((a,e)=>a+Math.max(0,e[1]-(e[0].dead?0:e[0].hp)),0)>0"): break
    hurt = g.ws("window._mm.reduce((a,e)=>a+Math.max(0,e[1]-(e[0].dead?0:e[0].hp)),0)")
    check('Time Slow and Meteor Strike fire from the Z key', r and r > 3 and hurt > 0, (r, hurt))

    # ── village interiors ──
    rows = []
    for t in ['tavern', 'shop', 'house', 'forge', 'guild', 'quest_board', 'stables', 'armory', 'clothing', 'jeweler', 'apothecary', 'merchant']:
        g.js("""(t=>{var ws=game.scene.getScene('World'); if(game.scene.isActive('Building'))game.scene.getScene('Building')._exitBuilding(); ws.scene.sleep('World'); ws.scene.launch('Building',{building:{type:t},worldScene:ws});})('%s')""" % t); g.wait(900)
        rows.append(g.js("""(()=>{ var b=game.scene.getScene('Building'), m=b._imap, R=floodReach(m,Math.floor(m.spawn.x/LT),Math.floor(m.spawn.y/LT)), near=false;
          for(var y=0;y<m.h;y++)for(var x=0;x<m.w;x++)if(R[y*m.w+x]&&Math.hypot(x*LT+16-b.npcX,y*LT+16-b.npcY)<LT*2.4)near=true;
          return [m.theme.name, m.sprites.length, m.lights.length, near, !!b.bSprite]; })()"""))
    g.js("game.scene.getScene('Building')._exitBuilding()"); g.wait(400)
    check('12 painted interiors: themed props + lights, keeper reachable from the door', len(rows) == 12 and all(r[1] >= 6 and r[2] >= 1 and r[3] and r[4] for r in rows), [r for r in rows if not (r[1] >= 6 and r[3])])

    # ── Tome links ──
    r = g.js("(()=>{ var p=Tome.list('place').filter(id=>id.indexOf('castle_')===0).length, e=Tome.entry('item','sp_meteor'), w=Tome.entry('monster','cw_bone_king'), t=Tome.entry('character','tc_meteor'); return [p, e&&e.sub, !!w, !!t]; })()")
    check('Tome: 12 castles, skills say who teaches them, wardens and teachers have entries', r[0] == 12 and 'Skill' in (r[1] or '') and r[2] and r[3], r)
    check('No page errors', not g.errs, g.errs[:5])

with game(new=True) as g:
    # ── phases: Q1 dungeon 2 phases → quest; Q4 tower 5 phases with extra health + allies ──
    for typ, sec, n in [('dungeon', 1, 2), ('tower', 4, 5)]:
        g.js("""(([typ,sec])=>{var ws=game.scene.getScene('World');var ps=ws.playerState; ps.godMode=true; sbUnlockAll(); var site=ws.wd.sites.find(s=>s.type===typ&&s.section===sec&&s.boss);var mf=site.floors;
          if(game.scene.isActive('Dungeon'))game.scene.stop('Dungeon'); ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:typ==='tower'?'tower':'dungeon'});})(['%s',%d])""" % (typ, sec)); g.wait(2500)
        seen, bars, allies = [], 0, 0
        for i in range(n + 1):
            s = g.js(PH); seen.append(s['ph']); bars += s['bars']; allies = max(allies, s['n'])
            if s['done']: break
            g.js(KILL); g.wait(3200)
        q = g.ws("ps.completedQuests.indexOf('s%d_%s')>=0" % (sec, typ))
        ok = max(seen) == n and q and (sec == 1 and bars == 0 and allies == 1 or sec == 4 and bars > 0 and allies > 1)
        check(f'Q{sec} {typ} guardian: {n} phases{" with extra health + several bosses" if sec == 4 else ", no extra health or summons"}, then the quest completes', ok, (seen, bars, allies, q))
    check('No page errors (phases)', not g.errs, g.errs[:5])

print(f'\n{sum(res)}/{len(res)} passed')
sys.exit(0 if all(res) else 1)
