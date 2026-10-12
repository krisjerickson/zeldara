// ═══════════════════════════════════════════════════════════════════════
// ║ 10t-fx-soft.js — round 49 (Kris: "some of the attack effects from familiars and monsters still show poor resolution pixel things.
// ║ request painted images for these or figure out other ways to make them look better").
// ║ The game draws with antialiasing off (for the pixel-art stand-ins), so every small shape drawn in code — the dots of a breath or a
// ║ gust, the smoke and frost behind a shot, the sparks of an arrow, the lines of a beam, a lash, a drain, a familiar's wave, the hero's
// ║ chain lightning, the expanding ring attack, a trap, a lobbed stone — came out as hard little squares and stair-stepped lines, and the
// ║ painted pictures were sampled pixel by pixel when shrunk. Now:
// ║  · painted and soft pictures are sampled smoothly (LINEAR) — shots, effects, glows, motes;
// ║  · the small shapes are soft pictures instead (a round glow, a soft streak, a soft beam, a soft ring), tinted to their colour;
// ║  · each picks its painting from wave 51 (sc_fx_bolts, sc_fx_solids, sc_fx_lines) as soon as it is in, the soft picture until then.
// ═══════════════════════════════════════════════════════════════════════
var ZSOFT={ on:true,
  LIN:/^(dot|glow|leaf|spark|zs_|zfx_|zsoft_|zvd_|zwe_|loot_)/,
  // the soft pictures, made once per game
  tex:function(scene,k){ var key='zsoft_'+k; if(scene.textures.exists(key))return key; var W=64, H=64, f;
    if(k==='beam'){ W=64; H=24; } if(k==='streak'){ W=48; H=12; } if(k==='ring'){ W=H=128; }
    var cv=mkCanvas(W,H), c=cv.getContext('2d');
    if(k==='soft'){ f=c.createRadialGradient(32,32,0,32,32,32); f.addColorStop(0,'rgba(255,255,255,1)'); f.addColorStop(0.35,'rgba(255,255,255,0.75)'); f.addColorStop(1,'rgba(255,255,255,0)'); c.fillStyle=f; c.fillRect(0,0,W,H); }
    else if(k==='disc'){ f=c.createRadialGradient(32,32,0,32,32,32); f.addColorStop(0,'rgba(255,255,255,0.95)'); f.addColorStop(0.72,'rgba(255,255,255,0.85)'); f.addColorStop(0.86,'rgba(255,255,255,1)'); f.addColorStop(1,'rgba(255,255,255,0)'); c.fillStyle=f; c.fillRect(0,0,W,H); }
    else if(k==='ring'){ f=c.createRadialGradient(64,64,0,64,64,64); f.addColorStop(0,'rgba(255,255,255,0)'); f.addColorStop(0.62,'rgba(255,255,255,0.05)'); f.addColorStop(0.84,'rgba(255,255,255,1)'); f.addColorStop(1,'rgba(255,255,255,0)'); c.fillStyle=f; c.fillRect(0,0,W,H); }
    else if(k==='beam'){ f=c.createLinearGradient(0,0,0,H); f.addColorStop(0,'rgba(255,255,255,0)'); f.addColorStop(0.5,'rgba(255,255,255,1)'); f.addColorStop(1,'rgba(255,255,255,0)'); c.fillStyle=f; c.fillRect(0,0,W,H); }
    else if(k==='streak'){ c.save(); c.translate(W/2,H/2); c.scale(W/H,1); f=c.createRadialGradient(0,0,0,0,0,H/2); f.addColorStop(0,'rgba(255,255,255,1)'); f.addColorStop(1,'rgba(255,255,255,0)'); c.fillStyle=f; c.fillRect(-H/2,-H/2,H,H); c.restore(); }
    var T=scene.textures.addCanvas(key,cv); try{ T.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} return key; },
  col:function(col){ return typeof col==='number'?col:(typeof MX!=='undefined'&&MX.col?MX.col(col):parseInt(String(col||'#ffffff').replace('#',''),16)); },
  bright:function(n){ return ((n>>16&255)+(n>>8&255)+(n&255))>420; },
  // a painting from wave 51 when it is in, else the soft picture: returns [key, tinted?]
  // the wave-51 paintings done in white, to be coloured by the game (a familiar's ring in its element, a monster's lash in its colour)
  WHITE:{fx_mote:1,fx_lash:1,fx_drain_stream:1,fx_fam_beam:1,fx_bolt_arc:1,fx_ring_wave:1,fx_fam_ring:1},
  pick:function(scene,id,soft){ if(id&&typeof ZFX!=='undefined'&&ZFX.has(id)){ var k=ZFX.key(scene,id); if(k){ if(ZSOFT.WHITE[id])return [ZSOFT.grey(scene,k),true]; return [k,false]; } } return [ZSOFT.tex(scene,soft||'soft'),true]; },
  // round 49b: the "white" paintings came back pale cyan with dark blue outlines — made truly grey (light kept, colour taken out) so the game's
  // colour shows true: a pink lash pink, a familiar's ring in its element
  grey:function(scene,k){ var g=k+'_grey'; if(scene.textures.exists(g))return g; try{ var src=scene.textures.get(k).getSourceImage(), cv=mkCanvas(src.width,src.height), c=cv.getContext('2d'); c.drawImage(src,0,0);
      var im=c.getImageData(0,0,cv.width,cv.height), d=im.data; for(var i=0;i<d.length;i+=4){ var L=Math.min(255,(0.3*d[i]+0.55*d[i+1]+0.15*d[i+2])*1.12); d[i]=d[i+1]=d[i+2]=L; } c.putImageData(im,0,0);
      var T=scene.textures.addCanvas(g,cv); try{ T.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} return g; }catch(e){ return k; } },
  img:function(scene,id,soft,x,y,w,h,col,a,depth,add){ var P=ZSOFT.pick(scene,id,soft), im=scene.add.image(x,y,P[0]).setDisplaySize(w,h).setAlpha(a===undefined?1:a).setDepth(depth||15); if(P[1]&&col!==undefined)im.setTint(ZSOFT.col(col)); if(add)im.setBlendMode(Phaser.BlendModes.ADD); return im; },
  // a soft picture over a code-drawn circle that follows its size, place, fade and life (as ZFX.dress does for the paintings)
  dress:function(c,id,soft,o){ try{ if(!ZSOFT.on||!c||!c.scene||typeof ZFX==='undefined')return null; o=o||{}; var scene=c.scene, P=ZSOFT.pick(scene,id,soft), col=o.col!==undefined?o.col:(c.isStroked&&!c.isFilled?c.strokeColor:c.fillColor);
      var im=scene.add.image(c.x,c.y,P[0]).setDepth(c.depth); if(P[1])im.setTint(ZSOFT.col(col)); if(o.add)im.setBlendMode(Phaser.BlendModes.ADD);
      var D={c:c,im:im,a0:Math.max(0.05,c.alpha||1),k:o.k||1,a:o.a===undefined?0.95:o.a,rot:0,ang:0,soft:0};
      c.setFillStyle&&c.setFillStyle(0x000000,0); if(c.setStrokeStyle&&c.isStroked)c.setStrokeStyle(0,0,0); ZFX._list(scene).push(D); c.once('destroy',function(){ im.destroy(); D.dead=true; }); ZFX._one(D,0); return im; }catch(e){ return null; } },
  // a stand-in for a Graphics that only draws straight lines: each line a soft beam (pooled, so a line redrawn every frame reuses its picture)
  lines:function(scene,id){ var C=scene.add.container(0,0), n=0, ls=[2,0xffffff,1];
    C.lineStyle=function(w,col,a){ ls=[w,col,a===undefined?1:a]; if(C._rg)C._rg.lineStyle(w,col,a); return C; };
    // anything else a Graphics can draw (fills, circles, slices…) goes to a real Graphics inside it
    ['fillStyle','fillCircle','strokeCircle','fillRect','strokeRect','fillPath','slice','arc','fillTriangle','strokeTriangle','fillEllipse','strokeEllipse','fillRoundedRect','strokeRoundedRect','fillPoints','strokePoints','createGeometryMask'].forEach(function(m){
      C[m]=function(){ var rg=C._rg; if(!rg){ rg=C._rg=Phaser.GameObjects.GameObjectFactory.prototype.graphics.call(scene.add); C.add(rg); rg.lineStyle(ls[0],ls[1],ls[2]); } return rg[m].apply(rg,arguments); }; });
    C.lineBetween=function(x1,y1,x2,y2){ var L=Math.hypot(x2-x1,y2-y1); if(L<0.5)return C; var im=C._ims&&C._ims[n]; if(!im){ C._ims=C._ims||[]; var P=ZSOFT.pick(scene,id,'beam'); im=scene.add.image(0,0,P[0]).setOrigin(0,0.5); im._tint=P[1]; im._paint=!/^zsoft_/.test(P[0]); C.add(im); C._ims.push(im); } n++;
      im.setVisible(true).setPosition(x1,y1).setRotation(Math.atan2(y2-y1,x2-x1)).setDisplaySize(L,im._paint?Math.max(10,Math.min(26,L*0.12,ls[0]*4)):Math.max(5,ls[0]*2.2)).setAlpha(ls[2]); if(im._tint)im.setTint(ZSOFT.col(ls[1])); else im.clearTint(); if(ls[1]===0xffffff||ZSOFT.bright(ZSOFT.col(ls[1])))im.setBlendMode(Phaser.BlendModes.ADD); else im.setBlendMode(Phaser.BlendModes.NORMAL); return C; };
    C.clear=function(){ n=0; C.list.forEach(function(o){ if(o===C._rg)o.clear(); else o.setVisible(false); }); return C; };
    // a jagged path (lightning): moveTo / lineTo / strokePath
    var path=[]; C.beginPath=function(){ path=[]; return C; }; C.moveTo=function(x,y){ path=[[x,y]]; return C; }; C.lineTo=function(x,y){ path.push([x,y]); return C; };
    C.strokePath=function(){ for(var i=1;i<path.length;i++)C.lineBetween(path[i-1][0],path[i-1][1],path[i][0],path[i][1]); return C; };
    return C; },
  // run f with scene.add.graphics (and small circles) swapped for the soft stand-ins
  swap:function(scene,f,o){ if(!ZSOFT.on||!scene||!scene.add)return f(); var F=scene.add, g0=F.graphics, c0=F.circle; o=o||{};
    F.graphics=function(){ return ZSOFT.lines(scene,o.line); };
    if(o.circle)F.circle=function(x,y,r,col,a){ var v=o.circle(x,y,r,col,a); return v||c0.apply(F,arguments); };
    try{ return f(); } finally { F.graphics=g0; F.circle=c0; } } };

