// ═══════════════════════════════════════════════════════════════════════
// ║ PAINTED SPRITES (round 23) — ZAtlas.
// ║ tools/sprites/intake.py --atlas packs the cut ChatGPT frames into
// ║ assets/atlas/<name>-<n>.webp and index.json; build.mjs puts the index into
// ║ the page as ZATLAS_META. Pages are loaded as plain images the first time a
// ║ character on them is needed, so this also works from a file:// page.
// ║   frame name:  <character>/<anim>/<facing>/<n>   (feet = bottom centre)
// ║   ZAtlas.ready(ch)            are this character's pages loaded? (starts loading)
// ║   ZAtlas.count(ch,anim,f)     how many frames that animation has
// ║   ZAtlas.set(img,ch,anim,f,i) put that frame on a Phaser image (false if missing)
// ║   ZAtlas.k(ch,standInH)       display scale: 1.5 × the stand-in's height (Kris, Oct 4)
// ║ Anything without painted frames keeps its stand-in. ?sprites=0 or the dev
// ║ panel turns the painted frames off.
// ═══════════════════════════════════════════════════════════════════════
var ZAtlas={ META:(typeof ZATLAS_META!=='undefined'&&ZATLAS_META)||{pages:{},chars:{},frames:{}}, BASE:'assets/atlas/', SCALE:1.5, HERO_STANDIN:42, st:{}, _n:{}, _f0:{}, _by:null, MON_STANDIN:28,
  off:(function(){ try{ if(/[?&]sprites=0/.test(location.search))return true; return localStorage.getItem('zeldara_sprites')==='off'; }catch(e){ return false; } })(),
  setOff:function(v){ ZAtlas.off=!!v; try{ localStorage.setItem('zeldara_sprites',v?'off':'on'); }catch(e){} },
  // BOSSES:false — boss sheets are packed (boss-w*.webp) but not used yet: the boss rig keeps today's art, and those pages are not shipped
  BOSSES:false,
  has:function(ch){ var C=ZAtlas.META.chars[ch]; return !ZAtlas.off&&!!C&&(ZAtlas.BOSSES||C.pages[0].indexOf('boss-')!==0); },
  _index:function(){ if(ZAtlas._by)return; var by={}, F=ZAtlas.META.frames; Object.keys(F).forEach(function(n){ (by[F[n][0]]=by[F[n][0]]||[]).push(n); var k=n.slice(0,n.lastIndexOf('/')); ZAtlas._n[k]=Math.max(ZAtlas._n[k]||0,+n.slice(n.lastIndexOf('/')+1)+1); var pp=n.split('/'); if(pp[2]==='s'||!ZAtlas._f0[pp[0]])ZAtlas._f0[pp[0]]=pp[2]; }); ZAtlas._by=by; },
  load:function(p){ var S=ZAtlas.st[p]; if(S)return S; ZAtlas._index(); ZAtlas.st[p]='loading'; var img=new Image();
    img.onload=function(){ try{ var T=game.textures.addImage('za_'+p,img), F=ZAtlas.META.frames; (ZAtlas._by[p]||[]).forEach(function(n){ var f=F[n], fr=T.add(n,0,f[1],f[2],f[3],f[4]); if(fr&&fr.setTrim)fr.setTrim(f[5],f[6],f[7],f[8],f[3],f[4]); }); ZAtlas.st[p]='ok'; }catch(e){ console.error('atlas',p,e); ZAtlas.st[p]='bad'; } };
    img.onerror=function(){ ZAtlas.st[p]='bad'; }; img.src=ZAtlas.BASE+p+'.webp'; return 'loading'; },
  ready:function(ch){ if(ZAtlas.off)return false; var C=ZAtlas.META.chars[ch]; if(!C||typeof game==='undefined'||!game.textures)return false; var ok=true; for(var i=0;i<C.pages.length;i++)if(ZAtlas.load(C.pages[i])!=='ok')ok=false; return ok; },
  count:function(ch,anim,f){ ZAtlas._index(); return ZAtlas._n[ch+'/'+anim+'/'+f]||0; },
  name:function(ch,anim,f,i){ var n=ch+'/'+anim+'/'+f+'/'+i; return ZAtlas.META.frames[n]?n:null; },
  set:function(img,ch,anim,f,i){ var n=ZAtlas.name(ch,anim,f,i); if(!n)return false; var key='za_'+ZAtlas.META.frames[n][0]; if(img.texture.key!==key||img.frame.name!==n)img.setTexture(key,n); return true; },
  // one painted pixel on screen, for every character: the hero's cut height (112 px) shows as 1.5 × the 42 px stand-in.
  // Each sheet was cut at its own size next to the hero (ZSPR scale), so one factor keeps everybody in proportion.
  heroK:function(){ return ZAtlas.SCALE*ZAtlas.HERO_STANDIN/112; },
  k:function(ch,standInH){ var C=ZAtlas.META.chars[ch]; return C?ZAtlas.SCALE*standInH/C.h0:1; },

  // ── the hero: which painted frame for what he or she is doing ──
  FACE:{left:'s',right:'s',up:'b',down:'f'},
  hero:function(scene,sprite,st,vx,vy,dt,atkTimer,bowTimer){
    var who=typeof _heroWho==='function'?_heroWho(scene):'m', ch='hero_'+who; if(!ZAtlas.ready(ch)||typeof ZSPR==='undefined')return false;
    var ps=(scene.worldScene&&scene.worldScene.playerState)||scene.playerState, H=ZSPR.HERO, f=ZAtlas.FACE[st.dir]||'f', moving=!!(vx||vy), anim, i=0, c=ch, ff=f, n;
    st._zt=(st._zt||0)+dt;
    if(ps&&ps.mount){ var rc='ride_'+who+'_'+ps.mount; if(!ZAtlas.ready(rc)||!ZAtlas.count(rc,'ride_side','x'))return false;      // this hero + mount is not painted yet → stand-in
      c=rc; anim=f==='s'?'ride_side':f==='f'?'ride_front':'ride_back'; ff='x'; n=ZAtlas.count(c,anim,ff); i=moving?Math.floor(st._zt/0.12)%n:0; }
    else if(bowTimer>0){ anim=H.animFor(ps,'ranged'); n=ZAtlas.count(c,anim,f); i=Math.min(n-1,Math.floor((1-bowTimer/0.7)*n)); }
    else if(atkTimer>0){ anim=H.animFor(ps,'melee'); n=ZAtlas.count(c,anim,f); i=Math.min(n-1,Math.floor((1-atkTimer/0.45)*n)); }
    else if(st.cast>0){ st.cast-=dt; anim=st.castAnim||H.animFor(ps,'spell'); if(H.ANIMS[anim]&&H.ANIMS[anim].d)ff='s'; n=ZAtlas.count(c,anim,ff); i=Math.min(n-1,Math.floor((1-st.cast/(st.castT||0.4))*n)); }
    else if(st.blocking||scene._shielding){ anim='block'; n=ZAtlas.count(c,anim,f); i=Math.min(n-1,st._zt>0.12?1:0); }
    else if(moving){ anim=((st.running||scene._sprintTimer>0)&&ZAtlas.count(c,'run',f))?'run':'walk'; n=ZAtlas.count(c,anim,f); i=Math.floor(st._zt/(anim==='run'?0.11:0.1))%Math.max(1,n); }
    else { anim='idle'; n=ZAtlas.count(c,anim,f); i=Math.floor(st._zt/0.6)%Math.max(1,n); }
    if(!n||i<0)return false;
    if(st._za!==anim+ff){ st._za=anim+ff; if(anim!=='walk'&&anim!=='run'&&anim.indexOf('ride')!==0)st._zt=0; }
    if(!ZAtlas.set(sprite,c,anim,ff,i))return false;
    var k=ZAtlas.heroK(); sprite.setScale(k).setFlipX(st.dir==='left'); st.anim=anim; st.painted=true; st.zride=c!==ch; return true; },

  // ── monsters (and anything else that wears a 4-frame stand-in): pick the painted frame ──
  // first anim+facing in the list that has frames
  pick:function(ch,anims,f){ ZAtlas._index(); var f0=ZAtlas._f0[ch]||'q'; for(var i=0;i<anims.length;i++){ var a=anims[i]; if(!a)continue; var n=ZAtlas.count(ch,a,f); if(n)return {a:a,f:f,n:n}; if(f!==f0){ n=ZAtlas.count(ch,a,f0); if(n)return {a:a,f:f0,n:n}; } } return null; },
  MOVE_FALL:['move','float','still','idle'], IDLE_FALL:['idle','still','float','move'], ATK_FALL:['melee','ranged','cast','slam','lunge','idle','still','float'],
  monOn:function(mon,spr){ var Z=mon._zs={t:Math.random()*2,x:mon.x,y:mon.y,mv:0,hp:mon._hp!==undefined?mon._hp:mon.hp,o:0,sc:spr.scaleX,oy:spr.originY,sy:spr.y,face:'s',bars:[]};
    var C=ZAtlas.META.chars[mon.rid], R0=mon.R||(typeof MON_BY_ID!=='undefined'&&MON_BY_ID[mon.rid]), k=ZAtlas.heroK()*(R0&&typeof MX!=='undefined'&&MX.scaleOf?Z.sc/MX.scaleOf(R0):1), r=(mon.def&&mon.def.r)||12; Z.k=k; Z.fy=Math.round(r*0.9+4); Z.ly=null;
    var top=Z.fy-k*C.h0, L=(mon.cont&&mon.cont.list)||[];
    L.forEach(function(o){ if(o===spr)return; if(o.type==='Rectangle'){ Z.bars.push([o,o.y]); o.y=top-5; } else if(o.type==='Text'){ Z.bars.push([o,o.y]); o.y=top-13; } });
    if(mon._lazyVis&&mon._lazyVis.name){ Z.lazyY=mon._lazyVis.name[0]; mon._lazyVis.name[0]=top-13; } Z.top=top;
    spr._lazyR=null; spr.setOrigin(0.5,1).setScale(k); mon._za=true; return Z; },
  monOff:function(scene,mon,spr){ var Z=mon._zs; mon._za=false; if(!Z)return; var R=mon.R||(typeof MON_BY_ID!=='undefined'&&MON_BY_ID[mon.rid]);
    try{ if(R&&typeof MX!=='undefined')spr.setTexture(MX.tex(scene,R),'0'); }catch(e){}
    spr.setOrigin(0.5,Z.oy).setScale(Z.sc); spr.y=Z.sy; Z.bars.forEach(function(b){ if(b[0]&&b[0].scene)b[0].y=b[1]; }); if(mon._lazyVis&&mon._lazyVis.name&&Z.lazyY!==undefined)mon._lazyVis.name[0]=Z.lazyY; mon._zs=null; },
  mon:function(scene,mon,m,dt,dx,dy){ var ch=mon.rid, spr=mon.spr||mon.body; if(!spr||!spr.setTexture||spr._rig||!ch)return false;
    if(!ZAtlas.has(ch)||!ZAtlas.ready(ch)||typeof ZSPR==='undefined'){ if(mon._za)ZAtlas.monOff(scene,mon,spr); return false; }
    var Z=mon._za?mon._zs:ZAtlas.monOn(mon,spr), hp=mon._hp!==undefined?mon._hp:mon.hp; Z.t+=dt;
    if(!mon.nameT&&!Z.named){ }   // (the lazy name label is placed by _monWake at the painted height)
    var mdx=mon.x-Z.x, mdy=mon.y-Z.y, sp=Math.hypot(mdx,mdy)/Math.max(dt,0.001); Z.x=mon.x; Z.y=mon.y; if(sp>8){ Z.mv=0.18; Z.vx=mdx; Z.vy=mdy; } else Z.mv-=dt;
    if(hp<Z.hp)Z.hurt=0.16; Z.hp=hp; if(Z.hurt>0)Z.hurt-=dt;
    var vx=Z.mv>0?Z.vx:dx, vy=Z.mv>0?Z.vy:dy, aggro=m?m.aggro:(mon.state&&mon.state!=='wander');
    if(Z.mv>0||aggro)Z.face=Math.abs(vy)>Math.abs(vx)*1.25?(vy<0?'b':'f'):'s';
    var M=ZSPR.MOD, mvA=(mon.kit&&mon.kit.move&&M[mon.kit.move.name])||'move', P=null, i=0;
    if(m&&m.down>0){ P=ZAtlas.pick(ch,['revive','death','hurt'],'s'); if(P)i=P.a==='revive'?0:P.n-1; }
    else if(m&&m.busy){ var b=m.busy, a=M[b.a.name]||'melee'; P=ZAtlas.pick(ch,[a].concat(ZAtlas.ATK_FALL),Z.face); if(P){ Z.atk=P.a; i=b.phase==='wind'?(P.n>2?Math.min(P.n-2,Math.floor((b.t||0)/Math.max(0.05,b.wind||0.3)*(P.n-1))):0):P.n-1; } }
    else if((m&&m.strikeT>0)||(!m&&mon.atkTimer>0.25)){ P=ZAtlas.pick(ch,[Z.atk].concat(ZAtlas.ATK_FALL),Z.face); if(P)i=P.n-1; }
    else if(Z.hurt>0){ P=ZAtlas.pick(ch,['hurt'],Z.face); }
    if(!P&&m&&(m.hidden||m.lurk)){ P=ZAtlas.pick(ch,[mvA==='hide'||mvA==='burrow'||mvA==='perch'||mvA==='swim'?mvA:null,'hide'],Z.face); }
    if(!P){ if(Z.mv>0){ P=ZAtlas.pick(ch,[mvA].concat(ZAtlas.MOVE_FALL),Z.face); if(P)i=Math.floor(Z.t/0.13)%P.n; } else { P=ZAtlas.pick(ch,ZAtlas.IDLE_FALL,Z.face); if(P)i=(P.a==='float'||P.a==='move')?(P.a==='float'?Math.floor(Z.t/0.16)%P.n:0):Math.floor(Z.t/0.55)%P.n; } }
    if(!P||!ZAtlas.set(spr,ch,P.a,P.f,Math.max(0,Math.min(P.n-1,i)))){ ZAtlas.monOff(scene,mon,spr); return false; }
    if(spr.y!==Z.ly)Z.o=spr.y-Z.sy; spr.y=Z.ly=Z.fy+Z.o; if(spr.scaleX!==Z.k)spr.setScale(Z.k); mon._zanim=P.a;
    return true; },
  // ── everything else that is one image: village folk, keepers, familiars, fairies, parked mounts ──
  // wear(): put a painted frame on an image that normally shows a stand-in, keeping its feet where the
  // stand-in's feet were (centre:true keeps a floating thing centred instead). unwear() puts the stand-in back.
  wear:function(im,ch,a,f,i,k,centre){ if(!im._zo)im._zo={key:im.texture.key,fr:im.frame.name,sx:im.scaleX,sy:im.scaleY,ox:im.originX,oy:im.originY,h:im.frame.realHeight};
    if(!ZAtlas.set(im,ch,a,f,i)){ ZAtlas.unwear(im); return false; } var o=im._zo; im.setScale(k);
    if(centre)im.setOrigin(0.5,0.5); else im.setDisplayOrigin(im.frame.realWidth*0.5,im.frame.realHeight-((1-o.oy)*o.h-2)*Math.abs(o.sy)/k);
    return true; },
  unwear:function(im){ var o=im._zo; if(!o)return; im._zo=null; try{ im.setTexture(o.key,o.fr); }catch(e){} im.setScale(o.sx,o.sy).setOrigin(o.ox,o.oy); },
  // one call for the simple cases: anims = wanted animation first, then fall-backs; rate = frames per second
  simple:function(im,ch,anims,f,t,rate,centre,k){ if(!im)return false; if(!ZAtlas.has(ch)||!ZAtlas.ready(ch)){ if(im._zo)ZAtlas.unwear(im); return false; }
    var P=ZAtlas.pick(ch,anims,f); if(!P){ if(im._zo)ZAtlas.unwear(im); return false; } return ZAtlas.wear(im,ch,P.a,P.f,Math.floor(t*rate)%P.n,k||ZAtlas.heroK(),centre); },
  // village folk and keepers (CHX._tick): f = the stand-in frame it would show (0/1 idle, 2/3 doing its job)
  npc:function(scene,im,f,dt){ var R=im._ch, ch=R&&R.id; if(!ch||R.cat==='boss'||R.cat==='mount')return false; if(!ZAtlas.has(ch)||!ZAtlas.ready(ch)){ if(im._zo)ZAtlas.unwear(im); return false; }
    var wx=im.parentContainer?im.parentContainer.x:im.x, wy=im.parentContainer?im.parentContainer.y:im.y, mvx=im._zx===undefined?0:wx-im._zx, mvy=im._zy===undefined?0:wy-im._zy; im._zx=wx; im._zy=wy;
    if(Math.hypot(mvx,mvy)>0.3){ im._zmv=0.2; im._zf=Math.abs(mvy)>Math.abs(mvx)*1.25?(mvy<0?'b':'f'):'s'; } else im._zmv=(im._zmv||0)-dt;
    var pp=typeof CHX!=='undefined'&&CHX.ppos(scene), near=pp&&Math.hypot(pp.x-wx,pp.y-wy)<64, P=null, rate=1.8;
    if(im._zmv>0&&(P=ZAtlas.pick(ch,['move'],im._zf))&&P.a==='move')rate=7.5;
    else if(f>=2&&(P=ZAtlas.pick(ch,['work'],'f')))rate=5;
    else if(near&&(P=ZAtlas.pick(ch,['talk'],'f')))rate=3;
    else P=ZAtlas.pick(ch,['idle','work','talk'],'f');
    if(!P){ if(im._zo)ZAtlas.unwear(im); return false; }
    var sc0=im._zo?Math.abs(im._zo.sx):Math.abs(im.scaleX); return ZAtlas.wear(im,ch,P.a,P.f,Math.floor(im._t*rate)%P.n,ZAtlas.heroK()*sc0/1.45); },
  // a short painted death: the last pose stays a moment and fades
  died:function(scene,mon){ try{ if(!mon||!mon._za||!mon.rid)return; var P=ZAtlas.pick(mon.rid,['death'],mon._zs.face); if(!P||P.a!=='death')return; var spr=mon.spr||mon.body, key='za_'+ZAtlas.META.frames[ZAtlas.name(mon.rid,'death',P.f,0)][0];
      var im=scene.add.image(mon.x,mon.y+mon._zs.fy,key,ZAtlas.name(mon.rid,'death',P.f,0)).setOrigin(0.5,1).setScale(mon._zs.k).setFlipX(spr.flipX).setDepth(mon.cont?mon.cont.depth:9), t=0;
      scene.tweens.addCounter({from:0,to:1,duration:700,onUpdate:function(tw){ var u=tw.getValue(), j=Math.min(P.n-1,Math.floor(u*P.n*1.6)); if(im.scene)im.setFrame(ZAtlas.name(mon.rid,'death',P.f,j)).setAlpha(u<0.6?1:1-(u-0.6)/0.4); },onComplete:function(){ im.destroy(); }}); }catch(e){} }
};
