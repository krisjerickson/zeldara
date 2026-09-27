import { T, TILE, WORLD_W, WORLD_H, WORLD_SEED, SECTIONS, BARRIERS, VILLAGE_X, VILLAGE_Y, ALWAYS_BLOCKED } from '../constants.js';

// ─── Seeded PRNG ──────────────────────────────────────
class PRNG {
  constructor(seed) { this.s = seed >>> 0 || 1; }
  next() {
    this.s ^= this.s << 13; this.s ^= this.s >>> 17; this.s ^= this.s << 5;
    return (this.s >>> 0) / 0xFFFFFFFF;
  }
  r(a, b) { return a + this.next() * (b - a); }
  i(a, b) { return Math.floor(this.r(a, b + 1)); }
  at(x, y, freq = 1) {
    // Deterministic value for a position
    let s = (x * 1619 + y * 31337 + WORLD_SEED * 6971) >>> 0;
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return ((s >>> 0) / 0xFFFFFFFF) * freq;
  }
}

// Simple 2D value noise
function noise(x, y, scale, seed = WORLD_SEED) {
  const rng = new PRNG(seed);
  const ix = Math.floor(x / scale), iy = Math.floor(y / scale);
  const fx = (x / scale) - ix, fy = (y / scale) - iy;
  const v00 = rng.at(ix,   iy,   1);
  const v10 = rng.at(ix+1, iy,   1);
  const v01 = rng.at(ix,   iy+1, 1);
  const v11 = rng.at(ix+1, iy+1, 1);
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  return v00 + (v10-v00)*sx + (v01-v00)*sy + (v00-v10-v01+v11)*sx*sy;
}

// ─── Section terrain generators ──────────────────────
function genGrasslands(tiles, sx, sy, sw, sh, rng) {
  for (let y = sy; y < sy + sh; y++) {
    for (let x = sx; x < sx + sw; x++) {
      const n1 = noise(x, y, 8, 1);
      const n2 = noise(x, y, 3, 2);
      let t;
      if (n1 > 0.80) t = T.TREE;
      else if (n1 > 0.72) t = T.ROCK;
      else if (n2 > 0.85) t = T.FLOWER;
      else if (n2 < 0.15) t = T.DIRT;
      else if (n1 > 0.55) t = T.GRASS2;
      else t = T.GRASS;
      tiles[y][x] = t;
    }
  }
}

function genWetlands(tiles, sx, sy, sw, sh, rng) {
  for (let y = sy; y < sy + sh; y++) {
    for (let x = sx; x < sx + sw; x++) {
      const n1 = noise(x, y, 12, 10);
      const n2 = noise(x, y, 5,  11);
      let t;
      if (n1 < 0.28) t = T.DEEP_WATER;
      else if (n1 < 0.42) t = T.SHALLOW_WATER;
      else if (n1 < 0.50) t = T.REED;
      else if (n2 > 0.80) t = T.MUD;
      else if (n2 < 0.12) t = T.LILY;
      else t = T.GRASS;
      tiles[y][x] = t;
    }
  }
}

function genHighlands(tiles, sx, sy, sw, sh, rng) {
  for (let y = sy; y < sy + sh; y++) {
    for (let x = sx; x < sx + sw; x++) {
      const n1 = noise(x, y, 10, 20);
      const n2 = noise(x, y, 4,  21);
      let t;
      if (n1 > 0.78) t = T.LARGE_BOULDER;
      else if (n1 > 0.62) t = T.SMALL_BOULDER;
      else if (n2 > 0.80) t = T.GRAVEL;
      else if (n2 < 0.15) t = T.DRY_GRASS;
      else t = T.ROCKY_GROUND;
      tiles[y][x] = t;
    }
  }
}

function genAshlands(tiles, sx, sy, sw, sh, rng) {
  for (let y = sy; y < sy + sh; y++) {
    for (let x = sx; x < sx + sw; x++) {
      const n1 = noise(x, y, 11, 30);
      const n2 = noise(x, y, 5,  31);
      let t;
      if (n1 < 0.22) t = T.DEEP_MAGMA;
      else if (n1 < 0.40) t = T.THIN_MAGMA;
      else if (n2 > 0.85) t = T.OBSIDIAN;
      else if (n2 < 0.10) t = T.ASH_GROUND;
      else t = T.DARK_ROCK;
      tiles[y][x] = t;
    }
  }
}

// ─── Barrier placement ────────────────────────────────
function placeBarrier(tiles, barrier) {
  const { x, w, type } = barrier;
  let btile;
  if (type === 'river')    btile = T.DEEP_RIVER;
  else if (type === 'boulders') btile = T.BOULDER_WALL;
  else btile = T.MAGMA_RIVER;

  for (let y = 0; y < WORLD_H; y++) {
    for (let bx = x; bx < x + w; bx++) {
      tiles[y][bx] = btile;
    }
  }
}

