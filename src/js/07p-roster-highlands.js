// ═══ SW HIGHLANDS — "Stone, wind & starlight" ═════════════════════════
// Level 10–15. Adds knockback, shields, terrain changes, height, ice.
// ── Mainland ──
MON(3,'main','',3,'mesa_golem','Mesa Golem',['golem','slam','#a88a6a,#6a5a48,#ffb060,#ffd080','moss'],'T:runic mesas, boulder fields',
 'Sandstone golem that sleeps as a boulder.',
 'Looks like a boulder until you get within 4 tiles (existing Stone Golem).',
 'Stomp shockwave (existing): jump or dodge-roll through it.',
 'Stone skin: arrows do half damage.',
 'Its glowing core is a weak spot after each stomp.','stone_golem');
MON(3,'main','',3,'cliff_harpy','Cliff Harpy',['bird','dive','#b88a6a,#6a4a3a,#e8c040,#ff3030','harpy,talons'],'pack|T:cliffs, ridges',
 'Wild-haired harpy with bronze feathers.',
 'Orbits above you (existing).',
 'Feather scatter (existing) + a dive-grab that lifts and drops you (knockback).',
 'Takes double damage from arrows mid-dive.',
 'Drops you off ledges onto lower ground if you let it.','harpy');
MON(3,'main','',2,'crag_ram','Crag Ram',['quad','lunge','#d8d0c0,#6a6058,#c8b088,#ffb020','horns,mane'],'T:herder terraces, slopes',
 'Shaggy white ram with huge curled horns.',
 'Stamps twice, then charges.',
 'Charge with long knockback — can knock you off a terrace to the level below.',
 'Horns block frontal hits during the charge.',
 'Stand with your back to a wall and it knocks itself out.');
MON(3,'main','',3,'frost_wolf','Frost Wolf',['quad','breath','#d8e8f0,#6a8aa0,#a0e0ff,#40c0ff','ears,mane,tail'],'pack|night|T:glacier peaks, snow',
 'Blue-grey wolf with icicles in its fur.',
 'Pack of 3 + alpha; circles and flanks.',
 'Frost breath: slows 40% for 2 s; bites.',
 'Thick fur: -30% physical damage.',
 'The alpha\'s howl calls a blizzard (vision down).');
MON(3,'main','',3,'geode_crab','Geode Crab',['crab','shoot','#6a6a7a,#3a3a48,#c080ff,#ffffff','crystals'],'T:geode canyons',
 'Grey crab with a purple crystal geode for a back.',
 'Sidesteps, keeps its back to you.',
 'Fires crystal shards from its back.',
 'Crystals reflect your projectiles unless you hit its soft front.',
 'Break a crystal to get gems.');
MON(3,'main','',4,'gale_roc','Gale Roc',['bird','pulse','#8a7a6a,#4a3a2a,#f4f8ff,#ffe040','talons'],'T:wind-harp ridges, peaks',
 'Huge eagle with wind-streamers on its wings.',
 'Soars; lands on peaks.',
 'Wing gust that pushes you 4 tiles; carries and drops rocks.',
 'Gusts blow away your arrows.',
 'Fight it with your back to a wall.');
MON(3,'main','',2,'rockslide_beetle','Rockslide Beetle',['insect','spin','#8a8478,#4a4640,#c8b088,#ff4040','antennae'],'T:slopes, cliff bases',
 'Armadillo-beetle with a stone shell.',
 'Curls into a ball and rolls downhill.',
 'Rolling ram; bounces off rocks unpredictably.',
 'Invulnerable while rolling.',
 'Dizzy for 2 s after crashing.');
MON(3,'main','',4,'yeti_stomper','Yeti Stomper',['brute','slam','#f0f4f8,#9aa8b8,#a0e0ff,#40a0ff','horns'],'T:glacier peaks',
 'Towering white yeti with blue horns.',
 'Slow stomp; throws snowballs.',
 'Snowballs grow as they roll; stomp freezes the ground (you slide).',
 'Thick fur; fire does double.',
 'Sliding on its ice sends you into its arms.');
