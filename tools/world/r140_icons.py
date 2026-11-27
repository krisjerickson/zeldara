"""Round 140 (Kris: "I'm still seeing lots of pixel art in things like pop-ups, including for the festival … make sure no pixel art or emojis
are used, and request any painted images as needed"). Every emoji the game's pop-ups still show that has no painted icon gets one:
icon ids em_<codepoints>, five to a row, 25 to a sheet (wave 140). Writes src/js/07zt30-art-r140-icons.js and sprites/requests/r140_icons.txt.
python tools/world/r140_icons.py"""
import json, os, unicodedata
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
UN = json.load(open(os.path.join(R, 'tools', 'world', 'r140_emoji_unmapped.json'), encoding='utf-8'))
STYLE = ", in the game's hand-painted Norse storybook style, warm light, clean silhouette, centred"
OWN = {'💀': 'a cracked bone-white runestone with a dark rune for a fallen hero (no skull)', '😈': 'a small horned red trickster mask carved of wood',
  '👹': 'a horned troll mask of red-painted wood', '👺': 'a long-nosed red goblin mask', '🧟': 'a grey shambling draugr head with glowing eyes',
  '🤖': 'a small clockwork brass automaton head with rune eyes', '🏴‍☠️': 'a black raider sail with a white rune', '✈️': 'a small wooden sky-ship with a canvas sail and a balloon',
  '📈': 'three notched tally sticks rising in height', '🎥': 'a small wooden story-reel frame', '🎞': 'a strip of painted story panels', '🎬': 'a skald\'s clapper of two wooden boards',
  '💡': 'a small glowing teal rune lantern', '🔦': 'a hand lantern throwing a beam', '🛢️': 'a tarred oak barrel', '🔧': 'a smith\'s iron wrench-tongs',
  '🧰': 'a small iron-bound tool chest', '🚧': 'a wooden barrier of crossed poles with a red rag', '🤺': 'a hero lunging with a sword and round shield',
  '👤': 'a plain silhouette of a person in a hooded cloak', '🧑': 'a villager\'s head and shoulders in a wool hood', '🚶': 'a cloaked traveller walking with a staff',
  '💪': 'a strong arm with a leather bracer', '👆': 'a hand pointing up', '🙏': 'two hands pressed together', '✊': 'a raised fist in a leather glove',
  '❗': 'a bold red rune mark meaning "look here"', '🔀': 'two crossing paths with arrows', '🔁': 'two curved arrows in a circle, carved in bronze',
  '↩️': 'a curved bronze arrow turning back', '🎈': 'a round festival balloon of dyed linen on a string', '🎪': 'a striped festival tent', '🎭': 'two carved theatre masks, happy and sad',
  '🎳': 'three small wooden pins and a ball (Tumbler Pia\'s pins)', '🥇': 'a gold medal with a rune on a ribbon', '🏅': 'a bronze medallion on a ribbon',
  '🏁': 'a chequered finish banner on a pole', '🏷️': 'a small paper price tag on a string', '🔎': 'a brass magnifying lens', '🗑': 'a wooden bin', '🎣': 'a fishing rod with a line',
  '🍳': 'an iron pan over a small fire', '🏝': 'a small island with two pines', '🏔️': 'a snow-capped mountain', '🏔': 'a snow-capped mountain', '⛰': 'a rocky mountain',
  '🛣': 'a stone road winding into the distance', '🛤️': 'a plank track through the hills', '🌅': 'a sun rising over a fjord', '🌄': 'a sunrise over mountains', '🌞': 'a smiling sun',
  '☀': 'a bright sun', '☀️': 'a bright sun', '🌗': 'a half moon', '☁️': 'a soft cloud', '🌫': 'a bank of mist', '🌬': 'a gust of wind with swirls',
  '⛓': 'a short length of black iron chain (small, three links)', '🚪': 'a rune-carved wooden door in a stone arch', '⛏': 'a miner\'s iron pick', '📯': 'a curved horn of a herald',
  '💣': 'a black powder pot with a burning fuse', '🎀': 'a ribbon bow of dyed wool', '💤': 'three soft "z" curls of sleep made of mist (no letters)', '✉': 'a folded letter with a wax rune seal',
  '🕯': 'a beeswax candle in an iron holder', '🕯️': 'a beeswax candle in an iron holder', '🪞': 'a round bronze hand mirror', '☄': 'a falling star with a fiery tail', '✂': 'a pair of iron shears',
  '🔹': 'a small blue gem chip', '🏺': 'a clay amphora', '🧠': 'a glowing rune of wisdom on a stone', '🌾': 'a sheaf of barley', '🎼': 'a lyre with notes of light',
  '🍂': 'two fallen autumn leaves', '🧚': 'a tiny glowing fairy with wings of light', '🪜': 'a wooden ladder', '🧂': 'a small salt crock', '👾': 'a small purple sky imp',
  '🪺': 'a bird\'s nest with eggs', '👝': 'a small leather coin pouch', '🪑': 'a carved wooden chair', '🪢': 'a coiled rope knot', '💘': 'a heart pierced by an arrow',
  '🪁': 'a fabric kite', '🥀': 'a wilted rose', '🫐': 'a cluster of bilberries', '🏮': 'a red paper lantern', '💜': 'a violet heart', '💛': 'a golden heart', '🪕': 'a small lute',
  '🫙': 'a glass jar with a cork', '🪏': 'a digging spade', '🕳': 'a dark hole in the ground', '🛏': 'a wooden bed with a wool blanket', '🌳': 'a broad green tree',
  '📣': 'a herald\'s brass horn', '🕸': 'a spider web', '🕸️': 'a spider web', '🪰': 'a buzzing fly'}
