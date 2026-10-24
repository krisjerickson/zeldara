"""Round 82: the story frames in the game (Kris: "as i develop the videos, lets get the current image panels and text in the game. make sure
there is enough time to read everything"). Until a montage clip is made, each story cut-scene plays its painted frames one by one, a line
under each (src/js/16w-story-frames.js). The frames are packed per cut-scene into one picture — a claude.ai page can only hold so many files:

  assets/story/<scene>.webp     every frame of the cut-scene (both heroes' versions), 1280 x 720 each, 4 to a row
  assets/story/index.json       {scene: {file, cols, rows, w, h, at: {frame id: [col, row]}, src: {frame id: mtime}}}

A sheet is made again only when one of its frames was painted again.     python tools/video/story_atlas.py   [--scene id]
"""
import os, sys, json, argparse
from PIL import Image
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
IN = os.path.join(ROOT, 'sprites', 'incoming'); OUT = os.path.join(ROOT, 'assets', 'story')
ap = argparse.ArgumentParser(); ap.add_argument('--scene'); ap.add_argument('--q', type=int, default=72); a = ap.parse_args()
J = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'storyboards.json'), encoding='utf-8'))
FW, FH, COLS = 1280, 720, 4

def crop169(src):
    im = Image.open(src).convert('RGB'); w, h = im.size; th = round(w * 9 / 16)
    if th < h: top = max(0, min(h - th, round((h - th) * 0.4))); im = im.crop((0, top, w, top + th))
    return im.resize((FW, FH), Image.LANCZOS)

os.makedirs(OUT, exist_ok=True); IX = os.path.join(OUT, 'index.json')
INDEX = json.load(open(IX)) if os.path.isfile(IX) else {}
made = 0
for sc in J['scenes']:
    if a.scene and sc['id'] != a.scene: continue
    ids = [i for b in sc['beats'] for i in b['ids']]
    have = [i for i in ids if os.path.isfile(os.path.join(IN, 'sc_' + i + '.png'))]
    if not have: continue
    src = {i: round(os.path.getmtime(os.path.join(IN, 'sc_' + i + '.png'))) for i in have}
    old = INDEX.get(sc['id']); dst = os.path.join(OUT, sc['id'] + '.webp')
    if old and old.get('src') == src and os.path.isfile(dst): continue
    n = len(have); cols = min(COLS, n); rows = (n + cols - 1) // cols
    sheet = Image.new('RGB', (cols * FW, rows * FH)); at = {}
    for k, i in enumerate(have):
        c, r = k % cols, k // cols; sheet.paste(crop169(os.path.join(IN, 'sc_' + i + '.png')), (c * FW, r * FH)); at[i] = [c, r]
    sheet.save(dst, 'WEBP', quality=a.q, method=4)
    INDEX[sc['id']] = {'file': sc['id'] + '.webp', 'cols': cols, 'rows': rows, 'w': FW, 'h': FH, 'at': at, 'src': src}
    json.dump(INDEX, open(IX, 'w'), indent=0)      # kept as it goes (a long run can be stopped and started again)
    made += 1; print('%-11s %2d of %2d frames  %5d KB' % (sc['id'], n, len(ids), os.path.getsize(dst) // 1024))
json.dump(INDEX, open(IX, 'w'), indent=0)
print('%d sheet(s) made -> assets/story' % made)
