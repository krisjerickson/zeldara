"""Round 84: every take of every sound effect, side by side in the Lab (Kris: "let's remake the lab for all the new sound effect picks").
The kinds of take:

  cur        today's sound in the game (assets/audio/<id>.mp3)
  e1, e2     the round-80 gentle takes (audio/incoming/<id>.e1.mp3, .e2.mp3)
  l1 - l3    real recordings cut from the Sonniss GDC library (tools/audio/lib_picks.py)
  n1, n2     ElevenLabs takes worded by what happens (tools/audio/audio3.ps1 → sfx.mjs --set v84)

Each kind is joined into one file (a Lab artifact can only hold so many files), every take through the same trim and loudness as the
game's intake, a short silence between:

  lab/preview/audio/s84_<kind>.mp3      lab/preview/audio/s84.json   {gap, rate, items: {id: {kind: [start, secs]}}}

Then: node build.mjs (the Lab reads s84.json).      python tools/audio/sfx_preview.py   [--kinds l1,l2,l3]
"""
import os, sys, json, re, shutil, subprocess, wave, tempfile
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
INC = os.path.join(ROOT, 'audio', 'incoming'); CUR = os.path.join(ROOT, 'assets', 'audio'); OUT = os.path.join(ROOT, 'lab', 'preview', 'audio')
RATE, GAP = 32000, 0.35
KINDS = ['cur', 'e1', 'e2', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'n1', 'n2']      # round 84c: l4-l6 from the GDC2023 bundle
args = sys.argv[1:]
if '--kinds' in args: KINDS = args[args.index('--kinds') + 1].split(',')
TMP = tempfile.gettempdir()

def ff(*a):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-y', '-loglevel', 'error', *a], capture_output=True, text=True)
    if r.returncode: raise RuntimeError(r.stderr[-400:])

def peak(src):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', src, '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = re.search(r'max_volume:\s*(-?[0-9.]+) dB', r); return float(m.group(1)) if m else -99.0

def pcm(src, norm):
    """16-bit mono samples at RATE; norm = trim the silence at both ends and even the loudness as the intake does (-18 LUFS, or a peak of
    -1 dB when too short to measure)"""
    tmp = os.path.join(TMP, 'zs84_a.wav'); out = os.path.join(TMP, 'zs84_b.wav')
    if norm:
        ff('-i', src, '-af', 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse', '-ac', '1', '-ar', str(RATE), tmp)
        w0 = wave.open(tmp); short = w0.getnframes() < RATE * 0.05; w0.close()
        if short: ff('-i', src, '-ac', '1', '-ar', str(RATE), tmp)
        r = subprocess.run(['ffmpeg', '-hide_banner', '-i', tmp, '-af', 'loudnorm=I=-18:TP=-1:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
        try:
            m = json.loads(r[r.rindex('{'):r.rindex('}') + 1]); mi = float(m['input_i'])
        except Exception: mi = float('-inf')
        if mi > -70:
            af = 'loudnorm=I=-18:TP=-1:LRA=11:measured_I=%s:measured_TP=%s:measured_LRA=%s:measured_thresh=%s:offset=%s:linear=true' % (m['input_i'], m['input_tp'], m['input_lra'], m['input_thresh'], m['target_offset'])
        else:
            af = 'volume=%.2fdB' % max(-20.0, min(40.0, -1.0 - peak(tmp)))
        ff('-i', tmp, '-af', af, '-ac', '1', '-ar', str(RATE), '-c:a', 'pcm_s16le', out)
    else:
        ff('-i', src, '-ac', '1', '-ar', str(RATE), '-c:a', 'pcm_s16le', out)
    w = wave.open(out); data = w.readframes(w.getnframes()); w.close(); return data

def main():
    if not shutil.which('ffmpeg'): sys.exit('ffmpeg is not installed (winget install Gyan.FFmpeg).')
    cues = [c for c in json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'audio.json'), encoding='utf-8'))['cues'] if c['kind'] == 'sfx']
    os.makedirs(OUT, exist_ok=True); gap = b'\0\0' * int(RATE * GAP)
    IX = os.path.join(OUT, 's84.json'); old = json.load(open(IX)) if os.path.isfile(IX) else {'items': {}}
    idx = {}; streams = {k: [] for k in KINDS}; pos = {k: 0 for k in KINDS}
    for c in cues:
        cid = c['id']; got = {}
        for k in KINDS:
            src = os.path.join(CUR, cid + '.mp3') if k == 'cur' else os.path.join(INC, '%s.%s.mp3' % (cid, k))
            if not os.path.isfile(src): continue
            if k != 'cur' and peak(src) < -45: continue      # a cut that came out silent
            try: d = pcm(src, k != 'cur')
            except Exception as e: print('X  %s %s: %s' % (cid, k, e)); continue
            n = len(d) // 2
            if n < RATE * 0.02: continue
            streams[k] += [d, gap]; got[k] = [round(pos[k] / RATE + GAP, 4), round(n / RATE, 3)]; pos[k] += n + len(gap) // 2
        keep = {k: v for k, v in (old['items'].get(cid) or {}).items() if k not in KINDS}      # kinds not remade this time stay as they were
        keep.update(got)
        if keep: idx[cid] = keep
        print('%-26s %s' % (cid, ' '.join(sorted(got))), flush=True)
    for k, parts in streams.items():
        if not parts: continue
        wv = os.path.join(TMP, 's84_%s.wav' % k); w = wave.open(wv, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(gap + b''.join(parts)); w.close()
        ff('-i', wv, '-c:a', 'libmp3lame', '-b:a', '64k', os.path.join(OUT, 's84_%s.mp3' % k))
        print('->  lab/preview/audio/s84_%s.mp3  %.1f min  %d KB' % (k, pos[k] / RATE / 60, os.path.getsize(os.path.join(OUT, 's84_%s.mp3' % k)) // 1024))
    json.dump({'gap': GAP, 'rate': RATE, 'items': idx}, open(IX, 'w'), separators=(',', ':'))
    print('%d effects in the Lab: %s' % (len(idx), ', '.join('%s %d' % (k, sum(k in v for v in idx.values())) for k in ['cur', 'e1', 'e2', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'n1', 'n2'])))
main()
