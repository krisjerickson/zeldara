// ═══════════════════════════════════════════════════════════════════════
// ║ 03b-elements.js — the element system (round 37). Shared by the game and the Lab.
// ║ Kris (Oct 7): six elements; Water > Fire > Grass > Earth > Water, Storm and Shadow against each other;
// ║ monsters and equipment may have up to TWO elements, bosses one; one piece of each equipment type has ALL
// ║ elements (the Sovereign set — how it is obtained comes later); crossbows and axes get a real place;
// ║ gems are adventuring rewards and hard to get at the jeweller; familiars must not get much stronger.
// ║
// ║   ZEL.LIST / ZEL.E        the six elements (name, colour, icon, what it beats, its gem and rare gem, its status)
// ║   ZEL.tier(att,def,boss)  −2 … +2: how an attack with elements `att` does against a monster with elements `def`
// ║   ZEL.TIER                the four named steps:  ▲▲ Bane · ▲ Weak · ▽ Resists · ▽▽ Warded
// ║   ZEL.item(it)            the elements of an item (weapons: what it strikes with)
// ║   ZEL.res(it)             the resistances of an item {element: share}
// ║   ZEL.SPELL / ZEL.SKILL   element of each spell and skill
// ║   ITEMS_R37               the new items (axes, crossbows, staffs, gems, draughts, the Sovereign set …)
// ║   Gem-set gear: an id like  iron_helm~fire  or  band_ring~fire~storm  is made on demand from its base item
// ║   (ITEMS is wrapped so ITEMS['iron_helm~fire'] just works; saves keep the id as a plain string).
// ║ The monsters' elements are in 07rc-monster-elements.js; the fight rules in 04j-hit.js.
// ═══════════════════════════════════════════════════════════════════════
var ZEL={
  LIST:['fire','water','grass','earth','storm','shadow'],
  E:{
    fire:  {n:'Fire',  col:'#ff7a3a',ic:'el_fire',  em:'🔥',beats:'grass', st:'burn',   stN:'burns',          gem:'gem_ruby',    rare:'fire_opal',    realm:4},
    water: {n:'Water', col:'#5ab8ff',ic:'el_water', em:'💧',beats:'fire',  st:'slow',   stN:'slows',          gem:'gem_sapphire',rare:'pearl',        realm:2},
    grass: {n:'Grass', col:'#7ad85a',ic:'el_grass', em:'🌿',beats:'earth', st:'root',   stN:'roots',          gem:'gem_emerald', rare:'gem_heartseed',realm:1},
    earth: {n:'Earth', col:'#d8a060',ic:'el_earth', em:'🪨',beats:'water', st:'stagger',stN:'staggers',       gem:'gem_amber',   rare:'rough_crystal',realm:3},
    storm: {n:'Storm', col:'#ffe060',ic:'el_storm', em:'⚡',beats:'shadow',st:'chain',  stN:'arcs to a second foe',gem:'gem_topaz',rare:'skystone',   realm:0},
    shadow:{n:'Shadow',col:'#b080ff',ic:'el_shadow',em:'🌑',beats:'storm', st:'drain',  stN:'drains health',  gem:'gem_onyx',    rare:'moon_shard',   realm:0}
  },
  // the four named steps (Kris: "for 2X weak or resistance, come up with another way to represent this"):
  // a mark beside the damage number and a word in the Tome — never a bare multiplier.
  TIER:{'2':{n:'Bane',mark:'▲▲',m:2.0,txt:'Bane — struck twice over'},'1':{n:'Weak',mark:'▲',m:1.5,txt:'Weak'},
        '-1':{n:'Resists',mark:'▽',m:0.6,txt:'Resists'},'-2':{n:'Warded',mark:'▽▽',m:0.35,txt:'Warded — barely scratched'}},
  BOSS_M:{'1':1.25,'-1':0.8},          // bosses: one element, a nudge only
  FAM_M:{'2':1.2,'1':1.2},             // familiars gain little from a weakness (they lose fully to a resistance)
  RES_PIECE:0.12, RES_GEM:0.10, RES_CAP:0.5, POW_GEM:0.08, STAFF_POW:0.25, PROC:0.25,
  // a beats d: +1 · same element, or d beats a: −1 · otherwise 0
  rel:function(a,d){ var E=ZEL.E; if(!E[a]||!E[d])return 0; if(E[a].beats===d)return 1; if(a===d||E[d].beats===a)return -1; return 0; },
  els:function(x){ if(!x)return []; if(x==='all')return ZEL.LIST.slice(); if(typeof x==='string')return ZEL.E[x]?[x]:[]; return x.filter(function(e){ return !!ZEL.E[e]; }); },
  // A weapon strikes with its best element; when two of its elements both find a weakness the foe is Bane.
  // A monster's two elements add up: weak + resist cancel, resist + resist is Warded.
  tier:function(att,def,boss){ var A=ZEL.els(att), D=ZEL.els(def); if(!A.length||!D.length)return 0;
    var best=-9, pos=0; A.forEach(function(a){ var s=0; D.forEach(function(d){ s+=ZEL.rel(a,d); }); s=Math.max(-2,Math.min(2,s)); if(s>0)pos++; if(s>best)best=s; });
    var t=best; if(best>0&&pos>=2)t=best+1; if(att==='all'||A.length>2)t=Math.min(t,1); t=Math.max(-2,Math.min(2,t));
    if(boss)t=Math.max(-1,Math.min(1,t)); return t; },
  // the numbers of the current difficulty level (04g ZDIFF[].el; Wayfarer = the numbers above)
  dl:function(){ try{ if(typeof ZDiff!=='undefined'){ var D=ZDiff.cur(); if(D&&D.el)return D.el; } }catch(e){} return {bane:ZEL.TIER['2'].m,weak:ZEL.TIER['1'].m,res:ZEL.TIER['-1'].m,ward:ZEL.TIER['-2'].m,bossUp:ZEL.BOSS_M['1'],bossDown:ZEL.BOSS_M['-1'],resCap:ZEL.RES_CAP}; },
  stepM:function(t){ var E=ZEL.dl(); return t>=2?E.bane:t===1?E.weak:t===-1?E.res:t<=-2?E.ward:1; },
  resCap:function(){ return ZEL.dl().resCap; },
  mult:function(t,kind,boss){ if(!t)return 1; var k=String(t), E=ZEL.dl(); if(boss)return t>0?E.bossUp:E.bossDown; if(kind==='familiar'&&t>0)return ZEL.FAM_M[k]||1; return ZEL.stepM(t); },
  // the element (of `att`) that does best against `def` — the one whose status and colour the hit shows
  bestEl:function(att,def){ var A=ZEL.els(att), D=ZEL.els(def), b=A[0]||null, bs=-9; A.forEach(function(a){ var s=0; D.forEach(function(d){ s+=ZEL.rel(a,d); }); if(s>bs){ bs=s; b=a; } }); return b; },
  item:function(it){ if(!it)return []; return it.el==='all'?'all':(it.el||[]); },
  res:function(it){ return (it&&it.res)||null; },
  name:function(els){ var L=els==='all'?['All elements']:ZEL.els(els).map(function(e){ return ZEL.E[e].n; }); return L.join(' & '); },
  // what a single element is weak to / resists (for the Tome)
  weakTo:function(d){ return ZEL.LIST.filter(function(a){ return ZEL.rel(a,d)>0; }); },
  resists:function(d){ return ZEL.LIST.filter(function(a){ return ZEL.rel(a,d)<0; }); },
  // every element's total against a monster with elements `def`: {fire:1, water:-2, …}
  table:function(def,boss){ var o={}; ZEL.LIST.forEach(function(a){ o[a]=ZEL.tier([a],def,boss); }); return o; },
  SPELL:{frost_bolt:'water',ice_shards:'water',tidal_wave:'water',blizzard:'water',fireball:'fire',flame_nova:'fire',thorn_snare:'grass',poison_mist:'grass',stone_spikes:'earth',
         chain_lightning:'storm',thunder_step:'storm',starfall:'storm',void_orb:'shadow',void_rift:'shadow',spirit_drain:'shadow',arcane_burst:null,meteor:'fire'},
  SKILL:{war_stomp:'earth',meteor:'fire',whirlwind:'storm',smoke_bomb:'shadow',phantom_veil:'shadow'},
  AMMO:{fire:'fire',cold:'water',thorn:'grass',shock:'storm'},
  FAM:{grass:'grass',water:'water',earth:'earth',fire:'fire'},
  // status a monster puts on the hero → the element whose resistance shortens it
  ST_EL:{burn:'fire',lava:'fire',slow:'water',freeze:'water',slip:'water',poison:'grass',root:'grass',stun:'earth',shrink:'shadow',frog:'shadow',blind:'shadow',mark:'shadow'}
};

