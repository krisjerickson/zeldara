// ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
// ║ 09s3-aim129.js — round 129: AIMING, MADE SIMPLE (Kris picked, in the Lab's aim tab: soft lock-on ✓ and hold-to-charge ✓ — "i like    ║
// ║ holding to gain power. think this can also work with option 2, let's see if we can combine"; the target rule — "have all of these   ║
// ║ options available to set your default in the controls of the game"; and the crossbow, option A — "pierce").                       ║
// ║  · A gold ring always sits on the best foe ahead of the hero (in front, in range, in sight), chosen by the target rule.          ║
// ║  · Ctrl (bow) or X (spell): a tap shoots or casts at the ringed foe at once. Hold to gather power — ×1.5 at 0.4 s, ×2 at 0.8 s     ║
// ║    (a charged spell costs a quarter / a half more mana). While holding, press a direction: the ring jumps to the best foe that    ║
// ║    way, and the hero stands still. Let go to fire. (The old "X twice" rune circle and its steering are gone.)                     ║
// ║  · The target rule (❓ Controls): ⚠ most dangerous (the default) · 💪 strongest · 🩸 weakest · 📍 nearest · 🔁 the last one I hit.  ║
// ║  · Crossbow (A): one heavy bolt, a 1.2 s reload (02, 22), through every foe in its line, and it breaks plate as well as a guard.  ║
// ║    Darts are dearer and come in smaller bundles; the bow is the quick one.                                                        ║
// ╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
var ZAIM129={ on:true, HALF:0.96, RNG_BOW:340, RNG_SPELL:300, CH1:0.4, CH2:0.8, lock:null, lockSc:null, lockT:0, ring:null, last:null, spellMult:1,
  RULES:[{id:'danger',ic:'⚠️',n:'Most dangerous',t:'bosses, then champions, then foes that shoot, then the rest'},
    {id:'strongest',ic:'💪',n:'Strongest',t:'the foe with the most health left'},
    {id:'weakest',ic:'🩸',n:'Weakest',t:'the foe nearest to falling — finish them off'},
    {id:'nearest',ic:'📍',n:'Nearest',t:'whoever is closest'},
    {id:'last',ic:'🔁',n:'The last one I hit',t:'stay on the foe you are fighting'}],
  ps:function(){ var ws=typeof _heroWS==='function'&&_heroWS(); return ws&&ws.playerState; },
  rule:function(){ var ps=ZAIM129.ps(), r=ps&&ps.aimRule; return ZAIM129.RULES.some(function(R){ return R.id===r; })?r:'danger'; },
  setRule:function(r){ var ps=ZAIM129.ps(); if(!ps)return; ps.aimRule=r; ZAIM129.lock=null; try{ var ws=_heroWS(); if(ws&&ws._save)ws._save(); }catch(e){} ZAIM129.render(); },
  hp:function(m){ return m.hp!=null?m.hp:(m._hp||0); },
  danger:function(m){ if(typeof ZHit!=='undefined'&&ZHit.isBoss&&ZHit.isBoss(m))return /^elite_/.test(String(m.bossKey||''))||(m.def&&m.def.elite)?3:4; if(m.def&&m.def.elite)return 3;
    var k=m.kit||{}, a=(k.atk&&k.atk.name)||'', d=m.def||{}; return (d.ranged||k.ranged||k.shoot||/shoot|spit|bolt|throw|arrow|cast|orb|hurl/.test(a+' '+(d.atk||'')))?2:1; },
  // the best foe within half an angle of `ang`, in range and in sight, by the rule
  pick:function(sc,ang,half,rng,rule){ var c=_heroCtx(sc); if(!c)return null; rule=rule||ZAIM129.rule(); var best=null, bs=-1e9;
    (c.monsters||[]).forEach(function(m){ if(!m||m.dead||ZAIM129.hp(m)<=0)return; var dx=m.x-c.x, dy=m.y-c.y, d=Math.hypot(dx,dy); if(d>rng)return;
      var da=Math.atan2(dy,dx)-ang; while(da>Math.PI)da-=Math.PI*2; while(da<-Math.PI)da+=Math.PI*2; if(Math.abs(da)>half&&d>36)return;
      if(typeof _heroLOS==='function'&&!_heroLOS(sc,c.x,c.y,m.x,m.y))return;
      var s=rule==='nearest'?-d:rule==='strongest'?ZAIM129.hp(m)*10-d*0.01:rule==='weakest'?-ZAIM129.hp(m)*10-d*0.01:rule==='last'?(m===ZAIM129.last?1e6:0)+ZAIM129.danger(m)*1000-d:ZAIM129.danger(m)*1000-d;
      s-=Math.abs(da)*40;      // a little nearer the line you face wins a tie
      if(s>bs){ bs=s; best=m; } });
    return best; },
  facing:function(sc){ var c=_heroCtx(sc); return typeof _isOverworld==='function'&&_isOverworld(sc)&&sc._getAimAngle?sc._getAimAngle():_heroDirAngle(c.dir); },
  armed:function(){ var ps=ZAIM129.ps(); if(!ps||!ps.equip)return ''; var b=ps.equip.rHand&&ITEMS[ps.equip.rHand], t=ps.equip.spell&&ITEMS[ps.equip.spell]; return (b&&b.slot==='rHand'?'b':'')+(t&&t.spellId?'s':''); },
  ok:function(sc){ if(!sc||!sc.sys||!sc.sys.isActive())return false; var key=sc.sys.settings.key; return (typeof _isOverworld==='function'&&_isOverworld(sc))||key==='Dungeon'||key==='Island'; },
  valid:function(sc,m,rng){ if(!m||m.dead||ZAIM129.hp(m)<=0)return false; var c=_heroCtx(sc), d=Math.hypot(m.x-c.x,m.y-c.y); if(d>rng*1.15)return false;
    return typeof _heroLOS!=='function'||_heroLOS(sc,c.x,c.y,m.x,m.y); },
  // the steady lock: keep the foe while it stays fair game; look again every 0.8 s (a clearly better one by the rule takes over)
  update:function(sc,dt){ var A=ZAIM129.armed(), rng=A.indexOf('b')>=0?ZAIM129.RNG_BOW:ZAIM129.RNG_SPELL;
    if(!A||!ZAIM129.ok(sc)){ ZAIM129.lock=null; return; }
    if(ZAIM129.lockSc!==sc){ ZAIM129.lock=null; ZAIM129.lockSc=sc; }
    ZAIM129.lockT-=dt; var busy=ZDRAW.cur||(ZAIM.cur&&ZAIM.cur.chg);
    if(busy)return;      // while charging, only a direction moves the ring (retarget)
    if(!ZAIM129.valid(sc,ZAIM129.lock,rng)||ZAIM129.lockT<=0){ var a=ZAIM129.facing(sc), n=ZAIM129.pick(sc,a,ZAIM129.HALF,rng); if(n||!ZAIM129.valid(sc,ZAIM129.lock,rng))ZAIM129.lock=n; ZAIM129.lockT=0.8; } },
  // a direction pressed while charging: the best foe that way, and the hero holds still
  retarget:function(sc,cur){ var mv=ZAIM.mv||{}, dx=(mv.r?1:0)-(mv.l?1:0), dy=(mv.d?1:0)-(mv.u?1:0); if(!dx&&!dy)return;
    var K=sc.keys||{}, cu=sc.cursors||{}; ['W','A','S','D','UP','DOWN','LEFT','RIGHT'].forEach(function(n){ if(K[n])K[n].isDown=false; }); ['up','down','left','right'].forEach(function(n){ if(cu[n])cu[n].isDown=false; });
    var a=Math.atan2(dy,dx), k=dx+','+dy; if(cur._dk===k)return; cur._dk=k; cur.a=a;
    var A=ZAIM129.armed(), m=ZAIM129.pick(sc,a,1.05,cur.spell?ZAIM129.RNG_SPELL:ZAIM129.RNG_BOW); if(m){ cur.mon=m; ZAIM129.lock=m; } else cur.mon=null; },
  // the gold ring under the locked foe (brighter and fuller as a charge gathers)
  draw:function(sc){ var m=ZAIM129.lock, ch=ZDRAW.cur&&ZDRAW.cur.sc===sc?ZDRAW.cur:ZAIM.cur&&ZAIM.cur.chg&&ZAIM.cur.sc===sc?ZAIM.cur:null; if(ch)m=ch.mon&&!ch.mon.dead?ch.mon:null;
    if(!m||!ZAIM129.ok(sc)){ if(ZAIM129.ring){ try{ ZAIM129.ring.destroy(); }catch(e){} ZAIM129.ring=null; } return; }
    var g=ZAIM129.ring; if(!g||g.scene!==sc||!g.active){ try{ if(g)g.destroy(); }catch(e){} g=ZAIM129.ring=sc.add.graphics().setDepth(18); }
    var r=((m.def&&m.def.r)||10)+8, t=performance.now()/1000, u=ch?Math.min(1,(performance.now()-ch.t0)/1000/ZAIM129.CH2):0, col=u>=1?0xffe066:u>=0.5?0xffd070:0xe8c050;
    g.clear(); g.lineStyle(2+u*2,col,0.75+0.2*Math.sin(t*5)); g.strokeEllipse(m.x,m.y+r*0.55,r*2.2,r*1.0);
    for(var i=0;i<4;i++){ var an=t*1.6+i*Math.PI/2; g.fillStyle(col,0.9); g.fillCircle(m.x+Math.cos(an)*r*1.1,m.y+r*0.55+Math.sin(an)*r*0.5,1.8+u*1.2); }
    if(ch&&u>0){ g.lineStyle(3,col,0.95); g.beginPath(); g.arc(m.x,m.y-r-6,6,-Math.PI/2,-Math.PI/2+u*Math.PI*2,false); g.strokePath(); } },
  tier:function(held){ return held>=ZAIM129.CH2?2:held>=ZAIM129.CH1?1.5:1; },
  // ── the controls box (❓ Controls, under the difficulty) ──
  render:function(){ var el=document.getElementById('zaim-box'); if(!el)return; var ps=ZAIM129.ps(); if(!ps){ el.innerHTML=''; return; } var cur=ZAIM129.rule();
    el.innerHTML='<div class="zdiff-h">Auto-aim — who the gold ring picks</div><div class="zaim-row">'+ZAIM129.RULES.map(function(R){ return '<button type="button" class="zdiff-b'+(R.id===cur?' on':'')+'" data-r="'+R.id+'"><span>'+R.ic+'</span><b>'+R.n+'</b><small>'+R.t+'</small></button>'; }).join('')+'</div>'+
      '<div class="zdiff-t">Tap Ctrl (bow) or X (spell) to shoot the ringed foe. Hold to charge (×1.5, then ×2); press a direction while holding to switch targets.</div>';
    el.querySelectorAll('.zdiff-b').forEach(function(b){ b.onclick=function(){ ZAIM129.setRule(b.dataset.r); }; }); } };

