"""Round 88 — the menus fill a phone (24x ZPHM): map & quests, the inventory on one screen, the tome. Run: python tests/test_round88.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
BOX = "(sel)=>{ var e=document.querySelector(sel); if(!e)return null; var r=e.getBoundingClientRect(); return {l:Math.round(r.left),t:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),b:Math.round(r.bottom),sh:e.scrollHeight,ch:e.clientHeight}; }"
for (W, H) in ((844, 390), (740, 360)):
    with game(painted=False, w=W, h=H, query='?touch=1') as g:
        g.wait(3000)
        g.js("ZPAUSE.go('map')"); g.wait(1000)
        m = g.page.evaluate(BOX, '#modal-map .modal'); c = g.page.evaluate(BOX, '#minimap-canvas'); s = g.page.evaluate(BOX, '#wmap-side')
        check('%dx%d map: the menu fills the screen (%s), the map as tall as it allows (%s), the quests beside it %dpx wide' % (W, H, m, c and c['h'], s['w']), m['w'] >= W - 12 and m['b'] <= H and c['h'] >= H - 120 and s['w'] >= 300, [m, c, s])
        g.js("ZPAUSE.go('inventory')"); g.wait(1000)
        m = g.page.evaluate(BOX, '#modal-inventory .modal'); L = g.page.evaluate(BOX, '.zv-left'); R = g.page.evaluate(BOX, '.zv-right'); ic = g.page.evaluate(BOX, '#inv-content')
        check('%dx%d inventory: one screen — gear and bag side by side, nothing below the fold (left %s, right %s)' % (W, H, L, R), m['b'] <= H and abs(L['t'] - R['t']) < 4 and R['l'] > L['l'] + L['w'] - 4 and L['b'] <= m['b'] and R['b'] <= m['b'] and ic['sh'] <= ic['ch'] + 2 and L['sh'] <= L['ch'] + 2, [m, L, R, ic])
        g.js("ZPAUSE.go('tome')"); g.wait(1000)
        m = g.page.evaluate(BOX, '#modal-tome .modal'); t = g.page.evaluate(BOX, '#tome-tabs'); gr = g.page.evaluate(BOX, '#tome-grid')
        check('%dx%d tome: fills the screen, its sections in one sliding row (%spx tall), the list gets the rest (%spx)' % (W, H, t['h'], gr['h']), m['w'] >= W - 12 and t['h'] <= 44 and gr['h'] >= H - 170, [m, t, gr])
with game(painted=False) as g:
    g.wait(2500); g.js("ZPAUSE.go('inventory')"); g.wait(900)
    L = g.page.evaluate(BOX, '.zv-left'); m = g.page.evaluate(BOX, '#modal-inventory .modal')
    check('Desktop: the inventory keeps its own layout (%s)' % L, L['w'] == 330 and m['w'] < 1270, [L, m])
print('%d / %d passed' % (sum(res), len(res)))
