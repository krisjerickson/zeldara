# 38 — The story frames in the game, and making the montage videos (round 82)

Kris: "as i develop the videos, lets get the current image panels and text in the game. make sure there is enough time to read everything" — and: "i'm also not certain on the process for requesting the videos at this point, walk me through that".

## 1. The story frames in the game

- **What plays:** every story moment now plays its cut-scene's painted frames one by one, with the frame's line under the picture.
  - Each frame is the version for the hero you play; frames without a hero, or with both twins, are shared.
  - These replace the old one or two panels for that moment.
  - A cut-scene uses its frames only when every one of them is painted. Otherwise the old panels play, as before.
- **Time to read:**
  - Every picture holds for 3 s plus about 75 ms per letter of its line, from 5.2 s up to 16 s. A 60-letter line holds about 7.5 s; a 120-letter line about 12 s.
  - The clock starts only once the picture is on screen.
  - A click, Space or Enter goes on at once; Esc or "Skip ▶▶" ends the cut-scene.
  - "3 / 12 · click or Space to go on" shows at the bottom left.
  - The line now sits in the black band under the picture, so it never covers the painting.
- **Where each cut-scene plays:**

| Cut-scene | Plays at |
|---|---|
| The opening | a new game |
| The Long Quiet, the Black Tide, the Stone-Fall, the Ash Night | each realm's old disaster (as before: the Grasslands at its 10th spirit, the others at their first) |
| The gate shut / two lights | the 20th / 30th spirit |
| The first spirit freed | the first spirit freed |
| Bram, Mira, Dunn — and now Vela | each builder's crossing (Vela's had no panel before; it plays now) |
| The Lodestar is made | the Lodestar in hand |
| Muspelheim falls | as Muspelheim sinks (after the escape run) |
| Asgard comes down | the sky opening (frames 1–3), Asgard on the lake (4–6) |
| Your twin finds the word | the lesson |
| The Bifröst rises | setting the Lodestar in the pier's notch, before the bridge builds |
| Surtharn's 6 forms, Solmyrk's 3 | each form, in the fight |
| Solmyrk defeated | after his fall (1–7); the golden doors (8) |
| The feast hall | the orbs (1–2), the cast (3–5), the gods free (6–9) |
| The truth | after the gods are free |
| The spirits go home | the circle and Godsbane (1–3), the Bifröst (4), the spirits (5), the gods lead them (6–10) |
| Lightning and vines | dawn (1), the lightning (2–3), the spring (4–5), the land (6–12) |
| The celebration | after the land turns green |
| The credits | the end ("Your journey goes on") |
| The World Tree | all forty spirits, after the end |

- **The files:**
  - One picture per cut-scene, `assets/story/<scene>.webp`: its frames at 1280×720, four to a row. There are 34 sheets, about 69 MB in all; each one is fetched only when its moment comes.
  - `tools/video/story_atlas.py` makes them, remaking a sheet only when one of its frames was painted again. The game code is in `src/js/16w-story-frames.js`.

## 2. Making the montage videos — the process now

1. **The pictures are ready.** Every cut-scene has a folder `sprites\storyboards\<scene>\<zeldor | zeldara | all>\` holding:
   - `01.png, 02.png …` in order, cropped to 16:9;
   - `montage.txt`, with the words for each shot and the prompt.

   There are 59 folders (33 cut-scenes, most with a Zeldor and a Zeldara version). Claude keeps them up to date on your PC after each round of pictures, so you do not run anything for this. `storyboards.ps1` needs a Python image library your Windows Python does not have.
2. **Make one clip per shot** in the video app. Most apps make a clip from one start picture, so this is the dependable way:
   - start image: `NN.png`;
   - prompt: that shot's words in `montage.txt`;
   - 16:9, about 5 seconds;
   - save it as `<scene>_<who>_<nn>.mp4`, for example `spirit_zeldara_05.mp4`.

   If your app can take all the pictures of a folder at once in order, paste the VIDEO prompt instead and save the whole thing as `<scene>_<who>.mp4`.
3. **Shared shots: make once, save twice.** A shot marked *[same picture in both heroes' versions]* in `montage.txt` is the same picture in the Zeldor and the Zeldara folder. Make it once and save it under both names (copy the file).
4. **Take them in.** Leave the clips in your Downloads and run `.\tools\video\video1.ps1 -Intake`. It:
   - picks the clips out by their names;
   - joins each montage's shots in order, with a short fade, once all of its shots are there;
   - saves the result as `assets\video\sb_<scene>_<who>.mp4` (1280×720, small, silent — the game's music plays under it);
   - builds.

   A montage with shots still missing waits, and it says so.
5. **Tell Claude.** The montage then plays in the game in place of that cut-scene's frames, with each shot's line under it at the right moment.

The 22 single-panel clips from round 73 (Lab → Cut-scene clips) were for the old panels, which the story frames have now replaced. Skip them.

**Where to start:** start with one cut-scene end to end (the first spirit, `spirit_zeldor`: 12 shots) to judge the app and the look before doing the rest.
