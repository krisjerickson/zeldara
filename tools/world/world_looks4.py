#!/usr/bin/env python3
"""Round 131: THE WORLD, REVAMPED — TAKE 4: the four Kris left at "maybe" (Lab › The world, revamped 3):
  · aurora in the water, soft — "this is good, but i see the effect going over the southern bridge sprite, and the aurora should not go over
    sprites": the sheen now lies only on open water — never on a bridge, a prop or anyone (and moves, in a short clip)
  · saga frames — "i need to see little videos of what this will look like in the game": three moments, as clips
  · landmarks — "these need to be the passages from one quadrant to another … Reposition these, or remake as needed": each stands AT the
    passage between two realms (the middle gate of each border), and becomes that passage
  · vistas — "i would like to see what these scenes look like before putting in": each painting whole, and a clip of the camera easing into it
    python tools/world/world_looks4.py SHOTS3 SHOTS4     → lab/preview/worldlook4/*.jpg, *.mp4"""
import os, sys, json, math, shutil, subprocess, tempfile
import numpy as np
from PIL import Image, ImageDraw, ImageFont
H_ = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H_)
import world_looks2 as L
L.SH = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/wshots3'
S4 = sys.argv[2] if len(sys.argv) > 2 else '/tmp/claude-0/wshots4'
OUT = os.path.join(L.ROOT, 'lab', 'preview', 'worldlook4'); os.makedirs(OUT, exist_ok=True); L.OUT = OUT
W, H = L.W, L.H
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf'


def save(a, n): L.save(a, n)


def img(a): return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


def clip(frames, name, fps=24):
    d = tempfile.mkdtemp()
    for i, f in enumerate(frames): (f if isinstance(f, Image.Image) else img(f)).convert('RGB').save(os.path.join(d, '%04d.jpg' % i), quality=90)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-r', str(fps), '-i', os.path.join(d, '%04d.jpg'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '27', '-movflags', '+faststart', os.path.join(OUT, name + '.mp4')], check=True)
    shutil.rmtree(d); print('  clip', name, len(frames))


def lay(pid):
    it = L.IDX['items'][pid]; pg = it[0]
    if pg not in L.PAGES: L.PAGES[pg] = Image.open(os.path.join(L.ROOT, 'assets', 'scenery', pg + '.webp')).convert('RGBA')
    return L.PAGES[pg].crop((it[1], it[2], it[1] + it[3], it[2] + it[4]))


# ── aurora on open water only ──
def aurora():
    N, G, F = L.load('water', 'N'), L.load('water', 'G'), L.load('water', 'F')
    if N is None: return
    wat = L.blurm((((G[..., 2] > G[..., 0] * 1.3) & (G[..., 2] > 80) & (G[..., 2] > G[..., 1] * 0.95))).astype(np.float32), 2)[..., None]
    on = L.mask(F, G, grow=3)                                 # anything drawn over the ground: the bridge, props, the hero — the sheen stays under them
    open_w = wat * (1 - on)
    Y, X = np.mgrid[0:H, 0:W].astype(np.float32)
    def frame(t):
        sheen = (0.5 + 0.5 * np.sin(X / 140 + Y / 90 + t))[..., None]
        col = np.array([70, 210, 160], np.float32) * sheen + np.array([130, 90, 220], np.float32) * (1 - sheen)
        breathe = 0.18 + 0.06 * math.sin(t * 1.3)
        return N + open_w * col * breathe
    save(N, 'auw4_a'); save(frame(0), 'auw4_soft')
    clip([frame(i / 24 * 1.6) for i in range(24 * 5)], 'auw4_soft')


# ── saga frames: three moments in the game ──
def frames():
    if 'wl_frame_saga' not in L.IDX['items']: return
    fr = lay('wl_frame_saga').resize((W, H), Image.LANCZOS); font = ImageFont.truetype(FONT, 30); small = ImageFont.truetype(FONT, 17)
    for place, title, sub, name in (('wet', 'The Wetlands', 'the second realm — the bridge holds', 'frame4_realm'), ('field', 'Bram the Builder is free', 'the Grasslands\' craftsman walks home', 'frame4_freed'), ('site', 'The tower falls silent', 'the first treasure site cleared', 'frame4_site')):
        F = L.load(place, 'F')
        if F is None: continue
        base = img(F); out = []; n = 24 * 5
        for i in range(n):
            t = i / n; z = 1 + 0.08 * min(1, t / 0.35) ** 0.5                               # the camera eases in a little
            cw, ch = int(W / z), int(H / z); x0, y0 = (W - cw) // 2, int((H - ch) * 0.45)
            im = base.crop((x0, y0, x0 + cw, y0 + ch)).resize((W, H), Image.LANCZOS).convert('RGBA')
            a = min(1, max(0, (t - 0.12) / 0.18)) * (1 - min(1, max(0, (t - 0.86) / 0.14)))       # the frame fades in, holds, fades out
            dim = Image.new('RGBA', (W, H), (8, 10, 20, int(70 * a))); im.alpha_composite(dim)
            f2 = fr.copy(); f2.putalpha(f2.getchannel('A').point(lambda v: int(v * a))); im.alpha_composite(f2)
            ta = min(1, max(0, (t - 0.25) / 0.15)) * (1 - min(1, max(0, (t - 0.84) / 0.12)))
            if ta > 0:
                d = ImageDraw.Draw(im); tw = d.textlength(title, font=font); sw = d.textlength(sub, font=small)
                d.text(((W - tw) / 2, H * 0.78), title, font=font, fill=(255, 236, 190, int(255 * ta)), stroke_width=2, stroke_fill=(20, 14, 8, int(200 * ta)))
                d.text(((W - sw) / 2, H * 0.78 + 40), sub, font=small, fill=(220, 225, 235, int(230 * ta)), stroke_width=1, stroke_fill=(10, 10, 10, int(180 * ta)))
            out.append(im)
        clip(out, name); out[int(n * 0.55)].convert('RGB').save(os.path.join(OUT, name + '.jpg'), quality=87)


