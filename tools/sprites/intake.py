#!/usr/bin/env python3
"""Zeldara sprite intake: sprites/incoming/<request id>.png  →  frames + atlases.

    python tools/sprites/intake.py                 every sheet in sprites/incoming/
    python tools/sprites/intake.py hero_m.move.s   only these request ids
    python tools/sprites/intake.py --report        only say what would be done

For each sheet it
  1. removes the background (real alpha if the PNG has it; otherwise the flat colour found in the corners;
     a baked-in checkerboard or scenery is reported and the sheet is skipped),
  2. finds each pose (rows, then columns, by the empty gaps between them; falls back to an even grid),
  3. scales the character so a standing pose is HERO_PX × its size tall, and puts every pose in a same-size
     cell with the feet on one line at the bottom centre,
  4. writes sprites/out/frames/<character>/<anim>_<facing>_<n>.png and a contact sheet per request,
  5. packs atlases (2048 × 2048 pages, Phaser JSON) per group into sprites/out/atlas/.
Frame names in the atlas: <character>/<anim>/<facing>/<n>   e.g. hero_m/walk/s/2, meadow_goblin/melee/s/1

Needs: Python 3.9+, Pillow, numpy.
"""
import json, os, sys, math, glob
from PIL import Image
import numpy as np

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
IN, OUT = os.path.join(ROOT, 'sprites', 'incoming'), os.path.join(ROOT, 'sprites', 'out')
HERO_PX = 112        # height in atlas pixels of a standing 1.0-scale character (2× the planned on-screen size)
MAX_CELL = 512       # no frame is stored larger than this
PAGE = 2048          # atlas page size (safe on phones)
PAD = 2

def load_requests():
    J = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'requests.json'), encoding='utf-8'))
    return {q['id']: q for q in J['requests']}

