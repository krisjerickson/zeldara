"""Round 132: the first win (the wolf at the sheep pen, Oswin's help, the first shield, the lamb); the Lab's "Backstories for everyone else".
python tests/test_round132.py   (after node build.mjs)"""
import sys, os, re, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    g.js("(()=>{ ZFWIN.on=true; var ps=%s.playerState; ps.walk='done'; ps.oswin=1; ps.equip.shield=null; ps.inventory=(ps.inventory||[]).filter(i=>!(ITEMS[i]&&ITEMS[i].slot==='shield')); delete ps.firstWin; ps.godMode=false; })()" % WS); g.wait(900)
    a = g.js("(()=>{ var ws=%s; return {fw:ws.playerState.firstWin, card:(document.querySelector('.zcard:not(.out)')||{}).textContent||'', line:ZWALK.line(ws), tg:(ZJOUR.target(ws)||{}).t}; })()" % WS)
    check('As the first walk ends: a cry from the sheep pen, the line and the arrow point there (%s)' % a, a['fw'] == 1 and 'wolf' in a['card'] and 'sheep pen' in (a['line'] or '') and 'lamb' in (a['tg'] or ''), a)
    g.js("(()=>{ var ws=%s, P=ZFWIN.pen(ws); ws.player.x=P.x+64; ws.player.y=P.y+96; })()" % WS); g.wait(900)
    b = g.js("(()=>{ var ws=%s, W=ZFWIN.W; return {fw:ws.playerState.firstWin, wolf:!!(W&&W.m&&!W.m.dead), lamb:!!(ZFWIN.lamb&&ZFWIN.lamb.active), name:W&&W.m&&W.m.name}; })()" % WS)
    check('At the pen: the lamb and a young bramble wolf (%s)' % b, b['fw'] == 2 and b['wolf'] and b['lamb'], b)
    for i in range(3):      # (the familiar's bites count too)
        g.js("(()=>{ var m=ZFWIN.W&&ZFWIN.W.m; if(m)m.hp-=5; })()"); g.wait(500)
    c = g.js("(()=>{ var ps=%s.playerState; return {fw:ps.firstWin, sh:ps.equip.shield, card:(document.querySelector('.zcard:not(.out)')||{}).textContent||''}; })()" % WS)
    check('Three hits and it runs: Oswin gives the first shield, on your arm (%s)' % c, c['fw'] == 3 and c['sh'] == 'wood_shield' and 'stood your ground' in c['card'], c)
    g.wait(3000)
    d = g.js("(()=>({w2:!!(ZFWIN.W&&ZFWIN.W.m&&!ZFWIN.W.m.dead), need:ZFWIN.W&&ZFWIN.W.m&&ZFWIN.W.m._fwNeed}))()")
    for i in range(2):
        g.js("(()=>{ var m=ZFWIN.W&&ZFWIN.W.m; if(m)m.hp-=5; })()"); g.wait(500)
    e = g.js("(()=>{ var ps=%s.playerState; return {fw:ps.firstWin, lamb:ps.lamb}; })()" % WS)
    check('The shield lesson on a second, weaker wolf; then done and the lamb is yours (%s %s)' % (d, e), d['w2'] and d['need'] == 2 and e['fw'] == 4 and e['lamb'] == 1, (d, e))
    g.js("(()=>{ var ws=%s, ps=ws.playerState; ps.firstWin=undefined; ps.walk='done'; ps.equip.shield=null; ps.inventory=[]; delete ps.firstWin; ZFWIN.W=null; })()" % WS); g.wait(600)
    g.js("(()=>{ var ws=%s, P=ZFWIN.pen(ws); ws.player.x=P.x+64; ws.player.y=P.y+96; })()" % WS); g.wait(900)
    hp0 = g.js("%s.playerState.hp" % WS)
    g.js("(()=>{ var ps=%s.playerState; ps.hp-=2; })()" % WS); g.wait(500); g.js("(()=>{ var ps=%s.playerState; ps.hp-=2; })()" % WS); g.wait(600)
    f = g.js("(()=>{ var ps=%s.playerState; return {fw:ps.firstWin, sh:ps.equip.shield, card:(document.querySelector('.zcard:not(.out)')||{}).textContent||''}; })()" % WS)
    check('Two bites and Oswin drives it off — you cannot lose; the shield all the same (%s)' % f, f['fw'] == 3 and f['sh'] == 'wood_shield' and 'off it goes' in f['card'], f)
    E = [x for x in g.errs if 'Failed to load resource' not in x and 'decode audio' not in x]
    check('No game errors', not E, E[:3])
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/lab.artifact.html"); pg.wait_for_timeout(3000)
    pg.evaluate("LTODO.goTo('npcs2','.ns-c',0)"); pg.wait_for_timeout(700)
    c = pg.evaluate("({groups:document.querySelectorAll('.ns-c').length, ways:document.querySelectorAll('.ns-o').length, quotes:document.querySelectorAll('.ns-o blockquote').length, act:LAB_ACTIVE.slice(0,3)})")
    check('Lab → Backstories for everyone else: nine groups, three ways each with a sample (%s)' % c, c['groups'] == 9 and c['ways'] == 27 and c['quotes'] == 27 and c['act'][1] == 'npcs2', c)
    pg.evaluate("document.querySelector('.ns-pick[data-c=\"C\"]').click()"); pg.wait_for_timeout(400)
    k = pg.evaluate("({p:LabApp.picks['npcs2-fairies']&&LabApp.picks['npcs2-fairies'].regions, bad:!!LabApp.picks['undefined']})")
    check('…choosing a way saves it for that group (%s)' % k, k['p'] == ['C'] and not k['bad'], k)
    z = pg.evaluate("({n:Object.keys(ZSFX84.items).filter(k=>ZSFX84.items[k].z1).length, eat:Object.keys(ZSFX84.items.sfx_eat||{}).filter(k=>/^z/.test(k)), map:typeof VSFX131!=='undefined'&&Object.keys(VSFX131).length})")
    check('Lab → Sound effects: the new takes of 42 effects are listed and served from the asset store (%s)' % z, z['n'] == 42 and len(z['eat']) == 4 and z['map'] == 5, z)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
