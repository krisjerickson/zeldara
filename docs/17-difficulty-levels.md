# Difficulty levels

Round 28 (Oct 6 2026). Kris: "bosses need to be harder, but … we should make 4 different difficulty levels of the game". Built the same night; this page is the proposal and the record of what is in the game.

## The four levels

| | 🔥 Hearthside | 🧭 Wayfarer | 🛡️ Shieldbearer | 🌋 Ragnarök |
|---|---|---|---|---|
| In a word | beginner | intermediate | advanced | extreme |
| Line on the button | A tale told by the fire | The road as it was meant to be walked | For proven warriors | The twilight of the realms |

**Wayfarer is the game exactly as it was balanced before** — every factor is 1. A save made before this round is a Wayfarer save.

## What changes (Kris's choice)

Chosen: tougher bosses · faster, smarter bosses · tougher and more monsters. **Not** chosen and not changed: healing, potions, the death penalty.

| | Hearthside | Wayfarer | Shieldbearer | Ragnarök |
|---|---|---|---|---|
| **Bosses: health** | × 0.75 | × 1 | × 1.5 | × 2.2 |
| **Bosses: damage** | × 0.8 | × 1 | × 1.25 | × 1.5 |
| Warning before a boss attack | × 1.25 (longer) | × 1 | × 0.85 | × 0.7 |
| Time between boss attacks | × 1.25 | × 1 | × 0.85 | × 0.7 |
| Speed of boss moves and shots | × 0.9 | × 1 | × 1.1 | × 1.2 |
| Extra wave in wave attacks | – | – | – | + 1 |
| Last stand begins at | 15 % health | 15 % | 20 % | 30 % |
| Hits needed to stagger a boss | × 0.8 | × 1 | × 1.15 | × 1.3 |
| **Monsters: health** | × 0.8 | × 1 | × 1.3 | × 1.7 |
| **Monsters: damage** | × 0.8 | × 1 | × 1.2 | × 1.45 |
| Monsters per dungeon floor, roamers per realm, island roamers | × 0.8 | × 1 | × 1.25 | × 1.5 |
| Guards at a monster camp (3–5 today) | – 1 | – | + 1 | + 2 |
| A camp gets a pack leader (Alpha) from | never | 5 guards | 4 guards | 3 guards |
| Extra kin with an elite | – | – | + 1 | + 2 |
| XP and gold from kills | × 1 | × 1 | × 1.15 | × 1.3 |

What these mean in numbers, for two bosses:

| | Hearthside | Wayfarer | Shieldbearer | Ragnarök |
|---|---|---|---|---|
| Goblin King (Grasslands dungeon), first form | 257 | 342 | 513 | 752 |
| Shadow Lord (Ashlands tower), first form | 702 | 936 | 1,404 | 2,059 |
| Grasslands boss: warning time | 1.75 s | 1.4 s | 1.19 s | 0.98 s |
| Ashlands boss: warning time | 1.06 s | 0.85 s | 0.72 s | 0.6 s |
| Ashlands boss: time between signature attacks | 6.0 s | 4.8 s | 4.1 s | 3.4 s |

"Bosses" means every boss fight: the eight guardians and all their later forms, roaming world bosses, elites, island guardians, castle wardens, mage-tower masters, the fairy-trial duels and the volcano boss rush.

**Why XP and gold rise a little:** harder monsters take longer to kill. Without it a Ragnarök player would level more slowly than a Wayfarer and fall behind the bosses twice over. Claude added this; it was not one of the options Kris ticked. Set `reward` to 1 in the table to remove it.

## Choosing and changing

- **New game:** four buttons under the two heroes; Wayfarer is preselected. Clicking a hero starts the game as before (no extra screen).
- **Later:** the ❓ panel shows the same four buttons. The level can be changed **out in the open world** only, not inside a dungeon, tower, building or trial.
  - Health and damage of the monsters already walking the world change at once.
  - The number of monsters changes the next time the game loads (the world's monsters are laid out when it loads).
- **Save slots** show the level next to the hero's level, unless it is Wayfarer.

## Where it is in the code

- `src/js/04g-difficulty.js` — the table `ZDIFF` (every number above) and `ZDiff`: `lv()`, `cur()`, `stats(s, boss)`, `n(count)`, `ramp(q)`, `set(level)`, `render()`.
- Stored as `ps.difficulty` (0–3) in the save; missing means 1. No save version bump.
- Applied when a monster is made: `MX.spawn` (all engine monsters and every boss that passes its own stats), `_spawnLegacyMon`, the roaming world bosses, `DungeonScene._spawnMonster`, the volcano boss rush. Each monster keeps the factors it was made with (`mon._dz`), which is how `ZDiff.set` rescales the living ones.
- Boss pace: `ZDiff.ramp(q)` wraps `BOSS_RAMP` (warnings, cadence, speed, waves, stagger); kit attacks of bosses use the same warning and cadence factors; arena events use the cadence factor.

## Known limits and things to tune by play

- The numbers are a first proposal. None of the levels has been played through by a person; only the arithmetic and the hooks are tested (`tests/test_round28.py`).
- Regular monsters do not attack faster on the higher levels; only bosses do.
- Fairy-trial puzzles are unchanged; only their fights scale.
- Found while reading the code, not changed: castle wardens and mage-tower masters take their health from a table that is already multiplied by 3.6, then multiply again (by 4.2 and 3.75). At Wayfarer that gives a Grasslands warden about 1,130 health against the Goblin King's 342, although the code comment says wardens should be "weaker than the quadrant boss". Whether that is intended is a question for Kris.

## Other ideas (not built)

- A separate "boss health only" slider, for players who want long fights but gentle roads.
- New Game+ (keep gear, start at Shieldbearer).
- Harsher rules for Ragnarök only: no healing in boss rooms, or one life per site. Kris did not choose the healing and death options, so these stay out.

## Round 34 — three more numbers per level

| | Hearthside | Wayfarer | Shieldbearer | Ragnarök |
|---|---|---|---|---|
| `armorK` — how much each point of defense counts (damage = attack × 100 / (100 + armorK × defense)) | 2 | 1.5 | 1.2 | 1 |
| Share of a hit that gets through the best armor of realm 1 / 2 / 3 / 4 | 68 / 54 / 45 / 37 % | 74 / 61 / 52 / 44 % | 78 / 66 / 57 / 50 % | 81 / 70 / 62 / 54 % |
| `bossHit` — a boss's plain hit costs at least this share of max health (heavier attacks in proportion) | 7 % | 10 % | 13 % | 16 % |
| `famBoss` — share of a familiar's damage a boss takes | 60 % | 50 % | 40 % | 30 % |

The earlier line "NOT changed: healing, potions, the death penalty" still holds; armor and familiars now do change with the level.