MON(3,'main','',4,'chess_knight','Chess Knight',['chesspiece','lunge','#2a2a30,#101014,#e8c040,#ff3030',''],'T:giant\'s chessboard',
 'Giant black stone knight chess piece with a glowing eye.',
 'Moves only in L-shaped jumps, square by square.',
 'Lands on you = crushing damage.',
 'Invulnerable while jumping.',
 'Stand where no L-jump can reach you — chess knowledge pays off.');
MON(3,'main','',4,'chess_rook','Chess Rook',['chesspiece','slam','#e8e4d8,#8a8478,#e8c040,#ff3030','rook'],'T:giant\'s chessboard',
 'Giant white rook with glowing slits.',
 'Slides in straight lines until it hits something.',
 'Crushes whatever it slides into.',
 'Stunned 3 s after hitting a wall.',
 'Pairs with the Chess Knight as a "chess set".');
MON(3,'main','',3,'starfall_shard','Starfall Shard',['wisp','dive','#fff8d0,#c8b070,#9fe8ff,#303010',''],'night|T:starfall crater',
 'A falling-star fragment, blazing cyan-white.',
 'Streaks in straight lines at night.',
 'Ram; explodes on death (knockback).',
 'Very fast, fragile.',
 'Drops star-metal used by the craftsmen.');
MON(3,'main','',3,'automaton_miner','Dwarven Automaton',['construct','burrow','#b87a40,#5a3a20,#ffd070,#80ffff','drill,rivets,vents'],'T:dwarven stairs, mine entrances',
 'Old dwarven mining machine, still running.',
 'Drills through rock walls to reach you.',
 'Drill arm combo.',
 'Heavy armor; weak vents on its back.',
 'Drops ore; sometimes opens new shortcuts by drilling.');
MON(3,'main','',3,'snow_owl','Night Watcher Owl',['bird','dive','#f0f0f0,#8a8a8a,#ffe040,#101010','talons'],'night|T:petrified forest, peaks',
 'Silent snowy owl with enormous eyes.',
 'Perches; silent swoop.',
 'Talon swoop.',
 'Hoots when it sees you: nearby monsters come.',
 'Kill it before it hoots — or sneak past.');
MON(3,'main','',4,'harp_spectre','Wind-harp Spectre',['wraith','pulse','#d8e0ff,#6a70a0,#fff0a0,#ffffff',''],'T:wind-harp ridges',
 'Ghostly bard with a spectral harp.',
 'Floats between the great wind-harps.',
 'Plays notes: waves of sound projectiles, stronger when the wind blows.',
 'Only visible while playing.',
 'Silence the wind-harp next to it to weaken it.');
MON(3,'main','',4,'ridge_troll','Ridge Troll',['brute','lob','#7a8a7a,#4a5a4a,#8a8478,#ffe040','tusks,moss'],'night|T:ridges, mesas',
 'Grey mountain troll with lichen and a big nose.',
 'Active only at night.',
 'Boulder throw, club slam.',
 'Regenerates; at dawn it turns to stone.',
 'Survive until sunrise and it becomes a statue (with loot).');
MON(3,'main','',2,'craglings','Craglings',['small','slam','#8a8478,#4a4640,#ffb060,#ffd080','spikes'],'pack|T:boulder fields',
 'Pebble-imps with glowing cracks.',
 'Run in groups of 4–6.',
 'Headbutts.',
 'Tiny.',
 'Four or more touching merge into a Rock Golem.');
MON(3,'main','',5,'glacier_wyrm','Glacier Wyrm',['serpent','burrow','#c0e8ff,#5a8ab0,#e0f8ff,#40a0ff','spikes'],'T:glacier peaks',
 'Long ice-blue serpent that swims through ice.',
 'Tunnels under ice and snow.',
 'Surfaces with a line of ice spikes, then bites.',
 'Only hittable when surfaced.',
 'Fire melts the ice it swims in.');
