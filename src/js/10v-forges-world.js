// ═══════════════════════════════════════════════════════════════════════
// ║ 10v-forges-world.js — round 51: the four forges and Muspelheim appear on the world map once they are unlocked (all four boss
// ║ dungeons and all four master builders' towers), at load or the moment the last of them is done. Before this round the check ran
// ║ before the save was loaded, so they only ever appeared through the Dev buttons.
// ═══════════════════════════════════════════════════════════════════════
var ZFORGEW={ tick:function(){ try{ if(typeof game==='undefined'||!game.scene)return; var ws=game.scene.getScene('World'); if(!ws||!ws.wd||!ws.playerState||!ws.siteObjs)return;
    if(ws.wd._volcSpawned)return; if(!_finalQuestUnlocked(ws.playerState))return; ws.wd._volcSpawned=true; _spawnVolcanoVisuals(ws);
    if(!ws.playerState._forgesNoted){ ws.playerState._forgesNoted=true; showNotif('🌋 The ground shakes — four forges rise from the sea, and Muspelheim wakes in the Ashlands.','#ff8844'); } }catch(e){ console.warn('forges',e); } } };
setInterval(ZFORGEW.tick,1000);
