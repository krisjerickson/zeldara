// ═══ SE WETLANDS — "Bog, mist & the drowned" ══════════════════════════
// Level 5–10. Adds status effects: slow, poison, pull, sink, blind.
// ── Mainland ──
MON(2,'main','',2,'bog_serpent','Bog Serpent',['serpent','breath','#2a8a4a,#14502a,#80ff60,#ffe040','fins,water'],'T:shallow water, marsh',
 'Long green serpent with fin ridges, rising from the bog.',
 'Hides submerged — only ripples show — then rushes out.',
 'Bog-flame: a cone of green swamp fire (existing attack).',
 'Invulnerable while submerged.',
 'Surfaces when you stand still near water for 2 s.','bog_serpent');
MON(2,'main','',3,'mud_troll','Mud Troll',['brute','slam','#5a4a28,#3a2e18,#8a7a50,#ff6030','moss,belly'],'T:mud flats, bog edges',
 'Hulking troll caked in dripping mud.',
 'Zig-zag lumber (existing).',
 'Stomp (existing) that throws mud: slow 30% for 2 s.',
 'Regenerates while standing in mud.',
 'Lure it onto dry land to stop the regeneration.','mud_troll');
MON(2,'main','',2,'lily_lurker','Lily Lurker',['plant','lunge','#3a8a6a,#1a4a3a,#ffd27a,#ff3030','bulb'],'T:lantern lilies, ponds',
 'A lantern lily pad that is really the top of a big snapping jaw.',
 'Hidden among real lily pads.',
 'Snap + drag: pulls you 2 tiles into the water.',
 'Only its glowing lure is weak.',
 'Its lure glows a slightly different colour from real lilies.');
MON(2,'main','',1,'glowfrog','Glowfrog Croaker',['frog','lunge','#40c0a0,#1a6a5a,#b0ff80,#101010','spots,glow'],'pack|night|T:glow-frog pools',
 'Chubby frog with bioluminescent spots.',
 'Leaps in arcs from pad to pad.',
 'Tongue lash that pulls you to it.',
 'Poison skin: touching it poisons you (2 dmg/s, 3 s).',
 'A croak chorus of 3+ frogs makes the tongue pulls chain.');
MON(2,'main','',2,'leech_swarm','Leech Swarm',['swarm','lunge','#3a2a3a,#1a101a,#c04060,#ff3030','many'],'T:shallow water',
 'Wriggling cloud of black leeches under the water.',
 'Drifts toward you in shallow water.',
 'Latches on: drains 1 HP/s until you leave the water or dodge-roll.',
 'Fire or salt breaks the swarm.',
 'Latched leeches slow you 10% each.');
MON(2,'main','',2,'mire_crab','Mire Crab',['crab','lunge','#6a8a5a,#3a4a30,#a0c080,#101010','shell'],'T:mud flats, shores',
 'Moss-backed crab with one oversized claw.',
 'Scuttles sideways; always faces you.',
 'Claw grab + pinch (hold 1 s).',
 'Shell blocks everything from the front.',
 'A heavy hit flips it on its back — 3 s helpless.');
MON(2,'main','',3,'will_o_wisp','Will-o\'-Wisp',['wisp','pulse','#c0f0ff,#4a8aa0,#80e0ff,#ffffff',''],'night|T:marsh, deep water edges',
 'A pale floating flame that bobs just out of reach.',
 'Drifts away as you approach, toward deep water.',
 'Lure: slowly pulls you toward it while you are near.',
 'Can only be hurt by ranged attacks or magic.',
 'Kill it to break the pull — or follow it to a hidden cache.');
MON(2,'main','',3,'peat_walker','Peat Walker',['wraith','summon','#5a4a38,#2a2018,#80a060,#c0ff80','chains'],'night|T:bogs, drowned village',
 'Leathery bog-mummy wrapped in reeds.',
 'Slow walk; sinks and resurfaces.',
 'Summons grabbing mud-hands around you (root 1 s).',
 'Hands are separate targets; the body is tough.',
 'Keep moving — the hands appear where you stood.');
