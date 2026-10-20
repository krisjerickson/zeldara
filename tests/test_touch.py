"""Round 72 — touch controls (24t-touch.js): a thumbstick on the left, buttons on the right, ≡ More for the rest; each presses the key the
game knows. Driven here with the mouse (the controls use pointer events). Run: python tests/test_touch.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:400] if info != '' else ''), flush=True)
with game(new=True, w=844, h=390, query='?touch=1') as g:
    g.wait(4500)
    p = g.page
    a = g.js("""(()=>{ var el=document.getElementById('ztouch'); if(typeof ZFT!=='undefined')ZFT.on=false; var ws=game.scene.getScene('World'); ws.playerState.godMode=true; return {on:!!(el&&el.classList.contains('on')), btns:el?el.querySelectorAll('.zt-b').length:0, hint:getComputedStyle(document.getElementById('ctrl-hint')||document.body).display}; })()""")
    check('On a phone-sized screen the touch controls show while you play: a stick and %d buttons; the key hints are hidden' % a['btns'], a['on'] and a['btns'] == 8 and a['hint'] == 'none', a)
    x0 = g.js("game.scene.getScene('World').player.x")
    p.mouse.move(150, 260); p.mouse.down(); p.mouse.move(175, 260, steps=3); p.mouse.move(200, 262, steps=3); g.wait(1500)
    held = g.js("({d:ZTOUCH.held.d, w:ZTOUCH.held.w, base:document.querySelector('.zt-base').classList.contains('on')})")
    p.mouse.up(); g.wait(300)
    x1 = g.js("game.scene.getScene('World').player.x")
    rel = g.js("({d:ZTOUCH.held.d, base:document.querySelector('.zt-base').classList.contains('on')})")
    check('Drag the stick right: the hero walks right (%d → %d px), and stops when you let go' % (x0, x1), held['d'] == 1 and not held['w'] and held['base'] and x1 - x0 > 40 and not rel['d'] and not rel['base'], (held, rel))
    s0 = g.js("game.scene.getScene('World').keys.SPACE.timeDown")
    b = p.locator('.zt-atk').bounding_box(); p.mouse.click(b['x'] + b['width'] / 2, b['y'] + b['height'] / 2); g.wait(400)
    s1 = g.js("game.scene.getScene('World').keys.SPACE.timeDown")
    check('⚔ presses Space for the game (the attack)', s1 > s0, (s0, s1))
    b = p.locator('.zt-more').bounding_box(); p.mouse.click(b['x'] + b['width'] / 2, b['y'] + b['height'] / 2); g.wait(300)
    menu = g.js("document.querySelector('.zt-menu').classList.contains('on')")
    b = p.locator('.zt-m[data-k="i"]').bounding_box(); p.mouse.click(b['x'] + b['width'] / 2, b['y'] + b['height'] / 2); g.wait(900)
    o = g.js("({ov:_openOverlays(), shown:ZTOUCH.shown})")
    check('≡ More → Inventory opens the inventory, and the controls step aside (%s)' % o['ov'], menu and len(o['ov']) > 0 and not o['shown'], o)
    g.js("(()=>{ var k=new KeyboardEvent('keydown',{key:'Escape',bubbles:true}); Object.defineProperty(k,'keyCode',{get:function(){return 27;}}); document.dispatchEvent(k); })()"); g.wait(400)
    if g.js("_openOverlays().length"): g.js("ZTOUCH.tap('i')"); g.wait(600)
    g.wait(800); back = g.js("({ov:_openOverlays(), shown:ZTOUCH.shown, paused:isGamePaused(), act:!!_activePlayScene(false), cut:typeof ZCUT!=='undefined'&&ZCUT.isOpen()})")
    check('Closed again, the controls come back', not back['ov'] and back['shown'], back)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No game script errors', not errs, errs[:4])
with game(new=True, w=1280, h=800) as g:
    g.wait(3500)
    d = g.js("({el:!!document.getElementById('ztouch'), on:typeof ZTOUCH!=='undefined'&&ZTOUCH.shown})")
    check('On a desktop with a mouse they stay away', not d['on'], d)
print('\n%d / %d passed' % (sum(res), len(res)))
