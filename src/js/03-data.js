// Phase 3: the 1200 × 1200 continent (see 07e-world-map.js / 05b-world-build.js).
// CENTER_X/Y is the VILLAGE centre (on the Grasslands shore of Mirror Lake),
// not the middle of the map.
const WORLD_W=1200, WORLD_H=1200;
const CENTER_X=690, CENTER_Y=520;
const ISLAND_RADIUS=265; var VILLAGE_RADIUS=26;   // ISLAND_RADIUS: legacy (old round island), unused by the new world
const CHUNK=16; // tiles per dynamic chunk

// ── Harbor Island Map constants (25% of main world) ──────────────────────
const ISL_W=150,ISL_H=150;       // island tile dimensions
const ISL_CX=75,ISL_CY=75;       // center tile
const ISL_R=68;                   // island radius in tiles
const ISL_VIL_R=14;               // village clear radius

// ── Island adventure spot definitions (one per section) ──────────────────
const ISL_ADV={
  // Each island has a dungeon; its guardian (HARBOR_ISLANDS[sec].boss) waits on the last floor and gives the familiar.
  1:{type:'dungeon',     label:'⚔️ Pirate Cave', icon:'⚔️', kind:'dungeon', design:'lake_ring',       floors:4},
  2:{type:'volcano',     label:'🍄 Bog Grotto',  icon:'🍄', kind:'dungeon', design:'mushroom_forest', floors:4},
  3:{type:'dungeon',     label:'🦇 Ember Cave',  icon:'🦇', kind:'dungeon', design:'ember',           floors:4, theme:'volcano'},   // round 6: was the old side-view Cave scene; design = the Lab's Ember Cave pick (07cb)
  4:{type:'tower_island',label:'🗼 Frost Spire', icon:'🗼', kind:'tower',   design:'moonglass',       floors:5},
};

// Section names & accents (0=village, 1-4=quadrants)
const SECTION_NAMES={0:'Village Center',1:'NE Grasslands',2:'SE Wetlands',3:'SW Highlands',4:'NW Ashlands'};
const SECTION_ACCENTS={0:'#ffdd88',1:'#aaffaa',2:'#aaccff',3:'#ffddaa',4:'#ffaa88'};

// Exploration fog: 1 cell = 8 tiles
const EXP_SCALE=8;
const EXP_W=Math.ceil(WORLD_W/EXP_SCALE);
const EXP_H=Math.ceil(WORLD_H/EXP_SCALE);
const EXP_REVEAL_R=5;   // cells (= 40 tiles)

// Region grid from the world map (0 = village + Mirror Lake, 1-4 = regions).
var _WREG=null, _WZONE=null, _WCLS=null;
function getTileSection(tx,ty){
  if(_WREG){ if(tx<0||ty<0||tx>=WORLD_W||ty>=WORLD_H)return 0; return _WREG[(ty|0)*WORLD_W+(tx|0)]; }
  const dx=tx-CENTER_X, dy=ty-CENTER_Y;
  if(Math.hypot(dx,dy)<VILLAGE_RADIUS) return 0;
  if(dx>=0 && dy<0) return 1;
  if(dx>=0 && dy>=0) return 2;
  if(dx<0 && dy>=0) return 3;
  return 4;
}
function isOnIsland(tx,ty){
  if(_WCLS){ if(tx<0||ty<0||tx>=WORLD_W||ty>=WORLD_H)return false; var c=_WCLS[(ty|0)*WORLD_W+(tx|0)]; return c!==WM.OCEAN&&c!==WM.SHALLOW; }
  return Math.hypot(tx-CENTER_X,ty-CENTER_Y)<ISLAND_RADIUS;
}

const T={
  GRASS:0,GRASS2:1,DIRT:2,PATH:3,TREE:4,ROCK:5,FLOWER:6,
  SHALLOW_WATER:7,DEEP_WATER:8,REED:9,MUD:10,LILY:11,
  ROCKY_GROUND:12,SMALL_BOULDER:13,LARGE_BOULDER:14,GRAVEL:15,DRY_GRASS:16,
  DARK_ROCK:20,ASH_GROUND:21,THIN_MAGMA:22,DEEP_MAGMA:23,OBSIDIAN:24,CLIFF:25,
  VILLAGE_FLOOR:40,STONE_FLOOR:41,BUILDING_WALL:42,DOOR:43,SAND:44,BRIDGE:45,STABLES_FLOOR:46,
  OCEAN:50,BEACH:51,REEF:52
};
const TILE_COLORS={
  [T.GRASS]:0x4a9a2e,[T.GRASS2]:0x5aaa3e,[T.DIRT]:0x9a7a50,[T.PATH]:0xc8a870,
  [T.TREE]:0x1a5a0a,[T.ROCK]:0x7a7a7a,[T.FLOWER]:0xdd88aa,
  [T.SHALLOW_WATER]:0x5090d0,[T.DEEP_WATER]:0x1840a0,[T.REED]:0x5a9a40,[T.MUD]:0x6a5030,[T.LILY]:0x3a8a20,
  [T.ROCKY_GROUND]:0x8a7860,[T.SMALL_BOULDER]:0x6a6050,[T.LARGE_BOULDER]:0x4a4035,[T.GRAVEL]:0xaaa090,[T.DRY_GRASS]:0xb8a050,
  [T.DARK_ROCK]:0x3a2820,[T.ASH_GROUND]:0x5a4840,[T.THIN_MAGMA]:0xdd4400,[T.DEEP_MAGMA]:0xaa1100,[T.OBSIDIAN]:0x181010,
  [T.VILLAGE_FLOOR]:0xd0c090,[T.STONE_FLOOR]:0xb0a888,[T.BUILDING_WALL]:0x907860,[T.DOOR]:0x6a4820,[T.SAND]:0xe0d090,[T.STABLES_FLOOR]:0xc09050,
  [T.OCEAN]:0x0a2060,[T.BEACH]:0xe8d090,
  [T.CLIFF]:0x5a5048,[T.BRIDGE]:0x8a6440,[T.REEF]:0x1d5c8c
};
// ─── Per-section tile colour palettes ───────────────────────────────────
// Keys match getTileSection() return values (0 = village).
// Only overridden tile types need entries — the rest fall back to TILE_COLORS.
const SECTION_TILE_COLORS={
  0:{ // Village — Autumn Harvest (brightened)
    [T.GRASS]:0xc8a840,[T.GRASS2]:0xd8b850,
    [T.TREE]:0x8a4a10,[T.DIRT]:0xbA9060,
    [T.PATH]:0xe8c870,[T.ROCK]:0xa09878,
    [T.FLOWER]:0xffbb55,
    [T.VILLAGE_FLOOR]:0xf0c870,[T.STONE_FLOOR]:0xc8a870,
    [T.BUILDING_WALL]:0xa07858,[T.DOOR]:0x703c18,
    [T.STABLES_FLOOR]:0xc09050,
  },
  1:{ // NE Grasslands — vivid spring greens
    [T.GRASS]:0x3a9a18,[T.GRASS2]:0x4aaa28,
    [T.TREE]:0x1a6808,[T.DIRT]:0x8a6838,
    [T.PATH]:0xc8a848,[T.ROCK]:0x7a7260,
    [T.FLOWER]:0xff88cc,
    [T.GRAVEL]:0xb8b098,[T.DRY_GRASS]:0xb0a848,
    [T.ROCKY_GROUND]:0x8a8068,
  },
  2:{ // SE Wetlands — swampy murky greens
    [T.GRASS]:0x2a6a28,[T.GRASS2]:0x386838,
    [T.TREE]:0x143818,[T.DIRT]:0x5a4828,
    [T.PATH]:0x8a7848,[T.ROCK]:0x4a4838,
    [T.FLOWER]:0x66dd88,
    [T.REED]:0x4a8030,[T.MUD]:0x5a4428,[T.LILY]:0x2a7820,
    [T.SHALLOW_WATER]:0x3a7870,[T.DEEP_WATER]:0x1a4848,
  },
  3:{ // SW Highlands — cool grey-brown rocky
    [T.GRASS]:0x788858,[T.GRASS2]:0x889868,
    [T.TREE]:0x4a6838,[T.DIRT]:0x887060,
    [T.PATH]:0xa09078,[T.ROCK]:0x707068,
    [T.FLOWER]:0xcc9944,
    [T.GRAVEL]:0xb0a898,[T.DRY_GRASS]:0xb8a870,
    [T.ROCKY_GROUND]:0x888070,
    [T.LARGE_BOULDER]:0x585048,[T.SMALL_BOULDER]:0x686058,
  },
  4:{ // NW Ashlands — dark volcanic ashy
    [T.GRASS]:0x3a3028,[T.GRASS2]:0x4a3e30,
    [T.TREE]:0x281808,[T.DIRT]:0x4a3828,
    [T.PATH]:0x5a4838,[T.ROCK]:0x3a3030,
    [T.FLOWER]:0xff4422,
    [T.DARK_ROCK]:0x302018,[T.ASH_GROUND]:0x4a3e38,
    [T.OBSIDIAN]:0x180c10,
    [T.THIN_MAGMA]:0xee4400,[T.DEEP_MAGMA]:0xaa1100,
  },
};

