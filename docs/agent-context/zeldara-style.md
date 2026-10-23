# The Look, Sound and Voice of Zeldara — style context for agents

> **What this file is.** The visual and thematic style of *The Quests of Zeldara and Zeldor*, written as working context for an AI agent that makes prompts, images or cut-scene clips for the game. Read it together with `zeldara-saga.md`, which has the story. Everything here comes from the art direction built up over 70+ rounds of painted sprites, scenery and story panels (`src/js/07zs-sprites.js`, `07zt-scenery.js`, `07zt2…5`, `07zvc-video-clips.js`, docs 14, 16, 30, 32, 34). Last updated: round 73 (Oct 2026).

---

## 1. The look in one breath

**A bold, hand-drawn cartoon fantasy that glows.** Chunky chibi heroes with big teal eyes are drawn with thick dark outlines and flat cel shading. They sit in saturated Norse landscapes with dramatic skies, lit from the upper left by a warm sun and edged everywhere by **teal rune-light**. Runes, spirits and magic glow white-cyan. Fire glows warm orange. The false god's light is gold over black.

It is storybook, not grim: epic and a little melancholy, but always warm. It is **never pixel art, never 3D, never photoreal**.

---

## 2. Three layers of art (and which one a clip is)

| Layer | What | How it looks |
|---|---|---|
| **Game sprites** | Heroes, monsters, NPCs, mounts, familiars, fairies, gods, in sheets of poses | Bold cartoon game sprite on a transparent background. Thick near-black outline, heavier on the silhouette. Flat cel shading, 2–3 tones per material. Chunky chibi proportions (big head, compact body, oversized hands, boots and weapons). The view is top-down RPG, camera slightly above. |
| **Scenery** | Buildings, props, trees, rocks, ground textures, effects | The same line and shading, with "chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes". The view is a classic top-down RPG three-quarter view, about 45°. Ground textures are calm and low-contrast so the characters stand out. |
| **Story panels** (the cut-scenes) | 1536×1024 wide paintings (3:2), shown full screen with letterbox bars and a caption | **A wide cinematic painting in the game's cartoon style**: the same characters, outlines and teal highlights, but full painted scenes with deep skies, glowing light and a lot of detail. It "fills the whole image edge to edge like a wide film still". There is no text, frame or UI. |

**Cut-scene clips are made from story panels.** Each panel is the first frame of a clip of about 8 seconds, cropped to 16:9 (the full width; the band 40% of the way down the spare height, where the faces usually are). The clip must stay that painting, now moving.

---

## 3. The signature: light and colour

### 3.1 The rules every picture follows

- **Light comes from the upper left.**
- **Teal rune-light highlight** `#3fe6f2`: crisp shapes on the *upper-left edges* of hair, fur, cloth, metal, roofs, stone and leaves, "as if lit by teal rune-light". This is the style's signature.
- **Magenta-violet rim** `#c04be0`: a thin rim on the *lower-right shadow edges*.
- **Runes, crystals, magic, spirits and enchanted things** glow **white-cyan with a soft teal halo**. The game's rune blue is `#6fe3f5`.
- **Fire and lamps** glow **warm orange**.
- The palette is **saturated but limited**. In panels, warm golden or orange skies are set against cool blue-violet shadows, with cyan glows as the accents.

### 3.2 Colour meanings (keep these consistent)

| Colour | Means | Where |
|---|---|---|
| **Rune blue / white-cyan** `#6fe3f5` | True magic, souls, the twins' gift | Runes, bindstone glyphs, soul-lines, spirits, the twins' eyes as babes, the World Tree's light, Odin's one good eye |
| **Teal** `#3fe6f2` | Rune-light on the world | Edge highlights everywhere; the twins' eyes; Zeldara's brow gem |
| **Living green** (white and yellow flowers) | Life, spring, Freya | Freya's vines and gown, the land after the end, grass following the soul-lines |
| **Blue-white lightning** | Odin | His bolt that wakes every runestone |
| **Gold / white-gold** | Asgard's stone and spires — and the **false light** of Solmyrk | Asgard's architecture (good); Solmyrk's golden mask and wings (false) |
| **Black void, "black light"** | What is under Solmyrk's light | The crack in his mask; his third form |
| **Ember red / black iron** | Surtharn, the Binders, chains | Glowing chains on bindstones, lava, forges |
| **Warm orange** | Hearth, lamps, sunsets, fire | The village at night; the forges |
| **The four soul gems** | The realms | **Grovesoul** green (Grasslands) · **Tidesoul** sea-blue (Wetlands) · **Stonesoul** amber (Highlands) · **Embersoul** red (Ashlands). These are also the four gems on the Lodestar's ring, around its **blazing white star**. |

