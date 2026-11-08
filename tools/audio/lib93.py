"""Round 93: one fresh library take per effect where the Sonniss library has a fitting recording that was never offered before
(audio/library/catalog.json from lib_catalog.py; the map is tools/audio/lib93_map.json — regexes over pack, name and the file's own tags).
Round 93: of 31 found, 12 were kept as truly thematic (ice cracking, a firework whistle for Starfall, coins, building collapse …); the 19 that only
matched by pack (a typewriter for a page, a chainsaw for chopping …) went to _to_delete/lib93_rejected and are out of the map.
→ audio/incoming/<id>.r1.mp3 (the cutting as lib_picks.py: a separate hit, about the effect's length, soft start, gentle fade).
    python tools/audio/lib93.py [--ids a,b] [--force]      round 93b: --map lib93b_map.json --slot r2 (the 2015-2017 bundles)
"""
import os, sys, json, re, zipfile, subprocess, hashlib, tempfile
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
LIB = os.path.join(ROOT, 'audio', 'library'); INC = os.path.join(ROOT, 'audio', 'incoming')
CACHE = os.path.join(tempfile.gettempdir(), 'zlibcache'); os.makedirs(CACHE, exist_ok=True)
args = sys.argv[1:]; FORCE = '--force' in args; ONLY = set(args[args.index('--ids') + 1].split(',')) if '--ids' in args else None
C = json.load(open(os.path.join(LIB, 'catalog.json'), encoding='utf-8'))['files']
MAPF = args[args.index('--map') + 1] if '--map' in args else 'lib93_map.json'; SLOT = args[args.index('--slot') + 1] if '--slot' in args else 'r1'      # round 93b: the 2015-2017 bundles → lib93b_map.json, --slot r2
M = json.load(open(os.path.join(ROOT, 'tools', 'audio', MAPF), encoding='utf-8'))
src = open(os.path.join(ROOT, 'tools', 'audio', 'lib_picks.py'), encoding='utf-8').read()
OLD = set(m.lower() for m in re.findall(r"'([^']{6,})'", src.split('MAP = {', 1)[1]))      # every recording offered in rounds 84 and 84c
def fresh(f): n = f['path'].lower(); return '__macosx' not in n and not os.path.basename(n).startswith('._') and not any(o in n for o in OLD)      # round 93b: not the Mac resource-fork copies in the 2015-2017 zips
def ff(*a):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-y', '-loglevel', 'error', *a], capture_output=True, text=True)
    if r.returncode: raise RuntimeError(r.stderr[-300:])
def local(f):
    h = hashlib.md5(f['path'].encode()).hexdigest()[:12]; dst = os.path.join(CACHE, h + '.wav')
    if os.path.isfile(dst): return dst
    raw = os.path.join(CACHE, h + '.raw' + os.path.splitext(f['path'])[1])
    with zipfile.ZipFile(os.path.join(LIB, f['zip'])) as Z, Z.open(f['path']) as s, open(raw, 'wb') as o:
        while True:
            b = s.read(1 << 20)
            if not b: break
            o.write(b)
    ff('-i', raw, '-t', '90', '-ac', '2', '-ar', '44100', '-c:a', 'pcm_s16le', dst); os.remove(raw); return dst
def events(wav, secs):
    vd = subprocess.run(['ffmpeg', '-hide_banner', '-i', wav, '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = re.search(r'max_volume:\s*(-?[0-9.]+) dB', vd); thr = max(-70.0, min(-20.0, (float(m.group(1)) if m else 0.0) - 30.0))
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', wav, '-af', 'silencedetect=noise=%.1fdB:d=0.12' % thr, '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', r)]; en = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', r)]
    ev = []; s0 = 0.0
    for i in range(len(st)):
        if st[i] - s0 > 0.04: ev.append([s0, st[i] - s0])
        if i >= len(en): s0 = None; break
        s0 = en[i]
    if s0 is not None: ev.append([s0, 9999.0])
    want = max(0.25, secs); out = []
    for s, l in ev:
        l = min(l, want * 1.6 + 0.3, 8.0)
        if l >= min(0.12, want * 0.5): out.append([max(0.0, s - 0.01), l])
    return out or [[0.0, min(want * 1.6 + 0.3, 8.0)]]
def render(wav, seg, dst):
    s, l = seg; fo = max(0.03, l * 0.25)
    ff('-ss', '%.3f' % s, '-t', '%.3f' % l, '-i', wav, '-af', 'highpass=f=50,lowpass=f=12000,afade=t=in:d=0.006,afade=t=out:st=%.3f:d=%.3f,alimiter=limit=0.89' % (max(0, l - fo), fo),
       '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', dst)
cues = {c['id']: c for c in json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'audio.json'), encoding='utf-8'))['cues'] if c['kind'] == 'sfx'}
usedrec = set(); made = 0; miss = []
for cid, rxs in M.items():
    if ONLY and cid not in ONLY: continue
    dst = os.path.join(INC, cid + '.' + SLOT + '.mp3')
    if os.path.isfile(dst) and not FORCE: continue
    pick = None
    for rx in rxs:
        R = re.compile(rx, re.I); L = [f for f in C if fresh(f) and R.search(f['pack'] + ' ' + f['name'] + ' ' + ' '.join(f['tags']))]
        L.sort(key=lambda f: (f['path'] in usedrec, f['mb']))
        if L: pick = L[0]; break
    if not pick: miss.append(cid); continue
    try:
        w = local(pick); ev = events(w, float(cues[cid]['secs'])); seg = ev[min(len(ev) - 1, 1 if pick['path'] in usedrec else 0)]
        render(w, seg, dst); usedrec.add(pick['path']); made += 1; print('✓ %-24s ← %s' % (cid, os.path.basename(pick['path'])[:70]))
    except Exception as x: print('X %s %s' % (cid, x))
print('\n%d library takes made%s' % (made, ('; none found for ' + ', '.join(miss)) if miss else ''))