MON(2,'main','',3,'shellback','Snapping Shellback',['turtle','spin','#6a8a4a,#3a4a28,#8a7a50,#ff3030',''],'T:turtle-shell isles',
 'Big snapping turtle with a mossy, runed shell.',
 'Slow walk; spins in its shell for fast attacks.',
 'Shell spin that ricochets around the area.',
 'Retracted = invulnerable.',
 'Hit it right after a spin (dizzy 2 s).');
MON(2,'main','',4,'mangrove_strangler','Mangrove Strangler',['tree','lunge','#4a3a2a,#2a2018,#4fe0ff,#4fe0ff','moss'],'T:mangroves',
 'Mangrove tree with glowing blue roots and a knot for a face.',
 'Stationary.',
 'Root lashes from the ground anywhere in a 5-tile radius (glow warning).',
 'Immune to arrows; burns easily.',
 'Stand on stones — roots can\'t reach through rock.');
MON(2,'main','',2,'bloodgnats','Bloodgnat Cloud',['swarm','dive','#a04050,#501820,#ff8080,#ff3030',''],'pack|T:reeds, cattails',
 'A buzzing red cloud of mosquitoes.',
 'Hit-and-run passes.',
 'Each pass adds a "bitten" stack: -5% speed, max 5.',
 'Scatters and reforms when hit.',
 'Standing in smoke or near fire clears the stacks.');
MON(2,'main','',4,'reed_stalker','Reed Stalker',['insect','lunge','#8a9a50,#4a5028,#e0e8a0,#ff4040','scythes,antennae'],'T:wisp cattails',
 'Tall reed-coloured mantis-heron hybrid.',
 'Invisible while inside cattails.',
 'Ambush lunge, then retreats into the reeds.',
 'Revealed for 3 s after each attack.',
 'Cut or burn the reeds to take its cover away.');
MON(2,'main','',3,'waterlogged_revenant','Waterlogged Revenant',['biped','lob','#6a8a8a,#2a4a4a,#a0d0d0,#80ffff','skull'],'night|T:drowned village',
 'Drowned villager in dripping rags.',
 'Climbs out of flooded houses.',
 'Throws broken roof tiles in arcs.',
 'Waterlogged: fire does half damage.',
 'Ring the village bell (prop) and they all return to the water.');
MON(2,'main','',4,'stormeel','Storm Eel',['eel','pulse','#3a5a8a,#1a2a4a,#80e0ff,#ffff80','water'],'T:rivers, deep water edges',
 'Long eel crackling with blue electricity.',
 'Swims along rivers and pools.',
 'Charges the whole pool — any water tile near it shocks you.',
 'Only hittable when it leaps.',
 'Stay on dry land when it glows.');
MON(2,'main','',3,'heron_knight','Heron Knight',['bird','lunge','#d8e0e8,#5a6a7a,#e8c040,#101010','talons'],'T:shallows, stilt walkways',
 'Tall white heron in a little helmet, beak like a spear.',
 'Wades; leaps back after each strike.',
 'Precise long-range beak stab (3 tiles).',
 'Parries arrows with its wings.',
 'Bait the stab, then close in while it recovers.');
MON(2,'main','',4,'moss_golem','Moss Golem',['golem','slam','#6a8a5a,#3a5a30,#80ff80,#80ff80','moss'],'T:willow cathedral, mossy ruins',
 'Stone golem blanketed in thick wet moss.',
 'Slow; drinks from pools to heal.',
 'Slam with a moss shockwave (slow).',
 'Moss armor absorbs damage until burned off.',
 'Fire strips the armor; then it takes full damage.');
MON(2,'main','',2,'slime_newts','Slime Newts',['small','spit','#e08040,#8a4020,#c0ff60,#101010','tail'],'pack|T:pools, mud',
 'Bright orange newts in groups of 4.',
 'Scatter and regroup quickly.',
 'Spit slime: slows 20%, stacks.',
 'Tiny; low HP.',
 'Slime puddles make you slide.');
