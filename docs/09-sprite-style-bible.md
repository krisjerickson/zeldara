# 09 — Sprite Style Bible & Pilot Prompts (Phase 2 · E1/E2)

> **Superseded Oct 3, 2026 (round 18) by `14-sprite-library.md`.** The style is now Kris's two references (bold cartoon, teal highlights, not pixel art), requests go straight to final sheets, and they are made from the game data. Kept for history only.

Decision E1: **keep the AI-painted hero; every other character is generated in the same style** with ChatGPT image generation (the tool that made the hero), using these prompts. Claude cleans and integrates the results.

## The hero style

High-detail chibi pixel art: big head, small body (about 2.5 heads tall), large glossy anime eyes, crisp dark outline, soft 3–4 tone cel shading, warm earthy palette, and a signature cyan rim light on the upper edges of hair, cloak and armor. 3/4 top-down view with a soft oval ground shadow.

| Aspect | Rule |
|---|---|
| Reference frames | Hero walk/attack/bow/horse frames: 64×105 px (attack/bow 96×105). In game the hero is drawn at 25×42. |
| Proportions | Head ≈ 40% of total height; hands and boots slightly oversized; readable silhouette at 42 px tall. |
| Outline | 1 px dark outline (very dark brown / near-black), slightly lighter on inner edges. |
| Shading | 3–4 flat tones per material, light from the upper left. No gradients, no blur, no anti-aliased soft edges. |
| Rim light | Thin cyan / teal highlight (≈ #6fe3f5) on top edges of hair, shoulders and weapons. This is the key style signature. |
| Palette | Warm browns, moss greens, off-white cloth, muted metals; saturated accents only for eyes, magic and gems. |
| View | 3/4 top-down (camera above and in front). Front view for idle concepts; later sheets add side (right-facing, mirrored for left) and back. |
| Shadow | Soft grey oval under the feet. |
| Background | Solid pure green #00FF00, nothing else, so it can be keyed out cleanly. |
| Scale vs hero | Given per character below (1.0 = same height as the hero). |

## How to generate (per image)

1. Open ChatGPT, start an image chat, and attach the hero reference `assets/hero/walk_frames_front_3.png` (or a screenshot of the hero from the Design Lab).
2. Paste the prompt for one variant. Generate. If the style drifts, reply: *"Closer to the reference: same pixel size, same outline, same cyan rim light."*
3. Save as `sprites/incoming/<character>/<character>_v<n>.png` (e.g. `sprites/incoming/goblin/goblin_v3.png`).
4. Tell Claude when a batch is in. Claude keys out the green, trims, scales to the hero, and shows all options in the Design Lab → Sprites tab for Pick / Maybe / No.
5. After you pick, Claude writes the follow-up prompts for the full sheet (walk front/side/back, attack, hit, death) of the chosen concept only.

## Master prompt template

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of {SUBJECT}. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about {SCALE} the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

## Pilot: 6 characters × 5 concepts (30 images)

### Goblin — Grasslands monster (swarm, fast, weak) (scale 0.8×)

**v1 · Scrappy scavenger**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a small green goblin scavenger with oversized pointed ears, a patched leather vest, a chipped rusty dagger and a sly grin. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 0.8× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v2 · Masked hunter**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a lean green goblin hunter wearing a carved bone mask, fur shoulder wrap and holding a short bone-tipped spear. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 0.8× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v3 · Helmeted raider**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a stocky green goblin raider in a dented iron pot-helmet and mismatched scrap armor, holding a spiked wooden club. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 0.8× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v4 · Hooded sneak**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a hunched green goblin thief in a tattered brown hood, glowing yellow eyes, a coin pouch on its belt and twin small knives. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 0.8× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v5 · Tribal shaman**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a wiry green goblin shaman with feathers and beads, face paint, and a crooked staff topped with a softly glowing green crystal. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 0.8× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

### Skeleton — Grasslands monster (ranged archer) (scale 1.0×)

**v1 · Crypt archer**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of an undead skeleton archer with a cracked skull, glowing blue eye-lights, a worn leather quiver and a simple longbow. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.0× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v2 · Rusted soldier**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a skeleton soldier in rusted chainmail and a dented kettle helm, holding a short bow and a round wooden buckler on its back. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.0× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v3 · Hooded ranger**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a skeleton wrapped in a faded green hooded cloak, a bone bow, and faint teal ghost-fire in its eye sockets. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.0× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v4 · Royal guard**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a skeleton in tarnished gold-trimmed ceremonial armor with a torn crimson sash, holding an ornate recurve bow. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.0× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v5 · Mossy wanderer**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of an old skeleton overgrown with moss and tiny mushrooms, vines through its ribs, carrying a crude branch bow. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.0× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

### Blacksmith — Village NPC (forge) (scale 1.1×)

**v1 · Burly master smith**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a burly bearded human blacksmith with rolled sleeves, a scorched leather apron, thick gloves and a heavy hammer over one shoulder. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.1× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v2 · Dwarf forgemaster**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a short, broad dwarf smith with a braided red beard tucked into his belt, goggles on his forehead and a glowing iron tongs. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.1× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v3 · Young apprentice**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a cheerful young apprentice smith with soot on her cheeks, a bandana, oversized apron and a small hammer and horseshoe. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.1× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v4 · Elven metalworker**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a tall calm elf smith with silver hair tied back, a fine blue-grey apron and a delicate engraving hammer. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.1× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v5 · Old veteran**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a grizzled one-eyed veteran blacksmith with an eyepatch, grey stubble, a chain-mail vest and a war hammer as his tool. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.1× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

### Horse — Stables animal / starter mount (scale 1.5× tall, side-on 3/4 view)

**v1 · Chestnut steed**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a sturdy chestnut horse with a dark mane, simple brown leather saddle and bridle, standing in 3/4 side view. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.5× tall, side-on 3/4 view the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v2 · Dappled grey**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a dappled grey horse with a braided white mane, blue saddle cloth with gold trim, standing in 3/4 side view. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.5× tall, side-on 3/4 view the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v3 · Shaggy pony**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a stocky shaggy highland pony with a long fringe over its eyes, saddlebags and a wool blanket, standing in 3/4 side view. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.5× tall, side-on 3/4 view the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v4 · Elven white**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of an elegant white horse with a silver-blue flowing mane, leaf-patterned tack and a faint cyan shimmer, standing in 3/4 side view. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.5× tall, side-on 3/4 view the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v5 · Black warhorse**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a powerful black warhorse with feathered hooves, a light leather barding and a red plume, standing in 3/4 side view. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.5× tall, side-on 3/4 view the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

### Firefly — Familiar (Ember Spark: ignites, lights dungeons) (scale 0.35×, floating)

**v1 · Ember beetle**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a tiny round firefly familiar with a glowing amber abdomen, little dark wings and big friendly eyes, floating. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 0.35×, floating the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v2 · Lantern sprite**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a tiny floating sprite shaped like a paper lantern with small moth wings and a warm orange glow inside. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 0.35×, floating the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v3 · Flame moth**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a small fluffy moth familiar with flame-colored wing tips, a soft golden glow and curled antennae, floating. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 0.35×, floating the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v4 · Spark wisp**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a tiny teardrop-shaped wisp of warm fire with two bright eyes and trailing sparks, floating. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 0.35×, floating the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v5 · Crystal firefly**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a tiny firefly with a faceted glowing orange crystal body and translucent wings, floating. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 0.35×, floating the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

### Goblin King — Grasslands dungeon guardian (boss) (scale 1.5×)

**v1 · Crowned brute**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a huge muscular green goblin king with a jagged gold crown, a torn red royal cape, fur mantle and a giant spiked club. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.5× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v2 · Scheming tyrant**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a fat, clever goblin king on short legs with a too-big crown, jeweled rings, a purple robe and a scepter topped with a skull. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.5× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v3 · War chief**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a scarred goblin war chief in spiked iron armor with a horned crown-helmet, a war banner on his back and a cleaver. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.5× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v4 · Mad alchemist king**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a goblin king with wild hair under a lopsided crown, bubbling potion flasks on a belt and a glowing green goggle. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.5× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

**v5 · Bone throne lord**

```
Use the attached hero sprite as the exact style reference. Create ONE game sprite of a gaunt old goblin king wearing a crown of teeth and bones, a tattered cloak of hides and a staff with a burning green eye. Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. Size: about 1.5× the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.
```

## After the pilot

Once the style is locked on these 6, the same template covers the remaining ~59 characters in regional waves (Grasslands + village NPCs → Wetlands → Highlands → Ashlands + volcano → islands, sky, mounts, familiars), 5 concepts each.
