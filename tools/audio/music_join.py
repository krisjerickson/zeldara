"""Round 121: the music in the main Lab (Kris: "i don't think i've selected all of the music i need to, but don't see this in the lab. float
these into the updated lab"). A Lab holds at most 511 files, so the 2-minute previews of every piece are joined into two files:
  lab/preview/music/mu_join_1.mp3, mu_join_2.mp3      (64 kbps, each under 15 MB)
  lab/src/js/79k3-lab-music-join.js                   LABMU.JOIN = {take: [file, start, end]} — the players play their part (#t=start,end)
python tools/audio/music_join.py   (after music_preview.py; needs ffmpeg)"""
import os, sys, json, subprocess, tempfile
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
PV = os.path.join(ROOT, 'lab', 'preview', 'music')
takes = sorted(f[:-4] for f in os.listdir(PV) if f.endswith('.mp3') and not f.startswith('mu_join'))
def dur(p):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True)
    return float(r.stdout.strip() or 0)
half = (len(takes) + 1) // 2; J = {}; GAP = 1.0
for n, group in enumerate([takes[:half], takes[half:]], 1):
    if not group: continue
    tmp = tempfile.mkdtemp(); parts = []; t = 0.0
    for i, tk in enumerate(group):
        src = os.path.join(PV, tk + '.mp3'); w = os.path.join(tmp, '%02d.wav' % i)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-af', 'apad=pad_dur=%s' % GAP, '-ac', '2', '-ar', '44100', w], check=True)
        d = dur(w); J[tk] = ['mu_join_%d' % n, round(t, 2), round(t + d - GAP, 2)]; t += d; parts.append(w)
    lst = os.path.join(tmp, 'l.txt'); open(lst, 'w').write(''.join("file '%s'\n" % p for p in parts))
    out = os.path.join(PV, 'mu_join_%d.mp3' % n)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-b:a', '64k', out], check=True)
    print('%s  %d pieces  %.1f MB' % (out, len(group), os.path.getsize(out) / 1e6))
open(os.path.join(ROOT, 'lab', 'src', 'js', '79k3-lab-music-join.js'), 'w').write('// made by tools/audio/music_join.py — the music previews, joined (round 121)\nif(typeof LABMU!==\'undefined\')LABMU.JOIN=' + json.dumps(J, separators=(',', ':')) + ';\n')
