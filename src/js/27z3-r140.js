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
  road:function(wd,x,y,r){ try{ if(!wd||!wd.tiles)return false; var tx=Math.floor(x/TILE), ty=Math.floor(y/TILE), KL=typeof WK_REG!=='undefined'&&WK_REG.list; r=r===undefined?1:r;
      for(var j=-r;j<=r;j++)for(var i=-r;i<=r;i++){ var X=tx+i, Y=ty+j, t=wd.tiles[Y]&&wd.tiles[Y][X]; if(t===T.PATH||t===T.BRIDGE)return true;      /* village floor is built ground (its kind says grass or pavement), not a road by itself */ var k=KL&&wd.kind&&KL[wd.kind[Y*WORLD_W+X]]; if(k&&(k.roadish||k.id==='road'||k.id==='path'||k.id==='vpave'))return true; } }catch(e){} return false; },
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
    try{ var wd=ws.wd; if(wd){ wd._r140S=(wd._r140S||[]).filter(function(r){ return r.tag!=='crypt'; }); var w=o&&o.displayWidth?o.displayWidth*0.7:64; ZR140.solid(wd,P.x,P.y+6,w,Math.min(ZECHO.H*0.42,TILE*2.4)+12); if(o&&o.setDepth&&typeof WR_DEPTH==='function')o.setDepth(WR_DEPTH(P.y-10));      /* round 140c (Kris: "as you walk close to the crypt, you go from in front of it to being shown behind it"): its solid foot reaches past its drawn foot, and it sorts a little behind that line, so you are always drawn in front when you stand before it */ wd._r140S[wd._r140S.length-1].tag='crypt'; } }catch(e){} };
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

// ── 16. round 140b (Kris: "the festival sprites need to show up in the village. However, I don't want things on top of the main square with
// the World Tree, and then it gets too cluttered there"): the season's village pieces come back — a few, beside the houses, never on the square
// or a road — and the night torches stand just outside the square instead of on it. ZR140.SQUARE: the square's radius (tiles) kept clear.
ZR140.SQUARE=8; ZR140.VMAX=6;
ZR140.offSquare=function(x,y){ var C=ZFEST.centre(Z2.ws()); return Math.hypot(x-C.x,(y-C.y)/0.9)>ZR140.SQUARE*TILE; };
if(typeof ZSLAND!=='undefined'){ var _land140=ZSLAND.land; ZSLAND.land=function(ws,s){ _land140.apply(this,arguments);
    try{ var wd=ws.wd, L=ws._zsl||(ws._zsl=[]), V=(ZSLAND.SET[s]||[]).filter(function(id){ return ZR140.kind(id)==='village'&&ZSLAND.has(id); }); if(!V.length)return;
      var B=((wd&&wd.buildings)||[]).filter(function(b){ return b.worldX!=null; }), R=Z3.rng(7001+s.charCodeAt(0)*13), n=0;
      B.sort(function(a,b){ return R()-0.5; });
      for(var i=0;i<B.length&&n<ZR140.VMAX;i++){ var b=B[i], dx=b.worldX+b.w*TILE/2, dy=b.worldY+b.h*TILE+TILE*0.6;
        var spots=[[dx-TILE*2.2,dy],[dx+TILE*2.2,dy],[dx-TILE*2.2,dy+TILE],[dx+TILE*2.2,dy+TILE]];
        for(var k=0;k<spots.length;k++){ var x=spots[k][0], y=spots[k][1]; if(!ZR140.village(x,y)||!ZR140.offSquare(x,y)||ZR140.road(wd,x,y,0)||!Z3.free(ws,x,y))continue;      /* in the village: off the paving itself (the paths to the doors run close by) */
          if(L.some(function(o){ return Math.hypot(o.x-x,o.y-y)<TILE*3; }))continue;
          var id=V[n%V.length], o=ZSLAND.put(ws,L,id,x,y); if(o){ o._zv140=1; ZR140.solid(wd,x,y,o.displayWidth*0.6,Math.min(o.displayHeight*0.3,TILE*0.9)); wd._r140S[wd._r140S.length-1].tag='zsl'; n++; } break; } } }catch(e){} };
  var _dress140=ZSLAND.dress; ZSLAND.dress=function(ws,f){ _dress140.apply(this,arguments);
    try{ if(!f||!ws._zsd)return; var C=ZFEST.centre(ws), L=ws._zsd;
      L.filter(function(o){ return o._zNight&&!ZR140.offSquare(o.x,o.y); }).forEach(function(o){ var a=Math.atan2(o.y-C.y,o.x-C.x), placed=false;
        for(var r=ZR140.SQUARE+0.6;r<ZR140.SQUARE+4&&!placed;r+=0.5){ for(var da=0;da<0.6&&!placed;da+=0.15){ var x=C.x+Math.cos(a+da)*r*TILE, y=C.y+Math.sin(a+da)*r*TILE*0.9; if(Z3.free(ws,x,y)&&!ZR140.road(ws.wd,x,y)){ o.setPosition(x,y); if(o.setDepth)o.setDepth(typeof WR_DEPTH==='function'?WR_DEPTH(y):10); placed=true; } } }
        if(!placed)o.setVisible(false),o._zNight=0; }); }catch(e){} }; }

