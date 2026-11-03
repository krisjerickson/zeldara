"""Round 86 — click (tap) to interact, and the phone layout (24v ZCLICK). Run: python tests/test_round86.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
CLICK = """(function(wx,wy){ var s=ZCLICK.scene(), cam=s.cameras.main, cv=game.canvas, r=cv.getBoundingClientRect(); var sx=(wx-cam.worldView.x)*cam.zoom, sy=(wy-cam.worldView.y)*cam.zoom;
  var cx=r.left+sx*r.width/game.scale.width, cy=r.top+sy*r.height/game.scale.height; ['pointerdown','pointerup'].forEach(function(t){ cv.dispatchEvent(new PointerEvent(t,{clientX:cx,clientY:cy,bubbles:true,pointerType:'mouse'})); }); return [Math.round(cx),Math.round(cy)]; })"""
with game(painted=False) as g:
    g.wait(2500)
    # a building door in the village: stand a few tiles away, click the door → walk there and go in
    r = g.ws("""(()=>{ var b=ws.buildings.find(x=>/shop|tavern|house/.test(x.type))||ws.buildings[0]; var dx=b.worldX+Math.floor(b.w/2)*TILE+TILE/2, dy=b.worldY+(b.h-1)*TILE+TILE/2; window._door=[dx,dy,b.type];
      ws.player.x=dx; ws.player.y=dy+TILE*4; ws.player.cont.setPosition(ws.player.x,ws.player.y); return window._door; })()""")
    g.wait(800)
    c = g.js(CLICK + "(_door[0],_door[1])")
    g.wait(400)
    w = g.js("(()=>({goal:!!ZCLICK.goal}))()")
    for _ in range(16):
        g.wait(500)
        k = g.js("(()=>{ var s=_activePlayScene(false); return s&&s.sys.settings.key; })()")
        if k == 'Building': break
    check('Click a door a few tiles off: the hero walks there and goes in (%s)' % r[2], k == 'Building', {'r': r, 'scene': k, 'w': w})
    g.js("(()=>{ var s=game.scene.getScene('Building'); if(s&&s._exitBuilding)s._exitBuilding(); })()"); g.wait(1500)
    # a click right next to a prompt acts at once
    r2 = g.ws("""(()=>{ var n=(ws._villageNPCs||[])[0]; if(!n)return null; ws.player.x=n.x; ws.player.y=n.y+TILE; ws.player.cont.setPosition(ws.player.x,ws.player.y); window._npc=[n.x,n.y]; return n.n; })()""")
    if r2:
        g.wait(900); k2 = g.js("(()=>{ var s=_activePlayScene(false); return [s.sys.settings.key, JSON.stringify(ZCLICK.prompt(s)), !!s._interactPrompt, s._interactPrompt&&s._interactPrompt.text]; })()"); g.js(CLICK + "(_npc[0],_npc[1])"); g.wait(900)
        d = g.js("(()=>({box:!!document.querySelector('#zdlg .zd-box'), notif:true}))()")
        check('Click a person beside you: they talk (%s)' % r2, d['box'], [d, k2])
        g.js("(()=>{ var b=document.querySelector('#zdlg'); if(b){ for(var i=0;i<6;i++)document.dispatchEvent(new KeyboardEvent('keydown',{key:' ',code:'Space',bubbles:true})); } })()"); g.wait(600)
with game(painted=False, w=812, h=375, query='?touch=1') as g:
    g.wait(3000)
    t = g.js("""(()=>{ var ws=game.scene.getScene('World'); return {mini:document.querySelectorAll('#ztouch .zt-mini .zt-sm').length, bar:getComputedStyle(document.getElementById('action-icon-bar')).display, zoom:ws.cameras.main.zoom}; })()""")
    check('Phone: five small round buttons for the slots, the key-labelled bar hidden, the view zoomed out by 18 %% (%s)' % t, t['mini'] == 5 and t['bar'] == 'none' and abs(t['zoom'] - 1.4 * 0.82) < 0.01, t)
    q = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.gold=999; ps.inventory=[]; window._buyItem('flask_smoke',25); var said=[], o=window.showNotif; window.showNotif=function(t){ said.push(t); return o.apply(this,arguments); }; window._said=said;
      var w=ZCLICK.word('[Tab] Talk to Bram')+' | '+ZCLICK.word('Stand at a waystone and press [Tab] to travel'); return {w:w}; })()""")
    g.js("ZTOUCH.tap('p')"); g.wait(700)
    q2 = g.js("({said:window._said, inv:game.scene.getScene('World').playerState.inventory})")
    check('A smoke pellet alone: tapping 🧪 throws it (no more "no potions")', not any('No potions' in x for x in q2['said']) and 'flask_smoke' not in q2['inv'], q2)
    check('On a phone, no "Tab": %s' % q['w'], 'Tab' not in q['w'] and 'Tap' in q['w'], q)
    g.js("document.getElementById('minimap-hud').click()"); g.wait(900)
    m = g.js("ZPAUSE.cur()")
    check('Tap the corner map: the map opens (%s)' % m, m == 'map', m)
    g.js("ZPAUSE.go('inventory')"); g.wait(900)
    iv = g.js("(()=>{ var r=document.querySelector('#modal-inventory .modal').getBoundingClientRect(); return {top:Math.round(r.top), bottom:Math.round(r.bottom), h:innerHeight}; })()")
    check('The inventory fits the phone screen, below the tabs (%s)' % iv, iv['top'] >= 30 and iv['bottom'] <= iv['h'] + 1, iv)
print('%d / %d passed' % (sum(res), len(res)))
