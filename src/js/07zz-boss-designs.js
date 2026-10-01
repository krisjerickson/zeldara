// ═══════════════════════════════════════════════════════════════════════
// ║ PAINTED BOSS DESIGNS (round 7) — every boss form has 2–3 OPTIONS
// ║ (id 'slot.a' / '.b' / '.c'); Kris picks one per slot in the Lab and
// ║ BOSS_PICK[slot] records it (default a). Names follow "New name, the
// ║ old title" — inspired by Tolkien, Norse myth and Harry Potter
// ║ archetypes, but our own names and designs.
// ║ pal: a main, b dark, m metal/trim, g glow, s skin, e eyes.  h = height (world px).
// ═══════════════════════════════════════════════════════════════════════
function BD(id,name,arch,h,motion,pal,parts,lore){ var p=pal.split(','); return BA.def(Object.assign({id:id,name:name,arch:arch,h:h,motion:motion,pal:{a:p[0],b:p[1],m:p[2],g:p[3],s:p[4]||'#d8b090',e:p[5]||p[3]},lore:lore||''},parts||{})); }

// ════════════ GRASSLANDS ════════════
// Goblin King (dungeon) — 2 phases
BD('boss_goblin_king.a','Grubnash, the Goblin King','hum',112,'sway','#4a7a2a,#2a3a18,#d8a830,#ffd040,#7aa048,#ffe060',
  {build:'brute',belly:true,head:'goblin',gear:'crown',weapon:'club',wepCol:'#7a5a38',cape:'fur',capeCol:'#8a2a20',armor:'leather',torsoCol:'#6a4a2a',armCol:'#7aa048',legCol:'#5a4a30',skulls:true},
  'A bloated goblin monarch, head too big for his stolen crown. He waddles — then charges without warning.');
BD('boss_goblin_king.b','Grubnash, the Goblin King','hum',118,'stride','#5a8a3a,#2a3a18,#b0b0b8,#ff8030,#6a9a40,#ffcc30',
  {build:'broad',head:'goblin',gear:'spikecrown',crownCol:'#c8c0a0',weapon:'axe',wepCol:'#c0c4cc',off:'shield',shieldCol:'#6a4020',emblem:'cross',armor:'plate',torsoCol:'#5a5040',pauldrons:'plate',cape:'tattered',capeCol:'#6a1a14',skulls:true},
  'A lean, cunning goblin king in mismatched plate, an axe in one hand and a looted shield in the other.');
BD('boss_goblin_king.c','Grubnash the Great, the Goblin King','hum',124,'lumber','#6a8a3a,#2a3218,#e8c040,#ffd040,#8aaa50,#ff4020',
  {build:'giant',belly:true,headScale:1.35,head:'goblin',gear:'crown',weapon:'hammer',wepCol:'#8a8a90',armor:'fur',torsoCol:'#7a5a3a',armCol:'#8aaa50',cape:'fur',capeCol:'#4a2a18',skulls:true},
  'A huge-headed, pot-bellied goblin tyrant on stubby legs. Each step makes the treasure hoard rattle.');
BD('bf_goblin_king_2.a','Grubnash the Warg-Rider','drake',155,'prowl','#5a4a3a,#2a2018,#8a8a90,#ff5020,#6a9040,#ffcc30',
  {beast:'wolf',bulk:1.05,rider:{head:'goblin',horns:'bull',armor:'plate',torsoCol:'#3a3a40',weapon:'cleaver',wepCol:'#b8bcc8',off:'shield',emblem:'flame',shieldCol:'#3a2a1a',armCol:'#6a9040',eyesGlow:true},motes:'embers'},
  'The king rides out on a giant warg. The beast lopes and circles — then both lunge together.');
BD('bf_goblin_king_2.b','Grubnash, the Goblin Warlord','hum',150,'stride','#3a4a2a,#1a2012,#6a6a70,#ff5020,#6a9040,#ff4020',
  {build:'brute',head:'goblin',horns:'bull',hornCol:'#d8d0b8',gear:'spikecrown',crownCol:'#8a8a90',weapon:'cleaver',wepCol:'#b8bcc8',wepGlow:'#ff6030',off:'shield',shieldCol:'#3a2a1a',emblem:'flame',armor:'plate',pauldrons:'big',spikes:true,torsoCol:'#3a3a40',banner:'#8a1a14',skulls:true,cape:'tattered',capeCol:'#5a1a14',eyesGlow:true,motes:'embers',moteN:10},
  'Armoured in scavenged iron, a war-banner of skulls on his back. Heavy steps, then a brutal charge.');
BD('bf_goblin_king_2.c','Grubnash the Cave-Troll Rider','drake',160,'lumber','#6a6a5a,#2a2a22,#a0a0a8,#ffb040,#7a8a60,#ffcc40',
  {beast:'behemoth',bulk:1.15,spines:false,rider:{head:'goblin',gear:'crown',armor:'leather',torsoCol:'#6a4a2a',weapon:'spear',wepCol:'#c0c4cc',armCol:'#7aa048'},hornCol:'#d8d0b8',motes:'motes'},
  'The goblin king rides a chained, horned cave-beast that shakes the throne warren with every stamp.');
// Dark Warlock (tower) — 2 phases
BD('boss_dark_warlock.a','Morvane, the Dark Warlock','hum',116,'glide','#3a1a5a,#140820,#b890e0,#c060ff',
  {lower:'robe',armor:'robe',head:'hood',pointHood:true,horns:'curl',hornCol:'#d8d0e8',weapon:'staff',staffTop:'crystal',staffCol:'#2a1a30',cape:'tattered',capeCol:'#1a0a28',runes:true,motes:'runes',moteN:10,trim:'#b890e0'},
  'A horned warlock in a violet hood. Runes circle him as he steps through the air to reappear beside you.');
BD('boss_dark_warlock.b','Morvane, the Dark Warlock','hum',120,'phase','#1a1a2a,#08080e,#8ab0a0,#60ffb0',
  {lower:'wraith',armor:'rags',head:'skull',gear:'runecrown',weapon:'staff',staffTop:'skull',staffCol:'#1a1a20',off:'book',cape:'tattered',capeCol:'#0e0e18',motes:'smoke',float:8},
  'A deathless necromancer, skull-faced, reading from a book that whispers back.');
BD('boss_dark_warlock.c','Morvane, the Dark Warlock','hum',118,'glide','#5a1a3a,#200812,#e0c080,#ff4080,#e8d0c0',
  {lower:'robe',armor:'robe',head:'face',eyesGlow:true,hair:true,hairCol:'#101018',horns:'ram',hornCol:'#2a2030',weapon:'wand',off:'orb',cape:'long',capeCol:'#1a0610',runes:true,motes:'motes',trim:'#e0c080'},
  'A handsome, ram-horned hexer with a wand and a hovering hex-orb. Charming — until he isn\'t.');
BD('bf_dark_warlock_2.a','Morvane the Hexweaver','spider',165,'phase','#2a1a3a,#0a0612,#8a70a0,#e060ff,#d8b090,#ff60ff',
  {web:true,sorcerer:{lower:'robe',armor:'robe',head:'hood',pointHood:true,horns:'curl',weapon:'staff',staffTop:'crystal'},motes:'runes'},
  'The warlock fuses with a giant phase-spider. It skitters out of this world and back in behind you.');
BD('bf_dark_warlock_2.b','Morvane, Hexlord of the Veil','hum',162,'phase','#1a0a2a,#07030c,#c0a0ff,#e060ff',
  {lower:'wraith',armor:'rags',head:'wraith',gear:'runecrown',cast:true,off:'orb',wings:'shadow',wingCol:'#1a0a24',wingCol2:'#e060ff',cape:'tattered',capeCol:'#10061a',motes:'smoke',moteN:14,float:12},
  'A hovering shroud with a crown of burning runes and nothing beneath the hood. The air turns cold.');
BD('bf_dark_warlock_2.c','Morvane the Brood-Queen','spider',175,'phase','#1a1a24,#08080c,#a0a0b0,#80ff60',
  {web:true,mark:'hourglass',legBands:true,bulk:1.05,motes:'motes'},
  'No warlock left at all — only a vast spider with a glowing hourglass and too many eyes.');

// ════════════ WETLANDS ════════════
// Swamp Witch (dungeon) — 3 phases
BD('boss_swamp_witch.a','Granny Greenteeth, the Swamp Witch','hum',108,'sway','#3a5a2a,#1a2a12,#8a7a40,#a0ff60,#8aa060',
  {build:'lean',lower:'robe',armor:'rags',head:'face',eyesGlow:true,gear:'witch',hatCol:'#2a3a1a',hair:true,hairCol:'#c8c8b0',weapon:'staff',staffTop:'skull',staffCol:'#4a3a20',off:'lantern',cape:'rags',capeCol:'#2a3a1a',motes:'bubbles',moteN:10},
  'A crone of the fens with a will-o\'-wisp lantern. She circles you across the water, cackling.');
BD('boss_swamp_witch.b','Granny Greenteeth, the Swamp Witch','hum',112,'glide','#2a4a4a,#0a1a1a,#c0d0a0,#60ffd0,#90b0a0',
  {lower:'wraith',armor:'rags',head:'face',eyesGlow:true,hair:true,hairCol:'#5a7a4a',weapon:'staff',staffTop:'branch',staffCol:'#3a2a18',off:'flame',cape:'rags',capeCol:'#1a3030',motes:'bubbles',float:6},
  'A drowned water-hag with weed for hair, drifting just above the bog.');
BD('boss_swamp_witch.c','Granny Greenteeth, the Swamp Witch','hum',110,'sway','#6a4a2a,#2a1a10,#c8a060,#ffb040,#a09070',
  {build:'lean',lower:'robe',armor:'rags',head:'face',eyesGlow:true,gear:'witch',hatCol:'#4a3018',hair:true,hairCol:'#e0e0d0',weapon:'staff',staffTop:'flame',off:'skull',skulls:true,cape:'rags',capeCol:'#4a3018',motes:'smoke'},
  'A cottage-witch with a bone necklace and a staff of marsh-fire.');
BD('bf_swamp_witch_2.a','Greenteeth the Bog Hag','hum',152,'sway','#4a5a2a,#1a2210,#c8b890,#b0ff50,#8a9a60',
  {build:'tall',lower:'legs',armor:'rags',head:'plague',maskCol:'#d8c8a0',gear:'witch',hatCol:'#2a3218',weapon:'staff',staffTop:'skull',staffCol:'#3a2a18',off:'skull',cape:'rags',capeCol:'#2a3a18',legCol:'#5a4a30',skulls:true,motes:'bubbles',moteN:14},
  'The witch unfolds on long stilted legs, a plague-beak mask over her face, bones rattling at her belt.');
BD('bf_swamp_witch_2.b','Greenteeth, Mother of Leeches','wyrm',155,'slither','#3a4a2a,#1a2012,#b0a070,#b0ff50',
  {headKind:'wolf',moss:true,holeCol:'#10180a',holeGlow:'#80c040',motes:'bubbles'},
  'She sinks into the mire and rises as a vast leech-serpent, eyeless but hungry.');
BD('bf_swamp_witch_2.c','Greenteeth, the Hag of the Hut','hum',158,'lumber','#5a4a30,#2a2014,#a09070,#c0ff60,#8a9a70',
  {build:'giant',lower:'roots',armor:'bark',head:'face',eyesGlow:true,hair:true,hairCol:'#c0c0a8',gear:'witch',hatCol:'#3a3020',weapon:'staff',staffTop:'skull',off:'lantern',motes:'leaves'},
  'A giant hag grown half into the bog itself, walking on roots like a hut on legs.');
BD('bf_swamp_witch_3.a','Greenteeth, the Mire Matriarch','toad',182,'lumber','#4a6a2a,#1a2a10,#c8b890,#c0ff60',
  {crown:'#c8b070',hat:'#2a3218',motes:'bubbles'},
  'The witch becomes a giant glowing toad-queen, a tiny witch-hat still perched between her eyes.');
BD('bf_swamp_witch_3.b','Greenteeth, the Mire Matriarch','toad',186,'lumber','#6a3a4a,#2a1018,#e0c0a0,#ff60c0',
  {crown:'#e0d0a0',motes:'motes'},
  'A poison-bright toad-empress, warts glowing like lanterns.');
BD('bf_swamp_witch_3.c','Greenteeth, the Mire Hydra','wyrm',190,'slither','#3a6a4a,#10281a,#c0d0a0,#a0ff80',
  {hood:true,hoodCol:'#2a5a3a',headKind:'dragon',moss:true,holeGlow:'#60c080',motes:'bubbles'},
  'A hooded swamp-serpent crowned with frills, rising from the cauldron pit.');
// Storm Mage (tower) — 3 phases
BD('boss_storm_mage.a','Tharnwald, the Storm Mage','hum',118,'glide','#3a5a9a,#1a2a4a,#c8d0e0,#9fe0ff,#e0c8a8',
  {lower:'robe',armor:'robe',head:'face',beard:'long',beardCol:'#e8ecf4',gear:'wizard',hatCol:'#2a4a8a',hatStars:true,weapon:'staff',staffTop:'lightning',staffCol:'#6a5a40',cape:'long',capeCol:'#1a2a4a',motes:'sparks',moteN:8},
  'A grey-bearded wanderer in a storm-blue hat. Lightning answers his staff.');
