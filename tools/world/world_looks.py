#!/usr/bin/env python3
"""Round 124: THE WORLD, REVAMPED — mock-ups for the Lab (Kris: "the video images are really epic, and i'm wondering if there are visual
elements from them that we can better incorporate into the overworld … Do a full analysis of all the ways we could revamp the world to make
it more visually compelling, especially taking inspiration from the rich images we've created from the cut-scene images, and make a portion of
the lab for me to consider options").

Each option is shown as TODAY → PROPOSED on a real screenshot of the game (the HUD hidden). The proposed pictures are rough mock-ups made
here with image filters and the game's own painted sprites — they show the idea and its strength, not the final art.
    python tools/world/world_looks.py --shots DIR --cut DIR     (DIR of c_<place>.png screenshots; DIR of cut-scene shot JPGs)
Writes lab/preview/worldlook/<option>_a.jpg (today) and _b.jpg (proposed), 960×540.
"""
import os, sys, math, glob
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageFont
import scipy.ndimage as nd

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SH = sys.argv[sys.argv.index('--shots') + 1]; CUT = sys.argv[sys.argv.index('--cut') + 1]
OUT = os.path.join(ROOT, 'lab', 'preview', 'worldlook'); os.makedirs(OUT, exist_ok=True)
W, H = 960, 540
rng = np.random.default_rng(7)


def shot(name):
    im = Image.open(os.path.join(SH, 'c_%s.png' % name)).convert('RGB')
    w, h = im.size; return np.asarray(im.crop(((w - W) // 2, (h - H) // 2, (w + W) // 2, (h + H) // 2)), dtype=np.float32)


def cut(name, box=None):
    im = Image.open(os.path.join(CUT, name + '.jpg')).convert('RGB')
    if box: im = im.crop(box)
    return im


def save(a, name): Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(os.path.join(OUT, name + '.jpg'), quality=86)
def blur(a, r): return np.asarray(Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r)), dtype=np.float32)
def blurf(m, r): return nd.gaussian_filter(m.astype(np.float32), r)
def lum(a): return (0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2])[..., None] / 255
YY, XX = np.mgrid[0:H, 0:W].astype(np.float32)

SPLIT = {'grass': ([18, 46, 40], [255, 226, 160]), 'wet': ([10, 40, 60], [190, 240, 255]), 'high': ([40, 36, 70], [235, 240, 255]),
         'ash': ([40, 14, 12], [255, 170, 90]), 'vill': ([30, 34, 60], [255, 220, 170])}


def grade(a, realm, sat=1.45, con=1.28):
    """the cut-scene palette: deeper, darker mid-tones (gamma), richer but not neon colour, split-toned shadows and lights"""
    if realm in ('grass', 'vill'): sat = min(sat, 1.18)
    a = 255 * np.clip(a / 255, 0, 1) ** 1.25                          # darker mid-tones: the paintings live in the shadows
    l = lum(a); a = l * 255 + (a - l * 255) * sat
    a = (a - 110) * con + 104
    sh, hi = (np.array(x, dtype=np.float32) for x in SPLIT[realm]); l = np.clip(lum(a), 0, 1)
    tint = sh * (1 - l) + hi * l; a = a * 0.8 + tint * 0.2 * (a / 120)
    if realm == 'grass': a = a * np.array([0.98, 0.93, 0.9], dtype=np.float32) + np.array([6, 0, 4], dtype=np.float32)      # take the lime out: deeper, bluer greens
    return a


def vignette(a, k=0.5, lo=0.35):
    v = np.clip(1.15 - k * np.sqrt(((XX - W / 2) / (W / 2)) ** 2 + ((YY - H / 2) / (H / 2)) ** 2), lo, 1)[..., None]; return a * v


def objects(a):
    """things standing on the ground: where the picture has detail or colour the plain ground does not"""
    g = np.abs(nd.sobel(lum(a)[..., 0], 0)) + np.abs(nd.sobel(lum(a)[..., 0], 1)); l = lum(a)[..., 0]
    loc = blurf(l, 25); m = np.clip((g - 0.3) * 3, 0, 1) + np.clip((loc - l - 0.12) * 4, 0, 1); m = nd.binary_opening(m > 0.5, iterations=2).astype(np.float32)
    return np.clip(blurf(m, 3) * 1.4, 0, 1)


