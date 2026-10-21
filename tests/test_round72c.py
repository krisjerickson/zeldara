"""Round 72c — Kris's answers L1 (doc 33): the start curtain (10c3-warm-start.js) — the first screen is fully ready before you see it, and
the first steps in any direction need no painting. Run: python tests/test_round72c.py"""
import os, sys, gzip, json, re, struct
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:400] if info != '' else ''), flush=True)
with game(new=None) as g:
    g.js("(()=>{ ZWARM.on=true; window.__seen=[]; setInterval(function(){ var ws=game.scene.getScene('World'); if(!ws||!ws.player)return; var el=document.getElementById('zwarm'); __seen.push([!!(el&&el.style.display!=='none'&&el.style.opacity!=='0'), !!ws._warm]); },100); game.scene.getScene('Title').scene.start('Boot',{newGame:true}); })()")
    g.page.wait_for_function("game.scene.isActive('World')&&game.scene.getScene('World').player", timeout=120000)
    g.page.wait_for_function("!!game.scene.getScene('World')._warmed", timeout=60000)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), R=ws._wr, cam=ws.cameras.main, cs=WCH*TILE, dw=cam.width/cam.zoom, dh=cam.height/cam.zoom, vx=cam.scrollX+(cam.width-dw)/2, vy=cam.scrollY+(cam.height-dh)/2, M=ZWARM.MARGIN, need=ws._wrNeeded().filter(function(n){ return n.vis||!((n.cx+1)*cs<vx-M||n.cx*cs>vx+dw+M||(n.cy+1)*cs<vy-M||n.cy*cs>vy+dh+M); }), miss=need.filter(function(n){ return !R.chunks.has(n.key); }).map(function(n){ return n.key; });
      return {warmed:ws._warmed, need:need.length, miss:miss, jobs:R.jobs.size, coverFirst:__seen.length&&__seen[0][0], uncoveredWhileWarm:__seen.filter(function(s){ return s[1]&&!s[0]; }).length}; })()""")
    check('New Game: a curtain covers the world until the first screen is ready (%s ms, %s)' % (r['warmed']['ms'], r['warmed']['why']), r['coverFirst'] and r['uncoveredWhileWarm'] == 0 and r['warmed']['why'] == 'ready', r)
    check('When it lifts, every chunk on screen and those within %d px of its edges are painted and mounted (%d)' % (360, r['need']), not r['miss'] and r['need'] >= 4, r)
    g.wait(600)
    # the first steps: no painting, no mounting
    g.js("""(()=>{ var ws=game.scene.getScene('World'); window.__p={c:0,m:0,cmax:0}; var uc=ws._updateChunks, wm=ws._wrMount; ws._updateChunks=function(){ var a=performance.now(), r=uc.apply(ws,arguments), d=performance.now()-a; __p.c+=d; if(d>__p.cmax)__p.cmax=d; return r; }; ws._wrMount=function(){ __p.m++; return wm.apply(ws,arguments); }; })()""")
    x0 = g.js("game.scene.getScene('World').player.x")
    for k in ('ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'): g.hold(k, 600)
    p = g.js("({p:__p, dx:Math.round(game.scene.getScene('World').player.x)})")
    check('The first steps in every direction need no new ground (%d chunks mounted, painting at most %.1f ms a frame)' % (p['p']['m'], p['p']['cmax']), p['p']['m'] == 0 and p['p']['cmax'] < 8, p)
    w = g.js("({used:!!ZWORLD.used, state:ZWORLD.state, why:ZWORLD.why})")
    check('New Game used the baked world (assets/world/world.bin.gz) instead of generating it (%s)' % w, w['used'], w)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No game script errors', not errs, errs[:4])
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
raw = gzip.decompress(open(os.path.join(R, 'assets', 'world', 'world.bin.gz'), 'rb').read()); n = struct.unpack('<I', raw[:4])[0]; fh = json.loads(raw[4:4 + n])['hash']
ih = re.search(r'ZWORLD_HASH="([0-9a-f]+)"', open(os.path.join(R, 'index.html'), encoding='utf-8').read()).group(1)
check('The baked world is current for this build (file %s, build %s) — if not, run python tests/bake_world.py' % (fh, ih), fh == ih)
print('\n%d / %d passed' % (sum(res), len(res)))
