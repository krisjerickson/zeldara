# 29 — When the blacksmith can forge what (round 53)

**Decided (Kris's card, Oct 13):** Recommendation **A** (by realms open); the ring element bonus **capped at +40% per element**; **Sovereign is the seventh element** — ×1 against ordinary monsters, bane to the forge-masters, Surtharn and Asgard — and the Elemental Sovereign can be **forged once the forges rise**.

*Oct 13. Kris: "the blacksmith should only be able to forge weapons when certain stages of the game are unlocked, so you can't get overpowered weapons and armor too early. Create recommendations on how to phase these out, and consider other game mechanics around when you need the weapons of different types to be effective against monsters in each stage and in the volcanos". The numbers below are read from the code (Wayfarer difficulty). "est." marks my own derivations.*

## 1. What is wrong today

- **Nothing gates the forge but gold and materials.** The blacksmith is open from the start. `ZForge.can` and `_craftItem` check only gold and materials.
- **Region 1 already supplies most of the top tier:**
  - Mountain's Heart: the Deep Crystal comes from s1_dungeon.
  - Verdant King: the Heartseed comes from region-1 caches.
  - Void Reaver: the Moon Shard comes from s1_tower.
  - Three master-works: the Lodestone, Thunderseed and Phoenix Ember come from region-1 castles and mage towers.

  The only real brake is about 3,200 gold, roughly 400 dungeon kills (est.).
- **How big the gap is (est.):**

  | Hero | Weapon | Region-1 monster | Region-3 monster | Goblin King |
  |---|---|---|---|---|
  | Level 5 | Iron Sword | 13 dmg | — | ~56 hits |
  | Level 5 | Mountain's Heart | 96 dmg | 92 dmg | ~9 hits |

  The level caps keep the hero's own attack small early (8 at level 5), so in regions 1–2 the weapon is almost all of the damage.
- **Rings stack with no cap.** There are 10 ring slots, and each gem adds +8% damage of its element, uncapped. Ten Silver Bands with a Ruby each give +80% fire damage for about 1,800 g. This route skips the forge entirely.
- **Muspelheim ignores the elements entirely.** Its fights use flat attack: no defence, no element, no element damage. The forge tree means nothing in the final fight. The round 54–56 remakes move the forges and Muspelheim onto the normal fight rules.

## 2. Weapon tiers and the stages they fit

| Tier | Attack + element damage | About equal to | Fits |
|---|---|---|---|
| Shop | 5–7 / 10–13 / 16–21 / 27–29 | — | regions 1 / 2 / 3 / 4 |
| Forge T1 (Flame Iron, Briar Axe …) | 11–16 | the region-2 shop weapons | late region 1, region 2 |
| Forge T2 (Inferno Edge, Thornwood …) | 20–28 | — | regions 2–3 |
| Forge T3 (Magma Cleaver, Boulder Maul …) | 32–44 | — | regions 3–4 |
| Forge T4 (Volcano Lord, Verdant King …) | 45–61 | about 2× the best region-4 shop weapon | region 4, the forges |
| Element crossbows and bows | 25–28 | — | region 2 on (the base bows are sold there) |
| Arbalests and warbows | 42–44 | — | regions 3–4 |
| Master-works (two elements) | 41–52 | — | region 4 (most two-element monsters live there: 15 of 60) |
| Elemental Sovereign (all elements) | 65 | — | the forges and beyond |

## 3. Recommendation A — the blacksmith learns a tier as the realms open (my pick)

The village grows one stage for each master builder you free, and each freed builder also opens the next realm. Tie the forge to the same stages, so the story explains it: each freed builder brings the smith the craft for a new heat (the forge tree says so: *"The smith can work this once the Wetlands are free"*).

| Village stage (= realms open) | Opens at the blacksmith |
|---|---|
| 1 (start) | T1 of every lane; Hand Axe |
| 2 (s1_tower, Wetlands open) | T2; element crossbows and bows |
| 3 (s2_tower, Highlands open) | T3; arbalests and warbows |
| 4 (s3_tower, Ashlands open) | T4; the master-works |
| the forges rise (all boss dungeons + towers) | the Elemental Sovereign |

- A locked node in the forge tree shows a padlock and what opens it ("opens when the Wetlands are free"). The Tome shows the same lock.
- The shops already work this way: the armory only sells weapons up to the highest open realm. This rule brings the forge into line with them.
- **Armour too.** Gem-setting armour is jeweller work, so the jeweller follows the same table: a second gem on a piece from stage 3. The resistance cap stays at 50%.
- **Already-made gear stays yours.** The rule only gates forging.

**Alternatives:**
- **B — by hero level.** For example T2 at level 8, T3 at 13, T4 at 18. This is simple, but it does nothing to stop grinding in region 1, and the level caps already follow the realms, so it amounts to the same thing as A with a worse explanation.
- **C — by the lane's own boss.** Each element's T3 and T4 need that element's boss dungeon or tower beaten. This is very flavourful but uneven: the fire lane would wait until s4, while earth opens at s1.

## 4. The ring stacking

**Recommendation:** cap the element damage bonus from rings and amulets at **+40% per element** (5 gems' worth). The extra gems still add resistance. This matches the resistance cap's idea and stops the 10-ring route.

## 5. What each stage asks of your weapons (the "why" for players)

| Stage | Most common monster elements | Best counters (the wheel: Water > Fire > Grass > Earth > Water; Storm ⇄ Shadow) | Weapon types that matter |
|---|---|---|---|
| Region 1 | grass 21, earth 12, shadow 11 | fire (beats grass), grass (beats earth), storm (beats shadow) | anything works; axes break the 3 `armor` monsters |
| Region 2 | water 29, shadow 16 | earth (beats water), storm | bows are sold here; 5 monsters weak to melee, 4 immune to it → carry a bow as well as a sword |
| Region 3 | earth 27, storm 15 | grass (beats earth), shadow (beats storm) | arbalests and the pierce shot for the packs |
| Region 4 | fire 40, shadow 16, 15 two-element | water (beats fire), storm; master-works for the two-element monsters | 8 `armor` monsters → axes; the 2 ranged-immune monsters → melee |
| The forges (rounds 54–55) | forge-masters warded to all six elements (×0.35), weak to Sovereign (×2) | **Sovereign** | Sovereign pieces (one per finished collection) or the forged Elemental Sovereign |
| Muspelheim, Asgard | warded except Sovereign | Sovereign, then the Lodestar | the same, plus Godsbane |

Two rule changes would make this table hold. Both are planned for rounds 54–56 anyway:
- Muspelheim's fights move onto the normal fight rules, so element and Sovereign weapons matter there.
- Sovereign becomes its own seventh element. It is neutral against ordinary monsters (×1, not "weak to everything"), which keeps the sword from trivialising the four realms. It is bane to the forge-masters, Surtharn and Asgard.

## 6. What changes for an existing save

- Nothing is taken away.
- Forge nodes above your stage show as locked.
- If your save is already past a stage, those nodes are open.
