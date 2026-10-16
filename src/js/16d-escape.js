// ═══════════════════════════════════════════════════════════════════════
// ║ 16d-escape.js — round 59: MUSPELHEIM FALLS (docs/28 §6, "the escape (in game, not a cut-scene)").
// ║ Kris (Oct 15 card): a DEDICATED ESCAPE RUN — five short collapsing floors built for the run, one timer for the whole climb, then the sinking
// ║ causeway; the timer kills you and you go back to the start of the climb to try again (wave 3 answer).
// ║  · It starts the moment the Lodestar is made at the great hearth: the mountain's heart is taken and it begins to fall.
// ║  · Five floors, bottom to top: the Throne Cavern, the Falling Bridges, the Ash-warden Fortress, the Lava Rafts, the Chain Lifts — each a
// ║    winding run (07zx ZSP layouts 'musp_escape'), the way back gone. Behind you the floor cracks and turns to lava (a front that follows the
// ║    path); rocks fall ahead (a shadow, then the hit); the freed spirits of Muspelheim trail after you. One timer for all five (by difficulty
// ║    150 / 120 / 100 / 85 s). Caught by the lava: hurt and thrown forward. Out of time, or out of health: back to the bottom, the timer full.
// ║  · Out of the gate: the CAUSEWAY sinks behind you — the island first, then the walkway, tile by tile into lava and then the sea. Caught:
// ║    hurt, and back to the gate to run it again (the climb is not repeated). On the mainland: Muspelheim sinks (a short cut-scene), and
// ║    Asgard comes down onto Mirror Lake (16e).
// ║ State: ps.muspEsc 1 = the climb, 2 = the causeway, 3 = done; ps.muspEscT the time left; ps.muspSunk once the mountain is gone.
// ═══════════════════════════════════════════════════════════════════════
var ZESC={ on:true, FLOORS:5, TIME:[150,120,100,85], FRONT:[2.6,3.2,3.6,4.0], CW:[3.0,3.6,4.1,4.6],
  HALLS:['The Throne Cavern falls','The Falling Bridges break','The Fortress burns','The Lava Rafts sink','The Chain Lifts snap'],
  total:function(ps){ var lv=typeof ZDiff!=='undefined'?ZDiff.lv(ps):1; return ZESC.TIME[lv]||120; },
  lv:function(ps){ return typeof ZDiff!=='undefined'?ZDiff.lv(ps):1; },
  site:function(){ return {id:'musp_escape',type:'dungeon',section:4,design:'musp_escape',escape:true,name:'Muspelheim falls',floors:ZESC.FLOORS}; },
  // ── the climb ──
  begin:function(ws,quiet){ var ps=ws.playerState; ps.muspEsc=1; ps.muspEscT=ZESC.total(ps); ps.hp=Math.max(ps.hp||1,Math.round((ps.maxHp||30)*0.6));
    if(!quiet)showNotif('🌋 The mountain groans — its heart is taken. MUSPELHEIM IS FALLING. RUN!','#ff6030');
    document.getElementById('hud').style.display='none'; document.getElementById('dungeon-hud').style.display='block';
    if(game.scene.isPaused('World'))game.scene.resume('World'); if(!game.scene.isSleeping('World'))game.scene.sleep('World'); if(game.scene.isActive('Dungeon')||game.scene.isPaused('Dungeon'))game.scene.stop('Dungeon');
    game.scene.start('Dungeon',{site:ZESC.site(),floor:0,maxFloors:ZESC.FLOORS+1,worldScene:ws,theme:'volcano',floorStates:{}}); },
  // the path's distances from the way in (over every tile you can stand on)
  build:function(sc){ var ps=sc.worldScene.playerState, W=DW, H=DH, D=new Int32Array(W*H).fill(-1), up=sc.stairsUpTile||{x:Math.floor(sc.px/TILE),y:Math.floor(sc.py/TILE)}, q=[up.y*W+up.x], h=0, mx=0; D[q[0]]=0;
    while(h<q.length){ var k=q[h++], x=k%W, y=(k/W)|0; for(var d=0;d<4;d++){ var xx=x+(d===0?1:d===1?-1:0), yy=y+(d===2?1:d===3?-1:0); if(xx<0||yy<0||xx>=W||yy>=H)continue; var n=yy*W+xx; if(D[n]<0&&(sc.dtiles[yy]||[])[xx]!==DNG.WALL){ D[n]=D[k]+1; if(D[n]>mx)mx=D[n]; q.push(n); } } }
    var order=[]; for(var i=0;i<W*H;i++)if(D[i]>=0)order.push(i); order.sort(function(a,b){ return D[a]-D[b]; });
    var lv=ZESC.lv(ps); sc._esc={D:D,max:mx,order:order,oi:0,ci:0,front:-ZESC.FRONT[lv]*4,spd:ZESC.FRONT[lv],gone:new Uint8Array(W*H),rockT:2,rocks:[],trail:[],sp:[],hurtT:0,shake:3,
      lava:sc.add.graphics().setDepth(0.62), glow:sc.add.graphics().setDepth(0.63).setBlendMode(Phaser.BlendModes.ADD), crack:sc.add.graphics().setDepth(0.64)};
    sc.tweens.add({targets:sc._esc.glow,alpha:{from:0.4,to:1},duration:600,yoyo:true,repeat:-1});
    ZESC.hud(true); ZESC.spirits(sc); sc.cameras.main.shake(600,0.006); var tt=document.getElementById('dng-title'); if(tt)tt.textContent='🌋 Muspelheim falls — floor '+(sc.floor+1)+' / '+ZESC.FLOORS;
    showNotif('🌋 '+ZESC.HALLS[sc.floor]+' — floor '+(sc.floor+1)+' / '+ZESC.FLOORS+(sc.floor===0?' · the way up is ahead':''),'#ff8040'); },
  // the freed spirits of Muspelheim follow you up (six of them, their own pictures)
  spirits:function(sc){ var E=sc._esc, ps=sc.worldScene.playerState, L=(ps.muspFreed||[]).slice(0,6), pics=[];
    for(var h=0;h<4;h++)ZMUSP.spiritsFor(h).forEach(function(S){ if(L.indexOf(S.id)>=0&&S.pic)pics.push(S.pic); });
    if(!pics.length&&typeof ZSPIRIT40!=='undefined')pics=ZSPIRIT40.slice(0,4).map(function(r){ return r[0]; });
    pics.slice(0,6).forEach(function(p,i){ var o=typeof ZSPM!=='undefined'?ZSPM.make(sc,'sp_u_'+p+'_free',sc.px-20-i*14,sc.py+6,'free',{depth:sc.py/1e4+5}):null;
      if(!o){ o=sc.add.circle(sc.px-20-i*14,sc.py,6,0x9fe8ff,0.8).setBlendMode(Phaser.BlendModes.ADD); }
      o.setAlpha(0.85); E.sp.push(o); }); },
  hud:function(on){ var el=document.getElementById('esc-hud'); if(!on){ if(el)el.remove(); return; }
    if(!el){ el=document.createElement('div'); el.id='esc-hud'; el.style.cssText='position:fixed;top:118px;left:50%;transform:translateX(-50%);z-index:60;pointer-events:none;background:rgba(30,6,2,.82);border:2px solid #ff6030;border-radius:10px;padding:5px 16px;color:#ffd0a0;font:700 14px "Segoe UI",sans-serif;text-align:center;min-width:260px;box-shadow:0 0 18px rgba(255,80,20,.5)';
      el.innerHTML='<div id="esc-hud-t"></div><div style="height:6px;background:#3a1008;border-radius:3px;margin-top:4px"><div id="esc-hud-b" style="height:100%;background:linear-gradient(90deg,#ff3010,#ffb040);border-radius:3px;width:100%"></div></div>'; document.body.appendChild(el); } },
  hudSet:function(t,tot,txt){ var a=document.getElementById('esc-hud-t'), b=document.getElementById('esc-hud-b'); if(!a)return; var s=Math.max(0,Math.ceil(t)); a.textContent='🌋 '+txt+' — '+Math.floor(s/60)+':'+('0'+s%60).slice(-2); b.style.width=Math.max(0,Math.min(100,t/tot*100))+'%'; a.style.color=t<20?'#ff7050':'#ffd0a0'; },
  tick:function(sc,dt){ var E=sc._esc; if(!E||sc._escDone)return; dt=Math.min(dt,0.25); var ps=sc.worldScene.playerState, W=DW;
    if(!ZESC.freeze)ps.muspEscT=(ps.muspEscT||0)-dt; ZESC.hudSet(ps.muspEscT,ZESC.total(ps),ZESC.HALLS[sc.floor]+' ('+(sc.floor+1)+'/'+ZESC.FLOORS+')');
    if(ps.muspEscT<=0){ ZESC.fail(sc,'time'); return; }
    // the front: cracks two tiles ahead of it, lava behind it
    if(!ZESC.freeze)E.front+=E.spd*dt;
    while(E.ci<E.order.length&&E.D[E.order[E.ci]]<E.front+2){ var k=E.order[E.ci++], p={x:(k%W)*TILE+TILE/2,y:Math.floor(k/W)*TILE+TILE/2}, r=((k*9301+49297)%233280)/233280; E.crack.lineStyle(2,0x120808,0.85); E.crack.lineBetween(p.x-11,p.y-7+r*4,p.x+1,p.y+2); E.crack.lineBetween(p.x+1,p.y+2,p.x+11,p.y-6); E.crack.lineBetween(p.x-2,p.y+11,p.x+1,p.y+2); }
    while(E.oi<E.order.length&&E.D[E.order[E.oi]]<E.front){ var k2=E.order[E.oi++], p2={x:(k2%W)*TILE+TILE/2,y:Math.floor(k2/W)*TILE+TILE/2}, r2=((k2*7919+31)%1000)/1000; E.gone[k2]=1;
      E.lava.fillStyle(0xd84a10,1).fillRect(p2.x-TILE/2,p2.y-TILE/2,TILE,TILE); E.lava.fillStyle(0x7a1c06,0.55).fillEllipse(p2.x-6+r2*12,p2.y-6+r2*10,14+r2*10,8+r2*6); E.glow.fillStyle(0xffc040,0.35).fillEllipse(p2.x+6-r2*12,p2.y+4-r2*8,10+r2*8,5+r2*4);
      if(r2<0.12&&sc.cameras.main.worldView.contains(p2.x,p2.y)){ var s=sc.add.rectangle(p2.x,p2.y,7,7,0x3a2a2a).setDepth(0.95); sc.tweens.add({targets:s,y:p2.y+30,alpha:0,angle:160,duration:600,onComplete:function(){ this.targets[0].destroy(); }}); } }
    // caught by the lava: hurt, and thrown forward past the front
    var tk=Math.floor(sc.px/TILE)+Math.floor(sc.py/TILE)*W, hd=E.D[tk];
    if(hd>=0&&hd<E.front&&!(E.hurtT>0)){ E.hurtT=1.2; var dmg=ps.godMode?0:Math.max(1,Math.round((ps.maxHp||30)*0.2)); ps.hp=Math.max(0,(ps.hp||0)-dmg); sc.cameras.main.shake(300,0.01);
      var want=E.front+4, best=null, bd=1e9; for(var i=0;i<E.order.length;i++){ var kk=E.order[i]; if(E.D[kk]<want)continue; if(E.D[kk]>want+3)break; var dx=(kk%W)*TILE+TILE/2-sc.px, dy=Math.floor(kk/W)*TILE+TILE/2-sc.py, dd=dx*dx+dy*dy; if(dd<bd){ bd=dd; best=kk; } }
      if(best!==null){ sc.px=(best%W)*TILE+TILE/2; sc.py=Math.floor(best/W)*TILE+TILE/2; }
      showNotif('🔥 The floor gives way under you — you leap ahead, burned!','#ff7040'); if(sc._updateDungeonHUD)sc._updateDungeonHUD(); if(ps.hp<=0){ ZESC.fail(sc,'fell'); return; } }
    if(E.hurtT>0)E.hurtT-=dt;
    // falling rocks ahead of you
    E.rockT-=dt; if(E.rockT<=0&&hd>=0){ E.rockT=1.1+Math.random()*0.8; var lo=hd+2, hi=hd+8, cand=[]; for(var j=E.oi;j<E.order.length&&cand.length<60;j++){ var kq=E.order[j]; if(E.D[kq]<lo)continue; if(E.D[kq]>hi)break; cand.push(kq); }
      if(cand.length){ var kr=cand[Math.floor(Math.random()*cand.length)], rx=(kr%W)*TILE+TILE/2+(Math.random()-0.5)*16, ry=Math.floor(kr/W)*TILE+TILE/2, sh=sc.add.ellipse(rx,ry,10,5,0x000000,0.45).setDepth(0.96);
        sc.tweens.add({targets:sh,scaleX:5,scaleY:5,duration:900}); E.rocks.push({x:rx,y:ry,t:0.9,sh:sh}); } }
    E.rocks=E.rocks.filter(function(R){ R.t-=dt; if(R.t>0)return true; R.sh.destroy(); var b=sc.add.circle(R.x,R.y-40,10,0x4a3a3a).setDepth(R.y/1e4+6); sc.tweens.add({targets:b,y:R.y,duration:120,onComplete:function(){ b.destroy(); for(var n=0;n<6;n++){ var c=sc.add.circle(R.x,R.y,3,0x5a4a4a).setDepth(R.y/1e4+6); sc.tweens.add({targets:c,x:R.x+(Math.random()-0.5)*50,y:R.y-10-Math.random()*20,alpha:0,duration:500,onComplete:function(){ this.targets[0].destroy(); }}); } }});
      if(Math.hypot(sc.px-R.x,sc.py-R.y)<26&&!ps.godMode){ var d2=Math.max(1,Math.round((ps.maxHp||30)*0.08)); ps.hp=Math.max(0,(ps.hp||0)-d2); sc.cameras.main.shake(160,0.008); showNotif('🪨 A falling rock! -'+d2,'#ffa070'); if(sc._updateDungeonHUD)sc._updateDungeonHUD(); if(ps.hp<=0)ZESC.fail(sc,'fell'); }
      else sc.cameras.main.shake(90,0.003); return false; });
    // the rumble; the spirits follow the path you ran
    E.shake-=dt; if(E.shake<=0){ E.shake=2.5+Math.random()*2; sc.cameras.main.shake(350,0.004); }
    var tr=E.trail; if(!tr.length||Math.hypot(tr[tr.length-1].x-sc.px,tr[tr.length-1].y-sc.py)>12){ tr.push({x:sc.px,y:sc.py}); if(tr.length>80)tr.shift(); }
    E.sp.forEach(function(o,i){ var p=tr[Math.max(0,tr.length-6-i*5)]; if(!p)return; if(o._m){ ZSPM.goTo(o,p.x,p.y+6,240); o.setDepth(p.y/1e4+5); } else { o.x+=(p.x-o.x)*Math.min(1,dt*4); o.y+=(p.y-o.y)*Math.min(1,dt*4); } }); },
  fail:function(sc,why){ if(sc._escDone)return; sc._escDone=true; var ps=sc.worldScene.playerState; ps.hp=ps.maxHp||ps.hp; ps.muspEscT=ZESC.total(ps); sc._playerDead=false;
    sc.cameras.main.flash(700,255,90,30); sc.cameras.main.shake(700,0.02);
    showNotif(why==='time'?'🌋 The mountain closes over you… the spirits pull you back to the throne. Again — faster!':'🌋 You fall — and the spirits pull you back to the throne. Again!','#ff6040');
    var self=sc; setTimeout(function(){ if(!self.sys||!self.sys.displayList)return; self.scene.restart(Object.assign({},self._initData,{floor:0,floorStates:{},arriveAt:null})); },1300); },
  // out of the gate: onto the causeway
  out:function(sc){ var ps=sc.worldScene.playerState, ws=sc.worldScene; sc._escDone=true; sc._escOut=true; ps.muspEsc=2; ps.muspEscT=null; ZESC.hud(false);
    sc._exitToWorld(null); setTimeout(function(){ ZESC.causeway(ws); },500); },
  // ── the causeway: the island and the walkway sink behind you ──
  cwGeom:function(ws){ var wd=ws.wd, d=_volcanoSiteDefs().find(function(v){ return v.type==='volcano_main'; }), an=wd.volcanoAnchors&&wd.volcanoAnchors.volcano_main; if(!d||!an)return null;
    var cx=d.tx+1.5, cy=d.ty+1.5, ux=an.x-cx, uy=an.y-cy, L2=ux*ux+uy*uy||1, inR=function(x,y){ var t=((x-cx)*ux+(y-cy)*uy)/L2; if(Math.hypot(x-cx,y-cy)<=29.5)return true; if(t<0||t>0.97)return false; var px=cx+ux*t, py=cy+uy*t; return Math.hypot(x-px,y-py)<=3.6; };
    var M={}, q=[[Math.round(cx),Math.round(cy)]], h=0, key=function(x,y){ return y*WORLD_W+x; }; M[key(q[0][0],q[0][1])]=0; var list=[q[0]];
    while(h<q.length){ var c=q[h++], m=M[key(c[0],c[1])]; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(o){ var x=c[0]+o[0], y=c[1]+o[1], k=key(x,y); if(M[k]!==undefined||!inR(x,y))return; var t=(wd.tiles[y]||[])[x]; if(t===undefined||!canPassTile(t))return; M[k]=m+1; q.push([x,y]); list.push([x,y]); }); }
    list.sort(function(a,b){ return M[key(a[0],a[1])]-M[key(b[0],b[1])]; }); return {cx:cx,cy:cy,an:an,M:M,list:list,key:key,door:{x:(d.tx+1.5)*TILE,y:(d.ty+3.2)*TILE}}; },
  causeway:function(ws){ var ps=ws.playerState, G=ZESC.cwGeom(ws); if(!G){ ZESC.sink(ws); return; } if(ws._cw&&ws._cw.g)ws._cw.g.destroy();
    var lv=ZESC.lv(ps); ws._cw={G:G,f:-12,spd:ZESC.CW[lv],i:0,j:0,g:ws.add.graphics().setDepth(-4),hurt:0,t:0};
    showNotif('🌊 The causeway is sinking behind you — RUN for the shore!','#ff8040'); ws.cameras.main.shake(800,0.008); },
  cwTick:function(ws,dt){ var C=ws._cw; if(!C||!ws.player)return; dt=Math.min(dt,0.25); var G=C.G, ps=ws.playerState; C.t+=dt; if(!ZESC.freeze)C.f+=C.spd*dt;
    while(C.i<G.list.length&&G.M[G.key(G.list[C.i][0],G.list[C.i][1])]<C.f){ var p=G.list[C.i++]; C.g.fillStyle(0xd84a10,1).fillRect(p[0]*TILE,p[1]*TILE,TILE,TILE); C.g.fillStyle(0xffa040,0.4).fillEllipse(p[0]*TILE+16,p[1]*TILE+16,18,10); }
    while(C.j<G.list.length&&G.M[G.key(G.list[C.j][0],G.list[C.j][1])]<C.f-5){ var p2=G.list[C.j++]; C.g.fillStyle(0x16487c,1).fillRect(p2[0]*TILE,p2[1]*TILE,TILE,TILE); C.g.fillStyle(0xffffff,0.12).fillRect(p2[0]*TILE+4,p2[1]*TILE+10,TILE-8,3); }
    if(Math.random()<dt*0.6)ws.cameras.main.shake(260,0.004);
    var tx=Math.floor(ws.player.x/TILE), ty=Math.floor(ws.player.y/TILE), m=G.M[G.key(tx,ty)];
    if(m!==undefined&&m<C.f&&!(C.hurt>0)){ C.hurt=1.5; var dmg=ps.godMode?0:Math.max(1,Math.round((ps.maxHp||30)*0.25)); ps.hp=Math.max(1,(ps.hp||0)-dmg); C.g.clear(); C.i=0; C.j=0; C.f=-12;
      if(typeof _heroSetPos==='function')_heroSetPos(ws,G.door.x,G.door.y); else { ws.player.x=G.door.x; ws.player.y=G.door.y; }
      ws.cameras.main.flash(500,255,120,40); showNotif('🌊 The sea takes the causeway under you — the spirits drag you back to the gate. Run again!','#ff7040'); if(ws._emitUI)ws._emitUI(); }
    if(C.hurt>0)C.hurt-=dt;
    if(m===undefined&&Math.hypot(tx-G.an.x,ty-G.an.y)<10&&C.t>1){ C.g.destroy(); ws._cw=null; ps.muspEsc=3; ZESC.sink(ws); } },
  // ── on the mainland: Muspelheim sinks (then Asgard comes down — 16e) ──
  sink:function(ws){ var ps=ws.playerState, G=ZESC.cwGeom(ws), cam=ws.cameras.main; ps.muspEsc=3; if(typeof ZCINE!=='undefined')ZCINE.bars(true);
    var gx=G?G.cx*TILE:ws.player.x, gy=G?G.cy*TILE:ws.player.y; cam.stopFollow(); cam.pan(gx,gy,1400,'Sine.easeInOut');
    showNotif('🌋 Behind you, Muspelheim breaks apart…','#ff8040');
    var smoke=function(){ for(var i=0;i<26;i++){ var a=Math.random()*Math.PI*2, r=Math.random()*TILE*20, s=ws.add.circle(gx+Math.cos(a)*r,gy+Math.sin(a)*r*0.7,10+Math.random()*16,Math.random()<0.3?0xff6020:0x3a3030,0.6).setDepth(9000);
        ws.tweens.add({targets:s,y:s.y-120-Math.random()*120,scale:2.5,alpha:0,duration:2200+Math.random()*1200,onComplete:function(){ this.targets[0].destroy(); }}); } };
    ws.time.delayedCall(1500,function(){ cam.shake(2600,0.018); smoke(); ws.time.delayedCall(900,smoke); ws.time.delayedCall(1800,smoke);
      ws.time.delayedCall(1400,function(){ ZESC.sinkTerrain(ws); cam.flash(800,255,200,150); });
      ws.time.delayedCall(3400,function(){ ps.muspSunk=1; showNotif('🌊 Muspelheim is gone beneath the sea. The spirits it held are free.','#9fe8ff'); if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('Muspelheim sinks'); }catch(e){}
        var next=function(){ if(typeof ZASG!=='undefined'&&ZASG.on)ZASG.descend(ws); else { cam.startFollow(ws.player.cont,true,.1,.1); if(typeof ZCINE!=='undefined')ZCINE.bars(false); } };
        if(ZCINE.panel&&typeof ZASG!=='undefined'&&ZASG.panelOf)ZCINE.panel(ZASG.panelOf('sink'),'Muspelheim sinks beneath the sea.',4200,next); else next(); }); }); },      // round 61: Kris's story panel pn_musp_sink_a
  // the island, its rampart and the causeway become sea; the gate is gone
  sinkTerrain:function(ws){ var wd=ws.wd; if(!wd||wd._muspSunk)return; var d=_volcanoSiteDefs().find(function(v){ return v.type==='volcano_main'; }), an=wd.volcanoAnchors&&wd.volcanoAnchors.volcano_main; if(!d)return;
    var cx=d.tx+1.5, cy=d.ty+1.5, changed=[], sea=WSK&&WSK.sea, ok=function(t){ return t===T.DARK_ROCK||t===T.ASH_GROUND||t===T.OBSIDIAN||t===T.THIN_MAGMA||t===T.DEEP_MAGMA||t===T.ROCKY_GROUND||t===T.GRAVEL||t===T.CLIFF; };
    var ux=an?an.x-cx:0, uy=an?an.y-cy:0, L2=ux*ux+uy*uy||1;
    for(var y=Math.floor(cy-34);y<=cy+34;y++)for(var x=Math.floor(cx-34);x<=cx+34;x++){ if(!wd.tiles[y]||!ok(wd.tiles[y][x])||Math.hypot(x-cx,y-cy)>32)continue; wd.tiles[y][x]=T.OCEAN; if(wd.kind&&sea)wd.kind[y*WORLD_W+x]=sea._gi; changed.push([x,y]); }
    if(an)for(var y2=Math.min(cy,an.y)-6;y2<=Math.max(cy,an.y)+6;y2++)for(var x2=Math.min(cx,an.x)-6;x2<=Math.max(cx,an.x)+6;x2++){ var t=((x2-cx)*ux+(y2-cy)*uy)/L2; if(t<0||t>0.97)continue; var px=cx+ux*t, py=cy+uy*t; if(Math.hypot(x2-px,y2-py)>4.6)continue; var Y=Math.round(y2), X=Math.round(x2); if(!wd.tiles[Y]||!ok(wd.tiles[Y][X]))continue; wd.tiles[Y][X]=T.OCEAN; if(wd.kind&&sea)wd.kind[Y*WORLD_W+X]=sea._gi; changed.push([X,Y]); }
    wd._muspSunk=true; wd.baseVer=(wd.baseVer||0)+1; wd.sites=wd.sites.filter(function(s){ return s.id!=='volcano_main'; }); if(ws.sites!==wd.sites)ws.sites=wd.sites;
    (ws.siteObjs||[]).forEach(function(o){ if(o.s&&o.s.id==='volcano_main'){ try{ if(o.ico&&o.ico.destroy)o.ico.destroy(); }catch(e){} if(o.lblEl)o.lblEl.remove(); o.gone=true; } }); ws.siteObjs=(ws.siteObjs||[]).filter(function(o){ return !o.gone; });
    ZESC.refresh(ws,changed); },
  refresh:function(ws,changed){ if(!ws._refreshChunkAt||!changed.length||!ws._wr)return; var seen={}, todo=[], C=typeof WCH!=='undefined'?WCH:32; changed.forEach(function(p){ var key=Math.floor(p[0]/C)+'_'+Math.floor(p[1]/C); if(seen[key])return; seen[key]=1; if((ws._wr.chunks&&ws._wr.chunks.has(key))||(ws._wr.parked&&ws._wr.parked.has(key))||(ws._wr.jobs&&ws._wr.jobs.has(key))||(ws._wr.ready&&ws._wr.ready.some(function(R){ return R.key===key; })))todo.push(p); });      // a chunk being painted from the old ground is painted again
    var flush=function(){ todo.splice(0,2).forEach(function(p){ try{ ws._refreshChunkAt(p[0],p[1]); }catch(e){ console.warn('chunk refresh failed at',p,e); } }); if(todo.length)requestAnimationFrame(flush); }; if(todo.length)requestAnimationFrame(flush); }
};
// letterbox bars for the cut-scenes (in-engine, docs/28 §9)
var ZCINE={ bars:function(on){ ['top','bot'].forEach(function(k){ var id='zcine-'+k, el=document.getElementById(id); if(!el){ el=document.createElement('div'); el.id=id; el.style.cssText='position:fixed;left:0;right:0;height:0;background:#000;z-index:70;transition:height .6s ease;pointer-events:none;'+(k==='top'?'top:0':'bottom:0'); document.body.appendChild(el); } el.style.height=on?'11vh':'0'; }); } };

