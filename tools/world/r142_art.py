"""Round 142 (Kris: "an awesome looking loading screen, unique to each adventure site" and, for the end-of-site hearth screen, "~6 frames for this
to be a little scene, with the fireplace and candles flickering. request as new images").
  · one wide painting per adventure site (load_<site id>): the site itself, seen as you arrive, in its realm's light — the loading screen's backdrop;
    one for the sky port and one for Muspelheim's trials.
  · the hearth tableau in six frames (hearth_f1..6): the same room, only the fire and the candle flames moving.
Writes src/js/07zt37-art-r142.js and sprites/requests/r142_load.txt, r142_hearth.txt.     python tools/world/r142_art.py
Then: .\\tools\\sprites\\paint.ps1 -List r142_hearth   and   .\\tools\\sprites\\paint.ps1 -List r142_load"""
import json, os
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
REALM = {1: ('Gildenmark', 'golden-green meadows and silver birch woods under a bright morning sky'),
         2: ('Fernheim', 'misty lily-pad wetlands, ferns and still blue water under a pale silver sky'),
         3: ('Cragland', 'grey crags and a great scar in the earth, wind-bent pines, a dusky violet sky'),
         4: ('Cinderheim', 'black basalt, glowing lava rivers and ash under an ember-red sky')}
SITES = [  # id, name, section, what it is
 ('s1_tower', 'Silverwood Palace', 1, 'a tall elegant palace of pale silver wood and white stone rising out of a birch forest, banners and leafy spires'),
 ('s1_dungeon', 'Sunken Courtyard', 1, 'the mossy steps of a sunken stone courtyard leading down into the earth, broken columns, ivy and still water'),
 ('s1_b_elven_library', 'The Leafbound Library', 1, 'a graceful library-tower woven with living branches, glowing windows, leaves drifting round it'),
 ('s1_b_hyrule_keep', 'The Pale Keep', 1, 'a pale stone keep with round towers and a drawbridge over a moat, green hills around it'),
 ('s1_b_mushroom_forest', 'The Toadstool Deep', 1, 'a cave mouth framed by giant glowing toadstools in a dim forest, spores drifting'),
 ('mage_rime_spire', 'The Rime Spire', 1, "a mage's slender tower glazed with frost and icicles, cold blue light at its top"),
 ('mage_scriptorium', 'The Scriptorium Tower', 1, "a mage's tower ringed by floating books and loose pages circling it like birds"),
 ('mage_hearthfire', 'Hearthfire Tower', 1, "a squat warm mage's tower of red brick with many chimneys, fire-glow in every window, smoke curling"),
 ('mage_rootspire', 'The Rootspire', 1, "a mage's tower grown from a vast twisted tree, roots and moss, green lanterns"),
 ('s2_tower', 'Rimehall', 2, 'a frozen cathedral of ice and grey stone with tall pointed windows, frost on every arch'),
 ('s2_dungeon', 'The Ringmere', 2, 'a ring of old standing stones round a dark lake, a stone stair spiralling down into the water'),
 ('s2_b_moonglass', 'Moonglass Spire', 2, 'a spire of moon-pale glass catching silver light, reflected in a still mere'),
 ('s2_b_crystal_grotto', 'Glimmerdeep', 2, 'the mouth of a grotto glittering with blue and violet crystals, light shining out of the dark'),
 ('s2_b_root_hollow', 'Root Hollow', 2, 'a hollow beneath an enormous tree, its roots forming a tunnel into the earth, fireflies'),
 ('mage_conductor', "The Conductor's Spire", 2, "a mage's iron tower crowned with a lightning rod, sparks crackling, storm clouds above"),
 ('mage_frozen_belfry', 'The Frozen Belfry', 2, "a mage's bell tower frozen solid, a great iced bell hanging in its open top"),
 ('mage_mire_tower', 'The Mire Tower', 2, "a crooked mage's tower of black timber rising from a bog, witch-lights over the reeds"),
 ('mage_drowned_lighthouse', 'The Drowned Lighthouse', 2, "a mage's lighthouse half sunk in the sea, its lamp still burning green, waves on its stones"),
 ('s3_tower', 'Starlit Observatory', 3, 'an observatory on a crag with a great brass dome open to the stars, telescopes, a starry dusk'),
 ('s3_dungeon', 'Bonedeep', 3, 'a pit in the crags ringed with old bones and carved rune-stones, a stair going down into darkness'),
 ('s3_b_sky_cloister', 'Sky Cloister', 3, 'a cloister of white arches on a crag-top above the clouds, bells and prayer flags'),
 ('s3_b_rivendell', 'The Dusk Hall', 3, 'a graceful hall among waterfalls in a deep valley, warm lamps in the dusk'),
 ('s3_b_pillared_hall', 'The Hundred Pillars', 3, 'a vast doorway into the mountain lined with rows of carved stone pillars, going deep'),
 ('mage_ember_observatory', 'The Nova Dome', 3, "a mage's domed observatory glowing with captured starfire, orbiting lights"),
 ('mage_hollow_spire', 'The Hollow Spire', 3, "a mage's dark spire with a violet rift glowing through cracks in its walls"),
 ('mage_lightning_rod', 'Stormspike', 3, "a mage's jagged tower on a peak, lightning striking its iron spike, rain sweeping"),
 ('mage_monolith', 'The Monolith', 3, "a mage's great black monolith carved with glowing runes, standing alone on a crag"),
 ('s4_tower', 'Dawn Sanctum', 4, 'a sanctum of gold-veined stone on a basalt rise, catching the first gold light through the ash'),
 ('s4_dungeon', 'The Molten Isles', 4, 'islands of black rock in a lake of lava, stone bridges between them, a fortress gate on the far isle'),
 ('s4_b_reflecting_hall', 'The Still Hall', 4, 'a hall of polished obsidian mirrors standing over a still pool of glowing lava'),
 ('s4_b_boulder_field', 'Tumblestone', 4, 'a field of huge round boulders on a slope of ash, a cave gate between them'),
 ('s4_b_spiral_chasm', 'The Winding Deep', 4, 'a great spiral chasm cut into the rock, a ledge-path winding down towards lava-glow'),
 ('mage_frostbitten_crown', 'The Frostbitten Crown', 4, "a mage's glass conservatory crowned with ice crystals, strangely frozen amid the heat"),
 ('mage_rift_tower', 'The Rift Tower', 4, "a mage's tower split by a glowing violet rift, floating stones around it"),
 ('mage_crimson_spire', 'The Crimson Spire', 4, "a mage's red stone chapel-spire under a blood-red moon, crimson stained glass"),
 ('mage_astral_spire', 'The Astral Spire', 4, "a mage's dreaming tower whose top dissolves into stars and drifting dream-lights"),
]
EXTRA = [('load_sky', 'The sky port', 'a wooden sky port on a cliff with a sky-ship moored by ropes, sails and clouds below, the open sky beyond'),
         ('load_muspelheim', 'Muspelheim', 'the fire realm of Muspelheim: a black gate in a wall of basalt, lava falls, embers in the air, a red sky')]
