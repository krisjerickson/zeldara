// ═══════════════════════════════════════════════════════════════════════
// ║ 22m2-economy-places.js — round 121: the economy's places and moments (with 22m-economy.js).
// ║  · after a kill out in the world (ZECO.afterKill): Alphas (gear 1 in 4, their trophy the first time), the Binders (they pay; the realm's
// ║    captain gives a named piece), the named Alpha of each realm, bounties
// ║  · Alphas seen at a glance (N9): a gold ring underfoot, a crown, a gold-framed bar, a growl and a toast, a gold dot on the minimap
// ║  · the island traders as specialists (I1), the hamlet stalls (I2), the sky-port quartermaster (I3)
// ║  · the jeweller: Dungeon Coins for gold, and three gems of one element for one of another; the lesser rings are on the shelf (I7)
// ║  · Brokkr's commissions at the forge once the Lodestar is made (N8): tempering the Sovereign pieces, recasting a set piece
// ║  · Runa's board on the Green: three bounties, the village fund (the realm's building, the festivals, the trophy hall, the great feast)
// ║  · saddles and barding at the stables (N6), the trophy hall (I8), the Tome's Relics page (I5), nothing lost for a collector
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZECO==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var icon=function(id,em){ return typeof ZIcon!=='undefined'?ZIcon.item(id,em||1.3):(ITEMS[id]&&ITEMS[id].icon||''); };
  var give=function(ps,id,n){ if(!ITEMS[id])return false; if(!ps.inventory)ps.inventory=[]; for(var i=0;i<(n||1);i++)ps.inventory.push(id); if(typeof Tome!=='undefined')try{ Tome.see('item',id); }catch(e){} return true; };
  var owns=function(ps,id){ return (ps.inventory||[]).some(function(x){ return String(x).split('~')[0]===id; })||ZECO.wearing(ps,id); };
  ZECO.owns=owns;
  // ── the named Alpha of each realm ──
  ZECO.NAMED_ALPHA={1:['Old Brindle','brindle_charm'],2:['the Mire-Strider','mire_strider_boots'],3:['Greyhorn','greyhorn_helm'],4:['Cinderjaw','cinderjaw_ring']};
  ZECO.WARDEN_NAMED={q1_b:'thornwood_spurs',q2_c:'abbots_bell',q3_b:'anvil_bracers',q4_d:'bone_signet'};
  ZECO.CAPTAIN={1:'grimkell_hood',2:'skuli_gloves',3:'kolgrim_mantle',4:'svarthof_cloak'};
  ZECO.nameAlphas=function(ws){ if(!ws.worldMonsters||ws._zNamed)return; ws._zNamed=true; [1,2,3,4].forEach(function(q){ var m=ws.worldMonsters.find(function(x){ return x&&x.alpha&&(x.section||x.def.sec)===q; }); if(!m)return;
      m._named=q; var N=ZECO.NAMED_ALPHA[q]; try{ if(m.nameTxt&&m.nameTxt.setText)m.nameTxt.setText(N[0]+' (Alpha)'); m.def=Object.assign({},m.def,{name:N[0]}); }catch(e){} }); };
  ZECO.captainOf=function(ws,q){ var S=(typeof ZSPIRIT!=='undefined'&&ZSPIRIT.shrines(ws))||[], L=S.filter(function(s){ return s.q===q; }); if(!L.length)return null; return L.reduce(function(a,b){ return a.n<=b.n?a:b; }); };
  // ── after a kill out in the world (10-scene-world _worldMonsterDied) ──
  ZECO.afterKill=function(ws,mon,info){ var ps=ws.playerState, q=Math.max(1,Math.min(4,mon.section||(mon.def&&mon.def.sec)||1)), rid=mon.R&&mon.R.id;
    if(mon.alpha){ if(Math.random()<0.25){ var gi=ZECO.gearDrop(q); if(gi){ give(ps,gi); showNotif('⚔ The Alpha dropped '+ITEMS[gi].name+'!',ZECO.bandOf(gi)[1]); } }
      var tr='tr_'+rid; if(rid&&ITEMS[tr]){ var T=ps.trophies||(ps.trophies={}); if(!T[rid]){ T[rid]=1; give(ps,tr); showNotif('🏆 A trophy: '+ITEMS[tr].name+' — hang it in the trophy hall, or sell it','#ffcc33'); } }
      if(mon._named){ var N=ZECO.NAMED_ALPHA[mon._named]; if(N&&!owns(ps,N[1])){ give(ps,N[1]); showNotif('✦ '+N[0]+' is down — '+ITEMS[N[1]].name+' (a Relic)!','#fff2c8'); } }
      ZECO.bountyEvent(ps,'alpha',{q:q}); }
    if(mon._binder&&/the Binder$/.test((mon.def&&mon.def.name)||'')){ var g=ZECO.gold(ps,ZECO.FLOOR[q]*ZECO.BINDER,'prize',ws); var x=ZECO.xpGive(ws,ps,150*q,{binder:1,x:mon.x,y:mon.y});
      var got='+'+g+' gold, +'+x+' XP'; if(Math.random()<0.3){ var gem=ZLoot.realmGem(q); give(ps,gem); got+=', '+ITEMS[gem].name; }
      var C=ZECO.captainOf(ws,q); if(C&&C.id===mon._binder&&!owns(ps,ZECO.CAPTAIN[q])){ give(ps,ZECO.CAPTAIN[q]); got+=' — and '+ITEMS[ZECO.CAPTAIN[q]].name+' (a Relic)'; }
      showNotif('⛓ '+mon.def.name+' is beaten: '+got,'#ffe9a8'); ZECO.bountyEvent(ps,'binder',{q:q}); if(ws._checkLevelUp)ws._checkLevelUp(ps); }
    if(info&&info.g)ZECO.coins(ws,mon.x,mon.y,info.g); };
  // ── Alphas seen at a glance (N9) ──
  ZECO.alphaLook=function(scene,mon){ try{ var c=mon.cont, r=(mon.def&&mon.def.r)||12; if(!c||mon._zAlpha)return; mon._zAlpha=true;
      var ring=scene.add.ellipse(0,r*0.9+2,r*3.2,r*1.1).setStrokeStyle(2,0xffcc33,0.9); ring.setFillStyle(0xffcc33,0.12); c.addAt(ring,0); scene.tweens.add({targets:ring,scaleX:1.18,scaleY:1.18,alpha:0.45,duration:900,yoyo:true,repeat:-1});
      if(mon.hpBg&&mon.hpBg.setStrokeStyle)mon.hpBg.setStrokeStyle(1,0xffcc33,1);
      var y=(mon.hpBg?mon.hpBg.y:-30)-16, cr=scene.add.text(0,y,'♛',{fontSize:'13px',color:'#ffcc33',stroke:'#000',strokeThickness:3}).setOrigin(0.5,1); c.add(cr); }catch(e){} };
  setTimeout(function(){ if(typeof MX!=='undefined'&&MX.spawn){ var sp0=MX.spawn; MX.spawn=function(scene,rid,x,y,o){ var m=sp0.apply(this,arguments); if(m&&o&&o.alpha)ZECO.alphaLook(scene,m); return m; }; } },0);
  setInterval(function(){ var ws=ZECO.ws(); if(!ws||!ws.player||!ws.worldMonsters||!ws.sys||!ws.sys.isActive())return; ZECO.nameAlphas(ws);
    ws.worldMonsters.forEach(function(m){ if(!m||m.dead||!m.alpha)return; if(!m._zAlpha&&m.cont)ZECO.alphaLook(ws,m); var d=Math.hypot(m.x-ws.player.x,m.y-ws.player.y);
      if(d<260&&!m._zSeen){ m._zSeen=true; showNotif('♛ An Alpha '+((m.def&&m.def.name)||'')+'! — tougher, and worth it','#ffcc33'); if(typeof ZSFX!=='undefined')try{ ZSFX.play('beast_growl'); }catch(e){} }
      else if(d>700)m._zSeen=false; }); },500);
  setTimeout(function(){ if(typeof _drawMinimapHud!=='function')return; var d0=_drawMinimapHud; _drawMinimapHud=function(ws,dng){ var r=d0.apply(this,arguments); try{ if(dng||!ws||!ws.player||!ws.worldMonsters)return r;
        var cv=document.getElementById('minimap-hud-canvas'); if(!cv)return r; var ctx=cv.getContext('2d'), n=WM_MINI_TILES, ptx=ws.player.x/TILE, pty=ws.player.y/TILE, v={x:Math.max(0,Math.min(WORLD_W-n,ptx-n/2)),y:Math.max(0,Math.min(WORLD_H-n,pty-n/2))}, s=cv.width/n;
        ws.worldMonsters.forEach(function(m){ if(!m||m.dead||!m.alpha)return; var tx=m.x/TILE, ty=m.y/TILE; if(Math.hypot(tx-ptx,ty-pty)>30)return; ctx.fillStyle='#ffcc33'; ctx.strokeStyle='#000'; ctx.lineWidth=1; ctx.beginPath(); ctx.arc((tx-v.x)*s,(ty-v.y)*s,3.5,0,Math.PI*2); ctx.fill(); ctx.stroke(); }); }catch(e){} return r; }; },0);
  // ── I1 · the island traders as specialists ──
  ZECO.isleStock=function(isl,ps){ var k=isl&&(isl.sec||isl.section||isl.q||isl.k); if(!k&&typeof HARBOR_ISLANDS!=='undefined')for(var i=1;i<=4;i++)if(HARBOR_ISLANDS[i]===isl)k=i; k=k||1;
    var L=(isl.shopItems||[]).slice(); Object.keys(ITEMS).forEach(function(id){ if(ITEMS[id].isle===k&&L.indexOf(id)<0)L.push(id); });
    var rare=ZLoot.REALM_RARE[k]; if(rare&&L.indexOf(rare)<0)L.push(rare); if(k===4){ ['moon_shard','skystone'].forEach(function(id){ if(ITEMS[id]&&L.indexOf(id)<0)L.push(id); }); }
    return {k:k,ids:L}; };
  ZECO.islePrice=function(id){ var it=ITEMS[id]; if(!it)return 999; if(it.slot==='gem')return (it.goldVal||40)*5; var p=it.buy>0?it.buy:(it.price||it.sell*3||40); return Math.round(p*1.25/5)*5; };
  ZECO.isleLeft=function(ps,id){ var it=ITEMS[id]; if(!it||it.slot!=='gem')return 99; var towers=((ps.completedQuests||[]).filter(function(q){ return /^s\d_tower$/.test(q); }).length)||1, B=ps.isleBought||{}; return Math.max(0,2*towers-(B[id]||0)); };
  setTimeout(function(){ if(typeof openIslandShop!=='function')return;
    openIslandShop=function(isl,ps,scene){ document.getElementById('camp-title').textContent='🛒 '+isl.name+' — Trader'; var S=ZECO.isleStock(isl,ps);
      var h='<p style="font-size:11px;color:#8a96a8;margin-bottom:12px">Island goods: the realm\'s rare gems (two for every realm\'s tower you have taken), and pieces made only on this island.</p>';
      S.ids.forEach(function(id){ var it=ITEMS[id]; if(!it)return; var price=ZECO.islePrice(id), left=ZECO.isleLeft(ps,id), ok=ps.gold>=price&&left>0, B=ZECO.bandOf(id), stat=it.atk?'ATK +'+it.atk:it.def?'DEF +'+it.def:it.heal?'Heals '+it.heal+' HP':it.slot==='gem'?'gem':'';
        h+='<div class="shop-item"><div class="si-icon">'+icon(id,1.5)+'</div><div class="si-info"><div class="si-name" style="color:'+B[1]+'">'+esc(it.name)+(it.isle?' <small style="color:#9fd0ff">· island-made</small>':'')+'</div><div class="si-desc">'+stat+(stat?' &nbsp;•&nbsp; ':'')+price+'g'+(it.slot==='gem'?' &nbsp;•&nbsp; '+left+' left':'')+'</div></div><button class="si-buy" '+(ok?'':'disabled')+' onclick="window._zIsleBuy(\''+id+'\','+price+')">'+(left>0?'Buy':'Sold out')+'</button></div>'; });
      h+='<p style="font-size:10px;color:#445;margin-top:8px;text-align:center">You have <span style="color:#ffd700">'+ps.gold+'g</span></p>';
      document.getElementById('camp-content').innerHTML=h; window._zIsle=[isl,scene]; var m=document.getElementById('modal-camp'); if(!m||m.style.display==='none')toggleModal('camp'); };
    window._zIsleBuy=function(id,price){ var ps=ZECO.ps(); if(!ps)return; var it=ITEMS[id]; if(ZECO.isleLeft(ps,id)<=0)return; if(ps.gold<price){ showNotif('Not enough gold!','#ff4444'); return; }
      ps.gold-=price; give(ps,id); if(it.slot==='gem'){ var B=ps.isleBought||(ps.isleBought={}); B[id]=(B[id]||0)+1; } showNotif('Bought '+it.name,'#44ffaa'); var I=window._zIsle; if(I)openIslandShop(I[0],ps,I[1]); }; },0);
  // ── I2 · the hamlet stalls: once six of a realm's spirits are free, its kin sell what their trade makes ──
  ZECO.STALL={weaver:['wool_cloak','travel_cloak','ranger_cloak'],dyer:['cloth_cap','mage_hood'],tanner:['leather_boots','ranger_boots','leather_gauntlets'],'net-mender':['leather_gauntlets','arrow_normal'],smith:['hand_axe','iron_shield','iron_helm'],
    carver:['short_bow','hunting_bow','arrow_normal'],stonemason:['iron_shield','kite_shield'],shipwright:['arrow_normal','light_crossbow'],beekeeper:['honey','pot_heal1'],forester:['hunting_bow','ranger_cloak'],herder:['cheese','roast_meat'],skald:['bread','mage_hood'],
    baker:['bread','runeloaf'],brewer:['mead','ale'],potter:['pot_heal1','pot_heal2'],midwife:['pot_heal2','pot_elixir'],miller:['bread','trail_mix'],fisher:['grilled_fish','arrow_normal'],shepherd:['cheese','wool_cloak'],cooper:['arrow_normal','pot_heal1']};
  ZECO.stallOpen=function(ps,n){ var S=typeof ZHAM!=='undefined'&&ZHAM.spirit(n); if(!S)return false; var q=S.q||Math.floor(n/10)+1, c=typeof ZSPIRIT!=='undefined'?ZSPIRIT.count(ps,q):0; return c>=6; };
  ZECO.stall=function(n){ var ws=ZECO.ws(), ps=ZECO.ps(); if(!ps)return; var tr=typeof ZHAM!=='undefined'?ZHAM.trade(n):'smith', L=(ZECO.STALL[tr]||ZECO.STALL.smith).filter(function(id){ return ITEMS[id]; });
    Object.keys(ITEMS).forEach(function(id){ if(ITEMS[id].hamlet===tr&&L.indexOf(id)<0)L.push(id); }); var S=ZHAM.spirit(n);
    document.getElementById('camp-title').textContent='🛖 The '+tr+'\'s stall — '+((S&&S.name)||'')+'\'s kin';
    var h='<p style="font-size:11px;color:#8a96a8;margin-bottom:12px">What a '+esc(tr)+' makes, sold where it is made.</p>';
    L.forEach(function(id){ var it=ITEMS[id], p=it.buy>0?it.buy:(it.price||40), ok=ps.gold>=p, B=ZECO.bandOf(id);
      h+='<div class="shop-item"><div class="si-icon">'+icon(id,1.5)+'</div><div class="si-info"><div class="si-name" style="color:'+B[1]+'">'+esc(it.name)+(it.hamlet?' <small style="color:#e8c878">· hamlet-made</small>':'')+'</div><div class="si-desc">'+esc(it.desc||'')+' &nbsp;•&nbsp; '+p+'g</div></div><button class="si-buy" '+(ok?'':'disabled')+' onclick="window._buyItem(\''+id+'\','+p+')">Buy</button></div>'; });
    document.getElementById('camp-content').innerHTML=h; var m=document.getElementById('modal-camp'); if(!m||m.style.display==='none')toggleModal('camp'); };
  setTimeout(function(){ if(typeof ZHAMW==='undefined'||!ZHAMW.talk)return; var t0=ZHAMW.talk; ZHAMW.talk=function(scene,n){ var ps=ZECO.ps();
      if(ps&&ZECO.stallOpen(ps,n)&&typeof ZSPIRIT!=='undefined'&&ZSPIRIT.talk){ var tk=ZSPIRIT.talk; ZSPIRIT.talk=function(a,b,c,opts,d){ ZSPIRIT.talk=tk; opts=(opts||[]).concat([{t:'🛖 See the stall',f:function(){ ZECO.stall(n); }}]); return tk.call(this,a,b,c,opts,d); }; }
      return t0.apply(this,arguments); }; },0);
  // ── I3 · the sky-port quartermaster (in the pre-flight shop once the port stands) ──
  ZECO.QM={1:['iron_sword','gem_topaz','sky_cloak'],2:['long_sword','gem_topaz','sky_cloak'],3:['flame_sword','skystone','sky_cloak'],4:['sky_sword','skystone','sky_cloak']};
  setTimeout(function(){ if(typeof WorldScene==='undefined')return; var W=WorldScene.prototype, s0=W._showSkyportUpgradeShop; if(!s0)return;
    W._showSkyportUpgradeShop=function(site){ var r=s0.apply(this,arguments); try{ var ps=this.playerState, sec=(site&&site.section)||1; if(((ps.completedQuests||[]).indexOf('s'+sec+'_skyport'))<0)return r;
        var ov=document.getElementById('skyport-shop-overlay'), box=ov&&ov.firstChild; if(!box)return r; var d=document.createElement('div'); d.style.cssText='margin-top:12px;border-top:1px solid #335;padding-top:8px;text-align:left';
        d.innerHTML='<div style="color:#aaddff;font:700 13px Segoe UI;margin-bottom:4px">⚓ The quartermaster</div>'+ZECO.QM[sec].map(function(id){ var it=ITEMS[id]; if(!it)return ''; var p=ZECO.islePrice(id);
          return '<div style="display:flex;align-items:center;gap:8px;margin:3px 0;font:12px Segoe UI;color:#cde">'+icon(id,1.1)+'<span style="flex:1">'+esc(it.name)+'</span><button class="si-buy" '+(ps.gold>=p?'':'disabled')+' onclick="window._buyItem(\''+id+'\','+p+');this.disabled=true">'+p+'g</button></div>'; }).join('');
        box.appendChild(d); }catch(e){} return r; }; },0);
  // ── the jeweller: Dungeon Coins for gold (rising), and the gem exchange ──
  ZECO.coinPrice=function(ps){ var q=ZECO.realm(ps), B=ps.coinBuy||{}; return 100+50*(B[q]||0); };
  setTimeout(function(){ if(typeof ZJewel==='undefined')return; var h0=ZJewel.html; ZJewel.html=function(ps){ var h=h0.apply(this,arguments), p=ZECO.coinPrice(ps);
      var x='<div class="zj-h">Dungeon Coins <small>for gold — the price rises with each one bought in a realm</small></div><div class="shop-item"><div class="si-icon">'+icon('dungeon_coin',1.5)+'</div><div class="si-info"><div class="si-name">Dungeon Coin</div><div class="si-desc">'+p+' g</div></div><button class="si-buy"'+(ps.gold>=p?'':' disabled')+' onclick="window._zCoin()">Buy</button></div>';
      x+='<div class="zj-h">The gem exchange <small>three gems of one element for one of another</small></div><div class="zj-ex">'+ZLoot.COMMON.map(function(a){ var n=ZLoot.count(ps,a); if(n<3)return ''; return '<div class="zj-exr">'+icon(a,1.1)+' ×3 → '+ZLoot.COMMON.filter(function(b){ return b!==a; }).map(function(b){ return '<button class="zj-set" onclick="window._zTrade(\''+a+'\',\''+b+'\')">'+icon(b,1)+'</button>'; }).join('')+'</div>'; }).join('')+'</div>';
      return h.replace('<div class="zj-h">Set a gem',x+'<div class="zj-h">Set a gem'); };
    var re=function(){ var ws=ZECO.ws(); if(!ws)return; var m=document.getElementById('modal-camp'); if(m&&m.style.display!=='none')toggleModal('camp'); openBuildingShop('jeweler',ws.playerState,ws); ws._emitUI(); };
    window._zCoin=function(){ var ps=ZECO.ps(), p=ZECO.coinPrice(ps); if(ps.gold<p)return showNotif('Not enough gold','#ff8844'); ps.gold-=p; give(ps,'dungeon_coin'); var B=ps.coinBuy||(ps.coinBuy={}), q=ZECO.realm(ps); B[q]=(B[q]||0)+1; showNotif('🪙 A Dungeon Coin','#bfe8ff'); re(); };
    window._zTrade=function(a,b){ var ps=ZECO.ps(); if(ZLoot.count(ps,a)<3)return; ZLoot.take(ps,a,3); give(ps,b); showNotif('💎 3 '+ITEMS[a].name+' → '+ITEMS[b].name,'#bfe8ff'); re(); }; },0);
  // ── N8 · Brokkr's commissions (at the forge, once the Lodestar is made) ──
  ZECO.TEMPER=[2000,4000,8000];
  ZECO.applyTemper=function(ps){ var T=(ps&&ps.temper)||{}; Object.keys(ITEMS).forEach(function(id){ if(!/^sov_/.test(id))return; var it=ITEMS[id]; if(!it._b)it._b={atk:it.atk||0,def:it.def||0}; var t=T[id]||0;
      if(it._b.atk)it.atk=Math.round(it._b.atk*(1+0.15*t)); if(it._b.def)it.def=Math.round(it._b.def*(1+0.15*t)); }); };
  ZECO.lodestar=function(ps){ return owns(ps,'lodestar')||((ps.flags||{}).lodestar)||!!(ps.lodestarMade); };
  setTimeout(function(){ if(typeof openForgeModal!=='function')return; var f0=openForgeModal; openForgeModal=function(ps,ws){ var r=f0.apply(this,arguments); try{ if(!ZECO.lodestar(ps))return r; var el=document.getElementById('camp-content'); if(!el)return r;
        var T=ps.temper||{}, rare=(typeof R45_RARE!=='undefined'?Object.keys(R45_RARE):[]).filter(function(id){ return ZLoot.count(ps,id)>0; }), d=document.createElement('div'); d.className='zj';
        var h='<div class="zj-h">⚒ Brokkr\'s commissions <small>Brokkr stayed at the great hearth after the Lodestar — he tempers the Sovereign pieces and recasts set gems</small></div>';
        Object.keys(ITEMS).filter(function(id){ return /^sov_/.test(id)&&owns(ps,id); }).forEach(function(id){ var t=T[id]||0; if(t>=3)return h+='<div class="shop-item"><div class="si-icon">'+icon(id,1.3)+'</div><div class="si-info"><div class="si-name">'+esc(ITEMS[id].name)+' — fully tempered</div></div></div>';
          var c=ZECO.TEMPER[t], ok=ps.gold>=c&&rare.length>0; h+='<div class="shop-item"><div class="si-icon">'+icon(id,1.3)+'</div><div class="si-info"><div class="si-name">'+esc(ITEMS[id].name)+' — temper '+(t+1)+' of 3</div><div class="si-desc">+15 % to its strength · '+c+' g and a rare forging item</div></div><button class="si-buy"'+(ok?'':' disabled')+' onclick="window._zTemper(\''+id+'\')">Temper</button></div>'; });
        (ps.inventory||[]).forEach(function(id,i){ if(String(id).indexOf('~')<0)return; var b=String(id).split('~')[0]; h+='<div class="shop-item"><div class="si-icon">'+icon(b,1.3)+'</div><div class="si-info"><div class="si-name">Recast '+esc((ITEMS[id]||ITEMS[b]).name)+'</div><div class="si-desc">its set gems are melted out, ready to set again · 1,500 g</div></div><button class="si-buy"'+(ps.gold>=1500?'':' disabled')+' onclick="window._zRecast('+i+')">Recast</button></div>'; });
        d.innerHTML=h; el.appendChild(d); }catch(e){} return r; };
    var re=function(){ var ws=ZECO.ws(); if(!ws)return; var m=document.getElementById('modal-camp'); if(m&&m.style.display!=='none')toggleModal('camp'); openForgeModal(ws.playerState,ws); ws._emitUI(); };
    window._zTemper=function(id){ var ps=ZECO.ps(), T=ps.temper||(ps.temper={}), t=T[id]||0, c=ZECO.TEMPER[t]; var rare=Object.keys(R45_RARE).find(function(x){ return ZLoot.count(ps,x)>0; }); if(t>=3||ps.gold<c||!rare)return;
      ps.gold-=c; ZLoot.take(ps,rare,1); T[id]=t+1; ZECO.applyTemper(ps); showNotif('⚒ Brokkr tempers the '+ITEMS[id].name+' ('+(t+1)+'/3)','#ffcc88'); re(); };
    window._zRecast=function(i){ var ps=ZECO.ps(), id=ps.inventory[i]; if(!id||String(id).indexOf('~')<0||ps.gold<1500)return; ps.gold-=1500; ps.inventory[i]=String(id).split('~')[0]; showNotif('⚒ Recast — the piece is ready for new gems','#ffcc88'); re(); }; },0);
  setInterval(function(){ var ps=ZECO.ps(); if(!ps)return; var sig=JSON.stringify(ps.temper||{}); if(ps._tsig!==sig){ ps._tsig=sig; ZECO.applyTemper(ps); } },2000);
  // ── N6 + round 119 · the village fund, on Runa's board ──
  ZECO.FUND=[
    {id:'barn',q:1,after:'s1_tower',cost:1000,n:'The stables\' second barn',d:'Room for every mount you win: called mounts arrive at a gallop'},
    {id:'windows',q:2,after:'s2_tower',cost:3000,n:'The Glimmerhall\'s great windows',d:'Sólveig\'s hall glows over the Green at night'},
    {id:'crane',q:3,after:'s3_tower',cost:5000,n:'A harbour crane',d:'Hesk\'s boats load faster; the harbour traders stock one more piece'},
    {id:'hall',q:4,after:'s4_tower',cost:10000,n:'The great hall',d:'A hall for the whole village — the feasts and the trophy hall move here'},
    {id:'fest_sp',q:1,cost:500,n:'Fund the Blossom Feast',d:'Better food, more music, a prize for the tafl winner'},
    {id:'fest_su',q:2,cost:1000,n:'Fund Midsummer Fires',d:'A bigger bonfire, a mead-tasting, the sun-wheel run'},
    {id:'fest_au',q:3,cost:2000,n:'Fund the Harvest Fires',d:'The flyting stage, the forge-off, ale for the village'},
    {id:'fest_wi',q:4,cost:4000,n:'Fund Yule',d:'The great Yule goat and a feast in the hall'},
    {id:'trophy',q:2,cost:2000,n:'The trophy hall',d:'Hang your Alpha trophies: each one hung adds ½ % gold (up to 15 %)'},
    {id:'feast',q:4,after:'lodestar',cost:5000,n:'A great feast year',d:'After the end: a feast bigger than any festival, every year'}];
  ZECO.fundOpen=function(ps,F){ if(ZECO.realm(ps)<F.q)return false; if(F.after==='lodestar')return ZECO.lodestar(ps); if(F.after)return (ps.completedQuests||[]).indexOf(F.after)>=0; return true; };
  ZECO.funded=function(ps,id){ return !!((ps.fund||{})[id]); };
  // ── round 119 · Runa's board: three bounties ──
  ZECO.REFRESH=40*60*1000;
  ZECO.bounties=function(ps){ var B=ps.bounty; if(B&&B.L&&Date.now()-B.at<ZECO.REFRESH&&B.L.some(function(x){ return !x.done; }))return B;
    var q=ZECO.realm(ps), ws=ZECO.ws(), sites=((ws&&ws.wd&&ws.wd.sites)||[]).filter(function(s){ return s.section<=q&&(s.type==='tower'||s.type==='dungeon'); }), seed=Date.now(), pick=function(L){ return L[Math.floor(Math.random()*L.length)]; };
    var S=pick(sites)||{id:'s1_tower',name:'Silverwood Palace',section:1}, gpm=[0,58,143,217,404], base=function(r){ return Math.round(gpm[r]*15/5)*5; };
    B={at:seed,L:[{k:'alpha',q:q,need:2,have:0,t:'Hunt two Alphas in the '+['','Gildenmark','Fernheim','Cragland','Cinderheim'][q],g:base(q)},
      {k:'site',id:S.id,need:1,have:0,t:'Clear '+S.name,g:base(S.section||q)},{k:'binder',q:q,need:1,have:0,t:'Beat a Binder in the '+['','Gildenmark','Fernheim','Cragland','Cinderheim'][q],g:base(q)}]}; ps.bounty=B; return B; };
  ZECO.bountyEvent=function(ps,k,o){ var B=ps.bounty; if(!B||!B.L)return; B.L.forEach(function(x){ if(x.done||x.k!==k)return; if(k==='site'&&o.id!==x.id)return; if((k==='alpha'||k==='binder')&&o.q!==x.q)return;
      x.have++; if(x.have>=x.need){ x.done=true; x.paid=false; showNotif('📜 Bounty done: '+x.t+' — collect it at Runa\'s board','#ffe9a8'); } }); };
  ZECO.board=function(){ var ws=ZECO.ws(), ps=ZECO.ps(); if(!ps)return; var B=ZECO.bounties(ps);
    var h='<p style="font-size:11px;color:#8a96a8">Runa pins three bounties to the board each day; finish all three for a chest. The village fund is on the right.</p><div class="zb-cols"><div><div class="zj-h">📜 Bounties</div>';
    B.L.forEach(function(x,i){ var bonus=x.bonus||0; h+='<div class="shop-item"><div class="si-info"><div class="si-name">'+esc(x.t)+'</div><div class="si-desc">'+x.g+' g + a lucky roll · '+Math.min(x.have,x.need)+' / '+x.need+'</div></div>'+(x.done&&!x.paid?'<button class="si-buy" onclick="window._zBounty('+i+')">Collect</button>':x.paid?'<span style="color:#8fe8a0">✓</span>':'')+'</div>'; });
    if(B.L.every(function(x){ return x.paid; })&&!B.chest)h+='<button class="si-buy" onclick="window._zBountyChest()">🎁 All three — open the chest</button>';
    h+='</div><div><div class="zj-h">🏘 The village fund</div>';
    ZECO.FUND.forEach(function(F){ if(!ZECO.fundOpen(ps,F))return; var done=ZECO.funded(ps,F.id);
      h+='<div class="shop-item"><div class="si-info"><div class="si-name">'+esc(F.n)+'</div><div class="si-desc">'+esc(F.d)+(done?'':' · '+F.cost.toLocaleString('en-US')+' g')+'</div></div>'+(done?'<span style="color:#8fe8a0">✓ built</span>':'<button class="si-buy"'+(ps.gold>=F.cost?'':' disabled')+' onclick="window._zFund(\''+F.id+'\')">Fund</button>')+'</div>'; });
    if(ZECO.funded(ps,'trophy')){ var T=Object.keys(ITEMS).filter(function(id){ return ITEMS[id].trophy&&ZLoot.count(ps,id)>0; }), H=ps.trophyHall||[];
      h+='<div class="zj-h">🏆 The trophy hall <small>'+H.length+' hung · +'+(Math.min(15,H.length*0.5)).toFixed(1)+' % gold</small></div>'+(T.length?T.map(function(id){ return '<div class="shop-item"><div class="si-icon">'+icon(id,1.2)+'</div><div class="si-info"><div class="si-name">'+esc(ITEMS[id].name)+'</div></div><button class="si-buy" onclick="window._zHang(\''+id+'\')">Hang it</button></div>'; }).join(''):'<p style="font-size:11px;color:#8a96a8">Beat Alphas for their trophies.</p>'); }
    h+='</div></div>'; document.getElementById('camp-title').textContent='📋 Runa\'s board'; document.getElementById('camp-content').innerHTML=h; var m=document.getElementById('modal-camp'); if(!m||m.style.display==='none')toggleModal('camp'); if(m)m.classList.add('zf-wide'); };
  window._zBounty=function(i){ var ps=ZECO.ps(), x=ps.bounty&&ps.bounty.L[i]; if(!x||!x.done||x.paid)return; var bonus=Math.random()<0.3?Math.round(x.g*(0.2+Math.random()*0.5)):0; x.paid=true;
    var g=ZECO.gold(ps,x.g+bonus,'other'); showNotif('📜 Bounty paid: '+g+' gold'+(bonus?' (a lucky roll!)':''),'#ffd700'); ZECO.board(); };
  window._zBountyChest=function(){ var ps=ZECO.ps(), B=ps.bounty; if(!B||B.chest)return; B.chest=true; var q=ZECO.realm(ps), gem=ZLoot.realmGem(q,0.3); give(ps,gem); give(ps,'dungeon_coin',2); var gi=ZECO.gearDrop(q); if(gi)give(ps,gi);
    showNotif('🎁 The bounty chest: '+ITEMS[gem].name+', 2 Dungeon Coins'+(gi?', '+ITEMS[gi].name:''),'#ffe9a8'); ZECO.board(); };
  window._zFund=function(id){ var ps=ZECO.ps(), F=ZECO.FUND.find(function(x){ return x.id===id; }); if(!F||ZECO.funded(ps,id)||ps.gold<F.cost)return; ps.gold-=F.cost; (ps.fund||(ps.fund={}))[id]=Date.now(); showNotif('🏘 '+F.n+' — funded! The village thanks you.','#ffe9a8'); ZECO.board(); };
  window._zHang=function(id){ var ps=ZECO.ps(); if(!ZLoot.take(ps,id,1))return; (ps.trophyHall||(ps.trophyHall=[])).push(id); showNotif('🏆 '+ITEMS[id].name+' hangs in the trophy hall','#ffcc33'); ZECO.board(); };
  // the board on the Green ([Tab] beside it)
  ZECO.boardSpot=function(){ return {x:(CENTER_X+4)*TILE,y:(CENTER_Y+3)*TILE}; };
  ZECO.boardShow=function(ws){ if(ws._zBoard&&ws._zBoard.scene)return; var P=ZECO.boardSpot(), Z=typeof _scn==='function'?_scn():null;
    var im=Z&&Z.has&&Z.has('ec_board')?Z.image(ws,'ec_board',P.x,P.y,Z.K,WR_DEPTH(P.y))      /* round 128: the 5th argument is a size multiplier — 70 drew the board 70 times too big and covered the village */:null;
    if(!im){ if(!ws.textures.exists('zeco_board')){ var c=mkCanvas(56,60), g=c.getContext('2d'); g.fillStyle='rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(28,57,24,4,0,0,Math.PI*2); g.fill(); g.fillStyle='#5a3a1a'; g.fillRect(8,20,5,38); g.fillRect(43,20,5,38);
        g.fillStyle='#8a6030'; g.fillRect(4,8,48,30); g.fillStyle='#6a4a20'; g.fillRect(2,4,52,6); g.fillStyle='#f0e6c8'; [[9,14],[23,13],[37,15]].forEach(function(p){ g.fillRect(p[0],p[1],11,14); }); g.fillStyle='#c03020'; [[14,15],[28,14],[42,16]].forEach(function(p){ g.beginPath(); g.arc(p[0],p[1],1.6,0,6.3); g.fill(); }); ws.textures.addCanvas('zeco_board',c); }
      im=ws.add.image(P.x,P.y,'zeco_board').setOrigin(0.5,1).setDepth(WR_DEPTH(P.y)); }
    ws._zBoard=im; ws.events.once('shutdown',function(){ ws._zBoard=null; }); };
  setInterval(function(){ var ws=ZECO.ws(); if(!ws||!ws.player||!ws.sys||!ws.sys.isActive()||ws.islKey)return; try{ ZECO.boardShow(ws); var P=ZECO.boardSpot(), d=Math.hypot(ws.player.x-P.x,ws.player.y-P.y);
      if(d<TILE*2.2&&!ws._zBoardHint){ ws._zBoardHint=true; showNotif('📋 Runa\'s board — [Tab] to read the bounties and the village fund','#ffe9a8'); } if(d>TILE*6)ws._zBoardHint=false; }catch(e){} },500);
  document.addEventListener('keydown',function(e){ if(e.key!=='Tab')return; if(typeof _anyModalOpen==='function'&&_anyModalOpen())return; var ws=ZECO.ws(); if(!ws||!ws.player||!ws.sys||!ws.sys.isActive()||ws.islKey)return;
    var P=ZECO.boardSpot(); if(Math.hypot(ws.player.x-P.x,ws.player.y-P.y)>TILE*2.2)return; e.preventDefault(); e.stopImmediatePropagation(); ZECO.board(); },true);
  // ── N6 · saddles and barding at the stables ──
  ZECO.SADDLE={1:200,2:800,3:1500,4:3000};
  setTimeout(function(){ if(typeof _renderMountsModal!=='function')return; var r0=_renderMountsModal; _renderMountsModal=function(ps){ var r=r0.apply(this,arguments); try{ if(!window._atStables)return r; var el=document.getElementById('mounts-content'); if(!el)return r; var t=ps.saddle||0, q=ZECO.realm(ps);
        var h='<div class="mount-row" style="background:rgba(200,160,80,.08);border:1px solid rgba(200,160,80,.35);margin-top:10px"><div class="mr-icon">'+icon('saddle_'+Math.max(1,Math.min(4,t+1)),1.5)+'</div><div class="mr-info"><div class="mr-name">'+(t?ITEMS['saddle_'+t].name+' — every mount '+(5*t)+'% faster':'No saddle yet')+'</div><div class="mr-desc">'+(t<4?'Next: '+ITEMS['saddle_'+(t+1)].name+' · '+ZECO.SADDLE[t+1]+' g'+(t+1>q?' (in a later realm)':''):'The best there is')+'</div></div>'+(t<4&&t+1<=q?'<button class="mr-btn"'+(ps.gold>=ZECO.SADDLE[t+1]?'':' disabled style="opacity:.45"')+' onclick="window._zSaddle()">Buy</button>':'')+'</div>';
        el.insertAdjacentHTML('beforeend',h); }catch(e){} return r; };
    window._zSaddle=function(){ var ps=ZECO.ps(), t=(ps.saddle||0)+1, c=ZECO.SADDLE[t]; if(!c||ps.gold<c||t>ZECO.realm(ps))return; ps.gold-=c; ps.saddle=t; give(ps,'saddle_'+t); showNotif('🐎 '+ITEMS['saddle_'+t].name+' — every mount is faster','#44ffaa'); _renderMountsModal(ps); }; },0);
  // ── collectors: the sky ports' other reward, and Oswin's cloak ──
  setTimeout(function(){ if(typeof ZNPCQ==='undefined'||!ZNPCQ.pay)return; var p0=ZNPCQ.pay; ZNPCQ.pay=function(ws,rw,q,S){ var r=p0.apply(this,arguments); try{ if(q&&q.id==='tankards'&&rw){ var ps=ws.playerState;
          if((rw.items||[]).some(function(x){ return x[0]==='raven_cloak'; }))ps.oswinOwes=600; else if(rw.gold){ ps.cloakForSale=1; ZECO.cloakShelf(ps); } } }catch(e){} return r; };
    if(typeof ZOSW!=='undefined'&&ZOSW.talk){ var t0=ZOSW.talk; ZOSW.talk=function(ws){ var ps=ws&&ws.playerState; if(ps&&ps.oswinOwes){ var g=ps.oswinOwes; ps.oswinOwes=0; ps.gold=(ps.gold||0)+g; showNotif('💰 Oswin: "The feast could wait. Here — the gold we saved for it, '+g+'. Halla would have wanted you to have both."','#ffd700'); } return t0.apply(this,arguments); }; } },0);
  ZECO.cloakShelf=function(ps){ if(ps&&ps.cloakForSale&&ITEMS.raven_cloak&&!(ITEMS.raven_cloak.buy>0))ITEMS.raven_cloak.buy=600; };
  setInterval(function(){ ZECO.cloakShelf(ZECO.ps()); },3000);
  // ── I5 · the Tome's Relics page (found or still to find, with where) ──
  setTimeout(function(){ if(typeof TOME_CATS==='undefined'||typeof Tome==='undefined')return; if(!TOME_CATS.some(function(c){ return c.k==='relic'; }))TOME_CATS.push({k:'relic',n:'Relics',i:'✦'});
    var l0=Tome.list, e0=Tome.entry, s0=Tome.see, h0=Tome.has;
    Tome.list=function(cat){ if(cat!=='relic')return l0.apply(this,arguments); if(!ZECO.RELIC)ZECO.RELIC=ZECO.relics(); return Object.keys(ZECO.RELIC).filter(function(id){ return ITEMS[id]&&!ITEMS[id].trophy; }); };
    Tome.entry=function(cat,id){ if(cat!=='relic')return e0.apply(this,arguments); var E=e0.call(this,'item',id); if(!E)return null; var it=ITEMS[id], F=it.from||'';
      var where=/^binder:/.test(F)?'the captain of the '+TOME_QN[+F.slice(7)]+' Binders':/^alpha:/.test(F)?ZECO.NAMED_ALPHA[+F.slice(6)][0]+', the named Alpha of the '+TOME_QN[+F.slice(6)]:/^castle:/.test(F)?'a castle warden ('+((CASTLE_ISLANDS[F.slice(7)]||{}).name||'')+')':/^sov_/.test(id)?'a "collect them all" set':/ring$/.test(id)?'a realm\'s boss tower':'won, never sold';
      return Object.assign({},E,{sub:'Relic · '+(E.sub||''),hint:'Found: '+where}); };
    Tome.has=function(cat,id){ if(cat==='relic')return h0.call(this,'item',id); return h0.apply(this,arguments); };
    Tome.see=function(cat,id){ var r=s0.apply(this,arguments); if(cat==='item'&&ZECO.isRelic(id))try{ var b=Tome.book(); if(b&&b.relic&&!b.relic[id])b.relic[id]=Date.now(); }catch(e){} return r; }; },0);
})();
