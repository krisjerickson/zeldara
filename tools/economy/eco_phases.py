"""Round 120: the economy by phase — three scenarios (today, as Kris picked in round 119, picks + the round-2 fixes) × two players (story,
explorer), per realm: gold in and out, minutes, the kit in minutes, XP against the caps, Valour chests, gems, reward moments an hour.
python tools/economy/eco_phases.py   (after eco_model.py) → sprites/requests/economy_phases.json, lab/src/js/79v2-0b-economy2-model.js"""
import json, collections as C, math
d = json.load(open('sprites/requests/economy_dump.json')); M = json.load(open('sprites/requests/economy_model.json'))
M['pace'] = {str(k): v for k, v in M['pace'].items()}; M['sinks'] = {str(k): v for k, v in M['sinks'].items()}
R4 = [1, 2, 3, 4]; A = lambda L: sum(L) / len(L)
avg = C.defaultdict(list); axp = C.defaultdict(list)
for r in d['roster']: avg[(r['q'], r['seg'])].append((r['gMin'] + r['gMax']) / 2); axp[(r['q'], r['seg'])].append(r['xp'])
wm = d['worldMon']; ramp = {r['q']: r for r in M['ramp']}
CT = d['campTypes']
FLOORG = {1: 150, 2: 400, 3: 800, 4: 1400}
KIT_NEW = {1: 600, 2: 2400, 3: 4500, 4: 7500}
KIT_V2 = {1: 600, 2: 1700, 3: 2600, 4: 5000}
PF = {q: KIT_NEW[q] / M['pace'][str(q)]['cost'] for q in R4}
PF2 = {q: KIT_V2[q] / M['pace'][str(q)]['cost'] for q in R4}           # price factor from "price by the minute"
CH = {1: (10, 50), 2: (25, 75), 3: (50, 100), 4: (75, 150)}
it = {i['id']: i for i in d['items']}
def chestEV(q, fl, last=False):
    mn, mx = CH[q]; base = (mn + mx) / 2 + fl * mx * 0.1
    if last: return 0.83 * base * 2 + 0.17 * base * 5   # at least Rare
    return 0.70 * base + 0.25 * base * 2 + 0.05 * base * 5
