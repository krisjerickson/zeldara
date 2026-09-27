import React from 'react';

export default function Inventory({ uiState, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal inv-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span>🎒 Inventory</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="inv-coming-soon">
          <p>⚔️ Equipment &amp; inventory system coming in Phase 2!</p>
          <p style={{opacity:0.6, fontSize:'0.85em', marginTop:'8px'}}>Stats: Level {uiState.level} · {uiState.gold}g · HP {uiState.hp}/{uiState.maxHp}</p>
        </div>
      </div>
    </div>
  );
}
