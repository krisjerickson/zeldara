#!/usr/bin/env python3
"""Round 128: THE WORLD, REVAMPED — TAKE 3 (Kris on take 2: "the world revamped feedbacks are in, as well as the image requests. Let's still
update into a take 3 … before we put into the game"). Made on real painted game screenshots (world_shots.py), with the r127 paintings now
cut into the game's scenery pages (landmarks, vistas, site exteriors, flourish frames, aurora, water, ground, air, lights). His notes:
  · landmarks, vistas, flourish frames — "we should order these, but i still need to see it first": each one shown in the game
  · aurora in the water — "looks a little odd … come up with a few more proposals": four ways
  · night — "the main thing that needs to be kept from 'today' is the light around the hero and other NPCs and monsters": kept
  · shadows — "some things that should not have a shadow, like a puddle, have one … others that should, like a tree, do not … a waypoint
    … looks like it's floating … remade this proposal considering heights and geometry … might need to just take this out": two ways,
    by height, touching the ground — or none
  · ✓ grade, dusk, air, water, ground, sites, aurora crown and vista — shown with the new paintings where they exist
    python tools/world/world_looks3.py SHOTDIR       → lab/preview/worldlook3/*.jpg"""
import os, sys, json, math
import numpy as np
from PIL import Image, ImageFilter
import scipy.ndimage as nd
H_ = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H_)
import world_looks2 as L
L.SH = next((a for a in sys.argv[1:] if not a.startswith('--')), '/tmp/claude-0/wshots3')
OUT = os.path.join(L.ROOT, 'lab', 'preview', 'worldlook3'); os.makedirs(OUT, exist_ok=True)
L.OUT = OUT
W, H = L.W, L.H
load, save, piece, paste, mask, objmask, blurm, lum = L.load, L.save, L.piece, L.paste, L.mask, L.objmask, L.blurm, L.lum
ROOMS = L.IDX.get('rooms', {})


def room(rid):
    return Image.open(os.path.join(L.ROOT, 'assets', 'scenery', ROOMS[rid])).convert('RGB')


def water_of(G):
    return ((G[..., 2] > G[..., 0] * 1.3) & (G[..., 2] > 80) & (G[..., 2] > G[..., 1] * 0.95)).astype(np.float32)


# ── landmarks, each where it belongs ──
def opt_landmarks():
    plan = [('lm_bram_bridge', 'water', 0.5, 0.52, 0.62), ('lm_mira_lift', 'high', 0.7, 0.62, 0.55), ('lm_dunn_bridge', 'ash', 0.45, 0.6, 0.6),
            ('lm_vela_pass', 'ash', 0.3, 0.5, 0.6), ('lm_world_tree', 'village', 0.72, 0.62, 0.6), ('lm_great_scar', 'high', 0.3, 0.62, 0.6)]
    for pid, place, fx, fy, sc in plan:
        F, G = load(place, 'F'), load(place, 'G')
        if F is None or pid not in L.IDX['items']: print('  skip', pid); continue
        save(F, 'lm_%s_a' % pid[3:])
        on = mask(F, load(place, 'P'))                    # actors stay in front
        a = paste(F, piece(pid, sc), W * fx, H * fy, 1.0)
        save(a * (1 - on) + F * on, 'lm_%s_b' % pid[3:])


# ── vistas: the picture the camera eases into ──
def opt_vistas():
    for vid, place in (('wl_vista_silverrun', 'grass'), ('wl_vista_scar', 'high'), ('wl_vista_ember', 'ash'), ('wl_vista_lilies', 'wet')):
        if vid not in ROOMS: print('  skip', vid); continue
        F = load(place, 'F'); V = np.asarray(room(vid).resize((W, H), Image.LANCZOS), np.float32)
        save(V, 'vista_%s_b' % vid[9:])
        if F is not None:
            save(F, 'vista_%s_a' % vid[9:])
            Y = np.linspace(0, 1, H, dtype=np.float32)[:, None, None]
            k = np.clip((0.62 - Y) / 0.3, 0, 1)                             # the far view rises above the play field as the camera eases up
            save(F * (1 - k) + V * k, 'vista_%s_c' % vid[9:])


