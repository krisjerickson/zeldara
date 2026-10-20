// ═══════════════════════════════════════════════════════════════════════
// ║ 07zh-hamlet-folk.js — round 69: THE HAMLET FOLK AND THEIR WORKSHOPS (shared by the game and the Lab).
// ║ Kris: "hamlet buildings should work like normal buildings … you should be able to go into them using tab. They should also have thematic
// ║ interiors based upon the spirits you released, and create new NPCs for each of these hamlet buildings based upon their trade and other
// ║ details". Answers (docs/08 round 69, H2–H5): 40 people, kin of the spirit; painted sprites; new trade furniture and each spirit's keepsake;
// ║ workshops open, homes solid.
// ║  · ZHAM.TRADES — per trade: the furniture (scenery wave 78, hf_<trade>_a…d), what the kin wears and does, a line about the trade.
// ║  · ZHAM.KIN — per spirit (ZSPIRIT40 order): the kin who keeps the workshop (a CH character, painted sheet hk_<spirit>.core.f), the keepsake
// ║    on the wall (wave 79, hk_<spirit>), and what they say of the spirit.
// ═══════════════════════════════════════════════════════════════════════
var ZHAM={
  REALM:['','Grasslands','Wetlands','Highlands','Ashlands'],
  RLOOK:{1:'a sprig of meadow flowers at the belt',2:'reed-green and river-blue cloth, marsh boots',3:'a wool cloak against the mountain wind',4:'ash-grey cloth with a little ember-red trim'},
  // trade: [furniture ×4 (id suffix, name, look, w, h)], what the kin wears, what they do at work, the trade's line, palette, sprite plan anim
  TRADES:{
    weaver:{f:[['loom','Great loom','a big upright wooden warp-weighted loom with a half-woven blue and red rune-pattern cloth on it',64,80],['wheel','Spinning wheel','a wooden spinning wheel with a tuft of wool',44,44],['wool','Wool baskets','two baskets heaped with skeins of dyed wool, blue, red and gold',44,32],['bolts','Cloth shelf','a shelf of folded woven cloths and rolled rugs',56,64]],
      wear:'a woven tunic with a patterned border, a distaff tucked in the belt',doing:'Throws the shuttle through the loom and beats the weft down.',line:'Every thread on this loom was spun from our own sheep. The pattern is the old one — the World-Tree, the way the land wears it now.',pal:'#3a5a9a,#8a2a2a,#e0b040',anim:'craft'},
    shipwright:{f:[['hull','Boat on trestles','a small half-built clinker boat on wooden trestles, planks overlapping',96,48],['bench','Shaping bench','a heavy workbench with an adze, a drawknife and curled wood shavings',64,40],['ropes','Rope coils','coils of thick rope and a pot of pitch',40,32],['oars','Oar rack','a rack of new oars and a carved dragon prow leaning against it',48,72]],
      wear:'a leather apron over a rough shirt, sleeves rolled, an adze at the belt',doing:'Planes a long oak plank with steady strokes.',line:'The lake is open again — everyone wants a boat. I build them the way my kin did: overlapping planks, iron rivets, a little prayer in each.',pal:'#6a4a2a,#3a5a7a,#e8d8b0',anim:'hammer'},
    netmender:{f:[['rack','Net frame','a wooden frame with a big fishing net stretched across it, half mended',72,64],['floats','Float baskets','baskets of glass fishing floats and cork floats',44,32],['twine','Twine table','a low table with balls of twine, a netting needle and a knife',56,36],['nets','Hanging nets','nets and lines hanging from pegs with shells tied on',56,56]],
      wear:'a knitted cap, fingerless gloves and a netting needle behind one ear',doing:'Knots twine into a torn net with quick fingers.',line:'A net is only holes tied together with care. Like a family, my grandmother said.',pal:'#4a6a7a,#c8b890,#2a3a4a',anim:'craft'},
    fisher:{f:[['racks','Drying rack','a wooden rack hung with drying fish',64,56],['barrels','Fish barrels','barrels of salted fish and a scale',44,40],['rods','Rod rack','fishing rods and a landing net on a rack',40,72],['pots','Lobster pots','stacked woven lobster pots and a coil of line',48,40]],
      wear:'an oilskin coat, tall boots and a woolly hat',doing:'Guts and salts the morning\'s catch.',line:'The fish came back with the green. The lake gives again — and it gave us you two, once.',pal:'#2a5a7a,#e8c040,#3a3a3a',anim:'fish'},
    beekeeper:{f:[['skeps','Bee skeps','three round straw bee-skeps on a bench, a few bees about',72,48],['jars','Honey shelf','shelves of honey jars glowing gold and beeswax candles',56,64],['press','Honey press','a wooden honey press dripping into a bucket',44,48],['veil','Veil and smoker','a hat with a veil and a bee smoker on a hook',40,48]],
      wear:'a wide hat with a net veil pushed back, a smoker at the belt',doing:'Lifts a honeycomb frame and smiles at the bees.',line:'The bees left when the sky went quiet. They came back the morning the vines grew. They always know first.',pal:'#e8b030,#6a5a2a,#f8f0d0',anim:'craft'},
    carver:{f:[['figure','Half-carved log','a log half carved into a standing bear',48,72],['bench','Carving bench','a bench with chisels, mallets and wood shavings',64,40],['panel','Rune panel','a carved wooden panel of knotwork and runes leaning on the wall',56,64],['heads','Dragon heads','two carved dragon heads for a hall\'s gables',56,48]],
      wear:'a leather apron full of chisels, wood shavings in the beard or hair',doing:'Taps a chisel with a wooden mallet.',line:'You don\'t carve wood. You find what\'s in it and let it out. The knotwork on the old stones — I learned it from them.',pal:'#8a5a2a,#3a4a2a,#d8c098',anim:'hammer'},
    cooper:{f:[['barrels','New barrels','a stack of new oak barrels with iron hoops',64,56],['hoops','Hoop rack','iron hoops hanging on pegs and a hoop driver',44,56],['fire','Firing basket','a half-made barrel over a little fire basket',44,48],['staves','Staves','a bundle of oak staves and a shaving horse',56,40]],
      wear:'a leather apron, thick gloves, a hoop driver in hand',doing:'Hammers an iron hoop down onto a barrel.',line:'A good barrel holds anything — mead, fish, grain, secrets. Mine don\'t leak.',pal:'#7a5a3a,#4a4a52,#c8a868',anim:'hammer'},
    tanner:{f:[['frame','Stretching frame','a hide stretched on a wooden frame',56,64],['vats','Tanning vats','two big wooden vats of brown tanning water',64,44],['beam','Scraping beam','a sloping scraping beam with a curved knife',56,40],['leathers','Finished leathers','rolls and stacks of finished leather, a belt and boots',48,44]],
      wear:'a stained leather apron, sleeves rolled to the elbow',doing:'Scrapes a hide on the beam with a curved knife.',line:'It\'s smelly work, I know. But every boot and saddle in the hamlet came through my hands.',pal:'#7a4a2a,#5a5a3a,#c89068',anim:'craft'},
    dyer:{f:[['vats','Dye vats','three steaming dye vats, blue, red and yellow',72,44],['poles','Drying poles','lengths of dyed cloth hung on poles to dry, blue, red, yellow and green',64,72],['plants','Dye plants','baskets of woad leaves, madder roots and onion skins',48,32],['bench','Mordant bench','a bench with jars of mordant and a stirring paddle',56,40]],
      wear:'arms stained blue to the elbow, a patched apron of every colour',doing:'Lifts a length of blue cloth from the vat on a paddle.',line:'Woad for blue, madder for red. The runes used to be this blue — I try to match it every day.',pal:'#2a4aa8,#a82a3a,#e8c030',anim:'craft'},
    herder:{f:[['churn','Butter churn','a wooden butter churn and a milk pail',36,48],['cheese','Cheese shelf','a shelf of round cheeses on boards',56,64],['hay','Hay and feed','hay bales and a feed trough',64,40],['bells','Bells and halters','cow bells and rope halters hanging on pegs',48,40]],
      wear:'a sheepskin vest, a crook and a horn at the belt',doing:'Churns butter, humming to the cows outside.',line:'The goats are crying less these days. Happier, I think. So am I.',pal:'#6a7a3a,#8a6a4a,#e8e0c8',anim:'dig'},
    miller:{f:[['stones','Millstones','a pair of round millstones with a wooden hopper',64,56],['sacks','Flour sacks','stacked sacks of flour, one open with a scoop',56,44],['sieve','Sieve table','a table with sieves and fine flour dust',56,40],['gears','Wooden gears','big wooden cog-wheels and a shaft',56,64]],
      wear:'a flour-dusted cap and apron, white to the elbows',doing:'Pours grain into the hopper; flour dust rises.',line:'The wind turns the sails, the sails turn the stones, the stones feed the hamlet. Everything goes round again now.',pal:'#e8e0d0,#8a6a4a,#4a6a8a',anim:'carry'},
    stonemason:{f:[['block','Stone block','a big cut stone block with a mallet and chisel on it',56,44],['runestone','Unfinished runestone','a tall runestone half carved with knotwork',40,72],['tools','Tool rack','a rack of chisels, mallets, a square and a plumb line',48,56],['rubble','Stone pile','a heap of cut stones and gravel',56,32]],
      wear:'a stone-dust cloak, a leather cap and heavy gloves',doing:'Cuts a rune into a stone with mallet and chisel.',line:'I\'m carving a new runestone for the green. It\'ll say who came home, and who brought them.',pal:'#8a8a8a,#5a4a3a,#c8c0b0',anim:'hammer'},
    midwife:{f:[['cradle','Cradle','a carved wooden cradle with a soft blanket',48,36],['herbs','Herb shelf','shelves of dried herbs, jars of salve and clean linen',56,64],['tub','Washing tub','a wooden tub with warm water and towels',48,36],['chair','Birthing chair','a sturdy wooden chair with cushions and a shawl',40,56]],
      wear:'a clean white apron over a warm dress, a pouch of herbs',doing:'Rocks the cradle and folds clean linen.',line:'Three babes this month! Three! After so many years with nothing to hold. I cry every time.',pal:'#e8e0d8,#6a8a5a,#a85a6a',anim:'craft'},
    potter:{f:[['wheel','Potter\'s wheel','a kick-wheel with a pot half thrown on it',48,44],['kiln','Kiln','a small round brick kiln glowing inside',56,64],['shelf','Pot shelf','shelves of drying pots, jugs and bowls',56,64],['clay','Clay bin','a wooden bin of wet clay and a wire cutter',44,32]],
      wear:'clay to the elbows, a smock tied at the waist',doing:'Shapes a pot on the turning wheel.',line:'My grandmother fired urns for the dead that never cooled. I make cups now. Cups and cradles\' bowls.',pal:'#a85a3a,#6a4a3a,#d8b890',anim:'craft'},
    shepherd:{f:[['shears','Shearing bench','a low bench with shears and a fleece',56,36],['fleeces','Fleece pile','a soft pile of white and grey fleeces',56,36],['crook','Crook and lamb pen','a crook leaning on a little pen with a sleepy lamb',56,48],['spindle','Wool bags','bags of raw wool and a drop spindle',44,44]],
      wear:'a hooded wool cloak, a crook, a lamb under one arm',doing:'Shears a fleece with long careful snips.',line:'The flock counts more every spring now. Lambs everywhere. You\'d think the world was new.',pal:'#e8e0d0,#6a5a3a,#5a7a4a',anim:'carry'},
    smith:{f:[['forge','Forge','a stone forge with glowing coals and bellows',64,64],['anvil','Anvil','an anvil on a stump with tongs and a hammer',48,40],['quench','Quench barrel','a barrel of water with steam, a horseshoe in it',36,40],['rack','Tool rack','a rack of finished tools, horseshoes and a sword',56,64]],
      wear:'a scorched leather apron, bare arms, a hammer in hand',doing:'Hammers glowing iron on the anvil; sparks fly.',line:'Ploughs and hinges now, not chains. You can\'t know how good it feels to hammer something that isn\'t a chain.',pal:'#3a3a3a,#a84a2a,#e8a040',anim:'hammer'},
    forester:{f:[['logs','Log stack','a neat stack of split logs and an axe in a block',64,44],['saplings','Sapling pots','young trees in pots ready for planting',56,48],['bench','Tool bench','a bench with saws, wedges and a bow saw',56,40],['antlers','Antler rack','a shed antler rack with a hunting horn and a lantern',48,48]],
      wear:'a green hood, a hatchet at the belt, bark on the sleeves',doing:'Splits a log with one clean stroke.',line:'For every tree we fell, we plant two. The old forester\'s rule — my kin\'s rule.',pal:'#3a6a3a,#6a4a2a,#a8c870',anim:'chop'},
    brewer:{f:[['kettle','Copper kettle','a big copper brewing kettle over a fire',64,64],['casks','Casks','stacked casks with taps and a jug',56,48],['hops','Hops','hanging bunches of hops and a sack of barley',48,48],['horns','Drinking table','a table with drinking horns and a cask of mead',56,40]],
      wear:'a round belly, a leather apron and a ladle',doing:'Stirs the mash in the copper kettle.',line:'The first mead of every batch goes up the hill for the gods. This year someone came down to drink it.',pal:'#a86a2a,#6a3a2a,#e8c060',anim:'pour'},
    skald:{f:[['harp','Harp','a carved standing harp with a rune on its frame',40,64],['benches','Story benches','benches round a little fire pit',72,40],['scrolls','Saga shelf','a shelf of carved saga-sticks, scrolls and a drinking horn',56,64],['stone','Saga stone','a small carved picture-stone showing the twins and the World-Tree',40,56]],
      wear:'a bright cloak with a silver brooch, a harp on the back',doing:'Plucks the harp and recites a verse.',line:'I\'m making a new verse — the one that was always missing. It\'s about two who came from the water.',pal:'#6a2a8a,#e8c040,#2a4a6a',anim:'play'},
    baker:{f:[['oven','Bread oven','a domed stone bread oven with fire inside and a peel',64,64],['table','Kneading table','a table dusted with flour, dough and a rolling pin',64,40],['loaves','Bread shelf','shelves of round loaves, buns and braided bread',56,64],['sacks','Grain and baskets','a sack of flour and baskets of bread',48,40]],
      wear:'a floury apron, a kerchief, a loaf under the arm',doing:'Kneads dough on the floury table.',line:'Bread for the feast at midsummer — and this time someone came to take it up. Have a bun, it\'s still warm.',pal:'#e8d8b0,#a85a2a,#6a4a2a',anim:'pour'}
  },
  // per spirit (ZSPIRIT40 order): kin id, name, how they are kin, f/m, age, what they say of the spirit, the keepsake on the wall
  KIN:[
    ['asa','Hild','her granddaughter','f','grown','Grandmother wove twenty birth-shawls no child ever wore. This one I wore — the first. She\'d have laughed.','a small framed birth-shawl, blue with a white rune border, never worn'],
    ['bersi','Arni','his sister\'s grandson','m','young','Bersi died a boy, before he could build his first boat. I build them for him. Every one has his name cut in the keel.','a child\'s small toy boat carved of wood, on a little shelf'],
    ['dagny','Gunnhild','her niece','f','grown','Aunt Dagny saw two little lights on the water the night of the storm. Nobody believed her. Now everyone knows.','a scrap of mended net in a frame with a single glass float'],
    ['eyvind','Kari','his son','m','grown','Father used to say the lake gives when it wants to. It gave the land back. I think it wanted to.','an old fishing spear and a carved fish on a plaque'],
    ['frida','Solvi','her grandson','m','young','Grandmother said the bees knew before anyone. When they came back, I knew she was home.','a framed golden honeycomb with a dried meadow flower'],
    ['geir','Ottar','his great-grandson','m','young','Geir carved the tree on the village green when he was a boy. I carved this one, for the hamlet. Smaller. He\'d say too small.','a small carved wooden panel of the World-Tree, its roots reaching far'],
    ['hallveig','Steinar','her husband','m','old','I still set two cups out. Now I know she drinks the light. I pour hers anyway.','two wooden cups on a little shelf, one always full'],
    ['ingolf','Halla','his sister','f','grown','My brother said the Binders came from under the Ashlands. He was right. He was always right, the pest.','a pair of small leather boots hung on a peg'],
    ['jorunn','Edda','her daughter','f','grown','Mother\'s blue — the rune blue. I\'ve dyed a thousand cloths to find it again. This is the closest.','a framed length of rune-blue cloth with a white knot pattern'],
    ['ketil','Gorm','his nephew','m','grown','When Uncle Ketil died the goats wouldn\'t stop crying. Goats raised you, they say. Small world.','a goat\'s bell on a red cord and a curly horn'],
    ['liv','Ylva','her apprentice','f','young','Liv saw the mill wheel turn backwards the day the Black Tide came. It only turns the right way now.','a little wooden mill-wheel on the wall'],
    ['magni','Rurik','his son','m','grown','Father built the dikes higher every year. The water came up through. We don\'t need dikes now — the land stayed.','a stone mason\'s mark carved on a square of stone'],
    ['nanna','Inga','her apprentice','f','young','Nanna\'s hands had nothing to hold for eight years. Mine are full now. I think of her with every one.','a pair of tiny knitted baby shoes on a ribbon'],
    ['oddny','Tova','her granddaughter','f','grown','Grandmother\'s urns never cooled — something kept the dead from rising. I touch this one and it\'s cool. They rose.','a small old clay urn, cool and grey, with a rune on it'],
    ['ragna','Sigvald','her brother','m','old','My little sister thought the gods were sad, not angry. Seventy years old and she was wiser than me at six.','a little girl\'s wooden shepherd\'s crook and a straw doll'],
    ['sigrid','Hjalti','her apprentice','m','young','Sigrid took the Binders\' gold once. She told me never to. Then she spent her life making it right. I hammer for her.','a broken iron chain link, hung on the wall'],
    ['torvi','Asgerd','her daughter','f','grown','Mother heard the marsh trees whisper a name like a sun going out. The trees are quiet now. Good riddance to him.','a framed pressed marsh-tree leaf, silver-green'],
    ['ulf','Geirmund','his grandson','m','young','Grandfather\'s mead turned to ash in the cup once. Taste mine — not a speck of ash. To him!','an old carved drinking horn on a bracket'],
    ['vigdis','Saga','her pupil','f','young','Vigdis knew every saga but one verse. I\'m writing it now — about you.','a carved saga-stick with runes all along it'],
    ['yrsa','Bodvar','her son','m','grown','Mother baked bread for the feast in Asgard every midsummer. The last year no one came to take it. This year they did.','a round braided loaf of bread, dried and kept on a plaque'],
    ['arnor','Ragnhild','his daughter','f','grown','Father said the stone was singing. He wove the song into a cloth before the Scarp took him. Here it is.','a framed woven cloth with a pattern like a singing mountain'],
    ['bodil','Ivar','her grandson','m','grown','Grandmother built ships for a sea she could see from the peaks. The road\'s open again. I\'ll sail it for her.','a model ship with a striped sail in a niche'],
    ['dalla','Freydis','her niece','f','young','Aunt Dalla dreamed of light chained like hounds under the mountains. You set it loose. I mend nets for the lake folk now.','a net woven with tiny glowing beads'],
    ['einar','Leif','his little brother, now grown','m','grown','Einar saw Asgard in the mountain lakes, then only a golden mask. Now when I look — just stars. Lovely ordinary stars.','a polished round mirror of mountain-lake stone'],
    ['gudrun','Alva','her granddaughter','f','young','The Binders crushed Grandmother\'s golden queen bee first. Her daughters\' daughters are in my skeps now.','a tiny golden bee pinned on a little velvet cushion'],
    ['hakon','Sindri','his apprentice','m','young','Hakon said every rune in the mountains was carved toward the lake. Toward the village. Toward you two.','a small rune carving with an arrow-rune pointing to the lake'],
    ['ingrid','Thorkel','her son','m','grown','Mother said the Scarp was the mountain answering the fire. It\'s quiet now. Everything\'s answered.','an old cooper\'s hoop driver hung like a trophy'],
    ['joreid','Hrefna','her cousin','f','grown','Joreid was the last child born in the Highlands. She lived three summers. Our children play where she used to.','a child\'s leather shoe and a little wooden horse'],
    ['kolbein','Signy','his sweetheart, now grey','f','old','Kolbein said the one on the high seat had one eye and it had never seen anything. You saw everything. I waited for him fifty years. He\'s home.','a faded courting ribbon dyed blue, pinned in a frame'],
    ['lofn','Starkad','her son','m','grown','Mother watched two ravens circle the hills, crying, the year the gate shut. They came back to Asgard last spring. I saw them.','two black raven feathers crossed on a small plaque'],
    ['mord','Grima','his sister','f','grown','My brother Mord saw the sky go red, then grey. He was seven. I keep his little cart; children play with it now.','a child\'s small wooden flour cart'],
    ['njal','Hogni','his brother','m','grown','The Ember Wall rose in one night and my brother was on the wrong side. There are no wrong sides now.','a mason\'s chisel stuck in a chunk of cooled black glass'],
    ['orm','Birna','his daughter','f','grown','Father birthed a babe that never cried — the gate was already shut. Now they all cry, loudly. Thank the gods.','a little silver birth-bell on a ribbon'],
    ['ranveig','Eldrid','her apprentice','f','young','Ranveig said Surtharn wanted gems from every realm — a god had promised him them. A false god. False promises.','a clay bowl holding four small gems, one of each realm\'s colour'],
    ['sverri','Aslak','his grandson','m','young','Grandfather saw two lights go out above the clouds like eyes closing. You opened them again, didn\'t you?','an old shepherd\'s lantern, its glass blue'],
    ['thora','Thorvald','her son','m','grown','Mother forged the Binders\' chains — they made her. Then they put them on her. I melted every chain I found into this.','a horseshoe forged from old black chain iron'],
    ['unn','Vigi','her little brother, now grown','m','grown','Unn said break the fire and the sky would fall to us. It did — onto the lake. She was always strange. Always right.','a pine cone carved in obsidian on a small shelf'],
    ['vali','Gudny','his granddaughter','f','young','Grandfather said there were two thrones in the feast hall, and two moons inside it. Now there are gods again. And mead.','a small carved double-throne with two silver moons above it'],
    ['alfhild','Skuli','her son','m','grown','Mother sang that when the cycle breaks two will come from the water to mend it. She thought it was only a song. Ha!','a little carved figure of two children in a basket on the water'],
    ['brand','Helga','his granddaughter','f','young','Grandfather said ask the Lady of the Fields where the spring went. She brought it back. The vines are in my garden.','a dried green vine and a sprig of spring flowers in a frame']
  ],
  // the trades in ZSPIRIT40's order (each realm's ten spirits run through ten of them; the two halves of Runeheim share the twenty)
  ORDER:['weaver','shipwright','netmender','fisher','beekeeper','carver','cooper','tanner','dyer','herder','miller','stonemason','midwife','potter','shepherd','smith','forester','brewer','skald','baker'],
  kinId:function(i){ return 'hk_'+ZHAM.KIN[i][0]; },
  trade:function(i){ return ZHAM.ORDER[i%20]; },
  tradeName:function(t){ return t==='netmender'?'net-mender':t; },
  spirit:function(i){ var k=ZHAM.KIN[i][0], t=ZHAM.trade(i); return {key:k,name:k.charAt(0).toUpperCase()+k.slice(1),trade:(/^[aeiou]/.test(t)?'an ':'a ')+ZHAM.tradeName(t),q:Math.floor(i/10)+1}; },
  // what the kin says: hello, the spirit, the trade, the realm
  lines:function(i){ var K=ZHAM.KIN[i], S=ZHAM.spirit(i), T=ZHAM.TRADES[ZHAM.trade(i)]||{}, R=['','The Grasslands are green to the sea again. Like the old songs.','The Wetlands drained clean — the marsh flowers are back, and the frogs. So many frogs.','The Highlands are quiet now — the good quiet, birds and wind.','Grass on the Ashlands! Grass! My grandmother wouldn\'t believe it.'][S?S.q:1];
    return ['I\'m '+K[1]+', '+K[2].replace(/^(her|his) /,S.name+'\'s ')+'. Welcome to '+S.name+'\'s workshop.',K[5],T.line||'',R]; },
  look:function(i){ var K=ZHAM.KIN[i], S=ZHAM.spirit(i), T=ZHAM.TRADES[ZHAM.trade(i)]||{}, age={young:'a young',grown:'a grown',old:'an old, grey-haired'}[K[4]], who=K[3]==='f'?'woman':'man';
    return K[1]+', '+K[2].replace(/^(her|his) /,S.name+'\'s ')+' (the freed spirit was '+S.trade+'): '+age+' '+who+' of the '+(S?ZHAM.REALM[S.q]:'')+', '+T.wear+'; '+ZHAM.RLOOK[S?S.q:1]+'.'; }
};
// ── a workshop's inside (07v buildInterior 'ham_<n>'): the realm's walls and floor, the trade's four pieces of furniture (wave 78; drawn stand-ins
//    until they are in), the spirit's keepsake on the back wall between two windows (wave 79), a table, a rug, a plant; the kin at work ──
ZHAM.ROOM={1:{wall:'plaster',floor:'planks',wallA:'#e4d8bc',wallB:'#c8b48c',trim:'#7a5a3a',floorA:'#b88a5a',floorB:'#8a643a',light:'#ffd8a0',rug:'#4a7a3a',rug2:'#e8d8a0'},
  2:{wall:'boards',floor:'planks',wallA:'#8a7a5a',wallB:'#6a5a40',trim:'#3a5a5a',floorA:'#9a7a54',floorB:'#6e5434',light:'#d8f0d0',rug:'#2a5a6a',rug2:'#c8e0c0'},
  3:{wall:'stone',floor:'flag',wallA:'#8a8478',wallB:'#6a645a',trim:'#5a4a3a',floorA:'#8a8276',floorB:'#625c52',light:'#ffe8c0',rug:'#6a3a2a',rug2:'#e8c890'},
  4:{wall:'stone',floor:'flag',wallA:'#5a524e',wallB:'#423a36',trim:'#8a3a2a',floorA:'#5e5652',floorB:'#403834',light:'#ffb070',rug:'#7a2a1a',rug2:'#e8a050'}};
