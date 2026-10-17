// ═══════════════════════════════════════════════════════════════════════
// ║ 16g-asgard-citadel.js — round 62: ASGARD'S CITADEL — four floors and Grímnir; and THE RAGNARÖK TRACK (Muspelheim and Asgard).
// ║ Kris's ☆ (Lab, Realm ideas, Oct 17) and his card: floors in the order HEIMDALL → EINHERJAR → NORNS → YGGDRASIL, then Grímnir as a PHASED BOSS
// ║ (the tafl board left out); the doom track in "Muspelheim and Asgard only"; the dragon under the World Tree renamed GRIMTOOTH ("rename the
// ║ dragon, can't pronounce it"); the rune draft left out.
// ║   1 HEIMDALL'S WATCH — the watchman's lenses sweep the hall with rainbow light. Caught in a beam: Gjallarhorn sounds, wardens and einherjar come
// ║     and the doom track jumps. Hide behind the pillars, time the sweeps, throw a Smoke Pellet — or break a lens for good with Godsbane.
// ║   2 VALHÖLL — the einherjar rise again while the hall's horn-braziers burn. Put the braziers out (Tab) and the fallen stay down.
// ║   3 THE HALL OF THE NORNS — islands over the sky; golden threads tie the room. Cut one: a bridge of thread appears — or a wall falls — or warriors
// ║     wake. A wrong cut can be undone with the Lodestar: [R] rewinds the last cut (three times).
// ║   4 YGGDRASIL — the World Tree grows up through the citadel. Climb its trunk and branches; GRIMTOOTH gnaws at the roots and his rot climbs after
// ║     you; catch RATATOSKR the squirrel and he shows you a way up.
// ║   5 THE THRONE OF GRÍMNIR — the Masked King, three phases (his look: Lab options, the Bosses tab — "Asgard").
// ║ THE RAGNARÖK TRACK (ZDOOM): ten marks across the top. It ticks with time and jumps at every alarm. At marks 3, 6 and 9 the realm worsens —
// ║ Muspelheim: the heat climbs faster and a stronger foe walks in; Asgard: Fimbulwinter frosts the halls (you move slower) and einherjar walk in.
// ║ Leaving the realm resets it. Painted pieces: scenery wave 64 (ar_*), the einherjar in sprite wave 7.9; drawn stand-ins until then.
// ═══════════════════════════════════════════════════════════════════════
var ZCIT={ on:true, FLOORS:5,
  HALLS:['Heimdall\'s Watch','Valhöll','The Hall of the Norns','Yggdrasil','The Throne of Grímnir'],
  MONS:[['gjallar_warden','einherjar_shieldmaiden'],['einherjar_berserker','einherjar_shieldmaiden','einherjar_archer'],['einherjar_archer','einherjar_shieldmaiden'],['einherjar_berserker','einherjar_archer'],['einherjar_shieldmaiden']],
  site:function(){ return {id:'asgard_citadel',type:'dungeon',section:4,design:'asgard_citadel',asg:true,name:'The Citadel of Asgard',floors:ZCIT.FLOORS}; },
  is:function(sc){ var s=sc&&(sc._site||sc.site); return !!(s&&s.asg); },
  enter:function(ws,floor){ document.getElementById('hud').style.display='none'; document.getElementById('dungeon-hud').style.display='block';
    if(game.scene.isPaused('World'))game.scene.resume('World'); game.scene.sleep('World'); if(game.scene.isActive('Dungeon')||game.scene.isPaused('Dungeon'))game.scene.stop('Dungeon');
    game.scene.start('Dungeon',{site:ZCIT.site(),floor:floor||0,maxFloors:ZCIT.FLOORS,worldScene:ws,theme:'castle'}); },
  floorOf:function(sc){ try{ return ZSP.design('asgard_citadel',ZCIT.FLOORS).floors[sc.floor]; }catch(e){ return null; } },
  P:function(t){ return {x:t[0]*TILE+TILE/2,y:t[1]*TILE+TILE/2}; },
  prop:function(sc,id,x,y,draw,m){ return ZFI.prop(sc,id,x,y,draw,m); },
  spawn:function(sc,id,x,y){ if(!MON_BY_ID[id])return null; var m=MX.spawn(sc,id,x,y,{q:4}); if(m){ m.isBoss=false; m.maxHp=Math.round(m.maxHp*1.5); m.hp=m.maxHp; if(m._hp!==undefined)m._hp=m.maxHp; sc.monsters.push(m); } return m; },
  around:function(sc,n,ids,r0){ var out=[]; for(var i=0,tries=0;out.length<n&&tries<n*12;tries++,i++){ var a=Math.random()*Math.PI*2, d=(r0||TILE*5)+Math.random()*TILE*2, x=sc.px+Math.cos(a)*d, y=sc.py+Math.sin(a)*d, tx=Math.floor(x/TILE), ty=Math.floor(y/TILE);
      if((sc.dtiles[ty]||[])[tx]!==DNG.FLOOR)continue; var m=ZCIT.spawn(sc,ids[i%ids.length],x,y); if(m)out.push(m); } return out; },
  // ── one floor: its trial ──
  build:function(sc){ var F=ZCIT.floorOf(sc); if(!F)return; var H=F.hints||{}; sc._cit={f:sc.floor,hall:ZCIT.HALLS[sc.floor]};
    showNotif('🏛 The Citadel of Asgard — '+ZCIT.HALLS[sc.floor]+' ('+(sc.floor+1)+' / '+ZCIT.FLOORS+')','#fff2b0');
    if(sc.floor===0)ZCIT.heimdall(sc,H); else if(sc.floor===1)ZCIT.valholl(sc,H); else if(sc.floor===2)ZCIT.norns(sc,H); else if(sc.floor===3)ZCIT.ygg(sc,H);
    ZDOOM.start(sc,'asgard'); },
  // ══ 1 HEIMDALL'S WATCH ══
  heimdall:function(sc,H){ var C=sc._cit; C.lenses=[]; (H.lenses||[]).forEach(function(L,i){ var p=ZCIT.P(L), o={type:'cit_lens',x:p.x,y:p.y,opened:true,i:i,a0:Math.PI/2,sw:0.95,len:TILE*15,t:i*1.7,broken:false};
      o.vis=ZCIT.prop(sc,'ar_lens',p.x,p.y,function(g,x,y){ g.fillStyle(0x8a7a5a,1).fillRect(x-6,y-6,12,22); g.fillStyle(0xe8d8a8,1).fillCircle(x,y-12,13); g.fillStyle(0xbfe8ff,0.9).fillCircle(x,y-12,8); g.fillStyle(0xffffff,0.9).fillCircle(x-3,y-15,3); });
      o.beam=sc.add.graphics().setDepth(9.6).setBlendMode(Phaser.BlendModes.ADD); C.lenses.push(o); sc.interactables.push(o); });
    C.alarmCd=0; showNotif('👁 Heimdall\'s Watch — keep out of the sweeping light. Pillars hide you; Godsbane breaks a lens for good.','#fff2b0'); },
  seen:function(sc,L){ var dx=sc.px-L.x, dy=sc.py-L.y, d=Math.hypot(dx,dy); if(d>L.len||d<10)return false; var a=Math.atan2(dy,dx), da=Math.abs(Math.atan2(Math.sin(a-L.ang),Math.cos(a-L.ang))); if(da>0.11)return false;
    for(var s=TILE;s<d-8;s+=TILE/2){ var tx=Math.floor((L.x+dx*s/d)/TILE), ty=Math.floor((L.y+dy*s/d)/TILE); if((sc.dtiles[ty]||[])[tx]===DNG.WALL)return false; } return true; },
  heimdallTick:function(sc,dt){ var C=sc._cit; if(!C||!C.lenses)return; C.alarmCd=Math.max(0,C.alarmCd-dt); var blind=typeof ZPOT!=='undefined'&&ZPOT._blind&&Date.now()<ZPOT._blind.until;
    C.lenses.forEach(function(L){ L.beam.clear(); if(L.broken)return; L.t+=dt; L.ang=L.a0+Math.sin(L.t*0.55)*L.sw; var ex=L.x+Math.cos(L.ang)*L.len, ey=L.y-12+Math.sin(L.ang)*L.len, w=Math.tan(0.11)*L.len;
      var nx=-Math.sin(L.ang), ny=Math.cos(L.ang); [[0xff6060,-1],[0xffe060,0],[0x60a0ff,1]].forEach(function(c){ L.beam.fillStyle(c[0],0.14).fillTriangle(L.x,L.y-12,ex+nx*w*(c[1]-0.5)*0.9,ey+ny*w*(c[1]-0.5)*0.9,ex+nx*w*(c[1]+0.5)*0.9,ey+ny*w*(c[1]+0.5)*0.9); });
      if(!blind&&C.alarmCd<=0&&ZCIT.seen(sc,L)){ C.alarmCd=9; ZCIT.alarm(sc); } }); },
  alarm:function(sc){ try{ sc.cameras.main.shake(400,0.006); sc.cameras.main.flash(250,255,240,180); }catch(e){} showNotif('📯 GJALLARHORN! The watch has seen you — the wardens come!','#ffe080'); ZDOOM.push(sc,1,'an alarm');
    ZCIT.around(sc,2,sc.floor===0?['gjallar_warden','einherjar_shieldmaiden']:['einherjar_berserker','einherjar_archer']); },
  breakLens:function(sc,c,ang){ var C=sc._cit; if(!C||!C.lenses)return 0; var n=0, nx=Math.cos(ang), ny=Math.sin(ang);
    C.lenses.forEach(function(L){ if(L.broken)return; var dx=L.x-c.x, dy=L.y-c.y, along=dx*nx+dy*ny, side=Math.abs(-dx*ny+dy*nx); if(along>0&&along<460&&side<56){ L.broken=true; n++; L.beam.clear(); if(L.vis)L.vis.setAlpha(0.35);
        for(var i=0;i<12;i++){ var s=sc.add.circle(L.x,L.y-12,3,0xbfe8ff,1).setDepth(9000); sc.tweens.add({targets:s,x:L.x+(Math.random()-0.5)*90,y:L.y-12+(Math.random()-0.5)*90,alpha:0,duration:700,onComplete:function(){ this.targets[0].destroy(); }}); } } });
    if(n)showNotif('✦ Godsbane shatters '+(n>1?n+' lenses':'a lens')+' — that light watches no more.','#fff2b0'); return n; },
  // ══ 2 VALHÖLL ══
  valholl:function(sc,H){ var C=sc._cit; C.braziers=[]; (H.braziers||[]).forEach(function(B){ var p=ZCIT.P(B), o={type:'cit_brazier',x:p.x,y:p.y,opened:false,lit:true};
      o.vis=ZCIT.prop(sc,'ar_brazier',p.x,p.y,function(g,x,y){ g.fillStyle(0x000000,0.3).fillEllipse(x,y+12,36,10); g.fillStyle(0x8a6a30,1).fillRect(x-4,y-10,8,22); g.fillStyle(0xd8b060,1).fillRoundedRect(x-16,y-20,32,12,5); g.fillStyle(0xe8d8b8,1).fillTriangle(x+14,y-22,x+26,y-34,x+20,y-18); });
      o.fire=sc.add.circle(p.x,p.y-30,12,0xffa040,0.8).setDepth(p.y/1e4+5.1).setBlendMode(Phaser.BlendModes.ADD); sc.tweens.add({targets:o.fire,scale:{from:0.8,to:1.25},alpha:{from:0.6,to:0.95},duration:260,yoyo:true,repeat:-1}); C.braziers.push(o); sc.interactables.push(o); });
    C.dead=[]; showNotif('🔥 Valhöll — the fallen einherjar rise again while the horn-braziers burn. Put them out (Tab).','#ffd890'); },
  lit:function(sc){ return !!(sc._cit&&sc._cit.braziers&&sc._cit.braziers.some(function(b){ return b.lit; })); },
  douse:function(sc,o){ o.lit=false; o.opened=true; if(o.fire){ sc.tweens.killTweensOf(o.fire); sc.tweens.add({targets:o.fire,alpha:0,scale:0.2,duration:500}); } var left=sc._cit.braziers.filter(function(b){ return b.lit; }).length;
    showNotif(left?'💨 The horn-brazier gutters out — '+left+' still burn.':'💨 The last horn-brazier goes dark. The fallen of Valhöll stay down now.','#ffd890'); },
  rise:function(sc,mon){ if(!sc._cit||sc.floor!==1||!ZCIT.lit(sc)||!/^einherjar_/.test(mon.rid||(mon.def&&mon.def.id)||''))return; var id=mon.rid||mon.def.id, x=mon.x, y=mon.y, n=(mon._risen||0)+1; if(n>3)return;
    sc.time.delayedCall(6000,function(){ if(!sc.sys||!sc.sys.isActive()||!ZCIT.lit(sc))return; var m=ZCIT.spawn(sc,id,x,y); if(m){ m._risen=n; if(sc._floatText)sc._floatText(x,y-40,'rises again!','#fff0b0'); } }); },
  // ══ 3 THE HALL OF THE NORNS ══
  norns:function(sc,H){ var C=sc._cit, F=ZCIT.floorOf(sc); C.bridges={}; C.threads=[]; C.cuts=[]; C.rewinds=3; C.blocked={};
    (H.spans||[]).forEach(function(S){ C.bridges[S.id]={cells:S.cells,open:false,g:null}; S.cells.forEach(function(k){ C.blocked[k]=1; }); });
    (H.walls||[]).forEach(function(Wl){ C.bridges[Wl.id]={cells:Wl.cells,wall:true,open:false}; Wl.cells.forEach(function(k){ C.blocked[k]=1; }); });
    // the wall cells are drawn as a golden loom-screen
    Object.keys(C.bridges).forEach(function(id){ var B=C.bridges[id]; if(!B.wall)return; var g=B.g=sc.add.graphics().setDepth(9.4); B.cells.forEach(function(k){ var x=(k%F.w)*TILE, y=((k/F.w)|0)*TILE; g.fillStyle(0x8a7040,1).fillRect(x,y,TILE,TILE); for(var i=0;i<4;i++){ g.lineStyle(1,0xffd860,0.8).lineBetween(x+4+i*7,y,x+4+i*7,y+TILE); } }); });
    var R=rngOf(4321+(sc.worldScene.playerState.level||1)), mids=(H.threads||[]).slice(), effs=['span1','wake','wall'];
    for(var i=effs.length-1;i>0;i--){ var j=R.i(0,i), t=effs[i]; effs[i]=effs[j]; effs[j]=t; }
    mids.forEach(function(T,i){ var p=ZCIT.P(T.at), eff=T.eff||effs.shift()||'wake', o={type:'cit_thread',x:p.x,y:p.y,opened:false,eff:eff,i:i};
      o.vis=ZCIT.prop(sc,'ar_thread',p.x,p.y,function(g,x,y){ g.fillStyle(0x6a5030,1).fillRect(x-3,y-34,6,40); g.lineStyle(2,0xffd860,1).lineBetween(x,y-34,x+30,y-56); g.lineStyle(2,0xffd860,0.6).lineBetween(x,y-30,x-26,y-52); g.fillStyle(0xffe890,1).fillCircle(x,y-36,5); });
      C.threads.push(o); sc.interactables.push(o); });
    if(H.norns){ var np=ZCIT.P(H.norns); C.nornVis=ZCIT.prop(sc,'ar_norns',np.x,np.y,function(g,x,y){ [-22,0,22].forEach(function(dx,i){ g.fillStyle([0xc8d8e8,0xe8e0c8,0xa8b8c8][i],0.9).fillCircle(x+dx,y-36,7); g.fillStyle([0x6a7a9a,0xc8b070,0x4a5a6a][i],0.9).fillTriangle(x+dx-11,y,x+dx+11,y,x+dx,y-30); }); g.lineStyle(1,0xffd860,0.9).lineBetween(x-30,y-20,x+30,y-24); }); }
    showNotif('🧵 The Hall of the Norns — golden threads tie the hall together. Cut one (Tab): a way may open… or something may wake. [R] rewinds a cut with the Lodestar (3).','#ffe890'); },
  cut:function(sc,o){ var C=sc._cit, rec={o:o,eff:o.eff,mons:[]}; o.opened=true; if(o.vis)o.vis.setAlpha(0.35);
    if(o.eff==='span0'||o.eff==='span1'){ ZCIT.openSpan(sc,o.eff,true); showNotif('🧵 The thread parts — and spins itself into a bridge of gold across the sky!','#ffe890'); }
    else if(o.eff==='wall'){ ZCIT.openSpan(sc,'wall',true); if(sc._openChest)try{ sc._openChest(); }catch(e){} showNotif('🧵 The thread parts — the loom-wall unravels, and behind it the Norns\' gift.','#ffe890'); }
    else { rec.mons=ZCIT.around(sc,3,['einherjar_berserker','einherjar_shieldmaiden','einherjar_archer']); ZDOOM.push(sc,1,'a fate cut wrong'); showNotif('🧵 The thread parts — and three einherjar wake from their fate! ([R] rewinds the cut)','#ff9070'); }
    C.cuts.push(rec); },
  openSpan:function(sc,id,open){ var C=sc._cit, B=C.bridges[id], F=ZCIT.floorOf(sc); if(!B)return; B.open=open; B.cells.forEach(function(k){ if(open)delete C.blocked[k]; else C.blocked[k]=1; });
    if(B.wall){ if(B.g)B.g.setVisible(!open); return; }
    if(B.g){ B.g.destroy(); B.g=null; } if(open){ var g=B.g=sc.add.graphics().setDepth(1.6); B.cells.forEach(function(k){ var x=(k%F.w)*TILE, y=((k/F.w)|0)*TILE; g.fillStyle(0xd8b050,0.95).fillRect(x+2,y+2,TILE-4,TILE-4); g.lineStyle(1,0xfff0a0,1).strokeRect(x+3,y+3,TILE-6,TILE-6); }); g.setAlpha(0); sc.tweens.add({targets:g,alpha:1,duration:600}); } },
  rewind:function(sc){ var C=sc._cit; if(!C||!C.cuts)return; var ps=sc.worldScene.playerState; if(!(typeof ZASG!=='undefined'&&ZASG.hasStaff(ps))){ showNotif('⏳ Only the Lodestar can turn a fate back.','#c8bfa0'); return; }
    if(C.rewinds<=0){ showNotif('⏳ The Lodestar has no more turnings left on this floor.','#c8bfa0'); return; } var rec=C.cuts.pop(); if(!rec){ showNotif('⏳ No cut to rewind.','#c8bfa0'); return; }
    if((rec.eff==='span0'||rec.eff==='span1')){ var B=C.bridges[rec.eff], tx=Math.floor(sc.px/TILE), ty=Math.floor(sc.py/TILE); if(B.cells.indexOf(ty*DW+tx)>=0){ C.cuts.push(rec); showNotif('⏳ Not while you stand on the bridge!','#c8bfa0'); return; } ZCIT.openSpan(sc,rec.eff,false); }
    else if(rec.eff==='wall'){ /* the gift stays yours */ }
    else rec.mons.forEach(function(m){ if(!m.dead){ m.dead=true; m.hp=0; if(m._hp!==undefined)m._hp=0; if(m.cont)sc.tweens.add({targets:m.cont,alpha:0,duration:500}); } });
    rec.o.opened=false; if(rec.o.vis)rec.o.vis.setAlpha(1); C.rewinds--; try{ sc.cameras.main.flash(300,255,250,220); }catch(e){} showNotif('⏳ The Lodestar turns the thread back — the cut is undone ('+C.rewinds+' turnings left).','#fff2b0'); },
  // ══ 4 YGGDRASIL ══
  ygg:function(sc,H){ var C=sc._cit, F=ZCIT.floorOf(sc); C.rot=F.h+1; C.rotT=0; C.rotTop=6; C.rotG=sc.add.graphics().setDepth(9.5);
    var gp=ZCIT.P([Math.round(F.w/2),F.h-2]); C.grim=ZCIT.prop(sc,'ar_grimtooth',gp.x,gp.y+40,function(g,x,y){ g.fillStyle(0x3a2a40,1).fillEllipse(x,y-10,120,50); g.fillStyle(0x5a3a5a,1).fillTriangle(x-50,y-20,x+50,y-20,x,y-70); g.fillStyle(0xff4060,1).fillCircle(x-16,y-40,5).fillCircle(x+16,y-40,5); g.fillStyle(0xf0e8d8,1); for(var i=-3;i<=3;i++)g.fillTriangle(x+i*12-5,y-20,x+i*12+5,y-20,x+i*12,y-8); }, 1.4);
    // Ratatoskr runs the trunk, top to bottom and back
    var path=(H.trunk||[]).map(ZCIT.P); C.rat={path:path,u:0,dir:1,caught:false,top:H.top?ZCIT.P(H.top):null};
    C.rat.vis=sc.add.container(path[0]?path[0].x:0,path[0]?path[0].y:0).setDepth(9000); var Z=typeof _scn==='function'?_scn():null, im=Z&&Z.has&&Z.has('ar_rat_1')?Z.image(sc,'ar_rat_1',0,10,Z.K*0.8):null;
    if(im)C.rat.vis.add(im); else { C.rat.vis.add(sc.add.ellipse(0,0,16,10,0xc8642a,1)); C.rat.vis.add(sc.add.circle(8,-3,4,0xc8642a,1)); C.rat.vis.add(sc.add.ellipse(-10,-6,10,14,0xe08a40,1)); }
    showNotif('🌳 Yggdrasil — climb the World Tree! Grimtooth gnaws at the roots and his rot climbs after you. Catch Ratatoskr the squirrel for a way up.','#c8f0a0'); },
  yggTick:function(sc,dt){ var C=sc._cit; if(!C||C.rot===undefined)return; var F=ZCIT.floorOf(sc); C.rotT+=dt; if(C.rotT>3.2&&C.rot>C.rotTop){ C.rotT=0; C.rot--; }
    C.rotG.clear(); var y0=C.rot*TILE; C.rotG.fillStyle(0x3a1a40,0.55).fillRect(0,y0,F.w*TILE,(F.h-C.rot+2)*TILE); C.rotG.fillStyle(0x8a3a8a,0.6).fillRect(0,y0,F.w*TILE,4);
    if(sc.py>y0&&!(sc.worldScene.playerState.godMode)){ C.rotHurt=(C.rotHurt||0)+dt; if(C.rotHurt>=0.6){ C.rotHurt=0; ZFI.hurt(sc,0.05,' (Grimtooth\'s rot)'); if(!C.rotSaid){ C.rotSaid=1; showNotif('🐉 Grimtooth\'s rot has reached you — climb!','#d090ff'); } } }
    var R=C.rat; if(R&&!R.caught&&R.path.length>1){ R.u+=dt*R.dir*0.12; if(R.u>=1){ R.u=1; R.dir=-1; } if(R.u<=0){ R.u=0; R.dir=1; } var f=R.u*(R.path.length-1), i=Math.floor(f), a=R.path[i], b=R.path[Math.min(R.path.length-1,i+1)], k=f-i;
      R.vis.setPosition(a.x+(b.x-a.x)*k,a.y+(b.y-a.y)*k); if(R.vis.list[0])R.vis.list[0].setScale&&R.vis.list[0].setScale(R.dir>0?1:-1,1);
      if(Math.hypot(R.vis.x-sc.px,R.vis.y-sc.py)<26&&R.top){ R.caught=true; sc.tweens.add({targets:R.vis,alpha:0,y:R.vis.y-60,duration:600}); var t=R.top; try{ sc.cameras.main.flash(250,220,255,200); }catch(e){} sc.px=t.x; sc.py=t.y; if(sc.pCont)sc.pCont.setPosition(t.x,t.y);
        showNotif('🐿 You catch Ratatoskr! He chatters something rude about Grimtooth — and scampers you up a hidden way through the branches.','#c8f0a0'); } } }
};

