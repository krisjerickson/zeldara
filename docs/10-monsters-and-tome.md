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
- T key or the 📖 Tome button. Chapters: Monsters (240 + 21 bosses), Mounts, Familiars, Spells, Items, Places (40 zones, the village, all sites), Characters (craftsmen + villagers).
- Entries fill in when you meet a monster (within ~280 px), own a mount/familiar/item/spell, visit a zone or site, or enter a building; locked ones show a ??? silhouette and a hint.
- Stored in `playerState.tome` (saved with the game).

## Characters (NPCs, mounts, familiars, bosses) — `07s-char-sprites.js`, `10g-characters.js`
- `CH(cat, group, id, name, spec, where, look, doing, extra)` → `CHAR_ROSTER` / `CHAR_BY_ID` (66 entries). Ids: `npc_<building type>`, `crafts_<1-4>`, `vf_*` (village folk), `isl_*`, `mt_<MOUNTS key>`, `fm_<FAMILIARS key>`, `boss_<MDEFS key>` / `boss_isl_<n>` / `boss_vr_*` / `boss_volcano_lord`.
- NPCs use the `person` body plan (pal: shirt, trousers, accent, eye, skin, hair; features for hair, beard, hats, apron/armour, tools). Frames 0/1 idle, 2/3 their job.
- Mounts: `mtFrames(spec)` → 8 frames (side walk 0–3, front 4–5, back 6–7), kinds quad / gator / bird / glider / serpent / drake. In game `CHX.mountTick` draws the mount in the player container and seats the hero (legs cropped; glider hangs above).
- `CHX.sprite(scene, id, x, y, scale, opts)` registers the image with a per-scene animator (idle, occasional job frames, facing by movement, Tome "seen" when near). `CHX.bossBody` gives bosses their sprite + aura and keeps the `setFillStyle` hit-flash API.
- Village folk: `VILLAGE_FOLK` (stage 1: elder, farmer, fisher → stage 5: 11 incl. the lighthouse keeper), placed by the village plan's props, wander, [Tab] to talk.
- Adding one: add a `CH(...)` line; for a new boss map it in `CHAR_BOSS_FOR_MDEF` (or match by name); run `tests/test_characters.py`.
