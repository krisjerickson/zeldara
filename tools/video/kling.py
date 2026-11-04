"""Round 84: one folder per video to make in Kling (Kris: "putting in the requests into kling is clunky. I suggest individual folders for
each video with all of the images in each folder as well as a single prompt to put in").

Kling 4.0's Keyframes mode takes up to 10 pictures and makes up to 30 s in one go, with one prompt that says what happens at each second.
So a cut-scene's frames go in parts of at most 6 (6 x 5 s = 30 s); a 12-frame cut-scene is 2 parts. Each part is one folder:

  video_requests/<NN>_<scene>_<who>[_p<k>]/   01.png 02.png ...   the pictures, in order (upload them in this order)
                                             PROMPT.txt           the one prompt to paste
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
SECS, MAXP = 5, 6
ORDER = ['opening', 'spirit', 'quiet', 'bram', 'blacktide', 'mira', 'stonefall', 'dunn', 'ashnight', 'vela', 'gate', 'orbs',
         'surt1', 'surt2', 'surt3', 'surt4', 'surt5', 'surt6', 'lodestar', 'escape', 'asgard', 'twinteach', 'bifrost',
         'sol1', 'sol2', 'sol3', 'solfall', 'feasthall', 'truth', 'home', 'village', 'celebrate', 'credits', 'worldtree']

def split(n):
    k = (n + MAXP - 1) // MAXP; base, extra = divmod(n, k); out, i = [], 0
    for p in range(k): m = base + (1 if p < extra else 0); out.append(list(range(i, i + m))); i += m
    return out

def prompt(sc, beats, who, part, nparts):
    k = 'f' if who == 'zeldara' else 'm'; n = len(beats)
    L = ['Use ' + ', '.join('@Image%d' % (i + 1) for i in range(n)) + ' as keyframes: ' +
         ', '.join('@Image%d at %ds' % (i + 1, i * SECS) for i in range(n)) + '. Total length %d seconds, 16:9.' % (n * SECS), '',
         'A painted 2D fantasy story montage%s: %d short shots of %d seconds. Each shot opens exactly on its keyframe picture and moves gently from it '
         '— a slow camera push or pan; hair, cloth, mist, fire, water and light moving; magic glowing and flowing — then a clean hard cut to the next keyframe '
         'at the next timestamp. No morphing from one picture into the next.' % ('' if nparts == 1 else ' (part %d of %d)' % (part, nparts), n, SECS), '']
    for i, b in enumerate(beats):
        L.append('%d.0-%d.0s (@Image%d) %s: %s.' % (i * SECS, (i + 1) * SECS, i + 1, b['title'], b[k].rstrip('.')))
    L += ['', 'Keep every painting\'s style, colours and light exactly; every character keeps the same face, hair, clothes and proportions from shot to shot; '
          'no new characters, no extra people, no children unless they are in the picture. No text, no captions, no subtitles, no logos, no background music.',
          'Nothing from after the Viking age: ' + J.get('neg', '').split('flicker, ', 1)[-1] + '.']      # round 88 (Kris: umbrellas in the rain)
    return '\n'.join(L) + '\n'

os.makedirs(OUT, exist_ok=True); parts = {}; made = kept = 0; listing = []
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
            for f in os.listdir(d):
                if f.startswith('SAVE AS '): os.replace(os.path.join(d, f), os.path.join(d, 'SAVE AS %s.mp4' % name)) if f != 'SAVE AS %s.mp4' % name else None
            open(os.path.join(d, 'SAVE AS %s.mp4' % name), 'a').close()
            listing.append('%02d  %-26s  %d pictures, %d s   %s' % (nn, name, len(beats), len(beats) * SECS, sc['name']))
json.dump({'secs': SECS, 'parts': parts}, open(os.path.join(OUT, 'parts.json'), 'w'), indent=1)
open(os.path.join(OUT, 'README.txt'), 'w', encoding='utf-8').write('''MAKING THE STORY VIDEOS IN KLING  (round 84; doc 40)

Each folder here is ONE video to make. Work through them in any order.

  1. Kling -> Video -> Kling 4.0 -> Keyframes.
  2. Upload the folder's pictures IN ORDER: 01.png, 02.png, ...
  3. Paste PROMPT.txt into the prompt box.
  4. Length: 5 seconds per picture (it says the total on the first line of PROMPT.txt). 16:9, 1080p.
  5. Download the video and name it what the "SAVE AS ..." file in the folder says (e.g. opening_zeldor_p1.mp4).
     Leave it in your Downloads.
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