MON(2,'main','',3,'stilt_bandit','Stilt Bandit',['biped','lob','#c8a070,#4a5a4a,#d8d0b0,#ff4040','hood,stilts,net'],'pack|T:stilt walkways',
 'Marsh bandit on tall stilts with a fishing net.',
 'Strides over water.',
 'Throws a net: roots you 2 s.',
 'Knock out a stilt and it falls in the water (stunned).',
 'Bandits steal a random item stack if the net lands.');
MON(2,'main','',4,'fog_phantom','Fog Phantom',['wraith','blink','#c8d0d0,#7a8888,#e0f0f0,#ffffff',''],'night|T:misty areas',
 'A face in the fog with trailing mist arms.',
 'Only visible within 3 tiles.',
 'Mist touch drains your light radius and 2 HP.',
 'Intangible except when attacking.',
 'Lanterns and fire reveal it from farther away.');
MON(2,'main','',5,'bog_hydra','Bog Hydra',['serpent','breath','#3a7a4a,#1a4a2a,#c0ff60,#ffe040','hood,water'],'T:sunken spires (one per zone)',
 'Three-headed serpent rising from a sunken temple pool.',
 'Stays in its pool; heads weave independently.',
 'Each head: bite, poison spit, or water jet.',
 'Cut heads regrow unless burned within 5 s.',
 'A mini-boss for the brave; guards a big chest.');

// ── Dungeon ──
MON(2,'dun','melee',2,'drowned_guard','Drowned Guard',['biped','lunge','#6a8a8a,#3a4a50,#c8ccd4,#80ffff','helmet,spear,armor'],'',
 'Waterlogged temple guard with a halberd.','Steady advance.','Wide halberd sweep; drips leave slowing puddles.','Armor: halved damage from the front.','Parry the sweep to stagger it.');
MON(2,'dun','melee',2,'sludge_brute','Sludge Brute',['brute','slam','#5a6a40,#2a3420,#a0c060,#ffff60','belly'],'',
 'A big ooze with a skull floating inside.','Slow ooze.','Engulf slam.','Hits make it spit out small slimes.','Kill the minis fast or it re-absorbs them.');
MON(2,'dun','melee',3,'gator_raider','Gator Raider',['biped','lunge','#4a7a40,#2a4020,#c8c8d0,#ffe040','tail,shield,spear'],'',
 'Lizardfolk warrior with a turtle-shell shield.','Charges from a distance.','Charge, then tail swipe knockback.','Shield-first.','Tail swipe knocks you into water/pits.');
MON(2,'dun','melee',3,'crypt_crawler','Crypt Crawler',['insect','lunge','#8a4a3a,#4a2018,#ffb060,#ff3030','mandibles,antennae'],'',
 'Giant centipede with rust-red plates.','Fast, wiggles along walls.','Poison bite (DoT).','Each body segment is separately hittable; cut it in half = 2 smaller crawlers.','Kill the head to kill the whole thing.');
MON(2,'dun','melee',3,'leech_knight','Leech Knight',['biped','lunge','#5a3a4a,#2a1a28,#c04060,#ff3030','helmet,sword'],'',
 'Knight in rusted armor, leeches for a plume.','Relentless walk.','Every hit heals it.','Tough.','Fire makes the leeches drop off (no healing).');
MON(2,'dun','melee',2,'mold_zombie','Mold Zombie',['biped','pulse','#8a9a70,#4a5040,#d0e080,#ffff80','skull'],'pack',
 'Shambling corpse covered in yellow mold.','Slow shamble in groups.','Claw swipe.','On death: poison cloud (3 s).','Kill them at range.');
MON(2,'dun','melee',3,'barnacle_brute','Barnacle Brute',['brute','slam','#8a8a80,#4a4a48,#e8e0d0,#ff6030','shell,spikes'],'',
 'Giant crusted in barnacles.','Slow.','Heavy two-handed slam.','Barnacle armor breaks off in chunks (3 stages).','Each armor break makes it faster.');
