# 75 — The economy, second pass; finding and buying items; wave S2 and the sky guardians in (round 120)

## Kris's round-119 picks
- **✓ (16):** a fairer world cut, the prize, floor chests, Alphas pay, the hard-fight floor, price by the minute, bad-luck protection, nothing lost for a collector, the lost purse, bonus-XP moments, Valour, the spoils screen, rarity, the bounty board, late sinks, Dungeon Coins for gold.
- **✕ (1):** Treasure maps.
- **His note on Alphas:** "make sure we also notice when there is an alpha".
  - Today an Alpha is 20 % bigger and has "Alpha" in its name tag. That is all.
  - Proposal N9 answers the note.

## The game, phase by phase
`tools/economy/eco_phases.py` builds the comparison from the round-119 model. It covers:
- **three scenarios:** today; as picked; picked + the round-2 fixes;
- **two players:** the story player (main road) and the explorer (everything once);
- **for each realm:** minutes, gold in and out, left over, gold a minute, the kit in minutes, where the level cap comes, Valour chests, gems found against gems needed, and reward moments an hour.

The output goes to `sprites/requests/economy_phases.json` and `lab/src/js/79v2-0b-economy2-model.js`.

**In the Lab:** a new tab, **Economy — round 2**. It has toggles for scenario and player, gold-in and gold-out bars, and "the purse after each realm" (one line per scenario).

### What is still out of balance with the picks in
1. **XP spills over.** Inside sites every monster gives full XP, and a level needs only 100 × level.
   - Story players hit each cap 22–34 % of the way through a realm.
   - At 500 XP × realm, Valour becomes about 60 chests in the Ashlands, more gold than everything else there.
2. **The Ashlands flood.** A quarter-of-the-run prize is about 2,300 g. A story player leaves the Ashlands about 55,000 g up.
3. **Gems swing to plenty.** At +0.5 % a miss, an explorer finds about 2× what the forge and settings need.
4. **Story players have nothing to buy.** The new sinks only reach explorers.
5. **The Binders pay nothing.** That is 40 hard fights, and they were not in the hard-fight floor.
6. **After Surtharn, gold has no use.**
7. **The Ashlands cap still comes early,** even at 300 × level.
8. **Island traders sell rare gems for 40 g,** because they price items with no shop price at sell value × 2, or 40 g. Also, the Sky Sword (attack 28) sells for 400 g, while the Flame Blade (attack 22) costs 500 g.
9. **A correction to round 119:** the Flame Sword and the Sky Sword are sold on Ember Isle and Frost Isle. The sky ports lock nothing away; only Oswin's Raven cloak was a true either/or.

### New proposals (Kris picks)
| # | Proposal | In short |
|---|---|---|
| N1 | A steeper XP curve | 300 × level (400 × level for levels 15–19). Caps arrive 67–89 % into each realm. |
| N2 | Valour, tuned | A chest every 1,000 / 2,500 / 5,000 / 8,000 XP past the cap, each worth about 2 minutes of gold. That is about 8–12 a realm for an explorer. |
| N3 | The prize tapers | 25 / 25 / 20 / 15 % of the run's gold, with the hard-fight floor still under it. |
| N4 | Gentler bad-luck protection | +0.1 % a miss, about 28 kills a gem on average. |
| N5 | Kit prices recalculated | 600 / 1,700 / 2,600 / 5,000 g, about 12 minutes of a story player's gold in each realm. |
| N6 | Things every player buys | Funding the village's next building after each tower (1,000–10,000 g), and saddles and barding (200–3,000 g). |
| N7 | The Binders pay | 60 / 160 / 320 / 560 g each, plus XP and a gem chance. |
| N8 | Gold after Surtharn | Brokkr's commissions: tempering the Sovereign pieces and recasting elements; great-feast years. |
| N9 | Alphas seen at a glance | A gold ring underfoot, a gold-framed health bar, a crown pip, a growl and a toast, and a minimap dot. |

**With N1–N9:**
- A story player's kit costs 10–12 minutes in every realm, and they finish each realm 1,300 / 2,600 / 3,700 / 11,500 g up.
- An explorer is short in the first two realms (−2,600 / −8,500 g) and catches up in the Highlands and Ashlands.
- There are 24–36 reward moments an hour.

## Finding and buying items
**Today:** leaving out spells, skills and key items, 247 of 293 items (84 %) can be had for gold somewhere: a village shop, an island trader, the jeweller or the forge. The other 46 can only be found.

| Group | How it is gained today |
|---|---|
| Weapons (91) | 55 forged only. Bows and crossbows are never found. |
| Armour (86) | 79 % bought only. Helms, boots, gauntlets, legs and cloaks never drop. |
| Rings and amulets (23) | Only one ring is sold. |
| Gems and materials (22) | Rare gems and forging items: found only, except the islands' mispriced pearl and skystone. |

### Item proposals (Kris picks)
| # | Proposal | In short |
|---|---|---|
| I1 | Island traders become specialists | Each island sells its realm's rare gem at 5 × worth, plus three new island-only pieces: 12 in all, for example the Corsair's Longbow, the Bogwalker Boots, the Emberglass Gauntlets and the Rime-cloak. |
| I2 | Hamlet stalls | The spirits' kin sell their trade's goods once six spirits of the realm are free, including 12 hamlet-only pieces. |
| I3 | The sky-port quartermaster | Sky gear and the cannon upgrades. |
| I4 | Gear drops | Rare and Golden chests and Alphas (1 in 4) drop shop gear in any slot. |
| I5 | Relics, a find-only band | About 60 items: boss rings, the Sovereign set, rare forging items, villagers' gifts, named pieces and trophies. The Tome gets a Relics page. |
| I6 | Twelve named pieces | Find-only: from Binder captains, named Alphas and wardens. |
| I7 | Four lesser rings at the jeweller | |
| I8 | Alpha trophies | About 30, for the trophy hall. |
| I9 | Prices you can trust | Every item gets a buy price; a test checks the rules. |

### The unique mechanics we keep
Kris: "keep special things like shards and the glasses as unique mechanics".

| Key item | How it is gained |
|---|---|
| Soulglass shards | Binders |
| Lattices | Sólveig |
| Soul gems | Boss-dungeon spirits |
| Island metals | Island traders |
| Hearth trays | Mira |
| Heartglass | The forge hearths |
| Forge keys | Brokkr's anvil |
| The Lodestar | |
| Raven keepsakes | |
| Vault relics | |
| Spells | Mage towers |
| Skills | Castle teachers |
| Mounts | |
| Familiars | |
| The Sovereign set | |
| Boss-tower rings | |
| Rare forging items | |
| Dungeon Coins | |

The tab lists how each one is gained.

## Paintings and sounds in
- **Wave S2:** all 29 sheets are cut into the game.
  - The village's buildings and props get autumn and mild-winter paintings. They load with their season through `ZSEASON.item`.
  - The 11 festival sheets are in the atlas, ready for the festival system.
  - In the Lab: Seasons — the paintings shows the S2 repaints and a new Festivals row, with ✓ / ↻.
  - The Lab holds at most 511 files, so the S2 originals get a placeholder ("the approved sheet, in the game today").
- **The sky guardians** (`r117_sky`): all four are painted and used in the sky ports.
- **The round-118 sound remakes** (y1–y5 for Berserker, Chain Lightning and Starfall) are in the Lab's Sound effects tab.

Tests: `test_round120` (8).