// ── the five escape floors (07zx ZSP layouts) ──
(function(){ if(typeof ZSP==='undefined')return;
  var carve=function(c,x0,y0,x1,y1,wd,v){ var n=Math.ceil(Math.hypot(x1-x0,y1-y0)*2)+1; for(var k=0;k<=n;k++){ var x=x0+(x1-x0)*k/n, y=y0+(y1-y0)*k/n, o=Math.floor(wd/2); for(var j=0;j<wd;j++)for(var i=0;i<wd;i++){ var X=Math.floor(x)-o+i, Y=Math.floor(y)-o+j; if(c.inb(X,Y)&&X>0&&Y>0&&X<c.W-1&&Y<c.H-1){ var g=c.get(X,Y); if(v===4?(g!==1):true)c.set(X,Y,v); } } } };
  ZSP.T.musp_escape={n:'Muspelheim falls',d:'The escape: five collapsing floors from the throne to the gate.',liq:'lava',arena:[17,13],near:0.94,
    s:function(fi){ return [60,24]; },
    gen:function(c,fi){ var R=c.R, W=c.W, H=c.H, P=[], x=4; while(x<W-5){ P.push([x,R.i(5,H-6)]); x+=R.i(7,9); } P.push([W-5,R.i(6,H-7)]); if(fi%2)P.reverse();      // odd floors run right to left (the stairs land where the last floor ended)
      var th=fi%5;
      if(th===2){ c.fill(2); P.forEach(function(p){ c.rect(p[0]-3,p[1]-3,7,7,1); if(R.chance(0.4))c.set(p[0]+R.i(-2,2),p[1]+R.i(-2,2),3); }); for(var i=1;i<P.length;i++)carve(c,P[i-1][0],P[i-1][1],P[i][0],P[i][1],3,1); for(var b=0;b<10;b++){ var bx=R.i(2,W-3), by=R.i(2,H-3); if(c.get(bx,by)===1&&R.chance(0.3))c.set(bx,by,6); } }
      else { c.fill(3); var isl=th===1||th===4;
        P.forEach(function(p){ if(th===4)c.rect(p[0]-2,Math.max(2,p[1]-5),5,11,1); else c.disc(p[0],p[1],isl?3:2,1); });
        for(var i2=1;i2<P.length;i2++)carve(c,P[i2-1][0],P[i2-1][1],P[i2][0],P[i2][1],isl?2:th===3?3:4,isl?4:1);
        for(var r=0;r<14;r++){ var rx=R.i(3,W-4), ry=R.i(3,H-4); if(c.get(rx,ry)===3&&R.chance(0.35))c.set(rx,ry,6); } }
      c.hints.up=P[0]; c.hints.down=[P[P.length-1][0],P[P.length-1][1],5]; }};
  var z0=ZSP.zsdSite; ZSP.zsdSite=function(id){ if(id==='musp_escape')return {id:id,type:'ember',name:'Muspelheim falls',q:4,floors:ZESC.FLOORS+1,el:'fire',pal:typeof ZSD!=='undefined'&&ZSD.basePal?ZSD.basePal('ember',null,'fire'):null}; return z0.apply(ZSP,arguments); };
})();

