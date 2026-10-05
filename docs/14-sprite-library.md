# 14 — Sprite library, atlases and the ChatGPT requests (round 18, Oct 3, 2026)

This replaces the pilot plan in `09-sprite-style-bible.md` (pixel art, green background, 5 concepts per character). Kris's answers are in `08-overhaul-plan.md` (round 18).

## What exists now

| Piece | Where | What it does |
|---|---|---|
| Manifest | `src/js/07zs-sprites.js` (`ZSPR`) | Lists every character from the game data, the moves each must show, its sheets and the request text for each sheet. Also holds the hero mapping |
| Requests | `sprites/requests/` (made by `node build.mjs`) | `requests.json` for the script, one `wave-*.md` per wave to read or paste, `survey.md` with every character |
| References | `sprites/reference/style_hero.png`, `style_centaur.png` | Kris's two images. Attached to every request |
| Feeding script | `tools/sprites/generate.mjs` | Sends requests to the OpenAI image API with Kris's key, saves into `sprites/incoming/` |
| Intake | `tools/sprites/intake.py` | Removes the background, finds each pose, lines up the feet, writes frames and atlases to `sprites/out/` |
| Game atlases | `assets/atlas/` (made by `intake.py --atlas`) | The cut frames packed into pages + `index.json`; committed, loaded by the game |
| Loader | `src/js/04f-atlas.js` (`ZAtlas`) | Shows painted frames on heroes, monsters, village folk, mounts, familiars, fairies; stand-ins where nothing is painted |
| Lab tab | Design Lab → Sprite Library | Guide, hero mapping tables, every character with stand-in, moves, sheets, Copy request, "Looks right" and notes |

## The survey

439 characters, **995 sheets (667 core + 328 extra), 6,735 poses** (round 21: bosses have their own full sheets again, monsters have death frames). Every move in every monster kit maps to an animation; a test fails if a new kit move has none.

| Group | Characters | Core sheets | Extra sheets |
|---|---|---|---|
| Heroes (boy, girl) | 2 | 40 | 0 |
| Hero on each mount (painted together) | 22 | 22 | 0 |
| Mounts on their own | 11 | 11 | 0 |
| Monsters | 240 | 375 | 232 |
| Bosses, evolved forms, wardens, mage masters, elites | 76 | 120 | 96 |
| NPCs (shops, craftsmen, village folk, islands, castle teachers) | 41 | 52 | 0 |
| Familiars (the 4 picked spirits) | 4 | 4 | 0 |
| Fairies (20) and monarchs (3) | 23 | 23 | 0 |
| Animals (8 small, 8 large) | 16 | 16 | 0 |
| Vehicles (boat, sky skiff, with each hero) | 4 | 4 | 0 |

- **Core** sheets replace today's stand-ins: idle, movement, the main attack, hurt.
- **Extra** sheets add second attacks, special moves (burrow, blink, disguise, charge …) and boss phase changes and deaths. They are a second pass.
- My estimate on the question card was about 550 images for "mixed" facings. The real count is 667 core. The difference is the front-and-back sheet for the 135 humanoid monsters and 44 humanoid bosses.

### Facings (Kris: mixed)

- Humanoids (135 monsters, 44 bosses): a side sheet plus one front-and-back sheet (idle, two steps and the main attack for each).
- Beasts, fliers, swarms, creature bosses: one three-quarter view, mirrored for left.
- Heroes: front, side and back for every directional move; skills that look the same from any side are drawn once.
- Mounts and riders: one sheet with side (4), front (2) and back (2).
- Bosses follow the same humanoid / creature rule; each boss has its own sheets (a test with 8 bosses on one sheet merged two of them).

### Frame counts

| Who | Frames |
|---|---|
| Monster | idle 1 · move 4 · each attack 2 (slam 3) · hurt 1 · death 2 (on an extra sheet) |
| Boss | idle 2 · move 4 · attacks 2–3 · cast 2 · phase roar 1 · phase change 2 · hurt 1 · death 2 |
| NPC | idle 2 · talk 2 · work 4; village folk also walk (side 4, front 2, back 2) |
| Familiar | hover 4 · base attack 2 · special 1 · knocked out 1 |
| Fairy | hover 4 · talk 2 · cast 2 |
| Animal | idle 2 · move 4; large animals add attack 2 |

