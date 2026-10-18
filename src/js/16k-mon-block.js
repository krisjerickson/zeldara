// ═══════════════════════════════════════════════════════════════════════
// ║ 16k-mon-block.js — round 64d: MONSTERS AND BOSSES STOP YOU.
// ║ Kris: "monsters don't seem to have a box that blocks your movement, and you can just run through them. they should have a movement
// ║ stopping box. it doesn't need to be the entire size of the monster, though. This should also be the same for bosses".
// ║ Each living monster has a small oval at its feet (about ¾ of its radius across, a little under half of it deep); a boss's oval is
// ║ about half the width of its body box, at its feet. Walking (the World, the islands, the adventure sites, the forges) stops at it.
// ║  · Only walking: a roll, a dash or a knock-back still carries you past or through (they are dodges).
// ║  · A monster that walks onto you never traps you: any step that takes you further out of its oval is allowed.
// ║  · Unseen monsters (not yet woken, faded, dead) do not block. Switch: ZMB.on (Dev: ZMB.on=false).
// ═══════════════════════════════════════════════════════════════════════
var ZMB={ on:true, K:0.75, KY:0.42, BOSS:0.55,
  // the oval: centre, half-width, half-depth (world px)
  box:function(m){ var r=(m.def&&m.def.r)||14, B=typeof _hbBox==='function'?_hbBox(m):null;
    if(B){ var R=m._hurtR, sy=Math.abs((R.cont&&R.cont.scaleY)||1), foot=m.y+(R.fy||0)*sy, rx=Math.max(14,B.rx*ZMB.BOSS), ry=Math.max(9,Math.min(rx*0.5,B.ry*0.4)); return {x:m.x,y:foot-ry*0.6,rx:rx,ry:ry}; }
    var s=Math.abs((m.cont&&m.cont.scaleY)||1); r=r*Math.min(1.6,Math.max(0.7,s)); return {x:m.x,y:m.y+r*0.55,rx:Math.max(8,r*ZMB.K),ry:Math.max(6,r*ZMB.KY)}; },
  solid:function(m){ if(!m||m.dead||m.hp<=0||m._gone||m._noBlock||m._lazyVis)return false; var c=m.cont; if(c&&(c.visible===false||c.alpha<0.2||!c.scene))return false; return true; },
  list:function(sc){ return (sc.monsters&&sc.sys&&sc.sys.settings.key==='Dungeon')?sc.monsters:(sc.worldMonsters||sc.monsters||[]); },
  // how far inside the nearest oval (x, y) is: < 1 inside
  depth:function(sc,x,y){ var L=ZMB.list(sc), best=9; for(var i=0;i<L.length;i++){ var m=L[i]; if(!m||Math.abs(m.x-x)>200||Math.abs(m.y-y)>200||!ZMB.solid(m))continue; var b=ZMB.box(m); var dx=(x-b.x)/b.rx, dy=(y-b.y)/b.ry, d=Math.hypot(dx,dy); if(d<best)best=d; } return best; },
  blocked:function(sc,nx,ny,fx,fy){ if(!ZMB.on)return false; var dn=ZMB.depth(sc,nx,ny); if(dn>=1)return false; return dn<ZMB.depth(sc,fx,fy)-1e-6; }
};
setTimeout(function(){
  var wrap=function(P,mv,cg,pos){ if(!P||!P[mv]||!P[cg])return; var m0=P[mv], c0=P[cg];
    P[mv]=function(){ this._zmbWalk=true; try{ return m0.apply(this,arguments); } finally{ this._zmbWalk=false; } };
    P[cg]=function(nx,ny){ if(this._zmbWalk&&ZMB.on){ var p=pos(this); if(p&&ZMB.blocked(this,nx,ny,p.x,p.y))return false; } return c0.apply(this,arguments); }; };
  if(typeof WorldScene!=='undefined')wrap(WorldScene.prototype,'_movePlayer','_canGo',function(s){ return s.player?{x:s.player.x,y:s.player.y}:null; });
  if(typeof DungeonScene!=='undefined')wrap(DungeonScene.prototype,'_movePlayer','_canGoD',function(s){ return {x:s.px,y:s.py}; });
},0);