// ─── Village placement (S1) ───────────────────────────
function placeVillage(tiles) {
  const vx = VILLAGE_X, vy = VILLAGE_Y;

  // Clear a village plaza (12x10)
  for (let dy = -5; dy <= 5; dy++) {
    for (let dx = -8; dx <= 8; dx++) {
      tiles[vy + dy][vx + dx] = T.VILLAGE_FLOOR;
    }
  }

  // Stone paths radiating from center
  for (let dx = -8; dx <= 8; dx++)  tiles[vy][vx + dx] = T.PATH;
  for (let dy = -5; dy <= 5; dy++)  tiles[vy + dy][vx] = T.PATH;

  // Buildings: position as [x offset from vx, y offset from vy, w, h, type]
  const buildings = [
    { dx: -7, dy: -5, w: 4, h: 3, type: 'tavern'     },
    { dx:  3, dy: -5, w: 4, h: 3, type: 'shop'        },
    { dx: -7, dy:  2, w: 3, h: 3, type: 'house'       },
    { dx:  4, dy:  2, w: 3, h: 3, type: 'forge'       },
    { dx: -3, dy:  3, w: 3, h: 2, type: 'guild'       },
    { dx:  0, dy: -6, w: 3, h: 2, type: 'quest_board' },
    { dx: 10, dy: -2, w: 5, h: 4, type: 'stables'     },
  ];

  buildings.forEach(b => {
    const bx = vx + b.dx, by = vy + b.dy;
    // Floor
    for (let dy = 0; dy < b.h; dy++) {
      for (let dx = 0; dx < b.w; dx++) {
        tiles[by + dy][bx + dx] = b.type === 'stables' ? T.STABLES_FLOOR : T.STONE_FLOOR;
      }
    }
    // North wall (impassable)
    for (let dx = 0; dx < b.w; dx++) tiles[by][bx + dx] = T.BUILDING_WALL;
    // East/West walls
    for (let dy = 1; dy < b.h - 1; dy++) {
      tiles[by + dy][bx] = T.BUILDING_WALL;
      tiles[by + dy][bx + b.w - 1] = T.BUILDING_WALL;
    }
    // Door in south wall center
    const doorX = bx + Math.floor(b.w / 2);
    for (let dx = 0; dx < b.w; dx++) {
      tiles[by + b.h - 1][bx + dx] = (bx + dx === doorX) ? T.DOOR : T.BUILDING_WALL;
    }
    // Store metadata (used by scene for interactions)
  });

  // Return building data for scene use
  return buildings.map(b => ({
    ...b,
    worldX: (vx + b.dx) * TILE,
    worldY: (vy + b.dy) * TILE,
  }));
}

// ─── Adventure site placement ────────────────────────
function placeSites(tiles, rng, section, sx, sw, sy, sh) {
  const sites = [];
  const types = ['dungeon', 'tower', 'camp', 'harbor', 'skyport'];
  const usedPositions = [];

  types.forEach((type, i) => {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 200) {
      attempts++;
      let tx, ty;
      if (type === 'harbor') {
        // Harbor must be near south edge (y near sy+sh-5)
        tx = sx + rng.i(8, sw - 8);
        ty = sy + sh - rng.i(3, 7);
      } else {
        tx = sx + rng.i(6, sw - 6);
        ty = sy + rng.i(6, sh - 6);
      }

      // Check not too close to village (section 1 only)
      if (section === 1) {
        const d = Math.hypot(tx - VILLAGE_X, ty - VILLAGE_Y);
        if (d < 18) continue;
      }
      // Check not too close to other sites
      const tooClose = usedPositions.some(p => Math.hypot(p.tx - tx, p.ty - ty) < 12);
      if (tooClose) continue;

      // Place 3x3 footprint
      for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
          tiles[ty + dy][tx + dx] = T.STONE_FLOOR;
        }
      }
      // North wall
      for (let dx = 0; dx < 3; dx++) tiles[ty][tx + dx] = T.BUILDING_WALL;
      // Door
      tiles[ty + 2][tx + 1] = T.DOOR;

      usedPositions.push({ tx, ty });
      sites.push({ type, section, tx, ty, worldX: tx * TILE, worldY: ty * TILE, id: `s${section}_${type}` });
      placed = true;
    }
  });
  return sites;
}

// ─── Main world generation ────────────────────────────
export function generateWorld() {
  const rng = new PRNG(WORLD_SEED);

  // Init tile array
  const tiles = Array.from({ length: WORLD_H }, () => new Uint8Array(WORLD_W));

  // Fill each section
  const s1 = SECTIONS[1], s2 = SECTIONS[2], s3 = SECTIONS[3], s4 = SECTIONS[4];
  genGrasslands(tiles, s1.x, 0, s1.w, WORLD_H, rng);
  genWetlands  (tiles, s2.x, 0, s2.w, WORLD_H, rng);
  genHighlands (tiles, s3.x, 0, s3.w, WORLD_H, rng);
  genAshlands  (tiles, s4.x, 0, s4.w, WORLD_H, rng);

  // Place barriers
  BARRIERS.forEach(b => placeBarrier(tiles, b));

  // Place village in S1
  const buildings = placeVillage(tiles);

  // Place adventure sites per section
  const allSites = [];
  [1, 2, 3, 4].forEach(sec => {
    const s = SECTIONS[sec];
    const sites = placeSites(tiles, new PRNG(WORLD_SEED + sec * 997), sec, s.x, s.w, 0, WORLD_H);
    allSites.push(...sites);
  });

  // Player spawn: just below village center
  const spawnX = (VILLAGE_X) * TILE + TILE / 2;
  const spawnY = (VILLAGE_Y + 1) * TILE + TILE / 2;

  return { tiles, buildings, sites: allSites, spawnX, spawnY, worldW: WORLD_W, worldH: WORLD_H };
}

export function isTilePassable(tile, mount = null) {
  if (ALWAYS_BLOCKED.has(tile)) return false;
  if (tile === T.DEEP_WATER && mount !== 'alligator' && mount !== 'dragon') return false;
  if (tile === T.SMALL_BOULDER && mount !== 'boar' && mount !== 'dragon') return false;
  if (tile === T.THIN_MAGMA && mount !== 'lava_unicorn' && mount !== 'dragon') return false;
  return true;
}
