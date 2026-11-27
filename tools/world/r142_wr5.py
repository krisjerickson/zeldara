"""Round 142 — world revamp take 5, Kris's notes on the landmarks (Lab "World look 5"):
  · Vela's pass: "i'm confused about how you would move across this thing. let's remake once more" and "we need to make the bridge much wider"
  · Bram's bridge: "doesn't span the full river … doesn't look wide enough for it to show you going across it"
  · Dunn's bridge: "we might need to make the bridge wider though and make sure it spans across all the lava"
  · Mira's lift: "the rock barrier that you can't pass now needs to be updated to look better, so you realize it's a massive cliff. Propose painted
    images that we can use for the cliff barriers. We also probably need to create little mini animations for you using mira's lift" (✓ lift_ride:
    6 frames each for Zoldor and Zola, on foot and mounted).
Writes src/js/07zt38-art-r142-wr5.js and sprites/requests/r142_wr5.txt.     python tools/world/r142_wr5.py
Then: .\\tools\\sprites\\paint.ps1 -List r142_wr5"""
import json, os
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
STY = ("Alone and centred on a transparent background, in the game's classic top-down three-quarter view, standing on the ground with a soft shadow. "
       "Painted in the game's hand-painted Norse storybook style — deep colour, glowing rune-blue magic, warm lantern light, soft painterly shading. "
       "No pixel art. No text, no letters, no numbers.")
CELL = ("Each item alone in its own cell of the grid, well apart, on a transparent background, in the game's classic top-down three-quarter view with a "
        "soft shadow. Painted in the game's hand-painted Norse storybook style. No pixel art. No text, no letters, no numbers.")
S = []
S.append({'id': 'sc_wl_lm4_vela', 'wave': 142, 'fam': 'landmarks', 'kind': 'obj', 'cols': 1, 'rows': 1, 'size': '1536x1024', 'refs': ['sc_wl_lm3_vela', 'sc_wl_landmarks_1'],
          'title': "Landmark, round 142 — Vela's pass, a clear road through the Ember Wall.",
          'items': [['lm4_vela', "Vela's pass — a clear road through", "Vela's pass through the Ember Wall, made OBVIOUS TO WALK: a broad flat paved stone ROAD running straight FROM THE LEFT EDGE TO "
                     "THE RIGHT EDGE of the picture (the road surface itself plainly visible, light worn flagstones with a carved runner down its middle, as wide as "
                     "a third of the picture's height — a horse and rider with room to spare), passing under a great open stone gate-arch in the middle; low parapet "
                     "walls on both sides of the road; gentle ramps down to the ground at both ends. The wall itself is only two short stubs either side of the gate. "
                     "ONLY the road, the gate and the parapets, nothing painted round them. " + STY, 1024, 682]]})
S.append({'id': 'sc_wl_lm4_bram', 'wave': 142, 'fam': 'landmarks', 'kind': 'obj', 'cols': 1, 'rows': 1, 'size': '1024x1536', 'refs': ['sc_wl_lm3_bram', 'sc_wl_landmarks_1'],
          'title': "Landmark, round 142 — Bram's bridge, wider and longer.",
          'items': [['lm4_bram', "Bram's bridge — wider and longer", "Bram's timber-and-stone bridge with its DECK RUNNING FROM THE VERY BOTTOM OF THE PICTURE TO THE VERY TOP, "
                     "TWICE AS WIDE as before (a third of the picture's width — the plank deck plainly a road you walk on), LONG, with broad stone landings "
                     "(abutments) at both ends that sit on dry land. ONLY the bridge: no river, no rapids, no rocks, no trees. Stone piers, rails both sides, "
                     "rune lanterns on posts, a banner at each end. " + STY, 682, 1024]]})
S.append({'id': 'sc_wl_lm4_dunn', 'wave': 142, 'fam': 'landmarks', 'kind': 'obj', 'cols': 1, 'rows': 1, 'size': '1024x1536', 'refs': ['sc_wl_lm3_dunn', 'sc_wl_landmarks_1'],
          'title': "Landmark, round 142 — Dunn's iron bridge, wider and longer.",
          'items': [['lm4_dunn', "Dunn's iron bridge — wider and longer", "Dunn's riveted iron bridge with its DECK RUNNING FROM THE VERY BOTTOM OF THE PICTURE TO THE VERY TOP, "
                     "TWICE AS WIDE as before (a third of the picture's width, iron plates plainly a road), LONG, with broad stone footings at both ends on solid "
                     "ground. ONLY the bridge: no lava, no rock, no land. Black iron girders, glowing rune rivets, iron rails, lanterns. " + STY, 682, 1024]]})