STYLE = ("A wide cinematic establishing painting for a loading screen, seen from the path as the hero arrives (the hero is NOT in the picture), "
         "hand-painted in the game's Norse storybook style: deep colour, soft painterly light, atmosphere and depth, the place clearly the subject in the "
         "middle of the picture with space around it. No people, no text, no letters, no numbers, no frame, no pixel art.")
sheets = []
for i, n, s, d in SITES:
    rn, look = REALM[s]
    sheets.append({'id': 'sc_ld_%s' % i, 'wave': 142, 'fam': 'backdrops', 'kind': 'room', 'cols': 1, 'rows': 1, 'size': '1536x1024',
                   'title': 'Loading screen — %s (%s).' % (n, rn),
                   'items': [['load_%s' % i, n, '%s, in %s (%s). %s' % (d, rn, look, STYLE), 1536, 1024]]})
for i, n, d in EXTRA:
    sheets.append({'id': 'sc_ld_%s' % i[5:], 'wave': 142, 'fam': 'backdrops', 'kind': 'room', 'cols': 1, 'rows': 1, 'size': '1536x1024',
                   'title': 'Loading screen — %s.' % n, 'items': [[i, n, d + '. ' + STYLE, 1536, 1024]]})
FL = ['the fire low and glowing, the candle flames small and upright', 'the fire flaring up on the left, the candle flames leaning a little right',
      'the fire tall and bright in the middle, sparks rising, the candle flames tall', 'the fire flaring on the right, the candle flames leaning a little left',
      'the fire settling, a log glowing orange, the candle flames flickering short', 'the fire rising again with a curl of flame, the candle flames upright and bright']
HEARTH = []
for k, f in enumerate(FL, 1):
    HEARTH.append({'id': 'sc_hearth_f%d' % k, 'wave': 142, 'fam': 'engage', 'kind': 'room', 'cols': 1, 'rows': 1, 'size': '1536x1024', 'refs': ['sc_e134_hearth'],
                   'title': 'Rest by the hearth — frame %d of 6 (only the flames move).' % k,
                   'items': [['hearth_f%d' % k, 'Rest by the hearth, frame %d' % k,
                              "EXACTLY the reference picture — the hero's house at night seen from inside, the big stone hearth, the table with the map, the pouch of "
                              "gold and the treasures, the boots by the fire, the candles, every object in the same place, same framing, same colours — and ONLY the "
                              "flames different: %s. Frame %d of a six-frame loop of a crackling hearth. Hand-painted Norse storybook style. No text, no letters, no pixel art." % (f, k), 1536, 1024]]})
js = ('// 07zt37-art-r142.js — round 142: a loading-screen painting for each adventure site, and the hearth in six frames (made by tools/world/r142_art.py — edit there).\n'
      '//   .\\tools\\sprites\\paint.ps1 -List r142_hearth   ·   .\\tools\\sprites\\paint.ps1 -List r142_load\n'
      '(function(){ if(typeof ZSCN==="undefined")return; ZSCN.WAVES[142]=ZSCN.WAVES[142]||"Round 142"; ZSCN.SHEETS=ZSCN.SHEETS.concat(' +
      json.dumps(HEARTH + sheets, ensure_ascii=False) + '); })();\n')
open(os.path.join(R, 'src', 'js', '07zt37-art-r142.js'), 'w', encoding='utf-8').write(js)
open(os.path.join(R, 'sprites', 'requests', 'r142_load.txt'), 'w', encoding='utf-8').write('\n'.join(s['id'] for s in sheets) + '\n')
open(os.path.join(R, 'sprites', 'requests', 'r142_hearth.txt'), 'w', encoding='utf-8').write('\n'.join(s['id'] for s in HEARTH) + '\n')
print(len(sheets), 'loading +', len(HEARTH), 'hearth')
