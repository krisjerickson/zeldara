import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { WorldScene } from './scenes/WorldScene.js';

export const gameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#0a0a0a',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false },
  },
  scene: [BootScene, WorldScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'phaser-parent',
    width: '100%',
    height: '100%',
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    antialias: false,  // pixel art look
    pixelArt: false,
  },
};
