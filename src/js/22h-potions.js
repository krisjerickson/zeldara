// ═══════════════════════════════════════════════════════════════════════
// ║ 22h-potions.js — round 61: THE POTIONS, REBALANCED AND EXPANDED (Kris's Lab picks, Oct 16 — the Potions tab).
// ║ Kris (round 60): "all the potions need to be rebalanced. some are not the right price, and we need to expand them and allow for additional
// ║ effects, like elemental effects, slow added to spells and other interesting things". His ☆ picks, all built here:
// ║  · Healing by realm (pr_heal_tiers): Minor 20 HP · 15 g / Healing 45 · 35 g / Greater 90 · 75 g / Superior 150 · 130 g. The old healing
// ║    potions are retired from the shelves (any in your pack still work; drops and chests now give the new ones).
// ║  · Elixir (half your health, cures poison/burning/slow) and Grand Elixir (full, then 4 HP/s for 10 s) — pr_elixir; Troll-blood Tonic — pr_regen.
// ║  · Mana Draught / Greater Mana Draught, Arcane Surge (spells cost nothing for 10 s), Runic Tea (cooldowns −30 % for 2 min).
// ║  · Six spell oils (one at a time, 2 min): Frostbite slows, Cinder burns, Nightshade poisons (stacks to 3), Thunderhead arcs, Bramble roots,
// ║    Gloam drains. · Weapon coatings (2 min): one per element (+15 %, the element counts for the wheel) and the Silvered Edge (every 5th hit
// ║    strips armour and front-guard for 4 s). · Flasks to THROW — hold P: fire pool, frost (freeze 1.5 s), smoke pellet, thunder (stun, chains to 3).
// ║  · Boons: Giant's Draught (+25 % max health, 3 min), Gilded Tonic (+30 % gold, 5 min), Scholar's Tea (+30 % XP, 5 min), Phoenix Draught
// ║    (fall within 10 min → rise at 40 %). · Wards: +45 % for 3 min (60–80 g) and the Prismatic Ward (+20 % to all six, 180 g).
// ║ The bag: healing and mana share the old five-potion bag; everything else is up to five of each kind (ZPOT.bag).
// ║ Icons: ic_<id> on the round 61 icon sheet (07zt2, wave 63) — the emoji until painted.
// ═══════════════════════════════════════════════════════════════════════
var ZPOT={
  OILS:{frost:['Frostbite Oil','❄','#9fe0ff','slows'],ember:['Cinder Oil','🔥','#ff9040','burns'],venom:['Nightshade Oil','☠','#9fff70','poisons'],storm:['Thunderhead Oil','⚡','#ffe860','arcs'],root:['Bramble Oil','🌿','#80d060','roots'],shade:['Gloam Oil','🌑','#c090ff','drains']},
  GROUPS:{heal:'❤ Healing',mana:'💧 Mana',oil:'🧪 Spell oils — your spells gain an effect for 2 minutes (one oil at a time)',coat:'🗡 Weapon coatings — melee and arrows, 2 minutes',flask:'💣 Flasks — hold P to throw the one you ready',boon:'✨ Boons',ward:'🛡 Element wards — 3 minutes',tonic:'🧪 Tonics'},
  _lg:null,
  head:function(it){ if(!it){ ZPOT._lg=null; return ''; } var g=it.pot&&it.pot.g||(it.ward?'ward':null); if(!g||g===ZPOT._lg)return ''; ZPOT._lg=g;
    return '<div style="margin:12px 0 4px;padding-bottom:3px;border-bottom:1px solid rgba(255,255,255,.12);font-weight:700;font-size:13px;color:#e8d8b0">'+(ZPOT.GROUPS[g]||g)+'</div>'; },
  // oils, coatings, flasks, boons and wards: up to five of each kind (healing and mana share the old bag of five)
  bag:function(it){ if(!it)return false; if(it.ward)return true; var k=it.pot&&it.pot.g; return k==='oil'||k==='coat'||k==='flask'||k==='boon'||k==='ward'; },
  ps:function(){ try{ var ws=game.scene.getScene('World'); return ws&&ws.playerState; }catch(e){ return null; } },
  on:function(ps,k){ return typeof _heroBuffActive==='function'&&_heroBuffActive(ps,k); },
  left:function(ps,k){ return ps&&ps.buffs&&ps.buffs[k]?Math.max(0,ps.buffs[k]-Date.now()):0; },
  // ── what drinking does ──
  drink:function(ps,item){ var P=item.pot, B=function(k,ms){ _heroBuffApply(ps,k,ms); }, fx='', ws=game.scene.getScene('World');
    switch(P.k){
      case 'heal': ps.hp=Math.min(ps.maxHp,ps.hp+(item.heal||0)); fx='+'+item.heal+' HP'; break;
      case 'elixir': var h=Math.round(ps.maxHp*0.5); ps.hp=Math.min(ps.maxHp,ps.hp+h); ZHit.useFx(ps,{cure:1}); fx='+'+h+' HP · poison, burning and slow ended'; break;
      case 'grand': ps.hp=ps.maxHp; ZHit.useFx(ps,{cure:1}); B('zp_grand',10000); fx='full health, then 4 HP a second for 10 s'; break;
      case 'troll': B('zp_troll',12000); fx='5% of your health a second for 12 s'; break;
      case 'mana': var mm=ps.maxMana||50, add=P.all?mm:40; ps.mana=Math.min(mm,(ps.mana||0)+add); fx=P.all?'mana full':'+40 mana'; break;
      case 'surge': B('zp_surge',10000); fx='spells cost no mana for 10 s'; break;
      case 'tea': B('zp_tea',120000); fx='spell cooldowns −30% for 2 min'; break;
      case 'oil': ps.zpOil=P.e; B('zp_oil',120000); fx='your spells '+ZPOT.OILS[P.e][3]+' for 2 min'; break;
      case 'coat': if(P.e==='silver'){ B('zp_silver',120000); ps.zpSilverN=0; fx='every 5th hit breaks armour for 2 min'; } else { ps.zpCoat=P.e; B('zp_coat',120000); fx='your blade and arrows strike in '+ZEL.E[P.e].n.toLowerCase()+' (+15%) for 2 min'; } break;
      case 'giant': if(!ZPOT.on(ps,'zp_giant')||!ps.zpGiant){ var g=Math.round(ps.maxHp*0.25); ps.zpGiant=g; ps.maxHp+=g; ps.hp+=g; } B('zp_giant',180000); fx='+25% max health for 3 min'; break;
      case 'gold': B('zp_gold',300000); fx='+30% gold for 5 min'; break;
      case 'xp': B('zp_xp',300000); fx='+30% experience for 5 min'; break;
      case 'phoenix': B('zp_phoenix',600000); fx='if you fall in the next 10 min, you rise again'; break;
      case 'flask': ps.quick=ps.quick||{}; ps.quick.flask=item._k; showNotif(item.icon+' '+item.name+' readied — hold P to throw it','#ffd090'); return false;
    }
    if(typeof ZSFX!=='undefined')try{ ZSFX.play('potion'); }catch(e){}
    showNotif(item.icon+' '+item.name+' — '+fx,'#44ffaa'); if(ws&&ws._emitUI)ws._emitUI(); ZPOT.hud(); return true; },
  // ── the hooks (04j ZHit) ──
  coatEls:function(els){ var ps=ZPOT.ps(); if(!ps||!ps.zpCoat||!ZPOT.on(ps,'zp_coat')||els==='all')return els; var e=ps.zpCoat; if(els.indexOf(e)>=0)return els; return [e].concat(els); },
  mult:function(kind,o){ var ps=ZPOT.ps(); if(!ps||(o&&o.pure))return 1; if((kind==='melee'||kind==='ranged'||kind==='skill')&&ps.zpCoat&&ZPOT.on(ps,'zp_coat'))return 1.15; return 1; },
  onHit:function(scene,mon,d,kind,o){ var ps=ZPOT.ps(); if(!ps||!mon||mon.dead||ZPOT._in||(o&&o.pure))return; var now=Date.now(), boss=!!(mon.isBoss||(mon.def&&mon.def.boss));
    if((kind==='melee'||kind==='ranged'||kind==='skill')&&ZPOT.on(ps,'zp_silver')){ ps.zpSilverN=(ps.zpSilverN||0)+1; if(ps.zpSilverN>=5){ ps.zpSilverN=0; mon._zpStrip=now+4000; try{ _heroFloat(scene,mon.x,mon.y-((mon.def&&mon.def.r)||10)-30,'armour broken!','#e8f0ff'); }catch(e){} } }
    if(kind!=='spell'||!ps.zpOil||!ZPOT.on(ps,'zp_oil'))return; if(mon._zpOilT&&now-mon._zpOilT<350)return; mon._zpOilT=now; ZPOT._in=true;
    try{ var e=ps.zpOil;
      if(e==='frost')_heroSlow(scene,mon,2,0.6);
      else if(e==='ember')_heroBurn(mon,3,Math.max(1,Math.round(d*0.15)));
      else if(e==='venom'){ var L=mon._zpPois=(mon._zpPois||[]).filter(function(p){ return p.t>0; }); if(L.length>=3)L.shift(); L.push({t:4,dps:Math.max(1,Math.round(d*0.12)),k:0}); }
      else if(e==='storm'){ var ml=scene.worldMonsters||scene.monsters||scene._mons||[]; _heroChain(scene,mon,1,Math.max(1,Math.round(d*0.5)),ml); }
      else if(e==='root'){ if(boss)_heroSlow(scene,mon,1,0.6); else _heroHold(scene,mon,1); }
      else if(e==='shade'){ var hh=Math.max(1,Math.round(d*0.10)); if(ps.hp>0)ps.hp=Math.min(ps.maxHp,ps.hp+hh); }
    }catch(err){} ZPOT._in=false; },
  g:function(n){ var ps=ZPOT.ps(); return ps&&ZPOT.on(ps,'zp_gold')?Math.round(n*1.3):n; },
  x:function(n){ var ps=ZPOT.ps(); return ps&&ZPOT.on(ps,'zp_xp')?Math.round(n*1.3):n; },
  // ── flasks (hold P) ──
  flasks:function(ps){ var seen={}, out=[]; (ps.inventory||[]).forEach(function(id){ var I=ITEMS[id]; if(I&&I.pot&&I.pot.k==='flask'&&!seen[id]){ seen[id]=1; out.push(id); } }); return out; },
  curFlask:function(ps){ ps.quick=ps.quick||{}; var id=ps.quick.flask; if(id&&(ps.inventory||[]).indexOf(id)>=0)return id; var L=ZPOT.flasks(ps); ps.quick.flask=L[0]||null; return ps.quick.flask; },
  _pd:null,
  keyDown:function(e,sc){ var ps=ZPOT.ps(); if(!ps)return false; if(ZPOT._pd){ return true; } if(e&&e.repeat)return true; if(!ZPOT.curFlask(ps))return false;
    var D=ZPOT._pd={t:Date.now(),sc:sc,fired:false}; D.tm=setTimeout(function(){ if(ZPOT._pd!==D)return; D.fired=true; ZPOT.throwFlask(sc); },350); return true; },
  keyUp:function(){ var D=ZPOT._pd; if(!D)return; ZPOT._pd=null; clearTimeout(D.tm); if(!D.fired&&typeof ZQUICK!=='undefined')ZQUICK.use('potion'); },
  throwFlask:function(sc){ var ps=ZPOT.ps(); if(!ps||!sc||!sc.add)return false; var id=ZPOT.curFlask(ps); if(!id)return false; var I=ITEMS[id], c=_heroCtx(sc), a=_heroDirAngle(c.dir), tx=c.x+Math.cos(a)*120, ty=c.y+Math.sin(a)*120, f=I.pot.f;
    if(f==='smoke'){ tx=c.x; ty=c.y; }
    var j=ps.inventory.indexOf(id); if(j>=0)ps.inventory.splice(j,1); ZPOT.curFlask(ps);
    var col={fire:0xff7030,frost:0x9fe8ff,smoke:0x9a9aa8,thunder:0xffe860}[f], b=sc.add.circle(c.x,c.y-10,5,col,1).setDepth(9000);
    sc.tweens.add({targets:b,x:tx,y:ty,duration:f==='smoke'?60:360,ease:'Quad.out',onComplete:function(){ b.destroy(); ZPOT.burst(sc,f,tx,ty,ps); }});
    showNotif(I.icon+' '+I.name+'!','#ffd090'); var ws=game.scene.getScene('World'); if(ws&&ws._emitUI)ws._emitUI(); return true; },
  near:function(sc,x,y,r){ var c=_heroCtx(sc); return (c.monsters||[]).filter(function(m){ return m&&!m.dead&&Math.hypot(m.x-x,m.y-y)<=r; }); },
  burst:function(sc,f,x,y,ps){ var lv=ps.level||1, boss=function(m){ return !!(m.isBoss||(m.def&&m.def.boss)); };
    var ring=sc.add.circle(x,y,12,{fire:0xff6020,frost:0xbff0ff,smoke:0x8a8a98,thunder:0xfff080}[f],0.5).setDepth(8990).setBlendMode(f==='smoke'?Phaser.BlendModes.NORMAL:Phaser.BlendModes.ADD);
    sc.tweens.add({targets:ring,scale:f==='smoke'?14:6,alpha:0,duration:f==='smoke'?3000:600,onComplete:function(){ ring.destroy(); }});
    if(f==='fire'){ var pool=sc.add.circle(x,y,52,0xff5010,0.28).setDepth(-2).setBlendMode(Phaser.BlendModes.ADD), n=0, dps=Math.max(4,Math.round(5+lv*1.4));
      sc.tweens.add({targets:pool,alpha:{from:0.18,to:0.36},duration:300,yoyo:true,repeat:-1});
      var tick=function(){ if(!pool.scene)return; ZPOT.near(sc,x,y,56).forEach(function(m){ _heroBurn(m,1.5,dps); }); if(++n<8)sc.time.delayedCall(500,tick); else sc.tweens.add({targets:pool,alpha:0,duration:400,onComplete:function(){ pool.destroy(); }}); }; tick(); }
    else if(f==='frost'){ ZPOT.near(sc,x,y,72).forEach(function(m){ if(boss(m))_heroSlow(sc,m,2.5,0.5); else { _heroHold(sc,m,1.5); _heroSlow(sc,m,1.5,0.4); } try{ _heroFloat(sc,m.x,m.y-24,boss(m)?'chilled':'frozen!','#bff0ff'); }catch(e){} }); }
    else if(f==='smoke'){ var until=Date.now()+3000; ZPOT.near(sc,x,y,170).forEach(function(m){ m._zpBlind=until; if(m._m)m._m.aggro=false; if(m.state)m.state='wander'; });
      ZPOT._blind={sc:sc,until:until}; var hero=sc.player&&sc.player.cont; if(hero){ hero.setAlpha(0.45); sc.time.delayedCall(3000,function(){ if(hero.scene)hero.setAlpha(1); }); } }
    else if(f==='thunder'){ var L=ZPOT.near(sc,x,y,150).sort(function(a,b){ return Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y); }).slice(0,3), px=x, py=y-40, dmg=Math.round(10+lv*2.2);
      L.forEach(function(m){ _heroBolt(sc,px,py,m.x,m.y,0xffff66); px=m.x; py=m.y; ZPOT._in=true; try{ _heroHitMonster(sc,m,dmg,{pure:true,col:'#ffff88',suffix:'⚡'}); }catch(e){} ZPOT._in=false; if(!boss(m))_heroHold(sc,m,1); }); }
    if(sc.cameras&&sc.cameras.main)sc.cameras.main.shake(f==='thunder'?220:120,0.004); },
  // ── every frame: regeneration, poison from Nightshade, the smoke, Giant's Draught running out, the effect strip ──
  tick:function(){ var now=Date.now(), dt=Math.min(1,Math.max(0,(now-(ZPOT._lt||now))/1000)); ZPOT._lt=now; var ps=ZPOT.ps(); if(!ps||(typeof _PAUSE!=='undefined'&&_PAUSE.active))return;      // real time (a slow frame must not lose healing) var sc=typeof _activePlayScene==='function'?_activePlayScene(false):null;
    if(ps.hp>0&&ps.hp<ps.maxHp){ var r=0; if(ZPOT.on(ps,'zp_troll'))r+=ps.maxHp*0.05; if(ZPOT.on(ps,'zp_grand'))r+=4; if(r){ ps._zpAcc=(ps._zpAcc||0)+r*dt; if(ps._zpAcc>=1){ var w=Math.floor(ps._zpAcc); ps._zpAcc-=w; ps.hp=Math.min(ps.maxHp,ps.hp+w); } } }
    if(ps.zpGiant&&!ZPOT.on(ps,'zp_giant')){ ps.maxHp=Math.max(1,ps.maxHp-ps.zpGiant); ps.hp=Math.min(ps.hp,ps.maxHp); ps.zpGiant=0; showNotif('Giant\'s Draught wears off','#c8c0b0'); }
    if(sc){ var c=_heroCtx(sc); (c.monsters||[]).forEach(function(m){ if(m.dead)return; if(m._zpPois&&m._zpPois.length){ var sum=0; m._zpPois.forEach(function(p){ if(p.t>0){ p.t-=dt; sum+=p.dps; } }); m._zpPois=m._zpPois.filter(function(p){ return p.t>0; }); m._zpPT=(m._zpPT||0)+dt;
          if(m._zpPT>=0.5&&sum>0){ m._zpPT=0; ZPOT._in=true; try{ _heroHitMonster(sc,m,sum*0.5,{pure:true,col:'#9fff70',suffix:'☠'}); }catch(e){} ZPOT._in=false; } }
        if(m._zpBlind&&Date.now()<m._zpBlind){ if(m._m)m._m.aggro=false; if(m.state&&m.state!=='wander')m.state='wander'; } }); }
    ZPOT._ht=(ZPOT._ht||0)+dt; if(ZPOT._ht>0.5){ ZPOT._ht=0; ZPOT.hud(); } },
  // a small strip under the health bars: what is working and for how long
  LABEL:{zp_oil:function(ps){ var O=ZPOT.OILS[ps.zpOil]; return O?O[1]+' '+O[0]:''; },zp_coat:function(ps){ return ps.zpCoat&&ZEL.E[ps.zpCoat]?'🗡 '+ZEL.E[ps.zpCoat].n+' coating':''; },zp_silver:'🗡 Silvered Edge',zp_surge:'💠 Arcane Surge',zp_tea:'🍵 Runic Tea',zp_troll:'❤ Troll-blood',zp_grand:'❤ Grand Elixir',zp_giant:'🗿 Giant\'s Draught',zp_gold:'🪙 Gilded Tonic',zp_xp:'📜 Scholar\'s Tea',zp_phoenix:'🔥 Phoenix',res_all:'🛡 Prismatic Ward'},
  hud:function(){ var ps=ZPOT.ps(); if(typeof document==='undefined')return; var el=document.getElementById('zpot-hud'); var L=[];
    if(ps){ Object.keys(ZPOT.LABEL).forEach(function(k){ if(!ZPOT.on(ps,k))return; var lb=ZPOT.LABEL[k]; lb=typeof lb==='function'?lb(ps):lb; if(lb)L.push([lb,ZPOT.left(ps,k)]); });
      if(typeof ZEL!=='undefined')ZEL.LIST.forEach(function(e){ if(ZPOT.on(ps,'res_'+e))L.push(['🛡 '+ZEL.E[e].n+' ward',ZPOT.left(ps,'res_'+e)]); }); }
    var title=document.getElementById('title-screen'); if(!L.length||(game.scene&&game.scene.isActive('Title'))){ if(el)el.style.display='none'; return; }
    if(!el){ el=document.createElement('div'); el.id='zpot-hud'; el.style.cssText='position:fixed;left:12px;top:116px;z-index:40;display:flex;flex-direction:column;gap:3px;pointer-events:none;font:600 12px "Segoe UI",sans-serif'; document.body.appendChild(el); }
    el.style.display='flex'; var t=function(ms){ var s=Math.ceil(ms/1000); return Math.floor(s/60)+':'+('0'+s%60).slice(-2); };
    var h=L.map(function(x){ return '<span style="background:rgba(10,16,24,.78);border:1px solid rgba(255,220,150,.3);border-radius:6px;padding:2px 7px;color:#f4ecd8">'+x[0]+' <b style="color:#ffd860">'+t(x[1])+'</b></span>'; }).join('');
    if(el._h!==h){ el._h=h; el.innerHTML=h; } }
};

