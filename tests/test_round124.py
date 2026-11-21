"""Round 124: cut-scene looks, second round (Saga kept; three new looks per finished cut-scene, fifteen styles in all; the words over each
picture at reading pace, some pictures without words) and four new Skirmish prompts in Music & sound.
python tests/test_round124.py   (after tools/video/cut_looks2.py, tools/video/cut_looks_lab.py and node build.mjs)"""
import sys, os, json, re
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]), flush=True)
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data = open(os.path.join(R, 'lab', 'src', 'js', '79w-0-cutlooks-data.js'), encoding='utf-8').read(); X = json.loads(data[data.index('=') + 1:].rstrip().rstrip(';'))
S = {s['id']: s for s in X['scenes']}
check('Five finished cut-scenes, each with Saga and three looks of its own (%s)' % {k: sorted(v['looks']) for k, v in S.items()},
      len(S) == 5 and all('saga' in s['looks'] and len(s['looks']) == 4 for s in S.values()))
new = [l for s in S.values() for l in s['looks'] if l != 'saga']
check('…fifteen different styles, none of Pulse, Storybook or Dream (%d)' % len(set(new)), len(set(new)) == 15 and not {'pulse', 'storybook', 'dream'} & set(new))
check('…every video has its asset-store link', all(c['url'].startswith('/_blob/') for s in S.values() for c in s['looks'].values()))
CPS = 17.0
bad = [(s, l, p[0]) for s, sc in S.items() for l, c in sc['looks'].items() for q in c['cues'] for i, p in enumerate(q[2])
       if ((q[2][i + 1][1] if i + 1 < len(q[2]) else q[1]) - p[1]) < max(0.8, len(' '.join(x[0] for x in q[2][i:])) / CPS * (1 if i + 1 == len(q[2]) else 0)) - 0.05]
check('The words: every phrase stays up long enough to read (never faster than 17 letters a second, the adult subtitle limit)', not bad, bad[:5])
gap = []
for s, sc in S.items():
    for l, c in sc['looks'].items():
        if l == 'cards': continue
        cov = sum(q[1] - q[0] for q in c['cues']); gap.append(cov / c['length'])
check('…and some pictures are left without words (words on screen %d–%d %% of the time)' % (min(gap) * 100, max(gap) * 100), all(0.35 < g < 0.92 for g in gap), gap)
check('…every line of every cut-scene is said in full, phrase by phrase', all(' '.join(p[0] for q in c['cues'] for p in q[2]).replace(' ', '') == ''.join(f[2] for f in c['words']).replace(' ', '') for sc in S.values() for c in sc['looks'].values()))
mu = open(os.path.join(R, 'lab', 'src', 'js', '79k5-lab-music-r123.js'), encoding='utf-8').read()
sk = json.loads(re.search(r'var SKIRM=(\[.*?\]);', mu, re.S).group(1))
bpm = [int(re.search(r'about (\d+) bpm', k['style']).group(1)) for k in sk]
check('Music: four new Skirmish takes (mu_fight.b–e), each its own kind, all medieval midcore at 125 bpm or less (%s)' % bpm,
      [k['id'] for k in sk] == ['mu_fight.b', 'mu_fight.c', 'mu_fight.d', 'mu_fight.e'] and all(b <= 125 for b in bpm) and all('medieval midcore' in k['style'] for k in sk) and len({k['style'][:60] for k in sk}) == 4)
lab = open(os.path.join(R, 'lab', 'lab.artifact.html'), encoding='utf8').read()
check('Lab: the words over the picture (cues), ♥ styles to try elsewhere, the Skirmish prompts with Copy buttons', 'cl-ov' in lab and 'cutstyle-' in lab and 'lmu-copy' in lab and 'mu_fight.e' in lab)
wl = open(os.path.join(R, 'lab', 'src', 'js', '79x-lab-worldlook.js'), encoding='utf-8').read()
O = json.loads(re.search(r'O=(\[\{.*?\}\]);', wl, re.S).group(1)); U = json.loads(re.search(r'var U=(\{.*?\})', wl, re.S).group(1))
check('The world, revamped: fifteen options in five groups, each with its picture(s) today and proposed (%d options, %d pictures)' % (len(O), len(U)),
      len(O) == 15 and len({o['g'] for o in O}) == 5 and all((n + '_a') in U and (n + '_b') in U for o in O for n in o['imgs']) and all(u.startswith('/_blob/') for u in U.values()))
check('…each with what it does, what in the cut-scenes it comes from, how it would be built, and its effort, paintings and cost on phones', all(o['what'] and o['from'] and o['how'] and o['effort'] and o['art'] and o['speed'] for o in O))
check('…and in the Lab (the tab, the analysis, the sliders, ✓ / ? / ✕)', ("id:'worldlook'" in lab or 'id:"worldlook"' in lab) and 'wl-rng' in lab and 'worldlook-' in lab)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