def shadows(a, dx=10, dy=14, s=0.5, r=9):
    m = objects(a); sh = np.roll(np.roll(blurf(m, r), dy, 0), dx, 1); sh = np.clip(sh - m * 0.8, 0, 1)
    ao = np.clip(blurf(m, 22) * 1.2, 0, 1)
    return a * (1 - s * sh[..., None]) * (1 - 0.25 * ao[..., None] * (1 - m[..., None]))


def clarity(a, r=18, k=0.6): return a + (a - blur(a, r)) * k


def glow(mask, r, col, k=1.0): return blurf(mask, r)[..., None] * np.array(col, dtype=np.float32) * k


def dot(a, x, y, r, col, k=1.0):
    x0, x1, y0, y1 = int(max(0, x - 4 * r)), int(min(W, x + 4 * r)), int(max(0, y - 4 * r)), int(min(H, y + 4 * r))
    if x1 <= x0 or y1 <= y0: return
    d = np.exp(-(((XX[y0:y1, x0:x1] - x) ** 2 + (YY[y0:y1, x0:x1] - y) ** 2) / (r * r)))[..., None]
    a[y0:y1, x0:x1] += d * np.array(col, dtype=np.float32) * k


def font(sz):
    for f in ('/usr/share/fonts/truetype/dejavu/DejaVuSerif-BoldItalic.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'):
        if os.path.exists(f): return ImageFont.truetype(f, sz)
    return ImageFont.load_default()


def title(a, text, sub=None, y=None):
    im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)); d = ImageDraw.Draw(im); f = font(30)
    w = d.textlength(text, font=f); y = y or H - 108
    for o in ((2, 2), (0, 0)): d.text(((W - w) / 2 + o[0], y + o[1]), text, font=f, fill=(0, 0, 0) if o[0] else (244, 232, 200))
    if sub:
        f2 = font(16); w2 = d.textlength(sub, font=f2); d.text(((W - w2) / 2, y + 40), sub, font=f2, fill=(190, 205, 220))
    return np.asarray(im, dtype=np.float32)


def plants():
    im = Image.open(os.path.join(ROOT, 'assets', 'scenery', 'plants-0.webp')).convert('RGBA'); al = np.asarray(im)[..., 3] > 20
    lab, n = nd.label(al); out = []
    for s in nd.find_objects(lab):
        h, w = s[0].stop - s[0].start, s[1].stop - s[1].start
        if h > 40 and w > 40: out.append(im.crop((s[1].start, s[0].start, s[1].stop, s[0].stop)))
    return out


def stamp(a, spr, x, y, scale):
    spr = spr.resize((max(1, int(spr.size[0] * scale)), max(1, int(spr.size[1] * scale))), Image.Resampling.LANCZOS)
    s = np.asarray(spr, dtype=np.float32); al = s[..., 3:] / 255; h, w = al.shape[:2]; x0, y0 = int(x - w / 2), int(y - h)
    if x0 < 0 or y0 < 0 or x0 + w > W or y0 + h > H: return
    sh = blurf(al[..., 0], 4); a[y0 + 6:y0 + h + 6 if y0 + h + 6 <= H else H, x0 + 5:x0 + w + 5 if x0 + w + 5 <= W else W] *= (1 - 0.35 * sh[:min(h, H - y0 - 6), :min(w, W - x0 - 5)])[..., None]
    a[y0:y0 + h, x0:x0 + w] = a[y0:y0 + h, x0:x0 + w] * (1 - al) + s[..., :3] * al


def paste(a, im, box, feather=40):
    x0, y0, x1, y1 = box; p = np.asarray(im.resize((x1 - x0, y1 - y0), Image.Resampling.LANCZOS), dtype=np.float32)
    m = np.ones((y1 - y0, x1 - x0), dtype=np.float32); m[:feather] *= np.linspace(0, 1, feather)[:, None]; m[-feather:] *= np.linspace(1, 0, feather)[:, None]
    m[:, :feather] *= np.linspace(0, 1, feather)[None]; m[:, -feather:] *= np.linspace(1, 0, feather)[None]
    a[y0:y1, x0:x1] = a[y0:y1, x0:x1] * (1 - m[..., None]) + p * m[..., None]


