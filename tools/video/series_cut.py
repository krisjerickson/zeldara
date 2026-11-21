#!/usr/bin/env python3
"""The final cut of a story cut-scene from its shot series (round 118).

Kris: "we still need to edit for final cut scene videos, especially making sure we adjust the pace of shots per the words coming out and
number of images selected, as well as zooming in or out, depending on how the shot is changing. do that for the first spirit freed cutscene".

    python tools/video/series_cut.py spirit                 the cut for one cut-scene (Zeldor's version)
    python tools/video/series_cut.py spirit --plan          only print the edit (no video)
    python tools/video/series_cut.py spirit --src DIR       where the shot pictures are (default sprites/incoming; .png or .jpg)

Reads   sprites/requests/series_plan.json    every frame's shots (made by build.mjs from src/js/07zt9b-shot-series.js)
        sprites/requests/series_picks.json   the shots kept per frame, in the order they play (Kris's picks from the Lab, and mine
                                             where a frame has none yet — marked "by": "claude")
Writes  assets/video/sb_<scene>_m.mp4        the cut, 1280×720, 24 fps, no sound (the game plays the cut-scene's music under it)
        assets/video/sb_<scene>_m.json       the edit: every shot's start, length, camera move and the cut into it; the frame cuts
        lab/preview/cuts/sb_<scene>_m.mp4    the same video for the Lab (Shot series — pick › The final cut)
        src/js/16w3-series-cuts.js           ZSC.CLIPS for every cut made so far (the game plays each frame as its part of the video)

THE RULES OF THE EDIT
  Pace — the words set it. A frame stays as long as its line takes to read in the game (ZSC.read: 1.4 s + 0.36 s a word) plus a breath,
  and never shorter than its shots need (1.15 s each for a burst of action, 1.6 s otherwise). The frame's time is shared among its kept
  shots by how much there is to take in: a wide shot gets more, a close-up or an insert less, and the last shot of a frame holds a little
  longer so the line is read before the cut. More shots kept = quicker cutting, the same overall length.
  Camera (round 121) — each frame's mood comes from its words (impact · magic · dread · tender · journey): impacts crash-zoom and shake with
  whip-pans between shots, magic cranes and snaps in with a breathing glow, dread leans (dutch) and creeps with dark edges, tender moments
  sway like a hand-held camera, journeys pan wide; the first shot comes down out of the sky, the last pulls up and away. Otherwise:
  Camera — the next shot decides. If the next shot is tighter (wide → close-up), this one pushes in, as if leaning toward it; if it is
  wider, this one pulls back; the same size drifts sideways (alternating). The first shot of the cut-scene pushes in slowly, the last pulls
  back as it fades out. The planned moves of the first series (shake, tilt up, orbit…) are kept. Close-ups and inserts move least.
  Cuts — inside a frame: hard cuts. Between frames: a short dissolve, or a white / rune-blue flash where the plan says so. From black at the
  start, to black at the end. Each frame's part of the video ends when the dissolve into the next frame is complete, so the game, which
  holds on a frame's last picture while its words finish, always holds on a clean picture.
"""
import os, sys, json, math, subprocess
import numpy as np
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
W, H, FPS = 1280, 720, 24
SCALE = {'xwide': 0, 'wide': 0, 'top': 0.5, 'high': 0.8, 'track': 1, 'sil': 1, 'silh': 1, 'two': 1.5, 'ots': 1.5, 'low': 1.5, 'bullet': 1.5,
         'med': 2, 'pov': 2.2, 'react': 2.5, 'close': 3, 'ecu': 4, 'insert': 4, 'macro': 4}
WEIGHT = {'xwide': 1.35, 'wide': 1.3, 'top': 1.2, 'track': 1.1, 'two': 1.1, 'ots': 1.0, 'low': 1.0, 'bullet': 1.0, 'sil': 1.0, 'silh': 1.0,
          'med': 1.0, 'pov': 0.95, 'react': 0.95, 'close': 0.9, 'ecu': 0.85, 'insert': 0.8, 'macro': 0.8}
ACTION = {'spirit': [6]}          # frames cut as a burst of action
FLASH_IN = {'spirit': {6: 'white'}}  # frames that come in on a flash instead of a dissolve


MOODS = [('impact', r'burst|break|broke|shatter|strik|slam|crash|roar|explod|snap|tore|smash|fell upon'),
         ('dread', r'chain|toil|worn|thin|dark|shadow|binder|alone|cold|bound|dread|never'),
         ('tender', r'thank|home|smile|hand in|first to come|embrace|hug|tears'),
         ('magic', r'rune|light|glow|spirit|free|burn|blue|shine|shone|green|remember|magic|stars?'),
         ('journey', r'drift|over the hills|toward|ran out|road|walk|travel|sail|across')]
