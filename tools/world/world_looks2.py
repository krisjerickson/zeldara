#!/usr/bin/env python3
"""Round 127: THE WORLD, REVAMPED — round two (Kris's notes on every option, Lab › The world, revamped). The mock-ups are now made on REAL
game screenshots taken painted (tools/world/world_shots.py), in layers, so each idea changes only what it should:
  · the ground layer (G), the props (P − G), the actors (F − P), the game's own night (N)
  · the painted pieces used in a mock-up are the game's own (cut from assets/scenery pages), at the game's scale
Kris's rules kept here: the colour grade touches the GROUND only — sprites and painted pieces keep their colour; night keeps the sprites
readable; shadows come from each painted sprite's own shape, and none where a sprite already has one; air comes and goes and thins in a fight.
    python tools/world/world_looks2.py SHOTDIR        → lab/preview/worldlook2/*.jpg (960×540)
"""
import os, sys, json, math
import numpy as np
from PIL import Image, ImageFilter, ImageDraw
import scipy.ndimage as nd

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SH = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/wshots'
OUT = os.path.join(ROOT, 'lab', 'preview', 'worldlook2'); os.makedirs(OUT, exist_ok=True)
W, H = 960, 540
IDX = json.load(open(os.path.join(ROOT, 'assets', 'scenery', 'index.json')))
rng = np.random.default_rng(127)
PAGES = {}


def load(place, layer):
    p = os.path.join(SH, '%s_%s.png' % (place, layer))
    return np.asarray(Image.open(p).convert('RGB').resize((W, H), Image.LANCZOS), dtype=np.float32) if os.path.exists(p) else None


def save(a, name): Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(os.path.join(OUT, name + '.jpg'), quality=87)
def lum(a): return (0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2])[..., None] / 255
def blurm(m, r): return nd.gaussian_filter(m.astype(np.float32), r)


def mask(A, B, thr=22, grow=1, soft=1.0):
    """where two layers differ (a thing drawn on top)"""
    d = np.abs(A - B).sum(-1) > thr
    if grow: d = nd.binary_dilation(d, iterations=grow)
    d = nd.binary_closing(d, iterations=1)
    return np.clip(blurm(d, soft), 0, 1)[..., None]


def objmask(A, B, soft=0.8):
    """things drawn on top (props, actors) — not the soft light-glows the game lays over the ground (those differ only a little)"""
    d = np.abs(A - B).sum(-1)
    core = d > 70
    m = nd.binary_dilation(core, iterations=2) & (d > 24)
    m = nd.binary_fill_holes(nd.binary_closing(m, iterations=2))
    m = nd.binary_opening(m, iterations=1)
    return np.clip(blurm(m, soft), 0, 1)[..., None]


def natural(G):
    """the share of each ground pixel that is natural ground (grass, earth, sand, moss) — not a painted decal (rune circles, stone
    slabs, paths of laid stone): those keep their colour, as Kris asked"""
    r, g, b = G[..., 0] / 255, G[..., 1] / 255, G[..., 2] / 255
    mx, mn = np.maximum(np.maximum(r, g), b), np.minimum(np.minimum(r, g), b); sat = (mx - mn) / (mx + 1e-4)
    cyan = (b > g * 0.95) & (b > r * 1.15) & (sat > 0.25)       # rune-blue decals
    stone = (sat < 0.12) & (mx > 0.45)                               # pale laid stone
    m = (~cyan & ~stone).astype(np.float32)
    return blurm(m, 1.2)[..., None]


SPLIT = {'grass': ([18, 46, 40], [255, 226, 160]), 'wet': ([10, 40, 60], [190, 240, 255]), 'high': ([40, 36, 70], [235, 240, 255]),
         'ash': ([40, 14, 12], [255, 170, 90]), 'village': ([30, 34, 60], [255, 220, 170])}


def grade_full(a, realm):
    """round 124's grade (the one Kris found ~25% too strong)"""
    sat = 1.18 if realm in ('grass', 'village') else 1.45
    a = 255 * np.clip(a / 255, 0, 1) ** 1.25
    l = lum(a); a = l * 255 + (a - l * 255) * sat
    a = (a - 110) * 1.28 + 104
    sh, hi = (np.array(x, dtype=np.float32) for x in SPLIT[realm]); l = np.clip(lum(a), 0, 1)
    a = a * 0.8 + (sh * (1 - l) + hi * l) * 0.2 * (a / 120)
    if realm in ('grass', 'village'): a = a * np.array([0.98, 0.93, 0.9], dtype=np.float32) + np.array([6, 0, 4], dtype=np.float32)
    return np.clip(a, 0, 255)


