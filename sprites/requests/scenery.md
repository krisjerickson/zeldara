# Scenery — 202 sheets, 1796 objects and textures (13 sheets in the pilot)

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
| 37 | Icons: round 37 — axes, crossbows, staffs, gems, the Sovereign set | 3 | 66 |
| 38 | Edge pieces: shores, cliffs, snow, lava (round 38) | 2 | 24 |
| 42 | Edge pieces: logs, features and small creatures (round 42) | 4 | 48 |
| 43 | Animation frames: creatures and swaying plants (round 43) | 7 | 84 |
| 44 | Sleeping in bed, and rugs that fit (round 44) | 2 | 24 |
| 45 | Pilot: adventure-site rooms painted as one picture (round 44) | 3 | 3 |
| 46 | Icons: round 45 — shadow swords, two-element master-works, rare forging items | 1 | 19 |
| 47 | Round 45: sky-port flights (backdrops, galleons, wingman, power-ups) and the adventure sites' big set-pieces | 5 | 32 |
| 48 | Icons: round 45 — the bows and warbows; Tome pictures of regions, arenas and fairy-quest treasures | 5 | 99 |
| 49 | Round 46: the hero asleep and waking in the home bed, at the bed's own size | 1 | 16 |
| 50 | Round 47: what fills the space round the adventure sites (rock, seas, fog, sky, night sky, their creatures), smoother butterflies and dragonflies, painted area effects | 9 | 86 |
| 51 | undefined | 2 | 16 |
| 52 | undefined | 1 | 5 |
| 53 | undefined | 4 | 30 |
| 54 | undefined | 7 | 56 |
| 55 | undefined | 11 | 88 |
| 56 | undefined | 10 | 76 |
| 57 | undefined | 2 | 8 |
| 58 | undefined | 4 | 28 |
| 59 | undefined | 6 | 24 |
| 60 | undefined | 3 | 15 |
| 61 | Asgard and the Bifröst — options | 12 | 30 |
| 62 | Round 60 — moving hearths, the Honour guard, sheep, the apothecary | 8 | 34 |

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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Village buildings 1 — the busy ones.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Village buildings 2 — the craft shops.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Village houses — the homes between the shops.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Village — craftsmen's buildings and the lake.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Village — tall landmarks.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Village — town wall pieces (they are placed side by side).
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Village props 1 — the square.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Village props 2 — carts and work.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Village props 3 — fences, banners, gardens.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Village props 4 — the waterfront.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Interior furniture 1 — tavern and home.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Interior furniture 2 — storage.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Interior furniture 3 — forge and armory.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Interior furniture 4 — tailor, jeweler, apothecary.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Interior furniture 5 — guild, bakery, stables and the rest.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 20 separate pieces of scenery — Interior small things — on tables and shelves.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 20 separate pieces of scenery — Interior wall decorations and rugs.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a single piece of scenery — The Runestone Green — the great rune circle of the village.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 4 separate pieces of scenery — Rune circles on the ground.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Standing stones and waystones.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Fairy henges and small rune things.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Dungeon entrances — a cave mouth for each realm.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Towers — one for each realm.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Mage towers 1 — twisting spires, each with a floating orb.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Mage towers 2.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Mage towers 3 and special sites.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Castle gates 1 — a gatehouse for each island castle, with its emblem over the gate.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Castle gates 2.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Camps, harbors and skyports.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Trees 1 — the Grasslands and the village.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Trees 2 — the Wetlands.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Trees 3 — the Highlands.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Trees 4 — the Ashlands.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Plants 1 — bushes, flowers and grass.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Plants 2 — water and the far realms.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Plants 3 — crops and fields.
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

## sc_edge_1

Edge pieces 1 — shores and beaches · wave 38 · 12 items, 4 × 3 · 1536x1024