// ── smooth sampling for every painted / soft picture (the game runs with antialiasing off) ──
(function(){ try{ var TM=Phaser.Textures.TextureManager.prototype, a0=TM.addCanvas; TM.addCanvas=function(key){ var t=a0.apply(this,arguments); try{ if(t&&ZSOFT.on&&ZSOFT.LIN.test(String(key)))t.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} return t; }; }catch(e){} })();

// ── the monsters' side ──
(function(){ if(typeof MX==='undefined')return;
  // the dots of a breath, a gust and the like: soft motes
  MX.fxDot=function(A,x,y,col,a){ var s=A.scene, n=ZSOFT.col(col), im=ZSOFT.img(s,'fx_mote','soft',x+(Math.random()-0.5)*8,y,13,13,n,a||0.8,A.depth(y)-0.01,ZSOFT.bright(n)||ZFX.has('fx_mote'));      // the painted mote glows (its dark outline drops out)
    s.tweens.add({targets:im,alpha:0,scaleX:im.scaleX*0.5,scaleY:im.scaleY*0.5,y:y-6,duration:700,onComplete:function(){ im.destroy(); }}); };
  var AT=MX.ATK; if(!AT)return;
  var wrap=function(name,part,f){ if(!AT[name]||!AT[name][part])return; var f0=AT[name][part]; AT[name][part]=function(A){ var self=this, args=arguments; return f(A,function(){ return f0.apply(self,args); },args); }; };
  // beam, pull (the lash) and drain: soft beams instead of stair-stepped lines
  wrap('beam','fire',function(A,go){ return ZSOFT.swap(A.scene,go,{}); });
  wrap('pull','fire',function(A,go){ return ZSOFT.swap(A.scene,go,{line:'fx_lash'}); });
  wrap('drain','fire',function(A,go){ return ZSOFT.swap(A.scene,go,{line:'fx_drain_stream'}); });
  // the lobbed stone (or bomb): a painted / drawn rock that tumbles, not a flat circle
  wrap('lob','fire',function(A,go,args){ var p=args[4]||{}; return ZSOFT.swap(A.scene,go,{circle:function(x,y,r,col){ if(typeof ZShot==='undefined')return null; var fiery=p.col&&ZShot.byColour(p.col)==='fireball';
      var im=ZSHOTX.solid(A.scene,fiery?'fx_pj_bomb':'fx_pj_rock',fiery?'fireball':'rock',x,y,Math.max(14,(p.size||6)*2.6)); if(!im)return null; var b0=im.scaleX; im.setScale=function(k){ return Phaser.GameObjects.Image.prototype.setScale.call(this,b0*k); }; return im; }}); });
  // the expanding ring: a painted ring (cut to leave its gap) over the drawn one
  wrap('ring','fire',function(A,go,args){ var r=go(), b=args[5]; try{ var p=args[4]||{}, s=A.scene, col=ZSOFT.col(p.col||'#9fe8ff'), id=ZFX&&ZFX.has('fx_ring_wave')?'fx_ring_wave':(ZFX&&ZFX.has(ZFX.ringFor(col))?ZFX.ringFor(col):null);
      var P=ZSOFT.pick(s,id,'ring'), im=s.add.image(b.cx,b.cy,P[0]).setDepth(b.g.depth).setAlpha(0.9); if(P[1])im.setTint(col); b._zim=im;
      if(p.gap){ var gw=0.9, mg=s.make.graphics({add:false}); mg.fillStyle(0xffffff,1); mg.slice(b.cx,b.cy,(p.max||230)+80,b.gap+gw/2,b.gap+Math.PI*2-gw/2,false); mg.fillPath(); im.setMask(mg.createGeometryMask()); b._zmg=mg; } }catch(e){} return r; });
  wrap('ring','act',function(A,go,args){ var b=args[5], done=go(); try{ if(b&&b._zim){ if(done){ b._zim.destroy(); if(b._zmg)b._zmg.destroy(); b._zim=null; } else { b.g.setVisible(false); var d=2*b.R*1.12; b._zim.setDisplaySize(d,d); } } }catch(e){} return done; });
  // traps: a painted snare / mine / rune, or a soft disc
  wrap('trap','fire',function(A,go){ var T=MX.fx(A).traps, n0=T.length, r=go(); for(var i=n0;i<T.length;i++){ var t=T[i]; if(t&&t.g&&!t._zd){ t._zd=1; var id='fx_trap_'+t.k; if(ZFX.has(id))ZFX.dress(t.g,id,{k:1.5,a:1}); else ZSOFT.dress(t.g,null,'disc',{a:0.8}); } } return r; });
  // a stone wall raised by an attack: the painted block when it is in
  if(MX.wall){ var w0=MX.wall; MX.wall=function(A,x,y,w,h,t,col){ var r=w0.apply(MX,arguments); try{ var W=MX.fx(A).walls, o=W[W.length-1]; if(o&&o.g&&ZFX.has('fx_wall_stone')){ ZFX.put(A.scene,'fx_wall_stone',x,y,w*1.15,h*1.6,{depth:o.g.depth,owner:o.g,a:1,oy:0.62}); o.g.setAlpha(0.01); } }catch(e){} return r; }; }
})();

