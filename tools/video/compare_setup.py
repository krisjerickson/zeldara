#!/usr/bin/env python3
"""Round 129: CUT-SCENE VIDEO — KLING vs GOOGLE FLOW, three shots side by side (Kris: "let's setup to compare and contrast the 3").
The same three shots from one cut-scene (Bram's rescue, Zeldara, part 1: the cage, free, the river wall), each from the same painted
start frame and the same words:
  · Kling     — cut from the montage Kling already made (video_requests/04_bram_zeldara_p1/Untitled_Scene_*.mp4, 0–4, 4–8, 8–12 s)
  · Flow Omni — Google Flow, Omni Flash 1.2, 720p, 4 s (Kris makes it in Flow; upscale to 1080p if on a paid plan)
  · Flow Lite — Google Flow, Veo 3.1 Lite, 720p, 4 s
Writes video_requests/compare_r129/shot1…3/ with start.png, prompt.txt (paste into Flow) and kling.mp4, plus HOW-TO.txt.
    python tools/video/compare_setup.py            (on the PC — it needs the Kling montage and ffmpeg)
Then, when Flow's clips are saved as shotN/flow_omni.mp4 and shotN/flow_lite.mp4:
    python tools/video/compare_intake.py           → lab/preview/vidcmp/ for the Lab tab "Cut-scene video: Kling vs Flow"
"""
import os, re, glob, shutil, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = os.path.join(ROOT, 'video_requests', '04_bram_zeldara_p1')
OUT = os.path.join(ROOT, 'video_requests', 'compare_r129')
SHOTS = [(1, 'The cage', 0), (2, 'Free', 4), (3, 'The river wall', 8)]

P = open(os.path.join(SRC, 'PROMPT.txt'), encoding='utf-8').read()
look = re.search(r'^LOOK:.*$', P, re.M).group(0)
shot_lines = {int(m.group(1)): m.group(0) for m in re.finditer(r'^SHOT (\d+) — .*$', P, re.M)}


def prompt_for(n):
    s = shot_lines[n]
    s = re.sub(r'^SHOT \d+ — @image\d+, [\d–]+ s — ', '', s)                 # the montage's timing goes; Flow makes one 4 s shot
    s = s.replace('exactly @image%d' % n, 'exactly the start frame').replace('@image%d' % n, 'the start frame')
    return ('A 4-second shot, 16:9, that begins exactly on the start frame and stays in that place for the whole shot. '
            'Only the actions below happen, in this order; everything else stays as painted, alive only in small ways '
            '(cloth and hair stirring, flames flickering, mist, light). Same faces, hair, clothes and colours as painted. '
            'Do not add people, creatures or objects. Whatever a person holds stays in their hands.\n\n'
            + s + '\n\n' + look + '\nCAMERA: one unbroken shot with one simple slow push-in. No cuts. No dialogue, no text on screen.\n')


def main():
    os.makedirs(OUT, exist_ok=True)
    kl = sorted(glob.glob(os.path.join(SRC, 'Untitled_Scene_*.mp4')))
    if not kl: raise SystemExit('No Kling montage in ' + SRC)
    for n, name, t0 in SHOTS:
        d = os.path.join(OUT, 'shot%d' % n); os.makedirs(d, exist_ok=True)
        shutil.copyfile(os.path.join(SRC, 'image%d.png' % n), os.path.join(d, 'start.png'))
        open(os.path.join(d, 'prompt.txt'), 'w', encoding='utf-8').write(prompt_for(n))
        k = os.path.join(d, 'kling.mp4')
        if not os.path.exists(k):
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t0), '-t', '4', '-i', kl[-1], '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-an', k], check=True)
        print('shot%d (%s): start.png, prompt.txt, kling.mp4' % (n, name))
    open(os.path.join(OUT, 'HOW-TO.txt'), 'w', encoding='utf-8').write(HOWTO)
    print('→', OUT)


HOWTO = """KLING vs GOOGLE FLOW — three shots (round 129)

Each folder shot1, shot2, shot3 has:
  start.png    the painted frame the shot must start from
  prompt.txt   the words — paste them into Flow as they are
  kling.mp4    the same shot as Kling made it (cut from the Bram montage)

In Google Flow (labs.google/flow), for each shot:
  1. New project. Choose FRAMES TO VIDEO (start frame) and upload start.png as the first frame. No end frame.
  2. Model: OMNI FLASH 1.2 · 16:9 · 720p · 4 seconds. Turn on "Return silent videos" if it asks about audio (the game adds its own music).
     Paste prompt.txt. Generate (about 12 credits). If you are on a paid plan, upscale the one you like to 1080p (free).
     Download it into the shot's folder as   flow_omni.mp4
  3. Same start frame and words, model: VEO 3.1 LITE · 720p · 4 seconds (about 10 credits).
     Download it as   flow_lite.mp4
  Make two or three tries of each if you like and keep the best — and write down how many tries it took (it matters: cost per usable clip).
  Three shots × both models ≈ 66 credits: two days of the free 50 a day, or one go on Google AI Plus or Pro.

Then tell Claude — it runs tools/video/compare_intake.py and the three are side by side in the Lab (Cut-scene video: Kling vs Flow).
"""

if __name__ == '__main__': main()
