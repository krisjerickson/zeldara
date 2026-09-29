// ═══════════════════════════════════════════════════════════════════════
// ║ FAMILIAR COUNTERS (round 6) — some monsters are ready for your spirits.
// ║ Kit tokens (read by 09-monster-engine; words in the Tome + Lab):
// ║   spiritward n=3   a ward that blocks ALL familiar damage until you land
// ║                    n sword hits on it (then it's gone for good)
// ║   mirror           familiar projectiles bounce off and daze the familiar
// ║                    that fired them (stagger +60)
// ║   nullaura r=130   familiars near it fall silent (no skills) while it lives
// ║   resist el=fire red=0.75   takes 75% less familiar damage of that element
// ║   banish r=300 t=12 cd=14   (attack) knocks your nearest familiar out
// ║ (Monsters still on their original code — MON_LEGACY — have no kit.)
// ║ Mostly Highlands + Ashlands monsters, plus every elite (at spawn) and
// ║ every mage-tower master (09e). Familiars can also be staggered by slams,
// ║ sweeps, breath, rings, gusts and nets (09d) → knocked out 8–15 s.
// ═══════════════════════════════════════════════════════════════════════
var FAM_COUNTERS={
  // ── Highlands ──
  shieldwall_dwarves:'spiritward n=3', dwarf_axeman:'spiritward n=2', cave_troll:'spiritward n=3', ridge_troll:'spiritward n=2', rune_statue:'spiritward n=4', chess_rook:'spiritward n=3',
  crystal_golemling:'mirror', geode_crab:'mirror', prism_eye:'mirror', crystal_resonator:'mirror', glass_wyvern:'mirror',
  astronomer_lich:'nullaura r=130', void_scholar:'nullaura r=150', orrery:'nullaura r=120', echo_sage:'nullaura r=110',
  rockslide_beetle:'resist el=earth', gargoyle_sentry:'resist el=earth', stone_druid:'resist el=earth',
  frost_cantor:'resist el=water', blizzard_witch:'resist el=water', glacier_wyrm:'resist el=water', frost_ghoul:'resist el=water',
  chessmaster:'banish r=300 t=12 cd=14', seraph:'banish r=280 t=10 cd=16',
  // ── Ashlands ──
  magma_slug:'resist el=fire', cinder_hounds:'resist el=fire', lava_eel:'resist el=fire', salamander_wyrmling:'resist el=fire', magma_brute:'resist el=fire',
  slag_golem:'resist el=fire', salamander_warrior:'resist el=fire', magma_elemental:'resist el=fire', flame_djinn:'resist el=fire', flame_wisp:'resist el=fire', phoenix_chick:'resist el=fire',
  magma_vent:'resist el=fire', pit_serpent:'resist el=fire',
  scorched_paladin:'spiritward n=4', chain_warden:'spiritward n=3', chained_gargoyle:'spiritward n=3', basalt_golem:'spiritward n=3', forge_automaton:'spiritward n=2',
  obsidian_stalker:'mirror', glass_blademaster:'mirror', obsidian_sorceress:'mirror', obsidian_archer:'mirror',
  soul_furnace:'nullaura r=160', cinder_lich:'nullaura r=140 | banish r=300 t=12 cd=15', eclipse_witch:'nullaura r=130 | banish r=280 t=10 cd=16', smoke_wraith:'nullaura r=110', ash_oracle:'nullaura r=110',
  chainmaster:'banish r=260 t=12 cd=14', dragon_priest:'banish r=280 t=10 cd=16'
};
Object.keys(FAM_COUNTERS).forEach(function(id){ var s=MON_KIT_SRC[id]; if(typeof s==='string')MON_KIT_SRC[id]=s+' | '+FAM_COUNTERS[id]; });
// what an elite adds to its (cloned) kit when it spawns
var ELITE_FAM_COUNTER=['spiritward n=3','banish r=300 t=10 cd=16'];
// plain words (Tome + Lab)
var FAM_COUNTER_TXT={
  spiritward:function(p){ return 'Spirit Ward: blocks all familiar damage until you land '+(p.n||3)+' sword hits on it'; },
  mirror:function(p){ return 'Mirror shell: familiar projectiles bounce off and daze the familiar that fired them'; },
  nullaura:function(p){ return 'Null aura: familiars within '+Math.round((p.r||130)/32)+' tiles fall silent'; },
  resist:function(p){ return 'Resists '+(p.el||'fire')+' familiars ('+Math.round((p.red||0.75)*100)+'% less damage)'; },
  banish:function(p){ return 'Banish: knocks your nearest familiar out for '+(p.t||12)+' s'; }
};
