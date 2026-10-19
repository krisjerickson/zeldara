# Wave 7.95 — 9 requests

Save each result as `sprites/incoming/<request id>.png`.

## grim_1.core.s

Solmyrk, the Gilded Seraph · Idle, Hover, Melee attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, sol_ref_1

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the approved painting of this exact form of Solmyrk (Kris's pick): copy its helm or head, the one eye, the wings, the robes or body, the scepter and the colours exactly — only the poses and the views change.
Subject: Solmyrk, the Gilded Seraph — Phase 1 — the Gilded Seraph: the god everyone in Asgard was told he is. A floating golden angel-king in Norse bishop's robes, all gold, ivory and white light — never blue. Paint him RADIANT in every pose — gold, ivory and white, glowing, light pouring off him. No blue anywhere. He FLOATS a little above the ground and never walks: his robes end in long points, no legs or feet. Keep the ONE glowing eye-slit, the crested helm, the halo, the four wings and the sun-star scepter identical in every pose and view. Details: a tall pointed golden helm with a high central crest-spike and a narrow visor with ONE glowing eye-slit (the other eye sealed); a thick cream fur collar; layered ivory-and-gold bishop robes, long, grand and flowing, the panels embroidered with gold rune-knots and ending in long points (NO LEGS — he hovers); TWO pairs of huge golden wings with crisp, faceted feathers — tall upper wings rising far above his head and long lower wings sweeping down past his robes; a thin gold ring halo behind his head; in his right hand a tall gold scepter crowned with a spiked sun-star around a glowing white orb; the left hand open, offering light. Main colours: pale yellow (#fbf3dc), dark grey (#2a2418), orange (#e8b84a), pale yellow (#fff0b0). Size: about 4.4× the height of the hero (a towering boss).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. hovering, body tilted slightly forward.
4. hover cycle frame 2: bobbing up, wings / trails spread.
5. hover cycle frame 3: level, drifting.
6. hover cycle frame 4: bobbing down, wings / trails folded.
7. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: basic attack.
8. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## grim_1.fb

Solmyrk, the Gilded Seraph · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, grim_1.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Solmyrk, the Gilded Seraph — Phase 1 — the Gilded Seraph: the god everyone in Asgard was told he is. A floating golden angel-king in Norse bishop's robes, all gold, ivory and white light — never blue. Paint him RADIANT in every pose — gold, ivory and white, glowing, light pouring off him. No blue anywhere. He FLOATS a little above the ground and never walks: his robes end in long points, no legs or feet. Keep the ONE glowing eye-slit, the crested helm, the halo, the four wings and the sun-star scepter identical in every pose and view. Details: a tall pointed golden helm with a high central crest-spike and a narrow visor with ONE glowing eye-slit (the other eye sealed); a thick cream fur collar; layered ivory-and-gold bishop robes, long, grand and flowing, the panels embroidered with gold rune-knots and ending in long points (NO LEGS — he hovers); TWO pairs of huge golden wings with crisp, faceted feathers — tall upper wings rising far above his head and long lower wings sweeping down past his robes; a thin gold ring halo behind his head; in his right hand a tall gold scepter crowned with a spiked sun-star around a glowing white orb; the left hand open, offering light. Main colours: pale yellow (#fbf3dc), dark grey (#2a2418), orange (#e8b84a), pale yellow (#fff0b0). Size: about 4.4× the height of the hero (a towering boss).
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

## grim_1.extra.s

Solmyrk, the Gilded Seraph · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, grim_1.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Solmyrk, the Gilded Seraph — Phase 1 — the Gilded Seraph: the god everyone in Asgard was told he is. A floating golden angel-king in Norse bishop's robes, all gold, ivory and white light — never blue. Paint him RADIANT in every pose — gold, ivory and white, glowing, light pouring off him. No blue anywhere. He FLOATS a little above the ground and never walks: his robes end in long points, no legs or feet. Keep the ONE glowing eye-slit, the crested helm, the halo, the four wings and the sun-star scepter identical in every pose and view. Details: a tall pointed golden helm with a high central crest-spike and a narrow visor with ONE glowing eye-slit (the other eye sealed); a thick cream fur collar; layered ivory-and-gold bishop robes, long, grand and flowing, the panels embroidered with gold rune-knots and ending in long points (NO LEGS — he hovers); TWO pairs of huge golden wings with crisp, faceted feathers — tall upper wings rising far above his head and long lower wings sweeping down past his robes; a thin gold ring halo behind his head; in his right hand a tall gold scepter crowned with a spiked sun-star around a glowing white orb; the left hand open, offering light. Main colours: pale yellow (#fbf3dc), dark grey (#2a2418), orange (#e8b84a), pale yellow (#fff0b0). Size: about 4.4× the height of the hero (a towering boss).
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

## grim_2.core.s

Solmyrk, the Cracked Seraph · Idle, Hover, Melee attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, grim_1.core.s, sol_ref_2, sol_ref_2d

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first form of this same god (Solmyrk): keep his art style, size, his tall crested golden helm (now cracked open) and the gold-and-ivory robes — and change only what is described for this form. Reference image 4 = the approved painting of this exact form of Solmyrk (Kris's pick): copy its helm or head, the one eye, the wings, the robes or body, the scepter and the colours exactly — only the poses and the views change. Reference image 5 = the approved painting of this exact form in its BLACK pulse: the same figure as the painting before it, shown dark — for reference only, paint the radiant version.
Subject: Solmyrk, the Cracked Seraph — Phase 2 — the Cracked Seraph: the mask of the Allfather is breaking, and the dark demon underneath shows through. Half radiant god, half the black beneath. Paint him as the radiant half of his pulse — gold, ivory and white with the black showing only where the helm is cracked, in the scorched edges, the torn under-feathers and the shadow-arms. He FLOATS; no legs or feet. Keep the cracked crested helm, the one white eye, the wings, the ravens, the shadow-arms and the scepter identical in every pose and view. Details: the SAME tall pointed golden helm with the high central crest-spike as his first form, but CRACKED: a jagged split runs down it and pieces have broken away, showing a black demon face underneath with ONE burning white eye; his cream fur mantle and ivory-gold robes are scorched black at the edges and the hem dissolves into gold fire and black smoke (NO LEGS — he hovers); his wings are torn — cream feathers on top, black ash-feathers beneath; long black sinuous clawed arms of shadow reach out from under his robes; two black ravens circle his shoulders; the same sun-star scepter, its staff now wound with a black tendril. Main colours: pale yellow (#f2e8d0), black (#121018), orange (#e0b048), pale yellow (#fff4d0). Size: about 4.4× the height of the hero (a towering boss).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. hovering, body tilted slightly forward.
4. hover cycle frame 2: bobbing up, wings / trails spread.
5. hover cycle frame 3: level, drifting.
6. hover cycle frame 4: bobbing down, wings / trails folded.
7. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: basic attack.
8. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## grim_2.fb

Solmyrk, the Cracked Seraph · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, grim_2.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Solmyrk, the Cracked Seraph — Phase 2 — the Cracked Seraph: the mask of the Allfather is breaking, and the dark demon underneath shows through. Half radiant god, half the black beneath. Paint him as the radiant half of his pulse — gold, ivory and white with the black showing only where the helm is cracked, in the scorched edges, the torn under-feathers and the shadow-arms. He FLOATS; no legs or feet. Keep the cracked crested helm, the one white eye, the wings, the ravens, the shadow-arms and the scepter identical in every pose and view. Details: the SAME tall pointed golden helm with the high central crest-spike as his first form, but CRACKED: a jagged split runs down it and pieces have broken away, showing a black demon face underneath with ONE burning white eye; his cream fur mantle and ivory-gold robes are scorched black at the edges and the hem dissolves into gold fire and black smoke (NO LEGS — he hovers); his wings are torn — cream feathers on top, black ash-feathers beneath; long black sinuous clawed arms of shadow reach out from under his robes; two black ravens circle his shoulders; the same sun-star scepter, its staff now wound with a black tendril. Main colours: pale yellow (#f2e8d0), black (#121018), orange (#e0b048), pale yellow (#fff4d0). Size: about 4.4× the height of the hero (a towering boss).
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

## grim_2.extra.s

Solmyrk, the Cracked Seraph · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, grim_2.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Solmyrk, the Cracked Seraph — Phase 2 — the Cracked Seraph: the mask of the Allfather is breaking, and the dark demon underneath shows through. Half radiant god, half the black beneath. Paint him as the radiant half of his pulse — gold, ivory and white with the black showing only where the helm is cracked, in the scorched edges, the torn under-feathers and the shadow-arms. He FLOATS; no legs or feet. Keep the cracked crested helm, the one white eye, the wings, the ravens, the shadow-arms and the scepter identical in every pose and view. Details: the SAME tall pointed golden helm with the high central crest-spike as his first form, but CRACKED: a jagged split runs down it and pieces have broken away, showing a black demon face underneath with ONE burning white eye; his cream fur mantle and ivory-gold robes are scorched black at the edges and the hem dissolves into gold fire and black smoke (NO LEGS — he hovers); his wings are torn — cream feathers on top, black ash-feathers beneath; long black sinuous clawed arms of shadow reach out from under his robes; two black ravens circle his shoulders; the same sun-star scepter, its staff now wound with a black tendril. Main colours: pale yellow (#f2e8d0), black (#121018), orange (#e0b048), pale yellow (#fff4d0). Size: about 4.4× the height of the hero (a towering boss).
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

## grim_3.core.s

Solmyrk, the Hollow King · Idle, Hover, Melee attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, grim_1.core.s, sol_ref_3

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first form of this same god (Solmyrk): keep only his art style, outline weight and size — this last form is the void beneath and looks different, as described. Reference image 4 = the approved painting of this exact form of Solmyrk (Kris's pick): copy its helm or head, the one eye, the wings, the robes or body, the scepter and the colours exactly — only the poses and the views change.
Subject: Solmyrk, the Hollow King — Phase 3 — the Hollow King: what is left when the mask is gone. The void that was always underneath, deep shadowy nothingness with long binding arms. Paint him as the VOID in every pose: deep black smoke with thin teal and violet rim-light and the one white-glowing eye. NOT an insect. He floats; no legs or feet. Keep the crown, the eye, the four arms and the trailing smoke identical in every pose and view. Details: no robe and no legs: a towering shape of living void-black smoke whose body pours down into one long trailing wisp of shadow; a head that is a narrow black mask-shape with a split of white light for its ONE eye, under a tall jagged black crown of spikes; FOUR long thin black arms ending in hooked claws, reaching out to bind; thin teal and violet rim-light along every edge, otherwise deep black. Main colours: dark grey (#3a3448), black (#06060a), muted violet (#6a5a80), pale teal (#bff4ff). Size: about 4.7× the height of the hero (a towering boss).
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. the same stance with a small breathing motion (chest raised, weight shifted).
3. hovering, body tilted slightly forward.
4. hover cycle frame 2: bobbing up, wings / trails spread.
5. hover cycle frame 3: level, drifting.
6. hover cycle frame 4: bobbing down, wings / trails folded.
7. melee wind-up: weapon / claw / jaw drawn back, body coiled — used for: basic attack.
8. melee strike: full extension at the moment of impact, with a short teal-white swing arc.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## grim_3.fb

Solmyrk, the Hollow King · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, grim_3.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Solmyrk, the Hollow King — Phase 3 — the Hollow King: what is left when the mask is gone. The void that was always underneath, deep shadowy nothingness with long binding arms. Paint him as the VOID in every pose: deep black smoke with thin teal and violet rim-light and the one white-glowing eye. NOT an insect. He floats; no legs or feet. Keep the crown, the eye, the four arms and the trailing smoke identical in every pose and view. Details: no robe and no legs: a towering shape of living void-black smoke whose body pours down into one long trailing wisp of shadow; a head that is a narrow black mask-shape with a split of white light for its ONE eye, under a tall jagged black crown of spikes; FOUR long thin black arms ending in hooked claws, reaching out to bind; thin teal and violet rim-light along every edge, otherwise deep black. Main colours: dark grey (#3a3448), black (#06060a), muted violet (#6a5a80), pale teal (#bff4ff). Size: about 4.7× the height of the hero (a towering boss).
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

## grim_3.extra.s

Solmyrk, the Hollow King · Hurt, Cast, Enrage, Phase change, Death · 8 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, grim_3.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Solmyrk, the Hollow King — Phase 3 — the Hollow King: what is left when the mask is gone. The void that was always underneath, deep shadowy nothingness with long binding arms. Paint him as the VOID in every pose: deep black smoke with thin teal and violet rim-light and the one white-glowing eye. NOT an insect. He floats; no legs or feet. Keep the crown, the eye, the four arms and the trailing smoke identical in every pose and view. Details: no robe and no legs: a towering shape of living void-black smoke whose body pours down into one long trailing wisp of shadow; a head that is a narrow black mask-shape with a split of white light for its ONE eye, under a tall jagged black crown of spikes; FOUR long thin black arms ending in hooked claws, reaching out to bind; thin teal and violet rim-light along every edge, otherwise deep black. Main colours: dark grey (#3a3448), black (#06060a), muted violet (#6a5a80), pale teal (#bff4ff). Size: about 4.7× the height of the hero (a towering boss).
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
