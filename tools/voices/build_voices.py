"""Round 114: the villagers' backstories and lines, one file per villager in src/villagers/<key>.md, built into
  src/js/21w-0-voice-lines.js        ZVOICE_LINES — every line the game can say (21w-voices.js reads it)
  lab/src/js/79t-1-villager-stories.js LVSTORY    — the backstories, Saga ties and line counts for the Lab
  docs/66-villager-backstories.md                  — the backstories, for the project
Kris: "around 3X the times you interact with the NPC for lines … a minimum for each character of at least 40 different lines …
start by creating entire backstories for each character, and making sure all these narratives work within the overall saga."

File format (Markdown):
  # Name
  key: oswin
  who: Master Oswin           (the name shown when they speak)
  meets: 62                   (how often you meet them; the target is 3x that, at least 40)
  pick: The legend who keeps growing his stories
  voice: one line on how they talk
  ## Backstory       paragraphs
  ## In the Saga     - bullets: where their story touches the Saga
  ## Talk | ## Shop | ## Bark | ## Gossip | ## Stage 1 … ## Stage 5     - one line each
    Talk: when you Tab them. Shop: when their window opens (their talk lines join in). Bark: as you pass.
    Gossip: about the other villagers (joins talk and shop). Stage N: only while the furthest realm open is N (5 = after the end);
    these come up twice as often. {hero} / {twin} become the twin you play / the one at home.
python tools/voices/build_voices.py        (exit 1 if a villager is short of lines, repeats a line, or gives away the secret too soon)"""
import os, re, sys, json, glob
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = os.path.join(R, 'src', 'villagers')
POOLS = ['talk', 'shop', 'bark', 'gossip']
# the Saga's secrets (docs/agent-context/zeldara-saga.md §7): before the end, no god is named, no word of why the twins have their gift
# or who sent the basket, and no word that the masked one is false; no children before the celebration
SECRET = re.compile(r"\b(Odin|Freya|Allfather|All-father|impostor|false god|sparks? of|sent you down|their last gift|newborn|babies|baby)\b", re.I)
AFTER_ONLY = {'odin', 'freya', 'pip', 'wren'}      # they are only in the village after the end

def split(path):
    """a file may hold several villagers, each from its own '# Name' line"""
    out, cur = [], []
    for raw in open(path, encoding='utf-8').read().split('\n'):
        if raw.startswith('# ') and cur: out.append('\n'.join(cur)); cur = []
        cur.append(raw)
    if any(x.startswith('# ') for x in cur): out.append('\n'.join(cur))
    return out

def parse(txt):
    d = {'name': '', 'story': [], 'saga': [], 'ties': [], 'stage': {}}
    for p in POOLS: d[p] = []
    sec = None
    para = []
    def flush():
        if para and sec == 'backstory': d['story'].append(' '.join(para).strip())
        para.clear()
    for raw in txt.split('\n'):
        line = raw.rstrip()
        if line.startswith('# ') and not d['name']: d['name'] = line[2:].strip(); continue
        m = re.match(r'^##\s+(.*)$', line)
        if m:
            flush(); h = m.group(1).strip().lower(); sec = h
            mm = re.match(r'stage\s+(\d)', h)
            if mm: sec = 'stage' + mm.group(1); d['stage'].setdefault(mm.group(1), [])
            continue
        if sec is None:
            mm = re.match(r'^(\w+):\s*(.*)$', line)
            if mm: d[mm.group(1)] = mm.group(2).strip()
            continue
        if sec == 'backstory':
            if line.strip(): para.append(line.strip())
            else: flush()
            continue
        mm = re.match(r'^\s*-\s+(.*)$', line)
        if not mm: continue
        t = mm.group(1).strip()
        if sec == 'in the saga': d['saga'].append(t)
        elif sec == 'ties': d['ties'].append(t)
        elif sec in POOLS: d[sec].append(t)
        elif sec.startswith('stage'): d['stage'][sec[5:]].append(t)
    flush()
    return d

