"""Round 140 (Kris: "we need painted options for the single Z … options that leverage the axes, and play around with spacing as well as the
visual elements from the 2-word logos … 30 to consider for the single Z logo, and about 10 options for the new/returning player buttons. We
also need to prep for an entirely new title screen with these in there, leveraging current elements and these painted images mixed in").
Writes src/js/07zt31-art-r140-title.js and sprites/requests/r140_title.txt (30 single-Z logos, 10 button sets, 6 title backdrops).
References: sc_ref_title_z (today's drawn single-Z wordmark, the layout to keep), sc_ref_title_btns (today's buttons) and the ✓ round-137
painted logo whose look each option borrows.   python tools/world/r140_title.py"""
import json, os, re
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
src = open(os.path.join(R, 'src', 'js', '07zt27-art-r137.js'), encoding='utf-8').read()
STY = {}
for m in re.finditer(r'\["(logo_p\d+)",\s*"([^"]*)",\s*"(.*?)", 1400', src):
    s = re.search(r'Style: (.*?)(?: A WORDMARK| Wide and)', m.group(3)); STY[m.group(1)] = (m.group(2), (s.group(1) if s else '').replace('\\"', '"'))
# the round-137 looks Kris ✓ (p12 ✗; p03 not picked; p09's twin Zs cannot share one Z) — today's gold too
LOOK = ['p01', 'p02', 'p04', 'p05', 'p06', 'p07', 'p08', 'p10', 'p11', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p20', 'p19', 'gold']
GOLD = ('Today\'s gold', 'polished gold capitals with a dark outline and a warm glow, a braided gold ring round the Z, engraved rules — the look of today\'s title, painted')
FAV = ['p01', 'p02', 'p05', 'p11', 'p17', 'p18', 'p04', 'p07', 'p14', 'p10', 'p16', 'gold']
CORE = ("A WORDMARK LOGO for the game's title, built on ONE single large capital Z shared by both names — keep the layout idea of the first reference "
        "image: \"THE QUESTS OF\" small; one big capital Z; to the right of the Z two lines, \"OLA\" on the upper line and \"OLDOR\" on the lower line, "
        "so the one Z is read as the first letter of both ZOLA and ZOLDOR; a small \"and\" between the two lines. Spell exactly THE QUESTS OF · Z · OLA · "
        "and · OLDOR — nothing else, NEVER a second Z, never the words ZOLA or ZOLDOR written out in full. The Z is the hero, about as tall as the two "
        "lines together; every letter clean and readable.")
LAY = [('Classic', 'Layout: the Z in a round braided ring at the left; OLA and OLDOR stacked close to its right; THE QUESTS OF on a thin rule above OLA.'),
       ('Airy', 'Layout: generous spacing — a tall Z, the two lines set well apart with a wide gap that holds a small "and" between two thin rules; THE QUESTS OF above everything, centred.'),
       ('Tight seal', 'Layout: a compact block like a seal — the Z and the two lines locked tightly together, little space between them.'),
       ('Tall stack', 'Layout: narrower and taller (about 1.6 : 1) — THE QUESTS OF on top, the big Z below it, OLA to its upper right and OLDOR beneath OLA.'),
       ('Long banner', 'Layout: very wide (about 3 : 1) — the Z at the centre-left, OLA and OLDOR running far to the right along two long rules; THE QUESTS OF small along the top rule.'),
       ('Joined strokes', 'Layout: the Z\'s top stroke runs on to the right as the rule under OLA, and its bottom stroke runs on as the rule under OLDOR — both words tied to the one Z.')]
AXE = [('crossed behind', 'Two bearded Norse axes crossed behind the Z, their blades rising either side of it, the hafts ending below in round pommels (as in the first reference).'),
       ('one great axe', 'One great bearded axe standing behind the Z, its haft running along the Z\'s diagonal, the blade above the top stroke.'),
       ('axes as strokes', 'The Z\'s top and bottom strokes are two axe hafts laid flat, each with a small bearded blade at its outer end.'),
       ('supporters', 'Two bearded axes flank the whole wordmark like heraldic supporters, blades outward, a little smaller than the Z.'),
       ('axe base', 'Two axes crossed beneath the wordmark as its base, over a short band of runes.'),
       ('blade frame', 'Two axe blades set back to back form a frame round the Z (like a ring made of two blades).')]
NOAXE = ('no axes', 'No axes — the frame and ornament of the look below only.')
TAIL = ("A WORDMARK LOGO on a fully transparent background: the space inside and between the letters is EMPTY and transparent; no box, plate or sky "
        "behind the whole logo unless the look names one, then cut cleanly with transparency outside it. Centred, with a little transparent margin "
        "all round. Hand-painted in the game's Norse storybook style, rich colour, soft painterly light. No pixel art.")
sheets = []
looks = LOOK + FAV
for i in range(30):
    lk = looks[i]; nm, st = GOLD if lk == 'gold' else STY['logo_' + lk]
    st = st.replace('the Z of ZOLA and the Z of ZOLDOR', 'the Z').replace('beneath the "and"', 'beneath the "and"')
    lay = LAY[i % 6]; ax = NOAXE if i in (9, 19, 29) else AXE[(i + i // 6) % 6]
    wid = {'Tall stack': 1.6, 'Long banner': 3.0}.get(lay[0], 2.2)
    refs = ['sc_ref_title_z'] + ([] if lk == 'gold' else ['sc_logo_' + lk])
    p = CORE + ' ' + lay[1] + ' Axes: ' + ax[1] + ' The look' + (' (the second reference image shows it on the two-name logo — borrow its look only, not its words)' if lk != 'gold' else '') + ': ' + st + ' ' + TAIL
    sheets.append({'id': 'sc_logoz_%02d' % (i + 1), 'wave': 140, 'fam': 'logo', 'kind': 'obj', 'cols': 1, 'rows': 1, 'size': '1536x1024', 'refs': refs,
                   'title': 'Single-Z logo %d of 30 — %s · %s · axes: %s.' % (i + 1, nm, lay[0], ax[0]),
                   'items': [['logoz_%02d' % (i + 1), '%s · %s · %s' % (nm, lay[0], ax[0]), p, 1400, int(1400 / wid)]]})
BTN = [('Gilded runestone', 'a long grey runestone slab with gilded carved letters, knotwork at the ends', 'p01'), ('Carved oak and iron', 'a thick carved oak plank with iron bands and rivets, letters burned and gilded', 'p04'),
       ('Forged iron', 'hammered black iron with glowing ember seams, letters in bright hot gold', 'p03'), ('Aurora glass', 'a glass bar lit from inside by green and violet aurora light, crisp silver rim', 'p05'),
       ('Woven band', 'a woven tablet-weave band in deep red and gold, letters stitched in gold', 'p06'), ('Frost-silver', 'a polished silver plate rimmed with frost crystals, letters in cold blue-white', 'p07'),
       ('World Tree bough', 'a dark wood bough with tiny glowing leaves and roots curling at both ends, letters in soft gold', 'p11'), ('Illuminated scroll', 'a short parchment scroll with gold-leaf capitals outlined in lapis blue', 'p02'),
       ('Ember and ash', 'a slab of dark basalt cracked with lava light, letters glowing ember gold', 'p17'), ('Rune-knot teal', 'today\'s look painted: a dark plate in a teal knotwork frame with small diamond studs at the corners, letters in warm gold', None)]
BT = ("Title-screen menu buttons for a fantasy game, four pieces on one sheet in a 2 × 2 grid, each a wide button about 4 : 1, each cut out cleanly on a "
      "fully transparent background, same size and style: top-left the button with the words NEW PLAYER; top-right the same button with the words "
      "RETURNING PLAYER; bottom-left the same button EMPTY (no words, for the game to write on); bottom-right the empty button lit up as if hovered "
      "(a brighter rim and a soft glow). Spell exactly NEW PLAYER and RETURNING PLAYER, in bold clear capitals, nothing else. Look: ")
for i, (nm, look, ref) in enumerate(BTN):
    refs = ['sc_ref_title_btns'] + (['sc_logo_' + ref] if ref else [])
    p = BT + look + ('. Borrow the look of the second reference image (only its look, not its words).' if ref else '.') + " Hand-painted in the game's Norse storybook style, rich colour, soft painterly light. No pixel art."
    sheets.append({'id': 'sc_btn_%02d' % (i + 1), 'wave': 140, 'fam': 'icons', 'kind': 'icon', 'cols': 2, 'rows': 2, 'size': '1536x1024', 'refs': refs,
                   'title': 'Title buttons %d of 10 — %s.' % (i + 1, nm),
                   'items': [['btn_%02d_new' % (i + 1), nm + ' — NEW PLAYER', p, 640, 160], ['btn_%02d_ret' % (i + 1), nm + ' — RETURNING PLAYER', p, 640, 160],
                             ['btn_%02d_plate' % (i + 1), nm + ' — empty', p, 640, 160], ['btn_%02d_lit' % (i + 1), nm + ' — empty, lit', p, 640, 160]]})
BG = [('Mirror Lake under the aurora', 'Mirror Lake at night under green and violet aurora; under the still water the World Tree glows faintly, its roots of light reaching down; dark pines and far mountains round the lake'),
      ('The World Tree over the fjord', 'a vast glowing World Tree of soft teal light rising over a dark fjord at night, its branches spreading across the sky like the aurora, stars between them'),
      ('Mirrowby at dusk', 'the village of Mirrowby seen from the hill above at dusk: warm lit windows, chimney smoke, the Runestone glowing on the Green, Mirror Lake beyond'),
      ('The four realms from the heights', 'from a high cliff at dawn, the four realms laid out below — green Gildenmark, misty Fernheim, grey Cragland peaks, and the ember glow of Cinderheim on the horizon'),
      ('The runestone circle', 'a ring of tall runestones on a hilltop at night, their runes glowing teal, the aurora above and the land falling away below'),
      ('The longship at dawn', 'a Norse longship with a striped sail on a calm fjord at first light, mist on the water, the sun just rising between the mountains')]
for i, (nm, d) in enumerate(BG):
    sheets.append({'id': 'sc_title_bg_%d' % (i + 1), 'wave': 140, 'fam': 'backdrops', 'kind': 'flat', 'cols': 1, 'rows': 1, 'size': '1536x1024', 'refs': [],
                   'title': 'Title-screen backdrop %d of 6 — %s.' % (i + 1, nm),
                   'items': [['title_bg_%d' % (i + 1), nm, 'A title-screen backdrop for a fantasy game: ' + d + '. Calm and dark in the middle and lower third so a logo and two buttons sit clearly on top of it; the eye drawn to the centre; no people, no animals. Wide landscape composition, rich deep colour, glowing rune-blue magic and warm light, soft painterly shading, in the game\'s hand-painted Norse storybook style. No pixel art. No text, no letters, no numbers.', 1536, 1024]]})
js = ('// 07zt31-art-r140-title.js — round 140: the title, painted (made by tools/world/r140_title.py — edit there): 30 single-Z logos, 10 button sets, 6 backdrops.\n'
      '//   .\\tools\\sprites\\paint.ps1 -List r140_title   (needs sprites/incoming/sc_ref_title_z.png and sc_ref_title_btns.png — today\'s drawn logo and buttons)\n'
      '(function(){ if(typeof ZSCN==="undefined")return; ZSCN.WAVES[140]=ZSCN.WAVES[140]||"Round 140"; ZSCN.SHEETS=ZSCN.SHEETS.concat(' + json.dumps(sheets, ensure_ascii=False) + '); })();\n')
open(os.path.join(R, 'src', 'js', '07zt31-art-r140-title.js'), 'w', encoding='utf-8').write(js)
open(os.path.join(R, 'sprites', 'requests', 'r140_title.txt'), 'w').write('# Round 140 — the title, painted: 30 single-Z logos, 10 button sets, 6 backdrops (46 sheets)\n#   .\\tools\\sprites\\paint.ps1 -List r140_title\n' + '\n'.join(s['id'] for s in sheets) + '\n')
json.dump([[s['id'], s['title'], s['items'][0][1]] for s in sheets], open(os.path.join(R, 'tools', 'world', 'r140_title.json'), 'w'), ensure_ascii=False)
print(len(sheets), 'sheets')
