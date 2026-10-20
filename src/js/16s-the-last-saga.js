// ═══════════════════════════════════════════════════════════════════════
// ║ 16s-the-last-saga.js — round 71: THE LAST SAGA (doc 30 §15; answers E1–E4).
// ║ Kris: "I haven't seen … the freeing of Odin and Freya from the infinity bubble trap, nor casting the spell that frees them, nor going into
// ║ the great hall after defeating Solmyrk" — E1: walk in and cast; E2: Odin and Freya as painted characters + panels; E4: the village moment,
// ║ the celebration and the credits, all of it.
// ║  · ZLS — the panel sets (ZLAST_SETS, 07zsg) through the cut-scene player (16p ZCUT; placeholders with their lines until painted), the
// ║    village moment, the credits.
// ║  · ZFEAST + FeastHallScene — after Solmyrk falls the citadel shakes and golden doors open behind the high seat; [Tab] walks you into the
// ║    gods' feast hall (room_feast_hall, wave 81; a drawn hall until painted). The two orbs float joined like an infinity sign; [Tab] with the
// ║    Lodestar casts Godsbane into their centre: they crack, burst into shards, and Odin and Freya stand free (07zg); they tell the truth
// ║    ([Tab], six lines) and go ahead to the heart of the city (ps.godsFree). The rune circle (16h) then waits for them.
// ═══════════════════════════════════════════════════════════════════════
var ZLS={ on:true,
  who:function(ps){ return ps&&ps.hero==='f'?'f':'m'; },
  names:function(ps){ var f=ps&&ps.hero==='f'; return {H:f?'Zeldara':'Zeldor',O:f?'Zeldor':'Zeldara'}; },
  // play a set of ZLAST_SETS (or ZSAGA_SETS with o.saga) through ZCUT; done() after (also when it cannot play)
  play:function(ps,k,done){ var S=(typeof ZLAST_SETS!=='undefined'&&ZLAST_SETS[k])||(typeof ZSAGA_SETS!=='undefined'&&ZSAGA_SETS[k]); if(!S||typeof ZCUT==='undefined'||!ZLS.on){ if(done)done(); return false; }
    var w=ZLS.who(ps), N=ZLS.names(ps); ZCUT.SETS['last_'+k]=S.map(function(p){ return [p[0].replace('{w}',w),p[1].replace(/\{H\}/g,N.H).replace(/\{O\}/g,N.O)]; });
    (ps.lastSeen=ps.lastSeen||[]); if(ps.lastSeen.indexOf(k)<0)ps.lastSeen.push(k); return ZCUT.play('last',k,done); },
  ids:function(ps){ var w=ZLS.who(ps), L=[]; Object.keys(ZLAST_SETS).forEach(function(k){ ZLAST_SETS[k].forEach(function(p){ L.push(p[0].replace('{w}',w)); }); }); return L; },
  // ── the village moment (after the Bifröst): dawn, Odin's lightning, Freya's vines, the land turning green, the celebration, the credits ──
  village:function(ws,L,done){ var ps=ws.playerState, cam=ws.cameras.main, cx=(CENTER_X+0.5)*TILE, cy=(CENTER_Y+2.5)*TILE, at=function(ms,f){ ws.time.delayedCall(ms,function(){ try{ f(); }catch(e){ console.warn('village moment',e); } }); };
    ws._endBusy=true; cam.fadeOut(700,0,0,0);
    at(800,function(){ ws.player.x=cx; ws.player.y=cy+TILE*2.2; ws.player.cont.setPosition(ws.player.x,ws.player.y); cam.stopFollow(); cam.centerOn(cx,cy); cam.fadeIn(900,0,0,0);
      var G=ZFEAST.gods(ws,cx,cy-TILE*0.4,L); var pan=function(k,next){ if(typeof ZEND!=='undefined'&&ZEND.panel&&k==='dawn'&&typeof ZCINE!=='undefined'&&ZCINE.panel)ZCINE.panel(ZEND.panel('dawn'),'Dawn over the village.',4600,next); else next(); };
      at(1200,function(){ pan('dawn',function(){
        showNotif('⚡ '+ 'Odin raises his spear over the Green…','#cfe6ff'); if(G.odin)CHX.busy(G.odin,2.2);
        at(900,function(){ ZLS.bolt(ws,cx,cy-TILE*0.5,L); at(1400,function(){ ZLS.play(ps,'vil_lightning',function(){
          showNotif('🌿 Freya kneels, and the spring runs out of her hands…','#c8f0b0'); if(G.freya)CHX.busy(G.freya,2.2);
          at(900,function(){ ZLS.vines(ws,cx,cy,L); at(1800,function(){ ZLS.play(ps,'vil_vines',function(){
            ps.spiritsHome=1; ps.endingAt=Date.now(); if(ws._villageFolkInit)try{ ws._villageFolkInit(); }catch(e){}      // the land turns green (10zsl, 10zh) while the panels play
            ZLS.play(ps,'vil_land',function(){ ZLS.play(ps,'celebrate',function(){ ZLS.credits(ps,function(){ ZLS.play(ps,'after',function(){
              [G.odin,G.freya].forEach(function(im){ if(im&&im.scene)ws.tweens.add({targets:im,alpha:0,y:im.y-60,duration:1600,onComplete:function(){ im.destroy(); }}); });
              ps.creditsSeen=1; if(done)done(); }); }); }); }); }); }); }); }); }); }); }); }); }); },
  // Odin's lightning: the painted bolt (fx_odin_bolt, as light) or a drawn one
  bolt:function(ws,x,y,L){ var Z=typeof _scn==='function'?_scn():null, cam=ws.cameras.main; try{ cam.flash(500,190,215,255); cam.shake(700,0.01); }catch(e){}
    var im=Z&&Z.has('fx_odin_bolt')?Z.image(ws,'fx_odin_bolt',x,y+10,1.6,9600):null;
    if(im){ im.setBlendMode(Phaser.BlendModes.ADD); L.push(im); ws.tweens.add({targets:im,alpha:0,delay:500,duration:900}); }
    else { var g=ws.add.graphics().setDepth(9600).setBlendMode(Phaser.BlendModes.ADD); L.push(g); var draw=function(w,a){ var px=x, py=y-700; g.lineStyle(w,0xcfe6ff,a); g.beginPath(); g.moveTo(px,py); for(var i=1;i<=14;i++){ px=x+(Math.random()-0.5)*60*(1-i/14); py=y-700+i*50; g.lineTo(px,py); } g.strokePath(); };
      draw(14,0.25); draw(5,0.9); ws.tweens.add({targets:g,alpha:0,delay:450,duration:900}); }
    var ring=ws.add.circle(x,y,10,0x9fd8ff,0.6).setDepth(9590).setBlendMode(Phaser.BlendModes.ADD); L.push(ring); ws.tweens.add({targets:ring,radius:260,alpha:0,duration:1400,ease:'Cubic.out'}); },
  // Freya's vines: the painted spreading vines (fx_freya_vines) or drawn green tendrils racing out
  vines:function(ws,x,y,L){ var Z=typeof _scn==='function'?_scn():null, im=Z&&Z.has('fx_freya_vines')?Z.image(ws,'fx_freya_vines',x,y+20,1,9550):null;
    if(im){ im.setBlendMode(Phaser.BlendModes.ADD).setScale(im.scaleX*0.2); L.push(im); ws.tweens.add({targets:im,scaleX:im.scaleX*12,scaleY:im.scaleY*12,alpha:0,duration:2600,ease:'Sine.out'}); return; }
    var g=ws.add.graphics().setDepth(9550).setBlendMode(Phaser.BlendModes.ADD); L.push(g); var T=[]; for(var i=0;i<18;i++)T.push({a:i/18*Math.PI*2,c:0});
    ws.tweens.addCounter({from:0,to:1,duration:2200,onUpdate:function(tw){ var v=tw.getValue(); g.clear(); T.forEach(function(t,i){ g.lineStyle(3,0x7fe08a,0.8*(1-v*0.5)); g.beginPath(); g.moveTo(x,y); for(var s=1;s<=20;s++){ var u=s/20*v, r=u*420, a=t.a+Math.sin(u*9+i)*0.25; g.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r*0.6); } g.strokePath(); g.fillStyle(0xffffff,0.8); g.fillCircle(x+Math.cos(t.a)*v*420,y+Math.sin(t.a)*v*252,3); }); },onComplete:function(){ ws.tweens.add({targets:g,alpha:0,duration:900}); }}); },
  // ── the credits: scrolling over the painted backdrop (pn_credits) ──
  CREDITS:function(ps){ var N=ZLS.names(ps), sp=typeof ZSPIRIT40!=='undefined'?ZSPIRIT40:[], R=['Grasslands','Wetlands','Highlands','Ashlands'];
    var h=['<h1>THE QUESTS OF<br>ZELDARA AND ZELDOR</h1>','<p class="b">Created by</p><p>Kris Erickson</p>','<p class="b">Story, world and design</p><p>Kris Erickson</p>','<p class="b">Code, story drafts and art direction</p><p>with Claude</p>',
      '<p class="b">Painted art</p><p>made with an image model from our own descriptions</p>','<p class="b">Built with</p><p>Phaser 3</p>','<p class="b">The twins</p><p>'+N.H+', who went out — and '+N.O+', who kept the village</p>','<p class="b">The gods</p><p>Odin, the Allfather · Freya, the Lady of the Fields</p>'];
    R.forEach(function(r,q){ var L=sp.filter(function(s){ return s[3]===q+1; }).map(function(s){ return s[1]+', '+s[2].replace(/^an? /,''); }); if(L.length)h.push('<p class="b">The spirits of the '+r+'</p><p class="s">'+L.join('<br>')+'</p>'); });
    h.push('<p class="b">And every hamlet, every child born again</p><p>Runeheim is green again.</p>','<h2>Thanks for playing.</h2>'); return h.join(''); },
  credits:function(ps,done){ if(typeof document==='undefined'){ if(done)done(); return; } var el=document.createElement('div'); el.id='zls-credits'; var src=typeof ZCUT!=='undefined'&&ZCUT.painted('pn_credits'), ended=false;
    el.style.cssText='position:fixed;inset:0;z-index:9990;background:#02040a '+(src?'url('+src+') center/cover':'radial-gradient(ellipse at 50% 30%,#13243a,#02040a 70%)')+';overflow:hidden;cursor:pointer;opacity:0;transition:opacity .8s';
    el.innerHTML='<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,4,10,.55),rgba(2,4,10,.25) 40%,rgba(2,4,10,.6))"></div><div class="zls-roll">'+ZLS.CREDITS(ps)+'</div><button class="zls-skip">Skip ▶▶</button>';
    if(!document.getElementById('zls-css')){ var st=document.createElement('style'); st.id='zls-css'; st.textContent='#zls-credits .zls-roll{position:absolute;left:0;right:0;top:100%;text-align:center;color:#f4ead0;font:18px Georgia,serif;text-shadow:0 2px 8px #000;animation:zlsroll 52s linear forwards}'+
      '#zls-credits h1{font:700 44px Georgia,serif;color:#f2c14e;letter-spacing:.06em;margin:0 0 70px}#zls-credits h2{font:italic 30px Georgia,serif;color:#f2c14e;margin:90px 0 40vh}#zls-credits p{margin:4px 0}#zls-credits p.b{margin-top:44px;font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:#bff6ff}#zls-credits p.s{font-size:15px;line-height:1.55;color:#e8e0cc}'+
      '#zls-credits .zls-skip{position:absolute;right:18px;bottom:3vh;font:600 13px Segoe UI,sans-serif;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.4);background:rgba(20,20,26,.7);color:#eee;cursor:pointer}'+
      '@keyframes zlsroll{from{transform:translateY(0)}to{transform:translateY(-100%) translateY(-100vh)}}'; document.head.appendChild(st); }
    document.body.appendChild(el); var end=function(){ if(ended)return; ended=true; document.removeEventListener('keydown',key,true); el.style.opacity='0'; setTimeout(function(){ el.remove(); if(done)done(); },800); },
      key=function(e){ if(!document.getElementById('zls-credits'))return; if(e.key==='Escape'||e.key===' '||e.key==='Enter'){ e.preventDefault(); e.stopImmediatePropagation(); end(); } };
    document.addEventListener('keydown',key,true); el.querySelector('.zls-skip').onclick=function(e){ e.stopPropagation(); end(); }; el.querySelector('.zls-roll').addEventListener('animationend',end);
    requestAnimationFrame(function(){ el.style.opacity='1'; }); ZLS._credEnd=end; }
};
if(typeof ZCUT!=='undefined'&&ZCUT.LOOK&&!ZCUT.LOOK.last)ZCUT.LOOK.last={bg:['#1c1a10','#04050a'],glow:'rgba(255,236,170,',sub:'#fff2b0'};

