# Round 93 (Kris: "they are still largely not very good. Look back into what each sound effect is supposed to be representing … redo all of the
# ones i have not chosen, with 5 total to choose from … making sure that the sounds are thematic. A lightning spell should sound like lightning.
# Starfall should make you think of a shooting star, etc").
# For every effect: what it stands for in the game (MEAN), and five thematic takes (W) — each names the real, recognisable sound first (what makes it,
# on what, how), so the effect is instantly what it represents. Only as many are sent as each effect needs (5 minus the takes Kris kept, minus
# the library takes found for it). tools/audio/sfx93.py writes src/js/07zau7-sfx93.js from this file.
MEAN = {}
W = {}
def S(i, mean, *takes):
    MEAN[i] = mean; W[i] = list(takes)

# ── the hero ──
S('sfx_step_grass', 'one footstep of the hero on grass',
  'a single leather boot stepping onto thick meadow grass, a soft crushing swish of blades',
  'one footstep on dewy grass, a gentle damp brush and a tiny soil thud',
  'a single light footfall on short dry grass, crisp rustle of stalks',
  'one step through long wild grass, blades swishing against the leg',
  'a soft boot heel landing on springy turf, muffled thud and grass rustle')
S('sfx_step_stone', 'one footstep on stone floors and roads',
  'a single leather boot heel clicking on a smooth flagstone floor in a hall',
  'one footstep on rough cobblestones, a firm tap with a little grit',
  'a single boot step on a stone stair, a hard clean knock with a short echo',
  'one heavy footstep on worn granite, a solid tap and scuff',
  'a single boot step on a marble floor, a crisp tap with a soft ring')
S('sfx_step_wood', 'one footstep on wooden planks — piers, bridges, houses',
  'a single boot step on an old wooden pier plank, a hollow knock and a small creak',
  'one footstep on a wooden floorboard, a dull knock and a soft squeak',
  'a single step on a wooden bridge deck, a hollow resonant thud',
  'one boot landing on thick oak planks, a firm woody tap',
  'a single footstep on a boardwalk over water, a hollow plank knock and faint creak')
S('sfx_step_water', 'one splashing step in shallow water',
  'a single boot splashing into ankle-deep water, a sharp slosh and drips',
  'one footstep in a shallow puddle, a quick wet splat',
  'a single step wading through a shallow stream, water swirling around the boot',
  'one foot plunging into shallow lake water, a splash and gurgle',
  'a single step in muddy shallow water, a wet squelch and splash')
S('sfx_sword_swing', 'the hero swinging the sword (Space)',
  'a steel sword cutting fast through the air, a clean sharp whoosh',
  'a quick slashing swish of a longsword blade through the air',
  'a fast double-edged sword swing, a thin bright whistle of steel',
  'a short powerful sword swipe, air tearing past the blade',
  'a light quick sword slash, a crisp metallic swish')
S('sfx_sword_hit', 'the hero\'s sword blow landing on a monster',
  'a steel sword slicing into a creature, a meaty slash with a short metallic ring',
  'a sword striking a beast\'s hide, a heavy cutting thwack',
  'a blade cutting hard into flesh and leather, a wet slash',
  'a sword blow landing on a monster, a solid chop with a ring of steel',
  'a quick sword strike connecting, a sharp slicing impact')
S('sfx_axe_swing', 'the heavy axe swing',
  'a heavy battle axe swung hard through the air, a deep slow whoosh',
  'a great two-handed axe swinging round, a thick heavy rush of air',
  'a weighty axe head cutting through the air, a low whooming swish',
  'a big axe swing, a broad deep whoosh with a slight whistle',
  'a powerful overhead axe swing, a heavy wind-cutting woosh')
S('sfx_axe_hit', 'the axe blow landing',
  'a heavy battle axe biting into a creature, a deep meaty chop',
  'an axe head slamming into a wooden shield and flesh, a thick crunching chop',
  'a heavy axe strike landing, a solid thunk with a metal ring',
  'a battle axe cleaving into armour and hide, a crunching heavy hit',
  'a great axe chop landing hard, a deep woody thud and slash')
S('sfx_bow_draw', 'drawing the bow',
  'a wooden longbow being drawn, the string creaking taut',
  'a bowstring pulled back slowly, wood flexing and creaking',
  'drawing a recurve bow, a tight creak of string and limbs',
  'an arrow nocked and drawn, a feather brushing and string stretching',
  'a yew bow drawn to full, a deep wooden creak')
S('sfx_bow_shot', 'loosing an arrow',
  'an arrow released from a longbow, a sharp twang and a fast whoosh away',
  'a bowstring snapping forward, a deep thrum and an arrow whistling off',
  'an arrow fired from a bow, a quick twang and a fading flight hiss',
  'a strong bow shot, the string thrumming and the arrow zipping away',
  'a light bow loosing an arrow, a clean snap and swish')
S('sfx_crossbow', 'a crossbow shot',
  'a crossbow firing, a heavy mechanical click and a hard twang of the bolt leaving',
  'a crossbow trigger releasing, a metal clack and a fast bolt whoosh',
  'a heavy crossbow shot, a loud thunk of the string and a whizzing bolt',
  'a crossbow being fired, a ratchet snap and a deep twang',
  'a medieval crossbow loosing a bolt, a sharp clack and thrum')
S('sfx_arrow_hit', 'an arrow landing',
  'an arrow thudding into a wooden target, a sharp thock and a quiver',
  'an arrow striking a creature, a short punchy thud',
  'an arrowhead hitting a shield, a quick hard tok',
  'an arrow sinking into earth, a dull thump',
  'an arrow hitting a tree trunk, a thwack and a vibrating shaft')
S('sfx_block', 'blocking with the shield',
  'a sword blow blocked by a wooden round shield, a heavy wooden thud with a metal rim clang',
  'a weapon striking a shield, a solid knock and a ring of iron boss',
  'a shield taking a hard hit, a deep wooden bang',
  'parrying with a shield, a sharp metal clank and wood thump',
  'a blow glancing off a shield, a quick clunk and scrape')
