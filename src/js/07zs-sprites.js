// ═══════════════════════════════════════════════════════════════════════
// ║ SPRITE LIBRARY MANIFEST (round 18) — ZSPR.
// ║ One list of every character that needs painted sprites, built from the
// ║ game's own data (rosters, kits, boss picks, familiar / fairy picks, mounts,
// ║ items), so it cannot drift from the game:
// ║   heroes (male + female) · hero on every mount · monsters · bosses and
// ║   their evolved forms · elites · NPCs · familiars · fairies and monarchs ·
// ║   animals · mounts · vehicles
// ║ For each character: the moves it must be able to show (from its kit), the
// ║ facings, the sheets to request and the full ChatGPT request per sheet.
// ║ Also the HERO MAPPING: weapon → weapon class → animation, skill → animation.
// ║ Shared with the Design Lab (Sprite Library tab) and exported by build.mjs to
// ║ sprites/requests/ for the feeding script.
// ║ Kris's answers (Oct 3): boy reference = male hero, redraw all · facings
// ║ mixed (humanoids front + side + back, others one 3/4 view mirrored) ·
// ║ straight to final sheets · pilot by hand then script · riders painted
// ║ together with their mount · rolling prepared only.
// ═══════════════════════════════════════════════════════════════════════
var ZSPR={
  QN:{0:'Village',1:'Grasslands',2:'Wetlands',3:'Highlands',4:'Ashlands',5:'Volcano',6:'Sky'},
  FACE:{f:'front',s:'side',b:'back',q:'three-quarter'},
  // which stand-in body plans count as "humanoid" (front + side + back)
  HUMANOID:{biped:1,brute:1,caster:1,person:1,wraith:1,golem:1,construct:1,chesspiece:1},
  SCALE:{small:0.5,insect:0.5,bat:0.55,wisp:0.5,firefly:0.35,swarm:0.6,blob:0.7,frog:0.7,crab:0.7,fish:0.6,book:0.6,eye:0.7,orb:0.7,bird:0.8,spider:0.9,plant:0.8,serpent:1.0,eel:1.0,turtle:1.0,quad:1.0,biped:1.0,caster:1.0,person:1.0,wraith:1.1,chesspiece:1.1,swirl:1.0,brute:1.5,golem:1.6,construct:1.5,tree:1.7,drake:1.7,kraken:1.8},

  // ── the look every request asks for (from Kris's two references) ──
  STYLE:'Art style (match the attached reference images exactly): bold hand-drawn cartoon game sprite, NOT pixel art and NOT 3D. '+
    'Thick, confident dark outlines (near-black, heavier on the outer silhouette, thinner inside). Flat cel shading with 2–3 clean tones per material, no soft gradients, no painterly texture, no noise. '+
    'Chunky chibi proportions: big head, compact body, oversized hands, boots and weapons, strong readable silhouette. '+
    'SIGNATURE: bright teal / cyan highlights (#3fe6f2) as crisp shapes on the upper-left edges of hair, fur, cloth and metal, as if lit by teal rune-light, plus a thin magenta-violet rim (#c04be0) on the lower-right shadow edges. '+
    'Magic, eyes of magical creatures, runes and enchanted weapons glow white-cyan with a soft teal halo. Saturated but limited palette. Light comes from the upper left.',
  RULES:'Rules: the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale with the feet (or lowest point) on the same ground line in each cell. '+
    'Each pose sits fully inside its own cell with clear empty space on all sides; nothing crosses into a neighbouring cell. No ground shadow, no floor, no scenery, no frame, no grid lines, no numbers, no labels, no text, no watermark.',
  BG_ALPHA:'Background: fully transparent (real alpha channel).',
  bgKey:function(col){ return 'Background: fully transparent (real alpha channel). If you cannot produce real transparency, use one flat solid '+col+' background with no texture, no gradient and no checkerboard pattern.'; },
  VIEW:{
    f:'View: seen from the front (facing the viewer), camera slightly above — a top-down RPG "walking toward the camera" view.',
    s:'View: side view facing RIGHT, camera slightly above — a top-down RPG side view (the game mirrors it for left).',
    b:'View: seen from behind (facing away from the viewer), camera slightly above — a top-down RPG "walking away" view.',
    q:'View: three-quarter view facing down-and-RIGHT, camera slightly above, like the attached centaur reference turned to face right (the game mirrors it for left).'
  },

  // ── pose words per animation (one entry per frame) ──
  POSES:{
    idle:['standing at rest, relaxed and alert','the same stance with a small breathing motion (chest raised, weight shifted)'],
    move:['movement cycle frame 1: leading limb forward, weight landing','movement cycle frame 2: limbs passing, body at its highest','movement cycle frame 3: the other limb forward, weight landing','movement cycle frame 4: limbs passing the other way'],
    float:['hovering, body tilted slightly forward','hover cycle frame 2: bobbing up, wings / trails spread','hover cycle frame 3: level, drifting','hover cycle frame 4: bobbing down, wings / trails folded'],
    still:['rooted in place, calm','rooted in place, swaying or pulsing slightly'],
    melee:['melee wind-up: weapon / claw / jaw drawn back, body coiled','melee strike: full extension at the moment of impact, with a short teal-white swing arc'],
    ranged:['ranged wind-up: aiming, the shot held ready','ranged release: the shot just let go, arm / mouth extended (do not draw the projectile)'],
    cast:['casting wind-up: gathering glowing energy, arms / antennae raised','casting release: energy bursting outward from the body in a ring of light'],
    beam:['beam charge: bracing, a bright point of light building','beam fire: braced against recoil, mouth / eye / hands blazing (do not draw the beam itself)'],
    slam:['slam wind-up: rearing up, weapon or fists raised high overhead','slam impact: crashing down into the ground, body compressed','slam recover: pushing back up, off balance'],
    sweep:['wide sweep wind-up: twisted far to one side','wide sweep: mid-swing, a long arc trailing across the front'],
    breath:['breath inhale: chest swollen, head pulled back, glow in the throat','breath exhale: head thrust forward, jaws wide open (do not draw the breath cone)'],
    grab:['grab reach: limbs / tongue / tendrils shooting forward','grab hold: clenched shut, pulling back'],
    lunge:['lunge coil: crouched low, ready to spring','lunge: stretched out flat in mid-spring'],
    charge:['charge wind-up: head lowered, pawing the ground, snorting','charge: at full sprint, head down, dust kicked up','charge crash: dazed and staggering after hitting a wall'],
    leap:['leap crouch: squashed down before the jump','leap: in the air, limbs tucked','leap landing: squashed on impact'],
    burrow:['burrowing: half sunk into the ground, earth thrown up around it','emerging: bursting up out of a mound of earth'],
    blink:['blink out: body breaking up into glowing teal motes','blink in: body re-forming out of glowing motes'],
    hide:['disguised / hidden form: looks like an ordinary harmless object or plant, eyes shut','reveal: springing out of the disguise, eyes snapping open'],
    swim:['submerged: only the top of the back and eyes above the surface line','surfacing: rising up with water streaming off'],
    perch:['perched: wings folded, watching','swoop: wings swept back in a steep dive'],
    rollup:['curled into a tight ball','rolling: the ball mid-spin with motion lines'],
    statue:['frozen like a stone statue, perfectly still, eyes dim'],
    guard:['guarding: shield / shell / armour plates raised in front, braced','guard hit: recoiling slightly as a blow glances off, sparks'],
    dodge:['dodge: leaning sharply aside, afterimage trailing'],
    explode:['swelling up, glowing brighter, about to burst','bursting apart in a flash'],
    revive:['collapsed heap of its own remains, a faint glow inside','pulling itself back together, half re-formed'],
    enrage:['enraged roar: head back, mouth wide, body flushed and bristling'],
    split:['a half-size copy of itself (drawn at half scale in the same cell)'],
    hurt:['hurt: flinching backward, eyes shut, a few white impact sparks'],
    death:['death frame 1: buckling, losing balance','death frame 2: collapsed flat on the ground, still'],
    talk:['talking: mouth open, one hand raised in a friendly gesture','talking: nodding, the other hand gesturing'],
    work:['at work, frame 1','at work, frame 2','at work, frame 3','at work, frame 4'],
    transform:['transformation: doubled over, cracks of light breaking through the body','transformation: bursting upward in a pillar of light, new shape forming'],
    ko:['knocked out: slumped and dimmed, small stars circling']
  },
  ANIM_LABEL:{idle:'Idle',move:'Move',float:'Hover',still:'Rooted idle',melee:'Melee attack',ranged:'Ranged attack',cast:'Cast',beam:'Beam',slam:'Slam',sweep:'Wide sweep',breath:'Breath',grab:'Grab',lunge:'Lunge',charge:'Charge',leap:'Leap',burrow:'Burrow',blink:'Blink',hide:'Disguise / ambush',swim:'Swim',perch:'Perch and swoop',rollup:'Roll',statue:'Statue',guard:'Guard',dodge:'Dodge',explode:'Explode',revive:'Revive',enrage:'Enrage',split:'Split copy',hurt:'Hurt',death:'Death',talk:'Talk',work:'Work',transform:'Phase change',ko:'Knocked out'},
  // animations that are only drawn once (side or 3/4 view), not per facing
  DIRLESS:{hurt:1,death:1,burrow:1,blink:1,hide:1,swim:1,rollup:1,statue:1,explode:1,revive:1,enrage:1,split:1,transform:1,ko:1,dodge:1,cast:1,leap:1,perch:1},

  // ── kit module → animation (every module used by a kit must appear here) ──
  MOD:{
    // movement
    chase:'move',lumber:'move',kite:'move',zigzag:'move',flee:'move',swap:'move',rook:'move',chessL:'leap',orbit:'move',
    still:'still',drift:'float',flit:'float',hover:'float',float:'float',
    lunge:'lunge',charge:'charge',leap:'leap',burrow:'burrow',blink:'blink',ambush:'hide',disguise:'hide',swim:'swim',perch:'perch',roll:'rollup',weeping:'statue',lure:'hide',
    // attacks
    melee:'melee',shoot:'ranged',lob:'ranged',beam:'beam',slam:'slam',sweep:'sweep',breath:'breath',grab:'grab',pull:'grab',
    ring:'cast',cloud:'cast',aura:'cast',summon:'cast',gust:'cast',drain:'cast',heal:'cast',marks:'cast',strike:'cast',trap:'cast',wall:'cast',echo:'cast',banish:'cast',
    // defences
    front:'guard',armor:'guard',bubble:'guard',reflect:'guard',dodge:'dodge',explode:'explode',revive:'revive',enrage:'enrage',split:'split',
    // no picture needed (numbers or tints only)
    tiny:null,weak:null,immune:null,thorns:null,regen:null,resist:null,ward:null,mirror:null,nullaura:null,spiritward:null,'null':null
  },
  SPEC_ANIM:{lunge:'melee',slash:'melee',dive:'melee',shoot:'ranged',spit:'ranged',cast:'cast',pulse:'cast',slam:'slam',beam:'beam',breath:'breath'},

  // the kit text of a monster. The engine replaces a kit string by its parsed form the first time it is used, so the
  // strings are remembered here (KIT_RAW, filled when this file loads and whenever a string is seen later).
  KIT_RAW:(function(){ var o={}; if(typeof MON_KIT_SRC!=='undefined')Object.keys(MON_KIT_SRC).forEach(function(k){ if(typeof MON_KIT_SRC[k]==='string')o[k]=MON_KIT_SRC[k]; }); return o; })(),
  kitOf:function(id){ var s=typeof MON_KIT_SRC!=='undefined'&&MON_KIT_SRC[id]; if(typeof s==='string'){ ZSPR.KIT_RAW[id]=s; return s; } if(ZSPR.KIT_RAW[id])return ZSPR.KIT_RAW[id];
    if(s&&typeof s==='object'){ var names=[]; (function walk(v){ if(!v)return; if(Array.isArray(v))return v.forEach(walk); if(typeof v==='object'){ if(typeof v.name==='string')names.push(v.name); Object.keys(v).forEach(function(k){ if(k!=='p'&&typeof v[k]==='object')walk(v[k]); }); } })(s); return names.join(' | '); }
    return ''; },
  kitMods:function(kit){ return String(kit||'').split('|').map(function(p){ return p.trim().split(/\s+/)[0]; }).filter(Boolean); },
  // anims a kit needs, in display order; `unknown` lists modules with no mapping (must stay empty)
  animsFromKit:function(kit,specAnim,floaty){ var need={}, unknown=[], uses={};
    ZSPR.kitMods(kit).forEach(function(m){ if(!(m in ZSPR.MOD)){ unknown.push(m); return; } var a=ZSPR.MOD[m]; if(a){ need[a]=1; (uses[a]=uses[a]||[]).push(m); } });
    if(need.float&&need.move){ uses.float=(uses.float||[]).concat(uses.move||[]); delete need.move; }   // a flier's "move" is its hover cycle
    var hasMove=need.move||need.float||need.still; if(!hasMove)need[floaty?'float':'move']=1;
    var atk=['melee','ranged','cast','beam','slam','sweep','breath','grab','lunge','charge'].some(function(a){ return need[a]; });
    if(!atk){ var sa=ZSPR.SPEC_ANIM[specAnim]||'melee'; need[sa]=1; (uses[sa]=uses[sa]||[]).push('basic attack'); }
    var order=['idle','move','float','still','melee','ranged','lunge','charge','sweep','slam','beam','breath','grab','cast','leap','burrow','blink','hide','swim','perch','rollup','statue','guard','dodge','enrage','explode','revive','split','hurt','death'];
    need.idle=1; need.hurt=1; need.death=1; if(need.still){ delete need.idle; }
    return {list:order.filter(function(a){ return need[a]; }), unknown:unknown, uses:uses}; },

  hueName:function(hex){ var v=parseInt(String(hex).replace('#',''),16), r=(v>>16&255)/255, g=(v>>8&255)/255, b=(v&255)/255, mx=Math.max(r,g,b), mn=Math.min(r,g,b), l=(mx+mn)/2, d=mx-mn, h=0;
    if(d<0.08)return l>0.8?'white':l>0.55?'light grey':l>0.3?'grey':l>0.12?'dark grey':'black';
    if(mx===r)h=((g-b)/d)%6; else if(mx===g)h=(b-r)/d+2; else h=(r-g)/d+4; h=(h*60+360)%360; var s=d/(1-Math.abs(2*l-1));
    var n=h<18?'red':h<42?(l<0.4?'brown':'orange'):h<68?(l<0.45?'olive':'yellow'):h<160?'green':h<200?'teal':h<255?'blue':h<290?'violet':h<335?'magenta':'red';
    return (l<0.28?'dark ':l>0.72?'pale ':s<0.35?'muted ':'')+n; },
  palText:function(pal){ if(!pal)return ''; var a=Array.isArray(pal)?pal:[pal.a,pal.b,pal.m,pal.g].filter(Boolean); var names=[], seen={};
    a.slice(0,4).forEach(function(c){ if(!/^#[0-9a-f]{6}$/i.test(c||''))return; var n=ZSPR.hueName(c)+' ('+c+')'; if(!seen[n]){ seen[n]=1; names.push(n); } }); return names.length?'Main colours: '+names.join(', ')+'.':''; },
  keyCol:function(pal){ var a=Array.isArray(pal)?pal:(pal?[pal.a,pal.b]:[]), green=0; a.slice(0,3).forEach(function(c){ if(/green|olive/.test(ZSPR.hueName(c||'#000000')))green++; }); return green?'blue #0000FF':'green #00FF00'; },

  // ════ HERO ═══════════════════════════════════════════════════════════
  HERO:{
    LOOK:{
      m:'the hero boy from reference image 1: a young adventurer with spiky tousled brown hair streaked with teal highlights, big teal eyes, a moss-green hooded short cape with a brown shoulder strap, a cream tunic, a brown leather belt with a square silver buckle and pouches, grey-olive trousers, big tan leather boots and bare forearms with wrist wraps',
      f:''   // filled below from GIRL_LOOKS[GIRL_PICK]
    },
    NAME:{m:'Hero (boy)',f:'Hero (girl)'},
    // The girl (round 19): Kris wants her clearly different from the boy — long braided auburn hair plus other features.
    // Three looks to generate and compare in the Lab; GIRL_PICK is the one every other girl sheet is built on.
    GIRL_BASE:'the hero girl: a young adventurer the same age, height and chibi proportions as the hero boy in reference image 1, drawn in exactly the same style, with big teal eyes and LONG BRAIDED AUBURN (red-brown) hair streaked with teal highlights. ',
    GIRL_LOOKS:{
      a:{name:'Ranger',tag:'One long braid down her back, wine-red hooded cape, skirted tunic',look:'Hair: one long thick braid hanging down her back to the waist, tied at the end with a teal ribbon, with side-swept bangs and a small white feather tucked behind one ear. Freckles across the nose. Outfit: a wine-red hooded short cape with a brown shoulder strap, a cream tunic that flares into a short split skirt over dark grey leggings, a brown leather belt with a round silver buckle and one pouch, a quiver strap across the chest, and tall laced tan boots.'},
      b:{name:'Shieldmaiden',tag:'Two long braids, braided headband with a teal gem, fur-trimmed teal mantle',look:'Hair: two long braids falling in front of her shoulders to the waist, each closed with a silver bead clasp, and a braided leather headband with a small glowing teal gem at the brow. Outfit: a short deep teal-blue mantle with a pale fur collar, fastened at the shoulder with a round silver knotwork brooch; a sleeveless padded cream tunic with a band of wine-red knotwork along the hem, worn over a long-sleeved grey shirt; leather bracers; a wide belt with a square silver buckle; grey-olive trousers and wrapped boots with fur cuffs.'},
      c:{name:'Wayfinder',tag:'One long side braid with flowers, long trailing wine-red scarf, cropped jacket',look:'Hair: one very long side braid over her left shoulder reaching the hip, woven with teal thread and three tiny white flowers, with loose bangs. Outfit: no cape — instead a long wine-red scarf wrapped around the neck with both ends trailing behind her; a cropped moss-green jacket with rolled sleeves over a cream tunic; fingerless brown gloves; a leather satchel worn across the body; a glowing teal rune pendant; dark grey trousers tucked into knee-high tan boots with turned-down cuffs.'}
    },
    GIRL_LOCKED:true,
    GIRL_PICK:'b',   // Kris, Oct 4: lock look B (Shieldmaiden). hero_f.model.png is a copy of hero_f.model_b.png.
    // weapon classes: which animation a held item uses  (LOOK.f is set right after this object is built)
    WCLASS:{sword:{label:'Sword',anim:'melee_sword',held:'a short straight sword with a teal-glowing edge'},
            axe:{label:'Battle axe',anim:'melee_axe',held:'a broad single-bladed battle axe with a teal-glowing edge'},
            bow:{label:'Bow',anim:'ranged_bow',held:'a wooden recurve bow'},
            xbow:{label:'Crossbow',anim:'ranged_xbow',held:'a compact wooden crossbow with iron fittings'},
            staff:{label:'Staff',anim:'magic_staff',held:'a tall wooden staff topped with a glowing teal crystal'},
            wand:{label:'Wand',anim:'magic_wand',held:'a short carved wand with a glowing teal tip'},
            hand:{label:'Bare-hand spell',anim:'magic_hand',held:'no weapon, an open hand wreathed in teal light'},
            shield:{label:'Shield',anim:'block',held:'a round wooden shield with an iron rim and a teal rune'}},
    weaponClass:function(itemId){ var it=typeof ITEMS!=='undefined'&&ITEMS[itemId], id=String(itemId||''); if(!it)return null;
      if(it.slot==='lHand')return /axe|cleaver/.test(id)?'axe':'sword';
      if(it.slot==='rHand')return /crossbow/.test(id)?'xbow':'bow';
      if(it.slot==='mWeapon')return /wand/.test(id)?'wand':'staff';
      if(it.slot==='shield')return 'shield'; return null; },
    ELEMENT_GLOW:{fire:'#ff8a2a',ice:'#9fe2ff',light:'#ffe86a',all:'#ffffff','':'#3fe6f2'},
    // every hero animation: frames, whether it is drawn per facing, and the pose words
    ANIMS:{
      idle:{n:2,label:'Idle',p:['standing ready, hands relaxed, {held}','the same stance with a small breathing motion, cape shifting']},
      walk:{n:4,label:'Walk',p:['walk cycle frame 1: left foot forward, landing','walk cycle frame 2: feet passing, body at its highest','walk cycle frame 3: right foot forward, landing','walk cycle frame 4: feet passing the other way']},
      run:{n:2,label:'Run / Sprint',p:['sprint frame 1: leaning far forward, long stride, cape streaming back','sprint frame 2: the opposite stride, both feet off the ground']},
      melee_sword:{n:4,label:'Sword attack',held:'sword',p:['sword ready: blade held low at the side','sword wind-up: blade pulled back over the shoulder, body twisted','sword slash: blade at full extension, a wide teal-white arc','sword follow-through: blade swung past, weight on the front foot']},
      melee_axe:{n:4,label:'Battle axe attack',held:'axe',p:['axe ready: both hands on the haft, axe head low','axe wind-up: axe raised high overhead with both hands','axe chop: axe head driving down in front, a heavy teal-white arc','axe follow-through: axe head buried low, body bent over it']},
      ranged_bow:{n:4,label:'Bow shot',held:'bow',p:['bow nock: arrow set on the string, bow lowered','bow draw: string pulled to the cheek, aiming','bow release: string snapped forward, arrow just gone (do not draw the arrow in flight)','bow recover: bow lowered, reaching for the quiver']},
      ranged_xbow:{n:4,label:'Crossbow shot',held:'xbow',p:['crossbow aim: stock at the shoulder, sighting','crossbow fire: recoil kick, a small flash at the bow (do not draw the bolt in flight)','crossbow lower: weapon tipped down','crossbow reload: pulling the string back with one hand']},
      magic_staff:{n:4,label:'Staff spell',held:'staff',p:['staff ready: staff upright in one hand','staff gather: staff raised, crystal blazing, free hand open','staff cast: staff thrust forward, a burst of teal light at the crystal','staff recover: staff swept down, sparks fading']},
      magic_wand:{n:2,label:'Wand spell',held:'wand',p:['wand flick wind-up: wand drawn back beside the head, tip glowing','wand cast: wand snapped forward, a teal spark leaping from the tip']},
      magic_hand:{n:2,label:'Bare-hand spell',held:'hand',p:['spell gather: one open hand raised, light pooling in the palm','spell cast: palm thrust forward, light bursting from it']},
      block:{n:2,label:'Shield block',held:'shield',p:['shield raise: shield brought up in front, knees bent','shield braced: crouched behind the shield, a blow glancing off in white sparks']},
      roll:{n:3,label:'Roll',p:['roll start: diving forward, arms reaching','roll tuck: curled into a ball mid-roll, motion lines','roll finish: rising in a low crouch']},
      shieldbash:{n:3,label:'Skill · Shield Bash',held:'shield',p:['shield bash brace: shield forward, shoulder behind it','shield bash charge: sprinting behind the shield, speed lines','shield bash hit: shield slammed forward, a white impact star']},
      // drawn once, in the side view
      war_stomp:{n:3,d:1,label:'Skill · War Stomp',p:['war stomp: one knee raised high','war stomp: foot crashing down, ground cracking in a teal ring','war stomp: braced in the crater, dust settling']},
      whirlwind:{n:4,d:1,label:'Skill · Whirlwind',held:'sword',p:['whirlwind frame 1: spinning, blade out to the right','whirlwind frame 2: back turned, blade out behind','whirlwind frame 3: blade out to the left','whirlwind frame 4: facing forward again, a full teal ring of motion']},
      smokebomb:{n:1,d:1,label:'Skill · Smoke Bomb',p:['smoke bomb: arm whipped down, a small bomb bursting at the feet']},
      blink:{n:2,d:1,label:'Skill · Blink',p:['blink out: body breaking into teal motes','blink in: body re-forming from teal motes']},
      berserker:{n:2,d:1,label:'Skill · Berserker',p:['berserker: head thrown back in a roar, fists clenched','berserker stance: crouched, eyes blazing red-orange, a fiery aura']},
      secondwind:{n:2,d:1,label:'Skill · Second Wind',p:['second wind: one hand on the chest, eyes closed','second wind: arms opening, green-gold light rising around the body']},
      timeslow:{n:2,d:1,label:'Skill · Time Slow',p:['time slow: both hands pressed together','time slow: hands thrown apart, a pale clock-like ring of light spreading']},
      phantom:{n:2,d:1,label:'Skill · Phantom Veil',p:['phantom veil: pulling the hood up, body turning translucent','phantom form: a pale see-through ghost of the hero outlined in teal']},
      meteor:{n:3,d:1,label:'Skill · Meteor Strike',p:['meteor call: one arm pointing at the sky','meteor call: arm sweeping down, eyes glowing orange','meteor impact pose: shielding the face from a blast, hair blown back']},
      death:{n:3,d:1,label:'Defeat',p:['defeat frame 1: staggering, weapon dropped','defeat frame 2: falling to the knees','defeat frame 3: lying on the ground, still']},
      drink:{n:2,d:1,label:'Drink potion',p:['uncorking a small red potion bottle','head tipped back, drinking']},
      eat:{n:1,d:1,label:'Eat',p:['taking a bite of bread']},
      cheer:{n:2,d:1,label:'Level up / victory',p:['fist raised in triumph','jumping with both arms up, sparkles']},
      rest:{n:1,d:1,label:'Rest at a campfire',p:['sitting cross-legged, warming the hands']},
      hurt:{n:1,d:1,label:'Hurt',p:['hurt: flinching back, eyes shut, white impact sparks']},
      pickup:{n:1,d:1,label:'Pick up / use',p:['reaching out with one hand to take or use something']}
    },
    // hero sheets: per facing (f, s, b) …
    SHEETS_DIR:[['move','Movement',['idle','walk','run']],['melee','Sword and battle axe',['melee_sword','melee_axe']],['ranged','Bow and crossbow',['ranged_bow','ranged_xbow']],
                ['magic','Staff, wand and bare-hand spells',['magic_staff','magic_wand','magic_hand']],['defend','Shield block, roll and Shield Bash',['block','roll','shieldbash']]],
    // … and once, in the side view
    SHEETS_ONE:[['skills_a','Skills: War Stomp, Whirlwind, Smoke Bomb',['war_stomp','whirlwind','smokebomb']],['skills_b','Skills: Blink, Berserker, Second Wind, Time Slow',['blink','berserker','secondwind','timeslow']],
                ['skills_c','Skills: Phantom Veil, Meteor; defeat',['phantom','meteor','death']],['misc','Potion, food, cheer, rest, hurt, pick up',['drink','eat','cheer','rest','hurt','pickup']]],
    // game action → animation (what the mapping table in the Lab shows, and what the game will ask for)
    SKILL_ANIM:{sp_sprint:'run',sp_roll:'roll',sp_blink:'blink',sp_war_stomp:'war_stomp',sp_whirlwind:'whirlwind',sp_smokebomb:'smokebomb',sp_shieldbash:'shieldbash',sp_berserker:'berserker',sp_secondwind:'secondwind',sp_phantom:'phantom',sp_timeslow:'timeslow',sp_meteor:'meteor'},
    // today's stand-in for each animation (frames that already exist in the game)
    LEGACY:{idle:'walk',walk:'walk',run:'walk',melee_sword:'attack',melee_axe:'attack',ranged_bow:'bow',ranged_xbow:'bow',magic_staff:'attack',magic_wand:'attack',magic_hand:'attack',block:'walk',roll:'walk',shieldbash:'attack'},
    BOSS_BASE:{bf_drakeling:'rock_dragon',bf_forge_guardian:'iron_sentinel',bf_shadow_twin:'shadow_lord'},
    // which animation the hero plays for an action, given what is equipped
    animFor:function(ps,action,arg){ var eq=(ps&&ps.equipped)||{}, H=ZSPR.HERO, c;
      if(action==='melee'){ c=H.weaponClass(eq.lHand)||'sword'; return H.WCLASS[c].anim; }
      if(action==='ranged'){ c=H.weaponClass(eq.rHand)||'bow'; return H.WCLASS[c].anim; }
      if(action==='spell'){ c=H.weaponClass(eq.mWeapon)||'hand'; return H.WCLASS[c].anim; }
      if(action==='block')return 'block';
      if(action==='skill')return H.SKILL_ANIM[arg||eq.special]||'cheer';
      return H.ANIMS[action]?action:'idle'; },
    // atlas frame name for a hero animation: hero_<m|f>/<anim>/<facing>/<index>
    frame:function(who,anim,facing,i){ var A=ZSPR.HERO.ANIMS[anim]; return 'hero_'+who+'/'+anim+'/'+(A&&A.d?'s':facing)+'/'+i; }
  },

  // ════ ANIMALS (their data lives in the world scene, so they are listed here) ══
  ANIMALS:[
    ['rabbit','Rabbit',1,0.3,'A small brown meadow rabbit with a white tail and long ears.',0],['butterfly','Butterfly',1,0.2,'A bright yellow-and-teal butterfly.',1],
    ['frog','Marsh Frog',2,0.3,'A plump green marsh frog with yellow eyes.',0],['heron','Heron',2,0.7,'A tall grey-blue heron with a long neck and yellow beak.',0],
    ['goat','Mountain Goat',3,0.6,'A shaggy white mountain goat with short curved horns.',0],['lizard','Rock Lizard',3,0.3,'A small sand-coloured lizard with a teal stripe down its back.',0],
    ['fire_imp_critter','Ember Imp (critter)',4,0.4,'A tiny mischievous imp of orange flame with coal-black hands.',1],['ash_crow','Ash Crow',4,0.4,'A soot-black crow with glowing orange eyes and ember-tipped wings.',1],
    ['deer','Deer',1,1.1,'A graceful red-brown deer with a pale belly; the stag has small antlers.',0,1],['boar','Wild Boar',1,1.0,'A stocky dark-brown wild boar with short tusks and a bristled spine.',0,1],
    ['crocodile','Crocodile',2,1.3,'A long low green crocodile with a ridged back and a pale jaw.',0,1],['swamp_bear','Swamp Bear',2,1.5,'A heavy dark-brown bear with moss on its shoulders and wet fur.',0,1],
    ['highland_ram','Highland Ram',3,1.0,'A sturdy cream-coloured ram with huge curled horns.',0,1],['cave_bear','Cave Bear',3,1.6,'A huge grey-brown cave bear with a pale muzzle and long claws.',0,1],
    ['lava_wyrm','Lava Wyrm',4,1.1,'A low orange-red lizard-wyrm with cracked black scales and molten light between them.',0,1],['ash_titan','Ash Titan',4,1.8,'A hulking ape-like beast of dark ash-grey stone and fur with ember eyes.',0,1]
  ],
  VEHICLES:[['boat','Sailing boat','a small wooden sailing boat with a cream sail and a teal rune painted on the bow, sailing on open water',['idle','move']],
            ['sky_ship','Sky skiff','a small flying wooden skiff with canvas wings, a brass propeller and a dart launcher on the prow',['idle','move','ranged']]],

  // ── build the list ───────────────────────────────────────────────────
  _all:null,
  all:function(){ if(ZSPR._all)return ZSPR._all; var L=[], Z=ZSPR, H=Z.HERO;
    var push=function(e){ e.facings=e.facings||(e.humanoid?['s','f','b']:['q']); e.wave=e.wave===undefined?(e.q||0)+2:e.wave; L.push(e); };
    // heroes
    ['m','f'].forEach(function(w){ push({id:'hero_'+w,group:'hero',sub:'Playable heroes',name:H.NAME[w],q:0,look:H.LOOK[w],scale:1,humanoid:true,hero:w,wave:1}); });
    // hero on each mount (painted together)
    if(typeof MOUNTS!=='undefined')Object.keys(MOUNTS).forEach(function(k){ var C=typeof CHAR_BY_ID!=='undefined'&&CHAR_BY_ID['mt_'+k], M=MOUNTS[k];
      ['m','f'].forEach(function(w){ push({id:'ride_'+w+'_'+k,group:'rider',sub:'Hero on a mount',name:H.NAME[w]+' on '+(M.n||k),q:M.sec||0,scale:1.6,rider:w,mount:k,
        look:H.LOOK[w]+', riding this mount: '+((C&&C.look)||('a '+(M.n||k)))+' The hero sits in the saddle holding the reins.',pal:C&&C.spec&&C.spec.pal,facings:['x'],flying:/sky|drake|phoenix|eagle|glider|void|dragon$/.test(k),wave:1.5}); }); });
    // monsters
    if(typeof MON_ROSTER!=='undefined')MON_ROSTER.forEach(function(R){ var plan=R.spec&&R.spec.plan; push({id:R.id,group:'monster',sub:Z.QN[R.q]+' · '+({main:'mainland',dun:'dungeon',tow:'tower'}[R.seg]||R.seg),name:R.name,q:R.q,seg:R.seg,
      look:R.look,moveTxt:R.move,atkTxt:R.atk,defTxt:R.def,spTxt:R.sp,pal:R.spec&&R.spec.pal,plan:plan,specAnim:R.spec&&R.spec.anim,kit:Z.kitOf(R.id),humanoid:!!Z.HUMANOID[plan],scale:Z.SCALE[plan]||1}); });
    // bosses, evolved forms, wardens, mage masters, island and volcano bosses, elites
    if(typeof BOSS_SLOT_LIST!=='undefined')BOSS_SLOT_LIST.forEach(function(slot){ var opt=(typeof BOSS_PICK!=='undefined'&&BOSS_PICK[slot])||'a', D=(typeof BOSS_ART!=='undefined'&&BOSS_ART[slot+'.'+opt])||{}, C=typeof CHAR_BY_ID!=='undefined'&&CHAR_BY_ID[slot];
      var q=Z.bossQ(slot,D,C);
      var kit=Z.bossKit(slot), sub=/^elite/.test(slot)?'Elites':/^bf_/.test(slot)?'Evolved boss forms':/^cw_/.test(slot)?'Castle wardens':/^mg_/.test(slot)?'Mage-tower masters':/^boss_isl/.test(slot)?'Island guardians':/^boss_v/.test(slot)?'Volcano bosses':'Guardians';
      push({id:slot,group:'boss',sub:sub,name:D.name||(C&&C.name)||slot,q:q,look:D.lore||(C&&C.look)||'',atkTxt:C&&C.doing,pal:D.pal||(C&&C.spec&&C.spec.pal),arch:D.arch,
        gear:['head','gear','weapon','off','armor','cape','beast','build'].filter(function(k){ return D[k]&&D[k]!==true; }).map(function(k){ return k+': '+D[k]; }).join(', '),
        kit:kit,specAnim:C&&C.spec&&C.spec.anim,humanoid:D.arch==='hum'||(!D.arch&&C&&!!Z.HUMANOID[C.spec&&C.spec.plan]),scale:Math.round(((D.h||110)/42)*10)/10,big:true,form:/^bf_/.test(slot),wave:(q||5)+2.5}); });
    // NPCs
    if(typeof CHAR_ROSTER!=='undefined')CHAR_ROSTER.forEach(function(C){ if(C.cat!=='npc')return; var walker=/Village folk/.test(C.sub);
      push({id:C.id,group:'npc',sub:C.sub,name:C.name,q:0,look:C.look,doing:C.doing,where:C.where,pal:C.spec&&C.spec.pal,humanoid:true,scale:/kid|child/.test(C.spec&&C.spec.feat||'')?0.75:/dwarf/.test(C.spec&&C.spec.feat||'')?0.85:1,npc:true,walker:walker,trade:C.spec&&C.spec.anim,facings:['f'],wave:2}); });
    // mounts on their own (parked, or waiting at the stables)
    if(typeof CHAR_ROSTER!=='undefined')CHAR_ROSTER.forEach(function(C){ if(C.cat!=='mount')return; var k=C.id.replace(/^mt_/,'');
      push({id:C.id,group:'mount',sub:C.sub,name:C.name,q:0,look:C.look+' Saddled, no rider.',moveTxt:C.doing,pal:C.spec&&C.spec.pal,scale:1.6,facings:['x'],flying:/sky|drake|phoenix|eagle|glider|void|dragon$/.test(k),wave:1.5}); });
    // familiars (the picked spirit per element)
    if(typeof FAMILIAR_PICK!=='undefined')Object.keys(FAMILIAR_PICK).forEach(function(el){ var S=SPIRIT_BY_ID[FAMILIAR_PICK[el]]; if(!S)return;
      push({id:'fam_'+el,group:'familiar',sub:'Elemental spirits',name:S.name+' ('+el+' spirit)',q:0,look:S.blurb||S.tagline,el:el,scale:(S.sz||1)*0.7,skills:(typeof FAM_SKILLS!=='undefined'&&FAM_SKILLS[el])||[],wave:2}); });
    // fairies and monarchs
    if(typeof FAIRY_PICK!=='undefined')Object.keys(FAIRY_PICK).forEach(function(q){ (FAIRY_PICK[q]||[]).forEach(function(fid){ var F=FAIRY_BY_ID[fid]; if(!F)return;
      push({id:'fairy_'+fid,group:'fairy',sub:Z.QN[q]+' fairies',name:F.name,q:+q,look:F.look,pal:[F.col,F.col2],scale:0.4}); }); });
    if(typeof FAIRY_MONARCH_PICK!=='undefined')Object.keys(FAIRY_MONARCH_PICK).forEach(function(q){ var M=FAIRY_MONARCH_BY_ID[FAIRY_MONARCH_PICK[q]]; if(!M)return;
      push({id:'monarch_'+M.id,group:'fairy',sub:'Fairy monarchs',name:M.name+', '+M.title,q:+q,look:M.look,pal:[M.robe,M.wc,M.glow],scale:1.2,monarch:true}); });
    // animals
    Z.ANIMALS.forEach(function(a){ push({id:'animal_'+a[0],group:'animal',sub:(a[6]?'Large animals':'Small animals')+' · '+Z.QN[a[2]],name:a[1],q:a[2],look:a[4],scale:a[3],floaty:!!a[5],large:!!a[6]}); });
    // vehicles (with the hero aboard, one per hero)
    Z.VEHICLES.forEach(function(v){ ['m','f'].forEach(function(w){ push({id:'veh_'+w+'_'+v[0],group:'vehicle',sub:'Vehicles',name:H.NAME[w]+' in the '+v[1].toLowerCase(),q:v[0]==='sky_ship'?6:0,look:v[2]+', with '+H.LOOK[w]+' aboard at the tiller',vanims:v[3],scale:2,facings:['x'],wave:8}); }); });
    L.forEach(function(e){ e.anims=Z.animsOf(e); e.sheets=e.group==='boss'?[]:Z.sheetsOf(e); });
    // bosses share sheets: 8 different bosses per sheet (4 × 2), one 3/4 pose each, grouped by region
    var B=L.filter(function(e){ return e.group==='boss'; }).sort(function(a,b){ return (a.q-b.q)||0; }), per=8;
    for(var i=0;i<B.length;i+=per){ var set=B.slice(i,i+per), n=Math.floor(i/per)+1, id='bosses.'+n, cols=set.length<=4?set.length:4, rows=Math.ceil(set.length/cols);
      var sh={id:id,key:'set',title:'Boss set '+n+' ('+set.length+' bosses, one pose each)',facing:'q',cols:cols,rows:rows,size:'1536x1024',tier:'core',multi:true,
        poses:set.map(function(e){ return {a:'idle',i:0,f:'q',ch:e.id,scale:e.scale,t:e.name+' — '+String(e.look||'').replace(/\s*\([^)]*\)/g,'').replace(/\s+/g,' ').trim().replace(/\.$/,'')+(e.gear?'. Details: '+e.gear:'')+'. '+Z.palText(e.pal).replace(/\.$/,'')}; })};
      set.forEach(function(e,k){ e.inSheet=id; e.sheetPos=k+1; }); set[0].sheets=[sh]; set[0].setWave=Math.min.apply(null,set.map(function(e){ return e.wave; })); }
    return (ZSPR._all=L); },

  bossQ:function(slot,D,C){ var m; if((m=/^elite_(\d)/.exec(slot)))return +m[1]; if(/^boss_vr|volcano/.test(slot))return 5; if((m=/^boss_isl_(\d)/.exec(slot)))return +m[1];
    var cw=['thorn_knight','sun_baron','mill_ogre','lotus_naga','drowned_abbot','mangrove_chief','forge_thane','frost_queen','roc_lord','obsidian_jailer','ember_priest','bone_king'].indexOf(slot.replace(/^cw_/,'')); if(/^cw_/.test(slot)&&cw>=0)return Math.floor(cw/3)+1;
    var base=ZSPR.HERO.BOSS_BASE[slot]||slot.replace(/^(boss|bf)_/,'').replace(/_\d+$/,''); if(typeof BOSS_PHASES!=='undefined'&&BOSS_PHASES[base]&&BOSS_PHASES[base].q)return BOSS_PHASES[base].q;
    var w=(C&&C.where)||''; return /Grass/.test(w)?1:/Wet/.test(w)?2:/High/.test(w)?3:/Ash/.test(w)?4:0; },
  // a boss slot's kit: its own entry, its phase entry, or its monster record
  bossKit:function(slot){ var k=ZSPR.kitOf(slot); if(k)return k; var out=[];
    if(typeof BOSS_PHASES!=='undefined')Object.keys(BOSS_PHASES).forEach(function(b){ (BOSS_PHASES[b].phases||[]).forEach(function(P){ if(P&&P.form===slot&&P.kit)out.push(P.kit); }); if('boss_'+b===slot&&ZSPR.kitOf(b))out.push(ZSPR.kitOf(b)); });
    if(!out.length&&typeof MON_BY_ID!=='undefined')Object.keys(MON_BY_ID).forEach(function(rid){ var M=MON_BY_ID[rid]; if(M&&M.chId===slot&&ZSPR.kitOf(rid))out.push(ZSPR.kitOf(rid)); });
    return out.join(' | '); },

  // ── which animations a character needs ──
  // Frame counts: monsters idle 1 · move 4 · each attack 2 (slam 3) · hurt 1; they die with the game's own flash-and-dissolve, so no death frames.
  // Bosses also get idle 2, a phase roar, a phase change and death frames.
  animsOf:function(e){ var Z=ZSPR, A=[], add=function(k,n,why,extra){ A.push(Object.assign({k:k,n:n||(Z.POSES[k]||[]).length||1,label:Z.ANIM_LABEL[k]||k,why:why||'',d:!!Z.DIRLESS[k]},extra||{})); };
    if(e.group==='hero'){ var H=Z.HERO; Object.keys(H.ANIMS).forEach(function(k){ var a=H.ANIMS[k]; A.push({k:k,n:a.n,label:a.label,d:!!a.d,why:'',hero:true}); }); return A; }
    if(e.group==='rider'||e.group==='mount'){ var fl=e.flying, lb=e.group==='rider'?'Ride':'Move'; add('ride_side',4,fl?'flying, side view':'trotting, side view',{label:lb+' · side'}); add('ride_front',2,'toward the camera',{label:lb+' · front'}); add('ride_back',2,'away from the camera',{label:lb+' · back'}); return A; }
    if(e.group==='npc'){ add('idle',2); add('talk',2,'when you speak to them'); add('work',4,e.doing||'their trade',{label:'Work: '+(e.trade||'trade')}); if(e.walker)add('move',4,'walks around the village'); return A; }
    if(e.group==='familiar'){ add('float',4,'follows the hero'); add('ranged',2,'base skill'); add('cast',1,'specials: '+(e.skills||[]).map(function(s){ return s.name; }).join(', ')); add('ko',1,'knocked out in a fight'); return A; }
    if(e.group==='fairy'){ add('float',4,'hovers and flutters'); add('talk',2,'gives its quest'); add('cast',2,e.monarch?'grants a familiar slot':'blesses your familiar'); return A; }
    if(e.group==='animal'){ add('idle',2); add(e.floaty?'float':'move',4,'wanders, and flees when you come close'); if(e.large)add('melee',2,'fights back when cornered'); return A; }
    if(e.group==='vehicle'){ (e.vanims||[]).forEach(function(k){ add(k,k==='move'?4:2); }); return A; }
    // monsters and bosses: from the kit
    if(e.group==='boss'){ add('idle',1,'one painted pose; the game moves it (sway, stride, lunge, flash), as it does today'); return A; }   // Kris, Oct 4: bosses are repainted as one pose each
    var boss=false, floaty=/wisp|bat|bird|insect|firefly|eye|orb|swarm|book|swirl/.test(e.plan||'')||/orb|bird|wyvern/.test(e.arch||'');
    var R=Z.animsFromKit(e.kit,e.specAnim,floaty); e.unknown=R.unknown;
    R.list.forEach(function(k){ if(k==='death'&&!boss)return; add(k,k==='idle'&&!boss?1:0,(R.uses[k]||[]).join(', ')); });
    if(boss){ if(!A.some(function(a){ return a.k==='cast'; }))add('cast',2,'attack patterns (rain, walls, bursts)'); if(!A.some(function(a){ return a.k==='enrage'; }))add('enrage',1,'phase roar'); add('transform',2,e.form?'arrives in this form':'changes to the next phase'); }
    // order: idle, movement, the main attack, hurt — then everything else (so the first sheet is the one the game needs most)
    var mv=A.filter(function(a){ return /^(move|float|still)$/.test(a.k); }), atk=A.filter(function(a){ return /^(melee|ranged|lunge|charge|sweep|slam|beam|breath|grab|cast)$/.test(a.k); }), first=atk[0];
    var head=A.filter(function(a){ return a.k==='idle'; }).concat(mv,first?[first]:[],A.filter(function(a){ return a.k==='hurt'; })), rest=A.filter(function(a){ return head.indexOf(a)<0&&a.k!=='death'; }).concat(A.filter(function(a){ return a.k==='death'; }));
    if(first)first.main=true; return head.concat(rest); },

  // ── pack animations into sheets of up to `cap` poses ──
  sheetsOf:function(e){ var Z=ZSPR, out=[], cap=8;
    var mk=function(key,title,facing,poses){ var n=poses.length, cols=n<=3?n:n<=4?2:n<=6?3:4, rows=Math.ceil(n/cols); if(n===4){ cols=e.big?2:4; rows=e.big?2:1; }
      out.push({id:e.id+'.'+key+(facing&&facing!=='x'?'.'+facing:''),key:key,title:title,facing:facing,poses:poses,cols:cols,rows:rows,size:(cols>=rows*1.4?'1536x1024':rows>cols?'1024x1536':'1024x1024')}); };
    if(e.group==='hero'){ var H=Z.HERO;
      // model sheet first: the reference every other request for this hero is built on
      mk('model','Model sheet (front, side, back)','x',[{a:'model',i:0,t:'standing, seen from the FRONT'},{a:'model',i:1,t:'standing, side view facing RIGHT'},{a:'model',i:2,t:'standing, seen from BEHIND'}]);
      ['s','f','b'].forEach(function(f){ H.SHEETS_DIR.forEach(function(S){ var P=[]; S[2].forEach(function(k){ var a=H.ANIMS[k]; a.p.forEach(function(t,i){ P.push({a:k,i:i,t:t.replace('{held}','')}); }); }); mk(S[0],S[1],f,P); }); });
      H.SHEETS_ONE.forEach(function(S){ var P=[]; S[2].forEach(function(k){ var a=H.ANIMS[k]; a.p.forEach(function(t,i){ P.push({a:k,i:i,t:t}); }); }); mk(S[0],S[1],'s',P); });
      return out; }
    if(e.group==='rider'||e.group==='mount'){ var fl=e.flying, w=fl?'wing-beat':'trot', rd=e.group==='rider';
      mk('ride',rd?'Riding (side, front, back)':'Moving (side, front, back)','x',[0,1,2,3].map(function(i){ return {a:'ride_side',i:i,t:'side view facing RIGHT, '+w+' cycle frame '+(i+1)+' of 4'}; })
        .concat([0,1].map(function(i){ return {a:'ride_front',i:i,t:'seen from the FRONT, coming toward the camera, '+w+' frame '+(i+1)+' of 2'}; }),[0,1].map(function(i){ return {a:'ride_back',i:i,t:'seen from BEHIND, going away from the camera, '+w+' frame '+(i+1)+' of 2'}; }))); return out; }
    // everyone else. Sheet 1 (side or 3/4 view) is the CORE sheet. Humanoids add one FRONT + BACK sheet (idle, 2 steps, the main attack for each).
    // Anything beyond that (extra attacks, special moves, boss phase changes) goes on EXTRA sheets, requested in a second pass.
    var poseOf=function(a,facing){ var base=Z.POSES[a.k]||[a.label]; var arr=[]; for(var i=0;i<a.n;i++)arr.push({a:a.k,i:i,f:facing,t:(a.k==='work'?('at work ('+(e.doing||e.trade||'their trade')+'), frame '+(i+1)+' of '+a.n):base[i%base.length])+(a.why&&i===0&&a.k!=='work'&&a.k!=='idle'?' — used for: '+a.why:'')}); return arr; };
    var F=e.facings, main=F[0], idx=0, cur=[], flush=function(){ if(cur.length){ idx++; mk(idx===1?'core':'extra'+(idx>2?idx-1:''),Z.sheetTitle(cur),main,cur); out[out.length-1].tier=idx===1?'core':'extra'; cur=[]; } };
    e.anims.forEach(function(a){ if(e.npc&&a.k==='move')return; var P=poseOf(a,main); if(cur.length+P.length>cap)flush(); cur=cur.concat(P); }); flush();
    if(e.npc&&e.walker){ mk('walk','Walking (side, front, back)','x',[0,1,2,3].map(function(i){ return {a:'move',i:i,f:'s',t:'side view facing RIGHT, walk cycle frame '+(i+1)+' of 4'}; })
      .concat([0,2].map(function(i,n){ return {a:'move',i:i,f:'f',t:'seen from the FRONT, walking toward the camera, step '+(n+1)+' of 2'}; }),[0,2].map(function(i,n){ return {a:'move',i:i,f:'b',t:'seen from BEHIND, walking away, step '+(n+1)+' of 2'}; }))); out[out.length-1].tier='core'; }
    // a trailing sheet of 1–2 poses is folded into the sheet before it (5 × 2 grid)
    if(out.length>2||(out.length===2&&out[1].tier==='extra')){ var last=out[out.length-1], prev=out[out.length-2]; if(last.tier==='extra'&&prev.tier==='extra'&&last.poses.length<=2&&prev.poses.length+last.poses.length<=10){ out.pop(); out.pop(); mk(prev.key,Z.sheetTitle(prev.poses.concat(last.poses)),main,prev.poses.concat(last.poses)); var m2=out[out.length-1]; m2.tier='extra'; m2.cols=5; m2.rows=2; m2.size='1536x1024'; } }
    if(F.length>1){ var fb=[], pick=e.anims.filter(function(a){ return a.k==='idle'||/^(move|float|still)$/.test(a.k)||a.main||(e.npc&&(a.k==='talk')); });
      ['f','b'].forEach(function(f){ if(F.indexOf(f)<0)return; pick.forEach(function(a){ var P=poseOf(a,f), lab=f==='f'?'seen from the FRONT, ':'seen from BEHIND, ';
        if(a.k==='idle'||a.k==='still')fb.push({a:a.k,i:0,f:f,t:lab+P[0].t}); else if(/^(move|float)$/.test(a.k)){ fb.push({a:a.k,i:0,f:f,t:lab+'step / movement frame 1 of 2'}); fb.push({a:a.k,i:2,f:f,t:lab+'step / movement frame 2 of 2 (opposite limb)'}); }
        else if(a.k==='talk'){ if(f==='f')return; } else fb.push({a:a.k,i:P.length-1,f:f,t:lab+P[P.length-1].t.replace(/ — used for:.*$/,'')}); }); });
      if(fb.length){ mk('fb','Front and back: idle, steps, main attack','x',fb); var sh=out.pop(); sh.tier='core'; out.splice(1,0,sh); } }
    return out; },
  sheetTitle:function(poses){ var seen=[], Z=ZSPR; poses.forEach(function(p){ var l=Z.ANIM_LABEL[p.a]||p.a; if(seen.indexOf(l)<0)seen.push(l); }); return seen.join(', '); },

  // ── the request text for one sheet ──
  REF_TXT:{style_hero:'the hero boy (art style, proportions, outline weight, teal highlights)',style_centaur:'the teal-maned centaur (art style for creatures: teal highlight shapes, magenta rim light, glowing eyes and weapon)'},
  refNote:function(e,sh){ var Z=ZSPR; return Z.refs(e,sh).map(function(r,i){ var t=Z.REF_TXT[r];
      if(!t){ if(r==='hero_m.model'&&e.id==='hero_f')t='the approved model sheet of the hero boy: she matches his height, proportions, line weight and colouring style exactly (her hair and outfit are her own, as described)';
        else if(/^hero_[mf]\.model$/.test(r))t='the approved model sheet of this hero: keep the hero identical to it';
        else if(/^mt_/.test(r))t='the approved sheet of this mount: keep the mount identical to it';
        else t='the first approved sheet of this same character: keep the character identical to it'; }
      return 'Reference image '+(i+1)+' = '+t+'.'; }).join(' '); },
  refs:function(e,sh){ var r=['style_hero','style_centaur']; if(e.group==='hero'){ if(sh.key!=='model')r.push('hero_'+e.hero+'.model'); else if(e.hero==='f')r.push('hero_m.model'); }
    else if(e.group==='rider'||e.group==='vehicle')r.push('hero_'+(e.rider||e.id.split('_')[1])+'.model'); else if(sh!==e.sheets[0])r.push(e.sheets[0].id);
    if(e.group==='rider'&&typeof CHAR_BY_ID!=='undefined'&&CHAR_BY_ID['mt_'+e.mount])r.push('mt_'+e.mount+'.ride'); return r; },
  prompt:function(e,sh,opts){ var Z=ZSPR, o=opts||{}, n=sh.poses.length, L=[];
    if(sh.multi){ L.push('Create ONE image for a 2D top-down action RPG called Zeldara: a sheet of '+n+' DIFFERENT boss characters, one per cell.'); L.push(Z.refNote(e,sh));
      L.push('Layout: exactly '+n+' characters in a grid of '+sh.cols+' columns × '+sh.rows+' row'+(sh.rows>1?'s':'')+', evenly spaced, each one standing in a ready, menacing battle pose, in this order (left to right, top row first):');
      sh.poses.forEach(function(p,i){ L.push((i+1)+'. '+p.t+'.'); });
      L.push(Z.VIEW.q); L.push('Each boss fills most of its own cell (they are large, imposing characters about three times the height of the hero) and all are drawn at the same scale and line weight.');
      if(o.body)return L.join('\n'); L.push(Z.STYLE); L.push(Z.RULES.replace('the same character in every pose — identical proportions, outfit, colours and line weight. Every pose drawn at the same scale','every character in exactly the same art style and line weight. Every character drawn')); L.push(o.alpha?Z.BG_ALPHA:Z.bgKey('green #00FF00')); return L.join('\n'); }
    L.push('Create ONE sprite sheet image for a 2D top-down action RPG called Zeldara.');
    L.push(Z.refNote(e,sh));
    var subj='Subject: '+e.name+' — '+String(e.look||'').replace(/\s*\([^)]*\)/g,'').replace(/\s+/g,' ').trim();
    if(e.gear)subj+=' Details: '+e.gear+'.';
    L.push(subj+(/[.!]$/.test(subj)?'':'.')+' '+Z.palText(e.pal)+(e.scale&&e.group!=='hero'?' Size: about '+e.scale+'× the height of the hero'+(e.scale>=2?' (a towering boss)':e.scale<=0.5?' (tiny)':'')+'.':''));
    if(e.group==='hero'){ var held={}; sh.poses.forEach(function(p){ var a=Z.HERO.ANIMS[p.a]; if(a&&a.held)held[a.held]=1; }); var hk=Object.keys(held);
      if(hk.length)L.push('Held items in this sheet: '+hk.map(function(k){ return Z.HERO.WCLASS[k].label.toLowerCase()+' = '+Z.HERO.WCLASS[k].held; }).join('; ')+'. When a pose does not name a weapon, the hands are empty and the small sword stays sheathed at the hip.'); }
    if(e.moveTxt||e.atkTxt)L.push('How it behaves in the game (for the poses): '+[e.moveTxt,e.atkTxt,e.defTxt].filter(Boolean).join(' '));
    L.push('Layout: exactly '+n+' pose'+(n>1?'s':'')+' in a grid of '+sh.cols+' column'+(sh.cols>1?'s':'')+' × '+sh.rows+' row'+(sh.rows>1?'s':'')+', evenly spaced, in this order (left to right, top row first):');
    sh.poses.forEach(function(p,i){ L.push((i+1)+'. '+p.t+'.'); });
    if(sh.facing&&sh.facing!=='x')L.push(Z.VIEW[sh.facing]); else L.push('View: camera slightly above, as in a top-down RPG; each pose states its own facing.');
    if(o.body)return L.filter(Boolean).join('\n');
    L.push(Z.STYLE); L.push(Z.RULES);
    L.push(o.alpha?Z.BG_ALPHA:Z.bgKey(Z.keyCol(e.pal)));
    return L.filter(Boolean).join('\n'); },

  // ── totals and export ──
  stats:function(){ var S={chars:0,sheets:0,core:0,poses:0,byGroup:{},unknown:[]}; ZSPR.all().forEach(function(e){ S.chars++; var g=S.byGroup[e.group]=S.byGroup[e.group]||{chars:0,sheets:0,poses:0}; g.chars++; g.sheets+=e.sheets.length; S.sheets+=e.sheets.length; var nc=e.sheets.filter(function(x){ return (x.tier||'core')==='core'; }).length; S.core+=nc; g.core=(g.core||0)+nc;
      e.sheets.forEach(function(sh){ g.poses+=sh.poses.length; S.poses+=sh.poses.length; }); if(e.unknown&&e.unknown.length)S.unknown.push(e.id+': '+e.unknown.join(',')); }); return S; },
  WAVES:{0:'Pilot (by hand)',1:'Heroes',1.5:'Mounts and riders',2:'Village, familiars',3:'Grasslands',3.5:'Grasslands bosses',4:'Wetlands',4.5:'Wetlands bosses',5:'Highlands',5.5:'Highlands bosses',6:'Ashlands',6.5:'Ashlands bosses',7:'Volcano',7.5:'Volcano bosses',8:'Vehicles',2.5:'Other bosses'},
  PILOT:['hero_m.model','hero_f.model','hero_m.move.s','hero_m.melee.s','meadow_goblin.core.s','meadow_goblin.fb','thistle_hog.core.q','npc_forge.core.f','mt_horse.ride','ride_m_horse.ride','bosses.1','fam_grass.core.q'],
  requests:function(){ var out=[], Z=ZSPR;
    // the girl's three looks to compare: same model-sheet layout, one request per look
    var girl=Z.all().find(function(e){ return e.id==='hero_f'; });
    if(girl&&!Z.HERO.GIRL_LOCKED)Object.keys(Z.HERO.GIRL_LOOKS).forEach(function(k){ var G=Z.HERO.GIRL_LOOKS[k], e2=Object.assign({},girl,{name:'Hero (girl) · look '+k.toUpperCase()+' — '+G.name,look:Z.HERO.GIRL_BASE+G.look.replace(/\.$/,'')}), sh=Object.assign({},girl.sheets[0],{id:'hero_f.model_'+k});
      out.push({id:sh.id,char:'hero_f',name:e2.name,group:'hero',sub:girl.sub,tier:'core',wave:0,cwave:1,scale:1,title:sh.title,facing:sh.facing,cols:sh.cols,rows:sh.rows,size:sh.size,poses:sh.poses.map(function(p){ return 'model_'+k+'/x/'+p.i; }),refs:['style_hero','style_centaur','hero_m.model'],key:Z.keyCol(null),variant:k,body:Z.prompt(e2,sh,{body:true})}); });
    ZSPR.all().forEach(function(e){ e.sheets.forEach(function(sh){ out.push({id:sh.id,char:sh.multi?'bosses':e.id,name:sh.multi?sh.title:e.name,group:e.group,sub:e.sub,tier:sh.tier||'core',wave:ZSPR.PILOT.indexOf(sh.id)>=0?0:e.wave,cwave:e.wave,scale:e.scale||1,title:sh.title,facing:sh.facing,cols:sh.cols,rows:sh.rows,size:sh.size,
      poses:sh.poses.map(function(p){ return (p.ch?'@'+p.ch+'|':'')+p.a+'/'+(p.f||sh.facing||'s')+'/'+p.i; }),scales:sh.multi?sh.poses.map(function(p){ return p.scale||1; }):undefined,multi:sh.multi||undefined,refs:sh.multi?['style_hero','style_centaur']:ZSPR.refs(e,sh),key:ZSPR.keyCol(e.pal),body:ZSPR.prompt(e,sh,{body:true})}); }); }); return out; },
  // full text of a request: body + style + rules + background (alpha for the script, alpha-or-flat-colour for pasting by hand)
  full:function(q,alpha){ return q.body+'\n'+ZSPR.STYLE+'\n'+ZSPR.RULES+'\n'+(alpha?ZSPR.BG_ALPHA:ZSPR.bgKey(q.key)); }
};
ZSPR.HERO.LOOK.f=ZSPR.HERO.GIRL_BASE+ZSPR.HERO.GIRL_LOOKS[ZSPR.HERO.GIRL_PICK].look.replace(/\.$/,'');
