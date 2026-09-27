# 02 — Scenes & Hero API

## The scene registry

Registered in `new Phaser.Game({ scene: [...] })` near the bottom of the inline script:

```
[TitleScene, BootScene, WorldScene, BuildingScene, DungeonScene, IslandScene,
 CaveScene, SkyScene, VolcanoMazeScene, VolcanoBulletHellScene,
 VolcanoPuzzleScene, VolcanoEscapeScene, VolcanoBossRushScene]
```

Any new scene MUST be added here or `scene.launch(key)` silently no-ops (soft-lock).

| Scene | Key | Purpose |
|---|---|---|
| TitleScene | `'Title'` | Main menu (New Game / Continue). Adds `.bars-hidden` to body. |
| BootScene | `'Boot'` | Generates world, starts World. |
| WorldScene | `'World'` | Overworld — the hub scene. Persists via sleep/wake. |
| BuildingScene | `'Building'` | Interior of tavern/shop/etc. Movement + NPC interact. |
| DungeonScene | `'Dungeon'` | Top-down procedural dungeon (multi-floor). Also used for towers via `theme`. |
| IslandScene | `'Island'` | Harbor adventure island. Similar to World but with own monsters. |
| CaveScene | `'Cave'` | Side-scroller platformer with jump/gravity. Used inside island adventures. |
| SkyScene | `'Sky'` | Top-down shmup mini-game at sky ports. Plane vs waves + city HP defense. |
| VolcanoMazeScene | `'VolcanoMaze'` | Mini-volcano N — lava-floor maze. Ember Key. |
| VolcanoBulletHellScene | `'VolcanoBulletHell'` | Mini-volcano E — vertical climb bullet-hell. Magma Key. |
| VolcanoPuzzleScene | `'VolcanoPuzzle'` | Mini-volcano S — Sokoban obsidian block puzzle. Obsidian Key. |
| VolcanoEscapeScene | `'VolcanoEscape'` | Mini-volcano W — lava-rising escape room. Ashfire Key. |
| VolcanoBossRushScene | `'VolcanoBossRush'` | Final boss — 10-wave gauntlet culminating in Volcano Lord. |

## Canonical enter/exit pattern

**Entering a sub-scene** from WorldScene (in `_interactSite` or equivalent):
```js
this.scene.sleep('World');
this.scene.launch('<SceneKey>', { site: site, worldScene: this, /* other data */ });
document.getElementById('hud').style.display = 'none';         // hide main HUD
document.getElementById('dungeon-hud').style.display = 'block'; // show sub HUD (optional)
```

**Exiting a sub-scene** back to World (canonical, from `DungeonScene._exitToWorld`):
```js
_exitToWorld(reward) {
  var ws = this.worldScene;
  // (optional) apply rewards, update ps.completedQuests, etc.
  this.scene.stop('<SceneKey>');
  this.scene.wake(this._returnScene || 'World');
  document.getElementById('hud').style.display = '';       // ← RESTORE main HUD
  document.getElementById('dungeon-hud').style.display = 'none';
  if (ws) ws._emitUI();                                    // ← REFRESH UI
}
```

**Failure to restore `#hud`** on exit was the volcano soft-lock bug (fixed in session #65).

## Safety-ESC pattern

`_attachSafetyEscape(scene)` and `_showSceneError(scene, err)` are called at the top of every volcano
scene's `create()`. **In the Jun 9 build they were referenced but never defined**, so all 5 volcano scenes
threw on entry and the endgame was unreachable. Phase 1 defines them in `src/js/09-hero-core.js`:

- `_attachSafetyEscape(scene)` binds the scene's Esc to `scene._exitToWorld()` (falls back to a forced
  return: hide `#dungeon-hud`, show `#hud`, stop scene, wake World).
- `_showSceneError(scene, err)` shows a DOM banner (`#scene-error-banner`, pauses the game) with a
  "Return to the world" button.
- The global key handler only intercepts Esc while a menu is open, so Esc closes menus first and
  otherwise reaches the scene.

## Hero API (shared global helpers)

Defined near the top of the inline script, right after the frame consts. Every scene calls these instead of re-implementing player behaviour.

### Sprite + animation

- **`_heroRegisterTextures(scene)`** — Load all walk/attack/bow/horse textures via `TextureManager.addBase64`. Idempotent (checks `textures.exists` first). Call in scene create() before adding sprites.
- **`_heroAddSprite(scene, container, feetY)`** — Add a feet-anchored (`origin 0.5, 1`) hero `Phaser.Image` to a container. Default display size 25×42. Returns the image.
- **`_heroNewState(initialDir)`** — Fresh walk-state object `{ dir, _walkFrame, _walkTimer, _wasMoving, _lastSet }`. One per scene, per player.
- **`_heroAnimate(scene, sprite, st, vx, vy, dt, atkTimer, bowTimer)`** — Main per-frame call. Picks the correct sprite set based on:
  - `atkTimer > 0` → attack overlay (7-frame swing)
  - `bowTimer > 0` → bow overlay (10-frame draw)
  - mounted on `horse` → horse-rider sprites (35×58, scale 1.4×)
  - else → walk cycle. Direction is chosen from `st.dir`:
    - `left`/`right` → side-walk (side_1..7, mirrored for left)
    - `up` → back (back_1..3)
    - `down` (or default) → front (front_3..7, skipping stationary front_0-2)
    - Idle: snap to per-direction frame 0.