S('sfx_roll', 'the hero rolling (Alt)',
  'a quick body roll across the ground, cloth and leather tumbling with a dusty scuff',
  'a fast dodge roll on dirt, a thump of shoulders and a swish of cloak',
  'a combat roll on grass, a soft tumble and rustle',
  'a nimble roll and spring back up, cloth swishing and boots scuffing',
  'a dodge roll on stone, a soft thud of armour and a sliding scrape')
S('sfx_hurt', 'the hero being hit',
  'a heavy blow landing on a leather-armoured body, a dull punchy thump',
  'a hard hit on chainmail, a muffled clink and thud',
  'a creature claw striking leather armour, a quick slap and thump',
  'a heavy punch into a padded jerkin, a deep thud',
  'a sharp hit on armour, a quick thump with a rattle of buckles')
S('sfx_fall', 'the hero knocked down',
  'a body falling to the ground, armour and gear rattling, a heavy thud',
  'a person collapsing onto dirt, a thump and a clatter of a dropped sword',
  'someone knocked down onto stone, a heavy fall and buckles rattling',
  'a body hitting the ground hard, a dull crash and cloth settling',
  'a fall onto grass, a heavy flump and a clink of gear')
S('sfx_drink', 'drinking a potion',
  'a cork popped from a glass potion bottle, liquid sloshing and two gulps',
  'uncorking a small vial with a pop, a quick glug and a satisfied swallow',
  'a glass flask unstoppered, a bubbling liquid poured into the mouth and swallowed',
  'a potion bottle opened with a squeak and pop, then a gulp',
  'drinking from a glass bottle, a cork pop, liquid sloshing, a gulp and a clink')
S('sfx_eat', 'eating food',
  'a crisp bite into a fresh apple, a crunch and a chew',
  'tearing a crusty bread loaf and biting, crust crackling',
  'biting into a roasted meat leg, a juicy tear',
  'a crunchy bite of a carrot',
  'biting a soft pastry, a flaky crunch')
S('sfx_dig', 'digging',
  'a spade digging into soil, a scraping thrust and a heap of earth tossed',
  'a shovel cutting into earth with a gritty crunch',
  'digging with a spade in loose dirt, a soft scrape and thump',
  'a trowel scraping into earth',
  'a spade striking a buried stone, a scrape and a clink')
S('sfx_chop', 'chopping a tree',
  'an axe chopping into a tree trunk, a sharp woody thwack',
  'a woodcutter\'s axe biting into a pine log, a deep chock',
  'an axe striking hard wood, a crisp crack of splitting fibres',
  'chopping firewood, an axe thunk and a log splitting',
  'an axe hitting a tree, a hollow thock and leaves shaking')
# ── magic by element ──
S('sfx_fire', 'fire spells and skills',
  'a fireball igniting with a roaring whoosh of flame and bursting',
  'a burst of flame erupting, crackling fire and a deep whump',
  'a torch of fire thrown through the air, a rushing roar and a crackle',
  'a gas flame flaring up with a loud whoosh and crackling burn',
  'fire bursting from the hands, a roaring flame jet')
S('sfx_frost', 'frost and ice magic',
  'ice crystals forming fast with a crackling freeze, then shattering like glass',
  'a sheet of ice cracking and splintering with a sharp crystalline crunch',
  'an icicle snapping and shattering into tinkling shards',
  'water freezing instantly, a rising crackle of ice and a crisp snap',
  'a frozen block cracking apart with a glassy crunch')
S('sfx_lightning', 'lightning spells',
  'a lightning bolt striking: a blinding electric crack and a rolling thunder boom',
  'a sharp crackling electric zap and snap of a lightning strike',
  'a thunderbolt hitting the ground, a loud crack and sizzling electricity',
  'a crackling arc of electricity and a sudden thunderclap',
  'a lightning strike close by, a violent crack followed by a short rumble')
S('sfx_earth', 'earth spells and quakes',
  'the ground splitting open with a deep rumble and rocks bursting upward',
  'a boulder erupting from the earth, grinding stone and a heavy thud',
  'an earthquake rumble with cracking rock and falling stones',
  'rock slabs smashing up from the ground, a crunching heavy impact',
  'the earth heaving, a deep grinding rumble and gravel spilling')
S('sfx_nature', 'nature and vine magic',
  'thick vines bursting out of the ground, wood creaking and leaves rustling hard',
  'roots tearing up through soil with a crackling wooden groan',
  'a sudden growth of leafy branches, rustling and snapping twigs',
  'living vines whipping and coiling, a fast leafy swish',
  'flowers and grass springing up, a rush of rustling leaves')
S('sfx_water', 'water spells',
  'a surge of water crashing like a wave, a big splash and spray',
  'a water spell blast, a heavy splash and gushing torrent',
  'a jet of water shooting out and splashing on stone',
  'a wave breaking, a roaring wash and a hiss of foam',
  'a water orb bursting, a wet explosion and drips')
S('sfx_light', 'light and healing magic',
  'a warm glowing chime swelling up, bright bells and a soft shimmer',
  'a holy light bursting, a choral shimmer and a bright bell tone',
  'a healing glow, a gentle rising harp glissando and sparkles',
  'a beam of sunlight magic, a bright ringing tone and shimmer',
  'a radiant blessing, a golden chime cluster and a soft whoosh')
S('sfx_dark', 'shadow and curses',
  'a dark curse pulse, a low ominous whoosh and creepy whispers',
  'shadow magic swirling, a deep hollow drone and a hiss',
  'a cursed energy burst, a dark rumbling thump and echoing whisper',
  'a black void pulse, a low distorted throb',
  'a sinister spell, a breathy reverse whoosh and a low groan')
S('sfx_godsbane', 'Godsbane — the Lodestar\'s beam of holy light',
  'a colossal beam of holy white light firing, a roaring energy blast with choir-like shimmer and a deep boom',
  'a giant magic laser of light, a rising whine into a thundering blast and ringing bells',
  'a divine beam erupting, a massive whoosh, cathedral-bell ring and deep impact',
  'a huge charge of light releasing, a crackling roar and a bright choral swell',
  'a sacred spear of light striking, a booming blast and a long shimmering ring')
