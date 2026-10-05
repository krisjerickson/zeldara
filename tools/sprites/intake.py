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
PACK_V = 3           # raise to pack every atlas again
INTAKE_V = 8         # raise when the cutting or sizing rules change: every sheet is then cut again on the next run
# Sheets whose first pose is a standing pose are sized by it. Other sheets (a charge, a burrow, a death …) start with a
# crouched, sunk or stretched pose, so they take the size of the character's standing sheet instead.
STANDING = {'idle', 'still', 'float', 'model', 'ride_side', 'melee_sword', 'melee_axe', 'ranged_bow', 'ranged_xbow', 'magic_staff', 'war_stomp', 'blink', 'phantom', 'drink', 'talk', 'work', 'model_a', 'model_b', 'model_c'}
REF_FILE = os.path.join(OUT, 'scale_ref8.json')   # per character: standing sheet, body size per view (round 26)
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

def label(mask):
    """Connected shapes of a True/False picture (8-connected) → (label picture, 0 = empty; number of shapes). numpy only."""
    h, w = mask.shape; lab = np.zeros((h, w), np.int32); parent = [0]
    def find(x):
        while parent[x] != x: parent[x] = parent[parent[x]]; x = parent[x]
        return x
    prev = []; rows_runs = []
    for y in range(h):
        row = mask[y]; d = np.diff(np.concatenate(([0], row.view(np.int8), [0]))); st = np.where(d == 1)[0]; en = np.where(d == -1)[0]; cur = []; pi = 0
        for a, b in zip(st.tolist(), en.tolist()):
            l = 0
            while pi < len(prev) and prev[pi][1] < a: pi += 1                 # previous-row runs ending left of this run (touching diagonally counts)
            k = pi
            while k < len(prev) and prev[k][0] <= b:
                r = find(prev[k][2])
                if l == 0: l = r
                elif r != l: parent[max(r, l)] = min(r, l); l = min(r, l)
                k += 1
            if l == 0: l = len(parent); parent.append(l)
            cur.append((a, b, l))
        rows_runs.append(cur); prev = cur
    roots = {}; 
    for y, cur in enumerate(rows_runs):
        for a, b, l in cur:
            r = find(l); lab[y, a:b] = roots.setdefault(r, len(roots) + 1)
    return lab, len(roots)

def seam(cost, axis, lo, hi, slope=3):
    """The cheapest cut through `cost` (ink = 1) running along `axis` (0 = top to bottom) between positions lo..hi of the
    other axis. The cut may drift up to `slope` px per step, so it bends around a wing or a tail. → (positions, ink cut)."""
    c = cost if axis == 0 else cost.T; h = c.shape[0]; lo = max(0, lo); hi = min(c.shape[1], hi); win = c[:, lo:hi].astype(np.float32); wdt = win.shape[1]
    centre = np.abs(np.arange(wdt) - wdt / 2.0) * 1e-4                       # among equal cuts prefer the middle
    acc = np.empty_like(win); back = np.zeros(win.shape, np.int16); acc[0] = win[0] + centre
    for y in range(1, h):
        best = acc[y - 1].copy(); arg = np.zeros(wdt, np.int16)
        for d in range(1, slope + 1):
            for sgn in (-1, 1):
                sh = np.full(wdt, np.inf, np.float32)
                if sgn < 0: sh[d:] = acc[y - 1][:-d]
                else: sh[:-d] = acc[y - 1][d:]
                sh = sh + d * 1e-5; m = sh < best; best = np.where(m, sh, best); arg = np.where(m, sgn * d, arg)
        acc[y] = win[y] + centre + best; back[y] = arg
    x = int(np.argmin(acc[-1])); total = float(acc[-1][x]); path = np.empty(h, np.int32)
    for y in range(h - 1, -1, -1): path[y] = x; x = x + int(back[y][x])
    return path + lo, int(round(total))

