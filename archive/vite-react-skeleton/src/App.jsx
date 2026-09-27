import React, { useState, useEffect, useRef, useCallback } from 'react';
import Phaser from 'phaser';
import { gameConfig } from './game/config.js';
import HUD from './ui/HUD.jsx';
import MiniMap from './ui/MiniMap.jsx';
import QuestLog from './ui/QuestLog.jsx';
import Inventory from './ui/Inventory.jsx';

export default function App() {
  const parentRef = useRef(null);
  const gameRef = useRef(null);
  const [uiState, setUiState] = useState({
    hp: 30, maxHp: 30, gold: 50, level: 1, xp: 0,
    section: 1, mount: null, familiar: null, unlockedSections: [1],
  });
  const [showMap, setShowMap]           = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showQuests, setShowQuests]     = useState(false);

  useEffect(() => {
    if (!parentRef.current || gameRef.current) return;
    const cfg = { ...gameConfig, parent: parentRef.current };
    const game = new Phaser.Game(cfg);
    gameRef.current = game;

    game.events.on('updateUI', data => setUiState(prev => ({ ...prev, ...data })));
    game.events.on('toggleMap',       () => setShowMap(s => !s));
    game.events.on('toggleInventory', () => setShowInventory(s => !s));
    game.events.on('toggleQuests',    () => setShowQuests(s => !s));
    game.events.on('closeAll', () => { setShowMap(false); setShowInventory(false); setShowQuests(false); });

    // Auto-save every 30 seconds
    const saveInterval = setInterval(() => {
      const ws = game.scene.getScene('World');
      if (ws?.savegame) ws.savegame();
    }, 30000);

    return () => { clearInterval(saveInterval); game.destroy(true); gameRef.current = null; };
  }, []);

  const getWorldScene = useCallback(() => gameRef.current?.scene?.getScene('World'), []);

  return (
    <div id="app-root">
      <div id="phaser-parent" ref={parentRef} style={{ width:'100vw', height:'100vh', position:'absolute', top:0, left:0 }} />

      {/* React UI overlays */}
      <HUD uiState={uiState} onToggleMap={() => setShowMap(s => !s)}
           onToggleInventory={() => setShowInventory(s => !s)}
           onToggleQuests={() => setShowQuests(s => !s)} />

      {showMap && (
        <MiniMap uiState={uiState} worldScene={getWorldScene()} onClose={() => setShowMap(false)} />
      )}
      {showInventory && (
        <Inventory uiState={uiState} onClose={() => setShowInventory(false)} />
      )}
      {showQuests && (
        <QuestLog uiState={uiState} worldScene={getWorldScene()} onClose={() => setShowQuests(false)} />
      )}
    </div>
  );
}
