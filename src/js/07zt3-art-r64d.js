// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt3-art-r64d.js — round 64d: painted art ordered (scenery wave 67; tools/sprites/round65.ps1).
// ║  · MONSTER SHOTS (Kris, fighting Xal'zor: "a mix of of updated painted images for the attacks and old pixel effects, like a circle with a
// ║    plus sign in the middle … create new requests for painted art"): every monster shot was still a small drawn picture (09g ZShot) — the
// ║    "circle with a plus" is the drawn orb/bolt in its red warning ring. Eight painted shots, flying to the right; the three marked WHITE are
// ║    painted white and pale grey so the game colours them (a void orb purple, a frost orb blue).
// ║  · THE COLLAPSE OF MUSPELHEIM (Kris: the falling rocks "should be improved such that they put up barriers … we might need new sprite images
// ║    for this"): three heaps of fallen rubble with lava glowing in the cracks, and the boulder as it falls.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[67]='Round 64d — painted monster shots, the collapse rubble';
  ZSCN.SHEETS=ZSCN.SHEETS.concat([
    {id:'sc_pj_shots',wave:67,fam:'fx',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_fx_solids'],title:'Painted monster shots — magic and missiles in flight, each one alone and centred, FLYING TO THE RIGHT (its head to the right, any trail streaming off to the left), seen from above at a slight angle like the game; transparent background, no text. The three marked WHITE are painted in white and very pale grey only (the game colours them)',items:[
      ['pj_orb','Magic orb (WHITE)','a round orb of swirling magic light with a bright core and a short soft comet tail to the left — WHITE and pale grey only',64,48],
      ['pj_bolt','Magic bolt (WHITE)','a sharp elongated bolt of magic like a glowing crystal dart, with crackling wisps trailing to the left — WHITE and pale grey only',72,36],
      ['pj_spit','Spit glob (WHITE)','a wobbling glob of thick spit or venom with drips flying off the back — WHITE and pale grey only',56,40],
      ['pj_bone_arrow','Bone arrow','a crude arrow with a bone shaft, a jagged bone head pointing right and black crow-feather fletching',80,24],
      ['pj_fireball','Fireball','a blazing ball of fire, white-hot at the front, orange flames and smoke streaming to the left',72,48],
      ['pj_frost','Frost shard','a spinning shard of blue ice with frost glittering off the back',64,32],
      ['pj_lightning','Lightning ball','a crackling ball of yellow-white lightning with forked sparks',56,56],
      ['pj_void','Void orb','an orb of deep purple-black void with a violet rim of light and dark wisps dragging behind it',64,48]]},
    {id:'sc_es_rubble',wave:67,fam:'es_props',kind:'obj',cols:2,rows:2,size:'1024x1024',refs:['sc_fr_props'],title:'Muspelheim collapsing — fallen rock from the cavern roof, seen from above-front like the game scenery, each piece alone and centred, transparent background, no text',items:[
      ['es_rubble_a','Rubble heap','a heap of three or four broken black-basalt boulders fallen together, thin orange lava glowing in the cracks, dust round its foot',64,52],
      ['es_rubble_b','Rubble heap, long','a long low pile of shattered dark rock slabs with glowing cracks, a little smoke rising',72,46],
      ['es_rubble_c','Boulder, cracked','one big round cracked boulder half-sunk in the floor, lava light in its cracks and loose stones round it',60,54],
      ['es_rock_fall','Falling boulder','a jagged black boulder falling, seen from the side, trailing embers and dust upward, glowing at its cracks',56,64]]}]);
  // round 64e (Kris: "asgard needs to be filled up with other buildings and things in the city to match some of the pictures we have" — card:
  // "A living city"): the city of Asgard, in the look of the Lab's picked keeps, towers and walls (white stone, gold roofs)
  ZSCN.WAVES[68]='Round 64e — the city of Asgard';
  var ASG='Asgard, the city of the gods — white stone and cream marble, roofs of beaten gold, gold trim and carved Norse knotwork, in the look of the reference sheet; seen from above-front like the game scenery, each piece alone and centred, transparent background, no text';
  ZSCN.SHEETS=ZSCN.SHEETS.concat([
    {id:'sc_asg_city_a',wave:68,fam:'asc',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_asg_keep_opts'],title:ASG+' — its buildings',items:[
      ['asc_longhouse','Longhouse','a long white-stone Norse longhouse with a steep roof of gold shingles, carved dragon-head gable ends, a wooden door with gold bands',224,150],
      ['asc_house','Home','a small white-stone house with a gold roof, a round window, flower boxes, a little chimney',160,130],
      ['asc_meadhall','Mead hall','a great mead hall: tall gold roof with crossed antlers on the gable, carved pillars at the door, shields along the walls',288,220],
      ['asc_temple','Temple','a round temple of white marble columns under a gold dome, a gold rune-disc on top',224,200],
      ['asc_market','Market','three market stalls with striped awnings (red, blue, gold) and baskets of golden apples, bread and cloth',224,130],
      ['asc_smithy','Smithy','a white-stone smithy with a gold roof, an open front with a glowing forge and an anvil, a tall chimney',170,170],
      ['asc_stable','Stable','a stable of white stone and dark wood with a gold roof, stalls with half-doors, hay',224,150],
      ['asc_garden','Iðunn\'s garden','a walled garden of white stone round a tree heavy with golden apples, flowers and a small gold gate',224,170]]},
    {id:'sc_asg_city_b',wave:68,fam:'asc',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_asg_keep_opts'],title:ASG+' — towers, fountains and statues',items:[
      ['asc_tower','Watchtower','a slender round white tower with a pointed gold roof and a blue window',70,190],
      ['asc_fountain','Fountain','a round white-marble fountain with a gold basin on a column, water spraying',96,90],
      ['asc_well','Well','a round stone well with a little gold-roofed frame and a bucket',70,90],
      ['asc_banner','Banner','a tall pole with a long red banner bearing a gold rune',50,150],
      ['asc_lamp','Lamp-post','a tall gold lamp-post with a glowing white-gold lantern',40,120],
      ['asc_statue_thor','Statue of Thor','a white marble statue of Thor raising his hammer, on a plinth',80,170],
      ['asc_statue_freyja','Statue of Freyja','a white marble statue of Freyja with a falcon-feather cloak, on a plinth',80,170],
      ['asc_statue_tyr','Statue of Tyr','a white marble statue of one-handed Tyr with a sword and shield, on a plinth',80,170]]},
    {id:'sc_asg_city_c',wave:68,fam:'asc',kind:'obj',cols:2,rows:2,size:'1024x1024',refs:['sc_asg_keep_opts'],title:ASG+' — little pieces of the streets',items:[
      ['asc_tree','Golden-apple tree','a small round tree with golden apples in a white-stone ring',90,110],
      ['asc_bench','Bench','a carved wooden bench with gold trim between two flowering bushes',100,60],
      ['asc_runestone','Runestone','a tall carved runestone of pale stone, its runes inlaid with gold',50,110],
      ['asc_cart','Cart','a small wooden hand-cart with gold bands, heaped with golden apples',90,70]]}]);
  if(ZSCN.expand)ZSCN.expand();
})();

