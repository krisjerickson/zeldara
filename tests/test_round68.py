"""Round 68 — soul-lines Lab round B (the four line styles up close, on Kris's pick: the World-Tree); the story fixes from doc 30:
Solmyrk is an impostor on Odin's seat (not Odin himself), and Pip and Wren stay hidden until the spirits go home.
Run: python tests/test_round68.py"""
import re, os, sys, glob
from playwright.sync_api import sync_playwright
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:400] if info != '' else ''), flush=True)
src = ''.join(open(f, encoding='utf-8').read() for f in sorted(glob.glob(os.path.join(R, 'src/js/*.js'))))
bad = [s for s in ('Odin himself', 'Corrupted Odin', 'corrupted into a false god') if s in src]
check('No game text calls Solmyrk Odin himself any more (%s)' % bad, not bad)
check('He is named an impostor on the citadel quest, the codex, and the painting notes', src.count('impostor') >= 4 and all(k in src for k in ("NO LEGS", "ONE glowing eye")))
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        if os.path.isfile(f): r.fulfill(path=f)
        else: r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html"); pg.wait_for_timeout(1500)
    t = pg.evaluate("LTODO.open().map(function(o){ return o.id; })")
    check('"Waiting for your picks" lists the line-style pick (%s)' % t, 'soulstyle' in t)
    pg.evaluate("LTODO.goTo('soulstyle','.sl-bar',0)"); pg.wait_for_timeout(5000)
    pg.evaluate("[...document.querySelectorAll('.sl-grid canvas')].pop().scrollIntoView()"); pg.wait_for_timeout(2500)      # cards draw only while on screen
    r = pg.evaluate("""(()=>{ var cv=[...document.querySelectorAll('.sl-grid canvas')]; return {tab:LabApp.tab, n:cv.length, lit:cv.map(function(c){ var d=c.getContext('2d').getImageData(c.width/2-60,c.height/2-60,120,120).data, n=0; for(var i=0;i<d.length;i+=4)if(d[i+2]>200&&d[i+1]>180&&d[i]<190)n++; return n; })}; })()""")
    check('The "Soul-lines up close" tab shows Kris\'s vein + motes and the four styles, each drawing rune-blue light round the bindstone (%s)' % r, r['tab'] == 'soulstyle' and r['n'] == 5 and all(n > 20 for n in r['lit']), r)
    pg.evaluate("document.querySelector('.ss-q[data-q=\"3\"]').click()"); pg.wait_for_timeout(1500)
    check('Each realm has its own window (Highlands: %s)' % pg.evaluate("LSS.window(3).z.r"), pg.evaluate("LSS.window(3).z.r") == 3)
    check('No Lab script errors', not errs, errs[:3])
with game(new=True) as g:
    g.wait(3500)
    r = g.js("""(function(){ var ws=game.scene.getScene('World'), ps=ws.playerState, ids=function(){ return ws._folk.map(function(f){ return f.F.id; }); }, o={};
      ws.wd.villageStage=4; ws._villageFolkInit(); o.before=ids(); ps.spiritsHome=1; ws._villageFolkInit(); o.after=ids(); return o; })()""")
    kid = lambda L: [i for i in L if i.startswith('vf_kid')]
    check('Pip and Wren are not in the village before the spirits go home, even when it has grown (%s)' % kid(r['before']), not kid(r['before']) and len(r['before']) > 2, r)
    check('…and come back once they have (%s)' % kid(r['after']), sorted(kid(r['after'])) == ['vf_kid1', 'vf_kid2'], r)
    e = [x for x in g.errs if 'favicon' not in x]
    check('No game script errors', not e, e[:3])
print('\n%d / %d passed' % (sum(res), len(res)))
