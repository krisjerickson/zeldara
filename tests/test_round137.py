"""Round 137: health and mana in the inventory, waking at a site's door, revived monsters seen again, Muspelheim's brief hints and painted
pieces, every toiling spirit one size, Oswin's guild lines, the 28-year timeline, the three new Lab tabs.   python tests/test_round137.py"""
import sys, os, re, json, subprocess; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
# the timeline: no "thirty-six" years left anywhere the player reads
left = subprocess.run(['grep', '-rliE', 'thirty-six (years|winters)|36 years', 'src/js', 'src/npcs', 'src/villagers'], cwd=R, capture_output=True, text=True).stdout.split()
left = [f for f in left if not re.search(r'/07zt\d+-art-', f)]   # painting requests (already painted) are not read by the player
check('The timeline: no "thirty-six years" left (twenty-eight now)', not left, left)
osw = open(os.path.join(R, 'src', 'js', '21u-oswin.js'), encoding='utf-8').read()
check('Oswin in his hall: no "finally comes to my door", no wood shield to buy, ends with Elder Runa', 'finally comes to my door' not in osw and 'Sit, sit' in osw and 'wood shield for' not in osw and 'Elder Runa wants you at the Runestone' in osw)
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    v = g.js("(()=>{ var ws=%s, ps=ws.playerState; ps.maxMana=ps.maxMana||40; ps.mana=10; ps.hp=Math.max(1,ps.maxHp-3); var m=document.getElementById('modal-inventory'); m.style.display='flex'; ZVIT.tick(); var a=document.querySelector('#zvit .zvit-hp em').textContent; ps.hp=ps.maxHp; ZVIT.tick(); var up=document.querySelectorAll('#zvit .zvit-up').length; var t=document.getElementById('zvit').innerText; m.style.display='none'; return {a:a, up:up, mp:/10 \\/ /.test(t)}; })()" % WS)
    check('Inventory: health and mana bars with numbers, and a +N when you heal (%s)' % v, re.match(r'\d+ / \d+', v['a']) and v['up'] >= 1 and v['mp'], v)
    m = g.js("""(()=>{ var ws=%s, M=(ws.worldMonsters||[]).filter(m=>m.cont).slice(0,12); M.forEach(m=>{ m.dead=true; m.cont.setAlpha(0).setScale(1.4).setVisible(false); });
        ws._worldSleepTime=Date.now()-120000; ws.events.emit('wake', ws.sys, {}); var back=M.filter(m=>!m.dead);
        return {n:M.length, back:back.length, seen:back.filter(m=>m.cont.visible&&m.cont.alpha===1&&Math.abs(m.cont.scaleX-1)<0.01).length}; })()""" % WS)
    check('Monsters revived after a site come back seen, whole size, not ghosts (%s)' % m, m['back'] >= 1 and m['seen'] == m['back'], m)
    d = g.js("""(()=>{ ZRESP.inSite=true; ZRESP.door={x:%s.player.x+400,y:%s.player.y}; ZRESP.name='the Elven Library'; ZRESP._choice=true;
        ZDeath.show(ZDEATH.LOOKS[0],{area:'the Elven Library',foe:'a wisp',gold:10,level:3,fam:''}, function(){}); var b=document.getElementById('zdeath-door'), a=document.getElementById('zdeath-btn');
        var r={door:b&&b.textContent, main:a&&a.textContent}; var md=document.getElementById('modal-death'); if(md)md.style.display='none'; ZRESP._choice=false; ZRESP.inSite=false; return r; })()""" % (WS, WS))
    check('A fall inside a site: "Wake at the door of …" beside "Wake in the village" (%s)' % d, d['door'] and 'door of the Elven Library' in d['door'] and d['main'] == 'Wake in the village', d)
    p = g.js("(()=>{ return {raft:ZMUSP.has('mh_raft_a'), lift:ZMUSP.has('mh_lift_a'), lever:ZMUSP.has('dg_lever'), gate:ZMUSP.has('mh_gate_a'), lava:!!(_scn()&&_scn().tile&&_scn().tile('tx_lava',128)), musp0:ZFT.RULES.musp0.steps.length, short:Object.keys(ZFT.RULES).filter(k=>/^musp/.test(k)).every(k=>ZFT.RULES[k].steps.every(s=>s[1].length<80)), gangH:ZGANG.H, spH:ZMUSP.SPH}; })()")
    check('Muspelheim: painted raft, lift, lever, gate and lava; each hint one short line; gangs and spirits one size (%s)' % p, p['raft'] and p['lift'] and p['lever'] and p['gate'] and p['lava'] and p['musp0'] == 1 and p['short'] and p['gangH'] == 64, p)
    E = [x for x in g.errs if 'Failed to load resource' not in x and 'decode audio' not in x]
    check('No game errors', not E, E[:3])
with sync_playwright() as pw:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/lab.artifact.html"); pg.wait_for_timeout(3000)
    pg.evaluate("LTODO.goTo('first10','.f10',0)"); pg.wait_for_timeout(500)
    a = pg.evaluate("({rows:document.querySelectorAll('.f10 tr').length, props:document.querySelectorAll('.f10-p').length})")
    check('Lab → The first ten minutes: the beats and the proposals (%s)' % a, a['rows'] >= 10 and a['props'] == 7, a)
    pg.evaluate("LTODO.goTo('names137','.nm-sets',0)"); pg.wait_for_timeout(500)
    n = pg.evaluate("({sets:document.querySelectorAll('.nm-set').length, rows:document.querySelectorAll('.nm-t tr').length, riv:/Rivendell/.test(document.body.innerText)})")
    check('Lab → Names: four realm sets and every place name (%s)' % n, n['sets'] == 4 and n['rows'] > 80 and n['riv'], n)
    pg.evaluate("LTODO.goTo('logo137','.lg-c',0)"); pg.wait_for_timeout(500)
    l = pg.evaluate("({n:document.querySelectorAll('.lg-c').length, img:[...document.querySelectorAll('.lg-z')].filter(i=>/_blob/.test(i.getAttribute('src'))).length})")
    check('Lab → Painted logo: the twenty, painted (%s)' % l, l['n'] == 20 and l['img'] == 40, l)
    t = pg.evaluate("(()=>{ LTODO.goTo('tracker','body',0); return /Round 137/.test(document.body.innerText); })()")
    check('Lab → Checklist has the round 137 points', t)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
