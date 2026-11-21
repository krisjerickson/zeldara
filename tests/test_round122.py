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
zl = [l for l in open(os.path.join(R, 'sprites', 'requests', 'r122_zeldara_shots.txt')).read().split() if l.startswith('sc_')]
ok = all(S[i]['refs'][:3] == [i[:-2] + '_m', 'sc_sb_%s_f' % re.match(r'^sc_ss_(.+_\d\d)_\d+_f$', i).group(1), 'hero_f.model'] and i[:-2] + '_m' in S for i in f)
check('Zeldara: %d shots asked for, each from its Zeldor shot, her story frame and her model' % len(f), len(f) >= 80 and ok and sorted(zl) == sorted(f))
check('…the request is "the same shot, the other hero", not a new camera', all('THE SAME SHOT AS THE FIRST REFERENCE' in S[i]['body'] and 'change only the camera' not in S[i]['body'] for i in f))
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
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