// ── elements and resistances of the items that were already in the game (their names promised them) ──
(function(){ if(typeof ITEMS==='undefined')return;
  function W(ids,el,d){ ids.split(' ').forEach(function(k){ var it=ITEMS[k]; if(!it)return; it.el=el==='all'?'all':[el]; it.element=el==='all'?'all':ZEL.E[el].n.toLowerCase(); if(d&&!it.elementDmg)it.elementDmg=d; }); }
  function R(ids,el,v){ ids.split(' ').forEach(function(k){ var it=ITEMS[k]; if(!it)return; it.res=it.res||{}; it.res[el]=v||ZEL.RES_PIECE; }); }
  W('flame_iron inferno_edge magma_cleaver volcano_lord fire_gauntlets ruby_ring ember_staff','fire'); W('flame_blade','fire',5); W('flame_sword','fire',4);
  W('frost_iron glacier_sword permafrost absolute_zero ice_gauntlets sapphire_ring','water'); W('sea_trident','water',3);
  W('thunder_iron storm_blade cyclone_blade thunder_god storm_gauntlets storm_staff','storm'); W('sky_sword','storm',6); W('sky_bow','storm',5);
  W('emerald_ring','grass');                                    // the emerald is the grass gem now (it was lightning)
  W('elemental_sovereign','all');
  if(ITEMS.arcane_staff){ delete ITEMS.arcane_staff.element; delete ITEMS.arcane_staff.elementDmg; ITEMS.arcane_staff.desc='+26 MAGIC ATK, ×2.0 spell dmg — the master\'s staff: no element, never resisted'; }
  R('phoenix_cape obsidian_shield dragon_armor dragon_helm dragon_leggings dragon_gauntlets dragon_boots dragon_cape dragon_shield dragon_amulet dragon_ring fire_gauntlets ruby_ring','fire');
  R('sea_shell_buckler sea_buckler sea_pearl_neck captains_coat ice_gauntlets sapphire_ring','water');
  R('stormshield sky_robe sky_crown sky_leggings wind_walkers celestial_ring celestial_pend storm_gauntlets','storm');
  R('shadow_armor shadow_cowl shadow_leggings shadow_gauntlets shadow_treads shadow_cloak shadow_mantle dusk_mantle bone_shield','shadow');
  R('iron_ward guardians_ward tower_shield knight_boots plate_armor half_plate','earth');
  R('jade_amulet ranger_boots ranger_cloak emerald_ring','grass');
  // rings: a share more damage with their element in place of the old "+2 element" number that did nothing
  ['ruby_ring','sapphire_ring','emerald_ring'].forEach(function(k){ var it=ITEMS[k]; if(!it)return; it.elPow={}; it.elPow[it.el[0]]=0.10; delete it.elementDmg; });
  // mage gear: real spell power (it only ever added to the sword)
  var SP={mage_robes:0.10,mage_hood:0.08,arcane_circlet:0.10,arcane_leggings:0.08,arcane_gauntlets:0.10,arcane_focus:0.10,arcane_cloak:0.08,sky_robe:0.08,sky_crown:0.06};
  Object.keys(SP).forEach(function(k){ if(ITEMS[k]){ ITEMS[k].spellPow=SP[k]; } });
  // weapon classes
  if(ITEMS.axe)ITEMS.axe.cls='axe';
  ['crossbow','bone_crossbow'].forEach(function(k){ if(ITEMS[k])ITEMS[k].cls='xbow'; }); if(ITEMS.crossbow)ITEMS.crossbow.atk=16; if(ITEMS.bone_crossbow)ITEMS.bone_crossbow.atk=26;
  // potions that only repeated another one are no longer sold (they stay valid in old saves)
  ['minor_potion','potion_a1','potion_a2','potion_a3','potion_a4','life_flask'].forEach(function(k){ if(ITEMS[k]){ ITEMS[k].old=1; ITEMS[k].buy=0; } });
  // the tonics do what they say (04-helpers buffs), the antidote cures
  if(ITEMS.strength_tonic){ ITEMS.strength_tonic.buff='atkUp'; ITEMS.strength_tonic.desc='Heals 20 HP and +25% ATK for 2 minutes'; }
  if(ITEMS.speed_draught){ ITEMS.speed_draught.buff='spdUp'; ITEMS.speed_draught.desc='Heals 15 HP and +25% Speed for 2 minutes'; }
  if(ITEMS.defense_brew){ ITEMS.defense_brew.buff='defUp'; ITEMS.defense_brew.desc='Heals 15 HP and +25% DEF for 2 minutes'; }
  if(ITEMS.antidote){ ITEMS.antidote.cure=1; ITEMS.antidote.desc='Heals 8 HP and ends poison, burning and slow at once'; }
  // gems: one per element, and a rare one per element
  var G={gem_ruby:['fire',0],gem_sapphire:['water',0],gem_emerald:['grass',0],fire_opal:['fire',1],pearl:['water',1],rough_crystal:['earth',1],skystone:['storm',1],moon_shard:['shadow',1]};
  Object.keys(G).forEach(function(k){ var it=ITEMS[k]; if(!it)return; it.gemEl=G[k][0]; it.rare=G[k][1]; });
  if(ITEMS.gem_emerald)ITEMS.gem_emerald.desc='Worth 120g — the grass gem';
  if(ITEMS.gem_ruby)ITEMS.gem_ruby.desc='Worth 50g — the fire gem'; if(ITEMS.gem_sapphire)ITEMS.gem_sapphire.desc='Worth 80g — the water gem';
  if(ITEMS.fire_opal)ITEMS.fire_opal.desc='Worth 90g — rare fire gem, for master-work forging';
  if(ITEMS.pearl){ ITEMS.pearl.goldVal=90; ITEMS.pearl.desc='Worth 90g — rare water gem, for master-work forging'; }
  if(ITEMS.rough_crystal){ ITEMS.rough_crystal.name='Deep Crystal'; ITEMS.rough_crystal.goldVal=100; ITEMS.rough_crystal.desc='Worth 100g — rare earth gem, for master-work forging'; }
  if(ITEMS.skystone)ITEMS.skystone.desc='Worth 200g — rare storm gem, for master-work forging';
  if(ITEMS.moon_shard)ITEMS.moon_shard.desc='Worth 150g — rare shadow gem, for master-work forging';
  if(ITEMS.raw_iron)ITEMS.raw_iron.desc='Worth 20g — ore for the forge: axes and crossbows start from it';
  if(ITEMS.dungeon_coin)ITEMS.dungeon_coin.desc='Worth 15g — old coin from dungeons and towers. The jeweller only parts with gems for these.';
})();

