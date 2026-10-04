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

## 4b. Phaser 4 trial (Oct 3, 2026)

Kris asked for more detail on the upgrade. I ran the unchanged game on Phaser 4.2.1 (current release) in the headless test browser. No game code was changed.

**Caveat on every timing below:** the test browser draws with software (SwiftShader), not a real graphics card, on a shared cloud CPU. Counts (draw calls, bytes, test results) are exact. Milliseconds are only a relative guide and must be re-measured on a real PC and phone.

> **Update, round 18 (Oct 3):** the build switch is in and the 9 call sites now work on both engines (`src/js/00a-engine.js`). Phaser 3.60 is still the default. Try Phaser 4 with `?engine=4` or at `/play4`. After the change, 18 test suites pass on Phaser 4.2.1 (over 300 checks): round 18, 12, 9, 6, 7, 8, 8b, 14, 15, world game, phase 1 core, saves, brand, waystone clicks, site lab, village, trials, boss arenas. Night darkness and lava glow both draw. **Known issue on Phaser 4:** one screenshot shows a faint horizontal seam line between two map chunks over water; it needs fixing before Phaser 4 becomes the default. The monster suite and the Lab world suites have not been run on Phaser 4.

### What happened

- The game boots, starts a new game and draws the village on Phaser 4 with no errors. Screenshots match Phaser 3.60.
- 9 test suites run on Phaser 4: **126 of 133 checks pass.** All 7 failures come from two removed calls.

| Suite | Phaser 4 result |
|---|---|
| phase1_core | 25 / 25 |
| round15 (shots) | 10 / 10 |
| saves | 13 / 13 |
| brand | 13 / 13 |
| round6 | 30 / 32 |
| world_game | 25 / 26 |
| round9 | 6 / 7 |
| round12 (waystones) | 4 / 7 |

Not run on Phaser 4 yet: monsters (long), round 7, 8, 8b, 14, waystone clicks, site home, and the Lab.

### What has to change (found by the trial and a code audit)

| Change in Phaser 4 | Uses in Zeldara | What breaks if left | Work |
|---|---|---|---|
| `createBitmapMask` removed → Mask filter | 1 (`10c-world-render.js`, the lava glow layer) | **Fatal:** every map chunk with lava throws an error each frame; this is what failed the waystone tests | Small |
| `setTintFill` removed → `setTint` + `setTintMode(FILL)` | 5 (white hit-flash on monsters, characters, bosses) | Flash does not show; an error is logged | Trivial |
| RenderTexture draws are buffered; need `render()` | 3 (night / fog darkness in the world and dungeons) | **Silent:** darkness may not draw, and no error is raised. Needs an eye check | Small |
| `roundPixels` now off by default | not set anywhere | Possible soft edges or seams between map chunks | Check, one config line |
| Canvas-painted textures (24 `addCanvas` call sites, hundreds of textures) now stored in GL orientation | whole world, monsters, shots, brand | Handled by Phaser; village screenshot is correct. Needs a look at every scene type | Check only |
| Blend modes: 4 native in WebGL | we use only ADD (29) | none | — |
| Custom pipelines, FX, Light2D, Mesh, `Geom.Point`, `Math.TAU`, `Struct.Set` | 0 uses | none | — |
| Engine file | 1.16 MB → 1.38 MB (307 → 355 KB compressed, +48 KB) | slightly larger first load | — |

Estimate: 1 session to change the 9 call sites, switch the engine in the build, the Lab and the tests, and get all suites passing; 1 more session for an eye check of each scene type (world by day and night, dungeons, towers, castles, islands, sky, volcano, trials, Lab). Both are estimates.

### Measurements

Village at the start of a new game, 1,613 objects on screen, same build:

| Per frame | Phaser 3.60 | Phaser 4.2.1 | Change |
|---|---|---|---|
| Draw calls | 279 | 286 | same |
| Texture binds | 415 | 416 | same |
| Vertex data sent to the GPU | 1,198 KB | 514 KB | −57% |
| Script + render time (software GPU) | 20.7 ms | 13.1 ms | −37% |
| Whole frame (software GPU) | 282 ms | 221 ms | −22% |

