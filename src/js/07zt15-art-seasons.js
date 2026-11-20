// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt15-art-seasons.js — round 115: THE SEASONS' PAINTINGS, wave S1 (the world): Kris ✓ holistic, without the twins' winter mantle.
// ║ Each seasonal sheet is a repaint of a sheet already painted, with that sheet as the FIRST reference: the same items in the same
// ║ places, the same style — only the season changes. Item ids get the season's suffix (tr_round_a → tr_round_a_au); the game uses them
// ║ when they are in and tints the summer ones until then (10zs). Fams seas_sp / seas_au / seas_wi: each loads only in its season.
// ║  · S1 the world (this file): ground marks, trees, bushes and flowers, edge pieces — spring, autumn, winter; the air; season marks and food
// ║  · S2 the village · S3 the rest of the outdoors · S4 the outdoor villagers · S5 the story: in the rounds after (doc 69)
// ═══════════════════════════════════════════════════════════════════════
var ZSEASART={ WAVE:115,
  NAME:{sp:'early spring',au:'autumn',wi:'mild winter'},
  LOOK:{sp:'EARLY SPRING — fresh light-green new growth; buds, and the first white and pale-pink blossom on the fruit trees; short fresh grass with a little of last year\'s straw still showing; a few early flowers (white, yellow, pale blue); cool, clear light',
        au:'AUTUMN — leaves gold, orange, rust and deep red, a few already fallen at the foot; grass golden-tan; ferns, reeds and bracken brown and dry; crops harvested to stubble and stooks; berries ripe; warm, low light',
        wi:'A MILD WINTER — deciduous trees bare (branches and twigs only, a few dry brown leaves clinging); pines and other evergreens stay green with a light frost on their needle tips; grass pale straw-green rimed with white hoarfrost; reeds, ferns and flowers dry, pale and gone to seed; NO snow cover and no snowdrifts — at most a very thin dusting of frost on top surfaces; cold, bright light'},
  KEEP:'Anything that does not grow — stone, rock, sand, ash, lava, crystal, water, wood that is already dead or cut, and any made thing — stays exactly as it is in the reference.',
  // the painted sheets that turn with the year (whole sheets: same layout, so each repaint lines up with the original)
  SRC:['sc_tex_grass','sc_tex_earth','sc_trees_1','sc_trees_2','sc_trees_3','sc_plants_1','sc_plants_2','sc_plants_3','sc_edge_1','sc_edge_3','sc_edge_4','sc_edge_6'],
  id:function(src,s){ return 'sc_seas_'+s+'_'+src.replace(/^sc_/,''); }
};
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[115]='Round 115 — the seasons, wave S1: the world in spring, autumn and winter (repaints of the painted sheets), the air, season marks and food';
  ['sp','au','wi'].forEach(function(s){ ZSEASART.SRC.forEach(function(src){ var S=ZSCN.SHEETS.find(function(x){ return x.id===src; }); if(!S)return;
    ZSCN.SHEETS.push({id:ZSEASART.id(src,s),wave:115,fam:'seas_'+s,kind:S.kind,cols:S.cols,rows:S.rows,size:S.size,noStyle:true,refs:[src],season:s,src:src,
      title:S.title+' — in '+ZSEASART.NAME[s],items:S.items.map(function(it){ return [it[0]+'_'+s,it[1]+' ('+ZSEASART.NAME[s]+')',it[2],it[3],it[4]]; })}); }); });
  // the air: what drifts past in each season (the game draws its own until these are in)
  ZSCN.SHEETS.push({id:'sc_seas_air',wave:115,fam:'air',kind:'flat',cols:4,rows:3,size:'1536x1024',title:'The seasons\' air — small drifting things',items:[
     ['air_petal_pink','Blossom petal, pink','a single soft pale-pink blossom petal, slightly curled',14,12],['air_petal_white','Blossom petal, white','a single white fruit-tree petal with a faint yellow base',14,12],
     ['air_blossom','Blossom sprig','a tiny sprig of three apple blossoms with two small green leaves',22,18],['air_pollen','Pollen mote','a tiny soft golden mote of pollen with a gentle glow',8,8],
     ['air_firefly','Firefly','a small firefly seen from above, its tail glowing soft yellow-green',12,12],['air_leaf_gold','Falling leaf, gold','a single gold birch leaf, slightly twisted as it falls',16,14],
     ['air_leaf_red','Falling leaf, red','a single deep-red maple-like leaf, slightly twisted',16,14],['air_leaf_brown','Falling leaf, brown','a single dry brown oak leaf, curled at the edge',16,14],
     ['air_leaf_orange','Falling leaf, orange','a single orange beech leaf',16,14],['air_frost','Frost glint','a tiny six-pointed glint of frost, white and pale blue',10,10],
     ['air_flake','Snowflake','a single small soft snowflake (rare — a mild winter)',10,10],['air_breath','Breath cloud','a small soft white puff of breath in cold air, fading at the edges',24,16]]});
  // the season marks for the HUD, and the seasons' food (Benno's and Tilda's shelves, and what you forage at camps)
  ZSCN.SHEETS.push({id:'sc_seas_icons',wave:115,fam:'icons',kind:'icon',cols:4,rows:3,size:'1536x1024',title:'Item icons — the seasons: their marks and their food',items:[
     ['ic_season_sp','Spring','a round rune-medallion of pale silver with a green sprouting seedling and two small blossoms, a soft teal glow',48,48],['ic_season_su','Summer','a round rune-medallion of pale silver with a golden sun over green leaves, a soft teal glow',48,48],
     ['ic_season_au','Autumn','a round rune-medallion of pale silver with two crossed golden-red leaves, a soft teal glow',48,48],['ic_season_wi','Winter','a round rune-medallion of pale silver with a frosted pine sprig and a single snowflake, a soft teal glow',48,48],
     ['ic_spring_greens','Spring Greens','a small bundle of fresh wild garlic and nettle tops tied with twine',48,48],['ic_summer_berries','Summer Berries','a little birch-bark basket of red and blue berries',48,48],
     ['ic_autumn_apples','Autumn Apples','three red-gold apples, one with a leaf on its stalk',48,48],['ic_mulled_mead','Mulled Mead','a horn cup of warm spiced mead with a cinnamon stick and a curl of steam',48,48],
     ['ic_honey_cake','Honey Cake','a small round honey cake shaped like a fox, golden and glazed',48,48],['ic_mushrooms','Forest Mushrooms','a handful of brown and golden forest mushrooms with moss',48,48],
     ['ic_frost_herb','Frost-herb','a sprig of a pale blue-green herb rimed with frost',48,48],['ic_hazelnuts','Hazelnuts','a small heap of hazelnuts, some still in their green husks',48,48]]});
  // the request text: a repaint of the first reference, only the season changing
  var b0=ZSCN.body; ZSCN.body=function(S){ if(!S||!S.season)return b0.apply(ZSCN,arguments); var tex=S.kind==='tex', n=S.items.length;
    return 'Create ONE image for a 2D top-down action RPG called The Quests of Zeldara and Zeldor: '+(tex?'a sheet of '+n+' square ground-texture swatches':'a sheet of '+n+' separate pieces of scenery')+' — '+S.title+'.\n'+
      'This is a SEASONAL REPAINT of the FIRST reference image, an approved sheet of this game\'s art. Keep everything about it — the same items, in the same order, the same places and sizes in the grid, the same painted style, outlines, highlights and lighting angle'+(tex?', and every swatch still a seamless repeating tile':', each still on a transparent background')+'. Change ONLY the season, to '+(S.look||ZSEASART.LOOK[S.season])+'.\n'+(S.keep||ZSEASART.KEEP)+'\n'+
      'Layout: exactly '+n+(tex?' swatches':' objects')+' in a grid of '+S.cols+' columns × '+S.rows+' rows, as in the reference (left to right, top row first)'+(n<S.cols*S.rows?'; the last '+(S.cols*S.rows-n)+' cell(s) stay empty':'')+':\n'+
      S.items.map(function(it,i){ return (i+1)+'. '+it[1]+' — '+it[2]+'.'; }).join('\n')+'\n'+ZSCN.VIEW[S.kind]; };
})();
