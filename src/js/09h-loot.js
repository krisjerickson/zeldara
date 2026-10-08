// ═══════════════════════════════════════════════════════════════════════
// ║ 09h-loot.js — ZLoot: gems as the reward for adventuring (round 37).
// ║ Kris (Oct 7): "gems … difficult to get at the jeweler, and should be more rewards for adventuring."
// ║   • Every guarded place pays in the gems of ITS guardian's element(s): castle wardens, tower masters,
// ║     island guardians, treasure vaults and realm bosses (ZLoot.site, called when the chest opens).
// ║   • Strong monsters drop the gem of their own element: alphas, site elites, two-element monsters,
// ║     and now and then anything with an element (ZLoot.kill, from MX.onDeath).
// ║   • Chests, caches and camps give the gems of their realm (ZLoot.realmGem). Each realm's gems are the
// ║     ones the NEXT realm is weak to, so what you find prepares you for what comes.
// ║   • The jeweller sells one of each common gem at a time, for gold AND dungeon coins — and coins only
// ║     come out of dungeons, towers, castles and vaults. The shelf refills when you clear another place.
// ║     Rare gems (Fire Opal, Pearl, Heartseed, Deep Crystal, Skystone, Moon Shard) are never sold.
// ║   • Gem setting (ZLoot.setGem): armor, shields, amulets and rings take up to two elements in all.
// ║ Also here: the mount fixes of round 37 (Horse for sale, Sky Eagle, Dragon as the best mount).
// ═══════════════════════════════════════════════════════════════════════
var ZLoot={
  // the gems a realm's chests, caches and camps hold
  REALM:{1:['gem_emerald','gem_amber','gem_ruby'],2:['gem_sapphire','gem_emerald','gem_onyx'],3:['gem_amber','gem_topaz','gem_sapphire'],4:['gem_ruby','gem_onyx','gem_topaz']},
  REALM_RARE:{1:'gem_heartseed',2:'pearl',3:'rough_crystal',4:'fire_opal'},
  realmGem:function(sec,rareChance){ sec=Math.max(1,Math.min(4,sec||1)); if(rareChance&&Math.random()<rareChance)return ZLoot.REALM_RARE[sec]; var L=ZLoot.REALM[sec]; return L[Math.floor(Math.random()*L.length)]; },
  gemOf:function(el,rare){ var E=ZEL.E[el]; return E?(rare?E.rare:E.gem):null; },
  give:function(ps,id,n){ if(!ps||!ITEMS[id])return; if(!ps.inventory)ps.inventory=[]; for(var i=0;i<(n||1);i++)ps.inventory.push(id); },
  _say:function(scene,list,delay){ if(!list.length)return; var cnt={}, ord=[]; list.forEach(function(id){ if(!cnt[id]){ cnt[id]=0; ord.push(id); } cnt[id]++; });
    var txt=ord.map(function(id){ return (cnt[id]>1?cnt[id]+'× ':'')+ITEMS[id].name; }).join(', '), go=function(){ try{ showNotif('💎 Spoils: '+txt,'#bfe8ff'); }catch(e){} };
    if(scene&&scene.time&&delay)scene.time.delayedCall(delay,go); else go(); },
  // ── a guarded place is won: called at the top of the chest code, before its own rewards ──
  site:function(scene,ps,sec){ try{ var got=[], first, els, coin='dungeon_coin', g=function(id,n){ for(var i=0;i<(n||1);i++)if(ITEMS[id]){ ps.inventory.push(id); got.push(id); } };
      if(!ps.inventory)ps.inventory=[];
      if(scene._castle){ first=!CastleRun.done(ps,scene._castle.key); els=WARDEN_EL[scene._castle.key]||[];
        if(first){ els.forEach(function(e){ g(ZLoot.gemOf(e),els.length>1?1:2); }); if(!els.length)g(ZLoot.realmGem(sec),2); g(coin,2); } else { g(coin,1); if(Math.random()<0.35)g(els.length?ZLoot.gemOf(els[Math.floor(Math.random()*els.length)]):ZLoot.realmGem(sec)); } }
      else if(scene._mage){ first=!MageRun.done(ps,scene._mage.key); els=MASTER_EL[scene._mage.key]||[];
        if(first){ els.forEach(function(e){ g(ZLoot.gemOf(e),els.length>1?1:2); }); g(coin,2); } else { g(coin,1); if(Math.random()<0.35&&els.length)g(ZLoot.gemOf(els[0])); } }
      else if(scene._isIsland){ first=!scene._wasDone; if(first){ g(ZLoot.REALM_RARE[sec]); g(coin,2); } else g(coin,1); }
      else if(scene._site&&!scene._site.boss){ first=!scene._wasDone; if(first){ g(ZLoot.REALM_RARE[sec]); g(ZLoot.realmGem(sec)); g(coin,2); g('raw_iron',2); } else { g(coin,1); if(Math.random()<0.5)g('raw_iron'); } }
      else { first=!scene._wasDone; var key='s'+sec+'_'+scene.siteType, bk=null;
        var boss=(scene.monsters||[]).filter(function(m){ return m.isBoss; })[0], be=(boss&&ZEL.mon(boss)[0])||BOSS_EL[bk]||null;
        if(first){ if(be){ g(ZLoot.gemOf(be),2); g(ZLoot.gemOf(be,true)); } else g(ZLoot.realmGem(sec),2); g(coin,3); if(key==='s4_tower')g('night_edge'); } else { g(coin,1); if(be&&Math.random()<0.5)g(ZLoot.gemOf(be)); } }
      ZLoot._say(scene,got,2600); }catch(e){ if(typeof console!=='undefined')console.warn('ZLoot.site',e); } },
  // ── a monster falls: the gem of its element, by how strong it was ──
  kill:function(A,mon){ try{ if(!mon||mon.temp&&!mon.alpha||mon._noLoot)return; var els=ZEL.mon(mon); if(!els.length)return; var ps=A.ps(), boss=mon.isBoss||(mon.def&&mon.def.boss); if(boss||!ps)return;
      var elite=!!(mon.def&&mon.def.elite), tier=(mon.R&&mon.R.tier)||1, p=elite?1:mon.alpha?0.35:els.length>1?0.12:tier>=4?0.05:0.015;
      if(Math.random()>=p)return; var e=els[Math.floor(Math.random()*els.length)], id=ZLoot.gemOf(e,elite&&Math.random()<0.25); if(!ITEMS[id])return;
      ZLoot.give(ps,id); if(elite)ZLoot.give(ps,'dungeon_coin');
      A.float(mon.x,mon.y-((mon.def&&mon.def.r)||10)-30,'💎 '+ITEMS[id].name,ZEL.E[e].col); if(typeof showNotif==='function')showNotif('💎 '+mon.def.name+' dropped '+ITEMS[id].name+(elite?' and a Dungeon Coin':''),ZEL.E[e].col); }catch(e){} },
  // ── the jeweller's shelf ──
  COMMON:['gem_ruby','gem_sapphire','gem_emerald','gem_amber','gem_topaz','gem_onyx'],
  PRICE:{gold:5,coins:3},                                      // five times its worth in gold AND three dungeon coins
  progress:function(ps){ return ((ps.completedQuests||[]).length)+((ps.lockedSites||[]).length)+((ps.bonusCleared||[]).length)+((ps.castlesDone||[]).length)+((ps.mageDone||[]).length); },
  shelf:function(ps){ var P=ZLoot.progress(ps); if(!ps.jwl||ps.jwl.at!==P){ var st={}, ul=Math.max.apply(null,ps.unlockedSections||[1]);
      ZLoot.COMMON.forEach(function(k){ var realm=ZEL.E[ITEMS[k].gemEl].realm; st[k]=(realm===0?ul>=3:true)?1:0; }); ps.jwl={at:P,stock:st}; } return ps.jwl.stock; },
  priceOf:function(id){ return {gold:(ITEMS[id].goldVal||60)*ZLoot.PRICE.gold,coins:ZLoot.PRICE.coins}; },
  count:function(ps,id){ return (ps.inventory||[]).filter(function(x){ return x===id; }).length; },
  take:function(ps,id,n){ for(var i=0;i<(n||1);i++){ var k=ps.inventory.indexOf(id); if(k<0)return false; ps.inventory.splice(k,1); } return true; },
  buyGem:function(ps,id){ var st=ZLoot.shelf(ps), pr=ZLoot.priceOf(id); if(!(st[id]>0))return 'The jeweller has none left — clear another dungeon, tower or castle and the shelf refills.';
    if(ps.gold<pr.gold)return 'Not enough gold ('+pr.gold+'g).'; if(ZLoot.count(ps,'dungeon_coin')<pr.coins)return 'The jeweller wants '+pr.coins+' Dungeon Coins as well — they come from dungeons, towers, castles and vaults.';
    ps.gold-=pr.gold; ZLoot.take(ps,'dungeon_coin',pr.coins); st[id]--; ZLoot.give(ps,id); return ''; },
  // ── gem setting: armor, shields, amulets and rings; up to two elements in all ──
  setCost:function(it,nth){ var tier=Math.max(1,it.secReq||1); return {gems:nth>=1?2:1,gold:(nth>=1?250:100)*tier}; },
  // returns '' on success, or why not. inv index of the piece; el the element to set.
  setGem:function(ps,idx,el){ var id=ps.inventory[idx], it=ITEMS[id]; if(!it)return 'Nothing there.'; if(!ZEL.canSet(id,el))return it.sov?'The Sovereign pieces already hold every element.':'That piece cannot take that gem (two elements at most, and not one it already has).';
    var nth=ZEL.setOf(id).length, c=ZLoot.setCost(it,nth), gem=ZEL.E[el].gem; if(ZLoot.count(ps,gem)<c.gems)return 'You need '+c.gems+'× '+ITEMS[gem].name+'.'; if(ps.gold<c.gold)return 'Not enough gold ('+c.gold+'g).';
    ZLoot.take(ps,gem,c.gems); ps.gold-=c.gold; ps.inventory[ps.inventory.indexOf(id)]=ZEL.setId(id,el); return ''; }
};