// Tiles that block movement (TREE removed — passable at 33% speed)
const ALWAYS_BLOCKED=new Set([T.ROCK,T.LARGE_BOULDER,T.DEEP_MAGMA,T.DEEP_WATER,T.BUILDING_WALL,T.OCEAN,T.CLIFF,T.REEF]);
// Signature terrain (Phase 3): walkable on foot but slow; a mount that lists
// the tile in canCross moves over it at full speed. (Deep water, large boulders
// and deep lava stay in ALWAYS_BLOCKED for anyone without such a mount.)
// Mounts that keep you safe from fire and magma (campfires, Ashlands lava crust)
var FIRE_SAFE_MOUNTS=['lava_unicorn','dragon','ash_salamander'];
function _fireSafeMount(ps){ return !!(ps&&ps.mount&&FIRE_SAFE_MOUNTS.indexOf(ps.mount)>=0); }
const FOOT_SLOW={[T.SHALLOW_WATER]:0.35,[T.REED]:0.5,[T.MUD]:0.45,[T.LILY]:0.45,[T.SMALL_BOULDER]:0.3,[T.THIN_MAGMA]:0.3};
function terrainSpeedMult(t,mount){
  var md=mount&&MOUNTS[mount];
  if(md){ if(mount==='dragon'||md.canCross==='all')return 1; if(Array.isArray(md.canCross)&&md.canCross.indexOf(t)>=0)return 1; }
  return FOOT_SLOW[t]||1;
}
// Tiles that destroy projectiles (trees tracked separately with treePen counter — 10 hits before blocked)
const PROJ_WALL_TILES=new Set([T.ROCK,T.SMALL_BOULDER,T.LARGE_BOULDER,T.DEEP_MAGMA,T.DEEP_WATER,T.BUILDING_WALL,T.OCEAN,T.CLIFF,T.REEF]);

const MOUNTS={
  horse:      {n:'Horse',       icon:'🐎',spdMult:1.6,cost:200,sec:1,desc:'Fast land travel'},
  // Key mounts (one per region's boss dungeon) — each crosses the NEXT region's
  // signature terrain at full speed (on foot it is slow, its deepest parts blocked).
  alligator:  {n:'Alligator',   icon:'🐊',spdMult:1.3,cost:0,  sec:1,canCross:[T.DEEP_WATER,T.SHALLOW_WATER,T.REED,T.MUD,T.LILY],desc:'Swims the Wetlands — water & marsh at full speed'},
  boar:       {n:'Battle Boar', icon:'🐗',spdMult:1.4,cost:0,  sec:2,canCross:[T.SMALL_BOULDER,T.LARGE_BOULDER],desc:'Charges through Highland boulder fields at full speed'},
  lava_unicorn:{n:'Lava Unicorn',icon:'🦄',spdMult:1.5,cost:0, sec:3,canCross:[T.THIN_MAGMA],desc:'Gallops over Ashland lava crust — no burns'},
  // id kept as ash_salamander so saves keep it; it is the Ash Dragon now
  ash_salamander:{n:'Ash Dragon',icon:'🐲',spdMult:1.7,cost:0,sec:4,canCross:[T.DEEP_WATER,T.SHALLOW_WATER,T.REED,T.MUD,T.LILY,T.SMALL_BOULDER,T.LARGE_BOULDER,T.THIN_MAGMA,T.DEEP_MAGMA],desc:'Every region\'s terrain at full speed, and the deep-lava causeways to the volcano isles'},
  dragon:     {n:'Dragon',      icon:'🐉',spdMult:2.0,cost:0,  sec:4,canCross:'land_and_deep',desc:'Flies over all terrain except sea water'},
  sky_eagle:  {n:'Sky Eagle',   icon:'🦅',spdMult:1.9,cost:0,  sec:4,canCross:'all',desc:'Swift aerial mount from the Sky Port'},
  // ── Skyport-exclusive mounts ─────────────────────────────────────────────
  sky_glider:   {n:'Sky Glider',    icon:'🪁',spdMult:1.8,cost:0,sec:1,desc:'Soars swiftly — Sky Port 1 reward'},
  storm_drake:  {n:'Storm Drake',   icon:'🐲',spdMult:2.0,cost:0,sec:2,canCross:'all',desc:'Electric drake — Sky Port 2'},
  ember_phoenix:{n:'Ember Phoenix', icon:'🦜',spdMult:1.9,cost:0,sec:3,canCross:[T.THIN_MAGMA],desc:'Blazing phoenix — Sky Port 3'},
  void_serpent: {n:'Void Serpent',  icon:'🐦',spdMult:2.2,cost:0,sec:4,canCross:'all',desc:'Shadow serpent — Sky Port 4'},
};
const FAMILIARS={
  // type: 'projectile' fires at nearest enemy | 'aoe' pulses around player
  firefly:    {n:'Firefly',     icon:'🪲',sec:1,atkInterval:3.0,dmg:5, type:'projectile',projSpeed:240,desc:'Ember Spark — ignites enemies, lights dungeons'},
  wind_sprite:{n:'Wind Sprite', icon:'🌀',sec:1,atkInterval:4.5,dmg:10,type:'aoe',       aoeR:65,      desc:'Gale Burst — damages and knocks enemies back'},
  sea_sprite: {n:'Sea Sprite',  icon:'🐡',sec:2,atkInterval:3.5,dmg:8, type:'projectile',projSpeed:280,desc:'Tide Ward — blocks a hit every 20 s, heals slowly'},
  storm_hawk: {n:'Storm Hawk',  icon:'🦉',sec:3,atkInterval:2.5,dmg:9, type:'projectile',projSpeed:320,desc:'Chain Lightning — jumps between 3 enemies'},
  frost_wisp: {n:'Frost Wisp',  icon:'❄️',sec:4,atkInterval:5.0,dmg:22,type:'aoe',       aoeR:85,      desc:'Frost Nova — damages and slows enemies 50%'},
};
// (familiar slots: _maxFamiliarSlots in 09d-familiars.js — 1 + Fairy Kings)
const MAIN_QUEST_DEFS={
  dungeon:{title:'Dungeon Crawl',   icon:'⚔️',desc:'Find the ★ dungeon, fight to the deepest floor and defeat the guardian at the exit portal. Reward: mount + gold.'},
  tower:  {title:'Tower Rescue',    icon:'🗼',desc:'Climb the ★ tower, defeat the guardian at the top and free the captive craftsman. Reward: next region + 2 rings.'},
  harbor: {title:'Island Expedition',icon:'⚓',desc:'Sail to the island and defeat the guardian at the bottom of its dungeon. Reward: a familiar.'},
  skyport:{title:'Sky Exploration', icon:'🎈',desc:'Defend the sky city through every wave. Reward: pick a weapon, sky mount or gem.'},
};
const MDEFS={
  // ── Section 1: NE Grasslands ────────────────────────────────────────────
  // Goblin: SWARM — fragile, fast, deals light damage. Glass cannon.
  goblin:      {name:'Goblin',       icon:'👺',hp:12, atk:5, def:0, xp:10,gMin:3, gMax:8,  sec:1,color:0x3a9a1a,r:10,spd:58, moveType:'pulse',    atkType:'melee',          lvMin:1, lvMax:3},
  // Skeleton: SOLDIER — moderate HP, ranged attacker, solid shield.
  skeleton:    {name:'Skeleton',     icon:'💀',hp:22, atk:4, def:3, xp:13,gMin:2, gMax:7,  sec:1,color:0xc8c8a0,r:10,spd:42, moveType:'normal',   atkType:'arrow',          lvMin:2, lvMax:3},
  // Goblin King: WARLORD — rush attacker, fires scatter arrows.
  goblin_king: {name:'Goblin King',  icon:'👑',hp:95, atk:9, def:4, xp:160,gMin:45,gMax:65,sec:1,color:0x228800,r:18,spd:50, moveType:'rush',     atkType:'scatter_arrow',boss:true,lvMin:4,lvMax:6},

  // ── Section 2: SE Wetlands ───────────────────────────────────────────────
  // Mud Troll: TANK — massive HP, slow, low ATK, tough to kill.
  mud_troll:   {name:'Mud Troll',    icon:'🧟',hp:55, atk:5, def:5, xp:22,gMin:6, gMax:14, sec:2,color:0x5a4a28,r:11,spd:34, moveType:'zigzag',   atkType:'stomp',          lvMin:4, lvMax:7},
  // Bog Serpent: STRIKER — low HP, very high ATK, zero defense. Fragile.
  bog_serpent: {name:'Bog Serpent',  icon:'🐍',hp:18, atk:12,def:0, xp:22,gMin:5, gMax:12, sec:2,color:0x2a8a4a,r:9, spd:74, moveType:'rush',     atkType:'bog_flame',      lvMin:3, lvMax:6},
  // Swamp Witch: CASTER — orbits, lobs flame. Boss.
  swamp_witch: {name:'Swamp Witch',  icon:'🧙',hp:140,atk:12,def:6, xp:210,gMin:70,gMax:95,sec:2,color:0x446633,r:18,spd:44, moveType:'orbit',    atkType:'flame',boss:true,lvMin:6, lvMax:9},

  // ── Section 3: SW Highlands ──────────────────────────────────────────────
  // Stone Golem: FORTRESS — ultra-high HP, very high DEF, slow, big stomp.
  stone_golem: {name:'Stone Golem',  icon:'🗿',hp:95, atk:7, def:9, xp:40,gMin:10,gMax:20, sec:3,color:0x7a7060,r:13,spd:24, moveType:'normal',   atkType:'stomp',          lvMin:7, lvMax:11},
  // Harpy: SKIRMISHER — very low HP, very high ATK, no defense. Hit-and-run.
  harpy:       {name:'Harpy',        icon:'🦅',hp:24, atk:14,def:0, xp:32,gMin:8, gMax:18, sec:3,color:0x8a5838,r:10,spd:85, moveType:'orbit',    atkType:'scatter',        lvMin:5, lvMax:9},
  // Iron Sentinel: ARMORED CANNON — medium HP, extreme DEF, high scatter dmg. Boss.
  iron_sentinel:{name:'Iron Sentinel',icon:'🤖',hp:180,atk:18,def:12,xp:310,gMin:110,gMax:145,sec:3,color:0x778899,r:20,spd:30,moveType:'normal',  atkType:'scatter',boss:true,lvMin:10,lvMax:14},

  // ── Section 4: NW Ashlands ───────────────────────────────────────────────
  // Fire Imp: BERSERKER — medium HP, very high ATK, low DEF. Aggressive zigzag.
  fire_imp:    {name:'Fire Imp',     icon:'😈',hp:52, atk:17,def:2, xp:50,gMin:15,gMax:28, sec:4,color:0xcc3300,r:10,spd:78, moveType:'zigzag',   atkType:'heat_seek',      lvMin:11, lvMax:15},
  // Ash Wraith: PHANTOM — high HP, moderate ATK, high DEF. Teleports.
  ash_wraith:  {name:'Ash Wraith',   icon:'👻',hp:78, atk:11,def:8, xp:55,gMin:18,gMax:30, sec:4,color:0x7a5870,r:10,spd:56, moveType:'teleport', atkType:'heat_seek',      lvMin:13, lvMax:17},
  // Shadow Lord: APEX PREDATOR — all-round elite. Boss.
  shadow_lord: {name:'Shadow Lord',  icon:'👹',hp:260,atk:28,def:13,xp:460,gMin:180,gMax:230,sec:4,color:0x330033,r:22,spd:56,moveType:'teleport', atkType:'heat_seek',boss:true,lvMin:16,lvMax:20},

  // ── Dungeon-exclusive bosses ─────────────────────────────────────────────
  // Dark Warlock: teleport + heat-seeking. Sec1 dungeon final boss.
  dark_warlock:{name:'Dark Warlock', icon:'🧙',hp:75, atk:11,def:3, xp:160,gMin:45,gMax:65, sec:1,color:0x442288,r:18,spd:46, moveType:'teleport', atkType:'heat_seek',boss:true,lvMin:5, lvMax:10},
  // Storm Mage: strafes + lightning. Sec2 dungeon final boss.
  storm_mage:  {name:'Storm Mage',   icon:'⚡',    hp:120,atk:14,def:5, xp:210,gMin:70,gMax:95, sec:2,color:0x4466aa,r:18,spd:50, moveType:'strafe',   atkType:'lightning',boss:true,lvMin:8, lvMax:12},
  // Rock Dragon: rushes + scatter flame. Sec3 dungeon final boss.
  rock_dragon: {name:'Rock Dragon',  icon:'🐲',hp:200,atk:18,def:9, xp:310,gMin:110,gMax:145,sec:3,color:0x557788,r:20,spd:52, moveType:'rush',     atkType:'scatter_flame',boss:true,lvMin:12,lvMax:16},
  // Lava Titan: slow stomp machine. Sec4 dungeon final boss.
  lava_titan:  {name:'Lava Titan',   icon:'🌋',hp:290,atk:25,def:13,xp:460,gMin:180,gMax:230,sec:4,color:0xaa1100,r:22,spd:28, moveType:'normal',   atkType:'stomp',boss:true,lvMin:14,lvMax:19},
};

