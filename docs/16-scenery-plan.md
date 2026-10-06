# Scenery plan — painting the background to match the sprites

Round 28 (Oct 6 2026). Kris: "the background graphics are now too simple compared to the higher resolution and better looking sprites." This is the list of everything the game draws behind the characters, what will be painted, how many sheets that takes, and the other ways it could be done.

**Status:** the 12-sheet pilot is in and cut (Oct 7); 62 sheets are still to be sent. Nothing is wired into the game yet.

## Pilot result (Oct 7)

All 12 pilot sheets arrived and were cut: 73 objects, 6 grass textures. The style matches the sprites. Mock-ups at game scale were sent to Kris in the chat.

- **Works as it is:** village buildings and props, furniture, tower furnishings, trees, rocks, dungeon mouths, camp props, dungeon pieces, the Runestone Green.
- **Grass textures:** too strong at full strength; fine at about 40 % over the base colour. The rules for the remaining texture sheets now ask for calmer swatches.
- **Bridges:** painted at a fixed length, running away from the viewer. The game needs spans of any length both ways, so bridges will be assembled from deck textures plus rail and post pieces. The lift, pass gate and broken bridge are usable.
- **Buildings** came out squarer than the old drawings; they are now sized by width (footprint).
- **Cutter:** 11 of 12 sheets cut first time; the rocks sheet needed a fix for objects made of loose pieces.

## Decision (Kris, Oct 6)

- Buildings, entrances, waystones, trees, plants, rocks, bridges and harbor pieces become **painted sprites**.
- So do **interior furniture and furnishings, camp props and trial props**.
- The **ground stays generated** by the game, but is **restyled with painted repeating textures and outlines**.

Claude's reading of "furnishings": village interiors, towers, castles and mage towers, and the obstacles and chests inside dungeons. Left out: the sky scene and the five volcano scenes (see "Not in this set").

## How the scenery is drawn today

- **Nothing is a picture.** Every tile, tree, house and chair is drawn by code when it is needed. The only loaded pictures are the characters.
- **Overworld ground:** 1,200 × 1,200 tiles of 32 px (38,400 px square), painted in 1,444 chunks of 1,024 px as a soft colour field with noise-warped edges. 88 kinds of ground; 71 of them carry a repeating pattern (cobbles, flagstones, planks…) and 152 a per-tile decoration (grass blades, ripples, cracks).
- **Overworld objects:** 66 painters (`WPROP`). Every single tree or rock is drawn afresh with its own random variation; there are no shared pictures.
- **Village:** one painter draws all 44 buildings from options (wall style, roof pattern, colour, chimney, awning, sign).
- **Sites on the map:** one drawing each for dungeon mouths, towers, mage towers, camps, harbors, skyports, volcano doors and castle gates, tinted per realm.
- **Insides:** rooms (12 themes, 44 kinds of furniture), towers (10 styles), castles (12), mage towers (24 looks), dungeons (10 designs + 3 ember caves), boss arenas (20), trial rooms (12) — floors and walls as one painted canvas per floor, furniture as depth-sorted sprites.
- **Water does not move.** Lava does (two scrolling layers).
- **Camp props** are the last pixel art in view: 32 × 32 pixel drawings shown at 1.7 ×.

## What will be painted — 74 sheets, 573 items

Made from `src/js/07zt-scenery.js`; the full text of every request is in `sprites/requests/scenery.md`.

