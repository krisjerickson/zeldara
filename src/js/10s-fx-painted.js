// ═══════════════════════════════════════════════════════════════════════
// ║ 10s-fx-painted.js — round 48: the painted area effects (wave 50: sc_fx_ground, sc_fx_blast, sc_fx_skill).
// ║ Kris (round 47): "all of the monster attacks and your own attacks that show an area effect with coloration need to be remade with painted
// ║ images". Every coloured circle that stood for an area — warnings, lingering patches, bursts, the hero's skills and spells — now wears its
// ║ painting. ZFX.dress(shape, id) keeps the old shape (its tweens of size and fade still run) and lays the picture over it, following its
// ║ position, size, fade and depth, gone with it; the shape itself turns invisible. Pictures not yet painted leave the shape as it was.
// ═══════════════════════════════════════════════════════════════════════
var ZFX={ on:true,
  has:function(id){ var Z=typeof _scn==='function'?_scn():null; return !!(ZFX.on&&Z&&Z.has&&Z.has(id)); },
  // a scene texture for a painting (drawn once, 256 px on its long side)
  key:function(scene,id){ var k='zfx_'+id; if(scene.textures.exists(k))return k; var Z=_scn(); if(!Z||!Z.has(id))return null; var it=Z.size(id,0); if(!it)return null; var s=256/Math.max(it.w,it.h), w=Math.ceil(it.w*s), h=Math.ceil(it.h*s), cv=mkCanvas(w+4,h+4);
    var g=cv.getContext('2d'); Z.draw(g,id,2+it.ax*s,2+it.ay*s,h); scene.textures.addCanvas(k,cv); return k; },
  _list:function(scene){ var L=scene._zfxL; if(L)return L; L=scene._zfxL=[]; var tick=function(){ ZFX.sync(scene); }; scene.events.on('postupdate',tick); scene.events.once('shutdown',function(){ scene.events.off('postupdate',tick); scene._zfxL=null; }); return L; },
  // lay a painting over a circle (Arc) or an ellipse; o.k = how big the picture is against the circle's diameter, o.a = its full alpha, o.rot = spin (rad/s)
  dress:function(c,id,o){ try{ if(!c||!c.scene||!ZFX.has(id))return null; var scene=c.scene, k=ZFX.key(scene,id); if(!k)return null; o=o||{};
      var im=scene.add.image(c.x,c.y,k).setDepth(c.depth); if(o.blend==='add')im.setBlendMode(Phaser.BlendModes.ADD); var D={c:c,im:im,a0:Math.max(0.05,c.alpha||1),k:o.k||1,a:o.a===undefined?0.95:o.a,rot:o.rot||0,ang:o.ang||0,soft:o.soft||0};
      c.setFillStyle&&c.setFillStyle(0x000000,0); if(c.setStrokeStyle&&c.isStroked)c.setStrokeStyle(0,0,0); ZFX._list(scene).push(D); c.once('destroy',function(){ im.destroy(); D.dead=true; }); ZFX._one(D,0); return im; }catch(e){ return null; } },
  _one:function(D,dt){ var c=D.c, im=D.im, r=(c.radius!==undefined?c.radius:(c.width||8)/2), d=2*r*Math.abs(c.scaleX||1)*D.k; if(d<1)d=1;
    im.setPosition(c.x,c.y).setDisplaySize(d,d*(im.height/im.width)).setAlpha(Math.min(1,(c.alpha/D.a0)*(D.soft?2.5:1))*D.a).setVisible(c.visible).setDepth(c.depth); if(D.rot){ D.ang+=D.rot*dt; im.setRotation(D.ang); } },
  sync:function(scene){ var L=scene._zfxL; if(!L||!L.length)return; var dt=(scene.game&&scene.game.loop?scene.game.loop.delta:16)/1000; for(var i=L.length-1;i>=0;i--){ var D=L[i]; if(D.dead||!D.c.scene||!D.im.scene){ L.splice(i,1); continue; } ZFX._one(D,dt); } },
  // a picture by itself (for graphics-drawn shapes: cones, lines, beams); destroyed with `owner`
  put:function(scene,id,x,y,w,h,o){ if(!ZFX.has(id))return null; var k=ZFX.key(scene,id); if(!k)return null; o=o||{}; var im=scene.add.image(x,y,k).setOrigin(o.ox===undefined?0.5:o.ox,o.oy===undefined?0.5:o.oy).setDisplaySize(w,h).setDepth(o.depth||5).setAlpha(o.a===undefined?0.9:o.a).setRotation(o.rot||0);
    if(o.owner&&o.owner.once)o.owner.once('destroy',function(){ if(im.scene)im.destroy(); }); if(o.life){ scene.tweens.add({targets:im,alpha:0,delay:o.life*600,duration:o.life*400,onComplete:function(){ if(im.scene)im.destroy(); }}); } return im; },
  // which painting for a ground patch / a nova / a ring, by kind
  ZONE:{slow:'fx_zone_frost',freeze:'fx_zone_frost',poison:'fx_zone_poison',burn:'fx_zone_burn',blind:'fx_zone_shadow',sneeze:'fx_zone_pollen',root:'fx_zone_vines',dmg:'fx_zone_blood',lava:'fx_zone_lava'},
  NOVA:{fire:'fx_burst_fire',stun:'fx_burst_storm',storm:'fx_burst_storm',slow:'fx_nova_ice',ice:'fx_nova_ice',shadow:'fx_burst_shadow',heal:'fx_ring_heal'},
  ringFor:function(col){ var n=typeof col==='number'?col:parseInt(String(col||'#ffffff').replace('#',''),16), r=(n>>16)&255, g=(n>>8)&255, b=n&255;
    if(b>r+40&&b>=g-10)return 'fx_ring_ice'; if(g>r+30&&g>b)return 'fx_ring_heal'; if(r>150&&b<120)return 'fx_shockwave'; if(b>r&&r>g)return 'fx_burst_shadow'; return 'fx_shockwave'; } };
