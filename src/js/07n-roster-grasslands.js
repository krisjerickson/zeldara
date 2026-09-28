// ═══ NE GRASSLANDS — "Fae meadows & old stones" ═══════════════════════
// Level 1–5. One clear mechanic each: learn to dodge, flank, time a block.
// ── Mainland (20 candidates → pick 10) ──
MON(1,'main','',1,'meadow_goblin','Meadow Goblin',['biped','lunge','#6fa040,#5a4028,#c8a060,#ff3030','ears,dagger'],'pack|T:roads, fields',
 'Scrawny green goblin in a patched leather vest with a rusty knife.',
 'Darts in, stabs, darts back out (pulse). Moves in packs of 3.',
 'Quick knife jab; the pack takes turns so one is always closing in.',
 'Flees at low HP to fetch friends.',
 'If one escapes it returns 20 s later with 2 more goblins.','goblin');
MON(1,'main','',1,'thistle_hog','Thistle Hog',['quad','lunge','#8a6a4a,#4a3424,#c8b070,#ff4020','tusks,spikes,tail'],'T:meadows, crop strips',
 'Stocky boar whose back bristles with purple thistle spines.',
 'Paws the ground for 1 s, then charges in a straight line and cannot turn.',
 'Charge hits for heavy damage and knockback.',
 'Spines: melee hits from above/behind prick you for 1 damage.',
 'Hits a wall, rock or tree on a miss → stunned 2 s (bait it into obstacles).');
MON(1,'main','',1,'puffcap','Puffcap',['plant','pulse','#e8dcc0,#6a5a40,#d86aa0,#301020','mushcap,spores'],'T:fairy rings, forest edges',
 'Waddling toadstool with a pink spotted cap and sleepy eyes.',
 'Hides as a normal mushroom; hops slowly after you once woken.',
 'Puffs a spore cloud (2-tile radius) that slows you 40% for 2 s.',
 'Ducks under its cap after 2 quick hits (0.8 s invulnerable).',
 'Spore clouds make other monsters inside them sneeze and miss their next attack.');
MON(1,'main','',2,'hedge_sprite','Hedge Sprite',['wisp','dive','#b8f0a0,#4a8a3a,#80ff80,#203010','wings'],'T:hedges, bushes, blossom terraces',
 'Thumb-sized leafy fae with dragonfly wings and a mischievous grin.',
 'Flits erratically, never flies in a straight line for more than 1 s.',
 'Dive-pinch for 1 damage — and steals 5–15 gold.',
 'Tiny hitbox; dodges the first arrow shot at it.',
 'Thief: flies off with your gold; catch it within 15 s to get double back.');
MON(1,'main','',2,'tunnel_nipper','Tunnel Nipper',['small','burrow','#a88a6a,#5a4030,#e8c0a0,#101010','ears,tail'],'pack|T:soft ground, meadows',
 'Pink-nosed mole-rat with oversized front teeth.',
 'Travels underground; only a moving dirt ridge shows where it is.',
 'Pops up under you with a bite, then stays above ground for 1.5 s.',
 'Immune while underground.',
 'Pops up next to buried treasure sometimes — follow the ridge when it is alone.');
MON(1,'main','',2,'scarecrow_warden','Scarecrow Warden',['biped','shoot','#c8a060,#7a5a3a,#3a3a4a,#ffb020','hat,stilts'],'night|T:windmill hills, crop strips',
 'Straw scarecrow on a pole, stitched grin, glowing pumpkin-orange eyes.',
 'Stands still like decoration until you pass, then hops after you on its pole.',
 'Throws 3 crows that home in weakly and peck.',
 'Fire damage x2; arrows pass through the straw (half damage).',
 'Only animates at night — in daytime it is a harmless prop you can loot.');
MON(1,'main','',2,'bumble_knight','Bumble Knight',['insect','dive','#f0c030,#3a2a18,#fff0a0,#101010','wings,stripes,stinger,antennae'],'pack|T:blossom terraces, flowers',
 'Fat fuzzy bumblebee the size of a dog, with a tiny acorn helmet.',
 'Flies in lazy figure-8 loops around its flower patch.',
 'Dive-sting with a short knockback; leaves its stinger and slows down.',
 'After stinging it cannot attack again for 4 s.',
 'Guards a hive prop: breaking the hive frees 3 small bees but drops honey (heals).');
