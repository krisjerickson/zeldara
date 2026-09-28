// ═══ NW ASHLANDS — "Fire, glass & dragon bones" ═══════════════════════
// Level 15–20. Combines mechanics: burn zones, armor break, rebirth,
// summons, multi-phase fights.
// ── Mainland ──
MON(4,'main','',3,'fire_imp','Fire Imp',['biped','shoot','#e05a2a,#8a2a10,#ffb040,#ffff80','ears,horns,tail'],'pack|T:ember fields, lava edges',
 'Grinning red imp with a flickering tail.',
 'Zig-zags (existing).',
 'Heat-seeking fireballs (existing).',
 'Immune to burn.',
 'Imps hop into lava pools and come out healed.','fire_imp');
MON(4,'main','',4,'ash_wraith','Ash Wraith',['wraith','blink','#6a6060,#2a2626,#ff8040,#ffb040','flames'],'night|T:burned cathedral, ash forest',
 'A figure of drifting ash with ember eyes (existing).',
 'Teleports (existing).',
 'Heat-seek bolts (existing) + an ash cloud that blinds.',
 'Intangible while teleporting.',
 'Wind or water disperses it for 3 s.','ash_wraith');
MON(4,'main','',5,'lava_titan','Lava Titan',['golem','slam','#4a3a38,#2a1a18,#ff6a20,#ffd040','crystals'],'T:magma channels (rare)',
 'Towering basalt giant with lava running through its cracks (existing).',
 'Slow; every step leaves a lava footprint.',
 'Stomp (existing) + lava pools.',
 'Cooling armor: ice/water hardens a section, then heavy hits break it.',
 'Elite: drops the rarest Ashlands ore.','lava_titan');
MON(4,'main','',5,'rock_dragon','Rock Dragon',['drake','breath','#6a5a4a,#3a2a20,#ff8a30,#ffe040',''],'T:dragon skeleton valley (one)',
 'Rock-scaled young dragon (existing).',
 'Rushes (existing), takes short flights.',
 'Scatter flame (existing).',
 'Scales deflect arrows from the front.',
 'A roaming mini-boss; its roar warns the whole zone.','rock_dragon');
MON(4,'main','',3,'magma_slug','Magma Slug',['blob','spit','#ff6a20,#8a2a10,#ffd040,#101010','flames'],'T:magma channels, lava crust',
 'Fat glowing slug with a cooling crust shell.',
 'Slow; leaves a burning trail.',
 'Spits lava blobs.',
 'Cooled (by ice/water) its shell hardens — then shatters with one heavy hit.',
 'Trails block paths for 6 s.');
MON(4,'main','',3,'cinder_hounds','Cinder Hounds',['quad','lunge','#3a2a28,#1a1010,#ff6020,#ffb040','ears,mane,tail'],'pack|T:ember fields, basalt forest',
 'Black hounds with glowing ember manes.',
 'Pack of 4: two flank, two chase.',
 'Flaming bite (burn).',
 'Explode into embers on death (small burst).',
 'Fight them away from each other — chain explosions hurt.');
MON(4,'main','',4,'obsidian_stalker','Obsidian Stalker',['biped','lunge','#2a2a38,#101018,#c080ff,#ff4060','armor,sword'],'T:obsidian glass fields',
 'Humanoid carved from black volcanic glass.',
 'Flickers between glass spires.',
 'Glass blade combo.',
 'Reflects projectiles; shatters into glass shards (area) when killed.',
 'Back away when it dies.');
MON(4,'main','',3,'sulfur_toad','Sulfur Toad',['frog','pulse','#d8c040,#8a7020,#f0f080,#ff3030','spots'],'T:sulfur geyser flats',
 'Yellow toad that inflates when angry.',
 'Rides geyser blasts to hop far.',
 'Inflates and bursts into a sulfur gas cloud (poison).',
 'Pops early if hit while inflating (harmless).',
 'Its gas + fire = explosion.');
MON(4,'main','',2,'ember_mimic','Ember-flower Mimic',['plant','lunge','#3a2a28,#1a1010,#ff8040,#ffff80','flower,thorns'],'T:ember-flower fields',
 'Looks exactly like a glowing ember flower.',
 'Stationary until you come close.',
 'Burning bite and a fire-petal spray.',
 'Only hittable once revealed.',
 'Real ember flowers sway; mimics don\'t.');
