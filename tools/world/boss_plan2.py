#!/usr/bin/env python3
"""Round 128: BOSS FIGHTS, REMADE — PHASE BY PHASE (Kris, on round 127's plan: "we need to rebalance the proposals. All of the bosses have the
same number of elements proposed, regardless of how many phases there are. Also, the mechanics from today are not part of the new proposals
… a balanced proposal that takes into consideration the number of phases of the boss, and allows for some of the old mechanics to also be
sprinkled in. There are also old mechanics like increased health, ward, and resistances that should be part of the new proposal … each phase
should be individually selectable … different numbers of boss elements per the difficulty of the game … rank ordered proposals … double-check
that all of these new elements can easily be added to the game … ceiling climbing … walls falling in … If any don't make sense given the
layout of our game, discard these").
  · every boss keeps (almost) all its round-127 proposals; those that need a ceiling, a rope from above or what lies past the arena walls are
    discarded (CUT) or re-told to happen on the arena floor (REWORK);
  · proposals are spread over the boss's phases (a "Phase n:" proposal stays in its phase; the rest escalate from blades and shots in the
    first phase to arena set-pieces and mind games in the last), and multi-phase bosses get new proposals (EXTRA) so every phase has its own;
  · TODAY per phase, read from the game (boss_today.json): signature attacks, its kit, extra health, ward / guard / plate bars, arena events,
    allies, the last stand, its element (what it resists and what it fears) — each can be kept;
  · each proposal is rated for how easily the game can take it (EASE): ready (an existing attack does it), small (new code in existing
    systems), prop (needs an object placed in the arena), art (needs new paintings);
  · a suggested selection and rank order per phase, and three ways to scale the number of elements by difficulty (SCHEMES).
Writes lab/src/js/79y2-0-bossplan2-data.js (LBPLAN2).    python tools/world/boss_plan2.py"""
import json, os, re, sys, math, collections
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from boss_plan_types import TYPES, THEMES
from boss_plan_a import A
from boss_plan_b import B
R = os.path.abspath(os.path.join(H, '..', '..'))
T = {t[0]: t for t in TYPES}
TODAY = json.load(open(os.path.join(H, 'boss_today.json'), encoding='utf-8'))

# ── 1. feasibility: discarded and re-told proposals ──
CUT = {('dark_warlock', 4): 'needs a canopy above the arena — the game never shows a ceiling',
       ('q1_d', 6): 'a grindstone hanging on a rope needs something overhead',
       ('q4_b', 6): 'a portcullis dropping from above needs a gate overhead',
       ('rime_spire', 9): 'a chandelier needs a ceiling',
       ('frozen_belfry', 4): 'a bell on a rope over him needs a ceiling',
       ('musp', 5): 'falling bridges need a world below the arena that the game does not have'}
CUT_TYPES = {'climb': 'wall and ceiling climbing — the top-down view has no ceiling', 'ropes': 'swinging on ropes or chains needs an anchor overhead'}
REWORK = {
    ('goblin_king', 3): 'Two goblin slingers take the arena\'s edge and sling stones down a lane — the lane shows as dust first.',
    ('rock_dragon', 6): 'Phase 2: crystal eggs grow out of the geode floor; crack them before drakelings hatch.',
    ('rock_dragon', 7): 'Its roar shakes rocks loose: they fall on growing shadows at random spots.',
    ('lava_titan', 7): 'Phase 4: the outer ring of the caldera floor cracks into lava a section at a time, and cools after the phase.',
    ('q1_b', 2): 'Brambles creep in from the arena\'s edge across the floor and hold you.',
    ('q2_c', 4): 'Marks you; step into a pool of rose-window light on the floor before it bursts.',
    ('q2_c', 5): 'A fallen bell lies in the nave: strike it and its peal stuns him.',
    ('q3_d', 4): 'The outer edge of the eyrie cracks under its wing-beats — a ring of danger that shrinks the fight, then settles.',
    ('q4_b', 3): 'Bars of obsidian burst up from the floor around you like a cage — find the gap.',
    ('elite2', 8): 'Topple a rotten tree at the den\'s edge onto him.',
    ('crimson_spire', 4): 'Strike the moon-mirrors set in the floor: their moonlight burns her.',
    ('hollow_spire', 5): 'Rings of the floor fall away into dark pits, then return.',
    ('monolith', 1): 'The floor shatters into pits in patches, then mends.',
    ('rift_tower', 4): 'Rifts open in the floor as pits, then close.',
    ('surtharn', 8): 'The outer floor cracks into lava a ring at a time, then cools.',
    ('swamp_witch', 3): 'The bog spreads over the floor, leaving a few hummocks and lily pads as safe islands.',
    ('musp', 4): 'Lava spreads over the floor; a few cooled rafts drift across it as moving safe spots.',
}
MOVE_FIX = {'q4_b': ('hook', 'No teleport: he hurls a chain into the floor beside you and hauls himself across.'),
            'isl1': ('vault', 'No teleport: he vaults across the deck with a cutlass flourish.'),
            'eimyrja': ('hook', 'No teleport: she whips a chain into the floor and hauls herself across.'),
            'q2_c': ('phase', 'A drowned spirit — he drifts through the pews and pillars rather than blinking.'),
            'elite4': ('phase', 'A wraith: drifts through its kin and the pillars, never a hard blink.')}
