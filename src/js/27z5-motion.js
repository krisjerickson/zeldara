// ═══════════════════════════════════════════════════════════════════════
// ║ 27z5-motion.js — round 140c (Kris: "for some other painted images that should be moving, we need to make additional painted images to show
// ║ them move. one standing out is the apothecary's cauldron, which should be bubbling").
// ║ ZMOVE: any painted piece of scenery (in the world, a room or a dungeon) whose moving loop has been painted — frames mv_<its id>_1 … _4,
// ║ e.g. mv_if_cauldron_1 … 4 — plays that loop in its place, at the same size and spot. Until the frames are in, the still picture stays.
// ║ ZMOVE.FPS: frames a second for a loop (default 6).  Switch: ZMOVE.live.
// ═══════════════════════════════════════════════════════════════════════
var ZMOVE={ live:true, FPS:{mv_if_cauldron:5,mv_cp_cauldron:6},
  on:function(scene,im,sp){ try{ if(!ZMOVE.live||!sp||!sp.zid||typeof ZWE==='undefined'||!ZWE.animTex)return; var base='mv_'+sp.zid; if(ZWE.frames(base)<2)return;
      if(ZWE.LOOP&&ZWE.LOOP[base]==null)ZWE.LOOP[base]=ZMOVE.FPS[base]||6;
      var A=ZWE.animTex(scene,base); if(!A)return; var s=scene.add.sprite(sp.x,sp.y-4,A.key,'0').setOrigin(A.ox,A.oy).setDepth(im.depth);
      s.setScale((sp.zh||A.h)/A.h*A.scale); try{ s.play({key:A.key,startFrame:Math.floor(Math.random()*A.n)}); }catch(e){ try{ s.play(A.key); }catch(e2){} }
      im.setAlpha(0); im._zanim=s; im.once('destroy',function(){ try{ s.destroy(); }catch(e){} }); }catch(e){} } };
// ── the pieces placed one by one (the festival's pieces, the crypt door, the house dressing — Z3.img) get their loops too
ZMOVE.img=function(scene,o,id,h){ try{ if(!ZMOVE.live||!o||typeof ZWE==='undefined')return; var base='mv_'+id; if(ZWE.frames(base)<2){ ZMOVE.code(scene,o,id); return; }
    if(ZWE.LOOP&&ZWE.LOOP[base]==null)ZWE.LOOP[base]=ZMOVE.FPS[base]||6; var A=ZWE.animTex(scene,base); if(!A)return;
    var s=scene.add.sprite(o.x,o.y,A.key,'0').setOrigin(A.ox,A.oy).setDepth(o.depth); s.setScale(h/A.h*A.scale); try{ s.play({key:A.key,startFrame:Math.floor(Math.random()*A.n)}); }catch(e){ try{ s.play(A.key); }catch(e2){} }
    o.setAlpha(0); o._zanim=s; o.once('destroy',function(){ try{ s.destroy(); }catch(e){} }); }catch(e){} };
if(typeof Z3!=='undefined'&&Z3.img){ var _z3img=Z3.img; Z3.img=function(ws,id,x,footY,h){ var o=_z3img.apply(this,arguments); if(o)ZMOVE.img(ws,o,id,h); return o; }; }
// ── round 140c (Kris ✓ in "What should move"): the ones that move in code, with no painting — ZMOVE.CODE[id](scene, image)
ZMOVE.fx=function(scene,im,make){ try{ var L=make(); if(!L)return; L=[].concat(L); im.once('destroy',function(){ L.forEach(function(o){ try{ if(o.remove)o.remove(); if(o.destroy)o.destroy(); }catch(e){} }); }); }catch(e){} };
ZMOVE.sway=function(deg,ms,bob){ return function(scene,im){ ZMOVE.fx(scene,im,function(){ var y0=im.y; im.angle=-deg/2; var t=scene.tweens.add({targets:im,angle:deg/2,duration:ms,yoyo:true,repeat:-1,ease:'Sine.inOut',delay:Math.random()*ms}); var t2=bob?scene.tweens.add({targets:im,y:y0-bob,duration:ms*0.8,yoyo:true,repeat:-1,ease:'Sine.inOut'}):null; return [t,t2].filter(Boolean); }); }; };
ZMOVE.glow=function(tint,amp,ms){ return function(scene,im){ ZMOVE.fx(scene,im,function(){ var g=scene.add.image(im.x,im.y,im.texture.key,im.frame.name).setOrigin(im.originX,im.originY).setScale(im.scaleX,im.scaleY).setDepth(im.depth+0.00001).setBlendMode(Phaser.BlendModes.ADD).setTint(tint).setAlpha(0);
    if(im.flipX)g.setFlipX(true); var t=scene.tweens.add({targets:g,alpha:amp,duration:ms,yoyo:true,repeat:-1,ease:'Sine.inOut',delay:Math.random()*ms}); return [g,t]; }); }; };
