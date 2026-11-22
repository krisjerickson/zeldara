// ═══════════════════════════════════════════════════════════════════════
// ║ 22m-economy.js — round 121: THE ECONOMY, BUILT (docs/74–76; Kris ✓ every round-119 proposal but treasure maps, and every round-2 one).
// ║ ZECO holds the numbers and the rules; the scenes call it where gold, XP and loot are given.
// ║  · gold: the world cut (½ a purse out in the world, a camp's guards full until it falls), Alphas ×2.5 gold ×2 XP, the clear prize (a share
// ║    of what the run's monsters carry: 25 / 25 / 20 / 15 % by realm, never below the realm's hard-fight floor; a rematch 10 % ±20 %), the
// ║    Binders (40 % of the floor), the sky ports and the boss rush (the floor), floor chests with a rarity roll (Common · Rare · Golden)
// ║  · XP: 300 × level to level up (400 × level from 15), past the cap XP fills Valour (a chest every 1,000 / 2,500 / 5,000 / 8,000 by realm),
// ║    the bonus moments (first of its kind +50 %, Daring, Flawless floor +25 %, Rested ×2, Discovery)
// ║  · luck: gem bad-luck protection (+0.1 % a miss), a sure rare forging item on the 4th rematch of a warden or master
// ║  · death: a lost purse (10 % of what you carry) left where you fell, yours again if you walk back to it
// ║  · prices: every shop and forge price set by the minute (the realm's kit ≈ 12 minutes of a story player's gold); every item has a price
// ║  · showing it: rarity bands (Common · Fine · Rare · Epic · Legendary · Relic), the spoils card at the end of a run, coins to the purse
// ║ The places (islands, stalls, the quartermaster, the jeweller's coins and rings, Mira's trade, Brokkr's commissions, Runa's board and the
// ║ village fund, saddles, trophies, relics) are in 22m2-economy-places.js.
// ═══════════════════════════════════════════════════════════════════════
var ZECO={ on:true,
  CUT:0.5,                                         // a world monster pays half its purse (was a third)
  FLOOR:{1:150,2:400,3:800,4:1400},                // the least a hard fight pays, by realm
  SHARE:{1:0.25,2:0.25,3:0.20,4:0.15},             // the clear prize: this share of what the run's monsters carry (N3 tapers it)
  REM:0.10,                                        // a rematch: this share, ±20 %
  BINDER:0.4,                                      // a Binder: 40 % of the floor
  ALPHA_G:2.5, ALPHA_X:2,                          // an Alpha's gold and XP
  KIT:{1:600,2:1700,3:2600,4:5000},                // N5: each realm's kit (≈ 12 minutes of a story player's gold)
  PF:{1:0.845,2:2.073,3:1.615,4:1.672},            // …the factor every price in that realm moves by (the round-119 kit 710 / 820 / 1,610 / 2,990)
  VALOUR:{1:1000,2:2500,3:5000,4:8000},            // N2: XP past the cap for one Valour chest
  VALOUR_G:{1:150,2:390,3:630,4:1060},             // …its gold (about two minutes of the realm's gold)
  PITY:0.001,                                      // N4: +0.1 % a miss
  CHEST:[['common',0.70],['rare',0.25],['golden',0.05]],
  // ── realms ──
  realm:function(ps){ var ul=(ps&&ps.unlockedSections)||[1]; return Math.max(1,Math.min(4,Math.max.apply(null,ul))); },
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  ps:function(){ var ws=ZECO.ws(); return ws&&ws.playerState; },
  // ── what a site's monsters carry: Σ floors × monsters × the average purse of that realm's tower or dungeon monsters ──
  _avg:null,
  avg:function(q,seg){ if(!ZECO._avg){ var A={}; (typeof MON_ROSTER!=='undefined'?MON_ROSTER:[]).forEach(function(R){ try{ var s=MX.stats(R), k=R.q+'_'+R.seg; (A[k]=A[k]||[]).push((s.gMin+s.gMax)/2); }catch(e){} });
      ZECO._avg={}; Object.keys(A).forEach(function(k){ ZECO._avg[k]=A[k].reduce(function(a,b){ return a+b; },0)/A[k].length; }); }
    return ZECO._avg[q+'_'+seg]||[6.5,22.5,45.8,78.2][q-1]; },
  purse:function(q,kind,floors){ q=Math.max(1,Math.min(4,q||1)); floors=floors||1; var tow=kind==='tower', n=0;
    for(var i=0;i<floors;i++)n+=Math.round(tow?7+i*1.5:10+i*2);
    return n*ZECO.avg(q,tow?'tow':'dun'); },
  // the prize for finishing a site; kind: 'boss' | 'vault' | 'castle' | 'mage' | 'island'
  prize:function(scene,kind,first){ var q=Math.max(1,Math.min(4,(scene&&(scene.siteSection||scene.sec))||1)), F=(scene&&scene.maxFloors)||3,
      tow=kind==='castle'||kind==='mage'||(scene&&scene.siteType==='tower'), P=ZECO.purse(q,tow?'tower':'dungeon',F);
    if(kind==='island')P=Math.max(P*0.5,ZECO.purse(q,'dungeon',2));
    var first_=Math.max(ZECO.FLOOR[q],Math.round(P*ZECO.SHARE[q]/5)*5);
    if(first)return first_;
    var r=Math.round(P*ZECO.REM*(0.8+Math.random()*0.4)); return Math.max(Math.round(ZECO.FLOOR[q]*0.25),Math.min(r,first_-5)); },
  // ── gold, with the run's ledger (the spoils card) ──
  gold:function(ps,n,src,scene){ n=Math.max(0,Math.round(n||0)); if(!n)return 0; if(typeof ZPOT!=='undefined')n=ZPOT.g(n); n=Math.round(n*(1+ZECO.goldBonus(ps,src))); ps.gold=(ps.gold||0)+n; ZECO.ledger(src,n); return n; },
  goldBonus:function(ps,src){ var b=0; if(ps&&ps.trophyHall)b+=Math.min(0.15,0.005*ps.trophyHall.length); if(src==='alpha'&&ZECO.wearing(ps,'brindle_charm'))b+=0.15; return b; },
  wearing:function(ps,id){ var E=(ps&&ps.equip)||{}; for(var k in E)if(E[k]===id||(E[k]&&String(E[k]).split('~')[0]===id))return true; return false; },
  run:null,
  runStart:function(scene){ var ps=scene.worldScene?scene.worldScene.playerState:null, key=(scene.siteId||'site')+'|'+(scene._runId||'');
    if(ZECO.run&&ZECO.run.key===key)return ZECO.run; var C={}; ((ps&&ps.inventory)||[]).forEach(function(id){ C[id]=(C[id]||0)+1; });
    ZECO.run={key:key,name:(scene._site&&scene._site.name)||(scene._castle&&scene._castle.name)||(scene._mage&&scene._mage.name)||'The site',gold:{},xp:0,inv:C,t0:Date.now()}; return ZECO.run; },
  ledger:function(src,n){ var R=ZECO.run; if(!R||!src)return; R.gold[src]=(R.gold[src]||0)+n; },
  // ── XP ──
  xpGive:function(scene,ps,base,o){ o=o||{}; var x=Math.max(1,Math.round(base)), L=[];
    if(o.rid&&o.kill){ var K=ps.kindsBeaten||(ps.kindsBeaten={}); if(!K[o.rid]){ K[o.rid]=1; x=Math.round(x*1.5); L.push(['FIRST OF ITS KIND +50 %','#b58cff']); } }
    if(o.daring)L.push(['DARING ×'+o.daring,'#ffd84a']);
    if(o.binder&&ZECO.wearing(ps,'grimkell_hood'))x=Math.round(x*1.1);
    if(ps.rested>0){ var r=Math.min(ps.rested,x); ps.rested-=r; x+=r; L.push(['RESTED ×2','#7fb4ff']); }
    if(typeof ZPOT!=='undefined')x=ZPOT.x(x);
    ps.xp=(ps.xp||0)+x; if(ZECO.run)ZECO.run.xp+=x; if(scene&&scene._floorXp!==undefined)scene._floorXp+=x;
    if(L.length&&scene&&scene._floatText&&o.x!==undefined)L.forEach(function(l,i){ scene.time.delayedCall(160*(i+1),function(){ scene._floatText(o.x,o.y-52-i*12,l[0],l[1]); }); });
    return x; },
  // past the cap: Valour (called from both scenes' _checkLevelUp)
  over:function(scene,ps,cap){ var need=_xpNeed(cap), lim=need-1; if((ps.xp||0)<=lim)return; var ex=ps.xp-lim; ps.xp=lim; var q=ZECO.realm(ps);
    ps.valour=(ps.valour||0)+ex; var T=ZECO.VALOUR[q]; while(ps.valour>=T){ ps.valour-=T; ZECO.valourChest(scene,ps,q); } },
  valourChest:function(scene,ps,q){ var r=Math.random(), got; if(!ps.inventory)ps.inventory=[];
    if(r<0.6){ var g=ZECO.gold(ps,ZECO.VALOUR_G[q]*(0.8+Math.random()*0.4),'valour',scene); got=g+' gold'; }
    else if(r<0.85){ var gem=ZLoot.realmGem(q,0.2); ps.inventory.push(gem); got=ITEMS[gem].name; }
    else { ps.inventory.push('dungeon_coin','dungeon_coin'); got='2 Dungeon Coins'; }
    showNotif('🏅 Valour chest — '+got+'  (your XP past the level cap)','#ffcc33'); if(typeof ZSFX!=='undefined')try{ ZSFX.play('chest'); }catch(e){} },
  // ── gem bad-luck protection, per element ──
  pity:function(ps,el,p,hit){ var P=ps.pity||(ps.pity={}); if(hit){ P[el]=0; return p; } return p+ZECO.PITY*(P[el]||0); },
  pityMiss:function(ps,el){ var P=ps.pity||(ps.pity={}); P[el]=(P[el]||0)+1; },
  // ── rarity bands ──
  BANDS:{common:['Common','#e8e8e8'],fine:['Fine','#6fe07a'],rare:['Rare','#5fa8ff'],epic:['Epic','#b06aff'],legend:['Legendary','#ffcc33'],relic:['Relic','#fff2c8']},
  RELIC:null,
  band:function(id){ var it=ITEMS[String(id).split('~')[0]]; if(!it)return 'common'; if(ZECO.isRelic(id))return 'relic';
    var v=it.buy||it.sell*3||it.goldVal*5||0, rq=Math.max(1,it.secReq||1), rel=v/({1:150,2:500,3:1100,4:2400}[rq]);
    if(it.slot==='gem')return it.goldVal>=150?'epic':it.goldVal>=80?'rare':'fine';
    return rel>=2.2?'legend':rel>=1.2?'epic':rel>=0.6?'rare':rel>=0.25?'fine':'common'; },
  isRelic:function(id){ if(!ZECO.RELIC)ZECO.RELIC=ZECO.relics(); return !!ZECO.RELIC[String(id).split('~')[0]]; },
  relics:function(){ var R={}; Object.keys(BOSS_REWARDS||{}).forEach(function(k){ (BOSS_REWARDS[k].rings||[]).forEach(function(r){ R[r]=1; }); });
    Object.keys(ITEMS).forEach(function(k){ var it=ITEMS[k]; if(/^sov_/.test(k)||k==='elemental_sovereign'||it.named||it.trophy)R[k]=1; });
    if(typeof R45_RARE!=='undefined')Object.keys(R45_RARE).forEach(function(k){ R[k]=1; });
    ['night_edge','raven_cloak','silk_cape','acrobat_boots','glass_charm','brass_bird','spyglass','miklagard_silk'].forEach(function(k){ if(ITEMS[k])R[k]=1; }); return R; },
  bandOf:function(id){ return ZECO.BANDS[ZECO.band(id)]; },
  // ── the run's spoils, shown as the hero leaves a site ──
  spoils:function(){ var R=ZECO.run; ZECO.run=null; if(!R)return; var ps=ZECO.ps(); if(!ps)return; var C={}; (ps.inventory||[]).forEach(function(id){ C[id]=(C[id]||0)+1; });
    var got=[]; Object.keys(C).forEach(function(id){ var d=C[id]-(R.inv[id]||0); for(var i=0;i<d;i++)got.push(id); });
    var G=R.gold, tot=0; Object.keys(G).forEach(function(k){ tot+=G[k]; }); if(!tot&&!got.length&&!R.xp)return;
    var NM={mon:'Monsters',chest:'Chests',prize:'The prize',alpha:'Alphas',valour:'Valour',other:'Other'};
    var el=document.getElementById('zeco-spoils'); if(!el){ el=document.createElement('div'); el.id='zeco-spoils'; document.body.appendChild(el); }
    var rows=Object.keys(G).filter(function(k){ return G[k]>0; }).map(function(k){ return '<div class="zs-r"><span>'+(NM[k]||k)+'</span><em data-n="'+G[k]+'">0 g</em></div>'; }).join('');
    got.sort(function(a,b){ var o=['common','fine','rare','epic','legend','relic']; return o.indexOf(ZECO.band(a))-o.indexOf(ZECO.band(b)); });
    el.innerHTML='<div class="zs-card"><b class="zs-t">'+R.name+' — cleared</b>'+rows+'<div class="zs-r tot"><span>Total</span><em data-n="'+tot+'">0 g</em></div><div class="zs-xp">+'+R.xp+' XP</div><div class="zs-its">'+got.slice(0,12).map(function(id,i){ var B=ZECO.bandOf(id); return '<span class="zs-it" style="--c:'+B[1]+';animation-delay:'+(0.9+i*0.22)+'s" title="'+B[0]+'">'+(typeof ZIcon!=='undefined'?ZIcon.item(id,1.1):'')+(ITEMS[id]?ITEMS[id].name:id)+'</span>'; }).join('')+'</div><small>any key</small></div>';
    el.style.display='flex'; var t0=performance.now(), ems=el.querySelectorAll('em[data-n]');
    var tick=function(t){ var k=Math.min(1,(t-t0)/900); ems.forEach(function(e){ e.textContent=Math.round(+e.dataset.n*k).toLocaleString('en-US')+' g'; }); if(k<1&&el.style.display!=='none')requestAnimationFrame(tick); }; requestAnimationFrame(tick);
    var close=function(){ el.style.display='none'; document.removeEventListener('keydown',kd,true); clearTimeout(el._t); }, kd=function(e){ close(); };
    setTimeout(function(){ document.addEventListener('keydown',kd,true); },250); el.onclick=close; el._t=setTimeout(close,4200+got.length*220); if(typeof ZSFX!=='undefined')try{ ZSFX.play('coin'); }catch(e){} },
  // ── coins fly to the purse (out in the world) ──
  coins:function(scene,x,y,n){ try{ if(!scene||!scene.cameras||!n)return; var cam=scene.cameras.main, cv=scene.game.canvas.getBoundingClientRect(), sx=cv.left+(x-cam.worldView.x)*cam.zoom*(cv.width/scene.game.config.width||1), sy=cv.top+(y-cam.worldView.y)*cam.zoom*(cv.height/scene.game.config.height||1);
      var to=document.getElementById('gold-val'); if(!to)return; var r=to.getBoundingClientRect(), k=Math.min(5,1+Math.floor(n/15));
      for(var i=0;i<k;i++)(function(i){ var c=document.createElement('i'); c.className='zeco-coin'; c.style.left=sx+'px'; c.style.top=sy+'px'; document.body.appendChild(c);
        setTimeout(function(){ c.style.transform='translate('+(r.left-sx)+'px,'+(r.top-sy)+'px) scale(.6)'; c.style.opacity='0.2'; },30+i*70); setTimeout(function(){ c.remove(); to.classList.add('zeco-ping'); setTimeout(function(){ to.classList.remove('zeco-ping'); },250); },700+i*70); })(i); }catch(e){} },
  // ── a floor chest: Common · Rare · Golden (12-scene-dungeon _openChest) ──
  chestRoll:function(){ var r=Math.random(), a=0; for(var i=0;i<ZECO.CHEST.length;i++){ a+=ZECO.CHEST[i][1]; if(r<a)return ZECO.CHEST[i][0]; } return 'common'; },
  openChest:function(scene){ var sec=Math.max(1,Math.min(4,scene.siteSection||1)), fl=scene.floor||0, ps=scene.worldScene.playerState; if(!ps.inventory)ps.inventory=[]; ZECO.runStart(scene);
    var mins=[10,25,50,75][sec-1], maxs=[50,75,100,150][sec-1], base=mins+Math.random()*(maxs-mins)+fl*maxs*0.1, kind=ZECO.chestRoll(), got=[], g=0;
    if(kind==='common'){ if(Math.random()<0.6)g=base*0.5; else { scene._dropItem(sec); return showNotif('📦 Chest: something useful inside','#ffaa44'); } }
    else if(kind==='rare'){ g=base*1.2; var gem=ZLoot.realmGem(sec,0.15); ps.inventory.push(gem); got.push(gem); if(Math.random()<0.5){ var gi=ZECO.gearDrop(sec); if(gi){ ps.inventory.push(gi); got.push(gi); } } }
    else { g=base*3; var gm=ZLoot.realmGem(sec,0.4); ps.inventory.push(gm); got.push(gm); var rf=ZECO.rareMat(sec); if(rf){ ps.inventory.push(rf); got.push(rf); } }
    var n=g?ZECO.gold(ps,g,'chest',scene):0; var B=ZECO.BANDS[kind==='golden'?'legend':kind]||ZECO.BANDS.common;
    if(scene._floatText)scene._floatText(scene.px,scene.py-40,(kind==='golden'?'★ GOLDEN CHEST ★':kind==='rare'?'Rare chest':'Chest')+(n?'  +'+n+'g':''),B[1]);
    showNotif((kind==='golden'?'🌟 A GOLDEN chest! ':kind==='rare'?'💎 A rare chest: ':'📦 ')+(n?n+' gold':'')+(got.length?(n?', ':'')+got.map(function(id){ return ITEMS[id].name; }).join(', '):''),B[1]);
    if(typeof ZSFX!=='undefined')try{ ZSFX.play(kind==='common'?'chest':'gem'); }catch(e){} if(scene.worldScene._emitUI)scene.worldScene._emitUI(); },
  // a piece of the realm's shop gear, any slot (I4)
  gearDrop:function(sec){ var L=Object.keys(ITEMS).filter(function(k){ var it=ITEMS[k]; return it.buy>0&&!it.old&&/^(head|feet|gauntlets|pants|back|shield|body|rHand|lHand)$/.test(it.slot||'')&&Math.max(1,it.secReq||1)===sec&&it.type!=='ammo'&&k!=='axe'; });
    return L.length?L[Math.floor(Math.random()*L.length)]:null; },
  rareMat:function(sec){ if(typeof R45_RARE==='undefined')return null; var L=Object.keys(R45_RARE); return L.length?L[Math.floor(Math.random()*L.length)]:null; },
  // ── the lost purse (N: "A lost purse, not a lost tenth") ──
  die:function(ws){ var ps=ws.playerState, g=Math.floor((ps.gold||0)*0.10), P=ps.lostPurse, lost=P&&P.g||0;
    ps.gold=Math.max(0,(ps.gold||0)-g); ps.lostPurse=g>0&&ws.player?{g:g,x:Math.round(ws.player.x),y:Math.round(ws.player.y)}:null; ZECO.purseClear(ws);
    return {g:g,lost:lost}; },
  purseShow:function(ws){ var P=ws.playerState.lostPurse; if(!P){ ZECO.purseClear(ws); return; } if(ws._zPurse&&ws._zPurse.scene)return;
    if(!ws.textures.exists('zeco_purse')){ var c=mkCanvas(32,30), g=c.getContext('2d'); g.fillStyle='rgba(0,0,0,.3)'; g.beginPath(); g.ellipse(16,27,12,3,0,0,Math.PI*2); g.fill();
      g.fillStyle='#8a5a2a'; g.beginPath(); g.moveTo(6,26); g.quadraticCurveTo(2,10,16,8); g.quadraticCurveTo(30,10,26,26); g.closePath(); g.fill(); g.fillStyle='#5a3a1a'; g.fillRect(11,6,10,4);
      g.fillStyle='#ffd84a'; [[10,22],[16,24],[22,21]].forEach(function(p){ g.beginPath(); g.arc(p[0],p[1],3,0,Math.PI*2); g.fill(); }); ws.textures.addCanvas('zeco_purse',c); }
    var im=(typeof _scn==='function'&&_scn()&&_scn().has&&_scn().has('ec_purse'))?_scn().image(ws,'ec_purse',P.x,P.y+6,_scn().K,WR_DEPTH(P.y))      /* round 128: a multiplier, not a height */:null;
    ws._zPurse=im||ws.add.image(P.x,P.y+6,'zeco_purse').setOrigin(0.5,1).setDepth(WR_DEPTH(P.y));
    ws._zPurseG=ws.add.circle(P.x,P.y,16,0xffd84a,0.18).setDepth(WR_DEPTH(P.y)-0.01); ws.tweens.add({targets:ws._zPurseG,alpha:0.05,scale:1.6,duration:900,yoyo:true,repeat:-1}); },
  purseClear:function(ws){ if(ws._zPurse){ if(ws._zPurse.scene)ws._zPurse.destroy(); ws._zPurse=null; } if(ws._zPurseG){ if(ws._zPurseG.scene)ws._zPurseG.destroy(); ws._zPurseG=null; } },
  purseTick:function(ws){ var ps=ws.playerState, P=ps.lostPurse; if(!P||!ws.player){ if(ws._zPurse)ZECO.purseClear(ws); return; } ZECO.purseShow(ws);
    if(Math.hypot(ws.player.x-P.x,ws.player.y-P.y)<TILE*1.1){ ps.gold=(ps.gold||0)+P.g; ps.lostPurse=null; ZECO.purseClear(ws); showNotif('💰 Your lost purse — '+P.g+' gold back where you fell','#ffd700'); ZECO.coins(ws,P.x,P.y,P.g); if(ws._emitUI)ws._emitUI(); } },
  // ── a hard fight's floor: sky ports, the boss rush (N: "a floor under every hard fight") ──
  hardWin:function(scene,ps,q,first,why){ q=Math.max(1,Math.min(4,q||1)); var g=ZECO.gold(ps,first?ZECO.FLOOR[q]:ZECO.FLOOR[q]*0.4,'prize',scene); if(!ps.inventory)ps.inventory=[];
    if(first){ ps.inventory.push(ZLoot.realmGem(q),'dungeon_coin','dungeon_coin'); } else ps.inventory.push('dungeon_coin');
    showNotif('🏆 '+why+' — +'+g+' gold'+(first?', a gem and 2 Dungeon Coins':' and a Dungeon Coin'),'#ffdd44'); return g; },
  // ── prices (N5 "price by the minute", I9 "prices you can trust") ──
  reprice:function(){ if(ZECO._priced)return; ZECO._priced=true; var rq=function(it){ return Math.max(1,Math.min(4,it.secReq||1)); }, r5=function(v){ return Math.max(1,Math.round(v/5)*5); };
    Object.keys(ITEMS).forEach(function(k){ var it=ITEMS[k]; if(!it||it.old||k.indexOf('~')>=0)return; var f=ZECO.PF[rq(it)];
      if(it.buy>0){ it.buy=it.buy<20?Math.max(1,Math.round(it.buy*f)):r5(it.buy*f); if(it.sell)it.sell=Math.max(1,Math.round(it.sell*f)); }
      it.price=it.buy>0?it.buy:it.slot==='gem'?(it.goldVal||40)*5:it.sell?r5(it.sell*3*1.25):r5(40*rq(it)); });      /* I9: every item a price (traders, stalls) */
    (typeof CRAFT_RECIPES!=='undefined'?CRAFT_RECIPES:[]).forEach(function(R){ R.gold=r5(R.gold*ZECO.PF[Math.max(1,Math.min(4,R.tier||1))]); });
    (typeof ZAPO!=='undefined'?ZAPO.CRAFT:[]).forEach(function(R){ var it=ITEMS[R.out]; R.gold=r5(R.gold*ZECO.PF[R.forges?4:Math.max(1,Math.min(4,(it&&it.secReq)||1))]); }); }
};
// the XP a level needs (N1): 300 × level, 400 × level from level 15
function _xpNeed(L){ L=Math.max(1,L||1); return L*(L>=15?400:300); }