BD('boss_storm_mage.b','Tharnwald, the Storm Mage','hum',122,'stride','#4a5a6a,#1a2028,#c8a040,#9fe0ff,#e0c0a0',
  {build:'broad',armor:'fur',torsoCol:'#5a4a3a',head:'face',beard:'braid',beardCol:'#d0c8b0',gear:'hornhelm',horns:'norse',hornCol:'#e0d8c0',weapon:'hammer',wepCol:'#9aa0b0',wepGlow:'#9fe0ff',cape:'fur',capeCol:'#3a4050',motes:'sparks'},
  'A thunder-skald with a horned helm and a hammer that sings with lightning.');
BD('boss_storm_mage.c','Tharnwald, the Storm Mage','hum',118,'blur','#2a3a7a,#0a1030,#e0e8ff,#c0e0ff,#e8d0b8',
  {build:'lean',lower:'robe',armor:'robe',head:'face',eyesGlow:true,hair:'wild',hairCol:'#f0f4ff',weapon:'none',cast:true,off:'orb',lightning:true,cape:'long',capeCol:'#101a40',motes:'sparks',moteN:14},
  'Wild white hair standing on end, lightning in both hands, never where you last saw him.');
BD('bf_storm_mage_2.a','Tharnwald, the Thunderbird','bird',172,'fly','#2a3450,#101828,#e8c040,#fff080',
  {bird:'thunder',wingCol:'#2a3a60',wingCol2:'#8aa0d0',chestCol:'#c8d0e0',crest:'gold',motes:'sparks'},
  'He bursts through the roof as a thunderbird. Every wingbeat is a thunderclap.');
BD('bf_storm_mage_2.b','Tharnwald, the Tempest Mage','hum',156,'blur','#2a4a9a,#0a1a4a,#fff080,#fff080,#e0c8a8',
  {lower:'wraith',armor:'robe',head:'face',eyesGlow:true,beard:'long',beardCol:'#f0f4ff',gear:'wizard',hatCol:'#1a3a8a',hatStars:true,weapon:'staff',staffTop:'lightning',wings:'storm',wingCol:'#c8d8ff',wingCol2:'#fff8c0',lightning:true,cape:'long',capeCol:'#0a1a4a',motes:'sparks',moteN:16,float:10},
  'Borne up on wings of storm cloud, crackling through the rafters faster than the eye can follow.');
BD('bf_storm_mage_2.c','Tharnwald, the Storm Roc','bird',168,'fly','#e8ecf4,#6a7a9a,#e8c040,#9fe0ff',
  {bird:'roc',wingCol:'#d8e0f0',wingCol2:'#8aa0c0',chestCol:'#ffffff',headCol:'#e8ecf4',crest:'plume',motes:'sparks'},
  'A white storm-roc with lightning in its eyes, wheeling above the rooftop.');
BD('bf_storm_mage_3.a','Tharnwald Unbound, the Storm Avatar','orb',222,'hover','#8a9ac0,#3a4a70,#e0e8ff,#fff080',
  {orb:'storm',ring:false,orbR:44,motes:'sparks'},
  'He dissolves into the storm itself: a thunderhead with a face of light and arms of cloud.');
BD('bf_storm_mage_3.b','Tharnwald Unbound, the Storm Giant','hum',230,'lumber','#5a6a8a,#1a2030,#e0e8ff,#fff080,#8aa0c0',
  {build:'giant',armor:'crystal',torsoCol:'#4a5a7a',head:'frost',beard:'long',beardCol:'#e0e8f0',eyesGlow:true,gear:'hornhelm',horns:'norse',weapon:'hammer',wepGlow:'#fff080',wings:'storm',wingCol:'#8a9ac0',lightning:true,motes:'sparks'},
  'A storm-giant out of the old sagas, head in the clouds, hammer crackling.');
BD('bf_storm_mage_3.c','Tharnwald Unbound, the Eye of the Storm','orb',220,'pulse','#3a4a80,#0a1030,#c8d8ff,#80e0ff',
  {orb:'eye',orbR:42,motes:'sparks'},
  'A single vast eye at the centre of the storm, lightning for lashes.');

// ════════════ HIGHLANDS ════════════
// Rock Dragon (dungeon) — 4 phases + drakelings
BD('boss_rock_dragon.a','Grauldr, the Rock Dragon','drake',116,'prowl','#7a7060,#3a342a,#d8c8a0,#ffb040,#d8b090,#ffcc40',
  {beast:'dragon',wings:true,wingCol:'#5a5244',wingSpan:0.8,moss:true,motes:'motes'},
  'A young stone dragon with folded wings, moss on its back and a glint of treasure in its eye.');
BD('boss_rock_dragon.b','Grauldr, the Rock Dragon','drake',120,'prowl','#8a6a4a,#3a2a1a,#e0c080,#ff8030',
  {beast:'dragon',bulk:1.1,spines:true,motes:'motes'},
  'A wingless rock-drake, heavy-shouldered, digging at the ground with iron claws.');
BD('boss_rock_dragon.c','Grauldr, the Rock Dragon','drake',118,'prowl','#5a6a7a,#202a34,#c8d0d8,#9fe8ff',
  {beast:'dragon',wings:true,wingCol:'#3a4a58',crystals:true,motes:'motes'},
  'A slate-blue drake with crystal-tipped spines.');
BD('bf_rock_dragon_2.a','Grauldr the Crystal Drake','drake',148,'prowl','#6a7a9a,#3a4a6a,#e0f0ff,#80e0ff',
  {beast:'dragon',wings:true,wingCol:'#5a6a8a',wingGlow:true,crystals:true,breath:'#80e0ff',motes:'stars'},
  'Its stone scales turn to glowing crystal. Its breath freezes and ricochets.');
BD('bf_rock_dragon_2.b','Grauldr the Geode Drake','drake',150,'prowl','#6a4a7a,#2a1a34,#e0c8ff,#c080ff',
  {beast:'dragon',bulk:1.1,wings:true,wingCol:'#4a3458',crystals:true,breath:'#c080ff',motes:'stars'},
  'Amethyst crystals burst from its back like a split geode.');
BD('bf_rock_dragon_2.c','Grauldr the Crystal Wyrm','wyrm',150,'slither','#7a8aa0,#3a4a5a,#e0f0ff,#80e0ff',
  {crystals:true,holeGlow:'#80e0ff',motes:'stars'},
  'A crystal-backed serpent coiling out of the geode floor.');
BD('bf_rock_dragon_3.a','Grauldr the Earthshaker','wyrm',192,'slither','#6a5a44,#2a2218,#c8b090,#ffb040',
  {moss:true,headSize:1.1,holeGlow:'#ffb040',motes:'motes'},
  'A world-serpent of stone and moss, rising out of the chasm. When it moves, the mountain moves.');
BD('bf_rock_dragon_3.b','Grauldr the Earthshaker','drake',188,'lumber','#6a5a4a,#3a2a1a,#d8c090,#ff9030',
  {beast:'behemoth',bulk:1.35,spines:true,moss:true,cracks:true,motes:'motes'},
  'An ancient, wingless mountain-beast with a ridge of stone plates, older than the bridge it stands on.');
BD('bf_rock_dragon_3.c','Grauldr the Earthshaker','wyrm',196,'slither','#4a4a52,#1a1a22,#c8c0b0,#ff6030',
  {cracks:true,headSize:1.15,holeGlow:'#ff6030',motes:'embers'},
  'A basalt serpent with lava in the cracks between its scales.');
BD('bf_rock_dragon_4.a','Grauldr, Tyrant of the Mountain','drake',232,'lumber','#3a3a44,#141418,#d8c090,#ff6030,#d8b090,#ffcc40',
  {beast:'dragon',bulk:1.2,wings:true,wingCol:'#2a2a34',headSize:1.1,breath:'#ff7030',cracks:true,motes:'embers'},
  'The final form: basalt-black, molten-throated, wings that blot out the summit sky.');
BD('bf_rock_dragon_4.b','Grauldr, Tyrant of the Mountain','drake',236,'lumber','#8a2a1a,#3a0e08,#e8c040,#ffb040,#d8b090,#ffe060',
  {beast:'dragon',bulk:1.25,wings:true,wingCol:'#6a1a10',wingGlow:true,headSize:1.15,breath:'#ffb040',motes:'embers'},
  'A red-gold hoard-dragon, gem-crusted belly and furnace breath.');
BD('bf_rock_dragon_4.c','Grauldr, Tyrant of the Mountain','drake',230,'lumber','#e0e4ec,#6a7080,#c8d0d8,#80e0ff',
  {beast:'dragon',bulk:1.2,wings:true,wingCol:'#a0a8b8',crystals:true,breath:'#a0e8ff',motes:'snow'},
  'A white peak-dragon of ice and quartz, its roar an avalanche.');
BD('bf_drakeling.a','Crystal Drakeling','drake',72,'flit','#8aa0c0,#4a5a7a,#e0f0ff,#9fe8ff',{beast:'dragon',wings:true,wingCol:'#6a7a9a',crystals:true},'A young crystal drake.');
BD('bf_drakeling.b','Ember Drakeling','drake',72,'flit','#a04a2a,#4a1a10,#ffd080,#ff8030',{beast:'dragon',wings:true,wingCol:'#6a2a18'},'A young fire drake.');
// Iron Sentinel (tower) — 4 phases + forge guardians
BD('boss_iron_sentinel.a','Brokkrun, the Iron Sentinel','golem',122,'lumber','#8a8e96,#4a4e56,#c8c0b0,#ffb040',
  {mat:'iron',head:'helm',weapon:'hammer',vents:true},
  'A riveted iron colossus forged by dwarf-smiths, a furnace eye and a piston hammer.');
BD('boss_iron_sentinel.b','Brokkrun, the Iron Sentinel','hum',124,'stride','#6a6e76,#2a2e36,#9aa0aa,#ffb040',
  {build:'broad',armor:'plate',torsoCol:'#5a5e66',head:'greathelm',helmCol:'#7a7e86',weapon:'greataxe',wepCol:'#b8bcc8',pauldrons:'big',glowcore:true,cape:'none'},
  'An empty suit of dwarf-forged armour that still keeps its watch.');
BD('boss_iron_sentinel.c','Brokkrun, the Iron Sentinel','golem',120,'lumber','#7a5a3a,#3a2a18,#c8a060,#ff8030',
  {mat:'iron',head:'helm',weapon:'hammer',runeLines:true},
  'A bronze runic golem, its seams glowing with forge-fire.');
BD('bf_iron_sentinel_2.a','Brokkrun the Siege Sentinel','golem',158,'lumber','#7a7e86,#3a3e46,#c8c0b0,#ffb040',
  {mat:'iron',bulk:1.1,head:'helm',weapon:'hammer',vents:true,pauldron:'#5a5e66'},
  'Bolted-on siege plates and a steam hammer.');
BD('bf_iron_sentinel_2.b','Brokkrun the Siege Sentinel','golem',160,'lumber','#5a5e66,#2a2e36,#c8a040,#ff6030',
  {mat:'iron',bulk:1.1,head:'helm',weapon:'chains',vents:true,runeLines:true},
  'A siege-engine golem dragging its anchor chains.');
BD('bf_iron_sentinel_2.c','Brokkrun the Siege Sentinel','drake',155,'lumber','#7a7e86,#3a3e46,#c8a040,#ffb040',
  {beast:'behemoth',bulk:1.2,spines:false,cracks:false,motes:'sparks'},
  'A clockwork siege-beast, all pistons and iron horns.');
BD('bf_iron_sentinel_3.a','Brokkrun, the Orrery Colossus','golem',200,'still','#6a6e76,#2a2e36,#c8a040,#80e0ff',
  {mat:'iron',rings:true,shoulderCrystals:true,motes:'stars'},
  'A towering engine of plates and star-lenses. It never walks — the rings do the turning.');
BD('bf_iron_sentinel_3.b','Brokkrun, the Orrery Colossus','orb',205,'still','#6a6e76,#2a2e36,#c8a040,#80e0ff',
  {orb:'eye',orbR:40,motes:'stars'},
  'The machine opens its single star-lens and watches.');
BD('bf_iron_sentinel_3.c','Brokkrun, the Orrery Colossus','golem',205,'still','#c8a040,#6a5020,#e8d8a0,#80e0ff',
  {mat:'gold',rings:true,runes:true,motes:'stars'},
  'A golden astronomical engine, rings of runes turning around it.');
BD('bf_iron_sentinel_4.a','Brokkrun Prime, the Sentinel of the Star Forge','golem',222,'stride','#c8a040,#6a5020,#e8d8a0,#ff5020',
  {mat:'gold',runes:true,runeLines:true,vents:true,head:'helm',weapon:'drill',motes:'sparks'},
  'Gold-plated and runic, a drill arm and a furnace heart — forged by the old dwarf-gods.');
BD('bf_iron_sentinel_4.b','Brokkrun Prime, the Sentinel of the Star Forge','golem',226,'stride','#3a3a44,#141418,#c8a040,#ff4020',
  {mat:'iron',bulk:1.15,crown:'#c8a040',weapon:'hammer',runeLines:true,cracks:true,motes:'embers'},
  'Black iron shot through with molten runes, crowned like a forge-king.');
BD('bf_iron_sentinel_4.c','Brokkrun Prime, the Sentinel of the Star Forge','hum',225,'stride','#c8a040,#5a4018,#e8d8a0,#ff6030,#d8b090,#ffe080',
  {build:'giant',armor:'plate',torsoCol:'#a08030',head:'greathelm',helmCol:'#c8a040',plume:'#ff6030',weapon:'hammer',wepGlow:'#ff6030',glowcore:true,wings:'flame',motes:'sparks'},
  'A giant knight of gold with a forge-fire heart and wings of sparks.');
