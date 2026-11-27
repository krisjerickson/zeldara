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
