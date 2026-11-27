"""Round 138: THE CUT-SCENES IN GOOGLE FLOW, one shot at a time (Kris: "I am going to make all videos in Flow instead of Kling, and I want
these to be as perfect as possible").

Why one shot at a time: the Bram video that worked (doc 81) was five clips, each starting exactly on its painting, joined with hard cuts. Flow's
"Frames to video" takes one start picture and one prompt and makes one clip (8 s), so every shot of every cut-scene gets its own folder:

  video_requests/flow/<NN>_<scene>_<who>/<KK>/   start.jpg      the shot's painting (16:9) - the clip's FIRST frame
                                                 PROMPT.txt     what happens in the shot (paste it as the prompt)
                                                 WAIT ….txt     only while the painting is being painted again (round 138 fixes)
                                                 <your clip>    drop the Flow download here, any name (the newest one counts)
  video_requests/flow/README.txt                  the steps, once
  video_requests/flow/manifest.json               every cut-scene's shots in order, for the intake

<who>: zoldor / zola when the shots differ by the twin you play; "both" holds the shots that are the same painting in both versions (make
them once - the intake uses them for both); "all" is a cut-scene without the twins.
Intake (python tools/video/flow.py --intake, or .\\tools\\video\\video1.ps1 -Intake): each shot's newest clip is cut to its planned length
(the time its line needs on screen: 1.4 s + 0.36 s a word + a breath, 3–6 s), copied to sprites/video_incoming/<scene>_<who>_<nn>.mp4, and
intake_video.py joins a cut-scene once every shot of it is in.
python tools/video/flow.py [--scene id] [--intake]
"""
import os, sys, json, re, shutil, hashlib, argparse, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lock_scenes import A as ACT, SPECIAL
SB = os.path.join(ROOT, 'sprites', 'storyboards'); OUT = os.path.join(ROOT, 'video_requests', 'flow'); VI = os.path.join(ROOT, 'sprites', 'video_incoming')
J = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'storyboards.json'), encoding='utf-8'))
ORDER = ['opening', 'spirit', 'quiet', 'bram', 'blacktide', 'mira', 'stonefall', 'dunn', 'ashnight', 'vela', 'gate', 'orbs',
         'surt1', 'surt2', 'surt3', 'surt4', 'surt5', 'surt6', 'lodestar', 'escape', 'asgard', 'twinteach', 'bifrost',
         'sol1', 'sol2', 'sol3', 'solfall', 'feasthall', 'truth', 'home', 'village', 'celebrate', 'credits', 'worldtree']
NAME = {'zeldor': 'Zoldor', 'zeldara': 'Zola'}; LABEL = {'zeldor': 'zoldor', 'zeldara': 'zola', 'all': 'all', 'both': 'both'}
FIXLIST = os.path.join(ROOT, 'sprites', 'requests', 'r141_flow.txt')      # round 140c: the one picture still being painted again (the opening's chains)
VID = ('.mp4', '.mov', '.webm', '.m4v')

# round 138: the actions for the frames being painted again, to match what they will show
ACT138 = {('blacktide', 6): "black water wells up between the floorboards and bubbles up through the cracks in the road ; the villager on the doorstep steps back, staring down ; the lantern light trembles on the rising water => the water spreading over the floor",
          ('gate', 2): "the golden bar across the doors gleams ; the lock-rune at its centre pulses once and goes still ; the clouds drift beneath => the gate sealed shut",
          ('orbs', 4): "inside the two orbs the two sleeping shapes stir faintly, as if dreaming ; the light breathes slowly => the two sleeping shapes in the light",
          ('surt3', 4): "the Ash Tyrant rises out of the storm, ash and smoke billowing off him, his ember eyes flaring ; ribbons of spirit-light trail from his hands => the Ash Tyrant",
          ('surt3', 5): "the Ash Tyrant draws the frightened rune-blue spirits round himself like a shield ; they reach out, flickering => the shield of souls",
          ('surt5', 4): "he climbs out of the lava, his black glass body gleaming, the molten heart pulsing behind the glass => the Obsidian Warlord",
          ('sol1', 3): "Solmyrk rises slowly from the high seat to stand, the light swelling round him, his folded wings stirring => Solmyrk standing before the high seat",
          ('sol2', 4): "one golden wing tears into black smoke and black feathers that drift away => the torn wing",
          ('stonefall', 5): "a red rift splits the mountain from its peak downward ; rock and dust fall away ; the two halves lean apart => the Great Scar torn open"}
