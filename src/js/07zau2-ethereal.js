// ═══════════════════════════════════════════════════════════════════════
// ║ 07zau2-ethereal.js — round 80: GENTLER, ETHEREAL SOUND EFFECTS (Kris: "the sound effects in the game so far are to harsh and
// ║ piercing. The "page turn" … sounds like a hard door slam, and when you hover and click over buttons, it's too hard and harsh …
// ║ much more gentle, somewhat ethereal to go with the epic and godly theme of the game"; L1: "remake every sound effect, but then in the
// ║ lab, i want to have these as options to choose between"; "skills should also have their own sounds"; "the sounds for not being able
// ║ to use a skill needs to be much lighter and smoother").
// ║  · ZAUD.ETH — every effect re-described the gentle, airy way; ZAUD.ETHSTYLE — what all of them share. Two takes each, saved beside
// ║    today's as <id>.e1 / <id>.e2 (tools/audio/sfx.mjs --set ethereal, tools/audio/audio2.ps1); the Lab plays today's take and both new
// ║    ones side by side and Kris picks one per effect; the intake then uses the pick.
// ║  · Skills and spells get their own sounds (sfx_sk_* / sfx_sp_*), and each mount its own call as you climb on (sfx_mt_*; Kris:
// ║    "when mounting, we should have a sound like the animal you mount") — 27z plays them once they are in.
// ║  · Until the new takes are in: the UI, page and "can't do that" sounds play softer and muffled (ZAUD.SOFT, 27z).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZAUD==='undefined')return;
  ZAUD.ETHSTYLE='gentle, ethereal fantasy game sound effect for a mythic Norse world: soft, airy and shimmering, warm and rounded, a faint magical sparkle and soft reverb tail; smooth quiet attack, never harsh, sharp, clicky or piercing; no music, no voices';
  // the skills and spells, each its own sound (Kris: "skills should also have their own sounds")
  var SK=[['sk_sprint','Sprint','a light rush of wind at the feet, quick and airy, a soft sparkle trail'],['sk_roll','Roll','a soft cloth tumble and a light swish of air'],
    ['sk_petal_step','Petal Step','a flurry of petals in a soft gust with a tiny bell-like shimmer'],['sk_blink','Blink','a soft magical pop of light vanishing and reappearing, airy shimmer'],
    ['sk_war_stomp','War Stomp','a deep soft-edged earthen thump with a rolling rumble wave, warm and round rather than sharp'],['sk_whirlwind','Whirlwind','a swirling rush of wind spinning around, airy blades of air'],
    ['sk_shield_bash','Shield Bash','a muffled wooden shield thump with a soft rune-glow chime'],['sk_smoke_bomb','Smoke Bomb','a soft puff and a hiss of drifting smoke, hushed'],
    ['sk_berserker','Berserker','a low warm drum swell rising with a breathy surge of power'],['sk_second_wind','Second Wind','a deep restful breath of air turning into a warm healing shimmer'],
    ['sk_time_slow','Time Slow','a slowing, stretching shimmer like a bell tone bending down, dreamy'],['sk_phantom_veil','Phantom Veil','a ghostly soft whoosh, a veil of whispering air fading in'],
    ['sk_meteor','Meteor','a distant star falling with a rising airy whistle and a deep soft-bloomed impact'],
    ['sp_frost_bolt','Frost Bolt','a crystal shard of ice flying with a soft tinkling chime'],['sp_ice_shards','Ice Shards','a spray of tiny ice crystals tinkling like a glass wind chime'],
    ['sp_blizzard','Blizzard','a swirling soft snowstorm wind with sparkling ice shimmer'],['sp_tidal_wave','Tidal Wave','a rising gentle wave of water swelling and washing out, airy foam'],
    ['sp_fireball','Fireball','a warm whoosh of fire and a soft rounded bloom of flame'],['sp_flame_nova','Flame Nova','a ring of warm fire blooming outward with a soft roar'],
    ['sp_chain_lightning','Chain Lightning','soft crackling sparks of light leaping from point to point, airy and bright, not harsh'],
    ['sp_thunder_step','Thunder Step','a soft thunder rumble and a quick flash of crackling light'],['sp_starfall','Starfall','a shower of falling stars twinkling down, glittering chimes'],
    ['sp_thorn_snare','Thorn Snare','vines curling up from the ground with a soft creak and rustling leaves'],['sp_poison_mist','Poison Mist','a soft bubbling hiss of drifting green mist'],
    ['sp_stone_spikes','Stone Spikes','stone points rising from the earth with a deep soft grind and a low hum'],['sp_arcane_burst','Arcane Burst','three quick soft magical pulses, shimmering'],
    ['sp_void_orb','Void Orb','a deep hollow orb of soft dark hum drifting, airy'],['sp_void_rift','Void Rift','a soft tearing shimmer of a rift opening, a low breathy hum'],
    ['sp_spirit_drain','Spirit Drain','a soft ghostly breath drawn in, a glowing whisper of light flowing back']];
  SK.forEach(function(s){ ZAUD.SFX.push(['sfx_'+s[0],'skill',s[1],s[0].indexOf('sk_')===0?'using the skill '+s[1]:'casting '+s[1],s[2],s[0]==='sp_blizzard'||s[0]==='sp_tidal_wave'?1.4:0.9,0,1,'new']); });
  // the mounts, each its own call as you climb on (Kris: "when mounting, we should have a sound like the animal you mount")
  [['horse','Horse','a horse\'s friendly whinny and a soft snort, a light shuffle of hooves'],['alligator','Alligator','a big alligator\'s low rumbling grunt and a soft hiss, water lapping'],
   ['boar','Battle Boar','a sturdy boar\'s eager snorts and a short grunt'],['lava_unicorn','Lava Unicorn','a unicorn\'s clear, bright whinny with a warm crackle of embers and a faint magical shimmer'],
   ['ash_salamander','Ash Dragon','a dragon\'s deep rumbling purr-growl with a soft crackle of embers'],['dragon','Dragon','a great dragon\'s deep, warm rumbling call and a slow beat of huge wings'],
   ['sky_eagle','Sky Eagle','a soaring eagle\'s clear cry, softened by distance, and a rush of wings'],['sky_glider','Sky Glider','a light glider sail catching the wind with a soft flutter and an airy whoosh'],
   ['storm_drake','Storm Drake','a drake\'s rolling call with soft crackling sparks of storm light'],['ember_phoenix','Ember Phoenix','a phoenix\'s bright, singing bird call with a warm whoosh of flame'],
   ['void_serpent','Void Serpent','a great serpent\'s deep breathy hiss over a low, airy, shimmering hum']].forEach(function(m){ ZAUD.SFX.push(['sfx_mt_'+m[0],'mount',m[1],'climbing onto the '+m[1],m[2],1.2,0,1,'new']); });
  ZAUD._all=null;
  // every effect, re-described the gentle way (the new skill sounds are already written so)
  ZAUD.ETH={
    sfx_step_grass:'a very soft footstep brushing through grass',sfx_step_stone:'a soft padded footstep on stone',sfx_step_wood:'a soft footstep on old wooden boards',sfx_step_water:'a light, gentle splash of a footstep in shallow water',
    sfx_sword_swing:'a clean airy sword swish with a faint ringing shimmer',sfx_sword_hit:'a soft, rounded blade strike with a faint chime, not gory',sfx_axe_swing:'a deep airy axe swoosh',sfx_axe_hit:'a soft heavy thud of an axe blow, warm and rounded',
    sfx_bow_draw:'a quiet creak of a bowstring drawn',sfx_bow_shot:'a soft bowstring thrum and an airy arrow whoosh',sfx_crossbow:'a soft wooden thunk of a crossbow, muffled',sfx_arrow_hit:'a soft dull arrow thud',
    sfx_block:'a muffled wooden shield thump with a soft shimmer',sfx_roll:'a soft cloth tumble on the ground',sfx_hurt:'a soft muffled thump on leather, gentle',sfx_fall:'a soft body falling to the grass with a light rustle',
    sfx_drink:'a small glass bottle uncorked with a soft pop and a gentle gulp, a tiny healing sparkle',sfx_eat:'a soft crunchy bite of an apple',sfx_dig:'a soft spade sliding into earth',sfx_chop:'a soft wooden chop into a log',
    sfx_fire:'a warm whoosh of fire blooming softly',sfx_frost:'crystals of ice forming with a soft glassy tinkle',sfx_lightning:'a soft crackle of bright sparks and a distant gentle rumble, never sharp',sfx_earth:'a deep soft rumble of earth rising',
    sfx_nature:'vines unfurling with a soft rustle of leaves and a gentle sparkle',sfx_water:'a gentle rolling wave of water washing out',sfx_light:'a warm soft bell-like chime with a glowing swell',sfx_dark:'a soft deep whispering hum',
    sfx_godsbane:'a vast holy beam of light rising, choir-like shimmer swelling into a deep warm bloom',sfx_mana:'a cool airy sparkle rising softly',
    sfx_nomana:'a very light, smooth, airy fizzle like a soft breath of fading sparkles — gentle and quiet, never buzzy or harsh',sfx_skill:'a quick soft whoosh with a faint magical shimmer',
    sfx_beast_growl:'a low soft animal growl, distant',sfx_beast_bite:'a soft snapping bite, muffled',sfx_slime:'a soft wet bubble plop',sfx_insect:'soft distant insect chirring',sfx_undead:'soft hollow bone clatter and a breathy moan',
    sfx_spirit_mon:'an airy ghostly whisper drifting',sfx_golem:'a deep soft grinding of stone',sfx_bird:'a distant bird call, soft and airy',sfx_serpent:'a soft long hiss',sfx_drake:'a deep distant dragon rumble-roar, rounded',
    sfx_spit:'a soft wet spit plop',sfx_summon:'a soft magical shimmer of a portal opening, airy',sfx_mon_hit:'a soft muffled hit thud',sfx_mon_armor:'a dull muffled knock on armour with a faint ring',sfx_mon_die:'a creature fading away into a soft sparkle of drifting motes',
    sfx_boss_roar:'a huge deep roar, distant and rounded with a long reverb, awe more than pain',sfx_boss_stomp:'a colossal deep soft thump shaking the ground',sfx_boss_slam:'a giant deep slam with a rolling soft rumble',sfx_boss_phase:'a dark magical surge swelling and blooming, deep and airy',
    sfx_boss_charge:'a deep hum slowly rising, airy and ominous',sfx_shield_break:'a magical barrier dissolving into a soft cascade of glassy sparkles',sfx_boss_fall:'a giant crashing down far away, a deep rumble fading into stillness',
    sfx_fam_call:'a tiny magical creature appearing with a soft twinkling chime',sfx_fam_grass:'a soft burst of leaves and a gentle vine swish',sfx_fam_water:'a soft water bubble pop',sfx_fam_earth:'a soft pebble thud',sfx_fam_fire:'a small soft puff of warm flame',
    sfx_whistle:'a soft two-note whistle, airy and kind',sfx_hooves:'soft hooves trotting on earth, steady and muffled',sfx_wings:'soft steady wingbeats, airy',
    sfx_chest:'a wooden chest opening softly with a gentle shimmer of treasure',sfx_door:'a wooden door opening softly with a gentle creak',sfx_locked:'a soft muffled rattle of a locked door',sfx_stairs:'soft footsteps on stone stairs',
    sfx_coin:'soft coins chiming like tiny bells',sfx_pickup:'a soft airy pop with a tiny sparkle',sfx_gem:'a crystal gem chime, pure and soft',sfx_waystone:'an ancient stone waking with a deep warm hum rising into a shimmering chime',
    sfx_travel:'a soft magical whoosh of light carrying you away',sfx_camp:'a short warm folk flourish on a soft lyre and a gentle frame drum',sfx_lever:'a soft heavy wooden lever, muffled',sfx_trap:'a soft muffled snap of a trap',
    sfx_rubble:'rocks tumbling softly with dust',sfx_splash:'a soft splash of water',sfx_anvil:'a hammer on an anvil, softened, with a long warm ring',sfx_lava:'soft bubbling lava, warm and deep',sfx_bell:'a soft distant village bell ringing three times, warm',
    sfx_sleep:'a soft blanket rustle and a calm dreamy chime',sfx_spirit_free:'a soft ghostly sigh rising into a bright, airy, tender chime',sfx_rune_wake:'a deep stone hum rising into a glowing, shimmering chime',sfx_line_trace:'a long soft magical shimmer travelling away, rising',
    sfx_lodestar:'a crystal staff set into stone with a deep resonant warm ring',sfx_bifrost:'a vast rainbow shimmer rising, bright, airy and wide',sfx_orbs_burst:'two great orbs of glass dissolving into a rain of glittering chimes',
    sfx_thunder:'a vast rolling thunder, deep and warm, with a crackle of light — majestic, not sharp',sfx_vines:'vines and flowers growing fast with a soft rustle and gentle magical sparkle',sfx_crumble:'a great stone hall shaking and crumbling far off, a deep soft rumble',
    sfx_great_door:'enormous golden doors swinging open slowly with a deep warm groan and a choir-like shimmer',sfx_sink:'a vast structure sinking slowly into water, deep soft rumble and bubbles',
    sfx_page:'a very soft, airy whisper of a parchment page turning with a faint magical shimmer — light and gentle, never a knock or a thud',
    sfx_ui_click:'a tiny, soft, airy tick like a dewdrop on glass, very gentle and quiet',sfx_ui_open:'a soft airy whoosh of a book opening with a faint chime',sfx_ui_close:'a soft airy book closing, a gentle fading shimmer',
    sfx_ui_tab:'a light airy flick of a page',sfx_ui_equip:'a soft leather strap fastened with a faint shimmer',sfx_ui_buy:'soft coins chiming into a pouch like tiny bells',
    sfx_ui_error:'a very soft, low, smooth breathy tone, quiet and kind — a gentle "not yet", never a buzz, knock or beep',sfx_ui_note:'a gentle airy glass chime',sfx_ui_save:'a soft quill scratch and a warm glowing chime',sfx_talk:'a soft parchment unrolling with a faint shimmer',
    sfx_kids:'distant children laughing and playing, soft and happy, no words',sfx_sheep:'a soft distant sheep bleat',sfx_goat:'a soft distant goat bleat',sfx_hens:'hens clucking softly',sfx_feast:'a warm happy feast far off, soft cheering and mugs clinking, no clear words'};
  // the request for a new (ethereal) take; today's takes keep ZAUD.request
  ZAUD.eth=function(c){ return (ZAUD.ETH[c.id]||c.words)+'. '+ZAUD.ETHSTYLE; };
  // until the new takes are in: these play softer and muffled (lowpassed) — 27z ZAHOOK.s
  ZAUD.SOFT={sfx_page:{vol:0.3,lp:1800},sfx_ui_click:{vol:0.22,lp:1600},sfx_ui_open:{vol:0.35,lp:2200},sfx_ui_close:{vol:0.35,lp:2200},sfx_ui_tab:{vol:0.3,lp:2000},sfx_ui_note:{vol:0.45,lp:3000},
    sfx_ui_error:{vol:0.25,lp:1200},sfx_nomana:{vol:0.25,lp:1400},sfx_ui_buy:{vol:0.45,lp:2600},sfx_ui_save:{vol:0.45,lp:2600},sfx_talk:{vol:0.4,lp:2200},sfx_ui_equip:{vol:0.45,lp:2400}};
})();
