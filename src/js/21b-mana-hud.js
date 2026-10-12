// ═══════════════════════════════════════════════════════════════════════
// ║ 21b-mana-hud.js — round 47 (Kris: "mana bar needs to be shown once you have your first spell. And the mana bar should show in all worlds").
// ║ The mana row of the HUD is hidden until you own a spell (a tome, or a spell learned at a mage tower), and it is kept up to date in every
// ║ scene — adventure sites, islands, buildings, sky ports — not only when the overworld redraws the HUD.
// ═══════════════════════════════════════════════════════════════════════
var ZMANA={ always:true,      // round 49 (Kris's card): always on the HUD, in every world
  has:function(ps){ if(!ps)return false; if((ps.spellsLearned||[]).length)return true; if(ps.equip&&ps.equip.spell)return true; return (ps.inventory||[]).some(function(id){ var I=ITEMS[id]; return !!(I&&I.spellId); }); },
  row:function(){ var b=document.getElementById('mana-bar'); return b?b.closest('.srow'):null; },
  tick:function(){ try{ var ws=typeof game!=='undefined'&&game.scene&&game.scene.getScene('World'), ps=ws&&ws.playerState; if(!ps)return; var on=ZMANA.always||ZMANA.has(ps), r=ZMANA.row(); if(r&&r.style.display!==(on?'':'none'))r.style.display=on?'':'none'; if(!on)return;
      var mana=Math.floor(ps.mana||0), mx=ps.maxMana||50; _hudW('mana-bar','width',Math.min(100,mana/mx*100)+'%'); _hudW('mana-val','text',mana+'/'+mx); }catch(e){} } };
if(typeof setInterval!=='undefined'&&typeof document!=='undefined')setInterval(ZMANA.tick,200);