## Heroes

- **Boy** = Kris's reference image. All frames are redrawn in that style.
- **Girl**: look B, Shieldmaiden, locked Oct 4 — two long auburn braids with silver clasps, braided headband with a teal gem, fur-collared teal mantle with a knotwork brooch, bracers, fur-cuffed boots. `hero_f.model.png` is her model sheet; her other sheets are built on it. (Looks A Ranger and C Wayfinder were the alternatives.)
- The choice is made at New Game and saved (`ps.hero` = `m` or `f`; old saves are the boy). Until her sprites arrive the girl is a recoloured stand-in of today's frames.

Per hero: 1 model sheet + 5 sheets × 3 facings + 4 one-view sheets = 20 sheets.

| Sheet | Per facing | Animations |
|---|---|---|
| Movement | yes | idle 2, walk 4, run 2 |
| Sword and battle axe | yes | sword 4, axe 4 |
| Bow and crossbow | yes | bow 4, crossbow 4 |
| Staff, wand, bare hand | yes | staff 4, wand 2, hand 2 |
| Defend | yes | shield block 2, roll 3, Shield Bash 3 |
| Skills A | once | War Stomp 3, Whirlwind 4, Smoke Bomb 1 |
| Skills B | once | Blink 2, Berserker 2, Second Wind 2, Time Slow 2 |
| Skills C | once | Phantom Veil 2, Meteor 3, defeat 3 |
| Misc | once | potion 2, eat 1, cheer 2, rest 1, hurt 1, pick up 1 |

### Mapping (`ZSPR.HERO`)

| Action | Animation |
|---|---|
| Melee | `melee_axe` if the weapon id contains axe or cleaver, else `melee_sword` (the Sea Trident uses the sword set) |
| Ranged | `ranged_xbow` for crossbows, else `ranged_bow` |
| Spell | `magic_wand` or `magic_staff` by the equipped magic weapon, else `magic_hand` |
| Shield | `block` |
| Skill | Sprint → run · Roll → roll · Blink → blink · War Stomp · Whirlwind · Smoke Bomb · Shield Bash · Berserker · Second Wind · Phantom Veil · Time Slow · Meteor Strike |

- `ZSPR.HERO.animFor(playerState, action, skillId)` returns the animation; `ZSPR.HERO.frame(who, anim, facing, i)` returns the atlas frame name.
- The hero draw code now records the current animation (`st.anim`) each frame. It still draws today's frames; the atlas renderer will read `st.anim` once sprites exist.
- **Rolling:** the game already has a Roll skill (taught by Tumbler Pia). The roll frames serve that skill. No new move was added.
- Weapon element (fire, ice, lightning) is shown by a glow colour drawn by the game, not by separate paintings (`ELEMENT_GLOW`).

## The style in every request

