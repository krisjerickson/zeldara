// ═══════════════════════════════════════════════════════════════════════
// ║ 07zau9-calm.js — round 138 (Kris: "our music has gotten too fast for the background music when you're not in the middle of fights"; doc 95,
// ║ Lab › Music: the pace). The calm songs came out at the tempo asked, but the shared ending of every prompt ("driving electronic drums …
// ║ synth arpeggios … energetic, grand") gave them a double-time beat. From now on the Rest and Calm songs — and the exploring songs that felt
// ║ fast — are asked for with their own ending: a half-time feel, a soft sparse pulse, no busy hi-hats or fast arpeggios, lots of space.
// ═══════════════════════════════════════════════════════════════════════
var ZCALM={ IDS:['mu_title','mu_home','mu_saga_storm','mu_saga_old','mu_glimpse','mu_village_day','mu_village_night','mu_shops','mu_glimmerhall','mu_green',
    'mu_grass_night','mu_wet_night','mu_high_night','mu_ash_night','mu_high_day','mu_ash_day','mu_dungeon','mu_tower','mu_mage','mu_sky',
    'mu_asgard_down','mu_asgard','mu_feast_hall','mu_gods_free','mu_bifrost','mu_credits'],
  TAIL:'half-time feel: a soft, sparse pulse on the main beats only, no busy hi-hats, no fast arpeggios, no double-time drums, lots of space and air between the notes, unhurried and calm, never driving',
  calm:function(s){ return s.replace(/driving (dark )?electronic( drums| beats| rhythm| pulse)?/g,'a soft electronic pulse').replace(/,? ?energetic,? ?/g,', ').replace(/,? ?(bright |glittering |pulsing |rising |plucked |fast )?(synth |analog synth )?arpeggios?/g,'').replace(/a punchy virtuosic electric bass/g,'a warm electric bass').replace(/ , /g,', ').replace(/;\s*;/g,';'); } };
(function(){ if(typeof ZAUD==='undefined'||!ZAUD.suno)return; var s0=ZAUD.suno;
  ZAUD.suno=function(c){ var r=s0.apply(this,arguments); if(c&&ZCALM.IDS.indexOf(c.id)>=0){ r.style=ZCALM.calm(r.style).replace(/\.\s*$/,'')+'; '+ZCALM.TAIL+'.'; r.exclude=(r.exclude?r.exclude+', ':'')+'double-time drums, busy hi-hats, fast arpeggios'; } return r; }; })();
