# Pilot (by hand) — 12 requests

Save each result as `sprites/incoming/<request id>.png`.

## hero_m.model

Hero (boy) · Model sheet (front, side, back) · 3 poses, 3 × 1 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Hero (boy) — the hero boy from reference image 1: a young adventurer with spiky tousled brown hair streaked with teal highlights, big teal eyes, a moss-green hooded short cape with a brown shoulder strap, a cream tunic, a brown leather belt with a square silver buckle and pouches, grey-olive trousers, big tan leather boots and bare forearms with wrist wraps. 
Layout: exactly 3 poses in a grid of 3 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. standing, seen from the FRONT.
2. standing, side view facing RIGHT.
3. standing, seen from BEHIND.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## hero_m.move.s

Hero (boy) · Movement · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, hero_m.model

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the approved model sheet of this hero: keep the hero identical to it.
Subject: Hero (boy) — the hero boy from reference image 1: a young adventurer with spiky tousled brown hair streaked with teal highlights, big teal eyes, a moss-green hooded short cape with a brown shoulder strap, a cream tunic, a brown leather belt with a square silver buckle and pouches, grey-olive trousers, big tan leather boots and bare forearms with wrist wraps. 
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing ready, hands relaxed, .
2. the same stance with a small breathing motion, cape shifting.
3. walk cycle frame 1: left foot forward, landing.
4. walk cycle frame 2: feet passing, body at its highest.
5. walk cycle frame 3: right foot forward, landing.
6. walk cycle frame 4: feet passing the other way.
7. sprint frame 1: leaning far forward, long stride, cape streaming back.
8. sprint frame 2: the opposite stride, both feet off the ground.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## hero_m.melee.s

Hero (boy) · Sword and battle axe · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, hero_m.model

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the approved model sheet of this hero: keep the hero identical to it.
Subject: Hero (boy) — the hero boy from reference image 1: a young adventurer with spiky tousled brown hair streaked with teal highlights, big teal eyes, a moss-green hooded short cape with a brown shoulder strap, a cream tunic, a brown leather belt with a square silver buckle and pouches, grey-olive trousers, big tan leather boots and bare forearms with wrist wraps. 
Held items in this sheet: sword = a short straight sword with a teal-glowing edge; battle axe = a broad single-bladed battle axe with a teal-glowing edge. When a pose does not name a weapon, the hands are empty and the small sword stays sheathed at the hip.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. sword ready: blade held low at the side.
2. sword wind-up: blade pulled back over the shoulder, body twisted.
3. sword slash: blade at full extension, a wide teal-white arc.
4. sword follow-through: blade swung past, weight on the front foot.
5. axe ready: both hands on the haft, axe head low.
6. axe wind-up: axe raised high overhead with both hands.
7. axe chop: axe head driving down in front, a heavy teal-white arc.
8. axe follow-through: axe head buried low, body bent over it.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## hero_f.model

Hero (girl) · Model sheet (front, side, back) · 3 poses, 3 × 1 · 1536x1024 · core

Attach: style_hero, style_centaur, hero_m.model

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the approved model sheet of the hero boy: she matches his height, proportions, line weight and colouring style exactly (her hair and outfit are her own, as described).
Subject: Hero (girl) — the hero girl: a young adventurer the same age, height and chibi proportions as the hero boy in reference image 1, drawn in exactly the same style, with big teal eyes and LONG BRAIDED AUBURN hair streaked with teal highlights. Hair: two long braids falling in front of her shoulders to the waist, each closed with a silver bead clasp, and a braided leather headband with a small glowing teal gem at the brow. Outfit: a short deep teal-blue mantle with a pale fur collar, fastened at the shoulder with a round silver knotwork brooch; a sleeveless padded cream tunic with a band of wine-red knotwork along the hem, worn over a long-sleeved grey shirt; leather bracers; a wide belt with a square silver buckle; grey-olive trousers and wrapped boots with fur cuffs. 
Layout: exactly 3 poses in a grid of 3 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. standing, seen from the FRONT.
2. standing, side view facing RIGHT.
3. standing, seen from BEHIND.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ride_m_horse.ride