MOVES = ('push', 'pull', 'panR', 'panL', 'tiltU', 'tiltD', 'crane', 'orbit', 'shake', 'establish', 'farewell', 'crash', 'whipshake', 'snapglow', 'dutch', 'creep', 'handheld', 'arc')
import re as _re
def mood(text, action):
    t = (text or '').lower()
    if action: return 'impact'
    for m, rx in MOODS:
        if _re.search(rx, t): return m
    return ''


def read(line):
    return 1.4 + len(str(line or '').split()) * 0.36


_SB = None
def sb_id(scene, n):
    """the story frame's own painting: sc_sb_<scene>_<nn> (shared) or sc_sb_<scene>_<nn>_m (Zeldor's)"""
    global _SB
    if _SB is None:
        _SB = {q['id'] for q in json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'scenery.json'), encoding='utf-8'))['requests'] if q['id'].startswith('sc_sb_')}
    base = 'sc_sb_%s_%02d' % (scene, n)
    return base + '_m' if base + '_m' in _SB else base


def plan_edit(scene, plan, picks):
    sc = next(s for s in plan['scenes'] if s['id'] == scene)
    frames, t = [], 0.0
    for b in sc['beats']:
        key = '%s_%02d' % (scene, b['n']); pk = picks.get(key) or {}
        by_k = {x['k']: x for x in b['shots']}
        by_k[0] = {'k': 0, 'lens': 'wide', 'who': '', 'id': sb_id(scene, b['n'])}      # round 121: the frame's own painting can be kept (Kris's pick 0)
        keep = [k for k in pk.get('keep', []) if k in by_k] or ([x['k'] for x in b['shots'] if x.get('top')] or [x['k'] for x in b['shots']][:2])
        shots = [dict(by_k[k]) for k in keep]
        act = b['n'] in ACTION.get(scene, [])
        need = len(shots) * (1.15 if act else 1.6)
        total = max(read(b['cap']) + (0.3 if act else 0.6), need)
        wts = [WEIGHT.get(s['lens'], 1.0) for s in shots]; wts[-1] += 0.25
        for s, w in zip(shots, wts): s['dur'] = round(total * w / sum(wts), 2)
        frames.append({'n': b['n'], 'title': b['title'], 'cap': b['cap'], 'by': pk.get('by', 'kris'), 'action': act, 'shots': shots, 'dur': round(total, 2)})
    # camera moves (round 121, Kris: "the special effects applied to the first set of images were better … zooming in, out, to the side,
    # vibrating for effect … make all of these cutscene progressions cinematic"): each frame's MOOD comes from its words, and the mood,
    # the lens and the next shot choose the move. The planned moves (TOP) are kept.
    flat = [s for f in frames for s in f['shots']]; side = 1; prev = None
    for fi, f in enumerate(frames):
        f['mood'] = mood(f['cap'] + ' ' + f['title'], f['action'])
        for j, s in enumerate(f['shots']):
            i = flat.index(s)
            if s.get('move') in MOVES and s.get('top'): prev = s['move']; continue
            a = SCALE.get(s['lens'], 1.5); nxt = flat[i + 1] if i + 1 < len(flat) else None; b2 = SCALE.get(nxt['lens'], 1.5) if nxt else a; m = f['mood']
            if i == 0: mv = 'establish'
            elif i == len(flat) - 1: mv = 'farewell'
            elif m == 'impact': mv = 'crash' if j == 0 else ('whipshake' if j % 2 else 'shake')
            elif m == 'magic': mv = 'crane' if a <= 1 else 'snapglow' if a >= 3 else 'orbit'
            elif m == 'dread': mv = 'dutch' if a >= 2 else 'creep'
            elif m == 'tender': mv = 'handheld' if a >= 2 else 'arc'
            elif m == 'journey': mv = ('panR' if side > 0 else 'panL') if a <= 1.5 else 'push'
            else: mv = 'push' if b2 > a + 0.4 else 'pull' if b2 < a - 0.4 else ('panR' if side > 0 else 'panL')
            if mv in ('panR', 'panL'): side = -side
            if mv == prev and mv not in ('shake',): mv = {'push': 'dutch', 'pull': 'crane', 'crane': 'pull', 'orbit': 'push', 'handheld': 'arc', 'arc': 'handheld', 'creep': 'dutch', 'dutch': 'creep'}.get(mv, mv)
            s['move'] = mv; s['fx'] = {'impact': 'shake', 'magic': 'glow', 'dread': 'dark', 'tender': 'warm'}.get(m, ''); prev = mv
    # cuts and times: hard cuts inside a frame, a dissolve (or a flash) between frames
    for fi, f in enumerate(frames):
        for j, s in enumerate(f['shots']):
            if fi == 0 and j == 0: s['in'] = 'fade'
            elif j == 0: s['in'] = {'white': 'flash', 'blue': 'flashblue'}.get(FLASH_IN.get(scene, {}).get(f['n'])) or ('flash' if f['mood'] == 'impact' else 'flashblue' if f['mood'] == 'magic' and 'rune' in f['cap'].lower() else 'dissolve')
            else: s['in'] = {'flashblue': 'flashblue', 'flash': 'flash'}.get(s.get('cut')) or ('whip' if f['mood'] in ('impact', 'journey') else 'cut')
    XF = {'dissolve': 0.45, 'flash': 0.3, 'flashblue': 0.3, 'fade': 0.7, 'cut': 0.0, 'whip': 0.24}
    t = 0.0
    for f in frames:
        f['start'] = round(t, 3)
        for s in f['shots']: s['start'] = round(t, 3); t += s['dur']
        f['end'] = round(t, 3)
    # the frame cuts: each part ends once the dissolve into the next frame is done
    cuts = [0.0] + [round(f['end'] + XF.get(frames[i + 1]['shots'][0]['in'], 0) / 2, 3) for i, f in enumerate(frames[:-1])] + [round(t + 1.0, 3)]
    return {'scene': scene, 'name': sc['name'], 'hero': 'm', 'fps': FPS, 'size': [W, H], 'frames': frames, 'cuts': cuts, 'length': round(t + 1.0, 3)}