- `ed_tuft_a` Grass tuft — 36 × 30 px
- `ed_tuft_b` Long grass clump — 52 × 36 px
- `ed_tuft_dry` Dry grass tuft — 36 × 30 px
- `ed_reeds` Reed clump — 40 × 64 px
- `ed_cattails` Cattails — 44 × 72 px
- `ed_lily` Lily pads — 52 × 30 px
- `ed_pebbles` Shore pebbles — 60 × 24 px
- `ed_shells` Shells — 48 × 24 px
- `ed_driftwood` Driftwood — 72 × 30 px
- `ed_shore_rock` Shore rock — 56 × 40 px
- `ed_foam` Foam curl — 64 × 20 px
- `ed_bank` Earth bank — 96 × 36 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Edge pieces 1 — shores and beaches.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Grass tuft — a small tuft of green grass blades leaning to one side (about 0.5× the hero's height).
2. Long grass clump — a wide clump of long green grass that hangs forward over an edge (about 0.6× the hero's height).
3. Dry grass tuft — a tuft of pale yellow-green highland grass (about 0.5× the hero's height).
4. Reed clump — a clump of tall green reeds standing in water, a few bent (about as tall as the hero).
5. Cattails — five cattails with brown heads standing in water (about as tall as the hero).
6. Lily pads — three green lily pads with one pink flower, seen from above (about 0.5× the hero's height).
7. Shore pebbles — a loose line of small wet grey and tan pebbles, seen from above (about 0.4× the hero's height).
8. Shells — two sea shells and a small orange starfish on sand, seen from above (about 0.4× the hero's height).
9. Driftwood — a pale weathered branch of driftwood lying flat (about 0.5× the hero's height).
10. Shore rock — a low dark wet rock with a thin white foam line round its base (about 0.6× the hero's height).
11. Foam curl — a short curved line of white sea foam, seen from above, soft ends (a small item, under half the hero's height).
12. Earth bank — a short strip of dark crumbly earth bank seen from the front, with grass hanging over its top edge and the two ends fading out (about 0.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_edge_2

Edge pieces 2 — cliffs, snow, mud and lava · wave 38 · 12 items, 4 × 3 · 1536x1024

- `ed_talus_a` Rubble — 72 × 38 px
- `ed_talus_b` Scree fan — 100 × 44 px
- `ed_foot_boulder` Foot boulder — 64 × 54 px
- `ed_cliff_grass` Cliff-top grass — 96 × 28 px
- `ed_roots` Roots — 72 × 38 px
- `ed_mud_clods` Mud clods — 56 × 26 px
- `ed_snow_drift` Snow drift — 72 × 28 px
- `ed_snow_lip` Snow lip — 96 × 32 px
- `ed_ice_shards` Ice shards — 48 × 40 px
- `ed_crust_shards` Crust shards — 64 × 30 px
- `ed_ember_rocks` Ember rocks — 50 × 34 px
- `ed_ash_heap` Ash heap — 56 × 26 px

Attach: style_hero, style_centaur, sc_edge_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Edge pieces 2 — cliffs, snow, mud and lava.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Rubble — a small heap of broken grey rock at the foot of a cliff (about 0.6× the hero's height).
2. Scree fan — a wide low fan of loose stones spilling forward (about 0.7× the hero's height).
3. Foot boulder — a large angular boulder with small stones round it (about as tall as the hero).
4. Cliff-top grass — a strip of grass and small roots hanging over a rock edge, seen from the front, ends fading (about 0.4× the hero's height).
5. Roots — tree roots spilling over an earth bank, seen from the front (about 0.6× the hero's height).
6. Mud clods — a few dark wet clods of mud with a small puddle, seen from above (about 0.4× the hero's height).
7. Snow drift — a low soft drift of white snow with a blue shadow (about 0.4× the hero's height).
8. Snow lip — a strip of snow hanging over a rock edge with small icicles, seen from the front, ends fading (about 0.5× the hero's height).
9. Ice shards — a cluster of small pale-blue ice shards (about 0.6× the hero's height).
10. Crust shards — broken plates of black cooled lava crust, seen from above (about 0.5× the hero's height).
11. Ember rocks — three black rocks with glowing orange cracks (about 0.5× the hero's height).
12. Ash heap — a low heap of grey ash with a few embers (about 0.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_edge_3

Edge pieces 3 — logs, stones and the water's edge · wave 42 · 12 items, 4 × 3 · 1536x1024

- `ed_log_fallen` Fallen log — 96 × 40 px
- `ed_log_mossy` Mossy log — 96 × 40 px
- `ed_log_rotting` Rotting log — 96 × 40 px
- `ed_rock_mossy` Mossy rock — 52 × 42 px
- `ed_stepping_stones` Stepping stones — 84 × 36 px
- `ed_wildflowers` Wildflowers — 44 × 34 px
- `ed_iris` Water iris — 44 × 62 px
- `ed_toadstools` Toadstools — 44 × 38 px
- `ed_duckweed` Duckweed patch — 64 × 30 px
- `ed_wrack` Seaweed wrack — 96 × 28 px
- `ed_dune_grass` Dune grass — 50 × 52 px
- `ed_tide_pool` Tide pool — 72 × 44 px

Attach: style_hero, style_centaur, sc_edge_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Edge pieces 3 — logs, stones and the water's edge.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Fallen log — a fallen tree trunk lying on the ground at a slight angle, rough bark, one broken end and one cut end showing rings (about 0.6× the hero's height).
2. Mossy log — an old fallen log half covered in green moss with a small fern growing from it (about 0.6× the hero's height).
3. Rotting log — a dark rotting log sinking into mud, soft split bark, two small mushrooms and a little water round it (about 0.6× the hero's height).
4. Mossy rock — a rounded grey rock with a cap of green moss and a few grass blades at its foot (about 0.7× the hero's height).
5. Stepping stones — three flat grey stepping stones in a short line, seen from above, a thin ring of water round each (about 0.6× the hero's height).
6. Wildflowers — a small clump of wild meadow flowers: white daisies, yellow buttercups and pink clover on green stems (about 0.5× the hero's height).
7. Water iris — a clump of tall blue-violet water irises with sword-shaped leaves at a pond edge (about as tall as the hero).
8. Toadstools — a cluster of three red-capped white-spotted toadstools and two small brown mushrooms (about 0.6× the hero's height).
9. Duckweed patch — a loose irregular patch of tiny bright green duckweed floating on water, seen from above (about 0.5× the hero's height).
10. Seaweed wrack — a short wavy line of dark green and brown seaweed with a bit of driftwood and a small shell, washed up, seen from above (about 0.4× the hero's height).
11. Dune grass — a tall clump of pale silvery-green marram dune grass bending in the wind on a little sand mound (about as tall as the hero).
12. Tide pool — a small rock pool among dark wet rocks with clear water, an orange starfish and a sea anemone, seen from above (about 0.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_edge_4

Edge pieces 4 — highlands, snow and fire · wave 42 · 12 items, 4 × 3 · 1536x1024

- `ed_ivy` Hanging ivy — 64 × 60 px
- `ed_moss_patch` Moss patch — 52 × 30 px
- `ed_alpine_flowers` Mountain flowers — 44 × 32 px
- `ed_heather` Heather — 52 × 34 px
- `ed_icicles` Icicles — 80 × 44 px
- `ed_snow_pine` Snowy sapling — 40 × 64 px
- `ed_frozen_puddle` Frozen puddle — 60 × 32 px
- `ed_snow_rock` Rock in snow — 52 × 40 px
- `ed_obsidian` Obsidian shards — 52 × 44 px
- `ed_sulphur` Sulphur crystals — 48 × 44 px
- `ed_basalt` Basalt columns — 80 × 56 px
- `ed_steam_vent` Steam vent — 52 × 60 px

Attach: style_hero, style_centaur, sc_edge_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Edge pieces 4 — highlands, snow and fire.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Hanging ivy — a curtain of dark green ivy hanging down over a rock face, seen from the front, straight top edge, trailing ends (about as tall as the hero).
2. Moss patch — a soft cushion of bright green moss with tiny white flowers on grey stone (about 0.5× the hero's height).
3. Mountain flowers — a small clump of blue gentians and white edelweiss among short tough grass and pebbles (about 0.5× the hero's height).
4. Heather — a low rounded bush of purple heather (about 0.5× the hero's height).
5. Icicles — a row of pale blue icicles of different lengths hanging from a strip of snowy rock edge, seen from the front (about 0.7× the hero's height).
6. Snowy sapling — a small young pine tree with snow on its branches (about as tall as the hero).
7. Frozen puddle — a small frozen puddle with pale blue cracked ice and frosted edges, seen from above (about 0.5× the hero's height).
8. Rock in snow — a grey rock half buried in snow with a cap of snow (about 0.6× the hero's height).
9. Obsidian shards — a cluster of glossy black obsidian shards with sharp edges and violet glints (about 0.7× the hero's height).
10. Sulphur crystals — a cluster of bright yellow sulphur crystals on grey rock with a thin wisp of fume (about 0.7× the hero's height).
11. Basalt columns — the tops of five six-sided dark basalt columns of different heights, seen from a little above, faint orange glow in the cracks between them (about as tall as the hero).
12. Steam vent — a cracked crust vent glowing orange inside with a puff of white steam rising from it (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_edge_5

Edge pieces 5 — small creatures and drifting things · wave 42 · 12 items, 4 × 3 · 1536x1024

- `ed_crab` Crab — 28 × 22 px
- `ed_dragonfly` Dragonfly — 32 × 28 px
- `ed_fish` Leaping fish — 36 × 24 px
- `ed_frog` Frog — 26 × 22 px
- `ed_gull` Gull — 48 × 24 px
- `ed_crow` Crow — 40 × 22 px
- `ed_butterfly` Butterfly — 26 × 22 px
- `ed_wisp` Will-o'-wisp — 30 × 34 px
- `ed_firefly` Firefly — 18 × 18 px
- `ed_leaf_autumn` Autumn leaf — 18 × 18 px
- `ed_leaf_red` Red leaf — 18 × 18 px
- `ed_leaf_green` Green leaf — 16 × 16 px

Attach: style_hero, style_centaur, sc_edge_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Edge pieces 5 — small creatures and drifting things.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Crab — a small red beach crab seen from above, claws raised (a small item, under half the hero's height).
2. Dragonfly — a blue dragonfly seen from above with four clear wings spread (about 0.4× the hero's height).
3. Leaping fish — a small silver-blue fish leaping in an arc, seen from the side (about 0.4× the hero's height).
4. Frog — a small green frog sitting, seen from slightly above (a small item, under half the hero's height).
5. Gull — a white seagull gliding with wings spread wide, seen from above (about 0.4× the hero's height).
6. Crow — a black crow flying with wings spread, seen from above (a small item, under half the hero's height).
7. Butterfly — an orange and black butterfly with wings spread, seen from above (a small item, under half the hero's height).
8. Will-o'-wisp — a small pale blue-green glowing wisp of light with a soft trailing tail (about 0.5× the hero's height).
9. Firefly — a tiny firefly with a soft yellow-green glowing tail (a small item, under half the hero's height).
10. Autumn leaf — a single orange autumn maple leaf (a small item, under half the hero's height).
11. Red leaf — a single deep red oak leaf (a small item, under half the hero's height).
12. Green leaf — a single small green birch leaf (a small item, under half the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_edge_6

Edge pieces 6 — more ground and water details · wave 42 · 12 items, 4 × 3 · 1536x1024

- `ed_lava_plate` Floating crust — 56 × 36 px
- `ed_lava_bubble` Lava bubble — 36 × 30 px
- `ed_cracked_mud` Cracked mud — 64 × 36 px
- `ed_sand_ripples` Sand ripples — 72 × 36 px
- `ed_snow_ripples` Snow ripples — 72 × 36 px
- `ed_puddle` Puddle — 56 × 30 px
- `ed_reeds_dry` Dry reeds — 40 × 56 px
- `ed_clover` Clover patch — 40 × 26 px
- `ed_fern` Fern — 44 × 40 px
- `ed_bramble` Bramble — 52 × 36 px
- `ed_lichen_rock` Lichen rock — 48 × 32 px
- `ed_ice_floe` Ice floe — 60 × 34 px

Attach: style_hero, style_centaur, sc_edge_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Edge pieces 6 — more ground and water details.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Floating crust — a floating plate of dark cooling lava crust with glowing orange edges, seen from above (about 0.6× the hero's height).
2. Lava bubble — a swelling bubble of bright molten lava about to burst, seen from a little above (about 0.5× the hero's height).
3. Cracked mud — a patch of dry cracked mud plates, seen from above (about 0.6× the hero's height).
4. Sand ripples — a patch of wind ripples in pale sand with a few tiny shells, seen from above (about 0.6× the hero's height).
5. Snow ripples — a patch of wind-blown ridges in white snow with blue shadows, seen from above (about 0.6× the hero's height).
6. Puddle — a small rain puddle reflecting the sky with a muddy rim, seen from above (about 0.5× the hero's height).
7. Dry reeds — a clump of pale brown winter reeds with frost on the tips (about as tall as the hero).
8. Clover patch — a low patch of clover with two white clover flowers (about 0.4× the hero's height).
9. Fern — a small green fern with arching fronds (about 0.6× the hero's height).
10. Bramble — a low thorny bramble bush with a few dark berries (about 0.6× the hero's height).
11. Lichen rock — a flat grey rock speckled with orange and pale green lichen (about 0.5× the hero's height).
12. Ice floe — a small flat white ice floe floating on dark water with a thin blue edge, seen from above (about 0.5× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_anim_1

Animation frames 1 — crab, frog and leaping fish · wave 43 · 12 items, 4 × 3 · 1536x1024

- `an_crab_1` Crab — frame 1 — 28 × 22 px
- `an_crab_2` Crab — frame 2 — 28 × 22 px
- `an_crab_3` Crab — frame 3 — 28 × 22 px
- `an_crab_4` Crab — frame 4 — 28 × 22 px
- `an_frog_1` Frog — frame 1 — 26 × 22 px
- `an_frog_2` Frog — frame 2 — 26 × 22 px
- `an_frog_3` Frog — frame 3 — 26 × 22 px
- `an_frog_4` Frog — frame 4 — 26 × 22 px
- `an_fish_1` Leaping fish — frame 1 — 36 × 24 px
- `an_fish_2` Leaping fish — frame 2 — 36 × 24 px
- `an_fish_3` Leaping fish — frame 3 — 36 × 24 px
- `an_fish_4` Leaping fish — frame 4 — 36 × 24 px

Attach: style_hero, style_centaur, sc_edge_5

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames 1 — crab, frog and leaping fish.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 3 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Crab, scuttling sideways (a small item, under half the hero's height): (1) legs on its left side stretched forward, both claws raised; (2) legs tucked together, claws half lowered; (3) legs on its right side stretched forward, both claws raised; (4) legs tucked together, claws snapping open.
Row 2 — Frog, sitting, croaking and hopping (a small item, under half the hero's height): (1) sitting upright; (2) sitting, its throat puffed out in a pale round bubble; (3) crouched low, ready to jump; (4) in mid-leap, back legs stretched out straight behind, front legs reaching forward.
Row 3 — Leaping fish, one leap out of the water and back in (about 0.4× the hero's height): (1) bursting out nose-up with a few water drops; (2) at the top of its leap, body curved in an arc; (3) level, tail flicking; (4) diving back in nose-down.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_anim_2

Animation frames 2 — gull, crow and dragonfly in flight · wave 43 · 12 items, 4 × 3 · 1536x1024

- `an_gull_1` Gull — frame 1 — 48 × 24 px
- `an_gull_2` Gull — frame 2 — 48 × 24 px
- `an_gull_3` Gull — frame 3 — 48 × 24 px
- `an_gull_4` Gull — frame 4 — 48 × 24 px
- `an_crow_1` Crow — frame 1 — 40 × 22 px
- `an_crow_2` Crow — frame 2 — 40 × 22 px
- `an_crow_3` Crow — frame 3 — 40 × 22 px
- `an_crow_4` Crow — frame 4 — 40 × 22 px
- `an_dragonfly_1` Dragonfly — frame 1 — 32 × 28 px
- `an_dragonfly_2` Dragonfly — frame 2 — 32 × 28 px
- `an_dragonfly_3` Dragonfly — frame 3 — 32 × 28 px
- `an_dragonfly_4` Dragonfly — frame 4 — 32 × 28 px

Attach: style_hero, style_centaur, sc_edge_5

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames 2 — gull, crow and dragonfly in flight.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 3 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Gull, flapping its wings (about 0.4× the hero's height): (1) wings spread level, gliding; (2) wings raised high above its back in a V; (3) wings level again; (4) wings pushed down below its body, tips curled.
Row 2 — Crow, flapping its wings (a small item, under half the hero's height): (1) wings spread level, gliding; (2) wings raised high above its back; (3) wings level again; (4) wings pushed down below its body.
Row 3 — Dragonfly, beating its wings (about 0.4× the hero's height): (1) all four wings spread flat; (2) the four wings swept forward and blurred; (3) all four wings spread flat again; (4) the four wings swept back and blurred.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_anim_3

Animation frames 3 — butterfly, will-o'-wisp and firefly · wave 43 · 12 items, 4 × 3 · 1536x1024

- `an_butterfly_1` Butterfly — frame 1 — 26 × 22 px
- `an_butterfly_2` Butterfly — frame 2 — 26 × 22 px
- `an_butterfly_3` Butterfly — frame 3 — 26 × 22 px
- `an_butterfly_4` Butterfly — frame 4 — 26 × 22 px
- `an_wisp_1` Will-o'-wisp — frame 1 — 30 × 34 px
- `an_wisp_2` Will-o'-wisp — frame 2 — 30 × 34 px
- `an_wisp_3` Will-o'-wisp — frame 3 — 30 × 34 px
- `an_wisp_4` Will-o'-wisp — frame 4 — 30 × 34 px
- `an_firefly_1` Firefly — frame 1 — 18 × 18 px
- `an_firefly_2` Firefly — frame 2 — 18 × 18 px
- `an_firefly_3` Firefly — frame 3 — 18 × 18 px
- `an_firefly_4` Firefly — frame 4 — 18 × 18 px

Attach: style_hero, style_centaur, sc_edge_5

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames 3 — butterfly, will-o'-wisp and firefly.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 3 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Butterfly, fluttering (a small item, under half the hero's height): (1) wings fully open; (2) wings half closed, tilted up; (3) wings closed together, seen as a thin upright shape; (4) wings half open.
Row 2 — Will-o'-wisp, flickering (about 0.5× the hero's height): (1) round glow, tail curling to the left; (2) taller and thinner, tail straight down; (3) squashed a little wider, tail curling to the right; (4) smaller and brighter, tail short.
Row 3 — Firefly, blinking its light (a small item, under half the hero's height): (1) tail light dim, wings up; (2) tail glowing softly, wings down; (3) tail glowing bright with a soft yellow-green halo, wings up; (4) tail glowing softly, wings down.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_anim_4

Animation frames 4 — tumbling leaf, lava bubble and steam vent · wave 43 · 12 items, 4 × 3 · 1536x1024

- `an_leaf_1` Autumn leaf — frame 1 — 18 × 18 px
- `an_leaf_2` Autumn leaf — frame 2 — 18 × 18 px
- `an_leaf_3` Autumn leaf — frame 3 — 18 × 18 px
- `an_leaf_4` Autumn leaf — frame 4 — 18 × 18 px
- `an_lava_bubble_1` Lava bubble — frame 1 — 36 × 30 px
- `an_lava_bubble_2` Lava bubble — frame 2 — 36 × 30 px
- `an_lava_bubble_3` Lava bubble — frame 3 — 36 × 30 px
- `an_lava_bubble_4` Lava bubble — frame 4 — 36 × 30 px
- `an_steam_vent_1` Steam vent — frame 1 — 52 × 60 px
- `an_steam_vent_2` Steam vent — frame 2 — 52 × 60 px
- `an_steam_vent_3` Steam vent — frame 3 — 52 × 60 px
- `an_steam_vent_4` Steam vent — frame 4 — 52 × 60 px

Attach: style_hero, style_centaur, sc_edge_5, sc_edge_4, sc_edge_6

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames 4 — tumbling leaf, lava bubble and steam vent.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 3 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Autumn leaf, tumbling over as it falls (a small item, under half the hero's height): (1) lying flat, face up; (2) tilted, seen at a slant so it looks narrower; (3) edge-on, a thin sliver; (4) tilted the other way, showing its paler underside.
Row 2 — Lava bubble, swelling and bursting (about 0.5× the hero's height): (1) a low glowing dome on the molten surface; (2) swollen into a round bubble with a bright thin skin; (3) bursting into splashes of molten drops; (4) a collapsing ring of glowing ripples.
Row 3 — Steam vent, puffing steam (the vent itself does not move) (about as tall as the hero): (1) the vent with only a thin wisp of steam; (2) a small white puff rising from it; (3) a big billowing puff of steam above it; (4) the puff thinning and drifting up and away.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_anim_5

Animation frames 5 — reeds, cattails, irises and dry reeds swaying · wave 43 · 12 items, 3 × 4 · 1024x1536

- `an_reeds_1` Reed clump — frame 1 — 40 × 64 px
- `an_reeds_2` Reed clump — frame 2 — 40 × 64 px
- `an_reeds_3` Reed clump — frame 3 — 40 × 64 px
- `an_cattails_1` Cattails — frame 1 — 44 × 72 px
- `an_cattails_2` Cattails — frame 2 — 44 × 72 px
- `an_cattails_3` Cattails — frame 3 — 44 × 72 px
- `an_iris_1` Water iris — frame 1 — 44 × 62 px
- `an_iris_2` Water iris — frame 2 — 44 × 62 px
- `an_iris_3` Water iris — frame 3 — 44 × 62 px
- `an_reeds_dry_1` Dry reeds — frame 1 — 40 × 56 px
- `an_reeds_dry_2` Dry reeds — frame 2 — 40 × 56 px
- `an_reeds_dry_3` Dry reeds — frame 3 — 40 × 56 px

Attach: style_hero, style_centaur, sc_edge_1, sc_edge_3, sc_edge_6

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames 5 — reeds, cattails, irises and dry reeds swaying.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 3 columns × 4 rows, evenly spaced. Each ROW is ONE subject drawn 3 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell (the base of each plant at the same height and the same place in every cell); only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Reed clump, swaying in the wind (about as tall as the hero): (1) leaning to the left in the wind — only the upper part bends, the base stays exactly in place; (2) standing upright at rest; (3) leaning to the right in the wind — only the upper part bends, the base stays exactly in place.
Row 2 — Cattails, swaying in the wind (about as tall as the hero): (1) leaning to the left in the wind — only the upper part bends, the base stays exactly in place; (2) standing upright at rest; (3) leaning to the right in the wind — only the upper part bends, the base stays exactly in place.
Row 3 — Water iris, swaying in the wind (about as tall as the hero): (1) leaning to the left in the wind — only the upper part bends, the base stays exactly in place; (2) standing upright at rest; (3) leaning to the right in the wind — only the upper part bends, the base stays exactly in place.
Row 4 — Dry reeds, swaying in the wind (about as tall as the hero): (1) leaning to the left in the wind — only the upper part bends, the base stays exactly in place; (2) standing upright at rest; (3) leaning to the right in the wind — only the upper part bends, the base stays exactly in place.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_anim_6

Animation frames 6 — dune grass and grass tufts swaying · wave 43 · 12 items, 3 × 4 · 1024x1536

- `an_dune_grass_1` Dune grass — frame 1 — 50 × 52 px
- `an_dune_grass_2` Dune grass — frame 2 — 50 × 52 px
- `an_dune_grass_3` Dune grass — frame 3 — 50 × 52 px
- `an_tuft_a_1` Grass tuft — frame 1 — 36 × 30 px
- `an_tuft_a_2` Grass tuft — frame 2 — 36 × 30 px
- `an_tuft_a_3` Grass tuft — frame 3 — 36 × 30 px
- `an_tuft_b_1` Long grass clump — frame 1 — 52 × 36 px
- `an_tuft_b_2` Long grass clump — frame 2 — 52 × 36 px
- `an_tuft_b_3` Long grass clump — frame 3 — 52 × 36 px
- `an_tuft_dry_1` Dry grass tuft — frame 1 — 36 × 30 px
- `an_tuft_dry_2` Dry grass tuft — frame 2 — 36 × 30 px
- `an_tuft_dry_3` Dry grass tuft — frame 3 — 36 × 30 px

Attach: style_hero, style_centaur, sc_edge_1, sc_edge_3

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames 6 — dune grass and grass tufts swaying.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 3 columns × 4 rows, evenly spaced. Each ROW is ONE subject drawn 3 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell (the base of each plant at the same height and the same place in every cell); only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Dune grass, swaying in the wind (about as tall as the hero): (1) leaning to the left in the wind — only the upper part bends, the base stays exactly in place; (2) standing upright at rest; (3) leaning to the right in the wind — only the upper part bends, the base stays exactly in place.
Row 2 — Grass tuft, swaying in the wind (about 0.5× the hero's height): (1) leaning to the left in the wind — only the upper part bends, the base stays exactly in place; (2) standing upright at rest; (3) leaning to the right in the wind — only the upper part bends, the base stays exactly in place.
Row 3 — Long grass clump, swaying in the wind (about 0.6× the hero's height): (1) leaning to the left in the wind — only the upper part bends, the base stays exactly in place; (2) standing upright at rest; (3) leaning to the right in the wind — only the upper part bends, the base stays exactly in place.
Row 4 — Dry grass tuft, swaying in the wind (about 0.5× the hero's height): (1) leaning to the left in the wind — only the upper part bends, the base stays exactly in place; (2) standing upright at rest; (3) leaning to the right in the wind — only the upper part bends, the base stays exactly in place.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_anim_7

Animation frames 7 — flowers, fern and hanging ivy swaying · wave 43 · 12 items, 3 × 4 · 1024x1536

- `an_wildflowers_1` Wildflowers — frame 1 — 44 × 34 px
- `an_wildflowers_2` Wildflowers — frame 2 — 44 × 34 px
- `an_wildflowers_3` Wildflowers — frame 3 — 44 × 34 px
- `an_alpine_flowers_1` Mountain flowers — frame 1 — 44 × 32 px
- `an_alpine_flowers_2` Mountain flowers — frame 2 — 44 × 32 px
- `an_alpine_flowers_3` Mountain flowers — frame 3 — 44 × 32 px
- `an_fern_1` Fern — frame 1 — 44 × 40 px
- `an_fern_2` Fern — frame 2 — 44 × 40 px
- `an_fern_3` Fern — frame 3 — 44 × 40 px
- `an_ivy_1` Hanging ivy — frame 1 — 64 × 60 px
- `an_ivy_2` Hanging ivy — frame 2 — 64 × 60 px
- `an_ivy_3` Hanging ivy — frame 3 — 64 × 60 px

Attach: style_hero, style_centaur, sc_edge_3, sc_edge_4, sc_edge_6

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames 7 — flowers, fern and hanging ivy swaying.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 3 columns × 4 rows, evenly spaced. Each ROW is ONE subject drawn 3 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell (the base of each plant at the same height and the same place in every cell); only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Wildflowers, swaying in the wind (about 0.5× the hero's height): (1) leaning to the left in the wind — only the upper part bends, the base stays exactly in place; (2) standing upright at rest; (3) leaning to the right in the wind — only the upper part bends, the base stays exactly in place.
Row 2 — Mountain flowers, swaying in the wind (about 0.5× the hero's height): (1) leaning to the left in the wind — only the upper part bends, the base stays exactly in place; (2) standing upright at rest; (3) leaning to the right in the wind — only the upper part bends, the base stays exactly in place.
Row 3 — Fern, swaying in the wind (about 0.6× the hero's height): (1) leaning to the left in the wind — only the upper part bends, the base stays exactly in place; (2) standing upright at rest; (3) leaning to the right in the wind — only the upper part bends, the base stays exactly in place.
Row 4 — Hanging ivy, swinging in the wind (the top edge stays fixed to the rock) (about as tall as the hero): (1) the trailing ends swung to the left; (2) hanging straight down at rest; (3) the trailing ends swung to the right.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_sleep_1

Animation frames — the hero asleep in the home bed, and waking up · wave 44 · 16 items, 4 × 4 · 1024x1536

- `an_sleep_m_1` Hero (the boy) asleep in his bed — frame 1 — 44 × 72 px
- `an_sleep_m_2` Hero (the boy) asleep in his bed — frame 2 — 44 × 72 px
- `an_sleep_m_3` Hero (the boy) asleep in his bed — frame 3 — 44 × 72 px
- `an_sleep_m_4` Hero (the boy) asleep in his bed — frame 4 — 44 × 72 px
- `an_sleep_f_1` Hero (the girl) asleep in her bed — frame 1 — 44 × 72 px
- `an_sleep_f_2` Hero (the girl) asleep in her bed — frame 2 — 44 × 72 px
- `an_sleep_f_3` Hero (the girl) asleep in her bed — frame 3 — 44 × 72 px
- `an_sleep_f_4` Hero (the girl) asleep in her bed — frame 4 — 44 × 72 px
- `an_wake_m_1` Hero (the boy) waking up — frame 1 — 44 × 72 px
- `an_wake_m_2` Hero (the boy) waking up — frame 2 — 44 × 72 px
- `an_wake_m_3` Hero (the boy) waking up — frame 3 — 44 × 72 px
- `an_wake_m_4` Hero (the boy) waking up — frame 4 — 44 × 72 px
- `an_wake_f_1` Hero (the girl) waking up — frame 1 — 44 × 72 px
- `an_wake_f_2` Hero (the girl) waking up — frame 2 — 44 × 72 px
- `an_wake_f_3` Hero (the girl) waking up — frame 3 — 44 × 72 px
- `an_wake_f_4` Hero (the girl) waking up — frame 4 — 44 × 72 px

Attach: style_hero, style_centaur, sc_int_1, hero_m.model, hero_f.model

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — the hero asleep in the home bed, and waking up.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 4 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Hero (the boy) asleep in his bed, sleeping, breathing slowly (about as tall as the hero): (1) the same wooden bed with the patchwork quilt and pillow as in its picture; the boy hero (exactly as in his model sheet) lies on his back in it, head on the pillow, eyes closed, the quilt pulled up to his chest, arms on top of the quilt; (2) the same, his chest and the quilt risen a little as he breathes in; (3) the same, mouth slightly open, a tiny sleep bubble at his nose; (4) the same, the quilt settled back down as he breathes out.
Row 2 — Hero (the girl) asleep in her bed, sleeping, breathing slowly (about as tall as the hero): (1) the same wooden bed with the patchwork quilt and pillow; the girl hero (exactly as in her model sheet) lies on her back in it, head on the pillow, eyes closed, the quilt pulled up to her chest, arms on top of the quilt; (2) the same, her chest and the quilt risen a little as she breathes in; (3) the same, mouth slightly open, a tiny sleep bubble at her nose; (4) the same, the quilt settled back down as she breathes out.
Row 3 — Hero (the boy) waking up, waking and getting out of bed (about as tall as the hero): (1) the same bed; the boy sits up in it, yawning, one fist rubbing an eye; (2) sitting up, stretching both arms high above his head; (3) sitting on the edge of the bed, quilt thrown back, feet on the floor; (4) the bed empty and tidy, the quilt pulled up, the boy standing beside its foot, rested and smiling.
Row 4 — Hero (the girl) waking up, waking and getting out of bed (about as tall as the hero): (1) the same bed; the girl sits up in it, yawning, one fist rubbing an eye; (2) sitting up, stretching both arms high above her head; (3) sitting on the edge of the bed, quilt thrown back, feet on the floor; (4) the bed empty and tidy, the quilt pulled up, the girl standing beside its foot, rested and smiling.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_sleep_2

Animation frames — the hero asleep in the home bed, and waking up — the bed EXACTLY the size, shape and angle of the bed in its own picture (sc_int_1, "Bed"), in the same spot of every cell, never bigger; the hero at his normal size relative to it · wave 49 · 16 items, 4 × 4 · 1024x1536

- `an_sleep2_m_1` Hero (the boy) asleep in the home bed — frame 1 — 44 × 72 px
- `an_sleep2_m_2` Hero (the boy) asleep in the home bed — frame 2 — 44 × 72 px
- `an_sleep2_m_3` Hero (the boy) asleep in the home bed — frame 3 — 44 × 72 px
- `an_sleep2_m_4` Hero (the boy) asleep in the home bed — frame 4 — 44 × 72 px
- `an_sleep2_f_1` Hero (the girl) asleep in the home bed — frame 1 — 44 × 72 px
- `an_sleep2_f_2` Hero (the girl) asleep in the home bed — frame 2 — 44 × 72 px
- `an_sleep2_f_3` Hero (the girl) asleep in the home bed — frame 3 — 44 × 72 px
- `an_sleep2_f_4` Hero (the girl) asleep in the home bed — frame 4 — 44 × 72 px
- `an_wake2_m_1` Hero (the boy) waking up in the home bed — frame 1 — 44 × 72 px
- `an_wake2_m_2` Hero (the boy) waking up in the home bed — frame 2 — 44 × 72 px
- `an_wake2_m_3` Hero (the boy) waking up in the home bed — frame 3 — 44 × 72 px
- `an_wake2_m_4` Hero (the boy) waking up in the home bed — frame 4 — 44 × 72 px
- `an_wake2_f_1` Hero (the girl) waking up in the home bed — frame 1 — 44 × 72 px
- `an_wake2_f_2` Hero (the girl) waking up in the home bed — frame 2 — 44 × 72 px
- `an_wake2_f_3` Hero (the girl) waking up in the home bed — frame 3 — 44 × 72 px
- `an_wake2_f_4` Hero (the girl) waking up in the home bed — frame 4 — 44 × 72 px

Attach: style_hero, style_centaur, sc_int_1, hero_m.model, hero_f.model

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — the hero asleep in the home bed, and waking up — the bed EXACTLY the size, shape and angle of the bed in its own picture (sc_int_1, "Bed"), in the same spot of every cell, never bigger; the hero at his normal size relative to it.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 4 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Hero (the boy) asleep in the home bed, sleeping, breathing slowly (about as tall as the hero): (1) the home bed exactly as in its picture (same frame, quilt, pillow, size and angle); the boy hero, at his normal size, lies on his back in it, head on the pillow, eyes closed, the quilt pulled up to his chest; (2) the same, his chest and the quilt risen a little as he breathes in; (3) the same, mouth slightly open, a tiny sleep bubble at his nose; (4) the same, the quilt settled back down as he breathes out.
Row 2 — Hero (the girl) asleep in the home bed, sleeping, breathing slowly (about as tall as the hero): (1) the home bed exactly as in its picture (same frame, quilt, pillow, size and angle); the girl hero, at her normal size, lies on her back in it, head on the pillow, eyes closed, the quilt pulled up to her chest; (2) the same, her chest and the quilt risen a little as she breathes in; (3) the same, mouth slightly open, a tiny sleep bubble at her nose; (4) the same, the quilt settled back down as she breathes out.
Row 3 — Hero (the boy) waking up in the home bed, waking and getting up (about as tall as the hero): (1) the same bed, same size and place; the boy sits up in it, yawning, one fist rubbing an eye; (2) sitting up, stretching both arms high above his head; (3) sitting on the edge of the bed, quilt thrown back, feet on the floor; (4) the bed empty and tidy, the quilt pulled up (the boy has stepped out of the picture).
Row 4 — Hero (the girl) waking up in the home bed, waking and getting up (about as tall as the hero): (1) the same bed, same size and place; the girl sits up in it, yawning, one fist rubbing an eye; (2) sitting up, stretching both arms high above her head; (3) sitting on the edge of the bed, quilt thrown back, feet on the floor; (4) the bed empty and tidy, the quilt pulled up (the girl has stepped out of the picture).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_void_tex

Ground 7 — what lies round an adventure site: rock and seas seen from straight above, seamless · wave 50 · 6 items, 3 × 2 · 1536x1024

- `tx_v_strata` Rock strata — 256 × 256 px
- `tx_v_roots` Root-bound earth — 256 × 256 px
- `tx_v_ore` Ore-veined granite — 256 × 256 px
- `tx_v_lavasea` Lava sea — 256 × 256 px
- `tx_v_deepsea` Deep sea — 256 × 256 px
- `tx_v_cloudsea` Sea of clouds — 256 × 256 px

Attach: style_hero, style_centaur, sc_tex_grass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 square ground-texture swatches — Ground 7 — what lies round an adventure site: rock and seas seen from straight above, seamless.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 swatches in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Rock strata — layered bands of grey-brown and ochre sedimentary rock seen from straight above, as if a floor were cut down through it: thin wavy bands, hairline cracks, small pebbles.
2. Root-bound earth — packed dark earth threaded with pale twisting roots and small stones, a few tiny glinting crystals.
3. Ore-veined granite — dark speckled granite with thin glinting veins of copper and pale blue crystal running through it.
4. Lava sea — a sea of molten lava from above: dark cooling crust plates with glowing orange-yellow seams floating on bright flowing lava.
5. Deep sea — deep night-blue sea from above, long slow swells, faint foam lines, a darker depth in places.
6. Sea of clouds — a thick sea of sunlit white and pale-gold cloud tops seen from far above, soft rounded billows with blue-grey shadows between.
View: seen from straight above, flat.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.
Background between the squares: plain white.
```

## sc_void_life

Creatures of the deep places round the adventure sites — each seen from above at a slight angle, half out of its rock, lava, water or cloud · wave 50 · 12 items, 4 × 3 · 1536x1024

- `vd_mole` Burrowing mole — 64 × 56 px
- `vd_rock_worm` Rock worm — 64 × 64 px
- `vd_beetle` Burrowing beetle — 56 × 48 px
- `vd_bat_swarm` Bat swarm — 96 × 72 px
- `vd_gargoyle_lava` Lava gargoyle — 96 × 104 px
- `vd_gargoyle_rock` Rock gargoyle — 88 × 96 px
- `vd_magma_serpent` Magma serpent — 112 × 72 px
- `vd_tentacle` Sea tentacle — 64 × 96 px
- `vd_whale_fin` Whale back — 112 × 64 px
- `vd_sky_whale` Sky whale — 128 × 72 px
- `vd_storm_eel` Storm eel — 112 × 64 px
- `vd_star_whale` Star whale — 128 × 72 px

Attach: style_hero, style_centaur, sc_edge_5

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Creatures of the deep places round the adventure sites — each seen from above at a slight angle, half out of its rock, lava, water or cloud.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Burrowing mole — a dark velvety mole pushing its head and big pink digging paws up out of a small mound of earth and rubble (about as tall as the hero).
2. Rock worm — a thick segmented grey rock worm arching out of a hole in stone, a ring of tiny teeth, dust falling (about as tall as the hero).
3. Burrowing beetle — a shiny blue-black beetle with a digging horn half out of loose earth (about 0.8× the hero's height).
4. Bat swarm — a small swirling flock of dark bats in flight, wings spread, seen from above (about as tall as the hero).
5. Lava gargoyle — a hulking gargoyle of black rock with glowing molten cracks and ember eyes, rising chest-deep out of lava, horns, folded stone wings (about 1.7× the hero's height).
6. Rock gargoyle — a crouching grey stone gargoyle with moss on its shoulders and glowing amber eyes, half sunk in rubble (about 1.5× the hero's height).
7. Magma serpent — the arched back and head of a serpent of molten rock breaking the surface of lava, drips of fire (about as tall as the hero).
8. Sea tentacle — a great dark-green tentacle curling up out of deep water, suckers along its underside, water streaming off (about 1.5× the hero's height).
9. Whale back — the dark back and tall fin of a huge whale breaking the sea surface, a spray of water (about as tall as the hero).
10. Sky whale — a long pale blue-white whale with fin-like wings swimming through clouds, seen from above (about as tall as the hero).
11. Storm eel — a long violet eel crackling with white lightning, coiling through dark storm cloud (about as tall as the hero).
12. Star whale — a translucent deep-blue whale filled with tiny stars, swimming through space, a faint trail of light (about as tall as the hero).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_void_fog

Fog and light for the abyss — soft white and pale-blue fog painted on a PURE BLACK background (it will be laid over the game as light, so the black must stay pure black) · wave 50 · 4 items, 2 × 2 · 1536x1024

- `vd_fog_bank_1` Fog bank 1 — 640 × 320 px
- `vd_fog_bank_2` Fog bank 2 — 640 × 320 px
- `vd_mist_wisps` Mist wisps — 640 × 320 px
- `vd_light_shaft` Light shaft — 640 × 320 px

Attach: style_hero, style_centaur, sc_void_life

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 4 separate pieces of scenery — Fog and light for the abyss — soft white and pale-blue fog painted on a PURE BLACK background (it will be laid over the game as light, so the black must stay pure black).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 4 objects in a grid of 2 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Fog bank 1 — a long low bank of soft rolling fog, denser in the middle, thinning to wisps at both ends (about 10.2× the hero's height across).
2. Fog bank 2 — a wider, flatter layer of mist with gaps and curls, as seen looking down into a deep chasm (about 10.2× the hero's height across).
3. Mist wisps — several thin drifting wisps and curls of mist (about 10.2× the hero's height across).
4. Light shaft — a soft slanting shaft of pale light falling down into darkness, dust motes glinting in it (about 10.2× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_void_sky

An epic sky round the high towers — painted clouds and far peaks seen from high above · wave 50 · 6 items, 3 × 2 · 1536x1024

- `vd_cloud_1` Cloud mass — 192 × 128 px
- `vd_cloud_2` Cloud bank — 224 × 96 px
- `vd_cloud_3` Small cloud — 112 × 80 px
- `vd_peak_1` Far peak — 176 × 160 px
- `vd_peak_2` Far crags — 176 × 144 px
- `vd_tower_far` Distant tower — 96 × 176 px

Attach: style_hero, style_centaur, sc_sky_bg_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — An epic sky round the high towers — painted clouds and far peaks seen from high above.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Cloud mass — a big sunlit cumulus cloud seen from above, white tops, soft blue-grey shadows, golden edge light (about 2× the hero's height).
2. Cloud bank — a long flat bank of cloud seen from above, wisps trailing (about 1.5× the hero's height).
3. Small cloud — a small puffy cloud seen from above (about 1.3× the hero's height).
4. Far peak — a snow-capped mountain peak rising out of a sea of cloud far below, seen from high above (about 2.5× the hero's height).
5. Far crags — two jagged rocky crags poking up through cloud, a waterfall on one (about 2.3× the hero's height).
6. Distant tower — a slender distant stone tower on a rock spire rising through cloud, a tiny banner, bluish with distance (about 2.8× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_void_night

The night sky round the mage towers — painted on a PURE BLACK background (it will be laid over the game as light, so the black must stay pure black) · wave 50 · 6 items, 3 × 2 · 1536x1024

- `vd_milkyway` Milky way — 512 × 320 px
- `vd_nebula_violet` Violet nebula — 448 × 320 px
- `vd_nebula_rose` Rose nebula — 448 × 320 px
- `vd_aurora` Aurora — 512 × 320 px
- `vd_planet_ringed` Ringed planet — 256 × 192 px
- `vd_shooting_star` Shooting star — 384 × 96 px

Attach: style_hero, style_centaur, sc_void_life

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — The night sky round the mage towers — painted on a PURE BLACK background (it will be laid over the game as light, so the black must stay pure black).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Milky way — a broad diagonal band of the milky way: countless tiny stars, glowing dust lanes, soft white-gold core (about 8.1× the hero's height across).
2. Violet nebula — a glowing violet and teal nebula cloud with bright young stars inside (about 7.1× the hero's height across).
3. Rose nebula — a rose-pink and gold nebula, wispy filaments, a few bright stars (about 7.1× the hero's height across).
4. Aurora — curtains of aurora borealis in green fading to violet, rippling folds hanging from the top (about 8.1× the hero's height across).
5. Ringed planet — a distant pale ringed planet, half lit, its rings tilted (about 4.1× the hero's height across).
6. Shooting star — a bright shooting star with a long tapering glowing tail (about 6.1× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_anim_flit

Animation frames — a butterfly and a dragonfly in smooth, slow flight (eight frames each, so the wingbeat looks fluid) · wave 50 · 16 items, 8 × 2 · 1536x1024

- `an_butterfly2_1` Butterfly — frame 1 — 26 × 22 px
- `an_butterfly2_2` Butterfly — frame 2 — 26 × 22 px
- `an_butterfly2_3` Butterfly — frame 3 — 26 × 22 px
- `an_butterfly2_4` Butterfly — frame 4 — 26 × 22 px
- `an_butterfly2_5` Butterfly — frame 5 — 26 × 22 px
- `an_butterfly2_6` Butterfly — frame 6 — 26 × 22 px
- `an_butterfly2_7` Butterfly — frame 7 — 26 × 22 px
- `an_butterfly2_8` Butterfly — frame 8 — 26 × 22 px
- `an_dragonfly2_1` Dragonfly — frame 1 — 32 × 28 px
- `an_dragonfly2_2` Dragonfly — frame 2 — 32 × 28 px
- `an_dragonfly2_3` Dragonfly — frame 3 — 32 × 28 px
- `an_dragonfly2_4` Dragonfly — frame 4 — 32 × 28 px
- `an_dragonfly2_5` Dragonfly — frame 5 — 32 × 28 px
- `an_dragonfly2_6` Dragonfly — frame 6 — 32 × 28 px
- `an_dragonfly2_7` Dragonfly — frame 7 — 32 × 28 px
- `an_dragonfly2_8` Dragonfly — frame 8 — 32 × 28 px

Attach: style_hero, style_centaur, sc_anim_3, sc_anim_2

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — a butterfly and a dragonfly in smooth, slow flight (eight frames each, so the wingbeat looks fluid).
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 8 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 8 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Butterfly, one slow, smooth wingbeat (a small item, under half the hero's height): (1) wings fully open, flat; (2) wings beginning to lift, slightly raised; (3) wings raised to half; (4) wings raised high, nearly upright; (5) wings closed together, seen as a thin upright shape; (6) wings opening again, nearly upright; (7) wings lowering to half; (8) wings almost flat again.
Row 2 — Dragonfly, one smooth beat of its four wings (about 0.4× the hero's height): (1) all four wings spread flat; (2) front wings tilting forward a little; (3) front wings swept forward, back wings back; (4) both pairs swept to their furthest, slightly blurred; (5) wings returning toward flat; (6) all four wings spread flat again; (7) back wings tilting forward a little; (8) both pairs swept the other way, slightly blurred.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_fx_ground

Painted area effects 1 — warnings and lingering patches on the ground, seen from straight above, each a flat circular or wedge-shaped patch · wave 50 · 12 items, 4 × 3 · 1536x1024

- `fx_tele_circle` Warning circle — 128 × 128 px
- `fx_tele_cone` Warning wedge — 128 × 128 px
- `fx_tele_line` Warning path — 192 × 48 px
- `fx_zone_frost` Frost patch — 128 × 128 px
- `fx_zone_poison` Poison pool — 128 × 128 px
- `fx_zone_burn` Burning ground — 128 × 128 px
- `fx_zone_shadow` Shadow pool — 128 × 128 px
- `fx_zone_pollen` Pollen cloud — 128 × 128 px
- `fx_zone_vines` Grasping vines — 128 × 128 px
- `fx_zone_lava` Lava pool — 128 × 128 px
- `fx_zone_blood` Cursed ground — 128 × 128 px
- `fx_crack_ring` Shattered ground — 128 × 128 px

Attach: style_hero, style_centaur, sc_edge_5

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Painted area effects 1 — warnings and lingering patches on the ground, seen from straight above, each a flat circular or wedge-shaped patch.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Warning circle — a glowing red-orange rune circle burned into the ground, cracks radiating inside it, as a warning of an attack about to land (about 2× the hero's height).
2. Warning wedge — a wedge-shaped (pie-slice) patch of glowing red-orange cracked ground fanning out from its point (about 2× the hero's height).
3. Warning path — a long straight strip of glowing red-orange runes and cracks along the ground (about 0.8× the hero's height).
4. Frost patch — a round patch of frost and thin ice crystals on the ground, pale blue, sparkling (about 2× the hero's height).
5. Poison pool — a round bubbling puddle of glowing green poison with a few bubbles and a thin vapour (about 2× the hero's height).
6. Burning ground — a round patch of scorched ground with small flames and glowing embers (about 2× the hero's height).
7. Shadow pool — a round pool of swirling black-violet shadow with faint wisps rising (about 2× the hero's height).
8. Pollen cloud — a low round cloud of pale pink-gold pollen dust and tiny petals (about 2× the hero's height).
9. Grasping vines — a round tangle of thorny green vines writhing up out of the ground (about 2× the hero's height).
10. Lava pool — a round pool of bright lava with a dark crust rim (about 2× the hero's height).
11. Cursed ground — a round patch of glowing red cursed runes on the ground (about 2× the hero's height).
12. Shattered ground — a ring of broken, upheaved ground and flying pebbles from a heavy slam (about 2× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_fx_blast

Painted area effects 2 — attacks that burst outward, painted on a PURE BLACK background (laid over the game as light, so the black must stay pure black) · wave 50 · 12 items, 4 × 3 · 1536x1024

- `fx_shockwave` Shockwave — 256 × 256 px
- `fx_ring_ice` Ice ring — 256 × 256 px
- `fx_burst_fire` Fire burst — 256 × 256 px
- `fx_nova_ice` Frost nova — 256 × 256 px
- `fx_burst_storm` Lightning burst — 256 × 256 px
- `fx_breath_fire` Fire breath — 256 × 160 px
- `fx_breath_frost` Frost breath — 256 × 160 px
- `fx_beam` Energy beam — 384 × 64 px
- `fx_impact_meteor` Meteor impact — 256 × 256 px
- `fx_ring_heal` Healing ring — 256 × 256 px
- `fx_gust` Gust — 256 × 160 px
- `fx_burst_shadow` Shadow burst — 256 × 256 px

Attach: style_hero, style_centaur, sc_fx_ground

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Painted area effects 2 — attacks that burst outward, painted on a PURE BLACK background (laid over the game as light, so the black must stay pure black).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Shockwave — a ring-shaped shockwave of dust and force spreading on the ground, seen from above (about 4.1× the hero's height across).
2. Ice ring — an expanding ring of icy blue light and ice shards, seen from above (about 4.1× the hero's height across).
3. Fire burst — a round fiery explosion seen from above, orange-yellow core, smoky edges (about 4.1× the hero's height across).
4. Frost nova — a round burst of frost and ice crystals spreading outward (about 4.1× the hero's height across).
5. Lightning burst — a round burst of crackling white-violet lightning branching outward (about 4.1× the hero's height across).
6. Fire breath — a wedge-shaped jet of roaring fire fanning out from its narrow end on the left (about 4.1× the hero's height across).
7. Frost breath — a wedge-shaped jet of icy mist and shards fanning out from its narrow end on the left (about 4.1× the hero's height across).
8. Energy beam — a long straight beam of searing red-white energy, bright core, glowing edges, running left to right (about 6.1× the hero's height across).
9. Meteor impact — a meteor striking the ground from above: a burst of fire and flying rock in a ring (about 4.1× the hero's height across).
10. Healing ring — a soft ring of green-gold healing light with tiny leaves and sparkles (about 4.1× the hero's height across).
11. Gust — a sweep of wind seen from above: white curling streaks of air fanning out (about 4.1× the hero's height across).
12. Shadow burst — a round burst of black-violet shadow tendrils lashing outward (about 4.1× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_fx_skill

Painted area effects 3 — the hero's own skills and spells, painted on a PURE BLACK background (laid over the game as light, so the black must stay pure black) · wave 50 · 12 items, 4 × 3 · 1536x1024

- `fx_whirlwind` Whirlwind — 256 × 256 px
- `fx_dash_trail` Dash trail — 256 × 96 px
- `fx_frost_trail` Frost trail — 256 × 96 px
- `fx_smoke` Smoke cloud — 256 × 256 px
- `fx_berserk_aura` Berserk aura — 256 × 256 px
- `fx_heal_aura` Healing aura — 256 × 256 px
- `fx_time_ring` Time ring — 256 × 256 px
- `fx_arcane_aura` Arcane aura — 256 × 256 px
- `fx_shield_bubble` Shield bubble — 256 × 256 px
- `fx_familiar_burst` Familiar burst — 256 × 256 px
- `fx_meteor_mark` Meteor target — 256 × 256 px
- `fx_root_burst` Root burst — 256 × 256 px

Attach: style_hero, style_centaur, sc_fx_ground

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Painted area effects 3 — the hero's own skills and spells, painted on a PURE BLACK background (laid over the game as light, so the black must stay pure black).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Whirlwind — a spinning ring of bright sword-arcs and wind seen from above (about 4.1× the hero's height across).
2. Dash trail — a short streak of blue-white speed light and dust, running left to right (about 4.1× the hero's height across).
3. Frost trail — a short trail of frost crystals and cold mist, running left to right (about 4.1× the hero's height across).
4. Smoke cloud — a round billowing cloud of grey smoke seen from above (about 4.1× the hero's height across).
5. Berserk aura — a ring of roaring red-orange flame-light around an empty centre (about 4.1× the hero's height across).
6. Healing aura — a soft rising column of green-gold light and sparkles, seen from above as a glowing disc (about 4.1× the hero's height across).
7. Time ring — a wide ring of pale cyan clockwork runes and light (about 4.1× the hero's height across).
8. Arcane aura — a ring of lilac arcane runes and motes of light (about 4.1× the hero's height across).
9. Shield bubble — a round translucent blue bubble of force with a bright rim and faint hexagon pattern (about 4.1× the hero's height across).
10. Familiar burst — a round burst of teal spirit light with small spirit wisps (about 4.1× the hero's height across).
11. Meteor target — a glowing orange target circle on the ground with falling sparks above it (about 4.1× the hero's height across).
12. Root burst — a round burst of green roots and leaves bursting up from the ground (about 4.1× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_forge_hearths

The four forge hearths of Muspelheim — great round hearths of black iron and stone set in the floor of a cavern hall, glowing coals, a cradle on top that holds a round metal tray; seen from above-front like the game scenery · wave 57 · 4 items, 2 × 2 · 1024x1024

- `ff_hearth_ember` Hearth of the Ember Forge — 120 × 110 px
- `ff_hearth_cinder` Hearth of the Cinder Forge — 120 × 110 px
- `ff_hearth_slag` Hearth of the Slag Forge — 120 × 110 px
- `ff_hearth_ash` Hearth of the Ash Forge — 120 × 110 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 4 separate pieces of scenery — The four forge hearths of Muspelheim — great round hearths of black iron and stone set in the floor of a cavern hall, glowing coals, a cradle on top that holds a round metal tray; seen from above-front like the game scenery.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 4 objects in a grid of 2 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Hearth of the Ember Forge — its iron rim worked with leaf knotwork, green-gold flames among the coals, a great bellows beside it (about 1.7× the hero's height).
2. Hearth of the Cinder Forge — its rim wet and steaming, blue-white coals, a quench trough of water beside it (about 1.7× the hero's height).
3. Hearth of the Slag Forge — its rim crusted with cooling slag, deep orange coals, a crucible on chains above it (about 1.7× the hero's height).
4. Hearth of the Ash Forge — its rim of black iron hung with broken chains, red-white coals and drifting ash (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_heartglass

Heartglass — game icons · wave 57 · 4 items, 2 × 2 · 1024x1024

- `ic_heartglass_1` Ember Heartglass — 48 × 48 px
- `ic_heartglass_2` Cinder Heartglass — 48 × 48 px
- `ic_heartglass_3` Slag Heartglass — 48 × 48 px
- `ic_heartglass_4` Ash Heartglass — 48 × 48 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 4 separate game icons — Heartglass — game icons.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 4 objects in a grid of 2 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Ember Heartglass — a heart-shaped gem of light with a green leaf-rune glowing inside, set in a thin gold ring.
2. Cinder Heartglass — a heart-shaped gem of light with a blue wave-rune glowing inside, set in a thin gold ring.
3. Slag Heartglass — a heart-shaped gem of light with an amber mountain-rune glowing inside, set in a thin gold ring.
4. Ash Heartglass — a heart-shaped gem of light with a red flame-rune glowing inside, set in a thin gold ring.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_surth_opts

Surtharn, Tyrant of Muspelheim — six options for the final fire giant (the endgame’s great boss), each huge and menacing, seen from above-front like the game characters, original design, no text · wave 58 · 6 items, 3 × 2 · 1536x1024

- `surt_colossus` Molten colossus — 220 × 240 px
- `surt_forgeking` Forge-king — 220 × 240 px
- `surt_ashtyrant` Ash tyrant — 220 × 240 px
- `surt_jotun` Horned jötunn — 220 × 240 px
- `surt_obsidian` Obsidian warlord — 220 × 240 px
- `surt_volcano` Living volcano — 220 × 240 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Surtharn, Tyrant of Muspelheim — six options for the final fire giant (the endgame’s great boss), each huge and menacing, seen from above-front like the game characters, original design, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Molten colossus — a towering fire giant of cracked black basalt with rivers of glowing lava in the cracks, a crown of living flame, a huge flaming greatsword (about 3.8× the hero's height).
2. Forge-king — a giant in blackened iron plate armour with great bellows on his back, a hammer as big as an anvil, a beard of smouldering embers (about 3.8× the hero's height).
3. Ash tyrant — a gaunt, towering figure wrapped in smouldering ash-grey robes, a mask of molten gold, chains of pale-blue spirit-light trailing from his hands (about 3.8× the hero's height).
4. Horned jötunn — a horned fire giant, bare-chested, skin burnt with glowing runes, long braided hair of flame, a sword of fire in one hand (about 3.8× the hero's height).
5. Obsidian warlord — a giant in jagged obsidian armour with glowing orange seams; a cage in his chest holds captured spirits glowing pale blue (about 3.8× the hero's height).
6. Living volcano — the upper body of a giant rising out of a mound of magma and rock, his head a crater crown that smokes, arms of cooling lava (about 3.8× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_swall_opts

The spirit walls of Surtharn’s throne cavern — six options for wall sections made of captured spirits (people of pale-blue light), each a wide piece of cavern wall seen from above-front like the game scenery, no text · wave 58 · 6 items, 3 × 2 · 1536x1024

- `sw_relief` Spirits in relief — 200 × 150 px
- `sw_amber` Glass columns — 200 × 150 px
- `sw_cage` Cage wall — 200 × 150 px
- `sw_lanterns` Chains and lanterns — 200 × 150 px
- `sw_channels` Rune channels — 200 × 150 px
- `sw_lavafall` Spirit lavafall — 200 × 150 px

Attach: style_hero, style_centaur, sc_spirit40_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — The spirit walls of Surtharn’s throne cavern — six options for wall sections made of captured spirits (people of pale-blue light), each a wide piece of cavern wall seen from above-front like the game scenery, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Spirits in relief — a section of cavern wall: dark obsidian rock in which chained spirit people are pressed like a carved relief, their faces and hands glowing pale blue (about 2.4× the hero's height).
2. Glass columns — a row of tall columns of smoky amber glass, each with a spirit person trapped inside glowing pale blue, set in black rock (about 2.4× the hero's height).
3. Cage wall — a wall of heavy black iron bars and cages packed with pale-blue spirit light, chains hanging, embers drifting (about 2.4× the hero's height).
4. Chains and lanterns — a basalt wall hung with heavy chains, each ending in an iron lantern-cage holding a small glowing spirit (about 2.4× the hero's height).
5. Rune channels — carved basalt blocks with deep rune-shaped channels through which pale-blue spirit light flows like water (about 2.4× the hero's height).
6. Spirit lavafall — a curtain of slow molten rock pouring down a wall, with the silhouettes of spirits glowing blue inside the lava (about 2.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_mhall_opts

Muspelheim’s challenge halls — key pieces, two options each (top row A, bottom row B): the chain lift, the lava raft, the ash-warden fortress gate, the falling bridge; dark volcanic stone, iron and lava, seen from above-front like the game scenery, no text · wave 58 · 8 items, 4 × 2 · 1536x1024

- `mh_lift_a` Chain lift, option A — 150 × 120 px
- `mh_raft_a` Lava raft, option A — 150 × 120 px
- `mh_gate_a` Fortress gate, option A — 150 × 120 px
- `mh_bridge_a` Falling bridge, option A — 150 × 120 px
- `mh_lift_b` Chain lift, option B — 150 × 120 px
- `mh_raft_b` Lava raft, option B — 150 × 120 px
- `mh_gate_b` Fortress gate, option B — 150 × 120 px
- `mh_bridge_b` Falling bridge, option B — 150 × 120 px

Attach: style_hero, style_centaur, sc_forge_hearths

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Muspelheim’s challenge halls — key pieces, two options each (top row A, bottom row B): the chain lift, the lava raft, the ash-warden fortress gate, the falling bridge; dark volcanic stone, iron and lava, seen from above-front like the game scenery, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Chain lift, option A — a square iron platform hanging by four heavy chains over a lava shaft, a winch and chains at the edge where spirits haul (about 1.9× the hero's height).
2. Lava raft, option A — a flat raft of black basalt floating on bright lava, glowing cracks at its edges, a rough iron pole (about 1.9× the hero's height).
3. Fortress gate, option A — a heavy gate of black iron and basalt in a fortress wall, spiked, with two ember braziers and an iron portcullis (about 1.9× the hero's height).
4. Falling bridge, option A — a narrow bridge of basalt slabs on iron chains over a dark abyss, a few slabs already cracked and glowing (about 1.9× the hero's height).
5. Chain lift, option B — a round platform of riveted bronze lifted by one great chain through a pulley wheel over a lava shaft (about 1.9× the hero's height).
6. Lava raft, option B — a raft of iron plates and chains on bright lava, a small brazier on it and a carved prow like a dragon head (about 1.9× the hero's height).
7. Fortress gate, option B — a tall gatehouse of dark stone with a molten iron door and two statues of ash-wardens holding spears (about 1.9× the hero's height).
8. Falling bridge, option B — a rope-and-plank bridge with iron fittings, burning at one end, swaying over the abyss (about 1.9× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ghearth_opts

Muspelheim’s great hearth (three options), the Lodestar staff (three options) and Surtharn’s ash-wardens (two options); seen from above-front like the game scenery and characters, original designs, no text · wave 58 · 8 items, 4 × 2 · 1536x1024

- `gh_hearth_a` Great hearth, option A — 150 × 150 px
- `gh_hearth_b` Great hearth, option B — 150 × 150 px
- `gh_hearth_c` Great hearth, option C — 150 × 150 px
- `ls_staff_a` The Lodestar, option A — 150 × 150 px
- `ls_staff_b` The Lodestar, option B — 150 × 150 px
- `ls_staff_c` The Lodestar, option C — 150 × 150 px
- `aw_warden_a` Ash-warden, option A — 150 × 150 px
- `aw_warden_b` Ash-warden, option B — 150 × 150 px

Attach: style_hero, style_centaur, sc_forge_hearths

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Muspelheim’s great hearth (three options), the Lodestar staff (three options) and Surtharn’s ash-wardens (two options); seen from above-front like the game scenery and characters, original designs, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Great hearth, option A — the great hearth of Muspelheim: a giant round hearth of black iron and gold set into a throne-cavern floor, four cradles around it for four glowing gems, a socket in the middle for a staff (about 2.4× the hero's height).
2. Great hearth, option B — the great hearth of Muspelheim: a stepped altar of basalt with a deep fire pit, four carved hands holding up four empty settings for gems, a keyhole socket for a staff (about 2.4× the hero's height).
3. Great hearth, option C — the great hearth of Muspelheim: a huge anvil-shaped forge with rune-carved sides, four glowing slots in a ring and a staff socket in the centre (about 2.4× the hero's height).
4. The Lodestar, option A — a magic staff of white gold topped by a blazing star of four coloured crystals (green, blue, amber, red) around a white core, rays of light (about 2.4× the hero's height).
5. The Lodestar, option B — a tall staff of dark iron wrapped in spiralling light, ending in a ring that holds four gems around a floating white star (about 2.4× the hero's height).
6. The Lodestar, option C — a staff of pale runed wood and silver with a compass-rose head of four gems pointing like a star, glowing softly (about 2.4× the hero's height).
7. Ash-warden, option A — an ash-warden: Surtharn’s guard, a tall soldier in charred black armour with a spear and a tower shield, ember eyes in a closed helm (about 2.4× the hero's height).
8. Ash-warden, option B — an ash-warden: a lean figure of living ash and cinders in a ragged cloak, a curved blade glowing at the edge, a chain whip at the belt (about 2.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop2_chaingang

Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone · wave 59 · 4 items, 2 × 2 · 1024x1024

- `gm_chaingang_1` Chain gang (bound) — frame 1 — 220 × 150 px
- `gm_chaingang_2` Chain gang (bound) — frame 2 — 220 × 150 px
- `gm_chaingang_3` Chain gang (bound) — frame 3 — 220 × 150 px
- `gm_chaingang_4` Chain gang (bound) — frame 4 — 220 × 150 px

Attach: style_hero, style_centaur, sc_spirit_grp_opts, sc_gloop_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Chain gang (bound), exactly FIVE bound spirits (count them: five) chained neck to neck in one line, hauling ONE ore cart; heads down (about 2.4× the hero's height): (1) all five leaning into the chains, the cart still; (2) all five taking one step forward, the cart creaking a little further; (3) all five on the next step, the third one stumbling; (4) all five pausing, wiping their brows, the chains slack.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop2_haul

Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone · wave 59 · 4 items, 2 × 2 · 1024x1024

- `gm_haul_1` The great haul (bound) — frame 1 — 220 × 150 px
- `gm_haul_2` The great haul (bound) — frame 2 — 220 × 150 px
- `gm_haul_3` The great haul (bound) — frame 3 — 220 × 150 px
- `gm_haul_4` The great haul (bound) — frame 4 — 220 × 150 px

Attach: style_hero, style_centaur, sc_spirit_grp2, sc_gloop_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — The great haul (bound), exactly FIVE bound spirits (count them: five) in chains hauling ONE huge carved stone on ropes and log rollers, a Binder’s brazier smoking behind (about 2.4× the hero's height): (1) all five with the ropes taut, leaning back; (2) all five heaving together, the stone moved a little; (3) all five resting, ropes sagging, heads bowed; (4) all five heaving again, straining.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop2_hearth_tale

Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone · wave 59 · 4 items, 2 × 2 · 1024x1024

- `gm_hearth_tale_1` Tale by the hearth — frame 1 — 220 × 150 px
- `gm_hearth_tale_2` Tale by the hearth — frame 2 — 220 × 150 px
- `gm_hearth_tale_3` Tale by the hearth — frame 3 — 220 × 150 px
- `gm_hearth_tale_4` Tale by the hearth — frame 4 — 220 × 150 px

Attach: style_hero, style_centaur, sc_spirit_grp2, sc_gloop_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Tale by the hearth, exactly FIVE spirits (count them: a grandmother telling the tale, a father with one child on his shoulders, and two more children sitting) round ONE small ring of stones with a blue ghost-fire; the ring of stones is EXACTLY the same size and place in every frame, only the flame changes (about 2.4× the hero's height): (1) the grandmother with hands spread wide, the children listening, the flame low; (2) the grandmother leaning in, whispering, the flame low; (3) the grandmother throwing up her arms, the flame flaring taller, the children jumping; (4) everyone laughing, the flame settling back.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop2_mead_bench

Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone · wave 59 · 4 items, 2 × 2 · 1024x1024

- `gm_mead_bench_1` Mead bench — frame 1 — 220 × 150 px
- `gm_mead_bench_2` Mead bench — frame 2 — 220 × 150 px
- `gm_mead_bench_3` Mead bench — frame 3 — 220 × 150 px
- `gm_mead_bench_4` Mead bench — frame 4 — 220 × 150 px

Attach: style_hero, style_centaur, sc_spirit_grp2, sc_gloop_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Mead bench, exactly FOUR spirits (count them: four) on ONE long bench at ONE plank table, each with ONE mead horn (about 2.4× the hero's height): (1) all four talking and gesturing; (2) all four raising their horns in a toast; (3) all four drinking, heads tipped back; (4) all four slamming the horns down, roaring with laughter.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop2_reel

Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone · wave 59 · 4 items, 2 × 2 · 1024x1024

- `gm_reel_1` The reel — frame 1 — 220 × 150 px
- `gm_reel_2` The reel — frame 2 — 220 × 150 px
- `gm_reel_3` The reel — frame 3 — 220 × 150 px
- `gm_reel_4` The reel — frame 4 — 220 × 150 px

Attach: style_hero, style_centaur, sc_spirit_grp2, sc_gloop_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — The reel, exactly EIGHT spirits (count them: six dancers in a ring, a fiddler and a drummer in the middle) (about 2.4× the hero's height): (1) the six dancers stepping right, the fiddler bowing; (2) the six dancers mid-spin, cloaks swinging out; (3) the six dancers stepping left, the drummer striking; (4) the six dancers clapping, the fiddler raising the bow.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop2_tafl

Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone · wave 59 · 4 items, 2 × 2 · 1024x1024

- `gm_tafl_1` Game of tafl — frame 1 — 220 × 150 px
- `gm_tafl_2` Game of tafl — frame 2 — 220 × 150 px
- `gm_tafl_3` Game of tafl — frame 3 — 220 × 150 px
- `gm_tafl_4` Game of tafl — frame 4 — 220 × 150 px

Attach: style_hero, style_centaur, sc_spirit_grp2, sc_gloop_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE spirit group shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly. Every frame shows the SAME group: the SAME number of people (the count is given), the SAME props at the SAME size and place, the same camera and scale — only heads, arms and legs move a little. Never add, remove or merge anyone.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Game of tafl, exactly FIVE old spirits (count them: two players and three watchers) round ONE hnefatafl board on ONE flat stone (about 2.4× the hero's height): (1) one player thinking, chin in hand, the watchers still; (2) the same player reaching out to move a piece; (3) the piece moved, the three watchers pointing; (4) the other player throwing up his hands, everyone laughing.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_surth_phases

Surtharn, Tyrant of Muspelheim — his SIX PHASES, one per cell (left to right, top row first), one giant growing more terrible; the SAME head in all six: a dark cracked-basalt face with deep-set glowing orange eyes under a heavy brow, a long beard of smouldering orange embers, and a spiked crown of living flame; dark armour in every phase (never bare skin); seen from above-front like the game characters, original design, no text · wave 60 · 6 items, 3 × 2 · 1536x1024

- `surt_ph1` Phase 1 — the Molten Colossus — 240 × 260 px
- `surt_ph2` Phase 2 — the Forge-king — 240 × 260 px
- `surt_ph3` Phase 3 — the Ash Tyrant — 240 × 260 px
- `surt_ph4` Phase 4 — the Horned Jötunn — 240 × 260 px
- `surt_ph5` Phase 5 — the Obsidian Warlord — 240 × 260 px
- `surt_ph6` Phase 6 — the Living Volcano — 240 × 260 px

Attach: style_hero, style_centaur, sc_surth_opts

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Surtharn, Tyrant of Muspelheim — his SIX PHASES, one per cell (left to right, top row first), one giant growing more terrible; the SAME head in all six: a dark cracked-basalt face with deep-set glowing orange eyes under a heavy brow, a long beard of smouldering orange embers, and a spiked crown of living flame; dark armour in every phase (never bare skin); seen from above-front like the game characters, original design, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Phase 1 — the Molten Colossus — as the Molten colossus in the reference: a fire giant of cracked black basalt with rivers of glowing lava, a flaming greatsword (about 4.1× the hero's height).
2. Phase 2 — the Forge-king — as the Forge-king in the reference: blackened iron plate, great bellows on his back, an anvil-hammer (about 4.1× the hero's height).
3. Phase 3 — the Ash Tyrant — in smouldering ash-grey robes over black armour, chains of pale-blue spirit-light trailing from his hands (about 4.1× the hero's height).
4. Phase 4 — the Horned Jötunn — great curved horns on the crown, dark rune-etched armour (not bare skin), a sword of fire (about 4.1× the hero's height).
5. Phase 5 — the Obsidian Warlord — jagged obsidian armour with glowing seams, a cage in his chest holding captured spirits glowing pale blue (about 4.1× the hero's height).
6. Phase 6 — the Living Volcano — his upper body rising out of a mound of magma and rock, the same face and crown above the flames (about 4.1× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_swall2_opts

The spirit walls of Surtharn’s throne cavern, round two — wall sections showing the spirits he holds (people of pale-blue light, calm and weary, working for him — never screaming), each a wide piece of cavern wall seen from above-front like the game scenery, no text · wave 60 · 6 items, 3 × 2 · 1536x1024

- `sw2_relief` Spirits in relief — 200 × 150 px
- `sw2_glass` Old glass — 200 × 150 px
- `sw2_cage` Cage wall at work — 200 × 150 px
- `sw2_lanterns` Chains and the miners — 200 × 150 px
- `sw2_lavafall` Spirit lavafall — 200 × 150 px
- `sw2_channels` Rune channels (your pick) — 200 × 150 px

Attach: style_hero, style_centaur, sc_swall_opts, sc_spirit40_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — The spirit walls of Surtharn’s throne cavern, round two — wall sections showing the spirits he holds (people of pale-blue light, calm and weary, working for him — never screaming), each a wide piece of cavern wall seen from above-front like the game scenery, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Spirits in relief — dark obsidian rock in which chained spirit people are pressed like a carved relief, faces and hands glowing pale blue; every hand belongs to a body, no loose hands rising from below (about 2.4× the hero's height).
2. Old glass — a wall of rough, thick hand-blown glass panes, bubbly and greenish-amber, set in blackened iron frames and stone, like an old forge window; working spirit people glow pale blue behind the glass, hammering and carrying ore; low-tech, medieval, nothing futuristic (about 2.4× the hero's height).
3. Cage wall at work — a wall of heavy black iron bars and cages; inside, calm spirit people of pale-blue light toil — swinging picks, pushing ore carts, carrying sacks; weary, not screaming (about 2.4× the hero's height).
4. Chains and the miners — a basalt wall hung with heavy chains and iron lantern-cages; along its foot spirit people of pale-blue light mine the rock with picks and haul baskets; calm, weary faces, no screaming (about 2.4× the hero's height).
5. Spirit lavafall — a curtain of slow molten rock pouring down a wall; inside it, clearly human spirit people of pale-blue light (heads, shoulders, arms, simple clothes) labour and climb (about 2.4× the hero's height).
6. Rune channels (your pick) — carved basalt blocks with deep rune-shaped channels through which pale-blue spirit light flows like water, as in the reference (about 2.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_lodestar2

The Lodestar, round two — three magic staffs, each standing upright, full length, seen from the front: a clear glowing LENS at the heart of the head (no star), ringed by six elemental gems, in the spirit of the Sovereign staff; original designs, no text · wave 60 · 3 items, 3 × 1 · 1536x1024

- `ls2_a` White-gold and lens — 120 × 300 px
- `ls2_b` Silver compass-rose — 120 × 300 px
- `ls2_c` Rune-ring lens — 120 × 300 px

Attach: style_hero, style_centaur, sc_ghearth_opts

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 3 separate pieces of scenery — The Lodestar, round two — three magic staffs, each standing upright, full length, seen from the front: a clear glowing LENS at the heart of the head (no star), ringed by six elemental gems, in the spirit of the Sovereign staff; original designs, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 3 objects in a grid of 3 columns × 1 rows, evenly spaced, in this order (left to right, top row first):
1. White-gold and lens — a staff of white gold like the Sovereign staff, crowned by a ring of six small gems — red, blue, green, amber, yellow and violet — round a clear round crystal LENS glowing white in the middle (about 4.8× the hero's height).
2. Silver compass-rose — a staff of pale runed wood and silver whose head is a compass-rose ring set with the six gems (red, blue, green, amber, yellow, violet) round a clear glowing lens (about 4.8× the hero's height).
3. Rune-ring lens — a white-gold staff whose head is a rune-carved ring holding the six elemental gems evenly round a large clear lens, a faint world-tree visible in the lens (about 4.8× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop_1

Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly · wave 56 · 8 items, 4 × 2 · 1536x1024

- `gl_ring_1` Ring dance — frame 1 — 200 × 128 px
- `gl_ring_2` Ring dance — frame 2 — 200 × 128 px
- `gl_ring_3` Ring dance — frame 3 — 200 × 128 px
- `gl_ring_4` Ring dance — frame 4 — 200 × 128 px
- `gl_family_1` Family — frame 1 — 200 × 128 px
- `gl_family_2` Family — frame 2 — 200 × 128 px
- `gl_family_3` Family — frame 3 — 200 × 128 px
- `gl_family_4` Family — frame 4 — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_grp_opts

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Ring dance, eight freed spirits holding hands in a ring, dancing round (about 2× the hero's height): (1) the ring with everyone stepping to the left; (2) the ring turned a little, legs mid-step, skirts swinging; (3) turned further, arms lifted together; (4) turned back nearly to the start, heads thrown back laughing.
Row 2 — Family, a family of freed spirits: two adults, a grandparent and a child on a shoulder (about 2× the hero's height): (1) hugging close, smiling; (2) the child on the shoulder waving one arm; (3) the grandparent laughing, patting the child; (4) all leaning in for a cuddle.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop_2

Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly · wave 56 · 8 items, 4 × 2 · 1536x1024

- `gl_guard_1` Honour guard — frame 1 — 200 × 128 px
- `gl_guard_2` Honour guard — frame 2 — 200 × 128 px
- `gl_guard_3` Honour guard — frame 3 — 200 × 128 px
- `gl_guard_4` Honour guard — frame 4 — 200 × 128 px
- `gl_hearth_tale_1` Tale by the hearth — frame 1 — 200 × 128 px
- `gl_hearth_tale_2` Tale by the hearth — frame 2 — 200 × 128 px
- `gl_hearth_tale_3` Tale by the hearth — frame 3 — 200 × 128 px
- `gl_hearth_tale_4` Tale by the hearth — frame 4 — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_grp2, sc_spirit_grp_opts

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Honour guard, five tall ancestor spirits with spears and shields of light (about 2× the hero's height): (1) standing to attention; (2) raising their spears in salute together; (3) spears high, shields lifted; (4) lowering spears back to rest, one nodding.
Row 2 — Tale by the hearth, a grandmother of light telling a story by a small blue ghost-fire, children and a father leaning in (about 2× the hero's height): (1) the teller with hands spread wide, children listening; (2) the teller leaning in, whispering, the fire low; (3) the teller throwing up her arms, the fire flaring up, children jumping; (4) everyone laughing, the fire settling.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop_3

Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly · wave 56 · 8 items, 4 × 2 · 1536x1024

- `gl_reel_1` The reel — frame 1 — 200 × 128 px
- `gl_reel_2` The reel — frame 2 — 200 × 128 px
- `gl_reel_3` The reel — frame 3 — 200 × 128 px
- `gl_reel_4` The reel — frame 4 — 200 × 128 px
- `gl_sparring_1` Sparring ancestors — frame 1 — 200 × 128 px
- `gl_sparring_2` Sparring ancestors — frame 2 — 200 × 128 px
- `gl_sparring_3` Sparring ancestors — frame 3 — 200 × 128 px
- `gl_sparring_4` Sparring ancestors — frame 4 — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_grp2

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — The reel, six spirits dancing a lively reel round a fiddler and a drummer (about 2× the hero's height): (1) dancers stepping right, the fiddler bowing; (2) dancers mid-spin, cloaks swinging out; (3) dancers stepping left, the drummer striking; (4) dancers clapping, the fiddler raising the bow.
Row 2 — Sparring ancestors, two ancestor warriors sparring with glowing practice swords and round shields, two more watching (about 2× the hero's height): (1) swords raised, circling each other; (2) a swing blocked on a shield, sparks of light; (3) the other striking back, the first stepping away; (4) both lowering swords and laughing, the watchers cheering.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop_4

Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly · wave 56 · 8 items, 4 × 2 · 1536x1024

- `gl_mead_bench_1` Mead bench — frame 1 — 200 × 128 px
- `gl_mead_bench_2` Mead bench — frame 2 — 200 × 128 px
- `gl_mead_bench_3` Mead bench — frame 3 — 200 × 128 px
- `gl_mead_bench_4` Mead bench — frame 4 — 200 × 128 px
- `gl_tafl_1` Game of tafl — frame 1 — 200 × 128 px
- `gl_tafl_2` Game of tafl — frame 2 — 200 × 128 px
- `gl_tafl_3` Game of tafl — frame 3 — 200 × 128 px
- `gl_tafl_4` Game of tafl — frame 4 — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_grp2

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Mead bench, four spirits on a bench round a plank table with mead horns (about 2× the hero's height): (1) talking and gesturing; (2) raising horns in a toast; (3) drinking, heads tipped back; (4) slamming the horns down, roaring with laughter.
Row 2 — Game of tafl, two old spirits over a hnefatafl board, three watching (about 2× the hero's height): (1) one thinking, chin in hand; (2) reaching out to move a piece; (3) the piece moved, the watchers pointing; (4) the other player throwing up his hands, everyone laughing.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop_5

Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly · wave 56 · 8 items, 4 × 2 · 1536x1024

- `gl_tag_1` Children at play — frame 1 — 200 × 128 px
- `gl_tag_2` Children at play — frame 2 — 200 × 128 px
- `gl_tag_3` Children at play — frame 3 — 200 × 128 px
- `gl_tag_4` Children at play — frame 4 — 200 × 128 px
- `gl_chaingang_1` Chain gang (bound) — frame 1 — 200 × 128 px
- `gl_chaingang_2` Chain gang (bound) — frame 2 — 200 × 128 px
- `gl_chaingang_3` Chain gang (bound) — frame 3 — 200 × 128 px
- `gl_chaingang_4` Chain gang (bound) — frame 4 — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_grp2, sc_spirit_grp_opts

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Children at play, spirit children chasing round a tall ancestor who plays the troll (about 2× the hero's height): (1) the troll with arms up, children scattering; (2) the troll lunging, children running round him; (3) a child caught and lifted up laughing; (4) the child set down, the chase starting again.
Row 2 — Chain gang (bound), five BOUND spirits chained together hauling an ore cart, heads down (about 2× the hero's height): (1) leaning into the chains, the cart still; (2) one step forward, the cart creaking; (3) the next step, a spirit stumbling; (4) pausing, wiping brows, chains slack.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop_6

Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly · wave 56 · 8 items, 4 × 2 · 1536x1024

- `gl_haul_1` The great haul (bound) — frame 1 — 200 × 128 px
- `gl_haul_2` The great haul (bound) — frame 2 — 200 × 128 px
- `gl_haul_3` The great haul (bound) — frame 3 — 200 × 128 px
- `gl_haul_4` The great haul (bound) — frame 4 — 200 × 128 px
- `gl_glima_1` Glima wrestling — frame 1 — 200 × 128 px
- `gl_glima_2` Glima wrestling — frame 2 — 200 × 128 px
- `gl_glima_3` Glima wrestling — frame 3 — 200 × 128 px
- `gl_glima_4` Glima wrestling — frame 4 — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_grp2, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — The great haul (bound), BOUND spirits in chains hauling a huge carved stone on ropes and rollers (about 2× the hero's height): (1) ropes taut, everyone leaning back; (2) heaving together, the stone moving a little; (3) a rest, ropes sagging, heads bowed; (4) heaving again, straining.
Row 2 — Glima wrestling, two spirit youths wrestling glima-style, gripping each other’s belts, two friends cheering (about 2× the hero's height): (1) circling with grips on the belts; (2) one lifting the other off his feet; (3) the throw, both tumbling; (4) both on the ground laughing, a hand up to help.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop_7

Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly · wave 56 · 8 items, 4 × 2 · 1536x1024

- `gl_archery_1` Archery contest — frame 1 — 200 × 128 px
- `gl_archery_2` Archery contest — frame 2 — 200 × 128 px
- `gl_archery_3` Archery contest — frame 3 — 200 × 128 px
- `gl_archery_4` Archery contest — frame 4 — 200 × 128 px
- `gl_skald_1` The skald — frame 1 — 200 × 128 px
- `gl_skald_2` The skald — frame 2 — 200 × 128 px
- `gl_skald_3` The skald — frame 3 — 200 × 128 px
- `gl_skald_4` The skald — frame 4 — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Archery contest, three spirits shooting bows of light at a straw target, one keeping score (about 2× the hero's height): (1) drawing the bow, aiming; (2) loosing, the arrow of light flying; (3) the arrow in the target, the scorer pointing; (4) cheering, the next archer stepping up.
Row 2 — The skald, a skald of light singing with a lyre, five spirits sitting round listening (about 2× the hero's height): (1) singing softly, listeners still; (2) striking a big chord, arms wide; (3) a listener wiping a tear, the song gentle; (4) everyone clapping as the song ends.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop_8

Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly · wave 56 · 8 items, 4 × 2 · 1536x1024

- `gl_lantern_parade_1` Lantern parade — frame 1 — 200 × 128 px
- `gl_lantern_parade_2` Lantern parade — frame 2 — 200 × 128 px
- `gl_lantern_parade_3` Lantern parade — frame 3 — 200 × 128 px
- `gl_lantern_parade_4` Lantern parade — frame 4 — 200 × 128 px
- `gl_weaving_1` Weaving circle — frame 1 — 200 × 128 px
- `gl_weaving_2` Weaving circle — frame 2 — 200 × 128 px
- `gl_weaving_3` Weaving circle — frame 3 — 200 × 128 px
- `gl_weaving_4` Weaving circle — frame 4 — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Lantern parade, five spirit children walking in a little line carrying lanterns on poles (about 2× the hero's height): (1) marching, lanterns high; (2) swinging the lanterns side to side; (3) spinning in place, lanterns trailing light; (4) marching on, the last one skipping.
Row 2 — Weaving circle, two spirit women at an upright loom, one spinning wool on a drop spindle, a girl holding the yarn (about 2× the hero's height): (1) passing the shuttle through; (2) beating the weft down; (3) the spindle twirling, yarn running; (4) showing the cloth, smiling.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop_9

Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly · wave 56 · 8 items, 4 × 2 · 1536x1024

- `gl_roast_1` Ghost-fire feast — frame 1 — 200 × 128 px
- `gl_roast_2` Ghost-fire feast — frame 2 — 200 × 128 px
- `gl_roast_3` Ghost-fire feast — frame 3 — 200 × 128 px
- `gl_roast_4` Ghost-fire feast — frame 4 — 200 × 128 px
- `gl_knattleikr_1` Knattleikr — frame 1 — 200 × 128 px
- `gl_knattleikr_2` Knattleikr — frame 2 — 200 × 128 px
- `gl_knattleikr_3` Knattleikr — frame 3 — 200 × 128 px
- `gl_knattleikr_4` Knattleikr — frame 4 — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Ghost-fire feast, five spirits round a spit roasting over a blue ghost-fire, plates in hand (about 2× the hero's height): (1) turning the spit; (2) tasting, one licking fingers; (3) passing plates round; (4) laughing, the fire flaring.
Row 2 — Knattleikr, four spirits playing the old ball game with sticks and a glowing ball (about 2× the hero's height): (1) facing off, sticks down; (2) one striking the ball, it flies; (3) two chasing, a stick swinging; (4) the ball caught, arms up in triumph.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop_10

Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly · wave 56 · 4 items, 4 × 1 · 1536x1024

- `gl_rune_carving_1` Rune carving — frame 1 — 200 × 128 px
- `gl_rune_carving_2` Rune carving — frame 2 — 200 × 128 px
- `gl_rune_carving_3` Rune carving — frame 3 — 200 × 128 px
- `gl_rune_carving_4` Rune carving — frame 4 — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — spirit groups on the village green, 4-frame loops: each row is ONE group shown four times in sequence (the same people, same place, same size), moving a little from frame to frame so it plays as a living loop; spirits are translucent glowing people of pale-blue runic light (Norse ancestors, lantern folk, aurora-robed), friendly.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 4 columns × 1 rows, evenly spaced. Each ROW is ONE subject drawn 4 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Rune carving, an old carver cutting runes into a standing stone with mallet and chisel, two watching (about 2× the hero's height): (1) the chisel set, mallet raised; (2) a strike, chips of stone flying; (3) blowing the dust away; (4) the runes glowing as the watchers admire them.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit_opts_a

Spirit looks, options 1–4 — top row BOUND, bottom row the same spirit FREED; each a person, adult proportions, seen from above-front like the game characters · wave 54 · 8 items, 4 × 2 · 1536x1024

- `sp_opt_ancestor_bound` Ancestor warrior, bound — 72 × 104 px
- `sp_opt_lantern_bound` Lantern folk, bound — 72 × 104 px
- `sp_opt_aurora_bound` Aurora-robed, bound — 72 × 104 px
- `sp_opt_runelit_bound` Rune-drawn, bound — 72 × 104 px
- `sp_opt_ancestor_free` Ancestor warrior, freed — 72 × 104 px
- `sp_opt_lantern_free` Lantern folk, freed — 72 × 104 px
- `sp_opt_aurora_free` Aurora-robed, freed — 72 × 104 px
- `sp_opt_runelit_free` Rune-drawn, freed — 72 × 104 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Spirit looks, options 1–4 — top row BOUND, bottom row the same spirit FREED; each a person, adult proportions, seen from above-front like the game characters.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Ancestor warrior, bound — a translucent Norse warrior ancestor of glowing pale-blue light: braided beard or braids, a simple helm, a cloak, rune tattoos on the arms that glow brighter cyan — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, its light dimmed (about 1.7× the hero's height).
2. Lantern folk, bound — a translucent villager of glowing pale-blue light carrying a small lantern; a bright rune-shaped heart of light shows through the chest — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, its light dimmed (about 1.7× the hero's height).
3. Aurora-robed, bound — an elegant tall spirit in long flowing robes that dissolve at the hem into ribbons of aurora light (teal, green and violet), long hair drifting as if underwater — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, its light dimmed (about 1.7× the hero's height).
4. Rune-drawn, bound — a person drawn only in glowing cyan rune-lines and constellation points, like a living carving of light, hollow and dark between the lines — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, its light dimmed (about 1.7× the hero's height).
5. Ancestor warrior, freed — a translucent Norse warrior ancestor of glowing pale-blue light: braided beard or braids, a simple helm, a cloak, rune tattoos on the arms that glow brighter cyan — FREED: no chains, floating a little above the ground, arms open, smiling, glowing at full brightness with a few motes of light around (about 1.7× the hero's height).
6. Lantern folk, freed — a translucent villager of glowing pale-blue light carrying a small lantern; a bright rune-shaped heart of light shows through the chest — FREED: no chains, floating a little above the ground, arms open, smiling, glowing at full brightness with a few motes of light around (about 1.7× the hero's height).
7. Aurora-robed, freed — an elegant tall spirit in long flowing robes that dissolve at the hem into ribbons of aurora light (teal, green and violet), long hair drifting as if underwater — FREED: no chains, floating a little above the ground, arms open, smiling, glowing at full brightness with a few motes of light around (about 1.7× the hero's height).
8. Rune-drawn, freed — a person drawn only in glowing cyan rune-lines and constellation points, like a living carving of light, hollow and dark between the lines — FREED: no chains, floating a little above the ground, arms open, smiling, glowing at full brightness with a few motes of light around (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit_opts_b

Spirit looks, options 5–8 — top row BOUND, bottom row the same spirit FREED; each a person, adult proportions, seen from above-front like the game characters · wave 54 · 8 items, 4 × 2 · 1536x1024

- `sp_opt_winged_bound` Valkyrie-touched, bound — 72 × 104 px
- `sp_opt_glass_bound` Soulglass, bound — 72 × 104 px
- `sp_opt_ember_bound` Ash and starlight, bound — 72 × 104 px
- `sp_opt_starcloak_bound` Starcloak, bound — 72 × 104 px
- `sp_opt_winged_free` Valkyrie-touched, freed — 72 × 104 px
- `sp_opt_glass_free` Soulglass, freed — 72 × 104 px
- `sp_opt_ember_free` Ash and starlight, freed — 72 × 104 px
- `sp_opt_starcloak_free` Starcloak, freed — 72 × 104 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Spirit looks, options 5–8 — top row BOUND, bottom row the same spirit FREED; each a person, adult proportions, seen from above-front like the game characters.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Valkyrie-touched, bound — a spirit warrior-maiden or youth of pale light with a faint feathered cloak that becomes wings of light — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, its light dimmed (about 1.7× the hero's height).
2. Soulglass, bound — a person whose body is faceted soulglass crystal, light refracting through it in soft rainbows, a bright core glowing in the chest — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, its light dimmed (about 1.7× the hero's height).
3. Ash and starlight, bound — a spirit whose bound form is dimmed ash-grey with ember cracks, and whose freed form is bright white-blue starfire with a flame-like crown of hair — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, its light dimmed (about 1.7× the hero's height).
4. Starcloak, bound — a hooded figure in a deep cloak whose inside is a night sky of slowly turning stars, a calm face of pale light in the hood — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, its light dimmed (about 1.7× the hero's height).
5. Valkyrie-touched, freed — a spirit warrior-maiden or youth of pale light with a faint feathered cloak that becomes wings of light — FREED: no chains, floating a little above the ground, arms open, smiling, glowing at full brightness with a few motes of light around (about 1.7× the hero's height).
6. Soulglass, freed — a person whose body is faceted soulglass crystal, light refracting through it in soft rainbows, a bright core glowing in the chest — FREED: no chains, floating a little above the ground, arms open, smiling, glowing at full brightness with a few motes of light around (about 1.7× the hero's height).
7. Ash and starlight, freed — a spirit whose bound form is dimmed ash-grey with ember cracks, and whose freed form is bright white-blue starfire with a flame-like crown of hair — FREED: no chains, floating a little above the ground, arms open, smiling, glowing at full brightness with a few motes of light around (about 1.7× the hero's height).
8. Starcloak, freed — a hooded figure in a deep cloak whose inside is a night sky of slowly turning stars, a calm face of pale light in the hood — FREED: no chains, floating a little above the ground, arms open, smiling, glowing at full brightness with a few motes of light around (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit_grp_opts

Spirit groupings — options to pick from (spirits are translucent glowing people of pale light-blue runic light, adult proportions, friendly) · wave 54 · 8 items, 4 × 2 · 1536x1024

- `sp_grp_ring` Ring dance — 190 × 120 px
- `sp_grp_procession` Lantern procession — 190 × 120 px
- `sp_grp_family` Family — 190 × 120 px
- `sp_grp_choir` Choir — 190 × 120 px
- `sp_grp_spiral` Rising spiral — 190 × 120 px
- `sp_grp_fire` Round the ghost-fire — 190 × 120 px
- `sp_grp_guard` Honour guard — 190 × 120 px
- `sp_grp_chaingang` Chain gang — 190 × 120 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Spirit groupings — options to pick from (spirits are translucent glowing people of pale light-blue runic light, adult proportions, friendly).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Ring dance — eight freed spirits holding hands in a ring, dancing round, the ring seen from above-front (about 1.9× the hero's height).
2. Lantern procession — a winding line of seven spirits walking one behind the other carrying lanterns (about 1.9× the hero's height).
3. Family — a family of freed spirits: two adults, a grandparent and a child riding on a shoulder, hugging (about 1.9× the hero's height).
4. Choir — two rows of spirits singing, mouths open, motes of light rising from the song (about 1.9× the hero's height).
5. Rising spiral — a dozen small spirits rising in a spiral column of light towards the sky (about 1.9× the hero's height).
6. Round the ghost-fire — six spirits sitting round a small cold blue ghost-fire, talking and laughing (about 1.9× the hero's height).
7. Honour guard — a line of five tall ancestor spirits standing to attention with spears and shields of light (about 1.9× the hero's height).
8. Chain gang — a line of five BOUND spirits chained neck to neck, hauling a cart of ore, heads down (about 1.9× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_bindstone_opts_a

Bindstones (the stones the spirits are chained to), options 1–4 — top row BOUND, bottom row FREED; grand, about twice a person’s height · wave 54 · 8 items, 4 × 2 · 1536x1024

- `bs_opt_carved_bound` Carved serpent stone, bound — 96 × 128 px
- `bs_opt_gate_bound` Stone gate, bound — 96 × 128 px
- `bs_opt_cage_bound` Caged stone, bound — 96 × 128 px
- `bs_opt_obelisk_bound` Obsidian obelisk, bound — 96 × 128 px
- `bs_opt_carved_free` Carved serpent stone, freed — 96 × 128 px
- `bs_opt_gate_free` Stone gate, freed — 96 × 128 px
- `bs_opt_cage_free` Caged stone, freed — 96 × 128 px
- `bs_opt_obelisk_free` Obsidian obelisk, freed — 96 × 128 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Bindstones (the stones the spirits are chained to), options 1–4 — top row BOUND, bottom row FREED; grand, about twice a person’s height.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Carved serpent stone, bound — a tall grey runestone carved with a great knot-serpent band like the old Jelling stones, painted red runes — BOUND: wrapped in heavy chains that run to iron stakes in the ground, its runes and seams glowing an angry red-orange, scorched ground and a little smoke (about 2× the hero's height).
2. Stone gate, bound — two rough standing stones with a lintel stone across the top, forming a gate — BOUND: wrapped in heavy chains that run to iron stakes in the ground, its runes and seams glowing an angry red-orange, scorched ground and a little smoke (about 2× the hero's height).
3. Caged stone, bound — a runestone inside a cage of black iron bars with spikes on top — BOUND: wrapped in heavy chains that run to iron stakes in the ground, its runes and seams glowing an angry red-orange, scorched ground and a little smoke (about 2× the hero's height).
4. Obsidian obelisk, bound — a black obsidian obelisk cracked with seams — BOUND: wrapped in heavy chains that run to iron stakes in the ground, its runes and seams glowing an angry red-orange, scorched ground and a little smoke (about 2× the hero's height).
5. Carved serpent stone, freed — a tall grey runestone carved with a great knot-serpent band like the old Jelling stones, painted red runes — FREED: the chains broken and lying on the ground, the runes glowing a calm light blue, fresh grass and small flowers around it, a soft glow (about 2× the hero's height).
6. Stone gate, freed — two rough standing stones with a lintel stone across the top, forming a gate — FREED: the chains broken and lying on the ground, the runes glowing a calm light blue, fresh grass and small flowers around it, a soft glow (about 2× the hero's height).
7. Caged stone, freed — a runestone inside a cage of black iron bars with spikes on top — FREED: the chains broken and lying on the ground, the runes glowing a calm light blue, fresh grass and small flowers around it, a soft glow (about 2× the hero's height).
8. Obsidian obelisk, freed — a black obsidian obelisk cracked with seams — FREED: the chains broken and lying on the ground, the runes glowing a calm light blue, fresh grass and small flowers around it, a soft glow (about 2× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_bindstone_opts_b

Bindstones, options 5–8 — top row BOUND, bottom row FREED; grand, about twice a person’s height · wave 54 · 8 items, 4 × 2 · 1536x1024

- `bs_opt_circle_bound` Little stone circle, bound — 96 × 128 px
- `bs_opt_tree_bound` Petrified world-tree stump, bound — 96 × 128 px
- `bs_opt_altar_bound` Binding altar, bound — 96 × 128 px
- `bs_opt_crystal_bound` Shell of soulglass, bound — 96 × 128 px
- `bs_opt_circle_free` Little stone circle, freed — 96 × 128 px
- `bs_opt_tree_free` Petrified world-tree stump, freed — 96 × 128 px
- `bs_opt_altar_free` Binding altar, freed — 96 × 128 px
- `bs_opt_crystal_free` Shell of soulglass, freed — 96 × 128 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Bindstones, options 5–8 — top row BOUND, bottom row FREED; grand, about twice a person’s height.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Little stone circle, bound — five short standing stones in a ring around a taller central pillar, on a round paved floor — BOUND: wrapped in heavy chains that run to iron stakes in the ground, its runes and seams glowing an angry red-orange, scorched ground and a little smoke (about 2× the hero's height).
2. Petrified world-tree stump, bound — a petrified tree stump of stone with great roots, runes carved into its bark — BOUND: wrapped in heavy chains that run to iron stakes in the ground, its runes and seams glowing an angry red-orange, scorched ground and a little smoke (about 2× the hero's height).
3. Binding altar, bound — a flat altar stone on two plinths with an iron brazier beside it — BOUND: wrapped in heavy chains that run to iron stakes in the ground, its runes and seams glowing an angry red-orange, scorched ground and a little smoke (about 2× the hero's height).
4. Shell of soulglass, bound — a pillar of pale-blue soulglass crystal trapped inside a cracked shell of dark stone — BOUND: wrapped in heavy chains that run to iron stakes in the ground, its runes and seams glowing an angry red-orange, scorched ground and a little smoke (about 2× the hero's height).
5. Little stone circle, freed — five short standing stones in a ring around a taller central pillar, on a round paved floor — FREED: the chains broken and lying on the ground, the runes glowing a calm light blue, fresh grass and small flowers around it, a soft glow (about 2× the hero's height).
6. Petrified world-tree stump, freed — a petrified tree stump of stone with great roots, runes carved into its bark — FREED: the chains broken and lying on the ground, the runes glowing a calm light blue, fresh grass and small flowers around it, a soft glow (about 2× the hero's height).
7. Binding altar, freed — a flat altar stone on two plinths with an iron brazier beside it — FREED: the chains broken and lying on the ground, the runes glowing a calm light blue, fresh grass and small flowers around it, a soft glow (about 2× the hero's height).
8. Shell of soulglass, freed — a pillar of pale-blue soulglass crystal trapped inside a cracked shell of dark stone — FREED: the chains broken and lying on the ground, the runes glowing a calm light blue, fresh grass and small flowers around it, a soft glow (about 2× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_int_mira

Interior furniture — Mira the Mechanic’s workshop · wave 54 · 4 items, 2 × 2 · 1024x1024

- `if_crucible` Smelting furnace — 72 × 88 px
- `if_traybench` Tray workbench — 112 × 52 px
- `iw_gears` Wall of gears — 44 × 34 px
- `iw_blueprints` Blueprints — 40 × 28 px

Attach: style_hero, style_centaur, sc_int_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 4 separate pieces of scenery — Interior furniture — Mira the Mechanic’s workshop.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 4 objects in a grid of 2 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Smelting furnace — a small round brick smelting furnace with a glowing crucible of molten metal on top, tongs leaning against it (about 1.4× the hero's height).
2. Tray workbench — a long sturdy workbench with metal tray moulds, a half-finished round metal tray with an empty gem setting, small hammers and goggles (about as tall as the hero).
3. Wall of gears — brass gears and copper pipes mounted on a wooden board, one big gear in the middle (about 0.5× the hero's height).
4. Blueprints — three blueprints of trays and lifts pinned to the wall with brass tacks (about 0.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_trays

Soul gems, island metals and hearth trays — game icons · wave 54 · 12 items, 4 × 3 · 1024x1024

- `ic_grovesoul` Grovesoul — 48 × 48 px
- `ic_tidesoul` Tidesoul — 48 × 48 px
- `ic_stonesoul` Stonesoul — 48 × 48 px
- `ic_embersoul` Embersoul — 48 × 48 px
- `ic_sea_silver` Sea-silver — 48 × 48 px
- `ic_bog_iron` Bog-iron — 48 × 48 px
- `ic_fire_bronze` Fire-bronze — 48 × 48 px
- `ic_rime_steel` Rime-steel — 48 × 48 px
- `ic_hearth_tray_1` Ember Hearth Tray — 48 × 48 px
- `ic_hearth_tray_2` Cinder Hearth Tray — 48 × 48 px
- `ic_hearth_tray_3` Slag Hearth Tray — 48 × 48 px
- `ic_hearth_tray_4` Ash Hearth Tray — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate game icons — Soul gems, island metals and hearth trays — game icons.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Grovesoul — a green soul gem with a living leaf of light inside.
2. Tidesoul — a sea-blue soul gem with a tiny wave rolling inside.
3. Stonesoul — an amber soul gem with a slow heartbeat of stone-light.
4. Embersoul — a red soul gem with an ember inside that never goes out.
5. Sea-silver — an ingot of bright silver with a faint wave pattern.
6. Bog-iron — a dark rough iron ingot with a root-like grain.
7. Fire-bronze — a red-gold bronze ingot with a warm glow.
8. Rime-steel — a blue-white steel ingot with frost on its edges.
9. Ember Hearth Tray — a round silver tray with a green gem set in its centre and knotwork on the rim.
10. Cinder Hearth Tray — a round dark-iron tray with a blue gem set in its centre and knotwork on the rim.
11. Slag Hearth Tray — a round bronze tray with an amber gem set in its centre and knotwork on the rim.
12. Ash Hearth Tray — a round blue-white steel tray with a red gem set in its centre and knotwork on the rim.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit_anim

Animation frames — a trapped spirit: a translucent, softly glowing person made of pale light-blue light (runic cyan, #6fe3f5), friendly face, simple village clothes, the lower legs fading into a wisp; seen from above-front like the game characters · wave 53 · 12 items, 6 × 2 · 1536x1024

- `an_spirit_toil_1` Toiling spirit — frame 1 — 40 × 60 px
- `an_spirit_toil_2` Toiling spirit — frame 2 — 40 × 60 px
- `an_spirit_toil_3` Toiling spirit — frame 3 — 40 × 60 px
- `an_spirit_toil_4` Toiling spirit — frame 4 — 40 × 60 px
- `an_spirit_toil_5` Toiling spirit — frame 5 — 40 × 60 px
- `an_spirit_toil_6` Toiling spirit — frame 6 — 40 × 60 px
- `an_spirit_free_1` Freed spirit — frame 1 — 40 × 60 px
- `an_spirit_free_2` Freed spirit — frame 2 — 40 × 60 px
- `an_spirit_free_3` Freed spirit — frame 3 — 40 × 60 px
- `an_spirit_free_4` Freed spirit — frame 4 — 40 × 60 px
- `an_spirit_free_5` Freed spirit — frame 5 — 40 × 60 px
- `an_spirit_free_6` Freed spirit — frame 6 — 40 × 60 px

Attach: style_hero, style_centaur, sc_anim_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — a trapped spirit: a translucent, softly glowing person made of pale light-blue light (runic cyan, #6fe3f5), friendly face, simple village clothes, the lower legs fading into a wisp; seen from above-front like the game characters.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 6 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 6 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Toiling spirit, in chains, made to dig: an iron shackle and chain on one ankle, swinging a heavy pick at the rock, tired and frustrated, shoulders slumped, brow furrowed (about as tall as the hero): (1) pick raised high behind the head; (2) pick swinging down; (3) pick striking the ground, a few sparks; (4) pulling the pick back out, sighing; (5) leaning on the pick, wiping the brow, looking weary; (6) lifting the pick again.
Row 2 — Freed spirit, free and relaxed: no chains, floating a little above the ground, a gentle smile, glowing a little brighter (about as tall as the hero): (1) floating, arms relaxed at the sides; (2) rising a touch, arms lifting slightly; (3) arms open, face turned up, smiling; (4) floating at its highest, eyes closed, peaceful; (5) sinking a touch, arms lowering; (6) back to the start, a little wave of the hand.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit_sets

Freed spirits and their bindstones — spirits are translucent, softly glowing people of pale light-blue runic light (#6fe3f5), friendly, in simple village clothes, their lower legs fading into a wisp · wave 53 · 8 items, 4 × 2 · 1536x1024

- `sp_group_2` Two spirits — 64 × 64 px
- `sp_group_3` Three spirits — 90 × 64 px
- `sp_group_4` Four spirits — 110 × 70 px
- `sp_group_6` Six spirits — 140 × 80 px
- `sp_group_10` Ten spirits — 190 × 100 px
- `sp_toil_line` Spirits in a chain gang — 190 × 80 px
- `sp_bindstone` Bindstone, bound — 48 × 80 px
- `sp_bindstone_free` Bindstone, freed — 48 × 80 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Freed spirits and their bindstones — spirits are translucent, softly glowing people of pale light-blue runic light (#6fe3f5), friendly, in simple village clothes, their lower legs fading into a wisp.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Two spirits — two freed spirits side by side, relaxed and smiling, one with a hand on the other's shoulder (about as tall as the hero).
2. Three spirits — three freed spirits gathered together, chatting happily (about as tall as the hero).
3. Four spirits — four freed spirits in a loose ring, relaxed, glowing (about as tall as the hero).
4. Six spirits — six freed spirits gathered in two little rows, some waving (about 1.3× the hero's height).
5. Ten spirits — a crowd of ten freed spirits gathered close together, glowing softly, a few looking up (about 1.6× the hero's height).
6. Spirits in a chain gang — a line of four trapped spirits chained together at the ankles, carrying baskets of ore and picks, weary and frustrated (about 1.3× the hero's height).
7. Bindstone, bound — a tall grey standing runestone wrapped in heavy iron chains, its carved runes glowing an angry red-orange, a chain running from it along the ground (about 1.3× the hero's height).
8. Bindstone, freed — the same tall grey runestone, its broken chains lying on the ground around it, its carved runes glowing a calm light blue (about 1.3× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_glimmerhall

The Glimmerhall — the most impressive building in the village · wave 53 · 2 items, 2 × 1 · 1536x1024

- `vb_glimmerhall` The Glimmerhall — 280 × 300 px
- `np_solveig` Sólveig the Glasswright — 48 × 88 px

Attach: style_hero, style_centaur, sc_vill_core_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 2 separate pieces of scenery — The Glimmerhall — the most impressive building in the village.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 2 objects in a grid of 2 columns × 1 rows, evenly spaced, in this order (left to right, top row first):
1. The Glimmerhall — the grandest building in a Norse-style village: a hall of pale carved stone and timber crowned with a great dome and tall windows of glass, every pane etched with runes that glow light blue (#6fe3f5), slender glass spires at its corners, a wide arched doorway with glowing glass doors, a glass furnace's soft glow inside, flower boxes (about 4.8× the hero's height).
2. Sólveig the Glasswright — a kind, wise woman glassmaker standing, long silver-blond braids, a blue dress under a leather apron, thick gloves tucked in her belt, holding up a small glowing light-blue shard of glass in one hand, full figure, front view (about 1.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_spirit

Soulglass — game icons · wave 53 · 8 items, 4 × 2 · 1024x1024

- `ic_soulglass_1` Soulglass shard (Grasslands) — 48 × 48 px
- `ic_soulglass_2` Soulglass shard (Wetlands) — 48 × 48 px
- `ic_soulglass_3` Soulglass shard (Highlands) — 48 × 48 px
- `ic_soulglass_4` Soulglass shard (Ashlands) — 48 × 48 px
- `ic_soulglass_lattice_1` Ember lattice — 48 × 48 px
- `ic_soulglass_lattice_2` Cinder lattice — 48 × 48 px
- `ic_soulglass_lattice_3` Slag lattice — 48 × 48 px
- `ic_soulglass_lattice_4` Ash lattice — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate game icons — Soulglass — game icons.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Soulglass shard (Grasslands) — a jagged shard of glowing light-blue glass with a faint green leaf-rune inside.
2. Soulglass shard (Wetlands) — a jagged shard of glowing light-blue glass with a faint deep-blue wave-rune inside.
3. Soulglass shard (Highlands) — a jagged shard of glowing light-blue glass with a faint amber mountain-rune inside.
4. Soulglass shard (Ashlands) — a jagged shard of glowing light-blue glass with a faint red flame-rune inside.
5. Ember lattice — six light-blue glass shards fused into a round lattice of glowing runes, with a green leaf-rune at its heart.
6. Cinder lattice — six light-blue glass shards fused into a round lattice of glowing runes, with a deep-blue wave-rune at its heart.
7. Slag lattice — six light-blue glass shards fused into a round lattice of glowing runes, with an amber mountain-rune at its heart.
8. Ash lattice — six light-blue glass shards fused into a round lattice of glowing runes, with a red flame-rune at its heart.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ent_forges

The four Forges of Muspelheim and the great gate of Muspelheim — entrances in the sea, each a door into a volcano, seen from above-front like the other site entrances · wave 52 · 5 items, 3 × 2 · 1536x1024

- `en_forge_ember` Ember Forge — 170 × 170 px
- `en_forge_cinder` Cinder Forge — 170 × 170 px
- `en_forge_slag` Slag Forge — 170 × 170 px
- `en_forge_ash` Ash Forge — 170 × 170 px
- `en_muspelheim` Muspelheim, the great gate — 300 × 300 px

Attach: style_hero, style_centaur, sc_ent_dungeon

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 5 separate pieces of scenery — The four Forges of Muspelheim and the great gate of Muspelheim — entrances in the sea, each a door into a volcano, seen from above-front like the other site entrances.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 5 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first); the last 1 cell(s) stay empty:
1. Ember Forge — a squat volcanic cone of black basalt rising from the sea, green moss and wildflowers clinging to its lower flanks, a great arched forge-mouth at its foot glowing ember-orange behind iron doors with an anvil-and-leaf emblem, embers drifting up from its crater (about 2.7× the hero's height).
2. Cinder Forge — a squat volcanic cone of wet black basalt standing in shallow sea water, steam hissing where little lava channels meet the waves, an arched forge-mouth glowing orange behind iron doors with an anvil-and-wave emblem, cinders and steam rising from its crater (about 2.7× the hero's height).
3. Slag Forge — a squat volcanic cone of rough grey slag and stone, dwarven stone buttresses and stairs carved into it, molten slag runoff down its sides, an arched forge-mouth glowing orange behind iron doors with an anvil-and-mountain emblem (about 2.7× the hero's height).
4. Ash Forge — a squat volcanic cone of pale ash-grey stone with glowing red cracks, heavy chains bolted across it, an arched forge-mouth glowing deep red behind iron doors with an anvil-and-flame emblem, ash falling from its crater (about 2.7× the hero's height).
5. Muspelheim, the great gate — the towering flank of a huge volcano of black obsidian and basalt: a colossal gate carved in the shape of a fire-giant's hall, two giant stone fire-giants carved either side, rivers of lava falling beside it, four glowing keyholes on the doors (orange, teal, grey and red, one for each forge), smoke and fire above (about 4.8× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_fx_bolts

Painted attack effects 4 — small lights, sparks and streams, painted on a PURE BLACK background (laid over the game as light, so the black must stay pure black). The ones described as WHITE must be painted in white and very pale grey only, because the game colours them · wave 51 · 8 items, 4 × 2 · 1536x1024

- `fx_mote` Spirit mote — 64 × 64 px
- `fx_ember` Ember — 64 × 64 px
- `fx_frost_glint` Frost glint — 64 × 64 px
- `fx_lash` Lash — 256 × 48 px
- `fx_drain_stream` Life drain — 256 × 48 px
- `fx_fam_beam` Spirit wave — 256 × 64 px
- `fx_bolt_arc` Lightning arc — 256 × 64 px
- `fx_ring_wave` Force ring — 256 × 256 px

Attach: style_hero, style_centaur, sc_fx_ground

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Painted attack effects 4 — small lights, sparks and streams, painted on a PURE BLACK background (laid over the game as light, so the black must stay pure black). The ones described as WHITE must be painted in white and very pale grey only, because the game colours them.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Spirit mote — a single small soft glowing mote of WHITE light with a tiny four-point twinkle, round and soft-edged (about 1× the hero's height across).
2. Ember — a single small glowing orange-red ember with a faint flicker of flame around it (about 1× the hero's height across).
3. Frost glint — a single tiny ice crystal glinting pale blue-white, a small star of light on it (about 1× the hero's height across).
4. Lash — a WHITE whip-like tendril of energy, a long thin curling streak of light with a brighter core, running straight from left to right (about 4.1× the hero's height across).
5. Life drain — a WHITE stream of swirling life-force: a ribbon of light twisting around itself with small droplets of light along it, running straight from left to right (about 4.1× the hero's height across).
6. Spirit wave — a WHITE rolling wave of spirit light, a broad soft band with a bright core and small wisps peeling off its edges, running straight from left to right (about 4.1× the hero's height across).
7. Lightning arc — a WHITE jagged crackling arc of lightning with small branching forks, running from left to right (about 4.1× the hero's height across).
8. Force ring — a WHITE thin perfect ring of rippling force, a bright glowing circle line with soft light fading inward and outward, empty in the middle, seen from above (about 4.1× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_fx_solids

Painted attack pieces — things thrown and set by monsters, seen from above at a slight angle, each one whole and centred · wave 51 · 8 items, 4 × 2 · 1536x1024

- `fx_pj_rock` Thrown stone — 64 × 64 px
- `fx_pj_bomb` Fire bomb — 64 × 64 px
- `fx_trap_snare` Snare trap — 96 × 96 px
- `fx_trap_mine` Rune mine — 96 × 96 px
- `fx_trap_rune` Frost rune — 96 × 96 px
- `fx_wall_stone` Raised stone — 96 × 112 px
- `fx_smoke_puff` Smoke puff — 64 × 64 px
- `fx_fam_ring` Spirit ring — 256 × 256 px

Attach: style_hero, style_centaur, sc_edge_5

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Painted attack pieces — things thrown and set by monsters, seen from above at a slight angle, each one whole and centred.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Thrown stone — a single rough grey thrown stone with sharp edges and a few chips, mid-air (about as tall as the hero).
2. Fire bomb — a round dark iron bomb with a lit, sparking fuse and glowing cracks (about as tall as the hero).
3. Snare trap — a rope snare loop with a wooden peg lying on the ground, seen from straight above (about 1.5× the hero's height).
4. Rune mine — a small round brass mine half-buried in the ground with a glowing yellow eye in the middle, seen from straight above (about 1.5× the hero's height).
5. Frost rune — a glowing pale-blue rune circle carved into the ground, seen from straight above (about 1.5× the hero's height).
6. Raised stone — a squat block of rough earth and stone freshly heaved up out of the ground, with crumbling dirt around its base (about 1.8× the hero's height).
7. Smoke puff — a single small round puff of grey smoke, soft and fading at its edges (about as tall as the hero).
8. Spirit ring — a WHITE ring of spirit light with small wisps along it, empty in the middle, seen from above (it will be coloured by the game, so paint it in white and very pale grey only) (about 4.1× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_rugs_1

Rugs and runners that fit the rooms — seen from straight above, flat on the floor · wave 44 · 8 items, 4 × 2 · 1536x1024

- `ir_rug_wide_red` Wide red rug — 112 × 72 px
- `ir_rug_wide_blue` Wide blue rug — 112 × 72 px
- `ir_rug_wide_green` Wide green rug — 112 × 72 px
- `ir_rug_wide_purple` Wide purple rug — 112 × 72 px
- `ir_runner_red` Red runner — 44 × 128 px
- `ir_runner_blue` Blue runner — 44 × 128 px
- `ir_rug_round2` Round rug — 88 × 88 px
- `ir_rug_square` Square rug — 88 × 88 px

Attach: style_hero, style_centaur, sc_int_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Rugs and runners that fit the rooms — seen from straight above, flat on the floor.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Wide red rug — a wide rectangular woven rug, deep red with a cream border and a diamond pattern in the middle, short fringes at the two short ends (about 1.8× the hero's height across).
2. Wide blue rug — a wide rectangular woven rug, deep blue with a cream border and a star pattern in the middle, short fringes at the two short ends (about 1.8× the hero's height across).
3. Wide green rug — a wide rectangular woven rug, forest green with a gold border and a leaf pattern, short fringes at the two short ends (about 1.8× the hero's height across).
4. Wide purple rug — a wide rectangular woven rug, royal purple with a gold border and a rune pattern, short fringes at the two short ends (about 1.8× the hero's height across).
5. Red runner — a long narrow red carpet runner with a gold border, running from top to bottom (about 2× the hero's height across).
6. Blue runner — a long narrow blue carpet runner with a silver border, running from top to bottom (about 2× the hero's height across).
7. Round rug — a round braided rug in warm red, cream and brown rings (about 1.4× the hero's height across).
8. Square rug — a square woven rug, teal and cream with a compass-rose pattern (about 1.4× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_room_1

A floor of the Crystal Grotto, painted whole · wave 45 · 1 items, 1 × 1 · 1536x1024

- `room_crystal_grotto` Crystal Grotto floor — 1536 × 1024 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: A floor of the Crystal Grotto, painted whole.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw any characters, monsters or people.
Subject: a cave chamber in a dungeon: rough blue-grey rock walls along the top and both sides, a floor of dark stone with pale moss, clusters of tall glowing teal and violet crystals as cover, a shallow underground pool on one side crossed by flat stepping stones, a narrow passage leading off at the top left, a wide open doorway at the bottom middle.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the back wall runs along the top of the picture with its face visible, the floor fills the middle, the side walls run down the left and right edges. Scale: the hero would be about one twelfth of the picture's height; leave plenty of open floor to walk and fight on.
The painting fills the whole image edge to edge, as a finished game screen would. No text, no labels, no grid, no UI, no frame.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_room_2

A floor of the Elven Library tower, painted whole · wave 45 · 1 items, 1 × 1 · 1536x1024

- `room_elven_library` Elven Library floor — 1536 × 1024 px

Attach: style_hero, style_centaur, sc_room_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: A floor of the Elven Library tower, painted whole.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw any characters, monsters or people.
Subject: a round tower floor seen from above: curved pale stone walls with tall arched windows along the top, a polished wooden floor with an inlaid leaf pattern, curved bookshelves following the wall, reading tables with open books and candles, a spiral staircase at the right, a big round rug in the middle, a doorway at the bottom middle.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the back wall runs along the top of the picture with its face visible, the floor fills the middle, the side walls run down the left and right edges. Scale: the hero would be about one twelfth of the picture's height; leave plenty of open floor to walk and fight on.
The painting fills the whole image edge to edge, as a finished game screen would. No text, no labels, no grid, no UI, no frame.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_room_3

A hall of the Ember Cave, painted whole · wave 45 · 1 items, 1 × 1 · 1536x1024

- `room_ember_hall` Ember Cave hall — 1536 × 1024 px

Attach: style_hero, style_centaur, sc_room_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: A hall of the Ember Cave, painted whole.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw any characters, monsters or people.
Subject: a volcanic cave hall: black basalt walls with glowing orange cracks along the top and both sides, a floor of cooled dark crust, a river of bright flowing lava across the middle crossed by a stone bridge, obsidian spikes and a few iron braziers, smoke rising, a passage at the top right, a doorway at the bottom middle.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the back wall runs along the top of the picture with its face visible, the floor fills the middle, the side walls run down the left and right edges. Scale: the hero would be about one twelfth of the picture's height; leave plenty of open floor to walk and fight on.
The painting fills the whole image edge to edge, as a finished game screen would. No text, no labels, no grid, no UI, no frame.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_sky_bg_1

Sky-port backdrops 1 — wide skies seen from a flying ship, painted as a picture (no ground in the lower third except a far horizon) · wave 47 · 2 items, 1 × 2 · 1024x1536

- `sk_bg_1` Grasslands sky — 1280 × 800 px
- `sk_bg_2` Wetlands sky — 1280 × 800 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 2 separate pieces of scenery — Sky-port backdrops 1 — wide skies seen from a flying ship, painted as a picture (no ground in the lower third except a far horizon).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 2 objects in a grid of 1 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Grasslands sky — a bright morning sky over green rolling hills far below: soft cumulus clouds, a pale sun glow top right, distant floating grass islands with roots, warm light along the horizon (about 20.3× the hero's height across).
2. Wetlands sky — a misty teal sky over marshes and lakes far below: low drifting mist banks, pale sun through haze, a far lighthouse on the horizon, flocks of distant birds (about 20.3× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_sky_bg_2

Sky-port backdrops 2 · wave 47 · 2 items, 1 × 2 · 1024x1536

- `sk_bg_3` Highlands sky — 1280 × 800 px
- `sk_bg_4` Ashlands sky — 1280 × 800 px

Attach: style_hero, style_centaur, sc_sky_bg_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 2 separate pieces of scenery — Sky-port backdrops 2.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 2 objects in a grid of 1 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Highlands sky — a high cold blue sky over snowy mountain peaks far below: thin streaming clouds, a crescent moon still visible, distant stone towers on the peaks, crisp air (about 20.3× the hero's height across).
2. Ashlands sky — a dramatic sunset sky over a land of volcanoes far below: red-orange clouds lit from beneath, smoke columns rising from distant volcanoes, embers drifting, deep violet at the top (about 20.3× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_sky_1

Sky-port flights — galleons, the wingman, a cloud bunker and the power-ups (each seen from slightly below and to the side, as in a flying game) · wave 47 · 12 items, 4 × 3 · 1536x1024

- `sk_galleon_1` Grasslands war-galleon — 150 × 80 px
- `sk_galleon_2` Wetlands war-galleon — 150 × 80 px
- `sk_galleon_3` Highlands war-galleon — 150 × 80 px
- `sk_galleon_4` Ashlands war-galleon — 150 × 80 px
- `sk_drone` Wingman — 40 × 40 px
- `sk_bunker` Cloud fortress — 90 × 50 px
- `sk_pu_tri` Power-up: triple shot — 40 × 40 px
- `sk_pu_rapid` Power-up: rapid fire — 40 × 40 px
- `sk_pu_wing` Power-up: wingmen — 40 × 40 px
- `sk_pu_shield` Power-up: wind shield — 40 × 40 px
- `sk_pu_bomb` Power-up: sky bomb — 40 × 40 px
- `sk_pu_heal` Power-up: repair — 40 × 40 px

Attach: style_hero, style_centaur, sc_vill_special_2

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Sky-port flights — galleons, the wingman, a cloud bunker and the power-ups (each seen from slightly below and to the side, as in a flying game).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 12 objects in a grid of 4 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. Grasslands war-galleon — a small flying war-ship with a green sail and a leafy figurehead, hull of oak, propellers on its sides, seen from the side (about 1.3× the hero's height).
2. Wetlands war-galleon — a flying war-ship with a teal sail and a coral-crusted hull, water dripping from its keel, seen from the side (about 1.3× the hero's height).
3. Highlands war-galleon — a flying war-ship with a grey iron hull, a storm-blue sail and a lightning rod mast, seen from the side (about 1.3× the hero's height).
4. Ashlands war-galleon — a flying war-ship of black wood and red sails with glowing ember lanterns, smoke trailing behind, seen from the side (about 1.3× the hero's height).
5. Wingman — a tiny glider-drone of brass and teal cloth wings with a glowing rune eye, pointing up (about 0.6× the hero's height).
6. Cloud fortress — a small puffy white cloud piled up like a little fortress wall, soft and round (about 0.8× the hero's height).
7. Power-up: triple shot — a glowing round orb with three golden arrows fanning upward inside (about 0.6× the hero's height).
8. Power-up: rapid fire — a glowing round orb with a yellow lightning bolt inside (about 0.6× the hero's height).
9. Power-up: wingmen — a glowing round orb with two small white wings inside (about 0.6× the hero's height).
10. Power-up: wind shield — a glowing round orb with a teal swirling wind shield inside (about 0.6× the hero's height).
11. Power-up: sky bomb — a glowing round orb with a round black bomb with a lit fuse inside (about 0.6× the hero's height).
12. Power-up: repair — a glowing round orb with a green heart and a little wrench inside (about 0.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_setpiece_1

Adventure-site set-pieces 1 — big centrepieces that make a floor memorable (seen from three-quarters above) · wave 47 · 8 items, 4 × 2 · 1536x1024

- `sp_frozen_fountain` Frozen fountain — 150 × 150 px
- `sp_lava_forge` Lava forge — 170 × 150 px
- `sp_mushroom_ring` Giant mushroom ring — 170 × 140 px
- `sp_bone_throne` Bone throne — 150 × 170 px
- `sp_glacier_heart` Glacier heart — 130 × 180 px
- `sp_storm_eye` Eye of the storm — 130 × 170 px
- `sp_abyss_well` Abyss well — 150 × 130 px
- `sp_root_heart` Root heart — 160 × 150 px

Attach: style_hero, style_centaur, sc_dng_1, sc_twr_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Adventure-site set-pieces 1 — big centrepieces that make a floor memorable (seen from three-quarters above).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Frozen fountain — a round stone fountain frozen solid, icicles hanging from its bowls, a glowing blue rune at its base (about 2.4× the hero's height).
2. Lava forge — a great dwarven forge of black stone with a river of glowing lava pouring into a trough and a huge anvil beside it (about 2.4× the hero's height).
3. Giant mushroom ring — a ring of tall glowing mushrooms of different sizes around a mossy stone (about 2.2× the hero's height).
4. Bone throne — a high throne built of great bones and skulls on a stepped dais, green ghost-fire in its eye sockets (about 2.7× the hero's height).
5. Glacier heart — a tall jagged crystal of blue ice with a glowing white heart inside, frost spreading round its base (about 2.9× the hero's height).
6. Eye of the storm — a stone pedestal with a floating sphere of swirling storm clouds and crackling lightning above it (about 2.7× the hero's height).
7. Abyss well — a round black stone well with violet light and wisps of shadow rising out of it, chains on its rim (about 2.1× the hero's height).
8. Root heart — a great knot of ancient roots around a softly glowing green seed the size of a person (about 2.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_setpiece_2

Adventure-site set-pieces 2 · wave 47 · 8 items, 4 × 2 · 1536x1024

- `sp_mirror_pool` Mirror pool — 170 × 130 px
- `sp_star_globe` Star globe — 150 × 170 px
- `sp_crystal_heart` Crystal heart — 150 × 170 px
- `sp_sun_altar` Sun altar — 160 × 160 px
- `sp_anvil_shrine` Anvil shrine — 150 × 130 px
- `sp_coral_fountain` Coral fountain — 150 × 150 px
- `sp_ember_altar` Ember altar — 140 × 150 px
- `sp_lotus_shrine` Lotus shrine — 150 × 120 px

Attach: style_hero, style_centaur, sc_setpiece_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Adventure-site set-pieces 2.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Mirror pool — a still round pool in a ring of white marble, the water perfectly reflecting stars, a crescent stone arch over it (about 2.1× the hero's height).
2. Star globe — a huge brass armillary sphere of rings with tiny glowing stars set in it, on a carved stand (about 2.7× the hero's height).
3. Crystal heart — a cluster of huge violet and teal crystals around a floating faceted gem (about 2.7× the hero's height).
4. Sun altar — a golden altar on three steps with a great sun disc behind it catching light (about 2.5× the hero's height).
5. Anvil shrine — a giant stone anvil on a plinth with a hammer resting on it and runes glowing along its side (about 2.1× the hero's height).
6. Coral fountain — a fountain grown from pink and orange coral with water spilling over shells (about 2.4× the hero's height).
7. Ember altar — a black obsidian altar with a bowl of living flame and ember-cracks in its stone (about 2.4× the hero's height).
8. Lotus shrine — a stone lotus flower the size of a cart, petals open, a glowing pearl in its middle (about 1.9× the hero's height).
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Rocks and crystals.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Highland and Ashland rocks.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Ruins.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Landmarks 1 — bones, giants and golems.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Landmarks 2 — wind, sky and fire.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Bridges — seen from above-front, running left to right; the flat deck is walked on.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Bridge and path pieces.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Harbors and docks.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 square ground-texture swatches — Ground 1 — grass.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 square ground-texture swatches — Ground 2 — earth, sand and snow.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 square ground-texture swatches — Ground 3 — paving.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 square ground-texture swatches — Ground 4 — water and lava.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 square ground-texture swatches — Ground 5 — the far realms.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 square ground-texture swatches — Ground 6 — cliff faces (seen from the front; these repeat left to right).
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 square ground-texture swatches — Floors — rooms, towers and castles.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 square ground-texture swatches — Floors 2 and cave floors.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 square ground-texture swatches — Room walls (seen from the front; these repeat left to right).
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Monster-camp props 1.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Monster-camp props 2.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Monster-camp props 3.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Loot pickups (small, shown on the ground).
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Fairy-trial props 1.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Fairy-trial props 2.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Tower furnishings 1 — tall pieces.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Tower furnishings 2 — plants, music and light.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Tower centrepieces.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate pieces of scenery — Tower furnishings 4 — low pieces.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Tower rugs and floor pieces (seen from above).
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Castle furnishings 1.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Castle furnishings 2.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Castle wall pieces.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Mage-tower furnishings 1.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Mage-tower furnishings 2.
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
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Mage-tower furnishings 3.
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

Attach: style_hero, style_centaur, sc_setpiece_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Dungeon pieces 1.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
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

Attach: style_hero, style_centaur, sc_setpiece_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Dungeon pieces 2.
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

Attach: style_hero, style_centaur, sc_setpiece_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Dungeon pieces 3 — things you use.
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

Attach: style_hero, style_centaur, sc_setpiece_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Ember-cave and arena pieces.
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

## sc_spirit40_1

The spirits of the bindstones, 1 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes · wave 55 · 8 items, 4 × 2 · 1536x1024

- `sp_u_asa_bound` Asa, bound — 72 × 104 px
- `sp_u_bersi_bound` Bersi, bound — 72 × 104 px
- `sp_u_dagny_bound` Dagny, bound — 72 × 104 px
- `sp_u_eyvind_bound` Eyvind, bound — 72 × 104 px
- `sp_u_asa_free` Asa, freed — 72 × 104 px
- `sp_u_bersi_free` Bersi, freed — 72 × 104 px
- `sp_u_dagny_free` Dagny, freed — 72 × 104 px
- `sp_u_eyvind_free` Eyvind, freed — 72 × 104 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — The spirits of the bindstones, 1 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Asa, bound — Asa, once a weaver of the Grasslands: an old woman with a long silver braid, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; spring-green trims and a few wildflowers woven in — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
2. Bersi, bound — Bersi, once a shipwright of the Grasslands: a boy, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; spring-green trims and a few wildflowers woven in — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
3. Dagny, bound — Dagny, once a net-mender of the Grasslands: a young woman, a Norse ancestor of pale-blue light with braids and a cloak, a lantern hung from a spear or staff, a rune-shaped heart glowing in the chest; spring-green trims and a few wildflowers woven in — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
4. Eyvind, bound — Eyvind, once a fisher of the Grasslands: a man, a villager of pale-blue light carrying a small lantern, robes trailing into ribbons of aurora light, a rune-shaped heart glowing in the chest; spring-green trims and a few wildflowers woven in — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
5. Asa, freed — Asa, once a weaver of the Grasslands: an old woman with a long silver braid, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; spring-green trims and a few wildflowers woven in — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a small hand loom with threads of light (about 1.7× the hero's height).
6. Bersi, freed — Bersi, once a shipwright of the Grasslands: a boy, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; spring-green trims and a few wildflowers woven in — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding an adze and a little carved dragon prow (about 1.7× the hero's height).
7. Dagny, freed — Dagny, once a net-mender of the Grasslands: a young woman, a Norse ancestor of pale-blue light with braids and a cloak, a lantern hung from a spear or staff, a rune-shaped heart glowing in the chest; spring-green trims and a few wildflowers woven in — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a netting needle and a fold of net (about 1.7× the hero's height).
8. Eyvind, freed — Eyvind, once a fisher of the Grasslands: a man, a villager of pale-blue light carrying a small lantern, robes trailing into ribbons of aurora light, a rune-shaped heart glowing in the chest; spring-green trims and a few wildflowers woven in — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a net over one shoulder and a glowing fish (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit40_2

The spirits of the bindstones, 2 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes · wave 55 · 8 items, 4 × 2 · 1536x1024

- `sp_u_frida_bound` Frida, bound — 72 × 104 px
- `sp_u_geir_bound` Geir, bound — 72 × 104 px
- `sp_u_hallveig_bound` Hallveig, bound — 72 × 104 px
- `sp_u_ingolf_bound` Ingolf, bound — 72 × 104 px
- `sp_u_frida_free` Frida, freed — 72 × 104 px
- `sp_u_geir_free` Geir, freed — 72 × 104 px
- `sp_u_hallveig_free` Hallveig, freed — 72 × 104 px
- `sp_u_ingolf_free` Ingolf, freed — 72 × 104 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — The spirits of the bindstones, 2 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Frida, bound — Frida, once a beekeeper of the Grasslands: a woman, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; spring-green trims and a few wildflowers woven in — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
2. Geir, bound — Geir, once a carver of the Grasslands: an old man with a long beard, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; spring-green trims and a few wildflowers woven in — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
3. Hallveig, bound — Hallveig, once a cooper of the Grasslands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; spring-green trims and a few wildflowers woven in — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
4. Ingolf, bound — Ingolf, once a tanner of the Grasslands: a young man, a Norse ancestor of pale-blue light whose cloak dissolves into ribbons of aurora light, rune tattoos glowing cyan; spring-green trims and a few wildflowers woven in — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
5. Frida, freed — Frida, once a beekeeper of the Grasslands: a woman, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; spring-green trims and a few wildflowers woven in — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a woven skep with glowing bees around it (about 1.7× the hero's height).
6. Geir, freed — Geir, once a carver of the Grasslands: an old man with a long beard, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; spring-green trims and a few wildflowers woven in — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a knife and a small carved rune-stone (about 1.7× the hero's height).
7. Hallveig, freed — Hallveig, once a cooper of the Grasslands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; spring-green trims and a few wildflowers woven in — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a barrel hoop and a wooden mallet (about 1.7× the hero's height).
8. Ingolf, freed — Ingolf, once a tanner of the Grasslands: a young man, a Norse ancestor of pale-blue light whose cloak dissolves into ribbons of aurora light, rune tattoos glowing cyan; spring-green trims and a few wildflowers woven in — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a hide stretched on a small frame (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit40_3

The spirits of the bindstones, 3 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes · wave 55 · 8 items, 4 × 2 · 1536x1024

- `sp_u_jorunn_bound` Jorunn, bound — 72 × 104 px
- `sp_u_ketil_bound` Ketil, bound — 72 × 104 px
- `sp_u_liv_bound` Liv, bound — 72 × 104 px
- `sp_u_magni_bound` Magni, bound — 72 × 104 px
- `sp_u_jorunn_free` Jorunn, freed — 72 × 104 px
- `sp_u_ketil_free` Ketil, freed — 72 × 104 px
- `sp_u_liv_free` Liv, freed — 72 × 104 px
- `sp_u_magni_free` Magni, freed — 72 × 104 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — The spirits of the bindstones, 3 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Jorunn, bound — Jorunn, once a dyer of the Grasslands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; spring-green trims and a few wildflowers woven in — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
2. Ketil, bound — Ketil, once a herder of the Grasslands: a man, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; spring-green trims and a few wildflowers woven in — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
3. Liv, bound — Liv, once a miller of the Wetlands: a young woman, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; sea-teal trims with shells and reed beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
4. Magni, bound — Magni, once a stonemason of the Wetlands: a man, a Norse ancestor of pale-blue light with braids and a cloak, a lantern hung from a spear or staff, a rune-shaped heart glowing in the chest; sea-teal trims with shells and reed beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
5. Jorunn, freed — Jorunn, once a dyer of the Grasslands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; spring-green trims and a few wildflowers woven in — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding skeins of yarn in soft colours (about 1.7× the hero's height).
6. Ketil, freed — Ketil, once a herder of the Grasslands: a man, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; spring-green trims and a few wildflowers woven in — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a crook, with a little spirit goat at the heel (about 1.7× the hero's height).
7. Liv, freed — Liv, once a miller of the Wetlands: a young woman, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; sea-teal trims with shells and reed beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a sack of flour and a dusty apron (about 1.7× the hero's height).
8. Magni, freed — Magni, once a stonemason of the Wetlands: a man, a Norse ancestor of pale-blue light with braids and a cloak, a lantern hung from a spear or staff, a rune-shaped heart glowing in the chest; sea-teal trims with shells and reed beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a chisel and a squared stone (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit40_4

The spirits of the bindstones, 4 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes · wave 55 · 8 items, 4 × 2 · 1536x1024

- `sp_u_nanna_bound` Nanna, bound — 72 × 104 px
- `sp_u_oddny_bound` Oddny, bound — 72 × 104 px
- `sp_u_ragna_bound` Ragna, bound — 72 × 104 px
- `sp_u_sigrid_bound` Sigrid, bound — 72 × 104 px
- `sp_u_nanna_free` Nanna, freed — 72 × 104 px
- `sp_u_oddny_free` Oddny, freed — 72 × 104 px
- `sp_u_ragna_free` Ragna, freed — 72 × 104 px
- `sp_u_sigrid_free` Sigrid, freed — 72 × 104 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — The spirits of the bindstones, 4 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Nanna, bound — Nanna, once a midwife of the Wetlands: a woman, a villager of pale-blue light carrying a small lantern, robes trailing into ribbons of aurora light, a rune-shaped heart glowing in the chest; sea-teal trims with shells and reed beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
2. Oddny, bound — Oddny, once a potter of the Wetlands: an old woman with a long silver braid, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; sea-teal trims with shells and reed beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
3. Ragna, bound — Ragna, once a shepherd of the Wetlands: a girl, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; sea-teal trims with shells and reed beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
4. Sigrid, bound — Sigrid, once a smith of the Wetlands: a young woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; sea-teal trims with shells and reed beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
5. Nanna, freed — Nanna, once a midwife of the Wetlands: a woman, a villager of pale-blue light carrying a small lantern, robes trailing into ribbons of aurora light, a rune-shaped heart glowing in the chest; sea-teal trims with shells and reed beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a bundle of herbs and a tiny swaddled light held close (about 1.7× the hero's height).
6. Oddny, freed — Oddny, once a potter of the Wetlands: an old woman with a long silver braid, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; sea-teal trims with shells and reed beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a round jug and clay-streaked sleeves (about 1.7× the hero's height).
7. Ragna, freed — Ragna, once a shepherd of the Wetlands: a girl, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; sea-teal trims with shells and reed beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a staff, with a lamb of light at the knee (about 1.7× the hero's height).
8. Sigrid, freed — Sigrid, once a smith of the Wetlands: a young woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; sea-teal trims with shells and reed beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a hammer and a leather apron (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit40_5

The spirits of the bindstones, 5 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes · wave 55 · 8 items, 4 × 2 · 1536x1024

- `sp_u_torvi_bound` Torvi, bound — 72 × 104 px
- `sp_u_ulf_bound` Ulf, bound — 72 × 104 px
- `sp_u_vigdis_bound` Vigdis, bound — 72 × 104 px
- `sp_u_yrsa_bound` Yrsa, bound — 72 × 104 px
- `sp_u_torvi_free` Torvi, freed — 72 × 104 px
- `sp_u_ulf_free` Ulf, freed — 72 × 104 px
- `sp_u_vigdis_free` Vigdis, freed — 72 × 104 px
- `sp_u_yrsa_free` Yrsa, freed — 72 × 104 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — The spirits of the bindstones, 5 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Torvi, bound — Torvi, once a forester of the Wetlands: a woman, a Norse ancestor of pale-blue light whose cloak dissolves into ribbons of aurora light, rune tattoos glowing cyan; sea-teal trims with shells and reed beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
2. Ulf, bound — Ulf, once a brewer of the Wetlands: a man, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; sea-teal trims with shells and reed beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
3. Vigdis, bound — Vigdis, once a skald of the Wetlands: an old woman with a long silver braid, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; sea-teal trims with shells and reed beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
4. Yrsa, bound — Yrsa, once a baker of the Wetlands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; sea-teal trims with shells and reed beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
5. Torvi, freed — Torvi, once a forester of the Wetlands: a woman, a Norse ancestor of pale-blue light whose cloak dissolves into ribbons of aurora light, rune tattoos glowing cyan; sea-teal trims with shells and reed beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding an axe on the shoulder and a sprig of pine (about 1.7× the hero's height).
6. Ulf, freed — Ulf, once a brewer of the Wetlands: a man, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; sea-teal trims with shells and reed beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a horn of mead and a small cask (about 1.7× the hero's height).
7. Vigdis, freed — Vigdis, once a skald of the Wetlands: an old woman with a long silver braid, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; sea-teal trims with shells and reed beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a lyre and a feathered cap (about 1.7× the hero's height).
8. Yrsa, freed — Yrsa, once a baker of the Wetlands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; sea-teal trims with shells and reed beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a round loaf and a long bread paddle (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit40_6

The spirits of the bindstones, 6 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes · wave 55 · 8 items, 4 × 2 · 1536x1024

- `sp_u_arnor_bound` Arnor, bound — 72 × 104 px
- `sp_u_bodil_bound` Bodil, bound — 72 × 104 px
- `sp_u_dalla_bound` Dalla, bound — 72 × 104 px
- `sp_u_einar_bound` Einar, bound — 72 × 104 px
- `sp_u_arnor_free` Arnor, freed — 72 × 104 px
- `sp_u_bodil_free` Bodil, freed — 72 × 104 px
- `sp_u_dalla_free` Dalla, freed — 72 × 104 px
- `sp_u_einar_free` Einar, freed — 72 × 104 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — The spirits of the bindstones, 6 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Arnor, bound — Arnor, once a weaver of the Highlands: a man, a Norse ancestor of pale-blue light with braids and a cloak, a lantern hung from a spear or staff, a rune-shaped heart glowing in the chest; warm amber trims with fur and stone beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
2. Bodil, bound — Bodil, once a shipwright of the Highlands: an old woman with a long silver braid, a villager of pale-blue light carrying a small lantern, robes trailing into ribbons of aurora light, a rune-shaped heart glowing in the chest; warm amber trims with fur and stone beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
3. Dalla, bound — Dalla, once a net-mender of the Highlands: a woman, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; warm amber trims with fur and stone beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
4. Einar, bound — Einar, once a fisher of the Highlands: a young man, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; warm amber trims with fur and stone beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
5. Arnor, freed — Arnor, once a weaver of the Highlands: a man, a Norse ancestor of pale-blue light with braids and a cloak, a lantern hung from a spear or staff, a rune-shaped heart glowing in the chest; warm amber trims with fur and stone beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a small hand loom with threads of light (about 1.7× the hero's height).
6. Bodil, freed — Bodil, once a shipwright of the Highlands: an old woman with a long silver braid, a villager of pale-blue light carrying a small lantern, robes trailing into ribbons of aurora light, a rune-shaped heart glowing in the chest; warm amber trims with fur and stone beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding an adze and a little carved dragon prow (about 1.7× the hero's height).
7. Dalla, freed — Dalla, once a net-mender of the Highlands: a woman, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; warm amber trims with fur and stone beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a netting needle and a fold of net (about 1.7× the hero's height).
8. Einar, freed — Einar, once a fisher of the Highlands: a young man, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; warm amber trims with fur and stone beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a net over one shoulder and a glowing fish (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit40_7

The spirits of the bindstones, 7 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes · wave 55 · 8 items, 4 × 2 · 1536x1024

- `sp_u_gudrun_bound` Gudrun, bound — 72 × 104 px
- `sp_u_hakon_bound` Hakon, bound — 72 × 104 px
- `sp_u_ingrid_bound` Ingrid, bound — 72 × 104 px
- `sp_u_joreid_bound` Joreid, bound — 72 × 104 px
- `sp_u_gudrun_free` Gudrun, freed — 72 × 104 px
- `sp_u_hakon_free` Hakon, freed — 72 × 104 px
- `sp_u_ingrid_free` Ingrid, freed — 72 × 104 px
- `sp_u_joreid_free` Joreid, freed — 72 × 104 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — The spirits of the bindstones, 7 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Gudrun, bound — Gudrun, once a beekeeper of the Highlands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; warm amber trims with fur and stone beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
2. Hakon, bound — Hakon, once a carver of the Highlands: a man, a Norse ancestor of pale-blue light whose cloak dissolves into ribbons of aurora light, rune tattoos glowing cyan; warm amber trims with fur and stone beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
3. Ingrid, bound — Ingrid, once a cooper of the Highlands: an old woman with a long silver braid, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; warm amber trims with fur and stone beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
4. Joreid, bound — Joreid, once a tanner of the Highlands: a girl, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; warm amber trims with fur and stone beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
5. Gudrun, freed — Gudrun, once a beekeeper of the Highlands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; warm amber trims with fur and stone beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a woven skep with glowing bees around it (about 1.7× the hero's height).
6. Hakon, freed — Hakon, once a carver of the Highlands: a man, a Norse ancestor of pale-blue light whose cloak dissolves into ribbons of aurora light, rune tattoos glowing cyan; warm amber trims with fur and stone beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a knife and a small carved rune-stone (about 1.7× the hero's height).
7. Ingrid, freed — Ingrid, once a cooper of the Highlands: an old woman with a long silver braid, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; warm amber trims with fur and stone beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a barrel hoop and a wooden mallet (about 1.7× the hero's height).
8. Joreid, freed — Joreid, once a tanner of the Highlands: a girl, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; warm amber trims with fur and stone beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a hide stretched on a small frame (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit40_8

The spirits of the bindstones, 8 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes · wave 55 · 8 items, 4 × 2 · 1536x1024

- `sp_u_kolbein_bound` Kolbein, bound — 72 × 104 px
- `sp_u_lofn_bound` Lofn, bound — 72 × 104 px
- `sp_u_mord_bound` Mord, bound — 72 × 104 px
- `sp_u_njal_bound` Njal, bound — 72 × 104 px
- `sp_u_kolbein_free` Kolbein, freed — 72 × 104 px
- `sp_u_lofn_free` Lofn, freed — 72 × 104 px
- `sp_u_mord_free` Mord, freed — 72 × 104 px
- `sp_u_njal_free` Njal, freed — 72 × 104 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — The spirits of the bindstones, 8 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Kolbein, bound — Kolbein, once a dyer of the Highlands: a young man, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; warm amber trims with fur and stone beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
2. Lofn, bound — Lofn, once a herder of the Highlands: a woman, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; warm amber trims with fur and stone beads — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
3. Mord, bound — Mord, once a miller of the Ashlands: a boy, a villager of pale-blue light carrying a small lantern, robes trailing into ribbons of aurora light, a rune-shaped heart glowing in the chest; ember-orange trims and soot-dark hems that glow at the edges — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
4. Njal, bound — Njal, once a stonemason of the Ashlands: a young man, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; ember-orange trims and soot-dark hems that glow at the edges — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
5. Kolbein, freed — Kolbein, once a dyer of the Highlands: a young man, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; warm amber trims with fur and stone beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding skeins of yarn in soft colours (about 1.7× the hero's height).
6. Lofn, freed — Lofn, once a herder of the Highlands: a woman, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; warm amber trims with fur and stone beads — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a crook, with a little spirit goat at the heel (about 1.7× the hero's height).
7. Mord, freed — Mord, once a miller of the Ashlands: a boy, a villager of pale-blue light carrying a small lantern, robes trailing into ribbons of aurora light, a rune-shaped heart glowing in the chest; ember-orange trims and soot-dark hems that glow at the edges — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a sack of flour and a dusty apron (about 1.7× the hero's height).
8. Njal, freed — Njal, once a stonemason of the Ashlands: a young man, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; ember-orange trims and soot-dark hems that glow at the edges — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a chisel and a squared stone (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit40_9

The spirits of the bindstones, 9 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes · wave 55 · 8 items, 4 × 2 · 1536x1024

- `sp_u_orm_bound` Orm, bound — 72 × 104 px
- `sp_u_ranveig_bound` Ranveig, bound — 72 × 104 px
- `sp_u_sverri_bound` Sverri, bound — 72 × 104 px
- `sp_u_thora_bound` Thora, bound — 72 × 104 px
- `sp_u_orm_free` Orm, freed — 72 × 104 px
- `sp_u_ranveig_free` Ranveig, freed — 72 × 104 px
- `sp_u_sverri_free` Sverri, freed — 72 × 104 px
- `sp_u_thora_free` Thora, freed — 72 × 104 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — The spirits of the bindstones, 9 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Orm, bound — Orm, once a midwife of the Ashlands: a man, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; ember-orange trims and soot-dark hems that glow at the edges — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
2. Ranveig, bound — Ranveig, once a potter of the Ashlands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; ember-orange trims and soot-dark hems that glow at the edges — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
3. Sverri, bound — Sverri, once a shepherd of the Ashlands: an old man with a long beard, a Norse ancestor of pale-blue light whose cloak dissolves into ribbons of aurora light, rune tattoos glowing cyan; ember-orange trims and soot-dark hems that glow at the edges — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
4. Thora, bound — Thora, once a smith of the Ashlands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; ember-orange trims and soot-dark hems that glow at the edges — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
5. Orm, freed — Orm, once a midwife of the Ashlands: a man, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; ember-orange trims and soot-dark hems that glow at the edges — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a bundle of herbs and a tiny swaddled light held close (about 1.7× the hero's height).
6. Ranveig, freed — Ranveig, once a potter of the Ashlands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; ember-orange trims and soot-dark hems that glow at the edges — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a round jug and clay-streaked sleeves (about 1.7× the hero's height).
7. Sverri, freed — Sverri, once a shepherd of the Ashlands: an old man with a long beard, a Norse ancestor of pale-blue light whose cloak dissolves into ribbons of aurora light, rune tattoos glowing cyan; ember-orange trims and soot-dark hems that glow at the edges — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a staff, with a lamb of light at the knee (about 1.7× the hero's height).
8. Thora, freed — Thora, once a smith of the Ashlands: a woman, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; ember-orange trims and soot-dark hems that glow at the edges — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a hammer and a leather apron (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit40_10

The spirits of the bindstones, 10 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes · wave 55 · 8 items, 4 × 2 · 1536x1024

- `sp_u_unn_bound` Unn, bound — 72 × 104 px
- `sp_u_vali_bound` Vali, bound — 72 × 104 px
- `sp_u_alfhild_bound` Alfhild, bound — 72 × 104 px
- `sp_u_brand_bound` Brand, bound — 72 × 104 px
- `sp_u_unn_free` Unn, freed — 72 × 104 px
- `sp_u_vali_free` Vali, freed — 72 × 104 px
- `sp_u_alfhild_free` Alfhild, freed — 72 × 104 px
- `sp_u_brand_free` Brand, freed — 72 × 104 px

Attach: style_hero, style_centaur, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — The spirits of the bindstones, 10 of 10 — four different people, each shown BOUND (top row) and FREED (bottom row, the same person directly below); adult proportions unless a child, seen from above-front like the game characters; every one a unique individual with its own face, build, hair and clothes.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Unn, bound — Unn, once a forester of the Ashlands: a young woman, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; ember-orange trims and soot-dark hems that glow at the edges — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
2. Vali, bound — Vali, once a brewer of the Ashlands: a man, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; ember-orange trims and soot-dark hems that glow at the edges — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
3. Alfhild, bound — Alfhild, once a skald of the Ashlands: a woman, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; ember-orange trims and soot-dark hems that glow at the edges — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
4. Brand, bound — Brand, once a baker of the Ashlands: an old man with a long beard, a Norse ancestor of pale-blue light with braids and a cloak, a lantern hung from a spear or staff, a rune-shaped heart glowing in the chest; ember-orange trims and soot-dark hems that glow at the edges — BOUND: chained at the ankle with heavy iron chains, swinging a pick at rock, weary and frustrated, the light dimmed; the tools of the trade hang forgotten at the belt (about 1.7× the hero's height).
5. Unn, freed — Unn, once a forester of the Ashlands: a young woman, a Norse ancestor of glowing pale-blue light: braids, a simple helm or hood, a cloak, rune tattoos that glow brighter cyan; ember-orange trims and soot-dark hems that glow at the edges — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding an axe on the shoulder and a sprig of pine (about 1.7× the hero's height).
6. Vali, freed — Vali, once a brewer of the Ashlands: a man, a translucent villager of glowing pale-blue light carrying a small lantern, a rune-shaped heart of light shining through the chest; ember-orange trims and soot-dark hems that glow at the edges — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a horn of mead and a small cask (about 1.7× the hero's height).
7. Alfhild, freed — Alfhild, once a skald of the Ashlands: a woman, tall and graceful, robes and long hair that dissolve at the ends into ribbons of aurora light (teal, green and violet) drifting as if underwater; ember-orange trims and soot-dark hems that glow at the edges — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a lyre and a feathered cap (about 1.7× the hero's height).
8. Brand, freed — Brand, once a baker of the Ashlands: an old man with a long beard, a Norse ancestor of pale-blue light with braids and a cloak, a lantern hung from a spear or staff, a rune-shaped heart glowing in the chest; ember-orange trims and soot-dark hems that glow at the edges — FREED: no chains, floating a little above the ground, smiling and glowing at full brightness, holding a round loaf and a long bread paddle (about 1.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_spirit_grp2

Spirit groups, round two — spirits just hanging out together, from the picked Ring dance, Family, Honour guard and Chain gang; spirits are translucent glowing people of pale-blue runic light (ancestors, lantern folk and aurora-robed), adult proportions, friendly · wave 55 · 8 items, 4 × 2 · 1536x1024

- `sp_g2_hearth_tale` Tale by the hearth — 200 × 128 px
- `sp_g2_reel` The reel — 200 × 128 px
- `sp_g2_sparring` Sparring ancestors — 200 × 128 px
- `sp_g2_mead_bench` Mead bench — 200 × 128 px
- `sp_g2_stroll` Evening stroll — 200 × 128 px
- `sp_g2_tafl` Game of tafl — 200 × 128 px
- `sp_g2_tag` Children at play — 200 × 128 px
- `sp_g2_haul` The great haul (bound) — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_grp_opts, sc_spirit_opts_a

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 8 separate pieces of scenery — Spirit groups, round two — spirits just hanging out together, from the picked Ring dance, Family, Honour guard and Chain gang; spirits are translucent glowing people of pale-blue runic light (ancestors, lantern folk and aurora-robed), adult proportions, friendly.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 8 objects in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Tale by the hearth — a grandmother of light telling a story by a small blue ghost-fire, three children and a father leaning in, one child on his shoulders (a family, hanging out) (about 2× the hero's height).
2. The reel — a lively ring dance of six spirits hand in hand, skirts and cloaks swinging, a fiddler and a drummer playing in the middle (about 2× the hero's height).
3. Sparring ancestors — two ancestor warriors of light sparring with glowing practice swords and round shields, two more leaning on their spears watching and laughing (about 2× the hero's height).
4. Mead bench — four spirits on a long bench round a plank table, raising mead horns in a toast, one telling a joke (about 2× the hero's height).
5. Evening stroll — an old couple walking arm in arm carrying a lantern, a dog of light trotting beside them, a child skipping ahead (about 2× the hero's height).
6. Game of tafl — two old spirits bent over a hnefatafl board on a stone, three others watching and pointing, one stroking his beard (about 2× the hero's height).
7. Children at play — four spirit children chasing each other round a tall ancestor warrior who pretends to be a troll, arms raised (about 2× the hero's height).
8. The great haul (bound) — five BOUND spirits in chains hauling a huge carved stone on ropes and log rollers, heads down, a Binder’s brazier smoking behind them (about 2× the hero's height).
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 25 separate game icons — Control-bar and menu icons.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 25 separate game icons — Empty gear-slot symbols and inventory tabs — the first 14 are EMPTY-SLOT symbols: each one a simple flat dark slate-blue silhouette of the item with a thin teal outline, no other colours, no detail.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 25 separate game icons — Map markers and quest icons.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 25 separate game icons — Status effects, elements and tome chapters.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate game icons — Panel ornaments — carved dark stone inlaid with glowing teal runes and thin gold edges; each drawn flat, straight from the front.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 22 separate game icons — Item icons — swords, axes and other melee weapons.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 19 separate game icons — Item icons — bows, staffs, arrows and darts.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 25 separate game icons — Item icons — body armor and shields.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 20 separate game icons — Item icons — headgear and leg armor.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 20 separate game icons — Item icons — gauntlets and boots.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 22 separate game icons — Item icons — amulets and cloaks.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 24 separate game icons — Item icons — rings, gems, keys and materials.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 14 separate game icons — Item icons — potions and tonics.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate game icons — Item icons — food and drink.
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 16 separate game icons — Spell emblems (shown on the spell slot and in the tome).
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

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 12 separate game icons — Skill emblems (special attacks).
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

## sc_ic_melee2

Item icons — axes, mauls and two-element blades (round 37) · wave 37 · 19 items, 5 × 4 · 1536x1024

- `ic_hand_axe` Hand Axe — 48 × 48 px
- `ic_battle_axe` Battle Axe — 48 × 48 px
- `ic_great_axe` Great Axe — 48 × 48 px
- `ic_war_axe` War Axe — 48 × 48 px
- `ic_granite_axe` Granite Axe — 48 × 48 px
- `ic_quake_axe` Quake Axe — 48 × 48 px
- `ic_boulder_maul` Boulder Maul — 48 × 48 px
- `ic_mountains_heart` Mountain's Heart — 48 × 48 px
- `ic_briar_axe` Briar Axe — 48 × 48 px
- `ic_thornwood_axe` Thornwood Axe — 48 × 48 px
- `ic_wildwood_cleaver` Wildwood Cleaver — 48 × 48 px
- `ic_verdant_king` Verdant King — 48 × 48 px
- `ic_stormfire_blade` Stormfire Blade — 48 × 48 px
- `ic_tempest_edge` Tempest Edge — 48 × 48 px
- `ic_magmaheart_axe` Magmaheart Axe — 48 × 48 px
- `ic_avalanche_maul` Avalanche Maul — 48 × 48 px
- `ic_nightbloom_axe` Nightbloom Axe — 48 × 48 px
- `ic_night_edge` Night Edge — 48 × 48 px
- `ic_sov_axe` Sovereign Axe — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 19 separate game icons — Item icons — axes, mauls and two-element blades (round 37).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 19 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first); the last 1 cell(s) stay empty:
1. Hand Axe — battle axe or maul: a small one-handed axe, steel head on a short wooden haft.
2. Battle Axe — battle axe or maul: a broad single-bladed battle axe with a leather-wrapped haft.
3. Great Axe — battle axe or maul: a huge double-bladed great axe of polished steel.
4. War Axe — battle axe or maul: a black-steel war axe with a spiked back and red trim.
5. Granite Axe — battle axe or maul: an axe with a head of grey granite bound to the haft with iron bands.
6. Quake Axe — battle axe or maul: a heavy stone axe with glowing amber cracks running through the head.
7. Boulder Maul — battle axe or maul: a great two-handed maul whose head is one rough boulder set with amber crystals.
8. Mountain's Heart — battle axe or maul: a massive axe carved from a single glowing amber-veined crystal, with a mountain peak shape at the top.
9. Briar Axe — battle axe or maul: an axe whose haft is wrapped in thorny green briar, with a small emerald in the head.
10. Thornwood Axe — battle axe or maul: an axe of dark living wood with long thorns along the back and green leaves sprouting.
11. Wildwood Cleaver — battle axe or maul: a broad cleaver-axe grown from twisted roots, with a blade edge of glowing green.
12. Verdant King — battle axe or maul: a majestic great axe of golden wood and emerald, crowned with antler-like branches and flowers.
13. Stormfire Blade — melee weapon: a sword whose blade is half orange flame and half yellow lightning.
14. Tempest Edge — melee weapon: a sword of blue ice wrapped in a spiral of storm cloud and small lightning.
15. Magmaheart Axe — battle axe or maul: a black rock axe with a molten glowing core and lava dripping from the edge.
16. Avalanche Maul — battle axe or maul: a maul of grey stone capped with thick blue-white ice and snow.
17. Nightbloom Axe — battle axe or maul: an axe of black wood with violet night-flowers blooming along the haft and a dark crescent blade.
18. Night Edge — melee weapon: a slim sword of violet-black glass trailing wisps of shadow.
19. Sovereign Axe — battle axe or maul: a white-gold great axe set with six small gems: red, blue, green, amber, yellow and violet.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_ranged2

Item icons — crossbows, staffs, arrows and darts (round 37) · wave 37 · 22 items, 5 × 5 · 1024x1024

- `ic_light_crossbow` Light Crossbow — 48 × 48 px
- `ic_heavy_crossbow` Heavy Crossbow — 48 × 48 px
- `ic_ember_crossbow` Ember Crossbow — 48 × 48 px
- `ic_frost_crossbow` Frost Crossbow — 48 × 48 px
- `ic_thorn_crossbow` Thorn Crossbow — 48 × 48 px
- `ic_stone_crossbow` Stone Crossbow — 48 × 48 px
- `ic_storm_crossbow` Storm Crossbow — 48 × 48 px
- `ic_night_crossbow` Night Crossbow — 48 × 48 px
- `ic_eclipse_arbalest` Eclipse Arbalest — 48 × 48 px
- `ic_geyser_arbalest` Geyser Arbalest — 48 × 48 px
- `ic_wildstone_arbalest` Wildstone Arbalest — 48 × 48 px
- `ic_sov_bow` Sovereign Bow — 48 × 48 px
- `ic_sov_crossbow` Sovereign Crossbow — 48 × 48 px
- `ic_root_staff` Root Staff — 48 × 48 px
- `ic_tide_staff` Tide Staff — 48 × 48 px
- `ic_stone_staff` Stone Rod — 48 × 48 px
- `ic_shade_staff` Shade Staff — 48 × 48 px
- `ic_sov_staff` Sovereign Staff — 48 × 48 px
- `ic_arrow_thorn` Thorn Arrow — 48 × 48 px
- `ic_arrow_shock` Shock Arrow — 48 × 48 px
- `ic_dart_thorn` Thorn Dart — 48 × 48 px
- `ic_dart_shock` Shock Dart — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 22 separate game icons — Item icons — crossbows, staffs, arrows and darts (round 37).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 22 objects in a grid of 5 columns × 5 rows, evenly spaced, in this order (left to right, top row first); the last 3 cell(s) stay empty:
1. Light Crossbow — crossbow: a small light wooden crossbow.
2. Heavy Crossbow — crossbow: a heavy steel-armed crossbow with a winding crank.
3. Ember Crossbow — crossbow: a crossbow with a glowing orange ember set in the stock and small flames on the arms.
4. Frost Crossbow — crossbow: a crossbow rimed with pale-blue frost, with icicles on the arms.
5. Thorn Crossbow — crossbow: a crossbow of green living wood with thorny vines for arms.
6. Stone Crossbow — crossbow: a crossbow with a carved stone stock and amber studs.
7. Storm Crossbow — crossbow: a crossbow of pale metal crackling with yellow lightning along the string.
8. Night Crossbow — crossbow: a crossbow of violet-black wood with wisps of shadow and a crescent moon inlay.
9. Eclipse Arbalest — crossbow: a great crossbow, one arm bright gold with lightning and the other violet-black shadow, with a ring like an eclipse in the middle.
10. Geyser Arbalest — crossbow: a great crossbow, one arm of orange fire and the other of blue water, with white steam rising.
11. Wildstone Arbalest — crossbow: a great crossbow of mossy stone with green vines and amber crystals.
12. Sovereign Bow — ranged weapon: a white-gold longbow set with six small gems: red, blue, green, amber, yellow and violet.
13. Sovereign Crossbow — crossbow: a white-gold crossbow set with six small gems: red, blue, green, amber, yellow and violet.
14. Root Staff — magic weapon: a staff of twisted root with green leaves and a glowing emerald bud at the top.
15. Tide Staff — magic weapon: a staff of pale driftwood and coral holding a floating orb of blue water.
16. Stone Rod — magic weapon: a short thick rod of carved grey stone topped with an amber crystal cluster.
17. Shade Staff — magic weapon: a thin black staff topped with a violet crescent moon and drifting shadow.
18. Sovereign Staff — magic weapon: a white-gold staff crowned with a ring of six small gems: red, blue, green, amber, yellow and violet.
19. Thorn Arrow — ammunition: an arrow with a green thorn-vine wrapped shaft and a thorn tip.
20. Shock Arrow — ammunition: an arrow with a tip of crackling yellow lightning.
21. Thorn Dart — ammunition: a short crossbow dart with a green thorn tip and leaf fletching.
22. Shock Dart — ammunition: a short crossbow dart with a tip of crackling yellow lightning.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_misc2

Item icons — gems, draughts, the Sovereign armor, and five menu symbols (round 37) · wave 37 · 25 items, 5 × 5 · 1024x1024

- `ic_gem_amber` Amber — 48 × 48 px
- `ic_gem_topaz` Topaz — 48 × 48 px
- `ic_gem_onyx` Onyx — 48 × 48 px
- `ic_gem_heartseed` Heartseed — 48 × 48 px
- `ic_band_ring` Silver Band — 48 × 48 px
- `ic_sov_ring` Sovereign Ring — 48 × 48 px
- `ic_ward_fire` Emberward Draught — 48 × 48 px
- `ic_ward_water` Tideward Draught — 48 × 48 px
- `ic_ward_grass` Thornward Draught — 48 × 48 px
- `ic_ward_earth` Stoneward Draught — 48 × 48 px
- `ic_ward_storm` Stormward Draught — 48 × 48 px
- `ic_ward_shadow` Shadeward Draught — 48 × 48 px
- `ic_sov_shield` Sovereign Aegis — 48 × 48 px
- `ic_sov_plate` Sovereign Plate — 48 × 48 px
- `ic_sov_crown` Sovereign Crown — 48 × 48 px
- `ic_sov_greaves` Sovereign Greaves — 48 × 48 px
- `ic_sov_gauntlets` Sovereign Gauntlets — 48 × 48 px
- `ic_sov_boots` Sovereign Boots — 48 × 48 px
- `ic_sov_amulet` Sovereign Amulet — 48 × 48 px
- `ic_sov_mantle` Sovereign Mantle — 48 × 48 px
- `el_storm` Storm element — 48 × 48 px
- `el_shadow` Shadow element — 48 × 48 px
- `tm_forge` Forge tree chapter — 48 × 48 px
- `tm_paths` Paths chapter — 48 × 48 px
- `tm_elements` Elements chapter — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 25 separate game icons — Item icons — gems, draughts, the Sovereign armor, and five menu symbols (round 37).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 25 objects in a grid of 5 columns × 5 rows, evenly spaced, in this order (left to right, top row first):
1. Amber — gem or treasure: a cut honey-amber gem, warm orange-brown, faceted.
2. Topaz — gem or treasure: a cut bright yellow topaz with a tiny spark inside.
3. Onyx — gem or treasure: a cut black onyx with a violet glint.
4. Heartseed — gem or treasure: a large glowing green seed with a golden sprout curling from it.
5. Silver Band — finger ring: a plain polished silver finger ring with an empty gem setting.
6. Sovereign Ring — finger ring: a white-gold ring set with six tiny gems in a circle: red, blue, green, amber, yellow, violet.
7. Emberward Draught — potion bottle: a round bottle of cool pale-blue liquid with a small red flame crossed out on the label.
8. Tideward Draught — potion bottle: a round bottle of warm amber liquid with a blue wave on the label.
9. Thornward Draught — potion bottle: a round bottle of orange liquid with a green thorn on the label.
10. Stoneward Draught — potion bottle: a round bottle of leaf-green liquid with a grey stone on the label.
11. Stormward Draught — potion bottle: a round bottle of violet liquid with a yellow lightning bolt on the label.
12. Shadeward Draught — potion bottle: a round bottle of glowing golden liquid with a violet crescent on the label.
13. Sovereign Aegis — shield: a white-gold shield with six small gems round a central rune: red, blue, green, amber, yellow, violet.
14. Sovereign Plate — body armor (the torso piece on its own, no person): a white-gold chest plate with six small gems across the collar: red, blue, green, amber, yellow, violet.
15. Sovereign Crown — headgear on its own: a white-gold crown with six gem points: red, blue, green, amber, yellow, violet.
16. Sovereign Greaves — leg armor on its own: white-gold leg armor with small gems down the sides in six colours.
17. Sovereign Gauntlets — pair of gauntlets: a pair of white-gold gauntlets with a small gem on each knuckle in six colours.
18. Sovereign Boots — pair of boots: a pair of white-gold boots with small gems round the cuffs in six colours.
19. Sovereign Amulet — amulet on a chain: a white-gold amulet on a chain: a ring of six small gems round a bright white centre.
20. Sovereign Mantle — cloak on its own, hanging open: a white cloak with a gold border and a clasp of six small gems.
21. Storm element — a yellow lightning bolt as a round badge.
22. Shadow element — a violet crescent moon as a round badge.
23. Forge tree chapter — an anvil with three glowing branches rising from it like a tree.
24. Paths chapter — three small linked rune stones joined by glowing lines.
25. Elements chapter — a ring of six small coloured orbs: red, blue, green, amber, yellow, violet.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_r45

Item icons — shadow swords, two-element master-works, their rare forging items and Petal Step (round 45) · wave 46 · 19 items, 5 × 4 · 1536x1024

- `ic_dusk_iron` Dusk Iron — 48 × 48 px
- `ic_umbral_edge` Umbral Edge — 48 × 48 px
- `ic_nightfang` Nightfang — 48 × 48 px
- `ic_void_reaver` Void Reaver — 48 × 48 px
- `ic_ashbloom_glaive` Ashbloom Glaive — 48 × 48 px
- `ic_tidebloom_blade` Tidebloom Blade — 48 × 48 px
- `ic_abyssal_edge` Abyssal Edge — 48 × 48 px
- `ic_hellbrand` Hellbrand — 48 × 48 px
- `ic_galebriar_axe` Galebriar Axe — 48 × 48 px
- `ic_thunderpeak_maul` Thunderpeak Maul — 48 × 48 px
- `ic_gravewarden_maul` Gravewarden Maul — 48 × 48 px
- `ic_phoenix_ember` Phoenix Ember — 48 × 48 px
- `ic_lotus_pearl` Lotus Pearl — 48 × 48 px
- `ic_abyss_pearl` Abyss Pearl — 48 × 48 px
- `ic_obsidian_heart` Obsidian Heart — 48 × 48 px
- `ic_thunderseed` Thunderseed — 48 × 48 px
- `ic_lodestone` Lodestone — 48 × 48 px
- `ic_grave_amber` Grave Amber — 48 × 48 px
- `ic_sp_petalstep` Petal Step — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 19 separate game icons — Item icons — shadow swords, two-element master-works, their rare forging items and Petal Step (round 45).
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 19 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first); the last 1 cell(s) stay empty:
1. Dusk Iron — melee weapon: a plain iron sword whose blade fades to violet-black at the tip, with a faint wisp of shadow.
2. Umbral Edge — melee weapon: a slim dark-violet sword with a glowing lilac edge and smoke curling off it.
3. Nightfang — melee weapon: a curved black fang-shaped blade with a violet glow along the inner edge and a crescent-moon guard.
4. Void Reaver — melee weapon: a great black sword with a starry violet void inside the blade and a pale moon-shard set in the hilt.
5. Ashbloom Glaive — battle axe or maul: a long axe-glaive of charred wood whose blade bursts into orange flame-petals, green leaves curling up the haft.
6. Tidebloom Blade — melee weapon: a sea-blue sword with lotus flowers and green vines wound round it, water drops on the blade.
7. Abyssal Edge — melee weapon: a deep-navy sword like dark sea water with violet shadow inside, a black pearl in the guard.
8. Hellbrand — melee weapon: a black obsidian sword with violet-red flames licking from cracks in the blade.
9. Galebriar Axe — battle axe or maul: an axe of living green wood with thorny vines, small yellow lightning arcs jumping between the thorns.
10. Thunderpeak Maul — battle axe or maul: a heavy stone maul shaped like a mountain peak with a lightning bolt crackling over its top.
11. Gravewarden Maul — battle axe or maul: a dark granite maul carved with grave runes, violet mist seeping from its cracks, amber glowing inside.
12. Phoenix Ember — gem or treasure: a glowing orange-gold coal with a tiny green leaf sprouting from its flame.
13. Lotus Pearl — gem or treasure: a pale-blue pearl sitting in an open pink-and-green lotus flower.
14. Abyss Pearl — gem or treasure: a glossy black pearl with a violet sheen and a ring of dark water around it.
15. Obsidian Heart — gem or treasure: a heart-shaped piece of black volcanic glass with violet-red fire glowing inside.
16. Thunderseed — gem or treasure: a big green-gold seed with yellow lightning crackling around it.
17. Lodestone — gem or treasure: a dark grey magnetic stone with yellow sparks drawn to its points.
18. Grave Amber — gem or treasure: a dark amber gem with a violet shadow trapped inside like a moth.
19. Petal Step — skill emblem: a swirl of yellow sunflower petals around a dancing footprint.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_r45b

Item icons — the elemental bows, the warbows and the Squall Pearl (round 45), with the last fairy-quest treasures · wave 48 · 19 items, 5 × 4 · 1536x1024

- `ic_ember_bow` Ember Bow — 48 × 48 px
- `ic_tide_bow` Tide Bow — 48 × 48 px
- `ic_briar_bow` Briar Bow — 48 × 48 px
- `ic_granite_bow` Granite Bow — 48 × 48 px
- `ic_thunder_bow` Thunder Bow — 48 × 48 px
- `ic_shade_bow` Shade Bow — 48 × 48 px
- `ic_sunbloom_warbow` Sunbloom Warbow — 48 × 48 px
- `ic_squall_warbow` Squall Warbow — 48 × 48 px
- `ic_barrow_warbow` Barrow Warbow — 48 × 48 px
- `ic_squall_pearl` Squall Pearl — 48 × 48 px
- `fo_crown_pearl` Crown Pearl — 48 × 48 px
- `fo_mere_harp` Mere Harp — 48 × 48 px
- `fo_wisp_jar` Jar of Wisps — 48 × 48 px
- `fo_frost_crown` Frost Circlet — 48 × 48 px
- `fo_dwarf_anvil` Dwarf Anvil-charm — 48 × 48 px
- `fo_petrified_heart` Petrified Heart — 48 × 48 px
- `fo_forge_ember` Undying Ember — 48 × 48 px
- `fo_sulfur_crystal` Sulfur Crystal — 48 × 48 px
- `fo_cathedral_bell` Cathedral Bell — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 19 separate game icons — Item icons — the elemental bows, the warbows and the Squall Pearl (round 45), with the last fairy-quest treasures.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 19 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first); the last 1 cell(s) stay empty:
1. Ember Bow — ranged weapon: a longbow of dark red wood with glowing orange embers along the limbs and a string of fire.
2. Tide Bow — ranged weapon: a sea-blue longbow curved like a wave, foam at the tips and a pale-blue string.
3. Briar Bow — ranged weapon: a longbow of living green wood with thorny vines and small leaves along the limbs.
4. Granite Bow — ranged weapon: a heavy longbow with carved grey-stone limbs and amber studs at the grip.
5. Thunder Bow — ranged weapon: a pale-gold longbow with a crackling yellow lightning string and storm-cloud tips.
6. Shade Bow — ranged weapon: a violet-black longbow trailing wisps of shadow, a small crescent moon at the grip.
7. Sunbloom Warbow — ranged weapon: a great longbow, one limb of glowing orange flame-petals and the other of green leafy vine, a sunflower at the grip.
8. Squall Warbow — ranged weapon: a great longbow, one limb of curling sea-blue water and the other of yellow lightning, rain falling off it.
9. Barrow Warbow — ranged weapon: a great longbow, one limb of dark carved stone and the other of violet shadow, grave runes along it.
10. Squall Pearl — gem or treasure: a grey-blue pearl with a tiny storm cloud and yellow lightning inside it, sea spray around it.
11. Crown Pearl — a single small treasure: crown pearl, found among the lantern lilies.
12. Mere Harp — a single small treasure: mere harp, found under the glowing mangroves.
13. Jar of Wisps — a single small treasure: jar of wisps, found in the wisp cattail maze.
14. Frost Circlet — a single small treasure: frost circlet, found up on the glacier peaks.
15. Dwarf Anvil-charm — a single small treasure: dwarf anvil-charm, found by the dwarven stairs.
16. Petrified Heart — a single small treasure: petrified heart, found in the petrified forest.
17. Undying Ember — a single small treasure: undying ember, found in the forge-city ruins.
18. Sulfur Crystal — a single small treasure: sulfur crystal, found among the sulfur geysers.
19. Cathedral Bell — a single small treasure: cathedral bell, found in the burned cathedral.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_tome_1

Tome pictures — the regions of the world (1 of 2): each a tiny round vignette of the place · wave 48 · 20 items, 5 × 4 · 1536x1024

- `tm_zone_waystone_road` Waystone Ancient Road — 48 × 48 px
- `tm_zone_fairy_rings` Fairy-Ring Meadows — 48 × 48 px
- `tm_zone_firefly_river` Firefly River Valley — 48 × 48 px
- `tm_zone_windmill_hills` Windmill Hills — 48 × 48 px
- `tm_zone_standing_stones` Runic Standing Stones — 48 × 48 px
- `tm_zone_giant_bones` Moss-covered Giant Bones — 48 × 48 px
- `tm_zone_blossom_terraces` Blossom Orchard Terraces — 48 × 48 px
- `tm_zone_amphitheatre` Sunken Amphitheatre Ruins — 48 × 48 px
- `tm_zone_crystal_grass` Crystal-tipped Tallgrass — 48 × 48 px
- `tm_zone_floating_rocks` Floating-Rock Meadow — 48 × 48 px
- `tm_zone_lantern_lilies` Lantern Lily Marsh — 48 × 48 px
- `tm_zone_rune_stepping` Rune Stepping Stones — 48 × 48 px
- `tm_zone_sunken_spires` Sunken Temple Spires — 48 × 48 px
- `tm_zone_glowfrog_pools` Glow-Frog Pools — 48 × 48 px
- `tm_zone_willow_cathedral` Willow Cathedral — 48 × 48 px
- `tm_zone_glow_mangroves` Bioluminescent Mangroves — 48 × 48 px
- `tm_zone_wisp_cattails` Wisp Cattail Maze — 48 × 48 px
- `tm_zone_turtle_isles` Giant Turtle-Shell Isles — 48 × 48 px
- `tm_zone_drowned_village` Drowned Village Rooftops — 48 × 48 px
- `tm_zone_stilt_walkways` Misty Stilt Walkways — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 20 separate game icons — Tome pictures — the regions of the world (1 of 2): each a tiny round vignette of the place.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 20 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first):
1. Waystone Ancient Road — a tiny round painted vignette of a place, like a map-book illustration: An old paved road lined with rune waystones..
2. Fairy-Ring Meadows — a tiny round painted vignette of a place, like a map-book illustration: Glowing mushroom rings in wildflower meadows..
3. Firefly River Valley — a tiny round painted vignette of a place, like a map-book illustration: A winding river, willows and fireflies..
4. Windmill Hills — a tiny round painted vignette of a place, like a map-book illustration: Rolling hills, windmills and glyph kites..
5. Runic Standing Stones — a tiny round painted vignette of a place, like a map-book illustration: Stone circles joined by ley lines on the heath..
6. Moss-covered Giant Bones — a tiny round painted vignette of a place, like a map-book illustration: An ancient giant's skeleton under the grass..
7. Blossom Orchard Terraces — a tiny round painted vignette of a place, like a map-book illustration: Stepped orchards of cherry blossom..
8. Sunken Amphitheatre Ruins — a tiny round painted vignette of a place, like a map-book illustration: Grass-grown stone tiers around a rune stage..
9. Crystal-tipped Tallgrass — a tiny round painted vignette of a place, like a map-book illustration: Waist-high grass with glowing crystal tips..
10. Floating-Rock Meadow — a tiny round painted vignette of a place, like a map-book illustration: Grassy islets drifting above the meadow..
11. Lantern Lily Marsh — a tiny round painted vignette of a place, like a map-book illustration: Ponds of lily pads and glowing lantern flowers..
12. Rune Stepping Stones — a tiny round painted vignette of a place, like a map-book illustration: A lake crossed on glowing rune stones..
13. Sunken Temple Spires — a tiny round painted vignette of a place, like a map-book illustration: Rune spires rising from green shallows..
14. Glow-Frog Pools — a tiny round painted vignette of a place, like a map-book illustration: Dozens of little pools and shining frogs..
15. Willow Cathedral — a tiny round painted vignette of a place, like a map-book illustration: A nave of giant willows and moss curtains..
16. Bioluminescent Mangroves — a tiny round painted vignette of a place, like a map-book illustration: Glowing roots over shallow blue water..
17. Wisp Cattail Maze — a tiny round painted vignette of a place, like a map-book illustration: Head-high cattails and drifting wisps..
18. Giant Turtle-Shell Isles — a tiny round painted vignette of a place, like a map-book illustration: Islands that are the backs of sleeping turtles..
19. Drowned Village Rooftops — a tiny round painted vignette of a place, like a map-book illustration: Rooftops and a bell tower above a flooded town..
20. Misty Stilt Walkways — a tiny round painted vignette of a place, like a map-book illustration: Plank walks between huts on stilts..
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_tome_2

Tome pictures — the regions of the world (2 of 2): each a tiny round vignette of the place · wave 48 · 20 items, 5 × 4 · 1536x1024

- `tm_zone_dwarven_stairs` Dwarven Stair-cut Cliffs — 48 × 48 px
- `tm_zone_golem_graveyard` Golem Graveyard — 48 × 48 px
- `tm_zone_runic_mesas` Runic Mesas — 48 × 48 px
- `tm_zone_petrified_forest` Petrified Forest — 48 × 48 px
- `tm_zone_herder_terraces` Terraced Herder Slopes — 48 × 48 px
- `tm_zone_windharp_ridges` Wind-harp Ridges — 48 × 48 px
- `tm_zone_geode_canyons` Crystal Geode Canyons — 48 × 48 px
- `tm_zone_glacier_peaks` Glacier-veined Peaks — 48 × 48 px
- `tm_zone_giants_chessboard` Giant's Chessboard Plateau — 48 × 48 px
- `tm_zone_starfall_crater` Starfall Crater Field — 48 × 48 px
- `tm_zone_emberflower_fields` Ember-flower Fields — 48 × 48 px
- `tm_zone_burned_cathedral` Burned Cathedral Ruins — 48 × 48 px
- `tm_zone_obsidian_glass` Obsidian Glass Fields — 48 × 48 px
- `tm_zone_sulfur_geysers` Sulfur Geyser Flats — 48 × 48 px
- `tm_zone_forge_ruins` Smouldering Forge-city Ruins — 48 × 48 px
- `tm_zone_ashsnow_forest` Ash-snow Dead Forest — 48 × 48 px
- `tm_zone_magma_channels` Magma Rune Channels — 48 × 48 px
- `tm_zone_basalt_forest` Basalt Column Forest — 48 × 48 px
- `tm_zone_dragon_valley` Dragon Skeleton Valley — 48 × 48 px
- `tm_zone_chained_rocks` Chained Floating Rocks — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 20 separate game icons — Tome pictures — the regions of the world (2 of 2): each a tiny round vignette of the place.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 20 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first):
1. Dwarven Stair-cut Cliffs — a tiny round painted vignette of a place, like a map-book illustration: Cliff terraces cut with stairs and rune doors..
2. Golem Graveyard — a tiny round painted vignette of a place, like a map-book illustration: Fallen stone golems with sleeping rune cores..
3. Runic Mesas — a tiny round painted vignette of a place, like a map-book illustration: Red flat-topped mesas carved with runes..
4. Petrified Forest — a tiny round painted vignette of a place, like a map-book illustration: A forest turned to stone..
5. Terraced Herder Slopes — a tiny round painted vignette of a place, like a map-book illustration: Mountain terraces, huts, sheep and banners..
6. Wind-harp Ridges — a tiny round painted vignette of a place, like a map-book illustration: Windswept ridges strung with singing harps..
7. Crystal Geode Canyons — a tiny round painted vignette of a place, like a map-book illustration: Winding canyons lined with split geodes..
8. Glacier-veined Peaks — a tiny round painted vignette of a place, like a map-book illustration: Snowfields, rock and glowing blue ice veins..
9. Giant's Chessboard Plateau — a tiny round painted vignette of a place, like a map-book illustration: A huge chessboard with pieces the size of towers..
10. Starfall Crater Field — a tiny round painted vignette of a place, like a map-book illustration: Craters with glowing fallen-star cores..
11. Ember-flower Fields — a tiny round painted vignette of a place, like a map-book illustration: Dark fields of glowing ember flowers..
12. Burned Cathedral Ruins — a tiny round painted vignette of a place, like a map-book illustration: A roofless cathedral of charred stone and glass..
13. Obsidian Glass Fields — a tiny round painted vignette of a place, like a map-book illustration: Black glass plains cracked with ember veins..
14. Sulfur Geyser Flats — a tiny round painted vignette of a place, like a map-book illustration: Yellow crust, steaming vents and green pools..
15. Smouldering Forge-city Ruins — a tiny round painted vignette of a place, like a map-book illustration: A ruined forge city with smoking chimneys..
16. Ash-snow Dead Forest — a tiny round painted vignette of a place, like a map-book illustration: Grey dead trees under falling ash..
17. Magma Rune Channels — a tiny round painted vignette of a place, like a map-book illustration: Lava flowing through channels cut as runes..
18. Basalt Column Forest — a tiny round painted vignette of a place, like a map-book illustration: A maze of towering hexagonal basalt columns..
19. Dragon Skeleton Valley — a tiny round painted vignette of a place, like a map-book illustration: A valley holding a dragon's skeleton..
20. Chained Floating Rocks — a tiny round painted vignette of a place, like a map-book illustration: Basalt islands and chained rocks over a lava lake..
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_tome_3

Tome pictures — the boss arenas: each a tiny round vignette of the battleground · wave 48 · 20 items, 5 × 4 · 1536x1024

- `tm_arena_throne_warren` The Throne Warren — 48 × 48 px
- `tm_arena_moon_canopy` The Moonlit Canopy — 48 × 48 px
- `tm_arena_sunken_grotto` The Sunken Grotto — 48 × 48 px
- `tm_arena_cauldron_pit` The Cauldron Pit — 48 × 48 px
- `tm_arena_cathedral_roof` The Cathedral Rooftop — 48 × 48 px
- `tm_arena_storm_eye` The Eye of the Storm — 48 × 48 px
- `tm_arena_geode_hollow` The Geode Hollow — 48 × 48 px
- `tm_arena_chasm_bridge` The Chasm Bridge — 48 × 48 px
- `tm_arena_dragon_summit` The Dragon's Summit — 48 × 48 px
- `tm_arena_gear_hall` The Gear Hall — 48 × 48 px
- `tm_arena_observatory_dome` The Observatory Dome — 48 × 48 px
- `tm_arena_star_forge` The Star Forge — 48 × 48 px
- `tm_arena_crust_field` The Cooling Crust — 48 × 48 px
- `tm_arena_lava_falls` The Lava Falls Terrace — 48 × 48 px
- `tm_arena_caldera_rim` The Caldera Rim — 48 × 48 px
- `tm_arena_volcano_heart` The Heart of the Volcano — 48 × 48 px
- `tm_arena_shattered_sanctum` The Shattered Sanctum — 48 × 48 px
- `tm_arena_mirror_hall` The Hall of Mirrors — 48 × 48 px
- `tm_arena_starless_void` The Starless Void — 48 × 48 px
- `tm_arena_dawn_altar` The Dawn Altar — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 20 separate game icons — Tome pictures — the boss arenas: each a tiny round vignette of the battleground.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 20 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first):
1. The Throne Warren — a tiny round painted vignette of a place, like a map-book illustration: A torch-lit goblin fighting pit ringed with spiked barricades..
2. The Moonlit Canopy — a tiny round painted vignette of a place, like a map-book illustration: Tree-top platforms joined by branches over a dark drop..
3. The Sunken Grotto — a tiny round painted vignette of a place, like a map-book illustration: Mossy islands in black water; mud geysers bubble up..
4. The Cauldron Pit — a tiny round painted vignette of a place, like a map-book illustration: A ring of stone around a boiling pool of witch-brew..
5. The Cathedral Rooftop — a tiny round painted vignette of a place, like a map-book illustration: A cross of slate roof ridges high above the storm clouds..
6. The Eye of the Storm — a tiny round painted vignette of a place, like a map-book illustration: A floating stone ring around the storm's calm, lightning all round..
7. The Geode Hollow — a tiny round painted vignette of a place, like a map-book illustration: The inside of a giant geode — crystal spires everywhere..
8. The Chasm Bridge — a tiny round painted vignette of a place, like a map-book illustration: A winding stone bridge over a bottomless chasm; the ceiling is falling..
9. The Dragon's Summit — a tiny round painted vignette of a place, like a map-book illustration: A wind-scoured mountain top ringed by lava vents..
10. The Gear Hall — a tiny round painted vignette of a place, like a map-book illustration: Rows of giant gears and steam vents under the observatory..
11. The Observatory Dome — a tiny round painted vignette of a place, like a map-book illustration: A ring of floor around the great telescope well, starlight pouring in..
12. The Star Forge — a tiny round painted vignette of a place, like a map-book illustration: Anvil islands over a river of molten star-metal..
13. The Cooling Crust — a tiny round painted vignette of a place, like a map-book illustration: Slabs of black crust drifting on lava..
14. The Lava Falls Terrace — a tiny round painted vignette of a place, like a map-book illustration: Stepped terraces with lava channels between them..
15. The Caldera Rim — a tiny round painted vignette of a place, like a map-book illustration: A narrow rim around the volcano's lava lake..
16. The Heart of the Volcano — a tiny round painted vignette of a place, like a map-book illustration: Molten core chambers; everything burns..
17. The Shattered Sanctum — a tiny round painted vignette of a place, like a map-book illustration: A broken chapel; pools of living shadow on the floor..
18. The Hall of Mirrors — a tiny round painted vignette of a place, like a map-book illustration: Gilded mirrors on a cross of marble over the dark..
19. The Starless Void — a tiny round painted vignette of a place, like a map-book illustration: Floating shards of stone in nothing at all..
20. The Dawn Altar — a tiny round painted vignette of a place, like a map-book illustration: A golden altar floor lit by the first light of dawn..
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_ic_tome_4

Fairy-quest treasures — small magical objects dug out of the ground, each glowing faintly · wave 48 · 20 items, 5 × 4 · 1536x1024

- `fo_silver_acorn` Silver Acorn — 48 × 48 px
- `fo_dew_pearl` Dewdrop Pearl — 48 × 48 px
- `fo_bell_flower` Singing Bluebell — 48 × 48 px
- `fo_sun_shard` Sunstone Shard — 48 × 48 px
- `fo_sky_feather` Sky-roc Feather — 48 × 48 px
- `fo_moon_lily` Moonlily Bulb — 48 × 48 px
- `fo_tide_shell` Tide-song Shell — 48 × 48 px
- `fo_willow_ring` Willow Ring — 48 × 48 px
- `fo_drowned_bell` Drowned Bell — 48 × 48 px
- `fo_stilt_lantern` Marsh Lantern — 48 × 48 px
- `fo_geode_heart` Geode Heart — 48 × 48 px
- `fo_golem_eye` Golem Eye — 48 × 48 px
- `fo_stone_bishop` Stone Bishop — 48 × 48 px
- `fo_herder_horn` Herder's Horn — 48 × 48 px
- `fo_star_iron` Star-iron — 48 × 48 px
- `fo_ember_seed` Ember Seed — 48 × 48 px
- `fo_obsidian_key` Obsidian Key — 48 × 48 px
- `fo_ash_bloom` Ash-snow Bloom — 48 × 48 px
- `fo_basalt_rune` Basalt Rune — 48 × 48 px
- `fo_dragon_tooth` Dragon Tooth — 48 × 48 px

Attach: style_hero, style_centaur, sc_ic_heartglass

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 20 separate game icons — Fairy-quest treasures — small magical objects dug out of the ground, each glowing faintly.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 20 objects in a grid of 5 columns × 4 rows, evenly spaced, in this order (left to right, top row first):
1. Silver Acorn — a single small treasure: silver acorn, found under the old windmill hill.
2. Dewdrop Pearl — a single small treasure: dewdrop pearl, found between the blossom terraces.
3. Singing Bluebell — a single small treasure: singing bluebell, found inside the ring of standing stones.
4. Sunstone Shard — a single small treasure: sunstone shard, found among the crystal-tipped grass.
5. Sky-roc Feather — a single small treasure: sky-roc feather, found beneath the floating rocks.
6. Moonlily Bulb — a single small treasure: moonlily bulb, found by the glow-frog pools.
7. Tide-song Shell — a single small treasure: tide-song shell, found on the turtle-shell isles.
8. Willow Ring — a single small treasure: willow ring, found under the willow cathedral.
9. Drowned Bell — a single small treasure: drowned bell, found in the drowned village.
10. Marsh Lantern — a single small treasure: marsh lantern, found below the stilt walkways.
11. Geode Heart — a single small treasure: geode heart, found deep in the geode canyons.
12. Golem Eye — a single small treasure: golem eye, found in the golem graveyard.
13. Stone Bishop — a single small treasure: stone bishop, found on the giant's chessboard.
14. Herder's Horn — a single small treasure: herder's horn, found on the herder terraces.
15. Star-iron — a single small treasure: star-iron, found in the starfall crater.
16. Ember Seed — a single small treasure: ember seed, found in the ember-flower fields.
17. Obsidian Key — a single small treasure: obsidian key, found out on the obsidian glass.
18. Ash-snow Bloom — a single small treasure: ash-snow bloom, found in the ash-snow forest.
19. Basalt Rune — a single small treasure: basalt rune, found among the basalt columns.
20. Dragon Tooth — a single small treasure: dragon tooth, found in the dragon skeleton valley.
View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_asg_wall_opts

Asgard on the lake — the walls, towers and great gate, three styles (one style per ROW, top to bottom: A, B, C); the city of the gods in Norse myth, all white stone, cream marble and gold; noble, bright and clean, slender columns and tall spires; original designs, no text · wave 61 · 9 items, 3 × 3 · 1536x1024

- `asgA_wall` A · wall — 170 × 120 px
- `asgA_tower` A · tower — 96 × 210 px
- `asgA_gate` A · great gate — 190 × 170 px
- `asgB_wall` B · wall — 170 × 120 px
- `asgB_tower` B · tower — 96 × 210 px
- `asgB_gate` B · great gate — 190 × 170 px
- `asgC_wall` C · wall — 170 × 120 px
- `asgC_tower` C · tower — 96 × 210 px
- `asgC_gate` C · great gate — 190 × 170 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 9 separate pieces of scenery — Asgard on the lake — the walls, towers and great gate, three styles (one style per ROW, top to bottom: A, B, C); the city of the gods in Norse myth, all white stone, cream marble and gold; noble, bright and clean, slender columns and tall spires; original designs, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 9 objects in a grid of 3 columns × 3 rows, evenly spaced, in this order (left to right, top row first):
1. A · wall — a straight section of a tall city wall of smooth WHITE stone blocks with gold-capped battlements, seen from above-front like the game scenery (about 1.9× the hero's height).
2. A · tower — a round tower of white stone with a tall pointed GOLD spire roof and a gold finial (about 3.3× the hero's height).
3. A · great gate — a great arched gate of white stone with two tall golden doors, closed, gold runes over the arch (about 2.7× the hero's height).
4. B · wall — a straight section of a city wall of CREAM marble with a frieze of gilded knotwork along the top, rounded merlons (about 1.9× the hero's height).
5. B · tower — a slender cream-marble tower crowned by a GILDED onion-shaped dome on a ring of little columns (about 3.3× the hero's height).
6. B · great gate — a gatehouse of cream marble between two gilded domes, a portcullis of gold lattice, closed (about 2.7× the hero's height).
7. C · wall — a straight section of a wall of PALE GRANITE blocks banded with three glowing gold rune-lines, plain square battlements (about 1.9× the hero's height).
8. C · tower — a square pale-granite tower with gold rune-bands and a steep gold-tiled roof, a gold raven weather-vane (about 3.3× the hero's height).
9. C · great gate — a tall square gate of pale granite, its doors one great gold shield-boss each, gold rune-bands, closed (about 2.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_asg_keep_opts

Asgard — the citadel at the heart of the island (it rises in the middle, the four floors of Asgard are inside it); the city of the gods in Norse myth, all white stone, cream marble and gold; noble, bright and clean, slender columns and tall spires; original designs, no text · wave 61 · 3 items, 3 × 1 · 1536x1024

- `asg_keep_a` Citadel of spires — 300 × 360 px
- `asg_keep_b` Hall of shields — 340 × 300 px
- `asg_keep_c` Tree-crowned keep — 300 × 360 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 3 separate pieces of scenery — Asgard — the citadel at the heart of the island (it rises in the middle, the four floors of Asgard are inside it); the city of the gods in Norse myth, all white stone, cream marble and gold; noble, bright and clean, slender columns and tall spires; original designs, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 3 objects in a grid of 3 columns × 1 rows, evenly spaced, in this order (left to right, top row first):
1. Citadel of spires — a tall palace of white stone, a cluster of slender towers with gold spires round one great central spire, a gold door at its foot (about 5.7× the hero's height).
2. Hall of shields — a great long hall of cream marble whose roof is covered in golden shields like Valhöll, tall columns along its front, a gold door (about 4.8× the hero's height).
3. Tree-crowned keep — a round keep of pale stone ringed with columns, crowned by a white-and-gold tree of light whose branches spread over it, a gold door (about 5.7× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_asg_ground_opts

Asgard — the ground inside the walls, three tileable ground textures seen straight from above · wave 61 · 3 items, 3 × 1 · 1536x1024

- `tx_asg_a` White marble flags — 256 × 256 px
- `tx_asg_b` Cream rune-paving — 256 × 256 px
- `tx_asg_c` Cloud-moss paving — 256 × 256 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 3 square ground-texture swatches — Asgard — the ground inside the walls, three tileable ground textures seen straight from above.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 3 swatches in a grid of 3 columns × 1 rows, evenly spaced, in this order (left to right, top row first):
1. White marble flags — large white marble flagstones with thin gold seams between them.
2. Cream rune-paving — cream stone paving with a faint inlaid pattern of pale gold runes.
3. Cloud-moss paving — pale grey paving stones with soft white cloud-moss and tiny gold flowers in the joints.
View: seen from straight above, flat.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.
Background between the squares: plain white.
```

## sc_bifrost_opts

The Bifröst — a short straight section of the bridge from the village pier to Asgard, seen from above-front like the game scenery (it is tiled end to end), running left to right; original designs, no text · wave 61 · 3 items, 3 × 1 · 1536x1024

- `bif_a` Rainbow light — 200 × 96 px
- `bif_b` Crystal and rainbow — 200 × 96 px
- `bif_c` Rune-lit stone — 200 × 96 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 3 separate pieces of scenery — The Bifröst — a short straight section of the bridge from the village pier to Asgard, seen from above-front like the game scenery (it is tiled end to end), running left to right; original designs, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 3 objects in a grid of 3 columns × 1 rows, evenly spaced, in this order (left to right, top row first):
1. Rainbow light — a bridge of solid rainbow light: bands of red, orange, gold, green, blue and violet running along its length, translucent soft edges, a shimmer (about 1.5× the hero's height).
2. Crystal and rainbow — a bridge of clear crystal slabs with a rainbow shimmering inside the crystal, thin gold rails (about 1.5× the hero's height).
3. Rune-lit stone — a white stone bridge whose paving and low railings glow with lines of rainbow runes (about 1.5× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_notch_opts

The notch at the end of the village pier — where the Lodestar is set to call the Bifröst; the end of a wooden pier on the lake, seen from above-front like the game scenery; original designs, no text · wave 61 · 3 items, 3 × 1 · 1536x1024

- `notch_a` Carved post — 140 × 150 px
- `notch_b` Rune stone — 140 × 150 px
- `notch_c` Iron cradle — 140 × 150 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 3 separate pieces of scenery — The notch at the end of the village pier — where the Lodestar is set to call the Bifröst; the end of a wooden pier on the lake, seen from above-front like the game scenery; original designs, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 3 objects in a grid of 3 columns × 1 rows, evenly spaced, in this order (left to right, top row first):
1. Carved post — the last planks of a wooden pier, at its end a thick old oak post carved with runes and a staff-shaped notch cut into its top (about 2.4× the hero's height).
2. Rune stone — the end of a wooden pier where a short standing stone is set into the boards, a staff-shaped slot carved down its face, faint runes (about 2.4× the hero's height).
3. Iron cradle — the end of a wooden pier with a small iron cradle bolted to the boards, shaped to hold a staff upright, a ring of rune-plates round it (about 2.4× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_asg_circle_opts

The rune circle at the heart of liberated Asgard — like the rune circle on the village green; here the hero raises the Lodestar and casts Godsbane into the sky; seen from above; the city of the gods in Norse myth, all white stone, cream marble and gold; noble, bright and clean, slender columns and tall spires; original designs, no text · wave 61 · 3 items, 3 × 1 · 1536x1024

- `asg_circle_a` Gold ring of runes — 220 × 140 px
- `asg_circle_b` Standing stones of light — 220 × 140 px
- `asg_circle_c` World-tree mosaic — 220 × 140 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 3 separate pieces of scenery — The rune circle at the heart of liberated Asgard — like the rune circle on the village green; here the hero raises the Lodestar and casts Godsbane into the sky; seen from above; the city of the gods in Norse myth, all white stone, cream marble and gold; noble, bright and clean, slender columns and tall spires; original designs, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 3 objects in a grid of 3 columns × 1 rows, evenly spaced, in this order (left to right, top row first):
1. Gold ring of runes — a wide round floor of white marble with a ring of gold runes, a smaller ring inside it, a gold socket for a staff in the middle (about 3.5× the hero's height across).
2. Standing stones of light — a round paved floor ringed by eight short white standing stones with gold tips, runes glowing between them, a socket in the middle (about 3.5× the hero's height across).
3. World-tree mosaic — a round floor with a mosaic of the world tree in white, cream and gold, its roots forming a ring of runes, a socket in the middle (about 3.5× the hero's height across).
View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_pn_musp_sink_a

Story panel — Muspelheim sinks (option A) · wave 61 · 1 items, 1 × 1 · 1536x1024

- `pn_musp_sink_a` Story panel — Muspelheim sinks (option A) — 1536 × 1024 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D action RPG called The Quests of Zeldara and Zeldor: Story panel — Muspelheim sinks (option A), a painted story panel shown during a cut-scene.
The reference images show the game's characters; use them only for the art style (outline weight, flat cel shading, teal highlights, magenta rim) — a bold hand-drawn cartoon game look, not a photo, not 3D.
Subject: a wide cinematic painting: seen from the mainland shore at dusk, the great black volcano island of Muspelheim breaking apart and sinking into a boiling sea, lava pouring from its cracks, pillars of steam and smoke, the causeway gone; small pale-blue spirit lights and the hero, tiny, watching from the rocks in the foreground.
The painting fills the whole image edge to edge like a wide film still. No text, no labels, no frame, no UI.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_pn_musp_sink_b

Story panel — Muspelheim sinks (option B) · wave 61 · 1 items, 1 × 1 · 1536x1024

- `pn_musp_sink_b` Story panel — Muspelheim sinks (option B) — 1536 × 1024 px

Attach: style_hero, style_centaur, sc_pn_musp_sink_a

```
Create ONE image for a 2D action RPG called The Quests of Zeldara and Zeldor: Story panel — Muspelheim sinks (option B), a painted story panel shown during a cut-scene.
The reference images show the game's characters; use them only for the art style (outline weight, flat cel shading, teal highlights, magenta rim) — a bold hand-drawn cartoon game look, not a photo, not 3D.
Subject: a wide cinematic painting from high above: the volcano collapsing into the ocean in a ring of white steam, its glow fading under the waves, the black causeway sinking in a line toward the shore, the night sky orange with ash.
The painting fills the whole image edge to edge like a wide film still. No text, no labels, no frame, no UI.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_pn_asg_sky_a

Story panel — Asgard opens in the sky (option A) · wave 61 · 1 items, 1 × 1 · 1536x1024

- `pn_asg_sky_a` Story panel — Asgard opens in the sky (option A) — 1536 × 1024 px

Attach: style_hero, style_centaur, sc_pn_musp_sink_a

```
Create ONE image for a 2D action RPG called The Quests of Zeldara and Zeldor: Story panel — Asgard opens in the sky (option A), a painted story panel shown during a cut-scene.
The reference images show the game's characters; use them only for the art style (outline weight, flat cel shading, teal highlights, magenta rim) — a bold hand-drawn cartoon game look, not a photo, not 3D.
Subject: a wide cinematic painting: night over a calm lake; the clouds part in a great ring of golden light, and within it the underside of a white-and-gold city of spires appears, lowering slowly; rays of light fall onto the water; a small village on the shore in the foreground.
The painting fills the whole image edge to edge like a wide film still. No text, no labels, no frame, no UI.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_pn_asg_sky_b

Story panel — Asgard opens in the sky (option B) · wave 61 · 1 items, 1 × 1 · 1536x1024

- `pn_asg_sky_b` Story panel — Asgard opens in the sky (option B) — 1536 × 1024 px

Attach: style_hero, style_centaur, sc_pn_musp_sink_a

```
Create ONE image for a 2D action RPG called The Quests of Zeldara and Zeldor: Story panel — Asgard opens in the sky (option B), a painted story panel shown during a cut-scene.
The reference images show the game's characters; use them only for the art style (outline weight, flat cel shading, teal highlights, magenta rim) — a bold hand-drawn cartoon game look, not a photo, not 3D.
Subject: a wide cinematic painting: a blinding white-gold light tears open the sky above a lake at dawn; a city of white walls and gold spires descends out of it on beams of light; pale-blue spirits in a meadow look up.
The painting fills the whole image edge to edge like a wide film still. No text, no labels, no frame, no UI.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_pn_asg_lake_a

Story panel — Asgard on the lake (option A) · wave 61 · 1 items, 1 × 1 · 1536x1024

- `pn_asg_lake_a` Story panel — Asgard on the lake (option A) — 1536 × 1024 px

Attach: style_hero, style_centaur, sc_pn_musp_sink_a

```
Create ONE image for a 2D action RPG called The Quests of Zeldara and Zeldor: Story panel — Asgard on the lake (option A), a painted story panel shown during a cut-scene.
The reference images show the game's characters; use them only for the art style (outline weight, flat cel shading, teal highlights, magenta rim) — a bold hand-drawn cartoon game look, not a photo, not 3D.
Subject: a wide cinematic painting: the white-and-gold walled city of Asgard now resting on the lake as an island, its walls ringed by calm water reflecting it, gold spires catching the sunrise, the village pier in the foreground pointing at its gate.
The painting fills the whole image edge to edge like a wide film still. No text, no labels, no frame, no UI.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_pn_asg_lake_b

Story panel — Asgard on the lake (option B) · wave 61 · 1 items, 1 × 1 · 1536x1024

- `pn_asg_lake_b` Story panel — Asgard on the lake (option B) — 1536 × 1024 px

Attach: style_hero, style_centaur, sc_pn_musp_sink_a

```
Create ONE image for a 2D action RPG called The Quests of Zeldara and Zeldor: Story panel — Asgard on the lake (option B), a painted story panel shown during a cut-scene.
The reference images show the game's characters; use them only for the art style (outline weight, flat cel shading, teal highlights, magenta rim) — a bold hand-drawn cartoon game look, not a photo, not 3D.
Subject: a wide cinematic painting from above: a round walled island city of white stone and gold filling most of a lake, a central citadel of spires, mist on the water, the little village on the shore, the light warm and hopeful.
The painting fills the whole image edge to edge like a wide film still. No text, no labels, no frame, no UI.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_fa_ember

Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Only the green-gold fire moves; the iron, stone and everything else stay perfectly still · wave 62 · 4 items, 2 × 2 · 1024x1024

- `fa_hearth_ember_1` Hearth of the Ember Forge — its flames moving — frame 1 — 120 × 110 px
- `fa_hearth_ember_2` Hearth of the Ember Forge — its flames moving — frame 2 — 120 × 110 px
- `fa_hearth_ember_3` Hearth of the Ember Forge — its flames moving — frame 3 — 120 × 110 px
- `fa_hearth_ember_4` Hearth of the Ember Forge — its flames moving — frame 4 — 120 × 110 px

Attach: style_hero, style_centaur, sc_forge_hearths

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Only the green-gold fire moves; the iron, stone and everything else stay perfectly still.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Hearth of the Ember Forge — its flames moving, the Ember Forge hearth (iron rim with leaf knotwork, green-gold flames among the coals, a great bellows beside it) (about 1.7× the hero's height): (1) the flames low and leaning left; (2) the flames rising, a flicker to the right; (3) the flames at their tallest, sparks lifting; (4) the flames settling, leaning back to the left.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_fa_cinder

Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Only the steam and the glow of the coals moves; the iron, stone and everything else stay perfectly still · wave 62 · 4 items, 2 × 2 · 1024x1024

- `fa_hearth_cinder_1` Hearth of the Cinder Forge — its steam moving — frame 1 — 120 × 110 px
- `fa_hearth_cinder_2` Hearth of the Cinder Forge — its steam moving — frame 2 — 120 × 110 px
- `fa_hearth_cinder_3` Hearth of the Cinder Forge — its steam moving — frame 3 — 120 × 110 px
- `fa_hearth_cinder_4` Hearth of the Cinder Forge — its steam moving — frame 4 — 120 × 110 px

Attach: style_hero, style_centaur, sc_forge_hearths

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Only the steam and the glow of the coals moves; the iron, stone and everything else stay perfectly still.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Hearth of the Cinder Forge — its steam moving, the Cinder Forge hearth (wet steaming rim, blue-white coals, a quench trough beside it) (about 1.7× the hero's height): (1) a thin wisp of steam rising; (2) the steam puffing up in a round cloud; (3) the cloud drifting higher and thinning, a new wisp below; (4) the steam almost gone, the coals glowing brighter.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_fa_slag

Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Only the orange fire and a drip of molten slag from the crucible moves; the iron, stone and everything else stay perfectly still · wave 62 · 4 items, 2 × 2 · 1024x1024

- `fa_hearth_slag_1` Hearth of the Slag Forge — its fire moving — frame 1 — 120 × 110 px
- `fa_hearth_slag_2` Hearth of the Slag Forge — its fire moving — frame 2 — 120 × 110 px
- `fa_hearth_slag_3` Hearth of the Slag Forge — its fire moving — frame 3 — 120 × 110 px
- `fa_hearth_slag_4` Hearth of the Slag Forge — its fire moving — frame 4 — 120 × 110 px

Attach: style_hero, style_centaur, sc_forge_hearths

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Only the orange fire and a drip of molten slag from the crucible moves; the iron, stone and everything else stay perfectly still.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Hearth of the Slag Forge — its fire moving, the Slag Forge hearth (rim crusted with cooling slag, deep orange coals, a crucible on chains above it) (about 1.7× the hero's height): (1) the fire low, a drop forming on the crucible lip; (2) the fire rising, the drop falling; (3) the fire tall, the drop splashing in the coals with sparks; (4) the fire settling, a new drop forming.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_fa_ash

Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Only the smoke, ash and embers moves; the iron, stone and everything else stay perfectly still · wave 62 · 4 items, 2 × 2 · 1024x1024

- `fa_hearth_ash_1` Hearth of the Ash Forge — its smoke and embers moving — frame 1 — 120 × 110 px
- `fa_hearth_ash_2` Hearth of the Ash Forge — its smoke and embers moving — frame 2 — 120 × 110 px
- `fa_hearth_ash_3` Hearth of the Ash Forge — its smoke and embers moving — frame 3 — 120 × 110 px
- `fa_hearth_ash_4` Hearth of the Ash Forge — its smoke and embers moving — frame 4 — 120 × 110 px

Attach: style_hero, style_centaur, sc_forge_hearths

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Only the smoke, ash and embers moves; the iron, stone and everything else stay perfectly still.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Hearth of the Ash Forge — its smoke and embers moving, the Ash Forge hearth (black iron rim hung with broken chains, red-white coals and drifting ash) (about 1.7× the hero's height): (1) grey smoke curling up, a few embers; (2) the smoke rising higher, embers lifting; (3) the smoke spreading, embers at the top; (4) the smoke thinning, new embers popping from the coals.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_fa_great

Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Only the fire in the hearth moves; the iron, stone and everything else stay perfectly still · wave 62 · 4 items, 2 × 2 · 1024x1024

- `fa_hearth_great_1` The great hearth of Muspelheim — its fire moving — frame 1 — 150 × 150 px
- `fa_hearth_great_2` The great hearth of Muspelheim — its fire moving — frame 2 — 150 × 150 px
- `fa_hearth_great_3` The great hearth of Muspelheim — its fire moving — frame 3 — 150 × 150 px
- `fa_hearth_great_4` The great hearth of Muspelheim — its fire moving — frame 4 — 150 × 150 px

Attach: style_hero, style_centaur, sc_ghearth_opts

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Only the fire in the hearth moves; the iron, stone and everything else stay perfectly still.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — The great hearth of Muspelheim — its fire moving, the great hearth, option A (a giant round hearth of black iron and gold, four gem cradles, a staff socket in the middle) (about 2.4× the hero's height): (1) the fire low and golden; (2) the fire rising in tongues; (3) the fire at its tallest, sparks spiralling up; (4) the fire settling.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_gloop2_guard

Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Spirits are translucent glowing people of pale-blue runic light. Every frame shows the SAME group: the SAME number of people, EVERY ONE THE SAME SIZE AS IN EVERY OTHER FRAME (nobody grows or shrinks), the same props at the same size and place — only heads, arms and spears move a little. Never add, remove or merge anyone · wave 62 · 4 items, 2 × 2 · 1024x1024

- `gm_guard_1` Honour guard — frame 1 — 200 × 128 px
- `gm_guard_2` Honour guard — frame 2 — 200 × 128 px
- `gm_guard_3` Honour guard — frame 3 — 200 × 128 px
- `gm_guard_4` Honour guard — frame 4 — 200 × 128 px

Attach: style_hero, style_centaur, sc_spirit_grp_opts, sc_gloop_2

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of animation frames — Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. Spirits are translucent glowing people of pale-blue runic light. Every frame shows the SAME group: the SAME number of people, EVERY ONE THE SAME SIZE AS IN EVERY OTHER FRAME (nobody grows or shrinks), the same props at the same size and place — only heads, arms and spears move a little. Never add, remove or merge anyone.
The first two reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).
Layout: a grid of 2 columns × 2 rows, evenly spaced. Each ROW is ONE subject drawn 2 times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:
Row 1 — Honour guard, exactly FIVE tall ancestor spirits (count them: five) in ONE straight line with spears and shields of light, all the same height (about 2× the hero's height): (1) all five standing to attention; (2) all five raising their spears in salute together; (3) all five with spears high, shields lifted; (4) all five lowering spears back to rest, the middle one nodding.
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
No motion lines, no arrows, no numbers.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_sheep

Village sheep — fluffy cartoon sheep with cream-white curly wool, black faces and legs, small ears, a friendly look; seen from above-front like the game scenery; no text · wave 62 · 4 items, 2 × 2 · 1024x1024

- `pr_sheep_graze` Sheep grazing — 46 × 38 px
- `pr_sheep_stand` Sheep standing — 44 × 40 px
- `pr_sheep_lie` Sheep lying down — 46 × 30 px
- `pr_sheep_lamb` Lamb — 32 × 30 px

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 4 separate pieces of scenery — Village sheep — fluffy cartoon sheep with cream-white curly wool, black faces and legs, small ears, a friendly look; seen from above-front like the game scenery; no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.
Layout: exactly 4 objects in a grid of 2 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Sheep grazing — a sheep with its head down, nibbling the grass, side view (about 0.6× the hero's height).
2. Sheep standing — a sheep standing and looking up, three-quarter view (about 0.6× the hero's height).
3. Sheep lying down — a sheep lying in the grass, legs tucked under, content (about 0.5× the hero's height).
4. Lamb — a small fluffy lamb hopping, white wool, black face (about 0.5× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```

## sc_int_apoth

Interior furniture — the Sorcerer's Apothecary sells magic weapons and upgrades them: pieces for its shop room, seen from above-front like the game's other furniture; original designs, no text · wave 62 · 6 items, 3 × 2 · 1536x1024

- `if_staffrack` Staff rack — 56 × 66 px
- `if_wandcase` Wand case — 58 × 40 px
- `if_orbstand` Orb pedestal — 30 × 54 px
- `if_staffstand` Master staff on a plinth — 30 × 66 px
- `if_enchantbench` Enchanting bench — 62 × 40 px
- `iw_staffs` Mounted staffs — 58 × 40 px

Attach: style_hero, style_centaur, sc_int_1

```
Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: a sheet of 6 separate pieces of scenery — Interior furniture — the Sorcerer's Apothecary sells magic weapons and upgrades them: pieces for its shop room, seen from above-front like the game's other furniture; original designs, no text.
The reference images show the game's characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.
Layout: exactly 6 objects in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. Staff rack — a tall wooden rack holding six magic staffs of different kinds — fire, water, leaf, stone, storm and shadow — each topped with its gem glowing softly (about as tall as the hero).
2. Wand case — a glass-topped display case of polished dark wood with magic wands laid on green velvet, their tips glowing (about 0.6× the hero's height).
3. Orb pedestal — a carved stone pedestal holding a floating glowing arcane orb circled by thin rune rings (about as tall as the hero).
4. Master staff on a plinth — a single grand white-gold staff floating upright above a rune-carved plinth in a soft beam of light (about as tall as the hero).
5. Enchanting bench — a workbench for upgrading staffs: a staff clamped in a vice, cut gems in little dishes, glowing rune-carving tools (about 0.6× the hero's height).
6. Mounted staffs — wall decoration: two crossed magic staffs mounted over a small round shield with a rune (about 0.6× the hero's height).
View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.
Art style (match the attached reference images exactly — they show the game's characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.
Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel).
```
