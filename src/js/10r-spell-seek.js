// ═══════════════════════════════════════════════════════════════════════
// ║ 10r-spell-seek.js — round 47: spells seek.
// ║ Kris: "spells should be heat seeking and move towards the strongest enemy in the direction you are pointing". His card: a wide cone — any
// ║ enemy within about 60° either side of where you face, up to the spell's reach; the strongest (most health) is the target, and the spell curves
// ║ after it. If the target dies on the way, the spell looks again the same way, from where it is.
// ═══════════════════════════════════════════════════════════════════════
var ZSEEK={ HALF:Math.PI/3, TURN:4.2,
  pick:function(scene,x,y,ang,range,mons){ var best=null, bh=-1; (mons||[]).forEach(function(m){ if(!m||m.dead||m.hp<=0)return; var mx=m.x, my=m.y-((m.def&&m.def.r)||10)*0.4, d=Math.hypot(mx-x,my-y); if(d>range||d<2)return;
      var da=Math.atan2(my-y,mx-x)-ang; while(da>Math.PI)da-=Math.PI*2; while(da<-Math.PI)da+=Math.PI*2; if(Math.abs(da)>ZSEEK.HALF)return;
      if(typeof _heroLOS==='function'&&!_heroLOS(scene,x,y,mx,my))return; var h=m.hp||0; if(h>bh){ bh=h; best=m; } }); return best; },
  steer:function(scene,p,dt,mons){ var T=p.seek; if(T&&(T.dead||T.hp<=0)){ T=p.seek=ZSEEK.pick(scene,p.x,p.y,Math.atan2(p.vy,p.vx),320,mons); } if(!T)return;
    var spd=Math.hypot(p.vx,p.vy)||300, ta=Math.atan2(T.y-((T.def&&T.def.r)||10)*0.4-p.y,T.x-p.x), ca=Math.atan2(p.vy,p.vx), df=ta-ca; while(df>Math.PI)df-=Math.PI*2; while(df<-Math.PI)df+=Math.PI*2;
    ca+=Math.max(-ZSEEK.TURN*dt,Math.min(ZSEEK.TURN*dt,df)); p.vx=Math.cos(ca)*spd; p.vy=Math.sin(ca)*spd; if(p.vis&&p.vis.setRotation)try{ p.vis.setRotation(ca); }catch(e){} } };
// ── round 64 (Kris: "for spells, this is actually OK that they don't auto focus on enemies, as they are very powerful and you should need to
// learn how to use them … you shouldn't be able to use it to cast across walls that you can't see through. let's make sure you have line of
// sight to where you cast, and the range can become shorter if you don't have line of sight"): a spell that lands on a spot (Starfall's stars,
// Meteor, Blizzard) lands where you can see — if a wall is in the way, the spot is pulled back toward you to the last place in sight.
ZSEEK.sight=function(scene,x,y,tx,ty){ if(typeof _heroLOS!=='function'||_heroLOS(scene,x,y,tx,ty))return {x:tx,y:ty,cut:false}; var d=Math.hypot(tx-x,ty-y), ux=(tx-x)/(d||1), uy=(ty-y)/(d||1), ok=0;
  for(var r=12;r<=d;r+=6){ if(_heroLOS(scene,x,y,x+ux*r,y+uy*r))ok=r; else break; } ok=Math.max(0,ok-10); return {x:x+ux*ok,y:y+uy*ok,cut:true}; };