def load_pic(src, sid):
    for ext in ('.png', '.jpg'):
        p = os.path.join(src, sid + ext)
        if os.path.exists(p):
            im = Image.open(p).convert('RGB'); w, h = im.size; ch = int(w * 9 / 16)
            if ch < h: top = int((h - ch) * 0.45); im = im.crop((0, top, w, top + ch))      # 3:2 → 16:9, a little above the middle (faces sit high)
            return im
    raise SystemExit('missing picture: ' + sid + ' in ' + src)


def view(im, z, ox, oy, rot=0.0):
    """the part of the picture the camera sees: zoom z ≥ 1, offset ox, oy in −1..1 of the spare room"""
    w, h = im.size; cw, chh = w / z, h / z; x0 = (w - cw) / 2 * (1 + ox); y0 = (h - chh) / 2 * (1 + oy)
    fr = im.transform((W, H), Image.Transform.EXTENT, (x0, y0, x0 + cw, y0 + chh), Image.Resampling.BICUBIC)
    if rot: fr = fr.rotate(rot, resample=Image.Resampling.BICUBIC, expand=False, fillcolor=(0, 0, 0)) if abs(rot) > 0.01 else fr
    return np.asarray(fr, dtype=np.float32)


def ease(u): return u * u * (3 - 2 * u)


