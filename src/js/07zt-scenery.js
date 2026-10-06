// ═══════════════════════════════════════════════════════════════════════
// ║ SCENERY MANIFEST (round 28) — ZSCN.
// ║ Every background object and ground texture that is to be painted in the
// ║ style of the character sprites, grouped into sheets, with the request text
// ║ per sheet. build.mjs exports it to sprites/requests/scenery.json; Kris sends
// ║ the sheets with tools/sprites/scenery.ps1 (generate.mjs --set scenery);
// ║ tools/sprites/intake_scenery.py cuts them.
// ║ Kris's choice (Oct 6): buildings, entrances, waystones, trees, plants, rocks,
// ║ bridges and harbor pieces as painted sprites; interior furniture and
// ║ furnishings, camp props and trial props too; the ground stays generated but
// ║ is restyled with painted repeating textures and outlines.
// ║ An item: [id, name, what it looks like, width px, height px] — the size is the
// ║ size on screen in world pixels at zoom 1 (the hero's body is 63 px tall).
// ║ Not wired into the game yet: the painters in 07f–07l / 07v / 07b / 07t / 07zm /
// ║ 07c / 07z / 10d still draw everything. Ids here are the ones the wiring will use.
// ═══════════════════════════════════════════════════════════════════════
var ZSCN={
  STYLE:'Art style (match the attached reference images exactly — they show the game\'s characters; paint the scenery so it belongs in the same picture): bold hand-drawn cartoon game art, NOT pixel art and NOT 3D render. '+
    'Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise, no photo detail. '+
    'Chunky, slightly exaggerated storybook proportions: thick beams, fat roof tiles, big simple shapes that read at small size. '+
    'SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of roofs, stone, leaves and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. '+
    'Runes, crystals, magic and enchanted things glow white-cyan with a soft teal halo; fire and lamps glow warm orange. Saturated but limited palette. Light comes from the upper left.',
  RULES:'Rules: every object is separate, sits fully inside its own cell with clear empty space on all sides, and is centred in its cell; nothing touches or crosses into a neighbouring cell. '+
    'All objects on the sheet share one line weight, one palette and one viewing angle. Draw every object as large as its cell comfortably allows, keeping its own proportions (the game scales each one to its real size). Draw only the object: no ground, no grass patch, no cast shadow on the ground, no scenery behind it, no people, no frame, no grid lines, no numbers, no labels, no text, no watermark.',
  RULES_TEX:'Rules: each swatch is a flat square that fills its whole cell from edge to edge — no border, no frame, no vignette, no perspective, no lighting gradient across the square, no single large feature. The pattern must repeat seamlessly when the square is tiled in every direction. Keep every swatch very calm, even and LOW in contrast: it lies under the characters and must not compete with them. Mostly one flat base colour; the marks are small (each no wider than a twelfth of the square), only a little darker or lighter than the base, with NO dark outlines, and spread evenly. '+
    'Leave a thin gap of plain white between the squares. No objects, no shadows of objects, no grid lines, no numbers, no labels, no text, no watermark.',
  BG_ALPHA:'Background: fully transparent (real alpha channel).',
  BG_TEX:'Background between the squares: plain white.',
  VIEW:{
    obj:'View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°, so you see the front face and the top of every object; vertical things stand upright. The bottom edge of each object is where it meets the ground.',
    bld:'View: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the front wall with its door faces the viewer at the bottom, and the roof rises behind it. Walls are vertical; no side perspective, no vanishing point. The bottom edge is where the building meets the ground, with the door in the middle of the front wall unless said otherwise.',
    flat:'View: seen from straight above (a floor decal lying flat on the ground), as in a top-down RPG. No height, no side faces.',
    wall:'View: seen straight from the front, flat, to hang on a room\'s back wall in a top-down RPG.',
    tex:'View: seen from straight above, flat.'
  },
  // waves (generate.mjs --set scenery --wave N). 20 is the pilot: one sheet from each family, to judge the look before sending the rest.
  WAVES:{20:'Pilot (one sheet per family)',21:'Village buildings',22:'Village props',23:'Building interiors',24:'Runes and waystones',25:'Tower, dungeon and other entrances',26:'Trees and plants',27:'Rocks, ruins and landmarks',28:'Paths, bridges and harbors',29:'Ground textures',30:'Camp and trial props',31:'Tower, castle and mage-tower furnishings',32:'Dungeon and arena pieces'},
  // sheet: id, wave, family (the first sheet of a family is the style anchor for the others), kind obj|bld|flat|wall|tex, cols × rows, what the sheet is, items
  SHEETS:[
  // ── 21 · village buildings ─────────────────────────────────────────
  {id:'sc_vill_core_1',wave:21,pilot:1,fam:'village',kind:'bld',cols:3,rows:2,title:'Village buildings 1 — the busy ones',items:[
    ['vb_tavern','Tavern','two-storey timber-framed inn, white plaster between dark beams, steep red clay-tile roof, stone chimney, hanging wooden sign with a tankard, warm lit windows, a lantern by the door',200,290],
    ['vb_shop','General shop','timber-framed shop, red tile roof, a blue-and-white striped awning over a wide front window with goods on the sill, hanging sign with a sack',200,290],
    ['vb_house_round','Round stone house','small round fieldstone house with a tall conical slate-blue roof ending in a little finial, one round window, arched plank door, flower box',168,280],
    ['vb_forge','Blacksmith\'s forge','squat grey stone smithy with a dark slate roof, a big chimney with a glow at its mouth, an open arched front showing the orange forge fire, anvil sign, horseshoes nailed by the door',168,290],
    ['vb_guild','Guild hall','formal grey stone hall with a slate roof, two narrow banner flags by a double door, a carved crest over the lintel, tall leaded windows',168,250],
    ['vb_stables','Stables','long low wooden stable with a mossy shingle roof, two half-doors (one open with hay visible), a hay loft hatch under the gable, a hitching rail and a water bucket',232,320]]},
  {id:'sc_vill_core_2',wave:21,fam:'village',kind:'bld',cols:3,rows:2,title:'Village buildings 2 — the craft shops',items:[
    ['vb_armory','Armory','stout grey stone building with a slate roof, iron-banded door, a shield-and-crossed-swords sign, a weapon rack and a round shield displayed by the wall',200,290],
    ['vb_clothing','Tailor\'s shop','timber-framed shop with a tile roof and a rose-and-cream striped awning, a dress form in the window, a sign with scissors and thread',200,290],
    ['vb_jeweler','Jeweler\'s round house','elegant round stone house with a purple conical roof topped by a small gem finial, a sparkling diamond-paned window, a ring-shaped sign',200,290],
    ['vb_apothecary','Sorcerer\'s apothecary','long wooden herb shop with a dark green shingle roof, bundles of herbs drying under the eave, a round window glowing soft green, a bottle-shaped sign, potted plants by the door',232,290],
    ['vb_bakery','Bakery','timber-framed bakery with a tile roof and a yellow striped awning, a serving hatch with loaves on the sill, a pretzel sign, a smoking oven chimney',200,290],
    ['vb_fishing_hut','Fishing hut','tiny weathered plank hut with a patched shingle roof, nets and glass floats hung on the wall, a rod leaning by the door',136,250]]},
  {id:'sc_vill_houses',wave:21,fam:'village',kind:'bld',cols:4,rows:2,title:'Village houses — the homes between the shops',items:[
    ['vh_round','Round cottage','small round stone cottage, conical moss-green roof, round door',136,250],
    ['vh_wood','Plank cottage','small dark-plank cottage with a grey shingle roof, shuttered window, woodpile by the wall',136,250],
    ['vh_timber_a','Timber-framed cottage','small white-plaster timber-framed cottage, red tile roof, flower box',136,250],
    ['vh_timber_b','Timber-framed house, wider','wider timber-framed house with a tile roof, two windows, a bench by the door',200,250],
    ['vh_stone','Stone cottage','small grey stone cottage with a slate roof and a stubby chimney',136,250],
    ['vh_stone_b','Stone house, wider','wider stone house with a slate roof, a lean-to shed on one side',200,250],
    ['vh_thatch','Thatched cottage','small timber cottage with a thick golden thatched roof with rounded edges, tiny dormer window',136,250],
    ['vh_thatch_b','Thatched house, wider','wider thatched house, the thatch tied down with ropes and stones, a rain barrel by the door',168,250]]},
  {id:'sc_vill_special_1',wave:21,fam:'village',kind:'bld',cols:3,rows:2,title:'Village — craftsmen\'s buildings and the lake',items:[
    ['vb_builders_yard','Bram\'s builder\'s yard','open-fronted wooden workshop with a shingle roof, stacked planks and a sawhorse in front, a crane arm with a pulley on the gable',200,250],
    ['vb_workshop','Mira\'s workshop','tidy stone-and-timber workshop with a round skylight, brass pipes and a small gear turning on the wall, a blueprint pinned by the door',168,250],
    ['vb_forge_hall','Dunn\'s forge hall','broad stone forge hall with two chimneys, an iron-bound double door, a great hammer sign, sparks at the chimney mouths',200,250],
    ['vb_boathouse','Boathouse','wooden boathouse on short piles with a wide dark opening at the front where a boat slides in, shingle roof, oars racked on the wall, a rune carved on the lintel',190,216],
    ['vb_lake_house','Lake house on stilts','timber house standing on tall wooden stilts with a little balcony and a ladder, shingle roof, fishing lines hanging down',200,290],
    ['vb_turret','Wall turret','round stone watch-turret with battlements, an arrow slit, and a pennant flag on a pole',126,200]]},
  {id:'sc_vill_special_2',wave:21,fam:'village',kind:'bld',cols:3,rows:2,title:'Village — tall landmarks',items:[
    ['vb_lighthouse','Lighthouse','tall slender white-and-red banded stone lighthouse with a glass lamp room glowing warm at the top and a small door at the base',70,230],
    ['vb_windmill','Windmill body (without sails)','round stone windmill tower tapering upward with a wooden cap roof and a hub where the sails attach, small door, a rune carved above it',158,190],
    ['vb_windmill_sails','Windmill sails','four wooden lattice sails with patched cream cloth, joined at a hub, seen flat from the front as an X — nothing else',150,150],
    ['vb_sky_dock','Vela\'s sky dock','raised wooden platform on thick posts with a stair, mooring ropes, a windsock and crates — no balloon',200,150],
    ['vb_balloon','Sky balloon','small hot-air balloon with a patched teal-and-cream envelope, a wicker basket and trailing ropes',110,110],
    ['vb_statue','Hero statue','weathered stone statue of a cloaked hero holding a sword point-down, on a stepped plinth with a faintly glowing rune',60,130]]},
  {id:'sc_vill_walls',wave:21,fam:'village',kind:'obj',cols:4,rows:2,title:'Village — town wall pieces (they are placed side by side)',items:[
    ['vw_wall_h','Wall segment, front view','straight section of a grey stone town wall with battlements along the top, seen from the front; flat left and right ends so sections join',64,78],
    ['vw_wall_v','Wall segment, running away from the viewer','the same wall seen end-on running top to bottom: a narrow strip showing the battlement tops',32,96],
    ['vw_corner','Wall corner','corner piece of the same wall with a slightly thicker pier',64,84],
    ['vw_gate','Town gate','arched stone gateway in the same wall with an open iron-bound wooden double gate, two lanterns and a rune keystone',128,120],
    ['vw_gate_shut','Town gate, shut','the same gateway with the wooden gate closed',128,120],
    ['vw_post','Gate post','thick stone gate post with a coloured knob on top',24,54],
    ['vw_rope','Barrier rope','a short sagging red rope between two small posts (a shut crossing)',64,30],
    ['vw_board','Name board','blank wooden signboard hanging from a post by two chains',56,60]]},
  // ── 22 · village props ─────────────────────────────────────────────
  {id:'sc_vprops_1',wave:22,pilot:1,fam:'vprops',kind:'obj',cols:4,rows:2,title:'Village props 1 — the square',items:[
    ['vp_fountain','Fountain','round stone fountain basin with a carved rune pillar in the middle and clear water spilling from it',96,90],
    ['vp_well','Well','round stone well with a little shingled roof on two posts, a rope and bucket',70,80],
    ['vp_lamppost','Lamp post','tall dark iron lamp post with a square glass lantern glowing warm',24,90],
    ['vp_lantern','Hanging lantern','small lantern on a short wooden bracket post, glowing warm',20,70],
    ['vp_market_stall','Market stall','wooden market stall with a red-and-white striped canopy and crates of vegetables on the counter',110,96],
    ['vp_signpost','Signpost','wooden signpost with three blank arrow boards pointing different ways',40,70],
    ['vp_bench','Bench','sturdy wooden bench with carved ends',56,34],
    ['vp_notice','Notice board','wooden notice board on two posts with a little roof and blank pinned papers',64,72]]},
  {id:'sc_vprops_2',wave:22,fam:'vprops',kind:'obj',cols:4,rows:2,title:'Village props 2 — carts and work',items:[
    ['vp_cart_hay','Hay cart','two-wheeled wooden cart loaded with hay',88,70],
    ['vp_cart_veg','Vegetable cart','two-wheeled cart with baskets of colourful vegetables and a striped canopy',88,76],
    ['vp_cart_barrels','Barrel cart','two-wheeled cart carrying three barrels',88,70],
    ['vp_anvil','Anvil on a stump','black iron anvil on a tree stump with a hammer resting on it',50,40],
    ['vp_woodpile','Woodpile','neat stack of split firewood with an axe stuck in a chopping block',64,48],
    ['vp_barrels','Barrels','a cluster of two upright barrels and one on its side',56,52],
    ['vp_crates','Crates and sacks','two wooden crates and a tied grain sack',56,50],
    ['vp_haystack','Haystack','round golden haystack with a pitchfork stuck in it',60,56]]},
  {id:'sc_vprops_3',wave:22,fam:'vprops',kind:'obj',cols:4,rows:3,title:'Village props 3 — fences, banners, gardens',items:[
    ['vp_fence_wood','Wooden fence section','straight section of a rustic two-rail wooden fence, front view, flat ends so sections join',70,40],
    ['vp_fence_stone','Low stone wall section','low dry-stone wall section, front view, flat ends',70,40],
    ['vp_fence_hedge','Hedge section','clipped green hedge section, front view, flat ends',70,44],
    ['vp_fence_iron','Iron fence section','black wrought-iron fence section with spear tips, front view, flat ends',70,44],
    ['vp_banner_red','Banner, red','tall pole with a hanging red banner with a pale rune',50,110],
    ['vp_banner_teal','Banner, teal','the same banner in teal',50,110],
    ['vp_banner_gold','Banner, gold','the same banner in gold',50,110],
    ['vp_laundry','Laundry line','two posts with a line of colourful washing between them',96,60],
    ['vp_veg_cabbage','Cabbage bed','a small fenced garden bed with three rows of cabbages',96,64],
    ['vp_veg_carrot','Carrot bed','the same bed with rows of feathery carrot tops',96,64],
    ['vp_veg_leek','Leek bed','the same bed with rows of leeks',96,64],
    ['vp_veg_pumpkin','Pumpkin bed','the same bed with orange pumpkins on vines',96,64]]},
  {id:'sc_vprops_4',wave:22,fam:'vprops',kind:'obj',cols:4,rows:2,title:'Village props 4 — the waterfront',items:[
    ['vp_boat','Rowing boat','small wooden rowing boat with two oars shipped, seen from above-front',74,44],
    ['vp_boat_sail','Sailing boat','small wooden boat with a single patched cream sail',84,84],
    ['vp_nets','Drying nets','fishing nets hung on a wooden frame with glass floats',70,56],
    ['vp_bollard','Mooring post','thick mooring post with a coil of rope',24,36],
    ['vp_life_ring','Life-ring post','post with a red-and-white life ring and a lamp',30,64],
    ['vp_fish_rack','Fish rack','wooden rack with fish hung to dry',60,56],
    ['vp_door_torch','Door torch','iron wall torch on a bracket with a small flame',16,36],
    ['vp_flowerbox','Flower box','wooden window box overflowing with red and yellow flowers',40,20]]},
  // ── 23 · building interiors ────────────────────────────────────────
  {id:'sc_int_1',wave:23,pilot:1,fam:'interior',kind:'obj',cols:4,rows:2,title:'Interior furniture 1 — tavern and home',items:[
    ['if_counter','Shop counter','long wooden counter with a polished top and panelled front',72,46],
    ['if_table','Table','square wooden table',40,36],
    ['if_longtable','Long table','long wooden feasting table',104,40],
    ['if_stool','Stool','round three-legged stool',18,18],
    ['if_chair','Chair','simple wooden chair with a tall back, front view',22,34],
    ['if_fireplace','Fireplace','stone fireplace with a mantel and a lit fire',72,72],
    ['if_bed','Bed','wooden bed with a patchwork quilt and a pillow',44,72],
    ['if_bookshelf','Bookshelf','tall wooden bookshelf full of colourful books',40,80]]},
  {id:'sc_int_2',wave:23,fam:'interior',kind:'obj',cols:4,rows:2,title:'Interior furniture 2 — storage',items:[
    ['if_barrel','Barrel','upright wooden barrel with iron hoops',24,32],
    ['if_barrelrack','Barrel rack','rack holding three barrels on their sides with taps',72,56],
    ['if_crates','Crates','stack of two wooden crates',36,40],
    ['if_sacks','Sacks','pile of tied grain sacks',36,30],
    ['if_chest','Chest','iron-bound wooden chest, closed',36,30],
    ['if_safe','Strongbox','heavy iron strongbox with a big lock',36,40],
    ['if_shelfunit','Shelf unit, empty','open wooden shelf unit with three empty shelves',40,72],
    ['if_basket','Basket','woven basket with a cloth',24,22]]},
  {id:'sc_int_3',wave:23,fam:'interior',kind:'obj',cols:4,rows:2,title:'Interior furniture 3 — forge and armory',items:[
    ['if_forgehearth','Forge hearth','brick forge hearth with glowing coals, a hood and a bellows',72,88],
    ['if_anvil','Anvil','black iron anvil on a block',40,34],
    ['if_coalpile','Coal pile','heap of black coal with a shovel',40,28],
    ['if_rack','Weapon rack','wooden rack holding swords, an axe and a spear',56,64],
    ['if_armorstand','Armor stand','wooden stand wearing a steel breastplate and helmet',32,64],
    ['if_dummy','Training dummy','straw training dummy on a post with a painted target',32,60],
    ['if_saddlerack','Saddle rack','wooden rack with a leather saddle and bridle',40,44],
    ['if_trough','Water trough','wooden water trough',56,24]]},
  {id:'sc_int_4',wave:23,fam:'interior',kind:'obj',cols:4,rows:2,title:'Interior furniture 4 — tailor, jeweler, apothecary',items:[
    ['if_mannequin','Mannequin','dress form wearing a half-finished cloak',28,60],
    ['if_mirror','Standing mirror','tall oval standing mirror in a wooden frame',28,64],
    ['if_sewtable','Sewing table','small table with cloth, scissors and spools of thread',44,36],
    ['if_spinning','Spinning wheel','wooden spinning wheel',40,48],
    ['if_showcase','Glass showcase','glass display case with jewels on velvet',56,44],
    ['if_cauldron','Cauldron','black iron cauldron bubbling with green potion over a small fire',40,44],
    ['if_crystalball','Crystal ball','glowing crystal ball on a small draped table',28,40],
    ['if_herbs','Herb rack','wooden rack hung with bundles of drying herbs',48,56]]},
  {id:'sc_int_5',wave:23,fam:'interior',kind:'obj',cols:4,rows:3,title:'Interior furniture 5 — guild, bakery, stables and the rest',items:[
    ['if_noticeboard','Quest board','large wooden board with pinned blank parchments',64,64],
    ['if_maptable','Map table','table with a spread map, a compass and markers',64,44],
    ['if_desk','Writing desk','desk with an inkwell, quill and papers',56,40],
    ['if_lectern','Lectern','wooden lectern with an open book',24,48],
    ['if_bench','Indoor bench','plain long wooden bench',64,22],
    ['if_candelabra','Candelabra','tall iron floor candelabra with three lit candles',20,64],
    ['if_oven','Bread oven','domed brick bread oven with a glowing mouth',64,64],
    ['if_kneadtable','Kneading table','floury table with dough and a rolling pin',56,36],
    ['if_cakecase','Cake case','glass counter case with cakes and pies',56,40],
    ['if_hay','Hay pile','loose pile of golden hay',44,28],
    ['if_stall','Horse stall','wooden stall partition with a half-door',72,64],
    ['if_plant','Potted plant','leafy plant in a clay pot',22,40]]},
  {id:'sc_int_small',wave:23,fam:'interior',kind:'obj',cols:5,rows:4,title:'Interior small things — on tables and shelves',items:[
    ['it_mug','Mug','wooden tankard with foam',10,12],['it_candle','Candle','lit candle in a brass holder',8,14],['it_scales','Scales','small brass balance scales',16,14],['it_jar','Jar','glass jar with a cork',9,12],
    ['it_bread','Bread','round loaf of bread',14,9],['it_plate','Plate','plate with cheese and an apple',14,8],['it_potion','Potion','round red potion bottle',9,13],['it_lens','Lens','jeweler\'s magnifying lens on a stand',12,14],
    ['it_gem','Gem','cut blue gem on a tiny cushion',10,9],['it_cloth','Cloth','folded bolt of cloth',16,9],['it_sword','Sword','short sword lying flat',22,7],['it_helmet','Helmet','steel helmet',13,12],
    ['it_book','Book','closed leather book',13,9],['it_w_sword','Wall sword','sword hung point-down',8,26],['it_w_spear','Wall spear','spear hung upright',6,34],['it_w_axe','Wall axe','battle axe hung upright',14,28],
    ['is_jars','Shelf row: jars','a row of five assorted glass jars',34,12],['is_potions','Shelf row: potions','a row of five potion bottles in different colours',34,13],['is_books','Shelf row: books','a row of leaning books',34,13],['is_gems','Shelf row: gems','a row of small gems and rings on stands',34,10]]},
  {id:'sc_int_wall',wave:23,fam:'interior',kind:'wall',cols:5,rows:4,title:'Interior wall decorations and rugs',items:[
    ['iw_window','Window','small leaded window with daylight',26,30],['iw_shelf','Wall shelf','short wall shelf with two pots',30,14],['iw_shelf2','Wall shelf, long','long wall shelf with bottles',44,14],['iw_painting','Painting','framed landscape painting',26,22],
    ['iw_banner','Wall banner','hanging cloth banner with a rune',16,34],['iw_shields','Shields','two crossed swords behind a round shield',30,30],['iw_swords','Crossed swords','two crossed swords',28,26],['iw_tools','Tools','hammer, tongs and file on hooks',32,22],
    ['iw_herbs','Hanging herbs','three bundles of hanging herbs',30,22],['iw_starchart','Star chart','framed star chart',28,24],['iw_horseshoe','Horseshoe','lucky horseshoe on a nail',12,12],['iw_mirrorwall','Wall mirror','round wall mirror',18,20],
    ['iw_clock','Clock','wooden wall clock with a pendulum',14,26],['iw_hooks','Coat hooks','row of hooks with a cloak and a hat',34,24],['iw_trophy','Trophy','mounted stag antlers on a plaque',30,26],['iw_bellows','Bellows','large forge bellows on the wall',30,20],
    ['ir_rug_red','Rug, red','rectangular woven rug, red with a gold border, seen from above',96,60],['ir_rug_blue','Rug, blue','the same rug in blue',96,60],['ir_rug_round','Round rug','round braided rug seen from above',64,64],['ir_mat','Door mat','small straw door mat seen from above',32,16]]},
  // ── 24 · runes and waystones ───────────────────────────────────────
  {id:'sc_rune_green',wave:24,pilot:1,fam:'runes',kind:'flat',cols:1,rows:1,size:'1024x1024',title:'The Runestone Green — the great rune circle of the village',items:[
    ['rn_green','Runestone Green inlay','a huge round stone inlay set into the ground: a glowing teal world-tree (trunk, wide branches and mirrored roots) in the centre, ringed by a band of carved angular runes and an outer band of meander pattern, all lines glowing white-cyan in dark worn stone; perfectly circular, seen from straight above',458,458]]},
  {id:'sc_rune_circles',wave:24,fam:'runes',kind:'flat',cols:2,rows:2,size:'1024x1024',title:'Rune circles on the ground',items:[
    ['rn_circle','Rune circle','round carved stone circle with a ring of glowing angular runes and a simple knot in the middle',192,192],
    ['rn_circle_dim','Rune circle, asleep','the same circle with the runes dark and mossy, not glowing',192,192],
    ['rn_circle_fire','Rune circle, ember','the same circle cracked, with the runes glowing orange-red',192,192],
    ['rn_stage','Summoning ring','larger double ring of runes with eight small star points',224,224]]},
  {id:'sc_rune_stones',wave:24,fam:'runes',kind:'obj',cols:4,rows:2,title:'Standing stones and waystones',items:[
    ['rn_stone_a','Standing stone','tall rough grey standing stone with one glowing teal rune',40,84],
    ['rn_stone_b','Standing stone, leaning','leaning mossy standing stone with two runes',44,74],
    ['rn_stone_c','Standing stone, short','short broad standing stone with a spiral rune',40,54],
    ['rn_stone_dim','Standing stone, asleep','tall standing stone with a dark, unlit rune and lichen',40,84],
    ['rn_waystone_on','Waystone, awake','slender four-sided stone obelisk on a stepped base with three stacked runes glowing bright white-cyan and a halo of light at the tip',60,120],
    ['rn_waystone_off','Waystone, asleep','the same obelisk with dark runes and creeping ivy',60,120],
    ['rn_glyph_a','Floor rune','flat square stone tile with one glowing rune, seen from above',32,32],
    ['rn_glyph_b','Floor rune, dark','the same tile with the rune unlit',32,32]]},
  {id:'sc_rune_henge',wave:24,fam:'runes',kind:'obj',cols:4,rows:2,title:'Fairy henges and small rune things',items:[
    ['rn_henge_tri','Henge trilithon','two rough upright stones with a lintel across the top, flowering vines on it',78,96],
    ['rn_henge_post','Henge post','single slim upright stone with a carved spiral',30,70],
    ['rn_henge_altar','Henge altar','low flat stone altar with a glowing bowl of light',96,56],
    ['rn_toadstool','Fairy-ring toadstool','fat red toadstool with white spots',36,40],
    ['rn_toadstool_b','Fairy-ring toadstool, blue','glowing blue toadstool',36,40],
    ['rn_dig','Dig spot','small mound of freshly turned earth with a sparkle',34,22],
    ['rn_cache','Hidden cache','small mossy chest half buried, with a faint glow at the lid',36,32],
    ['rn_cache_open','Hidden cache, open','the same chest open and empty',36,36]]},
  // ── 25 · entrances ─────────────────────────────────────────────────
  {id:'sc_ent_dungeon',wave:25,pilot:1,fam:'entrance',kind:'bld',cols:3,rows:2,title:'Dungeon entrances — a cave mouth for each realm',items:[
    ['en_dng_1','Grasslands dungeon','mossy green rock outcrop with a dark arched cave mouth, worn stone steps leading down, two lit torches and an arc of glowing runes over the opening',150,130],
    ['en_dng_2','Wetlands dungeon','dark wet rock outcrop draped in vines and roots with a cave mouth, steps, two torches burning green-blue, rune arc',150,130],
    ['en_dng_3','Highlands dungeon','pale layered cliff rock with a squared dwarven doorway, steps, two braziers, rune arc',150,130],
    ['en_dng_4','Ashlands dungeon','black basalt outcrop with glowing orange cracks and a cave mouth, steps, two torches, rune arc glowing ember-orange',150,130],
    ['en_dng_boss','Guardian\'s dungeon','larger, grander cave mouth framed by two carved stone beast heads, with a skull keystone and a red pennant',170,150],
    ['en_dwarf_door','Dwarven door','heavy round-topped stone door set in rock with iron bands and a rune lock',60,80]]},
  {id:'sc_ent_tower',wave:25,fam:'entrance',kind:'bld',cols:3,rows:2,title:'Towers — one for each realm',items:[
    ['en_twr_1','Grasslands tower','round pale-stone tower with ivy, a green conical roof, arched door and narrow windows',130,240],
    ['en_twr_2','Wetlands tower','round mossy dark-stone tower on a stone foot, teal conical roof, glowing windows, hanging moss',130,240],
    ['en_twr_3','Highlands tower','round grey granite tower with a snow-dusted blue roof and a small balcony',130,240],
    ['en_twr_4','Ashlands tower','round black stone tower with an iron-red roof, glowing orange windows and a wisp of smoke',130,240],
    ['en_twr_boss','Guardian\'s tower','taller tower with a ring of battlements under the roof and a long red boss pennant flying from the tip',140,260],
    ['en_arch','Ruined arch','free-standing ruined stone archway with a rune keystone',110,150]]},
  {id:'sc_ent_mage_1',wave:25,fam:'entrance',kind:'bld',cols:3,rows:2,title:'Mage towers 1 — twisting spires, each with a floating orb',items:[
    ['en_mage_frost','Frost spire','thin twisting spire of pale blue ice-stone with icicles and a floating white-blue orb at its tip',120,260],
    ['en_mage_library','Floating library tower','spire wound with a ribbon of floating books, warm windows, a golden orb',120,260],
    ['en_mage_apothecary','Sorcerer\'s apothecary tower','crooked spire with bulging glass alembics on its sides, green smoke, a green orb',120,260],
    ['en_mage_grove','Druid grove spire','spire grown from a twisted living tree trunk with leaves and lanterns, a leaf-green orb',120,260],
    ['en_mage_storm','Storm-rod tower','dark spire topped with copper lightning rods and crackling arcs, a violet-white orb',120,260],
    ['en_mage_witch','Witch\'s hollow tower','lopsided spire with a crooked pointed roof like a hat, a cauldron glow in a window, a purple orb',120,260]]},
  {id:'sc_ent_mage_2',wave:25,fam:'entrance',kind:'bld',cols:3,rows:2,title:'Mage towers 2',items:[
    ['en_mage_tidal','Tidal aquarium tower','spire with round glass tank windows full of water and fish, shells on the walls, a sea-blue orb',120,260],
    ['en_mage_astral','Astral observatory','spire topped by a brass dome with a telescope, star charts on the walls, a starry midnight-blue orb',120,260],
    ['en_mage_void','Void rift hall','black spire split by a jagged glowing violet crack, floating shards around it, a black-violet orb',120,260],
    ['en_mage_runic','Runic scriptorium','square-sided spire covered in glowing carved runes, a white-cyan orb',120,260],
    ['en_mage_crystal','Crystal conservatory','spire with large pink and teal crystals growing out of it and a glass dome, a pink orb',120,260],
    ['en_mage_blood','Blood-moon chapel','gothic spire with a rose window glowing red and bats circling, a crimson orb',120,260]]},
  {id:'sc_ent_mage_3',wave:25,fam:'entrance',kind:'bld',cols:3,rows:2,title:'Mage towers 3 and special sites',items:[
    ['en_mage_dream','Dreaming loft','soft rounded spire wrapped in curling cloud and crescent moons, a pale gold orb',120,260],
    ['en_mage_clock','Clockwork orrery','brass-banded spire with turning gears and a ring of small planets, a bronze orb',120,260],
    ['en_mage_ember','Ember forge athenaeum','soot-black spire with a furnace mouth and molten channels, an orange orb',120,260],
    ['en_mage_fungal','Fungal grotto lab','spire overgrown with giant glowing mushrooms, a lime-green orb',120,260],
    ['en_volcano_door','Volcano door','huge black basalt double door set in a lava-cracked rock face with a glowing skull-flame emblem',120,120],
    ['en_volcano_door_mini','Small volcano door','smaller version of the same lava-rock door with a single flame rune',96,96]]},
  {id:'sc_ent_castle_1',wave:25,fam:'entrance',kind:'bld',cols:3,rows:2,title:'Castle gates 1 — a gatehouse for each island castle, with its emblem over the gate',items:[
    ['en_castle_thornwood','Thornwood Keep gate','grey stone gatehouse wrapped in thorny rose briars, a rose emblem',125,110],
    ['en_castle_sunflower','Sunflower Château gate','warm sandstone gatehouse with yellow banners and sunflowers, a sun emblem',125,110],
    ['en_castle_windmill','Windmill Bastion gate','whitewashed gatehouse with a small windmill on its roof, a mill-sail emblem',125,110],
    ['en_castle_lotus','Lotus Palace gate','pale jade-green gatehouse with curved eaves and lily ponds at its feet, a lotus emblem',125,110],
    ['en_castle_abbey','Drowned Abbey gate','sunken mossy gothic gatehouse streaked with water, a shell emblem',125,110],
    ['en_castle_mangrove','Mangrove Fort gate','timber-and-root palisade gatehouse on stilts, a tree emblem',125,110]]},
  {id:'sc_ent_castle_2',wave:25,fam:'entrance',kind:'bld',cols:3,rows:2,title:'Castle gates 2',items:[
    ['en_castle_dwarven','Dwarven Hold gate','squat carved granite gatehouse with brass doors, a hammer emblem',125,110],
    ['en_castle_glacier','Glacier Citadel gate','blue ice-and-stone gatehouse with icicles, a snowflake emblem',125,110],
    ['en_castle_eyrie','Eyrie Castle gate','tall narrow cliff-top gatehouse with wind banners, an eagle emblem',125,110],
    ['en_castle_obsidian','Obsidian Bastille gate','glossy black gatehouse hung with chains, a chain emblem',125,110],
    ['en_castle_ember','Ember Sanctum gate','dark red temple gatehouse with braziers, a flame emblem',125,110],
    ['en_castle_bone','Bone Throne Keep gate','gatehouse built of giant bones and skulls, a skull emblem',125,110]]},
  {id:'sc_ent_sites',wave:25,fam:'entrance',kind:'bld',cols:3,rows:2,title:'Camps, harbors and skyports',items:[
    ['en_camp','Rest camp','a patched canvas tent with a bedroll, a crackling campfire with a cooking pot, and a log seat',140,110],
    ['en_harbor','Harbor house','small plank harbor-master\'s house with a lamp post, a life ring on the wall and coiled rope',130,130],
    ['en_skyport','Skyport platform','tall wooden mooring tower with a platform, ladder and windsock — no balloon',120,170],
    ['en_sky_balloon','Skyport balloon','a larger travel balloon with a striped envelope, a wicker gondola and sandbags',110,130],
    ['en_stairs_down','Stairs down','square stone stairwell leading down into the dark, seen from above-front',64,56],
    ['en_portal','Exit portal','upright oval ring of carved stone filled with swirling white-cyan light',56,76]]},
  // ── 26 · trees and plants ──────────────────────────────────────────
  {id:'sc_trees_1',wave:26,pilot:1,fam:'trees',kind:'obj',cols:3,rows:2,title:'Trees 1 — the Grasslands and the village',items:[
    ['tr_round_a','Round oak','big leafy broadleaf tree with a round three-lobed crown and a short thick trunk',120,160],
    ['tr_round_b','Round oak, tall','taller broadleaf tree with a stacked two-tier crown',110,190],
    ['tr_round_c','Young tree','small young broadleaf tree with a single round crown',80,110],
    ['tr_blossom_a','Blossom tree','tree with a wide crown of pink blossom and a few falling petals',120,160],
    ['tr_blossom_b','Blossom tree, white','tree with a crown of white blossom',110,150],
    ['tr_stump','Tree stump','broad cut tree stump with rings and a mushroom',44,34]]},
  {id:'sc_trees_2',wave:26,fam:'trees',kind:'obj',cols:3,rows:2,title:'Trees 2 — the Wetlands',items:[
    ['tr_willow_a','Willow','big weeping willow with long hanging fronds',130,170],
    ['tr_willow_b','Willow, leaning','willow leaning to one side with fronds trailing low',130,160],
    ['tr_mangrove_a','Mangrove','mangrove tree standing on a tangle of arched roots',120,160],
    ['tr_mangrove_glow','Glow mangrove','mangrove whose roots glow soft teal, with small glowing fruit',120,160],
    ['tr_cypress','Swamp cypress','tall bald cypress with a flared trunk and hanging moss',100,190],
    ['tr_drowned','Drowned trunk','dead grey tree trunk snapped off, with bracket fungus',60,100]]},
  {id:'sc_trees_3',wave:26,fam:'trees',kind:'obj',cols:3,rows:2,title:'Trees 3 — the Highlands',items:[
    ['tr_pine_a','Pine','tall dark-green pine with layered branches',100,190],
    ['tr_pine_b','Pine, short','shorter, fuller pine',100,150],
    ['tr_pine_snow','Snowy pine','pine with snow on every layer',100,190],
    ['tr_stone_a','Petrified tree','tree turned to grey-violet stone, branches bare, with crystal buds',110,160],
    ['tr_stone_b','Petrified tree, broken','broken petrified trunk with a crystal core showing',80,110],
    ['tr_log_stone','Petrified log','fallen petrified log lying on its side',96,40]]},
  {id:'sc_trees_4',wave:26,fam:'trees',kind:'obj',cols:3,rows:2,title:'Trees 4 — the Ashlands',items:[
    ['tr_dead_a','Dead tree','bare black dead tree with clawing branches',110,160],
    ['tr_dead_b','Dead tree, split','dead tree split down the middle by lightning',100,150],
    ['tr_ash_a','Ash tree','grey ash-covered tree with a thin crown of pale leaves and drifting ash',110,160],
    ['tr_ash_b','Ember tree','charred tree with glowing orange cracks in the bark and a few embers',110,160],
    ['tr_burnt_stump','Burnt stump','charred stump with glowing cracks',44,36],
    ['tr_log','Fallen log','mossy fallen log',96,40]]},
  {id:'sc_plants_1',wave:26,fam:'plants',kind:'obj',cols:4,rows:3,title:'Plants 1 — bushes, flowers and grass',items:[
    ['pl_bush','Bush','round leafy green bush',64,50],['pl_bush_berry','Berry bush','bush with red berries',64,50],['pl_bush_flower','Flowering bush','bush with white flowers',64,50],['pl_bush_glow','Glow bush','dark bush with glowing teal buds',64,50],
    ['pl_flowers_red','Red flowers','clump of red poppies',34,26],['pl_flowers_yellow','Yellow flowers','clump of yellow daisies',34,26],['pl_flowers_blue','Blue flowers','clump of bluebells',34,28],['pl_flowers_white','White flowers','clump of white star flowers',34,26],
    ['pl_tuft','Grass tuft','small tuft of long grass blades',26,20],['pl_tallgrass','Tall grass','thick clump of tall swaying grass',64,60],['pl_crystalgrass','Crystal grass','tall grass with tiny glowing crystal tips',64,64],['pl_fern','Fern','spreading green fern',44,34]]},
  {id:'sc_plants_2',wave:26,fam:'plants',kind:'obj',cols:4,rows:3,title:'Plants 2 — water and the far realms',items:[
    ['pl_reeds','Reeds','clump of green reeds',50,70],['pl_cattails','Cattails','reeds with brown cattail heads',50,74],['pl_wispreeds','Wisp reeds','reeds with a small floating blue wisp light',50,80],['pl_lilypad','Lily pads','three flat lily pads, one with a pink flower, seen from above',50,34],
    ['pl_lanternlily','Lantern lily','tall lily whose flower glows like a paper lantern',36,70],['pl_curtain','Willow curtain','hanging curtain of willow fronds, as if from a branch above',70,120],['pl_emberflower','Emberflower','low red-orange flower with a glowing centre',30,26],['pl_emberflower_b','Emberflower patch','patch of five emberflowers',56,34],
    ['pl_mushrooms','Mushrooms','cluster of brown mushrooms',32,30],['pl_heather','Heather','clump of purple heather',40,28],['pl_cactus','Ash thistle','spiky grey thistle with a violet flower',34,50],['pl_vine','Hanging vine','hanging green vine with small leaves',30,90]]},
  {id:'sc_plants_3',wave:26,fam:'plants',kind:'obj',cols:4,rows:2,title:'Plants 3 — crops and fields',items:[
    ['pl_wheat','Wheat strip','strip of golden wheat',96,44],['pl_corn','Corn strip','strip of tall green corn',96,60],['pl_crop_green','Green crop strip','strip of low leafy green crop',96,30],['pl_scarecrow','Scarecrow','straw scarecrow on a cross-post with a floppy hat',44,70],
    ['pl_hedge_arch','Hedge arch','clipped hedge trained into an arch',80,84],['pl_topiary','Topiary','hedge clipped into a ball on a stem',36,60],['pl_trellis','Rose trellis','wooden trellis covered in climbing roses',56,70],['pl_beehive','Beehive','straw skep beehive on a stand with a few bees',34,44]]},
  // ── 27 · rocks, ruins and landmarks ────────────────────────────────
  {id:'sc_rocks_1',wave:27,pilot:1,fam:'rocks',kind:'obj',cols:4,rows:2,title:'Rocks and crystals',items:[
    ['rk_rock','Rock','rounded grey boulder',64,54],['rk_rock_moss','Mossy rock','boulder half covered in moss',64,54],['rk_rock_rune','Rune rock','boulder with a glowing carved rune',64,54],['rk_rock_snow','Snowy rock','boulder capped with snow',64,54],
    ['rk_boulder','Large boulder','very large cracked boulder',110,96],['rk_pebbles','Pebbles','scatter of small stones, seen from above',40,24],['rk_crystal_teal','Teal crystal','cluster of tall glowing teal crystals',50,90],['rk_crystal_pink','Pink crystal','cluster of glowing pink crystals',50,80]]},
  {id:'sc_rocks_2',wave:27,fam:'rocks',kind:'obj',cols:4,rows:2,title:'Highland and Ashland rocks',items:[
    ['rk_geode','Geode','split round rock showing a glittering violet crystal hollow',70,70],['rk_starcore','Star core','fallen meteorite with a glowing white-blue core',60,70],['rk_basalt_a','Basalt columns','cluster of tall six-sided black basalt columns of different heights',94,170],['rk_basalt_b','Basalt columns, low','low cluster of short basalt columns',80,80],
    ['rk_shard','Obsidian shard','tall glossy black obsidian shard with a sharp edge',50,80],['rk_shard_b','Obsidian shards','three smaller obsidian shards',56,56],['rk_geyser','Geyser vent','low ring of yellow-crusted rock with a steaming hole, seen from above-front',56,36],['rk_lava_rock','Lava rock','black rock with glowing lava seams',60,50]]},
  {id:'sc_ruins_1',wave:27,fam:'rocks',kind:'obj',cols:4,rows:2,title:'Ruins',items:[
    ['ru_column','Column','tall fluted stone column with a capital',40,120],['ru_column_broken','Broken column','column snapped off halfway, with the top piece lying beside it',64,80],['ru_wall','Ruined wall','section of crumbling stone wall with moss',76,84],['ru_wall_charred','Burnt wall','section of blackened ruined wall with a gothic window hole',76,100],
    ['ru_block','Stone block','fallen carved stone block with a rune',40,50],['ru_spire','Sunken spire','the pointed top of a drowned tower sticking up at an angle',70,120],['ru_roof','Drowned roof','the mossy roof of a sunken house',110,70],['ru_glass','Stained-glass shards','scatter of coloured glass shards, seen from above',60,34]]},
  {id:'sc_landmarks_1',wave:27,fam:'rocks',kind:'obj',cols:4,rows:2,title:'Landmarks 1 — bones, giants and golems',items:[
    ['lm_rib','Giant rib','huge curved rib bone arching out of the ground',70,130],['lm_skull','Giant skull','enormous half-buried horned skull, moss in the eye sockets',110,90],['lm_golem','Golem wreck','slumped broken stone golem with a dark rune in its chest, overgrown',100,110],['lm_golem_arm','Golem arm','a giant stone fist and forearm lying on the ground',80,50],
    ['lm_chess_pawn','Giant chess pawn, light','waist-high pale stone chess pawn',60,100],['lm_chess_rook','Giant chess rook, dark','tall dark stone chess rook',64,130],['lm_chess_king','Giant chess king, light','tall pale stone chess king with a cross',64,160],['lm_chess_knight','Giant chess knight, dark','dark stone chess knight (horse head)',64,140]]},
  {id:'sc_landmarks_2',wave:27,fam:'rocks',kind:'obj',cols:4,rows:2,title:'Landmarks 2 — wind, sky and fire',items:[
    ['lm_floatrock','Floating rock','chunk of earth and rock floating in the air with grass on top and roots hanging below',110,130],['lm_floatrock_tree','Floating rock with a tree','the same kind of floating rock with a small tree on it',120,170],['lm_kite','Rune kite','diamond-shaped paper kite with a rune and a ribbon tail',50,60],['lm_harp','Wind harp','tall stone frame strung with wires that hum in the wind',60,110],
    ['lm_brazier','Brazier','iron brazier on three legs with a bright fire',30,50],['lm_chimney','Forge chimney','tall ruined brick chimney breathing smoke and sparks',52,180],['lm_turtle','Turtle head','the mossy head of a gigantic turtle rising from the water',70,60],['lm_frog','Glowfrog','small fat glowing green frog sitting',22,18]]},
  // ── 28 · paths, bridges, harbors ───────────────────────────────────
  {id:'sc_bridges',wave:28,pilot:1,fam:'bridges',kind:'obj',cols:3,rows:2,title:'Bridges — seen from above-front, running left to right; the flat deck is walked on',items:[
    ['br_plank','Plank bridge','wooden plank bridge with rope handrails on both sides and posts at each end',192,96],
    ['br_stone','Stone bridge','arched grey stone bridge with low parapets',192,104],
    ['br_iron','Iron bridge','riveted dark iron bridge with lattice railings and brass rune plates',192,104],
    ['br_lift','Lift platform','square stone lift platform with brass corner posts, chains and a glowing rune in the middle',128,112],
    ['br_pass','Mountain pass gate','two tall carved stone pillars with a lintel and prayer flags, a paved way between them',160,140],
    ['br_broken','Broken bridge','the broken stub of a stone bridge ending in mid-air',112,90]]},
  {id:'sc_bridge_parts',wave:28,fam:'bridges',kind:'obj',cols:4,rows:2,title:'Bridge and path pieces',items:[
    ['bp_rail_wood','Wooden rail','section of wooden bridge railing, front view, flat ends',64,30],['bp_rail_stone','Stone rail','section of stone parapet, front view, flat ends',64,30],['bp_post','Bridge post','thick wooden post with a rope loop and a small lantern',20,56],['bp_steps','Stone steps','short flight of wide stone steps, seen from above-front',64,48],
    ['bp_milestone','Milestone','small roadside stone with a carved rune and an arrow',24,32],['bp_cairn','Cairn','pile of stacked flat stones marking a trail',30,44],['bp_stepping','Stepping stones','three flat stones in water, seen from above',70,34],['bp_boardwalk_post','Boardwalk post','mossy boardwalk pile with a rope',18,40]]},
  {id:'sc_harbor',wave:28,fam:'bridges',kind:'obj',cols:4,rows:2,title:'Harbors and docks',items:[
    ['hb_pier_end','Pier end','the end of a wooden pier with two mooring posts and a lamp, seen from above-front',96,84],['hb_crane','Dock crane','small wooden dock crane with a hook and a hanging crate',70,110],['hb_ship','Island boat','sturdy wooden sailing boat with a furled sail and a lantern at the prow, moored',150,130],['hb_ship_sail','Island boat, under sail','the same boat with its cream sail set',150,150],
    ['hb_hut','Dock hut','small plank hut with a shingle roof',84,96],['hb_hut_stilts','Stilt hut','small hut on stilts over water with a ladder',84,120],['hb_cargo','Cargo pile','pile of crates, barrels and a net',70,56],['hb_buoy','Buoy','red-and-white buoy with a bell, floating',26,40]]},
  // ── 29 · ground textures (seamless swatches) ───────────────────────
  {id:'sc_tex_grass',wave:29,pilot:1,fam:'tex',kind:'tex',cols:3,rows:2,title:'Ground 1 — grass',items:[
    ['tx_grass','Meadow grass','fresh green short grass drawn as flat colour with small darker blade marks and a few lighter flecks',256,256],
    ['tx_grass_wild','Wild grass','longer, yellower grass with seed heads',256,256],
    ['tx_grass_village','Mown grass','neat, even, slightly brighter village green',256,256],
    ['tx_moss','Moss','soft dark-green moss with tiny clover shapes',256,256],
    ['tx_heath','Heath','dry olive heath with purple heather dots',256,256],
    ['tx_marsh','Marsh grass','dark wet grass with small puddle shapes',256,256]]},
  {id:'sc_tex_earth',wave:29,fam:'tex',kind:'tex',cols:3,rows:2,title:'Ground 2 — earth, sand and snow',items:[
    ['tx_dirt','Dirt path','packed light-brown earth with pebbles and a few cart-track marks',256,256],
    ['tx_mud','Mud','dark wet mud with ripples',256,256],
    ['tx_sand','Sand','pale yellow sand with soft ripple lines and a few shells',256,256],
    ['tx_ashsand','Ash sand','grey-black volcanic sand with ember specks',256,256],
    ['tx_snow','Snow','white snow with soft blue drift lines',256,256],
    ['tx_soil','Tilled soil','dark brown ploughed soil in straight furrows',256,256]]},
  {id:'sc_tex_stone',wave:29,fam:'tex',kind:'tex',cols:3,rows:2,title:'Ground 3 — paving',items:[
    ['tx_flag','Flagstone road','irregular grey flagstones with dark gaps and a little grass in the joints',256,256],
    ['tx_cobble','Cobbles','small rounded cobblestones',256,256],
    ['tx_slab','Stone slabs','large square pale stone slabs',256,256],
    ['tx_brick','Brick paving','red-brown bricks in a herringbone pattern',256,256],
    ['tx_planks','Planks','wooden deck planks running left to right with nail heads',256,256],
    ['tx_hex','Basalt hexagons','black six-sided basalt column tops',256,256]]},
  {id:'sc_tex_liquid',wave:29,fam:'tex',kind:'tex',cols:3,rows:2,title:'Ground 4 — water and lava',items:[
    ['tx_water','Shallow water','clear turquoise water with a few curved white ripple lines',256,256],
    ['tx_water_deep','Deep water','deep blue water with darker swirls and sparse highlights',256,256],
    ['tx_sea','Sea','blue-green sea with small wave crests',256,256],
    ['tx_swamp','Swamp water','murky green water with duckweed dots',256,256],
    ['tx_lava','Lava','bright orange-yellow molten lava with darker cooling skins',256,256],
    ['tx_crust','Lava crust','black cracked crust with glowing orange lines in the cracks',256,256]]},
  {id:'sc_tex_wild',wave:29,fam:'tex',kind:'tex',cols:3,rows:2,title:'Ground 5 — the far realms',items:[
    ['tx_rock','Bare rock','grey-brown bare rock with cracks',256,256],
    ['tx_scree','Scree','loose pale stones and gravel',256,256],
    ['tx_ice','Ice','pale blue ice with white crack lines',256,256],
    ['tx_ash','Ash','soft grey ash with darker drifts',256,256],
    ['tx_char','Charred ground','black burnt ground with faint ember cracks',256,256],
    ['tx_glass','Obsidian glass','glossy black-violet glass with sharp pale reflections',256,256]]},
  {id:'sc_tex_cliff',wave:29,fam:'tex',kind:'tex',cols:3,rows:2,title:'Ground 6 — cliff faces (seen from the front; these repeat left to right)',items:[
    ['tx_cliff_1','Grassland cliff','warm brown layered rock face with horizontal strata and grass at the top edge',256,256],
    ['tx_cliff_2','Wetland bank','dark wet earth bank with roots',256,256],
    ['tx_cliff_3','Highland cliff','pale grey granite face with strong strata and cracks',256,256],
    ['tx_cliff_4','Ashland cliff','black basalt face with glowing orange cracks',256,256],
    ['tx_wall_stone','Stone wall','coursed grey stone wall blocks',256,256],
    ['tx_wall_ruin','Ruin wall','worn mossy stone wall blocks with missing pieces',256,256]]},
  {id:'sc_tex_floor',wave:29,fam:'tex',kind:'tex',cols:3,rows:2,title:'Floors — rooms, towers and castles',items:[
    ['tx_f_planks','Floorboards','warm wooden floorboards',256,256],
    ['tx_f_herring','Herringbone parquet','wooden herringbone parquet',256,256],
    ['tx_f_flag','Indoor flagstones','smooth grey indoor flagstones',256,256],
    ['tx_f_marble','Marble','white marble with soft grey veins',256,256],
    ['tx_f_checker','Checkered tiles','black-and-cream checkered tiles',256,256],
    ['tx_f_straw','Straw','stable floor of trampled straw',256,256]]},
  {id:'sc_tex_floor_2',wave:29,fam:'tex',kind:'tex',cols:3,rows:2,title:'Floors 2 and cave floors',items:[
    ['tx_f_tiles','Clay tiles','square terracotta tiles',256,256],
    ['tx_f_stars','Star floor','midnight-blue floor with small gold stars',256,256],
    ['tx_c_cave','Cave floor','brown-grey cave floor with cracks and small stones',256,256],
    ['tx_c_cave_wet','Wet cave floor','dark wet cave floor with puddle shapes',256,256],
    ['tx_c_crystal','Crystal cave floor','violet-grey cave floor with tiny crystal specks',256,256],
    ['tx_c_bone','Bone-pit floor','pale dusty floor littered with small bones',256,256]]},
  {id:'sc_tex_wall',wave:29,fam:'tex',kind:'tex',cols:3,rows:2,title:'Room walls (seen from the front; these repeat left to right)',items:[
    ['tx_w_panel','Wood panelling','dark wood wall panelling with a rail',256,256],
    ['tx_w_plaster','Plaster','cream plaster wall with a timber beam',256,256],
    ['tx_w_stone','Room stone wall','grey stone block interior wall',256,256],
    ['tx_w_boards','Board wall','vertical plank wall',256,256],
    ['tx_w_stripes','Striped wallpaper','rose-and-cream striped wallpaper',256,256],
    ['tx_w_cave','Cave wall','rough brown cave rock face',256,256]]},
  // ── 30 · camp and trial props ──────────────────────────────────────
  {id:'sc_camp_1',wave:30,pilot:1,fam:'camp',kind:'obj',cols:4,rows:2,title:'Monster-camp props 1',items:[
    ['cp_campfire','Campfire','ring of stones with crossed logs and a lively fire',54,54],['cp_campfire_out','Campfire, out','the same fire ring with cold ash and a wisp of smoke',54,40],['cp_tent','Monster tent','crude hide tent with bone toggles',70,60],['cp_chest','Camp chest','rough wooden chest with a big padlock',44,38],
    ['cp_chest_open','Camp chest, open','the same chest open with a glint of gold',44,44],['cp_rack','Weapon rack','crude rack of spears and clubs',50,54],['cp_sacks','Loot sacks','pile of bulging sacks',44,36],['cp_cart','Raided cart','tipped-over cart with a broken wheel',64,50]]},
  {id:'sc_camp_2',wave:30,fam:'camp',kind:'obj',cols:4,rows:2,title:'Monster-camp props 2',items:[
    ['cp_well','Camp well','small rough stone well',50,50],['cp_moonwell','Moonwell','low stone basin of softly glowing silver-blue water',54,44],['cp_beehive','Wild beehive','hanging wild beehive on a branch stump with bees',40,54],['cp_blanket','Picnic blanket','checked blanket with a basket, seen from above-front',54,40],
    ['cp_scarecrow','Camp scarecrow','sinister scarecrow with a pumpkin head',44,64],['cp_obelisk','Dark obelisk','small black obelisk with a red rune',34,64],['cp_shrine','Shrine','small roadside stone shrine with a candle and offerings',44,54],['cp_nest','Giant nest','big twig nest with two speckled eggs',54,36]]},
  {id:'sc_camp_3',wave:30,fam:'camp',kind:'obj',cols:4,rows:2,title:'Monster-camp props 3',items:[
    ['cp_raft','Raft','small log raft with a pole',60,40],['cp_cauldron','Camp cauldron','black cauldron hung on a tripod over a fire',50,54],['cp_anvil','Camp anvil','rusty anvil on a stone',44,34],['cp_crystal','Camp crystal','single glowing crystal on a stand of bones',36,54],
    ['cp_bones','Bone pile','heap of bones and a skull',50,34],['cp_lantern','Camp lantern','lantern on a crooked stick',24,54],['cp_banner','War banner','ragged war banner with a claw mark',40,64],['cp_totem','Totem','carved wooden totem with stacked monster faces',36,70]]},
  {id:'sc_loot',wave:30,fam:'camp',kind:'obj',cols:4,rows:3,title:'Loot pickups (small, shown on the ground)',items:[
    ['lt_gold','Gold','small pile of gold coins',20,16],['lt_gem','Gem','single cut gem',14,14],['lt_potion','Potion','red potion bottle',14,18],['lt_mana','Mana potion','blue potion bottle',14,18],
    ['lt_key','Key','old iron key',18,10],['lt_scroll','Scroll','rolled parchment with a ribbon',18,12],['lt_ring','Ring','gold ring with a stone',12,12],['lt_herb','Herb','bundle of green herbs',16,16],
    ['lt_ore','Ore','lump of ore with metal veins',18,14],['lt_meat','Meat','roast drumstick',18,12],['lt_arrows','Arrows','bundle of arrows',20,12],['lt_relic','Relic','small glowing rune tablet',16,18]]},
  {id:'sc_trial_1',wave:30,fam:'trial',kind:'obj',cols:4,rows:2,title:'Fairy-trial props 1',items:[
    ['tp_stone','Trial rune stone','waist-high rounded stone with a large glowing rune',36,50],['tp_stone_dark','Trial rune stone, dark','the same stone, unlit',36,50],['tp_altar','Trial altar','small stone altar with a floating star of light above it',60,56],['tp_target','Star target','round wooden target with a painted star',36,40],
    ['tp_mirror','Mirror on a post','tilted silver mirror on a wooden post',30,54],['tp_plate','Pressure plate','square stone floor plate with a ring, seen from above',32,32],['tp_plate_down','Pressure plate, pressed','the same plate sunk and glowing',32,32],['tp_boulder','Push boulder','smooth round boulder with a carved spiral',40,40]]},
  {id:'sc_trial_2',wave:30,fam:'trial',kind:'obj',cols:4,rows:2,title:'Fairy-trial props 2',items:[
    ['tp_spire','Rune spire','slim crystal spire with rings of light',30,80],['tp_glass','Glass wall','upright pane of faintly glowing fairy glass, front view',64,60],['tp_seed_1','Seedling','tiny glowing sprout',16,16],['tp_seed_2','Sapling','small glowing sapling',26,40],
    ['tp_seed_3','Blooming tree','small tree in glowing blossom',50,70],['tp_pylon','Beam pylon','short brass pylon with a lens that fires a beam',26,48],['tp_reset','Reset rune','round floor rune with a looping arrow, seen from above',36,36],['tp_wisp','Wisp','small floating ball of white-blue light with a tail',20,24]]},
  // ── 31 · tower, castle and mage-tower furnishings ──────────────────
  {id:'sc_twr_1',wave:31,pilot:1,fam:'furnish',kind:'obj',cols:4,rows:2,title:'Tower furnishings 1 — tall pieces',items:[
    ['tf_bookshelf','Grand bookshelf','very tall carved bookshelf with a ladder',64,110],['tf_wardrobe','Wardrobe','tall carved wardrobe',48,96],['tf_lectern','Tower lectern','ornate lectern with a glowing open book',36,90],['tf_globe','Globe','large globe in a brass stand',50,90],
    ['tf_candelabra','Tall candelabra','tall silver candelabra with five candles',36,90],['tf_statue','Tower statue','marble statue of a robed scholar on a plinth',50,120],['tf_pillar','Pillar','smooth marble pillar with a gold band',40,130],['tf_telescope','Telescope','brass telescope on a tripod',60,100]]},
  {id:'sc_twr_2',wave:31,fam:'furnish',kind:'obj',cols:4,rows:2,title:'Tower furnishings 2 — plants, music and light',items:[
    ['tf_plant','Tall plant','large fern in a stone urn',40,90],['tf_planter','Planter','long stone planter with flowers',70,50],['tf_tree','Indoor tree','small ornamental tree in a square tub',70,120],['tf_whitetree','White tree','slender silver-white tree with pale glowing leaves',90,150],
    ['tf_harp','Harp','tall gilded harp',50,100],['tf_piano','Spinet','small wooden keyboard instrument with a stool',80,70],['tf_chandelier','Chandelier','hanging iron ring chandelier with candles, seen from below-front',90,70],['tf_crystalpillar','Crystal pillar','pillar of clear glowing crystal',44,130]]},
  {id:'sc_twr_3',wave:31,fam:'furnish',kind:'obj',cols:3,rows:2,title:'Tower centrepieces',items:[
    ['tf_c_fountain','Hall fountain','three-tiered marble fountain',150,150],['tf_c_crystal','Great crystal','giant floating crystal over a rune dais',120,170],['tf_c_tree','Hall tree','great tree growing from a round stone bed',150,170],
    ['tf_c_orrery','Orrery','large brass orrery of rings and planets',150,150],['tf_c_pool','Reflecting pool','round stone-edged pool of still glowing water, seen from above-front',150,100],['tf_c_starmap','Star map','round floor inlay of a star map in gold on blue, seen from above',150,150]]},
  {id:'sc_twr_4',wave:31,fam:'furnish',kind:'obj',cols:4,rows:3,title:'Tower furnishings 4 — low pieces',items:[
    ['tf_table','Round table','round polished table',56,44],['tf_longtable','Dining table','long dining table with a runner',120,50],['tf_desk','Scholar\'s desk','desk covered in scrolls',70,48],['tf_maptable','Tower map table','table with a glowing map',80,56],
    ['tf_sideboard','Sideboard','carved sideboard with silver',70,50],['tf_bench','Cushioned bench','bench with red cushions',70,30],['tf_pew','Pew','wooden chapel pew',80,36],['tf_chair','High-backed chair','carved high-backed chair',30,46],
    ['tf_nightstand','Nightstand','small nightstand with a candle',26,30],['tf_bed','Canopy bed','four-poster bed with curtains',70,100],['tf_altar','Tower altar','white stone altar with a cloth and two candles',80,56],['tf_stairs','Spiral stair','top of a stone spiral stair going down, seen from above-front',70,70]]},
  {id:'sc_twr_rugs',wave:31,fam:'furnish',kind:'flat',cols:3,rows:2,title:'Tower rugs and floor pieces (seen from above)',items:[
    ['tf_rug','Tower rug','large rectangular rug, deep blue with silver stars',128,96],['tf_runner','Runner','long narrow red runner carpet',160,40],['tf_royal_carpet','Royal carpet','long crimson carpet with gold edging',192,56],
    ['tf_mosaic','Mosaic','round floor mosaic of a sun',128,128],['tf_dais','Dais','low stepped stone dais',160,96],['tf_rune_circle','Summoning circle','chalk-white summoning circle with runes and candles',128,128]]},
  {id:'sc_castle_1',wave:31,fam:'furnish',kind:'obj',cols:4,rows:2,title:'Castle furnishings 1',items:[
    ['cf_hearth','Great hearth','huge stone hearth with a roaring fire and a crest',110,130],['cf_torch','Great torch','tall iron floor torch',30,110],['cf_pillar','Massive pillar','thick dark stone pillar with a carved band',60,150],['cf_armor','Suit of armor','full plate armor on a stand holding a halberd',50,120],
    ['cf_weapons','Castle weapon rack','long rack of halberds and swords',90,110],['cf_shields','Shield rack','rack of painted shields',90,110],['cf_sword','Great sword','giant ceremonial sword standing point-down in a stone',40,130],['cf_barrel','Wine cask','large wine cask on a cradle',60,60]]},
  {id:'sc_castle_2',wave:31,fam:'furnish',kind:'obj',cols:4,rows:2,title:'Castle furnishings 2',items:[
    ['cf_knight','Knight statue','stone statue of a knight with sword and shield',60,140],['cf_dragon','Dragon statue','stone statue of a coiled dragon',90,130],['cf_saint','Saint statue','stone statue of a hooded figure with a lantern',50,140],['cf_throne','Throne','towering dark throne with a tall pointed back',90,150],
    ['cf_sarcophagus','Sarcophagus','stone sarcophagus with a carved knight on the lid',100,60],['cf_brazier','Great brazier','wide bronze brazier with tall flames',70,90],['cf_banquet','Banquet table','long table laid with a feast',160,60],['cf_bench','Long bench','long plain castle bench',120,30]]},
  {id:'sc_castle_3',wave:31,fam:'furnish',kind:'wall',cols:4,rows:2,title:'Castle wall pieces',items:[
    ['cw_banner','Castle banner','long hanging heraldic banner, blank shield shape in the middle',34,96],['cw_torch','Wall torch','iron wall torch with flame',24,52],['cw_shield','Wall shield','mounted shield over crossed axes',40,44],['cw_candle','Wall candle','wall sconce with two candles',26,30],
    ['cw_window','Lancet window','tall pointed stained-glass window, blue and red',40,96],['cw_rose','Rose window','round stained-glass rose window',96,100],['cw_chains','Hanging chains','iron chains with manacles',30,70],['cw_tapestry','Tapestry','wide woven tapestry of a battle',96,64]]},
  {id:'sc_mage_1',wave:31,fam:'furnish',kind:'obj',cols:4,rows:2,title:'Mage-tower furnishings 1',items:[
    ['mf_cauldron','Great cauldron','huge bubbling cauldron with coloured smoke',70,80],['mf_potion_shelf','Potion shelf','tall shelf crowded with glowing potions',64,110],['mf_alchemy','Alchemy table','table of glass tubes, burners and flasks',90,70],['mf_herb_rack','Mage herb rack','rack of strange hanging plants',64,90],
    ['mf_books','Floating books','a spiral of open books floating in the air',60,100],['mf_floatrock','Floating stone','small floating rune stone with orbiting pebbles',50,70],['mf_pylon','Arcane pylon','brass-and-crystal pylon humming with light',40,110],['mf_crystals','Crystal cluster','big cluster of glowing crystals',80,90]]},
  {id:'sc_mage_2',wave:31,fam:'furnish',kind:'obj',cols:4,rows:2,title:'Mage-tower furnishings 2',items:[
    ['mf_orb','Scrying orb','large glowing orb on a clawed stand',50,70],['mf_cage','Cage','hanging iron cage with a glowing creature\'s eyes inside',50,90],['mf_gears','Gear wall','standing frame of turning brass gears',90,110],['mf_hourglass','Hourglass','giant hourglass with glowing sand',50,100],
    ['mf_mirror','Magic mirror','tall ornate mirror with a swirling surface',50,110],['mf_bones','Bone pile','heap of bones with a candle on a skull',70,50],['mf_soulfire','Soulfire','brazier of cold blue-green flame',40,80],['mf_anvil','Rune anvil','anvil glowing with runes and a floating hammer',60,60]]},
  {id:'sc_mage_3',wave:31,fam:'furnish',kind:'obj',cols:4,rows:2,title:'Mage-tower furnishings 3',items:[
    ['mf_tank','Fish tank','tall glass tank with glowing fish',70,100],['mf_mushrooms','Giant mushrooms','cluster of giant glowing mushrooms',80,100],['mf_curtain','Stage curtain','heavy red velvet curtain drawn to one side',70,120],['mf_puppet','Puppet','life-size wooden marionette hanging from strings',40,90],
    ['mf_void','Void crack','jagged floating crack of violet-black nothing',60,90],['mf_starmap','Star floor','round floor inlay of constellations, seen from above',128,128],['mf_stage','Stage floor','round wooden stage with footlights, seen from above-front',128,90],['mf_clock','Great clock','tall standing clock with a moon dial',44,120]]},
  // ── 32 · dungeon and arena pieces ──────────────────────────────────
  {id:'sc_dng_1',wave:32,pilot:1,fam:'dungeon',kind:'obj',cols:4,rows:2,title:'Dungeon pieces 1',items:[
    ['dg_boulder','Cave boulder','rough brown cave boulder',60,60],['dg_column','Cave column','cracked stone hall column',40,110],['dg_rubble','Rubble','heap of broken stone, seen from above-front',50,30],['dg_crystal','Cave crystal','cluster of violet cave crystals',50,80],
    ['dg_shroom','Giant mushroom','giant cave mushroom with a spotted teal cap',90,110],['dg_shroom_b','Mushroom cluster','cluster of smaller glowing mushrooms',60,60],['dg_obsidian','Obsidian block','sharp black obsidian block',40,60],['dg_stalagmite','Stalagmite','pointed cave stalagmite',36,70]]},
  {id:'sc_dng_2',wave:32,fam:'dungeon',kind:'obj',cols:4,rows:2,title:'Dungeon pieces 2',items:[
    ['dg_statue','Dungeon statue','worn statue of a forgotten king, one arm missing',40,70],['dg_ruinwall','Dungeon wall stub','low broken wall',70,50],['dg_rock','Lake rock','wet black rock',44,44],['dg_rib','Rib bone','curved rib bone standing up',50,90],
    ['dg_skull','Beast skull','large horned beast skull',90,80],['dg_root','Root','thick twisted root arching from the floor',40,70],['dg_stone','Chasm stone','flat-topped standing rock',40,60],['dg_puddle','Puddle','small puddle with a reflection, seen from above',50,30]]},
  {id:'sc_dng_3',wave:32,fam:'dungeon',kind:'obj',cols:4,rows:2,title:'Dungeon pieces 3 — things you use',items:[
    ['dg_chest','Dungeon chest','iron-bound treasure chest, closed',44,40],['dg_chest_open','Dungeon chest, open','the same chest open with gold',44,46],['dg_chest_boss','Guardian\'s chest','large ornate golden chest with a rune lock',60,52],['dg_stairs_up','Stairs up','stone steps climbing into an arch of light',64,70],
    ['dg_stairs_down','Stairs down','stone steps descending into darkness',64,56],['dg_cage','Captive cage','iron cage with an open door',60,80],['dg_lever','Lever','stone base with an iron lever',24,36],['dg_torch','Dungeon torch','standing iron torch',20,60]]},
  {id:'sc_dng_ember',wave:32,fam:'dungeon',kind:'obj',cols:4,rows:2,title:'Ember-cave and arena pieces',items:[
    ['dg_basalt','Ember basalt','short basalt column with glowing seams',44,78],['dg_vent','Lava vent','crusted vent glowing from below, seen from above-front',44,30],['dg_fcrystal','Fire crystal','cluster of orange-red crystals',50,80],['dg_hoist','Forge hoist','iron hoist frame with a chain and bucket',60,100],
    ['ar_pillar','Arena pillar','thick arena pillar with a rune band',40,96],['ar_barricade','Barricade','spiked wooden barricade',44,40],['ar_gear','Gear','large brass gear half sunk in the floor',48,48],['ar_mirror','Arena mirror','tall standing mirror in a dark frame',36,76]]}
  ],
  // ── the requests ──
  all:function(){ return ZSCN.SHEETS; },
  items:function(){ var L=[]; ZSCN.SHEETS.forEach(function(S){ S.items.forEach(function(it){ L.push({id:it[0],name:it[1],look:it[2],w:it[3],h:it[4],sheet:S.id,kind:S.kind,wave:S.wave,fam:S.fam}); }); }); return L; },
  anchor:function(fam){ var S=ZSCN.SHEETS.filter(function(s){ return s.fam===fam; })[0]; return S&&S.id; },
  body:function(S){ var tex=S.kind==='tex', n=S.items.length, one=n===1;
    var head='Create ONE image for a 2D top-down action RPG called Zeldara: '+(tex?'a sheet of '+n+' square ground-texture swatches':one?'a single piece of scenery':'a sheet of '+n+' separate pieces of scenery')+' — '+S.title+'.\n'+
      'The reference images show the game\'s characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.'+(S.anchorRef?' The last reference image is an earlier scenery sheet of the same family: match its line weight, colours and level of detail exactly.':'')+'\n';
    var lay=one?'Layout: the object alone, centred, filling most of the image with a clear margin all round.\n':
      'Layout: exactly '+n+(tex?' swatches':' objects')+' in a grid of '+S.cols+' columns × '+S.rows+' rows, evenly spaced, in this order (left to right, top row first):\n';
    var list=S.items.map(function(it,i){ return (one?'Subject: ':(i+1)+'. ')+it[1]+' — '+it[2]+(tex?'':S.kind==='flat'?' (about '+(Math.round(Math.max(it[3],it[4])/63*10)/10)+'× the hero\'s height across)':' ('+ZSCN.rel(it[4])+')')+'.'; }).join('\n');
    return head+lay+list+'\n'+ZSCN.VIEW[S.kind]; },
  // a size in words, relative to the hero (63 px)
  rel:function(h){ var k=h/63; return k<0.35?'a small item, under half the hero\'s height':k<0.8?'about '+(Math.round(k*10)/10)+'× the hero\'s height':k<1.25?'about as tall as the hero':'about '+(Math.round(k*10)/10)+'× the hero\'s height'; },
  requests:function(){ return ZSCN.SHEETS.map(function(S){ var a=ZSCN.anchor(S.fam), anc=a&&a!==S.id&&S.kind!=='tex'?a:null, T=Object.assign({},S,{anchorRef:!!anc});
    return {id:S.id,set:'scenery',kind:S.kind,fam:S.fam,wave:S.wave,pilot:!!S.pilot,title:S.title,cols:S.cols,rows:S.rows,size:S.size||'1536x1024',bg:S.kind==='tex'?'opaque':'transparent',
      refs:['style_hero','style_centaur'].concat(anc?[anc]:[]),items:S.items.map(function(it){ return {id:it[0],name:it[1],w:it[3],h:it[4]}; }),poses:S.items.map(function(it){ return it[0]; }),
      body:ZSCN.body(T),tail:S.kind==='tex'?'tex':'obj'}; }); },
  stats:function(){ var o={sheets:ZSCN.SHEETS.length,items:0,pilot:0,byWave:{}}; ZSCN.SHEETS.forEach(function(S){ o.items+=S.items.length; if(S.pilot)o.pilot++; var w=o.byWave[S.wave]||(o.byWave[S.wave]={name:ZSCN.WAVES[S.wave],sheets:0,items:0}); w.sheets++; w.items+=S.items.length; }); return o; }
};