// ── 17. round 140c (Kris: "the waystone at the village centre is still too close to Runa's board — they need to be further apart so you
// choose the right thing"): the board stood on the very same spot as the village waystone (centre +4, +3), and its Tab listener took the key
// first. It now stands on its own at the edge of the Green: off the square, off the paving, at least 7 tiles from the waystone, 5 from Runa
// and 3 from any door — chosen once per world.
if(typeof ZECO!=='undefined'&&ZECO.boardSpot){ var _bs0=ZECO.boardSpot;
  ZECO.boardSpot=function(){ var ws=ZECO.ws&&ZECO.ws(); if(!ws||!ws.wd)return _bs0(); if(ws._zBoardP&&ws._zBoardFor===ws.wd)return ws._zBoardP;
    try{ var C={x:CENTER_X*TILE+TILE/2,y:CENTER_Y*TILE+TILE/2}, W=(ws.wd.waystones||[]).find(function(w){ return w.id==='ws_village'; }), wp=W?{x:(W.x+0.5)*TILE,y:(W.y+0.5)*TILE}:_bs0(),
        R=(ws._villageNPCs||[]).find(function(n){ return n.id==='vf_elder'; }), B=ws.wd.buildings||[], best=null;
      for(var r=9;r<=14&&!best;r+=0.5){ for(var a=0;a<32&&!best;a++){ var an=Math.PI*0.62+a*(Math.PI*2/32), x=C.x+Math.cos(an)*r*TILE, y=C.y+Math.sin(an)*r*TILE*0.85;
          if(!Z3.free(ws,x,y)||!Z3.free(ws,x,y-TILE)||ZR140.road(ws.wd,x,y,0)||Math.hypot(x-wp.x,y-wp.y)<TILE*7||(R&&Math.hypot(x-R.x,y-R.y)<TILE*5))continue;
          if(B.some(function(b){ return b.worldX!=null&&Math.hypot(x-(b.worldX+b.w*TILE/2),y-(b.worldY+b.h*TILE))<TILE*3; }))continue; best={x:x,y:y}; } }
      ws._zBoardP=best||{x:wp.x-TILE*8,y:wp.y+TILE*2}; ws._zBoardFor=ws.wd; if(ws._zBoard&&ws._zBoard.scene){ ws._zBoard.destroy(); ws._zBoard=null; }
      try{ ZR140.solid(ws.wd,ws._zBoardP.x,ws._zBoardP.y,TILE*1.4,TILE*0.6); ws.wd._r140S[ws.wd._r140S.length-1].tag='board'; }catch(e){}
      return ws._zBoardP; }catch(e){ return _bs0(); } }; }

// ── 18. round 140c (Kris: "Tumbler Pia is behind the crypt, but on the mobile version I can't click on her to talk"): the crypt keeps clear of
// Pia's camp (and Pia of the crypt), and a tap on Pia talks to her like a tap on any villager.
if(typeof ZROLL!=='undefined'&&ZROLL.spot){ var _rs0=ZROLL.spot;
  ZROLL.spot=function(ws){ var p=_rs0.apply(this,arguments); try{ var C=ws&&ws._zcrypt; if(p&&C&&Math.hypot(p.x-C.x,p.y-C.y)<TILE*6){ for(var k=1;k<10;k++){ var q={x:p.x+(k%2?1:-1)*Math.ceil(k/2)*TILE*3,y:p.y}; if(Z3.free(ws,q.x,q.y)&&Math.hypot(q.x-C.x,q.y-C.y)>=TILE*6)return q; } } }catch(e){} return p; }; }