# round 140c (Kris: "feedbacks are all in, including for the new images. ready for all of the flow commands to be updated"): the actions for the
# pictures painted a third time (r140_flow, and opening 4 once more), written from what each one now shows
ACT141 = {('opening', 4): "the chained pale spirits shuffle slowly along the edge of the misty fields, the short iron chains on their wrists and ankles swaying ; at the far edge the hooded Binder tugs the chain-ends and his lantern swings ; the villagers at the palisade watch in silence => the spirits led away into the mist",
          ('spirit', 2): "{H} walks steadily through the tall grass toward the bindstone, sword in hand ; beside {H} the Binder crumbles into ash and embers that blow away ; the chained spirit at the stone looks up => {H} nearing the stone, the Binder gone",
          ('stonefall', 1): "miners with picks and lanterns walk along the rails and push their ore carts into the mine ; lantern light glows in the mine mouths ; the waterfalls spill quietly in the calm evening => the busy mining village at dusk",
          ('surt1', 1): "rivers of lava flow through the deep cavern ; the giant of fire looms over his forge ; the pale spirits at its foot strain at their work in chains => the deep throne cavern",
          ('surt1', 6): "{H} raises a sword against the towering giant of fire ; his molten body flares and the lava below him churns => {H} facing Surtharn",
          ('surt3', 3): "the pale villager spirits are dragged into the ash storm by ember-red chains, reaching back ; the ash whirls round them => the spirits taken",
          ('surt3', 5): "the Ash Tyrant draws the frightened villager spirits round himself like a living shield ; their chains glow ember-red ; they flicker and look away => the shield of souls",
          ('surt4', 1): "the ash swirls upward into a towering column ; within it the giant's shape rises, his head bare ; embers spin round him => the column of ash",
          ('surt4', 2): "the giant grows huge, filling the cavern ; rocks crack and fall from the cavern roof around him ; his hands burn with blue soul-fire => the giant filling the cavern",
          ('surt5', 3): "a great hand of cracked black rock rises slowly out of the lava, molten light glowing between its fingers => the hand rising",
          ('escape', 2): "{H} runs along the causeway with the Lodestar held high ; each chain on the wall bursts as {H} passes and the spirits pour free => the wall of freed spirits",
          ('escape', 3): "{H} bursts out onto the causeway, Lodestar high ; the volcano erupts behind ; spirits stream after => {H} on the causeway",
          ('escape', 5): "{H} turns on the rocks to look back, the Lodestar glowing ; the freed spirits gather round => {H} on the shore",
          ('escape', 7): "the steam clears over the calm sea ; the aurora and shooting stars return ; {H} stands small on the rocks and lifts the Lodestar => the clear night sky",
          ('asgard', 6): "{H} kneels beside the Lodestar standing in the notch of the stone ; its lens stays dark ; {H} frowns and lays a hand on the cold stone => the dark Lodestar in the notch",
          ('sol1', 6): "{H} raises the Lodestar high before the golden figure ; its lens kindles with white light ; the golden figure turns toward {H} => {H} facing Solmyrk",
          ('sol2', 1): "a beam of white light from the Lodestar strikes Solmyrk's golden helm ; he reels back in the air, wings flaring => Solmyrk reeling",
          ('sol2', 2): "a jagged crack runs down the middle of the golden mask ; a cold blue eye glares through it => the cracked mask",
          ('sol2', 3): "black light pours out of the crack ; black ash creeps into the edges of his golden wings and feathers fall => the darkening wings",
          ('sol2', 5): "Solmyrk hovers over the hall, one side gold, the other black ash ; black feathers drift down => Wings of Ash",
          ('solfall', 1): "{H} raises the Lodestar ; a beam of white star-light strikes the black storm-shape full in the chest ; it recoils => the beam striking",
          ('solfall', 2): "the black storm splits down the middle and tears apart ; white light bursts through the gap and the thunderheads roll back => the storm torn open",
          ('celebrate', 1): "lanterns sway over the long tables ; the grown-ups of the village raise their tankards to the twins and laugh ; the twins raise theirs back => the toast",
          ('vela', 2): "Vela, free at last, stands at a deck rail and points her glowing compass out at the sky with a grin, her fur-trimmed cloak and white braid blowing ; {H} grips the rail beside her and smiles => Vela pointing the way",
          ('vela', 5): "the sky skiff glides in to the cliffside landing, its sail filling, rune-lanterns glowing ; Vela waves from the bow and the people on the landing wave back => the skiff at the landing"}
# the rules a scene carries into every one of its shots
RULE141 = {'surt1': 'Deep underground in a lava cavern: no sky, no aurora, no stars.', 'surt2': 'Deep underground in a lava cavern: no sky, no aurora, no stars.',
           'surt3': 'Deep underground in a lava cavern: no sky, no aurora, no stars. The spirits are pale villagers, not skulls or demons.',
           'surt4': 'Deep underground in a lava cavern: no sky, no aurora, no stars.', 'surt5': 'Deep underground in a lava cavern: no sky, no aurora, no stars.',
           'surt6': 'Deep underground in a lava cavern: no sky, no aurora, no stars.', 'celebrate': 'Only grown-ups: no children appear (the first child is born in shot 4).',
           'opening': 'The chains are small, human-sized iron chains on the spirits only — none in the sky.'}
