# 89 — The mana arc and the gold ring wait for their moment; wave 1 built; the seasons painted again (round 130)

## The mana arc and the gold ring
Kris asked for two things.
- On mana: "i would like to not have the mana bar shown until you have your first spell to cast. there should be some ceremony and NPC telling you about the mana bar being added and showing you where. it also should glow and shimmer in color a bit."
- On the ring: "we should only add the rings once you have a ranged weapon, bow, crossbow or spells. Let's also make some ceremony around when this gets added and some NPC that helps show you how to target and holding for more power."

**In the game now** (`src/js/21w2-mana-reveal.js`):
- **The mana arc** is hidden until the hero has a spell (equipped, carried or learned). The first time it appears, it draws itself in, glows twice, and a pointer explains it (`ps.manaShown`).
- **The arc shimmers.** `ZMANA.STYLE` sets the look; 'drift' is the default until Kris picks, with 'breathe', 'motes' and 'fill' ready.
- **The gold ring** shows only with a bow, crossbow or spell in hand. The first time, one line explains tap, hold and switch (`ps.aimSeen`).
- Both of these first-time moments are **stand-ins** until the ceremony Kris picks.

**Lab › First spell & first bow — the ceremonies** (`79z6-lab-ceremony.js`):
- **The mana arc — who shows you, and where** (picks: `cer-mana`):
  - Morwen at her apothecary;
  - the tower's sanctum, where the spell is won;
  - Oswin at the gate;
  - quick and quiet.
- **The shimmer, live** (`cer-shim`): drift, breathing glow, star motes, or colour by fullness.
- **The first appearance, live** (`cer-in`): draws in, pours in, or blooms.
- **The gold ring — who teaches tap, hold and switch** (`cer-ring`):
  - Sergeant Brask at the armory's butts;
  - learn by doing on the road, with a coach card;
  - one teacher each (Brask for bows, Morwen for spells);
  - Oswin's field lesson.
- **The ring's look, live** (`cer-ringfx`): a golden flash, drawn round the foe, or a ring of runes.
- Every way above has a three-frame storyboard. There is also one note box for anything else (`cer-all`).

## Wave 1 of "playing and coming back" (`src/js/21y-wave1.js`)
- **Safety saves (ZSAFE):**
  - The game makes a quiet safety save every minute, and whenever the tab is hidden or closed. It goes in its own slot, under the save's key + `_safety`.
  - Continue loads whichever of the two saves is newer.
  - A real save drops the safety copy.
- **Soft lessons (ZLESOFT, ZCARD):**
  - Lessons are now a card under the little map: "Got it" or "Don't show lessons".
  - Only five still pause: move, map, sites, forges, Godsbane.
- **Stuck hint (ZSTUCK):**
  - After ten minutes of play without the Saga moving, Oswin offers a hint. He asks once per stall, and the player can say no.
  - The hint comes in three steps: the road, then direction and paces, then the gold arrow.
- **Site times (ZSITET):**
  - The map tip and the site door show the usual length:
    - a treasure site ≈ 8 min;
    - a mage tower ≈ 12;
    - a boss site or castle ≈ 15;
    - a familiar island ≈ 10;
    - a forge ≈ 20.
  - Once a site is cleared, they also show the player's own best time (`ps.siteTimes`).
- **Morning line (ZHOOK):** waking in bed shows one line of what is waiting (the next step of the road).
- **Our promise (ZPLEDGE):** a button on the title screen listing five promises:
  - no loot boxes;
  - no energy timers;
  - nothing for sale that wins;
  - no punishment for a missed day;
  - your saves are yours.
- **Play now:** New game is one form (name, which is optional, then hero and difficulty) and Begin Quest. The game uses the first free slot.
- **Kept on purpose:** the leave guard still asks "Leave site?". It protects against accidental back steps, and Kris asked for it in round 64. It can be dropped now that safety saves exist.
- **Still to build in wave 1:**
  - the Controls page with remapping;
  - the opt-in play log;
  - the fast first load (packs by region).

## The seasons, painted again
Kris marked five groups ↻ in Lab › All the seasons & festivals:
- **Autumn trees:** "we have 3 types of evergreen trees, the pines, that turn orange. these need to stay green, but OK to propose another way for them to show its fall. Also, the other trees just turn orange, but it should be a variety of fall colors".
- **Autumn plants:** "not everything in fall turns orange. we need a variety of fall colors. study what different colors things would turn and then recreate these".
- **The thaw, plants:** "in the spring, there shouldn't be fully grown wheat, corn or cabbage yet. these should be seedlings".
- **The thaw, village props:** "the vegetable gardens shouldn't have veggies yet. just little seedlings".
- **Winter, plants:** "the corn, wheat and cabbage should be harvested now, and should be an open field with rows of soil".

`src/js/07zt24-art-r130-seasons-redo.js` gives every piece of those sheets its own words. The colours follow what each kind of plant really does:
- oak: russet and bronze;
- beech: gold to copper;
- maple: scarlet;
- cherry: orange-red and wine;
- apple: pale gold, with apples;
- willow: butter-yellow;
- swamp cypress: rust, the one conifer that turns;
- dogwood: wine-purple;
- Michaelmas asters: in violet flower;
- bracken: copper;
- Virginia-creeper vine: crimson;
- heather: purple fading to rust.

The plants that stay green or change otherwise:
- **Pines stay evergreen.** Their autumn shows at their foot: cones, leaves blown in from other trees, red-capped mushrooms.
- **The thaw:** fields and vegetable beds show seedlings in dark soil.
- **Winter:** open furrowed fields with frost.

On the PC: `.\tools\sprites\redo.ps1 -List r130_seasons_redo` (9 sheets). Then take them in as usual.

In the game, autumn pines keep their summer picture (10zs EVER) until the new ones are approved.
