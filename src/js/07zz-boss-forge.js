// ═══════════════════════════════════════════════════════════════════════
// ║ 07zz-boss-forge.js — round 56. The four forge-masters of Muspelheim (doc 28 §5), as painted-boss designs.
// ║ Kris (Oct 14): "I haven't yet see the new bosses for any of the volcanos come up, which we'll still need to make" → card: design options in the
// ║ Lab first (Bosses tab), and "a new form every phase" — so twelve forms (four masters × three phases), two or three options each.
// ║ Slots: fm_<name>_1 / _2 / _3 (16b-forge-sites.js gives each phase its form). Kris picks in the Lab → BOSS_PICK → the painted sheets (wave 7.6).
// ║ The masters' character entries (name, look, what they do) live here too, so the sprite requests see them.
// ═══════════════════════════════════════════════════════════════════════
CH('boss','Forge-masters','fm_glodr','Brokk, the Bellows-Wyrm',['drake','breath','#8a2a10,#3a1008,#ff7020,#ffd040','crystals,glowcore'],'the Ember Forge','a great wyrm of riveted iron plates and living fire, a forge bellows built into its chest, smoke pouring from its jaws','breathing fire in sweeps, burrowing under the coals');
CH('boss','Forge-masters','fm_eisa','Hissa, the Quench-Hag',['caster','cast','#3a5a7a,#1a2a3a,#9fe0ff,#ff8030','hood,staff,cauldron'],'the Cinder Forge','a hunched hag in steaming soaked rags, a quenching ladle for a staff, steam rising off her','hurling steam bolts, flooding the hall with scalding water');
CH('boss','Forge-masters','fm_gjallr','Krag, the Slag Troll',['brute','slam','#5a3020,#2a1810,#ff8030,#ffd060','club,horns,moss'],'the Slag Forge','a huge troll crusted in cooling slag that glows in the cracks, a crucible ladle for a club','pouring slag and hurling molten boulders');
CH('boss','Forge-masters','fm_eimyrja','Sinda, the Chainmistress',['wraith','cast','#3a1010,#10060a,#ff5030,#ffc060','chains,crown,flames'],'the Ash Forge','a tall fire-giantess in black iron, burning chains coiling from her arms like whips','lashing chains and dragging you in');

var FORGE_FAMS=[      // the Lab's Forge-masters group: [key, forge, title, phase labels]
  ['glodr','Ember Forge','Brokk, the Bellows-Wyrm',['Breath sweeps from the bellows','Burrows — lava geysers rise under you','The bellows burst — the whole hall breathes fire']],
  ['eisa','Cinder Forge','Hissa, the Quench-Hag',['Steam bolts and cinder imps','Floods the hall — islands of rock in scalding water','Boils it all — stay in the dry']],
  ['gjallr','Slag Forge','Krag, the Slag Troll',['Slag pours and walls you in','Molten boulders, ore shaken loose','Armoured in cooling slag — break the shell']],
  ['eimyrja','Ash Forge','Sinda, the Chainmistress',['Chain lashes that pull you in','Chains the hall into lanes','Wraps herself in chained spirits — free them']]];

// ════════════ GLÓÐR, THE BELLOWS-WYRM (Ember Forge) ════════════
BD('fm_glodr_1.a','Brokk, the Bellows-Wyrm','drake',165,'prowl','#6a5a50,#2a1810,#ff7020,#ffd040,#8a2a10,#ffe060',{beast:'dragon',wings:false,bulk:1.15,cracks:true,vents:true,breath:'#ff7030',motes:'embers'},'A wingless wyrm of riveted iron plates, a forge bellows heaving in its chest; fire pours from its jaws in sweeps.');
BD('fm_glodr_1.b','Brokk, the Bellows-Wyrm','wyrm',170,'slither','#5a4a44,#201410,#ff7020,#ffc040',{hood:true,cracks:true,holeGlow:'#ff7020',headKind:'dragon',vents:true,motes:'smoke'},'A long iron-plated wyrm with a bellows-hood that flares wide before each breath.');
BD('fm_glodr_1.c','Brokk, the Bellows-Wyrm','drake',160,'lumber','#7a4a2a,#2a1408,#d8a050,#ff9030',{beast:'behemoth',bulk:1.2,spines:false,vents:true,breath:'#ff8030',motes:'smoke'},'A squat forge-beast with chimney stacks along its back, breathing from a bellows-mouth.');
BD('fm_glodr_2.a','Brokk, the Burrowing Coal','wyrm',175,'slither','#3a2a24,#140a08,#ff8030,#ffb040',{cracks:true,holeGlow:'#ff6020',headKind:'dragon',motes:'embers'},'Half-buried in the coals, its plates glowing — it dives under and bursts up where you stand.');
BD('fm_glodr_2.b','Brokk, the Burrowing Coal','drake',170,'prowl','#4a3a30,#1a0c08,#ff8030,#ffa030',{beast:'wolf',bulk:1.25,cracks:true,motes:'embers'},'Low and long-clawed now, digging through the forge floor like a mole of fire.');
BD('fm_glodr_3.a','Brokk Unbound','drake',190,'lumber','#8a2a10,#3a0a04,#ffb040,#fff0a0,#a03010,#ffffa0',{beast:'dragon',wings:'flame',wingGlow:true,bulk:1.3,cracks:true,breath:'#ffd060',headSize:1.2,motes:'embers',moteN:24},'The bellows burst open: wings of flame tear free and the whole wyrm burns white-hot.');
BD('fm_glodr_3.b','Brokk Unbound','wyrm',195,'slither','#c83a1a,#5a1a0a,#ffd060,#ffffa0',{hood:true,cracks:true,holeGlow:'#ffe060',headKind:'dragon',motes:'embers',moteN:24},'A wyrm of pure molten iron, its hood a ring of fire, breathing the hall full of flame.');

