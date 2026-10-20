// ═══════════════════════════════════════════════════════════════════════
// ║ 23b-sandbox-saga.js — round 55b. Kris: "we need to make new places in the sandbox to be able to access different parts of this saga to view them.
// ║ Make a button on "spirit saga" and then come up with key story arcs and milestones to get access to in the sandbox and include as buttons to
// ║ choose from, kind of like we made for the adventure sites. If things are built or wired yet, ok to include as buttons that don't do anything yet"
// ║ The saga (doc 28) as eight arcs, each a few rows of milestone buttons in the adventure-site style (a label, then 1–4 or named buttons). A built
// ║ milestone sets up what it needs (realms open, quests done, items in the pack) and takes you there; one not built yet is drawn dashed, says which
// ║ round it is planned for, and does nothing.
// ═══════════════════════════════════════════════════════════════════════
var SBSAGA={
  REALM:['','Grasslands','Wetlands','Highlands','Ashlands'],
  KEYS:['volcano_key_n','volcano_key_e','volcano_key_s','volcano_key_w'], VIDS:['volcano_n','volcano_e','volcano_s','volcano_w'],
  ws:function(){ var ws=typeof game!=='undefined'&&game.scene.getScene('World'); if(!ws||!ws.playerState||!ws.wd){ showNotif('Start or load a game first!','#ff4444'); return null; } return ws; },
  ps:function(ws){ var ps=ws.playerState; ps.completedQuests=ps.completedQuests||[]; ps.inventory=ps.inventory||[]; ps.spiritsFreed=ps.spiritsFreed||[]; return ps; },
  add:function(arr,v){ if(arr.indexOf(v)<0)arr.push(v); },
  // leave any site, close the panel, then act in the World a moment later (so nothing is paused)
  go:function(fn){ closeModal('saga'); closeModal('sandbox'); try{ if(typeof FairyTalk!=='undefined')FairyTalk.close(); }catch(e){} try{ if(typeof _pauseSync==='function')_pauseSync(); }catch(e){}      /* the panel paused the game: resume first */
    var ws=SBSAGA.ws(); if(!ws)return;
    setTimeout(function(){      // the resume lands on the next game step; only then can a site be left (stopping a paused scene that is about to resume leaves it running)
      try{ if(typeof _sbStopAdventure==='function')_sbStopAdventure(); }catch(e){}
      ['Dungeon','VolcanoMaze','VolcanoBulletHell','VolcanoPuzzle','VolcanoEscape'].forEach(function(k){ try{ if(game.scene.isActive(k)||game.scene.isPaused(k))game.scene.stop(k); }catch(e){} });
      try{ if(game.scene.isSleeping('World'))game.scene.wake('World'); if(game.scene.isPaused('World'))game.scene.resume('World'); document.getElementById('hud').style.display=''; document.getElementById('dungeon-hud').style.display='none'; }catch(e){}
      setTimeout(function(){ try{ fn(ws,SBSAGA.ps(ws)); }catch(e){ console.warn('saga sandbox',e); showNotif('That milestone hit a snag: '+e.message,'#ff6666'); } },250); },150); },
  tp:function(ws,x,y){ ws.player.x=x; ws.player.y=y; ws.player.cont.setPosition(x,y); if(ws.cameras&&ws.cameras.main)ws.cameras.main.centerOn(x,y); },
  open:function(ws,ps,qs){ qs.forEach(function(q){ SBSAGA.add(ps.unlockedSections=ps.unlockedSections||[1],q); }); if(typeof _wgApplyGates==='function')_wgApplyGates(ws.wd,ps); },
  // gems are given silently here (the great spirits' talks would otherwise queue up and pause the game)
  quiet:function(ps){ ps.soulGems=ps.soulGems||{}; for(var q=1;q<=4;q++)if(ps.completedQuests.indexOf('s'+q+'_dungeon')>=0&&!ps.soulGems[q]){ ps.soulGems[q]=1; SBSAGA.add(ps.inventory,ZMIRA.GEM[q]); } },
  revis:function(s){ var V=s._v; if(!V)return; ['stone','sp','lbl','gang'].forEach(function(k){ if(V[k]&&V[k].destroy)V[k].destroy(); }); if(V.tw)V.tw.stop(); s._v=null; },
  // ── I. the bindstones ──
  stone:function(q){ SBSAGA.go(function(ws,ps){ SBSAGA.open(ws,ps,[q]); var S=ZSPIRIT.shrines(ws).filter(function(s){ return s.q===q; }), s=S.find(function(s){ return !ZSPIRIT.freed(ps,s.id); });
    if(!s){ showNotif('All ten of the '+SBSAGA.REALM[q]+'\' spirits are free — taking you to one of their stones.','#9fe8ff'); s=S[0]; } if(!s)return;
    SBSAGA.tp(ws,s.x+180,s.y+70); showNotif('⛓ The bindstone of '+s.zname+' — '+s.spirit+' digs in chains. Walk closer and the Binder rises.','#9fe8ff'); }); },
  freeTen:function(q){ SBSAGA.go(function(ws,ps){ SBSAGA.open(ws,ps,[q]); var n=0; ZSPIRIT.shrines(ws).filter(function(s){ return s.q===q; }).forEach(function(s){ if(ZSPIRIT.freed(ps,s.id))return; ZSPIRIT.paid(ps); ps.spiritsFreed.push(s.id); ps.inventory.push('soulglass_'+s.q); ps.shardsGiven.push(s.id); s._won=true; SBSAGA.revis(s); n++; });
    if(ws._emitUI)ws._emitUI(); showNotif('✨ '+n+' spirits of the '+SBSAGA.REALM[q]+' freed — '+n+' Soulglass shards in your pack.','#9fe8ff'); }); },
  // ── II. the Green ──
  green:function(n){ SBSAGA.go(function(ws,ps){ var S=ZSPIRIT.shrines(ws), by=[[],[],[],[],[]]; S.forEach(function(s){ by[s.q].push(s); }); var L=[]; for(var i=0;i<10;i++)for(var q=1;q<=4;q++)if(by[q][i])L.push(by[q][i]);      // the realms in turn
    ZSPIRIT.paid(ps); ps.spiritsFreed=L.slice(0,n).map(function(s){ return s.id; }); ZSPIRIT.shards(ws,ps,S);      /* round 64d: each spirit freed here pays its own realm's shard */ S.forEach(function(s){ SBSAGA.revis(s); s._won=ps.spiritsFreed.indexOf(s.id)>=0; }); if(typeof ZGREEN!=='undefined')ZGREEN.clear(ws);
    SBSAGA.tp(ws,CENTER_X*TILE+16,(CENTER_Y+11)*TILE); showNotif('🌿 The Runestone Green with '+n+' freed spirits — they wander, and meet in groups ('+Math.min(4,Math.floor(n/7))+' at a time).','#9fe8ff'); }); },
  // ── III. Sólveig and the Glimmerhall ──
  glimmer:function(q){ SBSAGA.go(function(ws,ps){ SBSAGA.add(ps.completedQuests,'s1_harbor'); if(q){ for(var i=0;i<ZSPIRIT.NEED;i++)ps.inventory.push('soulglass_'+q); }
    setTimeout(function(){ var D=ZSPIRIT.door(); if(D){ SBSAGA.tp(ws,D.x,D.y+TILE*1.2); showNotif(q?'✨ '+ZSPIRIT.NEED+' Soulglass shards of the '+SBSAGA.REALM[q]+' in your pack — [Tab] at the Glimmerhall\'s door and Sólveig fuses them.':'✨ The Glimmerhall stands on the green — [Tab] at its door for Sólveig.','#9fe8ff'); } else showNotif('The Glimmerhall has not risen yet — try again in a moment.','#ffb070'); },1800); }); },
  // ── IV. Mira's workshop ──
  mira:function(){ SBSAGA.go(function(ws,ps){ ps.castlesDone=ps.castlesDone||[]; if(!ps.castlesDone.length&&typeof CASTLE_ISLANDS!=='undefined')ps.castlesDone.push(Object.keys(CASTLE_ISLANDS)[0]); ps.rescued=ps.rescued||[]; [1,2].forEach(function(q){ SBSAGA.add(ps.rescued,q); });
    setTimeout(function(){ var D=ZMIRA.door(); if(D){ SBSAGA.tp(ws,D.x,D.y+TILE*1.2); showNotif('⚙ Mira\'s workshop is open — [Tab] at the door.','#ffd890'); } else showNotif('The workshop has not been built yet — try again in a moment.','#ffb070'); },1800); }); },
  gem:function(q){ SBSAGA.go(function(ws,ps){ SBSAGA.add(ps.completedQuests,'s'+q+'_dungeon'); ps.soulGems=ps.soulGems||{}; if(ps.soulGems[q]){ ps.inventory.push(ZMIRA.GEM[q]); showNotif('💎 '+ITEMS[ZMIRA.GEM[q]].name+' added (the great spirit already spoke).','#9fe8ff'); return; } ZMIRA.gems(ws); }); },
  metal:function(q){ SBSAGA.go(function(ws,ps){ ps.inventory.push(ZMIRA.METAL[q]); if(ws._emitUI)ws._emitUI(); showNotif('⛏ '+((ITEMS[ZMIRA.METAL[q]]||{}).name||ZMIRA.METAL[q])+' from the '+ZMIRA.ISLE[q]+' trader, in your pack.','#ffd890'); }); },
  tray:function(q){ SBSAGA.go(function(ws,ps){ ps.inventory.push(ZMIRA.TRAY(q)); if(ws._emitUI)ws._emitUI(); showNotif('🔥 '+((ITEMS[ZMIRA.TRAY(q)]||{}).name||'Hearth tray')+' in your pack.','#ffd890'); }); },
  // ── V. the forges ──
  rise:function(ws,ps){ ['s1_dungeon','s2_dungeon','s3_dungeon','s4_dungeon','s1_tower','s2_tower','s3_tower','s4_tower'].forEach(function(k){ SBSAGA.add(ps.completedQuests,k); }); ps.rescued=ps.rescued||[]; [1,2,3,4].forEach(function(q){ SBSAGA.add(ps.rescued,q); });
    SBSAGA.quiet(ps); SBSAGA.open(ws,ps,[1,2,3,4]); },
  risen:function(ws){ return (ws.wd.sites||[]).some(function(s){ return s.id==='volcano_n'; }); },
  forgesRise:function(){ SBSAGA.go(function(ws,ps){ SBSAGA.rise(ws,ps); setTimeout(function(){ var d=typeof _volcanoSiteDefs==='function'&&_volcanoSiteDefs().find(function(d){ return d.id==='volcano_n'; }); if(d&&typeof _sbTeleportTo==='function')_sbTeleportTo(d.tx+1,d.ty+4);      /* round 64d: in front of the (now solid) forge, by its door */
      showNotif('🌋 The forges have risen — the Ember Forge is before you (the others open with the key of the one before).','#ffb070'); },2600); }); },
  forge:function(i,floor){ SBSAGA.go(function(ws,ps){ var vid=SBSAGA.VIDS[i], F=ZFORGE.F[vid], first=!SBSAGA.risen(ws); SBSAGA.rise(ws,ps); for(var j=0;j<i;j++)SBSAGA.add(ps.inventory,SBSAGA.KEYS[j]); ps.forgesDone=ps.forgesDone||[]; for(j=0;j<i;j++)SBSAGA.add(ps.forgesDone,SBSAGA.VIDS[j]);
    setTimeout(function(){ ZFORGE.enter(ws,vid,floor-1); showNotif('🔥 The '+F.name+' — '+ZFORGE.HALLS[floor-1]+(floor===4?': the forge-master and the hearth.':'.'),'#ffb070'); },first?2600:300); }); },
  musp:function(f,kit){ SBSAGA.go(function(ws,ps){ var first=!SBSAGA.risen(ws); SBSAGA.rise(ws,ps); SBSAGA.KEYS.forEach(function(k){ SBSAGA.add(ps.inventory,k); }); ps.forgesDone=ps.forgesDone||[]; SBSAGA.VIDS.forEach(function(v){ SBSAGA.add(ps.forgesDone,v); });
    if(kit){ SBSAGA.add(ps.inventory,'sov_staff'); [1,2,3,4].forEach(function(q){ SBSAGA.add(ps.inventory,'heartglass_'+q); }); }
    setTimeout(function(){ ZMUSP.enter(ws,f); },first?2600:200); }); },
  kit:function(i){ SBSAGA.go(function(ws,ps){ var q=i+1; ps.inventory.push('soulglass_lattice_'+q,'hearth_tray_'+q); if(ws._emitUI)ws._emitUI(); showNotif('🧰 '+ZFORGE.F[SBSAGA.VIDS[i]].name+' hearth kit: its Soulglass Lattice and Hearth Tray, in your pack.','#ffd890'); }); },
  // ── Ⅶ. the collapse and the Bifröst (round 59, 16d/16e) ──
  esc:function(step){ SBSAGA.go(function(ws,ps){ var first=!SBSAGA.risen(ws); SBSAGA.rise(ws,ps); SBSAGA.KEYS.forEach(function(k){ SBSAGA.add(ps.inventory,k); }); ps.forgesDone=ps.forgesDone||[]; SBSAGA.VIDS.forEach(function(v){ SBSAGA.add(ps.forgesDone,v); });
    if(ps.inventory.indexOf('lodestar')<0&&!(ps.equip&&ps.equip.mWeapon==='lodestar'))ps.inventory.push('lodestar'); ps.muspFreed=ps.muspFreed||[]; ZMUSP.spiritsFor(0).forEach(function(S){ SBSAGA.add(ps.muspFreed,S.id); });
    setTimeout(function(){ var d=_volcanoSiteDefs().find(function(v){ return v.type==='volcano_main'; }), N=ZASG.notchAt();
      if(step==='climb'){ ps.muspSunk=0; ZESC.begin(ws); return; }
      if(step==='cw'){ if(ps.muspSunk){ showNotif('Muspelheim has already sunk in this game.','#ffb070'); return; } ps.muspEsc=2; if(d)SBSAGA.tp(ws,(d.tx+1.5)*TILE,(d.ty+3.2)*TILE); setTimeout(function(){ ZESC.causeway(ws); },300); return; }
      if(step==='sink'){ ps.muspEsc=3; var an=ws.wd.volcanoAnchors&&ws.wd.volcanoAnchors.volcano_main; if(an&&!ps.muspSunk)SBSAGA.tp(ws,an.x*TILE+16,an.y*TILE+16); ZESC.sink(ws); return; }
      ps.muspEsc=3; ps.muspSunk=1; ps.asgardDown=1; ZESC.sinkTerrain(ws); ZASG.carve(ws); N=ZASG.notchAt();
      if(step==='notch'){ if(N)SBSAGA.tp(ws,N.x-TILE,N.y); showNotif('🌟 The end of the pier — [Tab] the notch to set the Lodestar in it.','#fff2b0'); return; }
      if(step==='gods'){ ps.bifrost=1; ps.godsbane=1; ZASG.road(ws,false); ps.equip=ps.equip||{}; var i=ps.inventory.indexOf('lodestar'); if(i>=0){ if(ps.equip.mWeapon)ps.inventory.push(ps.equip.mWeapon); ps.inventory.splice(i,1); ps.equip.mWeapon='lodestar'; }
        var P=ZASG.plan(ws); if(P.gate&&N)SBSAGA.tp(ws,(N.x+P.gate[0]*TILE+16)/2,(N.y+P.gate[1]*TILE+16)/2); ZGODS.slot(); if(ws._emitUI)ws._emitUI(); showNotif('✦ On the Bifröst, the Lodestar in hand — press V for Godsbane.','#fff2b0'); } },first?2600:300); }); },
  // round 64e (Kris: "for the sandbox, we need to add buttons for giving the lodestone, as well as for each of the forged glass pieces"): single items
  give:function(id){ SBSAGA.go(function(ws,ps){ ps.inventory=ps.inventory||[]; if(id==='lodestar'&&(ps.inventory.indexOf('lodestar')>=0||(ps.equip&&ps.equip.mWeapon==='lodestar'))){ showNotif('🌟 You already carry the Lodestar.','#fff2b0'); return; }
    ps.inventory.push(id); if(typeof Tome!=='undefined'&&Tome.see)try{ Tome.see('item',id); }catch(e){} if(ws._emitUI)ws._emitUI(); showNotif('🎁 '+((ITEMS[id]&&ITEMS[id].name)||id)+' — in your pack.','#fff2b0'); }); },
  // round 64e: Asgard's floors, Solmyrk and the rune circle, from the panel (the Bifröst stood, Godsbane learned, the Lodestar in hand)
  asg:function(kind,f){ SBSAGA.esc('gods'); setTimeout(function(){ var ws=SBSAGA.ws(), ps=ws&&ws.playerState; if(!ws)return;
    if(kind==='floor')ZCIT.enter(ws,f); else if(kind==='circle'){ ps.grimnirDown=1; ps.spiritsHome=0; var H=ZASG.heart(ws); SBSAGA.tp(ws,H.x,H.y+TILE*2); showNotif('🌟 Solmyrk has fallen — the rune circle at Asgard\'s heart: [Tab] with the Lodestar in hand.','#fff2b0'); }
    else if(kind==='city'){ var P=ZASG.plan(ws); if(P.gate)SBSAGA.tp(ws,P.gate[0]*TILE+16,P.gate[1]*TILE+16-TILE*2); } },3400); },
  // ── the panel ──
  todo:function(what,round){ showNotif('🚧 '+what+' — not built yet (planned for round '+round+', doc 28).','#ffcc66'); },
  ARCS:function(){ var B=function(t,f,tip){ return {t:t,f:f,tip:tip}; }, T=function(t,what,r){ return {t:t,todo:[what,r]}; }, Q=function(f,tip){ return [1,2,3,4].map(function(q){ return B(String(q),function(){ f(q); },tip?tip(q):SBSAGA.REALM[q]); }); };
    return [
      {n:'Ⅰ',name:'The Bindstones',col:'#9fe8ff',sub:'forty spirits in chains, ten per realm, each held by a Binder',rows:[
        {l:'⛓ Bindstone',b:Q(SBSAGA.stone,function(q){ return 'Go to an unfreed bindstone in the '+SBSAGA.REALM[q]+' — come close and its Binder rises'; })},
        {l:'✨ Free all ten',b:Q(SBSAGA.freeTen,function(q){ return 'Free every spirit of the '+SBSAGA.REALM[q]+' (their shards go to your pack)'; })} ]},
      {n:'Ⅱ',name:'The Runestone Green',col:'#9fe8a8',sub:'the freed spirits wander the green and meet in groups',rows:[
        {l:'🌿 Freed',b:[10,20,30,40].map(function(n){ return B(String(n),function(){ SBSAGA.green(n); },n+' spirits freed, taken to the Green'); })} ]},
      {n:'Ⅲ',name:'Sólveig & the Glimmerhall',col:'#bfe8ff',sub:'the Glasswright fuses six shards into a realm\'s Soulglass Lattice',rows:[
        {l:'🏛 Glimmerhall',b:[B('Go',function(){ SBSAGA.glimmer(0); },'The Glimmerhall rises (a harbour quest done) — to its door')]},
        {l:'🔷 6 shards →',b:Q(SBSAGA.glimmer,function(q){ return ZSPIRIT.NEED+' Soulglass shards of the '+SBSAGA.REALM[q]+', then to Sólveig'; })} ]},
      {n:'Ⅳ',name:'Mira\'s workshop',col:'#ffd890',sub:'soul gems, island metals and the hearth trays',rows:[
        {l:'⚙ Workshop',b:[B('Go',SBSAGA.mira,'The workshop opens (a castle cleared) — to Mira\'s door')]},
        {l:'💎 Soul gem',b:Q(SBSAGA.gem,function(q){ return 'Win the '+SBSAGA.REALM[q]+' boss dungeon: its great spirit gives the '+ZMIRA.GEM[q]; })},
        {l:'⛏ Metal',b:Q(SBSAGA.metal,function(q){ return 'The '+ZMIRA.ISLE[q]+' trader\'s metal'; })},
        {l:'🔥 Hearth tray',b:Q(SBSAGA.tray,function(q){ return 'Mira\'s tray for the '+ZMIRA.FORGE[q]+' Forge'; })} ]},
      {n:'Ⅴ',name:'The Forges of Muspelheim',col:'#ffaa66',sub:'three floors each: the old challenge, the spirit galleries, the forge-master and the hearth',rows:[
        {l:'🌋 The forges rise',b:[B('Go',SBSAGA.forgesRise,'Four boss dungeons + four builders\' towers done — to the Ember Forge')]}].concat(['Ember','Cinder','Slag','Ash'].map(function(nm,i){ return {l:'🔥 '+nm,b:[
          B('1',function(){ SBSAGA.forge(i,1); },'Floor 1 — the Mouth (the forge\'s own monsters)'), B('2',function(){ SBSAGA.forge(i,2); },'Floor 2 — the spirit galleries (five chained spirits)'), B('3',function(){ SBSAGA.forge(i,3); },'Floor 3 — the deep workings (five more spirits)'),
          B('4 ☠',function(){ SBSAGA.forge(i,4); },'Floor 4 — the hearth hall: the forge-master and the hearth'), B('kit',function(){ SBSAGA.kit(i); },'Its lattice and tray, for the hearth')]}; }))},
      {n:'Ⅵ',name:'Muspelheim',col:'#ff7a5a',sub:'four halls of trial, then Surtharn\'s throne and the great hearth',rows:[
        {l:'🏔 Halls',b:ZMUSP.HALLS.map(function(nm,f){ return B(String(f+1)+(f===4?' ☠':''),function(){ SBSAGA.musp(f); },nm); })},
        {l:'👹 Surtharn',b:[B('Fight',function(){ SBSAGA.musp(4); },'Surtharn, Tyrant of Muspelheim — six phases')]},
        {l:'⭐ The Lodestar',b:[B('Kit',function(){ SBSAGA.musp(4,true); },'The throne, with the Sovereign staff and the four Heartglasses in your pack — beat Surtharn, then [Tab] the great hearth')]},
        {l:'🎁 Give',b:[B('Lodestar',function(){ SBSAGA.give('lodestar'); },'The Lodestar, in your pack'),B('Staff',function(){ SBSAGA.give('sov_staff'); },'The Sovereign staff, in your pack')].concat([1,2,3,4].map(function(q){ return B('💎'+q,function(){ SBSAGA.give('heartglass_'+q); },'The '+((ITEMS['heartglass_'+q]||{}).name||('Heartglass '+q))+' (the '+['','Ember','Cinder','Slag','Ash'][q]+' Forge\'s hearth)'); }))} ]},
      {n:'Ⅶ',name:'The Collapse & the Bifröst',col:'#c8a8ff',sub:'the escape, the sinking causeway, Asgard descends',rows:[
        {l:'🏃 Collapse',b:[B('Escape',function(){ SBSAGA.esc('climb'); },'The Lodestar made: Muspelheim falls — five collapsing floors, one timer'),B('Causeway',function(){ SBSAGA.esc('cw'); },'Out of the gate: the causeway sinks behind you')]},
        {l:'🌈 Bifröst',b:[B('Asgard descends',function(){ SBSAGA.esc('sink'); },'On the mainland: Muspelheim sinks, Asgard comes down onto Mirror Lake'),B('Pier notch',function(){ SBSAGA.esc('notch'); },'Asgard on the lake, the Lodestar in your pack, at the end of the pier — [Tab] the notch'),B('Godsbane',function(){ SBSAGA.esc('gods'); },'The Bifröst stands; Godsbane learned, the Lodestar in hand — on the bridge (press V)')]} ]},
      {n:'Ⅷ',name:'Asgard',col:'#fff0a8',sub:'four floors, Solmyrk, the rune circle, the end',rows:[
        {l:'🏰 The city',b:[B('Gate',function(){ SBSAGA.asg('city'); },'Inside Asgard\'s gate, the golden roads before you (the Lodestar in hand)')]},
        {l:'🏛 Floors',b:[1,2,3,4].map(function(f){ return B(String(f),function(){ SBSAGA.asg('floor',f-1); },'The citadel, floor '+f+' — '+ZCIT.HALLS[f-1]); })},
        {l:'🎭 Solmyrk',b:[B('Fight',function(){ SBSAGA.asg('floor',4); },'Solmyrk, the Black Sun, on his throne')]},
        {l:'🕯 The end',b:[B('Rune circle',function(){ SBSAGA.asg('circle'); },'Solmyrk fallen: the rune circle at the heart of Asgard — Godsbane into the sky, the Bifröst remade into heaven')]} ]},
      // round 71 (Kris: "for all of these added moments, add them as options in the sandbox for the spirit saga"): the last saga, doc 30 §15
      {n:'Ⅸ',name:'The last saga',col:'#ffe6a0',sub:'the feast hall, Odin and Freya, the village moment, the celebration, the credits',rows:[
        {l:'👁 Glimpses',b:[B('30th',function(){ SBSAGA.last('glimpse','orbs'); },'The 30th spirit: two orbs in the dark (the panel)'),B('40th',function(){ SBSAGA.last('glimpse','tattoo'); },'The 40th spirit: the whole tattoo seen from the sky (the panel)')]},
        {l:'🏛 Feast hall',b:[B('Doors',function(){ SBSAGA.last('doors'); },'Solmyrk has just fallen: the citadel shakes, and golden doors open behind the high seat ([Tab] at them)'),B('Orbs',function(){ SBSAGA.last('hall'); },'Inside the feast hall, the gods still bound in the joined orbs — the Lodestar in hand: [Tab] at the orbs'),
          B('Free',function(){ SBSAGA.last('free'); },'The feast hall after the orbs burst: Odin and Freya stand free — [Tab] for the truth about the twins')]},
        {l:'🌈 The Bifröst',b:[B('With the gods',function(){ SBSAGA.last('circle'); },'The gods free: the rune circle — Godsbane into the sky, the Bifröst, the gods lead the spirits home, then the village')]},
        {l:'🏡 The village',b:[B('Lightning & vines',function(){ SBSAGA.last('village'); },'At the village centre: Odin\'s lightning, Freya\'s vines, the land turning green, the celebration, the credits'),
          B('Celebration',function(){ SBSAGA.last('celebrate'); },'The celebration of the twins, time passing, children born again (the panels)')]},
        {l:'🎞 Credits',b:[B('Credits',function(){ SBSAGA.last('credits'); },'The credits over the painted backdrop, then the last picture'),B('Free roam',function(){ SBSAGA.last('roam'); },'After the end: the land green, the hamlets and their children, free roam')]} ]} ]; },
  // round 71: the last saga's moments
  last:function(kind,k){ if(kind==='glimpse'){ SBSAGA.go(function(ws,ps){ ZLS.play(ps,k); }); return; }
    if(kind==='doors'||kind==='hall'||kind==='free'||kind==='circle'){ SBSAGA.esc('gods'); setTimeout(function(){ var ws=SBSAGA.ws(), ps=ws&&ws.playerState; if(!ws)return; ps.grimnirDown=1; ps.spiritsHome=0;
        if(kind==='doors'){ ps.godsFree=0; ps.godsTold=0; ZCIT.enter(ws,4); setTimeout(function(){ var d=game.scene.getScene('Dungeon'); if(!d||!d._asgc)return; (d.monsters||[]).forEach(function(m){ if(m.isBoss&&m.cont){ m.dead=true; m.cont.destroy(); } }); d._bossDefeated=true; BossPhases&&BossPhases.hud&&BossPhases.hud(d,false); ZLS.play(ps,'fh_crumble',function(){ ZFEAST.door(d); }); },2600); return; }
        if(kind==='hall'){ ps.godsFree=0; ps.godsTold=0; ZFEAST.enter(ws,'World'); return; }
        if(kind==='free'){ ps.godsFree=1; ps.godsTold=0; ZFEAST.enter(ws,'World'); return; }
        ps.godsFree=1; ps.godsTold=1; var H=ZASG.heart(ws); SBSAGA.tp(ws,H.x,H.y+TILE*2); showNotif('🌟 The gods are free and waiting — [Tab] in the rune circle with the Lodestar.','#fff2b0'); },3400); return; }
    SBSAGA.go(function(ws,ps){ ps.grimnirDown=1; ps.godsFree=1; ps.godsTold=1;
      if(kind==='village'){ ps.spiritsHome=0; if(typeof ZCINE!=='undefined')ZCINE.bars(true); var L=[]; ZLS.village(ws,L,function(){ ZEND.finish(ws,L); }); return; }
      if(kind==='celebrate'){ ZLS.play(ps,'celebrate'); return; }
      if(kind==='credits'){ ZLS.credits(ps,function(){ ZLS.play(ps,'after'); }); return; }
      if(kind==='roam'){ ps.spiritsHome=1; ps.creditsSeen=1; if(ws._villageFolkInit)try{ ws._villageFolkInit(); }catch(e){} SBSAGA.tp(ws,(CENTER_X+0.5)*TILE,(CENTER_Y+5)*TILE); showNotif('🌅 After the end: Runeheim is green — the hamlets, their children, free roam.','#fff2b0'); } }); },
  show:function(){ if(!SBSAGA.ws())return; closeModal('sandbox'); var el=document.getElementById('modal-saga');
    if(!el){ el=document.createElement('div'); el.id='modal-saga'; el.className='overlay'; el.style.display='none'; el.onclick=function(e){ if(e.target===el)closeModal('saga'); }; document.body.appendChild(el); }
    var A=SBSAGA.ARCS(), H=[]; SBSAGA._fn=[];
    var btn=function(b,col){ if(b.todo){ var k=SBSAGA._fn.push(function(){ SBSAGA.todo(b.todo[0],b.todo[1]); })-1; return '<button class="sb-sec-btn sbs-todo" data-k="'+k+'" title="'+b.todo[0]+' — not built yet (round '+b.todo[1]+')">'+b.t+'</button>'; }
      var k2=SBSAGA._fn.push(b.f)-1; return '<button class="sb-sec-btn" data-k="'+k2+'" style="border-color:'+col+'66;color:'+col+'" title="'+(b.tip||'').replace(/"/g,'&quot;')+'">'+b.t+'</button>'; };
    A.forEach(function(a){ var built=a.rows.some(function(r){ return r.b.some(function(b){ return !b.todo; }); });
      H.push('<div class="sbs-arc"><div class="sbs-h" style="color:'+a.col+'"><span class="sbs-n">'+a.n+'</span>'+a.name+(built?'':' <span class="sbs-tag">not built yet</span>')+'<small>'+a.sub+'</small></div>'+
        a.rows.map(function(r){ return '<div class="sb-site-row"><div class="sb-site-lbl" style="color:'+a.col+';min-width:118px">'+r.l+'</div>'+r.b.map(function(b){ return btn(b,a.col); }).join('')+'</div>'; }).join('')+'</div>'); });
    el.innerHTML='<div class="modal sbs-modal" onclick="event.stopPropagation()"><div class="mhdr"><span>🔗 Spirit Saga <small style="color:#8aa0b8;font-weight:400">jump to any arc and milestone of the saga</small></span><button class="mcls" onclick="closeModal(\'saga\')">✕</button></div>'+
      '<div class="sbs-legend">Each milestone sets up what it needs (realms, quests, items) and takes you there. <span class="sbs-todo-k">Dashed</span> buttons are planned but not built yet.</div><div class="sbs-body">'+H.join('')+'</div></div>';
    el.querySelectorAll('button[data-k]').forEach(function(b){ b.onclick=function(){ var f=SBSAGA._fn[+b.dataset.k]; if(f)f(); }; });
    if(!document.getElementById('sbs-css')){ var st=document.createElement('style'); st.id='sbs-css'; st.textContent='.sbs-modal{width:min(640px,94vw);max-height:calc(100vh - 200px);margin-bottom:120px;display:flex;flex-direction:column}.sbs-body{overflow-y:auto;display:flex;flex-direction:column;gap:12px;padding-right:4px}'+
      '.sbs-arc{display:flex;flex-direction:column;gap:5px}.sbs-h{font-size:13px;font-weight:700;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}.sbs-h small{flex-basis:100%;font-weight:400;font-size:11px;color:#8aa0b8;margin-left:30px}'+
      '.sbs-n{display:inline-block;min-width:22px;text-align:center;opacity:.8}.sbs-tag{font-size:10px;font-weight:600;color:#ffcc66;border:1px dashed rgba(255,204,102,.5);border-radius:4px;padding:0 5px}'+
      '.sbs-todo{border-style:dashed!important;color:#778!important;border-color:rgba(255,255,255,.18)!important;background:transparent!important}.sbs-todo:hover{color:#ffcc66!important}'+
      '.sbs-legend{font-size:11px;color:#8aa0b8;margin:0 0 10px}.sbs-todo-k{border:1px dashed #778;border-radius:4px;padding:0 4px;color:#99a}'; document.head.appendChild(st); }
    el.style.display='flex'; }
};
function openSpiritSaga(){ SBSAGA.show(); }
