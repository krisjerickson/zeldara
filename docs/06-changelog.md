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

## Phase 2 — Selector pages (Sept 2026)

- **[81] A2** Design Lab hub (`lab/`): shared walk engine with the real hero, lights/darkness/particles, overview (M), lights toggle (L), inspect (Tab), grid with thumbnails, Pick/Maybe/No + region tags + notes saved to the artifact DB.
- **[82] C3/C2** Tower Selector: 10 white-and-blue glass styles (Rivendell Twilight Hall, White Keep, Moonglass Spire, Elven Library, Sky Cloister, Silverwood Palace, Frost Cathedral, Starlit Observatory, Reflecting Hall, Dawn Sanctum) on 3 house-style floor plans (grand / long hall / rotunda) with per-room furniture; every placement keeps the whole floor reachable.
- **[83] C1** Dungeon Selector: 10 open-cavern designs (Boulder Field, Pillared Hall, Crystal Grotto, Mushroom Forest, Lava Archipelago, Sunken Courtyard, Underground Lake Ring, Bone Pit, Root Hollow, Spiral Chasm) with spawn markers (~2× classic density) and the guardian portal.
- **[84] E1/E2** Sprite style bible (`docs/09`) + pilot: 6 characters × 5 concept prompts; intake folders `sprites/incoming/<character>/`.
- World quadrant selector (D1, 40 designs) is next.

