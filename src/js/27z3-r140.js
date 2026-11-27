// ═══════════════════════════════════════════════════════════════════════
// ║ 27z3-r140.js — round 140: KRIS'S PLAY NOTES (doc 96). Loaded last, so it can wrap what came before.
// ║  · ZR140.loop     a fault inside one scene's frame no longer stops the whole game (Tilda's shop froze everything: one bad line in
// ║                   the shop window threw inside the game loop, and the loop never ran again — you could open the inventory, never move)
// ║  · spells         cooldowns a third of what they were — mana is what limits casting now
// ║  · aim            the gold ring reaches further and finds game animals (deer, boar …) when no foe is in range
// ║  · rolling foes   spin round their middle (not their feet), smoothly, roll about half as far, are not stopped or made immune by a hit —
// ║                   a blow glances off the shell for half
// ║  · ranged hits    a foe shot from afar comes for you, chases a while, then walks home
// ║  · boss blinks    where it will land is shown plainly: its ghost appears there, a ring and a light, and a line from where it stands
// ║  · roll           its own slot on the bar (Alt) with the cooldown draining, as the skills have
// ║  · full screen    ⛶ on the bar (and the menu); in full screen the Windows key and Esc stay with the game (hold Esc to leave)
// ║  · focus          click outside the game and it pauses; click back in to play
// ║  · saves          each save can be named, and shows where you are
// ║  · a fall in a site → "Wake at the door of …" lands you at the door (waits for the world, and holds you there)
// ║  · villagers' extra lines wait while the story has something to tell you (no barks during the first walk; Oswin's boasts only when
// ║                   he has nothing new)
// ║  · the season's ground pieces: none in the village but the boat being tarred, down by the pier (and you cannot walk through it);
// ║                   outside, never on a road; upright pieces are solid at their foot, flat ones you walk over (ZR140.KIND)
// ═══════════════════════════════════════════════════════════════════════
var ZR140={ on:true, solidPad:4,
  // ── solid feet for pieces we place (the tarred boat, the crypt, the season's upright pieces): rects on wd._r140S [l,t,r,b] ──
  solid:function(wd,x,y,w,h){ if(!wd)return; (wd._r140S||(wd._r140S=[])).push([x-w/2,y-h,x+w/2,y]); },
  unsolid:function(wd,tag){ if(wd&&wd._r140S)wd._r140S=wd._r140S.filter(function(r){ return r.tag!==tag; }); },
  hit:function(wd,x,y,fx,fy){ var L=wd&&wd._r140S; if(!L)return false; for(var i=0;i<L.length;i++){ var r=L[i]; if(x>r[0]&&x<r[2]&&y>r[1]&&y<r[3]){ if(fx>r[0]&&fx<r[2]&&fy>r[1]&&fy<r[3])continue; return true; } } return false; },
  road:function(wd,x,y){ try{ if(!wd||!wd.tiles)return false; var tx=Math.floor(x/TILE), ty=Math.floor(y/TILE), KL=typeof WK_REG!=='undefined'&&WK_REG.list;
      for(var j=-1;j<=1;j++)for(var i=-1;i<=1;i++){ var X=tx+i, Y=ty+j, t=wd.tiles[Y]&&wd.tiles[Y][X]; if(t===T.PATH||t===T.BRIDGE||t===T.VILLAGE_FLOOR||t===T.STONE_FLOOR)return true; var k=KL&&wd.kind&&KL[wd.kind[Y*WORLD_W+X]]; if(k&&(k.roadish||k.id==='road'||k.id==='path'))return true; } }catch(e){} return false; },
  village:function(x,y){ try{ return getTileSection(Math.floor(x/TILE),Math.floor(y/TILE))===0; }catch(e){ return false; } },
  // ── the story first: does Oswin have something new to say? ──
  oswStory:function(ws){ try{ var ps=ws.playerState, T=ZOSW.tq(ps); if(T.net&&T.net<3)return true; if(T.camp===1)return true; if(ZOSW.stuck&&ZOSW.stuck(ws))return true;
      var N=typeof ZQMAP!=='undefined'?ZQMAP.next(ws):null, k=N&&N.t; if(k&&ps._oswNext!==k){ ps._oswNext=k; return true; } }catch(e){} return false; }
};
if(typeof _vbBlocked==='function'){ var _vbB0=_vbBlocked; _vbBlocked=function(wd,x,y,fx,fy){ if(ZR140.hit(wd,x,y,fx,fy))return true; return _vbB0.apply(this,arguments); }; }

// ── 1. the game loop survives a fault in one frame ──
(function(){ try{ var S=Phaser.Scenes.Systems.prototype, st0=S.step; if(!st0||S._r140)return; S._r140=true;
  S.step=function(time,delta){ try{ return st0.call(this,time,delta); }catch(e){ var k=this.settings&&this.settings.key; ZR140._errs=(ZR140._errs||0)+1; if(typeof console!=='undefined')console.error('['+k+'] frame fault',e);
      if(ZR140._errs<4&&typeof showNotif==='function')showNotif('⚠ Something went wrong in '+(k||'the game')+' — carrying on. ('+String(e&&e.message||e).slice(0,80)+')','#ffb080'); } };
}catch(e){} })();