BD('bf_forge_guardian.a','Forge Guardian','golem',104,'lumber','#5a5e66,#2a2e36,#ff9030,#ff9030',{mat:'iron',head:'helm',weapon:'hammer',vents:true},'A soot-black forge construct.');
BD('bf_forge_guardian.b','Anvil Guardian','golem',104,'lumber','#4a3a30,#1a1410,#ff9030,#ff7030',{mat:'magma',weapon:'hammer'},'An anvil-bodied construct, still glowing from the forge.');

// ════════════ ASHLANDS ════════════
// Lava Titan (dungeon) — 5 phases
BD('boss_lava_titan.a','Surtvald, the Lava Titan','golem',126,'lumber','#4a2a1a,#1a0a06,#ff9030,#ff7020',
  {mat:'magma',motes:'embers'},
  'A fire-giant\'s son of cooling rock, lava running through the cracks.');
BD('boss_lava_titan.b','Surtvald, the Lava Titan','hum',130,'lumber','#3a1a10,#140604,#ff8030,#ff6020,#6a2a18',
  {build:'giant',armor:'magma',head:'demon',horns:'bull',hornCol:'#2a1a14',weapon:'greatsword',wepCol:'#ff8030',wepGlow:'#ffd060',motes:'embers'},
  'A young fire-giant with a sword of living flame.');
BD('boss_lava_titan.c','Surtvald, the Lava Titan','golem',128,'lumber','#2a2226,#0a0608,#ff6030,#ff6030',
  {mat:'obsidian',cracks:true,motes:'embers'},
  'Black glass and molten seams.');
BD('bf_lava_titan_2.a','Surtvald the Magma Titan','golem',162,'lumber','#7a2a1a,#3a1008,#ff9030,#ffa030',{mat:'magma',bulk:1.1,fistGlow:true,motes:'embers'},'Cracks glow brighter; lava runs down its arms.');
BD('bf_lava_titan_2.b','Surtvald the Magma Titan','hum',165,'lumber','#5a1a10,#200604,#ffb040,#ff8030,#8a3018',{build:'giant',armor:'magma',head:'demon',gear:'spikecrown',crownCol:'#2a1a14',weapon:'greataxe',wepCol:'#3a2a24',wepGlow:'#ff8030',cape:'flame',motes:'embers'},'A crowned fire-giant with an axe of black iron.');
BD('bf_lava_titan_2.c','Surtvald the Magma Titan','drake',160,'lumber','#7a2a1a,#2a0804,#ffb040,#ff8030',{beast:'behemoth',bulk:1.2,cracks:true,spines:false,breath:'#ff8030',motes:'embers'},'A lava-beast crawling out of the crust.');
BD('bf_lava_titan_3.a','Surtvald the Obsidian Colossus','golem',192,'lumber','#2a2226,#0a0608,#ff6030,#ff4020',{mat:'obsidian',bulk:1.15,shoulderCrystals:true,cracks:true,motes:'embers'},'Cooled into jagged black glass that reflects your spells.');
BD('bf_lava_titan_3.b','Surtvald the Obsidian Colossus','hum',195,'lumber','#1a1418,#050304,#ff6030,#ff6030,#3a2a2a',{build:'giant',armor:'crystal',torsoCol:'#1a1418',head:'greathelm',helmCol:'#2a2226',weapon:'greatsword',wepCol:'#2a2226',wepGlow:'#ff6030',off:'shield',shieldCol:'#1a1418',emblem:'flame',motes:'embers'},'A giant knight of volcanic glass.');
BD('bf_lava_titan_3.c','Surtvald the Obsidian Colossus','golem',190,'lumber','#2a2226,#0a0608,#b060ff,#ff60ff',{mat:'obsidian',bulk:1.1,shoulderCrystals:true,motes:'motes'},'Obsidian veined with violet fire.');
BD('bf_lava_titan_4.a','Surtvald the Molten Behemoth','drake',205,'prowl','#6a2010,#2a0804,#ffb040,#ffa030',{beast:'behemoth',bulk:1.3,cracks:true,spines:false,breath:'#ff8030',motes:'embers'},'A horned molten beast that charges round the caldera rim.');
BD('bf_lava_titan_4.b','Surtvald the Molten Behemoth','drake',210,'prowl','#3a1a14,#140604,#ff8030,#ff5020',{beast:'wolf',bulk:1.3,cracks:true,breath:'#ff5020',motes:'embers'},'A world-devouring fire-wolf with lava for a mane.');
BD('bf_lava_titan_4.c','Surtvald the Molten Behemoth','hum',210,'lumber','#6a2010,#200604,#ffb040,#ff8030,#8a3018',{build:'giant',belly:true,armor:'magma',head:'ogre',horns:'bull',hornCol:'#2a1a14',weapon:'club',wepCol:'#3a2a24',motes:'embers'},'A molten brute of a giant, all belly and fists.');
BD('bf_lava_titan_5.a','The Heart of Muspel','orb',212,'pulse','#8a2a10,#2a0806,#c8a040,#ff8020',{orb:'heart',motes:'embers'},'The titan\'s bare burning heart, caged in obsidian ribs, beating like a war-drum.');
BD('bf_lava_titan_5.b','The Heart of Muspel','orb',215,'pulse','#8a2a10,#2a0806,#c8a040,#ffb040',{orb:'eye',orbR:44,motes:'embers'},'A molten eye opening in the volcano\'s core.');
BD('bf_lava_titan_5.c','Surtvald, Lord of Muspel','hum',245,'stride','#2a0e08,#0a0402,#ffb040,#ff7020,#6a2a18,#ffe080',{build:'giant',vtorso:true,headScale:1.35,armor:'magma',head:'demon',horns:'demon',hornCol:'#2a1a14',gear:'spikecrown',crownCol:'#ff8030',weapon:'greatsword',wepCol:'#ff8030',wepGlow:'#fff0a0',wings:'flame',cape:'flame',motes:'embers',moteN:24},'The fire-giant himself, a flaming sword raised against the sky.');
// Shadow Lord (tower) — 5 phases + twins
BD('boss_shadow_lord.a','Malgorath, the Shadow Lord','hum',128,'stride','#2a1a3a,#0a0610,#4a4458,#b040ff,#d8b090,#ff4060',
  {build:'broad',headScale:1.15,armor:'plate',pauldrons:'big',spikes:true,torsoCol:'#221a2c',head:'wraith',gear:'spikecrown',crownCol:'#8a8098',weapon:'greatsword',wepCol:'#6a6078',wepGlow:'#c060ff',cape:'long',capeCol:'#0e0816',chains:true,motes:'smoke',moteN:10},
  'A crowned king with no face beneath the crown — only two embers. He walks slowly, as if nothing could stop him.');
BD('boss_shadow_lord.b','Malgorath, the Shadow Lord','hum',126,'phase','#1a1a24,#060608,#8a8a98,#8080ff,#d8b090,#a0a0ff',
  {lower:'wraith',armor:'rags',head:'hood',hoodCol:'#14141c',gear:'spikecrown',crownCol:'#8a8a98',weapon:'sword',wepCol:'#8a8aa0',wepGlow:'#8080ff',cape:'tattered',capeCol:'#08080c',float:8,motes:'smoke'},
  'A hooded wraith-king with a pale blade — a cold that follows you around the room.');
BD('boss_shadow_lord.c','Malgorath, the Shadow Lord','hum',130,'stride','#3a1020,#10040a,#c8a040,#ff3050,#d8b090,#ff4060',
  {build:'broad',armor:'plate',torsoCol:'#2a0a14',pauldrons:'big',spikes:true,head:'hornhelm',helmCol:'#2a0a14',horns:'demon',hornCol:'#c8a040',weapon:'sword',wepCol:'#c8c0d0',wepGlow:'#ff3050',off:'shield',emblem:'flame',shieldCol:'#1a0610',cape:'long',capeCol:'#3a0a14'},
  'A blood-red dark knight with a horned helm.');
BD('bf_shadow_lord_2.a','Malgorath the Umbral Wraith','hum',166,'phase','#1a0a2a,#05020a,#5a5068,#c040ff,#d8b090,#ff3050',
  {lower:'wraith',armor:'rags',head:'wraith',gear:'spikecrown',crownCol:'#7a7088',weapon:'sword',wepCol:'#8a80a0',wepGlow:'#c040ff',off:'chains',wings:'shadow',wingCol:'#0e0618',wingCol2:'#c040ff',cape:'tattered',capeCol:'#08040e',chains:true,motes:'smoke',moteN:16,float:12},
  'Only the crown and the chains are solid now. It flickers out of this world and back in where you least expect.');
BD('bf_shadow_lord_2.b','Malgorath the Soul-Shroud','hum',170,'phase','#20202a,#040406,#6a6a78,#a0c0ff,#d8b090,#e0f0ff',
  {lower:'wraith',armor:'rags',head:'hood',hoodCol:'#18181e',weapon:'none',cast:true,off:'none',wings:'shadow',wingCol:'#101014',wingCol2:'#a0c0ff',cape:'tattered',capeCol:'#08080a',motes:'snow',moteN:18,float:14},
  'A tattered, faceless shroud that drinks the warmth — and the hope — out of the room.');
BD('bf_shadow_lord_2.c','Malgorath the Nightmare','drake',168,'phase','#1a1024,#05020a,#6a5a78,#c040ff',
  {beast:'wolf',bulk:1.1,cracks:true,motes:'smoke'},
  'A vast shadow-hound with violet cracks, fading in and out of the dark.');
BD('bf_shadow_lord_3.a','Malgorath the Fell-Rider','drake',178,'blur','#1e1628,#08060a,#c8a040,#ffd060,#d8b090,#ff3050',
  {beast:'dragon',wings:true,wingCol:'#1a1220',headSize:0.95,rider:{build:'broad',armor:'plate',torsoCol:'#1e1628',head:'hornhelm',helmCol:'#2a2234',horns:'demon',hornCol:'#c8a040',weapon:'sword',wepCol:'#e8e0c8',wepGlow:'#ffd060',off:'shield',emblem:'eclipse',shieldCol:'#0a0610'},motes:'smoke'},
  'The Eclipse Knight rides a winged fell-beast out of the mirrors, blurring from one to the next.');
BD('bf_shadow_lord_3.b','Malgorath the Eclipse Knight','hum',172,'blur','#2a1a3a,#0a0610,#c8a040,#ffd060,#d8b090,#ff3050',
  {build:'broad',armor:'plate',pauldrons:'big',spikes:true,torsoCol:'#1e1628',head:'hornhelm',helmCol:'#2a2234',horns:'demon',hornCol:'#c8a040',weapon:'sword',wepScale:1.25,wepCol:'#e8e0c8',wepGlow:'#ffd060',off:'shield',shieldCol:'#0a0610',emblem:'eclipse',cape:'long',capeCol:'#140a1e'},
  'A black knight edged with eclipse-gold. He moves in blurs, leaving images of himself behind.');
BD('bf_shadow_lord_3.c','Malgorath the Mirror-Knight','hum',174,'blur','#8a90a8,#2a2e3a,#e0e8ff,#c0e0ff,#d8b090,#ffffff',
  {build:'broad',armor:'crystal',torsoCol:'#6a7088',head:'greathelm',helmCol:'#a0a8c0',weapon:'greatsword',wepCol:'#e0e8ff',wepGlow:'#c0e0ff',off:'shield',shieldCol:'#6a7088',emblem:'cross',cape:'long',capeCol:'#2a2e3a',motes:'stars'},
  'A knight of living mirror-glass — every reflection in the hall is another of him.');
BD('bf_shadow_lord_4.a','Malgorath, the Lidless Void','orb',212,'hover','#2a0a3a,#08020e,#8a6aa0,#c040ff',{orb:'eye',motes:'smoke'},'A great lidless eye wreathed in void-flame. It never stops looking at you.');
BD('bf_shadow_lord_4.b','Malgorath, the Lidless Void','orb',215,'hover','#3a0a0a,#0e0202,#c8a040,#ff6020',{orb:'eye',orbR:44,motes:'embers'},'A burning eye in a crown of fire.');
BD('bf_shadow_lord_4.c','Malgorath, the Void Kraken','kraken',200,'phase','#2a0a3a,#08020e,#8a6aa0,#c040ff',{motes:'smoke'},'A tentacled horror from between the stars.');
BD('bf_shadow_lord_5.a','Malgorath Ascendant, Demon of Shadow and Flame','hum',246,'stride','#1a0e14,#050204,#ffb040,#ff7020,#d8b090,#ffe080',
  {build:'giant',vtorso:true,headScale:1.45,armor:'shadow',torsoCol:'#140a0e',head:'demon',horns:'demon',hornCol:'#2a1a18',gear:'dawncrown',weapon:'whip',wepGlow:'#ff8030',off:'flame',wings:'shadow',wingCol:'#140808',wingCol2:'#ff7020',wingSpan:1.35,cape:'flame',legCol:'#140a0e',motes:'embers',moteN:22,rim:0.4},
  'A towering demon of shadow and flame, a whip of fire, crowned in stolen dawn-light. Each step shakes the altar.');
BD('bf_shadow_lord_5.b','Malgorath Ascendant, the Fallen Dawn','hum',244,'phase','#e8d8b0,#3a2a18,#ffe080,#ffe080,#f0dcc8,#ffffff',
  {build:'broad',lower:'wraith',armor:'robe',torsoCol:'#e0d0a8',head:'face',eyesGlow:true,hair:true,hairCol:'#f0e8d0',gear:'sunhalo',weapon:'greatsword',wepCol:'#fff0c0',wepGlow:'#ffe080',wings:'feather',wingCol:'#fff4d8',wingCol2:'#ffd080',wingSpan:1.3,float:14,motes:'stars'},
  'A fallen angel of stolen dawn — beautiful, blinding, and utterly without mercy.');
