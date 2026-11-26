#!/usr/bin/env python3
"""Round 136: THE WORLD, REVAMPED 5 — the repainted landmarks standing in their crossings with the road open (Kris on take 4: "All of these
also need to have the path shown for after the quadrant is opened"), and the twenty thin banners over a moment in the game.
    python tools/world/world_looks5.py SHOTS4 ITEMS      (SHOTS4: world_shots4.py's shots, realms open; ITEMS: the cut pictures, sprites/out/scenery/items)
    → lab/preview/worldlook5/lm5_<gate>.jpg, ban_NN.jpg"""
import os, sys, json
import numpy as np
from PIL import Image
H_ = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H_)
import world_looks2 as L
S4 = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/wshots4'
IT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(L.ROOT, 'sprites', 'out', 'scenery', 'items')
OUT = os.path.join(L.ROOT, 'lab', 'preview', 'worldlook5'); os.makedirs(OUT, exist_ok=True); L.OUT = OUT
W, H = L.W, L.H
# gate, landmark, how big (fraction of the picture's height for a crossing up the screen, of its width for one across)
PLAN = [('gate_silverrun_2', 'lm2_bram_bridge', 'h', 0.98), ('gate_scarp_2', 'lm2_mira_lift', 'w', 0.62),
        ('gate_chasm_2', 'lm2_dunn_bridge', 'h', 0.98), ('gate_ember_2', 'lm2_vela_pass', 'w', 0.62)]

def landmarks():
    for gid, pid, how, f in PLAN:
        if not os.path.exists(os.path.join(S4, gid + '_F.png')): print('  no shot', gid); continue
        ld = lambda k: np.asarray(Image.open(os.path.join(S4, '%s_%s.png' % (gid, k))).convert('RGB').resize((W, H), Image.LANCZOS), np.float32)
        F, P, G = ld('F'), ld('P'), ld('G'); cam = json.load(open(os.path.join(S4, gid + '_cam.json')))
        sx, sy = cam[0] * cam[2] * W / 1280, cam[1] * cam[2] * H / 720
        pc = Image.open(os.path.join(IT, pid + '.png')).convert('RGBA')
        if how == 'h': h = int(H * f); pc = pc.resize((int(pc.width * h / pc.height), h), Image.LANCZOS)
        else: w = int(W * f); pc = pc.resize((w, int(pc.height * w / pc.width)), Image.LANCZOS)
        act = L.mask(F, P, grow=2); props = L.mask(P, G, grow=2)
        Yg, Xg = np.mgrid[0:H, 0:W]; box = ((np.abs(Xg - sx) < pc.width * 0.7) & (np.abs(Yg - sy) < pc.height * 0.6)).astype(np.float32)
        rm = props * L.blurm(box, 6)[..., None]                       # the old gatehouses go: the landmark is the passage
        base = F * (1 - rm) + G * rm
        a = L.paste(base, pc, sx, sy, 1.0, anchor='center')
        L.save(a, 'lm5_%s' % gid[5:-2]); print('  ✓', pid)

def banners():
    bg = Image.open(os.path.join(L.ROOT, 'lab', 'preview', 'worldlook4', 'frame4_realm.jpg')).convert('RGBA').resize((W, H))
    for i in range(1, 21):
        p = os.path.join(IT, 'wl_banner_%02d.png' % i)
        if not os.path.exists(p): continue
        c = bg.copy(); c.alpha_composite(Image.open(p).convert('RGBA').resize((W, H), Image.LANCZOS)); c.convert('RGB').save(os.path.join(OUT, 'ban_%02d.jpg' % i), quality=84)

if __name__ == '__main__':
    landmarks(); banners()
