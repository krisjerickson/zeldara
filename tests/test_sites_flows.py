"""Phase 3 site flows: boss tower frees a craftsman, boss dungeon gives a mount,
bonus vault + relic + rematch, stairs up/down, island dungeon guardians → familiars,
Ember Cave guardian, journal, save migration v4."""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)

LAUNCH = """(([id,floor])=>{var ws=game.scene.getScene('World');
  var site=ws.wd.sites.find(s=>s.id===id);
  var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
  if(game.scene.isActive('Dungeon')){game.scene.getScene('Dungeon').scene.restart(data);return;}
  if(game.scene.isActive('World'))ws.scene.sleep('World');
  ws.scene.launch('Dungeon',data);})"""
def wait_floor(g,sid,f):
    for _ in range(40):
        ok=g.js("(([sid,f])=>{var d=game.scene.getScene('Dungeon');return !!(d&&d._ready&&game.scene.isActive('Dungeon')&&d.siteId===sid&&d.floor===f);})(%s)"%json.dumps([sid,f]))
        if ok: return True
        g.wait(250)
    return False
KILL = "var d=game.scene.getScene('Dungeon');var b=d.monsters.find(m=>m.isBoss);b.hp=0;d._monsterDied(b);"
CLAIM = "var d=game.scene.getScene('Dungeon');var c=d.interactables.find(i=>i.type==='boss_chest');d.px=c.x;d.py=c.y;d._interact();"
def back_to_world(g):
    for _ in range(30):
        if g.js("game.scene.isActive('World')"): return True
        g.wait(200)
    return False

