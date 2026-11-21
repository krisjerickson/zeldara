#!/usr/bin/env python3
"""Round 124: CUT-SCENE LOOKS, SECOND ROUND (Kris: "All of the pulse, storybook and dream ones are very bad … Keep all of the 'saga' ones … create
3 new varieties of videos, with different types for each different video so i can consider a wide variety. The saga ones are the best, so take
elements from that, but play around with different ways to cut and edit the final scenes. Study image-based cut scenes as well as video cut
scenes first … We also need text to come out during each image, which is paced with how you would read it. Some images are also OK not having
any text so you can just enjoy the scene").

Fifteen editing styles, three per finished cut-scene, every one built on Saga (the letterbox, the teal-and-orange grade, film grain, slow grand
camera) and each trying a different way to cut — from image-based cut-scenes (Elden Ring's painted prologue, Ken Burns reveals, motion-comic
panels, chapter cards on black) and from film editing (one unbroken take, zoom-through cuts, rack focus, split screen, freeze-frames, smash
cuts, wipes, a frame that changes shape). See LOOKS2 for the list.

THE WORDS (all looks, Saga included): each frame's line is split into its phrases; the phrases are shared out over the frame's shots in order
and build up on screen, one phrase after another, at about 14 characters a second (Netflix allows 17 for adults; slower here because you are
also watching the picture), never less than 1.5 s a phrase, and fade before the cut. Some shots carry no words on purpose — the wide that
opens a frame, the blow itself — so the picture can be taken in; a shot never ends before its words are read. The words are not burned in:
each edit carries "cues" [[start, end, [[phrase, appears at], …], style]] and the Lab (and later the game) lays them over the video.

    python tools/video/cut_looks2.py <scene> [look …] --src DIR [--plan]
Writes lab/preview/looks/cl_<scene>_<look>.mp4 + .json (960×540, 24 fps, no sound); "python tools/video/cut_looks2.py <scene> saga --cues"
adds the cues to the round-122 Saga edit without rendering it again.
"""
import os, sys, json, math, re, subprocess
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import series_cut as SC
import cut_looks as C1