TYPE_FIX = {'phase': 'Turns to mist and drifts through pillars and its own minions (never out of the arena).',
            'crumble': 'A ring of the arena floor cracks into a hazard (pit, lava, thin ice) and settles after the phase — the fight shrinks.',
            'tide': 'Water, lava or bog spreads over the floor, leaving a few raised spots as safe islands.',
            'volley': 'Arrows (or stones) rain along a marked lane across the arena.'}

# ── 2. how easily the game takes each kind ──
EASE = {}
for k in 'fan seekers ricochet mortar lance hook trail sniper boomer scatter quake drift slick columns geysers sweep charge leap combo blink burrow stomp minions echoes event gravity'.split(): EASE[k] = 'ready'
for k in 'pillars use lure mirror totems light meteor'.split(): EASE[k] = 'prop'
for t in T:
    EASE.setdefault(t, 'small')
for t in CUT_TYPES: EASE[t] = 'cut'
EASE_TXT = {'ready': 'an attack the game already has does this (a kit verb or a boss pattern) — a new tuning only',
            'small': 'new code inside the systems we have (boss patterns, statuses, the arena clip)',
            'prop': 'needs an object placed in the arena (a pillar, brazier, lever, mirror …) — a painting and a little code',
            'art': 'needs new paintings (asked for once you have ticked it)', 'cut': 'does not fit the game\'s top-down arenas'}