MON(1,'main','',2,'dustwing_moth','Dustwing Moth',['bat','pulse','#d8d0b8,#8a8070,#e8e0ff,#303060','crystals'],'night|T:near lamps, waystones, lanterns',
 'Pale moth with owl-eye patterns on its wings.',
 'Drawn to light: circles waystones, lanterns and you at night.',
 'Wing-dust burst that shrinks your light radius for 5 s.',
 'Weak but flutters out of reach every few seconds.',
 'Several moths around you make the night overlay much darker.');
MON(1,'main','',3,'runestone_crawler','Runestone Crawler',['golem','beam','#8a8578,#5a564e,#7fe8ff,#7fe8ff','moss'],'T:standing stones, stone circles',
 'A mossy standing stone on stubby legs with a single cyan rune.',
 'Disguised as a standing stone; crawls slowly when you are within 3 tiles.',
 'Fires a telegraphed straight ley beam (1 s warning line).',
 'Only takes damage while its rune glows (during and just after the beam).',
 'Standing on a ley line makes its beam twice as long.');
MON(1,'main','',1,'jackalope','Jackalope',['small','lunge','#b89a70,#6a5038,#e8dcc0,#101010','ears,antlers'],'T:open meadows',
 'Hare with little antlers, twitchy nose.',
 'Very fast zig-zag hops; stops dead, then bolts.',
 'Head-butt that knocks you back 2 tiles.',
 'Hard to hit; stops moving for 0.5 s right after each head-butt.',
 'Runs away at low HP; catching it drops a lucky antler (small crit bonus).');
MON(1,'main','',3,'kite_rider','Goblin Kite-Rider',['bird','lob','#c8a060,#6a4a30,#ff7a6a,#ff3030','harpy'],'T:windmill hills, ridges',
 'Goblin clinging to a glyph-painted kite, cackling.',
 'Circles high above; only its shadow shows on the ground.',
 'Drops pebbles from above — the landing spot is marked by a shrinking circle.',
 'Untargetable in the air; lands after 3 drops (or if you cut the kite string).',
 'Land-and-fight: once down it is a weak goblin with a hurt ego.');
MON(1,'main','',3,'bramble_wolf','Bramble Wolf',['quad','lunge','#5a6a4a,#2a3424,#a0c060,#ffe040','ears,mane,tail'],'pack|night|T:forest edges, bones',
 'Wolf whose fur is tangled brambles and thorns.',
 'Pack of 3 + alpha: circles, then two flank while one feints.',
 'Bite; the alpha\'s howl gives the pack +30% speed for 4 s.',
 'Thorn coat reflects 1 damage on melee hits.',
 'Kill the alpha first and the others scatter.');
MON(1,'main','',3,'barrow_skeleton','Barrow Skeleton',['biped','shoot','#e8e0cc,#8a8070,#c8a060,#ff3030','skull,bow'],'night|T:giant bones, amphitheatre',
 'Moss-stained skeleton archer in a rotted cloak.',
 'Keeps its distance, steps sideways to line up shots.',
 'Arrow volley (reuses the Skeleton\'s arrow attack).',
 'Falls into a bone pile on death…',
 '…and reassembles after 5 s unless you step on the pile.','skeleton');
MON(1,'main','',1,'clover_slime','Clover Slime',['blob','slam','#7ac050,#3a7030,#ffffff,#102010','clover'],'T:everywhere green',
 'Bouncy green slime with a four-leaf clover floating inside.',
 'Hops toward you in slow arcs.',
 'Body-slam on landing.',
 'Splits into 2 small slimes when hit by a heavy attack.',
 'The clover drops as a charm: +5% gold find for the rest of the day.');
MON(1,'main','',3,'harvest_mantis','Harvest Mantis',['insect','lunge','#8ac060,#4a7030,#e8f0a0,#ff4040','scythes,antennae'],'T:crystal tallgrass, crop fields',
 'Tall green mantis with sickle arms, hides in tall grass.',
 'Motionless in tall grass; you only see its eyes glint.',
 'Double scythe lunge with long reach.',
 'Parry window: blocking just before the lunge stuns it for 2 s.',
 'Teaches the block timing that towers later demand.');
MON(1,'main','',4,'pooka','Pooka',['quad','blink','#3a3a44,#1a1a20,#ffd040,#ffd040','ears,mane,tail'],'night|T:fairy rings',
 'Looks like a black rabbit… until it becomes a shaggy black goblin-horse.',
 'Blinks between fairy rings.',
 'Kick combo; sometimes swaps places with you.',
 'Can\'t be hit while blinking.',
 'Trickster: stand inside a fairy ring and it can\'t blink — it has to fight fair.');