(function(){
  if(typeof ZAIM==='undefined'||typeof ZDRAW==='undefined')return;
  // ── the bow: the draw starts on the ringed foe; a direction while drawing retargets ──
  ZDRAW.start=function(sc,e){ if(e&&e.repeat)return; if(!ZDRAW.on){ ZDRAW.shoot(sc,1,ZAIM129.lock); return; }
    if(ZDRAW.cur){ var o=ZDRAW.cur; if(o.sc===sc&&sc.sys.isActive()&&performance.now()-o.t0<3000)return; ZDRAW.drop(); }
    if(!ZDRAW.why(sc))return;
    try{ ZAIM129.update(sc,1); var a=ZAIM129.facing(sc), mon=ZAIM129.lock&&!ZAIM129.lock.dead?ZAIM129.lock:null;
      ZDRAW.cur={sc:sc,t0:performance.now(),mon:mon,a:a,g:sc.add.graphics().setDepth(18),im:null,_dk:null}; }
    catch(err){ ZDRAW.drop(); ZDRAW.shoot(sc,1); } };
  var dt0=ZDRAW.tick; ZDRAW.tick=function(sc,dt){ var C=ZDRAW.cur; if(C&&C.sc===sc){ ZAIM129.retarget(sc,C); if(C.g)C.g.clear(); }
    /* the ring does the showing now; the old reticle is only drawn when nothing is locked (a shot into the open) */
    if(C&&C.sc===sc&&C.mon){ var fl=ZDRAW.cur; ZDRAW.cur=null; try{ dt0.call(ZDRAW,sc,dt); } finally { ZDRAW.cur=fl; } } else dt0.call(ZDRAW,sc,dt); };
  // ── spells: tap casts at the ring; hold charges ──
  ZAIM.press=function(sc,e){ if(e&&e.repeat)return; if(!ZAIM.on||!ZAIM.ok(sc)){ _heroCastSpell(sc); return; }
    if(ZAIM.cur&&ZAIM.cur.chg)return;
    var S0=ZAIM.spell(), ps0=ZAIM129.ps(), rd=ZAIM.ready(sc), c0=_heroCtx(sc), at={x:c0.x,y:c0.y+6,def:{r:10}};
    if(S0&&ps0&&(ps0.mana||0)<S0.d.manaCost){ ZSTAT.say(sc,at,'not enough mana ('+Math.floor(ps0.mana||0)+' / '+S0.d.manaCost+')','#7f9fff'); if(typeof ZPOT!=='undefined'&&ZPOT.manaHint)try{ ZPOT.manaHint(); }catch(e2){} return; }
    if(rd>0.05){ ZSTAT.say(sc,at,S0?S0.d.name+' recharging — '+rd.toFixed(1)+' s':'recharging '+rd.toFixed(1)+' s','#9fd0ff'); return; }
    if(ZAIM.cur)ZAIM.clear('new');
    ZAIM129.update(sc,1); var el=typeof ZEL!=='undefined'&&S0&&ZEL.E[ZEL.SPELL[S0.id]], col=el?parseInt(el.col.slice(1),16):0x9ff8f0;
    ZAIM.held=true; ZAIM.cur={sc:sc,chg:true,spell:true,t0:performance.now(),mon:ZAIM129.lock&&!ZAIM129.lock.dead?ZAIM129.lock:null,a:ZAIM129.facing(sc),x:c0.x,y:c0.y,r:22,col:col,g:sc.add.graphics().setDepth(18),im:null,t:9,spin:0,_dk:null}; };
  ZAIM.release=function(){ ZAIM.held=false; var C=ZAIM.cur; if(!C||!C.chg)return; var sc=C.sc; if(!sc.sys||!sc.sys.isActive()){ ZAIM.clear('scene'); return; }
    var held=(performance.now()-C.t0)/1000, m=ZAIM129.tier(held), S=ZAIM.spell(), ps=ZAIM129.ps(), base=S?S.d.manaCost:0, extra=function(m){ return m>=2?Math.round(base*0.5):m>1?Math.round(base*0.25):0; };
    while(m>1&&ps&&(ps.mana||0)<base+extra(m))m=m>=2?1.5:1;      // not enough mana for the full charge: the most it can pay for
    var c=_heroCtx(sc), mon=C.mon&&!C.mon.dead?C.mon:null, d=S&&S.d.cloud?160:S&&S.d.delay?200:150;
    if(mon){ C.x=mon.x; C.y=mon.y; } else { C.x=c.x+Math.cos(C.a)*d; C.y=c.y+Math.sin(C.a)*d; }
    var m0=ps&&ps.mana; ZAIM129.spellMult=m;
    try{ ZAIM.fire(sc); } finally { ZAIM129.spellMult=1; if(ZAIM.cur)ZAIM.clear('release'); }
    if(m>1&&ps&&ps.mana<m0){ ps.mana=Math.max(0,ps.mana-extra(m)); ZSTAT.say(sc,{x:c.x,y:c.y+4,def:{r:10}},(m>=2?'full charge ×2':'charged ×1.5')+' (−'+extra(m)+' mana)',m>=2?'#ffe066':'#ffd8a0'); } };
  ZAIM.tick=function(sc,dt){ var C=ZAIM.cur; if(!C)return; if(C.sc!==sc||!sc.sys.isActive()){ ZAIM.clear('scene'); return; }
    if(!C.chg){ C.t-=dt; if(C.t<=0)ZAIM.clear('time'); return; }
    ZAIM129.retarget(sc,C); if(C.mon&&C.mon.dead)C.mon=null; var c=_heroCtx(sc), g=C.g, u=Math.min(1,(performance.now()-C.t0)/1000/ZAIM129.CH2); g.clear();
    if(!C.mon){ var x=c.x+Math.cos(C.a)*150, y=c.y+Math.sin(C.a)*150; g.lineStyle(2,C.col,0.7); g.strokeCircle(x,y,18+u*6); }
    g.lineStyle(1+u*2,C.col,0.5+u*0.4); g.strokeCircle(c.x,c.y,14+u*8); };
  // a charged spell hits harder (×1.5 / ×2): the power is read while the cast is made
  if(typeof ZHit!=='undefined'&&ZHit.spellPow){ var sp0=ZHit.spellPow; ZHit.spellPow=function(){ var v=sp0.apply(ZHit,arguments); return ZAIM129.spellMult>1?Math.round(v*ZAIM129.spellMult):v; }; }
  // remember the last foe the hero struck (the 🔁 rule)
  if(typeof ZHit!=='undefined'&&ZHit.dmg){ var hd0=ZHit.dmg; ZHit.dmg=function(scene,mon){ if(mon&&!mon.dead)ZAIM129.last=mon; return hd0.apply(ZHit,arguments); }; }
  // every frame: keep the lock fresh and draw the ring
  if(typeof _heroStatusTick==='function'){ var st0=_heroStatusTick; _heroStatusTick=function(sc,dt){ st0(sc,dt); try{ if(ZAIM129.on){ ZAIM129.update(sc,dt); ZAIM129.draw(sc); } }catch(e){ if(!ZAIM129._w){ ZAIM129._w=1; console.error('aim129',e); } } }; }
  // ── the crossbow (A): a bolt breaks plate as well as a guard ──
  if(typeof MX!=='undefined'&&MX._barHit){ var bh0=MX._barHit; MX._barHit=function(mon,d,kind,say){
    if(kind==='ranged'&&MX._xbT&&Date.now()-MX._xbT<60&&mon.bars){ var pct=mon._hp/mon.maxHp; for(var i=0;i<mon.bars.length;i++){ var b=mon.bars[i]; if(b.hp>0&&pct<=b.at){ if(b.only&&b.only.indexOf('ranged')<0&&b.only.indexOf('melee')>=0)kind='melee'; break; } } }
    return bh0.call(MX,mon,d,kind,say); }; }
  // darts: dearer and in smaller bundles (the bow and its arrows are the everyday weapon)
  if(typeof ITEMS!=='undefined')Object.keys(ITEMS).forEach(function(id){ var it=ITEMS[id]; if(!it||it.type!=='ammo'||it.ammoFor!=='xbow'||it._r129)return; it._r129=true;
    if(it.buy)it.buy=Math.round(it.buy*1.5); it.qty=it.qty>=10?6:3; if(it.desc)it.desc=it.desc.replace(/× \d+ per purchase/,'× '+it.qty+' per purchase'); });
  if(typeof ITEMS!=='undefined')Object.keys(ITEMS).forEach(function(id){ var it=ITEMS[id]; if(it&&it.cls==='xbow'&&it.desc)it.desc=it.desc.replace(/crossbow: slower, hits hard, the dart passes through one foe/,'crossbow: one heavy bolt, a slow reload — it goes through every foe in a line and breaks plate'); });
  /* round 130: while charging, a direction only moves the ring — the key never reaches the scene, so the hero stands still
     (09s-combat102 has already read it into ZAIM.mv; its listener was added first) */
  if(typeof window!=='undefined'){ var MV={a:1,d:1,w:1,s:1,arrowleft:1,arrowright:1,arrowup:1,arrowdown:1};
    window.addEventListener('keydown',function(e){ if(!ZAIM129.on)return; var ch=ZDRAW.cur||(ZAIM.cur&&ZAIM.cur.chg); if(!ch||!MV[String(e.key||'').toLowerCase()])return; e.stopImmediatePropagation();
      try{ var sc=ch.sc, K=sc.keys||{}, cu=sc.cursors||{}; ['W','A','S','D','UP','DOWN','LEFT','RIGHT'].forEach(function(n){ if(K[n]&&K[n].reset)K[n].reset(); }); ['up','down','left','right'].forEach(function(n){ if(cu[n]&&cu[n].reset)cu[n].reset(); }); }catch(err){} },true); }
  // the controls box
  if(typeof ZDiff!=='undefined'&&ZDiff.render){ var dr0=ZDiff.render; ZDiff.render=function(){ dr0.apply(ZDiff,arguments); ZAIM129.render(); }; }
  if(typeof document!=='undefined'){ var st=document.createElement('style'); st.textContent='.zaim-row{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin:6px 0}@media(max-width:560px){.zaim-row{grid-template-columns:repeat(2,1fr)}}'; (document.head||document.documentElement).appendChild(st); }
})();
