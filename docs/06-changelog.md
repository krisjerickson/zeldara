# 06 — Session Changelog

High-level record of what's been built in this project so a new thread knows the arc.

Numbers are internal task IDs — grep for the label in `index.html` to find the code region.

## Sprite / hero visuals

- **[41-44]** Extracted 8-frame walk cycle from AI video, chroma-keyed (green + white BGs), inlined as base64. Wired into V4 hero rendering. Standing frames (front_0-2) are skipped during walk animation.
- **[51]** Added front/side/back horse-rider sprite sheets (8 frames each direction). Only trigger when `ps.mount === 'horse'`. Display size 35×58 (1.4× the on-foot 25×42). Mount icon `🐎` hidden overhead since the sprite already shows the horse.

## Combat + input

- **[45]** Bow attack (CTRL) wired into Dungeon and Island scenes. Arrows blocked by walls in Dungeon (via `_canGoD` check); free path in Island. Extracted `_fireSceneBow` + `_heroUpdateProjs` generic helpers.
- **[54]** Shield block (SHIFT) ported to Dungeon + Island via `_heroShieldTick` / `_heroApplyShield`. Registered SHIFT key in both scenes' key maps (was missing).
- **[53]** Familiars — visual orbit (emoji floats around player) + auto-attack ported to all 3 combat scenes. Fixed to work without needing to press N repeatedly.

## Balance

- **[64]** Big balance pass:
  - Damage formula fix: `calcStatsFromState` now excludes rHand/mWeapon/spell from ATK sum so bow atk doesn't leak into melee.
  - Dragon mount requires all 16 quests (was 8).
  - `s4_tower` reward message changed from "All sections complete" to "All tower quests cleared".
  - Dragon mount immune to `THIN_MAGMA` + `DEEP_MAGMA`.
  - Starting state: 0 gold, wooden sword only, 0 ammo, empty inventory.
  - Boss rush expanded from 3 waves to 10 (wave 1 = 3 fire imps swarm, waves 2-9 ≥200 HP, wave 10 Volcano Lord 520 HP).
  - Boss rush blocks all healing (`_inBossRush()` gates `_quickUsePotion` and `window._useItem`). No mercy heal on exit.
- **[63]** Blacksmith recipes require gems: fire→ruby, ice→sapphire, thunder→emerald, Elemental Sovereign→skystone.

## World gen additions

- **[47]** Building + site labels moved from Phaser canvas text to HTML/CSS overlay (`#world-labels`). Crisp HiDPI. Positioned each frame via `cam.worldView` → screen coords. Fixed projection bug (was using `cam.displayWidth` in world units, now `cam.width` in pixels).

## Modals + UI

- **[46]** Island scene pauses on `_anyModalOpen()` (was ticking monsters through inventory).
- **[50]** Cup + tavern buff system: `cup_empty` (200g at shop), `cup_filled` (fill 100g at tavern, drink → +20HP + random 2-min +25% ATK/DEF/SPD). Tavern also offers direct drink (100g full heal + buff). Buffs Date.now-based (tick through pause).
- **[52]** Familiar descriptions shown in N popup + inventory footer. Action-bars hidden on title screen + inventory modal.
- **[Recent]** Mounts modal shows a **🚶 Dismount** button at the top when mounted.

## Sky Port

- **[55]** Pre-flight shop now pauses World scene (`scene.pause()` / `.resume()`). City HP `100 → 500`. Fixed HUD to show `City: X / 500` (was misleading X%). Added floating powerups: **⚡ +50% speed** or **🔱 3-way shot**, spawn every 15-20s, 12s duration each. Powerups can't be shot, disappear on city contact.

## Endgame — Volcano Lord chain

- **[56]** Foundation: 4 keys + 5 volcano sites + trigger logic (all 4 section bosses dead) + big-door TAB check + HUD `🔑 X/4` panel + placeholder scenes.
- **[57]** Mini #1: `VolcanoMazeScene` (lava-floor maze).
- **[58]** Mini #2: `VolcanoBulletHellScene` (vertical climb, geysers + rocks + fireballs).
- **[59]** Mini #3: `VolcanoPuzzleScene` (Sokoban 3-block-3-plate puzzle).
- **[60]** Mini #4: `VolcanoEscapeScene` (lava-rising 90s escape, collect 3 fragments).
- **[61]** Final: `VolcanoBossRushScene` (10 waves ending in Volcano Lord, rewards Elemental Sovereign).
- **[62]** Quest journal shows pinned "🌋 The Volcano Lord" card with progress. Dev button 🌋 Unlock Volcano Quest + 4 Keys.
- **[63]** Volcano placement fix: minis moved OUTSIDE the main island (radius ~297). Big volcano at SW corner. Land bridges + full island terrain carved. Force 3×3 walkable plaza at every volcano door so entrance is never blocked by lava.
- **[65]** Fixed volcano enter/exit HUD bugs — every `_exitToWorld` now restores `#hud` and calls `worldScene._emitUI()` (matches `DungeonScene._exitToWorld` canonical).
- **[66]** Crash-safety: all 5 volcano scenes wrapped in try/catch. `_attachSafetyEscape` binds an ESC handler that ALWAYS wakes World even mid-error. `_showSceneError` displays the error on screen. Carve chunk refresh batched via `requestAnimationFrame` so it can't freeze the frame. Cave scene 5× larger (`CAVE_TW 40→200, CAVE_TH 18→90`), entrance + exit moved to top of map, monster AI stops jumping over walls + dies in lava (chase → lure-into-pit design).