// ── hooks ──
setTimeout(function(){
  // the great hearth starts the fall; the hoard is claimed with it
  if(typeof ZMUSP!=='undefined'){ var h0=ZMUSP.hearth; ZMUSP.hearth=function(sc){ var ps=sc.worldScene.playerState, had=(ps.inventory||[]).indexOf('lodestar')>=0||(ps.equip&&ps.equip.mWeapon==='lodestar'); var r=h0.apply(ZMUSP,arguments);
      var now=(ps.inventory||[]).indexOf('lodestar')>=0||(ps.equip&&ps.equip.mWeapon==='lodestar'); if(!had&&now&&ZESC.on){ if(!sc._claimed){ sc._claimed=true; ZMUSP.reward(sc); } setTimeout(function(){ if(sc.sys&&sc.sys.displayList)ZESC.begin(sc.worldScene); },3200); } return r; };
    // the hoard: its rewards; leaving only when there is no Lodestar to make yet (with the staff and the four Heartglasses in the pack you stay for the hearth)
    ZMUSP.reward=function(sc){ var ps=sc.worldScene.playerState; ps.completedQuests=ps.completedQuests||[]; ['volcano_lord','muspelheim'].forEach(function(q){ if(ps.completedQuests.indexOf(q)<0)ps.completedQuests.push(q); });
      ps.gold=(ps.gold||0)+2500; ps.xp=(ps.xp||0)+500; if(typeof ZLoot!=='undefined')try{ ZLoot.site(sc,ps,4); }catch(e){} showNotif('🏆 Surtharn, Tyrant of Muspelheim, is beaten! +2500 gold','#ffdd44'); if(sc.worldScene._save)sc.worldScene._save(); };
    ZMUSP.claim=function(sc){ var ps=sc.worldScene.playerState, inv=ps.inventory||[]; sc._claimed=true; ZMUSP.reward(sc);
      var has=(inv.indexOf('lodestar')>=0||(ps.equip&&ps.equip.mWeapon==='lodestar')), kit=(inv.indexOf('sov_staff')>=0||(ps.equip&&ps.equip.mWeapon==='sov_staff'))&&[1,2,3,4].every(function(q){ return inv.indexOf('heartglass_'+q)>=0; });
      if(has&&ZESC.on){ setTimeout(function(){ if(sc.sys&&sc.sys.displayList)ZESC.begin(sc.worldScene); },1800); return; }
      if(kit){ showNotif('🔥 The great hearth blazes — bring it the Sovereign staff and the four Heartglasses.','#ffb070'); var bc=sc.interactables.find(function(i){ return i.type==='boss_chest'; }); if(bc)bc.opened=true; return; }
      showNotif('🔥 The great hearth still waits for the Sovereign staff and the four Heartglasses.','#ffb070'); var self=sc; setTimeout(function(){ if(self.sys&&self.sys.displayList)self._exitToWorld(); },1800); }; }
  // the gate: a climb not finished starts again; the causeway is run again; a sunk mountain has no gate
  if(typeof WorldScene!=='undefined'){ var W=WorldScene.prototype, en0=W._enterSite; W._enterSite=function(site){ var ps=this.playerState;
      if(ZESC.on&&site&&site.type==='volcano_main'&&ps){ if(ps.muspSunk)return; if(ps.muspEsc===1){ ZESC.begin(this); return; } if(ps.muspEsc===2){ if(!this._cw)ZESC.causeway(this); return; } }
      return en0.apply(this,arguments); };
    var u0=W.update; W.update=function(t,ms){ var r=u0.apply(this,arguments); if(this._cw)try{ ZESC.cwTick(this,ms/1000); }catch(e){ if(!this._cwErr){ this._cwErr=1; console.warn('causeway',e); } } return r; }; }
  if(typeof DungeonScene==='undefined')return; var D=DungeonScene.prototype;
  var i0=D.init; D.init=function(d){ var r=i0.apply(this,arguments); this._escRun=!!(d&&d.site&&d.site.escape); this._esc=null; this._escDone=false; this._escOut=false; return r; };
  var bi=D._buildInteractables; D._buildInteractables=function(){ var r=bi.apply(this,arguments); if(this._escRun){ try{ ZESC.build(this); }catch(e){ console.warn('escape',e); } } return r; };
  var sm=D._spawnMonsters; D._spawnMonsters=function(){ if(this._escRun)return; return sm.apply(this,arguments); };      // no time to fight: the mountain is the enemy
  var up0=D.update; D.update=function(t,ms){ var r=up0.apply(this,arguments); if(this._esc)try{ ZESC.tick(this,ms/1000); }catch(e){ if(!this._escErr){ this._escErr=1; console.warn('escape tick',e); } } return r; };
  var it=D._interact; D._interact=function(){ var self=this; if(this._escRun){ var near=this.interactables.find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; });
      if(near&&near.type==='stairs_up'){ showNotif('🔥 The way back is gone — UP!','#ff8040'); return; }
      if(near&&near.type==='stairs_down'){ if(this.floor>=ZESC.FLOORS-1){ ZESC.out(this); return; } this._escDone=true; } } return it.apply(this,arguments); };
  var upd=D._updateInteractPrompt; D._updateInteractPrompt=function(){ var r=upd.apply(this,arguments), self=this; if(!this._escRun||!this.interactPrompt)return r;
    var near=this.interactables.find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; }); if(!near)return r; var t=null;
    if(near.type==='stairs_down')t=this.floor>=ZESC.FLOORS-1?'[Tab] OUT through the gate!':'[Tab] Climb up — '+ZESC.HALLS[this.floor+1]; else if(near.type==='stairs_up')t='The way back has fallen in';
    if(t)this.interactPrompt.setText(t).setPosition(this.px,this.py-52).setVisible(true); return r; };
  var uh=D._updateDungeonHUD; D._updateDungeonHUD=function(){ var r=uh.apply(this,arguments); if(this._escRun){ var tt=document.getElementById('dng-title'); if(tt)tt.textContent='🌋 Muspelheim falls — floor '+(this.floor+1)+' / '+ZESC.FLOORS; } return r; };
  var pd=D._playerDied; D._playerDied=function(){ if(this._escRun){ ZESC.fail(this,'fell'); return; } return pd.apply(this,arguments); };
  var ex=D._exitToWorld; D._exitToWorld=function(rw){ if(this._escRun&&!this._escOut){ showNotif('🔥 There is no way out but UP!','#ff8040'); return; } if(this._escRun)ZESC.hud(false); return ex.apply(this,arguments); };
},0);