// ── 2. spells: quick cooldowns, mana is the limit ──
ZR140.CD_MULT=0.35;
(function(){ if(typeof SPELL_DATA==='undefined')return; for(var k in SPELL_DATA){ var s=SPELL_DATA[k]; if(s&&typeof s.cooldown==='number'&&!s._r140){ s._r140=s.cooldown; s.cooldown=Math.max(0.35,Math.round(s.cooldown*ZR140.CD_MULT*100)/100); } } })();

// ── 3. aim: further, and game animals when no foe is near ──
if(typeof ZAIM129!=='undefined'){ ZAIM129.RNG_BOW=480; ZAIM129.RNG_SPELL=420;
  var _aimP0=ZAIM129.pick, _aimV0=ZAIM129.valid;
  ZAIM129.pick=function(sc,ang,half,rng,rule){ var m=_aimP0.apply(this,arguments); if(m)return m; try{ var c=_heroCtx(sc), L=sc._largeAnimals||[], best=null, bd=1e9;
      L.forEach(function(a){ if(!a||a.dead||!(a.hp>0))return; var dx=a.x-c.x, dy=a.y-c.y, d=Math.hypot(dx,dy); if(d>rng)return; var da=Math.atan2(dy,dx)-ang; while(da>Math.PI)da-=Math.PI*2; while(da<-Math.PI)da+=Math.PI*2; if(Math.abs(da)>half&&d>36)return;
        if(typeof _heroLOS==='function'&&!_heroLOS(sc,c.x,c.y,a.x,a.y))return; var s=d+Math.abs(da)*40; if(s<bd){ bd=s; best=a; } });
      if(best)best._r140A=true; return best; }catch(e){ return null; } };
  ZAIM129.valid=function(sc,m,rng){ if(m&&m._r140A){ if(m.dead||!(m.hp>0)||(sc._largeAnimals||[]).indexOf(m)<0)return false; var c=_heroCtx(sc); return Math.hypot(m.x-c.x,m.y-c.y)<=rng*1.15; } return _aimV0.apply(this,arguments); }; }

// ── 4. rolling foes ──
if(typeof MX!=='undefined'&&MX.MOVE){ MX.ROLL_T=1.5; MX.ROLL_B=2; MX.ROLL_KEEP=0.5;
  MX.MOVE.roll=function(A,mon,m,P,d,dt,spd,p){
    if(m.rl){ var R=m.rl, sp=(p.spd||230); R.t+=dt; var rad=Math.max(10,((mon.spr&&mon.spr.displayHeight)||40)*0.45);
      R.ang=(R.ang||0)+sp*dt/rad*(Math.cos(R.a)>=0?1:-1); if(mon.spr)mon.spr.setAngle(R.ang*57.2958);
      if(MX.step(A,mon,R.a,sp,dt,false,true)){ R.b++; R.a+=Math.PI*(0.6+Math.random()*0.8); MX.ev(mon,'mv_roll_bounce'); }
      var P2=A.p(); if(Math.hypot(P2.x-mon.x,P2.y-mon.y)<mon.def.r+14&&!R.h){ R.h=true; A.hurt(mon.def.atk*1.2,'','#ff5533'); MX.push(A,Math.cos(R.a),Math.sin(R.a),60); MX.ev(mon,'mv_roll_hit'); }
      if(R.b>=Math.min(p.b||3,MX.ROLL_B)||R.t>MX.ROLL_T){ m.rl=null; if(mon.spr)mon.spr.setAngle(0); m.stunT=p.dizzy||1.6; A.float(mon.x,mon.y-26,'dizzy','#ffe070'); } return; }
    if(!m.aggro)return MX.wander(A,mon,m,dt,spd); if((m.cd.roll||0)<=0&&d<260){ m.cd.roll=(p.cd||3.5)+0.5; m.rl={t:0,b:0,a:Math.atan2(P.y-mon.y,P.x-mon.x),ang:0}; MX.ev(mon,'mv_roll'); } else if(d>60)MX.step(A,mon,Math.atan2(P.y-mon.y,P.x-mon.x),spd*0.5,dt); };
  // a blow on a rolling shell glances off for half (it used to be immune — and the hit pause stopped the roll)
  var _onHp0=MX.onHp; MX.onHp=function(mon,v){ var m=mon&&mon._m, old=mon&&mon._hp;
    if(m&&m.rl&&old!==undefined&&v<old){ v=old-(old-v)*MX.ROLL_KEEP; try{ var A=mon._scene&&mon._scene._mxA; if(A&&(m._sayT||0)<=0){ A.float(mon.x,mon.y-mon.def.r-18,'glances off the shell','#e8dcc0'); m._sayT=0.5; } }catch(e){} }
    var r=_onHp0.call(this,mon,v);
    try{ if(m&&old!==undefined&&mon._hp<old&&!mon.dead&&!mon.isBoss&&!mon.campHome){ var sc=mon._scene, A=sc&&sc._mxA, P=A?A.p():null, dist=P?Math.hypot(P.x-mon.x,P.y-mon.y):0;
        if(m.lastHit==='ranged'||m.lastHit==='spell'||dist>=110){ m.hurtT=Math.max(m.hurtT||0,ZR140.CHASE); m.aggro=true; if(!m._home)m._home={x:mon.spawnX!=null?mon.spawnX:mon.x,y:mon.spawnY!=null?mon.spawnY:mon.y}; } } }catch(e){}
    return r; };
  // a hold (an axe's stagger, a root) does not stop a roll
  if(typeof _heroHold==='function'){ var _hold0=_heroHold; _heroHold=function(scene,m,t){ if(m&&m._m&&m._m.rl)return 0; return _hold0.apply(this,arguments); }; }
  // the painted ball turns round its middle; a stuck white flash is cleared
  if(typeof ZAtlas!=='undefined'&&ZAtlas.mon){ var _zm0=ZAtlas.mon; ZAtlas.mon=function(scene,mon,m,dt,dx,dy){ var spr=mon&&(mon.spr||mon.body), Z=mon&&mon._zs;
      if(Z&&Z._rl&&spr){ spr.setOrigin(0.5,1); if(Z.ly!=null)spr.y=Z.ly; Z._rl=0; if(!(m&&m.rl)&&!(m&&m.stunT>0))spr.setAngle(0); }
      var r=_zm0.apply(this,arguments); Z=mon&&mon._zs;
      if(r&&Z&&!Z.rig&&m&&m.rl&&spr&&Z.ly!=null){ spr.setOrigin(0.5,0.5); spr.y=Z.ly-spr.displayHeight/2; Z._rl=1; if(spr.isTinted&&!(Z.hurt>0.06))spr.clearTint(); }
      return r; }; }
}
ZR140.CHASE=6;
// a foe that chased you after a shot walks home once it gives up
if(typeof MX!=='undefined'&&MX.tick){ var _mxt0=MX.tick; MX.tick=function(scene,mon,dt){ var r=_mxt0.apply(this,arguments);
    try{ var m=mon&&mon._m; if(m&&m._home&&!mon.dead&&!m.aggro&&!m.busy&&!(m.stunT>0)){ var hx=m._home.x-mon.x, hy=m._home.y-mon.y, hd=Math.hypot(hx,hy); if(hd>TILE*1.5)MX.step(MX.A(scene),mon,Math.atan2(hy,hx),((mon.kit&&mon.kit.move&&mon.kit.move.p.spd)||mon.def.spd||60)*0.9,dt); else m._home=null; } }catch(e){}
    return r; }; }