MON(4,'main','',4,'basalt_golem','Basalt Golem',['golem','slam','#4a4a50,#2a2a30,#ff6a20,#ffb040','columns'],'T:basalt column forest',
 'Golem made of hexagonal basalt columns.',
 'Slow march.',
 'Column slam; shockwave in a line.',
 'Armor break: each heavy hit knocks a column off — the columns stay as obstacles.',
 'Fully stripped it becomes fast and fragile.');
MON(4,'main','',4,'bone_revenant','Dragon-bone Revenant',['biped','shoot','#e8e0cc,#8a7a60,#ff8a30,#ff4020','skull,spear,helmet'],'night|T:dragon skeleton valley',
 'Undead dragon-knight in armor made of dragon bone.',
 'Rises from bone piles.',
 'Bone spear throws, then a charge.',
 'Revives once while its spear is on the ground.',
 'Pick up (or break) the spear to stop the revival.');
MON(4,'main','',4,'forge_automaton','Forge Automaton',['construct','slam','#8a5a3a,#3a2418,#ff8a30,#ffd040','hammer,vents,rivets'],'T:forge-city ruins',
 'Iron smith-construct with a glowing hammer.',
 'Clanking walk.',
 'Molten hammer slam (burn).',
 'Overheats after 3 slams: vents steam, 3 s vulnerable.',
 'Water makes it overheat instantly.');
MON(4,'main','',3,'ash_moths','Ash Moth Swarm',['swarm','pulse','#8a8480,#4a4440,#ff8040,#ffb040',''],'night|T:ash-snow forest',
 'A flurry of grey moths shedding ash.',
 'Swarms toward light.',
 'Ash-coat: your light radius shrinks and you move 15% slower (stacks).',
 'Scatters when hit.',
 'Stand in water or rain to wash the ash off.');
MON(4,'main','',4,'lava_eel','Lava Eel',['eel','spit','#ff6a20,#8a2a10,#ffd040,#ffff80','lava'],'T:lava channels, magma rivers',
 'Glowing eel that swims in molten rock.',
 'Moves along lava channels.',
 'Leaps and spits lava arcs.',
 'Only hittable when it leaps.',
 'Unicorn/Dragon mounts can chase it across the crust.');
MON(4,'main','',4,'chained_gargoyle','Chained Gargoyle',['bird','spin','#5a5058,#2a2428,#ff8040,#ff4020','stone,talons'],'T:chained floating rocks',
 'Gargoyle chained to a floating rock.',
 'Swings on its chain in wide arcs.',
 'Arc swoops.',
 'Chain limits its reach.',
 'Break the chain: it falls and fights on the ground (weaker, but free).');
MON(4,'main','',3,'pyre_cultist','Pyre Cultist',['caster','summon','#8a2a20,#3a1010,#ff8040,#ffe040','hood'],'pack|T:burned cathedral, forge ruins',
 'Red-hooded dragon cultist.',
 'Groups of 3 around a pyre.',
 'Sets runes on the ground aflame.',
 'Weak.',
 'If one falls, another sacrifices itself to buff the last.');
MON(4,'main','',4,'salamander_wyrmling','Salamander Wyrmling',['quad','breath','#e07030,#8a3010,#ffd040,#ffff80','spikes,tail'],'T:lava crust, cliffs',
 'Orange lizard with a flame crest.',
 'Climbs walls and cliffs (ignores terrain).',
 'Fire breath cone.',
 'Fire immune.',
 'Ambushes from cliff faces.');
MON(4,'main','',3,'cinder_scorpion','Cinder Scorpion',['insect','lunge','#3a2a28,#1a1010,#ff6020,#ffb040','stinger,mandibles'],'T:ash fields',
 'Black scorpion with a glowing tail.',
 'Burrows in ash; surfaces nearby.',
 'Fire-sting: long burn DoT.',
 'Armored back.',
 'Dust cloud when it surfaces — watch for it.');
MON(4,'main','',5,'scorched_paladin','Scorched Paladin',['biped','lunge','#6a5a50,#2a2420,#ff8a30,#ffe040','helmet,sword,shield,armor,cape'],'T:burned cathedral',
 'Undead paladin in fire-blackened armor.',
 'Steady advance; charges when far.',
 'Flaming sword combo (4 hits).',
 'Holy shield blocks the front; parry window on the 4th hit.',
 'Mini-boss of the cathedral; drops a blessed item.');
MON(4,'main','',5,'phoenix_chick','Phoenix Chick',['bird','breath','#ff8a30,#c03010,#ffe040,#101010','flames,talons'],'T:ember fields, volcano slopes',
 'Fluffy young phoenix, all flame.',
 'Flutters.',
 'Fire breath + dive.',
 'When killed it leaves an egg…',
 '…that hatches again in 5 s unless you break it.');