// ── the potions themselves ──
(function(){ if(typeof ITEMS==='undefined')return;
  var add=function(id,o){ o.slot=o.slot||'use'; o.sell=o.sell||Math.max(2,Math.round(o.buy*0.35)); ITEMS[id]=o; };
  var P=function(id,name,icon,g,k,buy,sec,desc,pic,ex){ var o=Object.assign({name:name,icon:icon,buy:buy,secReq:sec,desc:desc,pic:pic,pot:Object.assign({g:g,k:k},ex||{})},{}); if(ex&&ex.heal){ o.heal=ex.heal; delete o.pot.heal; } add(id,o); };
  P('pot_heal1','Minor Healing','🧪','heal','heal',15,1,'Heals 20 HP','a small round bottle of bright red potion with a cork',{heal:20});
  P('pot_heal2','Healing Potion','🧪','heal','heal',35,2,'Heals 45 HP','a round bottle of deep red potion with a cork and a red wax seal',{heal:45});
  P('pot_heal3','Greater Healing','🧪','heal','heal',75,3,'Heals 90 HP','a tall faceted bottle of glowing crimson potion with a silver cap',{heal:90});
  P('pot_heal4','Superior Healing','🧪','heal','heal',130,4,'Heals 150 HP','a big heart-shaped bottle of shining ruby potion with a gold stopper',{heal:150});
  P('pot_elixir','Elixir','⚗️','heal','elixir',140,3,'Heals half your health and cures poison, burning and slow','a pear-shaped flask of swirling rose-and-gold liquid with a leaf on the stopper');
  P('pot_grand','Grand Elixir','⚗️','heal','grand',380,4,'Full health, then 4 HP a second for 10 s; cures poison, burning and slow','an ornate gold-caged flask of radiant pink-gold liquid with tiny stars in it');
  P('pot_troll','Troll-blood Tonic','🧪','heal','troll',45,2,'Heals 5% of your max health a second for 12 s (60% in all)','a squat stone jug of thick dark-green brew with a troll-tusk stopper');
  P('pot_mana','Mana Draught','💧','mana','mana',25,1,'Restores 40 mana','a small round bottle of bright blue potion with a cork');
  P('pot_mana2','Greater Mana Draught','💧','mana','mana',90,3,'Restores all your mana','a tall faceted bottle of glowing deep-blue potion with a silver cap',{all:true});
  P('pot_surge','Arcane Surge','💠','mana','surge',120,3,'For 10 s your spells cost no mana','a crystal vial of crackling violet-blue light with a rune on it');
  P('pot_tea','Runic Tea','🍵','mana','tea',70,2,'Spell cooldowns 30% shorter for 2 minutes','a little clay teapot with glowing teal runes and steam');
  [['frost','Frostbite Oil','❄',55,2,'Your spells also slow what they hit (−40% speed, 2 s) — 2 minutes','a slim vial of icy pale-blue oil with frost on the glass'],
   ['ember','Cinder Oil','🔥',55,1,'Your spells also set foes burning for 3 s — 2 minutes','a slim vial of glowing orange oil with a tiny flame inside'],
   ['venom','Nightshade Oil','☠',60,2,'Your spells also poison (4 s, stacks to 3) — 2 minutes','a slim vial of dark purple-green oil with a nightshade flower on the label'],
   ['storm','Thunderhead Oil','⚡',80,3,'Your spells also arc to one more foe for half damage — 2 minutes','a slim vial of yellow oil with a little lightning bolt crackling inside'],
   ['root','Bramble Oil','🌿',65,1,'Your spells also root small foes for 1 s (bosses: a short slow) — 2 minutes','a slim vial of green oil wrapped in a thorny bramble'],
   ['shade','Gloam Oil','🌑',90,4,'10% of your spell damage heals you — 2 minutes','a slim vial of black-violet oil with a pale glow inside']].forEach(function(q){ P('oil_'+q[0],q[1],q[2],'oil','oil',q[3],q[4],q[5],q[6],{e:q[0]}); });
  [['fire','Fire Coating','🔥',45,1,'a small tin of glowing orange blade-paste with a flame mark'],['grass','Grass Coating','🌿',45,1,'a small tin of green blade-paste with a leaf mark'],
   ['water','Water Coating','🌊',55,2,'a small tin of blue blade-paste with a wave mark'],['earth','Earth Coating','🪨',55,2,'a small tin of brown-amber blade-paste with a rock mark'],
   ['storm','Storm Coating','⚡',65,3,'a small tin of violet blade-paste with a lightning mark'],['shadow','Shadow Coating','🌑',70,4,'a small tin of black-purple blade-paste with a crescent mark']].forEach(function(q){
    P('coat_'+q[0],q[1],q[2],'coat','coat',q[3],q[4],'Your melee and arrows strike in '+q[0]+' (+15%, its weakness rules) — 2 minutes',q[5],{e:q[0]}); });
  P('coat_silver','Silvered Edge','🗡','coat','coat',85,3,'Every 5th hit strips a foe\'s armour and front-guard for 4 s — 2 minutes','a small tin of shining silver blade-paste with a whetstone',{e:'silver'});
  P('flask_fire','Fire Flask','🔥','flask','flask',30,1,'Thrown (hold P): a pool of fire that burns for 4 s','a round glass grenade-flask of orange fire with a burning rag fuse',{f:'fire'});
  P('flask_frost','Frost Flask','❄','flask','flask',45,1,'Thrown (hold P): freezes everything in a circle for 1.5 s (bosses slowed)','a round glass flask of swirling white-blue frost with ice crystals on it',{f:'frost'});
  P('flask_smoke','Smoke Pellet','💨','flask','flask',25,1,'Thrown (hold P): the monsters near you lose you for 3 s','a small grey clay ball with a short fuse, wisps of smoke',{f:'smoke'});
  P('flask_thunder','Thunder Flask','⚡','flask','flask',55,3,'Thrown (hold P): lightning stuns small foes 1 s and chains to three','a round glass flask with a crackling yellow storm cloud inside',{f:'thunder'});
  P('boon_giant','Giant\'s Draught','🗿','boon','giant',90,3,'+25% max health for 3 minutes','a huge stone tankard of frothy brown brew with a giant\'s fist on it');
  P('boon_gold','Gilded Tonic','🪙','boon','gold',75,1,'+30% gold from monsters and chests for 5 minutes','a small bottle of shimmering gold liquid with a coin for a stopper');
  P('boon_xp','Scholar\'s Tea','📜','boon','xp',75,1,'+30% experience for 5 minutes','a porcelain cup of pale tea on a little open book');
  P('boon_phoenix','Phoenix Draught','🔥','boon','phoenix',450,4,'If you fall in the next 10 minutes, you rise again at 40% health','a tall flask of liquid fire with a phoenix feather in the stopper');
  // the wards: stronger and longer, and the Prismatic Ward; moved to the end so the shop shows them together
  var W={water:[60,1],grass:[60,1],fire:[70,2],earth:[70,2],storm:[80,3],shadow:[80,3]};
  Object.keys(W).forEach(function(e){ var k='ward_'+e, o=ITEMS[k]; if(!o)return; delete ITEMS[k]; o.buy=W[e][0]; o.secReq=W[e][1]; o.sell=Math.round(o.buy*0.3); o.desc='+45% '+e+' resistance for 3 minutes'; o.pot={g:'ward',k:'ward'}; ITEMS[k]=o; });
  add('ward_prism',{name:'Prismatic Ward',icon:'🌈',heal:5,buy:180,secReq:4,ward:'all',desc:'+20% resistance to all six elements for 3 minutes',pic:'a six-sided crystal bottle with a band of all six element colours',pot:{g:'ward',k:'ward'}});
  // the tonics stay; grouped after the wards
  ['strength_tonic','speed_tonic','defense_tonic'].forEach(function(k){ var o=ITEMS[k]; if(!o)return; delete ITEMS[k]; o.pot=null; o._tonic=1; ITEMS[k]=o; });
  // the old healing potions: off the shelves (any you carry still work)
  ['potion','elixir','potion_a1','potion_a2','potion_a3','potion_a4','minor_potion','antidote','mega_potion','life_flask','grand_elixir'].forEach(function(k){ if(ITEMS[k]){ ITEMS[k].buy=0; ITEMS[k].old=1; } });
  Object.keys(ITEMS).forEach(function(k){ if(ITEMS[k]&&ITEMS[k].pot)ITEMS[k]._k=ITEMS[k]._k||k; });
  ZPOT.OLD={potion:'pot_heal1',minor_potion:'pot_heal1',potion_a1:'pot_heal1',potion_a2:'pot_heal2',potion_a3:'pot_heal3',potion_a4:'pot_heal4',mega_potion:'pot_heal3',life_flask:'pot_heal2',antidote:'pot_elixir'};
})();
// the tonics' header in the shop
(function(){ if(typeof ZPOT==='undefined')return; var h0=ZPOT.head; ZPOT.head=function(it){ if(it&&it._tonic&&ZPOT._lg!=='tonic'){ ZPOT._lg='tonic'; return '<div style="margin:12px 0 4px;padding-bottom:3px;border-bottom:1px solid rgba(255,255,255,.12);font-weight:700;font-size:13px;color:#e8d8b0">'+ZPOT.GROUPS.tonic+'</div>'; } return h0(it); }; })();

