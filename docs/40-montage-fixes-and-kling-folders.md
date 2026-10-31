# 40 — Montage fixes, Kling folders, and where things stand (round 84)

Kris (Oct 30): "catch me back on where we are at and what to do next" — sound effects, videos ("putting in the requests into kling is clunky. I suggest individual folders for each video with all of the images in each folder as well as a single prompt to put in"), music ("i'm not sure if we have all the prompts ready to go into suno"). Mid-round he went through the montages frame by frame (§1).

## 1. The montage fixes (122 pictures to paint again)

One command paints them: `.\tools\sprites\redo.ps1 -List redo84`. The list is `sprites\requests\redo84.txt`. The old pictures move to `sprites\_replaced_redo` (never deleted).

`redo.ps1` is new and reusable for any future fix: `-Ids a,b` or `-List name`.

| Montage | Kris's note | The fix |
|---|---|---|
| The first spirit, 12 (Zeldara) | showed Zeldor, not Zeldara from behind | the hero you play, seen from behind, among the villagers (only that hero's picture is sent) |
| Bram | "should build an entire bridge from scratch … continuous progress" | renamed **Bram builds the Silverrun bridge**; no bridge anywhere at the start (no drawbridge, towers or chains); the first pier stone → three piers and two arches → all but the keystone → the finished stone arch bridge; all 10 frames, both heroes |
| Dunn, 1 | the warden was in the cage | Dunn inside the cage, the warden crumbling outside it |
| Dunn, all | "a bridge is almost always there already" | no bridge until he builds it: the first girder → half way → the last rivet in the middle → across; all 10 frames, both heroes |
| The opening, 6–7 | Zeldara's hair white | the babes: a boy with brown hair, a girl with reddish-brown (auburn); the basket now shows them |
| The opening + the four realms' falls | "no children other than zeldara and zeldor" | no children at all before the twins; after, the twins are the only ones (all 40 frames) |
| The Ash Night 6, the Stone-Fall 6 (and the Black Tide 7) | no living people | empty, still villages; the Black Tide's last frame done the same way to match |
| The Lodestar is made, 3–9 | heartglasses looked like hourglasses; the hearth different in 4–8; Surtharn still in 9 | frame 2's painting goes with 3–8 as the hearth to match (inside the mountain, no sky); the Heartglasses are the heart-shaped gems of their icons (icon sheet sent); no giant in 9 |
| Asgard comes down, 3 | children | the hero you play among grown-ups on the pier (now a Zeldor and a Zeldara version) |
| The Bifröst rises | the staff changes; show the staff casting in 4–5; the dock's end is wood; Mirror Lake under the bridge in 6–7 | see "The Lodestar's look" below; the staff upright in the notch casting the bridge; a wooden pier on posts in the water; the lake beneath the bridge |
| The feast hall, 7 | no Odin or Freya | Odin and Freya breaking free out of the burst |
| The truth, 6 | three random gods | only Odin and Freya, in the sky behind the twins |
| The spirits go home, 3 | the Lodestar differs from 2 | frame 2's painting goes with it |
| The spirits go home, 4; lightning and vines, 1 3 4 10; the celebration, 1–2 | children too early | no children until the first cry |
| Lightning and vines, 2 | vines on the houses | plain houses, before the spring |

**Rules now built in, for every future picture:**

- **No children until the celebration's first cry.** Before the twins, nobody is young. From then until the first cry, the twins are the only young people (the celebration's feast and dancing come before the first cry).
- **The Lodestar's look.** The storyboards described an older design (four gems round a white star). They now describe the one Kris picked in round 59: the Rune-ring lens, six gems round a clear lens with the World Tree in it. Its painting (`lodestar_ref`) goes with every frame that shows the Lodestar.
  - Older montage frames with the Lodestar (the escape, twinteach, Solmyrk, the feast hall) may still show the old staff. Kris to say if he sees it there.

## 2. Kling: one folder per video