# ── landmarks at the passages ──
PLAN = [('gate_silverrun_2', 'Silverrun — the Grasslands ↔ the Wetlands (Bram)', [('lm_bram_bridge', 0.50)]),
        ('gate_scarp_2', 'Great Scar — the Wetlands ↔ the Highlands (Mira)', [('lm_mira_lift', 0.42), ('lm_great_scar', 0.55)]),
        ('gate_chasm_2', 'Cinder Chasm — the Highlands ↔ the Ashlands (Dunn)', [('lm_dunn_bridge', 0.50)]),
        ('gate_ember_2', 'Ember Wall — the Ashlands ↔ the Grasslands (Vela)', [('lm_vela_pass', 0.46)])]


def landmarks():
    for gid, label, L2 in PLAN:
        p = os.path.join(S4, gid + '_F.png')
        if not os.path.exists(p): print('  no shot', gid); continue
        ld = lambda k: np.asarray(Image.open(os.path.join(S4, '%s_%s.png' % (gid, k))).convert('RGB').resize((W, H), Image.LANCZOS), np.float32)
        F, P = ld('F'), ld('P'); cam = json.load(open(os.path.join(S4, gid + '_cam.json')))
        sx, sy = cam[0] * cam[2] * W / 1280, cam[1] * cam[2] * H / 720
        save(F, 'lm4_%s_a' % gid[5:]); act = L.mask(F, P, grow=2); Gd = ld('G'); props = L.mask(P, Gd, grow=2)
        for pid, wfrac in L2:
            if pid not in L.IDX['items']: print('  skip', pid); continue
            pc = lay(pid); w = int(W * wfrac); pc = pc.resize((w, int(pc.height * w / pc.width)), Image.LANCZOS)
            Yg, Xg = np.mgrid[0:H, 0:W]; box = ((np.abs(Xg - sx) < w * 0.85) & (np.abs(Yg - sy) < pc.height * 0.75)).astype(np.float32)[..., None]
            rm = props * L.blurm(box[..., 0], 6)[..., None]                       # the old gatehouse goes: the landmark IS the passage now
            base = F * (1 - rm) + Gd * rm
            a = L.paste(base, pc, sx, sy, 1.0, anchor='center')
            save(a * (1 - act) + F * act, 'lm4_%s_%s' % (gid[5:], pid[3:]))


# ── vistas: the painting whole, and the camera easing into it ──
def vistas():
    for vid, place in (('wl_vista_silverrun', 'grass'), ('wl_vista_scar', 'high'), ('wl_vista_ember', 'ash'), ('wl_vista_lilies', 'wet')):
        rooms = L.IDX.get('rooms', {})
        if vid not in rooms: print('  skip', vid); continue
        V = Image.open(os.path.join(L.ROOT, 'assets', 'scenery', rooms[vid])).convert('RGB'); Vw = np.asarray(V.resize((W, H), Image.LANCZOS), np.float32)
        save(Vw, 'vista4_%s_whole' % vid[9:])
        F = L.load(place, 'F')
        if F is None: continue
        Y = np.linspace(0, 1, H, dtype=np.float32)[:, None, None]; out = []; n = 24 * 6
        for i in range(n):
            t = i / n; u = min(1, max(0, (t - 0.15) / 0.5)); u = u * u * (3 - 2 * u)       # ease in, hold
            pan = int(u * H * 0.18); Fp = np.roll(F, pan, axis=0); Fp[:pan] = F[:1]                 # the play field drops as the camera lifts
            k = np.clip((0.15 + u * 0.55 - Y) / 0.25, 0, 1) * u
            out.append(Fp * (1 - k) + Vw * k)
        clip(out, 'vista4_%s' % vid[9:])


if __name__ == '__main__':
    which = sys.argv[3:] or ['aurora', 'frames', 'landmarks', 'vistas']
    for f in which: globals()[f]()
    print(sorted(os.listdir(OUT)))
