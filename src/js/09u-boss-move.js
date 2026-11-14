// ═══════════════════════════════════════════════════════════════════════
// ║ 09u-boss-move.js — round 106 (Kris: "the bosses still don't seem to come at you much, and you need to move to them. Make sure we change
// ║ how bosses move around the arena, and perhaps they do teleportation moves of sorts more often to travel around, even if they don't walk
// ║ very fast").
// ║  · A boss that has seen you walks toward you whenever it is not busy with an attack (60 % of its speed on top of its own way of
// ║    moving; rooted bosses stay rooted).
// ║  · When you stay away — more than about 4 tiles from its edge for 1.6 s — it vanishes and reappears 3–4 tiles from you, on standable
// ║    ground it can see you from, with a ring at both ends and a short warning shimmer first (0.45 s, so you can react). Every 4–6 s at
// ║    most; never in the middle of one of its attacks or while staggered.
// ║  · It also blinks about every 9 s at random around the arena (to a different side of you), so it never stands still.
// ║ BMOVE.on: the switch (the tests turn it off when they need a boss to stand still).
// ═══════════════════════════════════════════════════════════════════════
var BMOVE={ on:true, FAR:120, WAIT:1.6, CD:[4,6], WANDER:[7.5,10.5], NEAR:[96,132], WARN:0.45,
  busy:function(mon,m){ return !!((m.busy&&!m.busy.moveOk)||(mon._bp&&(mon._bp.busy||mon._bp.stagT>0))||m.stunT>0||m.down>0||mon._hold>0||m.hidden); },
  spot:function(A,mon,P,side){ var best=null; for(var i=0;i<14;i++){ var a=(side!==undefined?side+(Math.random()-0.5)*1.2:Math.random()*Math.PI*2), r=BMOVE.NEAR[0]+Math.random()*(BMOVE.NEAR[1]-BMOVE.NEAR[0]), x=P.x+Math.cos(a)*r, y=P.y+Math.sin(a)*r;
      if(!A.canGoM(x,y,mon))continue; if(A.scene._canGoD&&!A.scene._canGoD(x,y))continue;      /* ground you can stand on too (not lava) */ if(A.isLava&&A.isLava(x,y))continue; if(typeof MX!=='undefined'&&MX.sees&&!MX.sees(A,{x:x,y:y},P.x,P.y))continue; best={x:x,y:y}; break; } return best; },
  go:function(A,mon,m,P,side){ var to=BMOVE.spot(A,mon,P,side); if(!to)return false; m._bmv={t:BMOVE.WARN,to:to}; m.invuln=Math.max(m.invuln||0,BMOVE.WARN+0.2);
    try{ MX.fxRing(A,mon.x,mon.y,26,'#e8d0ff'); var g=A.scene.add.circle(to.x,to.y,6,0xe8d0ff,0.35).setDepth(A.depth(to.y)-0.1); A.scene.tweens.add({targets:g,radius:28,alpha:0.08,duration:BMOVE.WARN*1000,onComplete:function(){ g.destroy(); }}); }catch(e){}
    try{ if(mon.cont)A.scene.tweens.add({targets:mon.cont,alpha:0.15,duration:BMOVE.WARN*900}); }catch(e){} return true; },
  tick:function(scene,mon,dt){ if(!BMOVE.on||!mon||!mon.isBoss||mon.dead||!mon._m||!mon.kit)return; var A=MX.A(scene), m=mon._m, P=A.p(), d=Math.hypot(P.x-mon.x,P.y-mon.y), r=(mon.def&&mon.def.r)||18;
    if(m._bmv){ m._bmv.t-=dt; if(m._bmv.t<=0){ var to=m._bmv.to; m._bmv=null; mon.x=to.x; mon.y=to.y; try{ if(mon.cont){ mon.cont.setPosition(to.x,to.y); A.scene.tweens.killTweensOf(mon.cont); mon.cont.setAlpha(1); } MX.fxRing(A,to.x,to.y,30,'#e8d0ff'); MX.ev(mon,'mv_bossblink'); }catch(e){} m._bmCd=BMOVE.CD[0]+Math.random()*(BMOVE.CD[1]-BMOVE.CD[0]); m._bmFar=0; } return; }
    if(!m.aggro)return; m._bmCd=(m._bmCd===undefined?2:m._bmCd)-dt; m._bmWan=(m._bmWan===undefined?BMOVE.WANDER[0]:m._bmWan)-dt;
    if(BMOVE.busy(mon,m)){ m._bmFar=0; return; }
    var gap=d-r; m._bmFar=gap>BMOVE.FAR?(m._bmFar||0)+dt:0;
    if(m._bmCd<=0&&m._bmFar>=BMOVE.WAIT){ if(BMOVE.go(A,mon,m,P))return; m._bmCd=1; }
    if(m._bmCd<=0&&m._bmWan<=0){ m._bmWan=BMOVE.WANDER[0]+Math.random()*(BMOVE.WANDER[1]-BMOVE.WANDER[0]); var side=Math.atan2(mon.y-P.y,mon.x-P.x)+Math.PI; if(BMOVE.go(A,mon,m,P,side))return; }
    // walk toward you (rooted kinds stay rooted)
    if(gap>40&&!(MX.STAY&&MX.STAY[mon.kit.move.name])){ var spd=(mon.kit.move.p.spd||mon.def.spd||60)*0.6; MX.step(A,mon,Math.atan2(P.y-mon.y,P.x-mon.x),spd,dt,!!(mon.kit.move.p.fly||(MX.FLY&&MX.FLY[mon.kit.move.name]))); } } };