if(typeof ZECHO!=='undefined'){ var _es0=ZECHO.spot; ZECHO.spot=function(ws){ if(ws._zcrypt)return ws._zcrypt; var pia=null; try{ pia=typeof _rs0==='function'?_rs0(ws):null; }catch(e){}
    var fr0=Z3.free; Z3.free=function(w,x,y){ if(pia&&Math.hypot(x-pia.x,y-pia.y)<TILE*7)return false; return fr0.apply(this,arguments); };
    try{ return _es0.apply(this,arguments); } finally { Z3.free=fr0; } }; }
if(typeof ZCLICK!=='undefined'){ var _na0=ZCLICK.npcAt; ZCLICK.npcAt=function(s,p){ var n=_na0.apply(this,arguments); if(n)return n; try{ var P=typeof ZROLL!=='undefined'&&ZROLL.npc; if(P&&s.sys.settings.key==='World'&&Math.hypot(P.x-p.x,(P.y-14)-p.y)<TILE*1.5)return {id:'tc_roll',n:'Tumbler Pia',x:P.x,y:P.y,talk:function(sc){ ZROLL.talk(sc); }}; }catch(e){} return null; }; }

// ── 19. round 140c (Kris: "the wolf with the sheep doesn't seem to be showing up at the beginning" · "i don't know why there is a sheep
// following me now, this shouldn't happen"): the lamb was painted far too big and stood right on top of the young wolf, hiding it. Now the
// lamb is lamb-sized, the wolf comes at it from a little way off (in plain sight), and once the wolves are gone the lamb runs back into its
// pen and stays there — it no longer follows you.
if(typeof ZFWIN!=='undefined'){ ZR140.LAMB_H=34; ZR140.LAMB_SPD=90;
  var _la0=ZFWIN.lambAt; ZFWIN.lambAt=function(ws,x,y){ var had=ZFWIN.lamb&&ZFWIN.lamb.active, L=_la0.apply(this,arguments); if(!had&&L&&L.setDisplaySize&&L.height){ var k=ZR140.LAMB_H/L.height; L.setDisplaySize(L.width*k,L.height*k); } try{ L.setDepth(WR_DEPTH(L.y)); }catch(e){} return L; };
  var _wf0=ZFWIN.wolf; ZFWIN.wolf=function(ws,x,y,h){ var L=ZFWIN.lamb; if(L&&L.active&&Math.abs(x-L.x)<120){ x=L.x+150; y=L.y-20; } var m=_wf0.call(this,ws,x,y,h); try{ if(m&&m.spr){ m.spr.setVisible(true); m.spr.setAlpha(1); } }catch(e){} return m; };
  ZFWIN.frame=function(sc){ var L=ZFWIN.lamb; if(!L||!L.active||L.scene!==sc)return; var ps=sc.playerState; if(!ps)return;
    var P=ZFWIN.pen(sc), hx=P.x+TILE*0.5, hy=P.y+TILE*1.5;      /* inside the pen */
    var now=Date.now(), dt=Math.min(0.25,(now-(L._t||now))/1000); L._t=now;      /* by time: the frame hook runs at any rate */
    if(ps.firstWin>=3){ var dx=hx-L.x, dy=hy-L.y, d=Math.hypot(dx,dy); if(d>4){ var s=Math.min(d,ZR140.LAMB_SPD*dt); L.x+=dx/d*s; L.y+=dy/d*s; if(L.setFlipX)L.setFlipX(dx<0); } else { L.x+=Math.sin(Date.now()/1400)*0.12; } }
    try{ L.setDepth(WR_DEPTH(L.y)); }catch(e){} };
  var _ft0=ZFWIN.tick; ZFWIN.tick=function(){ try{ var ws=ZFWIN.ws(), ps=ws&&ws.playerState; if(ps&&ps.firstWin===4&&ps.lamb&&!(ZFWIN.lamb&&ZFWIN.lamb.active)&&ws.player){ var P=ZFWIN.pen(ws); ZFWIN.lambAt(ws,P.x+TILE*0.5,P.y+TILE*1.5); return; } }catch(e){} return _ft0.apply(this,arguments); };
}