### Direction + geometry

- **`_heroDirFromVel(vx, vy, prevDir)`** — 4-cardinal facing from velocity (`vx<0`→left, `vx>0`→right, `vy<0`→up, `vy>0`→down; keeps prev on 0,0).
- **`_heroInArc(dir, dx, dy)`** — 120° cone hit-test (±60° from facing). Used for melee swing damage gating.

### Bow (CTRL) + projectiles

- **`_fireSceneBow(scene, mode)`** — Fire a bow shot in `'dungeon'` or `'island'` mode. Reads weapon/ammo from `worldScene.playerState`, sets `scene.playerAtkTimer` + `scene.pBowTimer` (or `iBowTimer` on island), spawns projectile. Called from the global CTRL handler which dispatches by active scene.
- **`_heroUpdateProjs(scene, mode, dt)`** — Move player arrows each frame, wall-collide in `'dungeon'` mode, damage on monster hit.

### Shield (SHIFT hold)

- **`_heroShieldTick(scene, x, y)`** — Called each frame in combat scenes. Reads `scene.keys.SHIFT.isDown`, sets `scene._shielding`, draws/hides `_shieldRing`.
- **`_heroApplyShield(scene, ps, rawDmg, x, y)`** — Wrap incoming damage. Returns 0 on full block (15% + 2%/DEF chance), or `rawDmg * 0.75` on passive reduction, or `rawDmg` if not shielding.
- **`_heroShieldFlash(scene, x, y, fullBlock)`** — VFX helper for shield hits.

### Familiars v2 (Phase 1 · B2) — `09-hero-core.js`

- Numbers + text live in `FAMILIAR_ABILITIES` (single source for combat AND the info pop-up).
- Damage scales `×(1 + 0.12·(level−1))`. Up to `_maxFamiliarSlots(ps)` familiars active (slots
  `familiar`, `familiar2`, `familiar3`).

| Familiar | Ability | Effect |
|---|---|---|
| 🪲 Firefly | Ember Spark (2.5 s, 260 px) | homing ember + burn 3 s; dungeon sight radius 7 → 10 tiles |
| 🌀 Wind Sprite | Gale Burst (4 s, r 95) | AoE damage, knockback 70 px (wall-aware), delays next attack |
| 🐡 Sea Sprite | Tide Ward (20 s) | bubble refunds the next hit taken; heals 1.5% max HP every 3 s |
| 🦉 Storm Hawk | Chain Lightning (3 s, 280 px) | bolt + 2 chain jumps at 70% |
| ❄️ Frost Wisp | Frost Nova (5 s, r 100) | AoE damage + 50% slow for 3 s |

- Wind Sprite is now obtainable: first NE sky-port clear (it was never awarded before).
- `showFamiliarInfo(fid)` opens the pop-up; `_familiarCardHTML(fid, ps, onclick, withInfoBtn)` renders a
  card (inventory footer + N picker); `_toggleFamiliar(fid)` is slot-aware equip/unequip.
- **Do not call `_heroFamiliarsTick` from a scene** — `_heroUpkeep` drives it (see below).

### Buffs

- **`_heroBuffActive(ps, key)`** — `true` if `ps.buffs[key] > Date.now()`.
- **`_heroBuffApply(ps, key, durMs)`** — Add/refresh a buff (Date.now-based, ticks in real time regardless of pause).
- **`_heroBuffRandom(ps, durMs)`** — Pick one of `atkUp / defUp / spdUp` at random and apply.
- **`_heroBuffMult(ps, key)`** — Returns `1.25` if active, else `1.0`. Wired into `calcPlayerStats` (atkUp, defUp) and `baseSpd` movement formula (spdUp).

### Volcano quest helpers

- **`_finalQuestUnlocked(ps)`** — `true` if all 4 section dungeon bosses are dead. Used to gate the 5 volcano sites spawning in the world.
- **`_volcanoKeysHeld(ps)`** — 0-4, count of Ember/Magma/Obsidian/Ashfire keys in inventory.
- **`_hasAllVolcanoKeys(ps)`** — shortcut for `=== 4`.
- **`_volcanoKeyForSection(sec)`** — 1→volcano_key_n, 2→_e, 3→_s, 4→_w.
- **`_volcanoSiteDefs()`** — Returns the 5 volcano site descriptors (positions + types). Single source of truth.
- **`_spawnVolcanoVisuals(ws)`** — Idempotently pushes the 5 sites into `wd.sites` + creates their rectangle/icon/DOM label visuals. Called on initial WorldScene create AND from the dev-unlock button.
- **`_carveBigVolcanoTerrain(ws)`** — Carves ocean → volcano-island terrain + 4 land bridges. Uses batched `requestAnimationFrame` chunk refreshes so it never freezes a frame.

