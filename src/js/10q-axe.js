// ═══════════════════════════════════════════════════════════════════════
// ║ 10q-axe.js — round 47: the axe as a heavy weapon.
// ║ Kris: "the axe needs to swing slower than the sword and you need to stop moving as you swing it, but it should deal more damage per swing.
// ║ Let's update all related mechanics and update in the tome." His card (heavy): 0.9 s a swing (the sword 0.45 s), the hero stands still for
// ║ the first 0.35 s of each swing, each hit does 1.6 × the damage; the stagger and the longer reach stay. Chopping trees is unchanged.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZHit==='undefined')return;
  ZHit.AXE={t:0.9,root:0.35,mult:1.6,reach:14}; ZHit.SWORD={t:0.45,reach:0};
  ZHit.isAxe=function(){ var ps=ZHit._ps(), w=ZHit._eq(ps,'lHand'); return !!(w&&w.cls==='axe'); };
  ZHit.swing=function(){ if(ZHit.isAxe()){ var A=ZHit.AXE; ZHit._rootUntil=Date.now()+A.root*1000; return {t:A.t,reach:A.reach,root:A.root,mult:A.mult,axe:true}; } return {t:ZHit.SWORD.t,reach:0,root:0,mult:1}; };
  ZHit.rooted=function(){ return !!(ZHit._rootUntil&&Date.now()<ZHit._rootUntil); };
  // every melee hit with an axe in hand: 1.6 × (the hit itself — defence and elements are worked out on the bigger number)
  var d0=ZHit.dmg; ZHit.dmg=function(scene,mon,raw,kind,o){ if(kind==='melee'&&!(o&&o.noAxe)&&ZHit.isAxe())raw=Math.round(raw*ZHit.AXE.mult); return d0.call(ZHit,scene,mon,raw,kind,o); };
  // standing still through the wind-up (the shared movement modifier both scenes use)
  if(typeof MX!=='undefined'&&MX.moveMods){ var mm=MX.moveMods; MX.moveMods=function(scene){ var r=mm.call(MX,scene); if(ZHit.rooted())return {mult:0,rev:r&&r.rev}; return r; }; }
})();
