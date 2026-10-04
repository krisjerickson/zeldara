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
  6. with --atlas: packs the game atlases (2048-wide WebP pages + index.json) into assets/atlas/.
Frame names in the atlas: <character>/<anim>/<facing>/<n>   e.g. hero_m/walk/s/2, meadow_goblin/melee/s/1
Preview pages are written into the atlas only for the waves touched; atlases are rebuilt whole.

Needs: Python 3.9+, Pillow, numpy.
"""
import hashlib, time, json, os, sys, math, glob
from PIL import Image
import numpy as np

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
IN, OUT = os.path.join(ROOT, 'sprites', 'incoming'), os.path.join(ROOT, 'sprites', 'out')
HERO_PX = 112        # height in atlas pixels of a standing 1.0-scale character (2× the planned on-screen size)
MAX_CELL = 512       # no frame is stored larger than this
PAGE = 2048          # atlas page size (safe on phones)
PAD = 2
PACK_V = 2           # raise to pack every atlas again
INTAKE_V = 3         # raise when the cutting or sizing rules change: every sheet is then cut again on the next run
# Sheets whose first pose is a standing pose are sized by it. Other sheets (a charge, a burrow, a death …) start with a
# crouched, sunk or stretched pose, so they take the size of the character's standing sheet instead.
STANDING = {'idle', 'still', 'float', 'model', 'ride_side', 'melee_sword', 'melee_axe', 'ranged_bow', 'ranged_xbow', 'magic_staff', 'war_stomp', 'blink', 'phantom', 'drink', 'talk', 'work', 'model_a', 'model_b', 'model_c'}
REF_FILE = os.path.join(OUT, 'scale_ref.json')
def first_anim(q): p = q['poses'][0]; p = p.split('|', 1)[1] if p.startswith('@') else p; return p.split('/')[0]
def load_refs(): return json.load(open(REF_FILE)) if os.path.exists(REF_FILE) else {}

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

def process(q, report=False, refs=None):
    refs = refs if refs is not None else {}
    src = os.path.join(IN, q['id'] + '.png'); im, note = cut_background(Image.open(src))
    if im is None: return {'id': q['id'], 'ok': False, 'why': note}
    boxes, mode, masks = find_poses(im, q['cols'], q['rows'], len(q['poses']))
    if len(boxes) != len(q['poses']) or any(b is None for b in boxes):
        return {'id': q['id'], 'ok': False, 'why': 'found %d of %d poses' % (sum(1 for b in boxes if b), len(q['poses']))}
    # scale: the first standing pose sets the character's height
    scale_to = HERO_PX * float(q.get('scale') or 1)
    hs = [b[3] - b[1] for b in boxes]; ref_h = hs[0] if hs[0] > 0 else max(hs)
    s = scale_to / ref_h; cell_h = im.height / float(q['rows']); sized = 'own first pose'; a0 = first_anim(q)
    mount = 'mt_' + q['char'].split('_', 2)[2] if q['group'] == 'rider' and q['char'].count('_') >= 2 else None
    if mount and mount in refs:                                   # a hero on a mount: the mount keeps the size it has on its own
        r = refs[mount]; s = r['s'] * r['cell_h'] / cell_h; sized = 'as ' + r['from']
    elif a0 in STANDING or q.get('multi'):
        if a0 in ('idle', 'still', 'float', 'ride_side') and not q.get('legacy'): refs[q['char']] = {'s': s, 'cell_h': cell_h, 'from': q['id']}
        elif a0 in ('idle',) and q['char'] not in refs: refs[q['char']] = {'s': s, 'cell_h': cell_h, 'from': q['id']}
    elif q['char'] in refs:
        r = refs[q['char']]; s = r['s'] * r['cell_h'] / cell_h; sized = 'as ' + r['from']
    else: sized = 'own first pose (no standing sheet yet)'
    s = min(s, MAX_CELL / max(max(b[2] - b[0] for b in boxes), max(hs)))
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
        json.dump({'id': q['id'], 'cell': [pcw, pch], 'full': [cw, ch], 'n': len(frames), 'names': [f[0] for f in frames], 'bg': note, 'split': mode, 'sized': sized, 'v': INTAKE_V, 'group': q['group'], 'wave': wave,
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

def pack(budget=140):
    """Game atlases from every frame cut so far → assets/atlas/<name>-<n>.webp + index.json (committed; the game loads them).
    Frames are trimmed to their ink and packed character by character, so the game only loads the pages a character is on.
    index.json: pages {name: [w, h]}, chars {id: {h0: standing height in atlas px, pages: [...]}},
                frames {"char/anim/facing/n": [page, x, y, w, h, cellW, cellH, offX, offY]}  (feet = bottom centre of the cell)"""
    R = load_requests(); done = set(os.path.splitext(os.path.basename(f))[0] for f in glob.glob(os.path.join(OUT, 'strips', '*.json')))
    by = {}; chars = {}
    for f in sorted(glob.glob(os.path.join(OUT, 'strips', '*.json'))):
        m = json.load(open(f)); q = R.get(m['id'], {})
        if q.get('legacy') and q.get('supersededBy') in done: continue      # a newer version of this sheet is in
        scales = q.get('scales')
        for k, name in enumerate(m['names']):
            fp = os.path.join(OUT, 'frames', name.split('/')[0], '_'.join(name.split('/')[1:]) + '.png')
            if not os.path.exists(fp): continue
            by.setdefault(atlas_name(m), {})[name] = fp
            chars.setdefault(name.split('/')[0], {'h0': round(HERO_PX * float((scales[k] if scales else q.get('scale')) or 1)), 'pages': []})
    d = os.path.join(ROOT, 'assets', 'atlas'); os.makedirs(d, exist_ok=True); index = {'pages': {}, 'chars': chars, 'frames': {}}
    # Incremental: an atlas whose frames have not changed since it was packed is kept as it is (its part of the index is
    # remembered in sprites/out/atlas_state.json). Packing stops when the time budget is used up; run again to finish.
    sf = os.path.join(OUT, 'atlas_state.json'); state = json.load(open(sf)) if os.path.exists(sf) else {}
    t0 = time.time(); left = []
    def keep(name):
        st = state[name]; index['pages'].update(st['pages']); index['frames'].update(st['frames'])
        for fr, v in st['frames'].items():
            c = chars.get(fr.split('/')[0])
            if c is None: c = chars[fr.split('/')[0]] = {'h0': st.get('h0', {}).get(fr.split('/')[0], HERO_PX), 'pages': []}
            if v[0] not in c['pages']: c['pages'].append(v[0])
    for name in sorted(by):
        sig = hashlib.md5(('%d|%d|' % (PACK_V, HERO_PX) + '|'.join('%s:%d:%d' % (k, os.path.getmtime(v), os.path.getsize(v)) for k, v in sorted(by[name].items()))).encode()).hexdigest()
        st = state.get(name)
        if st and st.get('sig') == sig and all(os.path.exists(os.path.join(d, pn + '.webp')) for pn in st['pages']): keep(name); continue
        if time.time() - t0 > budget:
            left.append(name)
            if st and all(os.path.exists(os.path.join(d, pn + '.webp')) for pn in st['pages']): keep(name)     # the older pack stays in use
            continue
        frames0 = dict(index['frames']); pages0 = dict(index['pages'])
        pages = []; x = y = rowh = 0; page = None
        for fname in sorted(by[name]):
            cell = Image.open(by[name][fname]).convert('RGBA'); cw, ch = cell.size; bb = cell.getbbox()
            if bb is None: continue
            ink = cell.crop(bb); w, h = ink.size
            if page is None or x + w + 1 > PAGE:
                if page is not None: y += rowh + 1
                x = 0; rowh = 0
            if page is None or y + h + 1 > PAGE: page = Image.new('RGBA', (PAGE, PAGE), (0, 0, 0, 0)); pages.append([page, 0]); x = y = rowh = 0
            page.alpha_composite(ink, (x, y)); pn = '%s-%d' % (name, len(pages) - 1)
            index['frames'][fname] = [pn, x, y, w, h, cw, ch, bb[0], bb[1]]
            c = chars[fname.split('/')[0]]
            if pn not in c['pages']: c['pages'].append(pn)
            x += w + 1; rowh = max(rowh, h); pages[-1][1] = max(pages[-1][1], y + h)
        for i, (pg, used) in enumerate(pages):
            pn = '%s-%d' % (name, i); hh = min(PAGE, int(math.ceil(max(1, used) / 4) * 4))
            pg.crop((0, 0, PAGE, hh)).save(os.path.join(d, pn + '.webp'), 'WEBP', quality=85, method=4); index['pages'][pn] = [PAGE, hh]
        fr = {k: v for k, v in index['frames'].items() if k not in frames0}
        state[name] = {'sig': sig, 'pages': {k: v for k, v in index['pages'].items() if k not in pages0}, 'frames': fr, 'h0': {c: chars[c]['h0'] for c in set(k.split('/')[0] for k in fr)}}
        json.dump(state, open(sf, 'w'), separators=(',', ':'))
    index['chars'] = {c: v for c, v in chars.items() if v['pages']}
    pack.left = left
    json.dump(index, open(os.path.join(d, 'index.json'), 'w'), separators=(',', ':'), sort_keys=True)
    return {pn: sorted(c for c, v in chars.items() if pn in v['pages']) for pn in index['pages']}

def check():
    """What is still missing and which received sheets look wrong → sprites/out/check.json, and one command per fix."""
    R = load_requests(); have = set(os.path.splitext(os.path.basename(f))[0] for f in glob.glob(os.path.join(IN, '*.png')) if not f.endswith('.prev.png')) & set(R)
    missing = {}
    for i, q in R.items():
        if q.get('legacy') or i in have: continue
        if q.get('variant') and i != 'hero_f.model': continue                 # the three girl looks were a one-off choice
        missing.setdefault(str(q.get('wave')), []).append(i)
    suspects = {}
    for f in sorted(glob.glob(os.path.join(OUT, 'strips', '*.json'))):
        m = json.load(open(f)); ink = []
        for name in m['names']:
            fp = os.path.join(OUT, 'frames', name.split('/')[0], '_'.join(name.split('/')[1:]) + '.png')
            try: a = np.asarray(Image.open(fp).convert('RGBA'))[:, :, 3]; ink.append(int((a > 40).sum()))
            except Exception: ink.append(0)
        if not ink: continue
        med = sorted(ink)[len(ink) // 2] or 1; why = []
        for k, v in enumerate(ink):
            if v < med * 0.12: why.append('pose %d is almost empty' % (k + 1))
            elif v > med * 4: why.append('pose %d is much larger than the others (two poses joined?)' % (k + 1))
        if why: suspects[m['id']] = why
    rej = os.path.join(OUT, 'rejected.json'); rejected = json.load(open(rej)) if os.path.exists(rej) else {}
    json.dump({'missing': missing, 'suspects': suspects, 'rejected': rejected, 'have': len(have), 'total': sum(1 for q in R.values() if not q.get('legacy') and not (q.get('variant') and q['id'] != 'hero_f.model'))},
              open(os.path.join(OUT, 'check.json'), 'w'), indent=1)
    n = sum(len(v) for v in missing.values())
    print('received %d sheets; %d still missing; %d look wrong; %d could not be cut' % (len(have), n, len(suspects), len(rejected)))
    if n: print('missing → node tools/sprites/generate.mjs --wave ' + ','.join(sorted(missing, key=float)))
    redo = sorted(set(suspects) | set(rejected))
    if redo: print('redo    → node tools/sprites/generate.mjs --force --ids ' + ','.join(redo))

def main():
    report = '--report' in sys.argv; force = '--force' in sys.argv; want = [a for a in sys.argv[1:] if not a.startswith('--')]
    limit = next((int(a.split('=')[1]) for a in sys.argv if a.startswith('--limit=')), 10 ** 9)
    R = load_requests(); files = sorted(glob.glob(os.path.join(IN, '*.png')))
    ids = [os.path.splitext(os.path.basename(f))[0] for f in files if not f.endswith('.prev.png')]
    results = []; skipped = 0; waves = set(); refs = load_refs()
    ids = [i for i in ids if (not want or i in want)]
    for i in [x for x in ids if x not in R]: print('?  %s.png is not a request id — skipped' % i)
    ids = [i for i in ids if i in R]
    ids.sort(key=lambda i: (2 if R[i]['group'] == 'rider' else 0 if first_anim(R[i]) in ('idle', 'still', 'float', 'ride_side', 'model') else 1, i))     # standing sheets first: they size the others
    for i in ids:
        mf = os.path.join(OUT, 'strips', i + '.json')                 # already cut and the sheet has not changed since → skip
        if not force and not report and os.path.exists(mf):
            mm = json.load(open(mf))
            if mm.get('v') == INTAKE_V and abs(mm.get('src_mtime', 0) - os.path.getmtime(os.path.join(IN, i + '.png'))) < 1: skipped += 1; continue
        if len(results) >= limit: break
        try: r = process(R[i], report, refs)
        except Exception as e: r = {'id': i, 'ok': False, 'why': 'could not be read: %s' % e}
        results.append(r)
        if r['ok']: waves.add(str(r['wave']).replace('.', '_'))
        print(('✓  %-34s %s, split by %s, %d frames, cell %d×%d' % (i, r['bg'], r['split'], len(r['frames']), r['cell'][0], r['cell'][1])) if r['ok'] else ('✗  %-34s %s' % (i, r['why'])), flush=True)
    if not report:
        os.makedirs(OUT, exist_ok=True); json.dump(refs, open(REF_FILE, 'w'))
        bad = os.path.join(OUT, 'rejected.json'); old = json.load(open(bad)) if os.path.exists(bad) else {}
        for r in results:
            if r['ok']: old.pop(r['id'], None)
            else: old[r['id']] = r['why']
        json.dump(old, open(bad, 'w'), indent=1)
    if not report and waves: preview_pages(waves); print('preview pages updated for wave(s): ' + ', '.join(sorted(waves)))
    if '--atlas' in sys.argv:
        idx = pack(next((int(a.split('=')[1]) for a in sys.argv if a.startswith('--budget=')), 140))
        print('atlases: %d pages, %d characters' % (len(idx), len(set(c for v in idx.values() for c in v))))
        if pack.left: print('NOT FINISHED — run again with --atlas --limit=0 to pack: ' + ', '.join(pack.left))
    if '--check' in sys.argv: check()
    print('%d sheet(s) cut, %d ok, %d need a redo, %d unchanged' % (len(results), sum(r['ok'] for r in results), sum(not r['ok'] for r in results), skipped))

if __name__ == '__main__':
    main()
