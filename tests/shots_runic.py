"""Screenshots of the Lab's runic elements in the real world (day and night)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
OUT = sys.argv[1] if len(sys.argv) > 1 else '/tmp'
SHOTS = [  # (zone id, dx, dy, night, file)
    ('village', 0, 0, False, 'v_village_day'),
    ('standing_stones', -14, -14, True, 'r1_standing_stones_night'),
    ('fairy_rings', -6, -16, True, 'r1_fairy_rings_night'),
    ('willow_cathedral', 0, 0, False, 'r2_willow_shafts'),
    ('sunken_spires', 0, 0, True, 'r2_sunken_temple_night'),
    ('golem_graveyard', 0, 0, False, 'r3_golems'),
    ('starfall_crater', -8, -4, True, 'r3_starfall_night'),
    ('sulfur_geysers', 0, 0, False, 'r4_geysers'),
    ('magma_channels', 0, 0, True, 'r4_magma_night'),
    ('dragon_valley', 0, -18, False, 'r4_dragon_valley'),
]
with game(new=True) as g:
    g.js("sbUnlockAll()")
    ids = g.js("WMAP_ZONES.map(z=>z.id)")
    for zid, dx, dy, night, name in SHOTS:
        if zid == 'village':
            g.js("(()=>{var ws=game.scene.getScene('World'); ws.player.x=CENTER_X*TILE; ws.player.y=(CENTER_Y+6)*TILE; ws.player.cont.setPosition(ws.player.x,ws.player.y);})()")
        else:
            if zid not in ids:
                print('no zone', zid); continue
            g.js(f"(()=>{{var ws=game.scene.getScene('World'), z=WMAP_ZONES.find(q=>q.id==='{zid}'); ws.player.x=(z.x+{dx})*TILE+16; ws.player.y=(z.y+{dy})*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y);}})()")
        g.js("(()=>{var ws=game.scene.getScene('World'); ws.cameras.main.centerOn(ws.player.x,ws.player.y); ws._forceNight=%s; ws._updateChunks(true);})()" % ('1' if night else '0'))
        g.wait(3500)
        g.js("(()=>{var ws=game.scene.getScene('World'); ws._updateChunks(true);})()")
        g.wait(1500)
        g.shot(os.path.join(OUT, name + '.png')); print('shot', name, flush=True)
    print(g.errs[:5])