// ─── ITEMS ──────────────────────────────────────
var ITEMS={   // var: 03b-elements.js wraps it so gem-set ids (iron_helm~fire) resolve

  axe:         {name:"Woodcutter's Axe",icon:'🪓',atk:7, slot:'lHand',sell:200,buy:500,desc:'+7 ATK, chops trees for wood'},
  wood_log:    {name:'Wood Log',        icon:'🪵',goldVal:5,slot:'material',desc:'Sell for 5g each — max 99'},
  wooden_sword:{name:'Wooden Sword',icon:'🪵',atk:1, slot:'lHand',sell:1, desc:'+1 ATK — starting weapon'},
  iron_sword:  {name:'Iron Sword',  icon:'⚔️',atk:5, slot:'lHand',sell:15,buy:40, desc:'+5 ATK'},
  long_sword:  {name:'Long Sword',  icon:'🗡️',atk:10,slot:'lHand',sell:40,buy:100,secReq:2,desc:'+10 ATK'},
  great_sword: {name:'Great Sword', icon:'⚔️',atk:16,slot:'lHand',sell:100,buy:250,secReq:3,desc:'+16 ATK'},
  flame_blade: {name:'Flame Blade', icon:'🔥',atk:22,slot:'lHand',sell:200,buy:500,secReq:4,desc:'+22 ATK'},
  leather:     {name:'Leather Armor',icon:'🥋',def:3, slot:'body', sell:10,buy:30, desc:'+3 DEF'},
  chain_mail:  {name:'Chain Mail',  icon:'🔗',def:6, slot:'body', sell:35,buy:90, secReq:2,desc:'+6 DEF'},
  plate_armor: {name:'Plate Armor', icon:'🛡',def:10,slot:'body', sell:90,buy:220,secReq:3,desc:'+10 DEF'},
  dragon_armor:{name:'Dragon Armor',icon:'🐉',def:15,slot:'body', sell:180,buy:450,secReq:4,desc:'+15 DEF'},
  wood_shield: {name:'Wood Shield', icon:'🛡️',def:3, slot:'shield',sell:8, buy:25, desc:'+3 DEF'},
  iron_shield: {name:'Iron Shield', icon:'🛡️',def:6, slot:'shield',sell:30,buy:80, secReq:2,desc:'+6 DEF'},
  potion:      {name:'Health Potion',icon:'🧪',heal:25,slot:'use',sell:8,buy:25,desc:'Heals 25 HP'},
  elixir:      {name:'Elixir',       icon:'⚗️',heal:60,slot:'use',sell:20,buy:60,secReq:3,desc:'Heals 60 HP'},
  cup_empty:   {name:'Empty Cup',   icon:'🥛',slot:'misc',buy:200,sell:80,desc:'Bring it to the tavern to fill — 100g per refill.'},
  cup_filled:  {name:'Filled Cup',  icon:'🍶',slot:'food',heal:20,buy:0, sell:0, isCup:true,desc:'Heals 20 HP and grants a random 2-min buff (+25% ATK / DEF / SPD).'},
  // ── Pants (legs slot) ───────────────────────────────────────
  leather_pants: {name:'Leather Pants',  icon:'🦵',def:2,manaRegen:0.5,              slot:'pants', sell:8,  buy:20,          desc:'+2 DEF +0.5mp/s'},
  chain_leggings:{name:'Chain Leggings', icon:'🔗',def:5,              slot:'pants', sell:25, buy:70,  secReq:2,desc:'+5 DEF'},
  swift_leggings:{name:'Swift Leggings', icon:'🦵',def:3,  spdBonus:0.15,cdReduce:0.06,slot:'pants',sell:40, buy:100, secReq:2,desc:'+3 DEF +15% Spd -6%CD'},
  plate_leggings:{name:'Plate Leggings', icon:'🦵',def:8,cdReduce:0.08, slot:'pants', sell:70, buy:180, secReq:3,desc:'+8 DEF -8%CD'},
  swift_plate:   {name:'Swift Plate Legs',icon:'🦵',def:6, spdBonus:0.10,cdReduce:0.10,slot:'pants',sell:90, buy:220, secReq:3,desc:'+6 DEF +10% Spd -10%CD'},
  dragon_leggings:{name:'Dragon Leggings',icon:'🐉',def:12,spdBonus:0.10,cdReduce:0.12,slot:'pants',sell:150,buy:380, secReq:4,desc:'+12 DEF +10% Spd -12%CD'},
  // ── Gauntlets (gauntlets slot) ──────────────────────────────
  leather_gauntlets:{name:'Leather Gauntlets',icon:'🧤',def:1,              slot:'gauntlets',sell:5,  buy:15,          desc:'+1 DEF'},
  iron_gauntlets:{name:'Iron Gauntlets',  icon:'🧤',def:3,              slot:'gauntlets',sell:18, buy:50,  secReq:2,desc:'+3 DEF'},
  fire_gauntlets:{name:'Fire Gauntlets',  icon:'🔥',def:2,  atk:4,element:'fire',  elementDmg:4,slot:'gauntlets',sell:45, buy:120, secReq:2,desc:'+2 DEF +4 fire ATK'},
  ice_gauntlets: {name:'Ice Gauntlets',   icon:'❄️',def:2,  atk:4,element:'ice',   elementDmg:4,slot:'gauntlets',sell:45, buy:120, secReq:2,desc:'+2 DEF +4 ice ATK'},
  storm_gauntlets:{name:'Storm Gauntlets',icon:'⚡',   def:3,  atk:5,element:'light', elementDmg:5,slot:'gauntlets',sell:60, buy:160, secReq:3,desc:'+3 DEF +5 lightning ATK'},
  plate_gauntlets:{name:'Plate Gauntlets',icon:'🧤',def:6,              slot:'gauntlets',sell:70, buy:180, secReq:3,desc:'+6 DEF'},
  dragon_gauntlets:{name:'Dragon Gauntlets',icon:'🐉',def:8, atk:5,   slot:'gauntlets',sell:120,buy:300, secReq:4,desc:'+8 DEF +5 ATK'},
  // ── Tower Ring Rewards ────────────────────────────────────────
  ruby_ring:     {name:'Ruby Ring',      icon:'💍',atk:3,element:'fire',  elementDmg:2,manaRegen:0.5,slot:'ring',sell:35, buy:0, desc:'+3 ATK +2 fire +0.5mp/s — Tower reward'},
  speed_ring:    {name:'Speed Ring',     icon:'💍',spdBonus:0.12,         slot:'ring',sell:35, buy:0, desc:'+12% Speed — Tower reward'},
  sapphire_ring: {name:'Sapphire Ring',  icon:'💍',atk:3,element:'ice',   elementDmg:2,manaRegen:1.0,slot:'ring',sell:40, buy:0, desc:'+3 ATK +2 ice +1mp/s — Tower reward'},
  power_ring:    {name:'Power Ring',     icon:'💍',atk:5,                  slot:'ring',sell:40, buy:0, desc:'+5 ATK — Tower reward'},
  emerald_ring:  {name:'Emerald Ring',   icon:'💍',atk:3,element:'light', elementDmg:2,cdReduce:0.06,slot:'ring',sell:45, buy:0, desc:'+3 ATK +2 lightning -6%CD — Tower reward'},
  warding_ring:  {name:'Warding Ring',   icon:'💍',def:5,manaRegen:0.5,   slot:'ring',sell:45, buy:0, desc:'+5 DEF +0.5mp/s — Tower reward'},
  dragon_ring:   {name:'Dragon Ring',    icon:'🐉',atk:5,def:5,cdReduce:0.04,slot:'ring',sell:80, buy:0, desc:'+5 ATK +5 DEF -4%CD — Tower reward'},
  celestial_ring:{name:'Celestial Ring', icon:'✨',   atk:4,def:4,spdBonus:0.08,cdReduce:0.05,manaRegen:1.0,slot:'ring',sell:80, buy:0, desc:'+4 ATK +4 DEF +8% Spd -5%CD +1mp/s — Tower reward'},
  gem_ruby:    {name:'Ruby',         icon:'💎',goldVal:50, slot:'gem',desc:'Worth 50g — fire crafting'},
  gem_sapphire:{name:'Sapphire',     icon:'💠',goldVal:80, slot:'gem',desc:'Worth 80g — ice crafting'},
  gem_emerald: {name:'Emerald',      icon:'🟢',goldVal:120,slot:'gem',desc:'Worth 120g — lightning crafting'},
  pearl:       {name:'Pearl',        icon:'💫',goldVal:60, slot:'gem',desc:'Worth 60g — harbor loot'},
  skystone:    {name:'Skystone',     icon:'✨',    goldVal:200,slot:'gem',desc:'Worth 200g — sky loot'},
  volcano_key_n:{name:'Ember Key (N)',  icon:'🔥',slot:'key',sell:0,desc:'Forged from the NE Plains volcano. One of four keys to the Volcano Lord.'},
  volcano_key_e:{name:'Magma Key (E)',  icon:'🟧',slot:'key',sell:0,desc:'Forged from the SE Wetlands volcano. One of four keys to the Volcano Lord.'},
  volcano_key_s:{name:'Obsidian Key (S)',icon:'🟫',slot:'key',sell:0,desc:'Forged from the SW Highlands volcano. One of four keys to the Volcano Lord.'},
  volcano_key_w:{name:'Ashfire Key (W)',icon:'🌋',slot:'key',sell:0,desc:'Forged from the NW Ashlands volcano. One of four keys to the Volcano Lord.'},
  // ── Harbor / Sky Exclusive Weapons & Shields ─────────────────────────────
  sea_trident:      {name:'Sea Trident',      icon:'🔱',atk:12, slot:'lHand', sell:55, buy:0, secReq:2, desc:'+12 ATK — razor-tipped trident from Corsair Isle'},
  sea_shell_buckler:{name:'Sea Shell Buckler',icon:'🛡️',def:5, atk:2, slot:'shield',sell:40, buy:0, secReq:2, desc:'+5 DEF +2 ATK — crafted from giant shells'},
  flame_sword:      {name:'Flame Sword',      icon:'🔥',atk:16, slot:'lHand', sell:90, buy:0, secReq:3, desc:'+16 ATK — sky-forged, elemental fire edge'},
  sky_sword:        {name:'Sky Sword',        icon:'🌟',atk:28, slot:'lHand', sell:200,buy:0, secReq:4, desc:'+28 ATK — legendary sky-forged blade'},
  // ── Tier 1 Crafted Weapons (base sword + 1 gem + 200-500g) ──────────────
  flame_iron:  {name:'Flame Iron',   icon:'🔥',atk:9, slot:'lHand',sell:25, crafted:true,element:'fire',  elementDmg:3, desc:'+9 ATK +3 fire dmg — Forge: Iron Sword+Ruby+200g'},
  frost_iron:  {name:'Frost Iron',   icon:'❄️',atk:8, slot:'lHand',sell:25, crafted:true,element:'ice',   elementDmg:3, desc:'+8 ATK +3 ice dmg (slows) — Forge: Iron Sword+Sapphire+300g'},
  thunder_iron:{name:'Thunder Iron', icon:'⚡',   atk:10,slot:'lHand',sell:30, crafted:true,element:'light',elementDmg:3, desc:'+10 ATK +3 lightning — Forge: Iron Sword+Emerald+400g'},
  // ── Tier 2 Crafted Weapons (long sword + 1 gem + 500-1000g) ─────────────
  inferno_edge:{name:'Inferno Edge', icon:'🔥',atk:15,slot:'lHand',sell:60, crafted:true,element:'fire',  elementDmg:6, desc:'+15 ATK +6 fire — Forge: Long Sword+Ruby+500g'},
  glacier_sword:{name:'Glacier Sword',icon:'❄️',atk:14,slot:'lHand',sell:60, crafted:true,element:'ice',   elementDmg:7, desc:'+14 ATK +7 ice (slows) — Forge: Long Sword+Sapphire+700g'},
  storm_blade: {name:'Storm Blade',  icon:'⚡',   atk:17,slot:'lHand',sell:70, crafted:true,element:'light',elementDmg:6, desc:'+17 ATK +6 lightning — Forge: Long Sword+Emerald+1000g'},
  // ── Tier 3 Crafted Weapons (great sword + 2 gems + 1500-2500g) ───────────
  magma_cleaver:{name:'Magma Cleaver',icon:'🔥',atk:24,slot:'lHand',sell:150,crafted:true,element:'fire',  elementDmg:10,desc:'+24 ATK +10 fire — Forge: Great Sword+2xRuby+1500g'},
  permafrost:  {name:'Permafrost',   icon:'❄️',atk:22,slot:'lHand',sell:150,crafted:true,element:'ice',   elementDmg:12,desc:'+22 ATK +12 ice — Forge: Great Sword+2xSapphire+1800g'},
  cyclone_blade:{name:'Cyclone Blade',icon:'⚡',   atk:26,slot:'lHand',sell:180,crafted:true,element:'light',elementDmg:10,desc:'+26 ATK +10 lightning — Forge: Great Sword+2xEmerald+2200g'},
  // ── Tier 4 Crafted Weapons (flame blade + gem + 3000-5000g) ─────────────
  volcano_lord:{name:'Volcano Lord', icon:'🌋',atk:32,slot:'lHand',sell:400,crafted:true,element:'fire',  elementDmg:15,desc:'+32 ATK +15 fire — Forge: Flame Blade+2xRuby+3000g'},
  absolute_zero:{name:'Absolute Zero',icon:'❄️',atk:30,slot:'lHand',sell:400,crafted:true,element:'ice',   elementDmg:18,desc:'+30 ATK +18 ice — Forge: Flame Blade+2xSapphire+3500g'},
  thunder_god: {name:'Thunder God',  icon:'⚡',   atk:35,slot:'lHand',sell:500,crafted:true,element:'light',elementDmg:16,desc:'+35 ATK +16 lightning — Forge: Flame Blade+2xEmerald+4000g'},
  // ── Ultimate (any Tier 4 + all 3 gems + 5000g) ───────────────────────────
  elemental_sovereign:{name:'Elemental Sovereign',icon:'✨',atk:45,slot:'lHand',sell:800,crafted:true,element:'all',elementDmg:20,desc:'+45 ATK +20 all elements — Forge: Volcano Lord+Ruby+Sapphire+Emerald+5000g'},
  // AMMO — arrows (for bows) and darts (for crossbows). Stored in ps.ammo[id]=qty
  arrow_normal:  {name:'Normal Arrow',       icon:'🏹',type:'ammo',ammoFor:'bow', subtype:'normal',buy:5, sell:2,qty:10,secReq:1,desc:'Standard arrow × 10 per purchase'},
  arrow_cold:    {name:'Cold Arrow',         icon:'🧊',type:'ammo',ammoFor:'bow', subtype:'cold',  buy:15,sell:5,qty:5, secReq:2,desc:'Slows target 50% for 2s × 5 per purchase'},
  arrow_fire:    {name:'Fire Arrow',         icon:'🔥',type:'ammo',ammoFor:'bow', subtype:'fire',  buy:20,sell:7,qty:5, secReq:2,desc:'Explodes on impact — splash damage × 5 per purchase'},
  arrow_heat:    {name:'Heat-Seeking Arrow', icon:'🎯',type:'ammo',ammoFor:'bow', subtype:'heat',  buy:28,sell:10,qty:5,secReq:3,desc:'Homes in on nearest enemy × 5 per purchase'},
  dart_normal:   {name:'Normal Dart',        icon:'🪃',type:'ammo',ammoFor:'xbow',subtype:'normal',buy:8, sell:3,qty:10,secReq:2,desc:'Standard dart × 10 per purchase'},
  dart_cold:     {name:'Cold Dart',          icon:'❄️',type:'ammo',ammoFor:'xbow',subtype:'cold',  buy:22,sell:8,qty:5, secReq:2,desc:'Slows target 50% for 2s × 5 per purchase'},
  dart_fire:     {name:'Fire Dart',          icon:'💥',type:'ammo',ammoFor:'xbow',subtype:'fire',  buy:30,sell:11,qty:5,secReq:3,desc:'Explodes on impact — splash damage × 5 per purchase'},
  dart_heat:     {name:'Heat-Seeking Dart',  icon:'🎯',type:'ammo',ammoFor:'xbow',subtype:'heat',  buy:40,sell:15,qty:5,secReq:3,desc:'Homes in on nearest enemy × 5 per purchase'},

  // ═══════════════════════════════════════════════════════════════════
  // RANGED WEAPONS (rHand) — shoot with CTRL, projectile or magic
  // ═══════════════════════════════════════════════════════════════════
  short_bow:      {name:'Short Bow',        icon:'🏹',atk:6,  slot:'rHand',sell:12, buy:35,                desc:'+6 RNG ATK — starter bow'},
  hunting_bow:    {name:'Hunting Bow',       icon:'🏹',atk:9,  slot:'rHand',sell:20, buy:60,                desc:'+9 RNG ATK — improved aim'},
  crossbow:       {name:'Crossbow',          icon:'🏹',atk:13, slot:'rHand',sell:35, buy:110, secReq:2,     desc:'+13 RNG ATK — slow reload, hard hit'},
  longbow:        {name:'Longbow',           icon:'🏹',atk:17, slot:'rHand',sell:60, buy:180, secReq:2,     desc:'+17 RNG ATK — long range'},
  bone_crossbow:  {name:'Bone Crossbow',     icon:'🏹',atk:21, slot:'rHand',sell:90, buy:260, secReq:3,     desc:'+21 RNG ATK — crafted from dungeon bones'},
  elven_bow:      {name:'Elven Bow',         icon:'🏹',atk:24, slot:'rHand',sell:130,buy:360, secReq:3,     desc:'+24 RNG ATK — lightweight precision'},
  sky_bow:        {name:'Sky Bow',           icon:'🏹',atk:28, slot:'rHand',sell:220,buy:580, secReq:4,     desc:'+28 RNG ATK — sky-forged, from Sky Port'},
  magic_wand:  {magic:true,name:'Magic Wand',        icon:'✨',    atk:10, slot:'mWeapon',spellMult:1.3,sell:30, buy:90,  secReq:2,     desc:'+10 MAGIC ATK, ×1.3 spell dmg — fires slow-bolt on CTRL'},
  ember_staff:  {magic:true,name:'Staff of Embers',   icon:'🔥',atk:15, slot:'mWeapon',spellMult:1.5,sell:55, buy:160, secReq:2,     element:'fire',  elementDmg:5, desc:'+15 ATK +5 fire, ×1.5 spell dmg — fires fireballs'},
  storm_staff:  {magic:true,name:'Storm Staff',       icon:'⚡',    atk:20, slot:'mWeapon',spellMult:1.7,sell:90, buy:270, secReq:3,     element:'light', elementDmg:7, desc:'+20 ATK +7 lightning, ×1.7 spell dmg — fires lightning bolt'},
  arcane_staff:   {magic:true,name:'Arcane Staff',      icon:'🔮',atk:26, slot:'mWeapon',spellMult:2.0,sell:180,buy:500, secReq:4,     element:'all',   elementDmg:8, desc:'+26 ATK +8 all elements, ×2.0 spell dmg — master mage weapon'},

  // ═══════════════════════════════════════════════════════════════════
  // HELMETS (head)
  // ═══════════════════════════════════════════════════════════════════
  cloth_cap:      {name:'Cloth Cap',         icon:'🪖',def:1,  slot:'head', sell:4,  buy:12,               desc:'+1 DEF — basic head protection'},
  leather_cap:    {name:'Leather Cap',       icon:'🪖',def:2,  slot:'head', sell:7,  buy:20,               desc:'+2 DEF — laced leather'},
  iron_helm:      {name:'Iron Helm',         icon:'🪖',def:4,manaRegen:0.5,slot:'head', sell:18, buy:55,  secReq:2,    desc:'+4 DEF +0.5mp/s — solid iron'},
  battle_helm:    {name:'Battle Helm',       icon:'🪖',def:5,cdReduce:0.08,slot:'head', sell:28, buy:80,  secReq:2,    desc:'+5 DEF -8%CD — full face guard'},
  mage_hood:      {name:'Mage Hood',         icon:'🪖',def:3,atk:4,manaRegen:1.5,maxMana:15,slot:'head',sell:35,buy:100,secReq:2,   desc:'+3 DEF +4 ATK +1.5mp/s +15MP — spellcasting'},
  great_helm:     {name:'Great Helm',        icon:'🪖',def:7,cdReduce:0.10,slot:'head', sell:55, buy:150, secReq:3,    desc:'+7 DEF -10%CD — heavy knight'},
  shadow_cowl:    {name:'Shadow Cowl',       icon:'🪖',def:5,atk:3,cdReduce:0.10,slot:'head',sell:60,buy:170,secReq:3,   desc:'+5 DEF +3 ATK -10%CD — assassin'},
  dragon_helm:    {name:'Dragon Helm',       icon:'🐉',def:10,cdReduce:0.12,manaRegen:0.5,slot:'head', sell:110,buy:310, secReq:4,    desc:'+10 DEF -12%CD +0.5mp/s — dragon-scale'},
  sky_crown:      {name:'Sky Crown',         icon:'👑',def:8,atk:4,cdReduce:0.10,manaRegen:1.0,slot:'head',sell:130,buy:380,secReq:4,  desc:'+8 DEF +4 ATK -10%CD +1mp/s — Sky Port'},
  arcane_circlet: {name:'Arcane Circlet',    icon:'🪖',def:4,atk:5,manaRegen:2.0,maxMana:25,slot:'head',sell:80,buy:240,secReq:3,   desc:'+4 DEF +5 ATK +2mp/s +25MP — arcane amplifier'},

  // ═══════════════════════════════════════════════════════════════════
  // BOOTS (feet)
  // ═══════════════════════════════════════════════════════════════════
  ragged_boots:   {name:'Ragged Boots',      icon:'🥾',def:1,  slot:'feet', sell:3,  buy:10,               desc:'+1 DEF — worn but functional'},
  leather_boots:  {name:'Leather Boots',     icon:'🥾',def:2,  slot:'feet', sell:6,  buy:18,               desc:'+2 DEF — sturdy leather'},
  ranger_boots:   {name:'Ranger Boots',      icon:'🥾',def:2,spdBonus:0.12,cdReduce:0.05,slot:'feet',sell:25,buy:70,secReq:1, desc:'+2 DEF +12% Spd -5%CD'},
  iron_boots:     {name:'Iron Boots',        icon:'🥾',def:4,manaRegen:0.5,slot:'feet', sell:22, buy:65,  secReq:2,    desc:'+4 DEF +0.5mp/s — heavy protection'},
  chain_boots:    {name:'Chain Boots',       icon:'🥾',def:5,cdReduce:0.06,slot:'feet', sell:30, buy:90,  secReq:2,    desc:'+5 DEF -6%CD — flexible chain'},
  swift_boots:    {name:'Swift Boots',       icon:'🥾',def:3,spdBonus:0.18,cdReduce:0.08,slot:'feet',sell:50,buy:140,secReq:3, desc:'+3 DEF +18% Spd -8%CD'},
  knight_boots:   {name:'Knight Boots',   icon:'🥾',def:7,cdReduce:0.06,manaRegen:0.5,slot:'feet', sell:65, buy:190, secReq:3,    desc:'+7 DEF -6%CD +0.5mp/s — plate greaves'},
  wind_walkers:   {name:'Wind Walkers',      icon:'🥾',def:4,spdBonus:0.22,cdReduce:0.12,slot:'feet',sell:80,buy:240,secReq:4, desc:'+4 DEF +22% Spd -12%CD'},
  dragon_boots:   {name:'Dragon Boots',      icon:'🐉',def:9,cdReduce:0.08,manaRegen:0.5,slot:'feet', sell:100,buy:290, secReq:4,    desc:'+9 DEF -8%CD +0.5mp/s — dragon-hide'},
  shadow_treads:  {name:'Shadow Treads',     icon:'🥾',def:6,spdBonus:0.14,cdReduce:0.10,manaRegen:0.5,slot:'feet',sell:90,buy:260,secReq:4, desc:'+6 DEF +14% Spd -10%CD +0.5mp/s'},

  // ═══════════════════════════════════════════════════════════════════
  // AMULETS (neck)
  // ═══════════════════════════════════════════════════════════════════
  bronze_amulet:  {name:'Bronze Amulet',     icon:'🧿',def:2,  slot:'neck', sell:8,  buy:25,               desc:'+2 DEF — crude but effective'},
  copper_pendant: {name:'Copper Pendant',    icon:'🧿',def:2,atk:1,slot:'neck',sell:12,buy:35,              desc:'+2 DEF +1 ATK'},
  jade_amulet:    {name:'Jade Amulet',       icon:'🧿',def:3,spdBonus:0.08,manaRegen:0.5,slot:'neck',sell:22,buy:65,secReq:1, desc:'+3 DEF +8% Spd +0.5mp/s'},
  silver_pendant: {name:'Silver Pendant',    icon:'⚪',    atk:3,manaRegen:0.5,slot:'neck', sell:20, buy:60,  secReq:2,    desc:'+3 ATK +0.5mp/s — silversmith'},
  iron_ward:      {name:'Iron Ward',         icon:'🧿',def:5,cdReduce:0.08,slot:'neck', sell:28, buy:85,  secReq:2,    desc:'+5 DEF -8%CD — blessed iron ward'},
  warriors_talis: {name:'Warrior Talisman',icon:'🧿',atk:6,cdReduce:0.10,slot:'neck', sell:45, buy:140, secReq:3,    desc:'+6 ATK -10%CD — warrior charm'},
  guardians_ward: {name:'Guardian Ward',  icon:'🧿',def:7,cdReduce:0.10,manaRegen:0.5,slot:'neck', sell:50, buy:160, secReq:3,    desc:'+7 DEF -10%CD +0.5mp/s'},
  sea_pearl_neck: {name:'Sea Pearl Necklace',icon:'💫',atk:3,def:3,manaRegen:1.0,slot:'neck',sell:60,buy:180,secReq:3,   desc:'+3 ATK +3 DEF +1mp/s — Harbor'},
  arcane_focus:   {name:'Arcane Focus',      icon:'🧿',atk:5,def:2,manaRegen:2.0,maxMana:20,slot:'neck',sell:65,buy:200,secReq:3,   desc:'+5 ATK +2 DEF +2mp/s +20MP — spell amplifier'},
  dragon_amulet:  {name:'Dragon Amulet',     icon:'🐉',atk:7,def:6,cdReduce:0.18,manaRegen:1.0,slot:'neck',sell:120,buy:350,secReq:4,  desc:'+7 ATK +6 DEF -18%CD +1mp/s — dragon-soul'},
  celestial_pend: {name:'Celestial Pendant', icon:'✨',    atk:5,def:5,spdBonus:0.06,cdReduce:0.12,manaRegen:1.5,slot:'neck',sell:100,buy:300,secReq:4, desc:'+5 ATK +5 DEF +6% Spd -12%CD +1.5mp/s'},

  // ═══════════════════════════════════════════════════════════════════
  // CLOAKS (back)
  // ═══════════════════════════════════════════════════════════════════
  wool_cloak:     {name:'Wool Cloak',        icon:'🧣',def:1,  slot:'back', sell:4,  buy:12,               desc:'+1 DEF — warm and basic'},
  travel_cloak:   {name:'Travel Cloak',      icon:'🧣',def:2,  slot:'back', sell:8,  buy:25,               desc:'+2 DEF — adventurer staple'},
  ranger_cloak:   {name:'Ranger Cloak',   icon:'🧣',def:2,spdBonus:0.10,cdReduce:0.06,slot:'back',sell:20,buy:60,secReq:1, desc:'+2 DEF +10% Spd -6%CD'},
  battle_cape:    {name:'Battle Cape',       icon:'🧣',def:4,cdReduce:0.08,slot:'back', sell:25, buy:75,  secReq:2,    desc:'+4 DEF -8%CD — warlord styling'},
  shadow_cloak:   {name:'Shadow Cloak',      icon:'🧣',def:4,atk:3,cdReduce:0.10,slot:'back',sell:40,buy:120,secReq:2,   desc:'+4 DEF +3 ATK -10%CD — twilight'},
  arcane_cloak:   {name:'Arcane Cloak',      icon:'🧣',def:4,atk:4,cdReduce:0.08,manaRegen:1.0,slot:'back',sell:55,buy:165,secReq:3,   desc:'+4 DEF +4 ATK -8%CD +1mp/s — spell thread'},
  dusk_mantle:    {name:'Dusk Mantle',       icon:'🧣',def:5,atk:3,cdReduce:0.08,manaRegen:0.5,slot:'back',sell:60,buy:180,secReq:3,   desc:'+5 DEF +3 ATK -8%CD +0.5mp/s'},
  phoenix_cape:   {name:'Phoenix Cape',      icon:'🧣',def:5,spdBonus:0.10,manaRegen:1.5,slot:'back',sell:70,buy:210,secReq:3, desc:'+5 DEF +10% Spd +1.5mp/s — fire-resistant'},
  captains_coat:  {name:'Captain Coat',   icon:'🧥',def:6,atk:3,cdReduce:0.10,slot:'back',sell:80,buy:240,secReq:3,   desc:'+6 DEF +3 ATK -10%CD — Harbor captain'},
  dragon_cape:    {name:'Dragon Cape',       icon:'🐉',def:8,atk:5,cdReduce:0.14,manaRegen:1.0,slot:'back',sell:120,buy:360,secReq:4,  desc:'+8 DEF +5 ATK -14%CD +1mp/s'},
  shadow_mantle:  {name:'Shadow Mantle',     icon:'🧣',def:7,atk:4,cdReduce:0.14,manaRegen:1.0,slot:'back',sell:100,buy:300,secReq:4,  desc:'+7 DEF +4 ATK -14%CD +1mp/s — void fabric'},

  // ═══════════════════════════════════════════════════════════════════
  // SPELL TOMES (spell slot) — cast with X (uses mana). Round 5: taught only by
  // the 16 mage towers (4 per quadrant, stronger each quadrant); never sold.
  // (item ids kept so old saves keep their tomes)
  // ═══════════════════════════════════════════════════════════════════
  frost_bolt_tome:{name:'Frost Bolt',        icon:'❄️',atk:12,slot:'spell',sell:0,secReq:1,spellId:'frost_bolt',   desc:'Fast bolt that slows what it hits'},
  sky_storm_tome: {name:'Arcane Burst',      icon:'💫',atk:9, slot:'spell',sell:0,secReq:1,spellId:'arcane_burst', desc:'Rapid 3-shot burst of magic bolts'},
  fireball_tome:  {name:'Fireball',          icon:'🔥',atk:15,slot:'spell',sell:0,secReq:1,spellId:'fireball',     desc:'Explodes on impact — area damage'},
  thorn_tome:     {name:'Thorn Snare',       icon:'🌿',atk:13,slot:'spell',sell:0,secReq:1,spellId:'thorn_snare',  desc:'A lash of thorns that roots what it hits in place'},
  arc_lightning:  {name:'Lightning Chain',   icon:'⚡',atk:18,slot:'spell',sell:0,secReq:2,spellId:'chain_lightning',desc:'Bolt bounces between up to 3 enemies'},
  ice_storm_tome: {name:'Ice Shards',        icon:'🧊',atk:19,slot:'spell',sell:0,secReq:2,spellId:'ice_shards',   desc:'Fan of 3 ice shards that slow'},
  thunder_storm:  {name:'Poison Mist',       icon:'🫧',atk:20,slot:'spell',sell:0,secReq:2,spellId:'poison_mist',  desc:'Lingering toxic cloud — poisons enemies for 4s'},
  tidal_tome:     {name:'Tidal Wave',        icon:'🌊',atk:22,slot:'spell',sell:0,secReq:2,spellId:'tidal_wave',   desc:'A wide wave that rolls through enemies and knocks them back'},
  flame_wave:     {name:'Flame Nova',        icon:'💥',atk:26,slot:'spell',sell:0,secReq:3,spellId:'flame_nova',   desc:'Radial fire burst around you — hits everything nearby'},
  lightning_bolt: {name:'Void Orb',          icon:'🌑',atk:28,slot:'spell',sell:0,secReq:3,spellId:'void_orb',     desc:'Slow heavy orb that passes through all enemies'},
  blizzard_tome:  {name:'Thunder Step',      icon:'🌩️',atk:28,slot:'spell',sell:0,secReq:3,spellId:'thunder_step', desc:'Teleport forward; lightning stuns everything where you stood'},
  spikes_tome:    {name:'Stone Spikes',      icon:'🪨',atk:30,slot:'spell',sell:0,secReq:3,spellId:'stone_spikes', desc:'Three lines of earth spikes that stun'},
  frost_storm_tome:{name:'Blizzard',         icon:'🌨️',atk:36,slot:'spell',sell:0,secReq:4,spellId:'blizzard',     desc:'A blizzard where you aim: slows and freezes everything inside'},
  void_blast:     {name:'Void Rift',         icon:'🟣',atk:42,slot:'spell',sell:0,secReq:4,spellId:'void_rift',    desc:'A lance of void that tears through every enemy in a line'},
  drain_tome:     {name:'Spirit Drain',      icon:'🩸',atk:36,slot:'spell',sell:0,secReq:4,spellId:'spirit_drain', desc:'Two spirit bolts that heal you for part of the damage'},
  inferno_tome:   {name:'Starfall',          icon:'🌠',atk:44,slot:'spell',sell:0,secReq:4,spellId:'starfall',     desc:'Five stars fall around where you aim'},

  // ═══════════════════════════════════════════════════════════════════
  // FOOD (food slot) — restore HP, eat with O
  // ═══════════════════════════════════════════════════════════════════
  wild_berries:   {name:'Wild Berries',      icon:'🍇',heal:8,  slot:'food', sell:2,  buy:5,                desc:'Restores 8 HP'},
  bread:          {name:'Bread',             icon:'🍞',heal:12, slot:'food', sell:3,  buy:8,                desc:'Restores 12 HP'},
  cheese:         {name:'Cheese',            icon:'🧀',heal:16, slot:'food', sell:4,  buy:11,               desc:'Restores 16 HP'},
  grilled_fish:   {name:'Grilled Fish',      icon:'🐟',heal:22, slot:'food', sell:6,  buy:16,               desc:'Restores 22 HP'},
  mushroom_stew:  {name:'Mushroom Stew',     icon:'🍄',heal:28, slot:'food', sell:8,  buy:22,  secReq:1,   desc:'Restores 28 HP — hearty dungeon mushrooms'},
  trail_mix:      {name:'Trail Mix',         icon:'🥜',heal:20, slot:'food', sell:5,  buy:14,               desc:'Restores 20 HP — quick energy'},
  honey:          {name:'Honey',             icon:'🍯',heal:30, slot:'food', sell:10, buy:28,  secReq:1,   desc:'Restores 30 HP — sticky sweet'},
  roast_meat:     {name:'Roast Meat',        icon:'🍖',heal:40, slot:'food', sell:12, buy:35,  secReq:2,   desc:'Restores 40 HP'},
  dungeon_ration: {name:'Dungeon Ration',    icon:'🍲',heal:35, slot:'food', sell:10, buy:28,  secReq:2,   desc:'Restores 35 HP — compact, lasts long'},
  feast_platter:  {name:'Grand Feast',       icon:'🍽️',heal:60,slot:'food',sell:25,buy:70,secReq:3,  desc:'Restores 60 HP — celebratory meal'},
  dragon_steak:   {name:'Dragon Steak',      icon:'🥩',heal:90, slot:'food', sell:50, buy:140, secReq:4,   desc:'Restores 90 HP — supremely rare'},

  // ═══════════════════════════════════════════════════════════════════
  // BODY ARMOR expansions (was 4, now 12)
  // ═══════════════════════════════════════════════════════════════════
  padded_armor:   {name:'Padded Armor',      icon:'🧥',def:2,  slot:'body', sell:5,  buy:15,               desc:'+2 DEF — quilted padding'},
  studded_leather:{name:'Studded Leather',   icon:'🥻',def:5,  slot:'body', sell:20, buy:60,  secReq:1,   desc:'+5 DEF — reinforced leather'},
  brigandine:     {name:'Brigandine',        icon:'🥻',def:7,  slot:'body', sell:30, buy:90,  secReq:2,   desc:'+7 DEF — riveted steel plates'},
  scale_mail:     {name:'Scale Mail',        icon:'🛡',def:8,  slot:'body', sell:45, buy:130, secReq:2,   desc:'+8 DEF — overlapping scale armor'},
  half_plate:     {name:'Half Plate',        icon:'🛡',def:11, slot:'body', sell:80, buy:240, secReq:3,   desc:'+11 DEF — partial plate coverage'},
  mage_robes:     {name:'Mage Robes',        icon:'🧥',def:5,atk:6,slot:'body',sell:70,buy:210,secReq:2,  desc:'+5 DEF +6 ATK — enchanted spellweave'},
  shadow_armor:   {name:'Shadow Armor',      icon:'🧥',def:9,atk:4,slot:'body',sell:90,buy:270,secReq:3,  desc:'+9 DEF +4 ATK — void-stitched leather'},
  sky_robe:       {name:'Sky Robe',          icon:'🧥',def:12,atk:5,slot:'body',sell:140,buy:420,secReq:4, desc:'+12 DEF +5 ATK — from Sky Port'},

  // ═══════════════════════════════════════════════════════════════════
  // SHIELDS expansions (was 2, now 10)
  // ═══════════════════════════════════════════════════════════════════
  buckler:        {name:'Buckler',           icon:'🛡️',def:2,slot:'shield',sell:5,buy:15,            desc:'+2 DEF — small quick parry shield'},
  round_shield:   {name:'Round Shield',      icon:'🛡️',def:4,slot:'shield',sell:15,buy:45,           desc:'+4 DEF — standard round shield'},
  bone_shield:    {name:'Bone Shield',       icon:'🛡️',def:5,slot:'shield',sell:22,buy:65,secReq:2,  desc:'+5 DEF — dungeon boss bones'},
  kite_shield:    {name:'Kite Shield',       icon:'🛡️',def:7,slot:'shield',sell:35,buy:100,secReq:2, desc:'+7 DEF — tall cavalry shield'},
  stormshield:    {name:'Stormshield',       icon:'🛡️',def:8,slot:'shield',sell:50,buy:150,secReq:3, desc:'+8 DEF — lightning-resistant alloy'},
  tower_shield:   {name:'Tower Shield',      icon:'🛡️',def:10,slot:'shield',sell:70,buy:210,secReq:3, desc:'+10 DEF — massive full-body cover'},
  sea_buckler:    {name:'Sea Buckler',       icon:'🐚',def:8,atk:3,slot:'shield',sell:80,buy:240,secReq:3, desc:'+8 DEF +3 ATK — harbor find, sea shell'},
  obsidian_shield:{name:'Obsidian Shield',   icon:'🛡️',def:11,slot:'shield',sell:100,buy:300,secReq:4, desc:'+11 DEF — volcanic obsidian'},
  dragon_shield:  {name:'Dragon Shield',     icon:'🐉',def:14,slot:'shield',sell:150,buy:440,secReq:4,     desc:'+14 DEF — dragon-bone reinforced'},
  aegis:          {name:'Aegis',             icon:'🛡️',def:16,atk:3,slot:'shield',sell:200,buy:600,secReq:4, desc:'+16 DEF +3 ATK — legendary shield'},

  // ═══════════════════════════════════════════════════════════════════
  // Area-specific dungeon drop potions (heal scales with area)
  potion_a1: {name:'Area 1 Potion', icon:'🧪',heal:10, slot:'use', sell:4,  buy:12,  secReq:1, desc:'Heals 10 HP (Area 1)'},
  potion_a2: {name:'Area 2 Potion', icon:'🧪',heal:20, slot:'use', sell:8,  buy:22,  secReq:2, desc:'Heals 20 HP (Area 2)'},
  potion_a3: {name:'Area 3 Potion', icon:'🧪',heal:30, slot:'use', sell:12, buy:35,  secReq:3, desc:'Heals 30 HP (Area 3)'},
  potion_a4: {name:'Area 4 Potion', icon:'🧪',heal:40, slot:'use', sell:18, buy:50,  secReq:4, desc:'Heals 40 HP (Area 4)'},
  // POTIONS expansions (was 2, now 10)
  // ═══════════════════════════════════════════════════════════════════
  minor_potion:   {name:'Minor Potion',      icon:'🧪',heal:12, slot:'use', sell:4,  buy:12,               desc:'Heals 12 HP — weak but cheap'},
  antidote:       {name:'Antidote',          icon:'💊',heal:8,  slot:'use', sell:5,  buy:15,               desc:'Heals 8 HP, cures poison'},
  mega_potion:    {name:'Mega Potion',       icon:'🧪',heal:80, slot:'use', sell:35, buy:100, secReq:2,    desc:'Heals 80 HP — concentrated brew'},
  life_flask:     {name:'Life Flask',        icon:'⚗️',heal:45,slot:'use',sell:18, buy:55,  secReq:2,    desc:'Heals 45 HP — reusable flask design'},
  grand_elixir:   {name:'Grand Elixir',      icon:'⚗️',heal:130,slot:'use',sell:70,buy:200, secReq:4,   desc:'Heals 130 HP — the finest brew'},
  strength_tonic: {name:'Strength Tonic',    icon:'🧪',heal:20, slot:'use', sell:15, buy:45,  secReq:2,    desc:'Heals 20 HP — temporarily boosts ATK'},
  speed_draught:  {name:'Speed Draught',     icon:'🧪',heal:15, slot:'use', sell:15, buy:45,  secReq:2,    desc:'Heals 15 HP — temporarily boosts Speed'},
  defense_brew:   {name:'Defense Brew',      icon:'🧪',heal:15, slot:'use', sell:15, buy:45,  secReq:2,    desc:'Heals 15 HP — temporarily boosts DEF'},
  // ─── Pants expansions (to 10) ──────────────────────────────────────────
  battle_leggings:{name:'Battle Leggings',   icon:'🦵',def:4,cdReduce:0.06,slot:'pants', sell:15, buy:45,  secReq:1,  desc:'+4 DEF -6%CD — warrior pants'},
  shadow_leggings:{name:'Shadow Leggings',   icon:'🦵',def:5,atk:2,cdReduce:0.08,manaRegen:0.5,slot:'pants',sell:35,buy:100,secReq:3, desc:'+5 DEF +2 ATK -8%CD +0.5mp/s'},
  arcane_leggings:{name:'Arcane Leggings',   icon:'🦵',def:4,atk:4,manaRegen:1.0,slot:'pants',sell:50,buy:150,secReq:3, desc:'+4 DEF +4 ATK +1mp/s — spell-woven'},
  sky_leggings:   {name:'Sky Leggings',      icon:'🦵',def:7,spdBonus:0.12,cdReduce:0.08,manaRegen:0.5,slot:'pants',sell:90,buy:270,secReq:4, desc:'+7 DEF +12% Spd -8%CD +0.5mp/s'},

  // ─── Gauntlets expansions (to 10) ──────────────────────────────────────
  battle_gauntlets:{name:'Battle Gauntlets', icon:'🧤',def:2,  slot:'gauntlets',sell:8,buy:22,secReq:1,   desc:'+2 DEF — reinforced fighting gloves'},
  shadow_gauntlets:{name:'Shadow Gauntlets', icon:'🧤',def:4,atk:3,slot:'gauntlets',sell:40,buy:120,secReq:3, desc:'+4 DEF +3 ATK — dark-stitched gloves'},
  arcane_gauntlets:{name:'Arcane Gauntlets', icon:'🧤',def:3,atk:6,slot:'gauntlets',sell:55,buy:170,secReq:3, desc:'+3 DEF +6 ATK — amplify spellpower'},

  // ─── Gem expansions (to 10) ─────────────────────────────────────────────
  raw_iron:       {name:'Raw Iron',          icon:'🗾',goldVal:20, slot:'gem',desc:'Worth 20g — common ore'},
  rough_crystal:  {name:'Rough Crystal',     icon:'💠',goldVal:35, slot:'gem',desc:'Worth 35g — dungeon crystal'},
  dungeon_coin:   {name:'Dungeon Coin',      icon:'🪙',goldVal:15, slot:'gem',desc:'Worth 15g — ancient currency'},
  fire_opal:      {name:'Fire Opal',         icon:'🧡',goldVal:90, slot:'gem',desc:'Worth 90g — rare fire opal'},
  moon_shard:     {name:'Moon Shard',        icon:'🌙',goldVal:150,slot:'gem',desc:'Worth 150g — sky loot'},
  // ─── Special Abilities (special slot) — taught by the castle masters (07t), activate with Z ──────
  sp_sprint:      {name:'Sprint',       icon:'🏃',slot:'special',skillId:'sprint',      cd:8,  secReq:1,buy:60, sell:20,desc:'Z: 2× speed for 3 seconds (no cost)'},
  sp_roll:        {name:'Roll',         icon:'🔄',slot:'special',skillId:'roll',        cd:4,  secReq:1,buy:50, sell:15,desc:'Z: Dash 3 tiles + 0.6s invincibility'},
  sp_blink:       {name:'Blink',        icon:'✨',slot:'special',skillId:'blink',       cd:8,  secReq:2,buy:120,sell:40,desc:'Z: Teleport 5 tiles forward through walls'},
  sp_war_stomp:   {name:'War Stomp',    icon:'👊',slot:'special',skillId:'war_stomp',   cd:10, secReq:3,buy:110,sell:35,desc:'Z: Shockwave stuns + damages all nearby enemies'},
  sp_whirlwind:   {name:'Whirlwind',    icon:'🌀',slot:'special',skillId:'whirlwind',   cd:8,  secReq:1,buy:100,sell:30,desc:'Z: Spin-attack all adjacent enemies, push them back'},
  sp_smokebomb:   {name:'Smoke Bomb',   icon:'💨',slot:'special',skillId:'smoke_bomb',  cd:16, secReq:2,buy:90, sell:28,desc:'Z: Drop smoke cloud — enemies lose aggro for 4s'},
  sp_shieldbash:  {name:'Shield Bash',  icon:'🛡️',slot:'special',skillId:'shield_bash', cd:8,  secReq:2,buy:130,sell:40,desc:'Z: Charge + stun first enemy (requires shield)'},
  sp_berserker:   {name:'Berserker',    icon:'⚔️',slot:'special',skillId:'berserker',   cd:25, secReq:3,buy:200,sell:65,desc:'Z: 2× ATK + 1.5× speed, −50% DEF for 5s'},
  sp_secondwind:  {name:'Second Wind',  icon:'💚',slot:'special',skillId:'second_wind',  cd:45, secReq:3,buy:180,sell:55,desc:'Z: Instantly restore 30% max HP'},
  sp_phantom:     {name:'Phantom Veil', icon:'👻',slot:'special',skillId:'phantom_veil', cd:20, secReq:4,buy:250,sell:80,desc:'Z: Phase through enemies + invulnerable for 3s'},
  sp_timeslow:    {name:'Time Slow',    icon:'⏳',slot:'special',skillId:'time_slow',    cd:24, secReq:4,buy:280,sell:90,desc:'Z: Enemies near you move and attack at 30% speed for 4s'},
  sp_meteor:      {name:'Meteor Strike',icon:'☄️',slot:'special',skillId:'meteor',       cd:18, secReq:4,buy:300,sell:95,desc:'Z: Call a meteor onto the nearest enemy — big area damage + burn'},
};