// ── 5. boss blinks: show where it lands ──
if(typeof BMOVE!=='undefined'){ BMOVE.WARN=0.85;
  var _bgo0=BMOVE.go; BMOVE.go=function(A,mon,m,P,side){ var ok=_bgo0.apply(this,arguments); if(!ok||!m._bmv)return ok;
    try{ var to=m._bmv.to, sc=A.scene, spr=mon.spr||mon.body, D=BMOVE.WARN*1000, parts=[];
      if(spr&&spr.texture&&spr.frame){ var gh=sc.add.image(to.x,to.y+(spr.y||0),spr.texture.key,spr.frame.name).setOrigin(spr.originX,spr.originY).setScale(spr.scaleX,spr.scaleY).setAlpha(0).setTintFill(0xe8d0ff).setDepth(A.depth(to.y)+0.05); parts.push(gh); sc.tweens.add({targets:gh,alpha:0.55,duration:D*0.8}); }
      var col=sc.add.rectangle(to.x,to.y-60,26,120,0xe8d0ff,0.0).setDepth(A.depth(to.y)+0.06); parts.push(col); sc.tweens.add({targets:col,fillAlpha:0.22,duration:D*0.5,yoyo:true});
      var g=sc.add.graphics().setDepth(A.depth(to.y)-0.05); parts.push(g); var t0=Date.now(); var draw=function(){ if(!g.scene)return; var u=Math.min(1,(Date.now()-t0)/D); g.clear(); g.lineStyle(3,0xe8d0ff,0.9); g.strokeEllipse(to.x,to.y,80-34*u,34-14*u); g.lineStyle(2,0xe8d0ff,0.35+0.4*u);
        var n=10; for(var i=0;i<n;i++){ var a=i/n, b=(i+0.5)/n; g.lineBetween(mon.x+(to.x-mon.x)*a,mon.y+(to.y-mon.y)*a,mon.x+(to.x-mon.x)*b,mon.y+(to.y-mon.y)*b); } };
      draw(); var ev=sc.time.addEvent({delay:40,repeat:Math.ceil(D/40),callback:draw});
      sc.time.delayedCall(D+120,function(){ try{ ev.remove(); }catch(e){} parts.forEach(function(o){ try{ o.destroy(); }catch(e){} }); });
    }catch(e){} return ok; }; }