ROOT = SC.ROOT; W, H, FPS = 960, 540, 24
BAR = int(round((H - W / 2.39) / 2))
LOOKS2 = {
    # scene: spirit
    'longtake':  dict(scene='spirit', name='One unbroken take', what='No hard cuts at all: every shot flows into the next through a long dissolve while the camera keeps travelling forward, so the whole scene plays as one continuous camera move — the God of War single-take idea, painted.', pace=1.25, box=True, text='bar'),
    'aspect':    dict(scene='spirit', name='The frame breathes', what='The letterbox changes shape with the story: it opens to the full screen for the big reveals and narrows to a slit for faces, eyes and hands. Cuts on movement, Saga colour.', pace=1.15, box='dyn', text='lower'),
    'lightfall': dict(scene='spirit', name='Light-fall', what='Saga with moving light: soft shafts of light sweep slowly across each painting and bright magic throws a thin rune-blue lens streak. Slow cranes, long dissolves.', pace=1.2, box=True, text='bar'),
    # scene: bram
    'panels':    dict(scene='bram', name='Motion comic', what='Each frame\'s shots appear as comic panels side by side, one after another as you read, each drifting gently — then the last panel grows to fill the screen before the next page.', pace=1.15, box=True, text='bar'),
    'zoomthru':  dict(scene='bram', name='Zoom-through', what='The camera dives into each painting and comes out of the next one (a zoom-through cut), so the bridge is built in one forward rush; a white flash on the hammer and the keystone.', pace=1.05, box=True, text='bar'),
    'reveal':    dict(scene='bram', name='Detail first', what='Every shot opens tight on one detail — a hand, a rune, a tool, a face — and pulls back to reveal the whole painting (the Ken Burns reveal). Hard cuts, so each reveal lands.', pace=1.15, box=True, text='bar'),
    # scene: mira
    'prologue':  dict(scene='mira', name='Elden prologue', what='Solemn painted tableaux, as in Elden Ring\'s opening: each painting fades up from black and is pushed in on very slowly, with embers and dust drifting through the light, then fades back to black.', pace=1.3, box=True, text='bar'),
    'focus':     dict(scene='mira', name='Rack focus', what='Each shot begins soft and pulls into sharp focus as its words come, then softens again before it dissolves away — like a lens finding its subject, one painting at a time.', pace=1.2, box=True, text='bar'),
    'split':     dict(scene='mira', name='Split screen', what='Two shots of one moment side by side — the place and the person, the work and the worker — then one slides across to fill the screen. Cross-cutting, painted.', pace=1.15, box=True, text='bar'),
    # scene: dunn
    'strike':    dict(scene='dunn', name='Strike & freeze', what='Quick camera moves that land and hold still. On the hammer blows the picture freezes with a white flash and a jolt. Hard cuts, a forge\'s rhythm.', pace=1.0, box=True, text='bar'),
    'thunder':   dict(scene='dunn', name='Fire and dark', what='Low-key and dark: each painting is lit out of the black by flickers of fire-light, then glows. Smash cuts to black between the frames.', pace=1.15, box=True, text='bar'),
    'golden':    dict(scene='dunn', name='Golden epic', what='Saga\'s grandeur in a warm golden-hour grade instead of teal, with long anamorphic light streaks, slow cranes and long dissolves.', pace=1.2, box=True, text='bar'),
    # scene: vela
    'breathe':   dict(scene='vela', name='Breathing room', what='The slowest and quietest: long holds, the first picture of each frame with no words so you can take it in, the words carried across the cut, soft one-and-a-half-second dissolves.', pace=1.4, box=True, text='bar'),
    'wipes':     dict(scene='vela', name='Sky wipes', what='Shots wipe across one another in the direction the camera travels, like wind sweeping the sky; each new frame comes in on a wide curtain wipe.', pace=1.15, box=True, text='bar'),
    'cards':     dict(scene='vela', name='Chapter cards', what='Each frame\'s words alone on a dark card first, then its paintings play with no words — like the title cards of a silent film or Hollow Knight\'s text on black.', pace=1.1, box=True, text='card'),
}
XF = {'cut': 0, 'dissolve': 0.6, 'longdis': 1.0, 'morph': 1.4, 'soft': 1.5, 'black': 1.0, 'smash': 0.35, 'flash': 0.3, 'zoomthru': 0.5, 'wipe': 0.7, 'curtain': 0.9, 'fade': 1.0}
CPS, MINR = 14.0, 1.5
WIDE = ('xwide', 'wide', 'track', 'sil', 'top', 'high')
CLOSE = ('ecu', 'close', 'macro', 'insert', 'react')


def frag(line):
    """the line in phrases: at sentence ends, commas, colons, dashes; a phrase of more than 9 words is split at its most natural point"""
    F = [x.strip() for x in re.split(r'(?<=[,;:…!?.])\s+|\s+(?=[—–]\s)', line or '') if x.strip()]
    out = []
    for f in F:
        w = f.split()
        if len(w) <= 9: out.append(f); continue
        best, bi = 99, len(w) // 2
        for i in range(3, len(w) - 2):
            score = abs(i - len(w) / 2) - (3 if w[i].lower() in ('and', 'but', 'then', 'over', 'under', 'into', 'toward', 'with', 'for', 'to', 'of', 'in', 'on', 'between') else 0)
            if score < best: best, bi = score, i
        out += [' '.join(w[:bi]), ' '.join(w[bi:])]
    return out


def rt(p): return max(MINR, len(p) / CPS + 0.45)