MON(1,'main','',3,'hill_gnoll','Hill Gnoll',['brute','lob','#b09060,#5a4028,#8a8478,#ff3030','tusks'],'T:ridges, slopes',
 'Hyena-faced gnoll with a sack of rocks.',
 'Retreats uphill and keeps range.',
 'Lobs boulders in arcs (landing circle shown).',
 'Boulders stay as obstacles for 10 s — use them as cover.',
 'Laughs when it misses; the laugh calls nearby gnolls.');
MON(1,'main','',4,'echo_phantom','Echo Phantom',['wraith','pulse','#c8d0e8,#6a7088,#9fe8ff,#ffffff',''],'night|T:amphitheatre ruins',
 'See-through actor\'s ghost wearing a cracked theatre mask.',
 'Drifts; always keeps the distance of your last attack.',
 'Echo: repeats the last attack you used back at you, 1.5 s later.',
 'Immune to the attack type you just used.',
 'Vary your attacks — spam one move and it becomes a mirror.');
MON(1,'main','',4,'floatrock_gargoyle','Floatrock Gargoyle',['bird','dive','#8a8478,#5a564e,#9ff0ff,#9ff0ff','stone,talons'],'T:floating-rock meadow',
 'Stone gargoyle perched on the floating islands.',
 'Stone and invulnerable while perched; swoops when you pass under.',
 'Swoop claw, then climbs back up.',
 'Flesh (hittable) for 3 s after each swoop.',
 'Two perched on the same rock swoop one after the other.');
MON(1,'main','',2,'dung_roller','Dung Roller Beetle',['insect','lunge','#3a4a6a,#1a2030,#8a6a4a,#ff4040','ball,antennae'],'T:meadows, herder paths',
 'Shiny blue beetle pushing a big ball of mud.',
 'Rolls the ball at you; the ball bounces off rocks.',
 'Ball hit: knockback + dirt (slow 1 s).',
 'Hide behind the ball — it can\'t see through it.',
 'Break the ball and the beetle panics and runs.');

// ── Dungeon (10 melee + 10 ranged → pick 5 + 5) ──
MON(1,'dun','melee',1,'goblin_cutthroat','Goblin Cutthroat',['biped','lunge','#5a8a3a,#2a2a30,#c8c8d0,#ff3030','ears,hood,dagger'],'',
 'Hooded goblin with two daggers.','Circles to get behind you.','Backstab: x2 damage from behind.','Dodge-rolls away after each stab.','Quiet — no footstep sound until it attacks.');
MON(1,'dun','melee',1,'tunnel_brute','Goblin Tunnel Brute',['brute','spin','#6a9a40,#4a3424,#a0a0a8,#ff3030','tusks'],'',
 'Big goblin with a miner\'s shovel and a lamp helmet.','Slow; digs through loose dirt walls.','180° shovel sweep with knockback.','Front armor: hit it from the side.','Knocks you into walls for extra damage.');
MON(1,'dun','melee',2,'root_gnasher','Root Gnasher',['plant','burrow','#6a4a30,#3a2a18,#a0c060,#ff6030','bulb,thorns'],'',
 'A snapping bulb on a tangle of roots.','Tunnels through root walls, surfaces next to you.','Snap bite that roots you 1 s.','Can only be hit above ground.','Cut roots on the walls to block its tunnels.');
MON(1,'dun','melee',2,'bone_hound','Bone Hound',['quad','lunge','#e8e0cc,#8a8070,#ff6040,#ff3030','tail'],'pack',
 'Skeletal dog with glowing ember eyes.','Fast; chains up to 3 bites.','Lunging bite chain.','Crumbles fast (low HP) but reassembles once.','Loves bones: throw a bone item to distract it.');
MON(1,'dun','melee',2,'shield_goblin','Shield Goblin',['biped','lunge','#6a9a40,#5a4028,#b08040,#ff3030','ears,shield,spear'],'',
 'Goblin behind a big wooden door-shield.','Advances slowly shield-first.','Spear poke from behind the shield.','Blocks all frontal damage and arrows.','Flank it or use a heavy hit to knock the shield aside.');
