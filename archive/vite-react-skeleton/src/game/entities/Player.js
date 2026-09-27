import Phaser from 'phaser';
import { TILE, T, WORLD_W, WORLD_H, ALWAYS_BLOCKED, MOUNTS, SECTIONS } from '../constants.js';
import { isTilePassable } from '../world/WorldGen.js';
import { HERO_WALK_FRAMES, HERO_WALK_FRAME_W, HERO_WALK_FRAME_H } from '../sprites/heroWalkFrames.js';

const SPD = 180;  // base pixels per second

// Walk-cycle animation: 8 frames at 8fps → one cycle per second when moving.
// Idle hops back to frame 0 and freezes.
const WALK_FPS = 8;
const WALK_FRAME_COUNT = HERO_WALK_FRAMES.length;
// Render the 64×105 chibi sprite at 24×40 in container space — preserves the
// 0.61 aspect ratio while keeping the hero ~the same on-screen footprint as
// the previous shape-based hero (22×26).
const HERO_DRAW_W = 24;
const HERO_DRAW_H = 40;
// Sprite is feet-anchored (origin y=1) so its base sits at y≈shadow center.
// Y offset compensates: shadow ellipse is at y=16, feet should land there.
const HERO_FEET_Y = 16;

export class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    // ── Visuals ──────────────────────────
    // Soft drop shadow stays — grounds the sprite and matches the original
    // 22-wide footprint so collision feel is unchanged.
    this.shadow = scene.add.ellipse(0, 16, 22, 8, 0x000000, 0.3);

    // Animated walk sprite. Starts on frame 0 (upright pose) and cycles
    // through walk_0..walk_7 while moving. flipX is toggled when dir==='left'
    // so a single forward-facing art set covers all 4 cardinal directions.
    // Textures are registered via `TextureManager.addBase64` in BootScene.create
    // and may not be decoded for the first frame or two — `update()` only
    // calls setTexture once it sees the texture is ready, so the image starts
    // on the Phaser default until then.
    this.heroSprite = scene.add.image(0, HERO_FEET_Y,
      scene.textures.exists('hero_walk_0') ? 'hero_walk_0' : '__DEFAULT');
    this.heroSprite.setOrigin(0.5, 1);
    this.heroSprite.setDisplaySize(HERO_DRAW_W, HERO_DRAW_H);
    this._walkFrame = 0;
    this._walkTimer = 0;

    this.add([this.shadow, this.heroSprite]);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    // After `physics.add.existing(this)`, `this.body` is the Phaser arcade
    // physics body (overwriting the old shape-rect alias). Hitbox stays at
    // the original 20×20 footprint so movement/collision feel is unchanged
    // by the taller sprite art.
    this.body.setSize(20, 20).setOffset(-10, -4);

    // ── Stats ────────────────────────────
    this.hp = 30; this.maxHp = 30;
    this.gold = 50; this.level = 1; this.xp = 0;
    this.dir = 'down';
    this.mount = null;        // current mount id
    this.ownedMounts = [];
    this.familiar = null;
    this.inventory = { weapons: ['sword_iron'], armor: [], potions: ['potion_sm'], misc: [] };
    this.equip = { lHand: 'sword_iron', rHand: null, shield: null, head: null, body: null };
    this.quests = { active: null, completed: [], available: [] };
    this.unlockedSections = [1];
    this.weaponMode = 'melee';

    // ── Timers ───────────────────────────
    this._atkTimer = 0;
    this._invincTimer = 0;

    // ── Input ────────────────────────────
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = scene.input.keyboard.addKeys('W,A,S,D,SPACE,SHIFT,E,I');
  }

  // Phaser arcade physics attaches the body to the container itself; the old
  // `getBody()` helper used to point at a child rect. Returning `this` keeps
  // every caller (incl. `getBody().setSize(...)` in the constructor) working.
  getBody() { return this; }

  update(dt, tiles) {
    const body = this.scene.physics.world.bodies.getArray().find(b => b.gameObject === this);
    if (!body) return;

    const spd = SPD * (this.mount ? (MOUNTS[this.mount]?.spdMult ?? 1.6) : 1.0);
    let vx = 0, vy = 0;

    const left  = this.cursors.left.isDown  || this.wasd.A.isDown;
    const right = this.cursors.right.isDown || this.wasd.D.isDown;
    const up    = this.cursors.up.isDown    || this.wasd.W.isDown;
    const down  = this.cursors.down.isDown  || this.wasd.S.isDown;

    if (left)  { vx = -spd; this.dir = 'left';  }
    if (right) { vx =  spd; this.dir = 'right'; }
    if (up)    { vy = -spd; if (!left && !right) this.dir = 'up'; }
    if (down)  { vy =  spd; if (!left && !right) this.dir = 'down'; }

    // Normalize diagonal
    if (vx !== 0 && vy !== 0) { vx *= 0.707; vy *= 0.707; }

    // Collision check before moving
    const nx = this.x + vx * dt;
    const ny = this.y + vy * dt;

    if (this._canMoveTo(nx, this.y, tiles)) this.x = nx;
    if (this._canMoveTo(this.x, ny, tiles)) this.y = ny;

    body.reset(this.x, this.y);

    // Timers
    if (this._atkTimer > 0) this._atkTimer -= dt;
    if (this._invincTimer > 0) this._invincTimer -= dt;

    // ── Sprite animation ───────────────────────────────────────────────────
    // West (left) is the only direction we mirror — north/south/east all
    // share the forward-facing art.
    this.heroSprite.setFlipX(this.dir === 'left');

    const moving = (vx !== 0 || vy !== 0);
    if (moving) {
      this._walkTimer += dt;
      const interval = 1 / WALK_FPS;
      while (this._walkTimer >= interval) {
        this._walkTimer -= interval;
        this._walkFrame = (this._walkFrame + 1) % WALK_FRAME_COUNT;
      }
    } else {
      // Idle: snap to standing pose (walk_0) and drop the timer so the next
      // step starts clean.
      this._walkFrame = 0;
      this._walkTimer = 0;
    }
    // Only swap textures once they're decoded — otherwise Phaser logs a
    // warning every frame and renders the missing-texture checkerboard.
    const key = `hero_walk_${this._walkFrame}`;
    if (this.scene.textures.exists(key)) {
      this.heroSprite.setTexture(key);
    }
  }

  _canMoveTo(nx, ny, tiles) {
    const hw = 8, hh = 6;
    const checks = [
      [nx - hw, ny - hh], [nx + hw, ny - hh],
      [nx - hw, ny + hh], [nx + hw, ny + hh],
      [nx,      ny],
    ];
    for (const [cx, cy] of checks) {
      const tx = Math.floor(cx / TILE);
      const ty = Math.floor(cy / TILE);
      if (tx < 0 || tx >= WORLD_W || ty < 0 || ty >= WORLD_H) return false;
      const tile = tiles[ty]?.[tx] ?? T.BUILDING_WALL;
      if (!isTilePassable(tile, this.mount)) return false;
    }
    return true;
  }

  currentSection() {
    const tx = Math.floor(this.x / TILE);
    for (const [id, s] of Object.entries(SECTIONS)) {
      if (tx >= s.x && tx < s.x + s.w) return parseInt(id);
    }
    return null;
  }

  // Mount state is tracked for movement-speed + tile-passability rules; the
  // visual cues (purple body tint, mount-icon label) were removed when the
  // shape-hero was replaced with the chibi walk sprite. Re-add later if a
  // mounted-hero sprite ships.
  mountHorse(mountId) {
    if (this.ownedMounts.includes(mountId) || mountId === 'horse') {
      this.mount = mountId;
    }
  }

  dismount() {
    this.mount = null;
  }

  serialize() {
    return {
      x: this.x, y: this.y, hp: this.hp, maxHp: this.maxHp,
      gold: this.gold, level: this.level, xp: this.xp,
      mount: this.mount, ownedMounts: [...this.ownedMounts],
      familiar: this.familiar, inventory: { ...this.inventory },
      equip: { ...this.equip }, quests: { ...this.quests },
      unlockedSections: [...this.unlockedSections],
      weaponMode: this.weaponMode,
    };
  }

  static deserialize(scene, data) {
    const p = new Player(scene, data.x, data.y);
    Object.assign(p, data);
    return p;
  }
}
