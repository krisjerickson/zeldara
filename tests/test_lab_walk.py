"""Design Lab smoke test: every design builds, all walkable area reachable, the walk scene runs and the hero moves.
Run from repo root after `node build.mjs`: python tests/test_lab_walk.py"""
import re, sys, json
from playwright.sync_api import sync_playwright
HERE = __import__('os').path.dirname(__import__('os').path.abspath(__file__))
SHOTS = __import__('os').path.join(HERE, '.labshots')
import os; os.makedirs(SHOTS, exist_ok=True)
only = sys.argv[1:]  # optional list of tab:index to screenshot
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
    pg = b.new_page(viewport={"width": 1400, "height": 860})
    errs = []
    pg.on("pageerror", lambda e: errs.append("PAGEERR " + str(e)))
    pg.on("console", lambda m: errs.append("console.error " + m.text) if m.type == "error" and "Failed to load resource" not in m.text else None)
    pg.route(re.compile(r".*cdnjs.*phaser.*"), lambda r: r.fulfill(path=__import__('os').environ.get('PHASER_JS', __import__('os').path.join(HERE, '.phaser', 'package', 'dist', 'phaser.min.js')), content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    html = open(__import__('os').path.join(HERE, '..', 'lab', 'index.html'), encoding='utf-8').read()
    pg.route("http://lab.test/**", lambda r: r.fulfill(body=html, content_type="text/html"))
    pg.goto("http://lab.test/"); pg.wait_for_timeout(2500)
    pg.screenshot(path=SHOTS + '/grid-towers.png')
    # connectivity audit
    audit = pg.evaluate("""(()=>{ var out=[]; LAB_TABS.forEach(function(t){ t.designs.forEach(function(d){ if(typeof d.build!=='function')return;
        var m=d.build(d.seed||7); var sx=Math.floor(m.spawn.x/LT), sy=Math.floor(m.spawn.y/LT);
        var seen=floodReach(m,sx,sy), open=0, reach=0; for(var k=0;k<m.w*m.h;k++){ if(!m.solid[k]){open++; if(seen[k])reach++;} }
        out.push([t.id,d.id,open,reach,m.sprites.length,m.lights.length,!mapSolid(m,sx,sy)]); }); }); return out; })()""")
    for row in audit:
        flag = '' if row[2] == row[3] and row[6] else '   <-- UNREACHABLE AREA / BAD SPAWN'
        print(row, flag)
    pg.click('.lab-tab[data-tab="dungeons"]'); pg.wait_for_timeout(2500)
    pg.screenshot(path=SHOTS + '/grid-dungeons.png')
    for tab in ['towers', 'dungeons']:
        n = pg.evaluate(f"LAB_TABS.find(t=>t.id==='{tab}').designs.length")
        pg.click(f'.lab-tab[data-tab="{tab}"]'); pg.wait_for_timeout(600)
        for i in range(n):
            key = f'{tab}:{i}'
            pg.evaluate(f"LabApp.open({i})"); pg.wait_for_timeout(2200)
            active = pg.evaluate("LabApp.game&&LabApp.game.scene.isActive('LabWalk')")
            x0 = pg.evaluate("LabApp.game.scene.getScene('LabWalk').hero.y")
            pg.keyboard.down('w'); pg.wait_for_timeout(700); pg.keyboard.up('w')
            y1 = pg.evaluate("LabApp.game.scene.getScene('LabWalk').hero.y")
            print(key, 'active', active, 'moved', round(x0 - y1, 1))
            if not only or key in only:
                pg.screenshot(path=f'{SHOTS}/{tab}-{i+1}.png')
        pg.evaluate("LabApp.close()"); pg.wait_for_timeout(400)
    print('ERRORS', errs[:8])
    b.close()
