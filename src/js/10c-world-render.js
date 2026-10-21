// ═══════════════════════════════════════════════════════════════════════
// ║ WORLD RENDER (Phase 3 · step 2) — streams Lab-painted chunks around the
// ║ camera (05c-world-paint.js does the painting in small time slices), and
// ║ mounts their props as depth-sorted sprites, rune glows, lava flows and
// ║ ley lines. Depth band: ground < 0 < props/hero/monsters (10 + y/1e5).
// ═══════════════════════════════════════════════════════════════════════
var WR_DEPTH=function(y){ return 10+y/100000; };
var WR_LIGHT_D=10.9;
var WR_PARK=14;      // round 46: how many off-screen chunks stay parked on the GPU (about 4 MB each)
var WR_SP_NOW=40;      // round 72 (P3): pictures a chunk makes in the frame it is mounted; the rest follow over the next frames
function WR_CULL(scene){ var cam=scene.cameras.main, v=cam.worldView, id=cam.id, mx=160, x0=v.x-mx, x1=v.right+mx, y0=v.y-mx, y1=v.bottom+mx*1.8, L=scene.children.list, n=0;
  for(var i=0;i<L.length;i++){ var o=L[i], out; if(o.scrollFactorX!==1||o.scrollFactorY!==1||o.type==='Graphics'||o.type==='ParticleEmitter'||o.type==='Layer'||o._noCull)continue;
    if(o.type==='Container'){ out=o.x<x0-160||o.x>x1+160||o.y<y0-160||o.y>y1+160; }
    else { var w=o.displayWidth, h=o.displayHeight; if(!(w>=0)||!(h>=0))continue; var l=o.x-(o.originX||0)*w, t=o.y-(o.originY||0)*h; out=l>x1||l+w<x0||t>y1||t+h<y0; }
    if(out){ if(!(o.cameraFilter&id)){ o.cameraFilter|=id; } n++; } else if(o.cameraFilter&id)o.cameraFilter&=~id; }
  scene._wrCulled=n; }      // round 45: the glows' one layer (scenery and actors are 10–10.45; the hero's outline 10.95)
