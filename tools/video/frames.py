"""Round 73b (Kris: "we have few enough videos we don't need to use an api, i can hand place the requests"): the first frames for the
cut-scene clips, ready to drop into a video app — every clip's painted panel (assets/scenery/rooms/<id>.webp, 3:2) cropped to 16:9
(the middle, a little above centre, where the faces usually are) → sprites/video_frames/<id>.png, plus <id>.txt with the words to paste.
A frame already there is kept. Clips whose panel is not painted yet are listed.
  python tools/video/frames.py            [--wave N]"""
import os, sys, json, argparse
from PIL import Image
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
ap = argparse.ArgumentParser(); ap.add_argument('--wave', type=int); a = ap.parse_args()
REQ = os.path.join(ROOT, 'sprites', 'requests', 'video.json')
if not os.path.isfile(REQ): sys.exit('No sprites/requests/video.json - run  node build.mjs  first.')
C = json.load(open(REQ, encoding='utf-8'))['clips']
if a.wave: C = [c for c in C if c['wave'] == a.wave]
OUT = os.path.join(ROOT, 'sprites', 'video_frames'); os.makedirs(OUT, exist_ok=True); made = have = 0; wait = []
for c in C:
    src = os.path.join(ROOT, c['frame']); dst = os.path.join(OUT, c['id'] + '.png')
    if not os.path.isfile(src): wait.append(c['id']); continue
    with open(os.path.join(OUT, c['id'] + '.txt'), 'w', encoding='utf-8') as f:
        f.write('CLIP  %s   (wave %d)\nPLAYS %s\nSAVE AS  %s.mp4\n\nPROMPT\n%s\n\nNEGATIVE PROMPT (if the app has the box)\n%s\n' % (c['id'], c['wave'], c.get('where', ''), c['id'], c['request'], c.get('neg', '')))
    if os.path.isfile(dst): have += 1; continue
    im = Image.open(src).convert('RGB'); w, h = im.size; th = round(w * 9 / 16)
    if th < h: top = max(0, min(h - th, round((h - th) * 0.4))); im = im.crop((0, top, w, top + th))
    im.save(dst); made += 1; print('  +  %s.png' % c['id'])
print('\n%d new frame(s), %d already there  ->  %s' % (made, have, OUT))
if wait: print('Not painted yet (round 78): ' + ', '.join(wait))