S('sfx_mana', 'mana restored',
  'a cool magical sparkle rising, crystal chimes going up',
  'a soft blue energy refilling, a rising shimmer and a gentle ping',
  'a magical potion glow, bubbles and a rising twinkle',
  'mana flowing back, a swelling airy tone and sparkles',
  'a refreshing magic surge, a bright upward chime run')
S('sfx_nomana', 'not enough mana / on cooldown',
  'a magic spell fizzling out, a dull puff and a dying sputter',
  'a failed spell, a short low buzz and a fizzle',
  'a spark that will not catch, a dry click and a soft fizz',
  'magic sputtering out, a deflating whoosh',
  'a dull empty thunk with a tiny fizzle')
S('sfx_skill', 'a skill (Z)',
  'a powerful quick whoosh with a magical edge',
  'a burst of energy, a sharp rising swish and a pop',
  'a combat skill activating, a fast swirl of air and a ringing ping',
  'a quick power move, a punchy whoosh and spark',
  'a technique unleashed, a snapping whip of air and a glint')
# ── monsters ──
S('sfx_beast_growl', 'wolves, boars and bears noticing you',
  'a wolf growling low and menacing, bared teeth snarl',
  'a bear rumbling growl, deep and threatening',
  'a wild boar grunting and squealing aggressively',
  'a large dog snarling and growling',
  'a big cat growl, low rumbling warning')
S('sfx_beast_bite', 'beasts biting',
  'a wolf snapping its jaws, a fast vicious bite',
  'teeth clamping shut with a hard snap',
  'an animal lunging and biting, a growl and a snap',
  'a quick snarling bite, jaws clacking',
  'a large beast bite, a crunching chomp')
S('sfx_slime', 'slimes and blobs',
  'a wet slime squelch, a gooey splat',
  'a sticky blob bouncing, a squishy gloop',
  'slime splitting apart, a wet squelch and drip',
  'a jelly creature squishing, a thick wet slurp',
  'a gooey splat on the ground, a mucky plop')
S('sfx_insect', 'spiders, beetles and wasps',
  'a giant beetle clicking and chittering its mandibles',
  'a swarm of wasps buzzing angrily',
  'a large spider skittering legs and hissing',
  'insect wings buzzing and clicking fast',
  'a cricket-like chirping chitter of a big bug')
S('sfx_undead', 'skeletons and wraiths',
  'skeleton bones rattling and clattering',
  'a hollow undead moan echoing',
  'a skeleton rising, bones clacking together',
  'a ghoulish groan and a rattle of chains and bones',
  'dry bones snapping and a raspy breath')
S('sfx_spirit_mon', 'spirits and ghosts',
  'an eerie ghostly wail, airy and echoing',
  'a ghost whooshing past with a hollow moan',
  'a spectral whisper rising into a shriek',
  'a phantom breath, a cold hollow howl',
  'a wraith hissing and wailing softly')
S('sfx_golem', 'stone and metal creatures',
  'a stone golem stomping, grinding rock and heavy thuds',
  'huge rocks grinding together as a stone giant moves',
  'a metal golem clanking, heavy iron plates scraping',
  'a rock creature\'s heavy footstep, a crunching boom',
  'stone limbs scraping and crashing')
S('sfx_bird', 'harpies and birds',
  'a hawk screeching sharply',
  'a large bird cawing and flapping wings',
  'a harpy\'s piercing cry',
  'an eagle\'s shrill call',
  'a crow cawing harshly')
S('sfx_serpent', 'snakes and wyrms',
  'a large snake hissing long and loud',
  'a serpent hiss and a rattle',
  'a giant snake sliding over the ground, scales scraping, a hiss',
  'a cobra hiss, sharp and threatening',
  'a wyrm\'s low hissing breath')
S('sfx_drake', 'drakes and dragons',
  'a dragon roaring, a mid-sized beast with a fiery growl',
  'a drake screeching roar',
  'a reptile beast\'s deep bellow and snort of smoke',
  'a young dragon\'s rasping roar',
  'a winged drake\'s growling shriek')
S('sfx_spit', 'monster projectiles',
  'a creature spitting a glob of acid, a wet hock and a sizzle',
  'a monster lobbing a slimy projectile, a wet thwip',
  'a beast spitting venom, a hiss and a splat',
  'a quick spit shot, a thick wet pop',
  'a gooey glob flying, a splat on stone')
S('sfx_summon', 'a monster calling others',
  'a magic portal ripping open with a crackle and a whoosh',
  'a summoning circle flaring, a rising magical hum and a burst',
  'creatures conjured from smoke, a swirl and a pop',
  'a dark rune glowing to life, a throbbing hum and a flash',
  'a gateway of energy opening, a crackling swell')
S('sfx_mon_hit', 'a monster taking a blow',
  'a fleshy impact on a creature, a meaty thwack',
  'a punchy hit on a beast\'s hide, a deep thud',
  'a weapon hitting a monster, a squishy smack',
  'a hard blow on a creature, a short crunch',
  'a quick slap of a hit on scales')
S('sfx_mon_armor', 'an armoured or shelled monster hit',
  'a sword clanging off metal armour plates',
  'a weapon striking a hard shell, a sharp crack and clack',
  'a blow on an iron helmet, a ringing clank',
  'steel hitting stone-hard scales, a chink and scrape',
  'a hammer on a metal breastplate, a heavy clang')
S('sfx_mon_die', 'a monster defeated',
  'a creature collapsing and vanishing in a puff of dust',
  'a monster falling, a thud and a magical poof',
  'a beast\'s dying groan and a body hitting the ground',
  'a creature disintegrating into sparkles and dust',
  'a monster fading away with a hollow whoosh')
# ── bosses ──
S('sfx_boss_roar', 'a boss waking or turning',
  'a huge monster roaring, deep, long and earth-shaking',
  'a giant beast bellowing, a massive throaty roar with echo',
  'a colossal creature screaming a guttural roar',
  'a titan\'s booming roar rolling through a cavern',
  'a gigantic dragon-like roar, rumbling and raw')
