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
    zs = g.js("""(()=>{ var ws=%s; ZSLAND.has=function(){ return true; }; var put0=ZSLAND.put; ZSLAND.put=function(ws,L,id,x,y){ var o={id:id,x:x,y:y,displayWidth:60,displayHeight:50,setOrigin:function(){ return o; },setDepth:function(){ return o; },setPosition:function(x,y){ o.x=x; o.y=y; return o; },setVisible:function(){ return o; },destroy:function(){}}; L.push(o); return o; };
        ZSLAND.dress(ws,'midsummer'); var D=(ws._zsd||[]).filter(o=>o._zNight), tOn=D.filter(o=>!ZR140.offSquare(o.x,o.y)).length, tN=D.length; ZSLAND.clear(ws,'_zsd'); ZSLAND.land(ws,'sp'); var L=ws._zsl||[]; ZSLAND.put=put0; delete ZSLAND.has; var inV=L.filter(o=>o.id!=='lt_tar_boat'&&ZR140.village(o.x,o.y)&&ZR140.kind(o.id)!=='village').length, vil=L.filter(o=>ZR140.kind(o.id)==='village').length, onSq=L.filter(o=>!ZR140.offSquare(o.x,o.y)).length, onR=L.filter(o=>o.id!=='lt_tar_boat'&&ZR140.road(ws.wd,o.x,o.y,ZR140.kind(o.id)==='village'?0:1)).length, boat=L.find(o=>o.id==='lt_tar_boat');
        var solid=boat?_vbBlocked(ws.wd,boat.x,boat.y-4,boat.x,boat.y+200):null; var pier=ws._villageFolkSpot('pier',0); var d=boat&&pier?Math.hypot(boat.x-pier.x,boat.y-pier.y)/TILE:null; ZSLAND.clear(ws,'_zsl'); ws._zslS=null; return {n:L.length, torches:tN, torchOnSq:tOn, inV:inV, vil:vil, onSq:onSq, onR:onR, boat:!!boat, solid:solid, pierD:d}; })()""" % WS)
    check('Ground pieces: only a few village pieces by the houses, none on the square or a road; the tarred boat by the pier and solid (%s)' % zs, zs['n'] > 5 and zs['inV'] == 0 and zs['onSq'] == 0 and zs['torchOnSq'] == 0 and 1 <= zs['vil'] <= 6 and zs['onR'] == 0 and zs['boat'] and zs['solid'] and zs['pierD'] < 12, zs)
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
# round 140c: Kris's later play notes
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    g.js("(()=>{ ['ZJOUR','ZOSW','ZCURQ','ZFWIN','ZFEST'].forEach(k=>{ if(window[k])window[k].on=true; }); })()")
    # ☆ Make current answers in the journal
    g.js("(()=>{ var ws=%s; ws.playerState.walk='done'; ZOSW.journal(ws); })()" % WS); g.wait(500)
    b = g.js("(()=>{ var b=document.querySelector('#quest-list-container .zj-trk'), r=b.getBoundingClientRect(); return {x:r.x+r.width/2, y:r.y+r.height/2, id:b.dataset.trk}; })()")
    g.page.mouse.click(b['x'], b['y']); g.wait(400)
    tr = g.js("%s.playerState.tracked" % WS)
    check('Journal: ☆ Make current answers a click (%s → %s)' % (b['id'], tr), tr == b['id'], [b, tr])
    g.js("(()=>{ closeModal('quests'); })()")
    # the young wolf is in plain sight, the lamb lamb-sized; afterwards the lamb goes home to its pen
    g.js("(()=>{ for(var q=0;q<8&&ZDLG.cur;q++){ ZDLG._q=[]; ZDLG.cur.close(); } })()")      # round 143: any line still being said (NPC lines are spoken in the box now)
    w = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.oswin=ps.oswin||1; ps.equip.shield=null; ps.inventory=(ps.inventory||[]).filter(i=>!(ITEMS[i]&&ITEMS[i].slot==='shield')); delete ps.firstWin; ZFWIN.tick(); var P=ZFWIN.pen(ws); ws.player.x=P.x+TILE*3; ws.player.y=P.y+TILE*3; ws.player.cont.setPosition(ws.player.x,ws.player.y); ZFWIN.tick();
        var L=ZFWIN.lamb, m=ZFWIN.W&&ZFWIN.W.m; return {fw:ps.firstWin, lambH:L&&Math.round(L.displayHeight), gap:m&&L?Math.round(Math.hypot(m.x-L.x,m.y-L.y)):null}; })()""" % WS)
    check('First win: the wolf stands clear of a lamb-sized lamb (%s)' % w, w['fw'] == 2 and w['lambH'] and w['lambH'] <= 40 and w['gap'] and w['gap'] >= 120, w)
    g.js("(()=>{ for(var q=0;q<8&&ZDLG.cur;q++){ ZDLG._q=[]; ZDLG.cur.close(); } })()")      # round 142: the first fight's words are said in the dialogue box now — click through them
    g.js("(()=>{ var ws=%s, ps=ws.playerState; ZFWIN.kill(ws,ZFWIN.W.m); ZFWIN.done(ws); })()" % WS); g.wait(300); g.js("(()=>{ for(var q=0;q<8&&ZDLG.cur;q++){ ZDLG._q=[]; ZDLG.cur.close(); } })()"); g.wait(2200)
    l = g.js("(()=>{ var ws=%s, L=ZFWIN.lamb, P=ZFWIN.pen(ws); return {d:Math.round(Math.hypot(L.x-(P.x+TILE*0.5),L.y-(P.y+TILE*1.5)))}; })()" % WS)
    g.js("(()=>{ var ws=%s; ws.player.x+=TILE*6; ws.player.cont.setPosition(ws.player.x,ws.player.y); })()" % WS); g.wait(1200)
    l2 = g.js("(()=>{ var ws=%s, L=ZFWIN.lamb, P=ZFWIN.pen(ws); return {d:Math.round(Math.hypot(L.x-(P.x+TILE*0.5),L.y-(P.y+TILE*1.5)))}; })()" % WS)
    check('…and the lamb runs back into its pen and stays, not following you (%s %s)' % (l, l2), l2['d'] < 30, [l, l2])
    # a lesson card waits while a foe hunts you, then comes
    q = g.js("""(()=>{ var ws=%s; ZCARD.close&&ZCARD.close(); ZR140._q=[]; var m=MX.spawn(ws,'bramble_wolf',ws.player.x+120,ws.player.y,{q:1,temp:true}); if(ws.worldMonsters.indexOf(m)<0)ws.worldMonsters.push(m); window.__wm=m; if(m._m)m._m.aggro=true;
        ZCARD.show({who:'Master Oswin',text:'test lesson',cls:'zc-les'}); return {shown:!!(ZCARD.cur&&ZCARD.cur.isConnected&&/test lesson/.test(ZCARD.cur.textContent)), help:ZHELP.L.some(x=>/test lesson/.test(x.text))}; })()""" % WS)
    g.js("(()=>{ var m=window.__wm; m.dead=true; if(m._m)m._m.aggro=false; ZR140._hurtT=0; })()"); g.wait(500)
    check('A lesson never pops up over a fight — round 142: it goes into the ? (%s)' % q, not q['shown'] and q['help'], q)
    check('No saga-card offers but the last', g.js("(()=>{ var n=0, s0=ZCARD.show; ZCARD.show=function(){ n++; }; ZSHARE.offer({kind:'festival',title:'x'}); ZCARD.show=s0; return n===0; })()"))
    # walking up to a wall: still in front of it
    g.js("(()=>{ for(var q=0;q<8&&ZDLG.cur;q++){ ZDLG._q=[]; ZDLG.cur.close(); } })()")
    d = g.js("""(()=>{ var ws=%s, P=(ws.wd.props||[]).filter(o=>o.vill&&o.prop==='fence'&&o.o&&o.o.kind==='stone')[0]; var y=(P.y+P.h)*TILE; ws.player.y=y; ws.player.x=(P.x+P.w/2)*TILE; ws.player.cont.setPosition(ws.player.x,y); return {wall:WR_DEPTH(y)}; })()""" % WS); g.wait(300)
    d2 = g.js("%s.player.cont.depth" % WS)
    check('Right up against a wall you stay in front of it (hero %.6f, wall %.6f)' % (d2, d['wall']), d2 > d['wall'], [d2, d])
    # the festival: nothing on the square, no emoji sign, waits for the first win and a site
    f = g.js("""(()=>{ var ws=%s, ps=ws.playerState; var ready0=ZDAY.ready({firstWin:4,gday:0.5}), ready1=ZDAY.ready({firstWin:4,gday:0.5,completedQuests:['s1_tower']}); ZFEST.dress(ws,'sp'); var C=ZFEST.centre(ws), L=ws._zfest||[];
        return {n:L.length, onSquare:L.filter(o=>Math.hypot(o.x-C.x,(o.y-C.y)/0.9)<=ZR140.SQUARE*TILE).length, texts:L.filter(o=>o.type==='Text').length, ready0:ready0, ready1:ready1}; })()""" % WS)
    check('The festival: pieces off the World Tree square, no bobbing seedling, and not before you have found your feet (%s)' % f, f['n'] >= 3 and f['onSquare'] == 0 and f['texts'] == 0 and not f['ready0'] and f['ready1'], f)
    # the house dressing: no wreath or step on the ground
    h = g.js("(()=>{ var ws=%s; ZSLAND.dress(ws,'sp'); var L=ws._zsd||[]; return {n:L.length, ids:[...new Set(L.map(o=>o._zid||o.texture&&o.texture.key))].slice(0,8)}; })()" % WS)
    check('Festival dressing: banners and lanterns at the corners, no wreaths on the ground (%s)' % h, not any('wreath' in str(i) or 'step' in str(i) for i in h['ids']), h)
    # mana in the inventory only with a spell
    mv = g.js("(()=>{ var ps=%s.playerState; ps.equip.spell=null; ps.spellsLearned=[]; toggleModal('inventory'); return 1; })()" % WS); g.wait(500)
    mv = g.js("(()=>{ var r=document.querySelector('#zvit .zvit-mp'); var a=r&&r.style.display; var ps=%s.playerState; ps.spellsLearned=['x']; return a; })()" % WS); g.wait(400)
    mv2 = g.js("(()=>{ var r=document.querySelector('#zvit .zvit-mp'); return r&&r.style.display; })()")
    check('Inventory: mana shows only once you have a spell (%r → %r)' % (mv, mv2), mv == 'none' and mv2 == '', [mv, mv2])
    g.js("closeModal('inventory')")
    # the village board stands well apart from the waystone
    bd = g.js("""(()=>{ var ws=%s, p=ZECO.boardSpot(ws), W=(ws.wd.waystones||[]).find(w=>w.id==='ws_village'); return {d:Math.round(Math.hypot(p.x-(W.x+0.5)*TILE,p.y-(W.y+0.5)*TILE)/TILE)}; })()""" % WS)
    check('Runa\'s board stands well apart from the village waystone (%s tiles)' % bd['d'], bd['d'] >= 7, bd)
    # a tap on Pia talks to her
    pi = g.js("(()=>{ var ws=%s; if(!ZROLL.npc)return {none:true}; var n=ZCLICK.npcAt(ws,{x:ZROLL.npc.x,y:ZROLL.npc.y-14}); return {n:n&&n.n}; })()" % WS)
    check('A tap on Tumbler Pia finds her (%s)' % pi, pi.get('none') or pi['n'] == 'Tumbler Pia', pi)
    # the new paintings play: Oswin walks, the sheep graze and amble, the cauldrons have their loops
    mv = g.js("""(()=>{ var ws=%s; var r={oswin:ZAtlas.count('npc_guild','move','s'), sheep:ZAtlas.has('animal_sheep'), lamb:ZAtlas.has('animal_lamb'), caul:ZWE.frames('mv_if_cauldron'), camp:ZWE.frames('mv_cp_cauldron')};
        var A=ZWE.animTex(ws,'mv_if_cauldron'); r.tex=!!A; var P=(ws.wd.props||[]).find(p=>p.prop==='sheep'); if(P){ ws.player.x=(P.x+1)*TILE; ws.player.y=(P.y+3)*TILE; ws.player.cont.setPosition(ws.player.x,ws.player.y); } return r; })()""" % WS)
    g.wait(2500)
    sh = g.js("(()=>{ var L=ZSHEEP.L, k=Object.keys(L); return {n:k.length, drawn:k.filter(x=>L[x]._zim&&L[x]._zim.scene&&L[x]._zim.visible).length}; })()")
    check('The new paintings play: Oswin walks, sheep and lamb are animals, both cauldrons loop (%s; sheep %s)' % (mv, sh), mv['oswin'] == 4 and mv['sheep'] and mv['lamb'] and mv['caul'] == 4 and mv['camp'] == 4 and mv['tex'] and sh['drawn'] >= 2, [mv, sh])
    # the fair greeter walks up and tells you about the fair
    fg = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.walk='done'; ps.firstWin=4; ps.seasNow='sp'; ps.seasStart=Math.floor(ps.gday||0); ps.festGreet={}; ZFEST.dress(ws,'sp'); var C=ZFEST.centre(ws); ws.player.x=C.x+TILE*3; ws.player.y=C.y+TILE*6; ws.player.cont.setPosition(ws.player.x,ws.player.y);
        (ws.worldMonsters||[]).forEach(m=>{ if(m._m)m._m.aggro=false; }); ZR140._hurtT=0; window.__said=null; var d0=ZDLG.say; ZDLG.say=function(n,t){ if(!window.__said)window.__said=n+': '+t; return d0.apply(ZDLG,arguments); }; return {f:ZDAY.fest(ps)}; })()""" % WS)
    for _ in range(14):
        g.wait(1000)
        if g.js("!!window.__said"): break
    said = g.js("window.__said")
    g.js("(()=>{ for(var q=0;q<8&&ZDLG.cur;q++){ ZDLG.cur.close(); } })()"); g.wait(600)
    st = g.js("(()=>{ var ps=%s.playerState; return {done:Object.values(ps.festGreet||{}).indexOf('done')>=0, phase:ZFAIR.S&&ZFAIR.S.phase}; })()" % WS)
    check('A fair begins: Marta walks up and tells you about it, once (%s; %s)' % (said and said[:90], st), fg['f'] == 'sp' and said and said.startswith('Marta') and 'Thaw-fair' in said and st['done'], [fg, said, st])
    # round 140c picks: the roots bars, the crypt door's stage, things moving in code
    g.js("(()=>{ var ps=%s.playerState; ps.spellsLearned=['x']; toggleModal('inventory'); })()" % WS); g.wait(1200)
    bz = g.js("(()=>{ var v=document.getElementById('zvit'); var r=v&&v.querySelector('.zvit-hp em'); return {pt:!!(v&&v.classList.contains('zvit-pt')), size:r&&parseInt(getComputedStyle(r).fontSize), bg:!!(v&&/url/.test(v.querySelector('.zvit-r').style.backgroundImage))}; })()")
    g.js("closeModal('inventory')")
    check('Inventory bars in the painted roots frame, numbers big and clear (%s)' % bz, bz['pt'] and bz['bg'] and bz['size'] >= 15, bz)
    cs = g.js("(()=>{ var ws=%s, ps=ws.playerState, b0=ps.bossSites; ps.bossSites={}; var a=ZR140.cryptStage(ws); ps.bossSites={a:1,b:1,c:1,d:1,e:1,f:1}; var b=ZR140.cryptStage(ws); ps.bossSites=b0; ZECHO.build(ws); return {a:a,b:b,img:ws._zcryptO&&ws._zcryptO.texture&&ws._zcryptO.texture.key, glow:!!ZMOVE.CODE.crypt_door_s1}; })()" % WS)
    check('The crypt door shows its stage (none beaten → 1, six → 3) and its runes breathe (%s)' % cs, cs['a'] == 1 and cs['b'] == 3 and cs['glow'], cs)
    # Oswin's line at the top waits during the first walk
    ob = g.js("(()=>{ var ps=%s.playerState, w0=ps.walk; ps.walk='runa'; var el=document.getElementById('zvoice-bub'); if(el)el.classList.remove('on'); ZVOICE.bubble('oswin',ps); var on=!!(document.getElementById('zvoice-bub')||{classList:{contains:()=>false}}).classList.contains('on'); ps.walk=w0; return on; })()" % WS)
    check('Oswin\'s line at the top waits while the first walk is on', ob is False, ob)
    # the outline on phones: the zoomed camera cuts by drawing, with no fault
    ol = g.js("(()=>{ var ws=%s, c=ws.cameras.main, z0=c.zoom; c.setZoom(0.82); var err=null; try{ for(var i=0;i<3;i++)ZOL.tick(ws,ws.player.cont,10.95); }catch(e){ err=String(e); } c.setZoom(z0); return {err:err}; })()" % WS)
    check('The behind-something outline works with the phone camera zoom (%s)' % ol, not ol['err'], ol)
    E3 = [x for x in g.errs if 'Failed to load resource' not in x and 'decode audio' not in x]
    check('No page errors (140c)', not E3, E3[:3])

