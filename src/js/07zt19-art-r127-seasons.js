// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt19-art-r127-seasons.js — round 127: THE FIVE SEASONS, each its own (Kris: "We need to separate out our starting spring from our
// ║ ending spring, as the end is a celebration of life, with the first spring being much more muted, and simply the first that you come
// ║ out of the deep winter. Also, the fall is the first true harvest in a generation … more autumn festival and bounty related things. And
// ║ then the winter after that fall is already starting to be a celebration, with more winter and juletide decorations. And then finally
// ║ the spring that Freya brings is a flowery, lush celebration of spring. Look into how scandinavian and nordic cultures would show and
// ║ celebrate all of these").
// ║ The year, as the game now tells it (10zs):
// ║   sp  THE THAW — the first spring after thirty-six winters: muted, grey-green, old snow in the shadows, mud, catkins and buds, the
// ║       first coltsfoot; boats tarred, bedding aired, the first furrow cut. Its own paintings: suffix _th (fam seas_th).
// ║   su  SUMMER — as painted, Midsummer at its height.
// ║   au  THE FIRST TRUE HARVEST — Haustblót and the Winter Nights: hay on drying racks, stooks in the stubble, carts and baskets heaped,
// ║       rowan garlands, ale brewed for Yule, the last sheaf kept back.
// ║   wi  THE FIRST HAPPY YULE — Jól: straw goats and straw stars, the bird-sheaf on its pole, snow lanterns, spruce at every door,
// ║       candles in the windows, the Yule log, the oath-boar.
// ║   bl  FREYA'S SPRING — the celebration of life: blossom, flower crowns, birch leaves on every door, Valborg fires, wood anemones and
// ║       lily of the valley, bees and swallows. It takes the lush spring paintings already painted (suffix _sp) — they were too joyful for
// ║       the first spring — and the village's spring repaints (round 122) are re-aimed at it.
// ║ Requests (wave 127):  .\tools\sprites\paint.ps1 -List r127_seasons
// ║   A · the thaw: the twelve world sheets and the five village building sheets repainted (first reference = the summer sheet)
// ║   B · the land in each celebration: a sheet of placeable pieces for the thaw, the harvest, Yule and Freya's spring
// ║   C · the festival dressings and set-pieces (round 118, not painted yet) re-told for this year: the thaw's are small and hopeful, the
// ║       harvest's are bounty, Yule's are joy, Freya's are flowers; the spring Blossom Feast moves to Freya's spring
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined'||typeof ZSEASART==='undefined')return;
  ZSCN.WAVES[127]='Round 127 — the five seasons: the thaw repainted, the land dressed for the harvest, Yule and Freya\'s spring';
  ZSEASART.NAME.th='the thaw (the first spring)'; ZSEASART.NAME.sp='Freya\'s spring';
  ZSEASART.LOOK.th='THE THAW — the very first spring after thirty-six years of winter, and still MUTED: deciduous trees still bare, only tight buds and soft grey-silver catkins (pussy willow, birch catkins), no leaves open and NO blossom; pines and spruce dark green; grass flattened, straw-brown and grey-green from the long winter with only thin new green shoots; a few small grey patches of old, melting snow in shadows and at the foot of trunks, rocks and walls; wet dark earth and a little mud; at most a few tiny yellow coltsfoot flowers and white snowdrops; damp, misty, pale and cool light';
  ZSEASART.LOOK.sp='FREYA\'S SPRING — a lush celebration of life: trees in full fresh leaf and heavy with white and pink blossom; bright new green everywhere; flowers in drifts (wood anemones, lily of the valley, cowslips, bluebells, violets); warm golden light';
  var NO=' No pixel art. No text, no letters, no numbers.';
  // ── A · the thaw: repaints of the world sheets (as wave S1) and of the village buildings (as round 122) ──
  var LOOKTH_V='THE THAW in the village — the first spring after the long winter, still muted and grey-green: thin grey slush and the last patches of melting snow sliding off roofs and lying in the shadows of walls; icicles dripping and shrinking; meltwater dripping from the eaves into small puddles; wet dark thatch and timber; bare vines on the walls with tiny buds; a few snowdrops by a step; bedding and furs hung over a rail to air; a pot of pine tar warming by a door; pale, cool, misty light. Hopeful but quiet: no flowers in boxes yet, no festive decorations.';
  var KEEPB='The buildings themselves — their shape, walls, roofs, doors, signs, colours and every made detail — stay exactly as in the reference; only what the season brings is added (old snow, meltwater, wet thatch, a few small spring signs).';
  ZSEASART.SRC.forEach(function(src){ var S=ZSCN.SHEETS.find(function(x){ return x.id===src; }); if(!S)return; var s='th';
    ZSCN.SHEETS.push({id:ZSEASART.id(src,s),wave:127,fam:'seas_'+s,kind:S.kind,cols:S.cols,rows:S.rows,size:S.size,noStyle:true,refs:[src],season:s,src:src,
      title:S.title+' — in '+ZSEASART.NAME[s],items:S.items.map(function(it){ return [it[0]+'_'+s,it[1]+' ('+ZSEASART.NAME[s]+')',it[2],it[3],it[4]]; })}); });
  ['sc_vill_core_1','sc_vill_core_2','sc_vill_houses','sc_vill_special_1','sc_vill_special_2'].forEach(function(src){ var S=ZSCN.SHEETS.find(function(x){ return x.id===src; }); if(!S)return; var s='th';
    ZSCN.SHEETS.push({id:ZSEASART.id(src,s),wave:127,fam:'seas_'+s,kind:S.kind,cols:S.cols,rows:S.rows,size:S.size,noStyle:true,refs:[src],season:s,src:src,look:LOOKTH_V,keep:KEEPB,
      title:S.title+' — in '+ZSEASART.NAME[s],items:S.items.map(function(it){ return [it[0]+'_'+s,it[1]+' ('+ZSEASART.NAME[s]+')',it[2],it[3],it[4]]; })}); });
  // round 122's village spring repaints (ids *_sp, not painted yet) now paint Freya's spring: lusher, more flowers, a celebration
  var LOOKBL_V='FREYA\'S SPRING in the village — a lush celebration of life after the gods come home: window boxes, planters and every ledge overflowing with flowers (white wood anemones, lily of the valley, yellow cowslips, bluebells, violets, pink and white blossom); fresh light-green birch branches in full young leaf tied beside the doors (the old Nordic way of greeting spring); garlands of flowers and young leaves along a few eaves; blossoming branches of apple and cherry against the walls; ivy and new green climbing the walls; a swallow\'s nest under one eave; the thatch fresh and green-edged; warm golden morning light. Joyful and abundant, but the buildings stay readable.';
  ZSCN.SHEETS.forEach(function(S){ if(/^sc_seas_sp_vill_/.test(S.id)){ S.look=LOOKBL_V; S.title=S.title.replace(/ — in .*$/,' — in Freya\'s spring'); S.wave=127; } });
  // ── B · the land in each celebration: pieces the world places around farms, fields, waystones and the Green ──
  var G=' Each piece alone and centred on a transparent background, in the game\'s classic top-down three-quarter view, standing on the ground with a soft shadow, painted in the same hand-painted Norse storybook style as the reference.'+NO;
  var F=' Each piece alone and centred on a transparent background, seen from directly above as a flat patch lying on the ground with soft, irregular edges that fade out (no hard border, no shadow), so it blends onto painted grass.'+NO;
  ZSCN.SHEETS.push(
   {id:'sc_land_thaw',wave:127,fam:'seas_th',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_edge_1'],title:'The thaw on the land — the first spring after the long winter, muted and quiet.'+F,items:[
     ['lt_snow_a','Old snow patch','a small patch of grey, granular, half-melted old snow with wet dark grass showing through at the edges',96,64],['lt_snow_b','Snow in a hollow','a long thin strip of melting snow lying in a shaded hollow, grey-white and wet',120,48],
     ['lt_puddle','Meltwater puddle','a shallow meltwater puddle on wet earth, reflecting a pale sky, a few dead leaves in it',80,52],['lt_mud','Mud ruts','two muddy wheel ruts in wet earth with a little standing water',120,52],
     ['lt_coltsfoot','Coltsfoot','a small clump of coltsfoot — yellow dandelion-like flowers on scaly stems, no leaves yet — on bare earth',40,32],['lt_snowdrops','Snowdrops','a small clump of white snowdrops nodding on thin green stems',36,30],
     ['lt_straw','Winter-flattened grass','a patch of last year\'s flattened, straw-brown grass with thin new green shoots pushing through',96,64],['lt_twigs','Fallen winter twigs','a scatter of small fallen twigs and a broken branch left by the winter storms',80,48]]},
   {id:'sc_land_thaw_set',wave:127,fam:'seas_th',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vprops_1'],title:'The thaw — the village wakes: small, practical, hopeful things.'+G,items:[
     ['lt_tar_boat','Tarring the boat','a small wooden rowing boat turned over on trestles, half its hull glossy with fresh dark pine tar, a tar pot and brush beside it',110,64],['lt_airing','Airing the bedding','a wooden rail hung with furs, a quilt and woollen blankets airing in the cool air',90,64],
     ['lt_plough','The first furrow','a simple wooden ard plough resting at the end of one fresh dark furrow in a muddy field edge',100,56],['lt_seed','Seed sacks','three rough sacks of seed grain and a wooden seed-scoop on a low bench',60,44],
     ['lt_catkins','Pussy-willow bush','a willow bush with bare red-brown twigs covered in soft silver-grey catkins',60,70],['lt_birdbox','A birdhouse put up','a small wooden birdhouse on a post, new, with a starling looking out of the hole',30,64]]},
   {id:'sc_land_harvest',wave:127,fam:'seas_au',kind:'obj',cols:4,rows:3,size:'1536x1024',refs:['sc_vprops_3'],title:'The first true harvest in a generation — the fields and farms heaped with bounty.'+G,items:[
     ['lh_hesje','Hay-drying rack','a long Norwegian hesje: a fence of poles and wires hung thick with drying golden hay, in a field',140,70],['lh_hesje_s','Short hay rack','a short hay-drying rack hung with hay, two poles long',80,64],
     ['lh_stook','Grain stooks','three stooks of golden sheaves leaning together in pale stubble',70,60],['lh_rauk','Sheaf on a pole','a tall pole stacked high with drying sheaves of barley, as on a Nordic farm',40,80],
     ['lh_wagon','Harvest wagon','a wooden ox-cart heaped with golden sheaves and two full sacks, a pitchfork on top',120,80],['lh_baskets','Baskets of bounty','wicker baskets heaped with red apples, purple turnips, cabbages and onions',90,52],
     ['lh_barrels','Ale for Yule','three ale barrels and a brewing tub with a wooden paddle, steam rising from the tub',90,60],['lh_rack','Smoking rack','a timber rack hung with smoked hams, sausages and split fish drying in the cool air',90,80],
     ['lh_flail','Threshing floor','a swept patch of barn floor with a wooden flail, a winnowing basket and a heap of golden grain',90,56],['lh_rowan','Rowan garland','a fence rail hung with a garland of bright red rowan berries and yellow leaves (a Nordic charm for luck)',96,40],
     ['lh_berries','Berries and mushrooms','a birch-bark basket of red lingonberries and a basket of golden chanterelle mushrooms side by side',60,36],['lh_lastsheaf','The last sheaf','the last sheaf of the harvest bound with a red ribbon and set upright by a barn door, kept back for Yule',34,56]]},
   {id:'sc_land_yule',wave:127,fam:'seas_wi',kind:'obj',cols:4,rows:3,size:'1536x1024',refs:['sc_vprops_1'],title:'The first happy Yule — joy back in the land after the harvest.'+G,items:[
     ['ly_neg','Sheaf for the birds','a sheaf of oats bound to the top of a tall pole for the winter birds (the Nordic julenek), small birds perched on it, light frost',40,96],['ly_snowlantern','Snow lantern','a cone of stacked snowballs with a candle glowing warm inside it (a Swedish snölykta)',40,48],
     ['ly_icelantern','Ice lantern','a lantern of clear ice with a candle inside, glowing on a frosted stump',30,40],['ly_spruce','Spruce at the door','fresh spruce twigs laid as a path and a small spruce bough tied by a door step, as at Yule',70,40],
     ['ly_straw_star','Straw star','a hanging straw star ornament bound with red thread, glinting in candle light',30,36],['ly_goat','Little straw goat','a small straw Yule goat bound with red cord, standing in light snow',36,36],
     ['ly_torch','Yule torch','a tall torch on a post wound with evergreen and a red ribbon, burning bright',20,64],['ly_sled','Sled of gifts','a small wooden sled loaded with firewood and cloth-wrapped gifts tied with red cord',70,44],
     ['ly_log','Yule log pile','a great oak Yule log and a pile of split birch wood stacked by a wall, a sprig of holly on top',90,44],['ly_bonfire','Solstice fire','a ring of stones with a tall bright bonfire for the longest night, sparks rising',70,80],
     ['ly_tree','Fir of lights','a young fir tree hung with straw stars, red apples and small glowing lanterns, lightly frosted',70,110],['ly_himmeli','Straw crown','a hanging geometric straw ornament (a Nordic himmeli) turning slowly, catching the light',36,40]]},
   {id:'sc_land_bloom',wave:127,fam:'seas_sp',kind:'obj',cols:4,rows:3,size:'1536x1024',refs:['sc_plants_1'],title:'Freya\'s spring — the land in flower, a celebration of life.'+G,items:[
     ['lb_anemones','Wood anemones','a carpet of white wood anemones with green leaves, as under Nordic birches in spring',100,56],['lb_lily','Lily of the valley','a clump of lily of the valley, small white bells on arching stems',44,36],
     ['lb_cowslip','Cowslips','a clump of yellow cowslips and blue hepatica flowers',44,36],['lb_meadow','Flower meadow','a patch of meadow thick with buttercups, clover, cornflowers and daisies',110,64],
     ['lb_petals','Fallen blossom','a soft drift of fallen pink and white blossom petals on the grass',90,56],['lb_birch','Birch in new leaf','a young birch tree with white bark in bright fresh new leaf, catkins swinging',70,120],
     ['lb_hawthorn','Hawthorn in bloom','a hawthorn bush heavy with white blossom',70,64],['lb_arch','Flower arch','a wooden arch over a path wound with flowers and young birch leaves',110,110],
     ['lb_stone','Garlanded runestone','a small runestone with a garland of spring flowers hung over it, its rune glowing soft teal',44,70],['lb_hive','Bees at the hive','a straw beehive (skep) on a low stand with bees around it, flowers at its foot',40,48],
     ['lb_fire','Valborg fire','a tall stack of brushwood with a bright spring bonfire, flowers laid in a ring around its stones',80,100],['lb_pole','Flower pole','a tall pole wound in birch leaves and flower garlands with two wreaths hanging from a crossbar',70,150]]});
  // ── C · the festival dressings and set-pieces of round 118 (not painted yet), told again for this year ──
  var S=function(id){ return ZSCN.SHEETS.find(function(x){ return x.id===id; }); }, set=function(id,title,items){ var X=S(id); if(!X)return; X.wave=127; X.title=title+X.title.slice(X.title.indexOf('.')+1); if(items)X.items=items; };
  // the thaw keeps no feast — only small signs of hope at the doors
  set('sc_fest_dress_sp','Thaw-time touches — small signs of hope at the doors after the long winter (not a feast).',[
     ['fd_sp_door','Birch twigs at the door','a bundle of bare birch twigs with tiny buds tied beside a door, a single white feather tied to it',30,48],['fd_sp_ridge','Starling on the ridge','two starlings perched on a roof ridge, the first birds back',60,24],
     ['fd_sp_window','First snowdrops','a small clay pot of white snowdrops on a window ledge',24,22],['fd_sp_eave','Drying herbs','a small bundle of last year\'s dried herbs hanging from the eaves',22,32],
     ['fd_sp_wreath','Willow wreath','a plain round wreath of willow twigs with silver catkins',36,36],['fd_sp_step','Muddy boots','a pair of muddy boots and a wooden spade by a door step',40,26],
     ['fd_sp_banner','Pale banner','a small faded cloth banner, pale green, freshly hung after the winter (no letters)',28,44],['fd_sp_lantern','Thaw lantern','a small iron lantern with a low warm flame, frost melting on its glass',22,30]]);
  set('sc_fest_set_sp','The thaw on the Green — the village clears the winter away.',[
     ['fs_sp_pole','Clearing the Green','a heap of storm-broken branches and old straw raked together on the Green, a rake leaning on it',90,60],['fs_sp_arch','Seed market','a plain market trestle with seed sacks, small sprouting pots and a scale',110,60],
     ['fs_sp_tafl','Tafl table','a small wooden table with a carved hnefatafl board and pieces, two stools',80,60],['fs_sp_cart','Firewood cart','a handcart with the last of the winter firewood',80,60],
     ['fs_sp_crowns','Fishing gear','a rack of nets being mended and two fishing spears, ready for the first fishing',60,60],['fs_sp_post','Furrow rune-post','a small carved wooden post marking a fresh furrow, a sprig of willow catkins tied to it',24,44]]);
  set('sc_fest_dress_au','Festival dressings — Haustblót, the first true harvest in a generation (autumn): bounty at every door.',[
     ['fd_au_door','Harvest sheaf','a tied sheaf of golden barley with a red ribbon, standing beside a door',30,48],['fd_au_ridge','Ridge sheaves','a row of small sheaves and a straw harvest crown tied along a roof ridge',96,28],
     ['fd_au_window','Window candle','a thick beeswax candle burning in a small clay holder on a window ledge, for the Winter Nights',20,26],['fd_au_eave','Onion and apple strings','strings of onions and dried apple rings hanging from the eaves',24,40],
     ['fd_au_wreath','Rowan and rye wreath','a round wreath of rye straw, red rowan berries and oak leaves',36,36],['fd_au_step','Bounty by the door','a wicker basket of red apples, turnips and a cabbage beside a door',40,28],
     ['fd_au_banner','Harvest banner','a small hanging cloth banner, deep rust-red, a barley sheaf embroidered on it (no letters)',28,44],['fd_au_lantern','Harvest lantern','a small iron lantern with a warm flame, a sprig of barley and rowan tied to it',22,30]]);
  set('sc_fest_set_au','Haustblót on the Green — the harvest feast after a generation of failed crops.',[
     ['fs_au_figure','Last-sheaf figure','a tall straw figure made from the last sheaf of the harvest, arms out, a crown of rowan berries and a red ribbon',60,120],['fs_au_barrels','Ale barrels','three ale barrels, one tapped, with horn cups on top',90,60],
     ['fs_au_stage','Long harvest table','a long trestle table heaped with bread, cheeses, roast meat, apples and berry bowls',140,64],['fs_au_baskets','Harvest heap','a great heap of grain sacks with turnips, cabbages, apples and barley sheaves around it',100,60],
     ['fs_au_candles','Winter Nights candles','a ring of small burning candles on the ground, as laid round a standing stone (no stone)',90,40],['fs_au_forge','Hay-sheaf crown','a great crown woven of straw and red ribbons hung from a tall frame over the Green',80,110]]);
  set('sc_fest_dress_wi','Festival dressings — the first happy Yule (Jól): joy at every door.',[
     ['fd_wi_door','Yule bough','an arch of fresh spruce and juniper with red berries and straw stars over a door',64,40],['fd_wi_ridge','Ridge lights','a short line of small glowing lanterns and fir boughs along a roof ridge, lightly frosted',96,28],
     ['fd_wi_window','Yule candles','three candles in a carved wooden holder on a window ledge, warmly lit, a straw heart beside them',36,24],['fd_wi_eave','Straw stars','three straw star ornaments bound with red thread hanging from the eaves',40,32],
     ['fd_wi_wreath','Yule wreath','a round wreath of spruce and lingonberry sprigs with a red ribbon',36,36],['fd_wi_step','Straw Yule goat','a small straw goat bound with red cord, standing by a door step',34,34],
     ['fd_wi_banner','Sun-wheel banner','a small hanging cloth banner, deep green, a golden eight-spoked sun-wheel embroidered on it (no letters)',28,44],['fd_wi_lantern','Snow lantern','a small cone of snowballs with a candle glowing inside, by a door',26,30]]);
  set('sc_fest_set_wi','Jól on the Green — the first Yule in a generation with full stores and full hearts.',null);
  // Freya's spring takes the Blossom Feast: flowers, birch, Valborg fire and the cradles
  set('sc_fest_dress_bl','Festival dressings — Freya\'s Spring, the celebration of life, and the lights of every festival night.',[
     ['fd_bl_door','Blossom and birch garland','an arch of white and pink blossom woven with fresh young birch leaves over a door, a thread of soft teal light through it',64,40],['fd_bl_ridge','Flower streamers','a short line of fluttering ribbons — white, green, yellow — and small flower garlands along a roof ridge',96,28],
     ['fd_bl_window','Window flowers','a wooden window box overflowing with lily of the valley, cowslips, bluebells and violets',44,22],['fd_bl_wreath','Flower crown wreath','a round wreath of spring flowers — anemones, cowslips, bluebells — with a soft teal glow',36,36],
     ['fd_night_string','Lantern string','a long gently curving string of five small warm-glowing lanterns, to hang across a street',140,30],['fd_night_candle','Window candle glow','a single candle flame in a window with a warm round glow around it',22,26],
     ['fd_night_torch','Festival torch','a tall iron torch on a pole with a bright flame, wound with flowers, for the edges of the Green',18,60],['fd_night_brazier','Festival brazier','a round iron brazier on three legs, glowing with fire, a flower garland round its rim',36,34]]);
  set('sc_fest_set_bl','Freya\'s Spring on the Green — the Blossom Feast.',[
     ['fs_bl_cradles','Carved cradles','two small carved wooden cradles with blossom laid in them, set out on the grass',90,60],['fs_bl_banner','Falcon banners','two tall poles with white banners showing a falcon (no letters)',80,140],
     ['fs_bl_garland','Light garland','a long blossom garland threaded with glowing teal light, hung between two posts',150,70],['fs_bl_pole','Flower pole','a tall birch pole wound with green and white ribbons and flower garlands, a great wreath of blossom at its top',60,150],
     ['fs_bl_crowns','Crown stand','a wooden stand hung with flower crowns of anemones, cowslips and birch leaves',50,60],['fs_bl_cart','Flower cart','a little wooden handcart full of spring flowers and flower crowns',80,60]]);
  var X=S('sc_fest_set_bl'); if(X){ X.rows=2; }
})();