// ─── Spell Definitions ──────────────────────────────────────────────────────
var SPELL_DATA={
  frost_bolt:    {manaCost:8,  cooldown:0.8, proj:{spd:340,r:6,col:0x88ddff,count:1}, effect:'slow',  effectDur:2.0, name:'Frost Bolt'},
  fireball:      {manaCost:15, cooldown:1.2, proj:{spd:260,r:8,col:0xff6600,count:1}, effect:'splash',splashR:80,   name:'Fireball'},
  chain_lightning:{manaCost:12,cooldown:1.0, proj:{spd:420,r:5,col:0xffff66,count:1}, effect:'chain', chainN:3,     name:'Lightning Chain'},
  flame_nova:    {manaCost:20, cooldown:1.5, aoe:{r:90,col:0xff4400},                 effect:'nova',                 name:'Flame Nova'},
  ice_shards:    {manaCost:14, cooldown:1.1, proj:{spd:300,r:5,col:0xaaddff,count:3,spread:0.35},effect:'slow',effectDur:1.5,name:'Ice Shards'},
  void_orb:      {manaCost:18, cooldown:1.8, proj:{spd:140,r:10,col:0x6600cc,count:1,pierce:true},effect:'none', name:'Void Orb'},
  meteor:        {manaCost:25, cooldown:2.5, delay:1.0,aoe:{r:100,col:0xff8800},      effect:'splash',splashR:100,  name:'Meteor Strike'},
  thunder_step:  {manaCost:22, cooldown:3.0, teleportDist:130,aoe:{r:80,col:0xffff44},effect:'stun', stunDur:1.5,  name:'Thunder Step'},
  poison_mist:   {manaCost:16, cooldown:2.0, cloud:{r:60,dur:4.0,col:0x44cc44},       effect:'poison',poisonDps:4,  name:'Poison Mist'},
  arcane_burst:  {manaCost:10, cooldown:0.3, proj:{spd:280,r:4,col:0xdd88ff,count:3,burstDelay:0.12},effect:'none',name:'Arcane Burst'},
  thorn_snare:   {manaCost:10, cooldown:1.0, proj:{spd:320,r:6,col:0x70d050,count:1},effect:'root',effectDur:1.4,name:'Thorn Snare'},
  tidal_wave:    {manaCost:16, cooldown:1.6, proj:{spd:230,r:15,col:0x50b0ff,count:1,pierce:true},effect:'kb',name:'Tidal Wave'},
  stone_spikes:  {manaCost:20, cooldown:1.6, proj:{spd:380,r:9,col:0xb08050,count:3,spread:0.18,pierce:true},effect:'stun_short',effectDur:0.8,name:'Stone Spikes'},
  blizzard:      {manaCost:28, cooldown:2.8, cloud:{r:95,dur:5,col:0xc8f0ff,at:'aim',st:'slow'},poisonDps:10,name:'Blizzard'},
  void_rift:     {manaCost:26, cooldown:2.0, proj:{spd:540,r:9,col:0x9030ff,count:1,pierce:true},effect:'none',name:'Void Rift'},
  spirit_drain:  {manaCost:22, cooldown:1.4, proj:{spd:330,r:7,col:0x80ffc0,count:2,spread:0.2},effect:'drain',name:'Spirit Drain'},
  starfall:      {manaCost:34, cooldown:3.2, delay:0.8, n:5, aoe:{r:70,col:0xfff0a0},effect:'splash',name:'Starfall'},
};

