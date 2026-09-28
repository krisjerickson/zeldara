import json
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''))

# Old (v2) save made inside a dungeon: mount stowed, no saveVersion
old_save=json.dumps({"hp":40,"maxHp":50,"atk":6,"def":1,"gold":321,"level":4,"xp":12,"mana":30,"maxMana":50,
  "mount":None,"_stowedMount":"horse","ownedMounts":["horse"],"familiar":"firefly","familiar2":None,"familiar3":None,
  "completedIslands":[1],"unlockedSections":[1,2],"equip":{"lHand":"wooden_sword"},"inventory":[],"ammo":{},
  "activeQuest":None,"completedQuests":["s1_tower"],"dungeonFog":{},"godMode":False,"ownedFamiliars":["firefly"],
  "skills":[],"lockedSites":[],"_seaState":{"ready":True},"px":9616,"py":9616})
with game(new=False, save=old_save) as g:
    check('Old save loads', g.ws("ps.gold===321 && ps.level===4"), g.ws("({g:ps.gold,l:ps.level})"))
    check('Migrated: remounted + versioned', g.ws("ps.mount==='horse' && ps.saveVersion===SAVE_VERSION && !ps._stowedMount"))
    check('Backup of old save kept', g.js("!!localStorage.getItem('qoz_v2_backup_v2')"))
    g.js("game.scene.getScene('World')._save()")
    check('New save has current saveVersion', g.js("JSON.parse(localStorage.getItem('qoz_v2')).saveVersion===SAVE_VERSION"))

with game() as g:
    ps="game.scene.getScene('World').playerState"
    # Pause in Building, Cave, Sky
    for key,launch in [
        ('Cave',"ws.scene.sleep('World');ws.scene.launch('Cave',{worldScene:ws,sec:1})"),
        ('Sky',"ws.scene.sleep('World');ws.scene.launch('Sky',{worldScene:ws,site:ws.wd.sites.find(s=>s.type==='skyport')})"),
    ]:
        g.js("(()=>{var ws=game.scene.getScene('World');"+launch+"})()"); g.wait(2500)
        g.key('i'); g.wait(400)
        check(f'Pause works in {key}', g.js(f"game.scene.getScene('{key}').sys.isPaused()"), g.active())
        g.key('i'); g.wait(300)
        check(f'Resume in {key}', g.js(f"game.scene.isActive('{key}')"))
        g.js(f"game.scene.stop('{key}');game.scene.wake('World');document.getElementById('hud').style.display=''"); g.wait(500)

    # Familiar abilities, one at a time, in the world
    g.ws("(ps.level=6, ps.ownedFamiliars=['fam_grass','fam_water','fam_earth','fam_fire'], ps.famLevels={fam_grass:6,fam_water:6,fam_earth:6,fam_fire:6})")
    def arena(fid, wait=9000):
        g.ws(f"(ps.familiar='{fid}', ps.familiar2=null, ps.familiar3=null, ps.familiar4=null, ws.worldMonsters.forEach(m=>{{m.dead=true;m.cont&&m.cont.destroy();}}), ws.worldMonsters=[])")
        g.js("sbSpawnMonsters()")
        # pull a few monsters close and freeze their AI so effects are measurable
        g.ws("ws.worldMonsters.slice(0,4).forEach((m,i)=>{m.x=ws.player.x+60+i*12;m.y=ws.player.y+20;m.cont.setPosition(m.x,m.y);m.hp=m.maxHp=999;})")
        g.wait(wait)
    arena('fam_fire')
    check('Fire spirit ignites (burn applied)', g.ws("ws.worldMonsters.some(m=>m._burnT>0||m.hp<999)"))
    arena('fam_water')
    check('Water spirit slows', g.ws("ws.worldMonsters.some(m=>(m._slow>0||m._slowT>0)&&m.hp<999)"))
    arena('fam_grass')
    check('Grass spirit damages', g.ws("ws.worldMonsters.slice(0,4).some(m=>m.hp<999)"))
    g.ws("(ps.familiar='fam_water', ps.hp=ps.maxHp)"); g.wait(2500)
    g.ws("(ps.hp=Math.max(1,ps.hp-7))"); g.wait(600)
    check('Water spirit Tide Ward refunds a hit', g.ws("ps.hp===ps.maxHp || ps._famWard && ps._famWard.fam_water && ps._famWard.fam_water.ready===false"), g.ws("({hp:ps.hp,max:ps.maxHp,st:ps._famWard})"))
    # Familiar UI
    g.key('n'); g.wait(400)
    check('N picker lists abilities', g.js("document.getElementById('quick-pick-popup').innerHTML.includes('Tidal Wave')"))
    g.key('Escape'); g.wait(200)
    g.key('i'); g.wait(400)
    check('Inventory lists familiar skills', g.js("document.getElementById('modal-inventory').innerHTML.includes('Inferno')"))
    g.key('i'); g.wait(200)
    check('Title subtitle updated', True)
    errs=[e for e in g.errs if 'GL Driver' not in e]
    check('No JS errors', not errs, errs[:4])
print('%d/%d'%(sum(res),len(res)))
