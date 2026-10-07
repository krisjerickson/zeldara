# 19 — Combat proposals: familiar engagement and boss damage (round 33)

> **Decided and built in round 34** (changelog [312]–[318]): rule set A "follow my lead"; armor as a share with a boss-hit floor, both per difficulty; ward as a share of max health (cap 40 %); shield block cap 50 %; familiar damage to bosses per difficulty. Not taken up: shorter mercy time, a wait between potions. The text below is the proposal as written.

Kris asked for rules to consider. **Nothing here is in the game yet** except: familiars do not heal in combat ([309]), the Site Lab no longer makes the hero invincible by default ([308]), and the hero's own hits mark a monster as engaged (`mon._engT`).

## A. When may familiars attack?
Today a familiar attacks any monster in range and line of sight, engaged or not, so a ranged familiar clears the field around the hero by itself.

Words used below: a monster is **engaged** when the hero has hit it, or it has hit the hero (or shot at him), in the last few seconds.

### Rule set A — "Follow my lead" (recommended)
1. Familiars attack **only engaged monsters**.
2. Engagement starts with the hero's hit on that monster, or that monster's hit on the hero. Never the first strike.
3. It lapses **5 s** after the last exchange between the hero and that monster, or when the monster is more than 350 px from the hero.
4. A familiar's target must be within **220 px of the hero** and in his line of sight (as now).
5. Area skills (nova, rain, wave) fire only when an engaged monster is in range, and hurt only engaged monsters.
6. A boss fight engages the boss for the whole fight once the hero lands his first hit.

### Rule set B — "Bodyguard"
Familiars attack only monsters that **damaged the hero** in the last 4 s. What the hero attacks does not count until it hits back. The most defensive: familiars never help him pick a fight.

### Rule set C — "Bond meter"
Each of the hero's own hits fills a bond meter by 2 s (up to 6 s). While it holds, familiars attack anything in range; it drains when he stops hitting. A small bar under the familiar icons shows it. The most active to play, but familiars still hit monsters he has not touched.

### Dials for any rule set
- Familiars cannot land the killing blow on a monster the hero has not hit (it stays at 1 health).
- A familiar's damage to one monster is capped at 50 % of that monster's health; against bosses familiar damage is halved.

## B. Why bosses did no damage, and what to do
Found (changelog [308]):
- The Site Lab switched god mode on by default — fixed.
- Armor is **subtracted**: damage = attack − 0.6 × defense, at least 1.

| Realm | Guardian's hit (Wayfarer) | Best armor (defense) | Taken off each hit | Damage taken |
|---|---|---|---|---|
| 1 Grasslands | 9–12 | 24 | 14 | **1** |
| 2 Wetlands | 12–16 | 42 | 25 | **1** |
| 3 Highlands | 18–23 | 62 | 37 | **1** |
| 4 Ashlands | 28–36 | 85 | 51 | **1** |

(Each ring adds up to 5 defense on top. With half the best armor a Grasslands guardian still does only 2–5 to a hero with about 60 health.)

### Option 1 — armor takes a share, not a fixed amount (recommended)
Damage = attack × 100 / (100 + 1.5 × defense). Best armor then lets through 74 % / 61 % / 52 % / 44 % in realms 1–4: armor always helps and never makes a hit meaningless. Guardian attack is then set so that, on Wayfarer, a normal hit takes about **12 %** of a well-armored hero's health and a big telegraphed hit about **28 %**: attack about 9 / 18 / 35 / 59 (today 9 / 12 / 18 / 28). The difficulty levels scale from there as they do now (× 0.8 / 1 / 1.25 / 1.5). Ordinary monsters use the same formula; their attack is retuned the same way so the open world does not suddenly hurt more than intended.

### Option 2 — keep subtraction, add a floor
A hit never does less than 40 % of its attack. Smallest change; armor stops mattering once you are over the floor.

### Option 3 — bosses pierce armor
Boss attacks ignore 70 % of defense; everything else stays. Fixes bosses only; ordinary monsters still do 1.

### Other things that make the hero hard to kill (each can be turned independently)
| Lever | Today | Proposal |
|---|---|---|
| Mercy time after a hit | 0.6 s with no damage at all | 0.35 s against bosses (their multi-hit patterns can land) |
| Familiar ward | blocks one whole hit, however big | blocks at most 20 % of max health, the rest goes through |
| Familiar healing | — | off in combat (done, [309]) |
| Potions | instant; no wait between them that I could find in the code | 8 s between potions while fighting a boss |
| Shield (holding Shift) | every hit −25 %, and a 15 % + 2 % per shield-defense chance to block it whole (Aegis: 47 %) | block chance capped at 35 % |
| Familiar damage to bosses | full | halved |
| God mode | silent | badge on screen (done) |

Numbers above are from the game's tables (`03-data.js`, `04g-difficulty.js`, `A.hurt` in `09-monster-engine.js`); the hero's health by level is 30 + level gains (about 55 at level 5, 95 at 10, 150 at 15, 215 at 20 — computed, not measured in play).
