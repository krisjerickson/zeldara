// ═══════════════════════════════════════════════════════════════════════
// ║ MAGE TOWER RUNS (round 5) — data in 07zm-mage-towers.js.
// ║ A mage tower is a tower-style dungeon (magic monsters on the way up);
// ║ its top floor is the master's sanctum: a single-phase magic boss with
// ║ signature tricks. Beat them, open the sanctum chest → learn the spell
// ║ (the tome is equipped if your spell slot is empty). Rematches (+25%)
// ║ give gold instead.
// ║ New player status: 'slip' (ice floors) — you slide with momentum.
// ║ Blindness inside Lab-built floors darkens the room itself (with the
// ║ master's glowing eyes still visible) instead of a screen vignette.
// ═══════════════════════════════════════════════════════════════════════
(function(){ MAGE_TOWERS.forEach(function(M){ var B=CHAR_BY_ID[M.boss]; if(!B)return;
  M.rid='mgb_'+M.key; MON_BY_ID[M.rid]={id:M.rid,name:M.bossName+', '+M.title,q:M.q,seg:'boss',role:'boss',tier:5,spec:B.spec,tags:[]}; MX.KITS[M.rid]=M.kit;
  var ill='mgi_'+M.key; MON_BY_ID[ill]={id:ill,name:M.bossName+' (echo)',q:M.q,seg:'tow',role:'',tier:2,spec:B.spec,tags:[]}; MX.KITS[ill]='kite range=160 | shoot p=orb n=1 m=0.3 cd=2.6'; }); })();
var MageRun={
  of:function(site){ return site&&site.mage?MAGE_BY_KEY[site.mage]:null; },
  done:function(ps,key){ return (ps.mageDone||[]).indexOf(key)>=0; },
  site:function(M){ return {id:'mage_'+M.key,type:'tower',section:M.q,design:_mageBg(M),mage:M.key,name:M.name,floors:M.floors}; },
  spawnBoss:function(scene,M,x,y,mult){ var base=MDEFS[CASTLE_TOWER_BOSS[M.q-1]]; if(!base)return null; mult=mult||1;
    var st={hp:Math.round(base.hp*1.25*mult),atk:Math.round(base.atk*0.85*mult),def:Math.round((base.def||0)*mult),lv:base.lvMax||base.lvMin||5,xp:Math.round(base.xp*0.7),gMin:base.gMin,gMax:base.gMax,r:Math.max(16,base.r)};
    var mon=MX.spawn(scene,M.rid,x,y,{q:M.q,stats:st,scale:2.1/MX.scaleOf(MON_BY_ID[M.rid])});
    if(!mon)return null; mon.isBoss=true; mon.mageBoss=true; mon._m.aggro=false; mon.bossKey='mg_'+M.key; scene.monsters.push(mon);
    scene._bossGroup=[mon]; scene._bossKey='mg_'+M.key; scene._bossPhase=1; scene._bpEv=[]; BossPhases.hud(scene,true);
    showNotif('🔮 '+M.bossName+', '+M.title+': '+M.skills.map(function(s){ return s.split(' — ')[0]; }).join(' · '),'#e0c0ff'); return mon; },
  learn:function(ps,tome,quiet){ var it=ITEMS[tome]; if(!it)return false; if(!ps.spellsLearned)ps.spellsLearned=[]; if(!ps.inventory)ps.inventory=[]; if(!ps.equip)ps.equip={};
    var fresh=ps.spellsLearned.indexOf(tome)<0; if(fresh)ps.spellsLearned.push(tome);
    if(ps.inventory.indexOf(tome)<0&&ps.equip.spell!==tome)ps.inventory.push(tome);
    var eq=false; if(!ps.equip.spell){ ps.equip.spell=tome; var ix=ps.inventory.indexOf(tome); if(ix>=0)ps.inventory.splice(ix,1); eq=true; }
    if(!quiet)showNotif('📖 Learned '+it.icon+' '+it.name+'!'+(eq?' Equipped — press X to cast it.':' Equip it in the Spell slot.'),'#e0c0ff');
    if(typeof Tome!=='undefined')Tome.see('spell',tome); return fresh; },
  claim:function(scene){ var ps=scene.worldScene.playerState, M=scene._mage, first=!MageRun.done(ps,M.key);
    if(first){ if(!ps.mageDone)ps.mageDone=[]; ps.mageDone.push(M.key); var g=60*M.q; ps.gold+=g; MageRun.learn(ps,M.spell);
      showNotif('🔮 '+M.name+' conquered! +'+g+'g','#ffdd44'); if(typeof campCelebrate==='function')campCelebrate(scene,scene.px,scene.py,'Spell learned!',(ITEMS[M.spell]||{}).name||''); }
    else { var g2=35*M.q; ps.gold+=g2; scene._dropItem(M.q); showNotif('🔮 Rematch won! +'+g2+'g','#ffdd44'); }
    scene.time.delayedCall(2000,function(){ scene._exitToWorld(null); }); }
};
// ── the 'slip' status (ice floors): register it with the monster engine ──
(function(){ var _st=MX.status; MX.status=function(A,st,dur,val){ if(st==='slip'){ var S=MX.S(A.scene), P=A.p(); if(!(S.slipT>0))A.float(P.x,P.y-44,'Slippery!','#bfe8ff'); S.slipT=Math.max(S.slipT||0,dur||1.5); return; } return _st.apply(this,arguments); };
  var _ts=MX.tickScene; MX.tickScene=function(scene,dt){ var S=MX.S(scene); if(S.slipT>0)S.slipT-=dt; return _ts.apply(this,arguments); };
  // blindness inside Lab floors: the room goes dark instead of the screen vignette
  var _ov=MX.overlay; MX.overlay=function(scene,S){ if(scene&&scene._lab&&scene.sys&&scene.sys.settings.key==='Dungeon'&&S.blindT>0){ var bl=S.blindT; S.blindT=0; _ov.call(this,scene,S); S.blindT=bl; return; } return _ov.apply(this,arguments); }; })();