MON(3,'main','',4,'bristleback_bear','Bristleback Bear',['quad','slam','#6a4a30,#3a2818,#c8a070,#ff3030','ears,spikes'],'T:petrified forest, herder terraces',
 'Huge brown bear with stone-like spikes on its back.',
 'Walks, then rears up.',
 'Double-paw slam.',
 'Enrages at half HP (faster, stronger).',
 'Honey or fish items distract it.');
MON(3,'main','',3,'mesa_scorpion','Mesa Scorpion',['insect','lunge','#c09060,#6a4a30,#ffb040,#101010','stinger,mandibles'],'T:runic mesas, sand',
 'Sand-coloured scorpion the size of a cart.',
 'Burrows in sand, surfaces behind you.',
 'Pinch-hold, then tail stab poison.',
 'Hard carapace; soft underside when it rears.',
 'Pinch hold can be broken by a dodge roll.');
MON(3,'main','',5,'glass_wyvern','Glass-winged Wyvern',['drake','breath','#8ab0c0,#3a5a6a,#e0f8ff,#ffe040',''],'T:geode canyons, starfall crater',
 'Young wyvern whose wings are crystal membranes.',
 'Hovers; lands to breathe.',
 'Sonic screech (stun 0.5 s) + crystal breath.',
 'Crystal wings reflect light-based spells.',
 'Rare; its scales are top crafting material.');

// ── Dungeon ──
MON(3,'dun','melee',3,'dwarf_axeman','Dwarf Revenant Axeman',['biped','spin','#8a9aa0,#4a5058,#c8ccd4,#80ffff','helmet,axe,armor'],'',
 'Ghostly dwarf with a two-handed axe.','Steady; charges when far.','Whirlwind axe spin.','Armor.','Dizzy after spinning 3 times.');
MON(3,'dun','melee',3,'crystal_golemling','Crystal Golemling',['golem','slam','#a080d0,#5a4080,#e0c0ff,#ffffff','crystals'],'',
 'Small golem of purple crystal.','Waddles.','Slam; shards fly off when hit.','Shards spike you if you stand close.','Blunt damage shatters it fast.');
MON(3,'dun','melee',2,'deep_mole','Deep Mole Brute',['brute','burrow','#5a4a40,#2a2018,#ff8080,#101010','tusks'],'',
 'Giant mole with drill claws.','Tunnels.','Claw combo when it surfaces.','Underground = immune.','Lures you over thin floors that collapse.');
MON(3,'dun','melee',3,'frost_ghoul','Frost Ghoul',['biped','lunge','#c0d8e8,#5a7088,#a0e0ff,#40c0ff','skull'],'pack',
 'Frozen corpse with icicle claws.','Fast shamble.','3 hits in a row freeze you for 1 s.','Fire x2.','Comes in pairs.');
MON(3,'dun','melee',3,'gargoyle_sentry','Stone Gargoyle',['bird','dive','#7a7a80,#3a3a40,#ff6060,#ff3030','stone,talons'],'',
 'Classic gargoyle statue.','Statue until you are close.','Knockback swoop.','Stone form = invulnerable.','Hit it while it swoops.');
MON(3,'dun','melee',4,'cave_troll','Cave Troll',['brute','slam','#6a7a70,#3a4a40,#8a8478,#ffe040','club,tusks'],'',
 'Huge grey troll with a stalactite club.','Lumbers.','Club sweep; grabs and throws you.','Tough.','Throws you into other monsters (damages them too).');
MON(3,'dun','melee',4,'labyrinth_bull','Labyrinth Bull',['brute','lunge','#6a4a3a,#3a2818,#c8b088,#ff2020','horns'],'',
 'Minotaur with a broken horn.','Paces, then charges down corridors.','Horn charge.','Gets stuck in walls for 3 s when it misses.','Use corridors to make it miss.');