// ═══ round 65 (Kris, Oct 18): SOLMYRK REMADE — painted options for all three phases (card: "Options first"), scenery wave 69 ═══
// Kris: phase 1 "white angels … but for any coloration, make it golden, not blue"; keep "the robes … bishop-like. the scepter is fantastic. i love
// the single eye aspect like odin and all the runic … elements and the glowing eye … no legs, and flying/hovering. the massive golden helmet";
// Lab note: "wings should be longer and taller … more well defined and faceted. outfit should be more grand, long and flowing and ethereal".
// Phase 2 "the dark armor with white wings … the ravens are great, and the golden mask should start to be broken, showing the dark demon underneath
// … the black sinuous arms should start to come out", "a combo between the 2 extremes", and it pulses light ↔ black (so radiant + black versions).
// Phase 3 "the black spirit images are for the final phase … make sure to make at least 6 new forms"; Lab note: "darker … like the void … deep
// shadowy nothingness with long binding arms". His inspiration pictures are described in words only (none is sent to the painter); the
// paintings he already liked (sc_gd_grim_*) are the reference for the helmet, scepter and eye.
(function(){ if(typeof ZSCN==='undefined')return; ZSCN.WAVES[69]='Round 65 — Solmyrk remade: options for his three phases';
  var WHO='Solmyrk, the Black Sun — Odin himself corrupted into a false god of Asgard, the final boss of a Norse fantasy game; HE HAS NO LEGS: his body ends in long trailing robes, mist or smoke and he floats above the ground; a full figure, front-facing with a slight three-quarter turn, alone on a transparent background, painted in the same style as the reference sheet, no text';
  var P1=function(id,name,desc){ return [id,name,desc+' — golden angel: white and gold only (gold where there would be colour, NO blue or purple), wings very long and tall (taller than him), well-defined faceted feathers like blades of gold-white light; grand, long, flowing, ethereal bishop-like robes and vestments in layers of white and gold with gold runic embroidery; a massive golden helmet; ONE glowing eye only, like Odin (the other covered); holding a tall golden scepter-spear (Gungnir)',260,440]; };
  var P2=function(id,name,desc){ return [[id,name+' (radiant)',desc+' — ONE glowing eye like Odin — RADIANT: blazing with golden-white light',260,300],[id+'_dk',name+' (black)',desc+' — ONE glowing eye like Odin — the SAME figure in its black pulse: turned to a black silhouette drinking the light, only the eye and the cracks burning white',260,300]]; };
  var P3=function(id,name,desc){ return [id,name,desc+' — the final form: deep shadowy nothingness like the void, black smoke and darkness, no armour and no robes any more, LONG BINDING ARMS, eyes of burning white slashes of light; ominous, godlike, Norse; NOT an insect, not a bug',300,420]; };
  var s2=[].concat(P2('gd_sol_2_a','Wings of Ash','dark ornate black-steel armour with gold filigree under torn white-and-gold robes, white feathered wings whose tips are burning black, the golden helmet-mask cracked across one side and behind the crack a black demon face with white slit eyes, two thin black sinuous clawed arms unfurling from the cracks in his back, two ravens circling him, golden scepter'),
    P2('gd_sol_2_b','The Eclipse Mask','a hooded figure in dark plate armour and a long dark cloak, the golden mask split down the middle (one half gold, one half black void with white slit eyes), a black sun with a ring of golden fire behind his head, white wings, ravens perched on both shoulders, black tendril-arms coiling out from under the cloak round the scepter'),
    P2('gd_sol_2_c','The Fallen Allfather','a white-winged dark knight, hood up, golden helmet shattering — shards of the golden mask floating away from a face of black nothing with one burning white eye; long black sinuous arms wrapped round his golden scepter and reaching out; ravens bursting from the cracks; robes ragged gold and black'));
  ZSCN.SHEETS=ZSCN.SHEETS.concat([
    {id:'sc_gd_sol_1',wave:69,fam:'gd_sol',kind:'obj',cols:3,rows:1,size:'1536x1024',refs:['sc_gd_grim_1'],title:'Concept options for the final boss, PHASE 1 — the golden angel. '+WHO,items:[
      P1('gd_sol_1_a','The Gilded Seraph','three pairs of wings (two rising high above, one sweeping down), a full-face golden helm with a single eye-slit glowing white and a tall mitre-like crest, a cope of white and gold like a bishop\'s'),
      P1('gd_sol_1_b','The High Seat\'s Herald','two enormous wings rising twice his height, each feather a faceted plate of gold; a golden helm with raven-wing cheek-guards and a short crown of spear points; a golden rune-disc halo behind; robes falling into a long train of light'),
      P1('gd_sol_1_c','The Sun-Crowned Allfather','wings of crystalline golden light-shards, a golden helm crowned with sun-rays, a long beard of white light flowing from under it, the scepter topped with a radiant sun-stone, robes billowing upward as if in a wind of light')]},
    {id:'sc_gd_sol_2',wave:69,fam:'gd_sol',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_gd_grim_2','sc_gd_grim_1'],title:'Concept options for the final boss, PHASE 2 — the cracked mask: half god of light, half the dark beneath; top row radiant, bottom row the same three in their black pulse. '+WHO,items:[s2[0],s2[2],s2[4],s2[1],s2[3],s2[5]]},
    {id:'sc_gd_sol_3a',wave:69,fam:'gd_sol',kind:'obj',cols:4,rows:1,size:'1536x1024',refs:['sc_gd_grim_2'],title:'Concept options for the final boss, PHASE 3 — what is left when the mask is gone (1 of 2). '+WHO,items:[
      P3('gd_sol_3_a','The Hollow King','a towering shape of black smoke with a crown of black flame-horns, a face that is only five curved white slashes of light, four long arms ending in hooked claws reaching out, the body dissolving into black mist below'),
      P3('gd_sol_3_b','The Binding Dark','a void-black body like a torn cloak of night, six long thin arms spreading like roots and chains, each ending in clawed fingers, one huge white eye in the middle'),
      P3('gd_sol_3_c','The Wolf of the Last Night','a hunched towering shadow with a long wolf-like head, white slit eyes along the muzzle, a mane of black flame, very long clawed forelimbs, its hind body trailing away into smoke'),
      P3('gd_sol_3_d','The Black Sun','a gaunt shadow figure inside a black eclipse ringed with white fire, arms stretched wide into many black tendrils, white slashes for eyes')]},
    {id:'sc_gd_sol_3b',wave:69,fam:'gd_sol',kind:'obj',cols:4,rows:1,size:'1536x1024',refs:['sc_gd_grim_2'],title:'Concept options for the final boss, PHASE 3 — what is left when the mask is gone (2 of 2). '+WHO,items:[
      P3('gd_sol_3_e','The Raven Storm','a storm of black feathers and smoke forming a giant figure, a raven-skull mask with white eye-slits, wings of smoke, long clawed arms'),
      P3('gd_sol_3_f','The Unmasked One','shards of the broken golden mask circling a faceless void, a crown of black dead branches like antlers, arms like long dead branches ending in claws'),
      P3('gd_sol_3_g','The Shroud','a vast hooded shape of black cloth and smoke, no face but white slit eyes and a thin white crescent of a grin, long ribbon-like arms that wrap and bind'),
      P3('gd_sol_3_h','The Fimbul Shade','black ice and void, frost-white eye slits, a crown of jagged black ice, many long thin arms trailing frost and darkness')]}]);
  // ═══ wave 70: Surtharn's phase changes — one story panel each (Kris: "we should also do cut-scenes for sutharns different forms") ═══
  ZSCN.WAVES[70]='Round 65 — cut-scene panels: Surtharn changes form';
  var SP=function(id,name,desc){ return {id:'sc_'+id,wave:70,fam:'panels',kind:'room',panel:true,cols:1,rows:1,size:'1536x1024',refs:['sc_surth_phases','sc_pn_musp_sink_a'],title:'Cut-scene panel — '+name,items:[[id,name,'a wide cinematic painting in the same style as the reference panel: inside the burning throne cavern of Muspelheim, '+desc+'. The young hero in a green cloak small in the foreground facing him; no text',1536,1024]]}; };
  ZSCN.SHEETS=ZSCN.SHEETS.concat([
    SP('pn_surt_2','The Forge-king','the Molten Colossus (as in the reference) drives his burning greatsword into the floor; it melts and reforges into a giant hammer as his body hardens into an armoured forge-king with an anvil-crown'),
    SP('pn_surt_3','The Ash Tyrant','the Forge-king bursts into a storm of ash; out of it strides the Ash Tyrant, chains of pale-blue spirit-light trailing from his hands to bound spirits'),
    SP('pn_surt_4','The Horned Jötunn','the ash swirls up and the giant grows huge, great curling horns bursting from his head, the Sword of Flame igniting in his fist'),
    SP('pn_surt_5','The Obsidian Warlord','the Jötunn is plunged into lava and climbs out in black obsidian armour, his molten heart glowing behind a plate of glass'),
    SP('pn_surt_6','The Living Volcano','the obsidian shatters and Surtharn swells into a living volcano, lava pouring from his shoulders and crown, the whole cavern erupting')]);
  if(ZSCN.expand)ZSCN.expand();
})();

