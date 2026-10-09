# 21 — Terrain edges: where two kinds of ground meet

*Written Oct 7, 2026 (round 38). Kris: "some of the worst visuals are when terrain transitions from one to another, i.e. at lake edges, beaches, mountain edges and other. Come up with ideas of how to address, either through better pixel art or through painted features. Create overall recommendations and also turn some of these into options within the lab to choose from."*

**Since round 40 the picked edges are in the game** (part 9). The Lab tab **Terrain edges** has ten more options per place built on Kris's picks (round 40, at the top), the five moving ones of round 39 and the five still ones of round 38 (folded away).

## 1. Why the edges look rough today

The ground is painted by `05c-world-paint.js`. What it does at an edge, read from the code:

| What | How it is done now | What you see |
|---|---|---|
| The outline | Every tile has one kind of ground. The painter bends the tile borders with noise. | The outline still follows the tile grid: steps about one tile long, with a wobble on top. Lakes look like blocks with soft corners. |
| The line | One sample (about 3 pixels) at the border is darkened. | A thin, uneven dark line that breaks up on diagonals. |
| Water | Two samples next to land are mixed with a pale colour. Land within three samples of water is darkened a little. | A narrow pale band and nothing else: no shallows, no wet sand, no depth. Lakes sit flat on the grass like stickers. |
| Cliffs | A flat band three quarters of a tile tall, darker at the bottom, a stripe every fifth row, three samples of shadow. | A brown ribbon. No foot, no lit top edge, no real shadow. |
| Land against land | The dark line only. Painted ground textures stop dead at it. | Grass ends in a ruler line against sand, mud, scree or snow. |
| Resolution | 12 samples to a tile, stretched to 32 pixels. | Every edge is a little soft and a little jagged at once. |

The painted trees, rocks and buildings now have clean outlines and shading. The ground under them does not, and edges are where that shows most.

## 2. Ideas

| | Idea | What it is | Cost | In the Lab |
|---|---|---|---|---|
| A | **Round the outline first** | Before any edge is drawn, each sample takes the kind most common around it. Tile-sized steps become curves. | Small. Code only. | Part of every new style |
| B | **Clean ink line** | An even dark outline, a little thicker, with a light inner edge on water. The look of the painted sprites, applied to the ground. | Small. Code only. | Yes |
| C | **Feathered blend** | No line. Two grounds mix in a stippled band; water fades from shallow to deep. | Small. Code only. | Yes |
| D | **Layered shores, banks and cliffs** | Bands by distance from the edge: foam, pale shallows, deeper water; wet sand; a dark **bank lip** on the far shore so water sits below the land; cliff faces taller, with strata, cracks, a lit top edge and a real shadow at the foot. | Medium. Code only. | Yes |
| E | **Painted edge pieces** | Small painted pieces set along the edge: grass tufts leaning over, reeds, lily pads, pebbles, shells, driftwood, rubble and boulders at cliff feet, snow drifts, lava crust. | Medium. Two painted sheets (24 pieces). | Yes — drawn in code as stand-ins |
| F | Painted edge strips | Long painted strips (a metre of beach, a metre of bank) laid end to end along the edge. | High. The strips must bend round curves, and joins show. | No |
| G | Moving water edge | The foam line breathes in and out; lava glows and dims. | Medium. A light overlay, not a repaint. | Yes, since round 39 (part 8) |
| H | Texture overlap | The painted grass texture runs a little way over the sand before it stops. | Small, once C or D exists. | Seen in C |

## 3. Recommendation

1. **A everywhere.** Rounding the outline is the single biggest gain and has no downside.
2. **D for water and cliffs.** Lakes, sea, marsh, lava and mountain edges gain depth. This is where the game looks worst today.
3. **A light C for land against land** (grass to sand, mud, scree, snow). A short stippled band, no hard line.
4. **B for built things** — roads, paths, plazas. They should keep a clear edge.
5. **E on top, thinly.** A few pieces per screen, more at water than on dry land. They hide what is left of the line and tie the ground to the painted objects.
6. **G later**, for water and lava only, if the still version is not enough.
7. **Not F.** Too much work for what it adds over D + E.