### Boss rush lockout

- **`_inBossRush()`** — `true` if `game.scene.isActive('VolcanoBossRush')`. Used to gate `_quickUsePotion` and `window._useItem` so no healing during boss rush.

## Hero Core v2 (Phase 1) — `src/js/09-hero-core.js`

Scene-agnostic helpers so a mechanic written once works in every scene.

- `_heroCtx(scene)` → `{key, ws, ps, x, y, dir, monsters}` — knows each scene's player fields
  (`px/py` Dungeon, `_px/_py` Cave, `player.x/y` elsewhere) and monster list (`worldMonsters` / `monsters` / `_mons`).
- `_heroHitMonster(scene, mon, dmg, opts)` / `_heroKillMonster(scene, mon)` — damage + float text + flash +
  hp bar + the scene's own death/reward routine.
- `_heroCastSpell(scene)` — X key everywhere. World keeps its own `_castSpell`; other scenes get projectile /
  nova / meteor / thunder-step / poison-mist spells with the same `SPELL_DATA`. Blocked indoors and in the sky.
- `_heroSlow`, `_heroBurn`, `_heroStatusTick` — status effects in any scene (World uses its native `mon._slow`).
- `_heroStowMount(scene)` / `_heroRestoreMount(ws)` — auto-dismount in Dungeon/Tower/Cave/Volcano scenes,
  remount when World or Island wakes. Island overworld keeps the mount.
- `_heroDied(scene)` — ONE death flow: fade, stop the scene (and the Island if you came from one), wake World,
  `ws._worldPlayerDied()` (village, 25% HP, −10% gold).
- `_heroUpkeep(dt)` — runs every frame from `game.events 'poststep'` for the active play scene (not while
  paused): mana regen + spell projectiles (non-World), familiars, familiar projectiles, status effects.

## Universal pause (Phase 1 · B1) — `src/js/24-pause-input.js`

- Any overlay in `PAUSE_OVERLAYS` visible ⇒ every running scene is `scene.pause()`d; resume when the last one
  closes. Detection is a `MutationObserver` on `<body>` (+ 400 ms safety poll).
- Buff end-times are pushed forward by the paused duration. Keys are reset on resume (no stuck walking).
- `_anyModalOpen()` now returns true whenever the game is paused or any overlay is open.
- **New overlay?** Give it an id and add it to `PAUSE_OVERLAYS` (and to `_closeAllOverlays` if Esc should close it).
- **All keyboard shortcuts are in one document-level handler** there: I/Q/M/B toggle their menus, N/O open the
  familiar/food pickers, Esc closes menus, and gameplay keys Ctrl/X/Z/C/P dispatch to `_activePlayScene()`.
  Don't bind these per scene.

## Scene-transition checklist (paste into every new scene PR)

- [ ] Class registered in `scene: [...]` array
- [ ] `constructor` calls `super('KeyMatchingRegistry')`
- [ ] `init(d)` stashes `worldScene`, `site`, and any other data
- [ ] `create()` starts with `this._sceneKey='...'; _attachSafetyEscape(this);` then `try {`
- [ ] `create()` body ends with `} catch(_safetyErr){ _showSceneError(_self_safety,_safetyErr); }`
- [ ] Textures registered via `_heroRegisterTextures(this)`
- [ ] Player sprite added via `_heroAddSprite(this, container, feetY)`
- [ ] Walk state via `_heroNewState(dir)`
- [ ] Each frame in `update`: call `_heroAnimate(this, sprite, st, vx, vy, dt, atkTimer, bowTimer)`
- [ ] `_exitToWorld()` restores `#hud`, hides `#dungeon-hud`, stops scene, wakes World, calls `worldScene._emitUI()`
- [ ] Global CTRL handler dispatches to this scene (if bow makes sense here) — see the `keydown-Control` listener
- [ ] If it's a combat scene: call `_heroShieldTick` and `_heroUpdateProjs` each frame. Familiars, spells, status effects and mana are automatic (`_heroUpkeep`) as long as the scene exposes its player position and monster list the way `_heroCtx` expects
- [ ] Special area (no mounts)? call `_heroStowMount(this)` at the top of `create()`
- [ ] Player death → `_heroDied(this)` (never exit with 0 HP)
- [ ] Add the scene key to `_SCENE_PRIORITY` in `24-pause-input.js` so X/Ctrl/P reach it
