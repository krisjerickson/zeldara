# Scenery — 90 sheets, 885 objects and textures (13 sheets in the pilot)

Made by build.mjs from `src/js/07zt-scenery.js`. Send with `tools\sprites\scenery.ps1`; results go to `sprites/incoming/<sheet id>.png`.

| Wave | What | Sheets | Items |
|---|---|---|---|
| 21 | Village buildings | 6 | 40 |
| 22 | Village props | 4 | 36 |
| 23 | Building interiors | 7 | 84 |
| 24 | Runes and waystones | 4 | 21 |
| 25 | Tower, dungeon and other entrances | 8 | 48 |
| 26 | Trees and plants | 7 | 56 |
| 27 | Rocks, ruins and landmarks | 5 | 40 |
| 28 | Paths, bridges and harbors | 3 | 22 |
| 29 | Ground textures | 9 | 54 |
| 30 | Camp and trial props | 6 | 52 |
| 31 | Tower, castle and mage-tower furnishings | 11 | 88 |
| 32 | Dungeon and arena pieces | 4 | 32 |
| 33 | Icons: controls, gear slots, map, status | 5 | 106 |
| 34 | Icons: weapons | 2 | 41 |
| 35 | Icons: armor and accessories | 4 | 87 |
| 36 | Icons: treasure, potions, food, spells, skills | 5 | 78 |

## sc_vill_core_1 (pilot)

Village buildings 1 — the busy ones · wave 21 · 6 items, 3 × 2 · 1536x1024

