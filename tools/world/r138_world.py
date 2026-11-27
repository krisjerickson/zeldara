"""Round 138: the paintings for Kris's take-5 picks (Lab › The world, revamped 5: ✓ set-pieces, cliffs, a world beyond the edge, roads,
little scenes, forests, water, skylines) and the four landmarks again from his notes (wider, spanning the whole river / lava / Scar, the Scar's
cliff as a real cliff, Mira's lift that carries you and your mount).   python tools/world/r138_world.py
  → src/js/07zt28-art-r138-world.js, sprites/requests/r138_world.txt, sprites/requests/r138_landmarks.txt"""
import os, json
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
STYLE = " Painted in the game's hand-painted Norse storybook style — deep colour, glowing rune-blue magic, warm lantern light, soft painterly shading. No pixel art. No text, no letters, no numbers."
OBJ = " Alone and centred on a transparent background, in the game's classic top-down three-quarter view, standing on the ground with a soft shadow." + STYLE
GRID = " Each item alone in its own cell of the grid, well apart, on a transparent background, in the game's classic top-down three-quarter view with a soft shadow." + STYLE
BAND = " A long horizontal band: the far distance only, soft and slightly hazy as if many miles away, the bottom edge fading to transparent, the sky above transparent." + STYLE
REALM = {1: ('Gildenmark', 'green rolling meadows, birch and oak, golden fields'), 2: ('Fernheim', 'misty marsh, willows, reeds, lantern lilies, dark water'),
         3: ('Cragland', 'grey granite crags, pines, snow on the heights'), 4: ('Cinderheim', 'black basalt, grey ash, glowing ember cracks, burned trees')}
S = []
def sheet(sid, fam, kind, title, items, cols=1, rows=1, size='1536x1024', refs=None, tail=OBJ):
    S.append({'id': 'sc_' + sid, 'wave': 138, 'fam': fam, 'kind': kind, 'cols': cols, 'rows': rows, 'size': size, 'refs': refs or ['sc_wl_landmarks_1'],
              'title': title, 'items': [[it[0], it[1], it[2] + tail, (it[3] if len(it) > 3 else 384), (it[4] if len(it) > 4 else 384)] for it in items]})
# ── set-pieces: six a realm ──
SET = {1: [('mill', 'Watermill', 'a timber watermill on a brook with a big turning wheel, a thatched roof and a sack-cart by the door'),
           ('arch', 'Old stone arch', 'a small mossy stone arch bridge over a brook, ferns at its feet (decoration, not a road)'),
           ('watch', 'Ruined watchtower', 'a ruined round stone watchtower, its top broken, ivy and a crow on the rim'),
           ('birch', 'Giant birch', 'one enormous ancient silver birch, its trunk wide as a house, rune-carvings in its bark'),
           ('windmill', 'Windmill', 'a tall timber post-windmill with four cloth sails on a little green mound'),
           ('barrow', 'Barrow mound', 'a grassy barrow mound with a carved standing stone at its door and wildflowers')],
       2: [('bells', 'Drowned bell-tower', 'a stone bell-tower standing up out of dark marsh water, its bell visible, reeds round its foot'),
           ('stilt', 'Stilt hut', 'a fisher\'s hut on tall stilts over the water, nets drying, a lantern at the door'),
           ('willow', 'Great willow', 'a huge weeping willow over the water, its long hanging branches touching the surface, fireflies'),
           ('boathouse', 'Boathouse', 'a reed-thatched boathouse with a small boat inside and a jetty'),
           ('sluice', 'Dike sluice', 'an old dike sluice-gate of oak and iron with a big hand-wheel, water trickling through'),
           ('shrine', 'Lily shrine', 'a small stone shrine on an islet ringed with glowing lantern-lilies')],
       3: [('headframe', 'Mine head-frame', 'a timber mine head-frame with a great winding wheel over a shaft, an ore cart on rails'),
           ('dwarfdoor', 'Dwarven door', 'a huge carved dwarven stone door set into a cliff face, runes round its frame, shut'),
           ('statue', 'Stone giant', 'a weathered statue of a seated stone giant, moss on its shoulders, as big as a hill'),
           ('crag', 'Crag tower', 'a narrow watchtower on top of a tall rock crag, a stair cut into the rock'),
           ('fold', 'Shepherd\'s fold', 'a low dry-stone shepherd\'s hut with a sheepfold and a few grey sheep'),
           ('cairn', 'Great cairn', 'a tall stacked-stone cairn with prayer ribbons fluttering, snow at its base')],
       4: [('hall', 'Burned hall', 'the blackened shell of a great timber feast hall, its roof beams charred, embers glowing in the ash'),
           ('spire', 'Black glass spire', 'a tall jagged spire of black volcanic glass, faint red light inside it'),
           ('skull', 'Dragon skull', 'an enormous petrified dragon skull half-buried in ash, its eye socket big as a door'),
           ('embertree', 'Ember tree', 'a dead burned tree with glowing orange cracks running through its trunk like veins'),
           ('gate', 'Fallen city gate', 'the broken stone gate of a lost ember-city, one tower still standing, banners burned to rags'),
           ('chimney', 'Forge chimney', 'a tall ruined forge chimney of red brick, smoke still curling from its top')]}
