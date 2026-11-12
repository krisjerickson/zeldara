// ═══════════════════════════════════════════════════════════════════════
// ║ 09s-combat102.js — round 102: SPELLS AS BIG MOMENTS, STATUS EFFECTS, X TWICE, AIMED ARROWS (Kris's Lab picks, round 101, doc 53/54).
// ║  ZSPELL102  the numbers (approved): mana ×2, cool-down ×3 (at least 2.5 s), power ×2.5 (ZHit.spellPow).
// ║  ZSTAT      what each spell leaves — every effect timed, none permanent ("make sure none are permanent on the monster"), a boss rule
// ║             ("some should be no effect depending on what type of boss it is, and others should be lessened"), and the monster
// ║             elements that shrug it off or take it harder ("fire-type should not be effected by burning, but should be more effected by
// ║             chill and freeze"). Shown as a tint + a small icon over the head that drains ("let's also do the icons as well").
// ║  ZAIM       X twice: the first X shows where the spell lands (a rune circle, locked on the foe nearest ahead); while it shows, the
// ║             movement keys slide it and the hero stands still; X again casts there. Holding X keeps it; let go and it stays 2.5 s.
// ║             Space or Esc puts it away; no mana is spent until it casts.
// ║  ZDRAW      Ctrl: hold to draw — a reticle shrinks on the target over 0.8 s; let go to shoot. A quick tap ×1, half a draw ×1.5, a full
// ║             draw a sure critical ×2 (Kris: "we can also have a 1.5X part way through"). Half the arrows that miss are picked up again.
// ═══════════════════════════════════════════════════════════════════════
var ZSPELL102={ MANA:2, CD:3, CDMIN:2.5, POW:2.5, done:false,
  apply:function(){ if(ZSPELL102.done||typeof SPELL_DATA==='undefined')return; ZSPELL102.done=true;
    Object.keys(SPELL_DATA).forEach(function(id){ var s=SPELL_DATA[id]; s._m0=s.manaCost; s._c0=s.cooldown; s.manaCost=Math.round(s.manaCost*ZSPELL102.MANA); s.cooldown=Math.max(ZSPELL102.CDMIN,Math.round(s.cooldown*ZSPELL102.CD*10)/10);
      if(ZSTAT.BY[id]&&['slow','stun_short','root','drain','kb'].indexOf(s.effect)>=0){ s._e0=s.effect; s.effect='none'; } });      /* ZSTAT gives these now (the old ones would land twice) */
    if(typeof ZHit!=='undefined'&&ZHit.spellPow&&!ZHit._sp102){ var sp0=ZHit.spellPow; ZHit.spellPow=function(){ return Math.round(sp0.apply(ZHit,arguments)*ZSPELL102.POW); }; ZHit._sp102=true; } } };
