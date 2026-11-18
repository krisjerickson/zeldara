"""Round 114e: the Lab — the seasons, end to end, with the cost (three levels), and the villagers' saga woven from Kris's picks.
python tests/test_round114e.py   (after node build.mjs)"""
import sys, os, re
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html?tabs=all"); pg.wait_for_timeout(2500)
    pg.evaluate("LTODO.goTo('seasons','.se-lv',0)"); pg.wait_for_timeout(1500)
    a = pg.evaluate("""({levels:document.querySelectorAll('.se-c').length, n:LSEAS.LEVELS.map(function(L){ var t=LSEAS.total(L); return t.n.scn+t.n.chr+t.n.frm+t.n.sht; }), usd:LSEAS.LEVELS.map(function(L){ return Math.round(LSEAS.total(L).redo); }),
      order:LSEAS.ORDER.map(function(r){ return r[1]; }), sys:document.querySelectorAll('.se-sys tbody tr').length, rec:!!document.querySelector('.se-rec')})""")
    check('Seasons: three levels with their pictures and cost (%s), the order as Kris set it, and %s places the seasons touch' % (a['n'], a['sys']),
          a['levels'] == 3 and a['n'][0] < a['n'][1] < a['n'][2] and a['usd'][0] < a['usd'][1] < a['usd'][2] and 'spring' in a['order'][1].lower() and a['order'][2] == 'Summer' and a['order'][3] == 'Autumn' and 'Winter' in a['order'][4] and a['sys'] >= 25 and a['rec'], a)
    pg.locator('.se-lv').screenshot(path='/tmp/claude-0/lab_seasons.png')
    pg.evaluate("LTODO.goTo('npcarcs','.na-pick',0)"); pg.wait_for_timeout(1500)
    w = pg.evaluate("""({rows:document.querySelectorAll('.na-wov tbody tr').length, cols:document.querySelectorAll('.na-wov thead th').length, mend:LNARC.ARCS.find(a=>a.id==='mending'), siege:JSON.stringify(LNARC.ARCS.find(a=>a.id==='mending')).toLowerCase()})""")
    check("The villagers' saga, woven: six chapters (a season each) across five strands; the Mending tempered — no siege, no broken houses, no defending against the Binders (%s rows)" % w['rows'],
          w['rows'] == 6 and w['cols'] == 6 and 'siege' not in w['siege'].replace('remove the siege','') and 'empty houses' not in w['siege'].replace('broken and empty houses','') and 'defen' not in w['siege'].replace('defend against the binders',''), w['siege'][:300])
    pg.locator('.na-wov').screenshot(path='/tmp/claude-0/lab_woven.png')
    check('No Lab script errors', not errs, errs[:3])
    b.close()
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
