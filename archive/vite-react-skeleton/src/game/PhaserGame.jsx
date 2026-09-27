import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { gameConfig } from './config.js';

// Re-exported for backward compat but App.jsx inlines the Phaser init now
export default function PhaserGame({ parentRef }) {
  return <div ref={parentRef} style={{ width: '100%', height: '100%' }} />;
}
