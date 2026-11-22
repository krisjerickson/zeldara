"""Round 128: playing and coming back (40 proposals); releasing the game, the money and the law; the last emojis (audit + 4 icon sheets);
the boss plan rebalanced phase by phase. Static checks of the Lab data and the requests (no game run needed).
python tests/test_round128.py   (after python tools/world/r128_plan.py, python tools/world/boss_plan2.py and node build.mjs)"""
import sys, os, json, re
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:600]), flush=True)
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
J = lambda f, v: json.loads(open(os.path.join(R, f), encoding='utf-8').read().split('var %s=' % v, 1)[1].rstrip().rstrip(';'))
L = J('lab/src/js/79z-0-r128-data.js', 'LR128')
E, PB, IC = L['engage'], L['publish'], L['icons']
check('Engagement: seven theses and exactly 40 proposals, each with what changes, why and what we would measure',
      len(E['theses']) == 7 and len(E['p']) == 40 and all(p['ch'] and p['why'] and p['m'] and p['th'] in {t['id'] for t in E['theses']} for p in E['p']))
check('Engagement: every proposal is in one of the three waves', sorted(x for w in E['waves'] for x in w[1]) == sorted(p['id'] for p in E['p']))
check('Engagement: sharing, saving and fair play are covered', all(i in {p['id'] for p in E['p']} for i in ('photo_mode', 'share_cards', 'couch_coop', 'safe_saves', 'fair_pledge', 'playtest_data')))
ids = {r['id'] for r in PB['routes']}
check('Releasing: Steam, the web / itch.io, Roblox, phones, Epic, portals, Discord (%d routes), each saying who does what and what ships' % len(ids),
      {'steam', 'web', 'roblox', 'mobile', 'epic', 'portals', 'discord'} <= ids and all(r['claude'] and r['kris'] and r['files'] and r['fees'] and r['price'] for r in PB['routes']))
check('Releasing: a fee table and an illustrative Steam sum', len(PB['fees']) >= 10 and PB['math']['you'] < PB['math']['gross'])
N = PB['name']
check('The law: the name comes first, Zeldira is weighed honestly, and every new pair avoids names already in the game',
      PB['law'][0]['id'] == 'name' and N['options'][0][0] == 'zeldira' and N['options'][0][4] == 'high' and 'ZELD-' in N['verdict'])
src = ' '.join(open(os.path.join(R, 'src', 'js', f), encoding='utf-8').read() for f in os.listdir(os.path.join(R, 'src', 'js')) if f.endswith('.js') and '01-sprite' not in f)
clash = [o[1] for o in N['options'][1:] if re.search(r'\b%s\b' % o[1], src)] + [o[2] for o in N['options'][1:] if re.search(r'\b%s\b' % o[2], src)]
check('The law: no proposed hero name is already a character in the game', not clash, clash)
check('The law: Kling, Suno, copyright, labels, fonts, children and business are all covered, with sources',
      {'kling', 'suno', 'copyright', 'labels', 'thirdparty', 'kids', 'business'} <= {l['id'] for l in PB['law']} and len(PB['src']) >= 25)
check('The labels: one sentence that names every AI tool used', all(t in PB['label_text'] for t in ('OpenAI', 'Suno', 'ElevenLabs', 'Kling', 'Gemini', 'Claude')))
check('Icons: the audit covers every part of the game and %d glyph uses; dev tools are left alone' % IC['total'], len(IC['parts']) >= 12 and IC['total'] > 1000 and any(p['dev'] for p in IC['parts']))
new_ids = [i[0] for s in IC['sheets'] for i in s['items']]
check('Icons: %d new icons on 3 sheets, no id twice, none already painted' % len(new_ids),
      len(IC['sheets']) == 3 and len(new_ids) == len(set(new_ids)) and not set(new_ids) & set(json.load(open(os.path.join(R, 'assets', 'scenery', 'index.json')))['items']))
S = {x['id']: x for x in json.load(open(os.path.join(R, 'sprites', 'requests', 'scenery.json')))['requests']}
lst = [l for l in open(os.path.join(R, 'sprites', 'requests', 'r128_icons.txt')).read().split() if l.startswith('sc_')]
check('Icons: r128_icons lists the 3 new sheets (wave 129); the economy\'s icons are already ordered', len(lst) == 3 and all(i in S and S[i]['wave'] == 129 for i in lst) and all('sc_eco_icons_%d' % i in S for i in range(1, 10)), lst)
check('Icons: every wiring points at a painted icon that exists', all(w[1] in L['have']['pos'] for p in IC['parts'] for w in p['wire']))
B = J('lab/src/js/79y2-0-bossplan2-data.js', 'LBPLAN2')
ph = {b['id']: b['n'] for b in B['bosses']}
check('Boss plan 2: the number of phases is read from the game (lava titan 5, surtharn 6, forges 3, wardens 1)', ph['lava_titan'] == 5 and ph['surtharn'] == 6 and ph['glodr'] == 3 and ph['q1_b'] == 1 and ph['musp'] == 4)
per = [len(P['new']) for b in B['bosses'] if b['n'] > 1 for P in b['phases']]
check('Boss plan 2: every phase of a many-phase boss has its own 3–6 new elements (%d–%d)' % (min(per), max(per)), min(per) >= 3 and max(per) <= 6)
check('Boss plan 2: today\'s mechanics are there to keep — signature attacks, extra health, ward / guard / plate and the element',
      all(any(t['k'] == 'sig' for t in P['today']) for b in B['bosses'] for P in b['phases'] if b['id'] not in ('musp',)) and
      any(t['k'] == 'bar' for b in B['bosses'] for P in b['phases'] for t in P['today']) and any(t['k'] == 'hp' for b in B['bosses'] for P in b['phases'] for t in P['today']) and
      sum(1 for b in B['bosses'] if b['el']) >= 50)