// camps: their gem rewards follow the realm's gems (the emerald is the grass gem now)
(function(){ if(typeof CAMP_TYPES==='undefined')return; var OLD={gem_ruby:1,gem_sapphire:1,gem_emerald:1};
  Object.keys(CAMP_TYPES).forEach(function(q){ (CAMP_TYPES[q]||[]).forEach(function(C,ci){ var r=C.r; if(!r||!r.items)return; var n=0;
    r.items=r.items.map(function(id){ if(!OLD[id])return id; var L=ZLoot.REALM[+q]||ZLoot.REALM[1]; return L[(ci+n++)%L.length]; });
    if(r.k==='chest'&&r.items.indexOf('dungeon_coin')<0)r.items.push('dungeon_coin'); }); });
})();
// a fallen monster may drop its gem
(function(){ if(typeof MX==='undefined'||!MX.onDeath)return; var _od=MX.onDeath; MX.onDeath=function(A,mon){ var r=_od.apply(this,arguments); ZLoot.kill(A,mon); return r; }; })();

// ── mounts (round 37, Kris: "fix the existing ones") ──────────────────
(function(){ if(typeof MOUNTS==='undefined')return;
  MOUNTS.dragon.spdMult=2.2; MOUNTS.dragon.canCross='all'; MOUNTS.dragon.desc='The reward for all sixteen great quests: the fastest mount, over every kind of ground';
  MOUNTS.void_serpent.spdMult=2.0; MOUNTS.void_serpent.desc='Shadow serpent that flies everywhere — Sky Port 4';
  MOUNTS.sky_eagle.desc='The Sky Captain\'s own eagle — for defending all four Sky Ports';
  MOUNTS.horse.desc='Fast land travel — sold at the stables for 200 g';
  MOUNTS.ember_phoenix.desc='Blazing phoenix that crosses lava unharmed — Sky Port 3';
  if(typeof FIRE_SAFE_MOUNTS!=='undefined'&&FIRE_SAFE_MOUNTS.indexOf('ember_phoenix')<0)FIRE_SAFE_MOUNTS.push('ember_phoenix');
  // where each one comes from (Tome, stables)
  var SRC={horse:'Sold at the stables (200 g)',alligator:'Grasslands boss dungeon',boar:'Wetlands boss dungeon',lava_unicorn:'Highlands boss dungeon',ash_salamander:'Ashlands boss dungeon',dragon:'All sixteen great quests',
    sky_glider:'Sky Port 1 — first victory',storm_drake:'Sky Port 2 — first victory',ember_phoenix:'Sky Port 3 — first victory',void_serpent:'Sky Port 4 — first victory',sky_eagle:'All four Sky Ports defended'};
  Object.keys(SRC).forEach(function(k){ if(MOUNTS[k])MOUNTS[k].src=SRC[k]; });
})();
// the Sky Eagle: all four Sky Ports (checked when a port is won and when a save loads)
function _zMountChecks(ps){ if(!ps)return false; var cq=ps.completedQuests||[], all=[1,2,3,4].every(function(s){ return cq.indexOf('s'+s+'_skyport')>=0; });
  if(all){ if(!ps.ownedMounts)ps.ownedMounts=[]; if(ps.ownedMounts.indexOf('sky_eagle')<0){ ps.ownedMounts.push('sky_eagle'); return true; } } return false; }
window._buyHorse=function(){ var ws=typeof _owScene==='function'?_owScene():null; if(!ws)return; var ps=ws.playerState; if(!ps.ownedMounts)ps.ownedMounts=[];
  if(ps.ownedMounts.indexOf('horse')>=0)return; var c=MOUNTS.horse.cost||200; if(ps.gold<c){ showNotif('The horse costs '+c+' g.','#ff8844'); return; }
  ps.gold-=c; ps.ownedMounts.push('horse'); showNotif('🐎 The horse is yours!','#44ffaa'); if(typeof Tome!=='undefined'&&Tome.see)Tome.see('mount','horse'); if(typeof _renderMountsModal==='function')_renderMountsModal(ps); ws._emitUI(); };
