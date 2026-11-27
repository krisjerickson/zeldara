"""Round 140c (Kris ✓ in the Lab: the crypt of echoes grows as a long hall, and its door grows with it — "After your ✓: the paintings (the hall at
each stage, the echo-statues, the plaques) as one request list, then the hall itself").
The hall as a room you walk in, at its five stages (the room backdrops), and one sheet of its pieces (the medal plaques, the realm banners, an
empty alcove, the far door shut and open). The echo-statues need no painting: each is the guardian's own painted figure, drawn as a still,
glowing pale-blue echo in its alcove (in code).
Writes src/js/07zt36-art-r141-crypt.js and sprites/requests/r141_crypt.txt.     python tools/world/r141_crypt.py
Then: .\\tools\\sprites\\paint.ps1 -List r141_crypt"""
import json, os
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
HALL = ("the crypt of echoes as a ROOM the hero walks in, seen from above in the game's top-down three-quarter view like the game's other rooms: a long "
        "vaulted stone hall running from the stair at the bottom of the picture to a great far door at the top; stone alcoves along both side walls "
        "(empty alcoves are dark; an alcove that holds an echo is lit); rune-lanterns between the alcoves; the floor of worn flagstones with a carved "
        "knotwork runner down the middle, clear and walkable")
STAGE = [('0', 'cold and quiet: only the first bay, one torch by the stair, every alcove dark and empty, dust and cold blue shadow, the far door shut and dark'),
         ('1', 'the first bay lit: braziers burning warm, four alcoves glowing, a green-gold banner hanging over the bay, the rest of the hall still dark'),
         ('2', 'the hall a bay longer, then two: twelve alcoves glowing, three banners (green-gold, deep green, grey-blue), small plaques shining under the lit alcoves'),
         ('3', 'the hall long, its newest bay glowing like a forge with iron and ember light, sixteen alcoves lit, five banners (adding ember-red and iron-grey)'),
         ('4', 'the hall full: every alcove lit, every realm banner hanging, gold light everywhere, the great far door standing open and pouring gold light')]
STYLE = ("Painted in the game's hand-painted Norse storybook style, the same look as the reference pictures of the crypt — deep colour, glowing rune-blue "
         "magic, warm lantern and brazier light, soft painterly shading. The alcoves are EMPTY of figures (the game puts the echoes in them). No people, "
         "no text, no letters, no numbers. No pixel art.")
REFS = ['sc_crypt_hall_full', 'sc_crypt_hall_grow', 'sc_e134_crypt_hall']
sheets = [{'id': 'sc_crypt_room_%s' % k, 'wave': 141, 'fam': 'engage', 'kind': 'room', 'cols': 1, 'rows': 1, 'size': '1536x1024', 'refs': REFS,
           'title': 'The crypt of echoes, inside — stage %s of 4.' % k,
           'items': [['crypt_room_%s' % k, 'The crypt of echoes, stage %s' % k, 'a wide painting: ' + HALL + '. At this stage: ' + d + '. ' + STYLE, 1536, 1024]]}
          for k, d in STAGE]
PIECES = [('crypt_plaque_bronze', 'Bronze plaque', 'a small bronze plaque with a carved rune border and a blank face, two rivets', 40, 22),
          ('crypt_plaque_silver', 'Silver plaque', 'the same plaque in polished silver', 40, 22),
          ('crypt_plaque_gold', 'Gold plaque', 'the same plaque in bright gold with a tiny gem at the top', 40, 22),
          ('crypt_alcove', 'Empty alcove', 'an empty arched stone alcove in a wall, dark inside, a carved rune-ring above it, seen straight on', 70, 110),
          ('crypt_alcove_lit', 'Lit alcove', 'the same arched stone alcove with soft pale-blue light glowing inside it and the rune-ring above it lit', 70, 110),
          ('crypt_far_door', 'The far door, shut', 'a great arched double door of dark oak bound with iron and carved knotwork, shut, its runes dark', 120, 150),
          ('crypt_far_door_open', 'The far door, open', 'the same great double door standing open, warm gold light pouring out of it', 120, 150),
          ('crypt_brazier', 'Crypt brazier', 'a tall iron brazier on three legs with a warm fire, the kind that stands between the alcoves', 30, 56)]
sheets.append({'id': 'sc_crypt_pieces', 'wave': 141, 'fam': 'engage', 'kind': 'obj', 'cols': 4, 'rows': 2, 'size': '1536x1024', 'refs': REFS,
               'title': 'The crypt of echoes — its pieces, each alone and centred on a transparent background, straight on, in the same look as the crypt pictures.',
               'items': [[i, n, d + '. Alone and centred on a transparent background, hand-painted in the game\'s Norse storybook style, no text, no letters, no pixel art.', w, h] for i, n, d, w, h in PIECES]})
js = ('// 07zt36-art-r141-crypt.js — round 140c: the crypt of echoes as a hall to walk in, at its five stages, and its pieces (made by tools/world/r141_crypt.py — edit there).\n'
      '//   .\\tools\\sprites\\paint.ps1 -List r141_crypt\n'
      '(function(){ if(typeof ZSCN==="undefined")return; ZSCN.WAVES[141]=ZSCN.WAVES[141]||"Round 141"; ZSCN.SHEETS=ZSCN.SHEETS.concat(' +
      json.dumps(sheets, ensure_ascii=False) + '); })();\n')
open(os.path.join(R, 'src', 'js', '07zt36-art-r141-crypt.js'), 'w', encoding='utf-8').write(js)
open(os.path.join(R, 'sprites', 'requests', 'r141_crypt.txt'), 'w', encoding='utf-8').write('\n'.join(s['id'] for s in sheets) + '\n')
print(len(sheets), 'sheets')