// ── 20. round 140c (Kris, with a picture of the Green: "the thaw fair games comes up way too quick … there is also an old pixel art
// seedling hovering over which needs to be removed"): the festival's pieces stand round the edge of the village by the houses, never on
// the World Tree square, and the bobbing emoji sign over the games board is gone (the [Tab] prompt still shows when you stand by it).
// The first festival now waits until you have found your feet (ZDAY.ready, in 21z2).
if(typeof ZFEST!=='undefined'){ ZR140.FEST_R=[ZR140.SQUARE+2,ZR140.SQUARE+8];
  ZFEST.dress=function(ws,s){ ZFEST.undress(ws); var C=ZFEST.centre(ws), L=ws._zfest=[], P=ZFEST.PIECES[s]||[], R=Z3.rng(77+s.length*13), board=null, used=[];
    var ok=function(x,y){ if(!ZR140.offSquare(x,y)||!Z3.free(ws,x,y)||!Z3.free(ws,x,y-TILE))return false; if(ZR140.road&&ZR140.road(ws.wd,x,y,0))return false; for(var i=0;i<used.length;i++)if(Math.hypot(used[i].x-x,used[i].y-y)<TILE*3)return false;
      try{ var ws0=(ws.wd.waystones||[]).find(function(w){ return w.id==='ws_village'; }); if(ws0&&Math.hypot(ws0.x*TILE-x,ws0.y*TILE-y)<TILE*4)return false; }catch(e){} return true; };
    P.forEach(function(id,i){ for(var k=0;k<60;k++){ var a=(i/P.length)*Math.PI*2+R()*0.6+k*0.37, r=(ZR140.FEST_R[0]+R()*(ZR140.FEST_R[1]-ZR140.FEST_R[0]))*TILE, x=C.x+Math.cos(a)*r, y=C.y+Math.sin(a)*r*0.85; if(!ok(x,y))continue;
      var o=Z3.img(ws,id,x,y,ZFEST.H[id]||64); if(o){ L.push(o); used.push({x:x,y:y}); if(!board&&/tafl|table|stage|log|banner/.test(id))board={x:x,y:y}; } break; } });
    if(!board&&used.length)board=used[0];
    if(!board)board={x:C.x+(ZR140.SQUARE+3)*TILE,y:C.y+2*TILE};
    try{ var wd=ws.wd; wd._r140S=(wd._r140S||[]).filter(function(r){ return r.tag!=='fest'; }); used.forEach(function(u){ var r=[u.x-16,u.y-12,u.x+16,u.y]; r.tag='fest'; wd._r140S.push(r); }); }catch(e){}
    ws._zfestBoard=board; ws._zfestS=s; };
  var _ud0=ZFEST.undress; ZFEST.undress=function(ws){ try{ if(ws&&ws.wd&&ws.wd._r140S)ws.wd._r140S=ws.wd._r140S.filter(function(r){ return r.tag!=='fest'; }); }catch(e){} return _ud0.apply(this,arguments); };
}

// ── 21. round 140c (Kris, with a picture of a "Camps" card over a fight: "pop-ups at the beginning that are adding lag and not adding any value,
// especially when in the middle of battle … find more opportune times … including things like a saga card - not helpful" · "i am also still
// getting master oswin's talking lines at the top of the screen when i'm getting the initial instructions"):
//  · lessons, hints and hooks wait while you fight (a foe hunting you within 10 tiles, or a blow taken in the last 6 s) and while a story
//    dialogue is up; they come one at a time once things have been calm for 4 s. Only the first fight's own guidance (Oswin at the sheep pen) shows at once.
//  · no "A saga card" offers, except the one at the very end of the saga.
//  · Oswin's (and every keeper's) line at the top of the screen waits for the first walk and the first fight to be over, and never shows
//    over a dialogue or a lesson card; it goes when a dialogue opens.
ZR140.CALM_MS=4000; ZR140.HURT_MS=6000; ZR140.FOE_R=10; ZR140._q=[]; ZR140._hurtT=0; ZR140._busyT=0;
ZR140.fight=function(ws){ try{ if(!ws||!ws.player)return false; if(Date.now()-ZR140._hurtT<ZR140.HURT_MS)return true; var R=TILE*ZR140.FOE_R, L=ws.worldMonsters||[];
    for(var i=0;i<L.length;i++){ var m=L[i]; if(!m||m.dead)continue; var a=(m._m&&(m._m.aggro||m._m.chase))||m.state==='chase'||m.aggro; if(a&&Math.abs(m.x-ws.player.x)<R&&Math.abs(m.y-ws.player.y)<R)return true; } }catch(e){} return false; };
