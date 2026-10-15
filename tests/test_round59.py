"""Round 59 — Muspelheim falls and Asgard comes down (16d/16e): the escape (five collapsing floors, one timer, the lava front, the way back
gone, out of time = back to the bottom), the sinking causeway, Muspelheim sinking, Asgard on Mirror Lake, the pier notch, the Bifröst and Godsbane;
plus Kris's round 59 notes: one spirit per bindstone, the forty on the Green (no group pictures), the bound gangs in the forges and halls, the
Glimmerhall as a room with Sólveig, painted portraits and ingredient tiles in the dialogs, the forges' names, the tagline, the Surtharn forms.
Run: python tests/test_round59.py"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"
SETUP = """var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ps.soulGems={1:1,2:1,3:1,4:1};
      ps.completedQuests=['s1_dungeon','s2_dungeon','s3_dungeon','s4_dungeon','s1_tower','s2_tower','s3_tower','s4_tower','s1_harbor']; ps.rescued=[1,2,3,4]; ps.unlockedSections=[1,2,3,4]; _wgApplyGates(ws.wd,ps); await w(2600); if(typeof FairyTalk!=='undefined')FairyTalk.close();"""

with game(new=True, painted=True) as g:
    g.wait(4000)
    # ── the climb ──
    r = g.js("""(async()=>{ %s %s ps.inventory.push('volcano_key_n','volcano_key_e','volcano_key_s','volcano_key_w','lodestar'); ps.muspFreed=['musp_h0_0','musp_h0_1'];
      ZESC.begin(ws); await w(6000); var D=game.scene.getScene('Dungeon'), E=D._esc;
      return {run:game.scene.isActive('Dungeon'), esc:D._escRun, floor:D.floor, mons:D.monsters.filter(function(m){ return !m.dead; }).length, path:E&&E.max, t:Math.round(ps.muspEscT), tot:ZESC.total(ps), hud:!!document.getElementById('esc-hud'), sp:E&&E.sp.length, front:E&&E.front}; })()""" % (W, SETUP))
    check('The Lodestar made → Muspelheim falls: the escape run (floor %s, a path %s tiles long, %s s on the clock, %s spirits following, no monsters)' % (r['floor'], r['path'], r['t'], r['sp']), r['run'] and r['esc'] and r['floor'] == 0 and r['path'] > 40 and 0 < r['t'] <= r['tot'] and r['hud'] and r['sp'] >= 1 and r['mons'] == 0, r)
    r = g.js("""(async()=>{ %s var D=game.scene.getScene('Dungeon'), E=D._esc, up=D.interactables.find(function(i){ return i.type==='stairs_up'; }); D.px=up.x; D.py=up.y; D._interact(); await w(300); var stay=game.scene.isActive('Dungeon')&&D.floor===0;
      E.front=12; await w(1200); var gone=0; for(var i=0;i<E.gone.length;i++)gone+=E.gone[i]; var k=E.order.find(function(k){ return E.D[k]===4; }); D.px=(k%%DW)*TILE+16; D.py=Math.floor(k/DW)*TILE+16; E.hurtT=0; var d0=E.D[k]; await w(1200);
      var tk=Math.floor(D.px/TILE)+Math.floor(D.py/TILE)*DW; return {stay:stay, gone:gone, thrown:E.D[tk], front:Math.round(E.front)}; })()""" % W)
    check('The way back is gone; behind you the floor turns to lava (%d tiles); caught by it you are thrown ahead (to step %s, past the front at %s)' % (r['gone'], r['thrown'], r['front']), r['stay'] and r['gone'] > 10 and r['thrown'] >= r['front'], r)
    r = g.js("""(async()=>{ %s var D=game.scene.getScene('Dungeon'), ps=D.worldScene.playerState; ps.muspEscT=0.2; await w(3500); var D2=game.scene.getScene('Dungeon');
      return {floor:D2.floor, esc:D2._escRun, t:Math.round(ps.muspEscT), tot:ZESC.total(ps)}; })()""" % W)
    check('Out of time: back to the bottom of the climb, the clock full again (%s s)' % r['t'], r['esc'] and r['floor'] == 0 and r['t'] >= r['tot'] - 6, r)
    r = g.js("""(async()=>{ %s var fl=[]; for(var f=0;f<5;f++){ var D=game.scene.getScene('Dungeon'); fl.push(D.floor+':'+(D._esc?D._esc.max:0)); var s=D.interactables.find(function(i){ return i.type==='stairs_down'; }); if(!s)return {fl:fl, nos:f}; D.px=s.x; D.py=s.y; D._interact(); await w(f<4?5000:2500); }
      var ws=game.scene.getScene('World'), ps=ws.playerState; return {fl:fl, world:game.scene.isActive('World'), esc:ps.muspEsc, cw:!!ws._cw, hud:!!document.getElementById('esc-hud')}; })()""" % W)
    check('Five floors up (%s) and out through the gate: onto the causeway' % ' · '.join(r['fl']), len(r['fl']) == 5 and r['world'] and r['esc'] == 2 and r['cw'] and not r['hud'], r)
    # ── the causeway ──
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), C=ws._cw, G=C.G; C.f=20; await w(1500); var p=G.list.find(function(c){ return G.M[G.key(c[0],c[1])]===2; }); _heroSetPos(ws,p[0]*TILE+16,p[1]*TILE+16); C.hurt=0; await w(1200);
      var atDoor=Math.hypot(ws.player.x-G.door.x,ws.player.y-G.door.y)<40, reset=C.f<10; _heroSetPos(ws,G.an.x*TILE+16,G.an.y*TILE+16); var t2=G.an; for(var i=0;i<8;i++){ var tx=Math.floor(ws.player.x/TILE), ty=Math.floor(ws.player.y/TILE); if(G.M[G.key(tx,ty)]===undefined)break; _heroSetPos(ws,ws.player.x+(G.an.x-G.cx)/Math.hypot(G.an.x-G.cx,G.an.y-G.cy)*TILE,ws.player.y+(G.an.y-G.cy)/Math.hypot(G.an.x-G.cx,G.an.y-G.cy)*TILE); }
      C.t=5; await w(1500); return {tiles:G.list.length, atDoor:atDoor, reset:reset, done:!ws._cw, esc:ws.playerState.muspEsc}; })()""" % W)
    check('The causeway: %d tiles sink behind you; caught, you are dragged back to the gate; on the shore — done' % r['tiles'], r['tiles'] > 200 and r['atDoor'] and r['reset'] and r['done'] and r['esc'] == 3, r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; await w(12000); for(var i=0;i<40&&!ps.asgardDown;i++)await w(500); await w(4500); if(typeof FairyTalk!=='undefined')FairyTalk.close();
      var P=ZASG.plan(ws), lake=0; for(var y=520;y<680;y++)for(var x=520;x<680;x++){ var t=ws.wd.tiles[y][x]; if(t===T.DEEP_WATER||t===T.SHALLOW_WATER||t===T.STONE_FLOOR||t===T.BUILDING_WALL)lake++; }
      var d=_volcanoSiteDefs().find(function(v){ return v.type==='volcano_main'; }), sea=ws.wd.tiles[Math.round(d.ty+8)][Math.round(d.tx+1)];
      return {sunk:ps.muspSunk, site:ws.wd.sites.some(function(s){ return s.id==='volcano_main'; }), sea:sea===T.OCEAN, down:ps.asgardDown, n:P.n, rim:P.rim.length, share:Math.round(P.n/lake*100), gate:!!P.gate, mira:document.getElementById('fairy-talk')&&1}; })()""" % W)
    check('Muspelheim sinks (gone from the map, sea where it stood); Asgard comes down onto Mirror Lake — %d tiles, %d %% of the lake, walled (%d), a gate toward the pier' % (r['n'], r['share'], r['rim']), r['sunk'] and not r['site'] and r['sea'] and r['down'] and r['share'] >= 55 and r['rim'] > 100 and r['gate'], r)
    # ── the notch, the Bifröst, Godsbane ──
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, N=ZASG.notchAt(), P=ZASG.plan(ws); _heroSetPos(ws,N.x,N.y); await w(800); ZASG.bifrost(ws); await w(16000);
      var btn=document.querySelector('#fairy-talk .ft-btns button'), said=document.querySelector('#fairy-talk .ft-text'); var txt=said?said.textContent:''; if(btn)btn.click(); await w(800);
      var cells=ws.wd._bifCells||[], walk=cells.filter(function(c){ return canPassTile(ws.wd.tiles[c[1]][c[0]]); }).length, g=P.gate, open=canPassTile(ws.wd.tiles[g[1]][g[0]]);
      return {bif:ps.bifrost, gods:ps.godsbane, cells:cells.length, walk:walk, open:open, word:/GODSBANE/.test(txt), slot:!!document.getElementById('action-gods-slot')&&document.getElementById('action-gods-slot').style.display!=='none', rb:!!ws._bifRb}; })()""" % W)
    check('The Lodestar in the pier notch: the spirits line up, the beam melts the wall, the Bifröst runs to the gate (%d tiles, all walkable), the spirits teach Godsbane' % r['cells'], r['bif'] and r['gods'] and r['cells'] > 20 and r['walk'] == r['cells'] and r['open'] and r['word'] and r['slot'] and r['rb'], r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; var n0=ZGODS.cast(ws); var no=ZGODS.ready(ps)===0;
      ps.equip=ps.equip||{}; var i=ps.inventory.indexOf('lodestar'); if(i>=0)ps.inventory.splice(i,1); ps.equip.mWeapon='lodestar';
      var c=_heroCtx(ws), ang=_heroDirAngle(c.dir), m=(ws.worldMonsters||[]).find(function(q){ return q&&!q.dead&&q.hp>0; }); if(m){ m.x=c.x+Math.cos(ang)*120; m.y=c.y+Math.sin(ang)*120; if(m.cont)m.cont.setPosition(m.x,m.y); m.sovWard=true; m.hp=m.maxHp=99999; } var h0=m?m.hp:0;
      var hit=ZGODS.cast(ws), cd=ZGODS.ready(ps); var again=ZGODS.cast(ws); return {no:no, hit:hit, dmg:ZGODS.lastDmg, cd:Math.round(cd/1000), last:ZHit.last&&ZHit.last.sov}; })()""" % W)
    check('Godsbane: nothing without the Lodestar in hand; with it a beam of light (hit %s, %s damage to a warded foe, Sovereign), then %s s to recover' % (r['hit'], r['dmg'], r['cd']), r['no'] and r['hit'] >= 1 and r['dmg'] > 50 and r['last'] and 15 <= r['cd'] <= 20, r)
    # ── the spirits, the Glimmerhall, the dialogs ──
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), S=ZSPIRIT.shrines(ws), gang=0; S.forEach(function(s){ if(s._v&&s._v.gang)gang++; }); return {gang:gang, pics:ZGREEN.PICS, groups:(ws._zg&&ws._zg.groups||[]).filter(function(G){ return G.im; }).length, zgang:typeof ZGANG}; })()""")
    check('One spirit at each bindstone (no gangs); the Green shows only the forty, gathering as themselves (no group pictures); the gangs work in the forges', r['gang'] == 0 and r['pics'] is False and r['groups'] == 0 and r['zgang'] == 'object', r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'); ws._enterBuilding({type:'glimmerhall'}); await w(3500); var B=game.scene.getScene('Building'), on=game.scene.isActive('Building'), th=B&&B._imap&&B._imap.theme&&B._imap.theme.name;
      if(B){ B.bx=B.npcX; B.by=B.npcY+20; B._npcInteract(); } await w(600); var el=document.querySelector('#fairy-talk'), tiles=el?el.querySelectorAll('.zt-tile').length:0, nm=el?el.querySelector('.ft-name').textContent:'', cv=document.getElementById('ft-cv');
      if(typeof FairyTalk!=='undefined')FairyTalk.close(); if(B&&B._exitBuilding)B._exitBuilding(); await w(1500); return {on:on, th:th, nm:nm, tiles:tiles, cv:cv?cv.width:0}; })()""" % W)
    check('The Glimmerhall is a room ("%s") with Sólveig to talk to — her box shows the shards as tiles (%d) and a %d px painted portrait' % (r['th'], r['tiles'], r['cv']), r['on'] and r['th'] == 'The Glimmerhall' and 'Sólveig' in r['nm'] and r['tiles'] >= 8 and r['cv'] == 150, r)
    r = g.js("""(async()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.inventory.push(ZMIRA.METAL[1]); ZMIRA.talk(ws); await w(400); var el=document.querySelector('#fairy-talk'), have=el.querySelectorAll('.zt-tile.zt-have').length, miss=el.querySelectorAll('.zt-tile.zt-miss').length; if(typeof FairyTalk!=='undefined')FairyTalk.close();
      return {have:have, miss:miss, lbl:_siteLabel({id:'volcano_s',type:'volcano_mini'}), tag:ZBrand.TAGLINE.join(' '), surt:BOSS_PHASES.surtharn.phases.map(function(P){ return P.form; }).join(','), walls:/sw2_lavafall/.test(ZMUSP.throne.toString())}; })()""".replace('(async()=>{ ', '(async()=>{ ' + W + ' '))
    check('Mira shows each tray\'s ingredients as tiles — have (%d) and greyed-out missing (%d); the forge label reads "%s"' % (r['have'], r['miss'], r['lbl']), r['have'] >= 1 and r['miss'] >= 6 and 'Slag Forge' in r['lbl'], r)
    check('The tagline ends "…and liberate the spirits of Runeheim."; Surtharn fights in his six own forms; the throne has all six spirit walls', r['tag'].endswith('and liberate the spirits of Runeheim.') and r['surt'] == 'surt_1,surt_2,surt_3,surt_4,surt_5,surt_6' and r['walls'], r)
    r = g.js("""(()=>{ SBSAGA.show(); var A=document.querySelectorAll('#modal-saga .sbs-arc')[6], n=A.querySelectorAll('button[data-k]:not(.sbs-todo)').length; closeModal('saga'); return n; })()""")
    check('The Spirit Saga sandbox: the collapse and the Bifröst are wired (%d buttons)' % r, r >= 5, r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

lab = open(os.path.join(os.path.dirname(__file__), '..', 'lab', 'index.html'), encoding='utf8').read()
check('The Lab: a Forge-masters tab and an Asgard options tab, the earlier rounds in one drop-down', re.search(r"id:['\"]fmpaint", lab) and 'Asgard and the Bifröst, options first' in lab and 'lab-arch-sel' in lab)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