for q, L in SET.items():
    nm, look = REALM[q]
    sheet('wl_set_%d' % q, 'setpieces', 'obj', 'Set-pieces of %s — six big things to walk to (%s).' % (nm, look),
          [('set%d_%s' % (q, k), n, d + ', in %s (%s), 300–600 px tall in the game' % (nm, look), 512, 512) for k, n, d in L], cols=3, rows=2, tail=GRID)
# ── cliffs, banks and falls: eight a realm, plus the Great Scar ──
EDGE = [('face', 'Cliff face', 'a straight stretch of cliff face, the top edge with grass or rock, the face dropping down'),
        ('corner', 'Cliff corner', 'an outer corner where a cliff turns 90 degrees'),
        ('inner', 'Cliff inner corner', 'an inner corner where a cliff turns back'),
        ('falls', 'Cliff with falls', 'a stretch of cliff with a small waterfall pouring over it into a pool'),
        ('bank', 'Mossy bank', 'a low mossy bank where land meets water, roots and stones at the waterline'),
        ('reeds', 'Bank with reeds', 'a low bank with reeds and a few flowers at the waterline'),
        ('rapids', 'Rapids', 'a short stretch of white-water rapids over rocks'),
        ('end', 'Cliff end', 'the end of a cliff where it sinks into the slope')]
for q in (1, 2, 3, 4):
    nm, look = REALM[q]
    sheet('wl_edge_%d' % q, 'edges', 'obj', 'Cliffs, banks and falls of %s — edge pieces to lay along rivers and the coast.' % nm,
          [('edge%d_%s' % (q, k), n, d + ', in %s (%s), seamless left and right so pieces join' % (nm, look), 384, 256) for k, n, d in EDGE], cols=4, rows=2, tail=GRID)
sheet('wl_scar', 'edges', 'obj', 'The Great Scar — the cliff you cannot climb (Kris: "the rock barrier … needs to look better, so you realize it\'s a massive cliff").',
      [('scar_face', 'Scar face', 'a section of the GREAT SCAR: a colossal sheer granite cliff, many times taller than a person, torn and raw, cracks glowing faintly red deep inside, dust falling, seamless left and right', 512, 512),
       ('scar_corner', 'Scar corner', 'the same colossal torn cliff turning a corner', 512, 512),
       ('scar_end', 'Scar end', 'where the Great Scar meets the sea or the mountains and ends, boulders tumbled at its foot', 512, 512),
       ('scar_top', 'Scar top edge', 'the top lip of the Great Scar seen from above: the ground simply ends in a jagged edge and a sheer drop into shadow, seamless left and right', 512, 512),
       ('scar_foot', 'Scar foot', 'the foot of the Great Scar: a scree slope of huge fallen boulders against the base of the cliff, seamless left and right', 512, 512),
       ('scar_crack', 'Scar crack', 'a great crack in the Scar\'s face, red light glowing deep inside it, a little smoke', 512, 512)], cols=3, rows=2, tail=GRID)
# ── a world beyond the edge, and each realm's skyline ──
BD = [(1, 'rolling green hills going on for ever, a far castle on a hill, birch woods'), (2, 'endless misty marsh, far bell-towers, a silver river winding away'),
      (3, 'great grey mountain ranges with snow, a far waterfall'), (4, 'a black volcanic plain, far smoking peaks, the red glow of Muspelheim on the horizon'), (5, 'the open grey-blue sea with far islands and a sail')]
for q, d in BD:
    nm = REALM[q][0] if q < 5 else 'the sea'
    sheet('wl_far_%d' % q, 'backdrops', 'flat', 'A world beyond the edge — %s (drawn behind the world where the land ends, moving slower than the ground).' % nm,
          [('far_%d' % q, 'Beyond — ' + nm, 'the far horizon of ' + nm + ': ' + d, 1536, 512)], tail=BAND)
SKY = [('fern', 'Fernheim seen from Gildenmark', 'far beyond the meadows, the misty towers and willows of the marsh realm, faint lantern light'),
       ('crag', 'Cragland seen from Fernheim', 'rising beyond the marsh mist, the grey peaks of the mountain realm with snow'),
       ('wall', 'The Ember Wall seen from Cragland', 'beyond the mountains, the long black Ember Wall glowing red along its top, smoke rising'),
       ('musp', 'Muspelheim seen from Cinderheim', 'beyond the ash plain, the great dark volcano of Muspelheim pouring smoke, its forge-light red')]
