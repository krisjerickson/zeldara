// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt10-art-r102.js — round 102: THE LAST PAINTINGS (Kris ✓ every row of Lab › Painted & polish › 1, doc 53 §3 / doc 54).
// ║ Wave 102, nine sheets.  .\tools\sprites\redo.ps1 -List r102   (the list: sprites\requests\r102.txt)
// ║   sc_r102_gate     the bridge gates, closed and open (10b-world-travel.js _drawGate)
// ║   sc_r102_lines    the rune-line ribbon and its node-stones (the soul-lines keep their neon glow; set in once the paintings are in)
// ║   sc_r102_skyline  the four sky-port cities along the bottom (15-scene-sky.js _city)
// ║   sc_r102_skyfx    the cloud banks in three states, the ship's bolts, the enemy bomb (15-scene-sky.js)
// ║   sc_r102_status   eight status overlays drawn over any monster (09s ZSTAT)
// ║   sc_r102_icons    the twelve status icons over the head (09s ZSTAT)
// ║   sc_r102_aim      the spell's rune circle and the arrow reticle (09s ZAIM, ZDRAW)
// ║   sc_r102_hud      teal heart full / empty, banner full / empty, the monster-bar and boss-bar frames, the mana arc's frame (21w)
// ║   sc_r102_portal   the last floor's exit portal and treasure vault, sealed (the open portal is en_portal, round 28) — 12-scene-dungeon.js
// ║   sc_r102_dfloor   the trial: one dungeon theme's floor and wall painted (seamless), to measure the load before the other seven
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[102]='Round 102 — the last paintings: gates, rune-lines, sky ports, status effects, aim marks, the HUD, a dungeon floor trial';
  var NO=' No pixel art. No text, no letters, no numbers.';
  ZSCN.SHEETS.push(
   {id:'sc_r102_gate',wave:102,fam:'r102',kind:'obj',cols:2,rows:1,size:'1536x1024',refs:['sc_vill_special_2'],
    title:'A bridge gate on a stone road, painted in the game\'s storybook style, seen from slightly above and in front, on a plain background.'+NO,items:[
     ['gate_closed','Bridge gate — closed','two carved runestone posts either side of a road, a heavy chain of glowing teal rune-links stretched tight between them, a wooden plank sign hanging from the chain (blank), a faint teal glow',150,120],
     ['gate_open','Bridge gate — open','the same two carved runestone posts, the rune-chain fallen slack to the ground on one side, its runes dimmed, the plank sign leaning against a post (blank)',150,120]]},
   {id:'sc_r102_lines',wave:102,fam:'r102',kind:'flat',cols:2,rows:2,size:'1024x1024',refs:['sc_tex_grass'],
    title:'The rune-lines of the land, seen from straight above, glowing neon teal and aurora colours over dark ground, each piece separate and centred.'+NO,items:[
     ['sl_ribbon','Rune-line ribbon','a straight horizontal ribbon of glowing light running left to right, carved Norse rune shapes along its middle, a soft neon teal glow with faint aurora green and violet at its edges, the two ends fading so pieces join seamlessly',256,64],
     ['sl_node_1','Rune-line node stone 1','a small flat round stone set in the ground with one glowing teal rune carved in it, light spilling out round its rim',64,64],
     ['sl_node_2','Rune-line node stone 2','a small flat square stone set in the ground with a glowing teal knot-rune carved in it',64,64],
     ['sl_node_3','Rune-line node stone 3','a small flat round stone set in the ground with a glowing violet-and-teal star rune carved in it',64,64]]},
   {id:'sc_r102_skyline',wave:102,fam:'r102',kind:'flat',cols:1,rows:4,size:'1024x1536',refs:['sc_sky_bg_1'],
    title:'Four wide strips, each the sky-port city seen from the side, filling the bottom of a flying-battle screen: roofs, towers, docks and balloons, lit windows, the sky behind left empty.'+NO,items:[
     ['sk_city_1','Grasslands sky city','a hill town of timber and green-roofed towers with windmills and moored balloons, warm lit windows, leafy banners',1280,160],
     ['sk_city_2','Wetlands sky city','a harbour town on stilts with teal roofs, lighthouses, water-wheels and moored sky-boats, misty lamps',1280,160],
     ['sk_city_3','Highlands sky city','a stone mountain town of grey towers and blue slate roofs, lightning rods, bridges between spires, snow on the ledges',1280,160],
     ['sk_city_4','Ashlands sky city','a dark basalt fortress town with red-tiled roofs, forge chimneys glowing orange, iron walkways, smoke',1280,160]]},
   {id:'sc_r102_skyfx',wave:102,fam:'r102',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_sky_1'],
    title:'A flying battle\'s pieces, painted, each alone and centred: three cloud banks and three shots.'+NO,items:[
     ['sk_cloudbank_1','Cloud bank — whole','a small puffy white cloud bank piled like a little fortress wall, round and solid, sunlit top',90,50],
     ['sk_cloudbank_2','Cloud bank — torn','the same cloud bank torn in places, holes through it, ragged edges',90,50],
     ['sk_cloudbank_3','Cloud bank — wisps','only thin wisps left of the cloud bank, almost gone',90,50],
     ['sk_bolt','The ship\'s bolt','a short streak of pale blue lightning pointing straight up, a bright white core',16,40],
     ['sk_bolt_big','The charged bolt','a thick spear of golden-white lightning pointing straight up, crackling, a glowing tip',26,64],
     ['sk_bomb','The enemy bomb','a small round dark-red bomb with a sputtering fuse, falling, a faint red glow',24,24]]},
   {id:'sc_r102_status',wave:102,fam:'r102',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_bfx_frost'],
    title:'Status effects laid over a monster, each alone, centred and see-through in the middle so the monster shows inside: magical, glowing, readable.'+NO+' No monster, no creature — only the effect.',items:[
     ['so_ice','Frozen','a shell of clear pale-blue ice crystals forming a rough dome, frosty edges, see-through in the middle',96,96],
     ['so_fire','Burning','small orange and yellow flames licking upward from the bottom, a few embers, empty in the middle',96,96],
     ['so_stone','Earth-bound','two thick stone cuffs with glowing amber runes, as if clamped round feet, at the bottom, empty above',96,96],
     ['so_vines','Rooted','green thorny vines curling up from the ground in a ring, empty in the middle',96,96],
     ['so_sparks','Shocked','crackling yellow lightning sparks in a loose ring, empty in the middle',96,96],
     ['so_poison','Poisoned','green bubbles and a faint green mist rising, empty in the middle',96,96],
     ['so_drips','Soaked','blue water drips and splashes falling in a ring, empty in the middle',96,96],
     ['so_void','Hexed','violet-black void motes and wisps circling, empty in the middle',96,96]]},
   {id:'sc_r102_icons',wave:102,fam:'r102',kind:'obj',cols:4,rows:3,size:'1536x1024',refs:['sc_bfx_frost'],
    title:'Twelve small round status icons, painted badges with a glowing rim, each alone and centred, clear at a small size.'+NO,items:[
     ['st_icon_freeze','Frozen','a pale blue snowflake inside a frosted round badge',32,32],['st_icon_chill','Chilled','a small pale blue ice crystal inside a round badge',32,32],
     ['st_icon_burn','Burning','an orange flame inside a round badge',32,32],['st_icon_shock','Shocked','a yellow lightning bolt inside a round badge',32,32],
     ['st_icon_poison','Poisoned','a green droplet with bubbles inside a round badge',32,32],['st_icon_mark','Marked','a violet four-pointed star target inside a round badge',32,32],
     ['st_icon_root','Rooted','a green curling vine inside a round badge',32,32],['st_icon_soak','Soaked','a blue water drop inside a round badge',32,32],
     ['st_icon_earth','Earth-bound','an amber stone with a rune inside a round badge',32,32],['st_icon_hex','Hexed','a dark violet crescent eye inside a round badge',32,32],
     ['st_icon_drain','Drained','a green heart with a wisp flowing out inside a round badge',32,32],['st_icon_star','Starstruck','small golden stars circling inside a round badge',32,32]]},
   {id:'sc_r102_aim',wave:102,fam:'r102',kind:'flat',cols:2,rows:1,size:'1536x1024',refs:['sc_bfx_light'],
    title:'Two aiming marks, seen from straight above, white and pale so the game can tint them, each alone and centred on plain dark.'+NO,items:[
     ['aim_rune','Spell rune circle','a glowing white magic circle: an outer ring of carved Norse runes, an inner ring, six small marks around it, the middle empty',128,128],
     ['aim_reticle','Arrow reticle','a white archer\'s sight: a thin ring with four short ticks pointing in, a tiny dot in the centre',64,64]]},
   {id:'sc_r102_hud',wave:102,fam:'r102',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_sky_1'],
    title:'Pieces of a game\'s health display, painted, each alone and centred on plain dark: glowing teal and gold, Norse knotwork.'+NO,items:[
     ['hud_heart_full','Teal soul-heart — full','a glowing teal heart with a faint etched rune in it, bright rim, soft inner light',38,34],
     ['hud_heart_empty','Teal soul-heart — empty','the same heart shape empty: a dark hollow with a dim teal rim',38,34],
     ['hud_banner','Banner — full','a small hanging golden banner on a short pole, pointed bottom, a knot pattern',26,42],
     ['hud_banner_empty','Banner — empty','the same small hanging banner faded dark and empty',26,42],
     ['hud_monbar_frame','Monster bar frame','a thin long frame of gilt knotwork, empty inside, very wide and short',64,12],
     ['hud_bossbar_frame','Boss bar frame','a long frame of gilt Norse knotwork with a knot at each end, empty inside, very wide and short',512,40],
     ['hud_mana_frame','Mana arc frame','a long gently curved frame of silver with small rune studs, empty inside, wide and short',256,24]]},
   {id:'sc_r102_portal',wave:102,fam:'r102',kind:'obj',cols:3,rows:1,size:'1536x1024',refs:['sc_vill_special_2'],
    title:'The exit of an adventure site\'s last floor, painted in the storybook style: an upright oval ring of carved stone, seen from the front, alone and centred.'+NO,items:[
     ['en_portal_sealed','Exit portal — sealed','an upright oval ring of carved runestone, its middle dark and shut with heavy iron chains crossed over it, a dull red glow behind the chains, red runes dim on the stone',56,76],
     ['en_vault_sealed','Treasure vault — sealed','an upright oval ring of gold-banded stone, its middle shut by a round iron vault door with a big lock and chains, a faint gold glow at the rim',56,76],
     ['en_vault_open','Treasure vault — open','the same gold-banded stone ring, its vault door swung open, warm golden light and glittering coins spilling out of the middle',56,76]]},
   {id:'sc_r102_dfloor',wave:102,fam:'tex',kind:'tex',cols:2,rows:1,refs:['sc_tex_grass'],
    title:'A dungeon\'s floor and wall, seen from straight above, seamless, painted in the storybook style.'+NO,items:[
     ['tx_dng_floor','Dungeon floor','worn grey flagstones with moss in the joints and a few cracks, cool and dim',256,256],
     ['tx_dng_wall','Dungeon wall top','the top of a thick dungeon wall of dark grey blocks with mortar lines',256,256]]});
})();