txt = json.dumps([p for b in B['bosses'] for P in b['phases'] for p in P['new']]).lower()
check('Boss plan 2: nothing left that needs a ceiling, a rope or chain from above, or a world past the walls',
      not re.search(r'ceiling|chandelier|canopy|portcullis|bell rope|falling bridges|climbs', txt) and all(p['t'] not in ('climb', 'ropes') for b in B['bosses'] for P in b['phases'] for p in P['new'])
      and all(b['move']['t'] not in ('climb', 'ropes') for b in B['bosses']) and len(B['cuts']) >= 6)
check('Boss plan 2: each phase has a suggested ranked list, and three ways to scale it by difficulty',
      all(P['sug'] and all(i.startswith(('k', 'n')) for i in P['sug']) for b in B['bosses'] for P in b['phases']) and len(B['schemes']) == 3 and len(B['diff']) == 4)
FX = json.load(open(os.path.join(R, 'tools', 'audio', 'sfx_fix128.json')))
SP = json.load(open(os.path.join(R, 'sprites', 'requests', 'sound_picks.json')))
bad = [k for k, v in FX.items() if v['removed'] and v['mine'] and set(SP[k].split('+')) & set(v['removed'])]
check('Sound effects: the %d effects that showed takes Kris never picked now play only his own picks' % sum(1 for v in FX.values() if v['removed']), not bad and sum(1 for v in FX.values() if v['removed']) >= 30, bad)
m3 = open(os.path.join(R, 'lab', 'src', 'js', '79m3-lab-sfx103.js'), encoding='utf-8').read()
check('Sound effects Lab: not-yours takes are marked and never ★; rows stay put (Re-sort); a Remake up to 5 button', all(x in m3 for x in ('notMine', 's128-nm', 'FROZEN', 's128-resort', 's103-more', "'more'")))
eco = open(os.path.join(R, 'src', 'js', '22m2-economy-places.js'), encoding='utf-8').read() + open(os.path.join(R, 'src', 'js', '22m-economy.js'), encoding='utf-8').read()
check('Runa\'s board and the lost purse are drawn at their own size (the board covered the village)', "'ec_board',P.x,P.y,Z.K" in eco and "'ec_purse',P.x,P.y+6,_scn().K" in eco)
IDX = json.load(open(os.path.join(R, 'assets', 'scenery', 'index.json')))
check('The r127 paintings are in the game\'s pages (landmarks, sites, frames, aurora, water, ground, air; thaw textures; the vistas)',
      all(i in IDX['items'] for i in ('lm_bram_bridge', 'gs_silverwood', 'wl_frame_saga', 'au_reflect', 'wp_heron', 'gp_moss_a', 'ai_firefly', 'lb_anemones', 'ly_goat', 'lh_hesje', 'lt_snowdrops'))
      and 'tx_grass_th' in IDX['tex'] and 'wl_vista_scar' in IDX.get('rooms', {}))
w3 = [n for n in os.listdir(os.path.join(R, 'lab', 'preview', 'worldlook3'))]
need = set(re.findall(r"\['([a-z0-9_]+)','[^']*','[a-z]*'\]", open(os.path.join(R, 'lab', 'src', 'js', '79x3-lab-worldlook3.js'), encoding='utf-8').read()))
check('Lab › The world, revamped 3: every picture it shows exists (%d)' % len(need), need and all(n + '.jpg' in w3 for n in need), sorted(n for n in need if n + '.jpg' not in w3))
s5 = os.listdir(os.path.join(R, 'lab', 'preview', 'seasons5b'))
check('Lab › The five seasons: the game now and the land pieces laid in, for every season', all('season_%s_%s.jpg' % (x, p) in s5 for x in ('sp', 'su', 'au', 'wi', 'bl') for p in ('village', 'grass')) and all('land_%s_village.jpg' % x in s5 for x in ('sp', 'au', 'wi', 'bl')))
lab = open(os.path.join(R, 'lab', 'lab.artifact.html'), encoding='utf-8').read()
check('Lab: the five new places are built in (and the round-127 boss plan and world take 2 retired)', all(("id:'%s'" % t) in lab.replace('"', "'") for t in ('engage', 'publish', 'icons', 'bossplan2', 'worldlook3'))
      and "'bossplan','worldlook2']" in lab.replace('"', "'"))
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