- `vb_tavern` Tavern — 200 × 290 px
- `vb_shop` General shop — 200 × 290 px
- `vb_house_round` Round stone house — 168 × 280 px
- `vb_forge` Blacksmith's forge — 168 × 290 px
- `vb_guild` Guild hall — 168 × 250 px
- `vb_stables` Stables — 232 × 320 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Village buildings 1 — the busy ones.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Tavern — two-storey timber-framed inn, white plaster between dark beams, steep red clay-tile roof, stone chimney, hanging wooden sign with a tankard, warm lit windows, a lantern by the door (about 4.6× the hero's height).
2. General shop — timber-framed shop, red tile roof, a blue-and-white striped awning over a wide front window with goods on the sill, hanging sign with a sack (about 4.6× the hero's height).
3. Round stone house — small round fieldstone house with a tall conical slate-blue roof ending in a little finial, one round window, arched plank door, flower box (about 4.4× the hero's height).
4. Blacksmith's forge — squat grey stone smithy with a dark slate roof, a big chimney with a glow at its mouth, an open arched front showing the orange forge fire, anvil sign, horseshoes nailed by the door (about 4.6× the hero's height).
5. Guild hall — formal grey stone hall with a slate roof, two narrow banner flags by a double door, a carved crest over the lintel, tall leaded windows (about 4× the hero's height).
6. Stables — long low wooden stable with a mossy shingle roof, two half-doors (one open with hay visible), a hay loft hatch under the gable, a hitching rail and a water bucket (about 5.1× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_vill_core_2

Village buildings 2 — the craft shops · wave 21 · 6 items, 3 × 2 · 1536x1024

- `vb_armory` Armory — 200 × 290 px
- `vb_clothing` Tailor's shop — 200 × 290 px
- `vb_jeweler` Jeweler's round house — 200 × 290 px
- `vb_apothecary` Sorcerer's apothecary — 232 × 290 px
- `vb_bakery` Bakery — 200 × 290 px
- `vb_fishing_hut` Fishing hut — 136 × 250 px

Attach: style_hero, style_centaur, sc_vill_core_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Village buildings 2 — the craft shops.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Armory — stout grey stone building with a slate roof, iron-banded door, a shield-and-crossed-swords sign, a weapon rack and a round shield displayed by the wall (about 4.6× the hero's height).
2. Tailor's shop — timber-framed shop with a tile roof and a rose-and-cream striped awning, a dress form in the window, a sign with scissors and thread (about 4.6× the hero's height).
3. Jeweler's round house — elegant round stone house with a purple conical roof topped by a small gem finial, a sparkling diamond-paned window, a ring-shaped sign (about 4.6× the hero's height).
4. Sorcerer's apothecary — long wooden herb shop with a dark green shingle roof, bundles of herbs drying under the eave, a round window glowing soft green, a bottle-shaped sign, potted plants by the door (about 4.6× the hero's height).
5. Bakery — timber-framed bakery with a tile roof and a yellow striped awning, a serving hatch with loaves on the sill, a pretzel sign, a smoking oven chimney (about 4.6× the hero's height).
6. Fishing hut — tiny weathered plank hut with a patched shingle roof, nets and glass floats hung on the wall, a rod leaning by the door (about 4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_vill_houses

Village houses — the homes between the shops · wave 21 · 8 items, 4 × 2 · 1536x1024

- `vh_round` Round cottage — 136 × 250 px
- `vh_wood` Plank cottage — 136 × 250 px
- `vh_timber_a` Timber-framed cottage — 136 × 250 px
- `vh_timber_b` Timber-framed house, wider — 200 × 250 px
- `vh_stone` Stone cottage — 136 × 250 px
- `vh_stone_b` Stone house, wider — 200 × 250 px
- `vh_thatch` Thatched cottage — 136 × 250 px
- `vh_thatch_b` Thatched house, wider — 168 × 250 px

Attach: style_hero, style_centaur, sc_vill_core_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Village houses — the homes between the shops.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Round cottage — small round stone cottage, conical moss-green roof, round door (about 4× the hero's height).
2. Plank cottage — small dark-plank cottage with a grey shingle roof, shuttered window, woodpile by the wall (about 4× the hero's height).
3. Timber-framed cottage — small white-plaster timber-framed cottage, red tile roof, flower box (about 4× the hero's height).
4. Timber-framed house, wider — wider timber-framed house with a tile roof, two windows, a bench by the door (about 4× the hero's height).
5. Stone cottage — small grey stone cottage with a slate roof and a stubby chimney (about 4× the hero's height).
6. Stone house, wider — wider stone house with a slate roof, a lean-to shed on one side (about 4× the hero's height).
7. Thatched cottage — small timber cottage with a thick golden thatched roof with rounded edges, tiny dormer window (about 4× the hero's height).
8. Thatched house, wider — wider thatched house, the thatch tied down with ropes and stones, a rain barrel by the door (about 4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_vill_special_1

Village — craftsmen's buildings and the lake · wave 21 · 6 items, 3 × 2 · 1536x1024

- `vb_builders_yard` Bram's builder's yard — 200 × 250 px
- `vb_workshop` Mira's workshop — 168 × 250 px
- `vb_forge_hall` Dunn's forge hall — 200 × 250 px
- `vb_boathouse` Boathouse — 190 × 216 px
- `vb_lake_house` Lake house on stilts — 200 × 290 px
- `vb_turret` Wall turret — 126 × 200 px

Attach: style_hero, style_centaur, sc_vill_core_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Village — craftsmen's buildings and the lake.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Bram's builder's yard — open-fronted wooden workshop with a shingle roof, stacked planks and a sawhorse in front, a crane arm with a pulley on the gable (about 4× the hero's height).
2. Mira's workshop — tidy stone-and-timber workshop with a round skylight, brass pipes and a small gear turning on the wall, a blueprint pinned by the door (about 4× the hero's height).
3. Dunn's forge hall — broad stone forge hall with two chimneys, an iron-bound double door, a great hammer sign, sparks at the chimney mouths (about 4× the hero's height).
4. Boathouse — wooden boathouse on short piles with a wide dark opening at the front where a boat slides in, shingle roof, oars racked on the wall, a rune carved on the lintel (about 3.4× the hero's height).
5. Lake house on stilts — timber house standing on tall wooden stilts with a little balcony and a ladder, shingle roof, fishing lines hanging down (about 4.6× the hero's height).
6. Wall turret — round stone watch-turret with battlements, an arrow slit, and a pennant flag on a pole (about 3.2× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_vill_special_2

Village — tall landmarks · wave 21 · 6 items, 3 × 2 · 1536x1024

- `vb_lighthouse` Lighthouse — 70 × 230 px
- `vb_windmill` Windmill body (without sails) — 158 × 190 px
- `vb_windmill_sails` Windmill sails — 150 × 150 px
- `vb_sky_dock` Vela's sky dock — 200 × 150 px
- `vb_balloon` Sky balloon — 110 × 110 px
- `vb_statue` Hero statue — 60 × 130 px

Attach: style_hero, style_centaur, sc_vill_core_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Village — tall landmarks.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Lighthouse — tall slender white-and-red banded stone lighthouse with a glass lamp room glowing warm at the top and a small door at the base (about 3.7× the hero's height).
2. Windmill body (without sails) — round stone windmill tower tapering upward with a wooden cap roof and a hub where the sails attach, small door, a rune carved above it (about 3× the hero's height).
3. Windmill sails — four wooden lattice sails with patched cream cloth, joined at a hub, seen flat from the front as an X — nothing else (about 2.4× the hero's height).
4. Vela's sky dock — raised wooden platform on thick posts with a stair, mooring ropes, a windsock and crates — no balloon (about 2.4× the hero's height).
5. Sky balloon — small hot-air balloon with a patched teal-and-cream envelope, a wicker basket and trailing ropes (about 1.7× the hero's height).
6. Hero statue — weathered stone statue of a cloaked hero holding a sword point-down, on a stepped plinth with a faintly glowing rune (about 2.1× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_vill_walls

Village — town wall pieces (they are placed side by side) · wave 21 · 8 items, 4 × 2 · 1536x1024

- `vw_wall_h` Wall segment, front view — 64 × 78 px
- `vw_wall_v` Wall segment, running away from the viewer — 32 × 96 px
- `vw_corner` Wall corner — 64 × 84 px
- `vw_gate` Town gate — 128 × 120 px
- `vw_gate_shut` Town gate, shut — 128 × 120 px
- `vw_post` Gate post — 24 × 54 px
- `vw_rope` Barrier rope — 64 × 30 px
- `vw_board` Name board — 56 × 60 px

Attach: style_hero, style_centaur, sc_vill_core_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Village — town wall pieces (they are placed side by side).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Wall segment, front view — straight section of a grey stone town wall with battlements along the top, seen from the front; flat left and right ends so sections join (about as tall as the hero).
2. Wall segment, running away from the viewer — the same wall seen end-on running top to bottom: a narrow strip showing the battlement tops (about 1.5× the hero's height).
3. Wall corner — corner piece of the same wall with a slightly thicker pier (about 1.3× the hero's height).
4. Town gate — arched stone gateway in the same wall with an open iron-bound wooden double gate, two lanterns and a rune keystone (about 1.9× the hero's height).
5. Town gate, shut — the same gateway with the wooden gate closed (about 1.9× the hero's height).
6. Gate post — thick stone gate post with a coloured knob on top (about as tall as the hero).
7. Barrier rope — a short sagging red rope between two small posts (a shut crossing) (about 0.5× the hero's height).
8. Name board — blank wooden signboard hanging from a post by two chains (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_vprops_1 (pilot)

Village props 1 — the square · wave 22 · 8 items, 4 × 2 · 1536x1024

- `vp_fountain` Fountain — 96 × 90 px
- `vp_well` Well — 70 × 80 px
- `vp_lamppost` Lamp post — 24 × 90 px
- `vp_lantern` Hanging lantern — 20 × 70 px
- `vp_market_stall` Market stall — 110 × 96 px
- `vp_signpost` Signpost — 40 × 70 px
- `vp_bench` Bench — 56 × 34 px
- `vp_notice` Notice board — 64 × 72 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Village props 1 — the square.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Fountain — round stone fountain basin with a carved rune pillar in the middle and clear water spilling from it (about 1.4× the hero's height).
2. Well — round stone well with a little shingled roof on two posts, a rope and bucket (about 1.3× the hero's height).
3. Lamp post — tall dark iron lamp post with a square glass lantern glowing warm (about 1.4× the hero's height).
4. Hanging lantern — small lantern on a short wooden bracket post, glowing warm (about as tall as the hero).
5. Market stall — wooden market stall with a red-and-white striped canopy and crates of vegetables on the counter (about 1.5× the hero's height).
6. Signpost — wooden signpost with three blank arrow boards pointing different ways (about as tall as the hero).
7. Bench — sturdy wooden bench with carved ends (about 0.5× the hero's height).
8. Notice board — wooden notice board on two posts with a little roof and blank pinned papers (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_vprops_2

Village props 2 — carts and work · wave 22 · 8 items, 4 × 2 · 1536x1024

- `vp_cart_hay` Hay cart — 88 × 70 px
- `vp_cart_veg` Vegetable cart — 88 × 76 px
- `vp_cart_barrels` Barrel cart — 88 × 70 px
- `vp_anvil` Anvil on a stump — 50 × 40 px
- `vp_woodpile` Woodpile — 64 × 48 px
- `vp_barrels` Barrels — 56 × 52 px
- `vp_crates` Crates and sacks — 56 × 50 px
- `vp_haystack` Haystack — 60 × 56 px

Attach: style_hero, style_centaur, sc_vprops_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Village props 2 — carts and work.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Hay cart — two-wheeled wooden cart loaded with hay (about as tall as the hero).
2. Vegetable cart — two-wheeled cart with baskets of colourful vegetables and a striped canopy (about as tall as the hero).
3. Barrel cart — two-wheeled cart carrying three barrels (about as tall as the hero).
4. Anvil on a stump — black iron anvil on a tree stump with a hammer resting on it (about 0.6× the hero's height).
5. Woodpile — neat stack of split firewood with an axe stuck in a chopping block (about 0.8× the hero's height).
6. Barrels — a cluster of two upright barrels and one on its side (about as tall as the hero).
7. Crates and sacks — two wooden crates and a tied grain sack (about 0.8× the hero's height).
8. Haystack — round golden haystack with a pitchfork stuck in it (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_vprops_3

Village props 3 — fences, banners, gardens · wave 22 · 12 items, 4 × 3 · 1536x1024

- `vp_fence_wood` Wooden fence section — 70 × 40 px
- `vp_fence_stone` Low stone wall section — 70 × 40 px
- `vp_fence_hedge` Hedge section — 70 × 44 px
- `vp_fence_iron` Iron fence section — 70 × 44 px
- `vp_banner_red` Banner, red — 50 × 110 px
- `vp_banner_teal` Banner, teal — 50 × 110 px
- `vp_banner_gold` Banner, gold — 50 × 110 px
- `vp_laundry` Laundry line — 96 × 60 px
- `vp_veg_cabbage` Cabbage bed — 96 × 64 px
- `vp_veg_carrot` Carrot bed — 96 × 64 px
- `vp_veg_leek` Leek bed — 96 × 64 px
- `vp_veg_pumpkin` Pumpkin bed — 96 × 64 px

Attach: style_hero, style_centaur, sc_vprops_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 12 separate pieces of scenery — Village props 3 — fences, banners, gardens.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Wooden fence section — straight section of a rustic two-rail wooden fence, front view, flat ends so sections join (about 0.6× the hero's height).
2. Low stone wall section — low dry-stone wall section, front view, flat ends (about 0.6× the hero's height).
3. Hedge section — clipped green hedge section, front view, flat ends (about 0.7× the hero's height).
4. Iron fence section — black wrought-iron fence section with spear tips, front view, flat ends (about 0.7× the hero's height).
5. Banner, red — tall pole with a hanging red banner with a pale rune (about 1.7× the hero's height).
6. Banner, teal — the same banner in teal (about 1.7× the hero's height).
7. Banner, gold — the same banner in gold (about 1.7× the hero's height).
8. Laundry line — two posts with a line of colourful washing between them (about as tall as the hero).
9. Cabbage bed — a small fenced garden bed with three rows of cabbages (about as tall as the hero).
10. Carrot bed — the same bed with rows of feathery carrot tops (about as tall as the hero).
11. Leek bed — the same bed with rows of leeks (about as tall as the hero).
12. Pumpkin bed — the same bed with orange pumpkins on vines (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_vprops_4

Village props 4 — the waterfront · wave 22 · 8 items, 4 × 2 · 1536x1024

- `vp_boat` Rowing boat — 74 × 44 px
- `vp_boat_sail` Sailing boat — 84 × 84 px
- `vp_nets` Drying nets — 70 × 56 px
- `vp_bollard` Mooring post — 24 × 36 px
- `vp_life_ring` Life-ring post — 30 × 64 px
- `vp_fish_rack` Fish rack — 60 × 56 px
- `vp_door_torch` Door torch — 16 × 36 px
- `vp_flowerbox` Flower box — 40 × 20 px

Attach: style_hero, style_centaur, sc_vprops_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Village props 4 — the waterfront.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Rowing boat — small wooden rowing boat with two oars shipped, seen from above-front (about 0.7× the hero's height).
2. Sailing boat — small wooden boat with a single patched cream sail (about 1.3× the hero's height).
3. Drying nets — fishing nets hung on a wooden frame with glass floats (about as tall as the hero).
4. Mooring post — thick mooring post with a coil of rope (about 0.6× the hero's height).
5. Life-ring post — post with a red-and-white life ring and a lamp (about as tall as the hero).
6. Fish rack — wooden rack with fish hung to dry (about as tall as the hero).
7. Door torch — iron wall torch on a bracket with a small flame (about 0.6× the hero's height).
8. Flower box — wooden window box overflowing with red and yellow flowers (a small item, under half the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_int_1 (pilot)

Interior furniture 1 — tavern and home · wave 23 · 8 items, 4 × 2 · 1536x1024

- `if_counter` Shop counter — 72 × 46 px
- `if_table` Table — 40 × 36 px
- `if_longtable` Long table — 104 × 40 px
- `if_stool` Stool — 18 × 18 px
- `if_chair` Chair — 22 × 34 px
- `if_fireplace` Fireplace — 72 × 72 px
- `if_bed` Bed — 44 × 72 px
- `if_bookshelf` Bookshelf — 40 × 80 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Interior furniture 1 — tavern and home.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Shop counter — long wooden counter with a polished top and panelled front (about 0.7× the hero's height).
2. Table — square wooden table (about 0.6× the hero's height).
3. Long table — long wooden feasting table (about 0.6× the hero's height).
4. Stool — round three-legged stool (a small item, under half the hero's height).
5. Chair — simple wooden chair with a tall back, front view (about 0.5× the hero's height).
6. Fireplace — stone fireplace with a mantel and a lit fire (about as tall as the hero).
7. Bed — wooden bed with a patchwork quilt and a pillow (about as tall as the hero).
8. Bookshelf — tall wooden bookshelf full of colourful books (about 1.3× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_int_2

Interior furniture 2 — storage · wave 23 · 8 items, 4 × 2 · 1536x1024

- `if_barrel` Barrel — 24 × 32 px
- `if_barrelrack` Barrel rack — 72 × 56 px
- `if_crates` Crates — 36 × 40 px
- `if_sacks` Sacks — 36 × 30 px
- `if_chest` Chest — 36 × 30 px
- `if_safe` Strongbox — 36 × 40 px
- `if_shelfunit` Shelf unit, empty — 40 × 72 px
- `if_basket` Basket — 24 × 22 px

Attach: style_hero, style_centaur, sc_int_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Interior furniture 2 — storage.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Barrel — upright wooden barrel with iron hoops (about 0.5× the hero's height).
2. Barrel rack — rack holding three barrels on their sides with taps (about as tall as the hero).
3. Crates — stack of two wooden crates (about 0.6× the hero's height).
4. Sacks — pile of tied grain sacks (about 0.5× the hero's height).
5. Chest — iron-bound wooden chest, closed (about 0.5× the hero's height).
6. Strongbox — heavy iron strongbox with a big lock (about 0.6× the hero's height).
7. Shelf unit, empty — open wooden shelf unit with three empty shelves (about as tall as the hero).
8. Basket — woven basket with a cloth (a small item, under half the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_int_3

Interior furniture 3 — forge and armory · wave 23 · 8 items, 4 × 2 · 1536x1024

- `if_forgehearth` Forge hearth — 72 × 88 px
- `if_anvil` Anvil — 40 × 34 px
- `if_coalpile` Coal pile — 40 × 28 px
- `if_rack` Weapon rack — 56 × 64 px
- `if_armorstand` Armor stand — 32 × 64 px
- `if_dummy` Training dummy — 32 × 60 px
- `if_saddlerack` Saddle rack — 40 × 44 px
- `if_trough` Water trough — 56 × 24 px

Attach: style_hero, style_centaur, sc_int_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Interior furniture 3 — forge and armory.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Forge hearth — brick forge hearth with glowing coals, a hood and a bellows (about 1.4× the hero's height).
2. Anvil — black iron anvil on a block (about 0.5× the hero's height).
3. Coal pile — heap of black coal with a shovel (about 0.4× the hero's height).
4. Weapon rack — wooden rack holding swords, an axe and a spear (about as tall as the hero).
5. Armor stand — wooden stand wearing a steel breastplate and helmet (about as tall as the hero).
6. Training dummy — straw training dummy on a post with a painted target (about as tall as the hero).
7. Saddle rack — wooden rack with a leather saddle and bridle (about 0.7× the hero's height).
8. Water trough — wooden water trough (about 0.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_int_4

Interior furniture 4 — tailor, jeweler, apothecary · wave 23 · 8 items, 4 × 2 · 1536x1024

- `if_mannequin` Mannequin — 28 × 60 px
- `if_mirror` Standing mirror — 28 × 64 px
- `if_sewtable` Sewing table — 44 × 36 px
- `if_spinning` Spinning wheel — 40 × 48 px
- `if_showcase` Glass showcase — 56 × 44 px
- `if_cauldron` Cauldron — 40 × 44 px
- `if_crystalball` Crystal ball — 28 × 40 px
- `if_herbs` Herb rack — 48 × 56 px

Attach: style_hero, style_centaur, sc_int_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Interior furniture 4 — tailor, jeweler, apothecary.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Mannequin — dress form wearing a half-finished cloak (about as tall as the hero).
2. Standing mirror — tall oval standing mirror in a wooden frame (about as tall as the hero).
3. Sewing table — small table with cloth, scissors and spools of thread (about 0.6× the hero's height).
4. Spinning wheel — wooden spinning wheel (about 0.8× the hero's height).
5. Glass showcase — glass display case with jewels on velvet (about 0.7× the hero's height).
6. Cauldron — black iron cauldron bubbling with green potion over a small fire (about 0.7× the hero's height).
7. Crystal ball — glowing crystal ball on a small draped table (about 0.6× the hero's height).
8. Herb rack — wooden rack hung with bundles of drying herbs (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_int_5

Interior furniture 5 — guild, bakery, stables and the rest · wave 23 · 12 items, 4 × 3 · 1536x1024

- `if_noticeboard` Quest board — 64 × 64 px
- `if_maptable` Map table — 64 × 44 px
- `if_desk` Writing desk — 56 × 40 px
- `if_lectern` Lectern — 24 × 48 px
- `if_bench` Indoor bench — 64 × 22 px
- `if_candelabra` Candelabra — 20 × 64 px
- `if_oven` Bread oven — 64 × 64 px
- `if_kneadtable` Kneading table — 56 × 36 px
- `if_cakecase` Cake case — 56 × 40 px
- `if_hay` Hay pile — 44 × 28 px
- `if_stall` Horse stall — 72 × 64 px
- `if_plant` Potted plant — 22 × 40 px

Attach: style_hero, style_centaur, sc_int_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 12 separate pieces of scenery — Interior furniture 5 — guild, bakery, stables and the rest.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Quest board — large wooden board with pinned blank parchments (about as tall as the hero).
2. Map table — table with a spread map, a compass and markers (about 0.7× the hero's height).
3. Writing desk — desk with an inkwell, quill and papers (about 0.6× the hero's height).
4. Lectern — wooden lectern with an open book (about 0.8× the hero's height).
5. Indoor bench — plain long wooden bench (a small item, under half the hero's height).
6. Candelabra — tall iron floor candelabra with three lit candles (about as tall as the hero).
7. Bread oven — domed brick bread oven with a glowing mouth (about as tall as the hero).
8. Kneading table — floury table with dough and a rolling pin (about 0.6× the hero's height).
9. Cake case — glass counter case with cakes and pies (about 0.6× the hero's height).
10. Hay pile — loose pile of golden hay (about 0.4× the hero's height).
11. Horse stall — wooden stall partition with a half-door (about as tall as the hero).
12. Potted plant — leafy plant in a clay pot (about 0.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_int_small

Interior small things — on tables and shelves · wave 23 · 20 items, 5 × 4 · 1536x1024

- `it_mug` Mug — 10 × 12 px
- `it_candle` Candle — 8 × 14 px
- `it_scales` Scales — 16 × 14 px
- `it_jar` Jar — 9 × 12 px
- `it_bread` Bread — 14 × 9 px
- `it_plate` Plate — 14 × 8 px
- `it_potion` Potion — 9 × 13 px
- `it_lens` Lens — 12 × 14 px
- `it_gem` Gem — 10 × 9 px
- `it_cloth` Cloth — 16 × 9 px
- `it_sword` Sword — 22 × 7 px
- `it_helmet` Helmet — 13 × 12 px
- `it_book` Book — 13 × 9 px
- `it_w_sword` Wall sword — 8 × 26 px
- `it_w_spear` Wall spear — 6 × 34 px
- `it_w_axe` Wall axe — 14 × 28 px
- `is_jars` Shelf row: jars — 34 × 12 px
- `is_potions` Shelf row: potions — 34 × 13 px
- `is_books` Shelf row: books — 34 × 13 px
- `is_gems` Shelf row: gems — 34 × 10 px

Attach: style_hero, style_centaur, sc_int_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 20 separate pieces of scenery — Interior small things — on tables and shelves.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 20 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first):
1. Mug — wooden tankard with foam (a small item, under half the hero's height).
2. Candle — lit candle in a brass holder (a small item, under half the hero's height).
3. Scales — small brass balance scales (a small item, under half the hero's height).
4. Jar — glass jar with a cork (a small item, under half the hero's height).
5. Bread — round loaf of bread (a small item, under half the hero's height).
6. Plate — plate with cheese and an apple (a small item, under half the hero's height).
7. Potion — round red potion bottle (a small item, under half the hero's height).
8. Lens — jeweler's magnifying lens on a stand (a small item, under half the hero's height).
9. Gem — cut blue gem on a tiny cushion (a small item, under half the hero's height).
10. Cloth — folded bolt of cloth (a small item, under half the hero's height).
11. Sword — short sword lying flat (a small item, under half the hero's height).
12. Helmet — steel helmet (a small item, under half the hero's height).
13. Book — closed leather book (a small item, under half the hero's height).
14. Wall sword — sword hung point-down (about 0.4× the hero's height).
15. Wall spear — spear hung upright (about 0.5× the hero's height).
16. Wall axe — battle axe hung upright (about 0.4× the hero's height).
17. Shelf row: jars — a row of five assorted glass jars (a small item, under half the hero's height).
18. Shelf row: potions — a row of five potion bottles in different colours (a small item, under half the hero's height).
19. Shelf row: books — a row of leaning books (a small item, under half the hero's height).
20. Shelf row: gems — a row of small gems and rings on stands (a small item, under half the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_int_wall

Interior wall decorations and rugs · wave 23 · 20 items, 5 × 4 · 1536x1024

- `iw_window` Window — 26 × 30 px
- `iw_shelf` Wall shelf — 30 × 14 px
- `iw_shelf2` Wall shelf, long — 44 × 14 px
- `iw_painting` Painting — 26 × 22 px
- `iw_banner` Wall banner — 16 × 34 px
- `iw_shields` Shields — 30 × 30 px
- `iw_swords` Crossed swords — 28 × 26 px
- `iw_tools` Tools — 32 × 22 px
- `iw_herbs` Hanging herbs — 30 × 22 px
- `iw_starchart` Star chart — 28 × 24 px
- `iw_horseshoe` Horseshoe — 12 × 12 px
- `iw_mirrorwall` Wall mirror — 18 × 20 px
- `iw_clock` Clock — 14 × 26 px
- `iw_hooks` Coat hooks — 34 × 24 px
- `iw_trophy` Trophy — 30 × 26 px
- `iw_bellows` Bellows — 30 × 20 px
- `ir_rug_red` Rug, red — 96 × 60 px
- `ir_rug_blue` Rug, blue — 96 × 60 px
- `ir_rug_round` Round rug — 64 × 64 px
- `ir_mat` Door mat — 32 × 16 px

Attach: style_hero, style_centaur, sc_int_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 20 separate pieces of scenery — Interior wall decorations and rugs.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 20 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first):
1. Window — small leaded window with daylight (about 0.5× the hero's height).
2. Wall shelf — short wall shelf with two pots (a small item, under half the hero's height).
3. Wall shelf, long — long wall shelf with bottles (a small item, under half the hero's height).
4. Painting — framed landscape painting (a small item, under half the hero's height).
5. Wall banner — hanging cloth banner with a rune (about 0.5× the hero's height).
6. Shields — two crossed swords behind a round shield (about 0.5× the hero's height).
7. Crossed swords — two crossed swords (about 0.4× the hero's height).
8. Tools — hammer, tongs and file on hooks (a small item, under half the hero's height).
9. Hanging herbs — three bundles of hanging herbs (a small item, under half the hero's height).
10. Star chart — framed star chart (about 0.4× the hero's height).
11. Horseshoe — lucky horseshoe on a nail (a small item, under half the hero's height).
12. Wall mirror — round wall mirror (a small item, under half the hero's height).
13. Clock — wooden wall clock with a pendulum (about 0.4× the hero's height).
14. Coat hooks — row of hooks with a cloak and a hat (about 0.4× the hero's height).
15. Trophy — mounted stag antlers on a plaque (about 0.4× the hero's height).
16. Bellows — large forge bellows on the wall (a small item, under half the hero's height).
17. Rug, red — rectangular woven rug, red with a gold border, seen from above (about as tall as the hero).
18. Rug, blue — the same rug in blue (about as tall as the hero).
19. Round rug — round braided rug seen from above (about as tall as the hero).
20. Door mat — small straw door mat seen from above (a small item, under half the hero's height).
View: seen straight from the front, flat, to hang on a room's back wall in a top-down RPG.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_rune_green (pilot)

The Runestone Green — the great rune circle of the village · wave 24 · 1 items, 1 × 1 · 1024x1024

- `rn_green` Runestone Green inlay — 458 × 458 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a single piece of scenery — The Runestone Green — the great rune circle of the village.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: the object alone, centred, filling most of the image with a clear margin all round.
Subject: Runestone Green inlay — a huge round stone inlay set into the ground: a glowing teal world-tree (trunk, wide branches and mirrored roots) in the centre, ringed by a band of carved angular runes and an outer band of meander pattern, all lines glowing white-cyan in dark worn stone; perfectly circular, seen from straight above (about 7.3× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_rune_circles

Rune circles on the ground · wave 24 · 4 items, 2 × 2 · 1024x1024

- `rn_circle` Rune circle — 192 × 192 px
- `rn_circle_dim` Rune circle, asleep — 192 × 192 px
- `rn_circle_fire` Rune circle, ember — 192 × 192 px
- `rn_stage` Summoning ring — 224 × 224 px

Attach: style_hero, style_centaur, sc_rune_green

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 4 separate pieces of scenery — Rune circles on the ground.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 4 objects in a grid of 2 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Rune circle — round carved stone circle with a ring of glowing angular runes and a simple knot in the middle (about 3× the hero's height across).
2. Rune circle, asleep — the same circle with the runes dark and mossy, not glowing (about 3× the hero's height across).
3. Rune circle, ember — the same circle cracked, with the runes glowing orange-red (about 3× the hero's height across).
4. Summoning ring — larger double ring of runes with eight small star points (about 3.6× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_rune_stones

Standing stones and waystones · wave 24 · 8 items, 4 × 2 · 1536x1024

- `rn_stone_a` Standing stone — 40 × 84 px
- `rn_stone_b` Standing stone, leaning — 44 × 74 px
- `rn_stone_c` Standing stone, short — 40 × 54 px
- `rn_stone_dim` Standing stone, asleep — 40 × 84 px
- `rn_waystone_on` Waystone, awake — 60 × 120 px
- `rn_waystone_off` Waystone, asleep — 60 × 120 px
- `rn_glyph_a` Floor rune — 32 × 32 px
- `rn_glyph_b` Floor rune, dark — 32 × 32 px

Attach: style_hero, style_centaur, sc_rune_green

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Standing stones and waystones.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Standing stone — tall rough grey standing stone with one glowing teal rune (about 1.3× the hero's height).
2. Standing stone, leaning — leaning mossy standing stone with two runes (about as tall as the hero).
3. Standing stone, short — short broad standing stone with a spiral rune (about as tall as the hero).
4. Standing stone, asleep — tall standing stone with a dark, unlit rune and lichen (about 1.3× the hero's height).
5. Waystone, awake — slender four-sided stone obelisk on a stepped base with three stacked runes glowing bright white-cyan and a halo of light at the tip (about 1.9× the hero's height).
6. Waystone, asleep — the same obelisk with dark runes and creeping ivy (about 1.9× the hero's height).
7. Floor rune — flat square stone tile with one glowing rune, seen from above (about 0.5× the hero's height).
8. Floor rune, dark — the same tile with the rune unlit (about 0.5× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_rune_henge

Fairy henges and small rune things · wave 24 · 8 items, 4 × 2 · 1536x1024

- `rn_henge_tri` Henge trilithon — 78 × 96 px
- `rn_henge_post` Henge post — 30 × 70 px
- `rn_henge_altar` Henge altar — 96 × 56 px
- `rn_toadstool` Fairy-ring toadstool — 36 × 40 px
- `rn_toadstool_b` Fairy-ring toadstool, blue — 36 × 40 px
- `rn_dig` Dig spot — 34 × 22 px
- `rn_cache` Hidden cache — 36 × 32 px
- `rn_cache_open` Hidden cache, open — 36 × 36 px

Attach: style_hero, style_centaur, sc_rune_green

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Fairy henges and small rune things.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Henge trilithon — two rough upright stones with a lintel across the top, flowering vines on it (about 1.5× the hero's height).
2. Henge post — single slim upright stone with a carved spiral (about as tall as the hero).
3. Henge altar — low flat stone altar with a glowing bowl of light (about as tall as the hero).
4. Fairy-ring toadstool — fat red toadstool with white spots (about 0.6× the hero's height).
5. Fairy-ring toadstool, blue — glowing blue toadstool (about 0.6× the hero's height).
6. Dig spot — small mound of freshly turned earth with a sparkle (a small item, under half the hero's height).
7. Hidden cache — small mossy chest half buried, with a faint glow at the lid (about 0.5× the hero's height).
8. Hidden cache, open — the same chest open and empty (about 0.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ent_dungeon (pilot)

Dungeon entrances — a cave mouth for each realm · wave 25 · 6 items, 3 × 2 · 1536x1024

- `en_dng_1` Grasslands dungeon — 150 × 130 px
- `en_dng_2` Wetlands dungeon — 150 × 130 px
- `en_dng_3` Highlands dungeon — 150 × 130 px
- `en_dng_4` Ashlands dungeon — 150 × 130 px
- `en_dng_boss` Guardian's dungeon — 170 × 150 px
- `en_dwarf_door` Dwarven door — 60 × 80 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Dungeon entrances — a cave mouth for each realm.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Grasslands dungeon — mossy green rock outcrop with a dark arched cave mouth, worn stone steps leading down, two lit torches and an arc of glowing runes over the opening (about 2.1× the hero's height).
2. Wetlands dungeon — dark wet rock outcrop draped in vines and roots with a cave mouth, steps, two torches burning green-blue, rune arc (about 2.1× the hero's height).
3. Highlands dungeon — pale layered cliff rock with a squared dwarven doorway, steps, two braziers, rune arc (about 2.1× the hero's height).
4. Ashlands dungeon — black basalt outcrop with glowing orange cracks and a cave mouth, steps, two torches, rune arc glowing ember-orange (about 2.1× the hero's height).
5. Guardian's dungeon — larger, grander cave mouth framed by two carved stone beast heads, with a skull keystone and a red pennant (about 2.4× the hero's height).
6. Dwarven door — heavy round-topped stone door set in rock with iron bands and a rune lock (about 1.3× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ent_tower

Towers — one for each realm · wave 25 · 6 items, 3 × 2 · 1536x1024

- `en_twr_1` Grasslands tower — 130 × 240 px
- `en_twr_2` Wetlands tower — 130 × 240 px
- `en_twr_3` Highlands tower — 130 × 240 px
- `en_twr_4` Ashlands tower — 130 × 240 px
- `en_twr_boss` Guardian's tower — 140 × 260 px
- `en_arch` Ruined arch — 110 × 150 px

Attach: style_hero, style_centaur, sc_ent_dungeon

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Towers — one for each realm.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Grasslands tower — round pale-stone tower with ivy, a green conical roof, arched door and narrow windows (about 3.8× the hero's height).
2. Wetlands tower — round mossy dark-stone tower on a stone foot, teal conical roof, glowing windows, hanging moss (about 3.8× the hero's height).
3. Highlands tower — round grey granite tower with a snow-dusted blue roof and a small balcony (about 3.8× the hero's height).
4. Ashlands tower — round black stone tower with an iron-red roof, glowing orange windows and a wisp of smoke (about 3.8× the hero's height).
5. Guardian's tower — taller tower with a ring of battlements under the roof and a long red boss pennant flying from the tip (about 4.1× the hero's height).
6. Ruined arch — free-standing ruined stone archway with a rune keystone (about 2.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ent_mage_1

Mage towers 1 — twisting spires, each with a floating orb · wave 25 · 6 items, 3 × 2 · 1536x1024

- `en_mage_frost` Frost spire — 120 × 260 px
- `en_mage_library` Floating library tower — 120 × 260 px
- `en_mage_apothecary` Sorcerer's apothecary tower — 120 × 260 px
- `en_mage_grove` Druid grove spire — 120 × 260 px
- `en_mage_storm` Storm-rod tower — 120 × 260 px
- `en_mage_witch` Witch's hollow tower — 120 × 260 px

Attach: style_hero, style_centaur, sc_ent_dungeon

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Mage towers 1 — twisting spires, each with a floating orb.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Frost spire — thin twisting spire of pale blue ice-stone with icicles and a floating white-blue orb at its tip (about 4.1× the hero's height).
2. Floating library tower — spire wound with a ribbon of floating books, warm windows, a golden orb (about 4.1× the hero's height).
3. Sorcerer's apothecary tower — crooked spire with bulging glass alembics on its sides, green smoke, a green orb (about 4.1× the hero's height).
4. Druid grove spire — spire grown from a twisted living tree trunk with leaves and lanterns, a leaf-green orb (about 4.1× the hero's height).
5. Storm-rod tower — dark spire topped with copper lightning rods and crackling arcs, a violet-white orb (about 4.1× the hero's height).
6. Witch's hollow tower — lopsided spire with a crooked pointed roof like a hat, a cauldron glow in a window, a purple orb (about 4.1× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ent_mage_2

Mage towers 2 · wave 25 · 6 items, 3 × 2 · 1536x1024

- `en_mage_tidal` Tidal aquarium tower — 120 × 260 px
- `en_mage_astral` Astral observatory — 120 × 260 px
- `en_mage_void` Void rift hall — 120 × 260 px
- `en_mage_runic` Runic scriptorium — 120 × 260 px
- `en_mage_crystal` Crystal conservatory — 120 × 260 px
- `en_mage_blood` Blood-moon chapel — 120 × 260 px

Attach: style_hero, style_centaur, sc_ent_dungeon

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Mage towers 2.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Tidal aquarium tower — spire with round glass tank windows full of water and fish, shells on the walls, a sea-blue orb (about 4.1× the hero's height).
2. Astral observatory — spire topped by a brass dome with a telescope, star charts on the walls, a starry midnight-blue orb (about 4.1× the hero's height).
3. Void rift hall — black spire split by a jagged glowing violet crack, floating shards around it, a black-violet orb (about 4.1× the hero's height).
4. Runic scriptorium — square-sided spire covered in glowing carved runes, a white-cyan orb (about 4.1× the hero's height).
5. Crystal conservatory — spire with large pink and teal crystals growing out of it and a glass dome, a pink orb (about 4.1× the hero's height).
6. Blood-moon chapel — gothic spire with a rose window glowing red and bats circling, a crimson orb (about 4.1× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ent_mage_3

Mage towers 3 and special sites · wave 25 · 6 items, 3 × 2 · 1536x1024

- `en_mage_dream` Dreaming loft — 120 × 260 px
- `en_mage_clock` Clockwork orrery — 120 × 260 px
- `en_mage_ember` Ember forge athenaeum — 120 × 260 px
- `en_mage_fungal` Fungal grotto lab — 120 × 260 px
- `en_volcano_door` Volcano door — 120 × 120 px
- `en_volcano_door_mini` Small volcano door — 96 × 96 px

Attach: style_hero, style_centaur, sc_ent_dungeon

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Mage towers 3 and special sites.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Dreaming loft — soft rounded spire wrapped in curling cloud and crescent moons, a pale gold orb (about 4.1× the hero's height).
2. Clockwork orrery — brass-banded spire with turning gears and a ring of small planets, a bronze orb (about 4.1× the hero's height).
3. Ember forge athenaeum — soot-black spire with a furnace mouth and molten channels, an orange orb (about 4.1× the hero's height).
4. Fungal grotto lab — spire overgrown with giant glowing mushrooms, a lime-green orb (about 4.1× the hero's height).
5. Volcano door — huge black basalt double door set in a lava-cracked rock face with a glowing skull-flame emblem (about 1.9× the hero's height).
6. Small volcano door — smaller version of the same lava-rock door with a single flame rune (about 1.5× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ent_castle_1

Castle gates 1 — a gatehouse for each island castle, with its emblem over the gate · wave 25 · 6 items, 3 × 2 · 1536x1024

- `en_castle_thornwood` Thornwood Keep gate — 125 × 110 px
- `en_castle_sunflower` Sunflower Château gate — 125 × 110 px
- `en_castle_windmill` Windmill Bastion gate — 125 × 110 px
- `en_castle_lotus` Lotus Palace gate — 125 × 110 px
- `en_castle_abbey` Drowned Abbey gate — 125 × 110 px
- `en_castle_mangrove` Mangrove Fort gate — 125 × 110 px

Attach: style_hero, style_centaur, sc_ent_dungeon

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Castle gates 1 — a gatehouse for each island castle, with its emblem over the gate.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Thornwood Keep gate — grey stone gatehouse wrapped in thorny rose briars, a rose emblem (about 1.7× the hero's height).
2. Sunflower Château gate — warm sandstone gatehouse with yellow banners and sunflowers, a sun emblem (about 1.7× the hero's height).
3. Windmill Bastion gate — whitewashed gatehouse with a small windmill on its roof, a mill-sail emblem (about 1.7× the hero's height).
4. Lotus Palace gate — pale jade-green gatehouse with curved eaves and lily ponds at its feet, a lotus emblem (about 1.7× the hero's height).
5. Drowned Abbey gate — sunken mossy gothic gatehouse streaked with water, a shell emblem (about 1.7× the hero's height).
6. Mangrove Fort gate — timber-and-root palisade gatehouse on stilts, a tree emblem (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ent_castle_2

Castle gates 2 · wave 25 · 6 items, 3 × 2 · 1536x1024

- `en_castle_dwarven` Dwarven Hold gate — 125 × 110 px
- `en_castle_glacier` Glacier Citadel gate — 125 × 110 px
- `en_castle_eyrie` Eyrie Castle gate — 125 × 110 px
- `en_castle_obsidian` Obsidian Bastille gate — 125 × 110 px
- `en_castle_ember` Ember Sanctum gate — 125 × 110 px
- `en_castle_bone` Bone Throne Keep gate — 125 × 110 px

Attach: style_hero, style_centaur, sc_ent_dungeon

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Castle gates 2.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Dwarven Hold gate — squat carved granite gatehouse with brass doors, a hammer emblem (about 1.7× the hero's height).
2. Glacier Citadel gate — blue ice-and-stone gatehouse with icicles, a snowflake emblem (about 1.7× the hero's height).
3. Eyrie Castle gate — tall narrow cliff-top gatehouse with wind banners, an eagle emblem (about 1.7× the hero's height).
4. Obsidian Bastille gate — glossy black gatehouse hung with chains, a chain emblem (about 1.7× the hero's height).
5. Ember Sanctum gate — dark red temple gatehouse with braziers, a flame emblem (about 1.7× the hero's height).
6. Bone Throne Keep gate — gatehouse built of giant bones and skulls, a skull emblem (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ent_sites

Camps, harbors and skyports · wave 25 · 6 items, 3 × 2 · 1536x1024

- `en_camp` Rest camp — 140 × 110 px
- `en_harbor` Harbor house — 130 × 130 px
- `en_skyport` Skyport platform — 120 × 170 px
- `en_sky_balloon` Skyport balloon — 110 × 130 px
- `en_stairs_down` Stairs down — 64 × 56 px
- `en_portal` Exit portal — 56 × 76 px

Attach: style_hero, style_centaur, sc_ent_dungeon

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Camps, harbors and skyports.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Rest camp — a patched canvas tent with a bedroll, a crackling campfire with a cooking pot, and a log seat (about 1.7× the hero's height).
2. Harbor house — small plank harbor-master's house with a lamp post, a life ring on the wall and coiled rope (about 2.1× the hero's height).
3. Skyport platform — tall wooden mooring tower with a platform, ladder and windsock — no balloon (about 2.7× the hero's height).
4. Skyport balloon — a larger travel balloon with a striped envelope, a wicker gondola and sandbags (about 2.1× the hero's height).
5. Stairs down — square stone stairwell leading down into the dark, seen from above-front (about as tall as the hero).
6. Exit portal — upright oval ring of carved stone filled with swirling white-cyan light (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_trees_1 (pilot)

Trees 1 — the Grasslands and the village · wave 26 · 6 items, 3 × 2 · 1536x1024

- `tr_round_a` Round oak — 120 × 160 px
- `tr_round_b` Round oak, tall — 110 × 190 px
- `tr_round_c` Young tree — 80 × 110 px
- `tr_blossom_a` Blossom tree — 120 × 160 px
- `tr_blossom_b` Blossom tree, white — 110 × 150 px
- `tr_stump` Tree stump — 44 × 34 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Trees 1 — the Grasslands and the village.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Round oak — big leafy broadleaf tree with a round three-lobed crown and a short thick trunk (about 2.5× the hero's height).
2. Round oak, tall — taller broadleaf tree with a stacked two-tier crown (about 3× the hero's height).
3. Young tree — small young broadleaf tree with a single round crown (about 1.7× the hero's height).
4. Blossom tree — tree with a wide crown of pink blossom and a few falling petals (about 2.5× the hero's height).
5. Blossom tree, white — tree with a crown of white blossom (about 2.4× the hero's height).
6. Tree stump — broad cut tree stump with rings and a mushroom (about 0.5× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_trees_2

Trees 2 — the Wetlands · wave 26 · 6 items, 3 × 2 · 1536x1024

- `tr_willow_a` Willow — 130 × 170 px
- `tr_willow_b` Willow, leaning — 130 × 160 px
- `tr_mangrove_a` Mangrove — 120 × 160 px
- `tr_mangrove_glow` Glow mangrove — 120 × 160 px
- `tr_cypress` Swamp cypress — 100 × 190 px
- `tr_drowned` Drowned trunk — 60 × 100 px

Attach: style_hero, style_centaur, sc_trees_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Trees 2 — the Wetlands.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Willow — big weeping willow with long hanging fronds (about 2.7× the hero's height).
2. Willow, leaning — willow leaning to one side with fronds trailing low (about 2.5× the hero's height).
3. Mangrove — mangrove tree standing on a tangle of arched roots (about 2.5× the hero's height).
4. Glow mangrove — mangrove whose roots glow soft teal, with small glowing fruit (about 2.5× the hero's height).
5. Swamp cypress — tall bald cypress with a flared trunk and hanging moss (about 3× the hero's height).
6. Drowned trunk — dead grey tree trunk snapped off, with bracket fungus (about 1.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_trees_3

Trees 3 — the Highlands · wave 26 · 6 items, 3 × 2 · 1536x1024

- `tr_pine_a` Pine — 100 × 190 px
- `tr_pine_b` Pine, short — 100 × 150 px
- `tr_pine_snow` Snowy pine — 100 × 190 px
- `tr_stone_a` Petrified tree — 110 × 160 px
- `tr_stone_b` Petrified tree, broken — 80 × 110 px
- `tr_log_stone` Petrified log — 96 × 40 px

Attach: style_hero, style_centaur, sc_trees_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Trees 3 — the Highlands.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Pine — tall dark-green pine with layered branches (about 3× the hero's height).
2. Pine, short — shorter, fuller pine (about 2.4× the hero's height).
3. Snowy pine — pine with snow on every layer (about 3× the hero's height).
4. Petrified tree — tree turned to grey-violet stone, branches bare, with crystal buds (about 2.5× the hero's height).
5. Petrified tree, broken — broken petrified trunk with a crystal core showing (about 1.7× the hero's height).
6. Petrified log — fallen petrified log lying on its side (about 0.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_trees_4

Trees 4 — the Ashlands · wave 26 · 6 items, 3 × 2 · 1536x1024

- `tr_dead_a` Dead tree — 110 × 160 px
- `tr_dead_b` Dead tree, split — 100 × 150 px
- `tr_ash_a` Ash tree — 110 × 160 px
- `tr_ash_b` Ember tree — 110 × 160 px
- `tr_burnt_stump` Burnt stump — 44 × 36 px
- `tr_log` Fallen log — 96 × 40 px

Attach: style_hero, style_centaur, sc_trees_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Trees 4 — the Ashlands.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Dead tree — bare black dead tree with clawing branches (about 2.5× the hero's height).
2. Dead tree, split — dead tree split down the middle by lightning (about 2.4× the hero's height).
3. Ash tree — grey ash-covered tree with a thin crown of pale leaves and drifting ash (about 2.5× the hero's height).
4. Ember tree — charred tree with glowing orange cracks in the bark and a few embers (about 2.5× the hero's height).
5. Burnt stump — charred stump with glowing cracks (about 0.6× the hero's height).
6. Fallen log — mossy fallen log (about 0.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_plants_1

Plants 1 — bushes, flowers and grass · wave 26 · 12 items, 4 × 3 · 1536x1024

- `pl_bush` Bush — 64 × 50 px
- `pl_bush_berry` Berry bush — 64 × 50 px
- `pl_bush_flower` Flowering bush — 64 × 50 px
- `pl_bush_glow` Glow bush — 64 × 50 px
- `pl_flowers_red` Red flowers — 34 × 26 px
- `pl_flowers_yellow` Yellow flowers — 34 × 26 px
- `pl_flowers_blue` Blue flowers — 34 × 28 px
- `pl_flowers_white` White flowers — 34 × 26 px
- `pl_tuft` Grass tuft — 26 × 20 px
- `pl_tallgrass` Tall grass — 64 × 60 px
- `pl_crystalgrass` Crystal grass — 64 × 64 px
- `pl_fern` Fern — 44 × 34 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 12 separate pieces of scenery — Plants 1 — bushes, flowers and grass.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Bush — round leafy green bush (about 0.8× the hero's height).
2. Berry bush — bush with red berries (about 0.8× the hero's height).
3. Flowering bush — bush with white flowers (about 0.8× the hero's height).
4. Glow bush — dark bush with glowing teal buds (about 0.8× the hero's height).
5. Red flowers — clump of red poppies (about 0.4× the hero's height).
6. Yellow flowers — clump of yellow daisies (about 0.4× the hero's height).
7. Blue flowers — clump of bluebells (about 0.4× the hero's height).
8. White flowers — clump of white star flowers (about 0.4× the hero's height).
9. Grass tuft — small tuft of long grass blades (a small item, under half the hero's height).
10. Tall grass — thick clump of tall swaying grass (about as tall as the hero).
11. Crystal grass — tall grass with tiny glowing crystal tips (about as tall as the hero).
12. Fern — spreading green fern (about 0.5× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_plants_2

Plants 2 — water and the far realms · wave 26 · 12 items, 4 × 3 · 1536x1024

- `pl_reeds` Reeds — 50 × 70 px
- `pl_cattails` Cattails — 50 × 74 px
- `pl_wispreeds` Wisp reeds — 50 × 80 px
- `pl_lilypad` Lily pads — 50 × 34 px
- `pl_lanternlily` Lantern lily — 36 × 70 px
- `pl_curtain` Willow curtain — 70 × 120 px
- `pl_emberflower` Emberflower — 30 × 26 px
- `pl_emberflower_b` Emberflower patch — 56 × 34 px
- `pl_mushrooms` Mushrooms — 32 × 30 px
- `pl_heather` Heather — 40 × 28 px
- `pl_cactus` Ash thistle — 34 × 50 px
- `pl_vine` Hanging vine — 30 × 90 px

Attach: style_hero, style_centaur, sc_plants_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 12 separate pieces of scenery — Plants 2 — water and the far realms.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Reeds — clump of green reeds (about as tall as the hero).
2. Cattails — reeds with brown cattail heads (about as tall as the hero).
3. Wisp reeds — reeds with a small floating blue wisp light (about 1.3× the hero's height).
4. Lily pads — three flat lily pads, one with a pink flower, seen from above (about 0.5× the hero's height).
5. Lantern lily — tall lily whose flower glows like a paper lantern (about as tall as the hero).
6. Willow curtain — hanging curtain of willow fronds, as if from a branch above (about 1.9× the hero's height).
7. Emberflower — low red-orange flower with a glowing centre (about 0.4× the hero's height).
8. Emberflower patch — patch of five emberflowers (about 0.5× the hero's height).
9. Mushrooms — cluster of brown mushrooms (about 0.5× the hero's height).
10. Heather — clump of purple heather (about 0.4× the hero's height).
11. Ash thistle — spiky grey thistle with a violet flower (about 0.8× the hero's height).
12. Hanging vine — hanging green vine with small leaves (about 1.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_plants_3

Plants 3 — crops and fields · wave 26 · 8 items, 4 × 2 · 1536x1024

- `pl_wheat` Wheat strip — 96 × 44 px
- `pl_corn` Corn strip — 96 × 60 px
- `pl_crop_green` Green crop strip — 96 × 30 px
- `pl_scarecrow` Scarecrow — 44 × 70 px
- `pl_hedge_arch` Hedge arch — 80 × 84 px
- `pl_topiary` Topiary — 36 × 60 px
- `pl_trellis` Rose trellis — 56 × 70 px
- `pl_beehive` Beehive — 34 × 44 px

Attach: style_hero, style_centaur, sc_plants_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Plants 3 — crops and fields.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Wheat strip — strip of golden wheat (about 0.7× the hero's height).
2. Corn strip — strip of tall green corn (about as tall as the hero).
3. Green crop strip — strip of low leafy green crop (about 0.5× the hero's height).
4. Scarecrow — straw scarecrow on a cross-post with a floppy hat (about as tall as the hero).
5. Hedge arch — clipped hedge trained into an arch (about 1.3× the hero's height).
6. Topiary — hedge clipped into a ball on a stem (about as tall as the hero).
7. Rose trellis — wooden trellis covered in climbing roses (about as tall as the hero).
8. Beehive — straw skep beehive on a stand with a few bees (about 0.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_rocks_1 (pilot)

Rocks and crystals · wave 27 · 8 items, 4 × 2 · 1536x1024

- `rk_rock` Rock — 64 × 54 px
- `rk_rock_moss` Mossy rock — 64 × 54 px
- `rk_rock_rune` Rune rock — 64 × 54 px
- `rk_rock_snow` Snowy rock — 64 × 54 px
- `rk_boulder` Large boulder — 110 × 96 px
- `rk_pebbles` Pebbles — 40 × 24 px
- `rk_crystal_teal` Teal crystal — 50 × 90 px
- `rk_crystal_pink` Pink crystal — 50 × 80 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Rocks and crystals.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Rock — rounded grey boulder (about as tall as the hero).
2. Mossy rock — boulder half covered in moss (about as tall as the hero).
3. Rune rock — boulder with a glowing carved rune (about as tall as the hero).
4. Snowy rock — boulder capped with snow (about as tall as the hero).
5. Large boulder — very large cracked boulder (about 1.5× the hero's height).
6. Pebbles — scatter of small stones, seen from above (about 0.4× the hero's height).
7. Teal crystal — cluster of tall glowing teal crystals (about 1.4× the hero's height).
8. Pink crystal — cluster of glowing pink crystals (about 1.3× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_rocks_2

Highland and Ashland rocks · wave 27 · 8 items, 4 × 2 · 1536x1024

- `rk_geode` Geode — 70 × 70 px
- `rk_starcore` Star core — 60 × 70 px
- `rk_basalt_a` Basalt columns — 94 × 170 px
- `rk_basalt_b` Basalt columns, low — 80 × 80 px
- `rk_shard` Obsidian shard — 50 × 80 px
- `rk_shard_b` Obsidian shards — 56 × 56 px
- `rk_geyser` Geyser vent — 56 × 36 px
- `rk_lava_rock` Lava rock — 60 × 50 px

Attach: style_hero, style_centaur, sc_rocks_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Highland and Ashland rocks.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Geode — split round rock showing a glittering violet crystal hollow (about as tall as the hero).
2. Star core — fallen meteorite with a glowing white-blue core (about as tall as the hero).
3. Basalt columns — cluster of tall six-sided black basalt columns of different heights (about 2.7× the hero's height).
4. Basalt columns, low — low cluster of short basalt columns (about 1.3× the hero's height).
5. Obsidian shard — tall glossy black obsidian shard with a sharp edge (about 1.3× the hero's height).
6. Obsidian shards — three smaller obsidian shards (about as tall as the hero).
7. Geyser vent — low ring of yellow-crusted rock with a steaming hole, seen from above-front (about 0.6× the hero's height).
8. Lava rock — black rock with glowing lava seams (about 0.8× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ruins_1

Ruins · wave 27 · 8 items, 4 × 2 · 1536x1024

- `ru_column` Column — 40 × 120 px
- `ru_column_broken` Broken column — 64 × 80 px
- `ru_wall` Ruined wall — 76 × 84 px
- `ru_wall_charred` Burnt wall — 76 × 100 px
- `ru_block` Stone block — 40 × 50 px
- `ru_spire` Sunken spire — 70 × 120 px
- `ru_roof` Drowned roof — 110 × 70 px
- `ru_glass` Stained-glass shards — 60 × 34 px

Attach: style_hero, style_centaur, sc_rocks_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Ruins.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Column — tall fluted stone column with a capital (about 1.9× the hero's height).
2. Broken column — column snapped off halfway, with the top piece lying beside it (about 1.3× the hero's height).
3. Ruined wall — section of crumbling stone wall with moss (about 1.3× the hero's height).
4. Burnt wall — section of blackened ruined wall with a gothic window hole (about 1.6× the hero's height).
5. Stone block — fallen carved stone block with a rune (about 0.8× the hero's height).
6. Sunken spire — the pointed top of a drowned tower sticking up at an angle (about 1.9× the hero's height).
7. Drowned roof — the mossy roof of a sunken house (about as tall as the hero).
8. Stained-glass shards — scatter of coloured glass shards, seen from above (about 0.5× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_landmarks_1

Landmarks 1 — bones, giants and golems · wave 27 · 8 items, 4 × 2 · 1536x1024

- `lm_rib` Giant rib — 70 × 130 px
- `lm_skull` Giant skull — 110 × 90 px
- `lm_golem` Golem wreck — 100 × 110 px
- `lm_golem_arm` Golem arm — 80 × 50 px
- `lm_chess_pawn` Giant chess pawn, light — 60 × 100 px
- `lm_chess_rook` Giant chess rook, dark — 64 × 130 px
- `lm_chess_king` Giant chess king, light — 64 × 160 px
- `lm_chess_knight` Giant chess knight, dark — 64 × 140 px

Attach: style_hero, style_centaur, sc_rocks_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Landmarks 1 — bones, giants and golems.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Giant rib — huge curved rib bone arching out of the ground (about 2.1× the hero's height).
2. Giant skull — enormous half-buried horned skull, moss in the eye sockets (about 1.4× the hero's height).
3. Golem wreck — slumped broken stone golem with a dark rune in its chest, overgrown (about 1.7× the hero's height).
4. Golem arm — a giant stone fist and forearm lying on the ground (about 0.8× the hero's height).
5. Giant chess pawn, light — waist-high pale stone chess pawn (about 1.6× the hero's height).
6. Giant chess rook, dark — tall dark stone chess rook (about 2.1× the hero's height).
7. Giant chess king, light — tall pale stone chess king with a cross (about 2.5× the hero's height).
8. Giant chess knight, dark — dark stone chess knight (horse head) (about 2.2× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_landmarks_2

Landmarks 2 — wind, sky and fire · wave 27 · 8 items, 4 × 2 · 1536x1024

- `lm_floatrock` Floating rock — 110 × 130 px
- `lm_floatrock_tree` Floating rock with a tree — 120 × 170 px
- `lm_kite` Rune kite — 50 × 60 px
- `lm_harp` Wind harp — 60 × 110 px
- `lm_brazier` Brazier — 30 × 50 px
- `lm_chimney` Forge chimney — 52 × 180 px
- `lm_turtle` Turtle head — 70 × 60 px
- `lm_frog` Glowfrog — 22 × 18 px

Attach: style_hero, style_centaur, sc_rocks_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Landmarks 2 — wind, sky and fire.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Floating rock — chunk of earth and rock floating in the air with grass on top and roots hanging below (about 2.1× the hero's height).
2. Floating rock with a tree — the same kind of floating rock with a small tree on it (about 2.7× the hero's height).
3. Rune kite — diamond-shaped paper kite with a rune and a ribbon tail (about as tall as the hero).
4. Wind harp — tall stone frame strung with wires that hum in the wind (about 1.7× the hero's height).
5. Brazier — iron brazier on three legs with a bright fire (about 0.8× the hero's height).
6. Forge chimney — tall ruined brick chimney breathing smoke and sparks (about 2.9× the hero's height).
7. Turtle head — the mossy head of a gigantic turtle rising from the water (about as tall as the hero).
8. Glowfrog — small fat glowing green frog sitting (a small item, under half the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_bridges (pilot)

Bridges — seen from above-front, running left to right; the flat deck is walked on · wave 28 · 6 items, 3 × 2 · 1536x1024

- `br_plank` Plank bridge — 192 × 96 px
- `br_stone` Stone bridge — 192 × 104 px
- `br_iron` Iron bridge — 192 × 104 px
- `br_lift` Lift platform — 128 × 112 px
- `br_pass` Mountain pass gate — 160 × 140 px
- `br_broken` Broken bridge — 112 × 90 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Bridges — seen from above-front, running left to right; the flat deck is walked on.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Plank bridge — wooden plank bridge with rope handrails on both sides and posts at each end (about 1.5× the hero's height).
2. Stone bridge — arched grey stone bridge with low parapets (about 1.7× the hero's height).
3. Iron bridge — riveted dark iron bridge with lattice railings and brass rune plates (about 1.7× the hero's height).
4. Lift platform — square stone lift platform with brass corner posts, chains and a glowing rune in the middle (about 1.8× the hero's height).
5. Mountain pass gate — two tall carved stone pillars with a lintel and prayer flags, a paved way between them (about 2.2× the hero's height).
6. Broken bridge — the broken stub of a stone bridge ending in mid-air (about 1.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_bridge_parts

Bridge and path pieces · wave 28 · 8 items, 4 × 2 · 1536x1024

- `bp_rail_wood` Wooden rail — 64 × 30 px
- `bp_rail_stone` Stone rail — 64 × 30 px
- `bp_post` Bridge post — 20 × 56 px
- `bp_steps` Stone steps — 64 × 48 px
- `bp_milestone` Milestone — 24 × 32 px
- `bp_cairn` Cairn — 30 × 44 px
- `bp_stepping` Stepping stones — 70 × 34 px
- `bp_boardwalk_post` Boardwalk post — 18 × 40 px

Attach: style_hero, style_centaur, sc_bridges

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Bridge and path pieces.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Wooden rail — section of wooden bridge railing, front view, flat ends (about 0.5× the hero's height).
2. Stone rail — section of stone parapet, front view, flat ends (about 0.5× the hero's height).
3. Bridge post — thick wooden post with a rope loop and a small lantern (about as tall as the hero).
4. Stone steps — short flight of wide stone steps, seen from above-front (about 0.8× the hero's height).
5. Milestone — small roadside stone with a carved rune and an arrow (about 0.5× the hero's height).
6. Cairn — pile of stacked flat stones marking a trail (about 0.7× the hero's height).
7. Stepping stones — three flat stones in water, seen from above (about 0.5× the hero's height).
8. Boardwalk post — mossy boardwalk pile with a rope (about 0.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_harbor

Harbors and docks · wave 28 · 8 items, 4 × 2 · 1536x1024

- `hb_pier_end` Pier end — 96 × 84 px
- `hb_crane` Dock crane — 70 × 110 px
- `hb_ship` Island boat — 150 × 130 px
- `hb_ship_sail` Island boat, under sail — 150 × 150 px
- `hb_hut` Dock hut — 84 × 96 px
- `hb_hut_stilts` Stilt hut — 84 × 120 px
- `hb_cargo` Cargo pile — 70 × 56 px
- `hb_buoy` Buoy — 26 × 40 px

Attach: style_hero, style_centaur, sc_bridges

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Harbors and docks.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Pier end — the end of a wooden pier with two mooring posts and a lamp, seen from above-front (about 1.3× the hero's height).
2. Dock crane — small wooden dock crane with a hook and a hanging crate (about 1.7× the hero's height).
3. Island boat — sturdy wooden sailing boat with a furled sail and a lantern at the prow, moored (about 2.1× the hero's height).
4. Island boat, under sail — the same boat with its cream sail set (about 2.4× the hero's height).
5. Dock hut — small plank hut with a shingle roof (about 1.5× the hero's height).
6. Stilt hut — small hut on stilts over water with a ladder (about 1.9× the hero's height).
7. Cargo pile — pile of crates, barrels and a net (about as tall as the hero).
8. Buoy — red-and-white buoy with a bell, floating (about 0.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_tex_grass (pilot)

Ground 1 — grass · wave 29 · 6 items, 3 × 2 · 1536x1024

- `tx_grass` Meadow grass — 256 × 256 px
- `tx_grass_wild` Wild grass — 256 × 256 px
- `tx_grass_village` Mown grass — 256 × 256 px
- `tx_moss` Moss — 256 × 256 px
- `tx_heath` Heath — 256 × 256 px
- `tx_marsh` Marsh grass — 256 × 256 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 square ground-texture swatches — Ground 1 — grass.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 swatches in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Meadow grass — fresh green short grass drawn as flat colour with small darker blade marks and a few lighter flecks.
2. Wild grass — longer, yellower grass with seed heads.
3. Mown grass — neat, even, slightly brighter village green.
4. Moss — soft dark-green moss with tiny clover shapes.
5. Heath — dry olive heath with purple heather dots.
6. Marsh grass — dark wet grass with small puddle shapes.
View: seen from straight above, flat.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.
Background between the squares: plain white.
```

## sc_tex_earth

Ground 2 — earth, sand and snow · wave 29 · 6 items, 3 × 2 · 1536x1024

- `tx_dirt` Dirt path — 256 × 256 px
- `tx_mud` Mud — 256 × 256 px
- `tx_sand` Sand — 256 × 256 px
- `tx_ashsand` Ash sand — 256 × 256 px
- `tx_snow` Snow — 256 × 256 px
- `tx_soil` Tilled soil — 256 × 256 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 square ground-texture swatches — Ground 2 — earth, sand and snow.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 swatches in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Dirt path — packed light-brown earth with pebbles and a few cart-track marks.
2. Mud — dark wet mud with ripples.
3. Sand — pale yellow sand with soft ripple lines and a few shells.
4. Ash sand — grey-black volcanic sand with ember specks.
5. Snow — white snow with soft blue drift lines.
6. Tilled soil — dark brown ploughed soil in straight furrows.
View: seen from straight above, flat.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.
Background between the squares: plain white.
```

## sc_tex_stone

Ground 3 — paving · wave 29 · 6 items, 3 × 2 · 1536x1024

- `tx_flag` Flagstone road — 256 × 256 px
- `tx_cobble` Cobbles — 256 × 256 px
- `tx_slab` Stone slabs — 256 × 256 px
- `tx_brick` Brick paving — 256 × 256 px
- `tx_planks` Planks — 256 × 256 px
- `tx_hex` Basalt hexagons — 256 × 256 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 square ground-texture swatches — Ground 3 — paving.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 swatches in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Flagstone road — irregular grey flagstones with dark gaps and a little grass in the joints.
2. Cobbles — small rounded cobblestones.
3. Stone slabs — large square pale stone slabs.
4. Brick paving — red-brown bricks in a herringbone pattern.
5. Planks — wooden deck planks running left to right with nail heads.
6. Basalt hexagons — black six-sided basalt column tops.
View: seen from straight above, flat.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.
Background between the squares: plain white.
```

## sc_tex_liquid

Ground 4 — water and lava · wave 29 · 6 items, 3 × 2 · 1536x1024

- `tx_water` Shallow water — 256 × 256 px
- `tx_water_deep` Deep water — 256 × 256 px
- `tx_sea` Sea — 256 × 256 px
- `tx_swamp` Swamp water — 256 × 256 px
- `tx_lava` Lava — 256 × 256 px
- `tx_crust` Lava crust — 256 × 256 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 square ground-texture swatches — Ground 4 — water and lava.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 swatches in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Shallow water — clear turquoise water with a few curved white ripple lines.
2. Deep water — deep blue water with darker swirls and sparse highlights.
3. Sea — blue-green sea with small wave crests.
4. Swamp water — murky green water with duckweed dots.
5. Lava — bright orange-yellow molten lava with darker cooling skins.
6. Lava crust — black cracked crust with glowing orange lines in the cracks.
View: seen from straight above, flat.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.
Background between the squares: plain white.
```

## sc_tex_wild

Ground 5 — the far realms · wave 29 · 6 items, 3 × 2 · 1536x1024

- `tx_rock` Bare rock — 256 × 256 px
- `tx_scree` Scree — 256 × 256 px
- `tx_ice` Ice — 256 × 256 px
- `tx_ash` Ash — 256 × 256 px
- `tx_char` Charred ground — 256 × 256 px
- `tx_glass` Obsidian glass — 256 × 256 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 square ground-texture swatches — Ground 5 — the far realms.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 swatches in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Bare rock — grey-brown bare rock with cracks.
2. Scree — loose pale stones and gravel.
3. Ice — pale blue ice with white crack lines.
4. Ash — soft grey ash with darker drifts.
5. Charred ground — black burnt ground with faint ember cracks.
6. Obsidian glass — glossy black-violet glass with sharp pale reflections.
View: seen from straight above, flat.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.
Background between the squares: plain white.
```

## sc_tex_cliff

Ground 6 — cliff faces (seen from the front; these repeat left to right) · wave 29 · 6 items, 3 × 2 · 1536x1024

- `tx_cliff_1` Grassland cliff — 256 × 256 px
- `tx_cliff_2` Wetland bank — 256 × 256 px
- `tx_cliff_3` Highland cliff — 256 × 256 px
- `tx_cliff_4` Ashland cliff — 256 × 256 px
- `tx_wall_stone` Stone wall — 256 × 256 px
- `tx_wall_ruin` Ruin wall — 256 × 256 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 square ground-texture swatches — Ground 6 — cliff faces (seen from the front; these repeat left to right).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 swatches in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Grassland cliff — warm brown layered rock face with horizontal strata and grass at the top edge.
2. Wetland bank — dark wet earth bank with roots.
3. Highland cliff — pale grey granite face with strong strata and cracks.
4. Ashland cliff — black basalt face with glowing orange cracks.
5. Stone wall — coursed grey stone wall blocks.
6. Ruin wall — worn mossy stone wall blocks with missing pieces.
View: seen from straight above, flat.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.
Background between the squares: plain white.
```

## sc_tex_floor

Floors — rooms, towers and castles · wave 29 · 6 items, 3 × 2 · 1536x1024

- `tx_f_planks` Floorboards — 256 × 256 px
- `tx_f_herring` Herringbone parquet — 256 × 256 px
- `tx_f_flag` Indoor flagstones — 256 × 256 px
- `tx_f_marble` Marble — 256 × 256 px
- `tx_f_checker` Checkered tiles — 256 × 256 px
- `tx_f_straw` Straw — 256 × 256 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 square ground-texture swatches — Floors — rooms, towers and castles.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 swatches in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Floorboards — warm wooden floorboards.
2. Herringbone parquet — wooden herringbone parquet.
3. Indoor flagstones — smooth grey indoor flagstones.
4. Marble — white marble with soft grey veins.
5. Checkered tiles — black-and-cream checkered tiles.
6. Straw — stable floor of trampled straw.
View: seen from straight above, flat.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.
Background between the squares: plain white.
```

## sc_tex_floor_2

Floors 2 and cave floors · wave 29 · 6 items, 3 × 2 · 1536x1024

- `tx_f_tiles` Clay tiles — 256 × 256 px
- `tx_f_stars` Star floor — 256 × 256 px
- `tx_c_cave` Cave floor — 256 × 256 px
- `tx_c_cave_wet` Wet cave floor — 256 × 256 px
- `tx_c_crystal` Crystal cave floor — 256 × 256 px
- `tx_c_bone` Bone-pit floor — 256 × 256 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 square ground-texture swatches — Floors 2 and cave floors.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 swatches in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Clay tiles — square terracotta tiles.
2. Star floor — midnight-blue floor with small gold stars.
3. Cave floor — brown-grey cave floor with cracks and small stones.
4. Wet cave floor — dark wet cave floor with puddle shapes.
5. Crystal cave floor — violet-grey cave floor with tiny crystal specks.
6. Bone-pit floor — pale dusty floor littered with small bones.
View: seen from straight above, flat.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.
Background between the squares: plain white.
```

## sc_tex_wall

Room walls (seen from the front; these repeat left to right) · wave 29 · 6 items, 3 × 2 · 1536x1024

- `tx_w_panel` Wood panelling — 256 × 256 px
- `tx_w_plaster` Plaster — 256 × 256 px
- `tx_w_stone` Room stone wall — 256 × 256 px
- `tx_w_boards` Board wall — 256 × 256 px
- `tx_w_stripes` Striped wallpaper — 256 × 256 px
- `tx_w_cave` Cave wall — 256 × 256 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 square ground-texture swatches — Room walls (seen from the front; these repeat left to right).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 swatches in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Wood panelling — dark wood wall panelling with a rail.
2. Plaster — cream plaster wall with a timber beam.
3. Room stone wall — grey stone block interior wall.
4. Board wall — vertical plank wall.
5. Striped wallpaper — rose-and-cream striped wallpaper.
6. Cave wall — rough brown cave rock face.
View: seen from straight above, flat.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.
Background between the squares: plain white.
```

## sc_camp_1 (pilot)

Monster-camp props 1 · wave 30 · 8 items, 4 × 2 · 1536x1024

- `cp_campfire` Campfire — 54 × 54 px
- `cp_campfire_out` Campfire, out — 54 × 40 px
- `cp_tent` Monster tent — 70 × 60 px
- `cp_chest` Camp chest — 44 × 38 px
- `cp_chest_open` Camp chest, open — 44 × 44 px
- `cp_rack` Weapon rack — 50 × 54 px
- `cp_sacks` Loot sacks — 44 × 36 px
- `cp_cart` Raided cart — 64 × 50 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Monster-camp props 1.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Campfire — ring of stones with crossed logs and a lively fire (about as tall as the hero).
2. Campfire, out — the same fire ring with cold ash and a wisp of smoke (about 0.6× the hero's height).
3. Monster tent — crude hide tent with bone toggles (about as tall as the hero).
4. Camp chest — rough wooden chest with a big padlock (about 0.6× the hero's height).
5. Camp chest, open — the same chest open with a glint of gold (about 0.7× the hero's height).
6. Weapon rack — crude rack of spears and clubs (about as tall as the hero).
7. Loot sacks — pile of bulging sacks (about 0.6× the hero's height).
8. Raided cart — tipped-over cart with a broken wheel (about 0.8× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_camp_2

Monster-camp props 2 · wave 30 · 8 items, 4 × 2 · 1536x1024

- `cp_well` Camp well — 50 × 50 px
- `cp_moonwell` Moonwell — 54 × 44 px
- `cp_beehive` Wild beehive — 40 × 54 px
- `cp_blanket` Picnic blanket — 54 × 40 px
- `cp_scarecrow` Camp scarecrow — 44 × 64 px
- `cp_obelisk` Dark obelisk — 34 × 64 px
- `cp_shrine` Shrine — 44 × 54 px
- `cp_nest` Giant nest — 54 × 36 px

Attach: style_hero, style_centaur, sc_camp_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Monster-camp props 2.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Camp well — small rough stone well (about 0.8× the hero's height).
2. Moonwell — low stone basin of softly glowing silver-blue water (about 0.7× the hero's height).
3. Wild beehive — hanging wild beehive on a branch stump with bees (about as tall as the hero).
4. Picnic blanket — checked blanket with a basket, seen from above-front (about 0.6× the hero's height).
5. Camp scarecrow — sinister scarecrow with a pumpkin head (about as tall as the hero).
6. Dark obelisk — small black obelisk with a red rune (about as tall as the hero).
7. Shrine — small roadside stone shrine with a candle and offerings (about as tall as the hero).
8. Giant nest — big twig nest with two speckled eggs (about 0.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_camp_3

Monster-camp props 3 · wave 30 · 8 items, 4 × 2 · 1536x1024

- `cp_raft` Raft — 60 × 40 px
- `cp_cauldron` Camp cauldron — 50 × 54 px
- `cp_anvil` Camp anvil — 44 × 34 px
- `cp_crystal` Camp crystal — 36 × 54 px
- `cp_bones` Bone pile — 50 × 34 px
- `cp_lantern` Camp lantern — 24 × 54 px
- `cp_banner` War banner — 40 × 64 px
- `cp_totem` Totem — 36 × 70 px

Attach: style_hero, style_centaur, sc_camp_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Monster-camp props 3.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Raft — small log raft with a pole (about 0.6× the hero's height).
2. Camp cauldron — black cauldron hung on a tripod over a fire (about as tall as the hero).
3. Camp anvil — rusty anvil on a stone (about 0.5× the hero's height).
4. Camp crystal — single glowing crystal on a stand of bones (about as tall as the hero).
5. Bone pile — heap of bones and a skull (about 0.5× the hero's height).
6. Camp lantern — lantern on a crooked stick (about as tall as the hero).
7. War banner — ragged war banner with a claw mark (about as tall as the hero).
8. Totem — carved wooden totem with stacked monster faces (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_loot

Loot pickups (small, shown on the ground) · wave 30 · 12 items, 4 × 3 · 1536x1024

- `lt_gold` Gold — 20 × 16 px
- `lt_gem` Gem — 14 × 14 px
- `lt_potion` Potion — 14 × 18 px
- `lt_mana` Mana potion — 14 × 18 px
- `lt_key` Key — 18 × 10 px
- `lt_scroll` Scroll — 18 × 12 px
- `lt_ring` Ring — 12 × 12 px
- `lt_herb` Herb — 16 × 16 px
- `lt_ore` Ore — 18 × 14 px
- `lt_meat` Meat — 18 × 12 px
- `lt_arrows` Arrows — 20 × 12 px
- `lt_relic` Relic — 16 × 18 px

Attach: style_hero, style_centaur, sc_camp_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 12 separate pieces of scenery — Loot pickups (small, shown on the ground).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Gold — small pile of gold coins (a small item, under half the hero's height).
2. Gem — single cut gem (a small item, under half the hero's height).
3. Potion — red potion bottle (a small item, under half the hero's height).
4. Mana potion — blue potion bottle (a small item, under half the hero's height).
5. Key — old iron key (a small item, under half the hero's height).
6. Scroll — rolled parchment with a ribbon (a small item, under half the hero's height).
7. Ring — gold ring with a stone (a small item, under half the hero's height).
8. Herb — bundle of green herbs (a small item, under half the hero's height).
9. Ore — lump of ore with metal veins (a small item, under half the hero's height).
10. Meat — roast drumstick (a small item, under half the hero's height).
11. Arrows — bundle of arrows (a small item, under half the hero's height).
12. Relic — small glowing rune tablet (a small item, under half the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_trial_1

Fairy-trial props 1 · wave 30 · 8 items, 4 × 2 · 1536x1024

- `tp_stone` Trial rune stone — 36 × 50 px
- `tp_stone_dark` Trial rune stone, dark — 36 × 50 px
- `tp_altar` Trial altar — 60 × 56 px
- `tp_target` Star target — 36 × 40 px
- `tp_mirror` Mirror on a post — 30 × 54 px
- `tp_plate` Pressure plate — 32 × 32 px
- `tp_plate_down` Pressure plate, pressed — 32 × 32 px
- `tp_boulder` Push boulder — 40 × 40 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Fairy-trial props 1.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Trial rune stone — waist-high rounded stone with a large glowing rune (about 0.8× the hero's height).
2. Trial rune stone, dark — the same stone, unlit (about 0.8× the hero's height).
3. Trial altar — small stone altar with a floating star of light above it (about as tall as the hero).
4. Star target — round wooden target with a painted star (about 0.6× the hero's height).
5. Mirror on a post — tilted silver mirror on a wooden post (about as tall as the hero).
6. Pressure plate — square stone floor plate with a ring, seen from above (about 0.5× the hero's height).
7. Pressure plate, pressed — the same plate sunk and glowing (about 0.5× the hero's height).
8. Push boulder — smooth round boulder with a carved spiral (about 0.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_trial_2

Fairy-trial props 2 · wave 30 · 8 items, 4 × 2 · 1536x1024

- `tp_spire` Rune spire — 30 × 80 px
- `tp_glass` Glass wall — 64 × 60 px
- `tp_seed_1` Seedling — 16 × 16 px
- `tp_seed_2` Sapling — 26 × 40 px
- `tp_seed_3` Blooming tree — 50 × 70 px
- `tp_pylon` Beam pylon — 26 × 48 px
- `tp_reset` Reset rune — 36 × 36 px
- `tp_wisp` Wisp — 20 × 24 px

Attach: style_hero, style_centaur, sc_trial_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Fairy-trial props 2.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Rune spire — slim crystal spire with rings of light (about 1.3× the hero's height).
2. Glass wall — upright pane of faintly glowing fairy glass, front view (about as tall as the hero).
3. Seedling — tiny glowing sprout (a small item, under half the hero's height).
4. Sapling — small glowing sapling (about 0.6× the hero's height).
5. Blooming tree — small tree in glowing blossom (about as tall as the hero).
6. Beam pylon — short brass pylon with a lens that fires a beam (about 0.8× the hero's height).
7. Reset rune — round floor rune with a looping arrow, seen from above (about 0.6× the hero's height).
8. Wisp — small floating ball of white-blue light with a tail (about 0.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_twr_1 (pilot)

Tower furnishings 1 — tall pieces · wave 31 · 8 items, 4 × 2 · 1536x1024

- `tf_bookshelf` Grand bookshelf — 64 × 110 px
- `tf_wardrobe` Wardrobe — 48 × 96 px
- `tf_lectern` Tower lectern — 36 × 90 px
- `tf_globe` Globe — 50 × 90 px
- `tf_candelabra` Tall candelabra — 36 × 90 px
- `tf_statue` Tower statue — 50 × 120 px
- `tf_pillar` Pillar — 40 × 130 px
- `tf_telescope` Telescope — 60 × 100 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Tower furnishings 1 — tall pieces.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Grand bookshelf — very tall carved bookshelf with a ladder (about 1.7× the hero's height).
2. Wardrobe — tall carved wardrobe (about 1.5× the hero's height).
3. Tower lectern — ornate lectern with a glowing open book (about 1.4× the hero's height).
4. Globe — large globe in a brass stand (about 1.4× the hero's height).
5. Tall candelabra — tall silver candelabra with five candles (about 1.4× the hero's height).
6. Tower statue — marble statue of a robed scholar on a plinth (about 1.9× the hero's height).
7. Pillar — smooth marble pillar with a gold band (about 2.1× the hero's height).
8. Telescope — brass telescope on a tripod (about 1.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_twr_2

Tower furnishings 2 — plants, music and light · wave 31 · 8 items, 4 × 2 · 1536x1024

- `tf_plant` Tall plant — 40 × 90 px
- `tf_planter` Planter — 70 × 50 px
- `tf_tree` Indoor tree — 70 × 120 px
- `tf_whitetree` White tree — 90 × 150 px
- `tf_harp` Harp — 50 × 100 px
- `tf_piano` Spinet — 80 × 70 px
- `tf_chandelier` Chandelier — 90 × 70 px
- `tf_crystalpillar` Crystal pillar — 44 × 130 px

Attach: style_hero, style_centaur, sc_twr_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Tower furnishings 2 — plants, music and light.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Tall plant — large fern in a stone urn (about 1.4× the hero's height).
2. Planter — long stone planter with flowers (about 0.8× the hero's height).
3. Indoor tree — small ornamental tree in a square tub (about 1.9× the hero's height).
4. White tree — slender silver-white tree with pale glowing leaves (about 2.4× the hero's height).
5. Harp — tall gilded harp (about 1.6× the hero's height).
6. Spinet — small wooden keyboard instrument with a stool (about as tall as the hero).
7. Chandelier — hanging iron ring chandelier with candles, seen from below-front (about as tall as the hero).
8. Crystal pillar — pillar of clear glowing crystal (about 2.1× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_twr_3

Tower centrepieces · wave 31 · 6 items, 3 × 2 · 1536x1024

- `tf_c_fountain` Hall fountain — 150 × 150 px
- `tf_c_crystal` Great crystal — 120 × 170 px
- `tf_c_tree` Hall tree — 150 × 170 px
- `tf_c_orrery` Orrery — 150 × 150 px
- `tf_c_pool` Reflecting pool — 150 × 100 px
- `tf_c_starmap` Star map — 150 × 150 px

Attach: style_hero, style_centaur, sc_twr_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Tower centrepieces.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Hall fountain — three-tiered marble fountain (about 2.4× the hero's height).
2. Great crystal — giant floating crystal over a rune dais (about 2.7× the hero's height).
3. Hall tree — great tree growing from a round stone bed (about 2.7× the hero's height).
4. Orrery — large brass orrery of rings and planets (about 2.4× the hero's height).
5. Reflecting pool — round stone-edged pool of still glowing water, seen from above-front (about 1.6× the hero's height).
6. Star map — round floor inlay of a star map in gold on blue, seen from above (about 2.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_twr_4

Tower furnishings 4 — low pieces · wave 31 · 12 items, 4 × 3 · 1536x1024

- `tf_table` Round table — 56 × 44 px
- `tf_longtable` Dining table — 120 × 50 px
- `tf_desk` Scholar's desk — 70 × 48 px
- `tf_maptable` Tower map table — 80 × 56 px
- `tf_sideboard` Sideboard — 70 × 50 px
- `tf_bench` Cushioned bench — 70 × 30 px
- `tf_pew` Pew — 80 × 36 px
- `tf_chair` High-backed chair — 30 × 46 px
- `tf_nightstand` Nightstand — 26 × 30 px
- `tf_bed` Canopy bed — 70 × 100 px
- `tf_altar` Tower altar — 80 × 56 px
- `tf_stairs` Spiral stair — 70 × 70 px

Attach: style_hero, style_centaur, sc_twr_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 12 separate pieces of scenery — Tower furnishings 4 — low pieces.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Round table — round polished table (about 0.7× the hero's height).
2. Dining table — long dining table with a runner (about 0.8× the hero's height).
3. Scholar's desk — desk covered in scrolls (about 0.8× the hero's height).
4. Tower map table — table with a glowing map (about as tall as the hero).
5. Sideboard — carved sideboard with silver (about 0.8× the hero's height).
6. Cushioned bench — bench with red cushions (about 0.5× the hero's height).
7. Pew — wooden chapel pew (about 0.6× the hero's height).
8. High-backed chair — carved high-backed chair (about 0.7× the hero's height).
9. Nightstand — small nightstand with a candle (about 0.5× the hero's height).
10. Canopy bed — four-poster bed with curtains (about 1.6× the hero's height).
11. Tower altar — white stone altar with a cloth and two candles (about as tall as the hero).
12. Spiral stair — top of a stone spiral stair going down, seen from above-front (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_twr_rugs

Tower rugs and floor pieces (seen from above) · wave 31 · 6 items, 3 × 2 · 1536x1024

- `tf_rug` Tower rug — 128 × 96 px
- `tf_runner` Runner — 160 × 40 px
- `tf_royal_carpet` Royal carpet — 192 × 56 px
- `tf_mosaic` Mosaic — 128 × 128 px
- `tf_dais` Dais — 160 × 96 px
- `tf_rune_circle` Summoning circle — 128 × 128 px

Attach: style_hero, style_centaur, sc_twr_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate pieces of scenery — Tower rugs and floor pieces (seen from above).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Tower rug — large rectangular rug, deep blue with silver stars (about 2× the hero's height across).
2. Runner — long narrow red runner carpet (about 2.5× the hero's height across).
3. Royal carpet — long crimson carpet with gold edging (about 3× the hero's height across).
4. Mosaic — round floor mosaic of a sun (about 2× the hero's height across).
5. Dais — low stepped stone dais (about 2.5× the hero's height across).
6. Summoning circle — chalk-white summoning circle with runes and candles (about 2× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_castle_1

Castle furnishings 1 · wave 31 · 8 items, 4 × 2 · 1536x1024

- `cf_hearth` Great hearth — 110 × 130 px
- `cf_torch` Great torch — 30 × 110 px
- `cf_pillar` Massive pillar — 60 × 150 px
- `cf_armor` Suit of armor — 50 × 120 px
- `cf_weapons` Castle weapon rack — 90 × 110 px
- `cf_shields` Shield rack — 90 × 110 px
- `cf_sword` Great sword — 40 × 130 px
- `cf_barrel` Wine cask — 60 × 60 px

Attach: style_hero, style_centaur, sc_twr_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Castle furnishings 1.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Great hearth — huge stone hearth with a roaring fire and a crest (about 2.1× the hero's height).
2. Great torch — tall iron floor torch (about 1.7× the hero's height).
3. Massive pillar — thick dark stone pillar with a carved band (about 2.4× the hero's height).
4. Suit of armor — full plate armor on a stand holding a halberd (about 1.9× the hero's height).
5. Castle weapon rack — long rack of halberds and swords (about 1.7× the hero's height).
6. Shield rack — rack of painted shields (about 1.7× the hero's height).
7. Great sword — giant ceremonial sword standing point-down in a stone (about 2.1× the hero's height).
8. Wine cask — large wine cask on a cradle (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_castle_2

Castle furnishings 2 · wave 31 · 8 items, 4 × 2 · 1536x1024

- `cf_knight` Knight statue — 60 × 140 px
- `cf_dragon` Dragon statue — 90 × 130 px
- `cf_saint` Saint statue — 50 × 140 px
- `cf_throne` Throne — 90 × 150 px
- `cf_sarcophagus` Sarcophagus — 100 × 60 px
- `cf_brazier` Great brazier — 70 × 90 px
- `cf_banquet` Banquet table — 160 × 60 px
- `cf_bench` Long bench — 120 × 30 px

Attach: style_hero, style_centaur, sc_twr_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Castle furnishings 2.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Knight statue — stone statue of a knight with sword and shield (about 2.2× the hero's height).
2. Dragon statue — stone statue of a coiled dragon (about 2.1× the hero's height).
3. Saint statue — stone statue of a hooded figure with a lantern (about 2.2× the hero's height).
4. Throne — towering dark throne with a tall pointed back (about 2.4× the hero's height).
5. Sarcophagus — stone sarcophagus with a carved knight on the lid (about as tall as the hero).
6. Great brazier — wide bronze brazier with tall flames (about 1.4× the hero's height).
7. Banquet table — long table laid with a feast (about as tall as the hero).
8. Long bench — long plain castle bench (about 0.5× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_castle_3

Castle wall pieces · wave 31 · 8 items, 4 × 2 · 1536x1024

- `cw_banner` Castle banner — 34 × 96 px
- `cw_torch` Wall torch — 24 × 52 px
- `cw_shield` Wall shield — 40 × 44 px
- `cw_candle` Wall candle — 26 × 30 px
- `cw_window` Lancet window — 40 × 96 px
- `cw_rose` Rose window — 96 × 100 px
- `cw_chains` Hanging chains — 30 × 70 px
- `cw_tapestry` Tapestry — 96 × 64 px

Attach: style_hero, style_centaur, sc_twr_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Castle wall pieces.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Castle banner — long hanging heraldic banner, blank shield shape in the middle (about 1.5× the hero's height).
2. Wall torch — iron wall torch with flame (about as tall as the hero).
3. Wall shield — mounted shield over crossed axes (about 0.7× the hero's height).
4. Wall candle — wall sconce with two candles (about 0.5× the hero's height).
5. Lancet window — tall pointed stained-glass window, blue and red (about 1.5× the hero's height).
6. Rose window — round stained-glass rose window (about 1.6× the hero's height).
7. Hanging chains — iron chains with manacles (about as tall as the hero).
8. Tapestry — wide woven tapestry of a battle (about as tall as the hero).
View: seen straight from the front, flat, to hang on a room's back wall in a top-down RPG.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_mage_1

Mage-tower furnishings 1 · wave 31 · 8 items, 4 × 2 · 1536x1024

- `mf_cauldron` Great cauldron — 70 × 80 px
- `mf_potion_shelf` Potion shelf — 64 × 110 px
- `mf_alchemy` Alchemy table — 90 × 70 px
- `mf_herb_rack` Mage herb rack — 64 × 90 px
- `mf_books` Floating books — 60 × 100 px
- `mf_floatrock` Floating stone — 50 × 70 px
- `mf_pylon` Arcane pylon — 40 × 110 px
- `mf_crystals` Crystal cluster — 80 × 90 px

Attach: style_hero, style_centaur, sc_twr_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Mage-tower furnishings 1.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Great cauldron — huge bubbling cauldron with coloured smoke (about 1.3× the hero's height).
2. Potion shelf — tall shelf crowded with glowing potions (about 1.7× the hero's height).
3. Alchemy table — table of glass tubes, burners and flasks (about as tall as the hero).
4. Mage herb rack — rack of strange hanging plants (about 1.4× the hero's height).
5. Floating books — a spiral of open books floating in the air (about 1.6× the hero's height).
6. Floating stone — small floating rune stone with orbiting pebbles (about as tall as the hero).
7. Arcane pylon — brass-and-crystal pylon humming with light (about 1.7× the hero's height).
8. Crystal cluster — big cluster of glowing crystals (about 1.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_mage_2

Mage-tower furnishings 2 · wave 31 · 8 items, 4 × 2 · 1536x1024

- `mf_orb` Scrying orb — 50 × 70 px
- `mf_cage` Cage — 50 × 90 px
- `mf_gears` Gear wall — 90 × 110 px
- `mf_hourglass` Hourglass — 50 × 100 px
- `mf_mirror` Magic mirror — 50 × 110 px
- `mf_bones` Bone pile — 70 × 50 px
- `mf_soulfire` Soulfire — 40 × 80 px
- `mf_anvil` Rune anvil — 60 × 60 px

Attach: style_hero, style_centaur, sc_twr_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Mage-tower furnishings 2.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Scrying orb — large glowing orb on a clawed stand (about as tall as the hero).
2. Cage — hanging iron cage with a glowing creature's eyes inside (about 1.4× the hero's height).
3. Gear wall — standing frame of turning brass gears (about 1.7× the hero's height).
4. Hourglass — giant hourglass with glowing sand (about 1.6× the hero's height).
5. Magic mirror — tall ornate mirror with a swirling surface (about 1.7× the hero's height).
6. Bone pile — heap of bones with a candle on a skull (about 0.8× the hero's height).
7. Soulfire — brazier of cold blue-green flame (about 1.3× the hero's height).
8. Rune anvil — anvil glowing with runes and a floating hammer (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_mage_3

Mage-tower furnishings 3 · wave 31 · 8 items, 4 × 2 · 1536x1024

- `mf_tank` Fish tank — 70 × 100 px
- `mf_mushrooms` Giant mushrooms — 80 × 100 px
- `mf_curtain` Stage curtain — 70 × 120 px
- `mf_puppet` Puppet — 40 × 90 px
- `mf_void` Void crack — 60 × 90 px
- `mf_starmap` Star floor — 128 × 128 px
- `mf_stage` Stage floor — 128 × 90 px
- `mf_clock` Great clock — 44 × 120 px

Attach: style_hero, style_centaur, sc_twr_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Mage-tower furnishings 3.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Fish tank — tall glass tank with glowing fish (about 1.6× the hero's height).
2. Giant mushrooms — cluster of giant glowing mushrooms (about 1.6× the hero's height).
3. Stage curtain — heavy red velvet curtain drawn to one side (about 1.9× the hero's height).
4. Puppet — life-size wooden marionette hanging from strings (about 1.4× the hero's height).
5. Void crack — jagged floating crack of violet-black nothing (about 1.4× the hero's height).
6. Star floor — round floor inlay of constellations, seen from above (about 2× the hero's height).
7. Stage floor — round wooden stage with footlights, seen from above-front (about 1.4× the hero's height).
8. Great clock — tall standing clock with a moon dial (about 1.9× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_dng_1 (pilot)

Dungeon pieces 1 · wave 32 · 8 items, 4 × 2 · 1536x1024

- `dg_boulder` Cave boulder — 60 × 60 px
- `dg_column` Cave column — 40 × 110 px
- `dg_rubble` Rubble — 50 × 30 px
- `dg_crystal` Cave crystal — 50 × 80 px
- `dg_shroom` Giant mushroom — 90 × 110 px
- `dg_shroom_b` Mushroom cluster — 60 × 60 px
- `dg_obsidian` Obsidian block — 40 × 60 px
- `dg_stalagmite` Stalagmite — 36 × 70 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Dungeon pieces 1.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Cave boulder — rough brown cave boulder (about as tall as the hero).
2. Cave column — cracked stone hall column (about 1.7× the hero's height).
3. Rubble — heap of broken stone, seen from above-front (about 0.5× the hero's height).
4. Cave crystal — cluster of violet cave crystals (about 1.3× the hero's height).
5. Giant mushroom — giant cave mushroom with a spotted teal cap (about 1.7× the hero's height).
6. Mushroom cluster — cluster of smaller glowing mushrooms (about as tall as the hero).
7. Obsidian block — sharp black obsidian block (about as tall as the hero).
8. Stalagmite — pointed cave stalagmite (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_dng_2

Dungeon pieces 2 · wave 32 · 8 items, 4 × 2 · 1536x1024

- `dg_statue` Dungeon statue — 40 × 70 px
- `dg_ruinwall` Dungeon wall stub — 70 × 50 px
- `dg_rock` Lake rock — 44 × 44 px
- `dg_rib` Rib bone — 50 × 90 px
- `dg_skull` Beast skull — 90 × 80 px
- `dg_root` Root — 40 × 70 px
- `dg_stone` Chasm stone — 40 × 60 px
- `dg_puddle` Puddle — 50 × 30 px

Attach: style_hero, style_centaur, sc_dng_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Dungeon pieces 2.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Dungeon statue — worn statue of a forgotten king, one arm missing (about as tall as the hero).
2. Dungeon wall stub — low broken wall (about 0.8× the hero's height).
3. Lake rock — wet black rock (about 0.7× the hero's height).
4. Rib bone — curved rib bone standing up (about 1.4× the hero's height).
5. Beast skull — large horned beast skull (about 1.3× the hero's height).
6. Root — thick twisted root arching from the floor (about as tall as the hero).
7. Chasm stone — flat-topped standing rock (about as tall as the hero).
8. Puddle — small puddle with a reflection, seen from above (about 0.5× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_dng_3

Dungeon pieces 3 — things you use · wave 32 · 8 items, 4 × 2 · 1536x1024

- `dg_chest` Dungeon chest — 44 × 40 px
- `dg_chest_open` Dungeon chest, open — 44 × 46 px
- `dg_chest_boss` Guardian's chest — 60 × 52 px
- `dg_stairs_up` Stairs up — 64 × 70 px
- `dg_stairs_down` Stairs down — 64 × 56 px
- `dg_cage` Captive cage — 60 × 80 px
- `dg_lever` Lever — 24 × 36 px
- `dg_torch` Dungeon torch — 20 × 60 px

Attach: style_hero, style_centaur, sc_dng_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Dungeon pieces 3 — things you use.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Dungeon chest — iron-bound treasure chest, closed (about 0.6× the hero's height).
2. Dungeon chest, open — the same chest open with gold (about 0.7× the hero's height).
3. Guardian's chest — large ornate golden chest with a rune lock (about as tall as the hero).
4. Stairs up — stone steps climbing into an arch of light (about as tall as the hero).
5. Stairs down — stone steps descending into darkness (about as tall as the hero).
6. Captive cage — iron cage with an open door (about 1.3× the hero's height).
7. Lever — stone base with an iron lever (about 0.6× the hero's height).
8. Dungeon torch — standing iron torch (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_dng_ember

Ember-cave and arena pieces · wave 32 · 8 items, 4 × 2 · 1536x1024

- `dg_basalt` Ember basalt — 44 × 78 px
- `dg_vent` Lava vent — 44 × 30 px
- `dg_fcrystal` Fire crystal — 50 × 80 px
- `dg_hoist` Forge hoist — 60 × 100 px
- `ar_pillar` Arena pillar — 40 × 96 px
- `ar_barricade` Barricade — 44 × 40 px
- `ar_gear` Gear — 48 × 48 px
- `ar_mirror` Arena mirror — 36 × 76 px

Attach: style_hero, style_centaur, sc_dng_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 separate pieces of scenery — Ember-cave and arena pieces.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Ember basalt — short basalt column with glowing seams (about as tall as the hero).
2. Lava vent — crusted vent glowing from below, seen from above-front (about 0.5× the hero's height).
3. Fire crystal — cluster of orange-red crystals (about 1.3× the hero's height).
4. Forge hoist — iron hoist frame with a chain and bucket (about 1.6× the hero's height).
5. Arena pillar — thick arena pillar with a rune band (about 1.5× the hero's height).
6. Barricade — spiked wooden barricade (about 0.6× the hero's height).
7. Gear — large brass gear half sunk in the floor (about 0.8× the hero's height).
8. Arena mirror — tall standing mirror in a dark frame (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_ui_1 (pilot)

Control-bar and menu icons · wave 33 · 25 items, 5 × 5 · 1024x1024

- `ui_attack` Attack — 48 × 48 px
- `ui_ranged` Ranged — 48 × 48 px
- `ui_ammo` Ammo — 48 × 48 px
- `ui_defend` Defend — 48 × 48 px
- `ui_potion` Potion — 48 × 48 px
- `ui_food` Food — 48 × 48 px
- `ui_spell` Spell — 48 × 48 px
- `ui_mount` Mount — 48 × 48 px
- `ui_familiar` Familiar — 48 × 48 px
- `ui_special` Special attack — 48 × 48 px
- `ui_map` Map — 48 × 48 px
- `ui_quests` Quests — 48 × 48 px
- `ui_inventory` Inventory — 48 × 48 px
- `ui_tome` Tome — 48 × 48 px
- `ui_help` Help — 48 × 48 px
- `ui_sound_on` Sound on — 48 × 48 px
- `ui_sound_off` Sound off — 48 × 48 px
- `ui_dev` Tools — 48 × 48 px
- `ui_heart` Health — 48 × 48 px
- `ui_mana` Mana — 48 × 48 px
- `ui_xp` Experience — 48 × 48 px
- `ui_gold` Gold — 48 × 48 px
- `ui_key` Key — 48 × 48 px
- `ui_lock` Locked — 48 × 48 px
- `ui_close` Close — 48 × 48 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 25 separate game icons — Control-bar and menu icons.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 25 objects in a grid of 5 columns × 5 rows, evenly spaced, in this order (left to right, top row first):
1. Attack — two crossed swords.
2. Ranged — a drawn bow with an arrow.
3. Ammo — a leather quiver full of arrows.
4. Defend — a round shield with a teal rune.
5. Potion — a round red potion bottle with a cork.
6. Food — a loaf of bread and a wedge of cheese.
7. Spell — an open spellbook with a bright cyan spark rising from it.
8. Mount — a horse head in profile with a bridle.
9. Familiar — a small glowing spirit wisp with two eyes and a leaf.
10. Special attack — a fist inside a burst of golden lightning.
11. Map — a half-unrolled parchment map with a red X.
12. Quests — a scroll with a red wax seal.
13. Inventory — a leather backpack with a bedroll.
14. Tome — a thick leather-bound book with a glowing teal rune on the cover.
15. Help — a small standing stone carved with a glowing question mark.
16. Sound on — a curved horn with three sound waves.
17. Sound off — the same curved horn crossed by a red slash.
18. Tools — a wrench crossed with a hammer.
19. Health — a glossy red heart.
20. Mana — a glowing blue water drop.
21. Experience — a golden five-pointed star.
22. Gold — a small pile of gold coins.
23. Key — an old iron key.
24. Locked — a closed iron padlock.
25. Close — a bold X made of two crossed stone bars.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_ui_2

Empty gear-slot symbols and inventory tabs — the first 14 are EMPTY-SLOT symbols: each one a simple flat dark slate-blue silhouette of the item with a thin teal outline, no other colours, no detail · wave 33 · 25 items, 5 × 5 · 1024x1024

- `sl_back` Empty cloak slot — 48 × 48 px
- `sl_head` Empty helmet slot — 48 × 48 px
- `sl_body` Empty armor slot — 48 × 48 px
- `sl_shield` Empty shield slot — 48 × 48 px
- `sl_gauntlets` Empty gauntlets slot — 48 × 48 px
- `sl_rHand` Empty ranged slot — 48 × 48 px
- `sl_pants` Empty leg slot — 48 × 48 px
- `sl_neck` Empty amulet slot — 48 × 48 px
- `sl_feet` Empty boots slot — 48 × 48 px
- `sl_special` Empty skill slot — 48 × 48 px
- `sl_lHand` Empty melee slot — 48 × 48 px
- `sl_spell` Empty spell slot — 48 × 48 px
- `sl_mWeapon` Empty magic-weapon slot — 48 × 48 px
- `sl_ring` Empty ring slot — 48 × 48 px
- `tab_equip` Equipped tab — 48 × 48 px
- `tab_weapons` Weapons tab — 48 × 48 px
- `tab_armor` Armor tab — 48 × 48 px
- `tab_accessories` Accessories tab — 48 × 48 px
- `tab_ammo` Ammo tab — 48 × 48 px
- `tab_food` Food tab — 48 × 48 px
- `tab_gems` Gems tab — 48 × 48 px
- `tab_potions` Potions tab — 48 × 48 px
- `tab_all` All items tab — 48 × 48 px
- `tab_sell` Sell — 48 × 48 px
- `tab_buy` Buy — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 25 separate game icons — Empty gear-slot symbols and inventory tabs — the first 14 are EMPTY-SLOT symbols: each one a simple flat dark slate-blue silhouette of the item with a thin teal outline, no other colours, no detail.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 25 objects in a grid of 5 columns × 5 rows, evenly spaced, in this order (left to right, top row first):
1. Empty cloak slot — silhouette of a cloak.
2. Empty helmet slot — silhouette of a helmet.
3. Empty armor slot — silhouette of a chest plate.
4. Empty shield slot — silhouette of a shield.
5. Empty gauntlets slot — silhouette of a glove.
6. Empty ranged slot — silhouette of a bow.
7. Empty leg slot — silhouette of leg armor.
8. Empty amulet slot — silhouette of an amulet on a chain.
9. Empty boots slot — silhouette of a boot.
10. Empty skill slot — silhouette of a lightning burst.
11. Empty melee slot — silhouette of a sword.
12. Empty spell slot — silhouette of an open book.
13. Empty magic-weapon slot — silhouette of a staff.
14. Empty ring slot — silhouette of a finger ring.
15. Equipped tab — the head and shoulders of a suit of armor, full colour.
16. Weapons tab — a sword and an axe crossed, full colour.
17. Armor tab — a steel chest plate, full colour.
18. Accessories tab — a ring and an amulet, full colour.
19. Ammo tab — three arrows tied in a bundle, full colour.
20. Food tab — a roast drumstick, full colour.
21. Gems tab — three cut gems: red, blue, green.
22. Potions tab — three small bottles: red, blue, green.
23. All items tab — an open treasure chest.
24. Sell — a hand dropping a gold coin.
25. Buy — a small coin purse.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_ui_3

Map markers and quest icons · wave 33 · 25 items, 5 × 5 · 1024x1024

- `mk_village` Village — 48 × 48 px
- `mk_dungeon` Dungeon — 48 × 48 px
- `mk_tower` Tower — 48 × 48 px
- `mk_mage` Mage tower — 48 × 48 px
- `mk_castle` Castle — 48 × 48 px
- `mk_camp` Monster camp — 48 × 48 px
- `mk_harbor` Harbor — 48 × 48 px
- `mk_skyport` Sky port — 48 × 48 px
- `mk_waystone` Waystone — 48 × 48 px
- `mk_volcano` Volcano — 48 × 48 px
- `mk_henge` Fairy henge — 48 × 48 px
- `mk_boss` Boss — 48 × 48 px
- `mk_hero` You are here — 48 × 48 px
- `mk_shop` Shop — 48 × 48 px
- `mk_tavern` Tavern — 48 × 48 px
- `mk_forge` Forge — 48 × 48 px
- `mk_home` Home — 48 × 48 px
- `mk_bridge` Bridge — 48 × 48 px
- `q_main` Main quest — 48 × 48 px
- `q_side` Side quest — 48 × 48 px
- `q_done` Quest done — 48 × 48 px
- `q_locked` Quest locked — 48 × 48 px
- `q_bounty` Bounty — 48 × 48 px
- `q_fairy` Fairy quest — 48 × 48 px
- `q_reward` Reward — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 25 separate game icons — Map markers and quest icons.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 25 objects in a grid of 5 columns × 5 rows, evenly spaced, in this order (left to right, top row first):
1. Village — a cluster of three tiny cottages.
2. Dungeon — a dark cave mouth in rock.
3. Tower — a tall stone tower.
4. Mage tower — a crooked spire with a glowing orb on top.
5. Castle — a castle keep with two turrets and a flag.
6. Monster camp — a tent with a campfire.
7. Harbor — an anchor.
8. Sky port — a hot-air balloon.
9. Waystone — a tall obelisk with glowing cyan runes.
10. Volcano — an erupting volcano.
11. Fairy henge — a ring of small standing stones with a sparkle.
12. Boss — a horned skull.
13. You are here — a teal arrowhead pointing up.
14. Shop — a market stall awning.
15. Tavern — a foaming tankard.
16. Forge — an anvil with a hammer.
17. Home — a round cottage with a blue roof.
18. Bridge — a small arched stone bridge.
19. Main quest — a golden exclamation mark on a shield.
20. Side quest — a silver exclamation mark.
21. Quest done — a green check mark in a laurel ring.
22. Quest locked — a scroll wrapped in a chain.
23. Bounty — a wanted poster with a monster face.
24. Fairy quest — a tiny fairy with glowing wings.
25. Reward — an open treasure chest full of gold.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_ui_4

Status effects, elements and tome chapters · wave 33 · 25 items, 5 × 5 · 1024x1024

- `st_atk` Attack up — 48 × 48 px
- `st_def` Defense up — 48 × 48 px
- `st_speed` Speed up — 48 × 48 px
- `st_regen` Regeneration — 48 × 48 px
- `st_poison` Poisoned — 48 × 48 px
- `st_burn` Burning — 48 × 48 px
- `st_slow` Slowed — 48 × 48 px
- `st_freeze` Frozen — 48 × 48 px
- `st_blind` Blinded — 48 × 48 px
- `st_stun` Stunned — 48 × 48 px
- `st_shield` Shielded — 48 × 48 px
- `st_haste` Time slow — 48 × 48 px
- `el_grass` Grass element — 48 × 48 px
- `el_water` Water element — 48 × 48 px
- `el_earth` Earth element — 48 × 48 px
- `el_fire` Fire element — 48 × 48 px
- `tm_monsters` Monsters chapter — 48 × 48 px
- `tm_bosses` Bosses chapter — 48 × 48 px
- `tm_familiars` Familiars chapter — 48 × 48 px
- `tm_mounts` Mounts chapter — 48 × 48 px
- `tm_spells` Spells chapter — 48 × 48 px
- `tm_skills` Skills chapter — 48 × 48 px
- `tm_places` Places chapter — 48 × 48 px
- `tm_lore` Lore chapter — 48 × 48 px
- `ui_levelup` Level up — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 25 separate game icons — Status effects, elements and tome chapters.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 25 objects in a grid of 5 columns × 5 rows, evenly spaced, in this order (left to right, top row first):
1. Attack up — a red sword with an up arrow.
2. Defense up — a blue shield with an up arrow.
3. Speed up — a winged boot.
4. Regeneration — a green heart with a plus.
5. Poisoned — a green skull-shaped droplet.
6. Burning — a small orange flame.
7. Slowed — a snail.
8. Frozen — a blue snowflake crystal.
9. Blinded — an eye crossed by a slash.
10. Stunned — three yellow stars in a ring.
11. Shielded — a glowing teal bubble.
12. Time slow — an hourglass with glowing sand.
13. Grass element — a green leaf as a round badge.
14. Water element — a blue wave as a round badge.
15. Earth element — a brown mountain as a round badge.
16. Fire element — a red flame as a round badge.
17. Monsters chapter — a snarling goblin face.
18. Bosses chapter — a crowned horned skull.
19. Familiars chapter — a small spirit creature curled up.
20. Mounts chapter — a saddle.
21. Spells chapter — a wand trailing stars.
22. Skills chapter — a clenched fist with a spark.
23. Places chapter — a compass rose.
24. Lore chapter — a quill and an ink pot.
25. Level up — a golden up-arrow with a starburst.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_orn

Panel ornaments — carved dark stone inlaid with glowing teal runes and thin gold edges; each drawn flat, straight from the front · wave 33 · 6 items, 3 × 2 · 1536x1024

- `orn_corner` Corner flourish — 96 × 48 px
- `orn_divider` Divider — 96 × 48 px
- `orn_banner` Header banner — 96 × 48 px
- `orn_medallion` Medallion — 96 × 48 px
- `orn_arrow` Arrow — 96 × 48 px
- `orn_plate` Name plate — 96 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 6 separate game icons — Panel ornaments — carved dark stone inlaid with glowing teal runes and thin gold edges; each drawn flat, straight from the front.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Corner flourish — an L-shaped corner piece of carved stone knotwork, for the top-left corner of a panel.
2. Divider — a long thin horizontal bar of knotwork with a small teal gem in the middle.
3. Header banner — a wide dark-green cloth ribbon banner with forked ends and a gold edge, blank.
4. Medallion — a round stone ring frame with runes round it, empty in the middle.
5. Arrow — a small carved stone arrowhead pointing right.
6. Name plate — a small blank brass plate with two rivets.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_melee

Item icons — swords, axes and other melee weapons · wave 34 · 22 items, 5 × 5 · 1024x1024

- `ic_axe` Woodcutter's Axe — 48 × 48 px
- `ic_wooden_sword` Wooden Sword — 48 × 48 px
- `ic_iron_sword` Iron Sword — 48 × 48 px
- `ic_long_sword` Long Sword — 48 × 48 px
- `ic_great_sword` Great Sword — 48 × 48 px
- `ic_flame_blade` Flame Blade — 48 × 48 px
- `ic_sea_trident` Sea Trident — 48 × 48 px
- `ic_flame_sword` Flame Sword — 48 × 48 px
- `ic_sky_sword` Sky Sword — 48 × 48 px
- `ic_flame_iron` Flame Iron — 48 × 48 px
- `ic_frost_iron` Frost Iron — 48 × 48 px
- `ic_thunder_iron` Thunder Iron — 48 × 48 px
- `ic_inferno_edge` Inferno Edge — 48 × 48 px
- `ic_glacier_sword` Glacier Sword — 48 × 48 px
- `ic_storm_blade` Storm Blade — 48 × 48 px
- `ic_magma_cleaver` Magma Cleaver — 48 × 48 px
- `ic_permafrost` Permafrost — 48 × 48 px
- `ic_cyclone_blade` Cyclone Blade — 48 × 48 px
- `ic_volcano_lord` Volcano Lord — 48 × 48 px
- `ic_absolute_zero` Absolute Zero — 48 × 48 px
- `ic_thunder_god` Thunder God — 48 × 48 px
- `ic_elemental_sovereign` Elemental Sovereign — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 22 separate game icons — Item icons — swords, axes and other melee weapons.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 22 objects in a grid of 5 columns × 5 rows, evenly spaced, in this order (left to right, top row first); the last 3 cell(s) stay empty:
1. Woodcutter's Axe — melee weapon, a steel axe head on a wooden haft.
2. Wooden Sword — melee weapon, plain wood.
3. Iron Sword — melee weapon, grey iron.
4. Long Sword — melee weapon.
5. Great Sword — melee weapon.
6. Flame Blade — melee weapon, wreathed in orange flame.
7. Sea Trident — melee weapon, sea-green with shells and coral.
8. Flame Sword — melee weapon, wreathed in orange flame.
9. Sky Sword — melee weapon, white and gold with a pale-blue glow.
10. Flame Iron — melee weapon, wreathed in orange flame.
11. Frost Iron — melee weapon, icy pale blue with frost crystals.
12. Thunder Iron — melee weapon, crackling with yellow-white lightning.
13. Inferno Edge — melee weapon, burning deep red-orange.
14. Glacier Sword — melee weapon, thick blue-white ice.
15. Storm Blade — melee weapon, storm-grey with small lightning arcs.
16. Magma Cleaver — melee weapon, black rock with glowing lava cracks.
17. Permafrost — melee weapon, dark blue ice with white rime.
18. Cyclone Blade — melee weapon, wrapped in a swirl of wind and sparks.
19. Volcano Lord — melee weapon, a massive blade of black rock with rivers of glowing lava.
20. Absolute Zero — melee weapon, a blade of pure pale-blue ice with a white glow.
21. Thunder God — melee weapon, a golden blade crackling with white lightning.
22. Elemental Sovereign — melee weapon, a blade in three parts of fire, ice and lightning, glowing.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_ranged

Item icons — bows, staffs, arrows and darts · wave 34 · 19 items, 5 × 4 · 1536x1024

- `ic_short_bow` Short Bow — 48 × 48 px
- `ic_hunting_bow` Hunting Bow — 48 × 48 px
- `ic_crossbow` Crossbow — 48 × 48 px
- `ic_longbow` Longbow — 48 × 48 px
- `ic_bone_crossbow` Bone Crossbow — 48 × 48 px
- `ic_elven_bow` Elven Bow — 48 × 48 px
- `ic_sky_bow` Sky Bow — 48 × 48 px
- `ic_magic_wand` Magic Wand — 48 × 48 px
- `ic_ember_staff` Staff of Embers — 48 × 48 px
- `ic_storm_staff` Storm Staff — 48 × 48 px
- `ic_arcane_staff` Arcane Staff — 48 × 48 px
- `ic_arrow_normal` Normal Arrow — 48 × 48 px
- `ic_arrow_cold` Cold Arrow — 48 × 48 px
- `ic_arrow_fire` Fire Arrow — 48 × 48 px
- `ic_arrow_heat` Heat-Seeking Arrow — 48 × 48 px
- `ic_dart_normal` Normal Dart — 48 × 48 px
- `ic_dart_cold` Cold Dart — 48 × 48 px
- `ic_dart_fire` Fire Dart — 48 × 48 px
- `ic_dart_heat` Heat-Seeking Dart — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 19 separate game icons — Item icons — bows, staffs, arrows and darts.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 19 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first); the last 1 cell(s) stay empty:
1. Short Bow — ranged weapon.
2. Hunting Bow — ranged weapon.
3. Crossbow — ranged weapon.
4. Longbow — ranged weapon.
5. Bone Crossbow — ranged weapon, made of pale bone.
6. Elven Bow — ranged weapon, elegant pale wood with leaf carvings.
7. Sky Bow — ranged weapon, white and gold with a pale-blue glow.
8. Magic Wand — magic weapon.
9. Staff of Embers — magic weapon, glowing ember-orange.
10. Storm Staff — magic weapon, storm-grey with small lightning arcs.
11. Arcane Staff — magic weapon, deep violet with glowing cyan runes.
12. Normal Arrow — ammunition.
13. Cold Arrow — ammunition, tipped with pale-blue ice.
14. Fire Arrow — ammunition, glowing orange with small flames.
15. Heat-Seeking Arrow — ammunition, with a glowing red seeker tip.
16. Normal Dart — ammunition.
17. Cold Dart — ammunition, tipped with pale-blue ice.
18. Fire Dart — ammunition, glowing orange with small flames.
19. Heat-Seeking Dart — ammunition, with a glowing red seeker tip.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_armor

Item icons — body armor and shields · wave 35 · 25 items, 5 × 5 · 1024x1024

- `ic_leather` Leather Armor — 48 × 48 px
- `ic_chain_mail` Chain Mail — 48 × 48 px
- `ic_plate_armor` Plate Armor — 48 × 48 px
- `ic_dragon_armor` Dragon Armor — 48 × 48 px
- `ic_padded_armor` Padded Armor — 48 × 48 px
- `ic_studded_leather` Studded Leather — 48 × 48 px
- `ic_brigandine` Brigandine — 48 × 48 px
- `ic_scale_mail` Scale Mail — 48 × 48 px
- `ic_half_plate` Half Plate — 48 × 48 px
- `ic_mage_robes` Mage Robes — 48 × 48 px
- `ic_shadow_armor` Shadow Armor — 48 × 48 px
- `ic_sky_robe` Sky Robe — 48 × 48 px
- `ic_wood_shield` Wood Shield — 48 × 48 px
- `ic_iron_shield` Iron Shield — 48 × 48 px
- `ic_sea_shell_buckler` Sea Shell Buckler — 48 × 48 px
- `ic_buckler` Buckler — 48 × 48 px
- `ic_round_shield` Round Shield — 48 × 48 px
- `ic_bone_shield` Bone Shield — 48 × 48 px
- `ic_kite_shield` Kite Shield — 48 × 48 px
- `ic_stormshield` Stormshield — 48 × 48 px
- `ic_tower_shield` Tower Shield — 48 × 48 px
- `ic_sea_buckler` Sea Buckler — 48 × 48 px
- `ic_obsidian_shield` Obsidian Shield — 48 × 48 px
- `ic_dragon_shield` Dragon Shield — 48 × 48 px
- `ic_aegis` Aegis — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 25 separate game icons — Item icons — body armor and shields.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 25 objects in a grid of 5 columns × 5 rows, evenly spaced, in this order (left to right, top row first):
1. Leather Armor — body armor (the torso piece on its own, no person), brown leather.
2. Chain Mail — body armor (the torso piece on its own, no person), steel chain links.
3. Plate Armor — body armor (the torso piece on its own, no person), polished steel plate.
4. Dragon Armor — body armor (the torso piece on its own, no person), red dragon scale with gold trim.
5. Padded Armor — body armor (the torso piece on its own, no person).
6. Studded Leather — body armor (the torso piece on its own, no person), brown leather.
7. Brigandine — body armor (the torso piece on its own, no person).
8. Scale Mail — body armor (the torso piece on its own, no person).
9. Half Plate — body armor (the torso piece on its own, no person), polished steel plate.
10. Mage Robes — body armor (the torso piece on its own, no person), blue cloth with gold stars.
11. Shadow Armor — body armor (the torso piece on its own, no person), violet-black with wisps of shadow.
12. Sky Robe — body armor (the torso piece on its own, no person), white and gold with a pale-blue glow.
13. Wood Shield — shield, plain wood.
14. Iron Shield — shield, grey iron.
15. Sea Shell Buckler — shield, sea-green with shells and coral.
16. Buckler — shield.
17. Round Shield — shield.
18. Bone Shield — shield, made of pale bone.
19. Kite Shield — shield.
20. Stormshield — shield, storm-grey with small lightning arcs.
21. Tower Shield — shield.
22. Sea Buckler — shield, sea-green with shells and coral.
23. Obsidian Shield — shield, glossy black volcanic glass.
24. Dragon Shield — shield, red dragon scale with gold trim.
25. Aegis — shield.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_headlegs

Item icons — headgear and leg armor · wave 35 · 20 items, 5 × 4 · 1536x1024

- `ic_cloth_cap` Cloth Cap — 48 × 48 px
- `ic_leather_cap` Leather Cap — 48 × 48 px
- `ic_iron_helm` Iron Helm — 48 × 48 px
- `ic_battle_helm` Battle Helm — 48 × 48 px
- `ic_mage_hood` Mage Hood — 48 × 48 px
- `ic_great_helm` Great Helm — 48 × 48 px
- `ic_shadow_cowl` Shadow Cowl — 48 × 48 px
- `ic_dragon_helm` Dragon Helm — 48 × 48 px
- `ic_sky_crown` Sky Crown — 48 × 48 px
- `ic_arcane_circlet` Arcane Circlet — 48 × 48 px
- `ic_leather_pants` Leather Pants — 48 × 48 px
- `ic_chain_leggings` Chain Leggings — 48 × 48 px
- `ic_swift_leggings` Swift Leggings — 48 × 48 px
- `ic_plate_leggings` Plate Leggings — 48 × 48 px
- `ic_swift_plate` Swift Plate Legs — 48 × 48 px
- `ic_dragon_leggings` Dragon Leggings — 48 × 48 px
- `ic_battle_leggings` Battle Leggings — 48 × 48 px
- `ic_shadow_leggings` Shadow Leggings — 48 × 48 px
- `ic_arcane_leggings` Arcane Leggings — 48 × 48 px
- `ic_sky_leggings` Sky Leggings — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 20 separate game icons — Item icons — headgear and leg armor.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 20 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first):
1. Cloth Cap — headgear on its own.
2. Leather Cap — headgear on its own, brown leather.
3. Iron Helm — headgear on its own, grey iron.
4. Battle Helm — headgear on its own, heavy steel with red trim.
5. Mage Hood — headgear on its own, blue cloth with gold stars.
6. Great Helm — headgear on its own.
7. Shadow Cowl — headgear on its own, violet-black with wisps of shadow.
8. Dragon Helm — headgear on its own, red dragon scale with gold trim.
9. Sky Crown — headgear on its own, white and gold with a pale-blue glow.
10. Arcane Circlet — headgear on its own, deep violet with glowing cyan runes.
11. Leather Pants — leg armor on its own, brown leather.
12. Chain Leggings — leg armor on its own, steel chain links.
13. Swift Leggings — leg armor on its own, light, with small wing shapes.
14. Plate Leggings — leg armor on its own, polished steel plate.
15. Swift Plate Legs — leg armor on its own, polished steel plate.
16. Dragon Leggings — leg armor on its own, red dragon scale with gold trim.
17. Battle Leggings — leg armor on its own, heavy steel with red trim.
18. Shadow Leggings — leg armor on its own, violet-black with wisps of shadow.
19. Arcane Leggings — leg armor on its own, deep violet with glowing cyan runes.
20. Sky Leggings — leg armor on its own, white and gold with a pale-blue glow.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_handsfeet

Item icons — gauntlets and boots · wave 35 · 20 items, 5 × 4 · 1536x1024

- `ic_leather_gauntlets` Leather Gauntlets — 48 × 48 px
- `ic_iron_gauntlets` Iron Gauntlets — 48 × 48 px
- `ic_fire_gauntlets` Fire Gauntlets — 48 × 48 px
- `ic_ice_gauntlets` Ice Gauntlets — 48 × 48 px
- `ic_storm_gauntlets` Storm Gauntlets — 48 × 48 px
- `ic_plate_gauntlets` Plate Gauntlets — 48 × 48 px
- `ic_dragon_gauntlets` Dragon Gauntlets — 48 × 48 px
- `ic_battle_gauntlets` Battle Gauntlets — 48 × 48 px
- `ic_shadow_gauntlets` Shadow Gauntlets — 48 × 48 px
- `ic_arcane_gauntlets` Arcane Gauntlets — 48 × 48 px
- `ic_ragged_boots` Ragged Boots — 48 × 48 px
- `ic_leather_boots` Leather Boots — 48 × 48 px
- `ic_ranger_boots` Ranger Boots — 48 × 48 px
- `ic_iron_boots` Iron Boots — 48 × 48 px
- `ic_chain_boots` Chain Boots — 48 × 48 px
- `ic_swift_boots` Swift Boots — 48 × 48 px
- `ic_knight_boots` Knight Boots — 48 × 48 px
- `ic_wind_walkers` Wind Walkers — 48 × 48 px
- `ic_dragon_boots` Dragon Boots — 48 × 48 px
- `ic_shadow_treads` Shadow Treads — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 20 separate game icons — Item icons — gauntlets and boots.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 20 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first):
1. Leather Gauntlets — pair of gauntlets, brown leather.
2. Iron Gauntlets — pair of gauntlets, grey iron.
3. Fire Gauntlets — pair of gauntlets, glowing orange with small flames.
4. Ice Gauntlets — pair of gauntlets, pale-blue ice.
5. Storm Gauntlets — pair of gauntlets, storm-grey with small lightning arcs.
6. Plate Gauntlets — pair of gauntlets, polished steel plate.
7. Dragon Gauntlets — pair of gauntlets, red dragon scale with gold trim.
8. Battle Gauntlets — pair of gauntlets, heavy steel with red trim.
9. Shadow Gauntlets — pair of gauntlets, violet-black with wisps of shadow.
10. Arcane Gauntlets — pair of gauntlets, deep violet with glowing cyan runes.
11. Ragged Boots — pair of boots.
12. Leather Boots — pair of boots, brown leather.
13. Ranger Boots — pair of boots, forest green.
14. Iron Boots — pair of boots, grey iron.
15. Chain Boots — pair of boots, steel chain links.
16. Swift Boots — pair of boots, light, with small wing shapes.
17. Knight Boots — pair of boots.
18. Wind Walkers — pair of boots.
19. Dragon Boots — pair of boots, red dragon scale with gold trim.
20. Shadow Treads — pair of boots, violet-black with wisps of shadow.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_neckback

Item icons — amulets and cloaks · wave 35 · 22 items, 5 × 5 · 1024x1024

- `ic_bronze_amulet` Bronze Amulet — 48 × 48 px
- `ic_copper_pendant` Copper Pendant — 48 × 48 px
- `ic_jade_amulet` Jade Amulet — 48 × 48 px
- `ic_silver_pendant` Silver Pendant — 48 × 48 px
- `ic_iron_ward` Iron Ward — 48 × 48 px
- `ic_warriors_talis` Warrior Talisman — 48 × 48 px
- `ic_guardians_ward` Guardian Ward — 48 × 48 px
- `ic_sea_pearl_neck` Sea Pearl Necklace — 48 × 48 px
- `ic_arcane_focus` Arcane Focus — 48 × 48 px
- `ic_dragon_amulet` Dragon Amulet — 48 × 48 px
- `ic_celestial_pend` Celestial Pendant — 48 × 48 px
- `ic_wool_cloak` Wool Cloak — 48 × 48 px
- `ic_travel_cloak` Travel Cloak — 48 × 48 px
- `ic_ranger_cloak` Ranger Cloak — 48 × 48 px
- `ic_battle_cape` Battle Cape — 48 × 48 px
- `ic_shadow_cloak` Shadow Cloak — 48 × 48 px
- `ic_arcane_cloak` Arcane Cloak — 48 × 48 px
- `ic_dusk_mantle` Dusk Mantle — 48 × 48 px
- `ic_phoenix_cape` Phoenix Cape — 48 × 48 px
- `ic_captains_coat` Captain Coat — 48 × 48 px
- `ic_dragon_cape` Dragon Cape — 48 × 48 px
- `ic_shadow_mantle` Shadow Mantle — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 22 separate game icons — Item icons — amulets and cloaks.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 22 objects in a grid of 5 columns × 5 rows, evenly spaced, in this order (left to right, top row first); the last 3 cell(s) stay empty:
1. Bronze Amulet — amulet on a chain, bronze.
2. Copper Pendant — amulet on a chain, copper.
3. Jade Amulet — amulet on a chain, green jade.
4. Silver Pendant — amulet on a chain, silver.
5. Iron Ward — amulet on a chain, grey iron.
6. Warrior Talisman — amulet on a chain.
7. Guardian Ward — amulet on a chain.
8. Sea Pearl Necklace — amulet on a chain, sea-green with shells and coral.
9. Arcane Focus — amulet on a chain, deep violet with glowing cyan runes.
10. Dragon Amulet — amulet on a chain, red dragon scale with gold trim.
11. Celestial Pendant — amulet on a chain, white-gold with tiny stars.
12. Wool Cloak — cloak on its own, hanging open.
13. Travel Cloak — cloak on its own, hanging open.
14. Ranger Cloak — cloak on its own, hanging open, forest green.
15. Battle Cape — cloak on its own, hanging open, heavy steel with red trim.
16. Shadow Cloak — cloak on its own, hanging open, violet-black with wisps of shadow.
17. Arcane Cloak — cloak on its own, hanging open, deep violet with glowing cyan runes.
18. Dusk Mantle — cloak on its own, hanging open.
19. Phoenix Cape — cloak on its own, hanging open, fiery red-gold feathers.
20. Captain Coat — cloak on its own, hanging open.
21. Dragon Cape — cloak on its own, hanging open, red dragon scale with gold trim.
22. Shadow Mantle — cloak on its own, hanging open, violet-black with wisps of shadow.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_treasure

Item icons — rings, gems, keys and materials · wave 36 · 24 items, 5 × 5 · 1024x1024

- `ic_ruby_ring` Ruby Ring — 48 × 48 px
- `ic_speed_ring` Speed Ring — 48 × 48 px
- `ic_sapphire_ring` Sapphire Ring — 48 × 48 px
- `ic_power_ring` Power Ring — 48 × 48 px
- `ic_emerald_ring` Emerald Ring — 48 × 48 px
- `ic_warding_ring` Warding Ring — 48 × 48 px
- `ic_dragon_ring` Dragon Ring — 48 × 48 px
- `ic_celestial_ring` Celestial Ring — 48 × 48 px
- `ic_gem_ruby` Ruby — 48 × 48 px
- `ic_gem_sapphire` Sapphire — 48 × 48 px
- `ic_gem_emerald` Emerald — 48 × 48 px
- `ic_pearl` Pearl — 48 × 48 px
- `ic_skystone` Skystone — 48 × 48 px
- `ic_raw_iron` Raw Iron — 48 × 48 px
- `ic_rough_crystal` Rough Crystal — 48 × 48 px
- `ic_dungeon_coin` Dungeon Coin — 48 × 48 px
- `ic_fire_opal` Fire Opal — 48 × 48 px
- `ic_moon_shard` Moon Shard — 48 × 48 px
- `ic_volcano_key_n` Ember Key (N) — 48 × 48 px
- `ic_volcano_key_e` Magma Key (E) — 48 × 48 px
- `ic_volcano_key_s` Obsidian Key (S) — 48 × 48 px
- `ic_volcano_key_w` Ashfire Key (W) — 48 × 48 px
- `ic_wood_log` Wood Log — 48 × 48 px
- `ic_cup_empty` Empty Cup — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 24 separate game icons — Item icons — rings, gems, keys and materials.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 24 objects in a grid of 5 columns × 5 rows, evenly spaced, in this order (left to right, top row first); the last 1 cell(s) stay empty:
1. Ruby Ring — finger ring, with a red ruby.
2. Speed Ring — finger ring.
3. Sapphire Ring — finger ring, with a blue sapphire.
4. Power Ring — finger ring.
5. Emerald Ring — finger ring, with a green emerald.
6. Warding Ring — finger ring.
7. Dragon Ring — finger ring, red dragon scale with gold trim.
8. Celestial Ring — finger ring, white-gold with tiny stars.
9. Ruby — gem or treasure, with a red ruby.
10. Sapphire — gem or treasure, with a blue sapphire.
11. Emerald — gem or treasure, with a green emerald.
12. Pearl — gem or treasure, with a large glowing pearl.
13. Skystone — gem or treasure, white and gold with a pale-blue glow.
14. Raw Iron — gem or treasure, grey iron.
15. Rough Crystal — gem or treasure.
16. Dungeon Coin — gem or treasure.
17. Fire Opal — gem or treasure, glowing orange with small flames.
18. Moon Shard — gem or treasure, a pale glowing crescent shard.
19. Ember Key (N) — ornate key, glowing ember-orange.
20. Magma Key (E) — ornate key, black rock with glowing lava cracks.
21. Obsidian Key (S) — ornate key, glossy black volcanic glass.
22. Ashfire Key (W) — ornate key, glowing orange with small flames.
23. Wood Log — material, plain wood.
24. Empty Cup — item.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_potions

Item icons — potions and tonics · wave 36 · 14 items, 5 × 3 · 1536x1024

- `ic_potion` Health Potion — 48 × 48 px
- `ic_elixir` Elixir — 48 × 48 px
- `ic_potion_a1` Area 1 Potion — 48 × 48 px
- `ic_potion_a2` Area 2 Potion — 48 × 48 px
- `ic_potion_a3` Area 3 Potion — 48 × 48 px
- `ic_potion_a4` Area 4 Potion — 48 × 48 px
- `ic_minor_potion` Minor Potion — 48 × 48 px
- `ic_antidote` Antidote — 48 × 48 px
- `ic_mega_potion` Mega Potion — 48 × 48 px
- `ic_life_flask` Life Flask — 48 × 48 px
- `ic_grand_elixir` Grand Elixir — 48 × 48 px
- `ic_strength_tonic` Strength Tonic — 48 × 48 px
- `ic_speed_draught` Speed Draught — 48 × 48 px
- `ic_defense_brew` Defense Brew — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 14 separate game icons — Item icons — potions and tonics.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 14 objects in a grid of 5 columns × 3 rows, evenly spaced, in this order (left to right, top row first); the last 1 cell(s) stay empty:
1. Health Potion — potion bottle.
2. Elixir — potion bottle.
3. Area 1 Potion — potion bottle.
4. Area 2 Potion — potion bottle.
5. Area 3 Potion — potion bottle.
6. Area 4 Potion — potion bottle.
7. Minor Potion — potion bottle.
8. Antidote — potion bottle.
9. Mega Potion — potion bottle.
10. Life Flask — potion bottle.
11. Grand Elixir — potion bottle.
12. Strength Tonic — potion bottle.
13. Speed Draught — potion bottle.
14. Defense Brew — potion bottle.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_food

Item icons — food and drink · wave 36 · 12 items, 4 × 3 · 1536x1024

- `ic_cup_filled` Filled Cup — 48 × 48 px
- `ic_wild_berries` Wild Berries — 48 × 48 px
- `ic_bread` Bread — 48 × 48 px
- `ic_cheese` Cheese — 48 × 48 px
- `ic_grilled_fish` Grilled Fish — 48 × 48 px
- `ic_mushroom_stew` Mushroom Stew — 48 × 48 px
- `ic_trail_mix` Trail Mix — 48 × 48 px
- `ic_honey` Honey — 48 × 48 px
- `ic_roast_meat` Roast Meat — 48 × 48 px
- `ic_dungeon_ration` Dungeon Ration — 48 × 48 px
- `ic_feast_platter` Grand Feast — 48 × 48 px
- `ic_dragon_steak` Dragon Steak — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 12 separate game icons — Item icons — food and drink.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Filled Cup — food.
2. Wild Berries — food.
3. Bread — food.
4. Cheese — food.
5. Grilled Fish — food.
6. Mushroom Stew — food.
7. Trail Mix — food.
8. Honey — food.
9. Roast Meat — food.
10. Dungeon Ration — food.
11. Grand Feast — food.
12. Dragon Steak — food, red dragon scale with gold trim.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_spells

Spell emblems (shown on the spell slot and in the tome) · wave 36 · 16 items, 4 × 4 · 1024x1024

- `ic_frost_bolt_tome` Frost Bolt — 48 × 48 px
- `ic_sky_storm_tome` Arcane Burst — 48 × 48 px
- `ic_fireball_tome` Fireball — 48 × 48 px
- `ic_thorn_tome` Thorn Snare — 48 × 48 px
- `ic_arc_lightning` Lightning Chain — 48 × 48 px
- `ic_ice_storm_tome` Ice Shards — 48 × 48 px
- `ic_thunder_storm` Poison Mist — 48 × 48 px
- `ic_tidal_tome` Tidal Wave — 48 × 48 px
- `ic_flame_wave` Flame Nova — 48 × 48 px
- `ic_lightning_bolt` Void Orb — 48 × 48 px
- `ic_blizzard_tome` Thunder Step — 48 × 48 px
- `ic_spikes_tome` Stone Spikes — 48 × 48 px
- `ic_frost_storm_tome` Blizzard — 48 × 48 px
- `ic_void_blast` Void Rift — 48 × 48 px
- `ic_drain_tome` Spirit Drain — 48 × 48 px
- `ic_inferno_tome` Starfall — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 16 separate game icons — Spell emblems (shown on the spell slot and in the tome).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 16 objects in a grid of 4 columns × 4 rows, evenly spaced, in this order (left to right, top row first):
1. Frost Bolt — spell emblem: one bold symbol that shows "Frost Bolt" — icy pale blue with frost crystals (Fast bolt that slows what it hits).
2. Arcane Burst — spell emblem: one bold symbol that shows "Arcane Burst" — storm-grey with small lightning arcs (Rapid 3-shot burst of magic bolts).
3. Fireball — spell emblem: one bold symbol that shows "Fireball" — glowing orange with small flames (Explodes on impact — area damage).
4. Thorn Snare — spell emblem: one bold symbol that shows "Thorn Snare" — green thorny vines (A lash of thorns that roots what it hits in place).
5. Lightning Chain — spell emblem: one bold symbol that shows "Lightning Chain" — a bright forked lightning bolt (Bolt bounces between up to 3 enemies).
6. Ice Shards — spell emblem: one bold symbol that shows "Ice Shards" — pale-blue ice (Fan of 3 ice shards that slow).
7. Poison Mist — spell emblem: one bold symbol that shows "Poison Mist" — crackling with yellow-white lightning (Lingering toxic cloud — poisons enemies for 4s).
8. Tidal Wave — spell emblem: one bold symbol that shows "Tidal Wave" — a curling blue wave (A wide wave that rolls through enemies and knocks them back).
9. Flame Nova — spell emblem: one bold symbol that shows "Flame Nova" — wreathed in orange flame (Radial fire burst around you — hits everything nearby).
10. Void Orb — spell emblem: one bold symbol that shows "Void Orb" — a bright forked lightning bolt (Slow heavy orb that passes through all enemies).
11. Thunder Step — spell emblem: one bold symbol that shows "Thunder Step" — a swirl of snow and ice (Teleport forward; lightning stuns everything where you stood).
12. Stone Spikes — spell emblem: one bold symbol that shows "Stone Spikes" — grey jagged stone spikes (Three lines of earth spikes that stun).
13. Blizzard — spell emblem: one bold symbol that shows "Blizzard" — icy pale blue with frost crystals (A blizzard where you aim: slows and freezes everything inside).
14. Void Rift — spell emblem: one bold symbol that shows "Void Rift" — a violet-black sphere of nothing (A lance of void that tears through every enemy in a line).
15. Spirit Drain — spell emblem: one bold symbol that shows "Spirit Drain" — a pale ghostly wisp with a red thread (Two spirit bolts that heal you for part of the damage).
16. Starfall — spell emblem: one bold symbol that shows "Starfall" — burning deep red-orange (Five stars fall around where you aim).
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_skills

Skill emblems (special attacks) · wave 36 · 12 items, 4 × 3 · 1536x1024

- `ic_sp_sprint` Sprint — 48 × 48 px
- `ic_sp_roll` Roll — 48 × 48 px
- `ic_sp_blink` Blink — 48 × 48 px
- `ic_sp_war_stomp` War Stomp — 48 × 48 px
- `ic_sp_whirlwind` Whirlwind — 48 × 48 px
- `ic_sp_smokebomb` Smoke Bomb — 48 × 48 px
- `ic_sp_shieldbash` Shield Bash — 48 × 48 px
- `ic_sp_berserker` Berserker — 48 × 48 px
- `ic_sp_secondwind` Second Wind — 48 × 48 px
- `ic_sp_phantom` Phantom Veil — 48 × 48 px
- `ic_sp_timeslow` Time Slow — 48 × 48 px
- `ic_sp_meteor` Meteor Strike — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_ui_1

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 12 separate game icons — Skill emblems (special attacks).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Sprint — skill emblem: one bold symbol that shows "Sprint" (Z: 2× speed for 3 seconds (no cost)).
2. Roll — skill emblem: one bold symbol that shows "Roll" (Z: Dash 3 tiles + 0.6s invincibility).
3. Blink — skill emblem: one bold symbol that shows "Blink" (Z: Teleport 5 tiles forward through walls).
4. War Stomp — skill emblem: one bold symbol that shows "War Stomp" (Z: Shockwave stuns + damages all nearby enemies).
5. Whirlwind — skill emblem: one bold symbol that shows "Whirlwind" (Z: Spin-attack all adjacent enemies, push them back).
6. Smoke Bomb — skill emblem: one bold symbol that shows "Smoke Bomb" (Z: Drop smoke cloud — enemies lose aggro for 4s).
7. Shield Bash — skill emblem: one bold symbol that shows "Shield Bash" (Z: Charge + stun first enemy (requires shield)).
8. Berserker — skill emblem: one bold symbol that shows "Berserker" (Z: 2× ATK + 1.5× speed, −50% DEF for 5s).
9. Second Wind — skill emblem: one bold symbol that shows "Second Wind" (Z: Instantly restore 30% max HP).
10. Phantom Veil — skill emblem: one bold symbol that shows "Phantom Veil" (Z: Phase through enemies + invulnerable for 3s).
11. Time Slow — skill emblem: one bold symbol that shows "Time Slow" (Z: Enemies near you move and attack at 30% speed for 4s).
12. Meteor Strike — skill emblem: one bold symbol that shows "Meteor Strike" (Z: Call a meteor onto the nearest enemy — big area damage + burn).
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```