# ── 3. new proposals for bosses with many phases (each tied to its phase) ──
EXTRA = {
 'swamp_witch': {2: [('trail', 'Slime trail', 'The hag drags her hem through the mire, leaving a poison trail as she backs away.', '')],
                 3: [('geysers', 'Cauldron vents', 'Vents round the cauldron pit burst in a turning order — the next one hisses first.', '')]},
 'storm_mage': {2: [('cross', 'Lightning cross', 'Bolts strike the roof in a plus, then an X.', '')],
                3: [('gravity', 'Eye of the storm', 'The storm pulls you toward its eye while debris circles — walk against the wind.', '')]},
 'rock_dragon': {2: [('splitter', 'Geode burst', 'Spits a geode that bursts into a ring of crystal shards where it lands.', ''), ('slick', 'Crystal floor', 'Patches of glassy crystal where you slide.', '')],
                 3: [('stomp', 'Bridge shaker', 'Every step on the chasm bridge throws a small ring — stay off its line.', ''), ('sweep', 'Rockslide', 'A wall of boulders rolls across the bridge with one gap.', '')],
                 4: [('swoop', 'Summit dive', 'It takes wing over the summit and dives along a marked lane; its shadow comes first.', ''), ('firelines', 'Burning scree', 'Its breath sets the scree alight; fire runs along the cracks.', '')]},
 'iron_sentinel': {2: [('totems', 'Turret cogs', 'It bolts two small cog turrets to the floor; they fire until broken.', 'art'), ('combo', 'Piston punches', 'Three piston punches; the third is held a beat.', '')],
                   3: [('orbit', 'Orrery rings', 'Shots orbit it like planets, then fly out along their tracks.', ''), ('lance', 'Star-lens lance', 'A focused beam that tracks you and locks — step across it late.', '')],
                   4: [('meteor', 'Forge-fall', 'A molten ingot is hurled high: a huge mark — get behind an anvil.', ''), ('wardens', 'Guardian shields', 'Its Forge Guardians lock shields over it; break one to open it.', '')]},
 'lava_titan': {1: [('fan', 'Magma spit', 'A fan of magma globs with clear gaps between them.', '')],
                2: [('trail', 'Molten footsteps', 'Each step leaves a burning footprint that cools after a while.', ''), ('slick', 'Thin crust', 'Patches of cooling crust crack under your feet and slow you.', '')],
                3: [('scatter', 'Glass shrapnel', 'Strike its glass skin and shards burst out around it — hit and step away.', ''), ('ricochet', 'Glass shards', 'Shards that bounce once off the arena\'s edge.', '')],
                4: [('charge', 'Rim charge', 'Charges round the rim; if it misses it hits the edge rocks and stalls.', ''), ('columns', 'Fire columns', 'Columns of fire chase your path.', '')],
                5: [('weak', 'The heart beats', 'After each ring wave it opens its chest — strike the heart.', ''), ('safe', 'The volcano breathes', 'The whole floor is about to erupt except a few cooled circles.', ''), ('rhythm', 'Heartbeat', 'Its attacks fall on the beat of the heart.', '')]},
 'shadow_lord': {1: [('seekers', 'Shadow seekers', 'Slow shadow orbs drift after you; strike them to burst them.', '')],
                 2: [('hide', 'Shroud', 'He hides in his shroud; only his footsteps glow.', ''), ('mark', 'Soul mark', 'Marks you; stand in a pool of light before it bursts.', '')],
                 3: [('ride', 'Dread-rider passes', 'Rides round the hall and makes lance passes through the middle.', ''), ('echoes', 'Mirror riders', 'Riders burst from the mirrors; only the true one casts a shadow.', '')],
                 4: [('gravity', 'The void pulls', 'A pull toward the void\'s heart with debris circling.', ''), ('spiral', 'Starless spiral', 'A spiral of dark stars from the wing-beats.', '')],
                 5: [('split', 'Three of him', 'He splits in three; all must fall close together.', ''), ('cross', 'Dawn cross', 'Beams of dawn cross the altar in a plus, then an X.', '')]},
 'glodr': {1: [('fan', 'Spark fan', 'A fan of sparks with clear gaps.', '')], 3: [('firelines', 'Running fire', 'Fire runs along the floor grooves of the forge.', '')]},
 'eisa': {1: [('seekers', 'Steam wisps', 'Slow homing wisps of steam.', '')], 3: [('safe', 'Boil-over', 'Everything boils except the dry circles.', '')]},
 'gjallr': {1: [('combo', 'Slag fists', 'Three heavy blows, the last held.', '')], 3: [('weak', 'Cracked shell', 'After a slam its slag shell cracks — hit the cracks.', '')]},
 'eimyrja': {1: [('hook', 'Chain hook', 'Hurls a chain hook that drags you in unless you roll.', '')], 2: [('cross', 'Chain lanes', 'Chains snap taut in a plus across the hall.', '')]},
 'surtharn': {1: [('combo', 'Greatsword combo', 'Three swings, the last delayed.', ''), ('trail', 'Burning blade', 'The sword leaves burning lines on the floor.', '')],
              2: [('quake', 'Hammer rings', 'Each hammer blow rolls out a ring with a gap.', ''), ('meteor', 'The great hammer', 'A huge overhead blow on a marked spot — hide behind an anvil.', '')],
              3: [('wardens', 'Bound shield-bearers', 'Bound spirits hold shields over him; free them with magic.', ''), ('raise', 'The host rises', 'Fallen spirits rise again unless freed.', '')],
              4: [('sweep', 'Sword of flame', 'The flaming sword sweeps the hall as a wall with one gap.', ''), ('charge', 'Jötunn charge', 'A charge that stalls him at the arena\'s edge.', '')],
              5: [('weak', 'Caged heart', 'The glass cage cracks after a slam; strike the heart.', ''), ('mirror', 'Glass skin', 'His glass reflects bolts; strike with blades.', '')],
              6: [('safe', 'The volcano erupts', 'The floor erupts except a few circles.', ''), ('rhythm', 'The last heartbeat', 'His attacks fall on the music\'s beat.', '')]},
 'grim': {2: [('feint', 'Two faces', 'The light half feints; the dark half strikes.', '')], 3: [('gravity', 'The black sun', 'The black sun pulls everything toward it.', '')]},
 'musp': {1: [('fan', 'Ember fans', 'Fans of embers from the wraith while the spitter lobs.', '')], 2: [('swoop', 'Phoenix dives', 'The phoenix dives along a lane while its partner charges.', '')],
          3: [('bash', 'Ashen shield', 'The knight holds a shield over its partner; get round it.', '')], 4: [('slow', 'Time-burn', 'Near the wraith your steps drag in a zone of burning time.', '')]},
}
ORDER = ['rush', 'shot', 'move', 'area', 'summon', 'arena', 'mind']        # escalation: blades and shots first, set-pieces and mind games last

