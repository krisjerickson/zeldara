// ═══════════════════════════════════════════════════════════════════════
// ║ PURPOSE CAMPS (Phase 4b) — two thirds of the world's monsters now
// ║ guard something: a campfire (food pops out), a chest, a healing well,
// ║ a moonwell (mana), a shrine (a 2-minute buff), a rune stone (XP), a
// ║ hunter's rack (arrows) or a nest/hoard (gems). 15 themed camp types per
// ║ quadrant. Beat every guard → a fanfare + confetti and the reward is
// ║ yours. Food, wells, moonwells, shrines and racks come back after ~10
// ║ minutes (new guards); chests, gems and rune stones are one-time.
// ║ The last third of the monsters still roam freely.
// ═══════════════════════════════════════════════════════════════════════
var CAMP_RESPAWN_S=600;
// reward kinds: food · chest · well · mana · buff · xp · ammo · gems
var CAMP_TYPES={
 1:[{id:'goblin_fire',name:'Goblin Campfire',prop:'campfire',r:{k:'food',items:['roast_meat','bread'],n:3}},
    {id:'bandit_stash',name:'Bandit Stash',prop:'chest',r:{k:'chest',gold:[25,45],items:['potion','arrow_normal','gem_ruby']}},
    {id:'fairy_spring',name:'Fairy Spring',prop:'well',r:{k:'well'},tint:'#a0ffd0'},
    {id:'wild_beehive',name:'Wild Beehive',prop:'beehive',r:{k:'food',items:['honey'],n:2}},
    {id:'stolen_picnic',name:'Stolen Picnic',prop:'blanket',r:{k:'food',items:['bread','cheese','wild_berries'],n:3}},
    {id:'scarecrow_field',name:'Haunted Scarecrow Field',prop:'scarecrow',r:{k:'food',items:['trail_mix','wild_berries'],n:3}},
    {id:'overturned_cart',name:'Overturned Merchant Cart',prop:'cart',r:{k:'chest',gold:[30,55],items:['potion','bread','arrow_normal']}},
    {id:'rune_circle',name:'Whispering Rune Circle',prop:'obelisk',r:{k:'xp',xp:60},tint:'#6fe3f5'},
    {id:'shepherd_hut',name:'Raided Shepherd\'s Hut',prop:'tent',r:{k:'food',items:['cheese','bread'],n:3}},
    {id:'fairy_ring',name:'Fairy Mushroom Ring',prop:'mushrooms',r:{k:'food',items:['mushroom_stew'],n:2}},
    {id:'hunter_camp',name:'Hunter\'s Camp',prop:'rack',r:{k:'ammo',id:'arrow_normal',qty:15}},
    {id:'mill_sacks',name:'Windmill Grain Sacks',prop:'sacks',r:{k:'food',items:['bread'],n:4}},
    {id:'meadow_shrine',name:'Meadow Shrine',prop:'shrine',r:{k:'buff',b:'spdUp'},tint:'#ffe8a0'},
    {id:'roc_nest',name:'Giant Bird Nest',prop:'nest',r:{k:'gems',items:['gem_ruby'],n:1,gold:[15,25]}},
    {id:'moon_stone',name:'Moonstone Well',prop:'moonwell',r:{k:'mana'},tint:'#9fc8ff'}],
 2:[{id:'fisher_fire',name:'Fisherman\'s Fire',prop:'campfire',r:{k:'food',items:['grilled_fish','bread'],n:3}},
    {id:'sunken_chest',name:'Sunken Chest',prop:'chest',r:{k:'chest',gold:[45,80],items:['mega_potion','arrow_cold','gem_sapphire']}},
    {id:'lily_spring',name:'Lily Spring',prop:'well',r:{k:'well'},tint:'#b0ffd8'},
    {id:'frog_feast',name:'Frog Pond Feast',prop:'blanket',r:{k:'food',items:['wild_berries','grilled_fish'],n:3}},
    {id:'smuggler_raft',name:'Smugglers\' Raft',prop:'raft',r:{k:'chest',gold:[50,90],items:['potion','arrow_cold','cheese']}},
    {id:'witch_cauldron',name:'Witch\'s Cauldron',prop:'cauldron',r:{k:'buff',b:'defUp'},tint:'#a0ff60'},
    {id:'glowcap_grove',name:'Glowcap Grove',prop:'mushrooms',r:{k:'food',items:['mushroom_stew'],n:3}},
    {id:'heron_nest',name:'Heron Nest',prop:'nest',r:{k:'gems',items:['gem_sapphire'],n:1,gold:[25,40]}},
    {id:'drowned_shrine',name:'Drowned Shrine',prop:'obelisk',r:{k:'xp',xp:110},tint:'#8ff0ff'},
    {id:'leech_hollow',name:'Leech Hollow Hoard',prop:'bones',r:{k:'chest',gold:[40,70],items:['potion','dungeon_ration']}},
    {id:'reed_hut',name:'Reed Hut',prop:'tent',r:{k:'food',items:['grilled_fish','trail_mix'],n:3}},
    {id:'moon_pool',name:'Moonlit Pool',prop:'moonwell',r:{k:'mana'},tint:'#c8b0ff'},
    {id:'eel_rack',name:'Eel Drying Rack',prop:'rack',r:{k:'food',items:['grilled_fish'],n:4}},
    {id:'lantern_barge',name:'Lantern Barge',prop:'lantern',r:{k:'ammo',id:'arrow_cold',qty:8}},
    {id:'croc_den',name:'Crocodile Den',prop:'bones',r:{k:'gems',items:['gem_sapphire','gem_emerald'],n:1,gold:[30,50]}}],
 3:[{id:'miner_fire',name:'Miner\'s Campfire',prop:'campfire',r:{k:'food',items:['dungeon_ration','roast_meat'],n:3}},
    {id:'dwarf_strongbox',name:'Dwarven Strongbox',prop:'chest',r:{k:'chest',gold:[70,120],items:['mega_potion','arrow_heat','gem_emerald']}},
    {id:'mountain_spring',name:'Mountain Spring',prop:'well',r:{k:'well'},tint:'#d0f0ff'},
    {id:'goat_camp',name:'Goat Herder\'s Camp',prop:'tent',r:{k:'food',items:['cheese','roast_meat'],n:3}},
    {id:'crystal_cluster',name:'Singing Crystal Cluster',prop:'crystal',r:{k:'gems',items:['gem_emerald','gem_sapphire'],n:2,gold:[30,50]},tint:'#c080ff'},
    {id:'old_forge',name:'Abandoned Forge',prop:'anvil',r:{k:'buff',b:'atkUp'},tint:'#ffb040'},
    {id:'eagle_eyrie',name:'Eagle\'s Eyrie',prop:'nest',r:{k:'ammo',id:'arrow_heat',qty:6}},
    {id:'star_obelisk',name:'Stargazer\'s Obelisk',prop:'obelisk',r:{k:'xp',xp:170},tint:'#fff0a0'},
    {id:'supply_mule',name:'Supply Mule Cart',prop:'cart',r:{k:'chest',gold:[60,110],items:['dungeon_ration','mega_potion','arrow_normal']}},
    {id:'hermit_shrine',name:'Hermit\'s Shrine',prop:'shrine',r:{k:'buff',b:'defUp'},tint:'#e0e8ff'},
    {id:'frozen_spring',name:'Frozen Spring',prop:'moonwell',r:{k:'mana'},tint:'#bff6ff'},
    {id:'ore_cart',name:'Runaway Ore Cart',prop:'cart',r:{k:'gems',items:['gem_emerald','gem_ruby'],n:2,gold:[40,60]}},
    {id:'yeti_feast',name:'Yeti\'s Feast',prop:'bones',r:{k:'food',items:['roast_meat'],n:3}},
    {id:'harp_stones',name:'Wind-harp Stones',prop:'obelisk',r:{k:'xp',xp:150},tint:'#c8f0ff'},
    {id:'trapper_rack',name:'Trapper\'s Rack',prop:'rack',r:{k:'food',items:['roast_meat','trail_mix'],n:3}}],
 4:[{id:'cultist_bonfire',name:'Cultist Bonfire',prop:'campfire',r:{k:'food',items:['feast_platter','roast_meat'],n:3}},
    {id:'obsidian_coffer',name:'Obsidian Coffer',prop:'chest',r:{k:'chest',gold:[110,180],items:['mega_potion','arrow_fire','skystone']}},
    {id:'ember_spring',name:'Ember Spring',prop:'well',r:{k:'well'},tint:'#ffc080'},
    {id:'salamander_nest',name:'Salamander Nest',prop:'nest',r:{k:'gems',items:['gem_ruby','gem_ruby','skystone'],n:2,gold:[50,80]},tint:'#ff8040'},
    {id:'war_camp',name:'Ash War Camp',prop:'banner',r:{k:'ammo',id:'arrow_fire',qty:8}},
    {id:'forge_anvil',name:'Forge-City Anvil',prop:'anvil',r:{k:'buff',b:'atkUp'},tint:'#ff9040'},
    {id:'sulfur_cauldron',name:'Sulfur Cauldron',prop:'cauldron',r:{k:'buff',b:'spdUp'},tint:'#e0d040'},
    {id:'bone_hoard',name:'Dragon-Bone Hoard',prop:'bones',r:{k:'chest',gold:[120,200],items:['dragon_steak','gem_ruby','mega_potion']}},
    {id:'magma_shrine',name:'Magma Shrine',prop:'obelisk',r:{k:'xp',xp:260},tint:'#ff8040'},
    {id:'ash_garden',name:'Ash-bloom Garden',prop:'mushrooms',r:{k:'food',items:['feast_platter','mushroom_stew'],n:2}},
    {id:'lava_lamp_well',name:'Lava-lamp Well',prop:'moonwell',r:{k:'mana'},tint:'#ffb070'},
    {id:'supply_wagon',name:'Captured Supply Wagon',prop:'cart',r:{k:'chest',gold:[100,170],items:['dungeon_ration','mega_potion','arrow_fire']}},
    {id:'chained_totem',name:'Chained Totem',prop:'totem',r:{k:'xp',xp:240},tint:'#ff6040'},
    {id:'brimstone_brazier',name:'Brimstone Brazier',prop:'lantern',r:{k:'buff',b:'defUp'},tint:'#ffa040'},
    {id:'phoenix_roost',name:'Phoenix Roost',prop:'nest',r:{k:'food',items:['dragon_steak','feast_platter'],n:2},tint:'#ffb040'}]
};
var CAMP_BY_ID={}; [1,2,3,4].forEach(function(q){ CAMP_TYPES[q].forEach(function(t){ t.q=q; CAMP_BY_ID[t.id]=t; }); });