// ══ THE RAGNARÖK TRACK ══
var ZDOOM={ MAX:10, MARKS:[3,6,9],
  realm:function(sc){ return ZCIT.is(sc)?'asgard':(sc&&sc._musp)?'musp':null; },
  start:function(sc,realm){ var ps=sc.worldScene.playerState, k=realm==='asgard'?'doomAsg':'doomMusp'; ps[k]=ps[k]||{v:0,t:0}; sc._doom=ps[k]; sc._doomRealm=realm; ZDOOM.hud(sc); },
  push:function(sc,n,why){ var D=sc._doom; if(!D)return; var before=D.v; D.v=Math.min(ZDOOM.MAX,D.v+n); ZDOOM.MARKS.forEach(function(m){ if(before<m&&D.v>=m)ZDOOM.mark(sc,m); }); ZDOOM.hud(sc); },
  tick:function(sc,dt){ var D=sc._doom; if(!D||D.v>=ZDOOM.MAX)return; D.t+=dt; var every=sc._doomRealm==='asgard'?32:38; if(D.t>=every){ D.t=0; ZDOOM.push(sc,1,'time'); } },
  mark:function(sc,m){ var A=sc._doomRealm==='asgard', lvl=ZDOOM.MARKS.indexOf(m)+1; try{ sc.cameras.main.shake(500,0.008); }catch(e){}
    if(A){ showNotif('❄ RAGNARÖK DRAWS NEAR ('+m+' / 10) — Fimbulwinter frosts the halls, and einherjar walk in!','#bfe8ff'); ZCIT.around(sc,1+lvl,['einherjar_berserker','einherjar_shieldmaiden','einherjar_archer']); }
    else { showNotif('🌋 RAGNARÖK DRAWS NEAR ('+m+' / 10) — the lava rises a step, and a fiercer foe walks in!','#ff9050'); var ids=typeof ZFORGE!=='undefined'?[].concat.apply([],Object.keys(ZFORGE.MONS).map(function(k){ return ZFORGE.MONS[k]; })):[]; var L=ZCIT.around(sc,lvl,ids.length?ids:['coalback']); L.forEach(function(x){ x.maxHp=Math.round(x.maxHp*1.4); x.hp=x.maxHp; if(x._hp!==undefined)x._hp=x.maxHp; }); } },
  level:function(sc){ var D=sc&&sc._doom; return D?ZDOOM.MARKS.filter(function(m){ return D.v>=m; }).length:0; },
  hud:function(sc){ var el=document.getElementById('zdoom'), on=sc&&sc._doom&&sc.sys&&sc.sys.isActive(); if(!on){ if(el)el.style.display='none'; return; }
    if(!el){ el=document.createElement('div'); el.id='zdoom'; el.style.cssText='position:fixed;left:50%;top:128px;transform:translateX(-50%);z-index:40;pointer-events:none;font:600 11px "Segoe UI",sans-serif;color:#e8dcc0;text-align:center;text-shadow:0 1px 2px #000'; document.body.appendChild(el); }
    var D=sc._doom, A=sc._doomRealm==='asgard', h='<div>'+(A?'❄':'🌋')+' Ragnarök '+D.v+' / '+ZDOOM.MAX+'</div><div style="display:flex;gap:4px;justify-content:center;margin-top:2px">';
    for(var i=1;i<=ZDOOM.MAX;i++){ var on2=i<=D.v, mk=ZDOOM.MARKS.indexOf(i)>=0; h+='<span style="width:12px;height:12px;border-radius:'+(mk?'2px':'50%')+';border:1px solid '+(mk?'#ffd060':'rgba(255,255,255,.35)')+';background:'+(on2?(A?'#9fd8ff':'#ff6030'):'rgba(20,20,30,.7)')+'"></span>'; }
    h+='</div>'; el.style.display='block'; if(el._h!==h){ el._h=h; el.innerHTML=h; } }
};
setInterval(function(){ try{ var D=game.scene.getScene('Dungeon'); if(!D||!game.scene.isActive('Dungeon')||!D._doom){ var el=document.getElementById('zdoom'); if(el)el.style.display='none'; } }catch(e){} },800);

