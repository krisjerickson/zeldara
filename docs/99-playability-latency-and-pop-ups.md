# 99 — Playability, latency and pop-ups; the villagers' lines, batch 1 (round 143)

## Kris's asks
- Make sure the NPC lines are updated. Go on to the next round. Say whether the Flow requests are all ready.
- A full **playability, latency and pop-up** analysis, including:
  - two places showing an NPC's words at the same time;
  - the pause dialogue versus a brief line at the top. Rule: *almost everything is the pause dialogue with the NPC talking to you*. Propose when a brief line makes sense.
- A deep analysis of every notification and notification style: what each is for, and whether it distracts at important moments.
- A playability analysis of the whole game:
  - how and why it pauses you, and the friction that adds;
  - whether the rules and effects added over time still make sense together.
- Proposals on sky ports (keep or remove), the spirit-glass / metal / tray path and its hints, the sandbox, and low-cost visuals. Latency throughout.

## Done this round
- **Requests in, all processed on the PC:**
  - r142_hearth: 6 frames, playing now.
  - r142_load: 38 paintings, playing now.
  - r142_wr5: lm4_vela, lm4_bram, lm4_dunn, sc_wl_cliffs and the four lift-ride sheets. In the Lab for ✓ before they go into the world.
  - Vela's figure (crafts_4.core.f): cut and in the atlas.
- **Packer:** `scn_pack3.py` keeps a cache of each family's inputs and only repacks families that changed. This run 141 s; later runs should be much faster.
- **Flow:** `flow.py` reports 368 shot folders, 0 waiting. **All Flow requests are ready.**
- **Villager lines batch 1** (`tools/world/r143_lines.py` → `src/js/21w5-voices143.js`):
  - 412 new lines for all 34 villagers, by saga stage (1–4 = the furthest realm open, 5 = after the spirits come home).
  - Folk who arrive later only speak for stages they are present.
  - The gods, Pip and Wren speak only at stage 5. A word-boundary check makes sure no god is named before stage 5.
  - Lab tab "Villager lines (batch 1)".
- **One voice at a time** (`27za-talk143.js`, ZTALK):
  - While the dialogue box is open, the bubble by the hero and the shopkeeper's bubble are hidden, and a new line queues in the box.
  - Out of a fight (World or a building, with no foe hunting you within 12 tiles), every NPC line is said in the dialogue box, however short.
- **Loading tips:** the two contradictory tips are replaced by one true one (you wake on the Green; a tenth of your gold stays where you fell).

## Measurements
All measured on the build server in headless Chromium. Frame times there are not meaningful; use F9 on a real PC.

| What | Number |
|---|---|
| Pictures requested in the first second | 248 webp files, **82.7 MB**: every scenery page except the seasons' |
| Not needed at start | logo candidates 14.2 MB (24 pages); story frames 5.7 MB; effects 4.9 MB; cut-scene loops ≈ 3.7 MB; Asgard ≈ 1.6 MB; Surtharn ≈ 1.2 MB |
| Page load finished | 16.7 s from local disk. On a home connection, add about 13 s at 50 Mbit/s (estimate). |
| JS heap in the village | 133 MB |
| Textures | 178 at start; 208 after one site |
| Decoded memory if all 180 pages decode | ≈ 2.9 GB (16 MB per 2048² page; estimate) |
| Site entry until the floor is ready | 0.46 s (Hearthfire), 0.51 s (Sunken Courtyard), 1.19 s (Silverwood Palace). The loading screen waits at least 1.6 s. |
| Repeating timers | 85, in 62 files, some every 50–250 ms |
| Display objects in the World at the village | 1,304 |
| Page elements | 872 |
| Texture uploads while standing still (8 s profile) | ≈ 350 ms of `texImage2D`, almost all from the start-up tail. Only 11 new textures were made in those 8 s. |

## How the game talks to you (11 styles)
| Style | Pauses? | Notes |
|---|---|---|
| Dialogue box | yes | 26 direct calls, plus face-to-face "Name: “…”" lines and every villager Tab |
| Top line (`showNotif`) | no | 450 gameplay calls plus 53 in the sandbox. Fixed 2.5 s. 87 lines are longer than 14 words. |
| Loot ribbon | no | 3.2 s, at most 5 |
| Bubble by the hero | no | — |
| Shopkeeper bubble | in a shop | — |
| Floating text | no | ≈ 190 calls |
| ? panel | no | — |
| Full screens | 17 overlays plus cut-scenes | **11 don't pause:** recap, letters, fair games, echo screens, shelf, loom, photo, share, mage scene, ceremonies, banner |
| Menus and shops | yes | 19 |
| [Tab] tags | no | — |
| Minimap arrow | no | — |

