// ═══════════════════════════════════════════════════════════════════════
// ║ SAVE VERSIONING  (Phase 1 · panel A3)
// ║ Saves live in the chosen player's slot (ZSave, 04d-profiles.js); the old single
// ║ save localStorage['qoz_v2'] is moved into "Player 1", slot 1.
// ║ Each save now carries saveVersion. _migrateSave() upgrades older saves
// ║ step by step and keeps a one-time backup of the pre-migration save in
// ║ localStorage['qoz_v2_backup_v<old>'] so nothing is ever lost.
// ║ To change the save shape later: bump SAVE_VERSION and add a step.
// ║ v8: the explored grid is saved bit-packed (exploredBits) instead of a number array.
// ═══════════════════════════════════════════════════════════════════════
var SAVE_VERSION=8;
var _SAVE_TRANSIENT=['_seaState','_famWard','_famLastHp'];   // runtime-only fields never written to disk

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
  if(v<4){
    // Phase 3: towers/dungeons use the Lab designs (new floor sizes) → old
    // per-floor fog no longer lines up. Harbor/sky-port quests now complete
    // (they never did before), so backfill them from what was already won.
    d.dungeonFog={};
    if(!Array.isArray(d.completedQuests))d.completedQuests=[];
    (d.completedIslands||[]).forEach(function(sec){ var k='s'+sec+'_harbor'; if(d.completedQuests.indexOf(k)<0)d.completedQuests.push(k); });
    (d.lockedSites||[]).forEach(function(id){ if(/^s[1-4]_skyport$/.test(id)&&d.completedQuests.indexOf(id)<0)d.completedQuests.push(id); });
    if(!Array.isArray(d.bonusCleared))d.bonusCleared=[];
    if(!Array.isArray(d.relics))d.relics=[];
    if(!Array.isArray(d.rescued))d.rescued=[];
    // Tower bosses already beaten → their craftsman is already free
    [1,2,3,4].forEach(function(sec){ if(d.completedQuests.indexOf('s'+sec+'_tower')>=0&&d.rescued.indexOf(sec)<0)d.rescued.push(sec); });
  }
  if(v<5){
    // Phase 3: the world is now the 1200 × 1200 continent. Old positions and
    // the old 75×75 exploration grid don't line up with it: start at the
    // village with a fresh map (progress, items and quests are kept).
    delete d.px; delete d.py; delete d.exploredGridArr;
    d.activatedWaystones=['ws_village']; d.visitedZones=[];
  }
  if(v<6){
    // Phase 4c: familiars are the four elemental spirits (fam_grass/water/earth/fire)
    _famMigrate(d);
  }
  if(v<7){
    // Round 6: the old side-view Ember Cave never completed its harbor quest (so the Dragon could never
    // be earned). Any cleared familiar island now counts. Familiars pick one special (default: newest).
    if(!Array.isArray(d.completedQuests))d.completedQuests=[];
    (d.completedIslands||[]).forEach(function(sec){ var k='s'+sec+'_harbor'; if(d.completedQuests.indexOf(k)<0)d.completedQuests.push(k); });
    if(!d.famSpecial)d.famSpecial={};
    if(typeof ALL_MAIN_QUESTS!=='undefined'&&ALL_MAIN_QUESTS.every(function(q){ return d.completedQuests.indexOf(q)>=0; })){ if(!Array.isArray(d.ownedMounts))d.ownedMounts=[]; if(d.ownedMounts.indexOf('dragon')<0)d.ownedMounts.push('dragon'); }
  }
  if(v<8){
    // Perf round: the explored grid (150×150 cells, 0/1) was a JSON number array (~45 KB of a
    // ~47 KB save). It is now bit-packed + base64 in d.exploredBits (~3.8 KB).
    if(Array.isArray(d.exploredGridArr)){ d.exploredBits=_packBits(d.exploredGridArr); }
    delete d.exploredGridArr;
  }
  _SAVE_TRANSIENT.forEach(function(k){ delete d[k]; });
  d.saveVersion=SAVE_VERSION;
  return d;
}
// 0/1 grid (typed array or plain array) <-> base64 of its bits, 8 cells per byte, LSB first
function _packBits(a){
  var n=a.length, b=new Uint8Array((n+7)>>3);
  for(var i=0;i<n;i++)if(a[i])b[i>>3]|=1<<(i&7);
  var s=''; for(var j=0;j<b.length;j+=8192)s+=String.fromCharCode.apply(null,b.subarray(j,j+8192));
  return btoa(s);
}
function _unpackBits(str,n){
  var out=new Uint8Array(n); if(typeof str!=='string'||!str)return out;
  var s; try{ s=atob(str); }catch(e){ return out; }
  for(var i=0;i<n;i++){ var k=i>>3; if(k>=s.length)break; if(s.charCodeAt(k)&(1<<(i&7)))out[i]=1; }
  return out;
}
function _prepareSave(d){
  _SAVE_TRANSIENT.forEach(function(k){ delete d[k]; });
  // Saving while inside a dungeon: store the stowed mount as the real one.
  if(d._stowedMount){ d.mount=d._stowedMount; delete d._stowedMount; }
  d.saveVersion=SAVE_VERSION;
  return d;
}
