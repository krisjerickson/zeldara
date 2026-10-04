# Ashlands — 169 requests

Save each result as `sprites/incoming/<request id>.png`.

## fire_imp.core.s

Fire Imp · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Fire Imp — Grinning red imp with a flickering tail. Main colours: red (#e05a2a), red (#8a2a10), orange (#ffb040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Zig-zags (existing). Heat-seeking fireballs (existing). Immune to burn.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: basic attack.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## fire_imp.fb

Fire Imp · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, fire_imp.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Fire Imp — Grinning red imp with a flickering tail. Main colours: red (#e05a2a), red (#8a2a10), orange (#ffb040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Zig-zags (existing). Heat-seeking fireballs (existing). Immune to burn.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## fire_imp.extra.s

Fire Imp · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, fire_imp.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Fire Imp — Grinning red imp with a flickering tail. Main colours: red (#e05a2a), red (#8a2a10), orange (#ffb040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Zig-zags (existing). Heat-seeking fireballs (existing). Immune to burn.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ash_wraith.core.s

Ash Wraith · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ash Wraith — A figure of drifting ash with ember eyes. Main colours: grey (#6a6060), dark grey (#2a2626), orange (#ff8040), orange (#ffb040). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Teleports (existing). Heat-seek bolts (existing) + an ash cloud that blinds. Intangible while teleporting.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ash_wraith.fb

Ash Wraith · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, ash_wraith.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ash Wraith — A figure of drifting ash with ember eyes. Main colours: grey (#6a6060), dark grey (#2a2626), orange (#ff8040), orange (#ffb040). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Teleports (existing). Heat-seek bolts (existing) + an ash cloud that blinds. Intangible while teleporting.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ash_wraith.extra.s

Ash Wraith · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, ash_wraith.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ash Wraith — A figure of drifting ash with ember eyes. Main colours: grey (#6a6060), dark grey (#2a2626), orange (#ff8040), orange (#ffb040). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Teleports (existing). Heat-seek bolts (existing) + an ash cloud that blinds. Intangible while teleporting.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## lava_titan.core.s

Lava Titan · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Lava Titan — Towering basalt giant with lava running through its cracks. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff6a20), yellow (#ffd040). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow; every step leaves a lava footprint. Stomp (existing) + lava pools. Cooling armor: ice/water hardens a section, then heavy hits break it.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. slam wind-up: rearing up, weapon or fists raised high overhead — used for: basic attack.
7. slam impact: crashing down into the ground, body compressed.
8. slam recover: pushing back up, off balance.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## lava_titan.fb

Lava Titan · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, lava_titan.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Lava Titan — Towering basalt giant with lava running through its cracks. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff6a20), yellow (#ffd040). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow; every step leaves a lava footprint. Stomp (existing) + lava pools. Cooling armor: ice/water hardens a section, then heavy hits break it.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, slam recover: pushing back up, off balance.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, slam recover: pushing back up, off balance.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## lava_titan.extra.s

Lava Titan · Hurt, Death · 3 poses, 3 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, lava_titan.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Lava Titan — Towering basalt giant with lava running through its cracks. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff6a20), yellow (#ffd040). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow; every step leaves a lava footprint. Stomp (existing) + lava pools. Cooling armor: ice/water hardens a section, then heavy hits break it.
Layout: exactly 3 poses in a grid of 3 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. death frame 1: buckling, losing balance.
3. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## rock_dragon.core.q

Rock Dragon · Idle, Move, Breath, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Rock Dragon — Rock-scaled young dragon. Main colours: muted brown (#6a5a4a), dark brown (#3a2a20), orange (#ff8a30), yellow (#ffe040). Size: about 1.7× the height of the hero.
How it behaves in the game (for the poses): Rushes (existing), takes short flights. Scatter flame (existing). Scales deflect arrows from the front.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. breath inhale: chest swollen, head pulled back, glow in the throat — used for: basic attack.
7. breath exhale: head thrust forward, jaws wide open (do not draw the breath cone).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## rock_dragon.extra.q

Rock Dragon · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, rock_dragon.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Rock Dragon — Rock-scaled young dragon. Main colours: muted brown (#6a5a4a), dark brown (#3a2a20), orange (#ff8a30), yellow (#ffe040). Size: about 1.7× the height of the hero.
How it behaves in the game (for the poses): Rushes (existing), takes short flights. Scatter flame (existing). Scales deflect arrows from the front.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## magma_slug.core.q

Magma Slug · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Magma Slug — Fat glowing slug with a cooling crust shell. Main colours: orange (#ff6a20), red (#8a2a10), yellow (#ffd040), black (#101010). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Slow; leaves a burning trail. Spits lava blobs. Cooled (by ice/water) its shell hardens — then shatters with one heavy hit.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## magma_slug.extra.q

Magma Slug · Cast, Guard, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, magma_slug.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Magma Slug — Fat glowing slug with a cooling crust shell. Main colours: orange (#ff6a20), red (#8a2a10), yellow (#ffd040), black (#101010). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Slow; leaves a burning trail. Spits lava blobs. Cooled (by ice/water) its shell hardens — then shatters with one heavy hit.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: aura.
2. casting release: energy bursting outward from the body in a ring of light.
3. guarding: shield / shell / armour plates raised in front, braced — used for: armor.
4. guard hit: recoiling slightly as a blow glances off, sparks.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cinder_hounds.core.q

Cinder Hounds · Idle, Move, Lunge, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Cinder Hounds — Black hounds with glowing ember manes. Main colours: dark grey (#3a2a28), black (#1a1010), red (#ff6020), orange (#ffb040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Pack of 4: two flank, two chase. Flaming bite (burn). Explode into embers on death (small burst).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: chase.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. lunge coil: crouched low, ready to spring — used for: lunge.
7. lunge: stretched out flat in mid-spring.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cinder_hounds.extra.q

Cinder Hounds · Explode, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, cinder_hounds.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Cinder Hounds — Black hounds with glowing ember manes. Main colours: dark grey (#3a2a28), black (#1a1010), red (#ff6020), orange (#ffb040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Pack of 4: two flank, two chase. Flaming bite (burn). Explode into embers on death (small burst).
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. swelling up, glowing brighter, about to burst — used for: explode.
2. bursting apart in a flash.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## obsidian_stalker.core.s

Obsidian Stalker · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Obsidian Stalker — Humanoid carved from black volcanic glass. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Flickers between glass spires. Glass blade combo. Reflects projectiles; shatters into glass shards (area) when killed.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: melee.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## obsidian_stalker.fb

Obsidian Stalker · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, obsidian_stalker.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Obsidian Stalker — Humanoid carved from black volcanic glass. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Flickers between glass spires. Glass blade combo. Reflects projectiles; shatters into glass shards (area) when killed.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## obsidian_stalker.extra.s

Obsidian Stalker · Blink, Guard, Explode, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, obsidian_stalker.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Obsidian Stalker — Humanoid carved from black volcanic glass. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Flickers between glass spires. Glass blade combo. Reflects projectiles; shatters into glass shards (area) when killed.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. blink out: body breaking up into glowing teal motes — used for: blink.
2. blink in: body re-forming out of glowing motes.
3. guarding: shield / shell / armour plates raised in front, braced — used for: reflect.
4. guard hit: recoiling slightly as a blow glances off, sparks.
5. swelling up, glowing brighter, about to burst — used for: explode.
6. bursting apart in a flash.
7. death frame 1: buckling, losing balance.
8. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## sulfur_toad.core.q

Sulfur Toad · Idle, Move, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Sulfur Toad — Yellow toad that inflates when angry. Main colours: yellow (#d8c040), olive (#8a7020), pale yellow (#f0f080), red (#ff3030). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Rides geyser blasts to hop far. Inflates and bursts into a sulfur gas cloud (poison). Pops early if hit while inflating (harmless).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: cloud.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## sulfur_toad.extra.q

Sulfur Toad · Leap, Explode, Death · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, sulfur_toad.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Sulfur Toad — Yellow toad that inflates when angry. Main colours: yellow (#d8c040), olive (#8a7020), pale yellow (#f0f080), red (#ff3030). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Rides geyser blasts to hop far. Inflates and bursts into a sulfur gas cloud (poison). Pops early if hit while inflating (harmless).
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. leap crouch: squashed down before the jump — used for: leap.
2. leap: in the air, limbs tucked.
3. leap landing: squashed on impact.
4. swelling up, glowing brighter, about to burst — used for: explode.
5. bursting apart in a flash.
6. death frame 1: buckling, losing balance.
7. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## ember_mimic.core.q

Ember-flower Mimic · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ember-flower Mimic — Looks exactly like a glowing ember flower. Main colours: dark grey (#3a2a28), black (#1a1010), orange (#ff8040), pale yellow (#ffff80). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Stationary until you come close. Burning bite and a fire-petal spray. Only hittable once revealed.
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

## ember_mimic.extra.q

Ember-flower Mimic · Ranged attack, Disguise / ambush, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, ember_mimic.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ember-flower Mimic — Looks exactly like a glowing ember flower. Main colours: dark grey (#3a2a28), black (#1a1010), orange (#ff8040), pale yellow (#ffff80). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Stationary until you come close. Burning bite and a fire-petal spray. Only hittable once revealed.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. ranged wind-up: aiming, the shot held ready — used for: shoot.
2. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
3. disguised / hidden form: looks like an ordinary harmless object or plant, eyes shut — used for: disguise.
4. reveal: springing out of the disguise, eyes snapping open.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## basalt_golem.core.s

Basalt Golem · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Basalt Golem — Golem made of hexagonal basalt columns. Main colours: grey (#4a4a50), dark grey (#2a2a30), orange (#ff6a20), orange (#ffb040). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow march. Column slam; shockwave in a line. Armor break: each heavy hit knocks a column off — the columns stay as obstacles.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. slam wind-up: rearing up, weapon or fists raised high overhead — used for: slam.
7. slam impact: crashing down into the ground, body compressed.
8. slam recover: pushing back up, off balance.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## basalt_golem.fb

Basalt Golem · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, basalt_golem.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Basalt Golem — Golem made of hexagonal basalt columns. Main colours: grey (#4a4a50), dark grey (#2a2a30), orange (#ff6a20), orange (#ffb040). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow march. Column slam; shockwave in a line. Armor break: each heavy hit knocks a column off — the columns stay as obstacles.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, slam recover: pushing back up, off balance.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, slam recover: pushing back up, off balance.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## basalt_golem.extra.s

Basalt Golem · Hurt, Beam, Guard, Death · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, basalt_golem.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Basalt Golem — Golem made of hexagonal basalt columns. Main colours: grey (#4a4a50), dark grey (#2a2a30), orange (#ff6a20), orange (#ffb040). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow march. Column slam; shockwave in a line. Armor break: each heavy hit knocks a column off — the columns stay as obstacles.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. beam charge: bracing, a bright point of light building — used for: beam.
3. beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
4. guarding: shield / shell / armour plates raised in front, braced — used for: armor.
5. guard hit: recoiling slightly as a blow glances off, sparks.
6. death frame 1: buckling, losing balance.
7. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bone_revenant.core.s

Dragon-bone Revenant · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Dragon-bone Revenant — Undead dragon-knight in armor made of dragon bone. Main colours: pale yellow (#e8e0cc), muted orange (#8a7a60), orange (#ff8a30), red (#ff4020). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Rises from bone piles. Bone spear throws, then a charge. Revives once while its spear is on the ground.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bone_revenant.fb

Dragon-bone Revenant · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, bone_revenant.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Dragon-bone Revenant — Undead dragon-knight in armor made of dragon bone. Main colours: pale yellow (#e8e0cc), muted orange (#8a7a60), orange (#ff8a30), red (#ff4020). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Rises from bone piles. Bone spear throws, then a charge. Revives once while its spear is on the ground.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bone_revenant.extra.s

Dragon-bone Revenant · Lunge, Revive, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, bone_revenant.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Dragon-bone Revenant — Undead dragon-knight in armor made of dragon bone. Main colours: pale yellow (#e8e0cc), muted orange (#8a7a60), orange (#ff8a30), red (#ff4020). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Rises from bone piles. Bone spear throws, then a charge. Revives once while its spear is on the ground.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. lunge coil: crouched low, ready to spring — used for: lunge.
2. lunge: stretched out flat in mid-spring.
3. collapsed heap of its own remains, a faint glow inside — used for: revive.
4. pulling itself back together, half re-formed.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## forge_automaton.core.s

Forge Automaton · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Forge Automaton — Iron smith-construct with a glowing hammer. Main colours: brown (#8a5a3a), dark brown (#3a2418), orange (#ff8a30), yellow (#ffd040). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Clanking walk. Molten hammer slam (burn). Overheats after 3 slams: vents steam, 3 s vulnerable.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. slam wind-up: rearing up, weapon or fists raised high overhead — used for: slam.
7. slam impact: crashing down into the ground, body compressed.
8. slam recover: pushing back up, off balance.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## forge_automaton.fb

Forge Automaton · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, forge_automaton.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Forge Automaton — Iron smith-construct with a glowing hammer. Main colours: brown (#8a5a3a), dark brown (#3a2418), orange (#ff8a30), yellow (#ffd040). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Clanking walk. Molten hammer slam (burn). Overheats after 3 slams: vents steam, 3 s vulnerable.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, slam recover: pushing back up, off balance.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, slam recover: pushing back up, off balance.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## forge_automaton.extra.s

Forge Automaton · Hurt, Guard, Death · 5 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, forge_automaton.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Forge Automaton — Iron smith-construct with a glowing hammer. Main colours: brown (#8a5a3a), dark brown (#3a2418), orange (#ff8a30), yellow (#ffd040). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Clanking walk. Molten hammer slam (burn). Overheats after 3 slams: vents steam, 3 s vulnerable.
Layout: exactly 5 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. guarding: shield / shell / armour plates raised in front, braced — used for: armor.
3. guard hit: recoiling slightly as a blow glances off, sparks.
4. death frame 1: buckling, losing balance.
5. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ash_moths.core.q

Ash Moth Swarm · Idle, Hover, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ash Moth Swarm — A flurry of grey moths shedding ash. Main colours: grey (#8a8480), dark grey (#4a4440), orange (#ff8040), orange (#ffb040). Size: about 0.6× the height of the hero.
How it behaves in the game (for the poses): Swarms toward light. Ash-coat: your light radius shrinks and you move 15% slower (stacks). Scatters when hit.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: flit.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: melee.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ash_moths.extra.q

Ash Moth Swarm · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, ash_moths.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ash Moth Swarm — A flurry of grey moths shedding ash. Main colours: grey (#8a8480), dark grey (#4a4440), orange (#ff8040), orange (#ffb040). Size: about 0.6× the height of the hero.
How it behaves in the game (for the poses): Swarms toward light. Ash-coat: your light radius shrinks and you move 15% slower (stacks). Scatters when hit.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: cloud.
2. casting release: energy bursting outward from the body in a ring of light.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## lava_eel.core.q

Lava Eel · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Lava Eel — Glowing eel that swims in molten rock. Main colours: orange (#ff6a20), red (#8a2a10), yellow (#ffd040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Moves along lava channels. Leaps and spits lava arcs. Only hittable when it leaps.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: lob.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## lava_eel.extra.q

Lava Eel · Swim, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, lava_eel.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Lava Eel — Glowing eel that swims in molten rock. Main colours: orange (#ff6a20), red (#8a2a10), yellow (#ffd040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Moves along lava channels. Leaps and spits lava arcs. Only hittable when it leaps.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. submerged: only the top of the back and eyes above the surface line — used for: swim.
2. surfacing: rising up with water streaming off.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## chained_gargoyle.core.q

Chained Gargoyle · Idle, Move, Lunge, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Chained Gargoyle — Gargoyle chained to a floating rock. Main colours: grey (#5a5058), dark grey (#2a2428), orange (#ff8040), red (#ff4020). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Swings on its chain in wide arcs. Arc swoops. Chain limits its reach.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: orbit.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. lunge coil: crouched low, ready to spring — used for: lunge.
7. lunge: stretched out flat in mid-spring.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## chained_gargoyle.extra.q

Chained Gargoyle · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, chained_gargoyle.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Chained Gargoyle — Gargoyle chained to a floating rock. Main colours: grey (#5a5058), dark grey (#2a2428), orange (#ff8040), red (#ff4020). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Swings on its chain in wide arcs. Arc swoops. Chain limits its reach.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: armor.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## pyre_cultist.core.s

Pyre Cultist · Idle, Move, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Pyre Cultist — Red-hooded dragon cultist. Main colours: red (#8a2a20), dark red (#3a1010), orange (#ff8040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Groups of 3 around a pyre. Sets runes on the ground aflame. Weak.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: marks, heal.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## pyre_cultist.fb

Pyre Cultist · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, pyre_cultist.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Pyre Cultist — Red-hooded dragon cultist. Main colours: red (#8a2a20), dark red (#3a1010), orange (#ff8040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Groups of 3 around a pyre. Sets runes on the ground aflame. Weak.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, casting release: energy bursting outward from the body in a ring of light.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, casting release: energy bursting outward from the body in a ring of light.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## pyre_cultist.extra.s

Pyre Cultist · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, pyre_cultist.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Pyre Cultist — Red-hooded dragon cultist. Main colours: red (#8a2a20), dark red (#3a1010), orange (#ff8040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Groups of 3 around a pyre. Sets runes on the ground aflame. Weak.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## salamander_wyrmling.core.q

Salamander Wyrmling · Idle, Hover, Breath, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Salamander Wyrmling — Orange lizard with a flame crest. Main colours: orange (#e07030), red (#8a3010), yellow (#ffd040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Climbs walls and cliffs (ignores terrain). Fire breath cone. Fire immune.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: hover.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. breath inhale: chest swollen, head pulled back, glow in the throat — used for: breath.
7. breath exhale: head thrust forward, jaws wide open (do not draw the breath cone).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## salamander_wyrmling.extra.q

Salamander Wyrmling · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, salamander_wyrmling.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Salamander Wyrmling — Orange lizard with a flame crest. Main colours: orange (#e07030), red (#8a3010), yellow (#ffd040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Climbs walls and cliffs (ignores terrain). Fire breath cone. Fire immune.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cinder_scorpion.core.q

Cinder Scorpion · Idle, Hover, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Cinder Scorpion — Black scorpion with a glowing tail. Main colours: dark grey (#3a2a28), black (#1a1010), red (#ff6020), orange (#ffb040). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Burrows in ash; surfaces nearby. Fire-sting: long burn DoT. Armored back.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: melee.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cinder_scorpion.extra.q

Cinder Scorpion · Burrow, Guard, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, cinder_scorpion.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Cinder Scorpion — Black scorpion with a glowing tail. Main colours: dark grey (#3a2a28), black (#1a1010), red (#ff6020), orange (#ffb040). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Burrows in ash; surfaces nearby. Fire-sting: long burn DoT. Armored back.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. burrowing: half sunk into the ground, earth thrown up around it — used for: burrow.
2. emerging: bursting up out of a mound of earth.
3. guarding: shield / shell / armour plates raised in front, braced — used for: front.
4. guard hit: recoiling slightly as a blow glances off, sparks.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## scorched_paladin.core.s

Scorched Paladin · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Scorched Paladin — Undead paladin in fire-blackened armor. Main colours: muted brown (#6a5a50), dark grey (#2a2420), orange (#ff8a30), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Steady advance; charges when far. Flaming sword combo (4 hits). Holy shield blocks the front; parry window on the 4th hit.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: chase.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: melee.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## scorched_paladin.fb

Scorched Paladin · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, scorched_paladin.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Scorched Paladin — Undead paladin in fire-blackened armor. Main colours: muted brown (#6a5a50), dark grey (#2a2420), orange (#ff8a30), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Steady advance; charges when far. Flaming sword combo (4 hits). Holy shield blocks the front; parry window on the 4th hit.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## scorched_paladin.extra.s

Scorched Paladin · Guard, Enrage, Death · 5 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, scorched_paladin.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Scorched Paladin — Undead paladin in fire-blackened armor. Main colours: muted brown (#6a5a50), dark grey (#2a2420), orange (#ff8a30), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Steady advance; charges when far. Flaming sword combo (4 hits). Holy shield blocks the front; parry window on the 4th hit.
Layout: exactly 5 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: front.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. enraged roar: head back, mouth wide, body flushed and bristling — used for: enrage.
4. death frame 1: buckling, losing balance.
5. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## phoenix_chick.core.q

Phoenix Chick · Idle, Hover, Lunge, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Phoenix Chick — Fluffy young phoenix, all flame. Main colours: orange (#ff8a30), red (#c03010), yellow (#ffe040), black (#101010). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Flutters. Fire breath + dive. When killed it leaves an egg…
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: flit.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. lunge coil: crouched low, ready to spring — used for: lunge.
7. lunge: stretched out flat in mid-spring.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## phoenix_chick.extra.q

Phoenix Chick · Breath, Revive, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, phoenix_chick.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Phoenix Chick — Fluffy young phoenix, all flame. Main colours: orange (#ff8a30), red (#c03010), yellow (#ffe040), black (#101010). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Flutters. Fire breath + dive. When killed it leaves an egg…
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. breath inhale: chest swollen, head pulled back, glow in the throat — used for: breath.
2. breath exhale: head thrust forward, jaws wide open (do not draw the breath cone).
3. collapsed heap of its own remains, a faint glow inside — used for: revive.
4. pulling itself back together, half re-formed.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## magma_brute.core.s

Magma Brute · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Magma Brute — Molten-fisted brute. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff6a20), yellow (#ffd040). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Lumbers. Burning fist combo. Heat aura hurts when close.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: melee.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## magma_brute.fb

Magma Brute · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, magma_brute.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Magma Brute — Molten-fisted brute. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff6a20), yellow (#ffd040). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Lumbers. Burning fist combo. Heat aura hurts when close.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## magma_brute.extra.s

Magma Brute · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, magma_brute.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Magma Brute — Molten-fisted brute. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff6a20), yellow (#ffd040). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Lumbers. Burning fist combo. Heat aura hurts when close.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: aura.
2. casting release: energy bursting outward from the body in a ring of light.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## glass_blademaster.core.s

Obsidian Blademaster · Idle, Hover, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Obsidian Blademaster — Duelist of volcanic glass. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Fast dashes. 3-hit blade combo. Fragile: heavy hits shatter it.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: flit.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: melee.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## glass_blademaster.fb

Obsidian Blademaster · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, glass_blademaster.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Obsidian Blademaster — Duelist of volcanic glass. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Fast dashes. 3-hit blade combo. Fragile: heavy hits shatter it.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## glass_blademaster.extra.s

Obsidian Blademaster · Explode, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, glass_blademaster.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Obsidian Blademaster — Duelist of volcanic glass. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Fast dashes. 3-hit blade combo. Fragile: heavy hits shatter it.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. swelling up, glowing brighter, about to burst — used for: explode.
2. bursting apart in a flash.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## hellhound.core.q

Hellhound Alpha · Idle, Move, Lunge, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Hellhound Alpha — Big black hound with a fiery mane. Main colours: dark grey (#2a1a18), black (#101010), red (#ff4020), yellow (#ffff40). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Leads 2 hounds. Flame pounce. Tough.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: chase.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. lunge coil: crouched low, ready to spring — used for: lunge.
7. lunge: stretched out flat in mid-spring.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## hellhound.extra.q

Hellhound Alpha · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, hellhound.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Hellhound Alpha — Big black hound with a fiery mane. Main colours: dark grey (#2a1a18), black (#101010), red (#ff4020), yellow (#ffff40). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Leads 2 hounds. Flame pounce. Tough.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: summon.
2. casting release: energy bursting outward from the body in a ring of light.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ember_berserker.core.s

Ember Berserker · Idle, Move, Wide sweep, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ember Berserker — Horned warrior with a burning axe. Main colours: red (#b04a2a), dark red (#5a2010), orange (#ff8040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Walks, then rushes. Spinning axe. Rage: every hit on it makes it faster.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: chase.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. wide sweep wind-up: twisted far to one side — used for: sweep.
7. wide sweep: mid-swing, a long arc trailing across the front.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ember_berserker.fb

Ember Berserker · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, ember_berserker.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ember Berserker — Horned warrior with a burning axe. Main colours: red (#b04a2a), dark red (#5a2010), orange (#ff8040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Walks, then rushes. Spinning axe. Rage: every hit on it makes it faster.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, wide sweep: mid-swing, a long arc trailing across the front.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, wide sweep: mid-swing, a long arc trailing across the front.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ember_berserker.extra.s

Ember Berserker · Enrage, Death · 3 poses, 3 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, ember_berserker.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ember Berserker — Horned warrior with a burning axe. Main colours: red (#b04a2a), dark red (#5a2010), orange (#ff8040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Walks, then rushes. Spinning axe. Rage: every hit on it makes it faster.
Layout: exactly 3 poses in a grid of 3 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. enraged roar: head back, mouth wide, body flushed and bristling — used for: enrage.
2. death frame 1: buckling, losing balance.
3. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bonepit_ghoul.core.s

Bone-pit Ghoul · Rooted idle, Grab, Hurt, Guard · 7 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Bone-pit Ghoul — Ghoul half-buried in a pile of bones. Main colours: muted orange (#8a8070), dark grey (#3a3028), red (#ff6040), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stays in its bone pile. Arms grab from the pile and drag you in. Burrowed = hard to hit.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. rooted in place, calm — used for: still.
2. rooted in place, swaying or pulsing slightly.
3. grab reach: limbs / tongue / tendrils shooting forward — used for: pull, grab.
4. grab hold: clenched shut, pulling back.
5. hurt: flinching backward, eyes shut, a few white impact sparks.
6. guarding: shield / shell / armour plates raised in front, braced — used for: front.
7. guard hit: recoiling slightly as a blow glances off, sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bonepit_ghoul.fb

Bone-pit Ghoul · Front and back: idle, steps, main attack · 4 poses, 4 × 1 · 1536x1024 · core

Attach: style_hero, style_centaur, bonepit_ghoul.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bone-pit Ghoul — Ghoul half-buried in a pile of bones. Main colours: muted orange (#8a8070), dark grey (#3a3028), red (#ff6040), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stays in its bone pile. Arms grab from the pile and drag you in. Burrowed = hard to hit.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, rooted in place, calm — used for: still.
2. seen from the FRONT, grab hold: clenched shut, pulling back.
3. seen from BEHIND, rooted in place, calm — used for: still.
4. seen from BEHIND, grab hold: clenched shut, pulling back.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bonepit_ghoul.extra.s

Bone-pit Ghoul · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, bonepit_ghoul.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bone-pit Ghoul — Ghoul half-buried in a pile of bones. Main colours: muted orange (#8a8070), dark grey (#3a3028), red (#ff6040), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stays in its bone pile. Arms grab from the pile and drag you in. Burrowed = hard to hit.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## slag_golem.core.s

Slag Golem · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Slag Golem — Lumpy golem of cooling slag. Main colours: muted brown (#6a5a50), dark brown (#3a2a20), orange (#ff8030), orange (#ffb040). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow. Slam. Splits into 3 slag blobs when "killed".
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. slam wind-up: rearing up, weapon or fists raised high overhead — used for: slam.
7. slam impact: crashing down into the ground, body compressed.
8. slam recover: pushing back up, off balance.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## slag_golem.fb

Slag Golem · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, slag_golem.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Slag Golem — Lumpy golem of cooling slag. Main colours: muted brown (#6a5a50), dark brown (#3a2a20), orange (#ff8030), orange (#ffb040). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow. Slam. Splits into 3 slag blobs when "killed".
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, slam recover: pushing back up, off balance.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, slam recover: pushing back up, off balance.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## slag_golem.extra.s

Slag Golem · Hurt, Split copy, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, slag_golem.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Slag Golem — Lumpy golem of cooling slag. Main colours: muted brown (#6a5a50), dark brown (#3a2a20), orange (#ff8030), orange (#ffb040). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow. Slam. Splits into 3 slag blobs when "killed".
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. a half-size copy of itself (drawn at half scale in the same cell) — used for: split.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## salamander_warrior.core.s

Salamander Warrior · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Salamander Warrior — Lizardfolk warrior with a flaming spear. Main colours: orange (#e07030), red (#8a3010), light grey (#c8c8d0), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Agile. Spear thrusts + tail whip. Fire immune; shield.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: chase.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: melee.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## salamander_warrior.fb

Salamander Warrior · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, salamander_warrior.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Salamander Warrior — Lizardfolk warrior with a flaming spear. Main colours: orange (#e07030), red (#8a3010), light grey (#c8c8d0), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Agile. Spear thrusts + tail whip. Fire immune; shield.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## salamander_warrior.extra.s

Salamander Warrior · Wide sweep, Guard, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, salamander_warrior.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Salamander Warrior — Lizardfolk warrior with a flaming spear. Main colours: orange (#e07030), red (#8a3010), light grey (#c8c8d0), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Agile. Spear thrusts + tail whip. Fire immune; shield.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. wide sweep wind-up: twisted far to one side — used for: sweep.
2. wide sweep: mid-swing, a long arc trailing across the front.
3. guarding: shield / shell / armour plates raised in front, braced — used for: front.
4. guard hit: recoiling slightly as a blow glances off, sparks.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## chain_warden.core.s

Chain Warden · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Chain Warden — Huge jailer wrapped in chains. Main colours: grey (#5a5058), dark grey (#2a2428), light grey (#9a9aa4), red (#ff4020). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow. Chain hook pulls you in, then a smash. Armor.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. slam wind-up: rearing up, weapon or fists raised high overhead — used for: slam.
7. slam impact: crashing down into the ground, body compressed.
8. slam recover: pushing back up, off balance.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## chain_warden.fb

Chain Warden · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, chain_warden.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Chain Warden — Huge jailer wrapped in chains. Main colours: grey (#5a5058), dark grey (#2a2428), light grey (#9a9aa4), red (#ff4020). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow. Chain hook pulls you in, then a smash. Armor.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, slam recover: pushing back up, off balance.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, slam recover: pushing back up, off balance.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## chain_warden.extra.s

Chain Warden · Hurt, Grab, Guard, Death · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, chain_warden.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Chain Warden — Huge jailer wrapped in chains. Main colours: grey (#5a5058), dark grey (#2a2428), light grey (#9a9aa4), red (#ff4020). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow. Chain hook pulls you in, then a smash. Armor.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. grab reach: limbs / tongue / tendrils shooting forward — used for: pull.
3. grab hold: clenched shut, pulling back.
4. guarding: shield / shell / armour plates raised in front, braced — used for: armor.
5. guard hit: recoiling slightly as a blow glances off, sparks.
6. death frame 1: buckling, losing balance.
7. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## charred_zombies.core.s

Charred Zombies · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Charred Zombies — Burnt shambling corpses. Main colours: dark grey (#3a3030), black (#1a1414), red (#ff6020), orange (#ffb040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Slow horde. Claw. Explode into flames on death.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: melee.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## charred_zombies.fb

Charred Zombies · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, charred_zombies.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Charred Zombies — Burnt shambling corpses. Main colours: dark grey (#3a3030), black (#1a1414), red (#ff6020), orange (#ffb040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Slow horde. Claw. Explode into flames on death.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## charred_zombies.extra.s

Charred Zombies · Explode, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, charred_zombies.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Charred Zombies — Burnt shambling corpses. Main colours: dark grey (#3a3030), black (#1a1414), red (#ff6020), orange (#ffb040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Slow horde. Claw. Explode into flames on death.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. swelling up, glowing brighter, about to burst — used for: explode.
2. bursting apart in a flash.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## molten_mimic.core.s

Molten Mimic · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Molten Mimic — A treasure chest with lava for a tongue. Main colours: brown (#8a5a3a), dark brown (#3a2418), yellow (#ffd040), red (#ff3030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Hops. Bite + lava lick. Looks like any chest.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: melee.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## molten_mimic.fb

Molten Mimic · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, molten_mimic.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Molten Mimic — A treasure chest with lava for a tongue. Main colours: brown (#8a5a3a), dark brown (#3a2418), yellow (#ffd040), red (#ff3030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Hops. Bite + lava lick. Looks like any chest.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## molten_mimic.extra.s

Molten Mimic · Disguise / ambush, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, molten_mimic.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Molten Mimic — A treasure chest with lava for a tongue. Main colours: brown (#8a5a3a), dark brown (#3a2418), yellow (#ffd040), red (#ff3030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Hops. Bite + lava lick. Looks like any chest.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. disguised / hidden form: looks like an ordinary harmless object or plant, eyes shut — used for: disguise.
2. reveal: springing out of the disguise, eyes snapping open.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## imp_bombardier.core.s

Imp Bombardier · Idle, Hover, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Imp Bombardier — Imp with a satchel of fire bombs. Main colours: red (#e05a2a), red (#8a2a10), orange (#ffb040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range, hops. Arcing fire bombs. Fragile.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: flit.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. ranged wind-up: aiming, the shot held ready — used for: lob.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## imp_bombardier.fb

Imp Bombardier · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, imp_bombardier.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Imp Bombardier — Imp with a satchel of fire bombs. Main colours: red (#e05a2a), red (#8a2a10), orange (#ffb040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range, hops. Arcing fire bombs. Fragile.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## imp_bombardier.extra.s

Imp Bombardier · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, imp_bombardier.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Imp Bombardier — Imp with a satchel of fire bombs. Main colours: red (#e05a2a), red (#8a2a10), orange (#ffb040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range, hops. Arcing fire bombs. Fragile.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## magma_vent.core.q

Magma Spitter · Rooted idle, Ranged attack, Hurt, Death · 7 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Magma Spitter — A living vent in the floor. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff6a20), pale yellow (#ffff80). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Stationary. Lava blob volley. Only its mouth is weak.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. rooted in place, calm — used for: still.
2. rooted in place, swaying or pulsing slightly.
3. ranged wind-up: aiming, the shot held ready — used for: lob.
4. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. hurt: flinching backward, eyes shut, a few white impact sparks.
6. death frame 1: buckling, losing balance.
7. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## obsidian_archer.core.s

Obsidian Archer · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Obsidian Archer — Glass-skinned archer. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Kites. Glass arrows that shatter into 3 on walls. Fragile.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## obsidian_archer.fb

Obsidian Archer · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, obsidian_archer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Obsidian Archer — Glass-skinned archer. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Kites. Glass arrows that shatter into 3 on walls. Fragile.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## obsidian_archer.extra.s

Obsidian Archer · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, obsidian_archer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Obsidian Archer — Glass-skinned archer. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Kites. Glass arrows that shatter into 3 on walls. Fragile.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ember_sniper.core.s

Ember Sniper Cultist · Idle, Move, Beam, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ember Sniper Cultist — Cultist channelling a thin beam of fire. Main colours: red (#8a2a20), dark red (#3a1010), orange (#ff8040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stays far. Long channelled beam (aim line). Interrupt it with any hit.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. beam charge: bracing, a bright point of light building — used for: beam.
7. beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ember_sniper.fb

Ember Sniper Cultist · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, ember_sniper.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ember Sniper Cultist — Cultist channelling a thin beam of fire. Main colours: red (#8a2a20), dark red (#3a1010), orange (#ff8040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stays far. Long channelled beam (aim line). Interrupt it with any hit.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ember_sniper.extra.s

Ember Sniper Cultist · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, ember_sniper.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ember Sniper Cultist — Cultist channelling a thin beam of fire. Main colours: red (#8a2a20), dark red (#3a1010), orange (#ff8040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stays far. Long channelled beam (aim line). Interrupt it with any hit.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## sulfur_beetle.core.q

Sulfur Bomber Beetle · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Sulfur Bomber Beetle — Yellow bombardier beetle. Main colours: yellow (#d8c040), olive (#8a7020), pale yellow (#f0f080), red (#ff3030). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Scuttles. Flings sulfur bombs (gas clouds). Its shell is weak from behind.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: zigzag.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: lob.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## sulfur_beetle.extra.q

Sulfur Bomber Beetle · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, sulfur_beetle.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Sulfur Bomber Beetle — Yellow bombardier beetle. Main colours: yellow (#d8c040), olive (#8a7020), pale yellow (#f0f080), red (#ff3030). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Scuttles. Flings sulfur bombs (gas clouds). Its shell is weak from behind.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: front.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## cinder_slinger.core.s

Cinder Slinger · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Cinder Slinger — Goblin with a flaming sling. Main colours: green (#6fa040), dark brown (#5a4028), red (#ff6020), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range. Flaming stones that ignite grass. Weak.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## cinder_slinger.fb

Cinder Slinger · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, cinder_slinger.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Cinder Slinger — Goblin with a flaming sling. Main colours: green (#6fa040), dark brown (#5a4028), red (#ff6020), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range. Flaming stones that ignite grass. Weak.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## cinder_slinger.extra.s

Cinder Slinger · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, cinder_slinger.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Cinder Slinger — Goblin with a flaming sling. Main colours: green (#6fa040), dark brown (#5a4028), red (#ff6020), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range. Flaming stones that ignite grass. Weak.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## pit_serpent.core.q

Lava Pit Serpent · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Lava Pit Serpent — Serpent that rises from lava pools. Main colours: orange (#ff6a20), red (#8a2a10), yellow (#ffd040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Submerges and moves between pools. Fireball volleys. Only hittable when up.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## pit_serpent.extra.q

Lava Pit Serpent · Swim, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, pit_serpent.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Lava Pit Serpent — Serpent that rises from lava pools. Main colours: orange (#ff6a20), red (#8a2a10), yellow (#ffd040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Submerges and moves between pools. Fireball volleys. Only hittable when up.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. submerged: only the top of the back and eyes above the surface line — used for: swim.
2. surfacing: rising up with water streaming off.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ash_crossbow.core.s

Ash Crossbowman · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ash Crossbowman — Soot-covered soldier with a heavy crossbow. Main colours: grey (#6a6060), dark grey (#2a2626), orange (#ff8040), orange (#ffb040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Holds position. Bolts that leave burning ground. Armor.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ash_crossbow.fb

Ash Crossbowman · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, ash_crossbow.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ash Crossbowman — Soot-covered soldier with a heavy crossbow. Main colours: grey (#6a6060), dark grey (#2a2626), orange (#ff8040), orange (#ffb040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Holds position. Bolts that leave burning ground. Armor.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ash_crossbow.extra.s

Ash Crossbowman · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, ash_crossbow.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ash Crossbowman — Soot-covered soldier with a heavy crossbow. Main colours: grey (#6a6060), dark grey (#2a2626), orange (#ff8040), orange (#ffb040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Holds position. Bolts that leave burning ground. Armor.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: armor.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## brimstone_eye.core.q

Brimstone Eye · Idle, Hover, Beam, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Brimstone Eye — Floating eye wreathed in flame. Main colours: red (#e05a2a), dark red (#6a2010), yellow (#ffe040), white (#ffffff). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Hovers. Tracking heat ray. Blinks = vulnerable.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: drift.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. beam charge: bracing, a bright point of light building — used for: beam.
7. beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## brimstone_eye.extra.q

Brimstone Eye · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, brimstone_eye.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Brimstone Eye — Floating eye wreathed in flame. Main colours: red (#e05a2a), dark red (#6a2010), yellow (#ffe040), white (#ffffff). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Hovers. Tracking heat ray. Blinks = vulnerable.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: bubble.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## flame_kite.core.q

Flame Kite Goblin · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Flame Kite Goblin — Goblin on a burning kite. Main colours: orange (#c8a060), brown (#6a4a30), red (#ff6020), red (#ff3030). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Circles above. Drops fire pots. Untargetable up high.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: orbit.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: lob.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## flame_kite.extra.q

Flame Kite Goblin · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, flame_kite.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Flame Kite Goblin — Goblin on a burning kite. Main colours: orange (#c8a060), brown (#6a4a30), red (#ff6020), red (#ff3030). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Circles above. Drops fire pots. Untargetable up high.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## dark_warlock.core.s

Dark Warlock · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Dark Warlock — Horned warlock in black robes. Main colours: dark grey (#3a2a3a), black (#1a101a), violet (#c040ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Teleports (existing). Heat-seek bolts (existing) + a curse. Shield when hit 3 times.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## dark_warlock.fb

Dark Warlock · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, dark_warlock.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Dark Warlock — Horned warlock in black robes. Main colours: dark grey (#3a2a3a), black (#1a101a), violet (#c040ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Teleports (existing). Heat-seek bolts (existing) + a curse. Shield when hit 3 times.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## dark_warlock.extra.s

Dark Warlock · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, dark_warlock.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Dark Warlock — Horned warlock in black robes. Main colours: dark grey (#3a2a3a), black (#1a101a), violet (#c040ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Teleports (existing). Heat-seek bolts (existing) + a curse. Shield when hit 3 times.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## pyromancer.core.s

Pyromancer · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Pyromancer — Flame-haired mage. Main colours: red (#e05a2a), dark red (#6a2010), orange (#ffb040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range. Fire rings expanding from him. Fire immune.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## pyromancer.fb

Pyromancer · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, pyromancer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Pyromancer — Flame-haired mage. Main colours: red (#e05a2a), dark red (#6a2010), orange (#ffb040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range. Fire rings expanding from him. Fire immune.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## pyromancer.extra.s

Pyromancer · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, pyromancer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Pyromancer — Flame-haired mage. Main colours: red (#e05a2a), dark red (#6a2010), orange (#ffb040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range. Fire rings expanding from him. Fire immune.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: ring.
2. casting release: energy bursting outward from the body in a ring of light.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## obsidian_sorceress.core.s

Obsidian Sorceress · Idle, Hover, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Obsidian Sorceress — Sorceress in glass armor. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides. Glass prisons trap you (break out with hits). Reflects projectiles.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: drift.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. ranged wind-up: aiming, the shot held ready — used for: shoot, shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## obsidian_sorceress.fb

Obsidian Sorceress · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, obsidian_sorceress.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Obsidian Sorceress — Sorceress in glass armor. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides. Glass prisons trap you (break out with hits). Reflects projectiles.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## obsidian_sorceress.extra.s

Obsidian Sorceress · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, obsidian_sorceress.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Obsidian Sorceress — Sorceress in glass armor. Main colours: dark grey (#2a2a38), black (#101018), pale violet (#c080ff), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides. Glass prisons trap you (break out with hits). Reflects projectiles.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: reflect.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cinder_lich.core.s

Cinder Lich · Idle, Move, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Cinder Lich — Burning lich with a crown of embers. Main colours: pale yellow (#e8e0cc), dark grey (#2a1a18), red (#ff6020), red (#ff4020). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Floats. Raises charred skeletons; fire nova. Phylactery (an urn in the room) makes it immortal.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: summon, ring, banish.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cinder_lich.fb

Cinder Lich · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, cinder_lich.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Cinder Lich — Burning lich with a crown of embers. Main colours: pale yellow (#e8e0cc), dark grey (#2a1a18), red (#ff6020), red (#ff4020). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Floats. Raises charred skeletons; fire nova. Phylactery (an urn in the room) makes it immortal.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, casting release: energy bursting outward from the body in a ring of light.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, casting release: energy bursting outward from the body in a ring of light.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cinder_lich.extra.s

Cinder Lich · Revive, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, cinder_lich.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Cinder Lich — Burning lich with a crown of embers. Main colours: pale yellow (#e8e0cc), dark grey (#2a1a18), red (#ff6020), red (#ff4020). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Floats. Raises charred skeletons; fire nova. Phylactery (an urn in the room) makes it immortal.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. collapsed heap of its own remains, a faint glow inside — used for: revive.
2. pulling itself back together, half re-formed.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## magma_elemental.core.q

Magma Elemental · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Magma Elemental — A walking pool of magma. Main colours: orange (#ff6a20), red (#8a2a10), yellow (#ffd040), pale yellow (#ffff80). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Flows. Slam; leaves lava floor zones. Splits into 2 when hit with water.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: chase.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. slam wind-up: rearing up, weapon or fists raised high overhead — used for: slam.
7. slam impact: crashing down into the ground, body compressed.
8. slam recover: pushing back up, off balance.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## magma_elemental.extra.q

Magma Elemental · Hurt, Split copy, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, magma_elemental.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Magma Elemental — A walking pool of magma. Main colours: orange (#ff6a20), red (#8a2a10), yellow (#ffd040), pale yellow (#ffff80). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Flows. Slam; leaves lava floor zones. Splits into 2 when hit with water.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. a half-size copy of itself (drawn at half scale in the same cell) — used for: split.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## forge_artificer.core.s

Forge Artificer · Idle, Move, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Forge Artificer — Clockwork smith. Main colours: brown (#8a5a3a), dark brown (#3a2418), yellow (#ffd040), pale teal (#80ffff). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Runs around. Builds flame turrets (3 max). Weak.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite, flee.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: summon.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## forge_artificer.fb

Forge Artificer · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, forge_artificer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Forge Artificer — Clockwork smith. Main colours: brown (#8a5a3a), dark brown (#3a2418), yellow (#ffd040), pale teal (#80ffff). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Runs around. Builds flame turrets (3 max). Weak.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, casting release: energy bursting outward from the body in a ring of light.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, casting release: energy bursting outward from the body in a ring of light.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## forge_artificer.extra.s

Forge Artificer · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, forge_artificer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Forge Artificer — Clockwork smith. Main colours: brown (#8a5a3a), dark brown (#3a2418), yellow (#ffd040), pale teal (#80ffff). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Runs around. Builds flame turrets (3 max). Weak.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## flame_djinn.core.s

Flame Djinn · Idle, Move, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Flame Djinn — Djinn whose lower half is a fire whirlwind. Main colours: orange (#ff8040), red (#8a2a10), yellow (#ffe040), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Swirls. Fire tornado pulls you in. Intangible spin.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: orbit.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: aura.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## flame_djinn.fb

Flame Djinn · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, flame_djinn.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Flame Djinn — Djinn whose lower half is a fire whirlwind. Main colours: orange (#ff8040), red (#8a2a10), yellow (#ffe040), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Swirls. Fire tornado pulls you in. Intangible spin.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, casting release: energy bursting outward from the body in a ring of light.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, casting release: energy bursting outward from the body in a ring of light.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## flame_djinn.extra.s

Flame Djinn · Disguise / ambush, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, flame_djinn.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Flame Djinn — Djinn whose lower half is a fire whirlwind. Main colours: orange (#ff8040), red (#8a2a10), yellow (#ffe040), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Swirls. Fire tornado pulls you in. Intangible spin.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. disguised / hidden form: looks like an ordinary harmless object or plant, eyes shut — used for: lure.
2. reveal: springing out of the disguise, eyes snapping open.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## smoke_wraith.core.s

Smoke Wraith · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Smoke Wraith — Figure of choking smoke. Main colours: grey (#6a6060), dark grey (#2a2626), light grey (#c0c0c0), red (#ff4040). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Hides in smoke clouds. Smoke clones + choke (slow + dmg). Intangible inside smoke.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: melee.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## smoke_wraith.fb

Smoke Wraith · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, smoke_wraith.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Smoke Wraith — Figure of choking smoke. Main colours: grey (#6a6060), dark grey (#2a2626), light grey (#c0c0c0), red (#ff4040). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Hides in smoke clouds. Smoke clones + choke (slow + dmg). Intangible inside smoke.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## smoke_wraith.extra.s

Smoke Wraith · Cast, Blink, Guard, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, smoke_wraith.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Smoke Wraith — Figure of choking smoke. Main colours: grey (#6a6060), dark grey (#2a2626), light grey (#c0c0c0), red (#ff4040). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Hides in smoke clouds. Smoke clones + choke (slow + dmg). Intangible inside smoke.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: cloud.
2. casting release: energy bursting outward from the body in a ring of light.
3. blink out: body breaking up into glowing teal motes — used for: blink.
4. blink in: body re-forming out of glowing motes.
5. guarding: shield / shell / armour plates raised in front, braced — used for: bubble.
6. guard hit: recoiling slightly as a blow glances off, sparks.
7. death frame 1: buckling, losing balance.
8. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ash_oracle.core.s

Ash Oracle · Rooted idle, Cast, Hurt, Death · 7 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ash Oracle — Masked seer sifting ash. Main colours: grey (#8a8480), dark grey (#3a3430), orange (#ff8040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stationary. Predicts eruptions: marked tiles erupt in a sequence. Weak.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. rooted in place, calm — used for: still.
2. rooted in place, swaying or pulsing slightly.
3. casting wind-up: gathering glowing energy, arms / antennae raised — used for: marks.
4. casting release: energy bursting outward from the body in a ring of light.
5. hurt: flinching backward, eyes shut, a few white impact sparks.
6. death frame 1: buckling, losing balance.
7. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ash_oracle.fb

Ash Oracle · Front and back: idle, steps, main attack · 4 poses, 4 × 1 · 1536x1024 · core

Attach: style_hero, style_centaur, ash_oracle.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ash Oracle — Masked seer sifting ash. Main colours: grey (#8a8480), dark grey (#3a3430), orange (#ff8040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stationary. Predicts eruptions: marked tiles erupt in a sequence. Weak.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, rooted in place, calm — used for: still.
2. seen from the FRONT, casting release: energy bursting outward from the body in a ring of light.
3. seen from BEHIND, rooted in place, calm — used for: still.
4. seen from BEHIND, casting release: energy bursting outward from the body in a ring of light.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## imp_summoner.core.s

Brimstone Summoner · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Brimstone Summoner — Horned summoner with a burning tome. Main colours: red (#8a2a20), dark red (#3a1010), red (#ff6020), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps distance. Opens imp portals. Weak.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## imp_summoner.fb

Brimstone Summoner · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, imp_summoner.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Brimstone Summoner — Horned summoner with a burning tome. Main colours: red (#8a2a20), dark red (#3a1010), red (#ff6020), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps distance. Opens imp portals. Weak.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## imp_summoner.extra.s

Brimstone Summoner · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, imp_summoner.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Brimstone Summoner — Horned summoner with a burning tome. Main colours: red (#8a2a20), dark red (#3a1010), red (#ff6020), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps distance. Opens imp portals. Weak.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: summon.
2. casting release: energy bursting outward from the body in a ring of light.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## dragon_priest.core.s

Dragon Cult Priest · Idle, Move, Breath, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Dragon Cult Priest — High priest in a dragon-skull mask. Main colours: red (#8a2a20), dark red (#3a1010), orange (#ff8040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Channels. Dragon breath cone via a skull staff; buffs cultists. Protected by cultists.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. breath inhale: chest swollen, head pulled back, glow in the throat — used for: breath.
7. breath exhale: head thrust forward, jaws wide open (do not draw the breath cone).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## dragon_priest.fb

Dragon Cult Priest · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, dragon_priest.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Dragon Cult Priest — High priest in a dragon-skull mask. Main colours: red (#8a2a20), dark red (#3a1010), orange (#ff8040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Channels. Dragon breath cone via a skull staff; buffs cultists. Protected by cultists.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, breath exhale: head thrust forward, jaws wide open (do not draw the breath cone).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, breath exhale: head thrust forward, jaws wide open (do not draw the breath cone).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## dragon_priest.extra.s

Dragon Cult Priest · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, dragon_priest.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Dragon Cult Priest — High priest in a dragon-skull mask. Main colours: red (#8a2a20), dark red (#3a1010), orange (#ff8040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Channels. Dragon breath cone via a skull staff; buffs cultists. Protected by cultists.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: heal, banish.
2. casting release: energy bursting outward from the body in a ring of light.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## soul_furnace.core.s

Soul Furnace · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Soul Furnace — A walking iron furnace with a grate for a mouth. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff6a20), red (#ff4020). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow. Absorbs the souls of monsters that die nearby — grows stronger. Armor.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. slam wind-up: rearing up, weapon or fists raised high overhead — used for: slam.
7. slam impact: crashing down into the ground, body compressed.
8. slam recover: pushing back up, off balance.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## soul_furnace.fb

Soul Furnace · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, soul_furnace.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Soul Furnace — A walking iron furnace with a grate for a mouth. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff6a20), red (#ff4020). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow. Absorbs the souls of monsters that die nearby — grows stronger. Armor.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, slam recover: pushing back up, off balance.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, slam recover: pushing back up, off balance.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## soul_furnace.extra.s

Soul Furnace · Hurt, Cast, Guard, Death · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, soul_furnace.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Soul Furnace — A walking iron furnace with a grate for a mouth. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff6a20), red (#ff4020). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow. Absorbs the souls of monsters that die nearby — grows stronger. Armor.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. casting wind-up: gathering glowing energy, arms / antennae raised — used for: aura.
3. casting release: energy bursting outward from the body in a ring of light.
4. guarding: shield / shell / armour plates raised in front, braced — used for: armor.
5. guard hit: recoiling slightly as a blow glances off, sparks.
6. death frame 1: buckling, losing balance.
7. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## eclipse_witch.core.s

Eclipse Witch · Idle, Hover, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Eclipse Witch — Witch with a black-sun pendant. Main colours: dark grey (#2a2a3a), black (#101018), yellow (#ffd040), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Floats. Darkens the room; only lit circles are safe. Visible only in light.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: drift.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## eclipse_witch.fb

Eclipse Witch · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, eclipse_witch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Eclipse Witch — Witch with a black-sun pendant. Main colours: dark grey (#2a2a3a), black (#101018), yellow (#ffd040), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Floats. Darkens the room; only lit circles are safe. Visible only in light.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## eclipse_witch.extra.s

Eclipse Witch · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, eclipse_witch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Eclipse Witch — Witch with a black-sun pendant. Main colours: dark grey (#2a2a3a), black (#101018), yellow (#ffd040), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Floats. Darkens the room; only lit circles are safe. Visible only in light.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: cloud, banish.
2. casting release: energy bursting outward from the body in a ring of light.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## salamander_sage.core.s

Salamander Sage · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Salamander Sage — Old lizard mage with a flame beard. Main colours: orange (#e07030), red (#8a3010), yellow (#ffd040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Walks. Fire shield that reflects melee. Fire immune.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## salamander_sage.fb

Salamander Sage · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, salamander_sage.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Salamander Sage — Old lizard mage with a flame beard. Main colours: orange (#e07030), red (#8a3010), yellow (#ffd040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Walks. Fire shield that reflects melee. Fire immune.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## salamander_sage.extra.s

Salamander Sage · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, salamander_sage.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Salamander Sage — Old lizard mage with a flame beard. Main colours: orange (#e07030), red (#8a3010), yellow (#ffd040), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Walks. Fire shield that reflects melee. Fire immune.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## meteor_caller.core.s

Meteor Caller · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Meteor Caller — Mage with a star-iron staff. Main colours: brown (#8a4a2a), dark red (#3a1a10), orange (#ff8030), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stands at a window. Meteors crash and leave magma pools. Weak up close.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: lob.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## meteor_caller.fb

Meteor Caller · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, meteor_caller.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Meteor Caller — Mage with a star-iron staff. Main colours: brown (#8a4a2a), dark red (#3a1a10), orange (#ff8030), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stands at a window. Meteors crash and leave magma pools. Weak up close.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## meteor_caller.extra.s

Meteor Caller · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, meteor_caller.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Meteor Caller — Mage with a star-iron staff. Main colours: brown (#8a4a2a), dark red (#3a1a10), orange (#ff8030), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stands at a window. Meteors crash and leave magma pools. Weak up close.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## chainmaster.core.s

Chainmaster Warlock · Idle, Move, Grab, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Chainmaster Warlock — Warlock with spectral chains. Main colours: dark grey (#3a2a3a), black (#1a101a), light grey (#9a9aa4), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Walks backwards. Chains tether you to a pillar. Break chains by moving the other way.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. grab reach: limbs / tongue / tendrils shooting forward — used for: pull, grab.
7. grab hold: clenched shut, pulling back.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## chainmaster.fb

Chainmaster Warlock · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, chainmaster.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Chainmaster Warlock — Warlock with spectral chains. Main colours: dark grey (#3a2a3a), black (#1a101a), light grey (#9a9aa4), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Walks backwards. Chains tether you to a pillar. Break chains by moving the other way.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, grab hold: clenched shut, pulling back.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, grab hold: clenched shut, pulling back.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## chainmaster.extra.s

Chainmaster Warlock · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, chainmaster.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Chainmaster Warlock — Warlock with spectral chains. Main colours: dark grey (#3a2a3a), black (#1a101a), light grey (#9a9aa4), red (#ff4060). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Walks backwards. Chains tether you to a pillar. Break chains by moving the other way.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: drain, banish.
2. casting release: energy bursting outward from the body in a ring of light.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## phoenix_mage.core.s

Phoenix Mage · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Phoenix Mage — Mage with fiery phoenix wings. Main colours: orange (#ff8a30), red (#c03010), yellow (#ffe040), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Flies across the room. Fire feathers; rebirth once at 0 HP. Rebirth takes 3 s — interrupt it.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: orbit.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## phoenix_mage.fb

Phoenix Mage · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, phoenix_mage.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Phoenix Mage — Mage with fiery phoenix wings. Main colours: orange (#ff8a30), red (#c03010), yellow (#ffe040), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Flies across the room. Fire feathers; rebirth once at 0 HP. Rebirth takes 3 s — interrupt it.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## phoenix_mage.extra.s

Phoenix Mage · Breath, Revive, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, phoenix_mage.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Phoenix Mage — Mage with fiery phoenix wings. Main colours: orange (#ff8a30), red (#c03010), yellow (#ffe040), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Flies across the room. Fire feathers; rebirth once at 0 HP. Rebirth takes 3 s — interrupt it.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. breath inhale: chest swollen, head pulled back, glow in the throat — used for: breath.
2. breath exhale: head thrust forward, jaws wide open (do not draw the breath cone).
3. collapsed heap of its own remains, a faint glow inside — used for: revive.
4. pulling itself back together, half re-formed.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## volcanic_hexer.core.s

Volcanic Hexer · Idle, Hover, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Volcanic Hexer — Hexer with a half-fire, half-ice mask. Main colours: red (#6a3a2a), dark red (#2a1410), red (#ff6020), pale teal (#80e0ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Hops. Alternating curses: burn while moving / freeze while still. Weak.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: flit.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. ranged wind-up: aiming, the shot held ready — used for: shoot, shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## volcanic_hexer.fb

Volcanic Hexer · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, volcanic_hexer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Volcanic Hexer — Hexer with a half-fire, half-ice mask. Main colours: red (#6a3a2a), dark red (#2a1410), red (#ff6020), pale teal (#80e0ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Hops. Alternating curses: burn while moving / freeze while still. Weak.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## volcanic_hexer.extra.s

Volcanic Hexer · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, volcanic_hexer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Volcanic Hexer — Hexer with a half-fire, half-ice mask. Main colours: red (#6a3a2a), dark red (#2a1410), red (#ff6020), pale teal (#80e0ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Hops. Alternating curses: burn while moving / freeze while still. Weak.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ember_construct.core.s

Runic Ember Construct · Idle, Move, Beam, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Runic Ember Construct — Stone construct covered in rune plates. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff8030), pale teal (#7fe8ff). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow. Rune beams; shield up. Shield drops only when you hit its rune plates in the right order.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. beam charge: bracing, a bright point of light building — used for: beam.
7. beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ember_construct.fb

Runic Ember Construct · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, ember_construct.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Runic Ember Construct — Stone construct covered in rune plates. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff8030), pale teal (#7fe8ff). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow. Rune beams; shield up. Shield drops only when you hit its rune plates in the right order.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ember_construct.extra.s

Runic Ember Construct · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, ember_construct.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Runic Ember Construct — Stone construct covered in rune plates. Main colours: dark grey (#4a3a38), dark grey (#2a1a18), orange (#ff8030), pale teal (#7fe8ff). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow. Rune beams; shield up. Shield drops only when you hit its rune plates in the right order.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: armor, bubble.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## flame_wisp.core.q

Flame Wisp · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Flame Wisp — Little living flame. Main colours: orange (#ffb040), red (#c03010), yellow (#ffe040), dark red (#301010). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Orbits casters. Small fire darts. Fragile.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: orbit.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## flame_wisp.extra.q

Flame Wisp · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, flame_wisp.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Flame Wisp — Little living flame. Main colours: orange (#ffb040), red (#c03010), yellow (#ffe040), dark red (#301010). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Orbits casters. Small fire darts. Fragile.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## fairy_phoenix_pixie.core.q

Phoenix Pixie · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Phoenix Pixie — Hair and wings of living flame; she is reborn every dawn. Main colours: orange (#ff8020), yellow (#ffd040). Size: about 0.4× the height of the hero (tiny).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hovering, body tilted slightly forward — used for: hovers and flutters.
2. hover cycle frame 2: bobbing up, wings / trails spread.
3. hover cycle frame 3: level, drifting.
4. hover cycle frame 4: bobbing down, wings / trails folded.
5. talking: mouth open, one hand raised in a friendly gesture — used for: gives its quest.
6. talking: nodding, the other hand gesturing.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: blesses your familiar.
8. casting release: energy bursting outward from the body in a ring of light.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## fairy_ember_newt_rider.core.q

Ember-Newt Rider · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ember-Newt Rider — Rides a red fire-salamander through the ember fields. Main colours: red (#e04020), orange (#ffb040). Size: about 0.4× the height of the hero (tiny).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hovering, body tilted slightly forward — used for: hovers and flutters.
2. hover cycle frame 2: bobbing up, wings / trails spread.
3. hover cycle frame 3: level, drifting.
4. hover cycle frame 4: bobbing down, wings / trails folded.
5. talking: mouth open, one hand raised in a friendly gesture — used for: gives its quest.
6. talking: nodding, the other hand gesturing.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: blesses your familiar.
8. casting release: energy bursting outward from the body in a ring of light.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## fairy_obsidian_knight.core.q

Obsidian Knight · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Obsidian Knight — Black-glass armour cracked with glowing lava veins. Main colours: black (#1a1418), dark red (#402830). Size: about 0.4× the height of the hero (tiny).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hovering, body tilted slightly forward — used for: hovers and flutters.
2. hover cycle frame 2: bobbing up, wings / trails spread.
3. hover cycle frame 3: level, drifting.
4. hover cycle frame 4: bobbing down, wings / trails folded.
5. talking: mouth open, one hand raised in a friendly gesture — used for: gives its quest.
6. talking: nodding, the other hand gesturing.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: blesses your familiar.
8. casting release: energy bursting outward from the body in a ring of light.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## fairy_cinder_orb.core.q

Cinder Orb · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Cinder Orb — A floating coal with a cheeky grin and flame wings. Main colours: red (#ff5010), yellow (#ffd060). Size: about 0.4× the height of the hero (tiny).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hovering, body tilted slightly forward — used for: hovers and flutters.
2. hover cycle frame 2: bobbing up, wings / trails spread.
3. hover cycle frame 3: level, drifting.
4. hover cycle frame 4: bobbing down, wings / trails folded.
5. talking: mouth open, one hand raised in a friendly gesture — used for: gives its quest.
6. talking: nodding, the other hand gesturing.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: blesses your familiar.
8. casting release: energy bursting outward from the body in a ring of light.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## fairy_ashmoth_queen.core.q

Ashmoth · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ashmoth — Wide ash-grey moth wings edged in glowing orange. Main colours: muted orange (#a09088), orange (#e0a070). Size: about 0.4× the height of the hero (tiny).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hovering, body tilted slightly forward — used for: hovers and flutters.
2. hover cycle frame 2: bobbing up, wings / trails spread.
3. hover cycle frame 3: level, drifting.
4. hover cycle frame 4: bobbing down, wings / trails folded.
5. talking: mouth open, one hand raised in a friendly gesture — used for: gives its quest.
6. talking: nodding, the other hand gesturing.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: blesses your familiar.
8. casting release: energy bursting outward from the body in a ring of light.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## monarch_phoenix_sovereign.core.q

Pyrrhus, King of the Embers · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Pyrrhus, King of the Embers — The phoenix-king: wings of roaring flame, a sunburst halo and a sceptre with a heart of fire. Main colours: red (#c03020), orange (#ff8020), orange (#ffa040). Size: about 1.2× the height of the hero.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hovering, body tilted slightly forward — used for: hovers and flutters.
2. hover cycle frame 2: bobbing up, wings / trails spread.
3. hover cycle frame 3: level, drifting.
4. hover cycle frame 4: bobbing down, wings / trails folded.
5. talking: mouth open, one hand raised in a friendly gesture — used for: gives its quest.
6. talking: nodding, the other hand gesturing.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: grants a familiar slot.
8. casting release: energy bursting outward from the body in a ring of light.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## animal_fire_imp_critter.core.q

Ember Imp (critter) · Idle, Hover · 6 poses, 3 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ember Imp (critter) — A tiny mischievous imp of orange flame with coal-black hands.  Size: about 0.4× the height of the hero (tiny).
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. hovering, body tilted slightly forward — used for: wanders, and flees when you come close.
4. hover cycle frame 2: bobbing up, wings / trails spread.
5. hover cycle frame 3: level, drifting.
6. hover cycle frame 4: bobbing down, wings / trails folded.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## animal_ash_crow.core.q

Ash Crow · Idle, Hover · 6 poses, 3 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ash Crow — A soot-black crow with glowing orange eyes and ember-tipped wings.  Size: about 0.4× the height of the hero (tiny).
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. hovering, body tilted slightly forward — used for: wanders, and flees when you come close.
4. hover cycle frame 2: bobbing up, wings / trails spread.
5. hover cycle frame 3: level, drifting.
6. hover cycle frame 4: bobbing down, wings / trails folded.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## animal_lava_wyrm.core.q

Lava Wyrm · Idle, Move, Melee attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Lava Wyrm — A low orange-red lizard-wyrm with cracked black scales and molten light between them.  Size: about 1.1× the height of the hero.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing — used for: wanders, and flees when you come close.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: fights back when cornered.
8. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## animal_ash_titan.core.q

Ash Titan · Idle, Move, Melee attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ash Titan — A hulking ape-like beast of dark ash-grey stone and fur with ember eyes.  Size: about 1.8× the height of the hero.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing — used for: wanders, and flees when you come close.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: fights back when cornered.
8. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```