So my pick would be: lake, beach, marsh and lava — *Layered + pieces*; mountain edge — *Layered + pieces*; snow line — *Layered shores*; paths — *Clean ink line*. The Lab lets you choose differently for each.

## 4. The Lab tab

Design Lab → **Terrain edges**. Six sections: Lake shore, Beach, Mountain edge, Marsh, Lava, Snow line. Each has five cards:

| Card | What it shows |
|---|---|
| Today | The game's own rules, unchanged, for comparison |
| Clean ink line | A + B |
| Feathered blend | A + C |
| Layered shores | A + D |
| Layered + pieces | A + D + E (pieces drawn in code) |

- The box in the corner of each card is a close-up of the edge.
- **☆ Pick** one card per section. They may differ.
- The note box takes mixes ("layered, but no bank lip", "fewer tufts").
- The pictures are drawn by `ZEdge` (`src/js/07ze-edges.js`) with the same kind of field the game paints, so a picked style can be built as shown.

## 5. The painted pieces

Two sheets, 12 pieces each, ordered under wave 38. They are only needed if you pick a "pieces" card, but they are cheap and can paint while you look:

```powershell
cd C:\Claude\games\Zeldara-v4
.\tools\sprites\edges.ps1
```

| Sheet | Pieces |
|---|---|
| Edge pieces 1 — shores and beaches | grass tuft, long grass clump, dry grass tuft, reed clump, cattails, lily pads, shore pebbles, shells, driftwood, shore rock, foam curl, earth bank |
| Edge pieces 2 — cliffs, snow, mud and lava | rubble, scree fan, foot boulder, cliff-top grass, roots, mud clods, snow drift, snow lip, ice shards, crust shards, ember rocks, ash heap |

## 6. What building it means

- The work is in the ground painter (`_wpField`). It already knows, for each sample, the nearest other kind up to three samples away. The new styles need that distance out to about eleven samples, and the rounding pass.
- Painting runs in a background worker, so a slower painter does not make the game stutter; a chunk appears a little later. In the Lab a 16 × 9 tile picture takes about 0.1 s; a game chunk is seven times that area.
- The field would go from 12 to 16 samples a tile for the edges to be clean. That is 1.8 times the work per chunk. If that is too slow on your laptop, the finer field can be used only near edges.
- Collision does not change. The rounding moves the drawn line by a few pixels, not the tiles you walk on.
- Pieces are placed when a chunk is painted, from a fixed seed, so they never move.

## 7. What I need from you

1. Your picks in the Lab (one per section, notes welcome).
2. Whether to run the edge sheet command.
3. After you pick: whether to build it for the whole world at once, or the lake shores first so you can judge it in play.

## 8. Round 39 — moving ground

*Oct 8. Kris: "terrain picks are in, but i still don't like how these look. An old zeldara version had moving backgrounds, with flowing lava and lapping water and waves, if this could be possible to recreate. Use my selections and this suggestion to come up with 5 more options per each terrain interface type."*

### His picks (round 38)

| Place | Picked | Note |
|---|---|---|
| Lake shore | Layered + pieces, and Clean ink line | "use the clean line, but add in the images" |
| Beach | Layered + pieces, and Clean ink line | the same, and "look to make more granular sand" |
| Mountain edge, Marsh, Lava, Snow line | Layered + pieces | — |

So the base of every new card is: **lake and beach — the clean ink line with the pieces** (new style `inkdress`; the beach also gets a fine sand grain); **the other four — layered + pieces**.

### What the old version did

`quests-of-zeldara-v3`, `WorldScene.renderTileAnimations`: every frame, over the visible tiles only, one thin graphics layer on top of the cached ground —