ZHAM.FB={0:'barrel',1:'crates',2:'sacks',3:'basket'};      // the drawn stand-ins for the four pieces
ZHAM.interior=function(n){ if(typeof INTERIOR_THEMES==='undefined'||INTERIOR_THEMES['ham_'+n])return; var S=ZHAM.spirit(n), t=ZHAM.trade(n), T=ZHAM.TRADES[t], K=ZHAM.KIN[n], R=ZHAM.ROOM[S.q];
  INTERIOR_THEMES['ham_'+n]=Object.assign({name:S.name+'\'s workshop',npc:ZHAM.kinId(n),blurb:K[1]+' keeps '+S.name+'\'s workshop: the '+ZHAM.tradeName(t)+'\'s tools, and '+S.name+'\'s keepsake on the wall.'},R);
  var F=T.f, P=function(i,x,y,w,h){ return ['hf',x,y,w,h,{pid:'hf_'+t+'_'+F[i][0],fb:ZHAM.FB[i]}]; };
  INTERIOR_LAYOUTS['ham_'+n]={ deco:[['window',2.6,1.2],['painting',6.3,1.4,null,'hk_'+K[0]],['window',10.2,1.2]], rug:[5,5,4,3], npc:[7,3.9],
    props:[P(0,1,2,3,2),P(1,10,2,3,2),P(2,1,5,3,2),P(3,10,5,3,2),['table',6,6,2,1,{top:['candle','plate']}],['stool',6,7,1,1],['stool',7,7,1,1],['plant',12,7,1,1],['plant',1,7,1,1]],
    lights:[[7,1.6,150,0.32,{}],[3,4,120,0.22,{pulse:0.12}],[11,4,120,0.22,{pulse:0.12}]], particles:t==='smith'||t==='potter'||t==='baker'?'embers':t==='miller'?'flour':'dust' }; };
