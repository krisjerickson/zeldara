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
OUT = os.path.join(ROOT, 'assets', 'video'); os.makedirs(OUT, exist_ok=True)
VID = ('.mp4', '.mov', '.webm', '.m4v')
files = [f for f in sorted(os.listdir(a.src)) if f.lower().endswith(VID)] if os.path.isdir(a.src) else []
def match(f):
    n = os.path.splitext(f)[0].lower()
    hits = [i for i in IDS if i in n]
    return max(hits, key=len) if hits else (n if n.startswith('pn_') and not IDS else None)
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