S('sfx_boss_stomp', 'heavy boss steps',
  'a colossal foot stomping, the ground booming and shaking',
  'a giant stepping down hard, a deep thud and rubble',
  'a massive stomp, a low boom and rattling stones',
  'a titan\'s footstep, a heavy earth-shaking thump',
  'a huge creature landing, a crushing boom')
S('sfx_boss_slam', 'area slams',
  'a giant weapon slamming the ground, a booming crash and flying debris',
  'a massive fist smashing the earth, a shockwave boom',
  'a huge hammer crashing down, rock splitting and dust',
  'a heavy ground pound, a deep impact and gravel raining',
  'a titanic slam, a cracking boom and rumble')
S('sfx_boss_phase', 'a boss entering a new phase',
  'a dark power transformation, a rising roar of energy into an explosion',
  'a boss powering up, a deep rumbling swell and a thunderous burst',
  'a monstrous metamorphosis, a growing distorted roar and a crash',
  'evil energy surging and erupting, a swirling build and a boom',
  'a dark aura igniting, a rising whine and a massive impact')
S('sfx_boss_charge', 'a boss charging its last move',
  'an ominous energy charging up, a hum rising in pitch',
  'a power build-up, a rising electric whine',
  'a deep throbbing charge growing louder',
  'a menacing magical charge, a swelling drone',
  'an energy ball gathering, a rising crackling hum')
S('sfx_shield_break', 'a boss ward breaking',
  'a magic barrier shattering like a glass dome',
  'a force field cracking and bursting into shards',
  'a crystal shield exploding with a ringing smash',
  'a ward breaking, a glassy crack and a burst of sparkles',
  'an energy shield collapsing, a crackle and shatter')
S('sfx_boss_fall', 'a boss defeated',
  'a giant creature crashing down, a heavy boom and long rumble',
  'a colossus collapsing, rubble falling and the ground shaking',
  'a huge body hitting the ground, a deep crash fading',
  'a titan toppling over, a thunderous fall and dust',
  'a massive beast falling with a final groan and crash')
# ── familiars ──
S('sfx_fam_call', 'a familiar joining you',
  'a small magical creature appearing with a sparkling pop and chime',
  'a fairy arriving, a twinkle and a soft whoosh',
  'a tiny spirit materializing, a bright bell and shimmer',
  'a magical pet summoned, a cheerful sparkle burst',
  'a little creature popping into view, a chime and flutter')
S('sfx_fam_grass', 'the grass familiar\'s attack',
  'a burst of leaves and a whip of a vine',
  'a leafy swish and a sharp vine snap',
  'seeds shooting out, a quick rustle and pop',
  'a thorny vine lashing, a whip crack and leaves',
  'a gust of leaves, a rustling burst')
S('sfx_fam_water', 'the water familiar\'s attack',
  'a water bubble shot popping with a splash',
  'a small water jet, a squirt and splash',
  'a bubble burst, a wet pop and spray',
  'a water droplet shot, a plip and splash',
  'a little wave, a splashing slosh')
S('sfx_fam_earth', 'the earth familiar\'s attack',
  'a burst of pebbles, a gritty thud',
  'a small rock thrown, a knock and crumble',
  'stones bursting from the ground, a crunchy pop',
  'a pebble shot, a quick clack',
  'a clump of earth hitting, a dull thump and dust')
S('sfx_fam_fire', 'the fire familiar\'s attack',
  'a small puff of flame, a crackling whoosh',
  'a tiny fireball, a sizzle and pop',
  'a burst of embers, a crackle',
  'a little flame jet, a short roar',
  'a spark of fire, a quick fwoosh')
# ── mounts ──
S('sfx_whistle', 'calling the mount (M)',
  'a person whistling a short two-note call with fingers',
  'a sharp shepherd\'s whistle, two rising notes',
  'a loud finger whistle calling a horse',
  'a quick bright whistle, up and down',
  'a clear piercing whistle call')
S('sfx_hooves', 'riding (a loop)',
  'horse hooves trotting steadily on a dirt road',
  'a horse cantering on packed earth, rhythmic hoofbeats',
  'hooves clopping on a country path, steady trot',
  'a horse trotting on grass, soft rhythmic thuds',
  'a galloping horse, steady drumming hooves')
S('sfx_wings', 'a flying mount (a loop)',
  'large wings flapping steadily in flight',
  'a great bird\'s wings beating slowly, whooshing air',
  'huge leathery wings beating, deep whooshes',
  'steady wingbeats of a large flying creature',
  'powerful wings flapping, rhythmic air rushes')
# ── the world ──
S('sfx_chest', 'opening a chest',
  'a wooden treasure chest creaking open with a clink of coins',
  'an old chest lid lifting, rusty hinges squeaking and gold rattling',
  'a heavy chest unlatched and opened, a clack and creak',
  'a treasure chest opening, a wooden thump and coins jingling',
  'a small chest flipping open, a click and a sparkle of coins')
S('sfx_door', 'doors into buildings and sites',
  'a heavy wooden door opening with a creak',
  'an old door swinging open, hinges groaning',
  'a wooden door unlatched and pushed open, a clack and creak',
  'a sturdy door opening, a thud and squeak',
  'a cottage door opening, a latch click and creak')
S('sfx_locked', 'a locked or sealed door',
  'a locked door rattling against its bolt',
  'a door handle jiggling, a locked latch clacking',
  'pulling on a locked iron gate, a rattle and clank',
  'a sealed door shuddering, a heavy bolt knocking',
  'a locked chest lid clacking shut against the lock')
S('sfx_stairs', 'stairs between floors',
  'quick footsteps going down stone stairs',
  'footsteps climbing wooden stairs, creaks',
  'running up a stone staircase, echoing steps',
  'footsteps on a spiral stone stair',
  'descending creaky stairs quickly')
S('sfx_coin', 'gold picked up',
  'a handful of gold coins clinking together',
  'coins jingling into a leather pouch',
  'a few coins dropping and clinking',
  'gold coins spilling and chiming',
  'a coin pouch shaken, coins rattling')
S('sfx_pickup', 'picking up an item',
  'a small item picked up, a soft pop',
  'grabbing an object, a quick rustle',
  'a little bag scooped up, a light thump',
  'an item collected, a soft click',
  'a trinket picked up, a tiny jingle')