LODESTAR = 'The Lodestar stays exactly as painted: a white-gold twisted staff whose head is a gold ring of six coloured gems round a glowing lens.'
CAM = ['slow push-in', 'slow pan to the right', 'slow orbit around the subject', 'gentle crane up', 'slow dolly back to reveal', 'tracking shot to the left']

def secs(cap):
    w = len(re.sub(r'[^\w\s]', ' ', cap or '').split()); return max(3.0, min(6.0, round(1.4 + 0.36 * w + 0.6, 1)))

def prompt(sc, b, who):
    k = who if who in NAME else 'zeldor'; o = 'zeldara' if k == 'zeldor' else 'zeldor'
    a = ACT141.get((sc['id'], b['n'])) or ACT138.get((sc['id'], b['n'])) or ACT[sc['id']][b['n'] - 1]
    a = a.replace('{H}', NAME[k]).replace('{O}', NAME[o]); act, _, end = a.partition('=>')
    acts = [x.strip() for x in act.split(';') if x.strip()]
    hold = sc['id'] == 'escape' and b['n'] <= 7 and 'Lodestar' not in act
    cam = SPECIAL.get((sc['id'], b['n'])) or CAM[(b['n'] - 1) % len(CAM)]
    L = ['Animate this painting as ONE continuous shot that starts exactly on it. Keep its hand-painted storybook style, its colours and light, and every character exactly as painted (faces, hair, clothes, proportions); nobody new appears.',
         'What happens, in order: ' + '; then '.join(acts) + '.',
         'It ends on: ' + end.strip() + '.' + (' %s holds the Lodestar the whole time.' % NAME[k] if hold else ''),
         'Camera: ' + cam + '.',
         'Clear, strong motion from the first second. One shot, no cuts, no text, no captions, no speech, no music.']
    if 'Lodestar' in a or sc['id'] == 'escape': L.insert(1, LODESTAR)
    if sc['id'] in RULE141 and not (sc['id'] == 'celebrate' and b['n'] >= 4): L.insert(1, RULE141[sc['id']])
    return '\n\n'.join(L) + '\n'

def pending():
    if not os.path.isfile(FIXLIST): return set(), 0
    return {l.strip() for l in open(FIXLIST, encoding='utf-8') if l.strip() and not l.startswith('#')}, os.path.getmtime(FIXLIST)

def plan():
    """every cut-scene: its versions and, per version, the ordered shots [(n, folder, image, sheet id)]"""
    P = []
    for i, sid in enumerate(ORDER):
        sc = next(s for s in J['scenes'] if s['id'] == sid); ver = any(len(b['ids']) > 1 for b in sc['beats'])
        whos = ['zeldor', 'zeldara'] if ver else ['all']; V = {}
        for w in whos:
            k = 'f' if w == 'zeldara' else 'm'; V[w] = []
            for b in sc['beats']:
                pid = b['ids'][1] if (len(b['ids']) > 1 and k == 'f') else b['ids'][0]
                img = os.path.join(SB, sid, w, '%02d.png' % b['n'])
                fold = '%02d_%s_%s' % (i + 1, sid, 'both' if ver and len(b['ids']) == 1 else LABEL[w])
                V[w].append({'n': b['n'], 'folder': fold, 'img': img, 'sheet': 'sc_' + pid, 'secs': secs(b['cap']), 'cap': b['cap'], 'beat': b})
        P.append({'id': sid, 'name': sc['name'], 'sc': sc, 'versions': V})
    return P