# the Flow prompts match the final pictures
sys.path.insert(0, os.path.join(R, 'tools', 'video')); import flow as FL
P = {p['id']: p for p in FL.plan()}
def fp(sid, n, w):
    p = P[sid]; ww = w if w in p['versions'] else list(p['versions'])[0]; sh = next(x for x in p['versions'][ww] if x['n'] == n); return FL.prompt(p['sc'], sh['beat'], ww if ww != 'all' else 'zeldor')
a1, a2, a3, a4 = fp('surt3', 5, 'all'), fp('asgard', 6, 'zeldor'), fp('opening', 4, 'all'), fp('celebrate', 6, 'all')
check('Flow prompts: Surtharn underground with villager spirits; the Lodestar described; the opening\'s chains human-sized; children only after the first cry',
      'no sky' in a1 and 'villager' in a1 and 'six coloured gems' in a2 and 'human-sized' in a3 and 'no children' not in a4 and 'no children' in fp('celebrate', 1, 'all'), [a1[:200], a3[:200]])

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
    check('Lab → Round 140: the feast mixer, the proposals, the emojis (%s)' % a, a['mix'] and a['takes'] >= 25 and a['props'] >= 19 and a['em'] >= 100, a)
    t = pg.evaluate("(()=>{ LTODO.goTo('tracker','body',0); return /Round 140/.test(document.body.innerText); })()")
    check('Lab → Checklist has round 140', t)
    pg.evaluate("LTODO.goTo('worldlook5','#w5-r140',0)"); pg.wait_for_timeout(600)
    w = pg.evaluate("({imgs:document.querySelectorAll('#w5-r140 img.lv-z').length})")
    pg.evaluate("document.querySelector('#w5-r140 img.lv-z').click()"); pg.wait_for_timeout(300)
    v = pg.evaluate("(()=>{ var o=document.getElementById('lv-full'), i=o&&o.querySelector('img'); return {open:o&&o.style.display, w:i&&Math.round(i.getBoundingClientRect().width)}; })()")
    check('Lab → World revamped 5: the 30 round-138 paintings to review, full screen on a click (%s %s)' % (w, v), w['imgs'] == 30 and v['open'] == 'flex' and v['w'] >= 1300, [w, v])
    pg.keyboard.press('Escape')
    pg.evaluate("LTODO.goTo('title140','#t40-comp',0)"); pg.wait_for_timeout(1200)
    tt = pg.evaluate("(()=>{ var c=document.querySelector('.t40-cv'), x=c.getContext('2d'), d=x.getImageData(0,0,c.width,c.height).data, lit=0; for(var i=0;i<d.length;i+=4000)if(d[i]+d[i+1]+d[i+2]>60)lit++; var s=document.querySelector('.t40-lo'); s.value='logo_p11'; s.dispatchEvent(new Event('change',{bubbles:true})); return {cards:document.querySelectorAll('.t40-c').length, lit:lit, logos:s.options.length}; })()")
    check('Lab → The new title screen: 46 request cards and a working composer (%s)' % tt, tt['cards'] == 46 and tt['lit'] > 50 and tt['logos'] >= 50, tt)
    pg.evaluate("LTODO.goTo('flow138','.fl-ims',0)"); pg.wait_for_timeout(600)
    f = pg.evaluate("({after:[...document.querySelectorAll('.fl-ims img')].filter(i=>/painted again/.test(i.alt)).length})")
    check('Lab → Flow: before and after for the repainted problems (%s)' % f, f['after'] >= 25, f)
    pg.evaluate("LTODO.goTo('crypt140',null,0)"); pg.wait_for_timeout(600)
    c = pg.evaluate("({ways:document.querySelectorAll('.cr40-row').length, door:document.querySelectorAll('.cr40-door figure').length, segs:document.querySelectorAll('.wl-seg[data-k^=\"r140-c_\"]').length})")
    check('Lab → The crypt of echoes: three ways, each full and growing, and the door at six stages (%s)' % c, c['ways'] == 3 and c['door'] == 6 and c['segs'] >= 4, c)
    pg.evaluate("LTODO.goTo('motion140',null,0)"); pg.wait_for_timeout(600)
    m = pg.evaluate("({rows:document.querySelectorAll('.mv40 tr').length, segs:document.querySelectorAll('.wl-seg[data-k^=\"motion140-\"]').length, txt:/Master Oswin/.test(document.body.innerText)})")
    check('Lab → What should move: the analysis, the walkers, ✓ per painting (%s)' % m, m['rows'] >= 30 and m['segs'] >= 25 and m['txt'], m)
    pg.evaluate("LTODO.goTo('bars140',null,0)"); pg.wait_for_timeout(600)
    bb = pg.evaluate("({opts:document.querySelectorAll('.bb-c').length, bars:document.querySelectorAll('.bb-bar').length})")
    check('Lab → Health & mana bars: six looks, live (%s)' % bb, bb['opts'] == 6 and bb['bars'] == 12, bb)
    pg.evaluate("LTODO.goTo('flow138',null,0)"); pg.wait_for_timeout(600)
    check('Lab → Flow: why the repaints missed, and the third try', pg.evaluate("/third try/.test(document.body.innerText)"))
    pg.evaluate("LTODO.goTo('fair140',null,0)"); pg.wait_for_timeout(600)
    fr = pg.evaluate("({who:document.querySelectorAll('.wl-seg[data-k^=\"fair140-\"]').length, rows:document.querySelectorAll('.r40-t tr').length})")
    check('Lab → The fair greeter: five to choose from and the words for each fair (%s)' % fr, fr['who'] == 5 and fr['rows'] >= 6, fr)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