// ─── Blacksmith Craft Recipes ────────────────────────────────────────────
// Each recipe: {result, needs:{item_id:count,...}, gold, desc}
const CRAFT_RECIPES=[
  // ── Fire chain: each tier consumes 1 ruby ──────────────────────────────
  {result:'flame_iron',   needs:{iron_sword:1,    gem_ruby:1},     gold:200,  label:'Flame Iron',    tier:1, chain:'fire'},
  {result:'inferno_edge', needs:{flame_iron:1,    gem_ruby:1},     gold:500,  label:'Inferno Edge',  tier:2, chain:'fire'},
  {result:'magma_cleaver',needs:{inferno_edge:1,  gem_ruby:1},     gold:1500, label:'Magma Cleaver', tier:3, chain:'fire'},
  {result:'volcano_lord', needs:{magma_cleaver:1, gem_ruby:1},     gold:3000, label:'Volcano Lord',  tier:4, chain:'fire'},
  // ── Ice chain: each tier consumes 1 sapphire ───────────────────────────
  {result:'frost_iron',   needs:{iron_sword:1,    gem_sapphire:1}, gold:300,  label:'Frost Iron',    tier:1, chain:'ice'},
  {result:'glacier_sword',needs:{frost_iron:1,    gem_sapphire:1}, gold:700,  label:'Glacier Sword', tier:2, chain:'ice'},
  {result:'permafrost',   needs:{glacier_sword:1, gem_sapphire:1}, gold:1800, label:'Permafrost',    tier:3, chain:'ice'},
  {result:'absolute_zero',needs:{permafrost:1,    gem_sapphire:1}, gold:3500, label:'Absolute Zero', tier:4, chain:'ice'},
  // ── Thunder chain: each tier consumes 1 emerald ────────────────────────
  {result:'thunder_iron', needs:{iron_sword:1,    gem_emerald:1},  gold:400,  label:'Thunder Iron',  tier:1, chain:'thunder'},
  {result:'storm_blade',  needs:{thunder_iron:1,  gem_emerald:1},  gold:1000, label:'Storm Blade',   tier:2, chain:'thunder'},
  {result:'cyclone_blade',needs:{storm_blade:1,   gem_emerald:1},  gold:2200, label:'Cyclone Blade', tier:3, chain:'thunder'},
  {result:'thunder_god',  needs:{cyclone_blade:1, gem_emerald:1},  gold:4000, label:'Thunder God',   tier:4, chain:'thunder'},
  // ── Ultimate: all three Tier 4 weapons + skystone (sky-loot rarity) ────
  {result:'elemental_sovereign',needs:{volcano_lord:1,absolute_zero:1,thunder_god:1,skystone:1},gold:5000,label:'Elemental Sovereign',tier:5,chain:'ultimate'},
];
const BOSS_REWARDS={
  s1_dungeon:{mount:'alligator',   message:'🐊 Alligator mount unlocked!',   color:'#44ffaa'},
  s2_dungeon:{mount:'boar',        message:'🐗 Battle Boar mount unlocked!',  color:'#ffaa44'},
  s3_dungeon:{mount:'lava_unicorn',message:'🦄 Lava Unicorn mount unlocked!', color:'#ff88ff'},
  s4_dungeon:{mount:'ash_salamander',message:'🐲 Ash Dragon mount unlocked — water, boulders and lava are all open road now!',color:'#ff8844'},
  s1_tower:  {unlockSection:2,rings:['ruby_ring','speed_ring'],message:'🌿 SE Wetlands unlocked! Found 2 rings!',color:'#44aaff'},
  s2_tower:  {unlockSection:3,rings:['sapphire_ring','power_ring'],message:'🏔️ SW Highlands unlocked! Found 2 rings!',color:'#ffddaa'},
  s3_tower:  {unlockSection:4,rings:['emerald_ring','warding_ring'],message:'🌋 NW Ashlands unlocked! Found 2 rings!',color:'#ffaa66'},
  s4_tower:  {rings:['dragon_ring','celestial_ring'],message:'🗼 All tower quests cleared! Found 2 legendary rings!',color:'#ffdd44'},
};

