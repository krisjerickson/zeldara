# 20 — Balance and consistency: audit and proposals

*Written Oct 7, 2026 (round 36). Nothing in the game has been changed for this document. It is a list of what the code does today, what does not fit together, and what I propose. Kris chooses; then it gets built.*

## Status (Oct 7, round 37): built

Kris read the proposals, sent seven notes, and asked for all five steps. **Everything below Part 6 is now in the game**; Part 7 says what was built and where it differs from Parts 2–5. Parts 1–6 are kept as written for the record.

Kris's decisions: six elements · Water > Fire > Grass > Earth > Water, Storm and Shadow against each other · up to two elements on monsters and gear, bosses one · one piece of every equipment type with all elements (how it is won comes later) · crossbows and axes · gems hard to buy, earned by adventuring · familiars no stronger · mounts: fix the existing ones only · the Tome shows it all, with a forging tree and a tech tree.

## The short version

1. **Weapon elements do nothing.** 22 items show "+N fire / ice / lightning" in the menus. No combat code reads that number. A forged Volcano Lord (5,240 g and 4 rubies) hits like a plain 32-attack sword.
2. **The game uses three different element lists** that do not know about each other: familiars (grass, water, earth, fire), gear (fire, ice, lightning) and spells (no element at all, only effects).
3. **No monster is weak to an element.** Across 225 monsters there are 17 "weak to melee" rules, 1 "weak to burning", and 20 monsters that resist one *familiar* element. That is the whole system.
4. **Several items promise things that are not built**: three tonics, the antidote, the "fire-resistant" Phoenix Cape, the "lightning-resistant" Stormshield, "(slows)" on frost swords, and mage gear that says it boosts spells but only adds sword attack.
5. **Mounts come from five different places with no rule**, one cannot be had at all (Sky Eagle), one cannot be bought although the Tome says it is sold (Horse), and the final reward (Dragon) is slower than a Sky Port mount.
6. **Proposal:** one element wheel for everything (monsters, weapons, armor, spells, skills, familiars, mounts), one shared hit function, and one rule for where mounts come from. Most of it needs no new art.

---

## Part 1 — What exists today

### 1.1 Elements

| Where | Elements used | Does it work? |
|---|---|---|
| Familiars (4 spirits, 6 skills each) | grass, water, earth, fire — one per realm | **Yes.** 20 monsters resist one familiar element (13 fire, 4 water, 3 earth). |
| Gear (22 items) | fire, ice, lightning, "all" | **No.** Shown in menus only. |
| Arrows and darts | fire (splash), cold (slow), heat-seeking | Yes, as effects. Not tied to any weakness. |
| Spells (16) | none recorded | Effects only: slow, splash, chain, root, stun, poison, drain, knock-back. |
| Skills (12) | none | — |
| Monster kits | weak / immune by *kind of attack* (melee, ranged, spell, fire) | Yes, but there are only 36 such rules in all. |
| Boss bars (ward, guard, plate) | by kind: spells, arrows, sword | Yes. 36 bars across the 8 main bosses. |
| Mounts | 3 are safe from fire | Yes. |

The words also disagree: "ice", "cold", "frost" and "water" all appear, lightning is stored as `light`, and the lightning gem is the green emerald.

### 1.2 How damage is worked out

- **Sword:** hero attack − monster defence (minimum 1). Hero attack at level 20 is 62 before any sword; swords add 1–45. So the weapon is about a third of a hit.
- **Bow:** arrow damage − monster defence.
- **Spell:** tome power × staff multiplier − monster defence. It does not grow with level, and no armor piece raises it.
- **Familiar:** skill damage × level × slot (1, 0.6, 0.4, 0.25) − monster defence.
- **Monster hitting the hero:** percentage armor since round 34.

Two problems follow:

