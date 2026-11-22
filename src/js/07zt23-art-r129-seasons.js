// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt23-art-r129-seasons.js — round 129: THE SEASONS' GAPS (Kris: "i still don't see new requests or updates for the 5 seasons as well as
// ║ the festivals" — Lab › All the seasons and festivals shows every season group by group; these are what was still missing).
// ║  · the village props in the thaw (_th) and in Freya's spring (_sp): until now both seasons showed the summer props (or a tint);
// ║    autumn and Yule have had theirs since round 118
// ║  · the three Blossom Feast pieces that did not come out of their sheet (the flower pole, the crown stand, the flower cart)
// ║  (Autumn's evergreens — pines, mangroves, hedges, topiary, ivy, moss — now keep their summer green in the game, 10zs: no painting needed.)
// ║   .\tools\sprites\paint.ps1 -List r129_seasons
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined'||typeof ZSEASART==='undefined')return;
  ZSCN.WAVES[131]='Round 129 — the seasons\' gaps: the village props in the thaw and in Freya\'s spring, the missing Blossom Feast pieces';
  var NO=' No pixel art. No text, no letters, no numbers.';
  var KEEPP='Every prop itself — its shape, wood, stone, metal, colours and every made detail — stays exactly as in the reference; only what the season brings is added.';
  var LOOK={th:'THE THAW in the village, the first spring after thirty-six winters, still MUTED: thin grey slush and the last small patches of old snow at the foot of things and in their shadows; wet dark wood and stone with meltwater dripping into small puddles; a few icicles shrinking; NO flowers and NO blossom — at most a single snowdrop or a tuft of coltsfoot; a few practical spring things: a bucket of tar, a coil of mended net, a sack of seed, furs hung out to air; muted grey-green light',
    sp:'FREYA\'S SPRING in the village — a lush celebration of life: planters, barrels and every ledge overflowing with flowers (white wood anemones, lily of the valley, yellow cowslips, bluebells, violets); fresh light-green birch branches in young leaf tied to posts and rails; garlands of flowers and green-and-white ribbons; a little blossom fallen on the ground; bees and a swallow or two; warm golden light'};
  ['th','sp'].forEach(function(s){ ['sc_vprops_1','sc_vprops_2','sc_vprops_3','sc_vprops_4'].forEach(function(src){
      var S=ZSCN.SHEETS.find(function(x){ return x.id===src; }); if(!S)return;
      ZSCN.SHEETS.push({id:ZSEASART.id(src,s),wave:131,fam:'seas_'+s,kind:S.kind,cols:S.cols,rows:S.rows,size:S.size,noStyle:true,refs:[src],season:s,src:src,look:LOOK[s],keep:KEEPP,
        title:S.title+' — in '+ZSEASART.NAME[s],items:S.items.map(function(it){ return [it[0]+'_'+s,it[1]+' ('+ZSEASART.NAME[s]+')',it[2],it[3],it[4]]; })}); }); });
  var G=' Each piece alone and centred on a transparent background, in the game\'s classic top-down three-quarter view, standing on the ground with a soft shadow, painted in the same hand-painted Norse storybook style as the reference.'+NO;
  ZSCN.SHEETS.push({id:'sc_fest_set_bl2',wave:131,fam:'fest',kind:'obj',cols:3,rows:1,size:'1536x1024',refs:['sc_vprops_1'],title:'Freya\'s Spring on the Green — the Blossom Feast (the three pieces still missing).'+G,items:[
     ['fs_bl_pole','Flower pole','a tall birch pole wound with green and white ribbons and flower garlands, a great wreath of blossom at its top',60,150],
     ['fs_bl_crowns','Crown stand','a wooden stand hung with flower crowns of anemones, cowslips and birch leaves',50,60],
     ['fs_bl_cart','Flower cart','a little wooden handcart full of spring flowers and flower crowns',80,60]]});
  /* the old sheet keeps only the pieces that came out of it (the three above are painted again here) */
  var O=ZSCN.SHEETS.find(function(x){ return x.id==='sc_fest_set_bl'; }); if(O)O.items=O.items.filter(function(it){ return ['fs_bl_pole','fs_bl_crowns','fs_bl_cart'].indexOf(it[0])<0; });
})();