def plan(scene, look):
    L = LOOKS2[look]; P = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'series_plan.json')))
    K = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'series_picks.json')))
    ed = SC.plan_edit(scene, P, K); frames = ed['frames']; flat = [s for f in frames for s in f['shots']]
    for fi, f in enumerate(frames):
        n = len(f['shots']); F = frag(f['cap'])
        # which shots carry words: a wide that opens a frame breathes; the blow itself breathes; Chapter cards carry none (the card does)
        talk = list(range(n))
        if n >= 2 and (f['shots'][0]['lens'] in WIDE or look == 'breathe' or f['action']): talk = talk[1:]
        if f['action'] and n >= 2: talk = [n - 1]
        if look == 'cards': talk = []
        f['frag'] = F; f['talk'] = talk; f['card'] = sum(rt(p) for p in F) + 1.4 if look == 'cards' else 0
        share = [[] for _ in range(n)]
        if talk:
            k = len(talk); per = [len(F) // k + (1 if i < len(F) % k else 0) for i in range(k)]; i0 = 0
            for j, ti in enumerate(talk): share[ti] = F[i0:i0 + per[j]]; i0 += per[j]
        base = f['dur'] * L['pace']
        wts = [SC.WEIGHT.get(s['lens'], 1.0) for s in f['shots']]
        for s, w, sh in zip(f['shots'], wts, share):
            d = base * w / sum(wts)
            need = (sum(rt(p) for p in sh) + 0.15 * max(0, len(sh) - 1) + 0.8) if sh else (3.0 if look == 'breathe' else 2.2 if look != 'strike' else 1.6)
            s['dur'] = round(max(d, need), 3); s['words'] = sh
        f['dur'] = sum(s['dur'] for s in f['shots'])
    # camera and transitions, look by look
    side = 1
    for fi, f in enumerate(frames):
        for j, s in enumerate(f['shots']):
            i = flat.index(s); first, last = i == 0, i == len(flat) - 1; a = SC.SCALE.get(s['lens'], 1.5); m = f['mood']
            mv = s.get('move') or 'push'
            if look in ('longtake', 'zoomthru'): mv = 'fly'
            elif look == 'reveal': mv = 'reveal'
            elif look == 'strike': mv = 'land'
            elif look == 'prologue': mv = 'creep'
            elif look == 'wipes': mv = 'panR' if side > 0 else 'panL'; side = -side
            elif look in ('lightfall', 'golden'): mv = 'crane' if a <= 1 else 'orbit' if m in ('magic', 'tender') else 'push'
            elif look in ('breathe', 'focus', 'cards'): mv = ['push', 'pull', 'panR', 'push', 'panL'][(i + fi) % 5]
            if first and look not in ('longtake', 'zoomthru', 'reveal'): mv = 'establish'
            if last and look not in ('reveal',): mv = 'farewell'
            s['move'] = mv
            s['fx'] = 'glow' if m == 'magic' and look not in ('thunder',) else ''
            if first: s['in'] = 'fade'
            elif j == 0:
                s['in'] = {'longtake': 'morph', 'aspect': 'dissolve', 'lightfall': 'longdis', 'panels': 'cut', 'zoomthru': 'flash' if m == 'impact' else 'zoomthru', 'reveal': 'flash' if m == 'impact' else 'dissolve',
                           'prologue': 'black', 'focus': 'longdis', 'split': 'dissolve', 'strike': 'flash' if m == 'impact' else 'cut', 'thunder': 'smash', 'golden': 'longdis',
                           'breathe': 'soft', 'wipes': 'curtain', 'cards': 'fade'}[look]
            else:
                s['in'] = {'longtake': 'morph', 'aspect': 'cut', 'lightfall': 'cut', 'panels': 'cut', 'zoomthru': 'zoomthru', 'reveal': 'cut', 'prologue': 'black', 'focus': 'dissolve',
                           'split': 'cut', 'strike': 'cut', 'thunder': 'cut', 'golden': 'dissolve', 'breathe': 'soft', 'wipes': 'wipe', 'cards': 'cut'}[look]
            if look == 'aspect': s['bar'] = 0 if (s['lens'] in WIDE and s['move'] in ('crane', 'establish', 'farewell')) or s['lens'] in ('xwide',) else (int(round((H - W / 2.76) / 2)) if s['lens'] in CLOSE else BAR)
    # the timeline: cards (Chapter cards) before each frame; panels / split as one segment
    segs, t = [], 0.0
    for fi, f in enumerate(frames):
        f['start'] = round(t, 3)
        if f['card']:
            segs.append({'kind': 'card', 'start': t, 'dur': f['card'], 'in': 'fade' if fi == 0 else 'black', 'frame': f['n'], 'words': f['frag']}); t += f['card']
        if look == 'panels' and len(f['shots']) >= 2:
            pd = max(sum(s['dur'] for s in f['shots']) * 0.75, sum(rt(p) for p in f['frag']) + 1.6 + 0.6 * len(f['shots']))
            segs.append({'kind': 'panels', 'start': t, 'dur': round(pd, 3), 'in': 'fade' if fi == 0 else 'black', 'shots': f['shots'], 'frame': f['n'], 'words': f['frag'], 'grow': 1.4}); t += pd
        elif look == 'split' and len(f['shots']) >= 2:
            sd = max(3.2, sum(rt(p) for p in f['shots'][0]['words'] + f['shots'][1]['words']) + 1.2)
            segs.append({'kind': 'split', 'start': t, 'dur': round(sd, 3), 'in': f['shots'][0]['in'], 'shots': f['shots'][:2], 'frame': f['n'], 'words': f['shots'][0]['words'] + f['shots'][1]['words']}); t += sd
            for s in f['shots'][2:]: segs.append(dict(s, kind='shot', start=t, frame=f['n'])); t += s['dur']
        else:
            for s in f['shots']: segs.append(dict(s, kind='shot', start=t, frame=f['n'])); t += s['dur']
        f['end'] = round(t, 3)
    for s in segs: s['start'] = round(s['start'], 3); s['dur'] = round(s['dur'], 3)
    # the cues: each segment's words build up phrase by phrase, all fade 0.5 s before it ends
    cues = []
    for s in segs:
        w = s.get('words') or []
        if not w: continue
        t0 = s['start'] + (0.55 if s['kind'] == 'card' else 0.4); parts = []; tt = t0
        for p in w: parts.append([p, round(tt, 2)]); tt += rt(p) * (0.62 if len(w) > 1 else 1) + 0.15
        end = max(tt + 0.6, s['start'] + s['dur'] - 0.35)
        if look == 'breathe': end = min(end + 0.6, s['start'] + s['dur'] + 0.6)      # carried a little across the cut (an L-cut for words)
        cues.append([round(t0, 2), round(end, 2), parts, 'card' if s['kind'] == 'card' else L['text']])
    length = round(t + 1.4, 3)
    return {'scene': scene, 'name': ed['name'], 'look': look, 'lookName': L['name'], 'length': length, 'frames': frames, 'segs': segs, 'cues': cues}


# ── rendering ──
_PIC = {}
def pic(src, sid):
    if sid not in _PIC:
        im = SC.load_pic(src, sid)
        if im.size[0] > 1440: im = im.resize((1440, round(im.size[1] * 1440 / im.size[0])), Image.Resampling.LANCZOS)
        _PIC[sid] = im
    return _PIC[sid]


def cam(move, u, close, t, look):
    e = SC.ease(u)
    if move == 'fly': return 1.0 + 0.42 * e, 0, -0.05 * e, 0                 # always forward: the next shot starts wide again
    if move == 'reveal': return 1.9 - 0.85 * (1 - (1 - u) ** 2.2), 0.35 * (1 - e), -0.25 * (1 - e), 0
    if move == 'land':
        k = min(1.0, u / 0.22); z = 1.28 - 0.2 * (1 - (1 - k) ** 3); return z + 0.02 * e, 0, 0, 0
    if move == 'creep': return 1.03 + 0.11 * e, 0, -0.04 * e, 0
    z, ox, oy, r = SC.camera(move, u, close, t)
    a = 1.15; return max(1.0, 1 + (z - 1) * a), max(-1, min(1, ox * a)), max(-1, min(1, oy * a)), r * a


def blur(img, r):
    if r < 0.4: return img
    return np.asarray(Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r)), dtype=np.float32)


