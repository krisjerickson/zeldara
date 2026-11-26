// ═══════════════════════════════════════════════════════════════════════
// ║ 79n3-lab-names137.js — round 137: NAMES (Kris: "the different regions, grasslands, ashlands, etc. should be renamed to something more
// ║ interesting, give me options in the lab. Also assess the game for other boring names and propose updates").
// ║ The four realms (four whole sets, or your own per realm), the village, and every place name the player reads — the 40 lands (each
// ║ waystone takes its land's name), 16 islands, 20 adventure sites and the mage towers — as they are in the game today, with a proposal each.
// ║ Picks: 'names-realmset' (verdict A|B|C|D|keep), 'names-r<q>' (notes: your own), 'names-<id>' (pick = the proposal, cut = keep today's;
// ║ notes = your own name), 'names-all'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }, P=function(k){ return LabApp.picks[k]||{}; };
  var SETS=[['A','The Marks','Greenmark','Fenmark','Fellmark','Embermark','"Mark" is the old Norse word for a borderland. Short, all of a family, and each says what the land is. Fits the little-map label and "the Fenmark" in speech. <b>Recommended.</b>'],
    ['B','Poetic','The Gildenmeads','The Drowned Marches','The Giantstair','The Cinderwaste','Each a picture. Longer; reads like a storybook map.'],
    ['C','The old tongue','Vangheim','Myrheim','Fjallheim','Brennheim','Old Norse: field-home, bog-home, mountain-home, burning-home. Sits beside Runeheim, Muspelheim and Asgard — but four more "-heims" can blur together.'],
    ['D','What befell them','The Hushed Meadows','The Black Fens','The Broken Fells','The Ember Wastes','Named for the Quiet, the Black Tide, the Stone-Fall and the Ash Night — the saga in the map.']];
  var TODAY=['Grasslands','Wetlands','Highlands','Ashlands'];
  // [id, today, proposal, why]
  var G=[['The village',[
      ['village','"the last village" (no name)','Mirrowby','A home with a name, by Mirror Lake ("-by" like Fernby). The villagers can still call it "the last village".'],
      ['vcentre','Village Center (the little-map label)','The Green','What everyone in the village already calls it.'],
      ['sectlbl','NE Grasslands, SE Wetlands … (the little-map label)','Just the realm\'s name','The compass letters read like a spreadsheet.'],
      ['mirror','Mirror Lake','Mirror Lake (keep)','Good as it is — it is in the saga. Or "Mirrormere".']]],
    ['The Grasslands\' lands',[
      ['fairy_rings','Fairy-Ring Meadows','Ringmeadow',''],['standing_stones','Runic Standing Stones','The Whispering Stones',''],['windmill_hills','Windmill Hills','Millwind Downs',''],
      ['firefly_river','Firefly River Valley','Glimmerdale',''],['giant_bones','Moss-covered Giant Bones','The Sleeping Giant','A description, not a name; and the waystone reads "Moss-covered Giant Bones Waystone".'],
      ['blossom_terraces','Blossom Orchard Terraces','Applestair',''],['amphitheatre','Sunken Amphitheatre Ruins','Singer\'s Bowl',''],['floating_rocks','Floating-Rock Meadow','Driftstone Meadow',''],
      ['crystal_grass','Crystal-tipped Tallgrass','Glintgrass',''],['waystone_road','Waystone Ancient Road','The Old Road','Its waystone reads "Waystone Ancient Road Waystone".']]],
    ['The Wetlands\' lands',[
      ['glow_mangroves','Bioluminescent Mangroves','The Glowroots','A science word in a saga.'],['lantern_lilies','Lantern Lily Marsh','Lanternmere',''],
      ['drowned_village','Drowned Village Rooftops','Drowned Reedhaven','Ties it to the town the spirits remember (Nanna, Oddny). Or "Gablewater".'],
      ['willow_cathedral','Willow Cathedral','The Willow Hall','"Cathedral" three times in the game, and a church word in a Norse world.'],['glowfrog_pools','Glow-Frog Pools','Frogsong Pools',''],
      ['stilt_walkways','Misty Stilt Walkways','Stiltwalk',''],['sunken_spires','Sunken Temple Spires','The Drowned Bells','Ties to the Lantern Isles\' bell-towers Torvi remembers.'],
      ['wisp_cattails','Wisp Cattail Maze','The Wispmaze',''],['rune_stepping','Rune Stepping Stones','Runeford',''],['turtle_isles','Giant Turtle-Shell Isles','The Shellbacks','Also clashes with Turtle-Back Isle.']]],
    ['The Highlands\' lands',[
      ['runic_mesas','Runic Mesas','The Rune Tables',''],['geode_canyons','Crystal Geode Canyons','Glittergorge',''],['dwarven_stairs','Dwarven Stair-cut Cliffs','The Dwarrow Stair',''],
      ['windharp_ridges','Wind-harp Ridges','Harpwind Ridge',''],['petrified_forest','Petrified Forest','Stonewood',''],['giants_chessboard','Giant\'s Chessboard','Giant\'s Chessboard (keep)','Already a name.'],
      ['glacier_peaks','Glacier-veined Peaks','The Bluevein Peaks',''],['golem_graveyard','Golem Graveyard','The Sleeping Golems',''],['herder_terraces','Terraced Herder Slopes','Shepherd\'s Stair',''],
      ['starfall_crater','Starfall Crater Field','Starfall','']]],
    ['The Ashlands\' lands',[
      ['obsidian_glass','Obsidian Glass Fields','Glassmoor',''],['ashsnow_forest','Ash-snow Dead Forest','Greysnow Wood',''],['magma_channels','Magma Rune Channels','The Burning Runes',''],
      ['basalt_forest','Basalt Column Forest','The Pillarwood',''],['burned_cathedral','Burned Cathedral Ruins','The Burned Hall','No cathedrals in Runeheim.'],['sulfur_geysers','Sulfur Geyser Flats','Brimstone Flats',''],
      ['dragon_valley','Dragon Skeleton Valley','Wyrmbone Vale',''],['emberflower_fields','Ember-flower Fields','Emberbloom',''],['chained_rocks','Chained Floating Rocks','The Tethered Stones',''],
      ['forge_ruins','Smouldering Forge-city Ruins','The Ruins of Askvald','The ember-city Mord, Vali, Unn and Alfhild remember — the spirits\' town on the map.']]],
    ['Islands',[
      ['isl_meadow_cove','Meadow Cove','Clovercove',''],['isl_twin_hills','Twin-Hill Isle','Twohill',''],['isl_rune_atoll','Rune Atoll','Rune Atoll (keep)',''],['isl_fae_forest','Fae Forest Isle','Fairholt',''],
      ['isl_mangrove_maze','Mangrove Isle','Tangle Isle',''],['isl_lotus_lagoon','Lotus Lagoon','Lotus Lagoon (keep)',''],['isl_sunken_ruins','Sunken Ruin Isle','Halfdrown',''],['isl_turtle_back','Turtle-Back Isle','Old Shell',''],
      ['isl_crag_spire','Crag Spire','Ravencrag',''],['isl_crystal_cove','Crystal Cove','Glimmer Cove','"Crystal" five times in the game.'],['isl_snowcap','Snowcap Isle','Whitecap',''],['isl_giants_steps','Giant\'s Steps','Giant\'s Steps (keep)',''],
      ['isl_ember_caldera','Ember Caldera','The Firebowl','"Ember" seven times in the game.'],['isl_obsidian_shore','Obsidian Shore','Blackglass Shore',''],['isl_charred_grove','Charred Grove','Charred Grove (keep)',''],['isl_forge_rock','Forge Rock','Anvil Rock','']]],
    ['Adventure sites',[
      ['s1_b_elven_library','Elven Library','The Leafbound Library',''],['s1_b_hyrule_keep','White Keep','The Pale Keep','Plain; its design began as another game\'s castle.'],['s1_b_mushroom_forest','Mushroom Forest','The Toadstool Deep',''],
      ['s2_tower','Frost Cathedral','Rimehall','No cathedrals in Runeheim.'],['s2_dungeon','Underground Lake Ring','The Ringmere',''],['s2_b_crystal_grotto','Crystal Grotto','Glimmerdeep',''],
      ['s3_dungeon','Bone Pit','Bonedeep',''],['s3_b_rivendell','Rivendell Twilight Hall','The Dusk Hall','<b>Must change</b> — Rivendell is another author\'s place.'],['s3_b_pillared_hall','Pillared Hall','The Hundred Pillars',''],
      ['s4_dungeon','Lava Archipelago','The Molten Isles',''],['s4_b_reflecting_hall','Reflecting Hall','The Still Hall',''],['s4_b_boulder_field','Boulder Field','Tumblestone',''],['s4_b_spiral_chasm','Spiral Chasm','The Winding Deep','']]],
    ['Mage towers and their mages',[
      ['mage_lightning_rod','The Lightning Rod Tower','Stormspike',''],['mage_ember_observatory','The Ember Observatory','The Nova Dome','Two observatories (with the Starlit one).'],
      ['mage_rift_xal','Xal\'zor, the Rift Lich','Vargrim, the Rift Lich','The only name with an apostrophe-and-X; reads like a different game.'],
      ['mage_gravelord','Gravelord Thane, the Stone Shaper','Thane Gravelstone, the Stone Shaper','']]],
    ['Other names to look at',[
      ['forge_slag','Slag Forge (one of the four forges: Ember, Cinder, Slag, Ash)','The Clinker Forge','"Slag" is waste; the others are fire words. Or "Brand Forge".'],
      ['ember_word','"Ember" in seven names (Ember Wall, Ember Cave, Ember Caldera, Ember Observatory, Ember-flower Fields, Ember Forge, Emberhold)','Keep it for the Wall and the forge','The proposals above take it off three.']]]];
  var seg=function(k,o){ var v=P(k).verdict; return '<span class="wl-seg" data-k="'+k+'">'+o.map(function(b){ return '<button class="vbtn wl-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'; };
  var N=0; G.forEach(function(g){ N+=g[1].length; });
  LAB_TABS.push({ id:'names137', name:'Names',
    blurb:'<div class="w4-in"><b>Round 138 — your names are in the game:</b> Gildenmark, Fernheim, Cragland and Cinderheim (your own), Mirrowby, the little map says just the realm (and "The Green" in the village), and every place you ✓ — with Waystone Road as you wrote it. (The painting and music requests keep the old words; only what you read changed.)</div><b>Round 137 — names.</b> The four realms (pick a set, or write your own per realm), the village, and every place name the player reads today — '+N+' of them — with a proposal each. ✓ the proposal, keep today\'s, or write your own. When you are done, one pass puts the new names in every line of the game (the realms alone are named about 1,500 times).',
    designs:[{id:'names137',name:'Names'}],
    render:function(){ var h='<div class="w4-c"><h3>The four realms</h3><div class="nm-sets">'+SETS.map(function(s){ return '<div class="nm-set"><div class="nm-st"><b>'+s[0]+' · '+esc(s[1])+'</b></div><div class="nm-four">'+s.slice(2,6).map(function(n,i){ return '<span><i>'+TODAY[i]+' →</i> '+esc(n)+'</span>'; }).join('')+'</div><div class="nm-why">'+s[6]+'</div></div>'; }).join('')+'</div>'+
        '<div class="w4-a">Your set: '+seg('names-realmset',[['A','A'],['B','B'],['C','C'],['D','D'],['keep','Keep today\'s']])+'</div>'+
        '<div class="nm-own">'+TODAY.map(function(t,i){ var k='names-r'+(i+1); return '<label>'+t+': <input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your own name (or mix from the sets)…"></label>'; }).join('')+'</div></div>';
      G.forEach(function(g){ h+='<div class="w4-c"><h3>'+esc(g[0])+'</h3><table class="nm-t"><tr><th>Today</th><th>Proposal</th><th></th><th>Your own</th></tr>'+g[1].map(function(r){ var k='names-'+r[0]; return '<tr><td>'+esc(r[1])+'</td><td><b>'+esc(r[2])+'</b>'+(r[3]?'<div class="nm-why">'+r[3]+'</div>':'')+'</td><td>'+seg(k,[['pick','✓ Use it'],['cut','Keep today\'s']])+'</td><td><input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="…"></td></tr>'; }).join('')+'</table></div>'; });
      return h+'<textarea class="wl-n wl-all" data-k="names-all" placeholder="Anything else about names (a word you want everywhere, one you never want, people or monster names to look at next)…">'+esc(P('names-all').notes||'')+'</textarea>'; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'names137',label:'🏷 Names: pick the realms\' set, ✓ or rename the places',where:'Names tab',done:function(){ return !!P('names-realmset').verdict; },go:function(){ LTODO.goTo('names137','.nm-sets',0); }});
  var st=document.createElement('style'); st.textContent='.nm-sets{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;margin:6px 0}.nm-set{background:#111a26;border:1px solid #24354a;border-radius:8px;padding:10px;font:13px/1.45 "Segoe UI";color:#c8d4e4}.nm-st{color:#ffe9a8;margin-bottom:4px}.nm-four span{display:block}.nm-four i{color:#7f93ad;font-style:normal;font-size:11.5px}.nm-why{color:#8fa3bd;font-size:12px;margin-top:4px}.nm-own{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:6px;margin-top:8px;font:12.5px "Segoe UI";color:#c8d4e4}'+
    '.nm-t{width:100%;border-collapse:collapse;font:13px/1.4 "Segoe UI";color:#c8d4e4}.nm-t th{text-align:left;color:#ffe9a8;padding:5px}.nm-t td{padding:5px;border-bottom:1px solid #1f2b3a;vertical-align:top}.nm-t td:nth-child(3){white-space:nowrap}.nm-t input{margin:0}'+
    '.wl-seg[data-k="names-realmset"] .wl-sg.on{background:#1f6a3a;border-color:#8fe8a0;color:#fff}';
  document.head.appendChild(st);
})();