// ── the gods and the feast hall ──
var ZFEAST={ W:1152, H:768,
  LINES:[['odin','You came. Thirty-six winters we slept in our own light — and still you came.'],['freya','Do you know why the runestones light for you? Why your eyes shone on the lake?'],
    ['odin','The night the false one took us, we had one breath of light left. We spent it on you — two sparks, one for each of you.'],['freya','We sent you down in the storm. The lightning woke the runestones, so that one day they would wake for you.'],
    ['odin','You are our last gift to Runeheim. And you have given it back to us.'],['freya','Come. The spirits have waited long enough. Meet us at the heart of the city — and bring the Lodestar.']],
  GOD:{odin:{id:'god_odin',n:'Odin, the Allfather',col:'#9fc8ff'},freya:{id:'god_freya',n:'Freya, the Lady of the Fields',col:'#a8e8a0'}},
  // the two gods as characters in a scene (painted once round 75 is in; drawn stand-ins until then)
  gods:function(sc,x,y,L){ var G={}; [['odin',-56],['freya',56]].forEach(function(g){ var im=typeof CHX!=='undefined'?CHX.sprite(sc,ZFEAST.GOD[g[0]].id,x+g[1],y,1.45):null; if(!im)return;
      im.setDepth(typeof WR_DEPTH==='function'&&sc.wd?WR_DEPTH(y):y+20).setAlpha(0); im.setFlipX(g[1]>0); sc.tweens.add({targets:im,alpha:1,duration:1200}); G[g[0]]=im; if(L)L.push(im);
      var ring=sc.add.ellipse(x+g[1],y+4,70,22,0xfff0b0,0.35).setBlendMode(Phaser.BlendModes.ADD).setDepth(im.depth-1); if(L)L.push(ring); sc.tweens.add({targets:ring,alpha:0.12,duration:1600,yoyo:true,repeat:-1}); }); return G; },
  // the doors behind the high seat once Solmyrk has fallen (citadel floor 5)
  door:function(sc){ if(!sc||!sc._asgc||sc._fhDoor)return; var ps=sc.worldScene&&sc.worldScene.playerState; if(!ps||!ps.grimnirDown||ps.godsFree)return; var b=sc.bossChestTile; if(!b)return;
    var spot=null; for(var r=2;r<=6&&!spot;r++)for(var dx=-r;dx<=r&&!spot;dx++){ var tx=b.x+dx, ty=b.y-r, x=tx*TILE+TILE/2, y=ty*TILE+TILE/2; if(!sc._canGoD||sc._canGoD(x,y))spot={x:x,y:y,tx:tx,ty:ty}; }
    if(!spot)spot={x:b.x*TILE+TILE/2+TILE*3,y:b.y*TILE+TILE/2,tx:b.x+3,ty:b.y};
    var it={type:'feast_door',x:spot.x,y:spot.y,tx:spot.tx,ty:spot.ty,opened:false}; sc.interactables.push(it); sc._fhDoor=it;
    var Z=typeof _scn==='function'?_scn():null, im=Z&&Z.has('fh_doors_open')?Z.image(sc,'fh_doors_open',spot.x,spot.y+TILE*0.4,1,spot.y):null;
    if(!im){ var g=sc.add.graphics().setDepth(spot.y); g.fillStyle(0x1a1408,1).fillRect(spot.x-26,spot.y-60,52,66); g.fillStyle(0xfff0b0,0.85).fillRect(spot.x-18,spot.y-52,36,58); g.lineStyle(3,0xf2c14e,1).strokeRect(spot.x-26,spot.y-60,52,66); im=g; }
    var gl=sc.add.image(spot.x,spot.y-20,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(0xfff0b0).setAlpha(0.5).setScale(1.6).setDepth(spot.y+1); sc.tweens.add({targets:gl,alpha:0.25,duration:1400,yoyo:true,repeat:-1});
    showNotif('🚪 Behind the high seat, golden doors stand open — the feast hall of the gods. [Tab] at the doors.','#fff2b0'); },
  // into the hall: from the citadel (Dungeon) or, for an older save, from the rune circle (World)
  enter:function(from,key){ var ws=key==='World'?from:from.worldScene; if(!ws)return; try{ if(key==='Dungeon'){ var dh=document.getElementById('dungeon-hud'); if(dh)dh.style.display='none'; } else { var hd=document.getElementById('hud'); if(hd)hd.style.display='none'; } }catch(e){}
    game.scene.sleep(key); game.scene.run('FeastHall',{worldScene:ws,from:key}); },
  // a drawn hall until the painted one is in (and the same hall alive again)
  standin:function(lit){ var W=ZFEAST.W, H=ZFEAST.H, c=document.createElement('canvas'); c.width=W; c.height=H; var x=c.getContext('2d');
    var g=x.createLinearGradient(0,0,0,H); g.addColorStop(0,lit?'#6a5430':'#2a2618'); g.addColorStop(1,lit?'#3a2c18':'#14120c'); x.fillStyle=g; x.fillRect(0,0,W,H);
    x.fillStyle=lit?'#e8dcc0':'#8a8474'; x.fillRect(0,0,W,H*0.2); x.fillRect(0,0,W*0.08,H); x.fillRect(W*0.92,0,W*0.08,H);      // white stone walls
    x.fillStyle='rgba(0,0,0,.25)'; x.fillRect(0,H*0.2-8,W,8);
    for(var i=0;i<6;i++){ x.fillStyle=lit?'rgba(255,240,180,.5)':'rgba(255,240,180,.15)'; x.fillRect(W*0.15+i*W*0.14,H*0.03,W*0.04,H*0.12); }      // high windows
    x.strokeStyle=lit?'rgba(242,193,78,.5)':'rgba(242,193,78,.18)'; x.lineWidth=2; for(var yy=H*0.24;yy<H;yy+=48)for(var xx=W*0.1;xx<W*0.9;xx+=48){ x.strokeRect(xx,yy,48,48); }      // the golden floor
    [[0.18,0.3,0.12,0.5],[0.7,0.3,0.12,0.5]].forEach(function(t){ x.fillStyle='#5a3a1e'; x.fillRect(W*t[0],H*t[1],W*t[2],H*t[3]); x.fillStyle=lit?'#f2c14e':'#7a6a40'; for(var k=0;k<6;k++){ x.beginPath(); x.arc(W*(t[0]+t[2]/2),H*(t[1]+0.05+k*0.08),5,0,Math.PI*2); x.fill(); } });      // the feast tables
    for(var p=0;p<5;p++)[0.14,0.86].forEach(function(px){ x.fillStyle='#4a3018'; x.fillRect(W*px-10,H*(0.26+p*0.15),20,40); });      // pillars
    x.fillStyle='#7a6a50'; x.fillRect(W*0.32,H*0.21,W*0.36,H*0.07); [[0.42,'#3a2a1a'],[0.58,'#c8b890']].forEach(function(s){ x.fillStyle=s[1]; x.fillRect(W*s[0]-26,H*0.11,52,H*0.15); });      // the dais, the two high seats
    x.fillStyle=lit?'rgba(255,140,40,.6)':'rgba(40,30,20,.8)'; x.fillRect(W*0.47,H*0.58,W*0.06,H*0.34);      // the fire trench
    x.fillStyle='#f2c14e'; x.fillRect(W*0.44,H*0.96,W*0.12,H*0.04);      // the doors
    return c; }
};

class FeastHallScene extends Phaser.Scene{
  constructor(){ super('FeastHall'); }
  init(d){ this.worldScene=d.worldScene; this.from=d.from||'Dungeon'; this._busy=false; this._freed=!!(this.worldScene&&this.worldScene.playerState&&this.worldScene.playerState.godsFree); }
  create(){ var self=this, W=ZFEAST.W, H=ZFEAST.H, ps=this.worldScene.playerState; this.wd=null;
    this.cameras.main.setBackgroundColor('#000'); this.cameras.main.setBounds(0,0,W,H); this.cameras.main.setZoom(1.9);
    if(typeof CHX!=='undefined')CHX.glow(this);
    if(!this.textures.exists('dot')){ var dc=document.createElement('canvas'); dc.width=dc.height=8; var dx=dc.getContext('2d'); dx.fillStyle='#fff'; dx.beginPath(); dx.arc(4,4,4,0,Math.PI*2); dx.fill(); this.textures.addCanvas('dot',dc); }
    this._bg(this._freed);
    // the orbs (bound) or the gods (free)
    this.ox=W/2; this.oy=H*0.47;
    if(!this._freed)this._orbs('fh_orbs'); else if(!ps.godsTold)this._godsIn(false);
    // the hero
    var cont=this.add.container(W/2,H*0.9).setDepth(H*0.9); cont.add(this.add.ellipse(0,11,16,5,0x000000,.3)); this.bSprite=_heroAddSprite(this,cont,12); this.bWalkSt=_heroNewState('up'); this.bCont=cont; this.bx=W/2; this.by=H*0.9;
    this.cameras.main.startFollow(cont,true,0.12,0.12);
    this.keys=this.input.keyboard.addKeys({UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',W:'W',A:'A',S:'S',D:'D',TAB:Phaser.Input.Keyboard.KeyCodes.TAB});
    this.input.keyboard.on('keydown-TAB',function(e){ e.preventDefault(); });
    this.prompt=domText(this,W/2,H/2,'',{fontSize:'8px',color:'#ffff88',stroke:'#000',strokeThickness:2,fontFamily:'Segoe UI',align:'center'}).setOrigin(.5).setDepth(9500);
    domText(this,W/2,H*0.995,'▼ Back to the throne hall',{fontSize:'7px',color:'#ffd890',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5,1).setDepth(9300);
    this.add.particles(0,0,'dot',{x:{min:W*0.1,max:W*0.9},y:{min:H*0.2,max:H},lifespan:{min:3000,max:6000},speedY:{min:-8,max:-2},speedX:{min:-4,max:4},scale:{start:0.35,end:0},alpha:{start:0.5,end:0},tint:0xfff0b0,frequency:120,blendMode:'ADD'}).setDepth(9100);
    if(!this._freed&&!ps._fhOrbsSeen){ ps._fhOrbsSeen=1; this.time.delayedCall(700,function(){ ZLS.play(ps,'fh_orbs'); }); }
    else if(this._freed&&!ps.godsTold)showNotif('✨ Odin and Freya wait by the fire — [Tab] to talk with them.','#fff2b0'); }
  // the hall: the painted one (dim / alive) when it is in, the drawn one until then
  _bg(lit){ var self=this, W=ZFEAST.W, H=ZFEAST.H, id=lit?'room_feast_hall_lit':'room_feast_hall', key='fh_bg_'+(lit?'lit':'dim');
    var put=function(k){ if(self._bgIm)self._bgIm.destroy(); self._bgIm=self.add.image(0,0,k).setOrigin(0,0).setDisplaySize(W,H).setDepth(-10); };
    var sk='fh_si_'+(lit?'lit':'dim'); if(!this.textures.exists(sk))this.textures.addCanvas(sk,ZFEAST.standin(lit)); put(sk);
    var src=typeof ZCUT!=='undefined'&&ZCUT.painted(id); if(!src)return;
    if(this.textures.exists(key)){ put(key); return; } this.load.image(key,src); this.load.once('complete',function(){ if(self.sys&&self.textures.exists(key))put(key); }); this.load.start(); }
  _orbs(id){ var Z=typeof _scn==='function'?_scn():null, x=this.ox, y=this.oy; if(this._orbIm){ this._orbIm.destroy(); this._orbIm=null; }
    var im=Z&&Z.has(id)?Z.image(this,id,x,y+80,1,y):null;
    if(im){ var s=Math.min(1.2,300/Math.max(1,im.displayWidth)); im.setScale(im.scaleX*s); }
    else { var c=this.add.container(x,y).setDepth(y); var cr=id==='fh_orbs_crack';
      [-62,62].forEach(function(dx){ c.add(this.add.circle(dx,0,66,0xfff0c0,cr?0.45:0.22).setBlendMode(Phaser.BlendModes.ADD)); c.add(this.add.circle(dx,0,66).setStrokeStyle(3,0xf2c14e,0.9)); c.add(this.add.ellipse(dx,6,40,64,0x2a2418,cr?0.25:0.45)); }, this);
      c.add(this.add.circle(0,0,12,0xfff6d0,0.8).setBlendMode(Phaser.BlendModes.ADD)); im=c; }
    this._orbIm=im; this.tweens.add({targets:im,y:'-=6',duration:1800,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    if(!this._orbGlow){ this._orbGlow=this.add.image(x,y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(0xfff0b0).setScale(4).setAlpha(0.35).setDepth(y-1); this.tweens.add({targets:this._orbGlow,alpha:0.18,duration:1500,yoyo:true,repeat:-1}); } }
  _godsIn(anim){ var G=ZFEAST.gods(this,this.ox,this.oy+40,null); this._gods=G; if(!anim)Object.keys(G).forEach(function(k){ G[k].setAlpha(1); }); }
  update(_,ms){ var dt=Math.min(0.1,ms/1000); if(this._busy||(typeof _anyModalOpen==='function'&&_anyModalOpen())||(typeof ZCUT!=='undefined'&&ZCUT.isOpen()))return; this._move(dt); this._near();
    if(this.by>ZFEAST.H*0.975)this._exit(); }
  _move(dt){ var k=this.keys, spd=110, vx=0, vy=0; if(k.LEFT.isDown||k.A.isDown)vx=-spd; if(k.RIGHT.isDown||k.D.isDown)vx=spd; if(k.UP.isDown||k.W.isDown)vy=-spd; if(k.DOWN.isDown||k.S.isDown)vy=spd; if(vx&&vy){ vx*=.707; vy*=.707; }
    var nx=this.bx+vx*dt, ny=this.by+vy*dt; if(this._can(nx,this.by))this.bx=nx; if(this._can(this.bx,ny))this.by=ny; this.bCont.setPosition(this.bx,this.by).setDepth(this.by+12);
    this.bWalkSt.dir=_heroDirFromVel(vx,vy,this.bWalkSt.dir); _heroAnimate(this,this.bSprite,this.bWalkSt,vx,vy,dt,0,0); }
  // the painted hall (wave 81): walls, the dais, the two long feast tables and the fire trench down the middle are solid
  _can(x,y){ var W=ZFEAST.W, H=ZFEAST.H, u=x/W, v=y/H; if(u<0.1||u>0.9||v<0.3)return false; if(v>0.98&&Math.abs(u-0.5)>0.08)return false;
    if(v>0.33&&v<0.84&&((u>0.17&&u<0.31)||(u>0.69&&u<0.83)))return false; if(v>0.36&&v<0.7&&u>0.46&&u<0.54)return false;
    if(!this._freed&&Math.hypot((x-this.ox)/1.6,y-this.oy-40)<52)return false; return true; }
  _near(){ var ps=this.worldScene.playerState, d=Math.hypot(this.bx-this.ox,this.by-this.oy-50), t='';
    if(!this._freed&&d<120)t=ZASG&&ZASG.hasStaff(ps)?'[Tab] Raise the Lodestar — Godsbane into the centre':'The orbs hum — the Lodestar could break them';
    else if(this._freed&&this._gods&&d<120)t='[Tab] Talk to Odin and Freya';
    this.prompt.setText(t).setVisible(!!t).setPosition(this.bx,this.by-40);
    if(t&&Phaser.Input.Keyboard.JustDown(this.keys.TAB)){ if(this._freed)this._talk(0); else if(ZASG&&ZASG.hasStaff(ps))this._cast(); else showNotif('🌟 Bring the Lodestar — only Godsbane can break the gods\' prison.','#fff2b0'); } }
  // Godsbane into the centre: the orbs crack, burst into shards, and the gods stand free
  _cast(){ var self=this, ps=this.worldScene.playerState, cam=this.cameras.main; this._busy=true; this.prompt.setVisible(false); _heroCastPose(this,'lodestar_raise',3.2);
    var beam=this.add.graphics().setDepth(9400).setBlendMode(Phaser.BlendModes.ADD), x0=this.bx, y0=this.by-30, x1=this.ox, y1=this.oy;
    this.tweens.addCounter({from:0,to:1,duration:900,onUpdate:function(tw){ var v=tw.getValue(); beam.clear(); [[16,0.2],[7,0.5],[2,1]].forEach(function(q){ beam.lineStyle(q[0],0xfff4c8,q[1]); beam.lineBetween(x0,y0,x0+(x1-x0)*v,y0+(y1-y0)*v); }); }});
    try{ cam.shake(1400,0.006); }catch(e){} this.time.delayedCall(950,function(){ self._orbs('fh_orbs_crack'); try{ cam.flash(400,255,250,220); }catch(e){} });
    this.time.delayedCall(1700,function(){ ZLS.play(ps,'fh_cast',function(){ beam.destroy(); self._burst(); }); }); }
  _burst(){ var self=this, ps=this.worldScene.playerState, Z=typeof _scn==='function'?_scn():null, x=this.ox, y=this.oy; try{ this.cameras.main.flash(900,255,255,240); this.cameras.main.shake(600,0.01); }catch(e){}
    if(this._orbIm){ this.tweens.killTweensOf(this._orbIm); this._orbIm.destroy(); this._orbIm=null; } if(this._orbGlow){ this._orbGlow.destroy(); this._orbGlow=null; }
    var b=Z&&Z.has('fh_orbs_burst')?Z.image(this,'fh_orbs_burst',x,y+110,1,9300):null; if(b){ b.setBlendMode(Phaser.BlendModes.ADD); this.tweens.add({targets:b,scaleX:b.scaleX*1.8,scaleY:b.scaleY*1.8,alpha:0,duration:1800,onComplete:function(){ b.destroy(); }}); }
    var em=this.add.particles(x,y,'dot',{speed:{min:40,max:260},angle:{min:0,max:360},lifespan:{min:1400,max:3200},gravityY:30,scale:{start:0.6,end:0},alpha:{start:1,end:0},tint:[0xfff6d0,0xf2c14e,0xffffff],blendMode:'ADD',emitting:false}).setDepth(9350); em.explode(260);
    this.time.delayedCall(1700,function(){ ZLS.play(ps,'fh_free',function(){ self._freed=true; ps.godsFree=1; self._bg(true); self._godsIn(true); if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('the gods are free'); }catch(e){}
      self.time.delayedCall(1400,function(){ ZLS.play(ps,'fh_truth',function(){ self._busy=false; self._talk(0); }); }); }); }); }
  // the truth, in their words ([Tab] for more)
  _talk(i){ var self=this, L=ZFEAST.LINES, P=L[i], G=ZFEAST.GOD[P[0]], last=i+1>=L.length;
    var draw=function(x,t){ if(typeof ZAtlas!=='undefined'&&ZAtlas.drawTo&&ZAtlas.drawTo(x,G.id,['talk','idle'],'f',t,4,2,88,92))return; var R=typeof CHAR_BY_ID!=='undefined'&&CHAR_BY_ID[G.id]; if(R&&typeof chFrames==='function'){ try{ var fr=chFrames(R); x.imageSmoothingEnabled=false; x.drawImage(fr[(t>>2)%fr.length],8,8,80,80); }catch(e){} } };
    if(this._gods&&this._gods[P[0]])CHX.busy(this._gods[P[0]],0.8);
    ZSPIRIT.talk(G.n,G.col,P[1],[{t:last?'Go to the heart of the city ▶':'More…',f:last?function(){ self._goAhead(); }:function(){ self._talk(i+1); }}],draw); }
  _goAhead(){ var self=this, ps=this.worldScene.playerState; ps.godsTold=1; if(typeof FairyTalk!=='undefined')try{ FairyTalk.close(); }catch(e){}
    showNotif('🌟 Odin and Freya go ahead to the rune circle at the heart of Asgard. Meet them there with the Lodestar.','#fff2b0');
    if(this._gods)Object.keys(this._gods).forEach(function(k){ var im=self._gods[k]; self.tweens.add({targets:im,alpha:0,y:im.y-50,duration:1600,onComplete:function(){ im.destroy(); }}); }); this._gods=null; }
  _exit(){ var from=this.from; this.scene.stop('FeastHall'); try{ if(from==='Dungeon'){ var dh=document.getElementById('dungeon-hud'); if(dh)dh.style.display=''; } else { var hd=document.getElementById('hud'); if(hd)hd.style.display=''; } }catch(e){}
    game.scene.wake(from); }
}

// the citadel's hooks: the doors after Solmyrk; [Tab] at them
setTimeout(function(){ if(typeof DungeonScene==='undefined')return; var D=DungeonScene.prototype;
  var ob=D._onBossDefeated; D._onBossDefeated=function(mon){ var r=ob.apply(this,arguments), self=this, ps=this.worldScene&&this.worldScene.playerState;
    if(this._asgc&&this._bossDefeated&&ps&&ps.grimnirDown&&!ps.godsFree&&!this._fhCrumble){ this._fhCrumble=true; setTimeout(function(){ if(!self.sys||!self.sys.isActive())return; try{ self.cameras.main.shake(1200,0.008); }catch(e){} ZLS.play(ps,'fh_crumble',function(){ ZFEAST.door(self); }); },2600); } return r; };
  var bi=D._buildInteractables; D._buildInteractables=function(){ var r=bi.apply(this,arguments), self=this; if(this._asgc&&this.isLastFloor)setTimeout(function(){ try{ ZFEAST.door(self); }catch(e){} },400); return r; };
  var ia=D._interact; D._interact=function(){ var self=this, d=this._fhDoor; if(d&&Math.hypot(this.px-d.x,this.py-d.y)<TILE*1.8){ var ps=this.worldScene.playerState; ZLS.play(ps,'fh_doors',function(){ ZFEAST.enter(self,'Dungeon'); }); return; } return ia.apply(this,arguments); };
  var up=D._updateInteractPrompt; D._updateInteractPrompt=function(){ var r=up.apply(this,arguments), d=this._fhDoor; if(d&&this.interactPrompt&&Math.hypot(this.px-d.x,this.py-d.y)<TILE*1.8)this.interactPrompt.setText('[Tab] Enter the feast hall of the gods').setPosition(this.px,this.py-52).setVisible(true); return r; };
},0);
