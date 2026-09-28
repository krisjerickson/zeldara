# 05 — Dev Tools & Testing

## Sandbox / cheat panel

Enter via **Options** → password `agricola` → **🧪 Developer Mode**.

Every button is a plain `<button class="sb-btn" onclick="sbXxx()">` bound to a global JS function. The pattern: `_sbWs()` returns `game.scene.getScene('World')`, so any handler starts with `var ws = _sbWs(); if(!ws) return;`.

Roster (all globals, `sb*`-prefixed):

| Button | Fn | What it does |
|---|---|---|
| +1000 Gold | `sbGold` | `ps.gold += 1000` |
| Level Up | `sbLevel` | Fills XP and calls `_checkLevelUp` |
| Full HP | `sbHeal` | `ps.hp = ps.maxHp` |
| Unlock All Sections | `sbUnlockAll` | Adds sections 1-4 to `ps.unlockedSections` |
| Toggle God Mode | `sbGodMode` | Flips `ps.godMode` (skips damage checks) |
| Give Horse | `sbHorse` | Adds horse mount |
| → Village / Section 1-4 | `sbTeleport(sec)` | Teleport to quadrant center |
| Give All Items | `sbAllItems` | Fills inventory with every ITEM |
| Enable All in Shops | `sbEnableAllItems` | Removes `secReq` gates |
| Give All Spells / Food / Skills | `sbAllSpells / sbAllFood / sbAllSkills` | |
| All Mounts & Familiars | `sbAllMountsAndFamiliars` | |
| Complete All Quests | `sbCompleteQuests` | Marks every `s*_*` complete |
| Spawn All Monsters | `sbSpawnMonsters` | Nearby stress test |
| Reset Save | `sbReset` | Clears `localStorage['qoz_v2']` |
| **🌋 Unlock Volcano Quest + 4 Keys** | `sbVolcanoUnlock` | Marks 4 dungeons done, drops 4 keys, spawns volcano visuals |
| **🗺️ Reveal Map** | `sbRevealMap` | Fills `exploredGrid` |
| **→ Big Volcano** | `sbGoBigVolcano` | Teleports to SW corner volcano |
| **→ Next Mini-Volcano** | `sbGoMiniVolcano` | Cycles N→E→S→W |