// ── wiring: drinking from the pack and the P key, the quick-use row, spells (Arcane Surge, Runic Tea), the Phoenix ──
(function(){ if(typeof window==='undefined')return;
  var u0=window._useItem; if(u0)window._useItem=function(idx){ var ws=game.scene.getScene('World'); if(!ws)return; var ps=ws.playerState, id=ps.inventory[idx], it=ITEMS[id];
    if(!it||!it.pot||it.pot.k==='ward')return u0.apply(this,arguments);
    if((it.pot.g==='heal')&&typeof _inBossRush==='function'&&_inBossRush()){ showNotif('🚫 No healing in the boss rush!','#ff4444'); return; }
    if(ZPOT.drink(ps,Object.assign({_k:id},it))!==false)ps.inventory.splice(idx,1); if(typeof updateInventoryModal==='function')updateInventoryModal(ps); if(ws._emitUI)ws._emitUI(); };
  if(typeof ZQUICK!=='undefined'){
    ZQUICK.isPotion=function(id){ var I=ITEMS[id]; return !!(I&&I.slot==='use'&&!(I.pot&&I.pot.k==='flask')); };
    var cur0=ZQUICK.cur; ZQUICK.cur=function(ps,kind){ if(kind!=='potion')return cur0.apply(this,arguments); ps.quick=ps.quick||{}; var id=ps.quick.potion; if(id&&ZQUICK.count(ps,id)>0&&ZQUICK.isPotion(id))return id;
      var mh=ps.maxHp||100, val=function(k){ var I=ITEMS[k], p=I.pot; return p&&p.k==='elixir'?mh*0.5:p&&p.k==='grand'?mh:(p&&p.g!=='heal'?-1:(I.heal||0)); };
      var L=ZQUICK.list(ps,'potion').sort(function(a,b){ return val(b)-val(a); }); id=L[0]||null; ps.quick.potion=id; return id; };
    var use0=ZQUICK.use; ZQUICK.use=function(kind){ var ws=ZQUICK.ws(), ps=ws&&ws.playerState; if(kind==='potion'&&ps){ var id=ZQUICK.cur(ps,'potion'), I=id&&ITEMS[id]; if(I&&I.pot&&I.pot.k!=='ward'){ window._useItem(ps.inventory.indexOf(id)); ZQUICK.cur(ps,'potion'); ZQUICK.bar(); return; } } return use0.apply(this,arguments); };
    var pan0=ZQUICK.panel; ZQUICK.panel=function(ps){ var h=pan0.apply(this,arguments), F=ZPOT.flasks(ps); if(!F.length)return h; var cur=ZPOT.curFlask(ps);
      var sel='<label style="display:inline-flex;align-items:center;gap:6px;margin-right:14px;font-size:12px;color:#cfe">Hold P — throw<select onchange="ZQUICK.setQ(\'flask\',this.value)" style="background:#10202a;color:#e8f6ff;border:1px solid rgba(159,232,255,.35);border-radius:5px;padding:2px 4px;font-size:12px">'+F.map(function(id){ return '<option value="'+id+'"'+(id===cur?' selected':'')+'>'+ITEMS[id].icon+' '+ITEMS[id].name+' ×'+ZQUICK.count(ps,id)+'</option>'; }).join('')+'</select></label>';
      return h.replace(/<\/div>$/,sel+'</div>'); }; }
  document.addEventListener('keyup',function(e){ if((e.key||'').toLowerCase()==='p')ZPOT.keyUp(); });
  window.addEventListener('blur',function(){ if(ZPOT._pd){ clearTimeout(ZPOT._pd.tm); ZPOT._pd=null; } });
  // spells: Arcane Surge (no mana) and Runic Tea (−30 % cooldown), in the world and everywhere else
  var free=function(ps,f,self,args){ var m=ps.mana; ps.mana=1e6; try{ return f.apply(self,args); } finally{ ps.mana=m; } };
  if(typeof _heroCastSpell==='function'){ var c0=_heroCastSpell; _heroCastSpell=function(scene){ var ps=ZPOT.ps(); if(!ps)return c0.apply(this,arguments); var before=_heroSpellCdUntil, now=Date.now(), r=ZPOT.on(ps,'zp_surge')?free(ps,c0,this,arguments):c0.apply(this,arguments);
      if(_heroSpellCdUntil!==before&&ZPOT.on(ps,'zp_tea'))_heroSpellCdUntil=now+(_heroSpellCdUntil-now)*0.7; return r; }; }
  if(typeof WorldScene!=='undefined'&&WorldScene.prototype._castSpell){ var w0=WorldScene.prototype._castSpell; WorldScene.prototype._castSpell=function(){ var ps=this.playerState, before=this._spellCd, r=ZPOT.on(ps,'zp_surge')?free(ps,w0,this,arguments):w0.apply(this,arguments);
      if(this._spellCd!==before&&this._spellCd>0&&ZPOT.on(ps,'zp_tea'))this._spellCd*=0.7; return r; }; }
  // the Phoenix Draught: you fall — and rise again at 40 %
  var rise=function(scene,ps){ if(!ps||!ZPOT.on(ps,'zp_phoenix'))return false; delete ps.buffs.zp_phoenix; ps.hp=Math.max(1,Math.round(ps.maxHp*0.4));
    try{ var c=_heroCtx(scene), f=scene.add.circle(c.x,c.y,20,0xffa030,0.8).setDepth(9500).setBlendMode(Phaser.BlendModes.ADD); scene.tweens.add({targets:f,scale:8,alpha:0,duration:900,onComplete:function(){ f.destroy(); }}); scene.cameras.main.flash(500,255,180,80); }catch(e){}
    showNotif('🔥 The Phoenix Draught burns in you — you rise again!','#ffb040'); ZPOT.hud(); return true; };
  if(typeof _heroDied==='function'){ var d0=_heroDied; _heroDied=function(scene){ var ps=ZPOT.ps(); if(ps&&ps.hp<=0&&rise(scene,ps)){ if(scene)scene._playerDead=false; return; } return d0.apply(this,arguments); }; }
  if(typeof WorldScene!=='undefined'&&WorldScene.prototype._worldPlayerDied){ var wd0=WorldScene.prototype._worldPlayerDied; WorldScene.prototype._worldPlayerDied=function(){ if(!this._dying&&this.playerState&&this.playerState.hp<=0&&rise(this,this.playerState))return; return wd0.apply(this,arguments); }; }
  if(typeof game!=='undefined'&&game.events)game.events.on('poststep',function(t,d){ try{ ZPOT.tick(); }catch(e){} });
})();
