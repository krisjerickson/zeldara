// ═══════════════════════════════════════════════════════════════════════
// ║ HERO CORE v2  (Phase 1 · panels B2, B3, B4, B6)
// ║
// ║ Scene-agnostic helpers so every mechanic works the same in the world,
// ║ dungeons, towers, islands, caves and volcanoes:
// ║   _heroCtx(scene)              player position / facing / monster list
// ║   _heroHitMonster(...)         damage + float text + flash + death, any scene
// ║   _heroCastSpell(scene)        X key, every scene (World keeps its own caster)
// ║   _heroStowMount / Restore     auto-dismount in special areas (B4)
// ║   _heroDied(scene, area)       one death flow for every scene (B6)
// ║   _attachSafetyEscape / _showSceneError   crash-safety for sub-scenes
// ║   Familiars v2                 unique abilities that scale with level (B2)
// ║   _heroUpkeep(dt)              one per-frame loop for all of the above,
// ║                                driven by game 'poststep' (24-pause-input.js)
// ═══════════════════════════════════════════════════════════════════════

// ── Scene adapter ──────────────────────────────────────────────────────
function _heroWS(){ return (typeof game!=='undefined'&&game.scene)?game.scene.getScene('World'):null; }
function _heroCtx(scene){
  var key=scene.sys.settings.key, ws=scene.worldScene||_heroWS(), ps=ws&&ws.playerState;
  var x=0,y=0,dir='down';
  if(key==='Cave'){ x=scene._px; y=scene._py; dir=(scene._pFacing<0)?'left':'right'; }
  else if(key==='Dungeon'){ x=scene.px; y=scene.py; dir=scene.pdir||'down'; }
  else if(scene.player&&scene.player.x!==undefined){
    x=scene.player.x; y=scene.player.y;
    dir=scene.player.dir||(scene._heroSt&&scene._heroSt.dir)||(scene.playerWalkState&&scene.playerWalkState.dir)||'down';
  } else if(scene.px!==undefined){ x=scene.px; y=scene.py; dir=scene.pdir||'down'; }
  var monsters=scene.worldMonsters||scene.monsters||scene._mons||[];
  return {key:key, ws:ws, ps:ps, x:x, y:y, dir:dir, monsters:monsters};
}
function _heroDirAngle(dir){ return {right:0,left:Math.PI,up:-Math.PI/2,down:Math.PI/2}[dir]||0; }
function _heroSetPos(scene, x, y){
  var key=scene.sys.settings.key;
  if(key==='Cave'){ scene._px=x; scene._py=y; if(scene._pCont)scene._pCont.setPosition(x,y); return true; }
  if(key==='Dungeon'){ scene.px=x; scene.py=y; if(scene.pCont)scene.pCont.setPosition(x,y); return true; }
  if(scene.player&&scene.player.x!==undefined){
    scene.player.x=x; scene.player.y=y;
    if(scene.player.cont)scene.player.cont.setPosition(x,y);
    if(scene.playerCont)scene.playerCont.setPosition(x,y);
    return true;
  }
  return false;
}
// Can a projectile / teleport occupy this pixel?
function _heroOpenAt(scene, x, y){
  var key=scene.sys.settings.key;
  if(key==='Dungeon'&&scene._canGoD)return scene._canGoD(x,y);
  if(key==='Cave'&&scene._isSolid)return !scene._isSolid(Math.floor(x/CV),Math.floor(y/CV));
  if(key==='World'&&scene.tiles){
    var t=(scene.tiles[Math.floor(y/TILE)]||[])[Math.floor(x/TILE)];
    return t!==undefined&&!PROJ_WALL_TILES.has(t);
  }
  return true;
}
// ── line of sight: no attacking through walls ──
var LOS_WALL_TILES=new Set([T.ROCK,T.LARGE_BOULDER,T.BUILDING_WALL,T.CLIFF]); if(T.PROP!==undefined)LOS_WALL_TILES.add(T.PROP);
var HIGH_WALL_TILES=new Set([T.BUILDING_WALL,T.CLIFF]);   // what flying spirits can't pass
function _heroWallAt(scene,x,y,high){ var key=scene.sys.settings.key, tx=Math.floor(x/TILE), ty=Math.floor(y/TILE), WS=high?HIGH_WALL_TILES:LOS_WALL_TILES;
  if(key==='Dungeon'&&scene.dtiles){ var r=scene.dtiles[ty]; return !r||r[tx]===undefined||r[tx]===DNG.WALL; }
  if(key==='Cave'&&scene._isSolid)return scene._isSolid(Math.floor(x/CV),Math.floor(y/CV));
  if(key==='World'&&scene.tiles){ var t=(scene.tiles[ty]||[])[tx]; return t!==undefined&&WS.has(t); }
  if(key==='Island'&&scene._imap){ var t2=(scene._imap.tiles[ty]||[])[tx]; return t2!==undefined&&WS.has(t2); }
  return false; }
