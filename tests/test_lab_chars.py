"""Design Lab · Characters tab: all four groups render, sprites animate
(mounts with the hero riding), verdicts + notes persist in picks."""
import re, os, sys
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
PHASER = os.environ.get('PHASER_JS', os.path.join(HERE, '.phaser', 'package', 'dist', 'phaser.min.js'))
SHOTS = sys.argv[1] if len(sys.argv) > 1 else None
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)), flush=True)
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
    pg = b.new_page(viewport={"width": 1400, "height": 900}); errs = []
    pg.on("pageerror", lambda e: errs.append("PAGEERR " + str(e)))
    pg.on("console", lambda m: errs.append("console.error " + m.text) if m.type == "error" and 'Failed to load resource' not in m.text else None)
    pg.route(re.compile(r".*cdnjs.*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    html = open(os.path.join(HERE, '..', 'lab', 'index.html'), encoding='utf-8').read()
    pg.route("http://lab.test/**", lambda r: r.fulfill(body=html, content_type="text/html"))
    pg.goto("http://lab.test/"); pg.wait_for_timeout(1500)
    pg.click('.lab-tab[data-tab="characters"]'); pg.wait_for_timeout(900)
    counts = {}
    for cat, n in [('npc', 41), ('mount', 11), ('boss', 56)]:
        pg.click(f'.ch-cat[data-cat="{cat}"]'); pg.wait_for_timeout(700)
        counts[cat] = pg.evaluate("document.querySelectorAll('.ch-card').length")
        drawn = pg.evaluate("[...document.querySelectorAll('.ch-spr')].slice(0,6).filter(c=>{ var d=c.getContext('2d').getImageData(0,0,c.width,c.height).data; for(var i=3;i<d.length;i+=16)if(d[i])return true; return false; }).length")
        check(f'{cat}: {n} cards, sprites drawn', counts[cat] == n and drawn >= min(3, n), (counts[cat], drawn))
        if SHOTS: pg.screenshot(path=os.path.join(SHOTS, f'lab_chars_{cat}.png'))
    pg.click('.ch-cat[data-cat="mount"]'); pg.wait_for_timeout(500)
    pg.evaluate("document.querySelector('.ch-spr[data-cid=\"mt_boar\"]').scrollIntoView()"); pg.wait_for_timeout(600)
    rider = pg.evaluate("(()=>{ var c=document.querySelector('.ch-spr[data-cid=\"mt_boar\"]'); var d=c.getContext('2d').getImageData(120,0,72,128).data, n=0; for(var i=3;i<d.length;i+=4)if(d[i])n++; return n; })()")
    check('Mount cards show the hero riding', rider > 600, rider)
    pg.click('.ch-v[data-cid="mt_boar"][data-v="maybe"]'); pg.fill('.ch-notes[data-cid="mt_boar"]', 'bigger tusks'); pg.wait_for_timeout(1300)
    k = pg.evaluate("LabApp.picks['chars-mt_boar']")
    check('Verdict + notes are stored', k and k.get('verdict') == 'maybe' and k.get('notes') == 'bigger tusks', k)
    check('No JS errors', not errs, errs[:4])
    b.close()
print('%d/%d' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