// ── 6. the roll's own slot, with its cooldown ──
ZR140.rollSlot=function(){ try{ if(typeof ZROLL==='undefined')return; var bar=document.getElementById('action-icon-bar'); if(!bar)return; var el=document.getElementById('action-roll-slot'), ws=Z2.ws(), ps=ws&&ws.playerState;
  if(!el){ var after=[].slice.call(bar.querySelectorAll('.aib-slot')).find(function(s){ return /SHIFT/.test((s.querySelector('.aib-key')||{}).textContent||''); }); el=document.createElement('div'); el.className='aib-slot'; el.id='action-roll-slot'; el.title='Roll (Alt) — a quick tumble out of harm\'s way';
    var it=typeof ITEMS!=='undefined'&&ITEMS.sp_roll; el.innerHTML='<div class="aib-key">ALT</div><div class="aib-ico">'+(it&&typeof ZIcon!=='undefined'?ZIcon.of(it,1.75):'🤸')+'</div><div class="aib-lbl">Roll</div><div class="cd"></div><div class="cdn"></div>';
    if(after&&after.nextSibling)bar.insertBefore(el,after.nextSibling); else bar.appendChild(el); }
  el.style.display=ZROLL.can(ps)?'':'none'; var left=Math.max(0,((ZROLL._cdUntil||0)-Date.now())/1000), cd=el.querySelector('.cd'), n=el.querySelector('.cdn');
  if(cd)cd.style.height=(left>0?Math.min(100,left/ZROLL.CD*100):0)+'%'; if(n)n.textContent=left>0.05?left.toFixed(1):''; }catch(e){} };
if(typeof setInterval!=='undefined')setInterval(ZR140.rollSlot,100);

// ── 7. full screen, with the Windows key kept in the game ──
ZR140.fs={ on:function(){ var d=document; return !!(d.fullscreenElement||d.webkitFullscreenElement); },
  lock:function(){ try{ if(navigator.keyboard&&navigator.keyboard.lock)navigator.keyboard.lock(['MetaLeft','MetaRight','Escape','ContextMenu']).catch(function(){}); }catch(e){} },
  unlock:function(){ try{ if(navigator.keyboard&&navigator.keyboard.unlock)navigator.keyboard.unlock(); }catch(e){} },
  pref:function(v){ try{ if(v===undefined)return localStorage.getItem('zeldara_fs')==='1'; localStorage.setItem('zeldara_fs',v?'1':'0'); }catch(e){ return false; } },
  btn:function(){ var mb=document.getElementById('mute-btn'); if(!mb||document.getElementById('fs-btn'))return; var b=document.createElement('button'); b.className='abtn abtn-sm'; b.id='fs-btn'; b.title='Full screen — no browser bar to click by mistake; the Windows key stays in the game (hold Esc to leave)'; b.textContent='⛶';
    b.onclick=function(e){ e.stopPropagation(); var was=ZR140.fs.on(); ZR140.fs.pref(!was); if(typeof ZPAUSE!=='undefined'&&ZPAUSE.fullscreen)ZPAUSE.fullscreen(); }; mb.parentNode.insertBefore(b,mb.nextSibling); } };
if(typeof document!=='undefined'){
  document.addEventListener('fullscreenchange',function(){ if(ZR140.fs.on())ZR140.fs.lock(); else ZR140.fs.unlock(); var b=document.getElementById('fs-btn'); if(b)b.classList.toggle('on',ZR140.fs.on()); });
  setTimeout(function(){ ZR140.fs.btn(); try{ var st=document.createElement('style'); st.textContent='#zpause .zpz-fs{display:flex!important}#fs-btn.on{color:#ffe27a}'; document.head.appendChild(st); }catch(e){} },0);
  // "always": the click that starts or continues a game takes you back into full screen
  if(typeof ZSave!=='undefined'&&ZSave.choose){ var _ch0=ZSave.choose; ZSave.choose=function(){ var r=_ch0.apply(this,arguments); try{ if(ZR140.fs.pref()&&!ZR140.fs.on()&&typeof ZPAUSE!=='undefined')ZPAUSE.fullscreen(); }catch(e){} return r; }; }
}

// ── 8. click outside the game: it pauses until you click back in ──
ZR140.focus={ el:null,
  playing:function(){ try{ if(!game||!game.scene||game.scene.isActive('Title')||game.scene.isActive('Boot'))return false; if(typeof _openOverlays==='function'&&_openOverlays().length)return false; if(typeof ZCUT!=='undefined'&&ZCUT.isOpen&&ZCUT.isOpen())return false; if(typeof ZDeath!=='undefined'&&ZDeath.busy)return false;
      return ['World','Island','Dungeon','Building','Sky','VolcanoBossRush','VolcanoMaze','VolcanoBulletHell','VolcanoPuzzle','VolcanoEscape'].some(function(k){ return game.scene.isActive(k); }); }catch(e){ return false; } },
  lost:function(){ if(!ZR140.on||!ZR140.focus.playing())return; var f=ZR140.focus, el=f.el||document.getElementById('zfocus');
    if(!el){ el=f.el=document.createElement('div'); el.id='zfocus'; el.innerHTML='<div class="zf-b"><b>Paused</b><span>Click to keep playing</span></div>'; document.body.appendChild(el);
      var st=document.createElement('style'); st.textContent='#zfocus{position:fixed;inset:0;z-index:100030;display:none;align-items:center;justify-content:center;background:rgba(4,8,14,.55);cursor:pointer}#zfocus .zf-b{display:flex;flex-direction:column;align-items:center;gap:4px;padding:18px 34px;border-radius:14px;background:rgba(12,18,28,.92);border:1px solid rgba(111,227,245,.55);color:#e8fbff;font:15px Georgia,serif}#zfocus b{font-size:26px;letter-spacing:.12em;color:#ffe27a}'; document.head.appendChild(st);
      el.addEventListener('pointerdown',function(e){ e.preventDefault(); e.stopPropagation(); el.style.display='none'; try{ window.focus(); }catch(x){} },true);
      if(typeof PAUSE_OVERLAYS!=='undefined'&&PAUSE_OVERLAYS.indexOf('zfocus')<0)PAUSE_OVERLAYS.push('zfocus'); }
    el.style.display='flex'; } };