// ── props, painted like the characters (32×32, outlined), 2 frames ──
var CAMP_PROPS={
  campfire:function(G,f,t){ for(var i=0;i<5;i++)G.r(6+i*4,24,3,3,'#6a4a2a'); G.l(8,26,24,22,'#5a3a1e'); G.l(8,22,24,26,'#5a3a1e'); for(var s=0;s<8;s++){ var a=s/8*Math.PI*2; G.e(16+Math.cos(a)*11,26+Math.sin(a)*3.5,1.6,1.2,'#7a7a82'); }
    var h=f?0:2; G.oe(16,19-h,4,6+h,'#ff8a20'); G.oe(16,21-h,2.4,4,'#ffd060'); G.op(13,15-h,'#ffb040'); G.op(19,14,'#ffb040'); },
  chest:function(G,f,t){ G.r(7,15,18,11,'#8a5a2a'); G.r(7,12,18,4,f===2?'#6a4420':'#9a6a34'); G.r(7,19,18,1,'#5a3a1a'); G.r(15,17,2,4,'#e8c040'); G.r(7,15,1,11,'#c8a040'); G.r(24,15,1,11,'#c8a040'); if(f===2){ G.r(8,8,16,5,'#5a3a1a'); G.oe(16,14,6,2,'#ffe080'); } },
  well:function(G,f,t){ G.e(16,23,10,5,'#8a8a92'); G.e(16,22,7,3,t||'#6fd0ff'); G.r(6,10,2,13,'#6a4a2a'); G.r(24,10,2,13,'#6a4a2a'); G.tri(4,11,28,11,16,4,'#8a4a2a'); G.op(16,21,'#ffffff'); if(f)G.oe(16,22,8,4,rgba(t||'#6fd0ff',0.35)); },
  moonwell:function(G,f,t){ G.e(16,24,11,5,'#6a6a78'); G.e(16,23,8,3.4,t||'#9fc8ff'); for(var i=0;i<4;i++)G.r(5+i*7,14,2,10,'#8a8a98'); G.oe(16,23,f?9:7,f?4:3,rgba(t||'#9fc8ff',0.45)); G.op(12,22,'#ffffff'); G.op(19,23,'#ffffff'); },
  beehive:function(G,f,t){ G.l(16,2,16,8,'#6a4a2a'); G.e(16,15,8,9,'#d8a040'); for(var i=0;i<4;i++)G.r(9,10+i*4,14,1,'#a87020'); G.e(16,22,3,2,'#3a2a10'); G.op(f?6:24,8,'#202020'); G.op(f?25:7,14,'#202020'); G.op(f?10:21,4,'#ffd040'); },
  blanket:function(G,f,t){ G.tri(3,24,29,24,16,17,'#c83a3a'); G.tri(3,24,29,24,16,30,'#c83a3a'); for(var i=0;i<4;i++){ G.p(9+i*5,24,'#f0e8d8'); G.p(12+i*4,21,'#f0e8d8'); } G.e(11,20,3,2,'#c89040'); G.r(18,19,5,3,'#e8d060'); G.e(22,25,2,2,'#8040a0'); },
  scarecrow:function(G,f,t){ G.r(15,10,2,18,'#6a4a2a'); G.r(7,13,18,2,'#6a4a2a'); G.r(12,12,8,9,'#6a8a3a'); G.e(16,8,4,4,'#e0c070'); G.tri(10,6,22,6,16,0,'#8a6a3a'); G.op(15,8,'#101010'); G.op(17,8,'#101010'); G.op(7,15,'#e0c070'); G.op(24,15,'#e0c070'); if(f)G.op(20,3,'#202020'); },
  cart:function(G,f,t){ G.r(5,14,22,8,'#8a6030'); G.r(5,12,22,2,'#6a4420'); G.e(9,23,4,4,'#4a3a2a'); G.e(9,23,1.5,1.5,'#8a7a6a'); G.l(26,16,31,26,'#6a4420'); G.e(15,11,4,3,'#c8a060'); G.e(21,11,3,2.5,'#d0c080'); if(t==='ore'){ G.e(15,11,4,3,'#7a7a8a'); } },
  obelisk:function(G,f,t){ G.r(9,26,14,3,'#6a6a72'); G.tri(11,26,21,26,16,3,'#7a7e8a'); G.r(12,12,8,14,'#7a7e8a'); for(var i=0;i<3;i++)G.op(15+(i%2),9+i*5,f?'#ffffff':(t||'#6fe3f5')); G.oe(16,14,6,10,rgba(t||'#6fe3f5',f?0.3:0.18)); },
  tent:function(G,f,t){ G.tri(3,27,29,27,16,6,'#c8b890'); G.tri(12,27,20,27,16,14,'#3a2a1a'); G.l(16,6,16,3,'#6a4a2a'); G.tri(16,3,16,6,21,4,'#c83a3a'); G.l(3,27,0,29,'#6a4a2a'); G.l(29,27,31,29,'#6a4a2a'); },
  mushrooms:function(G,f,t){ var P=[[6,22],[16,26],[26,22],[10,16],[22,16]]; P.forEach(function(p,i){ G.r(p[0],p[1],2,4,'#e8e0cc'); G.e(p[0]+1,p[1]-1,4,2.5,i%2?'#c83a3a':'#e08a30'); G.op(p[0],p[1]-2,'#fff4e0'); }); if(f)P.forEach(function(p){ G.op(p[0]+3,p[1]-4,'#c0ff90'); }); },
  rack:function(G,f,t){ G.l(5,27,9,8,'#6a4a2a'); G.l(27,27,23,8,'#6a4a2a'); G.r(8,9,16,2,'#6a4a2a'); for(var i=0;i<4;i++){ G.l(11+i*3,11,11+i*3,17,'#7a5a3a'); G.e(11+i*3,19,1.5,3,t==='fish'?'#8aa0b0':'#a05a3a'); } G.l(6,24,26,24,'#6a4a2a'); for(var j=0;j<5;j++)G.l(8+j*4,24,10+j*4,27,'#9a8a70'); },
  sacks:function(G,f,t){ [[9,20],[17,22],[23,18],[14,14]].forEach(function(s){ G.e(s[0],s[1],5,5,'#d0b880'); G.r(s[0]-2,s[1]-6,4,2,'#a08858'); }); G.op(9,19,'#a08858'); },
  shrine:function(G,f,t){ G.r(8,24,16,4,'#8a8a92'); G.r(10,14,12,10,'#9a9aa4'); G.tri(8,14,24,14,16,6,'#7a7a84'); G.oe(16,19,3,3,t||'#ffe8a0'); if(f)G.oe(16,19,6,6,rgba(t||'#ffe8a0',0.35)); G.op(14,11,'#e0e0e0'); },
  nest:function(G,f,t){ G.e(16,22,12,6,'#8a6a3a'); for(var i=0;i<8;i++)G.l(5+i*3,19+(i%2),8+i*3,25,'#6a4a2a'); G.e(12,19,3,4,'#f0e8d8'); G.e(18,18,3,4,'#e0e8f0'); G.e(22,20,2.5,3.5,t||'#f0d8c0'); if(f)G.op(18,15,'#ffffff'); },
  raft:function(G,f,t){ for(var i=0;i<5;i++)G.r(5+i*4,18,4,10,'#8a6a3a'); G.r(4,20,24,2,'#5a3a1e'); G.r(15,6,2,13,'#6a4a2a'); G.tri(17,6,17,16,26,14,'#e8e0d0'); G.r(8,14,6,5,'#7a5028'); G.or(0,29,32,1,'rgba(120,200,255,.5)'); },
  cauldron:function(G,f,t){ G.e(16,20,10,7,'#2a2a30'); G.r(6,13,20,3,'#3a3a42'); G.e(16,14,9,2.5,t||'#80ff60'); G.l(8,27,6,30,'#2a2a30'); G.l(24,27,26,30,'#2a2a30'); for(var i=0;i<3;i++)G.oe(11+i*5,11-(f?(i%2)*2:((i+1)%2)*2),1.5,1.5,rgba(t||'#80ff60',0.8)); G.op(16,28,'#ff8a20'); },
  anvil:function(G,f,t){ G.r(9,22,14,6,'#4a4a52'); G.r(6,16,20,6,'#5a5a64'); G.tri(26,16,26,22,31,18,'#5a5a64'); G.r(11,12,2,4,'#6a4a2a'); G.r(9,10,6,3,'#7a7a84'); if(f)for(var i=0;i<4;i++)G.op(18+i*2,14-(i%2)*2,t||'#ffb040'); G.op(20,17,'#8a8a94'); },
  crystal:function(G,f,t){ [[10,26,7],[16,26,12],[22,26,8],[13,28,5]].forEach(function(c){ G.tri(c[0]-3,c[1],c[0]+3,c[1],c[0],c[1]-c[2]*1.6,t||'#c080ff'); }); G.oe(16,18,f?9:7,f?9:7,rgba(t||'#c080ff',0.25)); G.op(15,9,'#ffffff'); },
  bones:function(G,f,t){ G.e(16,24,11,4,'#6a5a4a'); G.e(12,19,5,4,'#e8e0cc'); G.op(10,19,'#101010'); G.op(13,19,'#101010'); for(var i=0;i<4;i++)G.l(17+i*2,26,22+i*2,17,'#e8e0cc'); G.l(5,25,12,22,'#e8e0cc'); if(t)G.e(24,24,2.5,2,t); if(f)G.op(24,22,'#ffffff'); },
  lantern:function(G,f,t){ G.r(15,8,2,20,'#3a3026'); G.r(10,26,12,3,'#3a3026'); G.r(12,5,8,9,'#4a3a2a'); G.oe(16,9,3,3.5,f?'#ffe8a0':(t||'#ffc060')); G.oe(16,9,7,7,rgba(t||'#ffc060',0.25)); },
  banner:function(G,f,t){ G.r(8,4,2,24,'#6a4a2a'); G.r(10,5,12,12,'#8a1a10'); G.tri(10,17,22,17,16,21,'#8a1a10'); G.oe(16,11,2.5,2.5,'#ffb040'); G.r(18,20,10,7,'#6a4a2a'); G.l(20,20,20,13,'#9a8a70'); G.l(24,20,25,13,'#9a8a70'); },
  totem:function(G,f,t){ G.r(12,4,8,24,'#4a3a3a'); G.r(10,26,12,3,'#3a2a2a'); for(var i=0;i<3;i++){ G.r(13,6+i*7,6,5,i%2?'#6a3a2a':'#5a2a2a'); G.op(14,8+i*7,t||'#ff6040'); G.op(17,8+i*7,t||'#ff6040'); } G.ol(8,10,24,22,'#9a9aa4'); G.ol(8,22,24,10,'#9a9aa4'); if(f)G.oe(16,14,8,12,rgba(t||'#ff6040',0.18)); }
};
function _campPropFrames(kind,tint){ var key=kind+'|'+(tint||''); _campPropFrames.c=_campPropFrames.c||{}; if(_campPropFrames.c[key])return _campPropFrames.c[key];
  var fr=[0,1,2].map(function(f){ var G=_msGrid(); (CAMP_PROPS[kind]||CAMP_PROPS.chest)(G,f,tint); _msShadeOutline(G); var cv=mkCanvas(32,32), x=cv.getContext('2d');
    x.fillStyle='rgba(0,0,0,.25)'; x.beginPath(); x.ellipse(16,29,12,2.4,0,0,Math.PI*2); x.fill();
    for(var k=0;k<1024;k++){ if(G.c[k]){ x.fillStyle=G.c[k]; x.fillRect(k%32,(k/32)|0,1,1); } } for(var k2=0;k2<1024;k2++){ if(G.o[k2]){ x.fillStyle=G.o[k2]; x.fillRect(k2%32,(k2/32)|0,1,1); } } return cv; });
  return (_campPropFrames.c[key]=fr); }
