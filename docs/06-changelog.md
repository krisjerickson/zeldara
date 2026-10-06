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

## Round 5 (Kris, Sept 28–29)

- **[142] Lab picks applied.** Familiars: `FAMILIAR_PICK={grass:'thornback_stag',water:'tide_serpent',earth:'stone_colossus',fire:'phoenix'}` (07w). Lab stray-select bug fixed (core verdict handler scoped to `#lab-panel .vbtn`; monster notes to `.mn-notes[data-mid]`).
- **[143] Parked mounts + Call Mount!** (`10j-world-mounts.js`). Any attack (sword, bow, spell, skill) dismounts; the mount waits where you left it, or trots to safe ground if left in water/magma/marsh/near a guarded camp. [M] next to it remounts; the mount menu has **Call Mount!** (gallops to you). Saved as `ps.parkedMount={id,x,y}`. You stay mounted if the tile under you isn't walkable (e.g. Alligator on deep water). Islands unchanged.
- **[144] Camps:** cleared camp loot is collected with one **[Tab]**; guards get `mon.campHome` and walk back home when you leave their leash (MX.tick `goHome`). Camp data/art moved to `07z-camp-art.js`. Lab **Monster Camps** tab (60 cards: guarded / cleared / used-up).
- **[145] Fairies v2** (`07x-fairies2.js`): 60 new recipe-built looks (15 per quadrant) + the 40 classic = 100; `FAIRY_PICK[q]` is now an array of 5 (every fairy in a quadrant looks different). **Fairy Monarchs** (Wetlands/Highlands/Ashlands): 9 tall angelic designs, pick via `FAIRY_MONARCH_PICK`; in-game text says "Monarch". Lab tabs: Fairies (pick 5 per quadrant, ★1–★5) and Fairy Monarchs.
- **[146] Trial realm** (`07y-trial-arenas.js` shared with Lab, `12b-trial-realm.js`): every fairy/monarch trial transports you to a temporary arena (Dungeon scene, `kind:'trial'`), 20 unique fairy trials + 3 monarch gauntlets across **12 themes**: rune targets, echo path, guardian, rune lock, escort, shadow duel, **light alignment** (rotate mirror runes so the beam hits every rune), **collapsing rune path** (memorise the spire's sequence, cross the falling walkway), beam gauntlet, boulder push (reverse-pull generated sokoban), lights-out maze (wisps), mirror walk. Difficulty scales by quadrant tier. Exit stairs = give up; knocked out = fail with 30% HP. Sandbox: `sbTrial(q,i)` (i=0..4 or 'm'); Site Lab "Fairy trials" tab.
- **[147] Castle interiors revamp** (`07ta-castle-halls.js`): floors run gatehouse → great hall (banquet tables, hearth) → round chapel (stained glass, saints, rose window) → throne room; knights' armour, great swords/axes/shield racks, banners, great torches, massive pillars, dragon/knight statues. All 12 castles re-paletted to dark stone (darkness 30–55%, torch-lit). Lab Castles tab = one design per castle floor (36).
- **[148] Mage towers** (`07zm-mage-towers.js`, `09e-mage-towers.js`): **16 towers, 4 per quadrant**, each teaches one spell (spells can no longer be bought or sold; the apothecary stopped selling them). Floors 2/3/3/4 by quadrant; magic monsters on the way up, the top floor is the master's sanctum with a **single-phase magic boss** (no phases) with signature tricks: blindness (room goes dark, eyes glow), poison, ice **slip** (new player status, momentum sliding), slow, illusions/echoes, etc. First win: learn + auto-equip the spell (+60g×q); rematch +25% gives gold. Not part of the ★ seal. Saves: `ps.mageDone`, `ps.spellsLearned`. 🔮 map icon, journal + Tome entries (spell → tower + teacher; masters list what they teach).
- **[149] Spells re-tiered:** 16 tomes, 4 per quadrant (Q1 Frost Bolt, Arcane Burst, Fireball, Thorn Snare · Q2 Arc Lightning, Ice Storm, Poison Mist, Tidal Wave · Q3 Flame Wave, Void Orb, Thunder Step, Stone Spikes · Q4 Blizzard, Void Rift, Spirit Drain, Starfall). New effects: root, short stun, drain, knockback, delayed multi-strike, aimed slowing clouds (`_spellExtraFx`).
- **[150] Mage tower looks:** 24 backgrounds to pick from (Sorcerer's Apothecary … Fungal Grotto Lab), 18 new mage room types and ~24 new props. Lab **Mage Towers** tab (walkable, tag which tower(s) each look is for).
- **[151] Lab Bosses tab:** 53 cards (guardians, mage masters, wardens, elites, island bosses, volcano) with kits in plain words.
- **[152] Test/infra fixes:** Site Lab quadrant tabs no longer list mage towers (own tab); fixed a duplicate fairy id (`salamander_rider` v2 → `ember_newt_rider`); Call Mount! could overshoot the remount window on a long frame. Old tests updated for phased bosses (round 4) and new counts (312 Tome monsters, 72 boss sprites, 60 sites).

## Round 6 (Kris, Sept 29)

- **[153] Familiars: one special each** (`09d-familiars.js`). A familiar now auto-casts only its base skill plus **one chosen special** (default: its newest skill). Choose it in the familiar info pop-up ("Use as special") or the N picker ("basic + special: X"); saved in `ps.famSpecial[fid]`, set with `window._setFamSpecial(fid,i)`. HUD chips (`#fam-hud`) show each active familiar's special, cooldown and state (knocked out / dazed / silenced).
- **[154] Crowd-control diminishing returns** (`_ccDur` / `_heroHold` in `09-hero-core.js`). Every hold (root, freeze, snare, stun) on a monster is halved while it is already held, and then it's immune for 3 s. Bosses take half duration.
- **[155] Line of sight for everyone.** One rule (`SIGHT_BLOCK_TILES` = rock, large boulder, building wall, cliff, tree, prop) for heroes, familiars and monsters. Familiar skills, hero AoE/homing/splash/chain spells and every monster attack check sight when they fire. Projectiles stop at walls; beams are cut at the first wall; the familiar wave is clipped. Monsters only choose attacks (or back off) when they can see you. Thunder Step only lands on walkable tiles.
- **[156] Monster counters to familiars** (`07rb-familiar-counters.js`, engine in `09-monster-engine.js`), mostly Highlands + Ashlands monsters:
  - **Spirit Ward** (`spiritward n=3`): blocks all familiar damage until you land n sword hits on it.
  - **Mirror shell** (`mirror`): familiar projectiles bounce off and daze the familiar that fired them.
  - **Null aura** (`nullaura r=`): nearby familiars fall silent.
  - **Resist** (`resist el=`): 75% less damage from that element's familiar.
  - **Banish** (`banish` attack): knocks your nearest familiar out for 8–15 s.
  - Every elite gets Spirit Ward + Banish at spawn; every mage-tower master has Banish.
- **[157] Familiar knock-outs.** Familiars have stagger: slams, sweeps, breath, rings and gusts build it, nets/webs catch them; at 100 they are knocked out (fade, no casting) for 8–15 s. Quadrant scaling was left as is (Kris's choice).
- **[158] The cave is gone.** The old side-view `CaveScene` (`14-scene-cave.js`) is removed along with its config, pause, zoom and sandbox hooks. **Ember Cave** is now a normal 4-floor island dungeon with 3 new looks to pick from in the Lab (`07cb-ember-caves.js`: Magma Rivers ★, Crystal Forge, Obsidian Depths). Save v7 backfills `s{sec}_harbor` from `completedIslands` (so the Dragon mount is no longer stuck behind the Ember Cave) and grants the Dragon if every main quest is done.
- **[159] Islands on the world pipeline** (`13-scene-island.js` rewritten, `07jb-island-designs.js`). `IslandScene` now extends `WorldScene`: the same streamed painter, props, lights, day/night, weather and particles as the mainland. The 96×96 island is embedded in a world-size grid at (100,100); the world globals are swapped while you're on it. Each island has:
  - **Fog of war + minimap + Full World Map** (its own fog, saved in `ps.islFog`).
  - **Two monster camps** plus ~12–16 roaming roster monsters of its quadrant.
  - **A waystone** (`wsi_<key>`) that joins the travel network (travel from any waystone to an island and back).
  - Ambient animals, weather and the shared island trader shop, a well and the guide.
  - Adventure site (familiar dungeon or castle) at the north end; the dock returns you to the harbor.
  - **16 island designs** (4 per quadrant), `ISLAND_PICK` maps each island to one; Lab **Islands** tab to re-tag.
- **[160] Island-aware systems:** mounts (parked mount remembers its map; Call Mount! brings it across), world-map waystone list, camps (`_makeCamp` extracted), travel (`_sailTo`, `_arriveAtWaystone`), keys M/Z/G/P/bow, and `_isOverworld(scene)` / `_owScene()` helpers used everywhere the code used to check for `'World'`.
- **[161] Fixes on the way:** chunk texture keys collided between World and Island (unique `_wrTag`); props with no zone crashed the painter; sprite updates after scene shutdown; `_wrNeeded` with no camera; locked harbors can still be entered.
- **[162] Tests:** new `tests/test_round6.py` (32 checks; sections `specials cc los counters ko cave islands`). `test_sites_flows` covers all 4 island adventures on the new scene; `test_round2` sails to a castle island; `test_phase1_saves_familiars` uses the special selector; harness logs page-error stacks.

## Round 7 (Kris, Sept 29–30)

- **[163] Painted bosses** (`07zz-boss-art.js` painter, `07zz-boss-designs.js` designs). Every boss form is now a layered, painted sprite in the Fairy-Monarch style instead of a 32 px pixel sprite, **growing with each phase** (≈110 px → ≈245 px tall).
  - Painters for humanoids (knights, mages, hags, giants, riders), dragons/wolves/behemoths (with optional riders), spiders (optionally with a sorcerer fused on), serpents rising from the ground, golems/constructs, great eyes / burning hearts / storm clouds, birds (roc, phoenix, thunderbird), krakens and toads.
  - Each design paints a back layer (aura, cape, wings, rings, banner) + 4 body frames (idle ×2, wind-up, strike) + a pupil layer for eyes. Painted on first use (a fight), 2–30 ms each; auto-scaled so its solid silhouette is exactly its listed height.
- **[164] Multiple options per boss** (Kris): **76 boss slots × 2–3 options = 197 designs** — the 8 guardians with all 28 phases (+ allies), 12 castle wardens, 16 mage-tower masters, 4 island guardians, 9 volcano bosses and 4 elites. `BOSS_PICK[slot]` holds Kris's choice (default option a).
- **[165] New names** (Kris: "new name, the old title"), inspired by Tolkien, Norse myth and Harry Potter but our own — e.g. Grubnash, the Goblin King (warg-rider in phase 2), Morvane, the Dark Warlock (the Hexweaver phase-spider), Granny Greenteeth, the Swamp Witch, Tharnwald, the Storm Mage (becomes a thunderbird), Grauldr, the Rock Dragon (world-serpent, then Tyrant of the Mountain), Brokkrun, the Iron Sentinel, Surtvald, the Lava Titan (the Heart of Muspel), Malgorath, the Shadow Lord (Umbral Wraith → Fell-Rider → Lidless Void → Demon of Shadow and Flame); wardens (Sir Brambleheart, Abbot Draugmere, Old Rootmarch, Skadra, Hraudrik …), island guardians (Captain Blackvane, Mossgut, Emberhulk, Hrimgar), volcano bosses (Cindermourn, Pyrecoil, Ashwing, Skorrath, Surtharn …). Names apply everywhere (HUD, Tome, phase intros — `introT` templates in 09b).
- **[166] Boss rig + motion personalities** (`10k-boss-rig.js`): hooks `CHX.bossBody` (phase-1 guardians, island, volcano, roaming world bosses, elites) and `MX.spawn` (phase forms, allies, wardens, masters). Motions: slow daunting **stride**, earth-shaking **lumber** (footfalls shake the camera + dust), **prowl**, **hover**, **glide**, **sway**, **phase** (flickers between planes, ghost copies), **blur** (afterimages), **slither**, **pulse** (heartbeat), **still** (rings turn), **fly**, **flit**. Pace changes speed (×0.6 lumber … ×1.3 blur). Any jump > 70 px (teleport/blink) fades out with a ghost left behind and fades in. Great eyes' pupils follow you. Bigger bosses get a bigger hit radius (sword reach grows with it). Painted textures are kept to an LRU of 8.
- **[167] Boss moments**: a cinematic **title card** (letterbox, name, title, "Phase II of V", lore line) + roar + slight zoom when you meet a boss; monsters hold still for the card; **on-the-spot transformation** between phases (the boss swells with light, shockwaves, roar, boom); **finale** when the last phase falls; **hit-pause** (50 ms) on sword blows to bosses.
- **[168] Sound** (`04c-audio.js`, no audio files): procedural stomps, warps, roars, booms, hits, swings, the title-card drone and a victory sting; **boss music** (drone + taiko-like drums + a modal ostinato per quadrant) that gets faster and fuller each phase; boss-rush music. 🔊/🔇 button in the action bar (remembered). Silent until the first key/click and while paused.
- **[169] Lab Bosses tab rebuilt** (`lab/src/js/52-lab-bosses.js`): every boss family and every phase in rows, 2–3 animated options per row (idle / on-the-move toggle shows each gait, afterimages and flicker), **"Choose this"** saves `{verdict:'pick', regions:[option]}` under `bosses-<slot>`, notes per row. The Tome shows painted boss portraits (128 px thumbnails; big canvases are dropped).
- **[170] Performance** (Kris's picks from the audit, `claude/11-architecture-review.md`):
  - Large animals sleep beyond ~1700 px and are drawn only on screen (was: all 64 redrawn every frame — ~31K of ~36K draw commands).
  - No fake 60-tick loading bar; ground patterns warmed only near you (the rest on demand); world-monster name labels + textures made on first wake; HUD / quest list / world labels only rewritten when they change.
  - World-build scratch grids freed; island grids share one sea row outside the island.
  - Save v8: explored map bit-packed (47 KB → ~4 KB saves).
  - Hero PNGs quantised to 256 colours; the build minifies JS with esbuild (`node build.mjs --dev` = unminified). **index.html 3.14 MB → 2.10 MB (gzip 1.52 → 0.85 MB)** even with all the new boss art; Lab 2.34 → 1.48 MB.
- **[172] Stuck-pause fix** found by the regression: closing the fairy dialogue could leave the World paused (a pause/resume race), so "Step through the portal" did nothing and the game froze. The pause system now resumes any play scene left paused with no menu open (~0.8 s), and the trial realm starts on a real timer. Island guardians and elites take their painted names when created.
- **[171] Tests**: new `tests/test_round7.py` (22 checks; sections `paint game moments lab`) and `tests/test_perf.py`.

## Round 8 (Kris, Sept 30) — boss finalisation, part 1 (looks)
- **[173] Picks applied**: `BOSS_PICK` holds Kris's Lab choice for all 76 slots (07zz-boss-designs.js, end section). Unpicked options stay in `BOSS_SLOTS` for reference.
- **[174] One look per boss across all phases**: new `src/js/07zz-boss-sig.js`.
  - `D.sig` paints the same crown / witch hat / chest mark (star, hourglass, gem) / rock crust / magma cracks / weapon swoosh / background effect (runes, coins, mist, storm, shards, forge, lava, eclipse → dawn) on any archetype.
  - It uses anchor points that each painter records with `BA.anc` (head, chest, shoulders; a rider beats the beast).
  - Picked designs are retuned with `R8()` (palettes, signature pieces). `BOSS_THREADS` describes what each family keeps.
- **[175] New forms**:
  - Rock Dragon phases 3 and 4 fly: new `wyvern` archetype (two wings on the back layer beaten with `flapY` around the shoulder pivot, long S-neck, whip tail, glowing chest furnace) and `soar` motion. Options `bf_rock_dragon_3.d/e` and `bf_rock_dragon_4.d/e`.
  - Lava Titan phase 3 has 3 titan options (`bf_lava_titan_3.d/e/f`): flame head, lava swoosh arcs on wind-up/strike, ember trail in game (`sig.trail` → `BossRig.ember`).
- **[176] Lab Bosses tab**:
  - Each guardian family opens with a line-up of every phase (the effective pick) and "Kept through every phase" text.
  - Adds a "The family looks right" toggle (`bosses-fam-<id>`) and family notes.
  - Picked rows show the pick; the rest sit under "Reference — not selected". Redrawn rows are tagged NEW and ask for a choice.
- **[177] Tests**: `tests/test_round8.py` (14 checks, sections `paint lab`); `test_round7` name check updated (Grubnash the Great).
- **Next (after Kris reviews the Lab)**: Hollow-Knight-style attacks (sky rain + sweeping walls, radial bursts + rotating beams, floor takeover + burrowing, combos/boomerangs/desperation + stagger), fewer summons, quadrant difficulty ramp with decent boss health.

## Round 8, part 2 (Kris, Oct 1) — final boss looks + signature attacks
- **[178] Kris's Lab review applied**:
  - Picks: Rock Dragon 3 = e, Rock Dragon 4 = e (bigger torso and legs + forelegs: `torso`, `legScale`, `arms`), Lava Titan 3 = d.
  - Iron Sentinel's shoulder rocks are now stalagmite spires (`sig.rocks:'spires'`).
  - Lava Titan phase 4 shows the burning heart in its chest (`sig.mark:'heart'`), leading into the heart of phase 5.
  - Shadow Lord:
    - Phase 3: Malgorath rides a dread-wing (new `bf_shadow_lord_3.d/e`: wyvern with `headKind:'fell'`, tattered wings, rider).
    - Phase 4: he becomes the dread-wing (`bf_shadow_lord_4.d/e`).
    - Phase 5: keeps the black hovering orb, now with a gold corona.
- **[179] Wings fixed**:
  - Dragons' wings sit on their own layers: a far wing behind the body and a near wing in front, so two wings always read.
  - Each wing beats around its root (`wingRoots`, sheet frames `wb`/`wf`), so it never comes loose. Walkers' wings breathe gently.
  - Phaser flips images around the frame centre, not the origin; `BossRig.fx` now compensates, so feet and wing roots stay put when a boss turns.
- **[180] Signature attacks**:
  - Data: `src/js/07zz-boss-attacks.js`. Engine: `src/js/09bb-boss-patterns.js` (`BossPat`).
  - 12 Hollow-Knight-style patterns that cover the visible screen with a gap or safe spot to find: sky rain, sweeping wall, radial burst, rotating beams, floor takeover, burrow & erupt, boomerang, shockwave, leaping combo, strafing run, eclipse, mirror images.
  - Each guardian phase gets 3–4 patterns from its family (`BOSS_ATTACKS`). Wardens, mage masters and island guardians get 2 by element; elites get 1.
  - Telegraphs draw above the fog of war.
- **[181] Fight rules**:
  - A director runs the patterns, paced by `BOSS_RAMP` per quadrant (Grasslands: 1.4 s warnings, 3 safe columns, 8 s between moves, 0.6× damage → Ashlands: 0.85 s, 2 safe columns, double waves, 4.8 s, 1.0×).
  - Punish window after each big move: the boss holds 1.4 → 0.75 s.
  - Stagger: 8 → 14 hits (+1.5 per phase) makes the boss reel for 2.4 s and take +50% damage.
  - Last stand: below 15% on a final form, 2–3 patterns at once, then 25% faster.
  - In the Highlands and Ashlands the boss keeps fighting during screen-wide hazards.
  - `mon._hold` freezes a boss in the dungeon monster loop.
- **[182] Summons and health**:
  - Guardian summons are removed except the Swamp Witch's frogs (`BOSS_KEEP_SUMMON`). The multi-boss finales and allies stay.
  - Guardians have +20% health, because stagger windows speed fights up and weapons and familiars keep getting stronger.
- **[183] Lab**: each boss row lists its signature attacks and last stand (`BossAtk.describe`). The new Shadow Lord forms are tagged NEW.
- **[185] Fixes found by the regression run**:
  - Boss textures that are still drawn somewhere (roaming world bosses, afterimages) are never evicted by the texture budget. Eviction used to crash rendering after many fights.
  - The engine's ring attack no longer skips over the hero at low frame rates.
- **[184] Tests**:
  - New `tests/test_round8b.py` (15 checks): every pattern runs and cleans up, lands on a careless hero, rain/burst safe spots, punish window, director, stagger, last stand, summons, other bosses, Lab.
  - `test_round8.py` gained wing-layer and review-fix checks.
  - Regression run: all pass except known timing flakes. `test_perf` island chunk mounting fails on the previous build too. A chime-spirit ring can miss through its gap, by design.
  - Commit 5711f98.

## Round 9 (Kris, Oct 1) — boss finalisation after play-testing + hosting prep
- **[186] Boss hurtbox**:
  - Painted bosses are hit anywhere on the lower two-thirds of the body: an oval from the feet to the chest, sized from the design's height and archetype (`HB_W`).
  - It used to be only the feet point. `_hbP` / `_hbD` / `_hbHit` in `09-hero-core.js`.
  - Used by the sword (dungeon, world, volcano), hero projectiles, area spells, chain lightning, clouds and every familiar attack (nearest, nova, rain, aura, beam, pierce).
- **[187] Always reachable**:
  - The nearest hurtbox point is pulled back toward the feet if it would sit in a wall.
  - Bosses only stand on tiles reachable from the entrance, with 16 px of floor around them (`BossPat.stand` / `BossPat.reach`). A boss pushed, teleported or leaping into a wall is put back.
- **[188] Familiar falloff**: by active slot, 100 / 60 / 40 / 25% damage (`FAM_SLOT_DMG`, `_famSlotK`), in all fights; all four ≈ 2.25× one. Heals are unchanged. The HUD chip shows the share.
- **[189] More boss health**:
  - Guardians ×1.8 of the original (round 8 +20%, now +50% more; `BOSS_HP_R9`).
  - Castle wardens, mage masters, island guardians and volcano-rush bosses +50%. Elites +25%.
- **[190] Player profiles + 3 save slots** (`src/js/04d-profiles.js`, `ZSave` / `ZProfilesUI`):
  - New Game asks your name; Returning Player lists the names on this device; each name has 3 slots.
  - Export/Import save codes (`.zsave`, `ZLD1:` prefix).
  - The old `qoz_v2` save moves into "Player 1", slot 1 (copy kept as `qoz_v2_moved`).
  - `ZSave.store` adapter is ready for a Supabase store later.
  - The test harness picks Player 1 / slot 1 when given a save.
- **[191] Hosting**:
  - `npm run build` also writes `dist/` (game + `/lab`).
  - `vercel.json` builds on Vercel (`npm run build` → `dist`).
  - `.vercelignore` uploads only the sources. `.gitignore` drops built files.
  - GitHub's old April "Add files via upload" commit is already an ancestor of local `main`, so a normal `git push` works (fast-forward, 21 commits).
  - Steps for Kris: `docs/12-hosting-and-saves.md`.
- **[192] Tests**: new `tests/test_round9.py` (7 checks) and `tests/test_saves.py` (13 checks).

## Round 10 (Kris, Oct 1) — brand: logos, wordmarks, home-page looks (Lab review)
- **[193] `src/js/07zz-brand.js` (`ZBrand`)**, all drawn in code:
  - 20 symbol logos (`ZBrand.SYMBOLS`), each at 3 detail levels (3 full-screen with rune ring, 2 medium, 1 small/icon). One colour each, in 4 finishes (bevel, neon, carved, gilded), with a breathing runic glow from cached layers.
  - 10 "ZELDARA" wordmarks (`ZBrand.WORDS`): our own rune-cut letters (`GLYPH`, `GLYPH2`) and dressed display fonts.
  - 15 animated home-page looks (`ZBrand.HOMES`, `ZBrand.home`): aurora, stars, shooting stars, rune rings/columns/frames, spirits, silhouettes.
- **[194] Lab tabs** Logos, Wordmarks and Home Pages (`lab/src/js/53-lab-brand.js`): ☆ Pick (several allowed), notes, ⛶ full-screen. Picks are saved as `logos-<id>`, `words-<id>`, `homes-<id>`. Home previews use the picked logo and wordmark.
- **[195] Save export** also shows the save code to copy, for places where downloads are blocked (e.g. the Claude artifact preview).
- **[196] Tests**: `tests/test_brand.py` (8 checks). Commit 8234fa4.
- **Next (after Kris picks):** build the Next.js home page at `/` with the chosen look, logo and wordmark; move the game to `/play`; restyle the in-game title to match; use the small logo in the game.

## Round 11 (Kris, Oct 2) — brand, second pass (Lab review)
Kris's feedback on round 10: iterate before final picks. Logos all light teal, more elaborate, several complexity levels incl. fractal. Wordmarks all gold, more elaborate, with a war axe. Home pages combine his three picks, with knotwork borders on the buttons and the wordmark font. Nine inspiration images (Norse / Celtic knotwork) used as style reference only.
- **[197] `src/js/07zz-brand2.js`** (loads after `07zz-brand.js`; round-10 designs get `gen:1`, new ones `gen:2`):
  - New drawing blocks on `ZBrand.P`: `braid` (two-strand knot band with over/under), `rail`, `meander` (key border), `band` (runes along a path), `ftree` (fractal tree), `dragon` (ribbon-dragon head), `axe` (bearded war axe), `triq`. Path helpers `ZBrand.ring`, `ZBrand.arc`, `ZBrand.seg`.
  - Each finish pass is drawn on its own layer (`ZBrand._raw` for gen 2, `ZBrand.passes`), so erasing for over/under knots works with multi-pass finishes.
  - **32 logos, all teal (`ZBrand.TEAL` #63f2dc):** the 8 picks × A elaborate / B knotwork / C fractal (`tree_`, `compass_`, `spirits_`, `peaks_`, `knot_`, `triq_`, `way_`, `blade_` + `a|b|c`), plus 8 new: `serpent_ring`, `tree_triquetra`, `twin_dragons`, `crossed_axes`, `rune_pillar`, `realm_tree`, `knot_dragon`, `realm_hammer`. Medium / small sizes reuse the simple round-10 shape.
  - **10 wordmarks, all gold (`ZBrand.GOLD` #f2c14e, gradient fill):** `axe_crest`, `axe_l`, `great_axe`, `twin_axes`, `dragon_rule`, `key_bands`, `knot_plaque`, `tree_axes`, `arc_crest`, `ring_z`. Lettering via `ZBrand.text` (Cinzel Decorative / Cinzel / Marcellus SC).
  - **6 home pages:** `crown_columns`, `knot_frame`, `meander_gate`, `tree_veil`, `serpent_ring`, `quiet_runes`. All share the top aurora, glowing side rune columns, teal runes, knot / key / line borders on the two buttons and Cinzel button lettering. The carved parts are cached per size; buttons shrink to fit narrower screens.
  - `peaks_c` uses fractal ridge lines, not a triangle made of triangles (too close to another game's emblem). No valknut anywhere.
- **[198] Lab**: the three brand tabs show the second pass first (logos grouped by pick); round-10 designs sit in a collapsed "First round" section with their picks still marked. Home previews use the picked second-pass logo / wordmark (samples: `tree_b`, `twin_axes`). Cinzel added to the Lab fonts.
- **[199] Tests**: `tests/test_brand.py` now 10 checks (counts per round, colours, A/B/C coverage, more line detail than round 10, nothing clipped, tabs, pick, full-screen).
- **Next (after Kris picks):** unchanged — Next.js home page at `/`, game at `/play`, matching in-game title, small logo in the game.

## Round 12 (Kris, Oct 2) — third brand pass, boss health ×2, waystone travel
- **[200] Boss health ×2** (`BOSS_HP_R12=2` in `07d-site-roster.js`): dungeon / tower guardians, castle wardens, mage masters, island bosses and volcano-rush bosses (the imp swarm stays). Elites and trials unchanged. Example: Goblin King 171 → 342, Shadow Lord 468 → 936.
- **[201] Waystone travel** (`10b-world-travel.js`, `10i-world-fairies.js`, `21-ui.js`):
  - Kris's report: the travel map opens, but after choosing a waystone you stay where you are.
  - `_arriveAtWaystone` now moves you at once and then fades in. Before, the move waited for a camera fade-out to finish; if that fade never started or never finished you stayed put. I could not reproduce that exact failure in tests, so this removes the dependence rather than a proven cause.
  - A fairy hovering at a waystone no longer takes [Tab]: at a waystone the stone wins unless the fairy is clearly closer (1.5 tiles). In tests this stopped the map opening at 3 of 17 waystones.
  - Destinations you cannot afford stay clickable, show "need Ng" in red, and the message says how much gold you have.
  - If the arrival tile is blocked, a free neighbouring tile is used.
- **[202] Third brand pass** (`src/js/07zz-brand3.js`, `gen:3`):
  - **20 logos**, teal, dense, no fractals. Nine after the nine pictures (`totem_tree`, `tree_gate`, `tree_ravens`, `dragon_rise`, `serpent_coil`, `tri_tree`, `sword_dragons`, `way_hammer`, `way_axes`) — our own drawings of each layout, nothing traced, no valknut. Eleven on Crossed Axes and the other picks (`axes_tree`, `axes_way`, `axes_blade`, `axes_dragons`, `axes_serpent`, `axes_crown`, `blade_tree`, `way_compass`, `shield_arms`, `winged_axe`, `axe_compass`).
  - **`ZBrand.TIER2`**: the 12 logos Kris picked so far (Crossed Axes first), kept as second-tier marks.
  - **Wordmark winner `ring_z`** in 10 typefaces (`ZBrand.RZ_FONTS`, ids `rz_*`): Uncial Antiqua, Metamorphous, Pirata One, Grenze Gotisch, Almendra SC, New Rocker, Caesar Dressing, Cormorant Unicase, MedievalSharp, Marcellus SC. `ZBrand.text(...,{norm:true})` draws every face at the same capital height.
  - **Home page**: the pick `tree_veil` reworked as `veil_a` (as picked), `veil_b` (carved pillars), `veil_c` (knot frame). Button lettering follows the wordmark typeface and shrinks to fit.
  - New blocks: raven head, sun ring, round shield, double-bitted axe, rounded-triangle band, dragon head on a path end. Shared helpers exposed as `ZBrand.K` and `ZBrand.H`.
- **[203] Lab**: typefaces are embedded (`lab/src/js/52-lab-fonts.js`, latin subsets, SIL OFL, from `@fontsource`) so they always render. Brand tabs show the third pass first, then the second tier; earlier rounds are folded away. Each design appears once.
- **[204] Tests**: `tests/test_round12.py` (7 checks: boss HP, all 17 waystones in a row, back-to-back travel, fairy vs stone, low gold). `tests/test_brand.py` now 12 checks.

## Round 13 (Kris, Oct 2) — final brand picks built: logo sizes, home page, title screen
Kris's picks: logo `tree_c` (World Tree), wordmark `ring_z` in Cinzel Decorative, home page `veil_a` (World Tree Veil). Seven second-tier logos.
- **[205] Final picks in code** (`07zz-brand3.js`): `ZBrand.LOGO='tree_c'`, `ZBrand.WORDMARK='ring_z'`, `ZBrand.HOME='veil_a'`, `ZBrand.TIER2` = `crossed_axes`, `axes_serpent`, `axes_tree`, `blade_b`, `serpent_coil`, `way_b`, `way_compass`.
- **[206] Logo sizes, as Kris asked**: full = as picked; medium (level 2) = tree + rune ring; small (level 1) = tree, two circles, dots; icon (level 1 under 16 px radius) = just the tree, drawn bolder. `ZBrand.favicon()` sets the browser-tab icon from the icon size.
- **[207] Brand typefaces embedded in the game** (`src/js/07zy-brand-fonts.js`): Cinzel Decorative 700, Cinzel 700/900, Marcellus SC (latin subsets, SIL OFL). `ZBrandFonts.load()`.
- **[208] Home page drawing options** (`07zz-brand2.js`): `ZBrand.home(..., {btns, blurb})` paints one or two buttons; two buttons stack when the page is narrow; under 16 units wide the side columns and carving are dropped. `ZBrand.homeLayout(cfg,W,H,opts)` returns the button rectangles.
- **[209] In-game title** (`06-scene-title-boot.js`): the title is the World Tree Veil page with the logo and Ringed Z, painted on a canvas texture about 25 times a second. Invisible hit areas sit over the painted buttons. The loading screen shows the wordmark. The game HUD is hidden on both (`body.on-title`). `?start=new` / `?start=returning` (or `sessionStorage.zeldara_start`) opens the matching dialog straight away.
- **[210] Next.js home page** (`site/`, Next 16, static export):
  - `site/app/page.js` paints the same page with the game's brand code (`site/public/brand.js`, generated by the build) and puts real links over the buttons: New Game → `/play?start=new`; Returning Player → `/play?start=returning`, shown only when this browser has a saved player.
  - Phone portrait: buttons stack, the story line is real text. Reduced-motion setting: one still frame.
  - `build.mjs` now builds `dist/` as: `/` home page, `/play` the game, `/lab` the Lab. Without `next` installed it writes a plain fallback page at `/` that goes to `/play`.
  - `package.json`: `next`, `react`, `react-dom`; Node ≥ 20.9. `vercel.json` unchanged (`npm run build` → `dist`).
- **[211] Lab**: each brand tab leads with the final pick, then (Logos) the second tier; everything else is folded away.
- **[212] Tests**: `tests/test_site_home.py` (11 checks, serves `dist/`: home page paint, links, handoff into the game, phone layout, Lab). `tests/test_brand.py` 13 checks.

## Round 14 (Kris, Oct 2) — logos and the wordmark typeface throughout the game; projectile options
- **[213] Typeface on titles and labels** (Kris: titles and labels only; small body text stays plain):
  - `src/styles.css`: `--zf-title` (Cinzel Decorative) for window headers, zone / camp banners, the dungeon title, the player dialog title and boss names; `--zf-head` (Cinzel) for section headings; `--zf-label` (Marcellus SC) for buttons, tabs, item / mount / quest names, the region name, world labels and prompts.
  - `src/js/04e-brand-text.js`: text drawn by Phaser that asked for 'Segoe UI' now gets Cinzel (bold or 14 px and up) or Marcellus SC (smaller). `ZFONT`.
  - Messages, descriptions, dialogue and tooltips are unchanged.
- **[214] Main logo in the plaza floor**: the village green's rune circle (`runecircle` with `logo:true`, `07f-world-engine.js` / `07l-village-runic.js`) is now the World Tree logo as a floor inlay — dark flagstones, glowing teal lines — where a new game begins.
- **[215] Logos at work** (`src/js/22b-brand-ui.js`, `ZLogo`):
  - `way_b`: travel-map header, a glowing mark and banner when a waystone awakens, a mark on arrival.
  - `way_compass`: compass rose on the world map, and the map header.
  - `crossed_axes`: boss title cards, the Victory banner, forge / armoury windows, the dungeon title.
  - `axes_serpent`: emblem beside the boss health bar, the Volcano quest line.
  - `axes_tree`: the player / save-slot dialog, Guild and Quest Journal windows.
  - `blade_b`: Level-up, new-skill and new-spell banners.
  - `serpent_coil`: the "You fell" banner, harbour / ferry / trader windows, the Setting-sail banner.
  - Main logo: Tome, Inventory, Mounts and Controls window headers (besides title, loading screen, tab icon).
  - `ZLogo.url(id,px)`, `ZLogo.banner(id,title,sub)`, `ZLogo.flash(scene,id,x,y)`; window emblems are chosen from the window title (`ZLogo.forTitle`).
- **[216] Projectile options for review** (`src/js/07zx-projectiles.js`, `ZProj`; Lab tab **Projectiles**, `lab/src/js/54-lab-proj.js`): 6 looks for arrows and darts (normal, cold, fire, seeking), 5 for spells, 4 for monster shots. Picks are saved as `proj-<id>`. **The game still draws shots as coloured dots until Kris picks.**
- **[217] Tests**: `tests/test_round14.py` (10 checks).

## Round 15 (Kris, Oct 2) — picked shots in the game; bigger plaza logo
Kris's picks in the Lab: arrows `ar_bodkin` (Heavy Bodkin), spells `sp_solid` (Solid Elements), monster shots `en_real` (Real Things). `ZProj.PICK`.
- **[218] Shots are pictures now** (`src/js/09g-shots.js`, `ZShot`): `ZShot.make(scene,kind,x,y,angle,depth)` returns an Image the old code moves and destroys as before. It turns to face its flight, plays 8 frames (painted once per kind at 2×, shown at half scale), leaves the look's trail (air ripple for the bodkin, smoke for fire, frost for cold) and sparks when an arrow ends. If it fails, the old dot is used.
  - Wired in at every place a shot is created: player bow / crossbow (`02-hero-api.js`, `22-ui-shops.js`), player spells (`09-hero-core.js`, `10-scene-world.js`), monster shots in the world and dungeons (`10-scene-world.js`, `12-scene-dungeon.js`), and the monster engine (`MX.proj`, which now gets `kind`).
  - Mapping: `ZShot.ammoKind` (arrow / dart × normal, cold, fire, seeking), `ZShot.spellKind`, `ZShot.monKind` (old attack types), `ZShot.mxKind` (what the monster throws, else its colour; `spit:#hex` and `bolt:#hex` are tinted).
  - Spells the Lab did not show got solid shapes of their own in `07zx-projectiles.js`: Arcane Burst, Thorn Snare, Tidal Wave, Stone Spikes, Void Rift, Spirit Drain. Darts now have cold / fire / seeking heads.
  - **Not changed:** familiar shots, the sky-chase bullets and the Volcano scenes' rocks and fireballs still use their old look.
- **[219] Plaza logo** is as wide as the ring of standing stones (`runecircle` option `grow:2.12`), with a lighter flagstone tint.
- **[220] Where a game begins** (Kris: only new games in the rune circle): confirmed by test — a new game begins in the middle of the runes, a continued game resumes where it was saved. No code change.
- **[221] Tests**: `tests/test_round15.py` (8 checks).

## Round 16 (Kris, Oct 2) — the remaining shots
- **[222] Familiar shots, sky-chase darts, Volcano rocks and fireballs** use the picked look too (`ZShot.make(..., size)`):
  - Familiars cast in their element (`ZShot.famKind`): grass → thorn, water → wave, earth → stone shard, fire → fireball; smaller than the hero's spells (0.6, splash skills 0.85). Their coloured glow is kept.
  - Sky chase: the ship fires bodkin darts (frost-headed during the three-way shot).
  - Volcano climb (`VolcanoBulletHell`): falling rocks tumble, homing fireballs burn and trail smoke.
  - This replaces the "Not changed" note in [218]. Every moving shot in the game now goes through `ZShot`.
- **[223] Tests**: `tests/test_round15.py` now 10 checks; both scenes smoke-tested live (rocks, darts, no errors).

## Round 17 (Kris, Oct 3) — the other shots in the Lab
- **[224] Lab → Projectiles: "In the game now".** Five new cards lead the tab and show every shot the first cards left out, in the picked looks (`ZProj.PICK`), flying at game size and enlarged:
  - The other six spells (arcane burst, thorn snare, tidal wave, stone spikes, void rift, spirit drain).
  - Crossbow darts by element (normal, cold, fire, seeking).
  - Familiar shots at their real size (×0.6; splash special ×0.85).
  - Monster shots tinted per monster (web, ink, water, poison, two bolts, monster fire, monster spark).
  - Sky chase darts (×1.15) and the Volcano climb's falling rock (×1.35) and homing fireball (×1.1).
  - The 15 looks Kris chose from are folded under "The looks you chose from (round 14)". Card ids `now_spells`, `now_darts`, `now_fam`, `now_mon`, `now_set` (notes save as `proj-<id>`). Code: `lab/src/js/54-lab-proj.js` (`NOW`, `lanes`). No game code changed.
- **[225] Tests**: `tests/test_round14.py` now 11 checks (the five cards exist, lead the tab and paint).
- **[226] New doc `13-next-steps-and-engine-options.md`**: what to do next against the phase plan, what Next.js would and would not improve, and other ways to build a web game.

## Round 18 (Kris, Oct 3) — engine switch, two heroes, sprite library prep
- **[227] Engine switch.** The game still runs on Phaser 3.60. It can now also run on Phaser 4.2.1:
  - `node build.mjs --engine=4` (or `ZELDARA_ENGINE=4`) makes Phaser 4 the default; any built page takes `?engine=3` or `?engine=4`.
  - `dist/` has `/play` (default), `/play3` and `/play4`, so both can be tried from one deploy.
  - New `src/js/00a-engine.js` (`ZENG`): the 9 calls that differ go through it — `tintFill` / `tint` (5 hit-flash sites), `mask` (lava glow), `rtDone` (night and dungeon darkness), `config` (pixel rounding).
  - The artifact builds load one fixed engine. `build.mjs` now writes `zeldara.artifact.html` itself.
  - Tests: `ZELDARA_ENGINE=4 python tests/<suite>.py` (engine file in `tests/.phaser4/`).
- **[228] Two playable heroes.** New Game → name → slot → **Choose your hero** (boy or girl). Saved as `ps.hero`; old saves are the boy. The girl is a recoloured stand-in (red-auburn hair, wine-red cape) until her sprites are painted (`_heroRecolour`, `_heroKey` in `02-hero-api.js`).
- **[229] Sprite manifest** `src/js/07zs-sprites.js` (`ZSPR`): 439 characters, 919 sheets (667 core), 6,255 poses, built from the game data. Kit move → animation table (`ZSPR.MOD`); hero weapon and skill mapping (`ZSPR.HERO`); the hero draw code records `st.anim`.
- **[230] Requests and tools.** `node build.mjs` writes `sprites/requests/` (requests.json, one .md per wave, survey.md). `tools/sprites/generate.mjs` feeds the OpenAI image API (Kris's key, from the environment). `tools/sprites/intake.py` cuts sheets into frames and packs atlases. References in `sprites/reference/`.
- **[231] Lab → Sprite Library tab**: Guide (totals, process, style, hero mapping tables, 12 pilot requests) and one group per kind of character, with stand-in, moves, sheets, Copy request, "Looks right" and notes (`sprlib-<id>`).
- **[232] Tests**: `tests/test_round18.py` (30 checks, run on both engines). `test_saves.py` and `test_site_home.py` pick a hero.
- **[233] New doc `14-sprite-library.md`**; doc 09 is kept for history only.

## Round 19 (Kris, Oct 4) — first sheet in, the girl's looks
- **[234] First ChatGPT sheet received: the boy's model sheet.** Renamed to `sprites/incoming/hero_m.model.png` (was "Hero (boy) — Model sheet (front, side, back).png.png"). Real transparency, 3 poses, matches the references. The intake cut it into 3 frames (66 × 116 px cells) with no changes needed.
- **[235] The girl: three looks to compare** (`ZSPR.HERO.GIRL_LOOKS`, `GIRL_PICK`). Kris: more than auburn hair — long braided hair plus other differences. All three have long braided auburn hair:
  - A Ranger: one long braid down the back with a teal ribbon, feather, freckles, wine-red hooded cape, skirted tunic over leggings, tall boots.
  - B Shieldmaiden: two long braids with silver clasps, braided headband with a teal gem, fur-collared teal mantle with a knotwork brooch, bracers, fur-cuffed boots.
  - C Wayfinder: one very long side braid with flowers, long trailing wine-red scarf (no cape), cropped green jacket, satchel, rune pendant, knee-high boots.
  - Requests `hero_f.model_a / _b / _c` (pilot, attach the boy's model sheet). The kept one becomes `hero_f.model`. Until Kris picks, look A is the default for her other sheets.
- **[236] Lab → Sprite Library**: "Received so far" shows each sheet as it came, and its cut frames at game size next to today's hero (grass and dungeon stone, today's size and 1.5×). The three girl looks have their own cards with Copy request, "Looks right" and notes. Previews come from `sprites/preview/` (written by the intake, embedded by the build).
- **[237]** `sprites/incoming/*.png` stay out of git (about 1 MB each, 900+ expected); `sprites/preview/` and the atlases are what is committed. Tests: `test_round18.py` now 32 checks.
- **[238] The girl's first sheet received (Oct 4): look B, Shieldmaiden.** Kris saved it as `hero_f.png.png`; renamed to `sprites/incoming/hero_f.model_b.png`. Real transparency, 3 poses, cut cleanly (66 × 116 px cells). Shown on the look B card in the Lab. Note: the braids hang in front in the front view and down the back in the back view.

## Round 20 (Kris, Oct 4) — the girl is locked, cheaper sprite plan
- **[239] The girl is look B (Shieldmaiden).** `GIRL_PICK:'b'`, `GIRL_LOCKED:true`; `sprites/incoming/hero_f.model.png` is a copy of the look B sheet. Looks A and C are kept in the code for the record but are no longer requested. The New Game picker caption says "Twin auburn braids, teal mantle".
- **[240] Cost.** Kris: the API estimate was too high. His choices: keep full frames but send them at **medium quality** (the script's default is now `--quality medium`), and repaint **bosses as one pose each**.
  - Bosses: 76 bosses on 10 shared sheets (`bosses.1` … `bosses.10`, 8 per sheet, one 3/4 battle pose each). The game keeps moving them itself, as it does today. This replaces 216 boss sheets.
  - New totals: **713 sheets (557 core, 156 extra)**, down from 919 (667 core).
  - The intake handles sheets of different characters (`@<character>|…` pose names, a size per character).
- **[241]** Pilot is now 12 requests, 2 done (both hero model sheets). `test_round18.py`: 33 checks.

## Round 21 (Kris, Oct 4) — wave 0 is in; real cost; bosses back to full frames
- **[242] Wave 0 received through the script** (first live run, no errors): 10 sheets at medium quality — hero move and melee, goblin (side, front/back), thistle hog, blacksmith, horse, boy on horse, grass spirit, boss set 1. All have real transparency and all cut cleanly. The boss set had two bosses overlapping, so shared boss sheets are dropped.
- **[243] Measured cost** (`sprites/incoming/_log.jsonl`): 343 image-output tokens per sheet at medium; 2,048–5,036 image-input tokens (the reference images) and about 700 text tokens. At the published token prices: **$0.030–0.055 per sheet, $0.36 for the 10**. Kris's dashboard showed about $0.12 for them. The first estimate ($0.20–0.35 per sheet at high quality) was 5–10× too high for medium.
- **[244] Plan widened again (Kris):** every boss has its own sheets with full frames (216 sheets); monsters get 2 death frames (on their extra sheet; the core sheets already received do not change); the script now sends all tiers by default (`--tier all`). **995 sheets (667 core, 328 extra), 6,735 poses.** At the measured cost about $12–45 for everything.
- **[245]** Lab previews are smaller (sheet 720 px, frames at most 132 px tall). Still about 150 KB per sheet; before more than about 60 sheets are in, the previews must move out of the Lab file (attached files or frames only). `test_round18.py`: 34 checks.

## Round 22 (Kris, Oct 4) — wave 1 (heroes) is in
- **[246] Wave 1 received:** all 40 hero sheets (20 per hero) plus the Goblin King's first sheet. 48 sheets cut so far, none rejected. Logged cost at list prices: $1.91 for 47 sheets ($0.041 per sheet).
- **[247] Intake:** runs on the PC now (the sheets are about 2 MB each, too many to copy to the cloud); only new or changed sheets are cut (`--force` redoes all, `--limit=N`, `--atlas` packs the game atlases). Poses that touch (sword arcs, spell bursts) are now separated through the thinnest point near the grid line and stray slivers at the cell edge are removed; before, 19 of 48 sheets were cut straight down the grid line.
- **[248] Lab previews as files:** the intake packs each sheet's cut frames into preview pages per wave (`sprites/preview/w<wave>-<n>.webp` + `index.json`, about 45 KB per sheet). The build copies them to `lab/preview/`; the Lab loads them from there (the artifact carries them as attached files). The Lab file is back to 2.2 MB. Each character card shows a strip under every received sheet and a small player that runs through the animations; group chips show sheets received.
- **[249]** `test_round18.py`: 35 checks.

## Round 23 (Kris, Oct 4, evening) — all waves in; painted sprites in the game
- **[250] Sheets received:** 987 of 995 sheets are in `sprites/incoming/` on the PC; all were cut, none rejected. Missing: the 6 new hero walk sheets (`hero_m/f.move2.s/f/b`, not sent yet), `tc_sprint.core.f` and `fam_fire.core.q` (both failed on rate limits). Suspect (one pose almost empty): `bloodgnats.core.q` (pose 5), `petal_witch.core.s` (pose 7). `python tools/sprites/intake.py --check` lists both and prints the commands to redo them (`sprites/out/check.json`).
- **[251] Duplicate paintings (a mistake in the command list):** doc 14 listed one command per wave pair and, under "useful extras", one command for everything. Run together they painted the same sheets more than once: 1,914 paintings for 992 sheets (922 duplicates, about $35 of $73.17 at list prices). Each terminal made its to-do list when it started and did not look again. Fixed in `generate.mjs`: a sheet is checked again right before it is sent and claimed with a file in `sprites/incoming/.claims/`, so several terminals share the work without repeating it; rate-limit waits are longer (6 attempts). The command list in doc 14 now has one way to run things.
- **[252] Hero walk, second version:** six frames (contact, down, passing, twice) with a wide stride and swinging arms, sheet key `move2` (idle 2 + walk 6 + run 2). The first movement sheets stay in use until the new ones arrive (`legacy` entries in `requests.json`). Command: `node tools/sprites/generate.mjs --wave 1`.
- **[253] Intake:** sizes come from each character's standing sheet (`scale_ref.json`), riders from their mount; a version stamp re-cuts everything when the rules change; `--atlas` packs incrementally (only atlases whose frames changed; `--budget=N` seconds, run again until it says finished; state in `sprites/out/atlas_state.json`); `--check` as above.
- **[254] Atlases:** `assets/atlas/<name>-<n>.webp` + `index.json` (93 pages of 2048 px, 437 characters, 6,719 frames, 123 MB). Names: `heroes`, `mounts`, `village`, `companions`, `mon-w<wave>`, `boss-w<wave>`. Frames are trimmed; the index gives page, position, cell size and offset, so feet stay at the bottom centre of the cell. The 70 boss pages (`boss-w*.webp`, about 86 MB) stay on the PC and are not committed or shipped until bosses use them (`ZAtlas.BOSSES`); the 23 other pages (37 MB) are committed and attached to the game artifact. The build puts the index into the page (`ZATLAS_META`) and copies the pages to `dist/play*/assets/atlas/`.
- **[255] Painted sprites in the game (`ZAtlas`, `src/js/04f-atlas.js`):** pages load as plain images the first time a character on them is needed; until then, and for anything not painted, the stand-in shows. One factor for everybody: a 112 px cut shows 63 px tall (1.5 × the old 42 px hero); hitboxes are unchanged.
  - Heroes (both): idle, walk, run (Sprint), sword / axe, bow / crossbow, staff / wand / hand, shield block (Shift), every skill pose and spell cast, in side, front and back views; riding uses the painted rider-and-mount picture.
  - Monsters (engine and legacy, world and dungeons): idle, move or hover, each attack by its kit module (`ZSPR.MOD`), hurt, hide / burrow, a short painted death where the frames exist; humanoids turn to front and back views. Name and health bar sit above the painted height.
  - Village folk, keepers, craftsmen, trainers: idle, work, talk (when the hero is next to them), walk where painted. Familiars, fairies, monarchs and the parked mount use their frames when present.
  - Not yet: bosses (their rig has back layers, pupils and forced frames; today's boss art stays), animals (drawn as shapes today), vehicles.
  - Off switch: Dev panel → "Painted sprites", or `?sprites=0`.
- **[256] Fix:** `ZSPR.HERO.animFor` read `ps.equipped`; the save uses `ps.equip`, so the weapon class always fell back to sword / bow / hand.
- **[257] Tests:** `test_round23.py` (17 checks, passes on both engines): atlas index, painted hero in four directions, attack, monsters, village folk, riding, off switch. Suites written for the stand-ins run with painted sprites off (`game(painted=False)` in the harness).

## Round 24 (Kris, Oct 4, late) — frames cut by outline instead of a straight line
- **[258] Problem (Kris):** hero on sky eagle and on dragon (both heroes), dragon, sky eagle, bramble wolf and Surtvald showed a piece of the neighbouring pose in a frame. The poses did not touch; a wing, tail or weapon reached over the neighbour's columns, so no straight cut could separate them.
- **[259] Intake v7 (`find_poses`):** every connected shape of solid ink is found (`label`, numpy only). If there are exactly as many big shapes as poses, one per grid cell, they are the poses ("shapes", 983 sheets). Otherwise the grid decides which pose a big shape belongs to ("grid", 5 sheets), and a shape that fills two cells is two touching poses, split by a bending cut through its thinnest part near the grid line (`seam`, "grid+seam", 4 sheets: `meadow_goblin.core.s`, `dwarf_axeman.core.s`, `boss_goblin_king.extra.s`, `bf_shadow_lord_5.extra.s`). Small shapes (sparks, shards, dust) go to the pose in whose cell they sit unless they hug another pose; faint glow is handed out last, growing outward from each pose. A short last row (3 poses on a 4-column sheet) uses its own ink extent as its columns.
- **[260] Result:** all 993 sheets re-cut, none rejected, none flagged by `--check`. **372 sheets** had poses whose boxes overlap, i.e. a straight cut was or could have been wrong (183 monster, 135 boss, 20 hero, 17 rider, 5 fairy, 5 mount, 4 NPC, 3 familiar); the list is in `sprites/out/recut.json` on the PC. All six characters Kris named are in it. `bloodgnats.core.q` and `petal_witch.core.s`, flagged in round 23 for an empty pose, were cutting faults too and need no repaint.
- **[261]** Each sheet's strip record now has `split`, `touch` (solid pixels cut through), `overlap`, `odd`, `dropped`. `intake.py --no-preview` skips the preview pages during batches, `--preview` rebuilds them all. `finish.ps1` no longer repaints the two sheets. Atlases repacked (94 pages; the 23 non-boss pages are committed), game and Lab republished. No re-rolls were needed.
- Known, left as is: frames are centred by their outline box, so a body can shift a few pixels between frames when a wing or weapon extends to one side.

## Round 25 (Kris, Oct 5) — final sheets, hero choice screen
- **[262] Final sheets:** the 6 new hero walk sheets (`move2`: idle 2, walk 6, run 2 in side, front and back views for both heroes) and `fam_fire.core.q` are in, cut and packed; the game now plays the 6-frame walk. 994 of 995 sheets received. `tc_sprint.core.f` (the Sprint teacher) was refused by the image service's safety filter; its request is reworded (`ZSPR.REWORD`, game text unchanged) and `finish.ps1` sends it.
- **[263] Hero choice screen (Kris):** both cards show the painted hero (front idle frame from the atlas, same scale; stand-in only if the atlas is missing), the cards are the same size (190 px wide, equal height), and each has a one-line back story: the boy "A woodcutter's son from the lake village, raised on tales of the Runestone", the girl "A shieldmaiden's daughter from the northern fjords, come south to earn her own name". The two lines are Claude's drafts for Kris to change.

## Round 26 (Kris, Oct 5) — sizes by body, no pixel sprites in play, bosses / animals / skiff / Tome painted
Kris's answers: sizes "match the game"; pixel sprites "never shown in play" (kept as emergency fallback and for the Lab); bosses "painted replaces all"; poses "same body size always". Full audit: `claude/15-sprite-size-audit.md`.
- **[264] Why sprites changed size (found):** (a) a sheet was sized by the outline box of its first pose, weapon and effects included; (b) a character's other sheets were assumed to be painted at the scale of its standing sheet: of 562 such sheets 269 differ by 12% or more and 142 by 25% or more (two-pose hurt / death sheets were painted up to 1.9 × larger); (c) frames were centred by their outline box, so a swing or burst shifted and shrank the body.
- **[265] Intake v8 (`process`, `measure`, `opened`):** each pose's BODY is measured (the thick core: thin blades, arcs, sparks, rings wear away). All poses of one view are scaled to the same body (132 of 6,787 poses corrected by 12% or more; limit × 0.75 to 1.33), except poses meant to look different (`SHAPE`: burrow, hide, death, …). Other sheets are scaled to the body of the standing sheet per view (`sprites/out/scale_ref8.json`); a front / back sheet with no shared view is matched by body height. Every frame is anchored at the body (centre of the torso, bottom of the body). Bodies are stored at most 320 px tall, and at the resolution the game draws them where that differs a lot from the survey (`sprites/requests/atlas_px.json`, 100 characters).
- **[266] Atlas format:** a frame's cell is a square of the character's body height with the body's feet at the bottom centre; ink may reach outside the cell (negative offsets). `chars[id]` = `{h0: body height, a0: √ink area of the standing pose, pages}`. `thumbs.webp` + `thumbs` / `thumb` in the index: one 72 px standing picture per character for the Tome grid. 74 pages + thumbs, 101 MB, all committed (bosses included; `.gitignore` no longer excludes them).
- **[267] Size rule in the game (`ZAtlas.kPix`, `kHeight`):** hero body 63 px. Everybody else as tall next to the painted hero as the pixel sprite was next to the pixel hero (measured from the pixel texture at run time), nudged up to 18% toward equal ink area. Bosses: the designed body height `D.h` in the same proportion. Exception (Kris: the hero on the horse was too big): rider + mount 1.3 × the hero (82 px), a lone mount 1.05 × (`RIDE_H`, `MOUNT_H`). `tools/sprites/sizes.py` writes every character's on-screen size to `sprites/requests/sizes.json`. Hitboxes unchanged.
- **[268] No pixel sprites in play:** while a page loads the image is hidden (`ZAtlas.state` → `load`); a missing animation falls back to the nearest painted one and, last, to any painted frame (`pick`); the hero never drops to pixel frames for a missing pose; a sweeper (`ZAtlas.scan` / `tick`, started from `20-game-config.js`) finds any image still wearing a pixel character texture (`mx_`, `ch_`, `ba_`, `spirit_`, `fairy_`, `fairymonarch_`, `hero_`) and gives it painted frames. Pixel sprites show only if a page file fails to load, in the Lab, or with the Dev switch off. `tc_sprint` (no sheet yet) wears the Roll teacher's frames (`ZAtlas.ALIAS`).
- **[269] Bosses:** painted frames replace the rig's art (`ZAtlas.monOn` rig mode, `rigTick`, `10k-boss-rig.js`): the back layer, wings and pupil are hidden; hover, breathing, footsteps, shake, afterimages and the teleport fade stay; boss patterns' forced wind-up / strike frames map to the first / last attack frame. One scale and one cell per boss, so a swing does not change its size. A far-away boss (over 1,500 px) does not load its page.
- **[270] Animals** (were shapes): one painted image each (`ZAtlas.animal`), small and large; **the sky skiff** (`ZAtlas.vehicle`); **the Tome**: grid from `thumbs.webp`, the selected entry animated from its page (`ZAtlas.thumb1`, `thumbs`). The painted sailing boat has no place in the game yet (ferry travel is instant).
- **[271] Memory:** at most 14 pages stay loaded; a page unused for 40 s is dropped unless something visible wears it (`ZAtlas.evict`).
- **[272] Tests:** `test_round26.py` (16 checks: atlas format, sizes, monsters, boss, animals, no pixel sprite near the hero, riding, Tome, Dev switch); `test_round23.py` updated.

## Round 27 (Kris, Oct 6) — last sheet in; familiars trail in a file
- **[273] All sheets in:** `tc_sprint.core.f` (the Sprint teacher, reworded request) arrived, was cut (8 frames) and packed into `village-0`; `intake.py --check`: 1001 files received, 0 missing, 0 wrong. The Sprint teacher no longer borrows the Roll teacher's frames (`ZAtlas.ALIAS` only applies while a character is missing).
- **[274] Familiars trail behind the hero (`09d-familiars.js`):** before, "hover" spirits circled above the hero's head (on top of him) and "follow" spirits walked 30–60 px behind on his trail, so with painted sprites of 71–89 px they covered the hero and each other. Now all familiars form one file behind the hero: each keeps a fixed gap to the one in front (the hero for the first), so it is dragged along his path; while its leader moves it swings round (3.2 rad/s) to the side the leader came from, at that same gap, so a reversal never takes it through the hero. The gap is the sum of the two half sizes + 6 px, measured as a rounded box (`_famGap`), using the hero's real body box (`_famHeroBox`: painted frame, wider when riding) and each familiar's displayed size; a second pass keeps non-neighbours apart. After a jump (> 160 px) the file re-forms behind the hero's facing. Hover spirits keep a 3 px bob; all are depth-sorted by their feet instead of always drawn on top. With four familiars the file is about 290 px long with stand-ins and 390 px with painted sprites.
- **[275] Texts and tests:** familiar card and Tome say "floats / walks along behind you". `tests/test_round27.py` (14 checks, painted and stand-ins): a stepped walk with turns, straight reversals, diagonals and jitter — no overlap in 1,960 ticks, every familiar behind the hero after 2.5 s of walking one way, file within 420 px, re-forms after a jump.

## Round 28 (Kris, Oct 6 evening) — familiar pod, pixel figures found, difficulty levels, scenery requests
- **[276] Familiars: half size, a pod.** Familiars are drawn at half their former size (`FAM_SC=0.25`; 36–45 px against the hero's 63). The single file of [274] is replaced by a pod behind the hero (`FAM_POD`: side by side for two, a triangle for three, a staggered square for four). The pod's bearing swings round to the side the hero came from; each familiar eases to its place with a small drift. They may brush each other (centres never closer than 0.6 of a body) and are always pushed clear of the hero's body. All four stay within about 130 px of the hero (was 390 px).
- **[277] Old pixel figures in play — cause found.** In the atlas, 722 of 3,553 animations have gaps in their frame numbers: a front or back view holds only some poses of a sheet (walk poses 0 and 2 of 4; only the "release" pose of a cast), so its frames are numbered 0, 2 or just 1. The game counted "highest number + 1" and asked for every number in between; a missing one made the monster fall back to its pixel sprite for that frame. Affected: **135 of 240 monsters, 44 of 76 bosses, 11 villagers**, always while walking or attacking **towards or away from the camera**; animals and the skiff fell back to their old shapes the same way. Fixed in `ZAtlas._index` / `name` / `count`: frames are counted and addressed in the order they exist, and any step number wraps. No new sheets are needed.
- **[278] Three smaller causes closed** (`04f-atlas.js`): (a) a page that failed to download was marked bad for the whole session, leaving every character on it as pixel art — it is now asked for again after 1.5 s, 4 s, then every 20 s; (b) a character that spans several pages (bosses) marked only the page of the frame on show as "in use", so a rarely used page could be dropped and fetched again, hiding the boss meanwhile — a character in use now keeps all its pages; (c) an image made with a character's pixel texture and not driven by a hook waited up to 0.3 s for the sweeper — images are now noted when they are made and dressed before the frame is drawn. (d) A boss's next form appeared up to a second late while its page arrived — each form now starts fetching the next form's pages (`BossPhases.warm`).
- **[279] Audit.** A script plays the game with painted sprites on, without drawing (about 5 × real time), and checks every frame for a visible character image that still has its pixel texture: the open world in 24 places, all 44 towers, dungeons and mage towers (first floor, last floor and every boss form by killing each in turn), 12 castles, 4 island adventures, the volcano boss rush. Before [277]: villagers in the village showed pixel frames in about 5 % of frames. After: **0 in about 95,000 frames**, except a boss killed in the first second while its page was still arriving (9 frames; cannot happen in play).
- **[280] Difficulty levels** (`04g-difficulty.js`, new): Hearthside · Wayfarer · Shieldbearer · Ragnarök. Wayfarer = the balance until now (all factors 1; old saves are Wayfarer). One table `ZDIFF`: boss health ×0.75 / 1 / 1.5 / 2.2 and damage ×0.8 / 1 / 1.25 / 1.5; boss warnings and time between attacks ×1.25 / 1 / 0.85 / 0.7, speed ×0.9 / 1 / 1.1 / 1.2, one more wave and last stand at 30 % at Ragnarök, more hits to stagger; monster health ×0.8 / 1 / 1.3 / 1.7 and damage ×0.8 / 1 / 1.2 / 1.45; monsters per floor and roamers ×0.8 / 1 / 1.25 / 1.5, camp guards −1 / 0 / +1 / +2, elite kin +0 / 0 / 1 / 2; XP and gold ×1 / 1 / 1.15 / 1.3. Healing and the death penalty are not touched (Kris's choice). Full table and reasons: `claude/17-difficulty-levels.md`.
- **[281] Difficulty: where it applies and how it is chosen.** Applied when a monster is made (`MX.spawn`, `_spawnLegacyMon`, roaming world bosses, `DungeonScene._spawnMonster`, volcano boss rush); boss pace through `ZDiff.ramp(q)` over `BOSS_RAMP`, the kit attacks of bosses and arena events. Chosen on the hero screen of a new game (four buttons, Wayfarer preselected, no extra step) and changeable in the ❓ panel while in the open world: living world monsters are rescaled at once, numbers change at the next load. Save slots show the level. Stored as `ps.difficulty`; no save version change.
- **[282] Scenery: the list and the requests** (`07zt-scenery.js`, new; `ZSCN`): 74 sheets, 573 items in 12 waves (21–32): village buildings 6 / 40, village props 4 / 36, interiors 7 / 84, runes and waystones 4 / 21, entrances 8 / 48, trees and plants 7 / 56, rocks, ruins and landmarks 5 / 40, bridges and harbors 3 / 22, ground textures 9 / 54, camp and trial props 6 / 52, tower / castle / mage-tower furnishings 11 / 88, dungeon pieces 4 / 32. `build.mjs` writes `sprites/requests/scenery.json` and `scenery.md`. 12 sheets are the pilot (one per family); the others attach their family's first sheet as a style reference. Estimated $2.80 at list prices. Plan, inventory and the other ways considered: `claude/16-scenery-plan.md`.
- **[283] Scenery: sending and cutting.** `tools/sprites/generate.mjs --set scenery` (`--pilot`, `--wave 21…32`; ground textures are asked for with an opaque background); `tools/sprites/scenery.ps1` for Kris (pilot by default, `-All`, `-Wave`). `tools/sprites/intake_scenery.py` cuts objects by outline with the character cutter, stores each at twice its size on screen with its standing point, makes the ground textures repeat without a seam (edge cross-fade; cliff and wall textures sideways only), packs `assets/scenery/` and writes a contact sheet per request. Tested on made-up sheets only — no real scenery sheet exists yet. **Nothing is wired into the game.**
- **[284] Tests.** `tests/test_round28.py` (14 checks: every animation gives a frame for every step; the four levels and their order; ramp; live rescale; Goblin King health per level; more monsters per floor; cannot change inside a site; the ❓ panel). `tests/test_round27.py` now checks the pod (17 checks). `tools/sprites/sizes.py` follows `FAM_SC`. `test_perf.py`: the island check waits for the first painted chunk (it raced the painter in the slow test browser). Full suite on Phaser 3 after the round: no new failures that repeat. The test machine ran about 1.4 × slower than the day before (the game at 1.6 frames a second), so timing checks failed in the full run and passed, or failed only on the timing, when run alone: `test_round14`, `test_round15`, `test_round23` (pass alone); `test_trials` 25/26 (the echo-path helper races a timer), `test_phase1_saves_familiars` 13/14 (a slow that had already worn off when sampled), `test_lab_world` 13/14 (a design built in 2.08 s against a 2 s limit; the Lab code is unchanged), `test_sites_expansion` did not finish in 600 s. Old failures unchanged: `test_characters` 14/17. Phaser 4: rounds 23, 26, 27, 28 and 8b pass.

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
- Mage towers: site `mage_<key>` (type tower, `site.mage=key`), data `MAGE_TOWERS`/`MAGE_BY_KEY`, boss monster id `mgb_<key>`; spells are only learned there (never sold). Saves: `ps.mageDone`, `ps.spellsLearned`, `ps.parkedMount`.
- Familiar specials: base skill + `ps.famSpecial[fid]` only; familiar damage goes through `_heroHitMonster` with `src:'familiar'`. All attacks need line of sight (`SIGHT_BLOCK_TILES`).
- Islands: `IslandScene` (key `'Island'`) extends `WorldScene`; use `_isOverworld(scene)` / `_owScene()` rather than checking for `'World'`. There is no Cave scene.
- Bosses: painted designs `BOSS_ART['<slot>.<a|b|c>']`, slots `BOSS_SLOTS` (slot = CHAR id like `boss_goblin_king`/`bf_*`/`cw_*`/`mg_*`/`boss_isl_*`/`boss_vr_*` or `elite_<q>`), pick `BOSS_PICK[slot]` (default a); `BA.of(slot)` gives the design. Engine rids carry `MON_BY_ID[rid].chId`. Phase intros are `introT` templates ({prev}/{NAME}) filled by `BossRig.applyNames()`.
- Fairies: `FAIRY_PICK[q]` = array of 5 look ids (fairy i uses `_fairyLook(q,i)`); monarchs `FAIRY_MONARCH_PICK[q]` (q=2..4). Trials always run in the trial realm (`TrialRealm.enter`).
