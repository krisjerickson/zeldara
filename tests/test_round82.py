"""Round 82 — the story cut-scenes in the game as their painted frames, with time to read (16w-story-frames.js, 16p ZCUT.hold,
tools/video/story_atlas.py). Run: python tests/test_round82.py"""
import os, sys, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
I = json.load(open(os.path.join(R, 'assets', 'story', 'index.json')))
S = json.load(open(os.path.join(R, 'sprites', 'requests', 'storyboards.json'), encoding='utf-8'))
miss = [(s['id'], i) for s in S['scenes'] for b in s['beats'] for i in b['ids'] if i not in I.get(s['id'], {}).get('at', {})]
check('Every story frame is on its cut-scene\'s sheet (%d sheets)' % len(I), len(I) == len(S['scenes']) and not miss and all(os.path.isfile(os.path.join(R, 'assets', 'story', v['file'])) for v in I.values()), miss[:5])
with game(painted=True) as g:
    g.wait(2500)
    r = g.js("""(()=>{ ZCUT.on=true; var ps=game.scene.getScene('World').playerState; ps.hero='f'; ps.sagaSeen=[];
      var o={bad:Object.keys(ZSFR.MAP).filter(function(k){ return !ZSFR.ready(k); }), fh:ZSFR.frames(['feasthall',3,5],ps).map(function(x){ return x[0]; }), hold:[ZCUT.hold('Short.'),ZCUT.hold(new Array(121).join('a'))],
        scenes:Object.keys(ZSFR.MAP).map(function(k){ return ZSFR.MAP[k][0]; }).concat(ZSFR.PANELS.map(function(p){ return p[1][0]; })).concat(['bifrost'])};      /* the Bifröst plays at the notch (ZASG.bifrost) */
      o.play=ZSAGA.play(ps,'opening'); return o; })()""")
    used = set(r['scenes'])
    check('Every story moment has its frames (none missing: %s)' % r['bad'], not r['bad'])
    check('Every cut-scene is played somewhere in the game (%d)' % len(used), used >= {s['id'] for s in S['scenes']}, sorted({s['id'] for s in S['scenes']} - used))
    check('Playing Zeldara, her version of a frame is shown; shared frames once (%s)' % r['fh'], r['fh'] == ['sb:feasthall:sb_feasthall_03_f', 'sb:feasthall:sb_feasthall_04', 'sb:feasthall:sb_feasthall_05'])
    check('Time to read: at least 5 s a picture, longer for a long line (%s ms)' % r['hold'], r['hold'][0] >= 5000 and r['hold'][1] >= 11000)
    g.wait(2500)
    o = g.js("(()=>{ var el=document.getElementById('zcut'), d=el&&el.querySelector('.zcut-sb'); return {open:!!el, sb:d&&d.style.backgroundImage, op:d&&d.style.opacity, cap:el&&el.querySelector('.zcut-cap').textContent, n:el&&el.querySelector('.zcut-n').textContent}; })()")
    check('A new game opens on the opening\'s 12 frames, a line under each (%s)' % o['cap'], o['open'] and 'opening.webp' in (o['sb'] or '') and o['op'] == '1' and o['n'].startswith('1 / 12') and len(o['cap']) > 10, o)
    g.wait(5500)
    o2 = g.js("(()=>{ var el=document.getElementById('zcut'); return el&&el.querySelector('.zcut-n').textContent; })()")
    check('The first picture is still up after 8 s (its line takes that long to read)', o2 and o2.startswith('1 / 12'), o2)
    g.page.keyboard.press('Space'); g.wait(1500)
    o3 = g.js("(()=>{ var el=document.getElementById('zcut'); return el&&el.querySelector('.zcut-n').textContent; })()")
    check('Space goes on at once', o3 and o3.startswith('2 / 12'), o3)
    g.page.keyboard.press('Escape'); g.wait(1200)
    b = g.js("""(()=>new Promise(function(res){ var ps=game.scene.getScene('World').playerState; ps.rescued=[1,2,3,4]; ps.sagaSeen=['opening']; delete ZCUT.SETS['story_saga_build4'];
      var ok=ZSAGA.play(ps,'build4'); setTimeout(function(){ var el=document.getElementById('zcut'); res({ok:ok, n:(ZCUT.SETS['story_saga_build4']||[]).length, open:!!el, cap:el&&el.querySelector('.zcut-cap').textContent}); },2500); }))()""")
    check('Vela\'s crossing now has its cut-scene (%s)' % b, b['ok'] and b['n'] == 9 and b['open'], b)
    errs = [x for x in g.errs if 'favicon' not in x and '404' not in x]
    check('No game script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