## Architecture

- **[48]** Documented the Hero API pattern with a big comment block at the top of the `_hero*` helpers. Explains what's centralized vs still inline per-scene, and how to add new mechanics so they auto-port.
- **[49]** Audit report of monster ranged attacks per scene — surfaced that Island scene had NO ranged AI (melee + stomp only). Ported all `atkType`s (arrow/scatter/flame/heat_seek/lightning) to Island.

## Repo + hosting (Sept 2026)

- **[67]** Review of V4 (see `07-review-and-roadmap.md`). Found docs pointed at a stale build; the real latest build was `games\zeldara-v4-game.html` (Jun 9).
- **[68]** Restructured `Zeldara-v4\` into the git repo for `krisjerickson/zeldara`: game → `index.html`, `ai .md\` → `docs\`, Vite/React skeleton + old dist → `archive\`, added `.gitignore`, `vercel.json`, `.vercelignore`. Static Vercel deploy, no build step.

## Phase 1 — Foundation & fixes (Sept 2026, decisions from the Decision Board)

- **[69] A1** Split `index.html` into `src/` (template, CSS, body, 20 JS files) + `assets/hero` (61 PNGs) + `build.mjs`. Verified byte-identical round trip before any change.
- **[70] A3** Save versioning (`saveVersion: 3`), step-wise `_migrateSave`, one-time backup `qoz_v2_backup_v<old>`.
- **[71] B1** Universal pause (`24-pause-input.js`): every menu/popup/shop pauses every running scene; buffs frozen; stuck keys reset; one global keyboard handler; N and O keys now work; Esc closes menus first. Pause badge at top of screen.
- **[72] B3** X casts spells in every scene (dungeon, tower, island, cave, volcano, boss rush). Mana regenerates in sub-scenes. "Equip a spell tome" hint when none equipped.
- **[73] B4** Auto-dismount in dungeons/towers/caves/volcanoes, auto-remount on exit (and on load of a save made inside).
- **[74] B2** Familiars v2: unique scaling abilities, orbit glow, info pop-up, slot-aware picker, Wind Sprite obtainable, dead duplicate familiar code removed.
- **[75] B5** Boss arenas: guaranteed-reachable guardian 3 tiles before a sealed exit portal on every last floor; leash; rematch +25%. Fixed replays where the boss never spawned and the chest stayed locked forever.
- **[76] B6** One death flow for every scene (`_heroDied`).
- **[77] Critical fix** `_attachSafetyEscape` / `_showSceneError` were never defined: all volcano scenes crashed on entry. Also fixed `self` bug in `VolcanoBulletHellScene.update`.
- **[78] B8** Title/subtitle, quest descriptions ("Coming soon" removed), Special slot "undefined", Artifacts tab hidden, control hint (X: Spell, N: Familiar, Esc).
- **[79] B9** Dead code removed: `SKILLS`, `useConsumable`, `_fireSceneBow_dispatch`, `_familiarAttack`, old `_heroFamiliarsTick/_heroFamiliarFire`. Docs corrected (boss mapping, active file).
- **[80]** Headless test suite `tests/` (60 checks).

## Naming conventions established

- Hero API: `_hero*` prefix (register, add, animate, dir, arc, projs, familiars, shield, buff).
- Dev sandbox: `sb*` prefix.
- Modal show/hide: `toggleModal(id)` / `closeModal(id)` with DOM IDs `modal-{name}`.
- Quest keys: `s{sec}_{type}` (e.g., `s1_dungeon`, `s4_skyport`). Final boss quest: `volcano_lord`.
- Volcano site IDs: `volcano_main`, `volcano_n/e/s/w`.
- Volcano key items: `volcano_key_n/e/s/w`.
- Scene keys match class names minus "Scene" (e.g., `VolcanoMazeScene` uses `'VolcanoMaze'` key).

## Known behaviors baked into the game (do NOT accidentally change)

- Player starts on wooden sword, 0 gold, no ammo (session #64 lock).
- Dragon mount = 16 quests (not 8).
- Dragon mount = lava-immune.
- Boss rush = no healing.
- Melee damage = sword + level + non-weapon slot bonuses only (no bow leak).
- Save key = `qoz_v2` in localStorage.
- Save every 30s in WorldScene.update. Saves carry `saveVersion`; bump `SAVE_VERSION` + add a migration step when the shape changes.
- Any menu open = game paused (Phase 1). Death anywhere = village, 25% HP, −10% gold.
