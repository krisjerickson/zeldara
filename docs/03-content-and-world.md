# 03 — Content & World

## World geometry

```
const WORLD_W = 600;      // world width in tiles
const WORLD_H = 600;      // world height in tiles
const CENTER_X = 300;     // village center X (in tiles)
const CENTER_Y = 300;
const ISLAND_RADIUS = 265; // circular island — anything > this is ocean
const VILLAGE_RADIUS = 22; // safe zone at center
const TILE = 32;          // pixels per tile
```

**Camera zoom** on World: `setZoom(1.4)`.

### Sections (quadrants)

Section is derived from world tile coords via `getTileSection(tx, ty)`:

| Sec | Name | Quadrant | Logic |
|---|---|---|---|
| 0 | Village Center | center | `dist < VILLAGE_RADIUS` |
| 1 | NE Grasslands | NE | `dx >= 0 && dy < 0` |
| 2 | SE Wetlands | SE | `dx >= 0 && dy >= 0` |
| 3 | SW Highlands | SW | `dx < 0 && dy >= 0` |
| 4 | NW Ashlands | NW | (else) — lava/volcano biome |

Palettes per section live in `SECTION_TILE_COLORS`. Sections 1-4 match the boss theming (goblin/swamp/stone/lava).

## Tile enum `T`

```js
const T = {
  GRASS:0, GRASS2:1, DIRT:2, PATH:3, TREE:4, ROCK:5, FLOWER:6,
  SHALLOW_WATER:7, DEEP_WATER:8, REED:9, MUD:10, LILY:11,
  ROCKY_GROUND:12, SMALL_BOULDER:13, LARGE_BOULDER:14, GRAVEL:15, DRY_GRASS:16,
  DARK_ROCK:20, ASH_GROUND:21, THIN_MAGMA:22, DEEP_MAGMA:23, OBSIDIAN:24,
  VILLAGE_FLOOR:40, STONE_FLOOR:41, BUILDING_WALL:42, DOOR:43, SAND:44, STABLES_FLOOR:46,
  OCEAN:50, BEACH:51
};
```

- Tiles are 32×32 px. `TILE_COLORS` maps each to a hex color used by the chunk renderer.
- Chunks are 20×20 tiles; the world is rendered lazily via `_activeChunks` + `_createChunk` + `_refreshChunkAt`.
- **Lava damage**: `THIN_MAGMA` and `DEEP_MAGMA` deal DoT to the player unless mounted on `dragon` OR wearing lava boots (see `_updateLavaAndBurn`).

## Sites (adventure hubs on the world map)

Types: `dungeon`, `tower`, `harbor`, `skyport`, `camp`, plus the volcano types `volcano_main` and `volcano_mini` (final quest).

Each `s` in `wd.sites` has `{ type, section, tx, ty, id? }`. Rendered as a colored rectangle + icon + DOM label at `(tx*TILE+TILE*1.5, ty*TILE+TILE*1.5)`. Player interacts by walking onto the 3×3 tile area and pressing TAB (see `_checkInteraction` → `_interactSite`).

## Buildings (in the village)

Types: `tavern`, `shop`, `house`, `forge`, `guild`, `quest_board`, `stables`, `armory`, `clothing`, `jeweler`, `apothecary`, `merchant`.

Each `b` in `wd.buildings` has `{ type, worldX, worldY, w, h }`. TAB near door → enters `BuildingScene` for interior, which spawns an NPC of the matching `npcInfo[type]`. TAB on the NPC calls `_npcInteract` which dispatches (tavern menu, camp modal, forge, quest list, etc).

DOM labels above each building use the `#world-labels` overlay (see doc 07 concept — inline docs live in the code).

## Monsters (`MDEFS`)

Every monster def has: `name, icon, hp, atk, def, xp, gMin, gMax, sec, color, r, spd, moveType, atkType, lvMin, lvMax, [boss:true]`.

**Section 1 (NE):** goblin, skeleton, boss `goblin_king`
**Section 2 (SE):** mud_troll, bog_serpent, boss `swamp_witch`
**Section 3 (SW):** stone_golem, harpy, boss `iron_sentinel`
**Section 4 (NW):** fire_imp, ash_wraith, boss `shadow_lord`

Guardians actually used by the code (`DungeonScene._getBossKey`) — the older docs had these swapped:
- **Dungeon** guardians: goblin_king, swamp_witch, rock_dragon, lava_titan (s1–s4)
- **Tower** guardians: dark_warlock, storm_mage, iron_sentinel, shadow_lord (s1–s4)

Every last floor ends in a **boss arena**: the guardian spawns on the shortest path 3 tiles before the sealed exit portal (the boss-chest tile), is leashed there unless you are within 6 tiles, and the portal opens when it dies. Replays: guardian returns at +25% HP/ATK/DEF with a rematch reward (gold + gem + drop), first-clear rewards are not repeated. See `_ensureBossArena` in `12-scene-dungeon.js`.

**AtkTypes** (drive AI in the world/dungeon/island monster update):
- `melee`, `stomp` (AoE), `arrow`, `scatter_arrow`, `flame`, `bog_flame`, `scatter_flame`, `heat_seek`, `lightning`

Island scene got ranged AI ported in session #49 so all combat scenes now support the same atkTypes. Cave scene has its own chase AI (see doc 05 / cave section below).

**Sky scene** has its own enemy defs (scout/bomber/heavy planes) — completely different system.

## Mounts (`MOUNTS`)

