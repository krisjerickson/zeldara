# 04 — Endgame Volcano Quest

## The chain, at a glance

1. Player defeats all 4 section dungeon bosses (`s1_dungeon`…`s4_dungeon`) — this is what `_finalQuestUnlocked(ps)` returns true on.
2. Five volcano sites spawn on the world map (via `_spawnVolcanoVisuals(ws)`):
   - 1 **massive volcano** in the SW bottom-left corner: `(tx:50, ty:WORLD_H-65)`
   - 4 **mini volcanoes**, one per quadrant, OUTSIDE the main island: `(CENTER±210, CENTER±210)`.
3. Land bridges + volcanic terrain get carved from the main island edge to each site.
4. Player TABs each mini-volcano → plays its mini-scene → grabs a key.
5. With all 4 keys, TAB the massive volcano door → boss rush.
6. Defeat 10 waves ending in the Volcano Lord → win.

## The 4 keys (items)

Defined in `ITEMS`:
```
volcano_key_n  🔥 Ember Key      (mini-volcano N,  section 1, NE)
volcano_key_e  🟧 Magma Key      (mini-volcano E,  section 2, SE)
volcano_key_s  🟫 Obsidian Key   (mini-volcano S,  section 3, SW)
volcano_key_w  🌋 Ashfire Key    (mini-volcano W,  section 4, NW)
```

All `slot:'key'`, no buy price. Helper: `_volcanoKeyForSection(sec)` maps sec 1-4 to the key id.

## Volcano site spawn

`_volcanoSiteDefs()` returns the 5 sites. Every consumer of positions goes through this function (single source of truth).

`_spawnVolcanoVisuals(ws)`:
1. Runs `_carveBigVolcanoTerrain(ws)` first (terrain + land bridges).
2. For each def, pushes into `wd.sites` if not already there.
3. Creates the visuals: colored rectangle backdrop, icon (🌋 for main, 🔥 for minis), DOM label ('🌋 Volcano Lord' / '🔥 Mini-Volcano').
4. Adds to `ws.siteObjs` so labels render.

Runs automatically on `WorldScene.create()` when `_finalQuestUnlocked(ps)` is true. Also runs from the dev-unlock button `sbVolcanoUnlock()` and both teleport buttons (`sbGoBigVolcano`, `sbGoMiniVolcano`).

## Terrain carve (`_carveBigVolcanoTerrain`)

- **Big volcano island**: radius 28, concentric rings from `DEEP_MAGMA`/`OBSIDIAN` (inner) → `THIN_MAGMA`/`DARK_ROCK` → `DARK_ROCK`/`ASH_GROUND` → `DARK_ROCK`/`ROCKY_GROUND` (outer).
- **Mini volcano islands**: radius 8, similar profile but scaled.
- **Land bridges**: from `ISLAND_RADIUS-4` on the main island edge (at the angle to the volcano) all the way to the volcano center. Width 3 for big, 2 for minis. Tile mix: `DARK_ROCK` / `ROCKY_GROUND` / `ASH_GROUND`.
- **Door plaza**: after carve, force a 3×3 walkable `DARK_ROCK` block at each site's `(tx, ty)` corner — this is where the player stands to TAB.
- **Only converts OCEAN tiles** — will never overwrite existing land.
- **Batched chunk refresh** — refreshes at 4 chunks per animation frame (`requestAnimationFrame`) so a 30-chunk update doesn't freeze the main loop.

## The 5 volcano scenes

Every scene shares the safety-ESC pattern (see doc 02). Every scene's `_exitToWorld` restores `#hud`, calls `worldScene._emitUI()`.

### 🔥 VolcanoMazeScene — Mini N — Ember Key

- 27×19 hand-designed maze, tile size 32 px.
- Layout: `.` obsidian path, `#` lava tile, `K` key chest, `E` exit door.
- Player walks freely. Stepping onto a `#` tile → `-10 HP` every 0.7s + teleport back to `_lastSafe` (last known path tile) + red flash.
- Key chest at deepest dead-end; TAB → grants `volcano_key_n`.
- Exit door at spawn; TAB (after key grab) → return.
- Camera zoom 1.5, follows player.

### 🟧 VolcanoBulletHellScene — Mini E — Magma Key

- Vertical 420×1800 world (column).
- Player at the bottom, climb to the top.
- Enemies:
  - **Geysers** — spawn from ~200px above the player, grow to 120px tall over 1.5s. Difficulty scales with `climbed = 1 - player.y/H`.
  - **Rocks** — fall from top edge at 160-240 px/s.
  - **Homing fireballs** — appear above 25% climb, home in on player at 110 px/s, 6s life.
