"""Round 84: sound-effect candidates from the Sonniss GDC library (Kris chose "both": real recordings for the physical sounds, re-worded
ElevenLabs takes for the magic). For each effect below, the named recordings are found in audio/library/*.zip (read in place, never
unpacked there), each recording is cut into its separate hits (silence between them), and up to three of them are made into candidates:

  audio/incoming/<id>.l1.mp3, .l2.mp3, .l3.mp3   cut to about the effect's length, a soft 6 ms start, a gentle fade, low rumble and the
                                                  harshest top cut (60 Hz - 11 kHz), kept under a peak of -1 dB

Then tools/audio/eth_preview.py puts them in the Lab beside the other takes.    python tools/audio/lib_picks.py   [--ids a,b] [--force]
"""
import os, sys, json, re, zipfile, glob, subprocess, hashlib, tempfile
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
LIB = os.path.join(ROOT, 'audio', 'library'); INC = os.path.join(ROOT, 'audio', 'incoming')
CACHE = os.path.join(tempfile.gettempdir(), 'zlibcache'); os.makedirs(CACHE, exist_ok=True)
args = sys.argv[1:]; FORCE = '--force' in args; ONLY = set(args[args.index('--ids') + 1].split(',')) if '--ids' in args else None
# the effect -> recordings to cut from (parts of their names), in order of preference
MAP = {
 'sfx_sword_swing': ['Airy-Whoosh Wind Gust', 'Pure SciFi-Whoosh Fast', 'Weapon 03 Slow Scrapes'],
 'sfx_sword_hit': ['Two-Handed Axe Flesh Hit', 'GOREFlsh_Flesh Drops', 'Metal Shield Block Hits'],
 'sfx_axe_swing': ['Deviant-Whoosh Flabby Slow', 'Sci-Fi Heavy Whoosh', 'Airy-Whoosh Wind Gust'],
 'sfx_axe_hit': ['Two-Handed Axe Flesh Hit', 'WOODImpt_Drops20', 'One-Handed Axe Drops'],
 'sfx_block': ['Metal Shield Block Hits', 'WOODImpt_Drops20', 'Wooden Door, Door Slams'],
 'sfx_roll': ['WOODMvmt_FoleyMovement01', 'FabricMask_Movement06', 'Airy-Whoosh Wind Gust'],
 'sfx_hurt': ['GOREFlsh_Flesh Drops', 'Noise_Punch_006', 'Fight Combo x4'],
 'sfx_fall': ['GOREFlsh_Flesh Drops', 'Medium Rock Dropping', 'Toolbox - DROP'],
 'sfx_drink': ['glass,figuredbottle,realcork', 'Glass Bottle Open', 'wood,canteen,medium,clothstrap'],
 'sfx_chop': ['WOODBrk_Snap09', 'Tree Crack and Fall', 'WOODImpt_Drops20'],
 'sfx_dig': ['Medium Rock Dropping', 'WATRMvmt_WaterRockMovement04', 'Dry Tree Branches Contact'],
 'sfx_slime': ['GORESplt_Gore Splatter', 'designed_water_impact', 'alien_tripod_texture_organic_liquid'],
 'sfx_mon_hit': ['GORESplt_Gore Splatter', 'GOREFlsh_Flesh Drops', 'Fight Combo x4'],
 'sfx_mon_armor': ['Metal Shield Block Hits', 'Iron - Thick - HIT - Hammer', 'stone_impact_steel_bar'],
 'sfx_mon_die': ['Medium Rock Dropping', 'GOREFlsh_Flesh Drops', 'debris_glass_falling'],
 'sfx_boss_stomp': ['stone_impact_041', 'Cinematic Hit_MWSFX_CF 05', 'modern_cinematic_impact_boom'],
 'sfx_boss_slam': ['stone_impact_hammer', 'Cinematic Metallic Hit, Boom', 'Medium Realistic Explosion'],
 'sfx_boss_fall': ['Large Tree Heavy Fall', 'rock_collapse_earthquake_rumble', 'Designed Wood Crash And Debris'],
 'sfx_rubble': ['rock_collapse_earthquake_rumble', 'Medium Rock Dropping', 'Designed Wood Crash And Debris'],
 'sfx_crumble': ['rock_collapse_earthquake_rumble', 'Staircase_Metal_Rumble', 'Designed Wood Crash And Debris'],
 'sfx_chest': ['Shaking Small Wooden Box', 'Coffee Tin Lid Open', 'Wooden Metal Hinge Creaks'],
 'sfx_door': ['Wooden Door, Opening and Closing', 'Wooden Metal Hinge Creaks', 'Woodstove, Door, Iron'],
 'sfx_great_door': ['Wooden Metal Hinge Creaks', 'Designed Groan', 'Wooden Door, Opening and Closing'],
 'sfx_locked': ['Metal Gate Spring Latch', 'CellDoor_LockOpen', 'tiny_gears_small_mechanism_click'],
 'sfx_lever': ['industrial_lever_switch_014', 'industrial_lever_switch_039', 'industrial_lever_switch_small'],
 'sfx_trap': ['Metal Gate Spring Latch', 'steampunk_machine_mechanical_texture_heavy_impact', 'Ricochet Hits'],
 'sfx_anvil': ['Iron - Thick - HIT - Hammer', 'Spade - HIT - Drumstick', 'Oil Barrel - HIT'],
 'sfx_bell': ['Metallic Bell', 'TheGong', 'Spade - HIT - Drumstick'],
 'sfx_splash': ['designed_water_impact', 'WATRImpt_Impact20', 'designed_water_transition_impact'],
 'sfx_step_water': ['WATRMvmt_Soft Movement', 'WATRMvmt_WaterRockMovement04', 'WATRImpt_Impact20'],
 'sfx_step_wood': ['WOODImpt_Drops20', 'WOODFric_Scrapes09', 'Chess, Contact'],
 'sfx_step_grass': ['CornLeafMovements02', 'CornStalkMovements20', 'Dry Tree Branches Contact'],
 'sfx_step_stone': ['stone_impact_015', 'Medium Rock Dropping', 'Chess, Contact'],
 'sfx_page': ['Large Book Squeak Page Turn', 'Paper Sheet Crumple', 'Big Cardboard Box Slide'],
 'sfx_ui_tab': ['Large Book Squeak Page Turn', 'UIClick_Select Middle 29', 'UI_Select_Plastic_05'],
 'sfx_ui_click': ['UIClick_Select Middle 29', 'Chess, Contact', 'UIClick_UI Click 33'],
 'sfx_ui_open': ['Large Book Squeak Page Turn', 'UIMvmt_Window Open Thin', 'Coffee Tin Lid Open'],
 'sfx_ui_close': ['Woodstove, Door, Iron', 'UI_Window_MEDIUM_SlideMetal', 'Shaking Small Wooden Box'],
 'sfx_ui_note': ['UIAlert_Confirm Middle 12', 'Metallic Bell', 'UIMisc_Feedback 36 up'],
 'sfx_ui_error': ['WOODImpt_Drops20', 'Hand Pop UI Diminished', 'Chess, Contact'],
 'sfx_ui_buy': ['Scrabble, Shotgun, Tiles, Drop', 'Dice, Contact, Die, Roll', 'Shaking Small Wooden Box'],
 'sfx_ui_equip': ['leatherbanding', 'Bar Clamp, Screw, Tighten', 'WOODMvmt_FoleyMovement01'],
 'sfx_ui_save': ['Paper Sheet Crumple', 'Chess, Contact', 'Large Book Squeak Page Turn'],
 'sfx_talk': ['Paper Sheet Crumple', 'Large Book Squeak Page Turn', 'Big Cardboard Box Slide'],
 'sfx_coin': ['Scrabble, Shotgun, Tiles, Drop', 'Dice, Contact, Die, Roll', 'SBvfe2_Glass 114'],
 'sfx_pickup': ['Chess, Contact', 'Syringe Pop', 'Hand Pop UI Diminished'],
 'sfx_gem': ['SBvfe2_Glass 114', 'Metallic Bell', 'GLASTonl_Dark Tone Thrill'],
 'sfx_hens': ['Chick Squawks', 'Rooster Call', 'Goose Baby And Adult'],
 'sfx_mt_horse': ['Quarter Horse, Mare, Snort_Uberduo_HORS_Stereo', 'Quarter Horse, Mare, Snort_Uberduo_HORS_Mono', 'Ranch Horse Pasture'],
 'sfx_hooves': ['Quarter Horse, Mare, Trot', 'Ranch Horse Pasture', 'WOODImpt_Drops20'],
 'sfx_mt_boar': ['Pig Squeal and Snort', 'Creature 05 Long Growl', 'Quarter Horse, Mare, Snort_Uberduo_HORS_Mono'],
 'sfx_bird': ['Red Kite Call', 'Rooster Call', 'Chick Squawks'],
 'sfx_mt_sky_eagle': ['Red Kite Call', 'Airy-Whoosh Wind Gust', 'Rooster Call'],
 'sfx_feast': ['INT WALLA_03', 'Circus', 'INT WALLA_05'],
 'sfx_kids': ['Zoo Kids Talking Walla'],
 'sfx_fire': ['Fire Crackling In A Woodstove', 'flare_shot_explosion', 'Watery-Whoosh FIzzy Fast'],
 'sfx_fam_fire': ['Fire Crackling In A Woodstove', 'flare_shot_explosion', 'Steam Release Short'],
 'sfx_lava': ['Fizzing Effervescent Tablets', 'alien_tripod_texture_organic_liquid', 'Fire Crackling In A Woodstove'],
 'sfx_thunder': ['Long Thunderstorm', 'Thuder Rumbles', 'Cinematic Metallic Hit, Boom'],
 'sfx_lightning': ['electrical_arc_crackling', 'electricity_texture_sizzling_crackling', 'Electromagnetic59'],
 'sfx_sp_chain_lightning': ['electrical_arc_crackling', 'electricity_texture_sizzling_crackling', 'Electromagnetic66'],
 'sfx_frost': ['Ice Sizzle', 'Glass Break Hit', 'SBvfe2_Glass 114'],
 'sfx_shield_break': ['Glass Break Hit', 'debris_glass_falling', 'Reverse Glass Effect'],
 'sfx_orbs_burst': ['Glass Break Hit', 'debris_glass_falling', 'Reverse Glass Effect'],
 'sfx_sink': ['Evolving Underwater Bubbles', 'designed_water_underwater', 'WATRDran_Drain02'],
 'sfx_water': ['designed_water_transition_impact', 'WATRImpt_Impact20', 'Watery-Whoosh FIzzy Fast'],
 'sfx_fam_water': ['designed_water_impact', 'Syringe Pop', 'WATRDrip_SingleDrip03'],
 'sfx_nature': ['Dry Tree Branches Contact', 'CornStalkMovements20', 'WOODBrk_Snap09'],
 'sfx_fam_grass': ['CornLeafMovements02', 'Dry Tree Branches Contact', 'Airy-Whoosh Wind Gust'],
 'sfx_vines': ['CornStalkMovements20', 'Dry Tree Branches Contact', 'Wooden Metal Hinge Creaks'],
 'sfx_earth': ['rock_collapse_earthquake_rumble', 'stone_impact_041', 'Medium Rock Dropping'],
 'sfx_fam_earth': ['Medium Rock Dropping', 'stone_impact_015', 'WATRMvmt_WaterRockMovement04'],
 'sfx_sk_roll': ['WOODMvmt_FoleyMovement01', 'Airy-Whoosh Wind Gust', 'FabricMask_Movement06'],
 'sfx_sk_shield_bash': ['Metal Shield Block Hits', 'WOODImpt_Drops20', 'stone_impact_015'],
 'sfx_sk_war_stomp': ['stone_impact_041', 'Cinematic Hit_MWSFX_CF 05', 'rock_collapse_earthquake_rumble'],
 'sfx_sk_smoke_bomb': ['Steam Release Short', 'Watery-Whoosh FIzzy Fast', 'Fizzing Effervescent Tablets'],
 'sfx_sk_sprint': ['Airy-Whoosh Wind Gust', 'Pure SciFi-Whoosh Fast', 'Watery-Whoosh FIzzy Fast'],
 'sfx_sk_whirlwind': ['Airy-Whoosh Wind Gust', 'Deviant-Whoosh Flabby Slow', 'Sci-Fi Heavy Whoosh'],
 'sfx_boss_roar': ['Creature 05 Long Growl', 'DragonReveal', 'Cinematic Horn'],
 'sfx_beast_growl': ['Creature 05 Long Growl', 'Pig Squeal and Snort', 'Cat Moew'],
 'sfx_skill': ['Pure SciFi-Whoosh Fast', 'Airy-Whoosh Wind Gust', 'Short_PowerUp'],
 'sfx_mana': ['Short_PowerUp', 'UIMisc_Feedback 36 up', 'SBvfe2_Glass 114'],
}

