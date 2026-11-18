"""Round 116: the seasonal paintings in the Lab as they come in (Kris: "load more of the seasons outcomes into the lab as well for me to
review as things come in"). For every seasonal sheet painted so far (sprites/incoming/sc_seas_*.png, 07zt15-art-seasons.js) and the
approved sheet it repaints, a preview for the Lab:
  lab/preview/seasart/<sheet id>.webp     900 px wide
  lab/preview/seasart/index.json          {"sheets": [ids painted], "src": {seasonal id: original id}, "at": time}
python tools/sprites/season_preview.py      (then node build.mjs; Claude publishes the Lab)"""
import os, json, re, time
from PIL import Image
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
IN = os.path.join(ROOT, 'sprites', 'incoming'); OUT = os.path.join(ROOT, 'lab', 'preview', 'seasart'); os.makedirs(OUT, exist_ok=True)
REQ = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'scenery.json'), encoding='utf-8'))['requests']
seas = [q for q in REQ if q['id'].startswith('sc_seas_')]
def prev(i):
    src = os.path.join(IN, i + '.png'); dst = os.path.join(OUT, i + '.webp')
    if not os.path.isfile(src): return False
    if not os.path.isfile(dst) or os.path.getmtime(dst) < os.path.getmtime(src):
        im = Image.open(src).convert('RGBA'); bg = Image.new('RGBA', im.size, (34, 40, 52, 255)); bg.alpha_composite(im)
        w = 900; bg = bg.convert('RGB').resize((w, round(im.size[1] * w / im.size[0])), Image.LANCZOS); bg.save(dst, 'WEBP', quality=72, method=5)
    return True
have, src = [], {}
for q in seas:
    m = re.match(r'^sc_seas_(sp|au|wi)_(.+)$', q['id'])
    if m: src[q['id']] = 'sc_' + m.group(2)
    if prev(q['id']): have.append(q['id'])
for o in sorted(set(src.values())): prev(o)
json.dump({'sheets': have, 'src': src, 'at': time.strftime('%Y-%m-%d %H:%M')}, open(os.path.join(OUT, 'index.json'), 'w'), indent=0)
print('%d of %d seasonal sheets painted -> lab/preview/seasart/' % (len(have), len(seas)))
