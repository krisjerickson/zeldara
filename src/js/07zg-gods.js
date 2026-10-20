// ═══════════════════════════════════════════════════════════════════════
// ║ 07zg-gods.js — round 71: ODIN AND FREYA (doc 30 §15; answer E2: "painted characters + panels").
// ║ Freed from the two joined orbs in the feast hall, they stand and talk there, lead the spirits up the Bifröst, and come to the village
// ║ centre to cast — Odin's blue lightning, Freya's green vines. Each is a painted character (CH, 07s): idle, talk, the casting move (work)
// ║ and a walk (the Gods sub walks like the village folk, 07zs). The trapped forms are scenery (the orbs, 07zt4).
// ║ Our own designs for a Norse fantasy game — the old stories' attributes (Odin: one eye, a spear, ravens, a wide hat and a grey-blue cloak;
// ║ Freya: a falcon-feather cloak, the amber necklace, flowers), no likeness of any film, game or comic version.
// ═══════════════════════════════════════════════════════════════════════
var ZGOD_LOOK={
  odin:'Odin the Allfather, a god of a Norse fantasy world: a very tall, broad old man with a long silver-white beard braided with small gold rings, one eye covered by a plain dark leather patch and the other glowing soft rune-blue, weathered fair skin, a wide-brimmed grey traveller\'s hat over long white hair, a deep blue cloak lined with grey wolf fur and edged with gold knotwork, a mail shirt under a dark tunic, a tall spear of ash wood with a rune-carved leaf-shaped steel head (Gungnir), and a black raven perched on his shoulder; kind, wise and weary, NOT golden, NOT masked, nothing like the false god',
  freya:'Freya, a goddess of a Norse fantasy world: a tall, radiant woman with warm golden-brown sun-kissed skin and long red-gold hair in loose braids woven with small white and yellow flowers, a flowing green-and-gold gown, a long cloak of brown and gold falcon feathers over her shoulders like folded wings, a glowing amber necklace of many linked gold pieces (Brísingamen) at her throat, bare green-vine bracelets; warm, strong and joyful, NOT golden-white, nothing like the false god'};
(function(){ if(typeof CH!=='function')return;
  CH('npc','Gods','god_odin','Odin, the Allfather',['person','cast','#2a4a7a,#4a4a52,#e8c860,#201810,#e8c8a8,#e8e8e0','beard,grey,cape,staff,big'],
    'The feast hall of Asgard, the Bifröst, the village centre (the end)',ZGOD_LOOK.odin,
    'Raises his spear to the sky and calls down a branching bolt of blue-white lightning, his cloak and beard blown back.','Freed from the orb in the feast hall; tells the twin the truth about the storm.');
  CH('npc','Gods','god_freya','Freya, the Lady of the Fields',['person','cast','#3a7a3a,#8a6a3a,#f0c060,#201810,#c89070,#d87a3a','long,cape,crown'],
    'The feast hall of Asgard, the Bifröst, the village centre (the end)',ZGOD_LOOK.freya,
    'Spreads her hands low over the ground and green vines with white flowers burst out and race away from her, her falcon cloak lifting.','Freed from the orb in the feast hall; sends the spring back into the land.');
})();