# round 84c (Kris: "new audio files are now in!"): the Sonniss GDC2023 bundle — up to three more recordings per effect, made into
# audio/incoming/<id>.l4.mp3 … .l6.mp3 (Rec 4–6 in the Lab).     python tools/audio/lib_picks.py --set 23   [--ids a,b] [--force]
MAP23 = {
 'sfx_step_grass': ['grass 3 single step 3', 'Footstep on frozen field'],
 'sfx_step_wood': ['wooden floor 1 loop'],
 'sfx_step_water': ['mud 1 loop', 'Liquid Movement Plop Slosh Single 07'],
 'sfx_sword_swing': ['SWSH_Swing 3 Large 03', 'SWSH_Woodstick Swish 03', 'WHSH_Whoosh Short 06'],
 'sfx_sword_hit': ['Sword Slash Impact V2 Assorted 18', 'Beheading 02', 'Skin Peel 04'],
 'sfx_axe_swing': ['SWSH_Swing 3 Large 03', 'WHSH_Whoosh Low 07', 'WHSH_InsJ_Whooshing_Low_Double'],
 'sfx_axe_hit': ['Heavy Body Crunch 02', 'Beheading 02', 'WOODImpt_Impact Wood 23'],
 'sfx_bow_draw': ['forest_tree_wood_texture_creaking_016'],
 'sfx_bow_shot': ['SWSH_Woodstick Swish 03', 'WHSH_Whoosh Short 06'],
 'sfx_crossbow': ['MECHClik_Tools Metal Snapping', 'SWSH_Woodstick Swish 03'],
 'sfx_arrow_hit': ['WOODImpt_Impact Wood 23', 'Sword Slash Impact V2 Assorted 18'],
 'sfx_block': ['demolisher_metal_impact_002', 'WOODImpt_Impact Wood 23', 'outer_cogwheel_single_hammer_impacts'],
 'sfx_roll': ['WHSH_Whoosh Short 06', 'Dry Bamboo Leaf Swishes 1'],
 'sfx_hurt': ['Heavy Body Crunch 02', 'Skin Peel 04'],
 'sfx_fall': ['Heavy Body Crunch 02'],
 'sfx_drink': ['Ahh, Relief, Drink, Soda, Exhale', 'BOTTLE Glass Open Scratch 01', 'Bubbles in Glass Bottle Small'],
 'sfx_dig': ['DIG002', 'DIG043', 'DIG056'],
 'sfx_chop': ['WOODImpt_Impact Wood 23', 'forest_tree_branch_leaf_foliage_impact_short_012', 'forest_wood_log_debris_falling_3_007'],
 'sfx_fire': ['Campfire', 'Fireworks_Launch_Close_01-03', 'Pressing Down Sizzling Burger'],
 'sfx_frost': ['ice_crack_break_002', 'Ice Crack hammer pull short', 'glass_impact_break_small_014'],
 'sfx_lightning': ['ElectricitySpells_Spell2-002', 'Bug zapper zapping', 'ELECArc_ElectricPower'],
 'sfx_earth': ['Earth_MeteorShower003', 'Crushed Rock - DROP - Thick - Mono', 'Massive Wall Collapsing'],
 'sfx_nature': ['forest_tree_branch_texture_1_004', 'rummaging through compact wood dry branches', 'Dry Bamboo Leaf Swishes 1'],
 'sfx_water': ['Water Spell Splash Attack Medium 2', 'WaterExplosions_Explosion2-004', 'GS projectile splash 004'],
 'sfx_light': ['Enchanting_Bells_4', 'Harp_Glissando_10b', 'eternity_synth_chimes_texture_001'],
 'sfx_dark': ['Dark Spell Dark Energy Attack', 'Dark Magic, Unsetting, Magical 06', 'Tibetan Bowl, Hits, Nightmare 2'],
 'sfx_godsbane': ['Gong, Distorted, Riser, Stinger 06', 'ELECEmf_Electric Whooshes', 'LASRMisc_Beam Transient_04'],
 'sfx_mana': ['Short Rising Flutter', 'Enchanting_Bells_4'],
 'sfx_nomana': ['Weapon Power Down 04'],
 'sfx_skill': ['W_a_P_Spell_Whoosh_19', 'WHSH_Whoosh Short 06'],
 'sfx_beast_growl': ['Monster10_Call09', 'Monster06_Attack13'],
 'sfx_beast_bite': ['Zombie Bite 04', 'Monster06_Attack13'],
 'sfx_slime': ['Liquid Movement Plop Slosh Single 07', 'biohazard_creature_organic_texture_041', 'Skin Peel 04'],
 'sfx_insect': ['Honey bee colony_close', 'ANF090', 'ANF036'],
 'sfx_undead': ['Test Subject 2  12', 'Test Subject 4 05', 'Test Subject 6 09'],
 'sfx_spirit_mon': ['Note Howl Metallic Bowed Reverb Eerie Single 06', 'Bowed Alien Metals 02', 'Dark Magic, Unsetting, Magical 01'],
 'sfx_golem': ['Crushed Rock - DROP - Thick - Mono', 'demolisher_robot_mechanical_footsteps_rusty_creak', 'demolisher_metal_impact_002'],
 'sfx_bird': ['Psittacula Krameri Single Call 002', 'Agapornis Single Call 013', 'Trichoglossus Moluccanusi Single Call 047'],
 'sfx_serpent': ['MetalCanisterPressureQuickAirReleaseSuckIn'],
 'sfx_drake': ['LargeMonster11_Roar03', 'Monster10_Call09'],
 'sfx_spit': ['PLOP Mouth Drip Dry', 'Liquid Movement Plop Slosh Single 07'],
 'sfx_summon': ['Dark Magic, Unsetting, Magical 01', 'Gong, Drone, Stinger 28', 'Dark Spell Dark Energy Attack'],
 'sfx_mon_hit': ['Sword Slash Impact V2 Assorted 18', 'Skin Peel 04', 'Heavy Body Crunch 02'],
 'sfx_mon_armor': ['demolisher_metal_impact_002', 'outer_cogwheel_single_hammer_impacts', 'Hitting Chisel With Hammer Close'],
 'sfx_mon_die': ['Monster09_Death02', 'Heavy Body Crunch 02'],
 'sfx_boss_roar': ['LargeMonster11_Roar03', 'Monster10_Call09'],
 'sfx_boss_stomp': ['Impact 021', 'GS cannonball impact 005', 'Impact 059'],
 'sfx_boss_slam': ['Impact 038', 'DSGNBoom_Cinematic Hit 2', 'Impact Hit_Chef Audio_Cinematic Sound FX_10'],
 'sfx_boss_phase': ['Gong, Distorted, Riser, Stinger 06', 'Mind Bender Stingers 06', 'Braam Dystopian Bb 001'],
 'sfx_boss_charge': ['Time Bending Risers 21', 'Disturbing Risers 06', 'String Riser 13'],
 'sfx_shield_break': ['glass_impact_break_002', 'ice_crack_break_078', 'glass_impact_break_small_014'],
 'sfx_boss_fall': ['Massive Wall Collapsing', 'building_collapse_debris_falling_rock_rubble_008', 'Monster09_Death02'],
 'sfx_fam_call': ['Enchanting_Bells_4', 'Short Rising Flutter', 'Harp_Glissando_10b'],
 'sfx_fam_grass': ['forest_tree_branch_leaf_foliage_impact_short_012', 'Dry Bamboo Leaf Swishes 1'],
 'sfx_fam_water': ['Water Spell Splash Attack Medium 2', 'Liquid Movement Plop Slosh Single 07'],
 'sfx_fam_earth': ['Crushed Rock - DROP - Thick - Mono', 'Pebbles - DROP - Dense'],
 'sfx_fam_fire': ['Fireworks_Launch_Close_01-03', 'Campfire'],
 'sfx_hooves': ['Draft Horse Trot On Concrete 03', 'Draft Horse Walk On On Grass', 'ANF082'],
 'sfx_wings': ['GS sail impact 004', 'Goose coming out of water'],
 'sfx_chest': ['Closing Latches 4', 'SHELVE Open Close Soft 01', 'Opening Tin Lid'],
 'sfx_door': ['Old Wooden Door, Squeaky, Opening, Closing', 'SHELVE Open Close Soft 01', 'Big Metal Gate Open Close 03'],
 'sfx_locked': ['Door Handle D 002', 'Closing Latches 4', 'Metal Rattle 11'],
 'sfx_stairs': ['wooden floor 1 loop'],
 'sfx_coin': ['coins_9', 'handling_coins_7', 'falling_coins_rotation_1'],
 'sfx_pickup': ['medium_wooden_pieces_on_cardboard_7', 'Castling Movements 08'],
 'sfx_gem': ['eternity_synth_chimes_texture_001', 'Enchanting_Bells_4'],
 'sfx_waystone': ['Gong, Drone, Stinger 28', 'Tibetan Bowl and Rainstick', 'Mystery Bells_JSE'],
 'sfx_travel': ['W_a_P_Epic_Whoosh_8', 'UIMvmt_Resonant Electric Whoosh', 'Time Bending Risers 21'],
 'sfx_camp': ['Traditional horns', 'Discovery_01-03_Organ-A_WET'],
 'sfx_lever': ['inner_cogwheel_turning_medium_downwards_fast', 'gear_chain_element_start_stop_014', 'Ratchet Clicking'],
 'sfx_trap': ['MECHClik_Tools Metal Snapping', 'Chains_Metal_Dropping_Close', 'Closing Latches 4'],
 'sfx_rubble': ['building_collapse_debris_falling_rock_rubble_008', 'Crushed Rock - DROP - Thick - Mono', 'annihilation_debris_falling_rock_001'],
 'sfx_splash': ['GS projectile splash 004', 'Waves Splashing Boat D', 'Liquid Movement Plop Slosh Single 07'],
 'sfx_anvil': ['Hitting Chisel With Hammer Close', 'outer_cogwheel_single_hammer_impacts', 'outer_cogwheel_multiple_hammer_impacts'],
 'sfx_lava': ['Pressing Down Sizzling Burger', 'Bubbles in Glass Bottle Small', 'Campfire'],
 'sfx_bell': ['Church Bells Ringing Village', 'Kukuljanski Bell ringers', 'Old Wall Clock 1920 Chimes'],
 'sfx_spirit_free': ['Harp_Glissando_10b', 'eternity_synth_chimes_texture_001', 'Wind, Interior, Rooftop, Soft, Whoosh'],
 'sfx_rune_wake': ['Tibetan Bowl, Hits, Nightmare 2', 'Gong, Raw, Stinger, Drone 22', 'better_world_synth_ethnic_instrument_hit'],
 'sfx_line_trace': ['eternity_synth_chimes_texture_001', 'Harp_Glissando_10b', 'Flowing Current 05'],
 'sfx_lodestar': ['Gong, Drone, Low End 25', 'Gong, Drone, Stinger 28'],
 'sfx_bifrost': ['Harp_Glissando_10b', 'Enchanting_Bells_4', 'Discovery_01-03_Organ-A_WET'],
 'sfx_orbs_burst': ['glass_impact_break_falling_debris_004', 'glass_impact_break_002', 'Impact 045'],
 'sfx_thunder': ['Thunder_Extremely-Close_03', 'ThunderPowerful', 'Thunder_Very-Close_Rain_03'],
 'sfx_vines': ['forest_tree_branch_texture_1_004', 'forest_tree_wood_texture_creaking_016', 'rummaging through compact wood dry branches'],
 'sfx_crumble': ['Massive Wall Collapsing', 'building_collapse_debris_falling_rock_008', 'Distant Destruction, Huge Groans'],
 'sfx_great_door': ['Big Metal Gate Open Close 03', 'Old Wooden Door, Squeaky, Opening, Closing', 'forest_tree_wood_texture_creaking_016'],
 'sfx_sink': ['UWM008', 'Bubbles in Glass Bottle Small', 'Super Low Rumbles, Apocalypse, Underwater'],
 'sfx_page': ['Regular Book Flip Through 001', 'Riffeling_Playing_Cards'],
 'sfx_ui_click': ['medium_wooden_pieces_on_cardboard_7', 'Positive Select Click 008', 'Castling Movements 08'],
 'sfx_ui_open': ['Regular Book Flip Through 001', 'SHELVE Open Close Soft 01'],
 'sfx_ui_close': ['SHELVE Open Close Soft 01', 'Closing Latches 4'],
 'sfx_ui_tab': ['Regular Book Flip Through 001', 'Riffeling_Playing_Cards'],
 'sfx_ui_equip': ['Metal Sword Sheath 04', 'Jiggling Belt Buckle 004', 'Chains_Metal_Movement_Distant_Very-Short'],
 'sfx_ui_buy': ['handling_coins_7', 'coins_9', 'falling_coins_rotation_1'],
 'sfx_ui_note': ['Ping Cinematic Clean thought', 'Enchanting_Bells_4'],
 'sfx_ui_save': ['Writing With Pencil 04', 'SBttp_Pencil 001'],
 'sfx_kids': ['Kindergarten Children Playing', 'EXT Children Playing, Teachers'],
 'sfx_sheep': ['Sheeps & Lamps'],
 'sfx_feast': ['Lads Banter, Down It', 'SAB_SRD009', 'Manchester Pub Beer Garden'],
 'sfx_sk_sprint': ['WHSH_Whoosh Short 06', 'WHSH_Whoosh_Chef Audio', 'SWSH_Woodstick Swish 03'],
 'sfx_sk_roll': ['WHSH_Whoosh Short 06', 'Dry Bamboo Leaf Swishes 1'],
 'sfx_sk_petal_step': ['Dry Bamboo Leaf Swishes 1', 'Harp_Glissando_10b'],
 'sfx_sk_blink': ['W_a_P_Spell_Whoosh_19', 'UIMvmt_Resonant Electric Whoosh'],
 'sfx_sk_war_stomp': ['Impact 021', 'GS cannonball impact 005', 'Crushed Rock - DROP - Thick - Mono'],
 'sfx_sk_whirlwind': ['WHSH_InsJ_Whooshing_Low_Double', 'WHSH_Whoosh 1_344', 'SWSH_Swing 3 Large 03'],
 'sfx_sk_shield_bash': ['demolisher_metal_impact_002', 'WOODImpt_Impact Wood 23', 'Heavy Body Crunch 02'],
 'sfx_sk_smoke_bomb': ['MetalCanisterPressureQuickAirReleaseSuckIn'],
 'sfx_sk_berserker': ['Gong, Raw, Stinger, Drone 22', 'DSGNBoom_Distorted Hit 07'],
 'sfx_sk_second_wind': ['Wind, Interior, Rooftop, Soft, Whoosh', 'Harp_Glissando_10b'],
 'sfx_sk_time_slow': ['Time Bending Risers 21', 'Clock-07_Ticking_Single-01', 'MUSICAL Flashback Dream Down'],
 'sfx_sk_phantom_veil': ['Dark Magic, Unsetting, Magical 01', 'Note Howl Metallic Bowed Reverb Eerie Single 06'],
 'sfx_sk_meteor': ['Earth_MeteorShower003', 'explosion_mortar_002_01', 'Impact 045'],
 'sfx_sp_frost_bolt': ['ice_crack_break_078', 'Ice Crack hammer pull short', 'W_a_P_Spell_Whoosh_19'],
 'sfx_sp_ice_shards': ['glass_impact_break_small_014', 'ice_crack_break_189', 'Ice Crack thin ice squishy'],
 'sfx_sp_blizzard': ['Strong Wind Gusts, Arctic', 'Ice_and_Wind_Drone_6', 'Wind, Interior, Rooftop, Soft, Whoosh'],
 'sfx_sp_tidal_wave': ['WaterExplosions_Explosion2-004', 'Waves Splashing Boat D', 'GS projectile splash 004'],
 'sfx_sp_fireball': ['Fireworks_Launch_Close_01-03', 'explosion_mortar_002_01'],
 'sfx_sp_flame_nova': ['explosion_mortar_002_01', 'Fireworks_Launch_Close_01-03'],
 'sfx_sp_chain_lightning': ['ElectricitySpells_Spell2-002', 'ELECEmf_Electric Whooshes', 'Bug zapper zapping'],
 'sfx_sp_thunder_step': ['Thunder_Extremely-Close_03', 'ElectricitySpells_Spell2-002', 'ELECArc_ElectricPower'],
 'sfx_sp_starfall': ['Enchanting_Bells_4', 'eternity_synth_chimes_texture_001', 'Harp_Glissando_10b'],
 'sfx_sp_thorn_snare': ['forest_tree_branch_texture_1_004', 'rummaging through compact wood dry branches', 'forest_tree_branch_leaf_foliage_impact_short_012'],
 'sfx_sp_poison_mist': ['MetalCanisterPressureQuickAirReleaseSuckIn', 'Bubbles in Glass Bottle Small'],
 'sfx_sp_stone_spikes': ['Crushed Rock - DROP - Thick - Mono', 'Impact 059', 'annihilation_debris_falling_rock_001'],
 'sfx_sp_arcane_burst': ['W_a_P_Spell_Whoosh_19', 'W_a_P_Cinematic_Whoosh_Hit_8', 'Tibetan Bowl, Hits, Nightmare 2'],
 'sfx_sp_void_orb': ['Bowed Alien Metals 02', 'Dark Spell Dark Energy Attack', 'Mind Bender Stingers 06'],
 'sfx_sp_void_rift': ['Mind Bender Stingers 06', 'Dark Spell Dark Energy Attack', 'Bowed Alien Metals 02'],
 'sfx_sp_spirit_drain': ['Note Howl Metallic Bowed Reverb Eerie Single 06', 'Dark Spell Dark Energy Attack'],
 'sfx_mt_horse': ['Draft Horse Trot On Concrete 03', 'Draft Horse Walk On On Grass'],
 'sfx_mt_alligator': ['ANF045', 'Liquid Movement Plop Slosh Single 07'],
 'sfx_mt_boar': ['ANF082', 'Monster10_Call09'],
 'sfx_mt_lava_unicorn': ['Draft Horse Trot On Concrete 03', 'Pressing Down Sizzling Burger'],
 'sfx_mt_ash_salamander': ['LargeMonster11_Roar03', 'GS sail impact 004'],
 'sfx_mt_dragon': ['LargeMonster11_Roar03', 'GS sail impact 004', 'Monster10_Call09'],
 'sfx_mt_sky_eagle': ['Psittacula Krameri Single Call 002', 'GS sail impact 004'],
 'sfx_mt_sky_glider': ['GS sail impact 004', 'Wind, Interior, Rooftop, Soft, Whoosh'],
 'sfx_mt_storm_drake': ['Monster10_Call09', 'GS sail impact 004', 'Thunder_Distant_01'],
 'sfx_mt_ember_phoenix': ['Trichoglossus Moluccanusi Single Call 047', 'GS sail impact 004', 'Fireworks_Launch_Close_01-03'],
 'sfx_mt_void_serpent': ['MetalCanisterPressureQuickAirReleaseSuckIn', 'Bowed Alien Metals 02'],
}
SET23 = '--set' in args and args[args.index('--set') + 1] == '23'
if SET23: MAP = MAP23
K0 = 4 if SET23 else 1

