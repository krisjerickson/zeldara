"""Round 73: take the made clips in — sprites/video_incoming/<id>.mp4 → assets/video/<id>.mp4 (1280 wide, H.264, small, starts
playing at once on the web; no sound unless --sound: the game's music plays under the cut-scenes). Needs ffmpeg (as for the audio).
  python tools/video/intake_video.py            [--sound] [--from DIR]
Then: node build.mjs (the page learns which clips are in)."""
import os, sys, subprocess, argparse, shutil
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
ap = argparse.ArgumentParser(); ap.add_argument('--sound', action='store_true'); ap.add_argument('--from', dest='src', default=os.path.join(ROOT, 'sprites', 'video_incoming'))
a = ap.parse_args()
FF = shutil.which('ffmpeg') or sys.exit('ffmpeg not found - see docs/32 (the audio intake) for how to get it.')
OUT = os.path.join(ROOT, 'assets', 'video'); os.makedirs(OUT, exist_ok=True); n = 0
for f in sorted(os.listdir(a.src)) if os.path.isdir(a.src) else []:
    if not f.lower().endswith(('.mp4', '.mov', '.webm')): continue
    src = os.path.join(a.src, f); dst = os.path.join(OUT, os.path.splitext(f)[0] + '.mp4')
    if os.path.isfile(dst) and os.path.getmtime(dst) >= os.path.getmtime(src): print('  have  ' + f); continue
    cmd = [FF, '-y', '-loglevel', 'error', '-i', src, '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart']
    cmd += ['-c:a', 'aac', '-b:a', '96k'] if a.sound else ['-an']
    r = subprocess.run(cmd + [dst + '.tmp.mp4'])
    if r.returncode: print('X   ' + f); continue
    os.replace(dst + '.tmp.mp4', dst); n += 1; print('OK  %-26s %.1f MB' % (os.path.basename(dst), os.path.getsize(dst) / 1e6))
print('\n%d clip(s) taken in to assets/video. Now:  node build.mjs' % n)