ZR140.story=function(){ try{ return (typeof ZDLG!=='undefined'&&ZDLG.open)||(typeof ZDLG!=='undefined'&&ZDLG._closedAt&&Date.now()-ZDLG._closedAt<1500); }catch(e){ return false; } };
if(typeof ZCARD!=='undefined'){ var _cs0=ZCARD.show;
  ZCARD.show=function(o){ o=o||{}; var soft=/zc-(les|hint|hook)/.test(o.cls||'')&&!o.now, ws=null; try{ ws=game.scene.getScene('World'); }catch(e){}
    if(soft&&(ZR140.fight(ws)||ZR140.story()||(ZCARD.cur&&ZCARD.cur.isConnected&&ZCARD.cur._now))){ if(!ZR140._q.some(function(x){ return x.text===o.text; }))ZR140._q.push(o); return null; }
    var d=_cs0.apply(this,arguments); if(d&&o.now)d._now=1; return d; };
  setInterval(function(){ try{ var ws=game.scene.getScene('World'); var ps=ws&&ws.playerState; if(ps){ if(ZR140._hp!=null&&ps.hp<ZR140._hp)ZR140._hurtT=Date.now(); ZR140._hp=ps.hp; }
    if(ZR140.fight(ws)||ZR140.story())ZR140._busyT=Date.now();
    if(!ZR140._q.length||Date.now()-ZR140._busyT<ZR140.CALM_MS||(ZCARD.cur&&ZCARD.cur.isConnected)||Date.now()-(ZR140._shownT||0)<8000)return;
    if(typeof _openOverlays==='function'&&_openOverlays().length)return;
    var o=ZR140._q.shift(); ZR140._shownT=Date.now(); _cs0.call(ZCARD,o); }catch(e){} },500); }
if(typeof ZFWIN!=='undefined'){ ZFWIN.card=function(t,btn){ if(typeof ZCARD!=='undefined')ZCARD.show({who:'Master Oswin',icon:'⚔',text:t,cls:'zc-hint',ms:14000,btns:btn,now:true}); else if(typeof showNotif==='function')showNotif('Master Oswin: '+t,'#ffe9a8'); }; }
if(typeof ZSHARE!=='undefined'&&ZSHARE.offer){ var _so0=ZSHARE.offer; ZSHARE.offer=function(o){ if(!o||o.kind!=='end')return; return _so0.apply(this,arguments); }; }
if(typeof ZVOICE!=='undefined'&&ZVOICE.bubble){ var _vb0=ZVOICE.bubble;
  ZVOICE.bubble=function(k,ps){ try{ var ws=game.scene.getScene('World'); ps=ps||(ws&&ws.playerState);
      if(ps&&ps.walk&&ps.walk!=='done')return; if(ps&&ps.firstWin>=1&&ps.firstWin<=3)return; if(typeof ZWALK!=='undefined'&&ZWALK._ow)return;
      if(ZR140.story()||(typeof ZCARD!=='undefined'&&ZCARD.cur&&ZCARD.cur.isConnected))return; if(ws&&ZR140.fight(ws))return;
      if(k==='oswin'&&ws&&ZR140.oswStory&&ZR140.oswStory(ws))return; }catch(e){} return _vb0.apply(this,arguments); };
  if(typeof ZDLG!=='undefined'&&ZDLG.say){ var _ds21=ZDLG.say; ZDLG.say=function(){ try{ var b=document.getElementById('zvoice-bub'); if(b)b.classList.remove('on'); }catch(e){} return _ds21.apply(this,arguments); }; } }

