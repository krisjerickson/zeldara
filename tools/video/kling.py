"""Round 84: one folder per video to make in Kling (Kris: "putting in the requests into kling is clunky. I suggest individual folders for
each video with all of the images in each folder as well as a single prompt to put in").

Kling 4.0's Keyframes mode takes up to 10 pictures and makes up to 30 s in one go, with one prompt that says what happens at each second.
So a cut-scene's frames go in parts of at most 6 (6 x 5 s = 30 s); a 12-frame cut-scene is 2 parts. Each part is one folder:

  video_requests/<NN>_<scene>_<who>[_p<k>]/   01.png 02.png ...   the pictures, in order (upload them in this order)
                                             PROMPT.txt           the one prompt to paste (short: what moves, not what is in the pictures)
                                             NEGATIVE.txt         for Kling's Negative prompt box
                                             SAVE AS <name>.mp4   an empty file whose name is what to call the download
  video_requests/README.txt                  the steps, once
  video_requests/parts.json                  how many parts each montage has (tools/video/intake_video.py joins them)

<NN> is the order the cut-scenes play in a game. <who> is zeldor / zeldara, or "both" for a part whose pictures are the same in both
heroes' versions (make it once; the intake uses it for both), or "all" for a cut-scene without the twins.
A folder is made again only when one of its pictures changed.   python tools/video/kling.py   (after tools/video/storyboards.py)
"""
import os, sys, json, shutil
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SB = os.path.join(ROOT, 'sprites', 'storyboards'); OUT = os.path.join(ROOT, 'video_requests')
J = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'storyboards.json'), encoding='utf-8'))
SECS, MAXP, MAXLEN = 5, 5, 20      # round 88d (Kris: the cheaper Kling model makes at most 20 s): up to 5 pictures a part; 5 s a shot, 4 s when a part has 5
shot = lambda n: min(SECS, MAXLEN / n)
ORDER = ['opening', 'spirit', 'quiet', 'bram', 'blacktide', 'mira', 'stonefall', 'dunn', 'ashnight', 'vela', 'gate', 'orbs',
         'surt1', 'surt2', 'surt3', 'surt4', 'surt5', 'surt6', 'lodestar', 'escape', 'asgard', 'twinteach', 'bifrost',
         'sol1', 'sol2', 'sol3', 'solfall', 'feasthall', 'truth', 'home', 'village', 'celebrate', 'credits', 'worldtree']

def split(n):
    k = (n + MAXP - 1) // MAXP; base, extra = divmod(n, k); out, i = [], 0
    for p in range(k): m = base + (1 if p < extra else 0); out.append(list(range(i, i + m))); i += m
    return out

# round 88c (Kris: "For the new prompt, kling discarded the image input, and came up with new ones"): the prompt had grown to ~3,900
# characters — the painter's full descriptions (with their lists of things NOT to draw) and the after-the-Viking-age list — so Kling read
# it as a story to invent. Now the pictures carry the content: the prompt only says to animate them as they are, and what MOVES in each
# shot (camera and small motions, read from the picture's words). It stays short (well under Kling's 2,500 characters); the things to
# keep out go to NEGATIVE.txt, for Kling's separate Negative prompt box.
MOTION = [('aurora', 'the aurora ripples'), ('lava|ember|fire|flame|forge|molten', 'flames and embers flicker'), ('river|lake|water|sea|waterfall|falls|tide', 'the water flows'),
          ('snow|frost|ice', 'snow drifts'), ('mist|fog|smoke|steam|ash', 'mist and smoke drift'), ('rune|glow|light|magic|spell', 'the runes and magic pulse softly'),
          ('banner|cloak|hair|braid', 'cloaks, hair and banners stir in the wind'), ('rain|storm|lightning', 'rain falls and the sky flickers'), ('star', 'stars twinkle')]
CAMERA = ['slow push-in', 'slow pan to the right', 'slow pull-back', 'slow pan to the left', 'gentle drift upward', 'slow push-in']
import re as _re
def motion(desc):
    d = desc.lower(); out = [m for k, m in MOTION if _re.search(r'\b(' + k + ')', d)]
    return ', '.join(out[:3]) or 'the light shifts gently'

def prompt(sc, beats, who, part, nparts, sec=None):
    k = 'f' if who == 'zeldara' else 'm'; n = len(beats); SECS = sec or shot(n)
    L = ['Animate these %d pictures exactly as they are. @Image1 to @Image%d are the keyframes, in order: each one IS the frame at its timestamp '
         '(@Image1 at 0s%s). Keep every picture\'s content, characters, composition, colours and painted style; do not add, remove or redesign anything. '
         'Total %d seconds, 16:9.' % (n, n, ''.join(', @Image%d at %gs' % (i + 1, i * SECS) for i in range(1, n)), n * SECS), '',
         'Each shot holds its picture and moves only a little: a slow camera move and small natural motion. Clean cut to the next picture at its timestamp, no morphing.', '']
    for i, b in enumerate(beats):
        L.append('%g-%gs @Image%d (%s): %s; %s.' % (i * SECS, (i + 1) * SECS, i + 1, b['title'], CAMERA[i % len(CAMERA)], motion(b[k])))
    L += ['', 'Same faces, hair and clothes in every shot. No new people or objects, no text.']
    return '\n'.join(L) + '\n'

def negative():
    return ('new characters, extra people, changed faces, changed clothes, new objects, new buildings, scene change, redesign, morphing, '
            'text, captions, subtitles, logos, watermark, photorealism, 3D render look, flicker, ' + J.get('neg', '').split('flicker, ', 1)[-1] + '\n')

