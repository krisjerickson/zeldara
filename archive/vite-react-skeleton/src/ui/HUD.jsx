import React from 'react';
import { SECTIONS, MOUNTS, FAMILIARS } from '../game/constants.js';

export default function HUD({ uiState, onToggleMap, onToggleInventory, onToggleQuests }) {
  const { hp, maxHp, gold, level, xp, section, mount, familiar, unlockedSections } = uiState;
  const xpPct = Math.min(100, (xp / (level * 100)) * 100);
  const hpPct = Math.min(100, (hp / maxHp) * 100);
  const hpColor = hpPct > 60 ? '#44ff88' : hpPct > 30 ? '#ffaa00' : '#ff3322';
  const sectionInfo = SECTIONS[section];
  const mountInfo = mount ? MOUNTS[mount] : null;
  const familiarInfo = familiar ? FAMILIARS[familiar] : null;

  return (
    <div id="hud">
      {/* Top-left: player stats */}
      <div className="hud-panel hud-stats">
        <div className="stat-row">
          <span className="stat-icon">❤️</span>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: hpPct + '%', background: hpColor }} />
          </div>
          <span className="stat-val">{hp}/{maxHp}</span>
        </div>
        <div className="stat-row">
          <span className="stat-icon">⭐</span>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: xpPct + '%', background: '#88aaff' }} />
          </div>
          <span className="stat-val">Lv {level}</span>
        </div>
        <div className="stat-row">
          <span className="stat-icon">💰</span>
          <span className="stat-val gold">{gold}g</span>
        </div>
      </div>

      {/* Top-center: section info */}
      <div className="hud-panel hud-section">
        <div className="section-name">{sectionInfo?.name ?? 'Unknown Region'}</div>
        <div className="section-unlocked">
          {[1,2,3,4].map(s => (
            <span key={s} className={`sec-dot ${unlockedSections?.includes(s) ? 'unlocked' : 'locked'}`} title={SECTIONS[s]?.name}>
              {unlockedSections?.includes(s) ? '◉' : '○'}
            </span>
          ))}
        </div>
      </div>

      {/* Mount + familiar info */}
      {(mountInfo || familiarInfo) && (
        <div className="hud-panel hud-companions">
          {mountInfo && <span title={mountInfo.desc}>{mountInfo.icon} {mountInfo.n}</span>}
          {familiarInfo && <span title={familiarInfo.n}>{familiarInfo.icon} {familiarInfo.n}</span>}
        </div>
      )}

      {/* Bottom action bar */}
      <div className="hud-bottom">
        <button className="hud-btn" onClick={onToggleMap}      title="Map (M)">🗺️ Map</button>
        <button className="hud-btn" onClick={onToggleInventory} title="Inventory (I)">🎒 Inv</button>
        <button className="hud-btn" onClick={onToggleQuests}    title="Quests (Q)">📜 Quests</button>
      </div>

      {/* Controls hint */}
      <div className="hud-controls">
        WASD/Arrows: Move &nbsp;|&nbsp; E: Interact &nbsp;|&nbsp; M: Map &nbsp;|&nbsp; I: Inventory &nbsp;|&nbsp; Q: Quests
      </div>
    </div>
  );
}
