# Volcano bosses — 66 requests

Save each result as `sprites/incoming/<request id>.png`.

## mg_rime_witch.core.s

Frostwhisper, the Rime Witch · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Frostwhisper, the Rime Witch — A pale witch with a circlet of ice and a swarm of floating shards. Details: head: face, gear: icecrown, weapon: wand, off: shards, armor: crystal. Main colours: pale blue (#c0e0f8), blue (#4a7ab0), white (#ffffff), pale teal (#a0e8ff). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ❄️ Frost bolts slow you · 🧊 Rime floor — patches of ice you slide across · ✨ Blinks away when you close in
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

## mg_rime_witch.fb

Frostwhisper, the Rime Witch · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mg_rime_witch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Frostwhisper, the Rime Witch — A pale witch with a circlet of ice and a swarm of floating shards. Details: head: face, gear: icecrown, weapon: wand, off: shards, armor: crystal. Main colours: pale blue (#c0e0f8), blue (#4a7ab0), white (#ffffff), pale teal (#a0e8ff). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ❄️ Frost bolts slow you · 🧊 Rime floor — patches of ice you slide across · ✨ Blinks away when you close in
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

## mg_rime_witch.extra.s

Frostwhisper, the Rime Witch · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_rime_witch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Frostwhisper, the Rime Witch — A pale witch with a circlet of ice and a swarm of floating shards. Details: head: face, gear: icecrown, weapon: wand, off: shards, armor: crystal. Main colours: pale blue (#c0e0f8), blue (#4a7ab0), white (#ffffff), pale teal (#a0e8ff). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ❄️ Frost bolts slow you · 🧊 Rime floor — patches of ice you slide across · ✨ Blinks away when you close in
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

## mg_arcane_scribe.core.s

Magister Quillon, the Arcane Scribe · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Magister Quillon, the Arcane Scribe — A hooded librarian-wraith who is more book than man. Details: head: hood, weapon: none, off: book, armor: robe. Main colours: dark blue (#2a2a4a), black (#0a0a1a), pale blue (#c0c0ff), pale blue (#80a0ff). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 📚 Homing arcane missiles · 🪞 Mirror images — two copies of him that hit weakly · ✨ Blinks around the room
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

## mg_arcane_scribe.fb

Magister Quillon, the Arcane Scribe · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mg_arcane_scribe.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Magister Quillon, the Arcane Scribe — A hooded librarian-wraith who is more book than man. Details: head: hood, weapon: none, off: book, armor: robe. Main colours: dark blue (#2a2a4a), black (#0a0a1a), pale blue (#c0c0ff), pale blue (#80a0ff). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 📚 Homing arcane missiles · 🪞 Mirror images — two copies of him that hit weakly · ✨ Blinks around the room
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

## mg_arcane_scribe.extra.s

Magister Quillon, the Arcane Scribe · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_arcane_scribe.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Magister Quillon, the Arcane Scribe — A hooded librarian-wraith who is more book than man. Details: head: hood, weapon: none, off: book, armor: robe. Main colours: dark blue (#2a2a4a), black (#0a0a1a), pale blue (#c0c0ff), pale blue (#80a0ff). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 📚 Homing arcane missiles · 🪞 Mirror images — two copies of him that hit weakly · ✨ Blinks around the room
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

## mg_hearth_witch.core.s

Cindra, the Hearth-Witch · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Cindra, the Hearth-Witch — A red-haired hearth-witch with a staff of cooking-fire. Details: head: face, gear: witch, weapon: staff, off: flame, armor: rags. Main colours: red (#b04a2a), dark red (#4a1a0a), orange (#e0a040), orange (#ffa040). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🔥 Fireballs leave burning ground · 🔥 Rings of flame spread out from her
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

## mg_hearth_witch.fb

Cindra, the Hearth-Witch · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mg_hearth_witch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Cindra, the Hearth-Witch — A red-haired hearth-witch with a staff of cooking-fire. Details: head: face, gear: witch, weapon: staff, off: flame, armor: rags. Main colours: red (#b04a2a), dark red (#4a1a0a), orange (#e0a040), orange (#ffa040). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🔥 Fireballs leave burning ground · 🔥 Rings of flame spread out from her
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

## mg_hearth_witch.extra.s

Cindra, the Hearth-Witch · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_hearth_witch.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Cindra, the Hearth-Witch — A red-haired hearth-witch with a staff of cooking-fire. Details: head: face, gear: witch, weapon: staff, off: flame, armor: rags. Main colours: red (#b04a2a), dark red (#4a1a0a), orange (#e0a040), orange (#ffa040). Size: about 3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🔥 Fireballs leave burning ground · 🔥 Rings of flame spread out from her
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

## mg_thorn_druid.core.q

Old Bramblebeard, the Thorn Druid · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Old Bramblebeard, the Thorn Druid — The druid in his true shape: a great moss-backed stag-beast. Details: beast: behemoth. Main colours: dark brown (#5a4a2a), dark brown (#2a2010), green (#6aa04a), green (#a0ff60). Size: about 3.3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌿 Thorns root you in place · 🪢 Vines pull you to him · 💚 Slowly heals
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

## mg_thorn_druid.extra.q

Old Bramblebeard, the Thorn Druid · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_thorn_druid.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Old Bramblebeard, the Thorn Druid — The druid in his true shape: a great moss-backed stag-beast. Details: beast: behemoth. Main colours: dark brown (#5a4a2a), dark brown (#2a2010), green (#6aa04a), green (#a0ff60). Size: about 3.3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌿 Thorns root you in place · 🪢 Vines pull you to him · 💚 Slowly heals
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

## mg_storm_caller.core.s

Voltara, the Storm Caller · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
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
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
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
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
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
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
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
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
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
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
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
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
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
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
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
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
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
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
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
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
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

## mg_nova_sorceress.core.q

Pyrrhia, the Nova Sorceress · Idle, Hover, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Pyrrhia, the Nova Sorceress — She burns so bright she becomes a small, furious star. Main colours: orange (#ff9040), red (#8a2a10), pale yellow (#ffe080). Size: about 3.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 💥 Novas of flame burst out of her · ☄️ Burning star-marks rain on you · ✨ Blinks away
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. hovering, body tilted slightly forward.
4. hover cycle frame 2: bobbing up, wings / trails spread.
5. hover cycle frame 3: level, drifting.
6. hover cycle frame 4: bobbing down, wings / trails folded.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: basic attack.
8. casting release: energy bursting outward from the body in a ring of light.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## mg_nova_sorceress.extra.q

Pyrrhia, the Nova Sorceress · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_nova_sorceress.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Pyrrhia, the Nova Sorceress — She burns so bright she becomes a small, furious star. Main colours: orange (#ff9040), red (#8a2a10), pale yellow (#ffe080). Size: about 3.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 💥 Novas of flame burst out of her · ☄️ Burning star-marks rain on you · ✨ Blinks away
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

## mg_void_warlock.core.q

Nihilus, the Void Warlock · Idle, Hover, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Nihilus, the Void Warlock — An eye opening in the void between the stars. Main colours: dark violet (#1a0a2a), black (#05020a), pale violet (#a080ff), pale violet (#c080ff). Size: about 3.3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌑 Darkness — you go blind; only his glowing eyes show · 🔮 Slow void orbs follow you · ✨ Blinks in the dark
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. hovering, body tilted slightly forward.
4. hover cycle frame 2: bobbing up, wings / trails spread.
5. hover cycle frame 3: level, drifting.
6. hover cycle frame 4: bobbing down, wings / trails folded.
7. casting wind-up: gathering glowing energy, arms / antennae raised — used for: basic attack.
8. casting release: energy bursting outward from the body in a ring of light.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## mg_void_warlock.extra.q

Nihilus, the Void Warlock · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_void_warlock.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Nihilus, the Void Warlock — An eye opening in the void between the stars. Main colours: dark violet (#1a0a2a), black (#05020a), pale violet (#a080ff), pale violet (#c080ff). Size: about 3.3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌑 Darkness — you go blind; only his glowing eyes show · 🔮 Slow void orbs follow you · ✨ Blinks in the dark
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

## mg_thunder_magus.core.s

Stormhelm, the Thunder Magus · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Stormhelm, the Thunder Magus — A lightning-knight with a spear of storm. Details: head: greathelm, weapon: spear, armor: plate, cape: long. Main colours: blue (#3a4a7a), dark blue (#101830), yellow (#e8c040), pale yellow (#fff080). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ⚡ Teleports next to you and slams · ⚡ Stunning sparks · ⚡ Lightning if you stand still
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

## mg_thunder_magus.fb

Stormhelm, the Thunder Magus · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mg_thunder_magus.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Stormhelm, the Thunder Magus — A lightning-knight with a spear of storm. Details: head: greathelm, weapon: spear, armor: plate, cape: long. Main colours: blue (#3a4a7a), dark blue (#101830), yellow (#e8c040), pale yellow (#fff080). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ⚡ Teleports next to you and slams · ⚡ Stunning sparks · ⚡ Lightning if you stand still
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

## mg_thunder_magus.extra.s

Stormhelm, the Thunder Magus · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_thunder_magus.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Stormhelm, the Thunder Magus — A lightning-knight with a spear of storm. Details: head: greathelm, weapon: spear, armor: plate, cape: long. Main colours: blue (#3a4a7a), dark blue (#101830), yellow (#e8c040), pale yellow (#fff080). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): ⚡ Teleports next to you and slams · ⚡ Stunning sparks · ⚡ Lightning if you stand still
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

## mg_stone_shaper.core.q

Thane Gravelstone, the Stone Shaper · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Thane Gravelstone, the Stone Shaper — The mage has shaped himself into a small mountain. Main colours: muted orange (#8a8070), dark grey (#3a342a), muted orange (#c8b090), orange (#ffb040). Size: about 3.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🪨 Earth spikes burst up under you · 🧱 Raises stone walls · 🔻 Shrinking curse (you deal less damage) · 🛡 Stone armour
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

## mg_stone_shaper.extra.q

Thane Gravelstone, the Stone Shaper · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_stone_shaper.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Thane Gravelstone, the Stone Shaper — The mage has shaped himself into a small mountain. Main colours: muted orange (#8a8070), dark grey (#3a342a), muted orange (#c8b090), orange (#ffb040). Size: about 3.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🪨 Earth spikes burst up under you · 🧱 Raises stone walls · 🔻 Shrinking curse (you deal less damage) · 🛡 Stone armour
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

## mg_blizzard_king.core.q

Hiemal, the Blizzard King · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Hiemal, the Blizzard King — The Blizzard King rides a white winter-wolf. Details: beast: wolf. Main colours: pale blue (#e0ecf8), muted blue (#8aa0c0), white (#ffffff), pale teal (#a0e8ff). Size: about 3.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌨 Blizzards slow everything · 🧊 Ice floors everywhere — you slide · ❄️ Freezing beam · ❄️ Rings of frost
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

## mg_blizzard_king.extra.q

Hiemal, the Blizzard King · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_blizzard_king.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Hiemal, the Blizzard King — The Blizzard King rides a white winter-wolf. Details: beast: wolf. Main colours: pale blue (#e0ecf8), muted blue (#8aa0c0), white (#ffffff), pale teal (#a0e8ff). Size: about 3.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌨 Blizzards slow everything · 🧊 Ice floors everywhere — you slide · ❄️ Freezing beam · ❄️ Rings of frost
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

## mg_rift_lich.core.s

Vargrim, the Rift Lich · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Vargrim, the Rift Lich — A scythe-bearing lich with wings of torn shadow. Details: head: skull, gear: runecrown, weapon: scythe, off: orb, armor: bone. Main colours: dark violet (#3a1a4a), black (#0a040e), yellow (#c8a040), violet (#c060ff). Size: about 3.3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌑 Blinds you — the room goes dark · 🔀 Hexes that reverse your controls · 🟣 Void beams · 🪞 Echo copies of himself
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

## mg_rift_lich.fb

Vargrim, the Rift Lich · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mg_rift_lich.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Vargrim, the Rift Lich — A scythe-bearing lich with wings of torn shadow. Details: head: skull, gear: runecrown, weapon: scythe, off: orb, armor: bone. Main colours: dark violet (#3a1a4a), black (#0a040e), yellow (#c8a040), violet (#c060ff). Size: about 3.3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌑 Blinds you — the room goes dark · 🔀 Hexes that reverse your controls · 🟣 Void beams · 🪞 Echo copies of himself
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

## mg_rift_lich.extra.s

Vargrim, the Rift Lich · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_rift_lich.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Vargrim, the Rift Lich — A scythe-bearing lich with wings of torn shadow. Details: head: skull, gear: runecrown, weapon: scythe, off: orb, armor: bone. Main colours: dark violet (#3a1a4a), black (#0a040e), yellow (#c8a040), violet (#c060ff). Size: about 3.3× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌑 Blinds you — the room goes dark · 🔀 Hexes that reverse your controls · 🟣 Void beams · 🪞 Echo copies of himself
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

## mg_soul_drinker.core.s

Lady Vesperine, the Soul Drinker · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Lady Vesperine, the Soul Drinker — A vampire sorceress with bat-wings, drinking life from across the room. Details: head: vampire, gear: crown, weapon: wand, off: orb, armor: robe, cape: long. Main colours: dark red (#6a0a1a), dark red (#200408), yellow (#c8a040), red (#ff3050). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🩸 Drains your life to heal herself · 💘 Charm — your controls reverse · 🦇 Homing blood-bats · ✨ Blinks
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

## mg_soul_drinker.fb

Lady Vesperine, the Soul Drinker · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mg_soul_drinker.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Lady Vesperine, the Soul Drinker — A vampire sorceress with bat-wings, drinking life from across the room. Details: head: vampire, gear: crown, weapon: wand, off: orb, armor: robe, cape: long. Main colours: dark red (#6a0a1a), dark red (#200408), yellow (#c8a040), red (#ff3050). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🩸 Drains your life to heal herself · 💘 Charm — your controls reverse · 🦇 Homing blood-bats · ✨ Blinks
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

## mg_soul_drinker.extra.s

Lady Vesperine, the Soul Drinker · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_soul_drinker.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Lady Vesperine, the Soul Drinker — A vampire sorceress with bat-wings, drinking life from across the room. Details: head: vampire, gear: crown, weapon: wand, off: orb, armor: robe, cape: long. Main colours: dark red (#6a0a1a), dark red (#200408), yellow (#c8a040), red (#ff3050). Size: about 3.1× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🩸 Drains your life to heal herself · 💘 Charm — your controls reverse · 🦇 Homing blood-bats · ✨ Blinks
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

## mg_star_sorcerer.core.s

Astraeus, the Star Sorcerer · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Astraeus, the Star Sorcerer — An astronomer-sorcerer with little planets orbiting him. Details: head: face, gear: wizard, weapon: staff, armor: robe. Main colours: dark blue (#1a2a5a), black (#060a1a), yellow (#e8c040), pale yellow (#ffe080). Size: about 3.2× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌠 Starfall — meteors rain on marked spots · ⏳ Slows time around you · ✨ Blinks among the stars
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

## mg_star_sorcerer.fb

Astraeus, the Star Sorcerer · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, mg_star_sorcerer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Astraeus, the Star Sorcerer — An astronomer-sorcerer with little planets orbiting him. Details: head: face, gear: wizard, weapon: staff, armor: robe. Main colours: dark blue (#1a2a5a), black (#060a1a), yellow (#e8c040), pale yellow (#ffe080). Size: about 3.2× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌠 Starfall — meteors rain on marked spots · ⏳ Slows time around you · ✨ Blinks among the stars
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

## mg_star_sorcerer.extra.s

Astraeus, the Star Sorcerer · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, mg_star_sorcerer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Astraeus, the Star Sorcerer — An astronomer-sorcerer with little planets orbiting him. Details: head: face, gear: wizard, weapon: staff, armor: robe. Main colours: dark blue (#1a2a5a), black (#060a1a), yellow (#e8c040), pale yellow (#ffe080). Size: about 3.2× the height of the hero (a towering boss).
How it behaves in the game (for the poses): 🌠 Starfall — meteors rain on marked spots · ⏳ Slows time around you · ✨ Blinks among the stars
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

## boss_vr_ember_wraith.core.s

Cindermourn, the Ember Wraith · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Cindermourn, the Ember Wraith — A hooded wraith of smoke with ember eyes. Details: head: wraith, off: flame, armor: rags, cape: tattered. Main colours: dark red (#5a2a1a), dark red (#2a1008), orange (#ff9040), yellow (#ffe060). Size: about 3.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Drifts at you in swirling sparks.
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

## boss_vr_ember_wraith.fb

Cindermourn, the Ember Wraith · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, boss_vr_ember_wraith.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Cindermourn, the Ember Wraith — A hooded wraith of smoke with ember eyes. Details: head: wraith, off: flame, armor: rags, cape: tattered. Main colours: dark red (#5a2a1a), dark red (#2a1008), orange (#ff9040), yellow (#ffe060). Size: about 3.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Drifts at you in swirling sparks.
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

## boss_vr_ember_wraith.extra.s

Cindermourn, the Ember Wraith · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_vr_ember_wraith.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Cindermourn, the Ember Wraith — A hooded wraith of smoke with ember eyes. Details: head: wraith, off: flame, armor: rags, cape: tattered. Main colours: dark red (#5a2a1a), dark red (#2a1008), orange (#ff9040), yellow (#ffe060). Size: about 3.5× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Drifts at you in swirling sparks.
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

## boss_vr_magma_spitter.core.q

Pyrecoil, the Magma Basilisk · Idle, Move, Ranged attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Pyrecoil, the Magma Basilisk — A hooded magma cobra whose glare cracks stone. Main colours: red (#a03a1a), dark red (#4a1008), orange (#ffb040), orange (#ffc040). Size: about 3.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Spits globs of lava.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. ranged wind-up: aiming, the shot held ready — used for: basic attack.
8. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_vr_magma_spitter.extra.q

Pyrecoil, the Magma Basilisk · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_vr_magma_spitter.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Pyrecoil, the Magma Basilisk — A hooded magma cobra whose glare cracks stone. Main colours: red (#a03a1a), dark red (#4a1008), orange (#ffb040), orange (#ffc040). Size: about 3.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Spits globs of lava.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. casting wind-up: gathering glowing energy, arms / antennae raised — used for: attack patterns (rain, walls, bursts).
3. casting release: energy bursting outward from the body in a ring of light.
4. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
5. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
6. transformation: bursting upward in a pillar of light, new shape forming.
7. death frame 1: buckling, losing balance.
8. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_vr_obsidian_golem.core.q

Glassgrind, the Obsidian Golem · Idle, Move · 6 poses, 3 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Glassgrind, the Obsidian Golem — An obsidian spider-golem. Main colours: dark grey (#2a2226), black (#0a0808), violet (#b060ff), magenta (#ff60ff). Size: about 3.7× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Slow, crushing slams.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_vr_obsidian_golem.extra.q

Glassgrind, the Obsidian Golem · Slam, Hurt, Cast, Enrage · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_vr_obsidian_golem.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Glassgrind, the Obsidian Golem — An obsidian spider-golem. Main colours: dark grey (#2a2226), black (#0a0808), violet (#b060ff), magenta (#ff60ff). Size: about 3.7× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Slow, crushing slams.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. slam wind-up: rearing up, weapon or fists raised high overhead — used for: basic attack.
2. slam impact: crashing down into the ground, body compressed.
3. slam recover: pushing back up, off balance.
4. hurt: flinching backward, eyes shut, a few white impact sparks.
5. casting wind-up: gathering glowing energy, arms / antennae raised — used for: attack patterns (rain, walls, bursts).
6. casting release: energy bursting outward from the body in a ring of light.
7. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_vr_obsidian_golem.extra2.q

Glassgrind, the Obsidian Golem · Phase change, Death · 4 poses, 2 × 2 · 1024x1024 · extra

Attach: style_hero, style_centaur, boss_vr_obsidian_golem.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Glassgrind, the Obsidian Golem — An obsidian spider-golem. Main colours: dark grey (#2a2226), black (#0a0808), violet (#b060ff), magenta (#ff60ff). Size: about 3.7× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Slow, crushing slams.
Layout: exactly 4 poses in a grid of 2 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
2. transformation: bursting upward in a pillar of light, new shape forming.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_vr_cinder_phoenix.core.q

Ashwing, the Cinder Phoenix · Idle, Hover, Melee attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Ashwing, the Cinder Phoenix — A soot-black ash-bird with burning eyes. Main colours: dark grey (#3a3a3a), black (#141414), orange (#ff8030). Size: about 3.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Fast swooping dives.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. hovering, body tilted slightly forward.
4. hover cycle frame 2: bobbing up, wings / trails spread.
5. hover cycle frame 3: level, drifting.
6. hover cycle frame 4: bobbing down, wings / trails folded.
7. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: basic attack.
8. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_vr_cinder_phoenix.extra.q

Ashwing, the Cinder Phoenix · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_vr_cinder_phoenix.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Ashwing, the Cinder Phoenix — A soot-black ash-bird with burning eyes. Main colours: dark grey (#3a3a3a), black (#141414), orange (#ff8030). Size: about 3.6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Fast swooping dives.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. casting wind-up: gathering glowing energy, arms / antennae raised — used for: attack patterns (rain, walls, bursts).
3. casting release: energy bursting outward from the body in a ring of light.
4. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
5. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
6. transformation: bursting upward in a pillar of light, new shape forming.
7. death frame 1: buckling, losing balance.
8. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_vr_lava_wyrm.core.q

Skorrath, the Lava Wyrm · Idle, Move, Melee attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Skorrath, the Lava Wyrm — A wingless fire-drake. Details: beast: dragon. Main colours: red (#8a2a10), dark red (#3a0a04), orange (#ffc040), orange (#ffa030). Size: about 3.8× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Lunges out of the lava.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. movement cycle frame 1: leading limb forward, weight landing.
4. movement cycle frame 2: limbs passing, body at its highest.
5. movement cycle frame 3: the other limb forward, weight landing.
6. movement cycle frame 4: limbs passing the other way.
7. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: basic attack.
8. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_vr_lava_wyrm.extra.q

Skorrath, the Lava Wyrm · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_vr_lava_wyrm.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Skorrath, the Lava Wyrm — A wingless fire-drake. Details: beast: dragon. Main colours: red (#8a2a10), dark red (#3a0a04), orange (#ffc040), orange (#ffa030). Size: about 3.8× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Lunges out of the lava.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. casting wind-up: gathering glowing energy, arms / antennae raised — used for: attack patterns (rain, walls, bursts).
3. casting release: energy bursting outward from the body in a ring of light.
4. enraged roar: head back, mouth wide, body flushed and bristling — used for: phase roar.
5. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
6. transformation: bursting upward in a pillar of light, new shape forming.
7. death frame 1: buckling, losing balance.
8. death frame 2: collapsed flat on the ground, still.
View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_vr_ashen_knight.core.s

Sir Cindric, the Ashen Draugr · Idle, Move, Melee attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Sir Cindric, the Ashen Draugr — A burned barrow-warrior who will not stay dead. Details: head: skull, gear: crown, weapon: greataxe, armor: bone, cape: tattered, build: broad. Main colours: grey (#6a6258), dark grey (#2a2420), muted orange (#8a8070), red (#ff6040). Size: about 3.8× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Charges with sword lunges.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_vr_ashen_knight.fb

Sir Cindric, the Ashen Draugr · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, boss_vr_ashen_knight.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Sir Cindric, the Ashen Draugr — A burned barrow-warrior who will not stay dead. Details: head: skull, gear: crown, weapon: greataxe, armor: bone, cape: tattered, build: broad. Main colours: grey (#6a6258), dark grey (#2a2420), muted orange (#8a8070), red (#ff6040). Size: about 3.8× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Charges with sword lunges.
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

## boss_vr_ashen_knight.extra.s

Sir Cindric, the Ashen Draugr · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_vr_ashen_knight.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Sir Cindric, the Ashen Draugr — A burned barrow-warrior who will not stay dead. Details: head: skull, gear: crown, weapon: greataxe, armor: bone, cape: tattered, build: broad. Main colours: grey (#6a6258), dark grey (#2a2420), muted orange (#8a8070), red (#ff6040). Size: about 3.8× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Charges with sword lunges.
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

## boss_vr_pyrokraken.core.q

Pyrokraken, the Magma Squid · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Pyrokraken, the Magma Squid — An obsidian-shelled squid of the lava deeps. Main colours: dark grey (#2a1a1a), black (#0a0404), red (#ff6030). Size: about 4× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Lashes tentacles in fiery rings.
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

## boss_vr_pyrokraken.extra.q

Pyrokraken, the Magma Squid · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_vr_pyrokraken.core.q

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Pyrokraken, the Magma Squid — An obsidian-shelled squid of the lava deeps. Main colours: dark grey (#2a1a1a), black (#0a0404), red (#ff6030). Size: about 4× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Lashes tentacles in fiery rings.
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

## boss_vr_inferno_wraith.core.s

Vathrax, the Inferno Wraith · Idle, Move, Cast · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Vathrax, the Inferno Wraith — A crowned wraith wreathed in fire and chains. Details: head: wraith, gear: spikecrown, weapon: whip, off: chains, armor: shadow, cape: flame. Main colours: red (#8a2a1a), dark red (#3a0a08), red (#ff6020), yellow (#ffe060). Size: about 4.2× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Hurls fire and drifts through walls of flame.
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

## boss_vr_inferno_wraith.fb

Vathrax, the Inferno Wraith · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, boss_vr_inferno_wraith.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Vathrax, the Inferno Wraith — A crowned wraith wreathed in fire and chains. Details: head: wraith, gear: spikecrown, weapon: whip, off: chains, armor: shadow, cape: flame. Main colours: red (#8a2a1a), dark red (#3a0a08), red (#ff6020), yellow (#ffe060). Size: about 4.2× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Hurls fire and drifts through walls of flame.
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

## boss_vr_inferno_wraith.extra.s

Vathrax, the Inferno Wraith · Hurt, Enrage, Phase change, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_vr_inferno_wraith.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Vathrax, the Inferno Wraith — A crowned wraith wreathed in fire and chains. Details: head: wraith, gear: spikecrown, weapon: whip, off: chains, armor: shadow, cape: flame. Main colours: red (#8a2a1a), dark red (#3a0a08), red (#ff6020), yellow (#ffe060). Size: about 4.2× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Hurls fire and drifts through walls of flame.
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

## boss_volcano_lord.core.s

Surtharn, the Volcano Lord · Idle, Move · 6 poses, 3 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Surtharn, the Volcano Lord — The fire-giant of the world's end: horned, crowned, with a flaming sword. Details: head: demon, gear: spikecrown, weapon: greatsword, armor: magma, cape: flame, build: giant. Main colours: dark red (#4a1a10), black (#1a0806), red (#ff6020), orange (#ffa030). Size: about 6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Fights in six forms, from the Molten Colossus to the Living Volcano.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_volcano_lord.fb

Surtharn, the Volcano Lord · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, boss_volcano_lord.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Surtharn, the Volcano Lord — The fire-giant of the world's end: horned, crowned, with a flaming sword. Details: head: demon, gear: spikecrown, weapon: greatsword, armor: magma, cape: flame, build: giant. Main colours: dark red (#4a1a10), black (#1a0806), red (#ff6020), orange (#ffa030). Size: about 6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Fights in six forms, from the Molten Colossus to the Living Volcano.
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

## boss_volcano_lord.extra.s

Surtharn, the Volcano Lord · Slam, Hurt, Cast, Enrage · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, boss_volcano_lord.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Surtharn, the Volcano Lord — The fire-giant of the world's end: horned, crowned, with a flaming sword. Details: head: demon, gear: spikecrown, weapon: greatsword, armor: magma, cape: flame, build: giant. Main colours: dark red (#4a1a10), black (#1a0806), red (#ff6020), orange (#ffa030). Size: about 6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Fights in six forms, from the Molten Colossus to the Living Volcano.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## boss_volcano_lord.extra2.s

Surtharn, the Volcano Lord · Phase change, Death · 4 poses, 2 × 2 · 1024x1024 · extra

Attach: style_hero, style_centaur, boss_volcano_lord.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zola and Zoldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Surtharn, the Volcano Lord — The fire-giant of the world's end: horned, crowned, with a flaming sword. Details: head: demon, gear: spikecrown, weapon: greatsword, armor: magma, cape: flame, build: giant. Main colours: dark red (#4a1a10), black (#1a0806), red (#ff6020), orange (#ffa030). Size: about 6× the height of the hero (a towering boss).
How it behaves in the game (for the poses): Fights in six forms, from the Molten Colossus to the Living Volcano.
Layout: exactly 4 poses in a grid of 2 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. transformation: doubled over, cracks of light breaking through the body — used for: changes to the next phase.
2. transformation: bursting upward in a pillar of light, new shape forming.
3. death frame 1: buckling, losing balance.
4. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```