if(typeof window!=='undefined'){ window.addEventListener('blur',function(){ if(navigator.webdriver)return; setTimeout(ZR140.focus.lost,30); });
  document.addEventListener('visibilitychange',function(){ if(document.hidden&&!navigator.webdriver)ZR140.focus.lost(); }); }

// ── 9. saves: a name, and where you are ──
if(typeof _prepareSave==='function'){ var _ps0=_prepareSave; _prepareSave=function(d){ var r=_ps0.apply(this,arguments); try{ var w=typeof ZRESP!=='undefined'&&ZRESP.inSite&&ZRESP.name?ZRESP.name:(typeof Z2!=='undefined'?Z2.region():''); if(w)d._where=w; }catch(e){} return r; }; }
if(typeof ZSave!=='undefined'){ var _inf0=ZSave.info; ZSave.info=function(id,slot){ var I=_inf0.apply(this,arguments); if(I&&!I.broken){ try{ var s=JSON.parse(ZSave.store.get(ZSave.slotKey(id,slot))); I.name=s.slotName||''; I.where=s._where||''; I.hero=s.hero; }catch(e){} } return I; };
  ZSave.rename=function(id,slot,name){ try{ var k=ZSave.slotKey(id,slot), s=JSON.parse(ZSave.store.get(k)); s.slotName=String(name||'').replace(/[<>]/g,'').trim().slice(0,40); ZSave.store.set(k,JSON.stringify(s)); var ws=Z2.ws(); if(ws&&ws.playerState&&ZSave.current&&ZSave.current.pid===id&&ZSave.current.slot===slot)ws.playerState.slotName=s.slotName; return true; }catch(e){ return false; } }; }
if(typeof ZProfilesUI!=='undefined'){ var _sl0=ZProfilesUI.slotLine; ZProfilesUI.slotLine=function(I){ var h=_sl0.apply(this,arguments); if(!I||I.broken)return h; var nm=I.name||((I.hero==='f'?'Zola':'Zoldor')+'\'s saga');
    return '<span class="zp-nm">'+ZProfilesUI.esc(nm)+'</span>'+(I.where?'<span class="zp-wh">📍 '+ZProfilesUI.esc(I.where)+'</span>':'')+h; };
  var _sls0=ZProfilesUI.slots; ZProfilesUI.slots=function(p,start,isNew,msg){ var r=_sls0.apply(this,arguments); try{ var E=ZProfilesUI.el;
      E.querySelectorAll('.zp-slot').forEach(function(row,i){ var s=i+1, I=ZSave.info(p.id,s); if(!I||I.broken)return; var act=row.querySelector('.zp-act'); if(!act||act.querySelector('[data-a=name]'))return;
        var b=document.createElement('button'); b.className='zp-btn zp-sm'; b.dataset.a='name'; b.textContent='✎ Name'; b.title='Name this save';
        b.onclick=function(e){ e.stopPropagation(); var sl=row.querySelector('.zp-sl'); if(sl.querySelector('input'))return; var inp=document.createElement('input'); inp.className='zp-in'; inp.maxLength=40; inp.value=I.name||''; inp.placeholder='Name this saga';
          var ok=document.createElement('button'); ok.className='zp-btn zp-sm zp-go'; ok.textContent='Save name'; sl.appendChild(inp); sl.appendChild(ok); inp.focus(); inp.onkeydown=function(ev){ ev.stopPropagation(); if(ev.key==='Enter')ok.click(); if(ev.key==='Escape')ZProfilesUI.slots(p,start,isNew); };
          ok.onclick=function(ev){ ev.stopPropagation(); ZSave.rename(p.id,s,inp.value); ZProfilesUI.slots(p,start,isNew,'Named.'); }; };
        act.insertBefore(b,act.firstChild.nextSibling); }); }catch(e){} return r; };
  if(typeof document!=='undefined')setTimeout(function(){ var st=document.createElement('style'); st.textContent='.zp-nm{font:600 15px Georgia,serif;color:#ffe9a8}.zp-wh{font-size:12px;color:#9fd8e8}.zp-in{margin-top:4px;padding:5px 8px;border-radius:7px;border:1px solid #2a4a6a;background:#06101c;color:#e8f4ff;font-size:13px;width:min(240px,60vw)}'; document.head.appendChild(st); },0); }

