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


def read(line):
    return 1.4 + len(str(line or '').split()) * 0.36


def plan_edit(scene, plan, picks):
    sc = next(s for s in plan['scenes'] if s['id'] == scene)
    frames, t = [], 0.0
    for b in sc['beats']:
        key = '%s_%02d' % (scene, b['n']); pk = picks.get(key) or {}
        by_k = {x['k']: x for x in b['shots']}
        keep = [k for k in pk.get('keep', []) if k in by_k] or ([x['k'] for x in b['shots'] if x.get('top')] or [x['k'] for x in b['shots']][:2])
        shots = [dict(by_k[k]) for k in keep]
        act = b['n'] in ACTION.get(scene, [])
        need = len(shots) * (1.15 if act else 1.6)
        total = max(read(b['cap']) + (0.3 if act else 0.6), need)
        wts = [WEIGHT.get(s['lens'], 1.0) for s in shots]; wts[-1] += 0.25
        for s, w in zip(shots, wts): s['dur'] = round(total * w / sum(wts), 2)
        frames.append({'n': b['n'], 'title': b['title'], 'cap': b['cap'], 'by': pk.get('by', 'kris'), 'action': act, 'shots': shots, 'dur': round(total, 2)})
    # camera moves: the next shot decides
    flat = [s for f in frames for s in f['shots']]; side = 1
    for i, s in enumerate(flat):
        if s.get('move') in ('shake', 'tiltU', 'tiltD', 'orbit', 'push', 'pull', 'panL', 'panR', 'crane'):
            continue
        a = SCALE.get(s['lens'], 1.5)
        if i == len(flat) - 1: s['move'] = 'pull'
        elif i == 0: s['move'] = 'push'
        else:
            b2 = SCALE.get(flat[i + 1]['lens'], 1.5)
            if b2 > a + 0.4: s['move'] = 'push'
            elif b2 < a - 0.4: s['move'] = 'pull'
            else: s['move'] = 'panR' if side > 0 else 'panL'; side = -side
    # cuts and times: hard cuts inside a frame, a dissolve (or a flash) between frames
    for fi, f in enumerate(frames):
        for j, s in enumerate(f['shots']):
            if fi == 0 and j == 0: s['in'] = 'fade'
            elif j == 0: s['in'] = {'white': 'flash', 'blue': 'flashblue'}.get(FLASH_IN.get(scene, {}).get(f['n']), 'dissolve')
            else: s['in'] = {'flashblue': 'flashblue', 'flash': 'flash'}.get(s.get('cut'), 'cut')
    XF = {'dissolve': 0.45, 'flash': 0.3, 'flashblue': 0.3, 'fade': 0.7, 'cut': 0.0}
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
    """zoom and offset at progress u (0..1) for a move; close-ups move least"""
    k = 0.55 if close else 1.0; e = ease(u)
    if move == 'push': return 1.04 + 0.12 * k * e, 0, 0, 0
    if move == 'pull': return 1.16 - 0.12 * k * e, 0, 0, 0
    if move == 'panR': return 1.10, (-0.7 + 1.4 * e) * k, 0, 0
    if move == 'panL': return 1.10, (0.7 - 1.4 * e) * k, 0, 0
    if move == 'tiltU': return 1.12, 0, (0.8 - 1.6 * e), 0
    if move == 'tiltD': return 1.12, 0, (-0.8 + 1.6 * e), 0
    if move == 'crane': return 1.12 - 0.06 * e, 0, (0.8 - 1.4 * e), 0
    if move == 'orbit': return 1.12 + 0.03 * math.sin(e * math.pi), (-0.5 + 1.0 * e) * k, 0, -1.2 + 2.4 * e
    if move == 'shake':
        a = max(0.0, 1 - u * 1.6)
        return 1.10, math.sin(t * 61) * 0.25 * a, math.cos(t * 47) * 0.25 * a, math.sin(t * 37) * 0.6 * a
    return 1.06, 0, 0, 0


def render(ed, src, out):
    flat = [s for f in ed['frames'] for s in f['shots']]
    pics = {s['id']: load_pic(src, s['id']) for s in flat}
    total = int(round(ed['length'] * FPS))
    p = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', '%dx%d' % (W, H), '-r', str(FPS), '-i', '-',
                          '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
    XF = {'dissolve': 0.45, 'flash': 0.3, 'flashblue': 0.3, 'fade': 0.7}

    def shot_frame(i, t):
        s = flat[i]; d = s['dur'] + (XF.get(flat[i + 1]['in'], 0) / 2 if i + 1 < len(flat) else 1.0)      # a shot runs on under the dissolve after it
        u = min(1.0, max(0.0, (t - s['start'] + XF.get(s['in'], 0) / 2) / (d + XF.get(s['in'], 0) / 2)))
        z, ox, oy, r = camera(s['move'], u, SCALE.get(s['lens'], 1.5) >= 3, t)
        return view(pics[s['id']], z, ox, oy, r)

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
                else:
                    col = np.array([255, 255, 255] if nx['in'] == 'flash' else [170, 235, 255], dtype=np.float32); v = min(1.0, 2 * v)
                    img = img * (1 - v) + col * v
        s = flat[i]; x = XF.get(s['in'], 0)
        if x and t < s['start'] + x / 2 and i > 0 and s['in'] in ('flash', 'flashblue'):
            v = min(1.0, 2 * (1 - (t - (s['start'] - x / 2)) / x))
            col = np.array([255, 255, 255] if s['in'] == 'flash' else [170, 235, 255], dtype=np.float32); img = img * (1 - v) + col * v
        elif x and t < s['start'] + x / 2 and i > 0 and s['in'] == 'dissolve':
            v = (t - (s['start'] - x / 2)) / x; img = shot_frame(i - 1, t) * (1 - ease(v)) + img * ease(v)
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
