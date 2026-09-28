"""Round 4: no Home button, campfires + Ashlands magma burn (unless Lava Unicorn / Dragon / Ash Dragon),
Tome lists immunities, elite dens (one room, elite + plain kin, big named health bar, lots of HP).
Run from the repo root after `node build.mjs`: python tests/test_round4.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def until(g, expr, ms=20000):
    for _ in range(ms // 500):
        if g.ws(expr): return True
        g.wait(500)
    return False
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  -> ' + str(info)), flush=True)

with game(new=True) as g:
    g.wait(500)
    check('No Home button (waystones are the way back)', g.js("!document.getElementById('home-btn') && ![...document.querySelectorAll('button')].some(b=>/Home/.test(b.textContent)&&b.offsetParent)"))
    # ── campfire ──
    g.ws("(()=>{ ps.godMode=false; ps.maxHp=200; ps.hp=200; ps.ownedMounts=['lava_unicorn','boar','sky_eagle']; ps.mount=null; var C=ws._camps.find(C=>C.T.prop==='campfire'&&C.state!=='spent'); window._cf=C; ws.player.x=C.x; ws.player.y=C.y+8; ws.player.cont.setPosition(ws.player.x,ws.player.y); C.guards.forEach(m=>{ m._m&&(m._m.stunT=60); }); })()")
    until(g, "ps.hp<200", 15000)
    foot = g.ws("200-ps.hp")
    g.ws("(()=>{ ps.hp=200; ps.mount='sky_eagle'; ws._inFire=false; })()"); until(g, "ps.hp<200", 8000); eagle = g.ws("200-ps.hp")
    g.ws("(()=>{ ps.hp=200; ps.mount='lava_unicorn'; ws._inFire=false; ws._burnTime=0; })()"); g.wait(4000); uni = g.ws("200-ps.hp")
    check('A lit campfire burns you on foot and on other mounts (~5% HP/s), not on the Lava Unicorn', foot >= 10 and eagle >= 10 and uni == 0, (foot, eagle, uni))
    # ── magma ──
    r = g.ws("""(()=>{ var y0=null,x0=null; for(var y=100;y<1100&&x0===null;y+=3)for(var x=100;x<700;x+=3){ if(ws.tiles[y][x]===T.THIN_MAGMA&&getTileSection(x,y)===4){ x0=x; y0=y; break; } }
      ps.mount=null; ps.hp=200; ws._burnTime=0; ws.player.x=x0*TILE+16; ws.player.y=y0*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y); ws._mag=[x0,y0]; return [x0,y0]; })()""")
    until(g, "ps.hp<200", 15000); mfoot = g.ws("200-ps.hp")
    g.ws("(()=>{ ps.hp=200; ps.mount='ash_salamander'; ws._burnTime=0; ws._lavaTime=0; ws.player.x=ws._mag[0]*TILE+16; ws.player.y=ws._mag[1]*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y); })()"); g.wait(4000); mdrag = g.ws("200-ps.hp")
    check('Ashlands magma burns you unless you ride the Lava Unicorn or a dragon', r[0] is not None and mfoot >= 10 and mdrag == 0, (r, mfoot, mdrag))
    g.ws("(()=>{ ps.mount=null; ps.hp=ps.maxHp; ps.godMode=true; ws.player.x=CENTER_X*TILE; ws.player.y=CENTER_Y*TILE; ws.player.cont.setPosition(ws.player.x,ws.player.y); })()")
    # ── Tome immunities ──
    r = g.js("""(()=>{ var out={}; ['scarecrow_warden','clover_slime'].forEach(id=>{ var e=Tome.entry('monster',id); out[id]=e.lines.filter(l=>/Immune|Weak|Defences/.test(l[0])).map(l=>l[0]+': '+l[1]); });
      var imm=Object.keys(MX.KITS).filter(k=>MON_BY_ID[k]&&/immune k=/.test(typeof MX.KITS[k]==='string'?MX.KITS[k]:'')); return {out:out, missing:MON_ROSTER.filter(R=>!MON_LEGACY[R.id]&&!Tome.entry('monster',R.id).lines.some(l=>l[0]==='Immune to')).map(R=>R.id)}; })()""")
    check('Tome shows every monster\'s immunities (plus weaknesses and defences)', not r['missing'] and any('arrows' in x for x in r['out']['scarecrow_warden']) and any(x.startswith('Weak to') for x in r['out']['scarecrow_warden']), r)
    # ── elite dens ──
    for sec in (1, 4):
        g.js("""(sec=>{var ws=game.scene.getScene('World');var ps=ws.playerState; ps.bonusCleared=[]; var site=ws.wd.sites.find(s=>s.bonus&&s.section===sec);var mf=site.floors; if(game.scene.isActive('Dungeon'))game.scene.stop('Dungeon');
          ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'});})(%d)""" % sec)
        g.wait(1500)
        for _ in range(30):
            if g.js("!!(game.scene.getScene('Dungeon')&&game.scene.getScene('Dungeon')._bossGroup)"): break
            g.wait(500)
        r = g.js("""(()=>{ var d=game.scene.getScene('Dungeon'), B=d._bossGroup[0], E=MDEFS[d._bossKey], base=MDEFS[E._base]; var others=d.monsters.filter(m=>!m.dead&&m!==B);
          return {den:d._labSpec.design.id, n:others.length, kin:others.every(m=>m.def.name===base.name), hp:B.maxHp, baseHp:base.hp, hud:document.getElementById('boss-hud').className, shown:document.getElementById('boss-hud').style.display, name:(document.querySelector('#boss-hud .bh-name')||{}).textContent}; })()""")
        check(f'Q{sec} elite den: one room, only the elite + {2+sec} plain kin, big named health bar, lots of HP', r['den'] == 'arena_elite_den_%d' % sec and r['n'] == 2 + sec and r['kin'] and r['hp'] >= r['baseHp'] * 7 and r['hud'] == 'elite' and r['shown'] == 'block' and 'Elite' in (r['name'] or ''), r)
    g.js("(()=>{ var d=game.scene.getScene('Dungeon'), b=d._bossGroup[0]; b.hp=0; d._monsterDied(b); })()"); g.wait(1500)
    r = g.js("({hud:document.getElementById('boss-hud').style.display, chest:(game.scene.getScene('Dungeon').interactables.find(i=>i.type==='boss_chest')||{}).locked})")
    check('Beating the elite hides the bar and opens the vault', r['hud'] == 'none' and r['chest'] is False, r)
    errs = [e for e in g.errs if 'GL Driver' not in e]
    check('No page errors', not errs, errs[:5])
print(f'\n{sum(res)}/{len(res)} passed')
sys.exit(0 if all(res) else 1)
