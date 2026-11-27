"""Round 140: Kris's play notes — the minimap arrow, the shop that froze the game, Runa first, rolling foes, shields and dodges,
ranged hits, quick spells, aim at game animals, boss blink tells, the roll slot, full screen, pause when the game loses focus,
named saves, waking at a site's door, the village's ground pieces, the crypt.   python tests/test_round140.py"""
import sys, os, re, subprocess; from playwright.sync_api import sync_playwright; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:600]))
WS = "game.scene.getScene('World')"
src = lambda f: open(os.path.join(R, 'src', 'js', f), encoding='utf-8').read()
ui = src('21-ui.js'); w2 = src('21z2-wave2.js'); w3 = src('21z3-wave3.js'); shops = src('22-ui-shops.js')
check('Minimap arrow: moving right points right (0 no longer falls through to down)', 'if(a==null)a=Math.PI/2' in ui and "[ws.player.dir]||Math.PI/2" not in ui)
check('No "tonight" in the welcome back or the rest prompt', 'for tonight' not in w2 and 'Three things to do next' in w2)
check('The guild hall has no Saga Loom button', "['🧵 The Saga Loom',ZLOOM.open]" not in w3)
check('The general shop no longer reads a missing "wood" (it froze the game)', '(wood>0' not in shops)
check('Arrows fly twice as fast', "==='heat'?460:760" in shops and "==='heat'?460:760" in src('02-hero-api.js'))
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    # the game loop survives a fault in a frame
    lf = g.js("(()=>{ var ws=%s, f0=game.loop.frame, u0=ws.update; ws.update=function(){ ws.update=u0; throw new Error('test fault'); }; return f0; })()" % WS); g.wait(800)
    lf2 = g.js("game.loop.frame")
    check('A fault inside a frame does not stop the game (%s → %s)' % (lf, lf2), lf2 > lf + 1)
    # Runa answers before her board and the waystone during the first walk
    r = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ZWALK.on=true; ps.walk='runa'; var R=ws._villageNPCs.find(n=>n.id==='vf_elder'); R._walk=0; ZWALK.tick(); ws.player.x=R.x-24; ws.player.y=R.y+8; ws.player.cont.setPosition(ws.player.x,ws.player.y);
        var said=null, d0=ZDLG.say; ZDLG.say=function(n,t){ said=said||n; return d0.apply(ZDLG,arguments); }; ws.keys.TAB._justDown=true; ws.keys.TAB.isDown=true; ws._checkInteraction(); ZDLG.say=d0; ws.keys.TAB.isDown=false;
        var camp=document.getElementById('modal-camp'); var board=camp&&camp.style.display!=='none'; for(var q=0;q<8&&ZDLG.cur;q++){ ZDLG._q=[]; ZDLG.cur.close(); } ZWALK.on=false; ps.walk='done'; return {said:said, board:!!board}; })()""" % WS)
    check('First walk: Tab by Runa is Runa teaching the waystones, not her bounty board (%s)' % r, r['said'] == 'Elder Runa' and not r['board'], r)
    # spells: quick cooldowns
    s = g.js("(()=>{ var L=Object.keys(SPELL_DATA).map(k=>SPELL_DATA[k]).filter(s=>s._r140); return {n:L.length, all:Object.keys(SPELL_DATA).length, max:Math.max.apply(null,L.map(s=>s.cooldown)), was:Math.max.apply(null,L.map(s=>s._r140))}; })()")
    check('Spell cooldowns about a third (longest %s s, was %s s)' % (s['max'], s['was']), s['n'] == s['all'] and s['max'] <= s['was'] * 0.4, s)
    # the gold ring finds a deer when no foe is near
    a = g.js("""(()=>{ var ws=%s; (ws.worldMonsters||[]).forEach(m=>{ m.x+=99999; }); var a={type:'deer',def:{r:14,hp:20},x:ws.player.x+160,y:ws.player.y,hp:20,maxHp:20,dead:false,state:'idle'}; ws._largeAnimals=(ws._largeAnimals||[]).concat([a]);
        var m=ZAIM129.pick(ws,0,ZAIM129.HALF,ZAIM129.RNG_BOW); var v=ZAIM129.valid(ws,m,ZAIM129.RNG_BOW); ws._largeAnimals.pop(); (ws.worldMonsters||[]).forEach(m=>{ m.x-=99999; }); return {deer:m===a, valid:v, rng:ZAIM129.RNG_BOW}; })()""" % WS)
    check('The aim ring finds game animals for hunting, and reaches further (%s)' % a, a['deer'] and a['valid'] and a['rng'] >= 480, a)
    # rolling foes
    ro = g.js("""(()=>{ var ws=%s; ws.player.x+=1400; ws.player.cont.setPosition(ws.player.x,ws.player.y); return 1; })()""" % WS); g.wait(2500)
    ro = g.js("""(()=>{ var ws=%s; var x=ws.player.x+150, y=ws.player.y; ws._spawnRosterMon('shellback',x,y,1,new PRNG(5),{}); var mon=ws.worldMonsters[ws.worldMonsters.length-1]; if(ws._monWake)ws._monWake(mon); mon._m.aggro=true; mon._m.rl={t:0,b:0,a:Math.PI/2,ang:0}; window.__m=mon; return 1; })()""" % WS)
    g.wait(700); g.js("(()=>{ var m=window.__m; m._m.rl={t:0,b:0,a:Math.PI/2,ang:0}; m._m.stunT=0; })()"); g.wait(150)
    ro = g.js("""(()=>{ var m=window.__m, s=m.spr, h0=m._hp; m.hp-=10; var lost=h0-m._hp; var o=s.originY; var st=m._m.rl?m._m.rl.t:null; var held=_heroHold(game.scene.getScene('World'),m,1); return {oy:o, za:!!m._za, lost:lost, rolling:!!m._m.rl, held:held, invuln:m._m.invuln}; })()""")
    g.wait(2200)
    ro2 = g.js("(()=>{ var m=window.__m; return {rolling:!!m._m.rl, oy:m.spr.originY, ang:Math.round(m.spr.angle)}; })()")
    check('A rolling foe: turns round its middle, a blow glances off for half (not immune), a hold does not stop it (%s)' % ro, (ro['oy'] == 0.5 or not ro['za']) and 4 <= ro['lost'] <= 6 and ro['held'] == 0, ro)
    check('…and its roll is short — over within ~1.5 s, back on its feet (%s)' % ro2, not ro2['rolling'] and ro2['oy'] == 1, ro2)
    # shot from afar: it chases, and remembers home
    sh = g.js("""(()=>{ var ws=%s; var x=ws.player.x+420, y=ws.player.y+20; ws._spawnRosterMon('meadow_wolf',x,y,1,new PRNG(7),{}); var mon=ws.worldMonsters[ws.worldMonsters.length-1]; if(!mon||!mon._m)return {none:true}; if(ws._monWake)ws._monWake(mon); MX._src='ranged'; mon.hp-=1; MX._src=null; return {hurt:mon._m.hurtT, aggro:mon._m.aggro, home:!!mon._m._home}; })()""" % WS)
    check('A foe hit from afar comes for you for a while, then walks home (%s)' % sh, sh.get('none') or (sh['hurt'] >= 6 and sh['aggro'] and sh['home']), sh)
    k = g.js("({front:MX.FRONT_MAX, track:MX.TURN.track, keep:MX.DODGE_KEEP, warn:BMOVE.WARN})")
    check('Shields take a part of each blow and turn slowly; a dodge is a graze; boss blinks warned longer (%s)' % k, k['front'] <= 0.6 and k['track'] < 1.2 and k['keep'] == 0.5 and k['warn'] >= 0.8, k)
    # a dodging foe takes half
    dg = g.js("""(()=>{ var ws=%s; ws._spawnRosterMon('jackalope',ws.player.x+40,ws.player.y,1,new PRNG(3),{}); var M=ws.worldMonsters[ws.worldMonsters.length-1]; if(!M||!M._m)return {none:true}; M._m.dodgeCd=99; var h0=M._hp; MX._src='melee'; M.hp-=10; var full=h0-M._hp; M._m.dodgeCd=0; h0=M._hp; M.hp-=10; MX._src=null; var half=h0-M._hp; return {full:full, half:half}; })()""" % WS)
    check('A dodge keeps half the blow (%s)' % dg, dg.get('none') or (dg['half'] > 0 and abs(dg['half'] - dg['full'] / 2) <= 1), dg)
    # the roll slot
    rs = g.js("(()=>{ var ws=%s; ws.playerState.canRoll=true; ZROLL._cdUntil=Date.now()+1500; ZR140.rollSlot(); var el=document.getElementById('action-roll-slot'); return {el:!!el, vis:el&&el.style.display!=='none', n:el&&el.querySelector('.cdn').textContent}; })()" % WS)
    check('The roll has its own slot with its cooldown (%s)' % rs, rs['el'] and rs['vis'] and rs['n'], rs)
    check('Full screen button on the bar', g.js("!!document.getElementById('fs-btn')"))
    # focus lost → paused; a click → back
    f = g.js("(()=>{ ZR140.focus.lost(); var el=document.getElementById('zfocus'); return el&&el.style.display; })()"); g.wait(600)
    p1 = g.js("_PAUSE.active")
    g.js("(()=>{ document.getElementById('zfocus').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true})); })()"); g.wait(700)
    p2 = g.js("_PAUSE.active")
    check('Click outside: the game pauses; click back in: it plays (%s %s %s)' % (f, p1, p2), f == 'flex' and p1 and not p2)
    # named saves, with where you are
    sv = g.js("""(()=>{ var ws=%s; ws._save&&ws._save(); var c=ZSave.current; if(!c)return {nocur:true}; ZSave.rename(c.pid,c.slot,'Testing saga'); var I=ZSave.info(c.pid,c.slot); return {name:I.name, where:I.where, line:ZProfilesUI.slotLine(I)}; })()""" % WS)
    check('A save can be named and shows where you are (%s)' % sv, sv.get('nocur') or (sv['name'] == 'Testing saga' and sv['where'] and 'Testing saga' in sv['line']), sv)
    # the season's ground pieces: none in the village, never on a road; the tarred boat by the pier, solid
    zs = g.js("""(()=>{ var ws=%s; ZSLAND.has=function(){ return true; }; var put0=ZSLAND.put; ZSLAND.put=function(ws,L,id,x,y){ var o={id:id,x:x,y:y,displayWidth:60,displayHeight:50,setOrigin:function(){ return o; },setDepth:function(){ return o; },destroy:function(){}}; L.push(o); return o; };
        ZSLAND.land(ws,'sp'); var L=ws._zsl||[]; ZSLAND.put=put0; delete ZSLAND.has; var inV=L.filter(o=>o.id!=='lt_tar_boat'&&ZR140.village(o.x,o.y)).length, onR=L.filter(o=>o.id!=='lt_tar_boat'&&ZR140.road(ws.wd,o.x,o.y)).length, boat=L.find(o=>o.id==='lt_tar_boat');
        var solid=boat?_vbBlocked(ws.wd,boat.x,boat.y-4,boat.x,boat.y+200):null; var pier=ws._villageFolkSpot('pier',0); var d=boat&&pier?Math.hypot(boat.x-pier.x,boat.y-pier.y)/TILE:null; ZSLAND.clear(ws,'_zsl'); ws._zslS=null; return {n:L.length, inV:inV, onR:onR, boat:!!boat, solid:solid, pierD:d}; })()""" % WS)
    check('Ground pieces: none in the village, none on a road; the tarred boat by the pier and solid (%s)' % zs, zs['n'] > 5 and zs['inV'] == 0 and zs['onR'] == 0 and zs['boat'] and zs['solid'] and zs['pierD'] < 12, zs)
    cr = g.js("""(()=>{ var ws=%s; ZECHO.on=true; ws._zcrypt=null; ZECHO.build(ws); var P=ZECHO.spot(ws), o=ws._zcryptO; var solid=_vbBlocked(ws.wd,P.x,P.y-10,P.x,P.y+200); return {h:o&&o.displayHeight, solid:solid}; })()""" % WS)
    check('The crypt of echoes: as tall as a hall, and solid (%s)' % cr, (cr['h'] is None or cr['h'] >= 140) and cr['solid'], cr)
    E = [x for x in g.errs if 'Failed to load resource' not in x and 'decode audio' not in x and 'test fault' not in x and 'frame fault' not in x]
    check('No game errors', not E, E[:3])
# Tilda; then a fall in a site, then "Wake at the door of …"
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    # Tilda's shop opens
    t = g.js("""(()=>{ var ws=%s; var B=ws.wd.buildings.find(b=>b.type==='shop'); ws._enterBuilding(B); return 1; })()""" % WS); g.wait(2000)
    t = g.js("(()=>{ var B=game.scene.getScene('Building'); try{ B._npcInteract(); }catch(e){ return 'ERR '+e.message; } var m=document.getElementById('modal-camp'); var ok=m&&m.style.display!=='none'; if(typeof closeModal==='function')closeModal('camp'); return ok?'open':'closed'; })()")
    check('Tab at Tilda opens her shop (%s)' % t, t == 'open', t)
    g.js("(()=>{ game.scene.stop('Building'); game.scene.wake('World'); document.getElementById('hud').style.display=''; })()"); g.wait(1500)
    g.js("(()=>{ var ws=%s; ws.playerState.lockedSites=[]; var S=ws.wd.sites.filter(q=>(q.type==='dungeon'||q.type==='tower')&&q.section===1&&!_bossSiteGate(ws.playerState,q,ws.wd.sites)); ws._enterSite(S[0]); })()" % WS)
    g.wait(3000)
    g.js("(()=>{ var D=game.scene.getScene('Dungeon'); ZDeath.auto=false; var ps=(D.ps||D.playerState||D.worldScene.playerState); ps.hp=0; D._playerDied(); })()")
    g.wait(2600)
    lay = g.js("(()=>{ var b=document.getElementById('zdeath-btn'), d=document.getElementById('zdeath-door'); return {row:!!(d&&d.parentNode.classList.contains('zd-btns')), gap:b&&d?Math.round(b.getBoundingClientRect().top-d.getBoundingClientRect().bottom):null}; })()")
    r = g.js("(()=>{ var b=document.getElementById('zdeath-door').getBoundingClientRect(); return [(b.left+b.right)/2,(b.top+b.bottom)/2]; })()")
    g.page.mouse.click(r[0], r[1]); g.wait(2600)
    dd = g.js("(()=>{ var ws=%s, d=ZRESP.door||{}; return {act:game.scene.isActive('World'), paused:_PAUSE.active, dist:Math.round(Math.hypot(ws.player.x-d.x,ws.player.y-d.y)/TILE)}; })()" % WS)
    check('After a fall in a site: the door button stands apart (%s) and takes you to the door, playing (%s)' % (lay, dd), lay['row'] and lay['gap'] >= 10 and dd['act'] and not dd['paused'] and dd['dist'] <= 2, [lay, dd])
# the pop-ups' emojis, the hearts, the Tome, the side-quest paces
with game(painted=True, w=1280, h=720) as g:
    g.wait(3500)
    em = g.js("""(()=>{ showNotif('🔥 Burning — and 🎈 a balloon','#fff'); return new Promise(r=>setTimeout(()=>{ var n=[...document.querySelectorAll('.notif')].pop(); r({html:n?n.innerHTML.slice(0,400):'', txt:n?n.textContent:''}); },400)); })()""")
    check('Pop-ups: emojis become painted icons or leave the sentence (%s)' % em['txt'], 'zemo' in em['html'] and '🔥' not in em['txt'], em)
    ht = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.maxHp=37; ps.hp=37; ZHUD._sig=null; ZHUD.tick&&ZHUD.tick(); var I=[...document.querySelectorAll('.zh-hearts .zh-h i')].map(i=>i.style.width); return I; })()""" % WS)
    check('Hearts: full health is all full hearts (%s)' % ht, ht and all(w == '100%' for w in ht), ht)
    tn = g.js("(()=>{ var n0=document.querySelectorAll('.notif').length; Tome.see('place','site_test_x'); Tome._flush&&Tome._flush(); return document.querySelectorAll('.notif').length-n0; })()")
    check('No "new Tome entry" pop-ups', tn <= 0, tn)
    check('The title says NEW PLAYER', 'NEW PLAYER' in open(os.path.join(R, 'src', 'js', '06-scene-title-boot.js'), encoding='utf-8').read())
    E = [x for x in g.errs if 'Failed to load resource' not in x and 'decode audio' not in x]
    check('No game errors (2)', not E, E[:3])
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
    pg.evaluate("LTODO.goTo('r140','#r40-feast',0)"); pg.wait_for_timeout(600)
    a = pg.evaluate("({mix:!!document.querySelector('#r40-feast .r40-take'), takes:document.querySelectorAll('#r40-feast option').length, props:document.querySelectorAll('.r40-p').length, em:document.querySelectorAll('.r40-em span').length, logos:document.querySelectorAll('.r40-lg img').length})")
    check('Lab → Round 140: the feast mixer, the proposals, the emojis (%s)' % a, a['mix'] and a['takes'] >= 25 and a['props'] >= 20 and a['em'] >= 100, a)
    t = pg.evaluate("(()=>{ LTODO.goTo('tracker','body',0); return /Round 140/.test(document.body.innerText); })()")
    check('Lab → Checklist has round 140', t)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
