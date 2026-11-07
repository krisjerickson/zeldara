"""Round 89 — on a phone, tap an adventure site to go in (it said "Tab to enter" and a tap did nothing). Run: python tests/test_round89.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:400] if info != '' else ''), flush=True)
CLICK = """(function(wx,wy){ var s=ZCLICK.scene(), cam=s.cameras.main, cv=game.canvas, r=cv.getBoundingClientRect(); var sx=(wx-cam.worldView.x)*cam.zoom, sy=(wy-cam.worldView.y)*cam.zoom;
  var cx=r.left+sx*r.width/game.scale.width, cy=r.top+sy*r.height/game.scale.height; ['pointerdown','pointerup'].forEach(function(t){ cv.dispatchEvent(new PointerEvent(t,{clientX:cx,clientY:cy,bubbles:true,pointerType:'touch'})); }); return [Math.round(cx),Math.round(cy)]; })"""
for far in (False, True):
    with game(painted=False, w=844, h=390, query='?touch=1') as g:
        g.wait(3000)
        r = g.ws("""(()=>{ var St=ws.sites.find(x=>!x.boss&&/dungeon|tower/.test(x.type)&&ws.playerState.unlockedSections.indexOf(x.sec||x.section||1)>=0)||ws.sites.find(x=>/dungeon|tower/.test(x.type)); var c=ZCLICK.siteXY(St); window._site=[c.x,c.y,St.name||St.type];
          var dy=%s; ws.player.x=c.x; ws.player.y=c.y+dy; ws.player.cont.setPosition(ws.player.x,ws.player.y); return window._site; })()""" % ('TILE*6' if far else 'TILE*2'))
        g.wait(3000)
        lbl = g.js("(()=>{ var ws=game.scene.getScene('World'); var o=(ws.siteObjs||[]).find(o=>o.s===ws._nearSite); return o?o.lblEl.textContent:null; })()")
        if not far: check('Phone, standing at a site: its label says tap, not Tab (%s)' % lbl, lbl and 'Tab' not in lbl, lbl)
        g.js(CLICK + "(_site[0],_site[1])")
        k = None
        for _ in range(24):
            g.wait(500); k = g.js("(()=>{ return game.scene.getScenes(true).map(s=>s.sys.settings.key).filter(k=>k!=='World'&&k!=='UI').join(',')||'World'; })()")
            if k and k != 'World': break
        check('Phone: tap the site %s → %s' % ('from 6 tiles off (the hero walks there)' if far else 'beside you', 'goes in (%s, %s)' % (r[2], k)), k and k != 'World', [r, k])
print('%d / %d passed' % (sum(res), len(res)))