var ZSTAT={ on:true, LOCK:4,
  BY:{frost_bolt:'freeze',fireball:'burn',chain_lightning:'shock',flame_nova:'burn',ice_shards:'chill',void_orb:'hex',meteor:'burnkd',thunder_step:'shock2',poison_mist:'poison',
    arcane_burst:'mark',thorn_snare:'root',tidal_wave:'soak',stone_spikes:'earth',blizzard:'chill',void_rift:'hex',spirit_drain:'drain',starfall:'star'},
  // the look: tint, icon (painted st_icon_<k> once in, else the emoji), name
  LOOK:{freeze:[0x9fdcff,'❄','Frozen'],chill:[0xb8e4ff,'❄','Chilled'],burn:[0xffa060,'🔥','Burning'],shock:[0xfff07a,'⚡','Shocked'],poison:[0x9fe070,'☠','Poisoned'],mark:[0xe0a0ff,'✦','Marked'],
    root:[0x9fe070,'🌿','Rooted'],soak:[0x80c0ff,'💧','Soaked'],earth:[0xc8a070,'🪨','Earth-bound'],hex:[0xc090ff,'🌑','Hexed'],drain:[0x90ffc0,'💚','Drained'],star:[0xfff0b0,'✨','Starstruck']},
  OVER:{freeze:'so_ice',burn:'so_fire',earth:'so_stone',root:'so_vines',shock:'so_sparks',poison:'so_poison',soak:'so_drips',hex:'so_void'},
  els:function(m){ try{ return typeof ZEL!=='undefined'&&ZEL.mon?ZEL.mon(m)||[]:[]; }catch(e){ return []; } },
  is:function(m,e){ return ZSTAT.els(m).indexOf(e)>=0; },
  boss:function(m){ return typeof ZHit!=='undefined'&&ZHit.isBoss(m); },
  elite:function(m){ return /^elite_/.test(String(m.bossKey||''))||!!(m.def&&m.def.elite); },
  great:function(m){ return ZSTAT.boss(m)&&!ZSTAT.elite(m); },
  flier:function(m){ var mv=m.kit&&m.kit.move&&m.kit.move.name; return /fly|hover|swoop|glide|float|flit/.test(mv||'')||!!(m.def&&(m.def.fly||m.def.flying)); },
  st:function(m){ return m._zst||(m._zst={}); },
  left:function(m,k){ var S=m._zst; return S&&S[k]?S[k].t:0; },
  hold:function(scene,m,t){ if(!(t>0))return 0; if(typeof _heroHold==='function')return _heroHold(scene,m,t); return 0; },
  slow:function(scene,m,t,f){ if(typeof _heroSlow==='function')_heroSlow(scene,m,t,f); },
  // put an effect on: k, seconds; the time is refreshed, never stacked past its cap
  put:function(scene,m,k,t,extra){ if(!(t>0))return; var S=ZSTAT.st(m), o=S[k]||(S[k]={t:0,max:0}); o.t=Math.max(o.t,t); o.max=Math.max(o.max,o.t); if(extra)for(var x in extra)o[x]=extra[x]; ZSTAT.show(scene,m); },
  say:function(scene,m,txt,col){ try{ if(typeof _heroFloat==='function')_heroFloat(scene,m.x,m.y-((m.def&&m.def.r)||10)-24,txt,col||'#d0d0d0'); }catch(e){} },
  // a spell landed on m
  apply:function(scene,m,spell,dmg,vx,vy){ if(!ZSTAT.on||!m||m.dead)return; var k=ZSTAT.BY[spell]; if(!k)return; var G=ZSTAT.great(m), E=ZSTAT.elite(m), now=Date.now();
    if(spell==='poison_mist'||spell==='blizzard'){ if(m._zsCl&&now-m._zsCl<900)return; m._zsCl=now; }      /* a cloud ticks twice a second: it lands its effect once a second */
    var is=function(e){ return ZSTAT.is(m,e); }, nope=function(){ if(!m._zsNo||now-m._zsNo>1500){ m._zsNo=now; ZSTAT.say(scene,m,'shrugs it off'); } };
    var freeze=function(t){ if(G){ ZSTAT.slow(scene,m,1.5,0.6); ZSTAT.put(scene,m,'chill',1.5); return; } if(E)t*=0.5; var d=ZSTAT.hold(scene,m,t); if(d>0)ZSTAT.put(scene,m,'freeze',d); };
    if(k==='freeze'){ var t=is('fire')?2.5:is('water')?0.75:1.5; if(ZSTAT.left(m,'soak')>0)t+=0.5; freeze(t); }
    else if(k==='chill'){ if(is('water'))return nope(); var c=m._zsChill&&now-m._zsChill.t<4000?m._zsChill.n+1:1; m._zsChill={n:c,t:now};
      ZSTAT.slow(scene,m,3,G?0.8:0.65); ZSTAT.put(scene,m,'chill',3); var need=is('fire')?2:3; if(!G&&(c>=need||ZSTAT.left(m,'soak')>0)){ m._zsChill=null; freeze(1.5); } }
    else if(k==='burn'||k==='burnkd'){ if(is('fire'))return nope(); var bt=is('grass')?6:is('water')?2:4; if(G)bt=Math.min(bt,2); if(typeof _heroBurn==='function')_heroBurn(m,bt,Math.max(1,dmg*0.25/bt)); ZSTAT.put(scene,m,'burn',bt);
      if(k==='burnkd'&&!ZSTAT.boss(m)){ var kd=ZSTAT.hold(scene,m,1); if(kd>0)ZSTAT.say(scene,m,'knocked down!','#ffb070'); } }
    else if(k==='shock'||k==='shock2'){ if(is('storm'))return nope(); var s=k==='shock2'?1.5:0.5; if(is('earth'))s*=0.5; if(is('water')||ZSTAT.left(m,'soak')>0)s*=2; if(!ZSTAT.boss(m))ZSTAT.hold(scene,m,s); ZSTAT.put(scene,m,'shock',3,{bonus:1.25}); }
    else if(k==='poison'){ if(is('earth')||is('shadow'))return nope(); var P=ZSTAT.st(m).poison, tot=(P&&P.tot)||0; if(tot>=8)return; ZSTAT.put(scene,m,'poison',Math.min(3,8-tot),{dps:Math.max(1,dmg*(G?0.15:0.3)),tot:tot+0.5}); }
    else if(k==='mark'){ ZSTAT.put(scene,m,'mark',4,{crit:2}); }
    else if(k==='root'){ if(is('fire')||ZSTAT.flier(m)||G)return nope(); var r=is('earth')?3:2; if(E)r=1; var d2=ZSTAT.hold(scene,m,r); if(d2>0)ZSTAT.put(scene,m,'root',d2); }
    else if(k==='soak'){ if(is('water'))return nope(); if(!ZSTAT.boss(m)&&typeof ZKB!=='undefined')ZKB.push(scene,m,vx||0,vy||0,30); ZSTAT.put(scene,m,'soak',is('fire')?8:5,is('fire')?{weak:0.2}:null); }
    else if(k==='earth'){ if(is('earth'))return nope(); var fl=ZSTAT.flier(m), e=fl?(is('storm')?4:3):(is('water')?3:2); if(G){ if(!fl)return nope(); e=1.5; } var d3=ZSTAT.hold(scene,m,e); if(d3>0)ZSTAT.put(scene,m,'earth',d3); }
    else if(k==='hex'){ if(is('shadow'))return nope(); ZSTAT.put(scene,m,'hex',5,{f:G?1.15:is('storm')?1.45:1.3}); }
    else if(k==='drain'){ var ws=typeof _heroWS==='function'&&_heroWS(), ps=ws&&ws.playerState; if(ps&&!is('shadow')){ var h=Math.max(1,Math.round((dmg||4)*0.3)); ps.hp=Math.min(ps.maxHp,ps.hp+h); var c0=typeof _heroCtx==='function'?_heroCtx(scene):null; if(c0)ZSTAT.say(scene,{x:c0.x,y:c0.y+10,def:{r:10}},'+'+h,'#80ff90'); }
      ZSTAT.put(scene,m,'drain',4,{weak:G?0.1:0.2}); }
    else if(k==='star'){ if(is('storm')||G)return nope(); var st=is('shadow')?3:2; ZSTAT.slow(scene,m,st,0.3); ZSTAT.put(scene,m,'star',st); } },
  // the icon over the head and the tint
  show:function(scene,m){ var S=m._zst; if(!S)return; var top=null, tt=-1; for(var k in S){ if(S[k].t>0&&S[k].t>tt){ tt=S[k].t; top=k; } } m._zsTop=top;
    var L=top&&ZSTAT.LOOK[top], spr=m.spr||m.body; if(spr&&spr.setTint){ try{ if(L){ spr.setTint(L[0]); m._zsTint=true; } else if(m._zsTint){ spr.clearTint(); m._zsTint=false; } }catch(e){} }
    if(!scene||!scene.add)return; var oid=top&&ZSTAT.OVER[top], ov=m._zsOv;      /* the painted overlay on the monster (07zt10 so_*) once in */
    if(ov&&(!oid||ov._k!==oid)){ ov.destroy(); ov=m._zsOv=null; }
    if(oid&&!ov&&typeof ZScn!=='undefined'&&ZScn.has&&ZScn.has(oid)){ var OT=ZScn.texture(scene,oid,64,{shadow:false}); if(OT){ ov=m._zsOv=scene.add.image(m.x,m.y,OT.key).setOrigin(0.5,0.85).setDepth(((m.cont||m.spr||{}).depth||9)+0.5).setAlpha(0.85); ov._k=oid; } }
    var ic=m._zsIc;
    if(!L){ if(ic){ ic.destroy(); m._zsIc=null; } return; }
    if(!ic||!ic.scene||ic._k!==top){ if(ic)ic.destroy(); var id='st_icon_'+top, T=typeof ZScn!=='undefined'&&ZScn.has&&ZScn.has(id)&&ZScn.texture(scene,id,22,{shadow:false});
      ic=scene.add.container(m.x,m.y).setDepth(40); var ring=scene.add.graphics(); ic.add(ring); ic._ring=ring;
      ic.add(T?scene.add.image(0,0,T.key).setDisplaySize(18,18):scene.add.text(0,0,L[1],{fontSize:'13px',fontFamily:'serif'}).setOrigin(0.5)); ic._k=top; m._zsIc=ic; } },
  tick:function(scene,dt){ if(!ZSTAT.on)return; var c=typeof _heroCtx==='function'?_heroCtx(scene):null; if(!c)return;
    c.monsters.forEach(function(m){ var S=m._zst; if(!S)return; if(m.dead){ if(m._zsIc){ m._zsIc.destroy(); m._zsIc=null; } if(m._zsOv){ m._zsOv.destroy(); m._zsOv=null; } m._zst=null; return; }
      var ch=false; for(var k in S){ var o=S[k]; if(o.t<=0)continue; o.t-=dt;
        if(k==='poison'&&o.dps){ o.acc=(o.acc||0)+dt; o.tot=(o.tot||0)+dt; if(o.acc>=0.5){ o.acc=0; try{ _heroHitMonster(scene,m,o.dps*0.5,{pure:true,col:'#9fe070',suffix:'☠'}); }catch(e){} } }
        if(o.t<=0){ o.t=0; ch=true; if(k==='poison')o.tot=0; } }
      if(ch||!m._zsIc)ZSTAT.show(scene,m);
      var r0=((m.def&&m.def.r)||12)*((m._scale)||1); if(m._zsOv&&m._zsOv.scene){ m._zsOv.setPosition(m.x,m.y).setDisplaySize(Math.max(36,r0*3.4),Math.max(36,r0*3.4)); }
      var ic=m._zsIc; if(ic&&ic.scene){ var r=r0, top=S[m._zsTop]; ic.setPosition(m.x,m.y-Math.max(30,r*2.2)-10);
        var g=ic._ring; g.clear(); if(top&&top.max>0){ g.lineStyle(2,ZSTAT.LOOK[m._zsTop][0],0.95); g.beginPath(); g.arc(0,0,12,-Math.PI/2,-Math.PI/2+Math.PI*2*Math.max(0,top.t/top.max),false); g.strokePath(); } } }); },
  // the numbers a mark, a shock, a hex add to the next hit; the blows a soaked or drained foe deals
  hitMult:function(m){ var S=m&&m._zst; if(!S)return 1; var f=1; if(S.hex&&S.hex.t>0)f*=S.hex.f||1.3; if(S.mark&&S.mark.t>0){ f*=2; S.mark.t=0; m._zsCrit=true; } if(S.shock&&S.shock.t>0&&S.shock.bonus){ f*=S.shock.bonus; S.shock.bonus=0; } return f; },
  weak:function(m){ var S=m&&m._zst, w=0; if(!S)return 0; ['soak','drain'].forEach(function(k){ if(S[k]&&S[k].t>0&&S[k].weak)w=Math.max(w,S[k].weak); }); return w; } };
