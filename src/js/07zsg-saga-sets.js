// 07zsg-saga-sets.js — round 69: the saga panels and their lines (doc 30 §11), shared by the game (16r ZSAGA) and the Lab (Saga panels & hamlets).
// Round 69: the five set before the twins were born are the redone ones ('_b', wave 77 — no hero).
var ZSAGA_SETS={
    opening:[['pn_saga_cradles','In the last village the cradles stood empty. No child had been born alive in a lifetime.'],
      ['pn_saga_storm_b','Then came the worst storm anyone remembered — and the lightning struck the runestones, one after another.'],
      ['pn_saga_basket','At dawn a basket drifted out of Mirror Lake. In it lay two babes whose eyes glowed rune-blue.'],
      ['pn_saga_raised','The village named them Zeldara and Zeldor, and raised them on goat\'s milk and old songs.'],
      ['pn_saga_eyes','They read runes no one else could, and the old stones woke for them.'],
      ['pn_saga_sendoff','Now the village is old and tired. One twin goes out into Runeheim; the other stays to keep the village.']],
    realm4:[['pn_saga_ashnight_b','The Ash Night: the night Asgard\'s gate shut, fire fell on the Ashlands and the Ember Wall rose.']],
    realm3:[['pn_saga_stonefall_b','Three years on, the Highlands dug too deep for a voice in the stone — and the mountains broke.']],
    realm2:[['pn_saga_blacktide_b','Then the Black Tide: the Silverrun rose black, and the marshes drank the villages.']],
    realm1:[['pn_saga_quiet_b','Only the Grasslands were left — and the Long Quiet, when the dead drifted at the edge of the light.']],
    gate:[['pn_saga_gate','High above, a golden gate had shut. On Odin\'s high seat sat someone in a golden mask.']] };
// round 71 — the two glimpses still missing (doc 30 §11, 16–17): the 30th and the 40th spirit
ZSAGA_SETS.orbs=[['pn_saga_orbs','In a dark hall far above, two great lights float side by side, asleep — and something in a golden mask keeps watch.']];
ZSAGA_SETS.tattoo=[['pn_saga_tattoo','Forty spirits free: across all Runeheim the lines of light join into one great tree — and above the lake, the clouds begin to open.']];
// round 71 — THE LAST SAGA (doc 30 §15; 16s ZLS): the sets that play after Solmyrk. {w} = the twin you play (m / f, the panels with the hero in
// front come in both), {H} = your twin's name, {O} = the other's. Unpainted panels play as placeholders with their line, until round 75 is in.
var ZLAST_SETS={
  fh_crumble:[['pn_fh_crumble','The false god falls. His golden mask rolls down the steps of the empty high seat — and the citadel begins to shake.']],
  fh_doors:[['pn_fh_doors_{w}','Behind the high seat, golden doors carved with ravens and falcons swing open: the feast hall of the gods.']],
  fh_orbs:[['pn_fh_orbs','Inside, two great orbs of light float joined like an infinity sign. Something stirs within them — and the Lodestar trembles in your hand.']],
  fh_cast:[['pn_fh_cast_{w}','Godsbane — into the very centre, where the two lights meet.']],
  fh_free:[['pn_fh_shards','The orbs burst into a million shards of light…'],['pn_fh_gods','…and in the falling light stand Odin and Freya — free.']],
  fh_truth:[['pn_fh_truth_{w}','They kneel to you, and in the light between them you see the storm: two sparks falling with the lightning into a basket on the lake.']],
  gods_home:[['pn_end_gods_lead','Odin and Freya walk up the Bifröst, and the spirits of Runeheim follow them home.'],['pn_end_farewell','At the top of the bridge they turn back, and raise their hands to you.']],
  vil_lightning:[['pn_vil_lightning','At the village, Odin raises his spear — and blue lightning wakes every runestone at once.']],
  vil_vines:[['pn_vil_vines','Freya kneels, and the spring runs out of her hands along the soul-lines.']],
  vil_land:[['pn_vil_green','All across Runeheim the lines of light become roads of grass and stone.'],['pn_vil_forges','Out at sea, the forges of Muspelheim sink, and their fires go out.'],
    ['pn_vil_asgard','Asgard settles into Mirror Lake. Only its golden spires stay above the water.'],['pn_vil_monsters','Everywhere, the monsters fade into motes of light.'],
    ['pn_vil_paths','And the people walk out on the new roads, to build homes in every realm.']],
  celebrate:[['pn_cel_feast','That night the whole village celebrated {H} and {O}.'],['pn_cel_time','The seasons turned. The hamlets grew.'],['pn_cel_children','And children were born again in Runeheim.']],
  after:[['pn_after','Runeheim is green again. Your journey goes on.']] };
