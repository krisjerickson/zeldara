#!/usr/bin/env python3
"""Round 127: the painted units every boss brings into a fight (summons, phase allies, guards, kin), cut from the game's own atlas pages,
for the Lab's boss review. Writes lab/preview/bossplan/units.json and one small webp per unit."""
import json, os
from PIL import Image
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
A = json.load(open(os.path.join(R, 'assets', 'atlas', 'index.json')))
OUT = os.path.join(R, 'lab', 'preview', 'bossplan'); os.makedirs(OUT, exist_ok=True)
UNITS = [  # (char, name, who brings it, how)
 ('clover_slime', 'Clover Slime', 'Apprentice Conjurer', 'summons 2'), ('bumble_knight', 'Bumble Knight', 'Hive Keeper', 'lobbed hive hatches'),
 ('bloodgnats', 'Bloodgnat Cloud', 'Gnat Caller', 'summons 2'), ('fog_phantom', 'Fog Phantom', 'Mist Weaver', 'summons 2'),
 ('slime_newts', 'Slime Newts', 'Mire Shaman', 'summons 2'), ('frost_wolf', 'Frost Wolf', 'Snow Owl', 'summons 1'),
 ('chess_knight', 'Chess Knight', 'Chessmaster', 'summons 1'), ('cinder_hounds', 'Cinder Hounds', 'Hellhound', 'summons 1'),
 ('charred_zombies', 'Charred Zombies', 'Cinder Lich · the Bone King (castle warden)', 'summons 2'), ('magma_vent', 'Magma Spitter', 'Forge Artificer', 'summons 1'),
 ('imp_bombardier', 'Imp Bombardier', 'Brimstone Summoner', 'summons 2'), ('ash_moths', 'Ash Moth Swarm', 'Ember Banshee', 'summons 2'),
 ('glowfrog', 'Glowfrog Croaker', 'Swamp Witch (phase 2) · Mother Morrow (mage)', 'summons 2'), ('waterlogged_revenant', 'Waterlogged Revenant', 'Abbot Draugmere (castle warden)', 'summons 2'),
 ('einherjar_shieldmaiden', 'Einherjar Shield-maiden', 'Solmyrk (phase 1)', 'summons'), ('mg_arcane_scribe', 'Quillon\'s echo', 'Magister Quillon (mage)', 'echo copies'),
 ('mg_rift_lich', 'Xal\'zor\'s echo', 'Xal\'zor (mage)', 'echo copies'),
 ('bf_drakeling', 'Geode Drakeling', 'Rock Dragon, phase 4', 'ally ×2'), ('bf_forge_guardian', 'Anvil Guardian', 'Iron Sentinel, phase 4', 'ally ×2'),
 ('bf_lava_titan_2', 'Magma Titan', 'Lava Titan, phase 5', 'ally ×2'), ('bf_shadow_twin', 'Shadow Twin', 'Shadow Lord, phase 5', 'ally ×2'),
 ('boss_vr_magma_spitter', 'Pyrecoil', 'Muspelheim guards 1', 'paired guard'), ('boss_vr_cinder_phoenix', 'Ashwing', 'Muspelheim guards 2', 'paired guard'),
 ('boss_vr_ashen_knight', 'Sir Cindric', 'Muspelheim guards 3', 'paired guard'), ('boss_vr_inferno_wraith', 'Vathrax', 'Muspelheim guards 4', 'paired guard'),
 ('scorched_paladin', 'Ash-warden (soldier)', 'Muspelheim fortress', 'wardens'), ('ash_wraith', 'Ash-warden (wraith) · Ash Wraith kin', 'Muspelheim · Ash Wraith Lord (elite)', 'wardens / kin ×6'),
 ('barrow_skeleton', 'Skeleton kin', 'Barrow Wight (elite)', 'kin ×3'), ('mud_troll', 'Mud Troll kin', 'Bog Troll Chieftain (elite)', 'kin ×4'),
 ('mesa_golem', 'Stone Golem kin', 'Runic Stone Golem (elite)', 'kin ×5'), ('fire_imp', 'Fire Imp', 'Volcano boss rush, wave 1', 'swarm ×3'),
 ('bellows_imp', 'Bellows Imp', 'Ember Forge', 'forge foes'), ('coalback', 'Coalback', 'Ember Forge', 'forge foes'), ('scald_wraith', 'Scald Wraith', 'Cinder Forge', 'forge foes'),
 ('quench_golem', 'Quench Golem', 'Cinder Forge', 'forge foes'), ('slag_crawler', 'Slag Crawler', 'Slag Forge', 'forge foes'), ('ore_hurler', 'Ore Hurler', 'Slag Forge', 'forge foes'),
 ('chain_jailer', 'Chain Jailer', 'Ash Forge', 'forge foes')]
F = A['frames']; C = A['chars']; pages = {}
def page(p):
    if p not in pages: pages[p] = Image.open(os.path.join(R, 'assets', 'atlas', p + '.webp')).convert('RGBA')
    return pages[p]
out = []
for ch, name, who, how in UNITS:
    if ch not in C: out.append({'ch': ch, 'name': name, 'who': who, 'how': how, 'painted': False}); continue
    pick = None
    for a in ('idle', 'still', 'float', 'move', 'walk'):
        for f in ('f', 'q', 's'):
            k = '%s/%s/%s/0' % (ch, a, f)
            if k in F: pick = k; break
        if pick: break
    if not pick: pick = next(k for k in F if k.startswith(ch + '/'))
    fr = F[pick]; im = page(fr[0]).crop((fr[1], fr[2], fr[1] + fr[3], fr[2] + fr[4]))
    im.thumbnail((160, 160)); fn = 'u_%s.webp' % ch; im.save(os.path.join(OUT, fn), quality=88)
    out.append({'ch': ch, 'name': name, 'who': who, 'how': how, 'painted': True, 'img': fn})
json.dump(out, open(os.path.join(OUT, 'units.json'), 'w'), indent=0)
print(len(out), 'units,', sum(1 for u in out if not u['painted']), 'without a painted sheet:', [u['ch'] for u in out if not u['painted']])
