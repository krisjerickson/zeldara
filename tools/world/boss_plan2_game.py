#!/usr/bin/env python3
"""Round 129: THE BOSS PLAN, INTO THE GAME (Kris: "all the picks for boss fights are in. even if i didn't pick 'yes' i like what is picked.
let's get it into the game. I did click some things from the 'today' list, but if some of these don't work with the new ones that were
proposed, ok to take out the 'today' ones i picked").
Reads the round-128 plan (lab/src/js/79y2-0-bossplan2-data.js, LBPLAN2) and Kris's picks (tools/world/boss_picks129.json: the ranked list
he made for 39 phases; the suggested ranked list for the other 58; the movement of every boss; the difficulty scheme he chose) and writes
src/js/09bx-0-boss-plan2-data.js (BP2D), keyed by the slot the game knows each boss form by:
  r   the ranked elements:  ['s',j] its own signature attack j · ['d'] its last stand · ['b',j] extra-health bar j · ['e',j] arena event j
                            ['k',[tokens]] a kit attack kept · ['n',type,name] a new element
  kd  today's kit attacks no longer used (they make way for the new elements) · ad 1 = its allies make way too
  mv  how it travels round the arena · el its element(s)
The game (09bx-boss-plan2.js) cuts the ranked list by difficulty: scheme 'share' — Hearthside the top half, Wayfarer 70 %, Shieldbearer
85 %, Ragnarök all of it (never fewer than two).
    python tools/world/boss_plan2_game.py"""
import json, os, re, sys
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
R = os.path.abspath(os.path.join(H, '..', '..'))
L = json.loads(open(os.path.join(R, 'lab', 'src', 'js', '79y2-0-bossplan2-data.js'), encoding='utf-8').read().split('var LBPLAN2=', 1)[1].rstrip().rstrip(';'))
PK = json.load(open(os.path.join(H, 'boss_picks129.json'), encoding='utf-8'))
TODAY = json.load(open(os.path.join(H, 'boss_today.json'), encoding='utf-8'))
import boss_plan2 as BP      # its tables (VERB, MOVE_VERB, phases_of, EL …); importing it also re-writes LBPLAN2 unchanged

MOVE_VERBS = set(BP.MOVE_VERB)


def kit_tokens(kit):
    """[(item name, [tokens])] in the order boss_plan2.kit_items lists them (tokens that make the same item are grouped)."""
    out, idx = [], {}
    for tok in (kit or '').split('|'):
        tok = tok.strip()
        if not tok: continue
        v = tok.split(' ')[0]
        if v in MOVE_VERBS: continue
        n = BP.kit_items(tok, set())
        if not n: continue
        n = n[0][1]
        if n in idx: out[idx[n]][1].append(tok); continue
        idx[n] = len(out); out.append((n, [tok]))
    return out


def scheme_f():
    S = L['schemes'][PK.get('scheme', 0)]
    return S['id'], S['f']


def main():
    D, stats = {}, {'phases': 0, 'chosen': 0, 'sug': 0, 'new': 0, 'types': set(), 'kd': 0}
    for b in L['bosses']:
        phs = BP.phases_of({'id': b['id']})
        mv = b['move']['t'] if PK['move'].get(b['id'], 'pick') != 'cut' else 'blink'
        els = BP.EL.get(b['id']) or (['fire'] if b['id'].startswith('vr_') or b['id'] in ('musp', 'surtharn', 'glodr', 'eisa', 'gjallr', 'eimyrja') else [])
        for i, P in enumerate(b['phases']):
            key = '%s_p%d' % (b['id'], i + 1); stats['phases'] += 1
            lst = PK['phases'].get(key) or P['sug']
            stats['chosen' if key in PK['phases'] else 'sug'] += 1
            slot = P['slot']; lbl, slot2, GP = phs[i]; assert slot == slot2, (slot, slot2)
            tod = {t['id']: t for t in P['today']}; new = {p['id']: p for p in P['new']}
            # today's items → what they are in the game
            kinds = [t['k'] for t in P['today']]
            sig_j = {t['id']: j for j, t in enumerate([t for t in P['today'] if t['k'] == 'sig'])}
            bar_j = {t['id']: j for j, t in enumerate([t for t in P['today'] if t['k'] == 'bar'])}
            ev_j = {t['id']: j for j, t in enumerate([t for t in P['today'] if t['k'] == 'event'])}
            kt = dict(kit_tokens((GP or {}).get('kit')))
            r = []
            for x in lst:
                if x in new:
                    p = new[x]; r.append(['n', p['t'], p['n']]); stats['new'] += 1; stats['types'].add(p['t']); continue
                t = tod[x]; k = t['k']
                if k == 'sig': r.append(['s', sig_j[x]])
                elif k == 'stand': r.append(['d'])
                elif k == 'bar': r.append(['b', bar_j[x]])
                elif k == 'event': r.append(['e', ev_j[x]])
                elif k == 'kit' and t['n'] in kt: r.append(['k', kt[t['n']]])
                # 'move' (its walk) always stays; 'hp' and the element are always kept
            kept_kit = {tok for e in r if e[0] == 'k' for tok in e[1]}
            kd = [tok for n, toks in kt.items() for tok in toks if tok not in kept_kit]
            stats['kd'] += len(kd)
            ally = any(t['k'] == 'ally' for t in P['today']); ally_kept = any(tod.get(x, {}).get('k') == 'ally' for x in lst)
            E = {'b': b['id'], 'p': i + 1, 'n': b['n'], 'mv': mv, 'el': els, 'r': r}
            if kd: E['kd'] = kd
            if ally and not ally_kept: E['ad'] = 1
            if any(k == 'stand' for k in kinds) and not any(e[0] == 'd' for e in r): E['nd'] = 1
            D['musp_g%d' % (i + 1) if b['id'] == 'musp' else slot] = E      # the Muspelheim guards share forms with the boss rush: keyed by their fight
    sid, f = scheme_f()
    data = {'scheme': sid, 'f': f, 'min': 2, 'slots': D}
    out = os.path.join(R, 'src', 'js', '09bx-0-boss-plan2-data.js')
    open(out, 'w', encoding='utf-8').write('// generated by tools/world/boss_plan2_game.py — round 129, the boss plan in the game (do not edit by hand)\nvar BP2D='
                                           + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print('%d phases (%d ranked by Kris, %d as suggested) · %d new elements of %d kinds · %d of today\'s kit attacks make way · scheme %s → %s'
          % (stats['phases'], stats['chosen'], stats['sug'], stats['new'], len(stats['types']), stats['kd'], sid, out))
    return data, stats


if __name__ == '__main__': main()
