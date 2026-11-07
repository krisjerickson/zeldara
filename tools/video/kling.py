"""Round 84: one folder per video to make in Kling (Kris: "putting in the requests into kling is clunky. I suggest individual folders for
each video with all of the images in each folder as well as a single prompt to put in").

Kling 4.0's Keyframes mode takes up to 10 pictures and makes up to 30 s in one go, with one prompt that says what happens at each second.
So a cut-scene's frames go in parts of at most 6 (6 x 5 s = 30 s); a 12-frame cut-scene is 2 parts. Each part is one folder:

  video_requests/<NN>_<scene>_<who>[_p<k>]/   01.png 02.png ...   the pictures, in order (upload them in this order)
                                             PROMPT.txt           the one prompt to paste (short: what moves, not what is in the pictures)
                                             SAVE AS <name>.mp4   an empty file whose name is what to call the download
  video_requests/README.txt                  the steps, once
  video_requests/parts.json                  how many parts each montage has (tools/video/intake_video.py joins them)

<NN> is the order the cut-scenes play in a game. <who> is zeldor / zeldara, or "both" for a part whose pictures are the same in both
heroes' versions (make it once; the intake uses it for both), or "all" for a cut-scene without the twins.
A folder is made again only when one of its pictures changed.   python tools/video/kling.py   (after tools/video/storyboards.py)
"""
import os, sys, json, shutil, re
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SB = os.path.join(ROOT, 'sprites', 'storyboards'); OUT = os.path.join(ROOT, 'video_requests')
J = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'storyboards.json'), encoding='utf-8'))
SECS, MAXP, MAXLEN = 5, 6, 20      # round 88e (Kris: "we need to reduce the amount of time per each image instead of reducing the number of images"): parts keep up to 6
# pictures, as before; a part never runs past 20 s (the cheaper Kling model) - each picture gets 20 s / pictures (3.3 s with 6), 5 s at most
shot = lambda n: min(SECS, MAXLEN / n)
fs = lambda x: ('%.1f' % x).rstrip('0').rstrip('.')      # 3.3, 6.7, 10
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
MOTION = [('aurora', 'aurora surging'), ('lava|ember|fire|flame|forge|molten', 'flames roaring'), ('river|lake|water|sea|waterfall|falls|tide', 'water rushing'),
          ('snow|frost|ice', 'snow swirling'), ('mist|fog|smoke|steam|ash', 'smoke billowing'), ('rune|glow|light|magic|spell', 'runes flaring'),
          ('banner|cloak|hair|braid', 'cloaks whipping in the wind'), ('rain|storm|lightning', 'lightning cracking'), ('star', 'shooting stars')]
CAMERA = ['slow push-in', 'slow pan to the right', 'slow pull-back', 'slow pan to the left', 'gentle drift upward', 'slow push-in']
import re as _re
def motion(desc):
    d = desc.lower(); out = [m for k, m in MOTION if _re.search(r'\b(' + k + ')', d)]
    return ', '.join(out[:3]) or 'the light shifts gently'

# round 88f (Kris: "It's not putting the images in order, even though we say @image1 … now the videos are too dull. There used to be
# lightning strikes and doors to asgard closing, and now the image is just too still"): the pictures are named image1.png … image6.png
# (as the prompt calls them), each shot names what its picture shows so Kling can tell them apart and keep the order, and each shot says
# what HAPPENS (the story line) with bold movement — the pictures stay the content, the motion comes back.
CAMERA = ['fast push-in', 'sweeping pan to the right', 'slow orbit around the subject', 'crane up and over', 'dolly back to reveal', 'tracking shot to the left']
def gist(desc):
    d = re.sub(r'\(exactly as in [^)]*\)', '', desc.split(';')[0].split(':')[-1] if ':' in desc.split(';')[0][:60] else desc.split(';')[0]).strip()
    S = re.split(r',| — | so ', d); d = S[0] + (', ' + S[1] if len(S) > 1 and len(S[0].split()) < 7 else ''); w = d.rstrip('.,;').split(); return ' '.join(w[:16]).rstrip('.,;')

def prompt(sc, beats, who, part, nparts, sec=None):
    k = 'f' if who == 'zeldara' else 'm'; n = len(beats); SECS = sec or shot(n); nm = {'f': 'Zeldara', 'm': 'Zeldor'}[k]; ot = {'f': 'Zeldor', 'm': 'Zeldara'}[k]
    L = ['A dramatic, living cinematic montage made from these %d pictures, in this exact order: %s. Total %s seconds, 16:9.' % (n, ', '.join('@image%d' % (i + 1) for i in range(n)), fs(n * SECS)),
         'Each picture is one shot of about %s seconds. Every shot starts on its picture and comes alive with strong movement — characters move, act and react; '
         'lightning, fire, magic, water, wind and weather animate boldly; the camera moves with energy — then a quick cut to the next picture. '
         'Keep each picture\'s characters, places, colours and painted style.' % fs(SECS), '']
    for i, b in enumerate(beats):
        cap = re.sub(r'\{H\}', nm, re.sub(r'\{O\}', ot, str(b.get('cap', '')))).strip().strip('"“”')
        L.append('Shot %d — @image%d (%s-%ss) %s: %s. Action: %s Moves: %s; %s.' % (i + 1, i + 1, fs(i * SECS), fs((i + 1) * SECS), b['title'], gist(b[k]), cap if cap.endswith(('.', '!', '?', '…')) else cap + '.', CAMERA[i % len(CAMERA)], motion(b[k])))
    L += ['', 'Use all %d pictures, in this order — @image1 first and @image%d last; do not skip, merge or reorder any. Same faces, hair and clothes in every shot.' % (n, n),
          'Avoid: new people, new creatures, new buildings, changing any face, hair or clothes, umbrellas, modern clothes, '
          'glasses, phones, guns, cars, street lamps, text, captions, logos, photorealism, morphing between pictures.']
    return '\n'.join(L) + '\n'

