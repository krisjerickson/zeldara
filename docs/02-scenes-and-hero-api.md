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

## Safety-ESC pattern (added session #66)

Every volcano scene now uses this in `create()` to guarantee ESC always exits, even if the rest of `create()` throws:

```js
create() {
  this._sceneKey = 'MySceneKey';
  _attachSafetyEscape(this);  // binds keydown-ESC that always wakes World
  var _self_safety = this;
  try {
    // ... normal create body ...
  } catch (_safetyErr) {
    console.error('MyScene.create', _safetyErr);
    _showSceneError(_self_safety, _safetyErr); // on-screen banner
  }
}
```

- `_attachSafetyEscape(scene)` — removes any existing ESC listener, then adds one that hides `#dungeon-hud`, shows `#hud`, stops the scene by its `_sceneKey`, wakes World, calls `worldScene._emitUI()`.
- `_showSceneError(scene, err)` — draws a red banner with the error message + "Press ESC to return to the world".

**Use this on every new sub-scene going forward.**

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

### Familiars (auto-attack + orbit)

- **`_heroFamiliarsTick(scene, dt)`** — Per-frame:
  1. Reads `worldScene.playerState.familiar/familiar2/familiar3` (up to `_maxFamiliarSlots(ps)`).
  2. Spawns/updates emoji visuals orbiting the player.
  3. Runs per-slot attack timer; on cooldown expiry calls `_heroFamiliarFire`.
  4. Ticks projectiles in `scene._famProj`, damaging monsters on hit.
- **`_heroFamiliarFire(scene, fid, fdef, playerXY, monsters)`** — Depending on `fdef.type` fires a projectile at the nearest monster or spawns an AoE pulse around the player.

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
- [ ] If it's a combat scene: call `_heroShieldTick`, `_heroFamiliarsTick`, `_heroUpdateProjs` each frame
