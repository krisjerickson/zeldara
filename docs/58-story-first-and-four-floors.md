# 58 — Round 107: the story comes first again; sites keep four floors

## Floors (Kris: "instead of 7 to 3 and 8 to 3, we should still have 4 floors … Monolith mage tower should stay at 3")

Round 106 cut the biggest sites too far. `SITE_FLOOR_CAP` (07d) now:

| Site | Floors at first → r106 → now |
|---|---|
| Highlands boss dungeon (`s3_dungeon`) | 7 → 3 → **4** |
| Boulder Field | 8 → 3 → **4** |
| Crystal Grotto | 6 → 3 → **4** |
| Monolith mage tower | 3 → 2 → **3** (no cap) |
| Root Hollow, Tower island, Castle q4_c | 3 (unchanged) |
| Pillared Hall | 4 (unchanged) |
| Ashlands boss dungeon, Spiral Chasm, Reflecting Hall | 6 (unchanged) |

Healing wells follow (floors 2 and 4 of a four-floor site). The Tome agrees.

## Cut-scenes (Kris: "since the tutorial, the cut scenes don't seem to be working, and it goes straight to the tutorial")

**Why it broke.**

- The opening was started only by the soul-lines' tick. That tick does a lot of work on a new game, and since round 103 (the ribbons) it can be slow to begin.
- The twin's greeting starts 4 s into a new game. It only waited if the opening was already queued, not if the opening had not been asked for yet.
- So on a slower PC the greeting opened first. Its box blocked the "calm moment" the cut-scene waits for, and then the lessons and Oswin's hints kept opening boxes one after another, so the cut-scene could wait a long time.
- Any later cut-scene (a realm's old disaster, and so on) could be starved the same way.

**Now (16x, 21t, 21u, 21v):**

- **The opening is started by the story queue itself.** On a new game it plays as soon as the world is up (1.5 s), before anything else.
- **`ZSQ.hold`:** while a story cut-scene is playing, the opening is still to come, or a queued cut-scene's moment has come, these wait:
  - the lessons
  - Oswin's hints
  - the twin's greeting (the first walk)
- **A box already open** is left to be read. The cut-scene plays the moment it closes, before any other box can open.
- **The first walk** starts 1.5 s after the opening ends.
- **Safety:** the opening never holds the tutorial for more than 45 s, so a missing painting can't freeze the start.

The other story moments are unchanged:

- the opening on a new game
- each realm's old disaster the first time you set foot there
- the Grasslands' at its tenth freed spirit
- the first freed spirit (before its thanks)
- the gate, the orbs, the builders, the Lodestar, the tattoo, the World Tree

They still keep 40 s apart, and they play only in the overworld, away from fights.

## Tests

- `tests/test_round107.py`, run with the cut-scenes, lessons and first walk on (`game(real=True)`):
  - the opening plays first, even with the soul-lines off
  - the twin's greeting follows the opening
  - a cut-scene that is due waits behind an open lesson box and plays as soon as the box closes
- `test_round106.py` now expects the new floor counts.