# ── grand site exteriors ──
def opt_sites():
    F, G, P = load('site', 'F'), load('site', 'G'), load('site', 'P')
    if F is None: return
    save(F, 'sites_a')
    lab, n = nd.label(objmask(F, G, soft=0)[..., 0] > 0.5)
    big = max(range(1, n + 1), key=lambda i: (lab == i).sum()) if n else 0
    ys, xs = np.nonzero(lab == big) if big else (np.array([H * 0.6]), np.array([W / 2]))
    cx, foot = float(np.median(xs)), float(np.percentile(ys, 97))
    act = mask(F, P)
    a = paste(F, piece('gs_silverwood', 0.62), cx, foot + 8, 1.0)
    save(a * (1 - act) + F * act, 'sites_b')
    # all eight, as a row of cards on the grass
    Gr = load('grass', 'G')
    if Gr is not None:
        a = Gr * 0.55
        for i, pid in enumerate(['gs_silverwood', 'gs_sunken', 'gs_frost', 'gs_lakering', 'gs_observatory', 'gs_bonepit', 'gs_dawn', 'gs_lava']):
            if pid in L.IDX['items']: a = paste(a, piece(pid, 0.3), W * (0.13 + (i % 4) * 0.25), H * (0.47 + (i // 4) * 0.45), 1.0)
        save(a, 'sites_all')


# ── flourish frames over a framed shot ──
def opt_frames():
    F = load('village', 'F')
    if F is None: return
    im = Image.fromarray(F.astype(np.uint8)); cw, ch = int(W * 0.8), int(H * 0.8); x0, y0 = int(W * 0.18), int(H * 0.16)
    base = np.asarray(im.crop((x0, y0, x0 + cw, y0 + ch)).resize((W, H), Image.LANCZOS), np.float32)
    save(F, 'frame_a')
    for fid in ('wl_frame_tapestry', 'wl_frame_stage', 'wl_frame_saga', 'wl_frame_runestone'):
        if fid not in L.IDX['items']: print('  skip', fid); continue
        it = L.IDX['items'][fid]; pg = it[0]
        if pg not in L.PAGES: L.PAGES[pg] = Image.open(os.path.join(L.ROOT, 'assets', 'scenery', pg + '.webp')).convert('RGBA')
        fr = L.PAGES[pg].crop((it[1], it[2], it[1] + it[3], it[2] + it[4])).resize((W, H), Image.LANCZOS)
        B = Image.fromarray(base.astype(np.uint8)).convert('RGBA'); B.alpha_composite(fr)
        save(np.asarray(B.convert('RGB'), np.float32), 'frame_%s' % fid[9:])


# ── aurora in the water: four ways ──
def opt_aurora_water():
    N, G, F = load('water', 'N'), load('water', 'G'), load('water', 'F')
    if N is None or G is None: return
    save(N, 'auw_a')
    wat = blurm(water_of(G), 2)[..., None]
    act = mask(F, load('water', 'P')) if F is not None else 0
    Y, X = np.mgrid[0:H, 0:W].astype(np.float32)
    # 1 — soft: the water takes the aurora's colour, no shapes (a green-violet sheen that breathes)
    sheen = (0.5 + 0.5 * np.sin(X / 140 + Y / 90))[..., None]
    col = np.array([70, 210, 160], np.float32) * sheen + np.array([130, 90, 220], np.float32) * (1 - sheen)
    save(N + wat * col * 0.22 * (1 - act), 'auw_soft')
    # 2 — ripples: thin bright streaks broken by the water's ripples, drifting (reflections are never smooth on a river)
    R = np.random.default_rng(3); noise = blurm(R.random((H, W)).astype(np.float32), 9); noise = (noise - noise.min()) / (noise.max() - noise.min() + 1e-6)
    streak = np.clip(np.sin(Y / 2.6 + np.sin(X / 29 + noise * 6) * 2.6) * 1.8 - 1.2, 0, 1) * np.clip(noise * 2 - 0.6, 0, 1)      # short broken glints, not lines
    save(N + wat * streak[..., None] * col * 0.55 * (1 - act), 'auw_ripple')
    # 3 — the painted reflection piece (au_reflect), laid on the open water and blended as light
    a = N.copy()
    if 'au_reflect' in L.IDX['items']:
        pc = piece('au_reflect', 0.55); p = np.zeros((H, W, 4), np.float32)
        spots = L.ground_spots(G, np.zeros((H, W, 1), np.float32), 2, test=(blurm(water_of(G), 4) > 0.9).astype(np.float32), minsep=260, raw=True)
        for (x, y) in spots:
            P = Image.new('RGBA', (W, H)); P.alpha_composite(pc, (int(x - pc.width / 2), int(y - pc.height / 2)) if 0 <= x - pc.width / 2 and 0 <= y - pc.height / 2 else (max(0, int(x - pc.width / 2)), max(0, int(y - pc.height / 2))))
            q = np.asarray(P, np.float32); p = np.maximum(p, q)
        al = p[..., 3:4] / 255 * wat
        a = a + p[..., :3] * al * 0.55                                    # added as light, only where there is water
    save(a, 'auw_painted')
    # 4 — sky and water together: the aurora band in the sky at the top of the screen, mirrored, dimmer, in the water
    if 'au_band' in L.IDX['items']:
        band = piece('au_band', 0.9).resize((W, int(H * 0.2)), Image.LANCZOS); bb = np.asarray(band, np.float32)
        top = np.zeros((H, W, 4), np.float32); top[:bb.shape[0]] = bb
        a = N + top[..., :3] * top[..., 3:4] / 255 * 0.45                       # the sky band, as light at the top of the screen
        mir = np.roll(top[::-1], -int(H * 0.45), axis=0)                          # its reflection, upside down, faint, only on the water
        mir[..., 3] = blurm(mir[..., 3], 3)
        a = a + mir[..., :3] * mir[..., 3:4] / 255 * wat * 0.3
        save(a, 'auw_skymirror')


def opt_aurora_more():
    N = load('village', 'N')
    if N is not None and 'au_crown' in L.IDX['items']:
        save(N, 'auc_a'); pc = piece('au_crown', 0.7)
        save(N + (np.asarray(paste(np.zeros_like(N), pc, W * 0.62, H * 0.75, 1.0), np.float32)) * 0.6, 'auc_b')
    N = load('grass', 'N')
    if N is not None and 'au_band' in L.IDX['items']:
        save(N, 'aub_a'); band = np.asarray(piece('au_band', 0.9).resize((W, int(H * 0.36)), Image.LANCZOS), np.float32)
        a = N.copy(); al = band[..., 3:4] / 255 * 0.7; a[:band.shape[0]] = a[:band.shape[0]] * (1 - al) + band[..., :3] * al
        save(a, 'aub_b')


# ── night, keeping today's light around the hero, villagers and monsters ──
def opt_night():
    for place in ('village', 'field', 'wet'):
        F, P, N = load(place, 'F'), load(place, 'P'), load(place, 'N')
        if F is None or N is None: continue
        save(N, 'night_%s_a' % place)
        lit = np.clip((lum(N) - lum(F) * 0.55) * 3.0, 0, 1)                    # where today's night lets light through: around the actors, lanterns
        lit = np.maximum(lit, blurm(lit[..., 0], 6)[..., None] * 0.8)
        moon = F * np.array([0.40, 0.48, 0.70], np.float32)
        a = moon * (1 - lit) + N * lit                                         # today's pools of light kept exactly; outside them, moonlight
        warm = (F[..., 0] > 150) & (F[..., 0] > F[..., 2] * 1.35) & (lum(F)[..., 0] > 0.55)
        glow = np.clip(blurm(warm.astype(np.float32), 14) * 6, 0, 1)[..., None]
        a = a + glow * np.array([110, 72, 28], np.float32) * 0.45
        save(a, 'night_%s_b' % place)
        act = mask(F, P)                                                       # (c) the same, and a soft rim of moonlight on every actor
        ring = np.clip(blurm(nd.binary_dilation(act[..., 0] > 0.5, iterations=3), 4) - act[..., 0], 0, 1)[..., None]
        save(a + ring * np.array([40, 55, 80], np.float32) * 0.5, 'night_%s_c' % place)


# ── shadows by height and geometry, touching the ground ──
def components(F, G):
    on = objmask(F, G, soft=0)[..., 0] > 0.5
    lab, n = nd.label(nd.binary_erosion(on, iterations=3))          # split things that touch (houses, trees, fences) before measuring each
    lab = nd.grey_dilation(lab, size=(7, 7)) * on
    out = []
    for i, sl in enumerate(nd.find_objects(lab)):
        if sl is None: continue
        comp = lab[sl] == i + 1; h, w = comp.shape
        if comp.sum() < 120: continue
        y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        rows = comp.any(1); fill = comp.sum() / float(h * w)
        # flat things lie on the ground: wider than tall and low (puddles, rugs, decals, stepping stones) → no shadow
        flat = h < 0.55 * w and h < 46
        out.append(dict(comp=comp, y0=y0, y1=y1, x0=x0, x1=x1, h=h, w=w, flat=flat, fill=fill))
    return on, out


def foot_line(c):
    """for each column, the lowest opaque row — where the thing touches the ground"""
    comp = c['comp']; idx = np.where(comp.any(0))[0]
    return {c['x0'] + j: c['y0'] + int(np.nonzero(comp[:, j])[0].max()) for j in idx}


def opt_shadow():
    for place in ('village', 'grass', 'field'):
        F, G = load(place, 'F'), load(place, 'G')
        if F is None: continue
        save(F, 'shadow_%s_a' % place)
        on, comps = components(F, G)
        contact = np.zeros((H, W), np.float32); cast = np.zeros((H, W), np.float32); nflat = ntall = 0
        for c in comps:
            if c['flat']: nflat += 1; continue
            ntall += 1; fl = foot_line(c)
            xs = sorted(fl); fx0, fx1 = xs[0], xs[-1]; base = max(fl.values()); cx = (fx0 + fx1) / 2
            # (b) contact: a soft dark ellipse under the base, as wide as the base, touching it
            rx = max(6, (fx1 - fx0) * 0.55); ry = max(3, rx * 0.28)
            Y, X = np.ogrid[max(0, base - 20):min(H, base + 20), max(0, int(cx - rx - 4)):min(W, int(cx + rx + 4))]
            e = np.clip(1 - (((X - cx) / rx) ** 2 + ((Y - base + ry * 0.35) / ry) ** 2), 0, 1)
            contact[max(0, base - 20):min(H, base + 20), max(0, int(cx - rx - 4)):min(W, int(cx + rx + 4))] = np.maximum(
                contact[max(0, base - 20):min(H, base + 20), max(0, int(cx - rx - 4)):min(W, int(cx + rx + 4))], e)
            # (c) cast: the silhouette laid down away from a sun at the upper left, its length by the thing's height, starting AT the foot
            L_ = int(min(80, c['h'] * 0.38)); comp = c['comp']
            for j in range(comp.shape[1]):
                col = np.nonzero(comp[:, j])[0]
                if not len(col): continue
                top, bot = col.min(), col.max(); hh = bot - top + 1
                for r in range(0, min(L_, hh)):
                    yy = c['y0'] + bot + int(r * 0.5); xx = c['x0'] + j + int(r * 0.85)
                    if 0 <= yy < H and 0 <= xx < W: cast[yy, xx] = max(cast[yy, xx], 1 - r / max(1, L_) * 0.7)
        con = np.clip(blurm(contact, 1.5), 0, 1) * (1 - on)
        save(F * (1 - con[..., None] * 0.45), 'shadow_%s_b' % place)
        cs = np.clip(blurm(cast, 2.2) * 1.2, 0, 1) * (1 - on)
        sh = np.maximum(con * 0.45, cs * 0.38)
        save(F * (1 - sh[..., None]), 'shadow_%s_c' % place)
        print('  shadow', place, 'tall', ntall, 'flat (no shadow)', nflat)


# ── the painted water and ground pieces, air motes and light pools ──
def opt_water():
    F, G = load('water', 'F'), load('water', 'G')
    if F is None: return
    save(F, 'water_a'); on = mask(F, G); wat = water_of(G); a = F.copy()
    inw = (blurm(wat, 3) > 0.9).astype(np.float32); edge = ((blurm(wat, 6) > 0.15) & (blurm(wat, 6) < 0.85)).astype(np.float32)
    for (x, y), pid in zip(L.ground_spots(G, on, 6, test=inw, minsep=110, raw=True), ['wp_lily_flower', 'wp_glint', 'wp_ripple', 'wp_lily_small', 'wp_leaves', 'wp_ducks']):
        a = paste(a, piece(pid, 0.75), x, y, 0.95)
    for (x, y), pid in zip(L.ground_spots(G, on, 4, test=edge, minsep=140, raw=True), ['wp_reeds_shore', 'wp_driftwood', 'wp_heron', 'wp_rock_foam']):
        a = paste(a, piece(pid, 0.75), x, y, 1.0)
    save(L.with_objects(a, F, on), 'water_b')


def opt_ground():
    for place in ('grass', 'village'):
        F, G = load(place, 'F'), load(place, 'G')
        if F is None: continue
        save(F, 'ground_%s_a' % place); on = mask(F, G); a = G.copy()
        for (x, y), pid in zip(L.ground_spots(G, on, 7, minsep=150), ['gp_moss_a', 'gp_clover_b', 'gp_pebbles', 'gp_flowers_w', 'gp_mushrooms', 'gp_fern', 'gp_twigs']):
            a = paste(a, piece(pid, 0.8), x, y, 0.95)
        save(L.with_objects(a, F, on), 'ground_%s_b' % place)


def opt_air():
    for place, pids, n in (('grass', ['ai_pollen', 'ai_seed', 'ai_firefly'], 16), ('ash', ['ai_ember', 'ai_ash', 'ai_spark'], 22), ('wet', ['ai_mist', 'ai_spore', 'ai_wisp'], 12)):
        F = load(place, 'F')
        if F is None: continue
        save(F, 'air_%s_a' % place); a = F.copy(); R = np.random.default_rng(len(place))
        for i in range(n):
            pid = pids[i % len(pids)]
            if pid in L.IDX['items']: a = paste(a, piece(pid, R.uniform(0.35, 0.7)), R.uniform(20, W - 20), R.uniform(30, H - 10), R.uniform(0.6, 0.95), anchor='center')
        save(a, 'air_%s_b' % place)


def opt_lights():
    """the painted light pools came out as solid discs with rims (see the Lab) — so: (b) pools drawn by the game as soft light, (c) the
    painted pieces as they came, added as light"""
    N, F = load('village', 'N'), load('village', 'F')
    if N is None or F is None: return
    save(N, 'lights_a')
    warm = (F[..., 0] > 150) & (F[..., 0] > F[..., 2] * 1.35) & (lum(F)[..., 0] > 0.55)       # lanterns and lit windows in the day picture
    lab, n = nd.label(nd.binary_dilation(warm, iterations=2)); Y, X = np.mgrid[0:H, 0:W].astype(np.float32); pool = np.zeros((H, W), np.float32)
    for i, sl in enumerate(nd.find_objects(lab)):
        if sl is None or (lab[sl] == i + 1).sum() < 6: continue
        cy, cx = (sl[0].start + sl[0].stop) / 2 + 18, (sl[1].start + sl[1].stop) / 2      # the pool lies on the ground just below the light
        pool = np.maximum(pool, np.exp(-(((X - cx) / 52) ** 2 + ((Y - cy) / 30) ** 2)))
    save(N + pool[..., None] * np.array([255, 170, 80], np.float32) * 0.42, 'lights_b')
    a = N.copy()
    for (x, y), pid in zip([(W * 0.3, H * 0.6), (W * 0.62, H * 0.5), (W * 0.8, H * 0.78)], ['lp_lantern', 'lp_window', 'lp_rune']):
        if pid not in L.IDX['items']: continue
        p = np.asarray(paste(np.zeros_like(N), piece(pid, 0.9), x, y, 1.0, anchor='center'), np.float32)
        a = a + p * 0.5
    save(a, 'lights_c')


if __name__ == '__main__' and '--seasons' not in sys.argv:
    for f in (opt_landmarks, opt_vistas, opt_sites, opt_frames, opt_aurora_water, opt_aurora_more, opt_night, opt_shadow, opt_water, opt_ground, opt_air, opt_lights):
        try: f(); print('✓', f.__name__, flush=True)
        except Exception as e:
            import traceback; traceback.print_exc(); print('✗', f.__name__, e)
    print(len(os.listdir(OUT)), 'pictures')


# ── the five seasons, with their new land pieces (round 128: Kris — "i don't see any proposals for new art or images") ──
LAND = {'sp': ['lt_snow_a', 'lt_mud', 'lt_coltsfoot', 'lt_snowdrops', 'lt_catkins', 'lt_airing', 'lt_tar_boat', 'lt_plough'],
        'au': ['lh_hesje', 'lh_stook', 'lh_baskets', 'lh_lastsheaf', 'lh_barrels', 'lh_wagon', 'lh_berries', 'lh_rowan'],
        'wi': ['ly_neg', 'ly_snowlantern', 'ly_spruce', 'ly_straw_star', 'ly_goat', 'ly_sled', 'ly_icelantern', 'ly_torch'],
        'bl': ['lb_anemones', 'lb_meadow', 'lb_birch', 'lb_hawthorn', 'lb_pole', 'lb_hive', 'lb_cowslip', 'lb_stone']}


def open_spots(F, n, seed, minsep=120):
    """open, plain ground in a single screenshot: low detail, natural colour, away from the edges"""
    g = lum(F)[..., 0]; det = blurm(np.abs(nd.sobel(g, 0)) + np.abs(nd.sobel(g, 1)), 6)
    nat = L.natural(F)[..., 0]; ok = (det < np.percentile(det, 60)) & (nat > 0.6)
    R = np.random.default_rng(seed); pts = []
    for _ in range(6000):
        x, y = int(R.integers(50, W - 50)), int(R.integers(H * 0.3, H - 30))
        if ok[max(0, y - 14):y + 2, max(0, x - 20):x + 20].mean() < 0.9: continue
        if any((x - a) ** 2 + (y - b) ** 2 < minsep ** 2 for a, b in pts): continue
        pts.append((x, y))
        if len(pts) >= n: break
    return pts


def opt_seasons():
    D = os.path.join(L.ROOT, 'lab', 'preview', 'seasons5b'); os.makedirs(D, exist_ok=True)
    for s in ('sp', 'su', 'au', 'wi', 'bl'):
        for place in ('village', 'grass'):
            p = os.path.join(L.SH, 'season_%s_%s.png' % (s, place))
            if not os.path.exists(p): continue
            F = np.asarray(Image.open(p).convert('RGB').resize((W, H), Image.LANCZOS), np.float32)
            Image.fromarray(F.astype(np.uint8)).save(os.path.join(D, 'season_%s_%s.jpg' % (s, place)), quality=86)
            if s not in LAND: continue
            a = F.copy(); ids = [i for i in LAND[s] if i in L.IDX['items']]
            for (x, y), pid in zip(open_spots(F, 6, hash((s, place)) % 1000), ids[:6] if place == 'village' else ids[2:] + ids[:2]):
                a = paste(a, piece(pid, 1.25), x, y, 1.0)
            Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(os.path.join(D, 'land_%s_%s.jpg' % (s, place)), quality=86)
    print('  seasons →', len(os.listdir(D)))


if __name__ == '__main__' and '--seasons' in sys.argv:
    opt_seasons()