// small pick-up sprites for rewards
var CAMP_LOOT_ART={
  meat:function(G){ G.e(15,17,5,4,'#a0502a'); G.e(14,16,3,2,'#c87040'); G.l(19,19,24,23,'#f0e8d8'); G.e(24,23,1.5,1.5,'#f0e8d8'); },
  bread:function(G){ G.e(16,18,6,3.5,'#d09040'); for(var i=0;i<3;i++)G.l(12+i*3,16,13+i*3,19,'#a06020'); },
  cheese:function(G){ G.tri(10,21,22,21,22,13,'#f0c840'); G.op(18,18,'#c89020'); G.op(20,16,'#c89020'); },
  fish:function(G){ G.e(15,18,6,3,'#8aa0b8'); G.tri(20,18,25,14,25,22,'#6a8098'); G.op(12,17,'#101010'); G.l(10,19,19,19,'#c87040'); },
  bowl:function(G){ G.e(16,19,7,3.5,'#8a5a2a'); G.e(16,17,6,2,'#c8804a'); G.op(14,16,'#e0b060'); G.op(18,16,'#6a9a3a'); },
  jar:function(G){ G.r(12,13,8,9,'#e0a020'); G.r(12,11,8,2,'#8a6a3a'); G.op(14,15,'#fff0a0'); },
  berries:function(G){ [[13,18],[16,16],[19,18],[16,20]].forEach(function(b){ G.e(b[0],b[1],2,2,'#6a3aa0'); }); G.l(16,13,16,15,'#3a8a3a'); },
  gem:function(G,t){ G.tri(11,16,21,16,16,23,t||'#e04040'); G.tri(11,16,21,16,16,11,shade(t||'#e04040',0.3)); G.op(14,14,'#ffffff'); },
  arrows:function(G){ for(var i=0;i<4;i++){ G.l(10+i*2,23,16+i*2,10,'#8a6a3a'); G.p(16+i*2,9,'#c8ccd4'); G.p(10+i*2,23,'#e8e0d0'); } G.r(9,17,10,2,'#6a4a2a'); },
  potion:function(G){ G.e(16,19,4,4,'#e04060'); G.r(15,12,2,4,'#c8c0b0'); G.op(14,18,'#ffc0d0'); },
  coin:function(G){ G.e(16,18,4,4,'#e8c040'); G.op(15,17,'#fff0a0'); }
};
var CAMP_ITEM_ART={roast_meat:'meat',dragon_steak:'meat',bread:'bread',cheese:'cheese',grilled_fish:'fish',mushroom_stew:'bowl',dungeon_ration:'bowl',feast_platter:'bowl',honey:'jar',wild_berries:'berries',trail_mix:'berries',
  gem_ruby:['gem','#e04040'],gem_sapphire:['gem','#4080ff'],gem_emerald:['gem','#40c060'],skystone:['gem','#d0c0ff'],potion:'potion',mega_potion:'potion',arrow_normal:'arrows',arrow_cold:'arrows',arrow_fire:'arrows',arrow_heat:'arrows'};
