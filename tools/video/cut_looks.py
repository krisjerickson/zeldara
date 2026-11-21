#!/usr/bin/env python3
"""Round 122b: FOUR CINEMATIC LOOKS for each finished cut-scene (Kris: "a new portion of the lab where my picks for the images get turned into
4 different cinematic versions of the cut-scene for me to select from, with different timings and effects, trying to make different looks and
moods for the cut-scene videos. Do this for the completed ones so far").

The same kept shots, in the same order, with the same words — cut four ways:

  saga       SAGA — epic widescreen. 2.39:1 letterbox, a teal-and-orange grade, light film grain. Slow, grand camera (cranes, long pushes,
             orbits), long dissolves between frames, hard cuts inside them; a white flash on the big blows. The longest of the four.
  pulse      PULSE — the trailer cut. Locked to a 112 BPM beat: every shot lasts whole beats, every frame comes in on a flash, a whip or a
             dip to black. Snap and crash zooms that hit fast and settle slowly, a shake on the beat, punchy contrast, colour fringing on the hits.
  storybook  STORYBOOK — a painted tale. Gentle Ken Burns drifts only, soft dissolves between shots, an iris (a closing circle) between
             frames, a warm parchment grade with paper grain and an oval vignette. Calm and unhurried.
  dream      DREAM — a memory. A slow floating camera, a soft bloom on everything, the colour drained toward blue-violet, a warm light leak
             drifting across, ghosted dissolves, and dips to white between frames.

Every look keeps the words readable: a frame never runs shorter than its line takes to read in the game (1.4 s + 0.36 s a word).

    python tools/video/cut_looks.py spirit [saga|pulse|storybook|dream ...] --src DIR [--out DIR]
Reads   sprites/requests/series_plan.json, series_picks.json (as series_cut.py)
Writes  <out>/cl_<scene>_<look>.mp4 (960×540, 24 fps, no sound) and cl_<scene>_<look>.json (the edit: frames with start, end and words)
        default out: lab/preview/looks/
"""
import os, sys, json, math, subprocess
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import series_cut as SC

ROOT = SC.ROOT
W, H, FPS = 960, 540, 24
BEAT = 60 / 112
LOOKS = {
    'saga':      {'name': 'Saga — epic widescreen', 'pace': 1.22, 'amp': 1.25, 'slow': 1.0},
    'pulse':     {'name': 'Pulse — the trailer cut', 'pace': 0.92, 'amp': 1.15, 'slow': 1.0},
    'storybook': {'name': 'Storybook — a painted tale', 'pace': 1.15, 'amp': 0.55, 'slow': 1.0},
    'dream':     {'name': 'Dream — a memory', 'pace': 1.12, 'amp': 0.7, 'slow': 0.5},
}
XF = {'dissolve': 0.45, 'longdis': 0.95, 'softdis': 0.6, 'ghost': 0.85, 'flash': 0.3, 'flashblue': 0.3, 'fade': 1.0, 'whip': 0.24, 'black': 0.3, 'white': 0.9, 'iris': 1.1, 'cut': 0.0}


