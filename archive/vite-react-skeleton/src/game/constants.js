// ═══════════════════════════════════════════════════
// WORLD LAYOUT
// ═══════════════════════════════════════════════════
export const TILE = 32;            // pixels per tile
export const WORLD_SEED = 12345;   // fixed seed = single persistent world

// Section tile bounds (x in tiles)
// S1(0-109) | River(110-114) | S2(115-224) | Boulders(225-229) | S3(230-339) | Magma(340-344) | S4(345-454)
export const SECTIONS = {
  1: { x: 0,   w: 110, y: 0, h: 120, theme: 'grasslands', name: 'The Grasslands', unlocked: true },
  2: { x: 115, w: 110, y: 0, h: 120, theme: 'wetlands',   name: 'The Wetlands',   unlocked: false },
  3: { x: 230, w: 110, y: 0, h: 120, theme: 'rocky',      name: 'The Highlands',  unlocked: false },
  4: { x: 345, w: 110, y: 0, h: 120, theme: 'volcanic',   name: 'The Ashlands',   unlocked: false },
};

export const BARRIERS = [
  { x: 110, w: 5,  type: 'river',   questKey: 's1_tower', bridgeTile: 17 },  // S1→S2
  { x: 225, w: 5,  type: 'boulders',questKey: 's2_tower', bridgeTile: 18 },  // S2→S3
  { x: 340, w: 5,  type: 'magma',   questKey: 's3_tower', bridgeTile: 19 },  // S3→S4
];

export const WORLD_W = 455;  // total tiles wide
export const WORLD_H = 120;  // tiles tall

// Village center (in section 1)
export const VILLAGE_X = 28;
export const VILLAGE_Y = 60;

// ═══════════════════════════════════════════════════
// TILE TYPES
// ═══════════════════════════════════════════════════
export const T = {
  // Section 1 – Grasslands
  GRASS:        0,
  GRASS2:       1,
  DIRT:         2,
  PATH:         3,
  TREE:         4,   // impassable
  ROCK:         5,   // impassable
  FLOWER:       6,

  // Section 2 – Wetlands
  SHALLOW_WATER: 7,  // slow (passable; alligator = normal speed)
  DEEP_WATER:    8,  // impassable (alligator can cross)
  REED:          9,
  MUD:           10,
  LILY:          11,

  // Section 3 – Highlands
  ROCKY_GROUND:  12,
  SMALL_BOULDER: 13, // impassable (boar can cross)
  LARGE_BOULDER: 14, // always impassable
  GRAVEL:        15,
  DRY_GRASS:     16,

  // Section 4 – Ashlands
  DARK_ROCK:     20,
  ASH_GROUND:    21,
  THIN_MAGMA:    22, // impassable (lava unicorn can cross)
  DEEP_MAGMA:    23, // always impassable
  OBSIDIAN:      24,

  // Barriers
  DEEP_RIVER:    30, // impassable barrier S1→S2
  BOULDER_WALL:  31, // impassable barrier S2→S3
  MAGMA_RIVER:   32, // impassable barrier S3→S4

  // Crossings (appear after quests)
  BRIDGE:        33,
  ELEVATOR:      34,
  METAL_BRIDGE:  35,

  // Village & structures
  VILLAGE_FLOOR: 40,
  STONE_FLOOR:   41,
  BUILDING_WALL: 42, // impassable
  DOOR:          43,
  SAND:          44,
  WATER_EDGE:    45,
  STABLES_FLOOR: 46,
  LAVA_FLOOR:    47, // deep magma impassable
};

// Tiles that are always impassable (no mount exception)
export const ALWAYS_BLOCKED = new Set([
  T.TREE, T.ROCK,
  T.LARGE_BOULDER,
  T.DEEP_MAGMA,
  T.DEEP_RIVER, T.BOULDER_WALL, T.MAGMA_RIVER,
  T.BUILDING_WALL,
]);

// Tiles blocked without the right mount
export const MOUNT_REQUIRED = {
  [T.DEEP_WATER]:    'alligator',
  [T.SHALLOW_WATER]: null,         // slow but passable on foot
  [T.SMALL_BOULDER]: 'boar',
  [T.THIN_MAGMA]:    'lava_unicorn',
};