def chestGems(last=False): return 1.0 if last else 0.30
def run(q, after, style):
    """one phase (realm q) for a player style: 'story', 'explorer' (everything once)"""
    o = C.defaultdict(float); t = C.defaultdict(float); xp = 0; gems = 0; kills = 0; moments = C.Counter()
    share = 1.0 if style == 'explorer' else 0.5
    W = wm[str(q)]; n = W['n'] * share; ga = W['g'] / W['n'] / 0.33  # full purse average
    cut = 0.5 if after else 0.33
    alpha = W['alpha'] * share; plain = n - alpha
    o['World monsters'] = plain * ga * cut + alpha * ga * cut * (2.5 if after else 1)
    t['World monsters'] = n * (ramp[q]['hits'] * 0.5 + 6) / 60 + alpha * ramp[q]['hits'] * 0.6 * 0.5 / 60
    xp += plain * W['xp'] / W['n'] + alpha * W['xp'] / W['n'] * (2 if after else 1); kills += n; moments['alpha'] += alpha
    # camps & caches
    cg = 0; nest = 0
    for i in range(33):
        r = CT[str(q)][i % len(CT[str(q)])]['r']
        if r['k'] in ('chest', 'gems') and r.get('gold'): cg += sum(r['gold']) / 2
        if r['k'] in ('gems', 'chest'): nest += 1
    o['Camps'] = cg * share; moments['camp'] += nest * share; gems += nest * share * 0.6
    caches = C.Counter(d['caches'])[q] * share; o['Hidden caches'] = caches * 50 * q; gems += caches; moments['cache'] += caches
    t['Camps & caches'] = (33 * share * 0.6 + caches * 1.5)
    # sites
    sites = [s for s in M['sites'] if s['q'] == q]
    if style == 'story': sites = [s for s in sites if s['kind'].startswith('Boss')]
    for s in sites:
        seg = 'tow' if s['kind'] in ('Boss tower', 'Mage tower', 'Castle') or 'tower' in s['id'] else 'dun'
        o['Monsters inside sites'] += s['monG']; t['Sites'] += s['mins']; kills += s['mons']; xp += s['mons'] * A(axp[(q, seg)])
        prize = ({1:.25,2:.25,3:.2,4:.15}[q] if after=='v2' else 0.25) * s['monG'] if after else s['first']
        if after: prize = max(prize, FLOORG[q])
        o['Clear prizes'] += prize; moments['prize'] += 1
        if after:
            f = s['floors']; step = 2 if seg == 'tow' else 1
            for fl in range(0, f, step): o['Floor chests'] += chestEV(q, fl, fl == f - 1); gems += chestGems(fl == f - 1); moments['chest'] += 1
        gems += 2 if s['kind'] != 'Treasure vault' else 1
    # island guardian, sky port, binders
    o['Island & sky port'] = (80 * q) + ((FLOORG[q] * 2) if after else 0); t['Island & sky port'] = 12; moments['prize'] += 2; gems += 2
    nb = 10 if style == 'explorer' else 6
    o['Binders (spirit guards)'] = (FLOORG[q] * 0.4 * nb) if after == 'v2' else 0; xp += (nb * 150 * q) if after == 'v2' else 0; t['Binders'] = nb * 1.2; moments['binder'] += nb
    QR = {1: 1490, 2: 2200, 3: 320, 4: 0}; o['Villagers\' requests'] = QR[q] * (1 if style == 'explorer' else 0.5); t['Requests'] = 25 * (1 if style == 'explorer' else 0.5)
    if q == 4: o['Surtharn'] = 2500
    # gems from kills (with pity if after)
    gems += kills * ((1 / 28.5) if after == 'v2' else (1 / 16) if after else 0.017)
    # xp: cap overflow → valour
    cap = q * 5; need = sum(l * ((400 if l >= 15 else 300) if after == 'v2' else 100) for l in range(max(1,(q - 1) * 5), cap))
    if after: xp *= 1.08
    over = max(0, xp - need)
    val = (over / ({1:1000,2:2500,3:5000,4:8000}[q] if after == 'v2' else 500 * q)) if after else 0
    o['Valour chests'] = val * (2 if after == 'v2' else 5) * (M['siteGpm'][q - 1])  # each ≈ 5 minutes of site gold
    moments['valour'] += val
    mins = sum(t.values())
    # sinks
    s = M['sinks'][str(q)]
    pf = PF2[q] if after == 'v2' else PF[q] if after else 1
    kit = KIT_V2[q] if after == 'v2' else (KIT_NEW[q] if after else M['pace'][str(q)]['cost'])
    sinks = {'The realm\'s kit': kit}
    sinks['Potions & food'] = mins * (6 * q) * (pf if after else 1) * 0.5
    if style == 'explorer':
        sinks['Every shop item'] = s['Every shop item once (gear)'] * pf - kit
        sinks['Forge & staffs'] = (s['Every forge recipe'] + s['Every staff at the apothecary']) * pf
        sinks['Gem setting'] = s['Gem setting (a kit of 6 pieces, 2 gems each)']
        if after: sinks['Village & festivals'] = {1: 4000, 2: 8000, 3: 12000, 4: 16000}[q]
        if after == 'v2': sinks['Saddles & barding (new)'] = {1: 200, 2: 800, 3: 1500, 4: 3000}[q]
    else:
        sinks['Forge (one chain)'] = {1: 150, 2: 350, 3: 900, 4: 1750}[q] * pf
        sinks['Gem setting'] = 350 * q * 2
        if after == 'v2': sinks['Rebuilding the village (new)'] = {1: 1000, 2: 3000, 3: 5000, 4: 10000}[q]; sinks['Saddles & barding (new)'] = {1: 200, 2: 800, 3: 1500, 4: 3000}[q]
    inc = sum(o.values())
    return dict(q=q, style=style, after=str(after), income=round(inc), sinks=round(sum(sinks.values())), mins=round(mins), gpm=round(inc / mins), xp=round(xp), need=need, over=round(over), valour=round(val, 1),
                gems=round(gems, 1), kills=round(kills), moments={k: round(v, 1) for k, v in moments.items()}, mph=round(sum(moments.values()) / (mins / 60), 1),
                inB={k: round(v) for k, v in o.items() if v}, outB={k: round(v) for k, v in sinks.items() if v}, kitMin=round(kit / (inc / mins), 1))
GEMNEED = {1: 34 + 18, 2: 15 + 18, 3: 10 + 18, 4: 40 + 18}
out = {'phases': {}, 'gemNeed': GEMNEED}
for after in (False, True, 'v2'):
    for style in ('story', 'explorer'):
        out['phases'][(after if after=='v2' else 'after' if after else 'before') + '_' + style] = [run(q, after, style) for q in R4]
# endgame (estimate): 4 forges × ~45 monsters (forge roster, 115 g), the volcano boss rush, Asgard, Surtharn
eg = dict(mons=180, monG=180 * 115, mins=4 * 22 + 25 + 20)
out['endgame'] = eg
json.dump(out, open('sprites/requests/economy_phases.json', 'w'), indent=1)
open('lab/src/js/79v2-0b-economy2-model.js', 'w').write('// generated by tools/economy/eco_phases.py (round 120)\nif(typeof LECO2!==\'undefined\')LECO2.M=' + json.dumps(out, separators=(',', ':')) + ';\n')
for k, L in out['phases'].items():
    print(k)
    for p in L: print('  ', p['q'], 'in', p['income'], 'out', p['sinks'], 'min', p['mins'], 'gpm', p['gpm'], 'kitMin', p['kitMin'], 'xp', p['xp'], '/', p['need'], 'val', p['valour'], 'gems', p['gems'], '/', GEMNEED[p['q']], 'mph', p['mph'])