// ── the layouts (07zx ZSP) ──
(function(){ if(typeof ZSP==='undefined')return;
  ZSP.T.asgard_citadel={n:'The Citadel of Asgard',d:'Heimdall\'s Watch, Valhöll, the Hall of the Norns, Yggdrasil, the Throne of Grímnir.',liq:'chasm',built:true,arena:[25,17],near:0.85,
    s:function(fi){ return fi===3?[40,70]:fi===4?[50,40]:[60,40]; },
    gen:function(c,fi){ var R=c.R, W=c.W, H=c.H, cy=Math.round(H/2);
      if(fi===0){ // ── Heimdall's Watch: a long hall of pillars, lenses along the top wall ──
        c.fill(2); c.rect(3,5,W-6,H-10,1); c.rect(3,cy-1,W-6,3,5); c.hints.lenses=[];
        for(var x=10;x<W-8;x+=7){ [cy-7,cy+6].forEach(function(py){ c.rect(x,py,2,2,6); }); if((x/7|0)%2===0)c.rect(x+3,cy-3,1,1,6); }
        for(var lx=12;lx<W-8;lx+=14)c.hints.lenses.push([lx,6]);
        c.hints.up=[5,cy]; c.hints.down=[W-6,cy,12]; }
      else if(fi===1){ // ── Valhöll: the great hall, long benches, four horn-braziers ──
        c.fill(2); c.rect(3,4,W-6,H-8,1); c.rect(8,cy-1,W-16,2,5);
        for(var b=0;b<4;b++){ var bx=10+b*11; c.rect(bx,9,7,1,6); c.rect(bx,H-10,7,1,6); }
        c.hints.braziers=[[12,cy-6],[W-14,cy-6],[12,cy+5],[W-14,cy+5]]; c.hints.up=[W-6,cy]; c.hints.down=[5,cy,12]; }
      else if(fi===2){ // ── the Hall of the Norns: three islands over the sky; spans of thread (pre-marked, shut) ──
        c.fill(3); c.rect(2,4,12,H-8,1); c.rect(21,6,18,H-12,1); c.rect(46,4,W-48,H-8,1);
        var span=function(x0,x1,y){ var cells=[]; for(var x2=x0;x2<=x1;x2++)for(var j=-1;j<=1;j++){ c.set(x2,y+j,4); cells.push((y+j)*W+x2); } return cells; };
        var ya=R.i(10,H-11), yb=R.i(10,H-11); c.hints.spans=[{id:'span0',cells:span(14,20,ya)},{id:'span1',cells:span(39,45,yb)}];
        // a treasure nook on the middle island behind a loom-wall
        c.rect(27,2,7,3,5); var wc=[]; for(var wx=29;wx<=31;wx++){ c.set(wx,5,4); wc.push(5*W+wx); } c.hints.walls=[{id:'wall',cells:wc}]; c.hints.treasure=[30,3];
        c.hints.threads=[{at:[8,ya-3],eff:'span0'},{at:[25,cy-5]},{at:[30,cy+4]},{at:[35,cy-2]}]; c.hints.norns=[30,H-9];
        c.hints.up=[5,cy]; c.hints.down=[W-5,H-5,3]; }
      else if(fi===3){ // ── Yggdrasil: roots below, the trunk up through the middle, branches round three breaks in it ──
        c.fill(0); var mx=Math.round(W/2); c.rect(3,H-16,W-6,13,1); for(var rr=0;rr<9;rr++){ var rx=R.i(5,W-6), ry=R.i(H-15,H-5); if(Math.abs(rx-mx)>3)c.set(rx,ry,6); } c.rect(mx-2,4,5,H-10,1); c.hints.trunk=[];
        for(var yy=H-9;yy>=5;yy-=3)c.hints.trunk.push([mx,yy]);
        [Math.round(H*0.72),Math.round(H*0.48),Math.round(H*0.25)].forEach(function(gy,i){ c.rect(mx-2,gy-1,5,3,3); var sd=i%2?1:-1, bx=mx+sd*11; c.rect(Math.min(mx,bx)-1,gy+3,Math.abs(bx-mx)+3,2,1); c.rect(bx-1,gy-5,3,9,1); c.rect(Math.min(mx,bx)-1,gy-5,Math.abs(bx-mx)+3,2,1); c.disc(bx,gy,3,5); });
        c.disc(mx,6,4,5); c.hints.top=[mx,9]; c.hints.up=[W-5,H-5]; c.hints.down=[mx,5,4]; }
      else { // ── the Throne of Grímnir ──
        c.fill(2); c.rect(3,3,W-6,H-6,1); c.rect(Math.round(c.cx)-3,3,7,H-6,5); for(var p2=0;p2<6;p2++){ c.rect(8+p2*7,8,2,2,6); c.rect(8+p2*7,H-10,2,2,6); }
        c.hints.up=[Math.round(c.cx),5]; c.hints.down=[Math.round(c.cx),H-9,10]; } }};
  // the look: cream rune-paving (Kris's tx_asg_b) and marble in white and gold; Yggdrasil's floor is bark and moss; beyond the walls, a sea of cloud
  if(typeof ZSPP!=='undefined'){ ZSPP.SITE.asgard_citadel={fb:'tx_asg_b',fn:'tx_asg_b',f2b:'tx_f_marble',f2n:'tx_f_marble',pb:['ar_pillar','tf_pillar','tf_statue'],deco:['tf_statue','tf_candelabra'],set:['rn_circle','tf_c_fountain','tf_whitetree']};
    var p0=ZSPP.paint; ZSPP.paint=function(F,site,opt,fi){ ZSPP._fl=site&&site.id==='asgard_citadel'?fi:-1; try{ return p0.apply(this,arguments); } finally{ ZSPP._fl=-1; } };
    var t0=ZSPP.th; ZSPP.th=function(id,el){ var r=t0.apply(this,arguments); if(id==='asgard_citadel'&&ZSPP._fl===3)Object.assign(r,{fb:'tx_v_roots',fn:'tx_v_roots',f2b:'tx_moss',f2n:'tx_moss',pb:['tf_c_tree'],deco:[],set:['tf_whitetree']}); return r; }; }
  if(typeof ZVOID!=='undefined'){ var vp=ZVOID.pick; ZVOID.pick=function(site){ var k=vp.apply(this,arguments); if(site&&site.id==='asgard_citadel'){ k.k='sea'; k.sea='clouds'; } return k; }; }
  var z0=ZSP.zsdSite; ZSP.zsdSite=function(id){ if(id==='asgard_citadel')return {id:id,type:'castle',name:'The Citadel of Asgard',q:4,floors:ZCIT.FLOORS,el:'storm',pal:{floor:'#e8e0cc',floor2:'#d8c890',wall:'#8a7e68',wallTop:'#f4ecd8',liquid:'#1a2a48',accent:'#ffd860',glow:'#fff0b0',void:'#0a1428'}}; return z0.apply(ZSP,arguments); };
})();