# ── 4. today, phase by phase ──
VERB = {'shoot': 'Shots', 'beam': 'Beam (winds up, then a line)', 'lob': 'Lobbed bombs', 'ring': 'Ring wave with a gap', 'slam': 'Ground slam', 'banish': 'Knocks your familiar out',
        'blink': 'Blinks near you', 'pull': 'Pulls you in', 'charge': 'Charge (stunned if it misses)', 'lunge': 'Lunge', 'cloud': 'A cloud on you', 'sweep': 'Wide sweep', 'summon': 'Summons',
        'marks': 'Marked strikes', 'drain': 'Life drain', 'breath': 'Breath cone', 'armor': 'Armour plates', 'wall': 'A wall across the arena', 'gust': 'Wind gust (pushes you)',
        'strike': 'Lightning where you stand still', 'melee': 'Blade combo', 'regen': 'Heals itself', 'reflect': 'Reflects your shots', 'dodge': 'Dodges', 'burrow': 'Burrows and erupts',
        'leap': 'Leaps at you', 'aura': 'Burning aura', 'swap': 'Swaps places with you', 'echo': 'Shadow copy', 'thorns': 'Thorns (hurts when struck)', 'orbit': 'Circles you', 'revive': 'Revives its partner'}
MOVE_VERB = {'kite': 'keeps its distance', 'chase': 'chases you', 'lumber': 'heavy, slow walk', 'drift': 'drifts at a distance', 'hover': 'hovers', 'flit': 'flits about', 'still': 'stands its ground'}
EVT = {'marks': 'Strikes from above', 'geyser': 'Geysers', 'wind': 'Storm wind', 'wave': 'A wave sweeps the arena', 'rift': 'Rifts open', 'lob': 'Bombs rain in'}
BAR = {'ward': '✨ Ward — only spells and familiars break it', 'guard': '🏹 Guard — only arrows break it', 'plate': '🛡 Plate — only blades break it'}
BEATS = {'fire': 'grass', 'water': 'fire', 'grass': 'earth', 'earth': 'water', 'storm': 'shadow', 'shadow': 'storm'}
ELN = {'fire': 'Fire', 'water': 'Water', 'grass': 'Grass', 'earth': 'Earth', 'storm': 'Storm', 'shadow': 'Shadow'}
EL = {'goblin_king': ['earth'], 'dark_warlock': ['shadow'], 'swamp_witch': ['water'], 'storm_mage': ['storm'], 'rock_dragon': ['earth'], 'iron_sentinel': ['storm'], 'lava_titan': ['fire'],
      'shadow_lord': ['shadow'], 'isl1': ['grass'], 'isl2': ['water'], 'isl3': ['earth'], 'isl4': ['fire'],
      'q1_b': ['grass'], 'q1_c': ['grass', 'fire'], 'q1_d': ['earth', 'storm'], 'q2_b': ['water', 'grass'], 'q2_c': ['water', 'shadow'], 'q2_d': ['grass', 'water'],
      'q3_b': ['fire', 'earth'], 'q3_c': ['water'], 'q3_d': ['storm'], 'q4_b': ['earth', 'shadow'], 'q4_c': ['fire'], 'q4_d': ['shadow'],
      'rime_spire': ['water'], 'scriptorium': ['storm'], 'hearthfire': ['fire'], 'rootspire': ['grass'], 'conductor': ['storm'], 'frozen_belfry': ['water'], 'mire_tower': ['grass', 'water'],
      'drowned_lighthouse': ['water', 'shadow'], 'ember_observatory': ['fire', 'storm'], 'hollow_spire': ['shadow'], 'lightning_rod': ['storm'], 'monolith': ['earth'],
      'frostbitten_crown': ['water', 'storm'], 'rift_tower': ['shadow'], 'crimson_spire': ['shadow'], 'astral_spire': ['storm'],
      'elite1': ['shadow', 'earth'], 'elite2': ['earth', 'water'], 'elite3': ['earth', 'storm'], 'elite4': ['shadow', 'fire']}