def main():
    files = sorted(glob.glob(os.path.join(SRC, '*.md')))
    lines, story, bad = {}, {}, []
    for d in [parse(t) for f in files for t in split(f)]:
        k = d.get('key')
        allL = [t for p in POOLS for t in d[p]] + [t for s in d['stage'].values() for t in s]
        meets = int(d.get('meets') or 0); target = max(40, 3 * meets)
        seen = {}
        for t in allL:
            n = re.sub(r'\W+', ' ', t.lower()).strip()
            if n in seen: bad.append('%s: said twice — %s' % (k, t[:70]))
            seen[n] = 1
        if allL and len(allL) < target and d.get('lines') != 'draft': bad.append('%s: %d lines, wants %d' % (k, len(allL), target))      # none yet = waiting for the arc Kris picks
        if k not in AFTER_ONLY:
            pre = [t for p in POOLS for t in d[p]] + [t for s, L in d['stage'].items() if s != '5' for t in L]
            for t in pre:
                if SECRET.search(t): bad.append('%s: gives the secret away before the end — %s' % (k, t[:90]))
        if len(d['story']) < 2: bad.append('%s: the backstory is missing' % k)
        o = {'who': d.get('who') or d['name'], 'pick': d.get('pick', '')}
        for p in POOLS:
            if d[p]: o[p] = d[p]
        if d['stage']: o['stage'] = {s: L for s, L in sorted(d['stage'].items())}
        if allL: lines[k] = o
        story[k] = {'name': d['name'], 'who': o['who'], 'pick': o['pick'], 'voice': d.get('voice', ''), 'meets': meets, 'target': target,
                    'count': len(allL), 'pools': {p: len(d[p]) for p in POOLS}, 'stages': {s: len(L) for s, L in sorted(d['stage'].items())},
                    'story': d['story'], 'saga': d['saga'], 'ties': d['ties'], 'home': d.get('home', ''), 'age': d.get('age', '')}
    js = ('// ═══ 21w-0-voice-lines.js — made by tools/voices/build_voices.py from src/villagers/*.md (do not edit here) ═══\n'
          '// round 114: every villager\'s lines, about 3x the times you meet them and at least 40 each (Kris). 21w-voices.js reads ZVOICE_LINES.\n'
          'var ZVOICE_LINES=' + json.dumps(lines, ensure_ascii=False, separators=(',', ':')) + ';\n')
    gp = os.path.join(R, 'src', 'js', '21w-0-voice-lines.js')
    if '--game' in sys.argv: open(gp, 'w', encoding='utf-8').write(js)      # round 114: the lines go into the game once Kris has picked the villagers' arc
    elif os.path.exists(gp): os.remove(gp)
    lab = ('// made by tools/voices/build_voices.py from src/villagers/*.md — the villagers\' backstories for the Lab (round 114)\n'
           'var LVSTORY=' + json.dumps(story, ensure_ascii=False, separators=(',', ':')) + ';\n')
    open(os.path.join(R, 'lab', 'src', 'js', '79t-1-villager-stories.js'), 'w', encoding='utf-8').write(lab)
    tot = sum(s['count'] for s in story.values())
    md = ['# 66 — The villagers: backstories and voices', '',
          'Round 114. Kris: *"start by creating entire backstories for each character, and making sure all these narratives work within the overall saga. From that the character\'s lines with their personality can come forth."*', '',
          'Each villager has a backstory that fits the Saga (docs/agent-context/zeldara-saga.md), and about three lines for every time you meet them, at least 40 each: %d lines for %d villagers. The source is `src/villagers/<key>.md`; `tools/voices/build_voices.py` builds the game\'s lines and the Lab\'s "Meet the villagers" panel from it.' % (tot, len(story)), '',
          '| Villager | Met | Lines (target) |', '|---|---|---|']
    for k, s in sorted(story.items(), key=lambda x: -x[1]['meets']):
        md.append('| %s | %d | %d (%d) |' % (s['name'], s['meets'], s['count'], s['target']))
    for k, s in sorted(story.items(), key=lambda x: -x[1]['meets']):
        md += ['', '## ' + s['name'], '', '*' + s['pick'] + '*' + (' — ' + s['voice'] if s['voice'] else ''), '']
        md += [p + '\n' for p in s['story']]
        if s['saga']: md += ['**In the Saga**', ''] + ['- ' + x for x in s['saga']] + ['']
        if s['ties']: md += ['**Ties**', ''] + ['- ' + x for x in s['ties']]
    open(os.path.join(R, 'docs', '66-villager-backstories.md'), 'w', encoding='utf-8').write('\n'.join(md) + '\n')
    print('%d villagers, %d lines' % (len(story), tot))
    for k, s in sorted(story.items(), key=lambda x: -x[1]['meets']):
        print('  %-8s met %3d  lines %4d / %4d  %s  story %d words' % (k, s['meets'], s['count'], s['target'], 'ok' if s['count'] >= s['target'] else ('waiting' if not s['count'] else 'SHORT'), sum(len(p.split()) for p in s['story'])))
    for b in bad: print('PROBLEM ' + b)
    return 1 if bad else 0

if __name__ == '__main__':
    sys.exit(main())
