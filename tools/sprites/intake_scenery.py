#!/usr/bin/env python3
"""Scenery intake (round 28): sprites/incoming/sc_*.png  →  cut objects and ground textures.

  python tools/sprites/intake_scenery.py            cut every scenery sheet that is new or changed, then pack and report
  python tools/sprites/intake_scenery.py --force    cut everything again
  python tools/sprites/intake_scenery.py --check    only list what is missing or could not be cut

Reads   sprites/requests/scenery.json   (made by build.mjs from src/js/07zt-scenery.js)
Writes  sprites/out/scenery/items/<item id>.png      one object, trimmed, transparent
        sprites/out/scenery/sheets/<sheet id>.json   what was found on the sheet
        assets/scenery/<family>-N.webp + index.json  atlas pages for the game (objects)
        assets/scenery/tex/<id>.webp                 256 px ground textures, made to repeat without a seam
        sprites/preview/scenery/<sheet id>.webp      a contact sheet to look at (every object at twice its size on screen,
                                                     next to a bar as tall as the hero)

Objects are cut out by their own outline (the same code as the character sheets, tools/sprites/intake.py).
An object is stored at twice its size on screen, or at the size it was painted if that is smaller; index.json
gives, per object: page, x, y, w, h, anchor x, anchor y (bottom centre of the object = where it stands), and k =
the factor that brings the stored picture to its size on screen.
Nothing here is used by the game yet: wiring the pictures in is the next step.
"""
import os, sys, json, math, time
import numpy as np
from PIL import Image, ImageDraw
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import intake as CH                      # cut_background, find_poses

ROOT = os.environ.get('ZSCN_ROOT') or CH.ROOT
IN = os.path.join(ROOT, 'sprites', 'incoming'); OUT = os.path.join(ROOT, 'sprites', 'out', 'scenery')
ASSETS = os.path.join(ROOT, 'assets', 'scenery'); PREV = os.path.join(ROOT, 'sprites', 'preview', 'scenery')
REQ = os.path.join(ROOT, 'sprites', 'requests', 'scenery.json')
V = 3            # raise when the cutting rules change: every sheet is cut again
RES = 2          # stored pixels per screen pixel (never more than was painted)
TEX = 256        # ground texture size
PAGE = 2048; PAD = 2; HERO = 63

def load(): return json.load(open(REQ, encoding='utf-8'))

def by_cells(im, cols, rows, n):
    alpha = np.asarray(im)[..., 3]; solid = alpha > 120; h, w = solid.shape; cw, ch = w / float(cols), h / float(rows)
    lab, nl = CH.label(solid)
    if nl == 0: return None, None
    ys, xs = np.nonzero(lab); ll = lab[ys, xs]; cnt = np.bincount(ll, minlength=nl + 1).astype(np.float64); cnt[0] = 1
    cy = np.bincount(ll, weights=ys, minlength=nl + 1) / cnt; cx = np.bincount(ll, weights=xs, minlength=nl + 1) / cnt
    cell = (np.minimum(rows - 1, (cy / ch).astype(int)) * cols + np.minimum(cols - 1, (cx / cw).astype(int))); cell[0] = -1
    own = cell[lab]                                                     # solid pixels: the cell of their piece
    gy, gx = np.mgrid[0:h, 0:w]; here = np.minimum(rows - 1, (gy / ch).astype(int)) * cols + np.minimum(cols - 1, (gx / cw).astype(int))
    own = np.where(solid, own, np.where(alpha > 8, here, -1))           # glow and soft edges: the cell they lie in
    boxes = []; masks = []
    for k in range(n):
        m = own == k
        if (m & solid).sum() < 40: return None, None
        yy = np.where(m.any(axis=1))[0]; xx = np.where(m.any(axis=0))[0]; b = (int(xx[0]), int(yy[0]), int(xx[-1]) + 1, int(yy[-1]) + 1)
        boxes.append(b); masks.append(m[b[1]:b[3], b[0]:b[2]])
    return boxes, masks