def fit(im, w, h, u, drift):
    """the picture cut to a w×h panel (cover), drifting slowly"""
    iw, ih = im.size; z = max(w / iw, h / ih) * (1.06 + 0.06 * u); cw, ch = w / z, h / z
    x0 = (iw - cw) / 2 + drift * (iw - cw) / 2 * (u - 0.5); y0 = (ih - ch) / 2
    return np.asarray(im.transform((w, h), Image.Transform.EXTENT, (x0, y0, x0 + cw, y0 + ch), Image.Resampling.BICUBIC), dtype=np.float32)


def grade(img, look, t):
    lum = img.mean(axis=2, keepdims=True)
    if look == 'golden':
        img = (img - 128) * 1.06 + 128 + (lum - 128) / 128 * np.array([18, 8, -14], dtype=np.float32) + np.array([10, 4, -8], dtype=np.float32)
    elif look == 'thunder':
        img = (img - 128) * 1.12 + 112; img = lum + (img - lum) * 0.9
        img = img + (lum - 128) / 128 * np.array([12, 2, -12], dtype=np.float32)
    else:      # Saga
        img = (img - 128) * 1.08 + 128 + (lum - 128) / 128 * np.array([14, 3, -16], dtype=np.float32) + (128 - lum).clip(0) / 128 * np.array([-10, 4, 14], dtype=np.float32)
    g = C1.const('grain', lambda: np.random.default_rng(1).normal(0, 6, (8, H, W, 1)).astype(np.float32))
    return img + g[int(t * 24) % 8]


