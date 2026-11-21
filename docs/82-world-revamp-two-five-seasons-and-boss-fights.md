# 82: The world revamped 2, the five seasons, and boss fights remade (round 127)

Kris asked for five things this round:
1. Address all his world-revamp notes and order paintings so the options can be seen first.
2. Make the mock-ups look like the actual game.
3. Find the summons that are still pixel art.
4. Give the five seasons their own looks.
5. Rework every boss fight, with area attacks kept inside the arena.

## What went wrong with the round-124 pictures
They were taken with the test harness's default `game()`. That mode switches the painted sprites and painted scenery **off** (`ZAtlas.off`, `ZScn.off`), because the test suites run on stand-ins. They were also taken while round 120's damaged scenery index was still in place (doc 80). So "today" showed stand-in trees and a pixel-era tower.

**The fix** is `tools/world/world_shots.py`:
- It runs the game painted (`game(painted=True)`).
- It **stops if the painted pages are not all present** (at least 100 pages and 2700 items).
- It hides only the HUD; building labels, the fog and the ambient layer stay.
- It shoots each place in layers:
  - `F`: the full frame;
  - `P`: without actors;
  - `G`: the ground only;
  - `N`: the game's own night.

The cloud copy now has all 398 painted files, matching the PC.

`tools/world/world_looks2.py` makes each mock-up change only the layer its idea touches. When it adds painted pieces, it uses the game's own, cut from the scenery pages at the game's scale.

## The world, revamped 2 (Lab tab `worldlook2`)
Kris's note on each option is shown with the answer to it.

**Light and colour**
- **Realm colour grade:** 75 % of round 124's strength, on natural ground only.
  - Sprites, buildings and painted pieces such as rune circles and laid stone keep their own colour.
  - A **second lab** puts four sprite looks over the graded ground: as painted, a touch richer, the realm's light, or a soft dark rim. Pick: `worldlook2-spr`.
- **Painted shadows:** each sprite is checked first.
  - If its painting already has a shadow (the ground under it is the same hue, only darker), it is left alone. Most trees, bushes and characters already have one.
  - Everything else casts a shadow from its own painted outline.
- **Golden hour:** two gentle strengths, 45 % and 70 %. Sprites take only half of the tint.
- **Night:** between the game's own night and round 124's.
  - A moonlit blue; warm lanterns and windows; blue runes.
  - Actors stay clear, with a faint moon-rim.
- **The aurora, re-proposed four ways:**
  - in the water only;
  - a faint ribbon over the land;
  - a crown over the Green on festival nights;
  - in the sky of the night vistas.

**Air**
- Calm most of the time. A gust every 25–40 s lasting 6–10 s.
- A quarter as much in a fight, and never over a boss's telegraphs.

**Water and ground**
- **Water:** tried with the game's own painted lilies, foam, fish, reeds and cattails.
- **Ground:** rebalanced. A few moss, clover, pebble and wildflower patches, about one per third of a screen, on open grass only.

**Places**
- **Landmarks** (6) and **vistas** (4): paintings ordered, with no mock-up until they are in.
- **Adventure sites:** a try-out using today's real painted exterior, painted banners and a beam of light. Grand exteriors for the 8 boss sites are ordered.
- **Cinematic moments:** framed shots plus four ordered **flourish frames**:
  - a woven tapestry;
  - a puppet-stage arch;
  - illuminated saga corners;
  - four runestones.
  - These draw on the 2026 Ocarina of Time remake: its "puppet-show" look and tapestry-framed opening, per GamesRadar and Game Informer.

**Dropped as Kris said:** cloud shadows, painterly depth, and the land remembers (it already exists).

**Requests** (`r127_world`, 18 sheets):
- `07zt20-art-r127-world.js`:
  - 4 frames, 3 landmark sheets, 4 vistas, 2 site sheets;
  - aurora, water, ground, air and night-light pieces.
- Nothing goes into the game until Kris picks.

## The five seasons (Lab tab `seasons5`)

