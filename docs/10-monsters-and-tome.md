# Monsters, characters, spawning & the Zeldara Tome (Phase 4, Sept 2026)

## The roster
- 240 monsters, all kept by Kris: per quadrant 20 **mainland**, 10 **dungeon melee**, 10 **dungeon ranged**, 20 **tower** (magic).
- Data: `src/js/07n–07q-roster-*.js` (`MON(q, seg, role, tier, id, name, sprite, tags, look, move, attack, defend, special, reuse)`).
- Tags: `pack` (spawns in groups with an Alpha), `night` (only out at night), `T:<where>` (terrain / zones it favours).
- Pixel stand-in sprites: `07m-monster-sprites.js` paints 4 frames (idle ×2, wind-up, strike) from a small spec (body plan + palette + features + attack effect). ChatGPT sprites are parked.
- Difficulty by quadrant: Grasslands one mechanic each → Wetlands status effects → Highlands terrain, shields, knockback → Ashlands combined mechanics, rebirth, armour-break. Tiers ★1–5 within a quadrant.

## The engine (`09-monster-engine.js`)
- One engine for the world, dungeons and towers; scenes plug in through `MX.A(scene)` (player position, collision, damage, iframes).
- A **kit** per monster (`07r-monster-kits.js`): `"move k=v | attack k=v | defence k=v"`.
  - Moves: chase, lumber, hover, drift, still, guard, pulse, zigzag, flit, kite, orbit, charge, burrow, ambush, disguise, perch, blink, swim (water or lava), leap, chessL, rook, weeping, roll.
  - Attacks: melee (combos, steal), lunge, sweep, slam, shoot (spread, homing, ricochet, pierce, stick, zones), lob (landing circle, zones, summons, obstacles), beam, breath, ring (with a gap), pull, gust, grab, summon, trap (snare / mine), cloud, drain, strike (if you stand still), marks, swap, wall, echo.
  - Defences: front, armor, reflect, immune, dodge, tiny, thorns, bubble, weak, revive (stand on the bones to stop it), enrage, flee, split, explode, regen, aura, heal (allies), lure.
- Player effects: slow, root/freeze, poison, burn, blind, charm (reversed controls), shrink (−30% damage), mark (+25% damage taken), frog.
- Damage goes through `mon.hp` (a setter), so every existing player attack, spell and familiar works with the defences unchanged.
- 15 originals keep their own code (`MON_LEGACY`): Goblin, Skeleton ×2, Bog Serpent, Mud Troll, Swamp Witch, Stone Golem, Harpy, Iron Sentinel, Storm Mage, Fire Imp, Ash Wraith, Lava Titan, Rock Dragon, Dark Warlock (boss ones scaled to normal monsters; the real bosses still guard the ★ sites).

## Spawning
- World (`10f-world-monsters.js`): ~200 per region in pods. 80% this quadrant's mainland · 15% this quadrant's dungeon/tower monsters · 5% visitors from another quadrant, scaled to the local level. Mainland picks are weighted by the zone and nearby water/lava matching the `T:` tag.
- Dungeons/towers (`12-scene-dungeon.js _spawnRosterMonster`): the same rule with the site's segment (dungeon → melee+ranged, tower → magic).

## Adding a monster
1. Add a `MON(...)` line to the quadrant file (sprite spec + texts).
2. Add a kit line with `MKIT(id, '...')` in `07r-monster-kits.js` (or map it in `MON_LEGACY`).
3. Run `python tests/test_monsters.py <id>` — it checks that it spawns, uses its kit and acts on the player.

## The Zeldara Tome (`26-tome.js`)
- T key or the 📖 Tome button. Chapters (each grouped by quadrant, light colour per quadrant): Monsters (240 + 56 bosses: guardians, evolved phase forms, castle wardens), Mounts, Familiars, Spells, Items, Places (40 zones, the village, all sites, 20 boss arenas, 60 camp types, 12 castles), Characters (craftsmen + villagers).
- Entries fill in when you meet a monster (within ~280 px), own a mount/familiar/item/spell, visit a zone or site, or enter a building; locked ones show a ??? silhouette and a hint.
- Stored in `playerState.tome` (saved with the game).