`video_requests\` at the top of the game folder. Made by `python tools/video/kling.py`, which Claude runs after each round of pictures.

- **Why parts:** Kling 4.0's **Keyframes** mode takes up to 10 pictures and makes up to 30 s per video, with one prompt that says what happens at each timestamp ([Kling 4.0 guide](https://kling.ai/quickstart/kling-4-model-user-guide)). So each cut-scene is cut into parts of at most 6 pictures (6 × 5 s = 30 s); a 12-frame montage is 2 parts. 90 folders in all.
- **What each folder holds:**
  - `01.png …` — upload them in this order.
  - `PROMPT.txt` — paste it as is. It names each picture as `@Image1 …` with its time, says hard cuts (no morphing), and asks for no text and no music.
  - `SAVE AS <name>.mp4` — an empty file whose name is what to call the download.
- **Folder names:** `NN_<scene>_<who>[_pK]`. `NN` is the order the cut-scenes play in a game. `who` is:
  - `zeldor` / `zeldara` — one folder per hero;
  - `both` — the same pictures in both heroes' versions; make it once;
  - `all` — no twins in it.
- **What to make now:** `video_requests\README.txt` has the steps and the list. `_HOLD - pictures being remade.txt` names the 36 folders to leave until the round-84 pictures are in; the other 54 are ready now.
- **Taking them in:** `.\tools\video\video1.ps1 -Intake`, as before. It now also joins the parts of each montage (`<scene>_<who>_pK.mp4`, "both" used for each hero) once all are in.
- Files are hard links to the frames, so they take no extra space and follow a picture when it is painted again.

## 3. Sound effects — why they miss, and the options

- **Why:** every one of the 147 ethereal prompts is ~8 words of action followed by the same ~45-word style tail ("soft, airy and shimmering, warm and rounded, a faint magical sparkle and soft reverb tail …"). The tail outweighs the action, so most takes come out as the same sparkly whoosh. ElevenLabs' own advice: name the source, the material and the action; don't stack unrelated qualities; use high prompt influence (0.7–1.0) for precise results. We sent 0.5.
- **The options** — Kris chose **C, both** (docs/08 Round 84 S1):
  - **A — Re-prompt.** Action first (what makes the sound, on what, how hard), a short style tail of a few words, prompt influence 0.8, 4 takes each.
  - **B — A real sound library.** Sonniss gave away its whole GameAudioGDC archive, 2015–2024 (Aug 2026): royalty-free, usable in a commercial game, no credit needed. AI training is not allowed, which we don't do. Kris downloads it; Claude searches it on the PC by file name and category, picks 3 candidates per sound, softens them (gentle attack, low-pass, a little reverb) and puts them in the Lab picker beside today's.
  - **C — Both (recommended).** The library for physical sounds (steps, hits, doors, water, animals, mounts, UI clicks); re-prompted ElevenLabs for the magic (spells, runes, spirits, Bifröst).

## 4. Music — the Suno queue is ready

All **52** music cues (43 pieces and 9 stingers) have their Suno words. None are made yet.

- **Where they are:** the Lab → **Music & sound**, one card per cue with Copy buttons for Suno's Custom mode: Title, Style of music, Lyrics (only for the voiced ones) and Exclude styles. Doc 32 §3.1 has the steps.
- **How to make one:** Instrumental on. Keep the better take and save it as `audio\incoming\<cue id>.wav`. Claude runs the intake.
- **Suno's API:** still only a partner programme (July 2026), so the music stays by hand.

## 5. Other things waiting

- **Kris to pick:**
  - the library painting (take A or B, Lab → Library);
  - the gentle sounds (on hold for §3).
- **Kris to run:** `redo.ps1 -List redo84`.
- **Kris to make:** the 54 ready Kling videos.
- **Claude, after the pictures:** `storyboards.py`, `story_atlas.py` and `kling.py`, the game's story sheets, an empty `_HOLD` list, the game artifact.
- **Ambience:** 7 of 16 loops still missing (`audio1.ps1`).
- **The Lab's to-do list:** the saga map, the round-73 clips and the story lines are retired; the sound picks and the library remain.

## 6. More fixes (round 84b)

- **Mira and Vela checked, as Kris asked.** Their montages now hold back what they build until they build it, the same as Bram's and Dunn's.
  - Mira's cliff is bare until her first chain goes up.
  - Mira's frame 7 had a finished lift cage hanging; it is now the lift half built.
  - Vela's Ember Wall is one unbroken ridge of fire, with no road, bridge or arches across it, until her lanterns cool the first stretch.
  - 16 pictures, a separate list from round 84 so that one is never painted twice: `.\tools\sprites\redo.ps1 -List redo84b`.
- **The Library tab** showed "painting loading…" forever, because the Lab has no scenery loader. It now draws the two takes straight from the atlas page.

## 7. Music: longer, more electronic, more instruments (Kris's notes)

Kris: "a bit more electronic influences, and more electric bass when appropriate … the more chill relaxing songs … a bit more fast paced"; "i'm worried … might not have long enough music for ongoing play … around 10 minutes"; "a bit more variety of instruments overall … it gets repeated a bit too much".

- **Style:**
  - The house style now leans harder electronic: a punchy electric-bass groove, electronic drums, pulsing arpeggios.
  - The gentle style has a clear pulse, an electric-bass groove and a light beat.
  - Every group's feel names the electric bass.
  - The Exclude box now bans only lead or distorted electric guitar, not the bass.
- **Tempo:** the gentle pieces are about 15 % faster; the realms about 8 %. The calm pieces you play through (village nights, home, glimmerhall, the realm nights, the marsh, the caverns, the towers, the mage towers, Asgard) are re-worded with more drive. The cut-scene moments keep their stillness.
- **Length:**
  - Every piece you stay with for a long while asks for a long-form ~10-minute piece: the village by day and night, the green land after the end, all eight realm day and night pieces, the caverns, towers, castles, mage towers, islands, sky, forges, Muspelheim, Asgard and the citadel. Several sections and variations return to the main theme, with no ending.
  - Suno makes up to 8 minutes in one go; then ⋯ → Edit → Extend once to reach ~10. The Lab card says how, and keeping Suno's second take as `<id>.b.mp3` adds variety (the game alternates the two).
  - Shorter targets elsewhere: fights 2.5 min; bosses 4–5 (Solmyrk 6); the escape 3; the title, home, shops and trials 4–5.
- **Instruments:**
  - The house style no longer names the same four instruments every time.
  - Each piece has its own lead instruments: willow flute and bodhrán on the Grasslands; reed pipes, kantele and a Reese bass in the Wetlands; goat horn, lur and synth brass in the Highlands; hurdy-gurdy, jaw harp and industrial percussion in the Ashlands; cello, dulcimer and an 808 in the caverns; säckpipa and brass in the castles; glass harmonica and FM bells for the mages; accordion and a shanty rhythm on the islands; music box and kalimba for the trials; pipe organ in the citadel; and so on (`ZAUD.INSTR`).
- **Taken in:** the first seven songs from Suno — the title, the storm, the old sorrows, the glimpse, home, the village by day and the village by night (3–4 minutes each). They play in the game.
  - The village pieces were made before the new prompts; remaking them at ~10 minutes is Kris's call.
  - The intake now keeps its temporary files outside the game folder. Deleting there isn't allowed, and the read-only `assets/audio/index.json` had to be made writable.
- **Where to drop music:** `audio\incoming\<cue id>.mp3` (or `.wav`). A second take goes in as `<cue id>.b.mp3`.

## 8. The sound effects: every take side by side (S1 answered: both)

- **The library:** `audio\library` holds Sonniss's GDC 2024 bundle (9 zips, 22 GB). It is 182 packs but only about 4 recordings per pack (609 in all), so it covers the physical sounds only in part.
  - `tools/audio/lib_picks.py` reads the zips in place, cuts each named recording into its separate hits, and makes up to three candidates per effect for 82 effects (`<id>.l1–l3.mp3`).
  - Each candidate is cut to about the effect's length, with a soft start and a gentle fade, 60 Hz – 11 kHz, under -1 dB.
  - Covered: weapon hits and whooshes, shield, doors, gates, the lever, chest and wood, glass, stone and rubble, water, the potion bottle, page and UI clicks, horse, boar, hens, the red kite, the anvil, the bell, fire, electricity, thunder, the crowd and children.
  - Not covered: no bows, coins, grass footsteps or dig sounds. Earlier years of the archive (2015–2023) would fill much more.
- **Re-worded ElevenLabs takes (`07zau3-sfx84.js`):**
  - Every effect's action comes first (what makes the sound, on what, how hard), followed by a short tail of a few words, sent at prompt influence 0.8.
  - Run `.\tools\audio\audio3.ps1` (two takes each, about 13,000 credits); the takes arrive as `<id>.n1/.n2.mp3`.
- **The Lab** (Music & sound → **Pick the sounds**):
  - Each effect shows Today, Rec 1–3, New 1–2 (after audio3) and Gentle 1–2, each with ▶.
  - ☆ picks one take, or two that the game alternates; "Keep today's" leaves it as it is.
  - Made by `tools/audio/sfx_preview.py` (joined files `s84_<kind>.mp3`). `tools/audio/pick_sounds.py` puts the picks in the game; a pick can be any take or two joined by `+`.