// ── new items: the island specials (I1), the named pieces (I6), the lesser rings (I7), sky gear (I3), hamlet pieces (I2), trophies (I8) ──
(function(){ if(typeof ITEMS==='undefined')return; var A=function(id,o){ if(!ITEMS[id])ITEMS[id]=o; };
  // I1 · three island-only pieces on each harbour island (sold only by that island's trader)
  A('corsair_longbow',{name:"Corsair's Longbow",icon:'🏹',atk:11,slot:'rHand',sell:22,buy:0,secReq:1,isle:1,desc:'+11 RNG ATK — a long sea-yew bow, Corsair Isle only'});
  A('gull_hat',{name:'Gull-feather Hat',icon:'🎩',def:2,spdBonus:0.05,slot:'head',sell:12,buy:0,secReq:1,isle:1,desc:'+2 DEF +5% Spd — Corsair Isle only'});
  A('tideline_charm',{name:'Tide-line Charm',icon:'🐚',def:1,atk:1,manaRegen:0.3,slot:'neck',sell:14,buy:0,secReq:1,isle:1,desc:'+1 ATK +1 DEF +0.3mp/s — Corsair Isle only'});
  A('bogwalker_boots',{name:'Bogwalker Boots',icon:'🥾',def:4,spdBonus:0.08,slot:'feet',sell:40,buy:0,secReq:2,isle:2,desc:'+4 DEF +8% Spd — Bog Isle only'});
  A('reedweave_gloves',{name:'Reed-weave Gloves',icon:'🧤',def:3,atk:1,slot:'gauntlets',sell:36,buy:0,secReq:2,isle:2,desc:'+3 DEF +1 ATK — Bog Isle only'});
  A('lanterneel_amulet',{name:'Lantern-eel Amulet',icon:'🧿',def:2,atk:2,maxMana:10,slot:'neck',sell:44,buy:0,secReq:2,isle:2,desc:'+2 ATK +2 DEF +10 mana — Bog Isle only'});
  A('emberglass_gauntlets',{name:'Emberglass Gauntlets',icon:'🧤',def:6,atk:3,res:{fire:0.1},slot:'gauntlets',sell:95,buy:0,secReq:3,isle:3,desc:'+6 DEF +3 ATK −10% fire — Ember Isle only'});
  A('cinder_helm',{name:'Cinder Helm',icon:'⛑️',def:7,slot:'head',sell:90,buy:0,secReq:3,isle:3,desc:'+7 DEF — Ember Isle only'});
  A('forgeash_cloak',{name:'Forge-ash Cloak',icon:'🧥',def:5,res:{fire:0.15},slot:'back',sell:85,buy:0,secReq:3,isle:3,desc:'+5 DEF −15% fire — Ember Isle only'});
  A('rime_cloak',{name:'Rime-cloak',icon:'🧥',def:8,res:{water:0.15},slot:'back',sell:180,buy:0,secReq:4,isle:4,desc:'+8 DEF −15% water — Frost Isle only'});
  A('icefang_crossbow',{name:'Icefang Crossbow',icon:'🏹',atk:30,cls:'xbow',slot:'rHand',sell:190,buy:0,secReq:4,isle:4,desc:'+30 RNG ATK — Frost Isle only'});
  A('aurora_circlet',{name:'Aurora Circlet',icon:'👑',def:6,maxMana:20,manaRegen:0.5,slot:'head',sell:175,buy:0,secReq:4,isle:4,desc:'+6 DEF +20 mana +0.5mp/s — Frost Isle only'});
  // I6 · the named pieces (found only: a Binder captain, a named Alpha and a castle warden in each realm)
  var N=function(id,o){ o.named=1; o.buy=0; A(id,o); };
  N('grimkell_hood',{name:"Grimkell's Hood",icon:'🪖',def:3,slot:'head',sell:150,secReq:1,from:'binder:1',desc:'+3 DEF, +10% XP from Binders — Grimkell, captain of the Grasslands Binders'});
  N('brindle_charm',{name:"Old Brindle's Tusk",icon:'🦷',atk:2,slot:'neck',sell:150,secReq:1,from:'alpha:1',desc:'+2 ATK, +15% gold from Alphas — the named Alpha of the Grasslands'});
  N('thornwood_spurs',{name:'Thornwood Spurs',icon:'🥾',def:2,spdBonus:0.10,slot:'feet',sell:160,secReq:1,from:'castle:q1_b',desc:'+2 DEF +10% Spd — the Thorn Knight\'s, Thornwood Isle'});
  N('mire_strider_boots',{name:"Mire-Strider's Boots",icon:'🥾',def:4,spdBonus:0.12,slot:'feet',sell:300,secReq:2,from:'alpha:2',desc:'+4 DEF +12% Spd — the named Alpha of the Wetlands'});
  N('skuli_gloves',{name:"Skuli's Net-gloves",icon:'🧤',def:4,atk:2,slot:'gauntlets',sell:300,secReq:2,from:'binder:2',desc:'+4 DEF +2 ATK — Skuli, captain of the Wetlands Binders'});
  N('abbots_bell',{name:"The Abbot's Bell",icon:'🔔',def:3,manaRegen:0.8,slot:'neck',sell:320,secReq:2,from:'castle:q2_c',desc:'+3 DEF +0.8mp/s — the Drowned Abbot\'s, Abbey Isle'});
  N('anvil_bracers',{name:"The Thane's Anvil-bracers",icon:'🧤',def:6,atk:4,slot:'gauntlets',sell:450,secReq:3,from:'castle:q3_b',desc:'+6 DEF +4 ATK — the Forge-thane\'s, Anvil Isle'});
  N('kolgrim_mantle',{name:"Kolgrim's Stone-mantle",icon:'🧥',def:7,res:{earth:0.1},slot:'back',sell:450,secReq:3,from:'binder:3',desc:'+7 DEF −10% earth — Kolgrim, captain of the Highlands Binders'});
  N('greyhorn_helm',{name:'Greyhorn Helm',icon:'⛑️',def:7,atk:2,slot:'head',sell:460,secReq:3,from:'alpha:3',desc:'+7 DEF +2 ATK — the named Alpha of the Highlands'});
  N('svarthof_cloak',{name:"Svarthof's Ash-cloak",icon:'🧥',def:9,res:{fire:0.2},slot:'back',sell:600,secReq:4,from:'binder:4',desc:'+9 DEF −20% fire — Svarthof, captain of the Ashlands Binders'});
  N('cinderjaw_ring',{name:'Cinderjaw Ring',icon:'💍',atk:5,slot:'ring',sell:600,secReq:4,from:'alpha:4',desc:'+5 ATK — the named Alpha of the Ashlands'});
  N('bone_signet',{name:"The Bone King's Signet",icon:'💍',atk:4,def:4,slot:'ring',sell:620,secReq:4,from:'castle:q4_d',desc:'+4 ATK +4 DEF — the Bone King\'s, Bonefall Isle'});
  // I7 · four lesser rings at the jeweller (each takes a gem)
  A('copper_band',{name:'Copper Band',icon:'💍',def:1,slot:'ring',sell:50,buy:150,secReq:1,desc:'+1 DEF — takes a gem at the jeweller'});
  A('silver_band2',{name:'Silver Signet',icon:'💍',atk:1,def:1,slot:'ring',sell:200,buy:600,secReq:2,desc:'+1 ATK +1 DEF — takes a gem'});
  A('gold_band',{name:'Gold Band',icon:'💍',atk:2,def:2,slot:'ring',sell:400,buy:1200,secReq:3,desc:'+2 ATK +2 DEF — takes a gem'});
  A('rune_band',{name:'Rune Band',icon:'💍',atk:3,def:3,manaRegen:0.3,slot:'ring',sell:800,buy:2400,secReq:4,desc:'+3 ATK +3 DEF +0.3mp/s — takes a gem'});
  // I3 · the sky-port quartermaster's own cloak
  A('sky_cloak',{name:'Sky-silk Cloak',icon:'🧥',def:4,spdBonus:0.06,slot:'back',sell:60,buy:0,secReq:2,sky:1,desc:'+4 DEF +6% Spd — Captain Vela\'s quartermaster'});
  // I2 · twelve hamlet pieces (the spirits' kin, once six of a realm's spirits are free)
  var H=function(id,trade,o){ o.hamlet=trade; o.buy=0; A(id,o); };
  H('hm_weaver_mantle','weaver',{name:"Weaver's Mantle",icon:'🧥',def:7,maxMana:10,slot:'back',sell:220,secReq:4,desc:'+7 DEF +10 mana — woven in a hamlet'});
  H('hm_dyer_hood','dyer',{name:"Dyer's Hood",icon:'🪖',def:6,res:{shadow:0.1},slot:'head',sell:210,secReq:4,desc:'+6 DEF −10% shadow'});
  H('hm_tanner_boots','tanner',{name:"Tanner's Boots",icon:'🥾',def:6,spdBonus:0.1,slot:'feet',sell:230,secReq:4,desc:'+6 DEF +10% Spd'});
  H('hm_netmender_gloves','net-mender',{name:"Net-mender's Gloves",icon:'🧤',def:5,atk:3,slot:'gauntlets',sell:220,secReq:4,desc:'+5 DEF +3 ATK'});
  H('hm_smith_axe','smith',{name:'Hamlet Hand-axe',icon:'🪓',atk:24,cls:'axe',slot:'lHand',sell:260,secReq:4,desc:'+24 ATK — a smith\'s own'});
  H('hm_carver_bow','carver',{name:"Carver's Bow",icon:'🏹',atk:26,slot:'rHand',sell:250,secReq:4,desc:'+26 RNG ATK'});
  H('hm_mason_shield','stonemason',{name:"Mason's Shield",icon:'🛡️',def:10,slot:'shield',sell:240,secReq:4,desc:'+10 DEF — banded with stone'});
  H('hm_shipwright_charm','shipwright',{name:"Shipwright's Charm",icon:'⚓',def:3,atk:3,slot:'neck',sell:210,secReq:4,desc:'+3 ATK +3 DEF'});
  H('hm_beekeeper_ring','beekeeper',{name:"Beekeeper's Ring",icon:'💍',def:2,hpRegen:0.5,slot:'ring',sell:200,secReq:4,desc:'+2 DEF, a little health back each second'});
  H('hm_forester_cloak','forester',{name:"Forester's Cloak",icon:'🧥',def:6,res:{grass:0.1},slot:'back',sell:215,secReq:4,desc:'+6 DEF −10% grass'});
  H('hm_herder_staff','herder',{name:"Herder's Crook",icon:'🪄',mag:18,slot:'mWeapon',sell:240,secReq:4,desc:'A crook-staff: +18 spell power'});
  H('hm_skald_circlet','skald',{name:"Skald's Circlet",icon:'👑',def:5,maxMana:20,slot:'head',sell:225,secReq:4,desc:'+5 DEF +20 mana'});
  // N6 · saddles and barding (the stables): items so the Tome and the inventory know them; worn by every mount
  [['saddle_1','Riding Saddle',1],['saddle_2','Travel Saddle',2],['saddle_3','War Saddle and Barding',3],['saddle_4','Rune-barding',4]].forEach(function(S){ A(S[0],{name:S[1],icon:'🐎',slot:'material',sell:0,buy:0,secReq:S[2],saddle:S[2],desc:'Every mount '+(5*S[2])+'% faster and '+(S[2]*2)+' tougher'}); });
  // I8 · the Alpha trophies: one per kind of monster that roams the realms (made from the roster; kept in the material pocket)
  var TF={biped:'fang',brute:'tusk',golem:'core-stone',construct:'core-stone',quad:'pelt',bird:'crest',insect:'carapace',spider:'carapace',serpent:'scale',eel:'scale',frog:'scale',crab:'claw',drake:'horn',turtle:'shell',small:'tail',bat:'wing',wisp:'mote',swarm:'mote',caster:'charm',plant:'seed-pod',tree:'heartwood',blob:'gel',book:'page',eye:'lens',orb:'lens',wraith:'shroud',chesspiece:'crown',biped2:'fang'};
  if(typeof MON_ROSTER!=='undefined')MON_ROSTER.forEach(function(R){ if(R.seg!=='main')return; var f=TF[R.spec&&R.spec.plan]||'trophy';
    A('tr_'+R.id,{name:R.name+' '+f,icon:'🏆',slot:'material',trophy:R.id,fam:f,sell:Math.round(40*R.q),buy:0,secReq:R.q,_k:'tr_'+f.replace(/[^a-z]/g,''),desc:'The Alpha '+R.name+'\'s '+f+' — sell it, or hang it in the trophy hall'}); });
})();
ZECO.reprice();

