# 79 — Cut-scene looks, round two; the world, revamped; four new skirmish pieces (round 124)

## Cut-scene looks, round two
Kris: "All of the pulse, storybook and dream ones are very bad … Keep all of the 'saga' ones … create 3 new varieties … different types for each different video … take elements from [Saga] but play around with different ways to cut and edit … We also need text to come out during each image, which is paced with how you would read it. Some images are also OK not having any text".

**Research first.** I studied two sources:
- **Image-based cut-scenes:** Elden Ring's painted prologue, the Ken Burns effect, motion comics, chapter cards and text on black.
- **Film editing:** match and zoom-through cuts, L-cuts, cross-cutting and split screen, freeze-frames, smash cuts, wipes, and changes of aspect ratio.

The lessons:
- Keep each painting a distinct beat in a clear order.
- Let the camera's move direct the eye.
- Hold some shots so the picture can be taken in.
- **Reading pace:** Netflix allows adults at most 17 characters a second, with each event lasting 0.8–7 s.

**Saga is kept** for every cut-scene: the same video, with the new word timing. Each cut-scene has three new looks of its own, fifteen in all (`tools/video/cut_looks2.py`, LOOKS2). Every one is built on Saga (letterbox, teal-and-orange grade, grain, grand camera):

| Cut-scene | Looks |
|---|---|
| The first spirit freed | **One unbroken take** (long dissolves while the camera keeps travelling) · **The frame breathes** (the letterbox opens for reveals and narrows for faces) · **Light-fall** (sweeping light shafts, rune-blue lens streaks) |
| Bram's bridge | **Motion comic** (shots as panels, revealed as you read; the last grows to fill the screen) · **Zoom-through** (dive into one painting, out of the next) · **Detail first** (every shot opens on a detail and pulls back to the whole) |
| Mira's lift | **Elden prologue** (fades from black, very slow push, drifting embers and dust) · **Rack focus** (soft → sharp as the words come → soft) · **Split screen** (two shots side by side, then one slides across) |
| Dunn's bridge | **Strike & freeze** (moves that land and hold; a white flash and a jolt on the blows) · **Fire and dark** (lit out of the black by fire-light flickers; smash cuts to black) · **Golden epic** (a warm golden grade, anamorphic streaks) |
| Vela's passes | **Breathing room** (the slowest; the first picture of each frame wordless; the words carried across the cut) · **Sky wipes** (wipes in the camera's direction; curtain wipes between frames) · **Chapter cards** (each frame's words alone on a dark card, then the pictures play silent) |

**The words, in every look, Saga included:**
- Each line is split into its phrases (at sentence ends, commas, colons and dashes; a phrase over 9 words is split at its most natural point).
- The phrases are shared out over the frame's shots and build up on screen one after another, at about 14 letters a second and never under 1.5 s a phrase. They fade before the cut.
- **Wordless shots:** the wide that opens a frame and the blow itself carry no words, so 56–87 % of each video has words on screen.
- The words are not burned into the video: each edit carries `cues` and the Lab lays them over it. The game can use the same cues later.

**In the Lab:**
- Cut-scene looks shows four cards per cut-scene (Saga + 3), with the words over the picture; ⛶ full screen keeps them.
- Picks: ★ the look for each cut-scene (`cutlook-<scene>`), ♥ a style to try on the other cut-scenes (`cutstyle-<look>`), and notes.
- The 20 videos (12–18 MB) are in the Lab's asset store. The 15 Pulse, Storybook and Dream videos are still stored there, unused; they can be deleted.

## The world, revamped (new Lab tab)
Kris: "are there visual elements from [the cut-scene images] that we can better incorporate into the overworld … Do a full analysis … make a portion of the lab for me to consider options".

**The analysis** — 7 screenshots of the world (summer, the HUD hidden) against 107 cut-scene shots:

| | World | Colour grade only | Cut-scenes |
|---|---|---|---|
| Saturation | 0.36 | 0.66 | 0.60 |
| Vivid colour | 8 % | 56 % | 59 % |
| Deep shadow | 3 % | 33 % | 36 % |
| Contrast | 0.10 | 0.10 | 0.23 |
| Colourfulness | 18 | 22 | 37 |

- The paintings live in deep shadow lit by glowing light (lanterns, runes, lava, the aurora). The world has almost no shadow and no light sources, so it reads as a pale, flat field under a grey haze.
- A grade alone recovers the saturation and the shadow. The contrast and the colour variety need light, things on the ground and big places.

**Fifteen options in five groups.** Each is a TODAY → PROPOSED slider on a real screenshot (mock-ups by `tools/world/world_looks.py`), with its inspiration, how it would be built, effort, new paintings and cost on phones:
1. **Light and colour:**
   1. realm colour grades;
   2. painted light and shadow;
   3. golden hour and dusk;
   4. night of lanterns and runes;
   5. the aurora over the land.
2. **Air and weather:**
   6. living air by realm (fireflies, mist, snow, embers);
   7. cloud shadows and sun shafts;
   8. painterly depth.
3. **Water and ground:**
   9. deep, living water;
   10. richer ground (painted plants, patches).
4. **Places and set-pieces:**
   11. landmarks from the cut-scenes;
   12. vista moments (the camera eases into a cut-scene panorama);
   13. adventure sites worthy of their stories (exteriors repainted, a beam from unconquered sites).
5. **The story in the world:**
   14. the land remembers (realms start muted; each freed spirit sends lines of light and restores colour);
   15. cinematic moments in play.

**Picks:** ✓ / ? / ✕ and a note per option (`worldlook-<id>`), plus an overall note (`worldlook-all`).

## Four new Skirmish pieces
Kris: "we also need more options for skirmish music, as fighting happens often. Let's create new prompts for 4 new ones".
- The prompts are in Music & sound, under the round-123 note, with Copy buttons for Title, Style, Lyrics and Exclude.
- They are takes of `mu_fight`. The game plays a cue's takes in turn (`ZAUDIO.music`), so five skirmish pieces will rotate.

| Take | Name | Kind | BPM |
|---|---|---|---|
| mu_fight.b | Shieldwall | Nordic folk-electronic; nyckelharpa and bone flute, a low male choir humming, envelope-filter bass | 110 |
| mu_fight.c | Ember Reel | Celtic electronic reel; fiddle and uilleann pipes, mouth music, slap bass | 120 |
| mu_fight.d | Ironwood | dark folk-electronic in 7/8; hurdy-gurdy, big toms, throat singing, fretless and fuzz bass | 108 |
| mu_fight.e | Skyblade | cinematic adventure; electric violin hero, lute, brass, valkyrie soprano, tapping bass | 124 |

- **Rules:** all medieval midcore, ≤125 BPM, wordless voices, with the usual exclude list (no hardcore, drum and bass or harsh distortion).
- **After making them:** save each as `mu_fight.b.mp3` … in `audio\incoming`, then tell Claude.

Tests: `test_round124` (11); `test_round122` updated.
