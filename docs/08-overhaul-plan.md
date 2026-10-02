# 08 — Overhaul Plan (Sept 2026)

Kris wants to do everything in one coordinated effort, organized before kickoff.

**Decision board:** "Zeldara Decision Board" artifact — https://claude.ai/artifact/ENxpcmXrEXqNtZE8WBzPFA
- It has 51 panels, one per suggestion. Each panel shows code findings, options (one marked as recommended), an effort estimate and dependencies.
- Kris marks each panel Approve / Discuss / Later / Drop, picks an option and adds notes.
- Choices are stored in the artifact DB, collection `decisions`, doc id = panel id: `{status, option, notes, title, updatedAt}`.
- **Before starting any phase, read `decisions` with ArtifactData `list`** and build only approved panels, using the chosen option and Kris's notes.

## Status
- **Phase 0 (Decide): done.** All 51 panels have an option chosen (none marked Approve/Discuss/Later/Drop, no notes); every choice matches the recommended option except G2 touch controls = "later". Treated as approved as selected.
- **Phase 1 (Foundation & fixes): done** — A1, A3, B1–B6, B8, B9 built and covered by 60 headless checks (`tests/`). See changelog [69]–[80]. A2 (Design Lab playground) moves to the start of Phase 2.
- Also found and fixed in Phase 1: all five volcano scenes crashed on entry (missing `_attachSafetyEscape`), a `self` bug in the bullet-hell climb, dungeon replays where the boss never spawned and the reward chest stayed locked, and Wind Sprite being unobtainable.

