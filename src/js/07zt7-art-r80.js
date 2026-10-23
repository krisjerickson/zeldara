// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt7-art-r80.js — round 80: THE TWIN'S LIBRARY (Kris: "the other twin studying needs to be in a separate library building. right now
// ║ being outside your home looks weird. also ok to have another bed in your house, and the other twin sleeps there at night. we might
// ║ need to make space for a library in the town, and you should be able to enter it like other buildings. make requests towards this";
// ║ L2–L4: near your Home; a Norse timber saga-hall; the library by day, the second bed at night).
// ║  Wave 90 — the library (two takes of the saga-hall to pick from), its furniture and wall pieces, and the second bed (empty by day,
// ║            the twin asleep in it at night — a Zeldor and a Zeldara version).
// ║ Order: .\tools\sprites\round80.ps1
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[90]='Round 80 — the twin\'s library: the saga-hall, its furniture, the second bed';
  var HALL='a Norse timber saga-hall — the village library: a long hall of dark carved timber on a fieldstone base, a steep turf-and-shingle roof with crossed carved dragon-head gable ends, carved posts by a wide arched double door, tall narrow windows whose small panes glow with warm lamplight and faint light-blue runes (#6fe3f5), a carved sign of an open book over the door, a stack of scrolls and a reading bench by the door, lanterns on posts';
  ZSCN.SHEETS=ZSCN.SHEETS.concat([
    {id:'sc_library',wave:90,fam:'village',kind:'bld',cols:2,rows:1,size:'1536x1024',refs:['sc_glimmerhall','sc_vill_core_1'],title:'The library — a Norse timber saga-hall in the village (two takes to pick from)',items:[
      ['vb_library_a','The library (take A)',HALL+'; the gable end with the door faces the viewer',240,250],
      ['vb_library_b','The library (take B)',HALL+'; a little wider, with a small square lantern tower of rune-lit glass rising from the middle of the roof ridge',260,270]]},
    {id:'sc_int_library',wave:90,fam:'interior',kind:'obj',cols:5,rows:2,size:'1536x1024',refs:['sc_int_1'],title:'Interior furniture — the library',items:[
      ['if_lib_shelf','Tall bookshelf','a tall dark-timber bookshelf packed with old leather-bound books and a few scrolls, carved knotwork on top',44,84],
      ['if_lib_shelf_low','Low bookcase','a long low bookcase of old books with a candle and a small rune stone on top',72,44],
      ['if_scroll_rack','Scroll rack','a wooden rack of pigeonholes full of rolled scrolls tied with ribbon',40,56],
      ['if_rune_tablets','Rune tablets','a stand holding carved stone tablets of runes, one glowing faint light blue',36,50],
      ['if_saga_lectern','Saga lectern','a carved wooden lectern holding a huge open old saga, a ribbon marker hanging down',32,46],
      ['if_lib_table','Reading table','a long reading table with open books, an inkpot and quill and two candles',96,44],
      ['if_map_table','Map table','a table with an old hand-drawn map of a round land of four realms around a lake, weighed down with stones',80,48],
      ['if_lib_ladder','Library ladder','a tall wooden ladder for the high shelves',22,80],
      ['if_lib_candles','Candle stand','a tall iron candle stand with three lit candles',20,44],
      ['if_saga_stone','Saga stone','a small carved standing stone indoors, covered in runes and knotwork, one rune glowing light blue',36,60]]},
    {id:'sc_int_library_wall',wave:90,fam:'interior',kind:'wall',cols:2,rows:2,size:'1024x1024',refs:['sc_int_1'],title:'Interior wall pieces — the library',items:[
      ['iw_tree_panel','World Tree panel','a carved wooden wall panel of a great tree with roots and branches, its lines glowing faint light blue',44,40],
      ['iw_realm_banners','Four realm banners','four small hanging banners side by side in green, blue, amber and red, each with a simple rune',48,36],
      ['iw_rune_window','Rune window','a tall narrow window whose small panes are etched with glowing light-blue runes, night outside',26,34],
      ['iw_star_chart','Star chart','an old parchment star chart of constellations pinned to the wall',40,30]]},
    {id:'sc_twin_bed',wave:90,fam:'interior',kind:'obj',cols:3,rows:1,size:'1536x1024',refs:['sc_int_1','hero_m.model','hero_f.model','sc_twin_study'],title:'The second bed in your Home — empty by day, the other twin asleep in it at night',items:[
      ['if_bed_twin','The twin\'s bed','a wooden bed like the first, with a teal-and-cream patchwork quilt and a small pile of old books by the pillow, empty, neatly made',44,72],
      ['twin_sleep_m','Zeldor asleep','the same bed with Zeldor (the boy in the hero reference: spiky brown hair) asleep under the quilt, an open book face-down on his chest',44,72],
      ['twin_sleep_f','Zeldara asleep','the same bed with Zeldara (the girl in the hero reference: long auburn braids) asleep under the quilt, an open book face-down on her chest',44,72]]}]);
})();
