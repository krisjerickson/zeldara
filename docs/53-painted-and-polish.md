# 53 — The last pixel art, pop-ups, the HUD, spells, arrows, sky ports (round 101)

Kris (Nov 8) asked for a deep dive into all the outdated pixel art. It covers:

- the Dev switch
- the bridge gates
- the rune-lines
- bosses
- the spirits' pop-up
- the drawn layers under the paintings
- pop-ups
- health, mana and experience ("4 different types for each … alternatives that are not [a Zelda copy]", growing with level, in the same place in every scene)
- boss bars
- spells: stronger, slower and dearer, with status effects and "X twice" to cast
- projectiles: aim first, then head-shots
- the load text
- sky ports ("places that enemies can go where you can't attack them")
- a mechanics guide

The rule was **trial it in the Lab first**. So this round ships only the fixes; everything else waits for picks in the Lab:

- the **Painted & polish** tab
- the **Mechanics guide** tab

His answers are recorded in docs/08 › Round 101:

- the bars sit top-left in every scene
- sky ports may be reworked
- paintings may be ordered once they are ✓ in the Lab
- the guide goes in the Lab now and in the game later

## 1. Fixed now (in the game)

| What | Why it showed | Fix |
|---|---|---|
| Dev panel "Painted sprites / Painted scenery" | the switches from rounds 26/30 | Removed. A stored `off` is cleared on load; `?sprites=0` / `?scenery=0` stay for tests (04f, 04h, 23). |
| **Bosses in their drawn stand-in** | A boss more than 1,500 px away fell back to its code-drawn body (`ZAtlas.rigTick`). Its painted pages were only requested near it, and a failed or slow page showed the drawn body. | Far away, its pages are fetched at once and the drawn body stays hidden. The probe showed `ba_boss_goblin_king.c` visible before the fix; after it, hidden and the page `ok` (04f). |
| 15 emoji under the painted buildings | `10-scene-world.js` drew 🍺 ⚒️ 📜 … under every building | Drawn only where the building has no painting. |
| Drawn buildings and trees after a slow load | The world starts after 12 s at most; chunks painted before the last page arrived kept the drawn stand-ins. | When `ZScn` finishes late, every live and parked chunk is painted again. The worker's caches reset through `cfg.scnV` (10c, 05c2). |
| "Village Center" under the boss bar | The world's region panel stayed up inside sites | Hidden while the World sleeps, shown on wake (10). |
| **Sky port: the formation left the screen** | The galleon that crosses the top was in `enemies` and counted as a formation member. Its `bx` was undefined, so `minX`/`maxX` became NaN and the march never turned; the formation drifted to x −388. The edge test also flipped direction every frame while past an edge. | The formation is only its own fliers. It turns by which edge it touches, steps down once, and is clamped on screen. A bot run before the fix: 0 kills in 90 s. After: 10 in about a minute, and the formation stays on screen with the galleon crossing (15). |

## 2. Recovered sound picks (Kris: "sword swing had none chosen")

Round 93 built its kept list (`ZAUD.KEPT93`) from the round-89 picks only. Everything picked in rounds 84–89 fell out of the Lab table, including what `tools/audio/pick_sounds.py` had already put in the game (`sprites/requests/sound_picks.json`). That affected 62 effects; sword swing is n2 + l4 + l6, all in the game.

- `lab/src/js/79m1-lab-sfx-recovered.js` merges three sources: what is in the game now, the earlier Lab picks (the sfxpick and sfx89 tabs), and the round-93 kept takes. Each take says where it came from.
- The 19 effects already re-picked in round 93 had their picks merged in the Lab's database (old + new). Rows with more than three ★ say so: the game rotates up to three.
- Every row shows all picked takes first, then offered takes until there are five to choose from. No effect had fewer than five, so no new takes were needed.
- Adding a fourth ★ no longer silently drops the oldest one; it asks you to un-star one first.

## 3. The survey — every place still drawn (Lab › Painted & polish › 1)

