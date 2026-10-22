// ═══════════════════════════════════════════════════════════════════════
// ║ 07zau-audio-cues.js — round 72 (Kris, N1): "music and ambiance are going to be new files requests with Suno. we might need to do API
// ║ requests like we did for painted images. Prepare a proposal for this, including all of the music you think we need throughout the game
// ║ as well as what sounds effects, and how to pull this off".
// ║ The list of every sound the game would use — music, ambience, stingers and effects — with where it plays and the words to make it.
// ║ Shared with the Lab (07* files are), so Lab → Music & sound shows the same list Kris reviews; docs/32 is written from it.
// ║ Nothing plays yet: the game keeps its procedural sound (04c-audio.js, ZSFX) until files arrive (doc 32 §5).
// ║ A cue: [id, group, name, where it plays, the request words, seconds, loop (1/0), tier (1 first wave · 2 · 3 nice to have), bpm]
// ═══════════════════════════════════════════════════════════════════════
var ZAUD={
  // the house style, added to every music request (Suno's "Style of music" box)
  // round 72h (Kris's own Suno tracks and prompts: "epic … makes you think you might be in a dungeon, has plenty of electronic music influences
  // as well as nordic influences"; the dungeon remix: "a more intense dungeon theme … even more deep bass lines"): Nordic folk meets electronic
  STYLE:'epic fantasy RPG game score, Nordic folk meets dark electronic: nyckelharpa, hardanger fiddle, tagelharpa, frame drums and war drums over deep sub bass, dark synth pads and pulsing electronic arpeggios, cinematic and mysterious, ancient halls',
  // the gentle pieces (the village, nights, the last saga, the voiced and violin pieces) keep the same world in a softer form
  STYLE_SOFT:'fantasy RPG game score, Nordic folk with a subtle electronic touch: nyckelharpa, hardanger fiddle, lyre, wooden flute, soft synth pads, warm low bass, cinematic and intimate, ancient and tender',
  // the feel per group, added after the cue's own words (the dungeon family takes Kris's remix words)
  FLAVOR:{title:'grand and epic, the electronic pulse woven under the folk instruments',village:'warm and homely, acoustic instruments in front',realms:'open and adventurous, a steady electronic pulse under folk melodies',
    sites:'an intense dungeon theme with even deeper bass lines, driving electronic rhythm, echoing stone',fights:'intense and driving, heavy deep bass, pounding war drums and electronic beats',endgame:'massive and dark, deep bass, war drums, electronic pulse, a sense of fate',
    last:'cinematic and emotional, the electronic elements soft and wide',sting:'a short musical moment, no electronic beat'},
  // round 72h (Kris): some — not all — pieces carry a voice or a solo: an elven woman's wordless song ("brings you to tears"), deep wordless
  // dwarven men's voices over low drumming, or a slow piercing violin
  VOX:{mu_saga_storm:'elf',mu_village_night:'elf',mu_grass_night:'elf',mu_glimpse:'elf',mu_gods_free:'elf',mu_glimmerhall:'elf',mu_credits:'elf',
    mu_saga_old:'dwarf',mu_high_day:'dwarf',mu_forges:'dwarf',mu_castle:'dwarf',
    mu_wet_night:'violin',mu_ash_night:'violin',mu_high_night:'violin',mu_feast_hall:'violin',mu_asgard_down:'violin',mu_bifrost:'violin'},
  VOXSTYLE:{elf:'a solo ethereal female voice singing a wordless elven melody (vocalise, no words), pure, tender and heartbreaking, slow',dwarf:'deep low male choir humming and chanting wordlessly like dwarves in a mountain hall, grave and slow, over low resonant drumming',violin:'a slow, piercing, aching solo violin in the high register carries the melody'},
  VOXLYRICS:{elf:'[Intro]\n[Instrumental]\n\n[Verse]\n[Wordless female vocalise, soft and high]\nAaah… ooh… aaah…\n\n[Instrumental break]\n\n[Verse]\n[Wordless female vocalise, aching]\nOoh… aaah… ooh…\n\n[Outro]\n[Instrumental]',
    dwarf:'[Intro]\n[Low drums]\n\n[Verse]\n[Deep male choir humming, wordless]\nMmm… ohh… mmm…\n\n[Instrumental break]\n\n[Verse]\n[Deep male choir, low wordless chant]\nOhh… mmm… ohh…\n\n[Outro]\n[Low drums]'},
  // Kris's own tracks to start from in Suno (Remix / Cover with these words): the dungeon family from "Untitled (Extend)", the rest from scratch
  REMIX:{mu_dungeon:'Untitled (Extend)',mu_tower:'Untitled (Extend)',mu_castle:'RPG intro',mu_mage:'Untitled (Extend)',mu_boss:'Untitled (Extend)',mu_boss_realm:'Untitled (Extend)',mu_title:'RPG intro'},
  EXCLUDE:'lyrics, words, rap, pop vocals, autotune, EDM drop, dubstep, electric guitar',
  // ambience and effects are asked of a sound-effects model in plain words; this is added to each
  SFXSTYLE:'fantasy adventure game sound effect, clean, close, no music, no voices',
  AMBSTYLE:'seamless looping ambience for a fantasy game, no music, no voices, steady, no sudden events',
  GROUPS:[['title','Title & story'],['village','The village & home'],['realms','The four realms'],['sites','Adventure sites'],['fights','Fights'],['endgame','The forges, Muspelheim & Asgard'],['last','The last saga'],['sting','Stingers (short musical moments)'],
    ['amb','Ambience (loops under the music)'],['hero','Hero'],['spell','Spells & skills'],['mon','Monsters'],['boss','Bosses'],['fam','Familiars & mounts'],['world','World & objects'],['story','Story moments'],['ui','Menus & screens'],['folk','Village life']],
  MUSIC:[
    ['mu_title','title','The Quests of Zeldara and Zeldor — main theme','the title page and the save slots','main theme; a slow noble melody on hardanger fiddle over a droning nyckelharpa and a low choir hum, a four-note rising motif (the twins) that returns, builds to one hopeful full statement with frame drums, then settles so it can loop',150,1,1,72],
    ['mu_saga_storm','title','The storm and the foundlings','the opening saga panels: the storm on Mirror Lake, two babies found in the reeds','storm at night giving way to a fragile lullaby; thunder-like drums at first, then a solo lyre and a soft wordless female voice; the twins\' four-note motif at the end',100,0,1,60],
    ['mu_saga_old','title','The old sorrows','the saga panels of the old disasters (the Ash Night, the Stone-Fall, the Black Tide, the Long Quiet)','somber legend; slow tagelharpa and low male choir, distant horn, a heavy grief; like an old tale told by a fire',120,0,2,56],
    ['mu_glimpse','title','A glimpse of the past','the saga glimpses after freed spirits (the gate, the two orbs, the tattoo)','mysterious memory; shimmering bowed strings and a music-box lyre, a hint of the twins\' motif, unresolved',45,0,2,64],
    ['mu_village_day','village','Mirror Lake village — day','the village and the Green, by day','cheerful lakeside village; plucked lute and wooden flute, light hand drum, a gentle fiddle dance; homely and safe',120,1,1,96],
    ['mu_village_night','village','Mirror Lake village — night','the village at night','quiet village night; solo lyre and soft flute, sparse, a lullaby, room for crickets',120,1,1,70],
    ['mu_home','village','The hearth','your home, with the other twin; sleeping','cozy hearth; gentle lyre and humming, warm, slow, like a family song',90,1,2,66],
    ['mu_shops','village','Shops and workshops','the smith, the jeweller, the apothecary, Mira\'s workshop, the hamlet workshops','busy friendly craft music; lute and fiddle, wooden percussion like tools tapping, bright',90,1,2,100],
    ['mu_glimmerhall','village','Glimmerhall','Glimmerhall, with Sólveig','magical shimmering hall; bowed glass-like strings, harp, soft choir, wonder',90,1,3,72],
    ['mu_green','village','Runeheim green again','the village and the hamlets after the end (free roam)','the main theme as a joyful pastoral: flute and fiddle, children-song lightness, sunlight; the four-note motif',150,1,2,92],
    ['mu_grass_day','realms','The Grasslands — day','the Grasslands (north-east), by day','rolling meadows and open sky; wandering fiddle melody over plucked strings and light frame drum, adventurous and bright',150,1,1,100],
    ['mu_grass_night','realms','The Grasslands — night','the Grasslands at night','calm open night; soft flute, slow lyre, distant drone, stars',120,1,2,70],
    ['mu_wet_day','realms','The Wetlands — day','the Wetlands, by day','misty marsh; reed pipes and watery harp, slow nyckelharpa, a little eerie but beautiful',150,1,1,84],
    ['mu_wet_night','realms','The Wetlands — night','the Wetlands at night','will-o\'-the-wisp night; airy flute, deep drone, soft bells, mysterious',120,1,2,64],
    ['mu_high_day','realms','The Highlands — day','the Highlands, by day','mountain wind and cliffs; big horn calls, wordless high herding call, strong drums, majestic',150,1,1,90],
    ['mu_high_night','realms','The Highlands — night','the Highlands at night','cold mountain night; lonely fiddle, wind-like choir, slow',120,1,2,60],
    ['mu_ash_day','realms','The Ashlands — day','the Ashlands, by day','smouldering wasteland; low drones, metallic hand percussion, tagelharpa, tense and dry',150,1,1,88],
    ['mu_ash_night','realms','The Ashlands — night','the Ashlands at night','embers at night; deep drone, slow heartbeat drum, dark choir murmur',120,1,2,58],
    ['mu_dungeon','sites','Caverns below','the dungeons and caves (floors going down)','dark cavern exploration; dripping plucks, low drone, slow bowed strings, cautious tension, no melody that tires',150,1,1,70],
    ['mu_tower','sites','Towers above','the towers (floors going up), the master builders\' towers','climbing a strange tower; airy strings and harp arpeggios, curious, rising',120,1,2,84],
    ['mu_castle','sites','Castle halls','the island castles','stern old castle; horns, marching frame drum, low strings, proud and cold',120,1,2,92],
    ['mu_mage','sites','The mage towers','the sixteen mage towers','arcane study; bell-like tones, harp, whispering choir, magical and uneasy',120,1,2,76],
    ['mu_island','sites','Harbor islands','the harbor islands and their dungeons\' shores','sea-going adventure; shanty-like fiddle and drum, waves of strings, brave',120,1,2,104],
    ['mu_trial','sites','The fairy trials','the trial realm of the fairies','playful otherworldly game; music-box lyre, pizzicato, light bells, a little mischievous',90,1,2,116],
    ['mu_sky','sites','Skyports and floating islands','the skyports and the floating islands','soaring high above; wide strings, flute, light drums, freedom',120,1,3,96],
    ['mu_fight','fights','Skirmish','fighting a pack or a camp\'s guards in the open','fast skirmish; driving frame drums and fiddle ostinato, urgent, short loop',60,1,1,140],
    ['mu_boss','fights','Guardian','the bosses of the adventure sites','boss fight; pounding drums, aggressive fiddles, low choir shouts without words, heavy and relentless',120,1,1,132],
    ['mu_boss_realm','fights','The bane of the realm','the four realms\' great multi-phase bosses','epic boss fight in rising stages; huge war drums, full choir, horns, a menacing riff; download the stems too so later phases can add layers',150,1,1,128],
    ['mu_boss_mage','fights','The master\'s duel','the mage towers\' masters','magical duel; frantic harp and strings, bells, choir stabs, clever and dangerous',120,1,2,136],
    ['mu_forges','endgame','The forges','the four forges and their challenges','molten forge; anvil hits as percussion, deep bellows-like drones, heavy and hot, determined',120,1,1,110],
    ['mu_muspelheim','endgame','Muspelheim','inside Muspelheim','the fire realm; overwhelming low brass-like drones, war drums, roaring choir, hellish heat',150,1,2,100],
    ['mu_surtharn','endgame','Surtharn','the fight with Surtharn','fire giant boss; colossal drums, roaring low choir, frantic fiddles, apocalyptic',150,1,1,138],
    ['mu_escape','endgame','Escape!','the escape run out of Muspelheim, and the sinking causeway','frantic escape against the clock; very fast drums and fiddle runs, rising, no rest',90,1,1,164],
    ['mu_asgard_down','endgame','Asgard comes down','the descent: a ring of light, the golden city settles into the lake','awe; slow choir swelling, bright bells, a vast golden chord, then silence',60,0,2,60],
    ['mu_asgard','endgame','The golden city','walking Asgard\'s empty streets','majestic but hollow golden city; slow choir, harp, distant horns, something missing, eerie beauty',150,1,1,76],
    ['mu_citadel','endgame','The citadel','the citadel\'s four floors','rising dread; low strings, ticking percussion, choir whispers, climbing to the throne',120,1,2,96],
    ['mu_solmyrk','endgame','Solmyrk, the Black Sun','the final fight with Solmyrk (three phases)','final boss; enormous drums, dark full choir, a false-god anthem twisted, horns; stems so the last phase can add choir and drums',180,1,1,126],
    ['mu_feast_hall','last','The feast hall','the feast hall after Solmyrk: the two joined orbs','held breath; the orbs\' hum, slow celestial strings, two soft wordless voices (a man and a woman) far away',120,1,1,60],
    ['mu_gods_free','last','Odin and Freya','the orbs burst; the gods stand free and tell the truth','revelation and tenderness; full warm strings and choir, the twins\' four-note motif at last complete',100,0,1,66],
    ['mu_bifrost','last','The Bifröst','the gods lead the spirits up the new Bifröst','ascension; soaring choir and strings, shimmering harp, a rainbow of sound, farewell',120,0,1,72],
    ['mu_village_moment','last','Lightning and vines','back at the village: Odin\'s blue lightning, Freya\'s green vines, the land turning green','rebirth; thunder drums giving way to blooming strings and flutes, joy rising',90,0,2,84],
    ['mu_celebration','last','The celebration','the feast for the twins, time passing, children born again','joyous village feast dance; fast fiddles, stamping, clapping, flutes, everyone dancing',120,1,1,128],
    ['mu_credits','last','Credits','the credits','a credits suite: the main theme, then the village, the four realms and the celebration, ending in the twins\' motif, about four minutes',240,0,1,84],
    ['st_spirit','sting','A spirit is freed','a spirit freed from its bindstone','short uplifting sting, choir swell and bright chime, 6 seconds',6,0,1,0],
    ['st_rune','sting','A soul-line lights','a runestone lights and its line is traced','short rising shimmer sting with a soft drum, 4 seconds',4,0,1,0],
    ['st_quest','sting','Quest done','a quest is finished','short triumphant folk fanfare on fiddle and drum, 4 seconds',4,0,1,0],
    ['st_level','sting','Level up','you go up a level','short bright rising arpeggio, 3 seconds',3,0,1,0],
    ['st_boss_down','sting','Boss defeated','a boss falls','short victorious horn and choir sting, 6 seconds',6,0,1,0],
    ['st_death','sting','You fall','the hero falls','short sorrowful low strings sting, 5 seconds',5,0,1,0],
    ['st_discover','sting','A new place','you find a new place or site','short curious flute and harp sting, 4 seconds',4,0,2,0],
    ['st_treasure','sting','Treasure','a rare item or a chest','short sparkling sting with a plucked chord, 3 seconds',3,0,2,0],
    ['st_glimpse','sting','A glimpse opens','a saga glimpse begins','short mysterious swell, 4 seconds',4,0,2,0]],
  AMB:[
    ['am_meadow_day','amb','Meadow by day','Grasslands days; the village edge','birdsong, light breeze in long grass, distant insects',30,1,1],
    ['am_meadow_night','amb','Meadow at night','Grasslands and the village at night','crickets, a far owl now and then, soft wind',30,1,1],
    ['am_marsh','amb','Marsh','the Wetlands','frogs, reeds rustling, water lapping, a heron far off',30,1,1],
    ['am_highwind','amb','Mountain wind','the Highlands','strong gusting wind over rocks, a hawk far off',30,1,1],
    ['am_ash','amb','Ashlands','the Ashlands','low rumbling earth, crackling embers, dry hot wind',30,1,1],
    ['am_lake','amb','Lake shore','Mirror Lake, the pier, the harbors','gentle waves on a shore, wooden boats creaking, gulls far off',30,1,1],
    ['am_village','amb','Village life','the village by day','distant chatter without words, a hammer on an anvil far off, chickens, a cart',30,1,2],
    ['am_rain','amb','Rain','rain anywhere outdoors','steady rain on grass and leaves',30,1,2],
    ['am_cave','amb','Cave','the dungeons and caves','water dripping in a cave, low hollow air, faint distant rumble',30,1,1],
    ['am_tower','amb','Tower','the towers and mage towers','wind whistling through stone windows, creaking wood, faint magic hum',30,1,2],
    ['am_castle','amb','Castle hall','the castles','large stone hall air, distant torches crackling, chains clinking faintly',30,1,2],
    ['am_forge','amb','Forge','the forges and Muspelheim','roaring furnace, bubbling lava, bellows breathing',30,1,1],
    ['am_asgard','amb','Asgard','the golden city and the citadel','high clean wind, soft wind chimes, a distant choir-like hum',30,1,2],
    ['am_sky','amb','Sky','the skyports and floating islands','high altitude wind, flapping banners',30,1,3],
    ['am_sea','amb','Open sea','the coasts and the islands','ocean waves on rocks, wind, gulls',30,1,2],
    ['am_orbs','amb','The joined orbs','the feast hall','a deep resonant magical hum, slowly pulsing, faint whispers of light',20,1,1]],
  SFX:[
    // hero
    ['sfx_step_grass','hero','Footsteps on grass','walking (each step, pitch varies)','a single soft footstep on grass',0.5,0,2],['sfx_step_stone','hero','Footsteps on stone','floors, roads, Asgard','a single boot footstep on stone',0.5,0,2],['sfx_step_wood','hero','Footsteps on wood','piers, bridges, houses','a single boot footstep on wooden planks',0.5,0,2],['sfx_step_water','hero','Splashing step','shallow water','a single footstep splash in shallow water',0.5,0,3],
    ['sfx_sword_swing','hero','Sword swing','attack (Space)','a quick sword whoosh',0.5,0,1],['sfx_sword_hit','hero','Sword hit','a sword blow lands','a sword striking a creature, meaty slash',0.5,0,1],['sfx_axe_swing','hero','Axe swing','the heavy axe swing','a heavy axe whoosh, slower and deeper',0.7,0,1],['sfx_axe_hit','hero','Axe hit','an axe blow lands','a heavy axe chop impact',0.6,0,1],
    ['sfx_bow_draw','hero','Bow draw','drawing the bow','a wooden bow string being drawn',0.6,0,2],['sfx_bow_shot','hero','Bow shot','loosing an arrow','an arrow released from a bow, twang and whoosh',0.6,0,1],['sfx_crossbow','hero','Crossbow','a crossbow shot','a crossbow firing, mechanical click and thunk',0.6,0,2],['sfx_arrow_hit','hero','Arrow hit','an arrow lands','an arrow thudding into a target',0.4,0,1],
    ['sfx_block','hero','Shield block','blocking with the shield','a blow hitting a wooden shield with metal rim',0.5,0,1],['sfx_roll','hero','Roll','rolling (Alt)','a quick body roll on the ground, cloth and dust',0.6,0,1],['sfx_hurt','hero','Hurt','the hero is hit','a short grunt-free impact on leather armor with a thump',0.4,0,1],['sfx_fall','hero','The hero falls','the hero is knocked down','a body collapsing to the ground with armor rattle',1.2,0,1],
    ['sfx_drink','hero','Drink a potion','potions and tonics','uncorking a small glass bottle and drinking',1.0,0,1],['sfx_eat','hero','Eat','food','a crunchy bite of bread or apple',0.6,0,2],['sfx_dig','hero','Dig','digging','a spade digging into soil',0.8,0,2],['sfx_chop','hero','Chop','chopping trees','an axe chopping into a tree trunk',0.6,0,2],
    // spells and skills
    ['sfx_fire','spell','Fire spell','fire spells, fire skills','a fireball whooshing and bursting',1.0,0,1],['sfx_frost','spell','Frost spell','frost and ice','an ice shard spell crystallising and shattering',1.0,0,1],['sfx_lightning','spell','Lightning','lightning spells','a crackling lightning bolt strike',1.0,0,1],['sfx_earth','spell','Earth','earth spells, quakes','a rumbling rock eruption from the ground',1.2,0,1],
    ['sfx_nature','spell','Nature','nature and vines','vines and roots bursting from the ground, leaves rustling',1.2,0,1],['sfx_water','spell','Water','water spells','a surging water wave splash',1.0,0,1],['sfx_light','spell','Light','light, healing, sovereign','a warm magical chime with a soft glow swell',1.0,0,1],['sfx_dark','spell','Shadow','shadow and curses','a dark whispering magical pulse',1.0,0,2],
    ['sfx_godsbane','spell','Godsbane','the Lodestar\'s beam','a massive holy beam of white-gold light firing, choir-like shimmer and a deep boom',2.0,0,1],['sfx_mana','spell','Mana restored','mana restored','a cool magical sparkle rising',0.8,0,2],['sfx_nomana','spell','Can\'t cast','not enough mana, cooldown','a soft dull magical fizzle',0.5,0,1],['sfx_skill','spell','Skill','a skill (Z)','a quick powerful whoosh with a magical edge',0.8,0,2],
    // monsters (by kind)
    ['sfx_beast_growl','mon','Beast growl','wolves, boars, bears — alert','an animal growl, wolf-like',1.0,0,1],['sfx_beast_bite','mon','Bite','beasts attacking','a snapping animal bite',0.4,0,1],['sfx_slime','mon','Slime','slimes and blobs','a wet squelch',0.5,0,1],['sfx_insect','mon','Insect','spiders, beetles, wasps','insect chittering and clicking',0.8,0,1],
    ['sfx_undead','mon','Undead','skeletons, wraiths','bones rattling and a hollow moan',1.0,0,1],['sfx_spirit_mon','mon','Spirit','spirits and ghosts','an eerie ghostly wail, airy',1.0,0,2],['sfx_golem','mon','Golem','stone and metal creatures','grinding stone and heavy rocky footsteps',1.0,0,2],['sfx_bird','mon','Bird','harpies, birds','a sharp bird screech',0.6,0,2],
    ['sfx_serpent','mon','Serpent','snakes, wyrms','a long hiss',0.8,0,2],['sfx_drake','mon','Drake','drakes and dragons','a dragon roar, mid-sized',1.5,0,2],['sfx_spit','mon','Spit / shot','monster projectiles','a creature spitting a glob',0.5,0,1],['sfx_summon','mon','Summon','a monster summons others','a magical portal opening with a crackle',1.0,0,2],
    ['sfx_mon_hit','mon','Monster hit','a monster takes a blow','a fleshy hit impact',0.3,0,1],['sfx_mon_armor','mon','Armoured hit','an armoured or shelled monster','a blow on armor plates, metallic clank',0.3,0,2],['sfx_mon_die','mon','Monster dies','a monster is defeated','a creature collapsing and fading in a poof of dust',0.8,0,1],
    // bosses
    ['sfx_boss_roar','boss','Boss roar','a boss wakes or turns','a huge monstrous roar, deep and long',2.0,0,1],['sfx_boss_stomp','boss','Stomp','heavy boss steps and slams','a colossal stomp shaking the ground',1.0,0,1],['sfx_boss_slam','boss','Slam','area slams','a giant weapon slamming the ground, debris',1.2,0,1],['sfx_boss_phase','boss','Phase change','a boss enters a new phase','a dark magical transformation surge rising to a burst',2.5,0,1],
    ['sfx_boss_charge','boss','Desperation charge','a boss\'s desperation move charging','an ominous charging-up hum rising in pitch',2.0,0,1],['sfx_shield_break','boss','Ward breaks','a boss ward or shield breaks','a magical barrier shattering like glass',1.0,0,1],['sfx_boss_fall','boss','Boss falls','a boss is defeated','a giant creature crashing down, rumble fading',2.5,0,1],
    // familiars and mounts
    ['sfx_fam_call','fam','Familiar appears','a familiar joins','a small magical creature appearing with a chime',1.0,0,2],['sfx_fam_grass','fam','Grass familiar','the grass familiar\'s attack','a burst of leaves and a whip of vine',0.6,0,2],['sfx_fam_water','fam','Water familiar','the water familiar\'s attack','a water bubble shot popping',0.6,0,2],['sfx_fam_earth','fam','Earth familiar','the earth familiar\'s attack','a pebble burst thud',0.6,0,2],
    ['sfx_fam_fire','fam','Fire familiar','the fire familiar\'s attack','a small flame puff',0.6,0,2],['sfx_whistle','fam','Call the mount','M: call mount','a short two-tone whistle',0.8,0,1],['sfx_hooves','fam','Hooves','riding (loop)','horse hooves trotting on dirt, steady',3.0,1,2],['sfx_wings','fam','Wings','a flying mount (loop)','large wings flapping steadily',3.0,1,2],
    // world and objects
    ['sfx_chest','world','Chest opens','chests','a wooden chest creaking open with a clink of coins',1.0,0,1],['sfx_door','world','Door','doors into buildings and sites','a heavy wooden door opening',1.0,0,1],['sfx_locked','world','Locked','a locked or sealed door','a locked door rattling',0.6,0,2],['sfx_stairs','world','Stairs','stairs between floors','quick footsteps on stone stairs',1.0,0,2],
    ['sfx_coin','world','Coins','gold picked up','coins clinking',0.5,0,1],['sfx_pickup','world','Pick up','items picked up','a soft item pickup pop',0.3,0,1],['sfx_gem','world','Gem','gems and shards','a crystal gem chime',0.6,0,1],['sfx_waystone','world','Waystone wakes','activating a waystone','an ancient stone awakening with a magic hum',2.0,0,1],
    ['sfx_travel','world','Travel','travelling by waystone','a magical teleport whoosh',1.5,0,1],['sfx_camp','world','Camp cleared','a camp\'s guards all beaten','short victorious folk fanfare with a cheer-free drum roll',2.0,0,1],['sfx_lever','world','Lever / switch','switches and lifts','a heavy iron lever',0.6,0,3],['sfx_trap','world','Trap','spikes and traps','metal spikes springing',0.5,0,2],
    ['sfx_rubble','world','Rubble','falling rocks, crumbling','rocks crumbling and falling',1.5,0,1],['sfx_splash','world','Splash','something falls in water','a big splash',0.8,0,2],['sfx_anvil','world','Anvil','the smith, the forges','a hammer striking an anvil',0.6,0,2],['sfx_lava','world','Lava burst','lava bursts, magma','a burst of bubbling lava',1.0,0,2],
    ['sfx_bell','world','Village bell','the village bell (morning, events)','a bronze village bell ringing three times',3.0,0,3],['sfx_sleep','world','Sleep','resting in a bed','a soft blanket rustle and a calm magical chime',2.0,0,3],
    // story moments
    ['sfx_spirit_free','story','A spirit rises','a spirit is freed from its stone','a ghostly sigh turning into a bright rising chime',2.0,0,1],['sfx_rune_wake','story','Runestone wakes','a runestone lights','a deep stone hum rising into a glowing chime',2.0,0,1],['sfx_line_trace','story','Soul-line traced','the light runs along a soul-line','a long magical shimmer travelling, rising',3.0,0,1],['sfx_lodestar','story','The Lodestar set','the Lodestar set in the pier notch / the circle','a heavy crystal staff set into stone with a resonant ring',2.0,0,1],
    ['sfx_bifrost','story','The Bifröst rises','the rainbow bridge forms','a rising rainbow shimmer, bright and vast',3.0,0,1],['sfx_orbs_burst','story','The orbs burst','Godsbane into the joined orbs','two giant glass orbs bursting into millions of shards of light, sparkling rain',3.0,0,1],['sfx_thunder','story','Odin\'s lightning','the village moment, the storm','a huge thunderclap with a crackling lightning strike',2.5,0,1],['sfx_vines','story','Freya\'s vines','the vines grow across the land','vines and flowers growing fast, rustling and creaking, magical',3.0,0,1],
    ['sfx_crumble','story','The citadel shakes','after Solmyrk: the citadel crumbles','a great stone building shaking and crumbling, deep rumble',3.0,0,1],['sfx_great_door','story','The great doors','the feast hall\'s doors swing open','enormous golden doors swinging open slowly with a deep groan',3.0,0,1],['sfx_sink','story','Sinking','Muspelheim, the causeway, Asgard sinking','a vast structure sinking into water, rumbling and bubbling',3.0,0,2],['sfx_page','story','Saga page','a saga panel turns','an old parchment page turning',0.6,0,1],
    // menus
    ['sfx_ui_click','ui','Click','buttons','a soft wooden UI click',0.2,0,1],['sfx_ui_open','ui','Open','opening a menu, the Tome, the map','a leather book opening',0.5,0,1],['sfx_ui_close','ui','Close','closing a menu','a leather book closing softly',0.4,0,1],['sfx_ui_tab','ui','Page / tab','Tome tabs, pages','a quick page flip',0.3,0,2],
    ['sfx_ui_equip','ui','Equip','equipping gear','a buckle and leather strap being fastened',0.5,0,2],['sfx_ui_buy','ui','Buy / sell','shops','coins dropped on a wooden counter',0.6,0,1],['sfx_ui_error','ui','Can\'t do that','a refused action','a soft dull wooden knock',0.3,0,1],['sfx_ui_note','ui','Notice','a notice pops up','a gentle chime',0.5,0,1],
    ['sfx_ui_save','ui','Saved','the game is saved','a quill scratch and a soft seal stamp',0.8,0,2],['sfx_talk','ui','Talk','a talk box opens','a soft parchment unroll',0.4,0,2],
    // village life
    ['sfx_kids','folk','Children playing','the children at play (after the end)','distant children laughing and playing, no words',4.0,1,2],['sfx_sheep','folk','Sheep','village sheep','a sheep bleating',1.0,0,3],['sfx_goat','folk','Goats','goats','a goat bleating',1.0,0,3],['sfx_hens','folk','Hens','hens in the village','hens clucking',2.0,0,3],['sfx_feast','folk','The feast','the celebration (loop)','a happy crowd at a feast, cheering, mugs clinking, no clear words',6.0,1,2]],
  // all cues, each as an object
  all:function(){ if(ZAUD._all)return ZAUD._all; var out=[], mk=function(kind){ return function(c){ out.push({id:c[0],kind:kind,group:c[1],name:c[2],where:c[3],words:c[4],secs:c[5],loop:!!c[6],tier:c[7],bpm:c[8]||0}); }; };
    ZAUD.MUSIC.forEach(mk('music')); ZAUD.AMB.forEach(mk('amb')); ZAUD.SFX.forEach(mk('sfx')); return (ZAUD._all=out); },
  // the words to paste or send: music → Suno's style box; the rest → the sound-effects model
  request:function(c){ if(c.kind==='music')return ZAUD.suno(c).style;
    return c.words+'. '+(c.kind==='amb'?ZAUD.AMBSTYLE:ZAUD.SFXSTYLE); },
  // what goes into Suno for a music cue: Title (the cue id, so the download arrives named), Style, Lyrics (only for the voiced ones),
  // Instrumental on/off, Exclude styles, and — for a few — which of Kris's tracks to remix from
  suno:function(c){ var v=ZAUD.VOX[c.id]||null, fl=ZAUD.FLAVOR[c.group]||'';
    var soft=c.group==='village'||c.group==='last'||/_night$/.test(c.id)||v==='elf'||v==='violin';
    if(soft&&/sites|fights|endgame/.test(c.group))fl='';      /* a voiced piece in a hard group keeps its own words */
    var style=c.words+(fl?'; '+fl:'')+(v?'; '+ZAUD.VOXSTYLE[v]:'')+(c.bpm?'; about '+c.bpm+' bpm':'')+(c.loop?'; steady from start to end so it can loop, no fade-out':'')+'. '+(soft?ZAUD.STYLE_SOFT:ZAUD.STYLE);
    var voiced=v==='elf'||v==='dwarf';
    return {title:c.id, style:style, lyrics:voiced?ZAUD.VOXLYRICS[v]:'', instrumental:!voiced, exclude:voiced?ZAUD.EXCLUDE.replace('lyrics, words, ','clear words, '):ZAUD.EXCLUDE+', vocals', vox:v, remix:ZAUD.REMIX[c.id]||null}; },
  stats:function(){ var A=ZAUD.all(), s={music:0,sting:0,amb:0,sfx:0,t1:0,musicSecs:0}; A.forEach(function(c){ if(c.kind==='music'){ if(c.group==='sting')s.sting++; else { s.music++; s.musicSecs+=c.secs; } } else s[c.kind]++; if(c.tier===1)s.t1++; }); return s; }
};