// ════════════ EISA, THE QUENCH-HAG (Cinder Forge) ════════════
BD('fm_eisa_1.a','Hissa, the Quench-Hag','hum',150,'sway','#4a6a7a,#1a2a3a,#9fe0ff,#bff0ff,#9ab0b8,#ff8030',{build:'lean',head:'hood',gear:'witch',armor:'rags',torsoCol:'#3a5060',weapon:'staff',staffTop:'orb',off:'lantern',cape:'tattered',capeCol:'#2a3a48',motes:'smoke'},'A hunched hag in soaked, steaming rags, her quench-ladle staff dripping, cinder imps at her hem.');
BD('fm_eisa_1.b','Hissa, the Quench-Hag','hum',148,'glide','#3a5a7a,#10202e,#c0d8e8,#9fe0ff,#b0c0c8,#9fe0ff',{lower:'robe',head:'plague',armor:'robe',weapon:'staff',staffTop:'crystal',cast:true,off:'orb',motes:'bubbles'},'A masked quench-witch gliding on a skirt of steam, a crystal ladle raised to throw scalding bolts.');
BD('fm_eisa_1.c','Hissa, the Quench-Hag','toad',150,'lumber','#4a6a6a,#1a2a2a,#9fe0ff,#ff8030',{crown:'#9fe0ff',motes:'bubbles'},'A vast steaming bath-toad wearing the hag\'s iron cauldron for a crown.');
BD('fm_eisa_2.a','Hissa of the Flood','hum',165,'glide','#2a6a9a,#0a2a44,#bff0ff,#9fe0ff,#a0c8d8',{lower:'serpent',armor:'robe',head:'hood',gear:'coral',weapon:'trident',float:8,motes:'bubbles'},'Her lower half a coil of scalding water, she rides the flood that fills the hall.');
BD('fm_eisa_2.b','Hissa of the Flood','kraken',170,'pulse','#2a5a7a,#0a1a2a,#bff0ff,#9fe0ff',{motes:'bubbles'},'A steaming water-hag with drowning arms, rising out of the quench pool.');
BD('fm_eisa_3.a','Hissa, the Boiling Mother','hum',180,'phase','#d8e8f0,#5a7a8a,#ffffff,#ffe0a0,#e0e8ee,#ffb040',{lower:'wraith',armor:'shadow',head:'hood',gear:'witch',cast:true,off:'flame',float:12,wings:'ice',motes:'smoke',moteN:24},'Boiled into a wraith of white steam, a crown of scalding vapour, her heart glowing like a coal.');
BD('fm_eisa_3.b','Hissa, the Boiling Mother','orb',180,'pulse','#e0ecf4,#6a8a9a,#ffd080,#ffb040',{orb:'heart',orbR:44,motes:'smoke'},'A great boiling heart of steam and quench-water, throwing rings of scald.');

// ════════════ GJALLR, THE SLAG TROLL (Slag Forge) ════════════
BD('fm_gjallr_1.a','Krag, the Slag Troll','hum',170,'lumber','#5a4030,#2a1810,#ff8030,#ffd060,#7a5a40,#ffb040',{build:'giant',head:'ogre',horns:'bull',hornCol:'#3a2a20',armor:'fur',torsoCol:'#4a3020',weapon:'hammer',wepCol:'#5a3a28',wepGlow:'#ff8030',cracks:true,motes:'embers'},'A huge troll crusted in slag that glows in the cracks, swinging a crucible-ladle like a hammer.');
BD('fm_gjallr_1.b','Krag, the Slag Troll','hum',172,'lumber','#6a4a3a,#2a1a10,#d8a060,#ff9030,#8a6a50',{build:'giant',belly:true,head:'ogre',armor:'leather',torsoCol:'#5a3a28',weapon:'club',wepCol:'#4a3020',moss:true,cracks:true,motes:'smoke'},'A pot-bellied smelter-troll with a forge apron, slag dribbling from a ladle-club.');
BD('fm_gjallr_1.c','Krag, the Slag Troll','golem',170,'lumber','#4a3a30,#1a1008,#ff9030,#ffb040',{mat:'iron',fistGlow:true,horns:true,hornCol:'#2a1a10',motes:'embers'},'A troll fused with his own crucible: an iron belly full of molten slag.');
BD('fm_gjallr_2.a','Krag the Boulder-Hurler','hum',180,'stride','#5a3a2a,#2a140a,#ffa040,#ffd060,#7a5040',{build:'giant',head:'ogre',horns:'bull',armor:'magma',weapon:'millstone',fistGlow:true,cracks:true,motes:'embers'},'He tears molten boulders from the walls and hurls them; ore rains from the roof when he stamps.');
BD('fm_gjallr_2.b','Krag the Boulder-Hurler','drake',175,'lumber','#5a4030,#2a1810,#ff9030,#ffb040',{beast:'behemoth',bulk:1.3,spines:false,cracks:true,motes:'smoke'},'On all fours now, a slag-beast that charges and shakes the cavern.');
BD('fm_gjallr_3.a','Krag in the Slag Shell','golem',190,'lumber','#3a3434,#141010,#ff8030,#ffd060',{mat:'obsidian',bulk:1.2,shoulderCrystals:true,fistGlow:true,motes:'embers'},'Armoured in cooling slag that hardens into black glass — crack the shell to reach him.');
BD('fm_gjallr_3.b','Krag in the Slag Shell','golem',190,'lumber','#5a2a1a,#1a0804,#ff9030,#ffe060',{mat:'magma',bulk:1.25,crown:'#ff9030',horns:true,hornCol:'#2a1410',motes:'embers'},'A walking crucible of half-cooled slag, glowing through every crack.');

