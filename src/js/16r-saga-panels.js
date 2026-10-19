// ═══════════════════════════════════════════════════════════════════════
// ║ 16r-saga-panels.js — round 68: THE SAGA TOLD IN PAINTED PANELS (doc 30 §9–§11; Kris: "Order the first 11").
// ║ The story comes in pieces, never in order (doc 30 §3): the opening when a new game starts; each realm's old disaster when its tenth
// ║ spirit is freed (its soul-line traced); a glimpse of the shut gate at the twentieth. Panels from scenery wave 76 (round71.ps1).
// ║ A set plays only once all its panels are painted (no stand-ins for the story), once per game (ps.sagaSeen), through the cut-scene
// ║ player (16p ZCUT: letterbox, a line under each panel, click / Space to go on, Skip).
// ═══════════════════════════════════════════════════════════════════════
var ZSAGA={
  SETS:{
    opening:[['pn_saga_cradles','In the last village the cradles stood empty. No child had been born alive in a lifetime.'],
      ['pn_saga_storm','Then came the worst storm anyone remembered — and the lightning struck the runestones, one after another.'],
      ['pn_saga_basket','At dawn a basket drifted out of Mirror Lake. In it lay two babes whose eyes glowed rune-blue.'],
      ['pn_saga_raised','The village named them Zeldara and Zeldor, and raised them on goat\'s milk and old songs.'],
      ['pn_saga_eyes','They read runes no one else could, and the old stones woke for them.'],
      ['pn_saga_sendoff','Now the village is old and tired. One twin goes out into Runeheim; the other stays to keep the village.']],
    realm4:[['pn_saga_ashnight','The Ash Night: the night Asgard\'s gate shut, fire fell on the Ashlands and the Ember Wall rose.']],
    realm3:[['pn_saga_stonefall','Three years on, the Highlands dug too deep for a voice in the stone — and the mountains broke.']],
    realm2:[['pn_saga_blacktide','Then the Black Tide: the Silverrun rose black, and the marshes drank the villages.']],
    realm1:[['pn_saga_quiet','Only the Grasslands were left — and the Long Quiet, when the dead drifted at the edge of the light.']],
    gate:[['pn_saga_gate','High above, a golden gate had shut. On Odin\'s high seat sat someone in a golden mask.']] },
  ready:function(k){ var S=ZSAGA.SETS[k]; return !!(S&&typeof ZCUT!=='undefined'&&S.every(function(p){ return ZCUT.painted(p[0]); })); },
  seen:function(ps){ return ps.sagaSeen||(ps.sagaSeen=[]); },
  // plays set k once per game, when painted; returns true if it plays
  play:function(ps,k,done){ if(!ps||typeof ZCUT==='undefined'||!ZCUT.on){ if(done)done(); return false; } var L=ZSAGA.seen(ps); if(L.indexOf(k)>=0||!ZSAGA.ready(k)){ if(done)done(); return false; }
    L.push(k); ZCUT.SETS['saga_'+k]=ZSAGA.SETS[k]; return ZCUT.play('saga',k,done); },
  // after a spirit's soul-line is drawn: a realm at 10/10 tells its old disaster; the twentieth spirit, a glimpse of the gate
  afterTrace:function(ws,s){ var ps=ws.playerState; if(!ps||!s)return; var n=(ps.spiritsFreed||[]).length, q=s.q, inQ=ZSPIRIT.count(ps,q);
    var k=inQ>=10?'realm'+q:(n>=20?'gate':null); if(k)setTimeout(function(){ ZSAGA.play(ps,k); },900); },
  // a new game: the opening (old saves count it as seen)
  start:function(ws){ var ps=ws.playerState; if(!ps||ps.sagaSeen)return; if(!ws._newGame){ ps.sagaSeen=['opening']; return; } ZSAGA.seen(ps); setTimeout(function(){ if(ws.sys&&ws.sys.isActive())ZSAGA.play(ps,'opening'); },1500); }
};
if(typeof ZCUT!=='undefined'&&!ZCUT.LOOK.saga)ZCUT.LOOK.saga={bg:['#0c1a24','#03070b'],glow:'rgba(111,227,245,',sub:'#bff6ff'};
