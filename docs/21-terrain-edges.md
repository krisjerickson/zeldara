# 21 — Terrain edges: where two kinds of ground meet

*Written Oct 7, 2026 (round 38). Kris: "some of the worst visuals are when terrain transitions from one to another, i.e. at lake edges, beaches, mountain edges and other. Come up with ideas of how to address, either through better pixel art or through painted features. Create overall recommendations and also turn some of these into options within the lab to choose from."*

**Nothing in the game has changed.** The options are in the Design Lab, tab **Terrain edges**: six places, each drawn five ways. Pick there; then it gets built.

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
| G | Moving water edge | The foam line breathes in and out; lava glows and dims. | Medium. A light overlay, not a repaint. | No (the cards are still pictures) |
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
