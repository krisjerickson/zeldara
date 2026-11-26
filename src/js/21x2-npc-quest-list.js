// ═══════════════════════════════════════════════════════════════════════
// ║ 21x2-npc-quest-list.js — round 113: the requests Kris ✓ in the Lab (one or two per villager). The engine is 21x-npc-quests.js.
// ║ New things they give: the Raven-feather cloak, the Runeloaf, Skald's mead, the brass bird, the spyglass, Miklagard silk, the silk cape,
// ║ acrobat's boots, the glass charm (their paintings are ordered: sc_r113_items).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZNPCQ==='undefined'||typeof ITEMS==='undefined')return;
  var NEW={raven_cloak:{name:"Raven-feather Cloak",icon:'🪶',def:4,spdBonus:0.08,slot:'back',sell:80,secReq:1,desc:"+4 DEF +8% Spd — the lost Ravens' colours, from Oswin"},
    runeloaf:{name:"Runeloaf",icon:'🍞',heal:45,slot:'food',sell:10,desc:"Benno's bread from Old Mother's starter — heals 45"},
    skalds_mead:{name:"Skald's Mead",icon:'🍯',heal:35,slot:'food',sell:12,desc:"Rolf's mead of poetry — heals 35"},
    brass_bird:{name:"Brass Songbird",icon:'🐦',slot:'misc',sell:60,desc:"Mira's mechanical bird. It sings when you are near treasure. Mostly."},
    spyglass:{name:"Vela's Spyglass",icon:'🔭',slot:'misc',sell:60,desc:"A sky captain's brass spyglass"},
    miklagard_silk:{name:"Miklagard Silk",icon:'🧵',slot:'material',sell:120,desc:"A bolt of southern silk — Pell would weep"},
    silk_cape:{name:"Sky-silk Cape",icon:'🧣',def:3,spdBonus:0.06,slot:'back',sell:60,secReq:2,desc:"+3 DEF +6% Spd — Pell's best work"},
    acrobat_boots:{name:"Acrobat's Boots",icon:'🥾',def:2,spdBonus:0.15,slot:'feet',sell:50,secReq:1,desc:"+2 DEF +15% Spd — Pia's spare pair"},
    glass_charm:{name:"Soulglass Charm",icon:'🔮',def:2,slot:'neck',sell:70,secReq:2,desc:"+2 DEF — Sólveig's mosaic glass, humming"}};
  Object.keys(NEW).forEach(function(k){ if(!ITEMS[k])ITEMS[k]=NEW[k]; });
  var A=ZNPCQ.add;
  // ── Master Oswin ──
  A({id:'tankards',giver:'oswin',name:"The Five Tankards",offer:["You've seen the shelf. Five tankards, four upside down. My Ravens rode into the Ashlands the night the sky went red. I came back. They didn't.","If you ever find something of theirs out there — a shield, a horn, a ring, a hood — bring it home. It's the only story I never make bigger."],
    steps:[{k:'fetch',each:{gold:150},sub:"a keepsake of each lost Raven — one in each realm",remind:"Any sign of my Ravens? One keepsake in each realm, I'd wager.",items:[
      {it:'rv_shield',ic:'🛡️',name:"Sigrid's shield",r:1,at:'site:1',say:["Sigrid's shield. She used to bang it like a drum before a fight. Scared the goblins and the rest of us. (He turns her tankard up.)"]},
      {it:'rv_horn',ic:'📯',name:"Ulf's horn",r:2,at:'site:2',say:["Ulf's horn. He played it badly and loudly. I'd give a lot to hear it badly and loudly once more. (Another tankard, right side up.)"]},
      {it:'rv_ring',ic:'💍',name:"Halla's ring",r:3,at:'site:3',say:["Halla's ring. She swore she'd marry the first troll that beat her at arm-wrestling. None ever did."]},
      {it:'rv_hood',ic:'🧥',name:"Kettil's hood",r:4,at:'site:4',say:["Kettil's hood. He'd have laughed at me for crying. …The last one. All five stand again."]}]}],
    end:["Five tankards, standing. Thank you. Take this — Raven feathers, sewn by Halla herself. Or the gold we were saving for the feast. Your choice."],
    choice:[{t:'🪶 The Raven-feather cloak',rw:{items:[['raven_cloak',1]]}},{t:'💰 600 gold',rw:{gold:600}}]});
  A({id:'paperwork',giver:'oswin',name:"Proper Paperwork",offer:["A report, sealed, for the steed-of-the-sea's keeper. Deliver it. No — I won't say who. A hero should know a kenning."],
    riddle:{step:0,hints:["A kenning is a riddle-name. 'Steed of the sea' — what carries you over water?","A ship, yes. Now: the one who builds them, not the one who counts them in at the harbour."],
      knows:{rolf:"Kennings? 'Whale-road' is the sea, 'sea-steed' is a ship. Oswin's been using them since before you were born. Annoying, isn't it?",runa:"A sea-steed's keeper? Hesk would say his boats keep HIM, not the other way round."}},
    steps:[{k:'deliver',to:'hesk',sub:"for the steed-of-the-sea's keeper (a kenning)",wrong:{tob:"For me? Sigurd the turnip can't read. Neither can I, much.",nell:"Not mine. I keep fish, not steeds.",corr:"A report? I'm the gate, not the sea.",greta:"Sea? I'm a windmill woman."},done:["For me? From Oswin? (He reads, and laughs.) 'Report: the boatwright's planks are still singing off-key.' The old goat. Tell him the tenor's fine."]}],
    end:["Delivered? Good. Proper paperwork is the backbone of adventure. Here."],reward:{gold:150,items:[['mushroom_stew',1]]}});
  // ── Benno ──
  A({id:'oldmother',giver:'benno',name:"Old Mother's Rescue",realm:2,offer:["Old Mother — my sourdough starter — is fading. Twenty-eight years I've fed her! She needs marsh rye from the Wetlands, snow-honey from the Highlands and a pinch of ember-salt from the Ashlands. I knead your help! …Sorry. I'm upset."],
    steps:[{k:'fetch',each:{gold:80,items:[['runeloaf',2]]},sub:"marsh rye, snow-honey, ember-salt",remind:"How's the hunt going? Old Mother sends her love. Bubbles, mostly.",items:[
      {it:'q_rye',ic:'🌾',name:"marsh rye",r:2,at:'site:2',say:["Marsh rye! She's rising already! Take some Runeloaf — fresh from the heart of the oven."]},
      {it:'q_snowhoney',ic:'🍯',name:"snow-honey",r:3,at:'site:3',say:["Snow-honey! Sweet as a hero's smile. Here — more Runeloaf."]},
      {it:'q_embersalt',ic:'🧂',name:"ember-salt",r:4,at:'site:4',say:["Ember-salt! That's the crust sorted. Old Mother will outlive us all!"]}]}],
    end:["She's saved! Twenty-eight years and counting. You're the best thing since… well. Since me."],reward:{gold:100,items:[['runeloaf',3]]}});
  // ── Morwen ──
  A({id:'doom',giver:'morwen',name:"Ingredients of Doom",realm:2,offer:["I require five ingredients for a draught of considerable distinction. A list, in my own hand, with footnotes: bog-lantern moss, a cooled Binder's ember, crystal dew, an ash-lily and a raven's feather. Do read the footnotes."],
    steps:[{k:'fetch',sub:"moss, ember, dew, lily, feather",remind:"The list, my dear. Do consult the footnotes. Footnote three is particularly moving.",done:["All five! Splendid. The alembic shall sing tonight."],items:[
      {it:'q_moss',ic:'🌿',name:"bog-lantern moss",r:2,at:'site:2'},{it:'q_ember',ic:'🔥',name:"a cooled Binder's ember",r:1,at:'site:1'},{it:'q_dew',ic:'💧',name:"crystal dew",r:3,at:'site:3'},
      {it:'q_lily',ic:'🥀',name:"an ash-lily",r:4,at:'site:4'},{it:'q_feather',ic:'🪶',name:"a raven's feather",r:1,at:'woods:1'}]}],
    end:["Behold three Greater Draughts — and my recipe, which I shall now explain. …No? Another time."],reward:{gold:120,items:[['mega_potion',3]]}});
  A({id:'spoon',giver:'morwen',name:"The Prophecy of the Third Spoon",offer:["A prophecy, from my Serkland days: 'Where the third spoon stirs and the stone forgets, the gold sleeps.' I have never understood it. Perhaps you will."],
    riddle:{step:0,hints:["It was a long night when I wrote that. There may have been porridge.","Porridge is stirred by a mill-wife, near a mill. Look for a stone by the windmill.","'The stone forgets' — its rune is worn away. A smooth stone, by the mill."],
      knows:{runa:"The third spoon? Ha! The old porridge-stone by the windmill — the mill-wives stirred their pots on it. Three spoons, in the old song.",twin:"'The stone that forgets'? A runestone whose rune has worn off. There's one near the mill, I'm sure of it.",greta:"Don't stir porridge on the old stone by my mill. Bad luck. Granny said there's gold under it, but she also said whistling calls gales."}},
    steps:[{k:'visit',at:'village:windmill',hide:2,ic:'🪨',name:"the stone that forgets",sub:"where the third spoon stirs and the stone forgets",found:["Under the smooth old stone by the mill — a little clay pot of silver coins."]}],
    end:["The prophecy fulfilled! I shall write a footnote about it. A long one."],reward:{gold:200,items:[['elixir',1]]}});
  // ── Garrick ──
  A({id:'coal',giver:'garrick',name:"Coal for the Cold Forge",realm:3,offer:["Winter's coming and the good coal's in the Highlands. Bring me six lumps — honest coal, not that sooty fake stuff."],
    steps:[{k:'fetch',sub:"six lumps of Highland coal",remind:"Six lumps. Honest ones.",done:["Good, honest coal. The forge'll sing all winter."],items:[1,2,3,4,5,6].map(function(i){ return {it:'q_coal'+i,ic:'⚫',name:'Highland coal',r:3,at:'site:3'}; })}],
    end:["Here — a couple of tonics, and something for your trouble."],reward:{gold:120,items:[['strength_tonic',2]]}});
  // ── Brask ──
  A({id:'miklagard',giver:'brask',name:"A Letter to Miklagard",need:function(ps){ return ZNPCQ.rescued(ps,'vela'); },offer:["A letter for the Emperor's guard, in Miklagard. Captain Vela's ships go south. Give it to her — 'with the next good wind', as they say in Miklagard. They say everything better in Miklagard."],
    steps:[{k:'deliver',to:'vela',sub:"to Captain Vela, in the village",remind:"Did the letter go south? Vela, by the pier.",done:["Captain's log: a letter for Miklagard, entrusted to the captain. The captain is honoured. The captain will drop it off. Eventually."]}],
    end:["It's gone south! Here — silk from Miklagard. I've been saving it for a special day. This is one."],reward:{gold:150,items:[['miklagard_silk',1]]}});
  // ── Mira ──
  A({id:'bird',giver:'mira',name:"The Singing Bird",realm:3,offer:["The Highlands are full of broken old automatons. Three of their brass gears and I can finish my songbird! It might explode. In a GOOD way."],
    steps:[{k:'fetch',sub:"three brass gears from the Highlands",remind:"Gears! Brass ones! Shiny!",done:["Gears! Ooh, this one's still warm. Give me a minute. …There. It sings! It's not on fire! Mostly!"],items:[1,2,3].map(function(i){ return {it:'q_gear'+i,ic:'⚙️',name:'a brass gear',r:3,at:'site:3'}; })}],
    end:["It's yours. It sings near treasure. Or near soup. Still testing."],reward:{gold:200,items:[['brass_bird',1]]}});
  // ── Coral ──
  A({id:'hacksilver',giver:'coral',name:"Hack-Silver",offer:["Shipwrecks wash up silver on the realms' shores. Bits of it. Hack-silver. Bring me five pieces and I'll pay in metal — honest metal. Ish."],
    steps:[{k:'fetch',sub:"five bits of silver on the realms' shores",remind:"Five bits of silver. On the beaches. Don't tell the harbourmaster.",done:["Lovely. I'll weigh them. …Forty-one and a bit. I don't trust forty."],items:[1,2,3,4,5].map(function(i){ return {it:'q_silver'+i,ic:'🪙',name:'hack-silver',r:Math.min(4,i),at:'shore:'+Math.min(4,i)}; })}],
    end:["As promised: honest metal, from the realms' own forges. They won't miss it."],reward:{gold:200,f:function(ws,ps){ if(typeof ZMIRA!=='undefined'&&ZMIRA.METAL)(ps.unlockedSections||[1]).forEach(function(r){ var m=ZMIRA.METAL[r]; if(m&&ITEMS[m])ps.inventory.push(m); }); }}});
  A({id:'cargo',giver:'coral',name:"Lost Cargo",realm:2,offer:["A storm took three of my barrels. Definitely legal barrels. They'll have drifted to the harbours of the other realms."],
    steps:[{k:'fetch',sub:"three barrels by the realms' harbours",remind:"My barrels. The legal ones.",done:["My barrels! Unopened! …Probably."],items:[2,3,4].map(function(r){ return {it:'q_barrel'+r,ic:'🛢️',name:'a drifted barrel',r:r,at:'shore:'+r}; })}],
    end:["Here — potions from barrel two. Don't ask what's in barrel three."],reward:{gold:120,items:[['life_flask',3]]}});
  // ── Sólveig ──
  A({id:'mosaic',giver:'solveig',name:"The Forty-Light Mosaic",offer:["(She hums.) Sea-glass. Every colour the lake gives back. Bring me ten pieces and I will set them for the forty spirits."],
    steps:[{k:'fetch',sub:"ten pieces of sea-glass on the shores",remind:"Ten pieces. Each one sings a little.",done:["(A long, low song.) There. The mosaic remembers them now."],items:[1,2,3,4,5,6,7,8,9,10].map(function(i){ var r=1+(i%4); return {it:'q_seaglass'+i,ic:'💠',name:'sea-glass',r:r,at:'shore:'+r}; })}],
    end:["Take this charm. The glass in it was the first piece you brought."],reward:{gold:150,items:[['glass_charm',1],['potion',2]]}});
  // ── Rolf ──
  A({id:'mead',giver:'rolf',name:"The Mead of Poetry",realm:2,offer:["The mead of poetry! Honey from the Wetlands, cloudberries from the Highlands, a pinch of ash-salt. Bring them, you lumpen hero, and I'll brew you something that makes even YOU eloquent."],
    steps:[{k:'fetch',sub:"Wetlands honey, Highland cloudberries, ash-salt",remind:"Honey, berries, salt. Even a troll could remember that. Barely.",done:["Ha! Now watch a master work."],items:[{it:'q_honey',ic:'🍯',name:'Wetlands honey',r:2,at:'site:2'},{it:'q_berries',ic:'🫐',name:'cloudberries',r:3,at:'site:3'},{it:'q_ashsalt',ic:'🧂',name:'ash-salt',r:4,at:'site:4'}]}],
    end:["Skald's Mead. Drink it before a flyting. You'll need it."],reward:{gold:100,items:[['skalds_mead',3]]}});
  // ── Iva ──
  A({id:'hoard',giver:'iva',name:"A Buried Hoard",offer:["Shh. A hoard-map. Three clues, all in verse, all very rude to read aloud. The first: 'Where the river-wall broke, beside the first stone, look under the moss.'"],
    steps:[{k:'visit',at:'site:1',ic:'📜',name:"the first clue",sub:"the first clue: by the first stone, under the moss",found:["Under the moss — a slip of birch-bark: 'Walk where the reeds sing, by water and bones.'"]},
      {k:'visit',at:'shore:1',ic:'📜',name:"the second clue",sub:"the second clue: where the reeds sing, by water",found:["Wrapped in reeds — the last verse: 'Where three paths meet, the silver sleeps.'"]},
      {k:'visit',at:'woods:1',ic:'💰',name:"the hoard",sub:"the hoard: where three paths meet",guard:'goblin|bandit',found:["A hoard! Arm-rings, coins with strange letters, and one very grumpy gem."]}],
    end:["The grumpy one is called Bjarni. He likes you. Keep him — and these."],reward:{gold:250,items:[['pearl',1],['gem_heartseed',1]]}});
  // ── Quill ──
  A({id:'signals',giver:'quill',name:"Signals in the Dark",offer:["Prime opportunity! A signal-fire relay! Light the lantern at the pier, run it to the boathouse, then to the gate — all within seventy seconds. Very exclusive. Very fast."],
    steps:[{k:'relay',secs:70,pts:['village:pier','village:boathouse','village:gate'],names:['the pier','the boathouse','the gate'],sub:"the pier → the boathouse → the gate, in 70 seconds (ask Quill to light it)",go:["Go! Go! Seventy seconds, starting… now!"],done:["The gate's lantern is lit! A record! Probably!"]}],
    end:["Magnificent! Here — potions, and a voucher for Sunny Paradise Isle. The voucher is gold. Literal gold."],reward:{gold:150,items:[['potion',2]]}});
  // ── Hana ──
  A({id:'foal',giver:'hana',name:"The Runaway Foal",offer:["Biscuit says Sprout has run off again. Into the meadow. Biscuit says Sprout dashes, tires, and stops for breath — so be patient."],
    steps:[{k:'chase',at:'village:fountain',ic:'🐴',sub:"Sprout the foal, in the meadow — get close while it rests, then Tab",done:["Got you, Sprout! (The foal nuzzles your pocket.)"]},{k:'deliver',to:'hana',sub:"bring Sprout back to the stables",done:["Biscuit says thank you. Biscuit says you are almost as fast as a foal."]}],
    end:["Biscuit insists you take these."],reward:{gold:150,items:[['speed_draught',2]]}});
  // ── Mael ──
  A({id:'herbs',giver:'mael',name:"Herbs of the Four Isles",offer:["I'm out of everything! Ha! Bring me a herb from beside each realm's harbour and I'll make you something that stops bleeding. Mostly."],
    steps:[{k:'fetch',each:{gold:40},sub:"a herb by each realm's harbour",remind:"Herbs! The bleeding waits for no one.",items:[1,2,3,4].map(function(r){ return {it:'q_herb'+r,ic:'🌱',name:'healing herb',r:r,at:'harbor:'+r,say:["Lovely, a fresh one! Smells like a wound healing. In a good way."]}; })}],
    end:["All four! Here — flasks of life. Use them before the blood runs out, not after."],reward:{gold:100,items:[['life_flask',3]]}});
  // ── Nell ──
  A({id:'oxhead',giver:'nell',name:"The Ox-Head Bait",need:function(ps){ var T=typeof ZOSW!=='undefined'?ZOSW.tq(ps):{}; return !T.net||T.net>=3; },offer:["The one that got away is still down there. Thor used an ox head. So will I. There's an old ox skull out by the ruins east of here. Fetch it."],
    steps:[{k:'fetch',sub:"an ox skull, out by the ruins",remind:"The skull, dear. The lake is waiting.",done:["Perfect. Big, ugly, smells right."],items:[{it:'q_oxskull',ic:'💀',name:'an ox skull',r:1,at:'site:1'}]}],
    end:["Watch… (A great splash. Nell hauls up a pike the size of a boy.) Ha! Take some fish — and tell nobody it wasn't the World Serpent."],reward:{gold:100,items:[['grilled_fish',3]]}});
  // ── Holt ──
  A({id:'stag',giver:'holt',name:"Track the White Stag",offer:["Whisper. There's a white stag in the Grasslands woods. I've seen its tracks. It's seen me. Follow the tracks — quietly — and see where they lead."],
    steps:[{k:'tracks',n:4,at:'woods:1',name:'the white stag',sub:"follow the tracks in the Grasslands woods",found:["A white stag, shining like frost, watches you — then bows its head and is gone. Where it stood lies a hunter's longbow."]}],
    end:["You saw it? And it let you? …The bushes are listening. Take this, and say nothing."],reward:{gold:120,items:[['longbow',1]]}});
  // ── Pell ──
  A({id:'skysilk',giver:'pell',name:"Sky-Silk",need:function(ps){ return ZNPCQ.rescued(ps,'vela'); },offer:["The sky ports trade a silk so light it floats. Bring me a bolt and I will make you something that does not make me cry."],
    steps:[{k:'visit',at:'harbor:4',ic:'🧵',name:'a bolt of sky-silk',sub:"a bolt of sky-silk, by the Ashlands harbour where the skiffs land",found:["A bolt of sky-silk, light as breath."]},{k:'deliver',to:'pell',sub:"bring the sky-silk to Pell",done:["Oh. OH. Stand still. Stand STILL."]}],
    end:["There. Finally, you look like a hero and not like a hero's laundry."],reward:{items:[['silk_cape',1]]}});
  // ── Pia ──
  A({id:'pins2',giver:'pia',name:"Pin Hunt II",need:function(ps){ return !!ps.canRoll; },offer:["Hi-hi! New pins, harder places! Three of them, out past the meadow and into the Wetlands. Roll if you have to! ROLL!"],
    steps:[{k:'fetch',sub:"three of Pia's pins",remind:"Pins! Pins! Pins!",done:["All three! Flip! Flip! Oof!"],items:[{it:'q_pin1',pc:'pc_juggle_pin_a',ic:'🎳',name:"one of Pia's pins",r:1,at:'woods:1'},{it:'q_pin2',pc:'pc_juggle_pin_b',ic:'🎳',name:"one of Pia's pins",r:1,at:'site:1'},{it:'q_pin3',pc:'pc_juggle_pin_c',ic:'🎳',name:"one of Pia's pins",r:2,at:'site:2'}]}],
    end:["Take my spare boots! They're very bouncy!"],reward:{items:[['acrobat_boots',1]]}});
  // ── Vela ──
  A({id:'spyglass',giver:'vela',name:"The Lost Spyglass",offer:["Captain's log: the captain has lost her spyglass. The captain dropped it where the fire meets the frost. The captain refuses to say more. It is a test."],
    riddle:{step:0,hints:["Captain's log: the captain admits it was high. Very high.","Captain's log: fire is the Ashlands. Frost is the Highlands. The captain was where they touch."],
      knows:{dunn:"Where fire meets frost? The Ember Wall's snowy pass, where the Ashlands touch the Highlands. Knotted that place for its cold.",bram:"Fire and frost? The Ashlands' northern edge, against the Highlands. Measured it once by eye."}},
    steps:[{k:'visit',at:'firefrost',hide:2,ic:'🔭',name:"Vela's spyglass",sub:"where the fire meets the frost",found:["Half buried in ash-dusted snow — a brass spyglass."]}],
    end:["Captain's log: the hero passed the test. The captain is generous. Here."],reward:{gold:150,items:[['spyglass',1]]}});
  // ── Bram ──
  A({id:'bench',giver:'bram',name:"A Bench on the Green",offer:["The Green needs a bench by the Runestone. I've measured the spot by eye. It's perfect. Driftwood — five pieces. The Silverrun carries it down and leaves it on the shores. Seasoned by water. Best timber there is. I'm right about this."],
    steps:[{k:'fetch',sub:"five pieces of driftwood on the shores",remind:"Five pieces of driftwood. The shores, by the harbours. Grey and smooth — you'll know it.",done:["Five pieces, perfectly chosen. Well — I'd have chosen differently. But fine."],
      items:[1,1,1,2,2].map(function(r,i){ return {it:'q_drift'+(i+1),ic:'🪵',name:'driftwood',r:r,at:'shore:'+r}; })}],
    end:["Done. Level to a hair. Sit on it any time."],reward:{gold:100,items:[['bread',2]],f:function(ws,ps){ ps.benchBuilt=1; }}});      /* round 114d (Kris: "driftwood is good"): the logs came from chopping, which is gone */
  // ── Corr ──
  A({id:'poem',giver:'corr',name:"A Poem for Ilsa",need:function(ps){ var ws=ZNPCQ.ws(); return !!(ws&&(ws._villageNPCs||[]).some(function(n){ return n.id==='vf_keeper'; })); },offer:["A poem. For Ilsa. At the lighthouse. Don't read it. …Fine, read it, and fix it on the way if you must. 'O Ilsa, light of the lighthouse, you are brighter than a… fight mouse.'"],
    steps:[{k:'choose',to:'ilsa',sub:"take Corr's poem to Ilsa at the lighthouse",ask:["(You hand Ilsa the poem. Which ending did you write in?)"],opts:["…brighter than the moon","…brighter than a fight mouse","…brighter than my lantern"],ok:0,right:["'Brighter than the moon.' …Who wrote this? Corr? (She smiles, and does not stop smiling.) Tell him… tell him to come up for tea."],wrong:"Ilsa frowns, kindly. 'That's… a strange thing to call someone.' Maybe try a different ending?"},
      {k:'deliver',to:'corr',sub:"tell Corr what Ilsa said",done:["Tea? TEA? She said tea? I need a new helmet. I need a new face."]}],
    end:["Thank you. Here — my wages. All of them. Well. Most of them."],reward:{gold:100}});
  // ── Greta ──
  A({id:'wheel',giver:'greta',name:"The Stuck Wheel",offer:["The mill's gears are back in the wrong order, and no whistling to fix it! Granny's rhyme says: 'Big turns small, and small turns all, and the middle one minds the wall.'"],
    riddle:{step:0,hints:["'Big turns small' — the big wheel goes first.","'The middle one minds the wall' — the middle-sized one goes last, by the wall."],knows:{hesk:"Gears are like planks — big ones lead. The quiet middle one sits at the back.",bram:"Big, small, middle. Measured it by eye. Obviously."}},
    steps:[{k:'choose',sub:"set the mill's gears in Granny's order",ask:["(Three gears: big, small and middle. Which order?)"],opts:["Big → small → middle","Small → middle → big","Middle → big → small"],ok:0,right:["The sails creak, turn — and the mill sings. Greta claps flour everywhere."],wrong:"Clunk. The sails shiver and stop. Not that order."},
      {k:'deliver',to:'benno',sub:"take a sack of flour to Benno",done:["Flour! From Greta? That's the best thing since — well, sliced me. Here's a hundred."]}],
    end:["Granny's rhyme! Who knew. Take a loaf, and no whistling on the way."],reward:{gold:100,items:[['bread',2]]}});
  // ── Tob ──
  A({id:'crows',giver:'tob',name:"Crows and Goblins",offer:["Crows on Sigurd! And a goblin on Gudrun! Please — chase them off before they eat my whole family."],
    steps:[{k:'kill',at:'village:vegplot',mon:'crow|raven|goblin|imp|rat',n:4,q:1,sub:"chase off the crows and the goblin at Tob's plot",done:["They're gone! Sigurd! Gudrun! You're safe!"]}],
    end:["Take some of the harvest. Not Sigurd. Not Gudrun. The others don't have names yet."],reward:{gold:80,items:[['wild_berries',3],['cheese',1]]}});
  // the quest items' names and icons (they ride in your pack only as the quest's own count, never as ITEMS)
})();
