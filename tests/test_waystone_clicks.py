"""Waystone travel with real mouse clicks (the travel map's list buttons and
map markers) and the sandbox 'Unlock All' activating every waystone."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
fails = []
def check(n, ok, info=''):
    print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else f'  -> {info}'), flush=True)
    if not ok: fails.append(n)
with game(new=True) as g:
    g.js("sbUnlockAll(); game.scene.getScene('World').playerState.gold=999;"); g.wait(500)
    r = g.ws("{act:(ps.activatedWaystones||[]).length, tot:ws.wd.waystones.length}")
    check('Sandbox Unlock All activates every waystone', r['act'] == r['tot'], r)
    g.js("(()=>{var ws=game.scene.getScene('World'),w=ws.wd.waystones.find(q=>q.id==='ws_village'); ws.player.x=w.x*TILE+16; ws.player.y=(w.y+1)*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y);})()")
    g.wait(300); g.key('Tab', 120); g.wait(600)
    r = g.js("({open:document.getElementById('modal-map').style.display, travel:WMAP.travel})")
    check('[Tab] at a waystone opens the travel map', r['open'] == 'flex' and r['travel'] == 'ws_village', r)
    # click a Wetlands waystone marker on the map canvas
    pos = g.js("""(()=>{ var ws=game.scene.getScene('World'), w=ws.wd.waystones.find(q=>q.region===2), cv=document.getElementById('minimap-canvas'), r=cv.getBoundingClientRect(), v=_wmView(); return {x:r.left+(w.x-v.x)/v.w*r.width, y:r.top+(w.y-v.y)/v.h*r.height}; })()""")
    g.page.mouse.click(pos['x'], pos['y']); g.wait(1800)
    r = g.ws("{sec:ws.currentSection(), gold:ps.gold, open:document.getElementById('modal-map').style.display}")
    check('Clicking a waystone marker on the map travels there (and charges the fare)', r['sec'] == 2 and r['gold'] < 999 and r['open'] == 'none', r)
    gold = r['gold']
    g.key('Tab', 120); g.wait(600)
    b = g.js("(()=>{ var b=document.querySelector('.wm-ws[data-ws=ws_village]'); b.scrollIntoView(); var r=b.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; })()")
    g.page.mouse.click(b['x'], b['y']); g.wait(1800)
    r = g.ws("{sec:ws.currentSection(), gold:ps.gold}")
    check('Clicking a waystone in the list travels there (village: free)', r['sec'] == 0 and r['gold'] == gold, r)
    g.key('b', 80); g.wait(500)
    z = g.js("(()=>{ var b=document.querySelector('.wmap-z[data-z=\"4\"]'), r=b.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; })()")
    g.page.mouse.click(z['x'], z['y']); g.wait(300)
    check('Map zoom buttons respond to clicks', g.js("WMAP.zoom") == 4, g.js("WMAP.zoom"))
    check('No JS errors', not g.errs, g.errs[:3])
print(f"\n{len(fails)} failed" if fails else "\nALL PASSED")
sys.exit(1 if fails else 0)
