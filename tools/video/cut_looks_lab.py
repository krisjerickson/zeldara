"""Round 122b: the Lab's Cut-scene looks data (lab/src/js/79w-0-cutlooks-data.js) from the looks made by tools/video/cut_looks.py
(lab/preview/looks/cl_<scene>_<look>.json) and the asset-store links of their videos (lab/preview/looks/assets.json: file -> url, filled in
when Claude uploads them to the Lab).   python tools/video/cut_looks_lab.py   (then node build.mjs)"""
import os, json, glob
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')); D = os.path.join(ROOT, 'lab', 'preview', 'looks')
A = json.load(open(os.path.join(D, 'assets.json'))) if os.path.exists(os.path.join(D, 'assets.json')) else {}
plan = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'series_plan.json')))['scenes']
picks = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'series_picks.json')))
LOOKS = {'saga': {'name': 'Saga — epic widescreen', 'short': 'Saga', 'what': 'Letterboxed 2.39:1 with a teal-and-orange grade and film grain. Slow, grand camera — cranes, long pushes, orbits; long dissolves between frames, hard cuts inside them, a white flash on the big blows. The longest and most sweeping.'},
         'pulse': {'name': 'Pulse — the trailer cut', 'short': 'Pulse', 'what': 'Locked to a 112 BPM beat: every shot lasts whole beats and each frame comes in on a flash, a whip-pan or a dip to black. Snap zooms that hit fast and settle, a kick on the beat, punchy contrast and colour fringing on the hits.'},
         'storybook': {'name': 'Storybook — a painted tale', 'short': 'Storybook', 'what': 'Gentle Ken Burns drifts only, soft dissolves between shots and an iris (a closing circle) between frames. A warm parchment grade with paper grain and an oval vignette — calm, unhurried, like turning pages.'},
         'dream': {'name': 'Dream — a memory', 'short': 'Dream', 'what': 'A slow floating camera, a soft bloom on everything, the colour drained toward blue-violet, a warm light leak drifting across, ghosted dissolves between shots and dips to white between frames.'}}
# round 124: Saga stays; Pulse, Storybook and Dream are gone; each cut-scene gets three looks of its own (tools/video/cut_looks2.py LOOKS2)
import sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import cut_looks2 as C2
LOOKS = {'saga': dict(LOOKS['saga'], short='Saga')}
for k, v in C2.LOOKS2.items(): LOOKS[k] = {'name': v['name'], 'short': v['name'], 'what': v['what'], 'scene': v['scene']}
order = [s['id'] for s in plan]; S = {}
for f in sorted(glob.glob(os.path.join(D, 'cl_*.json'))):
    e = json.load(open(f)); mp4 = os.path.basename(f)[:-5] + '.mp4'
    if e['look'] not in LOOKS: continue
    if not os.path.exists(os.path.join(D, mp4)) and mp4 not in A: continue
    sc = S.setdefault(e['scene'], {'id': e['scene'], 'name': e['name'], 'frames': len(e['frames']), 'shots': sum(len(x['shots']) for x in e['frames']), 'looks': {}})
    sc['looks'][e['look']] = {'file': mp4, 'url': A.get(mp4, ''), 'length': e['length'], 'cues': e.get('cues', []), 'words': [[x['start'], x['end'], x['cap']] for x in e['frames']]}
scenes = sorted(S.values(), key=lambda s: order.index(s['id']) if s['id'] in order else 99)
done = sum(1 for s in plan if all(('%s_%02d' % (s['id'], b['n'])) in picks for b in s['beats']))
js = ('// made by tools/video/cut_looks_lab.py (round 122b) — do not edit by hand\nvar LCUTLOOK=' +
      json.dumps({'LOOKS': LOOKS, 'scenes': scenes, 'waiting': len(plan) - done}, ensure_ascii=False, separators=(',', ':')) + ';\n')
open(os.path.join(ROOT, 'lab', 'src', 'js', '79w-0-cutlooks-data.js'), 'w', encoding='utf-8').write(js)
print('%d cut-scenes, %d looks, %d with links' % (len(scenes), sum(len(s['looks']) for s in scenes), sum(1 for s in scenes for l in s['looks'].values() if l['url'])))