// ── X twice ──
var ZAIM={ on:true, cur:null, KEEP:2.5, held:false, mv:{},
  ok:function(sc){ var ws=typeof _heroWS==='function'&&_heroWS(), ps=ws&&ws.playerState, tome=ps&&ps.equip&&ps.equip.spell?ITEMS[ps.equip.spell]:null; var key=sc.sys.settings.key;
    return !!(tome&&tome.spellId&&SPELL_DATA[tome.spellId]&&key!=='Sky'&&key!=='Building'); },
  spell:function(){ var ws=_heroWS(), ps=ws&&ws.playerState, t=ps&&ps.equip&&ITEMS[ps.equip.spell]; return t&&SPELL_DATA[t.spellId]?{id:t.spellId,d:SPELL_DATA[t.spellId]}:null; },
  ready:function(sc){ var S=ZAIM.spell(); if(!S)return 0; if(typeof _isOverworld==='function'&&_isOverworld(sc))return Math.max(0,sc._spellCd||0); return Math.max(0,((typeof _heroSpellCdUntil!=='undefined'?_heroSpellCdUntil:0)-Date.now())/1000); },
  press:function(sc,e){ if(e&&e.repeat)return; if(!ZAIM.on||!ZAIM.ok(sc)){ _heroCastSpell(sc); return; }
    ZAIM.held=true; ZAIM.L('press '+(ZAIM.cur?'armed':'')); if(ZAIM.cur&&ZAIM.cur.sc===sc){ ZAIM.fire(sc); return; } ZAIM.arm(sc); },
  release:function(){ ZAIM.held=false; if(ZAIM.cur)ZAIM.cur.t=ZAIM.KEEP; },
  arm:function(sc){ var c=_heroCtx(sc), S=ZAIM.spell(), a=_isOverworld(sc)&&sc._getAimAngle?sc._getAimAngle():_heroDirAngle(c.dir), rng=S&&S.d.proj?Math.min(320,S.d.proj.spd*0.9):220;
    var mon=typeof ZSEEK!=='undefined'?ZSEEK.pick(sc,c.x,c.y,a,rng,c.monsters):null, x=mon?mon.x:c.x+Math.cos(a)*(S&&S.d.cloud?160:S&&S.d.delay?200:150), y=mon?mon.y:c.y+Math.sin(a)*(S&&S.d.cloud?160:S&&S.d.delay?200:150);
    var r=S?(S.d.aoe?S.d.aoe.r:S.d.cloud?S.d.cloud.r:S.d.splashR?Math.min(60,S.d.splashR):22):22, el=typeof ZEL!=='undefined'&&ZEL.E[ZEL.SPELL[S&&S.id]], col=el?parseInt(el.col.slice(1),16):0x9ff8f0;
    var g=sc.add.graphics().setDepth(18), T=typeof ZScn!=='undefined'&&ZScn.has&&ZScn.has('aim_rune')&&ZScn.texture(sc,'aim_rune',r*2.2,{shadow:false}), im=T?sc.add.image(x,y,T.key).setDepth(18).setTint(col).setAlpha(0.85):null;
    ZAIM.cur={sc:sc,x:x,y:y,mon:mon,r:r,col:col,g:g,im:im,t:ZAIM.KEEP,spin:0};
    var ready=ZAIM.ready(sc); if(ready>0.05)ZSTAT.say(sc,{x:c.x,y:c.y+6,def:{r:10}},'recharging '+ready.toFixed(1)+' s','#9fd0ff'); },
  log:[], L:function(t){ ZAIM.log.push(t); if(ZAIM.log.length>20)ZAIM.log.shift(); },
  clear:function(why){ var C=ZAIM.cur; if(!C)return; ZAIM.L('clear '+(why||'')); try{ C.g.destroy(); if(C.im)C.im.destroy(); }catch(e){} ZAIM.cur=null; },
  fire:function(sc){ var C=ZAIM.cur, c=_heroCtx(sc); if(!C)return; if(C.mon&&!C.mon.dead){ C.x=C.mon.x; C.y=C.mon.y; } C.ang=Math.atan2(C.y-c.y,C.x-c.x); C.d=Math.max(40,Math.hypot(C.x-c.x,C.y-c.y));
    var rd=ZAIM.ready(sc); if(rd>0.05){ ZSTAT.say(sc,{x:c.x,y:c.y+6,def:{r:10}},'recharging '+rd.toFixed(1)+' s','#9fd0ff'); return; }
    var face=Math.abs(Math.cos(C.ang))>Math.abs(Math.sin(C.ang))?(Math.cos(C.ang)>0?'right':'left'):(Math.sin(C.ang)>0?'down':'up');
    try{ if(sc.player&&sc.player.dir!==undefined)sc.player.dir=face; else if(sc.pdir!==undefined)sc.pdir=face; }catch(e){}
    var ps0=_heroWS()&&_heroWS().playerState, m0=ps0&&ps0.mana; ZAIM.L('fire '+sc.sys.settings.key+' cd'+(sc._spellCd||0).toFixed(2)); try{ _heroCastSpell(sc); } finally { ZAIM.L('mana '+Math.round(m0)+'→'+Math.round(ps0&&ps0.mana)); ZAIM.clear('cast'); } },
  // the steering keys (read from the page, so the scene's own keys can be held still while aiming)
  key:function(e,down){ var m={a:'l',arrowleft:'l',d:'r',arrowright:'r',w:'u',arrowup:'u',s:'d',arrowdown:'d'}[String(e.key||'').toLowerCase()]; if(m)ZAIM.mv[m]=down; },
  tick:function(sc,dt){ var C=ZAIM.cur; if(!C)return; if(C.sc!==sc||!sc.sys.isActive()){ ZAIM.clear('scene '+sc.sys.settings.key); return; }
    var c=_heroCtx(sc), dx=(ZAIM.mv.r?1:0)-(ZAIM.mv.l?1:0), dy=(ZAIM.mv.d?1:0)-(ZAIM.mv.u?1:0);
    if(dx||dy){ var l=Math.hypot(dx,dy); if(C.mon&&!C.mon.dead){ C.x=C.mon.x; C.y=C.mon.y; } C.mon=null; C.x+=dx/l*300*dt; C.y+=dy/l*300*dt; var ox=C.x-c.x, oy=C.y-c.y, L=Math.hypot(ox,oy); if(L>340){ C.x=c.x+ox/L*340; C.y=c.y+oy/L*340; }
      var near=null, nd=26; c.monsters.forEach(function(m){ if(m.dead)return; var d=Math.hypot(m.x-C.x,m.y-C.y); if(d<nd){ nd=d; near=m; } }); if(near)C.mon=near;
      var K=sc.keys||{}, cu=sc.cursors||{}; ['W','A','S','D','UP','DOWN','LEFT','RIGHT'].forEach(function(n){ if(K[n])K[n].isDown=false; }); ['up','down','left','right'].forEach(function(n){ if(cu[n])cu[n].isDown=false; }); }
    if(C.mon&&!C.mon.dead){ C.x=C.mon.x; C.y=C.mon.y; } else if(C.mon){ C.mon=null; }
    if(!ZAIM.held){ C.t-=dt; if(C.t<=0){ ZAIM.clear('time'); return; } }
    C.spin+=dt; var g=C.g, a=C.t<0.6&&!ZAIM.held?C.t/0.6:1; g.clear(); g.lineStyle(1.5,C.col,0.35*a); g.lineBetween(c.x,c.y,C.x,C.y);
    if(C.im){ C.im.setPosition(C.x,C.y).setRotation(C.spin*0.8).setAlpha(0.85*a); }
    else { g.lineStyle(2.5,C.col,0.9*a); g.strokeCircle(C.x,C.y,C.r); g.lineStyle(1.5,C.col,0.6*a); for(var i=0;i<6;i++){ var an=C.spin*1.2+i*Math.PI/3; g.lineBetween(C.x+Math.cos(an)*(C.r-6),C.y+Math.sin(an)*(C.r-6),C.x+Math.cos(an)*(C.r+5),C.y+Math.sin(an)*(C.r+5)); } g.fillStyle(C.col,0.10*a); g.fillCircle(C.x,C.y,C.r); } } };
