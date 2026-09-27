

// ═══════════════════════════════════════════════════════════════════════════
// ║  HERO API — single source of truth for hero behaviour across all scenes.
// ║
// ║  Why this exists:
// ║    The original dist/game.html has each Phaser scene implementing player
// ║    creation, movement, animation, and combat inline. Adding a new
// ║    mechanic (e.g. the bow attack) used to require editing 3-4 scenes —
// ║    and we'd inevitably miss one. Lesson learned: 'walks in overworld but
// ║    not dungeons' bugs come from this duplication.
// ║
// ║  Pattern: every scene goes through these helpers instead of inline code.
// ║    _heroRegisterTextures(scene)         — load all walk/back/side/attack/bow
// ║                                            sprite frames into Phaser textures.
// ║    _heroAddSprite(scene, container, y)  — add the feet-anchored hero image.
// ║    _heroNewState(initialDir)            — per-scene walk-cycle state object.
// ║    _heroAnimate(scene, sprite, st, vx, vy, dt, atkTimer, bowTimer)
// ║                                          — picks correct sprite set per
// ║                                            facing, advances walk frame,
// ║                                            shows attack/bow overlays.
// ║    _heroDirFromVel(vx, vy, prevDir)     — derive 4-cardinal facing.
// ║    _heroInArc(dir, dx, dy)              — 120° attack-cone hit check.
// ║    _fireSceneBow(scene, mode)           — bow shot in 'dungeon' / 'island'
// ║                                            (World still uses _fireWorldBow).
// ║    _heroUpdateProjs(scene, mode, dt)    — moves player arrows + collisions.
// ║
// ║  How to add a new mechanic:
// ║    1. Add the helper here (e.g. _heroDodge, _heroSpellCast).
// ║    2. In each scene's update, call the helper. ALL scenes inherit the
// ║       behaviour from one place — no per-scene re-implementation.
// ║    3. Bonus: if the mechanic needs a key binding, dispatch from the
// ║       global key handler using sm.isActive('Dungeon'|'Island'|'World').
// ║
// ║  Still inline per-scene (TODO future refactor):
// ║    - _spawnPlayer / _createPlayer       (each scene builds the container)
// ║    - _movePlayer                         (each scene gates movement)
// ║    - _attack/_playerAttack/_worldAttack  (each scene's melee swing)
// ║  These should eventually become _heroSpawn / _heroMove / _heroAttack.
// ═══════════════════════════════════════════════════════════════════════════
// ── Hero sprite helpers (shared by all scenes) ──────────────────────────────
function _heroRegisterTextures(scene){
  if(!scene.textures.exists('hero_front_0'))for(var a=0;a<HERO_WALK_FRAMES_FRONT.length;a++)scene.textures.addBase64('hero_front_'+a,HERO_WALK_FRAMES_FRONT[a]);
  if(!scene.textures.exists('hero_side_0')) for(var b=0;b<HERO_WALK_FRAMES_SIDE.length;b++) scene.textures.addBase64('hero_side_'+b,HERO_WALK_FRAMES_SIDE[b]);
  if(!scene.textures.exists('hero_back_0')) for(var c=0;c<HERO_WALK_FRAMES_BACK.length;c++) scene.textures.addBase64('hero_back_'+c,HERO_WALK_FRAMES_BACK[c]);
  if(!scene.textures.exists('hero_attack_0'))for(var d=0;d<HERO_ATTACK_FRAMES.length;d++)  scene.textures.addBase64('hero_attack_'+d,HERO_ATTACK_FRAMES[d]);
  if(!scene.textures.exists('hero_bow_0'))   for(var e=0;e<HERO_BOW_FRAMES.length;e++)     scene.textures.addBase64('hero_bow_'+e,HERO_BOW_FRAMES[e]);
  if(!scene.textures.exists('hero_horse_front_0'))for(var hf=0;hf<HERO_HORSE_FRONT.length;hf++)scene.textures.addBase64('hero_horse_front_'+hf,HERO_HORSE_FRONT[hf]);
  if(!scene.textures.exists('hero_horse_side_0')) for(var hs=0;hs<HERO_HORSE_SIDE.length;hs++) scene.textures.addBase64('hero_horse_side_'+hs,HERO_HORSE_SIDE[hs]);
  if(!scene.textures.exists('hero_horse_back_0')) for(var hb=0;hb<HERO_HORSE_BACK.length;hb++) scene.textures.addBase64('hero_horse_back_'+hb,HERO_HORSE_BACK[hb]);
}
function _heroAddSprite(scene, container, feetY){
  _heroRegisterTextures(scene);
  var sp=scene.add.image(0,feetY||14,scene.textures.exists('hero_front_0')?'hero_front_0':'__DEFAULT')
    .setOrigin(.5,1).setDisplaySize(25,42);
  container.add(sp);
  return sp;
}
function _heroNewState(initialDir){
  return {dir:initialDir||'down',_walkFrame:0,_walkTimer:0,_wasMoving:false,_lastSet:null};
}
function _heroAnimate(scene, sprite, st, vx, vy, dt, atkTimer, bowTimer){
  if(!sprite)return;
  // Bow attack overlay — checked first so CTRL never visually fires the sword.
  // 10 frames over the 0.7s draw cycle.
  if(bowTimer&&bowTimer>0){
    var bp=1-(bowTimer/0.7); if(bp<0)bp=0; if(bp>1)bp=1;
    var bf=Math.min(9,Math.floor(bp*10));
    var bk='hero_bow_'+bf;
    if(scene.textures.exists(bk))sprite.setTexture(bk).setDisplaySize(38,42);
    sprite.setFlipX(st.dir==='left');
    return;
  }
  // Sword attack overlay.
  if(atkTimer&&atkTimer>0){
    var ap=1-(atkTimer/0.45); if(ap<0)ap=0; if(ap>1)ap=1;
    var af=Math.min(6,Math.floor(ap*7));
    var ak='hero_attack_'+af;
    if(scene.textures.exists(ak))sprite.setTexture(ak).setDisplaySize(38,42);
    sprite.setFlipX(st.dir==='left');
    return;
  }
  // Detect horse mount — switch sprite sets and display size when riding.
  // Reads from worldScene's playerState (same source for all scenes).
  var ps=(scene.worldScene&&scene.worldScene.playerState)||scene.playerState;
  var onHorse=ps&&ps.mount==='horse';
  var moving=(vx||vy);
  var setKey, setTag, startF, endF, dispW, dispH;
  if(onHorse){
    // Horse-rider: 8 frames per direction, cycle 1-7 (frame 0 = idle pose).
    if(st.dir==='left'||st.dir==='right'){setKey='hero_horse_side_';setTag='HS';}
    else if(st.dir==='up'){setKey='hero_horse_back_';setTag='HB';}
    else {setKey='hero_horse_front_';setTag='HF';}
    startF=1; endF=7;
    dispW=35; dispH=58;
  } else {
    if(st.dir==='left'||st.dir==='right'){setKey='hero_side_';setTag='S';startF=1;endF=7;}
    else if(st.dir==='up'){setKey='hero_back_';setTag='B';startF=1;endF=3;}
    else {setKey='hero_front_';setTag='F';startF=3;endF=7;}
    dispW=25; dispH=42;
  }
  if(moving){
    if(!st._wasMoving||st._lastSet!==setTag){st._walkFrame=startF;st._walkTimer=0;}
    st._walkTimer+=dt;
    if(st._walkTimer>=0.10){st._walkTimer-=0.10;st._walkFrame=(st._walkFrame>=endF)?startF:st._walkFrame+1;}
  } else {st._walkFrame=0;st._walkTimer=0;}
  st._wasMoving=moving;
  st._lastSet=setTag;
  var k=setKey+st._walkFrame;
  if(scene.textures.exists(k))sprite.setTexture(k).setDisplaySize(dispW,dispH);
  sprite.setFlipX(st.dir==='left');
}
function _heroDirFromVel(vx, vy, prevDir){
  if(vx<0)return 'left';
  if(vx>0)return 'right';
  if(vy<0)return 'up';
  if(vy>0)return 'down';
  return prevDir||'down';
}
// ── Hero API (shared) ─────────────────────────────────────────────────────
//   _fireSceneBow(scene, mode)   — fires bow in 'dungeon' or 'island' scenes.
//                                  World still uses _fireWorldBow() so the
//                                  rich tween animation + ammo HUD logic is
//                                  unchanged. Both end up registering the
//                                  bow timer on the scene so _heroAnimate
//                                  picks up the swing automatically.
//   _heroUpdateProjs(scene, mode, dt) — moves player arrows, checks walls
//                                       (dungeon only), applies damage.
//   Future extensions (poison, splash, status effects) land here once and
//   every scene picks them up.
function _fireSceneBow(scene, mode){
  if(!scene)return;
  var ws=scene.worldScene||scene; if(!ws||!ws.playerState)return;
  var ps=ws.playerState;
  var atkField=mode==='dungeon'?'playerAtkTimer':'atkTimer';
  if((scene[atkField]||0)>0)return;
  var rWeapon=ps.equip&&ps.equip.rHand?ITEMS[ps.equip.rHand]:null;
  if(!rWeapon||rWeapon.slot!=='rHand'){
    showNotif(ps.equip&&ps.equip.mWeapon?'Magic weapon equipped — use X for spells!':'No ranged weapon equipped! Equip a bow.','#ff8844');
    return;
  }
  var ammoId=ws._getBestAmmo?ws._getBestAmmo(rWeapon):null;
  if(!ammoId){showNotif('Out of ammo!','#ff8844');return;}
  if(!ps.ammo)ps.ammo={};
  ps.ammo[ammoId]=Math.max(0,(ps.ammo[ammoId]||1)-1);
  if(ws._updateAmmoHUD)ws._updateAmmoHUD();
  var sub=(ITEMS[ammoId]||{}).subtype||'normal';
  var stats=ws.calcPlayerStats?ws.calcPlayerStats():{atk:ps.atk||3};
  var atkPow=Math.max(1,(rWeapon.atk||6)+Math.floor((stats.atk||0)*0.3));
  // Cooldown + bow animation timer
  scene[atkField]=0.7;
  var bowField=mode==='dungeon'?'pBowTimer':'iBowTimer';
  scene[bowField]=0.7;
  // Player position + direction (different field names per scene)
  var px,py,dir;
  if(mode==='dungeon'){px=scene.px;py=scene.py;dir=scene.pdir||'down';}
  else {px=scene.player.x;py=scene.player.y;dir=(scene.player.dir)||'down';}
  var dirAng={right:0,left:Math.PI,up:-Math.PI/2,down:Math.PI/2}[dir]||0;
  var nx=Math.cos(dirAng),ny=Math.sin(dirAng);
  var spd=sub==='heat'?220:360;
  var col={normal:0xeedd88,cold:0x88ddff,fire:0xff6600,heat:0xff8800}[sub]||0xeedd88;
  var vis=scene.add.rectangle(px,py,16,4,col).setDepth(15).setAngle(dirAng*180/Math.PI);
  var arrField=mode==='dungeon'?'_dngPlayerProj':'_islPlayerProj';
  if(!scene[arrField])scene[arrField]=[];
  scene[arrField].push({vis:vis,x:px,y:py,vx:nx*spd,vy:ny*spd,
    dmg:atkPow,life:2.2,hit:false,subtype:sub,
    tracking:sub==='heat',
    effect:sub==='cold'?'slow':sub==='fire'?'fire':'none',
    effectDur:2.0,splashR:sub==='fire'?70:0});
}
function _heroUpdateProjs(scene, mode, dt){
  var arrField=mode==='dungeon'?'_dngPlayerProj':'_islPlayerProj';
  var arr=scene[arrField]; if(!arr||!arr.length)return;
  var monsters=scene.monsters||[];
  scene[arrField]=arr.filter(function(pr){
    if(!pr||!pr.vis)return false;
    pr.life-=dt;
    if(pr.life<=0){pr.vis.destroy();return false;}
    if(pr.tracking){
      var best=null,bestD=9999;
      monsters.forEach(function(m){if(m.dead)return;var d=Math.hypot(m.x-pr.x,m.y-pr.y);if(d<bestD){bestD=d;best=m;}});
      if(best){var sp=Math.hypot(pr.vx,pr.vy)||300;var ta=Math.atan2(best.y-pr.y,best.x-pr.x);var ca=Math.atan2(pr.vy,pr.vx);var df=ta-ca;while(df>Math.PI)df-=Math.PI*2;while(df<-Math.PI)df+=Math.PI*2;ca+=df*Math.min(1,dt*3.5);pr.vx=Math.cos(ca)*sp;pr.vy=Math.sin(ca)*sp;}
    }
    pr.x+=pr.vx*dt;pr.y+=pr.vy*dt;pr.vis.setPosition(pr.x,pr.y);
    // Wall collision (dungeon/towers only — island is open)
    if(mode==='dungeon'&&scene._canGoD&&!scene._canGoD(pr.x,pr.y)){pr.vis.destroy();return false;}
    if(pr.hit)return false;
    monsters.forEach(function(mon){
      if(mon.dead||pr.hit)return;
      var hitR=(mon.def.r||10)+6;
      if(Math.hypot(mon.x-pr.x,mon.y-pr.y)>hitR)return;
      pr.hit=true;
      var monDef=(mon.monDef!==undefined?mon.monDef:mon.def.def)||0;
      var dmg=Math.max(1,pr.dmg-monDef+Math.floor(Math.random()*3));
      mon.hp-=dmg;
      if(scene._floatText)scene._floatText(mon.x,mon.y-(mon.def.r||10)-10,'-'+dmg,'#aaddff');
      mon.body.setFillStyle(0xffffff);
      var dRef=mon.def;
      scene.time.delayedCall(120,function(){if(!mon.dead)mon.body.setFillStyle(dRef.color||dRef.col||0x884422);});
      if(mon.hpFill){var hpW=mode==='dungeon'?32:30;mon.hpFill.displayWidth=hpW*Math.max(0,mon.hp/mon.maxHp);}
      if(mon.hp<=0){
        if(mode==='dungeon'&&scene._monsterDied)scene._monsterDied(mon);
        else _heroKillMonster(scene, mon);
      }
    });
    return !pr.hit;
  });
}
// ── Familiar tick (orbit visual + auto-attack) ─────────────────────────
// Generic across World/Dungeon/Island. Reads ps.familiar/2/3 from worldScene's
// playerState, manages per-scene visuals (`scene._famVisuals`), timers
// (`scene._famTimers`), and projectiles (`scene._famProj`).
// ── Shield block (SHIFT-hold) — generic across scenes ─────────────────
//   _heroShieldTick(scene, x, y) — call each frame in any combat scene.
//     Reads scene.keys.SHIFT, sets scene._shielding, draws/hides ring.
//   _heroApplyShield(scene, ps, rawDmg, x, y) — wrap any incoming damage.
//     Returns reduced damage and shows block flash if applicable.
function _heroShieldTick(scene, x, y){
  var ws=scene.worldScene||scene; if(!ws||!ws.playerState)return;
  var ps=ws.playerState;
  var hadShield=scene._shielding;
  scene._shielding=!!(scene.keys&&scene.keys.SHIFT&&scene.keys.SHIFT.isDown&&ps.equip&&ps.equip.shield&&ITEMS[ps.equip.shield]);
  if(scene._shielding&&!hadShield){_heroShieldFlash(scene,x,y,false);}
  if(scene._shieldRing){
    if(scene._shielding){scene._shieldRing.setPosition(x,y).setVisible(true);}
    else{scene._shieldRing.setVisible(false);}
  } else if(scene._shielding){
    scene._shieldRing=scene.add.circle(x,y,24,0x4488ff,0.20).setDepth(9);
  }
}
function _heroApplyShield(scene, ps, rawDmg, x, y){
  if(!scene._shielding)return rawDmg;
  if(!ps.equip||!ps.equip.shield)return rawDmg;
  var si=ITEMS[ps.equip.shield]; if(!si)return rawDmg;
  var sdef=si.def||0;
  var blockChance=0.15+sdef*0.02;
  if(Math.random()<blockChance){
    if(scene._floatText)scene._floatText(x,y-42,'🛡️ BLOCKED!','#88ffcc');
    _heroShieldFlash(scene,x,y,true);
    return 0;
  }
  _heroShieldFlash(scene,x,y,false);
  return Math.max(1,Math.ceil(rawDmg*0.75)); // 25% passive reduction
}
function _heroShieldFlash(scene, x, y, fullBlock){
  var col=fullBlock?0x00ffcc:0x4488ff;
  var r=fullBlock?34:26;
  var vis=scene.add.circle(x,y,r,col,fullBlock?0.70:0.50).setDepth(16);
  scene.tweens.add({targets:vis,radius:r+16,alpha:0,duration:fullBlock?380:220,onComplete:function(){vis.destroy();}});
}
// _heroFamiliarsTick / familiar abilities moved to 09-hero-core.js (Familiars v2).
function _heroInArc(dir, dx, dy){
  var dirAng={right:0, down:Math.PI/2, left:Math.PI, up:-Math.PI/2}[dir];
  if(dirAng===undefined)return true;
  var monAng=Math.atan2(dy, dx);
  var diff=Math.abs(monAng-dirAng);
  if(diff>Math.PI)diff=2*Math.PI-diff;
  return diff<=Math.PI/3;
}