function _campLootTex(scene,item){ var a=CAMP_ITEM_ART[item]||'coin', name=Array.isArray(a)?a[0]:a, tint=Array.isArray(a)?a[1]:null, key='loot_'+name+(tint||''); if(scene.textures.exists(key))return key;
  var G=_msGrid(); CAMP_LOOT_ART[name](G,tint); _msShadeOutline(G); var cv=mkCanvas(32,32), x=cv.getContext('2d'); for(var k=0;k<1024;k++){ if(G.c[k]){ x.fillStyle=G.c[k]; x.fillRect(k%32,(k/32)|0,1,1); } } for(var k2=0;k2<1024;k2++){ if(G.o[k2]){ x.fillStyle=G.o[k2]; x.fillRect(k2%32,(k2/32)|0,1,1); } }
  var tx=scene.textures.addCanvas(key,cv); tx.setFilter(Phaser.Textures.FilterMode.NEAREST); return key; }

// ── celebration: fanfare + confetti + banner ──
var SFX={ ctx:null, ac:function(){ try{ if(!SFX.ctx){ var C=window.AudioContext||window.webkitAudioContext; if(!C)return null; SFX.ctx=new C(); } if(SFX.ctx.state==='suspended')SFX.ctx.resume(); return SFX.ctx; }catch(e){ return null; } },
  tone:function(f,t0,dur,type,vol){ var a=SFX.ac(); if(!a)return; var o=a.createOscillator(), g=a.createGain(); o.type=type||'triangle'; o.frequency.value=f; g.gain.setValueAtTime(0,a.currentTime+t0); g.gain.linearRampToValueAtTime(vol||0.12,a.currentTime+t0+0.02); g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+t0+dur); o.connect(g); g.connect(a.destination); o.start(a.currentTime+t0); o.stop(a.currentTime+t0+dur+0.05); },
  fanfare:function(){ [[523,0],[659,0.1],[784,0.2],[1047,0.32]].forEach(function(n){ SFX.tone(n[0],n[1],0.35,'triangle',0.11); }); SFX.tone(1568,0.46,0.5,'sine',0.06); SFX.tone(784,0.46,0.6,'square',0.025); },
  pickup:function(){ SFX.tone(880,0,0.12,'sine',0.07); SFX.tone(1320,0.06,0.14,'sine',0.05); } };
