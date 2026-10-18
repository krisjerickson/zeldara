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