// ════════════ EIMYRJA, THE CHAINMISTRESS (Ash Forge) ════════════
BD('fm_eimyrja_1.a','Sinda, the Chainmistress','hum',175,'stride','#2a2224,#100a0c,#ff5030,#ffc060,#a05040,#ff7040',{build:'tall',armor:'plate',torsoCol:'#2a2224',head:'helm',gear:'spikecrown',crownCol:'#ff6030',weapon:'whip',off:'chains',chains:true,cape:'flame',hair:'wild',motes:'embers'},'A tall fire-giantess in black iron, burning chains coiling from her arms like whips.');
BD('fm_eimyrja_1.b','Sinda, the Chainmistress','hum',170,'glide','#3a1010,#10060a,#ff5030,#ffc060,#c06050',{lower:'robe',armor:'robe',head:'face',gear:'crown',crownCol:'#ff8040',weapon:'chains',chains:true,cape:'long',capeCol:'#2a0a08',hair:'wild',motes:'embers'},'A queen of the chain-throne in a gown of ash, her chains alive in her hands.');
BD('fm_eimyrja_2.a','Sinda of the Lanes','hum',185,'phase','#3a1010,#10060a,#ff6040,#ffd060',{lower:'wraith',armor:'shadow',head:'helm',gear:'spikecrown',crownCol:'#ff6040',weapon:'whip',off:'chains',chains:true,wings:'flame',float:10,motes:'embers'},'She rises into the air and chains the hall into burning lanes.');
BD('fm_eimyrja_2.b','Sinda of the Lanes','spider',180,'stride','#2a1414,#0a0404,#ff6040,#ffc060',{mark:'runes',legBands:true,motes:'embers'},'Her chains become legs — a chain-spider strung across the hall.');
BD('fm_eimyrja_3.a','Sinda, Shield of Spirits','hum',195,'phase','#2a1a20,#0a0408,#9fe8ff,#ff6040,#c06050,#9fe8ff',{lower:'wraith',armor:'shadow',head:'helm',gear:'spikecrown',crownCol:'#ff6040',off:'chains',chains:true,cast:true,float:12,motes:'motes',moteN:24},'Chained spirits (pale blue) circle her as a living shield — free them with your magic to reach her.');
BD('fm_eimyrja_3.b','Sinda, Shield of Spirits','orb',190,'pulse','#3a1010,#0a0404,#9fe8ff,#ff6040',{orb:'heart',orbR:44,motes:'motes'},'A burning heart in a cage of chains, the bound spirits pressed against the bars.');

Object.assign(typeof BOSS_THREADS!=='undefined'?BOSS_THREADS:{},{
  glodr:'Riveted iron plates, orange fire in the cracks, the bellows and the smoke — through every phase.',
  eisa:'Steam-pale blues and grey rags, the ladle, rising steam and scalding water.',
  gjallr:'Slag-brown and glowing cracks, bull horns, the crucible — cooling to black glass at the end.',
  eimyrja:'Black iron and burning chains, the spiked crown of fire; the chained spirits at the end.'});

// round 57 (Kris: "You choose, then paint"): one design per phase, picked so each master keeps the same head and colours through all three —
// Brokk a dragon head throughout, Hissa the hag's hood and hat, Krag the bull horns, Sinda the helm under her spiked crown of fire
Object.assign(BOSS_PICK,{fm_glodr_1:'a',fm_glodr_2:'a',fm_glodr_3:'a',fm_eisa_1:'a',fm_eisa_2:'a',fm_eisa_3:'a',fm_gjallr_1:'a',fm_gjallr_2:'a',fm_gjallr_3:'b',fm_eimyrja_1:'a',fm_eimyrja_2:'a',fm_eimyrja_3:'a'});