Synthetic sprite test, 240 different 48-pixel creatures (tests/bench/sprite_bench.py):

| 3,000 moving sprites | Draw calls | Data sent per frame | Script time, v3 → v4 | Whole frame (software GPU), v3 → v4 |
|---|---|---|---|---|
| 240 separate textures (how monsters are stored today) | 188 | 492 KB → 328 KB | 1.5 → 3.2 ms | 326 → 924 ms |
| One atlas | 1 | 492 KB → 328 KB | 1.4 → 1.6 ms | 316 → 727 ms |
| Phaser 4 GPU sprite layer, one atlas | 1 | 0 KB | 0.2 ms | 352 ms |

Reading these:

- **Latency.** Phaser 4 does not change input delay or network delay (there is no network in play). It changes frame time only.
- **The engine sends less data** (4 corners per sprite instead of 6), which is where the village gain comes from.
- **Mixed result on raw fill.** With 3,000 overlapping sprites the Phaser 4 frame was 2.3–2.8× slower on the software renderer. Its sprite shader does more work per pixel. A real graphics card usually hides this, but a weak laptop or phone might not. This is the main reason to measure on real devices before committing.
- **The atlas matters more than the engine.** One atlas turns 188 draw calls into 1 on either version. On phones Phaser defaults to one texture per batch, so separate textures cost up to one draw call per sprite there.
- **The game is already fragmented:** 279 draw calls for 1,613 objects in a quiet village.
- **GPU sprite layer:** thousands of sprites for one draw call and no per-frame upload. Members are set up once and animate on the GPU, so it suits things that are not steered by game logic each frame: grass, trees, props, ambient animals, fairies, crowds. Monsters with AI stay ordinary sprites.

### What it means for a full sprite library

- Build the library as **atlases** (one per quadrant, about 2048×2048, plus one for NPCs) whichever engine is used. This is the large win and it can be done on Phaser 3.60.
- Phaser 4 adds: lighting on any sprite with one call (`setLighting(true)`), so painted monsters can be lit by torches and rune glow; filters (glow, outline, blur, colour) on any object, for elites, bosses, status effects; `smoothPixelArt` for clean scaling of pixel sprites; a much smaller atlas description format.
- If the upgrade is going to happen, do it **before** the sprite waves so the sprite pipeline (atlas format, lighting, hit-flash, outlines) is written once.

### Risks

1. Silent visual changes (darkness layers, seams) that tests do not see. Needs the eye check.
2. Fill-rate cost on weak GPUs, as measured above. Needs a real-device test.
3. The Lab and the artifact builds share the engine; all three must switch together.
4. Phaser 4 is six months old (4.0 in April 2026, now 4.2.1). Fewer answered questions and examples than Phaser 3.
5. The headless tests cannot use a real GPU, so performance stays a manual check.

Low-risk way to do it: a build switch that picks the engine version, so 3.60 stays the default until Kris has played the Phaser 4 build on his PC and a phone.

## 5. Decisions for Kris

1. Deploy now, or finish elements and story first?
2. Do phones matter (touch controls now or later)?
3. Phaser 4 upgrade: before the sprite waves, after, or not at all?
4. Sprite waves: Claude-drawn pixel sprites picked in the Lab, or restart the ChatGPT painted route?
5. Should Zeldara ever leave the browser (Steam, app stores)? Only a "yes" makes Godot worth a rewrite.

## Sources

- [Phaser 3 vs Phaser 4: What Changed and Why You Should Upgrade](https://phaser.io/news/2026/05/phaser-3-vs-phaser-4)
- [Phaser 4 Renderer: Faster, Cleaner, and Built for Modern Games](https://phaser.io/news/2026/04/phaser-4-renderer-faster-cleaner-and-built-for-modern-games)
- [Phaser v3 to v4 migration guide](https://github.com/phaserjs/phaser/blob/master/changelog/v4/4.0/MIGRATION-GUIDE.md)
- [Migrating from Phaser 3 to Phaser 4: What You Need to Know](https://phaser.io/news/2026/04/migrating-from-phaser-3-to-phaser-4-what-you-need-to-know)
- [11 Best Web Game Engines for 2026, Ranked and Compared](https://app.cinevva.com/guides/web-game-engines-comparison)
