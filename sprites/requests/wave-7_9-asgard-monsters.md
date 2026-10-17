# Asgard monsters — 12 requests

Save each result as `sprites/incoming/<request id>.png`.

## einherjar_berserker.core.s

Einherjar Berserker · Idle, Move, Charge · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Einherjar Berserker — A ghostly-pale warrior of Valhöll, bare-chested under a wolf pelt, a great two-handed axe rimmed with gold light; his eyes burn white. Main colours: muted orange (#c8b8a0), dark brown (#4a3a2a), pale yellow (#fff0b0), pale teal (#9fe8ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Charges headlong. A roaring charge that knocks you back, then wide axe sweeps. Grows wilder as he is hurt.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## einherjar_berserker.fb

Einherjar Berserker · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, einherjar_berserker.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Einherjar Berserker — A ghostly-pale warrior of Valhöll, bare-chested under a wolf pelt, a great two-handed axe rimmed with gold light; his eyes burn white. Main colours: muted orange (#c8b8a0), dark brown (#4a3a2a), pale yellow (#fff0b0), pale teal (#9fe8ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Charges headlong. A roaring charge that knocks you back, then wide axe sweeps. Grows wilder as he is hurt.
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
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## einherjar_berserker.extra.s

Einherjar Berserker · Hurt, Wide sweep, Enrage, Death · 6 poses, 3 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, einherjar_berserker.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Einherjar Berserker — A ghostly-pale warrior of Valhöll, bare-chested under a wolf pelt, a great two-handed axe rimmed with gold light; his eyes burn white. Main colours: muted orange (#c8b8a0), dark brown (#4a3a2a), pale yellow (#fff0b0), pale teal (#9fe8ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Charges headlong. A roaring charge that knocks you back, then wide axe sweeps. Grows wilder as he is hurt.
Layout: exactly 6 poses in a grid of 3 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. wide sweep wind-up: twisted far to one side — used for: sweep.
3. wide sweep: mid-swing, a long arc trailing across the front.
4. enraged roar: head back, mouth wide, body flushed and bristling — used for: enrage.
5. death frame 1: buckling, losing balance.
6. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## einherjar_shieldmaiden.core.s

Einherjar Shield-maiden · Idle, Move, Lunge, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Einherjar Shield-maiden — A tall shield-maiden of Valhöll in white-and-gold mail, a round gold-bossed shield and a spear, her braids glowing faintly. Main colours: pale orange (#d8d0c0), muted brown (#5a4a3a), pale yellow (#ffe080), pale teal (#9fe8ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Holds her ground and guards the others. Lunges with her spear from behind the shield. Her shield turns blows from the front.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. lunge coil: crouched low, ready to spring — used for: lunge.
7. lunge: stretched out flat in mid-spring.
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## einherjar_shieldmaiden.fb

Einherjar Shield-maiden · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, einherjar_shieldmaiden.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Einherjar Shield-maiden — A tall shield-maiden of Valhöll in white-and-gold mail, a round gold-bossed shield and a spear, her braids glowing faintly. Main colours: pale orange (#d8d0c0), muted brown (#5a4a3a), pale yellow (#ffe080), pale teal (#9fe8ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Holds her ground and guards the others. Lunges with her spear from behind the shield. Her shield turns blows from the front.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. seen from the FRONT, standing at rest, relaxed and alert.
2. seen from the FRONT, step / movement frame 1 of 2.
3. seen from the FRONT, step / movement frame 2 of 2 (opposite limb).
4. seen from the FRONT, lunge: stretched out flat in mid-spring.
5. seen from BEHIND, standing at rest, relaxed and alert.
6. seen from BEHIND, step / movement frame 1 of 2.
7. seen from BEHIND, step / movement frame 2 of 2 (opposite limb).
8. seen from BEHIND, lunge: stretched out flat in mid-spring.
View: camera slightly above, as in a top-down RPG; each pose states its own facing.
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## einherjar_shieldmaiden.extra.s

Einherjar Shield-maiden · Guard, Death · 4 poses, 4 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, einherjar_shieldmaiden.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Einherjar Shield-maiden — A tall shield-maiden of Valhöll in white-and-gold mail, a round gold-bossed shield and a spear, her braids glowing faintly. Main colours: pale orange (#d8d0c0), muted brown (#5a4a3a), pale yellow (#ffe080), pale teal (#9fe8ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Holds her ground and guards the others. Lunges with her spear from behind the shield. Her shield turns blows from the front.
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

## einherjar_archer.core.s

Einherjar Archer · Idle, Move, Ranged attack, Hurt · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Einherjar Archer — A lean hooded archer of Valhöll with a white-gold longbow and arrows of light. Main colours: light grey (#c0c8d0), muted blue (#3a4a5a), pale yellow (#fff0b0), pale teal (#9fe8ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps away from you, behind the others. Single arrows of light, then a fan of three. Quick on her feet.
Layout: exactly 8 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. standing at rest, relaxed and alert.
2. movement cycle frame 1: leading limb forward, weight landing — used for: kite.
3. movement cycle frame 2: limbs passing, body at its highest.
4. movement cycle frame 3: the other limb forward, weight landing.
5. movement cycle frame 4: limbs passing the other way.
6. ranged wind-up: aiming, the shot held ready — used for: shoot, shoot.
7. ranged release: the shot just let go, arm / mouth extended (do not draw the projectile).
8. hurt: flinching backward, eyes shut, a few white impact sparks.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## einherjar_archer.fb

Einherjar Archer · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, einherjar_archer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Einherjar Archer — A lean hooded archer of Valhöll with a white-gold longbow and arrows of light. Main colours: light grey (#c0c8d0), muted blue (#3a4a5a), pale yellow (#fff0b0), pale teal (#9fe8ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps away from you, behind the others. Single arrows of light, then a fan of three. Quick on her feet.
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

## einherjar_archer.extra.s

Einherjar Archer · Death · 2 poses, 2 × 1 · 1536x1024 · extra

Attach: style_hero, style_centaur, einherjar_archer.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Einherjar Archer — A lean hooded archer of Valhöll with a white-gold longbow and arrows of light. Main colours: light grey (#c0c8d0), muted blue (#3a4a5a), pale yellow (#fff0b0), pale teal (#9fe8ff). Size: about 1× the height of the hero.
How it behaves in the game (for the poses): Keeps away from you, behind the others. Single arrows of light, then a fan of three. Quick on her feet.
Layout: exactly 2 poses in a grid of 2 columns × 1 row, evenly spaced, in this order (left to right, top row first):
1. death frame 1: buckling, losing balance.
2. death frame 2: collapsed flat on the ground, still.
View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).
Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.
Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.
Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid green #00FF00 background with no texture, no gradient and no checkerboard pattern.
```

## gjallar_warden.core.s

Gjallar Warden · Idle, Move, Slam · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon).
Subject: Gjallar Warden — A tall white-stone guardian with a gold horn set in its chest and a lens for an eye — Heimdall's watchman. Main colours: pale yellow (#e8e0cc), muted orange (#8a7a5a), yellow (#ffd860), pale teal (#9fe8ff). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Stands watch, then lumbers to the alarm. A blast from its horn that stuns, and a heavy stone fist. Its stone hide turns most blows.
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

## gjallar_warden.fb

Gjallar Warden · Front and back: idle, steps, main attack · 8 poses, 4 × 2 · 1536x1024 · core

Attach: style_hero, style_centaur, gjallar_warden.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Gjallar Warden — A tall white-stone guardian with a gold horn set in its chest and a lens for an eye — Heimdall's watchman. Main colours: pale yellow (#e8e0cc), muted orange (#8a7a5a), yellow (#ffd860), pale teal (#9fe8ff). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Stands watch, then lumbers to the alarm. A blast from its horn that stuns, and a heavy stone fist. Its stone hide turns most blows.
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

## gjallar_warden.extra.s

Gjallar Warden · Hurt, Cast, Guard, Death · 7 poses, 4 × 2 · 1536x1024 · extra

Attach: style_hero, style_centaur, gjallar_warden.core.s

```
Create ONE sprite sheet image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor.
Reference image 1 = the hero boy (art style, proportions, outline weight, teal highlights). Reference image 2 = the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon). Reference image 3 = the first approved sheet of this same character: keep the character identical to it.
Subject: Gjallar Warden — A tall white-stone guardian with a gold horn set in its chest and a lens for an eye — Heimdall's watchman. Main colours: pale yellow (#e8e0cc), muted orange (#8a7a5a), yellow (#ffd860), pale teal (#9fe8ff). Size: about 1.6× the height of the hero.
How it behaves in the game (for the poses): Stands watch, then lumbers to the alarm. A blast from its horn that stuns, and a heavy stone fist. Its stone hide turns most blows.
Layout: exactly 7 poses in a grid of 4 columns × 2 rows, evenly spaced, in this order (left to right, top row first):
1. hurt: flinching backward, eyes shut, a few white impact sparks.
2. casting wind-up: gathering glowing energy, arms / antennae raised — used for: ring.
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