BD('bf_shadow_lord_5.c','Malgorath Ascendant, the Black Dragon','drake',246,'lumber','#1a1020,#050208,#ffd060,#ff60ff',
  {beast:'dragon',bulk:1.3,wings:true,wingCol:'#140a1c',wingGlow:true,headSize:1.15,breath:'#ff60ff',cracks:true,motes:'smoke'},
  'The Shadow Lord takes the shape of a black dragon with violet fire.');
BD('bf_shadow_twin.a','Shadow Twin','hum',128,'phase','#3a1a5a,#1a0a2a,#8a70a0,#ff60ff,#d8b090,#ff60ff',{lower:'wraith',armor:'shadow',torsoCol:'#2a1440',head:'demon',horns:'demon',hornCol:'#3a2a48',cast:true,off:'flame',motes:'smoke',float:10},'A flickering copy of the Ascendant, half in another world.');
BD('bf_shadow_twin.b','Shadow Twin','hum',126,'phase','#20202a,#040406,#6a6a78,#a0c0ff,#d8b090,#e0f0ff',{lower:'wraith',armor:'rags',head:'hood',hoodCol:'#18181e',cast:true,float:10,motes:'snow'},'A shroud split off from the Shadow Lord.');

// ════════════ CASTLE WARDENS ════════════
BD('cw_thorn_knight.a','Sir Brambleheart, the Thorn Knight','hum',148,'stride','#4a6a3a,#2a3a20,#b0a060,#e07080,#d8b090,#ff6080',{build:'broad',armor:'plate',torsoCol:'#3a5a2a',head:'greathelm',helmCol:'#5a7a4a',horns:'antler',hornCol:'#5a4a2a',weapon:'sword',wepCol:'#c8d0c0',off:'shield',shieldCol:'#3a5a2a',emblem:'rose',thorns:true,cape:'tattered',capeCol:'#2a4a20',motes:'leaves'},'A knight wrapped in living briars; thorns bite whoever strikes him up close.');
BD('cw_thorn_knight.b','Sir Brambleheart, the Thorn Knight','hum',150,'lumber','#5a4a2a,#2a2014,#6aa04a,#e07080',{build:'giant',lower:'roots',armor:'bark',head:'mask',maskCol:'#8a6a40',horns:'antler',hornCol:'#5a4a2a',weapon:'club',wepCol:'#5a4228',thorns:true,motes:'leaves'},'A briar-giant of the old forest, more hedge than knight.');
BD('cw_thorn_knight.c','Sir Brambleheart, the Thorn Knight','drake',150,'prowl','#4a5a2a,#1a2410,#c0a060,#e07080',{beast:'wolf',rider:{armor:'plate',torsoCol:'#3a5a2a',head:'greathelm',helmCol:'#5a7a4a',weapon:'spear',off:'shield',emblem:'rose',shieldCol:'#3a5a2a',thorns:true},motes:'leaves'},'A thorn-knight riding a great bramble-hound.');
BD('cw_sun_baron.a','Baron Goldcrest, the Sun Duellist','hum',146,'blur','#e0b040,#8a6a20,#fff0a0,#ffe080,#e8c0a0',{build:'broad',belly:true,armor:'coat',torsoCol:'#d0a030',head:'face',moustache:true,beardCol:'#8a5a2a',gear:'plumed',hatCol:'#c89020',weapon:'rapier',wepCol:'#f0f0f8',cape:'long',capeCol:'#e8b030',motes:'motes'},'A pompous golden baron with a rapier — astonishingly fast for his size.');
BD('cw_sun_baron.b','Baron Goldcrest, the Sun Duellist','hum',148,'blur','#f0d060,#8a6a20,#fff8c0,#fff080,#f0d0b0',{build:'lean',armor:'coat',torsoCol:'#e8c040',head:'face',moustache:true,beardCol:'#c89040',gear:'sunhalo',weapon:'rapier',off:'orb',cape:'long',capeCol:'#f0c040',motes:'stars'},'A lean sun-knight who blinds you with the flash of his halo.');
BD('cw_sun_baron.c','Baron Goldcrest, the Sunflower Lord','hum',150,'sway','#6a8a2a,#2a3a10,#f0c030,#ffe060',{build:'tall',lower:'roots',armor:'bark',torsoCol:'#5a7a2a',head:'mask',maskCol:'#6a4a20',gear:'sunhalo',weapon:'rapier',motes:'leaves'},'A towering sunflower-man, his face a ring of petals.');
BD('cw_mill_ogre.a','Grumbold, the Mill Ogre','hum',160,'lumber','#8a7a5a,#4a3a2a,#c8a060,#ff8040,#b0a080',{build:'giant',belly:true,head:'ogre',armor:'leather',torsoCol:'#6a5a40',armCol:'#b0a080',weapon:'millstone',motes:'motes'},'A huge ogre who turns the mill by hand and swings a millstone on a chain.');
BD('cw_mill_ogre.b','Grumbold, the Mill Troll','hum',165,'lumber','#6a7a6a,#2a3a2a,#a0a090,#ffcc40,#8a9a8a',{build:'giant',head:'ogre',horns:'bull',armor:'fur',torsoCol:'#5a6a5a',armCol:'#8a9a8a',weapon:'club',wepCol:'#6a5a40',moss:true,motes:'motes'},'A stone-skinned troll who hides from the sun inside the windmill.');
BD('cw_mill_ogre.c','Grumbold, the Mill Ogre','hum',158,'lumber','#a07a5a,#4a3020,#c8a060,#ff8040,#c0a080',{build:'giant',belly:true,head:'ogre',gear:'crown',crownCol:'#c8a060',armor:'leather',armCol:'#c0a080',weapon:'flail',wepCol:'#8a8a90',motes:'motes'},'A grain-king ogre in a crown of wheat.');
BD('cw_lotus_naga.a','Nagaryn, the Lotus Naga Queen','hum',150,'slither','#40a0a0,#1a5a5a,#f0a0c0,#ffe060,#80c0b0',{lower:'serpent',tailCol:'#3a9090',armor:'robe',torsoCol:'#50b0a8',head:'face',eyesGlow:true,hair:true,hairCol:'#1a4a5a',gear:'lotus',weapon:'trident',wepCol:'#ff8870',motes:'bubbles'},'A crowned naga with lotus-pink frills and a coral trident.');
BD('cw_lotus_naga.b','Nagaryn, the Lotus Naga Queen','wyrm',160,'slither','#40a0a0,#1a5a5a,#f0a0c0,#ffb0d8',{hood:true,hoodCol:'#f0a0c0',headKind:'dragon',holeCol:'#0a2a30',holeGlow:'#60e0e0',motes:'bubbles'},'A vast hooded water-serpent, its hood a lotus in bloom.');
BD('cw_lotus_naga.c','Nagaryn, the Lotus Naga Queen','hum',152,'slither','#6a3a8a,#2a1a3a,#ffd060,#ff80d0,#b090c0',{lower:'serpent',tailCol:'#5a3a7a',armor:'robe',torsoCol:'#7a4a9a',head:'face',eyesGlow:true,hair:true,hairCol:'#2a1030',gear:'crown',weapon:'spear',off:'orb',motes:'bubbles'},'A violet serpent-queen with a pearl orb.');
BD('cw_drowned_abbot.a','Abbot Draugmere, the Drowned','hum',150,'glide','#4a6a6a,#1a2a2a,#80e0c0,#80ffd0,#8ab0a0',{lower:'robe',armor:'robe',torsoCol:'#3a5a5a',head:'skull',gear:'mitre',hatCol:'#3a5a5a',weapon:'staff',staffTop:'crescent',off:'book',cape:'rags',capeCol:'#1a3030',motes:'bubbles'},'A waterlogged abbot — a draugr of the deep — reading from a soaked tome.');
BD('cw_drowned_abbot.b','Abbot Draugmere, the Drowned','hum',155,'phase','#2a4a5a,#0a1a22,#a0e0f0,#60e0ff,#6a9aa0',{lower:'wraith',armor:'rags',head:'hood',hoodCol:'#2a4a5a',weapon:'none',cast:true,off:'lantern',chains:true,float:10,motes:'bubbles'},'A drowned ghost-monk, chains trailing, lantern swinging.');
BD('cw_drowned_abbot.c','Abbot Draugmere, the Drowned','kraken',150,'slither','#3a6a6a,#10282a,#c0e0d0,#80ffd0',{motes:'bubbles'},'The abbot\'s robes hide a nest of drowned tentacles.');
BD('cw_mangrove_chief.a','Old Rootmarch, the Mangrove Chieftain','hum',162,'lumber','#5a4228,#3a2a18,#6aa04a,#ffe060',{build:'giant',lower:'roots',armor:'bark',head:'mask',horns:'antler',hornCol:'#5a4228',weapon:'club',wepCol:'#4a3218',motes:'leaves'},'A walking mangrove wearing a war-mask — slow, old and very, very strong.');
BD('cw_mangrove_chief.b','Old Rootmarch, the Mangrove Chieftain','hum',168,'lumber','#4a5a30,#1a2410,#a0c060,#c0ff60',{build:'giant',lower:'roots',armor:'bark',torsoCol:'#4a5a30',head:'face',eyesGlow:true,beard:'long',beardCol:'#6a8a3a',weapon:'staff',staffTop:'branch',motes:'leaves'},'A tree-herder with a beard of moss who speaks very slowly and hits very hard.');
BD('cw_mangrove_chief.c','Old Rootmarch, the Mangrove Chieftain','wyrm',160,'slither','#5a4228,#2a1a0a,#6aa04a,#c0ff60',{moss:true,headKind:'wolf',holeCol:'#10180a',holeGlow:'#60a040',motes:'leaves'},'A root-serpent grown from the mangrove\'s heart.');
BD('cw_forge_thane.a','Forge-Thane Brukkr','hum',128,'stride','#6a4a2a,#3a2a1a,#c8a040,#ff9030,#c89068',{build:'dwarf',armor:'plate',torsoCol:'#5a4a3a',head:'face',beard:'braid',beardCol:'#c86030',gear:'hornhelm',horns:'norse',weapon:'hammer',wepCol:'#9aa0aa',wepGlow:'#ff9030',off:'shield',emblem:'flame',shieldCol:'#5a3a20',motes:'sparks'},'An armoured dwarf lord with a runic forge-hammer and a braided red beard.');
BD('cw_forge_thane.b','Forge-Thane Brukkr','hum',132,'stride','#3a3a44,#141418,#e8c040,#ff6030,#b08060',{build:'dwarf',armor:'plate',torsoCol:'#3a3a44',head:'greathelm',helmCol:'#4a4a54',beard:'long',beardCol:'#e0e0e0',weapon:'axe',wepCol:'#c0c4cc',wepGlow:'#ff6030',motes:'embers'},'A grey-bearded dwarf king in black iron with a runic greataxe.');
BD('cw_forge_thane.c','Forge-Thane Brukkr','golem',140,'lumber','#8a6a3a,#3a2a18,#e8c040,#ff9030',{mat:'iron',head:'helm',crown:'#e8c040',weapon:'hammer',runeLines:true,motes:'sparks'},'A dwarf-forged iron thane, its maker\'s rune still glowing on its chest.');
BD('cw_frost_queen.a','Skadra, the Frost Queen','hum',152,'glide','#bfe8ff,#4a7ab0,#ffffff,#c0f0ff,#e8f0f8',{lower:'robe',armor:'crystal',torsoCol:'#a0d0f0',head:'face',eyesGlow:true,hair:true,hairCol:'#f0f8ff',gear:'icecrown',weapon:'staff',staffTop:'crystal',wings:'ice',wingCol:'#c0e8ff',wingCol2:'#ffffff',motes:'snow'},'An ice queen of the high glaciers, crystalline wings and a staff of frozen light.');
BD('cw_frost_queen.b','Skadra, the Frost Giantess','hum',165,'stride','#8ab0d0,#2a4a6a,#e0f0ff,#c0f0ff,#a0c8e0',{build:'giant',armor:'fur',torsoCol:'#e0e8f0',head:'frost',beard:false,hair:true,hairCol:'#e8f0ff',eyesGlow:true,gear:'icecrown',weapon:'spear',wepCol:'#e0f4ff',cape:'fur',capeCol:'#a0b8d0',motes:'snow'},'A huntress-giantess of the mountains with a spear of ice.');
BD('cw_frost_queen.c','Skadra, the Frost Wyrm','drake',160,'prowl','#d8ecff,#6a8ab0,#ffffff,#a0e8ff',{beast:'dragon',wings:true,wingCol:'#a0c0e0',crystals:true,breath:'#c0f0ff',motes:'snow'},'The queen\'s true shape: a white frost-wyrm.');
BD('cw_roc_lord.a','Roc Lord Skyrend','bird',160,'fly','#8a6a4a,#4a3a2a,#e8c040,#ffe080',{bird:'roc',wingCol:'#8a6a4a',wingCol2:'#c8a070',chestCol:'#d8c0a0',crest:'gold',motes:'motes'},'A giant roc with a golden crest that dives from the eyrie.');
BD('cw_roc_lord.b','Roc Lord Skyrend','bird',165,'fly','#2a2a34,#101014,#e8c040,#9fe0ff',{bird:'thunder',wingCol:'#2a2a40',wingCol2:'#6a7a9a',chestCol:'#8a8aa0',crest:'plume',motes:'sparks'},'A storm-black roc whose cry calls the wind.');
BD('cw_roc_lord.c','Roc Lord Skyrend, the Griffin King','drake',160,'fly','#c8a060,#6a4a20,#e8c040,#ffe080',{beast:'wolf',wings:true,wingCol:'#c8b090',headSize:0.95,motes:'motes'},'A griffin-king: wings of an eagle on the body of a great cat.');
BD('cw_obsidian_jailer.a','Keyward, the Obsidian Jailer','golem',160,'lumber','#2a2226,#161214,#ff6030,#ff4020',{mat:'obsidian',weapon:'chains',vents:true,cracks:true,motes:'embers'},'A black-glass jailer with chain arms and a ring of burning keys.');
BD('cw_obsidian_jailer.b','Keyward, the Obsidian Jailer','hum',162,'stride','#2a2226,#0a0808,#8a8a90,#ff6030,#6a4a3a',{build:'giant',armor:'plate',torsoCol:'#2a2226',head:'greathelm',helmCol:'#2a2226',weapon:'flail',off:'chains',chains:true,motes:'embers'},'A hooded executioner-jailer dragging a burning flail.');
BD('cw_obsidian_jailer.c','Keyward, the Obsidian Jailer','spider',158,'stride','#2a2226,#0a0808,#8a8a90,#ff6030',{mark:'hourglass',motes:'embers'},'An obsidian spider that weaves its cells from molten glass.');
BD('cw_ember_priest.a','Ignis, High Priest of Muspel','hum',150,'glide','#b82a1a,#4a0a04,#ffb040,#ffe060,#e0a080',{lower:'robe',armor:'robe',torsoCol:'#a82418',head:'face',eyesGlow:true,gear:'mitre',mitreFlame:true,hatCol:'#c83020',weapon:'staff',staffTop:'flame',off:'flame',cape:'flame',motes:'embers'},'A fire priest crowned in flame, preaching the end of the world.');
BD('cw_ember_priest.b','Ignis, High Priest of Muspel','bird',155,'fly','#e86020,#8a2a10,#ffd060,#ffd060',{bird:'phoenix',motes:'embers'},'The priest becomes the phoenix he worships.');
BD('cw_ember_priest.c','Ignis, the Salamander Priest','wyrm',155,'slither','#c83a1a,#5a1a0a,#ffc040,#ffe060',{hood:true,hoodCol:'#e86020',cracks:true,holeGlow:'#ff8030',motes:'embers'},'A robed salamander rising from the sanctum\'s fire-pit.');
BD('cw_bone_king.a','Hraudrik, the Bone King','hum',158,'stride','#e8e0cc,#6a6258,#c8a040,#ff6040',{build:'broad',armor:'bone',torsoCol:'#3a3430',head:'skull',gear:'crown',crownCol:'#c8a040',weapon:'greatsword',wepCol:'#8a8478',wepGlow:'#ff6040',cape:'tattered',capeCol:'#4a1a14',chains:true,motes:'smoke'},'A barrow-king risen from his mound, bone armour and a rusted greatsword.');
BD('cw_bone_king.b','Hraudrik, the Bone King','hum',162,'phase','#d8d0bc,#3a3430,#c8a040,#60ffc0',{lower:'wraith',armor:'bone',head:'lich',gear:'bonecrown',weapon:'staff',staffTop:'skull',off:'skull',cape:'tattered',capeCol:'#1a2a24',float:8,motes:'smoke'},'A draugr sorcerer-king drifting over his throne of bones.');
BD('cw_bone_king.c','Hraudrik, the Bone Dragon','drake',165,'lumber','#e0d8c4,#5a5248,#c8a040,#60ffc0',{beast:'dragon',wings:true,wingCol:'#6a6258',motes:'smoke'},'The bone king\'s dragon-steed, a skeleton of a wyrm long dead.');