def restyle(ed, look):
    L = LOOKS[look]; frames = ed['frames']; flat = [s for f in frames for s in f['shots']]
    # pace — scaled, never under the reading time; pulse snaps every shot to whole beats
    for f in frames:
        need = SC.read(f['cap']) + 0.5
        tot = max(need, f['dur'] * L['pace']); k = tot / f['dur']
        for s in f['shots']: s['dur'] = s['dur'] * k
        if look == 'pulse':
            for s in f['shots']: s['dur'] = max(2, round(s['dur'] / BEAT)) * BEAT
            while sum(s['dur'] for s in f['shots']) < need: f['shots'][-1]['dur'] += BEAT
        f['dur'] = sum(s['dur'] for s in f['shots'])
    # camera — the look's own grammar
    side = 1
    for fi, f in enumerate(frames):
        m = f['mood']
        for j, s in enumerate(f['shots']):
            i = flat.index(s); a = SC.SCALE.get(s['lens'], 1.5)
            first, last = i == 0, i == len(flat) - 1
            if look == 'saga':
                mv = 'establish' if first else 'farewell' if last else ('crash' if m == 'impact' and j == 0 else 'shake' if m == 'impact' else
                     'crane' if a <= 1 else 'orbit' if m in ('magic', 'tender') else 'creep' if m == 'dread' else ('panR' if side > 0 else 'panL') if m == 'journey' else 'push' if j % 2 == 0 else 'pull')
            elif look == 'pulse':
                mv = 'crash' if j == 0 else ('whipshake' if m in ('impact', 'journey') else 'snapglow' if j % 2 else 'push')
                if last: mv = 'farewell'
            elif look == 'storybook':
                mv = 'establish' if first else 'farewell' if last else ['push', 'panR', 'pull', 'panL'][(i + fi) % 4]
            else:
                mv = 'establish' if first else 'farewell' if last else ['handheld', 'arc', 'crane', 'handheld', 'pull'][(i + fi) % 5]
            if mv in ('panR', 'panL'): side = -side
            s['move'] = mv
            s['fx'] = {'saga': 'glow' if m == 'magic' else '', 'pulse': 'shake' if m == 'impact' else '', 'storybook': '', 'dream': 'glow'}[look]
            # transitions
            if first: s['in'] = 'fade'
            elif j == 0:
                s['in'] = {'saga': 'flash' if m == 'impact' else 'longdis', 'pulse': ['flash', 'black', 'whip', 'flashblue'][fi % 4] if m != 'impact' else 'flash',
                           'storybook': 'iris', 'dream': 'white'}[look]
            else:
                s['in'] = {'saga': 'cut', 'pulse': 'cut' if j % 2 else 'whip', 'storybook': 'softdis', 'dream': 'ghost'}[look]
    t = 0.0
    for f in frames:
        f['start'] = round(t, 3)
        for s in f['shots']: s['start'] = round(t, 3); s['dur'] = round(s['dur'], 3); t += s['dur']
        f['end'] = round(t, 3)
    ed['length'] = round(t + 1.4, 3); ed['look'] = look; ed['lookName'] = L['name']; ed['size'] = [W, H]
    ed['cuts'] = [0.0] + [round(f['end'] + XF.get(frames[i + 1]['shots'][0]['in'], 0) / 2, 3) for i, f in enumerate(frames[:-1])] + [ed['length']]
    return ed


# ── the grades ──
_C = {}
def const(name, fn):
    if name not in _C: _C[name] = fn()
    return _C[name]

