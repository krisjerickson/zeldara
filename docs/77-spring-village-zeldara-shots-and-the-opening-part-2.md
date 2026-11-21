# 77 — The village in spring, the Zeldara shots, and the opening's second half (round 122)

## The village in spring
Kris: "let's plan to paint a spring version for all buildings, and we can add in spring things like flowers".
- The game opens in spring and stays there through the first two realms, so this is the village most players see first.
- **Five building sheets are asked for:**
  - `sc_seas_sp_vill_core_1` and `sc_seas_sp_vill_core_2`;
  - `sc_seas_sp_vill_houses`;
  - `sc_seas_sp_vill_special_1` and `sc_seas_sp_vill_special_2`.
  - They are wave 123, in `07zt17-art-seasons-s2.js`.
- **The look:** window boxes full of spring flowers (crocus, primrose, daffodils, violets), a little white and pink blossom, young green ivy, new grass at the walls, and a bird's nest under one eave. The flowers are added around the buildings and never cover doors, signs or windows.
- When the paintings are in, the game uses them in spring by itself (`ZSEASON.item`).
- **The props** (four sheets) keep their summer look for now. In the Lab their Spring slot shows the summer painting, with ✓ Keep the summer look / 🌸 Paint a spring version.

`.\tools\sprites\paint.ps1 -List r122_spring_village`

## The Zeldara versions of the cut-scenes
Kris: "do we need to request new images for the zeldara versions … or are those ready from my picks from zeldor?"
- **The answer is partly.** Kris picked shots on the Zeldor series; the Zeldara versions were planned for "once the look is right".
- **Ready already:**
  - A kept shot with no hero in it (a wide of the place, an insert, a point-of-view shot) is the same picture for both twins. 27 of his kept shots are like this.
  - The original story frames already have Zeldara versions.
- **To paint:** every kept shot with the hero in it, 95 pictures. These come from the five cut-scenes he has picked so far (the first spirit freed, Bram, Mira, Dunn, Vela) and a few single frames.
- **How each one is made:** from three references — the kept Zeldor shot, Zeldara's story frame for that moment, and her model. The request asks for the same shot with the other hero, not a new camera.
- **Tool:** `tools/sprites/zeldara_shots.py`, which writes `src/js/07zt9c-zeldara-shots.js` and the list. Run it again after more picks; it reads `sprites/requests/series_picks.json`, which now holds all 58 frames picked in the Lab.

`.\tools\sprites\paint.ps1 -List r122_zeldara_shots`

Once they are in, each cut gets a Zeldara version (`series_cut.py`).

## The opening as one video
- **Part 1** (frames 1–6, the World Tree to the basket) is the Kling video in the game today (`assets/video/sb_opening_p1.mp4`, slowed to 40 s).
- **Part 2** (frames 7–12: the two babes → the send-off) is two Kling folders, one per hero:
  - `video_requests\01_opening_zeldor_p2\` — PROMPT.txt + image1–6.png + "SAVE AS opening_zeldor_p2.mp4"
  - `video_requests\01_opening_zeldara_p2\` — the same pictures for frames 7–9, her own for 10–12
- **The prompt** is in the same Locked Shot List format as part 1 (O17), 6 shots in 20 s, wooden practice sword.
- **Fixed this round:** shots 4 and 5 had the sword's description cut in half. A dash inside brackets ("…grip — NOT a metal blade)") was taken as a split point, so "NOT a metal blade)" landed in NOT IN THIS SHOT. `tools/video/kling.py` no longer splits inside brackets, and both prompts are rewritten.
- **Next:** drop each finished video into its folder and tell Claude. It gets the part-1 treatment:
  - slowed to about 40 s with smooth in-between frames;
  - the Kling mark cropped;
  - its cut points measured;
  - an entry in `ZSC.CLIPS` (frames 7–12, one per hero).

Tests: `test_round122` (8).