// ════════════ MAGE-TOWER MASTERS (2 options each) ════════════
BD('mg_rime_witch.a','Frostwhisper, the Rime Witch','hum',128,'glide','#9ad0f0,#3a5a8a,#e0f4ff,#c0f0ff,#e8f0f8',{lower:'robe',armor:'robe',head:'hood',hoodCol:'#d0e8f8',weapon:'staff',staffTop:'crystal',cape:'fur',capeCol:'#a0c0e0',motes:'snow'},'A hooded frost-witch whose breath paints the floor with ice.');
BD('mg_rime_witch.b','Frostwhisper, the Rime Witch','hum',130,'glide','#c0e0f8,#4a7ab0,#ffffff,#a0e8ff,#e8f0f8',{lower:'robe',armor:'crystal',head:'face',eyesGlow:true,hair:true,hairCol:'#ffffff',gear:'icecrown',weapon:'wand',off:'shards',motes:'snow'},'A pale witch with a circlet of ice and a swarm of floating shards.');
BD('mg_arcane_scribe.a','Magister Quillon, the Arcane Scribe','hum',128,'glide','#5a3a8a,#1a1030,#e0c080,#c080ff,#e0c8a8',{lower:'robe',armor:'robe',head:'face',beard:'long',beardCol:'#d0d0d8',gear:'wizard',hatCol:'#4a2a7a',weapon:'staff',staffTop:'orb',off:'book',pages:true,motes:'runes'},'A scholar-wizard circled by his own flying pages.');
BD('mg_arcane_scribe.b','Magister Quillon, the Arcane Scribe','hum',126,'phase','#2a2a4a,#0a0a1a,#c0c0ff,#80a0ff',{lower:'wraith',armor:'robe',head:'hood',weapon:'none',cast:true,off:'book',pages:true,float:10,motes:'runes'},'A hooded librarian-wraith who is more book than man.');
BD('mg_hearth_witch.a','Cindra, the Hearth-Witch','hum',126,'sway','#b04a2a,#4a1a0a,#e0a040,#ffa040,#e0b090',{lower:'robe',armor:'rags',head:'face',eyesGlow:true,hair:true,hairCol:'#e04020',gear:'witch',hatCol:'#3a1a10',weapon:'staff',staffTop:'flame',off:'flame',motes:'embers'},'A red-haired hearth-witch with a staff of cooking-fire.');
BD('mg_hearth_witch.b','Cindra, the Hearth-Witch','hum',124,'glide','#6a3a2a,#2a1008,#e0a040,#ffb040,#e0b090',{lower:'robe',armor:'robe',head:'face',hair:true,hairCol:'#f0f0f0',gear:'witch',hatCol:'#4a2010',weapon:'staff',staffTop:'orb',off:'lantern',motes:'embers'},'A kindly-looking grandmother whose cauldron is never cold.');
BD('mg_thorn_druid.a','Old Bramblebeard, the Thorn Druid','hum',130,'sway','#5a6a3a,#2a3218,#8a6a40,#a0ff60,#c0a080',{lower:'robe',armor:'robe',torsoCol:'#6a5a3a',head:'face',beard:'long',beardCol:'#8a8a6a',horns:'antler',hornCol:'#6a5030',weapon:'staff',staffTop:'branch',motes:'leaves'},'A mossy old druid with antlers and a beard full of birds\' nests.');
BD('mg_thorn_druid.b','Old Bramblebeard, the Thorn Druid','drake',140,'prowl','#5a4a2a,#2a2010,#6aa04a,#a0ff60',{beast:'behemoth',spines:false,moss:true,motes:'leaves'},'The druid in his true shape: a great moss-backed stag-beast.');
BD('mg_storm_caller.a','Voltara, the Storm Caller','hum',128,'blur','#3a5aa0,#101a40,#e0e8ff,#c0e0ff,#e0c8b0',{build:'lean',lower:'robe',armor:'robe',head:'face',eyesGlow:true,hair:'wild',hairCol:'#e0f0ff',cast:true,off:'orb',lightning:true,motes:'sparks'},'A lightning-sorceress, hair crackling, never still.');
BD('mg_storm_caller.b','Voltara, the Storm Caller','bird',140,'fly','#3a4a70,#101828,#e8c040,#c0e0ff',{bird:'thunder',wingCol:'#3a4a70',chestCol:'#a0b0d0',motes:'sparks'},'She turns into a thunder-hawk the moment you look away.');
BD('mg_shard_sorcerer.a','Glacius, the Shard Sorcerer','hum',132,'glide','#7aa8d0,#2a4a70,#e0f4ff,#a0e8ff,#c0d8e8',{lower:'robe',armor:'crystal',head:'face',eyesGlow:true,beard:'icicle',beardCol:'#e0f4ff',gear:'icecrown',weapon:'staff',staffTop:'crystal',off:'shards',motes:'snow'},'A sorcerer in crystal armour with a beard of icicles.');
BD('mg_shard_sorcerer.b','Glacius, the Shard Sorcerer','golem',140,'still','#a0d0f0,#4a7ab0,#ffffff,#a0e8ff',{mat:'obsidian',shoulderCrystals:true,rings:true,motes:'snow'},'A construct of living ice shards held together by will.');
BD('mg_bog_hexwitch.a','Mother Morrow, the Bog Hex-Witch','hum',124,'sway','#4a5a2a,#1a2210,#a09060,#b0ff50,#8a9a60',{build:'lean',lower:'robe',armor:'rags',head:'plague',maskCol:'#c8b890',gear:'witch',hatCol:'#2a3218',weapon:'staff',staffTop:'skull',skulls:true,motes:'bubbles'},'A masked hex-witch who never shows her face.');
BD('mg_bog_hexwitch.b','Mother Morrow, the Bog Hex-Witch','toad',140,'lumber','#5a6a2a,#1a2a10,#c8b890,#b0ff50',{hat:'#2a3218',motes:'bubbles'},'The witch has been a toad for a hundred years — and likes it.');
BD('mg_sea_warlock.a','Tidelord Marenus, the Sea-Warlock','hum',132,'glide','#2a6a7a,#0a2a30,#ff8870,#60e0ff,#80a0a0',{lower:'robe',armor:'robe',torsoCol:'#2a5a6a',head:'face',eyesGlow:true,beard:'tentacle',beardCol:'#4a8a8a',gear:'coral',weapon:'trident',wepCol:'#ff8870',motes:'bubbles'},'A sea-warlock with a beard of tentacles and a crown of coral.');
BD('mg_sea_warlock.b','Tidelord Marenus, the Sea-Warlock','kraken',140,'slither','#2a6a7a,#0a2a30,#ff8870,#60e0ff',{motes:'bubbles'},'Beneath the robes: a kraken wearing a man\'s voice.');
BD('mg_nova_sorceress.a','Pyrrhia, the Nova Sorceress','hum',130,'hover','#c8402a,#4a0e08,#ffd060,#ffd060,#f0c8a0',{lower:'robe',armor:'robe',torsoCol:'#d05030',head:'face',eyesGlow:true,hair:true,hairCol:'#ffd080',gear:'sunhalo',cast:true,off:'flame',motes:'stars',float:8},'A sorceress with a sunburst halo who throws stars.');
BD('mg_nova_sorceress.b','Pyrrhia, the Nova Sorceress','orb',145,'pulse','#ff9040,#8a2a10,#ffe080,#ffe080',{orb:'heart',motes:'stars'},'She burns so bright she becomes a small, furious star.');
BD('mg_void_warlock.a','Nihilus, the Void Warlock','hum',132,'phase','#2a1a4a,#08040e,#a080ff,#c080ff',{lower:'wraith',armor:'robe',head:'void',hoodCol:'#1a0e30',weapon:'none',cast:true,off:'orb',cape:'tattered',capeCol:'#0e0818',float:10,motes:'stars'},'A hood with a starry void where the face should be.');
BD('mg_void_warlock.b','Nihilus, the Void Warlock','orb',140,'phase','#1a0a2a,#05020a,#a080ff,#c080ff',{orb:'eye',orbR:36,motes:'stars'},'An eye opening in the void between the stars.');
BD('mg_thunder_magus.a','Stormhelm, the Thunder Magus','hum',134,'stride','#4a5a6a,#1a2028,#c8a040,#9fe0ff,#d0b090',{build:'broad',armor:'fur',torsoCol:'#5a4a3a',head:'face',beard:'braid',beardCol:'#c86030',gear:'hornhelm',horns:'norse',weapon:'hammer',wepGlow:'#9fe0ff',cape:'fur',capeCol:'#3a4050',lightning:true,motes:'sparks'},'A red-bearded thunder-magus with a hammer that calls down lightning.');
BD('mg_thunder_magus.b','Stormhelm, the Thunder Magus','hum',132,'blur','#3a4a7a,#101830,#e8c040,#fff080,#d0b090',{armor:'plate',torsoCol:'#3a4a7a',head:'greathelm',helmCol:'#6a7aa0',plume:'#fff080',weapon:'spear',wepGlow:'#fff080',cape:'long',capeCol:'#1a2040',lightning:true,motes:'sparks'},'A lightning-knight with a spear of storm.');
BD('mg_stone_shaper.a','Gravelord Thane, the Stone Shaper','hum',136,'lumber','#7a7060,#3a342a,#c8b090,#ffb040,#a09080',{build:'broad',armor:'crystal',torsoCol:'#7a7060',head:'face',beard:'long',beardCol:'#a09880',gear:'crown',crownCol:'#8a8070',weapon:'staff',staffTop:'crystal',floatStones:true,motes:'motes'},'A stone-armoured mage with boulders orbiting him.');
BD('mg_stone_shaper.b','Gravelord Thane, the Stone Shaper','golem',145,'lumber','#8a8070,#3a342a,#c8b090,#ffb040',{mat:'stone',moss:true,crown:'#8a8070',runeLines:true,motes:'motes'},'The mage has shaped himself into a small mountain.');
BD('mg_blizzard_king.a','Hiemal, the Blizzard King','hum',136,'glide','#8ab0d8,#2a4a70,#e0f0ff,#c0f0ff,#b0d0e8',{armor:'plate',torsoCol:'#8ab0d8',head:'frost',beard:'icicle',beardCol:'#e0f4ff',eyesGlow:true,gear:'icecrown',weapon:'staff',staffTop:'crystal',cape:'fur',capeCol:'#c0d8f0',motes:'snow'},'A frost-king with an icicle beard, trailing a blizzard.');
BD('mg_blizzard_king.b','Hiemal, the Blizzard King','drake',145,'prowl','#e0ecf8,#8aa0c0,#ffffff,#a0e8ff',{beast:'wolf',rider:{armor:'fur',head:'frost',beard:'icicle',beardCol:'#e0f4ff',gear:'icecrown',weapon:'staff',staffTop:'crystal'},motes:'snow'},'The Blizzard King rides a white winter-wolf.');
BD('mg_rift_lich.a','Xal\'zor, the Rift Lich','hum',136,'phase','#2a3a2a,#0a100a,#c8a040,#60ff80',{lower:'wraith',armor:'rags',head:'lich',gear:'bonecrown',weapon:'staff',staffTop:'skull',off:'orb',cape:'tattered',capeCol:'#0e140e',float:10,motes:'smoke'},'A lich who hides his soul in a green orb — and blinks through rifts in the air.');
BD('mg_rift_lich.b','Xal\'zor, the Rift Lich','hum',138,'phase','#3a1a4a,#0a040e,#c8a040,#c060ff',{lower:'wraith',armor:'bone',head:'skull',gear:'runecrown',weapon:'scythe',wepCol:'#c8c0d0',off:'orb',wings:'shadow',wingCol:'#1a0a24',float:10,motes:'smoke'},'A scythe-bearing lich with wings of torn shadow.');
BD('mg_soul_drinker.a','Lady Vesperine, the Soul Drinker','hum',132,'blur','#6a0a1a,#200408,#c8a040,#ff3050,#e8d8d8,#ff2040',{armor:'robe',lower:'robe',torsoCol:'#3a0610',head:'vampire',hairCol:'#101010',eyesGlow:true,gear:'crown',weapon:'wand',off:'orb',wings:'bat',wingCol:'#2a0608',cape:'long',capeCol:'#1a0206',motes:'motes'},'A vampire sorceress with bat-wings, drinking life from across the room.');
BD('mg_soul_drinker.b','Lady Vesperine, the Soul Drinker','bird',140,'fly','#2a0a14,#100206,#c8a040,#ff3050',{bird:'roc',wingCol:'#2a0a14',wingCol2:'#6a1a2a',chestCol:'#4a1020',headCol:'#2a0a14',crest:'plume',beakCol:'#e8e0d8',motes:'motes'},'She comes apart into a great crimson bat-thing.');
BD('mg_star_sorcerer.a','Astraeus, the Star Sorcerer','hum',134,'hover','#1a2a5a,#060a1a,#e8c040,#ffe080,#e0c8a8',{lower:'robe',armor:'robe',head:'face',beard:'long',beardCol:'#e0e8ff',gear:'wizard',hatCol:'#1a2a5a',hatStars:true,weapon:'staff',staffTop:'astrolabe',planets:true,float:6,motes:'stars'},'An astronomer-sorcerer with little planets orbiting him.');
BD('mg_star_sorcerer.b','Astraeus, the Star Sorcerer','golem',145,'still','#1a2a5a,#060a1a,#e8c040,#ffe080',{mat:'gold',rings:true,runes:true,motes:'stars'},'A living orrery of gold, planets on every ring.');

