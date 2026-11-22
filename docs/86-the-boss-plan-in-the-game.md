# 86 — The boss plan, in the game (round 129)

Kris: "all the picks for boss fights are in. even if i didn't pick 'yes' i like what is picked. let's get it into the game … ok to take out the 'today' ones i picked" if they clash.

## What the game now does
- **97 phases of 59 bosses** fight from a ranked list: Kris's own for 39 phases, the suggested one (which he accepted) for the other 58. Generated into `src/js/09bx-0-boss-plan2-data.js` by `tools/world/boss_plan2_game.py` from the Lab plan and `tools/world/boss_picks129.json`.
- **Today's mechanics:** signature attacks, the last stand, ward/guard/plate bars and arena events stay only where he kept them. 191 kit attacks he left out make way for the new elements (the boss's walk always stays). Allies make way where he left them out. Extra health and the element are always kept.
- **69 new kinds of element**, each a boss pattern in `src/js/09bx-boss-plan2.js`, kept inside the arena:
  - Shots: fans, spirals, seekers you can pop, ricochets, splitting shells, lances, serpent shots, returned orbs, hooks, trails, orbits, the aimed shot.
  - Area: checkerboards, cross lanes, spirals of strikes, safe circles, the rising floor, crumbling edges, rising pillars (cover that blocks shots), the great strike (hide behind the anvil), drifting clouds, slick floors, snares, spreading fire, chasing columns, geysers.
  - Rushes: the charge that stuns itself on the wall, whirlwinds that leave it dizzy, grabs, tail sweeps, the shield stance (get behind it), stampedes, the duel (shield as it strikes).
  - Movement: vaults, swoops, dash chains, mist, mounted passes, stomps, rolls.
  - Summons: minions, totems, shield-bearers (it takes a quarter of the damage while they stand), eggs, raising the fallen (break the bones), swarms, the beast.
  - The arena: weak points after every second big move (+60 % damage), braziers to lure it into, darkness and light, the other half to strike, element stances.
  - Mind games: curses, hiding with footsteps, feints, doom marks (stand in the light), time drag, gravity wells, the roar, the beat.
- **Difficulty** (the scheme Kris chose, "a share of the list"): Hearthside plays the top half of each phase's list, Wayfarer 70 %, Shieldbearer 85 %, Ragnarök all of it (never fewer than two).
- **Travel:** only bosses with magic blink. The others leap or stomp (with a landing ring), charge, dash, dive or burrow (sink and surface), drift as mist, or swoop.
- **Paintings:** one prop sheet, `sc_bp_props` (wave 130): the brazier, four rising pillars, the anvil, bones and a totem. Until they are painted, the game draws stand-ins.
  - To paint: `.\tools\sprites\paint.ps1 -List r129_bossprops`

## Known limits
- The beat uses a steady 100 BPM pulse. It is not yet tied to the boss track's own tempo.
- Damage rules for the oldest realm guardians (phase 1, drawn by the dungeon scene) work on the health they just lost. The monster-engine bosses (phase 2 and on) use `MX.dmgMod` at the hit itself.

## Lab
"Waiting for your picks" now drops a decision as soon as it is made. Six finished asks are retired: bossplan2, engage, icons, publish, seasons5 and worldlook3.

Tests: `tests/test_round129.py` (16/16). It covers every kind running to the end, cleaning up and landing on a careless hero, the difficulty cut, the kit drops, and the damage rules.