// ── the new items ─────────────────────────────────────────────────────
// pic: what the painter is told (tools/sprites/make_icons.py). cls: 'axe' (slow, heavy, staggers) · 'xbow' (darts, pierces one foe).
var ITEMS_R37={
  // gems
  gem_amber:    {name:'Amber',    icon:'🟠',slot:'gem',goldVal:80, gemEl:'earth', desc:'Worth 80g — the earth gem',  pic:'a cut honey-amber gem, warm orange-brown, faceted'},
  gem_topaz:    {name:'Topaz',    icon:'🟡',slot:'gem',goldVal:120,gemEl:'storm', desc:'Worth 120g — the storm gem', pic:'a cut bright yellow topaz with a tiny spark inside'},
  gem_onyx:     {name:'Onyx',     icon:'⚫',slot:'gem',goldVal:140,gemEl:'shadow',desc:'Worth 140g — the shadow gem',pic:'a cut black onyx with a violet glint'},
  gem_heartseed:{name:'Heartseed',icon:'🌱',slot:'gem',goldVal:110,gemEl:'grass',rare:1,desc:'Worth 110g — rare grass gem, for master-work forging',pic:'a large glowing green seed with a golden sprout curling from it'},
  // plain axes (armory)
  hand_axe:  {name:'Hand Axe',  icon:'🪓',atk:7, slot:'lHand',cls:'axe',sell:16, buy:50,           desc:'+7 ATK — axe: slow, heavy swings that stagger',pic:'a small one-handed axe, steel head on a short wooden haft'},
  battle_axe:{name:'Battle Axe',icon:'🪓',atk:13,slot:'lHand',cls:'axe',sell:45, buy:130,secReq:2, desc:'+13 ATK — axe: slow, heavy swings that stagger',pic:'a broad single-bladed battle axe with a leather-wrapped haft'},
  great_axe: {name:'Great Axe', icon:'🪓',atk:21,slot:'lHand',cls:'axe',sell:110,buy:320,secReq:3, desc:'+21 ATK — axe: slow, heavy swings that stagger',pic:'a huge double-bladed great axe of polished steel'},
  war_axe:   {name:'War Axe',   icon:'🪓',atk:29,slot:'lHand',cls:'axe',sell:210,buy:620,secReq:4, desc:'+29 ATK — axe: slow, heavy swings that stagger',pic:'a black-steel war axe with a spiked back and red trim'},
  // earth axes (forge, amber)
  granite_axe:    {name:'Granite Axe',     icon:'🪓',atk:12,slot:'lHand',cls:'axe',sell:30, crafted:true,el:['earth'],elementDmg:4, pic:'an axe with a head of grey granite bound to the haft with iron bands'},
  quake_axe:      {name:'Quake Axe',       icon:'🪓',atk:20,slot:'lHand',cls:'axe',sell:70, crafted:true,el:['earth'],elementDmg:8, pic:'a heavy stone axe with glowing amber cracks running through the head'},
  boulder_maul:   {name:'Boulder Maul',    icon:'🔨',atk:31,slot:'lHand',cls:'axe',sell:170,crafted:true,el:['earth'],elementDmg:13,pic:'a great two-handed maul whose head is one rough boulder set with amber crystals'},
  mountains_heart:{name:'Mountain\'s Heart',icon:'🔨',atk:42,slot:'lHand',cls:'axe',sell:420,crafted:true,el:['earth'],elementDmg:19,pic:'a massive axe carved from a single glowing amber-veined crystal, with a mountain peak shape at the top'},
  // grass axes (forge, emerald)
  briar_axe:       {name:'Briar Axe',       icon:'🪓',atk:12,slot:'lHand',cls:'axe',sell:30, crafted:true,el:['grass'],elementDmg:4, pic:'an axe whose haft is wrapped in thorny green briar, with a small emerald in the head'},
  thornwood_axe:   {name:'Thornwood Axe',   icon:'🪓',atk:19,slot:'lHand',cls:'axe',sell:70, crafted:true,el:['grass'],elementDmg:8, pic:'an axe of dark living wood with long thorns along the back and green leaves sprouting'},
  wildwood_cleaver:{name:'Wildwood Cleaver',icon:'🪓',atk:30,slot:'lHand',cls:'axe',sell:170,crafted:true,el:['grass'],elementDmg:13,pic:'a broad cleaver-axe grown from twisted roots, with a blade edge of glowing green'},
  verdant_king:    {name:'Verdant King',    icon:'🪓',atk:41,slot:'lHand',cls:'axe',sell:420,crafted:true,el:['grass'],elementDmg:20,pic:'a majestic great axe of golden wood and emerald, crowned with antler-like branches and flowers'},
  // two-element weapons (forge, master-work)
  stormfire_blade:{name:'Stormfire Blade',icon:'⚔️',atk:29,slot:'lHand',sell:300,crafted:true,el:['fire','storm'],  elementDmg:13,pic:'a sword whose blade is half orange flame and half yellow lightning'},
  tempest_edge:   {name:'Tempest Edge',   icon:'⚔️',atk:28,slot:'lHand',sell:300,crafted:true,el:['water','storm'], elementDmg:14,pic:'a sword of blue ice wrapped in a spiral of storm cloud and small lightning'},
  magmaheart_axe: {name:'Magmaheart Axe', icon:'🪓',atk:37,slot:'lHand',cls:'axe',sell:320,crafted:true,el:['earth','fire'], elementDmg:15,pic:'a black rock axe with a molten glowing core and lava dripping from the edge'},
  avalanche_maul: {name:'Avalanche Maul', icon:'🔨',atk:37,slot:'lHand',cls:'axe',sell:320,crafted:true,el:['earth','water'],elementDmg:15,pic:'a maul of grey stone capped with thick blue-white ice and snow'},
  nightbloom_axe: {name:'Nightbloom Axe', icon:'🪓',atk:36,slot:'lHand',cls:'axe',sell:320,crafted:true,el:['grass','shadow'],elementDmg:15,pic:'an axe of black wood with violet night-flowers blooming along the haft and a dark crescent blade'},
  night_edge:     {name:'Night Edge',     icon:'🗡️',atk:26,slot:'lHand',sell:260,buy:0,el:['shadow'],elementDmg:12,desc:'+26 ATK +12 shadow (drains) — taken from the Shadow Lord\'s tower',pic:'a slim sword of violet-black glass trailing wisps of shadow'},
  sov_axe:        {name:'Sovereign Axe',  icon:'🪓',atk:58,slot:'lHand',cls:'axe',sell:900,buy:0,sov:1,el:'all',elementDmg:20,pic:'a white-gold great axe set with six small gems: red, blue, green, amber, yellow and violet'},
  // crossbows
  light_crossbow:{name:'Light Crossbow',icon:'🏹',atk:10,slot:'rHand',cls:'xbow',sell:18, buy:55,          desc:'+10 RNG ATK — crossbow: slower, hits hard, the dart passes through one foe',pic:'a small light wooden crossbow'},
  heavy_crossbow:{name:'Heavy Crossbow',icon:'🏹',atk:31,slot:'rHand',cls:'xbow',sell:180,buy:520,secReq:4,desc:'+31 RNG ATK — crossbow: slower, hits hard, the dart passes through one foe',pic:'a heavy steel-armed crossbow with a winding crank'},
  ember_crossbow:{name:'Ember Crossbow',icon:'🏹',atk:19,slot:'rHand',cls:'xbow',sell:90,crafted:true,el:['fire'],  elementDmg:6,pic:'a crossbow with a glowing orange ember set in the stock and small flames on the arms'},
  frost_crossbow:{name:'Frost Crossbow',icon:'🏹',atk:19,slot:'rHand',cls:'xbow',sell:90,crafted:true,el:['water'], elementDmg:6,pic:'a crossbow rimed with pale-blue frost, with icicles on the arms'},
  thorn_crossbow:{name:'Thorn Crossbow',icon:'🏹',atk:19,slot:'rHand',cls:'xbow',sell:90,crafted:true,el:['grass'], elementDmg:6,pic:'a crossbow of green living wood with thorny vines for arms'},
  stone_crossbow:{name:'Stone Crossbow',icon:'🏹',atk:20,slot:'rHand',cls:'xbow',sell:90,crafted:true,el:['earth'], elementDmg:6,pic:'a crossbow with a carved stone stock and amber studs'},
  storm_crossbow:{name:'Storm Crossbow',icon:'🏹',atk:19,slot:'rHand',cls:'xbow',sell:90,crafted:true,el:['storm'], elementDmg:6,pic:'a crossbow of pale metal crackling with yellow lightning along the string'},
  night_crossbow:{name:'Night Crossbow',icon:'🏹',atk:19,slot:'rHand',cls:'xbow',sell:90,crafted:true,el:['shadow'],elementDmg:6,pic:'a crossbow of violet-black wood with wisps of shadow and a crescent moon inlay'},
  eclipse_arbalest:  {name:'Eclipse Arbalest',  icon:'🏹',atk:30,slot:'rHand',cls:'xbow',sell:300,crafted:true,el:['storm','shadow'],elementDmg:12,pic:'a great crossbow, one arm bright gold with lightning and the other violet-black shadow, with a ring like an eclipse in the middle'},
  geyser_arbalest:   {name:'Geyser Arbalest',   icon:'🏹',atk:30,slot:'rHand',cls:'xbow',sell:300,crafted:true,el:['fire','water'],  elementDmg:12,pic:'a great crossbow, one arm of orange fire and the other of blue water, with white steam rising'},
  wildstone_arbalest:{name:'Wildstone Arbalest',icon:'🏹',atk:30,slot:'rHand',cls:'xbow',sell:300,crafted:true,el:['grass','earth'], elementDmg:12,pic:'a great crossbow of mossy stone with green vines and amber crystals'},
  sov_bow:     {name:'Sovereign Bow',     icon:'🏹',atk:36,slot:'rHand',sell:900,buy:0,sov:1,el:'all',elementDmg:12,pic:'a white-gold longbow set with six small gems: red, blue, green, amber, yellow and violet'},
  sov_crossbow:{name:'Sovereign Crossbow',icon:'🏹',atk:42,slot:'rHand',cls:'xbow',sell:900,buy:0,sov:1,el:'all',elementDmg:14,pic:'a white-gold crossbow set with six small gems: red, blue, green, amber, yellow and violet'},
  // staffs: spells of the staff's element do a quarter more
  root_staff: {magic:true,name:'Root Staff', icon:'🌿',atk:15,slot:'mWeapon',spellMult:1.5, sell:55, buy:160,secReq:2,el:['grass'], desc:'+15 MAGIC ATK, ×1.5 spell dmg — grass spells do a quarter more',pic:'a staff of twisted root with green leaves and a glowing emerald bud at the top'},
  tide_staff: {magic:true,name:'Tide Staff', icon:'🌊',atk:17,slot:'mWeapon',spellMult:1.6, sell:75, buy:220,secReq:2,el:['water'], desc:'+17 MAGIC ATK, ×1.6 spell dmg — water spells do a quarter more',pic:'a staff of pale driftwood and coral holding a floating orb of blue water'},
  stone_staff:{magic:true,name:'Stone Rod',  icon:'🪨',atk:21,slot:'mWeapon',spellMult:1.7, sell:95, buy:280,secReq:3,el:['earth'], desc:'+21 MAGIC ATK, ×1.7 spell dmg — earth spells do a quarter more',pic:'a short thick rod of carved grey stone topped with an amber crystal cluster'},
  shade_staff:{magic:true,name:'Shade Staff',icon:'🌑',atk:24,slot:'mWeapon',spellMult:1.85,sell:140,buy:420,secReq:4,el:['shadow'],desc:'+24 MAGIC ATK, ×1.85 spell dmg — shadow spells do a quarter more',pic:'a thin black staff topped with a violet crescent moon and drifting shadow'},
  sov_staff:  {magic:true,name:'Sovereign Staff',icon:'✨',atk:30,slot:'mWeapon',spellMult:2.2,sell:900,buy:0,sov:1,el:'all',pic:'a white-gold staff crowned with a ring of six small gems: red, blue, green, amber, yellow and violet'},
  // arrows and darts
  arrow_thorn:{name:'Thorn Arrow',icon:'🌿',type:'ammo',ammoFor:'bow', subtype:'thorn',sell:3,buy:18,qty:5,secReq:2,desc:'Grass — roots the target for a moment × 5 per purchase',pic:'an arrow with a green thorn-vine wrapped shaft and a thorn tip'},
  arrow_shock:{name:'Shock Arrow',icon:'⚡',type:'ammo',ammoFor:'bow', subtype:'shock',sell:4,buy:24,qty:5,secReq:3,desc:'Storm — arcs to a second enemy × 5 per purchase',pic:'an arrow with a tip of crackling yellow lightning'},
  dart_thorn: {name:'Thorn Dart', icon:'🌿',type:'ammo',ammoFor:'xbow',subtype:'thorn',sell:4,buy:26,qty:5,secReq:2,desc:'Grass — roots the target for a moment × 5 per purchase',pic:'a short crossbow dart with a green thorn tip and leaf fletching'},
  dart_shock: {name:'Shock Dart', icon:'⚡',type:'ammo',ammoFor:'xbow',subtype:'shock',sell:5,buy:34,qty:5,secReq:3,desc:'Storm — arcs to a second enemy × 5 per purchase',pic:'a short crossbow dart with a tip of crackling yellow lightning'},
  // the plain band the jeweller sets gems into
  band_ring:{name:'Silver Band',icon:'💍',slot:'ring',sell:25,buy:80,desc:'A plain ring. The jeweller can set up to two gems into it.',pic:'a plain polished silver finger ring with an empty gem setting'},
  // resistance draughts
  ward_fire:  {name:'Emberward Draught',icon:'🧪',heal:5,slot:'use',sell:12,buy:40,secReq:2,ward:'fire',  desc:'+30% fire resistance for 2 minutes',  pic:'a round bottle of cool pale-blue liquid with a small red flame crossed out on the label'},
  ward_water: {name:'Tideward Draught', icon:'🧪',heal:5,slot:'use',sell:12,buy:40,secReq:1,ward:'water', desc:'+30% water resistance for 2 minutes', pic:'a round bottle of warm amber liquid with a blue wave on the label'},
  ward_grass: {name:'Thornward Draught',icon:'🧪',heal:5,slot:'use',sell:12,buy:40,secReq:1,ward:'grass', desc:'+30% grass resistance for 2 minutes', pic:'a round bottle of orange liquid with a green thorn on the label'},
  ward_earth: {name:'Stoneward Draught',icon:'🧪',heal:5,slot:'use',sell:12,buy:40,secReq:2,ward:'earth', desc:'+30% earth resistance for 2 minutes', pic:'a round bottle of leaf-green liquid with a grey stone on the label'},
  ward_storm: {name:'Stormward Draught',icon:'🧪',heal:5,slot:'use',sell:14,buy:50,secReq:3,ward:'storm', desc:'+30% storm resistance for 2 minutes', pic:'a round bottle of violet liquid with a yellow lightning bolt on the label'},
  ward_shadow:{name:'Shadeward Draught',icon:'🧪',heal:5,slot:'use',sell:14,buy:50,secReq:3,ward:'shadow',desc:'+30% shadow resistance for 2 minutes',pic:'a round bottle of glowing golden liquid with a violet crescent on the label'},
  // the Sovereign set: one piece of every kind, all six elements. Not obtainable yet (Kris: the way comes later).
  sov_shield:   {name:'Sovereign Aegis',    icon:'🛡️',def:18,atk:3,slot:'shield',   sell:900,buy:0,sov:1,pic:'a white-gold shield with six small gems round a central rune: red, blue, green, amber, yellow, violet'},
  sov_plate:    {name:'Sovereign Plate',    icon:'🥋',def:17,slot:'body',            sell:900,buy:0,sov:1,pic:'a white-gold chest plate with six small gems across the collar: red, blue, green, amber, yellow, violet'},
  sov_crown:    {name:'Sovereign Crown',    icon:'👑',def:11,atk:4,cdReduce:0.12,manaRegen:1,slot:'head',sell:900,buy:0,sov:1,pic:'a white-gold crown with six gem points: red, blue, green, amber, yellow, violet'},
  sov_greaves:  {name:'Sovereign Greaves',  icon:'👖',def:13,spdBonus:0.10,cdReduce:0.12,slot:'pants',sell:900,buy:0,sov:1,pic:'white-gold leg armor with small gems down the sides in six colours'},
  sov_gauntlets:{name:'Sovereign Gauntlets',icon:'🧤',def:9,atk:6,slot:'gauntlets',  sell:900,buy:0,sov:1,pic:'a pair of white-gold gauntlets with a small gem on each knuckle in six colours'},
  sov_boots:    {name:'Sovereign Boots',    icon:'🥾',def:10,spdBonus:0.15,cdReduce:0.08,slot:'feet',sell:900,buy:0,sov:1,pic:'a pair of white-gold boots with small gems round the cuffs in six colours'},
  sov_amulet:   {name:'Sovereign Amulet',   icon:'📿',atk:8,def:7,cdReduce:0.18,manaRegen:1.5,slot:'neck',sell:900,buy:0,sov:1,pic:'a white-gold amulet on a chain: a ring of six small gems round a bright white centre'},
  sov_mantle:   {name:'Sovereign Mantle',   icon:'🧣',def:9,atk:5,cdReduce:0.14,manaRegen:1,slot:'back',sell:900,buy:0,sov:1,pic:'a white cloak with a gold border and a clasp of six small gems'},
  sov_ring:     {name:'Sovereign Ring',     icon:'💍',atk:6,def:6,spdBonus:0.08,cdReduce:0.06,manaRegen:1,slot:'ring',sell:900,buy:0,sov:1,pic:'a white-gold ring set with six tiny gems in a circle: red, blue, green, amber, yellow, violet'}
};
// extra icons ordered with the new items (ids, name, what to paint)
var ICONS_R37=[['el_storm','Storm element','a yellow lightning bolt as a round badge'],['el_shadow','Shadow element','a violet crescent moon as a round badge'],
  ['tm_forge','Forge tree chapter','an anvil with three glowing branches rising from it like a tree'],['tm_paths','Paths chapter','three small linked rune stones joined by glowing lines'],
  ['tm_elements','Elements chapter','a ring of six small coloured orbs: red, blue, green, amber, yellow, violet']];