// ════════════ ISLAND GUARDIANS ════════════
BD('boss_isl_1.a','Captain Blackvane, the Pirate Captain','hum',150,'blur','#6a1a1a,#2a1a1a,#e8c040,#ffd060,#d8a078',{armor:'coat',torsoCol:'#7a1a1a',head:'face',beard:'long',beardCol:'#1a1a1a',eyepatch:true,gear:'tricorn',weapon:'cutlass',off:'lantern',parrot:true,cape:'long',capeCol:'#3a0a0a'},'A pirate captain in a crimson coat and tricorn, cutlass drawn, parrot on the shoulder.');
BD('boss_isl_1.b','Captain Blackvane, the Drowned Captain','hum',155,'phase','#2a4a4a,#0a1a1a,#c8a040,#80ffd0,#8ab0a0',{armor:'coat',torsoCol:'#2a4a4a',head:'skull',gear:'tricorn',weapon:'cutlass',wepGlow:'#80ffd0',off:'chains',chains:true,float:6,motes:'bubbles'},'A ghost-captain of a sunken ship, still hunting his treasure.');
BD('boss_isl_1.c','Captain Blackvane, the Sea-Beast','kraken',150,'slither','#6a2a3a,#2a0a14,#e8c040,#ffd060',{motes:'bubbles'},'The captain\'s cursed treasure turned him into what lives beneath the ship.');
BD('boss_isl_2.a','Mossgut, the Swamp Titan','hum',160,'lumber','#3a5a2a,#1a2a10,#80c040,#ffe040,#5a7a3a',{build:'giant',head:'ogre',horns:'bull',hornCol:'#c8c0a0',armor:'fur',torsoCol:'#4a5a30',armCol:'#5a7a3a',weapon:'club',wepCol:'#5a4228',moss:true,motes:'bubbles'},'A moss-covered troll with a log club.');
BD('boss_isl_2.b','Mossgut, the Swamp Titan','toad',165,'lumber','#3a5a2a,#1a2a10,#80c040,#ffe040',{crown:'#80c040',motes:'bubbles'},'A titanic bog-toad crowned with reeds.');
BD('boss_isl_2.c','Mossgut, the Swamp Titan','hum',165,'lumber','#4a4a2a,#1a1a10,#80c040,#c0ff60',{build:'giant',lower:'roots',armor:'bark',head:'mask',maskCol:'#6a5a30',weapon:'club',motes:'leaves'},'A swamp-giant made of rotting logs and mud.');
BD('boss_isl_3.a','Emberhulk, the Lava Colossus','golem',165,'lumber','#6a2a1a,#2a1008,#ff9030,#ffa030',{mat:'magma',motes:'embers'},'A basalt colossus with lava running between its columns.');
BD('boss_isl_3.b','Emberhulk, the Lava Colossus','drake',165,'lumber','#5a2010,#200604,#ff9030,#ff8030',{beast:'behemoth',bulk:1.2,cracks:true,spines:false,breath:'#ff8030',motes:'embers'},'A lava-beast that sleeps in the cave\'s magma rivers.');
BD('boss_isl_3.c','Emberhulk, the Lava Colossus','wyrm',165,'slither','#c83a1a,#5a1a0a,#ffc040,#ffe060',{cracks:true,holeGlow:'#ff8030',motes:'embers'},'A magma wyrm coiled in the ember cave.');
BD('boss_isl_4.a','Hrimgar, the Frost Lord','hum',165,'stride','#8ab0d0,#2a4a6a,#e0f0ff,#c0f0ff,#a0c8e0',{build:'giant',armor:'fur',torsoCol:'#c0d0e0',head:'frost',beard:'icicle',beardCol:'#e0f4ff',eyesGlow:true,gear:'icecrown',weapon:'greataxe',wepCol:'#e0f4ff',wepGlow:'#c0f0ff',cape:'fur',capeCol:'#6a8aa8',motes:'snow'},'A frost-giant lord with an icicle beard and an axe of glacier-ice.');
BD('boss_isl_4.b','Hrimgar, the Frost Lord','hum',160,'phase','#9ad0f0,#3a5a8a,#dff4ff,#c0f0ff',{lower:'wraith',armor:'crystal',head:'lich',gear:'icecrown',weapon:'staff',staffTop:'crystal',wings:'ice',float:10,motes:'snow'},'A frozen lich-lord who steps from one ice mirror to the next.');
BD('boss_isl_4.c','Hrimgar, the Frost Lord','drake',160,'prowl','#e0ecf8,#8aa0c0,#ffffff,#a0e8ff',{beast:'wolf',bulk:1.2,crystals:true,motes:'snow'},'A white winter-wolf the size of a house.');

// ════════════ VOLCANO BOSS RUSH ════════════
BD('boss_vr_ember_wraith.a','Cindermourn, the Ember Wraith','hum',145,'phase','#5a2a1a,#2a1008,#ff9040,#ffe060',{lower:'wraith',armor:'rags',head:'wraith',cast:true,off:'flame',cape:'tattered',capeCol:'#2a0a04',float:12,motes:'embers'},'A hooded wraith of smoke with ember eyes.');
BD('boss_vr_ember_wraith.b','Cindermourn, the Ember Wraith','orb',150,'phase','#5a2a1a,#2a1008,#ff9040,#ffa040',{orb:'eye',orbR:34,ring:false,motes:'embers'},'A floating ember-eye trailing smoke.');
BD('boss_vr_magma_spitter.a','Pyrecoil, the Magma Basilisk','wyrm',150,'slither','#a03a1a,#4a1008,#ffb040,#ffc040',{hood:true,cracks:true,holeGlow:'#ff6020',headKind:'wolf',motes:'embers'},'A hooded magma cobra whose glare cracks stone.');
BD('boss_vr_magma_spitter.b','Pyrecoil, the Magma Spitter','toad',145,'lumber','#8a3a1a,#3a1008,#ffb040,#ffb040',{motes:'embers'},'A lava-toad that spits molten globs.');
BD('boss_vr_obsidian_golem.a','Glassgrind, the Obsidian Golem','golem',160,'lumber','#2a2226,#141014,#b060ff,#ff60ff',{mat:'obsidian',shoulderCrystals:true,motes:'motes'},'A glassy black golem with violet crystal shards.');
BD('boss_vr_obsidian_golem.b','Glassgrind, the Obsidian Golem','spider',155,'stride','#2a2226,#0a0808,#b060ff,#ff60ff',{mark:'runes',legBands:true,motes:'motes'},'An obsidian spider-golem.');
BD('boss_vr_cinder_phoenix.a','Ashwing, the Cinder Phoenix','bird',150,'fly','#e86020,#8a2a10,#ffd060,#ffd060',{bird:'phoenix',motes:'embers'},'A blazing phoenix trailing cinders.');
BD('boss_vr_cinder_phoenix.b','Ashwing, the Cinder Phoenix','bird',150,'fly','#3a3a3a,#141414,#ff8030,#ff8030',{bird:'roc',wingCol:'#3a3a3a',wingCol2:'#6a4a3a',chestCol:'#5a4a40',headCol:'#3a3a3a',crest:'flame',motes:'embers'},'A soot-black ash-bird with burning eyes.');
BD('boss_vr_lava_wyrm.a','Skorrath, the Lava Wyrm','wyrm',165,'slither','#c83a1a,#6a1a0a,#ffc040,#ffe060',{cracks:true,holeGlow:'#ff8030',motes:'embers'},'A long lava wyrm rising from the magma.');
BD('boss_vr_lava_wyrm.b','Skorrath, the Lava Wyrm','drake',160,'prowl','#8a2a10,#3a0a04,#ffc040,#ffa030',{beast:'dragon',wings:false,cracks:true,breath:'#ffa030',motes:'embers'},'A wingless fire-drake.');
BD('boss_vr_ashen_knight.a','Sir Cindric, the Ashen Knight','hum',155,'blur','#5a5050,#2a2424,#8a8070,#ff7030,#d8b090,#ff4020',{build:'broad',armor:'plate',torsoCol:'#4a4040',head:'greathelm',helmCol:'#5a5050',plume:'#ff5020',weapon:'sword',wepGlow:'#ff7030',off:'shield',emblem:'flame',shieldCol:'#3a3030',cape:'flame',motes:'embers'},'A charred knight in ash-grey plate with an ember-red cape.');
BD('boss_vr_ashen_knight.b','Sir Cindric, the Ashen Draugr','hum',158,'stride','#6a6258,#2a2420,#8a8070,#ff6040',{build:'broad',armor:'bone',head:'skull',gear:'crown',crownCol:'#6a5a4a',weapon:'greataxe',wepGlow:'#ff6040',cape:'tattered',capeCol:'#3a1a10',motes:'embers'},'A burned barrow-warrior who will not stay dead.');
BD('boss_vr_pyrokraken.a','Pyrokraken','kraken',170,'slither','#8a2a1a,#3a0806,#ffb040,#ffb040',{motes:'embers'},'A fire kraken with glowing suckers.');
BD('boss_vr_pyrokraken.b','Pyrokraken, the Magma Squid','kraken',170,'pulse','#2a1a1a,#0a0404,#ff6030,#ff6030',{motes:'embers'},'An obsidian-shelled squid of the lava deeps.');
BD('boss_vr_inferno_wraith.a','Vathrax, the Inferno Wraith','hum',175,'phase','#8a2a1a,#3a0a08,#ff6020,#ffe060',{lower:'wraith',armor:'shadow',head:'wraith',gear:'spikecrown',crownCol:'#ff8030',weapon:'whip',off:'chains',chains:true,wings:'flame',cape:'flame',float:12,motes:'embers'},'A crowned wraith wreathed in fire and chains.');
BD('boss_vr_inferno_wraith.b','Vathrax, the Inferno Wraith','orb',175,'pulse','#8a2a1a,#3a0a08,#c8a040,#ff6020',{orb:'heart',motes:'embers'},'A burning soul in a cage of chains.');
BD('boss_volcano_lord.a','Surtharn, the Volcano Lord','hum',250,'stride','#4a1a10,#1a0806,#ff6020,#ffa030,#6a2a18,#ffe060',{build:'giant',vtorso:true,headScale:1.4,armor:'magma',head:'demon',horns:'demon',hornCol:'#2a1410',gear:'spikecrown',crownCol:'#ff8030',weapon:'greatsword',wepCol:'#ff8030',wepGlow:'#fff0a0',wings:'flame',cape:'flame',motes:'embers',moteN:26},'The fire-giant of the world\'s end: horned, crowned, with a flaming sword.');
BD('boss_volcano_lord.b','Surtharn, the Volcano Lord','drake',250,'lumber','#4a1a10,#1a0806,#ffb040,#ff8030',{beast:'dragon',bulk:1.35,wings:true,wingCol:'#3a1008',wingGlow:true,headSize:1.2,breath:'#ffb040',cracks:true,motes:'embers'},'A volcano-dragon that sleeps in the summit crater.');
BD('boss_volcano_lord.c','Surtharn, the Volcano Lord','golem',250,'lumber','#3a1a10,#140604,#ff8030,#ffa030',{mat:'magma',bulk:1.2,crown:'#ff8030',horns:true,hornCol:'#2a1410',fistGlow:true,motes:'embers'},'A living mountain of magma with a crown of spikes.');

