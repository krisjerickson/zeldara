# 15 — Sprite sizes: the rule and the audit (round 26, Oct 5, 2026)

Kris asked which painted sprites were out of balance, including sprites that change size between movements. This page states the rule now in the game and lists what was off. Numbers come from the cut sheets (`sprites/out/size_audit.json` on the PC) and from `sprites/requests/sizes.json` (made by `tools/sprites/sizes.py`).

## The rule (Kris: "match the game", "same body size always")

- **Hero:** body 63 px tall (1.5 × the old 42 px sprite).
- **Everybody else:** as tall next to the painted hero as its pixel sprite was next to the pixel hero, nudged by up to 18 percent toward equal ink area (so low, wide creatures are not drawn too wide). Hitboxes are unchanged.
- **Bosses:** the body is the boss's designed height, in the same proportion to the hero as before.
- **Mounts (the one exception, because the hero on the horse was too big):** rider and mount together 1.3 × the hero (82 px); a mount on its own 1.05 × (66 px). Following the pixel game would have made riders 1.4 to 1.95 ×.
- **Animals:** as large as the shapes they replace, in the same proportion.
- **One body size per character:** every sheet is scaled by the body it shows (the thick core without blades, arcs, sparks and rings), every pose in a view is scaled to the same body, and every frame is anchored at the body's feet. Poses meant to look different are left alone: burrow, hide, death, knocked out, swim, explode, split, rolled up, statue, revive, roll, rest, pick up, transform, perch.

## What was out of balance

### 1. Sheets painted at a different scale than the character's standing sheet

Before, a character's other sheets were assumed to be painted at the same scale as its standing sheet. They were not: of 562 such sheets, **269 differ by 12 percent or more and 142 by 25 percent or more**. A two-pose sheet (hurt, death) was usually painted much larger, so those frames showed up to 1.9 × too big; the hero's action sheets were painted smaller than the model sheet. By group, 12 percent or more: monster 175, boss 49, hero 44, npc 1.

Painted largest (now scaled down the most):

| Sheet | Was drawn |
|---|---|
| `echo_bat.extra.q` | 1.88 × too large |
| `prism_eye.extra.q` | 1.84 × too large |
| `rootbound_thrall.extra.s` | 1.79 × too large |
| `skitter_crabs.extra.q` | 1.75 × too large |
| `hedge_sprite.extra.q` | 1.75 × too large |
| `imp_bombardier.extra.s` | 1.73 × too large |
| `chessmaster.extra.s` | 1.73 × too large |
| `cloud_sylph.extra.s` | 1.72 × too large |
| `icicle_bats.extra.q` | 1.72 × too large |
| `salamander_wyrmling.extra.q` | 1.72 × too large |
| `bog_serpent.extra.q` | 1.71 × too large |
| `lantern_familiar.extra.q` | 1.70 × too large |
| `ember_sniper.extra.s` | 1.70 × too large |
| `dustwing_moth.extra.q` | 1.70 × too large |
| `storm_heron.extra.q` | 1.69 × too large |
| `flame_kite.extra.q` | 1.69 × too large |
| `slime_newts.extra.q` | 1.69 × too large |
| `swamp_witch.extra.s` | 1.69 × too large |
| `glass_jelly.extra.q` | 1.68 × too large |
| `rat_swarm.extra.q` | 1.68 × too large |
| `rock_dragon.extra.q` | 1.68 × too large |
| `bumble_knight.extra.q` | 1.68 × too large |
| `forge_artificer.extra.s` | 1.68 × too large |
| `candle_wraith.extra.q` | 1.67 × too large |
| `rain_spirit.extra.q` | 1.67 × too large |

Painted smallest (now scaled up the most):