function campCelebrate(scene,x,y,title,sub){
  SFX.fanfare();
  var cols=[0xffd040,0xff6080,0x60e0ff,0x80ff80,0xc080ff,0xffffff];
  if(scene.textures.exists('dot')){ var em=scene.add.particles(x,y-10,'dot',{speed:{min:80,max:220},angle:{min:200,max:340},gravityY:260,lifespan:{min:700,max:1300},scale:{start:1.1,end:0.3},tint:cols,emitting:false}).setDepth(WR_DEPTH(y)+2); em.explode(60); scene.time.delayedCall(1600,function(){ em.destroy(); }); }
  for(var i=0;i<3;i++){ (function(i){ var c=scene.add.circle(x,y,6,0xffe080,0).setStrokeStyle(3,0xffe080,0.9).setDepth(WR_DEPTH(y)+2); scene.tweens.add({targets:c,radius:70+i*30,alpha:0,duration:700+i*200,delay:i*120,onComplete:function(){ c.destroy(); }}); })(i); }
  var b=document.getElementById('camp-banner'); if(!b){ b=document.createElement('div'); b.id='camp-banner'; (document.getElementById('app')||document.body).appendChild(b); }
  b.innerHTML='<div class="cb-t">✨ '+title+' ✨</div><div class="cb-s">'+(sub||'')+'</div>'; b.classList.remove('on'); void b.offsetWidth; b.classList.add('on'); clearTimeout(b._t); b._t=setTimeout(function(){ b.classList.remove('on'); },3200);
}

