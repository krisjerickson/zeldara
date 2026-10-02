// ═══════════════════════════════════════════════════════════════════════
// ║ CASTLE RUNS — wardens, captive teachers and learning skills
// ║ (data in 07t-castles.js). A castle is a tower-style dungeon reached
// ║ from a castle island; its top floor holds a one-phase warden and a
// ║ caged master. Beat the warden, open the cage → learn the skill (it
// ║ becomes your special attack, Z).
// ═══════════════════════════════════════════════════════════════════════
(function(){ Object.keys(CASTLE_ISLANDS).forEach(function(k){ var C=CASTLE_ISLANDS[k], W=CHAR_BY_ID[C.warden]; if(!W)return;
  C.rid='cwd_'+k; MON_BY_ID[C.rid]={id:C.rid,name:W.name,q:C.sec,seg:'boss',role:'boss',tier:5,spec:W.spec,tags:[]}; MX.KITS[C.rid]=C.kit; }); })();
var CASTLE_TOWER_BOSS=['dark_warlock','storm_mage','iron_sentinel','shadow_lord'];
var CastleRun={
  of:function(site){ return site&&site.castle?CASTLE_ISLANDS[site.castle]:null; },
  done:function(ps,key){ return (ps.castlesDone||[]).indexOf(key)>=0; },
  // Dungeon site for a castle (entered from the island)
  site:function(key){ var C=CASTLE_ISLANDS[key], S=TOWER_STYLES_BY_ID[C.castle];
    return {id:'isl_castle_'+key,type:'tower',section:C.sec,design:C.castle,castle:key,name:S?S.name:C.name,floors:C.floors}; },
  // one-phase warden (engine monster) — tougher than a tower's regular guards, weaker than the quadrant boss
  spawnWarden:function(scene,C,x,y,mult){ var base=MDEFS[CASTLE_TOWER_BOSS[C.sec-1]]; if(!base)return null; mult=mult||1;
    var st={hp:Math.round(base.hp*1.4*1.5*BOSS_HP_R12*mult),atk:Math.round(base.atk*0.9*mult),def:Math.round((base.def||0)*mult),lv:base.lvMax||base.lvMin||5,xp:Math.round(base.xp*0.7),gMin:base.gMin,gMax:base.gMax,r:Math.max(16,base.r)};
    var mon=MX.spawn(scene,C.rid,x,y,{q:C.sec,stats:st,scale:2.1/MX.scaleOf(MON_BY_ID[C.rid])});
    if(!mon)return null; mon.isBoss=true; mon._m.aggro=false; mon.bossKey='cw_'+C.key; scene.monsters.push(mon);
    scene._bossGroup=[mon]; scene._bossKey='cw_'+C.key; scene._bossPhase=1; scene._bpEv=[]; BossPhases.hud(scene,true); return mon; },
  // the caged teacher next to the exit portal (same cage as the tower craftsmen)
  placeTeacher:function(scene,C){ if(!scene.bossChestTile)return; var ps=scene.worldScene.playerState; if(CastleRun.done(ps,C.key))return;
    var T=CHAR_BY_ID[C.teacher], it=ITEMS[C.skill], bc=scene.bossChestTile, best=null, bd=1e9, bx=Math.floor(scene.bossSpawnX/TILE), by=Math.floor(scene.bossSpawnY/TILE);
    for(var y=bc.y-3;y<=bc.y+3;y++)for(var x=bc.x-3;x<=bc.x+3;x++){
      if(x<1||y<1||x>=DW-1||y>=DH-1||scene.dtiles[y][x]!==DNG.FLOOR||!scene._labReach[y*DW+x])continue;
      if(Math.abs(x-bx)+Math.abs(y-by)<3)continue; var d=Math.abs(Math.hypot(x-bc.x,y-bc.y)-2); if(d<bd){bd=d;best={x:x,y:y};} }
    if(!best)return;
    var cx=best.x*TILE+TILE/2, cy=best.y*TILE+TILE/2, cont=scene.add.container(cx,cy).setDepth(scene._yDepth(cy));
    cont.add(scene.add.ellipse(0,12,22,7,0x000000,0.35));
    var spr=CHX.sprite(scene,C.teacher,0,14,1.3,{act:false,face:false}); if(spr){ spr.setTint(0xc8c0b8); cont.add(spr); } else cont.add(scene.add.circle(0,0,12,0x6a5a3a,1));
    var bars=scene.add.graphics(); bars.lineStyle(2,0x9aa0b0,1); for(var i=-12;i<=12;i+=6)bars.lineBetween(i,-18,i,14); bars.strokeRect(-14,-18,28,32); cont.add(bars);
    var nm=T?T.name:'The teacher', lbl=scene.add.text(0,-26,'⛓ '+nm,{fontSize:'8px',color:'#ffe9a8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5); cont.add(lbl);
    scene._captive={cont:cont,bars:bars,lbl:lbl,spr:spr,C:{n:nm,icon:'🎓',freed:nm+' is free! Open the portal chest to learn '+(it?it.icon+' '+it.name:'a new skill')+'.'}}; },
  // learn a skill: it goes into the inventory and is equipped if the special slot is empty
  learn:function(ps,skill,quiet){ var it=ITEMS[skill]; if(!it)return false; if(!ps.skillsLearned)ps.skillsLearned=[]; if(!ps.inventory)ps.inventory=[]; if(!ps.equip)ps.equip={};
    var fresh=ps.skillsLearned.indexOf(skill)<0; if(fresh)ps.skillsLearned.push(skill);
    if(fresh&&!quiet&&typeof ZLogo!=='undefined')ZLogo.banner('blade_b','New skill',it.name||'',3000);
    if(ps.inventory.indexOf(skill)<0&&ps.equip.special!==skill)ps.inventory.push(skill);
    var eq=false; if(!ps.equip.special){ ps.equip.special=skill; var ix=ps.inventory.indexOf(skill); if(ix>=0)ps.inventory.splice(ix,1); eq=true; }
    if(!quiet)showNotif('🎓 Learned '+it.icon+' '+it.name+'!'+(eq?' Equipped — press Z to use it.':' Equip it in the Special slot.'),'#ffe9a8');
    return fresh; },
  // castle chest (top floor) after the warden falls
  claim:function(scene){ var ps=scene.worldScene.playerState, C=scene._castle, sec=C.sec, first=!CastleRun.done(ps,C.key);
    if(first){ if(!ps.castlesDone)ps.castlesDone=[]; ps.castlesDone.push(C.key); var g=70*sec; ps.gold+=g; CastleRun.learn(ps,C.skill);
      var T=CHAR_BY_ID[C.teacher]; if(T)scene.time.delayedCall(1200,function(){ showNotif('🙏 '+T.name+': “Thank you! Practise well — the '+C.name+' is yours to explore.”','#aaffcc'); });
      showNotif('🏰 '+C.name+' castle cleared! +'+g+'g','#ffdd44'); if(typeof campCelebrate==='function')campCelebrate(scene,scene.px,scene.py,'Castle cleared!'); }
    else { var g2=40*sec; ps.gold+=g2; scene._dropItem(sec); showNotif('🏰 Rematch won! +'+g2+'g','#ffdd44'); }
    scene.time.delayedCall(2000,function(){ scene._exitToWorld(null); }); }
};
// ── Time Slow: engine monsters near the hero move and attack at 30% ──
(function(){ var _t=MX.tick; MX.tick=function(scene,mon,dt){ if(scene&&scene._timeSlow>0){ var P=scene.player||{}; if(Math.hypot((P.x||0)-mon.x,(P.y||0)-mon.y)<220)dt*=0.3; } return _t.call(this,scene,mon,dt); }; })();