def ff(*a):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-y', '-loglevel', 'error', *a], capture_output=True, text=True)
    if r.returncode: raise RuntimeError(r.stderr[-300:])

INDEX = []
for z in sorted(glob.glob(os.path.join(LIB, '*.zip'))):
    with zipfile.ZipFile(z) as Z:
        for i in Z.infolist():
            if i.filename.lower().endswith(('.wav', '.flac', '.aif', '.aiff')): INDEX.append((z, i.filename, i.file_size))

def find(part):
    p = part.lower(); L = [x for x in INDEX if p in x[1].lower()]
    return min(L, key=lambda x: x[2]) if L else None

def local(e):
    """the recording as a 44.1 kHz stereo wav in a cache outside the game folder (its first 90 s at most)"""
    h = hashlib.md5(e[1].encode()).hexdigest()[:12]; dst = os.path.join(CACHE, h + '.wav')
    if os.path.isfile(dst): return dst
    raw = os.path.join(CACHE, h + '.raw' + os.path.splitext(e[1])[1])
    with zipfile.ZipFile(e[0]) as Z, Z.open(e[1]) as src, open(raw, 'wb') as out:
        while True:
            b = src.read(1 << 20)
            if not b: break
            out.write(b)
    ff('-i', raw, '-t', '90', '-ac', '2', '-ar', '44100', '-c:a', 'pcm_s16le', dst); os.remove(raw); return dst

