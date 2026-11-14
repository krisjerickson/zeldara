# 56 — Round 104: the sound remakes' words, two new songs

## 1. Remake all: the new words

Nothing was marked ↻ in the Lab yet. Three effects were still without a ★ after every earlier round, so they are the first remakes:

| Effect | Takes so far | Length |
|---|---|---|
| Starfall | 18 | 1.4 s |
| Chain Lightning | 20 | 1.0 s |
| Berserker | 17 | 1.0 s |

Each has five new words, written away from what missed before:

- **Starfall:** glass bells and falling chimes, not whistles.
- **Chain Lightning:** one crack that ricochets three times, not a stream of zaps.
- **Berserker:** a shield-bang, an anvil or a flame flare, not drums and roars.

**Where the words are:**

- **Lab** › Sound effects › **Remake all**: under each effect, "✎ the new words (round 104)". It counts how many of the five are made.
- **On the PC:** `sprites\requests\sfx_remake104.md` to read. `sprites\requests\sfx_remake.json` is what the script sends.

**To make them:** `.\tools\audio\audio6.ps1` asks for the ElevenLabs key. It makes 15 takes (about 680 credits) as `audio\incoming\<id>.x1 … .x5.mp3`, then runs `sfx_preview.py` so they play in the Lab.

**Plumbing:**

- `sfx.mjs --set remake` reads the list and saves each take under the list's letter (x).
- `sfx_preview.py` and `pick_sounds.py` know x1–x5.
- The Lab reads the words from `79m1c-lab-sfx-remake104.js`.
- An effect stays under "Remake all" until a take is ★.
- Next time an effect is marked ↻, its words are added to the same list.

## 2. New songs

| Song | New length | What happened |
|---|---|---|
| `mu_village_night` | 4:45 | Kris's rewrite replaces the old song. |
| `mu_ash_day` | 4:00 | Kris's new song replaces the old one (4:34). |
| `mu_home` | 4:00 | Kris's Lab note: "i've made a new mu_home - let's just use this one". It is now the only take; the old song and its second take (.b) are gone from the game. |

- The old files are kept in `audio\replaced_r104\`.
- Both of Kris's notes date from Nov 8 and had been missed.
- `audio\incoming\mu_ash_day2.mp3` (Nov 8, 4:01) still sits there with no cue. It is not in the game.
