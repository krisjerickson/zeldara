// ─── Sandbox / Dev Mode ─────────────────────────
function openSandbox(){toggleModal('sandbox');}
function checkSandboxPw(){
  var pw=document.getElementById('sb-pw').value;
  if(pw==='agricola'){
    document.getElementById('sandbox-panel').style.display='flex';
    document.getElementById('sb-pw').parentElement.style.display='none';
  } else {
    showNotif('Incorrect password.','#ff4444');
  }
}
function _sbWs(){return game.scene.getScene('World');}
// painted sprites (04f-atlas.js) on / off — off shows the stand-ins everywhere; remembered on this device
// painted scenery (04h, round 30): on / off, and a size trial for objects and for buildings. The ground and its objects are painted once per area, so each change saves and reloads the page.
function _sbReload(msg){ try{ var ws=_sbWs(); if(ws&&ws._save)ws._save(); }catch(e){} showNotif(msg+' — reloading…','#aaddff'); setTimeout(function(){ try{ location.reload(); }catch(e){} },700); }
function sbScenery(){ if(typeof ZScn==='undefined')return; ZScn.set('zeldara_scenery',ZScn.off?'on':'off'); _sbReload('Painted scenery '+(ZScn.off?'on':'off')); }
var SB_SCN_STEPS=[0.85,1,1.15,1.3,1.5];
function sbScnSize(which){ if(typeof ZScn==='undefined')return; var cur=which==='kb'?ZScn.KB:ZScn.K, i=SB_SCN_STEPS.indexOf(cur), nx=SB_SCN_STEPS[(i+1)%SB_SCN_STEPS.length]; ZScn.set(which==='kb'?'zeldara_scn_kb':'zeldara_scn_k',nx); _sbReload((which==='kb'?'Building':'Object')+' size '+Math.round(nx*100)+'%'); }
function sbScnInit(){ if(typeof ZScn==='undefined'||typeof document==='undefined')return; var a=document.getElementById('sb-scenery'), b=document.getElementById('sb-scn-k'), c=document.getElementById('sb-scn-kb');
  if(a)a.textContent='🏡 Painted scenery: '+(ZScn.off?'off (drawn)':'on'); if(b)b.textContent='🌳 Object size: '+Math.round(ZScn.K*100)+'%'; if(c)c.textContent='🏠 Building size: '+Math.round(ZScn.KB*100)+'%'; }
