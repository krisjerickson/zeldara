"""Round 65c — "⭐ Waiting for your picks" in the Lab (Kris: "lets create a new button in the lab so i don't miss these"); Kris's
picks for Asgard's ending panels used in the game.
Run: python tests/test_round65c.py"""
import re, os, sys
from playwright.sync_api import sync_playwright
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:400] if info != '' else ''), flush=True)
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
    t0 = pg.evaluate("(document.getElementById('lab-todo-btn')||{}).textContent||''")
    n0 = int(re.sub(r'\D', '', t0) or 0)   # round 71: the list has grown since round 65 (8–9 asks); counted, not fixed
    check('The Lab opens with "⭐ Waiting for your picks" first in the tab bar, glowing (%s)' % t0.strip(), n0 >= 3 and pg.evaluate("document.querySelector('#lab-tabs').firstElementChild.id==='lab-todo-btn'&&document.getElementById('lab-todo-btn').classList.contains('hot')"))
    pg.click('#lab-todo-btn'); pg.wait_for_timeout(300)
    rows = pg.evaluate("[...document.querySelectorAll('#lab-todo-pop .todo-row b')].map(e=>e.textContent)")
    check('Its list names Solmyrk\'s three phases first (%s)' % rows, len(rows) >= 3 and all('Solmyrk' in r for r in rows[:3]))
    pg.click('.todo-go[data-i="1"]'); pg.wait_for_timeout(2500)
    r = pg.evaluate("(()=>{ var h=document.querySelectorAll('.sol-ph')[1].getBoundingClientRect(); return {tab:LabApp.tab, top:Math.round(h.top), pop:!!document.getElementById('lab-todo-pop')}; })()")
    check('"Go →" opens the Bosses tab at phase 2, below the header (%s)' % r, r['tab'] == 'bosses' and 150 < r['top'] < 420 and not r['pop'])
    pg.click('.sol-card[data-slot="sol_2"][data-i="1"] .bb-pick'); pg.wait_for_timeout(500)
    t1 = pg.evaluate("document.getElementById('lab-todo-btn').textContent")
    pg.click('#lab-todo-btn'); pg.wait_for_timeout(300); d = pg.evaluate("[...document.querySelectorAll('#lab-todo-pop .todo-row')].map(e=>e.classList.contains('done'))")
    check('Picking one ticks it off (%s; %s)' % (t1.strip(), d), str(n0 - 1) in t1 and d[:3] == [False, True, False])
    check('No Lab script errors', not errs, errs[:3])
with game(new=True) as g:
    g.wait(3000)
    r = g.js("['cast','bifrost','home','dawn'].map(function(k){ return ZEND.panel(k); })")
    check('Asgard\'s ending plays Kris\'s picked panels (%s)' % r, r == ['pn_end_cast_a', 'pn_end_bif_a', 'pn_end_home_b', 'pn_end_dawn_b'])
print('\n%d / %d passed' % (sum(res), len(res)))
