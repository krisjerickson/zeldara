// ═══════════════════════════════════════════════════════════════════════
// ║ SITE ROSTER (Phase 3 · C2/C4) — all 20 Design Lab picks in the game.
// ║ Each quadrant has 5 tower/dungeon sites. One tower + one dungeon are
// ║ the quadrant's boss sites (★): boss towers free a craftsman and open
// ║ the next region, boss dungeons give a mount. The other 3 are bonus
// ║ sites: an elite mini-boss guards a treasure vault (replayable).
// ║ Floors are built from the Lab designs, one template per site, varied
// ║ per floor (tower plan/mirror/room shuffle; cavern seed).
// ═══════════════════════════════════════════════════════════════════════
var SITE_FLOORS={1:[4,5],2:[5,6],3:[6,7],4:[7,8]};   // floors by region; boss sites use the top
var SITE_ROSTER={
  1:[{kind:'tower',design:'silverwood',boss:true},{kind:'dungeon',design:'sunken_courtyard',boss:true},
     {kind:'tower',design:'elven_library'},{kind:'tower',design:'hyrule_keep'},{kind:'dungeon',design:'mushroom_forest'}],
  2:[{kind:'tower',design:'frost_cathedral',boss:true},{kind:'dungeon',design:'lake_ring',boss:true},
     {kind:'tower',design:'moonglass'},{kind:'dungeon',design:'crystal_grotto'},{kind:'dungeon',design:'root_hollow'}],
  3:[{kind:'tower',design:'observatory',boss:true},{kind:'dungeon',design:'bone_pit',boss:true},
     {kind:'tower',design:'sky_cloister'},{kind:'tower',design:'rivendell'},{kind:'dungeon',design:'pillared_hall'}],
  4:[{kind:'tower',design:'dawn_sanctum',boss:true},{kind:'dungeon',design:'lava_archipelago',boss:true},
     {kind:'tower',design:'reflecting_hall'},{kind:'dungeon',design:'boulder_field'},{kind:'dungeon',design:'spiral_chasm'}]
};
// Captive craftsmen held at the top of each boss tower
var CRAFTSMEN={
  1:{id:'builder', n:'Bram the Builder',     icon:'🔨', freed:'Bram: "Free at last! I\'ll raise the bridge to the Wetlands."',
     village:'Bram: "The Wetlands bridge holds! Next I want to fix up this village."'},
  2:{id:'mechanic',n:'Mira the Mechanic',    icon:'⚙️', freed:'Mira: "Thank you! My lift will carry you up to the Highlands."',
     village:'Mira: "The Highland lift runs smooth. Gears never lie."'},
  3:{id:'forger',  n:'Dunn the Dwarf Forger',icon:'⚒️', freed:'Dunn: "Ha! Let me at my anvil — an iron bridge to the Ashlands it is!"',
     village:'Dunn: "That iron bridge will outlast us all."'},
  4:{id:'captain', n:'Captain Vela',         icon:'🧭', freed:'Vela: "You found me! The sky ports are yours to command."',
     village:'Vela: "The winds are kind today. The sky ports await you."'}
};
// Lore relic in each bonus site's treasure vault (+3 max HP each, kept forever)
var SITE_RELICS={
  rivendell:'Twilight Lantern', hyrule_keep:'White Keep Banner', moonglass:'Moonglass Prism', elven_library:'Leaf-bound Codex',
  sky_cloister:'Cloud Bell', silverwood:'Silverwood Circlet', frost_cathedral:'Frozen Hymnal', observatory:'Star Chart Fragment',
  reflecting_hall:'Mirror Shard', dawn_sanctum:'Dawn Sigil', boulder_field:'Miner\'s Charm', pillared_hall:'Column Keystone',
  crystal_grotto:'Singing Crystal', mushroom_forest:'Glowcap Spores', lava_archipelago:'Obsidian Idol', sunken_courtyard:'Temple Seal',
  lake_ring:'Black Pearl', bone_pit:'Titan\'s Tooth', root_hollow:'Amber Heartwood', spiral_chasm:'Wind Whistle'
};

