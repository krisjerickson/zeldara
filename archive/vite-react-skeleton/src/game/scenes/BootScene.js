import Phaser from 'phaser';
import { TILE, T, TILE_COLORS } from '../constants.js';
import { HERO_WALK_FRAMES } from '../sprites/heroWalkFrames.js';

export class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  preload() {
    // Loading bar
    const w = this.scale.width, h = this.scale.height;
    const bar = this.add.rectangle(w/2 - 200, h/2, 0, 24, 0x00f5ff);
    const border = this.add.rectangle(w/2, h/2, 404, 28).setStrokeStyle(2, 0x00f5ff);
    this.add.text(w/2, h/2 - 40, 'QUESTS OF ZELDARA', {
      fontSize: '28px', color: '#ffffff', fontFamily: 'Segoe UI',
    }).setOrigin(0.5);
    this.add.text(w/2, h/2 + 40, 'Generating World...', {
      fontSize: '14px', color: '#aaccff', fontFamily: 'Segoe UI',
    }).setOrigin(0.5);
    this.load.on('progress', v => bar.setSize(400 * v, 24).setPosition(w/2 - 200 + (400*v)/2, h/2));
  }

  create() {
    this._generateTileTextures();
    this._generateSiteTextures();

    // Hero walk frames — inlined base64 data URIs (see sprites/heroWalkFrames.js).
    // We register them via `TextureManager.addBase64` rather than `load.image`
    // because Phaser 3.60's file loader paths through XHR for `data:` URIs and
    // can stall on file:// or in some sandboxed contexts. `addBase64` skips
    // the loader entirely, decoding via a real <img> element instead — the
    // texture is ready a tick later (Player tolerates the brief absence by
    // starting on the placeholder and swapping textures every frame).
    HERO_WALK_FRAMES.forEach((uri, i) => {
      this.textures.addBase64(`hero_walk_${i}`, uri);
    });

    this.scene.start('World');
  }

  // Generate all tile textures procedurally
  _generateTileTextures() {
    const g = this.add.graphics();
    const ts = TILE;

    const tileKeys = Object.keys(T).map(k => ({ key: k, val: T[k] }));

    tileKeys.forEach(({ key, val }) => {
      const col = TILE_COLORS[val] ?? 0x333333;
      g.clear();

      // Base fill
      g.fillStyle(col, 1);
      g.fillRect(0, 0, ts, ts);

      // Tile-specific details
      this._addTileDetail(g, val, col, ts);
      g.generateTexture('tile_' + val, ts, ts);
    });

    // Unknown tile fallback
    g.clear();
    g.fillStyle(0x222222).fillRect(0, 0, ts, ts);
    g.generateTexture('tile_unknown', ts, ts);

    g.destroy();
  }

  _addTileDetail(g, tileType, baseCol, ts) {
    const dkCol = this._darken(baseCol, 0.7);
    const ltCol = this._lighten(baseCol, 1.4);

    switch (tileType) {
      case T.GRASS: case T.GRASS2: {
        // Grass tufts
        g.fillStyle(ltCol, 0.4);
        [[4,8],[14,5],[22,12],[8,20],[18,18],[26,6]].forEach(([x,y]) => g.fillRect(x,y,2,4));
        break;
      }
      case T.TREE: {
        // Dark green tree
        g.fillStyle(0x0d3a06, 1);
        g.fillTriangle(ts/2, 2, 2, ts-4, ts-2, ts-4);
        g.fillRect(ts/2 - 3, ts-6, 6, 6);
        break;
      }
      case T.ROCK: {
        g.fillStyle(ltCol, 0.6);
        g.fillRect(6, 8, 12, 10);
        g.fillStyle(dkCol, 0.6);
        g.fillRect(6, 16, 12, 2);
        break;
      }
      case T.PATH: case T.DIRT: {
        g.fillStyle(dkCol, 0.3);
        [[2,4],[10,14],[20,8],[24,20],[6,24]].forEach(([x,y]) => g.fillRect(x,y,3,2));
        break;
      }
      case T.SHALLOW_WATER: {
        g.fillStyle(0x80c0ff, 0.35);
        g.fillRect(0, ts*0.3, ts, 4);
        g.fillRect(0, ts*0.6, ts, 3);
        break;
      }
      case T.DEEP_WATER: {
        g.fillStyle(0x082060, 0.5);
        g.fillRect(0, ts*0.35, ts, 5);
        g.fillRect(0, ts*0.65, ts, 4);
        g.fillStyle(0x3070e0, 0.2);
        g.fillRect(4, ts*0.2, ts-8, 3);
        break;
      }
      case T.DEEP_RIVER: case T.MAGMA_RIVER: {
        const wc = tileType === T.MAGMA_RIVER ? 0xff6600 : 0x4499ff;
        g.fillStyle(wc, 0.3);
        [0.2, 0.45, 0.7].forEach(fy => g.fillRect(0, fy*ts, ts, 4));
        break;
      }
      case T.BOULDER_WALL: {
        g.fillStyle(ltCol, 0.4);
        g.fillRect(4, 4, 10, 8); g.fillRect(16, 8, 10, 9);
        g.fillRect(2, 16, 12, 9); g.fillRect(16, 20, 10, 8);
        g.fillStyle(dkCol, 0.5);
        g.fillRect(4, 11, 10, 2); g.fillRect(16, 16, 10, 2);
        break;
      }
      case T.THIN_MAGMA: {
        g.fillStyle(0xff8800, 0.45);
        g.fillRect(0, ts*0.3, ts, 5);
        g.fillRect(0, ts*0.6, ts, 4);
        g.fillStyle(0xffcc00, 0.3);
        [ts*0.2, ts*0.55, ts*0.8].forEach(fy => g.fillRect(4, fy, ts-8, 2));
        break;
      }
      case T.DEEP_MAGMA: {
        g.fillStyle(0xcc0000, 0.5);
        [0.2, 0.45, 0.65].forEach(fy => g.fillRect(0, fy*ts, ts, 5));
        g.fillStyle(0xff4400, 0.3);
        g.fillRect(4, ts*0.3, ts-8, 3);
        break;
      }
      case T.LARGE_BOULDER: {
        g.fillStyle(dkCol, 0.7);
        g.fillRect(3, 6, 24, 20);
        g.fillStyle(ltCol, 0.5);
        g.fillRect(4, 7, 10, 8);
        g.fillStyle(dkCol, 0.9);
        g.fillRect(3, 24, 24, 2);
        break;
      }
      case T.BUILDING_WALL: {
        g.fillStyle(dkCol, 0.5);
        for (let bx = 0; bx < 2; bx++) for (let by = 0; by < 3; by++) {
          g.fillRect(2 + bx*15, 3 + by*10, 12, 8);
        }
        break;
      }
      case T.DOOR: {
        g.fillStyle(0x3a2008, 1);
        g.fillRect(8, 0, 16, ts);
        g.fillStyle(0xcc8830, 0.8);
        g.fillRect(8, 0, 16, ts);
        g.fillStyle(0xffcc44, 1);
        g.fillCircle(20, ts/2, 2);
        break;
      }
      case T.SMALL_BOULDER: {
        g.fillStyle(ltCol, 0.5);
        g.fillRect(8, 10, 14, 10);
        g.fillStyle(dkCol, 0.5);
        g.fillRect(8, 19, 14, 2);
        break;
      }
      case T.OBSIDIAN: {
        g.fillStyle(0x330022, 0.6);
        g.fillRect(3, 3, 24, 24);
        g.fillStyle(0x8844aa, 0.3);
        g.fillRect(5, 5, 8, 8);
        break;
      }
      case T.VILLAGE_FLOOR: case T.STONE_FLOOR: {
        g.fillStyle(dkCol, 0.2);
        g.fillRect(0, 0, ts/2, ts/2);
        g.fillRect(ts/2, ts/2, ts/2, ts/2);
        g.lineStyle(1, dkCol, 0.15);
        g.strokeRect(0, 0, ts/2, ts/2);
        g.strokeRect(ts/2, 0, ts/2, ts/2);
        g.strokeRect(0, ts/2, ts/2, ts/2);
        g.strokeRect(ts/2, ts/2, ts/2, ts/2);
        break;
      }
      case T.STABLES_FLOOR: {
        g.fillStyle(0x8a6030, 0.3);
        for (let i = 0; i < 4; i++) g.fillRect(0, i*8, ts, 2);
        break;
      }
      case T.BRIDGE: {
        g.fillStyle(0x6a4010, 0.7);
        g.fillRect(4, 0, 6, ts); g.fillRect(20, 0, 6, ts);
        g.fillStyle(0x9a6020, 0.5);
        [4,12,20,28].forEach(fy => g.fillRect(0, fy, ts, 3));
        break;
      }
      case T.FLOWER: {
        g.fillStyle(0xffee44, 0.7);
        g.fillCircle(8, 10, 3);
        g.fillStyle(0xff88cc, 0.7);
        g.fillCircle(20, 20, 3);
        g.fillStyle(0xffffff, 0.7);
        g.fillCircle(24, 8, 2);
        break;
      }
    }
  }

  _generateSiteTextures() {
    const g = this.add.graphics();
    const ts = TILE * 3; // sites are 3x3

    const siteColors = {
      dungeon: 0x2a1a40, tower: 0x1a2a40, camp: 0x3a2a10,
      harbor: 0x0a2a50, skyport: 0x102040,
    };
    const siteEmoji = { dungeon:'⚔', tower:'🗼', camp:'⛺', harbor:'⚓', skyport:'🎈' };

    Object.entries(siteColors).forEach(([type, col]) => {
      g.clear();
      g.fillStyle(col, 1).fillRect(0, 0, ts, ts);
      g.fillStyle(0x8877cc, 0.3).fillRect(2, 2, ts-4, ts-4);
      g.lineStyle(2, 0x8877cc, 0.6).strokeRect(2, 2, ts-4, ts-4);
      g.generateTexture(`site_${type}`, ts, ts);
    });
    g.destroy();
  }

  _darken(hex, factor) {
    const r = ((hex >> 16) & 0xff) * factor;
    const g = ((hex >>  8) & 0xff) * factor;
    const b = ( hex        & 0xff) * factor;
    return (Math.floor(r) << 16) | (Math.floor(g) << 8) | Math.floor(b);
  }
  _lighten(hex, factor) {
    const r = Math.min(255, ((hex >> 16) & 0xff) * factor);
    const g = Math.min(255, ((hex >>  8) & 0xff) * factor);
    const b = Math.min(255, ( hex        & 0xff) * factor);
    return (Math.floor(r) << 16) | (Math.floor(g) << 8) | Math.floor(b);
  }
}