MON(3,'dun','melee',3,'crystal_spider','Crystal Spider',['spider','spit','#c0e0ff,#5a7090,#a0e0ff,#ff4080','crystals'],'',
 'Glassy spider with a crystal abdomen.','Wall-crawls.','Web shot (slow) + bite.','Fragile but fast.','Webs across doorways — burn them.');
MON(3,'dun','melee',4,'shieldwall_dwarves','Shield-wall Dwarves',['biped','lunge','#9aa8b0,#4a5058,#e8c040,#80ffff','helmet,shield,spear'],'pack',
 'Two ghost dwarves locked shield to shield.','Advance together.','Spear pokes over the shields.','Front is impenetrable.','Split them up (lure one) to get around.');
MON(3,'dun','melee',2,'rock_hopper','Rock Hopper',['small','slam','#8a8478,#4a4640,#ffb060,#ffd080','spikes'],'pack',
 'Hopping rock imps.','Bounce off walls.','Bounce-slam.','Low HP.','Bounces get faster each wall hit.');
MON(3,'dun','ranged',3,'iron_sentinel','Iron Sentinel',['construct','shoot','#8a8e96,#3a3e46,#7fe8ff,#7fe8ff','rivets'],'',
 'Rune-plated iron guardian (existing).','Slow walk.','Scatter bolts (existing).','Heavy armor.','Rune plates can be knocked off for weak spots.','iron_sentinel');
MON(3,'dun','ranged',3,'dwarf_crossbow','Ghost Crossbowman',['biped','shoot','#9aa8b0,#4a5058,#c8a060,#80ffff','helmet,bow'],'',
 'Ghost dwarf with a heavy crossbow.','Holds a chokepoint.','Piercing bolts through several targets.','Reload pause of 2 s.','Rush it during the reload.');
MON(3,'dun','ranged',3,'geode_spitter','Geode Spitter',['plant','spit','#6a6a7a,#3a3a48,#c080ff,#ffffff','bulb'],'',
 'A cracked geode that opens like a mouth.','Stationary.','Shoots crystal shards that stick in the floor and explode later.','Closed = invulnerable.','Hit it while it is open.');
MON(3,'dun','ranged',2,'icicle_bats','Icicle Bats',['bat','lob','#c0d8e8,#5a7088,#a0e0ff,#40c0ff','crystals'],'pack',
 'Pale bats hanging from the ceiling.','Flock.','Drop icicles (shadow warning).','Fragile.','A flock of 5.');
MON(3,'dun','ranged',4,'minecart_bomber','Minecart Bomber',['biped','lob','#6fa040,#5a4028,#ff6040,#ff3030','ears,helmet'],'',
 'Goblin sapper riding a minecart.','Zooms along rails.','Throws dynamite.','Hard to catch.','Switch the rails to send it crashing.');
MON(3,'dun','ranged',3,'echo_bat','Echo Bat',['bat','pulse','#6a5a7a,#3a2a4a,#ff80ff,#ffff80',''],'',
 'Big-eared purple bat.','Hangs, then circles.','Sonar pulse: marks you — marked targets take +25% damage.','Fragile.','Break line of sight to lose the mark.');
MON(3,'dun','ranged',3,'boulder_goblin','Boulder Roller Goblin',['biped','spin','#6fa040,#5a4028,#8a8478,#ff3030','ears'],'',
 'Goblin at the top of a sloped corridor.','Stays up top.','Rolls boulders down the corridor.','Weak.','Side alcoves are safe.');
MON(3,'dun','ranged',3,'frost_archer','Frost Archer',['biped','shoot','#c0d8e8,#5a7088,#a0e0ff,#40c0ff','hood,bow'],'',
 'Ice-elf archer.','Kites.','Arrows slow and leave frozen trails.','Evasive.','Fire arrows cancel the frost.');