Taken from the two references: bold cartoon sprite (not pixel art), thick dark outlines, flat 2–3 tone shading, chunky chibi proportions, **teal highlights (#3fe6f2) on upper-left edges**, a thin magenta rim on shadow edges, white-cyan glow on magic. Transparent background; no ground shadow (the game draws shadows). The full text is `ZSPR.STYLE` and `ZSPR.RULES`.

Each request also gives: the character's look and colours from the game, how it behaves, the exact grid (for example 8 poses, 4 × 2), each pose in order, and the view.

## How the requests are fed (Kris: pilot by hand, then script)

1. **Pilot (12 requests, wave 0; the two hero model sheets are done).** By hand: In ChatGPT start an image chat, attach `style_hero.png` and `style_centaur.png`, copy the request from the Lab (Sprite Library → Guide → Pilot requests) or from `sprites/requests/wave-0-pilot-by-hand.md`, generate, and save as `sprites/incoming/<request id>.png`.
   - `hero_m.model` and `hero_f.model` are done (Oct 4). Later hero requests attach the model sheet.
   - Any file name works when saving from ChatGPT as long as Claude is told; the file is renamed to its request id.
   - For a character's second sheet, attach its first approved sheet. Each request says what to attach.
2. **Review.** Tell Claude the pilot is in. Claude runs the intake, shows the frames in the Lab next to the stand-ins and adjusts the style text if the look drifts.
3. **Script, for the rest.** On the PC, in PowerShell in the game folder:
   ```
   $env:OPENAI_API_KEY = "sk-..."
   node tools/sprites/generate.mjs --wave 1 --dry-run
   node tools/sprites/generate.mjs --wave 1
   ```
   - It sends all sheets of the wave by default (`--tier core` for the core sheets only).
   - It skips files that already exist, so it can be stopped and restarted.
   - A request that needs another sheet as a reference waits until that sheet is in `sprites/incoming/`.
   - Model `gpt-image-2.5-sunburst` (OpenAI's edit-precision model), quality **medium** (Kris, round 20: cheaper; the frames are shrunk to game size anyway), transparent background, 1536 × 1024. All can be changed with flags.
   - The OpenAI organization must be verified for image models. Token use is logged to `sprites/incoming/_log.jsonl`.
   - **Cost is not known yet.** I could not confirm current per-image prices. The pilot through the script (`--wave 0 --limit 3`) will show the real token use before a large wave is run.
4. **Intake.** `python tools/sprites/intake.py` (Python 3, Pillow, numpy). A sheet with a checkerboard or scenery background is rejected with a message and needs a redo.

### Setting up the OpenAI API (one time)

The ChatGPT app and the API are separate products with separate billing. A ChatGPT subscription does not include API use. Only the script needs the API; the pilot by hand does not.

1. Sign in at platform.openai.com with the same OpenAI account (or a new one).
2. Add a payment method and buy a small amount of credit (API use is prepaid or billed monthly, apart from ChatGPT).
3. Verify the organization (Settings → Organization → General → Verify). The image models require it; it is an ID check and can take a few minutes to take effect.
4. Create an API key (API keys → Create new secret key). Copy it once; it is shown only once.
5. In PowerShell, in the game folder, set it for that window only: `$env:OPENAI_API_KEY = "sk-..."`. Do not put the key in a file in the repo and do not paste it into a chat with Claude.
6. Test with three sheets: `node tools/sprites/generate.mjs --wave 0 --limit 3`. Check the images and the token use in `sprites/incoming/_log.jsonl`.

**Cost (measured Oct 4, wave 0, medium quality):** each sheet used 343 image-output tokens, 2,048–5,036 image-input tokens (the attached references) and about 700 text tokens. At the published token prices ($30 / $8 / $5 per million) that is $0.030 with two references, $0.042 with three and $0.055 with four — $0.36 for the 10 sheets. Kris's dashboard showed about $0.12 for the same run, so the real price may be lower still. All 995 sheets: about $12–45 before re-rolls. (The first estimate, $0.20–0.35 per sheet, was for high quality and was not based on measured tokens.)

No other integration is needed. The script talks to the API directly, the intake runs locally, and the game loads the atlases as plain files.

### PowerShell commands (for Kris)

Open PowerShell, then once per window:

```
cd C:\Claude\games\Zeldara-v4
$env:OPENAI_API_KEY = "sk-..."
```

**Status (Oct 4, evening): every wave has been sent.** What is left is short: the sheets that failed, the ones that look wrong, and the new hero walk.

```
python tools/sprites/intake.py --check                  # lists what is missing or looks wrong, and prints the two commands below filled in
node tools/sprites/generate.mjs --wave 1,2              # sends only what is missing in those waves (new 6-frame hero walk, 2 failed sheets); or run tools\sprites\finish.ps1
git push origin main                                     # after Claude has committed
```

Rules of thumb:

- **How frames are cut (round 24):** each pose is cut out by its own outline, so a wing or tail that reaches over the neighbour stays with its owner; only poses that really touch are split, by a bending cut. `sprites/out/recut.json` lists the sheets where a straight cut would have failed.
- **One command per set of sheets.** A sheet already in `sprites/incoming/` is skipped, so running a command again only sends what is missing.
- On Oct 4 the per-wave commands and the "everything in one go" command ran side by side and painted many sheets twice ([251]). The script now checks again right before sending and marks the sheet it is working on, so two terminals share a list without repeating. Still, there is no need for more than one terminal: `--concurrency 4` in one window is as fast.
- `--dry-run` shows what a command would send. `--force` repaints sheets that exist.
- Speed measured: about 20 sheets a minute across several terminals. Cost measured: $0.038 per sheet at list prices (the dashboard has shown about a third of that).
- A sheet that depends on another (a character's second sheet, a rider) is sent in a later pass of the same run, once its reference exists.
- Lines starting with ✗ are failures; running the same command again retries only those.
- After new sheets arrive, tell Claude. Claude cuts them on the PC (`intake.py`), packs the atlases (`--atlas`), updates the Lab and the game, and commits.

### Waves

| Wave | What | Sheets (core) |
|---|---|---|
| 0 | Pilot (11 of 12 done) | 12 (12) |
| 1 | Heroes | 36 (36) |
| 1.5 | Mounts and riders | 31 (31) |
| 2 | Village NPCs, familiars | 54 (54) |
| 3 / 3.5 | Grasslands monsters / bosses | 151 (94) / 38 (22) |
| 4 / 4.5 | Wetlands | 159 (100) / 45 (27) |
| 5 / 5.5 | Highlands | 164 (106) / 50 (24) |
| 6 / 6.5 | Ashlands | 169 (111) / 58 (33) |
| 7.5 | Volcano bosses | 24 (13) |
| 8 | Vehicles | 4 (4) |

## Atlases and the game (built in round 23)

- Frame names: `<character>/<anim>/<facing>/<n>` (for example `hero_m/walk/s/2`, `meadow_goblin/melee/s/1`). Facings: `s` side, `f` front, `b` back, `q` three-quarter view (mirrored), `x` no facing. Feet are at the bottom centre of every cell.
- Size: a standing 1.0-scale character is 112 px tall in the atlas (`HERO_PX`). In the game one factor applies to everybody: 112 px shows 63 px tall (1.5 × the old 42 px hero, Kris's choice). No frame is stored larger than 512 px.
- Files: `assets/atlas/<name>-<n>.webp` (2048 px wide pages, WebP quality 85) and `assets/atlas/index.json`: `pages`, `chars` (`h0` = standing height, `pages`), `frames` (`[page, x, y, w, h, cellW, cellH, offX, offY]`, trimmed). Names: `heroes`, `mounts`, `village`, `companions`, `mon-w<wave>`, `boss-w<wave>`.
- Packing: `python tools/sprites/intake.py --limit=0 --atlas --budget=60` on the PC, repeated until it no longer prints "NOT FINISHED". Only atlases whose frames changed are packed again.
- The build puts the index into the game page (`ZATLAS_META`) and copies the pages to `dist/play*/assets/atlas/`. The hosted game loads them from `/assets/atlas/`; the artifact carries them as attached files.
- `ZAtlas` (`src/js/04f-atlas.js`) loads a page the first time a character on it is needed and keeps the stand-in until then. Anything without painted frames keeps its stand-in, so sheets can arrive in any order. Dev panel → "Painted sprites" or `?sprites=0` turns them off.
- What uses painted frames now: both heroes (all weapons, block, skills, spells, riding), all monsters with sheets (world and dungeons), village folk and keepers, familiars, fairies, monarchs, the parked mount. Not yet: bosses, animals, vehicles.
- Size on disk: 93 pages, 123 MB. 70 of them are boss pages (86 MB) that the game does not use yet; they are in `.gitignore` and stay on the PC. The 23 pages in use are 37 MB.
- Memory: a loaded page is up to 16 MB of graphics memory. A region's monsters are on 4–5 pages, so a session holds roughly 8–10 pages. Pages are not unloaded yet when leaving a region. To shrink: lower `HERO_PX` (96 would save about a quarter) or the WebP quality, then pack again with a higher `PACK_V`.

## Not included

- Buildings, props, tiles and projectiles (projectiles were redrawn in rounds 14–16).
- Old unused familiars (firefly, wind sprite and others map to the four spirits).
- Unpicked designs (other boss options, other fairy looks).

## If the cost is still too high (described to Kris, not chosen)

- **About 30 manual sheets:** one painted pose per character, 12–16 characters per sheet; the game moves them (bob, hop, lunge, flash). Real frames only for the two heroes. No API.
- **About 55 manual sheets:** two poses per character (standing and attacking), 6–8 per sheet. No API.
- Either can be mixed with the API plan, for example full frames for the Grasslands and single poses elsewhere.