**Never gild the true gods.** Odin and Freya are warm and natural, *not golden-white and not masked*. Gold-and-mask means Solmyrk.

---

## 4. Recurring motifs

- **Runestones** are tall dark stones with a single glowing rune-blue glyph. Some stand in rings. The **Runestone Green** has the oldest stone, with the World Tree carved in it.
- **Bindstones** are runestones bound in heavy black-iron chains that glow ember-red where they bite.
- **Soul-lines** are thin lines of rune-blue light running across the land like a Norse tattoo. Together they form a **World Tree** (crown, trunk and roots seen from above). Close up, grass, small white flowers and a worn path start to follow them.
- **The World Tree** is the logo (a fractal World Tree in a rune ring) and the shape of the whole game.
- **Banners** are deep blue or red cloth with white or gold rune and knotwork emblems (snowflake-like sigils, diamond glyphs, a tree), hung from timber posts. They are common at the edges of panels.
- **Lanterns and candles** are hung on posts; warm orange.
- **White flowers** (small daisies) often appear in the foreground grass.
- **Waterfalls, mountains, misty valleys and dramatic clouds** are in almost every landscape.
- **Knotwork** appears on brooches, borders, banners and metal trim.
- **Two orbs joined like an infinity sign** are the gods' prison.
- **Do NOT use the valknut symbol** (three interlocked triangles), anywhere, ever.

---

## 5. The characters, as they must look

Keep identical faces, outfits, colours and proportions in every picture.

### The twins (the same age, about 16, and **the same height**; chibi, big teal eyes)

- **Zeldor** (boy) has spiky, tousled brown hair streaked with teal and big teal eyes. He wears a **moss-green hooded short cape** with a brown shoulder strap, a cream tunic, a brown leather belt with a square silver buckle and pouches, grey-olive trousers, big tan boots, and wrist wraps on bare forearms.
- **Zeldara** (girl) has **long auburn (red-brown) hair in two braids** with silver bead clasps and a braided leather headband with a **small glowing teal gem at the brow**. She wears a short teal-green mantle with a **pale fur collar** and a round silver knotwork brooch, a cream padded tunic with wine-red knotwork at the hem, a grey shirt, leather bracers, grey-olive trousers and wrapped boots with fur cuffs.
- In story panels they are usually small in the foreground, often seen from behind, looking up at the moment. When both appear, **they are the same size**.
- Many panels come in two versions, one for each twin the player chose.

### The gods (warm, natural, never golden or masked)

- **Odin:** very tall and broad, with a long silver-white beard braided with small gold rings. One eye is under a plain leather patch and the other glows soft rune-blue. He wears a wide-brimmed grey hat over long white hair, a deep blue cloak lined with grey wolf fur and edged with gold knotwork, and a mail shirt. He carries the ash-wood spear **Gungnir**, with a rune-carved leaf-shaped head, and has a **black raven** on his shoulder. He is kind, wise and weary.
- **Freya:** tall and radiant, with warm golden-brown skin and long red-gold hair in loose braids woven with white and yellow flowers. She wears a green-and-gold gown, a cloak of brown-and-gold **falcon feathers** like folded wings, the glowing amber necklace **Brísingamen**, and green-vine bracelets. She is warm, strong and joyful.

### The false god: Solmyrk, the Black Sun

1. **The Allfather's Mask:** radiant gold and white, a golden mask, light-wings, a crown of spikes (not too tall).
2. **The Cracked Mask:** the mask split down the middle, half radiant god and half black void. His light-wings are torn, and darkness shows in the tears. The stolen Gungnir still shines.
3. **The Storm That Ends the World:** colossal and almost all black. A mantle of thunderheads, wings of cloud and white lightning, a pale one-eyed mask, an eclipsed sun behind him.

### Surtharn, Tyrant of Muspelheim (a fire giant; black basalt, lava, molten light)

His six forms, in order:

1. the Molten Colossus, with a burning greatsword;
2. the Forge-king, with a giant hammer and an anvil-crown;
3. the Ash Tyrant, trailing chains of pale-blue spirit-light;
4. the Horned Jötunn, with curling horns and the Sword of Flame;
5. the Obsidian Warlord, in black glass armour over a glowing molten heart;
6. the Living Volcano.

### The builders and village folk