function _siteHash(str){ var h=2166136261; for(var i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }
function _dungeonDesignById(id){ if(typeof EMBER_CAVE_BY_ID!=='undefined'){ if(id==='ember')return EMBER_CAVE_BY_ID[EMBER_CAVE_PICK]||EMBER_CAVE_DESIGNS[0]; if(EMBER_CAVE_BY_ID[id])return EMBER_CAVE_BY_ID[id]; } for(var i=0;i<DUNGEON_DESIGNS.length;i++)if(DUNGEON_DESIGNS[i].id===id)return DUNGEON_DESIGNS[i]; return null; }
function _siteDesignName(kind,id){ var d=kind==='tower'?TOWER_STYLES_BY_ID[id]:_dungeonDesignById(id); return d?d.name:id; }

// Build the world's tower/dungeon site list for one quadrant (boss sites first).
function _rosterSitesFor(sec){
  var lohi=SITE_FLOORS[sec]||[4,5], bonusN=0;
  return (SITE_ROSTER[sec]||[]).map(function(r){
    var floors=r.boss?lohi[1]:lohi[bonusN++%2];
    return { type:r.kind, section:sec, design:r.design, boss:!!r.boss, bonus:!r.boss, floors:floors,
      name:_siteDesignName(r.kind,r.design),
      id:r.boss?('s'+sec+'_'+r.kind):('s'+sec+'_b_'+r.design) };
  });
}

// Floor recipe for a site that uses a Lab design (null → legacy generator).
function _siteFloorSpec(site, floor, maxFloors){
  if(!site||!site.design)return null;
  var h=_siteHash(site.id), last=floor===maxFloors-1, seed=(h%99991)+floor*7919+13;
  if(site.type==='tower'){
    var S=TOWER_STYLES_BY_ID[site.design]; if(!S)return null;
    var plans=[S.plan].concat(['grand','gallery','rotunda'].filter(function(p){return p!==S.plan;}));
    var plan=plans[(floor+(h>>>5))%3];
    if(S.floorPlans){ var FP=S.floorPlans(maxFloors); plan=FP[Math.min(floor,FP.length-1)]; if(last)plan=FP[FP.length-1]; }
    return { kind:'tower', style:S, plan:plan, seed:seed, last:last,
      mirror:((h>>>2)+floor)%2===1, shuffle:floor>0||(h%2===1) };
  }
  var D=_dungeonDesignById(site.design); if(!D)return null;
  return { kind:'dungeon', design:D, seed:seed, last:last };
}
function _buildSiteFloor(spec){
  if(spec.kind==='tower')return buildTower(spec.style, spec.plan, spec.seed, {mirror:spec.mirror, shuffle:spec.shuffle, last:spec.last});
  return buildCavern(spec.design, spec.seed, {game:true, last:spec.last});
}

// Elite mini-boss for bonus sites: the section's toughest regular monster, buffed.
function _bonusMiniBossKey(sec){
  var key='elite_'+sec; if(MDEFS[key])return key;
  var best=null; for(var k in MDEFS){ var d=MDEFS[k]; if(d.sec===sec&&!d.boss&&(!best||d.hp>MDEFS[best].hp))best=k; }
  if(!best)return null; var b=MDEFS[best];
  MDEFS[key]=Object.assign({},b,{ name:'Elite '+b.name, hp:Math.round((b.hp*8+60*sec)*1.25),   // round 9: +25%
    _base:best, atk:Math.round(b.atk*1.4)+2, def:(b.def||0)+2,
    r:(b.r||10)+5, xp:b.xp*6, gMin:b.gMin*4, gMax:b.gMax*4, boss:true, elite:true,
    _rid:(typeof MON_LEGACY!=='undefined')?Object.keys(MON_LEGACY).find(function(k){ return MON_LEGACY[k]===best; }):null });
  if(typeof BA!=='undefined'&&BA.of(key))MDEFS[key].name=BA.of(key).name;   // painted elite (07zz) names it
  return key;
}
// Island guardians live in the island's dungeon now (the familiar comes from them).
function _islandBossKey(sec){
  var key='isl_boss_'+sec; if(MDEFS[key])return key;
  var isl=(typeof HARBOR_ISLANDS!=='undefined')&&HARBOR_ISLANDS[sec]; if(!isl||!isl.boss)return null; var b=isl.boss;
  MDEFS[key]={ name:b.name, icon:b.icon, hp:Math.round(b.hp*1.5),   // round 9: +50%
    atk:b.atk, def:b.def||0, xp:Math.round(b.hp*1.6), gMin:30*sec, gMax:45*sec, sec:sec,
    color:b.col||0x884422, r:b.r||18, spd:b.spd||40, moveType:b.moveType||'normal', atkType:b.atkType||'melee', boss:true };
  if(typeof BA!=='undefined'&&BA.of('boss_isl_'+sec))MDEFS[key].name=BA.of('boss_isl_'+sec).name;   // painted guardian (07zz) names it
  return key;
}

// All four regional quests + islands + sky ports → Dragon mount (single check, called from every completion)
var ALL_MAIN_QUESTS=['s1_dungeon','s1_tower','s1_harbor','s1_skyport','s2_dungeon','s2_tower','s2_harbor','s2_skyport','s3_dungeon','s3_tower','s3_harbor','s3_skyport','s4_dungeon','s4_tower','s4_harbor','s4_skyport'];
function _completeQuest(ps,key){
  if(!ps.completedQuests)ps.completedQuests=[];
  if(!ps.completedQuests.includes(key))ps.completedQuests.push(key);
  if(ps.activeQuest===key)ps.activeQuest=null;
  var allDone=ALL_MAIN_QUESTS.every(function(q){return ps.completedQuests.includes(q);});
  if(allDone&&(!ps.ownedMounts||!ps.ownedMounts.includes('dragon'))){
    if(!ps.ownedMounts)ps.ownedMounts=[];
    ps.ownedMounts.push('dragon'); if(!ps.mount&&!ps._stowedMount){ if(game.scene.isActive('World'))ps.mount='dragon'; else ps._stowedMount='dragon'; }
    setTimeout(function(){showNotif('🐉 ALL QUESTS COMPLETE — Dragon Mount Unlocked!','#ff4444');},500);
    setTimeout(function(){showNotif('🐉 The Dragon flies over all land and deep water!','#ffaa44');},1000);
  }
}
// Quadrant boss tower + dungeon stay sealed until every bonus tower/dungeon of that quadrant is cleared
// (already-beaten boss sites stay open for rematches).
function _bossSiteGate(ps,site,sites){
  if(!site||!site.boss||(site.type!=='tower'&&site.type!=='dungeon'))return null;
  if((ps.completedQuests||[]).includes(site.id))return {open:true,need:0,done:0,left:[]};
  var bon=(sites||[]).filter(function(s){ return s.bonus&&s.section===site.section&&(s.type==='tower'||s.type==='dungeon'); }),
      cl=ps.bonusCleared||[], left=bon.filter(function(s){ return cl.indexOf(s.id)<0; });
  return {open:!left.length,need:bon.length,done:bon.length-left.length,left:left};
}
function _siteLabel(s){
  if(s.mage)return '🔮 '+s.name+' (Mage Tower)';
  if(s.name)return (s.boss?'★ ':'')+s.name+(s.type==='tower'?' (Tower)':' (Dungeon)');
  if(s.type==='harbor'){ var C=s.castle&&typeof CASTLE_ISLANDS!=='undefined'&&CASTLE_ISLANDS[s.castle]; return C?'Harbor → '+C.name+' (castle)':'Harbor → '+((typeof HARBOR_ISLANDS!=='undefined'&&HARBOR_ISLANDS[s.section])||{name:'Island'}).name+' (familiar)'; }
  return s.type.charAt(0).toUpperCase()+s.type.slice(1);
}

// Island familiar (awarded when the island dungeon's guardian falls)
function _awardIslandFamiliar(ps,sec){
  if(!ps.completedIslands)ps.completedIslands=[];
  var first=!ps.completedIslands.includes(sec);
  if(first)ps.completedIslands.push(sec);
  var famId=FAM_BY_SEC[sec], famDef=FAMILIARS[famId];
  if(famId&&famDef&&(!ps.ownedFamiliars||!ps.ownedFamiliars.includes(famId))){
    if(!ps.ownedFamiliars)ps.ownedFamiliars=[];
    ps.ownedFamiliars.push(famId); if(!ps.famLevels)ps.famLevels={}; ps.famLevels[famId]=ps.famLevels[famId]||1;
    setTimeout(function(){showNotif(famDef.icon+' '+famDef.n+' — a '+SPIRIT_ELEMENTS[famDef.el].name.toLowerCase()+' spirit — is now your familiar!','#88eeff');},300);
    setTimeout(function(){showNotif('✨ The '+TOME_QN[sec]+' fairies by the runestones can teach it new skills.','#c0ffe0');},2200);
    var max=_maxFamiliarSlots(ps); for(var i=0;i<max;i++){ if(!ps[FAM_SLOTS[i]]){ ps[FAM_SLOTS[i]]=famId; break; } }
  }
}