MON(2,'dun','melee',3,'rootbound_thrall','Rootbound Thrall',['biped','summon','#6a5a40,#3a2a18,#80c060,#c0ff80','hood'],'',
 'Villager puppet held up by roots.','Jerky puppet movement.','Roots burst from the floor around you.','Cutting the roots on the wall frees (kills) it.','Pitiful — frees a ghostly thank-you.');
MON(2,'dun','melee',1,'skitter_crabs','Skitter Crabs',['crab','lunge','#c06a40,#6a3420,#ffb080,#101010',''],'pack',
 'A scuttling pack of palm-sized crabs.','Surround you.','Pinches.','Each dies in one hit.','Six at once.');
MON(2,'dun','melee',4,'naga_guard','Naga Temple Guard',['serpent','spin','#3a8a8a,#1a4a4a,#e8c040,#ffe040','hood'],'',
 'Serpent-bodied warrior with two curved swords.','Slithers fast.','Dual-slash combo (3 hits).','Deflects arrows with spinning blades.','Pause after the combo = your opening.');
MON(2,'dun','ranged',1,'spitfrog','Spitfrog Sniper',['frog','spit','#6a9a40,#3a5a20,#c0ff40,#ff3030','spots'],'',
 'Frog with a pouch cheek full of poison.','Hops to vantage points.','Arcing poison globs.','Low HP.','Globs leave poison puddles for 4 s.');
MON(2,'dun','ranged',2,'harpoon_lizard','Harpoon Lizard',['biped','shoot','#4a7a40,#5a4028,#c8c8d0,#ffe040','tail,spear'],'',
 'Lizardfolk fisher with a harpoon on a rope.','Keeps range.','Harpoon: pulls you to it.','Weak up close.','Cut the rope (attack it) to break free.');
MON(2,'dun','ranged',2,'bubble_crab','Bubble Crab',['crab','shoot','#8ac0d0,#4a7080,#e0f8ff,#101010','shell'],'',
 'Blue crab that blows big bubbles.','Sidesteps.','Bubble traps you: you float helpless for 1.5 s.','Shell blocks frontal hits.','Pop bubbles with any attack.');
MON(2,'dun','ranged',3,'mud_mortar','Mud Mortar Troll',['brute','lob','#6a5a38,#3a2e18,#8a7a50,#ff6030','belly'],'',
 'Squat troll with a hollow log mortar.','Stationary.','Lobs mud bombs; each leaves a slowing puddle.','Tough; slow to turn.','Get behind it — it can\'t turn quickly.');
MON(2,'dun','ranged',3,'dart_naga','Dart Naga',['serpent','shoot','#4a8a6a,#1a4a3a,#a0ff80,#ffe040','hood'],'',
 'Naga hiding in wall alcoves.','Pops in and out of alcoves.','Poison darts in a spread.','Only hittable while out.','Alcoves glow before it appears.');
MON(2,'dun','ranged',2,'coral_archer','Coral Archer',['biped','shoot','#e08a7a,#8a4a40,#ffd0c0,#ffffff','bow'],'',
 'Skeletal archer grown over with pink coral.','Holds position.','Arrows that ricochet off walls once.','Coral armor on the front.','Aim for the back.');
MON(2,'dun','ranged',3,'ink_squid','Ink Squid',['eye','spit','#8a6aa0,#4a3a60,#303050,#ffffff','tentacles'],'',
 'Floating squid with big sad eyes.','Floats over water.','Ink cloud blind + beak jab.','Squirts away when hit.','Ink clouds hide you too — use them.');
MON(2,'dun','ranged',2,'eel_turret','Hole Eel',['eel','beam','#4a6a8a,#1a2a4a,#80e0ff,#ffff80','water'],'pack',
 'Eel living in floor water-holes.','Pops out of a random hole.','Water jet in a line.','Only out for 2 s.','Plug a hole with a crate or rock.');
