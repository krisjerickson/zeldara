// ═══════════════════════════════════════════════════════════════════════
// ║ 09h2-rare-loot.js — round 45: the seven new rare forging items (03c-arms-r45.js, R45_RARE) come out of the world.
// ║   • a castle warden or tower master named in R45_RARE: one the first time it is beaten, 1 in 4 on a later win
// ║   • a realm's dungeon / tower guardian (R45_RARE.boss = realm numbers): one on the first clear
// ║   • an Alpha of either of the item's elements (R45_RARE.alpha): 1 in 5
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZLoot==='undefined'||typeof R45_RARE==='undefined')return;
  var K=Object.keys(R45_RARE);
  ZLoot.rareFor=function(scene,ps,sec){ var got=[], first, key;
    if(scene._castle){ key=scene._castle.key; first=!CastleRun.done(ps,key); K.forEach(function(id){ if(R45_RARE[id].wardens.indexOf(key)>=0&&(first||Math.random()<0.25))got.push(id); }); }
    else if(scene._mage){ key=scene._mage.key; first=!MageRun.done(ps,key); K.forEach(function(id){ if(R45_RARE[id].masters.indexOf(key)>=0&&(first||Math.random()<0.25))got.push(id); }); }
    else if(!scene._isIsland&&!(scene._site&&!scene._site.boss)&&!scene._wasDone){ K.forEach(function(id){ if(R45_RARE[id].boss.indexOf(sec)>=0)got.push(id); }); }
    return got; };
  var _site=ZLoot.site; ZLoot.site=function(scene,ps,sec){ var extra=[]; try{ extra=ZLoot.rareFor(scene,ps,sec); }catch(e){} _site.apply(ZLoot,arguments);
    if(extra.length){ extra.forEach(function(id){ ZLoot.give(ps,id); }); ZLoot._say(scene,extra,4200); } };
  var _kill=ZLoot.kill; ZLoot.kill=function(A,mon){ _kill.apply(ZLoot,arguments);
    try{ if(!mon||!mon.alpha||mon._noLoot)return; var els=ZEL.mon(mon), ps=A.ps(); if(!els.length||!ps)return;
      var L=K.filter(function(id){ var R=R45_RARE[id]; return R.alpha&&R.els.some(function(e){ return els.indexOf(e)>=0; }); }); if(!L.length||Math.random()>=0.2)return;
      var id=L[Math.floor(Math.random()*L.length)]; ZLoot.give(ps,id); A.float(mon.x,mon.y-((mon.def&&mon.def.r)||10)-44,'✦ '+ITEMS[id].name,'#ffe9a8'); if(typeof showNotif==='function')showNotif('✦ The Alpha '+mon.def.name+' left a '+ITEMS[id].name+' — a rare forging item','#ffe9a8'); }catch(e){} };
})();
