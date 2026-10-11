// ═══════════════════════════════════════════════════════════════════════
// ║ 03c-arms-r45.js — round 45: the gaps in the weapon wheel filled (Kris, Oct 10: "the weapons wheel shows gaps in what types of elemental
// ║ weapons exist, with too few multi-element weapons. Suggest new weapons, and make sure that they also need different gems, pearls or other
// ║ to forge them. Suggest how these unique gems, pearls, or other unique objects should be found or rewarded." — answered: Claude decides).
// ║   • Shadow had no melee line at all (only the Night Crossbow): a fifth sword lane, Dusk Iron → Umbral Edge → Nightfang → Void Reaver.
// ║   • Of the fifteen element pairs, seven had no weapon. Each now has one master-work, forged like the others (a third-step weapon +
// ║     a second-step weapon of the other element + a rare item), and each needs its OWN rare item — seven new ones (ITEMS_R45, R45_RARE),
// ║     each won from a guardian of those two elements (castle wardens, tower masters), a realm boss, or the Alphas that roam.
// ║ The pictures are ordered as wave 46 (tools/sprites/make_icons.py → .\tools\sprites\icons.ps1 -New); until then the emoji shows.
// ║ The loot that hands the rare items out: 09h2-rare-loot.js. The wheel that shows them: 26c-tome-arms.js.
// ═══════════════════════════════════════════════════════════════════════
var ITEMS_R45={
  // the shadow lane (swords)
  dusk_iron:       {name:'Dusk Iron',        icon:'🗡️',atk:9, slot:'lHand',sell:40, crafted:true,el:['shadow'],elementDmg:3, pic:'a plain iron sword whose blade fades to violet-black at the tip, with a faint wisp of shadow'},
  umbral_edge:     {name:'Umbral Edge',      icon:'🗡️',atk:16,slot:'lHand',sell:90, crafted:true,el:['shadow'],elementDmg:6, pic:'a slim dark-violet sword with a glowing lilac edge and smoke curling off it'},
  nightfang:       {name:'Nightfang',        icon:'🗡️',atk:25,slot:'lHand',sell:190,crafted:true,el:['shadow'],elementDmg:11,pic:'a curved black fang-shaped blade with a violet glow along the inner edge and a crescent-moon guard'},
  void_reaver:     {name:'Void Reaver',      icon:'🗡️',atk:33,slot:'lHand',sell:360,crafted:true,el:['shadow'],elementDmg:16,pic:'a great black sword with a starry violet void inside the blade and a pale moon-shard set in the hilt'},
  // the seven missing pairs
  ashbloom_glaive: {name:'Ashbloom Glaive',  icon:'🪓',atk:36,slot:'lHand',cls:'axe',sell:320,crafted:true,el:['grass','fire'], elementDmg:15,pic:'a long axe-glaive of charred wood whose blade bursts into orange flame-petals, green leaves curling up the haft'},
  tidebloom_blade: {name:'Tidebloom Blade',  icon:'⚔️',atk:29,slot:'lHand',sell:320,crafted:true,el:['water','grass'],elementDmg:14,pic:'a sea-blue sword with lotus flowers and green vines wound round it, water drops on the blade'},
  abyssal_edge:    {name:'Abyssal Edge',     icon:'⚔️',atk:29,slot:'lHand',sell:320,crafted:true,el:['water','shadow'],elementDmg:14,pic:'a deep-navy sword like dark sea water with violet shadow inside, a black pearl in the guard'},
  hellbrand:       {name:'Hellbrand',        icon:'⚔️',atk:30,slot:'lHand',sell:320,crafted:true,el:['fire','shadow'],elementDmg:14,pic:'a black obsidian sword with violet-red flames licking from cracks in the blade'},
  galebriar_axe:   {name:'Galebriar Axe',    icon:'🪓',atk:36,slot:'lHand',cls:'axe',sell:320,crafted:true,el:['grass','storm'],elementDmg:15,pic:'an axe of living green wood with thorny vines, small yellow lightning arcs jumping between the thorns'},
  thunderpeak_maul:{name:'Thunderpeak Maul', icon:'🔨',atk:37,slot:'lHand',cls:'axe',sell:320,crafted:true,el:['earth','storm'],elementDmg:15,pic:'a heavy stone maul shaped like a mountain peak with a lightning bolt crackling over its top'},
  gravewarden_maul:{name:'Gravewarden Maul', icon:'🔨',atk:37,slot:'lHand',cls:'axe',sell:320,crafted:true,el:['earth','shadow'],elementDmg:15,pic:'a dark granite maul carved with grave runes, violet mist seeping from its cracks, amber glowing inside'},
  // round 45: the Sunflower Château's new skill (the Roll became a basic move — 10p-roll.js)
  sp_petalstep:    {name:'Petal Step',       icon:'🌸',slot:'special',skillId:'petal_step',cd:5,secReq:1,sell:20,desc:'Z: a quick step of 2½ tiles; the petals you leave behind slow every foe in them for 3 s',pic:'a swirl of yellow sunflower petals around a dancing footprint'},
  // the seven rare items (one per new pair)
  phoenix_ember:   {name:'Phoenix Ember',    icon:'🔥',slot:'gem',goldVal:140,rare:1,desc:'Worth 140g — a coal that never goes out; forges fire with grass',pic:'a glowing orange-gold coal with a tiny green leaf sprouting from its flame'},
  lotus_pearl:     {name:'Lotus Pearl',      icon:'🪷',slot:'gem',goldVal:140,rare:1,desc:'Worth 140g — a pearl grown in a lotus; forges water with grass',pic:'a pale-blue pearl sitting in an open pink-and-green lotus flower'},
  abyss_pearl:     {name:'Abyss Pearl',      icon:'⚫',slot:'gem',goldVal:160,rare:1,desc:'Worth 160g — a black pearl from the drowned deep; forges water with shadow',pic:'a glossy black pearl with a violet sheen and a ring of dark water around it'},
  obsidian_heart:  {name:'Obsidian Heart',   icon:'🖤',slot:'gem',goldVal:170,rare:1,desc:'Worth 170g — a heart of volcanic glass with a fire inside; forges fire with shadow',pic:'a heart-shaped piece of black volcanic glass with violet-red fire glowing inside'},
  thunderseed:     {name:'Thunderseed',      icon:'🌰',slot:'gem',goldVal:150,rare:1,desc:'Worth 150g — a seed struck by lightning, still humming; forges grass with storm',pic:'a big green-gold seed with yellow lightning crackling around it'},
  lodestone:       {name:'Lodestone',        icon:'🧲',slot:'gem',goldVal:150,rare:1,desc:'Worth 150g — a stone that pulls lightning to it; forges earth with storm',pic:'a dark grey magnetic stone with yellow sparks drawn to its points'},
  grave_amber:     {name:'Grave Amber',      icon:'🟤',slot:'gem',goldVal:160,rare:1,desc:'Worth 160g — amber from a barrow, a shadow trapped inside; forges earth with shadow',pic:'a dark amber gem with a violet shadow trapped inside like a moth'}
};
// where each rare item comes from: castle wardens / tower masters of the pair (first win: always; later wins: 1 in 4), realm bosses (sec),
// or the Alphas of either element (1 in 5). Shown in the Tome and the forge.
var R45_RARE={
  phoenix_ember: {els:['fire','grass'],  wardens:['q1_c'],masters:[],boss:[],alpha:true, how:'The Ember-and-Thorn warden of the Grasslands castle gives one the first time; fire and grass Alphas sometimes drop one.'},
  lotus_pearl:   {els:['water','grass'], wardens:['q2_b','q2_d'],masters:['mire_tower'],boss:[],alpha:false, how:'The Wetlands castle wardens of water and grass, and the master of the Mire Tower.'},
  abyss_pearl:   {els:['water','shadow'],wardens:['q2_c'],masters:['drowned_lighthouse'],boss:[],alpha:false, how:'The water-and-shadow warden of the Wetlands, and the master of the Drowned Lighthouse.'},
  obsidian_heart:{els:['fire','shadow'], wardens:[],masters:[],boss:[4],alpha:true, how:'The Ashlands realm guardians (dungeon and tower) on their first defeat; fire and shadow Alphas sometimes drop one.'},
  thunderseed:   {els:['grass','storm'], wardens:[],masters:['rootspire','lightning_rod'],boss:[],alpha:true, how:'The masters of the Rootspire and the Lightning Rod; grass and storm Alphas sometimes drop one.'},
  lodestone:     {els:['earth','storm'], wardens:['q1_d'],masters:[],boss:[3],alpha:false, how:'The earth-and-storm warden of the Grasslands castle, and the Highlands realm guardians.'},
  grave_amber:   {els:['earth','shadow'],wardens:['q4_b'],masters:['monolith'],boss:[],alpha:false, how:'The earth-and-shadow warden of the Ashlands castle, and the master of the Monolith.'}
};
(function(){ if(typeof ITEMS==='undefined')return;
  Object.keys(ITEMS_R45).forEach(function(k){ var it=ITEMS_R45[k]; if(it.el&&typeof ZEL!=='undefined')it.element=it.el.map(function(e){ return ZEL.E[e].n.toLowerCase(); }).join(' & '); ITEMS[k]=it; });
  if(typeof CRAFT_RECIPES==='undefined')return;
  function add(result,needs,gold,tier,chain,cls){ CRAFT_RECIPES.push({result:result,needs:needs,gold:gold,label:ITEMS[result].name,tier:tier,chain:chain,cls:cls,el:ITEMS[result].el}); }
  add('dusk_iron',{iron_sword:1,gem_onyx:1},150,1,'shadow','sword'); add('umbral_edge',{dusk_iron:1,gem_onyx:1},400,2,'shadow','sword');
  add('nightfang',{umbral_edge:1,gem_onyx:1},950,3,'shadow','sword'); add('void_reaver',{nightfang:1,gem_onyx:1,moon_shard:1},1800,4,'shadow','sword');
  add('ashbloom_glaive',{wildwood_cleaver:1,inferno_edge:1,phoenix_ember:1},1200,4,'dual','axe');
  add('tidebloom_blade',{permafrost:1,thornwood_axe:1,lotus_pearl:1},1200,4,'dual','sword');
  add('abyssal_edge',{permafrost:1,umbral_edge:1,abyss_pearl:1},1200,4,'dual','sword');
  add('hellbrand',{magma_cleaver:1,umbral_edge:1,obsidian_heart:1},1200,4,'dual','sword');
  add('galebriar_axe',{wildwood_cleaver:1,storm_blade:1,thunderseed:1},1200,4,'dual','axe');
  add('thunderpeak_maul',{boulder_maul:1,storm_blade:1,lodestone:1},1200,4,'dual','axe');
  add('gravewarden_maul',{boulder_maul:1,umbral_edge:1,grave_amber:1},1200,4,'dual','axe');
  ['dusk_iron','umbral_edge','nightfang','void_reaver','ashbloom_glaive','tidebloom_blade','abyssal_edge','hellbrand','galebriar_axe','thunderpeak_maul','gravewarden_maul'].forEach(function(id){
    var r=CRAFT_RECIPES.filter(function(x){ return x.result===id; })[0], it=ITEMS[id]; if(!r||!it)return; var st=['+'+it.atk+' ATK','+'+it.elementDmg+' '+it.element];
    var nd=Object.keys(r.needs).map(function(k){ return (r.needs[k]>1?r.needs[k]+'× ':'')+(ITEMS[k]?ITEMS[k].name:k); }).join(' + ');
    it.desc=st.join(' ')+(it.cls==='axe'?' — axe':'')+' — Forge: '+nd+' + '+r.gold+'g'; });
  Object.keys(R45_RARE).forEach(function(k){ if(ITEMS[k])ITEMS[k].hint=R45_RARE[k].how; });
  if(ITEMS.sp_roll){ delete ITEMS.sp_roll.buy; ITEMS.sp_roll.desc='No longer a skill: the roll is a move of its own (Alt), taught by Tumbler Pia outside the Rime Spire.'; }
})();
