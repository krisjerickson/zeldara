# Zeldara V4 — AI Memory Index

**Purpose**: This folder is the persistent memory of the Quests of Zeldara V4 codebase. Load these files into any new AI thread to bring the model back up to speed on how the game is structured, what conventions to follow, and what's already been built.

## Read order

1. **`01-architecture.md`** — where the code lives, tech stack, edit/build workflow, single-file model
2. **`02-scenes-and-hero-api.md`** — every Phaser scene, transition patterns, shared `_hero*` helper functions
3. **`03-content-and-world.md`** — world gen, tiles, sections, monsters, items, mounts, familiars, buildings, base quests
4. **`04-endgame-volcano-quest.md`** — the full volcano final-quest system (5 scenes, key logic, dev unlock, boss rush)
5. **`05-dev-tools-and-testing.md`** — sandbox cheat panel, debugging patterns, common pitfalls, self-testing approaches
6. **`06-changelog.md`** — high-level session log of what's been built and why
7. **`07-review-and-roadmap.md`** — Sept 2026 review: bugs, missing story, graphics plan, sprite plan, hosting

## Quick facts (30-second briefing)

- **Active game file**: `C:\Claude\games\Zeldara-v4\index.html` (repo root; git repo `krisjerickson/zeldara`, hosted on Vercel) — a single ~11,400-line hand-crafted HTML page with all game code, sprites (base64-inlined), CSS, and DOM inside it. Phaser 3.60 is loaded from CDN.
- **Do NOT use** `archive/` (old Vite/React skeleton + stale April builds) or `C:\Claude\games\zeldara-v4-game.html` (pre-repo snapshot). All active work lives in `index.html`.
- **Editing**: patch `index.html` directly via `node -e`, `Edit` tool, or Python scripts. Verify with `new Function(scriptBlock)` in Node to catch syntax errors before saving.
- **Testing**: open `index.html` directly in Chrome (double-click, or `file://` URL). Save/load uses `localStorage['qoz_v2']`.
- **Sprites**: all hero sprites (walk/attack/bow/horse) are base64-inlined as JS consts near the top of the inline `<script>`. Source PNGs sit in `sprites/hero/*/`.

## What's built

- **Overworld** — WorldScene with 600×600 tile circular-island world, 4 quadrants (NE Grasslands / SE Wetlands / SW Highlands / NW Ashlands), village at center, mounts, familiars, weather themes.
- **Sub-scenes** — Building interiors, Dungeon (procedural), Island (harbor adventure), Cave (side-scrolling platformer), Sky (top-down shmup).
- **Hero API** — a set of `_hero*` global helpers so every scene uses one code path for sprites, animation, attack, shield, familiar orbit, projectile physics.
- **Final quest** — Volcano Lord chain: 4 mini-volcano scenes (maze / bullet-hell / puzzle / escape) + boss-rush gauntlet, unlocked by completing all 16 quests + collecting 4 keys.
- **Endgame balance pass** — starting inventory is 0 gold + wooden sword + no ammo; dragon mount requires all 16 quests; dragon is lava-immune; boss rush blocks all healing.

## Golden rules (things NOT to break)

1. **Never edit `#hud` visibility inline** without also handling sleep/wake correctly. Every sub-scene MUST show `#hud` back on exit and hide `#dungeon-hud`. Canonical pattern lives in `DungeonScene._exitToWorld` (see doc 02).
2. **When adding a new scene**, always: register the class in `game.scene:[...]`, bind ESC-safety BEFORE the try block, use the `_heroAddSprite` + `_heroAnimate` helpers, restore HUD on exit, call `worldScene._emitUI()` on exit.
3. **Damage formula**: melee = base ATK (which includes level bumps) + lHand sword atk + non-weapon-slot atk bonuses. **NEVER** sum rHand (bow), mWeapon, or spell into melee damage (see `calcStatsFromState`).
4. **`file://` protocol**: game is designed to open from disk. All script is classic (no ES modules), Phaser loads from cdnjs, sprites are base64-inlined.
5. **Save format**: `localStorage['qoz_v2']` — a JSON blob of `playerState` + `worldX/worldY`. `ps.exploredGrid` is a Uint8Array; serialized as `exploredGridArr` and rehydrated on load.
