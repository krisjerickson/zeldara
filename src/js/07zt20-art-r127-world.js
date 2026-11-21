// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt20-art-r127-world.js — round 127: THE WORLD, REVAMPED — the paintings to see before choosing (Kris, on his picks: "give me sheets
// ║ to order so we can get visuals of these before we choose"). Nothing here goes into the game until Kris picks from the Lab
// ║ (› The world, revamped 2); each sheet is the picture an option needs:
// ║   landmarks (✓ "getting new painted images to better represent the key elements of the world") · vistas (✓ "try out with new images
// ║   first") · adventure sites worthy of their stories (✓ "try this out, but don't put in yet") · flourish frames for cinematic moments
// ║   (✓ "artistic flourish frames … like Zelda Ocarina of Time (the new one)") · the aurora, re-proposed · water pieces · ground pieces
// ║   (rebalanced: a few, not littered) · the air of each realm · light pools for the night.
// ║ .\tools\sprites\paint.ps1 -List r127_world
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[128]='Round 127 — the world revamped: landmarks, vistas, grand site exteriors, flourish frames, aurora, water, ground, air and light';
  var NO=' No pixel art. No text, no letters, no numbers.', ST=' Painted in the game\'s hand-painted Norse storybook style — deep colour, glowing rune-blue magic, warm lantern light, soft painterly shading.';
  var G=' Each piece alone and centred on a transparent background, in the game\'s classic top-down three-quarter view, standing on the ground with a soft shadow.'+ST+NO;
  var FL=' Each piece alone and centred on a transparent background, seen from directly above as a flat patch on the ground with soft irregular edges that fade out (no hard border).'+ST+NO;
  var FR=function(id,name,look){ return {id:id,wave:128,fam:'frames',kind:'flat',cols:1,rows:1,size:'1536x1024',refs:['sc_pn_saga_gate'],title:'A flourish frame for cinematic moments in play — '+name+'.',items:[[id.replace(/^sc_/,''),name,
    'an ornamental FRAME around the edge of a 16:9 picture, the whole middle (about 80 % of the width and height) left completely EMPTY and transparent for the game to show through; '+look+'. Symmetrical left to right, fine detail at the corners, thin along the sides so it never hides play.'+ST+NO,1536,864]]}; };
  ZSCN.SHEETS.push(
   FR('sc_wl_frame_tapestry','the tapestry','the edge of a woven Norse wall-hanging: a deep red and indigo woven border with knotwork bands, small woven scenes of longships and the World Tree in the four corners, a fringe of tassels along the bottom, and gold thread catching the light'),
   FR('sc_wl_frame_stage','the puppet stage','a carved wooden stage arch like a travelling puppet theatre: carved and painted timber posts with dragon-head finials at the top corners, a heavy blue curtain drawn back and tied at each side, a row of small lamps along the bottom edge'),
   FR('sc_wl_frame_saga','the illuminated saga','the corners of an illuminated saga manuscript: gilded knotwork corner-pieces with tiny painted beasts and vines, a thin gold rule linking them, flecks of rune-blue ink, on no background'),
   FR('sc_wl_frame_runestone','the runestone','four tall carved runestones standing at the edges, their serpent-knot carvings glowing soft rune-blue, joined at the top by a thin arch of carved stone and at the bottom by moss, ferns and small white flowers'),
   {id:'sc_wl_landmarks_1',wave:128,fam:'landmarks',kind:'obj',cols:2,rows:1,size:'1536x1024',refs:['sc_bridges'],title:'Landmarks from the cut-scenes, as the world shows them (1).'+G,items:[
     ['lm_bram_bridge','Bram\'s bridge over the Silverrun','the great timber-and-stone bridge Bram builds across the wide Silverrun: stone piers with carved prows, a timber deck, rune lanterns on posts, banners at each end, a little mist on the water below; seen from above at an angle, very large',720,520],
     ['lm_mira_lift','Mira\'s lift up the Scarp','a tall cliff lift on the Great Scarp: a timber cage on chains running up a cliff face, a great wooden wheel and counterweight at the top, lanterns on brackets all the way up; very large',520,720]]},
   {id:'sc_wl_landmarks_2',wave:128,fam:'landmarks',kind:'obj',cols:2,rows:1,size:'1536x1024',refs:['sc_bridges'],title:'Landmarks from the cut-scenes, as the world shows them (2).'+G,items:[
     ['lm_dunn_bridge','Dunn\'s iron bridge over the chasm','an iron chain bridge forged across a glowing chasm: black iron plates, great chains to stone anchors, ember-light from far below, rune-bound rivets; very large',720,520],
     ['lm_vela_pass','Vela\'s pass through the Ember Wall','a gate carved into a towering wall of black rock with lava light behind it: a stone arch with carved guardians, a road winding up to it, smoke rising; very large',600,620]]},
   {id:'sc_wl_landmarks_3',wave:128,fam:'landmarks',kind:'obj',cols:2,rows:1,size:'1536x1024',refs:['sc_vprops_1'],title:'Landmarks from the cut-scenes, as the world shows them (3).'+G,items:[
     ['lm_world_tree','The World Tree stone','the oldest runestone on the Runestone Green, huge, with the World Tree carved into it and glowing rune-blue, ferns and white flowers at its foot; very large',480,640],
     ['lm_great_scar','The edge of the Great Scar','the lip of a vast canyon cut through the land: a broken edge of layered rock dropping away into blue haze, small pines clinging to it, a rope fence and a cairn at a lookout; very large',720,480]]});
  var V=function(id,name,where,look){ return {id:id,wave:128,fam:'vistas',kind:'room',cols:1,rows:1,size:'1536x1024',refs:['sc_pn_saga_gate'],title:'A vista — '+name+' (the camera eases into it as you stand at '+where+').',items:[[id.replace(/^sc_/,''),name,
    'a wide cinematic landscape painting, seen from where the player stands at '+where+': '+look+'. The foreground matches the game\'s top-down ground there so the camera can ease from play into the painting.'+ST+NO,1536,1024]]}; };
  ZSCN.SHEETS.push(
   V('sc_wl_vista_silverrun','the Silverrun valley','the Waystone Road\'s high bend in the Grasslands','the wide Silverrun river winding through green meadows and birch woods toward far blue mountains, the village\'s smoke and the Runestone Green small in the distance, the soul-lines glowing faintly across the fields'),
   V('sc_wl_vista_scar','the Great Scar','the top of the Dwarven Stairs in the Highlands','the vast canyon of the Great Scar opening below, layered red and grey rock, waterfalls falling into haze, the Scarp lift tiny on the far cliff'),
   V('sc_wl_vista_ember','the Ember Wall','the edge of the Emberflower Fields in the Ashlands','a wall of black volcanic mountains glowing at its seams, smoke rising into an orange sky, fields of red ember-flowers in front'),
   V('sc_wl_vista_lilies','the Lantern Lilies at night','the Lantern Lilies waystone in the Wetlands','a dark lake at night covered in glowing lantern lilies, mist, mangroves, the aurora above reflected in the water'));
  ZSCN.SHEETS.push(
   {id:'sc_wl_sites_1',wave:128,fam:'sites',kind:'obj',cols:2,rows:2,size:'1536x1024',refs:['sc_vill_special_1'],title:'Adventure sites worthy of their stories — the grand exteriors of the boss sites (1).'+G,items:[
     ['gs_silverwood','Silverwood Palace','a tall elegant elven palace-tower of white stone and silver leaf, birch trees growing through its terraces, a rune-blue light at its crown',360,460],
     ['gs_sunken','The Sunken Courtyard','a ruined walled courtyard half sunk into the earth, broken arches, a great stair going down into darkness, ivy and a glowing seal',420,340],
     ['gs_frost','The Frost Cathedral','a cathedral of ice and pale stone with frozen spires and stained-ice windows glowing blue',360,460],
     ['gs_lakering','The Underground Lake Ring','a ring of standing stones around a cave mouth over a dark lake, glowing water spilling from it',420,340]]},
   {id:'sc_wl_sites_2',wave:128,fam:'sites',kind:'obj',cols:2,rows:2,size:'1536x1024',refs:['sc_vill_special_1'],title:'Adventure sites worthy of their stories — the grand exteriors of the boss sites (2).'+G,items:[
     ['gs_observatory','The Starlit Observatory','a stone observatory tower on a crag with a great brass telescope and a dome open to the stars',360,460],
     ['gs_bonepit','The Bone Pit','a huge pit ringed with giant ribs and tusks, a bone stair spiralling down, green soul-fire glowing',420,340],
     ['gs_dawn','The Dawn Sanctum','a temple of gold and black stone with a great sun-disc over its doors, steps rising between braziers',360,460],
     ['gs_lava','The Lava Archipelago','a ring of black rock islands joined by chains over a lava lake, a fortress gate on the largest',420,340]]},
   {id:'sc_wl_aurora',wave:128,fam:'aurora',kind:'flat',cols:2,rows:2,size:'1536x1024',refs:['sc_sky_bg_1'],title:'The aurora, re-proposed — light pieces.'+FL,items:[
     ['au_reflect','Aurora in the water','long soft ribbons of green and violet aurora light as reflected on dark water, wavering, transparent',360,240],
     ['au_ribbon','A ribbon over the land','one long faint ribbon of green aurora light lying across the ground at night, very transparent, soft-edged',480,160],
     ['au_crown','A crown of light','a ring of rising aurora curtains in green and violet, as if over a stone circle, transparent',400,300],
     ['au_band','The aurora in the sky band','a wide band of night sky with aurora curtains over distant mountains, for the top edge of a vista',720,200]]},
   {id:'sc_wl_water',wave:128,fam:'water',kind:'obj',cols:4,rows:3,size:'1536x1024',refs:['sc_edge_1'],title:'Deep, living water — pieces for rivers and lakes.'+G,items:[
     ['wp_lily_flower','Lilies in flower','a cluster of lily pads with two white water-lilies in bloom',80,52],['wp_lily_small','Small lily pads','three small lily pads',48,32],
     ['wp_reeds_shore','Shore reeds','a clump of tall reeds standing in the shallows, a little foam at their feet',60,80],['wp_rock_foam','Rock in the current','a mossy rock in the water with a ring of white foam around it',60,44],
     ['wp_stepping','Stepping stones','three flat stepping stones across shallow water',96,40],['wp_glint','Water glint','a small sparkle of sunlight on water',24,16],
     ['wp_leaves','Floating leaves','a few leaves drifting on the water',40,24],['wp_ripple','Fish rings','widening rings where a fish rose',48,28],
     ['wp_waterfall','Small falls','a small step of falling water between two stones, white foam below',80,64],['wp_driftwood','Driftwood','a silvered branch caught at the shore with reeds',90,40],
     ['wp_heron','Grey heron','a grey heron standing in the shallows',36,60],['wp_ducks','Ducks','two wild ducks swimming',48,28]]},
   {id:'sc_wl_ground',wave:128,fam:'ground',kind:'obj',cols:4,rows:3,size:'1536x1024',refs:['sc_edge_1'],title:'Richer ground, rebalanced — a few small things, never a litter.'+FL,items:[
     ['gp_moss_a','Moss cushion','a soft cushion of bright green moss',48,32],['gp_moss_b','Moss on a stone','a flat stone half covered in moss',44,30],['gp_moss_c','Moss streak','a long thin streak of moss',72,24],
     ['gp_clover_a','Clover patch','a patch of clover with two white flowers',44,32],['gp_clover_b','Clover and daisies','clover with small daisies',52,34],['gp_twigs','Fallen twigs','a few fallen twigs and a pine cone',44,24],
     ['gp_pebbles','Pebbles','a small scatter of rounded pebbles',40,20],['gp_mushrooms','Tiny mushrooms','three tiny brown mushrooms',28,22],['gp_fern','Small fern','a small fern sprouting from the grass',40,36],
     ['gp_flowers_w','White flowers','a few small white flowers',36,24],['gp_flowers_b','Blue flowers','a few small blue flowers',36,24],['gp_leaves','Fallen leaves','a few fallen leaves',40,24]]},
   {id:'sc_wl_air',wave:128,fam:'air',kind:'flat',cols:4,rows:3,size:'1536x1024',refs:['sc_seas_air'],title:'The air of each realm — small drifting things (they come and go in gusts).'+FL,items:[
     ['ai_pollen','Pollen','a soft golden pollen mote',10,10],['ai_firefly','Firefly','a firefly glowing yellow-green',12,12],['ai_seed','Dandelion seed','a dandelion seed drifting',16,16],
     ['ai_mist','Mist wisp','a small curl of white mist',40,20],['ai_wisp','Will-o\'-wisp','a pale blue will-o\'-wisp',16,16],['ai_spore','Glowing spore','a glowing teal spore',10,10],
     ['ai_snow','Snow glitter','a tiny glint of snow',8,8],['ai_frost','Frost mote','a frost mote',10,10],['ai_ember','Ember','a glowing ember',10,10],
     ['ai_ash','Ash flake','a grey flake of ash',12,12],['ai_spark','Spark','a bright spark',8,8],['ai_leaf','Leaf','a single green leaf',14,12]]},
   {id:'sc_wl_lights',wave:128,fam:'light',kind:'flat',cols:4,rows:2,size:'1536x1024',refs:['sc_fx_ground'],title:'Night light — pools of light the lanterns, windows and runes cast on the ground.'+FL,items:[
     ['lp_lantern','Lantern pool','a warm round pool of orange lantern light on the ground, soft and fading',120,120],['lp_window','Window spill','a long soft spill of warm light from a window across the ground',140,70],
     ['lp_rune','Rune glow','a soft rune-blue glow pool',120,120],['lp_fire','Campfire light','a flickering warm firelight pool with sparks',140,140],
     ['lp_torch','Torch light','a small warm torch-light pool',80,80],['lp_moon','Moonlight patch','a cool silver patch of moonlight',140,100],
     ['lp_hearth','Hearth glow','a red-orange glow from an open door',100,80],['lp_spirit','Spirit light','a pale teal light pool from a freed spirit',120,120]]});
})();
