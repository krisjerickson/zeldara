// ═══════════════════════════════════════════════════════════════════════
// ║ 10x-mira.js — round 53, the spirit saga part 2 (docs/28-spirit-saga.md §3 steps 4–7; Kris's cards: "Keep them all", "Island trader, for
// ║ gold", Mira's workshop opens with the first castle cleared anywhere, four new soul gems from the dungeon-boss spirits).
// ║  · Soul gems — Grovesoul, Tidesoul, Stonesoul, Embersoul: when a realm's boss dungeon is won, the great spirit its boss held is freed and
// ║    gives that realm's gem (old saves that already won a dungeon get theirs the next time they are out in the world).
// ║  · Island metals — Sea-silver (Corsair Isle), Bog-iron (Bog Isle), Fire-bronze (Ember Isle), Rime-steel (Frost Isle), sold by each
// ║    familiar island's trader.
// ║  · Mira's workshop — her building in the village (from village stage 3) can be entered once any island castle is cleared: a workshop
// ║    interior (07v 'workshop') with Mira at her bench. She makes a realm's HEARTH TRAY from its metal and its soul gem — "it will hold
// ║    against the forge's heat". The tray and that realm's Soulglass lattice become its Heartglass at the forge's hearth (rounds 54–55).
// ║  · The journal lists all of it under "⚙ Mira's Hearth Trays".
// ═══════════════════════════════════════════════════════════════════════
var ZMIRA={ on:true, COST:150,
  REALM:['','Grasslands','Wetlands','Highlands','Ashlands'], FORGE:['','Ember','Cinder','Slag','Ash'],
  GEM:['','grovesoul','tidesoul','stonesoul','embersoul'], METAL:['','sea_silver','bog_iron','fire_bronze','rime_steel'],
  ISLE:['','Corsair Isle','Bog Isle','Ember Isle','Frost Isle'],
  // the great spirits the dungeon bosses held
  GREAT:['',{n:'Hildr of the Long Barrow',was:'the first queen of the Grasslands'},{n:'Ulfrun the Tide-Singer',was:'a ship-wife who sang the boats home'},{n:'Old Grimmar',was:'the stone-cutter who carved the first waystone'},{n:'Eldis Emberheart',was:'the last fire-keeper of the Ashlands'}],
  TRAY:function(q){ return 'hearth_tray_'+q; },
  has:function(ps,id){ return (ps.inventory||[]).indexOf(id)>=0; },
  take:function(ps,id){ var i=(ps.inventory||[]).indexOf(id); if(i>=0)ps.inventory.splice(i,1); return i>=0; },
  open:function(ps){ return ((ps&&ps.castlesDone)||[]).length>=1; },
  // ── soul gems: given once per won boss dungeon ──
  gems:function(ws){ var ps=ws.playerState; if(!ps||!ps.completedQuests)return; ps.soulGems=ps.soulGems||{};
    if(document.getElementById('fairy-talk')&&document.getElementById('fairy-talk').style.display!=='none')return;
    for(var q=1;q<=4;q++){ if(ps.soulGems[q]||ps.completedQuests.indexOf('s'+q+'_dungeon')<0)continue; ps.soulGems[q]=1; var gid=ZMIRA.GEM[q]; ps.inventory.push(gid); var G=ZMIRA.GREAT[q], I=ITEMS[gid];
      if(typeof Tome!=='undefined'&&Tome.see)try{ Tome.see('item',gid); }catch(e){}
      if(typeof ZSPIRIT!=='undefined'&&ZSPIRIT.talk)ZSPIRIT.talk(G.n,ZSPIRIT.COL,'<b>The chains are broken, '+heroName(ps)+'.</b> I was '+G.was+'. The '+ZMIRA.REALM[q]+'\' cruellest Binder kept me in the deep of his hold — the greatest of the spirits he caught.<br><br>Take this: <b>'+I.name+'</b>, the heart of the '+ZMIRA.REALM[q]+'. Mira the Mechanic will know what to do with it.',[{t:'I will take it to her'}],ZSPIRIT._drawSpirit(true));
      else showNotif('💎 '+G.n+' gives you the '+I.name+'!','#9fe8ff');
      if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('a soul gem'); }catch(e){} if(ws._emitUI)ws._emitUI(); return; } },
  // ── Mira's workshop door ──
  door:function(){ var g=typeof VR_EXTRA!=='undefined'&&VR_EXTRA.miraAt; if(!g)return null; return {x:(CENTER_X+g[0]+2)*TILE+16, y:(CENTER_Y+g[1]+g[3])*TILE+16}; },
  check:function(ws){ if(!ws.player)return false; var D=ZMIRA.door(), ps=ws.playerState; if(!D||Math.hypot(ws.player.x-D.x,ws.player.y-D.y)>TILE*1.6){ if(ws._interactPrompt&&ws._interactPrompt._zsp==='mira'){ ws._interactPrompt.destroy(); ws._interactPrompt=null; } return false; }
    var t=ZMIRA.open(ps)?'[Tab] Enter Mira\'s Workshop':'Mira\'s Workshop (shut)';
    if(!ws._interactPrompt||ws._interactPrompt._zsp!=='mira'){ if(ws._interactPrompt)ws._interactPrompt.destroy(); ws._interactPrompt=domText(ws,D.x,D.y-40,t,{fontSize:'10px',color:'#ffd890',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20); ws._interactPrompt._zsp='mira'; }
    if(Phaser.Input.Keyboard.JustDown(ws.keys.TAB)){ if(ZMIRA.open(ps))ws._enterBuilding({type:'workshop'});
      else showNotif('⚙ A note on Mira\'s door: "Off fixing the Highland lift. Clear one of the island castles and come and see me — I have a job for you."','#ffd890'); }
    return true; },
  // ── Mira at her bench ──
  talk:function(ws){ var ps=ws.playerState, rows='', btns=[], c=function(id){ return ZMIRA.has(ps,id); };
    for(var q=1;q<=4;q++){ var m=ZMIRA.METAL[q], g=ZMIRA.GEM[q], tr=ZMIRA.TRAY(q), done=c(tr)||((ps.traysMade||{})[q]);
      rows+='<div style="margin:3px 0">'+['','🌿','💧','⛰','🔥'][q]+' <b>'+ITEMS[tr].name+'</b>: '+(done?'<span style="color:#9fe8ff">made ✓</span>':(c(m)?'✓ ':'✗ ')+ITEMS[m].name+(c(m)?'':' <small>(the '+ZMIRA.ISLE[q]+' trader)</small>')+' · '+(c(g)?'✓ ':'✗ ')+ITEMS[g].name+(c(g)?'':' <small>(the '+ZMIRA.REALM[q]+' boss dungeon)</small>'))+'</div>';
      if(!done&&c(m)&&c(g))(function(q){ btns.push({t:'Make the '+ITEMS[ZMIRA.TRAY(q)].name+' ('+ZMIRA.COST+'g)',f:function(){ ZMIRA.make(ws,q); }}); })(q); }
    btns.push({t:'Farewell'});
    ZSPIRIT.talk('Mira the Mechanic','#ffd890','So you\'re '+heroName(ps)+'. Sólveig tells me you\'re making soulglass for the forges. Glass alone will melt in that heat — it needs a <b>hearth tray</b> under it. Bring me a realm\'s <b>metal</b> from its island trader and its <b>soul gem</b>, and I\'ll make that realm\'s tray.'+'<div style="margin-top:8px;font-size:11px">'+rows+'</div>',btns,ZMIRA._draw()); },
  make:function(ws,q){ var ps=ws.playerState, m=ZMIRA.METAL[q], g=ZMIRA.GEM[q]; if(ps.gold<ZMIRA.COST){ showNotif('Mira: "'+ZMIRA.COST+' gold for the coal and the moulds, I\'m afraid."','#ffb070'); return; }
    if(!ZMIRA.has(ps,m)||!ZMIRA.has(ps,g))return; ZMIRA.take(ps,m); ZMIRA.take(ps,g); ps.gold-=ZMIRA.COST; ps.inventory.push(ZMIRA.TRAY(q)); ps.traysMade=ps.traysMade||{}; ps.traysMade[q]=1;
    if(typeof ZSFX!=='undefined')try{ ZSFX.play('levelup'); }catch(e){}
    ZSPIRIT.talk('Mira the Mechanic','#ffd890','There — the <b>'+ITEMS[ZMIRA.TRAY(q)].name+'</b>, still warm. The '+ITEMS[g].name+' is set in its heart; it will hold against the '+ZMIRA.FORGE[q]+' Forge\'s heat. Lay your '+ZMIRA.FORGE[q]+' lattice in it at the forge\'s hearth.',[{t:'Thank you, Mira'}],ZMIRA._draw());
    if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('a hearth tray'); }catch(e){} if(ws._emitUI)ws._emitUI(); },
  _draw:function(){ return function(x,t){ try{ if(typeof CHX!=='undefined'&&CHX.drawTo&&CHX.drawTo(x,'crafts_2',48,92,88))return; }catch(e){}
      x.save(); x.translate(48,50+Math.sin(t*0.3)); x.fillStyle='#4a6a8a'; x.beginPath(); x.moveTo(-15,40); x.lineTo(-10,0); x.lineTo(10,0); x.lineTo(15,40); x.closePath(); x.fill(); x.fillStyle='#f0c8a0'; x.beginPath(); x.arc(0,-10,10,0,Math.PI*2); x.fill();
      x.fillStyle='#c84a20'; x.beginPath(); x.arc(0,-14,10,Math.PI,0); x.fill(); x.fillRect(8,-14,4,16); x.strokeStyle='#e8a030'; x.lineWidth=2; x.beginPath(); x.arc(-4,-12,3,0,Math.PI*2); x.arc(5,-12,3,0,Math.PI*2); x.stroke(); x.restore(); }; },
  questHTML:function(ps){ if(!ps)return ''; var h='<div class="qgrp" style="border:1px solid rgba(255,216,144,.35);background:rgba(60,40,10,.25);margin-bottom:14px"><div class="qgrp-hdr" style="color:#ffd890">⚙ Mira\'s Hearth Trays</div>';
    if(!ZMIRA.open(ps))h+='<div class="qitem"><div class="qico">🔒</div><div class="qinf"><div class="qtit">Mira\'s workshop is shut</div><div class="qdesc">Clear any island castle, then visit Mira\'s workshop in the village.</div></div></div>';
    for(var q=1;q<=4;q++){ if((ps.unlockedSections||[1]).indexOf(q)<0)continue; var tr=ZMIRA.TRAY(q), done=ZMIRA.has(ps,tr)||((ps.traysMade||{})[q]), m=ZMIRA.has(ps,ZMIRA.METAL[q]), g=ZMIRA.has(ps,ZMIRA.GEM[q]);
      h+='<div class="qitem '+(done?'qdone':'')+'"><div class="qico">'+['','🌿','💧','⛰','🔥'][q]+'</div><div class="qinf"><div class="qtit">'+ITEMS[tr].name+(done?' ✓':'')+'</div><div class="qdesc">'+(done?'Made — lay the '+ZMIRA.FORGE[q]+' lattice in it at the '+ZMIRA.FORGE[q]+' Forge\'s hearth.':(m?'✓':'✗')+' '+ITEMS[ZMIRA.METAL[q]].name+' (the '+ZMIRA.ISLE[q]+' trader) · '+(g?'✓':'✗')+' '+ITEMS[ZMIRA.GEM[q]].name+' (the '+ZMIRA.REALM[q]+' boss dungeon) · then Mira')+'</div></div></div>'; }
    return h+'</div>'; } };

