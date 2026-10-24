// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt6-storyboards.js — round 79: STORY CUT-SCENES FROM MANY PICTURES (Kris: "we need to make them tell the story a bit more …
// ║ For all of the cutscene, propose both story lines as well as develop images for about 6-12 different parts of the story being
// ║ told. We'll then feed all of these into the video generator to make a multi image cut scene"). Answers S1–S4 (docs/08, round 79):
// ║ both hero versions; every cut-scene, the boss forms too; one montage clip per cut-scene (a mini scene per picture, up to 12);
// ║ a short line per beat. Kris: "keep the epic theme … glowing runes and overall neon glow themes, aurora borealis effects, possibly
// ║ shooting stars … The current images are great, don't change these" → EPIC below, on every new frame; no old picture is touched.
// ║  ZSB.SCENES — each cut-scene: id, name, when it plays, the story line, and its beats. A beat: who is in it (0 nobody we must match /
// ║    'h' the hero / 'o' the hero and the other twin / 't' both twins side by side), its picture, its caption.
// ║  Pictures: sheet sc_sb_<scene>_<nn>, item sb_<scene>_<nn> (+ _m / _f when the twin you play is in it). Waves 85–89. Doc 35.
// ═══════════════════════════════════════════════════════════════════════
var ZSB={ SCENES:[], WAVES:{85:'Story cut-scenes 1: the first spirit freed and the four builders',86:'Story cut-scenes 2: the opening and the four realms\' falls',87:'Story cut-scenes 3: the glimpses, the Lodestar, Muspelheim, Asgard, Godsbane, the Bifröst',88:'Story cut-scenes 4: Surtharn\'s and Solmyrk\'s forms',89:'Story cut-scenes 5: the feast hall, the truth, home, the land changed, the celebration, the World Tree'},
  HERO:{m:'Zeldor (the boy hero: spiky tousled brown hair with teal streaks, big teal eyes, a moss-green hooded short cape, cream tunic, big tan boots — exactly as in the hero reference)',
        f:'Zeldara (the girl hero: long auburn braids with silver clasps, a small glowing teal gem on her brow, big teal eyes, a short teal-green mantle with a pale fur collar — exactly as in the hero reference)'},
  TWINS:'the twins Zeldor (the boy: spiky brown hair, moss-green cape) and Zeldara (the girl: long auburn braids, teal-green mantle with a fur collar), exactly as in the hero references — the SAME age, about sixteen, and the SAME height',
  KIDS:'the twins as small children (a little boy with spiky brown hair and a little girl with auburn braids, both with big teal eyes)',
  STYLE:'a wide cinematic painting in exactly the style, light and finish of the reference panels (but NOT their scene) — one moment of a story told in pictures. The land of Runeheim, a Norse fantasy world; ',
  EPIC:'. Keep it epic: where it fits, runes and magic glow with a bright neon rune-blue light, night and dusk skies carry a shimmering aurora borealis, and now and then a shooting star crosses the sky — accents in the game\'s own style',
  NO:'. No lion, no centaur, no animal companion unless named, no valknut symbol. No text',
  BASE:['sc_pn_end_dawn_b','sc_pn_end_cast_a'] };