// ── 10. a fall in a site: "Wake at the door of …" ──
if(typeof ZRESP!=='undefined'){ var _back0=ZRESP.back;
  ZRESP.back=function(){ var tries=0, d=ZRESP.door;
    (function go(){ var ws=ZRESP.ws(); if(!ws||!ws.player||!d)return;
      if(!game.scene.isActive('World')||ws.sys.isPaused()){ try{ if(game.scene.isSleeping('World'))game.scene.wake('World'); if(typeof _pauseSync==='function')_pauseSync(); }catch(e){} if(++tries<40)return setTimeout(go,100); }
      ZRESP.door=d; _back0(); var hold=0, iv=setInterval(function(){ try{ var w=ZRESP.ws(); if(!w||!w.player){ clearInterval(iv); return; } var vx=CENTER_X*TILE+TILE/2, vy=CENTER_Y*TILE+TILE/2;
          if(Math.hypot(w.player.x-vx,w.player.y-vy)<TILE*3){ ZRESP.door=d; _back0(); } if(++hold>=15)clearInterval(iv); }catch(e){ clearInterval(iv); } },100); })(); };
  var _dsh=typeof ZDeath!=='undefined'&&ZDeath.show; if(_dsh){ ZDeath.show=function(L,I,done){ var r=_dsh.apply(this,arguments); try{ var b=document.getElementById('zdeath-btn'), b2=document.getElementById('zdeath-door');
      if(b&&b2&&!b2._r140){ b2._r140=1; var row=document.createElement('div'); row.className='zd-btns'; b.parentNode.insertBefore(row,b); row.appendChild(b2); row.appendChild(b);
        var st=document.getElementById('zr140-death'); if(!st){ st=document.createElement('style'); st.id='zr140-death'; st.textContent='#modal-death .zd-btns{display:flex;flex-direction:column;align-items:center;gap:16px;margin-top:6px}#modal-death .zd-btns .zd-door{margin-left:0!important;filter:none!important;animation:zdPulse 1.6s ease-in-out infinite!important}#modal-death .zd-btns #zdeath-btn{animation:none;filter:saturate(.7)}'; document.head.appendChild(st); }
        b2.addEventListener('pointerup',function(e){ e.stopPropagation(); },false); try{ b2.focus(); }catch(e){} } }catch(e){} return r; }; } }

// ── 11. the story first: no village chatter while the story speaks ──
if(typeof ZVOICE!=='undefined'&&ZVOICE.barks){ var _bk0=ZVOICE.barks; ZVOICE.barks=function(ws){ var ps=ws&&ws.playerState; if(ps&&ps.walk&&ps.walk!=='done')return; if(typeof ZWALK!=='undefined'&&ZWALK._ow)return; if(typeof ZDLG!=='undefined'&&(ZDLG.cur||ZDLG.open))return; return _bk0.apply(this,arguments); }; }

// ── 12. the season's ground pieces: where, and whether you walk over them (Lab → Ground pieces) ──
// flat: walked over, drawn on the ground · solid: stands up — a small block at its foot · village: only by a house (none on the land) ·
// port: the tarred boat, by the pier only
ZR140.KIND={ flat:['lt_snow_a','lt_snow_b','lt_puddle','lt_mud','lt_straw','lt_twigs','lt_coltsfoot','lt_snowdrops','lt_catkins','lb_meadow','lb_petals','lb_anemones','lb_lily','lb_cowslip','lh_berries','ly_spruce'],
  walkUnder:['lb_arch','ly_himmeli','ly_straw_star'],
  village:['lt_airing','lt_birdbox','lt_seed','lh_baskets','lh_barrels','lh_flail','ly_sled','ly_goat','ly_log','ly_tree','ly_icelantern','ly_snowlantern','lb_pole','lb_hive'],
  port:['lt_tar_boat'] };
