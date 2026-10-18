"""Round 62 — Kris's realm ideas built: heat in every forge and a signature trial per forge (Brokkr's anvil, the lava tide, ore-cart rails, free
the toilers); Asgard's citadel — Heimdall's Watch, Valhöll, the Hall of the Norns, Yggdrasil (Grimtooth, Ratatoskr), the Throne of Grímnir; the
Ragnarök track in Muspelheim and Asgard; the Lab shows the painted potions; art ordered (wave 64, sprite wave 7.9).
Run: python tests/test_round62.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }; var tp=function(D,x,y){ D.px=x; D.py=y; if(D.pCont)D.pCont.setPosition(x,y); }; var calm=function(D){ D.monsters.forEach(function(m){ m.dead=true; m.hp=0; if(m._hp!==undefined)m._hp=0; if(m.cont)m.cont.setVisible(false); }); };"
F = "var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ps.level=20;"

with game(new=True, painted=True) as g:
    g.wait(4500)
    r = g.js("""(async()=>{ %s %s var o={}; for(var vid of ['volcano_n','volcano_e','volcano_s','volcano_w']){ ZFORGE.enter(ws,vid,0); await w(5500); var D=game.scene.getScene('Dungeon'); calm(D); var h0=D._heat; await w(1500);
        o[vid]={sig:ZFI.sig(D),heat:D._heat>h0,tr:(D._zfTroughs||[]).length,anvil:!!D._zfAnvil,tide:(D._zfTide||[]).length,cart:!!D._zfCart,door:!!D._zfDoor}; }
      game.scene.getScene('Dungeon')._exitToWorld(null); await w(1200); return o; })()""" % (W, F))
    ok = r['volcano_n']['sig'] == 'anvil' and r['volcano_n']['anvil'] and r['volcano_e']['sig'] == 'tide' and r['volcano_e']['tide'] >= 1 and r['volcano_s']['sig'] == 'rails' and r['volcano_s']['cart'] and r['volcano_w']['sig'] == 'toilers' and r['volcano_w']['door'] and all(v['heat'] and v['tr'] >= 1 for v in r.values())
    check('Every forge runs hot (the gauge climbs, quench troughs on each floor) and has its own trial: Ember — the anvil, Cinder — the tide, Slag — the rails, Ash — the toilers', ok, r)
    r = g.js("""(async()=>{ %s %s ZFORGE.enter(ws,'volcano_n',0); await w(5500); var D=game.scene.getScene('Dungeon'), o={}; calm(D);
      D._heat=99; var T=D._zfTroughs[0]; tp(D,T.x,T.y+24); await w(400); o.cooled=D._heat<99; D._heat=80; D._interact(); o.quench=D._heat;
      var sd=D.stairsDownTile; tp(D,sd.x*TILE+16,sd.y*TILE+28); D._interact(); await w(300); o.sealed=D.floor===0&&game.scene.isActive('Dungeon');
      D._zfVeins.forEach(function(V){ ZFI.mine(D,V); }); var A=D._zfAnvil; tp(D,A.x,A.y+30); D._interact(); await w(300); o.minigame=!!document.getElementById('modal-forgetrial'); document.querySelector('#modal-forgetrial .zft-go').click(); await w(300); o.narrow=ZFT._g.zone<0.2;
      for(var i=0;i<3;i++){ var G=ZFT._g; G.zone=2; G.lock=0; ZFT._hit(D); await w(50); }      /* round 64d: the anvil runs in its own paused pop-up */
      o.key=D._zfKey; document.querySelector('#modal-forgetrial .zft-go').click(); await w(800); tp(D,sd.x*TILE+16,sd.y*TILE+28); D._interact(); await w(5500); o.down=game.scene.getScene('Dungeon').floor; return o; })()""" % (W, F))
    check('The Ember Forge: the way down is rune-locked; three ore and three hammer strokes at Brokkr\'s anvil forge the key (Loki\'s fly narrows the strike); quench troughs cool the heat (%s)' % r.get('key'),
          r['cooled'] and r['quench'] == 0 and r['sealed'] and r['minigame'] and r['narrow'] and r['key'] == 'true' and r['down'] == 1, r)
    r = g.js("""(async()=>{ %s %s ZFORGE.enter(ws,'volcano_e',0); await w(5500); var D=game.scene.getScene('Dungeon'), o={}; calm(D); var T=D._zfTide[0]; o.cells=T.cells.length;
      T.t=0; ZFI.tideTick(D,0.1); o.up=T.up; var B=T.bel; tp(D,B.x,B.y+24); D._interact(); ZFI.tideTick(D,0.1); o.drained=!T.up&&T.hold>9;
      ZFORGE.enter(ws,'volcano_s',0); await w(5500); D=game.scene.getScene('Dungeon'); calm(D); var C=D._zfCart, end=C.seg[C.seg.length-1]; tp(D,C.x,C.y+20); D._interact(); o.riding=D._zfRide&&D._zfRide.on; await w(11000);
      o.rs=[D._zfRide.on,D._zfRide.i,D._zfRide.seg.length,Math.floor(D.px/TILE),Math.floor(D.py/TILE),end]; o.rode=!D._zfRide.on&&Math.abs(Math.floor(D.px/TILE)-end[0])<=1&&Math.abs(Math.floor(D.py/TILE)-end[1])<=1; o.sw=!!D._zfSwitch; return o; })()""" % (W, F))
    check('The Cinder Forge: lava channels rise and fall across the way (%d cells); the bellows hold one drained; the Slag Forge: the ore-cart carries you down the rails (a switch for the spur)' % r['cells'], r['cells'] >= 8 and r['up'] and r['drained'] and r['riding'] and r['rode'] and r['sw'], r)
    r = g.js("""(async()=>{ %s %s ZFORGE.enter(ws,'volcano_w',0); await w(5500); var D=game.scene.getScene('Dungeon'), o={}; calm(D); var sd=D.stairsDownTile; tp(D,sd.x*TILE+16,sd.y*TILE+28); D._interact(); await w(300); o.sealed=D.floor===0&&game.scene.isActive('Dungeon');
      D._forgeSp.slice(0,3).forEach(function(S){ ZFORGE.freeSpirit(D,S); }); o.follow=D._zfFollow.length; tp(D,sd.x*TILE+16,sd.y*TILE+28); D._interact(); o.open=D._zfDoor.opened; D._exitToWorld(null); await w(1200); return o; })()""" % (W, F))
    check('The Ash Forge: a freed toiler follows you (%d); three at your side melt the spirit door over the way down' % r['follow'], r['sealed'] and r['follow'] == 3 and r['open'], r)

    # ── Asgard's citadel ──
    r = g.js("""(async()=>{ %s %s ps.asgardDown=1; ps.bifrost=1; await w(2500); var P=ZASG.plan(ws); ws.player.x=P.cx*TILE+16; ws.player.y=(P.cy+1.5)*TILE+16; await w(300); var t=ws._interactPrompt&&ws._interactPrompt._zt;
      ZCIT.enter(ws,0); await w(6000); var D=game.scene.getScene('Dungeon'), C=D._cit, o={prompt:t, floor:D.floor, hall:C&&C.hall, lenses:C.lenses.length}; calm(D); var L=C.lenses[0]; L.ang=Math.PI/2;
      var x=L.x, y=L.y+TILE*4; tp(D,x,y); o.seen=ZCIT.seen(D,L); var n0=D.monsters.filter(function(m){ return !m.dead; }).length, v0=D._doom.v; ZCIT.alarm(D); o.alarm=D.monsters.filter(function(m){ return !m.dead; }).length>n0&&D._doom.v===v0+1;
      o.broke=ZCIT.breakLens(D,{x:L.x,y:L.y+300},-Math.PI/2); o.broken=L.broken; return o; })()""" % (W, F))
    check('The citadel door opens once the Bifröst stands ("%s"); Heimdall\'s Watch: a lens\'s beam sees you, Gjallarhorn calls the wardens and the Ragnarök track jumps; Godsbane breaks a lens' % r['prompt'],
          r['prompt'] and 'Enter' in r['prompt'] and r['floor'] == 0 and r['lenses'] >= 3 and r['seen'] and r['alarm'] and r['broke'] >= 1 and r['broken'], r)
    r = g.js("""(async()=>{ %s %s ZCIT.enter(ws,1); await w(6000); var D=game.scene.getScene('Dungeon'), C=D._cit, o={braz:C.braziers.length}; calm(D); await w(300);
      var m=ZCIT.spawn(D,'einherjar_berserker',D.px+80,D.py); m.hp=0; if(m._hp!==undefined)m._hp=0; D._monsterDied(m); await w(6600); o.rose=D.monsters.some(function(q){ return !q.dead&&q._risen===1; });
      C.braziers.forEach(function(b){ tp(D,b.x,b.y+24); D._interact(); }); o.lit=ZCIT.lit(D); var m2=ZCIT.spawn(D,'einherjar_archer',D.px+80,D.py); m2.hp=0; if(m2._hp!==undefined)m2._hp=0; D._monsterDied(m2); await w(6600); o.stayed=!D.monsters.some(function(q){ return !q.dead&&q.rid==='einherjar_archer'&&q._risen; }); return o; })()""" % (W, F))
    check('Valhöll: a fallen einherjar rises again while a horn-brazier burns; put the %d braziers out and the fallen stay down' % r['braz'], r['braz'] == 4 and r['rose'] and r['lit'] is False and r['stayed'], r)
    r = g.js("""(async()=>{ %s %s if(ps.inventory.indexOf('lodestar')<0)ps.inventory.push('lodestar'); ZCIT.enter(ws,2); await w(6000); var D=game.scene.getScene('Dungeon'), C=D._cit, o={effs:C.threads.map(function(t){ return t.eff; })}; calm(D);
      var k=C.bridges.span0.cells[4], bx=(k%%DW)*TILE+16, by=Math.floor(k/DW)*TILE+16; o.blocked=!D._canGoD(bx,by); var t0=C.threads.find(function(t){ return t.eff==='span0'; }); ZCIT.cut(D,t0); o.bridge=C.bridges.span0.open&&D._canGoD(bx,by);
      var tw=C.threads.find(function(t){ return t.eff==='wake'; }); ZCIT.cut(D,tw); var woke=C.cuts[C.cuts.length-1].mons; o.woke=woke.length; ZCIT.rewind(D); o.undone=woke.every(function(m){ return m.dead; })&&!tw.opened&&C.rewinds===2;
      var tl=C.threads.find(function(t){ return t.eff==='wall'; }); ZCIT.cut(D,tl); o.wall=C.bridges.wall.open; return o; })()""" % (W, F))
    check('The Hall of the Norns: thread-bridges are shut over the sky until cut; a wrong cut wakes einherjar (%d) and the Lodestar rewinds it ([R], 3 turnings); a thread unravels the loom-wall' % r['woke'],
          sorted(r['effs']) == ['span0', 'span1', 'wake', 'wall'] and r['blocked'] and r['bridge'] and r['woke'] >= 1 and r['undone'] and r['wall'], r)
    r = g.js("""(async()=>{ %s %s ZCIT.enter(ws,3); await w(6000); var D=game.scene.getScene('Dungeon'), C=D._cit, o={size:[DW,DH], upY:D.stairsUpTile.y}; calm(D); var r0=C.rot; C.rotT=99; ZCIT.yggTick(D,0.1); o.rises=C.rot<r0;
      ps.godMode=false; ps.hp=ps.maxHp=500; C.rot=D.stairsUpTile.y-3; tp(D,D.stairsUpTile.x*TILE+16,D.stairsUpTile.y*TILE+16); C.rotHurt=0.59; ZCIT.yggTick(D,0.1); o.hurt=ps.hp<500; ps.godMode=true; ps.hp=ps.maxHp;
      var R=C.rat; tp(D,R.vis.x,R.vis.y); ZCIT.yggTick(D,0.01); o.caught=R.caught; o.top=Math.abs(D.py-R.top.y)<4; return o; })()""" % (W, F))
    check('Yggdrasil (%s): you arrive in the roots (row %d); Grimtooth\'s rot climbs after you and hurts; catching Ratatoskr whisks you up the tree' % (r['size'], r['upY']), r['size'] == [40, 70] and r['upY'] > 50 and r['rises'] and r['hurt'] and r['caught'] and r['top'], r)
    r = g.js("""(async()=>{ %s %s ZCIT.enter(ws,4); await w(6500); var D=game.scene.getScene('Dungeon'), o={names:[]};
      for(var ph=0;ph<3;ph++){ var b=(D._bossGroup||[]).find(function(m){ return !m.dead; }); if(!b){ await w(1600); b=(D._bossGroup||[]).find(function(m){ return !m.dead; }); } if(!b)break; o.names.push(b.def.name); (D._bossGroup||[]).forEach(function(m){ m.dead=true; m.hp=0; }); D._onBossDefeated(b); await w(1600); }
      o.down=ps.grimnirDown; o.forms=BOSS_PHASES.grimnir.phases.map(function(P){ return P.form; }); o.slots=['grim_1','grim_2','grim_3'].every(function(s){ return BOSS_SLOTS[s]&&BOSS_SLOTS[s].length>=3; }); /* round 64: three more (the god options) */ D._exitToWorld(null); await w(1500); return o; })()""" % (W, F))
    check('The Throne of Grímnir: three phases (%s); his look has three Lab options per phase' % ' → '.join(r['names']), len(r['names']) == 3 and ('Masked King' in r['names'][0] or 'Allfather' in r['names'][0]) and r['down'] == 1 and r['slots'], r)
    r = g.js("""(async()=>{ %s %s ZCIT.enter(ws,0); await w(6000); var D=game.scene.getScene('Dungeon'), o={}; calm(D); var n0=D.monsters.filter(function(m){ return !m.dead; }).length; ZDOOM.push(D,3); o.v=D._doom.v; o.lvl=ZDOOM.level(D); o.spawned=D.monsters.filter(function(m){ return !m.dead; }).length>n0;
      o.hud=!!document.getElementById('zdoom')&&document.getElementById('zdoom').style.display!=='none'; D._exitToWorld(null); await w(1200); o.reset=!ps.doomAsg;
      ZMUSP.enter(ws,0); await w(6000); var M=game.scene.getScene('Dungeon'); o.musp=M._doomRealm; o.mheat=ZFI.hot(M); ZFORGE.enter(ws,'volcano_n',0); await w(5500); o.forge=!game.scene.getScene('Dungeon')._doom; game.scene.getScene('Dungeon')._exitToWorld(null); await w(1200); return o; })()""" % (W, F))
    check('The Ragnarök track: ten marks; at mark 3 Fimbulwinter and einherjar walk in; it resets on leaving; Muspelheim has it (and the heat), the four forges do not', r['v'] == 3 and r['lvl'] == 1 and r['spawned'] and r['hud'] and r['reset'] and r['musp'] == 'musp' and r['mheat'] and r['forge'], r)
    r = g.js("""(()=>({roster:['einherjar_berserker','einherjar_shieldmaiden','einherjar_archer','gjallar_warden'].every(function(id){ return MON_BY_ID[id]&&MX.KITS[id]; }), leak:MON_ROSTER.filter(function(R){ return R.seg==='asgard'; }).length}))()""")
    check('Four new Asgard monsters with kits (seg asgard: only in the citadel)', r['roster'] and r['leak'] == 4, r)
    r = g.js("""(async()=>{ %s %s ZCIT.enter(ws,0); await w(6000); var D=game.scene.getScene('Dungeon'); calm(D); var m=ZCIT.spawn(D,'einherjar_archer',D.px+60,D.py); ps.inventory.push('oil_venom'); window._useItem(ps.inventory.lastIndexOf('oil_venom')); m._zpOilT=0; ZHit.dmg(D,m,30,'spell',{}); var h0=m.hp; await w(1800); var o={pois:(m._zpPois||[]).length, ticked:m.hp<h0}; D._exitToWorld(null); await w(1200); return o; })()""" % (W, F))
    check('(Round 61 fix) Nightshade Oil\'s poison now ticks (a stray comment had cut the line)', r.get('ticked'), r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

req = json.load(open(os.path.join(os.path.dirname(__file__), '..', 'sprites', 'requests', 'scenery.json'), encoding='utf8'))
w64 = [q['id'] for q in req['requests'] if q.get('wave') == 64]
check('Ordered (wave 64): the forge-trial pieces, the citadel pieces, the Norns and Grimtooth, Ratatoskr running (%s)' % ', '.join(w64), set(w64) >= {'sc_fr_props', 'sc_ar_props', 'sc_ar_big', 'sc_ar_rat'})
lab = open(os.path.join(os.path.dirname(__file__), '..', 'lab', 'index.html'), encoding='utf8').read()
check('The Lab: the Potions tab shows the painted icons; Grímnir\'s options in the Bosses tab; Grimtooth named on the Realm card', 'pot_heal1' in lab and 'ASGARD_FAMS' in lab and 'Grimtooth' in lab)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