def graded(place, realm, k=0.75):
    """the grade at k of round 124's strength, on natural ground only; everything drawn on top (props, actors) put back untouched"""
    F, G = load(place, 'F'), load(place, 'G')
    if F is None: return None, None
    on = mask(F, G)                                     # props + actors
    nat = natural(G) * (1 - on)
    Gg = G + k * (grade_full(G, realm) - G)
    out = F * (1 - nat) + Gg * nat
    return F, out


# ── the game's own painted pieces, cut from its scenery pages ──
def piece(pid, scale=0.7):
    it = IDX['items'][pid]; pg = it[0]
    if pg not in PAGES: PAGES[pg] = Image.open(os.path.join(ROOT, 'assets', 'scenery', pg + '.webp')).convert('RGBA')
    im = PAGES[pg].crop((it[1], it[2], it[1] + it[3], it[2] + it[4]))
    f = scale * it[7] * W / 1280 * 1.4 if len(it) > 7 else scale
    return im.resize((max(1, int(it[3] * f)), max(1, int(it[4] * f))), Image.LANCZOS)


def paste(base, im, x, y, a=1.0, anchor='bottom'):
    B = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8)).convert('RGBA')
    if a < 1: im = im.copy(); im.putalpha(im.getchannel('A').point(lambda v: int(v * a)))
    ox = int(x - im.width / 2); oy = int(y - (im.height if anchor == 'bottom' else im.height / 2))
    B.alpha_composite(im, (max(-im.width, min(W, ox)), max(-im.height, min(H, oy))) if 0 <= ox < W and 0 <= oy < H else (ox if ox >= 0 else 0, oy if oy >= 0 else 0))
    return np.asarray(B.convert('RGB'), dtype=np.float32)


def ground_spots(G, onm, n, avoid=None, minsep=90, test=None, raw=False):
    """n spots on open, natural ground (not under things, not on paths), spread apart (raw: only where test says, e.g. water)"""
    nat = (np.ones(G.shape[:2], np.float32) if raw else natural(G)[..., 0]) * (1 - onm[..., 0])
    if test is not None: nat = nat * test
    if avoid is not None: nat = nat * (1 - avoid)
    pts = []
    for _ in range(4000):
        x, y = rng.integers(30, W - 30), rng.integers(40, H - 20)
        if nat[y, x] < 0.95 or nat[max(0, y - 12):y + 4, max(0, x - 20):x + 20].min() < 0.9: continue
        if any((x - px) ** 2 + (y - py) ** 2 < minsep ** 2 for px, py in pts): continue
        pts.append((x, y))
        if len(pts) >= n: break
    return pts


def with_objects(base, F, onm): return base * (1 - onm) + F * onm


# ════════ the options ════════
def opt_grade():
    for place, realm in (('grass', 'grass'), ('wet', 'wet'), ('high', 'high'), ('ash', 'ash'), ('village', 'village')):
        F, out = graded(place, realm)
        if F is None: continue
        save(F, 'grade_%s_a' % place); save(out, 'grade_%s_b' % place)


def opt_sprites():
    """the second lab Kris asked for: adjustments to the sprites themselves, over the new ground"""
    for place, realm in (('village', 'village'), ('field', 'grass')):
        F, out = graded(place, realm)
        if F is None: continue
        P, G = load(place, 'P'), load(place, 'G'); spr = objmask(F, G)
        def put(fn, name):
            S = fn(F); save(out * (1 - spr) + S * spr, 'spr_%s_%s' % (place, name))
        put(lambda a: a, 'a')                                                        # as painted
        def satcon(a):
            l = lum(a) * 255; a = l + (a - l) * 1.12; return (a - 128) * 1.06 + 128  # a touch richer, to match the deeper ground
        put(satcon, 'b')
        def warm(a):
            sh, hi = (np.array(x, dtype=np.float32) for x in SPLIT[realm]); l = np.clip(lum(a), 0, 1)
            return a * 0.9 + (sh * (1 - l) + hi * l) * 0.1 * (a / 120)                # the realm's light falls on them too
        put(warm, 'c')
        # a soft dark rim round every sprite, so it reads on any ground
        ring = np.clip(blurm(nd.binary_dilation(spr[..., 0] > 0.5, iterations=2) & ~(spr[..., 0] > 0.5), 1.0), 0, 1)[..., None]
        R = out * (1 - spr) + F * spr; R = R * (1 - ring * 0.55) + np.array([12, 16, 24], dtype=np.float32) * ring * 0.55
        save(R, 'spr_%s_d' % place)


