// ═══════════════════════════════════════════════════════════════════════
// ║ 79i-lab-archive.js — round 84c: THE FINISHED TABS GO TO THE ARCHIVE (Kris: "you can also archive things in the drop down that are complete
// ║ like: library, fonts, soul-lines, potions, asgard, forge masters. But if changes come up, then we can float these up again").
// ║ LAB_ACTIVE is the row of tab buttons; every other tab sits in the drop-down, now called "Archived & earlier rounds". To float one up
// ║ again, take its id out of LAB_ARCHIVED (the tab itself and its picks never change).
// ═══════════════════════════════════════════════════════════════════════
var LAB_ARCHIVED=['library','zfonts','soullines','soulstyle','soulgame','potions','asgard','fmpaint'];
(function(){ if(typeof LAB_ACTIVE==='undefined')return;
  for(var i=LAB_ACTIVE.length-1;i>=0;i--)if(LAB_ARCHIVED.indexOf(LAB_ACTIVE[i])>=0)LAB_ACTIVE.splice(i,1);
  // the newest first: the sound effects to pick, the music, the dialogue box
  ['dialogue','audio','sfxpick'].forEach(function(id){ var j=LAB_ACTIVE.indexOf(id); if(j>=0)LAB_ACTIVE.splice(j,1); LAB_ACTIVE.unshift(id); });
  // the drop-down's name is set in 30-lab-core.js renderTabs ("Archived & earlier rounds")
})();