| Season | When | What it shows | Nordic customs it draws on |
|---|---|---|---|
| **The thaw** (sp) | You set out | Muted and grey-green | Old snow in the shadows, mud, catkins and coltsfoot, boats tarred, bedding aired, the first furrow |
| Summer (su) | The Wetlands open | As painted | Midsummer |
| **The first true harvest** (au) | The Highlands open | Bounty | Haustblót and the Winter Nights, hesje hay racks, stooks, the last sheaf, Yule ale brewed, rowan garlands, berries and chanterelles |
| **The first happy Yule** (wi) | The Ashlands open | Joy | Julbock straw goats, straw stars and himmeli, the julenek bird-sheaf, snölykta snow lanterns, spruce at the door, candles, the Yule log, the oath-boar |
| **Freya's spring** (bl) | The spirits are home | A celebration of life | Valborg fires, birch boughs at the door, flower crowns, wood anemones, lily of the valley, apple blossom, bees, swallows, the flower pole |

**In the game now** (`10zs`):
- The first spring uses the thaw paintings (suffix `_th`). Until they are in, it shows a muted tint (saturation 0.62) and a few catkin seeds in the air.
- Freya's spring takes the lush `_sp` paintings that were already painted.
- The round-122 village spring repaints (not yet painted) are re-aimed at Freya's spring.

**Requests** (`r127_seasons`, 35 sheets):
- 12 thaw world sheets and 5 thaw village sheets;
- 5 land sheets (thaw ×2, harvest, Yule, bloom);
- 5 village sheets re-aimed at Freya's spring;
- the 8 festival sheets of round 118 re-told:
  - the thaw's touches are small and hopeful, with no feast;
  - the Blossom Feast moves to Freya's spring.

`r127_seasons` replaces `r122_spring_village`.

## Boss fights remade (Lab tab `bossplan`)
- **A catalogue of 78 kinds of boss move** in 7 themes: projectiles, area attacks, rushes and melee, movement, summons, the arena, and status and mind games.
  - They come from the game's inspirations: Zelda, Hollow Knight and Silksong, Hades, Cuphead and Gungeon, Furi, Titan Souls and Shadow of the Colossus, Souls and Elden Ring, Monster Hunter, God of War and Valheim, and Sekiro.
  - They also use the game's own systems: elements, rhythm, the extra-health bars and stagger.
- **59 bosses**, each with:
  - today's attacks (from the Lab's boss list);
  - **ten proposals chosen for it** (590 in all; 39 need new art), to tick;
  - a proposed way to close the gap.
- **Teleporting:** today every boss blinks (09u). Proposed:
  - only bosses with magic keep the blink, each with a tell of its own;
  - the Bone King, trolls, dragons, knights and machines charge, leap, swoop, burrow, dive, stomp, swing on chains or ride instead.
- Picks: `bossplan-<boss>` (ticked proposals in `regions`, the movement in `verdict`).
- Files: `tools/world/boss_plan*.py` → `lab/src/js/79y-0-bossplan-data.js`.

### The summons
**What was checked:**
- the 17 kinds of summon in the monster kits;
- the phase allies (4);
- the Muspelheim guards and wardens (6);
- the elites' kin (4);
- the mirror copies;
- the Asgard risers;
- the forges' foes (8);
- the volcano rush swarm.

**Result:** every one has a painted sheet, and in live fights they all drew painted (sampled 16 times each). The only stand-in moment is the first frame or two while a sheet loads, and that has been hidden since round 101.

The Lab shows all 38 units, cut from the game's own sheets, so Kris can point to the one he saw. New summons proposed in the boss plan will be requested once he ticks them.

## Area attacks stay in the arena (in the game now)
`src/js/09bd-boss-arena-clip.js`:
- **What counts as the arena:**
  - On a site's last floor, it is the planned arena room (`F.arena`).
  - Elsewhere (castles, mage towers, the phase arenas), it is the open ground reached from the boss's spot within 14 tiles, or 34 tiles in a phase arena.
- **What is clipped to it:**
  - The patterns' field is cut to the arena's box.
  - Everything the patterns and the boss's own attacks draw is masked to the arena floor: telegraphs, strikes, painted marks, walls, beams, rings and burning ground.
  - Marks, geysers, rifts and lava waves land only on arena floor.
  - Blinks and mirror copies stand only on arena floor.
- `BARENA.on` is the switch.

**Tests:** `test_round127` (17 checks); `test_round122` was updated for the re-aimed spring sheets.
