# 95 · Round 138: Flow prep, the new names, and the music's pace

## The cut-scenes, ready for Flow
Kris asked me to check every start picture, read every line, and get Flow ready.

### The pictures
I checked all 364 start pictures in the cut-scenes. I found **32 problems across 90 frames**, plus two that are already fixed.

| Kind | Where |
|---|---|
| **Chains far too big** — anchor-chain links, chains across the sky, red-hot chains as thick as a leg | The opening frame 4; the first spirit, in eight frames; the Long Quiet frame 7; the gate frame 2 (a golden X); the escape frame 2 |
| **A child before the first cry** | The opening frame 11 (Zola's version); Asgard frame 3; the celebration feast (frame 1) |
| **The picture does not match its line** | The first spirit frame 2 (she already floats free); the Black Tide frame 6 ("it came up through", but it shows chains from the sky); the Stone-Fall frame 1 (calm mines shown as a disaster) |
| | Surtharn: the Ash Tyrant is still lava; the Obsidian Warlord is not glass; the horns appear before they "tear from his brow" |
| | The escape: the Lodestar vanishes from the hero's hands |
| | Asgard frame 6: the notch is empty |
| | Solmyrk 1 frame 6: Zoldor raises a sword, not the Lodestar |
| | Solmyrk defeated frame 2: the storm is not torn |
| **Wrong place** | All six Surtharn fights show an open sky, northern lights and snow, but the fight is "in the deepest hall" |
| **Repeats** | The Stone-Fall frames 4 and 5; Solmyrk 1 frames 1–5; Solmyrk 2 frames 1–5; Solmyrk 3 frames 3–5 (the eclipse is barely visible) |
| **Gods named before they are freed** | The orbs show Odin and Freya plainly. The fix: two sleeping shapes |
| **Look** | Zola loses her braids in two frames; the spirits drawn as skulls in Surtharn 3 |
| | Vela's 18th-century admiral look: optional, kept as a separate list, `r138_vela` |

**Already fixed, without painting:**
- **Bifröst frame 4 (Zola)** was a damaged file.
- **Village frames 7–10** were copies of frames 5 and 6. The four real paintings existed but had never been copied in.

**How to repaint:**
- Each flagged frame has its change added to its painting words (`src/js/07zt6z-flow-fixes.js`).
- The repaint list is `r138_flow`.
- Run `.\tools\sprites\redo.ps1 -List r138_flow`, then `.\tools\video\storyboards.ps1`, then `python tools/video/flow.py`.

### The words
I propose new wording for **24 lines**.

**Repeats:**
- The opening's "one would go out… / one twin went out — and the other stayed".
- The four builders' identical cage openings and "Free!" lines.
- "Under the northern lights" three times.
- "Godsbane — into…" twice.
- "Runeheim is green again" twice.

**Flat or doesn't fit:**
- Lines that only repeat the frame's title.
- "Now — or never".
- "infinity sign".

**Timeline:** the Black Tide is now "**three** years after the Stone-Fall". This is already in the game.

### Flow, one shot at a time
- `python tools/video/flow.py` creates `video_requests\flow\<NN>_<scene>_<who>\<KK>\` for every shot (**368 shots**). Each holds:
  - `start.jpg`;
  - `PROMPT.txt` — what happens in order, how it ends, the camera, "one shot, no cuts, no text, no speech".
- A shot waiting for a repaint has a **WAIT** file in its folder.
- **In Flow:**
  1. Choose Frames to video.
  2. Set the first frame to `start.jpg`.
  3. Paste the prompt and make an 8 s clip.
  4. Drop the download into the same folder.
- **Intake:** `.\tools\video\video1.ps1 -Intake` cuts each clip to the time its line needs (3–6 s, about 19 minutes in all) and joins a cut-scene once every shot is in.

## The new names (Kris's picks)
- **Realms:** Grasslands → **Gildenmark**, Wetlands → **Fernheim**, Highlands → **Cragland**, Ashlands → **Cinderheim**. These are Kris's own names.
  - People from them: Gildenmarker, Fernheimer, Craglander, Cinderheimer.
- **Village:** **Mirrowby**. The little map now shows just the realm, and "The Green" in the village.
- **Everything else Kris ticked:**
  - all 40 lands, with "Waystone Road" as Kris wrote it;
  - 12 islands;
  - 13 sites — Rivendell Twilight Hall is now **The Dusk Hall**;
  - Stormspike and The Nova Dome;
  - **Vargrim** (was Xal'zor) and **Thane Gravelstone**;
  - the **Clinker Forge**.
- **How it was applied:** in every line the player reads (`tools/names138.py`). The painting and music requests keep the old words. Each land keeps its old name as `was`, so monsters still choose their land by its old words.

## The music's pace
- **Measured:** all 41 songs, using librosa. For each I took the tempo asked for, the tempo measured, the **felt pulse** (the fastest steady beat), how many notes a second, and how intense that moment of the game is.
- **Finding:** the tempos asked for are fine. But the shared prompt ending ("driving electronic drums … synth arpeggios … energetic, grand") gave the calm songs a double-time beat. For example:
  - the dungeon theme is 72, but its hi-hats run at 144;
  - the mage towers are felt at 152;
  - the Fernheim night at 144.
- **18 songs are flagged.** Each can be played in the Lab at today's speed, 92 % and 85 % (time-stretched, pitch kept). Kris chooses keep, 92 %, 85 % or remake calmer.
- **From now on:** Rest, Calm and the fast-feeling exploring songs are requested with a half-time ending: "a soft sparse pulse, no busy hi-hats or fast arpeggios, lots of space". This is in `src/js/07zau9-calm.js`.

## The world, revamped 5
- **Banners:** the golden horned deer was the take-4 frame baked into the picture I put the banners on. Each banner is now shown over a clean game picture, with a 5-second clip of how the game shows it. In the Lab:
  - a note box for each banner;
  - full screen with ← → and Esc.
- **Your eight ✓ ideas** are now painting requests: `r138_world`, 25 sheets, 123 pieces.
  - set-pieces;
  - cliffs, banks and falls, plus the Great Scar's own cliff;
  - a world beyond the edge;
  - skylines;
  - roads;
  - little scenes;
  - forests;
  - water.
- **The landmarks again** (`r138_landmarks`):
  - wider;
  - spanning the whole river or lava;
  - only the bridge painted, so the game's water shows underneath;
  - Mira's lift without its cliff, with a wide cage for you and your mount, plus the cage's frames and the turning wheel.

## NPC lines
- **The Gildenmark fairies** now have 40 lines each, and each has a ten-part tale. The tale is told in order, every other talk, once both of her spirits are free:
  - Primrose: the mended slate;
  - Bramble: the bench on the hill;
  - Clover: the missing day — 10,227 days, the new timeline;
  - Linnet: a song for the living;
  - Sorrel: four leaves.
- **Next:**
  - the other 15 fairies;
  - the Binders (Surtharn's reward);
  - the monarchs and the feast;
  - familiars;
  - great spirits;
  - castles;
  - island traders;
  - mages.

## Next round
- The first ten minutes (Kris ✓ all seven).
- The light-and-air layer.
- Placing the world paintings when they are in.
- Fitting the landmarks.
- More NPC lines.

## For Kris to run
```
.\tools\sprites\paint.ps1 -List r138_world
.\tools\sprites\paint.ps1 -List r138_landmarks
.\tools\sprites\redo.ps1 -List r138_flow        (after you ✓ in the Lab, or all of it now)
python tools/video/flow.py
```