def camera(move, u, close, t):
    """zoom, x / y offset (−1..1 of the spare room) and roll at progress u (0..1); close-ups move a little less"""
    k = 0.75 if close else 1.0; e = ease(u)
    sway = lambda a: (math.sin(t * 1.7) * 0.10 * a + math.sin(t * 2.9 + 1) * 0.06 * a, math.cos(t * 1.3) * 0.08 * a + math.sin(t * 3.7) * 0.04 * a)
    if move == 'push': return 1.04 + 0.22 * k * e, 0, -0.08 * e, 0
    if move == 'pull': return 1.26 - 0.22 * k * e, 0, 0, 0
    if move == 'panR': return 1.18, (-0.95 + 1.9 * e) * k, 0, 0
    if move == 'panL': return 1.18, (0.95 - 1.9 * e) * k, 0, 0
    if move == 'tiltU': return 1.16, 0, (0.9 - 1.8 * e), 0
    if move == 'tiltD': return 1.16, 0, (-0.9 + 1.8 * e), 0
    if move == 'crane': return 1.22 - 0.12 * e, 0, (0.9 - 1.6 * e), 0
    if move == 'establish': return 1.32 - 0.24 * e, 0, (-0.8 + 1.0 * e), 0            # down out of the sky, opening up
    if move == 'farewell': return 1.0 + 0.30 * (1 - e), 0, (0.2 - 0.6 * e), 0          # pulls up and away
    if move == 'orbit': return 1.18 + 0.05 * math.sin(e * math.pi), (-0.7 + 1.4 * e) * k, 0, -2.0 + 4.0 * e
    if move == 'arc': return 1.14 + 0.06 * e, (0.5 - 1.0 * e) * k, 0, 1.0 - 2.0 * e
    if move == 'dutch': return 1.08 + 0.18 * e, 0, 0, 3.5 * e                           # a slow lean, the world off true
    if move == 'creep': return 1.02 + 0.12 * e, 0, 0.15 * e, 0                          # a slow, uneasy push
    if move == 'handheld': x, y = sway(1.0); return 1.10 + 0.10 * e, x, y, math.sin(t * 1.1) * 0.6
    if move == 'snapglow':                                                               # a snap in, then a slow drift
        z = 1.0 + 0.30 * min(1.0, u / 0.18) ** 0.5 + 0.04 * e; return z, 0, -0.1, 0
    if move in ('shake', 'crash', 'whipshake'):
        a = max(0.0, 1 - u * (1.3 if move == 'shake' else 1.0))
        z = (1.0 + 0.32 * min(1.0, u / 0.12)) if move == 'crash' else 1.16 + 0.06 * e
        ox = (0.6 - 1.2 * e) if move == 'whipshake' else 0
        return z, ox + math.sin(t * 61) * 0.35 * a, math.cos(t * 47) * 0.35 * a, math.sin(t * 37) * 1.4 * a
    return 1.08, 0, 0, 0


def mblur(img, n):
    """a horizontal motion blur n pixels long (the whip)"""
    if n < 2: return img
    c = np.cumsum(np.pad(img, ((0, 0), (n, 0), (0, 0)), mode='edge'), axis=1); return (c[:, n:] - c[:, :-n]) / n