// ════════════ ELITES (treasure-vault guardians) ════════════
BD('elite_1.a','Draugr Champion','hum',132,'stride','#8a8478,#3a3430,#8a8070,#80ffd0',{build:'broad',armor:'bone',head:'skull',weapon:'sword',off:'shield',shieldCol:'#4a3a2a',cape:'tattered',capeCol:'#3a3a2a',motes:'smoke'},'A barrow-warrior risen to guard the vault.');
BD('elite_1.b','Barrow Wight','hum',132,'phase','#3a4a48,#0a1210,#8aa0a0,#80ffd0',{lower:'wraith',armor:'rags',head:'wraith',gear:'crown',crownCol:'#8a8a80',weapon:'sword',wepGlow:'#80ffd0',float:8,motes:'smoke'},'A pale-eyed wight with a barrow-blade.');
BD('elite_2.a','Bog Troll Chieftain','hum',145,'lumber','#5a6a3a,#2a3218,#a09060,#c0ff60,#7a8a5a',{build:'giant',head:'ogre',armor:'fur',armCol:'#7a8a5a',weapon:'club',moss:true},'A troll with a moss-cloak and a tree-trunk club.');
BD('elite_2.b','Mud Troll Brute','drake',140,'lumber','#6a5a3a,#2a2014,#a09060,#c0ff60',{beast:'behemoth',spines:false,moss:true},'A mud-caked troll-beast on all fours.');
BD('elite_3.a','Runic Stone Golem','golem',148,'lumber','#8a8070,#3a342a,#c8b090,#80e0ff',{mat:'stone',runeLines:true,moss:true},'A stone golem with glowing runes.');
BD('elite_3.b','Crystal Golem','golem',148,'lumber','#7a8aa0,#3a4a5a,#e0f0ff,#a0e8ff',{mat:'obsidian',shoulderCrystals:true},'A golem of crystal and quartz.');
BD('elite_4.a','Ash Wraith Lord','hum',140,'phase','#5a5050,#1a1414,#ff7030,#ff7030',{lower:'wraith',armor:'rags',head:'wraith',gear:'spikecrown',crownCol:'#4a4040',cast:true,off:'flame',float:10,motes:'embers'},'A wraith of ash and cinders.');
BD('elite_4.b','Cinder Hound Alpha','drake',135,'prowl','#3a2a24,#140a08,#ff7030,#ff7030',{beast:'wolf',cracks:true,motes:'embers'},'A huge cinder-hound, lava in its fur.');

// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 8 — Kris's picks + one look per boss across ALL its phases.
// ║ R8(id, pal|null, patch) retunes a picked design (null in the patch
// ║ removes a part). Every unpicked option above stays as it was, for
// ║ reference (the Lab shows them under "Reference — not selected").
// ║ New options (d/e/f) cover the forms Kris asked to be redrawn.
// ═══════════════════════════════════════════════════════════════════════
function R8(id,pal,patch,meta){ var D=BOSS_ART[id]; if(!D)return; if(pal){ var p=pal.split(','); D.pal={a:p[0],b:p[1],m:p[2],g:p[3],s:p[4]||'#d8b090',e:p[5]||p[3]}; }
  Object.keys(patch||{}).forEach(function(k){ if(patch[k]===null)delete D[k]; else D[k]=patch[k]; }); if(meta)Object.assign(D,meta); D.r8=true; delete D._kfix; }

// Kris's picks (Lab, Sept 30). Slots without a pick use the first new option.
Object.assign(BOSS_PICK,{
  boss_goblin_king:'c',bf_goblin_king_2:'c', boss_dark_warlock:'b',bf_dark_warlock_2:'c',
  boss_swamp_witch:'a',bf_swamp_witch_2:'c',bf_swamp_witch_3:'c', boss_storm_mage:'c',bf_storm_mage_2:'b',bf_storm_mage_3:'b',
  boss_rock_dragon:'b',bf_rock_dragon_2:'b',bf_rock_dragon_3:'e',bf_rock_dragon_4:'e',bf_drakeling:'b',
  boss_iron_sentinel:'b',bf_iron_sentinel_2:'b',bf_iron_sentinel_3:'c',bf_iron_sentinel_4:'c',bf_forge_guardian:'b',
  boss_lava_titan:'b',bf_lava_titan_2:'b',bf_lava_titan_3:'d',bf_lava_titan_4:'a',bf_lava_titan_5:'a',
  boss_shadow_lord:'b',bf_shadow_lord_2:'b',bf_shadow_lord_3:'d',bf_shadow_lord_4:'d',bf_shadow_lord_5:'b',bf_shadow_twin:'a',
  boss_isl_1:'b',boss_isl_2:'c',boss_isl_3:'c',boss_isl_4:'b', boss_volcano_lord:'a',
  boss_vr_ashen_knight:'b',boss_vr_cinder_phoenix:'b',boss_vr_ember_wraith:'a',boss_vr_inferno_wraith:'a',boss_vr_lava_wyrm:'b',boss_vr_magma_spitter:'a',boss_vr_obsidian_golem:'b',boss_vr_pyrokraken:'b',
  cw_bone_king:'b',cw_drowned_abbot:'c',cw_ember_priest:'b',cw_forge_thane:'a',cw_frost_queen:'a',cw_lotus_naga:'a',cw_mangrove_chief:'b',cw_mill_ogre:'b',cw_obsidian_jailer:'c',cw_roc_lord:'b',cw_sun_baron:'c',cw_thorn_knight:'a',
  elite_1:'b',elite_2:'a',elite_3:'a',elite_4:'a',
  mg_arcane_scribe:'b',mg_blizzard_king:'b',mg_bog_hexwitch:'a',mg_hearth_witch:'a',mg_nova_sorceress:'b',mg_rift_lich:'b',mg_rime_witch:'b',mg_sea_warlock:'a',mg_shard_sorcerer:'b',mg_soul_drinker:'a',mg_star_sorcerer:'a',mg_stone_shaper:'b',mg_storm_caller:'a',mg_thorn_druid:'b',mg_thunder_magus:'b',mg_void_warlock:'b'
});
// what each family keeps through every phase (shown in the Lab line-up)
var BOSS_THREADS={
  goblin_king:'Green goblin hide, the big gold crown, red eyes, fur and a war-hammer — and the treasure hoard glinting behind him.',
  dark_warlock:'Teal soul-fire, a white crown hovering above, the teal hourglass mark, and his rune circle behind.',
  swamp_witch:'Bog-green and moss, glowing lime eyes, the same crooked witch hat (even on the hydra), and green bog-mist.',
  storm_mage:'Deep-blue robes, wild white hair and beard, the storm orb, yellow-white lightning, and a storm cloud overhead.',
  rock_dragon:'Earth-brown stone hide, amber eyes, violet geode crystals that grow each phase, and floating crystal shards.',
  iron_sentinel:'Iron grey with gold trim, the same glowing forge-star in his chest, rock crust that builds up, and the forge ring behind.',
  lava_titan:'Obsidian black with magma cracks, bull horns and an obsidian spiked crown, a ring of lava flames around him.',
  shadow_lord:'Black and silver with lilac soul-light, the silver spiked crown in every form, and an eclipse behind him — which breaks into dawn at the end.'
};
var SIG={
  goblin:{aura:'coins'},
  warlock:{crown:'float',crownCol:'#eef6f2',crownGlow:'#60ffb0',mark:'hourglass',markCol:'#60ffb0',aura:'runes'},
  witch:{hat:'#2a3a1a',hatBand:'#8a7a40',aura:'mist'},
  storm:{aura:'storm'},
  dragon:{aura:'shards'},
  sentinel:{mark:'star',markCol:'#ff9a30',aura:'forge'},
  titan:{magma:true,aura:'lava',trail:'lava'},
  shadow:{aura:'eclipse',trail:'smoke'}
};
var sg=function(base,extra){ return Object.assign({},base,extra||{}); };

// ── Grubnash (Goblin King) ──
R8('boss_goblin_king.c',null,{sig:sg(SIG.goblin)});
R8('bf_goblin_king_2.c','#6a7a5a,#2a3222,#e8c040,#ffd040,#8aaa50,#ff4020',{rider:{head:'goblin',headScale:1.35,belly:true,gear:'crown',armor:'fur',torsoCol:'#7a5a3a',armCol:'#8aaa50',weapon:'hammer',wepCol:'#8a8a90',skulls:true,eyesGlow:true},hornCol:'#d8d0b8',motes:null,sig:sg(SIG.goblin)},
  {lore:'Grubnash, crown and war-hammer and all, rides out on a chained, horned cave-beast that shakes the warren with every stamp.'});
// ── Morvane (Dark Warlock) ──
R8('boss_dark_warlock.b',null,{gear:null,sig:sg(SIG.warlock,{crownSize:1.45})});
R8('bf_dark_warlock_2.c','#1a1e24,#07090c,#8ab0a0,#60ffb0',{legBands:true,motes:'smoke',sig:sg(SIG.warlock,{mark:null,crownSize:1.5})},
  {lore:'Morvane fuses with his brood-queen. The teal hourglass burns on her back, and his white crown still hovers above.'});
// ── Granny Greenteeth (Swamp Witch) ──
R8('boss_swamp_witch.a',null,{sig:sg(SIG.witch,{hat:null})});   // she already wears the hat
R8('bf_swamp_witch_2.c','#3a5a2a,#1a2a12,#8a7a40,#a0ff60,#8aa060',{torsoCol:'#5a4a30',hatCol:'#2a3a1a',hairCol:'#c8c8b0',motes:'bubbles',moteN:10,sig:sg(SIG.witch,{hat:null})});
R8('bf_swamp_witch_3.c','#3a5a2a,#10200e,#8a7a40,#a0ff60',{hoodCol:'#2a3a1a',holeGlow:'#a0ff60',sig:sg(SIG.witch,{hatSize:1.25})},
  {lore:'The witch sinks into the mire and rises as a hydra — still wearing that crooked hat.'});
// ── Tharnwald (Storm Mage) ──
R8('boss_storm_mage.c','#2a4a9a,#0a1a4a,#e0e8ff,#fff080,#e8d0b8,#c0e0ff',{capeCol:'#0a1a4a',sig:sg(SIG.storm)});
R8('bf_storm_mage_2.b','#2a4a9a,#0a1a4a,#e0e8ff,#fff080,#e0c8a8,#c0e0ff',{hair:'wild',hairCol:'#f0f4ff',off:'orb',sig:sg(SIG.storm)});
R8('bf_storm_mage_3.b','#2a4a9a,#0a1a4a,#e0e8ff,#fff080,#e0c8a8,#c0e0ff',{armor:'crystal',torsoCol:'#2a4a9a',head:'face',hair:'wild',hairCol:'#f0f4ff',beardCol:'#f0f4ff',gear:'hornhelm',helmCol:'#1a3a8a',off:'orb',wingCol:'#c8d8ff',wingCol2:'#fff8c0',cape:'long',capeCol:'#0a1a4a',sig:sg(SIG.storm)},
  {lore:'Tharnwald unbound: a storm giant with the mage\'s white beard, blue robes and storm orb, a thunder-hammer in his fist.'});
// ── Grauldr (Rock Dragon) — geode crystals grow each phase ──
R8('boss_rock_dragon.b','#8a6a4a,#3a2a1a,#e0c080,#c080ff,#d8b090,#ffb040',{crystals:true,motes:null,sig:sg(SIG.dragon)});
R8('bf_rock_dragon_2.b','#7a5a44,#2e2014,#e0c8ff,#c080ff,#d8b090,#ffb040',{wingCol:'#4a3428',wingGlow:true,sig:sg(SIG.dragon)});
BD('bf_rock_dragon_3.d','Grauldr the Earthshaker','wyvern',205,'soar','#7a5a44,#2e2014,#e0c8ff,#c080ff,#d8b090,#ffb040',
  {bulk:1,neck:1,tail:1,crystals:true,wingCol:'#4a3428',wingGlow:true,chestGlow:'#c080ff',breath:'#c080ff',motes:'stars',moteN:10,sig:sg(SIG.dragon)},
  'Grauldr tears free of the mountain and takes wing — a long, lean dragon with a violet furnace glowing in his chest.');