MON(2,'dun','ranged',2,'gnat_caller','Gnat Caller',['caster','summon','#8a7a5a,#4a4030,#ff8080,#ffe040','hood'],'',
 'Hunched swamp hermit with a jar of gnats.','Keeps away.','Releases homing gnat swarms.','Weak.','Break the jar (its pack) and the gnats attack him.');
MON(2,'dun','ranged',4,'lantern_thrower','Bog Lantern Thrower',['biped','lob','#5a4a3a,#2a2018,#ffd070,#ffb040','hood,lantern'],'',
 'Goblin marsh-lighter with a crate of lanterns.','Stays near marsh gas pockets.','Throws lit lanterns — gas pockets explode.','Afraid of water.','Detonate the gas while it stands in it.');

// ── Tower ──
MON(2,'tow','',2,'swamp_witch','Swamp Witch',['caster','cast','#7a9a60,#3a4a3a,#80ff60,#ffe040','hat,cauldron'],'',
 'Green-skinned witch with a bubbling cauldron.','Orbits the room (existing).','Flame spells (existing) + cauldron spawns frogs.','Cauldron shield while brewing.','Tip the cauldron over to stop the frogs.','swamp_witch');
MON(2,'tow','',3,'tide_caller','Tide Caller',['caster','pulse','#8ab0d0,#2a4a7a,#80e0ff,#ffffff','hood,staff'],'',
 'Robed priest with a conch-shell staff.','Stands on a dais.','Raises the water: the whole floor floods (slow) every 10 s.','Dais is dry — get up there.','Low water reveals hidden floor spikes.');
MON(2,'tow','',3,'mist_weaver','Mist Weaver',['caster','blink','#d0e0e0,#6a8888,#e0f0f0,#80ffff','hood'],'',
 'Veiled sorceress trailing fog.','Hides in her own fog.','Makes 3 mist clones that each cast weak bolts.','Clones pop in 1 hit.','The real one leaves wet footprints.');
MON(2,'tow','',3,'moon_moth_mage','Moon Moth Mage',['bat','beam','#e0e0ff,#6a6aa0,#c0c0ff,#ffffff',''],'night',
 'Huge pale moth with a crescent on its wings.','Flutters high.','Moonbeams that follow your path with a delay.','Only hittable when it lands.','Stronger at night.');
MON(2,'tow','',3,'hex_toad','Hex Toad',['frog','cast','#6a4a8a,#3a2a4a,#c080ff,#ffe040','spots,glow'],'',
 'Big warty purple toad wearing a tiny crown.','Hops.','Curse: turns you into a frog for 3 s (weak hop attack only).','Tongue parries.','Kiss… no. Break its crown to lift curses.');
MON(2,'tow','',3,'rain_spirit','Rain Spirit',['wisp','pulse','#a0c0e0,#4a6a8a,#80c0ff,#ffffff',''],'',
 'A small grumpy raincloud with a face.','Floats above you.','Lightning strike if you stand still > 1.5 s.','Hard to hit (it is above you).','Hit it by jumping/using a lightning spell.');
MON(2,'tow','',4,'reflecting_nymph','Reflecting Nymph',['caster','blink','#c0f0ff,#5a8aa0,#ffffff,#3060ff','crown,wand'],'',
 'Water nymph with a mirror-like skin.','Glides between mirrors.','Reflects all projectiles back.','Only melee hurts her.','Mirrors on the walls can be broken to trap her.');
MON(2,'tow','',3,'leech_warlock','Leech Warlock',['caster','beam','#5a3a4a,#2a1a28,#c04060,#ff3030','hood,staff'],'',
 'Pallid warlock with a leech-crowned staff.','Keeps distance.','Life-drain tether beam (heals him).','Breaks line-of-sight tethers.','Hide behind a pillar to cut the tether.');
MON(2,'tow','',4,'bubble_siren','Bubble Siren',['caster','pulse','#80d0c0,#2a6a6a,#e0fff8,#ffffff','crown'],'',
 'Mermaid-like siren on a floating bubble.','Floats.','Song: pulls you toward her; bubbles trap you.','Bubble shield.','Plug your ears: an item or spell negates the pull.');