Object.assign(WorldScene.prototype,{
  _wrInit(){
    if(this._wr)return;
    this._wr={chunks:new Map(),jobs:new Map(),seq:0};
    this.cameras.main.setBackgroundColor('#0f3764');
    var self=this;
    [['glow',128,function(x){ var g=x.createRadialGradient(64,64,0,64,64,64); g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(0.35,'rgba(255,255,255,0.45)'); g.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=g; x.fillRect(0,0,128,128); }],
     ['dot',8,function(x){ var g=x.createRadialGradient(4,4,0,4,4,4); g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=g; x.fillRect(0,0,8,8); }],
     ['leaf',10,function(x){ x.fillStyle='#fff'; x.beginPath(); x.ellipse(5,3,5,2.2,0.4,0,Math.PI*2); x.fill(); }],
     ['zring',32,function(x){ x.strokeStyle='rgba(235,248,255,1)'; x.lineWidth=2; x.beginPath(); x.ellipse(16,8,14,6.5,0,0,Math.PI*2); x.stroke(); }]].forEach(function(q){      // zring: round 40 rain rings on the water
      if(self.textures.exists(q[0]))return; var c=mkCanvas(q[1],q[0]==='leaf'?6:q[0]==='zring'?16:q[1]); q[2](c.getContext('2d')); self.textures.addCanvas(q[0],c); });
    this.events.once('shutdown',function(){ self._wr.chunks.forEach(function(ch){ self._wrUnmount(ch); }); self._wr.chunks.clear(); if(self._wr.parked){ self._wr.parked.forEach(function(ch){ self._wrUnmount(ch); }); self._wr.parked.clear(); } });
  },
  // Keys of chunks the camera needs (visible first), plus a one-chunk halo
  _wrNeeded(){
    if(!this.cameras||!this.cameras.main)return [];   // scene shutting down
    var cam=this.cameras.main, cs=WCH*TILE, out=[], dw=cam.width/cam.zoom, dh=cam.height/cam.zoom;
    var v={x:cam.scrollX+(cam.width-dw)/2, y:cam.scrollY+(cam.height-dh)/2, width:dw, height:dh};
    var x0=Math.floor(v.x/cs)-1, x1=Math.floor((v.x+v.width)/cs)+1, y0=Math.floor(v.y/cs)-1, y1=Math.floor((v.y+v.height)/cs)+1, n=Math.ceil(WORLD_W/WCH);
    var mx=v.x+v.width/2, my=v.y+v.height/2;
    for(var cy=y0;cy<=y1;cy++)for(var cx=x0;cx<=x1;cx++){ if(cx<0||cy<0||cx>=n||cy>=n)continue;
      var vis=!((cx+1)*cs<v.x||cx*cs>v.x+v.width||(cy+1)*cs<v.y||cy*cs>v.y+v.height);
      out.push({key:cx+'_'+cy,cx:cx,cy:cy,vis:vis,d:Math.hypot((cx+0.5)*cs-mx,(cy+0.5)*cs-my)}); }
    out.sort(function(a,b){ return (b.vis-a.vis)||(a.d-b.d); });
    return out;
  },
  _updateChunks(sync){
    if(!this._wr)this._wrInit();
    var W=this._wr, self=this, need=this._wrNeeded(), keep={};
    // round 72 (P3): finish the pictures of chunks mounted in earlier frames, about 3 ms a frame
    if(this._wrPend&&this._wrPend.length){ var tp=performance.now(), PL=this._wrPend; while(PL.length&&(sync||performance.now()-tp<3)){ var pc=PL[0]; if(pc._dead||!pc.pend||!pc.pend.length){ PL.shift(); continue; } var im0=pc.pend.shift()(); if(im0&&pc._off){ im0._wrPv=im0.visible; im0.setVisible(false); } } }
    var rdy={}; (W.ready||[]).forEach(function(r){ rdy[r.key]=1; });
    // round 46 (lag): a chunk that went off-screen is parked (hidden, its pictures kept on the GPU) instead of thrown away, so walking back
    // shows it at once instead of painting it again — repainting the dense village chunks on every return was a long frame each time
    W.parked=W.parked||new Map();
    need.forEach(function(n){ keep[n.key]=1; if(!W.chunks.has(n.key)&&W.parked.has(n.key)&&!W.jobs.has(n.key)){ var pc=W.parked.get(n.key); W.parked.delete(n.key); self._wrShow(pc,true); W.chunks.set(n.key,pc); }
      if(!W.chunks.has(n.key)&&!W.jobs.has(n.key)&&!rdy[n.key])W.jobs.set(n.key,{n:n,job:wpChunkJob(self.wd,n.cx,n.cy)}); });
    // run paint jobs: visible chunks first; more time while something visible is missing
    var missingVis=need.some(function(n){ return n.vis&&!W.chunks.has(n.key)&&!rdy[n.key]; });
    var QB=typeof ZQUAL!=='undefined'?ZQUAL.budget:[6,14], budget=sync?1e9:(missingVis?QB[1]:QB[0]),      /* round 72: smaller on phones (10c2-quality.js) */ t0=performance.now(), PF=typeof ZPERF!=='undefined'&&ZPERF.on;
    // round 44 (lag): a finished chunk is mounted at the start of a later frame, one per frame — mounting uploads big pictures to the GPU, and doing
    // it in the same frame as painting made a long frame every time a chunk was finished
    W.ready=W.ready||[]; if(W.ready.length){ var R0=W.ready.shift(), tm=performance.now(); if(keep[R0.key]||sync){ var old0=W.chunks.get(R0.key); if(old0)this._wrUnmount(old0); W.chunks.set(R0.key,this._wrMount(R0.out)); } if(PF)ZPERF.note('mount',performance.now()-tm); if(!sync)t0=performance.now()-Math.min(budget,performance.now()-tm)*0.5; }
    for(var i=0;i<need.length;i++){ var n=need[i], J=W.jobs.get(n.key); if(!J)continue; if(sync&&!n.vis)continue;
      var left=budget-(performance.now()-t0); if(left<=0)break; var ts=performance.now(), fin=J.job.step(left); if(PF)ZPERF.note('paint',performance.now()-ts);
      if(fin){ W.jobs.delete(n.key); if(sync){ var old=W.chunks.get(n.key); if(old)this._wrUnmount(old); W.chunks.set(n.key,this._wrMount(J.job.out)); } else W.ready.push({key:n.key,out:J.job.out}); } }
    if(sync)while(W.ready.length){ var R1=W.ready.shift(), o1=W.chunks.get(R1.key); if(o1)this._wrUnmount(o1); W.chunks.set(R1.key,this._wrMount(R1.out)); }
    // painter idle: make the ground patterns of the next ring of chunks ahead of time (one per
    // frame at most, re-scanned only when the hero changes chunk or the last scan made one)
    if(!sync&&!W.jobs.size&&this.player){ var pk=Math.floor(this.player.x/(WCH*TILE))+'_'+Math.floor(this.player.y/(WCH*TILE));
      if(W.warmKey!==pk){ if(!_wpWarmAhead(this.wd,this.player.x,this.player.y,3))W.warmKey=pk; } }
    // drop far chunks (and stale jobs)
    W.jobs.forEach(function(J,k){ if(!keep[k]&&!J.refresh)W.jobs.delete(k); });
    W.chunks.forEach(function(ch,k){ if(keep[k])return; var p=k.split('_'), cx=+p[0], cy=+p[1], cam=self.cameras.main, dw=cam.width/cam.zoom, dh=cam.height/cam.zoom, v={x:cam.scrollX+(cam.width-dw)/2,y:cam.scrollY+(cam.height-dh)/2,width:dw,height:dh}, cs=WCH*TILE;
      if(cx*cs>v.x+v.width+cs*1.3||(cx+1)*cs<v.x-cs*1.3||cy*cs>v.y+v.height+cs*1.3||(cy+1)*cs<v.y-cs*1.3){ W.chunks.delete(k); self._wrShow(ch,false); ch._pt=Date.now(); W.parked.set(k,ch);
        if(W.parked.size>WR_PARK){ var oldK=null, oldT=1e18; W.parked.forEach(function(c2,k2){ if(c2._pt<oldT){ oldT=c2._pt; oldK=k2; } }); if(oldK!==null){ self._wrUnmount(W.parked.get(oldK)); W.parked.delete(oldK); } } } });
    // runes near the hero brighten
    if(this.player){ var hx=this.player.x, hy=this.player.y, tt=(this._wrT=(this._wrT||0)+0.016);
      W.chunks.forEach(function(ch){ ch.react.forEach(function(o,i){ var L=o._base; if(o._flicker&&!L.react){ o.setAlpha(L.a*0.8*(1-o._flicker*0.5+o._flicker*0.5*Math.sin(tt*11+i*1.7)*Math.sin(tt*7.3+i))*(1+0.5*(self._night||0))); return; } var near=Math.max(0,1-Math.hypot(hx-o.x,hy-o.y)/150);
        o.setAlpha(Math.min(1,L.a*0.8*(0.72+0.28*Math.sin(tt*1.6+i*0.9))*(1+1.6*near)*(1+0.6*(self._night||0)))); o.setScale((L.r/64)*(1+0.35*near)); }); }); }
  },
  _refreshChunkAt(tx,ty){
    if(!this._wr)return; var cx=Math.floor(tx/WCH), cy=Math.floor(ty/WCH), key=cx+'_'+cy;
    if(this._wr.parked&&this._wr.parked.has(key)){ this._wrUnmount(this._wr.parked.get(key)); this._wr.parked.delete(key); }      // round 46: a parked copy is out of date
    this._wr.jobs.set(key,{n:{key:key,cx:cx,cy:cy},job:wpChunkJob(this.wd,cx,cy),refresh:true});
  },
  _createChunk(cx,cy){ this._refreshChunkAt(cx*WCH,cy*WCH); },
  _wrMount(o){
    var self=this, tag=(this._wrTag||'wc')+(this._wr.seq++), objs=[], keys=[], react=[], x0=o.cx*WCH*LT, y0=o.cy*WCH*LT, tall=[], pend=null;      /* tall: an array from the start, so pictures made later still join it */
    var addTex=function(k,cv){ gpuTex(self,k,cv); keys.push(k); return k; };
    var gs=typeof ZQUAL!=='undefined'?ZQUAL.small(o.canvas):null;      /* round 72 (phones): the ground uploaded at half size, shown at full — a quarter of the upload and of the graphics memory */
    objs.push(this.add.image(x0,y0,addTex(tag,gs?gs.cv:o.canvas)).setOrigin(0,0).setDepth(-10).setScale(gs?gs.k:1));
    if(o.lavaMask){ var mk=addTex(tag+'_m',o.lavaMask);
      // both flowing layers share ONE bitmap mask (each mask costs extra full-screen passes)
      var lc=this.add.container(x0,y0).setDepth(-9), mi=self.make.image({x:x0,y:y0,key:mk,add:false}).setOrigin(0,0);
      [[0,0.7,7,4],[1,0.45,-5,6]].forEach(function(q){ var pk='wlava_'+q[0]; if(!self.textures.exists(pk))self.textures.addCanvas(pk,_lavaPattern(WORLD_SEED,q[0]));
        var ts=self.make.tileSprite({x:0,y:0,width:WCH*LT,height:WCH*LT,key:pk,add:false}).setOrigin(0,0).setAlpha(q[1]).setBlendMode(Phaser.BlendModes.ADD);
        ts._flow={vx:q[2],vy:q[3]}; ts.tilePositionX=x0; ts.tilePositionY=y0; lc.add(ts); });
      ZENG.mask(lc,mi,mk); lc._lava=lc.list; objs.push(lc); objs.push(mi);
    }
    if(o.ley){ var ls=typeof ZQUAL!=='undefined'?ZQUAL.small(o.ley):null, li=this.add.image(x0,y0,addTex(tag+'_ley',ls?ls.cv:o.ley)).setOrigin(0,0).setScale(ls?ls.k:1).setBlendMode(Phaser.BlendModes.ADD).setAlpha(0.8).setDepth(-5); objs.push(li);
      this.tweens.add({targets:li,alpha:0.5,duration:2200,yoyo:true,repeat:-1,ease:'Sine.inOut'}); }
    // sprites → the chunk's atlas (packed by the paint job)
    if(o.atlas){ var at=addTex(tag+'_a',o.atlas), tex=this.textures.get(at);
      var mkSp=function(sp,i){ if(!sp.ap)return; var fn='s'+i; tex.add(fn,0,sp.ap[0],sp.ap[1],sp.aw,sp.ah);
        var im=self.add.image(sp.x,sp.y,at,fn).setOrigin(sp.ox!==undefined?sp.ox:0.5,sp.oy!==undefined?sp.oy:1).setDepth(sp.flat?-6:sp.depth!==undefined&&sp.depth>=7000?WR_DEPTH(sp.y)+0.5:WR_DEPTH(sp.depth!==undefined?sp.depth:sp.y));
        if(sp.res){ im.setScale(1/sp.res); if(!tex._zlin){ tex._zlin=true; try{ tex.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} } }      // painted scenery (04h): drawn at 2 ×, shown at half size, smoothed
        if(sp.bob)self.tweens.add({targets:im,y:sp.y-sp.bob,duration:1400+(i%7)*130,yoyo:true,repeat:-1,ease:'Sine.inOut'});
        if(sp.spin)self.tweens.add({targets:im,angle:360,duration:sp.spin,repeat:-1});
        if(!sp.flat&&sp.canvas&&typeof ZOL!=='undefined')ZOL.keep(im,sp.canvas,sp.res||1,true);      // round 45: the hero's outline shows through it (10o)
        if(sp.zed){ im._zh=sp.ah/(sp.res||1); (tall||(tall=[])).push(im); }      // round 43: a standing edge piece (05d TALL), depth-sorted by its foot
        objs.push(im); return im; };
      // round 72 (P3, doc 33): a busy chunk's pictures are made a batch at a time over the next frames (_wrPend), not all in the frame it arrives
      o.sprites.forEach(function(sp,i){ if(i<WR_SP_NOW)mkSp(sp,i); else (pend||(pend=[])).push(function(){ return mkSp(sp,i); }); });
    }
    // round 43: the pieces that sway (reeds, tufts, flowers…) and loop (steam vents, lava bubbles) — each its own image, moved by _wrTick
    var live=null;
    if(o.live&&o.live.length&&typeof ZWE!=='undefined'){ live=[]; o.live.forEach(function(L){ var A=ZWE.animTex(self,L.an), im;
        if(A){ im=self.add.image(L.x,L.y,A.key,'0').setOrigin(A.ox,A.oy).setScale(A.scale*L.h/A.h); im._zn=A.n; im._zloop=ZWE.LOOP[L.an]||0; }
        else { var T=ZScn.texture(self,L.id,0,{shadow:false}); if(!T)return; var th=self.textures.get(T.key).getSourceImage().height/ZScn.RES; im=self.add.image(L.x,L.y,T.key).setOrigin(0.5,(th-5)/th).setScale(T.scale*L.h/T.h); im._zn=0; im._zloop=0; }
        im.setDepth(L.tall?WR_DEPTH(L.y):-6); im._zr=L.r; im._zdeg=ZWE.SWAYCODE[L.id]||3; im._zf=-1; objs.push(im); live.push(im); if(L.tall){ im._zh=L.h; (tall||(tall=[])).push(im); } }); }
    (o.shafts||[]).forEach(function(sh,i){ var k=addTex(tag+'_sh'+i,sh.canvas); var im=self.add.image(sh.x,sh.y,k).setOrigin(0,0).setBlendMode(Phaser.BlendModes.ADD).setAlpha(sh.a||0.5).setDepth(-5); objs.push(im);
      if(sh.sway)self.tweens.add({targets:im,alpha:(sh.a||0.5)*0.6,duration:2200+i*170,yoyo:true,repeat:-1,ease:'Sine.inOut'}); });
    (o.particles||[]).forEach(function(p){ var e=self._wrEmitter(p,p.area); if(e)objs.push(e); });
    o.lights.forEach(function(L,i){ var d=L.depth!==undefined&&L.depth<0?-4:WR_LIGHT_D;      // round 45 (F9: 335–430 draw calls): every glow on one layer above the scenery, so they draw in one batch instead of breaking it at each lamp
      var im=self.add.image(L.x,L.y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(L.col)).setAlpha(L.a*0.8).setScale(L.r/64).setDepth(d);
      if(L.pulse&&!L.react)self.tweens.add({targets:im,alpha:L.a*0.8*(1-L.pulse),scale:(L.r/64)*(1-L.pulse*0.25),duration:(L.period||1800)+i*37,yoyo:true,repeat:-1,ease:'Sine.inOut'});
      if(L.flicker)im._flicker=L.flicker;
      im._base=L; if(L.react||L.flicker)react.push(im); objs.push(im); });
    // round 40 terrain edges (05d): the moving water as a looping flipbook, and the moving bits Kris picked in the Lab
    var flip=null;
    if(o.flip){ var fk=addTex(tag+'_fl',o.flip.canvas), ft=this.textures.get(fk), FL=o.flip.L, bb=o.flip.bb||[0,0,FL-1,FL-1], bw=bb[2]-bb[0]+1, bh=bb[3]-bb[1]+1, ks=WCH*LT/FL;
      for(var q=0;q<o.flip.nf;q++)ft.add('f'+q,0,q*FL+bb[0],bb[1],bw,bh); try{ ft.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){}      // round 41: only the part of the chunk that moves
      var fa=this.add.image(x0+bb[0]*ks,y0+bb[1]*ks,fk,'f0').setOrigin(0,0).setDisplaySize(bw*ks,bh*ks).setDepth(-8.6), fb=this.add.image(x0+bb[0]*ks,y0+bb[1]*ks,fk,'f1').setOrigin(0,0).setDisplaySize(bw*ks,bh*ks).setDepth(-8.5).setAlpha(0);
      objs.push(fa,fb); flip={a:fa,b:fb,nf:o.flip.nf,T:o.flip.T}; }
    if(o.zfx){ var Z=o.zfx, mk=function(list,tex,cfg,depth){ try{ var e=self.add.particles(0,0,tex,Object.assign({emitZone:{type:'random',source:{getRandomPoint:function(p){ var c=list[(Math.random()*list.length)|0]; p.x=c[0]+(Math.random()-0.5)*6; p.y=c[1]+(Math.random()-0.5)*6; return p; }}}},cfg)); e.setDepth(depth); e._zfx=1; objs.push(e); }catch(err){ WP_ERR['edge fx: '+err.message]=(WP_ERR['edge fx: '+err.message]||0)+1; } };
      var soft=function(a){ return {onEmit:function(){ return 0; },onUpdate:function(p,k,t){ return a*Math.sin(t*Math.PI); }}; };
      if(Z.rings)mk(Z.rings,'zring',{lifespan:1700,scale:{start:0.15,end:1.15},alpha:{start:0.75,end:0},frequency:260,quantity:1},-8.4);
      if(Z.spray)mk(Z.spray,'dot',{lifespan:700,speedX:{min:-15,max:15},speedY:{min:-60,max:-25},gravityY:90,scale:{start:0.55,end:0.1},alpha:{start:0.9,end:0},frequency:70,quantity:2},-8.3);
      if(Z.fog)mk(Z.fog,'glow',{lifespan:6000,speedX:{min:4,max:12},speedY:{min:-2,max:2},scale:{start:1.6,end:2.8},alpha:soft(0.13),tint:0xe8eeec,frequency:1100},-8.2);
      if(Z.mist)mk(Z.mist,'glow',{lifespan:4500,speedX:{min:3,max:9},speedY:{min:-1,max:1},scale:{start:0.8,end:1.5},alpha:soft(0.14),tint:0xf2f4f6,frequency:900},-8.2);
      if(Z.glitter)mk(Z.glitter,'dot',{lifespan:450,scale:{start:0.38,end:0},alpha:{start:1,end:0},frequency:90,blendMode:'ADD'},-8.1);
      // round 42: painted creatures (wave 42 sheets) where they are in; else the code-drawn particles of round 41
      var PT=function(f){ return typeof ZWE!=='undefined'?ZWE.critTex(self,f):[]; }, CK=typeof ZWE!=='undefined'?(ZWE.LOOK.crit||1):1;
      // round 43: a creature with painted frames plays them (wave 43); without, its single picture or the drawn dot. f: also scales by how many creatures (LOOK.crit)
      var each=function(list,keys,cfg,depth,fallback,f){ var A=f&&typeof ZWE!=='undefined'?ZWE.animTex(self,ZWE.CRITANIM[f]):null; if(f&&cfg.frequency)cfg=Object.assign({},cfg,{frequency:cfg.frequency/CK});
        if(A){ mk(list,A.key,Object.assign({},cfg,{anim:A.key}),depth); return; }
        if(!keys.length){ if(fallback)mk(list,fallback[0],Object.assign({},cfg,fallback[1]),depth); return; } keys.forEach(function(k){ mk(list,k,Object.assign({},cfg,{frequency:(cfg.frequency||600)*keys.length}),depth); }); };
      if(Z.wisps){ mk(Z.wisps,'glow',{lifespan:{min:3500,max:5500},speedX:{min:-10,max:10},speedY:{min:-8,max:4},scale:{start:0.22,end:0.3},alpha:soft(0.85),tint:[0x9ff0e0,0x6fd8d0,0xc8fff0],frequency:900,blendMode:'ADD'},-3);      // will-o'-wisps over the marsh pools
        each(Z.wisps,PT('wisps'),{lifespan:{min:3500,max:5500},speedX:{min:-10,max:10},speedY:{min:-8,max:4},scale:{start:0.45,end:0.5},alpha:soft(0.9),frequency:1400,blendMode:'ADD'},-2.9,null,'wisps'); }
      if(Z.leaves)each(Z.leaves,ZWE.frames(ZWE.CRITANIM.leaves)>1?[]:PT('leaves'),{lifespan:{min:3000,max:4500},speedX:{min:18,max:40},speedY:{min:-6,max:14},rotate:{min:0,max:360},scale:{start:0.5,end:0.42},alpha:{start:1,end:0},frequency:700},WR_DEPTH(y0+WCH*LT),['leaf',{scale:{start:1.1,end:0.9},tint:[0xd8902a,0xc8582a,0x9ab040,0xe0b830]}],ZWE.frames(ZWE.CRITANIM.leaves)>1?'leaves':null);      // falling leaves below cliffs
      var CS={      // round 43: crabs, gulls, crows, dragonflies, fish, frogs and butterflies are actors now (10n ZCRIT); fireflies stay a glow
        fireflies:[{lifespan:{min:2500,max:4000},speed:{min:4,max:12},scale:0.5,alpha:soft(1),frequency:500,blendMode:'ADD'},-2.9,['dot',{tint:0xfff080,scale:0.6}]]};
      Object.keys(CS).forEach(function(f){ if(Z[f])each(Z[f],PT(f),CS[f][0],CS[f][1],CS[f][2],f); });
      if(Z.steam)mk(Z.steam,'glow',{lifespan:{min:2200,max:3200},speedX:{min:-3,max:7},speedY:{min:-30,max:-16},scale:{start:0.3,end:1.15},alpha:soft(0.3),tint:0xf2f2ee,frequency:650},WR_DEPTH(y0+WCH*LT));      // round 43: steam from the vents
      if(Z.embers)mk(Z.embers,'dot',{lifespan:1600,speedX:{min:-8,max:8},speedY:{min:-45,max:-20},scale:{start:0.45,end:0},alpha:{start:1,end:0},tint:[0xffd070,0xff8a30,0xffe8a0],frequency:220,blendMode:'ADD'},-3); }
    var crit=this._zcMount?this._zcMount(o,objs):null;      // round 43: the animals (10n)
    if(o.cracks){ var ck=this.add.image(x0,y0,addTex(tag+'_ck',o.cracks)).setOrigin(0,0).setDisplaySize(WCH*LT,WCH*LT).setBlendMode(Phaser.BlendModes.ADD).setDepth(-8.7).setAlpha(0.15); objs.push(ck);      // round 41: the cracks in the crust pulse
      this.tweens.add({targets:ck,alpha:0.85,duration:1300,yoyo:true,repeat:-1,ease:'Sine.inOut'}); }
    var ch={objs:objs,keys:keys,react:react,cx:o.cx,cy:o.cy,lava:o.lavaCells&&o.lavaCells.length?o.lavaCells:null,flip:flip,live:live&&live.length?live:null,tall:tall,crit:crit,pend:pend};
    if(pend)(this._wrPend||(this._wrPend=[])).push(ch); return ch;
  },
  // A Lab particle spec → Phaser emitter over an area (world px)
  _wrEmitter(p,a){
    if(!a)return null;
    var cfg={ x:{min:0,max:a.w}, y:{min:0,max:a.h}, lifespan:p.life||{min:3000,max:6000}, speedX:p.vx||{min:-6,max:6}, speedY:p.vy||{min:-10,max:-3},
      scale:p.scale||{start:0.5,end:0}, alpha:p.alpha||{start:0.8,end:0}, tint:p.tints?p.tints.map(hexNum):hexNum(p.col||'#ffffff'),
      frequency:p.freq||120, quantity:p.qty||1, blendMode:p.blend===false?'NORMAL':'ADD', rotate:p.rotate||0, gravityY:p.gravity||0 };
    var e=this.add.particles(a.x,a.y,p.tex||'dot',cfg); e.setDepth(p.depth!==undefined&&p.depth>=6000?WR_DEPTH(a.y+a.h)+0.6:WR_DEPTH(a.y+a.h)); return e;
  },
  // round 46: hide / show a parked chunk (each object keeps the visibility it had)
  _wrShow(ch,on){ ch._off=!on; ch.objs.forEach(function(o){ if(!o||!o.scene)return; if(!on){ o._wrPv=o._zv!==undefined?o._zv:o.visible; o._zv=undefined; o.setVisible(false); } else { o.setVisible(o._wrPv!==false); o._wrPv=undefined; } }); },
  _wrUnmount(ch){
    ch._dead=true; ch.pend=null;
    var self=this; ch.objs.forEach(function(o){ self.tweens.killTweensOf(o); o.destroy(); });
    ch.keys.forEach(function(k){ if(self.textures.exists(k))self.textures.remove(k); });
  },
  _wrTick(dt){
    if(!this._wr)return; var W=this._wr, lavaCh=[], FT=(W.flipT=(W.flipT||0)+dt);
    W.chunks.forEach(function(ch){ var F=ch.flip; if(!F)return; var u=(FT/F.T*F.nf)%F.nf, i=Math.floor(u); if(F.i!==i){ F.i=i; F.a.setFrame('f'+i,false,false); F.b.setFrame('f'+((i+1)%F.nf),false,false); } F.b.setAlpha(u-i); });      // round 40: the moving water
    // round 43: the wind — a slow wave rolling across the world, so neighbouring plants lean together; frames follow it, loops just run
    var sw=typeof ZWE!=='undefined'?(ZWE.LOOK.sway||0):0, amp=sw>=2?1.9:1;
    W.chunks.forEach(function(ch){ if(!ch.live||ch._off)return; for(var q=0;q<ch.live.length;q++){ var im=ch.live[q], x=im.x, y=im.y, r=im._zr;
        if(im._zloop){ var f=Math.floor(FT*im._zloop+r*7)%im._zn; if(f!==im._zf){ im._zf=f; im.setFrame(String(f),false,false); } continue; }
        if(sw<=0)continue;
        var w=0.65*Math.sin(FT*1.6+x*0.012+y*0.005+r*0.8)+0.35*Math.sin(FT*0.55+x*0.004-y*0.002); if(sw>=2)w+=0.6*Math.pow(Math.max(0,Math.sin(FT*0.4+x*0.003)),3);
        if(im._zn>1){ var fi=Math.max(0,Math.min(im._zn-1,Math.round((w*amp*0.75+1)/2*(im._zn-1)))); if(fi!==im._zf){ im._zf=fi; im.setFrame(String(fi),false,false); } im.setAngle(w*amp*im._zdeg*0.25); }
        else im.setAngle(w*amp*im._zdeg); } });
    // round 44 (lag): a mounted chunk that is wholly off screen is not drawn (its pieces, lights, animals and emitters are hidden until it comes back into view)
    var cam=this.cameras.main, v=cam.worldView, cs=WCH*TILE, M=320;
    W.chunks.forEach(function(ch){ var x0=ch.cx*cs, y0=ch.cy*cs, off=x0>v.right+M||x0+cs<v.x-M||y0>v.bottom+M||y0+cs<v.y-M-160;
      if(off!==!!ch._off){ ch._off=off; ch.objs.forEach(function(o){ if(off){ o._zv=o.visible; o.setVisible(false); } else if(o._zv!==undefined){ o.setVisible(o._zv); o._zv=undefined; } }); } });
    // round 45 (F9 from Kris's PC: 900–1030 objects, 49–60 fps standing still in the village): a chunk is 1024 px, so most of an on-screen chunk's pieces
    // (and the camps, lamps and creatures of the whole neighbourhood) are still off screen. Every 6th frame, everything outside the view plus a margin
    // is left out of this camera's drawing (cameraFilter — the objects' own visible flags are untouched, so nothing else is disturbed).
    if((this._wrCull=(this._wrCull||0)+1)%6===0)WR_CULL(this);
    if(this._zcTick)this._zcTick(dt);      // round 43: the animals (10n). (Kris: no fading when the hero is behind a piece — removed)
    W.chunks.forEach(function(ch){ if(ch.lava)lavaCh.push(ch); ch.objs.forEach(function(o){ if(o._lava)o._lava.forEach(function(t){ t.tilePositionX+=t._flow.vx*dt; t.tilePositionY+=t._flow.vy*dt; }); }); });
    // lava bursts (as in the Lab): little sprays of sparks from the molten ground in view
    if(!lavaCh.length)return; W.burstT=(W.burstT||0)-dt; if(W.burstT>0)return; W.burstT=0.12+Math.random()*0.25;
    if(!W.burstEm)W.burstEm=this.add.particles(0,0,'dot',{speed:{min:30,max:90},angle:{min:200,max:340},gravityY:120,lifespan:{min:400,max:900},scale:{start:0.7,end:0},alpha:{start:1,end:0},tint:[0xffd070,0xff8a30,0xffe8a0],blendMode:'ADD',emitting:false});
    var v=this.cameras.main.worldView;
    for(var bt=0;bt<6;bt++){ var ch=lavaCh[(Math.random()*lavaCh.length)|0], cc=ch.lava[(Math.random()*ch.lava.length)|0], bx=cc[0]+Math.random()*LT, by=cc[1]+Math.random()*LT;
      if(bx<v.x-40||bx>v.right+40||by<v.y-40||by>v.bottom+40)continue;
      W.burstEm.setDepth(WR_DEPTH(by)); W.burstEm.explode(4+((Math.random()*6)|0),bx,by);
      var fl=this.add.image(bx,by,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(0xffa040).setAlpha(0.5).setScale(0.5).setDepth(-3);
      this.tweens.add({targets:fl,alpha:0,scale:0.9,duration:420,onComplete:function(){ fl.destroy(); }}); break; }
  }
});