S('sfx_gem', 'gems and shards',
  'a crystal gem chime, a bright glassy ting',
  'gemstones clinking together',
  'a crystal shard ringing like a bell',
  'a jewel sparkle, a high glass ping',
  'a gem being picked up, a clear chime')
S('sfx_waystone', 'a waystone waking',
  'an ancient stone awakening with a deep magic hum and a glow',
  'a standing stone activating, grinding rock and a rising tone',
  'a rune stone humming to life, a resonant drone and shimmer',
  'a portal stone waking, a magical whoosh and pulse',
  'a monolith powering up, a low thrum and bright chime')
S('sfx_travel', 'travelling by waystone',
  'a magical teleport whoosh, a swirl and a pop',
  'a warp of light, a rushing swoosh',
  'a teleport spell, a crackle and whoosh',
  'disappearing in a flash, an airy zip',
  'a portal jump, a deep whoosh and shimmer')
S('sfx_camp', 'a monster camp cleared',
  'a short victorious folk fanfare on horns',
  'a triumphant drum roll and horn call',
  'a victory flourish on a lute and drum',
  'a quick heroic brass fanfare',
  'a celebratory jingle of bells and a horn')
S('sfx_lever', 'switches and lifts',
  'a heavy iron lever pulled, a clunk and a ratchet',
  'a rusty lever creaking and locking into place',
  'a stone switch sliding with a grinding clunk',
  'a mechanism lever thrown, gears clicking',
  'a big lever slammed down, a heavy clank')
S('sfx_trap', 'spikes and traps',
  'metal spikes springing up out of the floor, a sharp shing',
  'a spring trap snapping shut',
  'a pressure plate click and blades shooting out',
  'iron spikes bursting from stone, a metal clang',
  'a bear trap snapping closed')
S('sfx_rubble', 'falling rocks',
  'rocks crumbling and falling down a slope',
  'a rock pile collapsing, stones tumbling',
  'falling stones bouncing on rock',
  'a wall crumbling, bricks tumbling',
  'gravel and rocks sliding down')
S('sfx_splash', 'something falling into water',
  'a big splash into water',
  'a heavy object plunging into a lake',
  'a body splashing into a pond',
  'a rock dropped into deep water, a plunk and splash',
  'a large splash and water slapping back')
S('sfx_anvil', 'the smith and the forges',
  'a hammer striking an anvil, a bright metallic clang',
  'a blacksmith hammering hot metal on an anvil',
  'a heavy hammer hitting an anvil twice, ringing',
  'an anvil strike with a sizzle of hot iron',
  'a smith tapping metal on an anvil, a clear ring')
S('sfx_lava', 'lava bursts',
  'a burst of bubbling lava, a thick gurgle and spatter',
  'molten rock erupting, a hissing blurp',
  'lava splashing with a deep bubbling pop',
  'a magma bubble bursting, a sizzling plop',
  'lava spitting up, a crackling glop')
S('sfx_bell', 'the village bell',
  'a bronze village bell ringing three times',
  'a church bell tolling slowly',
  'a large bell clanging in a tower',
  'a town bell ringing, deep and resonant',
  'a bell rung three times, echoing over the village')
S('sfx_sleep', 'resting in a bed',
  'a blanket rustle and a calm magical chime',
  'settling into bed, cloth rustling and a soft sigh',
  'a gentle lullaby chime and a quilt pulled up',
  'a cozy rest, a soft yawn and a bell tone',
  'sheets rustling and a peaceful harp note')
# ── the story ──
S('sfx_spirit_free', 'a spirit freed from its stone',
  'a ghostly sigh of relief rising into a bright chime',
  'a spirit breaking free, a whoosh upward and sparkling bells',
  'chains falling away and a soul ascending, a shimmer and choir-like tone',
  'a freed spirit soaring, a rising airy whoosh and twinkle',
  'a soul released, a soft breath and bright rising arpeggio')
S('sfx_rune_wake', 'a runestone lighting',
  'a deep stone hum rising into a glowing chime',
  'an ancient rune igniting, a resonant thrum and spark',
  'carved runes glowing to life, a magical rising tone',
  'a runestone awakening, a deep vibration and a bell ping',
  'a rune flaring with light, a shimmering hum')
S('sfx_line_trace', 'light running along a soul-line',
  'a long magical shimmer travelling and rising',
  'a stream of light racing along a line, a sparkling whoosh',
  'a glowing energy flowing, a rising tingling tone',
  'a magical trail drawing itself, a bright sweep',
  'light zipping across the ground, a long twinkling rush')
S('sfx_lodestar', 'the Lodestar set in its place',
  'a heavy crystal staff set into stone with a resonant ring',
  'a staff planted on stone, a deep knock and a long crystal hum',
  'a magic staff locking into a socket, a clunk and ringing tone',
  'a crystal striking stone, a bright resonant chime and boom',
  'a powerful artifact placed, a thud and a rising glow')
S('sfx_bifrost', 'the Bifröst rising',
  'a rainbow bridge forming, a vast rising shimmer of light',
  'a bridge of light stretching out, a long sparkling whoosh',
  'a cascade of bright chimes rising into the sky',
  'a magical bridge appearing, a swelling choral shimmer',
  'a rainbow of light unfolding, a rising harp glissando and sparkle')
S('sfx_orbs_burst', 'the joined orbs bursting',
  'two giant glass orbs bursting into millions of shards of light, sparkling rain',
  'huge glass spheres shattering, a crash and tinkling glitter',
  'a massive crystal explosion, a ringing smash and falling sparkles',
  'enormous orbs breaking, a bright burst and a shower of chimes',
  'glass globes exploding, a shimmering crash')
S('sfx_thunder', 'Odin\'s lightning over the village',
  'a huge thunderclap with a crackling lightning strike right overhead',
  'a lightning bolt hitting nearby, a deafening crack and rolling thunder',
  'a violent thunderstorm crash, an explosive boom',
  'a sharp crack of lightning and a long rumbling roll',
  'a thunderstrike splitting the sky, a crack and boom')