def lights(a):
    """the lamps, windows and runes in a picture: bright warm points and the glowing rune-cyan"""
    r, g, b = a[..., 0], a[..., 1], a[..., 2]; l = lum(a)[..., 0]
    warm = ((l > 0.78) & (r > b + 40)).astype(np.float32); rune = ((g > 170) & (b > 170) & (r < 170)).astype(np.float32)
    return warm, rune


def main():
    P = {}
    # 1 · realm colour grades
    for realm in ('grass', 'wet', 'high', 'ash'):
        a = shot(realm); save(a, 'grade_%s_a' % realm); save(vignette(clarity(grade(a, realm)), 0.45, 0.5), 'grade_%s_b' % realm)
    # 2 · painted light and shadow
    a = shot('vill'); save(a, 'shadow_a'); save(vignette(clarity(shadows(grade(a, 'vill', 1.2, 1.12))), 0.4, 0.55), 'shadow_b')
    # 3 · golden hour
    b = shadows(grade(a, 'vill', 1.35, 1.15), 22, 16, 0.6, 7)
    warm = np.clip(1 - (XX / W * 0.6 + YY / H * 0.4), 0, 1)[..., None]
    b = b * (0.55 + 0.6 * warm) * np.array([1.18, 0.92, 0.68], dtype=np.float32) + warm * np.array([70, 30, -10], dtype=np.float32) + (1 - warm) * np.array([-6, -2, 26], dtype=np.float32); save(a, 'dusk_a'); save(vignette(b, 0.55, 0.4), 'dusk_b')
    # 4 · night of lanterns and runes
    wm, rn = lights(a); n = a * np.array([0.22, 0.28, 0.5], dtype=np.float32) + np.array([4, 8, 22], dtype=np.float32)
    n = n + glow(wm, 26, [255, 170, 80], 7.0) * (0.35 + a / 255 * 0.65) + glow(rn, 14, [90, 230, 255], 2.2) + glow(rn, 50, [60, 160, 255], 3.0) * (a / 255)
    na = shot('night') if os.path.exists(os.path.join(SH, 'c_night.png')) else a * 0.6
    save(na, 'night_a'); save(vignette(n, 0.5, 0.35), 'night_b')
    # 5 · aurora over the land (the Wetlands at night)
    a = shot('wet'); n = a * np.array([0.2, 0.27, 0.46], dtype=np.float32) + np.array([4, 10, 24], dtype=np.float32)
    water = ((a[..., 2] > a[..., 0] + 25) & (lum(a)[..., 0] < 0.6)).astype(np.float32); water = blurf(water, 2)
    band = np.zeros((H, W), np.float32)
    for k, (ph, col) in enumerate(((0.0, 1), (1.7, 2))):
        yc = H * (0.32 + 0.18 * k) + 60 * np.sin(XX[0] / W * 6.3 + ph) + 25 * np.sin(XX[0] / W * 17 + ph * 2)
        band += np.exp(-((YY - yc[None, :]) / (70 + 30 * k)) ** 2) * (0.6 + 0.4 * np.sin(XX / 37 + ph))
    gcol = np.array([60, 255, 170], dtype=np.float32); vcol = np.array([170, 90, 255], dtype=np.float32)
    au = np.clip(band, 0, 1.4)[..., None] * (gcol * 0.7 + vcol * 0.5 * (YY / H)[..., None]) * 0.55
    n = n + au * (0.35 + 1.1 * water[..., None]) + blurf(water * band, 1)[..., None] * gcol * 0.12 * (rng.random((H, W, 1)) > 0.985)
    save(a, 'aurora_a'); save(vignette(n, 0.45, 0.35), 'aurora_b')
    # 6 · living air (Ashlands embers, Grasslands fireflies)
    a = shot('ash'); b = grade(a, 'ash', 1.35, 1.2)
    for i in range(160):
        x, y = rng.random() * W, rng.random() * H; r = 0.8 + rng.random() * 1.8
        dot(b, x, y, r, [255, 150 + 60 * rng.random(), 60], 1.6); dot(b, x - 3, y + 6, r * 0.8, [255, 120, 40], 0.5)
    for i in range(90): dot(b, rng.random() * W, rng.random() * H, 1.4, [150, 150, 150], 0.5)
    b = b + glow(((a[..., 0] > 200) & (a[..., 1] > 90)).astype(np.float32), 30, [255, 110, 30], 1.6)
    save(a, 'air_ash_a'); save(vignette(b, 0.5, 0.4), 'air_ash_b')
    a = shot('grass'); b = grade(a, 'grass', 1.3, 1.15) * 0.82
    for i in range(70): dot(b, rng.random() * W, rng.random() * H, 1.6, [210, 255, 120], 2.0);
    for i in range(120): dot(b, rng.random() * W, rng.random() * H, 0.9, [255, 245, 200], 0.6)
    save(a, 'air_grass_a'); save(vignette(b, 0.45, 0.45), 'air_grass_b')
    # 7 · cloud shadows and sun shafts
    a = shot('grass'); c = blurf(rng.random((H // 30 + 2, W // 30 + 2)), 1.2); c = np.asarray(Image.fromarray((c / c.max() * 255).astype(np.uint8)).resize((W, H), Image.Resampling.BICUBIC), dtype=np.float32) / 255
    c = np.clip((c - 0.5) * 3, 0, 1); b = grade(a, 'grass', 1.3, 1.15) * (1 - 0.38 * c[..., None])
    ray = np.exp(-(((XX - 0.55 * W) - (YY - H / 2) * 0.7) / 90) ** 2)[..., None]; b = b + ray * np.array([90, 75, 40], dtype=np.float32) * 0.55
    save(a, 'clouds_a'); save(vignette(b, 0.4, 0.5), 'clouds_b')
    # 8 · painterly depth (tilt-shift edges and haze)
    a = shot('vill'); bl = blur(a, 5); m = np.clip((np.abs(YY - H * 0.52) / (H * 0.5) - 0.35) * 2.2, 0, 1)[..., None]
    b = grade(a, 'vill', 1.25, 1.12); b = b * (1 - m) + grade(bl, 'vill', 1.1, 1.0) * m; b = b + np.clip(0.5 - YY / H, 0, 1)[..., None] * np.array([40, 50, 70], dtype=np.float32) * 0.6
    save(a, 'depth_a'); save(vignette(b, 0.55, 0.42), 'depth_b')
    # 9 · deep, living water
    a = shot('wet'); water = ((a[..., 2] > a[..., 0] + 25) & (lum(a)[..., 0] < 0.62)).astype(np.float32)
    deep = np.clip((blurf(water, 40) - 0.45) * 2.2, 0, 1) * water; edge = np.clip(blurf(water, 3) - water * 0.85, 0, 1) * water
    b = grade(a, 'wet', 1.3, 1.15); b = b * (1 - 0.55 * deep[..., None]) + deep[..., None] * np.array([0, 20, 45], dtype=np.float32)
    b = b + blurf(edge, 1.5)[..., None] * np.array([230, 245, 255], dtype=np.float32) * 2.2
    sp = (rng.random((H, W)) > 0.9994) * (water > 0.5) * (deep < 0.6); b = b + glow(sp.astype(np.float32), 1.0, [255, 255, 255], 6)
    save(a, 'water_a'); save(vignette(shadows(b), 0.45, 0.45), 'water_b')
    # 10 · richer ground (painted plants scattered, patches of moss, clover and dry grass)
    a = shot('grass'); pl = plants(); n1 = np.asarray(Image.fromarray((rng.random((12, 20)) * 255).astype(np.uint8)).resize((W, H), Image.Resampling.BICUBIC), dtype=np.float32)[..., None] / 255
    b = grade(a, 'grass', 1.3, 1.15) * (0.9 + 0.16 * n1) + np.clip((n1 - 0.6) * 3, 0, 1) * np.array([18, 12, -8], dtype=np.float32)
    for i in range(22):
        x, y = rng.random() * W, 60 + rng.random() * (H - 60)
        if abs(x - W / 2) < 50 and abs(y - H / 2) < 70: continue
        stamp(b, pl[int(rng.random() * len(pl))], x, y, 0.22 + rng.random() * 0.2)
    for i in range(260):
        x, y = rng.random() * W, rng.random() * H; c = [[255, 240, 120], [255, 160, 200], [190, 200, 255], [255, 255, 255]][i % 4]; dot(b, x, y, 1.3, c, 0.8)
    save(a, 'ground_a'); save(vignette(shadows(b), 0.45, 0.5), 'ground_b')
    # 11 · landmarks from the cut-scenes (a painted set-piece standing in the world)
    a = shot('high'); b = grade(a, 'high', 1.3, 1.15); paste(b, cut('sc_ss_mira_03_1_m', (0, 120, 1600, 760)), (20, 0, 940, 330), 70)
    save(a, 'landmark_a'); save(vignette(shadows(b), 0.45, 0.45), 'landmark_b')
    # 12 · vista moments (the camera eases out into the painted panorama)
    a = shot('ash'); v = np.asarray(cut('sc_ss_vela_03_1_m').resize((W, round(W * 1024 / 1600)), Image.Resampling.LANCZOS), dtype=np.float32)
    v = v[(v.shape[0] - H) // 2:(v.shape[0] - H) // 2 + H]; bar = int((H - W / 2.39) / 2); v = grade(v, 'ash', 1.05, 1.05); v[:bar] = 0; v[H - bar:] = 0
    v = title(v, 'The Ember Wall', 'thirty-six years of fire', y=H - bar - 70); save(a, 'vista_a'); save(v, 'vista_b')
    # 13 · adventure sites worthy of their stories
    a = shot('site'); b = grade(a, 'grass', 1.3, 1.15) * 0.86
    beam = np.exp(-((XX - 478) / 22) ** 2)[..., None] * np.clip(1 - YY / 330, 0, 1)[..., None]; b = b + beam * np.array([110, 210, 255], dtype=np.float32) * 0.8
    ring = np.exp(-((np.sqrt((XX - 478) ** 2 + ((YY - 330) * 2.2) ** 2) - 120) / 10) ** 2)[..., None]; b = b + ring * np.array([90, 220, 255], dtype=np.float32) * 0.7
    t = cut('sc_ss_vela_01_1', (40, 0, 900, 1024)).resize((250, 298), Image.Resampling.LANCZOS); tp = np.asarray(t, dtype=np.float32)
    b[24:322, 690:940] = tp; b[20:24, 686:944] = 230; b[322:326, 686:944] = 230; b[20:326, 686:690] = 230; b[20:326, 940:944] = 230
    b = title(b, '', None); im = Image.fromarray(np.clip(b, 0, 255).astype(np.uint8)); d = ImageDraw.Draw(im); d.text((692, 330), 'the tower as its story paints it', font=font(14), fill=(235, 225, 200)); b = np.asarray(im, dtype=np.float32)
    save(a, 'sites_a'); save(vignette(shadows(b), 0.45, 0.45), 'sites_b')
    # 14 · the land remembers (colour returns as the spirits are freed)
    a = shot('grass'); col = grade(a, 'grass', 1.4, 1.2); l = lum(a) * 255; grey = l * np.array([0.92, 0.9, 0.86], dtype=np.float32) * 0.78 + 8
    d = np.sqrt((XX - W * 0.68) ** 2 + (YY - H * 0.55) ** 2); m = np.clip((W * 0.42 - d) / 80, 0, 1)[..., None]
    b = grey * (1 - m) + col * m
    for k in range(7):
        ang = k / 7 * 6.28 + 0.3; pts = [(W * 0.68 + math.cos(ang + 0.25 * math.sin(s / 30)) * s, H * 0.55 + math.sin(ang + 0.25 * math.sin(s / 30)) * s) for s in range(0, 420, 4)]
        for x, y in pts[::2]: dot(b, x, y, 2.2, [110, 235, 255], 1.1)
    dot(b, W * 0.68, H * 0.55, 26, [120, 230, 255], 0.9)
    save(a, 'restore_a'); save(vignette(b, 0.45, 0.45), 'restore_b')
    # 15 · cinematic moments in play
    a = shot('vill'); z = Image.fromarray(np.clip(grade(a, 'vill', 1.3, 1.15), 0, 255).astype(np.uint8)).crop((60, 34, W - 60, H - 34)).resize((W, H), Image.Resampling.LANCZOS)
    b = vignette(shadows(np.asarray(z, dtype=np.float32)), 0.5, 0.45); bar = int((H - W / 2.39) / 2); b[:bar] = 0; b[H - bar:] = 0
    b = title(b, 'Mirror Lake Village', 'home of the twins', y=H - bar - 66); save(a, 'cine_a'); save(b, 'cine_b')
    print('mock-ups in', OUT, len(os.listdir(OUT)))


if __name__ == '__main__':
    main()
