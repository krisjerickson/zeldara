"""Round 81: the gentle sounds, ready to compare in the Lab (Kris: "let's remake every sound effect, but then in the lab, i want to have these
as options to choose between"). For every effect it puts today's take and the two new options (audio/incoming/<id>.e1.mp3, .e2.mp3 from
tools/audio/sfx.mjs --set ethereal) each through the same trim and loudness as the intake, then joins each kind into one file — a Lab
artifact can only hold so many files:

  lab/preview/audio/eth_cur.mp3, eth_e1.mp3, eth_e2.mp3    every effect one after another, a short silence between
  lab/preview/audio/eth.json                               {id: {cur:[start, secs], e1:[…], e2:[…]}} — where each one is in its file

Lab → Music & sound → "Pick the gentle sounds" plays them and keeps your pick per effect. Then tools/audio/pick_sounds.py puts the picks in
the game.     python tools/audio/eth_preview.py   [--from <folder with the .e1/.e2 files>]
"""
import os, sys, json, re, shutil, subprocess, wave, struct, tempfile
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
args = sys.argv[1:]
INC = args[args.index('--from') + 1] if '--from' in args else os.path.join(ROOT, 'audio', 'incoming')
CUR = os.path.join(ROOT, 'assets', 'audio'); OUT = os.path.join(ROOT, 'lab', 'preview', 'audio')
RATE, GAP = 32000, 0.35

def ff(*a):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-y', '-loglevel', 'error', *a], capture_output=True, text=True)
    if r.returncode: raise RuntimeError(r.stderr[-400:])
    return r.stderr

def pcm(src, norm):
    """the sound as 16-bit mono samples at RATE; norm = trim the silence and even the loudness as the intake does (effects: -18 LUFS, or a
    peak of -1 dB when too short to measure)"""
    tmp = tempfile.mktemp(suffix='.wav'); out = tempfile.mktemp(suffix='.wav')
    if norm:
        ff('-i', src, '-af', 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse', '-ac', '1', '-ar', str(RATE), tmp)
        w0 = wave.open(tmp); short = w0.getnframes() < RATE * 0.05; w0.close()
        if short: ff('-i', src, '-ac', '1', '-ar', str(RATE), tmp)      # the trim ate a very quiet sound: keep it whole
        r = subprocess.run(['ffmpeg', '-hide_banner', '-i', tmp, '-af', 'loudnorm=I=-18:TP=-1:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
        try:
            m = json.loads(r[r.rindex('{'):r.rindex('}') + 1]); mi = float(m['input_i'])
        except Exception: mi = float('-inf')
        if mi > -70:
            af = 'loudnorm=I=-18:TP=-1:LRA=11:measured_I=%s:measured_TP=%s:measured_LRA=%s:measured_thresh=%s:offset=%s:linear=true' % (m['input_i'], m['input_tp'], m['input_lra'], m['input_thresh'], m['target_offset'])
        else:
            vd = subprocess.run(['ffmpeg', '-hide_banner', '-i', tmp, '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True).stderr
            p = re.search(r'max_volume:\s*(-?[0-9.]+) dB', vd); af = 'volume=%.2fdB' % max(-20.0, min(40.0, -1.0 - (float(p.group(1)) if p else -1.0)))
        ff('-i', tmp, '-af', af, '-ac', '1', '-ar', str(RATE), '-c:a', 'pcm_s16le', out)
    else:
        ff('-i', src, '-ac', '1', '-ar', str(RATE), '-c:a', 'pcm_s16le', out)
    w = wave.open(out); data = w.readframes(w.getnframes()); w.close()
    for f in (tmp, out):
        if os.path.exists(f): os.remove(f)
    return data

def main():
    if not shutil.which('ffmpeg'): sys.exit('ffmpeg is not installed (winget install Gyan.FFmpeg).')
    cues = [c for c in json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'audio.json'), encoding='utf-8'))['cues'] if c['kind'] == 'sfx']
    os.makedirs(OUT, exist_ok=True); gap = b'\0\0' * int(RATE * GAP); idx = {}; streams = {'cur': [], 'e1': [], 'e2': []}; pos = {'cur': 0, 'e1': 0, 'e2': 0}
    for c in cues:
        cid = c['id']; got = {}
        srcs = {'cur': os.path.join(CUR, cid + '.mp3'), 'e1': os.path.join(INC, cid + '.e1.mp3'), 'e2': os.path.join(INC, cid + '.e2.mp3')}
        for k, src in srcs.items():
            if not os.path.isfile(src): continue
            try: d = pcm(src, k != 'cur')      # today's take is already evened by the intake
            except Exception as e: print('X  %s %s: %s' % (cid, k, e)); continue
            n = len(d) // 2
            if n < RATE * 0.02: print('!  %s %s is (almost) empty' % (cid, k)); continue
            streams[k] += [d, gap]; got[k] = [round(pos[k] / RATE, 4), round(n / RATE, 3)]; pos[k] += n + len(gap) // 2
        if got: idx[cid] = got
        print('%-26s %s' % (cid, ' '.join('%s %.1fs' % (k, v[1]) for k, v in got.items())))
    for k, parts in streams.items():
        if not parts: continue
        wv = os.path.join(OUT, 'eth_%s.wav' % k); w = wave.open(wv, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(gap + b''.join(parts)); w.close()
        ff('-i', wv, '-c:a', 'libmp3lame', '-b:a', '64k', os.path.join(OUT, 'eth_%s.mp3' % k)); os.remove(wv)
        print('->  lab/preview/audio/eth_%s.mp3  %.1f min  %d KB' % (k, pos[k] / RATE / 60, os.path.getsize(os.path.join(OUT, 'eth_%s.mp3' % k)) // 1024))
    for v in idx.values():      # the files start with one gap of silence
        for k in v: v[k][0] = round(v[k][0] + GAP, 4)
    json.dump({'gap': GAP, 'rate': RATE, 'items': idx}, open(os.path.join(OUT, 'eth.json'), 'w'), separators=(',', ':'))
    print('%d effects: %d with today\'s take, %d with option 1, %d with option 2' % (len(idx), sum('cur' in v for v in idx.values()), sum('e1' in v for v in idx.values()), sum('e2' in v for v in idx.values())))
main()