| Wave | What | Sheets | Items | Covers |
|---|---|---|---|---|
| 21 | Village buildings | 6 | 40 | 11 shops and halls, 8 house types, 4 craftsmen's buildings, boathouse, lake house, lighthouse, windmill (body and sails), sky dock and balloon, turret, town wall pieces and gate |
| 22 | Village props | 4 | 36 | fountain, well, lamps, stall, carts, fences, banners, garden beds, boats, nets |
| 23 | Building interiors | 7 | 84 | all 44 kinds of furniture, 20 table and shelf items, 16 wall decorations, 4 rugs |
| 24 | Runes and waystones | 4 | 21 | the Runestone Green, rune circles, standing stones, waystone awake / asleep, fairy henge, dig spot, hidden cache |
| 25 | Entrances | 8 | 48 | dungeon mouth and tower per realm (+ guardian versions), 16 mage towers, 12 castle gates, 2 volcano doors, camp, harbor house, skyport, stairs, exit portal |
| 26 | Trees and plants | 7 | 56 | 24 trees across the four realms, bushes, flowers, grass, reeds, lilies, crops |
| 27 | Rocks, ruins, landmarks | 5 | 40 | rocks and crystals, basalt and obsidian, columns and ruined walls, giant bones, golem wreck, chess pieces, floating rocks |
| 28 | Paths, bridges, harbors | 3 | 22 | 4 bridge types + lift + pass, rails and steps, pier end, crane, island boat, huts |
| 29 | Ground textures | 9 | 54 | grass (6), earth / sand / snow (6), paving (6), water and lava (6), far-realm ground (6), cliff faces (6), floors (12), room walls (6) |
| 30 | Camp and trial props | 6 | 52 | 22 camp props (+ fire out, chest open; the mushroom camp uses the mushrooms of wave 26), 12 loot pickups, 16 trial props |
| 31 | Tower, castle, mage-tower furnishings | 11 | 88 | 40 tower pieces and centrepieces, 6 rugs and floor pieces, 24 castle pieces, 24 mage-tower pieces |
| 32 | Dungeon and arena pieces | 4 | 32 | obstacles of the 10 dungeon designs, chests, stairs, cage, ember-cave and arena pieces |
| | **Total** | **74** | **573** | |

**Cost (estimate):** the character sheets measured $0.030–0.055 each at list prices, about $0.038 on average. 74 sheets ≈ **$2.80** (range $2.20–$4.10); the 12-sheet pilot ≈ $0.45. Expect some re-rolls on top: 15–25 % is a fair guess for sheets of separate objects (objects touching, a cell left empty).

**Pilot first.** `scenery.ps1` without options sends 12 sheets, one from each family. The other sheets of a family attach their family's pilot sheet as a style reference, so a pilot that looks wrong should be re-rolled before the rest is sent.

### How to send them (Kris)

```
cd C:\Claude\games\Zeldara-v4
.\tools\sprites\scenery.ps1          # the pilot: 12 sheets
.\tools\sprites\scenery.ps1 -All     # everything still missing
.\tools\sprites\scenery.ps1 -Wave 26 # one wave
```

The key is asked for in that window and never written to disk. Run it in one window only. Then tell Claude; the cutter is `python tools/sprites/intake_scenery.py` (objects cut by outline, ground textures made to repeat without a seam, contact sheets in `sprites/preview/scenery/`).

### What the sheets ask for

- The same art direction as the characters (thick dark outlines, flat 2–3 tone shading, teal highlights upper left, magenta rim lower right, white-cyan glow on magic), with the two character references attached for style only.
- Objects: one viewing angle (camera looking down from the front at about 45°), transparent background, no ground and no shadow, each object alone in its cell.
- Ground textures: six flat square swatches per sheet that fill their cells, asked to repeat; the cutter then cross-fades the edges so they really do.
- Each item has a size on screen in the manifest; the cutter stores it at twice that size (or as painted, if smaller).

## The ground: restyle, not repaint

The ground cannot sensibly be painted as pictures: it is 38,400 px square and its soft, organic borders are one of the better things about the current look. Three changes bring it to the sprites' style:

1. **Painted textures inside the existing shapes.** The chunk painter already fills 71 kinds with a repeating tile clipped to the kind's outline (`_wpPatternFill`). The 54 painted swatches go through the same path, and soft kinds (grass, sand, snow) get it too. One texture serves many kinds by tinting.
2. **Outlines where materials meet.** A dark line (2–3 px, heavier on the lower-right side) along the borders between kinds that differ in height or material: path / grass, shore / water, cliff top / face, plaza / street. Soft-to-soft borders (grass to meadow) stay soft.
3. **Flat shading instead of noise.** Two or three flat tones per kind with a clean step between them, replacing the fine noise; teal highlight on upper-left rims, magenta on lower-right rims, as on the sprites.

