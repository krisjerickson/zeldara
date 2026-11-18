# 71 — Two Labs, the seasons painted in, safe request scripts and five more sagas (round 116)

## What Kris asked
- "process all the images in so far and remake the scripts for requesting the remaining. Last time i had these get stuck, and then it ditched the ones that had processed so far and started at the beginning again. Make sure we correct the script so this doesn't happen again. I believe there is also 1 more missing script that didn't run yet"
- "for the lab storage limit, let's split into 2 labs. Half of the older things can go into Lab-old … the more recent half in the new lab"
- "load more of the seasons outcomes into the lab as well for me to review as things come in"
- "Come up with 5 more overarching sagas or story elements for me to review and consider"
- "season pictures and solveig are in"

## The request scripts no longer start over
Why runs got stuck and then started again from the beginning:
- `generate.mjs` had no time limit on a request, so a hung request stalled the whole run.
- `redo.ps1` moved every picture on its list aside before painting. When a run was stopped and started again, it moved aside the pictures the first run had already finished, so it painted them all again. 659 first-run duplicates were left in `sprites/_replaced_redo` (they are kept).

The fixes:
- **`generate.mjs --timeout`** (240 s by default). A request that hangs is dropped and tried again, with a line in the log.
- **`tools/sprites/paint.ps1`** (new). Use it for every new list. It never moves anything; each run sends only the pictures still missing from `sprites/incoming/`. It sends scenery and character sheets alike, three at a time, and repeats pass after pass until all are in or a whole pass brings nothing new.
- **`redo.ps1`** is only for pictures painted *again*. It moves aside only pictures older than the list (or than the time the ids were first given), so stopping and starting it is safe.

The "missing script" was `r114_solveig`, Sólveig's two character sheets. `redo.ps1` only ever sent scenery sheets, so they were never sent. `paint.ps1` sends both kinds.

What is left to paint: `sprites/requests/r116_rest.txt`.
- 93 shots: gate 6, the orbs, credits 4–6 and the World Tree.
- `vf_glass.core.f` and `vf_glass.walk`, Sólveig's two sheets. These were not in `sprites/incoming/` at 15:58 UTC on Nov 18.

```
.\tools\sprites\paint.ps1 -List r116_rest
```

## Two Labs
One artifact holds at most 256 MB and 511 files.
- **The Lab** (the main artifact, same link, with all the picks): the tabs from round 103 on.
  - Shot series, all 313 strips.
  - Five more sagas.
  - Seasons: the paintings, and Seasons: the cost.
  - Missing lessons.
  - The villagers' saga, and Villagers & side quests.
  - Site backdrops, Inventory layout, Mechanics guide, Painted & polish, Training & quests.
  - Sound effects and Story cut-scenes.
- **The Lab — earlier rounds** (a new artifact, "archive" icon): every earlier tab, including the Library, which draws from the painted pages. It shows no picks; those stay in the main Lab and in the docs.
- `lab/src/js/99-lab-sets.js` filters the tabs (`LAB_NEW`). `build.mjs` writes `lab/lab.artifact.html` and `lab/lab-old.artifact.html`; `lab/index.html` still has every tab.
- The old Lab's files were copied between artifacts on the server, in batches of at most 64 MB.

## The seasons, painted in (wave S1)
- All 38 sheets were cut by `intake_scenery.py`. Each repaint has exactly the items of its original (6, 8 or 12).
- New pages: `seas_sp-0`, `seas_au-0`, `seas_wi-0` and `air-0`. There are 36 new ground textures (`*_sp`, `*_au`, `*_wi`), and the season icons are on `icons-1`.
- In the game, painted items replace the tinted ones as soon as a season's page loads (`ZSEASON.item` → `tr_round_a_au`, `ZSEASON.tex` → `tx_grass_au`).
- **Fix:** a chunk still being painted (or painted but not yet shown) when the season turned came out in the old season. In autumn this left a green strip at the screen edge. `ZSEASON.repaint` now paints those chunks again too.
- The Lab tab **Seasons: the paintings** shows each sheet beside its spring, autumn and winter repaint (✓ / ↻ with a note), plus the game in all four seasons.
- Tests: `test_round115` has 9 checks. The new one checks that no strip of the screen is left in the old season.

## Five more sagas (Lab tab "Five more sagas")
These are bigger than the villagers' arcs. Each runs from the Prologue through the four realms to the end. Kris answers each with ✓ / ◐ / ✕.

| Saga | What it adds |
|---|---|
| **The Four Eclipses** | The enemy, felt all game. Each realm opened darkens the noon sun further, until a black noon above Asgard. Solmyrk's two sun-hounds hunt you; a voice in still places offers a bargain. |
| **The Lake Remembers** | 24 still-water visions show the world before the fall, and how a guest in a golden mask was given the high seat for one night. The lake holds back one memory (the storm dawn) until the feast hall. |
| **The Other Half** | The twin at home as a second hero. Four lost lays, one per realm, each gives a new rune, and the last leads to Godsbane. There are three short scenes side by side. |
| **The Thing on the Green** | The survivors of the four realms meet at the old assembly. You speak four times (roads, forgiving the red gold, the mines, the forges), and the epilogue shows the land you chose. |
| **The Sealed Sea** | A fog wall has closed the sea for 36 years. It lifts quarter by quarter, the last ship south drifts back, and after the end ships come again. This involves Brask, Morwen, Ilsa, Hesk, Quill and Coral. |

Canon is kept in all five:
- the gods are not named before they are freed;
- nothing hints at why the twins have their gift;
- there are no children before the first cry;
- the Binders never besiege the village.

The villagers' lines (three times the meetings, at least 40 each) are written after these picks, so they can draw on every saga chosen.

## Next
- Kris: run `paint.ps1 -List r116_rest`, review Seasons: the paintings, and pick in Five more sagas.
- Then: waves S2–S5 of the seasons (doc 70), the villagers' lines, and the Missing lessons build (including waking at full health after death).