ZMOVE.bees=function(scene,im){ ZMOVE.fx(scene,im,function(){ var top=im.y-im.displayHeight*0.75, B=[], ev; for(var i=0;i<4;i++)B.push(scene.add.circle(im.x,top,1.6,0x2a2008).setStrokeStyle(1,0xffd84a).setDepth(im.depth+0.0001));
    var t0=Math.random()*10; ev=scene.time.addEvent({delay:40,loop:true,callback:function(){ t0+=0.04; B.forEach(function(b,i){ var a=t0*(1.6+i*0.37)+i*1.7, r=10+6*Math.sin(t0*0.7+i); b.setPosition(im.x+Math.cos(a)*r,top+Math.sin(a*1.3)*r*0.55); }); }}); return B.concat([ev]); }); };
ZMOVE.smoke=function(scene,im){ ZMOVE.fx(scene,im,function(){ if(!scene.textures.exists('glow'))return null; var e=scene.add.particles(im.x,im.y-im.displayHeight*0.96,'glow',{lifespan:{min:2600,max:3600},speedX:{min:-4,max:9},speedY:{min:-30,max:-16},scale:{start:0.22,end:0.9},alpha:{start:0.3,end:0},tint:0xd8d8d0,frequency:520});
    e.setDepth(im.depth+0.0002); return e; }); };
ZMOVE.CODE={ lm_kite:ZMOVE.sway(9,2400,4), vp_boat:ZMOVE.sway(4,2900,1.5), vp_boat_sail:ZMOVE.sway(4,3100,1.5), hb_ship:ZMOVE.sway(3,3200,1.5), hb_ship_sail:ZMOVE.sway(3,3300,1.5),
  lm_harp:ZMOVE.glow(0x9fe8ff,0.32,1500), pl_lanternlily:ZMOVE.glow(0xffe9a0,0.4,1700), pl_wispreeds:ZMOVE.glow(0x9fe8ff,0.4,1400), pl_bush_glow:ZMOVE.glow(0x9fffd0,0.35,2000), tr_mangrove_glow:ZMOVE.glow(0x9fffd0,0.25,2600),
  tp_wisp:ZMOVE.glow(0xb8f4ff,0.6,420), pl_beehive:ZMOVE.bees, cp_beehive:ZMOVE.bees, lm_chimney:ZMOVE.smoke };
['crypt_door','crypt_door_s1','crypt_door_s2','crypt_door_s3','crypt_door_s4','crypt_door_s5','crypt_door_s6'].forEach(function(k){ ZMOVE.CODE[k]=ZMOVE.glow(0x6fe3f5,0.3,1800); });
ZMOVE.code=function(scene,im,id){ var f=ZMOVE.CODE[id]; if(f&&ZMOVE.live&&scene&&scene.tweens)try{ f(scene,im); }catch(e){} };
(function(){ var on0=ZMOVE.on; ZMOVE.on=function(scene,im,sp){ on0.apply(this,arguments); if(sp&&sp.zid&&im.alpha!==0)ZMOVE.code(scene,im,sp.zid); }; })();