def make(only=None):
    from PIL import Image
    pend, pt = pending(); made = kept = waits = 0; seen = set(); MF = os.path.join(OUT, 'manifest.json')
    M = json.load(open(MF)) if only and os.path.isfile(MF) else {}      # one cut-scene at a time keeps the others in the manifest
    for p in plan():
        if only and p['id'] != only: continue
        M[p['id']] = {w: [[s['folder'], s['n'], s['secs']] for s in shots] for w, shots in p['versions'].items()}
        for w, shots in p['versions'].items():
            for s in shots:
                d = os.path.join(OUT, s['folder'], '%02d' % s['n'])
                if d in seen: continue
                seen.add(d); os.makedirs(d, exist_ok=True)
                if not os.path.isfile(s['img']): open(os.path.join(d, 'WAIT - not painted yet.txt'), 'w').close(); waits += 1; continue
                dst = os.path.join(d, 'start.jpg')
                if not os.path.isfile(dst) or os.path.getmtime(dst) < os.path.getmtime(s['img']):
                    Image.open(s['img']).convert('RGB').save(dst, quality=93); made += 1
                else: kept += 1
                open(os.path.join(d, 'PROMPT.txt'), 'w', encoding='utf-8').write(prompt(p['sc'], s['beat'], w if w != 'all' else 'zeldor'))
                wf = os.path.join(d, 'WAIT - being painted again (round 141).txt')
                if s['sheet'] in pend and os.path.getmtime(s['img']) < pt:
                    open(wf, 'w').write('This painting is being painted again (round 141). Make this shot after .\\tools\\sprites\\redo.ps1 -List r141_flow and python tools/video/storyboards.py.\n'); waits += 1
                elif os.path.isfile(wf): os.rename(wf, os.path.join(d, 'READY - painted again (round 141).txt')) if not os.path.isfile(os.path.join(d, 'READY - painted again (round 141).txt')) else None      # no deleting on the PC: the note is renamed
                o138 = os.path.join(d, 'WAIT - being painted again (round 138).txt')      # round 140c: the round-138 notes are long out of date
                if os.path.isfile(o138) and not os.path.isfile(wf) and not os.path.isfile(os.path.join(d, 'READY - painted again (round 138).txt')): os.rename(o138, os.path.join(d, 'READY - painted again (round 138).txt'))
                nw = os.path.join(d, 'WAIT - not painted yet.txt')
                if os.path.isfile(nw) and not os.path.isfile(os.path.join(d, 'READY - painted.txt')): os.rename(nw, os.path.join(d, 'READY - painted.txt'))
    json.dump(M, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=0)
    open(os.path.join(OUT, 'README.txt'), 'w', encoding='utf-8').write(README)
    n = sum(1 for _ in seen); print('%d shot folders (%d pictures new, %d kept, %d waiting for a painting)  ->  %s' % (n, made, kept, waits, OUT))

README = """MAKING THE CUT-SCENES IN GOOGLE FLOW  (round 141: every prompt matches its final painting, doc 97)

Every folder here is ONE cut-scene version; every numbered folder inside it is ONE shot (one clip).
  01_opening_both\\01\\   start.jpg  +  PROMPT.txt

For each shot:
  1. Flow -> new project (16:9) -> "Frames to video".
  2. First frame: start.jpg from the shot's folder. (No last frame - every shot starts on its own painting; the game cuts between them.)
  3. Paste PROMPT.txt as the prompt. Veo 3.1 (Quality if you have the credits, Fast otherwise), 8 s.
  4. Download the clip and drop it into the SAME shot folder (any name). Not happy? Make another and drop it in - the newest one counts.
Skip any shot folder that has a "WAIT ..." file: its painting is being painted again.

"both" folders: the same painting in Zoldor's and Zola's versions - make them once. "all": a cut-scene without the twins.
You do not need to trim: the intake cuts each clip to the time its line needs on screen (3-6 s).

When some cut-scenes are complete:
   cd C:\\Claude\\games\\Zeldara-v4
   .\\tools\\video\\video1.ps1 -Intake
A cut-scene goes into the game once every one of its shots is in; the rest wait.
"""

def intake():
    FF = shutil.which('ffmpeg') or sys.exit('ffmpeg not found')
    M = json.load(open(os.path.join(OUT, 'manifest.json'))); os.makedirs(VI, exist_ok=True); n = 0
    for sid, V in M.items():
        for w, shots in V.items():
            for fold, num, sec in shots:
                d = os.path.join(OUT, fold, '%02d' % num)
                if not os.path.isdir(d): continue
                vids = [f for f in os.listdir(d) if f.lower().endswith(VID) and os.path.getsize(os.path.join(d, f)) > 0]
                if not vids: continue
                v = os.path.join(d, max(vids, key=lambda f: os.path.getmtime(os.path.join(d, f))))
                dst = os.path.join(VI, '%s_%s_%02d.mp4' % (sid, w, num))
                if os.path.isfile(dst) and os.path.getmtime(dst) >= os.path.getmtime(v): continue
                subprocess.run([FF, '-y', '-loglevel', 'error', '-i', v, '-t', str(sec), '-an', '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', dst], check=True)
                n += 1; print('in  %s_%s_%02d.mp4  (%s s)  <- %s' % (sid, w, num, sec, os.path.relpath(v, OUT)))
    print('%d Flow clip(s) taken in' % n)

if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('--scene', help='one cut-scene, or several: a,b,c'); ap.add_argument('--intake', action='store_true'); a = ap.parse_args()
    if a.intake: intake()
    elif a.scene and ',' in a.scene: [make(s) for s in a.scene.split(',')]
    else: make(a.scene)
