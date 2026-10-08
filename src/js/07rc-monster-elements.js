// ═══════════════════════════════════════════════════════════════════════
// ║ 07rc-monster-elements.js — the element(s) of every monster (round 37). Shared by the game and the Lab.
// ║ Kris (Oct 7): monsters may have up to TWO elements — unique monsters of the adventure sites especially
// ║ (castle wardens, tower masters, site elites, the strongest tower and dungeon monsters); BOSSES have ONE.
// ║ First pass by name and look, then checked by hand; edit the tables here. [] = no element (never weak, never resists).
// ║   ZEL.mon(mon)      the elements of a live monster (cached on it)
// ║   ZEL.monBoss(mon)  true for a realm boss (one element, the gentle boss steps)
// ║   ZEL.ofId(id)      the elements of a roster id / boss key (Tome, Lab)
// ═══════════════════════════════════════════════════════════════════════
var MON_EL={
  // realm 1 · open land
  thistle_hog:['grass'],puffcap:['grass'],hedge_sprite:['grass'],tunnel_nipper:['grass'],scarecrow_warden:['grass'],bumble_knight:['grass'],dustwing_moth:['storm'],runestone_crawler:['earth'],jackalope:['grass'],kite_rider:['storm'],bramble_wolf:['grass'],clover_slime:['grass'],harvest_mantis:['grass'],pooka:['grass'],hill_gnoll:['earth'],echo_phantom:['shadow'],floatrock_gargoyle:['earth'],dung_roller:['grass'],
  // realm 1 · towers
  pixie_hexer:['shadow'],glyph_scribe:[],dawn_acolyte:['storm'],grimoire:['shadow'],candle_wraith:['fire','shadow'],ley_mote:['storm'],mirror_sprite:['shadow'],petal_witch:['grass'],clockwork_owl:['storm'],fae_enchantress:['grass'],sentry_orb:['earth'],apprentice_conjurer:[],starlight_wisp:['storm'],ink_imp:['shadow'],wind_sylph:['storm'],illusionist_gnome:['shadow'],rose_dryad:['grass'],lantern_familiar:['fire'],chime_spirit:['storm'],wand_knight:['storm'],
  // realm 1 · dungeons
  goblin_cutthroat:['earth'],tunnel_brute:['earth'],root_gnasher:['grass'],bone_hound:['shadow'],shield_goblin:['earth'],capmaul:['grass'],rat_swarm:[],barrow_knight:['shadow'],clay_golemling:['earth'],boarling:['grass'],goblin_slinger:['earth'],spore_spitter:['grass'],blowgun_goblin:['earth'],glowworm:['grass'],bone_ballista:['shadow'],trap_kobold:['earth'],hive_keeper:['grass'],shade_sniper:['shadow'],pebble_sprite:['earth'],
  // realm 2 · open land
  lily_lurker:['grass'],glowfrog:['water'],leech_swarm:['water'],mire_crab:['water'],will_o_wisp:['fire'],peat_walker:['grass'],shellback:['grass'],mangrove_strangler:['grass'],bloodgnats:['shadow'],reed_stalker:['grass'],waterlogged_revenant:['shadow'],stormeel:['storm'],heron_knight:['water'],moss_golem:['grass','earth'],slime_newts:['water'],stilt_bandit:[],fog_phantom:['shadow'],bog_hydra:['water'],
  // realm 2 · towers
  tide_caller:['water'],mist_weaver:['water'],moon_moth_mage:['shadow'],hex_toad:['shadow'],rain_spirit:['water'],reflecting_nymph:['water','shadow'],leech_warlock:['shadow'],bubble_siren:['water'],lily_oracle:['grass'],mire_shaman:['shadow'],coral_enchantress:['water'],water_elemental:['water'],frost_lotus:['water','grass'],kelp_wraith:['water','shadow'],rune_eels:['water'],glass_jelly:['water'],plague_alchemist:['shadow','grass'],storm_heron:['storm','water'],bell_ringer:['water','shadow'],
  // realm 2 · dungeons
  drowned_guard:['shadow'],sludge_brute:['earth'],gator_raider:[],crypt_crawler:['shadow'],leech_knight:['shadow'],mold_zombie:['shadow'],barnacle_brute:['water'],rootbound_thrall:['grass'],skitter_crabs:['water'],naga_guard:['water'],spitfrog:['water'],harpoon_lizard:['water'],bubble_crab:['water'],mud_mortar:['earth'],dart_naga:['water'],coral_archer:['water'],ink_squid:['water'],eel_turret:['water'],gnat_caller:['shadow'],lantern_thrower:['fire'],
  // realm 3 · open land
  crag_ram:['earth'],frost_wolf:['water'],geode_crab:['earth'],gale_roc:['storm'],rockslide_beetle:['earth'],yeti_stomper:['water'],chess_knight:['earth'],chess_rook:['earth'],starfall_shard:['storm'],automaton_miner:['earth'],snow_owl:['shadow'],harp_spectre:['storm'],ridge_troll:['earth'],craglings:['earth'],glacier_wyrm:['water'],bristleback_bear:['earth'],mesa_scorpion:['earth'],glass_wyvern:['storm','earth'],
  // realm 3 · towers
  astronomer_lich:['shadow','storm'],frost_cantor:['water'],gravity_adept:['earth'],cloud_sylph:['storm'],chessmaster:['earth','shadow'],crystal_resonator:['earth'],wind_monk:['storm'],aurora_spirit:['storm'],orrery:['storm'],stone_druid:['earth'],blizzard_witch:['water','shadow'],echo_sage:['storm'],seraph:['storm'],rune_statue:['earth'],telescope_eye:['storm'],hailstone_imp:['water'],spellblade:['water'],thunderbird:['storm'],void_scholar:['shadow'],
  // realm 3 · dungeons
  dwarf_axeman:['shadow'],crystal_golemling:['earth'],deep_mole:['earth'],frost_ghoul:['water'],gargoyle_sentry:['earth'],cave_troll:['earth'],labyrinth_bull:['earth'],crystal_spider:['earth'],shieldwall_dwarves:['earth'],rock_hopper:['earth'],dwarf_crossbow:['shadow'],geode_spitter:['earth'],icicle_bats:['water'],minecart_bomber:['earth','fire'],echo_bat:['storm'],boulder_goblin:['earth'],frost_archer:['water'],lantern_kobold:['fire'],prism_eye:['storm'],
  // realm 4 · open land
  magma_slug:['fire'],cinder_hounds:['fire'],obsidian_stalker:['earth'],sulfur_toad:['fire'],ember_mimic:['fire'],basalt_golem:['earth'],bone_revenant:['shadow'],forge_automaton:['fire'],ash_moths:['fire'],lava_eel:['fire'],chained_gargoyle:['earth'],pyre_cultist:['shadow'],salamander_wyrmling:['fire'],cinder_scorpion:['fire'],scorched_paladin:['fire'],phoenix_chick:['fire'],
  // realm 4 · towers
  pyromancer:['fire'],obsidian_sorceress:['earth','shadow'],cinder_lich:['fire','shadow'],magma_elemental:['fire','earth'],forge_artificer:['fire','earth'],flame_djinn:['fire','storm'],smoke_wraith:['fire','shadow'],ash_oracle:['fire'],imp_summoner:['earth'],dragon_priest:['shadow','fire'],soul_furnace:['fire','shadow'],eclipse_witch:['shadow'],salamander_sage:['fire'],meteor_caller:['fire','storm'],chainmaster:['shadow'],phoenix_mage:['fire'],volcanic_hexer:['shadow','fire'],ember_construct:['fire','earth'],flame_wisp:['fire'],
  // realm 4 · dungeons
  magma_brute:['fire','earth'],glass_blademaster:['earth'],hellhound:['fire','shadow'],ember_berserker:['fire'],bonepit_ghoul:['shadow'],slag_golem:['fire'],salamander_warrior:['fire'],chain_warden:['shadow'],charred_zombies:['shadow'],molten_mimic:['fire'],imp_bombardier:['shadow'],magma_vent:['fire'],obsidian_archer:['earth'],ember_sniper:['fire','shadow'],sulfur_beetle:['fire'],cinder_slinger:['fire'],pit_serpent:['fire'],ash_crossbow:['fire'],brimstone_eye:['earth','fire'],flame_kite:['fire'],
  _:[]
};
// realm bosses: one element each (every later form keeps it)
var BOSS_EL={goblin_king:'earth',dark_warlock:'shadow',swamp_witch:'water',storm_mage:'storm',rock_dragon:'earth',iron_sentinel:'storm',lava_titan:'fire',shadow_lord:'shadow',
  isl_boss_1:'grass',isl_boss_2:'water',isl_boss_3:'earth',isl_boss_4:'fire',volcano:'fire'};