def cut_objects(q, src):
    im, note = CH.cut_background(Image.open(src))
    if im is None: return None, note
    n = len(q['items'])
    if n == 1:                                   # a single object: everything on the sheet is it
        a = np.asarray(im)[..., 3] > 8
        if not a.any(): return None, 'empty image'
        yy = np.where(a.any(axis=1))[0]; xx = np.where(a.any(axis=0))[0]; b = (int(xx[0]), int(yy[0]), int(xx[-1]) + 1, int(yy[-1]) + 1)
        boxes = [b]; masks = [a[b[1]:b[3], b[0]:b[2]]]; mode = 'single'
    else:
        boxes, mode, masks, info = CH.find_poses(im, q['cols'], q['rows'], n)
        if len(boxes) != n or any(b is None for b in boxes):
            # an object made of loose pieces (pebbles, a pile of coins): give every piece to the cell its centre lies in
            boxes, masks = by_cells(im, q['cols'], q['rows'], n); mode = 'cells'
            if boxes is None: return None, 'found too few objects (an empty cell, or objects that cross into a neighbour)'
    rgba = np.asarray(im); out = []
    for k, it in enumerate(q['items']):
        b = boxes[k]; arr = rgba[b[1]:b[3], b[0]:b[2]].copy(); arr[..., 3] = np.where(masks[k], arr[..., 3], 0)
        c = Image.fromarray(arr, 'RGBA'); cw, ch = c.size
        flat = q['kind'] == 'flat'
        # painted px → screen px. Flat decals fit their box; buildings go by WIDTH (it is their footprint on the tiles); other objects by height, with a limit on width
        s_screen = min(it['w'] / cw, it['h'] / ch) if flat else (it['w'] / cw if q['kind'] == 'bld' else min(it['h'] / ch, 1.25 * it['w'] / cw))
        s = min(1.0, s_screen * RES)                                                                     # painted px → stored px
        if s < 1: c = c.resize((max(1, round(cw * s)), max(1, round(ch * s))), Image.LANCZOS)
        solid = np.asarray(c)[..., 3] > 120
        if solid.any():
            xs = np.where(solid.any(axis=0))[0]; ys = np.where(solid.any(axis=1))[0]; ax = (xs[0] + xs[-1] + 1) / 2.0; ay = ys[-1] + 1 if not flat else (ys[0] + ys[-1] + 1) / 2.0
            if q['kind'] == 'bld':      # a building stands on its walls: the middle of its lowest tenth (a sign hanging off one side does not shift it)
                lo = solid[max(0, ys[-1] - max(3, (ys[-1] - ys[0]) // 10)):ys[-1] + 1]; bx = np.where(lo.any(axis=0))[0]; ax = (bx[0] + bx[-1] + 1) / 2.0
        else: ax = c.width / 2.0; ay = c.height
        out.append({'id': it['id'], 'img': c, 'ax': round(float(ax), 1), 'ay': round(float(ay), 1), 'k': round(s_screen / s, 4), 'want': [it['w'], it['h']], 'got': [round(c.width * s_screen / s), round(c.height * s_screen / s)]})
    return out, note + ', ' + mode

def seamless(sq, band, both=True):
    """sq: (N+band)² RGB array → N² that repeats: the first `band` rows / columns fade from the picture's own continuation."""
    a = sq.astype(np.float32); M = a.shape[0]; N = M - band; t = (np.arange(band, dtype=np.float32) / band)
    o = a[:, :N].copy(); o[:, :band] = a[:, N:N + band] * (1 - t)[None, :, None] + a[:, :band] * t[None, :, None]
    if both:
        p = o.copy(); o = p[:N].copy(); o[:band] = p[N:N + band] * (1 - t)[:, None, None] + p[:band] * t[:, None, None]
    else: o = o[band // 2:band // 2 + N]
    return np.clip(o, 0, 255).astype(np.uint8)

def cut_textures(q, src):
    im = Image.open(src).convert('RGB'); W, H = im.size; cw, ch = W / q['cols'], H / q['rows']; a = np.asarray(im); out = []
    for k, it in enumerate(q['items']):
        cx = (k % q['cols'] + 0.5) * cw; cy = (k // q['cols'] + 0.5) * ch; ok = None
        for frac in (0.84, 0.74, 0.62, 0.5):
            M = int(min(cw, ch) * frac); x0 = int(cx - M / 2); y0 = int(cy - M / 2); sq = a[y0:y0 + M, x0:x0 + M]
            rim = np.concatenate([sq[:3].reshape(-1, 3), sq[-3:].reshape(-1, 3), sq[:, :3].reshape(-1, 3), sq[:, -3:].reshape(-1, 3)])
            if (rim.min(axis=1) > 238).mean() < 0.06: ok = sq; break          # no white gap inside the square
        if ok is None and sq.std() >= 2.5 and sq.mean() > 215: ok = sq      # a near-white swatch (snow) on the white sheet: its edge cannot be told from the gap, so the middle half of the cell is taken
        if ok is None: return None, 'swatch %d (%s) does not fill its cell' % (k + 1, it['id'])
        if ok.std() < 2.5: return None, 'swatch %d (%s) is blank' % (k + 1, it['id'])
        band = max(8, int(ok.shape[0] * 0.14)); horiz = it['id'].startswith(('tx_cliff', 'tx_wall', 'tx_w_'))
        t = Image.fromarray(seamless(ok, band, both=not horiz), 'RGB').resize((TEX, TEX), Image.LANCZOS)
        out.append({'id': it['id'], 'img': t, 'horiz': horiz})
    return out, 'grid'

def contact(q, objs):
    pad = 14; tiles = []
    for o in objs:
        im = o['img']
        if q['kind'] == 'tex': t = Image.new('RGB', (TEX * 2, TEX * 2)); [t.paste(im, (x * TEX, y * TEX)) for x in range(2) for y in range(2)]; tiles.append(t.resize((TEX, TEX)).convert('RGBA'))
        else: sc = o['k'] * 2; tiles.append(im.resize((max(1, round(im.width * sc)), max(1, round(im.height * sc))), Image.LANCZOS))
    Hh = max(t.height for t in tiles) + 34; Wd = sum(t.width + pad for t in tiles) + pad + 26
    sheet = Image.new('RGBA', (Wd, Hh), (96, 132, 84, 255)); d = ImageDraw.Draw(sheet); x = pad
    if q['kind'] != 'tex': d.rectangle([x, Hh - 22 - HERO * 2, x + 8, Hh - 22], fill=(255, 255, 255, 255)); x += 26       # the hero's height at the same scale
    for o, t in zip(objs, tiles):
        sheet.alpha_composite(t, (x, Hh - 22 - t.height)); d.text((x, Hh - 18), o['id'], fill=(255, 255, 255, 255)); x += t.width + pad
    os.makedirs(PREV, exist_ok=True); sheet.convert('RGB').save(os.path.join(PREV, q['id'] + '.webp'), quality=82)

def process(q, src):
    objs, note = (cut_textures if q['kind'] == 'tex' else cut_objects)(q, src)
    if objs is None: return {'id': q['id'], 'ok': False, 'why': note}
    d = os.path.join(OUT, 'items'); os.makedirs(d, exist_ok=True)
    for o in objs: o['img'].save(os.path.join(d, o['id'] + '.png'))
    contact(q, objs); odd = []
    if q['kind'] != 'tex': odd = [o['id'] for o in objs if o['got'][0] > o['want'][0] * 1.6 or o['got'][0] < o['want'][0] * 0.45]      # proportions far from what was asked
    meta = {'id': q['id'], 'ok': True, 'v': V, 'kind': q['kind'], 'fam': q['fam'], 'how': note, 'src_mtime': os.path.getmtime(src), 'odd': odd,
            'items': [dict({k: o[k] for k in o if k != 'img'}, size=list(o['img'].size)) for o in objs]}
    os.makedirs(os.path.join(OUT, 'sheets'), exist_ok=True); json.dump(meta, open(os.path.join(OUT, 'sheets', q['id'] + '.json'), 'w'))
    return meta

def pack(J):
    """Atlas pages per family (objects) and one file per ground texture."""
    os.makedirs(os.path.join(ASSETS, 'tex'), exist_ok=True); index = {'v': V, 'res': RES, 'pages': [], 'items': {}, 'tex': {}}; fams = {}
    for q in J['requests']:
        mf = os.path.join(OUT, 'sheets', q['id'] + '.json')
        if not os.path.exists(mf): continue
        M = json.load(open(mf))
        if not M.get('ok'): continue
        for it in M['items']:
            p = os.path.join(OUT, 'items', it['id'] + '.png')
            if not os.path.exists(p): continue
            if q['kind'] == 'tex': Image.open(p).convert('RGB').save(os.path.join(ASSETS, 'tex', it['id'] + '.webp'), quality=88); index['tex'][it['id']] = {'file': 'tex/' + it['id'] + '.webp', 'horiz': bool(it.get('horiz'))}
            else: fams.setdefault(q['fam'], []).append((it, p))
    for fam, L in sorted(fams.items()):
        L.sort(key=lambda e: -e[0]['size'][1]); pages = []; cur = None
        def new_page(): return {'im': Image.new('RGBA', (PAGE, PAGE), (0, 0, 0, 0)), 'x': PAD, 'y': PAD, 'rowh': 0, 'used': 0}
        for it, p in L:
            im = Image.open(p).convert('RGBA'); w, h = im.size
            if w > PAGE - 2 * PAD or h > PAGE - 2 * PAD: im.thumbnail((PAGE - 2 * PAD, PAGE - 2 * PAD), Image.LANCZOS); f = im.width / w; w, h = im.size; it = dict(it, ax=it['ax'] * f, ay=it['ay'] * f, k=it['k'] / f)
            if cur is None: cur = new_page(); pages.append(cur)
            if cur['x'] + w + PAD > PAGE: cur['x'] = PAD; cur['y'] += cur['rowh'] + PAD; cur['rowh'] = 0
            if cur['y'] + h + PAD > PAGE: cur = new_page(); pages.append(cur)
            cur['im'].alpha_composite(im, (cur['x'], cur['y'])); name = '%s-%d' % (fam, len(pages) - 1)
            index['items'][it['id']] = [name, cur['x'], cur['y'], w, h, round(it['ax'], 1), round(it['ay'], 1), round(it['k'], 4)]
            cur['x'] += w + PAD; cur['rowh'] = max(cur['rowh'], h); cur['used'] = max(cur['used'], cur['y'] + h + PAD)
        for i, pg in enumerate(pages):
            name = '%s-%d' % (fam, i); pg['im'].crop((0, 0, PAGE, min(PAGE, pg['used']))).save(os.path.join(ASSETS, name + '.webp'), quality=88, method=4); index['pages'].append(name)
    json.dump(index, open(os.path.join(ASSETS, 'index.json'), 'w'))
    return index

def check(J):
    miss = []; bad = []; odd = []; done = 0
    for q in J['requests']:
        src = os.path.join(IN, q['id'] + '.png'); mf = os.path.join(OUT, 'sheets', q['id'] + '.json')
        if not os.path.exists(src): miss.append(q); continue
        M = json.load(open(mf)) if os.path.exists(mf) else None
        if not M: continue
        if not M.get('ok'): bad.append((q['id'], M.get('why', '?'))); continue
        done += 1
        if M.get('odd'): odd.append((q['id'], M['odd']))
    print('scenery: %d of %d sheets received and cut; %d still missing; %d could not be cut' % (done, len(J['requests']), len(miss), len(bad)))
    if bad:
        print('\nCould not be cut (look at the picture; usually objects touch or the background is not plain):')
        for i, w in bad: print('  ' + i + ': ' + w)
        print('  redo:  node tools/sprites/generate.mjs --set scenery --force --ids ' + ','.join(i for i, _ in bad))
    if odd:
        print('\nCut, but an object came out much wider or narrower than asked (check the contact sheet in sprites/preview/scenery/):')
        for i, o in odd: print('  ' + i + ': ' + ', '.join(o))
    if miss:
        waves = sorted(set(q['wave'] for q in miss)); pil = [q['id'] for q in miss if q.get('pilot')]
        print('\nMissing: ' + ', '.join(q['id'] for q in miss[:12]) + (' … (%d more)' % (len(miss) - 12) if len(miss) > 12 else ''))
        if pil: print('  the pilot:   node tools/sprites/generate.mjs --set scenery --pilot')
        print('  everything:  node tools/sprites/generate.mjs --set scenery --wave ' + ','.join(str(w) for w in waves))

def main():
    if not os.path.exists(REQ): print('sprites/requests/scenery.json is missing — run "node build.mjs" first.'); return 1
    J = load(); force = '--force' in sys.argv; n = ok = 0
    if '--check' not in sys.argv:
        for q in J['requests']:
            src = os.path.join(IN, q['id'] + '.png'); mf = os.path.join(OUT, 'sheets', q['id'] + '.json')
            if not os.path.exists(src): continue
            if not force and os.path.exists(mf):
                M = json.load(open(mf))
                if M.get('ok') and M.get('v') == V and abs(M.get('src_mtime', 0) - os.path.getmtime(src)) < 1: continue      # a sheet that failed is tried again every time
            try: r = process(q, src)
            except Exception as e: r = {'id': q['id'], 'ok': False, 'why': 'error: %s' % e}
            if not r.get('ok'): os.makedirs(os.path.join(OUT, 'sheets'), exist_ok=True); json.dump(dict(r, v=V, src_mtime=os.path.getmtime(src)), open(os.path.join(OUT, 'sheets', q['id'] + '.json'), 'w'))
            n += 1; ok += 1 if r.get('ok') else 0
            print(('✓  ' if r.get('ok') else '✗  ') + q['id'].ljust(22) + (r.get('how') or r.get('why') or ''))
        idx = pack(J); print('%d sheet(s) cut, %d ok; atlas: %d pages, %d objects, %d textures' % (n, ok, len(idx['pages']), len(idx['items']), len(idx['tex'])))
    check(J); return 0

if __name__ == '__main__': sys.exit(main())