BD('bf_rock_dragon_3.e','Grauldr the Earthshaker','wyvern',210,'soar','#6a5040,#2a1c12,#e0c8ff,#c080ff,#d8b090,#ffb040',
  {bulk:1.12,neck:0.9,tail:0.95,crystals:true,plates:true,headSize:1.08,wingCol:'#3e2c22',chestGlow:'#ff9040',breath:'#ffb060',cracks:true,sig:sg(SIG.dragon)},
  'A heavier, rock-plated dragon on the wing. Its chest glows ember-orange before it breathes; the geodes still crown its back.');
BD('bf_rock_dragon_4.d','Grauldr, Tyrant of the Mountain','wyvern',250,'soar','#6a4c3a,#241810,#f0d8ff,#c080ff,#d8b090,#ffd060',
  {bulk:1.12,torso:1.25,legScale:1.35,arms:true,neck:1.25,tail:1.3,wingSpan:1.12,crystals:true,plates:true,headSize:1.12,wingCol:'#3a2a20',wingGlow:true,chestGlow:'#d090ff',breath:'#d090ff',motes:'stars',moteN:14,sig:sg(SIG.dragon,{crown:'spike',crownCol:'#c080ff',crownGlow:'#e0c0ff',crownSize:0.9})},
  'The tyrant fully awake: a vast, long-necked dragon on two great wings, wearing a crown of geode crystal.');
BD('bf_rock_dragon_4.e','Grauldr, Tyrant of the Mountain','wyvern',255,'soar','#5a4436,#1e140e,#f0d8ff,#c080ff,#d8b090,#ffd060',
  {bulk:1.2,torso:1.3,legScale:1.45,arms:true,neck:1.15,tail:1.35,wingSpan:1.18,crystals:true,plates:true,cracks:true,headSize:1.15,wingCol:'#302218',wingGlow:true,chestGlow:'#ff9040',breath:'#ffb060',motes:'embers',moteN:12,sig:sg(SIG.dragon)},
  'An even bigger, heavier tyrant — rock plates, molten cracks and violet geodes, fire building in its chest.');
R8('bf_drakeling.b','#7a5a44,#2e2014,#e0c8ff,#c080ff,#d8b090,#ffb040',{crystals:true,wingCol:'#4a3428'},{name:'Geode Drakeling',lore:'Grauldr\'s brood: small stone drakes with violet crystal spines.'});
// ── Brokkrun (Iron Sentinel) — the forge-star in his chest in every form ──
R8('boss_iron_sentinel.b','#6a6e76,#2a2e36,#c8a040,#ff9030',{glowcore:null,sig:sg(SIG.sentinel)});
R8('bf_iron_sentinel_2.b','#5a5e66,#2a2e36,#c8a040,#ff9030',{core:false,sig:sg(SIG.sentinel,{rocks:'spires',rockCol:'#6e665c'})});
R8('bf_iron_sentinel_3.c','#5a5e66,#2a2e36,#c8a040,#ff9030',{mat:'iron',bulk:1.2,core:false,moss:true,sig:sg(SIG.sentinel,{rocks:'spires',rockHead:true,rockSize:1.3,rockCol:'#6e665c',markSize:1.3})},
  {lore:'The orrery colossus — now iron and gold, with a mountain\'s worth of rock grown over its shoulders, the forge-star blazing in its chest.'});
R8('bf_iron_sentinel_4.c','#6a6e76,#2a2e36,#c8a040,#ff9030,#d8b090,#ffe080',{torsoCol:'#5a5e66',helmCol:'#6a6e76',plume:'#ff9030',wepGlow:'#ff9030',glowcore:null,sig:sg(SIG.sentinel,{rocks:'spires',rockCol:'#6e665c',markSize:1.2})},
  {lore:'Brokkrun Prime — a man after all, iron armour crusted with the mountain\'s rock, the same forge-star in his chest.'});
R8('bf_forge_guardian.b','#5a5e66,#2a2e36,#c8a040,#ff9030',{mat:'iron',core:false,sig:{mark:'star',markCol:'#ff9a30'}});
// ── Surtvald (Lava Titan) — obsidian, magma cracks, bull horns, spiked crown ──
R8('boss_lava_titan.b','#3a1a10,#140604,#ffb040,#ff7020,#6a2a18',{gear:'spikecrown',crownCol:'#2a1a14',sig:sg(SIG.titan)});
R8('bf_lava_titan_2.b','#3a1a10,#140604,#ffb040,#ff7020,#6a2a18',{horns:'bull',hornCol:'#2a1a14',sig:sg(SIG.titan)});
BD('bf_lava_titan_3.d','Surtvald the Worldburner','hum',205,'lumber','#3a1a10,#140604,#ffb040,#ff7020,#6a2a18',
  {build:'giant',armor:'magma',head:'demon',horns:'demon',hornCol:'#2a1a14',flameHead:true,gear:'spikecrown',crownCol:'#2a1a14',weapon:'greatsword',wepCol:'#3a2a24',wepGlow:'#ff7020',wepScale:1.35,cape:'flame',spikes:true,motes:'embers',moteN:14,sig:sg(SIG.titan,{swoosh:'#ff6020',rocks:true,rockCol:'#2a1e1c',rockGlow:true})},
  'A true titan now: obsidian and magma, horns and crown, a flame-sword that leaves blazing red arcs through the air.');
BD('bf_lava_titan_3.e','Surtvald the Worldburner','hum',210,'lumber','#3a1a10,#140604,#ffb040,#ff7020,#6a2a18',
  {build:'giant',armor:'magma',head:'demon',horns:'bull',hornCol:'#2a1a14',flameHead:true,gear:'spikecrown',crownCol:'#2a1a14',weapon:'greataxe',wepScale:1.25,wepCol:'#2a1e1c',wepGlow:'#ff7020',off:'flame',cape:'flame',motes:'embers',moteN:14,sig:sg(SIG.titan,{swoosh:'#ff7020',magmaN:30})},
  'The titan with his axe from phase 2 grown huge, a fistful of fire in the other hand, lava pouring off every swing.');
BD('bf_lava_titan_3.f','Surtvald the Worldburner','golem',200,'lumber','#3a1a10,#140604,#ffb040,#ff7020',
  {box:[-120,120,-196,14],mat:'obsidian',bulk:1.2,horns:true,hornCol:'#2a1a14',crown:'#2a1a14',cracks:true,fistGlow:true,shoulderCrystals:true,core:false,motes:'embers',sig:sg(SIG.titan,{swoosh:'#ff6020',swooshR:5,mark:'gem',markCol:'#ff7020'})},
  'A walking volcano of obsidian with a molten heart-gem, horns and crown, lava trailing from its fists.');
R8('bf_lava_titan_4.a','#3a1a10,#140604,#ffb040,#ff7020',{hornCol:'#2a1a14',sig:sg(SIG.titan,{crown:'spike',crownCol:'#2a1a14',crownGlow:'#ff7020',mark:'heart',markCol:'#ff8020',markSize:1.6})},
  {lore:'The titan drops to all fours — a molten behemoth, and through its cracked chest you can see the burning heart that will be all that is left.'});
R8('bf_lava_titan_5.a','#3a1a10,#140604,#ffb040,#ff7020',{sig:sg(SIG.titan,{crown:'spike',crownCol:'#2a1a14',crownGlow:'#ff7020',crownSize:1.1,trail:null})},
  {lore:'All that is left: the titan\'s burning heart, still wearing his obsidian crown, in a ring of lava.'});
// ── Malgorath (Shadow Lord) — silver spiked crown + lilac soul-light + eclipse → dawn ──
R8('boss_shadow_lord.b','#1a1a24,#060608,#8a8a98,#a0a0ff,#d8b090,#c0c0ff',{wepGlow:'#a0a0ff',sig:sg(SIG.shadow)});
R8('bf_shadow_lord_2.b','#1a1a24,#060608,#8a8a98,#a0a0ff,#d8b090,#c0c0ff',{gear:'spikecrown',crownCol:'#8a8a98',wingCol2:'#a0a0ff',motes:'smoke',sig:sg(SIG.shadow)});
R8('bf_shadow_lord_3.a','#1a1a24,#060608,#8a8a98,#a0a0ff,#d8b090,#c0c0ff',{wingCol:'#14141c',rider:{build:'broad',armor:'plate',torsoCol:'#1a1a24',head:'hood',hoodCol:'#14141c',gear:'spikecrown',crownCol:'#8a8a98',weapon:'sword',wepCol:'#8a8aa0',wepGlow:'#a0a0ff',off:'shield',emblem:'eclipse',shieldCol:'#0a0610'},sig:sg(SIG.shadow)},
  {lore:'Malgorath, crowned and hooded, rides a shadow-dragon between the planes.'});
R8('bf_shadow_lord_4.c','#1a1a2a,#06060c,#8a8a98,#a0a0ff',{sig:sg(SIG.shadow,{crown:'spike',crownCol:'#8a8a98',crownGlow:'#a0a0ff',crownSize:0.7})});
R8('bf_shadow_lord_5.b','#e8d8b0,#3a2a18,#c8c8d8,#ffe080,#f0dcc8,#ffffff',{gear:'spikecrown',crownCol:'#c8c8d8',wingCol2:'#a0a0ff',sig:sg(SIG.shadow,{aura:'dawn',trail:null})},
  {lore:'The eclipse breaks: Malgorath ascends as a fallen dawn — still wearing the silver crown, lilac light in his wings.'});
R8('bf_shadow_twin.a','#1a1a24,#060608,#8a8a98,#a0a0ff,#d8b090,#c0c0ff',{armor:'rags',torsoCol:null,head:'hood',hoodCol:'#14141c',horns:null,gear:'spikecrown',crownCol:'#8a8a98',off:'none',sig:{trail:'smoke'}},
  {lore:'A flickering copy of Malgorath\'s first form, split off between the planes.'});

// ── Round 8 review (Oct 1): Malgorath rides a dread-wing, then becomes one ──
BD('bf_shadow_lord_3.d','Malgorath the Dread-Rider','wyvern',200,'soar','#2a2630,#0a080e,#8a8a98,#a0a0ff,#d8b090,#c0c0ff',
  {headKind:'fell',neck:1.15,tail:1.2,chestGlow:false,tattered:true,wingCol:'#1a1820',bellyCol:'#3a3440',
   rider:{build:'broad',lower:'wraith',armor:'rags',head:'hood',hoodCol:'#14141c',gear:'spikecrown',crownCol:'#8a8a98',weapon:'sword',wepCol:'#8a8aa0',wepGlow:'#a0a0ff',cape:'tattered',capeCol:'#08080c',eyesGlow:true},motes:'smoke',sig:sg(SIG.shadow)},
  'Malgorath, crowned and hooded, rides a dread-wing — a carrion-winged beast with a hooked beak and tattered sails of skin.');
BD('bf_shadow_lord_3.e','Malgorath the Dread-Rider','wyvern',205,'soar','#3a3238,#0e0a10,#8a8a98,#a0a0ff,#d8b090,#c0c0ff',
  {headKind:'fell',neck:1.25,tail:1.1,bulk:1.05,chestGlow:false,tattered:true,plates:true,wingCol:'#241e26',bellyCol:'#4a4048',
   rider:{build:'broad',lower:'wraith',armor:'plate',torsoCol:'#1a1a24',head:'hood',hoodCol:'#14141c',gear:'spikecrown',crownCol:'#8a8a98',weapon:'scythe',wepCol:'#8a8aa0',wepGlow:'#a0a0ff',eyesGlow:true},motes:'smoke',sig:sg(SIG.shadow)},
  'A heavier, armour-plated dread-wing; the Shadow Lord rides it with a reaping blade.');
BD('bf_shadow_lord_4.d','Malgorath, the Dread-Wing','wyvern',250,'soar','#2a2630,#0a080e,#8a8a98,#a0a0ff,#d8b090,#c0c0ff',
  {headKind:'fell',bulk:1.15,torso:1.2,legScale:1.3,arms:true,neck:1.3,tail:1.35,wingSpan:1.15,headSize:1.15,chestGlow:false,tattered:true,wingCol:'#16141c',wingGlow:true,bellyCol:'#3a3440',breath:'#a0a0ff',motes:'smoke',moteN:14,
   sig:sg(SIG.shadow,{crown:'spike',crownCol:'#8a8a98',crownGlow:'#a0a0ff',crownSize:0.85})},
  'The rider is gone — Malgorath has become the beast: a vast dread-wing wearing his silver crown, shrieking lilac fire.');
BD('bf_shadow_lord_4.e','Malgorath, the Dread-Wing','wyvern',255,'soar','#1e1a24,#060408,#8a8a98,#a0a0ff,#d8b090,#e0c0ff',
  {headKind:'fell',bulk:1.2,torso:1.25,legScale:1.4,arms:true,neck:1.2,tail:1.4,wingSpan:1.2,headSize:1.2,chestGlow:'#a0a0ff',tattered:true,plates:true,wingCol:'#121016',wingGlow:true,bellyCol:'#2e2834',breath:'#c0a0ff',motes:'smoke',moteN:16,
   sig:sg(SIG.shadow,{crown:'spike',crownCol:'#8a8a98',crownGlow:'#a0a0ff',crownSize:0.85})},
  'A bigger, armoured dread-wing with a lilac soul-fire burning in its chest.');
