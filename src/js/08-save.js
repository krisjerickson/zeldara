// ═══════════════════════════════════════════════════════════════════════
// ║ SAVE VERSIONING  (Phase 1 · panel A3)
// ║ Saves live in localStorage['qoz_v2'] (key kept so existing saves load).
// ║ Each save now carries saveVersion. _migrateSave() upgrades older saves
// ║ step by step and keeps a one-time backup of the pre-migration save in
// ║ localStorage['qoz_v2_backup_v<old>'] so nothing is ever lost.
// ║ To change the save shape later: bump SAVE_VERSION and add a step.
// ═══════════════════════════════════════════════════════════════════════
var SAVE_VERSION=3;
var _SAVE_TRANSIENT=['_seaState'];   // runtime-only fields never written to disk

function _migrateSave(d, raw){
  var v=d.saveVersion||2;              // saves before versioning = v2
  if(v<SAVE_VERSION){
    try{ var bk='qoz_v2_backup_v'+v; if(!localStorage.getItem(bk))localStorage.setItem(bk,raw); }catch(e){}
  }
  if(v<3){
    // Phase 1: mounts are stowed inside special areas; a save made in there
    // must come back mounted. Familiar slots and ownership arrays guaranteed.
    if(d._stowedMount&&!d.mount)d.mount=d._stowedMount;
    delete d._stowedMount;
    if(!Array.isArray(d.ownedFamiliars))d.ownedFamiliars=[];
    ['familiar','familiar2','familiar3'].forEach(function(k){ if(d[k]&&!FAMILIARS[d[k]])d[k]=null; });
    if(!d.buffs)d.buffs={};
  }
  _SAVE_TRANSIENT.forEach(function(k){ delete d[k]; });
  d.saveVersion=SAVE_VERSION;
  return d;
}
function _prepareSave(d){
  _SAVE_TRANSIENT.forEach(function(k){ delete d[k]; });
  // Saving while inside a dungeon: store the stowed mount as the real one.
  if(d._stowedMount){ d.mount=d._stowedMount; delete d._stowedMount; }
  d.saveVersion=SAVE_VERSION;
  return d;
}
