# Quests of Zeldara (V4)

A top-down action-adventure built with Phaser 3.60. The whole game is one self-contained `index.html`.

## Play
- **Online:** deployed on Vercel from the `main` branch (every push auto-deploys).
- **Offline:** double-click `index.html` in Chrome. It needs internet once so Phaser can load from cdnjs.

## Repo layout
| Path | What it is |
|---|---|
| `index.html` | ★ The game: all code, CSS and base64 sprites in one file. **Edit this.** |
| `docs/` | AI memory docs (architecture, scenes, content, endgame, dev tools, changelog, roadmap). Read `docs/README.md` first. |
| `sprites/` | Editable source PNGs for the hero (and sample monster sprites). Inlined into `index.html` as base64. |
| `design-mocks/` | Static theme and palette mockups. |
| `archive/` | Dormant Vite/React skeleton and old April builds. Not deployed and not used. |
| `vercel.json`, `.vercelignore` | Static hosting config: no build step, only `index.html` ships. |

## Deploying
Vercel → Import `krisjerickson/zeldara` → Framework **Other**, no build command, output `.`. `vercel.json` already sets these.

Saves use `localStorage['qoz_v2']`. That storage is per-domain, so saves from `file://` and from the Vercel URL are separate.
