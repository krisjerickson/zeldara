import json, sys
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game

results = []
def check(name, ok, info=''):
    results.append((name, bool(ok), info))
    print(('PASS ' if ok else 'FAIL ') + name + ('  ' + str(info) if info else ''))

def enter_site(g, typ, sec):
    # ★ boss sites are sealed until the quadrant's other sites are cleared (round 2) — open the seal
    g.js("(()=>{var ws=game.scene.getScene('World'); ws.playerState.bonusCleared=ws.wd.sites.filter(s=>s.bonus).map(s=>s.id);})()")
    g.js(f"_sbGoToSiteEntry('{typ}',{sec})"); g.wait(400)
    g.key('Tab', 80); g.wait(1500)

with game() as g:
    # ── B1 pause ──
    g.js("sbSpawnMonsters()"); g.wait(600)
    g.key('i'); g.wait(300)
    check('I opens inventory & pauses World', g.js("isGamePaused() && game.scene.getScene('World').sys.isPaused()"))
    x0 = g.ws("ws.player.x"); m0 = g.ws("ws.worldMonsters.filter(m=>!m.dead).slice(0,5).map(m=>m.x+','+m.y).join('|')")
    g.hold('d', 700); g.wait(600)
    check('Player frozen while paused', g.ws("ws.player.x") == x0)
    check('Monsters frozen while paused', g.ws("ws.worldMonsters.filter(m=>!m.dead).slice(0,5).map(m=>m.x+','+m.y).join('|')") == m0)
    g.key('i'); g.wait(300)
    check('I again closes & resumes', g.js("!isGamePaused() && !game.scene.getScene('World').sys.isPaused()"))
    g.hold('d', 500)
    check('Player moves after resume', g.ws("ws.player.x") != x0)
    g.key('n'); g.wait(300)
    check('N opens familiar picker & pauses', g.js("isGamePaused() && document.getElementById('quick-pick-popup').style.display==='block'"))
    g.key('Escape'); g.wait(300)
    check('Esc closes picker & resumes', g.js("!isGamePaused()"))
    # buff freeze
    g.ws("(ps.buffs=ps.buffs||{}, ps.buffs.atkUp=Date.now()+60000)")
    b0 = g.ws("ps.buffs.atkUp")
    g.key('q'); g.wait(1500); g.key('q'); g.wait(200)
    check('Buff timer frozen during pause', g.ws("ps.buffs.atkUp") - b0 >= 1200, g.ws("ps.buffs.atkUp") - b0)

    # ── B4 mount + B3 spell in dungeon ──
    g.ws("(ps.ownedMounts=['horse'], ps.mount='horse', ps.inventory.push('frost_bolt_tome'), ps.equip.spell='frost_bolt_tome', ps.mana=50, ps.maxMana=50)")
    enter_site(g, 'dungeon', 1)
    check('Entered dungeon', 'Dungeon' in g.active(), g.active())
    check('Mount stowed in dungeon', g.ws("ps.mount===null && ps._stowedMount==='horse'"))
    mana0 = g.ws("ps.mana")
    g.key('x'); g.wait(250)
    n_proj = g.js("(game.scene.getScene('Dungeon')._heroSpellProj||[]).length")
    check('X casts spell in dungeon', g.ws("ps.mana") < mana0 or n_proj > 0, {'mana_before': mana0, 'after': g.ws("ps.mana"), 'proj': n_proj})
    # pause in dungeon
    g.key('i'); g.wait(300)
    check('Pause works in dungeon', g.js("game.scene.getScene('Dungeon').sys.isPaused()"))
    g.key('i'); g.wait(300)
    # exit dungeon normally
    g.js("game.scene.getScene('Dungeon')._exitToWorld(null)"); g.wait(800)
    check('Back in World', g.js("game.scene.isActive('World')"))
    check('Remounted on exit', g.ws("ps.mount==='horse' && !ps._stowedMount"))

    # ── B6 death in dungeon ──
    enter_site(g, 'dungeon', 1)
    g.ws("(ps.gold=1000)")
    g.js("var d=game.scene.getScene('Dungeon'); d.worldScene.playerState.hp=0; d._playerDied()"); g.wait(1500)
    check('Death in dungeon -> World', g.js("game.scene.isActive('World') && !game.scene.isActive('Dungeon')"), g.active())
    check('Death penalty applied (25% HP, -10% gold)', g.ws("ps.gold===900 && ps.hp>0"), g.ws("({gold:ps.gold,hp:ps.hp})"))
    check('HUD restored after death', g.js("document.getElementById('hud').style.display===''"))

    # ── Volcano scenes load (previously crashed) ──
    g.js("sbVolcanoUnlock()"); g.wait(800)
    for key, sid in [('VolcanoMaze','volcano_n'),('VolcanoBulletHell','volcano_e'),('VolcanoPuzzle','volcano_s'),('VolcanoEscape','volcano_w'),('VolcanoBossRush','volcano_main')]:
        g.js(f"""(()=>{{var ws=game.scene.getScene('World');var s=ws.wd.sites.find(s=>s.id==='{sid}');
          ws.scene.sleep('World');ws.scene.launch('{key}',{{site:s,worldScene:ws,keyId:'volcano_key_n',keyName:'Key'}});}})()""")
        g.wait(1200)
        ok = g.js(f"game.scene.isActive('{key}')")
        g.key('Escape'); g.wait(900)
        back = g.js("game.scene.isActive('World')")
        check(f'{key} loads and Esc returns', ok and back, g.active())

    # ── B2 familiars ──
    g.ws("(ps.ownedFamiliars=['fam_grass','fam_water','fam_earth','fam_fire'], ps.familiar='fam_earth', ps.level=5)")
    g.js("sbSpawnMonsters()"); g.wait(200)
    hp_before = g.ws("ws.worldMonsters.filter(m=>!m.dead).reduce((a,m)=>a+m.hp,0)")
    g.wait(12000)
    hp_after = g.ws("ws.worldMonsters.filter(m=>!m.dead).reduce((a,m)=>a+m.hp,0)")
    check('Earth spirit damages monsters', hp_after < hp_before, (hp_before, hp_after))
    g.js("showFamiliarInfo('fam_fire')"); g.wait(300)
    check('Familiar info popup opens + pauses', g.js("document.getElementById('familiar-info-modal').style.display==='flex' && isGamePaused()"))
    g.key('Escape'); g.wait(200)

    errs = [e for e in g.errs if 'GL Driver' not in e]
    check('No JS errors', not errs, errs[:5])

print('\n%d/%d passed' % (sum(r[1] for r in results), len(results)))
