"""Round 140 (Kris: "i don't see the proposal for what the crypt should look like and how it grows").
The three ways the crypt of echoes could grow, painted so they can be seen and chosen: for each way the crypt full (after the end), and a
five-panel strip of how it grows (0 · 1-4 · 5-12 · 13-16 · the end); and one sheet of the door on the Green at six stages.
Writes src/js/07zt33-art-r140-crypt.js and sprites/requests/r140_crypt.txt.     python tools/world/r140_crypt.py
Then: .\\tools\\sprites\\paint.ps1 -List r140_crypt"""
import json, os
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
STYLE = ("Painted in the game's hand-painted Norse storybook style — deep colour, glowing rune-blue magic, warm lantern and brazier light, soft "
         "painterly shading, the same look as the reference images (today's crypt door and crypt hall). No pixel art. No text, no letters, no numbers, "
         "no writing anywhere (carved lines are shown as plain rune-like grooves). No children. The echoes are ghostly pale-blue statues of beasts and "
         "warriors standing still — echoes of guardians already beaten, calm, not frightening.")
WAYS = [
    ('hall', 'A long hall that grows',
     "a long vaulted stone hall under the village, reached by a short stair from the Green: stone alcoves along both walls, each holding a ghostly "
     "blue echo-statue of a beaten guardian; the hall is divided into bays, each bay with its own realm banner hanging from the vault (green-gold "
     "Gildenmark, deep-green Fernheim, grey-blue Cragland, ember-red Cinderheim, iron forges, dark-gold Surtharn and Solmyrk); a small bronze, silver "
     "or gold plaque under each statue; rune-lanterns between the alcoves; at the far end a great door glowing with warm gold light",
     ["just the stair and one cold bay: a single torch, one empty dark alcove, cold blue shadow, dust",
      "the first bay lit: braziers burning, four echo-statues in their alcoves, one green-gold banner",
      "the hall a bay longer, then two: more statues, two more banners, small plaques shining under the statues",
      "a new bay glowing like a forge: iron and ember light, red-gold banners, the hall now long",
      "the hall full and long: every alcove holds its echo, every banner hangs, the far door open and pouring gold light"]),
    ('round', 'A round chamber of alcoves',
     "a domed round chamber under the village, reached by a short stair: twenty tall alcoves round the circular wall, each holding a ghostly blue "
     "echo-statue; a ring of carved runes round the base of the dome glowing rune-blue; a round stone floor with a carved knot at its centre; "
     "opposite the stair a far door in the wall glowing gold",
     ["the round room dark: twenty empty alcoves in shadow, one torch by the stair, the rune-ring unlit, the far door dark",
      "four alcoves lit with their echoes, a quarter of the rune-ring glowing",
      "twelve alcoves lit, more than half the rune-ring glowing, small plaques under the statues",
      "sixteen alcoves lit, the newest with an ember-red forge glow, the rune-ring nearly full",
      "all twenty alcoves lit, the whole rune-ring blazing blue, the far door open in gold light"]),
    ('deep', 'A stair that goes deeper',
     "a great stone stair spiralling down a deep round shaft under the village, seen from above at an angle so the levels show: each realm is a "
     "landing further down, ringed with alcoves holding ghostly blue echo-statues and that realm's banner (green-gold Gildenmark at the top, then "
     "deep-green Fernheim, grey-blue Cragland, ember-red Cinderheim and the forges, dark-gold Surtharn and Solmyrk at the very bottom); lanterns on "
     "the stair; at the bottom a far door glowing gold",
     ["only the top landing, cold: the stair goes down into darkness, one torch, an empty alcove",
      "the first landing lit with four echoes and its green-gold banner; below it still dark",
      "three landings lit going down, more echoes and banners, the shaft deepening",
      "the forge-glow landing far down, ember-red light rising up the shaft",
      "every landing lit to the very bottom, the gold door open at the foot of the shaft"])]
