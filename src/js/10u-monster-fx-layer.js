// ═══════════════════════════════════════════════════════════════════════
// ║ 10u-monster-fx-layer.js — round 50 (Kris: "the monster area and line attacks look good, but they are a bit too distracting in the game,
// ║ especially when they cover up the hero and familiars. Make them partially transparent, and behind the hero and familiars").
// ║ Everything a monster's area or line attack draws — warnings (circles, wedges, paths), lingering patches, rings and slams, the
// ║ expanding ring, breath, beams, gusts, lashes, drains, the motes they throw up — is registered as it is made, then each frame:
// ║  · its opacity is ZMFX.A (60 %) of what the attack itself asks for (fades and pulses still run on top);
// ║  · it is never drawn above the hero or any familiar: its depth is held just under the lowest of theirs.
// ║ Thrown things (shots, the lobbed stone), traps, monsters, hits on the hero and floating numbers are left as they were.
// ═══════════════════════════════════════════════════════════════════════
var ZMFX={ on:true, A:0.6, ctx:null,
  // the hero and familiars: the depth the attack pictures must stay under
  cap:function(scene){ var d=Infinity, h=scene.pCont||(scene.player&&scene.player.cont); if(h&&h.scene&&h.visible!==false)d=h.depth; var F=scene._famVisuals||{};
    for(var k in F){ var v=F[k]; if(v&&v.active&&v.visible&&v.depth<d)d=v.depth; } return d===Infinity?null:d-0.0005; },
  add:function(o){ if(!ZMFX.on||!o||!o.scene||o._zm)return o; var s=o.scene; o._zm=1; o._zd0=o.depth; var L=s._zmfxL; if(!L){ L=s._zmfxL=[]; var tick=function(){ ZMFX.tick(s); }; s.events.on('postupdate',tick); s.events.once('shutdown',function(){ s.events.off('postupdate',tick); s._zmfxL=null; }); }
    L.push(o); return o; },      // first set in this frame's postupdate, before anything is drawn (and after a group has taken in its parts)
  one:function(o,cap){ if(o.parentContainer)return;      // inside a registered soft-line group: the group does it
    // opacity: whatever the attack last set, times A (an alpha we set ourselves is not taken for a new one)
    if(o._zas===undefined||Math.abs(o.alpha-o._zas)>1e-4)o._zab=o.alpha; var a=o._zab*ZMFX.A; o._zas=a; o.alpha=a;
    // depth: the attack's own depth (it may move it), never above the hero and familiars
    if(o._zdl===undefined||Math.abs(o.depth-o._zdl)>1e-6)o._zd0=o.depth; var d=cap!==null&&o._zd0>cap?cap:o._zd0; o._zdl=d; if(o.depth!==d)o.setDepth(d); },
  tick:function(s){ var L=s._zmfxL; if(!L||!L.length)return; var cap=ZMFX.cap(s); for(var i=L.length-1;i>=0;i--){ var o=L[i]; if(!o.scene||!o.active){ L.splice(i,1); continue; } ZMFX.one(o,cap); } },
  // run f as a monster's attack drawing (what it makes is registered), or with registering paused (hits, shots, spawns)
  as:function(on,f,self,args){ var c0=ZMFX.ctx; ZMFX.ctx=on; try{ return f.apply(self,args); } finally { ZMFX.ctx=c0; } } };

(function(){ if(typeof MX==='undefined'||typeof Phaser==='undefined')return;
  // what an attack draws: shapes, line groups and pictures made while one of its functions runs
  var GF=Phaser.GameObjects.GameObjectFactory.prototype;
  ['circle','graphics','ellipse','arc','triangle','star','polygon'].forEach(function(n){ var f0=GF[n]; if(!f0)return; GF[n]=function(){ var o=f0.apply(this,arguments); if(ZMFX.ctx&&o)ZMFX.add(o); return o; }; });
  if(typeof ZSOFT!=='undefined'){ var l0=ZSOFT.lines; ZSOFT.lines=function(){ var o=l0.apply(ZSOFT,arguments); if(ZMFX.ctx&&o)ZMFX.add(o); return o; };
    var i0=ZSOFT.img; ZSOFT.img=function(){ var o=i0.apply(ZSOFT,arguments); if(ZMFX.ctx&&o)ZMFX.add(o); return o; }; }
  if(typeof ZFX!=='undefined'){ var p0=ZFX.put; ZFX.put=function(){ var o=p0.apply(ZFX,arguments); if(ZMFX.ctx&&o)ZMFX.add(o); return o; }; }
  var on=function(obj,name){ if(!obj||typeof obj[name]!=='function')return; var f0=obj[name]; obj[name]=function(){ return ZMFX.as(1,f0,this,arguments); }; };
  var off=function(obj,name){ if(!obj||typeof obj[name]!=='function')return; var f0=obj[name]; obj[name]=function(){ return ZMFX.as(null,f0,this,arguments); }; };
  // the attack drawings
  if(MX.tele){ on(MX.tele,'line'); on(MX.tele,'circle'); on(MX.tele,'cone'); }
  on(MX,'fxRing'); on(MX,'fxDot'); on(MX,'zone');
  var AT=MX.ATK||{}; Object.keys(AT).forEach(function(k){ if(k==='trap')return; ['start','fire','act'].forEach(function(p){ on(AT[k],p); }); });
  // …but not what an attack makes that is not its drawing
  off(MX,'proj'); off(MX,'spawn'); off(MX,'hitP'); off(MX,'status'); off(MX,'push'); off(MX,'famStagger'); off(MX,'wall');
  if(typeof ZSHOTX!=='undefined')off(ZSHOTX,'solid');      // the lobbed stone stays solid
  // the expanding ring's painted ring (made by 10t inside the ring's own fire)
  if(AT.ring&&AT.ring.fire){ var rf=AT.ring.fire; AT.ring.fire=function(A,mon,m,P,p,b){ var r=rf.apply(this,arguments); try{ if(b&&b._zim)ZMFX.add(b._zim); }catch(e){} return r; }; }
})();
