import Phaser from 'phaser';
import { TILE, T, TILE_COLORS, WORLD_W, WORLD_H, SECTIONS, BARRIERS, SECTION_MONSTER_LEVEL, MAIN_QUEST_KEYS } from '../constants.js';
import { generateWorld, isTilePassable } from '../world/WorldGen.js';
import { Player } from '../entities/Player.js';

const CHUNK = 20; // tiles per chunk side

export class WorldScene extends Phaser.Scene {
  constructor() { super('World'); }

  create() {
    // ── Generate the fixed world ──────────
    this.worldData = generateWorld();
    const { tiles, sites, buildings, spawnX, spawnY } = this.worldData;
    this.tiles = tiles;
    this.sites = sites;

    // ── Render world as tile chunks ───────
    this.chunkGroup = this.add.group();
    this._renderWorldChunks();

    // ── Site labels & overlays ────────────
    this._renderSites(sites);

    // ── Player ────────────────────────────
    this.player = new Player(this, spawnX, spawnY);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, WORLD_W * TILE, WORLD_H * TILE);
    this.cameras.main.setZoom(1.2);

    // ── Building labels ───────────────────
    this._renderBuildingLabels(buildings);

    // ── Section name banners (edge labels) ──
    this._renderSectionBanners();

    // ── Barrier crossing points ───────────
    this._renderBarrierInfo();

    // ── Input: map toggle ─────────────────
    this.input.keyboard.on('keydown-M', () => this.game.events.emit('toggleMap'));
    this.input.keyboard.on('keydown-I', () => this.game.events.emit('toggleInventory'));
    this.input.keyboard.on('keydown-Q', () => this.game.events.emit('toggleQuests'));
    this.input.keyboard.on('keydown-ESCAPE', () => this.game.events.emit('closeAll'));

    // ── Save/Load state ───────────────────
    this._loadSave();

    // ── Emit initial UI state ─────────────
    this._emitUI();

    // ── Section fog (covers locked sections) ──
    this.fogGroup = this.add.group();
    this._updateFog();