1. **Monster defence is still "subtract".** That is the rule you had me remove from the hero's armor. Ashlands monsters have defence 8–12, so Arcane Burst (9 per bolt) and a fourth-slot familiar do 1 damage there. Big single hits barely notice defence at all.
2. **The hit is worked out in five separate places** (sword in the world, sword in dungeons, arrows twice, spells and familiars). Any new rule has to be added five times. This is why element damage was never wired in.

### 1.3 Monsters

225 monsters with kits, about 56 per realm. Health, attack and defence by realm (lowest – middle – highest):

| Realm | Health | Attack | Defence |
|---|---|---|---|
| Grasslands | 7 – 16 – 35 | 4 – 4 – 5 | 0 – 0 – 2 |
| Wetlands | 29 – 52 – 115 | 9 – 10 – 13 | 2 – 2 – 4 |
| Highlands | 59 – 114 – 233 | 15 – 18 – 20 | 5 – 5 – 9 |
| Ashlands | 96 – 194 – 379 | 21 – 25 – 29 | 8 – 8 – 12 |

Monsters put ten kinds of status on the hero (burn 13, slow 8, poison 5, root 3, and a few others). The hero has no way to resist any of them.

### 1.4 Gear (206 items)

| Group | Count | Notes |
|---|---|---|
| Swords | 22 | 9 plain, 13 forged. All play the same; the trident and the axe swing like swords. |
| Bows | 7 | No element. Ammo carries the effect. |
| Staffs | 4 | Multiply spell damage ×1.3 – ×2.0. Their element is not used. |
| Armor, 8 slots | 87 | Defence, speed, cooldown, mana. No resistances. |
| Rings | 8 | All from boss towers. There are 10 ring slots. |
| Potions | 14 | Ten plain healing potions that overlap (Minor 12, Area-1 10, Potion 25, Area-2 20 …), an antidote and three tonics. |
| Food | 12 | Fine. |
| Gems | 10 | See 1.6. |
| Spell tomes | 16 | One per mage tower. Consistent. |
| Skills | 12 | One per castle. Consistent. |

Things the text promises and the game does not do:

- **Strength Tonic, Speed Draught, Defense Brew**: "temporarily boosts…". They only heal. The buff system they need already exists (the tavern cup uses it).
- **Antidote**: "cures poison". It only heals 8.
- **Phoenix Cape** "fire-resistant", **Stormshield** "lightning-resistant": no effect.
- **Frost swords** "(slows)": no effect.
- **Mage gear** (robes, hood, circlet, gauntlets, focus, cloak, leggings): "amplify spellpower". Their attack bonus goes to the sword only.
- **Flame Blade** (shop) and **Flame Sword** (Sky Port) have fire in the name and no element.

### 1.5 Crafting

13 recipes, all swords: three chains of four (fire, ice, thunder) and the Elemental Sovereign.

- **The descriptions are wrong.** Inferno Edge says "Long Sword + Ruby + 500 g". The recipe is Flame Iron + Ruby + 500 g. Every forged sword above tier 1 has this mistake.
- **The price is out of line.** The whole fire chain costs 5,240 g and 4 rubies for 32 attack. The shop sells 22 attack for 500 g and Sky Port 4 gives 28 attack free. The Sovereign costs about 24,200 g, 12 gems and a skystone for 45.
- **Nothing else can be crafted**: no armor, bows, staffs, rings or potions.

### 1.6 Gems

| Gem | Used for | Where it comes from |
|---|---|---|
| Ruby, Sapphire, Emerald | forge chains | camps, dungeons, islands, Sky Ports |
| Skystone | the Sovereign | Sky Port 4, a few camps, dungeons and islands |
| Pearl, Fire Opal | selling only | islands, travel |
| Raw Iron, Rough Crystal, Dungeon Coin, Moon Shard | selling only | **nowhere — nothing in the game gives them** |

### 1.7 Mounts