- water and ocean: one pale line per tile drifting up and down (`sin(t·0.8 + tx·0.3 + ty·0.2)`), faint;
- magma: the whole tile pulses warmer and back (`sin(t·1.1 + phase)`);
- grass: two short blades per tile swaying.

The ground itself never moved. That is why it was cheap, and the same trick works here.

### The 30 moving cards

Design Lab → Terrain edges → the six "— moving" sections at the top. Reeds, tufts and lily pads sway or bob on every card. The last card of each place redraws the old version's effect on top of his pick, to compare.

| Place | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Lake shore | Lapping shore | Shimmering ripples | Sky in the water | Rain rings | Old Zeldara shimmer |
| Beach | Rolling waves | Lapping tide | Sunlit sea | Surf and spray | Old Zeldara shimmer |
| Marsh | Bubbling bog | Rain on the marsh | Drifting fog | Fireflies at dusk | Old Zeldara shimmer |
| Lava | Flowing crust | Molten river | Bubbling pool | Embers rising | Old Zeldara pulse |
| Mountain edge | Cloud shadows | Falling stones | Mist at the foot | Wind in the grass | Old Zeldara sway |
| Snow line | Falling snow | Blowing snow | Glittering snow | Mountain weather | Old Zeldara sway |

### How it is drawn (`ZEdge.frame`)

1. The still picture (his pick, without pieces) — painted once and kept.
2. A moving layer worked out on the same sample field the ground uses (16 samples a tile): lapping foam and wet sand by distance from the shore; wave crests rolling in by distance from the land; ripples, sparkles and cloud reflections on water; crust plates and bright streaks drifting along lava; cloud shadows, mist, wind in the grass, glitter on snow.
3. Small moving things drawn over it: rain rings, bubbles, lava bubbles, embers, spray, fireflies, falling stones and dust, snowflakes, blown snow.
4. The pieces, swaying.

One frame of a 16 × 9-tile card takes 1–10 ms in the Lab.

### What building it in the game means

- The still part is what was planned in part 6. The moving part is a separate light layer, like the old version: drawn only over visible water, lava, snow and grass, about 15 times a second, at the field's resolution.
- Distances from the shore are already known when a chunk is painted; they would be kept with the chunk so the layer does not work them out again.
- Weather cards (rain, snow, fog, cloud shadows) could also be tied to the time of day or the region instead of always on.
- The painted edge pieces (`.\tools\sprites\edges.ps1`) are still only stand-ins drawn in code. "Add in the images" means running that command; the pieces would then sway the same way.

### What I need from you

1. One moving card per place (☆ Pick; notes like "slower" or "waves + sparkle" welcome).
2. Whether to run the edge sheet command now.
3. Whole world at once, or lake shores and beaches first so you can judge it in play.

## 9. Round 40 — ten more per place, and the edges in the game

*Oct 8. Kris: "terrain edges are picked, but i still don't like how we landed. Some of the more movement based ones are good, but we need more to pick from. use my selections and come up with 10 additional to choose from for each terrain interface type. And vary between ways of diffusing and transitioning between the terrains, movement based features, and static features. Implement everything else"* — and on the question card: everything else = the edges into the game (whole world at once, with a Dev switch), the round 37 leftovers, and the painted edge pieces wired in.

### His round 39 picks

| Place | Moving card picked |
|---|---|
| Lake shore | Rain rings |
| Beach | Surf and spray |
| Mountain edge | Mist at the foot |
| Marsh | Drifting fog |
| Lava | Embers rising (Molten river was picked, then un-picked) |
| Snow line | Glittering snow |

### The 60 new cards

Every card = his still pick + his moving pick + **one** new thing. Four blends, three movements, three static features per place:

