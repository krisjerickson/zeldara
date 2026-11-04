"""Round 87 — the story told straight (doc 43): the hero cards, names and lines; the World Tree only after the end. Run: python tests/test_round87.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
ROOT = os.path.join(os.path.dirname(__file__), '..', 'src', 'js')
src = ''.join(open(os.path.join(ROOT, f), encoding='utf-8').read() for f in sorted(os.listdir(ROOT)) if f.endswith('.js') and f != '07zz-boss-designs.js')
gone = [s for s in ("shieldmaiden's daughter", "woodcutter's son", 'Both play the same', 'hardly any children', 'captured spirit light', 'taught the Lodestar its one spell', 'teaches you Godsbane', '(Final Quest)', "'Volcano Lord'", 'I always have to be Zeldor', 'This one I wore') if s in src]
check('The old lines are gone from the game: %s' % (gone or 'none left'), not gone, gone)
with game(painted=False) as g:
    g.wait(2500)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), o={}; o.sword=ITEMS.volcano_lord&&ITEMS.volcano_lord.name; o.boss=(typeof CHAR_LIST!=='undefined'?CHAR_LIST:[]).filter(c=>c.id==='boss_volcano_lord').map(c=>c.name).join('');
      var ps={spiritsFreed:new Array(40).fill('x'),sagaSeen:['gate','orbs','firstfree','realm1','realm2','realm3','realm4'],creditsSeen:0}, got=[], p0=ZSAGA.play, r0=ZSAGA.ready; ZSAGA.ready=function(){ return true; }; ZSAGA.play=function(p,k){ got.push(k); return true; };
      var fake={playerState:ps}; o.before=ZTGB.ended(ps,fake); ps.creditsSeen=1; o.after=ZTGB.ended(ps,fake); ZSAGA.play=p0; ZSAGA.ready=r0; return o; })()""")
    check('The sword is the Muspel Blade (%s)' % r['sword'], r['sword'] == 'Muspel Blade', r)
    check('The World Tree waits for the end: not before the credits, yes after (%s → %s)' % (r['before'], r['after']), r['before'] is False and r['after'] is True, r)
print('%d / %d passed' % (sum(res), len(res)))
