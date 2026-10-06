// ═══════════════════════════════════════════════════════════════════════
// ║ PAINTED SPRITES — ZAtlas (round 23; sizes, anchors and "no pixel art in play" round 26).
// ║ tools/sprites/intake.py --atlas packs the cut ChatGPT frames into
// ║ assets/atlas/<name>-<n>.webp and index.json; build.mjs puts the index into
// ║ the page as ZATLAS_META. A page is loaded as a plain image the first time
// ║ a character on it is needed (works from a file:// page too).
// ║   frame name:  <character>/<anim>/<facing>/<n>
// ║   Every frame's cell is a square of the character's body height with the
// ║   BODY's feet at the bottom centre; ink (a sword, a burst) may reach outside.
// ║   chars[id] = {h0: body height, a0: √(ink area) of the standing pose, pages}
// ║ SIZE (Kris, round 26: "match the game"): a painted character's body is as
// ║   large next to the painted hero as its pixel sprite was next to the pixel
// ║   hero, and the hero is 1.5 × the old 42 px. Measured by height and ink area (kPix).
// ║ NO PIXEL ART IN PLAY: while a page loads the image is hidden; when a wanted
// ║   animation is missing the nearest painted one is used (pick); anything that
// ║   still wears a pixel texture is found by the sweeper (scan) and dressed.
// ║   The pixel sprites remain only as the emergency fallback when a page fails
// ║   to load, for the Lab, and when painted sprites are switched off
// ║   (Dev panel → "Painted sprites", or ?sprites=0).
// ═══════════════════════════════════════════════════════════════════════
var ZAtlas={ META:(typeof ZATLAS_META!=='undefined'&&ZATLAS_META)||{pages:{},chars:{},frames:{}}, BASE:'assets/atlas/', SCALE:1.5, HERO_STANDIN:42,
  st:{}, img:{}, _n:{}, _f0:{}, _any:{}, _by:null, _pix:{}, _sw:[], _an:[], _swT:0,
  // characters without a painted sheet wear the nearest painted one (tc_sprint: its sheet was refused by the image service)
  ALIAS:{tc_sprint:'tc_roll'},
  off:(function(){ try{ if(/[?&]sprites=0/.test(location.search))return true; return localStorage.getItem('zeldara_sprites')==='off'; }catch(e){ return false; } })(),
  setOff:function(v){ ZAtlas.off=!!v; try{ localStorage.setItem('zeldara_sprites',v?'off':'on'); }catch(e){} },
  A:function(ch){ return (!ZAtlas.META.chars[ch]&&ZAtlas.ALIAS[ch])||ch; },
  has:function(ch){ return !ZAtlas.off&&!!ZAtlas.META.chars[ZAtlas.A(ch)]; },
  _index:function(){ if(ZAtlas._by)return; var by={}, F=ZAtlas.META.frames; Object.keys(F).forEach(function(n){ (by[F[n][0]]=by[F[n][0]]||[]).push(n); var k=n.slice(0,n.lastIndexOf('/')); ZAtlas._n[k]=Math.max(ZAtlas._n[k]||0,+n.slice(n.lastIndexOf('/')+1)+1);
      var pp=n.split('/'); if(pp[2]==='s'||!ZAtlas._f0[pp[0]])ZAtlas._f0[pp[0]]=pp[2]; if(!ZAtlas._any[pp[0]]||pp[1]==='idle')ZAtlas._any[pp[0]]=[pp[1],pp[2]]; }); ZAtlas._by=by; },
  load:function(p){ var S=ZAtlas.st[p]; if(S)return S; ZAtlas._index(); ZAtlas.st[p]='loading'; var img=new Image();
    img.onload=function(){ try{ var T=game.textures.addImage('za_'+p,img), F=ZAtlas.META.frames; (ZAtlas._by[p]||[]).forEach(function(n){ var f=F[n], fr=T.add(n,0,f[1],f[2],f[3],f[4]); if(fr&&fr.setTrim)fr.setTrim(f[5],f[6],f[7],f[8],f[3],f[4]); }); ZAtlas.img[p]=img; ZAtlas.st[p]='ok'; if(ZAtlas.onPage)ZAtlas.onPage(p); }catch(e){ console.error('atlas',p,e); ZAtlas.st[p]='bad'; } };
    img.onerror=function(){ ZAtlas.st[p]='bad'; }; img.src=ZAtlas.BASE+p+'.webp'; return 'loading'; },
  // 'ok' painted and loaded · 'load' on its way (show nothing) · 'bad' the file failed (emergency: pixel sprite) · 'none' not painted / switched off
  state:function(ch){ if(ZAtlas.off)return 'none'; var C=ZAtlas.META.chars[ZAtlas.A(ch)]; if(!C||typeof game==='undefined'||!game.textures)return 'none'; var s='ok';
    for(var i=0;i<C.pages.length;i++){ var r=ZAtlas.load(C.pages[i]); if(r==='bad')return 'bad'; if(r!=='ok')s='load'; } return s; },
  ready:function(ch){ return ZAtlas.state(ch)==='ok'; },
  count:function(ch,anim,f){ ZAtlas._index(); return ZAtlas._n[ZAtlas.A(ch)+'/'+anim+'/'+f]||0; },
  name:function(ch,anim,f,i){ var n=ZAtlas.A(ch)+'/'+anim+'/'+f+'/'+i; return ZAtlas.META.frames[n]?n:null; },
  set:function(img,ch,anim,f,i){ var n=ZAtlas.name(ch,anim,f,i); if(!n)return false; var pg=ZAtlas.META.frames[n][0], key='za_'+pg; ZAtlas._use[pg]=Date.now(); if(ZAtlas.st[pg]!=='ok')return false; if(img.texture.key!==key||img.frame.name!==n)img.setTexture(key,n); return true; },
  hide:function(im,on){ if(on){ if(!im._zh){ im._zh=true; im.setVisible(false); } } else if(im._zh){ im._zh=false; im.setVisible(true); } },
  // first anim+facing in the list that has frames; the very last resort is any painted frame of the character
  pick:function(ch,anims,f){ ZAtlas._index(); ch=ZAtlas.A(ch); var f0=ZAtlas._f0[ch]||'q', i, a, n; for(i=0;i<anims.length;i++){ a=anims[i]; if(!a)continue; n=ZAtlas.count(ch,a,f); if(n)return {a:a,f:f,n:n}; if(f!==f0){ n=ZAtlas.count(ch,a,f0); if(n)return {a:a,f:f0,n:n}; } }
    var y=ZAtlas._any[ch]; return y?{a:y[0],f:y[1],n:ZAtlas.count(ch,y[0],y[1]),any:true}:null; },
  MOVE_FALL:['move','float','walk','ride_side','still','idle'], IDLE_FALL:['idle','still','float','ride_side','move'], ATK_FALL:['melee','ranged','cast','slam','sweep','lunge','charge','beam','breath','grab','idle','still','float'],

  // ── sizes ────────────────────────────────────────────────────────────
  // ink of a pixel sprite frame: m = √(pixels), h = ink height (texture px)
  pix:function(key,frame){ var id=key+'|'+frame, c=ZAtlas._pix[id]; if(c)return c; try{ var T=game.textures; if(!T.exists(key))return null; var fr=T.getFrame(key,frame)||T.getFrame(key), w=fr.cutWidth, h=fr.cutHeight; if(!w||!h)return null;
      var cv=document.createElement('canvas'); cv.width=w; cv.height=h; var x=cv.getContext('2d'); x.drawImage(fr.source.image,fr.cutX,fr.cutY,w,h,0,0,w,h); var d=x.getImageData(0,0,w,h).data, n=0, top=h, bot=-1;
      for(var yy=0;yy<h;yy++){ var any=false; for(var xx=0;xx<w;xx++)if(d[(yy*w+xx)*4+3]>40){ n++; any=true; } if(any){ if(yy<top)top=yy; bot=yy; } }
      c={m:Math.sqrt(n),h:bot>=top?bot-top+1:0,fh:h}; if(n)ZAtlas._pix[id]=c; return c; }catch(e){ return null; } },
  heroK:function(){ var C=ZAtlas.META.chars.hero_m; return ZAtlas.SCALE*ZAtlas.HERO_STANDIN/((C&&C.h0)||112); },
  // the pixel hero's ink on screen (25 × 42 px sprite): m = √area, h = height
  heroPix:function(){ if(ZAtlas._hp)return ZAtlas._hp; var P=ZAtlas.pix('hero_front_0','__BASE'); if(!P||!P.m)return {m:22,h:40}; var s=ZAtlas.HERO_STANDIN/P.fh; return (ZAtlas._hp={m:P.m*s,h:P.h*s}); },
  // Scale for a painted character whose pixel sprite P was shown at scale sc: as tall next to the painted hero as the
  // pixel sprite was next to the pixel hero, nudged by up to 18% toward equal ink area (so a low, wide creature is not
  // drawn too wide and a spindly one not too small). Area alone is not used: glows and wings inflate it.
  kPix:function(ch,P,sc){ var C=ZAtlas.META.chars[ZAtlas.A(ch)], H=ZAtlas.META.chars.hero_m, hp=ZAtlas.heroPix(), k0=ZAtlas.heroK(); if(!C||!H||!P||!P.m||!P.h)return k0; sc=Math.abs(sc||1);
    var kh=k0*(H.h0/hp.h)*(P.h*sc)/C.h0; if(!C.a0||!H.a0)return kh; var km=k0*(H.a0/hp.m)*(P.m*sc)/C.a0; return kh*Math.max(0.85,Math.min(1.18,Math.sqrt(km/kh))); },
  // by height alone: a body h px tall on screen in the pixel game (riders, bosses, animals)
  kHeight:function(ch,h){ var C=ZAtlas.META.chars[ZAtlas.A(ch)], H=ZAtlas.META.chars.hero_m, hp=ZAtlas.heroPix(); return C?ZAtlas.heroK()*((H&&H.h0)||112)/hp.h*h/C.h0:ZAtlas.heroK(); },
  // scale for an image that wore a pixel sprite (remembered in im._zo by wear)
  kIm:function(im,ch){ var o=im._zo; if(!o)return ZAtlas.heroK(); if(o.k&&o.kc===ch)return o.k; o.kc=ch; if(ch.indexOf('mt_')===0)return (o.k=ZAtlas.kHeight(ch,ZAtlas.MOUNT_H*ZAtlas.heroPix().h)); if(ch.indexOf('ride_')===0)return (o.k=ZAtlas.rideK(null,ch));
    var P=ZAtlas.pix(o.key,'0')||ZAtlas.pix(o.key,o.fr); return (o.k=ZAtlas.kPix(ch,P,o.sx)); },
  // take an image over from the sweeper before a proper hook drives it
  own:function(im){ if(im._zw){ im._zw=null; if(im._zo)ZAtlas.unwear(im); } im._zm=true; },

  // ── the hero ─────────────────────────────────────────────────────────
  FACE:{left:'s',right:'s',up:'b',down:'f'},
  // Mounts are the one exception to "as large as the pixel sprite" (Kris, round 26: the hero on the horse was too big):
  // rider and mount together stand 1.3 × the hero's height, a mount on its own 1.05 ×, the same for every mount.
  RIDE_H:1.3, MOUNT_H:1.05,
  rideK:function(scene,rc){ return ZAtlas.kHeight(rc,ZAtlas.RIDE_H*ZAtlas.heroPix().h); },
  hero:function(scene,sprite,st,vx,vy,dt,atkTimer,bowTimer){
    var who=typeof _heroWho==='function'?_heroWho(scene):'m', ch='hero_'+who, S=ZAtlas.state(ch); scene._zHeroSpr=sprite; if(!sprite._zm||sprite._zw)ZAtlas.own(sprite);
    var ps=(scene.worldScene&&scene.worldScene.playerState)||scene.playerState;
    if(S==='load'){ ZAtlas.hide(sprite,true); st.painted=true; st.zride=!!(ps&&ps.mount); return true; } ZAtlas.hide(sprite,false); if(S!=='ok'||typeof ZSPR==='undefined')return false;
    var H=ZSPR.HERO, f=ZAtlas.FACE[st.dir]||'f', moving=!!(vx||vy), anim, i=0, c=ch, P, k=ZAtlas.heroK();
    st._zt=(st._zt||0)+dt; st.zride=false;
    var fr=function(list,face){ P=ZAtlas.pick(c,list,face); return P; };
    if(ps&&ps.mount){ var rc='ride_'+who+'_'+ps.mount, RS=ZAtlas.state(rc);
      if(RS==='load'){ st.zride=true; st.painted=true; ZAtlas.hide(sprite,true); return true; }
      if(RS==='ok'){ c=rc; fr([f==='s'?'ride_side':f==='f'?'ride_front':'ride_back','ride_side'],'x'); i=moving?Math.floor(st._zt/0.12)%P.n:0; k=ZAtlas.rideK(scene,rc,who,ps.mount); st.zride=true; }
      else if(RS==='bad')return false; }               // (a mount with no painted sheet: the hero walks on foot frames below)
    if(c===ch){
      if(bowTimer>0){ fr([H.animFor(ps,'ranged'),'ranged_bow','idle'],f); i=Math.min(P.n-1,Math.floor((1-bowTimer/0.7)*P.n)); }
      else if(atkTimer>0){ fr([H.animFor(ps,'melee'),'melee_sword','idle'],f); i=Math.min(P.n-1,Math.floor((1-atkTimer/0.45)*P.n)); }
      else if(st.cast>0){ st.cast-=dt; fr([st.castAnim||H.animFor(ps,'spell'),'magic_hand','cheer','idle'],f); i=Math.min(P.n-1,Math.floor((1-st.cast/(st.castT||0.4))*P.n)); }
      else if(st.blocking||scene._shielding){ fr(['block','idle'],f); i=Math.min(P.n-1,st._zt>0.12?1:0); }
      else if(moving){ fr([(st.running||scene._sprintTimer>0)?'run':null,'walk','run','idle'],f); i=Math.floor(st._zt/(P.a==='run'?0.11:0.1))%P.n; }
      else { fr(['idle','walk'],f); i=P.a==='idle'?Math.floor(st._zt/0.6)%P.n:0; } }
    if(!P)return false; anim=P.a; i=Math.max(0,Math.min(P.n-1,i));
    if(st._za!==anim+P.f){ st._za=anim+P.f; if(anim!=='walk'&&anim!=='run'&&anim.indexOf('ride')!==0)st._zt=0; }
    if(!ZAtlas.set(sprite,c,anim,P.f,i))return false;
    sprite.setScale(k).setFlipX(st.dir==='left'); st.anim=anim; st.painted=true; return true; },

  // ── monsters and bosses ──────────────────────────────────────────────
  // which painted character a monster is: its roster id, its boss slot (rig), or the character id its roster entry names
  monCh:function(mon,spr){ if(mon._zch)return mon._zch; var c=null, R=spr&&spr._rig; if(R&&R.D&&R.D.id)c=String(R.D.id).split('.')[0]; if(!c||!ZAtlas.META.chars[ZAtlas.A(c)]){ var r=mon.rid, R0=r&&typeof MON_BY_ID!=='undefined'&&MON_BY_ID[r]; c=(r&&ZAtlas.META.chars[ZAtlas.A(r)])?r:(R0&&R0.chId&&ZAtlas.META.chars[R0.chId])?R0.chId:(c||r); }
    return (mon._zch=c||''); },
  monOn:function(scene,mon,spr,ch){ ZAtlas.own(spr); var Z=mon._zs={t:Math.random()*2,x:mon.x,y:mon.y,mv:0,hp:mon._hp!==undefined?mon._hp:mon.hp,o:0,sc:spr.scaleX,ox:spr.originX,oy:spr.originY,sy:spr.y,face:'s',bars:[],key:spr.texture.key};
    var C=ZAtlas.META.chars[ZAtlas.A(ch)], R=spr._rig, k, P;
    if(R){ // a boss on its rig: the rig keeps moving, breathing and fading it; only frame, origin and base scale change
      k=ZAtlas.kHeight(ch,R.D.h); Z.rig=true; /* D.h = the boss's designed body height on screen */ Z.k=k; spr._zk=k; spr.setOrigin(0.5,1); R.laid=false; mon._za=true; return Z; }
    var R0=mon.R||(typeof MON_BY_ID!=='undefined'&&MON_BY_ID[mon.rid]), key=spr.texture.key;
    try{ if(R0&&typeof MX!=='undefined')key=MX.tex(scene,R0); }catch(e){}
    P=ZAtlas.pix(key,'0'); k=ZAtlas.kPix(ch,P,Z.sc); var r=(mon.def&&mon.def.r)||12; Z.k=k; Z.fy=Math.round(r*0.9+4); Z.ly=null;
    var top=Z.fy-k*C.h0, L=(mon.cont&&mon.cont.list)||[];
    L.forEach(function(o){ if(o===spr)return; if(o.type==='Rectangle'){ Z.bars.push([o,o.y]); o.y=top-5; } else if(o.type==='Text'){ Z.bars.push([o,o.y]); o.y=top-13; } });
    if(mon._lazyVis&&mon._lazyVis.name){ Z.lazyY=mon._lazyVis.name[0]; mon._lazyVis.name[0]=top-13; } Z.top=top;
    spr._lazyR=null; spr.setOrigin(0.5,1).setScale(k); mon._za=true; return Z; },
  monOff:function(scene,mon,spr){ var Z=mon._zs; mon._za=false; if(!Z)return; mon._zs=null;
    if(Z.rig){ spr._zk=0; try{ spr.setTexture(Z.key,'0'); }catch(e){} spr.setOrigin(Z.ox,Z.oy); if(spr._rig)spr._rig.laid=false; return; }
    var R=mon.R||(typeof MON_BY_ID!=='undefined'&&MON_BY_ID[mon.rid]);
    try{ if(R&&typeof MX!=='undefined')spr.setTexture(MX.tex(scene,R),'0'); else spr.setTexture(Z.key,'0'); }catch(e){}
    spr.setOrigin(Z.ox,Z.oy).setScale(Z.sc); spr.y=Z.sy; Z.bars.forEach(function(b){ if(b[0]&&b[0].scene)b[0].y=b[1]; }); if(mon._lazyVis&&mon._lazyVis.name&&Z.lazyY!==undefined)mon._lazyVis.name[0]=Z.lazyY; },
  mon:function(scene,mon,m,dt,dx,dy){ var spr=mon.spr||mon.body; if(!spr||!spr.setTexture)return false; var ch=ZAtlas.monCh(mon,spr), S=ch?ZAtlas.state(ch):'none';
    if(S==='load'){ spr._zm=true; ZAtlas.hide(spr,true); return false; } ZAtlas.hide(spr,false);
    if(S!=='ok'||typeof ZSPR==='undefined'){ if(mon._za)ZAtlas.monOff(scene,mon,spr); return false; }
    var Z=mon._za?mon._zs:ZAtlas.monOn(scene,mon,spr,ch), hp=mon._hp!==undefined?mon._hp:mon.hp; Z.t+=dt;
    var mdx=mon.x-Z.x, mdy=mon.y-Z.y, sp=Math.hypot(mdx,mdy)/Math.max(dt,0.001); Z.x=mon.x; Z.y=mon.y; if(sp>8){ Z.mv=0.18; Z.vx=mdx; Z.vy=mdy; } else Z.mv-=dt;
    if(hp<Z.hp)Z.hurt=0.16; Z.hp=hp; if(Z.hurt>0)Z.hurt-=dt;
    var vx=Z.mv>0?Z.vx:dx, vy=Z.mv>0?Z.vy:dy, aggro=m?m.aggro:(mon.state&&mon.state!=='wander');
    if(Z.mv>0||aggro)Z.face=Math.abs(vy)>Math.abs(vx)*1.25?(vy<0?'b':'f'):'s';
    var M=ZSPR.MOD, mvA=(mon.kit&&mon.kit.move&&M[mon.kit.move.name])||'move', P=null, i=0, ff=spr._rig&&spr._rig.ff;       // ff: a boss pattern forcing wind-up ('2') or strike ('3')
    if(mon.dead){ P=ZAtlas.pick(ch,['death','hurt','idle'],Z.face); if(P)i=P.n-1; }
    else if(m&&m.down>0){ P=ZAtlas.pick(ch,['revive','death','hurt'],'s'); if(P)i=P.a==='revive'?0:P.n-1; }
    else if(m&&m.busy){ var b=m.busy, a=M[b.a.name]||'melee'; P=ZAtlas.pick(ch,[a].concat(ZAtlas.ATK_FALL),Z.face); if(P){ Z.atk=P.a; i=b.phase==='wind'?(P.n>2?Math.min(P.n-2,Math.floor((b.t||0)/Math.max(0.05,b.wind||0.3)*(P.n-1))):0):P.n-1; } }
    else if(ff==='2'||ff==='3'||(m&&m.strikeT>0)||(!m&&mon.atkTimer>0.25)){ P=ZAtlas.pick(ch,[Z.atk].concat(ZAtlas.ATK_FALL),Z.face); if(P)i=ff==='2'?0:P.n-1; }
    else if(Z.hurt>0){ P=ZAtlas.pick(ch,['hurt','idle','still','float'],Z.face); }
    if(!P&&m&&(m.hidden||m.lurk)){ P=ZAtlas.pick(ch,[mvA==='hide'||mvA==='burrow'||mvA==='perch'||mvA==='swim'?mvA:null,'hide','still','idle'],Z.face); if(P&&P.a!=='hide'&&P.a!==mvA)i=0; }
    if(!P){ if(Z.mv>0){ P=ZAtlas.pick(ch,[mvA].concat(ZAtlas.MOVE_FALL),Z.face); if(P)i=Math.floor(Z.t/0.13)%P.n; } else { P=ZAtlas.pick(ch,ZAtlas.IDLE_FALL,Z.face); if(P)i=(P.a==='float'||P.a==='move')?(P.a==='float'?Math.floor(Z.t/0.16)%P.n:0):Math.floor(Z.t/0.55)%P.n; } }
    if(!P||!ZAtlas.set(spr,ch,P.a,P.f,Math.max(0,Math.min(P.n-1,i)))){ ZAtlas.monOff(scene,mon,spr); return false; }
    mon._zanim=P.a; if(Z.rig)return true;
    if(spr.y!==Z.ly)Z.o=spr.y-Z.sy; spr.y=Z.ly=Z.fy+Z.o; if(spr.scaleX!==Z.k)spr.setScale(Z.k);
    return true; },
  // legacy (non-engine) bosses on the rig: called from the rig's own loop (10k)
  rigTick:function(scene,R,dt){ var b=R.body, mon=R.mon; if(mon&&mon.mx)return !!mon._za;      // engine bosses are driven from MX.anim
    if(!mon){ mon=R._zmon||(R._zmon={hp:1,def:{r:14}}); mon.x=R.cont?R.cont.x:b.x; mon.y=R.cont?R.cont.y:b.y; mon.body=b; mon.cont=R.cont; }
    var pp=(typeof CHX!=='undefined'&&CHX.ppos(scene))||mon; if(!mon._za&&Math.hypot(pp.x-mon.x,pp.y-mon.y)>1500)return false;      // far away: its page is not loaded yet
    return ZAtlas.mon(scene,mon,null,dt,pp.x-mon.x,pp.y-mon.y); },
  // a short painted death: the last pose stays a moment and fades
  died:function(scene,mon){ try{ if(!mon||!mon._za||!mon._zch||mon._zs.rig)return; var ch=mon._zch, P=ZAtlas.pick(ch,['death'],mon._zs.face); if(!P||P.a!=='death')return; var spr=mon.spr||mon.body, n0=ZAtlas.name(ch,'death',P.f,0), key='za_'+ZAtlas.META.frames[n0][0];
      var im=scene.add.image(mon.x,mon.y+mon._zs.fy,key,n0).setOrigin(0.5,1).setScale(mon._zs.k).setFlipX(spr.flipX).setDepth(mon.cont?mon.cont.depth:9); im._zm=true;
      scene.tweens.addCounter({from:0,to:1,duration:700,onUpdate:function(tw){ var u=tw.getValue(), j=Math.min(P.n-1,Math.floor(u*P.n*1.6)); if(im.scene)im.setFrame(ZAtlas.name(ch,'death',P.f,j)).setAlpha(u<0.6?1:1-(u-0.6)/0.4); },onComplete:function(){ im.destroy(); }}); }catch(e){} },

  // ── everything that is one image: village folk, keepers, familiars, fairies, mounts ──
  // wear(): put a painted frame on an image that normally shows a pixel sprite, keeping its feet where the pixel
  // sprite's feet were (centre:true keeps a floating thing centred instead). unwear() puts the pixel sprite back.
  memo:function(im){ return im._zo||(im._zo={key:im.texture.key,fr:im.frame.name,sx:im.scaleX,sy:im.scaleY,ox:im.originX,oy:im.originY,h:im.frame.realHeight}); },
  wear:function(im,ch,a,f,i,k,centre){ ZAtlas.memo(im);
    if(!ZAtlas.set(im,ch,a,f,i)){ ZAtlas.unwear(im); return false; } var o=im._zo; if(!k)k=ZAtlas.kIm(im,ch); im.setScale(k);
    if(centre)im.setOrigin(0.5,0.5); else im.setDisplayOrigin(im.frame.realWidth*0.5,im.frame.realHeight-((1-o.oy)*o.h-2)*Math.abs(o.sy)/k);
    return true; },
  unwear:function(im){ var o=im._zo; if(!o)return; im._zo=null; try{ im.setTexture(o.key,o.fr); }catch(e){} im.setScale(o.sx,o.sy).setOrigin(o.ox,o.oy); },
  // gate used by the single-image hooks: true = handled here (hidden while loading); false = go on / fall back
  gate:function(im,ch){ if(!im._zm||im._zw)ZAtlas.own(im); var S=ZAtlas.state(ch); if(S==='load'){ ZAtlas.hide(im,true); return 'load'; } ZAtlas.hide(im,false); if(S!=='ok'){ if(im._zo)ZAtlas.unwear(im); return 'no'; } return 'ok'; },
  // one call for the simple cases: anims = wanted animation first, then fall-backs; rate = frames per second
  simple:function(im,ch,anims,f,t,rate,centre,k){ if(!im)return false; var G=ZAtlas.gate(im,ch); if(G!=='ok')return G==='load';
    var P=ZAtlas.pick(ch,anims,f); if(!P){ if(im._zo)ZAtlas.unwear(im); return false; } return ZAtlas.wear(im,ch,P.a,P.f,Math.floor(t*rate)%P.n,k,centre); },
  // village folk and keepers (CHX._tick): f = the pixel frame it would show (0/1 idle, 2/3 doing its job)
  npc:function(scene,im,f,dt){ var R=im._ch, ch=R&&R.id; if(!ch||R.cat==='boss'||im._rig)return false; var G=ZAtlas.gate(im,ch); if(G!=='ok')return G==='load';
    var wx=im.parentContainer?im.parentContainer.x:im.x, wy=im.parentContainer?im.parentContainer.y:im.y, mvx=im._zx===undefined?0:wx-im._zx, mvy=im._zy===undefined?0:wy-im._zy; im._zx=wx; im._zy=wy;
    if(Math.hypot(mvx,mvy)>0.3){ im._zmv=0.2; im._zf=Math.abs(mvy)>Math.abs(mvx)*1.25?(mvy<0?'b':'f'):'s'; } else im._zmv=(im._zmv||0)-dt;
    var pp=typeof CHX!=='undefined'&&CHX.ppos(scene), near=pp&&Math.hypot(pp.x-wx,pp.y-wy)<64, P=null, rate=1.8;
    if(im._zmv>0&&ZAtlas.count(ch,'move',im._zf)){ P=ZAtlas.pick(ch,['move'],im._zf); rate=7.5; }
    else if(f>=2&&ZAtlas.count(ch,'work','f')){ P=ZAtlas.pick(ch,['work'],'f'); rate=5; }
    else if(near&&ZAtlas.count(ch,'talk','f')){ P=ZAtlas.pick(ch,['talk'],'f'); rate=3; }
    else P=ZAtlas.pick(ch,['idle','ride_side','work','talk','still','float'],'f');
    if(!P){ if(im._zo)ZAtlas.unwear(im); return false; }
    return ZAtlas.wear(im,ch,P.a,P.f,Math.floor(im._t*rate)%P.n); },

  // ── animals (were drawn as shapes): one painted image per animal ──
  ANIMAL_H:{rabbit:12,butterfly:9,frog:9,heron:20,lizard:7,goat:17,fire_imp:13,ash_crow:10},        // old body height in px
  animal:function(scene,a,type,large){ var ch='animal_'+(type==='fire_imp'?'fire_imp_critter':type), S=ZAtlas.state(ch); if(S==='none'||S==='bad')return false; if(S==='load')return true;
    var im=a._zim, mv=Math.hypot(a.vx||0,a.vy||0)>4||a.state==='flee', P=ZAtlas.pick(ch,mv?ZAtlas.MOVE_FALL:ZAtlas.IDLE_FALL,'q'); if(!P)return false;
    var t=scene.time.now/1000, i=Math.floor((t+(a.ph0||(a.ph0=Math.random()*3)))*(mv?9:1.6))%P.n, n=ZAtlas.name(ch,P.a,P.f,i), key='za_'+ZAtlas.META.frames[n][0]; ZAtlas._use[ZAtlas.META.frames[n][0]]=Date.now();
    if(!im||!im.scene){ im=a._zim=scene.add.image(a.x,a.y,key,n).setOrigin(0.5,1); im._zm=true; ZAtlas._an.push(im); } else if(im.frame.name!==n)im.setTexture(key,n);
    var h=large?1.7*((a.def&&a.def.r)||14):(ZAtlas.ANIMAL_H[type]||12), fy=large?((a.def&&a.def.r)||14):5;
    im.setScale(ZAtlas.kHeight(ch,h)).setPosition(Math.round(a.x),Math.round(a.y+fy)).setDepth(typeof WR_DEPTH==='function'?WR_DEPTH(a.y+fy):6).setVisible(true); if(Math.abs(a.vx||0)>2)im.setFlipX(a.vx<0);
    if(a.hitFlash>0)ZENG.tintFill(im,0xffffff); else im.clearTint(); im._zseen=scene.game.loop.frame; return true; },
  // ── a vehicle drawn from shapes in a container (the sky skiff): the painted picture replaces the shapes ──
  vehicle:function(scene,cont,ch,h,moving,busy,dt){ var S=ZAtlas.state(ch); if(S==='none'||S==='bad'){ if(cont._zveh){ cont._zveh.setVisible(false); cont.list.forEach(function(o){ if(o!==cont._zveh)o.setVisible(true); }); } return false; }
    cont.list.forEach(function(o){ if(o!==cont._zveh)o.setVisible(false); }); if(S==='load')return true;
    var P=ZAtlas.pick(ch,[busy?'ranged':null,moving?'move':null,'idle','move'],'x'); if(!P)return false; cont._zt=(cont._zt||0)+dt; var i=Math.floor(cont._zt*(P.a==='idle'?2:8))%P.n, n=ZAtlas.name(ch,P.a,P.f,i), key='za_'+ZAtlas.META.frames[n][0]; ZAtlas._use[ZAtlas.META.frames[n][0]]=Date.now();
    var im=cont._zveh; if(!im||!im.scene){ im=cont._zveh=scene.add.image(0,0,key,n).setOrigin(0.5,0.5); im._zm=true; cont.add(im); } else if(im.frame.name!==n)im.setTexture(key,n);
    im.setVisible(true).setScale(ZAtlas.kHeight(ch,h)); return true; },

  // ── the sweeper: any image still wearing a pixel character texture gets its painted frames ──
  chOfKey:function(key,frame){ var m;
    if(key==='mx__lazy')return null;
    if((m=/^mx_(.+)$/.exec(key))){ var R0=typeof MON_BY_ID!=='undefined'&&MON_BY_ID[m[1]]; return ZAtlas.META.chars[ZAtlas.A(m[1])]?m[1]:(R0&&R0.chId)||m[1]; }
    if((m=/^ch_(.+)$/.exec(key)))return m[1];
    if((m=/^ba_([^.]+)/.exec(key)))return /^\d+$/.test(String(frame))?m[1]:null;
    if((m=/^spirit_(.+)$/.exec(key))){ var D=typeof SPIRIT_BY_ID!=='undefined'&&SPIRIT_BY_ID[m[1]]; return D?'fam_'+D.el:null; }
    if((m=/^fairymonarch_(.+)$/.exec(key)))return 'monarch_'+m[1];
    if((m=/^fairy_(.+)$/.exec(key)))return 'fairy_'+m[1];
    if((m=/^hero(F?)_(horse_)?(front|back|side|bow|attack)/.exec(key)))return (m[2]?'ride_':'hero_')+(m[1]?'f':'m')+(m[2]?'_horse':'');
    return null; },
  scan:function(){ if(ZAtlas.off||typeof game==='undefined'||!game.scene)return; var walk=function(L){ for(var i=0;i<L.length;i++){ var o=L[i]; if(o.list){ walk(o.list); continue; } if(o._zm||o._zw||o._rig||!o.texture||!o.frame||(o.type!=='Image'&&o.type!=='Sprite'))continue;
        var ch=ZAtlas.chOfKey(o.texture.key,o.frame.name); if(!ch||!ZAtlas.META.chars[ZAtlas.A(ch)]){ if(ch)o._zm=true; continue; } o._zw={ch:ch,t:Math.random()*3,mv:0,key:o.texture.key}; ZAtlas._sw.push(o); } };
    game.scene.getScenes(true).forEach(function(sc){ if(sc.children&&sc.children.list)walk(sc.children.list); }); },
  tick:function(dt){ if(typeof game==='undefined')return; ZAtlas._swT-=dt; if(ZAtlas._swT<=0){ ZAtlas._swT=0.3; try{ ZAtlas.scan(); }catch(e){} }
    var L=ZAtlas._sw, i, o, W;
    for(i=L.length-1;i>=0;i--){ o=L[i]; W=o._zw; if(!o.scene||!o.active||!W||o._zm){ L.splice(i,1); continue; }
      try{ var S=ZAtlas.state(W.ch); if(S==='load'){ ZAtlas.hide(o,true); continue; } ZAtlas.hide(o,false); if(S!=='ok'){ if(o._zo)ZAtlas.unwear(o); continue; }
        W.t+=dt; var p=o.parentContainer, wx=o.x+(p?p.x:0), wy=o.y+(p?p.y:0); if(W.x!==undefined&&Math.hypot(wx-W.x,wy-W.y)>0.4){ W.mv=0.2; if(Math.abs(wx-W.x)>0.3)o.setFlipX(wx<W.x); } else W.mv-=dt; W.x=wx; W.y=wy;
        var f=/hero_.*back|horse_back/.test(W.key)?'b':/front/.test(W.key)?'f':'s', ride=W.ch.indexOf('ride_')===0||W.ch.indexOf('mt_')===0;
        var P=ride?ZAtlas.pick(W.ch,[f==='b'?'ride_back':f==='f'?'ride_front':'ride_side','ride_side'],'x'):ZAtlas.pick(W.ch,W.mv>0?ZAtlas.MOVE_FALL:ZAtlas.IDLE_FALL,f); if(!P)continue;
        var rate=(W.mv>0||P.a==='float')?7:1.7, cen=!!(o._zo?o._zo.oy<0.7:o.originY<0.7), isHero=W.ch.indexOf('hero_')===0;
        ZAtlas.wear(o,W.ch,P.a,P.f,(W.mv>0||P.a==='float'||P.a==='idle')?Math.floor(W.t*rate)%P.n:0,isHero?ZAtlas.heroK()*Math.abs(ZAtlas.memo(o).sy)*o._zo.h/42:0,cen); }catch(e){} }
    try{ ZAtlas.evict(dt); }catch(e){}
    L=ZAtlas._an; var fr=game.loop.frame; for(i=L.length-1;i>=0;i--){ o=L[i]; if(!o.scene){ L.splice(i,1); continue; } if(fr-o._zseen>2&&o.visible)o.setVisible(false); } },
  start:function(g){ if(ZAtlas._started||!g||!g.events)return; ZAtlas._started=true; g.events.on('poststep',function(t,ms){ try{ ZAtlas.tick(Math.min(0.1,(ms||16)/1000)); }catch(e){} }); },

  // ── pictures for the book and menus (DOM canvases) ──
  // a page as a plain image for drawing thumbnails (no game texture is made; at most 4 are kept)
  pageImg:function(p,cb){ var I=ZAtlas.img[p]||(ZAtlas._ti&&ZAtlas._ti[p]); if(I&&I.complete&&I.naturalWidth){ cb(I); return; } var T=ZAtlas._ti||(ZAtlas._ti={}), Q=ZAtlas._tq||(ZAtlas._tq={});
    if(Q[p]){ Q[p].push(cb); return; } Q[p]=[cb]; var img=new Image(); img.onload=function(){ var ks=Object.keys(T); if(ks.length>=4)delete T[ks[0]]; T[p]=img; var L=Q[p]; delete Q[p]; L.forEach(function(f){ try{ f(img); }catch(e){} }); };
    img.onerror=function(){ var L=Q[p]; delete Q[p]; L.forEach(function(f){ try{ f(null); }catch(e){} }); }; img.src=ZAtlas.BASE+p+'.webp'; },
  // one small standing picture of a character from assets/atlas/thumbs.webp (one file for everybody): cb(canvas | null)
  thumb1:function(ch,size,cb){ var M=ZAtlas.META, A=ZAtlas.A(ch), i=M.thumbs&&M.thumbs[A]; if(ZAtlas.off||i===undefined||!M.thumb){ cb(null); return; } var C=ZAtlas._t1||(ZAtlas._t1={}), id=A+'|'+size; if(C[id]){ cb(C[id]); return; }
    var draw=function(img){ if(!img){ cb(null); return; } var T=M.thumb[0], cv=document.createElement('canvas'); cv.width=cv.height=size; var x=cv.getContext('2d'); x.imageSmoothingEnabled=true; x.drawImage(img,(i%M.thumb[1])*T,Math.floor(i/M.thumb[1])*T,T,T,0,0,size,size); C[id]=cv; cb(cv); };
    if(ZAtlas._timg){ if(ZAtlas._timg.complete&&ZAtlas._timg.naturalWidth)draw(ZAtlas._timg); else ZAtlas._tw.push(draw); return; }
    ZAtlas._tw=[draw]; var im=ZAtlas._timg=new Image(); im.onload=function(){ ZAtlas._tw.splice(0).forEach(function(f){ f(im); }); }; im.onerror=function(){ ZAtlas._timg=null; ZAtlas._tw.splice(0).forEach(function(f){ f(null); }); }; im.src=ZAtlas.BASE+'thumbs.webp'; },
  // up to `max` square canvases of the character (idle frames, then an attack or its work), drawn at one scale with the feet on one line.
  // cb(list | null) — at once when cached, otherwise when the page has loaded. Returns the cached list or null.
  thumbs:function(ch,size,max,cb){ if(!ch||!ZAtlas.has(ch)){ if(cb)cb(null); return null; } var id=ch+'|'+size+'|'+(max||8), C=ZAtlas._tc||(ZAtlas._tc={}); if(C[id]){ if(cb)cb(C[id]); return C[id]; }
    var P=ZAtlas.pick(ch,['idle','still','float','ride_side','move'],'f'); if(!P){ if(cb)cb(null); return null; } var F=ZAtlas.META.frames, i, f, L=[];
    for(i=0;i<P.n;i++)L.push(ZAtlas.name(ch,P.a,P.f,i)); var Q=ZAtlas.pick(ch,ZAtlas.ATK_FALL.slice(0,10).concat(['work','talk']),P.f); if(Q&&!Q.any&&Q.a!==P.a)for(i=0;i<Q.n;i++)L.push(ZAtlas.name(ch,Q.a,Q.f,i));
    L=L.slice(0,max||8); var hw=1, up=1, dn=0; L.forEach(function(nm){ f=F[nm]; hw=Math.max(hw,f[5]/2-f[7],f[7]+f[3]-f[5]/2); up=Math.max(up,f[6]-f[8]); dn=Math.max(dn,f[8]+f[4]-f[6]); }); var sc=size*0.94/Math.max(2*hw,up+dn), base=size*0.97-dn*sc;
    var pages={}, need=0, out=[]; L.forEach(function(nm){ if(!pages[F[nm][0]]){ pages[F[nm][0]]=1; need++; } });
    var done=function(){ L.forEach(function(nm){ var g=F[nm], img=pages[g[0]]; if(!img||img===1)return; var cv=document.createElement('canvas'); cv.width=cv.height=size; var x=cv.getContext('2d'); x.imageSmoothingEnabled=true;
        x.drawImage(img,g[1],g[2],g[3],g[4],size/2+(g[7]-g[5]/2)*sc,base+(g[8]-g[6])*sc,g[3]*sc,g[4]*sc); out.push(cv); }); if(out.length)C[id]=out; if(cb)cb(out.length?out:null); };
    Object.keys(pages).forEach(function(p){ ZAtlas.pageImg(p,function(img){ pages[p]=img; if(--need===0)done(); }); }); return C[id]||null; },

  // ── memory: a loaded page is up to 16 MB of graphics memory. Pages nobody has drawn from for a while are dropped
  //    (they load again when needed). A page is only dropped when nothing visible is wearing it. ──
  KEEP:14, IDLE:40, _use:{}, _evT:5,
  evict:function(dt){ ZAtlas._evT-=dt; if(ZAtlas._evT>0)return; ZAtlas._evT=5; var now=Date.now(), L=Object.keys(ZAtlas.st).filter(function(p){ return ZAtlas.st[p]==='ok'; }); if(L.length<=ZAtlas.KEEP)return;
    L.sort(function(a,b){ return (ZAtlas._use[a]||0)-(ZAtlas._use[b]||0); }); var p=L[0]; if(now-(ZAtlas._use[p]||0)<ZAtlas.IDLE*1000)return; var key='za_'+p, users=[], vis=false;
    var walk=function(arr,shown){ for(var i=0;i<arr.length&&!vis;i++){ var o=arr[i], sh=shown&&o.visible!==false; if(o.list){ walk(o.list,sh); continue; } if(o.texture&&o.texture.key===key){ if(sh&&o.alpha>0)vis=true; else users.push(o); } } };
    game.scene.scenes.forEach(function(sc){ if(!vis&&sc.children&&sc.sys&&sc.sys.settings.status<8)walk(sc.children.list,true); }); if(vis){ ZAtlas._use[p]=now; return; }
    users.forEach(function(o){ try{ o.setTexture('__DEFAULT'); }catch(e){} }); try{ game.textures.remove(key); }catch(e){} delete ZAtlas.st[p]; delete ZAtlas.img[p]; }
};
