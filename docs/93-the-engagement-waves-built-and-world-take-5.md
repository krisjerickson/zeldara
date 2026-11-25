# 93 — The engagement waves built, and the world, take 5

Round 134. Kris: *"great, lets go onto these waves, proceed with all 3 unless you need something from me"*. He also left notes on take 4 of the world revamp.

## Wave 1 — the rest (`21z1-keys-pad.js`, `21z2-wave2.js`)

- **Your keys.** The Controls page (pause › Training) starts with every action and its key.
  - Press the button, then the key you want. Esc keeps the old key. One button puts the usual keys back. Arrow keys always move.
  - How it works: the key you press is turned into the key the game already knows, so every scene works unchanged.
- **Gamepad, Zelda layout.**

  | Button | Action |
  |---|---|
  | X | attack |
  | A | talk / open |
  | B | roll |
  | Y | spell |
  | RB | skill |
  | RT | bow (hold) |
  | LT | defend (hold) |
  | LB | potion |
  | Stick clicks | mount, familiar |
  | D-pad | inventory, food, ammo, Godsbane |
  | View | map |
  | Menu | pause |

  - In any menu, talk box or pop-up, the stick or D-pad moves between its buttons, A presses and B closes. LB and RB change pause tabs.
  - Every pad button can be moved on the Controls page.
  - While a pad is in use, lesson cards show pad buttons instead of keys.
  - Steam Deck: the Controls page suggests a layout for the back grips (L4 roll, R4 bow, L5 potion, R5 skill). The trackpad and the touch screen also work.
- **Streamer mode** is a box on the Controls page. It blurs player names on the title and save screens.
- **The play log** is off until a player ticks it.
  - It is kept only in that browser: where sessions end, falls per guardian and time per site.
  - "Copy the log" or "Save it as a file" exports it. The Lab's **Play log** tab reads one or more logs and tallies them.
- **Fast first load — not built.**
  - The game fetches 95 MB of scenery and 127 MB of character sheets before the world starts.
  - Those are packed by paint wave, not by region. Splitting them into region packs means changing the intake tool and the loader.
  - Planned as its own round.

## Wave 2 (`21z2-wave2.js`)

- **ZEV** notices what happens and keeps the last few things you did. The letters, the recap and the saga cards are written from that.
- **Game days.**
  - A day is 20 minutes of play, or one night in your bed. "Day N · season" shows on the little map.
  - Seasons still turn only with the story.
  - The first three days of each new season are its festival:

    | Season | Festival |
    |---|---|
    | Thaw | Thaw-fair |
    | Summer | Midsummer Fires |
    | Autumn | Harvest Fires |
    | Winter | Yule |
    | Freya's spring | Blossom Feast |

- **Death story.** Each fall still costs the same, but now also tells you something: who found you (12), a villager's word (8) or a page of lore (6). None repeats until all have been told. The wake line reminds you that your purse waits where you fell.
- **Letters.** Back after a day or more away, up to three letters wait on your table at home. They are written from what you did last, and each holds a small gift (gold or food).
- **"Last time, in your saga…"** Back after half an hour or more, a card shows:
  - where you are and the day and season;
  - what you did last;
  - three goals of about 20 minutes: your road, the nearest site to clear, and the festival or a secret.
- **Map stamps.** Eight kinds (chest, danger, come back, boss, trader, secret, favourite, question). Click to place one, click it again to lift it. Waking a waystone reveals the land around it on the map.
- **Tome › Collection.**
  - How full each chapter is.
  - 28 stickers for firsts; two are yours from the start.
  - Secrets found per realm, echo runes and festival ribbons.
- **Rest by the hearth.** After a site or a boss, a tally shows time, gold, experience, what you found, and "Not a scratch!" if you took no hits. Then choose:
  - **Onward**;
  - **Rest by the hearth**: the game saves, shows the village at dusk, then lets you keep playing or go to the title;
  - **Saga card**.
- **Photo mode** is a pause tab.
  - The HUD hides.
  - You choose a frame (the four r127 frames, plus the banners as they are picked), a light (lantern, dusk, frost, moonlight, old saga) and which way you face.
  - Save writes a PNG with a small title mark.
- **Saga cards** (1200×630) are offered when a festival begins and at the ending, and from the hearth tally. They can be saved, copied or shared, and carry no spoilers.
- **Challenge codes**, like `ZQ-AFA-DGD-7C`, hold an echo, a time and a rune, with a check so a mistyped code is refused.

## Wave 3 (`21z3-wave3.js`)

