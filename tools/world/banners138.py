#!/usr/bin/env python3
"""Round 138 (Kris: "for every new banner, it still shows the golden horned deer thing, but this should only be for the first banner … I need to be
able to full screen them and get the little videos of how they will show up in the game"): the round-136 previews laid each new banner over a
picture that already had the take-4 frame (with its deer) in it. Now each banner goes over the clean game shot, and each gets the same 5-second
clip as take 4: the camera eases in, the frame fades in with the realm's line, holds, fades.
    python tools/world/banners138.py [SHOTS3] [ITEMS]   → lab/preview/worldlook5/ban_NN.jpg + ban_NN.mp4"""
import os, sys
from PIL import Image, ImageDraw, ImageFont
H_ = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H_)
import world_looks2 as L
L.SH = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/wshots3'
IT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(L.ROOT, 'sprites', 'out', 'scenery', 'items')
import world_looks4 as W4
OUT = os.path.join(L.ROOT, 'lab', 'preview', 'worldlook5'); W4.OUT = OUT; W, H = L.W, L.H
TITLE, SUB = 'Fernheim', 'the second realm — the bridge holds'
font = ImageFont.truetype(W4.FONT, 30); small = ImageFont.truetype(W4.FONT, 17)
base = W4.img(L.load('wet', 'F'))
only = [int(x) for x in os.environ.get('ONLY', '').split(',') if x]
for i in range(1, 21):
    if only and i not in only: continue
    p = os.path.join(IT, 'wl_banner_%02d.png' % i)
    if not os.path.exists(p): continue
    fr = Image.open(p).convert('RGBA').resize((W, H), Image.LANCZOS); out = []; n = 24 * 5
    for f in range(n):
        t = f / n; z = 1 + 0.08 * min(1, t / 0.35) ** 0.5
        cw, ch = int(W / z), int(H / z); x0, y0 = (W - cw) // 2, int((H - ch) * 0.45)
        im = base.crop((x0, y0, x0 + cw, y0 + ch)).resize((W, H), Image.LANCZOS).convert('RGBA')
        a = min(1, max(0, (t - 0.12) / 0.18)) * (1 - min(1, max(0, (t - 0.86) / 0.14)))
        im.alpha_composite(Image.new('RGBA', (W, H), (8, 10, 20, int(70 * a))))
        f2 = fr.copy(); f2.putalpha(f2.getchannel('A').point(lambda v: int(v * a))); im.alpha_composite(f2)
        ta = min(1, max(0, (t - 0.25) / 0.15)) * (1 - min(1, max(0, (t - 0.84) / 0.12)))
        if ta > 0:
            d = ImageDraw.Draw(im); tw = d.textlength(TITLE, font=font); sw = d.textlength(SUB, font=small)
            d.text(((W - tw) / 2, H * 0.78), TITLE, font=font, fill=(255, 236, 190, int(255 * ta)), stroke_width=2, stroke_fill=(20, 14, 8, int(200 * ta)))
            d.text(((W - sw) / 2, H * 0.78 + 40), SUB, font=small, fill=(220, 225, 235, int(230 * ta)), stroke_width=1, stroke_fill=(10, 10, 10, int(180 * ta)))
        out.append(im)
    W4.clip(out, 'ban_%02d' % i); out[int(n * 0.55)].convert('RGB').save(os.path.join(OUT, 'ban_%02d.jpg' % i), quality=87)
