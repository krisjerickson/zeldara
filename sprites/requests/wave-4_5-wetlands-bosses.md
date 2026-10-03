# Wetlands bosses — 45 requests

Save each result as `sprites/incoming/<request id>.png`.

## boss_swamp_witch.core.s

Granny Greenteeth, the Swamp Witch · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Granny Greenteeth, the Swamp Witch — A crone of the fens with a will-o'-wisp lantern. She circles you across the water, cackling. Details: head: face, gear: witch, weapon: staff, off: lantern, armor: rags, cape: rags, build: lean. Main colours: dark green (#3a5a2a), dark green (#1a2a12), olive (#8a7a40), green (#a0ff60). Size: about 2.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Circles you and hurls green bog-flame.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: basic attack.
8. casting release: energy bursting outward from the body in a ring of light.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## boss_swamp_witch.fb

Granny Greenteeth, the Swamp Witch · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, boss_swamp_witch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Granny Greenteeth, the Swamp Witch — A crone of the fens with a will-o'-wisp lantern. She circles you across the water, cackling. Details: head: face, gear: witch, weapon: staff, off: lantern, armor: rags, cape: rags, build: lean. Main colours: dark green (#3a5a2a), dark green (#1a2a12), olive (#8a7a40), green (#a0ff60). Size: about 2.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Circles you and hurls green bog-flame.
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

## boss_swamp_witch.extra.s

Granny Greenteeth, the Swamp Witch · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_swamp_witch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Granny Greenteeth, the Swamp Witch — A crone of the fens with a will-o'-wisp lantern. She circles you across the water, cackling. Details: head: face, gear: witch, weapon: staff, off: lantern, armor: rags, cape: rags, build: lean. Main colours: dark green (#3a5a2a), dark green (#1a2a12), olive (#8a7a40), green (#a0ff60). Size: about 2.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Circles you and hurls green bog-flame.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
3. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
4. transformation: bursting upward in a pillar of light, new shape forming.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## bf_swamp_witch_2.core.s