def element_line(els):
    if not els: return None
    res = sorted({a for d in els for a in ELN if a == d or BEATS[d] == a}); weak = sorted({a for d in els for a in ELN if BEATS[a] == d} - set(res))
    return '%s — resists %s; weak to %s' % (' & '.join(ELN[e] for e in els), ', '.join(ELN[e] for e in res) or '—', ', '.join(ELN[e] for e in weak) or '—')


def kit_items(kit, seen):
    out = []
    for tok in (kit or '').split('|'):
        tok = tok.strip()
        if not tok: continue
        v = tok.split(' ')[0]; kv = dict(x.split('=', 1) for x in tok.split(' ')[1:] if '=' in x)
        if v in MOVE_VERB: out.append(('move', 'Moves: ' + MOVE_VERB[v])); continue
        n = VERB.get(v, v)
        if v == 'shoot': n = ('Homing shots' if kv.get('homing') else 'Ricochet shots' if kv.get('ric') else 'Shots') + ' (' + kv.get('p', 'bolt') + (' ×' + kv['n'] if 'n' in kv else '') + ')'
        elif v in ('lob', 'slam') and kv.get('zone'): n += ' (leaves %s ground)' % kv['zone']
        elif v in ('cloud', 'breath') and kv.get('st'): n += ' (%s)' % kv['st']
        elif v == 'summon': n = 'Summons ' + kv.get('id', '?').replace('_', ' ') + (' ×' + kv['n'] if 'n' in kv else '')
        if n in seen: continue
        seen.add(n); out.append(('kit', n))
    return out


def phase_today(slot, P=None, base_hp=None, last=False):
    items, seen = [], set()
    d = TODAY['desc'].get(slot, '')
    sig, _, stand = d.partition(' — last stand: ')
    for s in [x.strip() for x in sig.split(' · ') if x.strip()]:
        seen.add(s); items.append(('sig', s))
    if P:
        items += kit_items(P.get('kit'), seen)
        for e in P.get('ev') or []: items.append(('event', 'Arena event: %s%s' % (EVT.get(e['k'], e['k']), (' — "' + e['say'] + '"') if e.get('say') else '')))
        for a in P.get('allies') or []: items.append(('ally', 'Allies: %s ×%d' % (a['form'].replace('boss_vr_', '').replace('bf_', '').replace('_', ' '), a.get('n', 1))))
        if P.get('hp') and P['hp'] > 1: items.append(('hp', 'More health — ×%s of its first form' % P['hp']))
        for b in P.get('bars') or []: items.append(('bar', '%s (%d %% of its health%s)' % (BAR[b['k']], round(b['f'] * 100), '' if b.get('at', 1) >= 1 else ', from %d %% down' % round(b['at'] * 100))))
    if stand and last: items.append(('stand', 'Last stand: ' + stand))
    return items


