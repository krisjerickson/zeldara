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

## Fixed decisions (already made by Kris)
- **Keep the AI-painted hero sprite.** All NPCs, monsters, animals and familiars are redrawn to match it (track E).
- **Git + Vercel parked** until the overhaul is stable (panel G6). The repo is prepared locally, with one commit not yet pushed.
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