// ── the steady draw ──
var ZDRAW={ on:true, cur:null, FULL:0.8, TAP:0.15, flying:[],
  start:function(sc,e){ if(e&&e.repeat)return; if(!ZDRAW.on){ ZDRAW.shoot(sc,1); return; } if(ZDRAW.cur)return; var c=_heroCtx(sc), a=_isOverworld(sc)&&sc._getAimAngle?sc._getAimAngle():_heroDirAngle(c.dir);
    var mon=typeof ZSEEK!=='undefined'?ZSEEK.pick(sc,c.x,c.y,a,340,c.monsters):null, g=sc.add.graphics().setDepth(18), T=typeof ZScn!=='undefined'&&ZScn.has&&ZScn.has('aim_reticle')&&ZScn.texture(sc,'aim_reticle',56,{shadow:false});
    ZDRAW.cur={sc:sc,t0:performance.now(),mon:mon,a:a,g:g,im:T?sc.add.image(c.x,c.y,T.key).setDepth(18):null}; },
  release:function(){ var C=ZDRAW.cur; if(!C)return; ZDRAW.cur=null; var held=(performance.now()-C.t0)/1000, m=held<ZDRAW.TAP?1:held>=ZDRAW.FULL?2:held>=ZDRAW.FULL/2?1.5:1;
    try{ C.g.destroy(); if(C.im)C.im.destroy(); }catch(e){} if(!C.sc.sys.isActive())return; ZDRAW.shoot(C.sc,m,C.mon&&!C.mon.dead?C.mon:null); },
  arr:function(sc){ var key=sc.sys.settings.key; return _isOverworld(sc)?(sc._playerProj||(sc._playerProj=[])):key==='Dungeon'?(sc._dngPlayerProj||(sc._dngPlayerProj=[])):(sc._islPlayerProj||(sc._islPlayerProj=[])); },
  shoot:function(sc,mult,mon){ var A=ZDRAW.arr(sc), n0=A.length, key=sc.sys.settings.key, ws=_heroWS(), ps=ws&&ws.playerState, am=ps&&ps.ammo?JSON.stringify(ps.ammo):'';
    if(_isOverworld(sc))_fireWorldBow(sc); else if(key==='Dungeon')_fireSceneBow(sc,'dungeon'); else return;
    A=ZDRAW.arr(sc); if(A.length<=n0)return; var p=A[A.length-1], c=_heroCtx(sc);
    if(mon){ var a=Math.atan2(mon.y-p.y,mon.x-p.x), sp=Math.hypot(p.vx,p.vy)||360; p.vx=Math.cos(a)*sp; p.vy=Math.sin(a)*sp; try{ p.vis.setRotation(a); }catch(e){} }
    if(mult>1){ p.dmg=Math.round(p.dmg*mult); p._zdraw=mult; ZSTAT.say(sc,{x:c.x,y:c.y+4,def:{r:10}},mult>=2?'full draw!':'drawn ×1.5',mult>=2?'#ffe066':'#ffd8a0'); }
    var id=null; if(ps&&ps.ammo){ var before=am?JSON.parse(am):{}; Object.keys(ps.ammo).forEach(function(k){ if((before[k]||0)>(ps.ammo[k]||0))id=k; }); }
    ZDRAW.flying.push({p:p,id:id,sc:sc}); },
  tick:function(sc,dt){ var C=ZDRAW.cur; if(C&&C.sc===sc){ var c=_heroCtx(sc), u=Math.min(1,(performance.now()-C.t0)/1000/ZDRAW.FULL), x=C.mon&&!C.mon.dead?C.mon.x:c.x+Math.cos(C.a)*170, y=C.mon&&!C.mon.dead?C.mon.y-((C.mon.def&&C.mon.def.r)||10)*0.4:c.y+Math.sin(C.a)*170, r=28-u*20, col=u>=1?0xffe066:u>=0.5?0xffd8a0:0xffffff;
      if(C.im){ C.im.setPosition(x,y).setScale((r*2)/56).setTint(col); } else { C.g.clear(); C.g.lineStyle(2,col,0.9); C.g.strokeCircle(x,y,r); C.g.lineBetween(x-r-5,y,x-r+4,y); C.g.lineBetween(x+r-4,y,x+r+5,y); C.g.lineBetween(x,y-r-5,x,y-r+4); C.g.lineBetween(x,y+r-4,x,y+r+5); if(u>=1){ C.g.fillStyle(col,0.25); C.g.fillCircle(x,y,4); } } }
    if(!ZDRAW.flying.length)return; var ws=_heroWS(), ps=ws&&ws.playerState;
    ZDRAW.flying=ZDRAW.flying.filter(function(f){ if(f.sc!==sc)return f.sc.sys&&f.sc.sys.isActive(); var p=f.p, gone=!p.vis||!p.vis.active||p.life<=0||p.dead; if(!gone)return true;
      var hit=p.hit||(p.hitSet&&p.hitSet.length)||p._hitAny; if(!hit&&f.id&&ps&&Math.random()<0.5){ ps.ammo[f.id]=(ps.ammo[f.id]||0)+1; if(typeof ws._updateAmmoHUD==='function')try{ ws._updateAmmoHUD(); }catch(e){} ZSTAT.say(sc,{x:p.x,y:p.y,def:{r:4}},'↩ arrow found','#d8c8a0'); }
      return false; }); } };
