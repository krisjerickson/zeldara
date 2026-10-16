// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt2-saga-art.js — round 59: option sheets for the Lab (scenery waves 61 and 62; tools/sprites/round59.ps1).
// ║ Wave 61, ASGARD AND THE BIFRÖST (Kris, Oct 15 card: "Lab options first"): the white-and-gold walls, towers and gate of Asgard on Mirror
// ║   Lake, its citadel, its ground, the Bifröst, the notch at the end of the village pier, the rune circle at Asgard's heart where the ending
// ║   happens (Kris: "walk to the center of liberated Asgard and a rune circle similar to the village center and use the lodestar to cast
// ║   godsbane into the sky and remake the bifrost into heaven"), and the three story panels of this round (Muspelheim sinking, Asgard opening
// ║   in the sky, Asgard settling on the lake) — two options each.
// ║ (A "spirits at peace" sheet was drafted and dropped the same hour: Kris — the forty freed spirits are right, "a bit happy, but not yet
// ║   celebrating"; what was too celebratory were the group scenes on the Green, which now shows only the forty — 10y ZGREEN.PICS.)
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[61]='Asgard and the Bifröst — options';
  var ASG='the city of the gods in Norse myth, all white stone, cream marble and gold; noble, bright and clean, slender columns and tall spires; original designs, no text';
  var _PEACE_UNUSED='spirits are translucent people of soft pale-blue runic light (#6fe3f5), FREED from their chains but NOT yet gone home: no chains, no pain, no grimacing — and no celebrating either: calm, content, quietly at peace, a gentle neutral face (at most a faint soft smile); their light is soft and steady';
  var panel=function(id,wave,name,desc){ return {id:'sc_'+id,wave:wave,fam:'panels',kind:'room',panel:true,cols:1,rows:1,size:'1536x1024',title:name,items:[[id,name,desc,1536,1024]]}; };
  ZSCN.SHEETS=ZSCN.SHEETS.concat([
    {id:'sc_asg_wall_opts',wave:61,fam:'asg_wall',kind:'obj',cols:3,rows:3,size:'1536x1024',title:'Asgard on the lake — the walls, towers and great gate, three styles (one style per ROW, top to bottom: A, B, C); '+ASG,items:[
      ['asgA_wall','A · wall','a straight section of a tall city wall of smooth WHITE stone blocks with gold-capped battlements, seen from above-front like the game scenery',170,120],
      ['asgA_tower','A · tower','a round tower of white stone with a tall pointed GOLD spire roof and a gold finial',96,210],
      ['asgA_gate','A · great gate','a great arched gate of white stone with two tall golden doors, closed, gold runes over the arch',190,170],
      ['asgB_wall','B · wall','a straight section of a city wall of CREAM marble with a frieze of gilded knotwork along the top, rounded merlons',170,120],
      ['asgB_tower','B · tower','a slender cream-marble tower crowned by a GILDED onion-shaped dome on a ring of little columns',96,210],
      ['asgB_gate','B · great gate','a gatehouse of cream marble between two gilded domes, a portcullis of gold lattice, closed',190,170],
      ['asgC_wall','C · wall','a straight section of a wall of PALE GRANITE blocks banded with three glowing gold rune-lines, plain square battlements',170,120],
      ['asgC_tower','C · tower','a square pale-granite tower with gold rune-bands and a steep gold-tiled roof, a gold raven weather-vane',96,210],
      ['asgC_gate','C · great gate','a tall square gate of pale granite, its doors one great gold shield-boss each, gold rune-bands, closed',190,170]]},
    {id:'sc_asg_keep_opts',wave:61,fam:'asg_keep',kind:'obj',cols:3,rows:1,size:'1536x1024',title:'Asgard — the citadel at the heart of the island (it rises in the middle, the four floors of Asgard are inside it); '+ASG,items:[
      ['asg_keep_a','Citadel of spires','a tall palace of white stone, a cluster of slender towers with gold spires round one great central spire, a gold door at its foot',300,360],
      ['asg_keep_b','Hall of shields','a great long hall of cream marble whose roof is covered in golden shields like Valhöll, tall columns along its front, a gold door',340,300],
      ['asg_keep_c','Tree-crowned keep','a round keep of pale stone ringed with columns, crowned by a white-and-gold tree of light whose branches spread over it, a gold door',300,360]]},
    {id:'sc_asg_ground_opts',wave:61,fam:'asg_ground',kind:'tex',cols:3,rows:1,size:'1536x1024',title:'Asgard — the ground inside the walls, three tileable ground textures seen straight from above',items:[
      ['tx_asg_a','White marble flags','large white marble flagstones with thin gold seams between them',256,256],
      ['tx_asg_b','Cream rune-paving','cream stone paving with a faint inlaid pattern of pale gold runes',256,256],
      ['tx_asg_c','Cloud-moss paving','pale grey paving stones with soft white cloud-moss and tiny gold flowers in the joints',256,256]]},
    {id:'sc_bifrost_opts',wave:61,fam:'bifrost',kind:'obj',cols:3,rows:1,size:'1536x1024',title:'The Bifröst — a short straight section of the bridge from the village pier to Asgard, seen from above-front like the game scenery (it is tiled end to end), running left to right; original designs, no text',items:[
      ['bif_a','Rainbow light','a bridge of solid rainbow light: bands of red, orange, gold, green, blue and violet running along its length, translucent soft edges, a shimmer',200,96],
      ['bif_b','Crystal and rainbow','a bridge of clear crystal slabs with a rainbow shimmering inside the crystal, thin gold rails',200,96],
      ['bif_c','Rune-lit stone','a white stone bridge whose paving and low railings glow with lines of rainbow runes',200,96]]},
    {id:'sc_notch_opts',wave:61,fam:'notch',kind:'obj',cols:3,rows:1,size:'1536x1024',title:'The notch at the end of the village pier — where the Lodestar is set to call the Bifröst; the end of a wooden pier on the lake, seen from above-front like the game scenery; original designs, no text',items:[
      ['notch_a','Carved post','the last planks of a wooden pier, at its end a thick old oak post carved with runes and a staff-shaped notch cut into its top',140,150],
      ['notch_b','Rune stone','the end of a wooden pier where a short standing stone is set into the boards, a staff-shaped slot carved down its face, faint runes',140,150],
      ['notch_c','Iron cradle','the end of a wooden pier with a small iron cradle bolted to the boards, shaped to hold a staff upright, a ring of rune-plates round it',140,150]]},
    {id:'sc_asg_circle_opts',wave:61,fam:'asg_circle',kind:'flat',cols:3,rows:1,size:'1536x1024',title:'The rune circle at the heart of liberated Asgard — like the rune circle on the village green; here the hero raises the Lodestar and casts Godsbane into the sky; seen from above; '+ASG,items:[
      ['asg_circle_a','Gold ring of runes','a wide round floor of white marble with a ring of gold runes, a smaller ring inside it, a gold socket for a staff in the middle',220,140],
      ['asg_circle_b','Standing stones of light','a round paved floor ringed by eight short white standing stones with gold tips, runes glowing between them, a socket in the middle',220,140],
      ['asg_circle_c','World-tree mosaic','a round floor with a mosaic of the world tree in white, cream and gold, its roots forming a ring of runes, a socket in the middle',220,140]]},
    panel('pn_musp_sink_a',61,'Story panel — Muspelheim sinks (option A)','a wide cinematic painting: seen from the mainland shore at dusk, the great black volcano island of Muspelheim breaking apart and sinking into a boiling sea, lava pouring from its cracks, pillars of steam and smoke, the causeway gone; small pale-blue spirit lights and the hero, tiny, watching from the rocks in the foreground'),
    panel('pn_musp_sink_b',61,'Story panel — Muspelheim sinks (option B)','a wide cinematic painting from high above: the volcano collapsing into the ocean in a ring of white steam, its glow fading under the waves, the black causeway sinking in a line toward the shore, the night sky orange with ash'),
    panel('pn_asg_sky_a',61,'Story panel — Asgard opens in the sky (option A)','a wide cinematic painting: night over a calm lake; the clouds part in a great ring of golden light, and within it the underside of a white-and-gold city of spires appears, lowering slowly; rays of light fall onto the water; a small village on the shore in the foreground'),
    panel('pn_asg_sky_b',61,'Story panel — Asgard opens in the sky (option B)','a wide cinematic painting: a blinding white-gold light tears open the sky above a lake at dawn; a city of white walls and gold spires descends out of it on beams of light; pale-blue spirits in a meadow look up'),
    panel('pn_asg_lake_a',61,'Story panel — Asgard on the lake (option A)','a wide cinematic painting: the white-and-gold walled city of Asgard now resting on the lake as an island, its walls ringed by calm water reflecting it, gold spires catching the sunrise, the village pier in the foreground pointing at its gate'),
    panel('pn_asg_lake_b',61,'Story panel — Asgard on the lake (option B)','a wide cinematic painting from above: a round walled island city of white stone and gold filling most of a lake, a central citadel of spires, mist on the water, the little village on the shore, the light warm and hopeful')]);
  // a story panel: one wide painting, edge to edge, no characters' faces close up (07zt roomBody is for dungeon floors)
  var b0=ZSCN.body; ZSCN.body=function(S){ if(S.kind==='room'&&S.panel){ var it=S.items[0]; return 'Create ONE image for a 2D action RPG called The Quests of Zeldara and Zeldor: '+S.title+', a painted story panel shown during a cut-scene.\n'+
      'The reference images show the game\'s characters; use them only for the art style (outline weight, flat cel shading, teal highlights, magenta rim) — a bold hand-drawn cartoon game look, not a photo, not 3D.\n'+
      'Subject: '+it[2]+'.\nThe painting fills the whole image edge to edge like a wide film still. No text, no labels, no frame, no UI.'; } return b0.apply(ZSCN,arguments); };
})();

