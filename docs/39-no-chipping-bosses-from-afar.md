# 39 — No more wearing bosses down from afar; walls never on you; push-back limited (round 83)

Kris: "we need to fix being able to range attack bosses from afar with spells to slowly kill the bosses. Few ideas: 1. bosses come at you when you attack with range weapons and spells. currently they sometimes just hover around the same area 2. mana regeneration should be slower overall, such that you might need to use mana potion if you want to continuously spam spells. Come up with other ideas as well". His answers are B1–B4 in doc 08.

**Why it worked before:**

- Mana came back at 4 a second plus up to 4 from gear. Frost Bolt costs 8 every 0.8 s, so a caster nearly never ran dry.
- Bosses that "kite", "hover" or "drift" kept their distance. Ones that "lumber" or stand "still" could not reach you.

## 1. A boss struck from afar charges in (B1)

- **What sets it off:** an arrow, a bolt or a spell hitting a boss from beyond 5 tiles (160 px past its edge).
- **What it does:** the boss drops its own pattern for 3.5 s and comes straight at you at 1.6× its speed. "it comes for you!" floats over it. It stops when it reaches you.
  - A boss rooted in place (still, perched, burrowed) pulls you toward it instead, while it can see you.
  - Fliers fly over what is in the way.
- **Where:** every boss and boss form, the old dungeon and field bosses included (they chase, and their shooters stop backing off).
- **The code:**
  - `04j-hit.js` ZHit.range: every hero hit goes through ZHit.dmg.
  - `09-monster-engine.js` MX.tick: the charge.
  - `10-scene-world.js` and `12-scene-dungeon.js`: the old monster code.

## 2. Spells from afar are warded (B3)

- **Spells:** a spell landing on a boss from beyond 6 tiles (192 px past its edge) does 40 % less. "warded — get closer" shows over the boss.
  - The first time in a game, a notice explains it: get closer, or use your bow.
- **Everything else hits in full:** arrows, bolts, sword blows and skills. Kris: "ward against range should only be for spells, projectiles should still be full attack".
- **Who it applies to:** bosses only; ordinary monsters are not warded.

## 3. Mana (B2) and mana potions (B3)

- **Regen:** 1.5 mana a second while you fight, 4 out of a fight.
  - "Fighting" means you struck something or were struck in the last 6 s, or a boss is after you within ~16 tiles.
  - Gear adds at most +2.5 (it was +4).
  - The stats panels show both numbers.
  - The code is `09-hero-core.js` ZMREGEN.
- **Mana potions:**
  - Cheaper: Mana Draught 12 g (was 25), Greater Mana Draught 50 g (was 90).
  - They have their own bag: up to 5 of each kind, beside the healing bag of five (Arcane Surge and Runic Tea too).
  - There is a 4 s wait between mana draughts ("too soon" if you try sooner; the draught is kept).
  - **Shift+P drinks one.** It takes the small one unless you are missing more than 60 mana. The first time you run out of mana with a draught in the pack, a hint says so.
  - The code is in `22h-potions.js`; Shift+P is wired in `24-pause-input.js`.

## 4. Walls are never raised on you

Kris: "monsters that create walls or barriers that stop your movement can't be cast on top of you, otherwise you just get stuck and eventually die".

- **Where the wall goes:** the wall attack's three stone blocks now rise in a line a step from you, toward the monster. Before, the line ran through a point just above you, and when the monster stood to the side one block landed on you.
- **No block on you:** a block is never placed on you or within a step of you (MX.wall).
- **Never stuck:** if you are ever inside a wall (an old one, or you were knocked into it), it does not hold you; you can walk out. The other walls still block.

## 5. Push-back is limited

Kris: "some spells push-back ability is too strong. let's limit how much you can push back monsters, and should be less for bigger monsters and bosses".

- **Which pushes:** every push you give a monster goes through one rule (`09-hero-core.js` ZKB): Tidal Wave, a familiar's gust (Wind Sprite) or shove, and Whirlwind.
- **By size:**
  - A small monster takes the full push.
  - The push shrinks with size, to about a third for the biggest monsters.
  - A boss takes a quarter: Tidal Wave moves a boss 7–8 px.
- **A limit:** no monster is pushed more than 60 px in 3 s, scaled the same way (a boss at most 15 px). Spamming Tidal Wave can no longer hold a monster off.
- **Walls:** a push stops at a wall. The world's Whirlwind used to shove monsters 64 px straight through walls, bosses included; it no longer does.

## Tests

`tests/test_round83.py` (16 checks).