// castle wardens (unique: up to two)
var WARDEN_EL={q1_b:['grass'],q1_c:['grass','fire'],q1_d:['earth','storm'],q2_b:['water','grass'],q2_c:['water','shadow'],q2_d:['grass','water'],
  q3_b:['fire','earth'],q3_c:['water'],q3_d:['storm'],q4_b:['earth','shadow'],q4_c:['fire'],q4_d:['shadow']};
// mage-tower masters (unique: up to two) — the first is the element of the spell they teach
var MASTER_EL={rime_spire:['water'],scriptorium:['storm'],hearthfire:['fire'],rootspire:['grass'],conductor:['storm'],frozen_belfry:['water'],mire_tower:['grass','water'],drowned_lighthouse:['water','shadow'],
  ember_observatory:['fire','storm'],hollow_spire:['shadow'],lightning_rod:['storm'],monolith:['earth'],frostbitten_crown:['water','storm'],rift_tower:['shadow'],crimson_spire:['shadow'],astral_spire:['storm']};
// the old sixteen (still used as phase-one bosses and in a few old places)
var LEGACY_EL={goblin:'earth',skeleton:'shadow',mud_troll:'earth',bog_serpent:'water',stone_golem:'earth',harpy:'storm',fire_imp:'fire',ash_wraith:'shadow'};
// the four site elites (the guardians of the treasure vaults): Barrow Wight, Bog Troll Chieftain, Runic Stone Golem, Ash Wraith Lord
var ELITE_EL={1:['shadow','earth'],2:['earth','water'],3:['earth','storm'],4:['shadow','fire']};
if(typeof ZEL!=='undefined'){
  ZEL.ofId=function(id){ if(!id)return []; id=String(id).replace(/^mx_/,''); if(MON_EL[id])return MON_EL[id]; var m;
    if((m=id.match(/^(?:cwd?_)(q\d_[a-z])$/))&&WARDEN_EL[m[1]])return WARDEN_EL[m[1]];
    if((m=id.match(/^mg[bi]?_(.+)$/))&&MASTER_EL[m[1]])return m[0].indexOf('mgi_')===0?[MASTER_EL[m[1]][0]]:MASTER_EL[m[1]];
    if((m=id.match(/^(?:bp_|bf_|boss_)?([a-z_]+?)(?:_\d+)?(?:_a\d+)?$/))&&BOSS_EL[m[1]])return [BOSS_EL[m[1]]];
    if(BOSS_EL[id])return [BOSS_EL[id]]; if(LEGACY_EL[id])return [LEGACY_EL[id]];
    if((m=id.match(/^elite_(\d)/))&&ELITE_EL[m[1]])return ELITE_EL[m[1]];
    if(/^(boss_)?vr_|volcano/.test(id))return ['fire'];
    return []; },
  ZEL.bossKeyOf=function(mon){ var k=mon&&(mon.bossKey||''); return k; };
  ZEL.monBoss=function(mon){ if(!mon||!(mon.isBoss||(mon.def&&mon.def.boss)))return false; var k=String(mon.bossKey||''); return !(k.indexOf('cw_')===0||k.indexOf('mg_')===0||mon.mageBoss||mon._trialMob||(mon.def&&mon.def.elite)); };
  ZEL.mon=function(mon){ if(!mon)return []; if(mon._els)return mon._els; var e=[], k=mon.bossKey?String(mon.bossKey):'';
    if(mon.def&&mon.def.elite&&ELITE_EL[mon.def.sec])return (mon._els=ELITE_EL[mon.def.sec]);
    if(k.indexOf('cw_')===0)e=WARDEN_EL[k.slice(3)]||[];
    else if(k.indexOf('mg_')===0)e=MASTER_EL[k.slice(3)]||[];
    else if(k&&BOSS_EL[k])e=[BOSS_EL[k]];
    if(!e.length&&mon.rid)e=ZEL.ofId(mon.rid);
    if(!e.length&&mon.type)e=ZEL.ofId(mon.type);
    if(!e.length&&mon.def&&mon.def._rid)e=ZEL.ofId(mon.def._rid);
    if(!e.length&&mon.isBoss&&mon.def&&/volcano|lava|magma|ember|cinder|pyro|inferno|ashen|obsidian/i.test(mon.def.name||''))e=['fire'];
    e=e.slice(0,2);
    if(ZEL.monBoss(mon))e=e.slice(0,1);
    mon._els=e; return e; };
}