// ── Grímnir, the Masked King (three phases; his look from the Lab's Bosses tab, "Asgard") ──
(function(){ if(typeof MDEFS==='undefined'||typeof BOSS_PHASES==='undefined')return;
  MDEFS.grimnir={name:'Grímnir, the Masked King',icon:'👑',hp:1800,atk:36,def:15,xp:3000,gMin:1000,gMax:1400,sec:4,color:0xd8c890,r:28,spd:46,moveType:'normal',atkType:'stomp',boss:true,lvMin:23,lvMax:25,sovWard:true};
  var PH=[{nm:'the Masked King',hp:1,sc:2.6,introT:'Grímnir rises from the high seat — his golden mask turns toward you!',kit:'kite range=180 | beam wind=0.9 len=340 w=10 col=#fff0b0 m=1 cd=3.2 | summon id=einherjar_shieldmaiden n=2 max=3 cd=10',ev:[{k:'marks',every:6,n:3,rad:26,col:'#ffe890',say:'Spears of light rain down!'}]},
    {nm:'the Wanderer Unmasked',hp:1.1,sc:2.6,bars:[{k:'ward',f:0.3,at:1}],introT:'The mask falls — the one-eyed Wanderer, and his ravens see everything!',kit:'blink every=3 d=150 | shoot p=feather n=5 sp=0.25 spd=210 m=0.5 cd=2.6 | pull r=200 keep=30 m=0.5 cd=4.5',ev:[{k:'rift',every:7,say:'The ravens drag you in!'}]},
    {nm:'the Storm of Ragnarök',hp:1.25,sc:2.9,introT:'THE LAST STORM — Grímnir becomes the gale that ends the world!',kit:'chase | ring spd=160 max=240 gap=1 col=#9fe8ff m=0.9 cd=2.8 | beam wind=0.8 len=380 w=12 col=#ffffff m=1.2 cd=2.6 | charge wind=0.5 mult=3.4 stun=1 kb=70',ev:[{k:'wave',every:7,col:'#bfe8ff',say:'A gale sweeps the throne room — find the gap!'}]}];
  BOSS_PHASES.grimnir={q:4,asg:true,phases:PH.map(function(p,i){ var form='grim_'+(i+1), C=CHAR_BY_ID.grim, D=typeof BA!=='undefined'&&BA.of(form), P=Object.assign({form:form,rid:'bp_grimnir_'+(i+1)},p); delete P.nm;
    MON_BY_ID[P.rid]={id:P.rid,name:'Grímnir, '+p.nm,q:4,seg:'boss',role:'boss',tier:5,spec:C?C.spec:{plan:'caster',pal:['#d8c890','#3a3a4a','#fff0b0','#9fe8ff']},tags:[],chId:D?form:undefined}; MX.KITS[P.rid]=P.kit; return P; })};
})();