// true when nothing solid lies between (x0,y0) and (x1,y1); the ends themselves are ignored
function _heroLOS(scene,x0,y0,x1,y1,high){ var d=Math.hypot(x1-x0,y1-y0); if(d<14)return true; var n=Math.ceil(d/6);
  for(var i=1;i<n;i++){ var f=i/n; if(f*d<8||(1-f)*d<10)continue; if(_heroWallAt(scene,x0+(x1-x0)*f,y0+(y1-y0)*f,high))return false; } return true; }
function _heroFloat(scene, x, y, msg, col){
  if(scene._floatText){ scene._floatText(x,y,msg,col); return; }
  var t=scene.add.text(x,y,msg,{fontSize:'12px',color:col||'#fff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(40);
  scene.tweens.add({targets:t,y:y-34,alpha:0,duration:900,onComplete:function(){t.destroy();}});
}

// Damage one monster from any source (spell, familiar, burn). Returns damage dealt.
// opts: {pure:true} ignores DEF · {col:'#hex'} · {suffix:'🔥'}
function _heroHitMonster(scene, mon, raw, opts){
  if(!mon||mon.dead)return 0;
  opts=opts||{};
  var def=opts.pure?0:((mon.monDef!==undefined?mon.monDef:(mon.def&&mon.def.def))||0);
  var dmg=Math.max(1,Math.round(raw)-def+(opts.pure?0:Math.floor(Math.random()*3)));
  MX._src=opts.src||'spell'; mon.hp-=dmg; MX._src=null;   // spells + familiars: breaks ✨ wards
  var r=(mon.def&&mon.def.r)||10;
  _heroFloat(scene, mon.x, mon.y-r-10, '-'+dmg+(opts.suffix||''), opts.col||'#aaddff');
  if(mon.body&&mon.body.setFillStyle){
    mon.body.setFillStyle(0xffffff);
    var col=(mon.def&&(mon.def.color||mon.def.col))||0x884422;
    scene.time.delayedCall(110,function(){ if(!mon.dead&&mon.body&&mon.body.active)mon.body.setFillStyle(col); });
  }
  if(mon.hpFill){ mon.hpFill.displayWidth=(mon.hpFill.width||30)*Math.max(0,mon.hp/(mon.maxHp||mon.hp||1)); }
  if(mon.hp<=0)_heroKillMonster(scene, mon);
  return dmg;
}
function _heroKillMonster(scene, mon){
  if(mon.dead)return;
  var key=scene.sys.settings.key;
  if(key==='World'&&scene._worldMonsterDied){ scene._worldMonsterDied(mon); return; }
  if(key==='Dungeon'&&scene._monsterDied){ scene._monsterDied(mon); return; }
  if(scene._islandMonsterDied){ scene._islandMonsterDied(mon); return; }
  // Cave / boss rush / anything else: generic reward + mark dead
  mon.dead=true; if(mon.cont)mon.cont.setAlpha(key==='VolcanoBossRush'?0.3:0.2);
  var ws=_heroWS(), ps=ws&&ws.playerState;
  if(key==='VolcanoBossRush'){ showNotif('💀 '+mon.def.name+' defeated!','#ffdd44'); return; }
  if(ps&&mon.def){
    var xp=Math.ceil((mon.def.hp||20)*0.6), gold=5+Math.floor(Math.random()*10);
    ps.xp+=xp; ps.gold+=gold;
    _heroFloat(scene, mon.x, mon.y-36, '+'+xp+' xp +'+gold+'g', '#44ffaa');
    if(ws._checkLevelUp)ws._checkLevelUp(ps);
    if(mon.isBoss&&key==='Cave')scene._bossDefeated=true;
  }
}

// ── Crash-safety for sub-scenes (called at the top of volcano create()) ─
function _attachSafetyEscape(scene){
  // Esc is bound per scene; the global handler only intercepts it while a
  // menu is open, so with no menu open it always reaches this listener.
  scene.input.keyboard.off('keydown-ESC');
  scene.input.keyboard.on('keydown-ESC',function(){
    try{ if(scene._exitToWorld){ scene._exitToWorld(); return; } }catch(e){ console.error('exit failed',e); }
    _heroForceReturn(scene);
  });
}
function _heroForceReturn(scene){
  var key=scene._sceneKey||scene.sys.settings.key;
  document.getElementById('dungeon-hud').style.display='none';
  document.getElementById('hud').style.display='';
  game.scene.stop(key);
  game.scene.wake('World');
  var ws=_heroWS(); if(ws&&ws._emitUI)ws._emitUI();
}
function _showSceneError(scene, err){
  var el=document.getElementById('scene-error-banner');
  if(!el){
    el=document.createElement('div'); el.id='scene-error-banner';
    el.style.cssText='position:fixed;top:30%;left:50%;transform:translateX(-50%);z-index:10040;background:#2a0808;border:1px solid #ff5555;color:#ffdddd;font:13px Segoe UI,sans-serif;padding:16px 20px;border-radius:10px;max-width:480px;text-align:center';
    document.body.appendChild(el);
  }
  el.innerHTML='<b>Something went wrong loading this area.</b><br><span style="font-family:monospace;font-size:11px;color:#ffaaaa">'+
    String(err&&err.message||err).replace(/</g,'&lt;')+'</span><br><br><button id="scene-error-back" style="padding:6px 14px">Return to the world</button>';
  el.style.display='block';
  document.getElementById('scene-error-back').onclick=function(){ el.style.display='none'; _heroForceReturn(scene); };
}

// ── Mounts: stow in special areas, restore on the way out (B4) ─────────
function _heroStowMount(scene){
  var ws=scene.worldScene||_heroWS(), ps=ws&&ws.playerState; if(!ps)return;
  if(ps.mount){
    ps._stowedMount=ps.mount; ps.mount=null;
    var m=MOUNTS[ps._stowedMount];
    showNotif('You dismount'+(m?' your '+m.n:'')+' — mounts wait outside.','#ccddff');
  }
}
function _heroRestoreMount(ws){
  var ps=ws&&ws.playerState; if(!ps||!ps._stowedMount)return;
  if((ps.ownedMounts||[]).indexOf(ps._stowedMount)>=0||ps._stowedMount==='horse'){
    ps.mount=ps._stowedMount;
    var m=MOUNTS[ps.mount]; if(m)showNotif('Back on your '+m.n+'.','#ccddff');
  }
  delete ps._stowedMount;
  if(ws._emitUI)ws._emitUI();
}

// ── One death flow for every area (B6) ─────────────────────────────────
var _HERO_AREA_NAMES={Dungeon:'the dungeon',Island:'the island',Cave:'the cave',Building:'a building',Sky:'the sky',
  VolcanoMaze:'the Ember maze',VolcanoBulletHell:'the Magma climb',VolcanoPuzzle:'the Obsidian vault',
  VolcanoEscape:'the Ashfire chamber',VolcanoBossRush:'the Volcano Lord’s arena'};
function _heroDied(scene){
  if(scene._heroDying)return; scene._heroDying=true;
  var key=scene.sys.settings.key, ws=_heroWS();
  if(key==='World'){ ws._worldPlayerDied(); return; }
  var area=(key==='Dungeon'&&scene.siteType==='tower')?'the tower':(_HERO_AREA_NAMES[key]||'battle');
  showNotif('💀 You fell in '+area+'…','#ff5544');
  var finish=function(){
    document.getElementById('dungeon-hud').style.display='none';
    document.getElementById('hud').style.display='';
    var isl=game.scene.getScene('Island');
    var viaIsland=(scene.islandScene||scene._returnScene==='Island'||(scene._initData&&scene._initData.returnScene==='Island'));
    game.scene.stop(key);
    if(key!=='Island'&&viaIsland&&isl&&(game.scene.isSleeping('Island')||game.scene.isActive('Island'))&&isl._exitToWorld){
      isl._exitToWorld();                       // leaves the island too and wakes World
    } else if(key==='Island'&&scene._exitToWorld){
      scene._done=false; scene._exitToWorld();
    } else {
      game.scene.wake('World');
    }
    if(ws){ ws._worldPlayerDied(); if(ws._emitUI)ws._emitUI(); }
  };
  try{ scene.cameras.main.fadeOut(450,40,0,0); scene.time.delayedCall(500,finish); }
  catch(e){ finish(); }
}

// ── Spells on X in every area (B3) ─────────────────────────────────────
var _heroSpellCdUntil=0;
function _heroCastSpell(scene){
  if(!scene)return;
  var key=scene.sys.settings.key;
  var ws=_heroWS(), ps=ws&&ws.playerState; if(!ps)return;
  var tome=ps.equip&&ps.equip.spell?ITEMS[ps.equip.spell]:null;
  if(!tome||!tome.spellId||!SPELL_DATA[tome.spellId]){ showNotif('✨ Equip a spell tome to cast with X','#99aaff'); return; }
  if(key==='World'){ ws._castSpell(); return; }
  if(key==='Sky'){ showNotif('Spells can’t be cast while flying','#99aaff'); return; }
  if(key==='Building'){ showNotif('No spell casting indoors','#99aaff'); return; }
  var sp=SPELL_DATA[tome.spellId], now=Date.now();
  if(now<_heroSpellCdUntil)return;
  if((ps.mana||0)<sp.manaCost){ showNotif('Not enough mana! (need '+sp.manaCost+')','#4466ff'); return; }
  ps.mana=Math.max(0,ps.mana-sp.manaCost);
  var stats=ws.calcPlayerStats?ws.calcPlayerStats():{};
  _heroSpellCdUntil=now+sp.cooldown*1000*(1-(stats.cdReduce||0));
  var c=_heroCtx(scene);
  var pow=Math.round(Math.max(5,tome.atk||12)*(stats.spellMult||1));
  var ang=_heroDirAngle(c.dir), nx=Math.cos(ang), ny=Math.sin(ang);
  var col=sp.proj?sp.proj.col:(sp.aoe?sp.aoe.col:(sp.cloud?sp.cloud.col:0xaaddff));
  // Cast flash
  var ring=scene.add.circle(c.x,c.y,16,col,0.55).setDepth(19);
  scene.tweens.add({targets:ring,scaleX:2.4,scaleY:2.4,alpha:0,duration:260,onComplete:function(){ring.destroy();}});
  if(!scene._heroSpellProj)scene._heroSpellProj=[];
  if(sp.proj){
    var n=sp.proj.count||1;
    for(var i=0;i<n;i++){
      (function(i){
        var a=ang+(n>1&&!sp.proj.burstDelay?(i-(n-1)/2)*(sp.proj.spread||0.3):0);
        var launch=function(){
          var cc=_heroCtx(scene);
          var v=scene.add.circle(cc.x,cc.y,sp.proj.r,sp.proj.col,0.95).setDepth(15);
          scene._heroSpellProj.push({vis:v,x:cc.x,y:cc.y,vx:Math.cos(a)*sp.proj.spd,vy:Math.sin(a)*sp.proj.spd,life:2.4,
            dmg:pow,effect:sp.effect,effectDur:sp.effectDur||2,splashR:sp.splashR||0,chainN:sp.chainN||0,pierce:!!sp.proj.pierce,hitSet:[]});
        };
        var d=(sp.proj.burstDelay||0)*i;
        if(d>0)scene.time.delayedCall(d*1000,launch); else launch();
      })(i);
    }
  } else if(tome.spellId==='flame_nova'){
    _heroNova(scene,c.x,c.y,sp.aoe.r,sp.aoe.col,pow,'fire');
  } else if(tome.spellId==='meteor'){
    var tx=c.x+nx*200, ty=c.y+ny*200;
    var mark=scene.add.circle(tx,ty,sp.aoe.r,0xff4400,0.22).setDepth(14);
    scene.tweens.add({targets:mark,alpha:0.5,duration:500,yoyo:true});
    scene.time.delayedCall((sp.delay||1)*1000,function(){ mark.destroy(); _heroNova(scene,tx,ty,sp.aoe.r,sp.aoe.col,pow*1.5,'fire'); try{scene.cameras.main.shake(200,0.01);}catch(e){} });
  } else if(tome.spellId==='thunder_step'){
    var ox=c.x, oy=c.y, step=8, dist=0, lx=c.x, ly=c.y;
    while(dist<sp.teleportDist){ var tx2=lx+nx*step, ty2=ly+ny*step; if(!_heroOpenAt(scene,tx2,ty2))break; lx=tx2; ly=ty2; dist+=step; }
    _heroSetPos(scene,lx,ly);
    _heroNova(scene,ox,oy,sp.aoe.r,sp.aoe.col,pow,'stun');
    scene.playerIFrames=Math.max(scene.playerIFrames||0,0.5); scene.iFrames=Math.max(scene.iFrames||0,0.5); scene._iFrames=Math.max(scene._iFrames||0,0.5);
  } else if(tome.spellId==='poison_mist'){
    if(!scene._heroClouds)scene._heroClouds=[];
    var cl=scene.add.circle(c.x,c.y,sp.cloud.r,sp.cloud.col,0.35).setDepth(14);
    scene._heroClouds.push({vis:cl,x:c.x,y:c.y,r:sp.cloud.r,life:sp.cloud.dur,tick:0,dps:Math.max(sp.poisonDps||4,pow*0.25)});
    _heroFloat(scene,c.x,c.y-30,'☁️ Poison Mist','#44cc44');
  }
  if(ws._emitUI)ws._emitUI();
}
function _heroNova(scene,x,y,r,col,dmg,effect){
  var ring=scene.add.circle(x,y,4,col,0.9).setDepth(15);
  scene.tweens.add({targets:ring,scaleX:r/4,scaleY:r/4,alpha:0,duration:350,onComplete:function(){ring.destroy();}});
  _heroCtx(scene).monsters.forEach(function(m){
    if(m.dead||Math.hypot(m.x-x,m.y-y)>r)return;
    _heroHitMonster(scene,m,dmg,{col:'#ff8844'});
    if(effect==='stun'||effect==='slow')_heroSlow(scene,m,effect==='stun'?2:1.5,effect==='stun'?0.1:0.5);
    if(effect==='fire')_heroBurn(m,3,Math.max(1,dmg*0.1));
  });
}
function _heroSpellTick(scene, dt){
  var arr=scene._heroSpellProj;
  if(arr&&arr.length){
    var mons=_heroCtx(scene).monsters;
    scene._heroSpellProj=arr.filter(function(p){
      if(!p.vis||!p.vis.active)return false;
      p.life-=dt; if(p.life<=0){p.vis.destroy();return false;}
      p.x+=p.vx*dt; p.y+=p.vy*dt; p.vis.setPosition(p.x,p.y);
      if(!_heroOpenAt(scene,p.x,p.y)){p.vis.destroy();return false;}
      for(var i=0;i<mons.length;i++){
        var m=mons[i]; if(m.dead||p.hitSet.indexOf(m)>=0)continue;
        if(Math.hypot(m.x-p.x,m.y-p.y)>((m.def&&m.def.r)||10)+6)continue;
        p.hitSet.push(m);
        var d=_heroHitMonster(scene,m,p.dmg,{col:'#aaddff'});
        if(p.effect==='slow')_heroSlow(scene,m,p.effectDur,0.5);
        if(p.effect==='splash'){
          var ex=scene.add.circle(p.x,p.y,8,0xff6600,0.9).setDepth(16);
          scene.tweens.add({targets:ex,scaleX:6,scaleY:6,alpha:0,duration:300,onComplete:function(){ex.destroy();}});
          mons.forEach(function(m2){ if(m2!==m&&!m2.dead&&Math.hypot(m2.x-p.x,m2.y-p.y)<=(p.splashR||70))_heroHitMonster(scene,m2,d*0.5,{pure:true,col:'#ff8800',suffix:'🔥'}); });
        }
        if(p.effect==='chain')_heroChain(scene,m,p.chainN||3,d*0.7,mons);
        if(!p.pierce){p.vis.destroy();return false;}
      }
      return true;
    });
  }
  if(scene._heroClouds&&scene._heroClouds.length){
    var ms=_heroCtx(scene).monsters;
    scene._heroClouds=scene._heroClouds.filter(function(cl){
      cl.life-=dt; if(cl.life<=0){cl.vis.destroy();return false;}
      cl.vis.setAlpha(Math.min(0.45,cl.life*0.15));
      cl.tick+=dt; if(cl.tick>=0.5){ cl.tick=0; ms.forEach(function(m){ if(!m.dead&&Math.hypot(m.x-cl.x,m.y-cl.y)<=cl.r)_heroHitMonster(scene,m,cl.dps*0.5,{pure:true,col:'#66dd66'}); }); }
      return true;
    });
  }
}
function _heroChain(scene, from, n, dmg, mons){
  var last=from, hit=[from];
  for(var i=0;i<n;i++){
    var best=null,bd=130;
    mons.forEach(function(m){ if(m.dead||hit.indexOf(m)>=0)return; var d=Math.hypot(m.x-last.x,m.y-last.y); if(d<bd){bd=d;best=m;} });
    if(!best)break;
    _heroBolt(scene,last.x,last.y,best.x,best.y,0xffff66);
    _heroHitMonster(scene,best,dmg,{pure:true,col:'#ffff88',suffix:'⚡'});
    hit.push(best); last=best;
  }
}
function _heroBolt(scene,x1,y1,x2,y2,col){
  var g=scene.add.graphics().setDepth(17); g.lineStyle(2,col,1); g.beginPath(); g.moveTo(x1,y1);
  var segs=6; for(var i=1;i<segs;i++){ var t=i/segs; g.lineTo(x1+(x2-x1)*t+(Math.random()-0.5)*14, y1+(y2-y1)*t+(Math.random()-0.5)*14); }
  g.lineTo(x2,y2); g.strokePath();
  scene.tweens.add({targets:g,alpha:0,duration:220,onComplete:function(){g.destroy();}});
}

// ── Status effects any scene understands ───────────────────────────────
// Slow: World monsters already honour mon._slow; elsewhere we damp movement
// in _heroStatusTick by pulling each slowed monster back toward last frame.
function _heroSlow(scene, m, dur, factor){
  m._slowT=Math.max(m._slowT||0,dur); m._slowF=Math.min(m._slowF===undefined?1:m._slowF,factor);
  if(scene.sys.settings.key==='World')m._slow=Math.max(m._slow||0,dur);
  if(m.body&&m.body.setStrokeStyle)m.body.setStrokeStyle(2,0x88ddff);
}
function _heroBurn(m, dur, dps){ m._burnT=Math.max(m._burnT||0,dur); m._burnDps=Math.max(m._burnDps||0,dps); m._burnTick=m._burnTick||0; }
function _heroStatusTick(scene, dt){
  var key=scene.sys.settings.key;
  _heroCtx(scene).monsters.forEach(function(m){
    if(m.dead)return;
    if(m._burnT>0){
      m._burnT-=dt; m._burnTick+=dt;
      if(m._burnTick>=0.5){ m._burnTick=0; _heroHitMonster(scene,m,m._burnDps*0.5,{pure:true,col:'#ff8844',suffix:'🔥'}); }
      if(m._burnT<=0)m._burnDps=0;
    }
    if(m._slowT>0){
      m._slowT-=dt;
      if(key!=='World'&&m._lastX!==undefined){
        var f=m._slowF===undefined?0.5:m._slowF;
        m.x=m._lastX+(m.x-m._lastX)*f; m.y=m._lastY+(m.y-m._lastY)*f;
        if(m.cont)m.cont.setPosition(m.x,m.y);
      }
      if(m._slowT<=0){ m._slowF=undefined; if(m.body&&m.body.setStrokeStyle)m.body.setStrokeStyle(); }
    }
    m._lastX=m.x; m._lastY=m.y;
  });
}

// (Familiars live in 09d-familiars.js — elemental spirit familiars.)
function _heroMonsterCanStand(scene,x,y){
  var key=scene.sys.settings.key;
  if(key==='World'&&scene._canGoMonster)return scene._canGoMonster(x,y);
  if(key==='Dungeon'&&scene._canGoD)return scene._canGoD(x,y);
  if(key==='Cave'&&scene._isSolid)return !scene._isSolid(Math.floor(x/CV),Math.floor(y/CV));
  if(key==='VolcanoBossRush')return x>40&&x<scene.W-40&&y>40&&y<scene.H-40;
  return _heroOpenAt(scene,x,y);
}
// ═══════════════════════════════════════════════════════════════════════
// ║ Per-frame upkeep for whichever scene the player is in. World keeps its
// ║ own spell/mana code; everything else gets it here, so sub-scenes no
// ║ longer need to remember to call these.
// ═══════════════════════════════════════════════════════════════════════
var _HERO_NO_UPKEEP={Title:1,Boot:1,Sky:1};
function _heroUpkeep(dtMs){
  if(typeof isGamePaused==='function'&&isGamePaused())return;
  var sc=(typeof _activePlayScene==='function')?_activePlayScene(false):null;
  if(!sc)return;
  var key=sc.sys.settings.key; if(_HERO_NO_UPKEEP[key])return;
  var dt=Math.min(0.1,dtMs/1000);
  var ws=_heroWS(), ps=ws&&ws.playerState; if(!ps)return;
  try{
    if(key!=='World'){
      // Mana regenerates everywhere (the World scene does its own).
      if(ps.mana<ps.maxMana){ var mr=(ws.calcPlayerStats?ws.calcPlayerStats().manaRegen:0)||0; ps.mana=Math.min(ps.maxMana,ps.mana+(4+mr)*dt); }
      _heroSpellTick(sc,dt);
    }
    _heroFamiliarsTick(sc,dt);
    _heroFamProjTick(sc,dt);
    _heroStatusTick(sc,dt);
  }catch(e){ if(!_heroUpkeep._warned){ _heroUpkeep._warned=true; console.error('hero upkeep',e); } }
}
