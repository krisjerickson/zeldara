#!/usr/bin/env python3
"""Zeldara sprite intake: sprites/incoming/<request id>.png  →  frames + atlases.

    python tools/sprites/intake.py                 every new or changed sheet in sprites/incoming/
    python tools/sprites/intake.py hero_m.move.s   only these request ids
    python tools/sprites/intake.py --force         cut everything again
    python tools/sprites/intake.py --limit=40      at most 40 sheets this run
    python tools/sprites/intake.py --atlas         also pack the game atlases from everything cut so far
    python tools/sprites/intake.py --report        only say what would be done

For each sheet it
  1. removes the background (real alpha if the PNG has it; otherwise the flat colour found in the corners;
     a baked-in checkerboard or scenery is reported and the sheet is skipped),
  2. finds each pose (rows, then columns, by the empty gaps between them; falls back to an even grid),
  3. scales the character so a standing pose is HERO_PX × its size tall, and puts every pose in a same-size
     cell with the feet on one line at the bottom centre,
  4. writes sprites/out/frames/<character>/<anim>_<facing>_<n>.png and a strip of the cut frames per sheet,
  5. packs those strips into preview pages per wave for the Design Lab (sprites/preview/w<wave>-<n>.webp + index.json),
  6. with --atlas: packs the game atlases (2048 × 2048 pages, Phaser JSON) per group into sprites/out/atlas/.
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

def valley_cuts(profile, k, lo, hi):
    """k-1 cut positions between lo and hi: near each even boundary, the column (or row) with the least ink."""
    step = (hi - lo) / k; cuts = [lo]
    for j in range(1, k):
        c = lo + j * step; a = int(max(cuts[-1] + step * 0.35, c - step * 0.3)); b = int(min(hi - 1, c + step * 0.3))
        if b <= a: cuts.append(int(c)); continue
        seg = profile[a:b + 1]; m = seg.min(); cand = np.where(seg <= m + 0.5)[0] + a
        cuts.append(int(cand[np.argmin(np.abs(cand - c))]))
    cuts.append(hi); return [[cuts[t], cuts[t + 1]] for t in range(k)]

def drop_edge_slivers(sub):
    """Blank small bits of a neighbour's swing or glow that were left at the left / right edge of a cell."""
    col = sub.sum(axis=0); on = col > 0; runs = []; start = None
    for i, v in enumerate(on):
        if v and start is None: start = i
        if not v and start is not None: runs.append((start, i)); start = None
    if start is not None: runs.append((start, len(on)))
    if len(runs) < 2: return sub
    total = float(col.sum()); out = sub.copy()
    for (a, b) in runs:
        if (a == 0 or b == len(on)) and col[a:b].sum() < 0.05 * total: out[:, a:b] = False
    return out

def find_poses(im, cols, rows, n):
    """→ (boxes, mode, masks). Poses are found by the empty gaps between them; where poses touch, the cut goes through
    the thinnest point near the even grid line ('valley') instead of straight down the grid line."""
    a = np.asarray(im)[..., 3] > 24; h, w = a.shape; boxes = []; masks = []; mode = 'gaps'
    ys = np.where(a.any(axis=1))[0]; xs = np.where(a.any(axis=0))[0]
    if len(ys) == 0: return [None] * n, 'empty', []
    rb = bands(a.sum(axis=1), rows, 2)
    if rb is None: mode = 'valley'; rb = valley_cuts(a.sum(axis=1), rows, int(ys[0]), int(ys[-1]) + 1)
    for r, (y0, y1) in enumerate(rb):
        k = min(cols, n - r * cols)
        if k <= 0: break
        band = a[y0:y1]; prof = band.sum(axis=0); cb = bands(prof, k, 2); cut = False
        if cb is None:
            mode = 'valley'; cut = True; bx = np.where(band.any(axis=0))[0]
            if len(bx) == 0: boxes.extend([None] * k); masks.extend([None] * k); continue
            cb = valley_cuts(prof, k, int(bx[0]), int(bx[-1]) + 1)
        for (x0, x1) in cb:
            sub = a[y0:y1, x0:x1]
            if cut: sub = drop_edge_slivers(sub)
            yy = np.where(sub.any(axis=1))[0]; xx = np.where(sub.any(axis=0))[0]
            if len(yy) == 0: boxes.append(None); masks.append(None); continue
            boxes.append((x0 + xx[0], y0 + yy[0], x0 + xx[-1] + 1, y0 + yy[-1] + 1))
            masks.append(sub[yy[0]:yy[-1] + 1, xx[0]:xx[-1] + 1] if cut else None)
    return boxes, mode, masks

