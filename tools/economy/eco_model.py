"""Round 119: the economy model (per-realm gold in and out, the hero's climb, every site run) from economy_dump.json →
sprites/requests/economy_model.json and lab/src/js/79v-0b-economy-model.js (LECO.M, read by the Lab's Economy tab)."""
import json, collections as C, math
d = json.load(open('sprites/requests/economy_dump.json'))
R4 = [1, 2, 3, 4]
avgG = C.defaultdict(list); avgHP = C.defaultdict(list); avgXP = C.defaultdict(list)
for r in d['roster']:
    avgG[(r['q'], r['seg'])].append((r['gMin'] + r['gMax']) / 2); avgHP[(r['q'], r['seg'])].append(r['hp']); avgXP[(r['q'], r['seg'])].append(r['xp'])
A = lambda L: sum(L) / len(L)
wm = d['worldMon']
# hero ramp: level caps 5/10/15/20, gains
def hero(L):
    atk, hp = 3, 30
    for lv in range(2, L + 1):
        atk += 1 + (lv - 1) // 4; hp += 5 + (lv - 1) // 2
    return atk, hp
WEAP = {1: 5, 2: 10, 3: 16, 4: 22}; DEFM = {1: 0, 2: 2, 3: 5, 4: 8}
ramp = []
for q in R4:
    L = q * 5; a, h = hero(L); hit = a + WEAP[q] - DEFM[q]
    mh = wm[str(q)]['hp'] / wm[str(q)]['n']; g = wm[str(q)]['g'] / wm[str(q)]['n']
    xpneed = sum(l * 100 for l in range((q - 1) * 5 + 1, q * 5))
    ramp.append(dict(q=q, cap=L, atk=a, hp=h, weapon=WEAP[q], hit=hit, monHp=round(mh), hits=round(mh / hit, 1), killG=round(g, 1), gPerHit=round(g / (mh / hit), 2),
                     dunG=round(A(avgG[(q, 'dun')]), 1), towG=round(A(avgG[(q, 'tow')]), 1), xpToCap=xpneed, worldXp=round(wm[str(q)]['xp'] / wm[str(q)]['n'], 1)))
# sources by realm (first time)
src = C.defaultdict(lambda: C.defaultdict(float)); rep = {}
for q in R4:
    s = src[q]; s['World monsters (one sweep)'] = wm[str(q)]['g']
# camps
CT = d['campTypes']
for q in R4:
    types = CT[str(q)]; n = 33; g = 0; gems = 0
    for i in range(n):
        T = types[i % len(types)]; r = T['r']
        if r['k'] in ('chest', 'gems') and r.get('gold'): g += sum(r['gold']) / 2
        if r['k'] == 'gems': gems += r.get('n', 1)
    src[q]['Camp chests and nests (33 camps)'] = g
cache = C.Counter(d['caches'])
for q in R4: src[q]['Hidden caches'] = cache[q] * 50 * q
def interior(site, q):
    f = site['floors'] or 1; kind = site['type']; seg = 'tow' if kind == 'tower' else 'dun'
    mons = sum(round((7 + 1.5 * i) if kind == 'tower' else (10 + 2 * i)) for i in range(f))
    mons_g = mons * A(avgG[(q, seg)])
    mins = [10, 25, 50, 75][q - 1]; maxs = [50, 75, 100, 150][q - 1]
    chest = 0  # round 119 finding: the Lab-design floors place no treasure chests (m.site.treasure is never set)
    return mons, mons_g, chest
siteRows = []
for s in d['sites']:
    q = s['sec']; t = s['type']
    if t in ('harbor', 'camp', 'skyport'): continue
    mage = s['id'].startswith('mage_')
    mons, mg, ch = interior(s, q)
    if mage: first, again, kind = 60 * q, 35 * q, 'Mage tower'
    elif s['bonus']: first, again, kind = 60 * q + 15 * s['floors'], 30 * q + 10 * s['floors'], 'Treasure vault'
    elif s['boss']: first, again, kind = 50 * q, 75 * q, ('Boss tower' if t == 'tower' else 'Boss dungeon')
    else: continue
    hits = ramp[q-1]['hits']*(1.0 if t=='tower' else 1.0); mins_ = (mons*(hits*0.5+3.5) + s['floors']*25 + 60)/60
    siteRows.append(dict(id=s['id'], name=s['name'], q=q, kind=kind, floors=s['floors'], mons=mons, monG=round(mg), chestG=round(ch), first=first, again=again, mins=round(mins_,1), gpm=round((mg+first)/mins_), gpmAgain=round((mg+again)/mins_)))
    src[q][kind + 's (clear prize)'] += first; src[q]['Monsters inside sites'] += mg; src[q]['Floor chests'] += ch
