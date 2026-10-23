# 36 — Gentler sounds, and the twin's library (round 80)

Kris: "the sound effects in the game so far are to harsh and piercing. The "page turn" sound effect between image frames sounds like a hard door slam, and when you hover and click over buttons, it's too hard and harsh of a sound. we need to make these much more gentle, somewhat ethereal to go with the epic and godly theme of the game. Let's plan to remake these. Also, the other twin studying needs to be in a separate library building … ok to have another bed in your house, and the other twin sleeps there at night … you should be able to enter it like other buildings. make requests towards this."

He added three things in the same conversation:

- "skills should also have their own sounds"
- "the sounds for not being able to use a skill needs to be much lighter and smoother"
- "when mounting, we should have a sound like the animal you mount"

**His answers (docs/08 › Open questions › Round 80):**

- **L1:** remake every sound effect, and pick between the options in the Lab.
- **L2:** the library goes near your Home.
- **L3:** it is a Norse timber saga-hall.
- **L4:** the twin is in the library by day and in a second bed in your Home at night.

## 1. The sounds

**Now (built):** the harshest sounds play softer and muffled until their new takes are picked. That covers:

- the page turn between cut-scene frames;
- button clicks, menu open and close, tabs;
- notices, saving, buying, talking;
- "can't do that" and "not enough mana".

Each plays at about a quarter to half its volume through a low-pass filter (`ZAUD.SOFT`, `04c2` `o.lp`).

**The remake (requested):** every sound effect is re-described the gentle way (`src/js/07zau2-ethereal.js`, `ZAUD.ETH`). They all share one style, `ZAUD.ETHSTYLE`:

> gentle, ethereal fantasy game sound effect for a mythic Norse world: soft, airy and shimmering, warm and rounded, a faint magical sparkle and soft reverb tail; smooth quiet attack, never harsh, sharp, clicky or piercing; no music, no voices

Some examples:

- **The page turn:** "a very soft, airy whisper of a parchment page turning with a faint magical shimmer — light and gentle, never a knock or a thud".
- **A click:** "a tiny, soft, airy tick like a dewdrop on glass".
- **Can't use a skill:** "a very light, smooth, airy fizzle like a soft breath of fading sparkles".

**New sounds:**

- **Each skill** (13, `sfx_sk_*`): sprint, roll, petal step, blink, war stomp, whirlwind, shield bash, smoke bomb, berserker, second wind, time slow, phantom veil, meteor.
- **Each spell** (16, `sfx_sp_*`).
- **Each mount's call** as you climb on (11, `sfx_mt_*`): the horse's whinny, the alligator's grunt, the boar's snorts, the unicorn's bright whinny, the dragons' rumbles, the eagle's cry, the phoenix's song, the serpent's hiss, and the rest.

The game plays them as soon as they are in (27z); until then the old ones play.

**The numbers:** 147 effects, two options each, 294 takes, about 13,600 ElevenLabs credits (a Creator month has about 121,000). Send them with `.\tools\audio\audio2.ps1`. The takes are saved as `audio\incoming\<id>.e1.mp3` and `.e2.mp3`, beside today's, and stay out of the game until picked.

**Picking (next, once they are in):**

- Lab → Music & sound gets a player per effect: **today's take · option 1 · option 2**, each with ▶. Kris picks one per effect.
- The intake then puts the picked take in the game.
- The softening stops for any sound whose new take is picked.

## 2. The library

**The building (requested, wave 90, `src/js/07zt7-art-r80.js`, `.\tools\sprites\round80.ps1`):**

- **Look:** a Norse timber saga-hall. It has dark carved timber on a fieldstone base, a turf-and-shingle roof with dragon-head gable ends, tall rune-lit windows, a carved open-book sign, and scrolls and a reading bench by the door.
- **Two takes to pick from:** A is the gable with its door facing you; B is a little wider, with a small rune-glass lantern tower.

**Inside (requested):**

- **Furniture:** a tall bookshelf, a low bookcase, a scroll rack, rune tablets, a saga lectern, a reading table, a map table with the map of Runeheim, a library ladder, a candle stand and a saga stone.
- **On the walls:** a World Tree panel, four realm banners, a rune window and a star chart.

**Your Home (requested):** a second bed. It is empty and made by day; at night the other twin is asleep in it with a book on their chest, in a Zeldor and a Zeldara version.

**How it will work (to build once the pictures are in):**

1. **Placement:** the library stands near your Home, on room made for it in the village plan.
2. **Entering:** you go in through its door like the other buildings (a `library` interior in `07v-interiors.js`).
3. **By day:** the other twin sits at their desk inside, using the painted picture from round 78 (`twin_study_m/f`). You talk to them there with [Tab], and Godsbane is taught there.
4. **At night:** the twin is asleep in the second bed in your Home.
5. **Outside:** the desk outside the Home goes.
6. **After the end:** the twin joins the celebration on the Green, as now.