def process(q, report=False):
    src = os.path.join(IN, q['id'] + '.png'); im, note = cut_background(Image.open(src))
    if im is None: return {'id': q['id'], 'ok': False, 'why': note}
    boxes, mode, masks = find_poses(im, q['cols'], q['rows'], len(q['poses']))
    if len(boxes) != len(q['poses']) or any(b is None for b in boxes):
        return {'id': q['id'], 'ok': False, 'why': 'found %d of %d poses' % (sum(1 for b in boxes if b), len(q['poses']))}
    # scale: the first standing pose sets the character's height
    scale_to = HERO_PX * float(q.get('scale') or 1)
    hs = [b[3] - b[1] for b in boxes]; ref_h = hs[0] if hs[0] > 0 else max(hs)
    s = min(scale_to / ref_h, MAX_CELL / max(max(b[2] - b[0] for b in boxes), max(hs)))
    crops = []
    for k, b in enumerate(boxes):
        c = im.crop(b); sk = s
        if masks[k] is not None:                             # cut through touching poses: keep only this pose's own pixels
            arr = np.asarray(c).copy(); arr[..., 3] = np.where(masks[k], arr[..., 3], 0); c = Image.fromarray(arr, 'RGBA')
        if q.get('multi'):                                   # a sheet of different characters: each is sized on its own
            sk = min(HERO_PX * float(q['scales'][k]) / max(1, c.height), MAX_CELL / max(c.width, c.height))
        c = c.resize((max(1, round(c.width * sk)), max(1, round(c.height * sk))), Image.LANCZOS); crops.append(c)
    cw = max(c.width for c in crops) + PAD * 2; ch = max(c.height for c in crops) + PAD * 2
    frames = []
    for c, pose in zip(crops, q['poses']):
        cell = Image.new('RGBA', (cw, ch), (0, 0, 0, 0)); cell.alpha_composite(c, ((cw - c.width) // 2, ch - PAD - c.height))
        who = q['char']
        if pose.startswith('@'): who, pose = pose[1:].split('|', 1)
        anim, facing, i = pose.split('/'); frames.append(('%s/%s/%s/%s' % (who, anim, facing, i), cell))
    wave = q.get('cwave', q['wave'])
    if not report:
        for name, cell in frames:
            d = os.path.join(OUT, 'frames', name.split('/')[0]); os.makedirs(d, exist_ok=True); cell.save(os.path.join(d, '_'.join(name.split('/')[1:]) + '.png'))
        # the cut frames in one strip, at most 132 px tall (what the Design Lab shows), kept per sheet so preview pages can be rebuilt
        strip = Image.new('RGBA', (cw * len(frames), ch), (0, 0, 0, 0))
        for i, (_, cell) in enumerate(frames): strip.alpha_composite(cell, (i * cw, 0))
        pk = min(1.0, 132.0 / ch); pcw, pch = max(1, round(cw * pk)), max(1, round(ch * pk))
        sd = os.path.join(OUT, 'strips'); os.makedirs(sd, exist_ok=True)
        strip.resize((pcw * len(frames), pch), Image.LANCZOS).save(os.path.join(sd, q['id'] + '.png'))
        json.dump({'id': q['id'], 'cell': [pcw, pch], 'full': [cw, ch], 'n': len(frames), 'names': [f[0] for f in frames], 'bg': note, 'split': mode, 'group': q['group'], 'wave': wave,
                   'src_mtime': os.path.getmtime(src)}, open(os.path.join(sd, q['id'] + '.json'), 'w'))
    return {'id': q['id'], 'ok': True, 'bg': note, 'split': mode, 'cell': [cw, ch], 'frames': frames, 'group': q['group'], 'wave': wave}

def preview_pages(waves=None):
    """sprites/preview/w<wave>-<n>.webp + index.json: every sheet's frame strip packed into pages per wave (committed; the Lab loads them)."""
    sd = os.path.join(OUT, 'strips'); pv = os.path.join(ROOT, 'sprites', 'preview'); os.makedirs(pv, exist_ok=True)
    idx_file = os.path.join(pv, 'index.json'); index = json.load(open(idx_file)) if os.path.exists(idx_file) else {}
    metas = [json.load(open(f)) for f in sorted(glob.glob(os.path.join(sd, '*.json')))]
    by = {}
    for m in metas: by.setdefault(str(m['wave']).replace('.', '_'), []).append(m)
    W = 2048
    for wv, L in by.items():
        if waves is not None and wv not in waves: continue
        L.sort(key=lambda m: m['id']); pages = []; page = None; x = y = rowh = 0
        for m in L:
            st = Image.open(os.path.join(sd, m['id'] + '.png')); w, h = st.size
            if w > W: st = st.crop((0, 0, W, h)); w = W
            if page is None or x + w > W:
                if page is not None: y += rowh
                x = 0; rowh = 0
                if page is None or y + h > 2048: page = Image.new('RGBA', (W, 2048), (0, 0, 0, 0)); pages.append([page, 0]); y = 0
            page.alpha_composite(st, (x, y)); index[m['id']] = {'page': 'w%s-%d' % (wv, len(pages) - 1), 'x': x, 'y': y, 'cell': m['cell'], 'n': m['n']}
            x += w; rowh = max(rowh, h); pages[-1][1] = max(pages[-1][1], y + h)
        for i, (pg, used) in enumerate(pages): pg.crop((0, 0, W, max(1, used))).save(os.path.join(pv, 'w%s-%d.webp' % (wv, i)), 'WEBP', quality=86)
    json.dump(index, open(idx_file, 'w'), separators=(',', ':'), sort_keys=True)
    return index

def atlas_name(r):
    g = r['group']
    if g in ('hero', 'rider', 'mount', 'vehicle'): return 'heroes' if g == 'hero' else 'mounts'
    if g in ('npc', 'familiar', 'fairy', 'animal'): return 'village' if g == 'npc' else 'companions'
    return ('boss' if g == 'boss' else 'mon') + '-w' + str(r['wave']).replace('.', '_')

def pack():
    """Atlases from every frame cut so far (sprites/out/frames + the per-sheet notes in sprites/out/strips)."""
    by = {}
    for f in sorted(glob.glob(os.path.join(OUT, 'strips', '*.json'))):
        m = json.load(open(f))
        for name in m['names']:
            fp = os.path.join(OUT, 'frames', name.split('/')[0], '_'.join(name.split('/')[1:]) + '.png')
            if os.path.exists(fp): by.setdefault(atlas_name(m), []).append((name, Image.open(fp).convert('RGBA')))
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
    report = '--report' in sys.argv; force = '--force' in sys.argv; want = [a for a in sys.argv[1:] if not a.startswith('--')]
    limit = next((int(a.split('=')[1]) for a in sys.argv if a.startswith('--limit=')), 10 ** 9)
    R = load_requests(); files = sorted(glob.glob(os.path.join(IN, '*.png')))
    ids = [os.path.splitext(os.path.basename(f))[0] for f in files if not f.endswith('.prev.png')]
    results = []; skipped = 0; waves = set()
    for i in ids:
        if want and i not in want: continue
        if i not in R: print('?  %s.png is not a request id — skipped' % i); continue
        mf = os.path.join(OUT, 'strips', i + '.json')                 # already cut and the sheet has not changed since → skip
        if not force and not report and os.path.exists(mf) and abs(json.load(open(mf)).get('src_mtime', 0) - os.path.getmtime(os.path.join(IN, i + '.png'))) < 1: skipped += 1; continue
        if len(results) >= limit: break
        r = process(R[i], report); results.append(r)
        if r['ok']: waves.add(str(r['wave']).replace('.', '_'))
        print(('✓  %-34s %s, split by %s, %d frames, cell %d×%d' % (i, r['bg'], r['split'], len(r['frames']), r['cell'][0], r['cell'][1])) if r['ok'] else ('✗  %-34s %s' % (i, r['why'])), flush=True)
    if not report and waves: preview_pages(waves); print('preview pages updated for wave(s): ' + ', '.join(sorted(waves)))
    if '--atlas' in sys.argv: idx = pack(); print('atlases: ' + ', '.join('%s (%d characters)' % (k, len(v)) for k, v in idx.items()))
    print('%d sheet(s) cut, %d ok, %d need a redo, %d unchanged' % (len(results), sum(r['ok'] for r in results), sum(not r['ok'] for r in results), skipped))

if __name__ == '__main__':
    main()
