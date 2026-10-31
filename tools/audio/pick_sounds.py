"""Round 81: put Kris's picks of the gentle sounds into the game (Lab → Music & sound → "Pick the gentle sounds").

  sprites/requests/sound_picks.json    {id: "cur" | "e1" | "e2" | "both" | "l1".."l3" | "n1" | "n2" | "<take>+<take>"}  — Claude writes it from the Lab's picks

  cur   today's take stays (still played softer and muffled where it was harsh — ZAUD.SOFT)
  e1    option 1 becomes the sound          e2   option 2 becomes the sound
  both  option 1, with option 2 as the variant the game alternates with

The old take (and its variant) is moved, never deleted: audio/incoming → audio/replaced_r81/, assets/audio → audio/replaced_r81/assets/.
The new take goes through the usual intake (tools/audio/intake_audio.py: trim, even loudness, Ogg + MP3) and is marked "eth" in
assets/audio/index.json, so the game stops muffling it.      python tools/audio/pick_sounds.py   [--dry-run]
Then: node build.mjs
"""
import os, sys, json, shutil, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
INC, AS, OLD = os.path.join(ROOT, 'audio', 'incoming'), os.path.join(ROOT, 'assets', 'audio'), os.path.join(ROOT, 'audio', 'replaced_r81')
DRY = '--dry-run' in sys.argv
picks = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'sound_picks.json'), encoding='utf-8'))
def move(src, dst_dir):
    if not os.path.isfile(src): return
    os.makedirs(dst_dir, exist_ok=True); dst = os.path.join(dst_dir, os.path.basename(src)); n = 1
    while os.path.exists(dst): n += 1; dst = os.path.join(dst_dir, '%s.%d' % (os.path.basename(src), n))
    if not DRY: shutil.move(src, dst)
todo = []
for cid, p in sorted(picks.items()):
    # round 84: any take — e1/e2 (round 80), l1-l3 (the Sonniss library), n1/n2 (worded by what happens) — or two joined by '+' (alternating)
    ks = ['e1', 'e2'] if p == 'both' else [k for k in str(p).split('+') if k in ('e1', 'e2', 'l1', 'l2', 'l3', 'n1', 'n2')]
    if not ks: continue
    srcs = [os.path.join(INC, cid + '.' + k + '.mp3') for k in ks[:2]]
    if not all(os.path.isfile(s) for s in srcs): print('?  %s: the %s file is not in audio/incoming' % (cid, p)); continue
    for ext in ('.mp3', '.wav', '.b.mp3', '.b.wav'): move(os.path.join(INC, cid + ext), OLD)
    for ext in ('.mp3', '.ogg', '.b.mp3', '.b.ogg'): move(os.path.join(AS, cid + ext), os.path.join(OLD, 'assets'))
    if not DRY:
        shutil.copy2(srcs[0], os.path.join(INC, cid + '.mp3'))
        if len(srcs) > 1: shutil.copy2(srcs[1], os.path.join(INC, cid + '.b.mp3'))
    todo.append(cid); print('%-26s <- %s' % (cid, ' + '.join(ks[:2]) + (' (alternating)' if len(ks) > 1 else '')))
keep = sum(1 for p in picks.values() if p == 'cur')
print('\n%d to put in, %d keep today\'s take' % (len(todo), keep))
if DRY or not todo: sys.exit(0)
ip = os.path.join(AS, 'index.json'); idx = json.load(open(ip)) if os.path.exists(ip) else {}
for cid in todo: idx.pop(cid, None)      # the old take's entry goes with it (its variant too)
json.dump(idx, open(ip, 'w'), indent=1, sort_keys=True)
r = subprocess.run([sys.executable, os.path.join(ROOT, 'tools', 'audio', 'intake_audio.py'), '--ids', ','.join(todo), '--force'])
idx = json.load(open(ip))
for cid in todo:
    if cid in idx: idx[cid]['eth'] = True
json.dump(idx, open(ip, 'w'), indent=1, sort_keys=True)
print('\n%d gentle sound(s) in the game (marked "eth"). Now: node build.mjs' % sum(1 for c in todo if c in idx))