| Place | Today | Proposed | To paint |
|---|---|---|---|
| Bridge gates | rectangles, a red rope, a text sign | painted rune-gate, closed + open | 1 small sheet |
| Rune-lines | neon strokes | keep the glow; a painted rune-ribbon stamped along the path + node stones | 1 sheet |
| Spirits' / fairies' thanks | old FairyTalk box | the dialogue box (ZDLG) | — |
| Monster / world-boss bars | two rectangles, 7–8 px text | the new bars (§5) | — |
| Sky port city, clouds, shots | rectangles, blobs, circles, emoji | painted skyline strip, cloud banks (3 states), fx sheet | 3–6 |
| Status overlays (new) | — | ice shell, flames, stone cuffs, vines, sparks, bubbles, drips, void motes | 1 sheet |
| Aim marks (new) | — | rune circle, reticle | 1 sheet |
| Dungeon / tower floors | pixel tiles — the one big area still pixel | painted textures per theme. **Trial one theme first and measure** | 8 pages |
| Loot icons in messages | emoji | the inventory's painted icons | — |

**Checked and already painted:**

- all 252 roster monsters and all 259 boss designs have atlas sheets
- buildings
- scenery (only `an_*_4` tufts and `an_fish_5` are missing)
- the HUD icons

## 4. Pop-ups (§2 of the tab)

| Kind | How many | Today |
|---|---|---|
| `showNotif` toasts | 439 calls in 67 files | one look for everything |
| NPC lines inside toasts | ≈21 | — |
| FairyTalk | 12 | — |
| ZDLG | 13 | — |
| domText labels | 54 | — |

The toast calls break down as:

- 271 unclassified
- 65 warnings
- 49 loot
- 21 speech
- 13 level
- 11 quest
- 4 saves

**Looks proposed:**

- rune chip
- side ribbon
- little scrolls
- **by kind**: loot ribbon, warning chip, big centre banner for level-ups, quest banner, speech bubble, corner rune for saves

**NPC lines:** the dialogue box, a speech bubble, or chosen by length.

## 5. HUD, boss bars (§3–4)

**Health — one mark per 10 health, so the marks grow as you level** (6 at level 5 → 21 at level 20):

- teal soul-hearts: the only Zelda-like one, made ours by the teal glow and rune etching
- rune-shields
- ember lanterns
- life-vine

**Mana** (proposed: +3 per level, 50 → 107):

- glowing rune bar that grows longer
- crystal vial that grows taller
- rune-stones
- aurora arc

**Experience** (level × 100, split over 2 marks at level 1 up to 6 at level 16+):

- banners
- rune ring
- saga scroll
- star-chain

The Lab has a level slider that redraws all of them.

**Placement today:**

- the top-left panel in the world, buildings, islands and dungeons
- the sky port has its own text line
- the boss bar is at the top centre

Proposed: top-left everywhere; the sky port's ship hearts join the HUD.

**Boss bars:**

- knotwork frame with phase notches and a damage trail
- a rune-stone slab that cracks
- an aurora ribbon
- two sizes: great bosses at the bottom, elites with a small bar over the head, ordinary monsters with a thin bar only once hurt

## 6. Spells and arrows (§5–6)

**Numbers:** mana ×2, cool-down ×3 (at least 2.5 s), power ×2.5. For example, Frost Bolt goes from 8 mana / 0.8 s to 16 / 2.5 s, and Starfall from 34 / 3.2 s to 68 / 9.6 s.

**What each spell leaves:**

| Spell | Effect |
|---|---|
| Frost | Freeze 1.5 s (bosses only slowed) |
| Fire | Burn 4 s |
| Lightning | Shock |
| Ice shards | Chill (×3 → freeze) |
| Void | Hex (−30 % defence) |
| Thorns | Rooted |
| Tidal wave | Soaked (soaked + lightning ×2, soaked + frost freezes) |
| Stone spikes | Earth-bound (rooted, fliers grounded) |
| Spirit drain | Drained |
| Starfall | Starstruck |
| Arcane burst | Mark |

**How the effects show:**