(function(){ if(typeof ITEMS==='undefined')return;
  var all={}; ZEL.LIST.forEach(function(e){ all[e]=0.08; });
  Object.keys(ITEMS_R37).forEach(function(k){ var it=ITEMS_R37[k];
    if(it.sov){ if(!it.el&&it.slot!=='mWeapon')it.res=Object.assign({},all); if(it.slot==='ring'){ it.elPow={}; ZEL.LIST.forEach(function(e){ it.elPow[e]=0.06; }); } }
    if(it.el)it.element=it.el==='all'?'all':it.el.map(function(e){ return ZEL.E[e].n.toLowerCase(); }).join(' & ');
    if(!it.desc){ var d=[]; if(it.atk)d.push('+'+it.atk+(it.slot==='rHand'?' RNG':it.slot==='mWeapon'?' MAGIC':'')+' ATK'); if(it.def)d.push('+'+it.def+' DEF'); if(it.elementDmg)d.push('+'+it.elementDmg+' '+it.element);
      if(it.spellMult)d.push('×'+it.spellMult+' spell dmg'); if(it.spdBonus)d.push('+'+Math.round(it.spdBonus*100)+'% Spd'); if(it.cdReduce)d.push('-'+Math.round(it.cdReduce*100)+'%CD'); if(it.manaRegen)d.push('+'+it.manaRegen+'mp/s');
      it.desc=d.join(' ')+(it.sov?' — every element at once. No one yet knows how it is won.':it.cls==='axe'?' — axe':it.cls==='xbow'?' — crossbow':''); }
    ITEMS[k]=it; });
})();