## Characters (NPCs, mounts, familiars, bosses) — `07s-char-sprites.js`, `10g-characters.js`
- `CH(cat, group, id, name, spec, where, look, doing, extra)` → `CHAR_ROSTER` / `CHAR_BY_ID` (113 entries: 41 NPCs incl. 12 castle teachers `tc_*`, 11 mounts, 5 familiars, 56 bosses incl. 23 evolved forms `bf_*` and 12 castle wardens `cw_*`). Ids: `npc_<building type>`, `crafts_<1-4>`, `vf_*` (village folk), `isl_*`, `mt_<MOUNTS key>`, `fm_<FAMILIARS key>`, `boss_<MDEFS key>` / `boss_isl_<n>` / `boss_vr_*` / `boss_volcano_lord`.
- NPCs use the `person` body plan (pal: shirt, trousers, accent, eye, skin, hair; features for hair, beard, hats, apron/armour, tools). Frames 0/1 idle, 2/3 their job.
- Mounts: `mtFrames(spec)` → 10 frames (side walk 0–3, front 4–5, back 6–7, front head-only 8–9 drawn over the rider), kinds quad / gator / bird / glider / serpent / drake. In game `CHX.mountTick` draws the mount in the player container and seats the hero on its back (`MOUNT_SEAT` per kind, legs cropped to 58%; the head is drawn over the rider in the front view; glider hangs above).
- `CHX.sprite(scene, id, x, y, scale, opts)` registers the image with a per-scene animator (idle, occasional job frames, facing by movement, Tome "seen" when near). `CHX.bossBody` gives bosses their sprite + aura and keeps the `setFillStyle` hit-flash API.
- Village folk: `VILLAGE_FOLK` (stage 1: elder, farmer, fisher → stage 5: 11 incl. the lighthouse keeper), placed by the village plan's props, wander, [Tab] to talk.
- Adding one: add a `CH(...)` line; for a new boss map it in `CHAR_BOSS_FOR_MDEF` (or match by name); run `tests/test_characters.py`.

## Round 2 additions (Sept 28 2026)
- **Split once:** children of a splitting monster get `noSplit` and just die.
- **Multi-phase guardians** (`09b-boss-phases.js`): `BOSS_PHASES[key].phases[n] = {form, arena, hp, sc, bars, allies, intro, kit, ev}`. Each phase form is registered as an engine monster `bp_<key>_<n>` (allies `…_a<j>`). Phase 2+ restarts the Dungeon scene with `{bossPhase}` in its arena (`BOSS_ARENAS`, `07u-boss-arenas.js`). Damage type comes from `MX._src` ('melee' / 'ranged' / 'spell'); extra health bars (`mon.bars`) take full damage only from their type (`BOSS_BAR_INFO`), 15% otherwise.
- **Camps** (`10h-world-camps.js`): `CAMP_TYPES[q]` (15 each) — guards are engine monsters with `campId` + a short leash; `_campTick` handles loot pickup and respawn; `campCelebrate()` = fanfare (WebAudio `SFX`) + confetti + `#camp-banner`.
- **Castle wardens** (`09c-castles.js`): `cwd_<key>` engine monsters with the kit in `CASTLE_ISLANDS[key].kit`; one phase; `CastleRun.placeTeacher / claim / learn`.

## Round 3 (Sept 28 2026)
- **Line of sight:** `_heroLOS(scene,x0,y0,x1,y1,high)` / `_heroWallAt` — `LOS_WALL_TILES` (walls, cliffs, rocks, props) for the hero; `high` = only walls + cliffs (flying spirits).
- **Engine rules:** shooters (all attacks ranged, not kite/still/burrow…) back off inside `k.move.p.keep||140`; `summon` fires once per monster (`m.summoned`, bosses exempt), helpers are `temp` + `noSplit`; world respawn waits until the player is 30+ tiles away. New move `seek` (walk to `mon._seek`, fight you if close) for trial wisps.
- **Familiars** (`07w-spirits.js` data + painters, `09d-familiars.js` runtime): `SPIRIT_DESIGNS` (12), `FAMILIAR_PICK`, `FAM_SKILLS[element]` (kinds proj / nova / heal / ward / rain / aura / wave / laststand), `_famCast`, `_heroFamiliarsTick` (hover orbit or trail-follow), wards refund the next hit.
- **Fairies** (`10i-world-fairies.js`): `FAIRY_DESIGNS` (40) + `FAIRY_PICK`, fairies on `wd.waystones` + `wd.runeSpots` (each zone's stamp spawn), `FAIRY_OBJECTS` / `FAIRY_KING_OBJECTS` → `_digSpots`, `FairyTalk` dialogue (pauses the game), trials `_trialStart/_trialTick/_trialEnd` (`rune_targets`, `guardian`, `echo_path`, `orb_harvest`, `hold_circle`, `king`), `_wmFairyMarks` on the world map.

## Round 4 (Sept 28 2026)
- Tome monster pages add **Immune to / Weak to / Defences** from the kit (`_tomeDefLines(rid)`); immune/weak `k=fire` affect burning (`_heroBurn`).
- Elites (`_bonusMiniBossKey`): HP `base×8 + 60×quadrant`, `_base` = the plain monster; the bonus site's last floor is `ELITE_ARENAS[quadrant]` with `2+quadrant` kin (`_spawnEliteKin`); boss HUD in `elite` style.
