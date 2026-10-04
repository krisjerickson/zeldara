# Wetlands — 159 requests

Save each result as `sprites/incoming/<request id>.png`.

## bog_serpent.core.q

Bog Serpent · Idle, Move, Breath, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Bog Serpent — Long green serpent with fin ridges, rising from the bog. Main colours: green (#2a8a4a), dark green (#14502a), green (#80ff60), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Hides submerged — only ripples show — then rushes out. Bog-flame: a cone of green swamp fire (existing attack). Invulnerable while submerged.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## bog_serpent.extra.q

Bog Serpent · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, bog_serpent.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bog Serpent — Long green serpent with fin ridges, rising from the bog. Main colours: green (#2a8a4a), dark green (#14502a), green (#80ff60), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Hides submerged — only ripples show — then rushes out. Bog-flame: a cone of green swamp fire (existing attack). Invulnerable while submerged.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mud_troll.core.s

Mud Troll · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Mud Troll — Hulking troll caked in dripping mud. Main colours: dark brown (#5a4a28), dark brown (#3a2e18), muted olive (#8a7a50), red (#ff6030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Zig-zag lumber (existing). Stomp (existing) that throws mud: slow 30% for 2 s. Regenerates while standing in mud.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mud_troll.fb

Mud Troll · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mud_troll.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mud Troll — Hulking troll caked in dripping mud. Main colours: dark brown (#5a4a28), dark brown (#3a2e18), muted olive (#8a7a50), red (#ff6030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Zig-zag lumber (existing). Stomp (existing) that throws mud: slow 30% for 2 s. Regenerates while standing in mud.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mud_troll.extra.s

Mud Troll · Hurt, Death · 3 poses, 3 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, mud_troll.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mud Troll — Hulking troll caked in dripping mud. Main colours: dark brown (#5a4a28), dark brown (#3a2e18), muted olive (#8a7a50), red (#ff6030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Zig-zag lumber (existing). Stomp (existing) that throws mud: slow 30% for 2 s. Regenerates while standing in mud.
Layout: exactly 3 poses in a grid of 3 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. death frame 1: buckling, losing balance.
3. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## lily_lurker.core.q

Lily Lurker · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Lily Lurker — A lantern lily pad that is really the top of a big snapping jaw. Main colours: green (#3a8a6a), dark teal (#1a4a3a), pale orange (#ffd27a), red (#ff3030). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Hidden among real lily pads. Snap + drag: pulls you 2 tiles into the water. Only its glowing lure is weak.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## lily_lurker.extra.q

Lily Lurker · Grab, Disguise / ambush, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, lily_lurker.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Lily Lurker — A lantern lily pad that is really the top of a big snapping jaw. Main colours: green (#3a8a6a), dark teal (#1a4a3a), pale orange (#ffd27a), red (#ff3030). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Hidden among real lily pads. Snap + drag: pulls you 2 tiles into the water. Only its glowing lure is weak.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. grab reach: limbs / tongue / tendrils shooting forward — used for: pull.
2. grab hold: clenched shut, pulling back.
3. disguised / hidden form: looks like an ordinary harmless object or plant, eyes shut — used for: ambush.
4. reveal: springing out of the disguise, eyes snapping open.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## glowfrog.core.q

Glowfrog Croaker · Idle, Move, Grab, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Glowfrog Croaker — Chubby frog with bioluminescent spots. Main colours: teal (#40c0a0), dark teal (#1a6a5a), pale green (#b0ff80), black (#101010). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Leaps in arcs from pad to pad. Tongue lash that pulls you to it. Poison skin: touching it poisons you (2 dmg/s, 3 s).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. grab reach: limbs / tongue / tendrils shooting forward — used for: pull.
7. grab hold: clenched shut, pulling back.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## glowfrog.extra.q

Glowfrog Croaker · Cast, Leap, Death · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, glowfrog.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Glowfrog Croaker — Chubby frog with bioluminescent spots. Main colours: teal (#40c0a0), dark teal (#1a6a5a), pale green (#b0ff80), black (#101010). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Leaps in arcs from pad to pad. Tongue lash that pulls you to it. Poison skin: touching it poisons you (2 dmg/s, 3 s).
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: aura.
2. casting release: energy bursting outward from the body in a ring of light.
3. leap crouch: squashed down before the jump — used for: leap.
4. leap: in the air, limbs tucked.
5. leap landing: squashed on impact.
6. death frame 1: buckling, losing balance.
7. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## leech_swarm.core.q

Leech Swarm · Idle, Hover, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Leech Swarm — Wriggling cloud of black leeches under the water. Main colours: dark grey (#3a2a3a), black (#1a101a), red (#c04060), red (#ff3030). Size: about 0.6× the height of the hero.
How it behaves in the game (for the poses): Drifts toward you in shallow water. Latches on: drains 1 HP/s until you leave the water or dodge-roll. Fire or salt breaks the swarm.
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

## leech_swarm.extra.q

Leech Swarm · Swim, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, leech_swarm.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Leech Swarm — Wriggling cloud of black leeches under the water. Main colours: dark grey (#3a2a3a), black (#1a101a), red (#c04060), red (#ff3030). Size: about 0.6× the height of the hero.
How it behaves in the game (for the poses): Drifts toward you in shallow water. Latches on: drains 1 HP/s until you leave the water or dodge-roll. Fire or salt breaks the swarm.
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

## mire_crab.core.q

Mire Crab · Idle, Move, Grab, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Mire Crab — Moss-backed crab with one oversized claw. Main colours: muted green (#6a8a5a), dark green (#3a4a30), muted green (#a0c080), black (#101010). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Scuttles sideways; always faces you. Claw grab + pinch (hold 1 s). Shell blocks everything from the front.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: chase.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. grab reach: limbs / tongue / tendrils shooting forward — used for: grab.
7. grab hold: clenched shut, pulling back.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mire_crab.extra.q

Mire Crab · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, mire_crab.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mire Crab — Moss-backed crab with one oversized claw. Main colours: muted green (#6a8a5a), dark green (#3a4a30), muted green (#a0c080), black (#101010). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Scuttles sideways; always faces you. Claw grab + pinch (hold 1 s). Shell blocks everything from the front.
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

## will_o_wisp.core.q

Will-o'-Wisp · Idle, Hover, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Will-o'-Wisp — A pale floating flame that bobs just out of reach. Main colours: pale teal (#c0f0ff), teal (#4a8aa0), pale teal (#80e0ff), white (#ffffff). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Drifts away as you approach, toward deep water. Lure: slowly pulls you toward it while you are near. Can only be hurt by ranged attacks or magic.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: drift.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: basic attack.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## will_o_wisp.extra.q

Will-o'-Wisp · Disguise / ambush, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, will_o_wisp.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Will-o'-Wisp — A pale floating flame that bobs just out of reach. Main colours: pale teal (#c0f0ff), teal (#4a8aa0), pale teal (#80e0ff), white (#ffffff). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Drifts away as you approach, toward deep water. Lure: slowly pulls you toward it while you are near. Can only be hurt by ranged attacks or magic.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. disguised / hidden form: looks like an ordinary harmless object or plant, eyes shut — used for: lure.
2. reveal: springing out of the disguise, eyes snapping open.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## peat_walker.core.s

Peat Walker · Idle, Move, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Peat Walker — Leathery bog-mummy wrapped in reeds. Main colours: muted brown (#5a4a38), dark grey (#2a2018), muted green (#80a060), pale green (#c0ff80). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Slow walk; sinks and resurfaces. Summons grabbing mud-hands around you (root 1 s). Hands are separate targets; the body is tough.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: marks.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## peat_walker.fb

Peat Walker · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, peat_walker.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Peat Walker — Leathery bog-mummy wrapped in reeds. Main colours: muted brown (#5a4a38), dark grey (#2a2018), muted green (#80a060), pale green (#c0ff80). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Slow walk; sinks and resurfaces. Summons grabbing mud-hands around you (root 1 s). Hands are separate targets; the body is tough.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## peat_walker.extra.s

Peat Walker · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, peat_walker.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Peat Walker — Leathery bog-mummy wrapped in reeds. Main colours: muted brown (#5a4a38), dark grey (#2a2018), muted green (#80a060), pale green (#c0ff80). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Slow walk; sinks and resurfaces. Summons grabbing mud-hands around you (root 1 s). Hands are separate targets; the body is tough.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: armor.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## shellback.core.q

Snapping Shellback · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Snapping Shellback — Big snapping turtle with a mossy, runed shell. Main colours: muted green (#6a8a4a), dark green (#3a4a28), muted olive (#8a7a50), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Slow walk; spins in its shell for fast attacks. Shell spin that ricochets around the area. Retracted = invulnerable.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: chase.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: basic attack.
7. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## shellback.extra.q

Snapping Shellback · Roll, Guard, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, shellback.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Snapping Shellback — Big snapping turtle with a mossy, runed shell. Main colours: muted green (#6a8a4a), dark green (#3a4a28), muted olive (#8a7a50), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Slow walk; spins in its shell for fast attacks. Shell spin that ricochets around the area. Retracted = invulnerable.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. curled into a tight ball — used for: roll.
2. rolling: the ball mid-spin with motion lines.
3. guarding: shield / shell / armour plates raised in front, braced — used for: front.
4. guard hit: recoiling slightly as a blow glances off, sparks.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mangrove_strangler.core.q

Mangrove Strangler · Rooted idle, Cast, Hurt, Death · 7 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Mangrove Strangler — Mangrove tree with glowing blue roots and a knot for a face. Main colours: dark brown (#4a3a2a), dark grey (#2a2018), teal (#4fe0ff). Size: about 1.7× the height of the hero.
How it behaves in the game (for the poses): Stationary. Root lashes from the ground anywhere in a 5-tile radius (glow warning). Immune to arrows; burns easily.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. rooted in place, calm — used for: still.
2. rooted in place, swaying or pulsing slightly.
3. casting wind-up: gathering glowing energy, arms / antennae raised — used for: marks.
4. casting release: energy bursting outward from the body in a ring of light.
5. hurt: flinching backward, eyes shut, a few white impact sparks.
6. death frame 1: buckling, losing balance.
7. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bloodgnats.core.q

Bloodgnat Cloud · Idle, Hover, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Bloodgnat Cloud — A buzzing red cloud of mosquitoes. Main colours: red (#a04050), dark red (#501820), pale red (#ff8080), red (#ff3030). Size: about 0.6× the height of the hero.
How it behaves in the game (for the poses): Hit-and-run passes. Each pass adds a "bitten" stack: -5% speed, max 5. Scatters and reforms when hit.
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

## bloodgnats.extra.q

Bloodgnat Cloud · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, bloodgnats.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bloodgnat Cloud — A buzzing red cloud of mosquitoes. Main colours: red (#a04050), dark red (#501820), pale red (#ff8080), red (#ff3030). Size: about 0.6× the height of the hero.
How it behaves in the game (for the poses): Hit-and-run passes. Each pass adds a "bitten" stack: -5% speed, max 5. Scatters and reforms when hit.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## reed_stalker.core.q

Reed Stalker · Idle, Hover, Lunge, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Reed Stalker — Tall reed-coloured mantis-heron hybrid. Main colours: muted green (#8a9a50), dark green (#4a5028), pale yellow (#e0e8a0), red (#ff4040). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Invisible while inside cattails. Ambush lunge, then retreats into the reeds. Revealed for 3 s after each attack.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. lunge coil: crouched low, ready to spring — used for: lunge.
7. lunge: stretched out flat in mid-spring.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## reed_stalker.extra.q

Reed Stalker · Disguise / ambush, Dodge, Death · 5 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, reed_stalker.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Reed Stalker — Tall reed-coloured mantis-heron hybrid. Main colours: muted green (#8a9a50), dark green (#4a5028), pale yellow (#e0e8a0), red (#ff4040). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Invisible while inside cattails. Ambush lunge, then retreats into the reeds. Revealed for 3 s after each attack.
Layout: exactly 5 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. disguised / hidden form: looks like an ordinary harmless object or plant, eyes shut — used for: ambush.
2. reveal: springing out of the disguise, eyes snapping open.
3. dodge: leaning sharply aside, afterimage trailing — used for: dodge.
4. death frame 1: buckling, losing balance.
5. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## waterlogged_revenant.core.s

Waterlogged Revenant · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Waterlogged Revenant — Drowned villager in dripping rags. Main colours: muted teal (#6a8a8a), dark teal (#2a4a4a), pale teal (#a0d0d0), pale teal (#80ffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Climbs out of flooded houses. Throws broken roof tiles in arcs. Waterlogged: fire does half damage.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
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

## waterlogged_revenant.fb

Waterlogged Revenant · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, waterlogged_revenant.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Waterlogged Revenant — Drowned villager in dripping rags. Main colours: muted teal (#6a8a8a), dark teal (#2a4a4a), pale teal (#a0d0d0), pale teal (#80ffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Climbs out of flooded houses. Throws broken roof tiles in arcs. Waterlogged: fire does half damage.
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

## waterlogged_revenant.extra.s

Waterlogged Revenant · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, waterlogged_revenant.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Waterlogged Revenant — Drowned villager in dripping rags. Main colours: muted teal (#6a8a8a), dark teal (#2a4a4a), pale teal (#a0d0d0), pale teal (#80ffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Climbs out of flooded houses. Throws broken roof tiles in arcs. Waterlogged: fire does half damage.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## stormeel.core.q

Storm Eel · Idle, Move, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Storm Eel — Long eel crackling with blue electricity. Main colours: blue (#3a5a8a), dark blue (#1a2a4a), pale teal (#80e0ff), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Swims along rivers and pools. Charges the whole pool — any water tile near it shocks you. Only hittable when it leaps.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: ring.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## stormeel.extra.q

Storm Eel · Swim, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, stormeel.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Storm Eel — Long eel crackling with blue electricity. Main colours: blue (#3a5a8a), dark blue (#1a2a4a), pale teal (#80e0ff), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Swims along rivers and pools. Charges the whole pool — any water tile near it shocks you. Only hittable when it leaps.
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

## heron_knight.core.q

Heron Knight · Idle, Move, Lunge, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Heron Knight — Tall white heron in a little helmet, beak like a spear. Main colours: white (#d8e0e8), muted blue (#5a6a7a), yellow (#e8c040), black (#101010). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Wades; leaps back after each strike. Precise long-range beak stab (3 tiles). Parries arrows with its wings.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
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

## heron_knight.extra.q

Heron Knight · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, heron_knight.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Heron Knight — Tall white heron in a little helmet, beak like a spear. Main colours: white (#d8e0e8), muted blue (#5a6a7a), yellow (#e8c040), black (#101010). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Wades; leaps back after each strike. Precise long-range beak stab (3 tiles). Parries arrows with its wings.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: reflect.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## moss_golem.core.s

Moss Golem · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Moss Golem — Stone golem blanketed in thick wet moss. Main colours: muted green (#6a8a5a), dark green (#3a5a30), pale green (#80ff80). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow; drinks from pools to heal. Slam with a moss shockwave (slow). Moss armor absorbs damage until burned off.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## moss_golem.fb

Moss Golem · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, moss_golem.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Moss Golem — Stone golem blanketed in thick wet moss. Main colours: muted green (#6a8a5a), dark green (#3a5a30), pale green (#80ff80). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow; drinks from pools to heal. Slam with a moss shockwave (slow). Moss armor absorbs damage until burned off.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## moss_golem.extra.s

Moss Golem · Hurt, Guard, Death · 5 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, moss_golem.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Moss Golem — Stone golem blanketed in thick wet moss. Main colours: muted green (#6a8a5a), dark green (#3a5a30), pale green (#80ff80). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Slow; drinks from pools to heal. Slam with a moss shockwave (slow). Moss armor absorbs damage until burned off.
Layout: exactly 5 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. guarding: shield / shell / armour plates raised in front, braced — used for: armor.
3. guard hit: recoiling slightly as a blow glances off, sparks.
4. death frame 1: buckling, losing balance.
5. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## slime_newts.core.q

Slime Newts · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Slime Newts — Bright orange newts in groups of 4. Main colours: orange (#e08040), brown (#8a4020), green (#c0ff60), black (#101010). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Scatter and regroup quickly. Spit slime: slows 20%, stacks. Tiny; low HP.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: zigzag.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## slime_newts.extra.q

Slime Newts · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, slime_newts.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Slime Newts — Bright orange newts in groups of 4. Main colours: orange (#e08040), brown (#8a4020), green (#c0ff60), black (#101010). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Scatter and regroup quickly. Spit slime: slows 20%, stacks. Tiny; low HP.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## stilt_bandit.core.s

Stilt Bandit · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Stilt Bandit — Marsh bandit on tall stilts with a fishing net. Main colours: orange (#c8a070), grey (#4a5a4a), pale yellow (#d8d0b0), red (#ff4040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Strides over water. Throws a net: roots you 2 s. Knock out a stilt and it falls in the water (stunned).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
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

## stilt_bandit.fb

Stilt Bandit · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, stilt_bandit.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Stilt Bandit — Marsh bandit on tall stilts with a fishing net. Main colours: orange (#c8a070), grey (#4a5a4a), pale yellow (#d8d0b0), red (#ff4040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Strides over water. Throws a net: roots you 2 s. Knock out a stilt and it falls in the water (stunned).
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

## stilt_bandit.extra.s

Stilt Bandit · Ranged attack, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, stilt_bandit.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Stilt Bandit — Marsh bandit on tall stilts with a fishing net. Main colours: orange (#c8a070), grey (#4a5a4a), pale yellow (#d8d0b0), red (#ff4040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Strides over water. Throws a net: roots you 2 s. Knock out a stilt and it falls in the water (stunned).
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. ranged wind-up: aiming, the shot held ready — used for: shoot.
2. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## fog_phantom.core.s

Fog Phantom · Idle, Hover, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Fog Phantom — A face in the fog with trailing mist arms. Main colours: light grey (#c8d0d0), grey (#7a8888), white (#e0f0f0), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Only visible within 3 tiles. Mist touch drains your light radius and 2 HP. Intangible except when attacking.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: drift.
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

## fog_phantom.fb

Fog Phantom · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, fog_phantom.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Fog Phantom — A face in the fog with trailing mist arms. Main colours: light grey (#c8d0d0), grey (#7a8888), white (#e0f0f0), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Only visible within 3 tiles. Mist touch drains your light radius and 2 HP. Intangible except when attacking.
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

## fog_phantom.extra.s

Fog Phantom · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, fog_phantom.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Fog Phantom — A face in the fog with trailing mist arms. Main colours: light grey (#c8d0d0), grey (#7a8888), white (#e0f0f0), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Only visible within 3 tiles. Mist touch drains your light radius and 2 HP. Intangible except when attacking.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: bubble.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bog_hydra.core.q

Bog Hydra · Rooted idle, Ranged attack, Hurt, Beam · 7 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Bog Hydra — Three-headed serpent rising from a sunken temple pool. Main colours: green (#3a7a4a), dark green (#1a4a2a), green (#c0ff60), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stays in its pool; heads weave independently. Each head: bite, poison spit, or water jet. Cut heads regrow unless burned within 5 s.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. rooted in place, calm — used for: still.
2. rooted in place, swaying or pulsing slightly.
3. ranged wind-up: aiming, the shot held ready — used for: shoot.
4. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. hurt: flinching backward, eyes shut, a few white impact sparks.
6. beam charge: bracing, a bright point of light building — used for: beam.
7. beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## bog_hydra.extra.q

Bog Hydra · Breath, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, bog_hydra.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bog Hydra — Three-headed serpent rising from a sunken temple pool. Main colours: green (#3a7a4a), dark green (#1a4a2a), green (#c0ff60), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stays in its pool; heads weave independently. Each head: bite, poison spit, or water jet. Cut heads regrow unless burned within 5 s.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. breath inhale: chest swollen, head pulled back, glow in the throat — used for: breath.
2. breath exhale: head thrust forward, jaws wide open (do not draw the breath cone).
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## drowned_guard.core.s

Drowned Guard · Idle, Move, Wide sweep, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Drowned Guard — Waterlogged temple guard with a halberd. Main colours: muted teal (#6a8a8a), dark teal (#3a4a50), white (#c8ccd4), pale teal (#80ffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Steady advance. Wide halberd sweep; drips leave slowing puddles. Armor: halved damage from the front.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
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

## drowned_guard.fb

Drowned Guard · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, drowned_guard.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Drowned Guard — Waterlogged temple guard with a halberd. Main colours: muted teal (#6a8a8a), dark teal (#3a4a50), white (#c8ccd4), pale teal (#80ffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Steady advance. Wide halberd sweep; drips leave slowing puddles. Armor: halved damage from the front.
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

## drowned_guard.extra.s

Drowned Guard · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, drowned_guard.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Drowned Guard — Waterlogged temple guard with a halberd. Main colours: muted teal (#6a8a8a), dark teal (#3a4a50), white (#c8ccd4), pale teal (#80ffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Steady advance. Wide halberd sweep; drips leave slowing puddles. Armor: halved damage from the front.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: front.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## sludge_brute.core.s

Sludge Brute · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Sludge Brute — A big ooze with a skull floating inside. Main colours: muted green (#5a6a40), dark grey (#2a3420), green (#a0c060), yellow (#ffff60). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow ooze. Engulf slam. Hits make it spit out small slimes.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## sludge_brute.fb

Sludge Brute · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, sludge_brute.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Sludge Brute — A big ooze with a skull floating inside. Main colours: muted green (#5a6a40), dark grey (#2a3420), green (#a0c060), yellow (#ffff60). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow ooze. Engulf slam. Hits make it spit out small slimes.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## sludge_brute.extra.s

Sludge Brute · Hurt, Split copy, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, sludge_brute.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Sludge Brute — A big ooze with a skull floating inside. Main colours: muted green (#5a6a40), dark grey (#2a3420), green (#a0c060), yellow (#ffff60). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow ooze. Engulf slam. Hits make it spit out small slimes.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. a half-size copy of itself (drawn at half scale in the same cell) — used for: split.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## gator_raider.core.s

Gator Raider · Idle, Move, Charge · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Gator Raider — Lizardfolk warrior with a turtle-shell shield. Main colours: muted green (#4a7a40), dark green (#2a4020), light grey (#c8c8d0), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Charges from a distance. Charge, then tail swipe knockback. Shield-first.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. charge wind-up: head lowered, pawing the ground, snorting — used for: charge.
7. charge: at full sprint, head down, dust kicked up.
8. charge crash: dazed and staggering after hitting a wall.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## gator_raider.fb

Gator Raider · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, gator_raider.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Gator Raider — Lizardfolk warrior with a turtle-shell shield. Main colours: muted green (#4a7a40), dark green (#2a4020), light grey (#c8c8d0), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Charges from a distance. Charge, then tail swipe knockback. Shield-first.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, charge crash: dazed and staggering after hitting a wall.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, charge crash: dazed and staggering after hitting a wall.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## gator_raider.extra.s

Gator Raider · Hurt, Wide sweep, Guard, Death · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, gator_raider.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Gator Raider — Lizardfolk warrior with a turtle-shell shield. Main colours: muted green (#4a7a40), dark green (#2a4020), light grey (#c8c8d0), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Charges from a distance. Charge, then tail swipe knockback. Shield-first.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. wide sweep wind-up: twisted far to one side — used for: sweep.
3. wide sweep: mid-swing, a long arc trailing across the front.
4. guarding: shield / shell / armour plates raised in front, braced — used for: front.
5. guard hit: recoiling slightly as a blow glances off, sparks.
6. death frame 1: buckling, losing balance.
7. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## crypt_crawler.core.q

Crypt Crawler · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Crypt Crawler — Giant centipede with rust-red plates. Main colours: red (#8a4a3a), dark red (#4a2018), orange (#ffb060), red (#ff3030). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Fast, wiggles along walls. Poison bite (DoT). Each body segment is separately hittable; cut it in half = 2 smaller crawlers.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: zigzag.
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

## crypt_crawler.extra.q

Crypt Crawler · Split copy, Death · 3 poses, 3 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, crypt_crawler.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Crypt Crawler — Giant centipede with rust-red plates. Main colours: red (#8a4a3a), dark red (#4a2018), orange (#ffb060), red (#ff3030). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Fast, wiggles along walls. Poison bite (DoT). Each body segment is separately hittable; cut it in half = 2 smaller crawlers.
Layout: exactly 3 poses in a grid of 3 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. a half-size copy of itself (drawn at half scale in the same cell) — used for: split.
2. death frame 1: buckling, losing balance.
3. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## leech_knight.core.s

Leech Knight · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Leech Knight — Knight in rusted armor, leeches for a plume. Main colours: muted magenta (#5a3a4a), dark grey (#2a1a28), red (#c04060), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Relentless walk. Every hit heals it. Tough.
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

## leech_knight.fb

Leech Knight · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, leech_knight.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Leech Knight — Knight in rusted armor, leeches for a plume. Main colours: muted magenta (#5a3a4a), dark grey (#2a1a28), red (#c04060), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Relentless walk. Every hit heals it. Tough.
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

## leech_knight.extra.s

Leech Knight · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, leech_knight.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Leech Knight — Knight in rusted armor, leeches for a plume. Main colours: muted magenta (#5a3a4a), dark grey (#2a1a28), red (#c04060), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Relentless walk. Every hit heals it. Tough.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: drain.
2. casting release: energy bursting outward from the body in a ring of light.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## mold_zombie.core.s

Mold Zombie · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Mold Zombie — Shambling corpse covered in yellow mold. Main colours: muted green (#8a9a70), dark grey (#4a5040), green (#d0e080), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Slow shamble in groups. Claw swipe. On death: poison cloud (3 s).
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mold_zombie.fb

Mold Zombie · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mold_zombie.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mold Zombie — Shambling corpse covered in yellow mold. Main colours: muted green (#8a9a70), dark grey (#4a5040), green (#d0e080), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Slow shamble in groups. Claw swipe. On death: poison cloud (3 s).
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

## mold_zombie.extra.s

Mold Zombie · Explode, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, mold_zombie.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mold Zombie — Shambling corpse covered in yellow mold. Main colours: muted green (#8a9a70), dark grey (#4a5040), green (#d0e080), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Slow shamble in groups. Claw swipe. On death: poison cloud (3 s).
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. swelling up, glowing brighter, about to burst — used for: explode.
2. bursting apart in a flash.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## barnacle_brute.core.s

Barnacle Brute · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Barnacle Brute — Giant crusted in barnacles. Main colours: grey (#8a8a80), dark grey (#4a4a48), pale orange (#e8e0d0), red (#ff6030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow. Heavy two-handed slam. Barnacle armor breaks off in chunks (3 stages).
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

## barnacle_brute.fb

Barnacle Brute · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, barnacle_brute.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Barnacle Brute — Giant crusted in barnacles. Main colours: grey (#8a8a80), dark grey (#4a4a48), pale orange (#e8e0d0), red (#ff6030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow. Heavy two-handed slam. Barnacle armor breaks off in chunks (3 stages).
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

## barnacle_brute.extra.s

Barnacle Brute · Hurt, Guard, Death · 5 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, barnacle_brute.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Barnacle Brute — Giant crusted in barnacles. Main colours: grey (#8a8a80), dark grey (#4a4a48), pale orange (#e8e0d0), red (#ff6030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Slow. Heavy two-handed slam. Barnacle armor breaks off in chunks (3 stages).
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

## rootbound_thrall.core.s

Rootbound Thrall · Idle, Move, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Rootbound Thrall — Villager puppet held up by roots. Main colours: muted brown (#6a5a40), dark brown (#3a2a18), green (#80c060), pale green (#c0ff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Jerky puppet movement. Roots burst from the floor around you. Cutting the roots on the wall frees (kills) it.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: lumber.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: marks.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## rootbound_thrall.fb

Rootbound Thrall · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, rootbound_thrall.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Rootbound Thrall — Villager puppet held up by roots. Main colours: muted brown (#6a5a40), dark brown (#3a2a18), green (#80c060), pale green (#c0ff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Jerky puppet movement. Roots burst from the floor around you. Cutting the roots on the wall frees (kills) it.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## rootbound_thrall.extra.s

Rootbound Thrall · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, rootbound_thrall.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Rootbound Thrall — Villager puppet held up by roots. Main colours: muted brown (#6a5a40), dark brown (#3a2a18), green (#80c060), pale green (#c0ff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Jerky puppet movement. Roots burst from the floor around you. Cutting the roots on the wall frees (kills) it.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## skitter_crabs.core.q

Skitter Crabs · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Skitter Crabs — A scuttling pack of palm-sized crabs. Main colours: orange (#c06a40), dark red (#6a3420), pale orange (#ffb080), black (#101010). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Surround you. Pinches. Each dies in one hit.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: zigzag.
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

## skitter_crabs.extra.q

Skitter Crabs · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, skitter_crabs.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Skitter Crabs — A scuttling pack of palm-sized crabs. Main colours: orange (#c06a40), dark red (#6a3420), pale orange (#ffb080), black (#101010). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Surround you. Pinches. Each dies in one hit.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## naga_guard.core.q

Naga Temple Guard · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Naga Temple Guard — Serpent-bodied warrior with two curved swords. Main colours: teal (#3a8a8a), dark teal (#1a4a4a), yellow (#e8c040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Slithers fast. Dual-slash combo (3 hits). Deflects arrows with spinning blades.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: chase.
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

## naga_guard.extra.q

Naga Temple Guard · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, naga_guard.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Naga Temple Guard — Serpent-bodied warrior with two curved swords. Main colours: teal (#3a8a8a), dark teal (#1a4a4a), yellow (#e8c040), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Slithers fast. Dual-slash combo (3 hits). Deflects arrows with spinning blades.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: reflect.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## spitfrog.core.q

Spitfrog Sniper · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Spitfrog Sniper — Frog with a pouch cheek full of poison. Main colours: green (#6a9a40), dark green (#3a5a20), green (#c0ff40), red (#ff3030). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Hops to vantage points. Arcing poison globs. Low HP.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## spitfrog.extra.q

Spitfrog Sniper · Leap, Death · 5 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, spitfrog.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Spitfrog Sniper — Frog with a pouch cheek full of poison. Main colours: green (#6a9a40), dark green (#3a5a20), green (#c0ff40), red (#ff3030). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Hops to vantage points. Arcing poison globs. Low HP.
Layout: exactly 5 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. leap crouch: squashed down before the jump — used for: leap.
2. leap: in the air, limbs tucked.
3. leap landing: squashed on impact.
4. death frame 1: buckling, losing balance.
5. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## harpoon_lizard.core.s

Harpoon Lizard · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Harpoon Lizard — Lizardfolk fisher with a harpoon on a rope. Main colours: muted green (#4a7a40), dark brown (#5a4028), light grey (#c8c8d0), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range. Harpoon: pulls you to it. Weak up close.
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

## harpoon_lizard.fb

Harpoon Lizard · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, harpoon_lizard.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Harpoon Lizard — Lizardfolk fisher with a harpoon on a rope. Main colours: muted green (#4a7a40), dark brown (#5a4028), light grey (#c8c8d0), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range. Harpoon: pulls you to it. Weak up close.
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

## harpoon_lizard.extra.s

Harpoon Lizard · Grab, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, harpoon_lizard.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Harpoon Lizard — Lizardfolk fisher with a harpoon on a rope. Main colours: muted green (#4a7a40), dark brown (#5a4028), light grey (#c8c8d0), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps range. Harpoon: pulls you to it. Weak up close.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. grab reach: limbs / tongue / tendrils shooting forward — used for: pull.
2. grab hold: clenched shut, pulling back.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## bubble_crab.core.q

Bubble Crab · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Bubble Crab — Blue crab that blows big bubbles. Main colours: teal (#8ac0d0), muted teal (#4a7080), pale teal (#e0f8ff), black (#101010). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Sidesteps. Bubble traps you: you float helpless for 1.5 s. Shell blocks frontal hits.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
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

## bubble_crab.extra.q

Bubble Crab · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, bubble_crab.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bubble Crab — Blue crab that blows big bubbles. Main colours: teal (#8ac0d0), muted teal (#4a7080), pale teal (#e0f8ff), black (#101010). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Sidesteps. Bubble traps you: you float helpless for 1.5 s. Shell blocks frontal hits.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: front.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## mud_mortar.core.s

Mud Mortar Troll · Rooted idle, Ranged attack, Hurt, Guard · 7 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Mud Mortar Troll — Squat troll with a hollow log mortar. Main colours: muted brown (#6a5a38), dark brown (#3a2e18), muted olive (#8a7a50), red (#ff6030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Stationary. Lobs mud bombs; each leaves a slowing puddle. Tough; slow to turn.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. rooted in place, calm — used for: still.
2. rooted in place, swaying or pulsing slightly.
3. ranged wind-up: aiming, the shot held ready — used for: lob.
4. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. hurt: flinching backward, eyes shut, a few white impact sparks.
6. guarding: shield / shell / armour plates raised in front, braced — used for: front.
7. guard hit: recoiling slightly as a blow glances off, sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mud_mortar.fb

Mud Mortar Troll · Front and back: idle, steps, main attack · 4 poses, 4 × 1 · 1536x1024 · core

Attach: style_hero, style_centaur, mud_mortar.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mud Mortar Troll — Squat troll with a hollow log mortar. Main colours: muted brown (#6a5a38), dark brown (#3a2e18), muted olive (#8a7a50), red (#ff6030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Stationary. Lobs mud bombs; each leaves a slowing puddle. Tough; slow to turn.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, rooted in place, calm — used for: still.
2. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
3. seen from BEHIND, rooted in place, calm — used for: still.
4. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mud_mortar.extra.s

Mud Mortar Troll · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, mud_mortar.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mud Mortar Troll — Squat troll with a hollow log mortar. Main colours: muted brown (#6a5a38), dark brown (#3a2e18), muted olive (#8a7a50), red (#ff6030). Size: about 1.5× the height of the hero.
How it behaves in the game (for the poses): Stationary. Lobs mud bombs; each leaves a slowing puddle. Tough; slow to turn.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## dart_naga.core.q

Dart Naga · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Dart Naga — Naga hiding in wall alcoves. Main colours: muted green (#4a8a6a), dark teal (#1a4a3a), pale green (#a0ff80), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Pops in and out of alcoves. Poison darts in a spread. Only hittable while out.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## dart_naga.extra.q

Dart Naga · Disguise / ambush, Dodge, Death · 5 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, dart_naga.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Dart Naga — Naga hiding in wall alcoves. Main colours: muted green (#4a8a6a), dark teal (#1a4a3a), pale green (#a0ff80), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Pops in and out of alcoves. Poison darts in a spread. Only hittable while out.
Layout: exactly 5 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. disguised / hidden form: looks like an ordinary harmless object or plant, eyes shut — used for: ambush.
2. reveal: springing out of the disguise, eyes snapping open.
3. dodge: leaning sharply aside, afterimage trailing — used for: dodge.
4. death frame 1: buckling, losing balance.
5. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## coral_archer.core.s

Coral Archer · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Coral Archer — Skeletal archer grown over with pink coral. Main colours: red (#e08a7a), red (#8a4a40), pale red (#ffd0c0), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Holds position. Arrows that ricochet off walls once. Coral armor on the front.
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

## coral_archer.fb

Coral Archer · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, coral_archer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Coral Archer — Skeletal archer grown over with pink coral. Main colours: red (#e08a7a), red (#8a4a40), pale red (#ffd0c0), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Holds position. Arrows that ricochet off walls once. Coral armor on the front.
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

## coral_archer.extra.s

Coral Archer · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, coral_archer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Coral Archer — Skeletal archer grown over with pink coral. Main colours: red (#e08a7a), red (#8a4a40), pale red (#ffd0c0), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Holds position. Arrows that ricochet off walls once. Coral armor on the front.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: front.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ink_squid.core.q

Ink Squid · Idle, Hover, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ink Squid — Floating squid with big sad eyes. Main colours: muted violet (#8a6aa0), muted violet (#4a3a60), dark blue (#303050), white (#ffffff). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Floats over water. Ink cloud blind + beak jab. Squirts away when hit.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: drift, flee.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. ranged wind-up: aiming, the shot held ready — used for: shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## ink_squid.extra.q

Ink Squid · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, ink_squid.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ink Squid — Floating squid with big sad eyes. Main colours: muted violet (#8a6aa0), muted violet (#4a3a60), dark blue (#303050), white (#ffffff). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Floats over water. Ink cloud blind + beak jab. Squirts away when hit.
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

## eel_turret.core.q

Hole Eel · Rooted idle, Beam, Hurt, Guard · 7 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Hole Eel — Eel living in floor water-holes. Main colours: muted blue (#4a6a8a), dark blue (#1a2a4a), pale teal (#80e0ff), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Pops out of a random hole. Water jet in a line. Only out for 2 s.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. rooted in place, calm — used for: still.
2. rooted in place, swaying or pulsing slightly.
3. beam charge: bracing, a bright point of light building — used for: beam.
4. beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
5. hurt: flinching backward, eyes shut, a few white impact sparks.
6. guarding: shield / shell / armour plates raised in front, braced — used for: bubble.
7. guard hit: recoiling slightly as a blow glances off, sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## eel_turret.extra.q

Hole Eel · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, eel_turret.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Hole Eel — Eel living in floor water-holes. Main colours: muted blue (#4a6a8a), dark blue (#1a2a4a), pale teal (#80e0ff), pale yellow (#ffff80). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Pops out of a random hole. Water jet in a line. Only out for 2 s.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## gnat_caller.core.s

Gnat Caller · Idle, Move, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Gnat Caller — Hunched swamp hermit with a jar of gnats. Main colours: muted orange (#8a7a5a), dark brown (#4a4030), pale red (#ff8080), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps away. Releases homing gnat swarms. Weak.
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

## gnat_caller.fb

Gnat Caller · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, gnat_caller.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Gnat Caller — Hunched swamp hermit with a jar of gnats. Main colours: muted orange (#8a7a5a), dark brown (#4a4030), pale red (#ff8080), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps away. Releases homing gnat swarms. Weak.
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

## gnat_caller.extra.s

Gnat Caller · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, gnat_caller.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Gnat Caller — Hunched swamp hermit with a jar of gnats. Main colours: muted orange (#8a7a5a), dark brown (#4a4030), pale red (#ff8080), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps away. Releases homing gnat swarms. Weak.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## lantern_thrower.core.s

Bog Lantern Thrower · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Bog Lantern Thrower — Goblin marsh-lighter with a crate of lanterns. Main colours: muted brown (#5a4a3a), dark grey (#2a2018), orange (#ffd070), orange (#ffb040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stays near marsh gas pockets. Throws lit lanterns — gas pockets explode. Afraid of water.
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

## lantern_thrower.fb

Bog Lantern Thrower · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, lantern_thrower.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bog Lantern Thrower — Goblin marsh-lighter with a crate of lanterns. Main colours: muted brown (#5a4a3a), dark grey (#2a2018), orange (#ffd070), orange (#ffb040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stays near marsh gas pockets. Throws lit lanterns — gas pockets explode. Afraid of water.
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

## lantern_thrower.extra.s

Bog Lantern Thrower · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, lantern_thrower.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bog Lantern Thrower — Goblin marsh-lighter with a crate of lanterns. Main colours: muted brown (#5a4a3a), dark grey (#2a2018), orange (#ffd070), orange (#ffb040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stays near marsh gas pockets. Throws lit lanterns — gas pockets explode. Afraid of water.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## swamp_witch.core.s

Swamp Witch · Idle, Move, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Swamp Witch — Green-skinned witch with a bubbling cauldron. Main colours: muted green (#7a9a60), dark grey (#3a4a3a), green (#80ff60), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Orbits the room (existing). Flame spells (existing) + cauldron spawns frogs. Cauldron shield while brewing.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: basic attack.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## swamp_witch.fb

Swamp Witch · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, swamp_witch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Swamp Witch — Green-skinned witch with a bubbling cauldron. Main colours: muted green (#7a9a60), dark grey (#3a4a3a), green (#80ff60), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Orbits the room (existing). Flame spells (existing) + cauldron spawns frogs. Cauldron shield while brewing.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## swamp_witch.extra.s

Swamp Witch · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, swamp_witch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Swamp Witch — Green-skinned witch with a bubbling cauldron. Main colours: muted green (#7a9a60), dark grey (#3a4a3a), green (#80ff60), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Orbits the room (existing). Flame spells (existing) + cauldron spawns frogs. Cauldron shield while brewing.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## tide_caller.core.s

Tide Caller · Rooted idle, Ranged attack, Hurt, Cast · 7 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Tide Caller — Robed priest with a conch-shell staff. Main colours: blue (#8ab0d0), blue (#2a4a7a), pale teal (#80e0ff), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stands on a dais. Raises the water: the whole floor floods (slow) every 10 s. Dais is dry — get up there.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. rooted in place, calm — used for: still.
2. rooted in place, swaying or pulsing slightly.
3. ranged wind-up: aiming, the shot held ready — used for: shoot.
4. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
5. hurt: flinching backward, eyes shut, a few white impact sparks.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: cloud.
7. casting release: energy bursting outward from the body in a ring of light.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## tide_caller.fb

Tide Caller · Front and back: idle, steps, main attack · 4 poses, 4 × 1 · 1536x1024 · core

Attach: style_hero, style_centaur, tide_caller.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Tide Caller — Robed priest with a conch-shell staff. Main colours: blue (#8ab0d0), blue (#2a4a7a), pale teal (#80e0ff), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stands on a dais. Raises the water: the whole floor floods (slow) every 10 s. Dais is dry — get up there.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, rooted in place, calm — used for: still.
2. seen from the FRONT, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
3. seen from BEHIND, rooted in place, calm — used for: still.
4. seen from BEHIND, ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## tide_caller.extra.s

Tide Caller · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, tide_caller.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Tide Caller — Robed priest with a conch-shell staff. Main colours: blue (#8ab0d0), blue (#2a4a7a), pale teal (#80e0ff), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Stands on a dais. Raises the water: the whole floor floods (slow) every 10 s. Dais is dry — get up there.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## mist_weaver.core.s

Mist Weaver · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Mist Weaver — Veiled sorceress trailing fog. Main colours: white (#d0e0e0), muted teal (#6a8888), white (#e0f0f0), pale teal (#80ffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Hides in her own fog. Makes 3 mist clones that each cast weak bolts. Clones pop in 1 hit.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
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

## mist_weaver.fb

Mist Weaver · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mist_weaver.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mist Weaver — Veiled sorceress trailing fog. Main colours: white (#d0e0e0), muted teal (#6a8888), white (#e0f0f0), pale teal (#80ffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Hides in her own fog. Makes 3 mist clones that each cast weak bolts. Clones pop in 1 hit.
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

## mist_weaver.extra.s

Mist Weaver · Cast, Blink, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mist_weaver.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mist Weaver — Veiled sorceress trailing fog. Main colours: white (#d0e0e0), muted teal (#6a8888), white (#e0f0f0), pale teal (#80ffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Hides in her own fog. Makes 3 mist clones that each cast weak bolts. Clones pop in 1 hit.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: summon.
2. casting release: energy bursting outward from the body in a ring of light.
3. blink out: body breaking up into glowing teal motes — used for: blink.
4. blink in: body re-forming out of glowing motes.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## moon_moth_mage.core.q

Moon Moth Mage · Idle, Move, Beam, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Moon Moth Mage — Huge pale moth with a crescent on its wings. Main colours: pale blue (#e0e0ff), muted blue (#6a6aa0), pale blue (#c0c0ff), white (#ffffff). Size: about 0.55× the height of the hero.
How it behaves in the game (for the poses): Flutters high. Moonbeams that follow your path with a delay. Only hittable when it lands.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: orbit.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. beam charge: bracing, a bright point of light building — used for: beam.
7. beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## moon_moth_mage.extra.q

Moon Moth Mage · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, moon_moth_mage.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Moon Moth Mage — Huge pale moth with a crescent on its wings. Main colours: pale blue (#e0e0ff), muted blue (#6a6aa0), pale blue (#c0c0ff), white (#ffffff). Size: about 0.55× the height of the hero.
How it behaves in the game (for the poses): Flutters high. Moonbeams that follow your path with a delay. Only hittable when it lands.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## hex_toad.core.q

Hex Toad · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Hex Toad — Big warty purple toad wearing a tiny crown. Main colours: muted violet (#6a4a8a), dark violet (#3a2a4a), pale violet (#c080ff), yellow (#ffe040). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Hops. Curse: turns you into a frog for 3 s (weak hop attack only). Tongue parries.
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

## hex_toad.extra.q

Hex Toad · Grab, Leap, Death · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, hex_toad.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Hex Toad — Big warty purple toad wearing a tiny crown. Main colours: muted violet (#6a4a8a), dark violet (#3a2a4a), pale violet (#c080ff), yellow (#ffe040). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Hops. Curse: turns you into a frog for 3 s (weak hop attack only). Tongue parries.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. grab reach: limbs / tongue / tendrils shooting forward — used for: pull.
2. grab hold: clenched shut, pulling back.
3. leap crouch: squashed down before the jump — used for: leap.
4. leap: in the air, limbs tucked.
5. leap landing: squashed on impact.
6. death frame 1: buckling, losing balance.
7. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## rain_spirit.core.q

Rain Spirit · Idle, Hover, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Rain Spirit — A small grumpy raincloud with a face. Main colours: pale blue (#a0c0e0), muted blue (#4a6a8a), pale blue (#80c0ff), white (#ffffff). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Floats above you. Lightning strike if you stand still > 1.5 s. Hard to hit (it is above you).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: hover.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: strike.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## rain_spirit.extra.q

Rain Spirit · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, rain_spirit.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Rain Spirit — A small grumpy raincloud with a face. Main colours: pale blue (#a0c0e0), muted blue (#4a6a8a), pale blue (#80c0ff), white (#ffffff). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Floats above you. Lightning strike if you stand still > 1.5 s. Hard to hit (it is above you).
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## reflecting_nymph.core.s

Reflecting Nymph · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Reflecting Nymph — Water nymph with a mirror-like skin. Main colours: pale teal (#c0f0ff), muted teal (#5a8aa0), white (#ffffff), blue (#3060ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides between mirrors. Reflects all projectiles back. Only melee hurts her.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
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

## reflecting_nymph.fb

Reflecting Nymph · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, reflecting_nymph.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Reflecting Nymph — Water nymph with a mirror-like skin. Main colours: pale teal (#c0f0ff), muted teal (#5a8aa0), white (#ffffff), blue (#3060ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides between mirrors. Reflects all projectiles back. Only melee hurts her.
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

## reflecting_nymph.extra.s

Reflecting Nymph · Blink, Guard, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, reflecting_nymph.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Reflecting Nymph — Water nymph with a mirror-like skin. Main colours: pale teal (#c0f0ff), muted teal (#5a8aa0), white (#ffffff), blue (#3060ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides between mirrors. Reflects all projectiles back. Only melee hurts her.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. blink out: body breaking up into glowing teal motes — used for: blink.
2. blink in: body re-forming out of glowing motes.
3. guarding: shield / shell / armour plates raised in front, braced — used for: reflect.
4. guard hit: recoiling slightly as a blow glances off, sparks.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## leech_warlock.core.s

Leech Warlock · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Leech Warlock — Pallid warlock with a leech-crowned staff. Main colours: muted magenta (#5a3a4a), dark grey (#2a1a28), red (#c04060), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps distance. Life-drain tether beam (heals him). Breaks line-of-sight tethers.
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

## leech_warlock.fb

Leech Warlock · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, leech_warlock.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Leech Warlock — Pallid warlock with a leech-crowned staff. Main colours: muted magenta (#5a3a4a), dark grey (#2a1a28), red (#c04060), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps distance. Life-drain tether beam (heals him). Breaks line-of-sight tethers.
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

## leech_warlock.extra.s

Leech Warlock · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, leech_warlock.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Leech Warlock — Pallid warlock with a leech-crowned staff. Main colours: muted magenta (#5a3a4a), dark grey (#2a1a28), red (#c04060), red (#ff3030). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps distance. Life-drain tether beam (heals him). Breaks line-of-sight tethers.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: drain.
2. casting release: energy bursting outward from the body in a ring of light.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bubble_siren.core.s

Bubble Siren · Idle, Hover, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Bubble Siren — Mermaid-like siren on a floating bubble. Main colours: teal (#80d0c0), teal (#2a6a6a), pale teal (#e0fff8), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Floats. Song: pulls you toward her; bubbles trap you. Bubble shield.
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

## bubble_siren.fb

Bubble Siren · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, bubble_siren.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bubble Siren — Mermaid-like siren on a floating bubble. Main colours: teal (#80d0c0), teal (#2a6a6a), pale teal (#e0fff8), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Floats. Song: pulls you toward her; bubbles trap you. Bubble shield.
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

## bubble_siren.extra.s

Bubble Siren · Disguise / ambush, Guard, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, bubble_siren.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bubble Siren — Mermaid-like siren on a floating bubble. Main colours: teal (#80d0c0), teal (#2a6a6a), pale teal (#e0fff8), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Floats. Song: pulls you toward her; bubbles trap you. Bubble shield.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. disguised / hidden form: looks like an ordinary harmless object or plant, eyes shut — used for: lure.
2. reveal: springing out of the disguise, eyes snapping open.
3. guarding: shield / shell / armour plates raised in front, braced — used for: bubble.
4. guard hit: recoiling slightly as a blow glances off, sparks.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## lily_oracle.core.q

Lily Oracle · Rooted idle, Cast, Hurt, Guard · 7 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Lily Oracle — A giant glowing lily with a face in its bloom. Main colours: green (#3a8a6a), dark teal (#1a4a3a), pale orange (#ffd27a), white (#ffffff). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Stationary. Marks tiles that will be struck 2 s later (in a pattern). Only hittable after each strike.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. rooted in place, calm — used for: still.
2. rooted in place, swaying or pulsing slightly.
3. casting wind-up: gathering glowing energy, arms / antennae raised — used for: marks.
4. casting release: energy bursting outward from the body in a ring of light.
5. hurt: flinching backward, eyes shut, a few white impact sparks.
6. guarding: shield / shell / armour plates raised in front, braced — used for: bubble.
7. guard hit: recoiling slightly as a blow glances off, sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## lily_oracle.extra.q

Lily Oracle · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, lily_oracle.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Lily Oracle — A giant glowing lily with a face in its bloom. Main colours: green (#3a8a6a), dark teal (#1a4a3a), pale orange (#ffd27a), white (#ffffff). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Stationary. Marks tiles that will be struck 2 s later (in a pattern). Only hittable after each strike.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mire_shaman.core.s

Mire Shaman · Idle, Move, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Mire Shaman — Masked lizard shaman in reed robes. Main colours: muted brown (#6a5a3a), dark brown (#3a2a18), green (#80c060), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Runs between totems. Places totems: slow totem, heal totem, spit totem. Weak alone.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: summon, cloud, heal.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mire_shaman.fb

Mire Shaman · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mire_shaman.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mire Shaman — Masked lizard shaman in reed robes. Main colours: muted brown (#6a5a3a), dark brown (#3a2a18), green (#80c060), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Runs between totems. Places totems: slow totem, heal totem, spit totem. Weak alone.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mire_shaman.extra.s

Mire Shaman · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, mire_shaman.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mire Shaman — Masked lizard shaman in reed robes. Main colours: muted brown (#6a5a3a), dark brown (#3a2a18), green (#80c060), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Runs between totems. Places totems: slow totem, heal totem, spit totem. Weak alone.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## coral_enchantress.core.s

Coral Enchantress · Idle, Hover, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Coral Enchantress — Coral-crowned sorceress. Main colours: pale red (#f0a0a0), red (#8a3a4a), pale red (#ffc0c0), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides. Grows coral walls that reshape the room. Walls block her own spells too.
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

## coral_enchantress.fb

Coral Enchantress · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, coral_enchantress.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Coral Enchantress — Coral-crowned sorceress. Main colours: pale red (#f0a0a0), red (#8a3a4a), pale red (#ffc0c0), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides. Grows coral walls that reshape the room. Walls block her own spells too.
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

## coral_enchantress.extra.s

Coral Enchantress · Cast, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, coral_enchantress.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Coral Enchantress — Coral-crowned sorceress. Main colours: pale red (#f0a0a0), red (#8a3a4a), pale red (#ffc0c0), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides. Grows coral walls that reshape the room. Walls block her own spells too.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. casting wind-up: gathering glowing energy, arms / antennae raised — used for: wall.
2. casting release: energy bursting outward from the body in a ring of light.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## water_elemental.core.q

Water Elemental · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Water Elemental — A walking wave with a glowing core. Main colours: blue (#60a0e0), blue (#2a5a9a), pale blue (#c0e8ff), white (#ffffff). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Flows toward you. Crashing wave slam with knockback. Splits into puddles when hit; they reform.
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

## water_elemental.extra.q

Water Elemental · Hurt, Split copy, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, water_elemental.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Water Elemental — A walking wave with a glowing core. Main colours: blue (#60a0e0), blue (#2a5a9a), pale blue (#c0e8ff), white (#ffffff). Size: about 0.7× the height of the hero.
How it behaves in the game (for the poses): Flows toward you. Crashing wave slam with knockback. Splits into puddles when hit; they reform.
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

## frost_lotus.core.s

Frost-lotus Priestess · Idle, Move, Beam, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Frost-lotus Priestess — Priestess with a frozen lotus on her staff. Main colours: pale blue (#e0f0ff), muted blue (#6a8ab0), pale teal (#a0e0ff), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides over ice. Freezes water into slippery ice; ice lances. Ice shield.
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

## frost_lotus.fb

Frost-lotus Priestess · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, frost_lotus.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Frost-lotus Priestess — Priestess with a frozen lotus on her staff. Main colours: pale blue (#e0f0ff), muted blue (#6a8ab0), pale teal (#a0e0ff), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides over ice. Freezes water into slippery ice; ice lances. Ice shield.
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

## frost_lotus.extra.s

Frost-lotus Priestess · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, frost_lotus.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Frost-lotus Priestess — Priestess with a frozen lotus on her staff. Main colours: pale blue (#e0f0ff), muted blue (#6a8ab0), pale teal (#a0e0ff), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Glides over ice. Freezes water into slippery ice; ice lances. Ice shield.
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

## kelp_wraith.core.s

Kelp Wraith · Idle, Hover, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Kelp Wraith — Ghost wrapped in dripping kelp. Main colours: muted green (#3a6a4a), dark green (#1a3a28), pale green (#80ffa0), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Drifts. Kelp tentacles grab you from the floor. Intangible while tentacles are out.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: drift.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: marks.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## kelp_wraith.fb

Kelp Wraith · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, kelp_wraith.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Kelp Wraith — Ghost wrapped in dripping kelp. Main colours: muted green (#3a6a4a), dark green (#1a3a28), pale green (#80ffa0), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Drifts. Kelp tentacles grab you from the floor. Intangible while tentacles are out.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## kelp_wraith.extra.s

Kelp Wraith · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, kelp_wraith.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Kelp Wraith — Ghost wrapped in dripping kelp. Main colours: muted green (#3a6a4a), dark green (#1a3a28), pale green (#80ffa0), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Drifts. Kelp tentacles grab you from the floor. Intangible while tentacles are out.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: bubble.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## rune_eels.core.q

Rune Eel Familiars · Idle, Move, Melee attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Rune Eel Familiars — Two little glowing eels orbiting a caster. Main colours: teal (#4a8aa0), dark teal (#1a4a5a), pale teal (#7fe8ff), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Orbit their master. Shield their master; zap you when close. Weak.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: orbit.
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

## rune_eels.extra.q

Rune Eel Familiars · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, rune_eels.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Rune Eel Familiars — Two little glowing eels orbiting a caster. Main colours: teal (#4a8aa0), dark teal (#1a4a5a), pale teal (#7fe8ff), white (#ffffff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Orbit their master. Shield their master; zap you when close. Weak.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## glass_jelly.core.q

Glass Jellyfish · Idle, Hover, Cast, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Glass Jellyfish — Floating see-through jellyfish. Main colours: pale blue (#c0e8ff), blue (#6a9ac0), pale teal (#a0f0ff), white (#ffffff). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Drift in slow currents. Electric pulse ring. Passive until touched.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. hovering, body tilted slightly forward — used for: drift.
3. hover cycle frame 2: bobbing up, wings / trails spread.
4. hover cycle frame 3: level, drifting.
5. hover cycle frame 4: bobbing down, wings / trails folded.
6. casting wind-up: gathering glowing energy, arms / antennae raised — used for: ring, aura.
7. casting release: energy bursting outward from the body in a ring of light.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## glass_jelly.extra.q

Glass Jellyfish · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, glass_jelly.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Glass Jellyfish — Floating see-through jellyfish. Main colours: pale blue (#c0e8ff), blue (#6a9ac0), pale teal (#a0f0ff), white (#ffffff). Size: about 0.5× the height of the hero (tiny).
How it behaves in the game (for the poses): Drift in slow currents. Electric pulse ring. Passive until touched.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## plague_alchemist.core.s

Plague Alchemist · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Plague Alchemist — Beak-masked alchemist with a belt of potions. Main colours: dark grey (#3a3a3a), black (#1a1a1a), green (#80ff60), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps distance. Throws random potions: poison, slow, fire or… heal (you). Drinks a shield potion at half HP.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: lob, lob.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## plague_alchemist.fb

Plague Alchemist · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, plague_alchemist.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Plague Alchemist — Beak-masked alchemist with a belt of potions. Main colours: dark grey (#3a3a3a), black (#1a1a1a), green (#80ff60), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps distance. Throws random potions: poison, slow, fire or… heal (you). Drinks a shield potion at half HP.
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

## plague_alchemist.extra.s

Plague Alchemist · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, plague_alchemist.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Plague Alchemist — Beak-masked alchemist with a belt of potions. Main colours: dark grey (#3a3a3a), black (#1a1a1a), green (#80ff60), yellow (#ffe040). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps distance. Throws random potions: poison, slow, fire or… heal (you). Drinks a shield potion at half HP.
Layout: exactly 4 poses in a grid of 4 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. guarding: shield / shell / armour plates raised in front, braced — used for: bubble.
2. guard hit: recoiling slightly as a blow glances off, sparks.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## storm_heron.core.q

Storm Heron Spirit · Idle, Move, Lunge, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Storm Heron Spirit — Spectral heron crackling with lightning. Main colours: pale blue (#d0e0ff), muted blue (#5a6a9a), pale yellow (#ffff80), white (#ffffff). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Circles. Dive-bombs trailing lightning. Intangible except when diving.
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

## storm_heron.extra.q

Storm Heron Spirit · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, storm_heron.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Storm Heron Spirit — Spectral heron crackling with lightning. Main colours: pale blue (#d0e0ff), muted blue (#5a6a9a), pale yellow (#ffff80), white (#ffffff). Size: about 0.8× the height of the hero.
How it behaves in the game (for the poses): Circles. Dive-bombs trailing lightning. Intangible except when diving.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bell_ringer.core.s

Drowned Bell-ringer · Rooted idle, Cast, Hurt, Guard · 7 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Drowned Bell-ringer — Ghost of a drowned priest with a huge bell. Main colours: muted teal (#8aa0a0), dark teal (#3a4a50), yellow (#e8c040), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Stays in the belfry. Each toll damages everyone not behind cover. Invulnerable while ringing.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. rooted in place, calm — used for: still.
2. rooted in place, swaying or pulsing slightly.
3. casting wind-up: gathering glowing energy, arms / antennae raised — used for: ring.
4. casting release: energy bursting outward from the body in a ring of light.
5. hurt: flinching backward, eyes shut, a few white impact sparks.
6. guarding: shield / shell / armour plates raised in front, braced — used for: bubble.
7. guard hit: recoiling slightly as a blow glances off, sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bell_ringer.fb

Drowned Bell-ringer · Front and back: idle, steps, main attack · 4 poses, 4 × 1 · 1536x1024 · core

Attach: style_hero, style_centaur, bell_ringer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Drowned Bell-ringer — Ghost of a drowned priest with a huge bell. Main colours: muted teal (#8aa0a0), dark teal (#3a4a50), yellow (#e8c040), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Stays in the belfry. Each toll damages everyone not behind cover. Invulnerable while ringing.
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

## bell_ringer.extra.s

Drowned Bell-ringer · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, bell_ringer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Drowned Bell-ringer — Ghost of a drowned priest with a huge bell. Main colours: muted teal (#8aa0a0), dark teal (#3a4a50), yellow (#e8c040), white (#ffffff). Size: about 1.1× the height of the hero.
How it behaves in the game (for the poses): Stays in the belfry. Each toll damages everyone not behind cover. Invulnerable while ringing.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## fairy_rain_sprite.core.q

Rain Sprite · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Rain Sprite — Brings a tiny rain cloud wherever she goes. Main colours: pale blue (#80b0ff), pale blue (#d0e8ff). Size: about 0.4× the height of the hero (tiny).
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

## fairy_lotus_maiden.core.q

Lotus Maiden · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Lotus Maiden — Blooms from a pink lotus; her hair flows like water. Main colours: pale magenta (#ff90c0), pale magenta (#ffd0e8). Size: about 0.4× the height of the hero (tiny).
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

## fairy_frog_prince_fae.core.q

Frog Prince · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Frog Prince — A crowned fairy prince on his loyal frog steed. Main colours: muted green (#50a050), pale teal (#c0fff0). Size: about 0.4× the height of the hero (tiny).
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## fairy_jelly_drifter.core.q

Jelly Drifter · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Jelly Drifter — A glowing jellyfish-fairy that swims through the air, trailing tentacles. Main colours: teal (#60d0e0), white (#ffffff). Size: about 0.4× the height of the hero (tiny).
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

## fairy_kingfisher_scout.core.q

Kingfisher Scout · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Kingfisher Scout — Electric-blue feather wings and a tiny bow; never misses. Main colours: blue (#2080d0), blue (#40a0ff). Size: about 0.4× the height of the hero (tiny).
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

## monarch_mere_queen.core.q

Nerissa, Queen of the Mere · Hover, Talk, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Nerissa, Queen of the Mere — A queen of living water: four translucent fin-wings, a lily crown and a coral trident. Her robe pours away into mist. Main colours: teal (#3aa0b0), pale teal (#80e0ff), pale teal (#80f0ff). Size: about 1.2× the height of the hero.
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

## animal_frog.core.q

Marsh Frog · Idle, Move · 6 poses, 3 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Marsh Frog — A plump green marsh frog with yellow eyes.  Size: about 0.3× the height of the hero (tiny).
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing — used for: wanders, and flees when you come close.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## animal_heron.core.q

Heron · Idle, Move · 6 poses, 3 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Heron — A tall grey-blue heron with a long neck and yellow beak.  Size: about 0.7× the height of the hero.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing — used for: wanders, and flees when you come close.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## animal_crocodile.core.q

Crocodile · Idle, Move, Melee attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Crocodile — A long low green crocodile with a ridged back and a pale jaw.  Size: about 1.3× the height of the hero.
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

## animal_swamp_bear.core.q

Swamp Bear · Idle, Move, Melee attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Swamp Bear — A heavy dark-brown bear with moss on its shoulders and wet fur.  Size: about 1.5× the height of the hero.
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
