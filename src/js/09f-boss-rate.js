// ═══════════════════════════════════════════════════════════════════════
// ║ 09f-boss-rate.js — round 47 (Kris: "increase the attack rate for bosses in the higher level regions"). His card, stepped by region: the
// ║ Grasslands as they were, the Wetlands 15 % faster, the Highlands 30 %, the Ashlands 45 % — every boss attack's wind-up and cooldown shortened by
// ║ that much (on top of the difficulty level's own). Their health is doubled in 04g (ZDiff.BOSS_HP).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof MX==='undefined')return;
  MX.BOSS_RATE={1:1,2:1.15,3:1.30,4:1.45};
  MX.bossRate=function(mon){ var q=mon&&mon._rq||1; return 1/(MX.BOSS_RATE[q]||1); };
  var sp0=MX.spawn; MX.spawn=function(scene,rid,x,y,o){ var m=sp0.apply(MX,arguments); if(m){ var R=MON_BY_ID[rid]; m._rq=Math.max(1,Math.min(4,(o&&o.q)||(R&&R.q)||1)); } return m; };
})();