def events(wav, secs):
    """[start, length] of each separate sound in the recording (silence between them), cut to about the effect's length"""
    vd = subprocess.run(['ffmpeg', '-hide_banner', '-i', wav, '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = re.search(r'max_volume:\s*(-?[0-9.]+) dB', vd); thr = max(-70.0, min(-20.0, (float(m.group(1)) if m else 0.0) - 30.0))      # quiet recordings: the threshold follows their loudest moment
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', wav, '-af', 'silencedetect=noise=%.1fdB:d=0.12' % thr, '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', r)]; en = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', r)]
    ev = []; s0 = 0.0
    for i in range(len(st)):
        if st[i] - s0 > 0.04: ev.append([s0, st[i] - s0])
        if i >= len(en): s0 = None; break
        s0 = en[i]
    if s0 is not None: ev.append([s0, 9999.0])
    want = max(0.25, secs); out = []
    for s, l in ev:
        l = min(l, want * 1.6 + 0.3, 8.0)
        if l >= min(0.12, want * 0.5): out.append([max(0.0, s - 0.01), l])
    return out[:12] or [[0.0, min(want * 1.6 + 0.3, 8.0)]]

def render(wav, seg, dst):
    s, l = seg; fo = max(0.03, l * 0.25)
    ff('-ss', '%.3f' % s, '-t', '%.3f' % l, '-i', wav, '-af',
       'highpass=f=60,lowpass=f=11000,afade=t=in:d=0.006,afade=t=out:st=%.3f:d=%.3f,alimiter=limit=0.89' % (max(0, l - fo), fo),
       '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', dst)