- Hit → `-10 HP` + 1s i-frames + bumped down 60 px.
- Key chest at y=60. TAB when close → grant key + exit prompt.

### 🟫 VolcanoPuzzleScene — Mini S — Obsidian Key

- Grid-based Sokoban.
- 3 obsidian blocks (`B`), 3 red pressure plates (`P`), a locked door (`+`), and a key chamber (`K`).
- Player uses grid-step movement (0.16s cooldown per step).
- Walk into a block → push it in your direction if target is walkable + empty.
- Plates turn green when a block covers them. All 3 → door dissolves.
- TAB on `K` (in the key chamber) → grant `volcano_key_s`.
- TAB on `E` (exit) → return.

### 🌋 VolcanoEscapeScene — Mini W — Ashfire Key

- Multi-platform chamber with `F` fragments (3) scattered on ledges above lava.
- Lava rises from the bottom over **90 seconds** — HUD shows countdown.
- Touch lava → `-15 HP` + 1s i-frames + bumped up 50 px.
- Collect all 3 fragments → key auto-forges (exit icon → ✅).
- TAB on exit door (with key) → return.

### ⚔️ VolcanoBossRushScene — Main volcano — Volcano Lord

- 720×560 arena, 10 waves (session #64 expanded from 3).
- **Wave 1**: 3× Fire Imp (60 HP each) spawn simultaneously.
- **Waves 2-9** (each ≥200 HP, progressive):
  - Ember Wraith (200)
  - Magma Spitter (220)
  - Obsidian Golem (260)
  - Cinder Phoenix (240)
  - Lava Wyrm (290)
  - Ashen Knight (320)
  - Pyrokraken (360)
  - Inferno Wraith (400)
- **Wave 10**: Volcano Lord (520 HP, 38 ATK).
- Simple chase AI: each boss moves toward the player at its `def.spd`. Melee attack at `def.r+20` range.
- Player uses Space/SHIFT/CTRL/N as normal. Shield, familiars, bow, sword all work.
- **NO HEALING**: `_quickUsePotion` and `window._useItem` both check `_inBossRush()` and refuse. No mercy heal on exit either.
- Defeating all 10 → victory banner with "🏆 VOLCANO LORD VANQUISHED" + rewards: `+2500g`, `+500 XP`, `elemental_sovereign` weapon added to inventory, `ps.completedQuests.push('volcano_lord')` (so the journal ticks the objective).

## Site interaction routing (`WorldScene._npcInteract` → `_interactSite`)

```
if site.type === 'volcano_mini':
  var sceneByMini = {
    volcano_n: { scene:'VolcanoMaze',      name:'Ember Key'    },
    volcano_e: { scene:'VolcanoBulletHell',name:'Magma Key'    },
    volcano_s: { scene:'VolcanoPuzzle',    name:'Obsidian Key' },
    volcano_w: { scene:'VolcanoEscape',    name:'Ashfire Key'  }
  };
  → sleep World, launch the mapped scene with { site, worldScene:this, keyId, keyName }

if site.type === 'volcano_main':
  if !_hasAllVolcanoKeys(ps):
    → show "🔒 The volcano door has 4 keyholes. X/4 keys collected."
  else:
    → sleep World, launch 'VolcanoBossRush'
```

## Quest journal entry

`renderQuestList()` (called by Q key) prepends a global "🌋 The Volcano Lord (Final Quest)" card at the top when `_finalQuestUnlocked(psRef)` is true. Two sub-objectives:
- **🔑 Find the four elemental keys** — shows `X / 4 collected`. Checks off when all 4 held.
- **⚔️ Defeat the Volcano Lord** — greyed until keys done, checks off when `ps.completedQuests.includes('volcano_lord')`.

## HUD panel

`#volcano-quest` div at top-right, class `.show` when active. Shows:
- Title: "🌋 The Volcano Lord stirs"
- Sub: "🔑 X / 4 keys" (or "🔑 ALL KEYS — head to the great volcano!")

Updated on the same `setInterval` as the buff HUD (every 500ms). Uses `_updateVolcanoQuestHUD()`.

## Dev-mode buttons for testing

- **🌋 Unlock Volcano Quest + 4 Keys** (`sbVolcanoUnlock`) — Marks 4 dungeons done, adds 4 keys, spawns volcano visuals, saves.
- **→ Big Volcano** (`sbGoBigVolcano`) — Ensures visuals spawned, teleports player near the door.
- **→ Next Mini-Volcano** (`sbGoMiniVolcano`) — Cycles through N→E→S→W minis on repeated clicks.
- **🗺️ Reveal Map** (`sbRevealMap`) — Fills `exploredGrid`.

All defined near `sbGold` in the global scope.
