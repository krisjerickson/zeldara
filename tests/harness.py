"""Headless test harness for Zeldara (Playwright + Chromium).

Setup once:  pip install playwright && playwright install chromium
             cd tests && mkdir .phaser && cd .phaser && npm pack phaser@3.60.0 && tar xzf phaser-3.60.0.tgz
Run:         python tests/test_phase1_core.py   (from the repo root, after node build.mjs)
"""
import re, contextlib, os
from playwright.sync_api import sync_playwright

import os
HERE = os.path.dirname(os.path.abspath(__file__))
# Phaser 3.60 UMD build (npm pack phaser@3.60.0) — served in place of the cdnjs URL
# Engine switch: ZELDARA_ENGINE=4 runs the suites on Phaser 4 (npm pack phaser@4.2.1 into tests/.phaser4)
ENGINE = os.environ.get('ZELDARA_ENGINE', '3')
PHASER = os.environ.get('PHASER_JS', os.path.join(HERE, '.phaser4' if ENGINE == '4' else '.phaser', 'package', 'dist', 'phaser.min.js'))
INDEX = os.environ.get('ZELDARA_INDEX', os.path.join(HERE, '..', 'index.html'))

class G:
    def __init__(self, page, errs):
        self.page, self.errs = page, errs
    def js(self, expr, arg=None):
        return self.page.evaluate(expr, arg) if arg is not None else self.page.evaluate(expr)
    def wait(self, ms): self.page.wait_for_timeout(ms)
    def key(self, k, hold=60):
        self.page.keyboard.down(k); self.wait(hold); self.page.keyboard.up(k)
    def hold(self, k, ms): self.key(k, ms)
    def shot(self, path): self.page.screenshot(path=path)
    def ws(self, expr):  # evaluate with ws = World scene
        return self.js(f"(()=>{{var ws=game.scene.getScene('World');var ps=ws.playerState;return ({expr});}})()")
    def active(self):
        return self.js("game.scene.getScenes(true).map(s=>s.sys.settings.key)")

@contextlib.contextmanager
def game(new=True, w=1280, h=800, save=None):
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
        pg = b.new_page(viewport={"width": w, "height": h})
        errs = []
        pg.on("pageerror", lambda e: errs.append("PAGEERR " + str(e) + ((" @ " + " < ".join(l.strip()[3:60] for l in (getattr(e,"stack","") or "").split("\n")[1:5])) if (getattr(e,"stack","") or "").count("\n") else "")))
        pg.on("console", lambda m: errs.append("console.error: " + m.text) if m.type == "error" else None)
        pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
        html = open(INDEX, encoding='utf-8').read()
        pg.route("http://zeldara.test/**", lambda r: r.fulfill(body=html, content_type="text/html"))
        pg.goto("http://zeldara.test/index.html")
        if save is not None:
            pg.evaluate("s=>localStorage.setItem('qoz_v2',s)", save)
            pg.reload()
            pg.wait_for_timeout(800)
            # the title moves an old single save into "Player 1", slot 1 (04d-profiles.js) — play that slot
            pg.evaluate("(()=>{ if(typeof ZSave==='undefined')return; ZSave.migrateLegacy(); var p=ZSave.players()[0]; if(p)ZSave.choose(p.id,1); })()")
        pg.wait_for_timeout(1500)
        pg.evaluate("game.loop.smoothStep=false")  # headless runs at low FPS; use real elapsed time
        g = G(pg, errs)
        if new is not None:
            if new:
                g.js("game.scene.getScene('Title').scene.start('Boot',{newGame:true})")
            else:
                g.js("game.scene.getScene('Title').scene.start('Boot',{newGame:false})")
            for _ in range(40):
                g.wait(250)
                if g.js("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): break
            g.wait(500)
        try:
            yield g
        finally:
            b.close()
