// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt9-art-r90.js — round 90: THE BOSSES' AREA ATTACKS, PAINTED (Kris: "let's make sure the boss attacks are not using pixel art, and have
// ║ painted images for their area attacks. These should be thematic with the type of boss you are fighting. doesn't have to be unique for
// ║ each boss, find some common themes, but sutharn and solmyrk should have their own unique ones. Create an api request for this, and then
// ║ i'll review these in the lab").
// ║ Today the screen-wide attacks (09bb BossPat: rain, wall, burst, spin, floor, burrow, quake, combo, strafe, eclipse, mirror) are drawn
// ║ as flat coloured blocks and circles. Each boss's attack themes (07zz BOSS_ATTACKS, 'rain:fire', 'floor:bog' …) fall into eight
// ║ families; Surtharn and Solmyrk get their own. Every family is one sheet of seven pieces, each piece one part an attack is built from:
// ║   mark    the warning sigil on the ground (rain, combo and burrow marks, the strike lanes)
// ║   impact  the burst where a strike lands
// ║   patch   a stretch of deadly ground (floor takeover, what the strafe leaves behind)
// ║   band    a length of the sweeping wall (repeats side by side)
// ║   beam    one ray of a burst or a spin
// ║   ring    the shockwave ring of a quake
// ║   strike  the falling thing itself — a meteor, a bolt, a boulder, a spear of light
// ║ Wave 93: 12 sheets (one per family, the strikes on two), 70 pieces.   .\tools\sprites\redo.ps1 -List bossfx     Lab → Painted boss attacks (☆ / notes per family).
// ═══════════════════════════════════════════════════════════════════════
var ZBFX_ART={
  ROLES:['mark','impact','patch','band','beam','ring','strike'],
  ROLE_NAME:{mark:'Warning sigil',impact:'Impact',patch:'Deadly ground',band:'Sweeping wall',beam:'Beam',ring:'Shockwave ring',strike:'The strike'},
  // which family each attack theme belongs to (the game picks the paintings by this)
  THEME:{fire:'ember',lava:'ember',rock:'stone',crystal:'stone',hammer:'stone',lightning:'storm',thunder:'storm',bog:'bog',bubbles:'bog',web:'bog',
    frost:'frost',wave:'frost',void:'void',orb:'void',lantern:'void',gears:'iron',blades:'iron',axe:'iron',coins:'light',light:'light'},
  // id, name, colour, who uses it, the seven pieces (mark, impact, patch, band, beam, ring, strike)
  FAM:[
    ['ember','Fire and lava','#ff7030','the fire and lava bosses — the Lava Titan, the Rock Dragon\'s fire, the Ashlands guardians, the forge-masters',[
      'a warning circle of glowing orange ember-runes burned into the ground, a hot red glow inside the ring',
      'a fiery explosion: a white-yellow core, orange flames bursting outward, flying embers, a ring of black smoke at the edge',
      'a spreading pool of molten lava: black cooling crust plates with bright orange seams, a ragged soft edge',
      'a low wall of roaring flames running from left to right: orange and yellow tongues of fire, sparks and embers, the two ends fading so pieces can sit side by side',
      'a straight jet of white-hot fire: a bright core, orange edges, sparks flying off, tapering at the far end',
      'a ring of fire spreading outward: a thin circle of flames and embers, empty and dark in the middle',
      'a flaming meteor of molten rock falling straight down, glowing cracks, a tail of fire streaming upward behind it']],
    ['stone','Earth and stone','#c8a070','the stone and earth bosses — the Rock Dragon, the Goblin King\'s hammer, the crystal guardians',[
      'a warning circle of cracks splitting the stone floor, glowing amber runes shining up through the cracks',
      'a boulder shattering on the ground: rock shards and pebbles bursting outward, a puff of dust',
      'a stretch of broken, heaving ground: jagged slabs tilted up, small stone spikes and rubble, dust between them',
      'a ridge of jagged stone spikes erupting from the ground in a line from left to right, rubble at their feet, the two ends fading so pieces can sit side by side',
      'a straight line of cracks splitting the floor, amber rune-light glowing in them, pebbles thrown up along it',
      'a ring of dust and rock shards spreading outward, empty in the middle',
      'a great falling boulder of grey-brown stone with amber rune-light in its cracks, a few pebbles falling with it']],
    ['storm','Lightning and thunder','#fff080','the storm bosses — the Storm Mage, the thunder magi, the storm drakes',[
      'a warning circle of pale-yellow storm runes on the ground, crackling with tiny sparks',
      'a lightning strike hitting the ground: a white-blue flash, forked sparks spraying outward, a scorched star in the middle',
      'a stretch of charged ground: blue-white electric arcs dancing over wet dark stone',
      'a fence of lightning arcing from left to right between small rune-stones, white-blue and crackling, the two ends fading so pieces can sit side by side',
      'a straight bolt of white-blue lightning with small forks branching off',
      'a ring of electric arcs spreading outward, crackling, empty in the middle',
      'a forked bolt of lightning striking straight down from the sky, bright white core, blue glow']],
    ['bog','Bog, poison and webs','#a0ff60','the bog and poison bosses — the Swamp Witch, the Dark Warlock\'s webs, the insect queens',[
      'a warning circle of sickly green runes with small poison bubbles rising in it',
      'a burst of glowing green poison: bubbles popping, green splashes thrown outward',
      'a toxic bog pool: murky green-black water with glowing green bubbles and a thin low mist, a soft muddy edge',
      'a rolling wave of green toxic sludge and bubbles moving from left to right, the two ends fading so pieces can sit side by side',
      'a jet of glowing acid-green venom, droplets flying off, tapering at the far end',
      'a ring of green spore mist and spider-silk strands spreading outward, empty in the middle',
      'a geyser of glowing green poison erupting upward from the ground, bubbles and droplets around it']],
    ['frost','Frost and tide','#a0e0ff','the frost and sea bosses — the Frost Queen, the rime witches, the tide-callers',[
      'a warning circle of pale-blue frost runes with rime crystals growing around its edge',
      'ice shards bursting outward with a puff of frost mist',
      'a sheet of slick blue ice with white frost ferns and a few cracks, a soft frosty edge',
      'a wall of jagged ice crystals with a crest of sea-foam, running from left to right, the two ends fading so pieces can sit side by side',
      'a straight ray of freezing blue light leaving small ice crystals along it',
      'a ring of frost and icy shards spreading outward, empty in the middle',
      'a great icicle spear falling point-down, pale blue and glinting']],
    ['void','Shadow and void','#a070ff','the shadow and void bosses — the Shadow Lord, the void warlocks, the lantern bearers',[
      'a warning sigil of violet-black void runes with a dark centre, faint violet sparks',
      'a burst of black-violet shadow tendrils lashing outward, violet sparks',
      'a pool of living darkness: black with a violet shimmer, curling wisps rising from it, a soft smoky edge',
      'a creeping wall of black smoke and violet flame moving from left to right, the two ends fading so pieces can sit side by side',
      'a ray of black-violet void energy: a dark core with a bright violet rim',
      'a ring of shadow spreading outward, violet at its edge, empty in the middle',
      'a falling orb of violet void energy with a dark heart, wisps trailing upward']],
    ['iron','Iron, gears and blades','#d0b070','the iron and clockwork bosses — the Iron Sentinel, the Forge Guardian, the axe and blade masters',[
      'a warning ring shaped like a brass gear set into the floor, its teeth outlined in glowing teal rivets',
      'shards of hot metal and bright sparks bursting outward',
      'a stretch of iron floor plates with slots, sharp spinning saw blades rising out of them',
      'a row of spinning saw blades rolling from left to right, sparks flying where they touch the ground, the two ends fading so pieces can sit side by side',
      'a straight trail of sparks and a faint steel streak, as if a blade just flew along it',
      'a ring of sparks and steel shards spreading outward, empty in the middle',
      'a spinning double-headed axe of dark iron falling, its edges glinting, a few sparks around it']],
    ['light','Gold and light','#ffe080','the light and gold bosses — the Goblin King\'s gold, the light guardians, Asgard\'s wardens',[
      'a warning halo of golden light-runes on the ground, soft and bright',
      'a burst of golden light with tiny sparkles and a few gold coins flying outward',
      'a pool of radiant golden light on the ground, glittering, with a soft edge',
      'a wall of golden light rays rising from the ground, running from left to right, the two ends fading so pieces can sit side by side',
      'a straight ray of golden light, a white core, shimmering edges',
      'a halo of golden light spreading outward, empty in the middle',
      'a spear of golden light falling point-down, glowing, trailing sparkles']],
    ['surt','Surtharn — the fire of Muspelheim','#ff4010','Surtharn, Tyrant of Muspelheim — his six forms (only his)',[
      'a warning sigil of Muspelheim: a ring of jagged fire-runes burned into black volcanic glass, molten light in the grooves',
      'a blast of Muspel fire on black glass: the glass cracking in a star, molten orange light in the cracks, a burst of flame and black smoke',
      'a floor of black volcanic glass cracking open, molten fire welling up through the cracks, fire-runes glowing in it',
      'a wall of Muspel fire: tall dark-red and orange flames with black smoke and cinders, a giant\'s heat, running from left to right, the two ends fading so pieces can sit side by side',
      'the sweep of a giant flaming sword: a long arc-shaped trail of fire and molten sparks',
      'a ring of fire thrown out by a giant\'s stomp: flames and shards of black glass spreading outward, empty in the middle',
      'a giant\'s flaming sword plunging point-down out of the sky, the blade of black glass with molten edges, wreathed in fire']],
    ['sol','Solmyrk — the black sun','#f2c14e','Solmyrk, the black sun on Odin\'s high seat — his three forms (only his)',[
      'a warning sigil of the black sun: a black disc with a ring of golden flame around it, like a solar eclipse, laid on the ground',
      'a burst of gold and black light: golden rays and dark shards flying outward from a bright point',
      'the shadow of the black sun on the ground: a dark eclipse patch with a burning golden corona around its edge',
      'a wall of golden light cracked with black, half light and half dark, running from left to right, the two ends fading so pieces can sit side by side',
      'a ray of the black sun: a black core edged with burning gold',
      'a ring of storm and gold spreading outward — golden lightning and dark clouds, the storm that ends the world, empty in the middle',
      'a spear of golden light falling point-down, its tip dark like the black sun, trailing gold']]],
  // the pieces' sizes on screen (w, h in px; the hero is 63 px tall)
  SIZE:{mark:[120,120],impact:[140,140],patch:[240,160],band:[320,70],beam:[320,44],ring:[220,220],strike:[70,140]},
  id:function(fam,role){ return 'bfx_'+fam+'_'+role; },
  sheet:function(fam){ return 'sc_bfx_'+fam; },
  sheetOf:function(fam,role){ if(role!=='strike')return 'sc_bfx_'+fam; var i=ZBFX_ART.FAM.findIndex(function(f){ return f[0]===fam; }); return 'sc_bfx_strikes_'+(i<5?1:2); },
  fam:function(id){ var F=ZBFX_ART.FAM.filter(function(f){ return f[0]===id; })[0]; return F||null; }
};
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[93]='Round 90 — the bosses\' area attacks, painted (eight families, Surtharn and Solmyrk)';
  var R=ZBFX_ART.ROLES, N=ZBFX_ART.ROLE_NAME;
  // the six ground pieces of each family: one sheet seen from straight above
  ZSCN.SHEETS=ZSCN.SHEETS.concat(ZBFX_ART.FAM.map(function(F){
    var items=R.slice(0,6).map(function(r,i){ var z=ZBFX_ART.SIZE[r]; return [ZBFX_ART.id(F[0],r),N[r],F[4][i],z[0],z[1]]; });
    return {id:ZBFX_ART.sheet(F[0]),wave:93,fam:'fx',kind:'flat',cols:3,rows:2,size:'1536x1024',refs:['sc_fx_blast'],
      title:'A boss\'s area attacks, painted — '+F[1]+': glowing magical effects on the ground of a boss arena, bright and readable over a dark floor, every piece separate and centred in its cell. No pixel art. No people, no monsters, no boss',items:items};
  }));
  // the strikes — the falling things — upright, five to a sheet
  var ST=function(L,n){ return {id:'sc_bfx_strikes_'+n,wave:93,fam:'fx',kind:'obj',cols:5,rows:1,size:'1536x1024',refs:['sc_pj_shots'],
    title:'A boss\'s strikes, painted — the things that fall from the sky onto the arena, each one alone, upright and centred, falling straight down. No pixel art. No people, no monsters, no boss',
    items:L.map(function(F){ var z=ZBFX_ART.SIZE.strike; return [ZBFX_ART.id(F[0],'strike'),F[1].split(' — ')[0]+' — the strike',F[4][6],z[0],z[1]]; })}; };
  ZSCN.SHEETS.push(ST(ZBFX_ART.FAM.slice(0,5),1),ST(ZBFX_ART.FAM.slice(5),2));
})();
