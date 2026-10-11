// ═══════════════════════════════════════════════════════════════════════
// ║ 21c-save.js — round 47: saving is yours to do.
// ║ Kris: "Saving should also not always happen. You should need to open inventory, and then have a save option. Tome should also have a button
// ║ in inventory and vis versa. Include a save button in Tome as well." His card: "lets do manual, plus some auto-save times: completing an
// ║ adventure site, advancing in a floor in an adventure site, completing a quest, or other related significant milestones. Also when you sleep".
// ║ The 30-second autosave is gone. The game still saves itself when you: finish a site, go down a floor, complete a quest, clear a castle or a
// ║ mage tower, free a craftsman, wake a waystone, learn a spell or a familiar skill, sleep in your bed (ZSAVE.watch spots the progress).
// ║ Fast travel, opening a cache and simply walking out of a site no longer save.
// ═══════════════════════════════════════════════════════════════════════
var ZSAVE={ last:0,
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  write:function(){ var ws=ZSAVE.ws(); if(!ws||!ws._save||!ws.player||!ws.playerState)return false; ws._save(); ZSAVE.last=Date.now(); ZSAVE.sig=ZSAVE.sigOf(ws.playerState); return true; },
  manual:function(){ if(ZSAVE.write())showNotif('💾 Game saved','#9fe8ff'); else showNotif('Could not save right now','#ff8866'); },
  auto:function(why){ if(ZSAVE.write()&&why)showNotif('💾 Saved — '+why,'#7fb8c8'); },
  // the progress that counts as a milestone
  sigOf:function(ps){ var n=function(a){ return (a||[]).length; }, fl=0; try{ Object.keys(ps.famLevels||{}).forEach(function(k){ fl+=ps.famLevels[k]||0; }); }catch(e){}
    return [n(ps.completedQuests),n(ps.lockedSites),n(ps.bonusCleared),n(ps.castlesDone),n(ps.mageDone),n(ps.rescued),n(ps.activatedWaystones),n(ps.spellsLearned),fl,ps.rollQ||0,ps.volcanoStage||0,n(ps.fairyQuestsDone||ps.fqDone)].join('|'); },
  watch:function(){ var ws=ZSAVE.ws(), ps=ws&&ws.playerState; if(!ps||!ws.player)return; var s=ZSAVE.sigOf(ps); if(ZSAVE.sig===undefined){ ZSAVE.sig=s; return; } if(s!==ZSAVE.sig)ZSAVE.auto('a milestone'); },
  openInv:function(){ var ws=ZSAVE.ws(); if(!ws)return; if(typeof updateInventoryModal==='function')updateInventoryModal(ws.playerState); var e=document.getElementById('modal-inventory'); if(e&&e.style.display==='none')toggleModal('inventory'); },
  openTome:function(){ if(typeof Tome!=='undefined')Tome.open(); },
  // the two buttons in a modal's header (inventory ⇄ Tome, and Save)
  btns:function(other){ var st='margin-left:6px;padding:3px 9px;border-radius:6px;border:1px solid rgba(159,232,255,.45);background:rgba(40,80,100,.35);color:#cfefff;font-size:12px;cursor:pointer';
    return '<span class="zsave-btns" style="margin-left:auto;margin-right:8px;display:inline-flex">'+(other==='tome'?'<button style="'+st+'" onclick="closeModal(\'inventory\');ZSAVE.openTome()">📖 Tome</button>':'<button style="'+st+'" onclick="closeModal(\'tome\');ZSAVE.openInv()">🎒 Inventory</button>')+'<button style="'+st+'" onclick="ZSAVE.manual()">💾 Save</button></span>'; } };
if(typeof setInterval!=='undefined')setInterval(function(){ try{ ZSAVE.watch(); }catch(e){} },2000);
