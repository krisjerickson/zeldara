"""Round 89b — the Lab's Sound effects: the new takes on top (79m), kept ones ★, 3–5 new ones each. Run: python tests/test_round89b.py"""
import os, re
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); PHASER = os.path.join(HERE, '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]), flush=True)
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader"]); pg = b.new_page(viewport={"width": 1400, "height": 900}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    html = open(os.path.join(HERE, '..', 'lab', 'index.html'), encoding='utf-8').read()
    pg.route("http://lab.test/**", lambda r: r.fulfill(body=html, content_type="text/html") if r.request.url.split('?')[0].endswith(('/', '.html')) else r.fulfill(status=404, body=''))
    pg.goto("http://lab.test/?tabs=all"); pg.wait_for_timeout(1500)
    pg.click('.lab-tab[data-tab="sfxpick"]'); pg.wait_for_timeout(1200)
    t = pg.evaluate("""(()=>{ var R=[...document.querySelectorAll('.s89-r')]; return {rows:R.length, first:R[0]&&R[0].dataset.id, firstNew:R[0]&&R[0].querySelectorAll('.s89-k.new').length,
      kept:R.filter(r=>r.querySelector('.s89-k.kept')).length, newTotal:document.querySelectorAll('.s89-k.new').length, keptOn:document.querySelectorAll('.s89-k.kept .s89-v[aria-pressed="true"]').length,
      oldTable:!!document.querySelector('.sfp-t:not(.s89-t)'), top:document.querySelector('.s89-t').getBoundingClientRect().top<document.querySelector('.sfp-t:not(.s89-t)').getBoundingClientRect().top}; })()""")
    check('Sound effects: 105 effects on top (the unpicked first, five new takes), 389 new takes, kept ones shown ★, the old table below (%s)' % t, t['rows'] == 105 and t['firstNew'] == 5 and t['newTotal'] == 389 and t['keptOn'] >= 100 and t['oldTable'] and t['top'], t)
    pg.evaluate("ZSFX84.items[document.querySelector('.s89-r').dataset.id]=Object.assign(ZSFX84.items[document.querySelector('.s89-r').dataset.id]||{},{v1:[0,1]})")
    k = pg.evaluate("""(()=>{ var r=document.querySelector('.s89-r'+'[data-id="sfx_sk_sprint"]')||[...document.querySelectorAll('.s89-r')].find(r=>r.querySelector('.s89-k.kept')); var id=r.dataset.id; var b=r.querySelector('.s89-k.kept .s89-v'); b.click(); return [id, (LabApp.picks['sfx89-'+id]||{}).verdict]; })()""")
    check('A click on a kept ★ drops it and saves the new pick list (%s)' % k, k[1] is not None, k)
    check('No Lab script errors', not errs, errs[:3])
print('%d / %d passed' % (sum(res), len(res)))