- **Bram the Builder:** stocky and bearded, in a flat cap and a leather work-vest, with a big hammer.
- **Mira the Mechanic:** young, with wild red hair and brass goggles, in work overalls with a tool belt and a big lever.
- **Dunn:** a dwarf forger with a big red beard and a leather apron, swinging a hammer at a glowing rivet.
- **Elder Runa** keeps the lore.
- **Pip and Wren** are village children (rosy, playful).
- After the end, the hamlets are full of families, and the children are of many heritages.

### The spirits

- They are **friendly, small, translucent human figures glowing light rune-blue**. They are ordinary people: a village woman in a shawl, miners, skalds, farmers.
- **Trapped,** they are chained, slumped and toiling with picks. **Freed,** they are relaxed and peaceful with eyes closed, rising and floating, then drifting away.
- They gather in rings on the Green.

### Others

- **Binders:** dark, hunched chain-keepers of fire that slink in the mist.
- **Fairies:** small and winged, five per realm. **Fairy monarchs** are angelic.
- **Familiars:** four small elemental companions (fire, water, nature, earth). They are *familiars*, never "spirits".
- **Monsters** follow each realm's mood: goblins and skeletons in the Grasslands, marsh creatures in the Wetlands, stone and mountain beasts in the Highlands, fire and ash creatures in the Ashlands. They fade into motes of light at the end.

---

## 6. Places, as they must look

| Place | Look |
|---|---|
| **The village** (on Mirror Lake) | Norse timber and stone houses with steep roofs, lanterns, flower boxes, carts and a pier. The **Glimmerhall** is a hall of pale carved stone and timber under a great glass dome with tall rune-etched windows glowing light blue and slender glass spires. Rooms are cosy and lamplit. The Home's study is crammed with books, scrolls and rune tablets. |
| **The Runestone Green** | A village green round the oldest runestone with the World Tree carved in it. Spirits gather in rings. |
| **Mirror Lake** | Calm and glassy, with reflections, mist, mountains and waterfalls around it. After the end, the **World Tree glows deep under the water** in rune-blue and gold, like a tattoo beneath the surface. |
| **Grasslands** (NE) | Rolling green meadows, wildflowers, standing runestones, farms, forests and sunrise light |
| **Wetlands** (SE) | Marsh, reeds, the wide silver **Silverrun**, herons, mist, mills. In its past, black water. |
| **Highlands** (SW) | Towering cliffs, mines, snow peaks, waterfalls. **The Great Scar** is a torn cliff of broken rock. |
| **Ashlands** (NW) | Ash-grey land under smoky orange skies, lava rivers, glowing embers. **The Cinder Chasm** is a deep gorge glowing with lava. |
| **Muspelheim** | A black volcano island. Inside are basalt caverns, rivers of lava, chains and toiling spirits. The **great hearth** has a huge anvil in a vast forge cavern. |
| **The four forges** | Dark forge-towers rising out of the sea on walled causeways, with glowing hearths |
| **Asgard** | A walled city of **white stone and gold** with columns and spires, in white, gold and cream. It is first seen in the sky through a ring of golden light, then as an island on the lake. Its feast hall has tall pillars, banners and statues, dim and dusty while the gods are bound and **alive and lit** after. |
| **The Bifröst** | A road of rainbow light: from the pier across the lake, and later up into the clouds |

---

## 7. Composition rules for panels and clips