def phases_of(b):
    """[(label, slot, P)] for a plan boss."""
    k = b['id']; PH = TODAY['phases']
    if k in ('goblin_king', 'dark_warlock', 'swamp_witch', 'storm_mage', 'rock_dragon', 'iron_sentinel', 'lava_titan', 'shadow_lord'):
        out = [('Phase 1 · its own site\'s last floor', 'boss_' + k, None)]
        for i, P in enumerate(PH[k]['phases'][1:]): out.append(('Phase %d · %s' % (i + 2, P.get('arena', '').replace('_', ' ')), P['form'], P))
        return out
    if k in ('glodr', 'eisa', 'gjallr', 'eimyrja'):
        return [('Phase %d' % (i + 1), P['form'], P) for i, P in enumerate(PH['forge_' + k]['phases'])]
    if k == 'surtharn': return [('Phase %d' % (i + 1), P['form'], P) for i, P in enumerate(PH['surtharn']['phases'])]
    if k == 'grim': return [('Phase %d' % (i + 1), P['form'], P) for i, P in enumerate(PH['grimnir']['phases'])]
    if k == 'musp': return [('Fight %d · %s' % (i, PH['musp_g%d' % i]['phases'][0]['form'].replace('boss_vr_', '').replace('_', ' ') + ' and partner'), PH['musp_g%d' % i]['phases'][0]['form'], PH['musp_g%d' % i]['phases'][0]) for i in range(1, 5)]
    if re.match(r'q\d_[bcd]$', k):
        C = TODAY['castles'][k] if k in TODAY['castles'] else next(c for c in TODAY['castles'].values() if c.get('key') == k)
        return [('The top floor of the castle', C['warden'], {'kit': C.get('kit')})]
    M = next((m for m in TODAY['mages'] if m['key'] == k), None)
    if M: return [('The top of the tower', M['boss'], {'kit': M.get('kit')})]
    if k.startswith('isl'): return [('The island dungeon\'s last floor', 'boss_isl_' + k[3:], None)]
    if k.startswith('elite'): return [('The treasure-vault den', 'elite_' + k[5:], None)]
    if k.startswith('vr_'): return [('Its wave of the boss rush', 'boss_' + k, None)]
    raise KeyError(k)


def target(n): return 10 if n == 1 else 5 if n == 2 else 4 if n <= 5 else 3


SCHEMES = [
    {'id': 'share', 'n': 'A share of the list', 'd': 'Each difficulty uses the top part of every phase\'s ranked list: Hearthside the top half, Wayfarer 70 %, Shieldbearer 85 %, Ragnarök all of it.', 'f': [0.5, 0.7, 0.85, 1.0]},
    {'id': 'steps', 'n': 'One more each step', 'd': 'Ragnarök uses the whole list; each gentler level drops the last-ranked element (Shieldbearer −1, Wayfarer −2, Hearthside −3), never fewer than two.', 'f': [-3, -2, -1, 0]},
    {'id': 'core', 'n': 'A gentle core, a hard edge', 'd': 'Hearthside and Wayfarer share the same core (the top 60 %); Shieldbearer adds one; Ragnarök adds the rest and plays the last stand in every phase.', 'f': [0.6, 0.6, 'core+1', 1.0]},
]

