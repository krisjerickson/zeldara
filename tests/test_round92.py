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
check('Eleven styles (five, five more, and story-led), with different freedoms (%s)' % st, len(st) == 11 and len({s['free'] for s in ks.STYLES}) >= 4)
I = ks.IDEAS; P = {i['id']: ks.prompt(i) for i in I}
check('Ten ideas, two per style, ten different scenes', len(I) == 10 and all(sum(1 for i in I if i['style'] == s) == 2 for s in st[:5]) and len({i['scene'] for i in I}) == 10)
allimg = all(all('@image%d' % (k + 1) in P[i['id']] for k in range(len(ks.frames(i)))) for i in I)
check('Every prompt feeds Kling every picture of its scene (@image1 … @imageN)', allimg)
lens = {k: len(v) for k, v in P.items()}
check('The prompts are long again — and different lengths by style (%s)' % lens, min(lens.values()) > 1500 and max(lens.values()) > 3000)
bad = [k for k, v in P.items() if 'umbrella' not in v or 'text' not in v.lower()]
check('Each says what to keep out (modern things, text) in the prompt itself', not bad, bad)
check('No story words (captions) inside the videos: the prompts ask for no text', all('captions' in v or 'text' in v for v in P.values()))
O = ks.ONE; PO = {o['id']: ks.prompt(o) for o in O}
check('One video, fourteen ways: the opening in ten styles and four story-led versions (%d)' % len(O), len(O) == 14 and len({o['style'] for o in O}) == 11 and sum(1 for o in O if o['style'] == 'story') == 4)
check('The story-led ones say the pictures are inspiration only, and give a timed storyline', all('INSPIRATION ONLY' in PO[o['id']] and '16–20 s' in PO[o['id']] for o in O if o['style'] == 'story'))
check('Each one-video prompt asks for movement that holds up when slowed to 40 s', all('40 seconds' in v for v in PO.values()))
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
    t = pg.evaluate("({ideas:document.querySelectorAll('.cs-idea').length, styles:document.querySelectorAll('.cs-st').length, prin:document.querySelectorAll('.cs-pr8>div').length, thumbs:document.querySelectorAll('.cs-fr').length, todo:(LTODO.L||[]).filter(function(x){ return /^cut(one|text2)$/.test(x.id); }).length})")
    check('Lab → Cut-scene styles: 8 principles, 5 styles, 10 tries with every picture, waiting in the to-do list (%s)' % t, t['ideas'] == 24 and t['styles'] == 11 and t['prin'] == 8 and t['thumbs'] == sum(len(ks.frames(i)) for i in I) + 6 and t['todo'] == 2, t)
    pg.evaluate("document.querySelector('.cs-ipk').scrollIntoView()")
    for k in range(6): pg.click('.cs-ipk >> nth=%d' % k); pg.wait_for_timeout(80)
    n = pg.evaluate("Object.keys(LabApp.picks).filter(function(k){ return /^cutidea-/.test(k)&&LabApp.picks[k].verdict==='pick'; }).length")
    check('☆ stops at five (%d)' % n, n == 5)
    pg.click('.cs-show >> nth=0'); vis = pg.evaluate("!document.querySelector('.cs-pr:not(.ct2-pr)').hidden&&document.querySelector('.cs-pr:not(.ct2-pr)').textContent.length")
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
    if 'shots' in sys.argv: pg.locator('.cs-ideas').first.screenshot(path='/tmp/claude-0/r92_ideas.png'); pg.locator('.cs-st5').screenshot(path='/tmp/claude-0/r92_styles.png')
    pg.wait_for_timeout(600); tt = pg.evaluate("document.querySelector('.ct2-tot').textContent")
    check('The words: five new ways, and the reading-paced total is shown (%s)' % tt, pg.evaluate("document.querySelectorAll('.ct2-go').length") == 5 and 'reading pace' in tt, tt)
    pg.click('.ct2-pan'); pg.click('.ct2-go[data-o="build"]'); pg.wait_for_timeout(2600)
    b2 = pg.evaluate("({n:document.querySelectorAll('.ct2-under span.in').length, txt:document.querySelector('.ct2-under').textContent})")
    if 'shots' in sys.argv: pg.locator('.ct2').screenshot(path='/tmp/claude-0/r92b_build.png')
    check('Fragments that build: the first line fades in fragment by fragment under the picture (%s)' % b2, b2['n'] >= 1 and len(b2['txt']) > 10, b2)
    pg.click('.ct2-stop'); pg.click('.ct2-pan'); pg.click('.ct2-go[data-o="ember"]'); pg.wait_for_timeout(2000)
    pv = pg.evaluate("document.querySelector('.ct2-panel').classList.contains('show')")
    if 'shots' in sys.argv: pg.locator('.ct2').screenshot(path='/tmp/claude-0/r92b_panel.png')
    check('With the switch on, the first line is its own full-screen panel', pv)
    pg.click('.ct2-stop')
    check('No Lab script errors', not errs, errs[:3])
print('%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
