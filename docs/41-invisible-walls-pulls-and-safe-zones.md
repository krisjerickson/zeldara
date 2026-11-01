# 41 — Round 84c: invisible walls, boss pulls, safe zones, the dialogue box, the sound picker

Kris (Oct 31): "we are also still finding invisible walls in the game. Make sure we do a thorough analysis of this, find where it's happening and fix"; "some of the boss pull-in mechanics are too strong, and you just get perma stuck next to the boss, even if you roll away"; "at least 25% of the screen that is safe and multiple locations"; "a higher res image of the hero for the inventory"; Lab: "separate out music and sound", "use up to 3", archive the finished tabs; "new audio files are now in!" Earlier the same day: the dialogue box and its ten looks, the twin too large in the library, no music under the intro.

## 1. Invisible walls — the audit

A full sweep with the harness (scripts in the cloud workspace `z/audit/`: every site floor, every interior, the overworld props, the region borders on foot and per mount, the islands). Ranked by how often a player meets them:

| # | Cause | Where | Fix (file) |
|---|---|---|---|
| 1 | Walls painted in the floor's own tone. Collision was right; the picture read as floor | Bone Pit (7 floors: 269–322 of ~370 wall tiles within ΔE 22 of the floor), Rivendell, the island tower, Root Hollow, Sunken Courtyard, Crystal Grotto, all 12 elite dens, all 20 boss arenas (rock top = floor) | The painted floor is measured and the wall top and face are pushed apart from it (`07zy-site-paint.js`, `07c-site-caverns.js` — as `07b towerWall` did since round 45) |
| 2 | The hero's stopping box sat at his waist (±6 px round `p.y`; his painted feet are at +13 / +15) — he stopped ~20 px short of anything ahead, and his feet sank into anything behind | Everywhere | The box is at his feet (`ZFEET` W 6 / D 9; `10-scene-world.js _canGo`, `12-scene-dungeon.js _heroGoD`, the knock-back, roll and pull paths). A hero already standing where the feet box is blocked moves by the old box, so no save is stuck |
| 3 | Locked regions with no border you can see | On foot: a beach across the NE/SE line (x 1042–1048, y 588–589). On the Alligator: Silverrun river, Mirror Lake (≈730 border steps) | The beach seam is a cliff (`05b-world-build.js`, re-baked). Touching a sealed border raises a curtain of aurora light with runes and says what is sealed and how to open it (`10w-seal-ward.js ZSEAL`) |
| 3b | A tower won and left within the 2 s before the exit: the builder's bridges open, his region stays locked | Rare | The region opens at the win (`12-scene-dungeon.js`); loading repairs saves that lost it (`s1–s3_tower` done → regions 2–4) |
| 4 | Deep water you can't wade looked like the shallows around it (no edge drawn between two waters) | Wetlands, 37,782 tiles | Where blocked water meets wadeable water the deep side darkens and a pale foam lip marks the edge; a blocked tile is never painted as walkable ground and the outline wanders less there (`05c-world-paint.js`, `KT.blk`) |
| 5 | Monsters that are burrowed, lurking or under water blocked while invisible | 7 burrowers, 5 ambushers, 4 swimmers | `16k-mon-block.js ZMB.solid` |
| 6 | Pictures narrower than their solid tiles | Interiors: cake display, jeweller, forge, quest board, trough, the twin's desk (13 tiles); furnished site rooms (7); the overworld arch at (692,438) | Only the tiles a picture stands on are solid (`07v-interiors.js`, `07zy-site-paint.js put`, `05b` arch opening) |
| 7 | Sky Eagle, Storm Drake and Void Serpent (`canCross:'all'`) were stopped like walkers | Water, cliffs | They fly over everything but the deep ocean and walls, like the dragon (`05-worldgen.js canPassTile`) |
| 8 | The Hall of the Norns' two shut spans were painted as plank bridges | Asgard citadel | A shut span shows open sky with a faint dashed thread until its thread is cut (`16g ZCIT._shut`) |
| 9 | Ashlands ruined walls stood behind their solid row | 62 walls, 116 tiles | `dy:14` on the `wall` scenery rule (`07zu`) |

Checked and not a cause: overworld props (4,939, almost all drawn over their footprint), stray solid tiles, village buildings (bands match the pictures), chunk overflow, site entrances and harbours, the site edge clearing, Muspelheim gates, the citadel loom-wall, conjured walls, road clearing. Not yet audited: the Sky scene, fairy trials, the post-ending hamlets, Muspelheim's moving platforms.

## 2. Boss pulls (Kris: "perma stuck next to the boss, even if you roll away")

- A boss's **pull** move waits at least **7 s** (its own cooldown × 1.8), drags you **60 %** of the way and leaves you **60 px outside its body** (`MX.PULL`).
- After any pull you are free of pulls for **3.5 s**; a **roll slips every pull** for about a second ("slipped free!").
- The rooted boss struck from afar (round 83) drags at **16 px/s** (was 30) and lets go at the edge of its reach; a boss's **lure** is gentler (9 vs 14).

## 3. Screen-wide attacks — at least 30 % safe, in two or more places

`BossPat.SAFE = 0.3`. Sky rain: the open columns are ≥ 30 % of the screen in 2–3 separate groups, and a later wave moves them (measured: the least 36 % on every quadrant). The sweeping wall: 2–3 gaps, together ≥ a third of it. The shockwave ring: its gap ≥ a quarter of the ring (1.9 / 1.65 rad, was 1.1 / 0.85). Variety: twelve new shapes proposed (docs/08 › Round 85 › B3) — answered **Lab first**.

## 4. The hero, painted large, for the inventory

The inventory blew up the 63-px walking sprite to 260 px. New sheet **`sc_hero_portrait`** (wave 92, `07zt8-art-r84c.js`): Zeldor and Zeldara standing full length, stored ~520 px tall. `22c-inventory.js` draws them at the screen's own pixel density with a slow breath; until they are in, the old sprite. Order: `.\tools\sprites\redo.ps1 -Ids sc_hero_portrait`.

## 5. The dialogue box (earlier in 84c)

`07zdlg-dialogue.js ZDLG`: villagers' lines come up in a box, typed out at talking pace with a babble in the speaker's own pitch; Space / Enter / click for the next page and Close at the end; the game is paused while they talk (`PAUSE_OVERLAYS`). Ten looks in the Lab (Dialogue boxes tab); until a pick, Rune-stone.

## 6. The Lab

- **Sound effects** (`sfxpick`) is its own tab; **Music** keeps the Suno cues and the plan.
- ☆ up to **three** takes per effect; the game rotates through them (`pick_sounds.py` → `<id>.mp3`, `.b.mp3`, `.c.mp3`).
- The finished tabs (Library, Fonts, Soul-lines ×3, Potions, Asgard, Forge-masters) are in "📁 Archived & earlier rounds" (`79i-lab-archive.js LAB_ARCHIVED`; take an id out to float it up).
- **Rec 4–6** — the Sonniss **GDC2023** bundle (13 of 14 zips; 7 of 14 not there yet): up to three recordings for 139 effects (`lib_picks.py --set 23`, `MAP23`), 404 takes, `s84_l4–l6.mp3`.
- The library painting: Kris picked **take B** → `LIB_TAKE='b'`.

## 7. Music

Plays on the hosted site and local builds after the first click or key (browsers block sound before that). The claude.ai copy of the game cannot hold the music (it is at its 256 MB / 511-file limit). The home page has no music yet (offered: a click-to-play toggle). Cut-scenes play their own pieces (`04c2 cutCue`).