- **Phase 3a (Integrate tower + dungeon picks): done** — all 20 Lab designs are in the game as 5 sites per quadrant (8 boss, 12 bonus), 4–8 floors each, island dungeons give familiars. See changelog [85]–[93].
- **Phase 3 (World integration): in progress.** Kris picked all 40 world designs. Decisions: world 4× (1200×1200), natural borders with **3 crossings per border** (all open when the craftsman is freed; Ember Wall opens after the Ashlands tower), waystone fast travel (free within a region, gold across; [Tab] to activate/travel), hand-placed zones, minimap that follows you + Full World Map (fog: explored only), **mount terrain** (each region ~30–40% signature terrain: slow on foot, deepest parts blocked; previous region's dungeon mount crosses it at full speed; Ash Dragon = all terrain + volcano causeways; horse = speed), hidden caches reachable with the mount. Build steps:
  1. ✅ Worldgen swap to `buildWorldMap` (1200²) — `05b-world-build.js` (changelog [99]).
  2. ✅ Lab-look world (changelog [106]–[113]): shared engine, zone dressing + landmark stamps, streamed renderer, Web Worker painting, all Lab runic elements (audited: 0 gaps), and the **home village** — Kris picked Runestone Hamlet + borrowed elements; it grows in 5 stages (13 → 44 buildings, outward), with a harbour on a Mirror Lake bay ([112], [113]).
  3. ✅ Crossings tied to craftsmen ([98], [100]).
  4. ✅ Waystones + travel, minimap, Full World Map ([101], [102]).
  5. ✅ Monsters, fog, sandbox, save v5, tests ([99], [105]); ✅ mount terrain + caches ([103], [104]).
- **Phase 4 (Characters) — monsters: done ahead of the sprite waves** ([114]). Kris kept all 240 roster monsters (4 quadrants × 20 mainland / 10+10 dungeon / 20 tower). One shared engine (`09-monster-engine.js`) runs them in the world, dungeons and towers from per-monster kits (`07r-monster-kits.js`); 15 existing monsters keep their original code. Spawns: 80/15/5 (visitors scaled), terrain-tied, night-only, packs with an alpha. Pixel stand-in sprites for now (ChatGPT sprites parked by Kris). Every monster has an automated behaviour test. **Zeldara Tome** (T) added ([115]). **Characters done as pixel stand-ins** ([118]): 29 NPCs (incl. village folk that grow with the village), 11 mounts under the hero, 5 familiars, 21 bosses — all in the game and in the Lab's Characters tab for Kris's review. Remaining Phase 4: ChatGPT sprites when Kris wants them (same ids), animals. Also done: black-background fix for integrated GPUs ([116]) and crisp text everywhere ([117]).
- **Round 2 (Kris's nine-point list, Sept 28): done** — see changelog [119]–[127]. ★ boss sites sealed until the quadrant's other towers/dungeons are cleared; multi-phase guardians (2/3/4/5 phases by quadrant, 20 arenas, 23 evolved forms, ward/guard/plate extra health, summons, multi-boss finales); 132 world camps (60 themed purposes, 2/3 of monsters) with a celebration; split-once; mount seat; 4 harbors per quadrant → 1 familiar island + 3 castle islands (12 castles, wardens and master teachers); skills taught by the masters only (12, incl. new Time Slow + Meteor Strike); all 12 village interiors repainted. Kris's answers: 2 new skills (12 total), teachers only (no shops), seal counts other towers + dungeons only, food/springs respawn (~10 min) but chests are one-time. Lab tabs: Castles, Boss Arenas, Interiors (all pre-selected, mark to change). Bosses are not to be reviewed until Kris asks.
- **Round 3 (Kris, Sept 28): done** — changelog [128]–[136]: no attacks through walls, shooters back off, summon once / packs stay dead, 4 elemental spirit familiars (12 designs to pick from, 6 skills, levels), 20 fairy quests with digging + trials, 3 Fairy Kings (+1 active familiar each, max 4), Tome grouped by quadrant with a Quests chapter. Kris's answers: pick 1 of 3 spirits per element in the Lab; fairies level their own quadrant's familiar; each King +1 slot; summoners summon once and packs stay dead. **Waiting on Kris:** Lab picks for Familiars, Fairies and Familiar Trials (the 4 unbuilt trial ideas get built if picked).
- **Round 4 (Kris, Sept 28): done** — [137]–[141]: Home button removed, campfires + Ashlands magma burn (safe: Lava Unicorn, Dragon, Ash Dragon), Tome immunities, elite dens (one room, elite + 3–6 plain kin, 8× HP, big named bar).
- **Round 5 (Kris, Sept 28–29): done** — [142]–[152]: Lab picks applied, parked mounts + Call Mount!, camp loot on Tab + guards return home, 100 fairy looks (5 per quadrant) + angelic Fairy Monarchs, the trial realm (12 themes incl. light alignment + collapsing rune path), dark-stone castle interiors, 16 mage towers teaching the 16 spells with single-phase magic bosses, Lab tabs for Mage Towers, Bosses and Monster Camps.
- **Round 6 (Kris, Sept 29): done** — [153]–[162]: familiars cast base + one chosen special, crowd-control diminishing returns, line of sight for heroes/familiars/monsters, monster counters (Spirit Ward, Mirror, Null aura, Resist, Banish), familiar knock-outs; the old Cave scene removed (Ember Cave = island dungeon, 3 Lab looks); islands rebuilt on the world pipeline with fog, minimap, camps, a waystone each, animals + weather, and 16 Lab designs. **Waiting on Kris:** Islands tab tags, Ember Cave look.
- **Round 7 (Kris, Sept 29–30): done** — [163]–[171]: all 76 boss slots painted (197 designs, 2–3 options each) that grow each phase, lore-inspired names ('New name, the old title'), creature bosses, motion personalities (strides, lumber, plane-shifting, afterimages …), title cards / transformations / finale / hit-pause, procedural sound + boss music, Lab Bosses tab with every phase, Tome portraits; performance picks (animals culled, lazy patterns + monster visuals, HUD dirty-checks, save v8, palette PNGs, minified build: 3.14 → 2.10 MB). Kris picked all rows (Sept 30).
- **Round 10 (Kris, Oct 1): home page + logo. Answers:**
  - **Home page:** a Next.js landing page at `/` (Vercel); the game moves to `/play`; the Lab stays at `/lab`. The in-game title screen gets the same look.
    - Content: Play (New / Returning player with the name + 3-slot picker) and a short story / world blurb.
    - Look: black background, simple, not distracting. Runic references, aurora borealis, slow glows, some shooting stars, spirit-like styling.
    - **15 look options in the Lab** for Kris to choose from.
  - **Logo:** the word ZELDARA is separate from the symbol.
    - **20 symbol logos without the word**, each in 3 sizes: full-screen impressive, medium, small (for use around the game).
    - **10 wordmark variants** of "Zeldara".
    - One major colour per design, varied across the set, with the runic glow; bevels and other stylistic touches welcome.
    - Inspiration: Zelda-style emblems (our own design), Nordic (tree of life), Celtic knots.
  - Build the Next.js site after Kris picks in the Lab.
  - **Done (Oct 1):** Lab tabs Logos (20 × 3 sizes), Wordmarks (10), Home Pages (15) published (Lab v18). **Waiting on Kris:** picks + notes in those three tabs.
- **Round 9 + hosting: done (Oct 1)** (changelog [186]–[192]). **Waiting on Kris:** `git push origin main`, then the Vercel import (steps in `12-hosting-and-saves.md`).
- **Hosting + multi-user saves (Kris, Oct 1). Answers:**
  - Players use mostly their own devices.
  - Saves: browser profiles with backup codes. Name on New Game, a "Returning player" list, 3 slots per name, stored in the browser (no database), plus Export/Import save codes. Code structured so Supabase can plug in later.
  - Deploy: push to GitHub → Vercel runs `npm run build`. Built files stay out of git.
  - Public game, with the Lab at /lab (unlisted).
  - Kris gets step-by-step setup instructions.
- **Round 9 (Kris, Oct 1): boss finalisation after the first play-through.**
  - Asked for:
    1. A big boss hitbox (not a small fraction of the sprite).
    2. The hitbox must always be reachable.
    3. Familiars are too strong; each added familiar should deal much less damage.
    4. Bosses need more HP.
  - **Answers:**
    - Hitbox = lower two-thirds of the body (oval from the feet to the chest, always including the feet area on walkable floor).
    - Familiar damage by slot: 100 / 60 / 40 / 25% (all four ≈ 2.25× one), in **all fights**.
    - Boss HP **+50% on top of the earlier +20%** (≈1.8× original) for all bosses: guardians, castle wardens, mage masters, island guardians and the volcano rush. Elites get +25%.
- **Round 8 (Kris, Sept 30): in progress — boss finalisation.** Kris's notes:
  (1) every multi-phase boss keeps its colours and signature elements (hat, gem, chest star, crown, background effects) through all phases;
  (2) Hollow Knight / Silksong-style fights with attacks that cover areas of the screen;
  (3) keep every unselected design for reference;
  (4) ask questions before finalising.
  Answers:
  - Difficulty ramps by quadrant (Grasslands gentle, Ashlands near Hollow-Knight-hard), but bosses keep decent health, because weapons get stronger and familiars auto-attack.
  - Summons are mostly swapped for arena attacks. Themed ones and the multi-boss finales stay.
  - Build all four attack families: sky rain + sweeping walls; radial bursts + rotating beams; floor takeover + burrowing; combos, boomerangs, desperation moves + stagger.
  - **Lab review first:** update the Lab with consistent phase versions and 2–3 options for each new form (Rock Dragon 3 = flying Smaug-like dragon; Rock Dragon 4 = flying, two wings, longer; Lava Titan 3 = titan built on phases 1–2 with lava swooshes). Kris picks, then the attacks are built and it all goes into the game.
  - Picks are in Lab DB `picks` (keys `bosses-<slot>`, regions:[option]).
  - **Done (Sept 30), part 1 — looks:** picks applied; signature system (07zz-boss-sig.js); new flying Rock Dragon 3/4 (wyvern) and Lava Titan 3 options; Lab line-ups published (Lab v16). The game is not republished yet.
  - **Waiting on Kris:** in the Lab, choose Rock Dragon 3, Rock Dragon 4 and Lava Titan 3 from the NEW options, and mark each family "looks right" or leave notes (keys `bosses-fam-<id>`).
  - **Kris's Lab review (Oct 1) — received; Kris says implement now:**
    - Picks: Rock Dragon 3 = **e**, Rock Dragon 4 = **e**, Lava Titan 3 = **d**.
    - Families OK: Goblin King, Dark Warlock, Swamp Witch, Storm Mage (+ Shadow Lord marked OK, but with notes).
    - Iron Sentinel: shoulder rocks look awkward. Make them stalagmites growing out of the shoulders.
    - Lava Titan: the phase 4 → 5 change is too abrupt. Give phase 4 a heart element, not just a standard drake.
    - Rock Dragon:
      - Wings must stay attached when flapping (phases 3 and 4).
      - Phase 4 needs bigger parts than phase 3 (torso, legs).
      - Phase 2 and its drakeling ally must clearly show 2 wings.
    - Shadow Lord:
      - Phase 3: the specter rides a fell-beast-style winged mount (Tolkien-inspired, our own design).
      - Phase 4: a large hell-hawk-style beast.
      - Phase 5: angelic, but keeps the black hovering orb (eclipse).
  - **Done (Oct 1), part 2:** review fixes plus the signature attacks are built and published (changelog [178]–[184]). Next: Kris plays the fights; tune `BOSS_RAMP` and the per-family lists in `07zz-boss-attacks.js` from his feedback. The Volcano boss rush (its own scene) doesn't use the director yet.
  - **Part 2 — attacks (as first planned; signature moves per family:**
    - Grubnash: hammer shockwave rings with a gap; gold/boulder rain in marked columns; the warg charges across the arena.
    - Morvane: rotating teal beams; web takes over half the floor; the spider burrows and bursts out.
    - Greenteeth: bog floor switches halves; lantern boomerang; the hydra submerges and erupts where the bubble trail ends; 3-way spit.
    - Tharnwald: lightning columns; a thunder wall sweeps across with gaps; hammer slam + ring; storm-orb boomerang.
    - Grauldr: rock rain; crystal radial burst; flying fire-breath strafing runs; landing slam; chest-glow desperation fire with safe spots behind crystals.
    - Brokkrun: rotating forge-star beams; gear walls sweep across; shoulder rock rain; hammer boomerang.
    - Surtvald: lava takes half the floor; lava-wave walls; wide flame-sword arcs; heart: radial bursts + rotating beams + eruption.
    - Malgorath: the eclipse darkens the arena except near you; blade rain; twins mirror him; rotating void beams; dawn: sweeping walls of light.
    - Shared across all bosses: a stagger bar (after enough hits the boss is stunned and takes extra damage), a desperation move below ~15% health, and far fewer summons.
- **Phase 2 (Selector pages): in progress** — Design Lab live with Towers (10), Dungeons (10) and the Sprite pilot (30 prompts). Waiting on Kris: picks in the Lab + pilot images in `sprites/incoming/`. World quadrant selector (40 designs) is live in the Lab — waiting on Kris's picks (2–3 per quadrant).
- Design Lab: https://claude.ai/artifact/MnYcjcTXfpWm4YuiErDLHd — picks in DB collection `picks`.
- Playable build: https://claude.ai/artifact/7p3eXrHtD4iLbm6MLbg4jz

- **Round 11 (Kris, Oct 2): redo logos, wordmarks and home pages before final picks. Built Oct 2 — changelog [197]–[199], Lab v19. Waiting for Kris's picks in the Lab (Logos / Wordmarks / Home Pages tabs, second pass at the top).**
  - Kris's Lab picks:
    - Logos: compass, four_spirits, realm_peak, shield_knot, triquetra, wayfinder, winged_blade, world_tree.
    - Wordmarks: engraved, highland.
    - Home pages: northern_crown, rune_columns ("glowing runes on the sides"), rune_frame ("the teal runes").
  - Feedback:
    1. Logos: iterate on the picked ones. More elaborate, more features; try fractal-like and other complexity; offer several complexity levels. **All logos light glowing teal.**
    2. Wordmarks: iterate on the picked ones, more elaborate; work in an amazing war axe. **All wordmarks gold.**
    3. Inspiration links (Norse tattoo / Jörmungandr dragon knotwork). Claude could not open the 2 it tried: one is blocked by the site, the other is an image file the fetch tool can't read.
    4. Home page: combine the 3 picked looks. Add runic/background designs, e.g. a knotwork tile border (from the dragon image) around the New Game / Returning Player buttons. Use a font like the wordmarks'.
  - **Answers (Oct 2):**
    - Images: received Oct 2 (9 attached). What they show, as style reference only (nothing copied):
      - Fractal world trees inside rune rings.
      - Angular meander / key borders, and pillars with spear tips.
      - Braided knotwork rings.
      - A knot-winged dragon and a knot-bodied serpent.
      - A triquetra over a tree in a rune-band frame.
      - Stave compasses in rune rings guarded by twin dragon heads.
      - Crossed war axes, and hammer shapes with knot fill.
      - One image contains a valknut; we do not use that symbol.
    - Logos: the 8 picks × 3 complexity levels (elaborate / ornate / fractal) + 8 new ones mixing the picks and adding a Norse dragon ring. About 32 cards, all teal.
    - Wordmarks: iterate on engraved + highland, more elaborate, with a war axe, all gold. Count not asked; plan about 10.
    - Home pages: 6 combined variants. All share top aurora + glowing side rune columns + teal rune frame + knotwork borders on the buttons, with a wordmark-style font. They differ in border style, background pattern and how much moves.
- **Round 12 (Kris, Oct 2): third brand pass + boss HP ×2 + waystone travel bug. Built Oct 2 — changelog [200]–[204], game v19, Lab v20. Waiting for Kris: pick a logo, a Ringed Z typeface and a World Tree Veil version in the Lab; confirm waystone travel now works in real play.**
  - Kris's message:
    1. Logos: not there yet. Keep the ones he picked as a **2nd tier** (used in different places). Make **20 more**, based on the 9 images and on elements of the picks. Denser and more elaborate is fine. **No fractal route.**
    2. Wordmarks: **winner = Ringed Z** (`ring_z`). The font may change: show it in **10 different, unique fonts**.
    3. Home page: pick is good (**World Tree Veil**, `tree_veil`); iterate after 1 and 2.
    4. **Boss hit points ×2.**
    5. **Waystones:** only the first one works; travelling to another leaves you in the same place.
  - Lab picks read Oct 2 (second pass): logos `crossed_axes` ("this is the best one so far"), `blade_b`, `way_b`, `tree_c`; wordmark `ring_z`; home `tree_veil`. First-pass picks unchanged.
  - Waystone finding (before any fix): travel itself works in tests. At some waystones [Tab] does not open the travel map because a fairy hovering there takes the key press (the fairy wins when you stand closer to it than to the stone; you arrive 2 tiles below the stone). Seen at Amphitheatre, Lantern Lilies, Wisp Cattails.
  - **Questions asked Oct 2 (question card):**
    1. Boss HP ×2 — which fights? (bosses only / also elites and guardians)
    2. Waystones — what do you see when it fails? (fairy talks or nothing opens / map opens but clicking does nothing / other)
    3. Logos — how to split the 20? (one per image + rest built on Crossed Axes and picks / mostly image-based / mostly Crossed Axes variations). Note: we draw our own version of each image's layout and motifs; we don't trace someone's artwork.
  - **Answers (Oct 2):**
    1. Boss HP ×2: **all bosses** (dungeon, tower, castle, mage tower, island, volcano). Elites and familiar guardians stay as they are.
    2. Waystones: Kris's words — "the travel map opens, but when you teleport, you don't actually move to a different place. but also fix the fairy issue". So two fixes: the teleport itself, and the fairy taking [Tab].
    3. Logos: **9 + 11** — one per picture (our own drawing of its layout and motifs), plus 11 building on Crossed Axes and the other picks, denser. No fractals.
## Why questions got asked twice (diagnosed Sept 30)
- Transcript evidence: the question card went out at 14:55. No answer ever reached the session. At 15:13 Kris's original message was delivered again (the app re-queued it after the session restarted or reconnected), and the fresh run asked the same questions again.
- A question card is tied to the running session. If that session restarts or reconnects while the card is open (the connected services dropped and came back at the same moment), the answer has nowhere to go and is lost. A normal chat message is queued and survives a restart.
- Rules from now on:
  1. Record answers here and in project memory immediately.
  2. Before asking anything, check this doc for answers already given.
  3. Before showing a question card, write the questions under **Open questions** below so a restarted session knows they were already asked.
  4. For long question sets, prefer the Lab (answers are saved in its database) or a plain chat message.

## Brand: final picks (Kris, Oct 2, read from the Lab)
- **Logo: `tree_c` (World Tree · Fractal).** Kris: "this is the best, let's use this for the logo." Sizes to redo:
  - Full: as it is.
  - Medium: just the tree and the rune ring.
  - Small: just the tree with the circles and the dots.
  - Icon: just the tree.
- **Wordmark: `ring_z` (Ringed Z) in its original typeface, Cinzel Decorative.** Kris: "this is the one to use." None of the 10 alternative typefaces was picked.
- **Home page: `veil_a` (World Tree Veil · as picked).**
- **Second-tier logos** ("cool and can be used for later, but not the logo"): `crossed_axes`, `axes_serpent`, `axes_tree`, `blade_b`, `serpent_coil`, `way_b`, `way_compass`. The first-round picks were un-picked.
- **Built Oct 2 (round 13, changelog [205]–[212], game v20, Lab v21):** the three smaller logo sizes, `ZBrand.TIER2`, the Next.js home page at `/` (game at `/play`, Lab at `/lab`), the in-game title and loading screen, the browser-tab icon.
- **Proposed places for the second-tier logos (not built; waiting for Kris's yes / changes):**
  - `way_b` Wayfinder · Knotwork → header of the waystone travel map and the flash when a waystone is activated.
  - `way_compass` Wayfinder Compass → compass rose on the world map.
  - `crossed_axes` Crossed Axes → boss title cards and the victory banner; the armoury and forge signs.
  - `axes_serpent` Axes & Serpent Ring → emblem beside the boss health bar; the Volcano quest screens.
  - `axes_tree` Axes & World Tree → save-slot / player screen and the Adventurers' Guild.
  - `blade_b` Winged Blade · Knotwork → level-up and "new skill learned" banners.
  - `serpent_coil` Coiled Serpent → the death screen, and the harbour / ferry screens.

## Open questions
- None open. Still waiting on Kris's check of waystone travel in real play.

## Fixed decisions (already made by Kris)
- **Keep the AI-painted hero sprite.** All NPCs, monsters, animals and familiars are redrawn to match it (track E).
- **Git + Vercel:** prepared Oct 1 (Kris's go-ahead). The local main is about 21 commits ahead of GitHub; Kris pushes, then imports into Vercel.
- **Selector pages** are required for: towers (10 walkable designs), open-dungeon layouts (10), world quadrants (10 × 4), and sprites (~5 options per character).

## Tracks
A Foundation · B Bugs & core mechanics (Kris's items 1–5 + review) · C Dungeons & towers (6–8) · D World visuals (9) · E Characters & sprites (11) · F Story · G Feel & platform · H New ideas (10)

## Phases (effort estimates)
| Phase | Scope | Panels | Est. sessions |
|---|---|---|---|
| 0 Decide | Work through the board | all | — |
| 1 Foundation & fixes | module split, shared playground engine, save migration; pause, familiars, spells on X, auto-dismount, boss arenas, death flow, text fixes, dead code | A1–A3, B1–B6, B8, B9 | 4–6 |
| 2 Selector pages | "Design Lab" hub: Tower, Dungeon, World and Sprite pilot tabs, built on the shared playground | C1, C3, D1, E1, E2 pilot | 5–8 |
| 3 Integrate picks | chosen towers, dungeon types and quadrant designs into the game; rendering upgrades; landmarks; runic glow | C2, C4, D2–D4, H13, H14 | 5–8 |
| 4 Characters | sprite waves region by region, animation sets, mount riders, buildings/props | E2–E5 | 8–12 |
| 5 Systems & story | elements, story spine, rescues, ending/NG+, bounties, approved ideas | B7, F1–F4, H* | 5–8 |
| 6 Feel & ship | audio, touch, tutorial, save slots, difficulty, then git/Vercel | G1–G6 | 3–4 |

Rough total if everything is approved: 36–54 sessions (est.).

## Root causes found for Kris's bug list (from code, Sept 2026)
1. **Pause** — `_anyModalOpen()` knows only 7 modal IDs. It misses the slot picker, the N quick-pick, the item popup and the stats/region panels. The Cave, Sky and Building scenes never check it. Gameplay keys still fire during menus, and buffs tick on `Date.now`.
2. **Familiars** — they work, but damage is flat (5–22 every 2.5–5 s) while monster HP scales +8%/level. There are only 2 behaviours. `_familiarAttack` in WorldScene is dead duplicate code.
3. **Spells** — `keydown-X` is bound only on the World scene's keyboard. World sleeps in every sub-scene, so X does nothing there. `_castSpell` only targets overworld monsters, and no sub-scene has spell code.
4. **Mounts** — `_heroAnimate` draws the horse-rider sprite whenever `ps.mount==='horse'`, including inside sub-scenes.
5. **Dungeon bosses** — the boss spawns 2 tiles right of the boss chest on the last floor, which can be inside a wall on some layouts (suspected; confirm in a playtest). The replay check uses the site id. The boss mapping in code differs from the docs (dungeon s3/s4 = rock_dragon/lava_titan; tower s3/s4 = iron_sentinel/shadow_lord).
