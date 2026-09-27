# 07 — Review & Roadmap (Sept 2026)

Full review of Zeldara V4 against the docs in this folder. Every finding below was checked against the code; items marked *(est.)* are estimates.

## 0. Critical housekeeping — which file is the real game?

The docs say the active game is `Zeldara-v4\dist\game.html`. **That file is stale.**

| File | Date | Size | Lines | Volcano quest? |
|---|---|---|---|---|
| `C:\Claude\games\zeldara-v4-game.html` | Jun 9 2026 | 1.89 MB | 11,366 | ✅ yes (all 5 scenes, safety-ESC) |
| `Zeldara-v4\dist\game.html` | Apr 26 2026 | 0.51 MB | 9,155 | ❌ no |
| `Zeldara-v5\dist\game.html` | Apr 26 2026 | 0.51 MB | 9,155 | ❌ no (same file as v4 dist) |

- **Canonical build = `games\zeldara-v4-game.html`**, now copied to `Zeldara-v4\index.html` (✅ done Sept 2026; docs 01/05/06/README updated).
- `Zeldara-v5` is just a copy of the stale V4 folder — there is no V5 work in it.
- The GitHub repo `krisjerickson/zeldara` has one commit (Apr 19, "Add files via upload") containing only the Vite skeleton (`index.html`, `package.json`, `vite.config.js`, mocks). No game code. Its `index.html` points at `/src/main.jsx`, which isn't in the repo, so a Vercel build of it today would fail.

Code stats for the canonical file: one inline script of 1.82 MB, of which 1.27 MB is 61 base64 images; ~0.6 MB of code. 13 scenes, 16 monster defs, 199 items, 10 mounts, 4 harbor islands, 27 dev-panel buttons. The script parses cleanly.

## 1. Bugs & incomplete mechanics (found in code)

| # | Issue | Where | Impact |
|---|---|---|---|
| B1 | **Elemental damage never happens.** `elementDmg`/`element` show up only in UI text (5 places), not in any damage calc. Fire/ice/thunder crafting chains, gauntlets, rings and the +20-all-elements on Elemental Sovereign do nothing in combat. "Ice slows" isn't implemented either. | ITEMS + combat fns | High — a whole crafting tree is cosmetic |
| B2 | **Monsters have no elemental weaknesses/resistances**, so even if B1 were fixed, choosing an element wouldn't matter. | MDEFS | High (design) |
| B3 | **Stale quest text:** harbor and skyport say "(Coming soon)" but both are built. | `MAIN_QUEST_DEFS` | Medium — players think content is missing |
| B4 | **Title screen says "V2 — Circular Island World".** | `TitleScene` | Low |
| B5 | Player panel reads `SKILLS[..].n`, but SKILLS uses `.name`, so the "Special" slot shows `undefined`. `SKILLS` looks like a leftover next to `SPELL_DATA`. | ~line 9894 | Low |
| B6 | **Dying in a mini-volcano** runs `_exitToWorld()` with HP ≤ 0. There's no death penalty and no revive; you come back to the world at 0 HP. Boss-rush defeat does the same ("no mercy heal"). Doc 05 pitfall #9 already flags this. | Volcano scenes | Medium |
| B7 | Tower quest says "rescue the builder," but there's no builder, no rescue beat, and no NPC. Clearing it just unlocks the next section. The original V2 design had rescued NPCs building a bridge, elevator and metal bridge; that story was lost. | `MAIN_QUEST_DEFS`, `BOSS_REWARDS` | Medium (story) |
| B8 | "Artifacts coming soon…" tab in the inventory is empty. | ~line 9970 | Low |
| B9 | `useConsumable()` is dead code with hard caps (HP 100, mana 50). Remove it so nobody wires it back in. | ~line 10051 | Low |
| B10 | Overworld monsters reset to full HP every time you come back from any sub-scene (`wake` handler), so you can't retreat and return. | WorldScene wake | Design choice; review it |
| B11 | No audio at all: no music and no SFX (0 audio calls). | — | High for game feel |
| B12 | No touch/mobile controls (0 touch handlers). Once the game is on Vercel, phone visitors can't play. | — | High for hosting |
| B13 | Monsters, NPCs and buildings are **emoji drawn as text**. Emoji look different on Windows, Mac, Android and iOS, so the game will look different on every device once it's hosted. | all scenes | High (graphics) |

## 2. Incomplete storylines — the game has systems, not a story

Right now there's no intro, no lore text, no NPC dialogue beyond shop menus, and no ending. Beating the Volcano Lord shows a banner and "TAB to return to the world."

Recommended story spine (fits the systems you already have):

