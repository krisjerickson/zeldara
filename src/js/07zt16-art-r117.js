// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt16-art-r117.js — round 117: THE SKY GUARDIANS (Kris: "skyport boss … does not show up in the game visually, we might need to develop
// ║ new sprites for these"). One sheet per realm, three frames of the same beast: wings up, wings down, enraged. 15-scene-sky.js _boss uses them
// ║ as soon as they are in (sk_gd_<realm>_a/_b/_c); until then the realm's biggest flyer stands in, drawn large and tinted.
// ║   .\tools\sprites\paint.ps1 -List r117_sky
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[117]='Round 117 — the four sky guardians, the sky ports\' bosses';
  var V=' Seen from below and in front, facing the viewer, as the great boss at the top of a vertical flying-battle screen. Painted in the game\'s storybook style with a clean dark outline, glowing teal rune-marks, a soft magenta rim light. Each frame alone and centred, the same creature in all three, the whole creature inside its frame. No rider, no saddle, no harness. No pixel art. No text, no letters, no numbers.';
  var G=[[1,'The Gale Roc','a huge storm-eagle roc of green and gold feathers, a hooked golden beak, teal rune-marks glowing along its wing bones, a crest of long feathers'],
    [2,'The Mist Heron-Wyrm','a long-necked heron-dragon of slate-blue scales and pale feathers, a long pointed beak, webbed wings trailing mist, teal runes down its throat'],
    [3,'The Thunder Gryphon','a great storm-grey gryphon, an eagle\'s head and a lion\'s body, white-tipped wings, blue lightning crackling along its feathers and claws'],
    [4,'The Ember Wyvern','a black-scaled wyvern with molten orange cracks along its body, wing membranes glowing like embers, smoke curling from its jaws']];
  G.forEach(function(g){ var n=g[0];
    ZSCN.SHEETS.push({id:'sc_sky_guard_'+n,wave:117,fam:'sky',kind:'obj',cols:3,rows:1,size:'1536x1024',refs:['sc_sky_1'],view:'View: seen from below and in front, as a flying beast high above the viewer in a vertical flying-battle game: its belly, the undersides of its wings and its face looking down at you. No ground.',title:g[1]+', the sky guardian — three frames of one beast.'+V,items:[
      ['sk_gd_'+n+'_a',g[1]+' — wings up',g[2]+', hovering, wings raised high above its body',260,220],
      ['sk_gd_'+n+'_b',g[1]+' — wings down',g[2]+', hovering, wings swept down below its body (the other beat of the same flap)',260,220],
      ['sk_gd_'+n+'_c',g[1]+' — enraged',g[2]+', wings spread wide, jaws or beak open in a roar, its rune-marks blazing bright and red-hot, eyes glowing',260,220]]}); });
})();