| Mount | Speed | Crosses | How you get it | Problem |
|---|---|---|---|---|
| Horse | 1.6 | — | **Nothing sells it.** The stables only open your mount list. | Tome says "Sold at the stables". The 200 g price is never charged. |
| Alligator | 1.3 | water, marsh | Grasslands boss dungeon | — |
| Battle Boar | 1.4 | boulders | Wetlands boss dungeon | — |
| Lava Unicorn | 1.5 | lava crust | Highlands boss dungeon | — |
| Ash Dragon | 1.7 | all of the above + deep lava | Ashlands boss dungeon | — |
| Dragon | 2.0 | land and deep | all 16 main quests | Slower than the Void Serpent and no better than the Storm Drake. |
| Sky Glider | 1.8 | — | Sky Port 1: pick 1 of 3 (sword, mount or gem) | You can leave without the mount. |
| Storm Drake | 2.0 | everything | Sky Port 2, same pick | Equal to the final Dragon. |
| Ember Phoenix | 1.9 | lava crust | Sky Port 3, same pick | Crosses lava but is **not** on the fire-safe list, so you burn. |
| Void Serpent | 2.2 | everything | Sky Port 4, same pick | Fastest mount in the game. |
| Sky Eagle | 1.9 | everything | **Cannot be obtained.** Sprite and data exist. | Orphan. |

Other content gives no mount at all: 12 castles, 16 mage towers, 12 bonus sites (relics), the Fairy Kings, the volcano quest.

Small errors found on the way: the Sky Port reward card says Iron Sword "+7 ATK" (it is +5) and Ruby "worth 40 g" (it is 50); the lava code checks for "lava boots" that do not exist.

### 1.8 What already works well

- **Familiars** are the model to copy: four elements, six skills each, levels, counters on monsters, all shown in the Tome.
- **Spells** (one per mage tower) and **skills** (one per castle) each have one clear source.
- **Boss dungeons** each give the mount that opens the next realm.

---

## Part 2 — The proposed element system

### 2.1 Six elements, one wheel and one pair

**Wheel of four** — the four realms and the four familiars:

> **Water** beats **Fire** · **Fire** beats **Grass** · **Grass** beats **Earth** · **Earth** beats **Water**

**Pair of two** — sky and night:

> **Storm** and **Shadow** are each strong against the other.

Everything the game has today folds into these six:

| Element | Takes in | Realm | Status it causes |
|---|---|---|---|
| Fire | fire, flame, ember, magma | Ashlands | burn |
| Water | water, ice, frost, cold | Wetlands | slow; freeze on the strongest |
| Grass | thorn, vine, spore, poison | Grasslands | root; poison |
| Earth | stone, rock, crystal | Highlands | stagger (short stun) |
| Storm | lightning, thunder, wind, sky | Sky Ports | chains to a second target |
| Shadow | void, curse, spirit, bone | towers and crypts | drain |
| *(none)* | plain steel, arcane | — | — |

This wheel matches the two pairs you named (fire and water, rock and grass). One weakness of it: the Wetlands are weak to Earth, and the earth familiar and the earth spell come from the Highlands, one realm later. I would cover that with an earth sword line at the forge from realm 1 (see 3.1). The alternative wheel is in the questions at the end.

### 2.2 The rules

1. **Every hit has a kind** (sword, arrow, spell, familiar — already there) **and may have an element.**
2. **Every monster has one element**, or none.
3. A hit with the element that **beats** the monster does **×1.5** and shows "Weak!".
4. A hit with the monster's **own** element does **×0.5** and shows "Resists".
5. Anything else is ×1. Plain steel and arcane are never resisted and never get a bonus.
6. **Bosses** use ×1.25 and ×0.75, so the right element helps but does not decide the fight. Their ward, guard and plate bars stay as they are.
7. **Monster attacks carry the monster's element.** Armor with that resistance cuts the damage and the length of the status.
8. The numbers sit in the difficulty table, so each level can have its own later.

The "weak to melee" and "immune to arrows" rules on monsters stay. Kind and element are two separate lines in the Tome.

### 2.3 One hit function, and percentage defence for monsters