// ── wiring ──
(function(){ if(typeof window==='undefined')return;
  ZSPELL102.apply();
  if(typeof ZHit!=='undefined'){
    var d0=ZHit.dmg; ZHit.dmg=function(scene,mon,raw,kind,o){ var f=(kind==='spell'||kind==='melee'||kind==='ranged'||kind==='skill')?ZSTAT.hitMult(mon):1; var d=d0.call(ZHit,scene,mon,f!==1?raw*f:raw,kind,o);
      if(mon&&mon._zsCrit){ mon._zsCrit=false; ZSTAT.say(scene,mon,'critical!','#ffe066'); }
      if(kind==='spell'&&o&&o.spell&&d>0&&(!o.pure||o.spell==='poison_mist'||o.spell==='blizzard'))ZSTAT.apply(scene,mon,o.spell,o.pure?d*3:d); return d; };
    var t0=ZHit.taken; ZHit.taken=function(dmg,mon,ps){ var w=ZSTAT.weak(mon); return t0.call(ZHit,w>0&&dmg>0?Math.max(1,Math.round(dmg*(1-w))):dmg,mon,ps); }; }
  if(typeof _heroHitMonster==='function'){ var hh0=_heroHitMonster; _heroHitMonster=function(scene,mon,raw,opts){ var d=hh0.apply(this,arguments); opts=opts||{};
      if(opts.spell&&d>0&&mon&&!mon.dead){ var cloud=opts.spell==='poison_mist'||opts.spell==='blizzard'; if(!opts.pure||cloud){ var c=_heroCtx(scene); ZSTAT.apply(scene,mon,opts.spell,cloud?d*3:d,mon.x-c.x,mon.y-c.y); } }
      return d; }; }
  /* round 102 (Kris: "The boss hit box also need to be bigger … big bosses should have a larger one, relative to the size of the boss"): a boss is
     hit anywhere on the lower part of what you SEE — an oval from its feet to above its middle, sized from the painted sprite on screen (so a
     big boss has a big hurtbox and a small one a small one); bosses without a painted sprite keep the round-9 oval */
  if(typeof _hbBox==='function'){ var hb0=_hbBox; _hbBox=function(m){ try{ if(m&&!m.dead&&typeof ZHit!=='undefined'&&ZHit.isBoss(m)){ var spr=m.spr||m.body, fr=(typeof game!=='undefined'&&game.loop)?game.loop.frame:0;
        if(m._hbF===fr&&m._hbB)return m._hbB;
        if(spr&&spr.getBounds&&spr.visible!==false&&spr.scene){ var b=spr.getBounds(); if(b&&b.height>24&&b.width>16){ var ry=b.height*0.40, rx=Math.max((m.def&&m.def.r)||14,b.width*0.36);
            m._hbF=fr; m._hbB={cx:b.centerX,cy:b.bottom-ry*1.02,rx:rx,ry:ry,sc:spr.scene}; return m._hbB; } } } }catch(e){} return hb0(m); };
    _hbD=function(m,x,y){ if(!m)return 1e9; if(!_hbBox(m))return Math.hypot(m.x-x,m.y-y); var p=_hbP(m,x,y); return Math.hypot(p.x-x,p.y-y); };
    _hbHit=function(m,x,y,pad){ return _hbBox(m)?_hbD(m,x,y)<=pad:Math.hypot(m.x-x,m.y-y)<=((m.def&&m.def.r)||10)+pad; }; }
  if(typeof _heroStatusTick==='function'){ var st0=_heroStatusTick; _heroStatusTick=function(sc,dt){ st0(sc,dt); try{ ZSTAT.tick(sc,dt); ZAIM.tick(sc,dt); ZDRAW.tick(sc,dt); if(typeof ZBAR!=='undefined')ZBAR.tick(sc,dt,_heroCtx(sc).monsters); }catch(e){ if(!ZSTAT._w){ ZSTAT._w=true; console.error('combat102',e); } } }; }
  window.addEventListener('keydown',function(e){ ZAIM.key(e,true); if(e.key==='Escape'||e.key===' '){ if(ZAIM.cur)ZAIM.clear('key'); } },true);
  window.addEventListener('keyup',function(e){ ZAIM.key(e,false); var k=String(e.key||'').toLowerCase(); if(k==='x')ZAIM.release(); if(k==='control')ZDRAW.release(); },true);
  window.addEventListener('blur',function(){ ZAIM.mv={}; ZAIM.release(); if(ZDRAW.cur)ZDRAW.release(); });
})();