// ── forge recipes: halved prices, the new chains, descriptions written from the recipe ──
(function(){ if(typeof CRAFT_RECIPES==='undefined')return;
  var GOLD={flame_iron:100,inferno_edge:250,magma_cleaver:750,volcano_lord:1500,frost_iron:150,glacier_sword:350,permafrost:900,absolute_zero:1750,thunder_iron:200,storm_blade:500,cyclone_blade:1100,thunder_god:2000,elemental_sovereign:2500};
  var RARE={fire:'fire_opal',ice:'pearl',thunder:'skystone'}, CH_EL={fire:'fire',ice:'water',thunder:'storm'};
  CRAFT_RECIPES.forEach(function(r){ if(GOLD[r.result])r.gold=GOLD[r.result]; r.cls='sword'; r.el=r.chain==='ultimate'?'all':[CH_EL[r.chain]];
    if(r.chain==='thunder'&&r.needs.gem_emerald){ delete r.needs.gem_emerald; r.needs.gem_topaz=1; }      // the emerald is the grass gem now
    if(r.tier===4&&RARE[r.chain])r.needs[RARE[r.chain]]=1; });
  function add(result,needs,gold,tier,chain,cls){ CRAFT_RECIPES.push({result:result,needs:needs,gold:gold,label:ITEMS[result].name,tier:tier,chain:chain,cls:cls,el:ITEMS[result].el}); }
  add('hand_axe',{raw_iron:2},30,0,'earth','axe');   add('light_crossbow',{raw_iron:2},35,0,'xbow','xbow');
  add('granite_axe',{hand_axe:1,gem_amber:1},150,1,'earth','axe'); add('quake_axe',{granite_axe:1,gem_amber:1},350,2,'earth','axe');
  add('boulder_maul',{quake_axe:1,gem_amber:1},900,3,'earth','axe'); add('mountains_heart',{boulder_maul:1,gem_amber:1,rough_crystal:1},1750,4,'earth','axe');
  add('briar_axe',{hand_axe:1,gem_emerald:1},150,1,'grass','axe'); add('thornwood_axe',{briar_axe:1,gem_emerald:1},350,2,'grass','axe');
  add('wildwood_cleaver',{thornwood_axe:1,gem_emerald:1},900,3,'grass','axe'); add('verdant_king',{wildwood_cleaver:1,gem_emerald:1,gem_heartseed:1},1750,4,'grass','axe');
  [['ember_crossbow','gem_ruby'],['frost_crossbow','gem_sapphire'],['thorn_crossbow','gem_emerald'],['stone_crossbow','gem_amber'],['storm_crossbow','gem_topaz'],['night_crossbow','gem_onyx']].forEach(function(x){ var n={crossbow:1}; n[x[1]]=2; add(x[0],n,300,1,'xbow','xbow'); });
  add('eclipse_arbalest',{storm_crossbow:1,night_crossbow:1,moon_shard:1},1200,2,'xbow','xbow'); add('geyser_arbalest',{ember_crossbow:1,frost_crossbow:1,pearl:1},1200,2,'xbow','xbow'); add('wildstone_arbalest',{thorn_crossbow:1,stone_crossbow:1,gem_heartseed:1},1200,2,'xbow','xbow');
  add('stormfire_blade',{magma_cleaver:1,storm_blade:1,skystone:1},1200,4,'dual','sword'); add('tempest_edge',{cyclone_blade:1,glacier_sword:1,pearl:1},1200,4,'dual','sword');
  add('magmaheart_axe',{boulder_maul:1,inferno_edge:1,fire_opal:1},1200,4,'dual','axe'); add('avalanche_maul',{boulder_maul:1,glacier_sword:1,pearl:1},1200,4,'dual','axe');
  add('nightbloom_axe',{wildwood_cleaver:1,gem_onyx:2,moon_shard:1},1200,4,'dual','axe');
  // every forged item's description is written from its recipe, so the two can never disagree
  CRAFT_RECIPES.forEach(function(r){ var it=ITEMS[r.result]; if(!it)return; var st=[];
    if(it.atk)st.push('+'+it.atk+(it.slot==='rHand'?' RNG':'')+' ATK'); if(it.elementDmg)st.push('+'+it.elementDmg+' '+(it.el==='all'?'all elements':ZEL.name(it.el).toLowerCase()));
    var nd=Object.keys(r.needs).map(function(k){ return (r.needs[k]>1?r.needs[k]+'× ':'')+(ITEMS[k]?ITEMS[k].name:k); }).join(' + ');
    it.desc=st.join(' ')+(it.cls==='axe'?' — axe':it.cls==='xbow'?' — crossbow':'')+' — Forge: '+nd+' + '+r.gold+'g'; });
})();

