// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt14-art-r113.js — round 113 paintings for the villagers' requests (Kris ✓ "Quest items" in the Lab).
// ║   sc_r113_icons      the new things the requests give, as inventory icons (ic_<item>)
// ║   sc_r113_finds_a…d  the things that lie in the world for a request (pc_<thing>) — until they are in, an emoji with a soft glow
// ║ The portraits, props, creatures, story moments and mini-game art Kris also ✓'d come with the rounds that build them.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[113]='Round 113 — the villagers\' requests: new items and the things you find for them';
  var F=' Each one alone, seen from slightly above, sitting on the ground with a soft shadow, as in the reference. No pixel art. No text, no letters, no numbers.';
  ZSCN.SHEETS.push(
   {id:'sc_r113_icons',wave:113,fam:'icons',kind:'icon',cols:5,rows:2,size:'1536x1024',title:'Item icons — rewards from the villagers\' requests',items:[
     ['ic_raven_cloak','Raven-feather Cloak','a cloak on its own, hanging open, black raven feathers over dark blue wool, a silver raven clasp',48,48],
     ['ic_runeloaf','Runeloaf','a round golden sourdough loaf with a rune scored into its crust',48,48],
     ['ic_skalds_mead','Skald\'s Mead','a carved drinking horn brimming with golden mead, a little foam',48,48],
     ['ic_brass_bird','Brass Songbird','a small clockwork songbird of polished brass with a tiny key in its back',48,48],
     ['ic_spyglass','Vela\'s Spyglass','a brass sea-captain\'s spyglass, extended, with leather grip',48,48],
     ['ic_miklagard_silk','Miklagard Silk','a folded bolt of shimmering purple-and-gold silk',48,48],
     ['ic_silk_cape','Sky-silk Cape','a cloak on its own, hanging open, pale sky-blue silk that seems to float, silver edging',48,48],
     ['ic_acrobat_boots','Acrobat\'s Boots','a pair of soft red-and-gold acrobat\'s boots with curled toes',48,48],
     ['ic_glass_charm','Soulglass Charm','an amulet on a cord: a small mosaic of glowing rune-blue sea-glass pieces in a silver frame',48,48],
     ['ic_q_letter','Sealed Letter','a folded letter sealed with red wax and a rune stamp',48,48]]},
   {id:'sc_r113_finds_a',wave:113,fam:'r113',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vill_special_2'],title:'Things to find — Oswin\'s lost Ravens\' keepsakes and Benno\'s ingredients',items:[
     ['pc_rv_shield','Sigrid\'s shield','a battered round Viking shield painted with a black raven, lying in the grass'+F,40,40],
     ['pc_rv_horn','Ulf\'s horn','a cow-horn war horn with a silver mouthpiece and a leather strap, lying on the ground'+F,40,30],
     ['pc_rv_ring','Halla\'s ring','a heavy twisted silver arm-ring lying on a flat stone, glinting'+F,30,26],
     ['pc_rv_hood','Kettil\'s hood','a dusty dark green hooded cloak crumpled on the ground, a raven pin on it'+F,40,30],
     ['pc_q_rye','Marsh rye','a small bundle of tall golden rye stalks tied with twine'+F,30,40],
     ['pc_q_snowhoney','Snow-honey','a small clay honey pot frosted with snow, honey dripping from the lid'+F,30,34]]},
   {id:'sc_r113_finds_b',wave:113,fam:'r113',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vill_special_2'],title:'Things to find — Morwen\'s ingredients and Benno\'s ember-salt',items:[
     ['pc_q_embersalt','Ember-salt','a little heap of glowing orange-red salt crystals in a leather pouch'+F,30,28],
     ['pc_q_moss','Bog-lantern moss','a clump of moss that glows soft green like a lantern'+F,32,26],
     ['pc_q_ember','A Binder\'s ember','a cooled dark lump of ember with faint red cracks, a broken chain link fused to it'+F,30,26],
     ['pc_q_dew','Crystal dew','a small clear crystal holding one glowing drop of water'+F,26,30],
     ['pc_q_lily','Ash-lily','a pale grey lily with a glowing ember-orange heart, growing from ash'+F,28,38],
     ['pc_q_feather','Raven\'s feather','a single glossy black raven feather lying on the grass'+F,30,24]]},
   {id:'sc_r113_finds_c',wave:113,fam:'r113',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vill_special_2'],title:'Things to find — coal, gears, silver, barrels, sea-glass, honey',items:[
     ['pc_q_coal','Highland coal','a lump of shiny black coal with a few sparkles'+F,28,24],
     ['pc_q_gear','A brass gear','an old brass gear wheel half sunk in the ground, a little moss on it'+F,32,30],
     ['pc_q_silver','Hack-silver','a few pieces of cut silver — part of a bracelet, a bent coin — on wet sand'+F,30,22],
     ['pc_q_barrel','A drifted barrel','a wooden barrel washed up on the shore, rope and seaweed round it'+F,36,40],
     ['pc_q_seaglass','Sea-glass','three smooth pieces of sea-glass, blue, green and amber, glowing faintly'+F,28,22],
     ['pc_q_honey','Wetlands honey','a wild honeycomb on a broken branch, dripping gold'+F,32,28]]},
   {id:'sc_r113_finds_d',wave:113,fam:'r113',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vill_special_2'],title:'Things to find — berries, ash-salt, herbs and an ox skull',items:[
     ['pc_q_berries','Cloudberries','a small woven basket of golden-orange cloudberries'+F,30,26],
     ['pc_q_ashsalt','Ash-salt','a small grey stone bowl of pale ash-salt'+F,28,22],
     ['pc_q_herb','Healing herb','a fresh green healing herb with small white flowers, a few roots showing'+F,26,32],
     ['pc_q_oxskull','Ox skull','an old bleached ox skull with long curved horns lying in the grass'+F,44,30],
     ['pc_q_letter','A sealed letter','a folded letter with red wax lying on the ground'+F,26,20],
     ['pc_q_bench','A wooden bench','a simple sturdy wooden bench with carved rune ends'+F,56,34]]});
})();