| Sheet | Was drawn at |
|---|---|
| `hero_m.magic.s` | 0.51 × the right size |
| `hero_m.melee.s` | 0.55 × the right size |
| `hero_m.melee.b` | 0.56 × the right size |
| `hero_m.move2.s` | 0.56 × the right size |
| `hero_m.magic.b` | 0.58 × the right size |
| `hero_m.skills_a.s` | 0.58 × the right size |
| `hero_f.move2.b` | 0.58 × the right size |
| `hero_f.magic.b` | 0.59 × the right size |
| `hero_f.melee.s` | 0.59 × the right size |
| `hero_f.move2.s` | 0.59 × the right size |
| `hero_f.magic.s` | 0.60 × the right size |
| `hero_m.move2.b` | 0.60 × the right size |
| `hero_f.skills_a.s` | 0.60 × the right size |
| `hero_f.melee.b` | 0.61 × the right size |
| `hero_m.move2.f` | 0.61 × the right size |
| `hero_m.ranged.s` | 0.63 × the right size |
| `hero_m.ranged.b` | 0.63 × the right size |
| `hero_m.skills_b.s` | 0.64 × the right size |
| `hero_m.misc.s` | 0.65 × the right size |
| `hero_m.defend.s` | 0.65 × the right size |
| `hero_f.move2.f` | 0.65 × the right size |
| `hero_f.melee.f` | 0.65 × the right size |
| `hero_m.skills_c.s` | 0.66 × the right size |
| `hero_f.move.b` | 0.66 × the right size |
| `hero_f.skills_b.s` | 0.66 × the right size |

### 2. Single poses painted larger or smaller than the rest of their sheet

132 of 6787 poses were corrected by 12 percent or more (most are spell-cast poses, then melee, hover and hurt). The largest:

| Sheet | Pose | Animation | Corrected by |
|---|---|---|---|
| `reflecting_nymph.extra.s` | 1 | blink/s/0 | × 1.33 |
| `rune_eels.core.q` | 5 | move/q/3 | × 1.31 |
| `obsidian_stalker.extra.s` | 1 | blink/s/0 | × 1.31 |
| `ride_m_sky_glider.ride` | 4 | ride_side/x/3 | × 1.29 |
| `storm_heron.core.q` | 1 | idle/q/0 | × 1.27 |
| `mg_thunder_magus.core.s` | 8 | cast/s/1 | × 0.75 |
| `boss_isl_3.extra.q` | 4 | hurt/q/0 | × 1.25 |
| `flame_kite.core.q` | 3 | move/q/1 | × 1.24 |
| `mg_nova_sorceress.core.q` | 8 | cast/q/1 | × 0.76 |
| `boss_isl_4.core.s` | 8 | cast/s/1 | × 0.76 |
| `mt_sky_glider.ride` | 3 | ride_side/x/2 | × 1.24 |
| `mire_shaman.fb` | 8 | cast/b/1 | × 0.76 |
| `stone_druid.core.s` | 7 | cast/s/1 | × 0.77 |
| `mg_storm_caller.core.s` | 8 | cast/s/1 | × 0.77 |
| `mt_sky_glider.ride` | 1 | ride_side/x/0 | × 0.78 |
| `mesa_scorpion.core.q` | 8 | hurt/q/0 | × 1.22 |
| `smoke_wraith.extra.s` | 3 | blink/s/0 | × 1.22 |
| `mg_storm_caller.core.s` | 7 | cast/s/0 | × 1.21 |
| `cw_frost_queen.fb` | 8 | cast/b/1 | × 0.79 |
| `ash_moths.core.q` | 7 | melee/q/1 | × 0.79 |
| `crystal_resonator.core.q` | 1 | still/q/0 | × 1.21 |
| `moon_moth_mage.core.q` | 8 | hurt/q/0 | × 1.21 |
| `prism_eye.core.q` | 5 | float/q/3 | × 0.79 |
| `puffcap.core.q` | 7 | cast/q/1 | × 0.80 |
| `hero_m.skills_b.s` | 6 | secondwind/s/1 | × 0.80 |
| `harvest_mantis.core.q` | 7 | sweep/q/1 | × 0.80 |
| `apprentice_conjurer.core.s` | 7 | cast/s/1 | × 0.81 |
| `cw_frost_queen.core.s` | 8 | cast/s/1 | × 0.82 |
| `boss_isl_3.extra.q` | 2 | slam/q/1 | × 1.18 |
| `void_scholar.extra.s` | 3 | dodge/s/0 | × 0.82 |
| `cw_frost_queen.fb` | 4 | cast/f/1 | × 0.82 |
| `fairy_jelly_drifter.core.q` | 8 | cast/q/1 | × 0.82 |
| `boss_isl_3.extra.q` | 3 | slam/q/2 | × 1.18 |
| `fairy_ashmoth_queen.core.q` | 4 | float/q/3 | × 1.18 |
| `cw_forge_thane.core.s` | 8 | melee/s/1 | × 1.18 |
| `bell_ringer.core.s` | 3 | cast/s/0 | × 1.17 |
| `mire_shaman.fb` | 4 | cast/f/1 | × 0.83 |
| `cinder_scorpion.core.q` | 8 | hurt/q/0 | × 1.17 |
| `floatrock_gargoyle.core.q` | 5 | float/q/3 | × 1.17 |
| `dragon_priest.extra.s` | 1 | cast/s/0 | × 1.17 |

