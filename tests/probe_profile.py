"""Round 72 — the latency deep dive (doc 33): a CPU profile of the main thread while the hero walks, so every millisecond is placed —
the game's code, Phaser, the garbage collector, the painting of the page and the waits on the graphics chip.
Run: python tests/probe_profile.py [phone]   (phone: 844×390 at 3× pixels, the CPU slowed 4×)"""
import re, os, sys, json, collections
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from harness import PHASER, INDEX
PHONE = len(sys.argv) > 1 and sys.argv[1] == 'phone'
def agg(prof, label, top=28):
    nodes = {n['id']: n for n in prof['nodes']}; dt = collections.Counter(); tot = 0
    samples, deltas = prof.get('samples', []), prof.get('timeDeltas', [])
    for i, s in enumerate(samples):
        d = deltas[i] / 1000 if i < len(deltas) else 0; n = nodes[s]; cf = n['callFrame']
        name = cf['functionName'] or '(anonymous)'; url = cf.get('url', '')
        where = 'phaser' if 'phaser' in url else ('game' if url else '')
        key = name if name.startswith('(') else '%s [%s:%d]' % (name, where, cf.get('lineNumber', 0) + 1)
        dt[key] += d; tot += d
    print('\n==', label, 'profiled %.0f ms' % tot, flush=True)
    for k, v in dt.most_common(top): print('  %6.0f ms  %4.1f%%  %s' % (v, 100 * v / max(1, tot), k[:150]), flush=True)
    # by kind
    kinds = collections.Counter()
    for k, v in dt.items():
        kk = '(idle)' if k.startswith('(idle') else '(garbage collector)' if 'garbage' in k else '(program: browser work — style, layout, paint, GPU waits)' if k.startswith('(program') else '(root)' if k.startswith('(root') else 'Phaser' if '[phaser' in k else 'game code' if '[game' in k else 'other'
        kinds[kk] += v
    print('  by kind:', {k: '%.0f%%' % (100 * v / max(1, tot)) for k, v in kinds.most_common()}, flush=True)
    return dt, tot
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
    ctx = b.new_context(viewport={"width": 844, "height": 390} if PHONE else {"width": 1280, "height": 800}, device_scale_factor=3 if PHONE else 1, is_mobile=PHONE, has_touch=PHONE)
    pg = ctx.new_page(); cdp = ctx.new_cdp_session(pg)
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    html = open(INDEX, encoding='utf-8').read(); root = os.path.dirname(os.path.abspath(INDEX))
    def _serve(r):
        u = r.request.url.split('zeldara.test/', 1)[1].split('?')[0]; f = os.path.join(root, u)
        if u.startswith('assets/'): return r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
        return r.fulfill(body=html, content_type="text/html")
    pg.route("http://zeldara.test/**", _serve)
    if PHONE: cdp.send("Emulation.setCPUThrottlingRate", {"rate": 4})
    pg.goto("http://zeldara.test/index.html"); pg.wait_for_function("typeof game!=='undefined'&&game.scene&&game.scene.isActive('Title')", timeout=180000)
    pg.evaluate("(()=>{ try{ ZFT.on=false; ZLEAVE.on=false; ZDeath.auto=true; }catch(e){} game.scene.getScene('Title').scene.start('Boot',{newGame:true}); })()")
    pg.wait_for_function("game.scene.isActive('World')&&!!game.scene.getScene('World').player", timeout=240000); pg.wait_for_timeout(4000)
    cdp.send("Profiler.enable"); cdp.send("Profiler.setSamplingInterval", {"interval": 500})
    def run(label, setup=None, keys=('ArrowRight', 'ArrowLeft'), ms=3000):
        if setup: pg.evaluate(setup); pg.wait_for_timeout(4000)
        cdp.send("Profiler.start")
        for k in keys: pg.keyboard.down(k); pg.wait_for_timeout(ms); pg.keyboard.up(k)
        prof = cdp.send("Profiler.stop")['profile']; return agg(prof, label)
    run('village, walking')
    run('Grasslands, walking', "(()=>{ var ws=game.scene.getScene('World'), w=ws.wd.waystones.find(function(q){ return q.region===1; }); ws.player.x=w.x*TILE+16; ws.player.y=(w.y+2)*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y); })()")
    run('Grasslands, standing still', None, keys=('Shift',), ms=4000)
    b.close()