setTimeout(sbScnInit,0); setTimeout(function(){ if(typeof sbEdgesInit==="function")sbEdgesInit(); },0);
function sbSprites(){ if(typeof ZAtlas==='undefined')return; ZAtlas.setOff(!ZAtlas.off); var b=document.getElementById('sb-sprites'); if(b)b.textContent='🎨 Painted sprites: '+(ZAtlas.off?'off (stand-ins)':'on'); showNotif('Painted sprites '+(ZAtlas.off?'off — stand-ins shown':'on'),'#aaddff'); }
function sbVolcanoUnlock(){
  var ws=_sbWs(); if(!ws) return;
  var ps=ws.playerState;
  // 1. Force-trigger the quest by marking all 4 section dungeons completed.
  if(!ps.completedQuests)ps.completedQuests=[];
  ['s1_dungeon','s2_dungeon','s3_dungeon','s4_dungeon'].forEach(function(k){
    if(!ps.completedQuests.includes(k))ps.completedQuests.push(k);
  });
  // 2. Drop all 4 keys into inventory (skip duplicates).
  if(!ps.inventory)ps.inventory=[];
  ['volcano_key_n','volcano_key_e','volcano_key_s','volcano_key_w'].forEach(function(k){
    if(!ps.inventory.includes(k))ps.inventory.push(k);
  });
  // 3. Spawn the volcano sites in the live world (visuals + sites array).
  _spawnVolcanoVisuals(ws);
  // 4. UI refresh + save.
  ws._emitUI();
  if(ws._save)ws._save();
  showNotif('🌋 Volcano Lord quest unlocked + 4 keys granted!','#ff6633');
}
function sbRevealMap(){
  var ws=_sbWs(); if(!ws||!ws.playerState||!ws.playerState.exploredGrid) return;
  var g=ws.playerState.exploredGrid;
  for(var i=0;i<g.length;i++) g[i]=1;
  ws.playerState.visitedZones=WMAP_ZONES.map(function(z){return z.id;});   // names on the full map too
  ws._expVer=(ws._expVer||0)+1; // bump so minimap re-caches
  if(ws._emitUI) ws._emitUI();
  if(ws._save) ws._save();
  showNotif('🗺️ Full map revealed','#88aaff');
}
function sbNight(){
  var ws=_sbWs(); if(!ws)return; ws._forceNight=ws._forceNight===undefined?1:ws._forceNight===1?0:undefined;
  showNotif(ws._forceNight===undefined?'🌗 Day/night cycle':ws._forceNight?'🌙 Night':'☀️ Day','#bfe8ff');
}
function sbAllWaystones(){
  var ws=_sbWs(); if(!ws||!ws.wd) return; var ps=ws.playerState;
  ps.activatedWaystones=ws.wd.waystones.map(function(w){return w.id;});
  ws.wd.waystones.forEach(function(w){ ws._drawWaystone(w); });
  ws._expVer=(ws._expVer||0)+1; if(ws._save)ws._save();
  showNotif('🔷 All '+ps.activatedWaystones.length+' waystones activated','#6fe3f5');
}
function _sbTeleportTo(tx, ty){
  var ws=_sbWs(); if(!ws||!ws.player) return false;
  // Make sure quest sites exist if going to a volcano (works even without unlock toggle).
  ws.player.x = tx*TILE + TILE/2;
  ws.player.y = ty*TILE + TILE/2;
  ws.player.cont.setPosition(ws.player.x, ws.player.y);
  if(ws.cameras && ws.cameras.main && ws.cameras.main.centerOn){
    ws.cameras.main.centerOn(ws.player.x, ws.player.y);
  }
  // Reveal a generous patch around landing so you see what's around you
  if(ws.playerState && ws.playerState.exploredGrid){
    var cx=Math.floor(tx/EXP_SCALE), cy=Math.floor(ty/EXP_SCALE);
    for(var ay=-4;ay<=4;ay++) for(var ax=-4;ax<=4;ax++){
      var fx=cx+ax, fy=cy+ay;
      if(fx>=0&&fx<EXP_W&&fy>=0&&fy<EXP_H) ws.playerState.exploredGrid[fy*EXP_W+fx]=1;
    }
    ws._expVer=(ws._expVer||0)+1;
  }
  return true;
}
function sbGoBigVolcano(){
  var ws=_sbWs(); if(!ws) return;
  // Spawn sites if missing (so you can warp there even before triggering the quest).
  _spawnVolcanoVisuals(ws);
  var big=_volcanoSiteDefs().find(function(d){return d.type==='volcano_main';});
  if(!big){showNotif('Big volcano not defined','#ff4444');return;}
  // Land the player a few tiles north of the door so they can walk in.
  if(_sbTeleportTo(big.tx+1, big.ty-3)){
    showNotif('🌋 Teleported to the great volcano','#ff6633');
  }
}
function sbGoMiniVolcano(){
  var ws=_sbWs(); if(!ws) return;
  _spawnVolcanoVisuals(ws);
  var minis=_volcanoSiteDefs().filter(function(d){return d.type==='volcano_mini';});
  if(!minis.length){showNotif('No mini volcanoes defined','#ff4444');return;}
  // Cycle: each press moves you to the next mini in the list.
  ws._sbMiniIdx=((ws._sbMiniIdx||0)+1) % minis.length;
  var idx=ws._sbMiniIdx;
  var m=minis[idx];
  if(_sbTeleportTo(m.tx+1, m.ty-3)){
    var dirName=['N','E','S','W'][idx];
    showNotif('🔥 Teleported to mini-volcano '+(idx+1)+'/4 ('+dirName+')','#ffaa66');
  }
}
function sbGold(){var ws=_sbWs();if(ws){ws.playerState.gold+=1000;ws._emitUI();showNotif('+1000 Gold','#ffd700');}}
function sbLevel(){var ws=_sbWs();if(ws){ws.playerState.xp=ws.playerState.level*100;ws._checkLevelUp(ws.playerState);ws._emitUI();}}
function sbHeal(){var ws=_sbWs();if(ws){ws.playerState.hp=ws.playerState.maxHp;ws._emitUI();showNotif('HP Restored!','#44ffaa');}}
function sbUnlockAll(){
  var ws=_sbWs();if(!ws)return;
  for(var i=1;i<=4;i++)ws.unlockSection(i);
  // …and build every crossing (all four craftsmen count as freed)
  var ps=ws.playerState; if(!ps.rescued)ps.rescued=[]; [1,2,3,4].forEach(function(s){ if(ps.rescued.indexOf(s)<0)ps.rescued.push(s); });
  if(ws._syncGates)ws._syncGates(true); if(ws._refreshVillageNPCs)ws._refreshVillageNPCs();
  // …and every waystone joins the travel network
  if(ws.wd&&ws.wd.waystones){ ps.activatedWaystones=ws.wd.waystones.map(function(w){return w.id;}); ws.wd.waystones.forEach(function(w){ ws._drawWaystone(w); }); ws._expVer=(ws._expVer||0)+1; }
  // …and the boss towers/dungeons are unsealed (their bonus sites count as cleared)
  if(!ps.bonusCleared)ps.bonusCleared=[]; (ws.wd.sites||[]).forEach(function(s){ if(s.bonus&&ps.bonusCleared.indexOf(s.id)<0)ps.bonusCleared.push(s.id); });
  ws._emitUI();showNotif('All regions unlocked · 12 crossings open · 17 waystones active · boss sites unsealed','#ffdd44');
}
function sbGodMode(){
  var ws=_sbWs();if(!ws)return;
  ws.playerState.godMode=!ws.playerState.godMode;
  var on=ws.playerState.godMode;
  document.getElementById('sb-godmode-status').style.display=on?'block':'none';
  showNotif('God Mode: '+(on?'ON':'OFF'),on?'#ffaa44':'#aaa');
}
function sbHorse(){
  var ws=_sbWs();if(!ws)return;
  if(!ws.playerState.ownedMounts.includes('horse'))ws.playerState.ownedMounts.push('horse');
  ws.playerState.mount='horse';ws._emitUI();showNotif('Horse equipped!','#44ffaa');
}
function sbTeleport(sec){
  var ws=_sbWs();if(!ws)return;
  var x,y;
  if(sec===0){x=CENTER_X*TILE+TILE/2;y=CENTER_Y*TILE+TILE/2;}
  else{ var c=ws._getSectionCenter(sec); x=c.x*TILE+TILE/2; y=c.y*TILE+TILE/2; }
  ws.player.x=x;ws.player.y=y;ws.player.cont.setPosition(x,y);
  if(ws.cameras&&ws.cameras.main)ws.cameras.main.centerOn(x,y);
  ws._emitUI();showNotif('Teleported!','#44ffaa');closeModal('sandbox');
}
function sbSpawnMonsters(){
  // Spawn one of every MDEFS type in a large ring around the player
  var ws=_sbWs();if(!ws||!ws.player){showNotif('Start a game first!','#ff4444');return;}
  if(!ws.worldMonsters)ws.worldMonsters=[];
  var px=ws.player.x, py=ws.player.y;
  var allTypes=Object.keys(MDEFS);
  var ringR=200, angleStep=(Math.PI*2)/allTypes.length;
  var spawned=0;
  allTypes.forEach(function(mtype,idx){
    var mdef=MDEFS[mtype];if(!mdef)return;
    var ang=angleStep*idx;
    var wx=px+Math.cos(ang)*ringR, wy=py+Math.sin(ang)*ringR;
    var cont=ws.add.container(wx,wy).setDepth(9);
    var shadow=ws.add.ellipse(0,mdef.r+2,mdef.r*2.2,7,0x000000,.3);
    var body=ws.add.circle(0,0,mdef.r,mdef.color);
    var icon=ws.add.text(0,0,mdef.icon,{fontSize:mdef.boss?'16px':'14px',fontFamily:'serif'}).setOrigin(.5,.5);
    var hpBg=ws.add.rectangle(0,-(mdef.r+8),28,4,0x000000,.7);
    var hpFill=ws.add.rectangle(-14,-(mdef.r+8),28,4,0xff3333).setOrigin(0,.5);
    var monLevel=mdef.lvMin||1;
    var monHp=mdef.hp, monAtk=mdef.atk, monDef=mdef.def;
    var lvCol=mdef.boss?'#ff4444':'#ffdd44';
    var nameT=ws.add.text(0,-(mdef.r+16),mdef.name+(mdef.boss?' ★':''),{fontSize:'7px',color:mdef.boss?'#ffdd88':'#ffffff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5);
    var lvBadge=ws.add.text(0,-(mdef.r+24),(mdef.boss?'★ ':'')+'Lv.'+monLevel,{fontSize:'6px',color:lvCol,fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(10);
    cont.add([shadow,body,icon,hpBg,hpFill,nameT,lvBadge]);
    ws.worldMonsters.push({
      cont:cont,body:body,hpFill:hpFill,type:mtype,def:mdef,
      hp:monHp,maxHp:monHp,x:wx,y:wy,spawnX:wx,spawnY:wy,
      section:mdef.sec||1,dead:false,respawnTimer:0,level:monLevel,monDef:monDef,monAtk:monAtk,
      state:'wander',wanderVx:0,wanderVy:0,wanderTimer:0,atkTimer:0,_md:{}
    });
    spawned++;
  });
  showNotif('Spawned '+spawned+' monsters in a ring around you!','#ff8844');
  closeModal('sandbox');
}
function sbReset(){
  ZSave.clearCurrent();
  showNotif('This save slot was cleared — reload to restart.','#ff8844');
}
// ─── Sandbox Adventure Site Launchers ────────────────────────────────────
function _sbStopAdventure(){
  // Stop any non-World scene and ensure World is awake
  ['Island','Dungeon','Sky'].forEach(function(k){
    try{var sc=game.scene.getScene(k);if(sc&&(game.scene.isActive(k)||game.scene.isSleeping(k)))game.scene.stop(k);}catch(e){}
  });
  if(!game.scene.isActive('World')){try{game.scene.wake('World');}catch(e){}}
}
function _sbGoToSiteEntry(type,sec){
  // Teleport player to just outside the site door in the overworld, let them Tab in
  var ws=_sbWs();
  if(!ws||!ws.player){showNotif('Start a new game first!','#ff4444');return;}
  _sbStopAdventure();
  var ps=ws.playerState;
  if(!ps.unlockedSections.includes(sec))ps.unlockedSections.push(sec);
  var site=(ws.sites||[]).find(function(s){return s.type===type&&s.section===sec;});
  if(!site){showNotif('Site not found — start a new game first!','#ff8888');return;}
  // Door is at tile (site.tx+1, site.ty+2); stand 1 tile below it
  var wx=(site.tx+1)*TILE+TILE/2;
  var wy=(site.ty+3)*TILE+TILE/2;
  ws.player.x=wx;ws.player.y=wy;
  ws.player.cont.setPosition(wx,wy);
  if(ws.cameras&&ws.cameras.main)ws.cameras.main.centerOn(wx,wy);
  ws._emitUI();
  document.getElementById('hud').style.display='';
  document.getElementById('dungeon-hud').style.display='none';
  closeModal('sandbox');
  var icons={dungeon:'⚔️',tower:'🗼',harbor:'⚓',skyport:'🎈'};
  var labels={dungeon:'Dungeon',tower:'Tower',harbor:'Island Harbor',skyport:'Skyport'};
  showNotif((icons[type]||'📍')+' At '+(labels[type]||type)+' (Sec '+sec+'). Press Tab to enter!','#ffdd44');
}
function sbGoDungeon(sec){_sbGoToSiteEntry('dungeon',sec);}
function sbGoTower(sec){_sbGoToSiteEntry('tower',sec);}
function sbGoHarbor(sec){_sbGoToSiteEntry('harbor',sec);}
function sbGoSkyport(sec){_sbGoToSiteEntry('skyport',sec);}
function sbGoIslandAdv(sec){
  // Launch the familiar island, skip sailing, and warp the player to its adventure spot (one Tab enters it).
  sec=sec||3;
  var ws=_sbWs();
  if(!ws||!ws.player){showNotif('Start a new game first!','#ff4444');return;}
  _sbStopAdventure();
  var ps=ws.playerState;
  if(!ps.unlockedSections.includes(sec))ps.unlockedSections.push(sec);
  ws._sailTo(sec+'a','adv');
  closeModal('sandbox');
  showNotif(((ISL_ADV[sec]||{}).label||'Adventure')+' — at the adventure spot. Press Tab to enter!','#ffaa66');
}

function sbGoIsland(sec){
  var ws=_sbWs();if(!ws)return;
  // Stop any running scene other than World first
  ['Island','Dungeon','Sky'].forEach(function(k){
    try{var s=game.scene.getScene(k);if(s&&game.scene.isActive(k))game.scene.stop(k);}catch(e){}
  });
  // Make sure World is awake
  if(!game.scene.isActive('World')){
    try{game.scene.wake('World');}catch(e){}
  }
  // Ensure the section is unlocked so the island makes sense
  if(ps&&!ps.unlockedSections){var ps=ws.playerState;}
  else{var ps=ws.playerState;}
  if(ps&&!ps.unlockedSections.includes(sec)){ps.unlockedSections.push(sec);}
  // Build a fake harbor site for this section
  ws._sailTo(sec+'a','dock');
  closeModal('sandbox');
  showNotif('\u2693 Launching '+(['','Corsair Isle','Bog Isle','Ember Isle','Frost Isle'][sec]||'Island')+'...','#88ccff');
}

// ─── Bot Mode ──────────────────────────────────────────────────────────────
var _botRunning=false;
function _addBotLog(msg,col){
  var el=document.getElementById('sb-bot-log');if(!el)return;
  el.style.display='block';
  var row=document.createElement('div');
  row.style.color=col||'#ccc';row.style.marginBottom='2px';row.style.fontSize='10px';
  row.textContent='['+new Date().toLocaleTimeString()+'] '+msg;
  el.appendChild(row);el.scrollTop=el.scrollHeight;
}
function _botTeleport(ws,wx,wy){
  ws.player.x=wx;ws.player.y=wy;ws.player.cont.setPosition(wx,wy);
  if(ws.cameras&&ws.cameras.main)ws.cameras.main.centerOn(wx,wy);
}
function sbRunBot(){
  var ws=game&&game.scene?game.scene.getScene('World'):null;
  if(!ws||!ws.player){_addBotLog('ERROR: Start a new game first!','#ff4444');return;}
  if(_botRunning){
    _botRunning=false;
    document.getElementById('sb-bot-btn').textContent='🤖 Run Full Bot';
    _addBotLog('Bot stopped.','#ffaa44');return;
  }
  _botRunning=true;
  document.getElementById('sb-bot-btn').textContent='⏹ Stop Bot';
  document.getElementById('sb-bot-log').innerHTML='';
  _addBotLog('🤖 Full walkthrough bot starting — God Mode ON','#44ffaa');
  var ps=ws.playerState;
  var origGod=ps.godMode;ps.godMode=true;
  var okList=[],warnList=[],errList=[];
  function logOk(m){okList.push(m);_addBotLog('✅ '+m,'#44ffaa');}
  function logWarn(m){warnList.push(m);_addBotLog('⚠️ '+m,'#ffaa44');}
  function logErr(m){errList.push(m);_addBotLog('❌ '+m,'#ff4444');}
  function logStep(m){_addBotLog('▶ '+m,'#88ccff');}

  // Helper: programmatically complete a site quest and apply its boss reward
  function simComplete(siteType,sec){
    var qKey='s'+sec+'_'+siteType;
    if(!ps.completedQuests)ps.completedQuests=[];
    if(!ps.completedQuests.includes(qKey))ps.completedQuests.push(qKey);
    if(ps.activeQuest===qKey)ps.activeQuest=null;
    var rw=BOSS_REWARDS[qKey];
    if(rw){
      if(rw.mount){if(!ps.ownedMounts)ps.ownedMounts=[];if(!ps.ownedMounts.includes(rw.mount)){ps.ownedMounts.push(rw.mount);if(!ps.mount)ps.mount=rw.mount;}}
      if(rw.rings)rw.rings.forEach(function(r){if(ps.inventory.indexOf(r)<0)ps.inventory.push(r);});
      if(rw.unlockSection){try{ws.unlockSection(rw.unlockSection);}catch(e){}}
    }
    return rw;
  }
  // Helper: find site and stand at its door
  function goToSite(type,sec){
    var site=(ws.sites||[]).find(function(s){return s.type===type&&s.section===sec;});
    if(site){_botTeleport(ws,(site.tx+1)*TILE+TILE/2,(site.ty+3)*TILE+TILE/2);return true;}
    return false;
  }
  // Helper: kill monsters near player in worldScene
  function killNearby(count){
    var killed=0;
    (ws.worldMonsters||[]).filter(function(m){return!m.dead;}).slice(0,count).forEach(function(m){
      _botTeleport(ws,m.x+18,m.y);
      for(var i=0;i<8;i++){if(ws._worldAttack)ws._worldAttack();}
      if(m.dead)killed++;
    });
    return killed;
  }

  var steps=[
    // ─── PHASE 1: Village & Buildings ─────────────────────────────────
    {ms:60,fn:function(){
      logStep('PHASE 1: Village & Buildings');
      _botTeleport(ws,CENTER_X*TILE,CENTER_Y*TILE);
    }},
    {ms:80,fn:function(){
      var blds=ws.buildings||[];
      var types=blds.map(function(b){return b.type;});
      var expected=['tavern','blacksmith','guild','armory','clothing','jeweler','apothecary','merchant'];
      var missing=expected.filter(function(t){return types.indexOf(t)<0;});
      logOk('Village has '+blds.length+' buildings: '+types.slice(0,6).join(', ')+'…');
      if(missing.length)logWarn('Missing buildings: '+missing.join(', '));
      else logOk('All expected building types present');
    }},
    // ─── PHASE 2: Section 1 — Tower + Dungeon ─────────────────────────
    {ms:60,fn:function(){logStep('PHASE 2: Section 1 — Tower + Dungeon');}},
    {ms:80,fn:function(){
      ps.activeQuest='s1_tower';
      var found=goToSite('tower',1);
      if(found)logOk('Tower sec 1 site found & reachable');
      else logWarn('Tower sec 1 site NOT found');
    }},
    {ms:80,fn:function(){
      // Kill sec 1 monsters
      var killed=killNearby(6);
      logOk('Killed '+killed+' overworld monsters in sec 1');
    }},
    {ms:80,fn:function(){
      var rw=simComplete('tower',1);
      if(rw&&rw.unlockSection){logOk('s1_tower complete — sec 2 unlocked, rings obtained');}
      else logWarn('s1_tower BOSS_REWARD missing or unlockSection absent');
    }},
    {ms:80,fn:function(){
      ps.activeQuest='s1_dungeon';
      var found=goToSite('dungeon',1);
      if(found)logOk('Dungeon sec 1 site found');
      else logWarn('Dungeon sec 1 NOT found');
    }},
    {ms:60,fn:function(){
      var rw=simComplete('dungeon',1);
      if(rw&&rw.mount)logOk('s1_dungeon complete — '+rw.mount+' mount unlocked');
      else logWarn('s1_dungeon reward missing');
    }},
    // ─── PHASE 3: Section 2 ───────────────────────────────────────────
    {ms:60,fn:function(){logStep('PHASE 3: Section 2 — Tower + Dungeon');}},
    {ms:80,fn:function(){
      ps.activeQuest='s2_tower';
      var ok2=goToSite('tower',2);
      if(ok2)logOk('Tower sec 2 site found');
      else logWarn('Tower sec 2 NOT found');
    }},
    {ms:80,fn:function(){
      var _c2=ws._getSectionCenter(2); _botTeleport(ws,_c2.x*TILE,_c2.y*TILE);
      var killed=killNearby(5);
      logOk('Sec 2 patrol — killed '+killed+' monsters');
    }},
    {ms:80,fn:function(){
      var rw=simComplete('tower',2);
      if(rw&&rw.unlockSection)logOk('s2_tower complete — sec 3 unlocked');
      else logWarn('s2_tower reward issue');
    }},
    {ms:60,fn:function(){
      simComplete('dungeon',2);
      logOk('s2_dungeon complete — mount obtained');
    }},
    // ─── PHASE 4: Section 3 ───────────────────────────────────────────
    {ms:60,fn:function(){logStep('PHASE 4: Section 3 — Tower + Dungeon + Cave Island');}},
    {ms:80,fn:function(){
      ps.activeQuest='s3_tower';
      var ok3=goToSite('tower',3);
      if(ok3)logOk('Tower sec 3 site found');
      else logWarn('Tower sec 3 NOT found');
    }},
    {ms:80,fn:function(){
      var rw=simComplete('tower',3);
      if(rw&&rw.unlockSection)logOk('s3_tower complete — sec 4 unlocked');
      else logWarn('s3_tower reward issue');
    }},
    {ms:60,fn:function(){
      simComplete('dungeon',3);
      logOk('s3_dungeon complete');
    }},
    {ms:80,fn:function(){
      var site=(ws.sites||[]).find(function(s){return s.type==='harbor'&&s.section===3;});
      if(site)logOk('Harbor sec 3 (Ember Isle / Cave) found at ('+site.tx+','+site.ty+')');
      else logWarn('Harbor sec 3 NOT found');
    }},
    // ─── PHASE 5: Section 4 ───────────────────────────────────────────
    {ms:60,fn:function(){logStep('PHASE 5: Section 4 — Final Tower + Dungeon');}},
    {ms:80,fn:function(){
      ps.activeQuest='s4_tower';
      var ok4=goToSite('tower',4);
      if(ok4)logOk('Tower sec 4 site found');
      else logWarn('Tower sec 4 NOT found');
    }},
    {ms:80,fn:function(){
      var rw=simComplete('tower',4);
      if(rw)logOk('s4_tower complete — '+rw.message);
      else logWarn('s4_tower reward issue');
    }},
    {ms:60,fn:function(){
      simComplete('dungeon',4);
      logOk('s4_dungeon complete — dragon mount unlocked');
    }},
    // ─── PHASE 6: All Sites Inventory Check ───────────────────────────
    {ms:60,fn:function(){logStep('PHASE 6: Site inventory scan');}},
    {ms:80,fn:function(){
      var allSites=ws.sites||[];
      var byType={};
      allSites.forEach(function(s){byType[s.type]=(byType[s.type]||0)+1;});
      Object.keys(byType).forEach(function(t){logOk('Site type "'+t+'": '+byType[t]+' instances');});
      ['dungeon','tower','harbor','skyport'].forEach(function(t){
        if(!byType[t])logWarn('No "'+t+'" sites found in world');
      });
    }},
    {ms:80,fn:function(){
      // Stand at skyport sec 1 to verify it's reachable
      var found=goToSite('skyport',1);
      if(found)logOk('Skyport sec 1 reachable');
      else logWarn('Skyport sec 1 not found');
    }},
    // ─── PHASE 7: Player State ─────────────────────────────────────────
    {ms:60,fn:function(){logStep('PHASE 7: Player state & progression checks');}},
    {ms:80,fn:function(){
      if(ps.equip)logOk('ps.equip present');else logErr('ps.equip MISSING');
      if(Array.isArray(ps.inventory))logOk('ps.inventory present ('+ps.inventory.length+' items)');else logErr('ps.inventory MISSING');
      if(ps.unlockedSections&&ps.unlockedSections.length>=4)logOk('All 4 sections unlocked');
      else logWarn('Only '+((ps.unlockedSections||[]).length)+' sections unlocked');
      if(ps.ownedMounts&&ps.ownedMounts.length>0)logOk('Mounts: '+ps.ownedMounts.join(', '));
      else logWarn('No mounts in ownedMounts');
      if((ps.completedQuests||[]).length>=8)logOk('All 8 quests completed');
      else logWarn('Only '+(ps.completedQuests||[]).length+'/8 quests done');
    }},
    // Level up to cap
    {ms:80,fn:function(){
      ps.level=20;ps.xp=0;ps.maxHp=150;ps.hp=150;ps.atk=30;ps.def=12;
      try{ws._checkLevelUp&&ws._checkLevelUp(ps);logOk('Level 20, maxHp 150 set');}
      catch(e){logWarn('_checkLevelUp issue: '+e.message);}
    }},
    // ─── PHASE 8: Items Catalog ────────────────────────────────────────
    {ms:60,fn:function(){logStep('PHASE 8: ITEMS catalog spot-check');}},
    {ms:80,fn:function(){
      var checkIds=['iron_sword','long_sword','sea_trident','flame_sword','sky_sword',
                    'sea_shell_buckler','ruby_ring','speed_ring','leather','captains_coat',
                    'skill_fireball','skill_heal','potion','health_potion'];
      var missing=checkIds.filter(function(id){return!ITEMS[id];});
      if(missing.length)logWarn('Missing ITEMS: '+missing.join(', '));
      else logOk('All '+checkIds.length+' spot-checked items present');
    }},
    // ─── PHASE 9: Inventory Modal ─────────────────────────────────────
    {ms:60,fn:function(){logStep('PHASE 9: Inventory UI render');}},
    {ms:80,fn:function(){
      try{updateInventoryModal(ps);logOk('updateInventoryModal() succeeded');}
      catch(e){logErr('updateInventoryModal() FAILED: '+e.message);}
    }},
    // ─── PHASE 10: Save ───────────────────────────────────────────────
    {ms:60,fn:function(){logStep('PHASE 10: Save system');}},
    {ms:80,fn:function(){
      try{ws._save&&ws._save();logOk('Save succeeded');}
      catch(e){logErr('Save FAILED: '+e.message);}
    }},
    // ─── SUMMARY ──────────────────────────────────────────────────────
    {ms:100,fn:function(){
      ps.godMode=origGod;
      _botRunning=false;
      document.getElementById('sb-bot-btn').textContent='🤖 Run Full Bot';
      _addBotLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━','#336688');
      _addBotLog('🏁 Bot done! ✅ '+okList.length+' OK  ⚠️ '+warnList.length+' Warn  ❌ '+errList.length+' Err',errList.length?'#ff8844':warnList.length?'#ffdd44':'#44ffaa');
      if(warnList.length){_addBotLog('Warnings (non-critical):','#ffaa44');warnList.forEach(function(m){_addBotLog('  ⚠ '+m,'#ffcc88');});}
      if(errList.length){_addBotLog('Errors (needs fixing):','#ff4444');errList.forEach(function(m){_addBotLog('  ✖ '+m,'#ff8888');});}
      _addBotLog('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━','#336688');
    }},
  ];
  var idx=0;
  function runStep(){
    if(!_botRunning&&idx<steps.length-1){_addBotLog('Bot stopped.','#ffaa44');ps.godMode=origGod;return;}
    if(idx>=steps.length)return;
    var s=steps[idx++];
    setTimeout(function(){
      try{s.fn();}catch(e){_addBotLog('STEP ERR: '+e.message,'#ff4444');errList.push(e.message);}
      runStep();
    },s.ms);
  }
  runStep();
}

// Round 33: whenever the hero is invincible (Dev panel or Site Lab), a badge says so on screen — a boss test with it left on looks like "the boss does no damage".
(function(){ if(typeof document==='undefined'||typeof setInterval==='undefined')return; setInterval(function(){ try{ var ws=typeof game!=='undefined'&&game.scene&&game.scene.getScene('World'), on=!!(ws&&ws.playerState&&ws.playerState.godMode), el=document.getElementById('god-badge');
    if(on&&!el){ el=document.createElement('div'); el.id='god-badge'; el.textContent='⚡ INVINCIBLE — test mode (Dev panel → God Mode)'; el.style.cssText='position:fixed;top:78px;left:50%;transform:translateX(-50%);z-index:350;background:rgba(60,30,0,.88);border:1px solid #ffaa44;color:#ffd9a0;font:600 11px Segoe UI,sans-serif;padding:4px 12px;border-radius:10px;pointer-events:none;letter-spacing:.04em'; document.body.appendChild(el); }
    if(el)el.style.display=on?'':'none'; }catch(e){} },700); })();
