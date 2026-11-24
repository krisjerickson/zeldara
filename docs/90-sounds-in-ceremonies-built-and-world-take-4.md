# 90 — Your sound picks in the game; the ceremonies built; the seasons painted again; the world, take 4 (round 131)

## Sound effects (Lab › Sound effects)
Kris sent a full round of feedback. Here is what was done with it.

**74 effects now play exactly his ★.**
- `sprites/requests/sound_picks.json` was rewritten from the Lab, and `tools/audio/pick_sounds.py` ran on the PC in three batches.
- The game rotates through every ★ take.
- The previous picks are kept in `sound_picks_was131.json`.
- For the boss fall and the boss roar, the Lab's "Today" was the game's own first take (n1), so the same sound was not added twice.

**42 effects get new takes**, under `tools/audio/sfx_remake131.py` → `sprites/requests/sfx_remake.json`, take 'z'.
- 41 are "+ Remake up to 5": his ★ are kept, and new takes are added until there are five to choose from.
- 1 is "Remake all": the water familiar.
- The words follow his notes:
  - **Eating:** bread, roast meat, stew and nuts, not only an apple.
  - **Water familiar:** a wave or a big splash.
  - **Feast:** a warm crowd hum with a fiddle and a drum, and less cheering.
  - **Lava:** thick, gloopy and hissing.
  - **Berserker:** a pounding heartbeat and a surge of wild, alive power.
  - **Time slow:** sounds bending down and stretching.
- In total there are 158 takes, about 7,300 ElevenLabs credits.
- On the PC: `.\tools\audio\audio8.ps1`. In the Lab they show as "New 131·1…5".

## The ceremonies Kris picked (Lab › First spell & first bow) — `src/js/21w3-ceremony131.js`
- **Mana arc — 'sanctum' + 'bloom' + 'fill':**
  - The first time the hero has a spell, eight runes circle the hero and fly up to the corner.
  - The arc then blooms open from its centre with a flash.
  - A line names it: «Your well of mana…». The speaker is the master's fading voice in a tower, or the tome everywhere else.
  - A pointer then explains it.
  - The arc's colour follows how full it is: teal when full, violet as it empties.
- **Gold ring — 'flash' + 'teachers':**
  - The first lock appears with a golden burst.
  - Then a teacher sends for you: **Sergeant Brask** for a bow or crossbow (straw butts in the armoury yard), **Morwen** for a spell (practice wisps at her door).
  - The drill has three steps, ticked off as you do them: tap, hold for full power, and press a direction while holding to switch.
  - With a crossbow, Brask stands the butts in a row and the bolt goes through them all.
  - The second teacher keeps it short.
  - The reward is ten arrows (six darts) or a mana draught. Saved as `ps.cer`.

## The seasons, painted again
- The 9 sheets were taken in on the PC (intake, then `pack_fams.py seas_au seas_th seas_wi`).
- **Autumn:** a real variety of colour; the pines and mangroves are green, with cones and leaves at their feet.
- **The thaw:** seedlings in the fields and beds.
- **Winter:** bare furrowed fields.
- In the game, the autumn pines and mangroves now use the new paintings (10zs `EVER` keeps only hedges, topiary, ivy and moss on the summer picture).
- In the Lab, the five groups say "★ painted again — look again".

## The world, revamped — take 4 (Lab › The world, revamped 4) — `tools/world/world_looks4.py`, `tools/world/world_shots4.py`
- **Aurora in the water, soft:** the sheen lies only on open water. It stops at every bridge, prop and person. There is a 5 s clip.
- **Saga frames:** three clips of their use in the game: entering a realm, a craftsman freed, a site cleared. The camera eases in, the frame fades in with a line of the saga, holds, then fades away.
- **Landmarks at the passages:** each border's middle crossing becomes its landmark, and the old gatehouse goes.

  | Border | Crossing | Realms | Landmark |
  |---|---|---|---|
  | Silverrun | Millrace | Grasslands ↔ Wetlands | Bram's bridge (shown, though not picked) |
  | Great Scar | Scar Lift | Wetlands ↔ Highlands | Mira's lift, or the edge of the Great Scar |
  | Cinder Chasm | Chasm crossing | Highlands ↔ Ashlands | Dunn's iron bridge |
  | Ember Wall | Ember Pass | Ashlands ↔ Grasslands | Vela's pass |

- **Vistas:** each painting whole, plus a clip of the camera lifting into it.
- **Next:** the take-3 ✓ items go into the game: air, ground and water pieces, grand site exteriors, moonlit night (b), contact shadows, and the grade with dusk.

## Kept
- The "Leave site?" warning stays (Kris, round 131).
