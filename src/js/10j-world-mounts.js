// ═══════════════════════════════════════════════════════════════════════
// ║ PARKED MOUNTS + CALL MOUNT (round 5)
// ║ • Attacking (sword, bow, spell, fighting skill) makes you jump off.
// ║   The mount waits where you left it — if that spot is water, magma,
// ║   marsh or next to a monster camp it trots to the nearest safe ground.
// ║ • Walk up to it and press M to ride again, or open the mount menu
// ║   (M / the 🐎 slot) and press "Call Mount!" — it gallops to you.
// ║ • ps.parkedMount = {id, x, y} is saved; the sprite is rebuilt on load.
// ║ • You stay mounted if the ground under you can't be walked on
// ║   (deep water on the Alligator, lava under a dragon…).
// ═══════════════════════════════════════════════════════════════════════
var MOUNT_CALL_SPD=300, MOUNT_RIDE_R=46, MOUNT_CALL_MAX_S=20, MOUNT_NEAR_R=TILE*3;
function _inOverworld(){ var sc=typeof _activePlayScene==='function'?_activePlayScene(true):null; return !!(sc&&_isOverworld(sc)); }
// which map a parked mount waits on: 'world' or an island key (round 6)
function _mapKeyOf(scene){ return scene&&scene.islKey?'isl_'+scene.islKey:'world'; }
// round 44 (Kris: "Familiars and mounts should stop at village edge instead of joining in the village. Familiars can port over once you exit if you exit at a
// different side and you mount can be called"): is a world point inside the village (pad: tiles beyond its edge)? Only on the main world map.
function _inVillagePx(x,y,pad){ if(typeof CENTER_X==='undefined')return false; return Math.hypot(x/TILE-CENTER_X-0.5,y/TILE-CENTER_Y-0.5)<VILLAGE_RADIUS+(pad||0); }
// the point just outside the village edge on the line from its centre through (x, y)
function _villageEdgePx(x,y,out){ var cx=(CENTER_X+0.5)*TILE, cy=(CENTER_Y+0.5)*TILE, a=Math.atan2(y-cy,x-cx), r=(VILLAGE_RADIUS+(out||2))*TILE; return {x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r}; }
function _mountName(id){ var m=MOUNTS[id]; return m?m.n:'mount'; }
Object.assign(WorldScene.prototype,{
  // can a parked mount wait on this tile?
  _mountSafeTile(tx,ty){ if(!this.islKey&&_inVillagePx(tx*TILE+16,ty*TILE+16,1.5))return false;      // round 44: mounts stay out of the village
    var t=(this.tiles[ty]||[])[tx]; if(t===undefined||!canPassTile(t,null)||FOOT_SLOW[t]||t===T.THIN_MAGMA)return false;
    var sec=getTileSection(tx,ty); if(sec>0&&this.playerState.unlockedSections.indexOf(sec)<0)return false;
    var x=tx*TILE+16, y=ty*TILE+16;
    if((this._camps||[]).some(function(C){ return C.state==='guarded'&&Math.hypot(C.x-x,C.y-y)<TILE*5; }))return false;
    return true; },
  _mountSafeNear(x,y,maxR){ var tx0=Math.floor(x/TILE), ty0=Math.floor(y/TILE); if(this._mountSafeTile(tx0,ty0))return {x:x,y:y};
    for(var r=1;r<=(maxR||14);r++)for(var a=0;a<r*8;a++){ var an=a/(r*8)*Math.PI*2, tx=Math.round(tx0+Math.cos(an)*r), ty=Math.round(ty0+Math.sin(an)*r); if(this._mountSafeTile(tx,ty))return {x:tx*TILE+16,y:ty*TILE+16}; }
    return null; },
  // called by every attack in the overworld
  _mountCombat(){ var ps=this.playerState, p=this.player; if(!ps||!ps.mount||!p)return;
    var t=(this.tiles[Math.floor(p.y/TILE)]||[])[Math.floor(p.x/TILE)]; if(t===undefined||!canPassTile(t,null)||t===T.THIN_MAGMA)return;   // can't stand here: stay on
    this._parkMount('fight'); },
  _parkMount(why,at){ var ps=this.playerState, p=this.player, id=ps.mount; if(!id)return; ps.mount=null;
    ps.parkedMount={id:id,x:at?at.x:p.x+(p.dir==='left'?22:-22),y:at?at.y:p.y+4,map:_mapKeyOf(this)};
    this._pmBuild(); var safe=this._mountSafeNear(ps.parkedMount.x,ps.parkedMount.y,14);
    if(safe&&(Math.abs(safe.x-ps.parkedMount.x)>4||Math.abs(safe.y-ps.parkedMount.y)>4)){ this._pm.goal={x:safe.x,y:safe.y,trot:true}; }
    if(why==='village')showNotif('🏘 Your '+_mountName(id)+' waits at the village edge — call it once you are outside.','#ccddff'); else
    showNotif(why==='fight'?'⚔️ You jump off your '+_mountName(id)+' to fight — it waits nearby. [M] next to it to ride, or Call Mount! from the mount menu.':'🚶 You get off your '+_mountName(id)+' — it waits here.','#ccddff');
    if(this.player.mountSpr)CHX.mountTick(this,this.player,null,false,0);
    this._emitUI(); },
  _pmBuild(){ var ps=this.playerState, P=ps.parkedMount; if(this._pm){ this._pm.spr.destroy(); this._pm.sh.destroy(); if(this._pm.lbl)this._pm.lbl.destroy(); this._pm=null; } if(!P)return;
    var R=CHAR_BY_ID['mt_'+P.id]; if(!R){ ps.parkedMount=null; return; }
    var key=CHX.tex(this,R), sh=this.add.ellipse(P.x,P.y+2,40,12,0x000000,0.3).setDepth(WR_DEPTH(P.y)-0.0005);
    var spr=this.add.image(P.x,P.y+4,key,'0').setOrigin(0.5,1).setScale(CHX.MOUNT_SC).setDepth(WR_DEPTH(P.y));
    this._pm={spr:spr,sh:sh,lbl:null,id:P.id,t:0,goal:null,stuck:0,kind:R.spec.kind,home:{x:P.x,y:P.y},it:2+Math.random()*3,fid:0,fly:/eagle|glider|phoenix|dragon|drake/.test(P.id)}; },
  _pmRemove(){ if(this._pm){ this._pm.spr.destroy(); this._pm.sh.destroy(); if(this._pm.lbl)this._pm.lbl.destroy(); this._pm=null; } },
  _remount(){ var ps=this.playerState, P=ps.parkedMount; if(!P)return; this._pmRemove(); ps.parkedMount=null; ps.mount=P.id; ps.activeMount=P.id; SFX.pickup&&SFX.pickup(); showNotif('🐎 Back on your '+_mountName(P.id)+'!','#ccddff'); this._emitUI(); },
  _callMount(){ var ps=this.playerState, P=ps.parkedMount, p=this.player; if(P&&!this.islKey&&_inVillagePx(p.x,p.y,0.5)){ showNotif('🏘 Mounts wait outside the village — call yours once you have left it.','#ccddff'); return false; }
    if(!P){ showNotif(ps.mount?'You are already riding.':'No mount is waiting for you.','#aaaaaa'); return false; }
    if((P.map||'world')!==_mapKeyOf(this)){ P.map=_mapKeyOf(this); P.x=p.x+TILE*30; P.y=p.y; }   // it was left on another map: it comes across (by boat)
    if(!this._pm)this._pmBuild(); var d=Math.hypot(P.x-p.x,P.y-p.y);
    // round 45 (Kris: "your mount should move all the way from where it began on the map, to where you called from, and should take more time if you
    // left your mount far away"; answered: a real gallop, capped at about 20 s): no jump over the horizon any more — it runs the whole way
    var spd=Math.max(MOUNT_CALL_SPD,d/MOUNT_CALL_MAX_S), eta=Math.max(1,Math.round(d/spd));
    this._pm.goal={x:p.x,y:p.y,call:true,spd:spd}; this._pm.stuck=0;
    showNotif('📣 You whistle — your '+_mountName(P.id)+' is coming'+(eta>3?' (about '+eta+' s away)':'')+'!','#ffe9a8'); return true; },
  _parkedTick(dt){ var ps=this.playerState, P=ps&&ps.parkedMount, p=this.player; if(!p)return;
    if(ps.mount&&!this.islKey&&_inVillagePx(p.x,p.y,0)){ var t0=(this.tiles[Math.floor(p.y/TILE)]||[])[Math.floor(p.x/TILE)]; if(t0!==undefined&&canPassTile(t0,null)){ var e0=_villageEdgePx(p.x,p.y,2), s0=this._mountSafeNear(e0.x,e0.y,6)||e0; this._parkMount('village',s0); P=ps.parkedMount; } }      // round 44: riding into the village
    if(ps.mount&&P){ ps.parkedMount=null; P=null; }   // picked another mount in the menu
    if(P&&(P.map||'world')!==_mapKeyOf(this)&&!(this._pm&&this._pm.goal&&this._pm.goal.call))P=null;   // waiting on another map
    if(!P){ if(this._pm)this._pmRemove(); return; } if(!this._pm)this._pmBuild(); var M=this._pm; if(!M)return; M.t+=dt;
    var moving=false;
    if(M.goal&&M.goal.call&&!this.islKey&&_inVillagePx(p.x,p.y,0)){ var eV=_villageEdgePx(p.x,p.y,2), sV=this._mountSafeNear(eV.x,eV.y,6)||eV; M.goal={x:sV.x,y:sV.y,trot:true}; M.home={x:sV.x,y:sV.y}; showNotif('🏘 Your '+_mountName(P.id)+' stops at the village edge.','#ccddff'); }
    if(M.goal&&!_anyModalOpen()){ if(M.goal.call){ M.goal.x=p.x; M.goal.y=p.y; }
      var dx=M.goal.x-P.x, dy=M.goal.y-P.y, d=Math.hypot(dx,dy), sp=(M.goal.stroll?34:M.goal.trot?120:(M.goal.spd||MOUNT_CALL_SPD))*dt;
      var cvw=this.cameras&&this.cameras.main&&this.cameras.main.worldView, offS=M.goal.call&&cvw&&(P.x<cvw.x-TILE*3||P.x>cvw.right+TILE*3||P.y<cvw.y-TILE*3||P.y>cvw.bottom+TILE*3);
      if(M.goal.call&&d<Math.max(30,sp+1)){ M.goal=null; this._remount(); return; }   // (a long frame could overshoot the 30px window)
      if(d<=sp+1){ P.x=M.goal.x; P.y=M.goal.y; M.goal=null; }
      else { var nx=P.x+dx/d*sp, ny=P.y+dy/d*sp, ok=offS||this._canGo(nx,ny,P.id);
        if(!ok){ if(this._canGo(nx,P.y,P.id)){ ny=P.y; ok=true; } else if(this._canGo(P.x,ny,P.id)){ nx=P.x; ok=true; } }
        if(ok){ P.x=nx; P.y=ny; M.stuck=0; } else M.stuck+=dt;
        if(M.stuck>1.2){ var s=M.goal.call?this._mountSafeNear(p.x+30,p.y,6):this._mountSafeNear(M.goal.x,M.goal.y,6); if(s){ P.x=s.x; P.y=s.y; } M.stuck=0; if(!M.goal.call)M.goal=null; }
        moving=true; M.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down'); } }
    // round 31: a waiting mount is alive. With the poses it has (the walk cycle from the side, front and back) it turns to look
    // another way, shuffles its feet, wanders a few steps round the spot where it was left, and breathes; flyers keep beating their wings.
    // If an 'idle' sheet is ever painted for mounts (grazing, head toss), it is used instead of the standing walk pose.
    if(!moving&&!M.goal&&!_anyModalOpen()){ if(M.fid>0)M.fid-=dt; M.it-=dt; var nearH=Math.hypot(p.x-P.x,p.y-P.y)<MOUNT_RIDE_R*1.6;
      if(nearH&&M.it<=0){ M.dir=Math.abs(p.x-P.x)>Math.abs(p.y-P.y)*0.8?(p.x<P.x?'left':'right'):(p.y<P.y?'up':'down'); M.fid=0.5; M.it=2.5+Math.random()*3; }      // the hero is close: look at him, stay put
      else if(M.it<=0){ var roll=Math.random(); M.it=2.5+Math.random()*4.5;
        if(roll<0.35){ var D=['left','right','down','left','right','down','up']; M.dir=D[Math.floor(Math.random()*D.length)]; }
        else if(roll<0.58)M.fid=0.5+Math.random()*0.6;
        else { var a0=Math.random()*Math.PI*2, gx=M.home.x+Math.cos(a0)*(18+Math.random()*30), gy=M.home.y+Math.sin(a0)*(12+Math.random()*22); if(this._mountSafeTile(Math.floor(gx/TILE),Math.floor(gy/TILE))&&this._canGo(gx,gy,P.id))M.goal={x:gx,y:gy,stroll:true}; else M.fid=0.6; } } }
    var idleP=(!moving&&typeof ZAtlas!=='undefined'&&ZAtlas.count('mt_'+M.id,'idle','x'))?'idle':null, live=moving||M.fid>0||M.fly||!!idleP, rate=moving?(M.goal&&M.goal.stroll?6:10):idleP?2.2:M.fly?4:5;
    var f; if(!moving)f=(M.dir==='up'?6:M.dir==='down'?4:0)+((M.fid>0||M.fly)?Math.floor(M.t*rate)%2:0); else if(M.dir==='left'||M.dir==='right')f=Math.floor(M.t*10)%4; else f=(M.dir==='up'?6:4)+Math.floor(M.t*6)%2;
    var side=M.dir==='left'||M.dir==='right', zok=typeof ZAtlas!=='undefined'&&ZAtlas.simple(M.spr,'mt_'+M.id,[idleP,M.dir==='up'?'ride_back':M.dir==='down'?'ride_front':'ride_side'],'x',live?M.t:0,moving?(side?rate:6):rate,false);
    if(!zok)M.spr.setFrame(String(f)); else if(!moving){ var br=1+0.018*Math.sin(M.t*2.1); M.spr.scaleY=Math.abs(M.spr.scaleX)*br; }      // breathing
    M.spr.setFlipX(M.dir==='left').setPosition(P.x,P.y+4+(M.fly&&!moving?Math.sin(M.t*2.4)*2.5:0)).setDepth(WR_DEPTH(P.y)); M.sh.setPosition(P.x,P.y+2).setDepth(WR_DEPTH(P.y)-0.0005);
    // ride prompt
    var near=!moving&&Math.hypot(p.x-P.x,p.y-P.y)<MOUNT_RIDE_R;
    if(near&&!M.lbl){ M.lbl=domText(this,P.x,P.y-60,'[M] Ride your '+_mountName(P.id),{fontSize:'10px',color:'#ffe9a8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5,1).setDepth(20); }
    else if(!near&&M.lbl){ M.lbl.destroy(); M.lbl=null; }
    if(M.lbl)M.lbl.setPosition(P.x,P.y-60); },
  // round 45 (Kris: ""m" should auto mount onto your mount … Take out the selector for different mounts when pressing "m". If your mount is not next to
  // you or close, then "m" should call your mount"): M = get off · get on (it is close) · call it (it is far). Mounts are chosen at the stables.
  _mountKey(){ var ps=this.playerState, p=this.player; if(!ps||!p)return;
    if(ps.mount){ var t=(this.tiles[Math.floor(p.y/TILE)]||[])[Math.floor(p.x/TILE)]; if(t===undefined||!canPassTile(t,null)||t===T.THIN_MAGMA){ showNotif('You can\'t get off here.','#aaaaaa'); return; } this._parkMount('manual'); return; }
    var P=ps.parkedMount; if(P&&(P.map||'world')===_mapKeyOf(this)&&Math.hypot(p.x-P.x,p.y-P.y)<MOUNT_NEAR_R){ if(this._pm&&this._pm.goal&&this._pm.goal.call)return; this._remount(); return; }
    if(!ps.ownedMounts||!ps.ownedMounts.length){ showNotif('🐎 You have no mount yet — the stables in the village sell a horse.','#ccddff'); return; }
    if(!P){ var id=ps.activeMount&&ps.ownedMounts.indexOf(ps.activeMount)>=0?ps.activeMount:ps.ownedMounts[0], at=_stablesEdgePx(this); ps.parkedMount={id:id,x:at.x,y:at.y,map:'world'}; this._pmBuild(); }
    this._callMount(); },
  _nearParkedMount(){ var P=this.playerState&&this.playerState.parkedMount, p=this.player; return !!(P&&p&&(P.map||'world')===_mapKeyOf(this)&&Math.hypot(p.x-P.x,p.y-P.y)<MOUNT_RIDE_R); }
});
// where a mount waits that has never been ridden away (bought, chosen, or after a long absence): outside the village, by the stables
function _stablesEdgePx(sc){ var b=(sc&&sc.wd&&sc.wd.props||[]).find(function(q){ return q.prop==='vbuild'&&q.o&&q.o.core==='stables'; }), x=b?(b.x+b.w/2)*TILE:(CENTER_X+17)*TILE, y=b?(b.y+b.h)*TILE:(CENTER_Y)*TILE;
  var e=_villageEdgePx(x,y,2); return (sc&&sc._mountSafeNear&&sc._mountSafeNear(e.x,e.y,8))||e; }
window._mountKey=function(){ var ws=_owScene(); if(!ws||!_inOverworld()){ showNotif('Your mount waits in the overworld.','#aaaaaa'); return; } ws._mountKey(); };
window._callMount=function(){ var ws=_owScene(); if(!ws)return;
  if(!_inOverworld()){ showNotif('Your mount waits in the overworld.','#aaaaaa'); return; }
  if(ws._callMount()){ closeModal('mounts'); } };
