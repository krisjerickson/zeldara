# 73 — The first spirit freed, cut; seasons wave S2; the sagas picked; the second sound remake (round 118)

## The first spirit freed — the final cut
Kris: "we still need to edit for final cut scene videos, especially making sure we adjust the pace of shots per the words coming out and number of images selected, as well as zooming in or out, depending on how the shot is changing. do that for the first spirit freed cutscene".

**The tool:** `tools/video/series_cut.py <scene>` cuts a story cut-scene from its shot series. Its two inputs:
- **Kris's picks**, in his order (`sprites/requests/series_picks.json`, copied from Lab › Shot series — pick).
- **Every frame's shots** (`sprites/requests/series_plan.json`, written by `build.mjs` from 07zt9b).

`--plan` prints the edit without rendering.

**The rules:**
- **Pace — the words set it.** A frame lasts as long as its line takes to read in the game (1.4 s + 0.36 s a word), plus a breath.
  - It is never shorter than its shots need: 1.15 s each in a burst of action, 1.6 s otherwise.
  - The frame's time is shared among the kept shots by weight. Wide shots get more, close-ups and inserts less, and the last shot of a frame holds a little longer.
  - More shots kept means quicker cuts at the same length.
- **Camera — the next shot decides.**
  - Before a tighter shot the camera **pushes in**; before a wider one it **pulls back**. Between shots of the same size it drifts sideways, alternating.
  - The first shot pushes in from black; the last pulls back into black.
  - The first series' planned moves are kept (shake, rune-blue flash, tilt up, orbit). Close-ups move about half as much.
- **Cuts.** Hard cuts within a frame; a 0.45 s dissolve between frames; a white flash into the chains breaking.
  - Each frame's part of the video ends once the dissolve into the next frame is complete. So when the game holds a frame while its words finish, it holds on a clean picture.

**The first spirit freed:**
- 12 frames, 28 shots, 66 s. All of Kris's picks, in his order (frame 5 is his round-112 cut: shots 3, 4, 6).
- The video is `assets/video/sb_spirit_m.mp4`: 1280×720, 24 fps, 13.4 MB. The edit is in `sb_spirit_m.json`.

**In the game:**
- `src/js/16w3-series-cuts.js` (written by the tool) gives `ZSC.CLIPS.spirit` the frame cuts.
- The first line shows on its black screen, then each frame plays its part of the video, its words building under it.
- **Zeldor only:** the cut is Zeldor's version (`hero:'m'`; `ZSC.seg` now checks the hero). Zeldara keeps the paintings until her shots are painted.

**In the Lab:** Shot series — pick opens on the first spirit freed with **🎬 The final cut**: the video, its words under it as the game shows them, and the edit, frame by frame (each shot's length, camera move and cut).

When the picks change, the cut is made again in about 2 minutes.

Tests: `test_round118` (10).

## Seasons — S1 approved; wave S2 requested
- **S1:** Kris ✓ every S1 painting. They have been in the game since round 116.
- **What `ZSEASON.item` does now:** anything with a seasonal painting uses it in its season (buildings and props included), not only plants. Plants without a seasonal painting are still tinted until theirs is in; buildings are never tinted.

**S2, the village** (`07zt17-art-seasons-s2.js`, list `r118_seasons_s2`, 29 sheets ≈ $1.39):

| Sheets | What |
|---|---|
| 18 | The village's 5 building sheets and 4 prop sheets, in autumn and a mild winter. Each is a repaint of the approved sheet: only leaves, frost, smoke, light and a few seasonal things are added. Winter is frost, not snow. |
| 5 | **Festival dressings (A)**: door garlands, ridge pieces, window flowers or candles, eave pieces, wreaths, step pieces, banners and lanterns for each festival, plus the lanterns, torches and braziers of the festival nights. |
| 5 | **Festival set-pieces** for the Green: birch pole and tafl table; bonfire (lit and unlit) and sun-wheel; last-sheaf figure and Runestone candles; the great Yule goat and the oath table; Freya's cradles and falcon banners. |
| 1 | **Festival food**: Blossom Cake, Midsummer Mead, Harvest Bread, Yule Pork and four keepsakes. |

- **Coming later:** festival story frames with S5, festival clothes with S4.
- **Building the festivals:** the festival system (dressings placed at doors, ridges and windows; Runa announcing each festival; three days; the activities) is built once these paintings are in.
- **Request text:** a scenery sheet can now give its own `look` and `keep` in its request text.

## The five more sagas — Kris's picks
| Saga | Pick |
|---|---|
| The Lake Remembers | ✓ woven in |
| The Other Half | ✓ woven in |
| The Four Eclipses | ✕ |
| The Thing on the Green | ✕ |
| The Sealed Sea | ◐ — see below |

**Kris's question about the Sealed Sea:** "make sure you can still sail to the islands without the fog saga getting in the way. how does this track?"

**Answer** (on the card in the Lab):
- The fog stands far out at sea, beyond the four harbour islands, so sailing to the islands works exactly as now.
- What the fog does add:
  - a grey horizon past the islands, which thins as each realm opens;
  - the ghost ship, which drifts into a harbour island's bay as a new place to visit;
  - Hesk's boat launch;
  - after the end, a "sail beyond" trip at the harbour.
- Nothing about sailing is locked behind it.

## Sound effects — the second remake
Kris's notes on round 104's remakes:

| Effect | Kris's note |
|---|---|
| Berserker | "more of a power-up sound, or getting excited or enraged" |
| Chain Lightning | "should sound like a lightning strike" |
| Starfall | "should sound like a meteors coming down or a firework crackling" |

- **The new words:** five new takes each, worded from his notes (`sprites/requests/sfx_remake.json`, take `y`). For example: a fast rising power-up swell; a close lightning crack followed by rolling thunder; meteors whooshing down with fiery crackles, a firework's glittering crackle.
- **Run it:** `.\tools\audio\audio7.ps1` makes `audio\incoming\<id>.y1–y5.mp3` and puts them in the Lab player.
- **In the Lab:** Sound effects shows them first ("New 118"), with the round's words under each effect.
