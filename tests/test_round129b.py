"""Round 129b: aiming made simple (09s3-aim129.js) — the gold ring, tap / hold to charge, a direction retargets, the target rule in ❓ Controls;
the crossbow (option A): a slow heavy bolt through every foe in a line that breaks plate; the Lab's checklist tab and the tidied tab bar.
python tests/test_round129b.py   (after node build.mjs)"""
import sys, os, re, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
SET = """(()=>{ ['ZAIM','ZDRAW','ZAIM129'].forEach(k=>window[k].on=true); var ws=%s, ps=ws.playerState; ps.godMode=true; ps.level=12; ws.calcPlayerStats(); ps.mana=ps.maxMana; ps.equip.spell='frost_bolt_tome'; ps.equip.rHand='short_bow'; ps.ammo={arrow_normal:40,dart_normal:40};
  var L=ws.worldMonsters.filter(m=>!m.dead).sort((a,b)=>Math.hypot(a.x-ws.player.x,a.y-ws.player.y)-Math.hypot(b.x-ws.player.x,b.y-ws.player.y)), a=L[0], b=L[1], c=L[2], X=ws.wd.spawnX, Y=ws.wd.spawnY;
  ws.worldMonsters.forEach(o=>{ if(o!==a&&o!==b&&o!==c&&Math.hypot(o.x-X,o.y-Y)<700){ o.x+=1400; if(o.cont)o.cont.x+=1400; } });
  var put=function(m,x,y,hp){ m.x=x; m.y=y; if(m.cont)m.cont.setPosition(x,y); m.maxHp=99999; m.hp=hp; };
  put(a,X,Y-120,5000); put(b,X+150,Y+60,300); put(c,X-150,Y+60,9000); ws.player.x=X; ws.player.y=Y+60; ws.player.dir='up';
  window._a=a; window._b=b; window._c=c; window._pin=setInterval(function(){ [[a,X,Y-120],[b,X+150,Y+60],[c,X-150,Y+60]].forEach(function(q){ q[0].x=q[1]; q[0].y=q[2]; if(q[0].cont)q[0].cont.setPosition(q[1],q[2]); }); },16); })()""" % WS