// ── the monsters' side (09-monster-engine): warnings, rings, ground patches, breath, beams, gusts ──
(function(){ if(typeof MX==='undefined'||!MX.tele)return; var T=MX.tele;
  var l0=T.line; T.line=function(A,x,y,a,len,col,t){ var g=l0.apply(T,arguments); try{ var im=ZFX.put(A.scene,'fx_tele_line',x,y,len,Math.max(18,len*0.09),{ox:0,oy:0.5,rot:a,depth:g.depth,owner:g,a:0.85}); if(im)g.setAlpha(0.35); }catch(e){} return g; };
  var c0=T.circle; T.circle=function(A,x,y,r,col,t){ var g=c0.apply(T,arguments); try{ var im=ZFX.put(A.scene,'fx_tele_circle',x,y,2*r,2*r,{depth:g.depth,owner:g,a:0.8}); if(im)g.setVisible(false); }catch(e){} return g; };
  // a wedge: the painted warning circle, cut to the wedge's shape
  var k0=T.cone; T.cone=function(A,x,y,a,len,half,col,t){ var g=k0.apply(T,arguments); try{ var im=ZFX.put(A.scene,'fx_tele_circle',x,y,2*len,2*len,{depth:g.depth,owner:g,a:0.85,rot:a}); if(im&&g.createGeometryMask){ im.setMask(g.createGeometryMask()); g.setAlpha(0.01); } }catch(e){} return g; };
  MX.fxRing=function(A,x,y,r,col){ var c=A.scene.add.circle(x,y,4,MX.col(col),0).setStrokeStyle(3,MX.col(col),0.8).setDepth(A.depth(y)+0.3); ZFX.dress(c,r>=70?'fx_crack_ring':ZFX.ringFor(col)); A.scene.tweens.add({targets:c,radius:r,alpha:0,duration:420,onComplete:function(){ c.destroy(); }}); };
  var z0=MX.zone; MX.zone=function(A,o){ var r=z0.apply(MX,arguments); try{ if(o&&o.vis){ var id=ZFX.ZONE[o.st]||(o.col&&ZFX.ringFor(o.col)==='fx_ring_ice'?'fx_zone_frost':'fx_zone_blood'); ZFX.dress(o.vis,id,{a:0.92,soft:1}); } }catch(e){} return r; };
  // breath, beam and gust: the painted fan / beam / gust laid along the attack as it fires
  var AT=MX.ATK, wrapFire=function(name,f){ if(!AT[name]||!AT[name].fire)return; var f0=AT[name].fire; AT[name].fire=function(A,mon,m,P,p,b){ var r=f0.apply(this,arguments); try{ f(A,mon,m,P,p,b); }catch(e){} return r; }; };
  wrapFire('breath',function(A,mon,m,P,p,b){ var col=String(p.col||'#ff7030'), ice=ZFX.ringFor(col)==='fx_ring_ice', L=p.r||110; ZFX.put(A.scene,ice?'fx_breath_frost':'fx_breath_fire',mon.x,mon.y,L*1.1,L*(p.cone||0.55)*1.6,{ox:0,oy:0.5,rot:b.a0,depth:A.depth(mon.y)+0.3,a:0.95,life:0.5}); });
  wrapFire('beam',function(A,mon,m,P,p,b){ var L=p.len||340; ZFX.put(A.scene,'fx_beam',mon.x,mon.y-6,L,30,{ox:0,oy:0.5,rot:b.a0,depth:A.depth(mon.y)+0.4,a:0.95,life:0.45}); });
  wrapFire('gust',function(A,mon,m,P,p){ var a=Math.atan2(P.y-mon.y,P.x-mon.x), L=p.r||150; ZFX.put(A.scene,'fx_gust',mon.x,mon.y,L,L*0.6,{ox:0,oy:0.5,rot:a,depth:A.depth(mon.y)+0.3,a:0.9,life:0.5}); });
})();