// ── hooks: the citadel door; the Dungeon learns the citadel; Muspelheim gets the track ──
setTimeout(function(){
  if(typeof ZASG!=='undefined'){ var cz=ZASG.citadel; ZASG.citadel=function(ws){ var ps=ws&&ws.playerState; if(!ZCIT.on||!ps||!ps.asgardDown||!ws.player)return cz.apply(this,arguments); var P=ZASG.plan(ws), dx=P.cx*TILE+16, dy=(P.cy+1)*TILE+16+TILE*0.5, d=Math.hypot(ws.player.x-dx,ws.player.y-dy);
      if(d>TILE*2.2){ if(ws._interactPrompt&&ws._interactPrompt._zsp==='citadel'){ ws._interactPrompt.destroy(); ws._interactPrompt=null; } return false; }
      var t=ps.bifrost?'[Tab] Enter the Citadel of Asgard':'The citadel — its doors answer only once the Bifröst stands';
      if(!ws._interactPrompt||ws._interactPrompt._zsp!=='citadel'||ws._interactPrompt._zt!==t){ if(ws._interactPrompt)ws._interactPrompt.destroy(); ws._interactPrompt=domText(ws,dx,dy-60,t,{fontSize:'10px',color:'#fff2b0',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20); ws._interactPrompt._zsp='citadel'; ws._interactPrompt._zt=t; }
      if(Phaser.Input.Keyboard.JustDown(ws.keys.TAB)){ if(ps.bifrost){ showNotif('🏛 The golden doors swing open — the Citadel of Asgard.','#fff2b0'); ZCIT.enter(ws,0); } else showNotif('🏛 The golden doors are sealed. (Set the Lodestar in the pier notch first.)','#fff2b0'); } return true; }; }
  if(typeof ZGODS!=='undefined'){ var gc=ZGODS.cast; ZGODS.cast=function(scene){ var before=scene&&scene.worldScene&&scene.worldScene.playerState&&scene.worldScene.playerState._gbUntil, r=gc.apply(this,arguments);
      try{ var ps=scene.worldScene&&scene.worldScene.playerState; if(ps&&ps._gbUntil!==before&&ZCIT.is(scene)&&scene.floor===0){ var c=_heroCtx(scene); ZCIT.breakLens(scene,c,_heroDirAngle(c.dir)); } }catch(e){} return r; }; }
  if(typeof DungeonScene==='undefined')return; var D=DungeonScene.prototype;
  var i0=D.init; D.init=function(d){ var r=i0.apply(this,arguments); this._asgc=!!(d&&d.site&&d.site.asg); this._cit=null; this._doom=null; return r; };
  var gb=D._getBossKey; D._getBossKey=function(){ return this._asgc?'grimnir':gb.apply(this,arguments); };
  var sm=D._spawnMonster; D._spawnMonster=function(key,x,y,isBoss,mult){ if(this._asgc&&key==='grimnir'&&isBoss){ var L=BossPhases.spawn(this,'grimnir',1,x,y,mult||1); L.forEach(function(m){ m.sovWard=true; }); if(L[0])showNotif('👑 Grímnir, the Masked King, on the high seat of Asgard! (Warded — Sovereign and Godsbane bite deep.)','#fff2b0'); return L[0]||null; } return sm.apply(this,arguments); };
  var ob=D._onBossDefeated; D._onBossDefeated=function(mon){ if(!this._asgc)return ob.apply(this,arguments); var self=this, alive=(this._bossGroup||[]).filter(function(m){ return !m.dead&&m!==mon; }); if(alive.length)return;
    var ph=this._bossPhase||1; if(ph<BossPhases.count('grimnir')){ var P=BOSS_PHASES.grimnir.phases[ph]; this.cameras.main.flash(600,255,250,220); this.cameras.main.shake(800,0.012); showNotif('⚡ '+P.introT,'#fff2b0'); var x=mon.x, y=mon.y;
      setTimeout(function(){ if(!self.sys||!self.monsters||!self.sys.displayList)return; var L=BossPhases.spawn(self,'grimnir',ph+1,x,y,1); L.forEach(function(m){ m.sovWard=true; }); },1200); return; }
    BossPhases.hud(this,false); if(typeof BossMoments!=='undefined')try{ BossMoments.finale(this,mon); }catch(e){} this._bossDefeated=true; var ps=this.worldScene.playerState; ps.grimnirDown=1;
    var bc=this.interactables.find(function(i){ return i.type==='boss_chest'; }); if(bc)bc.locked=false; if(this._portalOpen)this._portalOpen();
    showNotif('🏆 Grímnir falls — the mask shatters, and the gate of heaven stands open. Go to the rune circle at Asgard\'s heart.','#fff2b0'); if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('Grímnir falls'); }catch(e){} };
  var bi=D._buildInteractables; D._buildInteractables=function(){ var r=bi.apply(this,arguments); if(this._asgc){ try{ ZCIT.build(this); }catch(e){ console.warn('citadel',e); } } else if(this._musp){ try{ ZDOOM.start(this,'musp'); }catch(e){} } return r; };
  var cg=D._canGoD; D._canGoD=function(nx,ny){ var C=this._cit; if(C&&C.blocked){ var hw=7,hh=5, P=[[nx-hw,ny-hh],[nx+hw,ny-hh],[nx-hw,ny+hh],[nx+hw,ny+hh],[nx,ny]]; for(var i=0;i<P.length;i++){ var tx=Math.floor(P[i][0]/TILE), ty=Math.floor(P[i][1]/TILE); if(C.blocked[ty*DW+tx])return false; } } return cg.apply(this,arguments); };
  var mv=D._movePlayer; D._movePlayer=function(dt){ if(this._doomRealm==='asgard'&&ZDOOM.level(this)>0){ var k=1-0.08*ZDOOM.level(this), x0=this.px, y0=this.py, r=mv.apply(this,arguments); this.px=x0+(this.px-x0)*k; this.py=y0+(this.py-y0)*k; if(this.pCont)this.pCont.setPosition(this.px,this.py); return r; } return mv.apply(this,arguments); };
  var up0=D.update; D.update=function(t,ms){ var r=up0.apply(this,arguments); if(!this._ready||this._playerDead||_anyModalOpen()||!(this._asgc||this._musp))return r; var dt=Math.min(0.1,ms/1000);
    try{ if(this._doom)ZDOOM.tick(this,dt); ZDOOM.hud(this); if(this._asgc){ ZCIT.heimdallTick(this,dt); ZCIT.yggTick(this,dt); if(this._keyR&&Phaser.Input.Keyboard.JustDown(this._keyR)&&this.floor===2)ZCIT.rewind(this); } }catch(e){ if(!this._citErr){ this._citErr=1; console.warn('citadel tick',e); } } return r; };
  var cr=D.create; D.create=function(){ var r=cr.apply(this,arguments); try{ this._keyR=this.input.keyboard.addKey('R'); }catch(e){} return r; };
  var md=D._monsterDied; if(md)D._monsterDied=function(mon){ var r=md.apply(this,arguments); if(this._asgc)try{ ZCIT.rise(this,mon); }catch(e){} return r; };
  var rs=D._spawnRosterMonster; D._spawnRosterMonster=function(mx,my){ if(!this._asgc)return rs.apply(this,arguments); var L=ZCIT.MONS[this.floor]||ZCIT.MONS[1], id=L[Math.floor(Math.random()*L.length)]; return ZCIT.spawn(this,id,mx,my); };
  var it=D._interact; D._interact=function(){ var self=this; if(this._asgc){ var near=this.interactables.find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; });
      if(near&&near.type==='cit_brazier'){ ZCIT.douse(this,near); return; } if(near&&near.type==='cit_thread'){ ZCIT.cut(this,near); return; }
      if(near&&near.type==='stairs_up'&&this.floor===0){ this._exitToWorld(null); return; } } return it.apply(this,arguments); };
  var upd=D._updateInteractPrompt; D._updateInteractPrompt=function(){ var r=upd.apply(this,arguments), self=this; if(!this._asgc||!this.interactPrompt)return r;
    var near=this.interactables.find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; }); if(!near)return r; var t=null;
    if(near.type==='cit_brazier')t='[Tab] Put out the horn-brazier'; else if(near.type==='cit_thread')t='[Tab] Cut the golden thread'; else if(near.type==='stairs_up'&&this.floor===0)t='[Tab] Leave the citadel';
    if(t)this.interactPrompt.setText(t).setPosition(this.px,this.py-52).setVisible(true); return r; };
  var ex=D._exitToWorld; if(ex)D._exitToWorld=function(){ var ps=this.worldScene&&this.worldScene.playerState; if(ps){ if(this._asgc)delete ps.doomAsg; if(this._musp)delete ps.doomMusp; } var el=document.getElementById('zdoom'); if(el)el.style.display='none'; return ex.apply(this,arguments); };
  // Muspelheim: the track's marks make the heat climb faster
  if(typeof ZFI!=='undefined'){ var hr=ZFI.heatRate; ZFI.heatRate=function(sc){ return hr.apply(this,arguments)*(1+0.25*ZDOOM.level(sc)); }; }
},0);