// ── shots: what they leave behind ──
var ZSHOTX={
  // a solid thrown thing: the painting when it is in, else the drawn shot
  solid:function(scene,id,kind,x,y,size){ if(ZFX.has(id)){ var k=ZFX.key(scene,id); if(k){ var im=scene.add.image(x,y,k).setDisplaySize(size,size); im.setStrokeStyle=im.setFillStyle=im.setRadius=function(){ return this; }; return im; } } return ZShot.make(scene,kind,x,y,0,15,size/16); } };
(function(){ if(typeof ZShot==='undefined')return;
  ZShot.trail=function(scene,im,kind,S,M){ var fade=function(o,ms,sc){ scene.tweens.add({targets:o,alpha:0,scaleX:o.scaleX*(sc||1),scaleY:o.scaleY*(sc||1),duration:ms,onComplete:function(){ o.destroy(); }}); }, d=im.depth-0.01, o;
    if(M.fam==='arrow'&&S.trail==='ripple'){ o=ZSOFT.img(scene,null,'streak',im.x,im.y,14,5,0xffffff,0.35,d,true).setRotation(im.rotation); fade(o,240,1.5); }
    if(/fire$/.test(kind)||kind==='fireball'){ o=ZSOFT.img(scene,'fx_smoke_puff','soft',im.x,im.y,10,10,0x3a3430,0.4,d); fade(o,420,2.2); }
    if(/cold$/.test(kind)||kind==='frost_bolt'){ o=ZSOFT.img(scene,'fx_frost_glint','soft',im.x+(Math.random()-0.5)*6,im.y+(Math.random()-0.5)*6,7,7,0xdaf2ff,0.9,d,true); fade(o,360,1); }
    if(/heat$/.test(kind)){ o=ZSOFT.img(scene,'fx_ember','soft',im.x,im.y,8,8,0xff5a3a,0.6,d,true); fade(o,300,0.4); } };
  ZShot.spark=function(scene,x,y,depth){ for(var i=0;i<5;i++){ var a=Math.random()*Math.PI*2, r=9+Math.random()*8, s=ZSOFT.img(scene,null,'streak',x,y,9,3,0xffe6a0,0.95,depth||15,true).setRotation(a);
      scene.tweens.add({targets:s,x:x+Math.cos(a)*r,y:y+Math.sin(a)*r,alpha:0,duration:170,onComplete:(function(q){ return function(){ q.destroy(); }; })(s)}); } };
})();

