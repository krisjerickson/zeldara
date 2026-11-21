// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt17-art-seasons-s2.js — round 118: THE SEASONS' PAINTINGS, wave S2 — THE VILLAGE (Kris: "all of the season painting look good, lets
// ║ get these in" — S1 is in the game; this is the next wave — and his picks in Lab › Seasons: decorations & festivals: ✓ dressings over the
// ║ buildings, ✓ the buildings repainted, ✓ all five festivals, ✓ clothes, music, food, lit nights, and when a festival runs).
// ║  · B — the village's buildings and props repainted in autumn and a mild winter (repaints of the approved sheets, first reference = the
// ║    summer sheet; ids <item>_au / <item>_wi; fams seas_au / seas_wi load only in their season; 10zs ZSEASON.item uses them when in)
// ║  · A — the festival dressings: pieces laid over every building at its door, roof ridge, windows and eaves, one sheet per festival,
// ║    and the lanterns and window candles of the festival nights (fam fest)
// ║  · the festival set-pieces for the Green, one sheet per festival (fam fest)
// ║  · the festival food (icons)
// ║  Festival story frames (24) come with S5, the festival clothes with S4. .\tools\sprites\paint.ps1 -List r118_seasons_s2
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined'||typeof ZSEASART==='undefined')return;
  ZSCN.WAVES[121]='Round 121 — the winter village painted again, with Kris\'s notes (a few festive touches; the gardens harvested)';
  ZSCN.WAVES[118]='Round 118 — the seasons, wave S2: the village in autumn and winter, the festival dressings and set-pieces, the festival food';
  var NO=' No pixel art. No text, no letters, no numbers.';
  var LOOKB={au:'AUTUMN in the village — fallen gold and rust leaves gathered on the roofs, in gutters and against the walls; climbing ivy and vines on the walls turned red; window boxes and gardens with late flowers, pumpkins, gourds and drying herbs; a few apples in baskets by doors; warm, low golden light',
    wi:'A MILD WINTER in the village — a light white hoarfrost on the roofs, thatch and ledges (NOT deep snow: the roof colours still show); a few short icicles at the eaves; thin smoke curling from every chimney; windows glowing warm amber; bare vines on the walls; firewood stacked by doors; cool, clear light'};
  var KEEPB='The buildings themselves — their shape, walls, roofs, doors, signs, colours and every made detail — stay exactly as in the reference; only what the season brings is added (leaves, frost, smoke, light, a few seasonal things by the doors).';
  // ── round 121 (Kris, Lab › Seasons: the paintings): "let's have some mild festive decor as well, like some wreaths and holly, but don't have too
  //    much, just minor additions" (village buildings 1, 2, craftsmen's buildings, tall landmarks, props 1) and "vegetables should be picked and
  //    gone at this point" (props 3). These sheets are painted again: .\tools\sprites\redo.ps1 -List r121_winter_redo
  var FEST='A FEW SMALL FESTIVE TOUCHES for midwinter, kept minor: a small evergreen wreath with red berries on some doors, a sprig of holly over a window or a sign, a short twist of fir bough along an occasional eave or rail. Not on every building, not covering anything; most of each building looks exactly as before with only frost added.';
  var WI121={sc_vill_core_1:FEST,sc_vill_core_2:FEST,sc_vill_special_1:FEST,sc_vill_special_2:FEST,sc_vprops_1:FEST,
    sc_vprops_3:'THE GARDENS ARE HARVESTED: every vegetable patch is bare dark soil in neat rows with a little frost, the crops picked and gone (no cabbages, carrots, leeks or pumpkins left in the ground — at most a few dry stalks); the fences, walls, hedges and banners as before, lightly frosted.'};
  ['au','wi'].forEach(function(s){ ['sc_vill_core_1','sc_vill_core_2','sc_vill_houses','sc_vill_special_1','sc_vill_special_2','sc_vprops_1','sc_vprops_2','sc_vprops_3','sc_vprops_4'].forEach(function(src){
      var S=ZSCN.SHEETS.find(function(x){ return x.id===src; }); if(!S)return;
      var X=s==='wi'?WI121[src]:null;      /* round 121: Kris's notes on the first winter repaints */
      ZSCN.SHEETS.push({id:ZSEASART.id(src,s),wave:X?121:118,fam:'seas_'+s,kind:S.kind,cols:S.cols,rows:S.rows,size:S.size,noStyle:true,refs:[src],season:s,src:src,look:LOOKB[s]+(X?' '+X:''),keep:KEEPB,
        title:S.title+' — in '+ZSEASART.NAME[s],items:S.items.map(function(it){ return [it[0]+'_'+s,it[1]+' ('+ZSEASART.NAME[s]+')',it[2],it[3],it[4]]; })}); }); });
  // ── round 122 (Kris: "let's plan to paint a spring version for all buildings, and we can add in spring things like flowers"): the five
  //    building sheets in early spring — the season the game opens in and stays in through the first two realms. Props keep their summer look
  //    until Kris asks (Lab › Seasons: the paintings). .\tools\sprites\paint.ps1 -List r122_spring_village
  ZSCN.WAVES[123]='Round 122 — the village buildings in early spring (flowers, blossom, fresh green)';
  var LOOKSP='EARLY SPRING in the village, the first in thirty-six years — window boxes and planters overflowing with fresh spring flowers (white, yellow, pale blue, soft pink: crocus, primrose, daffodils, violets); a few small clusters of white and pale-pink blossom on any tree or climbing branch beside a wall; young bright-green ivy and new leaves climbing the walls; small tufts of new grass and wildflowers at the foot of walls and steps; a bird\'s nest under one eave; the thatch and roofs fresh and clean after the thaw; soft, fresh morning light. Cheerful but light: flowers ADDED around the buildings, never covering doors, signs or windows';
  ['sc_vill_core_1','sc_vill_core_2','sc_vill_houses','sc_vill_special_1','sc_vill_special_2'].forEach(function(src){
    var S=ZSCN.SHEETS.find(function(x){ return x.id===src; }); if(!S)return; var s='sp';
    ZSCN.SHEETS.push({id:ZSEASART.id(src,s),wave:123,fam:'seas_'+s,kind:S.kind,cols:S.cols,rows:S.rows,size:S.size,noStyle:true,refs:[src],season:s,src:src,look:LOOKSP,keep:KEEPB,
      title:S.title+' — in '+ZSEASART.NAME[s],items:S.items.map(function(it){ return [it[0]+'_'+s,it[1]+' ('+ZSEASART.NAME[s]+')',it[2],it[3],it[4]]; })}); });
  // ── A · the festival dressings: small pieces hung on any building (the game places them at the door, ridge, windows and eaves) ──
  var D=' Each piece alone and centred on a transparent background, seen from the front as it would hang on a timber-and-stone Norse village building in a top-down RPG, small and readable.'+NO;
  ZSCN.SHEETS.push(
   {id:'sc_fest_dress_sp',wave:118,fam:'fest',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_vill_core_1'],title:'Festival dressings — the Blossom Feast (spring).'+D,items:[
     ['fd_sp_door','Door garland','an arch-shaped garland of birch twigs and white and pink blossom, to hang over a door',64,40],['fd_sp_ridge','Ridge streamers','a short line of fluttering spring ribbons — green, white, yellow — strung along a roof ridge',96,28],
     ['fd_sp_window','Window flowers','a little wooden window box overflowing with white, yellow and pale-blue spring flowers',44,22],['fd_sp_eave','Eave posy','a small hanging bunch of blossom and birch leaves tied with a ribbon',22,32],
     ['fd_sp_wreath','Flower wreath','a round wreath of spring flowers and young leaves',36,36],['fd_sp_step','Step pots','two small clay pots of spring flowers for either side of a door step',48,26],
     ['fd_sp_banner','Spring banner','a small hanging cloth banner, pale green, a white blossom embroidered on it (no letters)',28,44],['fd_sp_lantern','Blossom lantern','a small paper-and-wood lantern wrapped in blossom, softly lit',22,30]]},
   {id:'sc_fest_dress_su',wave:118,fam:'fest',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_vill_core_1'],title:'Festival dressings — Midsummer Fires (summer).'+D,items:[
     ['fd_su_door','Midsummer door garland','an arch of green oak leaves and yellow St John\'s wort over a door',64,40],['fd_su_ridge','Sun-wheel','a round straw sun-wheel with eight spokes, bound in red cord, to stand on a roof ridge',44,44],
     ['fd_su_window','Window greenery','birch branches and wildflowers tucked along a window ledge',44,22],['fd_su_eave','Eave lantern string','a short string of three small glowing lanterns hanging from the eaves',80,26],
     ['fd_su_wreath','Midsummer wreath','a round wreath of wildflowers and fern, bright summer colours',36,36],['fd_su_step','Mead barrel','a small mead barrel with a horn cup on its lid, beside a door',30,34],
     ['fd_su_banner','Sun banner','a small hanging cloth banner, golden yellow, a sun-wheel embroidered on it (no letters)',28,44],['fd_su_lantern','Summer lantern','a small iron lantern with a warm flame, a sprig of greenery tied to it',22,30]]},
   {id:'sc_fest_dress_au',wave:118,fam:'fest',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_vill_core_1'],title:'Festival dressings — the Harvest Fires and Winter Nights (autumn).'+D,items:[
     ['fd_au_door','Harvest sheaf','a tied sheaf of golden wheat with a red ribbon, to stand beside a door',30,48],['fd_au_ridge','Ridge corn','a short row of dried corn and wheat bundles tied along a roof ridge',96,28],
     ['fd_au_window','Window candle','a single thick beeswax candle burning in a small clay holder on a window ledge, for the dead on Winter Nights',20,26],['fd_au_eave','Hanging gourds','a small bunch of dried gourds and herbs hanging from the eaves',24,34],
     ['fd_au_wreath','Harvest wreath','a round wreath of wheat, oak leaves, acorns and red berries',36,36],['fd_au_step','Apple basket','a wicker basket of red and gold apples with a gourd beside it',40,28],
     ['fd_au_banner','Harvest banner','a small hanging cloth banner, deep rust-red, a wheat sheaf embroidered on it (no letters)',28,44],['fd_au_lantern','Turnip lantern','a carved turnip lantern with a gentle candle glow inside',22,24]]},
   {id:'sc_fest_dress_wi',wave:118,fam:'fest',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_vill_core_1'],title:'Festival dressings — Yule (a mild winter).'+D,items:[
     ['fd_wi_door','Yule bough','an arch of evergreen fir and holly with red berries over a door',64,40],['fd_wi_ridge','Ridge evergreen','a short line of fir boughs tied along a roof ridge, lightly frosted',96,28],
     ['fd_wi_window','Yule candles','three small candles in a carved wooden holder on a window ledge, warmly lit',36,24],['fd_wi_eave','Rune-lit icicle lantern','a small glass lantern glowing soft teal, hanging from the eaves',22,32],
     ['fd_wi_wreath','Yule wreath','a round evergreen wreath with red berries and a red ribbon',36,36],['fd_wi_step','Straw Yule goat','a small straw goat bound with red cord, standing by a door step',34,34],
     ['fd_wi_banner','Yule banner','a small hanging cloth banner, deep green, a red-and-gold knot embroidered on it (no letters)',28,44],['fd_wi_lantern','Yule lantern','a small iron lantern with a warm flame and a sprig of holly',22,30]]},
   {id:'sc_fest_dress_bl',wave:118,fam:'fest',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_vill_core_1'],title:'Festival dressings — Freya\'s Spring, and the lights of every festival night.'+D,items:[
     ['fd_bl_door','Freya\'s garland','an arch of blossom woven with thin threads of glowing teal light, over a door',64,40],['fd_bl_ridge','Falcon pennants','a short line of small pennants, each with a white falcon feather, along a roof ridge (no letters)',96,28],
     ['fd_bl_window','Window blossom','apple blossom and bluebells along a window ledge, faint teal motes among them',44,22],['fd_bl_wreath','Light wreath','a round wreath of blossom with a soft glowing teal ring of light inside it',36,36],
     ['fd_night_string','Lantern string','a long gently curving string of five small warm-glowing lanterns, to hang across a street',140,30],['fd_night_candle','Window candle glow','a single candle flame in a window with a warm round glow around it',22,26],
     ['fd_night_torch','Festival torch','a tall iron torch on a pole with a bright flame, for the edges of the Green',18,60],['fd_night_brazier','Festival brazier','a round iron brazier on three legs, glowing with fire',36,34]]});
  // ── the festival set-pieces for the Green ──
  var G=' Each piece alone and centred on a transparent background, in the game\'s classic top-down three-quarter view, standing on the ground with a soft shadow.'+NO;
  ZSCN.SHEETS.push(
   {id:'sc_fest_set_sp',wave:118,fam:'fest',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vprops_1'],title:'The Blossom Feast on the Green.'+G,items:[
     ['fs_sp_pole','Birch pole','a tall birch pole wound with green and white ribbons, a wreath of blossom at its top, ribbons streaming',60,150],['fs_sp_arch','Garland arch','a wooden arch wrapped in blossom garlands, wide enough to walk under',120,110],
     ['fs_sp_tafl','Tafl table','a small wooden table with a carved hnefatafl board and pieces, two stools',80,60],['fs_sp_cart','Flower cart','a little wooden handcart full of spring flowers and flower crowns',80,60],
     ['fs_sp_crowns','Crown stand','a wooden stand hung with flower crowns',50,60],['fs_sp_post','Furrow rune-post','a small carved wooden post with a blossom tied to it, marking a fresh furrow',24,44]]},
   {id:'sc_fest_set_su',wave:118,fam:'fest',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vprops_1'],title:'Midsummer Fires on the Green.'+G,items:[
     ['fs_su_fire_off','Bonfire stack','a tall cone of stacked logs and brushwood ready for a midsummer fire, unlit',90,110],['fs_su_fire_on','Bonfire, lit','the same bonfire stack blazing, tall bright flames and sparks',90,130],
     ['fs_su_table','Trestle table','a long trestle table with bread, cheese, berries and mead horns',140,60],['fs_su_wheel','Sun-wheel to roll','a large straw sun-wheel on its edge, wound with red cord',60,64],
     ['fs_su_boat','Garlanded boat','a small wooden rowing boat hung with flower garlands, pulled up on the shore',110,60],['fs_su_judge','Taste-off stand','a small wooden stand with two covered dishes and two horn cups for judging',70,60]]},
   {id:'sc_fest_set_au',wave:118,fam:'fest',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vprops_1'],title:'The Harvest Fires and Winter Nights on the Green.'+G,items:[
     ['fs_au_figure','Last-sheaf figure','a tall straw figure made from the last sheaf of the harvest, arms out, a red ribbon at its waist',60,120],['fs_au_barrels','Ale barrels','three ale barrels, one tapped, with tankards on top',90,60],
     ['fs_au_stage','Flyting stage','a low wooden platform with a carved chair, for the insult-verse contest',110,70],['fs_au_baskets','Harvest heap','baskets of apples, gourds, turnips and a heap of grain sacks',100,60],
     ['fs_au_candles','Runestone candles','a ring of small burning candles on the ground, as laid round a standing stone (no stone)',90,40],['fs_au_forge','Forge-off anvil','a portable anvil on a stump beside a small glowing forge pit',80,60]]},
   {id:'sc_fest_set_wi',wave:118,fam:'fest',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vprops_1'],title:'Yule on the Green.'+G,items:[
     ['fs_wi_goat','Great Yule goat','a huge straw goat bound with red cord, taller than a person, standing on the Green',100,120],['fs_wi_log','Yule log','a great oak log on trestles, decorated with evergreen and red ribbon, ready for the hearth',100,50],
     ['fs_wi_oath','Oath table','a heavy table with a carved wooden boar\'s head on a platter and drinking horns, for swearing the year\'s oaths',110,70],['fs_wi_tree','Lantern tree','a small fir tree hung with glowing lanterns and red berries, lightly frosted',70,110],
     ['fs_wi_gifts','Gift bundles','a few bundles wrapped in cloth and tied with red cord, by a door',50,34],['fs_wi_goat_small','Hidden Yule goat','a small straw Yule goat lying on its side, half hidden, for the search',34,30]]},
   {id:'sc_fest_set_bl',wave:118,fam:'fest',kind:'obj',cols:3,rows:1,size:'1536x1024',refs:['sc_vprops_1'],title:'Freya\'s Spring on the Green.'+G,items:[
     ['fs_bl_cradles','Carved cradles','two small carved wooden cradles with blossom laid in them, set out on the grass',90,60],['fs_bl_banner','Falcon banners','two tall poles with white banners showing a falcon (no letters)',80,140],
     ['fs_bl_garland','Light garland','a long blossom garland threaded with glowing teal light, hung between two posts',150,70]]});
  // ── the festival food (Benno's and the tavern's shelves while a festival is on) ──
  ZSCN.SHEETS.push({id:'sc_fest_food',wave:118,fam:'icons',kind:'icon',cols:4,rows:2,size:'1536x1024',title:'Item icons — the festival foods',items:[
     ['ic_spring_cake','Blossom Cake','a small round cake topped with candied blossom petals',48,48],['ic_midsummer_mead','Midsummer Mead','a horn cup of golden mead with a sprig of meadowsweet',48,48],
     ['ic_harvest_bread','Harvest Bread','a braided harvest loaf shaped like a wheat sheaf',48,48],['ic_yule_pork','Yule Pork','a slice of roast pork on a wooden board with apple and a sprig of juniper',48,48],
     ['ic_flower_crown','Flower Crown','a crown of white, yellow and pale-blue spring flowers',48,48],['ic_sun_wheel','Little Sun-wheel','a small straw sun-wheel bound with red cord',48,48],
     ['ic_harvest_candle','Winter Nights Candle','a beeswax candle in a small clay holder, burning',48,48],['ic_yule_goat','Straw Goat','a small straw Yule goat bound with red cord',48,48]]});
})();