S('sfx_vines', 'Freya\'s vines growing across the land',
  'vines and flowers growing fast, rustling and creaking',
  'plants surging up, leaves rustling and wood groaning',
  'a forest growing in seconds, branches creaking and leaves rushing',
  'ivy spreading, a swishing rustle and twigs snapping',
  'blossoms bursting open, a rustle and soft pops')
S('sfx_crumble', 'the citadel shaking after Solmyrk',
  'a great stone building shaking and crumbling, deep rumble',
  'a castle collapsing, walls cracking and stones falling',
  'an earthquake shaking a fortress, rumbling and debris',
  'stone pillars breaking and toppling',
  'a palace crumbling, a long roar of falling masonry')
S('sfx_great_door', 'the feast hall\'s great doors',
  'enormous doors swinging open slowly with a deep groan',
  'giant golden gates creaking open, a long metallic groan',
  'massive castle doors opening, heavy wood and iron rumbling',
  'colossal doors grinding open, a deep echoing creak',
  'huge gates parting slowly, a heavy grinding boom')
S('sfx_sink', 'Muspelheim, the causeway or Asgard sinking',
  'a vast structure sinking into water, rumbling and bubbling',
  'an island sinking into the sea, a deep rumble and gurgling water',
  'a fortress collapsing into water, a huge splash and roar',
  'a ship sinking, groaning wood and rushing water',
  'land sliding into the ocean, a crashing rumble and boiling bubbles')
# ── menus ──
S('sfx_page', 'a saga panel turning',
  'an old parchment page turning, a crisp papery flip',
  'a page of an old book turned slowly',
  'a vellum page flipping, a soft rustle',
  'turning a thick paper page, a crackle',
  'a page flipped quickly, a papery swish')
S('sfx_ui_click', 'buttons',
  'a soft wooden click', 'a small wooden button tap', 'a light click of a wooden toggle', 'a muted tick', 'a soft tap on wood')
S('sfx_ui_open', 'opening a menu, the Tome or the map',
  'a leather book opening', 'a map unfolding with a paper rustle', 'a leather satchel flap opening', 'a scroll unrolling', 'a book cover opening, a soft thump')
S('sfx_ui_close', 'closing a menu',
  'a leather book closing softly', 'a map folding up', 'a book snapping gently shut', 'a scroll rolled up', 'a satchel flap closed with a pat')
S('sfx_ui_tab', 'Tome tabs and pages',
  'a quick page flip', 'a paper tab flicked', 'a light page turn', 'a card flipped over', 'a quick parchment rustle')
S('sfx_ui_equip', 'equipping gear',
  'a leather strap buckled', 'armour fastened with a clink', 'a sword slid into a scabbard', 'a belt buckle clicking shut', 'chainmail settling with a jingle')
S('sfx_ui_buy', 'shops: buying and selling',
  'coins dropped on a wooden counter', 'coins counted out on a table', 'a coin purse set down with a jingle', 'a shopkeeper\'s bell and coins', 'gold coins sliding across wood')
S('sfx_ui_error', 'a refused action',
  'a soft dull wooden knock', 'a muted low thunk', 'a quick dull buzz of a wooden block', 'a soft negative knock', 'a dull double tap')
S('sfx_ui_note', 'a notice popping up',
  'a gentle chime', 'a soft bell ding', 'a bright little ping', 'a two-note chime', 'a crystal tap')
S('sfx_ui_save', 'the game saved',
  'a quill scratching and a wax seal stamped', 'a pen scribbling then a soft thump', 'a stamp pressed into wax', 'a quill writing and a book closing', 'a seal pressed with a squish')
S('sfx_talk', 'a talk box opening',
  'a parchment scroll unrolling', 'a page turned softly', 'a soft paper rustle', 'a scroll unfurled with a flick', 'a letter unfolded')
# ── village life ──
S('sfx_kids', 'children playing after the end',
  'distant children laughing and playing outdoors, no words', 'kids giggling and running in a village, no words', 'children cheering at play far away', 'a group of children laughing in a meadow', 'kids shrieking happily in the distance')
S('sfx_sheep', 'village sheep', 'a sheep bleating', 'a lamb bleating softly', 'a few sheep baaing', 'an old ewe bleating', 'sheep calling in a field')
S('sfx_goat', 'goats', 'a goat bleating', 'a young goat calling', 'a goat\'s nasal bleat', 'two goats bleating', 'a goat bleat and bell')
S('sfx_hens', 'hens in the village', 'hens clucking', 'chickens clucking and scratching', 'a hen cackling', 'a flock of chickens clucking', 'a rooster and hens clucking')
S('sfx_feast', 'the celebration feast (a loop)',
  'a happy crowd at a feast, cheering and mugs clinking, no clear words', 'a medieval tavern celebration, laughter and toasts', 'a festive hall, people cheering and cups banging', 'a joyful crowd at a party, applause and clinking', 'a viking feast, laughter, cheers and tankards')
# ── skills ──
S('sfx_sk_sprint', 'the skill Sprint',
  'a fast burst of running feet and a rush of wind', 'a quick dash, air swooshing past', 'a speed boost, a rising whoosh', 'a sprint start, boots kicking dirt and a swish', 'running fast, wind rushing by')
S('sfx_sk_roll', 'the skill Roll',
  'a quick tumble on the ground, a thump and cloth swish', 'a dodge roll, a fast swoosh and a soft landing', 'a combat roll, a scuff and whoosh', 'rolling across grass, a rustle and thud', 'an acrobatic roll, a swish and boots landing')
S('sfx_sk_petal_step', 'the skill Petal Step',
  'a gust of wind carrying flower petals, a soft magical shimmer', 'a whirl of petals, a rustling breeze and a chime', 'a magical step in a cloud of blossoms, a swish and sparkle', 'cherry blossoms swirling, an airy whoosh', 'a flowery dash, a light rustle and twinkle')
S('sfx_sk_blink', 'the skill Blink',
  'a magic teleport blink, a quick zap and pop', 'vanishing in a flash, an electric whoosh and pop', 'a short-range teleport, a zip and shimmer', 'disappearing and reappearing, a snap and twinkle', 'a blink of light, a fast magical swoosh')
