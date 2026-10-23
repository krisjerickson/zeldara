"""Round 73: take the made clips in → assets/video/<id>.mp4 (1280 wide, H.264, small, starts playing at once on the web; no sound unless
--sound: the game's music plays under the cut-scenes). Needs ffmpeg (as for the audio).
  python tools/video/intake_video.py                                   from sprites/video_incoming
  python tools/video/intake_video.py --from %USERPROFILE%\\Downloads    from your downloads (round 73b: clips made by hand)
A file whose name holds a clip id (pn_world_tree.mp4, "pn_world_tree (1).mp4", kling_pn_world_tree.mp4) is matched by the id. With --ask,
every other video made in the last --days days (default 2) is shown, and you type the number of the clip it is (Enter skips it).
Then: node build.mjs (the page learns which clips are in)."""
import os, sys, json, subprocess, argparse, shutil, time
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
ap = argparse.ArgumentParser(); ap.add_argument('--sound', action='store_true'); ap.add_argument('--from', dest='src', default=os.path.join(ROOT, 'sprites', 'video_incoming'))
ap.add_argument('--ask', action='store_true'); ap.add_argument('--days', type=float, default=2)
a = ap.parse_args()
FF = shutil.which('ffmpeg') or sys.exit('ffmpeg not found - see docs/32 (the audio intake) for how to get it.')
try: IDS = [c['id'] for c in json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'video.json'), encoding='utf-8'))['clips']]
except Exception: IDS = []
# round 79: the story cut-scenes' montages — <scene>_<who>.mp4 (who: zeldor / zeldara / all) → sb_<scene>_<who>.mp4; or one clip per shot,
# <scene>_<who>_<nn>.mp4, joined here in order (a short fade at each join) once every shot of that montage is in
try:
    SB = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'storyboards.json'), encoding='utf-8'))['scenes']
    for sc in SB:
        whos = ['zeldor', 'zeldara'] if any(len(b['ids']) > 1 for b in sc['beats']) else ['all']
        IDS += ['sb_%s_%s' % (sc['id'], w) for w in whos]
    SBN = {sc['id']: len(sc['beats']) for sc in SB}
except Exception: SB = []; SBN = {}
OUT = os.path.join(ROOT, 'assets', 'video'); os.makedirs(OUT, exist_ok=True)
VID = ('.mp4', '.mov', '.webm', '.m4v')
files = [f for f in sorted(os.listdir(a.src)) if f.lower().endswith(VID)] if os.path.isdir(a.src) else []
def match(f):
    n = os.path.splitext(f)[0].lower()
    if n.startswith('sb_'): n = n[3:]
    for sid in SBN:      # a whole montage: <scene>_<who>
        for w in ('zeldor', 'zeldara', 'all'):
            if n == '%s_%s' % (sid, w) or n.startswith('%s_%s ' % (sid, w)) or n.startswith('%s_%s(' % (sid, w)): return 'sb_%s_%s' % (sid, w)
    hits = [i for i in IDS if i in n]
    return max(hits, key=len) if hits else (n if n.startswith('pn_') and not IDS else None)
# shots of a montage, one clip each: join them when all are there
import re
SHOT = re.compile(r'^(?:sb_)?([a-z0-9]+)_(zeldor|zeldara|all)_(\d\d)')
shots = {}
for f in files:
    m = SHOT.match(os.path.splitext(f)[0].lower())
    if m and m.group(1) in SBN: shots.setdefault((m.group(1), m.group(2)), {})[int(m.group(3))] = f
files = [f for f in files if not (SHOT.match(os.path.splitext(f)[0].lower()) and SHOT.match(os.path.splitext(f)[0].lower()).group(1) in SBN)]
for (sid, w), got in sorted(shots.items()):
    n = SBN[sid]; dst = os.path.join(OUT, 'sb_%s_%s.mp4' % (sid, w))
    if len(got) < n: print('  ..    %s %s: %d of %d shots in - waiting for the rest' % (sid, w, len(got), n)); continue
    if os.path.isfile(dst) and os.path.getmtime(dst) >= max(os.path.getmtime(os.path.join(a.src, g)) for g in got.values()): print('  have  sb_%s_%s' % (sid, w)); continue
    ins = []; flt = []
    for i in range(1, n + 1):
        ins += ['-i', os.path.join(a.src, got[i])]
        flt.append('[%d:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24,fade=t=in:st=0:d=0.25[v%d]' % (i - 1, i - 1))
    flt.append(''.join('[v%d]' % i for i in range(n)) + 'concat=n=%d:v=1:a=0[out]' % n)
    r = subprocess.run([FF, '-y', '-loglevel', 'error'] + ins + ['-filter_complex', ';'.join(flt), '-map', '[out]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', dst + '.tmp.mp4'])
    if r.returncode: print('X   montage %s %s' % (sid, w)); continue
    os.replace(dst + '.tmp.mp4', dst); print('OK  sb_%s_%s.mp4  <- %d shots joined  %.1f MB' % (sid, w, n, os.path.getsize(dst) / 1e6))
pairs = []; loose = []
for f in files:
    i = match(f)
    if i: pairs.append((f, i))
    elif time.time() - os.path.getmtime(os.path.join(a.src, f)) < a.days * 86400: loose.append(f)
if a.ask and loose:
    todo = [i for i in IDS if not os.path.isfile(os.path.join(OUT, i + '.mp4')) and i not in [p[1] for p in pairs]]
    print('\nClips still to make:'); [print('  %2d  %s' % (k + 1, i)) for k, i in enumerate(todo)]
    for f in loose:
        r = input('\n%s  ->  which clip (number, Enter = skip)? ' % f).strip()
        if r.isdigit() and 1 <= int(r) <= len(todo): pairs.append((f, todo[int(r) - 1]))
elif loose: print('%d other video(s) in %s without a clip id in the name - rename them <id>.mp4, or run again with --ask' % (len(loose), a.src))
n = 0
for f, i in pairs:
    src = os.path.join(a.src, f); dst = os.path.join(OUT, i + '.mp4')
    if os.path.isfile(dst) and os.path.getmtime(dst) >= os.path.getmtime(src): print('  have  ' + i); continue
    cmd = [FF, '-y', '-loglevel', 'error', '-i', src, '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart']
    cmd += ['-c:a', 'aac', '-b:a', '96k'] if a.sound else ['-an']
    r = subprocess.run(cmd + [dst + '.tmp.mp4'])
    if r.returncode: print('X   ' + f); continue
    os.replace(dst + '.tmp.mp4', dst); n += 1; print('OK  %-26s <- %s  %.1f MB' % (i + '.mp4', f, os.path.getsize(dst) / 1e6))
print('\n%d clip(s) taken in to assets/video. Now:  node build.mjs' % n)