// ── styles ──
(function(){ if(typeof document==='undefined')return; var st=document.createElement('style'); st.textContent=
  '#zeco-spoils{position:fixed;inset:0;z-index:9990;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.35);pointer-events:auto}'+
  '#zeco-spoils .zs-card{min-width:300px;max-width:440px;background:linear-gradient(#1b1510,#0e0b08);border:2px solid #c8a050;border-radius:10px;padding:14px 18px;color:#f0e0c0;font:14px Georgia,serif;box-shadow:0 10px 40px #000a;animation:zsIn .35s ease-out}'+
  '#zeco-spoils .zs-t{display:block;font-size:17px;color:#ffe08a;margin-bottom:6px}#zeco-spoils .zs-r{display:flex;justify-content:space-between;border-bottom:1px dotted #5a4a30;padding:3px 0}#zeco-spoils .zs-r em{font-style:normal;color:#ffd84a}#zeco-spoils .zs-r.tot{font-weight:700;border:0;font-size:16px}'+
  '#zeco-spoils .zs-xp{color:#9fc8ff;margin:4px 0 6px}#zeco-spoils .zs-its{display:flex;flex-wrap:wrap;gap:5px}#zeco-spoils .zs-it{border:1px solid var(--c);color:var(--c);border-radius:5px;padding:2px 7px;font-size:12px;display:inline-flex;gap:4px;align-items:center;opacity:0;animation:zsFlip .4s ease-out forwards;box-shadow:0 0 8px color-mix(in srgb,var(--c) 40%,transparent)}'+
  '#zeco-spoils small{display:block;text-align:right;color:#8a7a60;margin-top:6px;font-size:11px}@keyframes zsIn{from{transform:scale(.85);opacity:0}}@keyframes zsFlip{from{transform:rotateY(90deg);opacity:0}to{transform:none;opacity:1}}'+
  '.zeco-coin{position:fixed;width:12px;height:12px;border-radius:50%;background:radial-gradient(#fff6a0,#e0a020);box-shadow:0 0 6px #ffd84a;z-index:9995;pointer-events:none;transition:transform .6s cubic-bezier(.5,-.3,.7,1),opacity .6s}'+
  '.zeco-ping{animation:zPing .25s}@keyframes zPing{50%{transform:scale(1.35);color:#fff}}'+
  '#xp-rested{position:absolute;top:0;bottom:0;background:rgba(90,150,255,.45);outline:1px dashed #9fc8ff;pointer-events:none}#xp-valour{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#c89020,#ffd84a);pointer-events:none}';
  document.head.appendChild(st); })();