S('sfx_sk_war_stomp', 'the skill War Stomp',
  'a warrior stomping the ground, a heavy boom and shockwave', 'a ground pound, a deep thud and rumble', 'a powerful stomp, earth cracking and dust', 'a heavy boot slamming down, a booming impact', 'a war stomp, a thunderous thump and gravel')
S('sfx_sk_whirlwind', 'the skill Whirlwind',
  'a spinning sword attack, blades whooshing in a circle', 'a whirlwind of steel, repeated swishes spinning', 'a spinning slash, a swirling rush of air', 'a tornado of blades, a fast whirring whoosh', 'a 360 sword spin, wind howling around')
S('sfx_sk_shield_bash', 'the skill Shield Bash',
  'a shield slammed into an enemy, a heavy wooden bang', 'a shield bash, a metal boss clang and thud', 'a forceful shield strike, a crunching knock', 'ramming with a shield, a deep thump', 'a shield charge impact, a booming clank')
S('sfx_sk_smoke_bomb', 'the skill Smoke Bomb',
  'a smoke bomb bursting, a puff and a long hiss of smoke', 'a smoke pellet popping, a poof and swirling hiss', 'a cloud of smoke released, a soft explosion and fizz', 'a ninja smoke bomb, a pop and hiss', 'a smoke grenade, a puff and billowing hiss')
S('sfx_sk_berserker', 'the skill Berserker',
  'a warrior\'s battle rage, a heartbeat and a rising war-drum surge', 'a berserker fury, a deep growl and a pounding drum swell', 'a rage boost, a primal roar of energy and drums', 'power surging, a heavy heartbeat and a burst', 'a war cry energy surge without words, drums booming')
S('sfx_sk_second_wind', 'the skill Second Wind',
  'a deep breath of relief and a warm healing shimmer', 'a rush of fresh air and a rising chime', 'catching breath, an inhale and a bright glow sound', 'a revitalizing gust and sparkle', 'a calm inhale and a golden swell')
S('sfx_sk_time_slow', 'the skill Time Slow',
  'time slowing down, a deep stretching warp and a ticking clock slowing', 'a slow-motion effect, sounds bending down in pitch', 'a clock tick slowing and a deep warping whoosh', 'time freezing, a reverse whoosh and a low hum', 'a temporal distortion, a slowing bell tone')
S('sfx_sk_phantom_veil', 'the skill Phantom Veil',
  'turning invisible, a ghostly whoosh and a fading shimmer', 'a veil of shadow, a soft spectral swish', 'a phantom cloak, a breathy whisper fading out', 'vanishing into mist, an airy hiss', 'a ghost veil, a hollow whoosh')
S('sfx_sk_meteor', 'the skill Meteor',
  'a meteor falling from the sky, a rising whistle and a massive fiery impact', 'a flaming rock streaking down, a roaring whoosh and an explosion', 'a fireball from the sky, a descending whistle and a booming crash', 'a meteor strike, a sizzling rush and a ground-shaking blast', 'a burning comet crashing down, a whoosh and explosion')
# ── spells ──
S('sfx_sp_frost_bolt', 'casting Frost Bolt',
  'an ice bolt shooting through the air, a frosty whoosh and a crystalline crack on impact', 'a frozen spear flying, a cold hiss and ice shattering', 'an icicle launched, a whistle and a glassy crunch', 'a frost spell bolt, a crackling freeze and snap', 'a shard of ice fired, a sharp swish and a tinkling smash')
S('sfx_sp_ice_shards', 'casting Ice Shards',
  'a spray of ice shards flying, a crackle and glassy tinkles', 'many icicles shattering, a crunchy glass burst', 'ice crystals bursting outward, a sharp crackling spray', 'frozen splinters scattering, a tinkling crash', 'a volley of ice, rapid crystalline pings')
S('sfx_sp_blizzard', 'casting Blizzard',
  'a howling blizzard wind with swirling snow and ice crackle', 'a winter storm whipping up, a roaring wind and hail', 'a freezing gale, icy wind howls and crystals', 'a snowstorm spell, a swirling gust and frost crackle', 'a whiteout storm, a deep whooshing wind and icy hiss')
S('sfx_sp_tidal_wave', 'casting Tidal Wave',
  'a huge ocean wave rising and crashing down, a roaring wash', 'a tidal surge, rushing water and a massive splash', 'a wall of water breaking, a thunderous crash and foam', 'a giant wave rolling forward, a deep roar of water', 'a flood wave smashing, a heavy splash and spray')
S('sfx_sp_fireball', 'casting Fireball',
  'a fireball launched, a roaring whoosh of flame and a fiery explosion', 'a ball of fire flying, a crackling rush and a burst', 'a fire spell cast, a whump of ignition and a blast', 'a flaming projectile, a roaring swoosh and an impact boom', 'a fireball exploding, a deep whoomp and crackle')
S('sfx_sp_flame_nova', 'casting Flame Nova',
  'a ring of fire exploding outward, a roaring blast of flame', 'a burst of fire in all directions, a deep whoosh and crackle', 'a fire shockwave, a flaming roar spreading out', 'an explosion of flames, a whump and a crackling rush', 'a circle of fire erupting, a fiery boom')
S('sfx_sp_chain_lightning', 'casting Chain Lightning',
  'lightning arcing from target to target, rapid electric zaps and cracks', 'a chain of lightning bolts, crackling snaps jumping across', 'electricity leaping between enemies, buzzing zaps', 'forked lightning crackling, sharp electric snaps', 'a lightning chain, a sizzling crack repeating three times')
S('sfx_sp_thunder_step', 'casting Thunder Step',
  'a thunder teleport, a lightning crack and a thunder boom', 'stepping through lightning, a sharp zap and rumble', 'a flash of lightning and a booming thunderclap', 'an electric dash, a crackle and thunder roll', 'a thunderbolt jump, a sizzling snap and boom')