// the forty kin as characters (CH, 07s): the painted sheet hk_<spirit>.core.f (idle, talk, work), drawn stand-ins until it is in
(function(){ if(typeof CH!=='function')return; ZHAM.KIN.forEach(function(K,i){ var t=ZHAM.trade(i), T=ZHAM.TRADES[t]||{}, S=ZHAM.spirit(i), pal=(T.pal||'#6a6a6a,#4a4a4a,#c8c8c8').split(','), skin=['#f0c8a0','#e0b08a','#c89070','#a87050'][i%4], hair=K[4]==='old'?'#d8d8d0':['#6a3a1a','#c89040','#2a1a10','#8a3a1a','#e8c878'][i%5];
    CH('npc','Hamlet folk',ZHAM.kinId(i),K[1],['person',T.anim||'craft',[pal[0],pal[1],pal[2],'#201810',skin,hair].join(','),(K[3]==='f'?'long,':'')+(K[4]==='old'?'grey,':'')+'apron'],
      'Their workshop in the hamlet of '+(S?S.name:'the spirit')+' (after the gods)',ZHAM.look(i),T.doing||'Works at their trade.','Kin of the freed spirit '+(S?S.name:'')+'.'); }); })();
// ═══ round 70 — A MIXED RUNEHEIM (Kris: "about half that are racially white, but remainder should be more variety of races, and racial mixes") ═══
// Looks for the people redrawn: the kin at odd places (twenty of forty, every realm and trade), about half the village folk and shopkeepers.
// Each look is added to the character's description (07zs) and tints its drawn stand-in; the painted sheets are ordered again (round74.ps1).
var ZHERIT={ LOOKS:[['dark brown skin and short tightly coiled black hair','#6a4028'],['warm light-brown skin, monolid eyes and straight black hair','#d8a878'],['brown skin and thick wavy black hair','#a0683c'],
    ['olive-brown skin and dark curly hair','#b88050'],['copper-brown skin and long straight black hair in braids','#a8683c'],['light brown skin, freckles and loose dark curls','#c08a5a'],
    ['deep brown skin and black locs','#5a3420'],['golden-tan skin and dark brown hair','#c89060'],['light olive skin, almond eyes and soft brown hair','#d8b088'],['medium brown skin and black hair with a silver streak','#8a5434']],
  VILLAGE:['npc_shop','npc_forge','npc_stables','npc_jeweler','npc_apothecary','vf_farmer','vf_fisher','vf_kid1','vf_guard','vf_vendor','vf_keeper'],
  kin:function(i){ return i%2===1; },      // the kin redrawn (odd places)
  apply:function(id,k){ var R=typeof CHAR_BY_ID!=='undefined'&&CHAR_BY_ID[id]; if(!R)return; var L=ZHERIT.LOOKS[k%ZHERIT.LOOKS.length]; R.heritage=L[0]; if(R.spec&&R.spec.pal&&R.spec.pal.length>4)R.spec.pal[4]=L[1]; } };