for k, n, d in SKY:
    sheet('wl_sky_' + k, 'backdrops', 'flat', 'A skyline near the border — ' + n + ' (fades in along the top of the screen near the border).', [('sky_' + k, n, d, 1536, 512)], tail=BAND)
# ── roads, little scenes, forests, water ──
PATH = [('steps', 'Stepping stones', 'a short line of worn flat stepping stones'), ('flowers', 'Flower border', 'a strip of small wildflowers crowding a road edge'),
        ('tufts', 'Grass tufts', 'a few tufts of long grass and a small rock'), ('puddle', 'Puddle', 'a shallow puddle reflecting the sky'),
        ('worn', 'Worn edge', 'a worn road edge with ruts and pebbles'), ('mile', 'Mile-stone', 'a small carved mile-stone with one rune'),
        ('fence', 'Broken fence', 'a short broken wooden fence by a road'), ('cart', 'Cart track', 'two cart ruts with grass between them')]
for s in (1, 2):
    sheet('wl_road_%d' % s, 'roads', 'obj', 'Roads that are drawn — road-edge dressing %d of 2.' % s,
          [('road%d_%s' % (s, k), n, d + (', in the warmer green of the meadows' if s == 1 else ', in the cooler grey of the hills and marsh'), 256, 256) for k, n, d in PATH], cols=4, rows=2, tail=GRID)
VIG = [('lantern', 'Lantern corner', 'a lantern post with a small banner and a bit of fence'), ('waycrystal', 'Waystone ring', 'a ring of small glowing rune-blue crystals round a spot of grass'),
       ('camp', 'Old campsite', 'a cold fire-ring with two logs to sit on and a forgotten pot'), ('wagon', 'Broken wagon', 'a tipped-over cart with a lost wheel and spilled sacks'),
       ('shrine', 'Road shrine', 'a tiny wooden road shrine with a candle and flowers'), ('well', 'Old well', 'a stone well with a bucket and a rope'),
       ('signpost', 'Signpost', 'a wooden signpost with blank arrows, a raven on top'), ('stack', 'Hay and barrels', 'a hay stack with two barrels and a pitchfork')]
for s in (1, 2):
    sheet('wl_vig_%d' % s, 'vignettes', 'obj', 'Little scenes along the road %d of 2.' % s,
          [('vig%d_%s' % (s, k), n, d + (', bright and lived-in' if s == 1 else ', older, mossy and weathered'), 384, 384) for k, n, d in VIG], cols=4, rows=2, tail=GRID)
FOR = [('tall', 'Tall pine', 'a very tall dark-green pine, much taller than a house'), ('mid', 'Pine', 'a medium pine'), ('small', 'Young pine', 'a small young pine'),
       ('dark', 'Dark back pine', 'a tall pine in deep shadow-blue, for the back of a forest'), ('clump', 'Pine clump', 'three pines growing together'), ('fir', 'Fir', 'a broad snowy-tipped fir')]
for s, look in ((1, 'deep green, sunlit edges'), (2, 'cooler blue-green, misty')):
    sheet('wl_forest_%d' % s, 'forest', 'obj', 'Forests with depth %d of 2 — conifers in three sizes, darkest at the back.' % s,
          [('forest%d_%s' % (s, k), n, d + ', ' + look, 384, 640) for k, n, d in FOR], cols=3, rows=2, tail=GRID)
sheet('wl_water5', 'water', 'obj', 'Water that lives — dressing for lakes and marshes.',
      [('wat_lilies', 'Lantern lilies', 'a cluster of lily pads with softly glowing flowers'), ('wat_reeds', 'Reeds', 'a clump of tall reeds and cattails'),
       ('wat_walk', 'Boardwalk', 'a straight stretch of old plank boardwalk on posts'), ('wat_walkc', 'Boardwalk corner', 'a boardwalk turning a corner'),
       ('wat_walkl', 'Boardwalk lantern', 'a boardwalk post with a hanging lantern'), ('wat_glow', 'Mirror glow', 'a soft round glow reflected on dark water, as under a lantern'),
       ('wat_float', 'Floating lantern', 'a small paper lantern floating on the water'), ('wat_logs', 'Stepping logs', 'three logs half-sunk in the water')], cols=4, rows=2, tail=GRID)