// ── Dungeon ──
MON(4,'dun','melee',4,'magma_brute','Magma Brute',['brute','slam','#4a3a38,#2a1a18,#ff6a20,#ffd040','glowcore'],'',
 'Molten-fisted brute.','Lumbers.','Burning fist combo.','Heat aura hurts when close.','Ice spells cool the aura.');
MON(4,'dun','melee',4,'glass_blademaster','Obsidian Blademaster',['biped','lunge','#2a2a38,#101018,#c080ff,#ff4060','sword,helmet'],'',
 'Duelist of volcanic glass.','Fast dashes.','3-hit blade combo.','Fragile: heavy hits shatter it.','Glass shards on death.');
MON(4,'dun','melee',4,'hellhound','Hellhound Alpha',['quad','lunge','#2a1a18,#101010,#ff4020,#ffff40','ears,mane,spikes,tail'],'pack',
 'Big black hound with a fiery mane.','Leads 2 hounds.','Flame pounce.','Tough.','Kill the alpha to rout the pack.');
MON(4,'dun','melee',3,'ember_berserker','Ember Berserker',['biped','spin','#b04a2a,#5a2010,#ff8040,#ffff80','horns,axe'],'',
 'Horned warrior with a burning axe.','Walks, then rushes.','Spinning axe.','Rage: every hit on it makes it faster.','Kill it quickly or not at all.');
MON(4,'dun','melee',4,'bonepit_ghoul','Bone-pit Ghoul',['biped','summon','#8a8070,#3a3028,#ff6040,#ff3030','skull'],'',
 'Ghoul half-buried in a pile of bones.','Stays in its bone pile.','Arms grab from the pile and drag you in.','Burrowed = hard to hit.','Burn the bone pile.');
MON(4,'dun','melee',3,'slag_golem','Slag Golem',['golem','slam','#6a5a50,#3a2a20,#ff8030,#ffb040',''],'',
 'Lumpy golem of cooling slag.','Slow.','Slam.','Splits into 3 slag blobs when "killed".','Kill the blobs before they re-merge.');
MON(4,'dun','melee',4,'salamander_warrior','Salamander Warrior',['biped','lunge','#e07030,#8a3010,#c8c8d0,#ffff80','tail,spear,shield'],'',
 'Lizardfolk warrior with a flaming spear.','Agile.','Spear thrusts + tail whip.','Fire immune; shield.','Tail whip knocks you into lava if nearby.');
MON(4,'dun','melee',4,'chain_warden','Chain Warden',['brute','lunge','#5a5058,#2a2428,#9a9aa4,#ff4020','spikes'],'',
 'Huge jailer wrapped in chains.','Slow.','Chain hook pulls you in, then a smash.','Armor.','Dodge the hook.');
MON(4,'dun','melee',2,'charred_zombies','Charred Zombies',['biped','pulse','#3a3030,#1a1414,#ff6020,#ffb040','skull'],'pack',
 'Burnt shambling corpses.','Slow horde.','Claw.','Explode into flames on death.','Don\'t kill them next to you.');
MON(4,'dun','melee',3,'molten_mimic','Molten Mimic',['construct','lunge','#8a5a3a,#3a2418,#ffd040,#ff3030',''],'',
 'A treasure chest with lava for a tongue.','Hops.','Bite + lava lick.','Looks like any chest.','Drops real treasure.');
MON(4,'dun','ranged',3,'imp_bombardier','Imp Bombardier',['biped','lob','#e05a2a,#8a2a10,#ffb040,#ffff80','ears,horns,tail'],'pack',
 'Imp with a satchel of fire bombs.','Keeps range, hops.','Arcing fire bombs.','Fragile.','Groups of 3.');
MON(4,'dun','ranged',3,'magma_vent','Magma Spitter',['plant','spit','#4a3a38,#2a1a18,#ff6a20,#ffff80','bulb'],'',
 'A living vent in the floor.','Stationary.','Lava blob volley.','Only its mouth is weak.','Plug it with a boulder.');
MON(4,'dun','ranged',4,'obsidian_archer','Obsidian Archer',['biped','shoot','#2a2a38,#101018,#c080ff,#ff4060','bow,hood'],'',
 'Glass-skinned archer.','Kites.','Glass arrows that shatter into 3 on walls.','Fragile.','Fight it in open rooms, not corridors.');
