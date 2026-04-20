# Quests of Zeldara V2

## Option A — Play Immediately (no setup needed)
Open `dist/game.html` in your browser. Uses CDN-loaded Phaser 3 + React.
Requires internet connection for first load (CDN libraries cache after that).

## Option B — Full Development Setup (recommended for contributing)
Requires Node.js 18+

```bash
cd "quests-of-zeldara-v2"
npm install
npm run dev      # live dev server at http://localhost:5173
npm run build    # build to dist/
```

## Architecture
- **Engine**: Phaser 3 (scene management, rendering, physics, input)
- **UI**: React 18 (HUD, modals, quest log, inventory)
- **Bundler**: Vite 5
- **Language**: JavaScript (ES2022 modules)

## Sections
| Section | Name | Terrain | Barrier to unlock |
|---------|------|---------|-------------------|
| 1 | The Grasslands | Flat grass, few trees/rocks | *Starting area* |
| 2 | The Wetlands   | Lakes, streams, mud | Deep River (bridge from S1 Tower builder) |
| 3 | The Highlands  | Rocky ground, boulders | Boulder Wall (elevator from S2 Tower mechanic) |
| 4 | The Ashlands   | Magma, obsidian, ash | Magma River (metal bridge from S3 Dwarf forger) |