Plus: **water that moves** (the ripple code exists but is never called; a scrolling highlight layer like the lava's is cheap).

Not done in round 28: these three are code changes to `05c-world-paint.js` and wait for the first textures (wave 29) so the result can be judged against real swatches.

## Other ways to build and paint the scenery

| Way | What it is | Sheets | For | Against |
|---|---|---|---|---|
| **A. Painted objects, one request per sheet** (chosen for objects) | Describe each object in words; cut it out; place it where the painter drew | 65 | Best match to the sprites; every object designed | The service decides proportions, door position and footprint — some will not fit the tiles they stand on |
| **B. Repaint over the game's own drawing** | Render each current building / tree to a picture, attach it, ask "repaint this in the style, keep the outline and the door where they are" | same | Footprint, door and height stay exactly as the game expects, so placement and collision need no change | Needs a renderer for each painter; results stay closer to today's simple shapes |
| **C. Kit of parts** | Paint walls, roofs, doors, windows, chimneys, signs as separate pieces; the game assembles buildings | ~3 for all 44 buildings | Few sheets, endless variety, exact footprints | Seams and mismatched perspective are likely; assembly code per building type |
| **D. Painted textures on generated shapes** (chosen for the ground) | Keep the generator's shapes; fill them with painted repeating swatches | 9 | Keeps organic borders; any size of world | Swatches from the service rarely repeat by themselves — the cutter has to make them |
| **E. Restyle in code** | Outlines, flat tones and rim lights added to the painters | 0 | Free; applies to everything at once; a fallback while pictures load | Shapes stay simple; least rich |
| **F. Whole scenes painted** | One large painting per room or per village | 1 per scene | Richest single image | Does not tile, cannot grow with the village's five stages, 1,536 px is too small for a 1,280 × 960 floor at 2× |

**Recommended mix (and what the request list assumes):** A for objects, D + E for the ground, and **B as the fix for the cases where A does not fit** — buildings whose door must sit on a given tile, wall and fence pieces that must join, bridges that must span a set width. The pilot will show how often that happens. C is worth a try for the town wall and fences only (they are already pieces).

Two things to watch when wiring:

- **Shadows.** Today's painters bake a soft shadow into each object. The painted objects have none (as asked), so the game must draw one ellipse per object, as it does for characters.
- **Variation.** Today every tree is unique. With pictures there are 3 trees per kind; the game will mirror, tint slightly and scale ±10 % to avoid visible repeats.

## Not in this set

- **Sky scene** (clouds, city blocks, the plane's background) and the **five volcano scenes** (maze, bullet run, puzzle, escape, boss rush floor): flat rectangles and emoji today. About 4 more sheets; not requested by Kris.
- **Boss arena floors and hazards** (20 arenas): generated; would follow the ground restyle.
- **Tower, castle and mage-tower walls and windows:** drawn into the floor canvas; they take the wall textures of wave 29, not objects.
- **Site Lab and Design Lab pages:** unchanged.

## Wiring plan (after the sheets exist)

1. Loader for `assets/scenery/` (pages on demand, like the character atlas; textures up front — 54 × about 15 KB).
2. Sites on the map first (one picture each, 10d): smallest change, most visible.
3. Village buildings and props (07k / 07l), then trees and rocks (07f), keeping the painter as the fallback while a page loads or if a file is missing.
4. Interiors and furnishings (07v, 07b, 07t, 07zm), camp and trial props (07z, 12b), dungeon pieces (07c, 12).
5. Ground restyle (05c) with wave 29.

Each step keeps footprints, collision and depth sorting as they are: only what is drawn changes.
