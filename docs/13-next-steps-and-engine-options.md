# 13 — Next steps and engine options (Oct 3, 2026)

Kris asked for three things: what to do next against the original phase plan, what a Next.js rebuild would gain, and what other ways there are to build a web game. Nothing here is decided; the open choices are listed at the end.

## 1. Where the phase plan stands

| Phase | Status | What is left |
|---|---|---|
| 0 Decide | Done | — |
| 1 Foundation and fixes | Done | — |
| 2 Selector pages (Design Lab) | Done, and grown well past the plan (towers, dungeons, world, bosses, fairies, islands, brand, projectiles) | — |
| 3 Integrate picks | Done (1200×1200 world, sites, village, waystones, mounts) | Kris's check that waystone travel works in real play |
| 4 Characters | Partly done. All 240 monsters, 29 NPCs and 11 mounts work, and 76 boss slots are painted | Monsters, NPCs, animals and mounts are still pixel stand-ins. The sprite waves (E2–E5) never ran; the ChatGPT sprite route is parked |
| 5 Systems and story | Mostly not started | Weapon elements, story spine, ending and New Game+, bounties (details below) |
| 6 Feel and ship | Partly done. Sound and boss music, save slots with backup codes, home page and hosting layout are in | Touch controls (marked "later"), tutorial, difficulty setting, the first real deploy |

Rounds 2–17 were mostly Kris's play-test lists and design picks. They added a lot that the plan never had (camps, castles, mage towers, fairies, trials, multi-phase bosses, the brand). So the game is far wider than planned, but phases 5 and 6 are where it was a month ago.

Checked in the code today:

- **Weapon elements still do nothing in combat.** `elementDmg` appears only in item data and menu text. Monsters do have weak / immune / resist rules in their kits, so half of the system exists.
- **No touch input at all.** A phone visitor to the hosted game cannot move.
- **No story beats.** There is no intro, no rescue scenes, no ending. Defeating the Volcano Lord still ends on a banner.
- **No tutorial and no difficulty setting.**
- **The Volcano boss rush does not use the attack director** that every other boss uses.

## 2. Recommended order

1. **Ship what exists (half a session).** Push to GitHub, run the Vercel import, play on the live URL. Everything after this gets tested where players will see it. This also settles the waystone check.
2. **Finish phase 5, elements first (1 session).** Wire weapon element damage into the one shared hit function, using the weak / resist rules the monsters already have. It makes a whole crafting tree matter, and it is small because the monster side is built.
3. **Story spine (2–3 sessions).** Opening scene, a rescue beat for each craftsman (the crossings already depend on them), a lore line from each guardian, an ending with credits, then New Game+. This is the biggest gap between "a lot of systems" and "a game someone finishes".
4. **First ten minutes (1 session).** Tutorial prompts, a gentler start, a Story / Normal / Hard setting. The game now has many keys and nothing teaches them.
5. **Touch controls (1 session).** Only worth doing if phones matter. Kris marked it "later"; hosting makes it matter sooner.
6. **Sprite waves (6–10 sessions).** The largest remaining visual job. Bosses are painted, but the 240 monsters next to them are stand-ins, so the gap now shows. Do it one quadrant at a time, picking in the Lab as before.
7. **Engine upgrade (1–2 sessions), before the sprite waves if it is going to happen.** See section 4. Phaser 3.60 → Phaser 4 is the only engine change that pays for itself here.
8. **Clean-up.** Volcano boss rush onto the attack director; boss tuning after more play.

Steps 2–4 are about 4–5 sessions and turn the current build into a complete game. Steps 6–7 are the visual overhaul.

## 3. Would rebuilding Zeldara in Next.js help?

Short answer: **no for the game, yes for what is around it** — and that part is already done.

Next.js is a framework for web pages. It decides how pages are built, routed and delivered. It does not draw anything inside a game canvas. Zeldara's world, monsters and effects are drawn by Phaser on a WebGL canvas, and that would be exactly the same inside a Next.js app.

| Area | What Next.js changes | For Zeldara |
|---|---|---|
| Visuals in the game | Nothing. The canvas is drawn by the game engine | No gain |
| Latency while playing | Nothing. Frame rate and input lag depend on the game loop and the GPU. Zeldara is single-player and runs fully in the browser, so there is no server in the loop | No gain |
| First load | Pages are pre-built and served from Vercel's edge; code can be split and loaded when needed | Small gain. The home page already does this. The game is one 2.4 MB file that loads once and is then cached |
| Home page, marketing pages, a wiki or Tome on the web | Strong: real HTML, good for search and link previews | Already in place (`/` is a Next.js page) |
| Accounts, cloud saves, leaderboards | Strong: server routes sit beside the pages and connect to a database such as Supabase | The real reason to grow the Next.js side later. Saves are already written so Supabase can plug in |
| Menus and HUD | Could be rebuilt as React components | Mixed. Cleaner menu code, but about 20 working menus would be rewritten for no visible change, and a React HUD re-rendering each frame can cost frame rate if done carelessly |
| Development | Hot reload, TypeScript, npm packages | A plain bundler (Vite) gives the same without the page framework |