MON(3,'dun','ranged',2,'lantern_kobold','Oil Kobold',['biped','lob','#c07040,#5a3a20,#ffb040,#ffe040','ears,tail,lantern'],'',
 'Kobold with oil flasks.','Keeps range.','Throws oil (slick), then a lantern (fire).','Weak.','Oil slicks burn monsters too.');
MON(3,'dun','ranged',4,'prism_eye','Prism Eye',['eye','beam','#e0e0ff,#6a6aa0,#ff80ff,#ffffff','crystals'],'',
 'Floating eye inside a crystal ring.','Hovers.','Beam that refracts off crystal pillars into 2–3 beams.','Only hittable when blinking.','Break the pillars to simplify the beams.');

// ── Tower ──
MON(3,'tow','',3,'storm_mage','Storm Mage',['caster','shoot','#c8d0e8,#3a4a8a,#ffff80,#80c0ff','hat,staff'],'',
 'Blue-robed mage with crackling staff (existing).','Strafes (existing).','Chain lightning (existing).','Static shield when cornered.','Lightning jumps between metal objects.','storm_mage');
MON(3,'tow','',4,'astronomer_lich','Astronomer Lich',['caster','cast','#e8e0cc,#2a2a5a,#9fe8ff,#9fe8ff','hood,beard,staff,runes'],'',
 'Skeletal astronomer with a star-map cloak.','Floats near telescopes.','Calls small meteors onto marked constellation tiles.','Bone shield that regrows.','Step on the constellation\'s centre star to cancel it.');
MON(3,'tow','',3,'frost_cantor','Frost Cantor',['caster','beam','#e0f0ff,#5a7aa0,#a0e0ff,#ffffff','hood,book'],'',
 'Choir-monk singing ice into being.','Paces.','Freeze ray + ice walls.','Ice armor.','Fire melts walls and armor.');
MON(3,'tow','',4,'gravity_adept','Gravity Adept',['caster','pulse','#c0a0e0,#4a2a6a,#e0a8ff,#ffffff','hood,runes'],'',
 'Monk floating cross-legged with orbiting stones.','Hovers.','Gravity well: pulls you and loose objects together.','Orbiting stones block shots.','Items pulled in hit him too.');
MON(3,'tow','',3,'cloud_sylph','Cloud Sylph',['wraith','pulse','#f0f4ff,#9aa8c0,#ffffff,#3080ff',''],'',
 'A cloud with a playful face.','Drifts.','Rain (slow) and small lightning strikes.','Intangible as a cloud.','Solid only when it condenses to attack.');
MON(3,'tow','',5,'chessmaster','Chessmaster Wraith',['wraith','cast','#2a2a30,#101014,#e8c040,#e8c040','crown'],'',
 'Crowned wraith holding a king piece.','Stays on the back row.','Commands chess pieces; "check" forces you 1 tile in a direction.','Protected while pieces live.','Knock over its king piece to end the game.');
MON(3,'tow','',3,'crystal_resonator','Crystal Resonator',['orb','pulse','#c080ff,#4a2a6a,#e0c0ff,#ffffff',''],'',
 'Humming crystal tuning fork on a pedestal.','Stationary.','Resonance: all crystals in the room shatter into shards.','Invulnerable until the crystals are gone.','Break crystals yourself first, safely.');
MON(3,'tow','',4,'wind_monk','Wind Monk',['biped','lunge','#e8d8b8,#c86a3a,#f4f8ff,#101010','hood'],'',
 'Barefoot monk in orange robes.','Dashes and dodges.','Air-palm: knockback into walls.','Dodges your first attack each round.','Counters if you attack twice in a row.');
