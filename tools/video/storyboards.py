"""Round 79: the story cut-scenes' pictures, ready for the video app (doc 35; Kris: "We'll then feed all of these into the video generator
to make a multi image cut scene"). From the painted frames (sprites/incoming/sc_sb_<scene>_<nn>[_m|_f].png) it makes, per cut-scene:

  sprites/storyboards/<scene>/<who>/<nn>.png    the frames in order, cropped to 16:9 (the full width, the band 40% down the spare height)
  sprites/storyboards/<scene>/<who>/montage.txt the words for the app: the cut-scene, the montage instruction, every shot with its picture,
                                                what happens and its line, the negative prompt
  lab/preview/storyboards/<scene>_<who>.webp    a contact sheet of the frames for the Lab (Story cut-scenes)

<who> is "zeldor" and "zeldara" for a cut-scene with the twin you play in it (each its own montage), "all" for one without.
The frames stay out of the game's files; only the montage clips go in (tools/video/intake_video.py --montage).
A frame already made is kept unless its picture was painted again.   python tools/video/storyboards.py   [--scene id]
"""
import os, sys, json, argparse
from PIL import Image, ImageDraw
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
IN = os.path.join(ROOT, 'sprites', 'incoming'); OUT = os.path.join(ROOT, 'sprites', 'storyboards'); PREV = os.path.join(ROOT, 'lab', 'preview', 'storyboards')
ap = argparse.ArgumentParser(); ap.add_argument('--scene'); a = ap.parse_args()
J = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'storyboards.json'), encoding='utf-8'))
SECS = 5      # about how long each mini scene runs
TW, TH = 640, 360      # a frame on the Lab's sheet (round 79b: big enough to look at)

def crop169(src):
    im = Image.open(src).convert('RGB'); w, h = im.size; th = round(w * 9 / 16)
    if th < h: top = max(0, min(h - th, round((h - th) * 0.4))); im = im.crop((0, top, w, top + th))
    return im

def montage_text(sc, who, beats):
    k = 'f' if who == 'zeldara' else 'm'; n = len(beats)
    L = ['CUT-SCENE  %s  (%s%s)' % (sc['name'], sc['id'], '' if who == 'all' else ', you play ' + who.capitalize()),
         'PLAYS  ' + sc['plays'], '', 'STORY', sc['story'], '',
         'VIDEO (paste this as the prompt, with the %d pictures attached in order)' % n,
         'One continuous montage of %d mini scenes, 16:9, about %d seconds in all. Each attached picture, in order, is the first frame of its own mini scene of about %d seconds; '
         'each mini scene moves gently from its picture (a slow camera move; cloth, hair, mist, fire and light moving; magic glowing and flowing), then a soft quick cut or cross-fade into the next. '
         'Keep every painting\'s style, colours and light exactly; the characters keep the same faces, clothes and proportions from shot to shot. No text, no captions, no logos.' % (n, n * SECS, SECS), '',
         'SHOTS']
    for i, b in enumerate(beats):
        L.append('%2d. %02d.png  %s — %s.   Line under it: %s' % (i + 1, b['n'], b['title'], b[k].rstrip('.'), b['cap']))
    L += ['', 'NEGATIVE PROMPT (if the app has the box)', J['neg'], '',
          'If the app cannot take all %d pictures at once: make each shot as its own clip from its picture (about %d s, the shot\'s words as the prompt) and save them as %s_%s_<nn>.mp4 — the intake joins them into one montage.' % (n, SECS, sc['id'], who)]
    return '\n'.join(L) + '\n'

def contact(sc, frames):
    n = len(frames); cols = 4 if n > 9 else 3; rows = (n + cols - 1) // cols; tw, th = TW, TH
    sheet = Image.new('RGB', (cols * tw, rows * th), (5, 7, 11)); d = ImageDraw.Draw(sheet)
    for i, (num, path) in enumerate(frames):
        x, y = (i % cols) * tw, (i // cols) * th
        if path: sheet.paste(crop169(path).resize((tw - 4, th - 4), Image.LANCZOS), (x + 2, y + 2))
        else: d.rectangle([x + 6, y + 6, x + tw - 7, y + th - 7], outline=(40, 70, 90))
        d.rectangle([x + 2, y + 2, x + 30, y + 22], fill=(5, 8, 14)); d.text((x + 9, y + 6), str(num), fill=(111, 227, 245))
    return sheet

os.makedirs(PREV, exist_ok=True); made = have = 0; report = []
IX = os.path.join(PREV, 'index.json'); INDEX = json.load(open(IX)) if os.path.isfile(IX) else {}
for sc in J['scenes']:
    if a.scene and sc['id'] != a.scene: continue
    versions = any(len(b['ids']) > 1 for b in sc['beats'])
    for who in (['zeldor', 'zeldara'] if versions else ['all']):
        k = 'f' if who == 'zeldara' else 'm'; d = os.path.join(OUT, sc['id'], who); frames = []; got = 0
        for b in sc['beats']:
            pid = b['ids'][1] if (len(b['ids']) > 1 and k == 'f') else b['ids'][0]; src = os.path.join(IN, 'sc_' + pid + '.png')
            if not os.path.isfile(src): frames.append((b['n'], None)); continue
            got += 1; frames.append((b['n'], src)); os.makedirs(d, exist_ok=True); dst = os.path.join(d, '%02d.png' % b['n'])
            if os.path.isfile(dst) and os.path.getmtime(dst) >= os.path.getmtime(src): have += 1; continue
            crop169(src).save(dst); made += 1
        if got:
            open(os.path.join(d, 'montage.txt'), 'w', encoding='utf-8').write((sc.get('montage') or {}).get(who) or montage_text(sc, who, sc['beats']))
            key = '%s_%s' % (sc['id'], who); src_mt = max(os.path.getmtime(p) for _, p in frames if p); sp = os.path.join(PREV, key + '.webp')
            if not (os.path.isfile(sp) and INDEX.get(key, {}).get('n') == [x for x, p in frames if p] and os.path.getmtime(sp) >= src_mt):
                contact(sc, frames).save(sp, 'WEBP', quality=80)
            INDEX[key] = {'n': [x for x, p in frames if p], 'cols': 4 if len(frames) > 9 else 3, 'tw': TW, 'th': TH}
            json.dump(INDEX, open(IX, 'w'), indent=0)      # kept as it goes (a long run can be stopped and started again)
        report.append('%-11s %-8s %2d of %2d frames%s' % (sc['id'], who, got, len(sc['beats']), '  ✓ ready' if got == len(sc['beats']) else ''))
json.dump(INDEX, open(IX, 'w'), indent=0)      # which frames each Lab sheet holds (build.mjs puts it in the Lab)
print('\n'.join(report))
ready = sum(1 for r in report if 'ready' in r)
print('\n%d new frame(s), %d already made; %d of %d montages ready  ->  %s' % (made, have, ready, len(report), OUT))
