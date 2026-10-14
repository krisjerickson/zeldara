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
  WAVES:{20:'Pilot (one sheet per family)',21:'Village buildings',22:'Village props',23:'Building interiors',24:'Runes and waystones',25:'Tower, dungeon and other entrances',26:'Trees and plants',27:'Rocks, ruins and landmarks',28:'Paths, bridges and harbors',29:'Ground textures',30:'Camp and trial props',31:'Tower, castle and mage-tower furnishings',32:'Dungeon and arena pieces',38:'Edge pieces: shores, cliffs, snow, lava (round 38)',42:'Edge pieces: logs, features and small creatures (round 42)',43:'Animation frames: creatures and swaying plants (round 43)',44:'Sleeping in bed, and rugs that fit (round 44)',45:'Pilot: adventure-site rooms painted as one picture (round 44)',47:'Round 45: sky-port flights (backdrops, galleons, wingman, power-ups) and the adventure sites\' big set-pieces',49:'Round 46: the hero asleep and waking in the home bed, at the bed\'s own size',50:'Round 47: what fills the space round the adventure sites (rock, seas, fog, sky, night sky, their creatures), smoother butterflies and dragonflies, painted area effects'},
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
  // ── round 38: pieces set along the line where two kinds of ground meet (ZEdge, 07ze — the Lab's "Terrain edges" tab) ──
  {id:'sc_edge_1',wave:38,fam:'edges',kind:'obj',cols:4,rows:3,title:'Edge pieces 1 — shores and beaches',items:[
    ['ed_tuft_a','Grass tuft','a small tuft of green grass blades leaning to one side',36,30],['ed_tuft_b','Long grass clump','a wide clump of long green grass that hangs forward over an edge',52,36],['ed_tuft_dry','Dry grass tuft','a tuft of pale yellow-green highland grass',36,30],['ed_reeds','Reed clump','a clump of tall green reeds standing in water, a few bent',40,64],
    ['ed_cattails','Cattails','five cattails with brown heads standing in water',44,72],['ed_lily','Lily pads','three green lily pads with one pink flower, seen from above',52,30],['ed_pebbles','Shore pebbles','a loose line of small wet grey and tan pebbles, seen from above',60,24],['ed_shells','Shells','two sea shells and a small orange starfish on sand, seen from above',48,24],
    ['ed_driftwood','Driftwood','a pale weathered branch of driftwood lying flat',72,30],['ed_shore_rock','Shore rock','a low dark wet rock with a thin white foam line round its base',56,40],['ed_foam','Foam curl','a short curved line of white sea foam, seen from above, soft ends',64,20],['ed_bank','Earth bank','a short strip of dark crumbly earth bank seen from the front, with grass hanging over its top edge and the two ends fading out',96,36]]},
  {id:'sc_edge_2',wave:38,fam:'edges',kind:'obj',cols:4,rows:3,title:'Edge pieces 2 — cliffs, snow, mud and lava',items:[
    ['ed_talus_a','Rubble','a small heap of broken grey rock at the foot of a cliff',72,38],['ed_talus_b','Scree fan','a wide low fan of loose stones spilling forward',100,44],['ed_foot_boulder','Foot boulder','a large angular boulder with small stones round it',64,54],['ed_cliff_grass','Cliff-top grass','a strip of grass and small roots hanging over a rock edge, seen from the front, ends fading',96,28],
    ['ed_roots','Roots','tree roots spilling over an earth bank, seen from the front',72,38],['ed_mud_clods','Mud clods','a few dark wet clods of mud with a small puddle, seen from above',56,26],['ed_snow_drift','Snow drift','a low soft drift of white snow with a blue shadow',72,28],['ed_snow_lip','Snow lip','a strip of snow hanging over a rock edge with small icicles, seen from the front, ends fading',96,32],
    ['ed_ice_shards','Ice shards','a cluster of small pale-blue ice shards',48,40],['ed_crust_shards','Crust shards','broken plates of black cooled lava crust, seen from above',64,30],['ed_ember_rocks','Ember rocks','three black rocks with glowing orange cracks',50,34],['ed_ash_heap','Ash heap','a low heap of grey ash with a few embers',56,26]]},
  // ── round 42 (Kris, Oct 9: "make requests for painted fallen logs and as many other terrain features as you think might be useful to have painted") ──
  //    every static feature and moving creature of the Lab's round 40 terrain cards, plus more pieces for edges and ground (05d ZWE uses them)
  {id:'sc_edge_3',wave:42,fam:'edges',kind:'obj',cols:4,rows:3,title:'Edge pieces 3 — logs, stones and the water\'s edge',items:[
    ['ed_log_fallen','Fallen log','a fallen tree trunk lying on the ground at a slight angle, rough bark, one broken end and one cut end showing rings',96,40],['ed_log_mossy','Mossy log','an old fallen log half covered in green moss with a small fern growing from it',96,40],['ed_log_rotting','Rotting log','a dark rotting log sinking into mud, soft split bark, two small mushrooms and a little water round it',96,40],['ed_rock_mossy','Mossy rock','a rounded grey rock with a cap of green moss and a few grass blades at its foot',52,42],
    ['ed_stepping_stones','Stepping stones','three flat grey stepping stones in a short line, seen from above, a thin ring of water round each',84,36],['ed_wildflowers','Wildflowers','a small clump of wild meadow flowers: white daisies, yellow buttercups and pink clover on green stems',44,34],['ed_iris','Water iris','a clump of tall blue-violet water irises with sword-shaped leaves at a pond edge',44,62],['ed_toadstools','Toadstools','a cluster of three red-capped white-spotted toadstools and two small brown mushrooms',44,38],
    ['ed_duckweed','Duckweed patch','a loose irregular patch of tiny bright green duckweed floating on water, seen from above',64,30],['ed_wrack','Seaweed wrack','a short wavy line of dark green and brown seaweed with a bit of driftwood and a small shell, washed up, seen from above',96,28],['ed_dune_grass','Dune grass','a tall clump of pale silvery-green marram dune grass bending in the wind on a little sand mound',50,52],['ed_tide_pool','Tide pool','a small rock pool among dark wet rocks with clear water, an orange starfish and a sea anemone, seen from above',72,44]]},
  {id:'sc_edge_4',wave:42,fam:'edges',kind:'obj',cols:4,rows:3,title:'Edge pieces 4 — highlands, snow and fire',items:[
    ['ed_ivy','Hanging ivy','a curtain of dark green ivy hanging down over a rock face, seen from the front, straight top edge, trailing ends',64,60],['ed_moss_patch','Moss patch','a soft cushion of bright green moss with tiny white flowers on grey stone',52,30],['ed_alpine_flowers','Mountain flowers','a small clump of blue gentians and white edelweiss among short tough grass and pebbles',44,32],['ed_heather','Heather','a low rounded bush of purple heather',52,34],
    ['ed_icicles','Icicles','a row of pale blue icicles of different lengths hanging from a strip of snowy rock edge, seen from the front',80,44],['ed_snow_pine','Snowy sapling','a small young pine tree with snow on its branches',40,64],['ed_frozen_puddle','Frozen puddle','a small frozen puddle with pale blue cracked ice and frosted edges, seen from above',60,32],['ed_snow_rock','Rock in snow','a grey rock half buried in snow with a cap of snow',52,40],
    ['ed_obsidian','Obsidian shards','a cluster of glossy black obsidian shards with sharp edges and violet glints',52,44],['ed_sulphur','Sulphur crystals','a cluster of bright yellow sulphur crystals on grey rock with a thin wisp of fume',48,44],['ed_basalt','Basalt columns','the tops of five six-sided dark basalt columns of different heights, seen from a little above, faint orange glow in the cracks between them',80,56],['ed_steam_vent','Steam vent','a cracked crust vent glowing orange inside with a puff of white steam rising from it',52,60]]},
  {id:'sc_edge_5',wave:42,fam:'edges',kind:'obj',cols:4,rows:3,title:'Edge pieces 5 — small creatures and drifting things',items:[
    ['ed_crab','Crab','a small red beach crab seen from above, claws raised',28,22],['ed_dragonfly','Dragonfly','a blue dragonfly seen from above with four clear wings spread',32,28],['ed_fish','Leaping fish','a small silver-blue fish leaping in an arc, seen from the side',36,24],['ed_frog','Frog','a small green frog sitting, seen from slightly above',26,22],
    ['ed_gull','Gull','a white seagull gliding with wings spread wide, seen from above',48,24],['ed_crow','Crow','a black crow flying with wings spread, seen from above',40,22],['ed_butterfly','Butterfly','an orange and black butterfly with wings spread, seen from above',26,22],['ed_wisp','Will-o\'-wisp','a small pale blue-green glowing wisp of light with a soft trailing tail',30,34],
    ['ed_firefly','Firefly','a tiny firefly with a soft yellow-green glowing tail',18,18],['ed_leaf_autumn','Autumn leaf','a single orange autumn maple leaf',18,18],['ed_leaf_red','Red leaf','a single deep red oak leaf',18,18],['ed_leaf_green','Green leaf','a single small green birch leaf',16,16]]},
  {id:'sc_edge_6',wave:42,fam:'edges',kind:'obj',cols:4,rows:3,title:'Edge pieces 6 — more ground and water details',items:[
    ['ed_lava_plate','Floating crust','a floating plate of dark cooling lava crust with glowing orange edges, seen from above',56,36],['ed_lava_bubble','Lava bubble','a swelling bubble of bright molten lava about to burst, seen from a little above',36,30],['ed_cracked_mud','Cracked mud','a patch of dry cracked mud plates, seen from above',64,36],['ed_sand_ripples','Sand ripples','a patch of wind ripples in pale sand with a few tiny shells, seen from above',72,36],
    ['ed_snow_ripples','Snow ripples','a patch of wind-blown ridges in white snow with blue shadows, seen from above',72,36],['ed_puddle','Puddle','a small rain puddle reflecting the sky with a muddy rim, seen from above',56,30],['ed_reeds_dry','Dry reeds','a clump of pale brown winter reeds with frost on the tips',40,56],['ed_clover','Clover patch','a low patch of clover with two white clover flowers',40,26],
    ['ed_fern','Fern','a small green fern with arching fronds',44,40],['ed_bramble','Bramble','a low thorny bramble bush with a few dark berries',52,36],['ed_lichen_rock','Lichen rock','a flat grey rock speckled with orange and pale green lichen',48,32],['ed_ice_floe','Ice floe','a small flat white ice floe floating on dark water with a thin blue edge, seen from above',60,34]]},
  // ── round 43 (Kris, Oct 9: "If its an animal or anything else that should move or sway, make sure we have enough painted images to make it look like its moving") ──
  //    animation frames: each ROW is one subject from the round 42 sheets drawn as the frames of a short loop (seq: id, name, what it does, anchor, w, h, frames).
  //    anchor — base: the foot stays put (plants, crab, frog, vents); top: the top edge stays put (hanging ivy); reg: frames are lined up on the body (flyers, fish, leaf).
  //    The intake cuts a row at ONE scale and lines its frames up (tools/sprites/intake_scenery.py, groups); the game plays them (05d ZWE.ANIM, 10c).
  {id:'sc_anim_1',wave:43,fam:'anim',kind:'obj',cols:4,rows:3,anim:1,refs:['sc_edge_5'],title:'Animation frames 1 — crab, frog and leaping fish',seq:[
    ['an_crab','Crab','scuttling sideways','base',28,22,['legs on its left side stretched forward, both claws raised','legs tucked together, claws half lowered','legs on its right side stretched forward, both claws raised','legs tucked together, claws snapping open']],
    ['an_frog','Frog','sitting, croaking and hopping','base',26,22,['sitting upright','sitting, its throat puffed out in a pale round bubble','crouched low, ready to jump','in mid-leap, back legs stretched out straight behind, front legs reaching forward']],
    ['an_fish','Leaping fish','one leap out of the water and back in','reg',36,24,['bursting out nose-up with a few water drops','at the top of its leap, body curved in an arc','level, tail flicking','diving back in nose-down']]]},
  {id:'sc_anim_2',wave:43,fam:'anim',kind:'obj',cols:4,rows:3,anim:1,refs:['sc_edge_5'],title:'Animation frames 2 — gull, crow and dragonfly in flight',seq:[
    ['an_gull','Gull','flapping its wings','reg',48,24,['wings spread level, gliding','wings raised high above its back in a V','wings level again','wings pushed down below its body, tips curled']],
    ['an_crow','Crow','flapping its wings','reg',40,22,['wings spread level, gliding','wings raised high above its back','wings level again','wings pushed down below its body']],
    ['an_dragonfly','Dragonfly','beating its wings','reg',32,28,['all four wings spread flat','the four wings swept forward and blurred','all four wings spread flat again','the four wings swept back and blurred']]]},
  {id:'sc_anim_3',wave:43,fam:'anim',kind:'obj',cols:4,rows:3,anim:1,refs:['sc_edge_5'],title:'Animation frames 3 — butterfly, will-o\'-wisp and firefly',seq:[
    ['an_butterfly','Butterfly','fluttering','reg',26,22,['wings fully open','wings half closed, tilted up','wings closed together, seen as a thin upright shape','wings half open']],
    ['an_wisp','Will-o\'-wisp','flickering','reg',30,34,['round glow, tail curling to the left','taller and thinner, tail straight down','squashed a little wider, tail curling to the right','smaller and brighter, tail short']],
    ['an_firefly','Firefly','blinking its light','reg',18,18,['tail light dim, wings up','tail glowing softly, wings down','tail glowing bright with a soft yellow-green halo, wings up','tail glowing softly, wings down']]]},
  {id:'sc_anim_4',wave:43,fam:'anim',kind:'obj',cols:4,rows:3,anim:1,refs:['sc_edge_5','sc_edge_4','sc_edge_6'],title:'Animation frames 4 — tumbling leaf, lava bubble and steam vent',seq:[
    ['an_leaf','Autumn leaf','tumbling over as it falls','reg',18,18,['lying flat, face up','tilted, seen at a slant so it looks narrower','edge-on, a thin sliver','tilted the other way, showing its paler underside']],
    ['an_lava_bubble','Lava bubble','swelling and bursting','base',36,30,['a low glowing dome on the molten surface','swollen into a round bubble with a bright thin skin','bursting into splashes of molten drops','a collapsing ring of glowing ripples']],
    ['an_steam_vent','Steam vent','puffing steam (the vent itself does not move)','base',52,60,['the vent with only a thin wisp of steam','a small white puff rising from it','a big billowing puff of steam above it','the puff thinning and drifting up and away']]]},
  {id:'sc_anim_5',wave:43,fam:'anim',kind:'obj',cols:3,rows:4,size:'1024x1536',anim:1,sway:1,refs:['sc_edge_1','sc_edge_3','sc_edge_6'],title:'Animation frames 5 — reeds, cattails, irises and dry reeds swaying',seq:[
    ['an_reeds','Reed clump','swaying in the wind','base',40,64,null],['an_cattails','Cattails','swaying in the wind','base',44,72,null],['an_iris','Water iris','swaying in the wind','base',44,62,null],['an_reeds_dry','Dry reeds','swaying in the wind','base',40,56,null]]},
  {id:'sc_anim_6',wave:43,fam:'anim',kind:'obj',cols:3,rows:4,size:'1024x1536',anim:1,sway:1,refs:['sc_edge_1','sc_edge_3'],title:'Animation frames 6 — dune grass and grass tufts swaying',seq:[
    ['an_dune_grass','Dune grass','swaying in the wind','base',50,52,null],['an_tuft_a','Grass tuft','swaying in the wind','base',36,30,null],['an_tuft_b','Long grass clump','swaying in the wind','base',52,36,null],['an_tuft_dry','Dry grass tuft','swaying in the wind','base',36,30,null]]},
  {id:'sc_anim_7',wave:43,fam:'anim',kind:'obj',cols:3,rows:4,size:'1024x1536',anim:1,sway:1,refs:['sc_edge_3','sc_edge_4','sc_edge_6'],title:'Animation frames 7 — flowers, fern and hanging ivy swaying',seq:[
    ['an_wildflowers','Wildflowers','swaying in the wind','base',44,34,null],['an_alpine_flowers','Mountain flowers','swaying in the wind','base',44,32,null],['an_fern','Fern','swaying in the wind','base',44,40,null],['an_ivy','Hanging ivy','swinging in the wind (the top edge stays fixed to the rock)','top',64,60,['the trailing ends swung to the left','hanging straight down at rest','the trailing ends swung to the right']]]},
  // ── round 44 (Kris, Oct 10: "we need to create an animation for you resting in your bed. We can create new sheets to do this" — and "rugs that are bad
  //    pixelated images that are stretched oddly … we can request new painted features, if needed") ──
  {id:'sc_sleep_1',wave:44,fam:'anim',kind:'obj',cols:4,rows:4,size:'1024x1536',anim:1,refs:['sc_int_1','hero_m.model','hero_f.model'],title:'Animation frames — the hero asleep in the home bed, and waking up',seq:[
    ['an_sleep_m','Hero (the boy) asleep in his bed','sleeping, breathing slowly','base',44,72,['the same wooden bed with the patchwork quilt and pillow as in its picture; the boy hero (exactly as in his model sheet) lies on his back in it, head on the pillow, eyes closed, the quilt pulled up to his chest, arms on top of the quilt','the same, his chest and the quilt risen a little as he breathes in','the same, mouth slightly open, a tiny sleep bubble at his nose','the same, the quilt settled back down as he breathes out']],
    ['an_sleep_f','Hero (the girl) asleep in her bed','sleeping, breathing slowly','base',44,72,['the same wooden bed with the patchwork quilt and pillow; the girl hero (exactly as in her model sheet) lies on her back in it, head on the pillow, eyes closed, the quilt pulled up to her chest, arms on top of the quilt','the same, her chest and the quilt risen a little as she breathes in','the same, mouth slightly open, a tiny sleep bubble at her nose','the same, the quilt settled back down as she breathes out']],
    ['an_wake_m','Hero (the boy) waking up','waking and getting out of bed','base',44,72,['the same bed; the boy sits up in it, yawning, one fist rubbing an eye','sitting up, stretching both arms high above his head','sitting on the edge of the bed, quilt thrown back, feet on the floor','the bed empty and tidy, the quilt pulled up, the boy standing beside its foot, rested and smiling']],
    ['an_wake_f','Hero (the girl) waking up','waking and getting out of bed','base',44,72,['the same bed; the girl sits up in it, yawning, one fist rubbing an eye','sitting up, stretching both arms high above her head','sitting on the edge of the bed, quilt thrown back, feet on the floor','the bed empty and tidy, the quilt pulled up, the girl standing beside its foot, rested and smiling']]]},
  // round 46 (Kris: "The bed and yourself get really large when sleeping. We need to remake the sprites for this so there isn't a change in your size
  // or the bed size"): the home bed EXACTLY as its own picture (if_bed, 44 × 72), the same size and angle in every frame and in the same place in its cell,
  // the hero at his normal size (his head about a third of the bed's width), so the game can lay these over the bed without anything growing.
  {id:'sc_sleep_2',wave:49,fam:'anim',kind:'obj',cols:4,rows:4,size:'1024x1536',anim:1,refs:['sc_int_1','hero_m.model','hero_f.model'],title:'Animation frames — the hero asleep in the home bed, and waking up — the bed EXACTLY the size, shape and angle of the bed in its own picture (sc_int_1, "Bed"), in the same spot of every cell, never bigger; the hero at his normal size relative to it',seq:[
    ['an_sleep2_m','Hero (the boy) asleep in the home bed','sleeping, breathing slowly','base',44,72,['the home bed exactly as in its picture (same frame, quilt, pillow, size and angle); the boy hero, at his normal size, lies on his back in it, head on the pillow, eyes closed, the quilt pulled up to his chest','the same, his chest and the quilt risen a little as he breathes in','the same, mouth slightly open, a tiny sleep bubble at his nose','the same, the quilt settled back down as he breathes out']],
    ['an_sleep2_f','Hero (the girl) asleep in the home bed','sleeping, breathing slowly','base',44,72,['the home bed exactly as in its picture (same frame, quilt, pillow, size and angle); the girl hero, at her normal size, lies on her back in it, head on the pillow, eyes closed, the quilt pulled up to her chest','the same, her chest and the quilt risen a little as she breathes in','the same, mouth slightly open, a tiny sleep bubble at her nose','the same, the quilt settled back down as she breathes out']],
    ['an_wake2_m','Hero (the boy) waking up in the home bed','waking and getting up','base',44,72,['the same bed, same size and place; the boy sits up in it, yawning, one fist rubbing an eye','sitting up, stretching both arms high above his head','sitting on the edge of the bed, quilt thrown back, feet on the floor','the bed empty and tidy, the quilt pulled up (the boy has stepped out of the picture)']],
    ['an_wake2_f','Hero (the girl) waking up in the home bed','waking and getting up','base',44,72,['the same bed, same size and place; the girl sits up in it, yawning, one fist rubbing an eye','sitting up, stretching both arms high above her head','sitting on the edge of the bed, quilt thrown back, feet on the floor','the bed empty and tidy, the quilt pulled up (the girl has stepped out of the picture)']]]},
  // ── round 47 (Kris: the empty space — "we might need to create some painted images to enhance the look, suggest some for this. Could also have some
  //    burrowing critters" · "maybe some lava creatures as well, like lava or rock gargoyles" · sky "clouds might need to be painted images … epic and
  //    inspiring" · stars "aurora borealis and shooting stars … milky way galaxy or nebulae"; the critters "too spastic … more painted figures for them
  //    to look smoother"; "all of the monster attacks and your own attacks that show an area effect with coloration need to be remade with painted
  //    images"). Wave 50: .\tools\sprites\round47.ps1 ──
  {id:'sc_void_tex',wave:50,fam:'tex',kind:'tex',cols:3,rows:2,refs:['sc_tex_grass'],title:'Ground 7 — what lies round an adventure site: rock and seas seen from straight above, seamless',items:[
    ['tx_v_strata','Rock strata','layered bands of grey-brown and ochre sedimentary rock seen from straight above, as if a floor were cut down through it: thin wavy bands, hairline cracks, small pebbles',256,256],
    ['tx_v_roots','Root-bound earth','packed dark earth threaded with pale twisting roots and small stones, a few tiny glinting crystals',256,256],
    ['tx_v_ore','Ore-veined granite','dark speckled granite with thin glinting veins of copper and pale blue crystal running through it',256,256],
    ['tx_v_lavasea','Lava sea','a sea of molten lava from above: dark cooling crust plates with glowing orange-yellow seams floating on bright flowing lava',256,256],
    ['tx_v_deepsea','Deep sea','deep night-blue sea from above, long slow swells, faint foam lines, a darker depth in places',256,256],
    ['tx_v_cloudsea','Sea of clouds','a thick sea of sunlit white and pale-gold cloud tops seen from far above, soft rounded billows with blue-grey shadows between',256,256]]},
  {id:'sc_void_life',wave:50,fam:'void',kind:'obj',cols:4,rows:3,refs:['sc_edge_5'],title:'Creatures of the deep places round the adventure sites — each seen from above at a slight angle, half out of its rock, lava, water or cloud',items:[
    ['vd_mole','Burrowing mole','a dark velvety mole pushing its head and big pink digging paws up out of a small mound of earth and rubble',64,56],
    ['vd_rock_worm','Rock worm','a thick segmented grey rock worm arching out of a hole in stone, a ring of tiny teeth, dust falling',64,64],
    ['vd_beetle','Burrowing beetle','a shiny blue-black beetle with a digging horn half out of loose earth',56,48],
    ['vd_bat_swarm','Bat swarm','a small swirling flock of dark bats in flight, wings spread, seen from above',96,72],
    ['vd_gargoyle_lava','Lava gargoyle','a hulking gargoyle of black rock with glowing molten cracks and ember eyes, rising chest-deep out of lava, horns, folded stone wings',96,104],
    ['vd_gargoyle_rock','Rock gargoyle','a crouching grey stone gargoyle with moss on its shoulders and glowing amber eyes, half sunk in rubble',88,96],
    ['vd_magma_serpent','Magma serpent','the arched back and head of a serpent of molten rock breaking the surface of lava, drips of fire',112,72],
    ['vd_tentacle','Sea tentacle','a great dark-green tentacle curling up out of deep water, suckers along its underside, water streaming off',64,96],
    ['vd_whale_fin','Whale back','the dark back and tall fin of a huge whale breaking the sea surface, a spray of water',112,64],
    ['vd_sky_whale','Sky whale','a long pale blue-white whale with fin-like wings swimming through clouds, seen from above',128,72],
    ['vd_storm_eel','Storm eel','a long violet eel crackling with white lightning, coiling through dark storm cloud',112,64],
    ['vd_star_whale','Star whale','a translucent deep-blue whale filled with tiny stars, swimming through space, a faint trail of light',128,72]]},
  {id:'sc_void_fog',wave:50,fam:'void',kind:'flat',cols:2,rows:2,size:'1536x1024',title:'Fog and light for the abyss — soft white and pale-blue fog painted on a PURE BLACK background (it will be laid over the game as light, so the black must stay pure black)',items:[
    ['vd_fog_bank_1','Fog bank 1','a long low bank of soft rolling fog, denser in the middle, thinning to wisps at both ends',640,320],
    ['vd_fog_bank_2','Fog bank 2','a wider, flatter layer of mist with gaps and curls, as seen looking down into a deep chasm',640,320],
    ['vd_mist_wisps','Mist wisps','several thin drifting wisps and curls of mist',640,320],
    ['vd_light_shaft','Light shaft','a soft slanting shaft of pale light falling down into darkness, dust motes glinting in it',640,320]]},
  {id:'sc_void_sky',wave:50,fam:'void',kind:'obj',cols:3,rows:2,refs:['sc_sky_bg_1'],title:'An epic sky round the high towers — painted clouds and far peaks seen from high above',items:[
    ['vd_cloud_1','Cloud mass','a big sunlit cumulus cloud seen from above, white tops, soft blue-grey shadows, golden edge light',192,128],
    ['vd_cloud_2','Cloud bank','a long flat bank of cloud seen from above, wisps trailing',224,96],
    ['vd_cloud_3','Small cloud','a small puffy cloud seen from above',112,80],
    ['vd_peak_1','Far peak','a snow-capped mountain peak rising out of a sea of cloud far below, seen from high above',176,160],
    ['vd_peak_2','Far crags','two jagged rocky crags poking up through cloud, a waterfall on one',176,144],
    ['vd_tower_far','Distant tower','a slender distant stone tower on a rock spire rising through cloud, a tiny banner, bluish with distance',96,176]]},
  {id:'sc_void_night',wave:50,fam:'void',kind:'flat',cols:3,rows:2,size:'1536x1024',title:'The night sky round the mage towers — painted on a PURE BLACK background (it will be laid over the game as light, so the black must stay pure black)',items:[
    ['vd_milkyway','Milky way','a broad diagonal band of the milky way: countless tiny stars, glowing dust lanes, soft white-gold core',512,320],
    ['vd_nebula_violet','Violet nebula','a glowing violet and teal nebula cloud with bright young stars inside',448,320],
    ['vd_nebula_rose','Rose nebula','a rose-pink and gold nebula, wispy filaments, a few bright stars',448,320],
    ['vd_aurora','Aurora','curtains of aurora borealis in green fading to violet, rippling folds hanging from the top',512,320],
    ['vd_planet_ringed','Ringed planet','a distant pale ringed planet, half lit, its rings tilted',256,192],
    ['vd_shooting_star','Shooting star','a bright shooting star with a long tapering glowing tail',384,96]]},
  {id:'sc_anim_flit',wave:50,fam:'anim',kind:'obj',cols:8,rows:2,size:'1536x1024',anim:1,refs:['sc_anim_3','sc_anim_2'],title:'Animation frames — a butterfly and a dragonfly in smooth, slow flight (eight frames each, so the wingbeat looks fluid)',seq:[
    ['an_butterfly2','Butterfly','one slow, smooth wingbeat','reg',26,22,['wings fully open, flat','wings beginning to lift, slightly raised','wings raised to half','wings raised high, nearly upright','wings closed together, seen as a thin upright shape','wings opening again, nearly upright','wings lowering to half','wings almost flat again']],
    ['an_dragonfly2','Dragonfly','one smooth beat of its four wings','reg',32,28,['all four wings spread flat','front wings tilting forward a little','front wings swept forward, back wings back','both pairs swept to their furthest, slightly blurred','wings returning toward flat','all four wings spread flat again','back wings tilting forward a little','both pairs swept the other way, slightly blurred']]]},
  {id:'sc_fx_ground',wave:50,fam:'fx',kind:'obj',cols:4,rows:3,refs:['sc_edge_5'],title:'Painted area effects 1 — warnings and lingering patches on the ground, seen from straight above, each a flat circular or wedge-shaped patch',items:[
    ['fx_tele_circle','Warning circle','a glowing red-orange rune circle burned into the ground, cracks radiating inside it, as a warning of an attack about to land',128,128],
    ['fx_tele_cone','Warning wedge','a wedge-shaped (pie-slice) patch of glowing red-orange cracked ground fanning out from its point',128,128],
    ['fx_tele_line','Warning path','a long straight strip of glowing red-orange runes and cracks along the ground',192,48],
    ['fx_zone_frost','Frost patch','a round patch of frost and thin ice crystals on the ground, pale blue, sparkling',128,128],
    ['fx_zone_poison','Poison pool','a round bubbling puddle of glowing green poison with a few bubbles and a thin vapour',128,128],
    ['fx_zone_burn','Burning ground','a round patch of scorched ground with small flames and glowing embers',128,128],
    ['fx_zone_shadow','Shadow pool','a round pool of swirling black-violet shadow with faint wisps rising',128,128],
    ['fx_zone_pollen','Pollen cloud','a low round cloud of pale pink-gold pollen dust and tiny petals',128,128],
    ['fx_zone_vines','Grasping vines','a round tangle of thorny green vines writhing up out of the ground',128,128],
    ['fx_zone_lava','Lava pool','a round pool of bright lava with a dark crust rim',128,128],
    ['fx_zone_blood','Cursed ground','a round patch of glowing red cursed runes on the ground',128,128],
    ['fx_crack_ring','Shattered ground','a ring of broken, upheaved ground and flying pebbles from a heavy slam',128,128]]},
  {id:'sc_fx_blast',wave:50,fam:'fx',kind:'flat',cols:4,rows:3,size:'1536x1024',title:'Painted area effects 2 — attacks that burst outward, painted on a PURE BLACK background (laid over the game as light, so the black must stay pure black)',items:[
    ['fx_shockwave','Shockwave','a ring-shaped shockwave of dust and force spreading on the ground, seen from above',256,256],
    ['fx_ring_ice','Ice ring','an expanding ring of icy blue light and ice shards, seen from above',256,256],
    ['fx_burst_fire','Fire burst','a round fiery explosion seen from above, orange-yellow core, smoky edges',256,256],
    ['fx_nova_ice','Frost nova','a round burst of frost and ice crystals spreading outward',256,256],
    ['fx_burst_storm','Lightning burst','a round burst of crackling white-violet lightning branching outward',256,256],
    ['fx_breath_fire','Fire breath','a wedge-shaped jet of roaring fire fanning out from its narrow end on the left',256,160],
    ['fx_breath_frost','Frost breath','a wedge-shaped jet of icy mist and shards fanning out from its narrow end on the left',256,160],
    ['fx_beam','Energy beam','a long straight beam of searing red-white energy, bright core, glowing edges, running left to right',384,64],
    ['fx_impact_meteor','Meteor impact','a meteor striking the ground from above: a burst of fire and flying rock in a ring',256,256],
    ['fx_ring_heal','Healing ring','a soft ring of green-gold healing light with tiny leaves and sparkles',256,256],
    ['fx_gust','Gust','a sweep of wind seen from above: white curling streaks of air fanning out',256,160],
    ['fx_burst_shadow','Shadow burst','a round burst of black-violet shadow tendrils lashing outward',256,256]]},
  {id:'sc_fx_skill',wave:50,fam:'fx',kind:'flat',cols:4,rows:3,size:'1536x1024',title:'Painted area effects 3 — the hero\'s own skills and spells, painted on a PURE BLACK background (laid over the game as light, so the black must stay pure black)',items:[
    ['fx_whirlwind','Whirlwind','a spinning ring of bright sword-arcs and wind seen from above',256,256],
    ['fx_dash_trail','Dash trail','a short streak of blue-white speed light and dust, running left to right',256,96],
    ['fx_frost_trail','Frost trail','a short trail of frost crystals and cold mist, running left to right',256,96],
    ['fx_smoke','Smoke cloud','a round billowing cloud of grey smoke seen from above',256,256],
    ['fx_berserk_aura','Berserk aura','a ring of roaring red-orange flame-light around an empty centre',256,256],
    ['fx_heal_aura','Healing aura','a soft rising column of green-gold light and sparkles, seen from above as a glowing disc',256,256],
    ['fx_time_ring','Time ring','a wide ring of pale cyan clockwork runes and light',256,256],
    ['fx_arcane_aura','Arcane aura','a ring of lilac arcane runes and motes of light',256,256],
    ['fx_shield_bubble','Shield bubble','a round translucent blue bubble of force with a bright rim and faint hexagon pattern',256,256],
    ['fx_familiar_burst','Familiar burst','a round burst of teal spirit light with small spirit wisps',256,256],
    ['fx_meteor_mark','Meteor target','a glowing orange target circle on the ground with falling sparks above it',256,256],
    ['fx_root_burst','Root burst','a round burst of green roots and leaves bursting up from the ground',256,256]]},
  // ── wave 53 (round 52, the spirit saga part 1 — doc 28: the trapped spirits toil in chains, frustrated, then float free and relaxed, glowing
  //    the runic light blue; Kris: "Spirits should look like people") ──
  {id:'sc_spirit_anim',wave:53,fam:'anim',kind:'obj',cols:6,rows:2,size:'1536x1024',anim:1,title:'Animation frames — a trapped spirit: a translucent, softly glowing person made of pale light-blue light (runic cyan, #6fe3f5), friendly face, simple village clothes, the lower legs fading into a wisp; seen from above-front like the game characters',seq:[
    ['an_spirit_toil','Toiling spirit','in chains, made to dig: an iron shackle and chain on one ankle, swinging a heavy pick at the rock, tired and frustrated, shoulders slumped, brow furrowed','reg',40,60,['pick raised high behind the head','pick swinging down','pick striking the ground, a few sparks','pulling the pick back out, sighing','leaning on the pick, wiping the brow, looking weary','lifting the pick again']],
    ['an_spirit_free','Freed spirit','free and relaxed: no chains, floating a little above the ground, a gentle smile, glowing a little brighter','reg',40,60,['floating, arms relaxed at the sides','rising a touch, arms lifting slightly','arms open, face turned up, smiling','floating at its highest, eyes closed, peaceful','sinking a touch, arms lowering','back to the start, a little wave of the hand']]]},
  {id:'sc_spirit_sets',wave:53,fam:'spirit',kind:'obj',cols:4,rows:2,title:'Freed spirits and their bindstones — spirits are translucent, softly glowing people of pale light-blue runic light (#6fe3f5), friendly, in simple village clothes, their lower legs fading into a wisp',items:[
    ['sp_group_2','Two spirits','two freed spirits side by side, relaxed and smiling, one with a hand on the other\'s shoulder',64,64],
    ['sp_group_3','Three spirits','three freed spirits gathered together, chatting happily',90,64],
    ['sp_group_4','Four spirits','four freed spirits in a loose ring, relaxed, glowing',110,70],
    ['sp_group_6','Six spirits','six freed spirits gathered in two little rows, some waving',140,80],
    ['sp_group_10','Ten spirits','a crowd of ten freed spirits gathered close together, glowing softly, a few looking up',190,100],
    ['sp_toil_line','Spirits in a chain gang','a line of four trapped spirits chained together at the ankles, carrying baskets of ore and picks, weary and frustrated',190,80],
    ['sp_bindstone','Bindstone, bound','a tall grey standing runestone wrapped in heavy iron chains, its carved runes glowing an angry red-orange, a chain running from it along the ground',48,80],
    ['sp_bindstone_free','Bindstone, freed','the same tall grey runestone, its broken chains lying on the ground around it, its carved runes glowing a calm light blue',48,80]]},
  {id:'sc_glimmerhall',wave:53,fam:'village',kind:'bld',cols:2,rows:1,size:'1536x1024',title:'The Glimmerhall — the most impressive building in the village',items:[
    ['vb_glimmerhall','The Glimmerhall','the grandest building in a Norse-style village: a hall of pale carved stone and timber crowned with a great dome and tall windows of glass, every pane etched with runes that glow light blue (#6fe3f5), slender glass spires at its corners, a wide arched doorway with glowing glass doors, a glass furnace\'s soft glow inside, flower boxes',280,300],
    ['np_solveig','Sólveig the Glasswright','a kind, wise woman glassmaker standing, long silver-blond braids, a blue dress under a leather apron, thick gloves tucked in her belt, holding up a small glowing light-blue shard of glass in one hand, full figure, front view',48,88]]},
  {id:'sc_ic_spirit',wave:53,fam:'icons',kind:'icon',cols:4,rows:2,size:'1024x1024',title:'Soulglass — game icons',items:[
    ['ic_soulglass_1','Soulglass shard (Grasslands)','a jagged shard of glowing light-blue glass with a faint green leaf-rune inside',48,48],
    ['ic_soulglass_2','Soulglass shard (Wetlands)','a jagged shard of glowing light-blue glass with a faint deep-blue wave-rune inside',48,48],
    ['ic_soulglass_3','Soulglass shard (Highlands)','a jagged shard of glowing light-blue glass with a faint amber mountain-rune inside',48,48],
    ['ic_soulglass_4','Soulglass shard (Ashlands)','a jagged shard of glowing light-blue glass with a faint red flame-rune inside',48,48],
    ['ic_soulglass_lattice_1','Ember lattice','six light-blue glass shards fused into a round lattice of glowing runes, with a green leaf-rune at its heart',48,48],
    ['ic_soulglass_lattice_2','Cinder lattice','six light-blue glass shards fused into a round lattice of glowing runes, with a deep-blue wave-rune at its heart',48,48],
    ['ic_soulglass_lattice_3','Slag lattice','six light-blue glass shards fused into a round lattice of glowing runes, with an amber mountain-rune at its heart',48,48],
    ['ic_soulglass_lattice_4','Ash lattice','six light-blue glass shards fused into a round lattice of glowing runes, with a red flame-rune at its heart',48,48]]},
  // ── wave 52 (round 51, Kris: "We also need to create new images for the entrances to the mini volcanoes and the great volcano" — named
  //    for Muspelheim's forges, his card) ──
  {id:'sc_ent_forges',wave:52,fam:'entrance',kind:'bld',cols:3,rows:2,title:'The four Forges of Muspelheim and the great gate of Muspelheim — entrances in the sea, each a door into a volcano, seen from above-front like the other site entrances',items:[
    ['en_forge_ember','Ember Forge','a squat volcanic cone of black basalt rising from the sea, green moss and wildflowers clinging to its lower flanks, a great arched forge-mouth at its foot glowing ember-orange behind iron doors with an anvil-and-leaf emblem, embers drifting up from its crater',170,170],
    ['en_forge_cinder','Cinder Forge','a squat volcanic cone of wet black basalt standing in shallow sea water, steam hissing where little lava channels meet the waves, an arched forge-mouth glowing orange behind iron doors with an anvil-and-wave emblem, cinders and steam rising from its crater',170,170],
    ['en_forge_slag','Slag Forge','a squat volcanic cone of rough grey slag and stone, dwarven stone buttresses and stairs carved into it, molten slag runoff down its sides, an arched forge-mouth glowing orange behind iron doors with an anvil-and-mountain emblem',170,170],
    ['en_forge_ash','Ash Forge','a squat volcanic cone of pale ash-grey stone with glowing red cracks, heavy chains bolted across it, an arched forge-mouth glowing deep red behind iron doors with an anvil-and-flame emblem, ash falling from its crater',170,170],
    ['en_muspelheim','Muspelheim, the great gate','the towering flank of a huge volcano of black obsidian and basalt: a colossal gate carved in the shape of a fire-giant\'s hall, two giant stone fire-giants carved either side, rivers of lava falling beside it, four glowing keyholes on the doors (orange, teal, grey and red, one for each forge), smoke and fire above',300,300]]},
  // ── wave 51 (round 49, Kris: "some of the attack effects from familiars and monsters still show poor resolution pixel things. request painted images for these") ──
  {id:'sc_fx_bolts',wave:51,fam:'fx',kind:'flat',cols:4,rows:2,size:'1536x1024',title:'Painted attack effects 4 — small lights, sparks and streams, painted on a PURE BLACK background (laid over the game as light, so the black must stay pure black). The ones described as WHITE must be painted in white and very pale grey only, because the game colours them',items:[
    ['fx_mote','Spirit mote','a single small soft glowing mote of WHITE light with a tiny four-point twinkle, round and soft-edged',64,64],
    ['fx_ember','Ember','a single small glowing orange-red ember with a faint flicker of flame around it',64,64],
    ['fx_frost_glint','Frost glint','a single tiny ice crystal glinting pale blue-white, a small star of light on it',64,64],
    ['fx_lash','Lash','a WHITE whip-like tendril of energy, a long thin curling streak of light with a brighter core, running straight from left to right',256,48],
    ['fx_drain_stream','Life drain','a WHITE stream of swirling life-force: a ribbon of light twisting around itself with small droplets of light along it, running straight from left to right',256,48],
    ['fx_fam_beam','Spirit wave','a WHITE rolling wave of spirit light, a broad soft band with a bright core and small wisps peeling off its edges, running straight from left to right',256,64],
    ['fx_bolt_arc','Lightning arc','a WHITE jagged crackling arc of lightning with small branching forks, running from left to right',256,64],
    ['fx_ring_wave','Force ring','a WHITE thin perfect ring of rippling force, a bright glowing circle line with soft light fading inward and outward, empty in the middle, seen from above',256,256]]},
  {id:'sc_fx_solids',wave:51,fam:'fx',kind:'obj',cols:4,rows:2,refs:['sc_edge_5'],title:'Painted attack pieces — things thrown and set by monsters, seen from above at a slight angle, each one whole and centred',items:[
    ['fx_pj_rock','Thrown stone','a single rough grey thrown stone with sharp edges and a few chips, mid-air',64,64],
    ['fx_pj_bomb','Fire bomb','a round dark iron bomb with a lit, sparking fuse and glowing cracks',64,64],
    ['fx_trap_snare','Snare trap','a rope snare loop with a wooden peg lying on the ground, seen from straight above',96,96],
    ['fx_trap_mine','Rune mine','a small round brass mine half-buried in the ground with a glowing yellow eye in the middle, seen from straight above',96,96],
    ['fx_trap_rune','Frost rune','a glowing pale-blue rune circle carved into the ground, seen from straight above',96,96],
    ['fx_wall_stone','Raised stone','a squat block of rough earth and stone freshly heaved up out of the ground, with crumbling dirt around its base',96,112],
    ['fx_smoke_puff','Smoke puff','a single small round puff of grey smoke, soft and fading at its edges',64,64],
    ['fx_fam_ring','Spirit ring','a WHITE ring of spirit light with small wisps along it, empty in the middle, seen from above (it will be coloured by the game, so paint it in white and very pale grey only)',256,256]]},
  {id:'sc_rugs_1',wave:44,fam:'interior',kind:'flat',cols:4,rows:2,title:'Rugs and runners that fit the rooms — seen from straight above, flat on the floor',items:[
    ['ir_rug_wide_red','Wide red rug','a wide rectangular woven rug, deep red with a cream border and a diamond pattern in the middle, short fringes at the two short ends',112,72],
    ['ir_rug_wide_blue','Wide blue rug','a wide rectangular woven rug, deep blue with a cream border and a star pattern in the middle, short fringes at the two short ends',112,72],
    ['ir_rug_wide_green','Wide green rug','a wide rectangular woven rug, forest green with a gold border and a leaf pattern, short fringes at the two short ends',112,72],
    ['ir_rug_wide_purple','Wide purple rug','a wide rectangular woven rug, royal purple with a gold border and a rune pattern, short fringes at the two short ends',112,72],
    ['ir_runner_red','Red runner','a long narrow red carpet runner with a gold border, running from top to bottom',44,128],
    ['ir_runner_blue','Blue runner','a long narrow blue carpet runner with a silver border, running from top to bottom',44,128],
    ['ir_rug_round2','Round rug','a round braided rug in warm red, cream and brown rings',88,88],
    ['ir_rug_square','Square rug','a square woven rug, teal and cream with a compass-rose pattern',88,88]]},
  // ── round 44: three adventure-site floors painted as one picture each, to judge that way of painting (Lab → Adventure sites, section 2) ──
  {id:'sc_room_1',wave:45,fam:'rooms',kind:'room',cols:1,rows:1,title:'A floor of the Crystal Grotto, painted whole',items:[['room_crystal_grotto','Crystal Grotto floor','a cave chamber in a dungeon: rough blue-grey rock walls along the top and both sides, a floor of dark stone with pale moss, clusters of tall glowing teal and violet crystals as cover, a shallow underground pool on one side crossed by flat stepping stones, a narrow passage leading off at the top left, a wide open doorway at the bottom middle',1536,1024]]},
  {id:'sc_room_2',wave:45,fam:'rooms',kind:'room',cols:1,rows:1,title:'A floor of the Elven Library tower, painted whole',items:[['room_elven_library','Elven Library floor','a round tower floor seen from above: curved pale stone walls with tall arched windows along the top, a polished wooden floor with an inlaid leaf pattern, curved bookshelves following the wall, reading tables with open books and candles, a spiral staircase at the right, a big round rug in the middle, a doorway at the bottom middle',1536,1024]]},
  {id:'sc_room_3',wave:45,fam:'rooms',kind:'room',cols:1,rows:1,title:'A hall of the Ember Cave, painted whole',items:[['room_ember_hall','Ember Cave hall','a volcanic cave hall: black basalt walls with glowing orange cracks along the top and both sides, a floor of cooled dark crust, a river of bright flowing lava across the middle crossed by a stone bridge, obsidian spikes and a few iron braziers, smoke rising, a passage at the top right, a doorway at the bottom middle',1536,1024]]},
  // ── round 45 (Kris: skyports "the graphics are bad … proposing new painted images that we might need"; adventure sites: "hybrid" — tile sets + big
  //    painted set-pieces). Wave 47: .\tools\sprites\round45.ps1 ──
  {id:'sc_sky_bg_1',wave:47,fam:'sky',kind:'flat',cols:1,rows:2,size:'1024x1536',title:'Sky-port backdrops 1 — wide skies seen from a flying ship, painted as a picture (no ground in the lower third except a far horizon)',items:[
    ['sk_bg_1','Grasslands sky','a bright morning sky over green rolling hills far below: soft cumulus clouds, a pale sun glow top right, distant floating grass islands with roots, warm light along the horizon',1280,800],
    ['sk_bg_2','Wetlands sky','a misty teal sky over marshes and lakes far below: low drifting mist banks, pale sun through haze, a far lighthouse on the horizon, flocks of distant birds',1280,800]]},
  {id:'sc_sky_bg_2',wave:47,fam:'sky',kind:'flat',cols:1,rows:2,size:'1024x1536',refs:['sc_sky_bg_1'],title:'Sky-port backdrops 2',items:[
    ['sk_bg_3','Highlands sky','a high cold blue sky over snowy mountain peaks far below: thin streaming clouds, a crescent moon still visible, distant stone towers on the peaks, crisp air',1280,800],
    ['sk_bg_4','Ashlands sky','a dramatic sunset sky over a land of volcanoes far below: red-orange clouds lit from beneath, smoke columns rising from distant volcanoes, embers drifting, deep violet at the top',1280,800]]},
  {id:'sc_sky_1',wave:47,fam:'sky',kind:'obj',cols:4,rows:3,refs:['sc_vill_special_2'],title:'Sky-port flights — galleons, the wingman, a cloud bunker and the power-ups (each seen from slightly below and to the side, as in a flying game)',items:[
    ['sk_galleon_1','Grasslands war-galleon','a small flying war-ship with a green sail and a leafy figurehead, hull of oak, propellers on its sides, seen from the side',150,80],
    ['sk_galleon_2','Wetlands war-galleon','a flying war-ship with a teal sail and a coral-crusted hull, water dripping from its keel, seen from the side',150,80],
    ['sk_galleon_3','Highlands war-galleon','a flying war-ship with a grey iron hull, a storm-blue sail and a lightning rod mast, seen from the side',150,80],
    ['sk_galleon_4','Ashlands war-galleon','a flying war-ship of black wood and red sails with glowing ember lanterns, smoke trailing behind, seen from the side',150,80],
    ['sk_drone','Wingman','a tiny glider-drone of brass and teal cloth wings with a glowing rune eye, pointing up',40,40],
    ['sk_bunker','Cloud fortress','a small puffy white cloud piled up like a little fortress wall, soft and round',90,50],
    ['sk_pu_tri','Power-up: triple shot','a glowing round orb with three golden arrows fanning upward inside',40,40],
    ['sk_pu_rapid','Power-up: rapid fire','a glowing round orb with a yellow lightning bolt inside',40,40],
    ['sk_pu_wing','Power-up: wingmen','a glowing round orb with two small white wings inside',40,40],
    ['sk_pu_shield','Power-up: wind shield','a glowing round orb with a teal swirling wind shield inside',40,40],
    ['sk_pu_bomb','Power-up: sky bomb','a glowing round orb with a round black bomb with a lit fuse inside',40,40],
    ['sk_pu_heal','Power-up: repair','a glowing round orb with a green heart and a little wrench inside',40,40]]},
  {id:'sc_setpiece_1',wave:47,fam:'dungeon',kind:'obj',cols:4,rows:2,refs:['sc_dng_1','sc_twr_1'],title:'Adventure-site set-pieces 1 — big centrepieces that make a floor memorable (seen from three-quarters above)',items:[
    ['sp_frozen_fountain','Frozen fountain','a round stone fountain frozen solid, icicles hanging from its bowls, a glowing blue rune at its base',150,150],
    ['sp_lava_forge','Lava forge','a great dwarven forge of black stone with a river of glowing lava pouring into a trough and a huge anvil beside it',170,150],
    ['sp_mushroom_ring','Giant mushroom ring','a ring of tall glowing mushrooms of different sizes around a mossy stone',170,140],
    ['sp_bone_throne','Bone throne','a high throne built of great bones and skulls on a stepped dais, green ghost-fire in its eye sockets',150,170],
    ['sp_glacier_heart','Glacier heart','a tall jagged crystal of blue ice with a glowing white heart inside, frost spreading round its base',130,180],
    ['sp_storm_eye','Eye of the storm','a stone pedestal with a floating sphere of swirling storm clouds and crackling lightning above it',130,170],
    ['sp_abyss_well','Abyss well','a round black stone well with violet light and wisps of shadow rising out of it, chains on its rim',150,130],
    ['sp_root_heart','Root heart','a great knot of ancient roots around a softly glowing green seed the size of a person',160,150]]},
  {id:'sc_setpiece_2',wave:47,fam:'dungeon',kind:'obj',cols:4,rows:2,refs:['sc_setpiece_1'],title:'Adventure-site set-pieces 2',items:[
    ['sp_mirror_pool','Mirror pool','a still round pool in a ring of white marble, the water perfectly reflecting stars, a crescent stone arch over it',170,130],
    ['sp_star_globe','Star globe','a huge brass armillary sphere of rings with tiny glowing stars set in it, on a carved stand',150,170],
    ['sp_crystal_heart','Crystal heart','a cluster of huge violet and teal crystals around a floating faceted gem',150,170],
    ['sp_sun_altar','Sun altar','a golden altar on three steps with a great sun disc behind it catching light',160,160],
    ['sp_anvil_shrine','Anvil shrine','a giant stone anvil on a plinth with a hammer resting on it and runes glowing along its side',150,130],
    ['sp_coral_fountain','Coral fountain','a fountain grown from pink and orange coral with water spilling over shells',150,150],
    ['sp_ember_altar','Ember altar','a black obsidian altar with a bowl of living flame and ember-cracks in its stone',140,150],
    ['sp_lotus_shrine','Lotus shrine','a stone lotus flower the size of a cart, petals open, a glowing pearl in its middle',150,120]]},
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
  // round 43: animation sheets list their rows (seq); each row becomes one item per frame: <id>_1 … <id>_N
  SWAY:['leaning to the left in the wind — only the upper part bends, the base stays exactly in place','standing upright at rest','leaning to the right in the wind — only the upper part bends, the base stays exactly in place'],
  expand:function(){ ZSCN.SHEETS.forEach(function(S){ if(!S.seq||S.items)return; S.items=[]; S.seq.forEach(function(r){ var fr=r[6]||ZSCN.SWAY; fr.forEach(function(d,i){ S.items.push([r[0]+'_'+(i+1),r[1]+' — frame '+(i+1),d,r[4],r[5],{grp:r[0],anc:r[3]}]); }); }); }); },
  anchor:function(fam){ var S=ZSCN.SHEETS.filter(function(s){ return s.fam===fam; })[0]; return S&&S.id; },
  // round 43: an animation sheet — each row is one subject drawn as the frames of a loop
  animBody:function(S){ var nf=S.cols, head='Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of animation frames — '+S.title+'.\n'+
      'The first two reference images show the game\'s characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters. '+
      'The other reference images are earlier sheets of this game that show each subject below as a single still picture: paint every subject to look exactly like its picture there (same design, colours, proportions and line weight).\n';
    var lay='Layout: a grid of '+S.cols+' columns × '+S.rows+' rows, evenly spaced. Each ROW is ONE subject drawn '+nf+' times, left to right, as the frames of a short looping animation. In every frame of a row the subject has exactly the same size, design and colours and stands at the same spot in its cell'+(S.sway?' (the base of each plant at the same height and the same place in every cell)':'')+'; only the moving parts change, as described. Every frame is separate and sits fully inside its own cell. Rows, top to bottom:\n';
    var list=S.seq.map(function(r,j){ var fr=r[6]||ZSCN.SWAY; return 'Row '+(j+1)+' — '+r[1]+', '+r[2]+' ('+ZSCN.rel(r[5])+'): '+fr.map(function(d,i){ return '('+(i+1)+') '+d; }).join('; ')+'.'; }).join('\n');
    return head+lay+list+'\n'+ZSCN.VIEW.obj+'\nNo motion lines, no arrows, no numbers.'; },
  // round 44: a whole room painted as one picture (the Adventure sites pilot)
  roomBody:function(S){ var it=S.items[0]; return 'Create ONE image for a 2D top-down action RPG called Zeldara: '+S.title+'.\n'+
      'The reference images show the game\'s characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw any characters, monsters or people.\n'+
      'Subject: '+it[2]+'.\nView: classic top-down RPG three-quarter view — the camera looks down from the front at about 45°: the back wall runs along the top of the picture with its face visible, the floor fills the middle, the side walls run down the left and right edges. Scale: the hero would be about one twelfth of the picture\'s height; leave plenty of open floor to walk and fight on.\n'+
      'The painting fills the whole image edge to edge, as a finished game screen would. No text, no labels, no grid, no UI, no frame.'; },
  body:function(S){ if(S.kind==='room')return ZSCN.roomBody(S); if(S.seq)return ZSCN.animBody(S); var tex=S.kind==='tex', n=S.items.length, one=n===1;
    var head='Create ONE image for a 2D top-down action RPG called Zeldara: '+(tex?'a sheet of '+n+' square ground-texture swatches':S.kind==='icon'?'a sheet of '+n+' separate game icons':one?'a single piece of scenery':'a sheet of '+n+' separate pieces of scenery')+' — '+S.title+'.\n'+
      'The reference images show the game\'s characters; use them only for the art style (outline weight, flat shading, teal highlights, magenta rim). Do not draw the characters.'+(S.anchorRef?' The last reference image is an earlier sheet of the same family: match its line weight, colours and level of detail exactly.':'')+'\n';
    var lay=one?'Layout: the object alone, centred, filling most of the image with a clear margin all round.\n':
      'Layout: exactly '+n+(tex?' swatches':' objects')+' in a grid of '+S.cols+' columns × '+S.rows+' rows, evenly spaced, in this order (left to right, top row first)'+(n<S.cols*S.rows?'; the last '+(S.cols*S.rows-n)+' cell(s) stay empty':'')+':\n';
    var list=S.items.map(function(it,i){ return (one?'Subject: ':(i+1)+'. ')+it[1]+' — '+it[2]+(tex||S.kind==='icon'?'':S.kind==='flat'?' (about '+(Math.round(Math.max(it[3],it[4])/63*10)/10)+'× the hero\'s height across)':' ('+ZSCN.rel(it[4])+')')+'.'; }).join('\n');
    return head+lay+list+'\n'+ZSCN.VIEW[S.kind]; },
  // a size in words, relative to the hero (63 px)
  rel:function(h){ var k=h/63; return k<0.35?'a small item, under half the hero\'s height':k<0.8?'about '+(Math.round(k*10)/10)+'× the hero\'s height':k<1.25?'about as tall as the hero':'about '+(Math.round(k*10)/10)+'× the hero\'s height'; },
  requests:function(){ return ZSCN.SHEETS.map(function(S){ var a=S.refs?null:ZSCN.anchor(S.fam), anc=a&&a!==S.id&&S.kind!=='tex'?a:null, T=Object.assign({},S,{anchorRef:!!anc});
    return {id:S.id,set:'scenery',kind:S.kind,fam:S.fam,wave:S.wave,pilot:!!S.pilot,title:S.title,cols:S.cols,rows:S.rows,size:S.size||'1536x1024',bg:S.kind==='tex'||S.kind==='room'?'opaque':'transparent',
      refs:['style_hero','style_centaur'].concat(anc?[anc]:[]).concat(S.refs||[]),items:S.items.map(function(it){ var o={id:it[0],name:it[1],w:it[3],h:it[4]}; if(it[5]){ o.grp=it[5].grp; o.anc=it[5].anc; } return o; }),poses:S.items.map(function(it){ return it[0]; }),
      body:ZSCN.body(T),tail:S.kind==='tex'?'tex':S.kind==='room'?'room':'obj'}; }); },
  stats:function(){ var o={sheets:ZSCN.SHEETS.length,items:0,pilot:0,byWave:{}}; ZSCN.SHEETS.forEach(function(S){ o.items+=S.items.length; if(S.pilot)o.pilot++; var w=o.byWave[S.wave]||(o.byWave[S.wave]={name:ZSCN.WAVES[S.wave],sheets:0,items:0}); w.sheets++; w.items+=S.items.length; }); return o; }
};
ZSCN.expand();
