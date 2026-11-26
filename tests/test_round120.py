"""Round 120: the economy, second pass (tools/economy/eco_phases.py → the Lab's Economy — round 2 tab), wave S2 and the sky guardians
painted in, and the round-118 sound remakes in the Lab.
python tests/test_round120.py   (after node build.mjs)"""
import sys, os, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]), flush=True)
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = json.load(open(os.path.join(R, 'sprites', 'requests', 'economy_phases.json')))['phases']
st = P['v2_story']
check('Phases: with the picks and the fixes, a story player\'s kit costs 9–15 minutes in every realm (%s)' % [p['kitMin'] for p in st], all(9 <= p['kitMin'] <= 15 for p in st))
check('…and reaches each level cap 60–95 %% of the way through the realm (%s)' % [round(p['need'] / p['xp'] * 100) for p in st], all(0.6 <= p['need'] / p['xp'] <= 0.95 for p in st))
ap = P['after_explorer']
check('…as picked, Valour floods Cinderheim (%s chests) — the reason for N2' % ap[3]['valour'], ap[3]['valour'] > 40 and P['v2_explorer'][3]['valour'] < 20)
lab = open(os.path.join(R, 'lab', 'lab.artifact.html'), encoding='utf8').read()
ids = ['xpcurve', 'valour', 'prizetaper', 'pitystep', 'kits', 'storysinks', 'binders', 'endgame', 'alphaseen', 'traders', 'stalls', 'quarter', 'drops', 'relics', 'named', 'rings', 'trophies', 'stock']
check('The Lab has Economy — round 2 with all %d proposals and the phase numbers' % len(ids), ('id:"economy2"' in lab or "id:'economy2'" in lab) and 'LECO2.M=' in lab and all(('id:"%s",grp:' % i) in lab or ("id:'%s',grp:" % i) in lab for i in ids))
sa = json.load(open(os.path.join(R, 'lab', 'preview', 'seasart', 'index.json')))
check('Seasons: the paintings shows wave S2 (%d seasonal sheets, %d festival sheets)' % (len(sa['sheets']), len(sa['fest'])), len(sa['sheets']) >= 54 and len(sa['fest']) == 11)
s84 = json.load(open(os.path.join(R, 'lab', 'preview', 'audio', 's84.json')))['items']
got = [i for i in ('sfx_sk_berserker', 'sfx_sp_chain_lightning', 'sfx_sp_starfall') if all(k in s84.get(i, {}) for k in ('y1', 'y2', 'y3', 'y4', 'y5'))]
check('The round-118 sound remakes are in the Lab (%s)' % got, len(got) == 3)
with game(painted=True) as g:
    g.wait(3500)
    g.js("ZSEASON.set('wi'); ZSEASON.loadArt()")
    for _ in range(40):
        if g.js("ZScn.has('vb_tavern_wi')"): break
        g.wait(250)
    r = g.js("(()=>{ var Z=typeof ZScn!=='undefined'?ZScn:null; return {sky:[1,2,3,4].map(function(s){ return !!(Z&&Z.has('sk_gd_'+s+'_a')); }), fest:!!(Z&&Z.has('fs_wi_goat')||Z&&Object.keys(Z.idx||{}).some(function(k){ return /^fs_/.test(k); })), vill:(function(){ ZSEASON.set('wi'); var r=ZSEASON.item('vb_tavern'); ZSEASON.set('su'); return r&&r.id; })()}; })()")
    check('In the game: the four sky guardians are painted, and the village has its winter repaints (%s)' % r, all(r['sky']) and r['vill'] == 'vb_tavern_wi', r)
    errs = [x for x in g.errs if 'favicon' not in x and '404' not in x and 'decode audio' not in x]
    check('No page errors', errs == [], errs[:4])
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