def grade(img, look, t, hit):
    if look == 'saga':
        lum = img.mean(axis=2, keepdims=True)
        img = (img - 128) * 1.08 + 128 + (lum - 128) / 128 * np.array([14, 3, -16], dtype=np.float32) + (128 - lum).clip(0) / 128 * np.array([-10, 4, 14], dtype=np.float32)
        g = const('grain', lambda: np.random.default_rng(1).normal(0, 7, (8, H, W, 1)).astype(np.float32)); img = img + g[int(t * 24) % 8]
        bar = int(round((H - W / 2.39) / 2)); img[:bar] = 0; img[H - bar:] = 0
    elif look == 'pulse':
        lum = img.mean(axis=2, keepdims=True); img = lum + (img - lum) * 1.18; img = (img - 128) * 1.16 + 124
        if hit > 0:
            k = int(7 * hit); img = np.stack([np.roll(img[..., 0], k, 1), img[..., 1], np.roll(img[..., 2], -k, 1)], axis=2)
    elif look == 'storybook':
        lum = img.mean(axis=2, keepdims=True); sep = lum * np.array([1.07, 0.95, 0.76], dtype=np.float32)
        img = img * 0.84 + sep * 0.16; img = (img - 128) * 0.95 + 142; img = img * np.array([1.04, 1.0, 0.92], dtype=np.float32)
        paper = const('paper', lambda: np.asarray(Image.fromarray((np.random.default_rng(2).random((H // 3, W // 3)) * 255).astype(np.uint8)).resize((W, H), Image.Resampling.BICUBIC).filter(ImageFilter.GaussianBlur(1.2)), dtype=np.float32)[..., None])
        img = img * (0.95 + 0.05 * paper / 255)
        ov = const('oval', lambda: np.clip(1.25 - 0.6 * np.sqrt(((np.mgrid[0:H, 0:W][1] - W / 2) / (W * 0.55)) ** 2 + ((np.mgrid[0:H, 0:W][0] - H / 2) / (H * 0.6)) ** 2), 0.6, 1)[..., None].astype(np.float32))
        img = img * ov + np.array([120, 92, 58], dtype=np.float32) * (1 - ov)
    elif look == 'dream':
        lum = img.mean(axis=2, keepdims=True); img = lum + (img - lum) * 0.62
        img = img * np.array([0.93, 0.96, 1.1], dtype=np.float32) + 10
        cx = W * (0.15 + 0.7 * (0.5 + 0.5 * math.sin(t * 0.23))); cy = H * (0.2 + 0.3 * math.sin(t * 0.17 + 1))
        yy, xx = const('grid', lambda: np.mgrid[0:H, 0:W].astype(np.float32))
        leak = np.exp(-(((xx - cx) / (W * 0.35)) ** 2 + ((yy - cy) / (H * 0.45)) ** 2))[..., None]
        img = img + leak * np.array([70, 38, 10], dtype=np.float32) * (0.6 + 0.4 * math.sin(t * 0.7))
    return img


def bloom(img, amt):
    small = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).resize((W // 8, H // 8), Image.Resampling.BILINEAR)
    bl = np.asarray(small.filter(ImageFilter.GaussianBlur(4)).resize((W, H), Image.Resampling.BILINEAR), dtype=np.float32)
    return img + np.clip(bl - 70, 0, 255) * amt


def render(ed, src, out, look):
    L = LOOKS[look]; flat = [s for f in ed['frames'] for s in f['shots']]
    pics = {}
    for s in flat:
        im = SC.load_pic(src, s['id'])
        if im.size[0] > 1440: im = im.resize((1440, round(im.size[1] * 1440 / im.size[0])), Image.Resampling.LANCZOS)
        pics[s['id']] = im
    SC.W, SC.H = W, H
    if hasattr(SC.effects, 'V'): del SC.effects.V
    total = int(round(ed['length'] * FPS))
    p = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', '%dx%d' % (W, H), '-r', str(FPS), '-i', '-',
                          '-c:v', 'libx264', '-preset', 'medium', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], stdin=subprocess.PIPE)

    def shot(i, t):
        s = flat[i]; xi = XF.get(s['in'], 0); d = s['dur'] + (XF.get(flat[i + 1]['in'], 0) / 2 if i + 1 < len(flat) else 1.4)
        u = min(1.0, max(0.0, (t - s['start'] + xi / 2) / (d + xi / 2)))
        if look == 'pulse': u = 1 - (1 - u) ** 2.2
        z, ox, oy, r = SC.camera(s['move'], u, SC.SCALE.get(s['lens'], 1.5) >= 3, t * L['slow'])
        a = L['amp']; z = max(1.0, 1 + (z - 1) * a); ox = max(-1, min(1, ox * a)); oy = max(-1, min(1, oy * a)); r *= a
        if look == 'pulse':      # a little kick on every beat
            b = (t % BEAT) / BEAT; kick = max(0, 1 - b * 6); z += 0.012 * kick
        img = SC.view(pics[s['id']], z, ox, oy, r)
        if look in ('saga', 'pulse'): img = SC.effects(img, s.get('fx', ''), u, t)
        return img

    def blend(a_img, b_img, kind, v):
        e = SC.ease(v)
        if kind in ('dissolve', 'longdis', 'softdis', 'fade'): return a_img * (1 - e) + b_img * e
        if kind == 'ghost': return a_img * (1 - e) * 0.9 + b_img * e + a_img * 0.12 * math.sin(math.pi * v)
        if kind == 'whip': k = int(110 * math.sin(math.pi * v)); return SC.mblur(a_img, k) * (1 - v) + SC.mblur(b_img, k) * v
        if kind in ('flash', 'flashblue', 'white', 'black'):
            col = np.array({'flash': [255, 255, 255], 'flashblue': [170, 235, 255], 'white': [255, 250, 240], 'black': [0, 0, 0]}[kind], dtype=np.float32)
            return (a_img * (1 - min(1, 2 * v)) + col * min(1, 2 * v)) if v < 0.5 else (col * min(1, 2 * (1 - v)) + b_img * (1 - min(1, 2 * (1 - v))))
        if kind == 'iris':
            yy, xx = const('grid', lambda: np.mgrid[0:H, 0:W].astype(np.float32)); R = math.hypot(W, H) / 2
            rad = R * (1 - min(1, 2 * v)) if v < 0.5 else R * min(1, 2 * (v - 0.5)); m = (np.hypot(xx - W / 2, yy - H / 2) < rad)[..., None]
            return np.where(m, a_img if v < 0.5 else b_img, np.array([46, 32, 20], dtype=np.float32))
        return b_img if v >= 0.5 else a_img

    for fn in range(total):
        t = fn / FPS
        i = max(k for k, s in enumerate(flat) if s['start'] <= t + 1e-6) if t >= flat[0]['start'] else 0
        s = flat[i]; img = None
        if i + 1 < len(flat):
            nx = flat[i + 1]; x = XF.get(nx['in'], 0)
            if x and t > nx['start'] - x / 2: img = blend(shot(i, t), shot(i + 1, t), nx['in'], (t - (nx['start'] - x / 2)) / x)
        x = XF.get(s['in'], 0)
        if img is None and x and i > 0 and t < s['start'] + x / 2: img = blend(shot(i - 1, t), shot(i, t), s['in'], (t - (s['start'] - x / 2)) / x)
        if img is None: img = shot(i, t)
        if look == 'dream': img = bloom(img, 0.3)
        hit = max(0.0, 1 - (t - s['start']) / 0.35) if (look == 'pulse' and s['in'] in ('flash', 'flashblue', 'black')) else 0.0
        img = grade(img, look, t, hit)
        if t < 1.0: img = img * SC.ease(t / 1.0)
        if t > ed['length'] - 1.4: img = img * SC.ease(max(0.0, (ed['length'] - t) / 1.4))
        p.stdin.write(np.clip(img, 0, 255).astype(np.uint8).tobytes())
    p.stdin.close(); p.wait()


def main():
    a = [x for x in sys.argv[1:] if not x.startswith('--')]
    for i, x in enumerate(sys.argv):
        if x in ('--src', '--out'): a = [y for y in a if y != sys.argv[i + 1]]
    scene = a[0]; looks = a[1:] or list(LOOKS)
    src = sys.argv[sys.argv.index('--src') + 1]
    outd = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else os.path.join(ROOT, 'lab', 'preview', 'looks'); os.makedirs(outd, exist_ok=True)
    plan = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'series_plan.json')))
    picks = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'series_picks.json')))
    for look in looks:
        ed = restyle(SC.plan_edit(scene, plan, picks), look)
        out = os.path.join(outd, 'cl_%s_%s.mp4' % (scene, look))
        if '--plan' not in sys.argv: render(ed, src, out, look)
        json.dump({'scene': ed['scene'], 'name': ed['name'], 'look': look, 'lookName': ed['lookName'], 'length': ed['length'],
                   'frames': [{'n': f['n'], 'title': f['title'], 'cap': f['cap'], 'start': f['start'], 'end': f['end'], 'shots': [[s['k'], s['lens'], s['move'], s['in'], s['dur']] for s in f['shots']]} for f in ed['frames']]},
                  open(out[:-4] + '.json', 'w'), indent=1)
        print('✓', scene, look, '%.1f s' % ed['length'], ('%.1f MB' % (os.path.getsize(out) / 1e6)) if os.path.exists(out) else '', flush=True)


if __name__ == '__main__':
    main()