def desc(e):
    if e in OWN: return OWN[e]
    try: n = ' '.join(unicodedata.name(c).lower() for c in e if unicodedata.category(c) != 'Mn' and c not in '‍️')
    except ValueError: n = 'symbol'
    return 'a small ' + n
def eid(e): return 'em_' + '_'.join('%x' % ord(c) for c in e if c not in '️‍')
items, seen = [], set()
for e, n in UN:      # ☀ and ☀️ are one icon (the variation selector is dropped from the id)
    if eid(e) in seen: continue
    seen.add(eid(e)); items.append([eid(e), (OWN.get(e) or desc(e))[:40], desc(e) + STYLE, 48, 48])
sheets = []
for i in range(0, len(items), 25):
    sheets.append({'id': 'sc_ic_r140_%d' % (i // 25 + 1), 'wave': 140, 'fam': 'icons', 'kind': 'icon', 'cols': 5, 'rows': 5, 'size': '1024x1024', 'refs': ['sc_ic_ui_1'],
        'title': 'Pop-up icons, painted (round 140, %d of %d)' % (i // 25 + 1, (len(items) + 24) // 25), 'items': items[i:i + 25]})
NO = " Each icon alone, no text, no letters, no numbers, no pixel art, no emoji look."
for s in sheets: s['title'] += NO
js = ('// 07zt30-art-r140-icons.js — round 140: every emoji left in the pop-ups, painted (made by tools/world/r140_icons.py — edit there).\n'
      '// ids em_<codepoints>; 27z4-emoji.js swaps an emoji for its painted icon as soon as the sheet is in.   .\\tools\\sprites\\paint.ps1 -List r140_icons\n'
      '(function(){ if(typeof ZSCN==="undefined")return; ZSCN.WAVES[140]="Round 140 — the pop-ups\' last emojis, painted";\n'
      '  ZSCN.SHEETS=ZSCN.SHEETS.concat(' + json.dumps(sheets, ensure_ascii=False) + '); })();\n')
open(os.path.join(R, 'src', 'js', '07zt30-art-r140-icons.js'), 'w', encoding='utf-8').write(js)
open(os.path.join(R, 'sprites', 'requests', 'r140_icons.txt'), 'w').write('\n'.join(s['id'] for s in sheets) + '\n')
print(len(items), 'icons on', len(sheets), 'sheets')
