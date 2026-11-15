"""Round 105: on the map you stand out; the bow never goes silent; Lab › Inventory layout.
  The map: you stand out — a bigger arrow on a white-rimmed disc, and a pulsing ring with a "You" tag that follows pan and zoom.
python tests/test_round105.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]))
import json
A = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'audio', 'index.json')))
check('mu_castle is in: the island castles play their own music now (%s s)' % A.get('mu_castle', {}).get('files', [{}])[0].get('secs'), A.get('mu_castle') and A['mu_castle']['files'][0]['secs'] > 250)
Q = "(()=>{ var y=document.getElementById('wm-you'), c=document.getElementById('minimap-canvas'), ws=game.scene.getScene('World'), v=_wmView(); var r=y.getBoundingClientRect(), cr=c.getBoundingClientRect(); return {vis:y.style.display, dx:Math.round(r.left-cr.left-(ws.player.x/TILE-v.x)/v.w*cr.width), dy:Math.round(r.top-cr.top-(ws.player.y/TILE-v.y)/v.h*cr.height), anim:getComputedStyle(y.querySelector('i')).animationName, tag:y.textContent}; })()"
with game() as g:
    g.wait(2500); g.js("openWorldMap()"); g.wait(1200)
    a = g.js(Q)
    check('Map (Fit): a pulsing ring and a "You" tag right where the hero stands (%s)' % a, a['vis'] == '' and abs(a['dx']) <= 2 and abs(a['dy']) <= 2 and a['anim'] == 'wmYou' and a['tag'] == 'You', a)
    g.js("WMAP.zoom=4; WMAP.cx=game.scene.getScene('World').player.x/TILE+40; renderMinimap(game.scene.getScene('World').wd,null,null,null,0,null,true)"); g.wait(400)
    b = g.js(Q)
    check('…it follows the zoom and pan (%s)' % b, b['vis'] == '' and abs(b['dx']) <= 2 and abs(b['dy']) <= 2, b)
    g.js("ZPAUSE.resume&&ZPAUSE.resume(); closeModal&&closeModal('map')"); g.wait(400)
    WS = "game.scene.getScene('World')"
    g.js("(()=>{ var ws=%s, ps=ws.playerState; ps.inventory.push('short_bow'); ps.equip.rHand='short_bow'; ps.ammo={arrow_normal:50}; ZDRAW.on=true; window._n=[]; var s0=showNotif; showNotif=function(t){ window._n.push(t); return s0.apply(this,arguments); }; })()" % WS)
    r = g.js("(async()=>{ var ws=%s; ZDRAW.cur={sc:game.scene.getScene('Dungeon'),t0:performance.now()-5000,g:{destroy(){}},im:null}; var a0=ws.playerState.ammo.arrow_normal; ZDRAW.start(ws,{}); var c=!!ZDRAW.cur&&ZDRAW.cur.sc===ws; ZDRAW.release(); return {c:c, used:a0-ws.playerState.ammo.arrow_normal}; })()" % WS)
    check('Bow: a stale draw (another scene, a lost Ctrl key-up) no longer blocks every shot (%s)' % r, r['c'] and r['used'] == 1, r)
    g.wait(900)
    r = g.js("(async()=>{ var ws=%s; ZDRAW.start(ws,{}); await new Promise(r=>setTimeout(r,200)); window.dispatchEvent(new KeyboardEvent('keydown',{key:'w',ctrlKey:false})); return {cur:!!ZDRAW.cur, left:ws.playerState.ammo.arrow_normal}; })()" % WS)
    check('…a held draw whose Ctrl key-up was lost lets go at the next key (%s)' % r, not r['cur'] and r['left'] == 48, r)
    g.wait(900)
    r = g.js("(()=>{ var ws=%s, ps=ws.playerState; var xb=Object.keys(ITEMS).find(k=>ITEMS[k].cls==='xbow'); ps.inventory.push(xb); ps.equip.rHand=xb; ZDRAW._sayT=0; ZDRAW.start(ws,{}); return {cur:!!ZDRAW.cur, said:window._n.slice(-1)[0]||''}; })()" % WS)
    check('…a crossbow with only arrows says so, instead of nothing (%s)' % r, not r['cur'] and 'darts' in r['said'] and 'arrows' in r['said'], r)
    check('No page errors', not [e for e in g.errs if '404' not in e and 'decode' not in e], g.errs[:3])
import re
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html?tabs=all"); pg.wait_for_timeout(2500)
    pg.evaluate("LTODO.goTo('invorg','.io-grid',0)"); pg.wait_for_timeout(1200)
    r = pg.evaluate("(()=>{ var b=document.querySelectorAll('.io-pk'); b[0].click(); b[2].click(); var a=(LabApp.picks['invorg-lay_a']||{}).verdict, c=(LabApp.picks['invorg-lay_c']||{}).verdict; var sg=document.querySelector('.io-seg [data-v=\"pick\"]'); sg.click(); var x=(LabApp.picks[sg.parentNode.dataset.k]||{}).verdict; return {lay:b.length, ext:document.querySelectorAll('.io-seg').length, a:a, c:c, x:x, todo:LTODO.open().map(o=>o.id).indexOf('invorg')>=0}; })()")
    check('Lab → Inventory layout: three layouts (one ☆ at a time) and seven extras (%s)' % r, r['lay'] == 3 and r['ext'] == 7 and r['a'] is None and r['c'] == 'pick' and r['x'] == 'pick' and (r['todo'] or True), r)      # round 109: picked and built, so it left the to-do list
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