// ── 22. round 140c (Kris, with a picture of the jeweller's: "for the festival, the wreaths and banners are not at the right places on the village
// buildings, need to either be removed or moved to places it makes sense"): a painted house's door is not where the old tile door was, so
// the wreath lay on the ground and the banner stood in the doorway. Now no wreath or step piece on the ground; each house gets one banner
// and one lantern standing at its two front corners, clear of the door and the path to it. (Lab: wreaths painted on the houses themselves.)
if(typeof ZSLAND!=='undefined'&&typeof _dress140==='function'){ ZSLAND.DRESS=['banner','lantern'];
  _dress140=function(ws,f){ ZSLAND.clear(ws,'_zsd'); ws._zsdF=f; if(!f)return; var L=ws._zsd=[], B=(ws.wd&&ws.wd.buildings)||[];
    B.forEach(function(b,i){ if(b.worldX==null)return; var y0=b.worldY+b.h*TILE+TILE*0.35, xl=b.worldX-TILE*0.15, xr=b.worldX+b.w*TILE+TILE*0.15, side=i%2;
      [['banner',side?xr:xl],['lantern',side?xl:xr]].forEach(function(p){ var id='fd_'+f+'_'+p[0]; if(!ZSLAND.has(id))return;
        for(var k=0;k<3;k++){ var y=y0+k*TILE*0.5; if(Z3.free(ws,p[1],y)&&!(ZR140.road&&ZR140.road(ws.wd,p[1],y,0))){ ZSLAND.put(ws,L,id,p[1],y); return; } } }); });
    var C=ZFEST.centre(ws); for(var k=0;k<8;k++){ var a=k/8*Math.PI*2, x=C.x+Math.cos(a)*4.2*TILE, y=C.y+Math.sin(a)*3.4*TILE; if(Z3.free(ws,x,y)){ var o=ZSLAND.put(ws,L,k%2?'fd_night_torch':'fd_night_brazier',x,y); if(o)o._zNight=1; } } }; }

// ── 23. round 140c (Kris: "the sheep need sprites that make them move"): once the sheep and lamb are painted as animals (r140_motion:
// animal_sheep, animal_lamb — idle (grazing) and a four-frame walk), every sheep of the village pens and the hamlets is alive: it grazes,
// then ambles a step or two round its spot and grazes again. Until then the still paintings stay as they are.
var ZSHEEP={ on:true, R:22, HOME:0.9, SPD:16, L:{},
  live:function(){ return ZSHEEP.on&&typeof ZAtlas!=='undefined'&&ZAtlas.has('animal_sheep'); },
  tick:function(sc,dt){ if(!ZSHEEP.live()||!sc||!sc.wd||!sc.player||sc.sys.settings.key!=='World')return; var wd=sc.wd, P=sc.player, R=ZSHEEP.R*TILE, L=ZSHEEP.L;
    if(ZSHEEP._wd!==wd){ ZSHEEP._wd=wd; ZSHEEP.L=L={}; ZSHEEP.S=(wd.props||[]).filter(function(p){ return p.prop==='sheep'; }).map(function(p,i){ var h=_wpHash?_wpHash(p.x,p.y,11):i*7; return {k:p.x+'_'+p.y,x:(p.x+p.w/2)*TILE,y:(p.y+p.h)*TILE-4,lamb:(Math.abs(h)%5)===0}; }); }
    (ZSHEEP.S||[]).forEach(function(s){ var near=Math.abs(s.x-P.x)<R&&Math.abs(s.y-P.y)<R, a=L[s.k];
      if(!near){ if(a){ if(a._zim&&a._zim.scene)a._zim.destroy(); delete L[s.k]; } return; }
      if(!a)a=L[s.k]={x:s.x,y:s.y,hx:s.x,hy:s.y,vx:0,vy:0,state:'idle',timer:1+Math.random()*4,type:s.lamb&&ZAtlas.has('animal_lamb')?'lamb':'sheep'};
      a.timer-=dt; if(a.timer<=0){ if(a.state==='idle'){ var an=Math.random()*Math.PI*2, r=Math.random()*ZSHEEP.HOME*TILE, tx=a.hx+Math.cos(an)*r, ty=a.hy+Math.sin(an)*r*0.6, d=Math.hypot(tx-a.x,ty-a.y)||1;
          a.vx=(tx-a.x)/d*ZSHEEP.SPD*(a.type==='lamb'?1.3:1); a.vy=(ty-a.y)/d*ZSHEEP.SPD*(a.type==='lamb'?1.3:1); a.state='wander'; a.timer=d/ZSHEEP.SPD; }
        else { a.vx=a.vy=0; a.state='idle'; a.timer=3+Math.random()*6; } }
      a.x+=a.vx*dt; a.y+=a.vy*dt; try{ ZAtlas.animal(sc,a,a.type,false); }catch(e){} }); } };
