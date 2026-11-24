// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt24-art-r130-seasons-redo.js — round 130: THE SEASONS, PAINTED AGAIN where Kris asked (Lab › All the seasons & festivals, ↻):
// ║  · autumn trees: "we have 3 types of evergreen trees, the pines, that turn orange. these need to stay green, but OK to propose another
// ║    way for them to show its fall. Also, the other trees just turn orange, but it should be a variety of fall colors"
// ║  · autumn plants: "not everything in fall turns orange. we need a variety of fall colors. study what different colors things would turn"
// ║  · the thaw, plants: "there shouldn't be fully grown wheat, corn or cabbage yet. these should be seedlings"
// ║  · the thaw, village props: "the vegetable gardens shouldn't have veggies yet. just little seedlings"
// ║  · winter, plants: "the corn, wheat and cabbage should be harvested now, and should be an open field with rows of soil"
// ║ What turns which colour (temperate northern woods): oaks hold russet-brown and bronze leaves late; birch, willow, aspen, hazel go
// ║ butter-yellow; beech and larch gold to copper; maple, rowan, cherry and wild pear red to scarlet; dogwood and bramble purple-wine;
// ║ bald (swamp) cypress rust-cinnamon; bracken copper; grasses straw and tawny; Michaelmas asters and heather still in purple flower;
// ║ evergreens (pines, spruce, holly, ivy, box) stay green — their autumn is shown by what lies around them: cones, fallen leaves
// ║ blown in from other trees, red berries, fungi at the foot.
// ║   .\tools\sprites\redo.ps1 -List r130_seasons_redo
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  var S=function(id){ return ZSCN.SHEETS.find(function(x){ return x.id===id; }); };
  // set the words for one piece (by id): what it should look like now
  var put=function(sheet,map){ var X=S(sheet); if(!X)return; X.redo130=true; X.items.forEach(function(it){ if(map[it[0]])it[2]=map[it[0]]; }); };
  var VAR='AUTUMN WITH A REAL VARIETY OF COLOUR — NOT everything orange. Each tree and plant turns the colour its own kind turns (given for each piece below): butter-yellow, gold, copper, russet-brown, bronze, scarlet, crimson, wine-purple, and some still partly green just turning at the edges; a few fallen leaves of the same colour at the foot; grass golden-tan; warm, low light';
  ['sc_seas_au_trees_1','sc_seas_au_trees_2','sc_seas_au_trees_3','sc_seas_au_plants_1','sc_seas_au_plants_2','sc_seas_au_plants_3'].forEach(function(k){ var X=S(k); if(X)X.look=VAR; });
  put('sc_seas_au_trees_1',{
    tr_round_a_au:'an OAK in autumn: its leaves russet-brown and bronze with patches of dull olive green still on the inner crown — oaks hold their brown leaves late; a few acorns and brown leaves at the foot',
    tr_round_b_au:'a tall BEECH-like tree in autumn: the crown clear gold shading to copper at the top, still a little green low down',
    tr_round_c_au:'a young MAPLE in autumn: brilliant scarlet and crimson leaves, a few already fallen in a red ring at its foot',
    tr_blossom_a_au:'a wild CHERRY in autumn: leaves mixed orange-red and wine-purple, a few still yellow',
    tr_blossom_b_au:'an old APPLE / pear tree in autumn: leaves yellow-green turning pale gold, ripe red-gold apples still on the branches and a few in the grass',
    tr_stump_au:'the tree stump, unchanged, with a ring of bracket fungus and a few mixed yellow and red fallen leaves'});
  put('sc_seas_au_trees_2',{
    tr_willow_a_au:'a WILLOW in autumn: long trailing leaves pale butter-yellow with some still green',
    tr_willow_b_au:'the leaning WILLOW in autumn: lemon-yellow and lime leaves, a few yellow leaves floating at the foot',
    tr_mangrove_a_au:'the mangrove stays GREEN (it does not turn) — only a few yellow leaves caught in its roots',
    tr_mangrove_glow_au:'the glow mangrove stays GREEN with its soft glow — a few fallen golden leaves among its roots',
    tr_cypress_au:'a SWAMP (bald) CYPRESS in autumn: its feathery needles turned rust and cinnamon-orange — the one conifer that does turn',
    tr_drowned_au:'the drowned trunk, unchanged, with a few floating yellow and brown leaves around it'});
  put('sc_seas_au_trees_3',{
    tr_pine_a_au:'the PINE stays fully EVERGREEN — its needles the same deep green as in the reference, NOT orange or brown. Its autumn shows only at its foot: brown pine cones, a scatter of yellow birch and red maple leaves blown in from other trees, two small red-capped mushrooms',
    tr_pine_b_au:'the short PINE stays fully EVERGREEN — deep green needles, NOT orange. At its foot: brown cones, a few fallen gold leaves blown in, a tuft of tawny grass',
    tr_pine_snow_au:'the PINE stays fully EVERGREEN — deep green needles (no snow in autumn, no orange). A light dusting of fallen golden larch needles and a few red rowan berries at its foot',
    tr_stone_a_au:'the petrified tree, unchanged stone, with a few dry brown leaves at its foot',
    tr_stone_b_au:'the broken petrified tree, unchanged stone, with a few dry leaves caught in its cracks',
    tr_log_stone_au:'the petrified log, unchanged stone, with a little moss and fallen leaves'});
  put('sc_seas_au_plants_1',{
    pl_bush_au:'a DOGWOOD-like bush in autumn: wine-purple and deep red leaves',
    pl_bush_berry_au:'a berry bush in autumn: leaves bronze and yellow, heavy with ripe dark blue-black berries',
    pl_bush_flower_au:'the flowering bush in autumn: its flower heads dried to papery dusky pink and mauve, leaves olive and bronze',
    pl_bush_glow_au:'the glow bush keeps its soft glow; its leaves amber-gold',
    pl_flowers_red_au:'red flowers in autumn: a few late dark-red blooms among red rose hips and brown seed heads',
    pl_flowers_yellow_au:'yellow flowers in autumn: tall goldenrod-like sprays of yellow and fading tan seed heads',
    pl_flowers_blue_au:'blue flowers in autumn: Michaelmas asters in full flower — violet-blue daisies with yellow centres (they bloom in autumn)',
    pl_flowers_white_au:'white flowers in autumn: fluffy white seed clocks and silvery seed heads',
    pl_tuft_au:'a grass tuft in autumn: tawny straw with a little green at the base',
    pl_tallgrass_au:'tall grass in autumn: pale blond plumes and straw-coloured stems',
    pl_crystalgrass_au:'the crystal grass, unchanged (crystal does not turn)',
    pl_fern_au:'a bracken fern in autumn: copper-brown and rust fronds'});
  put('sc_seas_au_plants_2',{
    pl_reeds_au:'reeds in autumn: tan and straw-gold with feathery brown tops',
    pl_cattails_au:'cattails in autumn: dark brown heads starting to split into white fluff, leaves olive-tan',
    pl_wispreeds_au:'the wisp reeds keep their soft glow; stems silvery-tan',
    pl_lilypad_au:'lily pads in autumn: yellow edges and a few brown ones, one or two still green',
    pl_lanternlily_au:'the lantern lily keeps its glow; its leaves amber',
    pl_curtain_au:'the willow curtain in autumn: butter-yellow trailing leaves',
    pl_emberflower_au:'the emberflower, unchanged (it burns in every season)',
    pl_emberflower_b_au:'the emberflower patch, unchanged',
    pl_mushrooms_au:'more mushrooms than in summer — brown, gold and red-capped forest mushrooms among fallen leaves',
    pl_heather_au:'heather in autumn: still purple in flower, fading to rust at the tips',
    pl_cactus_au:'the ash thistle in autumn: silvery-white seed heads',
    pl_vine_au:'a hanging vine in autumn: crimson and scarlet like Virginia creeper'});
  put('sc_seas_au_plants_3',{
    pl_wheat_au:'the wheat strip HARVESTED: short golden stubble in rows with a few tied sheaves (stooks) standing',
    pl_corn_au:'the corn strip at harvest: tall dry tan stalks, the cobs picked, a few stalks bundled into shocks',
    pl_crop_green_au:'the crop strip at harvest: big ripe green and purple cabbages and a few orange pumpkins among them',
    pl_scarecrow_au:'the scarecrow, unchanged, with a crow on its arm and a few leaves at its foot',
    pl_hedge_arch_au:'the hedge arch stays EVERGREEN green, with a few red berries',
    pl_topiary_au:'the topiary stays EVERGREEN green',
    pl_trellis_au:'the rose trellis in autumn: leaves yellow and bronze, red rose hips',
    pl_beehive_au:'the beehive, unchanged, with fallen leaves around it'});
  // the thaw: seedlings, nothing grown yet
  put('sc_seas_th_plants_3',{
    pl_wheat_th:'the wheat strip in the first spring: NO grown wheat — dark, freshly tilled soil in straight rows with tiny new green shoots of sprouting grain just showing, a little old snow in the furrows',
    pl_corn_th:'the corn strip in the first spring: NO corn plants — ploughed dark soil in rows with small seed mounds and a few tiny two-leaf seedlings',
    pl_crop_green_th:'the crop strip in the first spring: NO cabbages — neat rows of tiny cabbage seedlings, each a small rosette of two or three leaves, in wet dark soil'});
  put('sc_seas_th_vprops_3',{
    vp_veg_cabbage_th:'the cabbage bed in the first spring: NO vegetables — raked dark soil with neat rows of tiny cabbage seedlings and a little wooden marker stick',
    vp_veg_carrot_th:'the carrot bed in the first spring: NO carrots — dark soil with fine rows of tiny feathery green seedlings just showing',
    vp_veg_leek_th:'the leek bed in the first spring: NO leeks — soil with thin rows of grass-like green seedlings',
    vp_veg_pumpkin_th:'the pumpkin bed in the first spring: NO pumpkins — low mounds of soil, each with one tiny two-leaf seedling, a little straw around them'});
  // winter: harvested, open field
  put('sc_seas_wi_plants_3',{
    pl_wheat_wi:'the wheat field in winter: HARVESTED — an open field of bare brown soil ploughed into straight furrowed rows, a white hoarfrost on the ridges, nothing growing',
    pl_corn_wi:'the corn field in winter: HARVESTED — open bare soil in furrowed rows with a few cut stalk stubs, rimed with frost, nothing standing',
    pl_crop_green_wi:'the cabbage field in winter: HARVESTED — open bare soil in neat rows with frost on the ridges, no cabbages left'});
  var KC='Anything that does not grow — stone, rock, water, made things — stays exactly as in the reference. The fields and beds named below CHANGE what grows in them (follow each piece\'s words exactly), but keep their size, shape, edges and place in the grid.';
  ['sc_seas_th_plants_3','sc_seas_th_vprops_3','sc_seas_wi_plants_3'].forEach(function(k){ var X=S(k); if(X)X.keep=KC; });
  var KP='EVERGREENS STAY GREEN: pines, the mangroves, hedges and topiary keep exactly the green of the reference. Anything that does not grow — stone, rock, water, crystal, made things — stays exactly as in the reference.';
  ['sc_seas_au_trees_1','sc_seas_au_trees_2','sc_seas_au_trees_3','sc_seas_au_plants_1','sc_seas_au_plants_2','sc_seas_au_plants_3'].forEach(function(k){ var X=S(k); if(X)X.keep=KP; });
})();