- All five hit sites go through one function that takes attack, kind and element.
- Monster defence uses the same percentage formula as the hero's armor. Small, fast attacks (Arcane Burst, familiars, darts) become useful in the late realms; heavy hits lose a little.
- This is the base everything else stands on. It changes no art and no data.

### 2.4 Monsters — first-pass elements

I sorted all 225 by name and description. This is a rough first pass by keywords; I would check every one by hand before it goes in.

| Realm | Grass | Water | Earth | Fire | Storm | Shadow | None |
|---|---|---|---|---|---|---|---|
| Grasslands | **27** | 1 | 6 | 2 | 6 | 9 | 6 |
| Wetlands | 3 | **39** | 1 | 2 | 4 | 2 | 6 |
| Highlands | 2 | 8 | **22** | 1 | 10 | 8 | 5 |
| Ashlands | 1 | 1 | 8 | **34** | 0 | 9 | 2 |

What this shows:

- **The Wetlands and Ashlands are almost one element.** One sword would be right for the whole realm. I propose the open land stays about two-thirds home element, and each realm's towers, dungeons and islands lean on a second and third element, so you swap gear when you go inside.
- **Suggested second elements:** Grasslands — shadow (barrows) and storm (kites, moths). Wetlands — grass (mangroves) and shadow (the drowned). Highlands — storm (rocs, cloisters) and water (frost). Ashlands — shadow (cults, bone pits) and earth (obsidian).
- **Examples:** Thistle Hog, Puffcap, Rose Dryad — grass. Storm Eel — storm, not water. Frost Ghoul, Yeti Stomper — water. Crystal Golemling, Stone Gargoyle — earth. Magma Slug, Flame Djinn — fire. Barrow Knight, Astronomer Lich — shadow.

**Bosses:** Goblin King — earth · Dark Warlock — shadow · Swamp Witch — water · Storm Mage — storm · Rock Dragon — earth · Iron Sentinel — storm · Lava Titan — fire · Shadow Lord — shadow. Castle wardens and tower masters take the element in their name (Rime Witch — water, Thorn Druid — grass, Forge Thane — fire, Bone King — shadow).

The 20 "resists fire / water / earth familiars" rules become ordinary element resistance, so they apply to swords and spells too.

---

## Part 3 — What moves to the new system

### 3.1 Weapons

