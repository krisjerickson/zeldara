// ═══════════════════════════════════════════════════════════════════════
// ║ 10zsl-soullines-world.js — round 68: the soul-lines in the game (doc 30 §2; Kris: "Straight into the game").
// ║  · Each freed spirit's piece of the World-Tree is painted into the land as a rune vein (07zsl ZSL.paint), baked per ground chunk
// ║    (32 × 32 tiles) into one picture at half size — no masks, nothing redrawn per frame (doc 30 §5). Chunks are painted near the camera
// ║    only, at most two per tick, and kept while near.
// ║  · A wave of light motes runs along the lit lines near you (a small pool of sprites, brighter at night).
// ║  · Freeing a spirit traces its piece out from the runestone (~3.5 s) while the camera eases back (Kris: trace + camera pull-back).
// ║    A spirit freed far away (answer G2: "map page flash") waits: its piece glows on the map until you see it, and the trace plays when
// ║    you next walk near.
// ║  · The map shows the lit tattoo; once a realm is 8/10 freed, its missing pieces show as faint dotted ghosts (answer T3).
// ║  · After the gods (ps.spiritsHome) the lines become paths of grass and stone (doc 30 §2) and the motes stop.
// ═══════════════════════════════════════════════════════════════════════
var ZSLW={ on:true, RES:16, NEAR:48, TRACE:3.6, MOTES:34, KEEP:24,
  main:function(){ if(typeof game==='undefined'||!game.scene)return null; var ws=game.scene.getScene('World'); return (ws&&ws.wd&&!ws.wd.islKey&&ws.playerState&&ws.player&&ws.sys&&ws.sys.isActive())?ws:null; },
  data:function(ws){ var wd=ws.wd; if(wd._zsl)return wd._zsl; if(!_WCLS||typeof ZSL==='undefined'||typeof ZSPIRIT==='undefined')return null;
    var byZ={}; (ZSPIRIT.shrines(ws)||[]).forEach(function(s){ byZ[s.zone]=s; });
    var D=ZSL.build({cls:_WCLS,W:WORLD_W,H:WORLD_H,C:{x:CENTER_X,y:CENTER_Y},CH:WCH,at:function(z){ var s=byZ[z.id]; return s?{x:s.tx+0.5,y:s.ty+0.5}:null; }});
    D.shr=D.G.Z.map(function(z){ return byZ[z.id]||null; }); D.idx={}; D.shr.forEach(function(s,i){ if(s)D.idx[s.id]=i; });
    Object.keys(D.cb).forEach(function(k){ var e=D.cb[k], O={}; e.st.forEach(function(si){ D.St[si].owner.forEach(function(o){ O[o]=1; }); }); e.z.forEach(function(i){ O[i]=1; }); e.own=Object.keys(O).map(Number).sort(function(a,b){ return a-b; }); });
    return (wd._zsl=D); },
  // which pieces are drawn: freed and already traced (old saves count as traced)
  seen:function(ps){ if(!ps.slSeen)ps.slSeen=(ps.spiritsFreed||[]).slice(); return ps.slSeen; },
  litFn:function(ws){ var ps=ws.playerState, D=ZSLW.data(ws), seen=ZSLW.seen(ps), L={}, any=false, tr=ws._zslT;
    seen.forEach(function(id){ var i=D.idx[id]; if(i!==undefined&&!(tr&&tr.i===i)){ L[i]=1; any=true; } });
    return function(o){ return o===-1?any:!!L[o]; }; },
  img:function(id){ var Z=typeof _scn==='function'?_scn():null; if(!Z||!Z.has(id))return null; var it=Z.META.items[id]; return [Z.img[it[0]],it[1],it[2],it[3],it[4]]; },
  style:function(ps){ return ps.spiritsHome?'green':'vein'; },
  // ── the ground: one half-size picture per chunk that the lit tattoo crosses ──
  chunks:function(ws){ var D=ZSLW.data(ws); if(!D)return; var S=ws._zslC||(ws._zslC={m:{},seq:0}), cam=ws.cameras.main, cs=WCH*TILE, dw=cam.width/cam.zoom, dh=cam.height/cam.zoom;
    var vx=cam.scrollX+(cam.width-dw)/2, vy=cam.scrollY+(cam.height-dh)/2, x0=Math.floor(vx/cs)-1, x1=Math.floor((vx+dw)/cs)+1, y0=Math.floor(vy/cs)-1, y1=Math.floor((vy+dh)/cs)+1;
    var lit=ZSLW.litFn(ws), ps=ws.playerState, st=ZSLW.style(ps), ready=ZSLW.img('sl_ring_a')?1:0, painted=0, keep={};
    for(var cy=y0;cy<=y1;cy++)for(var cx=x0;cx<=x1;cx++){ var k=cx+'_'+cy, e=D.cb[k]; if(!e)continue; keep[k]=1;
      var sig=st+ready+e.own.map(function(o){ return lit(o)?1:0; }).join(''), c=S.m[k];
      if(c&&c.sig===sig){ c.t=Date.now(); continue; }
      if(sig.indexOf('1',st.length+1)<0){ if(c)ZSLW.drop(ws,S,k); continue; }      // nothing lit here
      if(painted>=2)continue; painted++;
      if(!c){ var cv=document.createElement('canvas'); cv.width=cv.height=WCH*ZSLW.RES; c=S.m[k]={cv:cv,key:'zsl_c'+(S.seq++)+'_'+k}; }
      var ctx=c.cv.getContext('2d'); ctx.clearRect(0,0,c.cv.width,c.cv.height);
      ZSL.paint(ctx,D,{x0:cx*WCH,y0:cy*WCH,k:ZSLW.RES},{lit:lit,style:st,img:ZSLW.img,only:e.st,runes:e.ru,zones:e.z});
      if(ws.textures.exists(c.key)){ var tx=ws.textures.get(c.key); if(tx.refresh)tx.refresh(); } else { ws.textures.addCanvas(c.key,c.cv); try{ ws.textures.get(c.key).setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(er){} }
      if(!c.im||!c.im.scene){ c.im=ws.add.image(cx*cs,cy*cs,c.key).setOrigin(0,0).setScale(TILE/ZSLW.RES).setDepth(-5.5); c.im._zsl=1; }
      c.sig=sig; c.t=Date.now(); }
    var ks=Object.keys(S.m); if(ks.length>ZSLW.KEEP)ks.filter(function(k){ return !keep[k]; }).sort(function(a,b){ return S.m[a].t-S.m[b].t; }).slice(0,ks.length-ZSLW.KEEP).forEach(function(k){ ZSLW.drop(ws,S,k); }); },
  drop:function(ws,S,k){ var c=S.m[k]; if(!c)return; if(c.im&&c.im.scene)c.im.destroy(); if(ws.textures.exists(c.key))ws.textures.remove(c.key); delete S.m[k]; },
  repaintAll:function(ws){ var S=ws._zslC; if(S)Object.keys(S.m).forEach(function(k){ S.m[k].sig=''; }); },
  // ── freeing a spirit ──
  onFree:function(ws,s){ var ps=ws.playerState, D=ZSLW.data(ws); if(!D||D.idx[s.id]===undefined)return; ZSLW.seen(ps); ps.slMapNew=s.id;
    var i=D.idx[s.id], z=D.G.Z[i], d=Math.hypot(ws.player.x/TILE-z.x,ws.player.y/TILE-z.y);
    if(d<=ZSLW.NEAR)ws.time.delayedCall(900,function(){ ZSLW.trace(ws,i); });      // scene time: it waits while the spirit's thanks are open
    else if(typeof showNotif==='function')showNotif('✦ A soul-line woke in '+(s.zname||'the land')+' — see it on the map','#9fe8ff'); },
  pending:function(ws){ var ps=ws.playerState, D=ZSLW.data(ws), seen=ZSLW.seen(ps); return (ps.spiritsFreed||[]).filter(function(id){ return seen.indexOf(id)<0&&D.idx[id]!==undefined; }); },
  trace:function(ws,i){ var D=ZSLW.data(ws), ps=ws.playerState; if(!D||ws._zslT)return; var s=D.shr[i]; if(!s)return;
    var T=ws._zslT={i:i,t0:performance.now(),log:[],g:ws.add.graphics().setDepth(-5.4),head:ws.add.image(0,0,ws.textures.exists('glow')?'glow':'__WHITE').setBlendMode(Phaser.BlendModes.ADD).setDepth(-5.3).setTint(0x9ff4ff).setScale(0.5)};
    T.g._noCull=true; T.st=D.St.filter(function(q){ return q.owner.indexOf(i)>=0; });
    var cam=ws.cameras.main, z0=cam.zoom; T.z0=z0; try{ cam.zoomTo(z0*0.84,1300,'Sine.easeInOut'); }catch(e){}
    if(typeof ZSFX!=='undefined')try{ ZSFX.play('warp'); }catch(e){} },
  traceStep:function(ws){ var T=ws._zslT; if(!T)return; var D=ZSLW.data(ws), z=D.G.Z[T.i], age=(performance.now()-T.t0)/1000, f=Math.min(1,age/ZSLW.TRACE)*(D.reach[T.i]+2), g=T.g, k=TILE;
    g.clear(); var hx=z.x, hy=z.y, hd=0;
    [[1.0*k,0x6fe3f5,0.16],[0.55*k,0x6fe3f5,0.3],[0.26*k,0xd8fbff,1]].forEach(function(P){ g.lineStyle(P[0],P[1],P[2]);
      T.st.forEach(function(s){ var dn=false; g.beginPath(); for(var j=0;j<s.pts.length;j++){ var p=s.pts[j], d=Math.hypot(p.x-z.x,p.y-z.y), ok=s.owner[j]===T.i&&d<=f&&!s.gap[j];
        if(ok){ if(d>hd){ hd=d; hx=p.x; hy=p.y; } if(dn)g.lineTo(p.x*k,p.y*k); else { g.moveTo(p.x*k,p.y*k); dn=true; } } else dn=false; } g.strokePath(); }); });
    T.head.setPosition(hx*k,hy*k).setAlpha(age<ZSLW.TRACE?0.9:0);
    if(age>=ZSLW.TRACE&&!T.done){ T.done=true; var ps=ws.playerState, id=D.shr[T.i].id; if(ZSLW.seen(ps).indexOf(id)<0)ps.slSeen.push(id);
      ws._zslT=null; for(var n=0;n<5;n++)ZSLW.chunks(ws);      // the piece goes into the ground pictures now (two chunks per call)
      try{ ws.cameras.main.zoomTo(T.z0,1200,'Sine.easeInOut'); }catch(e){}
      ws.tweens.add({targets:[T.g,T.head],alpha:0,delay:500,duration:1200,onComplete:function(){ T.g.destroy(); T.head.destroy(); }});
      if(typeof showNotif==='function')showNotif('✦ '+(D.shr[T.i].spirit||'A spirit')+'\'s soul-line is drawn into the land','#9fe8ff');
      if(typeof ZSAGA!=='undefined')try{ ZSAGA.afterTrace(ws,D.shr[T.i]); }catch(e){} } },      // a realm at 10/10 tells its old disaster (16r)
  // ── the motes: a wave of light running along the lit lines near you ──
  moteTex:function(ws){ if(ws.textures.exists('zsl_mote'))return 'zsl_mote'; var m=ZSLW.img('sl_mote_a'), cv=document.createElement('canvas'); cv.width=cv.height=24; var c=cv.getContext('2d');
    if(m)c.drawImage(m[0],m[1],m[2],m[3],m[4],0,0,24,24); else { var gr=c.createRadialGradient(12,12,0,12,12,12); gr.addColorStop(0,'rgba(235,253,255,1)'); gr.addColorStop(0.35,'rgba(111,227,245,.7)'); gr.addColorStop(1,'rgba(111,227,245,0)'); c.fillStyle=gr; c.fillRect(0,0,24,24); }
    ws.textures.addCanvas('zsl_mote',cv); return 'zsl_mote'; },
  candidates:function(ws){ var D=ZSLW.data(ws), cam=ws.cameras.main, v=cam.worldView, lit=ZSLW.litFn(ws), out=[], x0=v.x/TILE-4, x1=v.right/TILE+4, y0=v.y/TILE-4, y1=v.bottom/TILE+4, seen={};
    var cs=WCH; for(var cx=Math.floor(x0/cs);cx<=Math.floor(x1/cs);cx++)for(var cy=Math.floor(y0/cs);cy<=Math.floor(y1/cs);cy++){ var e=D.cb[cx+'_'+cy]; if(!e)continue;
      e.st.forEach(function(si){ if(seen[si])return; seen[si]=1; var s=D.St[si]; for(var j=0;j<s.pts.length-1;j+=6){ var p=s.pts[j]; if(p.x>x0&&p.x<x1&&p.y>y0&&p.y<y1&&lit(s.owner[j])&&!s.gap[j])out.push([si,j]); } }); }
    return out; },
  frame:function(ws,dt){ if(!ZSLW.on||!ws.wd||ws.wd.islKey||!ws.playerState)return; ZSLW.traceStep(ws);
    var M=ws._zslM, ps=ws.playerState, want=!ps.spiritsHome&&ZSLW.data(ws);
    if(!want){ if(M){ M.p.forEach(function(o){ o.im.setVisible(false); }); } return; }
    if(!M){ var key=ZSLW.moteTex(ws); M=ws._zslM={p:[],cand:[],ct:0}; for(var n=0;n<ZSLW.MOTES;n++){ var im=ws.add.image(0,0,key).setBlendMode(Phaser.BlendModes.ADD).setDepth(-5.35).setVisible(false); im._noCull=true; M.p.push({im:im,s:null}); } }
    var now=performance.now(); if(now-M.ct>400){ M.ct=now; M.cand=ZSLW.candidates(ws); }
    var D=ZSLW.data(ws), night=ws._night||0, sec=dt/1000;
    M.p.forEach(function(o,n){ if(!o.s||o.life<=0){ if(!M.cand.length){ o.im.setVisible(false); o.s=null; return; } var c=M.cand[(Math.random()*M.cand.length)|0]; o.s=D.St[c[0]]; o.i=c[1]; o.d=0; o.v=2.2+Math.random()*1.6; o.life=2.5+Math.random()*3; o.ph=Math.random()*6; }
      o.d+=o.v*sec; o.life-=sec; var p=ZSL.along(o.s,o.i,o.d); if(!p||o.s.gap[p.i]){ o.life=0; o.im.setVisible(false); return; }
      var a=Math.min(1,o.life/0.6,(o.d+0.2)/0.8)*(0.55+0.35*Math.sin(now/260+o.ph))*(1+0.5*night);
      o.im.setVisible(true).setPosition(p.x*TILE,p.y*TILE).setAlpha(Math.min(1,a)).setScale(0.55+0.25*night); }); },
  tick:function(){ try{ if(!ZSLW.on)return; var ws=ZSLW.main(); if(!ws)return; var D=ZSLW.data(ws); if(!D)return;
    if(ws._zslHook!==ws.sys.settings){ ws._zslHook=ws.sys.settings; ws._zslC=null; ws._zslM=null; ws._zslT=null; ws._zslH=null; ws.events.on('update',function(t,dt){ try{ ZSLW.frame(ws,dt); }catch(e){} });
      ws.events.once('shutdown',function(){ ws._wrUnder=null; ws._zslHook=null; ws._zslC=null; ws._zslM=null; ws._zslT=null; ws._zslH=null; }); }
    ZSLW.under(ws); ZSLW.chunks(ws); ZSLW.hamlets(ws);
    if(typeof ZSAGA!=='undefined'&&!ws.playerState.sagaSeen)ZSAGA.start(ws);      // a new game: the saga's opening, once painted (16r)
    if(!ws._zslT&&!ws.playerState.spiritsHome){ var P=ZSLW.pending(ws); for(var n=0;n<P.length;n++){ var i=D.idx[P[n]], z=D.G.Z[i]; if(Math.hypot(ws.player.x/TILE-z.x,ws.player.y/TILE-z.y)<=ZSLW.NEAR*0.8){ ZSLW.trace(ws,i); break; } } }
  }catch(e){ if(!ZSLW._err){ ZSLW._err=1; console.warn('soul-lines',e); } } },
  // ── the hamlets in the rings (round 68, answers L2/L3/H1: each spirit's craft, standing after the credits) ──
  // A workshop for the spirit's trade (hw_<trade>, wave 75), new cottages, a well, a play yard and a cart inside the ring round its runestone.
  // Until wave 75 is in, the village's own houses stand in. Decoration only for now (no walls to bump into) — they are built near you only.
  HAMLET:[['work',0,-5.2],['home',-6.2,-1.6],['home',6.0,-1.2],['home',-3.4,4.6],['well',3.6,3.4],['yard',-7.2,3.0],['cart',7.4,4.4],['home',1.2,6.8]],
  HOMES:['hh_new_a','hh_new_b','hh_new_c'], STAND:{work:['vh_timber_b','vh_stone_b'],home:['vh_round','vh_wood','vh_timber_a','vh_stone','vh_thatch'],well:['vb_well','vp_well'],yard:[],cart:[]},
  tradeId:function(s){ return 'hw_'+String(s&&s.trade||'').replace(/^an? /,'').replace(/[^a-z]/g,''); },
  hamletPlan:function(ws,s){ var Z=typeof _scn==='function'?_scn():null, out=[], n=s.n||0;
    ZSLW.HAMLET.forEach(function(h,j){ var kind=h[0], tx=Math.round(s.tx+h[1]), ty=Math.round(s.ty+h[2]), t=(ws.tiles[ty]||[])[tx]; if(t===undefined||!canPassTile(t))return;
      var id=kind==='work'?ZSLW.tradeId(s):kind==='home'?ZSLW.HOMES[(n+j)%3]:kind==='well'?'hh_well':kind==='yard'?'hh_yard':'hh_cart';
      if(!Z||!Z.has(id)){ var L=(ZSLW.STAND[kind]||[]).filter(function(k){ return Z&&Z.has(k); }); id=L.length?L[(n+j)%L.length]:null; }
      if(id)out.push({id:id,x:tx*TILE+16,y:ty*TILE+28}); });
    return out; },
  hamlets:function(ws){ var ps=ws.playerState, H=ws._zslH||(ws._zslH={}); if(!ps.spiritsHome){ Object.keys(H).forEach(function(k){ H[k].forEach(function(im){ if(im&&im.scene)im.destroy(); }); delete H[k]; }); return; }
    var Z=typeof _scn==='function'?_scn():null; if(!Z)return; var px=ws.player.x/TILE, py=ws.player.y/TILE;
    (ZSPIRIT.shrines(ws)||[]).forEach(function(s){ var d=Math.hypot(s.tx-px,s.ty-py), have=H[s.id];
      if(d<60&&!have){ H[s.id]=ZSLW.hamletPlan(ws,s).map(function(o){ var im=Z.image(ws,o.id,o.x,o.y,Z.K,WR_DEPTH(o.y)); if(im)im._zslHam=1; return im; }).filter(Boolean); }
      else if(d>80&&have){ have.forEach(function(im){ if(im&&im.scene)im.destroy(); }); delete H[s.id]; } }); },
  // ── round 68 (the black screen): under the ground chunks, the whole land at one pixel per tile (the world map's own colours), so a
  //    chunk still being painted shows its land, soft, instead of black — after a waystone jump, a fast ride or on a slow machine ──
  under:function(ws){ if(typeof _wmBase!=='function'||ws.wd.islKey)return; var ub=_wmBase(ws.wd); if(!ub||(ws._wrUnder&&ws._wrUnder.scene&&ws._wrUnderV===_wmBaseVer))return;
    var key='wr_under', uc=ws._wrUnderCv||(ws._wrUnderCv=document.createElement('canvas')); uc.width=ub.width; uc.height=ub.height; uc.getContext('2d').drawImage(ub,0,0);
    if(ws.textures.exists(key)){ var t=ws.textures.get(key); if(t.refresh&&t.canvas===uc)t.refresh(); else { if(ws._wrUnder&&ws._wrUnder.scene)ws._wrUnder.destroy(); ws._wrUnder=null; ws.textures.remove(key); } }
    if(!ws.textures.exists(key)){ ws.textures.addCanvas(key,uc); try{ ws.textures.get(key).setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} }
    if(!ws._wrUnder||!ws._wrUnder.scene){ var ui=ws.add.image(0,0,key).setOrigin(0,0).setScale(TILE).setDepth(-11); ui._noCull=true; ws._wrUnder=ui; }
    ws._wrUnderV=_wmBaseVer; },
  // ── the map page (21-ui _wmDrawView) ──
  drawMap:function(ctx,v,sc,ws,o){ if(!ZSLW.on||!ws||!ws.wd||ws.wd.islKey)return; var D=ZSLW.data(ws); if(!D)return; var ps=ws.playerState, lit=ZSLW.litFn(ws), green=!!ps.spiritsHome, now=Date.now();
    var X=function(x){ return (x-v.x)*sc; }, Y=function(y){ return (y-v.y)*sc; }, inV=function(p){ return p.x>=v.x-20&&p.y>=v.y-20&&p.x<=v.x+v.w+20&&p.y<=v.y+v.h+20; };
    var pend={}; ZSLW.pending(ws).forEach(function(id){ pend[D.idx[id]]=1; }); var nw=ps.slMapNew!==undefined&&D.idx[ps.slMapNew]!==undefined?D.idx[ps.slMapNew]:-9; if(nw>=0)pend[nw]=1;
    if(o&&o.full&&nw>=0){ if(!ZSLW._mapT||ZSLW._mapK!==ps.slMapNew){ ZSLW._mapT=now; ZSLW._mapK=ps.slMapNew; } else if(now-ZSLW._mapT>5000){ ps.slMapNew=undefined; ZSLW._mapT=0; } }
    var cnt={1:0,2:0,3:0,4:0}; (ps.spiritsFreed||[]).forEach(function(id){ var i=D.idx[id]; if(i!==undefined)cnt[D.G.Z[i].r]++; });
    var ghost=function(w){ if(w<0)return false; return !lit(w)&&!pend[w]&&cnt[D.G.Z[w].r]>=8; };
    var pass=function(test,width,style,dash){ ctx.strokeStyle=style; ctx.lineWidth=width; ctx.setLineDash(dash||[]); ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath();
      D.St.forEach(function(s){ var dn=false; for(var j=0;j<s.pts.length;j++){ var p=s.pts[j]; if(test(s.owner[j])&&inV(p)){ var x=X(p.x), y=Y(p.y); if(dn)ctx.lineTo(x,y); else { ctx.moveTo(x,y); dn=true; } } else dn=false; } });
      ctx.stroke(); ctx.setLineDash([]); };
    ctx.save();
    pass(ghost,Math.max(1,0.5*sc),'rgba(160,230,245,.38)',[3,4]);
    if(green){ pass(lit,Math.max(1.5,1.6*sc),'rgba(196,178,130,.85)'); }
    else { pass(lit,Math.max(3.5,1.8*sc),'rgba(111,227,245,.3)'); pass(lit,Math.max(1.4,0.55*sc),'#d8fbff'); }
    var pu=0.5+0.5*Math.sin(now/220); if(Object.keys(pend).length){ pass(function(w){ return !!pend[w]; },Math.max(3,3*sc),'rgba(111,227,245,'+(0.25+0.4*pu)+')'); pass(function(w){ return !!pend[w]; },Math.max(1,0.7*sc),'rgba(235,253,255,'+(0.6+0.4*pu)+')'); }
    ctx.restore(); }
};
// the hooks: freeing a spirit (10w) starts its trace; the tick runs with the spirits' own
if(typeof ZSPIRIT!=='undefined'&&!ZSPIRIT._zslWrapped){ ZSPIRIT._zslWrapped=true; var _zslFree=ZSPIRIT.free;
  ZSPIRIT.free=function(ws,s){ var had=ZSPIRIT.freed(ws&&ws.playerState,s&&s.id); if(ws&&ws.playerState&&!had)ZSLW.seen(ws.playerState); var r=_zslFree.apply(this,arguments); if(!had)try{ ZSLW.onFree(ws,s); }catch(e){} return r; }; }
setInterval(ZSLW.tick,250);