// ═══ wave 62 (round 60): the forge hearths and the great hearth moving in the painting, the Honour guard remade, sheep, the apothecary's magic-weapon furniture ═══
// Kris (Saga art, the four forges): "image is good, but the flames moving needs to be in the image, not with an overlayed drawn art"; (Honour guard)
// "size of spirits changes, needs to be the same"; "in the beginning of the village, there are old pixel drawn sheep … create painted art requests for
// sheep"; "since apothecary sells the magic weapons and the upgrades, we need more art in the apothecary to show items like this in the room".
(function(){ if(typeof ZSCN==='undefined')return; ZSCN.WAVES[62]='Round 60 — moving hearths, the Honour guard, sheep, the apothecary';
  var LOOP='Animation frames — ONE subject shown FOUR times (a 2 × 2 grid, read left to right, top row first) as a 4-frame living loop. Copy the subject EXACTLY from its picture in the reference sheet: the SAME design, size, colours and place in every frame, the same camera and scale. ';
  var hearth=function(k,name,what,move,frames){ return {id:'sc_fa_'+k,wave:62,fam:'fa_'+k,kind:'obj',cols:2,rows:2,size:'1024x1024',anim:1,refs:[k==='great'?'sc_ghearth_opts':'sc_forge_hearths'],title:LOOP+'Only the '+move+' moves; the iron, stone and everything else stay perfectly still',
    seq:[['fa_hearth_'+k,name,what,'reg',k==='great'?150:120,k==='great'?150:110,frames]]}; };
  ZSCN.SHEETS=ZSCN.SHEETS.concat([
    hearth('ember','Hearth of the Ember Forge — its flames moving','the Ember Forge hearth (iron rim with leaf knotwork, green-gold flames among the coals, a great bellows beside it)','green-gold fire',['the flames low and leaning left','the flames rising, a flicker to the right','the flames at their tallest, sparks lifting','the flames settling, leaning back to the left']),
    hearth('cinder','Hearth of the Cinder Forge — its steam moving','the Cinder Forge hearth (wet steaming rim, blue-white coals, a quench trough beside it)','steam and the glow of the coals',['a thin wisp of steam rising','the steam puffing up in a round cloud','the cloud drifting higher and thinning, a new wisp below','the steam almost gone, the coals glowing brighter']),
    hearth('slag','Hearth of the Slag Forge — its fire moving','the Slag Forge hearth (rim crusted with cooling slag, deep orange coals, a crucible on chains above it)','orange fire and a drip of molten slag from the crucible',['the fire low, a drop forming on the crucible lip','the fire rising, the drop falling','the fire tall, the drop splashing in the coals with sparks','the fire settling, a new drop forming']),
    hearth('ash','Hearth of the Ash Forge — its smoke and embers moving','the Ash Forge hearth (black iron rim hung with broken chains, red-white coals and drifting ash)','smoke, ash and embers',['grey smoke curling up, a few embers','the smoke rising higher, embers lifting','the smoke spreading, embers at the top','the smoke thinning, new embers popping from the coals']),
    hearth('great','The great hearth of Muspelheim — its fire moving','the great hearth, option A (a giant round hearth of black iron and gold, four gem cradles, a staff socket in the middle)','fire in the hearth',['the fire low and golden','the fire rising in tongues','the fire at its tallest, sparks spiralling up','the fire settling']),
    {id:'sc_gloop2_guard',wave:62,fam:'gloop2_guard',kind:'obj',cols:2,rows:2,size:'1024x1024',anim:1,refs:['sc_spirit_grp_opts','sc_gloop_2'],title:LOOP+'Spirits are translucent glowing people of pale-blue runic light. Every frame shows the SAME group: the SAME number of people, EVERY ONE THE SAME SIZE AS IN EVERY OTHER FRAME (nobody grows or shrinks), the same props at the same size and place — only heads, arms and spears move a little. Never add, remove or merge anyone',
      seq:[['gm_guard','Honour guard','exactly FIVE tall ancestor spirits (count them: five) in ONE straight line with spears and shields of light, all the same height','reg',200,128,['all five standing to attention','all five raising their spears in salute together','all five with spears high, shields lifted','all five lowering spears back to rest, the middle one nodding']]]},
    {id:'sc_sheep',wave:62,fam:'sheep',kind:'obj',cols:2,rows:2,size:'1024x1024',title:'Village sheep — fluffy cartoon sheep with cream-white curly wool, black faces and legs, small ears, a friendly look; seen from above-front like the game scenery; no text',items:[
      ['pr_sheep_graze','Sheep grazing','a sheep with its head down, nibbling the grass, side view',46,38],
      ['pr_sheep_stand','Sheep standing','a sheep standing and looking up, three-quarter view',44,40],
      ['pr_sheep_lie','Sheep lying down','a sheep lying in the grass, legs tucked under, content',46,30],
      ['pr_sheep_lamb','Lamb','a small fluffy lamb hopping, white wool, black face',32,30]]},
    {id:'sc_int_apoth',wave:62,fam:'interior',kind:'obj',cols:3,rows:2,size:'1536x1024',title:'Interior furniture — the Sorcerer\'s Apothecary sells magic weapons and upgrades them: pieces for its shop room, seen from above-front like the game\'s other furniture; original designs, no text',items:[
      ['if_staffrack','Staff rack','a tall wooden rack holding six magic staffs of different kinds — fire, water, leaf, stone, storm and shadow — each topped with its gem glowing softly',56,66],
      ['if_wandcase','Wand case','a glass-topped display case of polished dark wood with magic wands laid on green velvet, their tips glowing',58,40],
      ['if_orbstand','Orb pedestal','a carved stone pedestal holding a floating glowing arcane orb circled by thin rune rings',30,54],
      ['if_staffstand','Master staff on a plinth','a single grand white-gold staff floating upright above a rune-carved plinth in a soft beam of light',30,66],
      ['if_enchantbench','Enchanting bench','a workbench for upgrading staffs: a staff clamped in a vice, cut gems in little dishes, glowing rune-carving tools',62,40],
      ['iw_staffs','Mounted staffs','wall decoration: two crossed magic staffs mounted over a small round shield with a rune',58,40]]}]);
  if(ZSCN.expand)ZSCN.expand();      // the animation sheets get their frame items
})();
// the sheep: painted, or none at all (the old drawn ones are gone)
(function(){ if(typeof WPROP==='undefined')return; WPROP.sheep=function(c,ctx,x,y,w,h,o){ var Zs=typeof _scn==='function'?_scn():null, ids=['pr_sheep_graze','pr_sheep_stand','pr_sheep_lie','pr_sheep_graze','pr_sheep_lamb'];
  if(!Zs||!Zs.has(ids[0]))return; var id=c.R.pick(ids); Zs.sprite(c.m,id,x+w/2,y+h-4,0,{w:(id==='pr_sheep_lamb'?30:44)*(Zs.K||1)}); }; })();

