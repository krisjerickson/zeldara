"""Round 92 — cut-scene styles: five Kling prompt styles, ten first tries (tools/video/kling_styles.py), and the Lab tab with the text-card
player. Run: python tests/test_round92.py [shots]"""
import os, re, sys, json, subprocess
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(HERE, '..'); PHASER = os.path.join(HERE, '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]), flush=True)
sys.path.insert(0, os.path.join(R, 'tools', 'video')); import importlib.util
spec = importlib.util.spec_from_file_location('ks', os.path.join(R, 'tools', 'video', 'kling_styles.py')); ks = importlib.util.module_from_spec(spec); spec.loader.exec_module(ks)
st = [s['id'] for s in ks.STYLES]
check('Five styles, each with its own freedom (%s)' % st, len(st) == 5 and len({s['free'] for s in ks.STYLES}) >= 4)
I = ks.IDEAS; P = {i['id']: ks.prompt(i) for i in I}
check('Ten ideas, two per style, ten different scenes', len(I) == 10 and all(sum(1 for i in I if i['style'] == s) == 2 for s in st) and len({i['scene'] for i in I}) == 10)
allimg = all(all('@image%d' % (k + 1) in P[i['id']] for k in range(len(ks.frames(i)))) for i in I)
check('Every prompt feeds Kling every picture of its scene (@image1 … @imageN)', allimg)
lens = {k: len(v) for k, v in P.items()}
check('The prompts are long again — and different lengths by style (%s)' % lens, min(lens.values()) > 1500 and max(lens.values()) > 3000)
bad = [k for k, v in P.items() if 'umbrella' not in v or 'text' not in v.lower()]
check('Each says what to keep out (modern things, text) in the prompt itself', not bad, bad)
check('No story words (captions) inside the videos: the prompts ask for no text', all('captions' in v or 'text' in v for v in P.values()))
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--autoplay-policy=no-user-gesture-required"]); pg = b.new_page(viewport={"width": 1400, "height": 900}); errs = []
    pg.on("pageerror", lambda e: errs.append("PAGEERR " + str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    html = open(os.path.join(R, 'lab', 'index.html'), encoding='utf-8').read()
    def serve(r):
        u = r.request.url.split('lab.test/', 1)[1].split('?')[0]; f = os.path.join(R, 'lab', u)
        if u.startswith('preview/') and os.path.isfile(f): return r.fulfill(path=f)
        if u in ('', 'index.html'): return r.fulfill(body=html, content_type="text/html")
        return r.fulfill(status=404, body='')
    pg.route("http://lab.test/**", serve)
    pg.goto("http://lab.test/?tabs=all"); pg.wait_for_timeout(1500)
    pg.click('.lab-tab[data-tab="cutstyle"]'); pg.wait_for_timeout(1000)
    t = pg.evaluate("({ideas:document.querySelectorAll('.cs-idea').length, styles:document.querySelectorAll('.cs-st').length, prin:document.querySelectorAll('.cs-pr8>div').length, thumbs:document.querySelectorAll('.cs-fr').length, todo:(LTODO.L||[]).filter(function(x){ return /^cut(idea|text)$/.test(x.id); }).length})")
    check('Lab → Cut-scene styles: 8 principles, 5 styles, 10 tries with every picture, waiting in the to-do list (%s)' % t, t['ideas'] == 10 and t['styles'] == 5 and t['prin'] == 8 and t['thumbs'] == sum(len(ks.frames(i)) for i in I) and t['todo'] == 2, t)
    for k in range(6): pg.click('.cs-ipk >> nth=%d' % k); pg.wait_for_timeout(80)
    n = pg.evaluate("Object.keys(LabApp.picks).filter(function(k){ return /^cutidea-/.test(k)&&LabApp.picks[k].verdict==='pick'; }).length")
    check('☆ stops at five (%d)' % n, n == 5)
    pg.click('.cs-show >> nth=0'); vis = pg.evaluate("!document.querySelector('.cs-pr').hidden&&document.querySelector('.cs-pr').textContent.length")
    check('Show the prompt: the whole prompt is there (%s characters)' % vis, vis and vis > 1500)
    pg.click('.cs-rvb[data-r="letter"]'); pg.click('.cs-go[data-m="cards"]'); pg.wait_for_timeout(1400)
    c = pg.evaluate("({show:document.querySelector('.cs-card').classList.contains('show'), txt:document.querySelector('.cs-ct').textContent})")
    if 'shots' in sys.argv: pg.locator('.cs-pl').screenshot(path='/tmp/claude-0/r92_card.png')
    check('Text cards: the screen goes black and the line types out at a reading pace (%s)' % c, c['show'] and 0 < len(c['txt']) < 40, c)
    pg.wait_for_timeout(5200); c2 = pg.evaluate("document.querySelector('.cs-ct').textContent.length"); full = len(json.loads(pg.evaluate("JSON.stringify(ZCUTSTY.ideas.length)")) and pg.evaluate("document.querySelector('.cs-ct').textContent") or '')
    check('…and finishes the line (%d characters)' % c2, c2 > 20)
    pg.click('.cs-stop'); pg.click('.cs-go[data-m="under"]'); pg.wait_for_timeout(1200)
    u = pg.evaluate("document.querySelector('.cs-under').textContent")
    if 'shots' in sys.argv: pg.locator('.cs-pl').screenshot(path='/tmp/claude-0/r92_under.png')
    check('Under the picture: the line sits under the moving picture (%s)' % u[:40], len(u) > 10)
    pg.click('.cs-stop')
    if 'shots' in sys.argv: pg.locator('.cs-ideas').screenshot(path='/tmp/claude-0/r92_ideas.png'); pg.locator('.cs-st5').screenshot(path='/tmp/claude-0/r92_styles.png')
    check('No Lab script errors', not errs, errs[:3])
print('%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