// ── hooks: the scenes ──
setTimeout(function(){
  // the lost purse, out in the world
  setInterval(function(){ var ws=ZECO.ws(); if(!ws||!ws.player||!ws.sys||!ws.sys.isActive())return; try{ ZECO.purseTick(ws); }catch(e){} },300);
  // the HUD: the XP bar's Rested stretch and, at the cap, the Valour bar
  setInterval(function(){ var ps=ZECO.ps(), bar=document.getElementById('xp-bar'); if(!ps||!bar)return; var b=bar.parentNode; if(getComputedStyle(b).position==='static')b.style.position='relative';
    var need=_xpNeed(ps.level||1), r=document.getElementById('xp-rested'), v=document.getElementById('xp-valour'), cap=typeof ZECO.capOf==='function'?ZECO.capOf(ps):99;
    if(!r){ r=document.createElement('div'); r.id='xp-rested'; b.appendChild(r); } if(!v){ v=document.createElement('div'); v.id='xp-valour'; b.appendChild(v); }
    var x0=Math.min(100,(ps.xp||0)/need*100), rw=Math.min(100-x0,(ps.rested||0)/need*100); r.style.left=x0+'%'; r.style.width=Math.max(0,rw)+'%'; r.style.display=rw>0.5?'':'none';
    if((ps.level||1)>=cap){ v.style.display=''; v.style.width=Math.min(100,(ps.valour||0)/ZECO.VALOUR[ZECO.realm(ps)]*100)+'%'; v.title='Valour: '+(ps.valour||0)+' / '+ZECO.VALOUR[ZECO.realm(ps)]+' XP to the next Valour chest'; } else v.style.display='none'; },700);
  // the dungeon: the run's ledger, chests, the spoils card, flawless floors
  if(typeof DungeonScene!=='undefined'){ var D=DungeonScene.prototype;
    D._openChest=function(){ return ZECO.openChest(this); };
    var ex0=D._exitToWorld; D._exitToWorld=function(){ var r=ex0.apply(this,arguments); setTimeout(ZECO.spoils,400); return r; };
    var sv0=D._saveFloorState; D._saveFloorState=function(){ try{ ZECO.flawless(this); }catch(e){} return sv0.apply(this,arguments); };
    var bc0=D._openBossChest; D._openBossChest=function(){ try{ ZECO.flawless(this); }catch(e){} ZECO.runStart(this); return bc0.apply(this,arguments); }; }
  // sky ports and the boss rush: the hard-fight floor
  if(typeof SkyScene!=='undefined'){ var S=SkyScene.prototype, eg0=S._endGame; S._endGame=function(won){ var first=!((this.ps&&this.ps.completedQuests)||[]).includes('s'+((this.site&&this.site.section)||1)+'_skyport'); var r=eg0.apply(this,arguments);
      if(won&&this.ps)try{ ZECO.hardWin(this,this.ps,this.sec||1,first,'The sky port stands'); }catch(e){} return r; }; }
},0);
// a Flawless floor: no hit taken on it → +25 % of the floor's XP
ZECO.flawless=function(scene){ if(scene._flawDone||!scene._floorXp)return; scene._flawDone=true; if(scene._hitThisFloor)return; var ps=scene.worldScene.playerState, b=Math.round(scene._floorXp*0.25); if(b<1)return;
  ps.xp+=b; if(ZECO.run)ZECO.run.xp+=b; showNotif('✨ FLAWLESS floor — +'+b+' XP (not a scratch on you)','#8fe8a0'); if(scene._checkLevelUp)scene._checkLevelUp(ps); };
ZECO.capOf=function(ps){ var m=Math.max.apply(null,(ps&&ps.unlockedSections)||[1]); return m>=4?20:m>=3?15:m>=2?10:5; };