with game(painted=True, w=1280, h=720) as g:
    g.wait(3000)
    g.js(SET); g.wait(600)
    r = g.js("({lock:ZAIM129.lock===_a, ring:!!(ZAIM129.ring&&ZAIM129.ring.active), rule:ZAIM129.rule()})")
    check('A gold ring locks on the foe ahead (the default rule: most dangerous) (%s)' % r, r['lock'] and r['ring'] and r['rule'] == 'danger', r)
    g.js("(()=>{ var ws=%s; ZDRAW.start(ws,{}); ZDRAW.release(); })()" % WS); g.wait(60)
    p = g.js("(()=>{ var A=%s._playerProj||[], p=A[A.length-1]; return p?{z:p._zdraw||1, da:Math.abs(Math.atan2(_a.y-p.y,_a.x-p.x)-Math.atan2(p.vy,p.vx))}:null; })()" % WS)
    check('A tap of Ctrl shoots at the ringed foe, ×1 (%s)' % p, p and p['z'] == 1 and p['da'] < 0.25, p)
    g.wait(800)
    g.js("(()=>{ var s0=ZDRAW.shoot; ZDRAW.shoot=function(sc,m,mon){ var r=s0.apply(this,arguments), A=sc._playerProj, p=A[A.length-1]; window._shot={z:m, b:mon===_b, vx:p&&Math.round(p.vx), vy:p&&Math.round(p.vy)}; return r; }; })()")
    g.page.keyboard.down('Control'); g.wait(250); g.page.keyboard.down('ArrowRight'); g.wait(500); g.page.keyboard.up('ArrowRight'); g.wait(150)
    mid = g.js("({mon:ZDRAW.cur&&ZDRAW.cur.mon===_b, moved:Math.round(Math.abs(%s.player.x-(_b.x-150)))})" % WS)
    g.page.keyboard.up('Control'); g.wait(60)
    p2 = g.js("window._shot")
    check('Hold Ctrl, press → : the ring jumps to the foe on the right, the hero (nearly) holds still; held 0.9 s → full draw ×2 straight at it (%s %s)' % (mid, p2), mid['mon'] and mid['moved'] < 40 and p2 and p2['z'] == 2 and p2['b'] and p2['vx'] > 300 and abs(p2['vy']) < 20, (mid, p2))
    g.js("(()=>{ var ws=%s; ws.player.x=ws.wd.spawnX; ws.player.y=ws.wd.spawnY+60; ws.player.dir='up'; ZAIM129.lock=null; ZAIM129.lockT=0; })()" % WS); g.wait(300)
    m0 = g.js("%s.playerState.mana" % WS)
    g.js("(()=>{ var sp=ZHit.spellPow; ZHit.spellPow=function(){ var v=sp.apply(ZHit,arguments); window._pow=v; return v; }; var f0=ZAIM.fire; ZAIM.fire=function(sc){ window._at=ZAIM.cur&&ZAIM.cur.mon===_a; return f0.apply(ZAIM,arguments); }; })()")
    g.js("(()=>{ var ws=%s; ZAIM.press(ws,{}); ZAIM.cur.t0-=900; ZAIM.release(); })()" % WS); g.wait(60)
    s = g.js("(()=>{ var ws=%s; return {cur:!!ZAIM.cur, spent:Math.round(%s-ws.playerState.mana), cost:SPELL_DATA.frost_bolt.manaCost, seek:window._at, dmg:window._pow}; })()" % (WS, m0))
    check('X held 0.9 s: a full charge — cast at the ringed foe, costs 1.5× the mana (%s)' % s, not s['cur'] and s['seek'] and abs(s['spent'] - (s['cost'] + round(s['cost'] * 0.5))) <= 2, s)
    g.wait(3200)
    g.js("(()=>{ var ws=%s; ws.playerState.mana=ws.playerState.maxMana; ZAIM.press(ws,{}); ZAIM.release(); })()" % WS); g.wait(60)
    s2 = g.js("(()=>{ var ws=%s; return {dmg:window._pow, spent:Math.round(ws.playerState.maxMana-ws.playerState.mana)}; })()" % WS)
    check('A tap of X casts at once for the plain cost, half the full-charge power (%s vs %s)' % (s2, s['dmg']), s2['dmg'] and s['dmg'] and abs(s['dmg'] / s2['dmg'] - 2) < 0.2 and abs(s2['spent'] - s['cost']) <= 1, (s2, s))
    g.js("(()=>{ ZAIM129.setRule('weakest'); ZAIM129.lock=null; ZAIM129.lockT=0; ZAIM129.HALF=3.2; })()"); g.wait(200)
    w = g.js("({b:ZAIM129.lock===_b, rule:%s.playerState.aimRule})" % WS)
    g.js("ZAIM129.setRule('strongest'); ZAIM129.lock=null; ZAIM129.lockT=0;"); g.wait(200)
    st = g.js("ZAIM129.lock===_c")
    g.js("ZAIM129.setRule('danger'); ZAIM129.HALF=0.96;")
    check('The target rule: weakest picks the weak foe, strongest the strong one; saved on the hero (%s %s)' % (w, st), w['b'] and w['rule'] == 'weakest' and st, (w, st))
    g.js("ZPAUSE.go('controls')"); g.wait(600)
    c = g.js("[...document.querySelectorAll('#zaim-box .zdiff-b')].map(b=>b.textContent.slice(0,14)+(b.classList.contains('on')?'*':''))")
    check('❓ Controls has the five auto-aim choices (%s)' % c, len(c) == 5 and any('*' in x and 'Most' in x for x in c), c)
    g.js("ZPAUSE.resume&&ZPAUSE.resume()"); g.wait(300)
    x = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.equip.rHand='light_crossbow'; ws.calcPlayerStats(); clearInterval(window._pin); var X=ws.wd.spawnX, Y=ws.wd.spawnY;
      [_a,_b,_c].forEach(function(m,i){ m.x=X; m.y=Y-60-i*50; if(m.cont)m.cont.setPosition(m.x,m.y); m.hp=5000; }); ws.player.x=X; ws.player.y=Y+40; ws.player.dir='up'; ZAIM129.lock=null; ZAIM129.lockT=0;
      var h=[_a,_b,_c].map(m=>m.hp); window._h0=h; ws.worldBowTimer=0; _fireWorldBow(ws); var A=ws._playerProj, p=A[A.length-1]; p.vx=0; p.vy=-360; for(var i=0;i<60;i++)ws._updatePlayerProj(0.01);      /* small steps: the test browser runs at a few frames a second */
      return {pierce:p.pierceN, xb:p.xb, cd:ws.worldBowTimer, it:ITEMS.dart_normal.qty+'/'+ITEMS.dart_normal.buy}; })()""" % WS)
    hh = g.js("[_a,_b,_c].map((m,i)=>window._h0[i]-m.hp)")
    check('Crossbow: a 1.2 s reload, darts 6 to a bundle at 1.5× the price, and the bolt flies on through every foe in its line (%s, hits %s)' % (x, hh), x['xb'] and x['cd'] == 1.2 and x['it'].startswith('6/') and sum(1 for v in hh if v > 0) == 3, (x, hh))
    bh = g.js("""(()=>{ var said=[]; var m={_hp:50,maxHp:100,bars:[{hp:30,at:0.6,only:['melee'],hint:'plate',ic:'🛡',col:'#fff',n:'Plate'}]}; MX._xbT=Date.now(); var r1=MX._barHit(m,10,'ranged',function(t){ said.push(t); }); var h1=m.bars[0].hp;
      MX._xbT=0; var r2=MX._barHit(m,10,'ranged',function(t){ said.push(t); }); return {bolt:30-h1, arrow:h1-m.bars[0].hp, said:said}; })()""")
    check('…and it breaks plate (full damage to a melee-only bar), where an arrow is resisted (%s)' % bh, bh['bolt'] == 10 and bh['arrow'] < 2, bh)
    E = [e for e in g.errs if 'Failed to load resource' not in e and 'decode audio' not in e]
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
    t = pg.evaluate("({act:LAB_ACTIVE.slice(), all:LAB_TABS.length})")
    check('The new Lab: only the tabs that need Kris are buttons, the checklist first (%s)' % t['act'], t['act'][0] == 'tracker' and 'aim' not in t['act'] and 'names2' not in t['act'] and len(t['act']) <= 9 and t['all'] > 20, t)
    pg.evaluate("LTODO.goTo('tracker','body',0)"); pg.wait_for_timeout(800)
    k = pg.evaluate("({rows:document.querySelectorAll('.tk-r').length, done:document.querySelectorAll('.tk-did').length, notes:document.querySelectorAll('.tk-in').length, sum:[...document.querySelectorAll('.tk-f')].map(b=>b.textContent)})")
    check('Lab → Checklist: every topic with its status, what was built for the done ones, a note box each and one for anything else (%s)' % k, k['rows'] >= 35 and k['done'] >= 15 and k['notes'] == k['rows'] + 1, k)
    pg.evaluate("document.querySelector('.tk-f[data-f=\"you\"]').click()"); pg.wait_for_timeout(400)
    y = pg.evaluate("[...document.querySelectorAll('.tk-r .tk-st')].map(x=>x.textContent)")
    check('…the "need you" filter shows only those (%d)' % len(y), y and all(('input' in s) or ('Answered' in s) for s in y), y)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