with game() as g:
    g.ws("(ps.unlockedSections=[1,2,3,4], ps.mount=null, ps.hp=ps.maxHp)")
    # ── Boss tower Q1: craftsman
    g.js(LAUNCH+'(["s1_tower",4])'); wait_floor(g,'s1_tower',4); g.wait(300)
    check('Boss tower top floor has the captive craftsman', g.js("!!game.scene.getScene('Dungeon')._captive"))
    g.js(KILL); g.wait(300)
    check('Guardian down → craftsman freed', g.js("game.scene.getScene('Dungeon')._captive.freed===true"))
    g.js(CLAIM); back_to_world(g); g.wait(400)
    check('Tower claim: quest done, Wetlands open, Bram rescued', g.ws("ps.completedQuests.includes('s1_tower')&&ps.unlockedSections.includes(2)&&ps.rescued.includes(1)"), g.ws("({q:ps.completedQuests,r:ps.rescued})"))
    check('Bram stands in the village', g.ws("(ws._villageNPCs||[]).some(n=>n.id==='builder')"))
    # ── Boss dungeon Q4: Ash Salamander
    g.js(LAUNCH+'(["s4_dungeon",7])'); wait_floor(g,'s4_dungeon',7); g.wait(300)
    check('Ashlands boss dungeon has 8 floors, guardian is Lava Titan', g.js("(()=>{var d=game.scene.getScene('Dungeon');return d.maxFloors===8&&d.monsters.some(m=>m.isBoss&&/Lava Titan/.test(m.def.name));})()"))
    g.js(KILL); g.wait(200); g.js(CLAIM); back_to_world(g); g.wait(400)
    check('Ash Salamander mount given and ridden after leaving', g.ws("ps.ownedMounts.includes('ash_salamander')&&ps.mount==='ash_salamander'"), g.ws("({o:ps.ownedMounts,m:ps.mount})"))
    check('Ash Salamander walks on deep lava', g.js("canPassTile(T.DEEP_MAGMA,'ash_salamander')&&!canPassTile(T.DEEP_MAGMA,'lava_unicorn')"))
    # ── Bonus site: vault, relic, rematch
    g.ws("(ps.mount=null, ps.level=20, ps.xp=0)")  # level cap → no level-up HP gains during the check
    hp0=g.ws("ps.maxHp")
    g.js(LAUNCH+'(["s2_b_moonglass",4])'); wait_floor(g,'s2_b_moonglass',4); g.wait(300)
    check('Bonus site ends with an elite guarding the vault', g.js("game.scene.getScene('Dungeon').monsters.some(m=>m.isBoss&&/^Elite /.test(m.def.name))"))
    g.js(KILL); g.wait(200); g.js(CLAIM); back_to_world(g); g.wait(400)
    check('Vault: bonus cleared, relic kept, +3 max HP, no main quest', g.ws("ps.bonusCleared.includes('s2_b_moonglass')&&ps.relics.includes('moonglass')&&ps.maxHp===%d&&!ps.completedQuests.includes('s2_tower')"%(hp0+3)), g.ws("({b:ps.bonusCleared,r:ps.relics,hp:ps.maxHp})"))
    check('Bonus sites stay open (not locked)', g.ws("!(ps.lockedSites||[]).includes('s2_b_moonglass')"))
    g.js(LAUNCH+'(["s2_b_moonglass",4])'); wait_floor(g,'s2_b_moonglass',4); g.wait(300)
    check('Replay: elite returns +25% (Rematch)', g.js("game.scene.getScene('Dungeon').monsters.some(m=>m.isBoss&&/Rematch/.test(m.def.name))"))
    g.js(KILL); g.wait(200); g.js(CLAIM); back_to_world(g); g.wait(400)
    check('Replay vault: no second relic', g.ws("ps.relics.length===1&&ps.maxHp===%d"%(hp0+3)))
    # ── Stairs down / back up arrive next to the stairs
    g.js(LAUNCH+'(["s1_b_mushroom_forest",0])'); wait_floor(g,'s1_b_mushroom_forest',0); g.wait(300)
    g.js("var d=game.scene.getScene('Dungeon');var s=d.interactables.find(i=>i.type==='stairs_down');d.px=s.x;d.py=s.y;d._interact();")
    check('Stairs down → floor 2', wait_floor(g,'s1_b_mushroom_forest',1))
    g.wait(300)
    g.js("var d=game.scene.getScene('Dungeon');var s=d.interactables.find(i=>i.type==='stairs_up');d.px=s.x;d.py=s.y;d._interact();")
    ok=wait_floor(g,'s1_b_mushroom_forest',0); g.wait(300)
    near=g.js("(()=>{var d=game.scene.getScene('Dungeon');var s=d.stairsDownTile;return Math.hypot(d.px/TILE-s.x-0.5,d.py/TILE-s.y-0.5);})()")
    check('Back up → arrive beside that floor\'s stairs down', ok and near<4, near)
    g.js("game.scene.getScene('Dungeon')._exitToWorld(null)"); back_to_world(g); g.wait(300)
    # ── Island dungeons → familiars
    for sec,boss,fam,kind in [(1,'Pirate Captain','fam_grass','dungeon'),(2,'Swamp Titan','fam_water','dungeon'),(4,'Frost Lord','fam_fire','tower')]:
        g.js("(sec=>{var ws=game.scene.getScene('World');var h=ws.wd.sites.find(s=>s.type==='harbor'&&s.section===sec);ws.scene.sleep('World');ws.scene.launch('Island',{site:h,worldScene:ws,skipCutscene:true});})(%d)"%sec)
        for _ in range(30):
            if g.js("!!(game.scene.isActive('Island')&&game.scene.getScene('Island').monsters)"): break
            g.wait(250)
        g.wait(500)
        check(f'Island {sec}: no guardian on the surface', g.js("!game.scene.getScene('Island').monsters.some(m=>m.isBoss)"))
        g.js("game.scene.getScene('Island')._enterAdventure()")
        sid=g.js("'isl_adv_%d_'+ISL_ADV[%d].type"%(sec,sec))
        wait_floor(g,sid,0); g.wait(300)
        mf=g.js("game.scene.getScene('Dungeon').maxFloors")
        info=g.js("(()=>{var d=game.scene.getScene('Dungeon');return {lab:!!d._lab,type:d.siteType,mf:d.maxFloors};})()")
        check(f'Island {sec} dungeon uses a Lab design, ≥4 floors', info['lab'] and info['type']==kind and info['mf']>=4, info)
        g.js("(mf=>{var d=game.scene.getScene('Dungeon');d.scene.restart(Object.assign({},d._initData,{floor:mf-1}));})(%d)"%mf)
        wait_floor(g,sid,mf-1); g.wait(300)
        check(f'Island {sec} guardian {boss} waits on the last floor', g.js("game.scene.getScene('Dungeon').monsters.some(m=>m.isBoss&&m.def.name.indexOf(%s)===0)"%json.dumps(boss)))
        g.js(KILL); g.wait(200); g.js(CLAIM)
        for _ in range(30):
            if g.js("game.scene.isActive('Island')"): break
            g.wait(200)
        g.wait(500)
        check(f'Island {sec}: back on the island, {fam} familiar + harbor quest', g.ws("ps.ownedFamiliars.includes('%s')&&ps.completedIslands.includes(%d)&&ps.completedQuests.includes('s%d_harbor')"%(fam,sec,sec)))
        g.js("game.scene.getScene('Island')._exitToWorld()"); back_to_world(g); g.wait(300)
    # ── Ember Cave guardian (SW)
    g.js("(()=>{var ws=game.scene.getScene('World');ws.scene.sleep('World');ws.scene.launch('Cave',{worldScene:ws,islandScene:null,sec:3,floor:3,maxFloors:4});})()")
    for _ in range(30):
        if g.js("!!(game.scene.isActive('Cave')&&game.scene.getScene('Cave')._mons)"): break
        g.wait(250)
    g.wait(400)
    check('Ember Cave has 4 floors; guardian on the last', g.js("(()=>{var c=game.scene.getScene('Cave');return c.maxFloors===4&&c._isLastFloor&&c._mons.some(m=>m.isBoss);})()"))
    g.js("var c=game.scene.getScene('Cave');c._bossDefeated=true;c._claimCaveGuardian();"); back_to_world(g); g.wait(400)
    check('Ember Cave guardian → earth spirit familiar', g.ws("ps.ownedFamiliars.includes('fam_earth')&&ps.completedIslands.includes(3)"))
    # ── Journal
    g.js("var ws=game.scene.getScene('World');renderQuestList(ws.playerState.unlockedSections,ws.playerState.completedQuests,ws.playerState.activeQuest,ws);")
    html=g.js("document.getElementById('quest-list-container').innerHTML")
    check('Journal lists towers & dungeons with status', 'Silverwood Palace' in html and 'Moonglass Spire ✓' in html and 'Ash Dragon' in html)
    errs=[e for e in g.errs if 'GL Driver' not in e]
    check('No JS errors', not errs, errs[:4])