| Item | Today | Proposed |
|---|---|---|
| Fire chain (Flame Iron → Volcano Lord) | fire, unused | **Fire.** The element number is added to every hit. |
| Frost chain (Frost Iron → Absolute Zero) | ice, unused | **Water.** Slows on hit, as the text says. |
| Thunder chain (Thunder Iron → Thunder God) | lightning, unused | **Storm.** Chains to one nearby monster. |
| Flame Blade (shop), Flame Sword (Sky Port) | plain | **Fire** |
| Sea Trident (island) | plain | **Water** |
| Sky Sword (Sky Port 4) | plain | **Storm** |
| Elemental Sovereign | "all" | Counts as whichever element is best against the target. |
| **New: grass chain** (4 swords, e.g. Briar Iron → Wildwood King) | — | **Grass.** Roots on hit. Emerald. |
| **New: earth chain** (4 hammers or swords, e.g. Granite Iron → Mountain's Heart) | — | **Earth.** Staggers on hit. Amber. |
| **New: one shadow blade** (e.g. Night Edge) | — | **Shadow.** Drains a little health. Reward, not forged. |
| Bows | no element | Stay plain. The arrow carries the element: fire arrow — fire, cold arrow — water. Two new arrows: thorn (grass, roots) and shock (storm, chains). |
| Ember Staff, Storm Staff | element unused | Spells of the staff's element do +25 %. |
| **New staffs:** Tide (water), Root (grass), Stone (earth), Shade (shadow) | — | Same rule. Sold at the apothecary by realm. |
| Arcane Staff | "all" | Stays the best all-round staff, no element bonus. |

**Forge prices.** I would cut the chain prices by about half and write the description from the recipe, so the two can never disagree again.

### 3.2 Gems

One gem per element, using gems that already exist:

| Element | Common gem | Rare gem (top-tier recipes) |
|---|---|---|
| Fire | Ruby | Fire Opal |
| Water | Sapphire | Pearl |
| Grass | Emerald (moves from lightning) | — |
| Earth | Amber (new name for Rough Crystal) | — |
| Storm | Skystone | — |
| Shadow | Moon Shard | — |

- The thunder chain would use Skystone in place of Emerald. Skystones then need to drop more often (storm monsters, Sky Ports).
- Raw Iron becomes the plain forging material. Dungeon Coin could buy from a dungeon trader, or be removed.
- **The jeweller sets gems into rings.** A plain band plus a gem makes an element ring: +10 % damage with that element and +10 % resistance to it. This gives the jeweller a job, fills the 10 ring slots, and uses gems you have spare.

### 3.3 Armor — resistances from names that already promise them

Each piece gives 10–15 % resistance to one element. The total stops at 50 %, the same cap as the shield block.

| Element resisted | Existing pieces |
|---|---|
| Fire | Phoenix Cape, Obsidian Shield, the Dragon set (9 pieces) |
| Water | Sea Shell Buckler, Sea Buckler, Sea Pearl Necklace, Captain's Coat |
| Storm | Stormshield, the Sky set (robe, crown, leggings), Wind Walkers, Celestial ring and pendant |
| Shadow | the Shadow set (7 pieces), Dusk Mantle, Bone Shield |
| Earth | Iron Ward, Guardian Ward, Tower Shield, Knight Boots |
| Grass | Jade Amulet, the Ranger set (boots, cloak) |

- **Mage gear** (5 Arcane pieces, Mage Robes, Mage Hood) gets a real "spell power" number in place of sword attack.
- **Spell power also grows with level**, about 3 % per level, so spells keep pace with the sword.
- Optional later: wearing 3 pieces of one set gives a small extra.

### 3.4 Spells

| Spell | Realm | Element |
|---|---|---|
| Frost Bolt, Ice Shards, Tidal Wave, Blizzard | 1, 2, 2, 4 | Water |
| Fireball, Flame Nova | 1, 3 | Fire |
| Thorn Snare, Poison Mist | 1, 2 | Grass |
| Stone Spikes | 3 | Earth |
| Lightning Chain, Thunder Step, Starfall | 2, 3, 4 | Storm |
| Void Orb, Void Rift, Spirit Drain | 3, 4, 4 | Shadow |
| Arcane Burst | 1 | none — works the same on everything |

Earth has one spell and fire two. The earth and fire familiars and two skills make up for it. If you want it even, one water spell could be re-themed to earth.

### 3.5 Skills

Most skills are movement or defence and stay plain. Five get an element: War Stomp — earth · Meteor Strike — fire · Whirlwind — storm · Smoke Bomb and Phantom Veil — shadow. The unused shop prices on skills come out of the data.

### 3.6 Familiars

Nothing changes in how they play. Their element simply uses the same table as everything else, so a fire familiar is strong in the Grasslands and weak in the Ashlands for the same reason your sword is.

### 3.7 Potions and tonics

- Make the three tonics work with the buff system that is already there (2 minutes, +25 %).
- Make the antidote cure poison.
- Cut the plain healing potions to one per tier (five in place of ten).
- New: four resistance draughts (fire, water, grass, earth), +30 % for 2 minutes. They let a player with the wrong armor still enter a realm prepared.

---

## Part 4 — Mounts

### 4.1 One rule

> **Every mount is the reward for finishing one named thing, and the Tome says which.**

| Tier | Speed | How earned | Mounts |
|---|---|---|---|
| Stable | 1.4 – 1.6 | gold | Horse (fix the sale); **new** War Horse |
| Realm key | 1.3 – 1.7 | boss dungeon of each realm | Alligator, Boar, Lava Unicorn, Ash Dragon (as now) |
| Realm champion | 1.7 – 1.8 | all three castles of a realm | **four new element mounts** |
| Sky | 1.8 – 2.0, flying | Sky Port victory | Sky Glider, Storm Drake, Ember Phoenix, Void Serpent |
| Legend | 2.0 – 2.2 | finishing a whole set | Sky Eagle, Dragon, **new** set mounts |

### 4.2 Fixes to what exists

1. **Horse:** the stables sell it for 200 g.
2. **Sky Eagle:** reward for defending all four Sky Ports.
3. **Sky Port mounts:** the mount is always given on the first victory. The pick becomes weapon or gem.
4. **Dragon:** raise to 2.2 and let it cross everything, so the last reward is the best mount. Void Serpent drops to 2.0.
5. **Ember Phoenix:** add to the fire-safe list.
6. Correct the two wrong lines on the Sky Port reward card.

### 4.3 New mounts

Each has an element. While you ride it you get 20 % resistance to that element, plus one small extra.

| Mount | Element | Earned by | Extra |
|---|---|---|---|
| War Horse | none | Stables, 1,200 g, from realm 3 | Armored: +10 % defence while riding |
| Thornback Elk | Grass | all 3 Grasslands castles | slow health return while riding |
| Marsh Heron | Water | all 3 Wetlands castles | shallow water, reeds and mud at full speed |
| Crag Ram | Earth | all 3 Highlands castles | small boulders at full speed; cannot be knocked back |
| Cinder Hound | Fire | all 3 Ashlands castles | safe on campfires and lava crust |
| Rune Carpet | none (arcane) | all 16 mage towers | mana returns faster while riding |
| Relic Strider (clockwork) | Storm | all 12 relics from the bonus sites | calls to you from twice as far |
| Fairy Moth | Grass | all three Fairy Kings | flies; familiars recharge faster |
| Nightmare | Shadow | defeat the Volcano Lord | monsters notice you from half as far |

Nine new mounts. Each needs one painted ride sheet, the same as the eleven that exist. I would give you one PowerShell command for all of them. You do not have to take all nine; see the questions.

---

## Part 5 — Order of work

| Step | What | New art? |
|---|---|---|
| **1. Foundation** | One hit function. Percentage defence for monsters. The element table. Weapon elements wired in. An element on every monster. "Weak!" and "Resists" in the fight and in the Tome. | No |
| **2. Broken promises** | Tonics, antidote, forge descriptions and prices, Horse sale, Sky Eagle, Sky Port card, Dragon speed, Phoenix fire-safe. | No |
| **3. Spread** | Armor resistances, spell elements and staff rule, spell power from mage gear and level, arrows, skills, boss elements. | No |
| **4. New things** | Grass and earth forge chains, shadow blade, four staffs, two arrows, gem rings at the jeweller, resistance draughts, new mounts. | Yes — about 25–30 item icons (two sheets) and one ride sheet per mount |
| **5. Tuning** | A Lab page to test any weapon against any monster; tests for every pairing; numbers per difficulty. | No |

Steps 1–3 are about three sessions of work and can be played as soon as each is done.

---

## Part 6 — Risks

- **Saves.** Emeralds in a save would become the grass gem. Thunder swords already forged stay as they are. No item is removed.
- **Too much swapping.** If the right element matters too much, the inventory becomes a chore. ×1.5 is a nudge; I would not start higher.
- **Difficulty.** Percentage defence makes weak fast attacks stronger in late realms. The numbers will need a pass after you play.
- **Familiars.** They already do a lot of damage. With matchups they will be stronger in two realms and weaker in one. The boss rule from round 34 still limits them.

---

## Part 7 — What was built (round 37)

### 7.1 Where it differs from the proposal above

| Proposal | Built |
|---|---|
| One element per monster | Up to **two**. 28 of the 225 have two (the strongest tower and dungeon monsters). Wardens, masters and site elites may have two. Realm bosses have one. |
| ×1.5 and ×0.5 | Four **named steps**: ▲▲ Bane, ▲ Weak, ▽ Resists, ▽▽ Warded. Shown as marks beside the damage number and as words in the Tome. |
| A monster resists its own element | It also resists the element its own element beats (a water monster shrugs off fire). |
| Nine new mounts | None. The five fixes only. |
| Gem rings at the jeweller | **Gem setting** for armor, shields, amulets and rings: up to two elements on a piece. |
| Thunder chain uses Skystone | It uses the new **Topaz**. Skystone is the rare storm gem. |
| Amber = renamed Rough Crystal | Amber, Topaz and Onyx are new gems. Rough Crystal is now **Deep Crystal**, the rare earth gem. Heartseed is the rare grass gem. |
| A Lab page for testing | Dev-panel buttons in the game. |
| Earth "sword line" | Earth and grass are **axe** lines. Crossbows have their own lane. |

### 7.2 The steps

| Mark | Name | When | Effect |
|---|---|---|---|
| ▲▲ | Bane | a two-element weapon finds two weaknesses at once | doubled; the element's effect always lands |
| ▲ | Weak | your element beats the foe's | half again as much |
| ▽ | Resists | the foe is your element, or its element beats yours | a good deal less (×0.6) |
| ▽▽ | Warded | both of a two-element foe's elements turn the hit | barely a scratch (×0.35); no effect lands |

- A weapon with two elements strikes with the better one. It is never worse for having a second.
- A monster's two elements add up. A weakness and a resistance cancel.
- Bosses stop at one step and use gentler numbers (×1.25 / ×0.8).
- Familiars gain only a fifth from a weakness and lose in full to a resistance.

### 7.3 Weapons

| Lane | Steps | Gem |
|---|---|---|
| Fire swords | Iron Sword → Flame Iron → Inferno Edge → Magma Cleaver → Volcano Lord | Ruby (last step: Fire Opal) |
| Frost swords | Iron Sword → Frost Iron → Glacier Sword → Permafrost → Absolute Zero | Sapphire (Pearl) |
| Storm swords | Iron Sword → Thunder Iron → Storm Blade → Cyclone Blade → Thunder God | Topaz (Skystone) |
| Earth axes | Hand Axe → Granite Axe → Quake Axe → Boulder Maul → Mountain's Heart | Amber (Deep Crystal) |
| Grass axes | Hand Axe → Briar Axe → Thornwood Axe → Wildwood Cleaver → Verdant King | Emerald (Heartseed) |
| Crossbows | Crossbow → Ember, Frost, Thorn, Stone, Storm or Night Crossbow → Geyser, Wildstone or Eclipse Arbalest | two gems; an arbalest takes two crossbows and a rare gem |
| Master-works | Stormfire Blade, Tempest Edge, Magmaheart Axe, Avalanche Maul, Nightbloom Axe | a third-step weapon, a second-step weapon of another element, a rare gem |
| The Sovereign | Volcano Lord + Absolute Zero + Thunder God + Skystone | — |

Also new: four plain axes and two plain crossbows in the armory; Root, Tide, Stone and Shade staffs; thorn and shock arrows and darts; the Night Edge (shadow sword) in the Ashlands boss tower.

### 7.4 Where gems come from

| Source | What it gives |
|---|---|
| Castle warden, first time | two gems of the warden's element(s), two Dungeon Coins |
| Tower master, first time | two gems of the master's element(s), two coins |
| Treasure vault, first time | the realm's rare gem, a realm gem, two coins, raw iron |
| Island guardian, first time | the realm's rare gem, two coins |
| Realm boss, first time | two gems and the rare gem of the boss's element, three coins |
| Any of these again | one coin, sometimes a gem |
| Site elite | always its gem (one in four the rare one) and a coin |
| Alpha monster | its gem about one time in three |
| Two-element monster | about one in eight |
| Other monsters with an element | rarely |
| Chests, caches, camps | the realm's gems |
| Sky Port | Topaz or Skystone, if you choose gems over the weapon |
| **Jeweller** | one of each common gem at a time, five times its worth in gold **and three Dungeon Coins**; refills when you clear another place. Rare gems are never sold. |

Realm gems: Grasslands — Emerald, Amber, Ruby · Wetlands — Sapphire, Emerald, Onyx · Highlands — Amber, Topaz, Sapphire · Ashlands — Ruby, Onyx, Topaz.

### 7.5 The Sovereign set — proposals for how it is won

Fourteen pieces: sword (already forgeable), axe, bow, crossbow, staff, shield, plate, crown, greaves, gauntlets, boots, amulet, mantle, ring. Each carries all six elements. The 13 new ones are in the game's data and the Tome but cannot be obtained yet. Four ways it could work:

| | How | For | Against |
|---|---|---|---|
| **A. One piece per finished set** (recommended) | Each "collect them all" in the game gives one named piece: all 12 castles — the Crown; all 16 mage towers — the Staff; all 12 relics — the Amulet; all three Fairy Kings — the Mantle; all four Sky Ports — the Boots; all four familiars at top level — the Ring; the Volcano Lord — the Plate; and so on. | Gives every part of the game a last reward. It is what the dropped "set mounts" would have done. No new places needed. | Thirteen sets have to be found; one or two would be thin. |
| **B. Forged like the sword** | Each piece needs the top piece of its kind from three elements plus a rare gem (the Sovereign Axe: Mountain's Heart + Verdant King + a master-work axe + Deep Crystal). Armor needs pieces set with two gems. | Fits the forge tree. Uses gems heavily. | Armor has no element lines, so the armor recipes would be invented. Very expensive. |
| **C. Six shrines** | A new end-game trial per element (fought with that element forbidden). Each shrine gives two pieces; the last two come from doing all six. | A real end-game. Teaches the wheel. | New places, new art, the most work. |
| **D. Hardest difficulty** | Finishing each realm on Ragnarök gives three pieces. | Gives the difficulty levels a reward. | Locks the set away from most players. |

A and B can be mixed: weapons forged (B), armor and jewellery earned (A).

**DECIDED (Kris, Oct 8, round 39): A — one piece per finished set. Built** (`src/js/09i-sovereign.js`, `ZSov`). The sword keeps its forge recipe. The pieces, as built:

| Piece | Won by |
|---|---|
| Sovereign Axe | all four boss dungeons |
| Sovereign Aegis (shield) | all four boss towers |
| Sovereign Crossbow | all four island guardians |
| Sovereign Bow | all four Sky Ports |
| Sovereign Crown | all twelve island castles |
| Sovereign Staff | all sixteen mage towers |
| Sovereign Amulet | all twelve relics |
| Sovereign Mantle | the trials of all three Fairy Kings |
| Sovereign Greaves | all twenty fairy lessons |
| Sovereign Ring | all four familiars at their last level |
| Sovereign Gauntlets | every monster camp in the four realms |
| Sovereign Boots | every region of the four realms walked |
| Sovereign Plate | the Volcano Lord |

- Two differ from the table above: the four Sky Ports give the **Bow** (not the Boots), and the Boots come from walking every region. Easy to swap back.
- The game checks every few seconds. A piece arrives with a banner; pieces for sets already finished in an old save arrive quietly when it loads, with one notice.
- Each piece's description says how it is won. The Tome shows the same and how far you are (for instance 7 / 16), and the Paths page has a new row, "the Sovereign set", with all 13 and their progress.

### 7.6 Not done, or found on the way

**Round 40 (Kris: "implement everything else"): all four below are now done** — element numbers per difficulty level (doc 17), tree chopping (`10m-chop.js`), ordinary monsters' armor weight (`monArmorK`, doc 17), and a small gem per set element on a gem-set piece's icon.


- The numbers are the same on all four difficulty levels. They can move into the difficulty table.
- **Tree chopping has never worked.** The Woodcutter's Axe code reads a field that does not exist. It was left alone because switching it on changes the world's trees.
- Ordinary monsters' attack values were not retuned.
- A gem-set piece shows its base item's icon with the element in its name; there is no element mark on the tile yet.