- **Festivals.**
  - On festival days the Green is dressed with that season's painted pieces (the `fs_*` sets), and a board stands by the well.
  - The board offers three games: **Rune toss** (stop the rune in the gold), **Rune memory** (six pairs) and **Race the Green** (six ribbon posts in 45 seconds).
  - One game wins the season's ribbon; best scores are kept.
- **Home trophies.** At home, a trophy shelf with eight spots. You place and move guardian trophies, festival ribbons and keepsakes on it:
  - the lamb's bell;
  - your first shield;
  - soulglass;
  - a bowl of runes;
  - gold runes;
  - the true spring's blossom.
- **The Saga Loom** in the guild hall weaves five panels, one per realm finished and one for the end. It can make a saga card of the wall.
- **Secrets.** There are 120, thirty in each realm, all fixed for the world.
  - Kinds: lost runes, huldra stones, nests, old carvings (lore), mushroom rings, coin pouches, map scraps (which mark another secret), and a fox that runs off and leads you to its cache.
  - A faint glint shows when you are close; walk over one to take it.
- **The crypt of echoes** stands by the Green.
  - Each guardian you have beaten waits there as an echo. Runes: bronze for a win, silver for three hits or fewer, gold for no hit. Gold also pays out (20/40/80).
  - Falling in an echo costs nothing.
  - Your time becomes a challenge code. Paste a friend's code and their time is the one to beat.
  - After the end, the crypt's far door is **the Saga Retold**: a new saga in a free slot.
    - It keeps the Tome, stickers, runes, ribbons and trophies.
    - Foes get ×1.3 health per retelling (bosses ×1.45), capped after three.
- **Bonds (light).** Six villagers grow hearts as you talk with them, one heart-point per game day: Oswin, Benno, Morwen, Runa, Brask and Garrick.
  - Every three points is a heart, up to five.
  - Each heart unlocks one more line of their own story — 30 new lines in all.
- **The saga frame** plays at the big beats: a new realm opens, or a guardian falls. It uses the thin illuminated frame until Kris picks banners.
- **Aurora in the water** (take 4 ✓). On clear nights a soft green-violet sheen lies on open water only. It is drawn on the water layer, under every bridge, prop and person.
- **Not built:**
  - the landmarks — take 4 said to repaint them, and they are ordered;
  - the village's six looks — waiting for their paintings.

## The world, take 4 → take 5

- **Frames.** Kris: *"i like all of these … come up with 20 different banners … i like this thinner one."*
  - Twenty thin banners are ordered: `paint.ps1 -List r134_banners`.
  - ✓ the ones the game may use, in Lab › The world, revamped 5.
- **Landmarks.** Repainted the right way round: `paint.ps1 -List r134_landmarks`.
  - Bram's and Dunn's bridges cross up the screen.
  - Mira's lift rises from right to left.
  - Vela's pass goes left to right.
  - Each will be shown standing in its crossing with the road open.
- **Vistas.** Nine ways to bring their best parts into the world, each shown with the part of the vista it borrows:
  1. painted set-pieces;
  2. cliffs, banks and falls;
  3. a horizon beyond the edge;
  4. light and air;
  5. drawn roads;
  6. little scenes along the road;
  7. forests with depth;
  8. water that lives;
  9. each realm's skyline from the next.

## Paintings ordered

```
cd C:\Claude\games\Zeldara-v4
.\tools\sprites\paint.ps1 -List r134_banners
.\tools\sprites\paint.ps1 -List r134_landmarks
.\tools\sprites\paint.ps1 -List r134_engage
```

- `r134_banners`: 20 thin banners.
- `r134_landmarks`: 4 landmarks.
- `r134_engage`: 13 sheets:
  - map stamps;
  - 28 Tome stickers;
  - the crypt door and its hall;
  - the hearth and the village at dusk;
  - the trophy shelf;
  - the Saga Loom's panels;
  - keepsakes and ribbons.

Until each painting is in, the game uses a stand-in: emoji, a drawn crypt door, or woven-look panels. Whole paintings ("rooms": vistas, story panels) now show anywhere the game asks for a picture — the mage-tower scenes will show their panels as soon as `r133_scenes` is painted.

## Tests

- `tests/test_round134.py`: 30 of 30 pass.
- Rounds 130–133 still pass. The round 131 test's tab-order line now expects take 4 in the drop-down.
- Failures already there before this round:
  - `test_world_game`: Primrose stands on the first waystone, so Tab talks to her.
  - rounds 128 and 129: their sound checks.
