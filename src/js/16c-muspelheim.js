// ═══════════════════════════════════════════════════════════════════════
// ║ 16c-muspelheim.js — round 58: MUSPELHEIM, remade (docs/28-spirit-saga.md §6; built overnight, Oct 15).
// ║ Kris (Oct 14 card): halls 1–4 "each its own challenge"; the old boss rush's eight volcano bosses as "mini-bosses in the halls"; Surtharn and the
// ║ walls "Lab options first" (wave 58/60 — his picks so far are used as they come); the Lodestar from "the Sovereign staff only" + the four Heartglasses.
// ║ The four forge keys open the gate; inside, five floors in the Dungeon scene:
// ║   1 the CHAIN LIFTS — rock shelves over a lava shaft; iron lifts on chains shuttle across each gap and carry you. A chained spirit hauls each lift:
// ║     break its chains and the lift locks into a bridge.
// ║   2 the LAVA RAFTS — a river of fire between two banks and two islands; basalt rafts drift from shore to shore. Ride them.
// ║   3 the ASH-WARDEN FORTRESS — three walled yards; each gate is shut until you pull its lever — and every lever calls the wardens.
// ║   4 the FALLING BRIDGES — stone islands over the abyss joined by slab bridges that crack under you and fall behind you (they knit again later).
// ║   5 the THRONE CAVERN — walled with captured spirits; SURTHARN, six phases (warded: Sovereign bites deep); then the GREAT HEARTH: the Sovereign
// ║     staff and the four Heartglasses become THE LODESTAR. (The collapse and escape come next — doc 28 §6.)
// ║ Halls 1–4: five chained spirits each, and two of the old volcano bosses guarding the way down (the stairs open when both fall).
// ═══════════════════════════════════════════════════════════════════════
var ZMUSP={ on:true, FLOORS:5,
  HALLS:['The Chain Lifts','The Lava Rafts','The Ash-warden Fortress','The Falling Bridges','The Throne of Surtharn'],
  GUARDS:[['boss_vr_ember_wraith','boss_vr_magma_spitter'],['boss_vr_obsidian_golem','boss_vr_cinder_phoenix'],['boss_vr_lava_wyrm','boss_vr_ashen_knight'],['boss_vr_pyrokraken','boss_vr_inferno_wraith']],
  WARDENS:['scorched_paladin','ash_wraith'],      // Kris picked both ash-warden looks: the charred soldier and the cinder wraith
  site:function(){ return {id:'muspelheim',type:'dungeon',section:4,design:'muspelheim',musp:true,name:'Muspelheim',floors:ZMUSP.FLOORS}; },
  is:function(sc){ var s=sc&&(sc._site||sc.site); return !!(s&&s.musp); },
  // ── through the gate ──
  enter:function(ws,floor){ if(ws&&ws.playerState)ws.playerState.muspEntered=1;      /* round 72g (Kris): the "all four keys" notice goes once you are in */
    document.getElementById('hud').style.display='none'; document.getElementById('dungeon-hud').style.display='block';
    if(game.scene.isPaused('World'))game.scene.resume('World'); game.scene.sleep('World'); if(game.scene.isActive('Dungeon')||game.scene.isPaused('Dungeon'))game.scene.stop('Dungeon');
    game.scene.start('Dungeon',{site:ZMUSP.site(),floor:floor||0,maxFloors:ZMUSP.FLOORS,worldScene:ws,theme:'volcano'}); },
  floorOf:function(sc){ try{ return ZSP.design('muspelheim',ZMUSP.FLOORS).floors[sc.floor]; }catch(e){ return null; } },
  // ── one floor: its mechanics ──
  build:function(sc){ var F=ZMUSP.floorOf(sc); if(!F)return; var H=F.hints||{}, M=sc._mm={lava:{},block:{},hole:{},crumb:{},plats:[],gates:[],safe:{x:sc.px,y:sc.py},hall:sc.floor}, ps=sc.worldScene.playerState;
    if(F.w!==DW||F.h!==DH)console.warn('muspelheim: floor size differs',F.w,F.h,DW,DH);
    (H.cross||[]).forEach(function(C,i){ ZMUSP.mkCross(sc,C,i); });
    (H.gates||[]).forEach(function(G,i){ ZMUSP.mkGate(sc,G,i); });
    (H.crumble||[]).forEach(function(k){ M.crumb[k]={st:0,t:0}; });
    if(sc.floor<4){ ZMUSP.placeSpirits(sc); ZMUSP.guards(sc); if(typeof ZGANG!=='undefined')ZGANG.place(sc,2,function(x,y){ var k=y*DW+x; return !M.lava[k]&&!M.block[k]&&!M.crumb[k]; }); }      // round 59: the bound gangs toil in the halls
    else ZMUSP.throne(sc);
    showNotif('🌋 Muspelheim — '+ZMUSP.HALLS[sc.floor]+(sc.floor<4?' ('+(sc.floor+1)+' / 4)':''),'#ffb070'); },
  T2P:function(i){ return {x:(i%DW)*TILE+TILE/2,y:Math.floor(i/DW)*TILE+TILE/2}; },
  // a crossing: its tiles are lava until a lift / raft is under you; the platform shuttles from end to end
  mkCross:function(sc,C,i){ var M=sc._mm, held=sc.floor===0&&(sc.worldScene.playerState.muspHeld||[]).indexOf('lift'+i)>=0;
    var lava=sc.add.graphics().setDepth(0.6), glow=sc.add.graphics().setDepth(0.61).setBlendMode(Phaser.BlendModes.ADD);
    C.tiles.forEach(function(k){ var p=ZMUSP.T2P(k); if(!held)M.lava[k]=1; lava.fillStyle(0xd84a10,1).fillRect(p.x-TILE/2,p.y-TILE/2,TILE,TILE); });      // one continuous channel of lava
    C.tiles.forEach(function(k,j){ var p=ZMUSP.T2P(k), r=((k*9301+49297)%233280)/233280; lava.fillStyle(0x7a1c06,0.55).fillEllipse(p.x-6+r*12,p.y-6+r*10,14+r*10,8+r*6); glow.fillStyle(0xffc040,0.35).fillEllipse(p.x+6-r*12,p.y+4-r*8,10+r*8,5+r*4); });
    sc.tweens.add({targets:glow,alpha:{from:0.5,to:1},duration:700+i*90,yoyo:true,repeat:-1});
    var a=ZMUSP.T2P(C.a), b=ZMUSP.T2P(C.b), raft=C.k==='raft', w=TILE*2, h=TILE*2, v=sc.add.container(a.x,a.y).setDepth(0.9);
    var g=sc.add.graphics(); if(raft){ g.fillStyle(0x1a1416,1).fillRoundedRect(-w/2,-h/2+4,w,h-6,8); g.fillStyle(0x3a3034,1).fillRoundedRect(-w/2+3,-h/2+4,w-6,h-12,6); g.lineStyle(2,0xff7030,0.8).strokeRoundedRect(-w/2,-h/2+4,w,h-6,8); }
    else { g.fillStyle(0x2a2a30,1).fillRect(-w/2,-h/2,w,h); g.lineStyle(3,0x6a6a74,1).strokeRect(-w/2+2,-h/2+2,w-4,h-4); g.lineStyle(2,0x15151a,1); for(var s=1;s<4;s++)g.lineBetween(-w/2+s*w/4,-h/2+3,-w/2+s*w/4,h/2-3); g.fillStyle(0x8a8a94,1); [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){ g.fillCircle(q[0]*(w/2-5),q[1]*(h/2-5),3); }); }
    v.add(g); var P={a:a,b:b,x:a.x,y:a.y,w:w,h:h,dir:1,u:0,wait:0.8,speed:raft?46:70,v:v,k:C.k,i:i,tiles:C.tiles,held:held};
    if(!raft){ P.chain=sc.add.graphics().setDepth(0.95); }
    if(held){ ZMUSP.holdLift(sc,P,true); } M.plats.push(P); },
  holdLift:function(sc,P,quiet){ var M=sc._mm; P.held=true; P.tiles.forEach(function(k){ delete M.lava[k]; }); P.x=(P.a.x+P.b.x)/2; P.y=(P.a.y+P.b.y)/2; P.v.setPosition(P.x,P.y);
    var br=sc.add.graphics().setDepth(0.85); P.tiles.forEach(function(k){ var p=ZMUSP.T2P(k); br.fillStyle(0x3a3036,1).fillRect(p.x-TILE/2,p.y-TILE/2+3,TILE,TILE-6); br.lineStyle(1,0x1a1416,1).strokeRect(p.x-TILE/2,p.y-TILE/2+3,TILE,TILE-6); });
    if(!quiet)showNotif('⛓ The lift locks across the gap — a bridge now.','#9fe8ff'); },
  onPlat:function(sc,x,y){ var L=sc._mm&&sc._mm.plats||[]; for(var i=0;i<L.length;i++){ var P=L[i]; if(!P.held&&Math.abs(x-P.x)<=P.w/2+1&&Math.abs(y-P.y)<=P.h/2+1)return P; } return null; },
  // a gate: shut (it blocks) until its lever is pulled; the lever calls the ash-wardens
  mkGate:function(sc,G,i){ var M=sc._mm, tiles=[], open=(sc.worldScene.playerState.muspGates||[]).indexOf('g'+i)>=0;
    for(var y=G[1];y<G[1]+G[3];y++)for(var x=G[0];x<G[0]+G[2];x++){ var k=y*DW+x; tiles.push(k); if(!open)M.block[k]=1; }
    var x0=G[0]*TILE, y0=G[1]*TILE, gw=G[2]*TILE, gh=G[3]*TILE, v=sc.add.graphics().setDepth(y0/1e4+5.2); v.fillStyle(0x15121a,0.92).fillRect(x0,y0,gw,gh); v.lineStyle(4,0x3a3440,1); for(var s=4;s<gw;s+=10)v.lineBetween(x0+s,y0,x0+s,y0+gh); for(var t=6;t<gh;t+=14)v.lineBetween(x0,y0+t,x0+gw,y0+t); v.lineStyle(2,0xff7030,0.7).strokeRect(x0,y0,gw,gh);
    if(open)v.setAlpha(0); var lp=G[4]?{x:G[4][0]*TILE+TILE/2,y:G[4][1]*TILE+TILE/2}:{x:x0-TILE*2,y:y0+gh/2};
    var lv=sc.add.graphics().setDepth(lp.y/1e4+5); lv.fillStyle(0x3a3440,1).fillRect(lp.x-6,lp.y-4,12,12); lv.lineStyle(4,0x8a8a94,1).lineBetween(lp.x,lp.y,lp.x+(open?10:-10),lp.y-18); lv.fillStyle(0xff7030,1).fillCircle(lp.x+(open?10:-10),lp.y-18,4);
    var o={type:'musp_lever',gi:i,x:lp.x,y:lp.y,opened:open}; sc.interactables.push(o); M.gates.push({i:i,tiles:tiles,v:v,lever:o,lv:lv,open:open,x:x0+gw/2,y:y0+gh/2}); },
  pull:function(sc,o){ var M=sc._mm, G=M.gates[o.gi], ps=sc.worldScene.playerState; if(!G||G.open)return; G.open=true; o.opened=true; G.tiles.forEach(function(k){ delete M.block[k]; });
    ps.muspGates=ps.muspGates||[]; ps.muspGates.push('g'+o.gi); sc.tweens.add({targets:G.v,alpha:0,duration:900}); G.lv.clear(); G.lv.lineStyle(4,0x8a8a94,1).lineBetween(o.x,o.y,o.x+10,o.y-18); G.lv.fillStyle(0xff7030,1).fillCircle(o.x+10,o.y-18,4);
    sc.cameras.main.shake(400,0.006); var n=3+o.gi; showNotif('⚙ The portcullis grinds up — and the horns sound: '+n+' ash-wardens come!','#ffb070');
    for(var j=0;j<n;j++){ var a=j/n*Math.PI*2, x=G.x+Math.cos(a)*TILE*3+TILE*2.5, y=G.y+Math.sin(a)*TILE*2.5; if(!sc._canGoD(x,y)){ x=G.x+TILE*(2+j%3); y=G.y; }
      var rid=ZMUSP.WARDENS[j%2], m=typeof MX!=='undefined'?(MX.spawn(sc,rid,x,y,{q:4,name:'Ash-warden'})||MX.spawn(sc,ZMUSP.WARDENS[(j+1)%2],x,y,{q:4,name:'Ash-warden'})):null; if(m){ if(m._m)m._m.aggro=true; sc.monsters.push(m); } } },
  // ── the chained spirits (five per hall); in the Chain Lifts the first ones haul the lifts ──
  spiritsFor:function(hall){ var L=typeof ZSPIRIT40!=='undefined'?ZSPIRIT40:[], out=[]; for(var i=0;i<5;i++){ var r=L[(hall*11+i*7+3)%40]; out.push({id:'musp_h'+hall+'_'+i,pic:r?r[0]:null,name:r?r[1]:'A spirit'}); } return out; },
  placeSpirits:function(sc){ var M=sc._mm, ps=sc.worldScene.playerState, freed=ps.muspFreed||[], list=ZMUSP.spiritsFor(sc.floor), R=rngOf(9300+sc.floor*17), en=sc.stairsUpTile||{x:0,y:0}, placed=[];
    var ok=function(x,y){ var k=y*DW+x; return (sc.dtiles[y]||[])[x]===DNG.FLOOR&&!M.lava[k]&&!M.block[k]&&!M.crumb[k]&&(!sc._labReach||sc._labReach[k]); };
    if(sc.floor===0)M.plats.forEach(function(P,i){ if(placed.length>=list.length)return; var tx=Math.round((P.a.x-TILE/2)/TILE)-1, ty=Math.round((P.a.y-TILE/2)/TILE)-1;      // at the lift's winch, on the near shore
      for(var d=0;d<5;d++){ var x=tx-d, y=ty; if(ok(x,y)){ placed.push({x:x,y:y,lift:i}); return; } } });
    for(var t=0;t<5000&&placed.length<list.length;t++){ var x=R.i(3,DW-4), y=R.i(3,DH-4); if(!ok(x,y)||Math.hypot(x-en.x,y-en.y)<6)continue; if(placed.some(function(p){ return Math.hypot(p.x-x,p.y-y)<8; }))continue; placed.push({x:x,y:y}); }
    sc._muspSp=[]; placed.forEach(function(p,i){ var S=list[i], px=p.x*TILE+TILE/2, py=p.y*TILE+TILE/2, done=freed.indexOf(S.id)>=0, o={type:'musp_spirit',sid:S.id,name:S.name,x:px,y:py,opened:done,lift:p.lift};
      if(!done){ var vis=typeof ZSPM!=='undefined'?ZSPM.make(sc,'sp_u_'+S.pic+'_bound',px,py+10,'bound',{depth:py+20}):null; if(vis)vis.setDepth(py/1e4+5); o.vis=vis;
        var ch=sc.add.graphics().setDepth(py/1e4+4.9); ch.lineStyle(2,0x3a3a40,1); ch.beginPath(); ch.moveTo(px+6,py+10); ch.lineTo(px+30,py+16); ch.strokePath(); ch.fillStyle(0x2a2a30,1).fillRect(px+28,py+8,6,12); o.chain=ch;
        o.lbl=domText(sc,px,py-60,'⛓ '+S.name+(p.lift!==undefined?' (hauls the lift)':''),{fontSize:'9px',color:'#9fe8ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(9000); }
      sc.interactables.push(o); sc._muspSp.push(o); }); },
  freeSpirit:function(sc,o){ var ps=sc.worldScene.playerState; o.opened=true;
    if(o.chain){ var ch=o.chain; sc.tweens.add({targets:ch,alpha:0,duration:400,onComplete:function(){ ch.destroy(); }}); } if(o.lbl)o.lbl.destroy();
    if(o.vis){ var v=o.vis; sc.tweens.add({targets:v,y:v.y-90,alpha:0,duration:2200,ease:'Sine.in',onComplete:function(){ v.destroy(); }}); }
    for(var i=0;i<10;i++){ var s=sc.add.circle(o.x,o.y,2,0x9fe8ff,1).setDepth(9000); sc.tweens.add({targets:s,x:o.x+(Math.random()-0.5)*60,y:o.y-30-Math.random()*60,alpha:0,duration:900,onComplete:function(){ this.targets[0].destroy(); }}); }
    ps.muspFreed=ps.muspFreed||[]; if(ps.muspFreed.indexOf(o.sid)<0)ps.muspFreed.push(o.sid);
    if(o.lift!==undefined){ var P=sc._mm.plats[o.lift]; ps.muspHeld=ps.muspHeld||[]; if(ps.muspHeld.indexOf('lift'+o.lift)<0)ps.muspHeld.push('lift'+o.lift); if(P&&!P.held)ZMUSP.holdLift(sc,P); }
    var n=ps.muspFreed.length; showNotif('⛓ '+o.name+'\'s chains break! "Thank you, '+heroName(ps)+'." — '+n+' / 20 spirits of Muspelheim free','#9fe8ff'); },
  // ── the guards of the way down: two of the old volcano bosses ──
  guards:function(sc){ var ps=sc.worldScene.playerState, key='musp_g'+(sc.floor+1); if((ps.muspGuards||[]).indexOf(key)>=0||!sc.stairsDownTile)return;
    var s=sc.stairsDownTile, x=s.x*TILE+TILE/2, y=s.y*TILE+TILE/2, best=null; for(var r=3;r<8&&!best;r++)for(var a=0;a<16&&!best;a++){ var X=x+Math.cos(a/16*Math.PI*2)*r*TILE, Y=y+Math.sin(a/16*Math.PI*2)*r*TILE; if(sc._canGoD(X,Y))best={x:X,y:Y}; }
    best=best||{x:x,y:y-TILE*3}; var L=BossPhases.spawn(sc,key,1,best.x,best.y,1); sc._muspGuard=L.length>0; BossPhases.hud(sc,false); sc._mm.ghud=false;      // their bars show when you come near
    if(L.length)showNotif('⚔ '+L.map(function(m){ return m.def.name; }).join(' and ')+' guard the way down!','#ffb070'); },
  // ── the throne cavern: the spirit walls, the great hearth ──
  throne:function(sc){ var F=ZMUSP.floorOf(sc), A=F&&F.arena, Z=typeof _scn==='function'?_scn():null; if(!A)return;
    var walls=['sw2_relief','sw2_glass','sw2_cage','sw2_lanterns','sw2_lavafall','sw2_channels'];      // round 59: Kris approved all six round-two walls
    if(Z&&Z.has)for(var i=0;i<6;i++){ var id=walls[i%walls.length]; if(!Z.has(id))continue; var x=(A[0]+1.5+i*(A[2]-2)/5)*TILE, y=(A[1]-0.2)*TILE; var im=Z.image(sc,id,x,y,Z.K*0.9,0.95); if(im)im.setOrigin(0.5,1); }
    var bc=sc.bossChestTile; if(!bc)return; var hx=null, hy=null; for(var r=3;r<7&&hx===null;r++)for(var a=0;a<12&&hx===null;a++){ var x2=Math.round(bc.x+Math.cos(a/12*Math.PI*2+Math.PI)*r), y2=Math.round(bc.y+Math.sin(a/12*Math.PI*2+Math.PI)*r); if((sc.dtiles[y2]||[])[x2]===DNG.FLOOR){ hx=x2; hy=y2; } }
    if(hx===null)return; var px=hx*TILE+TILE/2, py=hy*TILE+TILE/2, o={type:'musp_hearth',x:px,y:py,opened:false};
    var im2=Z&&Z.has&&Z.has('gh_hearth_a')?Z.image(sc,'gh_hearth_a',px,py+14,Z.K*1.25,py/1e4+5):null;
    if(im2){ im2.setOrigin(0.5,1); if(ZFORGE.alive)ZFORGE.alive(sc,'great',im2); } else { var g=sc.add.graphics().setDepth(py/1e4+5); g.fillStyle(0x2a2220,1).fillEllipse(px,py+8,80,32); g.fillStyle(0xffa040,0.9).fillEllipse(px,py-4,52,18); }
    sc.interactables.push(o); sc._muspHearth=o; },
  hearth:function(sc){ var ps=sc.worldScene.playerState, inv=ps.inventory||(ps.inventory=[]);
    if(!sc._bossDefeated){ showNotif('🔥 The great hearth burns behind Surtharn — beat him first.','#ffb070'); return; }
    if(inv.indexOf('lodestar')>=0||(ps.equip&&ps.equip.mWeapon==='lodestar')){ showNotif('🌟 The Lodestar is already yours.','#fff2b0'); return; }
    var staff=inv.indexOf('sov_staff')>=0||(ps.equip&&ps.equip.mWeapon==='sov_staff'), hg=[1,2,3,4].filter(function(q){ return inv.indexOf('heartglass_'+q)>=0; });
    if(!staff||hg.length<4){ showNotif('🔥 The great hearth needs '+(!staff?'the Sovereign staff (all sixteen mage towers, or the forge once the forges rise)':'')+(!staff&&hg.length<4?' and ':'')+(hg.length<4?'all four Heartglasses ('+hg.length+' / 4 — one from each forge\'s hearth)':'')+'.','#ffb070'); return; }
    [1,2,3,4].forEach(function(q){ inv.splice(inv.indexOf('heartglass_'+q),1); }); if(inv.indexOf('sov_staff')>=0)inv.splice(inv.indexOf('sov_staff'),1); else if(ps.equip)ps.equip.mWeapon=null;
    inv.push('lodestar'); if(typeof Tome!=='undefined'&&Tome.see)try{ Tome.see('item','lodestar'); }catch(e){}
    var o=sc._muspHearth; sc.cameras.main.flash(900,255,250,220); if(o)for(var i=0;i<40;i++){ var s=sc.add.circle(o.x,o.y-20,3,[0x9fe8ff,0xffe080,0xff6040,0x60ff80,0x60a0ff,0xc080ff][i%6],1).setDepth(9000); sc.tweens.add({targets:s,x:o.x+(Math.random()-0.5)*220,y:o.y-60-Math.random()*160,alpha:0,duration:1800,onComplete:function(){ this.targets[0].destroy(); }}); }
    var Zp=typeof _scn==='function'?_scn():null; if(o&&Zp&&Zp.has&&Zp.has('ls2_c')){ var st=Zp.image(sc,'ls2_c',o.x,o.y-10,Zp.K*0.9,9001); if(st){ st.setOrigin(0.5,1); st.setAlpha(0); sc.tweens.add({targets:st,alpha:1,y:st.y-70,duration:1400,ease:'Sine.easeOut',onComplete:function(){ sc.tweens.add({targets:st,alpha:0,delay:1600,duration:700,onComplete:function(){ st.destroy(); }}); }}); } }      // round 59: the painted Lodestar (ls2_c) rises from the hearth
    showNotif('🌟 The staff drinks the four Heartglasses — a lens of white light opens at its heart: THE LODESTAR. It will lead the spirits home.','#fff2b0'); if(sc.worldScene._emitUI)sc.worldScene._emitUI(); if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('the Lodestar'); }catch(e){} },
  claim:function(sc){ var ps=sc.worldScene.playerState; ps.completedQuests=ps.completedQuests||[]; ['volcano_lord','muspelheim'].forEach(function(q){ if(ps.completedQuests.indexOf(q)<0)ps.completedQuests.push(q); });
    ps.gold=(ps.gold||0)+2500; ps.xp=(ps.xp||0)+500; if(typeof ZLoot!=='undefined')try{ ZLoot.site(sc,ps,4); }catch(e){}
    showNotif('🏆 Surtharn, Tyrant of Muspelheim, is beaten! +2500 gold'+((ps.inventory||[]).indexOf('lodestar')<0?' — the great hearth still waits for the staff and the four Heartglasses.':''),'#ffdd44');
    if(sc.worldScene._save)sc.worldScene._save(); var self=sc; setTimeout(function(){ if(self.sys&&self.sys.displayList)self._exitToWorld(); },1800); },
  // ── every frame: the lifts and rafts, the crumbling bridges, falling ──
  tick:function(sc,dt){ var M=sc._mm; if(!M)return; dt=Math.min(dt,0.25); var ps=sc.worldScene.playerState;
    M.plats.forEach(function(P){ if(P.held)return; var ox=P.x, oy=P.y; if(P.wait>0){ P.wait-=dt; } else { var L=Math.hypot(P.b.x-P.a.x,P.b.y-P.a.y)||1; P.u+=P.dir*P.speed*dt/L; if(P.u>=1||P.u<=0){ P.u=Math.max(0,Math.min(1,P.u)); P.dir*=-1; P.wait=1.3; }
        P.x=P.a.x+(P.b.x-P.a.x)*P.u; P.y=P.a.y+(P.b.y-P.a.y)*P.u; P.v.setPosition(P.x,P.y+(P.k==='raft'?Math.sin(Date.now()/300+P.i)*1.5:0)); }
      if(Math.abs(sc.px-ox)<=P.w/2+1&&Math.abs(sc.py-oy)<=P.h/2+1){ sc.px+=P.x-ox; sc.py+=P.y-oy; }
      if(P.chain){ P.chain.clear(); P.chain.lineStyle(2,0x8a8a94,0.9); [[-1,-1],[1,-1]].forEach(function(q){ P.chain.lineBetween(P.x+q[0]*(P.w/2-5),P.y-P.h/2+4,P.x+q[0]*(P.w/2-5),P.y-P.h/2-60); }); } });
    if(sc._muspGuard){ var nearG=(sc._bossGroup||[]).some(function(m){ return !m.dead&&Math.hypot(m.x-sc.px,m.y-sc.py)<TILE*10; }); if(nearG!==!!M.ghud){ M.ghud=nearG; BossPhases.hud(sc,nearG); } }
    var now=Date.now(), tk=Math.floor(sc.px/TILE)+Math.floor(sc.py/TILE)*DW;
    for(var k in M.crumb){ var C=M.crumb[k]; if(C.st===0&&+k===tk){ C.st=1; C.t=0.85; ZMUSP.crack(sc,+k,C); } else if(C.st===1){ C.t-=dt; if(C.t<=0){ C.st=2; C.t=7; M.hole[k]=1; ZMUSP.fall(sc,+k,C); } } else if(C.st===2){ C.t-=dt; if(C.t<=0&&+k!==tk){ C.st=0; delete M.hole[k]; if(C.g){ var g=C.g; sc.tweens.add({targets:g,alpha:0,duration:600,onComplete:function(){ g.destroy(); }}); C.g=null; } } } }
    var on=ZMUSP.onPlat(sc,sc.px,sc.py), bad=(M.lava[tk]||M.hole[tk])&&!on;
    if(bad&&!(M._fallT>now)){ M._fallT=now+1200; var dmg=ps.godMode?0:Math.max(1,Math.round((ps.maxHp||30)*0.12)); ps.hp=Math.max(0,(ps.hp||0)-dmg); sc.px=M.safe.x; sc.py=M.safe.y; sc.cameras.main.shake(250,0.008);
      showNotif(M.hole[tk]?'💥 The bridge falls away — you scramble back!':'🔥 Into the fire — you leap back to the rock!','#ff8050'); if(sc._updateDungeonHUD)sc._updateDungeonHUD(); if(ps.hp<=0&&sc._playerDied)sc._playerDied(); }
    else if(!bad&&!M.lava[tk]&&!M.hole[tk]&&!M.crumb[tk]&&!on&&(sc.dtiles[Math.floor(sc.py/TILE)]||[])[Math.floor(sc.px/TILE)]!==DNG.WALL){ M.safe.x=sc.px; M.safe.y=sc.py; } },
  crack:function(sc,k,C){ var p=ZMUSP.T2P(k), g=sc.add.graphics().setDepth(0.92); g.lineStyle(2,0x120808,0.9); g.lineBetween(p.x-12,p.y-8,p.x+2,p.y+3); g.lineBetween(p.x+2,p.y+3,p.x+12,p.y-6); g.lineBetween(p.x-3,p.y+12,p.x+2,p.y+3); C.g=g; sc.tweens.add({targets:g,x:{from:-1,to:1},duration:60,yoyo:true,repeat:6}); },
  fall:function(sc,k,C){ var p=ZMUSP.T2P(k); if(C.g)C.g.destroy(); var g=sc.add.graphics().setDepth(0.93); g.fillStyle(0x070405,1).fillRect(p.x-TILE/2,p.y-TILE/2,TILE,TILE); g.fillStyle(0xff5010,0.35).fillRect(p.x-TILE/2+4,p.y-TILE/2+4,TILE-8,TILE-8); C.g=g;
    for(var i=0;i<5;i++){ var s=sc.add.rectangle(p.x+(Math.random()-0.5)*20,p.y,6,6,0x4a3a3a).setDepth(0.94); sc.tweens.add({targets:s,y:p.y+40,alpha:0,angle:180,duration:700,onComplete:function(){ this.targets[0].destroy(); }}); } }
};
ZMUSP.STAFF_HINT='the Sovereign staff';

// ── the five floors (07zx ZSP layouts) ──
(function(){ if(typeof ZSP==='undefined')return;
  var mark=function(c,x0,y0,x1,y1,wd,out){ var n=Math.ceil(Math.hypot(x1-x0,y1-y0)*2)+1, seen={}; for(var k=0;k<=n;k++){ var x=x0+(x1-x0)*k/n, y=y0+(y1-y0)*k/n, o=Math.floor(wd/2);
      for(var j=0;j<wd;j++)for(var i=0;i<wd;i++){ var X=Math.floor(x)-o+i, Y=Math.floor(y)-o+j; if(!c.inb(X,Y))continue; var I=c.I(X,Y); if(c.g[I]===3){ c.g[I]=4; if(!seen[I]){ seen[I]=1; out.push(I); } } } } return out; };
  var cross=function(c,x0,y0,x1,y1,kind){ var T=mark(c,x0,y0,x1,y1,2,[]); if(!T.length)return; var d=function(I){ return Math.hypot(I%c.W-x0,Math.floor(I/c.W)-y0); }; T.sort(function(a,b){ return d(a)-d(b); }); (c.hints.cross=c.hints.cross||[]).push({tiles:T,a:T[0],b:T[T.length-1],k:kind}); };
  ZSP.T.muspelheim={n:'Muspelheim',d:'Four halls of trial above the throne of Surtharn: the Chain Lifts, the Lava Rafts, the Ash-warden Fortress, the Falling Bridges; the Throne Cavern below.',liq:'lava',arena:[25,17],near:0.9,
    s:function(fi){ return fi===4?[50,40]:[64,40]; },
    gen:function(c,fi){ var R=c.R, W=c.W, H=c.H;
      if(fi===0){ // ── the Chain Lifts: four rock shelves, a lift across each gap ──
        c.fill(3); var sw=11, gap=4, x=3; for(var s=0;s<4;s++){ c.rect(x,3,sw,H-6,1); for(var b=0;b<5;b++)c.disc(x+(R.chance(0.5)?0:sw-1),R.i(5,H-6),R.i(1,2),3); if(R.chance(0.7))c.set(x+R.i(2,sw-3),R.i(5,H-6),6);
          if(s<3){ var y=R.i(7,H-8); cross(c,x+sw,y,x+sw+gap-1,y,'lift'); c.rect(x+sw-2,y-1,2,3,1); c.rect(x+sw+gap,y-1,2,3,1); } x+=sw+gap; }
        c.hints.up=[5,Math.round(H/2)]; c.hints.down=[W-6,Math.round(H/2),14]; }
      else if(fi===1){ // ── the Lava Rafts: two banks, two islands, rafts between ──
        c.fill(3); c.rect(2,3,12,H-6,1); c.rect(W-14,3,12,H-6,1); var yA=R.i(9,H-10), yB=R.i(9,H-10), xA=24, xB=40; c.disc(xA,yA,5,1); c.disc(xB,yB,5,1); c.set(xA,yA,6); c.set(xB+1,yB-1,6);
        var y1=R.i(8,H-9), y4=R.i(8,H-9); cross(c,14,y1,xA-5,yA,'raft'); cross(c,xA+5,yA,xB-5,yB,'raft'); cross(c,xB+5,yB,W-15,y4,'raft');
        for(var e=0;e<6;e++)c.disc(R.chance(0.5)?R.i(3,12):R.i(W-13,W-3),R.i(4,H-5),1,6);
        c.hints.up=[5,Math.round(H/2)]; c.hints.down=[W-6,Math.round(H/2),14]; }
      else if(fi===2){ // ── the Ash-warden Fortress: three yards, a gate and a lever in each wall ──
        c.fill(2); c.rect(2,2,W-4,H-4,1); var walls=[17,33,49]; c.hints.gates=[];
        walls.forEach(function(wx,i){ c.rect(wx,2,2,H-4,2); var gy=R.i(6,H-10); c.rect(wx,gy,2,3,1); var ly=Math.max(4,Math.min(H-5,gy+(R.chance(0.5)?-4:5))); c.hints.gates.push([wx,gy,2,3,[wx-3,ly]]);
          var tx=wx-9, by=R.chance(0.5)?3:H-9; if(tx>3){ c.box(tx,by,6,6,5); c.set(tx+3,by+(by===3?5:0),1); } });
        for(var p=0;p<26;p++){ var px=R.i(4,W-5), py=R.i(4,H-5); if(c.get(px,py)===1&&walls.every(function(w){ return Math.abs(px-w)>3; }))c.set(px,py,6); }
        c.hints.up=[5,Math.round(H/2)]; c.hints.down=[W-6,Math.round(H/2),12]; }
      else if(fi===3){ // ── the Falling Bridges: stone islands over the abyss, slab bridges that crumble ──
        c.fill(3); var P=[[5,Math.round(H/2)]], x2=5, cr=[]; while(x2<W-12){ x2+=R.i(7,9); P.push([Math.min(W-6,x2),R.i(7,H-8)]); }
        P.forEach(function(q,i){ c.disc(q[0],q[1],i===0||i===P.length-1?5:R.i(3,4),1); if(i&&i<P.length-1&&R.chance(0.5))c.set(q[0],q[1],6); });
        for(var i2=1;i2<P.length;i2++){ var A2=P[i2-1], B2=P[i2], T2=mark(c,A2[0],A2[1],B2[0],B2[1],2,[]); cr=cr.concat(T2); }
        for(var sI=0;sI<3;sI++){ var b0=P[R.i(1,P.length-2)], sx=Math.max(5,Math.min(W-6,b0[0]+R.i(-3,3))), sy=b0[1]<H/2?Math.min(H-5,b0[1]+R.i(9,12)):Math.max(4,b0[1]-R.i(9,12)); c.disc(sx,sy,3,1); cr=cr.concat(mark(c,b0[0],b0[1],sx,sy,2,[])); }
        c.hints.crumble=cr; c.hints.up=P[0]; c.hints.down=[P[P.length-1][0],P[P.length-1][1],4]; }
      else { // ── the Throne Cavern ──
        c.fill(3); c.cave(3,3,W-6,H-6,0.36,4,1); c.disc(c.cx,c.cy,13,1); c.rect(Math.round(c.cx)-2,H-12,5,9,1);
        for(var r=0;r<14;r++){ var rx=R.i(4,W-5), ry=R.i(4,H-5); if(c.get(rx,ry)===1)c.disc(rx,ry,1,3); }
        c.hints.up=[Math.round(c.cx),H-5]; c.hints.down=[Math.round(c.cx),9,10]; } }};
  var z0=ZSP.zsdSite; ZSP.zsdSite=function(id){ if(id==='muspelheim')return {id:id,type:'ember',name:'Muspelheim',q:4,floors:ZMUSP.FLOORS,el:'fire',pal:typeof ZSD!=='undefined'&&ZSD.basePal?ZSD.basePal('ember',null,'fire'):null}; return z0.apply(ZSP,arguments); };
})();

// ── the guards (two old volcano bosses per hall) and Surtharn (six phases) ──
(function(){ if(typeof MDEFS==='undefined'||typeof BOSS_PHASES==='undefined')return;
  var KIT={boss_vr_ember_wraith:'blink every=4 d=140 | shoot p=orb n=3 sp=0.3 spd=170 m=0.6 cd=2.4',boss_vr_magma_spitter:'chase | lob n=3 rad=30 t=1 zone=burn zt=3 col=#ff7030 m=0.8 cd=3 | lunge r=110 m=1 cd=3',
    boss_vr_obsidian_golem:'charge wind=0.7 mult=3 stun=1 kb=50 | slam r=70 zone=burn zt=3 m=1.2 cd=3.2',boss_vr_cinder_phoenix:'flit | lunge r=130 m=1.1 cd=3 | ring spd=140 max=180 gap=1 col=#ff9030 st=burn m=0.6 cd=4.5',
    boss_vr_lava_wyrm:'burrow | lunge r=120 m=1.2 cd=2.8 | lob n=2 rad=30 t=1 zone=burn zt=3 col=#ff6020 m=0.8 cd=3.4',boss_vr_ashen_knight:'charge wind=0.6 mult=3 stun=1 kb=60 | sweep r=64 arc=3 m=1.2 cd=2.4',
    boss_vr_pyrokraken:'lumber | ring spd=130 max=200 gap=1 col=#ff7030 st=burn m=0.7 cd=3.6 | pull r=180 keep=30 m=0.4 cd=5',boss_vr_inferno_wraith:'kite range=180 | beam wind=0.9 len=300 w=10 col=#ff6030 m=0.9 cd=3.4 | pull r=190 keep=28 m=0.4 cd=5'};
  var reg=function(rid,form,kit){ var C=CHAR_BY_ID[form], D=typeof BA!=='undefined'&&BA.of(form); MON_BY_ID[rid]={id:rid,name:(D&&D.name)||(C&&C.name)||form,q:4,seg:'boss',role:'boss',tier:5,spec:C?C.spec:{plan:'brute',pal:['#5a2a1a','#2a1008','#ff9040','#ffe060']},tags:[],chId:D?form:undefined}; MX.KITS[rid]=kit; };
  ZMUSP.GUARDS.forEach(function(G,h){ var key='musp_g'+(h+1); MDEFS[key]={name:'Guards of '+ZMUSP.HALLS[h],icon:'🔥',hp:720+h*80,atk:24+h*2,def:10,xp:400,gMin:150,gMax:220,sec:4,color:0xcc4410,r:22,spd:50,moveType:'normal',atkType:'stomp',boss:true,lvMin:18,lvMax:20};
    var P={form:G[0],rid:'bp_'+key+'_1',hp:1,sc:2.0,kit:KIT[G[0]],introT:'',ev:[{k:'marks',every:7,n:2,rad:22,col:'#ff8040',say:'Embers fall from the roof!'}],allies:[{form:G[1],rid:'bp_'+key+'_1_a0',n:1,hp:0.9,kit:KIT[G[1]]}]};
    BOSS_PHASES[key]={q:4,musp:true,phases:[P]}; reg(P.rid,P.form,P.kit); reg(P.allies[0].rid,G[1],P.allies[0].kit); });
  MDEFS.surtharn={name:'Surtharn, Tyrant of Muspelheim',icon:'🌋',hp:1500,atk:34,def:14,xp:2500,gMin:900,gMax:1200,sec:4,color:0x661100,r:28,spd:44,moveType:'normal',atkType:'stomp',boss:true,lvMin:22,lvMax:24,sovWard:true};
  var PH=[ // the six phases — the painted six (wave 60: Colossus, Forge-king, Ash Tyrant, Jötunn, Obsidian, Volcano) and doc 28 §6's patterns
    {nm:'the Molten Colossus',hp:1,sc:2.6,introT:'Surtharn rises from the magma, his greatsword burning!',kit:'lumber | sweep r=80 arc=3.4 m=1.3 cd=2.6 | slam r=80 zone=burn zt=4 m=1.2 cd=3.4',ev:[{k:'marks',every:6,n:3,rad:26,col:'#ff8040',say:'The blade sets the floor alight!'}]},
    {nm:'the Forge-king',hp:1.05,sc:2.7,introT:'The Forge-king — his hammer rings the cavern!',kit:'lumber | slam r=90 zone=burn zt=4 m=1.3 cd=3 | ring spd=140 max=230 gap=1 col=#ff9040 st=burn m=0.8 cd=3.6',ev:[{k:'wave',every:8,col:'#ff7030',say:'A shockwave rolls from the anvil!'}]},
    {nm:'the Ash Tyrant',hp:1.1,sc:2.7,bars:[{k:'ward',f:0.3,at:1}],introT:'The Ash Tyrant drives the bound host before him — free them with your magic!',kit:'kite range=190 | pull r=210 keep=30 m=0.5 cd=4 | shoot p=orb n=5 sp=0.25 spd=190 m=0.5 cd=2.6',ev:[{k:'rift',every:7,say:'Chains of spirit-light drag you in!'}]},
    {nm:'the Horned Jötunn',hp:1.15,sc:2.8,introT:'The Horned Jötunn — the Sword of Flame sweeps the whole hall!',kit:'charge wind=0.6 mult=3.4 stun=1 kb=70 | beam wind=1 len=360 w=12 col=#ff6020 m=1.1 cd=3',ev:[{k:'wave',every:7,col:'#ff5020',say:'The sword of flame sweeps — find the gap!'}]},
    {nm:'the Obsidian Warlord',hp:1.2,sc:2.8,bars:[{k:'plate',f:0.35,at:1}],introT:'The Obsidian Warlord — his molten heart is caged in glass. Break the plate!',kit:'lumber | lob n=4 rad=40 t=1.1 zone=burn zt=4 col=#ff7030 m=0.9 cd=3 | slam r=84 zone=burn zt=4 m=1.3 cd=3',ev:[{k:'marks',every:5,n:4,rad:28,col:'#ffb040',say:'Meteors fall!'}]},
    {nm:'the Living Volcano',hp:1.3,sc:3.0,introT:'THE LAST EMBER — Surtharn becomes the volcano itself!',kit:'chase | ring spd=160 max=240 gap=1 col=#ff6020 st=burn m=0.9 cd=2.8 | breath r=190 cone=0.9 col=#ff5020 st=burn m=1.3 cd=2.4 | lob n=4 rad=36 t=1 zone=burn zt=4 col=#ff7030 m=0.8 cd=3.2',ev:[{k:'geyser',every:4,n:4,rad:36,st:'burn',col:'#ff6020',say:'The lava rises!'}]}];
  BOSS_PHASES.surtharn={q:4,musp:true,phases:PH.map(function(p,i){ var form=BOSS_SLOTS&&BOSS_SLOTS['surt_'+(i+1)]?'surt_'+(i+1):'boss_volcano_lord', P=Object.assign({form:form,rid:'bp_surtharn_'+(i+1)},p); delete P.nm;
    reg(P.rid,form,P.kit); MON_BY_ID[P.rid].name='Surtharn, '+p.nm; return P; })};
})();

// ── the items: the Lodestar; the Sovereign plate now comes from Surtharn ──
(function(){ if(typeof ITEMS==='undefined')return;
  ITEMS.lodestar={magic:true,name:'The Lodestar',icon:'🌟',atk:40,slot:'mWeapon',spellMult:2.6,sell:0,buy:0,sov:1,el:'all',tomeHint:'Made at the great hearth of Muspelheim from the Sovereign staff and the four Heartglasses',desc:'+40 MAGIC ATK, ×2.6 spell dmg, Sovereign — the white lens at its heart was lit by the four realms\' freed light. It will lead the spirits home.',pic:'a white-gold staff whose head is a rune-carved ring holding the six elemental gems round a large clear lens, a faint world-tree in the lens'};
  // round 59: Kris picked the Rune-ring lens (wave 60, ls2_c) — it is the Lodestar's painted icon until a square icon is painted
  if(typeof ZScn!=='undefined'&&ZScn.META&&ZScn.META.items&&ZScn.META.items.ls2_c&&!ZScn.META.items.ic_lodestar)ZScn.META.items.ic_lodestar=ZScn.META.items.ls2_c;
  if(typeof ZSov!=='undefined'){ var S=ZSov.setOf&&ZSov.setOf('sov_plate'); if(S)S.how='Defeat Surtharn in Muspelheim'; } })();

// ── hooks: the gate; the Dungeon learns Muspelheim ──
setTimeout(function(){
  if(typeof ZFORGE!=='undefined'&&ZFORGE.MOUTH)ZFORGE.MOUTH.great=[0.5,0.42,'fire',[0xffa040,0xffe080,0xffffff]];
  if(typeof WorldScene!=='undefined'){ var W=WorldScene.prototype, en0=W._enterSite; if(en0)W._enterSite=function(site){ if(ZMUSP.on&&site&&site.type==='volcano_main'&&typeof _hasAllVolcanoKeys==='function'&&_hasAllVolcanoKeys(this.playerState)){ showNotif('🌋 The four keys turn — the gate of Muspelheim grinds open.','#ff6622'); ZMUSP.enter(this,0); return; } return en0.apply(this,arguments); }; }
  if(typeof DungeonScene==='undefined')return; var D=DungeonScene.prototype;
  var i0=D.init; D.init=function(d){ var r=i0.apply(this,arguments); this._musp=!!(d&&d.site&&d.site.musp); this._mm=null; this._muspGuard=false; this._muspSp=null; this._muspHearth=null; return r; };
  var gb=D._getBossKey; D._getBossKey=function(){ return this._musp?'surtharn':gb.apply(this,arguments); };
  var sm=D._spawnMonster; D._spawnMonster=function(key,x,y,isBoss,mult){ if(this._musp&&key==='surtharn'&&isBoss){ var L=BossPhases.spawn(this,'surtharn',1,x,y,mult||1); L.forEach(function(m){ m.sovWard=true; }); if(L[0])showNotif('🌋 Surtharn, Tyrant of Muspelheim! (Warded by his own fire — Sovereign bites deep.)','#ff7040'); return L[0]||null; } return sm.apply(this,arguments); };
  var ob=D._onBossDefeated; D._onBossDefeated=function(mon){ if(!this._musp)return ob.apply(this,arguments); var self=this;
    var alive=(this._bossGroup||[]).filter(function(m){ return !m.dead&&m!==mon; }); if(alive.length)return;
    if(this.floor<ZMUSP.FLOORS-1){ var ps=this.worldScene.playerState, key='musp_g'+(this.floor+1); ps.muspGuards=ps.muspGuards||[]; if(ps.muspGuards.indexOf(key)<0)ps.muspGuards.push(key); this._muspGuard=false; BossPhases.hud(this,false);
      showNotif('⚔ The guards fall — the way down to '+ZMUSP.HALLS[this.floor+1]+' is open!','#ffdd44'); return; }
    var ph=this._bossPhase||1; if(ph<BossPhases.count('surtharn')){ var P=BOSS_PHASES.surtharn.phases[ph]; this.cameras.main.flash(600,255,180,120); this.cameras.main.shake(800,0.012); showNotif('⚡ '+P.introT,'#ff9050'); var x=mon.x, y=mon.y;
      setTimeout(function(){ if(!self.sys||!self.monsters||!self.sys.displayList)return; var L=BossPhases.spawn(self,'surtharn',ph+1,x,y,1); L.forEach(function(m){ m.sovWard=true; }); },1200); return; }
    BossPhases.hud(this,false); if(typeof BossMoments!=='undefined')try{ BossMoments.finale(this,mon); }catch(e){} this._bossDefeated=true;
    var bc=this.interactables.find(function(i){ return i.type==='boss_chest'; }); if(bc)bc.locked=false; if(this._portalOpen)this._portalOpen();
    showNotif('🏆 Surtharn falls! The great hearth blazes — bring the Sovereign staff and the four Heartglasses to it.','#ffdd44'); };
  var bi=D._buildInteractables; D._buildInteractables=function(){ var r=bi.apply(this,arguments); if(this._musp){ try{ ZMUSP.build(this); }catch(e){ console.warn('muspelheim',e); } } return r; };
  var cg=D._canGoD; D._canGoD=function(nx,ny){ var M=this._mm; if(!M)return cg.apply(this,arguments); var hw=7,hh=5, C=[[nx-hw,ny-hh],[nx+hw,ny-hh],[nx-hw,ny+hh],[nx+hw,ny+hh],[nx,ny]];
    for(var i=0;i<C.length;i++){ var tx=Math.floor(C[i][0]/TILE), ty=Math.floor(C[i][1]/TILE); if(tx<0||tx>=DW||ty<0||ty>=DH)return false; if(this.dtiles[ty][tx]===DNG.WALL)return false; var k=ty*DW+tx;
      if(M.block[k])return false; if((M.lava[k]||M.hole[k])&&!ZMUSP.onPlat(this,C[i][0],C[i][1]))return false; }
    if(this._mxFx&&MX.blocked(this,nx,ny))return false; return true; };
  var up0=D.update; D.update=function(t,ms){ var r=up0.apply(this,arguments); if(this._mm)try{ ZMUSP.tick(this,ms/1000); }catch(e){ if(!this._mmErr){ this._mmErr=1; console.warn('muspelheim tick',e); } } return r; };
  var it=D._interact; D._interact=function(){ var self=this; if(this._musp){ var near=this.interactables.find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; });
      if(near&&near.type==='musp_spirit'){ ZMUSP.freeSpirit(this,near); return; } if(near&&near.type==='musp_lever'){ ZMUSP.pull(this,near); return; } if(near&&near.type==='musp_hearth'){ ZMUSP.hearth(this); return; }
      if(near&&near.type==='stairs_down'&&this._muspGuard){ showNotif('⚔ The guards bar the way down — beat them both first.','#ffb070'); return; }
      if(near&&near.type==='stairs_up'&&this.floor===0){ this._exitToWorld(null); return; } } return it.apply(this,arguments); };
  var upd=D._updateInteractPrompt; D._updateInteractPrompt=function(){ var r=upd.apply(this,arguments), self=this; if(!this._musp||!this.interactPrompt)return r;
    var near=this.interactables.find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; }); if(!near)return r; var t=null;
    if(near.type==='musp_spirit')t='[Tab] Break '+near.name+'\'s chains'+(near.lift!==undefined?' (the lift will lock as a bridge)':'');
    else if(near.type==='musp_lever')t='[Tab] Pull the lever (the gate opens — the wardens come)';
    else if(near.type==='musp_hearth')t=this._bossDefeated?'[Tab] The great hearth — the staff and the four Heartglasses':'The great hearth (beat Surtharn)';
    else if(near.type==='stairs_down'&&this._muspGuard)t='The guards bar the way down';
    else if(near.type==='stairs_up'&&this.floor===0)t='[Tab] Leave Muspelheim';
    if(t)this.interactPrompt.setText(t).setPosition(this.px,this.py-52).setVisible(true); return r; };
  var oc=D._openBossChest; D._openBossChest=function(){ if(this._musp)return ZMUSP.claim(this); return oc.apply(this,arguments); };
},0);
// the guards' bar says what they are
setTimeout(function(){ if(typeof BossPhases==='undefined'||!BossPhases.hudTick)return; var h0=BossPhases.hudTick; BossPhases.hudTick=function(scene){ var r=h0.apply(BossPhases,arguments); if(String(scene&&scene._bossKey||'').indexOf('musp_g')===0){ var el=document.getElementById('boss-hud'); if(el&&el.innerHTML.indexOf('Castle warden')>=0)el.innerHTML=el.innerHTML.replace('Castle warden','⚔ Guards of the way down'); } return r; }; },0);

