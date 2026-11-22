# 85 — Round 128: emojis painted, boss fights by phase, the world take 3, the seasons painted, the sound effects fixed

Docs 83 (engagement) and 84 (releasing, money and the law) are the round's other two parts.

## 1. The last emojis (Lab › Emojis, painted)

Kris: "look into all the places we are still using emojis or icons, and make proposals of how to replace these with painted images".

- **How the search was done** (`tools/world/r128_icons.py`):
  - I read the code: 2,082 emoji and symbols in the player-facing code, in 13 parts of the game. The Dev tools are left alone.
  - I played the game painted with every pause tab, the shop and the journal open: 32 different emoji were on screen.
- **The game already has the system for this.** ZIcon (round 32) carries the emoji each icon replaces, so a painted sheet can arrive at any time.
- **Many emoji only need wiring.** A painted icon already exists for 🗺 🎒 📖 🔊 🔒 💰, the six element icons, the map markers, and others. The Lab shows each emoji next to the painting that would replace it.
- **New: 65 icons on 3 sheets, wave 129** (`src/js/07zt21-art-r128-icons.js`):
  - **Menus and controls:** save, skills, lore, controls, menu, settings, roll, interact, page beads, done / not allowed, photo, share, two players, assist.
  - **The five seasons' emblems, the map and quests:** the thaw's snowdrop, the sun disc, the last sheaf, the straw Yule goat, Freya's wreath; quest stars, map pin, compass, gift, celebration.
  - **Shops and the realms' symbols:** sleep, mead, notice board, better / worse; hall, gate, chain, the bridge of light, the thread of fate, and others.
- **Items:** the 125 items that still show an emoji (45 economy pieces, 76 Alpha trophies, 4 saddles) were ordered in round 121. Kris has painted them, and this round's intake took them in.

`.\tools\sprites\paint.ps1 -List r128_icons`. Nothing is wired until Kris ticks the parts.

## 2. Boss fights, phase by phase (Lab › Boss fights, phase by phase)

Kris on round 127's plan asked for these changes:
- The same number of proposals for every boss, whatever its phases → **rebalanced**.
- Today's mechanics missing → **sprinkled in**.
- Increased health, ward and resistances should be part of it.
- **Each phase selectable on its own.**
- **Rank-ordered by difficulty.**
- Check every element fits the game: ceiling climbing, walls falling in.

**What changed** (`tools/world/boss_plan2.py`):
- **Phases are read from the game.** The data comes from `tools/world/boss_today.py` → `boss_today.json`.
  - The guardians have 2–5 phases, the forges 3, Surtharn 6, Solmyrk 3.
  - The Muspelheim guards are 4 separate fights.
  - Wardens, masters, island guardians, elites and the rush bosses have 1 phase.
- **Proposals are spread across the phases.**
  - A proposal that named its phase ("Phase 2: …") stays there.
  - The rest escalate: blades and shots come early, arena set-pieces and mind games come late.
  - 61 new proposals were written so every phase of a many-phase boss has its own 3–5 (for example, the Lava Titan's heart beating in phase 5).
  - A 1-phase boss keeps 10.
- **Today, per phase, to keep:**
  - signature attacks, its kit, arena events, allies, the last stand;
  - **more health ×n**, always on;
  - **✨ ward, 🏹 guard and 🛡 plate bars**, with their shares;
  - **the element** (what it resists and fears), always on.
- **One ranked list per phase.**
  - The order decides which difficulty first uses an element; ▲ ▼ reorders.
  - Three ways to scale, chosen once:
    - **a share of the list** (Hearthside ½ … Ragnarök all);
    - **one more each step**;
    - **a gentle core, a hard edge**.
  - Until Kris touches a phase it shows my suggestion: the signature attacks first, then the new ones, the bars, and the last stand last.
- **Checked against the game.**
  - **6 discarded:**
    - climbing into a canopy;
    - a grindstone on a rope;
    - a portcullis;
    - an ice chandelier;
    - a bell rope over him;
    - falling bridges.
  - Two kinds are gone entirely: wall-and-ceiling climbing and swinging on ropes. Three bosses that swung now haul themselves on a chain anchored in the floor, or vault.
  - **17 re-told for the arena floor.** For example, "the rim crumbles" becomes the outer floor cracking into lava, and the bell is a fallen bell you strike.
  - Each proposal says how easily it goes in:
    - **ready (193):** an existing attack does it;
    - **small code (336)**;
    - **needs an arena object (76)**;
    - **needs paintings (40)**.
- Round 127's "Boss fights, remade" is retired. Its movement answers carry over.

## 3. The world, revamped — take 3 (Lab › The world, revamped 3)

The 18 sheets of `r127_world` came in, along with the 35 seasons sheets and the economy icons.

- **Intake ran on the PC.** It cut 55 sheets; the atlas now has 116 pages and 3,118 objects. The pages came to the cloud copy as `.sync/scenery128.tar`.
- **Landmarks, vistas, site exteriors and frames:** each is shown in the game, as asked ("i still need to see it first").
- **Aurora in the water:** four new ways:
  - a soft sheen;
  - broken ripples of light;
  - the painted reflection added as light;
  - the sky band mirrored in the water.
- **Night:** today's pools of light around the hero, villagers, monsters and lanterns are kept exactly; outside them the night is moonlit. Option (c) adds a moon-rim to everyone.
- **Shadows, remade by geometry:**
  - flat things (puddles, rugs, stepping stones) get none;
  - standing things get a shadow that starts where they touch the ground;
  - (b) contact shadows only; (c) contact plus a cast shadow by height; or ✕ to leave shadows out.
- **Water, ground and air:** the new painted pieces.
- **Light pools:** the paintings came out as solid discs with rims. Proposal: the game draws them as soft light (free). The paintings are not used.

**A bug the new paintings exposed.** Runa's board (painted in round 121's economy sheets) was drawn **70 times too big** and covered the whole village. `22m2-economy-places.js` passed a height where the call takes a size multiplier. The lost purse had the same mistake. Both are fixed.