// ── the items ──
(function(){ if(typeof ITEMS==='undefined')return; var R=ZMIRA.REALM, F=ZMIRA.FORGE;
  var GEMS=[null,['Grovesoul','💚','a green gem with a living leaf of light inside'],['Tidesoul','💙','a sea-blue gem in which a tiny wave rolls'],['Stonesoul','🤎','an amber gem with a slow heartbeat of stone-light'],['Embersoul','❤️','a red gem with an ember that never goes out']];
  var MET=[null,['Sea-silver','🥈',300,'bright silver that never tarnishes in salt'],['Bog-iron','⚙️',450,'dark iron drawn from the bogs, tough as roots'],['Fire-bronze','🥉',600,'red-gold bronze cast in the island\'s vents'],['Rime-steel','🔩',750,'blue-white steel quenched in glacier water']];
  for(var q=1;q<=4;q++){
    ITEMS[ZMIRA.GEM[q]]={name:GEMS[q][0],icon:GEMS[q][1],slot:'key',sell:0,tomeHint:'Given by the great spirit freed when you win the '+R[q]+'\' boss dungeon',desc:'The soul gem of the '+R[q]+': '+GEMS[q][2]+'. Mira sets it in the '+F[q]+' Hearth Tray.'};
    ITEMS[ZMIRA.METAL[q]]={name:MET[q][0],icon:MET[q][1],slot:'key',sell:0,buy:MET[q][2],tomeHint:'Sold by the trader on '+ZMIRA.ISLE[q],desc:MET[q][3]+'. Mira casts the '+F[q]+' Hearth Tray from it.'};
    ITEMS[ZMIRA.TRAY(q)]={name:F[q]+' Hearth Tray',icon:'🍽️',slot:'key',sell:0,tomeHint:'Made by Mira from '+MET[q][0]+' and the '+GEMS[q][0],desc:'A tray of '+MET[q][0]+' with the '+GEMS[q][0]+' set in its heart — it holds against the '+F[q]+' Forge\'s heat. Lay the '+F[q]+' Soulglass Lattice in it at the forge\'s hearth to make its Heartglass.'}; }
  // the familiar islands' traders sell their realm's metal (castle islands copy their realm's island, so they sell it too) — HARBOR_ISLANDS is declared further on
  setTimeout(function(){ if(typeof HARBOR_ISLANDS!=='undefined')for(var k=1;k<=4;k++){ var I=HARBOR_ISLANDS[k]; if(I&&I.shopItems&&I.shopItems.indexOf(ZMIRA.METAL[k])<0)I.shopItems.push(ZMIRA.METAL[k]); } },0);
})();