Hero (boy) on Horse · Riding (side, front, back) · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, hero_m.model, mt_horse.ride

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the approved model sheet of this hero: keep the hero identical to it. Reference image 4 = the approved sheet of this mount: keep the mount identical to it.
Subject: Hero (boy) on Horse — the hero boy from reference image 1: a young adventurer with spiky tousled brown hair streaked with teal highlights, big teal eyes, a moss-green hooded short cape with a brown shoulder strap, a cream tunic, a brown leather belt with a square silver buckle and pouches, grey-olive trousers, big tan leather boots and bare forearms with wrist wraps, riding this mount: A bay horse with a dark mane and a leather saddle. The hero sits in the saddle holding the reins. Main colours: brown (#8a5a3a), dark brown (#4a2a1a), pale orange (#e8e0d0), black (#101010). Size: about 1.6× the height of the hero.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. side view facing RIGHT, trot cycle frame 1 of 4.
2. side view facing RIGHT, trot cycle frame 2 of 4.
3. side view facing RIGHT, trot cycle frame 3 of 4.
4. side view facing RIGHT, trot cycle frame 4 of 4.
5. seen from the FRONT, coming toward the camera, trot frame 1 of 2.
6. seen from the FRONT, coming toward the camera, trot frame 2 of 2.
7. seen from BEHIND, going away from the camera, trot frame 1 of 2.
8. seen from BEHIND, going away from the camera, trot frame 2 of 2.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## meadow_goblin.core.s

Meadow Goblin · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Meadow Goblin — Scrawny green goblin in a patched leather vest with a rusty knife. Main colours: green (#6fa040), dark brown (#5a4028), orange (#c8a060), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Darts in, stabs, darts back out (pulse). Moves in packs of 3. Quick knife jab; the pack takes turns so one is always closing in. Flees at low HP to fetch friends.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: basic attack.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## meadow_goblin.fb

Meadow Goblin · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, meadow_goblin.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Meadow Goblin — Scrawny green goblin in a patched leather vest with a rusty knife. Main colours: green (#6fa040), dark brown (#5a4028), orange (#c8a060), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Darts in, stabs, darts back out (pulse). Moves in packs of 3. Quick knife jab; the pack takes turns so one is always closing in. Flees at low HP to fetch friends.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, melee strike: full extension at the moment of impact, with a short teal-white swing arc.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, melee strike: full extension at the moment of impact, with a short teal-white swing arc.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## thistle_hog.core.q

Thistle Hog · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Thistle Hog — Stocky boar whose back bristles with purple thistle spines. Main colours: muted orange (#8a6a4a), dark brown (#4a3424), yellow (#c8b070), red (#ff4020). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Paws the ground for 1 s, then charges in a straight line and cannot turn. Charge hits for heavy damage and knockback. Spines: melee hits from above/behind prick you for 1 damage.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: melee.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bosses.1

Boss set 1 (8 bosses, one pose each) · Boss set 1 (8 bosses, one pose each) · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of 8 DIFFERENT boss characters, one per cell.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Layout: exactly 8 characters in a grid of 4 columns × 2 rows, evenly spaced, each one standing in a ready, menacing battle pose, in this order (left to right, top row first):
1. Grubnash the Great, the Goblin King — A huge-headed, pot-bellied goblin tyrant on stubby legs. Each step makes the treasure hoard rattle. Details: head: goblin, gear: crown, weapon: hammer, armor: fur, cape: fur, build: giant. Main colours: green (#6a8a3a), dark green (#2a3218), yellow (#e8c040), yellow (#ffd040).
2. Grubnash the Cave-Troll Rider — Grubnash, crown and war-hammer and all, rides out on a chained, horned cave-beast that shakes the warren with every stamp. Details: beast: behemoth. Main colours: muted green (#6a7a5a), dark grey (#2a3222), yellow (#e8c040), yellow (#ffd040).
3. Morvane, the Dark Warlock — A deathless necromancer, skull-faced, reading from a book that whispers back. Details: head: skull, weapon: staff, off: book, armor: rags, cape: tattered. Main colours: dark grey (#1a1a2a), black (#08080e), muted green (#8ab0a0), green (#60ffb0).
4. Morvane the Brood-Queen — Morvane fuses with his brood-queen. The teal hourglass burns on her back, and his white crown still hovers above. Main colours: dark grey (#1a1e24), black (#07090c), muted green (#8ab0a0), green (#60ffb0).
5. Sir Brambleheart, the Thorn Knight — A knight wrapped in living briars; thorns bite whoever strikes him up close. Details: head: greathelm, weapon: sword, off: shield, armor: plate, cape: tattered, build: broad. Main colours: muted green (#4a6a3a), dark green (#2a3a20), muted yellow (#b0a060), red (#e07080).
6. Baron Goldcrest, the Sunflower Lord — A towering sunflower-man, his face a ring of petals. Details: head: mask, gear: sunhalo, weapon: rapier, armor: bark, build: tall. Main colours: green (#6a8a2a), dark green (#2a3a10), yellow (#f0c030), yellow (#ffe060).
7. Grumbold, the Mill Troll — A stone-skinned troll who hides from the sun inside the windmill. Details: head: ogre, weapon: club, armor: fur, build: giant. Main colours: grey (#6a7a6a), dark grey (#2a3a2a), light grey (#a0a090), yellow (#ffcc40).
8. Frostwhisper, the Rime Witch — A pale witch with a circlet of ice and a swarm of floating shards. Details: head: face, gear: icecrown, weapon: wand, off: shards, armor: crystal. Main colours: pale blue (#c0e0f8), blue (#4a7ab0), white (#ffffff), pale teal (#a0e8ff).
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Each boss fills most of its own cell (they are large, imposing characters about three times the height of the hero) and all are drawn at the same scale and line weight.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## npc_forge.core.f

Garrick the Blacksmith · Idle, Talk, Work · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Garrick the Blacksmith — Bald and broad, soot on his cheeks, a heavy leather apron and a smith's hammer. Main colours: muted brown (#5a4a40), dark grey (#2a2220), orange (#ff9030), black (#201810). Size: about 1× the height of the hero.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. talking: mouth open, one hand raised in a friendly gesture — used for: when you speak to them.
4. talking: nodding, the other hand gesturing.
5. at work (Strikes the anvil — sparks fly on every blow.), frame 1 of 4.
6. at work (Strikes the anvil — sparks fly on every blow.), frame 2 of 4.
7. at work (Strikes the anvil — sparks fly on every blow.), frame 3 of 4.
8. at work (Strikes the anvil — sparks fly on every blow.), frame 4 of 4.
View: seen from the front (facing the viewer), camera slightly above — a top-down RPG "walking toward the camera" view.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## mt_horse.ride

Horse · Moving (side, front, back) · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Horse — A bay horse with a dark mane and a leather saddle. Saddled, no rider. Main colours: brown (#8a5a3a), dark brown (#4a2a1a), pale orange (#e8e0d0), black (#101010). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Trots; mane and tail sway.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. side view facing RIGHT, trot cycle frame 1 of 4.
2. side view facing RIGHT, trot cycle frame 2 of 4.
3. side view facing RIGHT, trot cycle frame 3 of 4.
4. side view facing RIGHT, trot cycle frame 4 of 4.
5. seen from the FRONT, coming toward the camera, trot frame 1 of 2.
6. seen from the FRONT, coming toward the camera, trot frame 2 of 2.
7. seen from BEHIND, going away from the camera, trot frame 1 of 2.
8. seen from BEHIND, going away from the camera, trot frame 2 of 2.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## fam_grass.core.q

Thornback Stag (grass spirit) · Hover, Ranged attack, Cast, Knocked out · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Thornback Stag (grass spirit) — A proud stag of green light, its antlers woven from flowering vines. It trots at your heel and lowers its antlers to charge.  Size: about 0.77× the height of the hero.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hovering, body tilted slightly forward — used for: follows the hero.
2. hover cycle frame 2: bobbing up, wings / trails spread.
3. hover cycle frame 3: level, drifting.
4. hover cycle frame 4: bobbing down, wings / trails folded.
5. ranged wind-up: aiming, the shot held ready — used for: base skill.
6. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: specials: Thorn Dart, Healing Bloom, Vine Snare, Spore Cloud, Bark Ward, Wild Growth.
8. knocked out: slumped and dimmed, small stars circling — used for: knocked out in a fight.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```