    // ── Depth sort ───────────────────────
    this.player.setDepth(10);
  }

  _renderWorldChunks() {
    const cw = Math.ceil(WORLD_W / CHUNK), ch = Math.ceil(WORLD_H / CHUNK);
    for (let cy = 0; cy < ch; cy++) {
      for (let cx = 0; cx < cw; cx++) {
        this._buildChunk(cx, cy);
      }
    }
  }

  _buildChunk(cx, cy) {
    const rt = this.add.renderTexture(cx * CHUNK * TILE, cy * CHUNK * TILE, CHUNK * TILE, CHUNK * TILE);
    rt.setDepth(0);

    for (let ly = 0; ly < CHUNK; ly++) {
      for (let lx = 0; lx < CHUNK; lx++) {
        const wx = cx * CHUNK + lx;
        const wy = cy * CHUNK + ly;
        if (wx >= WORLD_W || wy >= WORLD_H) continue;
        const tileVal = this.tiles[wy][wx];
        const texKey = this.textures.exists('tile_' + tileVal) ? 'tile_' + tileVal : 'tile_unknown';
        rt.stamp(texKey, 0, lx * TILE, ly * TILE);
      }
    }
    this.chunkGroup.add(rt);
  }

  _renderSites(sites) {
    this.siteLabels = [];
    sites.forEach(site => {
      // Site marker (colored rectangle)
      const gfx = this.add.graphics().setDepth(2);
      const colors = { dungeon:0x4422aa, tower:0x2244aa, camp:0xaa6622, harbor:0x224499, skyport:0x111833 };
      const col = colors[site.type] ?? 0x444444;
      gfx.fillStyle(col, 0.85).fillRect(site.tx * TILE, site.ty * TILE, TILE*3, TILE*3);
      gfx.lineStyle(2, 0xffffff, 0.4).strokeRect(site.tx * TILE, site.ty * TILE, TILE*3, TILE*3);

      // Icon label
      const icons = { dungeon:'⚔️', tower:'🗼', camp:'⛺', harbor:'⚓', skyport:'🎈' };
      const lbl = this.add.text(
        site.tx * TILE + TILE*1.5,
        site.ty * TILE + TILE*1.5,
        icons[site.type] ?? '?',
        { fontSize: '22px', fontFamily: 'serif' }
      ).setOrigin(0.5).setDepth(3);

      // Name tag
      const nameTag = this.add.text(
        site.tx * TILE + TILE*1.5,
        site.ty * TILE - 6,
        site.type.charAt(0).toUpperCase() + site.type.slice(1),
        { fontSize: '10px', color: '#ddddff', fontFamily: 'Segoe UI', stroke:'#000',strokeThickness:3 }
      ).setOrigin(0.5).setDepth(3);

      this.siteLabels.push({ site, gfx, lbl, nameTag });
    });
  }

  _renderBuildingLabels(buildings) {
    const icons = { tavern:'🍺', shop:'🏪', house:'🏠', forge:'⚒️', guild:'📜', quest_board:'📋', stables:'🐎' };
    buildings.forEach(b => {
      this.add.text(
        b.worldX + (b.w * TILE) / 2,
        b.worldY - 6,
        (icons[b.type] ?? '🏛') + ' ' + b.type.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()),
        { fontSize: '9px', color: '#ffffcc', fontFamily: 'Segoe UI', stroke: '#000', strokeThickness: 3 }
      ).setOrigin(0.5).setDepth(5);
    });
  }

  _renderSectionBanners() {
    Object.entries(SECTIONS).forEach(([id, s]) => {
      const cx = (s.x + s.w / 2) * TILE;
      const cy = 18;
      const bgColors = { 1: 0x1a3a1a, 2: 0x0a1a3a, 3: 0x2a2010, 4: 0x2a0a00 };
      const txtColors = { 1: '#aaffaa', 2: '#aaccff', 3: '#ffddaa', 4: '#ffaa88' };
      const bg = this.add.rectangle(cx, cy, s.w * TILE - 20, 22, bgColors[id] ?? 0x222222, 0.7).setDepth(8);
      this.add.text(cx, cy,
        `Section ${id}: ${s.name}`,
        { fontSize: '11px', color: txtColors[id] ?? '#ffffff', fontFamily: 'Segoe UI', fontStyle: 'bold' }
      ).setOrigin(0.5).setDepth(9);
    });
  }

  _renderBarrierInfo() {
    BARRIERS.forEach(b => {
      const cx = (b.x + b.w / 2) * TILE;
      const cy = WORLD_H * TILE / 2;
      const labels = { river: '🌊 Deep River\n(Bridge needed)', boulders: '🪨 Boulder Wall\n(Elevator needed)', magma: '🌋 Magma River\n(Metal bridge needed)' };
      this.add.text(cx, cy, labels[b.type] ?? '???', {
        fontSize: '9px', color: '#ffffff', fontFamily: 'Segoe UI',
        align: 'center', stroke: '#000', strokeThickness: 3,
      }).setOrigin(0.5).setDepth(8);
    });
  }

  _updateFog() {
    this.fogGroup.clear(true, true);
    const unlockedSections = this.player?.unlockedSections ?? [1];
    Object.entries(SECTIONS).forEach(([id, s]) => {
      if (!unlockedSections.includes(parseInt(id))) {
        const fog = this.add.rectangle(
          s.x * TILE + (s.w * TILE) / 2,
          WORLD_H * TILE / 2,
          s.w * TILE, WORLD_H * TILE,
          0x000000, 0.72
        ).setDepth(7);
        const lockTxt = this.add.text(
          s.x * TILE + (s.w * TILE) / 2,
          WORLD_H * TILE / 2,
          `🔒 ${s.name}\nComplete Section ${parseInt(id)-1} quests\nto unlock`,
          { fontSize: '14px', color: '#aaaaaa', fontFamily: 'Segoe UI', align: 'center', stroke: '#000', strokeThickness: 4 }
        ).setOrigin(0.5).setDepth(8);
        this.fogGroup.add(fog);
        this.fogGroup.add(lockTxt);
      }
    });
    // Also add fog over barriers that haven't been crossed yet
    BARRIERS.forEach(b => {
      const unlocked = this.player?.unlockedSections ?? [1];
      const nextSec = BARRIERS.indexOf(b) + 2;
      if (!unlocked.includes(nextSec)) return; // entire section still locked
      // barrier might still be up even if section unlocked but bridge not built
    });
  }

  update(_, deltams) {
    if (!this.player) return;
    const dt = deltams / 1000;
    this.player.update(dt, this.tiles);
    this._checkSiteProximity();
    this._emitUI();
  }

  _checkSiteProximity() {
    const px = this.player.x, py = this.player.y;
    this.siteLabels?.forEach(({ site, lbl, nameTag }) => {
      const cx = site.tx * TILE + TILE * 1.5;
      const cy = site.ty * TILE + TILE * 1.5;
      const d = Math.hypot(px - cx, py - cy);
      const near = d < TILE * 5;
      lbl.setAlpha(near ? 1.0 : 0.6);
      nameTag.setVisible(near);
    });
  }

  _emitUI() {
    if (!this.player) return;
    const sec = this.player.currentSection();
    this.game.events.emit('updateUI', {
      hp: this.player.hp, maxHp: this.player.maxHp,
      gold: this.player.gold, level: this.player.level, xp: this.player.xp,
      section: sec,
      mount: this.player.mount,
      familiar: this.player.familiar,
      unlockedSections: this.player.unlockedSections,
    });
  }

  // Called when a section is unlocked
  unlockSection(sectionId) {
    if (!this.player.unlockedSections.includes(sectionId)) {
      this.player.unlockedSections.push(sectionId);
      this._updateFog();
      this._showNotif(`Section ${sectionId} — ${SECTIONS[sectionId]?.name} — Unlocked!`, '#00ffaa');
    }
  }

  _showNotif(msg, color = '#ffffff') {
    const cam = this.cameras.main;
    const txt = this.add.text(
      this.player.x, this.player.y - 60, msg,
      { fontSize: '15px', color, fontFamily: 'Segoe UI', stroke: '#000', strokeThickness: 4, align: 'center' }
    ).setOrigin(0.5).setDepth(20);
    this.tweens.add({ targets: txt, y: txt.y - 50, alpha: 0, duration: 2200, ease: 'Power2',
      onComplete: () => txt.destroy() });
  }

  _loadSave() {
    try {
      const raw = localStorage.getItem('qoz_v2_save');
      if (raw) {
        const save = JSON.parse(raw);
        this.player.hp = save.hp ?? 30;
        this.player.gold = save.gold ?? 50;
        this.player.level = save.level ?? 1;
        this.player.xp = save.xp ?? 0;
        this.player.mount = save.mount ?? null;
        this.player.ownedMounts = save.ownedMounts ?? [];
        this.player.unlockedSections = save.unlockedSections ?? [1];
        this.player.x = save.x ?? this.worldData.spawnX;
        this.player.y = save.y ?? this.worldData.spawnY;
        this._updateFog();
      }
    } catch (e) { /* fresh game */ }
  }

  savegame() {
    try {
      localStorage.setItem('qoz_v2_save', JSON.stringify(this.player.serialize()));
    } catch (e) {}
  }
}