cues = {c['id']: c for c in json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'audio.json'), encoding='utf-8'))['cues'] if c['kind'] == 'sfx'}
made = 0; miss = []
for cid, parts in MAP.items():
    if ONLY and cid not in ONLY: continue
    if cid not in cues: print('?  unknown effect ' + cid); continue
    secs = float(cues[cid]['secs']); dsts = [os.path.join(INC, '%s.l%d.mp3' % (cid, k)) for k in (K0, K0 + 1, K0 + 2)]
    if not FORCE and all(os.path.isfile(d) for d in dsts[:min(3, len(parts))]): continue
    pool = []
    for p in parts:
        e = find(p)
        if not e: miss.append('%s: %s' % (cid, p)); continue
        try: w = local(e)
        except Exception as x: print('X  %s %s' % (cid, x)); continue
        pool.append((w, events(w, secs), os.path.basename(e[1])))
    picks = []
    for rnd in range(6):      # one hit from each recording first, then the next hit of each
        for w, ev, nm in pool:
            if rnd < len(ev) and len(picks) < 3: picks.append((w, ev[rnd], nm))
    for k, (w, seg, nm) in enumerate(picks[:3]):
        try: render(w, seg, dsts[k]); made += 1
        except Exception as x: print('X  %s l%d %s' % (cid, k + K0, x))
    print('%-24s %s' % (cid, ' | '.join('%s @%.1fs %.1fs' % (nm[:34], seg[0], seg[1]) for w, seg, nm in picks[:3])), flush=True)
print('\n%d candidate(s) made -> audio/incoming/<id>.l%d-%d.mp3' % (made, K0, K0 + 2))
if miss: print('not in the library: ' + '; '.join(miss))