MON(1,'dun','melee',2,'capmaul','Capmaul',['brute','slam','#e8dcc0,#8a6a4a,#d86aa0,#301020','mushcap'],'',
 'Hulking mushroom man with a fist-sized cap.','Lumbers; jumps to close gaps.','Belly-flop slam leaving a spore puddle (slow).','Spore puddles heal other fungi.','Burning the puddles stops the healing.');
MON(1,'dun','melee',1,'rat_swarm','Rat Swarm',['swarm','lunge','#8a7a6a,#4a3a30,#ff8080,#ff3030','many'],'pack',
 'A squeaking carpet of rats.','Flows around obstacles, surrounds you.','Many tiny bites (damage over time while inside).','Each hit kills a few rats; the swarm shrinks.','Afraid of fire and light.');
MON(1,'dun','melee',3,'barrow_knight','Barrow Knight',['biped','lunge','#b8b0a0,#5a5a60,#c8a060,#80c0ff','skull,helmet,sword,shield'],'',
 'Armored skeleton knight with a notched greatsword.','Steady walk; never runs.','Telegraphed overhead strike.','Shield blocks the front; parry the overhead to stun.','Drops its shield at half HP and gets faster.');
MON(1,'dun','melee',3,'clay_golemling','Clay Golemling',['golem','lunge','#b87a50,#7a4a30,#ffd080,#ffd080',''],'',
 'Knee-high clay golem with a handprint on its chest.','Waddles toward you.','Grab: holds you until you mash to break free.','Soft: blunt hits deal double.','Two golemlings merge into a bigger one if they touch.');
MON(1,'dun','melee',1,'boarling','Rabid Boarling',['small','lunge','#8a6a4a,#4a3424,#fff4e0,#ff2020','tusks,tail'],'pack',
 'Foaming little boar.','Charges with speed that ramps up.','Tusk charge.','Stunned when hitting walls.','Comes in litters of 3–4.');
MON(1,'dun','ranged',1,'goblin_slinger','Goblin Slinger',['biped','shoot','#6fa040,#5a4028,#8a8478,#ff3030','ears,sling'],'',
 'Goblin with a leather sling.','Keeps 5 tiles away; runs when approached.','Sling stones.','Cowardly: stops shooting when you are close.','Sits on ledges you have to find a way up to.');
MON(1,'dun','ranged',1,'skeleton_archer','Skeleton Archer',['biped','shoot','#e8e0cc,#8a8070,#c8a060,#ff3030','skull,bow'],'',
 'Classic skeleton with a bow.','Holds position, sidesteps.','3-arrow volley (existing Skeleton attack).','Brittle: crumbles in 3 hits.','Rises again unless its skull is kicked away.','skeleton');
MON(1,'dun','ranged',2,'spore_spitter','Spore Spitter',['plant','spit','#a88ac0,#5a4a6a,#d0ff80,#301020','bulb'],'',
 'Purple pitcher plant rooted in the floor.','Stationary; turns to face you.','Lobs spore balls that leave a slowing cloud.','Closes its lid when you are adjacent.','Burn it or hit it from behind.');
MON(1,'dun','ranged',2,'blowgun_goblin','Blowgun Goblin',['biped','shoot','#6fa040,#5a4028,#80e0a0,#ff3030','ears,hood'],'',
 'Goblin peeking over a crate with a blowpipe.','Hides behind cover; peeks out to shoot.','Sleep dart: drowsy (-30% speed) for 3 s.','Only hittable while peeking.','Break its crate and it panics.');
MON(1,'dun','ranged',2,'glowworm','Glowworm Lurker',['serpent','spit','#e0f0a0,#6a7a40,#b0ff60,#101010',''],'',
 'Pale glowing worm hanging from the ceiling.','Clings to the ceiling; drops a glowing thread to aim.','Acid drip — the landing spot glows first.','Only reachable with ranged attacks or when it drops.','Its glow lights dark rooms.');
MON(1,'dun','ranged',3,'bone_ballista','Bone Ballista',['construct','beam','#e8e0cc,#6a5a40,#c8a060,#ff3030',''],'',
 'Skeleton crew manning a ballista made of ribs.','Stationary, slow turn.','Piercing bolt down a whole corridor (long telegraph).','Hit the crew, not the machine.','Its bolts break wooden barriers — lure it.');
MON(1,'dun','ranged',2,'trap_kobold','Trap-Setter Kobold',['biped','lob','#c07040,#5a3a20,#c8c8d0,#ffe040','ears,tail'],'',
 'Little lizard-dog in a tool belt.','Runs around placing snares.','Throws knives; snares root you 1.5 s.','Weak in melee.','Snares it placed stay after it dies — watch your step.');