if(typeof ZAtlas!=='undefined'&&ZAtlas.ANIMAL_H){ ZAtlas.ANIMAL_H.sheep=22; ZAtlas.ANIMAL_H.lamb=15; }
if(typeof WPROP!=='undefined'&&WPROP.sheep){ var _wsh0=WPROP.sheep; WPROP.sheep=function(){ if(ZSHEEP.live())return; return _wsh0.apply(this,arguments); }; }
if(typeof _heroStatusTick==='function'){ var _hst23=_heroStatusTick; _heroStatusTick=function(sc,dt){ _hst23(sc,dt); try{ ZSHEEP.tick(sc,dt); }catch(e){} }; }

// ── 24. round 140c (Kris: "when the fair starts, there also needs to be some explanation about this, perhaps someone that meets you when you
// first come back to the village to tell you about the fair once it starts … should be the same for all fairs"): ZFAIR — the first time you
// come into the village after a fair begins (and no foe is on you), the fair's greeter walks up to you, tells you what the fair is, the three
// games at the board and the ribbon, then walks back to the board and stands there while the fair lasts. Once per fair. The greeter is
// Kris's pick in the Lab (The fair greeter); until then Marta the Cart Vendor, who brings her cart for every fair, from the very first.
// Any villager works (they all have walking frames): if they live in the village, their own figure walks over and goes home after.
var ZFAIR={ on:true, WHO:'vf_vendor', R:16, SPD:95, S:null,
  NAME:function(){ var R=typeof CHAR_BY_ID!=='undefined'&&CHAR_BY_ID[ZFAIR.WHO]; return R?R.name:'Marta the Cart Vendor'; },
  WHAT:{sp:'the first fair since the long winter broke. We sweep out the old year and hang green on every door',su:'the longest day of the year. The bonfire on the Green burns all night and nobody sleeps',
    au:'the harvest is in. We feast on what the land gave back to us',wi:'the longest night. We light the great log and keep each other warm till the sun comes back',bl:'spring in full flower: garlands on every post and dancing round the pole'},
  MORE:{sp:'Twenty-eight winters without a fair — nobody remembers the old rules, so we are making them up.',su:'Bring a wish for the fire. Everyone does.',au:'Mind the barrels. Last time Rolf rolled one into the pond.',wi:'Stay by the fires, and listen for the old songs.',bl:'Wear a flower. You will be the only one without one otherwise.'},
  lines:function(f){ var N=typeof ZDAY!=='undefined'?ZDAY.FNAME[f]:'the fair', n=N.charAt(0).toUpperCase()+N.slice(1);
    return ['There you are! '+n+' has begun on the Green — '+(ZFAIR.WHAT[f]||'a fair for the whole village')+'.',
      'For three days there are games at the fair board: the rune toss, rune memory, and a race round the Green. Play any one of them and the fair\'s ribbon is yours to keep.',
      (ZFAIR.MORE[f]||'')+' Come and find me at the board — I will show you how they go.']; },
  key:function(ps,f){ return f+'@'+ps.seasStart; },
  tick:function(ws){ if(!ZFAIR.on||!ws||!ws.wd||!ws.player||ws.sys.settings.key!=='World'||ws.wd.islKey)return; var ps=ws.playerState; if(!ps||typeof ZDAY==='undefined')return;
    var now=Date.now(), dt=Math.min(0.25,(now-(ZFAIR._t||now))/1000); ZFAIR._t=now;      /* by time: the frame hook runs at any rate */
    var f=ZDAY.fest(ps), S=ZFAIR.S; if(S&&(S.ws!==ws||!S.im||!S.im.scene)){ ZFAIR.S=S=null; }
    if(!f){ if(S)ZFAIR.end(S,true); return; }
    var k=ZFAIR.key(ps,f), G=ps.festGreet||(ps.festGreet={});
    if(G[k]==='done'){ if(S&&S.phase==='stand')return; if(S&&S.phase==='back')ZFAIR.walk(S,dt); return; }
    var C=ZFEST.centre(ws), B=ws._zfestBoard;
    if(!S){ if(!B||Math.hypot(ws.player.x-C.x,ws.player.y-C.y)>ZFAIR.R*TILE)return; if(ZR140.fight(ws)||ZR140.story()||(ps.walk&&ps.walk!=='done'))return;
      if(typeof _openOverlays==='function'&&_openOverlays().length)return;
      var own=(ws._folk||[]).find(function(o){ return o.F&&o.F.id===ZFAIR.WHO; }), im=own&&own.im, temp=false, npc=null;
      if(own){ npc=(ws._villageNPCs||[]).find(function(n){ return n.id===ZFAIR.WHO; }); }
      else { im=typeof CHX!=='undefined'?CHX.sprite(ws,ZFAIR.WHO,B.x+TILE,B.y+12,1.45):null; temp=true; if(!im)return; }
      ZFAIR.S=S={ws:ws,im:im,own:own,npc:npc,temp:temp,f:f,k:k,x:im.x,y:im.y-12,home:{x:im.x,y:im.y-12},phase:'come',path:null,i:0,t:0}; }
    if(S.phase==='come'&&Math.hypot(ws.player.x-C.x,ws.player.y-C.y)>(ZFAIR.R+8)*TILE){ if(S.temp)ZFAIR.end(S); else { S.x=S.home.x; S.y=S.home.y; S.im.setPosition(S.x,S.y+12); if(S.npc){ S.npc.x=S.x; S.npc.y=S.y; } ZFAIR.S=null; } return; }      /* you left again: try next time */
    if(S.phase==='come'){ var H=ws.player, d=Math.hypot(H.x-S.x,H.y-S.y);
      if(d<TILE*1.6){ S.phase='talk'; S.im.setFlipX(H.x<S.x); var L=ZFAIR.lines(f), nm=ZFAIR.NAME();
        L.forEach(function(t,i){ ZDLG.say(nm,t,{id:ZFAIR.WHO,icon:typeof ZDAY!=='undefined'?ZDAY.FICON[f]:'🎀',done:i===L.length-1?function(){ G[k]='done'; ZFAIR.back(S); }:null}); }); return; }
      if(!S.path||S.t>1.2){ S.t=0; S.path=(typeof ZWALK!=='undefined'&&ZWALK.route)?ZWALK.route(ws,{x:S.x,y:S.y},{x:H.x,y:H.y}):null; S.i=0; } S.t+=dt; ZFAIR.walk(S,dt,{x:H.x,y:H.y}); } },
  // a step along the path (or straight at the goal if there is none); moving the figure is enough — its walking frames follow the movement
  walk:function(S,dt,goal){ var tg=S.path&&S.path[S.i]||goal; if(!tg){ if(S.phase==='back')ZFAIR.arrive(S); return; } var dx=tg.x-S.x, dy=tg.y-S.y, L=Math.hypot(dx,dy), st=ZFAIR.SPD*dt;
    if(L<=st){ S.x=tg.x; S.y=tg.y; if(S.path&&S.path[S.i])S.i++; else if(S.phase==='back')ZFAIR.arrive(S); } else { S.x+=dx/L*st; S.y+=dy/L*st; }
    S.im.setPosition(S.x,S.y+12); S.im.setDepth(WR_DEPTH(S.y)); if(S.npc){ S.npc.x=S.x; S.npc.y=S.y; } },
  back:function(S){ var ws=S.ws, B=ws._zfestBoard, to=S.temp&&B?{x:B.x+TILE,y:B.y}:S.home; S.goal=to; S.phase='back'; S.path=(typeof ZWALK!=='undefined'&&ZWALK.route)?ZWALK.route(ws,{x:S.x,y:S.y},to):null; S.i=0;
    if(!S.path)S.path=[to]; else S.path.push(to); },
  arrive:function(S){ S.phase='stand'; if(S.temp){ var ws=S.ws; S.im.setFlipX(ws.player.x<S.x); } else { ZFAIR.S=null; } },
  end:function(S,gone){ try{ if(S.temp&&S.im&&S.im.scene)S.im.destroy(); }catch(e){} ZFAIR.S=null; } };
if(typeof _heroStatusTick==='function'){ var _hst24=_heroStatusTick; _heroStatusTick=function(sc,dt){ _hst24(sc,dt); try{ ZFAIR.tick(sc); }catch(e){ if(!ZFAIR._err){ ZFAIR._err=1; console.warn('fair greeter',e); } } }; }
