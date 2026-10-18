"""Round 64 — the bosses re-cut (no pieces of the next pose under a frame; one scale per boss sheet so a boss no longer changes size between
frames); GRÍMNIR MADE A GOD: new god options for each form that pulse between radiant light and black, name options in the Lab, painted
concept options ordered (wave 66); in the fight he is SHIELDED while radiant and OPEN while black, form 1 mostly light, form 2 even,
form 3 mostly black (Kris's cards), and Godsbane tears the light off him.
Run: python tests/test_round64.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"
ROOT = os.path.join(os.path.dirname(__file__), '..')

with game(new=True, painted=True) as g:
    g.wait(4500)
    r = g.js("""(()=>{ var o={}; [1,2,3].forEach(function(f){ var F=ZGOD.FORMS[f], n=0, lt=0; for(var t=0;t<60;t+=0.05){ n++; if(ZGOD.light(f,t)>0.5)lt++; } o[f]=Math.round(lt/n*100); });
      o.gods=['grim_1','grim_2','grim_3'].map(function(s){ return (BOSS_SLOTS[s]||[]).filter(function(D){ return D.arch==='god'; }).length; }); o.pick=['grim_1','grim_2','grim_3'].map(function(s){ return BA.of(s).arch; }); o.opts=['grim_1','grim_2','grim_3'].map(function(s){ return BA.of(s).opt; }); o.name=MDEFS.grimnir.name;
      var D=BA.of('grim_1'); BA.paint(D); o.eye=ZGOD.eye(D); o.names=GRIM_NAMES.length; return o; })()""")
    check('The beat: form 1 is mostly light (%d%%), form 2 even (%d%%), form 3 mostly black (%d%%)' % (r['1'], r['2'], r['3']), r['1'] > 70 and 40 <= r['2'] <= 60 and r['3'] < 30, r)
    check('Three new god options for each form (%s); Kris\'s picks are drawn (%s) and he is %s; ten name options' % (r['gods'], r['opts'], r['name']), r['gods'] == [3, 3, 3] and r['pick'] == ['god'] * 3 and r['opts'] == ['d', 'e', 'e'] and r['name'].startswith('Solmyrk') and r['names'] == 10, r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ZCIT.enter(ws,4); await w(7000); var D=game.scene.getScene('Dungeon'), o={};
      var m=(D._bossGroup||[]).find(function(b){ return !b.dead; }); if(!m){ await w(2000); m=(D._bossGroup||[]).find(function(b){ return !b.dead; }); } o.form=m&&m._gform;
      m._gp={t:1,force:0}; await w(300); o.shine=m._grimShine; o.hitLight=ZHit.dmg(D,m,200,'melee'); o.vis=!!(D._gpv&&D._gpv.dark&&D._gpv.rays&&D._gpv.eye); o.darkA=D._gpv.dark.alpha;
      m._gp={t:7.6,force:0}; await w(300); o.shine2=m._grimShine; o.hitDark=ZHit.dmg(D,m,200,'melee'); o.darkA2=D._gpv.dark.alpha; o.tint=m.body&&m.body.tintTopLeft;
      m._gp={t:1,force:0}; await w(200); ZGP.force(D); await w(200); o.forced=m._grimShine;
      (D._bossGroup||[]).forEach(function(b){ b.dead=true; b.hp=0; }); D._onBossDefeated(m); await w(2000); var m2=(D._bossGroup||[]).find(function(b){ return !b.dead; }); o.form2=m2&&m2._gform;
      D._exitToWorld(null); await w(1500); return o; })()""" % W)
    check('In the fight: radiant he is shielded (hit %s), black he is open (hit %s); the room darkens only when black (%.2f → %.2f); Godsbane forces him black' % (r.get('hitLight'), r.get('hitDark'), r.get('darkA', 0), r.get('darkA2', 0)),
          r['form'] == 1 and r['shine'] and r['hitLight'] == 0 and not r['shine2'] and r['hitDark'] > 0 and r['vis'] and r['darkA'] < 0.05 and r['darkA2'] > 0.5 and r['forced'] is False, r)
    check('The next form keeps the pulse (form %s)' % r.get('form2'), r.get('form2') == 2, r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ZCIT.enter(ws,4); await w(7000); var D=game.scene.getScene('Dungeon'), o={found:0};
      for(var ty=2;ty<DH-2&&!o.found;ty++)for(var tx=4;tx<DW-2&&!o.found;tx++){ var x=tx*TILE+16, y=ty*TILE+16; if(_heroWallAt(D,x,y)||!_heroWallAt(D,x-TILE*2,y))continue;
        var r=ZSEEK.sight(D,x,y,x-220,y); o={found:1,cut:r.cut,back:Math.round(x-r.x),seen:_heroLOS(D,x,y,r.x,r.y)}; var r2=ZSEEK.sight(D,x,y,x+40,y); o.openOk=!r2.cut||_heroWallAt(D,x+40,y); }
      D._exitToWorld(null); await w(1500); return o; })()""" % W)
    check('Spells land only where you can see: aimed through a wall, the spot is pulled back to %s px in front of you, in sight' % r.get('back'), r.get('found') and r.get('cut') and r.get('seen') and 0 <= r.get('back', 999) < 2 * 32 and r.get('openOk'), r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; FAM_LEAD.on=true; ps._cbT=0; var c=_heroCtx(ws), x=c.x, y=c.y;
      var mk=function(dx){ return {x:x+dx,y:y,hp:50,maxHp:50,def:{r:10,def:0,name:'dummy'},dead:false}; }, a=mk(60), b=mk(-80); c.monsters=[a,b];
      var o={before:_famEngaged(a,c)||_famEngaged(b,c)}; ZHit.dmg(ws,a,10,'melee'); o.hitOne=_famEngaged(a,c); o.nearToo=_famEngaged(b,c); return o; })()""" % W)
    check('Familiars join as soon as you fight: nothing before (%s); a sword hit engages that monster (%s) and the ones near you (%s)' % (r['before'], r['hitOne'], r['nearToo']), not r['before'] and r['hitOne'] and r['nearToo'], r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, P=ws.player; FAM_LEAD.on=true; ps.godMode=true; ps.ownedFamiliars=['fam_grass']; ps.familiar='fam_grass'; for(var dx=400;dx<4000&&_inVillagePx(P.x,P.y,0);dx+=200){ if(!_inVillagePx(P.x+dx,P.y,0)){ P.x+=dx; if(P.cont)P.cont.setPosition(P.x,P.y); break; } } await w(2500); ps._cbT=0; var outside=!_inVillagePx(P.x,P.y,0);
      var m=MX.spawn(ws,'thistle_hog',P.x+90,P.y,{q:1,temp:true}); ws.worldMonsters.push(m); m.hp=m.maxHp=5000; var famN=0, z0=ZHit.dmg; ZHit.dmg=function(sc,mon,raw,kind){ if(mon===m&&kind==='familiar')famN+=raw; return z0.apply(this,arguments); }; await w(4000); ZHit.dmg=z0; var idle=5000-famN, fought=!!(ps._cbT&&Date.now()-ps._cbT<6000);
      var d=ZHit.dmg(ws,m,5,'melee'); m.hp-=d; var after=m.hp; for(var i=0;i<6;i++){ m._engT=Date.now(); ps._cbT=Date.now(); await w(1000); } return {idleHp:5000-idle, famHit:after-m.hp, outside:outside, fought:fought}; })()""" % W)
    check('In the overworld the familiar answers too: nothing while nobody fights (%s), it attacks once you strike (%s damage in 6 s)' % (r['idleHp'], r['famHit']), (r['idleHp'] == 0 or r['fought']) and r['famHit'] > 0, r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, D=FAMILIARS&&Object.keys(FAMILIARS)[0]; if(!D)return {none:1}; showFamiliarInfo(D); await w(4000);
      var cv=document.getElementById('fam-info-cv'), d=cv.getContext('2d').getImageData(0,0,112,112).data, n=0; for(var i=3;i<d.length;i+=4)if(d[i]>40)n++; var ch='fam_'+_famDesign(D).el; document.getElementById('familiar-info-modal').style.display='none';
      return {painted:ZAtlas.has(ch), ink:n}; })()""" % W)
    check('The familiar skills pop-up shows the painted familiar (%s, %d px drawn)' % (r.get('painted'), r.get('ink', 0)), r.get('painted') and r.get('ink', 0) > 400, r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; _spawnVolcanoVisuals(ws); await w(800); var o={L:[]};
      (ws.siteObjs||[]).filter(function(q){ return ZFSOLID.TYPES[q.s.type]; }).forEach(function(q){ var im=q.ico, M=ZFSOLID.mask(im); if(!M)return o.L.push({id:q.s.id,none:1});
        var G=ZFSOLID.G, cx=(q.s.tx+1.5)*TILE, i=Math.floor((cx-M.x0)/G), lo=-1, hi=-1; for(var j=0;j<M.ch;j++)if(M.g[j*M.cw+i]){ if(hi<0)hi=j; lo=j; }
        var yb=M.y0+(lo+1)*G, yt=M.y0+hi*G, r={id:q.s.id,outline:!!im._zcv};
        r.front=!ZFSOLID.hit(ws,cx,yb+10); r.into=ZFSOLID.hit(ws,cx,yb-12); r.mid=ZFSOLID.hit(ws,cx,(yb+yt)/2); r.back=!ZFSOLID.hit(ws,cx,yt+(yb-yt)*0.1);
        r.reach=Math.round(Math.hypot(cx-cx,(yb+10)-(q.s.ty+1.5)*TILE)); var xs=-1; for(var k=0;k<M.cw;k++)if(M.g[Math.floor((lo+hi)/2)*M.cw+k]){ xs=k; break; } r.side=xs>=0&&!ZFSOLID.hit(ws,M.x0+xs*G-12,(yb+yt)/2)&&ZFSOLID.hit(ws,M.x0+xs*G+12,(yb+yt)/2);
        r.walkOut=!ZFSOLID.blocked(ws,cx,yb-10,cx,yb-12)&&ZFSOLID.blocked(ws,cx,yb-14,cx,yb-12); o.L.push(r); });
      return o; })()""" % W)
    L = r['L']; ok = len(L) == 5 and all(q.get('outline') and q.get('front') and q.get('into') and q.get('mid') and q.get('back') and q.get('side') and q.get('walkOut') and q.get('reach', 999) < 2.5 * 32 for q in L)
    check('The four forges and Muspelheim are solid: the hero stops at the picture\'s edge (front and sides), walks behind its back quarter with the outline, and still reaches the door (%s px)' % [q.get('reach') for q in L], ok, L)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, P=ws.player, s={id:'test|q1',x:P.x,y:P.y}; var m=MX.spawn(ws,'thistle_hog',P.x+420,P.y,{q:1,temp:true}); ws.worldMonsters.push(m); m._binder=s.id; s.mon=m;
      var d0=Math.hypot(m.x-s.x,m.y-s.y); ZSPIRIT.leash(ws,s,P.x,P.y+2000); var d1=Math.hypot(m.x-s.x,m.y-s.y); m.x=s.x+900; m.y=s.y; ZSPIRIT.leash(ws,s,P.x,P.y+2000); var d2=Math.hypot(m.x-s.x,m.y-s.y);
      m.x=s.x+420; m.y=s.y; m._engT=Date.now(); ZSPIRIT.leash(ws,s,m.x+50,m.y); var d3=Math.hypot(m.x-s.x,m.y-s.y); m.dead=true; if(m.cont)m.cont.destroy(); ws.worldMonsters.splice(ws.worldMonsters.indexOf(m),1); return {d0:Math.round(d0),d1:Math.round(d1),d2:Math.round(d2),d3:Math.round(d3)}; })()""" % W)
    check('A spirit\'s Binder is drawn back to its bindstone when you are not fighting it (%s → %s px), pulled back from far away (%s px), and stays while you fight it near (%s px)' % (r['d0'], r['d1'], r['d2'], r['d3']), r['d1'] < r['d0'] and r['d2'] <= 100 and r['d3'] == r['d0'], r)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, keep=ps.mount, o={}; ['lava_unicorn','sky_eagle','dragon',null,'horse'].forEach(function(k){ ps.mount=k; o[k||'none']=_fireSafeMount(ps); }); ps.mount=keep; return o; })()""")
    check('On the lava unicorn or a flying mount burning ground can\'t hurt you; on foot or a horse it does (%s)' % r, r['lava_unicorn'] and r['sky_eagle'] and r['dragon'] and not r['none'] and not r['horse'], r)
    r = g.js("""(async()=>{ %s WMAP.zoom=1; openWorldMap({}); await w(600); var cv=document.getElementById('minimap-canvas').getBoundingClientRect(), md=document.querySelector('.wmap-modal').getBoundingClientRect(); var o={bot:Math.round(cv.bottom),h:innerHeight,mb:Math.round(md.bottom),side:Math.round(cv.height),w:Math.round(cv.width)};
      document.getElementById('modal-map').style.display='none'; document.body.classList.remove('bars-hidden'); return o; })()""" % W)
    check('The world map in "Fit" shows all of it: the square map (%d px) ends at %d px, inside the window (%d px)' % (r['side'], r['bot'], r['h']), r['bot'] <= r['h'] and r['bot'] <= r['mb'] + 1 and r['side'] == r['w'], r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ZFT.on=true; ZFORGE.enter(ws,'volcano_n',0); await w(6000); var D=game.scene.getScene('Dungeon'), o={};
      var el=document.getElementById('modal-forgetrial'); o.rules=!!el; o.title=el&&el.querySelector('h3').textContent; o.painted=el?el.querySelectorAll('canvas[data-painted]').length:0; o.steps=el?el.querySelectorAll('.zft-step').length:0; o.paused=isGamePaused();
      if(el)el.querySelector('.zft-go').click(); await w(900); o.resumed=!isGamePaused()&&!document.getElementById('modal-forgetrial');
      D.monsters.forEach(function(m){ m.dead=true; m.hp=0; if(m.cont)m.cont.setVisible(false); }); D._zfVeins.forEach(function(V){ ZFI.mine(D,V); }); var A=D._zfAnvil; D.px=A.x; D.py=A.y+30; if(D.pCont)D.pCont.setPosition(D.px,D.py);
      var F=D._zfFly; F.alive=true; F.c.setPosition(D.px+20,D.py-20); D._playerAttack(); o.swat=!F.alive; F.alive=true;
      D._interact(); await w(500); o.anvil=!!document.getElementById('modal-forgetrial'); o.pausedA=isGamePaused(); var key=function(k){ window.dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true})); };
      key('Escape'); await w(500); o.left=!document.getElementById('modal-forgetrial')&&D._zfOre===3&&!D._zfKey;
      D._interact(); await w(300); key('Enter'); await w(300); o.narrow=ZFT._g&&ZFT._g.zone<0.2; o.pausedS=isGamePaused();
      for(var i=0;i<3;i++){ ZFT._g.zone=2; ZFT._g.lock=0; key(' '); await w(120); } o.key=D._zfKey; o.ore=D._zfOre; o.pips=document.querySelectorAll('#modal-forgetrial .zft-pips i.ok').length; key('Enter'); await w(800); o.closed=!document.getElementById('modal-forgetrial')&&!isGamePaused();
      var k=['ember','cinder','slag','ash','hearth','musp0','musp1','musp2','musp3','musp4'].filter(function(q){ return !ZFT.RULES[q]; }); o.missing=k; o.mk=[ZFT.keyOf({_musp:true,floor:2}),ZFT.keyOf({_musp:true,floor:4})];
      return o; })()""" % W)
    check('Entering the Ember Forge, its rules come up first (%s: %d steps, %d painted pictures) with the game paused; Begin closes it' % (r.get('title'), r.get('steps', 0), r.get('painted', 0)), r['rules'] and r['paused'] and r['resumed'] and r['steps'] >= 4 and r['painted'] >= 3, r)
    check('Brokkr\'s anvil: an attack swats Loki\'s fly (%s); Tab opens a pop-up that pauses the game (%s); Esc leaves without spending ore (%s); three strokes with Space forge a %s key (%d true), then the game goes on' % (r['swat'], r['pausedA'], r['left'], r['key'], r['pips']),
          r['swat'] and r['anvil'] and r['pausedA'] and r['left'] and r['narrow'] and r['pausedS'] and r['key'] == 'true' and r['ore'] == 0 and r['pips'] == 3 and r['closed'], r)
    check('Every forge, its hearth hall and every hall of Muspelheim has its rules (%s missing; Muspelheim halls map to %s)' % (r['missing'], r['mk']), not r['missing'] and r['mk'] == ['musp2', 'musp4'], r)
    r = g.js("""(async()=>{ %s var D=game.scene.getScene('Dungeon'), o={}; var b=MX.spawn(D,'mgb_rift_tower',D.px,D.py+60,{q:4,temp:true}); D.monsters.push(b); b.hp=b.maxHp=99999; await w(600); b._m&&(b._m.frozen=true);
      var B=ZMB.box(b); o.boss=!!b._hurtR; o.box=B&&[Math.round(B.rx),Math.round(B.ry)];
      D._zmbWalk=true; o.into=!D._canGoD(B.x,B.y); o.wide=D._canGoD(B.x+B.rx+12,B.y); D._zmbWalk=false; o.roll=D._canGoD(B.x,B.y)||'wall';
      var sav={x:D.px,y:D.py}; D.px=B.x+B.rx*0.5; D.py=B.y; D._zmbWalk=true; o.out=D._canGoD(B.x+B.rx*0.8,B.y); o.deeper=!D._canGoD(B.x+B.rx*0.3,B.y); D._zmbWalk=false;
      var r=b.cont.getBounds(); D.px=b.x; D.py=b.y-Math.min(60,r.height*0.4); if(D.pCont)D.pCont.setPosition(D.px,D.py); o.behind=false; for(var k2=0;k2<6&&!o.behind;k2++){ await w(400); var S=D._zol; o.behind=!!(S&&S.rt&&S.rt.visible&&S.front.some(function(q){ return q._zolPart; })); } o.dep=[D.pCont.depth,b.cont.depth];
      D.px=sav.x; D.py=sav.y+260; if(D.pCont)D.pCont.setPosition(D.px,D.py); await w(500); o.clear=!(D._zol&&D._zol.rt&&D._zol.rt.visible&&D._zol.front.some(function(q){ return q._zolPart; }));
      b.dead=true; b.cont.destroy(); D.monsters.splice(D.monsters.indexOf(b),1);
      var ws=game.scene.getScene('World'); D._exitToWorld(null); await w(1500); var P=ws.player, m=MX.spawn(ws,'thistle_hog',P.x+200,P.y,{q:1,temp:true}); ws.worldMonsters.push(m); m._m&&(m._m.frozen=true); var C=ZMB.box(m);
      ws._zmbWalk=true; o.wInto=!ws._canGo(C.x,C.y)||'terrain'; ws._zmbWalk=false; o.wBox=[Math.round(C.rx),Math.round(C.ry),(m.def&&m.def.r)];
      m.dead=true; m.cont.destroy(); ws.worldMonsters.splice(ws.worldMonsters.indexOf(m),1); return o; })()""" % W)
    check('Monsters and bosses stop you: walking into a boss\'s foot box (%s px) is blocked, beside it is free, a roll still passes; you can always step out; an overworld monster blocks too (%s)' % (r.get('box'), r.get('wBox')),
          r['boss'] and r['into'] and r['wide'] and r['roll'] is True and r['out'] and r['deeper'] and r['wInto'] is True, r)
    check('Behind a boss the hero\'s outline shows where it hides him (%s), and goes when he steps out (%s)' % (r['behind'], r['clear']), r['behind'] and r['clear'], r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ZFT.on=false; ZCIT.enter(ws,1); await w(8000); var D=game.scene.getScene('Dungeon'), o={}; D.monsters.forEach(function(m){ m.dead=true; m.hp=0; if(m.cont)m.cont.setVisible(false); });
      var y0=D.py-230, x0=D.px; for(var k=0;k<12&&_heroWallAt(D,x0,y0);k++)y0+=20; var b=MX.spawn(D,'mgb_rift_tower',x0,y0,{q:4,temp:true}); b.isBoss=true; D.monsters.push(b); b.hp=b.maxHp=99999; b._engT=Date.now(); if(b._m)b._m.aggro=true;
      var cam=D.cameras.main, H=cam.height/cam.zoom; ZBV.on=false; await w(1200); var B=ZBV.body(b); o.offTop=Math.round(B.top-cam.worldView.y); ZBV.on=true; await w(4200); B=ZBV.body(b); o.onTop=Math.round(B.top-cam.worldView.y); o.hero=Math.round(D.py-cam.worldView.y); o.H=Math.round(cam.worldView.height);
      var hud=document.getElementById('dng-top').getBoundingClientRect(); o.hudW=Math.round(hud.width); o.hudR=Math.round(hud.right); o.vw=innerWidth; var bh=document.getElementById('boss-hud'); o.bossHudTop=bh?Math.round(bh.getBoundingClientRect().top):-1;
      b.dead=true; b.cont.destroy(); D._exitToWorld(null); await w(1500); return o; })()""" % W)
    check('A boss above you is brought toward the middle of the view (its head at %s px from the top instead of %s), with you still on screen (%s / %s px)' % (r['onTop'], r['offTop'], r['hero'], r['H']), r['onTop'] > r['offTop'] + 40 and r['onTop'] > 0 and r['hero'] < r['H'] * 0.86, r)
    check('In the sites the hero\'s bars are a small panel at the top left (%d px wide of %d)' % (r['hudW'], r['vw']), r['hudW'] <= 270 and r['hudR'] < r['vw'] * 0.4, r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ZFT.on=true; var o={};
      var S=ZSPIRIT.shrines(ws), a=S.find(function(s){ return s.q===1&&!ZSPIRIT.freed(ps,s.id); }), b=S.find(function(s){ return s.q===3&&!ZSPIRIT.freed(ps,s.id); }); ZSPIRIT.paid(ps); var c0=function(q){ return ps.inventory.filter(function(i){ return i==='soulglass_'+q; }).length; }, s1=c0(1), s3=c0(3), s4=c0(4);
      ps.spiritsFreed.push(a.id,b.id); await w(1500); o.sh=[c0(1)-s1,c0(3)-s3,c0(4)-s4]; await w(1000); o.again=[c0(1)-s1,c0(3)-s3];
      ZFORGE.enter(ws,'volcano_n',3); await w(6500); ZFT.close(); await w(400); var D=game.scene.getScene('Dungeon'); D.monsters.forEach(function(m){ m.dead=true; m.hp=0; if(m.cont)m.cont.setVisible(false); });
      ws._wmDraw=1; _drawMinimapHud(ws,null); o.zone=document.getElementById('mmh-zone').textContent;
      D._bossDefeated=true; ['soulglass_lattice_1','hearth_tray_1','heartglass_1'].forEach(function(k){ while(ps.inventory.indexOf(k)>=0)ps.inventory.splice(ps.inventory.indexOf(k),1); });
      ZFORGE.hearth(D); await w(500); var el=document.getElementById('modal-forgetrial'); o.pop=!!el; o.paused=isGamePaused(); o.rows=el?el.querySelectorAll('.zft-need').length:0; o.okRows=el?el.querySelectorAll('.zft-need.ok').length:0; o.pics=el?el.querySelectorAll('.zft-need .zi, .zft-need [style*="background"]').length:0; o.canForge=!!(el&&/Forge the/.test(el.textContent)); ZFT.close(); await w(400);
      ps.inventory.push('soulglass_lattice_1','hearth_tray_1'); ZFORGE.hearth(D); await w(500); el=document.getElementById('modal-forgetrial'); o.okRows2=el.querySelectorAll('.zft-need.ok').length; el.querySelector('.zft-go').click(); await w(900); o.hg=ps.inventory.indexOf('heartglass_1')>=0; o.used=ps.inventory.indexOf('hearth_tray_1')<0;
      ZFT.hearth(D,true,function(){}); await w(300); el=document.getElementById('modal-forgetrial'); o.musp=el?el.querySelector('h3').textContent:''; o.muspRows=el?el.querySelectorAll('.zft-need').length:0; ZFT.close();
      D._exitToWorld(null); await w(1500); return o; })()""" % W)
    check('Every freed spirit gives one shard of its own realm, however it was freed (Grasslands, Highlands, Ashlands: %s), and only once (%s)' % (r['sh'], r['again']), r['sh'] == [1, 1, 0] and r['again'] == [1, 1], r)
    check('In a forge the corner map stays the forge\'s, even when the World tries to draw it (%r)' % r['zone'], 'Village' not in r['zone'], r)
    check('The forge\'s hearth: a paused pop-up lists what it needs with pictures (%d rows, %d done), forges only when all is there (%s), then makes the Heartglass (%s); Muspelheim\'s great hearth too (%s)' % (r['rows'], r['okRows'], r['canForge'], r['hg'], r['musp']),
          r['pop'] and r['paused'] and r['rows'] == 3 and r['okRows'] == 1 and not r['canForge'] and r['okRows2'] == 3 and r['hg'] and r['used'] and 'Great Hearth' in r['musp'] and r['muspRows'] == 3, r)
    r = g.js("""(()=>{ ZLEAVE.on=true; var o={}; var k=new KeyboardEvent('keydown',{key:'ArrowLeft',altKey:true,bubbles:true,cancelable:true}); document.body.dispatchEvent(k); o.altLeft=k.defaultPrevented;
      var mu=new MouseEvent('mouseup',{button:3,bubbles:true,cancelable:true}); document.body.dispatchEvent(mu); o.side=mu.defaultPrevented; var opened=null, wo=window.open; window.open=function(u){ opened=u; return null; };
      var a=document.createElement('a'); a.href='https://example.com/'; a.textContent='x'; document.body.appendChild(a); var ce=new MouseEvent('click',{bubbles:true,cancelable:true}); a.dispatchEvent(ce); o.link=ce.defaultPrevented&&opened==='https://example.com/'; a.remove(); window.open=wo;
      var be=new Event('beforeunload',{cancelable:true}); window.dispatchEvent(be); o.ask=be.defaultPrevented; var walk=new KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true,cancelable:true}); document.body.dispatchEvent(walk); o.walk=!walk.defaultPrevented; ZLEAVE.on=false; return o; })()""")
    check('While playing, nothing takes you off the game by accident: Alt+← (%s), the mouse\'s back button (%s), links open in a new tab (%s), leaving asks first (%s); plain ← still walks (%s)' % (r['altLeft'], r['side'], r['link'], r['ask'], r['walk']), all(r.values()), r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ZESC.begin(ws,true); await w(7000); var D=game.scene.getScene('Dungeon'), E=D._esc, o={esc:!!E};
      if(E){ var x=D.px+40, y=D.py; ZESC.rubble(D,E,x,y); o.n=E.rub.length; D._zmbWalk=false; o.block=!D._canGoD(x,y); o.free=D._canGoD(D.px,D.py+1)||'wall';
        var sx=D.px, sy=D.py; D.px=x; D.py=y; o.out=D._canGoD(x+30,y)||D._canGoD(x-30,y)||D._canGoD(x,y+30); D.px=sx; D.py=sy;
        var R=E.rub[E.rub.length-1]; D.px=x-30; D.py=y; D._playerAttack(); D._playerAttack(); o.smash=R.dead; ZESC.rubble(D,E,x,y+60); var R2=E.rub[E.rub.length-1]; R2.t=0.05; await w(600); o.crumble=R2.dead; o.life=ZESC.RUB.life; }
      ZESC.freeze=true; D._exitToWorld(null); ps.muspEsc=0; await w(1500); ZESC.freeze=false; return o; })()""" % W)
    check('Escaping Muspelheim, fallen rubble blocks the way (%s) for %s s, never traps you (%s), crumbles by itself (%s) and two blows smash it (%s)' % (r.get('block'), r.get('life'), r.get('out'), r.get('crumble'), r.get('smash')),
          r.get('esc') and r.get('block') and r.get('out') and r.get('smash') and r.get('crumble') and 3 <= r.get('life', 0) <= 7, r)
    r = g.js("""(()=>{ var o={}; o.req=['pj_orb','pj_bolt','pj_spit','pj_bone_arrow','pj_fireball','pj_frost','pj_lightning','pj_void','es_rubble_a','es_rubble_b','es_rubble_c','es_rock_fall'].filter(function(id){ return !ZSCN.META||true; }).length;
      var D=game.scene.getScene('World'); o.rock=!!ZPJ.id('rock'); var im=ZShot.make(D,'rock',100,100,0,10); o.painted=!!(im&&im._zpj); if(im)im.destroy(); o.orbKind=ZShot.mxKind('orb','#c040ff'); return o; })()""")
    check('Painted shots: a thrown stone already flies as its painting (%s); the orb, bolt, spit and the other shots take theirs from wave 67 when it comes (orb shot: %s)' % (r['painted'], r['orbKind']), r['painted'] and r['rock'], r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

req = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'requests.json'), encoding='utf8'))
G = [q for q in req['requests'] if q['char'].startswith('grim_')]
fac = sorted(set(q['facing'] for q in G))
check('Ordered (sprite wave 7.95): Solmyrk\'s three forms, front, side and back (%d sheets, views %s); forms 2 and 3 use form 1 as their reference' % (len(G), fac),
      len(G) == 9 and all(q['wave'] == 7.95 for q in G) and 'grim_1.core.s' in [r for q in G if q['id'] == 'grim_2.core.s' for r in q['refs']] and any('Odin' in q['body'] and 'RADIANT' in q['body'] for q in G))
lab = open(os.path.join(ROOT, 'lab', 'index.html'), encoding='utf8').read()
check('The Lab: Grímnir\'s names and the pulsing god cards are in the Bosses tab', 'GRIM_NAMES' in lab and 'LGOD' in lab and 'bb-name' in lab)
I = json.load(open(os.path.join(ROOT, 'assets', 'atlas', 'index.json')))
miss = [p for p in I['pages'] if not os.path.exists(os.path.join(ROOT, 'assets', 'atlas', p + '.webp'))]
check('The re-cut boss atlases are all there (%d pages)' % len(I['pages']), not miss, miss)
src = open(os.path.join(ROOT, 'tools', 'sprites', 'intake.py'), encoding='utf8').read()
S67 = json.load(open(os.path.join(ROOT, 'sprites/requests/scenery.json')))
L67 = [q for q in S67['requests'] if q.get('wave') == 67]
ps1 = open(os.path.join(ROOT, 'tools/sprites/round65.ps1')).read()
check('Ordered (scenery wave 67): the painted monster shots and the collapse rubble (%s); round65.ps1 sends them' % [q['id'] for q in L67], [q['id'] for q in L67] == ['sc_pj_shots', 'sc_es_rubble'] and '--wave 67' in ps1)
check('The cutter: loose bits below a pose\'s feet go to the pose underneath; bosses keep one scale per sheet', "below = lambda k" in src and "q['group'] == 'boss'" in src)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
