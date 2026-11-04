"""Round 88: the music in the Lab (Kris: "update the lab with my music picks in there … link these to the lab").

For every piece of music in the game (assets/audio/index.json, kind "music"), a 2-minute preview for the Lab:
  lab/preview/music/<take>.mp3          the first 2 minutes (a 3 s fade at the end), 96 kbps — small enough for the claude.ai Lab
  lab/src/js/79k2-lab-music-list.js     LABMU.IN = {cue: [[take, seconds], …]} — the list the Lab's players read (79k-lab-music-in.js)
A preview is made again only when the game's file is newer.          python tools/audio/music_preview.py   [--force]
Then: node build.mjs (the Lab), and publish the Lab with the new previews.
"""
import os, sys, json, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
AS, OUT = os.path.join(ROOT, 'assets', 'audio'), os.path.join(ROOT, 'lab', 'preview', 'music')
FORCE = '--force' in sys.argv
SECS, FADE = 120, 3
idx = json.load(open(os.path.join(AS, 'index.json'), encoding='utf-8'))
os.makedirs(OUT, exist_ok=True)
IN, made = {}, 0
for cid in sorted(idx):
    e = idx[cid]
    if e.get('kind') != 'music' or not cid.startswith('mu_'): continue
    for f in e.get('files', []):
        base = f['base']; src = os.path.join(AS, base + '.mp3'); dst = os.path.join(OUT, base + '.mp3')
        if not os.path.isfile(src): print('?  %s: no %s.mp3 in assets/audio' % (cid, base)); continue
        IN.setdefault(cid, []).append([base, round(f.get('secs') or 0)])
        if not FORCE and os.path.isfile(dst) and os.path.getmtime(dst) >= os.path.getmtime(src): continue
        n = min(SECS, f.get('secs') or SECS)
        r = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', src, '-t', str(n), '-af', 'afade=t=out:st=%s:d=%s' % (max(0, n - FADE), FADE),
                            '-ac', '2', '-ar', '44100', '-b:a', '96k', dst], capture_output=True, text=True)
        if r.returncode: print('!  %s: %s' % (base, r.stderr[-300:])); continue
        made += 1; print('%-22s %s  ->  lab/preview/music/%s.mp3' % (base, '%d:%02d' % divmod(round(f.get('secs') or 0), 60), base))
js = ('// made by tools/audio/music_preview.py from assets/audio/index.json — do not edit by hand\n'
      'if(typeof LABMU!==\'undefined\')LABMU.IN=' + json.dumps(IN, separators=(',', ':')) + ';\n')
open(os.path.join(ROOT, 'lab', 'src', 'js', '79k2-lab-music-list.js'), 'w', encoding='utf-8').write(js)
print('\n%d preview(s) made; %d pieces in the Lab list (lab/src/js/79k2-lab-music-list.js)' % (made, len(IN)))
