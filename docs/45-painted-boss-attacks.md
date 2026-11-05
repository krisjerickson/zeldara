# 45 — The bosses' area attacks, painted (round 90)

Kris: "make sure the boss attacks are not using pixel art, and have painted images for their area attacks. These should be thematic with the type of boss you are fighting. doesn't have to be unique for each boss, find some common themes, but surtharn and solmyrk should have their own unique ones. Create an api request for this, and then i'll review these in the lab."

## What changes
Today the screen-wide attacks in `09bb-boss-patterns.js` (BossPat) are drawn as flat coloured blocks and circles. That covers sky rain, the sweeping wall, the radial burst, the rotating beams, the floor takeover, the burrow trail, the shockwave, the leaping combo, the strafing run and the eclipse marks.

The painted area effects of round 48 (`10s-fx-painted.js`, ZFX) already dress the monsters' attacks; the bosses' patterns never got theirs.

## The families
Each boss attack carries a theme (`07zz-boss-attacks.js`, e.g. `rain:fire`, `floor:bog`). The themes fall into eight families (`ZBFX_ART.THEME`), and Surtharn and Solmyrk get their own:

| Family | Themes | Bosses |
|---|---|---|
| Fire and lava | fire, lava | Lava Titan, the Rock Dragon's fire, Ashlands guardians, forge-masters |
| Earth and stone | rock, crystal, hammer | Rock Dragon, Goblin King's hammer, crystal guardians |
| Lightning and thunder | lightning, thunder | Storm Mage, thunder magi, storm drakes |
| Bog, poison and webs | bog, bubbles, web | Swamp Witch, Dark Warlock's webs, insect queens |
| Frost and tide | frost, wave | Frost Queen, rime witches, tide-callers |
| Shadow and void | void, orb, lantern | Shadow Lord, void warlocks, lantern bearers |
| Iron, gears and blades | gears, blades, axe | Iron Sentinel, Forge Guardian, axe and blade masters |
| Gold and light | coins, light | Goblin King's gold, light guardians, Asgard's wardens |
| **Surtharn** | his own | Muspel fire on black volcanic glass, a giant's flaming sword |
| **Solmyrk** | his own | the black sun: an eclipse with a golden corona, spears of gold, the storm that ends the world |

## The pieces
Every family has seven pieces, one for each part an attack is built from:

| Piece | Used for | Size on screen |
|---|---|---|
| Warning sigil | sky rain, combo and burrow marks | 120 × 120 |
| Impact | where a strike lands | 140 × 140 |
| Deadly ground | the floor takeover; what the strafe leaves behind | 240 × 160 |
| Sweeping wall | one length of the wall, repeated side by side | 320 × 70 |
| Beam | each ray of the burst and the spin | 320 × 44 |
| Shockwave ring | the quake's ring | 220 × 220 |
| The strike | what falls in the sky rain (upright) | 70 × 140 |

## The request
- Wave 93, `src/js/07zt9-art-r90.js`: 12 sheets and 70 pieces. There is one flat sheet of six ground pieces per family, matched to `sc_fx_blast`, and the ten strikes sit on two upright sheets matched to `sc_pj_shots`.
- Every request says "No pixel art. No people, no monsters, no boss" and uses the game's painted style.
- To paint them: `.\tools\sprites\redo.ps1 -List bossfx` (`sprites/requests/bossfx.txt`).

## Reviewing
- Lab → **Painted boss attacks**: one card per family. It lists who uses the family, the seven pieces and where each goes in an attack.
- Until the pictures are in, a card shows the seven cells with their words. Once painted, it shows the sheet and its strike.
- ☆ the families you like and write notes for changes. Picks are stored as `bossfx-<family>`; the tab also waits in "Waiting for your picks".

## Next, after the review
After the cut, BossPat lays the pieces over its shapes:
- the strike falls onto the warning sigil and bursts into the impact;
- the wall is built from bands;
- the burst and the spin from beams;
- the quake from the ring;
- the floor from patches.

The family is picked by the attack's theme; Surtharn's and Solmyrk's forms use their own. Wherever a piece isn't painted, the shape stays as it is. The wiring is built along with the boss-shape picks of round 85 (the safe share scaled by difficulty).

Test: `tests/test_round90.py` (5).