CL = [('cliff_wall', 'Cliff face, long', 'a long sheer cliff face of grey stone seen from the low side, very tall, running from left to right, strata, cracks, '
       'moss and hanging roots, a few stones fallen at its foot — unmistakably a massive wall of rock no one could climb', 512, 320),
      ('cliff_wall_b', 'Cliff face, long (second)', 'the same sheer cliff face, a different stretch: a deep crack, a ledge with a twisted pine, a thin waterfall', 512, 320),
      ('cliff_corner', 'Cliff corner', 'the cliff turning a corner, a tall prow of rock', 300, 320),
      ('cliff_end', 'Cliff end', 'the cliff ending, stepping down in great broken blocks into a scree slope', 320, 260),
      ('cliff_top', 'Cliff top edge', 'the top edge of the cliff seen from the high side: grass running to a ragged rim of rock and a sheer drop beyond, small stones', 512, 160),
      ('cliff_scree', 'Scree at the foot', 'a spill of fallen rocks and boulders at the foot of a cliff', 260, 140)]
S.append({'id': 'sc_wl_cliffs', 'wave': 142, 'fam': 'edges', 'kind': 'obj', 'cols': 3, 'rows': 2, 'size': '1536x1024', 'refs': ['sc_wl_landmarks_1'],
          'title': "The Great Scar's cliffs (Kris: \"so you realize it's a massive cliff\") — pieces the game lines along the Scar.",
          'items': [[i, n, d + '. ' + CELL, w, h] for i, n, d, w, h in CL]})
RIDE = [('1', 'the cage waiting at the bottom with its gate open, the rider stepping in'), ('2', 'the gate swung shut, the rider holding the rail, the chains tightening'),
        ('3', 'the cage lifting off the ground, chains taut, the rider looking up'), ('4', 'the cage high on its chains, swaying a little, the rider looking out over the drop'),
        ('5', 'the cage arriving at the top landing, the gate opening'), ('6', 'the rider stepping out of the open cage onto the landing')]
WHO = [('m', 'Zoldor', 'hero_m.model', None), ('f', 'Zola', 'hero_f.model', None),
       ('m_horse', 'Zoldor on his horse', 'hero_m.model', 'ride_m_horse.ride'), ('f_horse', 'Zola on her horse', 'hero_f.model', 'ride_f_horse.ride')]
for k, name, ref, mref in WHO:
    refs = ['sc_wl_lift_cage', ref] + ([mref] if mref else [])
    S.append({'id': 'sc_lift_ride_%s' % k, 'wave': 142, 'fam': 'anim', 'kind': 'obj', 'cols': 3, 'rows': 2, 'size': '1536x1024', 'refs': refs,
              'title': "Mira's lift — %s riding it, six frames (left to right, top to bottom)." % name,
              'items': [['lift_%s_%s' % (k, n), 'Lift ride %s — %s' % (n, name),
                         "Mira's lift cage exactly as in the reference (a wide timber platform with rails and an iron frame, four chains rising from its corners, a "
                         "lantern on a post) carrying %s (exactly as in the hero reference%s): %s. Frame %s of six; the cage the same size and in the same place in "
                         "every frame. %s" % (name, ', the horse as in the riding reference' if mref else '', d, n, CELL), 384, 384] for n, d in RIDE]})
js = ('// 07zt38-art-r142-wr5.js — round 142: Vela\'s pass a clear road, Bram\'s and Dunn\'s bridges wider, the Scar\'s cliffs, and riding Mira\'s lift '
      '(made by tools/world/r142_wr5.py — edit there).\n//   .\\tools\\sprites\\paint.ps1 -List r142_wr5\n'
      '(function(){ if(typeof ZSCN==="undefined")return; ZSCN.WAVES[142]=ZSCN.WAVES[142]||"Round 142"; ZSCN.SHEETS=ZSCN.SHEETS.concat(' +
      json.dumps(S, ensure_ascii=False) + '); if(ZSCN.expand)ZSCN.expand(); })();\n')
open(os.path.join(R, 'src', 'js', '07zt38-art-r142-wr5.js'), 'w', encoding='utf-8').write(js)
open(os.path.join(R, 'sprites', 'requests', 'r142_wr5.txt'), 'w', encoding='utf-8').write('\n'.join(s['id'] for s in S) + '\n')
print(len(S), 'sheets')