## Site Lab (sandbox) — inspect every tower & dungeon
Open the sandbox (🔧, password as before) → **🧪 Site Lab**. Code: `src/js/25-site-lab.js`.
- Tabs: the 4 quadrants + Harbor islands. Cards come from the live game data (world sites built from `SITE_ROSTER`, plus `ISL_ADV`), so any site added later appears automatically. Each card: floor-1 thumbnail, ★ boss / bonus / island, floors, guardian, reward, "cleared in this save", and one chip per floor (☠ = guardian/vault floor).
- Options (remembered in localStorage `zeldara_sitelab`): Monsters All / Guardian only / None (None also opens the exit/vault), God mode, Fog of war (reveal floor / normal), Lighting on/off.
- Click a floor chip to jump straight in. An inspect bar (top-left) gives ◀ ▶ floor stepping (also `[` / `]`), ⤢ Overview (whole floor), fog, lights, monster mode (rebuilds the floor), 🧪 Lab and ⏏ Exit.
- Inspect runs never write dungeon fog into the save. Rewards still work if you claim them (it's a sandbox).
- Ember Cave (side view) opens on the chosen floor; the inspect options don't apply there.

## How to ADD a dev button (recipe)

1. Add the `<button>` markup inside `#sandbox-panel` (search "class=\"sb-btn\"" for the block).
2. Define the handler as a global function next to `sbGold`. Always start with `var ws = _sbWs(); if(!ws) return;`.
3. If it mutates player state, call `ws._emitUI(); ws._save();` at the end.
4. Show a `showNotif(...)` toast so the user sees the effect.

## Headless test suite (Phase 1) — `tests/`

Playwright + Chromium, run from the repo root after `node build.mjs`:

| File | Covers |
|---|---|
| `tests/test_phase1_core.py` | pause in world/dungeon, menu hotkeys, buff freeze, X spell in dungeon, mount stow/restore, death flow, all 5 volcano scenes load + Esc, familiar damage, info pop-up (25 checks) |
| `tests/test_boss_arenas.py` | all 8 dungeons/towers × first-clear/rematch: guardian reachable and ≤5 tiles from the portal; portal opens; claim returns to World (19 checks) |
| `tests/test_lab_walk.py` | Design Lab: every tower/dungeon builds, all walkable area reachable from the spawn, walk scene starts and the hero moves (20 designs) |
| `tests/test_phase1_saves_familiars.py` | v2 save migration + backup, pause in Cave/Sky, each familiar ability, familiar UI (16 checks) |

Setup and notes are at the top of `tests/harness.py`. The harness serves `index.html` from a fake origin,
swaps the cdnjs Phaser URL for a local copy, and sets `game.loop.smoothStep=false`: headless Chromium renders
at ~3–13 fps and with smoothing on, game time runs 5–20× slower than real time (timers look "stuck").

- `tests/test_sites_expansion.py`, `tests/test_sites_flows.py`, `tests/test_site_lab.py` — Phase 3a sites (122 floors), their flows, and the sandbox Site Lab.
- Phase 3–4: `test_village.py` (stages, doors, gates, harbour), `test_tome.py`, `test_monsters.py` (every roster monster alone in an arena — moves, attacks, projectiles reach the player; `python tests/test_monsters.py <id>` for one), `test_monster_sites.py` (80/15/5 in dungeons/towers), `test_characters.py` (NPCs, folk, mounts under the hero, familiars, all bosses, Tome), `test_lab_monsters.py`, `test_lab_chars.py`, `audit_lab_world.py`.
- Round 2: `test_round2.py` (18 checks — boss-site seal, split-once, camps + celebration, mount seat, skills not sold, 4 harbors per quadrant, a full castle run → skill learned, Time Slow + Meteor, the 12 painted interiors, Tome links, Q1 2-phase and Q4 5-phase guardians end to end).
- Round 3: `test_round3.py` (19 checks). The headless world runs at ~2–3 fps (software GL + 800 monsters + camps), so new tests poll with `until(...)` instead of fixed waits; timers (`setTimeout`) can lag by seconds.
- Sandbox: **✨ Familiars Lv 6 + 4 Slots** (`sbFairyMax`).
- Site Lab has an **Island castles** tab (all 12 castle dungeons, warden and skill on each card).
- Run them one after another (each launches its own headless Chromium); the full set takes ~1.5 h because `test_monsters.py` runs all 240.
- Real-GPU checks: the headless browser uses software GL, so frame rate and GPU-memory problems (e.g. the black-ground bug on Intel Iris Xe, [116]) only show on a real machine. A debug copy of the game can post stats (texture MB, chunks, context lost, fps) to its parent frame — append `tests/gpu_diag_snippet.html` to a copy of the build.

## Playtesting patterns

### Manual test loop
Open `index.html` (repo root) in Chrome directly. Save file, refresh Chrome (Ctrl+R). No dev server needed. Save persists in localStorage, so wipe with the **Reset Save** button between tests or via DevTools → Application → LocalStorage.

### Chrome MCP self-test (medium-effort, high-signal)
Use the Chrome MCP tools to actually run and inspect:
```
1. Start a sandbox HTTP server in the mnt/games folder:
   python3 -m http.server 8765 --bind 127.0.0.1
2. Navigate the Chrome MCP tab to http://127.0.0.1:8765/Zeldara-v4/index.html
   (or test the live Vercel deployment / a Vercel preview deployment for a branch)
3. Use javascript_tool to inspect state:
   - document.querySelector('#hud').style.display
   - game.scene.isActive('World')
   - game.scene.getScene('World').playerState
4. Use read_console_messages to catch runtime exceptions.
5. Use screenshot to verify visuals.
```
This catches HUD-visibility bugs, scene-transition hangs, and JS exceptions that don't surface via code review.

### Static self-check (near-zero cost, catches most bugs)
After every change (the build does this with `--check`):
```js
const fs = require('fs');
const html = fs.readFileSync(PATH,'utf8');
const re = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g;
for (let m; (m=re.exec(html)); ) new Function(m[1]);
console.log('✓ parses');
```
Catches all JS syntax errors. Do this before shipping any patch.

### Read-and-compare (catches structural bugs before writing)
Before writing a new scene or a new dev button, grep for the closest existing sibling and read it end-to-end. Every soft-lock bug I've shipped came from missing 1-2 lines that the canonical pattern has (e.g., `document.getElementById('hud').style.display=''` on exit).

Canonical templates:
- **New scene** → clone `DungeonScene` shape (esp. `_exitToWorld`).
- **New dev button** → clone `sbGold`.
- **New interior UI** → clone the `openMountsModal` pattern (DOM-driven, uses `toggleModal(...)`).

## Common pitfalls

0. **Keyboard shortcuts belong in `24-pause-input.js`.** Per-scene bindings only fire while that scene runs (why X never worked in dungeons). Menus must be registered in `PAUSE_OVERLAYS` or the game keeps running under them.

1. **Unescaped apostrophes in `onclick` strings.** Inline HTML like `onclick="window._foo('bar')"` inside a JS string literal will terminate the string if the outer quotes are the same. Use `"..."` outside + `'...'` inside (or `\"...\"` when generating from JS).

2. **`_atkOnlySlots` / `_defOnlySlots` in `calcPlayerStats`.** These maps EXCLUDE weapon slots from the atk/def sum. When adding a new slot, decide whether it's a weapon slot (add to `_atkOnlySlots`) or an armor/accessory (leave out).

3. **`_hud` visibility drift.** Every sub-scene enter must set `#hud` to `none` AND every exit must set it to `''`. If you forget the exit half, the main HUD is invisible when you return — looks like a crash.

4. **Scene key mismatch.** `class MyScene extends Phaser.Scene { constructor(){ super('MyScene') } }` — the key inside `super()` MUST match what you pass to `scene.launch('...')` and what you add to `game.scene:[...]`.

5. **Modal ID convention.** `_anyModalOpen()` only checks IDs starting with `modal-`. Custom overlays (like the Skyport shop) need explicit `scene.pause()` / `scene.resume()` to freeze world state.

6. **`file://` restrictions.** ES modules don't load from file://. All script tags are classic. Don't add `type="module"`.

7. **Chunked world render.** Modifying `wd.tiles[y][x]` directly won't show until you call `_refreshChunkAt(x, y)`. When bulk-modifying, dedupe by chunk key (each chunk covers 20×20 tiles).

8. **Base64 sprite HUGE bundles.** Every new sprite frame you inline adds ~13 KB to the file. Prefer reusing existing frames or resizing.

9. **Player death in a sub-scene** → always `_heroDied(this)` (09-hero-core.js).

10. **`self` inside a method** must be `var self=this` — an undefined `self` silently resolves to `window.self`.

## Testing checklist for new scenes

- [ ] Can you enter (TAB on site or dev teleport)?
- [ ] Does `#hud` hide on entry?
- [ ] Does `#dungeon-hud` show on entry (if used)?
- [ ] Does the ESC-safety exit always work (even in the error path)?
- [ ] Does normal exit restore `#hud` and hide `#dungeon-hud`?
- [ ] Does `worldScene._emitUI()` refresh HUD on exit?
- [ ] Do keys work (WASD, arrow keys, SPACE, TAB, SHIFT, CTRL if bow-enabled)?
- [ ] Do familiars orbit correctly? (if applicable)
- [ ] Does shield block work? (if applicable)
- [ ] Are you still alive when you exit (HP > 0)?
- [ ] Does the save persist across a page reload?

## Debug widgets already in the code

- `#debug-hud` — CaveScene has a `_dbgText` overlay showing live physics state (input, vy, onGround). Copy this pattern for any platformer-style scene.
- `console.error('X.create', err)` — every volcano scene now logs create errors. Check DevTools console first when something breaks.
- `showNotif(msg, col)` — global toast. Use liberally for state changes.