# ── the four landmarks again, from Kris's notes ──
LM = [('bram', "Bram's bridge — wider, spanning the whole river", "the great timber-and-stone bridge Bram builds across the Silverrun, its DECK RUNNING FROM THE BOTTOM OF THE PICTURE TO THE TOP, WIDE (wide enough for a horse and rider with room to spare, about a quarter of the picture's width) and LONG enough to span the whole river from bank to bank, with stone abutments sitting on dry land at both ends. ONLY the bridge: no river, no rapids, no rocks and no trees are painted round it (the game's own river shows underneath). Stone piers with carved prows, rails on both sides, rune lanterns on posts, a banner at each end", 1024, 1536),
      ('dunn', "Dunn's iron bridge — wider, spanning the whole chasm", "Dunn's riveted iron bridge across the Cinder Chasm, its DECK RUNNING FROM THE BOTTOM TO THE TOP, WIDE (a horse and rider with room to spare) and LONG enough to span the whole lava chasm, with stone footings on solid ground at both ends. ONLY the bridge: no lava, no rock and no land painted round it. Black iron girders, glowing rune rivets, iron rails, lanterns", 1024, 1536),
      ('vela', "Vela's pass — much wider", "the stone causeway through the Ember Wall with its gate at the middle, running FROM THE LEFT TO THE RIGHT, MUCH WIDER than before (three times as wide: a horse and rider with plenty of room), with steps down at both ends to the ground. ONLY the causeway and its gate, nothing painted round it", 1536, 1024),
      ('mira', "Mira's lift — carrying you and your mount", "Mira's lift up the Great Scar, rising FROM THE RIGHT (the low side) UP TO THE LEFT (the high side), on ITS OWN WITHOUT THE CLIFF (the game draws the cliff): a wide timber platform-cage on four chains, big enough for a hero on a horse, at the bottom right; the chain track running up and leftward; the great wooden wheel and counterweight at the top left on a stone landing. Lanterns along the track", 1536, 1024)]
for k, n, d, w, h in LM:
    sheet('wl_lm3_' + k, 'landmarks', 'obj', 'Landmark, round 138 — ' + n + '.', [('lm3_' + k, n, d, w * 2 // 3, h * 2 // 3)], size='%dx%d' % (w, h))
sheet('wl_lift_cage', 'landmarks', 'obj', "Mira's lift — the cage that carries you (Kris: \"little mini animations for you using mira's lift … your mounts crossing with you\").",
      [('lift_cage_empty', 'Cage, waiting', "Mira's lift cage on its own: a wide timber platform with rails and an iron frame, four chains rising from its corners, a lantern on one post, empty, waiting at the bottom", 384, 384),
       ('lift_cage_up', 'Cage, rising', 'the same cage rising, the chains taut, a little dust falling from it, its lantern swinging', 384, 384),
       ('lift_cage_top', 'Cage, arrived', 'the same cage at the top, its gate swung open onto a stone landing', 384, 384),
       ('lift_wheel', 'The great wheel turning', 'the great wooden lift wheel with its counterweight, turning, chains running over it', 384, 384)], cols=2, rows=2, tail=GRID)
L = ['// ═══════════════════════════════════════════════════════════════════════',
     '// ║ 07zt28-art-r138-world.js — round 138 (generated by tools/world/r138_world.py): the paintings for Kris\'s take-5 picks — set-pieces, cliffs',
     '// ║ and the Great Scar, a world beyond the edge, skylines, roads, little scenes, forests, water — and the four landmarks again from his notes.',
     '// ║   .\\tools\\sprites\\paint.ps1 -List r138_world       .\\tools\\sprites\\paint.ps1 -List r138_landmarks',
     '// ═══════════════════════════════════════════════════════════════════════',
     "(function(){ if(typeof ZSCN==='undefined')return; ZSCN.WAVES[138]='Round 138 — the world revamped (take 5 picks) and the landmarks again';",
     '  ZSCN.SHEETS.push.apply(ZSCN.SHEETS,' + json.dumps(S, ensure_ascii=False) + ');', '})();']
open(os.path.join(R, 'src', 'js', '07zt28-art-r138-world.js'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
lm = [s['id'] for s in S if s['fam'] == 'landmarks']; wl = [s['id'] for s in S if s['fam'] != 'landmarks']
open(os.path.join(R, 'sprites', 'requests', 'r138_world.txt'), 'w').write("# Round 138 — the world revamped, take-5 picks: set-pieces, cliffs + the Great Scar, beyond the edge, skylines, roads, little scenes, forests, water (%d sheets)\n#   .\\tools\\sprites\\paint.ps1 -List r138_world\n" % len(wl) + '\n'.join(wl) + '\n')
open(os.path.join(R, 'sprites', 'requests', 'r138_landmarks.txt'), 'w').write("# Round 138 — the landmarks again from Kris's notes (wider, spanning; Mira's lift and its cage) (%d sheets)\n#   .\\tools\\sprites\\paint.ps1 -List r138_landmarks\n" % len(lm) + '\n'.join(lm) + '\n')
print(len(S), 'sheets', sum(len(s['items']) for s in S), 'pieces;', len(wl), 'world,', len(lm), 'landmarks')
