// ═══════════════════════════════════════════════════════════════════════
// ║ 16r-saga-panels.js — round 68: THE SAGA TOLD IN PAINTED PANELS (doc 30 §9–§11; Kris: "Order the first 11").
// ║ The story comes in pieces, never in order (doc 30 §3): the opening when a new game starts; each realm's old disaster when its tenth
// ║ spirit is freed (its soul-line traced); a glimpse of the shut gate at the twentieth. Panels from scenery wave 76 (round71.ps1).
// ║ A set plays only once all its panels are painted (no stand-ins for the story), once per game (ps.sagaSeen), through the cut-scene
// ║ player (16p ZCUT: letterbox, a line under each panel, click / Space to go on, Skip).
// ║ Round 69: five panels redone without the hero (wave 77, '_b') — the first ones had the twin in scenes from before the twins were born.
// ═══════════════════════════════════════════════════════════════════════
var ZSAGA={
  SETS:ZSAGA_SETS,      // the panels and their lines live in 07zsg-saga-sets.js (shared with the Lab, round 69)
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
if(typeof ZCUT!=='undefined'&&ZCUT.LOOK&&!ZCUT.LOOK.saga)ZCUT.LOOK.saga={bg:['#0c1a24','#03070b'],glow:'rgba(111,227,245,',sub:'#bff6ff'};
