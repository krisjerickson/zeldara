// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 45 — SITE REVIEW tab: every adventure site as the game now builds it, floor by floor (Kris, bedtime card: "Lab page reviewing
// ║ all 53 built designs" → yes). Sites whose pick repeated another's design type keep their own original layout (07zx ZSP.OLD — Kris:
// ║ "For any new site that I chose that is similar to another i had chose ... substitute it with the old adventure site designs. However,
// ║ towers need to be larger floors overall"); those are marked OLD and drawn at their new, larger size (07b TOWER_GROW).
// ║ One card per site: every floor, ▲ where you arrive, ▼ the way on. ☆ Pick = "this one is good"; the notes box is for changes.
// ║ Picks / notes: 'sreview-<design id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZSP==='undefined')return; LBR.TABS.push('sreview');
  // the game's sites: design id → [game site id, type, old design, floors, label]  (from the game's world, round 45)
  var G={silverwood:['s1_tower','tower','silverwood',5],sunken_courtyard:['s1_dungeon','dungeon','sunken_courtyard',5],elven_library:['s1_b_elven_library','tower','elven_library',4],
    hyrule_keep:['s1_b_hyrule_keep','tower','hyrule_keep',5],mushroom_forest:['s1_b_mushroom_forest','dungeon','mushroom_forest',4],mage_rime_spire:['mage_rime_spire','tower','frost_spire',2],
    mage_scriptorium:['mage_scriptorium','tower','floating_library',2],mage_hearthfire:['mage_hearthfire','tower','sorcerers_apothecary',2],mage_rootspire:['mage_rootspire','tower','druid_grove_spire',2],
    frost_cathedral:['s2_tower','tower','frost_cathedral',6],lake_ring:['s2_dungeon','dungeon','lake_ring',6],moonglass:['s2_b_moonglass','tower','moonglass',5],
    crystal_grotto:['s2_b_crystal_grotto','dungeon','crystal_grotto',6],root_hollow:['s2_b_root_hollow','dungeon','root_hollow',5],mage_conductor:['mage_conductor','tower','storm_rod_tower',3],
    mage_frozen_belfry:['mage_frozen_belfry','tower','frost_spire',3],mage_mire_tower:['mage_mire_tower','tower','witch_hollow',3],mage_drowned_lighthouse:['mage_drowned_lighthouse','tower','tidal_aquarium',3],
    observatory:['s3_tower','tower','observatory',7],bone_pit:['s3_dungeon','dungeon','bone_pit',7],sky_cloister:['s3_b_sky_cloister','tower','sky_cloister',6],rivendell:['s3_b_rivendell','tower','rivendell',7],
    pillared_hall:['s3_b_pillared_hall','dungeon','pillared_hall',6],mage_ember_observatory:['mage_ember_observatory','tower','astral_observatory',3],mage_hollow_spire:['mage_hollow_spire','tower','void_rift_hall',3],
    mage_lightning_rod:['mage_lightning_rod','tower','storm_rod_tower',3],mage_monolith:['mage_monolith','tower','runic_scriptorium',3],dawn_sanctum:['s4_tower','tower','dawn_sanctum',8],
    lava_archipelago:['s4_dungeon','dungeon','lava_archipelago',8],reflecting_hall:['s4_b_reflecting_hall','tower','reflecting_hall',7],boulder_field:['s4_b_boulder_field','dungeon','boulder_field',8],
    spiral_chasm:['s4_b_spiral_chasm','dungeon','spiral_chasm',7],mage_frostbitten_crown:['mage_frostbitten_crown','tower','crystal_conservatory',4],mage_rift_tower:['mage_rift_tower','tower','void_rift_hall',4],
    mage_crimson_spire:['mage_crimson_spire','tower','blood_moon_chapel',4],mage_astral_spire:['mage_astral_spire','tower','dreaming_loft',4],
    castle_q1_b:['isl_castle_q1_b','tower','thornwood_keep',2],castle_q1_c:['isl_castle_q1_c','tower','sunflower_chateau',2],castle_q1_d:['isl_castle_q1_d','tower','windmill_bastion',2],
    castle_q2_b:['isl_castle_q2_b','tower','lotus_palace',3],castle_q2_c:['isl_castle_q2_c','tower','drowned_abbey',3],castle_q2_d:['isl_castle_q2_d','tower','mangrove_fort',3],
    castle_q3_b:['isl_castle_q3_b','tower','dwarven_hold',3],castle_q3_c:['isl_castle_q3_c','tower','glacier_citadel',3],castle_q3_d:['isl_castle_q3_d','tower','eyrie_castle',3],
    castle_q4_b:['isl_castle_q4_b','tower','obsidian_bastille',4],castle_q4_c:['isl_castle_q4_c','tower','ember_sanctum',4],castle_q4_d:['isl_castle_q4_d','tower','bone_throne_keep',4],
    isle_1:['isl_adv_1','dungeon','lake_ring',4],isle_2:['isl_adv_2','dungeon','mushroom_forest',4],isle_3:['isl_adv_3','dungeon','ember',4],ember_cave:['isl_adv_3','dungeon','ember',4],isle_4:['isl_adv_4','dungeon','moonglass',5]};
  var QN=['','Grasslands','Wetlands','Highlands','Ashlands'], TN={tower:'Towers',dungeon:'Dungeons',mage:'Mage towers',castle:'Island castles',isle:'Island crypts',ember:'Ember Cave'};
  var IDS=Object.keys(ZSP.T).filter(function(id){ return G[id]; }), CACHE={}, cur=null;
  function nameOf(id){ var s=ZSP.zsdSite(id); return s?s.name:id; }
  function typeOf(id){ var s=ZSP.zsdSite(id); return s?s.type:'tower'; }
  // the floors the game builds for one site: [{m, label}]  (old designs through the game's own old builder, at the larger size)
  function floors(id){ if(CACHE[id])return CACHE[id]; var g=G[id], nf=g[3], out=[], old=ZSP.isOld(id);
    var range=[]; for(var f=0;f<nf;f++)range.push(f);
    if(id==='ember_cave')range=range.filter(function(f){ return f<2; }); if(id==='isle_3')range=range.filter(function(f){ return f>=2; });       // Ember Isle: the Cave above, the Crypt below
    range.forEach(function(f){ var m=null, err=null;
      try{ if(old){ var sp=_siteFloorSpecOld({id:g[0],type:g[1],design:g[2]},f,nf); if(sp)m=_buildSiteFloor(sp); }
        else m=ZSP.build({zsp:{id:id,floor:f,floors:nf}}); }catch(e){ err=e.message; }
      out.push({m:m,f:f,err:err}); });
    return (CACHE[id]=out); }
  // one floor: the painted base if the builder made one, else the walk grid; ▲ arrive, ▼ the way on
  function drawFloor(c,F,x0,y0,bw,bh,label){ var m=F.m; c.fillStyle='#05070c'; c.fillRect(x0,y0,bw,bh);
    if(m){ var W=m.w||m.W, H=m.h||m.H, s=Math.min(bw/W,bh/H), ox=x0+(bw-W*s)/2, oy=y0+(bh-H*s)/2;
      if(m.base&&m.base.width){ c.imageSmoothingEnabled=true; c.drawImage(m.base,ox,oy,W*s,H*s); }
      else if(m.solid){ for(var y=0;y<H;y++)for(var x=0;x<W;x++){ if(m.solid[y*W+x])continue; c.fillStyle=(x+y)%2?'#8a8070':'#958a78'; c.fillRect(ox+x*s,oy+y*s,s+0.5,s+0.5); } }
      var LT0=typeof LT!=='undefined'?LT:32, mk=function(px,py,ch,col){ var X=ox+px*s, Y=oy+py*s, r=Math.max(5,s*1.3); c.fillStyle='rgba(0,0,0,.6)'; c.beginPath(); c.arc(X,Y,r+2,0,6.3); c.fill(); c.fillStyle=col; c.beginPath(); c.arc(X,Y,r,0,6.3); c.fill(); c.fillStyle='#10131c'; c.font='bold '+Math.round(r*1.2)+'px sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(ch,X,Y+1); };
      if(m.spawn)mk(m.spawn.x/LT0,m.spawn.y/LT0,'▲','#9fe8ff');
      if(m.site&&m.site.exit)mk(m.site.exit.x+0.5,m.site.exit.y+0.5,'▼','#ffd27a');
      c.fillStyle='rgba(0,0,0,.6)'; c.font='10px "Segoe UI",sans-serif'; var t2=label+' · '+W+'×'+H, tw=c.measureText(t2).width+8; c.fillRect(x0,y0,tw,15); c.fillStyle='#e8f0fa'; c.textAlign='left'; c.textBaseline='alphabetic'; c.fillText(t2,x0+4,y0+11); }
    else { c.fillStyle='#ff9a8a'; c.font='11px sans-serif'; c.textAlign='left'; c.fillText(label+': could not be built '+(F.err||''),x0+6,y0+16); } }
  LBR.drawers.sreview=function(cv,c,W,H,t,full,id){ var key=id+'|'+W+'|'+(full?1:0); if(cv._done===key)return; var L=floors(id), n=L.length;
    c.fillStyle='#0b0f18'; c.fillRect(0,0,W,H); var top=full?30:4, cols=Math.ceil(Math.sqrt(n*W/(H-top))), rows=Math.ceil(n/cols), cw=W/cols, ch=(H-top)/rows;
    L.forEach(function(F,i){ drawFloor(c,F,(i%cols)*cw+3,top+Math.floor(i/cols)*ch+3,cw-6,ch-6,'Floor '+(F.f+1)); });
    if(full){ c.fillStyle='#e8f0fa'; c.font='bold 15px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText(nameOf(id)+(ZSP.isOld(id)?'  ·  OLD design, built larger':'  ·  new design (your pick)')+'  ·  '+n+' floors',10,20); }
    cv._done=key; };
  function card(id,i){ var old=ZSP.isOld(id), s=ZSP.zsdSite(id), g=G[id];
    return LBR.card('sreview',{id:id,name:nameOf(id)+(old?' <span class="sr-old">OLD design · larger</span>':' <span class="sr-new">new design</span>'),
      desc:(s?QN[s.q]+' · '+(TN[s.type]||s.type).replace(/s$/,''):'')+' · '+floors(id).length+' floors'+(old?' — its own original layout ('+g[2].replace(/_/g,' ')+'), kept because your pick repeated another site\'s design type':' — option '+((ZSP.PICK[id]||0)+1)+' of your picks')},i,560,360,''); }
  var CSS='<style>.sr-old{font-size:11px;background:#6a4a1a;color:#ffe9a8;border-radius:8px;padding:1px 7px;margin-left:4px}.sr-new{font-size:11px;background:#1a4a3a;color:#bff0d8;border-radius:8px;padding:1px 7px;margin-left:4px}.sr-bar{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px}</style>';
  LAB_TABS.push({ id:'sreview', name:'Site review',
    blurb:'<b>Round 46 — your review is in the game.</b> Only one old layout per kind of site is kept (Sunken Courtyard, the Thorn Bailey castle with more rooms and harder stairs, the Rime Spire with its first stairs harder to find). The sites you called bad use your picks from the last Lab again; where one repeated another\'s type it now borrows from the designs you loved (marked <i>Mix</i> in the description). Your notes are in: Q4-b stairs at the end of the arms, larger mazes for the Conductor, Frozen Belfry and Ember Observatory, a less simple Drowned Lighthouse, more rooms and hidden stairs in the Lightning Rod, a bigger Monolith of six blocks. Built floors now have furnished rooms and an entry hall from the old towers. ☆ the ones that are good; notes for changes. The empty space round some floors: see the Empty space tab.',
    designs:IDS.map(function(id){ return {id:id,name:nameOf(id)}; }),
    render:function(){ setTimeout(LBR.bind,0); var types={}; IDS.forEach(function(id){ var t=typeOf(id); (types[t]=types[t]||[]).push(id); }); if(!cur)cur='tower';
      var nOld=IDS.filter(function(id){ return ZSP.isOld(id); }).length;
      var bar='<div class="sr-bar">'+Object.keys(TN).filter(function(k){ return types[k]; }).map(function(k){ return '<button class="vbtn'+(cur===k?' on':'')+'" onclick="ASREV.go(\''+k+'\')">'+TN[k]+' ('+types[k].length+')</button>'; }).join('')+'</div>';
      return CSS+LBR.sec('All '+IDS.length+' sites','new designs: '+(IDS.length-nOld)+' · old designs kept: '+nOld)+bar+'<div class="br-grid">'+(types[cur]||[]).map(card).join('')+'</div>'; } });
  window.ASREV={go:function(k){ cur=k; if(typeof LabApp!=='undefined'&&LabApp.renderGrid)LabApp.renderGrid(); }};
})();
