"""Round 72 — the latency deep dive (doc 33), part 3: what the wait at the start is made of — loading the page until the title, and New Game
until you stand in the village — as a CPU profile by function (self time). Run: python tests/probe_boot.py"""
import re, os, sys, collections
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from harness import PHASER, INDEX
def agg(prof, label, top=30):
    nodes = {n['id']: n for n in prof['nodes']}; dt = collections.Counter(); tot = 0
    for i, s in enumerate(prof.get('samples', [])):
        d = prof['timeDeltas'][i] / 1000 if i < len(prof['timeDeltas']) else 0; cf = nodes[s]['callFrame']
        name = cf['functionName'] or '(anonymous)'; url = cf.get('url', ''); where = 'phaser' if 'phaser' in url else ('game' if url else '')
        dt[name if name.startswith('(') else '%s [%s:%d]' % (name, where, cf.get('lineNumber', 0) + 1)] += d; tot += d
    print('\n==', label, 'profiled %.0f ms' % tot, flush=True)
    for k, v in dt.most_common(top): print('  %6.0f ms  %4.1f%%  %s' % (v, 100 * v / max(1, tot), k[:150]), flush=True)
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
    ctx = b.new_context(viewport={"width": 1280, "height": 800}); pg = ctx.new_page(); cdp = ctx.new_cdp_session(pg)
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    html = open(INDEX, encoding='utf-8').read(); root = os.path.dirname(os.path.abspath(INDEX))
    def _serve(r):
        u = r.request.url.split('zeldara.test/', 1)[1].split('?')[0]; f = os.path.join(root, u)
        if u.startswith('assets/'): return r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
        return r.fulfill(body=html, content_type="text/html")
    pg.route("http://zeldara.test/**", _serve)
    cdp.send("Profiler.enable"); cdp.send("Profiler.setSamplingInterval", {"interval": 1000}); cdp.send("Profiler.start")
    pg.goto("http://zeldara.test/index.html"); pg.wait_for_function("typeof game!=='undefined'&&game.scene&&game.scene.isActive('Title')", timeout=180000)
    agg(cdp.send("Profiler.stop")['profile'], 'page → title (%d ms)' % pg.evaluate("performance.now()"))
    pg.wait_for_timeout(1500); cdp.send("Profiler.start")
    pg.evaluate("(()=>{ try{ ZFT.on=false; ZLEAVE.on=false; }catch(e){} window.__ng=performance.now(); game.scene.getScene('Title').scene.start('Boot',{newGame:true}); })()")
    pg.wait_for_function("game.scene.isActive('World')&&!!game.scene.getScene('World').player", timeout=240000)
    agg(cdp.send("Profiler.stop")['profile'], 'New Game → the village (%d ms)' % pg.evaluate("performance.now()-__ng"))
    b.close()
