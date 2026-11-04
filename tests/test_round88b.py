"""Round 88b — the music in the Lab (79k LABMU): the pieces in the game play at the top of Music & sound and on their cards. Run: python tests/test_round88b.py"""
import os, re, sys
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); PHASER = os.path.join(HERE, '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)), flush=True)
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
    pg = b.new_page(viewport={"width": 1400, "height": 900}); errs = []
    pg.on("pageerror", lambda e: errs.append("PAGEERR " + str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    html = open(os.path.join(HERE, '..', 'lab', 'index.html'), encoding='utf-8').read()
    pg.route("http://lab.test/**", lambda r: r.fulfill(body=html, content_type="text/html") if r.request.url.split('?')[0].endswith(('/', '.html')) else r.fulfill(status=404, body=''))
    pg.goto("http://lab.test/?tabs=all"); pg.wait_for_timeout(1500)
    n = pg.evaluate("Object.keys(LABMU.IN).length")
    pg.evaluate("LABMU.IN.mu_home=LABMU.IN.mu_home||[['mu_home',240],['mu_home.b',250]]")
    pg.click('.lab-tab[data-tab="audio"]'); pg.wait_for_timeout(900)
    r = pg.evaluate("""(()=>({top:document.querySelectorAll('.lmu-grid .lmu-c').length, players:document.querySelectorAll('.lmu-grid audio').length,
      card:document.querySelectorAll('.lmu-in audio').length, src:(document.querySelector('.lmu-grid audio')||{}).getAttribute&&document.querySelector('.lmu-grid audio').getAttribute('src'), left:(document.querySelector('.lmu-left')||{}).textContent||''}))()""")
    check('Music & sound: "Your music — in the game" with a player per take (%d pieces listed, %s)' % (n, r), r['top'] >= 1 and r['players'] >= 2 and r['card'] >= 2 and r['src'].startswith('preview/music/') and 'Still to make' in r['left'], r)
    check('No Lab script errors', not errs, errs[:3])
print('%d / %d passed' % (sum(res), len(res)))
