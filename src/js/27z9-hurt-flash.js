// ═══════════════════════════════════════════════════════════════════════
// ║ 27z9-hurt-flash.js — round 142 (Kris: "when your hero gets hit, we should have a better indication of this … tinting you red super quick
// ║ when you get hit, like the enemies which turn white quick when they are hit").
// ║ ZHURT: every scene draws the hero through _heroAnimate each frame; when your hearts drop since the last frame the hero flashes solid red
// ║ for a blink (70 ms) and keeps a red cast a moment longer (to 180 ms) — in the world, the sites, the sky and the volcano alike.
// ║ Switch: ZHURT.on.
// ═══════════════════════════════════════════════════════════════════════
var ZHURT={ on:true, FILL:0xff2a2a, CAST:0xff7070, T1:70, T2:180,
  ps:function(sc){ try{ return sc.playerState||(sc.worldScene&&sc.worldScene.playerState)||game.scene.getScene('World').playerState; }catch(e){ return null; } },
  flash:function(sp,now){ sp._zhT=now; try{ if(typeof ZENG!=='undefined')ZENG.tintFill(sp,ZHURT.FILL); else sp.setTintFill(ZHURT.FILL); }catch(e){} } };
if(typeof _heroAnimate==='function'){ (function(){ var a0=_heroAnimate; _heroAnimate=function(scene,sprite){ var r=a0.apply(this,arguments);
  try{ if(!ZHURT.on||!sprite||!sprite.scene)return r; var ps=ZHURT.ps(scene), now=scene.time?scene.time.now:Date.now(); if(!ps)return r; var hp=+ps.hp||0;
    if(sprite._zhHp!=null&&hp<sprite._zhHp-0.25&&hp>=0)ZHURT.flash(sprite,now); sprite._zhHp=hp;
    if(sprite._zhT!=null){ var t=now-sprite._zhT; if(t>ZHURT.T2||t<0){ if(typeof ZENG!=='undefined')ZENG.tint(sprite,0xffffff); sprite.clearTint(); sprite._zhT=null; } else if(t>ZHURT.T1){ if(typeof ZENG!=='undefined')ZENG.tint(sprite,ZHURT.CAST); else sprite.setTint(ZHURT.CAST); } } }catch(e){}
  return r; }; })(); }