// Tile display colors
export const TILE_COLORS = {
  [T.GRASS]:         0x4a9a2e,
  [T.GRASS2]:        0x5aaa3e,
  [T.DIRT]:          0x9a7a50,
  [T.PATH]:          0xc8a870,
  [T.TREE]:          0x1a5a0a,
  [T.ROCK]:          0x7a7a7a,
  [T.FLOWER]:        0xdd88aa,
  [T.SHALLOW_WATER]: 0x5090d0,
  [T.DEEP_WATER]:    0x1840a0,
  [T.REED]:          0x5a9a40,
  [T.MUD]:           0x6a5030,
  [T.LILY]:          0x3a8a20,
  [T.ROCKY_GROUND]:  0x8a7860,
  [T.SMALL_BOULDER]: 0x6a6050,
  [T.LARGE_BOULDER]: 0x4a4035,
  [T.GRAVEL]:        0xaaa090,
  [T.DRY_GRASS]:     0xb8a050,
  [T.DARK_ROCK]:     0x3a2820,
  [T.ASH_GROUND]:    0x5a4840,
  [T.THIN_MAGMA]:    0xdd4400,
  [T.DEEP_MAGMA]:    0xaa1100,
  [T.OBSIDIAN]:      0x181010,
  [T.DEEP_RIVER]:    0x0a3090,
  [T.BOULDER_WALL]:  0x3a3028,
  [T.MAGMA_RIVER]:   0xcc2200,
  [T.BRIDGE]:        0xb08030,
  [T.ELEVATOR]:      0x888878,
  [T.METAL_BRIDGE]:  0x887060,
  [T.VILLAGE_FLOOR]: 0xd0c090,
  [T.STONE_FLOOR]:   0xb0a888,
  [T.BUILDING_WALL]: 0x907860,
  [T.DOOR]:          0x6a4820,
  [T.SAND]:          0xe0d090,
  [T.WATER_EDGE]:    0x3070b8,
  [T.STABLES_FLOOR]: 0xc09050,
};

// ═══════════════════════════════════════════════════
// ADVENTURE SITES (per section)
// ═══════════════════════════════════════════════════
export const SITE_TYPES = ['dungeon', 'tower', 'camp', 'harbor', 'skyport'];

// Monster levels per section
export const SECTION_MONSTER_LEVEL = { 1: 1, 2: 2, 3: 3, 4: 4 };

// Dungeon depths per section
export const DUNGEON_DEPTHS = { 1: 3, 2: 4, 3: 5, 4: 6 };

// ═══════════════════════════════════════════════════
// MOUNTS
// ═══════════════════════════════════════════════════
export const MOUNTS = {
  horse:       { n: 'Horse',        icon: '🐎', spdMult: 1.6, cost: 200, section: 1, from: 'stables',   desc: 'Fast travel on land' },
  alligator:   { n: 'Alligator',    icon: '🐊', spdMult: 1.3, cost: 0,   section: 1, from: 's1_dungeon',desc: 'Cross shallow & deep water', canCross: [T.DEEP_WATER, T.SHALLOW_WATER] },
  boar:        { n: 'Battle Boar',  icon: '🐗', spdMult: 1.4, cost: 0,   section: 2, from: 's2_dungeon',desc: 'Smash through small boulders', canCross: [T.SMALL_BOULDER] },
  lava_unicorn:{ n: 'Lava Unicorn', icon: '🦄', spdMult: 1.5, cost: 0,   section: 3, from: 's3_dungeon',desc: 'Trot over thin magma', canCross: [T.THIN_MAGMA] },
  dragon:      { n: 'Dragon',       icon: '🐉', spdMult: 2.0, cost: 0,   section: 4, from: 's4_dungeon',desc: 'Fly over all terrain', canCross: 'all' },
};

// ═══════════════════════════════════════════════════
// FAMILIARS
// ═══════════════════════════════════════════════════
export const FAMILIARS = {
  water_sprite:    { n: 'Water Sprite',    icon: '💧', section: 1, from: 's1_skyport', attackRange: 10, attackType: 'water_blast',  healRate: 0 },
  eagle:           { n: 'Enchanted Eagle', icon: '🦅', section: 2, from: 's2_skyport', attackRange:  4, attackType: 'dart',         healRate: 0.5 },
  flame_elemental: { n: 'Flame Elemental', icon: '🔥', section: 3, from: 's3_skyport', attackRange: 10, attackType: 'multi_fireball',healRate: 0 },
  phoenix:         { n: 'Phoenix',         icon: '🦚', section: 4, from: 's4_skyport', attackRange:  5, attackType: 'dart_all',     healRate: 1.0 },
};

// ═══════════════════════════════════════════════════
// QUEST KEYS (main quests per section)
// ═══════════════════════════════════════════════════
export const MAIN_QUEST_KEYS = {
  1: ['s1_dungeon', 's1_tower', 's1_harbor', 's1_skyport'],
  2: ['s2_dungeon', 's2_tower', 's2_harbor', 's2_skyport'],
  3: ['s3_dungeon', 's3_tower', 's3_harbor', 's3_skyport'],
  4: ['s4_dungeon', 's4_tower', 's4_harbor', 's4_skyport'],
};