S('sfx_sp_starfall', 'casting Starfall — stars falling from the sky',
  'shooting stars falling from the night sky, a high whistling streak and a sparkling impact', 'a meteor shower of tiny stars, descending whistles and glittering chimes on landing', 'a shooting star streaking across the sky with a long airy whoosh and a twinkle', 'falling stars raining down, crystal chimes and soft starry bursts', 'a comet trail whistling down and bursting into a shower of sparkles')
S('sfx_sp_thorn_snare', 'casting Thorn Snare',
  'thorny vines bursting from the ground and wrapping tight, wood creaking', 'brambles snapping up, a rustling grab and a squeeze', 'roots erupting and tightening, a crackling groan', 'a thorn trap springing, a whip of vines and a crunch', 'twisting vines binding, a creaking tightening rustle')
S('sfx_sp_poison_mist', 'casting Poison Mist',
  'a cloud of toxic gas hissing out, a bubbling fizz', 'poison vapor spreading, a long hiss and gurgle', 'a venomous mist released, a sizzling spray', 'a toxic cloud, a bubbling cauldron hiss', 'acid fumes, a hissing and dripping sizzle')
S('sfx_sp_stone_spikes', 'casting Stone Spikes',
  'stone spikes bursting up from the earth, a cracking crunch and rumble', 'rock spears erupting, a grinding smash', 'jagged stones shooting up, a crunchy boom', 'the ground splitting into spikes, a rocky crash', 'stone pillars thrusting upward, a heavy grind and crack')
S('sfx_sp_arcane_burst', 'casting Arcane Burst',
  'a burst of arcane magic, three quick shimmering energy pulses', 'magical energy exploding, a bright crackling pop', 'an arcane blast, a whooshing surge and a sparkle', 'a mystic explosion, a resonant boom and shimmer', 'a burst of magic, a ringing zap and twinkle')
S('sfx_sp_void_orb', 'casting Void Orb',
  'a dark energy orb drifting, a deep humming throb and a whoosh', 'a black hole sphere, a low warbling hum', 'a void orb, a rumbling bass pulse and swirling hiss', 'a shadow orb flying, a dark whooshing drone', 'a gravity orb, a deep warping hum')
S('sfx_sp_void_rift', 'casting Void Rift',
  'a rift tearing open in space, a ripping crackle and a deep hum', 'a dimensional tear, a shredding whoosh and drone', 'a portal to the void opening, a dark sucking rush', 'reality ripping apart, a tearing hiss and rumble', 'a void crack opening, a distorted roar')
S('sfx_sp_spirit_drain', 'casting Spirit Drain',
  'life energy being drawn out, a ghostly sucking whoosh and whisper', 'a soul drain, a hollow inhale and a spectral moan', 'draining a spirit, a reverse whoosh and a shimmer flowing back', 'a life-steal spell, a wispy pull and a soft glow', 'a spectral drain, a breathy rushing pull')
# ── mounting ──
S('sfx_mt_horse', 'climbing onto the Horse',
  'a horse whinnying and snorting, hooves shuffling', 'a friendly horse neigh and a saddle creak', 'a horse snort and a stamp of hooves', 'a horse nickering softly', 'a horse neighing as a rider mounts, leather creaking')
S('sfx_mt_alligator', 'climbing onto the Alligator',
  'an alligator\'s deep bellow and a hiss, water sloshing', 'a crocodile grunting and splashing', 'a big reptile\'s low rumbling growl and tail splash', 'an alligator hiss and jaws clapping', 'a gator\'s throaty rumble in water')
S('sfx_mt_boar', 'climbing onto the Battle Boar',
  'a wild boar grunting and snorting eagerly', 'a pig squealing and snuffling', 'a boar\'s grunt and hooves pawing', 'a hog snorting loudly', 'a big boar\'s rumbling grunts')
S('sfx_mt_lava_unicorn', 'climbing onto the Lava Unicorn',
  'a horse whinny with crackling flames and a magical shimmer', 'a fiery horse neigh and burning embers', 'a unicorn\'s bright neigh with a fire whoosh', 'a horse snort and lava sizzle', 'a magical horse whinny and crackling fire')
S('sfx_mt_ash_salamander', 'climbing onto the Ash Dragon',
  'a dragon\'s deep rumbling growl and a puff of fire', 'a reptile dragon snorting smoke and a crackle', 'a fire lizard\'s throaty purr and embers', 'a dragon grumble and flame breath', 'a smoky dragon growl')
S('sfx_mt_dragon', 'climbing onto the Dragon',
  'a great dragon roaring and beating huge wings', 'a dragon\'s deep call and a wing flap', 'a massive dragon growl and leathery wings', 'a dragon snort of fire and wings unfolding', 'a booming dragon roar')
S('sfx_mt_sky_eagle', 'climbing onto the Sky Eagle',
  'an eagle screeching and flapping big wings', 'a giant eagle cry and a rush of wings', 'a hawk call and wings beating', 'an eagle\'s shrill scream and feathers', 'a great bird cry and wing flap')
S('sfx_mt_sky_glider', 'climbing onto the Sky Glider',
  'a glider\'s cloth wing catching the wind, a flutter and whoosh', 'a hang glider sail snapping open in the wind', 'a canvas wing flapping, an airy rush', 'wind filling a sail, a soft whoosh and flutter', 'a kite catching a gust, fabric fluttering')
S('sfx_mt_storm_drake', 'climbing onto the Storm Drake',
  'a dragon roar with crackling lightning and thunder', 'a drake call and electric zaps', 'a storm dragon growl and a thunder rumble', 'a winged beast cry with crackling sparks', 'a dragon roar and a lightning crack')
S('sfx_mt_ember_phoenix', 'climbing onto the Ember Phoenix',
  'a phoenix screech with a burst of flames', 'a fiery bird cry and a fire whoosh', 'a firebird call and crackling wings', 'a phoenix call and a roaring flame', 'a bird of fire shrieking and wings flaring')
S('sfx_mt_void_serpent', 'climbing onto the Void Serpent',
  'a giant serpent hissing with a deep dark hum', 'a snake hiss and an eerie void drone', 'a huge snake sliding with a hiss and rumble', 'a shadow serpent\'s low hiss and whoosh', 'a sea serpent hiss and a dark pulse')