Object.assign(WorldScene.prototype,{
  _campTex(kind,tint){ var key='camp_'+kind+(tint?'_'+tint.slice(1):''); if(this.textures.exists(key))return key; var fr=_campPropFrames(kind,tint), cv=mkCanvas(96,32), x=cv.getContext('2d'); fr.forEach(function(f,i){ x.drawImage(f,i*32,0); });
    var tx=this.textures.addCanvas(key,cv); for(var i=0;i<3;i++)tx.add(String(i),0,i*32,0,32,32); tx.setFilter(Phaser.Textures.FilterMode.NEAREST); return key; },
  // build every camp (two thirds of the monsters); returns guards per region
  _initCamps(rng){ var self=this, wd=this.wd, ps=this.playerState, done=(ps.campsDone=ps.campsDone||{});
    this._camps=[]; var guards={1:0,2:0,3:0,4:0};
    for(var sec=1;sec<=4;sec++){ var types=CAMP_TYPES[sec], want=33, made=0, tries=0;
      while(made<want&&tries++<3000){ var pc=self._randLand(rng,sec); if(!pc)continue; var tx=pc.tx, ty=pc.ty;
        if(Math.hypot(tx-CENTER_X,ty-CENTER_Y)<VILLAGE_RADIUS+16||self._nearSafeSpot(tx,ty,14))continue;
        if(self._camps.some(function(c){ return Math.hypot(c.tx-tx,c.ty-ty)<16; }))continue;
        var ok=true; for(var yy=-2;yy<=2&&ok;yy++)for(var xx=-2;xx<=2;xx++){ var t=self.tiles[ty+yy]&&self.tiles[ty+yy][tx+xx]; if(t===undefined||ALWAYS_BLOCKED.has(t)||getTileSection(tx+xx,ty+yy)!==sec){ ok=false; break; } }
        if(!ok)continue;
        var T0=types[made%types.length], id='c'+sec+'_'+made, x=tx*TILE+TILE/2, y=ty*TILE+TILE/2;
        var C={id:id,T:T0,sec:sec,tx:tx,ty:ty,x:x,y:y,guards:[],state:'guarded',loot:[],t:0};
        C.spr=this.add.image(x,y+14,this._campTex(T0.prop,T0.tint),'0').setOrigin(0.5,0.9).setScale(1.7).setDepth(WR_DEPTH(y));
        if(/campfire|lantern|moonwell|well|obelisk|shrine|cauldron|crystal|totem/.test(T0.prop)&&CHX.glow(this)){ C.glow=this.add.image(x,y+2,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(T0.tint||(T0.prop==='campfire'?'#ff9040':'#ffe8a0'))).setAlpha(0.45).setScale(T0.prop==='campfire'?1.1:0.8).setDepth(WR_DEPTH(y)-0.001); C.glow._base={x:x,y:y,r:70,a:0.45,noCut:false}; }
        if(done[id]){ C.state='spent'; if(C.spr)C.spr.setFrame('2'); if(C.glow)C.glow.setVisible(false); this._camps.push(C); made++; continue; }
        var n=3+Math.floor(rng.next()*3); for(var i=0;i<n;i++){ var a=i/n*Math.PI*2+rng.next()*0.4, gx=x+Math.cos(a)*(42+rng.next()*14), gy=y+Math.sin(a)*(30+rng.next()*10);
          if(!self._canGoMonster(gx,gy)){ gx=x+Math.cos(a)*24; gy=y+Math.sin(a)*18; }
          var pick=null; for(var k=0;k<8&&(!pick||MON_LEGACY[pick.R.id]);k++)pick=monPick(rng,sec,'main');
          if(!pick||MON_LEGACY[pick.R.id])continue;
          var mon=this._spawnRosterMon(pick.R.id,gx,gy,sec,rng,{alpha:i===0&&n>=5}); if(!mon)continue;
          mon.campId=id; mon.leashR=80; C.guards.push(mon); guards[sec]++; }
        this._camps.push(C); made++; } }
    return guards; },
  _campGuardDied(mon){ var C=this._camps&&this._camps.find(function(c){ return c.id===mon.campId; }); if(!C||C.state!=='guarded')return;
    if(C.guards.some(function(g){ return !g.dead; })){ var left=C.guards.filter(function(g){ return !g.dead; }).length; if(left<=2)this._floatText(C.x,C.y-40,left+' guard'+(left>1?'s':'')+' left','#ffe9a8'); return; }
    this._campCleared(C); },
  _campCleared(C){ var R=C.T.r, self=this, ps=this.playerState, q=C.sec; C.state='open'; C.clearedAt=Date.now();
    if(typeof Tome!=='undefined')Tome.see('place','camp_'+C.T.id);
    var sub={food:'Food is up for grabs!',chest:'The chest is unguarded — [Tab] to open it',well:'The spring is free — [Tab] to drink and heal',mana:'The waters are free — [Tab] to restore mana',buff:'The shrine is free — [Tab] for its blessing',xp:'The stone is free — [Tab] to read its runes',ammo:'Arrows lie ready to collect!',gems:'Gems glitter where the guards stood!'}[R.k];
    campCelebrate(this,C.x,C.y,C.T.name+' cleared!',sub);
    if(R.k==='food'){ for(var i=0;i<(R.n||3);i++)this._campDrop(C,R.items[i%R.items.length],'item'); }
    if(R.k==='ammo')this._campDrop(C,R.id,'ammo',R.qty);
    if(R.k==='gems'){ for(var j=0;j<(R.n||1);j++)this._campDrop(C,R.items[j%R.items.length],'item'); if(R.gold)this._campDrop(C,'coin','gold',R.gold[0]+Math.floor(Math.random()*(R.gold[1]-R.gold[0]+1))); ps.campsDone=ps.campsDone||{}; ps.campsDone[C.id]=1; }
    if(C.spr&&(R.k==='chest'||R.k==='well'||R.k==='mana'||R.k==='buff'||R.k==='xp'))C.spr.setFrame('1'); },
  _campDrop(C,item,kind,qty){ var a=Math.random()*Math.PI*2, d=22+Math.random()*26, x=C.x+Math.cos(a)*d, y=C.y+Math.sin(a)*d*0.7+8;
    var im=this.add.image(C.x,C.y,_campLootTex(this,item)).setScale(1.3).setDepth(WR_DEPTH(y)+0.01), self=this;
    this.tweens.add({targets:im,x:x,duration:500,ease:'Sine.out'}); this.tweens.add({targets:im,y:{from:C.y-10,to:y},duration:500,ease:'Bounce.out'});
    var gl=this.textures.exists('glow')?this.add.image(x,y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(0xfff0a0).setAlpha(0.35).setScale(0.35).setDepth(WR_DEPTH(y)):null;
    if(gl)this.tweens.add({targets:gl,alpha:0.12,duration:700,yoyo:true,repeat:-1});
    C.loot.push({im:im,gl:gl,x:x,y:y,item:item,kind:kind,qty:qty||1,born:Date.now()}); },
  _campTick(dt){ if(!this._camps||!this.player)return; var self=this, px=this.player.x, py=this.player.y, ps=this.playerState, near=null, inFire=null;
    this._campT=(this._campT||0)+dt;
    this._camps.forEach(function(C){ var d=Math.hypot(px-C.x,py-C.y);
      if(d<900&&C.spr&&C.state!=='spent'&&/campfire|lantern|moonwell|obelisk|crystal|totem|cauldron/.test(C.T.prop)){ var f=Math.floor(self._campT*4+C.x)%2; if(C.state==='guarded'||C.T.prop==='campfire'||C.T.prop==='lantern')C.spr.setFrame(String(f)); }
      // a lit campfire burns you (unless you ride the Lava Unicorn or a dragon)
      if(C.T.prop==='campfire'&&C.state!=='spent'&&Math.hypot(px-C.x,py-(C.y+8))<20)inFire=C;
      // pick-ups: walk over them
      for(var i=C.loot.length-1;i>=0;i--){ var L=C.loot[i]; if(Date.now()-L.born<600)continue; if(Math.hypot(px-L.x,py-L.y)<26){ self._campCollect(C,L); C.loot.splice(i,1); } }
      if(C.state==='open'&&d<TILE*1.8&&/chest|well|mana|buff|xp/.test(C.T.r.k))near=C;
      // respawn food / wells / shrines / racks after a while (when you're far away)
      if((C.state==='open'||C.state==='used')&&C.T.r.k!=='chest'&&C.T.r.k!=='gems'&&C.T.r.k!=='xp'&&Date.now()-C.clearedAt>CAMP_RESPAWN_S*1000&&d>TILE*30)self._campRespawn(C); });
    this._fireTick(dt,!!inFire&&!_fireSafeMount(ps));
    // [Tab] at an open chest / well / shrine / stone
    if(near){ if(!this._campPrompt||this._campPrompt._c!==near){ if(this._campPrompt)this._campPrompt.destroy(); var verb={chest:'Open chest',well:'Drink (heal)',mana:'Drink (mana)',buff:'Receive blessing',xp:'Read the runes'}[near.T.r.k];
        this._campPrompt=domText(this,near.x,near.y-46,'[Tab] '+verb,{fontSize:'10px',color:'#ffe9a8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5,1).setDepth(20); this._campPrompt._c=near; }
      if(Phaser.Input.Keyboard.JustDown(this.keys.TAB))this._campUse(near); }
    else if(this._campPrompt){ this._campPrompt.destroy(); this._campPrompt=null; } },
  // campfire burn: 5% max HP per second while in the flames, then the 3 s burn (10-scene-world)
  _fireTick(dt,on){ var ps=this.playerState, p=this.player; if(!on){ this._fireAcc=0; this._inFire=false; return; } if(ps.godMode||ps.hp<=0)return;
    if(!this._inFire){ this._inFire=true; this._fireAcc=1; showNotif('🔥 The campfire burns you! (the Lava Unicorn or a dragon mount keeps you safe)','#ff9060'); }
    this._burnTime=3; this._fireAcc+=dt; if(this._fireAcc<1)return; this._fireAcc-=1;
    var d=Math.max(2,Math.round(ps.maxHp*0.05)); ps.hp=Math.max(0,ps.hp-d); this._floatText(p.x,p.y-28,'-'+d+' 🔥','#ff6a20');
    var fl=document.getElementById('damage-flash'); if(fl){ fl.style.opacity='0.18'; clearTimeout(this._flashT); this._flashT=setTimeout(function(){ fl.style.opacity='0'; },280); }
    this._emitUI(); if(ps.hp<=0)this._worldPlayerDied(); },
  _campCollect(C,L){ var ps=this.playerState; SFX.pickup(); if(L.gl)L.gl.destroy(); var im=L.im; this.tweens.add({targets:im,y:im.y-24,alpha:0,duration:350,onComplete:function(){ im.destroy(); }});
    if(L.kind==='gold'){ ps.gold+=L.qty; this._floatText(L.x,L.y-20,'+'+L.qty+'g','#ffd700'); }
    else if(L.kind==='ammo'){ ps.ammo=ps.ammo||{}; ps.ammo[L.item]=(ps.ammo[L.item]||0)+L.qty; this._floatText(L.x,L.y-20,'+'+L.qty+' '+(ITEMS[L.item]?ITEMS[L.item].name:L.item),'#ffe9a8'); }
    else { ps.inventory=ps.inventory||[]; ps.inventory.push(L.item); var I=ITEMS[L.item]; this._floatText(L.x,L.y-20,'+ '+(I?I.name:L.item),'#ffe9a8'); if(typeof Tome!=='undefined')Tome.see('item',L.item); }
    this._emitUI(); },
  _campUse(C){ var R=C.T.r, ps=this.playerState, q=C.sec; SFX.pickup();
    if(R.k==='chest'){ var g=R.gold[0]+Math.floor(Math.random()*(R.gold[1]-R.gold[0]+1)); ps.gold+=g; this._floatText(C.x,C.y-44,'+'+g+'g','#ffd700');
      var it=R.items[Math.floor(Math.random()*R.items.length)], it2=R.items[Math.floor(Math.random()*R.items.length)]; this._campDrop(C,it,ITEMS[it]&&ITEMS[it].type==='ammo'?'ammo':'item',ITEMS[it]&&ITEMS[it].qty); if(it2!==it)this._campDrop(C,it2,ITEMS[it2]&&ITEMS[it2].type==='ammo'?'ammo':'item',ITEMS[it2]&&ITEMS[it2].qty);
      ps.campsDone=ps.campsDone||{}; ps.campsDone[C.id]=1; C.state='spent'; if(C.spr)C.spr.setFrame('2'); showNotif('💰 '+C.T.name+': '+g+' gold and treasure!','#ffd700'); }
    else if(R.k==='well'){ ps.hp=ps.maxHp; this._floatText(C.x,C.y-44,'Fully healed!','#80ff90'); C.state='used'; if(C.glow)C.glow.setAlpha(0.15); }
    else if(R.k==='mana'){ ps.mana=ps.maxMana; this._floatText(C.x,C.y-44,'Mana restored!','#9fc8ff'); C.state='used'; if(C.glow)C.glow.setAlpha(0.15); }
    else if(R.k==='buff'){ _heroBuffApply(ps,R.b,120000); this._floatText(C.x,C.y-44,{atkUp:'ATK +25%',defUp:'DEF +25%',spdUp:'SPD +25%'}[R.b]+' for 2 min','#ffe8a0'); C.state='used'; if(C.glow)C.glow.setAlpha(0.15); }
    else if(R.k==='xp'){ var xp=R.xp; ps.xp+=xp; this._floatText(C.x,C.y-44,'+'+xp+' XP — ancient knowledge','#aaddff'); this._checkLevelUp(ps); ps.campsDone=ps.campsDone||{}; ps.campsDone[C.id]=1; C.state='spent'; if(C.spr)C.spr.setFrame('2'); if(C.glow)C.glow.setVisible(false); }
    if(this._campPrompt){ this._campPrompt.destroy(); this._campPrompt=null; } this._emitUI(); },
  _campRespawn(C){ var self=this; C.state='guarded'; C.clearedAt=0; if(C.spr)C.spr.setFrame('0'); if(C.glow)C.glow.setVisible(true).setAlpha(0.45);
    C.loot.forEach(function(L){ L.im.destroy(); if(L.gl)L.gl.destroy(); }); C.loot=[];
    C.guards.forEach(function(m){ m.dead=false; if(m.mx)MX.reset(m); m.hp=m.maxHp; m.x=m.spawnX; m.y=m.spawnY; m.cont.setPosition(m.x,m.y).setAlpha(1).setScale(1); if(m.hpFill)m.hpFill.displayWidth=28; }); }
});