1. **Opening (60–90 s):** The Volcano Lord cracks the island's heart. Four elemental guardians (Goblin King, Swamp Witch, Iron Sentinel, Shadow Lord) have been corrupted and seal the regions. A village elder sends you out with a wooden sword. A short text-crawl scene is enough.
2. **Restore the builder arc (fixes B7):** Each tower holds a captured artisan: the Builder (bridge to Wetlands), the Mechanic (elevator to Highlands), and the Dwarf Forger (metal bridge to Ashlands). The 4th tower frees the Sky Captain, who opens the sky ports. Each rescued NPC then **moves into the village** and opens a new building or service. That gives the village visible progress.
3. **Section bosses drop a lore fragment** (4 total) explaining why each guardian turned. After all 4, the volcano sites rise from the sea (the terrain carve already does this, so frame it as a cinematic moment with camera pan and shake).
4. **Mini-volcano keys:** Give each key a one-line guardian spirit message on pickup.
5. **Ending:** Victory → a short epilogue (the village celebrates, rescued NPCs appear) → credits → **New Game+** (keep gear, scale monsters ×1.5). That gives Elemental Sovereign a purpose; right now you get the best weapon with nothing left to use it on.
6. **Side content hooks:** The quest board could generate repeatable bounties ("Slay 10 Harpies") so the mid-game has more to do between the 16 main quests.

## 3. Gameplay recommendations (priority order)

1. **Make elements matter** (B1+B2): add `weak`/`resist` to MDEFS. For example, fire imps resist fire and are weak to ice; mud trolls are weak to fire; the Iron Sentinel is weak to lightning. Apply `elementDmg × 2` on weakness and `× 0.25` on resist, and show a coloured damage number. Add ice slow (−40% speed for 2 s). *(est. 1 session)*
2. **Consistent death handling** (B6): one `_heroDied(scene)` helper in the Hero API: fade → wake World → call `_worldPlayerDied()` (the same 10% gold penalty). Use it in every sub-scene.
3. **Audio pass:** a tiny WebAudio SFX synth (sword, hit, pickup, level-up; no asset files needed) plus 5 music loops (village, each biome, boss). CC0 music sources: OpenGameArt, Kenney. *(est. 1–2 sessions)*
4. **Touch controls** for web hosting: virtual joystick + 4 buttons (attack, bow, shield, interact). Phaser has pointer input built in. *(est. 1 session)*
5. **Save robustness:** an export/import save button (JSON download). Note that `localStorage` is per-domain, so saves from `file://` won't carry over to the Vercel URL. Add 3 save slots.
6. **Onboarding:** first-5-minutes tutorial prompts (move, attack, TAB to enter, Q for quests). There are many keys (TAB, SHIFT, CTRL, N, Q…) and no in-game teaching of them.
7. **Difficulty and pacing:** starting with 0 gold and no ammo is harsh. Consider giving 10 arrows plus a tavern "first drink free." Add a difficulty toggle (Story / Normal / Hard) that scales monster ATK.
8. **Map and navigation:** quest markers on the minimap (next objective arrow).
9. **Code health (enables everything else):** move out of one 11k-line HTML file (see §4, Tier 3).

## 4. Making the graphics better

The current look (checked in a headless browser run): overworld tiles are near-flat colour squares with light speckle. Terrain changes with hard square edges (bright pink flower squares, brown dirt blocks), and nothing blends. Village walls and floors have simple patterns. Monsters, NPCs and building icons are emoji + primitive shapes. The hero is an AI-painted sprite (64×105 source frames shown at 25×42, which blurs it). The biggest wins, from cheapest to full overhaul:

### Tier 1 — no overhaul (stay single-file, 1–3 sessions)
- **Textured tiles instead of flat colours:** generate 32×32 tile textures once at boot on a canvas (noise speckle, grass blades, water ripples, lava cracks) and use them in the chunk renderer. Same data, much richer look. The sample image shows this on the grass strip.
- **Edge transitions (autotiling):** blend grass↔water↔sand edges with 16-variant bitmask tiles. This is the single biggest "looks like a real game" upgrade.
- **Animated tiles:** water shimmer, lava glow pulses (2–4 frame cycles).
- **Phaser FX pipeline:** vignette, bloom on lava/magic, glow on pickups, drop shadows under every sprite, a light day/night tint.
- **Crisp pixel rendering:** `pixelArt:true`, `roundPixels:true`, integer zoom (2× instead of 1.4×), and hero frames resized to an integer scale. This removes the current blur.
- **Juice:** hit-stop (50 ms freeze on hit), screen shake on boss attacks, damage numbers, dust puffs when walking.

### Tier 2 — replace emoji with real sprites (3–6 sessions)
- ~16 monsters + 8 tower/volcano bosses + ~12 NPCs + ~12 buildings + mounts. Each monster needs idle (2), walk (4) and attack (2–3) frames in 4 directions, or 2 directions mirrored.
- Pack them into a texture atlas (one PNG + JSON) instead of base64 strings.
- Pick one art direction. The hero's AI-painted style and pixel-art monsters would clash. Either redraw the hero as pixel art at the same grid, or generate monsters in the hero's style.