## 4. The five seasons, painted (Lab › The five seasons)

Kris: "i don't see any proposals for new art or images. Make sure to request these or let me know how we are planning to implement these".

The paintings were requested in round 127 (`r127_seasons`, 35 sheets), and Kris has now painted them. Each season shows:
- the game as it is now;
- the new land pieces laid into the same places;
- every new painting with ✓ / ↻;
- how each part goes in.

| Season | What swaps in by itself | What is built after the ✓ |
|---|---|---|
| The thaw | the 17 thaw repaints (trees, plants, edges, ground, the village) | old snow, mud, coltsfoot and snowdrops scattered thinly; the set pieces at fixed spots (the boat tarred at the pier, bedding airing, Tob's plough, a bird box) |
| Summer | — | — |
| The first harvest | — | hay racks, stooks, the last sheaf, the harvest wagon, baskets and barrels; the harvest dressing at the doors; the Haustblót set |
| The first happy Yule | — | the bird-sheaf poles, snow and ice lanterns, spruce at the doors, straw stars and the straw goat; the Yule dressing; Jól on the Green |
| Freya's spring | the five village repaints aimed at her | anemones, cowslips and a meadow along the soul-lines, birch and hawthorn, the flower pole, bees, the Valborg fire; the Blossom Feast |

## 5. The sound effects, fixed (Lab › Sound effects)

Kris: "there's quite a few picks in there that i don't think i ever picked, and they sound really bad … cross-check this with what is in the game … when i click to choose, it moves in the lab and is hard to find … a button for 'remake up to 5'".

**What went wrong:** round 101's recovery (`79m1-lab-sfx-recovered.js`) merged three sources into "your picks":
- what the game played then;
- the earlier Lab picks;
- the round-93 kept takes.

The first source included takes I had put in the game myself: "Today" (`cur`) and the gentle e1/e2. Kris never chose those.

- **The check:** 47 takes came only from the game. In **36 effects** they showed as ★ and the game was playing them. The takes Kris added himself (the w-takes, clicked a few seconds apart on 8 Nov) are kept.
- **The fix:**
  - The Lab no longer shows those takes as ★. They are marked *not yours*. Data: `79m1e-lab-sfx-fix128.js` and `tools/audio/sfx_fix128.json`.
  - **The game was re-picked on the PC to exactly Kris's own picks** (`pick_sounds.py`, 35 effects). The old takes were moved to `audio/replaced_r81`, not deleted.
  - `sfx_sk_time_slow` had no pick of his and goes back to "To pick".
- **Easier to pick:**
  - Rows stay where they are while you click; **⟳ Re-sort** moves them into their new groups.
  - **＋ Remake up to 5** keeps your ★ and asks for new takes until there are five (`sfxre-<id>` = `more`). I write the new takes' words at the next round, as with ↻ Remake all.

## 6. Kris's questions

- **Economy round 2:** yes, all 18 (N1–N9, I1–I9) have been in the game since round 121, with every round-1 pick except treasure maps (doc 76). What was still missing were the pictures: the item, trophy and saddle icons and Runa's board. Kris has painted them, this round took them in, and the board's size bug is fixed.
- **The villagers' sagas:** **not yet written.** The pieces so far:
  - the backstories (round 113, ✓);
  - the woven saga with its five strands (round 114e);
  - The Lake Remembers and The Other Half, woven in (round 118).

  What has not been written is the villagers' **lines**: three times the meetings, at least 40 per villager, along each strand and chapter, plus the seasonal lines. That is the next big writing job.