def overlays(img, look, t, seg, u):
    yy, xx = C1.const('grid', lambda: np.mgrid[0:H, 0:W].astype(np.float32))
    if look == 'lightfall':
        x = -0.4 * W + (t * 37 % (W * 1.8)); band = np.exp(-(((xx - x) - (yy - H / 2) * 0.55) / 120) ** 2)[..., None]
        img = img + band * np.array([60, 52, 38], dtype=np.float32) * 0.55
    if look in ('lightfall', 'golden'):
        small = np.clip(img, 0, 255).astype(np.uint8)
        hl = np.clip(np.asarray(Image.fromarray(small).resize((W // 4, H // 4), Image.Resampling.BILINEAR), dtype=np.float32) - 200, 0, 255)
        st = np.asarray(Image.fromarray(hl.astype(np.uint8)).filter(ImageFilter.BoxBlur(0)).resize((W, H), Image.Resampling.BILINEAR), dtype=np.float32)
        k = np.ones(61, dtype=np.float32) / 61; st = np.apply_along_axis(lambda r: np.convolve(r, k, mode='same'), 1, st.mean(axis=2))[..., None]
        col = np.array([70, 150, 255] if look == 'lightfall' else [255, 190, 90], dtype=np.float32) / 255
        img = img + st * col * 2.2
    if look == 'prologue':
        P = C1.const('motes', lambda: np.random.default_rng(5).random((70, 4)).astype(np.float32))
        for m in P:
            px = (m[0] * W + t * (12 + 20 * m[2])) % W; py = (m[1] * H - t * (16 + 26 * m[3])) % H; r = 1.2 + 2.2 * m[2]
            x0, x1, y0, y1 = int(max(0, px - 6)), int(min(W, px + 6)), int(max(0, py - 6)), int(min(H, py + 6))
            if x1 <= x0 or y1 <= y0: continue
            d = np.exp(-(((xx[y0:y1, x0:x1] - px) ** 2 + (yy[y0:y1, x0:x1] - py) ** 2) / (r * r)))[..., None]
            img[y0:y1, x0:x1] = img[y0:y1, x0:x1] + d * np.array([255, 170, 90], dtype=np.float32) * (0.5 + 0.5 * math.sin(t * 2 + m[0] * 9))
    if look == 'prologue' or look == 'thunder':
        V = C1.const('vig2', lambda: np.clip(1.2 - 0.5 * np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2), 0.42, 1)[..., None])
        img = img * V
    return img


def render(ed, src, out):
    look = ed['look']; segs = ed['segs']; L = LOOKS2[look]; SC.W, SC.H = W, H
    if hasattr(SC.effects, 'V'): del SC.effects.V
    p = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', '%dx%d' % (W, H), '-r', str(FPS), '-i', '-',
                          '-c:v', 'libx264', '-preset', 'medium', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
    total = int(round(ed['length'] * FPS)); freeze = {}

    def shot_img(s, t):
        xi = XF.get(s['in'], 0); nx = segs[segs.index(s) + 1] if segs.index(s) + 1 < len(segs) else None
        d = s['dur'] + (XF.get(nx['in'], 0) / 2 if nx else 1.4); u = min(1.0, max(0.0, (t - s['start'] + xi / 2) / (d + xi / 2)))
        if s['kind'] == 'card':
            return np.full((H, W, 3), 10, dtype=np.float32)
        if s['kind'] == 'panels':
            k = len(s['shots']); g = 10; top, bot = (BAR, H - BAR); ph = bot - top - 2 * g; pw = (W - (k + 1) * g) / k
            img = np.full((H, W, 3), 12, dtype=np.float32); rv = [s['start'] + 0.2 + i * min(1.6, (s['dur'] - s['grow'] - 0.8) / k) for i in range(k)]
            gt = s['start'] + s['dur'] - s['grow']
            for i, sh in enumerate(s['shots']):
                a = min(1.0, max(0.0, (t - rv[i]) / 0.5))
                if a <= 0: continue
                x0 = int(g + i * (pw + g)); y0 = top + g; w_, h_ = int(pw), int(ph)
                if i == k - 1 and t > gt:      # the last panel grows to fill the frame
                    v = SC.ease(min(1.0, (t - gt) / 0.9)); x0 = int(x0 * (1 - v)); y0 = int(y0 * (1 - v) + 0 * v); w_ = int(w_ + (W - w_) * v); h_ = int(h_ + (H - h_) * v)
                pan = fit(pic(src, sh['id']), w_, h_, min(1, (t - rv[i]) / (s['dur'])), 1 if i % 2 else -1)
                sl = int((1 - a) * 40)
                img[y0:y0 + h_, max(0, x0 + sl):min(W, x0 + w_ + sl)] = img[y0:y0 + h_, max(0, x0 + sl):min(W, x0 + w_ + sl)] * (1 - a) + pan[:, :min(W, x0 + w_ + sl) - max(0, x0 + sl)] * a
            return img
        if s['kind'] == 'split':
            A, B = s['shots']; half = (W - 8) // 2; sl = s['start'] + s['dur'] - 1.0
            v = SC.ease(min(1.0, max(0.0, (t - sl) / 1.0)))
            img = np.full((H, W, 3), 12, dtype=np.float32)
            la = fit(pic(src, A['id']), half, H, u, -1); lb_w = int(half + (W - half) * v); lb = fit(pic(src, B['id']), lb_w, H, u, 1)
            xa = int(-v * half); img[:, max(0, xa):max(0, xa) + half + min(0, xa)] = la[:, -xa if xa < 0 else 0:half]
            xb = int((half + 8) * (1 - v)); img[:, xb:xb + lb_w] = lb[:, :W - xb]
            return img
        close = SC.SCALE.get(s['lens'], 1.5) >= 3
        z, ox, oy, r = cam(s['move'], u, close, t, look)
        im = SC.view(pic(src, s['id']), z, ox, oy, r)
        im = SC.effects(im, s.get('fx', ''), u, t)
        if look == 'focus':
            tin, tout = (t - s['start']) / 0.9, (s['start'] + s['dur'] - t) / 0.6; im = blur(im, 7 * max(0, 1 - min(tin, 1)) + 5 * max(0, 1 - min(max(tout, 0), 1)))
        if look == 'thunder':
            k = t - s['start']; fl = 0.18 + 0.82 * min(1, k / 1.4) + (0.55 if 0.15 < k < 0.24 or 0.42 < k < 0.5 else 0) * (1 if s['in'] in ('smash', 'fade') else 0.4)
            im = im * min(1.25, fl)
        if look == 'strike' and s.get('fx') == '' and SC.SCALE.get(s['lens'], 1.5) <= 1.5 and segs.index(s) > 0:
            pass
        return im

    def blend(a, b, kind, v, nx):
        e = SC.ease(v)
        if kind in ('dissolve', 'longdis', 'morph', 'soft', 'fade'): return a * (1 - e) + b * e
        if kind in ('black', 'smash'):
            if kind == 'smash': return a if v < 0.15 else (np.zeros_like(a) if v < 0.7 else b * SC.ease((v - 0.7) / 0.3))
            return a * max(0, 1 - 2 * v) if v < 0.5 else b * min(1, 2 * v - 1)
        if kind == 'flash':
            col = np.float32(255); return (a * (1 - min(1, 2 * v)) + col * min(1, 2 * v)) if v < 0.5 else (col * min(1, 2 * (1 - v)) + b * (1 - min(1, 2 * (1 - v))))
        if kind == 'zoomthru':
            if v < 0.5:
                k = v * 2; z = 1 + 0.9 * k ** 2; A = np.asarray(Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).resize((int(W * z), int(H * z)), Image.Resampling.BILINEAR), dtype=np.float32)
                y0, x0 = (A.shape[0] - H) // 2, (A.shape[1] - W) // 2; A = A[y0:y0 + H, x0:x0 + W]; return blur(A, 6 * k) * (1 - 0.5 * k) + np.float32(255) * 0.5 * k
            k = (1 - v) * 2; return blur(b, 6 * k) * (1 - 0.4 * k) + np.float32(255) * 0.4 * k
        if kind in ('wipe', 'curtain'):
            yy, xx = C1.const('grid', lambda: np.mgrid[0:H, 0:W].astype(np.float32)); right = nx is None or nx.get('move') != 'panL'
            edge = (v * (W + 240) - 120); pos = xx if right else (W - xx)
            if kind == 'curtain': edge = v * (W / 2 + 160) - 80; pos = W / 2 - np.abs(xx - W / 2)      # from both sides to the middle
            m = np.clip((edge - pos) / 120 + 0.5, 0, 1)[..., None]; return a * (1 - m) + b * m
        return b if v >= 0.5 else a

    for fn in range(total):
        t = fn / FPS
        i = max(k for k, s in enumerate(segs) if s['start'] <= t + 1e-6) if t >= segs[0]['start'] else 0
        s = segs[i]; img = None
        if i + 1 < len(segs):
            nx = segs[i + 1]; x = XF.get(nx['in'], 0)
            if x and t > nx['start'] - x / 2: img = blend(shot_img(s, t), shot_img(nx, t), nx['in'], (t - (nx['start'] - x / 2)) / x, nx)
        x = XF.get(s['in'], 0)
        if img is None and x and i > 0 and t < s['start'] + x / 2: img = blend(shot_img(segs[i - 1], t), shot_img(s, t), s['in'], (t - (s['start'] - x / 2)) / x, s)
        if img is None:
            # Strike & freeze: the blow freezes with a white flash and a jolt
            if look == 'strike' and s.get('kind') == 'shot' and s.get('fx') == '' and s['lens'] in ('bullet', 'flash', 'ecu', 'insert') and 0.35 < t - s['start'] < 0.95:
                key = id(s); freeze.setdefault(key, shot_img(s, s['start'] + 0.35)); img = freeze[key].copy(); k = t - s['start'] - 0.35
                img = img * (1 - max(0, 0.7 - k * 3)) + 255 * max(0, 0.7 - k * 3); img = np.roll(img, int(6 * math.sin(k * 60) * max(0, 1 - k * 2)), axis=0)
            else: img = shot_img(s, t)
        img = overlays(img, look, t, s, 0)
        img = grade(img, look, t)
        bar = BAR if L['box'] is True else 0
        if L['box'] == 'dyn':
            tgt = s.get('bar', BAR); prev = segs[i - 1].get('bar', BAR) if i > 0 else BAR; v = SC.ease(min(1.0, (t - s['start']) / 1.0)); bar = int(prev + (tgt - prev) * v)
        if s.get('kind') == 'panels' or s.get('kind') == 'card': bar = BAR
        if bar: img[:bar] = 0; img[H - bar:] = 0
        if t < 1.0: img = img * SC.ease(t / 1.0)
        if t > ed['length'] - 1.4: img = img * SC.ease(max(0.0, (ed['length'] - t) / 1.4))
        p.stdin.write(np.clip(img, 0, 255).astype(np.uint8).tobytes())
    p.stdin.close(); p.wait()


def saga_cues(scene):
    """Saga (round 122) keeps its video; its words are given the new pacing over its own shots"""
    f = os.path.join(ROOT, 'lab', 'preview', 'looks', 'cl_%s_saga.json' % scene); e = json.load(open(f)); cues = []
    for fr in e['frames']:
        F = frag(fr['cap']); n = len(fr['shots']); t = fr['start']; spans = []
        for x in fr['shots']: spans.append([t, t + x[4], x[1]]); t += x[4]
        talk = [i for i in range(n) if not (i == 0 and n >= 2 and spans[0][2] in WIDE)] or [n - 1]
        if fr['n'] and n >= 2 and any(x[1] in ('bullet', 'flash') for x in fr['shots']): talk = [n - 1]
        k = len(talk); per = [len(F) // k + (1 if i < len(F) % k else 0) for i in range(k)]; i0 = 0
        for j, ti in enumerate(talk):
            sh = F[i0:i0 + per[j]]; i0 += per[j]
            if not sh: continue
            a, b = spans[ti][0], spans[ti][1]
            if ti == talk[-1]: b = fr['end']
            need = sum(rt(p) for p in sh) * (0.62 if len(sh) > 1 else 1) + 0.6
            if b - a < need: a = max(fr['start'], b - need - 0.2)
            t0 = a + 0.4; parts = []; tt = t0
            for p in sh: parts.append([p, round(tt, 2)]); tt += rt(p) * (0.62 if len(sh) > 1 else 1) + 0.15
            cues.append([round(t0, 2), round(max(tt + 0.6, b - 0.35), 2), parts, 'bar'])
    e['cues'] = cues; json.dump(e, open(f, 'w'), indent=1); return len(cues)


def main():
    a = [x for x in sys.argv[1:] if not x.startswith('--')]
    if '--src' in sys.argv: a = [y for y in a if y != sys.argv[sys.argv.index('--src') + 1]]
    scene = a[0]; looks = a[1:] or [k for k, v in LOOKS2.items() if v['scene'] == scene]
    outd = os.path.join(ROOT, 'lab', 'preview', 'looks'); os.makedirs(outd, exist_ok=True)
    for look in looks:
        if look == 'saga': print('✓ saga cues', scene, saga_cues(scene)); continue
        ed = plan(scene, look); out = os.path.join(outd, 'cl_%s_%s.mp4' % (scene, look))
        if '--plan' not in sys.argv: render(ed, sys.argv[sys.argv.index('--src') + 1], out)
        J = {'scene': scene, 'name': ed['name'], 'look': look, 'lookName': ed['lookName'], 'length': ed['length'], 'cues': ed['cues'],
             'frames': [{'n': f['n'], 'title': f['title'], 'cap': f['cap'], 'start': f['start'], 'end': f['end'], 'shots': [[s['k'], s['lens'], s['move'], s['in'], s['dur']] for s in f['shots']]} for f in ed['frames']]}
        json.dump(J, open(out[:-4] + '.json', 'w'), indent=1)
        print('✓', scene, look, '%.1f s' % ed['length'], ('%.1f MB' % (os.path.getsize(out) / 1e6)) if os.path.exists(out) else '', len(ed['cues']), 'cues', flush=True)


if __name__ == '__main__':
    main()
