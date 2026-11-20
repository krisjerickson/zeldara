# 74 — The economy review; shield monsters slow to turn (round 119)

## Shield monsters are slow to turn round
Kris: "make it so that monsters that don't take damage from the front turn around more slowly when you get behind them".

A monster with a front guard (`front` in its kit) now does this:
- **Hero in front:** it tracks him as before (1.8 rad/s).
- **Hero behind it** (outside its front, more than 1.1 rad off its facing): it **waits half a second**, then turns at **0.85 rad/s**.
- **Result:** turning fully round takes about 2.9 s instead of 1.75 s. That opens a window to hit its back.

The values are kept in `MX.TURN` (09-monster-engine.js). Tests: `test_round119` (turning, 3).

## The economy review
Kris asked for a detailed analysis of:
- every place to earn gold, against how hard it is and the hero's climb;
- how items are found;
- similar games, and theory;
- a critique, and proposals: ranges vs constants, the completionist, a reward for every hard challenge, bonus XP and how rewards are shown;
- a new place in the Lab for all of it.

**In the Lab:** a new **Economy** tab (main Lab).

**The numbers are measured from the live game:**
- `tools/economy/eco_dump.py` loads the game and dumps every item, the monster roster, the world's monsters, sites, caches, camps, quests and recipes into `sprites/requests/economy_dump.json`.
- `tools/economy/eco_model.py` builds:
  - per-realm gold in and out;
  - the hero's climb;
  - every site run (monsters × gold, prize, minutes, gold a minute).
- Its output goes to `economy_model.json` and to `lab/src/js/79v-0b-economy-model.js` (`LECO.M`).
- When the game's numbers change, run both again.

### What the numbers say
- **3 in 4 gold pieces come from monsters inside sites.** Out in the world, kills pay a third of the purse (the 0.33 world cut).
- **Finishing a site pays very little.** The Dawn Sanctum's 98 monsters carry about 9,100 g; its guardian's prize is 200 g.
- **The rematch pays more than the first win** at boss towers and dungeons (75 g vs 50 g × realm).
- **There are no floor chests.** The chest code is there, but the floor designs have no treasure spots.
- **Alphas** have 1.6 × health and 1.3 × attack, but pay the same gold and XP as their kind.
- **Price against income.** A realm's kit costs about 12 / 4 / 5 / 6 minutes of site gold: tight in the Grasslands, nearly free afterwards. One full Ashlands clear brings about 70,000 g.
- **Gems and Dungeon Coins are the real bottleneck.** A plain monster drops its gem 1.5 % of the time.
- **Two choices lock out a completionist:**
  - the sky ports (the Flame Sword and the Sky Sword exist only there);
  - Oswin's Tankards (the Raven cloak or 600 g).
- **Dying costs 10 % of carried gold.** That punishes saving for big recipes.
- **Totals:** about 131,000 g of faucets and about 105,000 g of sinks (every shop item, recipe and staff once, plus a gem-set kit).

### The tab
- the critique;
- gold in / out per realm;
- the hero's climb against prices;
- every gold source with live per-realm numbers;
- every site run;
- how items are found;
- six comparable games;
- eight ideas from theory, with 17 sources;
- the fixed-or-rolled rule;
- **Try it** (sliders for the world cut, the prize share, Alpha gold, floor chests and repricing).

### The 17 proposals (Kris picks ✓ / ◐ / ✕)

| Group | Proposals |
|---|---|
| Balance | A fairer world cut (0.5) · The prize is worth the climb (first win 25 % of the run's gold, rematch 10 % ±20 %) · Alphas pay their way · A floor under every hard fight (the boss rush and sky ports included) · Price by the minute |
| Rewards | Treasure on every floor (Common / Rare / Golden roll) |
| Fairness | Bad-luck protection for gems and rare items · Nothing is lost for a collector · A lost purse, not a lost tenth |
| Excitement | Bonus XP moments (first of its kind, Daring, Flawless, Rested, Discovery) · XP past the cap becomes Valour chests · The spoils screen · Rarity you can see |
| New | The bounty board · Late gold builds the village (village, festivals, trophy hall, reforging) · Treasure maps · Dungeon Coins for gold |

Tests: `test_round119` (economy, 3).