// the older bosses (the realm guardians drawn by 12-scene-dungeon, not the monster engine): the same blinks, and they chase from anywhere
BMOVE.tickL=function(sc,mon,dt){ if(!BMOVE.on||!mon||mon.dead||!mon.isBoss||mon.mx)return; var A=MX.A(sc), P=A.p(), d=Math.hypot(P.x-mon.x,P.y-mon.y), r=(mon.def&&mon.def.r)||18, m=mon._bmm||(mon._bmm={aggro:false,invuln:0});
  if(d<420||mon.hp<mon.maxHp)m.aggro=true; if(!m.aggro)return;
  if(m._bmv){ m._bmv.t-=dt; if(m._bmv.t<=0){ var to=m._bmv.to; m._bmv=null; mon.x=to.x; mon.y=to.y; try{ if(mon.cont){ A.scene.tweens.killTweensOf(mon.cont); mon.cont.setPosition(to.x,to.y).setAlpha(1); } MX.fxRing(A,to.x,to.y,30,'#e8d0ff'); MX.ev(mon,'mv_bossblink'); }catch(e){} m._bmCd=BMOVE.CD[0]+Math.random()*(BMOVE.CD[1]-BMOVE.CD[0]); m._bmFar=0; } return; }
  m._bmCd=(m._bmCd===undefined?2:m._bmCd)-dt; m._bmWan=(m._bmWan===undefined?BMOVE.WANDER[0]:m._bmWan)-dt;
  if((mon._bp&&(mon._bp.busy||mon._bp.stagT>0))||mon._hold>0||mon._stun>0){ m._bmFar=0; return; }
  var gap=d-r; m._bmFar=gap>BMOVE.FAR?(m._bmFar||0)+dt:0;
  if(m._bmCd<=0&&m._bmFar>=BMOVE.WAIT){ if(BMOVE.go(A,mon,m,P))return; m._bmCd=1; }
  if(m._bmCd<=0&&m._bmWan<=0){ m._bmWan=BMOVE.WANDER[0]+Math.random()*(BMOVE.WANDER[1]-BMOVE.WANDER[0]); if(BMOVE.go(A,mon,m,P,Math.atan2(mon.y-P.y,mon.x-P.x)+Math.PI))return; }
  if(gap>50)mon._charge=Math.max(mon._charge||0,Date.now()+250);      /* round 83's "comes straight for you" walk, now whenever you are away from it */ };
(function(){ if(typeof MX==='undefined'||!MX.tick)return; var t0=MX.tick; MX.tick=function(scene,mon,dt){ var r=t0.apply(this,arguments); try{ if(mon&&mon.isBoss&&!mon.dead)BMOVE.tick(scene,mon,dt); }catch(e){ if(!BMOVE._w){ BMOVE._w=1; console.warn('bmove',e); } } return r; }; })();