- **Collisions:**
  - Bubble + dialogue box: fixed.
  - Shop bubble + dialogue: fixed.
  - Proposed: top lines over the boss bar; ceremonies over a dialogue; lines behind pause screens.
- **Notifications by kind** (classified by keyword from the first words of each call):

| Kind | Count |
|---|---|
| Status / notes | 299 |
| Warnings | 52 |
| Loot | 34 |
| How-to | 28 |
| Progress | 27 |
| System | 7 |
| Sandbox | 53 |

- **Long lines that should be speech:**
  - The 10 forge rules (Brokkr).
  - The Glimmerhall's arrival (Sólveig).
  - The horse at the stables (Hana).
  - The last saga's directions (Odin and Freya, after the end).
  - The citadel rules: whoever leads you in, but not a god, since they aren't free yet.
- **When a brief top line is right:**
  - a confirmation of what you just did;
  - a small refusal;
  - a cry in the middle of a fight or inside a site (better as words over the speaker);
  - loot, on the left ribbon.

## Playability
- **Pauses:**
  - Correct today: the dialogue box, menus, shops, cut-scenes, forge rules, death, the hearth, the dusk screen, focus loss.
  - Should pause: the 11 overlays above, and the ? panel.
- **Friction:**
  - Tab does six things.
  - Space both attacks and advances dialogue. A 250 ms guard is already in.
  - Unsolicited conversations need a rule: none during a fight, and none within 20 s of the last one.
  - The first ten minutes are an estimated 25 dialogue pages. Proposed: merge pages and add hold-Space-to-fast-forward.
- **Rules check:**
  - Healing is consistent.
  - **Death needs a check.** The death screen says "a quarter of your strength", but an older line restores full health. A tenth of your gold is dropped where you fell.
  - Fights, days and level caps are consistent.
  - Sites: the loading tips disagreed. Fixed.

## Proposals (Lab tab "Playability, latency & pop-ups", picks `play143-<id>`)
- **L1** Load paintings per family when needed; drop the Lab-only logo candidates from the game. Estimated start-up download 15–20 MB instead of 83 MB.
- **L2** Loading screen lasts as long as the load, plus a 0.3 s fade.
- **L3** One scheduler on the game clock instead of 85 timers.
- **L4** Hide decorations far off screen.
- **T1** Done this round.
- **T2** Long rules and story lines become speech.
- **T3** Top lines wait while pause screens are up.
- **T4** Boss-aware toasts.
- **T5** Reading time 1.8 s + 0.3 s a word (cap 8 s); at most 3 at once; colour by kind.
- **T6** The brief-line rule above.
- **P1** Every full screen pauses.
- **P2** One screen at a time.
- **P3** The ? pauses while open.
- **F1** Tab always does what its tag says.
- **F3** No conversation during a fight or within 20 s of the last.
- **F4** Fewer, fuller pages, and fast-forward.
- **F5** One rule, said the same everywhere.
- **G1** A Lodestar path page.
- **G2** Sólveig, Mira and Quill call you over.
- **G3** Bindstone pins.
- **G4** The Lodestar lessons spoken, not left in the ?.
- **Sky ports:**
  - keep as they are;
  - **keep as Vela's sky docks (recommended):** shorter sieges, and flights between defended docks;
  - remove them.
- **Sandbox (11):**
  - the opening in pieces; the calendar;
  - the Lodestar path; islands; landmarks;
  - every screen once; set exact stats;
  - any monster or boss; the crypt and New Game+;
  - snapshots; a performance report.
- **Visuals (10)**, each costing 1 sprite to ≤120 pooled particles:
  - far lands and skylines in the game, then the videos;
  - light pools at night; cloud shadows; seasonal weather; moving water;
  - footstep dust; dawn and dusk tint; a grade per realm;
  - lit boss arenas; more ground life.

## Tests
- `tests/test_round143.py`: 6 checks.
- `tests/test_round142.py`: 14 checks.
- `tests/test_round140.py`: 58 checks. Closes any open dialogue before the first fight, since NPC lines are now spoken in the box.