bosses, cuts, reworks = [], [], []
OLD = {b[0]: b for b in A + B}
for key, name, where, nature, move, props in A + B:
    move = MOVE_FIX.get(key, move)
    phs = phases_of({'id': key}); N = len(phs)
    # the proposals that survive, each with its phase (if it named one)
    keep = []
    for i, p in enumerate(props):
        t, n, d, art = p
        if (key, i) in CUT or t in CUT_TYPES:
            cuts.append({'b': key, 'name': name, 'n': n, 't': t, 'why': CUT.get((key, i)) or CUT_TYPES[t]}); continue
        if (key, i) in REWORK:
            reworks.append({'b': key, 'name': name, 'n': n, 'old': d, 'new': REWORK[(key, i)]}); d = REWORK[(key, i)]
        m = re.match(r'Phase (\d):\s*', d); ph = None
        if m: ph = min(int(m.group(1)), N); d = d[m.end():]
        keep.append({'i': i, 't': t, 'n': n, 'd': d[0].upper() + d[1:], 'art': bool(art), 'ph': ph, 'src': 'r127'})
    for ph, L in EXTRA.get(key, {}).items():
        for (t, n, d, art) in L: keep.append({'i': None, 't': t, 'n': n, 'd': d, 'art': bool(art), 'ph': min(ph, N), 'src': 'new'})
    # spread the untied proposals over the phases, escalating
    cnt = collections.Counter(p['ph'] for p in keep if p['ph'])
    free = sorted([p for p in keep if not p['ph']], key=lambda p: (ORDER.index(T[p['t']][1]), p['i'] if p['i'] is not None else 99))
    each, ph = max(target(N), math.ceil(len(keep) / N)) if N > 1 else len(keep), 1
    for j, p in enumerate(free):            # in escalation order, moving forward through the phases as each one fills
        while ph < N and (cnt[ph] >= each or len(free) - j <= sum(max(0, each - cnt[q]) for q in range(ph + 1, N + 1)) - 0 and cnt[ph] >= math.floor(len(keep) / N)):
            ph += 1
        p['ph'] = ph; cnt[ph] += 1
    for p in keep: p['ease'] = 'art' if p['art'] and EASE[p['t']] != 'cut' else EASE[p['t']]
    # today and the suggestion, per phase
    els = EL.get(key) or (['fire'] if key.startswith('vr_') or key in ('musp', 'surtharn', 'glodr', 'eisa', 'gjallr', 'eimyrja') else [])
    P_out, prev = [], set()
    for pi, (lbl, slot, P) in enumerate(phs):
        today = phase_today(slot, P, last=(pi == N - 1))
        tod = [{'id': 'k%d' % j, 'k': k2, 'n': n2} for j, (k2, n2) in enumerate(today)]
        new = [dict(p, id='n%d' % j) for j, p in enumerate([p for p in keep if p['ph'] == pi + 1])]
        new.sort(key=lambda p: ORDER.index(T[p['t']][1]))
        for j, p in enumerate(new): p['id'] = 'n%d' % j
        # suggestion: every feasible new element; from today the signature attacks (two), the extra-health bars and the last stand
        sug_new = [p['id'] for p in new]
        sig = [t2['id'] for t2 in tod if t2['k'] == 'sig'][:2]
        bars = [t2['id'] for t2 in tod if t2['k'] in ('bar', 'stand')]
        always = [t2['id'] for t2 in tod if t2['k'] in ('hp',)]
        # rank: today's signature first (who it is), then new by escalation, the bars, the last stand last
        rank = sig[:1] + [x for pair in zip(sug_new, sig[1:] + [None] * len(sug_new)) for x in pair if x] + [x for x in bars if not x.startswith('stand')]
        rank += [t2['id'] for t2 in tod if t2['k'] == 'stand']
        rank = list(dict.fromkeys(rank))
        P_out.append({'lbl': lbl, 'slot': slot, 'today': tod, 'new': [{'id': p['id'], 't': p['t'], 'n': p['n'], 'd': p['d'], 'art': p['art'], 'ease': p['ease'], 'src': p['src'], 'i': p['i']} for p in new],
                      'always': always, 'sug': rank})
    bosses.append({'id': key, 'name': name, 'where': where, 'nature': nature, 'n': N, 'el': element_line(els), 'move': {'t': move[0], 'd': move[1]}, 'phases': P_out})

types = [{'id': t[0], 'th': t[1], 'ic': t[2], 'n': t[3], 'd': TYPE_FIX.get(t[0], t[4]), 'from': t[5], 'ease': EASE[t[0]]} for t in TYPES]
data = {'themes': {k: {'n': v[0], 'col': v[1]} for k, v in THEMES.items()}, 'types': types, 'ease': EASE_TXT, 'schemes': SCHEMES, 'cuts': cuts, 'reworks': reworks, 'bosses': bosses,
        'diff': [{'id': d['id'], 'n': d['name'], 'ic': d['icon']} for d in TODAY['diff']]}
out = os.path.join(R, 'lab', 'src', 'js', '79y2-0-bossplan2-data.js')
open(out, 'w', encoding='utf-8').write('// generated by tools/world/boss_plan2.py — round 128, boss fights phase by phase (do not edit by hand)\nvar LBPLAN2=' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
pc = collections.Counter(b['n'] for b in bosses)
print('%d bosses (phases: %s); %d proposals kept (%d new for many-phase bosses), %d cut, %d re-told; per phase new: min %d max %d → %s' % (
    len(bosses), dict(pc), sum(len(P['new']) for b in bosses for P in b['phases']), sum(1 for b in bosses for P in b['phases'] for p in P['new'] if p['src'] == 'new'), len(cuts), len(reworks),
    min(len(P['new']) for b in bosses for P in b['phases']), max(len(P['new']) for b in bosses for P in b['phases']), out))
print(collections.Counter(p['ease'] for b in bosses for P in b['phases'] for p in P['new']))