### 3. Characters whose size on screen changed

Compared with rounds 23 to 25 (one factor for all, sizes from the survey's creature-type table). 75 of 240 monsters changed by more than 20 percent.


Monsters now smaller:

| Character | Before | Now |
|---|---|---|
| Molten Mimic (`molten_mimic`) | 94 px | 65 px |
| Rock Dragon (`rock_dragon`) | 107 px | 76 px |
| Bone Ballista (`bone_ballista`) | 94 px | 68 px |
| Hole Eel (`eel_turret`) | 63 px | 46 px |
| Rune Eel Familiars (`rune_eels`) | 63 px | 46 px |
| Glass-winged Wyvern (`glass_wyvern`) | 107 px | 79 px |
| Lava Eel (`lava_eel`) | 63 px | 47 px |
| Storm Eel (`stormeel`) | 63 px | 47 px |
| Deep Mole Brute (`deep_mole`) | 94 px | 71 px |
| Dwarven Automaton (`automaton_miner`) | 94 px | 72 px |
| Sludge Brute (`sludge_brute`) | 94 px | 72 px |
| Slag Golem (`slag_golem`) | 101 px | 78 px |
| Iron Sentinel (`iron_sentinel`) | 94 px | 73 px |
| Mud Mortar Troll (`mud_mortar`) | 94 px | 73 px |
| Clay Golemling (`clay_golemling`) | 101 px | 79 px |
| Forge Automaton (`forge_automaton`) | 94 px | 74 px |
| Mud Troll (`mud_troll`) | 94 px | 74 px |
| Runic Ember Construct (`ember_construct`) | 101 px | 80 px |
| Barnacle Brute (`barnacle_brute`) | 94 px | 75 px |
| Hill Gnoll (`hill_gnoll`) | 94 px | 75 px |

Monsters now larger:

| Character | Before | Now |
|---|---|---|
| Reed Stalker (`reed_stalker`) | 32 px | 60 px |
| Harvest Mantis (`harvest_mantis`) | 32 px | 60 px |
| Bumble Knight (`bumble_knight`) | 32 px | 60 px |
| Candle Wraith (`candle_wraith`) | 32 px | 59 px |
| Lantern Familiar (`lantern_familiar`) | 32 px | 57 px |
| Crypt Crawler (`crypt_crawler`) | 32 px | 56 px |
| Chime Spirit (`chime_spirit`) | 32 px | 56 px |
| Will-o'-Wisp (`will_o_wisp`) | 32 px | 55 px |
| Dung Roller Beetle (`dung_roller`) | 32 px | 55 px |
| Pixie Hexer (`pixie_hexer`) | 32 px | 54 px |
| Hedge Sprite (`hedge_sprite`) | 32 px | 54 px |
| Flame Wisp (`flame_wisp`) | 32 px | 54 px |
| Starlight Wisp (`starlight_wisp`) | 32 px | 53 px |
| Mirror Sprite (`mirror_sprite`) | 32 px | 53 px |
| Icicle Bats (`icicle_bats`) | 35 px | 57 px |
| Starfall Shard (`starfall_shard`) | 32 px | 51 px |
| Rockslide Beetle (`rockslide_beetle`) | 32 px | 51 px |
| Sulfur Bomber Beetle (`sulfur_beetle`) | 32 px | 50 px |
| Pebble Sprite (`pebble_sprite`) | 32 px | 50 px |
| Glass Jellyfish (`glass_jelly`) | 32 px | 50 px |

- **Hero on a mount** (all 22): 82 px; before 101 px.
- **Mounts on their own** (all 11): 66 px; before 101 px.

Village folk, familiars, fairies, animals, the skiff: largest changes

| Character | Before | Now |
|---|---|---|
| Cave Bear (`animal_cave_bear`) | 101 px | 49 px |
| Ash Titan (`animal_ash_titan`) | 113 px | 55 px |
| Swamp Bear (`animal_swamp_bear`) | 94 px | 49 px |
| Deer (`animal_deer`) | 69 px | 38 px |
| Hero (girl) in the sky skiff (`veh_f_sky_ship`) | 126 px | 71 px |
| Hero (boy) in the sky skiff (`veh_m_sky_ship`) | 126 px | 71 px |
| Rock Lizard (`animal_lizard`) | 19 px | 11 px |
| Crocodile (`animal_crocodile`) | 82 px | 49 px |
| Lava Wyrm (`animal_lava_wyrm`) | 69 px | 44 px |
| Ash Crow (`animal_ash_crow`) | 25 px | 16 px |
| Nerissa, Queen of the Mere (`monarch_mere_queen`) | 76 px | 380 px |
| Pyrrhus, King of the Embers (`monarch_phoenix_sovereign`) | 76 px | 366 px |
| Cairnwyn, King of the Peaks (`monarch_crystal_archon`) | 76 px | 354 px |
| Goat Rider (`fairy_goat_rider`) | 25 px | 114 px |
| Phoenix Pixie (`fairy_phoenix_pixie`) | 25 px | 109 px |
| Frog Prince (`fairy_frog_prince_fae`) | 25 px | 106 px |
| Ember-Newt Rider (`fairy_ember_newt_rider`) | 25 px | 104 px |
| Aurora Dancer (`fairy_aurora_dancer`) | 25 px | 103 px |
| Ashmoth (`fairy_ashmoth_queen`) | 25 px | 103 px |
| Lotus Maiden (`fairy_lotus_maiden`) | 25 px | 102 px |
| Bumble Rider (`fairy_bumble_rider`) | 25 px | 102 px |
| Snow Owl Sage (`fairy_snow_owl_sage`) | 25 px | 99 px |

**Bosses:** body heights now run from 116 px (`bf_drakeling`) to 410 px (`bf_rock_dragon_4`), median 241 px. In rounds 23 to 25 bosses still used the older boss art at two thirds of these heights next to a 63 px hero, so they looked small beside the painted hero.

## Group summary (body height on screen, px)

| Group | Count | Smallest | Median | Largest |
|---|---|---|---|---|
| hero | 2 | 63 | 63 | 63 |
| rider | 22 | 82 | 82 | 82 |
| mount | 11 | 66 | 66 | 66 |
| npc | 40 | 63 | 70 | 76 |
| monster | 240 | 30 | 66 | 95 |
| boss | 76 | 116 | 241 | 410 |
| familiar | 4 | 71 | 88 | 89 |
| fairy | 23 | 59 | 99 | 380 |
| animal | 16 | 11 | 38 | 55 |
| vehicle | 2 | 71 | 71 | 71 |

The largest "fairy" entries are the three fairy monarchs (354 to 380 px): they were about 235 px next to a 42 px hero and keep that proportion.

## Changing a size

- One group: `ZAtlas.RIDE_H`, `ZAtlas.MOUNT_H`, `ZAtlas.ANIMAL_H` in `src/js/04f-atlas.js`.
- Everything: `ZAtlas.SCALE` (1.5).
- One character: its pixel sprite's scale is what the rule reads (`MX.scaleOf` by body plan for monsters, the design height `h` for a boss).
- After a change run `python tools/sprites/sizes.py` (rewrites `sizes.json`); if a character is now drawn much larger than it is stored, add it to `sprites/requests/atlas_px.json` and re-cut its sheets.


## Round 28 change

Familiars are drawn at half the size the rule gives (Kris, Oct 6): 36–45 px instead of 71–89 px. They are the second chosen exception to "match the game", after riders.