MON(2,'tow','',3,'lily_oracle','Lily Oracle',['plant','cast','#3a8a6a,#1a4a3a,#ffd27a,#ffffff','flower'],'',
 'A giant glowing lily with a face in its bloom.','Stationary.','Marks tiles that will be struck 2 s later (in a pattern).','Only hittable after each strike.','Learn the pattern and it is easy.');
MON(2,'tow','',3,'mire_shaman','Mire Shaman',['caster','summon','#6a5a3a,#3a2a18,#80c060,#ffe040','mask,staff'],'',
 'Masked lizard shaman in reed robes.','Runs between totems.','Places totems: slow totem, heal totem, spit totem.','Weak alone.','Totems first!');
MON(2,'tow','',4,'coral_enchantress','Coral Enchantress',['caster','cast','#f0a0a0,#8a3a4a,#ffc0c0,#ffffff','crown,staff'],'',
 'Coral-crowned sorceress.','Glides.','Grows coral walls that reshape the room.','Walls block her own spells too.','Trap her behind her own walls.');
MON(2,'tow','',3,'water_elemental','Water Elemental',['blob','slam','#60a0e0,#2a5a9a,#c0e8ff,#ffffff',''],'',
 'A walking wave with a glowing core.','Flows toward you.','Crashing wave slam with knockback.','Splits into puddles when hit; they reform.','Freeze it (ice) and it shatters.');
MON(2,'tow','',4,'frost_lotus','Frost-lotus Priestess',['caster','cast','#e0f0ff,#6a8ab0,#a0e0ff,#ffffff','hood,staff'],'',
 'Priestess with a frozen lotus on her staff.','Glides over ice.','Freezes water into slippery ice; ice lances.','Ice shield.','Fire melts her ice floor under her.');
MON(2,'tow','',4,'kelp_wraith','Kelp Wraith',['wraith','summon','#3a6a4a,#1a3a28,#80ffa0,#ffffff',''],'',
 'Ghost wrapped in dripping kelp.','Drifts.','Kelp tentacles grab you from the floor.','Intangible while tentacles are out.','Cut 3 tentacles to make it solid.');
MON(2,'tow','',2,'rune_eels','Rune Eel Familiars',['eel','spin','#4a8aa0,#1a4a5a,#7fe8ff,#ffffff',''],'pack',
 'Two little glowing eels orbiting a caster.','Orbit their master.','Shield their master; zap you when close.','Weak.','Kill them first to expose the caster.');
MON(2,'tow','',3,'glass_jelly','Glass Jellyfish',['wisp','pulse','#c0e8ff,#6a9ac0,#a0f0ff,#ffffff',''],'pack',
 'Floating see-through jellyfish.','Drift in slow currents.','Electric pulse ring.','Passive until touched.','Chain lightning between jellies.');
MON(2,'tow','',4,'plague_alchemist','Plague Alchemist',['caster','lob','#3a3a3a,#1a1a1a,#80ff60,#ffe040','hood,plague'],'',
 'Beak-masked alchemist with a belt of potions.','Keeps distance.','Throws random potions: poison, slow, fire or… heal (you).','Drinks a shield potion at half HP.','Risky loot: random potions.');
MON(2,'tow','',4,'storm_heron','Storm Heron Spirit',['bird','dive','#d0e0ff,#5a6a9a,#ffff80,#ffffff','talons'],'',
 'Spectral heron crackling with lightning.','Circles.','Dive-bombs trailing lightning.','Intangible except when diving.','Summoned in pairs by tower mages.');
MON(2,'tow','',5,'bell_ringer','Drowned Bell-ringer',['wraith','pulse','#8aa0a0,#3a4a50,#e8c040,#ffffff','chains'],'',
 'Ghost of a drowned priest with a huge bell.','Stays in the belfry.','Each toll damages everyone not behind cover.','Invulnerable while ringing.','Hit the bell (not him) to crack it.');
