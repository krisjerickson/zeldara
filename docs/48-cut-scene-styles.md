# 48 — Cut-scene styles: what makes a great one, five ways to prompt Kling, ten first tries (round 92)

Kris: "i'm still not set on the cutscenes … Kling can take a very long prompt. Study video game cut scenes and what make especially good ones, and come up with 5 very different types of prompts … full screen text pauses (screen is black except for text … at a reading pace) … 10 different initial ideas for me to choose 5 from … I still think we should feed it all the images … but we might want to open up their algorithm a bit more."

## What makes a great cut-scene
1. **One job.** It reveals, rewards, warns or turns the story; if it tries two, cut one ([Game Developer, "How to build a better cutscene"](https://www.gamedeveloper.com/art/how-to-build-a-better-cutscene)).
2. **Short, then shorter.** Ours are 20 s a part.
3. **Show, don't say.** Words carry what the picture can't: the past, the meaning, the stakes. "Dialogue is for subtext"; keep lines brief and never repeat them ([Supergiant, writing Bastion](https://www.supergiantgames.com/blog/in-depth-writing-bastion/)).
4. **Rhythm and contrast.** Vary wide and close, fast and still, loud and quiet. A held moment after action is what makes the action land.
5. **One unforgettable image.** Build up to it and hold it.
6. **The music leads.** Cut to its phrases and land the big moment on a downbeat. Our music plays under every cut-scene; Kling's sound is never used.
7. **Begin and end in play.** Hand control back with the next goal clear.
8. **Respect the player.** Skippable, never repeated, and in the world's own voice.

The touchstones are:
- Elden Ring's painted, narrated opening (still tableaux brought slowly to life);
- Hollow Knight's text on black;
- God of War (2018)'s single unbroken camera;
- trailer-cut boss reveals;
- the wordless prologues of Journey and Ori.

## Kling, as it stands
- **Keyframes mode** takes all of a scene's pictures in order, named image1.png … and called @image1 … in the prompt.
- **Prompt length.** Earlier prompts were cut to about 2,400 characters. The new ones run 1,900–3,600 characters on purpose.
  - The earlier problem with a 3,900-character prompt was not its length. It **re-described the pictures' content**, so Kling invented new scenes.
  - The new prompts describe *style, camera, motion, light, feeling and freedom*, and leave the content to the pictures.
  - If Kling ever cuts a prompt short, its box has a limit: tell Claude the number. API documentation for Kling's Omni model gives 1,700 characters and up to 7 reference images ([useapi.net](https://useapi.net/docs/articles/kling-omni-bash)); the website's Keyframes box has taken more.
- **Kling's own advice for 3.0** ([fal.ai guide](https://blog.fal.ai/kling-3-0-prompting-guide/)):
  - define the subjects first and keep their wording the same;
  - give each shot its framing, subject and motion;
  - treat an input image as an anchor and describe how the scene changes from it.

## Five ways to prompt Kling (each feeds it every picture)

| Style | Freedom | How it uses the pictures | Cutting | Best for |
|---|---|---|---|---|
| **Living Painting** | ●○○○○ | Each picture *is* the shot, brought to life with parallax, weather, breath and small gestures | One picture per shot, long soft dissolves | Lore, memories, quiet moments; the safest way to keep the pictures exact |
| **Director's Cut** | ●●●○○ | The pictures are key frames and the visual bible; Kling adds coverage (wides, close-ups, reactions, inserts) of the same people and places | 3–6 cuts per picture, cut on action, shot-reverse-shot | People doing things together |
| **One-Take Journey** | ●●●○○ | The pictures are waypoints of one camera flight; Kling invents the spaces between them | No cuts at all | Travel between places and worlds |
| **Rhythm Montage** | ●●○○○ | The story order; Kling may cut back, punch in and re-frame | Beat cuts at ~115 BPM, speed ramps, impact frames, the last picture held longest | Boss reveals, battles, escapes |
| **Mythic Visual Poem** | ●●●●● | Inspiration and character references; Kling may interpret, combine and transform; it must end on the last picture | Flowing, dreamlike transformations | The big mythic moments |

Every prompt carries the same world description and the same **keep-out** list:
- anything modern (umbrellas, glasses, phones …), and text, captions, logos;
- photorealism, new people, changed faces, warped hands;
- no speech.

## How the words appear (Lab → Cut-scene styles)
The opening's first part plays three ways, with the game's music under it:
- **Under the picture** (today).
- **Text cards between shots.** The screen goes black and the line appears at a reading pace (about 230 words a minute, then a pause); the shot plays; then the next card.
- **Prologue cards, then the film.** All the lines first, on black; then the montage with no words.

The words appear **letter by letter**, **word by word**, or as a **whole line fading in**. ☆ the one you like (`cuttext-<mode>`, `cutreveal-<how>`).

## Ten first tries — ☆ five (`cutidea-<id>`)
Each try is a whole scene: every one of its pictures in one 20-second video, in the Zeldor version where there are two. The folders `video_requests\S01_…` to `S10_…` hold the pictures (image1.png …), PROMPT.txt and the "SAVE AS" name.

| # | Try | Style |
|---|---|---|
| S01 | The Long Quiet (7 pictures) | Living Painting |
| S02 | The truth about the twins (7) | Living Painting |
| S03 | Your twin finds the word (7) | Director's Cut |
| S04 | Muspelheim falls (7) | Director's Cut |
| S05 | The sky parts — up to the gate and back (6) | One-Take Journey |
| S06 | The Bifröst rises (7) | One-Take Journey |
| S07 | Surtharn rises (6) | Rhythm Montage |
| S08 | The Storm That Ends the World (6) | Rhythm Montage |
| S09 | The opening, part 1 (6) — the same pictures as the video you liked, set free | Mythic Visual Poem |
| S10 | Two lights in the dark (6) | Mythic Visual Poem |

**Tools:**
- `tools/video/kling_styles.py` makes the folders and the Lab's list (`lab/src/js/79o0-cutstyles-data.js`).
- Lab tab: `lab/src/js/79o1-lab-cutstyles.js`.
- Test: `tests/test_round92.py`.

**Next:** make the five you pick and drop each video into its folder, then run `video1.ps1 -Intake`. The results go side by side in the Lab. The style that wins becomes the template for the remaining cut-scenes, and the text mode you pick goes into the game's cut-scene player.

## Round 92b — Kris's notes, and one video tried fourteen ways

**What Kris said**
- **The video:** "much better, but we actually need to make it more like 40 seconds in total".
- **The words:** "under the picture is best, but the text area needs to be a bit bigger … text fading in in blocks, like you would read a sentence fragment … cinematic with fading in and out effects … the first and last text blocks can be their own screen-wide panel. Play around with 5 new options … scale timing for each montage video to allow you enough time to read".
- **The styles:** "10 different styles to consider for 1 single video … Don't discard the ones you generated".
- **Story-led:** "options where each of the images is inspiration only, and there is a continuous story going throughout … focus on creating the story line for kling to follow".

**The opening at 40 s:** Lab → Cut-scene videos → C. Made the same way as B, with motion-interpolated frames.

**The words: five ways, all under the picture.** The text area is bigger (about 120 px, 23 px serif).
1. **Fragments that build.** Each part of the sentence fades in and rises into place; the whole line fades out before the cut.
2. **One fragment at a time.** Slow crossfades, like a trailer.
3. **Cinematic blur-in.** The line goes from blur and wide spacing to sharp, then back.
4. **Lines of verse.** Short lines, stacked.
5. **Glow and embers.** Each part glows rune-blue, then settles; at the end the words drift up and burn away.

**Timing and panels:**
- A switch puts the **first and last lines on their own full-screen panel**.
- **Reading pace:** each shot is slowed (to half speed at most) until its line can be read, at about 1.4 s plus 0.36 s a word. The Lab shows the total. The opening is 42 s at reading pace, or 55 s with the two panels.
- Picks: `cuttext2-<id>`, `cutpanel-on`.

**One video in fourteen ways** (the opening, part 1: the same six pictures each time; folders `video_requests\O01 … O14`):
- **Ten styles, where the pictures are the shots:**
  - the five from round 92: Living Painting, Director's Cut, One-Take Journey, Rhythm Montage and Mythic Visual Poem;
  - five new ones: **Visions in the Fire** (the tale rises out of a hearth fire), **The Woven Saga** (a tapestry comes alive), **The Rune-Bound Book** (pages come alive and turn), **The Carved Runestone** (carvings wake into paintings) and **Frozen Moments** (time stopped in each picture; the camera moves through it).
- **Four story-led versions, where the pictures are inspiration only.** Kling follows a written storyline, beat by beat, with timings:
  - **The unbroken tale:** night to dawn, cause and effect.
  - **The old woman's twenty winters:** told through one witness; her birth-shawl returns at the end.
  - **The lake remembers:** everything is seen on Mirror Lake — its reflections, ice, rain and calm.
  - **Begin at the end:** the basket first, then how it came to be.
- Every one-video prompt says the game will slow it to about 40 s, so the movement must stay full and clear.
- ☆ the ones to make (`cutone-<id>`).

**Kept:** the ten tries on other scenes (S01–S10) stay, further down the tab.

**Lab:** `lab/src/js/79o2-lab-cutstyles2.js`. Test: `tests/test_round92.py` (19).

## Round 96 — scene-locked (Kris's notes on the fourteen)

**What Kris said about the fourteen:**

- **Rhythm Montage:** "rather good … best so far … I like how much things are moving". One thing pulsed from one part of a picture to another, which it shouldn't have.
- **Director's Cut:** worse and out of order, but "I do like the zoom in on people".
- **Living, Frozen, Runestone, Tapestry:** "too much interpretation", "out of order", "mixing elements within the different images", "lightning struck in an image when it shouldn't have".
- **The fix he asked for:** "each image should be its own mini scene, with specific things that are told to be done in the scene, and for those things to only happen in the scene."

**The four new prompts** (O15–O18, styles `lock_*`, `LOCK` and `lock_prompt()` in tools/video/kling_styles.py) share one structure:

- **The scene lock (five rules at the top):**
  1. Six mini-scenes, in order, hard cuts only — no dissolve, blend or morph.
  2. Only the numbered actions happen in each scene; everything else stays as painted, alive only in small ways.
  3. Nothing travels between things: no beams, pulses or sparks between objects.
  4. Each event belongs to one scene only: souls rising (1), gate shutting (2), cradles (3), chains (4), lightning (5), basket and babes (6).
  5. No reinterpretation and nothing added.
- **Each scene, written from the painting itself:**
  - what is in the picture
  - 3–4 numbered actions, the only things that happen
  - a "never here" list that names the neighbours' events (lightning only in the storm; the runestones flare together, so no light runs between them; the chains never reach anyone)
  - the face for a push-in, the detail for a close-up, the end frame

**How the four cut the same six scenes:**

| Folder | Name | How it cuts |
|---|---|---|
| O15 | Scene-Locked Rhythm | The liked one, sealed: beat cuts and punch-ins only inside each picture; slow motion and camera shake only on the lightning. |
| O16 | Scene-Locked Faces | The actions play wide, then a push-in to the named face (the old man looking up; the hooded woman; the old woman with the shawl; the bearded man at the palisade; the old woman flinching; the woman in pink with her hands to her heart). |
| O17 | The Locked Shot List | START → ACTION → END FRAME → NOT IN THIS SHOT; one shot and one camera move per picture. The most literal of the four. |
| O18 | Wide, Then Close | Exactly two shots per picture: the wide, then a close-up of the one detail as it lands (the doors meeting, the hands on the shawl, the chain links, the rune, the babes). |

The prompts are about 7,600 characters, the longest yet; the fourteen were about 3,400. If Kling cuts one short, tell Claude the number and they will be trimmed.

## Round 99 — every montage remade as a Locked Shot List

Kris: "i am also very happy with how the intro video is in the game. Let's remake all video prompts to mimic how we developed this video."

**What was made:**

- `tools/video/lock_scenes.py` gives every frame of all 34 cut-scenes (259 frames) its own short list of actions and its end frame. They are written from what each picture was painted to show. `{H}` is the hero you play and `{O}` the other twin.
- `tools/video/kling.py` now writes every part's PROMPT.txt in the O17 format.

**What each PROMPT.txt contains:**

1. The five scene-lock rules. Rule 4 lists that part's own shots by title.
2. For each shot:
   - **START:** exactly @imageN, followed by what is in the picture (the painter's words).
   - **ACTION:** the numbered actions, in order.
   - **END FRAME:** how the shot ends.
   - **NOT IN THIS SHOT:** the picture's own "no …" words, plus the big events of the other pictures in the part (lightning, fire, the gate, chains, the basket, the rainbow bridge, beams of light, the Lodestar, the orbs, the giant…), plus "nothing flows between things".
3. The avoid-list.

**Facts:**

- 93 prompts in all.
- Each runs about 3,700–6,800 characters. The O17 prompt that worked was 7,600.
- The intro's own folder (`01_opening_both_p1`) has a DONE.txt and is left as it is.
- When the new parts come in, the intake will need the game to know each part's cut points, as `ZSC.CLIPS` does for the intro. They will be found from the video's own cuts.