### Tier 3 — major overhaul (recommended once content is stable)
- **Move to a real project:** Vite + plain JS (or TypeScript), one file per scene, `/public/assets` for atlases, audio and tilemaps. You already have the Vite skeleton; replace its React HUD with the current DOM HUD code.
- **Upgrade Phaser 3.60 → Phaser 4** (current stable is v4.2.1, 2026). You get a new WebGL renderer, better filters and lighting, and faster tilemaps. Test carefully: some FX/pipeline APIs changed between 3 and 4.
- **Tiled map editor** for the village, dungeons and volcano mini-levels (hand-authored, with decorative layers), keeping procedural generation for the overworld.
- **Real lighting:** Phaser Light2D with normal maps for dungeons and caves (torches cast light, dark corners).
- **Optional "HD-2D" direction** (Octopath-style): pixel sprites in a 3D scene with depth-of-field, using Three.js. It looks great but is effectively a rewrite; only worth it if Zeldara becomes a long-term flagship.

## 5. Can Claude make the sprites from scratch?

**Yes, for pixel art.** Claude doesn't have an image-generation model in this setup. Instead, it draws sprites as pixel grids in code, then a script adds automatic shading, a 1-px outline and animation frames. See `zeldara-sample-sprites.png` (goblin, skeleton, mud troll, fire imp, blacksmith NPC, 2-frame idle, drawn fresh for this review).

- Strengths: a consistent palette and style across every creature, exact frame alignment, direct export to an atlas plus Phaser animation config, and easy recolours (elite/boss variants in seconds).
- Limits: best at 16–32 px pixel art. Painterly or high-res art (like the current hero) isn't realistic this way. Complex multi-direction walk cycles take several passes and your review.
- Realistic plan *(est.)*: roughly 40 characters × (idle + walk + attack) at 24–32 px. Budget about 6–10 sessions, done in batches by region, with you reviewing each batch.
- Alternatives or mixes: CC0 packs (Kenney, 0x72 "Dungeon Tileset II") for tiles and props, AI image generation (your ChatGPT hero pipeline) for painterly characters, and Claude for cleanup, slicing, consistency and integration.

**Hosting smoke test (Sept 2026):** `index.html` served over http:// with Phaser 3.60 loads cleanly. New Game → World scene is active with no JS errors, so it's ready for static hosting as-is.

## 6. Git + Vercel hosting plan

Target: `https://github.com/krisjerickson/zeldara` → Vercel project → e.g. `zeldara.vercel.app`, auto-deploying on every push to `main`.

**Repo layout** (✅ set up Sept 2026 — static site, no build step; waiting on first push):
```
zeldara/
├── index.html          ← the game (copy of games\zeldara-v4-game.html)
├── vercel.json         ← framework null, no build, output "."; .vercelignore ships only index.html
├── docs/               ← the ai .md memory files
├── sprites/            ← source PNGs (hero, samples)
├── design-mocks/       ← theme/palette mockups
├── archive/            ← dormant Vite/React skeleton (kept out of the build)
└── .gitignore          ← node_modules, _dist_legacy_backup, *.bak
```
- Important: if `package.json` with a `vite build` script stays at the repo root, Vercel will auto-detect Vite and build the **dormant React skeleton** instead of the game. So the skeleton moves to `archive/` (or the Vercel framework preset is set to "Other").
- The repo's current contents are a stale skeleton. Plan: one new commit on top that replaces it (history kept, no force-push).

**What's needed from Kris:**
1. A Vercel account (sign up with GitHub at vercel.com). The free Hobby tier is fine for a personal, non-commercial game.
2. **Pushing to GitHub:** Claude can build the repo locally but has no GitHub credentials. Kris pushes once, using GitHub Desktop or `git push` from Windows, or attaches the repo with push access to a Claude session.
3. On vercel.com/new: Import `krisjerickson/zeldara`, Framework Preset **Other**, Build Command **empty**, Output Directory **`.`**, then Deploy. No environment variables needed.
4. Optional: a custom domain.

## 7. Suggested order of work

1. Housekeeping: fix docs to point at the canonical file, create the repo, deploy to Vercel (gets a live URL immediately).
2. Quick fixes: B3, B4, B5, B9, plus death handling (B6).
3. Elements system (B1/B2).
4. Graphics Tier 1 (textured tiles + autotiling + crisp scaling + juice).
5. Story spine: intro, rescued NPCs, ending + New Game+.
6. Audio + touch controls.
7. Graphics Tier 2 (sprites region by region).
8. Tier 3 migration (Vite + Phaser 4) before the next big content push.