```
horse         spdMult:1.6, cost:200, sec:1   — starting mount, has custom horse-rider sprites
alligator     spdMult:1.3, canCross:[SHALLOW_WATER, DEEP_WATER]
boar          spdMult:1.4, canCross:[SMALL_BOULDER]
lava_unicorn  spdMult:1.5, canCross:[THIN_MAGMA]
dragon        spdMult:2.0, canCross:'land_and_deep'  — final unlock, ALL 16 quests. Lava-immune.
sky_eagle     spdMult:1.9, canCross:'all', sec:4
sky_glider / storm_drake / ember_phoenix / void_serpent — Sky Port rewards
```

- Movement speed: `baseSpd = 180 * (mount?.spdMult ?? 1) * (1+spdBonus) * bogMult * spdBuffMult(1.25 if spdUp active) * shallowMult`.
- Only the horse mount uses custom sprites (`hero_horse_front/side/back_0..7`). Other mounts show the on-foot hero + a floating emoji icon overhead (unless mount === 'horse' — icon hidden there).

## Familiars (`FAMILIARS` + `FAMILIAR_ABILITIES`)

`FAMILIARS` (03-data.js) holds name/icon/section; abilities, damage and text live in `FAMILIAR_ABILITIES`
(09-hero-core.js). See doc 02 "Familiars v2" for the table.

- How to get them: Firefly / Sea Sprite / Storm Hawk / Frost Wisp = clear the NE / SE / SW / NW harbor island;
  Wind Sprite = first NE sky-port clear.
- Slots: 1 base, 2 at 2+ islands cleared, 3 at 4+ islands. N opens the picker (click to add/remove, ⓘ for details).

## Items (`ITEMS`)

Highlights:
- **Wooden Sword** (`wooden_sword`) — starting weapon, +1 ATK. Equipped by default.
- **Cup system** — `cup_empty` (200g at general shop), `cup_filled` (fill at tavern for 100g; drink → +20 HP + random +25% ATK/DEF/SPD buff for 2min).
- **Ammo** — `arrow_normal / arrow_cold / arrow_fire / arrow_heat`, `dart_*` for crossbows. Buy at Armory. Player starts with 0 ammo (session #64).
- **Melee weapons** — iron_sword (5), long_sword (10), great_sword (16), flame_blade (22), sky_sword (28).
- **Ranged** — short_bow (6), hunting_bow (9), crossbow (13), longbow (17), bone_crossbow (21).
- **Armor** — leather/chain_mail/plate_armor bodies, wood_shield/iron_shield shields, gems, rings, cloaks.
- **Volcano keys** — `volcano_key_n/e/s/w` (`slot:'key'`). Icons 🔥 🟧 🟫 🌋. Obtained from mini-volcanoes.
- **Legendary weapon** — `elemental_sovereign` (+45 ATK, +20 all elements). Awarded from Volcano Lord boss rush.

## Craft recipes (blacksmith)

Every elemental weapon in each chain requires a gem (fixed session #63):
- **Fire chain** (flame_iron → inferno_edge → magma_cleaver → volcano_lord) — each tier needs 1 `gem_ruby`.
- **Ice chain** (frost_iron → glacier_sword → permafrost → absolute_zero) — each tier needs 1 `gem_sapphire`.
- **Thunder chain** (thunder_iron → storm_blade → cyclone_blade → thunder_god) — each tier needs 1 `gem_emerald`.
- **Elemental Sovereign** — needs `volcano_lord + absolute_zero + thunder_god + 1 skystone + 5000g`.

## Base quests (`MAIN_QUEST_DEFS`)

Four types, four sections, so 16 quests total:

| Type | Site | Key format |
|---|---|---|
| `dungeon` | Dungeon site in the quadrant | `s{sec}_dungeon` |
| `tower` | Tower site (dungeon scene with `theme:'tower'`) | `s{sec}_tower` |
| `harbor` | Island expedition (harbor site) | `s{sec}_harbor` |
| `skyport` | Sky Port mini-game | `s{sec}_skyport` |

**Boss rewards** (`BOSS_REWARDS[qKey]`): dungeon bosses grant mounts (s1→alligator, s2→boar, s3→lava_unicorn, s4→dragon-not-quite), tower bosses grant section unlock + 2 rings each.

**All 16 quests must complete for the Dragon mount** (session #64) — enforced by `ALL_QUESTS` list inside `_bossKilled`.

## Starting player state (`this.playerState = { ... }` in Boot)

```
hp: 30, maxHp: 30, atk: 3, def: 0, gold: 0, level: 1, xp: 0
mana: 50, maxMana: 50
mount: null, ownedMounts: []
familiar: null, familiar2: null, familiar3: null
completedIslands: []
unlockedSections: [1]
equip: { lHand: 'wooden_sword', /* everything else null */ }
inventory: []
ammo: {}                              // NOTE: session #64 zeroed this out
completedQuests: [], activeQuest: null
exploredGrid: Uint8Array(EXP_W*EXP_H)
dungeonFog: {}, godMode: false
ownedFamiliars: [], skills: [], lockedSites: []
```

## Combat formula (session #64 fix)

Melee damage (from `calcStatsFromState` and `calcPlayerStats`):
```
atk_display = ps.atk (grows with level-up) + lHand.atk + sum(non-weapon-slot .atk bonuses)
```
Weapon slots EXCLUDED from atk sum: `rHand` (bow), `mWeapon`, `spell`. Their atk feeds their own combat formulas.

Bow shot damage (in `_fireWorldBow`):
```
atkPow = max(1, rWeapon.atk + floor(stats.atk * 0.3))
```

Boss rush blocks all healing: `_quickUsePotion` and `window._useItem` check `_inBossRush()` and refuse.
