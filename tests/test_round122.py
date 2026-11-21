"""Round 122: the village buildings in early spring (requests), the Zeldara versions of the kept shots (requests), the opening's part-2
Kling prompts fixed (a dash inside brackets no longer splits the sword's description), and the Lab's spring slots.
python tests/test_round122.py   (after node build.mjs)"""
import sys, os, json, re
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]), flush=True)
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
S = {x['id']: x for x in json.load(open(os.path.join(R, 'sprites', 'requests', 'scenery.json'), encoding='utf-8'))['requests']}
sp = [i for i in S if i.startswith('sc_seas_sp_vill')]
check('Spring: the five building sheets are asked for, wave 123, each a repaint of its summer sheet (%s)' % sp,
      len(sp) == 5 and all(S[i]['wave'] == 123 and S[i]['refs'][0] == 'sc_' + i[len('sc_seas_sp_'):] and 'spring flowers' in S[i]['body'] for i in sp))
lst = [l for l in open(os.path.join(R, 'sprites', 'requests', 'r122_spring_village.txt')).read().split() if l.startswith('sc_')]
check('…and r122_spring_village lists exactly them', sorted(lst) == sorted(sp), lst)
f = [i for i in S if re.match(r'^sc_ss_.*_f$', i)]
check('Zeldara (round 122b): held — no Zeldara shot is asked for, and there is no list, until every twin cut-scene is picked (%d asked)' % len(f),
      len(f) == 0 and not os.path.exists(os.path.join(R, 'sprites', 'requests', 'r122_zeldara_shots.txt')))
picks = json.load(open(os.path.join(R, 'sprites', 'requests', 'series_picks.json'), encoding='utf-8'))
check('The Lab\'s shot picks are copied (%d frames)' % (len(picks) - 1), len(picks) - 1 >= 58 and picks['bram_04']['keep'] == [4, 5, 3])
sys.path.insert(0, os.path.join(R, 'tools', 'video'))
src = open(os.path.join(R, 'tools', 'video', 'kling.py'), encoding='utf-8').read(); cut = src.index("os.makedirs(OUT, exist_ok=True); parts = {}")
g = {'__file__': os.path.join(R, 'tools', 'video', 'kling.py'), '__name__': 'kt'}; exec(compile(src[:cut], 'kling.py', 'exec'), g)
sc = [s for s in g['J']['scenes'] if s['id'] == 'opening'][0]
for who in ('zeldor', 'zeldara'):
    t = g['prompt'](sc, sc['beats'][6:12], who, 2, 2); s4 = re.search(r'SHOT 4 .*', t).group(0); s5 = re.search(r'SHOT 5 .*', t).group(0)
    hero = 'Zeldor' if who == 'zeldor' else 'Zeldara'
    check('Kling, opening part 2 (%s): the wooden sword\'s words stay together in START, and %s takes the pack and sword' % (who, hero),
          'grip, NOT a metal blade)' in s4.split('ACTION')[0] and 'NOT IN THIS SHOT: NOT' not in t and ('%s takes them' % hero) in s5)
lab = open(os.path.join(R, 'lab', 'lab.artifact.html'), encoding='utf8').read()
check('Lab: the props\' Spring slots show the summer painting with keep / paint a spring version', 'Keep the summer look' in lab and 'Paint a spring version' in lab and 'seasspring' in lab)

# ── round 122b: Cut-scene looks ──
import glob
D = os.path.join(R, 'lab', 'preview', 'looks'); E = {}
for f in glob.glob(os.path.join(D, 'cl_*.json')): e = json.load(open(f)); E[(e['scene'], e['look'])] = e
sc5 = ['spirit', 'bram', 'mira', 'dunn', 'vela']
check('Cut-scene looks: the five finished cut-scenes, four looks each (%d edits)' % len(E), all((s, l) in E for s in sc5 for l in ('saga', 'pulse', 'storybook', 'dream')))
rd = lambda c: 1.4 + len(c.split()) * 0.36
check('…every frame of every look lasts at least as long as its words take to read', all(f['end'] - f['start'] >= rd(f['cap']) - 0.01 for e in E.values() for f in e['frames']))
check('…Pulse cuts on the beat (every shot a whole number of 112-BPM beats)', all(abs(x[4] / (60 / 112) - round(x[4] / (60 / 112))) < 0.02 for (s, l), e in E.items() if l == 'pulse' for f in e['frames'] for x in f['shots']))
check('…and the looks really differ: their lengths and their transitions', all(len({round(E[(s, l)]['length']) for l in ('saga', 'pulse', 'storybook', 'dream')}) >= 3 for s in sc5) and
      {x[3] for f in E[('spirit', 'storybook')]['frames'] for x in f['shots']} != {x[3] for f in E[('spirit', 'pulse')]['frames'] for x in f['shots']})
data = open(os.path.join(R, 'lab', 'src', 'js', '79w-0-cutlooks-data.js'), encoding='utf-8').read(); X = json.loads(data[data.index('=') + 1:].rstrip().rstrip(';'))
check('Lab: the Cut-scene looks tab, every video with its asset-store link (%d)' % sum(len(s['looks']) for s in X['scenes']),
      "id:'cutlook'" in lab or 'id:"cutlook"' in lab and len(X['scenes']) == 5 and all(l['url'] for s in X['scenes'] for l in s['looks'].values()) and sum(len(s['looks']) for s in X['scenes']) == 20)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
