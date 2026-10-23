"""Zeldara audio intake (round 72, doc 32 §3.4): audio/incoming → assets/audio (Ogg + MP3) + assets/audio/index.json.

Put the files in audio/incoming named by their cue id (Lab → Music & sound shows the ids):
  music from Suno: mu_village_day.wav (or .mp3)      ambience and effects from tools/audio/sfx.mjs: am_meadow_day.mp3, sfx_chest.mp3, sfx_chest.b.mp3 …
Then:   python tools/audio/intake_audio.py            (or --ids mu_title,mu_village_day   --force to redo)
Needs ffmpeg (winget install Gyan.FFmpeg, then a new PowerShell window). The WAV/MP3 you made is copied to audio/masters (never sent to git).

What it does, per sound:
  · trims silence at both ends (not inside a loop's music)
  · evens the loudness (EBU R128, two passes): music −16 LUFS, stingers −14, ambience −24, effects to a peak of −1 dBTP
  · loops: the whole piece loops (loopStart 0, loopEnd its length) — the game joins the ends with a short crossfade; a note in the Lab can move them
  · encodes Ogg Vorbis (music stereo ≈ 96 kbps; ambience mono ≈ 64 kbps; effects mono 32 kHz) and an MP3 at a constant bitrate for older Safari
  · a second take (<id>.b.mp3) is kept as a variant the game alternates with
"""
import os, sys, json, re, shutil, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
INC, MAS, OUT = (os.path.join(ROOT, 'audio', 'incoming'), os.path.join(ROOT, 'audio', 'masters'), os.path.join(ROOT, 'assets', 'audio'))
args = sys.argv[1:]; FORCE = '--force' in args
FROM = args[args.index('--from') + 1] if '--from' in args else None      # round 72h: pick the cue files out of another folder (Suno downloads)
IDS = None
if '--ids' in args: IDS = set(args[args.index('--ids') + 1].split(','))
def ff(*a, capture=False):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-y', *a], capture_output=True, text=True)
    if r.returncode: raise RuntimeError(r.stderr[-600:])
    return r.stderr
def dur(f):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', f], capture_output=True, text=True)
    try: return round(float(r.stdout.strip() or 0), 3)
    except ValueError: return 0.0      # an empty file (all silence trimmed away)