ZR140.kind=function(id){ var K=ZR140.KIND; for(var k in K)if(K[k].indexOf(id)>=0)return k; return 'solid'; };
if(typeof ZSLAND!=='undefined'){ ZSLAND.land=function(ws,s){ ZSLAND.clear(ws,'_zsl'); ws._zslS=s; var wd=ws.wd; if(wd&&wd._r140S)wd._r140S=wd._r140S.filter(function(r){ return r.tag!=='zsl'; });
    var L=ws._zsl=[], P=(ZSLAND.SET[s]||[]).filter(function(id){ var k=ZR140.kind(id); return k!=='port'&&k!=='village'; }); var C=ZFEST.centre(ws), R=Z3.rng(9001+s.charCodeAt(0)*7+s.charCodeAt(1)), n=0, tries=0;
    var put=function(id,x,y){ var o=ZSLAND.put(ws,L,id,x,y); if(!o)return null; var k=ZR140.kind(id); if(k==='flat')o.setOrigin(0.5,0.5).setDepth(1.02); else if(k==='solid'){ var w=o.displayWidth*0.6, h=Math.min(o.displayHeight*0.3,TILE*0.9); ZR140.solid(wd,x,y,w,h); wd._r140S[wd._r140S.length-1].tag='zsl'; } return o; };
    var ok=function(x,y){ return !ZR140.village(x,y)&&!ZR140.road(wd,x,y)&&Z3.free(ws,x,y)&&!L.some(function(o){ return Math.hypot(o.x-x,o.y-y)<TILE*3; }); };
    // the farmland round the village (never in it, never on a road)
    if(P.length)while(n<22&&tries<900){ tries++; var a=R()*Math.PI*2, r=(16+R()*30)*TILE, x=C.x+Math.cos(a)*r, y=C.y+Math.sin(a)*r*0.85; if(!ok(x,y))continue; put(P[n%P.length],x,y); n++; }
    // a few by every waystone (off its road)
    if(P.length)(wd&&wd.waystones||[]).forEach(function(w,i){ for(var k=0;k<2;k++){ for(var t=0;t<20;t++){ var a=R()*Math.PI*2, r=(2.5+R()*3.5)*TILE, x=(w.x+0.5)*TILE+Math.cos(a)*r, y=(w.y+0.5)*TILE+Math.sin(a)*r; if(!ok(x,y))continue; put(P[(i*2+k+3)%P.length],x,y); break; } } });
    // the thaw: the boat being tarred, pulled up on the shore by the pier — solid
    if(s==='sp'&&ZSLAND.has('lt_tar_boat')){ var pe=ws._villageFolkSpot&&ws._villageFolkSpot('pier',0); if(pe){ var best=null, bd=1e9;
        for(var dy=-9;dy<=9;dy++)for(var dx=-9;dx<=9;dx++){ var x2=pe.x+dx*TILE, y2=pe.y+dy*TILE; if(!Z3.free(ws,x2,y2)||!Z3.free(ws,x2-TILE,y2)||!Z3.free(ws,x2+TILE,y2)||ZR140.road(wd,x2,y2))continue; var tx=Math.floor(x2/TILE), ty=Math.floor(y2/TILE), wet=false;
          for(var j=-2;j<=2&&!wet;j++)for(var i2=-2;i2<=2;i2++){ var tv=ws.tiles[ty+j]&&ws.tiles[ty+j][tx+i2]; if(tv===T.SHALLOW_WATER||tv===T.DEEP_WATER||tv===T.OCEAN){ wet=true; break; } }
          if(!wet)continue; var dd=Math.hypot(dx,dy)+(Math.abs(dx)<2?3:0); if(dd<bd){ bd=dd; best={x:x2,y:y2}; } }
        if(best){ var o=ZSLAND.put(ws,L,'lt_tar_boat',best.x,best.y); if(o){ ZR140.solid(wd,best.x,best.y,o.displayWidth*0.78,Math.min(o.displayHeight*0.45,TILE*1.4)); wd._r140S[wd._r140S.length-1].tag='zsl'; } } } } }; }

// ── 13. the crypt of echoes: as big as a hall, and you cannot walk through it ──
if(typeof ZECHO!=='undefined'){ ZECHO.H=150;
  ZECHO.spot=function(ws){ if(ws._zcrypt)return ws._zcrypt; var C=ZFEST.centre(ws), f=function(x,y){ for(var j=0;j<=3;j++)for(var i=-2;i<=2;i++)if(!Z3.free(ws,x+i*TILE,y-j*TILE))return false; return Z3.free(ws,x,y+TILE)&&!ZR140.road(ws.wd,x,y-TILE*2); };
    for(var r=13;r<26;r++){ for(var a=0;a<24;a++){ var an=Math.PI*0.75+a*0.26, x=C.x+Math.cos(an)*r*TILE, y=C.y+Math.sin(an)*r*TILE; if(f(x,y))return (ws._zcrypt={x:x,y:y}); } }
    for(var r2=13;r2<24;r2++){ for(var a2=0;a2<24;a2++){ var an2=Math.PI*0.75+a2*0.26, x3=C.x+Math.cos(an2)*r2*TILE, y3=C.y+Math.sin(an2)*r2*TILE; if(Z3.free(ws,x3,y3)&&Z3.free(ws,x3-TILE,y3)&&Z3.free(ws,x3+TILE,y3))return (ws._zcrypt={x:x3,y:y3}); } }
    return (ws._zcrypt={x:C.x-14*TILE,y:C.y+8*TILE}); };
  var _cb0=ZECHO.build; ZECHO.build=function(ws){ if(ws._zcryptO&&ws._zcryptO.scene)return; var P=ZECHO.spot(ws), o=Z3.img(ws,'crypt_door',P.x,P.y,ZECHO.H);
    if(!o){ _cb0.apply(this,arguments); o=ws._zcryptO; } else ws._zcryptO=o;
    try{ var wd=ws.wd; if(wd){ wd._r140S=(wd._r140S||[]).filter(function(r){ return r.tag!=='crypt'; }); var w=o&&o.displayWidth?o.displayWidth*0.7:64; ZR140.solid(wd,P.x,P.y-6,w,Math.min(ZECHO.H*0.42,TILE*2.4)); wd._r140S[wd._r140S.length-1].tag='crypt'; } }catch(e){} };
  var _ct0=ZECHO.tick; ZECHO.tick=function(){ if(!ZECHO.on)return; var ws=Z2.ws(); if(!ws||!ws.player||!ws.playerState||!Z2.act('World')||ws.wd&&ws.wd.islKey)return; ZECHO.build(ws); var P=ZECHO.spot(ws);
    if(Z3.near(ws,P.x,P.y+TILE*0.4,TILE*2.2)){ Z3.prompt(ws,'crypt',P.x,P.y-ZECHO.H-6,'[Tab] The crypt of echoes'); Z3.tab=ZECHO.open; } else Z3.hide(ws,'crypt'); };
  if(typeof document!=='undefined')setTimeout(function(){ var st=document.createElement('style'); st.textContent='.zecho-ui{background:rgba(4,6,10,.84)!important}.ze-box{background:#14121e!important;padding-top:0!important}.ze-box .ze-bg{position:relative!important;inset:auto!important;display:block;width:calc(100% + 48px)!important;height:190px!important;margin:0 -24px 12px!important;opacity:1!important;object-fit:cover;border-radius:14px 14px 0 0;-webkit-mask-image:linear-gradient(180deg,#000 70%,transparent);mask-image:linear-gradient(180deg,#000 70%,transparent)}.ze-box>h2{margin-top:14px}'; document.head.appendChild(st); },0); }