- **The format is wide and cinematic:** panels are 3:2 at 1536×1024 and clips are 16:9. The image is filled edge to edge, like a film still.
- **No text, no captions, no labels, no logos, no frame, no UI.** The game adds the caption.
- The **hero is usually small in the foreground,** often from behind or three-quarter, looking at the event. The event is the subject.
- Use **depth**: a framing element in the foreground (banner, lantern post, flowers, rocks), the action in the middle, and a big sky and landscape behind.
- Faces are never huge close-ups; characters are readable but part of the scene.
- **Only the characters the moment needs. No extra people, no animal companions unless named.** (Past prompts had to forbid a stray lion and a centaur.)
- The look is **storybook-epic, not horror**. Even dark moments (the Ash Night, Solmyrk's void) keep the clean cartoon line and readable shapes.

---

## 8. Motion style (for the cut-scene clips)

**Every clip keeps** (the shared prompt, `ZVCLIP.DEF`):

> Animate this exact painting as one continuous cinematic shot of about 8 seconds. Keep the painted style, colours, lighting and composition of the image; the characters keep exactly the same faces, clothes and proportions. Gentle, slow camera movement; natural motion of cloth, hair, mist, fire and light. No text, no captions, no logos, no camera cuts, no new characters.

**Negative prompt** (for apps with the box, `ZVCLIP.NEG`):

> text, captions, subtitles, logos, watermark, extra people, new characters, face changes, distorted hands, camera cuts, scene change, photorealism, 3D render look, style change, flicker

**How things move in Zeldara:**

- **The camera** makes one slow move: a push-in toward the key thing, a pull-back to reveal, or a gentle glide along a line. There are no cuts, whip-pans or shaky cams, except a brief shake for impacts (Dunn's rivet, the Stone-Fall).
- **Magic flows; it doesn't flash.** Light runs *along* lines (soul-lines, roots, beams), glows **pulse slowly like breath**, sparks drift and fade. Big moments get one bright flare, then they settle.
- **Spirits** rise gently, eyes closed and at peace, like something weightless.
- **Nature** moves: cloth and cloaks stir, hair lifts, mist creeps, waterfalls fall, rivers glitter, flames flicker, lanterns sway, banners ripple.
- **Characters act small**: a raised hammer, a pulled lever, a finger tracing a rune, a cloak catching the wind. Their faces and proportions stay exactly the same, and they don't talk.
- **The mood follows the act:**
  - the opening is quiet and tender (rain calming, a basket rocking);
  - the realms' disasters are heavy and slow (ash falling, dust billowing, black water surging);
  - the builders are triumphant and practical;
  - the forges are hot and roaring;
  - Asgard is radiant, then dark;
  - the end is warm and joyful (vines racing out, lanterns, children running).

Each clip's own motion lines live in `src/js/07zvc-video-clips.js` (`ZVCLIP.CLIPS`) and in the Lab tab **Cut-scene clips**.

---

## 9. Sound

- **Music:** Nordic folk meets dark electronic. Nyckelharpa, hardanger fiddle, tagelharpa, frame drums and war drums over deep sub bass, dark synth pads and pulsing electronic arpeggios. Cinematic and mysterious; "ancient halls".
  - The gentle pieces (the village, nights, the last saga) are softer: lyre, wooden flute, warm low bass, a subtle electronic touch.
  - Dungeons use Kris's remix, with an intense theme and even deeper bass.
- **Voices** appear in some pieces only, and are always wordless:
  - an ethereal **elven woman's** vocalise, tender and heartbreaking;
  - deep **dwarven men's** humming and chanting over low drums;
  - a slow, piercing **solo violin**.
- **Clips are silent.** The game's music plays under the cut-scenes.

---

## 10. Words: how Zeldara reads

- **The title** is *The Quests of Zeldara and Zeldor*. The tagline (no spoilers) is: "Four realms, one broken land. Free the bound spirits and unravel the fragmented past to liberate Runeheim."
- **Captions and lines** are short and plain, with a saga cadence: one or two sentences, concrete images, an em-dash for the turn. For example: "The chains fall away — and for the first time in years, a soul of Runeheim is free."
- Avoid modern slang, jokes that break the mood, and long exposition. Spirits speak one memory each. The fairy monarchs speak in riddles and never name the gods.
- **Names and spellings:**
  - Runeheim, Muspelheim, Asgard, Bifröst, Valhalla, Fólkvangr
  - Mirror Lake, the Runestone Green, the Silverrun, the Great Scar (never "scarp"), the Ember Wall, the Cinder Chasm
  - the Lodestar, Godsbane
  - Solmyrk (the Black Sun), Surtharn
  - Grovesoul, Tidesoul, Stonesoul, Embersoul
  - Brokk, Hissa, Krag, Sinda
- **Typefaces:** Uncial Antiqua for titles, Eagle Lake for headings and labels. The wordmark is a ringed Z in Cinzel Decorative.

---

## 11. Hard rules (do not break)

1. Never pixel art, never 3D render, never photoreal. Bold hand-drawn cartoon with thick outlines and flat cel shading.
2. **No valknut symbol.**
3. Do not draw or imitate characters from other games (in particular **Hollow Knight / Silksong**). Inspiration images are for style only.
4. **The twins are the same age and the same height.** Zeldor wears a green cape and Zeldara has auburn braids and a fur collar. Both have teal eyes.
5. **Odin and Freya are never golden or masked.** Gold plus mask means Solmyrk.
6. "Spirit" means the trapped souls only. Familiars are familiars.
7. No text, captions, logos or UI inside any image or clip.
8. No characters the moment doesn't name, and no stray animals.
9. In anything a player sees before the feast hall, keep the secrets: why the twins have their gift, who sent the basket, that the masked one is an impostor, and the gods' names.
10. In a clip, keep the painting: same faces, same colours, same composition; one continuous shot.