for c in d['castles']:
    q = c['sec']; f = c['floors']; mons = sum(round(7 + 1.5 * i) for i in range(f)); mg = mons * A(avgG[(q, 'tow')])
    mins_ = (mons*(ramp[q-1]['hits']*0.5+3.5) + f*25 + 90)/60
    siteRows.append(dict(id=c['key'], name=c['name'], q=q, kind='Castle', floors=f, mons=mons, monG=round(mg), chestG=0, first=70 * q, again=40 * q, mins=round(mins_,1), gpm=round((mg+70*q)/mins_), gpmAgain=round((mg+40*q)/mins_)))
    src[q]['Castles (clear prize)'] += 70 * q; src[q]['Monsters inside sites'] += mg
for q in R4: src[q]['Island guardians'] = 80 * q  # the familiar island of each realm
QR = {'oldmother': 2, 'doom': 2, 'coal': 3, 'bird': 3, 'cargo': 2, 'mead': 2}
qg = C.defaultdict(float)
for qu in d['quests']:
    g = (qu['reward'] or {}).get('gold', 0) + sum((s['each'] or {}).get('gold', 0) * max(1, s['n']) for s in qu['steps'])
    qg[QR.get(qu['id'], 1 if qu['giver'] in ('oswin', 'nell', 'tob', 'greta', 'corr', 'bram', 'mael') else 2)] += g
for q in R4: src[q]['Villagers\' requests'] = qg[q]
src[4]['Surtharn (the end)'] = 2500
src[1]['Oswin\'s purse'] = 50
# sinks by realm
it = {i['id']: i for i in d['items']}
gear = C.defaultdict(float); cons = C.defaultdict(float)
for i in d['items']:
    if not i['buy']: continue
    q = max(1, i['secReq'] or 1)
    if i['slot'] in ('use', 'food') or i['type'] == 'ammo': cons[q] += i['buy']
    else: gear[q] += i['buy']
craft = C.defaultdict(float)
for r in d['craft']: craft[min(4, max(1, r.get('tier') or 1))] += r['gold']
apo = C.defaultdict(float)
for r in d['apo']: apo[4 if r.get('forges') else max(1, (it.get(r['out']) or {}).get('secReq') or 1)] += r['gold']
sinks = {q: {'Every shop item once (gear)': gear[q], 'Every potion/food/ammo once': cons[q], 'Every forge recipe': craft[q], 'Every staff at the apothecary': apo[q], 'Gem setting (a kit of 6 pieces, 2 gems each)': 6 * 350 * q} for q in R4}
sinks[1]['Horse'] = 200; sinks[1]['Sky-port cannon upgrades'] = 750; sinks[3]['Mira\'s hearth trays'] = 600
# 'keeping pace': the best weapon + body + shield + head of the tier
pace = {}
for q in R4:
    best = {}
    for i in d['items']:
        if not i['buy'] or (i['secReq'] or 0) not in ((q,) if q > 1 else (0, 1)): continue
        sl = i['slot']
        if sl not in ('lHand', 'body', 'shield', 'head', 'feet', 'pants', 'gauntlets'): continue
        sc = i['atk'] + i['def']
        if sl not in best or sc > best[sl][0]: best[sl] = (sc, i['buy'], i['id'])
    pace[q] = dict(cost=sum(v[1] for v in best.values()), kit={k: v[2] for k, v in best.items()})
out = dict(ramp=ramp, sources={q: {k: round(v) for k, v in src[q].items()} for q in R4}, sinks={q: {k: round(v) for k, v in sinks[q].items()} for q in R4},
           pace=pace, sites=siteRows, quests=round(sum(qg.values())), craftTotal=sum(r['gold'] for r in d['craft']), apoTotal=sum(r['gold'] for r in d['apo']),
           buyAll=sum(i['buy'] for i in d['items']), nItems=len(d['items']), nBuy=sum(1 for i in d['items'] if i['buy']))
out['worldGpm']=[round(r['killG']/((r['hits']*0.5+6)/60)) for r in ramp]
out['siteGpm']=[round(sum(x['gpmAgain'] for x in siteRows if x['q']==q)/max(1,len([x for x in siteRows if x['q']==q]))) for q in R4]
json.dump(out, open('sprites/requests/economy_model.json', 'w'), indent=1)
M2 = {k: out[k] for k in ('ramp','sources','sinks','pace','sites','quests','craftTotal','apoTotal','buyAll','nItems','nBuy','worldGpm','siteGpm')}
open('lab/src/js/79v-0b-economy-model.js', 'w').write('// generated by tools/economy/eco_model.py (round 119) — the live economy, measured\nif(typeof LECO!==\'undefined\')LECO.M=' + json.dumps(M2, separators=(',', ':')) + ';\n')
for r in ramp: print(r)
for q in R4: print(q, 'IN', sum(out['sources'][q].values()), out['sources'][q]); print('  OUT', sum(out['sinks'][q].values()), out['sinks'][q], 'pace', pace[q])
print('totals in', sum(sum(out['sources'][q].values()) for q in R4), 'out', sum(sum(out['sinks'][q].values()) for q in R4))
