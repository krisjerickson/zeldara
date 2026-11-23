# 88 — Playing and coming back: decided; aiming made simple (round 129)

## Kris's picks in "Playing and coming back 2"

**Building:**
- **First win** — as proposed: you start with the wooden sword. A weak bramble wolf corners a lamb at the sheep fence. Oswin steps in after two hits. The reward is the first shield, and the shield lesson follows.
- **Gamepad** — the Zelda layout (attack on X, talk on A).
  - Plus a **Controls page** that shows every control, with remapping for keys and buttons.
  - Plus a check that the Steam Deck covers **every** action, including the back grips and trackpads.
- **The village crypt** — echoes of beaten bosses (bronze, silver or gold marks) and the Saga Retold door (New Game+) after the ending.
- **Landmarks** — at the passages between the realms, with the pull-back and a name banner. Kris still wants to see it, so it goes in behind **one switch**, so it can be rolled back at once.
- **Friends in the village** — the light version: bond hearts only unlock each villager's saga lines.
- **Couch co-op** — full, with the rebalance:
  - monsters: health ×1.5, packs +25 %;
  - bosses: health ×1.7, their marks split between the twins;
  - extra-health bars ×1.5;
  - a fallen twin can be lifted, or comes back after 15 s.
- **Play now** — "first": the choice stays before the intro, but the form becomes one click.
- **Coming back** — letters at home and a "where you were" card.
  - The seasons turn only by play, never by the real clock (already so: by the realms opened).
  - When a new season starts, its festival runs for the first three in-game days. This needs a game-day counter from the day/night cycle.

**Maybe:**
- **The village grows** — six stages, but nothing you can do may wait for a stage.
  - Forging, shops and services stay open as today. The stages only change how the village looks.

**Not now, but kept for later:**
- **Tells** — kept for later.
- **Three paths** — could become a full skill tree one day.
- **The twin fighting.**

**Out:** assist, the raven.

## The build plan
- **Wave 1 (next):** safe saves, fast start, stuck help, softer lessons, site time, next hook, fair pledge, the playtest log, the Controls page with remapping, and the one-click play-now form.
- **Wave 2:** death story, challenge codes, share cards, photo mode, letters and the where-you-were card, map stamps, the Tome as a book, rest at any hearth, the game-day counter and festival days, and the first win.
- **Wave 3:** the festivals, home trophies, the loom, saga night, secrets, stream mode, the gamepad (with the Steam Deck check), the village crypt and the Saga Retold, landmarks (behind the switch), friends (light), and the village's six looks.
- **After that:** couch co-op (the largest).

## Aiming, shooting and casting (Lab › Aiming, shooting & casting)
Kris: "we made this too complicated … click spell or projectile and then a direction … auto aims at the strongest enemy in that direction, in range, and with line-of sight … a place in game controls to choose which enemy it auto-targets".

Five ways to choose from:
1. **Press, then point** — his idea.
2. **Soft lock-on** — a gold ring sits on the best foe; tap to shoot it.
3. **Shoot where you face.**
4. **Hold to draw, point to choose** — keeps today's ×1.5 and ×2 draw.
5. **Free aim with a gentle pull.**

Every way uses one **target rule**, set in the controls: strongest, weakest, nearest, most dangerous, or the one you last hit. Only foes in range and in sight count.

**Bow and crossbow** — four proposals:
- **A** — the bow for speed; the crossbow fires one heavy bolt that pierces every foe in a line and breaks plate.
- **B** — arrows arc over cover; bolts fly straight and twice as far.
- **C** — arrows carry the elements; darts become tools (rope, net, spike, smoke).
- **D** — remove crossbows. Each one you own becomes the matching bow at the same strength, and darts become arrows one for one.

## Built (round 129b): Kris's picks
Kris picked **soft lock-on (2)** and **hold to charge (4)**, combined: "i like holding to gain power. think this can also work with option 2, let's see if we can combine". The target rule: "have all of these options available to set your default in the controls of the game". Bow and crossbow: **A, pierce**.

What the game now does (`src/js/09s3-aim129.js`, ZAIM129):
- **The gold ring** always sits on the best foe ahead of the hero: in front, in range (bow 340, spell 300) and in sight. It holds on that foe and looks again every 0.8 s.
- **Tap Ctrl or X** to shoot or cast at the ringed foe at once. The old "X twice" rune circle and its steering are gone.
- **Hold to charge:** ×1.5 at 0.4 s and ×2 at 0.8 s. A charged spell costs a quarter or a half more mana, or the most it can pay for.
- **A direction pressed while holding** moves the ring to the best foe that way, and the hero stands still.
- **The target rule** is in ❓ Controls → "Auto-aim" and is saved with the game (`ps.aimRule`): ⚠ most dangerous (the default: bosses, then champions, then foes that shoot), 💪 strongest, 🩸 weakest, 📍 nearest, 🔁 the last one I hit.
- **The crossbow (A):**
  - one heavy bolt, +35 %, with a 1.2 s reload (the bow now takes 0.45 s);
  - the bolt goes through every foe in a line, in the world and in dungeons. In the world it used to stop at the first foe.
  - It breaks plate as well as a guard (`MX._barHit` wrap).
  - Darts cost 1.5× and come 6 or 3 to a bundle.
- The Controls page wording is updated.
- Tests: `tests/test_round129b.py` (14 checks). `test_round102`'s "X twice" check now expects a cast at once.

## The Lab, tidied, and the checklist
- **Only the tabs that still need Kris are buttons:** Checklist, World revamped 3, All the seasons, Sound effects, Music, Shot series, Cut-scene looks, Kling vs Flow. All the others are in the "Archived & earlier rounds" drop-down (`LAB_NOW` in `99-lab-sets.js`).
- **📋 Checklist** (`79z5-lab-tracker.js`, TRK) is a row for everything we have talked about, grouped by area.
  - Statuses: needs your input, Claude builds next, waiting outside, in the game, and later or not now.
  - "In the game" rows carry a one-line summary of what was built.
  - Open inputs are counted live from the Lab's own asks.
  - Each row has a note box (`trk-<id>`), and there is one more for anything else (`trk-general`).
- **Keep TRK current every round.**