MON(1,'dun','ranged',2,'hive_keeper','Hive Keeper',['biped','lob','#c8a060,#6a4a30,#f0c030,#301010','hood'],'',
 'Veiled beekeeper goblin carrying clay hives.','Keeps range.','Throws hives that burst into 3 angry bees.','Smoke (fire) calms the bees.','Drops honey (heals).');
MON(1,'dun','ranged',3,'shade_sniper','Shade Sniper Imp',['biped','beam','#3a3a50,#1a1a28,#ff4060,#ff4060','ears,horns'],'',
 'Shadowy imp, only its red eyes show.','Invisible until it fires.','Red aim-line for 1.5 s, then a heavy bolt.','Visible for 2 s after each shot.','Stand in light and it can\'t hide.');
MON(1,'dun','ranged',1,'pebble_sprite','Pebble Sprite',['wisp','shoot','#a8a090,#6a6458,#e8e0d0,#301010',''],'pack',
 'A grumpy pebble with tiny wings.','Floats around the room edges.','Pebbles that ricochet off walls once.','Tiny; dies in 1 hit.','Comes in groups of 3–5.');

// ── Tower (20 candidates → pick 10) — magical ──
MON(1,'tow','',1,'pixie_hexer','Pixie Hexer',['wisp','cast','#ffd0f0,#c080b0,#ff80d0,#301030','wings'],'',
 'Tiny pink pixie with a star-tipped wand.','Flits in circles.','Shrink hex: you deal -30% damage for 4 s.','Hard to hit; low HP.','Hexes stack — dodge the sparkle ring.');
MON(1,'tow','',2,'glyph_scribe','Glyph Scribe',['caster','cast','#e8d0b0,#4a6a9a,#7fe8ff,#101010','hood,book,runes'],'',
 'Robed scholar goblin scribbling in a floating book.','Walks backwards away from you.','Writes runes on the floor that explode 2 s later.','Book shield blocks one hit every 5 s.','Step on an unfinished rune to smudge it.');
MON(1,'tow','',2,'dawn_acolyte','Dawn Acolyte',['caster','pulse','#f0e0c0,#e8e4dc,#ffd070,#303030','hood,staff'],'',
 'White-robed acolyte with a sun-disc staff.','Stays behind other monsters.','Heals allies in a pulse.','Weak itself.','Kill it first or the room never ends.');
MON(1,'tow','',1,'grimoire','Snapping Grimoire',['book','lunge','#6a3a2a,#3a1a10,#ffd070,#ff3030',''],'',
 'Flying leather book with teeth along its pages.','Flaps like a bat.','Page-cut projectiles, then snapping bite.','Closes (armored) when you hit it from the front.','Drops a spell page (scroll).');
MON(1,'tow','',2,'candle_wraith','Candle Wraith',['wisp','pulse','#f0e8d0,#8a8070,#ffc040,#301010','candle'],'',
 'A floating candle with a face in its flame.','Drifts slowly toward you.','Its flame grows with every hit it lands (bigger burn aura).','Water/ice snuffs it out instantly.','Lights the dark rooms of the tower.');
MON(1,'tow','',3,'ley_mote','Ley Mote',['orb','beam','#9ff0ff,#4a8aa0,#7fe8ff,#ffffff',''],'pack',
 'Floating cyan orb humming with ley energy.','Drifts; links to other motes.','Tethers to other motes: the beams between them burn you.','Each mote alone is fragile.','Break one link and the net collapses.');
MON(1,'tow','',3,'mirror_sprite','Mirror Sprite',['wisp','blink','#e0f0ff,#8aa0c0,#ffffff,#3060ff','wings'],'',
 'Glassy fairy with a mirror-shard shield.','Creates 2 illusion copies and shuffles them.','Glints that dazzle (brief blur).','Only the copy that casts a shadow is real.','Hitting a copy makes it shatter harmlessly.');
MON(1,'tow','',2,'petal_witch','Petal Witch',['caster','cast','#f0c8d8,#8a3a5a,#ffc6de,#301030','hat'],'',
 'Young witch in a rose-petal cloak.','Floats slowly, keeps distance.','Petal storm that pushes you back.','Petal shield absorbs arrows.','Pushback into spikes or pits is her real danger.');