- painted overlays
- tint and particles
- icons over the head
- a mix of overlays and icons

**X twice:**

- hold X: the aim mark shows
- let go: the mark stays for 2.5 s; press X to cast
- double-tap (within 0.3 s): cast at once
- Space, Esc or walking off cancels; no mana is spent until it casts

**Steering the aim:**

- locks on, swung by moving
- movement keys slide the mark
- mouse when there is one

**Arrows:**

- aim styles: steady draw (the reticle shrinks), timing pulse, or pick the zone
- hit zones: head ×2 + stagger / body / legs ×0.7 + slow; or one weak spot; or full draw = crit
- half of the missed arrows can be picked up again

## 7. Load screen (§7)

Today's text is "Generating world…" and "1200 × 1200 tiles — four regions, twelve crossings, seventeen waystones" in 9 px grey, which describes the old four quadrants. The options:

- **the runestones wake**: rune lettering with stage lines
- **a line of the story**: no spoilers
- **a tip**
- **just the rune circle**

## 8. Sky ports (§8)

Fixed (§1), plus proposals, each ✓/✕:

- hold Space to keep firing; double-tap for the charged shot
- your own clouds don't block your shots
- hit boxes at 75 %, plus an aim line
- kinder city damage: a bomb costs 10; a landing costs 60 and pushes the formation back up
- the lowest flier dives into reach
- three waves, then a guardian kept on screen
- a briefing card
- painted HUD and skyline

## 9. The mechanics guide (Lab › Mechanics guide)

31 mechanics in 6 groups:

- moving and fighting
- magic and skills
- companions and mounts
- items
- the world
- the saga

Each one lists its keys, how it works, where you get it, how it grows, and what could be better. Then 14 improvements, each ✓/✎/✕:

- one HUD
- mana grows with level
- spells as big moments
- status combos
- aimed arrows
- fair sky ports
- a realm card on the map
- which mount crosses what
- Oswin says early that the end needs the 6,000 g Sovereign staff
- one familiar screen
- gear comparison
- dig spots that sparkle
- Pia's quest pinned on the map
- this guide in the game

## 10. Kling: 15 special shots, and carried things (doc 48)

- **15 special shot types**, each placed on one picture of one montage (§9 of the tab; Kris picks five):
  - face push-in
  - dolly-zoom
  - over-the-shoulder
  - crane up
  - whip-pan
  - rack focus
  - low tilt
  - half orbit
  - slow-motion
  - crash zoom
  - through the surface
  - top-down
  - hand-held
  - parallax
  - reflection

  Once picked, each one goes into that folder's PROMPT.txt as the shot's camera.
- **Carried things stay put** (Kris on opening_zeldara_p2: the pack was handed to Zeldor, then lost in shot 6).
  - Shots 5–6 of the opening now say Zeldara puts the pack on and keeps it to the end.
  - Every prompt gained rule 6: whatever a person holds, wears or is given stays with them unless an action says so.
  - All 259 frames were scanned for hand-overs. The shard, Bram's hammer, Mira's wrench, the staff on the anvil, the Lodestar and the twin's book now say who keeps what (tools/video/lock_scenes.py).
  - 89 prompts were rewritten; folders with DONE.txt are kept.

## Files

- **Game:**
  - `src/body.html`
  - `src/js/04f-atlas.js`
  - `src/js/04h-scenery.js`
  - `src/js/05c2-world-paint-worker.js`
  - `src/js/10-scene-world.js`
  - `src/js/10c-world-render.js`
  - `src/js/15-scene-sky.js`
  - `src/js/23-sandbox.js`
- **Lab:**
  - `lab/src/js/79m1-lab-sfx-recovered.js`
  - `lab/src/js/79m2-lab-sfx93.js`
  - `lab/src/js/79q-lab-polish.js`
  - `lab/src/js/79q2-lab-guide.js`
- **Tools:**
  - `tools/video/kling.py`
  - `tools/video/lock_scenes.py`
- **Tests:**
  - `tests/test_round101.py` (15)
  - `tests/test_round30.py` (updated)
