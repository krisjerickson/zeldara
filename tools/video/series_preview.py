"""Round 112: the shot series in the Lab (Kris: "turn each current image into a series of 3-10 different images ... we'll do these requests
and then update the lab"). From the painted shots (sprites/incoming/sc_ss_<scene>_<nn>_<k>[_m|_f].png, ZSS in src/js/07zt9b-shot-series.js)
it makes, per series and hero:

  lab/preview/series/<scene>_<nn>_<who>.webp   a strip of its shots in order, each cropped to 16:9 (640 x 360), for the Lab's animatic
  lab/preview/series/index.json                which shots each strip holds (the Lab reads it at build time as ZSS_SHEETS)

Round 112d: only the shots a series keeps are in its strip, in order (index.json 'n' = positions).
<who> is "zeldor" / "zeldara" (a shot with no hero in it is used in both) or "all" for a series with no hero shot.
The shots stay out of the game's files until the game plays them.   python tools/video/series_preview.py   (after node build.mjs)
"""
import os, json, re
from PIL import Image
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
IN = os.path.join(ROOT, 'sprites', 'incoming'); PREV = os.path.join(ROOT, 'lab', 'preview', 'series')
TW, TH = 640, 360
REQ = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'scenery.json'), encoding='utf-8'))['requests']

def crop169(src):
    im = Image.open(src).convert('RGB'); w, h = im.size; th = round(w * 9 / 16)
    if th < h: top = max(0, min(h - th, round((h - th) * 0.4))); im = im.crop((0, top, w, top + th))
    return im.resize((TW, TH), Image.LANCZOS)

series = {}
for q in REQ:
    m = re.match(r'^sc_ss_(.+)_(\d\d)_(\d+)(_m|_f)?$', q['id'])
    if not m: continue
    series.setdefault((m.group(1), m.group(2)), []).append((int(m.group(3)), m.group(4) or '', q['id']))
os.makedirs(PREV, exist_ok=True); IX = os.path.join(PREV, 'index.json'); index = json.load(open(IX)) if os.path.isfile(IX) else {}
made = 0
for (sc, nn), L in sorted(series.items()):
    L.sort(); hero = any(s for _, s, _ in L)
    for who in (['zeldor', 'zeldara'] if hero else ['all']):
        k = '_f' if who == 'zeldara' else '_m'; shots = []
        for i, suf, sid in L:
            if suf and suf != k: continue
            src = os.path.join(IN, sid + '.png'); shots.append((i, src if os.path.exists(src) else None))
        have = [j + 1 for j, (i, s) in enumerate(shots) if s]      # round 112d: positions in the strip (a trimmed series keeps its shots' old numbers)
        key = '%s_%s_%s' % (sc, nn, who); out = os.path.join(PREV, key + '.webp')
        if not have: index.pop(key, None); continue
        strip = Image.new('RGB', (TW * len(shots), TH), (5, 7, 11))
        for j, (i, s) in enumerate(shots):
            if s: strip.paste(crop169(s), (j * TW, 0))
        strip.save(out, quality=80, method=4); index[key] = {'n': have, 'count': len(shots), 'tw': TW, 'th': TH}; made += 1
        print('  %-24s %d of %d shots' % (key, len(have), len(shots)))
json.dump(index, open(IX, 'w'), indent=1)
print('%d strip(s) made -> lab/preview/series/ (rebuild the Lab: node build.mjs)' % made)