// ── familiars ──
(function(){
  if(typeof _famRing==='function'){ _famRing=function(scene,x,y,r,col,dur){ var g=scene.add.circle(x,y,8,hexNum(col),0.35).setStrokeStyle(3,hexNum(col),0.9).setDepth(12.6);
      var id=typeof ZFX!=='undefined'&&ZFX.has('fx_fam_ring')?'fx_fam_ring':null; if(id)ZSOFT.dress(g,id,'ring',{col:hexNum(col),a:0.95}); else if(typeof ZFX!=='undefined'&&ZFX.has(ZFX.ringFor(col)))ZFX.dress(g,ZFX.ringFor(col),{a:0.9}); else ZSOFT.dress(g,null,'ring',{col:hexNum(col),a:0.9});
      scene.tweens.add({targets:g,radius:r,alpha:0,duration:dur||450,onComplete:function(){ g.destroy(); }}); }; }
  // a familiar's cast: its wave a soft beam, its falling rocks real rocks
  if(typeof _famCast==='function'){ var c0=_famCast; _famCast=function(scene){ var args=arguments; return ZSOFT.swap(scene,function(){ return c0.apply(null,args); },{line:'fx_fam_beam',circle:function(x,y,r){ if(r!==9||typeof ZShot==='undefined')return null; var im=ZSHOTX.solid(scene,'fx_pj_rock','rock',x,y,22); if(im)im.setDepth(12.7); return im; }}); }; }
  // the hero's chain lightning: soft jagged light, white core in a coloured glow
  if(typeof _heroBolt==='function'){ _heroBolt=function(scene,x1,y1,x2,y2,col){ var pts=[[x1,y1]], segs=6; for(var i=1;i<segs;i++){ var t=i/segs; pts.push([x1+(x2-x1)*t+(Math.random()-0.5)*14,y1+(y2-y1)*t+(Math.random()-0.5)*14]); } pts.push([x2,y2]);
      var g=ZSOFT.lines(scene,'fx_bolt_arc').setDepth(17); for(var k=1;k<pts.length;k++){ g.lineStyle(5,col,0.6); g.lineBetween(pts[k-1][0],pts[k-1][1],pts[k][0],pts[k][1]); }
      var g2=ZSOFT.lines(scene).setDepth(17.01); for(var j=1;j<pts.length;j++){ g2.lineStyle(1.6,0xffffff,0.95); g2.lineBetween(pts[j-1][0],pts[j-1][1],pts[j][0],pts[j][1]); }
      scene.tweens.add({targets:[g,g2],alpha:0,duration:220,onComplete:function(){ g.destroy(); g2.destroy(); }}); }; }
})();
