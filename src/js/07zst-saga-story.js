// ═══════════════════════════════════════════════════════════════════════
// ║ 07zst-saga-story.js — round 72: THE SAGA, END TO END (the Lab's "The saga, end to end" tab, 79c-lab-saga.js; doc 31).
// ║ Kris: "a new design lab that articulates each element of the full saga, end-to-end, both for me to review for accuracy as well as have it
// ║ show where in the world you learn about each of these during the gameplay, starting from the intro scene all the way to the credits. Have
// ║ multiple options for me to pick from for when and how you learn this info. Also, have a 2nd section for a "redundancy" check, where we
// ║ will have a back-up option for how you learn this info. This should also be split into where you have a full cut-scene that explains a
// ║ larger part of the story vs. hints that you get from NPCs or other minor progress throughout the game."
// ║ ZSTORY.BEATS — 27 story elements in six acts. Each: what is TRUE (for his accuracy review), what stays a mystery until when, the ways you
// ║ could learn it (opts: a cut-scene 🎬 or a hint 💬, where, when, from whom, a sample line, built or planned) and the back-ups (bak).
// ║ Shared with the game, so the picked ways can be wired from the same list.
// ═══════════════════════════════════════════════════════════════════════
var ZSTORY={
  // where on the (schematic) map of Runeheim: x, y in 0–1, and a name
  LOC:{village:[0.5,0.5,'the village'],green:[0.5,0.47,'the Runestone Green'],home:[0.47,0.53,'the Home and the library (the other twin)'],tavern:[0.53,0.53,'the tavern'],harbour:[0.56,0.6,'the harbour'],
    grass:[0.74,0.28,'the NE Grasslands'],wet:[0.74,0.72,'the SE Wetlands'],high:[0.26,0.72,'the SW Highlands'],ash:[0.26,0.28,'the NW Ashlands'],
    stones:[0.66,0.36,'a bindstone'],crossing:[0.62,0.5,'a realm crossing (a builder\'s tower)'],fairy:[0.8,0.4,'a fairy ring'],site:[0.34,0.6,'an adventure site'],
    forge:[0.09,0.5,'the forges of Muspelheim (at sea)'],musp:[0.07,0.1,'Muspelheim'],asgard:[0.6,0.64,'Asgard, on Mirror Lake'],citadel:[0.6,0.6,'the citadel of Asgard'],
    hall:[0.62,0.6,'the feast hall'],circle:[0.6,0.67,'the rune circle at Asgard\'s heart'],sky:[0.5,0.06,'the sky (a glimpse)'],any:[0.92,0.08,'anywhere (on a milestone)'],
    tome:[0.08,0.92,'the Tome'],map:[0.92,0.92,'the map page'],hamlets:[0.7,0.5,'the hamlets'],workshop:[0.45,0.45,'Mira\'s workshop'],lake:[0.57,0.68,'Mirror Lake (under the water)']},
  ACTS:[['I','The Quiet','the world and the twins — the opening'],['II','The Bindings','the spirits in chains and how the realms fell'],['III','The Hidden Sky','the shut gate and the gods\' prison'],
    ['IV','Fire','the forges, Muspelheim and the Lodestar'],['V','Asgard','the false god, the feast hall and the truth'],['VI','Home','the spirits go home and Runeheim turns green']],
  BEATS:[]
};
(function(){ var B=function(act,id,title,truth,mystery,panel,opts,bak){ ZSTORY.BEATS.push({act:act,id:id,title:title,truth:truth,mystery:mystery,panel:panel,opts:opts,bak:bak}); };
  // an option: kind ('cut' = a cut-scene that tells a larger part, 'hint' = an NPC line or a small moment), where, when, who / how, a sample, built?
  var O=function(kind,loc,when,how,text,st){ return {kind:kind,loc:loc,when:when,how:how,text:text,st:st||'planned'}; };
  // ═══ I · THE QUIET ═══
  B(0,'cycle','The cycle of souls','In Runeheim the dead rose along the World Tree — the tree carved into the Runestone Green — up to Asgard: Odin\'s Valhalla for the fallen, Freya\'s Fólkvangr for everyone else. New souls came down the same road into every newborn.',
    'Told early as old lore; that the road is now blocked comes later.','pn_saga_cradles',
    [O('cut','village','a new game, before the cradles','a new opening panel: the World Tree with souls rising and sparks coming down','"Once, the dead rose along the World Tree to the gods — and new souls came down it into every cradle."'),
     O('hint','green','the first minutes, on the Green','Elder Runa, at the carved tree','"The tree on the Green is the road the dead walk home. Lately… it has been quiet."'),
     O('hint','stones','the first spirit you free','its memory, then its soul-line running into the land','Geir: "I carved the Green\'s tree when I was a boy. The roots go further than anyone thinks."','partly')],
    [O('hint','tome','from the start','the Tome\'s Saga page, first chapter: The Cycle','a short page with the World Tree drawing'),
     O('hint','wet','a Wetlands spirit','Vigdis the skald\'s memory','"I knew all the sagas. One verse was always missing…"','built')]);
  B(0,'quiet','The Long Quiet','For twenty winters before the twins, no child was born alive in the last village. The dead of the Grasslands drifted at the edge of the light — and lately the Binders came over the walls for them too.',
    '','pn_saga_cradles',
    [O('cut','village','a new game — the opening, panel 1','the opening cut-scene','"In the last village the cradles stood empty. No child had been born alive in a lifetime."','built'),
     O('cut','grass','the Grasslands\' tenth spirit','the realm\'s panel, The Long Quiet','"Only the Grasslands were left — and the Long Quiet, when the dead drifted at the edge of the light."','built'),
     O('hint','stones','Grasslands and Wetlands spirits','their memories','Asa: "I wove twenty birth-shawls that no child ever wore." · Nanna: "For eight years my hands had nothing to hold."','built')],
    [O('hint','green','early, on the Green','Elder Runa','"Twenty winters, and not one cradle. Then the storm — and the lake brought you two."','built'),
     O('hint','tavern','any visit','the tavern keeper','"My mother sang lullabies to an empty room. Most did, back then."')]);
  B(0,'storm','The storm and the basket','About sixteen years ago the worst storm anyone remembered struck runestone after runestone across the Grasslands. At dawn a floating basket drifted out of Mirror Lake to the harbour with two babes in it, their eyes glowing rune-blue.',
    'WHO sent the basket and WHY the lightning struck the stones stay a mystery until the feast hall.','pn_saga_basket',
    [O('cut','village','a new game — the opening, panels 2–3','the opening cut-scene: the storm on the runestones, the basket on the lake','"Then came the worst storm anyone remembered — and the lightning struck the runestones, one after another."','built'),
     O('hint','stones','Grasslands spirits','their memories','Dagny: "The night of the storm I saw it from my stone: two little lights on the water, going home." · Eyvind: "That night it gave you."','built')],
    [O('hint','green','early','Elder Runa','"…Then the storm — and the lake brought you two."','built'),
     O('hint','harbour','the first visit to the harbour','the old fisher on the pier','"I pulled that basket in myself. It was warm, in all that rain."')]);
  B(0,'twins','The twins and their gift','The village raised them on goat\'s milk and old songs. They read runes no one else can, and runestones and gems light for them.',
    'WHY they can stays a mystery until the feast hall.','pn_saga_eyes',
    [O('cut','village','a new game — the opening, panels 4–5','the opening cut-scene: raised by the village; the glowing eyes and the runes','"They read runes no one else could, and the old stones woke for them."','built'),
     O('hint','green','early','Elder Runa','"Your eyes shone like the old runes when you came. Goat\'s milk put the light out — or hid it."','built'),
     O('hint','stones','the first bindstone or waystone you touch','a one-line notice','"The stone wakes under your hand — as it never has for anyone else."')],
    [O('hint','stones','Grasslands spirits','their memories','Jorunn: "Blue. Every rune in the old days was this blue. Like your eyes, they say." · Ketil: "Funny — goats raised you."','built'),
     O('hint','home','any time early','the other twin','"Remember when the well-stone lit up for us? Nobody else could do that."')]);
  B(0,'sendoff','One goes, one stays','The village, old and tired, sends one twin out into Runeheim; the other stays to keep the village and studies the old sagas the whole game — and it is they who find the Lodestar\'s word.',
    '','pn_saga_sendoff',
    [O('cut','village','a new game — the opening, panel 6','the opening cut-scene: the send-off at the gate','"One twin goes out into Runeheim; the other stays to keep the village."','built'),
     O('hint','home','the first steps','the other twin, in the library (round 80)','"I\'ll keep the village going — you bring them home. Come back and tell me everything you find."','built'),
     O('hint','home','the whole game','the other twin at their books in the library by day, asleep in the second bed in your Home at night (round 80)','(always studying the old texts)','built')],
    [O('hint','any','the first minutes','the quest journal\'s first entry','"Your twin keeps the village. Free the bound spirits — and come home with what you learn."')]);
  // ═══ II · THE BINDINGS ═══
  B(1,'binders','The bound spirits','With the gate shut, the dead had nowhere to go. Surtharn\'s Binders caught them and chained them to bindstones — forty across the four realms.',
    'That the Binders serve Surtharn is a hint at first; it is plain by Muspelheim.',null,
    [O('hint','stones','the first bindstone','its Binder rises; the freed spirit\'s memory','Bersi: "I waited at the edge of the light so long… then the chains came."','built'),
     O('cut','stones','the first spirit you free','a panel (pn_binders_free, round 78): the chains break, the spirit rises','"The chains fall away — and for the first time in years, a soul of Runeheim is free."','built'),
     O('hint','stones','the spirits of every realm','their memories','Ingolf: "The Binders don\'t come from the Ashlands. They come from under it."','built')],
    [O('hint','tome','the first Binder you meet','the Tome\'s monster entry','"Binders — chain-keepers of fire, who bind the wandering dead."','partly'),
     O('hint','stones','a Wetlands spirit','Sigrid\'s memory','"The Binders paid in Muspelheim gold. Some of us took it. That\'s how it starts."','built')]);
  B(1,'lines','The soul-lines','Each freed spirit\'s soul-line traces into the land; together the forty draw the World Tree across Runeheim — the tattoo that will one day become roads.',
    'What the drawing is FOR stays open until the fortieth.',null,
    [O('cut','stones','every spirit you free','the line traces out of its stone while the camera eases back','(a short moment, no words — the light runs into the land)','built'),
     O('cut','stones','the first spirit you free (after the chains)','a panel (pn_lines_life, round 78): the line of light running into the withered land, grass and a path following it','"Its soul-line runs out into the land… and where the light runs, life may one day follow."','built'),
     O('hint','home','after the first spirit','the other twin','"The line it left — I\'ve seen that pattern before, cut into the oldest stone on the Green."','built'),
     O('hint','map','eight of a realm\'s ten','the map page: the missing pieces as faint ghosts','(the map shows the shape it wants to finish)','built')],
    [O('hint','home','twenty freed','the other twin','"Bring me the map. The lines… they\'re drawing something. Something that wants to be finished."','built')]);
  B(1,'ashnight','The Ash Night','The night the gate shut (Year 0), Surtharn woke in Muspelheim: fire and ash fell on the Ashlands, the Ember Wall rose against the Grasslands and the Cinder Chasm split from the Highlands. The Ashlands\' people perished; their souls were bound to dig.',
    '','pn_saga_ashnight_b',
    [O('cut','ash','the Ashlands\' first freed spirit','the realm\'s panel, The Ash Night','"The night Asgard\'s gate shut, fire fell on the Ashlands and the Ember Wall rose."','built'),
     O('hint','crossing','freeing Vela (the Ember Wall passes)','the builder\'s line','"The Ember Wall is new, you know. Thirty-six years. My grandfather walked to the Ashlands for honey."'),
     O('hint','stones','Ashlands spirits','their memories','Mord: "It was night, but the sky was red, and then it was grey, and then I was here." · Njal: "The Ember Wall rose in one night."','built')],
    [O('hint','home','the first realm complete','the other twin','"The Ashlands fell first, the sagas say. The same night the sky went quiet."','built'),
     O('hint','crossing','freeing Dunn (the Chasm bridges)','the builder\'s line','"The Cinder Chasm opened the night the sky went quiet."')]);
  B(1,'stonefall','The Stone-Fall','Three years on, the Highlands\' mines were driven deeper after "a voice in the stone"; the mountains broke and the Great Scar tore open.',
    '','pn_saga_stonefall_b',
    [O('cut','high','the Highlands\' first freed spirit','the realm\'s panel, The Stone-Fall','"Three years on, the Highlands dug too deep for a voice in the stone — and the mountains broke."','built'),
     O('hint','crossing','freeing Mira (the Scar lifts)','the builder\'s line','"Surtharn\'s wardens took me for my lifts — he wanted to lower his chains deeper into the mountains."'),
     O('hint','stones','Highlands spirits','their memories','Arnor: "The miners said the stone was singing. They dug toward it. So did the mountain."','built')],
    [O('hint','site','a Highlands mine or dungeon','a runic tablet only the twins can read','"Deeper, said the voice. Deeper, and the light is yours."')]);
  B(1,'blacktide','The Black Tide','Five years after that, the Silverrun rose black from the south; the marshes drank the Wetlands\' villages and the river became a wall.',
    '','pn_saga_blacktide_b',
    [O('cut','wet','the Wetlands\' first freed spirit','the realm\'s panel, The Black Tide','"Then the Black Tide: the Silverrun rose black, and the marshes drank the villages."','built'),
     O('hint','crossing','freeing Bram (the Silverrun bridges)','the builder\'s line','"The river wasn\'t always a wall. When the Wetlands fell it rose against us, black and fast."'),
     O('hint','stones','Wetlands spirits','their memories','Liv: "The Silverrun ran black from the south, and the mill wheel turned backwards." · Magni: "It came up through."','built')],
    [O('hint','fairy','befriending the Wetlands\' fairy monarch','the monarch\'s line','"The lady of the fields wept the day the orbs closed. Her tears are why the marsh is so deep."')]);
  B(1,'barriers','The barriers and the builders','The Ember Wall, the Great Scar, the Silverrun and the Cinder Chasm cut the realms apart. Four builders, taken by Surtharn\'s wardens, can reopen the crossings once freed.',
    '',null,
    [O('hint','crossing','freeing each builder','their line, then the crossing reopens','Bram, Mira, Dunn, Vela — one line each about how their barrier rose'),
     O('cut','crossing','Bram freed — the Silverrun','a panel (pn_build_bram, round 78): Bram raises the bridge, the first travellers cross','"Bram raises the Silverrun bridge — for the first time in years, the Grasslands and the Wetlands touch again."','built'),
     O('cut','crossing','Mira freed — the Great Scar','a panel (pn_build_mira): Mira\'s lift climbs the cliff','"Mira\'s lift climbs the Great Scar — the road to the Highlands is open."','built'),
     O('cut','crossing','Dunn freed — the Cinder Chasm','a panel (pn_build_dunn): the last rivet in the iron bridge','"Dunn drives the last rivet into his iron bridge — across the Cinder Chasm lie the Ashlands."','built')],
    [O('hint','any','the quest journal','the quest\'s text when a crossing opens','"Bram rebuilt the Silverrun bridge. The Wetlands are open."','partly')]);
  B(1,'pact','The bargain of fire and false light','Surtharn and the one on the high seat made a pact: fire took the land, false light took the sky. Surtharn was promised gems from every realm; Muspelheim and Asgard are tied — break the fire and the sky will fall to you.',
    'Only hinted until Muspelheim; the false god\'s face stays hidden until the citadel.',null,
    [O('hint','fairy','befriending the Ashlands\' fairy monarch','the monarch\'s line','"Fire and false light made a bargain. One took the land, the other the sky. Neither keeps a promise."'),
     O('hint','stones','Ashlands spirits','their memories','Unn: "Muspelheim and Asgard are tied. Break the fire and the sky will fall to you." · Ranveig: "He said a god had promised him them."','built'),
     O('cut','musp','Surtharn\'s throne','his intro boast, spoken over his first panel','"The bright one gave me the land for the sky. Every gem of Runeheim is mine by right!"','partly')],
    [O('hint','forge','a forge\'s hearth hall','a runic tablet','"Sky for land, light for fire. So it was sworn."')]);
  // ═══ III · THE HIDDEN SKY ═══
  B(2,'gate','The gate shut — a mask on the high seat','Year 0: Solmyrk, a thing of stolen light, came to Asgard wearing a golden mask, caught Odin and Freya, sat on Odin\'s high seat, took his names and shut the gate. No soul could rise; none came down.',
    'That he is an impostor stays half-hidden until the citadel: here only "someone in a golden mask".','pn_saga_gate',
    [O('cut','sky','the twentieth spirit','a glimpse: the shut golden gate, a masked figure on the high seat','"High above, a golden gate had shut. On Odin\'s high seat sat someone in a golden mask."','built'),
     O('hint','stones','spirits of every realm','their memories','Vigdis: "One verse was always missing — the one about who sits on the high seat." · Kolbein: "The one on the high seat has one eye too. But his eye has never seen anything."','built'),
     O('hint','fairy','befriending the Highlands\' fairy monarch','the monarch\'s line','"Two great lights went dark above the clouds. Something golden sat down where they had been."')],
    [O('hint','tome','after the glimpse','the Tome\'s Saga page, chapter: The Gate','the glimpse panel kept in the tapestry'),
     O('hint','green','twenty freed','Elder Runa','"My grandmother said the Allfather had two eyes once, and a laugh like thunder. The one up there doesn\'t laugh."')]);
  B(2,'orbs','The gods in their prison','Solmyrk caught Odin and Freya in two great orbs of their own light, joined like an infinity sign, floating in the feast hall of Asgard.',
    'Who is in the orbs is shown (not named) at the thirtieth; named in the feast hall.','pn_saga_orbs',
    [O('cut','sky','the thirtieth spirit','a glimpse: two orbs in a dark hall, figures asleep inside','"In a dark hall far above, two great lights float side by side, asleep — and something in a golden mask keeps watch."','built'),
     O('hint','stones','Ashlands spirits','their memories','Vali: "There were two thrones in the feast hall once. Now there are none, and two moons inside." · Sverri: "I saw two lights go out above the clouds that night, like a pair of eyes closing."','built'),
     O('hint','fairy','befriending the Grasslands\' fairy monarch','the monarch\'s line','"Before the quiet, my court danced on the Bifröst. The one with the spear and the one with the falcon cloak laughed with us."')],
    [O('hint','home','thirty freed','the other twin','"I dreamed of two moons in a dark room. They were breathing."'),
     O('cut','hall','the feast hall','your twin walks in beside you and casts Godsbane with you — two beams into the orbs (pn_fh_cast_twins, round 78)','"Godsbane — the two of you together, into the very centre, where the two lights meet."','built')]);
  B(2,'tattoo','The World Tree complete','When all forty spirits are free — after the end — their lines join into one great World Tree across Runeheim, and it shines under Mirror Lake like a tattoo under the water, and stays.',
    '','pn_saga_tattoo',
    [O('cut','lake','the fortieth spirit, after the end','the World Tree under Mirror Lake (pn_world_tree, round 78), and its light stays in the lake','"And under Mirror Lake, where the twins were found, the World Tree shines — whole at last."','built'),
     O('cut','sky','the fortieth spirit, after the end','a glimpse: the whole tattoo seen from high above, a ring opening in the clouds','"Forty spirits free: across all Runeheim the lines of light join into one great tree — and above the lake, the clouds begin to open."','built'),
     O('hint','map','the fortieth spirit','the map page complete, glowing','(the map\'s tree finished)','built')],
    [O('hint','home','forty freed','the other twin','"It\'s finished. The tree on the Green… it\'s the same tree. It always was."')]);
  // ═══ IV · FIRE ═══
  B(3,'forges','The forges and the Lodestar','Four forges of Muspelheim rise from the sea. Their hearths, the Heartglasses and the Sovereign staff make the Lodestar — the one thing that can carry Godsbane.',
    '',null,
    [O('hint','forge','each forge','its rules window and the forge-master','the forge pop-ups (what each hearth needs)','built'),
     O('hint','workshop','Mira\'s workshop','Mira, while she makes the hearth trays','"The forges were built to melt the gods\' light into chains. We\'ll melt it back."','partly'),
     O('cut','musp','the moment the Lodestar is first made (the proposed place for its video)','a panel (pn_forges_lodestar, round 78): the four heart-glasses pour their light into the staff at the great hearth','"At Muspelheim\'s great hearth the four heart-glasses pour their light into the staff — the Lodestar is made."','built')],
    [O('hint','any','the forges rise','the quest journal','"Four forges in the sea. Each hearth, a key."','partly')]);
  B(3,'surtharn','Surtharn falls; Asgard comes down','Surtharn falls in six forms; the great hearth makes the Lodestar; Muspelheim collapses and sinks — and with the fire broken, Asgard descends from the sky onto Mirror Lake.',
    '','pn_asg_lake_a',
    [O('cut','musp','Surtharn and the escape','his phase panels, Muspelheim sinking, Asgard in the sky, Asgard on the lake','"The last ember — Surtharn becomes the volcano itself!" … "Asgard comes down onto the lake."','built'),
     O('hint','green','after Muspelheim','Elder Runa','"Fire in the sea. My mother said the mountain over the water was asleep. It was waiting."')],
    [O('hint','home','Asgard on the lake','the other twin','"The basket came from the lake. Whatever is up there, it knows us."','built')]);
  B(3,'godsbane','Godsbane and the Bifröst','The other twin, who has studied the old sagas the whole game, finds the Lodestar\'s one word — Godsbane — and teaches it once the Lodestar is whole. Set in the pier\'s notch, the Lodestar raises the Bifröst to Asgard\'s gate, and the spirits bless the road.',
    '',null,
    [O('cut','home','the Lodestar in hand — [Tab] by your twin (the library by day; wake them at Home by night)','the twin\'s lesson (pn_twin_teach, round 78) and the word','"I\'ve been reading these texts since the day you left. Say it with me: GODSBANE."','built'),
     O('hint','harbour','the pier notch','the notch wants the word first; then the Bifröst rises and the spirits bless the road','"The staff fits the notch, but it does not wake… find them in the library and ask."','built'),
     O('cut','harbour','the pier notch','a panel: the Bifröst rising from the notch to the gate','"From the notch, a bridge of light runs out across the lake to the gods\' gate."')],
    [O('hint','tome','learning it','the Tome\'s skills page','Godsbane — what it does','partly')]);
  // ═══ V · ASGARD ═══
  B(4,'impostor','The false god unmasked','In the citadel\'s throne hall the masked one rises — Solmyrk. His golden mask splits: he is an impostor in Odin\'s stolen face, and under the light there is only dark.',
    'Revealed here.','pn_sol_12_b',
    [O('cut','citadel','Solmyrk\'s three phases','his phase panels','"The golden mask splits — black light pours out." · "Behind the Allfather\'s face, something else is looking out."','built'),
     O('hint','citadel','the citadel\'s floors','the hall pop-ups','"The impostor waits on Odin\'s high seat, behind Odin\'s stolen mask."','built')],
    [O('hint','citadel','his fall','the notice when he falls','"Solmyrk falls — the mask shatters, and the gate of heaven stands open."','built')]);
  B(4,'feasthall','The feast hall','Behind the high seat, the feast hall of the gods: dusty tables, two empty high seats, and the two orbs floating joined like an infinity sign.',
    '','pn_fh_orbs',
    [O('cut','hall','Solmyrk falls','panels: the citadel shakes; the doors open; inside, the orbs — then you walk in','"Inside, two great orbs of light float joined like an infinity sign…"','built')],
    [O('hint','circle','an older save, or if you left','the rune circle points you back to the feast hall','"The gods are still bound in the feast hall — go to them."','built')]);
  B(4,'freed','The gods freed','Godsbane, cast into the centre where the two lights meet, bursts the orbs into a million shards of light: Odin and Freya stand free.',
    'Their names are spoken for the first time.','pn_fh_gods',
    [O('cut','hall','[Tab] at the orbs with the Lodestar','panels: the cast, the shards, the gods — then they stand in the hall','"…and in the falling light stand Odin and Freya — free."','built')],
    [O('hint','tome','after','the Tome: Odin and Freya\'s character entries','their pictures and a line each','partly')]);
  B(4,'truth','The truth about the twins','On the night Solmyrk took them, Odin and Freya had one breath of light left. They spent it on two sparks of their own light and sent them down in the storm; the lightning woke the runestones so the twins could find their way. The twins are the gods\' last gift to Runeheim.',
    'The game\'s big secret — nothing before this gives it away.','pn_fh_truth_m',
    [O('cut','hall','after they are freed','the truth panel, then the gods\' six lines','"We sent you down in the storm. The lightning woke the runestones, so that one day they would wake for you."','built')],
    [O('hint','home','back in the village, after the end','the other twin','"So that\'s why the stones answer us. We were never really foundlings."'),
     O('hint','tome','after the end','the Tome\'s Saga page, last chapter: The Gift','the truth panel kept in the tapestry')]);
  // ═══ VI · HOME ═══
  B(5,'home','The spirits go home','At the heart of Asgard, Godsbane into the sky remakes the Bifröst into heaven; Odin and Freya lead the spirits home — the warriors to Valhalla, the rest to Fólkvangr — and the familiars and fairy monarchs go with them, into legend.',
    '','pn_end_gods_lead',
    [O('cut','circle','[Tab] at the rune circle, the gods free','the engine scene and panels: the cast, the Bifröst, the spirits rising, the gods leading them, the farewell','"Odin and Freya walk up the Bifröst, and the spirits of Runeheim follow them home."','built'),
     O('hint','circle','on the Bifröst','Freya\'s line','"Valhalla for the brave, Fólkvangr for the rest — and every one of them home."')],
    [O('hint','map','after','the map page: the spirits\' stones empty and green','(no words)','partly')]);
  B(5,'green','Lightning and vines','At the village the gods cast once more: Odin\'s blue lightning wakes every runestone at once, Freya\'s vines run the spring out along the soul-lines, and the lines of light become roads of grass and stone across the land.',
    '','pn_vil_vines',
    [O('cut','green','after the Bifröst','the scene on the Green with the gods casting, and its panels','"Freya kneels, and the spring runs out of her hands along the soul-lines."','built')],
    [O('hint','hamlets','after the end','the hamlet folk, each in their workshop','"The roads came the morning after. My grandfather said the lines had always been there — waiting."','built')]);
  B(5,'world','Runeheim changed','The forges of Muspelheim sink into the sea; Asgard settles into Mirror Lake with only its golden spires above the water; the monsters fade into motes of light; people walk out on the new roads to build homes in every realm.',
    'Shown in panels; in the world (Asgard sinking, monsters gone) is still to build.','pn_vil_asgard',
    [O('cut','village','after the vines','five panels: the land green, the forges, Asgard, the monsters, the roads','"Asgard settles into Mirror Lake. Only its golden spires stay above the water."','built'),
     O('hint','any','free roam after the end','the world itself: spires in the lake, no monsters, hamlets everywhere','(you walk it)','partly')],
    [O('hint','hamlets','after the end','the hamlet folk and children','"No monsters any more. Mum says I can go to the next hamlet on my own now."','partly')]);
  B(5,'children','Children again','The village celebrates the twins; time passes; children are born again in Runeheim — Pip and Wren among the first — and every hamlet has its own.',
    '','pn_cel_children',
    [O('cut','green','after the land turns green','panels: the celebration, time passing, children again','"And children were born again in Runeheim."','built'),
     O('hint','hamlets','free roam after the end','the children at play in every hamlet, and the newborns in the midwives\' cradles','"We play twins. I always have to be Zeldor…"','built')],
    [O('hint','green','after the end','Pip and Wren on the Green','"Marta gives me an apple if I sweep round the carts!"','built')]);
  B(5,'credits','The credits — and after','The credits roll over the night lake (the forty spirits named); the last picture: the twins on a hill over a green Runeheim. Then you play on.',
    '','pn_after',
    [O('cut','village','after the celebration','the credits, then the last picture','"Runeheim is green again. Your journey goes on."','built')],
    [O('hint','tome','after the end','the Tome\'s Saga page, complete','the whole tapestry lit')]);
})();