def main():
    if not shutil.which('ffmpeg'):
        print('ffmpeg is not installed. In PowerShell:  winget install Gyan.FFmpeg   — then open a new PowerShell window and run this again.'); sys.exit(1)
    cues = {c['id']: c for c in json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'audio.json'), encoding='utf-8'))['cues']}
    os.makedirs(MAS, exist_ok=True); os.makedirs(OUT, exist_ok=True)
    ip = os.path.join(OUT, 'index.json'); idx = json.load(open(ip)) if os.path.exists(ip) else {}
    if FROM and os.path.isdir(FROM):
        os.makedirs(INC, exist_ok=True); got = 0
        for f in os.listdir(FROM):
            m = re.match(r'^((?:mu|st)_[a-z0-9_]+?)(?: ?\(\d+\))?\.(mp3|wav|m4a|flac|ogg)$', f, re.I)
            if not m or m.group(1).lower() not in cues: continue
            dst = os.path.join(INC, m.group(1).lower() + '.' + m.group(2).lower())
            if os.path.exists(dst) and not FORCE: continue
            shutil.copy2(os.path.join(FROM, f), dst); got += 1; print('← %s' % f)
        print('%d file(s) taken from %s' % (got, FROM))
    files = sorted(f for f in os.listdir(INC) if re.search(r'\.(wav|mp3|ogg|flac|m4a)$', f, re.I)) if os.path.isdir(INC) else []
    files = [f for f in files if not re.search(r'\.e\d\.\w+$', f) and '.prev.' not in f]      # round 80: the ethereal options wait for Kris's pick in the Lab
    done = 0
    for f in files:
        m = re.match(r'^([a-z0-9_]+?)(?:\.([b-d]))?(?:\.prev)?\.(wav|mp3|ogg|flac|m4a)$', f, re.I)
        if not m or '.prev.' in f: continue
        cid, take = m.group(1), (m.group(2) or '')
        if cid not in cues: print('? %s: no cue with that id (check Lab → Music & sound)' % f); continue
        if IDS and cid not in IDS: continue
        c = cues[cid]; kind = 'sting' if c['group'] == 'sting' else c['kind']; base = cid + ('.' + take if take else '')
        if not FORCE and os.path.exists(os.path.join(OUT, base + '.ogg')) and any(x.get('base') == base for x in idx.get(cid, {}).get('files', [])): continue      # exact (am_ash.b is not am_ash)
        src = os.path.join(INC, f); shutil.copy2(src, os.path.join(MAS, f))
        tmp = os.path.join(OUT, base + '.tmp.wav')
        # 1. trim the silence at both ends (a looping piece keeps its length)
        trim = [] if c['loop'] and kind == 'music' else ['-af', 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse']
        ff('-i', src, *trim, tmp)
        if trim and dur(tmp) < 0.05: ff('-i', src, tmp)      # the trim ate a very quiet sound: keep it whole
        # 2. even loudness (two passes). A sound shorter than 0.4 s has no measurable loudness (EBU R128 gates in 400 ms blocks — it reads
        #    as -inf): those are brought to a peak of -1 dB instead.
        tgt = {'music': (-16, 11), 'sting': (-14, 11), 'amb': (-24, 7), 'sfx': (-18, 11)}[kind]
        st = ff('-i', tmp, '-af', 'loudnorm=I=%d:TP=-1:LRA=%d:print_format=json' % tgt, '-f', 'null', '-')
        meas = json.loads(st[st.rindex('{'):st.rindex('}') + 1])
        try: mi = float(meas['input_i'])
        except ValueError: mi = float('-inf')
        if mi > -70 and all(re.match(r'^-?[0-9.]+$', str(meas[k])) for k in ('input_tp', 'input_lra', 'input_thresh', 'target_offset')):
            ln = 'loudnorm=I=%d:TP=-1:LRA=%d:measured_I=%s:measured_TP=%s:measured_LRA=%s:measured_thresh=%s:offset=%s:linear=true' % (tgt + (meas['input_i'], meas['input_tp'], meas['input_lra'], meas['input_thresh'], meas['target_offset']))
        else:
            vd = ff('-i', tmp, '-af', 'volumedetect', '-f', 'null', '-'); m = re.search(r'max_volume:\s*(-?[0-9.]+) dB', vd)
            peak = float(m.group(1)) if m else -1.0; ln = 'volume=%.2fdB' % max(-20.0, min(40.0, -1.0 - peak)); meas['input_i'] = 'peak %.1f dB' % peak
            if peak < -60: print('! %s is almost silent — redo it:  node tools/audio/sfx.mjs --ids %s --force' % (base, cid))
        mono = kind in ('amb', 'sfx'); rate = '32000' if kind == 'sfx' else '44100'
        o_ogg, o_mp3 = os.path.join(OUT, base + '.ogg'), os.path.join(OUT, base + '.mp3')
        common = ['-af', ln, '-ar', rate] + (['-ac', '1'] if mono else [])
        ff('-i', tmp, *common, '-c:a', 'libvorbis', '-q:a', '2' if mono else '3', o_ogg)
        ff('-i', tmp, *common, '-c:a', 'libmp3lame', '-b:a', '64k' if mono else '128k', o_mp3)
        os.remove(tmp)
        d = dur(o_ogg); e = idx.setdefault(cid, {'kind': kind, 'loop': bool(c['loop']), 'files': []})
        e['files'] = [x for x in e['files'] if x['base'] != base] + [{'base': base, 'secs': d, 'ls': 0, 'le': d}]
        e['files'].sort(key=lambda x: x['base']); done += 1
        print('✓ %-28s %-6s %6.1f s  ogg %4d KB  mp3 %4d KB  (was %s)' % (base, kind, d, os.path.getsize(o_ogg) // 1024, os.path.getsize(o_mp3) // 1024, meas['input_i'] if isinstance(meas['input_i'], str) and 'peak' in meas['input_i'] else '%.1f LUFS' % float(meas['input_i'])))
        json.dump(idx, open(ip, 'w'), indent=1, sort_keys=True)      # after each sound, so a stop part-way loses nothing
    json.dump(idx, open(ip, 'w'), indent=1, sort_keys=True)
    have = sum(1 for k in idx); print('\n%d made now · %d of %d sounds in assets/audio · then tell Claude the audio is in' % (done, have, len(cues)))
main()
