# 33 — Latency deep dive: where the lag comes from, and how to fix it (round 72)

Kris (round 72, N2): "i also want a latency deep dive with proposals on where lag comes from and how to address", and "speed on phones".

## 1. How it was measured

Four probes are in `tests/`, so you can run them again after any change:

| Probe | What it shows |
|---|---|
| `probe_js.py [phone]` | The game's own work per frame, with the drawing switched off. It splits each frame into parts (scene update, ground streaming, monsters…) and each piece of ground painting into its phases. It also counts the drawing load: draw calls, objects, glowing ADD sprites, texture memory, the biggest textures. |
| `probe_profile.py [phone]` | A CPU profile of the main thread while the hero walks. |
| `probe_boot.py` | A CPU profile of loading the page to the title, and of New Game until you stand in the village. |
| `probe_latency.py [phone]` | Frame times, long tasks, the timers' cost, and key-press → movement delay. |

- **"phone"** means an 844×390 screen at 3× pixels with the CPU slowed 4× (Chrome's CPU throttling), roughly a mid-range phone.
- **A caveat that shapes how to read every number.** The test browser has no graphics chip. It draws WebGL in software, and that alone takes about 97% of its main thread (`probe_profile.py`: "(program)").
  - So frame rates measured with drawing on are meaningless here.
  - The numbers below are the **game's own JavaScript** (identical on every machine, only scaled by CPU speed) plus **counts** of the drawing work a real graphics chip has to do.
- The in-game readout (F9, or Dev → Performance readout) gives the real frame rate on your own computer or phone. Its "Copy the last 10 s" text is the best thing to send back from a real device.

## 2. What we found

### 2.1 The ground being painted is the biggest cost, by far

The world's ground is painted at run time, in chunks 32 tiles (1024 px) square, as you walk. Each chunk is then handed to the graphics chip.

| Game's own work per frame (ms) | Desktop: median / 95th / worst | Phone: median / 95th / worst | Of which ground (`_updateChunks` + `_wrMount`) |
|---|---|---|---|
| Village, walking (already painted) | 0.5 / 1 / 4 | 44–58 / 100–240 / 400–1100 * | desktop ≈ 0; phone ≈ 35 a frame * |
| A realm, walking | 14–17 / 46–61 / 72–127 | 46–78 / 110–206 / 165–220 | desktop 9–12 a frame; phone 27–30 a frame |
| Just arrived by waystone | 8–27 / 22–65 / 60–330 | 70–290 / 120–350 / 120–350 | desktop up to 120 in one frame; phone up to 200 |

\* On the phone the village is being painted again after the trip out to a realm.

- A frame has **16.7 ms** for 60 fps.
- **On a computer** the game's own work is fine in the village (0.5 ms). In the realms it uses most of the frame while the ground streams, and spikes to 50–130 ms when a chunk is finished and uploaded.
- **On a phone** the game alone takes 45–80 ms a frame in the realms, which caps it at 12–20 fps before anything is drawn. More than half of that is the ground.

**Why the painter overruns its time budget.** It is meant to use 6 ms a frame (14 ms while a visible chunk is missing). But it stops only between slices, and some slices were large. On a phone-speed CPU, the slowest slice in each phase:

- the built surfaces and painted ground textures (phase 2): **89–104 ms**;
- the terrain edges (1.5): **122–137 ms**;
- the props (4): **up to 104 ms**.

**Mounting a finished chunk** (`_wrMount`) costs 25–90 ms on a computer and 120–355 ms on a phone. It uploads:
- the 1024×1024 ground (4 MB);
- the chunk's sprite atlas, up to 2048 px wide;
- the lava mask and ley lines.

It also creates every prop's image and tween in one frame.

### 2.2 The start is slow, especially on phones

| | Desktop | Phone (CPU 4× slower) |
|---|---|---|
| Page → title | 5.4–6.3 s | 9–16 s |
| New Game → standing in the village | 7–7.5 s | 20–24 s |

- **The page is one 4.85 MB file of code and data**, inlined. It's 4.8 MB before compression; gzip, which Vercel applies, brings it to 1.8 MB. The browser has to read and compile all of it before the title shows.
- **The title page keeps redrawing a big canvas and re-uploading it** (`updateCanvasTexture`, 6% of the load).
- **New Game generates the whole 1200×1200 world every time**:
  - `buildWorldMap`, `_buildGameWorld`, `generateWorld`, the reachability floods (`floodReach`, `worldMapReach`, `bfs`), `mapSolid`, `gauss`;
  - that's about 3.5 s of CPU on a computer.
  - On top of that come the texture uploads (`texImage2D`, 1.3 s) and garbage collection (0.8 s).
  - The world is the same for every player (it comes from one seed), so most of this work could be done once, at build time.

### 2.3 Arrival hitches (a waystone, a site, a new area)

- **Monsters waking near you:** on the first frame after arriving, `_updateWorldMonsters` took up to 175 ms, and `_monWake` (which makes each monster's name label and sprite) up to 56 ms.
- **Painted pictures being resized into textures** (`ZScn.texture`) took 20–43 ms each on a computer and up to 149 ms on a phone.

### 2.4 Drawing load (what the graphics chip has to do)

- **Village:** about 1,440 objects in the scene, about 600 of them visible, about 180 of them glowing "ADD" sprites.
  - Phaser batches well: **2–3 draw calls a frame**.
  - The load is fill (pixels drawn, and drawn over again by the glows), not the number of calls.
- **Texture memory: 73–101 MB already in the village.** This includes boss sheets (2048×1700–1980 each) loaded long before any boss is near.
  - On iPhones, Safari can close a tab that uses too much graphics memory. This is the biggest risk for phones after speed.
- **The canvas is drawn at screen size in CSS pixels**, not at the phone's 3× pixels (Phaser's RESIZE mode).
  - On phones that is cheap (a ninth of the pixels) but a little soft.
  - It is the right default. A sharp mode would cost 9× the fill.

### 2.5 Input delay

- **Key → the hero moving: the very next frame** (21–37 ms here at the test browser's frame rate; 1 frame in 11 of 12 tries).
- The game reads the keys every frame and adds nothing of its own, so **the lag you feel is the frame time**. At 15 fps (66 ms frames) a key press takes about 70–130 ms to show.
- **Touch controls** (this round) press the same keys, so they add nothing either.
- Fixing frame time (§3) is fixing input lag.

### 2.6 What is *not* a problem

- **Timers:** the 28 `setInterval` loops (HUD, quests, spirits, Asgard, touch…) cost under 1 ms a second together.
- **DOM updates during play are rare.**
- **The monsters' brains** (`MX.tick`) cost 0.4–0.5 ms a frame on a computer.
- **Collision and the hero's movement** cost 1–1.6 ms a frame.

## 3. Proposals, biggest effect first

| # | What | Effect | Effort |
|---|---|---|---|
| **P1** | **Paint the ground in a worker.** The first phase already runs in a Web Worker; move the rest there too (OffscreenCanvas: Chrome, Edge, Firefox, Safari 16.4+). Send the finished chunk back as an ImageBitmap. | Removes 9–12 ms a frame on a computer and 27–30 ms on a phone, and the painting spikes. The single biggest win. | Large (a week of careful work): the painted ground textures and patterns go to the worker once; the props stay on the main thread. |
| **P2** | **Build the world once, at build time.** Write the generated map (tiles, kinds, zones, props, reach) as a compressed file that New Game loads, instead of generating 1200×1200 every time. | New Game: about −3.5 s on a computer, about −12 s on a phone. | Medium: the same code runs in `build.mjs`; saves still re-carve their changes on load as today. |
| **P3** | **Mount a chunk over several frames.** Ground picture first; then the sprite atlas; then the props' images and tweens in batches of about 40. Reuse released ground textures (`texSubImage2D` into a pooled 1024² texture) instead of creating new ones. | Mount spikes from 25–90 ms (computer) and 120–355 ms (phone) down to under 10 / 30 ms. | Medium. |
| **P4** | **Load textures when needed, and let go of them.** Boss and site sheets when you enter a site; the realm's monster sheets when you reach the realm; unload on leaving. Keep a memory budget (about 128 MB phone, 384 MB computer). | Halves texture memory in the village; protects iPhones from being closed. | Medium. |
| **P5** | **Wake monsters gradually.** At most 3 a frame, nearest first; their names as bitmap text (one shared font texture) instead of a canvas each. | Arrival hitches −50 to −170 ms. | Small. |
| **P6** | **Pre-size the painted pictures at build time** (the intake already makes them) at the sizes the game uses, or resize them off the main thread with `createImageBitmap(img, {resizeWidth, resizeHeight})`. | The 20–150 ms `ZScn.texture` hitches go. | Small–medium. |
| **P7** | **A lighter title page.** Draw the title once into a still layer, and animate only the small parts (the glow, the sparks) as sprites, so the big canvas is not re-uploaded every frame. | The title is smooth on phones; faster to New Game. | Small. |
| **P8** | **Split the code.** The Design Lab, the sandbox and the developer tools aren't needed to play: load them on demand. Ship the sprite data as compressed files rather than inline text. | Page → title about −30–40%. | Medium. |
| **P9** | **A frame-rate guard.** If the real frame rate stays under 40 fps for 5 s, step down by itself: fewer glows, fewer ambient particles, half-size ground; back up when it recovers. | Steady play on weak devices. | Small, after P1–P3. |

## 4. Done this round (quick wins)

- **Phone mode (`src/js/10c2-quality.js`, ZQUAL)**, chosen by itself on touch screens up to 900 px on the short side. `?quality=full` or `?quality=phone`, or `ZQUAL.set(…)`, overrides it.
  - The painted ground is uploaded at half size and shown at full: a quarter of the upload and of the graphics memory per chunk. It's a little softer up close, but the canvas is drawn at CSS pixels on phones anyway.
  - The painter takes smaller slices (3 / 8 ms instead of 6 / 14).
  - The edge pass does 12 rows a slice instead of 40.
  - 6 chunks stay parked on the graphics chip instead of 14.
- **Fills in bands (all devices; `05c-world-paint.js`, `_wpBands`).**
  - The built-surface and painted-texture fills are now done in bands of 8 rows (6 on phones), one band a slice.
  - Each band reads a tile beyond its rows and draws only its own, so the result is **pixel-identical**: 5 chunks compared, 185 bands, 0 pixels different.

**Measured on the phone setting** (realms, walking; the game's own work per frame, before → after):

| | Median | 95th percentile | Worst slice: fills | Worst slice: edges |
|---|---|---|---|---|
| Realm 1 | 78 → 54 ms | 206 → 140 ms | 89 → 39 ms | 122 → 60 ms |
| Realm 2 | 48 → 46 ms | 142 → 109 ms | 104 → 73 ms | 137 → 21 ms |

These help, but they don't remove the cost. Painting the ground still takes about 27 ms of each phone frame. That is P1.

## 4b. Done after Kris's answers (L1)

- **The start curtain** (`10c3-warm-start.js`, Kris: "load entire first screen instead of having a laggy start … and make sure that any immediate movement does not produce lag"): the world stays covered until every ground chunk on screen and within 360 px of its edges is painted and mounted, the painted sheets have arrived and the nearby monsters are awake; nothing is drawn under it, so the painter gets every frame. Measured here: after it lifts, walking in all four directions needs no new ground (painting at most 0.3 ms a frame, no chunk mounted).
- **P2 — the world built once** (`05e-world-prebuilt.js`, `tests/bake_world.py`): `assets/world/world.bin.gz`, 0.86 MB (11.7 MB unpacked), fetched while the title shows; checked identical to a freshly generated world (241,509 values). It carries a hash of the code; a stale or missing file means the game generates as before. **Re-bake after code changes** (`python tests/bake_world.py`; `test_round72c` fails if it is stale).
- **P3 — mounting in batches**: a chunk's first 40 pictures in the frame it arrives, the rest about 3 ms a frame after.
- **P5 — monsters wake gradually**: at most 3 a frame (any closer than 700 px at once).
- **Slices that keep the budget**: the edge pass now stops at the frame's deadline, not after a fixed number of rows (the ground fills were banded earlier).
- **P1, the worker painter**: done — see §4c. Next: **P4, the texture budget**.

## 4c. P1 — the worker painter (Kris's answer O1: "build it, test hard")

- **What changed** (`src/js/05c2-world-paint-worker.js`, ZWP): each ground chunk — its field, terrain edges, built surfaces and painted textures, decoration, walls, props, lava, ley lines and the sprite atlas — is painted in a Web Worker on an OffscreenCanvas. The main thread receives the finished pictures (ImageBitmaps shown through a `bitmaprenderer` canvas, so no copy) and only mounts them.
- **How it stays the same game:** the worker runs the page's own script (the very same painting code, `wpChunkJob` unchanged) with stand-ins for the page. It loads the world from the baked file's bytes (P2) and gets the painted scenery as ImageBitmaps. Each job carries what may have changed since: the kind and zone grids round the chunk, its props, the felled trees, and the switches. Kinds are matched by what they are and put in the main thread's order (a few patterns take their look from a kind's number).
- **Safety:** no OffscreenCanvas, no baked world, a kind the worker lacks, a worker error → that chunk (or every chunk) is painted on the main thread as before. Switch: `?wp=0` off, `?wp=1` on; on by default.
- **Checked** (`tests/test_worker_paint.py`, nine chunks of every kind: the village, its edge, lava, deep water, patterns, walls, a ley line, two realms):
  - the same props (positions, atlas places, depths), lights, particles, swaying pieces, lava cells — exactly;
  - the generated ground the same picture: 0 pixels differ in water, patterns and realms; elsewhere at most ~40 levels on some edge pixels (mean under 0.1 level), because Chrome clips without antialiasing on an OffscreenCanvas (found and confirmed on the main thread too);
  - the painted scenery the same to the eye (mean difference under 1 level): a page `<img>` is shrunk with mip-maps, a bitmap without — side by side at 4× they can't be told apart;
  - a tile changed during play (land to water) shows in the worker's picture (0 pixels differ).
- **Measured** (test browser, two cores): painting on the main thread per chunk **181 ms → 6 ms** (the hand-over); no painting slice over 15 ms; chunks arrive 2–5× sooner. Mounting (the GPU upload) is unchanged and is now the only ground cost on the main thread — the next target (P4 and a pooled ground texture).
- **Where it runs:** the site (Vercel) and the local game. The claude.ai copy can't carry the `.gz` world file, so there the world is generated and the ground painted as before.
- **On a phone:** one worker (it holds a second copy of the script and the world in memory; not measured on a device yet). Please send the `?perf=1` readout (L3) — that is the real check.

## 5. Questions for Kris

- **L1 — Which to do next?** (any number)
  - P1, the worker painter (recommended first);
  - P2, the world built once;
  - P3 + P5, the hitches;
  - P4, the texture budget;
  - P6–P8, the start and the title.
- **L2 — On phones:** is a little softer ground (half-size) acceptable for the speed? Or would you rather have it sharp and slower?
- **L3 — A real-device check:** open the game on your phone with `?perf=1` (the readout), walk in a realm for 10 seconds, press *Copy the last 10 s* and paste it to me. It gives the real frame rate, which the test browser can't.