MON(4,'dun','ranged',4,'ember_sniper','Ember Sniper Cultist',['caster','beam','#8a2a20,#3a1010,#ff8040,#ffe040','hood,staff'],'',
 'Cultist channelling a thin beam of fire.','Stays far.','Long channelled beam (aim line).','Interrupt it with any hit.','Beam leaves burning ground.');
MON(4,'dun','ranged',3,'sulfur_beetle','Sulfur Bomber Beetle',['insect','lob','#d8c040,#8a7020,#f0f080,#ff3030','antennae'],'',
 'Yellow bombardier beetle.','Scuttles.','Flings sulfur bombs (gas clouds).','Its shell is weak from behind.','Gas + fire = boom.');
MON(4,'dun','ranged',2,'cinder_slinger','Cinder Slinger',['biped','shoot','#6fa040,#5a4028,#ff6020,#ff3030','ears,sling'],'',
 'Goblin with a flaming sling.','Keeps range.','Flaming stones that ignite grass.','Weak.','Burning ground blocks your path.');
MON(4,'dun','ranged',4,'pit_serpent','Lava Pit Serpent',['serpent','shoot','#ff6a20,#8a2a10,#ffd040,#ffff80','hood'],'',
 'Serpent that rises from lava pools.','Submerges and moves between pools.','Fireball volleys.','Only hittable when up.','Pools bubble before it rises.');
MON(4,'dun','ranged',3,'ash_crossbow','Ash Crossbowman',['biped','shoot','#6a6060,#2a2626,#ff8040,#ffb040','helmet,bow'],'',
 'Soot-covered soldier with a heavy crossbow.','Holds position.','Bolts that leave burning ground.','Armor.','Slow reload.');
MON(4,'dun','ranged',4,'brimstone_eye','Brimstone Eye',['eye','beam','#e05a2a,#6a2010,#ffe040,#ffffff','tentacles'],'',
 'Floating eye wreathed in flame.','Hovers.','Tracking heat ray.','Blinks = vulnerable.','Mirrors (obsidian) reflect its ray.');
MON(4,'dun','ranged',3,'flame_kite','Flame Kite Goblin',['bird','lob','#c8a060,#6a4a30,#ff6020,#ff3030','harpy'],'',
 'Goblin on a burning kite.','Circles above.','Drops fire pots.','Untargetable up high.','Kite burns out after 20 s and it crashes.');

// ── Tower ──
MON(4,'tow','',4,'dark_warlock','Dark Warlock',['caster','blink','#3a2a3a,#1a101a,#c040ff,#ff4060','hood,horns,staff'],'',
 'Horned warlock in black robes (existing).','Teleports (existing).','Heat-seek bolts (existing) + a curse.','Shield when hit 3 times.','Curse: your healing is halved for 10 s.','dark_warlock');
MON(4,'tow','',3,'pyromancer','Pyromancer',['caster','pulse','#e05a2a,#6a2010,#ffb040,#ffff80','hat,staff'],'',
 'Flame-haired mage.','Keeps range.','Fire rings expanding from him.','Fire immune.','Jump through the ring gaps.');
MON(4,'tow','',4,'obsidian_sorceress','Obsidian Sorceress',['caster','cast','#2a2a38,#101018,#c080ff,#ff4060','crown,staff'],'',
 'Sorceress in glass armor.','Glides.','Glass prisons trap you (break out with hits).','Reflects projectiles.','Prison shards can hurt her.');
MON(4,'tow','',5,'cinder_lich','Cinder Lich',['caster','summon','#e8e0cc,#2a1a18,#ff6020,#ff4020','hood,crown,staff,runes'],'',
 'Burning lich with a crown of embers.','Floats.','Raises charred skeletons; fire nova.','Phylactery (an urn in the room) makes it immortal.','Break the urn first.');
MON(4,'tow','',4,'magma_elemental','Magma Elemental',['blob','slam','#ff6a20,#8a2a10,#ffd040,#ffff80','flames'],'',
 'A walking pool of magma.','Flows.','Slam; leaves lava floor zones.','Splits into 2 when hit with water.','Cool it with ice to make it solid and breakable.');
MON(4,'tow','',4,'forge_artificer','Forge Artificer',['construct','summon','#8a5a3a,#3a2418,#ffd040,#80ffff','gears'],'',
 'Clockwork smith.','Runs around.','Builds flame turrets (3 max).','Weak.','Stop it before the turrets are done.');
MON(4,'tow','',5,'flame_djinn','Flame Djinn',['wraith','spin','#ff8040,#8a2a10,#ffe040,#ffffff','flames'],'',
 'Djinn whose lower half is a fire whirlwind.','Swirls.','Fire tornado pulls you in.','Intangible spin.','Hit it when it stops to laugh.');