STAGES = ['0', '1–4', '5–12', '13–16', 'the end']
REFS = ['sc_e134_crypt_hall', 'sc_e134_crypt_door']
sheets = []
for k, nm, look, st in WAYS:
    sheets.append({'id': 'sc_crypt_%s_full' % k, 'wave': 140, 'fam': 'backdrops', 'kind': 'flat', 'cols': 1, 'rows': 1, 'size': '1536x1024', 'refs': REFS,
                   'title': 'The crypt of echoes — %s: full, after the end.' % nm,
                   'items': [['crypt_%s_full' % k, nm + ' — full', 'A wide painting, seen in the game\'s top-down three-quarter view from the stair: ' + look +
                              '. This is the crypt full, after the end: ' + st[4] + '. ' + STYLE, 1536, 1024]]})
    strip = ' '.join('Panel %d (%s guardians beaten): %s.' % (i + 1, STAGES[i], s) for i, s in enumerate(st))
    sheets.append({'id': 'sc_crypt_%s_grow' % k, 'wave': 140, 'fam': 'backdrops', 'kind': 'flat', 'cols': 1, 'rows': 1, 'size': '1536x1024', 'refs': REFS,
                   'title': 'The crypt of echoes — %s: how it grows, five stages.' % nm,
                   'items': [['crypt_%s_grow' % k, nm + ' — how it grows', 'A concept sheet of FIVE equal panels side by side in one row, each a small '
                              'painting of the SAME place from the SAME camera, showing how it grows as the hero beats guardians — the place: ' + look +
                              '. ' + strip + ' Thin dark gaps between the five panels. ' + STYLE, 1536, 1024]]})
DOOR = ["the door as today: a low arched stone doorway in a small grassy mound, the iron-bound door shut, the runes unlit, a little moss",
        "the runes round the arch glowing soft blue, the door ajar with cool light inside, one small banner on a pole beside it",
        "the mound a little larger, two lanterns on posts either side, a few flagstones leading to the door",
        "a carved stone lintel with an ember-red glow in the runes, a brazier at each side, a second banner",
        "a stately entrance: a wide stone arch with carved knotwork, the door open in warm gold light, banners of every realm, flowers round the foot",
        "the same stately entrance at night: the arch's runes and the open door glowing, lanterns lit, stars above"]
sheets.append({'id': 'sc_crypt_door_grow', 'wave': 140, 'fam': 'engage', 'kind': 'obj', 'cols': 3, 'rows': 2, 'size': '1536x1024', 'refs': ['sc_e134_crypt_door'],
               'title': 'The crypt door on the Green as it grows — six stages.',
               'items': [['crypt_door_s%d' % (i + 1), 'The crypt door — stage %d' % (i + 1), 'The crypt of echoes\' door on the village Green: ' + d +
                          '. Alone and centred on a transparent background, in the game\'s classic top-down three-quarter view, standing on the ground '
                          'with a soft shadow. ' + STYLE, 300, 260] for i, d in enumerate(DOOR)]})
js = ('// 07zt33-art-r140-crypt.js — round 140: the crypt of echoes, the three ways it could grow, painted (made by tools/world/r140_crypt.py — edit there).\n'
      '//   .\\tools\\sprites\\paint.ps1 -List r140_crypt   (refs: sc_e134_crypt_hall, sc_e134_crypt_door — today\'s crypt)\n'
      '(function(){ if(typeof ZSCN==="undefined")return; ZSCN.WAVES[140]=ZSCN.WAVES[140]||"Round 140"; ZSCN.SHEETS=ZSCN.SHEETS.concat(' +
      json.dumps(sheets, ensure_ascii=False) + '); })();\n')
open(os.path.join(R, 'src', 'js', '07zt33-art-r140-crypt.js'), 'w', encoding='utf-8').write(js)
open(os.path.join(R, 'sprites', 'requests', 'r140_crypt.txt'), 'w', encoding='utf-8').write('\n'.join(s['id'] for s in sheets) + '\n')
print(len(sheets), 'sheets')
