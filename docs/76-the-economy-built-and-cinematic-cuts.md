# 76 — The economy built; seasons fixes; the cinematic cuts; music and cut feedback in the Lab (round 121)

## Kris's round-120 notes
- **Economy, round 2:** "i like all the economy round 2 proposals". All 18 (N1–N9, I1–I9) are built, and so are the round-1 picks (everything except treasure maps).
- **The Lab bug:** ✓ could not be selected on Economy — round 2. Two click handlers caught the same click, so ✓ was set and then cleared at once. The round-1 handler now skips round-2 rows (`.eco-seg:not(.e2-seg)`).
- **Seasons:** "some didn't show for the village houses". This was a Lab problem, not a request problem:
  - The S2 originals showed a placeholder (the 511-file limit). They are now small inline thumbnails.
  - The spring village slot said "painting…" for a repaint that was never asked for. It now says the village keeps its summer look in spring.
- **Winter feedback:** six sheets are asked for again in `r121_winter_redo`:
  - `vill_core_1`, `vill_core_2`, `vill_special_1`, `vill_special_2` and `vprops_1` get mild festive decor: a wreath or two, sprigs of holly, nothing heavy.
  - `vprops_3` shows the vegetable plots harvested and bare.
- **Shot series:** the original painting is now offered as a shot in every frame ("the original painting", shot 0, no zoom).
- **Music:** the Music tab is in the main Lab (53 cues). The previews are joined into two files so the Lab stays under 511 files.
- **Fullscreen:** the cut video's ⛶ button makes the whole player fullscreen, words included. The browser's own fullscreen is turned off, because it showed the video without the words.
- **Cut feedback:** every finished cut has ✓ Good / ↻ Cut it again, a notes box, and a note per frame.
- **Cinematic cuts:** "the special effects applied to the first set of images were better…". `tools/video/series_cut.py` now picks each shot's camera move from its frame's mood:
  - **impact:** crash zooms, whip-shake, a white flash;
  - **magic:** crane up or snap in with a breathing glow and a rune-blue flash;
  - **dread:** a dutch angle, a slow creep in, dark edges;
  - **tender:** a hand-held sway, a little warmer;
  - **journey:** wide pans.
  - The first shot comes down out of the sky. The last shot pulls up and away. Whip-pans join shots inside a frame.
  - The first spirit freed is re-cut this way (66 s, 14 kinds of move).

## The economy as built
Settings live in `src/js/22m-economy.js`. The places live in `src/js/22m2-economy-places.js`.

| | What it does |
|---|---|
| The world cut | Monsters out in the world pay 50 %. Camp guards pay in full while their camp stands. |
| XP | A level costs 300 × level, and 400 × level from level 15 (N1). The first kill of a kind gives +50 %. A night at the tavern gives Rested (double XP up to half a level). A flawless floor gives +25 %. Finding a new zone gives XP. |
| Valour (N2) | XP past the level cap fills a Valour bar. Each bar gives a chest. |
| Clear prizes (N3) | Never under the realm's floor (150 / 400 / 800 / 1,400). A rematch pays a quarter. |
| Floor chests | Common 70 % / rare 25 % / golden 5 %. A rare chest adds a gem; a golden one adds a gem and a rare forging item. |
| Bad-luck protection (N4) | Each miss raises the chance (+0.1 %). A rare boss drop is certain by the 4th rematch. |
| Kits by the minute (N5) | Prices are scaled per realm, so a realm's kit costs 9–15 minutes of story play. |
| Saddles (N6) | Four saddles at the stables (+5 % mount speed each). |
| The village fund (N7) | Ten gold sinks for the village: the barn, windows, the crane, the hall, four festivals, the trophy hall, and the great feast after the Lodestar. |
| Brokkr, after the Lodestar (N8) | Temper Sovereign pieces (3 tiers, +15 % each) and recast set pieces. |
| Alphas you can see (N9) | A gold ring, a gold health frame and ♛. A growl and a toast when one is near. Gold dots on the minimap. The first Alpha of each realm is named. |
| Alphas pay | 2.5 × gold, 2 × XP, a 25 % chance of gear, their trophy the first time, and the named Alpha's relic. |
| The Binders | Each pays 40 % of the realm's floor, XP, a 30 % chance of a gem, and the captain's named piece. |
| The lost purse | Dying drops 10 % of your gold where you fell. Walk back to pick it up. |
| The spoils card | When you leave a site, a card shows what the run paid, line by line. |
| Runa's board | On the Green: three bounties every 40 minutes, the village fund and the trophy hall. |
| Dungeon Coins | The jeweller sells them for gold and trades gems 3 for 1. |

### New things to find and buy
- **I1 · Island traders:** each island sells its own pieces (12 new items). Gems are priced properly now (Pearl 450 g, Skystone 1,000 g, two of each per tower cleared).
- **I2 · Hamlet stalls:** a trade stall opens in each hamlet once 6 of the realm's spirits are home (12 hamlet pieces).
- **I3 · Quartermasters:** each sky port's quartermaster sells, including the Sky-silk Cloak.
- **I5 · Relics:** a new page in the Tome, with a hint for where each one is found.
- **I6 · Named pieces:** 12 named pieces from wardens, Alphas and captains. They are found only, never sold.
- **I7 · Lesser rings:** four lesser rings to set gems in (150–2,400 g).
- **I8 · Trophies:** one for every kind of monster, from its Alpha.
- **Collectors:** Oswin buys Raven tankards; his cloak is the only piece that locks.

### The unique mechanics we keep (no gold buys these)
| Key item | How it is gained |
|---|---|
| Soulglass shards | From freed spirits after their Binder falls (10 a realm, 6 needed) |
| Soulglass lattices | Sólveig fuses six shards of one realm |
| Soul gems | From the great spirit of each boss dungeon |
| Island metals | From each familiar island's trader only |
| Hearth trays | Mira makes one from a metal and a soul gem |
| Heartglass | A lattice and a tray, placed on the forge's hearth |
| Forge keys | Brokkr's anvil |
| The Lodestar | The four Heartglasses, after Surtharn |
| Raven keepsakes | One in each realm's sites |
| Vault relics | +3 maximum health each |
| Spells | Mage-tower masters (16) |
| Skills | Castle teachers (12) |
| Mounts | Boss dungeons, sky ports, the stables, the Eagle and the Dragon |
| Familiars | Each island's guardian |
| The Sovereign set | One piece per completed set |
| Boss-tower rings | Two per boss tower |
| Rare forging items | From wardens, masters, guardians and Alphas |

New in this round:
- the named Relics (found only);
- Alpha trophies;
- Valour chests;
- Brokkr's tempering.

### Corrections
- **Round 119 said there are no floor chests.** There are: 2 a floor in towers and 3 a floor in dungeons. The chest roll keeps their gold about where it was.
- **Round 119 said the sky-port swords are sold only at the sky ports.** Ember Isle and Frost Isle sell them too (corrected in round 120).

## Pictures to paint
- `.\tools\sprites\paint.ps1 -List r121_economy` — 10 sheets:
  - item icons for the new pieces and the trophies;
  - Runa's board;
  - the lost purse.
- `.\tools\sprites\redo.ps1 -List r121_winter_redo` — the six winter sheets.

Until a picture is in, the game shows each new item's emoji.

Tests: `test_round121` (19). `test_round118` is updated: its camera check now tests for variety, and its sheet count includes the winter sheets in wave 121.
