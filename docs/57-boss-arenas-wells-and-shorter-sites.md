# 57 — Rounds 105–106: you on the map, the bow fixed, bosses come for you, a still arena camera, healing wells, shorter sites

## Round 105

### The map

- You are marked by a pulsing teal ring and a "You" tag, laid over the map where you stand. They follow zoom and pan.
- The arrow under them is bigger and sits on a dark disc with a white rim.

### The bow (Kris: "loads of arrows … unable to use them or shoot")

The hold-to-draw of round 102 could get stuck:

- A draw whose Ctrl key-up was lost (to the system, another window or another scene) blocked every later shot without a word.
- Now a stale draw is dropped.
- A held draw lets go at the next key or click made without Ctrl.
- If the draw cannot start, the arrow flies at once.
- When a shot cannot happen, the game says why: no bow in the Ranged slot, a magic weapon in hand, or out of arrows. A crossbow with only arrows says *"Your Crossbow shoots darts — your 49 arrows need a bow."*

### Music

`mu_castle` is new; the island castles play it (they used the dungeon's music).

### Lab › Inventory layout

Today one Weapons tab holds 52 melee weapons, 29 bows and crossbows, and 10 staffs. Armor has 71 pieces in 6 slots; Accessories have 34 in 3.

**Three layouts (☆ one):**

1. Sub-tabs under each tab.
2. One list in groups (worn item first, ▲/▼).
3. Slot first, from the hero figure.

**Seven extras (✓/✕):**

- a sort menu
- element chips
- "upgrades only"
- stack duplicates
- tier badges
- mark to sell
- a new-item dot

## Round 106

### Shorter sites (Kris: "some of the adventure site levels take too long … dozens of mini rooms")

- Every floor of every site was measured: its walkable area, and the shortest walk from stairs to stairs.
- Sites far over about 9,000 tiles in all, or a 650-tile walk, keep fewer floors (`SITE_FLOOR_CAP`, 07d).
- The minimum is three floors (two for a mage tower), and the guardian stays on the last.

| Site | Floors before → now | Why |
|---|---|---|
| Highlands boss dungeon (`s3_dungeon`) | 7 → 3 | 26,800 walkable tiles |
| Boulder Field | 8 → 3 | 26,500 tiles |
| Crystal Grotto | 6 → 3 | 16,500 tiles; a 977-tile walk |
| Root Hollow | 5 → 3 | 13,600 tiles |
| Tower island (Ashlands isle) | 5 → 3 | 11,800 tiles |
| Castle q4_c | 4 → 3 | 10,000 tiles |
| Pillared Hall | 6 → 4 | a 947-tile walk |
| Ashlands boss dungeon, Spiral Chasm, Reflecting Hall | 8/7/7 → 6 | |
| Monolith mage tower | 3 → 2 | |

The world and the Tome agree with the new counts.

### Casting and shooting say "not yet"

- X shows no rune circle without the mana or while the spell recharges. It says which: *"not enough mana (12 / 16)"*, *"Frost Bolt recharging — 1.4 s"*.
- Ctrl starts no draw without arrows (round 105).

### Bosses come for you (09u-boss-move.js)

- A boss that has seen you walks toward you whenever it is not busy with an attack. This covers both the monster-engine bosses and the older realm guardians.
- **Blink to you:** stay more than about 4 tiles from its edge for 1.6 s and it blinks to 3–4 tiles from you.
  - It shimmers at both ends, with a 0.45 s warning before it lands.
  - It only lands on ground you can stand on and see it from.
  - At most once every 4–6 s; never in the middle of an attack or while staggered.
- **Roaming blink:** about every 9 s it also blinks round to another side of you.
- Switch: `BMOVE.on`.

### A still camera in the boss arena (12c-boss-camera.js)

- **The arena:** every tile the guardian can walk to within 12 steps of its spot. A phase-2+ arena counts whole.
- **Stepping in:** the camera glides to the arena's middle, zooms out just enough to show all of it (between 1.6 and 0.8), and stays there. It holds that frame even if a boss intro tries to move it.
- **Leaving or winning:** the camera follows you again.
- **Too big:** an arena too big for 0.8 keeps the follow camera, which the round-64 boss view leans toward the boss.

### Healing wells (12d-heal-wells.js)

- **Where:** floors 2, 4, 6… of every adventure site; not in trials or boss arenas. The well stands in the part of the floor furthest from the walk between the stairs (a side room, a dead end), picked by the floor's seed among the furthest spots.
- **How much:** Tab restores a quarter to a half of your health, never more than 8 hearts, then the well runs dry.
- **At full health** it waits for you.
- **Coming back:** a floor you return to remembers its well is spent.
- **Look:** drawn as a stone ring with glowing teal water until the paintings arrive.
- **Ordered (07zt11):** the well full and spent, in stone, frost and basalt (6 pieces, `sc_r106_wells`). To make it: `.\tools\sprites\redo.ps1 -List r106`.

### Fairies always answer Tab

A fairy flits round a circle about two tiles wide, so standing still you were only near her now and then. Now:

- Tab talks to her anywhere near her circle.
- At a waystone, Tab travels only when you stand on the stone itself.

### The waystone list scrolls

The travel list beside the map scrolls inside the map's height, so the Ashlands stones at the bottom can be reached.

### Dying shows only the rune pop-up

- The "death" lesson now goes quietly into Training.
- Nothing opens a dialogue box while the death pop-up is up; a box that was open is closed.
- The pop-up's own keys always work. Before, an open lesson box swallowed every key under it.

### Music

New: `mu_fight` (replaces the old one), `mu_island`, `mu_mage`, `mu_sky`, `mu_trial`. The old `mu_fight` is in `audio\replaced_r106`. `mu_castle2` and `mu_ash_day2` wait in `audio\incoming` with no cue.

### Lab › Site backdrops

Eight floors as they look today, what is wrong with them, and seven fixes to ✓/✎/✕:

- a built edge on every floor
- push the backdrop far away
- two moving layers
- "you are inside a tower"
- floating islands on purpose
- paint the wall tops
- clear floor, plain void

**What is wrong:**

- hard square edges
- no thickness
- backdrops too big and too close
- floor and void look alike
- blank wall tops