| Place | Blends | Movement | Stays put |
|---|---|---|---|
| Lake shore | Pixel dither · Soft gradient · Damp bank · Echo lines | Sunlit caustics · Dragonflies · Jumping fish | Wildflowers · Stones in the shallows · Logs and mossy rocks |
| Beach | Pixel dither · Soft gradient · Wide wet sand · Turquoise shallows | Scuttling crabs · Gulls overhead · Wet-sand shine | Shells and starfish · Tide line · Dune grass |
| Mountain edge | Pixel dither · Soft gradient · Grass lip · Scattered scree | Birds circling · Trickling water · Falling leaves | Moss and ivy · Mountain flowers · Rubble fans |
| Marsh | Pixel dither · Soft gradient · Soggy ground · Lush banks | Will-o'-wisps · Dragonflies · Frogs | Toadstools · Rotting logs · Duckweed |
| Lava | Pixel dither · Soft glow · Scorched ground · Glowing cracks | Heat haze · Steam vents · Pulsing cracks | Obsidian shards · Sulphur crystals · Basalt columns |
| Snow line | Pixel dither · Soft gradient · Melting patches · Frosted grass | Northern lights · Wind ripples · Light snowfall | Icicles and rocks · Pine saplings · Frozen puddles |

More than one can be picked per place; they combine (a blend, a movement and a feature at once).

### In the game now

`src/js/05d-world-edges.js` (`ZWE`) with the world painter (`05c`) and the chunk renderer (`10c`):

- **Field:** 16 samples a tile (was 12). Every outline is rounded first, then each sample knows how far the next kind is.
- **Edges by place** (`ZWE.PICK`): lakes and the sea — the clean ink line; marsh, lava, cliffs, snow and land against land — the layered edge (pale shallows and foam, bank lip, glowing lava rim, scorched ground, lit cliff tops, a longer shadow at cliff feet). Roads and paved ground keep their kerbs. Two waters (reef and sea) fade into each other.
- **Sand:** a fine grain (his note "more granular sand").
- **Pieces** along the edges: tufts, dry tufts, reeds, cattails, lily pads, pebbles, driftwood, mud clods, shells, boulders, snow drifts, ice shards, embers, crust shards. Drawn in code until the edge sheets are painted; then their pictures (`ZWE.PAINT`).
- **Movement:** a 16-frame looping flipbook per chunk for lapping (lakes, marsh) and rolling waves (sea), and particles for his picks — rain rings, spray, marsh fog, mist at cliff feet, glitter on snow, embers over lava. The old lava flow and bursts stay.
- **Switch:** Dev panel → "Terrain edges: new / old" (or `?edges=old`).
- **Changing a place after a new pick:** one line in `ZWE.PICK` — `style` ('ink' or 'layers'), `blend` (any of the round 40 blends: dither, soft, stipple, wet, outline2, terrace, overhang, tint, crackle) and `fx`. The painter already knows all the blends; the static features and the other movements are Lab-only until picked.

### Cost

Measured in the test machine (2 cores, software graphics, so one paint worker):

| | Old look | New edges |
|---|---|---|
| Field work per chunk, measured stage by stage | about 0.25 s (12 samples) | about 0.33 s (16 samples: rounding + distances 55 ms, the edge rules almost free) |
| Main-thread work per chunk | — | + 20–120 ms, in small slices (sand, pieces, flipbook) |

So about a third more paint time, almost all of it from the finer field. 16 samples were kept because they are exactly 2 pixels each on a 32-pixel tile: 14 or 12 samples show small steps along every edge (compared side by side). On a machine with 4 or more cores the painter now runs up to three workers side by side, which more than makes up for it. If it still feels slow: `?edgeS=14` (or `ZWE.S`), or the flipbook off (`ZWE.motion=false`). Three older tests that took a picture very early (the plaza logo, the familiar bar) now wait for the ground to be painted.

### What I need from you

1. Your picks among the 60 new cards (more than one per place is fine).
2. A look at the game with the new edges — the Dev switch flips back to the old look for comparison.
3. Whether to run `.\tools\sprites\edges.ps1` now: the game is ready for the painted pieces.