def effects(img, fx, u, t):
    """the look of the shot's mood: a vignette always, a breathing glow for magic, darker edges for dread, warmth for tenderness"""
    h, w = img.shape[:2]
    if not hasattr(effects, 'V'):
        yy, xx = np.mgrid[0:h, 0:w]; d = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2); effects.V = np.clip(1 - 0.38 * (d - 0.55), 0.45, 1.0)[..., None].astype(np.float32)
    V = effects.V
    if fx == 'dark': img = img * (V ** 2.2) * 0.93
    else: img = img * V
    if fx == 'glow':
        small = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).resize((w // 8, h // 8), Image.Resampling.BILINEAR)
        from PIL import ImageFilter
        bl = np.asarray(small.filter(ImageFilter.GaussianBlur(3)).resize((w, h), Image.Resampling.BILINEAR), dtype=np.float32)
        a = 0.22 + 0.12 * math.sin(t * 3.0); img = img + np.clip(bl - 90, 0, 255) * a * np.array([0.75, 0.95, 1.1], dtype=np.float32)
    if fx == 'warm': img = img * np.array([1.05, 1.0, 0.93], dtype=np.float32)
    return img


def render(ed, src, out):
    flat = [s for f in ed['frames'] for s in f['shots']]
    pics = {s['id']: load_pic(src, s['id']) for s in flat}
    total = int(round(ed['length'] * FPS))
    p = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', '%dx%d' % (W, H), '-r', str(FPS), '-i', '-',
                          '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
    XF = {'dissolve': 0.45, 'flash': 0.3, 'flashblue': 0.3, 'fade': 0.7, 'whip': 0.24}

    def shot_frame(i, t):
        s = flat[i]; d = s['dur'] + (XF.get(flat[i + 1]['in'], 0) / 2 if i + 1 < len(flat) else 1.0)      # a shot runs on under the dissolve after it
        u = min(1.0, max(0.0, (t - s['start'] + XF.get(s['in'], 0) / 2) / (d + XF.get(s['in'], 0) / 2)))
        z, ox, oy, r = camera(s['move'], u, SCALE.get(s['lens'], 1.5) >= 3, t)
        return effects(view(pics[s['id']], z, ox, oy, r), s.get('fx', ''), u, t)

    for fn in range(total):
        t = fn / FPS
        i = max(k for k, s in enumerate(flat) if s['start'] <= t + 1e-6) if t >= flat[0]['start'] else 0
        img = shot_frame(i, t)
        # the transition into this shot, half before its start (from the previous shot) and half after
        if i + 1 < len(flat):
            nx = flat[i + 1]; x = XF.get(nx['in'], 0)
            if x and t > nx['start'] - x / 2:
                v = (t - (nx['start'] - x / 2)) / x
                if nx['in'] == 'dissolve': img = img * (1 - ease(v)) + shot_frame(i + 1, t) * ease(v)
                elif nx['in'] == 'whip':
                    k = int(140 * math.sin(math.pi * v)); img = mblur(img, k) * (1 - v) + mblur(shot_frame(i + 1, t), k) * v
                else:
                    col = np.array([255, 255, 255] if nx['in'] == 'flash' else [170, 235, 255], dtype=np.float32); v = min(1.0, 2 * v)
                    img = img * (1 - v) + col * v
        s = flat[i]; x = XF.get(s['in'], 0)
        if x and t < s['start'] + x / 2 and i > 0 and s['in'] in ('flash', 'flashblue'):
            v = min(1.0, 2 * (1 - (t - (s['start'] - x / 2)) / x))
            col = np.array([255, 255, 255] if s['in'] == 'flash' else [170, 235, 255], dtype=np.float32); img = img * (1 - v) + col * v
        elif x and t < s['start'] + x / 2 and i > 0 and s['in'] == 'dissolve':
            v = (t - (s['start'] - x / 2)) / x; img = shot_frame(i - 1, t) * (1 - ease(v)) + img * ease(v)
        elif x and t < s['start'] + x / 2 and i > 0 and s['in'] == 'whip':
            v = (t - (s['start'] - x / 2)) / x; k = int(140 * math.sin(math.pi * v)); img = mblur(shot_frame(i - 1, t), k) * (1 - v) + mblur(img, k) * v
        if t < 0.7: img = img * ease(t / 0.7)                                       # from black
        if t > ed['length'] - 1.0: img = img * ease(max(0.0, (ed['length'] - t) / 1.0))   # to black
        p.stdin.write(np.clip(img, 0, 255).astype(np.uint8).tobytes())
    p.stdin.close(); p.wait()


def write_clips():
    d = os.path.join(ROOT, 'assets', 'video'); C = {}
    for f in sorted(os.listdir(d)):
        if f.startswith('sb_') and f.endswith('_m.json'):
            e = json.load(open(os.path.join(d, f))); C[e['scene']] = [{'vid': f[:-5], 'from': 1, 'to': len(e['frames']), 'cuts': e['cuts'], 'hero': 'm'}]
    js = ('// ═══════════════════════════════════════════════════════════════════════\n'
          '// ║ 16w3-series-cuts.js — made by tools/video/series_cut.py (round 118): the story cut-scenes cut from their shot series, as videos.\n'
          '// ║ Each is Zeldor\'s version (hero "m"); Zeldara plays the paintings until hers is cut. Do not edit by hand — run the tool again.\n'
          '// ═══════════════════════════════════════════════════════════════════════\n'
          'if(typeof ZSC!==\'undefined\'){ var _ssc=' + json.dumps(C, separators=(',', ':')) + '; Object.keys(_ssc).forEach(function(k){ ZSC.CLIPS[k]=_ssc[k]; }); }\n')
    open(os.path.join(ROOT, 'src', 'js', '16w3-series-cuts.js'), 'w', encoding='utf-8').write(js)


def main():
    a = [x for x in sys.argv[1:] if not x.startswith('--')]; scene = a[0] if a else 'spirit'
    src = sys.argv[sys.argv.index('--src') + 1] if '--src' in sys.argv else os.path.join(ROOT, 'sprites', 'incoming')
    plan = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'series_plan.json')))
    picks = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'series_picks.json')))
    ed = plan_edit(scene, plan, picks)
    for f in ed['frames']:
        print('%2d %-26s %5.2f s  %s  “%s”' % (f['n'], f['title'][:26], f['dur'], ' · '.join('%d %s %s %s %.1fs' % (s['k'], s['lens'], s['in'], s['move'], s['dur']) for s in f['shots']), f['cap']))
    print('length %.1f s · frame cuts %s' % (ed['length'], ed['cuts']))
    if '--plan' in sys.argv: return
    out = os.path.join(ROOT, 'assets', 'video', 'sb_%s_m.mp4' % scene); os.makedirs(os.path.dirname(out), exist_ok=True)
    render(ed, src, out)
    json.dump(ed, open(out[:-4] + '.json', 'w'), indent=1)
    write_clips()
    lab = os.path.join(ROOT, 'lab', 'preview', 'cuts'); os.makedirs(lab, exist_ok=True); import shutil; shutil.copy(out, lab)      # the Lab plays it with its words (79u2)
    print('✓', os.path.relpath(out, ROOT), '%.1f MB' % (os.path.getsize(out) / 1e6))


if __name__ == '__main__':
    main()
