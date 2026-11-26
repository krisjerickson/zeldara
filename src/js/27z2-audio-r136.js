// ═══════════════════════════════════════════════════════════════════════
// ║ 27z2-audio-r136.js — round 136: Kris's picks in the Lab, "Stingers or effects?". Seven moments keep (or get) a sound effect and no
// ║ stinger; only the fall gets its stinger, cut to its five seconds and played with the effect ("both"):
// ║  · a spirit freed, a soul-line lit, a boss down, a glimpse opening — their effects, as before (the stingers never play)
// ║  · a quest done — the camp-cleared fanfare (sfx_camp), which had no sound before
// ║  · level up — the gem chime (sfx_gem) with the banner
// ║  · a new place — the great door (sfx_great_door) the first time you find a place
// ║  · you fall — the fall (sfx_fall, 27z) and the stinger st_death together
// ║ The other eleven stingers are kept out of assets/audio (the intake skips st_* unless asked; the originals are in audio/masters/stingers_r135).
// ═══════════════════════════════════════════════════════════════════════
var ZSTING={ on:true, KEEP:{st_death:1},
  // no stinger plays unless Kris kept it
  ok:function(id){ return !/^st_/.test(id)||!!ZSTING.KEEP[id]; } };
setTimeout(function(){ if(typeof ZAHOOK==='undefined'||typeof ZAUDIO==='undefined')return; var H=ZAHOOK, s=H.s;
  var p0=ZAUDIO.play; ZAUDIO.play=function(id){ if(ZSTING.on&&!ZSTING.ok(id))return false; return p0.apply(ZAUDIO,arguments); };
  H.GAP.sfx_great_door=4000; H.GAP.sfx_camp=1500; H.GAP.sfx_gem=Math.max(H.GAP.sfx_gem||0,150);
  if(typeof _completeQuest==='function'){ var cq=_completeQuest; _completeQuest=function(ps,key){ var had=ps&&(ps.completedQuests||[]).indexOf(key)>=0, r=cq.apply(this,arguments); if(ZSTING.on&&!had)s('sfx_camp'); return r; }; }
  if(typeof WorldScene!=='undefined'&&WorldScene.prototype._checkLevelUp){ var cl=WorldScene.prototype._checkLevelUp; WorldScene.prototype._checkLevelUp=function(ps){ var l0=ps&&ps.level, r=cl.apply(this,arguments); if(ZSTING.on&&ps&&ps.level>l0)s('sfx_gem',{vol:1.2}); return r; }; }
  if(typeof Tome!=='undefined'&&Tome.see){ var ts=Tome.see; Tome.see=function(cat,id){ var r=ts.apply(Tome,arguments); if(ZSTING.on&&r&&cat==='place')s('sfx_great_door'); return r; }; }
  if(typeof ZDeath!=='undefined'&&ZDeath.run){ var dr=ZDeath.run; ZDeath.run=function(){ var r=dr.apply(ZDeath,arguments); if(ZSTING.on&&!ZDeath.auto)setTimeout(function(){ ZAUDIO.play('st_death'); },250); return r; }; }
},40);
