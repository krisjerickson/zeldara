// ═══════════════════════════════════════════════════════════════════════
// ║ 16f-forge-ideas.js — round 62: what makes a forge floor more than a dungeon floor (Kris's ☆ in the Lab's "Realm ideas", Oct 17).
// ║ Card (Kris): "One signature per forge" — HEAT runs in every forge (and Muspelheim); each forge has its own trial:
// ║   · the Ember Forge — BROKKR'S ANVIL: no key lies about; mine ore (veins, and the forge's monsters drop it), forge the floor's rune-key at the anvil
// ║     with three timed hammer strokes while Loki's fly pesters you (swat it — while it buzzes, the strike zone is narrow) (the Prose Edda: Brokkr,
// ║     Eitri and Loki's fly). A flawed key still opens the way, but it shatters — and the shards burn.
// ║   · the Cinder Forge — THE LAVA TIDE: the forge breathes; lava channels across the way rise and fall. Pump the great bellows beside a channel
// ║     to hold it drained and cross before it comes back.
// ║   · the Slag Forge — ORE-CART RAILS: carts on mine rails; ride one through the deep workings (you cannot be hurt while it runs), throw the
// ║     switch to choose the shortcut to the way down or the spur to an ore-laden side gallery.
// ║   · the Ash Forge — FREE THE TOILERS: the spirits mining for Surtharn; break a chain and the spirit follows you; three at your side open the
// ║     spirit door that seals the way down.
// ║   · Muspelheim — a bit of each: the heat (it rises faster there), quench troughs, and the Ragnarök track (16g, ZDOOM).
// ║ HEAT: a gauge fills on every forge floor, faster the deeper you go and faster beside lava; quench troughs (Tab, or stand by them) and steam
// ║ cool it; fire resistance (armour, rings, wards, the Emberward Draught) slows it. Full: you burn (3 % of your health a second) until you cool.
// ║ Painted pieces ordered in wave 64 (fr_*): drawn stand-ins until then.
// ═══════════════════════════════════════════════════════════════════════
var ZFI={ on:true,
  SIG:{ember:'anvil',cinder:'tide',slag:'rails',ash:'toilers'},
  sig:function(sc){ var F=typeof ZFORGE!=='undefined'?ZFORGE.of(sc):null; return F?ZFI.SIG[F.k]:null; },
  hot:function(sc){ return !!(sc&&(sc._forge||sc._musp)); },
  grid:function(sc){ try{ var id=sc._musp?'muspelheim':('forge_'+ZFORGE.of(sc).k), n=sc._musp?ZMUSP.FLOORS:ZFORGE.FLOORS; return ZSP.design(id,n).floors[sc.floor]; }catch(e){ return null; } },
  walk:function(sc,x,y){ var t=(sc.dtiles[y]||[])[x]; return t!==undefined&&t!==DNG.WALL; },
  // the way through a floor: entry → the way down (or the hearth hall's chest), over walkable cells
  path:function(sc){ if(sc._zfPath)return sc._zfPath; var a=sc.stairsUpTile, b=sc.stairsDownTile||sc.bossChestTile; if(!a||!b)return (sc._zfPath=[]);
    var W=DW, H=DH, prev=new Int32Array(W*H).fill(-1), q=[a.y*W+a.x], h=0; prev[q[0]]=q[0];
    while(h<q.length){ var k=q[h++], x=k%W, y=(k/W)|0; if(x===b.x&&y===b.y)break; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var nx=x+d[0], ny=y+d[1]; if(nx<0||ny<0||nx>=W||ny>=H)return; var n=ny*W+nx; if(prev[n]>=0||!ZFI.walk(sc,nx,ny))return; prev[n]=k; q.push(n); }); }
    var out=[], k2=b.y*W+b.x; if(prev[k2]<0)return (sc._zfPath=[]); while(k2!==a.y*W+a.x){ out.push([k2%W,(k2/W)|0]); k2=prev[k2]; } out.push([a.x,a.y]); out.reverse(); return (sc._zfPath=out); },
  px:function(t){ return {x:t[0]*TILE+TILE/2,y:t[1]*TILE+TILE/2}; },
  // a free walkable cell near (x, y), not on the path itself
  near:function(sc,x,y,r0,r1,avoidPath){ var P=avoidPath?ZFI.path(sc):[], onP={}; P.forEach(function(t){ onP[t[1]*DW+t[0]]=1; });
    for(var r=r0;r<=r1;r++)for(var a=0;a<16;a++){ var X=Math.round(x+Math.cos(a/16*Math.PI*2)*r), Y=Math.round(y+Math.sin(a/16*Math.PI*2)*r); if((sc.dtiles[Y]||[])[X]===DNG.FLOOR&&!onP[Y*DW+X]&&(!sc._labReach||sc._labReach[Y*DW+X]))return [X,Y]; } return null; },
  // a painted piece, or its drawn stand-in
  prop:function(sc,id,x,y,draw,m){ var Z=typeof _scn==='function'?_scn():null; if(Z&&Z.has&&Z.has(id)){ var im=Z.image(sc,id,x,y+10,(m||1)*Z.K,y/1e4+5); if(im)return im; }
    var g=sc.add.graphics().setDepth(y/1e4+5); draw(g,x,y); return g; },
  label:function(sc,x,y,t,col){ return domText(sc,x,y,t,{fontSize:'9px',color:col||'#ffd0a0',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(9000); },
  ps:function(sc){ return sc.worldScene&&sc.worldScene.playerState; },
  hurt:function(sc,frac,why){ var ps=ZFI.ps(sc); if(!ps||ps.godMode)return; var d=Math.max(1,Math.round(ps.maxHp*frac)); ps.hp=Math.max(0,ps.hp-d); if(sc._floatText)sc._floatText(sc.px,sc.py-30,'-'+d+(why||''),'#ff8040'); if(ps.hp<=0&&sc._playerDied)sc._playerDied(); },

  // ══ HEAT ══
  heatRate:function(sc){ var base=sc._musp?3.2+sc.floor*0.9:1.6+sc.floor*1.1, G=ZFI.grid(sc), tx=Math.floor(sc.px/TILE), ty=Math.floor(sc.py/TILE), lava=0;
    if(G&&G.g){ for(var j=-2;j<=2;j++)for(var i=-2;i<=2;i++){ var X=tx+i, Y=ty+j; if(X>=0&&Y>=0&&X<G.w&&Y<G.h&&G.g[Y*G.w+X]===3)lava++; } }
    if(sc._zfTide&&sc._zfTide.some(function(T){ return T.up&&T.cells.some(function(c){ return Math.abs(c[0]-tx)<=2&&Math.abs(c[1]-ty)<=2; }); }))lava+=6;
    var r=base+lava*0.45, S=typeof ZHit!=='undefined'?ZHit.sums(ZFI.ps(sc)):{res:{}}; return r*(1-Math.min(0.75,(S.res&&S.res.fire)||0)); },
  heatTick:function(sc,dt){ if(!ZFI.hot(sc))return; if(sc._heat===undefined)sc._heat=0; var cool=(sc._zfTroughs||[]).some(function(T){ return Math.hypot(T.x-sc.px,T.y-sc.py)<TILE*2.2; });
    if(cool)sc._heat=Math.max(0,sc._heat-30*dt); else if(!(sc._zfRide&&sc._zfRide.on))sc._heat=Math.min(100,sc._heat+ZFI.heatRate(sc)*dt);
    if(sc._heat>=100){ sc._heatBurn=(sc._heatBurn||0)+dt; if(sc._heatBurn>=1){ sc._heatBurn=0; ZFI.hurt(sc,0.03,' 🔥'); if(!sc._heatSaid){ sc._heatSaid=1; showNotif('🔥 The heat is too much — you are burning! Find a quench trough (or a fire ward) to cool down.','#ff7040'); } } }
    else if(sc._heat<70)sc._heatSaid=0;
    ZFI.heatHud(sc); },
  heatHud:function(sc){ var el=document.getElementById('zheat'); if(!sc||!ZFI.hot(sc)||!sc.sys||!sc.sys.isActive()){ if(el)el.style.display='none'; return; }
    if(!el){ el=document.createElement('div'); el.id='zheat'; el.style.cssText='position:fixed;left:50%;top:106px;transform:translateX(-50%);z-index:40;width:220px;pointer-events:none;font:600 11px "Segoe UI",sans-serif;color:#ffd0a0;text-align:center;text-shadow:0 1px 2px #000';
      el.innerHTML='<div>🔥 Heat <span id="zheat-v"></span></div><div style="height:8px;border-radius:4px;background:rgba(20,10,8,.8);border:1px solid rgba(255,160,90,.5);overflow:hidden"><div id="zheat-f" style="height:100%;width:0;background:linear-gradient(90deg,#ffb050,#ff4020)"></div></div>'; document.body.appendChild(el); }
    el.style.display='block'; var v=Math.round(sc._heat||0), f=document.getElementById('zheat-f'), t=document.getElementById('zheat-v'); if(f)f.style.width=v+'%'; if(t)t.textContent=v>=100?'— BURNING':v+' %'; if(f)f.style.background=v>=100?'#ff2010':'linear-gradient(90deg,#ffb050,#ff4020)'; },
  troughs:function(sc,n){ sc._zfTroughs=[]; var P=ZFI.path(sc); if(P.length<8)return; for(var i=0;i<n;i++){ var t=P[Math.floor(P.length*(i+0.6)/(n+0.6))], c=ZFI.near(sc,t[0],t[1],2,5,true); if(!c)continue; var p=ZFI.px(c);
      var o={type:'zf_trough',x:p.x,y:p.y,opened:false}; o.vis=ZFI.prop(sc,'fr_quench',p.x,p.y,function(g,x,y){ g.fillStyle(0x000000,0.25).fillEllipse(x,y+10,46,12); g.fillStyle(0x4a4a52,1).fillRoundedRect(x-22,y-8,44,18,5); g.fillStyle(0x3a90c8,1).fillRoundedRect(x-18,y-5,36,10,4); g.fillStyle(0xbfe8ff,0.6).fillRect(x-14,y-4,10,2); });
      sc._zfTroughs.push(o); sc.interactables.push(o); } },

  // ══ the Ember Forge: Brokkr's anvil ══
  anvil:function(sc){ if(sc.isLastFloor||!sc.stairsDownTile)return; var P=ZFI.path(sc), end=P[P.length-1]||[sc.stairsDownTile.x,sc.stairsDownTile.y], c=ZFI.near(sc,end[0],end[1],3,7,false)||ZFI.near(sc,end[0],end[1],2,10,false); if(!c)return; var p=ZFI.px(c), self=sc;
    sc._zfKey=false; sc._zfOre=0; var o={type:'zf_anvil',x:p.x,y:p.y,opened:false}; o.vis=ZFI.prop(sc,'fr_anvil',p.x,p.y,function(g,x,y){ g.fillStyle(0x000000,0.3).fillEllipse(x,y+12,54,12); g.fillStyle(0x3a2a20,1).fillRect(x-10,y-2,20,14); g.fillStyle(0x4a4a54,1).fillRoundedRect(x-26,y-14,52,12,3); g.fillStyle(0x6a6a74,1).fillTriangle(x+26,y-14,x+38,y-10,x+26,y-6); g.fillStyle(0xff8030,0.9).fillRect(x-8,y-16,16,3); });
    sc.interactables.push(o); sc._zfAnvil=o;
    // the ore veins: three along the way
    var veins=[]; for(var i=0;i<3;i++){ var t=P[Math.floor(P.length*(0.2+i*0.25))]; if(!t)continue; var v=ZFI.near(sc,t[0],t[1],2,6,true); if(!v)continue; var vp=ZFI.px(v), V={type:'zf_vein',x:vp.x,y:vp.y,opened:false};
      V.vis=ZFI.prop(sc,'fr_orevein',vp.x,vp.y,function(g,x,y){ g.fillStyle(0x3a3230,1).fillRoundedRect(x-18,y-18,36,28,8); [[-8,-8],[4,-10],[-2,0],[8,-2]].forEach(function(q){ g.fillStyle(0xffa040,1).fillCircle(x+q[0],y+q[1],3); g.fillStyle(0xffe0a0,1).fillCircle(x+q[0]-1,y+q[1]-1,1); }); }); veins.push(V); sc.interactables.push(V); }
    sc._zfVeins=veins;
    // Loki's fly: buzzes round the anvil
    var fly=sc.add.container(p.x,p.y-40).setDepth(9000), body=sc.add.circle(0,0,3,0x203018,1), wl=sc.add.ellipse(-4,-3,7,4,0xdff0ff,0.75), wr=sc.add.ellipse(4,-3,7,4,0xdff0ff,0.75); fly.add([wl,wr,body]); sc._zfFly={c:fly,t:0,alive:true,ax:p.x,ay:p.y};
    sc.tweens.add({targets:[wl,wr],scaleY:0.2,duration:40,yoyo:true,repeat:-1});
    showNotif('⚒ The Ember Forge: no key lies about here — mine ore (3) and forge this floor\'s rune-key at Brokkr\'s anvil. Swat Loki\'s fly (attack it) or your strokes go wild.','#ffb070'); },
  flyTick:function(sc,dt){ var F=sc._zfFly; if(!F||!F.alive)return; F.t+=dt; var tx=sc.px, ty=sc.py, near=Math.hypot(sc.px-F.ax,sc.py-F.ay)<TILE*6, cx=near?tx:F.ax, cy=near?ty-24:F.ay-30;
    F.c.x+=(cx+Math.cos(F.t*5.3)*26-F.c.x)*Math.min(1,dt*3); F.c.y+=(cy+Math.sin(F.t*7.1)*18-F.c.y)*Math.min(1,dt*3);
    if(Phaser.Input.Keyboard.JustDown(sc.keys.SPACE)&&Math.hypot(F.c.x-sc.px,F.c.y-sc.py)<56){ F.alive=false; sc.tweens.add({targets:F.c,alpha:0,scale:0.2,duration:300,onComplete:function(){ F.c.destroy(); }}); if(sc._floatText)sc._floatText(F.c.x,F.c.y-10,'Swat! Loki flees','#c8f0a0'); } },
  mine:function(sc,V){ V.opened=true; sc._zfOre=(sc._zfOre||0)+1; if(V.vis)sc.tweens.add({targets:V.vis,alpha:0.3,duration:300}); if(sc._floatText)sc._floatText(V.x,V.y-30,'+1 ore ('+sc._zfOre+' / 3)','#ffc070'); },
  forge:function(sc){ if(sc._zfKey){ showNotif('⚒ The rune-key is forged — the way down is open.','#ffb070'); return; } if((sc._zfOre||0)<3){ showNotif('⚒ Brokkr\'s anvil — you need 3 ore ('+(sc._zfOre||0)+' so far): the veins along the way, and the forge\'s creatures drop it.','#ffb070'); return; }
    if(sc._zfGame)return; var fly=sc._zfFly&&sc._zfFly.alive, zone=fly?0.12:0.26, G=sc._zfGame={n:0,hits:0,t:0,zone:zone,c:0.5+Math.random()*0.3};
    var el=document.createElement('div'); el.id='zf-forge'; el.style.cssText='position:fixed;left:50%;top:38%;transform:translate(-50%,-50%);z-index:60;background:rgba(20,10,6,.92);border:2px solid #ff9040;border-radius:12px;padding:14px 18px;width:360px;color:#ffe0c0;font:600 13px "Segoe UI",sans-serif;text-align:center';
    el.innerHTML='<div style="font-size:16px;margin-bottom:6px">⚒ Brokkr\'s anvil — strike when the glow is in the gold!</div><div style="position:relative;height:22px;background:#2a1a12;border-radius:6px;overflow:hidden"><div id="zf-zone" style="position:absolute;top:0;bottom:0;background:rgba(255,200,80,.55)"></div><div id="zf-mark" style="position:absolute;top:-2px;bottom:-2px;width:6px;background:#fff;box-shadow:0 0 8px #ff8040"></div></div><div id="zf-txt" style="margin-top:8px">Space or Tab to strike — stroke 1 of 3'+(fly?' · Loki\'s fly is buzzing round your hammer!':'')+'</div>';
    document.body.appendChild(el); var zEl=document.getElementById('zf-zone'); zEl.style.left=((G.c-zone/2)*100)+'%'; zEl.style.width=(zone*100)+'%'; },
  forgeTick:function(sc,dt){ var G=sc._zfGame; if(!G)return; G.t+=dt; var u=(Math.sin(G.t*3.4)+1)/2, m=document.getElementById('zf-mark'); if(m)m.style.left='calc('+(u*100)+'% - 3px)';
    if(Phaser.Input.Keyboard.JustDown(sc.keys.SPACE)||Phaser.Input.Keyboard.JustDown(sc.keys.TAB)){ var hit=Math.abs(u-G.c)<=G.zone/2; G.n++; if(hit)G.hits++; if(typeof ZSFX!=='undefined')try{ ZSFX.play('hit'); }catch(e){}
      try{ sc.cameras.main.shake(120,0.004); }catch(e){} var tx=document.getElementById('zf-txt'); if(tx)tx.textContent=(hit?'CLANG! A true stroke.':'A glancing stroke…')+(G.n<3?' — stroke '+(G.n+1)+' of 3':'');
      G.c=0.2+Math.random()*0.6; var zEl=document.getElementById('zf-zone'); if(zEl)zEl.style.left=((G.c-G.zone/2)*100)+'%';
      if(G.n>=3){ var el=document.getElementById('zf-forge'); setTimeout(function(){ if(el)el.remove(); },700); sc._zfGame=null; sc._zfOre-=3; sc._zfKey=G.hits>=3?'true':'flawed';
        showNotif(sc._zfKey==='true'?'⚒ A true rune-key! The way down unlocks.':'⚒ A flawed rune-key — it will open the way once, then shatter.','#ffb070'); } } },
  // ══ the Cinder Forge: the lava tide ══
  tide:function(sc){ var P=ZFI.path(sc); sc._zfTide=[]; if(P.length<16)return; var marks=sc.isLastFloor?[0.45]:[0.33,0.66];
    marks.forEach(function(u,i){ var mid=P[Math.floor(P.length*u)], cells=[], seen={}; for(var j=-2;j<=2;j++){ var t=P[Math.floor(P.length*u)+j]; if(!t)continue; for(var dy=-2;dy<=2;dy++)for(var dx=-2;dx<=2;dx++){ var X=t[0]+dx, Y=t[1]+dy, k=Y*DW+X; if(seen[k]||(sc.dtiles[Y]||[])[X]!==DNG.FLOOR)continue; if(Math.abs(dx)+Math.abs(dy)>3)continue; seen[k]=1; cells.push([X,Y]); } }
      var g=sc.add.graphics().setDepth(1.5).setBlendMode(Phaser.BlendModes.NORMAL); cells.forEach(function(c){ g.fillStyle(0xff5010,1).fillRect(c[0]*TILE,c[1]*TILE,TILE,TILE); g.fillStyle(0xffb040,0.6).fillRect(c[0]*TILE+4,c[1]*TILE+6,TILE-10,4); });
      var T={cells:cells,set:seen,g:g,up:false,t:i*3,hold:0}, bc=ZFI.near(sc,mid[0],mid[1],3,7,true); if(bc){ var bp=ZFI.px(bc), o={type:'zf_bellows',x:bp.x,y:bp.y,opened:false,tide:T};
        o.vis=ZFI.prop(sc,'fr_bellows',bp.x,bp.y,function(gg,x,y){ gg.fillStyle(0x000000,0.3).fillEllipse(x,y+12,50,12); gg.fillStyle(0x6a4a30,1).fillRoundedRect(x-22,y-18,44,26,6); gg.fillStyle(0x8a6040,1).fillRect(x-18,y-14,36,4); gg.fillStyle(0x4a4a50,1).fillRect(x+20,y-6,14,5); }); sc.interactables.push(o); T.bel=o; }
      sc._zfTide.push(T); });
    showNotif('🌋 The Cinder Forge breathes — lava channels rise and fall across the way. Pump the great bellows to hold one drained.','#ffb070'); },
  tideTick:function(sc,dt){ (sc._zfTide||[]).forEach(function(T){ T.t+=dt; if(T.hold>0){ T.hold-=dt; T.up=false; } else { var ph=T.t%11; T.up=ph<6; } var a=T.up?Math.min(1,(T.g.alpha||0)+dt*2):Math.max(0,(T.g.alpha||0)-dt*2); T.g.setAlpha(a);
      if(T.up&&a>0.6){ var tx=Math.floor(sc.px/TILE), ty=Math.floor(sc.py/TILE); if(T.set[ty*DW+tx]&&!(sc._zfRide&&sc._zfRide.on)){ T.burn=(T.burn||0)+dt; if(T.burn>=0.5){ T.burn=0; ZFI.hurt(sc,0.06,' 🌋'); } } } }); },
  pump:function(sc,o){ o.tide.hold=10; o.tide.t=6; showNotif('💨 You heave on the bellows — the channel drains for ten breaths. Cross!','#ffd0a0'); if(o.vis)sc.tweens.add({targets:o.vis,scaleY:0.85,duration:200,yoyo:true,repeat:3}); },
  // ══ the Slag Forge: ore-cart rails ══
  rails:function(sc){ var P=ZFI.path(sc); if(P.length<24||sc.isLastFloor)return; var a=Math.floor(P.length*0.15), b=Math.floor(P.length*0.85), seg=P.slice(a,b+1);
    var g=sc.add.graphics().setDepth(1.6); g.lineStyle(3,0x6a5040,1); for(var side=-1;side<=1;side+=2){ g.beginPath(); seg.forEach(function(t,i){ var p=ZFI.px(t); if(i)g.lineTo(p.x,p.y+side*6); else g.moveTo(p.x,p.y+side*6); }); g.strokePath(); }
    for(var i=0;i<seg.length;i+=1){ var p=ZFI.px(seg[i]); g.fillStyle(0x4a3424,1).fillRect(p.x-9,p.y-2,18,4); }
    var s=ZFI.px(seg[0]), cart={type:'zf_cart',x:s.x,y:s.y,ox:s.x,oy:s.y,opened:false,seg:seg};
    cart.vis=ZFI.prop(sc,'fr_cart',s.x,s.y,function(gg,x,y){ gg.fillStyle(0x000000,0.3).fillEllipse(x,y+12,40,10); gg.fillStyle(0x5a4a40,1).fillRoundedRect(x-18,y-16,36,22,4); gg.fillStyle(0xff9040,1).fillRect(x-14,y-18,28,5); gg.fillStyle(0x222222,1).fillCircle(x-11,y+8,5).fillCircle(x+11,y+8,5); });
    sc.interactables.push(cart); sc._zfCart=cart;
    // the switch: a spur to a side gallery with ore and a chest
    var mid=seg[Math.floor(seg.length*0.5)], sp=ZFI.near(sc,mid[0],mid[1],4,9,true); if(sp){ var lp=ZFI.px(mid), L={type:'zf_switch',x:lp.x+TILE,y:lp.y-TILE,opened:false,spur:sp,on:false};
      L.vis=ZFI.prop(sc,'fr_switch',L.x,L.y,function(gg,x,y){ gg.fillStyle(0x3a3a40,1).fillRect(x-6,y-4,12,10); gg.lineStyle(3,0x8a8a90,1).lineBetween(x,y,x-8,y-18); gg.fillStyle(0xd04020,1).fillCircle(x-8,y-18,4); }); sc.interactables.push(L); sc._zfSwitch=L; }
    showNotif('⛏ The Slag Forge — mine rails run through the deep workings. Ride the ore-cart (you cannot be hurt while it runs); the switch sends it down a spur.','#ffb070'); },
  ride:function(sc,cart){ if(sc._zfRide&&sc._zfRide.on)return; var seg=cart.seg.slice(), S=sc._zfSwitch; if(S&&S.on){ var m=Math.floor(seg.length*0.5); seg=seg.slice(0,m+1); seg.push(S.spur); }
    var R=sc._zfRide={on:true,i:0,u:0,seg:seg,cart:cart}; sc.playerIFrames=999; showNotif(S&&S.on?'🛒 Down the spur!':'🛒 Hold on — the cart rattles off into the deep workings!','#ffd0a0'); },
  rideTick:function(sc,dt){ var R=sc._zfRide; if(!R||!R.on)return; var now=Date.now(); dt=Math.min(1,(now-(R.last||now))/1000); R.last=now; R.u+=dt*10;      /* real time: a slow frame must not slow the cart */ while(R.u>=1&&R.i<R.seg.length-1){ R.u-=1; R.i++; } var a=ZFI.px(R.seg[R.i]), b=ZFI.px(R.seg[Math.min(R.seg.length-1,R.i+1)]), u=Math.min(1,R.u);
    sc.px=a.x+(b.x-a.x)*u; sc.py=a.y+(b.y-a.y)*u; if(sc.pCont)sc.pCont.setPosition(sc.px,sc.py); if(R.cart.vis){ var gr=R.cart.vis.type==='Graphics'; R.cart.vis.x=gr?sc.px-R.cart.ox:sc.px; R.cart.vis.y=gr?sc.py-R.cart.oy:sc.py+15; }
    if(R.i>=R.seg.length-1){ R.on=false; sc.playerIFrames=0.5; var e=ZFI.px(R.seg[R.seg.length-1]); R.cart.x=e.x; R.cart.y=e.y; R.cart.seg=R.seg.slice().reverse(); if(sc._zfSwitch&&sc._zfSwitch.on&&!sc._zfSpurDone){ sc._zfSpurDone=1; sc._zfOre=(sc._zfOre||0)+2; if(sc._openChest)try{ sc._openChest(); }catch(err){} showNotif('⛏ The side gallery: an ore-laden cart and a chest!','#ffd060'); } } },
  // ══ the Ash Forge: free the toilers ══
  toilers:function(sc){ sc._zfFollow=[]; if(sc.isLastFloor||!sc.stairsDownTile)return; var d=sc.stairsDownTile, p=ZFI.px([d.x,d.y]);
    var door={type:'zf_spiritdoor',x:p.x,y:p.y,opened:false}; door.vis=ZFI.prop(sc,'fr_spiritdoor',p.x,p.y,function(g,x,y){ g.fillStyle(0x203040,0.85).fillRoundedRect(x-22,y-44,44,52,{tl:22,tr:22,bl:2,br:2}); g.lineStyle(3,0x9fe8ff,0.9).strokeRoundedRect(x-22,y-44,44,52,{tl:22,tr:22,bl:2,br:2}); g.fillStyle(0x9fe8ff,0.8).fillCircle(x,y-20,5); });
    sc.interactables.push(door); sc._zfDoor=door;
    if(sc.floor===0){ var P=ZFI.path(sc); for(var i=0;i<4;i++){ var t=P[Math.floor(P.length*(0.2+i*0.18))]; if(!t)continue; var c=ZFI.near(sc,t[0],t[1],2,6,true); if(!c)continue; var q=ZFI.px(c), L=typeof ZSPIRIT40!=='undefined'?ZSPIRIT40:[], r=L[(i*7+3)%Math.max(1,L.length)];
        var o={type:'forge_spirit',sid:'ash_f0_'+i,name:r?r[1]:'A toiler',x:q.x,y:q.y,opened:false}; var id=r?'sp_u_'+r[0]+'_bound':null; o.vis=id&&typeof ZSPM!=='undefined'?ZSPM.make(sc,id,q.x,q.y+10,'bound',{depth:q.y+20}):null; if(o.vis)o.vis.setDepth(q.y/1e4+5);
        o.lbl=ZFI.label(sc,q.x,q.y-60,'⛓ '+o.name,'#9fe8ff'); sc.interactables.push(o); (sc._forgeSp=sc._forgeSp||[]).push(o); } }
    showNotif('⛓ The Ash Forge — the spirits toil here for Surtharn. Break their chains: freed toilers follow you, and three at your side open the spirit door.','#9fe8ff'); },
  follow:function(sc,o){ var self=sc, v=null; if(typeof ZSPM!=='undefined'){ var L=typeof ZSPIRIT40!=='undefined'?ZSPIRIT40:[], r=L.find(function(q){ return q[1]===o.name; }); if(r)v=ZSPM.make(sc,'sp_u_'+r[0]+'_free',o.x,o.y,'free',{depth:o.y/1e4+6}); }
    if(!v)v=sc.add.circle(o.x,o.y,7,0x9fe8ff,0.85).setBlendMode(Phaser.BlendModes.ADD).setDepth(9000); sc._zfFollow.push({v:v,i:sc._zfFollow.length}); showNotif('✨ '+o.name+' follows you — '+sc._zfFollow.length+' / 3 for the spirit door.','#9fe8ff'); },
  followTick:function(sc,dt){ (sc._zfFollow||[]).forEach(function(F,i){ var a=i*1.4+((Date.now()/1000)*0.6), tx=sc.px+Math.cos(a)*34, ty=sc.py-6+Math.sin(a)*20; F.v.x+=(tx-F.v.x)*Math.min(1,dt*3); F.v.y+=(ty-F.v.y)*Math.min(1,dt*3); if(F.v.setDepth)F.v.setDepth(F.v.y/1e4+6); }); },
  openDoor:function(sc){ var D=sc._zfDoor; if(!D||D.opened)return; D.opened=true; if(D.vis)sc.tweens.add({targets:D.vis,alpha:0,duration:900}); (sc._zfFollow||[]).forEach(function(F,i){ sc.tweens.add({targets:F.v,y:F.v.y-120,alpha:0,duration:1800,delay:i*120,onComplete:function(){ F.v.destroy(); }}); }); sc._zfFollow=[];
    showNotif('✨ The toilers lay their hands on the spirit door — it melts into light. They rise, free.','#9fe8ff'); }
};

// ── the forge creatures drop ore in the Ember Forge ──
setTimeout(function(){ if(typeof DungeonScene==='undefined')return; var D=DungeonScene.prototype;
  var md=D._monsterDied; if(md)D._monsterDied=function(mon){ var r=md.apply(this,arguments); if(this._forge&&ZFI.sig(this)==='anvil'&&!this.isLastFloor&&Math.random()<0.45){ this._zfOre=(this._zfOre||0)+1; if(this._floatText)this._floatText(mon.x,mon.y-50,'+1 ore ('+this._zfOre+')','#ffc070'); } return r; };
  var bi=D._buildInteractables; D._buildInteractables=function(){ var r=bi.apply(this,arguments); this._zfPath=null; this._heat=0; this._zfTide=null; this._zfRide=null; this._zfFly=null; this._zfGame=null; this._zfKey=false; this._zfDoor=null; this._zfFollow=[]; this._zfSwitch=null; this._zfSpurDone=0; this._zfAnvil=null; this._zfVeins=null; this._zfCart=null; this._zfTroughs=[]; this._zfOre=0; this._heatSaid=0;
    var el=document.getElementById('zf-forge'); if(el)el.remove();
    if(ZFI.on&&ZFI.hot(this)){ try{ ZFI.troughs(this,this._musp?3:2); var s=ZFI.sig(this); if(s==='anvil')ZFI.anvil(this); else if(s==='tide')ZFI.tide(this); else if(s==='rails')ZFI.rails(this); else if(s==='toilers')ZFI.toilers(this); }catch(e){ console.warn('forge ideas',e); } }
    return r; };
  var up0=D.update; D.update=function(t,ms){ var r=up0.apply(this,arguments); if(!ZFI.hot(this)||!this._ready||this._playerDead||_anyModalOpen())return r; var dt=Math.min(0.1,ms/1000);
    try{ ZFI.heatTick(this,dt); ZFI.flyTick(this,dt); ZFI.forgeTick(this,dt); ZFI.tideTick(this,dt); ZFI.rideTick(this,dt); ZFI.followTick(this,dt); }catch(e){ if(!this._zfErr){ this._zfErr=1; console.warn('forge ideas tick',e); } } return r; };
  var mv=D._movePlayer; D._movePlayer=function(dt){ if((this._zfRide&&this._zfRide.on)||this._zfGame)return; return mv.apply(this,arguments); };
  var it=D._interact; D._interact=function(){ var self=this; if(this._zfGame||(this._zfRide&&this._zfRide.on))return; if(ZFI.hot(this)){ var near=this.interactables.find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; });
      if(near){ if(near.type==='zf_trough'){ this._heat=0; showNotif('💧 You plunge your arms into the quench trough — the heat hisses away.','#9fe0ff'); return; }
        if(near.type==='zf_vein'){ ZFI.mine(this,near); return; } if(near.type==='zf_anvil'){ ZFI.forge(this); return; } if(near.type==='zf_bellows'){ ZFI.pump(this,near); return; } if(near.type==='zf_cart'){ ZFI.ride(this,near); return; }
        if(near.type==='zf_switch'){ near.on=!near.on; if(near.vis)near.vis.setScale(near.on?-1:1,1); showNotif(near.on?'🔀 The switch clanks over — the cart will take the spur to a side gallery.':'🔀 The switch clanks back — the cart runs on toward the way down.','#ffd0a0'); return; }
        if(near.type==='zf_spiritdoor'){ if((this._zfFollow||[]).length>=3)ZFI.openDoor(this); else showNotif('🚪 A spirit door — it opens for three freed toilers at your side ('+(this._zfFollow||[]).length+' / 3).','#9fe8ff'); return; }
        if(near.type==='stairs_down'&&ZFI.sig(this)==='anvil'&&!this._zfKey){ showNotif('🔒 The way down is sealed with a rune-lock — forge its key at Brokkr\'s anvil.','#ffb070'); return; }
        if(near.type==='stairs_down'&&ZFI.sig(this)==='toilers'&&this._zfDoor&&!this._zfDoor.opened&&(this._zfFollow||[]).length>=3){ ZFI.openDoor(this); return; }
        if(near.type==='stairs_down'&&ZFI.sig(this)==='toilers'&&this._zfDoor&&!this._zfDoor.opened){ showNotif('🚪 The spirit door seals the way down — bring three freed toilers.','#9fe8ff'); return; }
        if(near.type==='stairs_down'&&ZFI.sig(this)==='anvil'&&this._zfKey==='flawed'){ ZFI.hurt(this,0.08,' (the key shatters)'); } } }
    return it.apply(this,arguments); };
  var up=D._updateInteractPrompt; D._updateInteractPrompt=function(){ var r=up.apply(this,arguments), self=this; if(!ZFI.hot(this)||!this.interactPrompt)return r;
    var near=this.interactables.find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; }); if(!near)return r; var t=null;
    if(near.type==='zf_trough')t='[Tab] Quench — cool the heat'; else if(near.type==='zf_vein')t='[Tab] Mine the ore vein'; else if(near.type==='zf_anvil')t=this._zfKey?'The rune-key is forged':'[Tab] Brokkr\'s anvil — forge the rune-key ('+(this._zfOre||0)+' / 3 ore)';
    else if(near.type==='zf_bellows')t='[Tab] Pump the bellows — drain the channel'; else if(near.type==='zf_cart')t='[Tab] Ride the ore-cart'; else if(near.type==='zf_switch')t='[Tab] Throw the switch ('+(near.on?'to the spur':'to the way down')+')';
    else if(near.type==='zf_spiritdoor')t='The spirit door ('+(this._zfFollow||[]).length+' / 3 toilers)'; else if(near.type==='stairs_down'&&ZFI.sig(this)==='anvil'&&!this._zfKey)t='Sealed — forge the rune-key at the anvil';
    if(t)this.interactPrompt.setText(t).setPosition(this.px,this.py-52).setVisible(true); return r; };
  // the Ash Forge: a freed toiler follows you (instead of rising straight away)
  if(typeof ZFORGE!=='undefined'){ var fs=ZFORGE.freeSpirit; ZFORGE.freeSpirit=function(sc,o){ if(ZFI.sig(sc)==='toilers'&&!sc.isLastFloor){ var ps=sc.worldScene.playerState; o.opened=true; ps.forgeFreed=ps.forgeFreed||[]; if(ps.forgeFreed.indexOf(o.sid)<0)ps.forgeFreed.push(o.sid);
      if(o.chain){ var ch=o.chain; sc.tweens.add({targets:ch,alpha:0,duration:400,onComplete:function(){ ch.destroy(); }}); } if(o.lbl)o.lbl.destroy(); if(o.vis)o.vis.destroy(); ZFI.follow(sc,o); return; } return fs.apply(this,arguments); }; }
  // leaving the floor hides the heat bar
  var ex=D._exitToWorld; if(ex)D._exitToWorld=function(){ var el=document.getElementById('zheat'); if(el)el.style.display='none'; var f=document.getElementById('zf-forge'); if(f)f.remove(); return ex.apply(this,arguments); };
},0);
setInterval(function(){ try{ var D=game.scene.getScene('Dungeon'); if(!D||!game.scene.isActive('Dungeon')||!ZFI.hot(D)){ var el=document.getElementById('zheat'); if(el)el.style.display='none'; } }catch(e){} },800);
