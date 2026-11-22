// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt22-art-r129-bossprops.js — round 129: the boss plan's arena props, painted (the new elements draw a stand-in until each is in).
// ║   sc_bp_props   braziers to light, pillars that rise as cover, the anvil to hide behind, the bones that rise again
// ║   .\tools\sprites\paint.ps1 -List r129_bossprops
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[130]='Round 129 — the boss plan: braziers, rising pillars, cover and bones in the arenas';
  ZSCN.SHEETS.push({id:'sc_bp_props',wave:130,fam:'boss',kind:'obj',cols:4,rows:2,size:'1536x1024',refs:['sc_vprops_1'],
    title:'Boss-arena props. Each piece alone and centred on a transparent background, in the game\'s classic top-down three-quarter view, standing on the ground with a soft shadow. No pixel art. No text, no letters, no numbers.',items:[
     ['bp_brazier','An unlit iron brazier','a squat black-iron brazier bowl on three clawed legs, full of dark coals, unlit',30,36],
     ['bp_pillar_stone','A rising stone pillar','a short rough pillar of grey stone that has just burst up through the floor, broken flagstones and dust round its foot',28,40],
     ['bp_pillar_ice','A rising ice pillar','a short pillar of clear blue ice that has just burst up through the floor, frost cracks round its foot',28,40],
     ['bp_pillar_crystal','A rising crystal pillar','a short cluster of violet and teal crystal that has just burst up through the floor',28,40],
     ['bp_pillar_obsidian','A rising obsidian pillar','a short pillar of black glassy obsidian with glowing orange cracks, just burst up through the floor',28,40],
     ['bp_anvil','A great anvil','a huge dark-iron anvil on a stone block, scarred and solid, big enough to hide behind',42,36],
     ['bp_bones','A pile of bones','a small heap of old bones with a cracked helmet and a broken shield, faintly glowing as if about to rise',30,20],
     ['bp_totem','A runestone totem','a small carved standing stone with a glowing rune and a ring of tiny stones at its foot',22,34]]});
})();