def negative():
    return ('new characters, extra people, changed faces, changed clothes, new objects, new buildings, scene change, redesign, morphing, '
            'text, captions, subtitles, logos, watermark, photorealism, 3D render look, flicker, ' + J.get('neg', '').split('flicker, ', 1)[-1] + '\n')

os.makedirs(OUT, exist_ok=True); parts = {}; made = kept = 0; listing = []; keep = set()
OLD = os.path.join(ROOT, '_to_delete', 'video_requests_old')
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
                t = os.path.join(d, 'image%d.png' % j)      # round 88f: named as the prompt calls them
                o2 = os.path.join(d, '%02d.png' % j)
                if os.path.isfile(o2): os.makedirs(os.path.join(OLD, os.path.basename(d)), exist_ok=True); os.replace(o2, os.path.join(OLD, os.path.basename(d), '%02d.png' % j))
                if os.path.isfile(t) and os.path.getmtime(t) >= os.path.getmtime(s) - 2 and os.path.getsize(t) == os.path.getsize(s): kept += 1; continue      # round 88: a copy cut short is made again; the 2 s allow for the shared folder's clock (the folders hold hard links that follow the remade picture)
                if not os.path.exists(t):
                    try: os.link(s, t); made += 1; continue      # a hard link: no second copy on disk, and it follows the picture when it is remade
                    except OSError: pass
                with open(s, 'rb') as fa, open(t, 'wb') as fb: shutil.copyfileobj(fa, fb, 1 << 20)      # round 88: plain reads and writes (sendfile stalls on the PC's shared folder)
                shutil.copystat(s, t); made += 1
            open(os.path.join(d, 'PROMPT.txt'), 'w', encoding='utf-8').write(prompt(sc, beats, 'zeldor' if who == 'both' else who, pi, len(P)))
            for old in ('NEGATIVE.txt', 'PROMPT_25s_longer_model.txt'):      # round 88e: no negative box in Kling; every part fits 20 s
                if os.path.isfile(os.path.join(d, old)):
                    os.makedirs(os.path.join(OLD, d.split(os.sep)[-1]), exist_ok=True); os.replace(os.path.join(d, old), os.path.join(OLD, d.split(os.sep)[-1], old))
            for f in os.listdir(d):
                if f.startswith('SAVE AS '): os.replace(os.path.join(d, f), os.path.join(d, 'SAVE AS %s.mp4' % name)) if f != 'SAVE AS %s.mp4' % name else None
            open(os.path.join(d, 'SAVE AS %s.mp4' % name), 'a').close()
            listing.append('%02d  %-26s  %d pictures, %s s   %s' % (nn, name, len(beats), fs(len(beats) * shot(len(beats))), sc['name'])); keep.add('%02d_%s' % (nn, name))
# folders of an earlier split move to _to_delete/video_requests_old (nothing is deleted)
for d in sorted(os.listdir(OUT)):
    if os.path.isdir(os.path.join(OUT, d)) and d not in keep:
        os.makedirs(OLD, exist_ok=True); t = os.path.join(OLD, d); n2 = 1
        while os.path.exists(t): n2 += 1; t = os.path.join(OLD, '%s.%d' % (d, n2))
        os.rename(os.path.join(OUT, d), t); print('old folder moved: %s' % d)
json.dump({'secs': SECS, 'max': MAXLEN, 'parts': parts}, open(os.path.join(OUT, 'parts.json'), 'w'), indent=1)
open(os.path.join(OUT, 'README.txt'), 'w', encoding='utf-8').write('''MAKING THE STORY VIDEOS IN KLING  (round 84; doc 40)

Each folder here is ONE video to make. Work through them in any order.

  1. Kling -> Video -> Kling 4.0 -> Keyframes.
  2. Upload the folder's pictures IN ORDER: image1.png, image2.png, ... (the prompt calls them @image1, @image2, ...)
  3. Paste PROMPT.txt into the prompt box (it already says what to avoid).
  4. Length: 20 seconds at most — the first line of PROMPT.txt says how long; every picture is used (up to 6, about 3.3 s each). 16:9, 1080p.
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
