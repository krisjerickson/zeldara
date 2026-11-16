// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt13-art-r110.js — round 110 paintings (Kris: "mia's juggling pins need to be larger, and make a painted image for these, as they
// ║ are odd looking").
// ║   sc_r110_pins   Tumbler Pia's three juggling clubs (the ones you find in the meadow, 10p-roll.js), and Old Nell's fishing net (21u,
// ║                  Kris: "the net needs to be a nicer painted image")
// ║   sc_r110_chests each realm's own camp chest, closed and open (10h CAMP_CHEST_V, 10b CACHE_CHEST_V) — Kris: "chests in the overworld
// ║                  overall should be reviewed and updated, where needed, with painted images"
// ║ Until they are in, the clubs and the net are drawn by code, and every chest wears the bandits' painted chest.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[110]='Round 110 — Tumbler Pia\'s juggling clubs and Old Nell\'s net';
  var NO=' No pixel art. No text, no letters, no numbers.';
  ZSCN.SHEETS.push(
   {id:'sc_r110_chests',wave:110,fam:'r110',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vill_special_2'],
    title:'A treasure chest for an outdoor camp, painted in the game\'s storybook style, alone and centred on a plain background, seen from slightly above and in front; the open chest shows its lid fully, standing up behind it.'+NO,items:[
     ['cp_chest_sunken','Sunken chest — closed','an old sea chest of dark waterlogged wood with green-bronze bands, barnacles and strands of lake weed clinging to it, a little puddle round its feet, a heavy bronze padlock',72,60],
     ['cp_chest_sunken_open','Sunken chest — open','the same waterlogged sea chest with its lid thrown open and standing up behind, pearls, silver coins and a blue sapphire glinting inside, lake weed hanging from the lid',72,76],
     ['cp_chest_dwarf','Dwarven strongbox — closed','a squat dwarven strongbox of grey stone and riveted iron plates with brass corner guards and a carved rune on the front, a heavy gear-shaped lock',72,60],
     ['cp_chest_dwarf_open','Dwarven strongbox — open','the same dwarven strongbox with its heavy iron lid swung open and standing up behind, gold ingots, coins and a green emerald inside',72,76],
     ['cp_chest_obsidian','Obsidian coffer — closed','a coffer of glossy black obsidian with thin glowing orange cracks and dark iron bands, a little ash round its base, a molten-orange gem in its lock',72,60],
     ['cp_chest_obsidian_open','Obsidian coffer — open','the same obsidian coffer with its lid open and standing up behind, warm orange light spilling out over coins and a pale blue skystone inside',72,76]]},
   {id:'sc_r110_pins',wave:110,fam:'r110',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vill_special_2'],
    title:'Small props for a side quest — a juggler\'s wooden juggling clubs (bottle-shaped, a slim neck and a round knob) and a fisher\'s net — painted in the game\'s storybook style, each alone and centred on a plain background, seen from slightly above and in front.'+NO,items:[
     ['pc_juggle_pin_a','Juggling club — red and gold','a juggling club of pale polished wood painted cherry red with two gold rings round its belly and a gold knob, standing upright on its base, a few blades of grass at its foot',28,48],
     ['pc_juggle_pin_b','Juggling club — teal and white','a juggling club of white-painted wood with teal stripes spiralling round it and a teal knob, standing upright on its base, a few blades of grass at its foot',28,48],
     ['pc_juggle_pin_c','Juggling club — violet and silver','a juggling club of violet-painted wood with thin silver bands and a silver knob, standing upright on its base, a few blades of grass at its foot',28,48],
     ['pc_fish_net','Old Nell\'s fishing net','a fisher\'s fishing net of knotted pale hemp rope heaped on the shore, a few round cork floats and a small wooden float-bob tangled in it, a little lake weed caught in the mesh — seen from slightly above',56,36],
     ['pc_fish_net_b','Fishing net — spread','the same fishing net spread out flat to dry, its cork floats along one edge',56,36],
     ['pc_juggle_pin_a_lie','Juggling club — red, lying down','the red and gold juggling club lying on its side in short grass',48,24]]});
})();