MON(4,'tow','',4,'smoke_wraith','Smoke Wraith',['wraith','blink','#6a6060,#2a2626,#c0c0c0,#ff4040',''],'',
 'Figure of choking smoke.','Hides in smoke clouds.','Smoke clones + choke (slow + dmg).','Intangible inside smoke.','Wind clears the smoke.');
MON(4,'tow','',3,'ash_oracle','Ash Oracle',['caster','cast','#8a8480,#3a3430,#ff8040,#ffe040','hood,mask'],'',
 'Masked seer sifting ash.','Stationary.','Predicts eruptions: marked tiles erupt in a sequence.','Weak.','Learn the sequence.');
MON(4,'tow','',3,'imp_summoner','Brimstone Summoner',['caster','summon','#8a2a20,#3a1010,#ff6020,#ffe040','horns,book'],'',
 'Horned summoner with a burning tome.','Keeps distance.','Opens imp portals.','Weak.','Close portals by hitting them.');
MON(4,'tow','',4,'dragon_priest','Dragon Cult Priest',['caster','breath','#8a2a20,#3a1010,#ff8040,#ffe040','hood,staff,crown'],'',
 'High priest in a dragon-skull mask.','Channels.','Dragon breath cone via a skull staff; buffs cultists.','Protected by cultists.','Take the staff and the breath stops.');
MON(4,'tow','',5,'soul_furnace','Soul Furnace',['construct','pulse','#4a3a38,#2a1a18,#ff6a20,#ff4020','vents'],'',
 'A walking iron furnace with a grate for a mouth.','Slow.','Absorbs the souls of monsters that die nearby — grows stronger.','Armor.','Kill it first, or kill others far from it.');
MON(4,'tow','',4,'eclipse_witch','Eclipse Witch',['caster','cast','#2a2a3a,#101018,#ffd040,#ffffff','hat'],'',
 'Witch with a black-sun pendant.','Floats.','Darkens the room; only lit circles are safe.','Visible only in light.','Light braziers to fight her.');
MON(4,'tow','',3,'salamander_sage','Salamander Sage',['caster','cast','#e07030,#8a3010,#ffd040,#ffff80','beard,staff,tail'],'',
 'Old lizard mage with a flame beard.','Walks.','Fire shield that reflects melee.','Fire immune.','Ice breaks the shield.');
MON(4,'tow','',5,'meteor_caller','Meteor Caller',['caster','lob','#8a4a2a,#3a1a10,#ff8030,#ffe040','hood,staff,runes'],'',
 'Mage with a star-iron staff.','Stands at a window.','Meteors crash and leave magma pools.','Weak up close.','Rush him.');
MON(4,'tow','',4,'chainmaster','Chainmaster Warlock',['caster','beam','#3a2a3a,#1a101a,#9a9aa4,#ff4060','hood,staff'],'',
 'Warlock with spectral chains.','Walks backwards.','Chains tether you to a pillar.','Break chains by moving the other way.','Tethered too long = heavy damage.');
MON(4,'tow','',5,'phoenix_mage','Phoenix Mage',['caster','cast','#ff8a30,#c03010,#ffe040,#ffffff','wings,crown,staff'],'',
 'Mage with fiery phoenix wings.','Flies across the room.','Fire feathers; rebirth once at 0 HP.','Rebirth takes 3 s — interrupt it.','Drops a phoenix feather (revive item).');
MON(4,'tow','',4,'volcanic_hexer','Volcanic Hexer',['caster','cast','#6a3a2a,#2a1410,#ff6020,#80e0ff','hood,mask,wand'],'',
 'Hexer with a half-fire, half-ice mask.','Hops.','Alternating curses: burn while moving / freeze while still.','Weak.','Watch the mask colour to know which curse.');
MON(4,'tow','',5,'ember_construct','Runic Ember Construct',['golem','beam','#4a3a38,#2a1a18,#ff8030,#7fe8ff','columns'],'',
 'Stone construct covered in rune plates.','Slow.','Rune beams; shield up.','Shield drops only when you hit its rune plates in the right order.','The order is shown by flickering runes.');
MON(4,'tow','',3,'flame_wisp','Flame Wisp',['wisp','shoot','#ffb040,#c03010,#ffe040,#301010',''],'pack',
 'Little living flame.','Orbits casters.','Small fire darts.','Fragile.','Feeds a caster\'s fire shield.');