// ── 14. sound: nothing plays while you are away from the game; effects a fifth quieter by default ──
ZR140.quiet=function(){ try{ if(typeof document!=='undefined'&&document.hidden)return true; var f=document.getElementById('zfocus'); return !!(f&&f.style.display==='flex'); }catch(e){ return false; } };
ZR140.hush=function(on){ try{ var a=typeof ZSFX!=='undefined'&&ZSFX.ctx; if(on){ if(a&&a.state==='running')a.suspend(); if(typeof ZAUDIO!=='undefined'&&ZAUDIO.mus)ZAUDIO.mus.els.forEach(function(e){ if(!e.paused){ e._zhid=1; e.pause(); } }); }
    else if(!ZR140.quiet()){ if(a&&a.state==='suspended'&&ZSFX._unlocked)a.resume(); if(typeof ZAUDIO!=='undefined'&&ZAUDIO.mus)ZAUDIO.mus.els.forEach(function(e){ if(e._zhid){ e._zhid=0; var p=e.play(); if(p&&p.catch)p.catch(function(){}); } }); } }catch(e){} };
if(typeof ZSFX!=='undefined'){ var _sp0=ZSFX.play; ZSFX.play=function(){ if(ZR140.quiet())return; return _sp0.apply(this,arguments); };
  var _ac0=ZSFX.ac; ZSFX.ac=function(){ if(ZR140.quiet()){ var a=ZSFX.ctx; return a&&a.state!=='closed'?a:null; } return _ac0.apply(this,arguments); }; }
if(typeof ZAUDIO!=='undefined'){ var _zp0=ZAUDIO.play; ZAUDIO.play=function(){ if(ZR140.quiet())return false; return _zp0.apply(this,arguments); };
  ZAUDIO.vol.sfx=Math.round(ZAUDIO.vol.sfx*0.8*100)/100; ZAUDIO.vol.amb=Math.round(ZAUDIO.vol.amb*0.8*100)/100;      // the defaults (a saved choice is read over these in load())
  try{ if(!localStorage.getItem('zeldara_vol140')){ localStorage.setItem('zeldara_vol140','1'); var v=JSON.parse(localStorage.getItem('zeldara_vol')||'null'); if(v){ if(v.sfx!=null)v.sfx=Math.round(v.sfx*0.8*100)/100; if(v.amb!=null)v.amb=Math.round(v.amb*0.8*100)/100; localStorage.setItem('zeldara_vol',JSON.stringify(v)); Object.assign(ZAUDIO.vol,v); } } }catch(e){} }
(function(){ var l0=ZR140.focus.lost; ZR140.focus.lost=function(){ l0.apply(this,arguments); if(ZR140.quiet())ZR140.hush(true); };
  if(typeof document!=='undefined')document.addEventListener('pointerdown',function(){ setTimeout(function(){ ZR140.hush(false); },30); },true); })();

// ── 15. the villagers' vegetable beds are solid ──
ZR140.beds=function(){ try{ var ws=Z2.ws(), wd=ws&&ws.wd; if(!wd||!wd.props||wd._r140Beds===wd.props)return; wd._r140Beds=wd.props; wd._r140S=(wd._r140S||[]).filter(function(r){ return r.tag!=='bed'; });
    wd.props.forEach(function(p){ if(p.prop!=='vegplot')return; var x=p.x*TILE, y=p.y*TILE; (wd._r140S||(wd._r140S=[])).push(Object.assign([x+4,y+6,x+p.w*TILE-4,y+p.h*TILE-2],{tag:'bed'})); }); }catch(e){} };
if(typeof setInterval!=='undefined')setInterval(ZR140.beds,1500);
