import React, { useRef, useEffect } from 'react';
import { WORLD_W, WORLD_H, SECTIONS, TILE_COLORS, T } from '../game/constants.js';

const MAP_SCALE = 2.2;

export default function MiniMap({ uiState, worldScene, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !worldScene?.tiles) return;
    const ctx = canvas.getContext('2d');
    const { tiles, sites } = worldScene.worldData;
    const W = Math.floor(WORLD_W * MAP_SCALE), H = Math.floor(WORLD_H * MAP_SCALE);
    canvas.width = W; canvas.height = H;

    // Draw tiles
    const imgData = ctx.createImageData(W, H);
    for (let ty = 0; ty < WORLD_H; ty++) {
      for (let tx = 0; tx < WORLD_W; tx++) {
        const tileVal = tiles[ty]?.[tx] ?? 0;
        const col = TILE_COLORS[tileVal] ?? 0x222222;
        const r = (col >> 16) & 0xff, g = (col >> 8) & 0xff, b = col & 0xff;
        const px = Math.floor(tx * MAP_SCALE), py = Math.floor(ty * MAP_SCALE);
        const idx = (py * W + px) * 4;
        imgData.data[idx]   = r;
        imgData.data[idx+1] = g;
        imgData.data[idx+2] = b;
        imgData.data[idx+3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Lock overlay for locked sections
    const unlocked = uiState.unlockedSections ?? [1];
    Object.entries(SECTIONS).forEach(([id, s]) => {
      if (!unlocked.includes(parseInt(id))) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(s.x * MAP_SCALE, 0, s.w * MAP_SCALE, H);
        ctx.fillStyle = '#888';
        ctx.font = '11px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText('🔒', (s.x + s.w/2) * MAP_SCALE, H/2);
      }
    });

    // Adventure sites
    sites?.forEach(site => {
      const colors = { dungeon:'#8844ff', tower:'#4488ff', camp:'#ffaa44', harbor:'#44aaff', skyport:'#44ffff' };
      ctx.fillStyle = colors[site.type] ?? '#ffffff';
      ctx.fillRect(site.tx * MAP_SCALE - 2, site.ty * MAP_SCALE - 2, 6, 6);
    });

    // Player dot
    const player = worldScene.player;
    if (player) {
      const px2 = (player.x / 32) * MAP_SCALE;
      const py2 = (player.y / 32) * MAP_SCALE;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(px2, py2, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#000'; ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, [worldScene, uiState]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal map-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span>🗺️ World Map</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <canvas ref={canvasRef} style={{ imageRendering: 'pixelated', maxWidth: '90vw', maxHeight: '70vh' }} />
        <div className="map-legend">
          <span style={{color:'#8844ff'}}>■</span> Dungeon &nbsp;
          <span style={{color:'#4488ff'}}>■</span> Tower &nbsp;
          <span style={{color:'#ffaa44'}}>■</span> Camp &nbsp;
          <span style={{color:'#44aaff'}}>■</span> Harbor &nbsp;
          <span style={{color:'#44ffff'}}>■</span> Skyport &nbsp;
          <span style={{color:'#fff'}}>●</span> You
        </div>
      </div>
    </div>
  );
}
