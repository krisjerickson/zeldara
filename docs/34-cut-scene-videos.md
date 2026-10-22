# 34 — Cut-scene videos (round 73, answer C1: "Short AI video clips")

Kris, round 73: *"we likely need to prep for actual cut-scenes instead of just the images. but we should start with the missing images."*
Answer C1 (docs/08 › Open questions › Round 73): **short AI video clips**. The images come first (round 78, 13 pictures); each painted
panel then becomes the **first frame** of a short clip that brings it to life.

## 1. What changed in the field (checked Oct 21, 2026)

| Option | Image → video | Rough price | Notes |
|---|---|---|---|
| **OpenAI Sora 2 API** | — | — | **Shut down Sept 24, 2026** (the app closed Apr 26). Kris's OpenAI key cannot make video any more. |
| Google Veo 3.1 (Gemini API, preview ids) | first + last frame | $0.05–0.40/s | The preview ids **shut down Oct 22, 2026**; Google points to Gemini Omni Flash. |
| **Google Gemini Omni 1.1 Flash** (GA Aug 27, 2026) — *recommended* | first frame, optional last frame, 16:9 or 9:16 | ~$0.10/s at 720p, ~$0.035/s at 360p (drafts) | Paid tier only (no free tier), SynthID watermark, extensions up to 40 s. One request per clip. |
| Kling v3 (through fal.ai) | first + end frame | ~$0.08–0.11/s (sound extra) | A second key (fal.ai). Good motion. |
| Runway Gen-4 Turbo | first frame, 5 or 10 s | ~$0.05/s | Silent. Runway's own API key and credits. |

Prices are as published by Google and resellers in Sept–Oct 2026; check the pricing page before a big wave.

**Recommendation: Gemini Omni 1.1 Flash.** It is on Google's main API, takes the panel as the first frame, is cheap enough to
draft at 360p, and the script is already written for it. Kris needs a **Gemini API key** from Google AI Studio on a project with billing
turned on (the key stays with Kris — read in the PowerShell window, never written to disk).

## 2. Cost

About 8 seconds a clip:

| Wave | Clips | 720p | 360p draft |
|---|---|---|---|
| 1 — the pilot | 5 | ~$4 | ~$1.40 |
| 2 — the rest of round 73's moments | 6 | ~$5 | ~$1.70 |
| 3 — the opening, the realms, the feast hall, the celebration | 11 | ~$9 | ~$3 |
| Every panel in the game (about 75) | — | ~$60 | ~$21 |

## 3. Where the clips play

- **In place of the panel**, everywhere a cut-scene shows one (16p ZCUT: the bosses' changes, the saga, the last saga). The line is
  shown under it as before; the next panel follows when the clip ends (or on a click / Enter); Skip still skips.
- **Muted** under the game's music, which keeps playing. The clips can keep their own sound later (question V2).
- **No clip → the picture**, exactly as before. A clip that will not load falls back to the picture too.
- **The Lodestar** (Kris: *"the forges and the lodestar should also be a cut-scene … a proposed place for the video"*): its clip is
  `pn_forges_lodestar` and plays **the moment the Lodestar is first made at Muspelheim's great hearth** (16u: when the staff first comes
  into your hands) — the first of the pilot clips.
- `?video=0` turns clips off (to compare with the stills).

## 4. The pipeline

1. **The motion** — `src/js/07zvc-video-clips.js`: `ZVCLIP.DEF` (what every clip keeps: the painting, the faces, one shot, no text) and
   `ZVCLIP.CLIPS` (per panel: how it moves). `build.mjs` exports `sprites/requests/video.json`.
2. **Make** — `tools/video/clips.py` (Python + Pillow): crops the panel (`assets/scenery/rooms/<id>.webp`, 3:2) to 16:9, sends it as
   the first frame with the motion text to Gemini Omni Flash, saves `sprites/video_incoming/<id>.mp4`. A clip already there is skipped
   (nothing is paid for twice). `--dry-run` shows what would be sent and the rough cost.
3. **Take in** — `tools/video/intake_video.py` (ffmpeg): 1280 wide, H.264, CRF 26, fast start, no sound → `assets/video/<id>.mp4`
   (about 1–2 MB a clip).
4. **Build** — `build.mjs` lists `assets/video` into the page (`ZVIDEO_INDEX`) and copies the clips to `dist/play*/assets/video`.
5. Kris runs it all with **`.\tools\video\video1.ps1`** (wave 1; `-Res 360p` for drafts; `-Wave 2` for the next).

The waves (07zvc `WAVES`):

- **1 — pilot:** the Lodestar made, the chains fall away, Bram's bridge, the twins cast Godsbane, the World Tree under the lake.
- **2:** the line of light, Mira's lift, Dunn's bridge, the twin's lesson (Zeldor and Zeldara versions), the orbs glimpse.
- **3:** the storm, the basket, the send-off, the three realms' disasters, the shards, the gods freed, the gods lead home, the feast, the children.

Waves 1–2 need round 78's pictures first (`.\tools\sprites\round78.ps1`); wave 3 can go now.

## 5. Questions (docs/08 › Open questions › Round 73b)

- **V1** Which service: Gemini Omni Flash (recommended) / Kling via fal.ai / Runway?
- **V2** Sound: clips silent under the music (recommended) / keep the clip's own sound?
- **V3** The pilot at 720p (~$4) or as 360p drafts first (~$1.40)?
- **V4** After the pilot: every panel, or only the big moments?

Tests: `tests/test_round73b.py` (a clip plays in place of the still, muted, with its line; a broken clip falls back to the picture).