def cut_background(im):
    """→ (RGBA image, note) or (None, reason)."""
    im = im.convert('RGBA'); a = np.asarray(im).astype(np.int16); h, w = a.shape[:2]
    if (a[..., 3] < 16).mean() > 0.08:
        return im, 'alpha'
    k = max(4, min(h, w) // 64)
    corners = np.concatenate([a[:k, :k, :3].reshape(-1, 3), a[:k, -k:, :3].reshape(-1, 3), a[-k:, :k, :3].reshape(-1, 3), a[-k:, -k:, :3].reshape(-1, 3)])
    if corners.std(axis=0).max() > 14:
        return None, 'background is not one flat colour (checkerboard or scenery) — regenerate with a transparent or flat background'
    key = np.median(corners, axis=0)
    d = np.sqrt(((a[..., :3] - key) ** 2).sum(axis=2))
    alpha = np.clip((d - 38) / 46, 0, 1)                       # soft edge between 38 and 84 colour units from the key
    out = a.copy(); out[..., 3] = (alpha * 255).astype(np.int16)
    # pull the key colour out of half-transparent edge pixels (no coloured fringe)
    edge = (alpha > 0) & (alpha < 1); kc = int(np.argmax(key))
    others = [c for c in range(3) if c != kc]
    lim = np.maximum(out[..., others[0]], out[..., others[1]])
    out[..., kc] = np.where(edge, np.minimum(out[..., kc], lim), out[..., kc])
    return Image.fromarray(out.astype(np.uint8), 'RGBA'), 'keyed #%02x%02x%02x' % tuple(int(v) for v in key)

def bands(profile, want, min_gap):
    """Split a 1-D occupancy profile into `want` runs separated by empty gaps; None if it cannot."""
    on = profile > 0; runs = []; start = None
    for i, v in enumerate(on):
        if v and start is None: start = i
        if not v and start is not None: runs.append([start, i]); start = None
    if start is not None: runs.append([start, len(on)])
    while len(runs) > want:                                   # merge across the smallest gap (detached sparks, weapon tips)
        gaps = [runs[i + 1][0] - runs[i][1] for i in range(len(runs) - 1)]; i = int(np.argmin(gaps))
        runs[i][1] = runs[i + 1][1]; del runs[i + 1]
    return runs if len(runs) == want else None

def find_poses(im, cols, rows, n):
    a = np.asarray(im)[..., 3] > 24; h, w = a.shape; boxes = []
    rb = bands(a.sum(axis=1), rows, 2) or [[int(h * r / rows), int(h * (r + 1) / rows)] for r in range(rows)]
    mode = 'gaps'
    for r, (y0, y1) in enumerate(rb):
        k = min(cols, n - r * cols)
        if k <= 0: break
        cb = bands(a[y0:y1].sum(axis=0), k, 2)
        if cb is None: mode = 'grid'; cb = [[int(w * c / cols), int(w * (c + 1) / cols)] for c in range(k)]
        for (x0, x1) in cb:
            sub = a[y0:y1, x0:x1]; ys = np.where(sub.any(axis=1))[0]; xs = np.where(sub.any(axis=0))[0]
            if len(ys) == 0: boxes.append(None); continue
            boxes.append((x0 + xs[0], y0 + ys[0], x0 + xs[-1] + 1, y0 + ys[-1] + 1))
    return boxes, mode

def process(q, report=False):
    src = os.path.join(IN, q['id'] + '.png'); im, note = cut_background(Image.open(src))
    if im is None: return {'id': q['id'], 'ok': False, 'why': note}
    boxes, mode = find_poses(im, q['cols'], q['rows'], len(q['poses']))
    if len(boxes) != len(q['poses']) or any(b is None for b in boxes):
        return {'id': q['id'], 'ok': False, 'why': 'found %d of %d poses' % (sum(1 for b in boxes if b), len(q['poses']))}
    # scale: the first standing pose sets the character's height
    scale_to = HERO_PX * float(q.get('scale') or 1)
    hs = [b[3] - b[1] for b in boxes]; ref_h = hs[0] if hs[0] > 0 else max(hs)
    s = min(scale_to / ref_h, MAX_CELL / max(max(b[2] - b[0] for b in boxes), max(hs)))
    crops = []
    for b in boxes:
        c = im.crop(b); c = c.resize((max(1, round(c.width * s)), max(1, round(c.height * s))), Image.LANCZOS); crops.append(c)
    cw = max(c.width for c in crops) + PAD * 2; ch = max(c.height for c in crops) + PAD * 2
    frames = []
    for c, pose in zip(crops, q['poses']):
        cell = Image.new('RGBA', (cw, ch), (0, 0, 0, 0)); cell.alpha_composite(c, ((cw - c.width) // 2, ch - PAD - c.height))
        anim, facing, i = pose.split('/'); frames.append(('%s/%s/%s/%s' % (q['char'], anim, facing, i), cell))
    if not report:
        d = os.path.join(OUT, 'frames', q['char']); os.makedirs(d, exist_ok=True)
        for name, cell in frames: cell.save(os.path.join(d, '_'.join(name.split('/')[1:]) + '.png'))
        sheet = Image.new('RGBA', (cw * len(frames), ch), (18, 24, 40, 255))
        for i, (_, cell) in enumerate(frames): sheet.alpha_composite(cell, (i * cw, 0))
        os.makedirs(os.path.join(OUT, 'preview'), exist_ok=True); sheet.save(os.path.join(OUT, 'preview', q['id'] + '.png'))
    return {'id': q['id'], 'ok': True, 'bg': note, 'split': mode, 'cell': [cw, ch], 'frames': frames, 'group': q['group'], 'wave': q.get('cwave', q['wave'])}

def atlas_name(r):
    g = r['group']
    if g in ('hero', 'rider', 'mount', 'vehicle'): return 'heroes' if g == 'hero' else 'mounts'
    if g in ('npc', 'familiar', 'fairy', 'animal'): return 'village' if g == 'npc' else 'companions'
    return ('boss' if g == 'boss' else 'mon') + '-w' + str(r['wave']).replace('.', '_')

def pack(results):
    by = {}
    for r in results:
        if r['ok']: by.setdefault(atlas_name(r), []).extend(r['frames'])
    d = os.path.join(OUT, 'atlas'); os.makedirs(d, exist_ok=True); index = {}
    for name, frames in by.items():
        frames.sort(key=lambda f: -f[1].height); pages = []; page = None; x = y = rowh = 0; meta = None
        def new_page():
            nonlocal page, x, y, rowh, meta
            page = Image.new('RGBA', (PAGE, PAGE), (0, 0, 0, 0)); meta = {}; pages.append((page, meta)); x = y = rowh = 0
        new_page()
        for fname, cell in frames:
            w, h = cell.size
            if x + w > PAGE: x = 0; y += rowh; rowh = 0
            if y + h > PAGE: new_page()
            page.alpha_composite(cell, (x, y)); meta[fname] = {'frame': {'x': x, 'y': y, 'w': w, 'h': h}, 'sourceSize': {'w': w, 'h': h}, 'spriteSourceSize': {'x': 0, 'y': 0, 'w': w, 'h': h}, 'rotated': False, 'trimmed': False, 'anchor': {'x': 0.5, 'y': 1}}
            x += w; rowh = max(rowh, h)
        for i, (pg, m) in enumerate(pages):
            base = '%s-%d' % (name, i); used = max((v['frame']['y'] + v['frame']['h'] for v in m.values()), default=1)
            pg.crop((0, 0, PAGE, min(PAGE, int(math.ceil(used / 64) * 64)))).save(os.path.join(d, base + '.png'), optimize=True)
            json.dump({'frames': m, 'meta': {'image': base + '.png', 'format': 'RGBA8888', 'scale': '1', 'app': 'zeldara intake'}}, open(os.path.join(d, base + '.json'), 'w'))
            index[base] = sorted(set(k.split('/')[0] for k in m))
    json.dump(index, open(os.path.join(d, 'index.json'), 'w'), indent=1)
    return index

def main():
    report = '--report' in sys.argv; want = [a for a in sys.argv[1:] if not a.startswith('--')]
    R = load_requests(); files = sorted(glob.glob(os.path.join(IN, '*.png')))
    ids = [os.path.splitext(os.path.basename(f))[0] for f in files if not f.endswith('.prev.png')]
    results = []
    for i in ids:
        if want and i not in want: continue
        if i not in R: print('?  %s.png is not a request id — skipped' % i); continue
        r = process(R[i], report); results.append(r)
        print(('✓  %-34s %s, split by %s, %d frames, cell %d×%d' % (i, r['bg'], r['split'], len(r['frames']), r['cell'][0], r['cell'][1])) if r['ok'] else ('✗  %-34s %s' % (i, r['why'])))
    if not report and any(r['ok'] for r in results):
        idx = pack(results); print('atlases: ' + ', '.join('%s (%d characters)' % (k, len(v)) for k, v in idx.items()))
    print('%d sheet(s) in, %d ok, %d need a redo' % (len(results), sum(r['ok'] for r in results), sum(not r['ok'] for r in results)))

if __name__ == '__main__':
    main()