os.makedirs(OUT, exist_ok=True); parts = {}; made = kept = 0; listing = []; keep = set()
scenes = sorted(J['scenes'], key=lambda s: ORDER.index(s['id']) if s['id'] in ORDER else 99)
for nn, sc in enumerate(scenes, 1):
    versions = any(len(b['ids']) > 1 for b in sc['beats'])
    P = split(len(sc['beats'])); parts[sc['id']] = len(P)
    for pi, idx in enumerate(P, 1):
        beats = [sc['beats'][i] for i in idx]
        shared = versions and all(len(b['ids']) == 1 for b in beats)
        whos = ['all'] if not versions else (['both'] if shared else ['zeldor', 'zeldara'])
        for who in whos:
            src_who = 'zeldor' if who == 'both' else who
            name = '%s_%s%s' % (sc['id'], who, '' if len(P) == 1 else '_p%d' % pi)
            d = os.path.join(OUT, '%02d_%s' % (nn, name)); srcs = [os.path.join(SB, sc['id'], src_who, '%02d.png' % b['n']) for b in beats]
            if not all(os.path.isfile(s) for s in srcs): listing.append('%02d  %-26s  waiting for its pictures' % (nn, name)); continue
            os.makedirs(d, exist_ok=True)
            for j, s in enumerate(srcs, 1):
                t = os.path.join(d, '%02d.png' % j)
                if os.path.isfile(t) and os.path.getmtime(t) >= os.path.getmtime(s) - 2 and os.path.getsize(t) == os.path.getsize(s): kept += 1; continue      # round 88: a copy cut short is made again; the 2 s allow for the shared folder's clock (the folders hold hard links that follow the remade picture)
                if not os.path.exists(t):
                    try: os.link(s, t); made += 1; continue      # a hard link: no second copy on disk, and it follows the picture when it is remade
                    except OSError: pass
                with open(s, 'rb') as fa, open(t, 'wb') as fb: shutil.copyfileobj(fa, fb, 1 << 20)      # round 88: plain reads and writes (sendfile stalls on the PC's shared folder)
                shutil.copystat(s, t); made += 1
            open(os.path.join(d, 'PROMPT.txt'), 'w', encoding='utf-8').write(prompt(sc, beats, 'zeldor' if who == 'both' else who, pi, len(P)))
            open(os.path.join(d, 'NEGATIVE.txt'), 'w', encoding='utf-8').write(negative())
            if len(beats) * SECS > MAXLEN:      # 4 s a shot in the 20-s model; the same part at 5 s a shot for the longer model
                open(os.path.join(d, 'PROMPT_25s_longer_model.txt'), 'w', encoding='utf-8').write(prompt(sc, beats, 'zeldor' if who == 'both' else who, pi, len(P), SECS))
            for f in os.listdir(d):
                if f.startswith('SAVE AS '): os.replace(os.path.join(d, f), os.path.join(d, 'SAVE AS %s.mp4' % name)) if f != 'SAVE AS %s.mp4' % name else None
            open(os.path.join(d, 'SAVE AS %s.mp4' % name), 'a').close()
            listing.append('%02d  %-26s  %d pictures, %g s   %s' % (nn, name, len(beats), len(beats) * shot(len(beats)), sc['name'])); keep.add('%02d_%s' % (nn, name))
# folders of an earlier split (round 88d: parts of 5 at most, was 6) move to _to_delete/video_requests_old (nothing is deleted)
OLD = os.path.join(ROOT, '_to_delete', 'video_requests_old')
for d in sorted(os.listdir(OUT)):
    if os.path.isdir(os.path.join(OUT, d)) and d not in keep:
        os.makedirs(OLD, exist_ok=True); t = os.path.join(OLD, d); n2 = 1
        while os.path.exists(t): n2 += 1; t = os.path.join(OLD, '%s.%d' % (d, n2))
        os.rename(os.path.join(OUT, d), t); print('old folder moved: %s' % d)
json.dump({'secs': SECS, 'max': MAXLEN, 'parts': parts}, open(os.path.join(OUT, 'parts.json'), 'w'), indent=1)
open(os.path.join(OUT, 'README.txt'), 'w', encoding='utf-8').write('''MAKING THE STORY VIDEOS IN KLING  (round 84; doc 40)

Each folder here is ONE video to make. Work through them in any order.

  1. Kling -> Video -> Kling 4.0 -> Keyframes.
  2. Upload the folder's pictures IN ORDER: 01.png, 02.png, ...
  3. Paste PROMPT.txt into the prompt box, and NEGATIVE.txt into the Negative prompt box (if Kling shows one;
     if not, leave it out - never add it to the prompt).
  4. Length: at most 20 seconds — the first line of PROMPT.txt says how long (5 s a picture, 4 s when a part has 5). 16:9, 1080p.
  5. Download the video and drop it into its folder (any name is fine) - or leave it in your Downloads named as the
     "SAVE AS ..." file says (e.g. opening_zeldor_p1.mp4).
  6. When you have a few: in PowerShell
        cd C:\\Claude\\games\\Zeldara-v4
        .\\tools\\video\\video1.ps1 -Intake
     It joins each cut-scene's parts in order once they are all in, and puts the result in the game.

"both" folders are the same pictures in both heroes' versions: make them once.
"all" folders have neither twin in them.
If a video comes out wrong, make it again and save it under the same name; the newest one wins.

THE LIST (in the order they play in a game)
''' + '\n'.join(listing) + '\n')
print('\n'.join(listing)); print('\n%d picture(s) copied, %d already there -> %s' % (made, kept, OUT))
