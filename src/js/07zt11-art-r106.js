// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt11-art-r106.js — round 106 paintings (Kris: "there also need to be some healing wells in the adventure sites … we can also come up
// ║ with new painted art for the healing wells").
// ║   sc_r106_wells   the healing well, full (glowing) and spent (dry), in three kinds of stone so each site's well fits its floor — 12d-heal-wells.js
// ║ Until they are in, the well is drawn by code (a stone ring with glowing water).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[106]='Round 106 — the healing wells of the adventure sites';
  var NO=' No pixel art. No text, no letters, no numbers.';
  ZSCN.SHEETS.push(
   {id:'sc_r106_wells',wave:106,fam:'r106',kind:'obj',cols:3,rows:2,size:'1536x1024',refs:['sc_vill_special_2'],
    title:'A small healing well inside a dungeon or tower, painted in the game\'s storybook style, seen from slightly above and in front, alone and centred on a plain background.'+NO,items:[
     ['dg_heal_well','Healing well — full','a small round well of mossy grey stone about knee high, brimming with glowing teal water, a soft teal light rising from it with tiny bright motes, a carved rune of healing on the front stone',64,58],
     ['dg_heal_well_dry','Healing well — spent','the same small round well of mossy grey stone, its water gone dark and still, no glow, the carved rune dim',64,58],
     ['dg_heal_well_ice','Healing well — frost stone, full','a small round well of pale blue frosted stone with icicles on its rim, brimming with glowing teal water and a soft light',64,58],
     ['dg_heal_well_ice_dry','Healing well — frost stone, spent','the same frosted well, its water frozen dark, no glow',64,58],
     ['dg_heal_well_ember','Healing well — black basalt, full','a small round well of black basalt with thin glowing orange cracks, brimming with glowing teal water that steams softly',64,58],
     ['dg_heal_well_ember_dry','Healing well — black basalt, spent','the same basalt well, its water gone, a little ash in the bottom, the cracks dim',64,58]]});
})();
