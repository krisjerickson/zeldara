"""Round 122: the Zeldara versions of the shot series (Kris: "do we need to request new images for the zeldara versions of the cut scenes, or
are those ready from my picks from zeldor?").
His picks were made on the Zeldor series. A kept shot with no hero in it is the same picture for both twins (nothing to paint); the original
story frame (shot 0) already has a Zeldara version (sc_sb_<scene>_<nn>_f); every kept shot WITH the hero needs a Zeldara repaint.
Reads sprites/requests/series_picks.json (the Lab's picks, copied by Claude) and series_plan.json; writes
  src/js/07zt9c-zeldara-shots.js   ZSSF.LIST: [scene, frame, shot, zeldor shot id]
  sprites/requests/r122_zeldara_shots.txt   .\\tools\\sprites\\paint.ps1 -List r122_zeldara_shots
python tools/sprites/zeldara_shots.py   (then node build.mjs)
Held (round 122b) until every twin cut-scene is picked in every frame: until then ZSSF.LIST is empty and there is no list."""
import os, sys, json, re
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
R = lambda *p: os.path.join(ROOT, *p)
picks = json.load(open(R('sprites', 'requests', 'series_picks.json'), encoding='utf-8'))
plan = json.load(open(R('sprites', 'requests', 'series_plan.json'), encoding='utf-8'))['scenes']
L, reuse, orig = [], 0, 0
# round 122b (Kris: "i don't want to request the zeldara images until i've selected all the zeldor ones into the cut-scenes, otherwise we'll
# request too many"): nothing is asked for until EVERY cut-scene with both twins has a pick in every frame
twin = [sc for sc in plan if len(sc.get('whos', [])) >= 2]
done = [sc['id'] for sc in twin if all(('%s_%02d' % (sc['id'], b['n'])) in picks for b in sc['beats'])]
READY = len(done) == len(twin)
for sc in plan:
    if len(sc.get('whos', [])) < 2: continue
    for b in sc['beats']:
        p = picks.get('%s_%02d' % (sc['id'], b['n']))
        if not p or not p.get('keep'): continue
        sh = {x['k']: x for x in b['shots']}
        for k in p['keep']:
            if k == 0: orig += 1; continue
            x = sh.get(k)
            if not x: continue
            if x['who'] != 'h': reuse += 1; continue
            L.append([sc['id'], b['n'], k, x['id']])
if not READY: L = []
js = ('// ═══════════════════════════════════════════════════════════════════════\n'
      '// ║ 07zt9c-zeldara-shots.js — made by tools/sprites/zeldara_shots.py (round 122) — do not edit by hand.\n'
      '// ║ The Zeldara versions of the shots Kris kept (picked on the Zeldor series): only shots with the hero in them; the rest are shared.\n'
      '// ═══════════════════════════════════════════════════════════════════════\n'
      'var ZSSF={ WAVE:124, LIST:' + json.dumps(L, separators=(',', ':')) + ' };\n')
open(R('src', 'js', '07zt9c-zeldara-shots.js'), 'w', encoding='utf-8').write(js + open(R('tools', 'sprites', 'zeldara_shots.tail.js'), encoding='utf-8').read())
ids = [x[3][:-2] + '_f' for x in L]
LST = R('sprites', 'requests', 'r122_zeldara_shots.txt')
if not READY:
    if os.path.exists(LST): os.remove(LST)
    sys.exit('HELD: %d of %d twin cut-scenes fully picked (%s) - no Zeldara pictures are asked for until all are.' % (len(done), len(twin), ', '.join(done)))
open(LST, 'w', encoding='utf-8').write(
    '# Round 122 — the Zeldara versions of the shots you kept (%d pictures; %d kept shots without the hero are shared, %d originals already have hers).\n'
    '# .\\tools\\sprites\\paint.ps1 -List r122_zeldara_shots\n' % (len(L), reuse, orig) + '\n'.join(ids) + '\n')
print('%d Zeldara shots to paint, %d shared, %d originals' % (len(L), reuse, orig))