Greenteeth, the Hag of the Hut · Idle, Move, Ranged attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Greenteeth, the Hag of the Hut — A giant hag grown half into the bog itself, walking on roots like a hut on legs. Details: head: face, gear: witch, weapon: staff, off: lantern, armor: bark, build: giant. Main colours: dark green (#3a5a2a), dark green (#1a2a12), olive (#8a7a40), green (#a0ff60). Size: about 3.8× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Poison clouds, lobbed brew and bog frogs; a ✨ ward only spells break.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. ranged wind-up: aiming, the shot held ready — used for: lob.
8. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## bf_swamp_witch_2.fb

Greenteeth, the Hag of the Hut · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, bf_swamp_witch_2.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Greenteeth, the Hag of the Hut — A giant hag grown half into the bog itself, walking on roots like a hut on legs. Details: head: face, gear: witch, weapon: staff, off: lantern, armor: bark, build: giant. Main colours: dark green (#3a5a2a), dark green (#1a2a12), olive (#8a7a40), green (#a0ff60). Size: about 3.8× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Poison clouds, lobbed brew and bog frogs; a ✨ ward only spells break.
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

## bf_swamp_witch_2.extra.s

Greenteeth, the Hag of the Hut · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, bf_swamp_witch_2.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Greenteeth, the Hag of the Hut — A giant hag grown half into the bog itself, walking on roots like a hut on legs. Details: head: face, gear: witch, weapon: staff, off: lantern, armor: bark, build: giant. Main colours: dark green (#3a5a2a), dark green (#1a2a12), olive (#8a7a40), green (#a0ff60). Size: about 3.8× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Poison clouds, lobbed brew and bog frogs; a ✨ ward only spells break.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. casting wind-up: gathering glowing energy, arms / antennae raised — used for: cloud, summon.
3. casting release: energy bursting outward from the body in a ring of light.
4. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
5. transformation: doubled over, cracks of light breaking through the body — used for: arrives in this form.
6. transformation: bursting upward in a pillar of light, new shape forming.
7. death frame 1: buckling, losing balance.
8. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## bf_swamp_witch_3.core.q

Greenteeth, the Mire Hydra · Idle, Move · 6 poses, 3 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Greenteeth, the Mire Hydra — The witch sinks into the mire and rises as a hydra — still wearing that crooked hat. Main colours: dark green (#3a5a2a), black (#10200e), olive (#8a7a40), green (#a0ff60). Size: about 4.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Leaps, tongue-pulls you in, drains life, calls leeches; ✨ ward and 🏹 guard.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## bf_swamp_witch_3.extra.q

Greenteeth, the Mire Hydra · Slam, Hurt, Grab, Cast · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, bf_swamp_witch_3.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Greenteeth, the Mire Hydra — The witch sinks into the mire and rises as a hydra — still wearing that crooked hat. Main colours: dark green (#3a5a2a), black (#10200e), olive (#8a7a40), green (#a0ff60). Size: about 4.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Leaps, tongue-pulls you in, drains life, calls leeches; ✨ ward and 🏹 guard.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. slam wind-up: rearing up, weapon or fists raised high overhead — used for: slam.
2. slam impact: crashing down into the ground, body compressed.
3. slam recover: pushing back up, off balance.
4. hurt: flinching backward, eyes shut, a few white impact sparks.
5. grab reach: limbs / tongue / tendrils shooting forward — used for: pull.
6. grab hold: clenched shut, pulling back.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: drain, summon.
8. casting release: energy bursting outward from the body in a ring of light.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## bf_swamp_witch_3.extra2.q

Greenteeth, the Mire Hydra · Leap, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, bf_swamp_witch_3.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Greenteeth, the Mire Hydra — The witch sinks into the mire and rises as a hydra — still wearing that crooked hat. Main colours: dark green (#3a5a2a), black (#10200e), olive (#8a7a40), green (#a0ff60). Size: about 4.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Leaps, tongue-pulls you in, drains life, calls leeches; ✨ ward and 🏹 guard.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. leap crouch: squashed down before the jump — used for: leap.
2. leap: in the air, limbs tucked.
3. leap landing: squashed on impact.
4. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
5. transformation: doubled over, cracks of light breaking through the body — used for: arrives in this form.
6. transformation: bursting upward in a pillar of light, new shape forming.
7. death frame 1: buckling, losing balance.
8. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## boss_storm_mage.core.s

Tharnwald, the Storm Mage · Idle, Move, Beam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Tharnwald, the Storm Mage — Wild white hair standing on end, lightning in both hands, never where you last saw him. Details: head: face, weapon: none, off: orb, armor: robe, cape: long, build: lean. Main colours: blue (#2a4a9a), dark blue (#0a1a4a), pale blue (#e0e8ff), pale yellow (#fff080). Size: about 2.8× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Strafes and calls lightning bolts.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. beam charge: bracing, a bright point of light building — used for: basic attack.
8. beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_storm_mage.fb

Tharnwald, the Storm Mage · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, boss_storm_mage.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Tharnwald, the Storm Mage — Wild white hair standing on end, lightning in both hands, never where you last saw him. Details: head: face, weapon: none, off: orb, armor: robe, cape: long, build: lean. Main colours: blue (#2a4a9a), dark blue (#0a1a4a), pale blue (#e0e8ff), pale yellow (#fff080). Size: about 2.8× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Strafes and calls lightning bolts.
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

## boss_storm_mage.extra.s

Tharnwald, the Storm Mage · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_storm_mage.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Tharnwald, the Storm Mage — Wild white hair standing on end, lightning in both hands, never where you last saw him. Details: head: face, weapon: none, off: orb, armor: robe, cape: long, build: lean. Main colours: blue (#2a4a9a), dark blue (#0a1a4a), pale blue (#e0e8ff), pale yellow (#fff080). Size: about 2.8× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Strafes and calls lightning bolts.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. casting wind-up: gathering glowing energy, arms / antennae raised — used for: attack patterns (rain, walls, bursts).
3. casting release: energy bursting outward from the body in a ring of light.
4. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
5. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
6. transformation: bursting upward in a pillar of light, new shape forming.
7. death frame 1: buckling, losing balance.
8. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bf_storm_mage_2.core.s

Tharnwald, the Tempest Mage · Idle, Move, Ranged attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Tharnwald, the Tempest Mage — Borne up on wings of storm cloud, crackling through the rafters faster than the eye can follow. Details: head: face, gear: wizard, weapon: staff, off: orb, armor: robe, cape: long. Main colours: blue (#2a4a9a), dark blue (#0a1a4a), pale blue (#e0e8ff), pale yellow (#fff080). Size: about 3.7× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Lightning beams, gusts that shove you to the edge; 🏹 guard only arrows break.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. ranged wind-up: aiming, the shot held ready — used for: shoot.
8. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bf_storm_mage_2.fb

Tharnwald, the Tempest Mage · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, bf_storm_mage_2.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Tharnwald, the Tempest Mage — Borne up on wings of storm cloud, crackling through the rafters faster than the eye can follow. Details: head: face, gear: wizard, weapon: staff, off: orb, armor: robe, cape: long. Main colours: blue (#2a4a9a), dark blue (#0a1a4a), pale blue (#e0e8ff), pale yellow (#fff080). Size: about 3.7× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Lightning beams, gusts that shove you to the edge; 🏹 guard only arrows break.
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

## bf_storm_mage_2.extra.s

Tharnwald, the Tempest Mage · Hurt, Beam, Cast, Enrage, Phase change, Death · 10 poses, 5 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, bf_storm_mage_2.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Tharnwald, the Tempest Mage — Borne up on wings of storm cloud, crackling through the rafters faster than the eye can follow. Details: head: face, gear: wizard, weapon: staff, off: orb, armor: robe, cape: long. Main colours: blue (#2a4a9a), dark blue (#0a1a4a), pale blue (#e0e8ff), pale yellow (#fff080). Size: about 3.7× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Lightning beams, gusts that shove you to the edge; 🏹 guard only arrows break.
Layout: exactly 10 poses in a grid of 5 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. beam charge: bracing, a bright point of light building — used for: beam.
3. beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
4. casting wind-up: gathering glowing energy, arms / antennae raised — used for: gust, summon.
5. casting release: energy bursting outward from the body in a ring of light.
6. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
7. transformation: doubled over, cracks of light breaking through the body — used for: arrives in this form.
8. transformation: bursting upward in a pillar of light, new shape forming.
9. death frame 1: buckling, losing balance.
10. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bf_storm_mage_3.core.s

Tharnwald Unbound, the Storm Giant · Idle, Hover, Beam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Tharnwald Unbound, the Storm Giant — Tharnwald unbound: a storm giant with the mage's white beard, blue robes and storm orb, a thunder-hammer in his fist. Details: head: face, gear: hornhelm, weapon: hammer, off: orb, armor: crystal, cape: long, build: giant. Main colours: blue (#2a4a9a), dark blue (#0a1a4a), pale blue (#e0e8ff), pale yellow (#fff080). Size: about 5.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Gapped lightning rings, strikes if you stand still, storm sprites; ✨ ward.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. hovering, body tilted slightly forward — used for: hover.
4. hover cycle frame 2: bobbing up, wings / trails spread.
5. hover cycle frame 3: level, drifting.
6. hover cycle frame 4: bobbing down, wings / trails folded.
7. beam charge: bracing, a bright point of light building — used for: beam.
8. beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself).
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## bf_storm_mage_3.fb

Tharnwald Unbound, the Storm Giant · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, bf_storm_mage_3.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Tharnwald Unbound, the Storm Giant — Tharnwald unbound: a storm giant with the mage's white beard, blue robes and storm orb, a thunder-hammer in his fist. Details: head: face, gear: hornhelm, weapon: hammer, off: orb, armor: crystal, cape: long, build: giant. Main colours: blue (#2a4a9a), dark blue (#0a1a4a), pale blue (#e0e8ff), pale yellow (#fff080). Size: about 5.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Gapped lightning rings, strikes if you stand still, storm sprites; ✨ ward.
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

## bf_storm_mage_3.extra.s

Tharnwald Unbound, the Storm Giant · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, bf_storm_mage_3.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Tharnwald Unbound, the Storm Giant — Tharnwald unbound: a storm giant with the mage's white beard, blue robes and storm orb, a thunder-hammer in his fist. Details: head: face, gear: hornhelm, weapon: hammer, off: orb, armor: crystal, cape: long, build: giant. Main colours: blue (#2a4a9a), dark blue (#0a1a4a), pale blue (#e0e8ff), pale yellow (#fff080). Size: about 5.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Gapped lightning rings, strikes if you stand still, storm sprites; ✨ ward.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. casting wind-up: gathering glowing energy, arms / antennae raised — used for: ring, strike, summon.
3. casting release: energy bursting outward from the body in a ring of light.
4. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
5. transformation: doubled over, cracks of light breaking through the body — used for: arrives in this form.
6. transformation: bursting upward in a pillar of light, new shape forming.
7. death frame 1: buckling, losing balance.
8. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cw_lotus_naga.core.s

Nagaryn, the Lotus Naga Queen · Idle, Move, Ranged attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Nagaryn, the Lotus Naga Queen — A crowned naga with lotus-pink frills and a coral trident. Details: head: face, gear: lotus, weapon: trident, armor: robe. Main colours: teal (#40a0a0), dark teal (#1a5a5a), pale red (#f0a0c0), yellow (#ffe060). Size: about 3.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Water beams and poison spit from the pools.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. ranged wind-up: aiming, the shot held ready — used for: basic attack.
8. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cw_lotus_naga.fb

Nagaryn, the Lotus Naga Queen · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, cw_lotus_naga.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Nagaryn, the Lotus Naga Queen — A crowned naga with lotus-pink frills and a coral trident. Details: head: face, gear: lotus, weapon: trident, armor: robe. Main colours: teal (#40a0a0), dark teal (#1a5a5a), pale red (#f0a0c0), yellow (#ffe060). Size: about 3.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Water beams and poison spit from the pools.
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

## cw_lotus_naga.extra.s

Nagaryn, the Lotus Naga Queen · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, cw_lotus_naga.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Nagaryn, the Lotus Naga Queen — A crowned naga with lotus-pink frills and a coral trident. Details: head: face, gear: lotus, weapon: trident, armor: robe. Main colours: teal (#40a0a0), dark teal (#1a5a5a), pale red (#f0a0c0), yellow (#ffe060). Size: about 3.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Water beams and poison spit from the pools.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. casting wind-up: gathering glowing energy, arms / antennae raised — used for: attack patterns (rain, walls, bursts).
3. casting release: energy bursting outward from the body in a ring of light.
4. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
5. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
6. transformation: bursting upward in a pillar of light, new shape forming.
7. death frame 1: buckling, losing balance.
8. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cw_drowned_abbot.core.q

Abbot Draugmere, the Drowned · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Abbot Draugmere, the Drowned — The abbot's robes hide a nest of drowned tentacles. Main colours: muted teal (#3a6a6a), dark teal (#10282a), pale green (#c0e0d0), pale green (#80ffd0). Size: about 3.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Rings of water and summoned drowned monks.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: basic attack.
8. casting release: energy bursting outward from the body in a ring of light.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cw_drowned_abbot.extra.q

Abbot Draugmere, the Drowned · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, cw_drowned_abbot.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Abbot Draugmere, the Drowned — The abbot's robes hide a nest of drowned tentacles. Main colours: muted teal (#3a6a6a), dark teal (#10282a), pale green (#c0e0d0), pale green (#80ffd0). Size: about 3.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Rings of water and summoned drowned monks.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
3. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
4. transformation: bursting upward in a pillar of light, new shape forming.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## cw_mangrove_chief.core.s

Old Rootmarch, the Mangrove Chieftain · Idle, Move · 6 poses, 3 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Old Rootmarch, the Mangrove Chieftain — A tree-herder with a beard of moss who speaks very slowly and hits very hard. Details: head: face, weapon: staff, armor: bark, build: giant. Main colours: dark green (#4a5a30), black (#1a2410), green (#a0c060), green (#c0ff60). Size: about 4× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Root slams and vine pulls.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## cw_mangrove_chief.fb

Old Rootmarch, the Mangrove Chieftain · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, cw_mangrove_chief.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Old Rootmarch, the Mangrove Chieftain — A tree-herder with a beard of moss who speaks very slowly and hits very hard. Details: head: face, weapon: staff, armor: bark, build: giant. Main colours: dark green (#4a5a30), black (#1a2410), green (#a0c060), green (#c0ff60). Size: about 4× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Root slams and vine pulls.
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

## cw_mangrove_chief.extra.s

Old Rootmarch, the Mangrove Chieftain · Slam, Hurt, Cast, Enrage · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, cw_mangrove_chief.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Old Rootmarch, the Mangrove Chieftain — A tree-herder with a beard of moss who speaks very slowly and hits very hard. Details: head: face, weapon: staff, armor: bark, build: giant. Main colours: dark green (#4a5a30), black (#1a2410), green (#a0c060), green (#c0ff60). Size: about 4× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Root slams and vine pulls.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. slam wind-up: rearing up, weapon or fists raised high overhead — used for: basic attack.
2. slam impact: crashing down into the ground, body compressed.
3. slam recover: pushing back up, off balance.
4. hurt: flinching backward, eyes shut, a few white impact sparks.
5. casting wind-up: gathering glowing energy, arms / antennae raised — used for: attack patterns (rain, walls, bursts).
6. casting release: energy bursting outward from the body in a ring of light.
7. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## cw_mangrove_chief.extra2.s

Old Rootmarch, the Mangrove Chieftain · Phase change, Death · 4 poses, 2 × 2 · 1024x1024 · extra

Attach: style_hero, style_centaur, cw_mangrove_chief.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Old Rootmarch, the Mangrove Chieftain — A tree-herder with a beard of moss who speaks very slowly and hits very hard. Details: head: face, weapon: staff, armor: bark, build: giant. Main colours: dark green (#4a5a30), black (#1a2410), green (#a0c060), green (#c0ff60). Size: about 4× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Root slams and vine pulls.
Layout: exactly 4 poses in a grid of 2 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
2. transformation: bursting upward in a pillar of light, new shape forming.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mg_storm_caller.core.s

Voltara, the Storm Caller · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Voltara, the Storm Caller — A lightning-sorceress, hair crackling, never still. Details: head: face, off: orb, armor: robe, build: lean. Main colours: blue (#3a5aa0), dark blue (#101a40), pale blue (#e0e8ff), pale blue (#c0e0ff). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ⚡ Lightning beams · ⚡ Stand still and lightning finds you · ⚡ Spark volleys
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: basic attack.
8. casting release: energy bursting outward from the body in a ring of light.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## mg_storm_caller.fb

Voltara, the Storm Caller · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mg_storm_caller.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Voltara, the Storm Caller — A lightning-sorceress, hair crackling, never still. Details: head: face, off: orb, armor: robe, build: lean. Main colours: blue (#3a5aa0), dark blue (#101a40), pale blue (#e0e8ff), pale blue (#c0e0ff). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ⚡ Lightning beams · ⚡ Stand still and lightning finds you · ⚡ Spark volleys
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

## mg_storm_caller.extra.s

Voltara, the Storm Caller · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_storm_caller.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Voltara, the Storm Caller — A lightning-sorceress, hair crackling, never still. Details: head: face, off: orb, armor: robe, build: lean. Main colours: blue (#3a5aa0), dark blue (#101a40), pale blue (#e0e8ff), pale blue (#c0e0ff). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ⚡ Lightning beams · ⚡ Stand still and lightning finds you · ⚡ Spark volleys
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
3. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
4. transformation: bursting upward in a pillar of light, new shape forming.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## mg_shard_sorcerer.core.q

Glacius, the Shard Sorcerer · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Glacius, the Shard Sorcerer — A construct of living ice shards held together by will. Main colours: pale blue (#a0d0f0), blue (#4a7ab0), white (#ffffff), pale teal (#a0e8ff). Size: about 3.3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🧊 Turns the floor into an ice rink — you slide · ❄️ Freezing beam · 🔹 Bouncing ice shards
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: basic attack.
8. casting release: energy bursting outward from the body in a ring of light.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## mg_shard_sorcerer.extra.q

Glacius, the Shard Sorcerer · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_shard_sorcerer.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Glacius, the Shard Sorcerer — A construct of living ice shards held together by will. Main colours: pale blue (#a0d0f0), blue (#4a7ab0), white (#ffffff), pale teal (#a0e8ff). Size: about 3.3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🧊 Turns the floor into an ice rink — you slide · ❄️ Freezing beam · 🔹 Bouncing ice shards
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
3. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
4. transformation: bursting upward in a pillar of light, new shape forming.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## mg_bog_hexwitch.core.s

Mother Morrow, the Bog Hex-Witch · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Mother Morrow, the Bog Hex-Witch — A masked hex-witch who never shows her face. Details: head: plague, gear: witch, weapon: staff, armor: rags, build: lean. Main colours: dark green (#4a5a2a), black (#1a2210), muted yellow (#a09060), green (#b0ff50). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ☠️ Poison clouds · 🐸 Her hex turns you into a frog (slow, weak) · 🐸 Calls frogs to fight for her
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: basic attack.
8. casting release: energy bursting outward from the body in a ring of light.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mg_bog_hexwitch.fb

Mother Morrow, the Bog Hex-Witch · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mg_bog_hexwitch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mother Morrow, the Bog Hex-Witch — A masked hex-witch who never shows her face. Details: head: plague, gear: witch, weapon: staff, armor: rags, build: lean. Main colours: dark green (#4a5a2a), black (#1a2210), muted yellow (#a09060), green (#b0ff50). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ☠️ Poison clouds · 🐸 Her hex turns you into a frog (slow, weak) · 🐸 Calls frogs to fight for her
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

## mg_bog_hexwitch.extra.s

Mother Morrow, the Bog Hex-Witch · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_bog_hexwitch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mother Morrow, the Bog Hex-Witch — A masked hex-witch who never shows her face. Details: head: plague, gear: witch, weapon: staff, armor: rags, build: lean. Main colours: dark green (#4a5a2a), black (#1a2210), muted yellow (#a09060), green (#b0ff50). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ☠️ Poison clouds · 🐸 Her hex turns you into a frog (slow, weak) · 🐸 Calls frogs to fight for her
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
3. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
4. transformation: bursting upward in a pillar of light, new shape forming.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## mg_sea_warlock.core.s

Tidelord Marenus, the Sea-Warlock · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Tidelord Marenus, the Sea-Warlock — A sea-warlock with a beard of tentacles and a crown of coral. Details: head: face, gear: coral, weapon: trident, armor: robe. Main colours: teal (#2a6a7a), dark teal (#0a2a30), red (#ff8870), teal (#60e0ff). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌊 Waves shove you across the room · 🌊 Rings of water · 🧱 Walls of water block your path
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: basic attack.
8. casting release: energy bursting outward from the body in a ring of light.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## mg_sea_warlock.fb

Tidelord Marenus, the Sea-Warlock · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mg_sea_warlock.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Tidelord Marenus, the Sea-Warlock — A sea-warlock with a beard of tentacles and a crown of coral. Details: head: face, gear: coral, weapon: trident, armor: robe. Main colours: teal (#2a6a7a), dark teal (#0a2a30), red (#ff8870), teal (#60e0ff). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌊 Waves shove you across the room · 🌊 Rings of water · 🧱 Walls of water block your path
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

## mg_sea_warlock.extra.s

Tidelord Marenus, the Sea-Warlock · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_sea_warlock.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Tidelord Marenus, the Sea-Warlock — A sea-warlock with a beard of tentacles and a crown of coral. Details: head: face, gear: coral, weapon: trident, armor: robe. Main colours: teal (#2a6a7a), dark teal (#0a2a30), red (#ff8870), teal (#60e0ff). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌊 Waves shove you across the room · 🌊 Rings of water · 🧱 Walls of water block your path
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
3. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
4. transformation: bursting upward in a pillar of light, new shape forming.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_isl_2.core.s

Mossgut, the Swamp Titan · Idle, Move · 6 poses, 3 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Mossgut, the Swamp Titan — A swamp-giant made of rotting logs and mud. Details: head: mask, weapon: club, armor: bark, build: giant. Main colours: dark olive (#4a4a2a), black (#1a1a10), green (#80c040), green (#c0ff60). Size: about 3.9× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Stomps the ground — shockwave rings.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## boss_isl_2.fb

Mossgut, the Swamp Titan · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, boss_isl_2.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mossgut, the Swamp Titan — A swamp-giant made of rotting logs and mud. Details: head: mask, weapon: club, armor: bark, build: giant. Main colours: dark olive (#4a4a2a), black (#1a1a10), green (#80c040), green (#c0ff60). Size: about 3.9× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Stomps the ground — shockwave rings.
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

## boss_isl_2.extra.s

Mossgut, the Swamp Titan · Slam, Hurt, Cast, Enrage · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_isl_2.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mossgut, the Swamp Titan — A swamp-giant made of rotting logs and mud. Details: head: mask, weapon: club, armor: bark, build: giant. Main colours: dark olive (#4a4a2a), black (#1a1a10), green (#80c040), green (#c0ff60). Size: about 3.9× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Stomps the ground — shockwave rings.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. slam wind-up: rearing up, weapon or fists raised high overhead — used for: basic attack.
2. slam impact: crashing down into the ground, body compressed.
3. slam recover: pushing back up, off balance.
4. hurt: flinching backward, eyes shut, a few white impact sparks.
5. casting wind-up: gathering glowing energy, arms / antennae raised — used for: attack patterns (rain, walls, bursts).
6. casting release: energy bursting outward from the body in a ring of light.
7. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## boss_isl_2.extra2.s

Mossgut, the Swamp Titan · Phase change, Death · 4 poses, 2 × 2 · 1024x1024 · extra

Attach: style_hero, style_centaur, boss_isl_2.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Mossgut, the Swamp Titan — A swamp-giant made of rotting logs and mud. Details: head: mask, weapon: club, armor: bark, build: giant. Main colours: dark olive (#4a4a2a), black (#1a1a10), green (#80c040), green (#c0ff60). Size: about 3.9× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Stomps the ground — shockwave rings.
Layout: exactly 4 poses in a grid of 2 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
2. transformation: bursting upward in a pillar of light, new shape forming.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## elite_2.core.s

Bog Troll Chieftain · Idle, Move, Melee attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Bog Troll Chieftain — A troll with a moss-cloak and a tree-trunk club. Details: head: ogre, weapon: club, armor: fur, build: giant. Main colours: muted green (#5a6a3a), dark green (#2a3218), muted yellow (#a09060), green (#c0ff60). Size: about 3.5× the height of the hero (a towering boss).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: basic attack.
8. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```

## elite_2.fb

Bog Troll Chieftain · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, elite_2.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bog Troll Chieftain — A troll with a moss-cloak and a tree-trunk club. Details: head: ogre, weapon: club, armor: fur, build: giant. Main colours: muted green (#5a6a3a), dark green (#2a3218), muted yellow (#a09060), green (#c0ff60). Size: about 3.5× the height of the hero (a towering boss).
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

## elite_2.extra.s

Bog Troll Chieftain · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, elite_2.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Bog Troll Chieftain — A troll with a moss-cloak and a tree-trunk club. Details: head: ogre, weapon: club, armor: fur, build: giant. Main colours: muted green (#5a6a3a), dark green (#2a3218), muted yellow (#a09060), green (#c0ff60). Size: about 3.5× the height of the hero (a towering boss).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. casting wind-up: gathering glowing energy, arms / antennae raised — used for: attack patterns (rain, walls, bursts).
3. casting release: energy bursting outward from the body in a ring of light.
4. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
5. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
6. transformation: bursting upward in a pillar of light, new shape forming.
7. death frame 1: buckling, losing balance.
8. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid blue #0000FF background with no texture, no gradient and no checkerboard pattern.
```
