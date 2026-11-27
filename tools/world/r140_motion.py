"""Round 140 (Kris: "since master oswin needs to walk, we need to make sprites for him to be able to show walking … Also the sheep need sprites
that make them move" · "for some other painted images that should be moving, we need to make additional painted images to show them move. one
standing out is the apothecary's cauldron, which should be bubbling" · "both mana and health need to look more interesting … migth need a
painted outline for the bar").
Writes src/js/07zt34-art-r140-motion.js (the cauldron loops and six painted bar frames) and sprites/requests/r140_motion.txt — which also
lists the character sheets made by 07zs (Oswin's walk; the sheep and the lamb as animals).     python tools/world/r140_motion.py
Then: .\\tools\\sprites\\paint.ps1 -List r140_motion"""
import json, os
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
LOOP = ('Animation frames — each ROW is ONE subject shown FOUR times, read left to right, as a 4-frame living loop. Copy the subject EXACTLY '
        'from its picture in the reference sheets: the SAME design, size, colours and place in every frame, the same camera and scale; each '
        'frame alone and centred in its cell on a transparent background. ')
sheets = [{'id': 'sc_mv_cauldron', 'wave': 140, 'fam': 'anim', 'kind': 'obj', 'cols': 4, 'rows': 2, 'size': '1536x1024', 'anim': 1,
           'refs': ['sc_int_4', 'sc_camp_3'],
           'title': LOOP + 'Only the brew, its bubbles, the steam and the fire beneath move; the iron pot and its legs stay perfectly still',
           'seq': [['mv_if_cauldron', 'The apothecary\'s cauldron — bubbling', 'the apothecary\'s cauldron from the reference (a round black iron pot on three short legs, a glowing green-teal brew)', 'base', 40, 44,
                    ['the brew calm, one small bubble rising, a thin curl of steam', 'two bubbles swelling on the surface, the steam rising higher',
                     'a big bubble bursting with a few bright droplets, a puff of steam', 'the surface settling in rings, the steam drifting away thin']],
                   ['mv_cp_cauldron', 'The camp cauldron — bubbling', 'the camp cauldron from the reference (an iron pot hung over a small fire)', 'base', 50, 54,
                    ['the fire low, the stew calm, a wisp of steam', 'the flames rising, two bubbles on the stew', 'the flames tallest, a bubble bursting, a puff of steam',
                     'the flames leaning, the stew settling, the steam thin']]]}]
BARS = [('runestone', 'Carved runestone', 'a long frame of grey carved stone with knotwork bands along its top and bottom edges and a round rune-carved boss at each end'),
        ('iron', 'Gilded iron', 'a frame of dark hammered iron with gold trim and round rivets, the ends shaped like small axe-heads'),
        ('braid', 'Braided gold', 'a frame of twisted braided gold rope, each end finished with a small gold knot-ring'),
        ('oak', 'Oak and leather', 'a frame of carved oak with stitched brown leather wrapping the ends and two little iron studs'),
        ('frost', 'Frost-silver', 'a frame of polished silver filigree rimmed with small frost crystals, cool and bright'),
        ('roots', 'World Tree roots', 'a frame of dark twisted roots and slim branches with a few tiny glowing teal leaves, the roots curling round each end')]
sheets.append({'id': 'sc_bar_frames', 'wave': 140, 'fam': 'icons', 'kind': 'obj', 'cols': 2, 'rows': 3, 'size': '1536x1024', 'refs': ['sc_logo_p01'],
               'title': 'Six painted frames for the health and mana bars — each a long, thin HORIZONTAL frame about 7 : 1, its long inside FULLY TRANSPARENT '
                        '(an empty slot where the coloured bar shows through), on a transparent background.',
               'items': [['bar_' + k, n, 'An ornamental frame for a game\'s health or mana bar: ' + d + '. The frame is long and thin — about seven times as wide as it is '
                          'tall — with an EMPTY, fully transparent inner slot running its whole length (no fill, no colour inside it), and a little round '
                          'empty socket at the LEFT end where an icon will sit. Alone and centred on a transparent background, seen straight on. Hand-painted '
                          'in the game\'s Norse storybook style, crisp edges, soft painterly light. No pixel art. No text, no letters, no numbers.', 420, 60]
                         for k, n, d in BARS]})
js = ('// 07zt34-art-r140-motion.js — round 140: things that should move (made by tools/world/r140_motion.py — edit there): the cauldrons bubbling,\n'
      '// and six painted frames for the health and mana bars.     .\\tools\\sprites\\paint.ps1 -List r140_motion\n'
      '(function(){ if(typeof ZSCN==="undefined")return; ZSCN.WAVES[140]=ZSCN.WAVES[140]||"Round 140"; ZSCN.SHEETS=ZSCN.SHEETS.concat(' +
      json.dumps(sheets, ensure_ascii=False) + '); if(ZSCN.expand)ZSCN.expand(); })();\n')
open(os.path.join(R, 'src', 'js', '07zt34-art-r140-motion.js'), 'w', encoding='utf-8').write(js)
ids = ['npc_guild.walk', 'animal_sheep.core.q', 'animal_lamb.core.q'] + [s['id'] for s in sheets]
open(os.path.join(R, 'sprites', 'requests', 'r140_motion.txt'), 'w', encoding='utf-8').write('\n'.join(ids) + '\n')
print(len(ids), 'requests')