def opt_shadow():
    """shadows from each painted sprite's own shape; none where the painting already has one"""
    for place in ('village', 'grass', 'field'):
        F, P, G = load(place, 'F'), load(place, 'P'), load(place, 'G')
        if F is None: continue
        save(F, 'shadow_%s_a' % place)
        on = objmask(F, G, soft=0)[..., 0] > 0.5
        lab, n = nd.label(on)
        sh = np.zeros((H, W), np.float32); kept = skipped = 0
        for i, sl in enumerate(nd.find_objects(lab)):
            if sl is None: continue
            comp = lab[sl] == i + 1; h, w = comp.shape
            if comp.sum() < 140 or h < 14: continue
            y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
            # does the painting already carry a shadow? its foot band is darker than the ground just beside it
            fb = slice(max(y0, y1 - max(3, h // 8)), y1)
            foot = F[fb, x0:x1][comp[fb.start - y0:, :]] if comp[fb.start - y0:, :].any() else None
            grd = G[fb, x0:x1][comp[fb.start - y0:, :]] if foot is not None else None
            if foot is not None and len(foot) > 20:
                ratio = (foot + 4) / (grd + 4); mr, sr = ratio.mean(-1), ratio.std(-1)
                dark = ((mr < 0.82) & (sr < 0.09)).mean()          # a painted shadow is the ground, only darker (same hue) — not a brown trunk
                if dark > 0.3: skipped += 1; continue
            # cast: the shape flattened onto the ground away from a sun at the upper left, sheared and soft
            sq = max(2, int(h * 0.42)); flat = np.asarray(Image.fromarray((comp * 255).astype(np.uint8)).resize((w, sq)), np.float32) / 255
            flat = flat[::-1]
            for r in range(sq):
                dx = int(r * 0.55); yy = y1 - 2 + r
                if yy >= H: break
                xs, xe = x0 + dx, min(W, x0 + dx + w)
                if xs >= W: continue
                sh[yy, xs:xe] = np.maximum(sh[yy, xs:xe], flat[r, :xe - xs] * (1 - r / sq * 0.6))
            kept += 1
        sh = blurm(sh, 3.5) * (1 - on)                              # never over the sprites themselves
        out = F * (1 - sh[..., None] * 0.6) + np.array([20, 26, 40], dtype=np.float32) * sh[..., None] * 0.6 * 0.25
        save(out, 'shadow_%s_b' % place)
        print('  shadow', place, 'cast', kept, 'skipped (already shaded)', skipped)


def opt_dusk():
    for place, realm in (('village', 'village'), ('grass', 'grass')):
        F, P, G = load(place, 'F'), load(place, 'P'), load(place, 'G')
        if F is None: continue
        act = mask(F, P)
        X = np.linspace(0, 1, W, dtype=np.float32)[None, :, None]; Y = np.linspace(0, 1, H, dtype=np.float32)[:, None, None]
        for name, k in (('dusk_%s_soft' % place, 0.45), ('dusk_%s_more' % place, 0.7)):
            warm = np.array([1.10, 0.98, 0.80], dtype=np.float32) * (1 - 0.18 * X) + np.array([0.0, 0.0, 0.06], dtype=np.float32) * X   # low sun from the left
            a = F * (1 + (warm - 1) * k) * (1 - 0.10 * k * (0.6 * X + 0.4 * Y))
            a = a * (1 - act * 0.6) + F * act * 0.6 * (1 + (warm - 1) * k * 0.5)       # sprites keep most of their own colour
            save(a, name)
        save(F, 'dusk_%s_a' % place)


def opt_night():
    for place in ('village', 'wet', 'grass'):
        F, P, N = load(place, 'F'), load(place, 'P'), load(place, 'N')
        if F is None or N is None: continue
        save(N, 'night_%s_a' % place)
        act = mask(F, P)
        base = F * np.array([0.42, 0.50, 0.70], dtype=np.float32)                    # moonlit, not black
        lit = np.clip((lum(N) - lum(F) * 0.62) * 3.2, 0, 1)                         # where the game's own night lets light through
        warm = (F[..., 0] > 150) & (F[..., 0] > F[..., 2] * 1.35) & (lum(F)[..., 0] > 0.55)   # lantern flames and lit windows
        glow = np.clip(blurm(warm.astype(np.float32), 14) * 6, 0, 1)[..., None]
        rune = (F[..., 2] > 170) & (F[..., 2] > F[..., 0] * 1.4) & (lum(F)[..., 0] > 0.5)
        rglow = np.clip(blurm(rune.astype(np.float32), 12) * 4, 0, 1)[..., None]
        a = base * (1 - lit * 0.55) + F * lit * 0.55
        a = a + glow * np.array([120, 80, 30], dtype=np.float32) * 0.55 + rglow * np.array([20, 90, 110], dtype=np.float32) * 0.45
        a = a * (1 - act) + (F * np.array([0.78, 0.82, 0.95], dtype=np.float32)) * act   # the hero and villagers stay clear and readable
        ring = np.clip(blurm(nd.binary_dilation(act[..., 0] > 0.5, iterations=3), 4) - act[..., 0], 0, 1)[..., None]
        a = a + ring * np.array([30, 40, 60], dtype=np.float32) * 0.5                 # a faint moon-rim round them
        save(a, 'night_%s_b' % place)


def particles(a, n, cols, size=(1.5, 3.5), glow=True, seed=0, region=None):
    R = np.random.default_rng(seed); L = np.zeros((H, W, 3), np.float32); A = np.zeros((H, W), np.float32)
    for i in range(n):
        x, y = R.uniform(0, W), R.uniform(0, H)
        if region is not None and not region(x, y): continue
        r = R.uniform(*size); c = np.array(cols[i % len(cols)], np.float32)
        yy, xx = int(y), int(x); rr = int(r * 3) + 2
        ys, ye, xs, xe = max(0, yy - rr), min(H, yy + rr), max(0, xx - rr), min(W, xx + rr)
        gy, gx = np.mgrid[ys:ye, xs:xe]; d = np.exp(-((gx - x) ** 2 + (gy - y) ** 2) / (2 * r * r))
        A[ys:ye, xs:xe] = np.maximum(A[ys:ye, xs:xe], d); L[ys:ye, xs:xe] = np.where(d[..., None] > 0.05, c, L[ys:ye, xs:xe])
    if glow: A = np.maximum(A, blurm(A, 3) * 0.6)
    return a * (1 - A[..., None] * 0.9) + L * A[..., None] * 0.9


def opt_air():
    F = load('grass', 'F')
    if F is not None:
        save(F, 'air_grass_a')
        save(particles(F, 26, [(255, 240, 160), (230, 255, 190), (255, 255, 230)], seed=1), 'air_grass_calm')        # between gusts: a few motes
        save(particles(F, 90, [(255, 240, 160), (230, 255, 190), (255, 255, 230), (255, 210, 230)], seed=2), 'air_grass_gust')   # a gust passes
    F = load('field', 'F')
    if F is not None:
        save(F, 'air_field_a'); save(particles(F, 14, [(255, 240, 160), (230, 255, 190)], seed=3), 'air_field_fight')   # in a fight: a quarter as much
    F = load('ash', 'F')
    if F is not None:
        save(F, 'air_ash_a'); save(particles(F, 70, [(255, 150, 60), (255, 200, 120), (120, 110, 110)], seed=4), 'air_ash_gust')


def aurora_ribbon(seed, H0, amp, thick):
    X = np.arange(W, dtype=np.float32); R = np.random.default_rng(seed)
    y = H0 + amp * np.sin(X / W * math.pi * 2 * R.uniform(0.7, 1.3) + R.uniform(0, 6)) + amp * 0.4 * np.sin(X / W * math.pi * 7 + R.uniform(0, 6))
    Y = np.arange(H, dtype=np.float32)[:, None]
    d = (Y - y[None, :]) / thick
    m = np.exp(-d * d) * (0.6 + 0.4 * np.sin(X / 23.0)[None, :] ** 2)
    col = np.where(d[..., None] < 0, np.array([120, 90, 220], np.float32), np.array([60, 230, 160], np.float32))
    return m[..., None], col


def opt_aurora():
    N = load('water', 'N'); G = load('water', 'G')
    if N is not None and G is not None:
        save(N, 'aurora_water_a')
        water = ((G[..., 2] > G[..., 0] * 1.15) & (G[..., 2] > 90)).astype(np.float32)
        water = blurm(water, 2)[..., None]
        m, col = aurora_ribbon(5, H * 0.45, 60, 40)
        save(N + water * m * col * 0.55, 'aurora_water_b')                            # (a) only in the water: the sky seen in its reflection
    N = load('grass', 'N')
    if N is not None:
        save(N, 'aurora_ground_a')
        m, col = aurora_ribbon(9, H * 0.5, 90, 26)
        save(N + m * col * 0.16, 'aurora_ground_b')                                  # (b) a narrow, faint ribbon of light drifting over the land
    N = load('village', 'N'); F = load('village', 'F')
    if N is not None:
        save(N, 'aurora_green_a')
        Y, X = np.mgrid[0:H, 0:W].astype(np.float32); cx, cy = W * 0.78, H * 0.92
        crown = np.exp(-(((X - cx) / 260) ** 2 + ((Y - cy) / 170) ** 2)) * (0.5 + 0.5 * np.sin(X / 17 + Y / 31) ** 2)
        save(N + crown[..., None] * np.array([50, 200, 150], np.float32) * 0.35, 'aurora_green_b')   # (c) a crown of light over the Green on festival nights


def opt_water():
    F, G = load('water', 'F'), load('water', 'G')
    if F is None: return
    save(F, 'water_a')
    on = mask(F, G)
    water = ((G[..., 2] > G[..., 0] * 1.4) & (G[..., 2] > 80) & (G[..., 2] > G[..., 1])).astype(np.float32)
    edge = (blurm(water, 6) > 0.15) & (blurm(water, 6) < 0.85)                       # the shore
    a = F.copy()
    spots_w = ground_spots(G, on, 6, test=(blurm(water, 3) > 0.9).astype(np.float32), minsep=110, raw=True) if water.sum() > 500 else []
    for (x, y), pid in zip(spots_w, ['pl_lilypad', 'ed_lily', 'ed_foam', 'pl_lilypad', 'ed_fish', 'ed_lily']):
        a = paste(a, piece(pid), x, y, 0.95)
    spots_s = ground_spots(G, on, 5, test=edge.astype(np.float32), minsep=120, raw=True)
    for (x, y), pid in zip(spots_s, ['an_reeds_1', 'an_cattails_1', 'an_reeds_2', 'ed_cattails', 'an_reeds_3']):
        a = paste(a, piece(pid), x, y, 1.0)
    a = with_objects(a, F, on)
    save(a, 'water_b')
    print('  water: pieces in the water', len(spots_w), 'on the shore', len(spots_s))


def opt_ground():
    for place in ('grass', 'village'):
        F, G = load(place, 'F'), load(place, 'G')
        if F is None: continue
        save(F, 'ground_%s_a' % place)
        on = mask(F, G)
        a = G.copy(); n = 0
        for (x, y), pid in zip(ground_spots(G, on, 7, minsep=150), ['ed_moss_patch', 'ed_clover', 'ed_pebbles', 'ed_moss_patch', 'ed_wildflowers', 'ed_clover', 'ed_moss_patch']):
            a = paste(a, piece(pid, 0.8), x, y, 0.9); n += 1
        save(with_objects(a, F, on), 'ground_%s_b' % place)
        print('  ground', place, n, 'pieces')


def opt_sites():
    F, G = load('site', 'F'), load('site', 'G')
    if F is None: return
    save(F, 'sites_a')
    on = mask(F, G)
    a = F.copy()
    # a beam of light from an unconquered site, and banners at its door (the game's own painted pieces)
    Y, X = np.mgrid[0:H, 0:W].astype(np.float32)
    lab, n = nd.label(objmask(F, G, soft=0)[..., 0] > 0.5); big = max(range(1, n + 1), key=lambda i: (lab == i).sum()) if n else 0
    ys, xs = np.nonzero(lab == big) if big else (np.array([]), np.array([]))
    if len(xs):
        cx = float(np.median(xs)); top = float(np.percentile(ys, 3)); foot = float(np.percentile(ys, 97))
        beam = np.exp(-((X - cx) / 26) ** 2) * np.clip((top + 40 - Y) / (top + 40), 0, 1)
        a = a + beam[..., None] * np.array([120, 200, 255], np.float32) * 0.55
        for dx in (-90, 90): a = paste(a, piece('cp_banner', 0.9), cx + dx, foot + 30, 1.0)
    save(a, 'sites_b')


def opt_cine():
    F = load('village', 'F')
    if F is None: return
    save(F, 'cine_a')
    # frame up the shot: ease in on the Green, a letterbox — the flourish frames come when painted (requests)
    im = Image.fromarray(F.astype(np.uint8)); cw, ch = int(W * 0.78), int(H * 0.78); x0, y0 = int(W * 0.2), int(H * 0.18)
    im = im.crop((x0, y0, x0 + cw, y0 + ch)).resize((W, H), Image.LANCZOS)
    a = np.asarray(im, np.float32); bar = int(H * 0.11); a[:bar] *= 0.05; a[-bar:] *= 0.05
    save(a, 'cine_b')


if __name__ == '__main__':
    for f in (opt_grade, opt_sprites, opt_shadow, opt_dusk, opt_night, opt_air, opt_aurora, opt_water, opt_ground, opt_sites, opt_cine):
        try: f(); print('✓', f.__name__)
        except Exception as e: print('✗', f.__name__, e)
    print(sorted(os.listdir(OUT)))