def find_poses(im, cols, rows, n):
    """→ (boxes, mode, masks, info). Each pose is cut out by its own outline, not by a straight line (round 24).
    1. 'shapes': every connected shape of solid ink is found. If there are exactly n big ones of a plausible size they
       are the poses.
    2. 'grid': otherwise (two poses touch, or a body is made of separate pieces, or an effect is as big as a body) the
       sheet's grid decides which pose a big shape belongs to (the cell holding most of it); a shape that fills two
       cells is two touching poses and is split by a bending cut through its thinnest part near the grid line.
    Small shapes (sparks, dust, shards) go to the pose in whose cell they sit, unless they hug another pose. Faint glow
    is handed out last, growing outward from each pose. A wing or tail that reaches over the neighbour stays with its owner.
    info: touch = solid pixels cut through, overlap = a straight cut would have failed, dropped = stray marks removed."""
    alpha = np.asarray(im)[..., 3]; a = alpha > 120; h, w = a.shape
    if not a.any(): return [None] * n, 'empty', [], {}
    cw, ch = w / float(cols), h / float(rows); lab, nl = label(a)
    area = np.bincount(lab.ravel(), minlength=nl + 1).astype(np.int64); area[0] = 0; expect = area.sum() / float(n)
    ys, xs = np.nonzero(lab); ll = lab[ys, xs]; order = np.argsort(ll, kind='stable'); ys = ys[order]; xs = xs[order]; ll = ll[order]
    start = np.searchsorted(ll, np.arange(1, nl + 2))
    def pix(i): return ys[start[i - 1]:start[i]], xs[start[i - 1]:start[i]]
    # the grid: full rows use the sheet's even columns; a short last row (3 poses on a 4-column sheet) is usually centred
    # or spread out, so its columns are its own ink extent divided evenly
    rowof = np.minimum(rows - 1, (ys / ch).astype(np.int64)); x_left = [0.0] * rows; x_cw = [cw] * rows
    for r in range(rows):
        k = min(cols, n - r * cols)
        if 0 < k < cols:
            rx = xs[rowof == r]
            if len(rx): x_left[r] = float(rx.min()); x_cw[r] = max(1.0, (float(rx.max()) + 1 - x_left[r]) / k)
    xl = np.array(x_left)[rowof]; xw = np.array(x_cw)[rowof]; kk = np.array([max(1, min(cols, n - r * cols)) for r in range(rows)])[rowof]
    cell_of_px = rowof * cols + np.minimum(kk - 1, np.maximum(0, ((xs - xl) / xw).astype(np.int64)))
    ink = np.bincount(ll.astype(np.int64) * (rows * cols) + cell_of_px, minlength=(nl + 1) * rows * cols).reshape(nl + 1, rows * cols)
    big = [i for i in range(1, nl + 1) if area[i] >= 0.25 * expect]
    pose = np.zeros(nl + 1, np.int32)                 # shape → pose number (1..n); 0 = not decided
    own = np.zeros((h, w), np.int16); touch = 0; mode = 'shapes'
    onepercell = len(big) == n and sorted(int(np.argmax(ink[i])) for i in big) == list(range(n))     # one body in every grid cell
    if len(big) == n and all(0.3 * expect <= area[i] <= 1.9 * expect for i in big) and onepercell:
        cy = {i: pix(i)[0].mean() for i in big}; cx = {i: pix(i)[1].mean() for i in big}
        byrow = sorted(big, key=lambda i: cy[i]); seq = []
        for r in range(rows):
            k = min(cols, n - r * cols)
            if k > 0: seq += sorted(byrow[r * cols:r * cols + k], key=lambda i: cx[i])
        for k, i in enumerate(seq): pose[i] = k + 1
    else:
        mode = 'grid'
        for i in sorted(big, key=lambda i: -area[i]):
            occ = [c for c in range(n) if ink[i][c] >= 0.3 * expect]
            if len(occ) < 2 or area[i] < 1.5 * expect:
                c = int(np.argmax(ink[i][:n])); pose[i] = c + 1; continue
            # two or more poses in one shape: cut it along the grid lines between the cells it fills
            mode = 'grid+seam'; py, px = pix(i); x0, y0, x1, y1 = int(px.min()), int(py.min()), int(px.max()) + 1, int(py.max()) + 1
            m = np.zeros((y1 - y0, x1 - x0), bool); m[py - y0, px - x0] = True
            def cut(mask, axis, at, span):            # → (part before the cut, part after)
                nonlocal touch
                lo = int(max(1, at - 0.3 * span)); hi = int(min(mask.shape[1 - axis] - 1, at + 0.3 * span))
                if hi - lo < 2: return mask, np.zeros_like(mask)
                path, cost = seam(mask, axis, lo, hi); touch += cost
                grid = np.arange(mask.shape[1])[None, :] if axis == 0 else np.arange(mask.shape[0])[:, None]
                first = mask & ((grid < path[:, None]) if axis == 0 else (grid < path[None, :]))
                return first, mask & ~first
            rws = sorted(set(c // cols for c in occ)); rest = m; parts = {}
            for t, r in enumerate(rws):
                if t + 1 < len(rws): top, rest = cut(rest, 1, (r + rws[t + 1] + 1) / 2.0 * ch - y0, ch)
                else: top = rest
                cs = sorted(c % cols for c in occ if c // cols == r); rem = top
                for u, c in enumerate(cs):
                    if u + 1 < len(cs): left, rem = cut(rem, 0, x_left[r] + (c + cs[u + 1] + 1) / 2.0 * x_cw[r] - x0, x_cw[r])
                    else: left = rem
                    parts[r * cols + c] = left
            sub = own[y0:y1, x0:x1]
            for c, pm in parts.items(): sub[pm] = c + 1
            pose[i] = -1                               # its pixels are already owned
        have = set(int(v) for v in pose[big] if v > 0) | set(int(v) for v in np.unique(own) if v > 0)
        if len(have) < n:                              # a cell without a body: the sheet is not laid out on its grid
            if len(big) >= n and mode == 'grid':       # → take the n largest shapes in reading order instead
                top = sorted(big, key=lambda i: -area[i])[:n]; cy = {i: pix(i)[0].mean() for i in top}; cx = {i: pix(i)[1].mean() for i in top}
                byrow = sorted(top, key=lambda i: cy[i]); seq = []; pose[:] = 0; mode = 'largest'
                for r in range(rows):
                    k = min(cols, n - r * cols)
                    if k > 0: seq += sorted(byrow[r * cols:r * cols + k], key=lambda i: cx[i])
                for k, i in enumerate(seq): pose[i] = k + 1
            else: return [None] * n, 'found %d' % len(have), [], {}
    decided = pose > 0
    own = np.where(own > 0, own, np.where(decided[lab], pose[lab], 0)).astype(np.int16)
    # small shapes: the pose in whose cell they sit, unless they hug another pose; far from everything → dropped
    edge = {}; centre = {}; box = {}
    for k in range(n):
        py, px = np.nonzero(own == k + 1)
        if len(py) == 0: return [None] * n, 'found %d' % k, [], {}
        stp = max(1, len(py) // 2500); edge[k] = (px[::stp], py[::stp]); box[k] = (px.min(), py.min(), px.max() + 1, py.max() + 1)
        centre[k] = (x_left[k // cols] + (k % cols + 0.5) * x_cw[k // cols], (k // cols + 0.5) * ch) if mode.startswith('grid') else (px.mean(), py.mean())
    dropped = 0; small_owner = np.zeros(nl + 1, np.int16)
    for i in range(1, nl + 1):
        if pose[i] != 0 or area[i] == 0: continue
        fy, fx = pix(i); bx0, by0, bx1, by1 = fx.min(), fy.min(), fx.max() + 1, fy.max() + 1; cx, cy = fx.mean(), fy.mean()
        stp = max(1, len(fx) // 150); fx = fx[::stp]; fy = fy[::stp]; dist = []
        for k in range(n):
            ex0, ey0, ex1, ey1 = box[k]; gap = max(bx0 - ex1, ex0 - bx1, by0 - ey1, ey0 - by1, 0)
            if gap > 0.8 * max(cw, ch): dist.append(1e9); continue
            ex, ey = edge[k]; d2 = (fx[:, None] - ex[None, :]) ** 2 + (fy[:, None] - ey[None, :]) ** 2; dist.append(float(np.sqrt(d2.min())))
        near = int(np.argmin(dist)); home = int(np.argmin([abs(cx - centre[k][0]) / cw + abs(cy - centre[k][1]) / ch for k in range(n)]))
        pick = home if dist[home] < 1e8 and not (dist[near] <= 6 and dist[near] * 3 <= dist[home]) else near
        if dist[pick] > 0.8 * max(cw, ch): small_owner[i] = -1; dropped += 1
        else: small_owner[i] = pick + 1
    own = np.where(own != 0, own, small_owner[lab]).astype(np.int16)
    # soft pixels (glow, halo, anti-aliased edge) go to the pose they are attached to: ownership grows outward step by step
    soft = (alpha > 8) & (own == 0)
    for _ in range(140):
        if not soft.any(): break
        new = np.zeros_like(own)
        for sh in range(4):
            nb = np.zeros_like(own)
            if sh == 0: nb[1:] = own[:-1]
            elif sh == 1: nb[:-1] = own[1:]
            elif sh == 2: nb[:, 1:] = own[:, :-1]
            else: nb[:, :-1] = own[:, 1:]
            new = np.where((new == 0) & (nb > 0), nb, new)
        take = soft & (new > 0)
        if not take.any(): break
        own[take] = new[take]; soft &= ~take
    own[own < 0] = 0
    boxes = []; masks = []; overlap = False; spans = []; solid = []
    for k in range(n):
        m = own == k + 1; yy = np.where(m.any(axis=1))[0]; xx = np.where(m.any(axis=0))[0]
        if len(yy) == 0: boxes.append(None); masks.append(None); continue
        x0, y0, x1, y1 = int(xx[0]), int(yy[0]), int(xx[-1]) + 1, int(yy[-1]) + 1
        boxes.append((x0, y0, x1, y1)); masks.append(m[y0:y1, x0:x1]); spans.append((k, x0, y0, x1, y1)); solid.append(int((m & a).sum()))
    for r in range(rows):                                           # would a straight cut have failed?
        rowp = [sp for sp in spans if r * cols <= sp[0] < (r + 1) * cols]
        for u in range(len(rowp) - 1):
            if rowp[u][3] > rowp[u + 1][1]: overlap = True
        if r + 1 < rows:
            nx = [sp for sp in spans if (r + 1) * cols <= sp[0] < (r + 2) * cols]
            if rowp and nx and max(sp[4] for sp in rowp) > min(sp[2] for sp in nx): overlap = True
    med = sorted(solid)[len(solid) // 2] if solid else 0
    return boxes, mode, masks, {'touch': int(touch), 'overlap': bool(overlap), 'dropped': int(dropped),
                                'odd': [k + 1 for k, v in enumerate(solid) if med and (v < 0.2 * med or v > 3.2 * med)] if len(solid) == n else []}

# Poses whose body is meant to look different (sunk, curled, lying, bursting): never rescaled on their own
SHAPE = {'burrow', 'hide', 'death', 'ko', 'swim', 'explode', 'split', 'rollup', 'statue', 'revive', 'roll', 'rest', 'pickup', 'transform', 'perch'}
REFANIM = {'idle', 'still', 'float', 'ride_side', 'model', 'model_a', 'model_b', 'model_c'}
BODY_MAX = 320        # no body is stored taller than this (bosses); the game scales by measured size, so this is only resolution

# sprites/requests/atlas_px.json (tools/sprites/sizes.py + the build): body height to store for characters the game draws much
# larger or smaller than the survey guessed, so nothing is blown up on screen
_apx = os.path.join(ROOT, 'sprites', 'requests', 'atlas_px.json'); ATLAS_PX = json.load(open(_apx)) if os.path.exists(_apx) else {}

def _shift_and(m):
    o = m.copy(); o[1:] &= m[:-1]; o[:-1] &= m[1:]; o[:, 1:] &= m[:, :-1]; o[:, :-1] &= m[:, 1:]
    o[0] = False; o[-1] = False; o[:, 0] = False; o[:, -1] = False; return o
def _shift_or(m):
    o = m.copy(); o[1:] |= m[:-1]; o[:-1] |= m[1:]; o[:, 1:] |= m[:, :-1]; o[:, :-1] |= m[:, 1:]; return o
def opened(mask, r):
    """The thick part of a shape: wear r px off every edge, keep the largest piece left, grow it back.
    Thin things (blades, arcs, sparks, rings, thin flames) disappear; the body stays."""
    m = mask
    for _ in range(r): m = _shift_and(m)
    if not m.any(): return m
    lab, n = label(m)
    if n > 1: a = np.bincount(lab.ravel(), minlength=n + 1); a[0] = 0; m = lab == int(np.argmax(a))
    for _ in range(r): m = _shift_or(m)
    return m & mask

def measure(solid, r_small, r_big):
    """Body of one pose (sheet pixels, crop coordinates): torso area T (thick core, on a half-size mask), its centre x,
    and the body's top and bottom (thinner core: legs count, blades and sparks do not)."""
    core = opened(solid, r_small)
    if not core.any(): core = solid
    yy = np.where(core.any(axis=1))[0]; top, bottom = int(yy[0]), int(yy[-1]) + 1
    half = solid[::2, ::2]; torso = opened(half, max(1, r_big // 2))
    if not torso.any(): return {'T': 0.0, 'cx': float(np.nonzero(core)[1].mean()), 'top': top, 'bottom': bottom, 'A': float(solid.sum())}
    ty, tx = np.nonzero(torso)
    return {'T': float(len(tx)) * 4.0, 'cx': float(tx.mean()) * 2.0 + 0.5, 'top': top, 'bottom': bottom, 'A': float(solid.sum())}

def process(q, report=False, refs=None):
    """Cut one sheet. Round 26: every pose is measured by its BODY (the thick core, without weapons, arcs and sparks):
    - all poses of one view are scaled so the body is the same size ('same body size always'), except SHAPE poses;
    - other sheets of the character are scaled to the body of its standing sheet, not by assuming the painter kept the scale;
    - every frame is anchored at the body (centre of the torso, bottom of the body), so a swinging sword or a burst
      neither shrinks nor shifts the character. Ink may extend past the cell on any side."""
    refs = refs if refs is not None else {}
    src = os.path.join(IN, q['id'] + '.png'); im, note = cut_background(Image.open(src))
    if im is None: return {'id': q['id'], 'ok': False, 'why': note}
    n = len(q['poses']); boxes, mode, masks, info = find_poses(im, q['cols'], q['rows'], n)
    if len(boxes) != n or any(b is None for b in boxes):
        return {'id': q['id'], 'ok': False, 'why': 'found %d of %d poses' % (sum(1 for b in boxes if b), n)}
    rgba = np.asarray(im); crops = []; solids = []
    for k, b in enumerate(boxes):
        arr = rgba[b[1]:b[3], b[0]:b[2]].copy(); arr[..., 3] = np.where(masks[k], arr[..., 3], 0); crops.append(arr); solids.append(arr[..., 3] > 120)
    med_area = float(np.median([s.sum() for s in solids])) or 1.0
    r_small = max(2, int(round(0.03 * math.sqrt(med_area)))); r_big = max(2, int(round(0.10 * math.sqrt(med_area))))
    while True:                                                   # thin creatures: a smaller brush until every pose has a core
        M = [measure(s, r_small, r_big) for s in solids]
        if all(m['T'] > 0 for m in M) or r_big <= 2: break
        r_big = max(2, int(r_big * 0.6))
    names = []
    for pose in q['poses']:
        who = q['char']
        if pose.startswith('@'): who, pose = pose[1:].split('|', 1)
        names.append([who] + pose.split('/'))
    key = lambda nm: nm[1] if nm[1].startswith('ride_') else nm[2]          # a view: facing (or the ride view)
    shape = [nm[1] in SHAPE or M[k]['T'] <= 0 for k, nm in enumerate(names)]
    groups = {}
    for k, nm in enumerate(names): groups.setdefault(key(nm), []).append(k)
    def gmed(g, f):
        v = [f(M[k]) for k in groups[g] if not shape[k]] or [f(M[k]) for k in groups[g]]
        return float(np.median(v))
    H = lambda m: float(m['bottom'] - m['top']); T = lambda m: m['T']
    char = q['char']; ref = refs.get(char); a0 = first_anim(q); g0 = key(names[0])
    scale_to = float(ATLAS_PX.get(char) or min(BODY_MAX, HERO_PX * float(q.get('scale') or 1)))      # stored body height: by the size it is drawn in the game where that is listed
    is_ref = (ref is None or ref.get('from') == q['id']) and not q.get('legacy')
    if is_ref or ref is None:
        s_sheet = scale_to / max(1.0, H(M[0])); how = 'own standing pose' if a0 in REFANIM else 'own first sheet (no standing sheet)'
        if is_ref:      # the character's first sheet is its reference (standing sheets are cut first; a few characters have none)
            k0 = next((k for k in range(n) if not shape[k]), 0)
            ref = refs[char] = {'from': q['id'], 'g': {}, 'H': gmed(g0, H) * s_sheet, 'h0': H(M[k0]) * s_sheet, 'a0': math.sqrt(M[k0]['A']) * s_sheet}
        else: ref = None
    else:
        known = [g for g in groups if g in ref['g']]
        if known: g = known[0]; s_sheet = math.sqrt(ref['g'][g] / max(1.0, gmed(g, T))); how = 'body of view %s as in %s' % (g, ref['from'])
        else: s_sheet = ref['H'] / max(1.0, gmed(g0, H)); how = 'body height as in %s' % ref['from']
    rel = []; sc = []
    for g in groups:
        target = ref['g'].get(g) if ref else None
        if target is None:
            target = gmed(g, T) * s_sheet * s_sheet
            if ref is not None and not q.get('legacy') and any(not shape[k] for k in groups[g]): ref['g'][g] = target
    for k in range(n):
        g = key(names[k]); target = (ref['g'].get(g) if ref else None) or gmed(g, T) * s_sheet * s_sheet
        s_k = s_sheet if shape[k] else min(1.33, max(0.75, math.sqrt(target / M[k]['T']) / s_sheet)) * s_sheet
        sc.append(s_k); rel.append(round(s_k / s_sheet, 3))
    frames = []; anch = []
    for k in range(n):
        c = Image.fromarray(crops[k], 'RGBA'); s_k = sc[k]; lim = 1000.0 / max(c.width * s_k, c.height * s_k, 1)
        if lim < 1: s_k *= lim
        c = c.resize((max(1, round(c.width * s_k)), max(1, round(c.height * s_k))), Image.LANCZOS)
        frames.append(('/'.join(names[k]), c)); anch.append([round(M[k]['cx'] * s_k, 1), round(M[k]['bottom'] * s_k, 1)])
    wave = q.get('cwave', q['wave'])
    # one cell for the Lab strip: every frame placed by its anchor
    L = max(a[0] for a in anch); Rt = max(f[1].width - a[0] for f, a in zip(frames, anch)); U = max(a[1] for a in anch); D = max(f[1].height - a[1] for f, a in zip(frames, anch))
    cw = int(math.ceil(L + Rt)) + PAD * 2; ch = int(math.ceil(U + D)) + PAD * 2
    cells = []
    for (nm, c), a in zip(frames, anch):
        cell = Image.new('RGBA', (cw, ch), (0, 0, 0, 0)); cell.alpha_composite(c, (int(round(PAD + L - a[0])), int(round(PAD + U - a[1])))); cells.append((nm, cell))
    if not report:
        for (name, c) in frames:
            d = os.path.join(OUT, 'frames', name.split('/')[0]); os.makedirs(d, exist_ok=True); c.save(os.path.join(d, '_'.join(name.split('/')[1:]) + '.png'))
        strip = Image.new('RGBA', (cw * n, ch), (0, 0, 0, 0))
        for i, (_, cell) in enumerate(cells): strip.alpha_composite(cell, (i * cw, 0))
        pk = min(1.0, 132.0 / ch, 2048.0 / (cw * n)); pcw, pch = max(1, int(cw * pk)), max(1, int(ch * pk))
        sd = os.path.join(OUT, 'strips'); os.makedirs(sd, exist_ok=True)
        strip.resize((pcw * n, pch), Image.LANCZOS).save(os.path.join(sd, q['id'] + '.png'))
        json.dump({'id': q['id'], 'cell': [pcw, pch], 'full': [cw, ch], 'n': n, 'names': [f[0] for f in frames], 'anch': anch, 'rel': rel, 'sheet_s': round(s_sheet, 4), 'sized': how,
                   'bg': note, 'split': mode, 'touch': info.get('touch', 0), 'overlap': info.get('overlap', False), 'odd': info.get('odd', []), 'dropped': info.get('dropped', 0),
                   'v': INTAKE_V, 'group': q['group'], 'wave': wave, 'src_mtime': os.path.getmtime(src)}, open(os.path.join(sd, q['id'] + '.json'), 'w'))
    return {'id': q['id'], 'ok': True, 'bg': note, 'split': mode, 'touch': info.get('touch', 0), 'overlap': info.get('overlap', False), 'cell': [cw, ch], 'frames': cells, 'rel': rel, 'sized': how, 'group': q['group'], 'wave': wave}

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
    by = {}; chars = {}; anchors = {}; refs = load_refs()
    for f in sorted(glob.glob(os.path.join(OUT, 'strips', '*.json'))):
        m = json.load(open(f)); q = R.get(m['id'], {})
        if q.get('legacy') and q.get('supersededBy') in done: continue      # a newer version of this sheet is in
        for k, name in enumerate(m['names']):
            fp = os.path.join(OUT, 'frames', name.split('/')[0], '_'.join(name.split('/')[1:]) + '.png')
            if not os.path.exists(fp) or 'anch' not in m: continue
            by.setdefault(atlas_name(m), {})[name] = fp; anchors[name] = m['anch'][k]
            c = name.split('/')[0]; rf = refs.get(c) or {}
            # h0 = body height of the standing pose, a0 = square root of its ink area (what the game sizes by), both in atlas px
            chars.setdefault(c, {'h0': int(round(rf.get('h0') or HERO_PX * float(q.get('scale') or 1))), 'a0': round(rf.get('a0') or 0.75 * HERO_PX * float(q.get('scale') or 1), 1), 'pages': []})
    d = os.path.join(ROOT, 'assets', 'atlas'); os.makedirs(d, exist_ok=True); index = {'pages': {}, 'chars': chars, 'frames': {}}
    # Incremental: an atlas whose frames have not changed since it was packed is kept as it is (its part of the index is
    # remembered in sprites/out/atlas_state.json). Packing stops when the time budget is used up; run again to finish.
    sf = os.path.join(OUT, 'atlas_state.json'); state = json.load(open(sf)) if os.path.exists(sf) else {}
    t0 = time.time(); left = []
    def keep(name):
        st = state[name]; index['pages'].update(st['pages']); index['frames'].update(st['frames'])
        for fr, v in st['frames'].items():
            c = chars.get(fr.split('/')[0])
            if c is None: c = chars[fr.split('/')[0]] = dict(st.get('h0', {}).get(fr.split('/')[0], {'h0': HERO_PX, 'a0': 0.75 * HERO_PX}), pages=[])
            if v[0] not in c['pages']: c['pages'].append(v[0])
    for name in sorted(by):
        sig = hashlib.md5(('%d|%d|' % (PACK_V, HERO_PX) + '|'.join('%s:%d:%d:%s:%s' % (k, os.path.getmtime(v), os.path.getsize(v), anchors[k], chars[k.split('/')[0]]['h0']) for k, v in sorted(by[name].items()))).encode()).hexdigest()
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
            c = chars[fname.split('/')[0]]; N = max(8, c['h0']); ax, ay = anchors[fname]
            # the cell is a square of the body's height with the body's feet at its bottom centre; ink may reach outside it
            index['frames'][fname] = [pn, x, y, w, h, N, N, int(round(N / 2.0 - (ax - bb[0]))), int(round(N - (ay - bb[1])))]
            if pn not in c['pages']: c['pages'].append(pn)
            x += w + 1; rowh = max(rowh, h); pages[-1][1] = max(pages[-1][1], y + h)
        for i, (pg, used) in enumerate(pages):
            pn = '%s-%d' % (name, i); hh = min(PAGE, int(math.ceil(max(1, used) / 4) * 4))
            pg.crop((0, 0, PAGE, hh)).save(os.path.join(d, pn + '.webp'), 'WEBP', quality=85, method=4); index['pages'][pn] = [PAGE, hh]
        fr = {k: v for k, v in index['frames'].items() if k not in frames0}
        state[name] = {'sig': sig, 'pages': {k: v for k, v in index['pages'].items() if k not in pages0}, 'frames': fr, 'h0': {c: {'h0': chars[c]['h0'], 'a0': chars[c]['a0']} for c in set(k.split('/')[0] for k in fr)}}
        json.dump(state, open(sf, 'w'), separators=(',', ':'))
    index['chars'] = {c: v for c, v in chars.items() if v['pages']}
    # one small picture per character (its standing frame) on a single sheet: the Tome's grid shows these without loading the big pages
    TC = 72; cols = 24; names = sorted(index['chars']); order = ['idle', 'still', 'float', 'ride_side', 'model', 'move']
    sheet = Image.new('RGBA', (cols * TC, ((len(names) + cols - 1) // cols) * TC), (0, 0, 0, 0)); index['thumbs'] = {}; index['thumb'] = [TC, cols]
    allf = {}
    for nm in by.values():
        for fname, fp in nm.items(): allf.setdefault(fname.split('/')[0], {})[fname] = fp
    for i, c in enumerate(names):
        fr = allf.get(c) or {}
        if not fr: continue
        key = lambda n: (order.index(n.split('/')[1]) if n.split('/')[1] in order else 9, {'f': 0, 'q': 1, 's': 2, 'x': 3}.get(n.split('/')[2], 4), int(n.split('/')[3]))
        fname = sorted(fr, key=key)[0]
        try: im = Image.open(fr[fname]).convert('RGBA')
        except Exception: continue
        k = min((TC - 4) / float(im.width), (TC - 4) / float(im.height)); im = im.resize((max(1, int(im.width * k)), max(1, int(im.height * k))), Image.LANCZOS)
        sheet.alpha_composite(im, ((i % cols) * TC + (TC - im.width) // 2, (i // cols) * TC + TC - 2 - im.height)); index['thumbs'][c] = i
    sheet.save(os.path.join(d, 'thumbs.webp'), 'WEBP', quality=88, method=4)
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
    if '--ids-file' in sys.argv: want += json.load(open(sys.argv[sys.argv.index('--ids-file') + 1]))        # a JSON list of sheet ids
    want = [w for w in want if not w.endswith('.json')]
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
        if not report and len(results) % 10 == 0: os.makedirs(OUT, exist_ok=True); json.dump(refs, open(REF_FILE, 'w'))     # survive a cut-off run
        if r['ok']: waves.add(str(r['wave']).replace('.', '_'))
        print(('✓  %-34s %s, split by %s, %d frames, cell %d×%d' % (i, r['bg'], r['split'], len(r['frames']), r['cell'][0], r['cell'][1])) if r['ok'] else ('✗  %-34s %s' % (i, r['why'])), flush=True)
    if not report:
        os.makedirs(OUT, exist_ok=True); json.dump(refs, open(REF_FILE, 'w'))
        bad = os.path.join(OUT, 'rejected.json'); old = json.load(open(bad)) if os.path.exists(bad) else {}
        for r in results:
            if r['ok']: old.pop(r['id'], None)
            else: old[r['id']] = r['why']
        json.dump(old, open(bad, 'w'), indent=1)
    if '--preview' in sys.argv: preview_pages(); print('preview pages rebuilt for every wave')            # after batches run with --no-preview
    elif not report and waves and '--no-preview' not in sys.argv: preview_pages(waves); print('preview pages updated for wave(s): ' + ', '.join(sorted(waves)))
    if '--atlas' in sys.argv:
        idx = pack(next((int(a.split('=')[1]) for a in sys.argv if a.startswith('--budget=')), 140))
        print('atlases: %d pages, %d characters' % (len(idx), len(set(c for v in idx.values() for c in v))))
        if pack.left: print('NOT FINISHED — run again with --atlas --limit=0 to pack: ' + ', '.join(pack.left))
    if '--check' in sys.argv: check()
    print('%d sheet(s) cut, %d ok, %d need a redo, %d unchanged' % (len(results), sum(r['ok'] for r in results), sum(not r['ok'] for r in results), skipped))

if __name__ == '__main__':
    main()