MON(3,'tow','',4,'aurora_spirit','Aurora Spirit',['wraith','beam','#a0ffd0,#3a8a6a,#c080ff,#ffffff',''],'night',
 'Spirit of ribbons of green and violet light.','Weaves across the room.','Light ribbons form damaging lanes.','Hittable only where ribbons cross.','Stronger at night.');
MON(3,'tow','',4,'orrery','Clockwork Orrery',['orb','spin','#c8a060,#6a4a30,#ffd070,#ffffff',''],'',
 'Brass planetary model come alive.','Stationary; planets orbit.','Orbiting planets sweep the room.','Core protected by the planets.','Hit planets to stop them one by one.');
MON(3,'tow','',3,'stone_druid','Stone-speaker Druid',['caster','summon','#a88a6a,#5a4a38,#80c060,#ffe040','beard,staff'],'',
 'Old druid with a stone-headed staff.','Slow.','Raises pillars under you (launches you).','Pillar shield.','Pillars stay: use them as cover.');
MON(3,'tow','',4,'blizzard_witch','Blizzard Witch',['caster','cast','#e0f0ff,#3a5a8a,#a0e0ff,#ffffff','hat'],'',
 'Witch in a snowflake-lace hat.','Glides.','Snow veil (vision down) + ice clones.','Clones explode into slow.','Warmth (fire) clears the veil.');
MON(3,'tow','',3,'echo_sage','Echo Sage',['caster','cast','#d8c8a8,#6a5a48,#ffe0a0,#ffffff','beard,book'],'',
 'Ancient sage whose words echo.','Stands still.','Every spell repeats once, 1 s later.','Weak up close.','Dodge twice.');
MON(3,'tow','',4,'seraph','Cloister Seraph',['caster','beam','#fff8e0,#e8e4dc,#ffe080,#80c0ff','wings,crown,staff'],'',
 'Winged guardian of the sky cloister.','Hovers high.','Holy beams from above.','Bubble shield when hit 3 times quickly.','Wait out the bubble.');
MON(3,'tow','',4,'rune_statue','Rune Sentinel Statue',['golem','lunge','#8a8e96,#3a3e46,#7fe8ff,#7fe8ff','moss'],'',
 'Stone statue with a covered face.','Only moves when you are not looking at it.','Grabs you from behind.','Invulnerable while watched.','Mirrors let you watch two at once.');
MON(3,'tow','',3,'telescope_eye','Telescope Eye',['eye','beam','#c8a060,#6a4a30,#ffd070,#ffffff',''],'',
 'A brass telescope with a real eye in the lens.','Stationary; tracks you slowly.','Long-range laser.','Only the lens is weak.','Keep moving sideways — it tracks too slowly.');
MON(3,'tow','',2,'hailstone_imp','Hailstone Imp',['biped','lob','#c0d8e8,#5a7088,#ffffff,#40c0ff','ears,horns'],'pack',
 'Tiny icy imp with a bag of hail.','Hops about.','Throws bouncing hailstones.','Fragile.','Groups of 3.');
MON(3,'tow','',4,'spellblade','Frostbound Spellblade',['biped','lunge','#a0c0e0,#3a5a7a,#a0e0ff,#40c0ff','helmet,sword,armor'],'',
 'Knight with a frost-runed blade.','Advances.','Alternates sword combos and ice bolts.','Parries physical hits.','Magic breaks his guard.');
MON(3,'tow','',4,'thunderbird','Thunderbird',['bird','dive','#e0d080,#6a5a28,#ffff80,#ffffff','talons'],'',
 'Crackling golden bird of storms.','Summoned by storm casters.','Lightning dive-bomb.','Fast.','Kill the summoner to banish it.');
MON(3,'tow','',5,'void_scholar','Void Scholar',['caster','blink','#3a2a5a,#1a102a,#c080ff,#ffffff','hood,book,runes'],'',
 'Scholar whose robe is a starry void.','Opens paired portals.','Sends his spells (and yours) through portals.','Blinks between portals.','Shoot through a portal to hit him from behind.');