MON(1,'tow','',3,'clockwork_owl','Clockwork Owl',['bird','dive','#c8a060,#6a4a30,#ffd070,#80ffff','talons'],'',
 'Brass owl with glowing lens eyes.','Only moves when you are NOT facing it.','Silent dive from behind.','Freezes when you look at it.','Keep turning — or back into a corner.');
MON(1,'tow','',4,'fae_enchantress','Fae Enchantress',['caster','cast','#e8f0d0,#5a8a4a,#e0a8ff,#e0a8ff','wings,crown,wand'],'',
 'Tall fae noble with butterfly wings.','Glides; teleports when cornered.','Charm: reverses your controls for 3 s.','Charm fails if you are standing on a rune circle.','Her charmed ring can be taken as loot.');
MON(1,'tow','',3,'sentry_orb','Runic Sentry Orb',['orb','beam','#8a8e96,#3a3e46,#7fe8ff,#7fe8ff',''],'',
 'Stone orb banded with runes on a pedestal.','Stationary, rotating.','Sweeping beam — hide behind pillars.','Invulnerable while sweeping.','Hit it from behind while it turns.');
MON(1,'tow','',2,'apprentice_conjurer','Apprentice Conjurer',['caster','summon','#e8d0b0,#4a5a9a,#b0a0ff,#101010','hat,wand'],'',
 'Nervous apprentice with a too-big hat.','Runs away.','Summons 2 slimes from portals.','Barely any HP.','Kill him and his summons pop.');
MON(1,'tow','',3,'starlight_wisp','Starlight Wisp',['wisp','blink','#fff8d0,#c8b070,#ffffa0,#303010',''],'',
 'Golden star with a comet tail.','Blinks around the room.','Leaves star mines that pop when you step close.','Fragile.','Mines last 8 s — clean up by luring it away.');
MON(1,'tow','',2,'ink_imp','Ink Imp',['biped','spit','#2a2a3a,#101018,#6a6aff,#ffffff','ears,horns'],'',
 'Tiny imp made of wet ink.','Hops between inkwells.','Ink splash blinds (dark vignette) for 3 s.','Splits into ink drops on death.','Drops splatter the floor (slippery).');
MON(1,'tow','',3,'wind_sylph','Wind Sylph',['wraith','pulse','#e0f4ff,#9ac0e0,#ffffff,#3080ff',''],'',
 'Translucent air spirit with streaming hair.','Swirls around you.','Gust that pushes you 3 tiles — toward hazards.','Intangible between gusts.','Only hittable right after a gust.');
MON(1,'tow','',3,'illusionist_gnome','Illusionist Gnome',['caster','blink','#e8c0a0,#6a3a8a,#ff80ff,#101010','hat,beard,wand'],'',
 'Bearded gnome with a spiral wand.','Teleports short hops.','Swaps positions with you (surprise!).','Decoy hat — hitting the hat does nothing.','Swaps you into its own traps if you aren\'t careful.');
MON(1,'tow','',2,'rose_dryad','Rose Dryad',['tree','cast','#8a6a4a,#4a3424,#ff8aa0,#ffffff','moss'],'',
 'Young tree-woman with roses in her hair.','Rooted; moves between pots.','Vines root you if you stand still more than 1 s.','Thorny: melee hurts you 1.','Keep moving and she can\'t catch you.');
MON(1,'tow','',1,'lantern_familiar','Lantern Familiar',['wisp','shoot','#ffe0a0,#6a4a2a,#ffd070,#301010','lantern'],'',
 'Floating paper lantern with tiny wings.','Follows other monsters.','Lights up; shoots small sparks.','Fragile.','Killing it makes the room dark.');
MON(1,'tow','',3,'chime_spirit','Chime Spirit',['wisp','pulse','#c8e0ff,#6a88b0,#9fe8ff,#ffffff',''],'',
 'Floating crystal chimes with a face.','Floats in the room centre.','Sound rings expand outward with a gap — step through the gap.','Only hittable between rings.','Faster rings at low HP.');
MON(1,'tow','',4,'wand_knight','Gilded Wand-Knight',['biped','cast','#c8ccd4,#6a7080,#ffd070,#80c0ff','helmet,shield,armor,staff'],'',
 'Animated gilded armor wielding a wand like a sword.','Marches; blocks.','Alternates wand bolts and a wand slash.','Mirror shield reflects spells.','Physical attacks break the shield after 3 hits.');
