# 37 — The twin's library, built; picking the gentle sounds (round 81)

Follows doc 36 (the requests). Kris: "great, requests are in" — all 4 library sheets (wave 90) and both options of all 147 sound effects arrived.

## 1. The library

- **Where:** across the main street from your Home, between the Clothing shop and the Green (core building 5×4 at −15,−3 from the village centre, door facing the street). It stands at every stage of the village; houses, gardens and streets lay themselves out around it.
- **The building:** the painted saga-hall, **take A** until Kris ☆s one in Lab → Library (`LIB_TAKE` in `src/js/16v-twin-library.js`).
- **Inside ("The Library"):** tall bookshelves, the ladder, the scroll rack, the four realms' banners, the World Tree panel, the rune window, the star chart, the saga lectern, the reading table, the map table, two candle stands, the saga stone and the rune tablets. Rune-blue lights pulse on the stone, the lectern and the window; dust drifts in the window light.
- **By day:** the other twin reads at their desk (the painted `twin_study_m/_f`). [Tab] → their line for how far you have come, or, with the Lodestar in hand, the Godsbane lesson (16u).
- **At night:** the twin sleeps in the second bed in your Home. The library's desk is empty; [Tab] at the lectern reads a passage of the old sagas.
- **After the end, by day:** the twin is out on the Green with everyone, as before.

## 2. The second bed

Your Home now has the twin's bed by the hearth (the chest moved beside your own bed). By day it is empty (`if_bed_twin`). At night the twin is asleep in it (`twin_sleep_m/_f`, a few drifting Zzz). Near it: "💤 Zeldara is asleep"; with the Lodestar in hand it is "[Tab] Wake Zeldara" for the lesson. Your own bed works as before.

## 3. Picking the gentle sounds

- **In the Lab:** Music & sound → **Pick the gentle sounds** (at the top). Each of the 147 effects has a row:
  - ▶ **Today** (where there is a recorded take; 85 effects are made by code today).
  - ▶ **1** and ▶ **2** (the new options).
  - The pick: **Keep today's · 1 · 2 · 1 + 2.** "1 + 2" means the game alternates between the two.
  - "▶ Next to pick" jumps to the next unpicked row and plays it. "Hide the picked ones" thins the list.
- **Loudness:** everything in the Lab is at the same loudness, put through the intake's trim and loudness. In the game the menu and page sounds sit a little quieter under the music. A picked gentle take is no longer muffled.
- **Then:** tell Claude. The picks go to `sprites/requests/sound_picks.json` and `python tools/audio/pick_sounds.py` puts them in: the old takes are moved to `audio/replaced_r81` and the new ones go through the intake and are marked `eth`. Claude can run this on the PC itself.
- **New sounds:** the skill, spell and mount sounds are new, so they wait for a pick (1, 2 or both) before they play in the game.

## 4. Files

- `src/js/16v-twin-library.js`: the library's room, the second bed, day and night, and the Building scene hooks.
- `07l` / `05-worldgen`: the library in the village. `07k`: `VB_PAINTED.library`. `10-scene-world`: its label 📚.
- `10zt-twin.js`: `ZTWIN.where` (library / bed / out). `16u`: the old desk removed. `07zst`: the saga map's lines say "library".
- `tools/audio/eth_preview.py`, `tools/audio/pick_sounds.py`, `lab/src/js/79g-lab-r81.js`, `build.mjs` (`ZSFX_PICK`).
- Tests: `tests/test_round81.py`.

## 5. The story frames before the twins (round 81b)

Kris: "there are many points in the story that zeldara and zeldor are not yet born or at the age of the game, but they show up in the image. they need to be removed for all of the frames where they are not yet grown up and part of the saga yet."

- **Why it happened:** every picture request carried the game's hero style picture, and the history frames had nothing saying who was *not* there, so the painter put a young hero (and a white-haired companion) in as a watcher.
- **The fix, for every frame set before the twins** (the opening's frames 1–7, all four realms' falls, the truth's memories 3–5):
  - no hero style picture;
  - the old saga panels (the Long Quiet, the Ash Night, the Stone-Fall, the Black Tide, the cradles, the storm, the basket — no heroes in them) as the style to match;
  - a plain line: "long before the twins were born: they are NOT in this picture". In the memories the twins are only the two sparks; in the basket they are only the two babes.
- **Painted again (34):** opening 1, 2, 4, 5; the Long Quiet, the Ash Night, the Stone-Fall and the Black Tide 1–7 each; the truth 4, 5. Opening 3, 6–9 (the cradles, the basket, the babes, the toddlers) and the truth 3 were right and stay.
- **To run:** `.\tools\sprites\round81.ps1`. It moves the old ones to `sprites\_replaced_r81` and sends the 34. Then Claude remakes the montages and the Lab sheets.
