// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt12-art-r109.js — round 109 paintings for the site backdrops (Lab › Site backdrops: Kris picked all seven fixes; 07zy3-site-backdrop.js).
// ║   sc_r109_edges  the stone face that hangs under a floor's edge, one per element (seamless, seen from the front)
// ║   sc_r109_tower  a tower's inner wall (plain and mage), the rock-and-roots underside of a floating floor, and three wall caps
// ║ Until they are in, all of it is drawn by code (07zy3).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[109]='Round 109 — the adventure sites\' edges, tower walls and wall caps';
  var NO=' No pixel art. No text, no letters, no numbers. Seamless: it must tile left to right and top to bottom with no visible seam.';
  ZSCN.SHEETS.push(
   {id:'sc_r109_edges',wave:109,fam:'tex',kind:'tex',cols:3,rows:2,refs:['sc_void_tex'],
    title:'The rock face under the edge of a floating floor, seen straight from the front, filling the whole tile, in the game\'s storybook style.'+NO,items:[
     ['tx_ed_stone','Edge face — grey stone','rough grey-brown layered rock, like the side of a cliff cut through: horizontal strata, small ledges and cracks, a little dust',256,256],
     ['tx_ed_mossy','Edge face — mossy earth','dark earth and stone held together by pale roots, tufts of moss and small ferns spilling over, a few hanging root tips',256,256],
     ['tx_ed_wet','Edge face — wet dark stone','dark blue-grey stone glistening wet, thin trickles of water and small drips, a little green weed in the cracks',256,256],
     ['tx_ed_basalt','Edge face — basalt','black basalt in rough columns with thin glowing orange seams in the cracks, a little ash',256,256],
     ['tx_ed_crystal','Edge face — storm crystal','grey granite shot through with pale blue-white crystal veins that faintly glow, sharp facets here and there',256,256],
     ['tx_ed_shadow','Edge face — shadow stone','deep violet-black stone with faint purple glints, smooth worn surfaces and a few thin silver cracks',256,256]]},
   {id:'sc_r109_tower',wave:109,fam:'tex',kind:'tex',cols:3,rows:2,refs:['sc_void_tex'],
    title:'Stone surfaces for the inside of a tall tower and the tops of its walls, seen straight from the front or from above, filling the whole tile, in the game\'s storybook style.'+NO,items:[
     ['tx_tw_wall','Tower wall — inside','the inside face of a round tower\'s outer wall: big dressed grey stone blocks in even courses, darker mortar, a few old stains, seen straight on',256,256],
     ['tx_tw_wall_mage','Mage tower wall — inside','the inside face of a mage\'s tower: smooth violet-grey stone blocks in even courses with thin faintly glowing teal rune lines carved along some joints',256,256],
     ['tx_isl_under','Floating island — underside','the hanging underside of a floating island of rock: rough dark stone, clods of earth, pale roots and a few dangling vines',256,256],
     ['tx_cap_stone','Wall cap — rough stone','the flat top of a thick stone wall seen from straight above: rough fitted stones, a little moss in the joints',256,256],
     ['tx_cap_brick','Wall cap — dressed brick','the flat top of a castle wall seen from straight above: neat rectangular capstones in staggered rows, worn edges, a few moss spots',256,256],
     ['tx_cap_basalt','Wall cap — basalt','the flat top of a wall of black basalt blocks seen from straight above, a little ash, faint warm glow in one or two joints',256,256]]});
})();
