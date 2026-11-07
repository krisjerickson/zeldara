# 46 — More sound takes; tapping into adventure sites (round 89)

## More sound takes
Kris: "Considered all non-picked sounds as discarded, do not reuse any of these. and make sure each new suggestion is unique, and create 5 new options for each of the unpicked ones … keep all currently chosen ones, discard the unchosen, and then create 3-5 new options for each of the sounds that have less than 3 already picks and create an updated way to pick in the lab."

From the Lab's picks (Nov 6) for the 147 effects:

| Picks so far | Effects | New takes each | New takes |
|---|---|---|---|
| none | 17 | 5 | 85 |
| one, or "keep today's" | 40 | 4 | 160 |
| two | 48 | 3 | 144 |
| three | 42 | none (done) | 0 |
| **total** | | | **389** |

- Every new take has its own new wording (`src/js/07zau5-sfx89.js`, `ZAUD.V89`). Each is a different source or idea, none reuses an earlier wording, there are no duplicates, and each runs 19–37 words.
- The takes Kris kept are listed in `ZAUD.KEPT89`. The takes he didn't pick are dropped.
- The celebration's crowd has no children (the first cry comes after it).
- To make them: `.\tools\audio\audio4.ps1` runs `sfx.mjs --set v89` and saves `audio/incoming/<id>.v1.mp3` … `.v5.mp3`. That is about 18,500 ElevenLabs credits, and the script is safe to run again.
- Then `sfx_preview.py` (now with kinds v1–v5) puts them in the Lab.

### Lab → Sound effects → "Round 89 — the new takes" (at the top)
- One row per effect. The effects with no pick yet come first.
- Each row shows the takes Kris kept (★, still picked) and the new takes (New 1–5), each with ▶ to play and ☆ to pick.
- Up to three picks in all, kept ones included; clicking a ★ drops it.
- Picks are saved as `sfx89-<id>` (e.g. `l2+v3`). Until a row is touched, it stands at what was kept.
- Effects that already have three picks stay in the table below, done.
- `pick_sounds.py` accepts v1–v5.
- Test: `tests/test_round89b.py` (3).

## Tapping into adventure sites
Kris: "in the mobile app, i wasn't able to enter adventure sites with clicking, and it still showed 'tab to enter'."

- An adventure site has no "[Tab]" line of its own; its label (a page element) said "[Tab] Enter …", bypassing the phone wording. The label now goes through `ZCLICK.word` and reads "👆 Tap: Enter …".
- A site now counts as something to tap (`24v` `ZCLICK.siteXY` / `siteAt`):
  - Tap it from beside it and you go in.
  - Tap it from further off and the hero walks there and goes in.
  - This works on desktop with a click too.
- Test: `tests/test_round89.py` (3).

## Music picks
The Music tab's cards already carry ☆ and notes for every piece, so final picks and requests to redo a piece go there (Kris found them).