# ── Save migration v3 → v4
old=json.dumps({"hp":40,"maxHp":50,"atk":6,"def":1,"gold":10,"level":4,"xp":0,"mana":30,"maxMana":50,"mount":None,"ownedMounts":[],
  "familiar":"firefly","completedIslands":[1,2],"unlockedSections":[1,2],"equip":{"lHand":"wooden_sword"},"inventory":[],"ammo":{},
  "activeQuest":None,"completedQuests":["s1_tower"],"dungeonFog":{"s1_dungeon_0":[1,1,0]},"godMode":False,"ownedFamiliars":["firefly","sea_sprite"],
  "skills":[],"lockedSites":["s1_skyport"],"saveVersion":3})
with game(new=False, save=old) as g:
    check('v3 save migrates (to v6): harbor/skyport quests backfilled, Bram rescued, fog reset, old familiars → spirits', g.ws("ps.saveVersion===6&&ps.ownedFamiliars.join()==='fam_grass,fam_water'&&ps.completedQuests.includes('s1_harbor')&&ps.completedQuests.includes('s2_harbor')&&ps.completedQuests.includes('s1_skyport')&&ps.rescued.includes(1)&&Object.keys(ps.dungeonFog).length===0"))
    check('Rescued craftsman appears in the village on load', g.ws("(ws._villageNPCs||[]).filter(n=>!n.folk).length===1"))
print('%d/%d'%(sum(res),len(res)))
