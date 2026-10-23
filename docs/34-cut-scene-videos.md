# 34 — Cut-scene videos (round 73, answer C1: "Short AI video clips")

Kris, round 73: *"we likely need to prep for actual cut-scenes instead of just the images. but we should start with the missing images."*
Answer C1 (docs/08 › Open questions › Round 73): **short AI video clips**. The images come first (round 78, 13 pictures); each painted
panel then becomes the **first frame** of a short clip that brings it to life.

## 1. Made by hand (round 73b)

Kris, round 73b: *"we have few enough videos we don't need to use an api, i can hand place the requests."* So the clips are made in a
video app by hand, like the Suno music: no key, no script sending anything. (For the record: OpenAI's Sora API shut down on Sept 24,
2026, and Google's Veo 3.1 preview ids end Oct 22 — an API route would have meant Google's Gemini Omni Flash; `tools/video/clips.py`
stays in the repo for that, unused.)

**Which app** (consumer plans, prices checked Oct 2026; no review tests animating paintings, so try the pilot's first clip in two apps
and keep the better):

| App | Plan | Good at | Notes |
|---|---|---|---|
| **Kling** (3.0) | Standard ~$10/month (660 credits); Pro ~$37 | keeping faces steady; start image; a negative-prompt box | free tier is watermarked; paid exports clean; credits per clip vary by length and quality — check before a big wave |
| **Google Flow / Gemini app** (Veo 3.1, Omni Flash) | with Google AI Pro ~$20/month | sticking closely to the start image; first and last frame (Omni) | every clip carries Google's invisible SynthID mark |
| **Runway** (Gen-4.5) | Standard ~$15/month | steady shots | 2–10 s clips |

22 clips at about 8 s fit easily in one month of any of these.

## 2. Where the clips play

- **In place of the panel**, everywhere a cut-scene shows one (16p ZCUT: the bosses' changes, the saga, the last saga). The line is
  shown under it as before; the next panel follows when the clip ends (or on a click / Enter); Skip still skips.
- **Muted** under the game's music, which keeps playing. The clips can keep their own sound later (question V2).
- **No clip → the picture**, exactly as before. A clip that will not load falls back to the picture too.
- **The Lodestar** (Kris: *"the forges and the lodestar should also be a cut-scene … a proposed place for the video"*): its clip is
  `pn_forges_lodestar` and plays **the moment the Lodestar is first made at Muspelheim's great hearth** (16u: when the staff first comes
  into your hands) — the first of the pilot clips.
- `?video=0` turns clips off (to compare with the stills).

## 3. The pipeline (by hand)

1. **The motion** — `src/js/07zvc-video-clips.js`: `ZVCLIP.DEF` (what every clip keeps: the painting, the faces, one shot, no text),
   `ZVCLIP.CLIPS` (per panel: how it moves), `ZVCLIP.NEG` (a negative prompt for apps that have the box), `WHERE` (where each plays),
   `WAVES`. `build.mjs` exports `sprites/requests/video.json`.
2. **The first frames** — `.\tools\video\video1.ps1` (`tools/video/frames.py`): every clip's panel cropped to 16:9 →
   `sprites\video_frames\<id>.png`, with `<id>.txt` beside it (where it plays, the file name, the prompt, the negative prompt); opens the folder.
3. **Make them** in the app: the frame as the start image, the prompt (from the `.txt` or the Lab's **Cut-scene clips** tab, Copy
   buttons), 16:9, about 8 s; download.
4. **Take in** — `.\tools\video\video1.ps1 -Intake` (`tools/video/intake_video.py --from Downloads --ask`): a file whose name holds a
   clip id is matched; any other video from the last two days is shown and you type which clip it is. ffmpeg → 1280 wide, H.264, no sound
   → `assets/video/<id>.mp4` (about 1–2 MB). Then the build lists `assets/video` into the page (`ZVIDEO_INDEX`) and copies the clips to
   `dist/play*/assets/video`.

The waves (07zvc `WAVES`):

- **1 — pilot:** the Lodestar made, the chains fall away, Bram's bridge, the twins cast Godsbane, the World Tree under the lake.
- **2:** the line of light, Mira's lift, Dunn's bridge, the twin's lesson (Zeldor and Zeldara versions), the orbs glimpse.
- **3:** the storm, the basket, the send-off, the three realms' disasters, the shards, the gods freed, the gods lead home, the feast, the children.

Waves 1–2 need round 78's pictures first (`.\tools\sprites\round78.ps1`); wave 3 can go now.

## 4. Decisions (docs/08 › Open questions › Round 73b)

- **V1** By hand, no API (Kris). The app: his choice — try the first pilot clip in two.
- **V2–V4** No preference → silent under the music; the pilot at the app's normal quality (720p or better); decide the rest after the pilot.

Tests: `tests/test_round73b.py` (a clip plays in place of the still, muted, with its line; a broken clip falls back to the picture).