Costs of a full move: a rewrite of the build, a rewrite of every menu, and the game would no longer be a single file. The single file is what lets it run as a Claude artifact, where Kris reviews every round. That is worth keeping.

**Recommendation:** keep the split we have. Next.js owns the site (home page now; accounts, cloud saves and a public Tome later). Phaser owns the game at `/play`.

## 4. Other ways to build it, staying on the web

Sizes are for an empty project, from a 2026 engine comparison (see sources).

| Approach | What it is | Pros | Cons | Fit |
|---|---|---|---|---|
| **Stay on Phaser 3.60** | What we have | Zero work; 22,500 lines and about 150 tests keep working | Phaser 3 is now the old line; no new renderer features | Fine for finishing phases 5–6 |
| **Phaser 4** (released April 2026) | Same framework, rebuilt WebGL renderer | Phaser says most games on the standard API need "a few hours" to move. Tile layers drawn on the GPU at a fixed cost however many tiles are visible; a sprite layer drawn in one call; filters and real-time lighting; less data per sprite | Canvas fallback is deprecated; a few effects and objects were removed; our canvas-painted textures and streamed world need a careful test pass | **Best upgrade.** We use no custom render pipelines, which is the hard part of the move |
| **PixiJS v8** | A renderer only (about 200 KB), WebGL and WebGPU | Fastest 2D drawing; fine control over effects | Not a game engine: no scenes, physics, input, audio or tilemaps. All of that would be written by hand | Poor. A rewrite to gain speed we do not lack |
| **Excalibur / Kaplay** | Small TypeScript 2D engines | Clean, modern code | Smaller communities; Excalibur is still before 1.0; full rewrite | Poor |
| **Godot 4, web export** | Full editor-based engine | Real editor, tilemap and animation tools, lighting, particles; also exports to desktop and mobile apps | About 9 MB compressed before any game content; web export is WebGL 2 only; Safari and iPhone support is a known weak spot; full rewrite in another language; cannot run as a Claude artifact | Only if Zeldara should also become a Steam or app-store game |
| **Unity, web export** | Full commercial engine | Largest tool and asset ecosystem | About 8 MB minimum, slow first load, heavy on phone browsers; full rewrite | Poor for a web-first game |
| **Defold** | Small engine with an editor | About 1.1 MB, fast loads, good on mobile web | Lua, smaller community, full rewrite | Good engine, wrong moment |
| **Construct / GDevelop** | No-code editors | Fast to start | Hard to drive from code, which is how this project is built | Poor |
| **Three.js or Babylon ("HD-2D")** | 3D scene with 2D sprites, depth of field, real light | The most striking look available in a browser | Effectively a new game: new world renderer, new art, heavier on phones | Only as a deliberate sequel |
| **React + canvas / DOM game** | Game drawn with page elements | Easy menus | Too slow for 240 monster types, projectiles and a streamed world | Poor |

### What would improve the look most

Engine choice matters less than these, and all are possible in Phaser:

1. **Real sprites for monsters and NPCs** (phase 4). Largest single change.
2. **Lighting**: torches and rune glow that light dungeon walls, dark corners, day and night. Much easier on Phaser 4.
3. **Screen effects**: bloom on lava and magic, soft vignette, heat shimmer in the Ashlands.
4. **Terrain blending**: soft edges where grass meets water, sand and rock.
5. **Sharper scaling**: draw at whole-number zoom so nothing blurs.

### Latency

- Play is local, so there is no network delay. What a player feels is frame rate.
- The risks are the streamed world painter, many monsters on screen and HUD updates. Round 7 already handled the worst of these (worker painting, culling, lazy loading).
- Phaser 4's GPU tile and sprite layers would help most on phones and old laptops.
- First load: the game file is 2.4 MB before compression, and Vercel compresses it. Splitting the Lab-only and late-game code out would cut it further, with or without Next.js.

## 5. Decisions for Kris

1. Deploy now, or finish elements and story first?
2. Do phones matter (touch controls now or later)?
3. Phaser 4 upgrade: before the sprite waves, after, or not at all?
4. Sprite waves: Claude-drawn pixel sprites picked in the Lab, or restart the ChatGPT painted route?
5. Should Zeldara ever leave the browser (Steam, app stores)? Only a "yes" makes Godot worth a rewrite.

## Sources

- [Phaser 3 vs Phaser 4: What Changed and Why You Should Upgrade](https://phaser.io/news/2026/05/phaser-3-vs-phaser-4)
- [Phaser 4 Renderer: Faster, Cleaner, and Built for Modern Games](https://phaser.io/news/2026/04/phaser-4-renderer-faster-cleaner-and-built-for-modern-games)
- [11 Best Web Game Engines for 2026, Ranked and Compared](https://app.cinevva.com/guides/web-game-engines-comparison)
