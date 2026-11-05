"""Round 90 — the bosses' area attacks, painted: the request (07zt9 ZBFX_ART, wave 93) and the Lab tab to review them. Run: python tests/test_round90.py"""
import os, re, sys, json
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(HERE, '..'); PHASER = os.path.join(HERE, '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]), flush=True)
S = [q for q in json.load(open(os.path.join(R, 'sprites', 'requests', 'scenery.json'), encoding='utf-8'))['requests'] if q['id'].startswith('sc_bfx')]
ids = [it['id'] for q in S for it in q['items']]
check('The request: 12 sheets, 70 pieces, every family has its seven (%d sheets, %d pieces)' % (len(S), len(ids)), len(S) == 12 and len(ids) == 70 and len(set(ids)) == 70 and all(any(i == 'bfx_%s_%s' % (f, r) for i in ids) for f in ('ember', 'stone', 'storm', 'bog', 'frost', 'void', 'iron', 'light', 'surt', 'sol') for r in ('mark', 'impact', 'patch', 'band', 'beam', 'ring', 'strike')), ids[:8])
check('Painted, not pixel art; no valknut; Surtharn and Solmyrk have their own', all('No pixel art' in q['body'] and 'valknut' not in q['body'].lower() for q in S) and any('Muspelheim' in q['body'] for q in S) and any('black sun' in q['body'] for q in S))
L = [l.strip() for l in open(os.path.join(R, 'sprites', 'requests', 'bossfx.txt')) if l.strip() and not l.startswith('#')]
check('The list for redo.ps1 names all 12 sheets', sorted(L) == sorted(q['id'] for q in S), L)
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(viewport={"width": 1400, "height": 900}); errs = []
    pg.on("pageerror", lambda e: errs.append("PAGEERR " + str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    html = open(os.path.join(R, 'lab', 'index.html'), encoding='utf-8').read()
    pg.route("http://lab.test/**", lambda r: r.fulfill(body=html, content_type="text/html") if r.request.url.split('?')[0].endswith(('/', '.html')) else r.fulfill(status=404, body=''))
    pg.goto("http://lab.test/?tabs=all"); pg.wait_for_timeout(1500)
    pg.click('.lab-tab[data-tab="bossfx"]'); pg.wait_for_timeout(1200)
    t = pg.evaluate("({cards:document.querySelectorAll('canvas.br-cv[data-tab=\"bossfx\"]').length, txt:document.querySelector('.br-grid').textContent.slice(0,300), todo:(LTODO.L||[]).some(function(x){ return x.id==='bossfx'; })})")
    check('Lab → Painted boss attacks: a card per family with its pieces, and it waits in "Waiting for your picks" (%s)' % t['cards'], t['cards'] == 10 and 'Used by' in t['txt'] and t['todo'], t)
    check('No Lab script errors', not errs, errs[:3])
print('%d / %d passed' % (sum(res), len(res)))
