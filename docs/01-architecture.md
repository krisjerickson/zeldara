# 01 — Architecture & Build

## Folder layout (restructured Sept 2026 — this folder is the git repo `krisjerickson/zeldara`)

```
C:\Claude\games\Zeldara-v4\          ← git repo root, deployed to Vercel
├── index.html                     ← ★ THE ACTIVE GAME (~11,400 lines, 1.9 MB, hand-crafted)
│   (Everything runs from this single file — double-click in Chrome or serve statically.)
│
├── docs\                          ← This AI memory folder (was "ai .md\")
├── sprites\hero\                  ← Editable PNG source of every hero sprite
│   ├── front\  front_0..7.png    walking down (frames 0-2 are idle, 3-7 walking)
│   ├── back\   back_0..3.png     walking up
│   ├── side\   side_0..7.png     walking right (mirror for left)
│   ├── attack\ attack_0..6.png   sword swing
│   ├── bow attack\ bow_0..9.png  bow draw + release
│   ├── horse\  horse_{front|side|back}_0..7.png  mounted riding
│   └── source\                   original AI-generated sheets kept as reference
├── sprites\samples\               Claude-drawn sample monster/NPC sprites (review, Sept 2026)
├── design-mocks\                  theme-mocks.html, village-palette-mocks.html (static references)
├── archive\                       NOT deployed, NOT active
│   ├── vite-react-skeleton\       old src/, package.json, vite.config.js, scripts/, node_modules
│   └── old-builds\                dist-2026-04-26 (stale pre-volcano build), _dist_legacy_backup
├── README.md, .gitignore
└── vercel.json, .vercelignore     static hosting, no build step; only index.html ships
```

History note: before Sept 2026 the docs pointed at `Zeldara-v4\dist\game.html`, but the newest build
(with the volcano quest) actually lived at `C:\Claude\games\zeldara-v4-game.html` (Jun 9 2026).
That file was copied to `index.html`; the old copy in the games folder is now just a snapshot — don't edit it.

## Tech stack of `index.html`

- **Phaser 3.60** — loaded from `https://cdnjs.cloudflare.com/ajax/libs/phaser/3.60.0/phaser.min.js` via a `<script>` tag in `<head>`. Internet required at load.
- **Vanilla JS** — no framework, no bundler, no modules. All code is in ONE inline `<script>` tag (classic, not `type="module"`) so the file loads correctly from `file://`.
- **CSS** — all styles in a `<style>` block at top of `<head>`.
- **DOM overlay** — modals, HUD, and world labels are HTML/CSS positioned over the Phaser canvas.
- **Save/load** — `localStorage['qoz_v2']` stores a JSON snapshot of `playerState`.
- **Sprites** — base64 data URIs inlined in JS consts. Loaded into Phaser via `TextureManager.addBase64()`.

## Editing workflow

1. Locate the code region in `index.html` with `grep`.
2. Patch via one of:
   - `Edit` tool (for small string replacements)
   - `node -e "..."` running `fs.readFileSync + .replace + fs.writeFileSync` (for pattern-heavy edits)
   - Longer edits: write the patch script to `/tmp/xxx.mjs` and run with `node /tmp/xxx.mjs`
3. Always verify the file still parses:
   ```js
   const html = fs.readFileSync(PATH,'utf8');
   const re = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g;
   for (let m; (m=re.exec(html)); ) new Function(m[1]);
   ```
4. Commit + push to `main` — Vercel redeploys automatically.

**Do NOT** try to rebuild from `archive/vite-react-skeleton/src/` — that path is dead. Everything lives in `index.html`.

## Common code-region grep targets (line numbers approximate, always regrep first)

| What | Anchor / grep |
|---|---|
| Inline `<script>` start | `<script>` (line ~600) |
| World constants | `const WORLD_W=600, WORLD_H=600` |
| Tile enum `T` | `const T={GRASS:0,...` |
| Section colors | `const SECTION_TILE_COLORS=` |
| MOUNTS dict | `^  horse:.*n:'Horse'` |
| FAMILIARS dict | `^const FAMILIARS=` |
| MDEFS (monsters) | `^const MDEFS=` |
| ITEMS dict | `^const ITEMS=` |
| CRAFT_RECIPES | `^const CRAFT_RECIPES=` |
| MAIN_QUEST_DEFS | `^const MAIN_QUEST_DEFS=` |
| BOSS_REWARDS | `^const BOSS_REWARDS=` |
| Hero API helpers | `function _heroRegisterTextures` |
| Volcano site defs | `function _volcanoSiteDefs` |
| WorldScene class | `class WorldScene extends Phaser.Scene` |
| Sandbox dev buttons | `<button class="sb-btn"` |
| Scene registry | `scene:[TitleScene,BootScene,` |

## Sanity checks before shipping any patch

Always run these after touching `index.html`:

1. **JS parses cleanly** — walk every `<script>` and pass to `new Function(...)`.
2. **No stray `</script>` tokens** inside string literals (escape as `<\/script>`).
3. **Grep for the change** — verify the string you injected actually appears.
4. **Count occurrences** if a pattern should replace N sites — replacing 1 when you meant 3 is common.

## What DOES NOT need building

- The archived `src/` React/Vite path — dormant, don't touch.
- CDN Phaser — never inline it, never version-bump without testing.
- The archived `scripts/bundle-single-html.mjs` — only useful if you go back to the src/ path.