(function(){
  var S=function(id,name,wave,plays,story,refs,beats){ ZSB.SCENES.push({id:id,name:name,wave:wave,plays:plays,story:story,refs:refs||[],beats:beats.map(function(b,i){ var base='sb_'+id+'_'+('0'+(i+1)).slice(-2); return {n:i+1,who:b[0],title:b[1],desc:b[2],cap:b[3],refs:b[4]||[],ids:(b[0]==='h'||b[0]==='o')?[base+'_m',base+'_f']:[base]}; })}); };
  var GODS='Odin (the old one-eyed god: silver braided beard, wide grey hat, deep blue wolf-fur cloak, the spear Gungnir, a raven) and Freya (red-gold hair braided with flowers, falcon-feather cloak, glowing amber necklace)';
  var SPIRIT='a pale, translucent spirit of a village woman in a shawl, glowing soft rune-blue';
  var BIND='a tall dark bindstone carved with one rune, bound in heavy black-iron chains that glow ember-red where they bite';
  var LODE='the Lodestar (a tall staff of silver and gold crowned by a ring of four gems — green, blue, amber, red — around a blazing white star)';

  // ═══ wave 85 ═══
  S('spirit','The first spirit freed',85,'the first spirit you free (then each realm\'s first spirit can reuse it)',
    'A spirit chained to a bindstone toils without rest. You come close, see how the chains have worn it thin, lay your hand on the stone — your eyes burn rune-blue — and the chains burst. The spirit rises free; lines of light run out from under your feet into the land and the grass follows them; the spirit thanks you and drifts away over the hills to the village, where it waits on the Green, the first to come home.',
    ['sc_bindstone_opts_a','sc_spirit_opts_a','sc_pn_binders_free'],[
    [0,'The toiling spirit',SPIRIT+', chained to '+BIND+' in a misty meadow at dusk, swinging a heavy pick at the rock with slumped shoulders, ember sparks rising; the chains drag at her wrists','Chained to a stone in the fields, a spirit of Runeheim toiled without rest.'],
    ['h','You come closer','{H} walking through tall dusk grass toward the distant bindstone and its toiling spirit, sword in hand; behind {H} a dark hunched Binder (a chain-keeper of fire) crumbles into ash and embers','With its Binder gone, you came closer.'],
    ['h','Its struggle','close on the spirit at the bindstone: her tired face, tears of light, the ember-red chains biting her wrists; {H} kneeling beside her, looking at her with deep concern','You saw how the chains had worn it thin.'],
    ['h','The rune on the stone','{H} standing before the tall bindstone, reaching toward its single carved rune, which flickers faintly as if it knows {H}; the chained spirit watching over {H}\'s shoulder','The old rune flickered, as if it knew you.'],
    ['h','Your hand on the stone','{H}\'s open palm pressed flat on the carved rune; {H}\'s eyes blazing bright rune-blue; neon rune-blue light flowing out of the hand into the stone\'s carved lines and racing along the chains','You laid your hand on the stone — and your eyes burned rune-blue.'],
    ['h','The chains break','the black chains bursting apart in a blast of rune-blue light, glowing links flying outward in slow motion, the bindstone cracking with light; the spirit flinging up her arms; {H} shielding {H}\'s eyes','The chains burst apart.'],
    ['h','Free','the spirit rising from the stone, peaceful, eyes closed, hands open, glowing brighter; {H} looking up at her from below, the broken chains on the grass','For the first time in years, a soul of Runeheim was free.'],
    ['h','Lines beneath your feet','seen from above: from beneath {H}\'s feet, glowing rune-blue lines spread out through the grass like a Norse tattoo, branching and curling; {H} looking down in wonder','Beneath your feet, lines of light ran out into the land.'],
    ['h','Life follows the light','a single line of light racing away across a grey, withered land toward the horizon; along it fresh green grass and small white flowers spring up; {H} small in the foreground watching it go','And where the light ran, the land remembered green.'],
    ['h','Her thanks','the spirit floating before {H}, touching {H}\'s forehead with a glowing hand and a soft smile; a small shard of glowing glass drifting down into {H}\'s hand','"Thank you. Now I can go home."'],
    ['h','Toward the village','night: the spirit drifting away over rolling hills toward a distant village by a lake, trailing light; {H} small on the hill watching her go; aurora above','She drifted away over the hills, toward the village.'],
    ['o','Home on the Green','night on the village green round a tall old runestone carved with a tree: the spirit arriving and settling in a soft ring of light by the stone; {O} and a few villagers looking up at her in wonder','On the Green she waited, glowing — the first to come home.',['sc_vill_core_1']]]);

  var BUILD=function(id,name,who,ref,realm,cage,freed,steps,end){ var barrierName={bram:'the Silverrun',mira:'the Great Scar',dunn:'the Cinder Chasm',vela:'the Ember Wall'}[id]; S(id,name,85,'freeing '+who+' (their tower) — then the crossing',
      'You free '+who+' from a cage at the top of a tower in '+realm+', walk with them to '+barrierName+', help while they work out the problem and build, and see it finished — and the first people cross.',
      [ref],[['h','The cage',cage[0],cage[1]],['h','Free',freed[0],freed[1]]].concat(steps).concat(end)); };
  BUILD('bram','Bram raises the Silverrun bridge','Bram the Builder','crafts_1.core.f','the Grasslands',
    ['the top of a dark stone tower in the Grasslands at dusk: Bram the Builder (exactly as in the character reference) locked in a black iron cage, gripping the bars; an ash-warden crumbling to ash beside it; {H} stepping up with a glowing rune-key','At the top of the tower, Surtharn\'s wardens had caged a builder.'],
    ['the cage door swung open; Bram stepping out and stretching, laughing, clapping {H} on the shoulder with a big hand, his hammer back in his other hand','"Free at last! I\'ll raise the bridge to the Wetlands."'],
    [['h','The river wall','Bram and {H} on the bank of the Silverrun: a wide wild river racing dark and fast like a wall of water, the broken stumps of an old bridge, the misty Wetlands on the far side','The Silverrun ran like a wall between the realms.'],
     ['h','The plan','Bram unrolling a big parchment of bridge drawings on a flat rock, its rune marks glowing faintly, pointing across the river with his hammer; {H} holding down a corner','Bram drew the bridge on parchment, then in the air with his hammer.'],
     ['h','Timber and stone','Bram swinging an axe at a great pine, logs and cut stone piled by the river; {H} hauling a beam on one shoulder','Timber from the Grasslands, stone from the riverbank.'],
     ['h','Runes in the stone','Bram knee-deep in the river setting a great stone pier, tapping a carved keystone so its rune flares neon blue and the water parts around it; {H} steadying the stone','Every stone he set, he marked with a rune.'],
     ['h','Under the northern lights','night: the half-built arches over the river lit by lanterns, Bram hammering on a beam, {H} holding a lantern high; a wide aurora borealis across the sky and a shooting star','They worked through the night under the northern lights.'],
     ['h','The keystone','dawn: Bram and {H} hauling on ropes and pulleys to lower a great glowing keystone into the top of the central arch','At dawn, the keystone.']],
    [['h','The bridge','sunrise: the finished stone-and-timber bridge arching across the silver river, runes glowing along its rail; Bram raising his hammer in triumph on the bank, {H} beside him','Bram raises the Silverrun bridge.'],
     ['h','The first to cross','the first travellers and a cart rolling across the new bridge to the green misty Wetlands, a heron rising from the reeds; {H} walking onto the bridge, Bram waving','For the first time in years, the Grasslands and the Wetlands touch again.']]);
  BUILD('mira','Mira\'s lift up the Great Scar','Mira the Mechanic','crafts_2.core.f','the Wetlands',
    ['a tower on stilts above the misty Wetlands marsh: Mira the Mechanic (exactly as in the character reference) inside an iron cage, already picking the lock with a little wrench; an ash-warden fading to ash; {H} arriving','In a tower above the marsh, the wardens had caged a mechanic.'],
    ['the cage door clanging open; Mira bursting out, goggles pushed up, grinning, holding up a brass gear; {H} laughing','"Thank you! My lift will carry you up to the Highlands."'],
    [['h','The Great Scar','Mira and {H} small at the foot of the Great Scar: a towering torn cliff of broken rock with waterfalls pouring down it, rubble below, the Highlands far above in the clouds','The Great Scar: a mountain torn in two.'],
     ['h','Measuring','Mira squinting through a brass telescope at the cliff top, chalk sums scribbled on a rock, {H} holding a long plumb line in the wind','Mira measured the cliff twice, and the wind three times.'],
     ['h','Gears and a rune-heart','Mira at a workshop cart heaped with gears, chains and a brass winch, sparks flying from her tools as she fits a glowing rune-stone into the engine\'s heart; {H} handing her a wrench','Gears, chains — and a rune-stone heart.'],
     ['h','The first chain','Mira and {H} climbing the cliff face on ropes, carrying the first great chain and a pulley to the top, mist and waterfalls far below','Someone had to carry the first chain to the top.'],
     ['h','Lanterns on the cliff','night: the lift\'s timber frame climbing the cliff, lit by lanterns, Mira welding with bright sparks high up, {H} below; an aurora borealis across the sky','By night the cliff glittered with her lanterns.'],
     ['h','The lever','Mira gripping the great brass lever with both hands at the foot of the lift, {H} beside her, both looking up as the gears begin to turn and the runes on them glow','Then she pulled the lever.']],
    [['h','Up the Scar','the wooden cage-lift climbing the cliff face on chains and turning gears, Mira and {H} inside looking out at the view, a lantern swinging, mist below','Mira\'s lift climbs the Great Scar.'],
     ['h','The Highlands','sunrise: Mira and {H} stepping out of the lift at the top onto the rocky Highlands, snowy peaks ahead, Mira waving her goggles','The road to the Highlands is open.']]);
  BUILD('dunn','Dunn\'s iron bridge over the Cinder Chasm','Dunn the Dwarf Forger','crafts_3.core.f','the Highlands',
    ['a snowy mountain tower in the Highlands: Dunn the dwarf forger (exactly as in the character reference) rattling the bars of an iron cage; an ash-warden crumbling; {H} arriving through the snow','High in the mountains, the wardens had caged a dwarf forger.'],
    ['Dunn out of the cage, roaring with laughter, lifting his big hammer over his head; {H} grinning','"Ha! Let me at my anvil — an iron bridge to the Ashlands it is!"'],
    [['h','The chasm','Dunn and {H} on the edge of the Cinder Chasm: a deep gorge glowing with lava far below, a smoky orange sky, the ash-grey Ashlands on the far side','The Cinder Chasm opened the night the sky went quiet.'],
     ['h','A forge on the edge','Dunn\'s forge built on the edge of the chasm, bellows roaring, {H} pumping the bellows, Dunn hammering a glowing iron girder on the anvil','Dunn built a forge on the edge of the chasm.'],
     ['h','Runes in the iron','Dunn carving runes into a red-hot girder; the runes cool to a bright neon rune-blue glow; {H} watching','Iron for the heat, runes for the holding.'],
     ['h','Out over the fire','a timber crane swinging the first iron girder out over the glowing abyss, Dunn riding the girder with his hammer, {H} hauling the rope','Beam by beam, out over the fire.'],
     ['h','Between lava and aurora','night: the half-built iron bridge silhouetted over the lava glow, sparks flying from Dunn\'s hammer, an aurora borealis above','Lava below, the northern lights above.'],
     ['h','The last rivet','Dunn striking the last glowing rivet on the massive black-iron bridge, sparks flying; {H} holding the rivet tongs','Dunn drives the last rivet.']],
    [['h','Across','the massive black-iron bridge spanning the chasm, runes glowing along it; Dunn and {H} walking across it toward the Ashlands','Across the Cinder Chasm lie the Ashlands.'],
     ['h','The smoke of Muspelheim','Dunn and {H} at the far end of the bridge looking out over the ash-grey plains; far to the west, a black volcano smokes over the sea','And beyond them, the smoke of Muspelheim.']]);
  BUILD('vela','Vela\'s passes over the Ember Wall','Captain Vela','crafts_4.core.f','the Ashlands',
    ['a black tower in the ash-grey Ashlands: Captain Vela (exactly as in the character reference) in an iron cage, a brass compass in her hand; an ash-warden crumbling; {H} arriving through drifting ash','In a tower in the ash, the wardens had caged a sky captain.'],
    ['Vela out of the cage, settling her captain\'s coat, pointing her compass at the sky with a grin; {H} beside her','"You found me! The sky ports are yours to command."'],
    [['h','The Ember Wall','Vela and {H} before the Ember Wall: a long ridge of glowing magma and fire cutting the land, lava cascading down it, the green Grasslands just visible beyond the smoke','The Ember Wall had burned for thirty-six years.'],
     ['h','The old ways','Vela unrolling an old star chart on a rock, her compass glowing, tracing a route over the ridge; {H} leaning in','Vela knew the old ways over the ridge.'],
     ['h','The sky skiff','a small wooden sky skiff with patched sails and glowing rune-lamps coming down out of the clouds to a rocky landing; Vela hailing it, {H} beside her','And she knew the winds.'],
     ['h','Over the fire','night: Vela at the helm of the sky skiff with {H}, sailing over the burning Ember Wall, an aurora borealis and a shooting star above','They sailed over the fire under the northern lights.'],
     ['h','Rune-lanterns','Vela and {H} dropping glowing rune-lanterns from the skiff onto the wall; where they land, the lava cools to black stone in a widening path, steam rising','Where her rune-lanterns fell, the fire cooled to stone.']],
    [['h','The pass','a road of cooled black stone through the Ember Wall, steam rising, runes glowing along its edges; Vela and {H} walking it toward the green Grasslands','A pass through the Ember Wall.'],
     ['h','The sky port','the village harbour\'s new sky port by the lake: the skiff moored at a tall mast with lanterns, Vela waving from the deck, {H} on the quay','The sky ports are yours to command — all Runeheim is open.']]);

  // ═══ wave 86: the opening and the realms' falls ═══
  S('opening','The opening — the Long Quiet, the storm and the twins',86,'a new game (replaces the six opening panels)',
    'The dead of Runeheim once rose along the World Tree and new souls came down it. Then the road went quiet: no child was born in the last village for twenty winters, and the Binders came for the dead. On the night of a terrible storm lightning struck the runestones, and at dawn a basket drifted out of Mirror Lake with two babes whose eyes glowed rune-blue. The village raised them; the stones woke for them. Sixteen winters on, one twin goes out into Runeheim and the other stays.',
    ['sc_vill_core_1','vf_elder.core.f'],[
    [0,'The cycle of souls','night over a village by a great lake: a vast World Tree of rune-blue light rising from the carved runestone on the village green up into the aurora; souls of light rising along it, small sparks drifting down into the village','Once, the dead rose along the World Tree — and new souls came down it into every cradle.'],
    [0,'The road goes quiet','far above the clouds, a great golden gate swinging shut; the World Tree of light below it fading and going dark; the aurora dimming','Then the road went quiet.'],
    [0,'Empty cradles','a candlelit village nursery with rows of empty wooden cradles; an old woman holding a folded birth-shawl, looking out of a window at a pale aurora','In the last village, the cradles stood empty — twenty winters, and not one child.'],
    [0,'The edge of the light','dusk at the edge of the Grasslands: pale rune-blue spirits drifting at the edge of the fields; villagers at the timber palisade watching; in the mist, a dark Binder\'s chain glinting','The dead drifted at the edge of the light — and the Binders came for them.'],
    [0,'The storm','the worst storm anyone remembered: lightning striking a tall runestone in the fields so its rune blazes neon rune-blue; more runestones lit across the dark plain under the rain','Then came the worst storm anyone remembered — and the lightning struck the runestones.'],
    [0,'The basket','dawn after the storm: a beautiful carved floating basket glowing softly, drifting across calm Mirror Lake toward the village harbour; the last of the aurora and a shooting star in the pale sky','At dawn, a basket drifted out of Mirror Lake.'],
    [0,'Two babes','on the village pier an old fisher lifting the blanket in the basket: two babes inside, their eyes glowing bright rune-blue; villagers gathering in astonishment','Inside lay two babes, their eyes glowing rune-blue.'],
    ['t','Raised by the village','a warm sunny village green: '+'{K}'+' toddling among goats, an old woman feeding them, an elder playing a lyre and singing to them','The village raised them on goat\'s milk and old songs.'],
    ['t','The stones wake','dusk on the village green: '+'{K}'+' laying small hands on the tall carved runestone; its runes waking with neon rune-blue light; Elder Runa (as in the reference) staring in wonder','They read runes no one else could — and the old stones woke for them.'],
    ['t','Sixteen winters on','inside a glass-domed hall with rune-etched windows glowing blue: '+'{T}'+' — one practising with a sword, the other bent over an old rune tablet; warm light','Sixteen winters on, the twins were grown.'],
    ['o','The choice','sunrise on the village green by the carved runestone: Elder Runa (as in the reference) holding out a pack and a sword; {H} taking them; {O} beside them holding an armful of old books','One would go out into Runeheim; the other would stay and keep the village.'],
    ['o','The send-off','at the village gate at dawn, villagers waving; {H} walking out along the road toward the wild lands, looking back once; {O} at the gate waving, a book under one arm','And so one twin went out — and the other stayed.']]);
  var REALM=function(id,name,plays,story,beats){ S(id,name,86,plays,story,[],beats.map(function(b){ return [0,b[0],b[1],b[2]]; })); };
  REALM('quiet','The Long Quiet','the Grasslands\' tenth freed spirit','Once the roads of the Grasslands ran to every realm. One by one the others fell and their walls rose, until only the Grasslands were left; no child was born, the dead drifted at the edge of the light, and lately the Binders came over the walls for them and bindstones began to hum in the fields.',[
    ['The roads to every realm','long ago: busy roads leaving the Grasslands toward every horizon, travellers and carts, banners, runestones glowing, a midsummer festival','Once, the roads of the Grasslands ran to every realm.'],
    ['The walls rise','from a hill at dusk, three horizons: a wall of fire, broken mountains, a black river','One by one, the other realms fell — and the walls rose.'],
    ['The last village','a lonely walled village by a lake, fields gone fallow, a timber palisade being raised','Only the Grasslands were left.'],
    ['No child','an old couple sitting by an empty cradle in a quiet house, an aurora pale outside the window','And no child was born.'],
    ['The dead at the edge','dusk: pale rune-blue spirits drifting at the edge of the fields, unable to rise','The dead drifted at the edge of the light…'],
    ['Over the walls','night: dark hunched Binders with ember-glowing chains climbing over the palisade, dragging pale spirits away; villagers hiding with lanterns','…until the Binders came over the walls for them.'],
    ['The humming stones','night: bindstones in the fields with chained spirits, their ember-red chains glowing under a pale aurora','And bindstones began to hum in the fields.']]);
  REALM('ashnight','The Ash Night','the Ashlands\' first freed spirit','The Ashlands were orchards and honey. The night Asgard\'s gate shut, the sky turned red over Muspelheim; fire and ash fell, the Ember Wall rose in one night and the Cinder Chasm split the earth. By morning the Ashlands were grey, and their souls were bound to dig.',[
    ['Orchards and honey','long ago: the Ashlands as warm golden orchards and beehives, little stone villages, a honey cart on the road','Once the Ashlands were orchards and honey.'],
    ['The sky turns red','night: over the western sea a black volcano erupting, the whole sky turning red above the orchards; villagers on rooftops staring','The night the gate shut, the sky turned red.'],
    ['Fire and ash','fire and ash raining on the villages, people fleeing with lanterns and children','Fire and ash fell on the Ashlands.'],
    ['The Ember Wall','a wall of magma bursting up along a ridge, cutting the land in two','The Ember Wall rose in one night.'],
    ['The Cinder Chasm','the ground tearing open between the Ashlands and the mountains, lava glowing far below','And the Cinder Chasm split the earth.'],
    ['Grey morning','a silent grey morning, ash over everything, the orchards burned','By morning, the Ashlands were grey.'],
    ['Bound to dig','Binders leading long lines of chained pale spirits down into glowing mine mouths toward the smoking volcano','Their souls were bound — and made to dig.']]);
  REALM('stonefall','The Stone-Fall','the Highlands\' first freed spirit','The Highlands lived by their mines. Three years after the Ash Night the stone began to sing; the miners were driven deeper toward the voice, the mountains broke and the Great Scar tore open. The miners dig still — for him.',[
    ['The mines','Highland mountain villages and mine mouths with lanterns, miners with picks, snowy peaks','The Highlands lived by the mines.'],
    ['A voice in the stone','deep in a mine tunnel, miners listening to a glowing vein in the rock that pulses like a heartbeat','Then the stone began to sing.'],
    ['Deeper','miners digging feverishly downward toward a glow far below, a foreman urging them on','"Deeper," said the voice.'],
    ['The mountain breaks','the snowy peaks cracking apart, an avalanche of rock','So the mountain dug toward them.'],
    ['The Great Scar','a vast cliff tearing open across the land, cutting the Highlands away','And the Great Scar tore open.'],
    ['Silence','snow falling softly over a ruined mountain village','Three years after the Ash Night, the Highlands fell.'],
    ['They dig still','chained pale spirits of miners swinging picks in a glowing cavern, a Binder watching','The miners dig still — for him.']]);
  REALM('blacktide','The Black Tide','the Wetlands\' first freed spirit','The Wetlands were mills and boats on a bright river. Five years after the Stone-Fall the Silverrun ran black from the south; the mill wheels turned backwards, the marshes drank the villages and the river became a wall.',[
    ['Mills and boats','Wetland stilt villages and water mills on the bright Silverrun, little boats, herons','The Wetlands were mills and boats on the Silverrun.'],
    ['The river turns black','black water creeping up the bright river from the south','Then the Silverrun ran black from the south.'],
    ['Backwards','a mill wheel turning backwards, a miller staring at it','The mill wheels turned backwards.'],
    ['The marsh rises','the marsh rising and swallowing houses and roads','The marshes drank the villages.'],
    ['A wall of water','the river grown wide, wild and dark, bridges swept away','And the river became a wall.'],
    ['It came up through','under the black water, ember-red chains pulling pale spirits down','"It came up through."'],
    ['Mist','mist over drowned rooftops, a lone heron','Five years after the Stone-Fall, the Wetlands were gone.']]);

  // ═══ wave 87 ═══
  S('gate','A glimpse: the gate shut',87,'the twentieth spirit freed','Twenty spirits free — and for a moment the sky shows you something: a golden gate shut high above, and on Odin\'s high seat someone in a golden mask. No soul can rise, and none come down.',[],[
    ['h','The sky parts','night: {H} on a hill just after freeing a spirit, looking up as the aurora parts like a curtain','Twenty spirits free — and the sky showed you something.'],
    [0,'The gate','far above the clouds, a vast golden gate shut fast, bound with chains of light','High above, a golden gate had shut.'],
    [0,'The mask','a white-and-gold hall beyond the gate: on a high seat sits a still figure in a golden mask, its face hidden','On Odin\'s high seat sat someone in a golden mask.'],
    [0,'No soul rises','pale souls rising toward the gate and turning back, drifting down again','No soul could rise…'],
    [0,'None come down','small sparks of new life at the gate, unable to come down, fading','…and none came down.'],
    ['h','The sky closes','{H} on the hill as the sky closes again, {H}\'s eyes glowing faintly rune-blue, resolute','Then the sky closed again.']]);
  S('orbs','A glimpse: two lights in the dark',87,'the thirtieth spirit freed','Thirty spirits free — and the sky opens once more: two great lights float joined in a dark hall far above, sleeping figures inside, and something in a golden mask keeps watch. Far apart, both twins look up at the same moment.',['sc_pn_saga_orbs'],[
    ['h','Once more','night: {H} by a freed bindstone looking up as the aurora opens again','Thirty spirits free — and the sky opened once more.'],
    [0,'A dark hall','a vast dark hall of white and gold far above, dust in shafts of pale light','In a dark hall far above…'],
    [0,'Two lights','two great orbs of pale light floating joined like an infinity sign, breathing slowly','…two great lights floated side by side…'],
    [0,'Asleep','inside the orbs, dim and asleep: '+GODS+'','…asleep.'],
    [0,'The watcher','far across the hall, small on a high seat, a figure in a golden mask watching the orbs','And something in a golden mask kept watch.'],
    ['o','Both look up','split view: on the left {H} on a hill under the aurora, on the right {O} at a window of a lamplit study full of books — both looking up at the same moment','Far apart, both twins looked up at the same moment.']]);
  S('lodestar','The Lodestar is made',87,'Surtharn falls — the great hearth','Surtharn\'s last ember goes out. Behind his throne is the great hearth. You lay the staff on the anvil and set the four Heartglasses round it; they rise, pour their light into the staff, and a white star wakes at its crown. You lift the Lodestar — and Muspelheim begins to fall.',['sc_pn_forges_lodestar','sc_lodestar2'],[
    ['h','The last ember','the throne cavern of Muspelheim: a giant\'s fallen molten body cooling to black stone, its last ember fading; {H} standing, breathing hard','Surtharn\'s last ember went out.'],
    ['h','The great hearth','behind the fallen throne, a vast forge cavern opening: a huge anvil lit from below by lava, chained spirits watching from the walls; {H} walking toward it','Behind his throne lay the great hearth.'],
    ['h','The staff on the anvil','{H} laying a plain silver-and-gold staff on the great anvil','You laid the staff on the anvil…'],
    ['h','Four Heartglasses','{H} setting four glowing glasses in a ring round the anvil — green, blue, amber and red','…and set the four Heartglasses round it.'],
    ['h','They rise','the four Heartglasses lifting into the air and circling the staff, {H} stepping back in awe','The glasses rose.'],
    [0,'Their light','streams of green, blue, amber and red light pouring from the four glasses into the staff on the anvil','And poured their light into the staff.'],
    [0,'The star wakes','a blinding white star igniting in the ring at the staff\'s crown, light blasting across the cavern','A white star woke at its crown.'],
    ['h','The Lodestar','{H} lifting '+LODE+' overhead; light filling the cavern; the chained spirits on the walls looking up as their chains begin to glow','The Lodestar.'],
    ['h','Muspelheim shakes','the cavern trembling, rocks falling, lava surging; {H} turning to run with the Lodestar','And Muspelheim began to fall.']]);
  S('escape','Muspelheim falls',87,'after the Lodestar is made — the escape','You run up through the collapsing mountain with the spirits behind you, every chain breaking as the Lodestar passes, out along the causeway as it sinks, to the shore — and watch Muspelheim fall into the sea. Then the sky clears.',['sc_pn_musp_sink_a'],[
    ['h','Run','{H} running up a collapsing lava tunnel holding the glowing Lodestar, freed spirits flying behind like a comet\'s tail','You ran.'],
    ['h','Every chain','a cavern wall of chained spirits; as {H} runs past with the Lodestar, every chain bursts and the spirits pour free','Every chain you passed, broke.'],
    ['h','The causeway','night: {H} bursting out onto a long walled causeway over the sea, the volcano erupting behind','Out onto the causeway.'],
    ['h','Sinking behind you','the causeway crumbling into the sea stone by stone just behind {H}\'s running feet','It sank behind you, stone by stone.'],
    ['h','The shore','{H} on the mainland rocks turning to look back, spirits gathered around','From the shore, you watched.'],
    [0,'Into the sea','the great black volcano island breaking apart and sinking into a boiling sea in a ring of steam','Muspelheim fell into the sea.'],
    ['h','The sky clears','the steam clearing over calm sea; an aurora borealis and shooting stars returning to the night sky; {H} small on the rocks','And the sky cleared.']]);
  S('asgard','Asgard comes down',87,'after Muspelheim — Asgard on the lake','With the fire broken the sky opens over Mirror Lake. A white-and-gold city appears in a ring of golden light and comes slowly down to rest on the lake, its gate facing the village pier. Your staff fits the notch at the pier\'s end — but it does not wake.',['sc_pn_asg_sky_c','sc_pn_asg_lake_a','sc_notch_opts'],[
    [0,'The sky opens','night over Mirror Lake and the village on its shore: the clouds parting in a great ring of golden light','With the fire broken, the sky began to open.'],
    [0,'A city in the sky','within the ring, the underside of a white-and-gold city of spires appearing','Asgard.'],
    [0,'Coming down','the city lowering slowly on beams of light; villagers crowding the pier','It came down slowly, as if it were tired.'],
    [0,'On the lake','the city touching the lake; a wave of golden light rolling across the water','And came to rest on Mirror Lake.'],
    ['h','The gate and the pier','dawn: Asgard as a walled island of white and gold, its gate facing the village pier; {H} at the pier\'s end holding '+LODE,'Its gate faced the village pier.'],
    ['h','The notch','{H} kneeling at a carved notch at the very end of the pier, the Lodestar set in it but dark; {H} puzzled','The staff fit the notch — but it did not wake.']]);
  S('twinteach','Your twin finds the word',87,'the Lodestar in hand — [Tab] by your twin','You run home with the Lodestar. Your twin is where they always are — at the books — and pulls down the oldest saga, the one nobody could read. On its last page is one rune. You read it together, eyes glowing, and the word wakes: GODSBANE. "When you reach the gods, I\'ll be there."',['sc_pn_twin_teach_m','sc_twin_study'],[
    ['h','Home','dusk: {H} running up the village lane with '+LODE+' toward a lamplit house','You ran home with the Lodestar.'],
    ['o','At the books','a lamplit study crammed with books and scrolls: {O} at the desk looking up as {H} comes in','Your twin was where they always were — at the books.'],
    ['o','The oldest saga','{O} pulling a huge, ancient, rune-bound book from a high shelf, eyes wide at the Lodestar; {H} holding the staff','"The oldest saga — the one nobody could read."'],
    ['o','One rune','the old book open on the desk: on its last page a single rune that glows the same white as the Lodestar\'s star; both twins leaning in','On its last page, a single rune.'],
    ['o','Together','close: the faces of {H} and {O} side by side over the page, both their eyes glowing rune-blue','You read it together.'],
    ['o','GODSBANE','the rune lifting off the page as light and flying to the Lodestar\'s star, which flares; {H} and {O} lit by it','GODSBANE.'],
    ['o','"I\'ll be there"','at the study door: {O} pulling on a cloak, hand on {H}\'s shoulder, both looking out toward the lake where Asgard glows','"When you reach the gods, I\'ll be there."']]);
  S('bifrost','The Bifröst rises',87,'the pier\'s notch, with the word','At the end of the pier you speak the word and set the staff. On the Green the spirits gather along the lines; the star blazes and a bridge of light runs out across the lake to Asgard\'s gate, and the spirits bless the road.',['sc_notch_opts','sc_bifrost_opts'],[
    ['h','The notch waits','night: {H} at the end of the pier holding '+LODE+' over the carved notch; Asgard glowing across the lake; aurora above','At the end of the pier, the notch waited.'],
    ['h','The word','{H} setting the staff into the notch, eyes glowing rune-blue, lips speaking','You spoke the word, and set the staff.'],
    [0,'Along the lines','the village green at night: freed spirits lining up along glowing soul-lines that run toward the pier','On the Green, the spirits gathered along the lines.'],
    ['h','The star blazes','the Lodestar\'s star blazing white in the notch, a beam shooting across the lake; {H} shielding {H}\'s eyes','The star blazed.'],
    [0,'A bridge of light','a bridge of rainbow light building outward across the dark lake toward Asgard\'s golden gate','And a bridge of light ran out across the lake.'],
    [0,'Blessed','spirits floating along both sides of the rainbow bridge like lanterns','The spirits blessed the road.'],
    ['h','To Asgard','{H} stepping onto the Bifröst toward the golden gate, the Lodestar in hand','The Bifröst — to Asgard\'s gate.']]);

  // ═══ wave 88: the boss forms ═══
  var SURT='Surtharn the fire giant (as in the reference)', SC=['sc_surth_phases'];
  var BOSS=function(id,name,wave,plays,story,refs,beats){ S(id,name,wave,plays,story,refs,beats); };
  BOSS('surt1','Surtharn rises',88,'Surtharn\'s throne — his first form','In the deepest cavern of Muspelheim the chained spirits dig. The black throne cracks, lava pours up, and Surtharn, the Molten Colossus, rises with his burning greatsword.',SC,[
    [0,'The deep halls','the throne cavern of Muspelheim: rivers of lava, chained pale spirits digging at the walls','In the deepest hall of Muspelheim, the spirits dug.'],
    [0,'The throne cracks','a black basalt throne splitting down the middle, light pouring out','The throne of Muspelheim split open.'],
    [0,'Lava rises','lava welling up through the cracked throne','Fire rose from below.'],
    [0,'A hand of fire','a giant hand of molten rock gripping the edge of the throne','A hand of fire took hold.'],
    [0,'The Molten Colossus',SURT+' rising as the Molten Colossus, a burning greatsword in his fist, roaring','Surtharn, the Molten Colossus!'],
    ['h','Facing him','{H} small in the foreground raising a sword against the towering fire giant','"Every gem of Runeheim is mine by right!"']]);
  BOSS('surt2','The Forge-king',88,'Surtharn\'s second form','The Colossus drives his greatsword into the floor; it melts and climbs his arms as armour and reforges into a hammer and an anvil-crown — the Forge-king.',SC,[
    [0,'Staggered',SURT+' as the Molten Colossus staggering, his greatsword glowing white-hot','He staggered…'],
    [0,'The sword in the floor','he drives the burning greatsword deep into the cavern floor','…and drove his sword into the floor.'],
    [0,'Melting','the greatsword melting into a pool of molten iron around his feet','The sword melted.'],
    [0,'Armour','the molten iron climbing his arms and hardening into armour plates','The iron climbed him.'],
    [0,'Hammer and crown','the iron reforging into a giant hammer in his hands and an anvil-shaped crown on his head','The Forge-king!'],
    ['h','The shockwave','the Forge-king striking the floor; a ring of fire rolling out; {H} bracing behind a shield','His hammer rang the cavern.']]);
  BOSS('surt3','The Ash Tyrant',88,'Surtharn\'s third form','The Forge-king cracks and bursts into a storm of ash; out of it strides the Ash Tyrant, chains of spirit-light trailing from his hands to the bound spirits.',SC,[
    [0,'Cracks','the Forge-king\'s armour cracking, light spilling from the cracks','The Forge-king cracked…'],
    [0,'A storm of ash','he bursts into a whirling storm of ash and embers','…and burst into ash.'],
    [0,'The spirits pulled in','pale spirits pulled into the ash storm by ember-red chains','The ash took the spirits with it.'],
    [0,'The Ash Tyrant','out of the storm strides the Ash Tyrant, a giant of ash with chains of pale spirit-light trailing from his hands','The Ash Tyrant!'],
    [0,'A shield of souls','the Ash Tyrant holding chained spirits before him like a shield','He hid behind the souls he had chained.'],
    ['h','Through the ash','{H} pushing forward through the ash storm, eyes glowing rune-blue','You pushed on through the ash.']]);
  BOSS('surt4','The Horned Jötunn',88,'Surtharn\'s fourth form','The ash swirls up and the giant grows huge; horns burst from his brow and he draws the Sword of Flame.',SC,[
    [0,'Rising ash','the ash swirling upward into a towering column','The ash rose…'],
    [0,'Huge','the giant growing huge, his head cracking the cavern roof','…and he grew.'],
    [0,'Horns','great curling horns bursting from his brow','Horns tore from his brow.'],
    [0,'Into the fire','he plunges his hand into a river of lava','He reached into the fire…'],
    [0,'The Sword of Flame','the Horned Jötunn lifting the blazing Sword of Flame','…and drew the Sword of Flame!'],
    ['h','Tiny','{H} tiny at his feet, looking up','The Horned Jötunn.']]);
  BOSS('surt5','The Obsidian Warlord',88,'Surtharn\'s fifth form','The Jötunn falls into the lava; the lava boils, and he climbs out in black obsidian armour with his molten heart glowing behind glass.',SC,[
    [0,'The fall','the Horned Jötunn toppling backward into a lake of lava','He fell into the fire.'],
    [0,'Boiling','the lava lake boiling and churning','The lava boiled.'],
    [0,'A black hand','a hand of black glass rising out of the lava','Something black rose from it.'],
    [0,'Obsidian','he climbs out in gleaming black obsidian armour','He climbed out in black glass.'],
    [0,'The molten heart','close: his molten heart glowing behind a plate of glass in his chest','His molten heart burned behind the glass.'],
    ['h','The Obsidian Warlord','{H} facing the Obsidian Warlord across the cavern','The Obsidian Warlord!']]);
  BOSS('surt6','The Living Volcano',88,'Surtharn\'s last form','The obsidian shatters and Surtharn swells into a living volcano; the whole cavern erupts.',SC,[
    [0,'Shattered','the obsidian armour shattering into black shards','The obsidian shattered.'],
    [0,'Swelling','Surtharn swelling, rock and fire pouring together','He swelled…'],
    [0,'Lava from his crown','lava pouring from his shoulders and crown','…lava poured from his crown…'],
    [0,'The cavern erupts','the whole cavern erupting with fire','…and the cavern erupted.'],
    [0,'The volcano itself','Surtharn has become a living volcano filling the cavern','The last ember — Surtharn becomes the volcano itself!'],
    ['h','Amid the fire','{H} amid falling rock and fire, raising a weapon','Now — or never.']]);
  var SOL=['sc_gd_sol_1','sc_pn_sol_0','sc_pn_sol_12_a','sc_pn_sol_23_a'];
  BOSS('sol1','Solmyrk, the Black Sun',88,'the citadel\'s throne hall — his first form','In the white-and-gold throne hall the figure in the golden mask stirs on Odin\'s high seat, rises, and unfolds wings of light: Solmyrk, the Black Sun.',SOL,[
    [0,'The throne hall','the vast white-and-gold throne hall of the citadel of Asgard, columns and tall windows','The throne hall of Asgard.'],
    [0,'The high seat','on the high seat at the end of the hall, a still figure in a golden mask','On Odin\'s high seat, the masked one waited.'],
    [0,'He rises','the masked figure rising from the high seat','He rose.'],
    [0,'Wings of light','great wings of golden light unfolding from his back','Wings of light unfolded.'],
    [0,'Gungnir','the masked god in gold and white raising a shining spear, a crown of spikes above the golden mask','A god of gold — Solmyrk, the Black Sun.'],
    ['h','Before him','{H} with the Lodestar standing before the golden figure','You raised the Lodestar.']]);
  BOSS('sol2','The Cracked Mask',88,'Solmyrk\'s second form','The golden mask cracks; black light pours out of the crack; his wings tear to darkness — behind the Allfather\'s face something else is looking out.',SOL,[
    [0,'The blow','a beam of white light striking the golden mask','The light struck the mask…'],
    [0,'A crack','a crack running down the middle of the golden mask','…and it cracked.'],
    [0,'Black light','black light pouring out of the crack','Black light poured out.'],
    [0,'Torn wings','half his wings tearing into darkness','His wings tore into darkness.'],
    [0,'Half and half','the Cracked Mask: one half radiant god, the other a black void','Behind the Allfather\'s face, something else is looking out.'],
    ['h','Bracing','{H} bracing against a wind of black and gold light','You held your ground.']]);
  BOSS('sol3','The Storm That Ends the World',88,'Solmyrk\'s last form','The mask shatters; all the light of Asgard drains into him; he swells into a storm of thunderheads before an eclipsed sun — the dark that was always underneath.',SOL,[
    [0,'The mask shatters','the golden mask shattering into pieces','The mask shattered.'],
    [0,'The light drains','rivers of golden light flowing across the hall into him','All the light of Asgard drained into him…'],
    [0,'Storm','he swells into a towering storm cloud','…and he swelled into storm.'],
    [0,'Eclipse','an eclipsed sun behind him, a white corona','The sun went dark behind him.'],
    [0,'The Storm That Ends the World','a colossal storm figure with wings of cloud and white lightning and a pale one-eyed mask','The Storm That Ends the World!'],
    ['h','The Lodestar raised','{H} tiny below the storm, raising the glowing Lodestar','And what was left was the dark that had always been underneath.']]);

  // ═══ wave 89: the end ═══
  S('feasthall','The feast hall — the gods freed',89,'Solmyrk falls (through to the gods freed)','Solmyrk\'s mask lies in pieces and the citadel shakes. Golden doors open behind the high seat onto the dusty feast hall of the gods, where two orbs float joined like an infinity sign. Your twin comes running; together you cast Godsbane into the centre, the orbs crack and burst into a million shards — and Odin and Freya stand free as the hall wakes.',['sc_room_feast','sc_pn_fh_orbs','god_odin.core.f','god_freya.core.f'],[
    ['h','The mask in pieces','the white-and-gold throne hall: a broken golden mask in pieces on the floor, darkness dissolving into smoke; {H} standing over it','Solmyrk fell, and his mask lay in pieces.'],
    ['h','The citadel shakes','the hall shaking, dust falling from the columns; behind the high seat a crack of golden light; {H} turning','The citadel shook.'],
    ['h','Golden doors','tall golden doors behind the high seat swinging open, warm light spilling out; {H} silhouetted before them','Behind the high seat, golden doors swung open.'],
    ['h','The feast hall','{H} stepping into a vast dusty feast hall: long tables, cobwebs, banners, two empty high seats','The feast hall of the gods.'],
    ['h','The orbs','two great orbs of light floating joined like an infinity sign above the hall, faint shapes inside; '+LODE+' trembling in {H}\'s hand','Two great orbs, joined like an infinity sign — and voices inside.'],
    ['o','Your twin comes','{O} running in through the golden doors to {H}\'s side','And your twin came running to your side.'],
    ['t','Together','{T}, seen from behind, both raising their hands and the Lodestar toward the orbs, eyes glowing rune-blue','Together, you spoke the word.'],
    ['t','Into the centre','one beam of white-gold light rising from {T} into the place where the two orbs meet','Godsbane — into the centre, where the two lights meet.'],
    [0,'Cracks','cracks of light spreading across the two orbs','The orbs cracked…'],
    [0,'A million shards','the orbs bursting into a million glittering shards of light filling the hall','…and burst into a million shards of light.'],
    ['t','Free','in the falling light stand '+GODS+'; {T} small before them','Odin and Freya — free.'],
    [0,'The hall wakes','the feast hall alive again: dust gone, banners bright, candles lighting themselves along the tables, golden light','And the feast hall woke.']]);
  S('truth','The truth about the twins',89,'after the gods are freed — they talk','Odin and Freya thank the twins and tell them the truth: on the night the false one took them they had one breath of light left, and spent it on two sparks sent down in the storm. The lightning woke the runestones so the stones would wake for them. The twins are the gods\' last gift to Runeheim.',['god_odin.core.f','god_freya.core.f','sc_room_feast_lit'],[
    ['t','You came','Odin kneeling to the twins\' level in the bright feast hall, a big kind hand held out; {T} before him','"You came. Thirty-six winters we slept in our own light — and still you came."'],
    ['t','Why the stones light','Freya touching the twins\' cheeks, her amber necklace glowing; {T} with their eyes glowing rune-blue','"Do you know why the runestones light for you?"'],
    [0,'One breath of light','a memory, painted softer: Odin and Freya as the orbs close around them, cupping two tiny sparks of light between their hands','"The night the false one took us, we had one breath of light left…"'],
    [0,'Down in the storm','a memory: two tiny sparks falling through storm clouds, lightning striking runestones far below','"We sent you down in the storm."'],
    [0,'The basket of light','a memory: the sparks settling into a glowing basket on Mirror Lake at dawn','"The lightning woke the runestones, so that one day they would wake for you."'],
    ['t','The last gift','{T} looking at each other in wonder, their eyes glowing, the gods smiling behind them','"You are our last gift to Runeheim."'],
    ['t','Bring the Lodestar','Freya pointing out through the hall\'s open doors toward the heart of the city; Odin raising Gungnir; {T} turning to go','"Come. The spirits have waited long enough."']]);
  S('home','The spirits go home',89,'the rune circle at Asgard\'s heart','At the heart of Asgard the twins set the Lodestar and cast Godsbane into the sky. The Bifröst rises into heaven; from every realm the spirits come; Odin and Freya lead them home — the brave to Valhalla, the rest to Fólkvangr — and the familiars and fairy monarchs go with them. "Go to your village. We will follow."',['sc_asg_circle_opts','god_odin.core.f','god_freya.core.f','sc_pn_end_gods_lead'],[
    ['t','The rune circle','a great rune circle at the heart of the white-and-gold city; '+GODS+' and {T} arriving','At the heart of Asgard, the rune circle.'],
    ['t','The Lodestar set','{T} together setting '+LODE+' upright in the centre of the circle, the runes waking','The Lodestar, set at the heart.'],
    [0,'Into the sky','a pillar of white-gold light shooting from the circle up into the night clouds, an aurora flaring around it','Godsbane — into the sky.'],
    [0,'The Bifröst rises','a spiralling rainbow bridge rising from the city up through the clouds into heaven','The Bifröst rose into heaven.'],
    [0,'From every realm','seen from high above: from every corner of the land, pale spirits rising along glowing soul-lines toward the city','From every realm, the spirits came.'],
    [0,'They lead them home','Odin and Freya walking up the rainbow bridge ahead of a long procession of glowing spirits','Odin and Freya led them home.'],
    [0,'Valhalla and Fólkvangr','high in the clouds the bridge parting: one way to golden halls of warriors, the other to flowering fields in the sky','Valhalla for the brave, Fólkvangr for the rest.'],
    [0,'Into legend','small elemental familiars (fire, water, nature, earth) and three angelic fairy monarchs rising with the spirits','The familiars and the fairy monarchs went with them — into legend.'],
    [0,'Farewell','Freya looking back from the bridge and waving, Odin raising Gungnir','"Go to your village. We will follow."'],
    ['t','The sky closes','{T} alone in the rune circle as the bridge fades into a soft aurora and a shooting star','And the sky closed softly behind them.']]);
  S('village','Lightning and vines — Runeheim changed',89,'back at the village after the Bifröst','On the Green, Odin calls "Runeheim! Look up," and blue lightning wakes every runestone at once. Freya kneels — "And now… the spring" — and green vines run out along the soul-lines. The lines become roads of grass and stone; the monsters fade; the forges and Asgard sink; people walk out on the new roads and hamlets rise. Over a green Runeheim, the northern lights.',['sc_vill_core_1','god_odin.core.f','god_freya.core.f','sc_pn_vil_vines'],[
    ['t','Home','dusk on the village green by the carved runestone: {T} among the villagers, the spirits gone, everyone looking up','You came home.'],
    [0,'Look up','Odin in the clouds above the village raising Gungnir, lightning gathering','"Runeheim! Look up."'],
    [0,'Every stone at once','seen from high above: blue-white lightning striking the village runestone, and every runestone across the whole land lighting at once','Every runestone woke at once.'],
    [0,'The spring','Freya kneeling on the village green, both hands on the earth, flowers bursting up around her','"And now… the spring."'],
    [0,'The vines run','green vines with white flowers racing out from the green along the glowing soul-lines in every direction','The spring ran out along the soul-lines.'],
    [0,'Roads of grass','from high above: the lines of light across the land turning into roads of grass and stone, like a tree drawn on the world','The lines of light became roads.'],
    [0,'The monsters fade','monsters across the land fading into drifting motes of light','The monsters faded into light.'],
    [0,'The forges sink','the four forge-towers at sea sinking into the waves in steam','The forges sank into the sea.'],
    [0,'Asgard settles','the white-and-gold city sinking into Mirror Lake until only its golden spires stand above the water','Asgard settled into the lake.'],
    [0,'Out on the new roads','villagers with carts and children walking out along the new grassy roads','People walked out on the new roads.'],
    [0,'Hamlets','small hamlets with houses and gardens rising round runestones across the land','And homes rose in every realm.'],
    [0,'A green Runeheim','night over a green Runeheim, an aurora borealis and shooting stars over the lake and the spires','Runeheim was green again.']]);
  S('celebrate','The celebration — children again',89,'after the land turns green','The village celebrates the twins on the Green under lanterns and the aurora. Time passes; the first newborn cries; Pip and Wren play with the twins; children play at being twins in every hamlet.',['sc_vill_core_1','vf_kid1.core.f','vf_kid2.core.f','sc_pn_cel_feast'],[
    ['t','The feast','long tables on the village green under lanterns, villagers raising cups to {T} at the head of the table','The village celebrated the twins.'],
    ['t','Dancing','dancing round the carved runestone, Elder Runa with {T}, music, an aurora above','They danced till the stars came out.'],
    [0,'Seasons','the village green through the seasons in one picture: blossom, summer, autumn leaves, snow','Time passed.'],
    [0,'The first cry','a mother holding a newborn in a cosy room, the father laughing, the elder in the doorway in tears','And a child was born.'],
    ['t','Pip and Wren','two young village children (as in the references) running to {T} on the green','Pip and Wren, among the first.'],
    [0,'Playing twins','children in a hamlet playing at being the twins with wooden swords and a stick for a staff','"We play twins. I always have to be Zeldor…"'],
    [0,'Cradles','a midwife\'s workshop with full cradles and smiling families','Every hamlet had its own.'],
    ['t','From the hill','{T} sitting on a hill watching children play in the hamlets below at sunset','And children were born again in Runeheim.']]);
  S('credits','The credits — and after',89,'after the celebration','The credits roll over the night lake under forty stars; the twins on a hill over a green Runeheim; then the road goes on.',['sc_pn_credits','sc_pn_after'],[
    [0,'The night lake','Mirror Lake at night reflecting an aurora, forty bright stars above, golden spires in the water','(the credits)'],
    ['t','Forty stars','{T} on the pier looking up at the forty stars','Forty spirits, home.'],
    ['t','The hill','{T} on a grassy hill at sunrise over a green Runeheim of roads and hamlets','Runeheim is green again.'],
    ['t','The road on','{T} walking away together down a grassy road toward the horizon','Your journey goes on.']]);
  S('worldtree','The World Tree under the lake',89,'all forty spirits free, after the end','After the end, the last spirit is freed. Its line races to join the others, and all forty draw one great World Tree across Runeheim. The tree\'s light flows into Mirror Lake and shines under the water like a tattoo — and stays.',['sc_pn_world_tree','sc_pn_saga_tattoo'],[
    ['h','The fortieth','{H} by a bindstone in a green land as the last spirit rises free','The fortieth spirit, free.'],
    [0,'The last line','its line of light racing across the land to join the others','Its line ran to meet the others.'],
    [0,'One tree','from high above: all the lines of light across Runeheim joining into one great World Tree','Forty lines — one tree.'],
    [0,'Into the lake','the tree\'s light flowing down into Mirror Lake','Its light flowed into the lake…'],
    [0,'Under the water','Mirror Lake from above at twilight, a vast World Tree of rune-blue and gold light glowing deep under its water','…and shone under the water like a tattoo.'],
    ['t','On the pier','{T} on the village pier at night looking down at the glowing tree under the water, an aurora above','Where the twins were found, the World Tree shines.'],
    [0,'Boats over light','small boats with lanterns drifting over the glowing tree','And it stayed.'],
    [0,'Whole','a wide view of the lake, the spires and the glowing tree, shooting stars','Whole at last.']]);

  // ═══ round 81c: Kris's notes on the montages (docs/37 §6; answers in docs/08 › Round 81c) ═══
  // · "more scenes that shouldn't have the heros yet": the glimpses' frames in Asgard (gate, two lights 2–5). · "we also need to plan the entire
  //   scenes with zeldara instead of zeldor, when you choose zeldara as your hero": the hero style picture put the boy hero into frames that both
  //   versions share — so every frame now either shows the hero you play (a Zeldor and a Zeldara version), both twins, or neither twin (no hero
  //   picture sent, and said so). · The boss forms show the whole boss in every step (Surtharn's colours kept, Solmyrk as the three approved
  //   forms, the last one a dark demon, not bright). · A new montage: Solmyrk defeated (to the golden doors); the feast hall is its own montage,
  //   empty of people, the orbs with Odin and Freya inside. · The Lodestar set at Asgard's heart; Zeldara, not Freya, after the spring; the
  //   celebration's Zeldara always the same girl; the first parents (and Pip and Wren's) are other villagers.
  var SC_=function(id){ return ZSB.SCENES.find(function(s){ return s.id===id; }); };
  var renum=function(sc){ sc.beats.forEach(function(b,i){ b.n=i+1; var base='sb_'+sc.id+'_'+('0'+b.n).slice(-2); b.ids=(b.who==='h'||b.who==='o')?[base+'_m',base+'_f']:[base]; }); };
  ZSB.R81C=[];      // the frames to paint again (their scene ids, numbered as now)
  var fix=function(id,n,o){ var sc=SC_(id), b=sc.beats[n-1]; Object.keys(o).forEach(function(k){ b[k]=o[k]; }); b.r81c=true; };
  var nohero=function(id,list,extra){ list.forEach(function(n){ var b=SC_(id).beats[n-1]; b.nohero=true; b.r81c=true; if(extra)b.desc+=extra; }); };
  var SURTLOOK=' — Surtharn as in the reference: a colossal fire giant of cracked black-and-orange molten rock, lava glowing in the cracks, a flaming orange beard and blazing eyes; only the giant (no other person) is in the picture';
  var SURTREF=function(k){ return ['sc_pn_surt_'+k,'sc_surth_phases']; };
  var SOL1='Solmyrk in his first form, the Gilded Seraph (copy the reference exactly: three pairs of great golden wings, a full-face golden helm with a single glowing white eye-slit and a tall mitre-like crest, a cope of white and gold, a sun-star scepter, hovering with no legs)';
  var SOL2='Solmyrk in his second form, Wings of Ash (copy the reference exactly: the tall crested golden helm cracked open and behind the crack a black demon face with white slit eyes, dark black-steel armour with gold filigree under torn white-and-gold robes, white feathered wings burning black at the tips, two thin black clawed shadow-arms, two ravens circling, a golden scepter)';
  var SOL3='Solmyrk in his last form, the Hollow King (copy the reference exactly: a towering shape of black smoke with a crown of black flame-horns, a face that is only five curved white slashes of light, four long arms ending in hooked claws, the body dissolving into black mist; a dark demon — not bright, not golden)';
  var WHOLE=' His whole figure is in the picture, head to wings, not only the mask';
  // the glimpses: no hero in Asgard (Kris; R1: Zeldor stays on the hill in the first and last frames)
  nohero('gate',[2,3,4,5]); nohero('orbs',[2,3,4,5]);
  // frames the hero belongs in become a Zeldor and a Zeldara version
  fix('lodestar',6,{who:'h',desc:'streams of green, blue, amber and red light pouring from the four glasses into the staff on the anvil; {H} beside the anvil shielding {H}\'s eyes'});
  fix('lodestar',7,{who:'h',desc:'a blinding white star igniting in the ring at the staff\'s crown, light blasting across the cavern; {H} thrown back a step by the light'});
  fix('escape',6,{who:'h',desc:'the great black volcano island breaking apart and sinking into a boiling sea in a ring of steam; {H} small on the mainland rocks in the foreground, watching'});
  fix('asgard',1,{who:'h',desc:'night over Mirror Lake and the village on its shore: the clouds parting in a great ring of golden light; {H} small on the village pier, looking up'});
  fix('asgard',2,{who:'h',desc:'within the ring of light, the underside of a white-and-gold city of spires appearing; {H} on the pier shading {H}\'s eyes'});
  fix('asgard',3,{who:'h',desc:'the city lowering slowly on beams of light; villagers crowding the pier, {H} at the front'});
  fix('asgard',4,{who:'h',desc:'the city touching the lake; a wave of golden light rolling across the water toward the pier where {H} stands'});
  nohero('bifrost',[3]);
  fix('bifrost',5,{who:'h',desc:'a bridge of rainbow light building outward across the dark lake toward Asgard\'s golden gate; {H} at the end of the pier, the Lodestar blazing in the notch beside {H}'});
  fix('bifrost',6,{who:'h',desc:'spirits floating along both sides of the rainbow bridge like lanterns; {H} small at the start of the bridge, looking along it'});
  // Surtharn: the whole giant in every step, his own colours, his own hands
  ['surt1','surt2','surt3','surt4','surt5','surt6'].forEach(function(id,k){ SC_(id).refs=SURTREF(k+1); nohero(id,[1,2,3,4,5]); });
  [['surt1',[4,5]],['surt2',[1,2,3,5]],['surt3',[1,4,5]],['surt4',[1,2,5]],['surt5',[1,3,4,5]],['surt6',[1,2,3,5]]].forEach(function(q){ q[1].forEach(function(n){ SC_(q[0]).beats[n-1].desc+=SURTLOOK; }); });
  fix('surt2',4,{desc:'close on Surtharn himself: the molten iron of his melted greatsword climbing up HIS OWN huge arms and chest and hardening into dark iron armour plates'+SURTLOOK});
  fix('surt4',3,{desc:'great curling black horns bursting from the brow of the same molten giant as in the frames before and after — black-and-orange molten rock glowing with lava, a flaming orange beard, blazing eyes (NOT pale, NOT white, NOT blue, NOT furred, NOT a frost giant)'+SURTLOOK});
  fix('surt4',4,{desc:'the Horned Jötunn — the horned molten giant himself — plunging HIS OWN huge clawed hand into a river of lava to draw out a sword'+SURTLOOK});
  fix('surt4',6,{desc:'{H} tiny at the feet of the Horned Jötunn, looking up; the horned molten giant holds high the blazing Sword of Flame he has just drawn from the lava'});
  fix('surt5',2,{desc:'the lava lake boiling and churning, great bubbles bursting, steam rising — the giant has sunk beneath it: no figure, no giant, no hand, no person in the picture'});
  fix('surt6',4,{who:'h',nohero:false,desc:'the whole cavern erupting with fire around {H}, alone, shielding against the blast (the other twin is not here)'});
  // Solmyrk: his whole figure in every step, as the three approved forms
  SC_('sol1').refs=['sol_ref_1','sc_pn_sol_0']; SC_('sol2').refs=['sol_ref_2','sc_pn_sol_12_a','sc_pn_sol_12_b']; SC_('sol3').refs=['sol_ref_3','sc_pn_sol_23_a','sc_pn_sol_23_b'];
  nohero('sol1',[1,2,3,4,5]); nohero('sol2',[1,2,3,4,5]); nohero('sol3',[1,2,3,4,5]);
  fix('sol1',2,{desc:'on the high seat at the end of the white-and-gold hall, still as a statue: '+SOL1+', wings folded'});
  fix('sol1',3,{desc:SOL1+', rising slowly from the high seat into the air'});
  fix('sol1',4,{desc:SOL1+', unfolding his great golden wings from HIS OWN back above the high seat — the wings are Solmyrk\'s; no one else in the picture has wings'});
  fix('sol1',5,{desc:SOL1+', raising his scepter, light pouring off him across the hall — a god of gold'});
  fix('sol2',1,{desc:'a beam of white light striking the golden helm of '+SOL1+'; he reels in the air.'+WHOLE});
  fix('sol2',2,{desc:'a jagged crack running down the middle of Solmyrk\'s tall crested golden helm as he hangs in the air above the high seat — '+SOL1+'.'+WHOLE});
  fix('sol2',3,{desc:'black light pouring out of the crack in Solmyrk\'s helm, black ash creeping into the edges of his golden wings and robes.'+WHOLE});
  fix('sol2',4,{desc:'Solmyrk\'s own wings tearing into black ash on one side — the wings are on Solmyrk; no one else in the picture has wings.'+WHOLE});
  fix('sol2',5,{desc:SOL2+' — the Cracked Mask, whole, hovering over the hall'});
  fix('sol2',6,{desc:'{H} bracing against a wind of black and gold light pouring from '+SOL2+', who looms over {H}'});
  fix('sol3',1,{desc:'Solmyrk\'s cracked helm shattering into spinning gold shards, the black demon face behind it laughing; '+SOL2+'.'+WHOLE});
  fix('sol3',2,{desc:'all the light of the throne hall streaming in long golden rivers INTO Solmyrk, who hangs whole at the centre of the hall, his wings burning away into black ash, the white pillars going grey (not an empty throne)'});
  fix('sol3',3,{desc:'Solmyrk swelling into a towering black storm, the Hollow King taking shape in the thunderheads: '+SOL3});
  fix('sol3',4,{desc:SOL3+', looming before an eclipsed sun with a thin white corona — his dark form fills the sky'});
  fix('sol3',5,{desc:'The Storm That Ends the World: '+SOL3+', at full size inside black thunderheads lit by white lightning, before the eclipsed sun — dark and terrible'});
  fix('sol3',6,{desc:'{H} tiny below '+SOL3+', raising the glowing Lodestar against the black storm'});
  // Solmyrk defeated — a montage of its own, to the golden doors (R3); the feast hall is the next one
  var FH=SC_('feasthall'), fhOld=FH.beats.slice(0,3), NOPPL='. The feast hall is EMPTY of people — no guests, no crowd, no villagers anywhere';
  ZSB.SCENES.splice(ZSB.SCENES.indexOf(FH),0,{id:'solfall',name:'Solmyrk defeated',wave:89,plays:'Solmyrk\'s last form beaten — to the golden doors',
    story:'The Lodestar\'s light strikes the Storm That Ends the World. The storm tears, the Hollow King comes apart, and the light he stole flows back into the hall. His golden mask falls in pieces; the citadel shakes, and behind the high seat golden doors swing open.',
    refs:['sol_ref_3','sc_pn_sol_23_b','sc_pn_fh_crumble'],beats:[
      {who:'h',title:'The Lodestar\'s light',desc:'{H} raising the Lodestar; a beam of white star-light from it striking the chest of '+SOL3,cap:'The Lodestar\'s light struck the storm.',refs:[]},
      {who:0,title:'The storm tears',desc:'the black storm tearing apart around '+SOL3+', white light bursting through the thunderheads',cap:'The storm tore open…',refs:[],nohero:true},
      {who:0,title:'The dark comes apart',desc:'the Hollow King\'s four arms and crown of black flame dissolving into smoke, his dark form collapsing inward',cap:'…and the dark came apart.',refs:[],nohero:true},
      {who:0,title:'The light comes home',desc:'golden light flowing back out of the fading darkness into the throne hall\'s pillars; the grey pillars turning white and gold again',cap:'The light he stole flowed home.',refs:[],nohero:true},
      {who:0,title:'The mask falls',desc:'the shattered golden mask clattering down the steps of the empty high seat as the last black smoke drifts away',cap:'His mask fell.',refs:[],nohero:true}].map(function(b){ b.r81c=true; return b; }).concat(fhOld.map(function(b){ b.r81c=true; if(b.title==='Golden doors')b.desc+='; the hall beyond the doors is empty and dusty — no people'; return b; }))});
  FH.beats=FH.beats.slice(3); FH.plays='in the feast hall, after Solmyrk — Godsbane'; FH.name='The feast hall — Godsbane';
  FH.story='You step into the empty, dusty feast hall of the gods, where two orbs float joined like an infinity sign with Odin and Freya asleep inside. Your twin comes running; together you cast Godsbane into the centre, the orbs crack and burst into a million shards — and Odin and Freya stand free as the hall wakes.';
  var fd=function(t,who,d,np){ var b=FH.beats.find(function(x){ return x.title===t; }); b.who=who; b.desc=d+(np===false?'':NOPPL); b.r81c=true; b.nohero=who===0; };
  fd('The feast hall','h','{H} stepping into a vast dusty feast hall: long empty tables, cobwebs, faded banners, two empty high seats');
  fd('The orbs','h','two great orbs of light floating joined like an infinity sign above the hall; inside them, dim and asleep, Odin in one and Freya in the other ('+GODS+'); '+LODE+' trembling in {H}\'s hand');
  fd('Your twin comes','o','{O} running in through the golden doors to {H}\'s side, the two joined orbs glowing above');
  fd('Together','t','{T}, seen from behind, both raising their hands and the Lodestar toward ONE pair of joined orbs shaped like an infinity sign, Odin asleep in one and Freya in the other — only these two orbs, no others');
  fd('Into the centre','t','one beam of white-gold light rising from {T} into the point where the two joined orbs meet — the same infinity-sign pair, Odin and Freya inside');
  fd('Cracks',0,'cracks of light spreading across the two joined orbs, Odin and Freya stirring inside');
  fd('A million shards',0,'the two joined orbs bursting into a million glittering shards of light filling the empty hall');
  fd('Free','t','in the falling light stand '+GODS+'; {T} before them — only these four in the hall');
  fd('The hall wakes','t','the feast hall alive again: dust gone, banners bright, candles lighting themselves along the long empty tables, golden light; {T} alone in the middle of the hall, looking around in wonder');
  renum(SC_('solfall')); renum(FH); ['lodestar','escape','asgard','bifrost','surt6'].forEach(function(id){ renum(SC_(id)); });
  // the spirits go home: the Lodestar at the heart of the circle
  fix('home',3,{who:'t',desc:LODE+' set upright at the centre of the great rune circle in the heart of Asgard, a pillar of white-gold light shooting from its star up into the night clouds, an aurora flaring around it; {T} at the circle\'s edge'});
  // lightning and vines: the twins (Zeldara — not Freya) watch the land change
  var ZF='. Zeldara is the girl with long auburn braids, silver clasps, a teal gem on her brow and a teal-green mantle with a fur collar — not the red-gold-haired goddess; neither god is in this picture';
  nohero('village',[2]);
  [[5,'green vines with white flowers racing out from the green along the glowing soul-lines in every direction; {T} watching from the edge of the green'],[6,'from a hilltop: {T}, seen from behind, looking out as the lines of light across the land turn into roads of grass and stone, like a tree drawn on the world'],
   [7,'monsters across the land fading into drifting motes of light; {T} on a ridge watching them go'],[8,'the four forge-towers at sea sinking into the waves in steam; {T} on the shore watching'],[9,'the white-and-gold city sinking into Mirror Lake until only its golden spires stand above the water; {T} on the village pier'],
   [10,'villagers with carts and children walking out along the new grassy roads; {T} waving them off at the village gate'],[11,'small hamlets with houses and gardens rising round runestones across the land; {T} walking a new road between them'],
   [12,'night over a green Runeheim, an aurora borealis and shooting stars over the lake and the spires; {T} sitting together on a hill']].forEach(function(q){ fix('village',q[0],{who:'t',desc:q[1]+ZF,nogods:true}); });
  // the celebration: one Zeldara throughout; the first parents (and Pip and Wren's) are other villagers
  var ZC=' Zeldara exactly as in her reference — long auburn braids with silver clasps, a small teal gem on her brow, a teal-green mantle with a pale fur collar — the only girl dressed like this', PAR='a young village mother (dark hair under a simple headscarf, a plain wool dress) and a young village father (a broad young farmer with a short beard) — ordinary villagers, NOT the twins';
  [1,2,8].forEach(function(n){ var b=SC_('celebrate').beats[n-1]; fix('celebrate',n,{desc:b.desc+ZC}); });
  fix('celebrate',4,{desc:'in a cosy room, '+PAR+': the mother holding their newborn, the father laughing, Elder Runa in the doorway in tears',nohero:true});
  fix('celebrate',5,{who:0,desc:'Pip and Wren, two young village children (as in the references), running across the green into the arms of their parents — '+PAR,cap:'Pip and Wren, among the first.',nohero:true});
  nohero('celebrate',[3,7]);
  // the World Tree: the tree alone where no twin is named
  nohero('worldtree',[2,3,4,5,7,8]);
  ['home','village','celebrate'].forEach(function(id){ renum(SC_(id)); });
  ZSB.R81C=[].concat.apply([],ZSB.SCENES.map(function(sc){ return [].concat.apply([],sc.beats.filter(function(b){ return b.r81c; }).map(function(b){ return b.ids.map(function(i){ return 'sc_'+i; }); })); }));
  // ── for tools/video/storyboards.py (build.mjs → sprites/requests/storyboards.json): each frame's scene with the hero named, per version ──
  ZSB.NEG='text, captions, subtitles, logos, watermark, extra people, new characters, face changes, distorted hands, photorealism, 3D render look, style change, flicker';
  ZSB.export=function(){ var nm={m:'Zeldor',f:'Zeldara'}; return {neg:ZSB.NEG,redo81c:ZSB.R81C,scenes:ZSB.SCENES.map(function(s){ return {id:s.id,name:s.name,wave:s.wave,plays:s.plays,story:s.story,beats:s.beats.map(function(b){
      var f=function(k){ var o=k==='m'?'f':'m'; return b.desc.replace(/\{H\}/g,nm[k]).replace(/\{O\}/g,nm[o]).replace(/\{T\}/g,'the twins Zeldor and Zeldara').replace(/\{K\}/g,'the little twins'); };
      return {n:b.n,who:b.who,title:b.title,cap:b.cap,ids:b.ids,m:f('m'),f:f('f')}; }),montage:(function(){ var o={}; ZSB.whos(s).forEach(function(w){ o[w]=ZSB.montage(s,w); }); return o; })()}; })}; };
  // ── round 79b: the montage words for the video app (tools/video/storyboards.py writes them as montage.txt; the Lab shows them) ──
  ZSB.SECS=5;
  ZSB.whos=function(sc){ return sc.beats.some(function(b){ return b.ids.length>1; })?['zeldor','zeldara']:['all']; };
  ZSB.shot=function(b,who){ var nm={m:'Zeldor',f:'Zeldara'}, k=who==='zeldara'?'f':'m', o=k==='m'?'f':'m';
    return b.desc.replace(/\{H\}/g,nm[k]).replace(/\{O\}/g,nm[o]).replace(/\{T\}/g,'the twins Zeldor and Zeldara').replace(/\{K\}/g,'the little twins'); };
  ZSB.montage=function(sc,who){ var n=sc.beats.length, L=['CUT-SCENE  '+sc.name+'  ('+sc.id+(who==='all'?'':', you play '+who.charAt(0).toUpperCase()+who.slice(1))+')','PLAYS  '+sc.plays,'','STORY',sc.story,'',
      'VIDEO (paste this as the prompt, with the '+n+' pictures attached in order)',
      'One continuous montage of '+n+' mini scenes, 16:9, about '+(n*ZSB.SECS)+' seconds in all. Each attached picture, in order, is the first frame of its own mini scene of about '+ZSB.SECS+' seconds; each mini scene moves gently from its picture (a slow camera move; cloth, hair, mist, fire and light moving; magic glowing and flowing), then a soft quick cut or cross-fade into the next. Keep every painting\'s style, colours and light exactly; the characters keep the same faces, clothes and proportions from shot to shot. No text, no captions, no logos.','','SHOTS'];
    sc.beats.forEach(function(b,i){ L.push((i<9?' ':'')+(i+1)+'. '+('0'+b.n).slice(-2)+'.png  '+b.title+' — '+ZSB.shot(b,who).replace(/\.$/,'')+'.   Line under it: '+b.cap); });
    L.push('','NEGATIVE PROMPT (if the app has the box)',ZSB.NEG,'','If the app cannot take all '+n+' pictures at once: make each shot as its own clip from its picture (about '+ZSB.SECS+' s, the shot\'s words as the prompt) and save them as '+sc.id+'_'+who+'_<nn>.mp4 — the intake joins them into one montage.');
    return L.join('\n')+'\n'; };
  // ── the sheets for the painting script (generate.mjs --set scenery --wave 85…89) ──
  if(typeof ZSCN==='undefined')return;
  Object.keys(ZSB.WAVES).forEach(function(w){ ZSCN.WAVES[w]='Round 79 — '+ZSB.WAVES[w]; });
  // the characters are described once, up front; in the scene they are named (the hero you play: {H}; the other twin: {O}; both: {T}; as children: {K})
  var NAME={m:'Zeldor',f:'Zeldara'};
  var CAST={Bram:'Bram the Builder (a stocky bearded man in a flat cap and a leather work-vest, with a big hammer — exactly as in the character reference)',
    Mira:'Mira the Mechanic (a young woman with wild red hair, brass goggles, work overalls and a tool belt — exactly as in the character reference)',
    Dunn:'Dunn the dwarf forger (a big red beard, a leather apron, a heavy hammer — exactly as in the character reference)',
    Vela:'Captain Vela, a sky captain (exactly as in the character reference)',
    'Elder Runa':'Elder Runa, the village elder (exactly as in the character reference)',
    Odin:'Odin (very tall, one eye under a leather patch and the other glowing rune-blue, a long silver-white beard braided with gold rings, a wide grey hat, a deep blue wolf-fur cloak, the spear Gungnir, a black raven on his shoulder — warm and natural, NOT golden, NOT masked; exactly as in the character reference)',
    Freya:'Freya (warm golden-brown skin, long red-gold hair braided with white and yellow flowers, a green-and-gold gown, a falcon-feather cloak, a glowing amber necklace — warm and natural, NOT golden-white, NOT masked; exactly as in the character reference)'};
  var fill=function(t,k){ var o=k==='m'?'f':'m', who=[];
    Object.keys(CAST).forEach(function(n){ if(t.indexOf(n)>=0&&!((n==='Odin'||n==='Freya')&&/\(the old one-eyed god/.test(t)))who.push(CAST[n]); });
    if(/\{H\}/.test(t))who.push(ZSB.HERO[k]); if(/\{O\}/.test(t))who.push(ZSB.HERO[o]); if(/\{T\}/.test(t))who.push(ZSB.TWINS); if(/\{K\}/.test(t))who.push(ZSB.KIDS);
    var body=t.replace(/\{H\}/g,NAME[k]).replace(/\{O\}/g,NAME[o]).replace(/\{T\}/g,'the twins Zeldor and Zeldara').replace(/\{K\}/g,'the little twins');
    return (who.length?'Who is in it: '+who.join('; ')+'. The scene: ':'The scene: ')+body; };
  // round 81 (Kris: "there are many points in the story that zeldara and zeldor are not yet born or at the age of the game, but they show up in
  // the image. they need to be removed for all of the frames where they are not yet grown up and part of the saga yet"): the frames set before
  // the twins (the opening's first five, the four realms' falls, the truth's memories) get no hero style picture, the old saga panels (no
  // heroes in them) as the style to match, and a plain line that the twins are not there. ZSB.REDO81: the frames painted again.
  ZSB.PAST={quiet:1,ashnight:1,stonefall:1,blacktide:1,opening:[1,2,3,4,5,6,7],truth:[3,4,5]};
  ZSB.PASTREF={quiet:['sc_pn_saga_quiet_b','sc_pn_saga_cradles'],ashnight:['sc_pn_saga_ashnight_b','sc_pn_saga_quiet_b'],stonefall:['sc_pn_saga_stonefall_b','sc_pn_saga_quiet_b'],blacktide:['sc_pn_saga_blacktide_b','sc_pn_saga_quiet_b'],
    opening:['sc_pn_saga_storm_b','sc_pn_saga_cradles','sc_pn_saga_quiet_b'],truth:['sc_pn_saga_storm_b','sc_pn_saga_basket']};
  ZSB.past=function(id,n){ var P=ZSB.PAST[id]; return P===1||(P&&P.indexOf(n)>=0); };
  ZSB.PASTNO=function(id,n){ return id==='truth'?'. A memory from before the twins were born: Zeldor and Zeldara are NOT in this picture as children or as young heroes — they exist here only as the two tiny sparks of light described':
    id==='opening'&&n>=6?'. The twins appear ONLY as two newborn babes wrapped in the basket — no older child, no young hero, no boy in a green cape, no girl with auburn braids anywhere else in the picture':
    '. This happens long before the twins Zeldor and Zeldara were born: they are NOT in this picture — no young hero, no boy in a green cape, no girl with auburn braids, no white-haired companion, no adventurer watching from the side or the foreground. Only the people and things described: villagers, miners, travellers and spirits of that time, a mix of skin tones as in the reference panels'; };
  ZSB.NOHERO='. Neither twin is in this picture — no young hero, no boy in a green cape, no girl with auburn braids, nobody watching from the side or the foreground; only what is described';
  ZSB.REDO81=['opening_01','opening_02','opening_04','opening_05','truth_04','truth_05'].concat([].concat.apply([],['quiet','ashnight','stonefall','blacktide'].map(function(r){ return [1,2,3,4,5,6,7].map(function(n){ return r+'_0'+n; }); }))).map(function(x){ return 'sc_sb_'+x; });
  var out=[];
  ZSB.SCENES.forEach(function(sc){ sc.beats.forEach(function(b){ var base='sb_'+sc.id+'_'+('0'+b.n).slice(-2), past=ZSB.past(sc.id,b.n), nh=!past&&b.nohero, refs=(past?ZSB.PASTREF[sc.id].concat(sc.refs).concat(b.refs):nh?sc.refs.concat(b.refs):(b.who==='h'||b.who==='o'||b.who==='t')&&b.r81c?['sc_pn_end_dawn_b'].concat(sc.refs).concat(b.refs):ZSB.BASE.concat(sc.refs).concat(b.refs)).filter(function(r){ return !(b.nogods&&/^god_/.test(r)); }).slice(0,6);      /* round 81c: no hero picture where no twin belongs */
      var one=function(id,k,extra){ var d=ZSB.STYLE+fill(b.desc,k||'m')+ZSB.EPIC+(past?ZSB.PASTNO(sc.id,b.n):nh?ZSB.NOHERO:'')+ZSB.NO; out.push({id:'sc_'+id,wave:sc.wave,fam:'panels',kind:'room',panel:true,cols:1,rows:1,size:'1536x1024',noStyle:past||nh||undefined,refs:refs.concat(extra||[]).slice(0,8),title:'Story frame — '+sc.name+', '+b.n+'. '+b.title+(k?(k==='m'?' (you play Zeldor)':' (you play Zeldara)'):''),items:[[id,b.title,d,1536,1024]],sb:{scene:sc.id,n:b.n,k:k||''}}); };
      if(b.who==='h'||b.who==='o'){ one(base+'_m','m',['hero_m.model'].concat(b.who==='o'?['hero_f.model']:[])); one(base+'_f','f',['hero_f.model'].concat(b.who==='o'?['hero_m.model']:[])); }
      else { one(base,null,b.who==='t'?['hero_m.model','hero_f.model']:[]); } }); });
  ZSB.count=out.length; ZSCN.SHEETS=ZSCN.SHEETS.concat(out);
  // the request text: the style panels set the look; the character references (heroes, builders, gods, elder, children) set who looks how
  var b0=ZSCN.body; ZSCN.body=function(S){ if(!S||!S.sb)return b0.apply(ZSCN,arguments); var it=S.items[0];
    return 'Create ONE image for a 2D action RPG called The Quests of Zeldara and Zeldor: '+S.title+' — one frame of a story cut-scene told in pictures, which will be animated into a short video.\n'+
      'The reference images: the painted story panels show the style, light and finish to match (not their scenes); the character sheets and model sheets show exactly how the named characters look — draw them exactly like that (faces, hair, outfits, proportions), in the same bold hand-drawn cartoon look, not a photo, not 3D.\n'+
      'Subject: '+it[2]+'.\nThe painting fills the whole image edge to edge like a wide film still, with room for the action to move. No text, no labels, no frame, no UI.'; };
})();
