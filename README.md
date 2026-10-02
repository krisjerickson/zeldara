# Quests of Zeldara (V4)

A top-down action-adventure built with Phaser 3.60. The whole game is one self-contained `index.html`.

## Play
- **Online:** deployed on Vercel from the `main` branch (every push auto-deploys).
- **Offline:** run `npm install` once, then `npm run build`, and double-click `index.html` in Chrome. It needs internet once so Phaser can load from cdnjs.

## Repo layout
| Path | What it is |
|---|---|
| `index.html`, `lab/index.html`, `dist/` | Built by `npm run build`. **Generated and not in git** — Vercel builds them on every push. |
| `src/`, `assets/`, `build.mjs` | The source. Edit `src/js/*.js`, then `node build.mjs --check` rebuilds `index.html`. |
| `tests/` | Headless Playwright tests (see `docs/05-dev-tools-and-testing.md`). |
| `docs/` | AI memory docs (architecture, scenes, content, endgame, dev tools, changelog, roadmap). Read `docs/README.md` first. |
| `sprites/` | Editable source PNGs for the hero (and sample monster sprites). Inlined into `index.html` as base64. |
| `design-mocks/` | Static theme and palette mockups. |
| `archive/` | Dormant Vite/React skeleton and old April builds. Not deployed and not used. |
| `vercel.json`, `.vercelignore` | Hosting config: Vercel runs `npm run build` and serves `dist/` (game at `/`, Design Lab at `/lab`). |

## Deploying and saves
Push to `main` → Vercel runs `npm run build` and serves `dist/`. Full step-by-step setup, and how player profiles / save slots / export-import work: **`docs/12-hosting-and-saves.md`**.