(function(){ if(typeof CHAR_BY_ID==='undefined')return; var k=0; ZHAM.KIN.forEach(function(K,i){ if(ZHERIT.kin(i))ZHERIT.apply(ZHAM.kinId(i),k++); }); ZHERIT.VILLAGE.forEach(function(id){ ZHERIT.apply(id,k++); }); })();
// ═══ round 70 — THE CHILDREN (answers C1, C2): twenty-four children, toddlers to young teens, born since the cycle turned again — or, the older
// ones, the last few born in the Quiet and the first since the storm. After the gods they play in the hamlets' yards and round the village, in little
// groups (tag, the swing, hide-and-seek, fishing at the pier, chasing the goats); [Tab] for a line. About half white, the rest of every background. ═══
var ZKIDS={
  // id, name, f/m, age (toddler/small/kid/teen), heritage look index (-1 = white), what they wear and carry, their game, their line
  L:[['ck_ylva','Ylva','f','kid',-1,'a red wool dress and a wooden sword','tag','I\'m the twin and you\'re the monster! No — I\'m BOTH twins!'],
    ['ck_bjorn','Little Bjorn','m','toddler',0,'a too-big knitted hat and a toy horse on a stick','goats','Goat! Goat! GOAT!'],
    ['ck_saga','Saga','f','teen',-1,'a blue tunic and a harp on her back','sing','I\'m writing a song about the twins. It rhymes "Runeheim" with "dinner time".'],
    ['ck_kai','Kai','m','kid',1,'a green tunic and a paper kite','kite','When I grow up I\'ll free spirits too. Are there any left? …Oh.'],
    ['ck_amara','Amara','f','small',0,'a yellow dress and flower crown','hide','Shh! I\'m hiding. You didn\'t see me.'],
    ['ck_eirik','Eirik','m','teen',-1,'a leather vest and a fishing rod','fish','The fish bite better since the gods came back. Probably. I haven\'t caught one yet.'],
    ['ck_noor','Noor','f','kid',3,'an embroidered tunic and a basket of eggs','tag','You\'re it! No touch-backs!'],
    ['ck_tove','Tove','f','toddler',-1,'a rabbit-ear hood and a rag doll','goats','Baa.'],
    ['ck_ravi','Ravi','m','kid',2,'a patched cloak and a slingshot','hide','I found a frog. I named him Solmyrk. He\'s very bad.'],
    ['ck_ingrid','Little Ingrid','f','small',-1,'a pinafore and two plaits','swing','Push me higher! Higher! To Asgard!'],
    ['ck_tariq','Tariq','m','teen',3,'a smith\'s apron, too big for him','tag','I\'m apprenticed to the smith. Mostly I sweep.'],
    ['ck_mei','Mei','f','kid',1,'a blue coat and a spinning top','swing','My grandmother says I was the first baby born in our hamlet. I\'m very important.'],
    ['ck_olaf','Olaf','m','small',-1,'a round belly, a bun in each hand','sing','I\'m not eating the buns. I\'m guarding them.'],
    ['ck_zuri','Zuri','f','teen',6,'a beaded headband and a bow','kite','I\'m going to be a ranger. I\'ve practised on the scarecrow. He\'s very still.'],
    ['ck_finn','Finn','m','kid',5,'a fox-fur hat and a wooden shield','tag','Bet you can\'t catch me! …Okay, you probably can.'],
    ['ck_asta','Asta','f','small',-1,'a green dress and a ball','hide','One… two… ten! Ready or not!'],
    ['ck_mateo','Mateo','m','kid',7,'a red scarf and a little drum','sing','Boom! Boom! That\'s the Lodestar. Boom!'],
    ['ck_sunniva','Sunniva','f','toddler',4,'a sheepskin wrap and a wooden spoon','goats','Sheep. No. GOAT.'],
    ['ck_leif','Little Leif','m','small',-1,'a too-long tunic and a toy boat','fish','My boat is called the Bifröst. It sinks a lot.'],
    ['ck_priya','Priya','f','teen',2,'a dyer\'s blue-stained hands and a scroll','sing','I can read runes now! That one says… "Do not lick the runestone."'],
    ['ck_gunnar','Gunnar','m','kid',-1,'a horned helmet made of a bucket','tag','Rawr! I\'m Surtharn! …I\'m a nice Surtharn.'],
    ['ck_hana','Hana','f','kid',8,'a lantern and a shawl','hide','The fairies are gone, but I still leave milk out. Just in case.'],
    ['ck_odin','Little Odin','m','toddler',-1,'an eyepatch made of a leaf','goats','I have ONE eye. Like the god. The other one\'s under the leaf.'],
    ['ck_lena','Lena','f','small',9,'a patchwork cloak and a jar of fireflies','swing','Did you really go to the sky? Was it cold? Did you bring me anything?']],
  AGE:{toddler:'a toddler, about three years old',small:'a little child, about six',kid:'a child, about nine',teen:'a young teen, about thirteen'},
  DO:{tag:'Runs and dodges, playing tag.',goats:'Toddles after a goat, giggling.',sing:'Sings and claps a game song.',kite:'Runs with a kite on a string.',hide:'Peeks out from behind something, playing hide-and-seek.',fish:'Fishes with a little rod, very patient.',swing:'Swings back and forth, kicking their feet.'}
};
(function(){ if(typeof CH!=='function')return; ZKIDS.L.forEach(function(K,i){ var L=K[4]>=0?ZHERIT.LOOKS[K[4]]:null, skin=L?L[1]:['#f0d0b0','#e8c0a0','#f4d8c0'][i%3], pal=['#c84030','#3a6a9a','#e0a030','#5a8a3a','#8a4a8a','#3a8a8a'][i%6];
  var R=CH('npc','Village folk · children',K[0],K[1],['person','play',[pal,'#4a3a2a','#e8e0c0','#201810',skin,K[4]>=0?'#1a1410':['#c89040','#8a5a2a','#e8c878'][i%3]].join(','),'child,'+(K[2]==='f'?'long,':'')+'rosy'],
    'The hamlets\' yards and the village (after the gods)',K[1]+': '+ZKIDS.AGE[K[3]]+', a '+(K[2]==='f'?'girl':'boy')+', '+K[5]+'; cheerful and full of mischief.',ZKIDS.DO[K[6]]||'Plays.','Born as the cycle turned again.');
  if(L)R.heritage=L[0]; R.kid=K[3]; }); })();
