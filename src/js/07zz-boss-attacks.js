// ═══════════════════════════════════════════════════════════════════════
// ║ BOSS SIGNATURE ATTACKS (round 8) — the data. Hollow-Knight / Silksong
// ║ style: few, readable attacks that cover whole areas of the screen with
// ║ a gap or a safe spot to find, clear telegraphs, a punish window after
// ║ each big move, a stagger when you land enough hits, and a desperation
// ║ move ("last stand") when the final form is nearly beaten.
// ║ The engine that runs them is 09bb-boss-patterns.js; the Lab reads this
// ║ file to list each boss's attacks.
// ║
// ║ Pattern names (+ ':theme'):
// ║   rain     — strikes fall down columns of the screen; find the open columns
// ║   wall     — a wall sweeps across the screen with 1–2 gaps to slip through
// ║   burst    — beams fan out from the boss; stand in the dark wedges
// ║   spin     — rotating beams; circle the boss to stay between them
// ║   floor    — half the floor turns to lava / bog / web; get to the other half
// ║   burrow   — the boss dives under, a trail hunts you, then it erupts
// ║   boomerang— a weapon flies out and comes back; dodge it twice
// ║   quake    — a shockwave ring from the boss with one gap
// ║   combo    — three leaping slams toward you, then a shockwave
// ║   strafe   — a flying charge down a marked lane, leaving fire behind
// ║   eclipse  — darkness except right around you, blades fall from the dark
// ║   mirror   — copies of the boss appear and all strike at once
// ═══════════════════════════════════════════════════════════════════════
var BOSS_ATK_INFO={
  rain:{ic:'☄',n:'Sky rain',hint:'strikes fall down columns of the screen — stand in an open column'},
  wall:{ic:'⇶',n:'Sweeping wall',hint:'a wall crosses the screen — slip through a gap'},
  burst:{ic:'✺',n:'Radial burst',hint:'beams fan out from the boss — stand between them'},
  spin:{ic:'↻',n:'Rotating beams',hint:'beams sweep around the boss — keep moving with the gap'},
  floor:{ic:'▤',n:'Floor takeover',hint:'half the floor becomes deadly — cross to the other half'},
  burrow:{ic:'⤓',n:'Burrow & erupt',hint:'a trail hunts you — step away before it erupts'},
  boomerang:{ic:'⟲',n:'Boomerang',hint:'it flies out and comes back — dodge it twice'},
  quake:{ic:'◎',n:'Shockwave',hint:'a ring spreads from the boss — stand in its gap'},
  combo:{ic:'⚔',n:'Leaping combo',hint:'three slams toward you, then a shockwave'},
  strafe:{ic:'➶',n:'Strafing run',hint:'a charge down a marked lane leaves fire behind'},
  eclipse:{ic:'◐',n:'Eclipse',hint:'darkness falls — blades strike from the dark'},
  mirror:{ic:'⧉',n:'Mirror images',hint:'copies appear and strike together'}
};
var BOSS_THEME_NAMES={coins:'gold',rock:'rocks',lightning:'lightning',bubbles:'bog bubbles',blades:'blades',fire:'fire',light:'light',crystal:'crystal',lava:'lava',bog:'bog',web:'webs',thunder:'thunder',gears:'gears',void:'void',orb:'orb',lantern:'lantern',hammer:'hammer',axe:'axe'};
// per guardian family: phases[i] = pattern list for phase i+1; desp = the last-stand combo; col = signature colour
var BOSS_ATTACKS={
  goblin_king:{col:'#ffd040',desp:['rain:coins','quake'],phases:[
    ['quake','rain:coins','boomerang:hammer'],
    ['strafe','quake','rain:rock','combo']]},
  dark_warlock:{col:'#60ffb0',desp:['spin','rain:blades'],phases:[
    ['burst','boomerang:orb','floor:web'],
    ['spin','floor:web','burrow','burst']]},
  swamp_witch:{col:'#a0ff60',desp:['floor:bog','rain:bubbles','burst'],phases:[
    ['floor:bog','boomerang:lantern','rain:bubbles'],
    ['floor:bog','rain:bubbles','combo','boomerang:lantern'],
    ['burrow','burst','floor:bog','rain:bubbles']]},
  storm_mage:{col:'#fff080',desp:['wall:thunder','rain:lightning','spin'],phases:[
    ['rain:lightning','boomerang:orb','burst'],
    ['wall:thunder','rain:lightning','spin','boomerang:orb'],
    ['quake','wall:thunder','rain:lightning','combo']]},
  rock_dragon:{col:'#c080ff',desp:['strafe:fire','rain:rock','burst:crystal'],phases:[
    ['rain:rock','combo','quake'],
    ['burst:crystal','rain:rock','combo','quake'],
    ['strafe:fire','rain:rock','burst:crystal','wall:fire'],
    ['strafe:fire','wall:fire','rain:rock','spin']]},
  iron_sentinel:{col:'#ff9030',desp:['spin','wall:gears','rain:rock'],phases:[
    ['spin','boomerang:axe','quake'],
    ['wall:gears','quake','rain:rock','boomerang:hammer'],
    ['spin','wall:gears','rain:rock','burst'],
    ['combo','boomerang:hammer','spin','wall:gears']]},
  lava_titan:{col:'#ff7020',desp:['floor:lava','rain:fire','spin'],phases:[
    ['floor:lava','combo','quake'],
    ['floor:lava','wall:lava','combo','rain:fire'],
    ['combo','wall:lava','rain:fire','floor:lava'],
    ['strafe:fire','floor:lava','quake','burrow'],
    ['burst','spin','floor:lava','rain:fire']]},
  shadow_lord:{col:'#a0a0ff',desp:['eclipse','spin','mirror'],phases:[
    ['eclipse','rain:blades','mirror'],
    ['spin','mirror','rain:blades','eclipse'],
    ['strafe','rain:blades','eclipse','wall:void'],
    ['strafe','spin','wall:void','burst'],
    ['wall:light','burst','rain:light','mirror']]}
};
// summoned helpers mostly give way to arena attacks (Kris, round 8); themed ones stay
var BOSS_KEEP_SUMMON={swamp_witch:[2]};
// difficulty ramp by quadrant: telegraph time, gaps, cadence, damage (× the boss's attack), stagger hits
var BOSS_RAMP={
  1:{tele:1.4,gaps:3,waves:1,every:8,dmg:0.6,stag:8,punish:1.4,hold:1,speed:0.8},
  2:{tele:1.15,gaps:3,waves:1,every:6.5,dmg:0.75,stag:10,punish:1.15,hold:1,speed:0.9},
  3:{tele:0.95,gaps:2,waves:2,every:5.5,dmg:0.9,stag:12,punish:0.9,hold:0,speed:1},
  4:{tele:0.85,gaps:2,waves:2,every:4.8,dmg:1,stag:14,punish:0.75,hold:0,speed:1.12}
};
// other bosses (castle wardens, mage-tower masters, island guardians, elites): two fitting patterns by look
var BossAtk={
  // design slot → {fam, phase} for guardian forms
  famOf:function(slot){ if(!slot)return null; var m=/^boss_(.+)$/.exec(slot); if(m&&BOSS_ATTACKS[m[1]])return {fam:m[1],phase:1}; m=/^bf_(.+)_(\d)$/.exec(slot); if(m&&BOSS_ATTACKS[m[1]])return {fam:m[1],phase:+m[2]}; return null; },
  GENERIC:{fire:['floor:lava','rain:fire','burst'],ice:['wall:frost','rain:frost','spin'],storm:['rain:lightning','boomerang:orb','spin'],shadow:['eclipse','burst','mirror'],earth:['quake','rain:rock','combo'],water:['wall:wave','floor:bog','boomerang:orb'],nature:['floor:bog','rain:bubbles','burst'],arcane:['spin','burst','boomerang:orb'],beast:['combo','quake','strafe']},
  kindOf:function(D){ var t=(D.name+' '+D.id+' '+(D.lore||'')).toLowerCase();
    if(/fire|ember|lava|magma|cinder|ash|sun|pyro|inferno|hearth|obsidian|forge|phoenix/.test(t))return 'fire';
    if(/frost|ice|rime|blizzard|snow|glacier/.test(t))return 'ice'; if(/storm|thunder|lightning|tempest|sky|roc/.test(t))return 'storm';
    if(/shadow|void|soul|lich|bone|drowned|night|rift|wraith/.test(t))return 'shadow'; if(/sea|tide|kraken|pirate|naga|lotus|abbot/.test(t))return 'water';
    if(/thorn|bog|mangrove|druid|hex|swamp|root/.test(t))return 'nature'; if(/stone|rock|golem|ogre|mill|troll|jailer/.test(t))return 'earth';
    if(/hound|wolf|beast|drake|wyrm/.test(t))return 'beast'; return 'arcane'; },
  forSlot:function(slot){ var F=BossAtk.famOf(slot); if(F){ var B=BOSS_ATTACKS[F.fam]; return {list:B.phases[F.phase-1]||B.phases[0],col:B.col,desp:F.phase===B.phases.length?B.desp:null,fam:F.fam,phase:F.phase}; }
    var D=typeof BA!=='undefined'&&BA.of(slot); if(!D)return null; var G=BossAtk.GENERIC[BossAtk.kindOf(D)], h=BA.hash(D.id), elite=/^elite_/.test(slot);
    var list=elite?[G[h%G.length]]:[G[h%G.length],G[(h+1)%G.length]]; return {list:list,col:D.pal.g,desp:elite?null:[G[(h+2)%G.length],list[0]],fam:null,phase:1}; },
  // "☄ Sky rain (rocks) · ✺ Radial burst …" for the Lab
  describe:function(slot){ var S=BossAtk.forSlot(slot); if(!S)return ''; var nm=function(p){ var a=p.split(':'), I=BOSS_ATK_INFO[a[0]]||{ic:'•',n:a[0]}; return I.ic+' '+I.n+(a[1]?' ('+(BOSS_THEME_NAMES[a[1]]||a[1])+')':''); };
    return S.list.map(nm).join(' · ')+(S.desp?' — last stand: '+S.desp.map(nm).join(' + '):''); },
  // drop summon tokens from the guardians' phase kits (themed ones stay)
  stripSummons:function(){ if(typeof BOSS_PHASES==='undefined'||BossAtk._stripped)return; BossAtk._stripped=true;
    Object.keys(BOSS_PHASES).forEach(function(k){ BOSS_PHASES[k].phases.forEach(function(P,i){ if(!P||!P.kit)return; if((BOSS_KEEP_SUMMON[k]||[]).indexOf(i+1)>=0)return;
      var kit=P.kit.split('|').map(function(t){ return t.trim(); }).filter(function(t){ return !/^summon\b/.test(t); }).join(' | ');
      P.kit=kit; if(typeof MX!=='undefined'&&MX.KITS&&P.rid&&typeof MX.KITS[P.rid]==='string')MX.KITS[P.rid]=kit; }); }); }
};
