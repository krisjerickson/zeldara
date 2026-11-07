# 47 — The painted boss attacks in the fights; the sandbox teaches the roll (round 91)

Kris: "i was playing against a boss, and we still had the large area attacks that were just pixel versions of their attacks. so lets make sure this update actually got into the game for the painted boss area attacks."

Kris: "i thought we had added in a roll skill early in the game, but not finding it currently … we should make it so you have a sandbox option for earning it, but check that we have it added in."

## What was wrong
- **Painted attacks.** Round 90 painted all 70 pieces (ten families × seven), and they were cut into the scenery pages. Only the Lab showed them. The wiring into the fights was planned for after the Lab review (doc 45, "Next"), so every fight still drew flat blocks and circles.
- **The roll.** The roll is in the game. Tumbler Pia, camped by the Rime Spire (the first mage tower), teaches it once you bring back her three juggling pins (`10p-roll.js`, round 45). A sandbox run skips her.
- **Broken sandbox buttons.** Three sandbox buttons had never had code behind them and did nothing: **Give All Spells**, **All Special Skills** and **Complete All Quests**.

## What changed
### `src/js/09bc-boss-fx-art.js` (new) and `09bb-boss-patterns.js`
Every screen-wide attack now uses the painted pieces:

| Attack | Painted pieces |
|---|---|
| Sky rain | The danger columns fill with warning sigils. The strikes fall onto them and burst into impacts. |
| Sweeping wall | Built from the wall piece, laid end to end, facing the way it moves. |
| Radial burst, rotating beams, mirror images | Each ray is the family's beam. |
| Floor takeover | The deadly half is covered with the deadly-ground piece (faint during the warning, solid when live). |
| Burrow | A trail of deadly ground, then the sigil where it stops, then the impact and the ring. |
| Shockwave | The family's ring, with its gap cut out of the picture exactly where the gap is. |
| Leaping combo | A sigil where each slam lands, then the impact. |
| Strafing run | Sigils down the lane. The fire left behind is painted deadly ground. |
| Eclipse | Sigils, then the strike falling out of the dark. |

**Which family is used:**
1. Surtharn and Solmyrk always get their own families.
2. Otherwise, the attack's theme decides (`rain:fire` → fire and lava).
3. Otherwise, the boss's own family (`BossPat.FAM_OF`), then its kind (fire, ice, storm …), then its colour.

**Rules kept:**
- Thin edges stay on the danger areas, so the safe places still read exactly.
- The hitboxes are unchanged.
- Where a picture is missing (painted scenery off, or still loading), the old shapes draw as before.

### Sandbox (`23-sandbox.js`, `body.html`)
- New button: **🤸 Learn the Roll (Alt)**. It marks Pia's lesson as done.
- **Give All Spells**, **All Special Skills** and **Complete All Quests** now work. The last two also teach the roll.

## Still waiting on the Lab review
- ☆ and notes in Lab → Painted boss attacks still apply. A family Kris wants changed gets repainted, and the fights pick up the new pieces automatically.
- The boss-shape picks and the smaller safe share on harder difficulties (round 85) are separate and not done yet.

Test: `tests/test_round91.py` (7). It runs every attack with the paintings on: each shows painted pieces, the right ones, and leaves nothing behind. It also checks the family choice and the sandbox buttons.