// ── gem-set gear: ITEMS['<base>~<el>[~<el>]'] is built on demand ───────
// Armor, shields, amulets and rings can hold up to two elements in all (what the piece has by itself counts).
ZEL.SETTABLE={body:1,shield:1,head:1,feet:1,pants:1,gauntlets:1,neck:1,back:1,ring:1};
ZEL.baseOf=function(id){ return String(id).split('~')[0]; };
ZEL.setOf=function(id){ return String(id).split('~').slice(1).filter(function(e){ return !!ZEL.E[e]; }); };
// the elements a piece carries in all (its own + set gems), for the "up to two" rule
ZEL.carried=function(it){ if(!it)return []; var L=[]; if(it.el==='all')return ZEL.LIST.slice(); (it.el||[]).forEach(function(e){ if(L.indexOf(e)<0)L.push(e); }); Object.keys(it.res||{}).forEach(function(e){ if(L.indexOf(e)<0)L.push(e); }); return L; };
ZEL.canSet=function(id,el){ var it=ITEMS[id]; if(!it||!ZEL.SETTABLE[it.slot]||it.sov||!ZEL.E[el])return false; var c=ZEL.carried(it); return c.indexOf(el)<0&&c.length<2; };
ZEL.setId=function(id,el){ var b=ZEL.baseOf(id), s=ZEL.setOf(id); s.push(el); return b+'~'+s.join('~'); };
ZEL._made={};
ZEL.make=function(id){ if(ZEL._made[id])return ZEL._made[id]; var b=ZEL.baseOf(id), s=ZEL.setOf(id), B=ZEL._raw[b]; if(!B||!s.length)return undefined;
  var it=Object.assign({},B); it.res=Object.assign({},B.res||{}); it.elPow=Object.assign({},B.elPow||{}); it.gems=s; it.base=b;
  s.forEach(function(e){ it.res[e]=(it.res[e]||0)+ZEL.RES_GEM; if(B.slot==='ring'||B.slot==='neck')it.elPow[e]=(it.elPow[e]||0)+ZEL.POW_GEM; });
  if(!Object.keys(it.elPow).length)delete it.elPow;
  it.name=B.name+' ('+s.map(function(e){ return ZEL.E[e].n; }).join(' & ')+')';
  it.desc=(B.desc||'')+' · set with '+s.map(function(e){ return ZEL.E[e].n.toLowerCase(); }).join(' and ');
  it.sell=(B.sell||10)+s.reduce(function(t,e){ var g=ZEL._raw[ZEL.E[e].gem]; return t+Math.round(((g&&g.goldVal)||60)/2); },0); it.buy=0;
  try{ Object.defineProperty(it,'_k',{value:b,enumerable:false}); Object.defineProperty(it,'_id',{value:id,enumerable:false}); }catch(e){}
  ZEL._made[id]=it; return it; };
if(typeof ITEMS!=='undefined'&&typeof Proxy!=='undefined'){ ZEL._raw=ITEMS;
  ITEMS=new Proxy(ZEL._raw,{ get:function(t,k){ if(typeof k==='string'&&k.indexOf('~')>0&&!(k in t))return ZEL.make(k); return t[k]; },
                            has:function(t,k){ return (k in t)||(typeof k==='string'&&k.indexOf('~')>0&&!!ZEL.make(k)); } }); }
else if(typeof ITEMS!=='undefined')ZEL._raw=ITEMS;