// ── Mira's workshop: the interior (07v) and Mira at her bench (11) ──
(function(){ if(typeof INTERIOR_THEMES==='undefined')return;
  INTERIOR_THEMES.workshop={name:'Mira\'s Workshop',npc:'crafts_2',wall:'boards',floor:'planks',wallA:'#7a6a54',wallB:'#5a4c3a',trim:'#c89048',floorA:'#8a6a48',floorB:'#5e4630',light:'#ffc870',rug:'#4a6a8a',rug2:'#e8a030',
    blurb:'Brass pipes along the timber walls, a gear turning by the window, blueprints pinned everywhere, a small smelting furnace with its crucible, moulds for trays, and Mira at her workbench with her goggles up.'};
  // her own pieces (painted in wave 54: if_crucible, if_traybench, iw_gears, iw_blueprints); drawn as their nearest kin until then
  if(typeof INT_PROPS!=='undefined'){ INT_PROPS.crucible=function(){ return INT_PROPS.forgehearth.apply(this,arguments); }; INT_PROPS.traybench=function(ctx,w,h,P,o){ return INT_PROPS.longtable(ctx,w,h,P,o||{}); };
    if(typeof INT_HT!=='undefined'){ INT_HT.crucible=INT_HT.forgehearth||88; INT_HT.traybench=INT_HT.longtable||48; } }
  if(typeof INT_WALLDECO!=='undefined'){ INT_WALLDECO.gears=INT_WALLDECO.gears||INT_WALLDECO.clock; INT_WALLDECO.blueprints=INT_WALLDECO.blueprints||INT_WALLDECO.painting; }
  INTERIOR_LAYOUTS.workshop={ deco:[['tools',1.3,3.4],['gears',5,1.6],['window',7.2,1],['blueprints',9.2,1.8],['shelf2',11.2,1.8,'jars']], rug:[5,6,4,2], npc:[8,4.3],
    props:[['crucible',1,2,3,1],['anvil',4,4,1,1],['traybench',6,3,4,1,{top:['scales','candle','jar']}],['rack',11,3,2,1,{items:'mixed'}],['crates',1,6,2,1],['chest',11,6,1,1],['barrel',12,6,1,1,{water:true,col:'#5a4a3a'}],['maptable',8,6,2,1]],
    lights:[[2.5,2.6,170,0.45,{flicker:0.3}],[7,3,120,0.3,{pulse:0.12}]], particles:'sparks', dark:0.05 };
  if(typeof INTERIOR_TYPES!=='undefined'&&INTERIOR_TYPES.indexOf('workshop')<0)INTERIOR_TYPES.push('workshop');
  if(typeof CHAR_NPC_FOR_BUILDING!=='undefined')CHAR_NPC_FOR_BUILDING.workshop='crafts_2';
  setTimeout(function(){ if(typeof BuildingScene!=='undefined'){ var ni=BuildingScene.prototype._npcInteract; BuildingScene.prototype._npcInteract=function(){ if(this.building&&this.building.type==='workshop')return ZMIRA.talk(this.worldScene); return ni.apply(this,arguments); };
    var ci=BuildingScene.prototype._checkBuildingInteraction; BuildingScene.prototype._checkBuildingInteraction=function(){ var r=ci.apply(this,arguments); if(this.building&&this.building.type==='workshop'&&this.interactPrompt&&this.interactPrompt.visible)this.interactPrompt.setText('[Tab] Talk to Mira'); return r; }; } },0);      // BuildingScene is declared further on
})();

// ── hooks: the world's [Tab], the journal, the tick ──
(function(){ if(typeof WorldScene==='undefined')return; var c0=WorldScene.prototype._checkInteraction; if(c0)WorldScene.prototype._checkInteraction=function(){ if(ZMIRA.on&&ZMIRA.check(this))return; return c0.apply(this,arguments); };
  if(typeof ZROLL!=='undefined'&&ZROLL.questHTML){ var q0=ZROLL.questHTML; ZROLL.questHTML=function(ps){ return q0.apply(ZROLL,arguments)+ZMIRA.questHTML(ps); }; }
  var wb0=WorldScene.prototype._enterBuilding; if(wb0)WorldScene.prototype._enterBuilding=function(b){ if(b&&b.type==='workshop'&&typeof Tome!=='undefined'){ try{ Tome.see('character','crafts_2'); }catch(e){} } return wb0.apply(this,arguments); };
})();
setInterval(function(){ try{ var ws=game.scene.getScene('World'); if(!ws||!ws.playerState||!ws.player||!game.scene.isActive('World'))return; ZMIRA.gems(ws); }catch(e){ if(!ZMIRA._err){ ZMIRA._err=1; console.warn('mira',e); } } },1500);
