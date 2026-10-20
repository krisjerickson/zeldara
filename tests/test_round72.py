"""Round 72 — the tagline (Kris's own) and Lab → The saga, end to end (ZSTORY, doc 31): 27 story elements, their ways (cut-scenes and hints)
and back-ups, the overview strip. Run: python tests/test_round72.py"""
import re, os, sys
from playwright.sync_api import sync_playwright
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:400] if info != '' else ''), flush=True)
with game(new=True) as g:
    g.wait(3000)
    r = g.js("({tag:ZBrand.TAGLINE.join(' '), beats:ZSTORY.BEATS.length, acts:ZSTORY.ACTS.length, ok:ZSTORY.BEATS.every(function(b){ return b.truth&&b.opts.length>=1&&b.bak.length>=1&&b.opts.concat(b.bak).every(function(o){ return ZSTORY.LOC[o.loc]&&/^(cut|hint)$/.test(o.kind); }); }), cuts:ZSTORY.BEATS.filter(function(b){ return b.opts.some(function(o){ return o.kind==='cut'; }); }).length})")
    check('Kris\'s tagline on the title page ("%s")' % r['tag'], r['tag'].startswith('Four realms, one broken land') and 'fragmented past' in r['tag'], r)
    check('The saga: %d elements in %d acts, each with a way to learn it and a back-up, every place on the map (%d with a cut-scene)' % (r['beats'], r['acts'], r['cuts']), r['beats'] == 27 and r['acts'] == 6 and r['ok'] and r['cuts'] >= 20, r)
    check('No game script errors', not [e for e in g.errs if 'favicon' not in e], g.errs[:3])
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        if os.path.isfile(f): r.fulfill(path=f)
        else: r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html"); pg.wait_for_timeout(2000)
    t = pg.evaluate("LTODO.open().map(function(o){ return o.id; }).concat(LTODO.RETIRED||[])")
    pg.evaluate("LTODO.goTo('storymap','.sm-grid',0)"); pg.wait_for_timeout(2500)
    n = pg.evaluate("({all:document.querySelectorAll('canvas.br-cv[data-tab=\"storymap\"]').length, ways:document.querySelectorAll('canvas.br-cv[data-id^=\"sm_o_\"]').length, baks:document.querySelectorAll('canvas.br-cv[data-id^=\"sm_b_\"]').length, truths:document.querySelectorAll('canvas.br-cv[data-id^=\"sm_t_\"]').length, secs:[...document.querySelectorAll('.sm-h')].map(function(h){ return h.textContent; })})")
    check('The tab: the overview, 27 truths, 60 ways and 35 back-ups in two sections (%s)' % n['secs'], n['truths'] == 27 and n['ways'] == 60 and n['baks'] == 35 and n['all'] == 123 and len(n['secs']) == 2 and 'storymap' in t, n)
    pg.evaluate("document.querySelector('canvas.br-cv[data-id=\"sm_overview\"]').scrollIntoView()"); pg.wait_for_timeout(1500)
    lit = pg.evaluate("(()=>{ var c=document.querySelector('canvas.br-cv[data-id=\"sm_overview\"]'), d=c.getContext('2d').getImageData(0,0,c.width,c.height).data, gold=0, teal=0; for(var i=0;i<d.length;i+=16){ if(d[i]>220&&d[i+1]>170&&d[i+2]<120)gold++; if(d[i]<140&&d[i+1]>200&&d[i+2]>220)teal++; } return [gold,teal]; })()")
    check('The overview strip shows the cut-scenes and hints lanes (%s)' % lit, lit[0] > 200 and lit[1] > 30, lit)
    rt = pg.evaluate("({L:LTODO.L.map(function(o){ return o.id; }), R:LTODO.RETIRED, n:(document.getElementById('lab-todo-btn')||{}).textContent||''})")
    check('"Waiting for your picks" lists only what is still open: the decisions made by the last revision are retired (%s)' % rt['n'].strip(), not any(r in rt['L'] for r in rt['R']) and 'storymap' in rt['L'] and len(rt['R']) >= 10, rt)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d / %d passed' % (sum(res), len(res)))