### Phase 3a — all 20 Lab designs in the game (Sept 27 2026)
- **[85] C2/C4** 20 tower/dungeon sites (5 per quadrant, `SITE_ROSTER` in `src/js/07d-site-roster.js`). Kris's region picks kept; unassigned ones filled in to balance: White Keep → Grasslands, Moonglass Spire + Root Hollow (moved from Ashlands) → Wetlands, Rivendell Twilight Hall → Highlands.
- **[86]** Boss sites (★, ids `s{sec}_tower` / `s{sec}_dungeon`): Silverwood Palace + Sunken Courtyard (Q1), Frost Cathedral + Underground Lake Ring (Q2), Starlit Observatory + Bone Pit (Q3), Dawn Sanctum + Lava Archipelago (Q4). The other 12 are bonus sites (`s{sec}_b_<design>`): an elite mini-boss guards a treasure vault (gold, gem, gear, one lore relic = +3 max HP), replayable at +25%, never locked.
- **[87]** Floors by region: Grasslands 4–5, Wetlands 5–6, Highlands 6–7, Ashlands 7–8; boss sites use the top. Every floor is built from the site's Lab design (towers rotate plan/mirror/room shuffle per floor; caverns reseed); stairs up in towers, down in dungeons; arriving from above/below puts you next to that floor's stairs. Legacy generator kept as fallback.
- **[88]** DungeonScene renders Lab maps (painted base, y-sorted sprites, lights, particles, darkness capped at 0.6), seeded monster/chest placement, compressed depth scheme (`_ld`) so hero effects stay on top; fog saved run-length packed.
- **[89] B7 (partial)** Boss towers hold a captive craftsman (Bram the Builder, Mira the Mechanic, Dunn the Dwarf Forger, Captain Vela) who is freed when the guardian falls and then stands in the village square (`ps.rescued`, `CRAFTSMEN`). Village services from them are still Phase 5.
- **[90]** Ashlands boss dungeon now gives the **Ash Salamander** mount (walks on shallow and deep lava).
- **[91]** Familiars stay with the harbor islands, but the island guardian moved into each island's dungeon: Pirate Cave (lake ring, 4 floors), Bog Grotto (mushroom forest, 4), Frost Spire (Moonglass tower, 5), Ember Cave (side-view, 4 floors, exit gated on the guardian). Beating it clears the island and awards the familiar.
- **[92] Bug fixes found on the way:** harbor and sky-port quests never completed (Dragon mount was unreachable) → now complete, and a single `_completeQuest` check awards the Dragon from any of them; island dungeon bosses used to mark the quadrant dungeon quest done; tower stair tiles could be covered by furniture.
- **[93]** Save v4: resets dungeon fog (new floor sizes), backfills harbor/sky-port quests, frees craftsmen for towers already beaten.
- **[94] Sandbox Site Lab** (`src/js/25-site-lab.js`): every implemented tower/dungeon (4 quadrants + island dungeons) with thumbnails and a chip per floor; jump in with inspect options (monsters all/guardian/none, god mode, fog, lighting) and an inspect bar (◀ ▶ / `[` `]` floors, overview, fog, lights, monsters, back to Lab, exit). Reads live game data, so future sites show up automatically. `tests/test_site_lab.py` (16 checks).
- **[95] D1 World selector** in the Design Lab: 40 walkable 60×60 quadrant samples, 10 each (Grasslands: Fairy-Ring Meadows, Runic Standing Stones, Windmill Hills, Firefly River Valley, Moss-covered Giant Bones, Blossom Orchard Terraces, Sunken Amphitheatre, Floating-Rock Meadow, Crystal-tipped Tallgrass, Waystone Road · Wetlands: Bioluminescent Mangroves, Lantern Lily Marsh, Drowned Village, Willow Cathedral, Glow-Frog Pools, Misty Stilt Walkways, Sunken Temple Spires, Wisp Cattail Maze, Rune Stepping Stones, Turtle-Shell Isles · Highlands: Runic Mesas, Geode Canyons, Dwarven Stair-cut Cliffs, Wind-harp Ridges, Petrified Forest, Giant's Chessboard, Glacier-veined Peaks, Golem Graveyard, Herder Terraces, Starfall Craters · Ashlands: Obsidian Glass Fields, Ash-snow Dead Forest, Magma Rune Channels, Basalt Column Forest, Burned Cathedral, Sulfur Geysers, Dragon Skeleton Valley, Ember-flower Fields, Chained Floating Rocks, Forge-city Ruins). Engine `lab/src/js/34-lab-world-core.js`: soft blended terrain edges (warped bilinear field), 3/4 cliffs, props library, runes that pulse and brighten near the hero, ley lines, landmarks (Tab), night mode (N). Kris picks 2–3 per quadrant (panel D1 "blend"). `tests/test_lab_world.py` (14 checks).
- **[96] World comments applied** (Kris's notes on the 40 picks): crisp terrain edges (one kind per 2-px sample, rims: foam on water, kerbs on paths, wet band on shores); built surfaces as real patterns — cobble paths, flagstone roads/naves/streets (soot, moss), brick stone bridges with parapets, plank boardwalks with rails, hex basalt columns, turtle-shell plates, big crisp chessboard slabs, stone amphitheatre seats; flowing lava (masked scrolling glow layers + small bursts); raised plateaus you can climb (cliff face + rim + carved stairs) on Runic Mesas, Geode Canyons and Glacier Peaks.
- **[97] New world map (design)** `src/js/07e-world-map.js` + Lab **World Map** tab: 1200×1200 rugged island (bays, fjords, capes, islets, inner lakes, rivers, mountains). Regions meet at Mirror Lake and are split by natural borders — Silverrun river, Great Scarp, Cinder Chasm, Ember Wall — crossed at three craftsman gates (Builder's Bridge, Mechanic's Lift, Forger's Iron Bridge). 40 hand-placed sub-zones (relaxed to even sizes), roads, 32 sites in fitting zones, 17 rune waystones (village + 4 per region), offshore endgame volcanoes. `tests/test_world_map.py` (10 checks). Not in the game yet — Phase 3 next.
- **[98] Three crossings per border** (Kris): every border has a lakeside, a middle and a coast crossing, all built at once when its craftsman is freed — Silverrun: Lakeside / Millrace / Estuary Bridge (Bram, s1 tower) · Great Scarp: Lakeside / Scarp / Seacliff Lift (Mira, s2) · Cinder Chasm: Lakeside / Chasm / Cape Iron Bridge (Dunn, s3) · **Ember Wall** (new, Ashlands↔Grasslands): Lakeside / Ember / Northcoast Pass (Captain Vela, s4 tower), which makes the world a loop. Roads stay inside their region, so the borders seal exactly: with all crossings shut only the Grasslands are reachable. Lab World Map labels every crossing (colour per border, hover = who builds it).
- **[99] Phase 3 step 1 — the new world is in the game** (`src/js/05b-world-build.js`): 1200×1200 tiles from the map; village on Mirror Lake's shore (`CENTER_X/Y` = 690,520 is now the village); every land tile painted by its zone's recipe with the zone's Lab colours (chunks + maps use the zone palette); new tiles `CLIFF` (Scarp/Ember Wall), `BRIDGE`, `REEF` (sea shallows, blocked). 32 sites/harbors/waystones from the map, each tied to the road network by a carved trail; region grid → `getTileSection`. Monsters/animals spawn anywhere in their region's land (200 per region + boss, 16 animals), kept clear of waystones and site doors; far-away monsters sleep. Volcano isles use the map's offshore spots, joined to the nearest shore.
- **[100] Crossings in game**: shut crossings show the border itself (river, cliff, lava, ridge) with a rope barrier + "🔒 name — free <craftsman>"; when the craftsman is freed the three crossings become plank bridges / stone lifts / iron bridges / gravel passes, with a notification. Sandbox "Unlock All" also opens all 12.
- **[101] Waystones + travel**: rune obelisks (dim until touched). **[Tab]** activates one; **[Tab]** again opens the travel map. Travel between any activated waystones: free inside a region and to the village, gold across regions (10 + distance/15). Sandbox: "🔷 All Waystones".
- **[102] Minimap + Full World Map**: HUD minimap follows you (~150 tiles), zone name caption, 🗺 button → Full World Map (also **B**): explored land only (smoothed fog), zone/region names for visited zones, crossings (open/🔒) with names, sites, waystones, hidden caches, active quest, you; zoom Fit/2×/4×, wheel, drag to pan, hover tooltips; side panel = legend + crossings status, or the waystone list with fares in travel mode. Zone banner when you enter a new zone.
- **[103] Mount terrain** (Kris): each region is ~30–40% signature terrain — Wetlands water & marsh, Highlands boulder fields, Ashlands lava crust. On foot it is slow (30–35% speed; lava crust also burns) and its deepest parts (deep water, large boulders, deep lava; ~8% of the land) are blocked; roads and trails keep every site/waystone/crossing reachable on foot. The previous region's dungeon mount crosses it at full speed: Alligator (water & marsh), Battle Boar (small + large boulders), Lava Unicorn (lava crust). The Ashlands dungeon mount is now the **Ash Dragon** (id `ash_salamander` kept): full speed over every region's terrain and the deep-lava causeways to the endgame volcano isles. Horse = speed only. `terrainSpeedMult` / `FOOT_SLOW` in 03-data, data-driven `canPassTile`.
- **[104] Hidden caches**: 18 islets ringed by signature terrain (Grasslands 3 in ponds, 5 per other region) — sealed on foot (Wetlands/Highlands/Grasslands) or a painful lava walk (Ashlands); open with the right mount for gold, a regional gem and 2 potions. Shown on the map once explored.
- **[105]** Save v5: old saves start at the village with a fresh 150×150 fog grid (old 600×600 coordinates don't fit), `activatedWaystones`, `visitedZones`, `openedCaches`; craftsmen already freed keep their crossings open. `tests/test_world_game.py` (26 checks) + `tests/test_world_map.py` (13).
- **[106] Why [99] looked like the old game** (Kris, Sept 27): step 1 swapped in the new map but still painted it with the old tile renderer (one flat colour + tile art per 32 px square, zone colours only). The Lab look (step 2) had been deferred, and that wasn't flagged clearly. Fixed by [107]–[109].
- **[107] One engine for Lab and game**: the Lab world engine and all 40 designs moved to shared code (`src/js/07f-world-engine.js`, `07g`–`07j`), so the game draws with exactly what Kris picked. `buildWorld(Z,seed,{layoutOnly:true})` gives a design's layout + props without painting.
- **[108] Lab-look world data** (`05b-world-build.js`): every tile has a Lab kind (`wd.kind`); each zone is dressed by its own design (ground, its noise kinds, its own random props at ~Lab density — 9k props), signature terrain uses the zone's own water/boulder/lava kinds, and each zone's 60×60 Lab sample is stamped at its heart as the landmark (landmark texts + ley lines kept). Solid props and walls block (new tile `T.PROP`). Sites/waystones sit on a ring just outside the landmark.
- **[109] Streamed Lab renderer** (`05c-world-paint.js`, `10c-world-render.js`): 32×32-tile chunks painted like a Lab sample — noise-warped field at 12 samples/tile (no tile grid), soft blends, shore foam, wet bands, rims, world-aligned patterns, cliff faces that follow the warped edge (+ cast shadows), rocky relief on mountains, per-tile deco, kind glows, flowing lava, ley lines; roads, bridges and trails drawn as smooth curves from their centre-lines; props as depth-sorted sprites packed in one atlas per chunk; hero/monsters depth-sorted with them. Painting is time-sliced (≈0.3–0.45 s of work per chunk, 6–14 ms per frame). New structure art (`10d-world-art.js`): towers, dungeon entrances, camps, harbors, sky ports, volcano doors, waystone obelisks. Old grass-sway and water overlays off.
- **[110] Village styles** (`07k-village.js` + Lab **Village** tab): four looks — Lakeshore Market Town, Runestone Hamlet, Elder Grove Village, Walled Harbor Town — each at five growth stages (Start → Bram: builder's yard, paved streets, stone bridge → Mira: workshop, windmill, street lamps → Dunn: forge hall, statue, iron fences → Vela: sky dock, banners, festival lights). Waiting on Kris's pick; the in-game village is a placeholder until then.
- **[111] Lag, travel clicks, runic audit** (Kris's Sept 27 review).
  - *Lag:* the cause was ground painting on the main thread (~184 ms per 32×32 chunk) and village cobble textures (single steps up to 169 ms), not prop density. Fixes: the ground field is painted in a Web Worker (main thread now ~30 ms per chunk, sliced across frames); patterned surfaces use cached tiles, built once during loading (`_wpWarmPatterns`); the chunk's sprite atlas is packed inside the paint job; lava layers share one bitmap mask per chunk (half the full-screen mask passes); kind glows are capped to one per 8×8 tiles; village paving reduced (cobbles on streets only, grass and slabs elsewhere). Headless: village `_updateChunks` median 20.6 → 9.1 ms, mount spikes 32 → 20 ms.
  - *Waystone travel:* the map modal stopped click propagation, so the travel list buttons and zoom buttons never fired (listener now uses capture); the side panel only re-renders when it changes; map-marker clicks explain why nothing happened (not at a waystone / you are here / not active). Sandbox **Unlock All** now activates every waystone. New `tests/test_waystone_clicks.py` (real mouse clicks).
  - *Runic audit:* new `tests/audit_lab_world.py` compares all 40 Lab zone samples with the world (props, landmarks, ley, shafts, zone + prop particles, rune lights, lava, kinds) — 0 gaps. Added: zone particles around the camera, prop particles (geysers, chimneys), light shafts, wall-rune lights, ley-line glow beads, lava spark bursts, flickering lanterns/braziers, landmark stories on [Tab], day/night cycle (12 min; per-zone night tint; sandbox Night/Day/Cycle). Fixed: stamp set pieces that fall off the land slide to the nearest spot (landmark follows) — Dragon Valley skull + rune circle; props are painted in every chunk they touch (no clipped rune circles); Starfall crater sparks; "Press M" landmark text.
- Tests: `tests/test_sites_expansion.py` (every floor of all 20 sites builds and is walkable end to end — 122 floors) and `tests/test_sites_flows.py` (32 checks: craftsman, mounts, vault/relic/rematch, stairs, island guardians → familiars, journal, migration). All earlier suites still pass.

- **[112] The home village: Runestone Hamlet+** (Kris's pick + borrowed elements). `07l-village-runic.js` plans it, `05d-village-apply.js` stamps it on the world and re-stamps when a craftsman is freed.
  - Runestone green (rune circle, standing stones, well, ley lines) with the 11 enterable shops at fixed spots; houses of five types (round thatch cottages, grove shingle halls, market timber + clay tile, harbour stone + slate, thatch gables) with chimney smoke and a glowing lantern at the door; market carts; windmills; harbour-stone streets + dirt ring lanes; two fountain plazas; neat vegetable gardens (rows of cabbages, carrots, leeks, pumpkins); town wall with turrets (gates from stage 3, full octagon from stage 4); craftsmen's buildings (Bram's yard, Mira's workshop, Dunn's forge hall, Vela's sky dock).
  - Growth: 13 → 20 → 28 → 36 → 44 buildings (stage 1 ≈ 30% of the final count; the final town is about twice as dense as the old stage-5 design), radius 20 → 33 tiles, walls at 35. Stage = 1 + craftsmen freed; `VILLAGE_RADIUS` follows it (monster-free zone). Lab: new "Your village (Runestone+)" group with all 5 stages.
- **[113] Harbour on Mirror Lake.** The lake now reaches into the village's south-west quarter as a bay (`VR_BAY`, carved by the world map). Grows with the village: fishing pier + rowboat + fisher's hut (1) → boardwalks along the shore + boathouse (2) → stilt lake house on its own walkway + second pier + sailboats (3) → stone quay (4) → lighthouse + lanterns on the pier + 6 boats (5). Piers/boardwalks are walkable (bridge tiles). Waystones now take priority over landmark stories on [Tab].
- **[114] Monster engine + all 240 monsters in the game.** `09-monster-engine.js`: 23 movement modules (charge, burrow, ambush, disguise, perch-and-swoop, blink, swim, leap, chess-knight L-jumps, rook slides, "only moves when you look away", roll, orbit, kite …), 19 attack modules (melee/combo, lunge, sweep, slam, projectiles incl. homing / ricochet / piercing / sticking shards, lobs with landing circles, telegraphed beams, breath cones, expanding rings with a gap, pull, gust, grab, summon, traps, clouds, drain tethers, stand-still lightning, tile marks, swap, walls, echo) and 17 defences (front shield, armour that breaks, reflect, immunity, dodge, thorns, bubble, weakness, revive-unless-crushed, enrage, flee, split, explode, regen, aura, heal allies, lure). Player effects: slow, root/freeze, poison, burn, blind, charm (reversed controls), shrink, mark, frog. Monsters steer round obstacles; monster projectiles fly over low terrain. Kits for 225 monsters in `07r-monster-kits.js`; 15 originals (Bog Serpent, Mud Troll, Harpy, Stone Golem, Fire Imp, Storm Mage …) keep their own code and wear the pixel sprites. Spawning (`10f-world-monsters.js`, dungeon `_spawnRosterMonster`): 80% this quadrant + segment, 15% same quadrant other segment, 5% visitors scaled to the local level; terrain-tied mainland spawns, night-only monsters, packs with an alpha. Tests: `test_monsters.py` (every monster acts on the player), `test_monster_sites.py`.
- **[115] The Zeldara Tome** (`26-tome.js`, T key + 📖 button). Seven chapters — monsters (240 + bosses, with how to deal with them), mounts, familiars, spells, items, places, characters — filled in as you meet, own or visit things; undiscovered entries are ??? silhouettes with a hint. Saved in `playerState.tome`. Test: `test_tome.py`.
- **[116] Black village background (graphics memory).** On Kris's Intel Iris Xe the ground went black in the village while building names and doors kept working — the browser dropping the game's WebGL graphics. Fixes: (a) world chunks and dungeon floors go to the GPU through `gpuTex()` (`07-site-art.js`) instead of Phaser's `addCanvas`, which kept a full CPU pixel copy of every 1024² canvas (plus a GPU read-back stall on each mount) — the canvas is shrunk to 1×1 after upload, so each chunk now costs one texture instead of three copies; (b) far chunks are dropped sooner (1.3 chunks outside the view, was 2.2); (c) if the graphics are lost anyway, the game saves, shows "Refreshing graphics…", reloads and continues straight back where you were (`20-game-config.js` + Title auto-continue). Test: forced `WEBGL_lose_context` → back in the world with gold and position kept.
- **[117] Crisp text everywhere.** Every Phaser text (monster/NPC names, prompts, waystone names, damage numbers, all scenes) is now rasterised at its scene's zoom (world 1.4×, dungeon 1.6×, buildings 2.2× → 2–3× resolution) with smooth filtering, instead of 1× text pixel-doubled by the camera (`04-helpers.js`, factory patch — no call sites changed).
- **[118] Characters: NPCs, mounts, familiars, bosses** (`07s-char-sprites.js`, `10g-characters.js`). 66 pixel stand-ins built like the monsters: 29 NPCs (10 shop keepers, 4 craftsmen, 11 village folk, 4 island NPCs — new `person` body plan with hair, hats, aprons and tools, idle + "doing their job" frames), 11 mounts (side walk ×4 + front + back), 5 familiars, 21 bosses (8 guardians, 4 island guardians, 8 boss-rush bosses + the Volcano Lord). In game: shop keepers inside buildings, craftsmen in the square and in their tower cells, **village folk who appear as the village grows** (3 → 11, wander, [Tab] to talk), island NPCs, **mounts drawn under the hero** (hero seated, all directions; the horse keeps its painted rider), orbiting familiars, and every boss (world, dungeon/tower, island cave, boss rush) with a pulsing aura. Island monsters without their own art borrow a roster look-alike. Tome shows all of them. Design Lab **Characters** tab (Looks good / Tweak / Redo + notes; mounts preview the hero riding). Tests: `test_characters.py` (15), `test_lab_chars.py` (7).

### Round 2 (Sept 28 2026) — Kris's nine-point list
- **[119] Sealed boss sites** (Kris, round 2). Each quadrant's ★ tower and ★ dungeon open only once every other tower and dungeon in that quadrant is cleared (`_bossSiteGate` in `07d`; islands and the sky port don't count). The world label shows 🔒 done/total, entering lists what is left, the journal shows the seal. Sandbox Unlock All clears the bonus sites.
- **[120] Multi-phase guardians** (`09b-boss-phases.js`, arenas in `07u-boss-arenas.js`). Phase 1 is fought on the site's top floor; every later phase moves to its own arena (20 arenas: hazards, props, events such as marked tiles, lobs, geysers, wind, rifts, waves) with an evolved form (23 new boss sprites), new moves, more health and defence.
  - Grasslands 2 phases (no extra health, no summons) · Wetlands 3 · Highlands 4 · Ashlands 5.
  - Extra health bars from the Wetlands on: ✨ Ward (spells + familiars), 🏹 Guard (arrows), 🛡 Plate (melee). Other damage chips them at 15%, so you can never get stuck.
  - Summons from the Wetlands on; the Highlands and Ashlands finales have several bosses at once (e.g. the Shadow Lord and its twin).
  - Boss HUD: name, phase pips, health + extra bars.
- **[121] World camps** (`10h-world-camps.js`). About two thirds of the world's monsters now guard something: 132 camps (33 per quadrant) of 60 themed types (15 per quadrant, e.g. goblin cookfire, bee-keeper's hives, drowned shrine, dwarf ore cart, ember forge). Rewards: food to gather, one-time treasure chests, healing and mana springs, 2-minute blessings, XP runes, arrows, gems. Clearing a group plays a fanfare with confetti and a banner. Food, springs, shrines and racks come back after about 10 minutes; chests, gems and runes are one-time. One third keep roaming.
- **[122] Splitting monsters split once** — their children just die.
- **[123] Mount seat.** The hero now sits on top of the mount (legs hidden, seat height per mount kind); in the front view the mount's head is drawn over the rider.
- **[124] Island castles, teachers and skills** (`07t-castles.js`, `09c-castles.js`).
  - 4 harbors per quadrant (16 in all), each sailing to its own island: island A has the familiar dungeon (as before); islands B, C and D each have a castle.
  - 12 castle looks, 3 per quadrant:
    - Grasslands: Thornwood Keep, Sunflower Château, Windmill Bastion.
    - Wetlands: Lotus Water Palace, Drowned Abbey, Mangrove Fort.
    - Highlands: Dwarven Hold, Glacier Citadel, Eyrie Castle.
    - Ashlands: Obsidian Bastille, Ember Sanctum, Bone Throne Keep.
  - Each castle has 2–4 floors. The top floor has a one-phase warden (12 new bosses) holding a master teacher (12 new NPCs) in a cage.
  - Beat the warden and open the portal chest: the teacher teaches you their skill, which is equipped automatically if your special slot is empty (Z).
  - Skills are no longer sold. There are 12 in all, 3 per quadrant, stronger in later quadrants:
    - Grasslands: Sprint, Roll, Whirlwind.
    - Wetlands: Smoke Bomb, Shield Bash, Blink.
    - Highlands: War Stomp, Second Wind, Berserker.
    - Ashlands: Phantom Veil, and two new skills — ⏳ Time Slow (enemies near you run at 30% for 4 s) and ☄️ Meteor Strike.
  - The skills tab lists the twelve masters (learned / where to find them).
  - Tome entries for castles, wardens, teachers and skills (who teaches what, and where).
- **[125] Village interiors repainted** (`07v-interiors.js`, `11-scene-building.js`). All 12 buildings use the tower look: painted back walls with their own shelves, windows and décor, themed floors, depth-sorted furniture, rugs, warm lights, window light shafts and particles. Each room fits its keeper:
  - Rolf's bar, kegs and fireplace.
  - Tilda's shelves and scales.
  - Your home: bed, hearth and bookshelf.
  - Garrick's forge hearth, anvil and racks.
  - Oswin's guild hall and map table.
  - The quest board hall.
  - Hana's stalls with horses.
  - Brask's armour stands and shield wall.
  - Pell's mannequins, cloth and mirror.
  - Iva's gem cases and safe.
  - Morwen's cauldron, potions and herbs.
  - Benno's bakery oven and cakes.

  The rooms are larger (14×10 tiles) and you talk to the keeper across their counter.
- **[126] Design Lab tabs:** **Castles** (12, by quadrant), **Boss Arenas** (20) and **Interiors** (12) — all already in the game; mark any you want changed. The Characters tab now has 41 NPCs and 56 bosses (evolved forms + castle wardens; no review needed for bosses yet).
- **[127] Tests:** new `tests/test_round2.py` (18 checks: seal, split-once, camps + celebration, mount seat, skills not sold, 4 harbors per quadrant, a full castle run → skill learned, Time Slow + Meteor, 12 interiors reachable, Tome links, Q1 2-phase and Q4 5-phase guardians end to end). Counts updated in `test_characters`, `test_lab_chars`, `test_tome`, `test_world_map` (44 sites).

### Round 3 (Sept 28 2026) — Kris's six-point list
- **[128] No attacking through walls.** Sword swings in the world, dungeons, towers, islands and caves need a clear line to the monster (`_heroLOS` in `09-hero-core.js`: building walls, cliffs, rocks and solid props block; ends of the line are ignored so monsters hugging a wall can still be hit). Island arrows now stop at walls too.
- **[129] Shooters keep their distance.** A monster whose attacks are all ranged (shoot / lob / beam / breath …) backs away when you get within ~140 px, then turns and fires (engine rule in `MX.tick`; bosses excluded).
- **[130] Spawns happen once.**
  - Summoners call their helpers once per fight. When those helpers die, no more come (bosses still summon).
  - Summoned and lobbed-in helpers never split or summon themselves.
  - Roaming packs stay dead while you're nearby and come back only after you've gone about 30 tiles away.
- **[131] Spirit familiars** (`07w-spirits.js`, `09d-familiars.js`). The old five familiars are replaced by four elemental spirits, one per quadrant island:
  - The elements are 🌿 grass (Grasslands), 💧 water (Wetlands), 🪨 earth (Highlands) and 🔥 fire (Ashlands).
  - They look patronus-like: a glowing translucent body, a luminous rim, a bright core, streaming wisps and drifting motes.
  - **12 designs**, 3 per element. Kris picks one per element in the Lab. The ★ defaults in play now are Grove Elder, Tide Serpent, Stone Colossus and Ember Dragon.
  - **Hover spirits** circle above you. **Follow spirits** walk your trail behind you.
  - **6 skills each**: a base skill plus 5 fairy lessons.
    - Grass: Thorn Dart, Healing Bloom, Vine Snare, Spore Cloud, Bark Ward, Wild Growth.
    - Water: Water Bolt, Tide Ward, Whirlpool, Frost Lance, Rain of Renewal, Tidal Wave.
    - Earth: Stone Shard, Stone Skin, Quake, Boulder Toss, Crystal Spikes, Avalanche.
    - Fire: Ember Bolt, Flame Aura, Fireball, Blaze Dash, Rekindle, Inferno.
  - All learned skills run on their own cooldowns. They scale +15% per familiar level and +12% per hero level, and cooldowns get 4% shorter per level.
  - **Active familiars:** 1, plus 1 per Fairy King, up to 4. Press N to choose.
  - Save v6 migrates the old familiars to their element's spirit.
- **[132] Fairies, digging and familiar trials** (`10i-world-fairies.js`).
  - **Where they are:** 5 fairies per quadrant flit around its 4 waystones and one rune circle.
  - **Before you have that quadrant's familiar,** they only chat and point you to the familiar island.
  - **After you have it,** fairy *n* teaches skill *n+1*, in order (the others tell you whom to visit first). Each lesson works like this:
    1. She asks for an object and, the first time, gives you the **Fairy Trowel**.
    2. The object is buried by the rune space of another zone in the quadrant.
    3. Hints are strong:
       - The zone name, the spot ("next to the runes at its heart") and the direction and distance from the nearest waystone.
       - A 🪏 ring on the world map.
       - Golden sparkles within 12 tiles, and a "[G] Dig here" prompt.
       - The Tome's **Quests** chapter holds all of it.
    4. **G digs.**
    5. Bring the object back and your familiar takes her **trial**. When it passes, the familiar learns the skill and there's a celebration.
  - **Trials built so far:** Rune Target Practice, Echo Path, Element Harvest, Guard the Runestone and Hold the Circle. There are 10 ideas in the Lab for Kris to pick from; Light the Stones, Catch the Trickster, Rune Lock and Escort are not built yet.
- **[133] Fairy Kings** in huge rune henges: Oberyn (Wetlands, Sunken Temple Spires), Cairnwyn (Highlands, Wind-harp Ridges) and Pyrrhus (Ashlands, Chained Floating Rocks).
  - **Requirement:** that quadrant's spirit must have learned two fairy lessons.
  - **Quest:** dig up 3 treasures, then take a two-part trial: hold the shrinking circle against waves for 30 s, then defeat the shadow of your own spirit.
  - **Reward:** +1 active familiar.
  - Sandbox has a **"✨ Familiars Lv 6 + 4 Slots"** button.
- **[134] The Tome is arranged by quadrant.** Every chapter is grouped Grasslands / Wetlands / Highlands / Ashlands / Village & everywhere, each on its own light colour, with a quadrant filter on every chapter. The new **📜 Quests** chapter lists the 20 fairy lessons and 3 King trials with status, objects, dig hints, trial and reward. Familiar entries show the animated spirit and its skill tree.
- **[135] Design Lab:** new **Familiars** (12 spirits; pick 1 per element), **Fairies** (40 looks, 10 per quadrant; pick 1 per quadrant; kings wear a crown on the same look) and **Familiar Trials** (10 ideas; pick the ones you like) tabs. The old pixel familiars are removed from the Characters tab.
- **[136] Tests:** new `tests/test_round3.py` (19 checks: walls, shooters, summon once, packs, spirits + migration + slots + scaling, fairies → quest → dig → trial → skill, every trial type, King → slot, Tome by quadrant). Familiar checks in `test_phase1_core`, `test_phase1_saves_familiars`, `test_characters`, `test_sites_flows` updated to the spirits; save version 6. Headless note: the full world runs at ~2–3 fps in software GL, so tests poll for results instead of fixed waits.

### Round 4 (Sept 28 2026)
- **[137] No Home button.** The 🏠 Home recall is gone (button and teleport). Waystones are the way back; the village waystone is free, and dying still sends you home.
- **[138] Fire hurts.**
  - **Campfires:** a lit campfire at a camp burns you if you step into it.
  - **Magma:** Ashlands lava crust does the same.
  - **Damage:** about 5% of max HP per second while you're in it, plus a 3-second burn (2% per second) after you step out. The first touch stings at once.
  - **Protection:** only the **Lava Unicorn, the Dragon and the Ash Dragon** keep you safe (`FIRE_SAFE_MOUNTS` / `_fireSafeMount` in `03-data.js`). Sky-port fliers no longer protect you.
- **[139] Tome immunities.**
  - Every roster monster, castle warden and evolved boss form now lists what it is **Immune to**, what it is **Weak to**, and its **Defences** (shield in front, armour, bubble, dodge, thorns, revive, regen, split, explode and more), read from its engine kit (`_tomeDefLines` in `26-tome.js`).
  - "Immune to fire" and "Weak to fire" now also work in play: burning skips fire-immune monsters and does double damage to fire-weak ones.
- **[140] Elite dens.**
  - **Room:** the last floor of all 12 bonus (treasure-vault) towers and dungeons is now **one room**, with a den per quadrant (`ELITE_ARENAS` in `07u`).
  - **Who's in it:** only the elite and its plain kin, 3 in the Grasslands up to 6 in the Ashlands.
  - **Elite HP:** about 8× a normal monster.
  - **Health bar:** a big named bar at the top of the screen (★ Elite) that disappears when it falls; then the vault opens.
- **[141] Tests:** new `tests/test_round4.py` (8 checks). Build note: `node build.mjs` doesn't catch class-syntax slips; run the inline-script parse check (docs/05) after edits.

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
- Dragon mount = 16 quests (not 8); `ALL_MAIN_QUESTS` + `_completeQuest()` in 07d.
- Fire/magma safety = Lava Unicorn, Dragon, Ash Dragon only ([138]).
- Boss rush = no healing.
- Melee damage = sword + level + non-weapon slot bonuses only (no bow leak).
- Save key = `qoz_v2` in localStorage.
- Save every 30s in WorldScene.update. Saves carry `saveVersion`; bump `SAVE_VERSION` + add a migration step when the shape changes.
- Any menu open = game paused (Phase 1). Death anywhere = village, 25% HP, −10% gold.
- ★ boss sites are sealed until the quadrant's other towers + dungeons are cleared ([119]).
- Skills (special attacks) are only taught by castle masters — never sold, never sellable ([124]).
- Familiars: ids `fam_grass/water/earth/fam_fire`; look = `FAMILIAR_PICK[element]` (07w); levels `ps.famLevels`; active slots `familiar`…`familiar4`, count = 1 + `ps.fairyKings.length`; quests `ps.fairyQuests` (`q{q}_f{i}`, `king{q}`), `ps.hasTrowel` ([131]–[133]).
- Castle ids: harbor `s{sec}_harbor_{b|c|d}` → island key `q{sec}_{b|c|d}` (`CASTLE_ISLANDS`), castle dungeon site `isl_castle_<key>`; saves: `ps.castlesDone`, `ps.skillsLearned`, `ps.campsDone`.
