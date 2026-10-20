// ═══════════════════════════════════════════════════════════════════════
// ║ 10zk-kids-world.js — round 70: THE CHILDREN, AFTER THE GODS (doc 30 §14).
// ║ Kris: "We also need to come up with children to populate the world after the spirit cycle has begun again." Answers C1/C2: 24 painted
// ║ children (ZKIDS, 07zh), 2–3 in every hamlet and a band in the village; they play together and talk — tag, the swing, hide-and-seek,
// ║ fishing at the pier, chasing the goats — a short line with [Tab], some of them about the twins as heroes.
// ║  · a group per hamlet (its yard) and three in the village (the green, the green's ring, the pier), made when you come near, gone far off;
// ║  · each group plays one game: tag (the one who is "it" chases, the others dodge, a catch swaps), hide-and-seek (one counts at the yard, the
// ║    rest hide beside the houses and peek out, the seeker finds them one by one), the swing (turns), the ring (a song, round and round),
// ║    the goats (a goat wanders, the little ones toddle after it), fishing (at the pier, casting now and then);
// ║  · [Tab] by a child: their own line, then one about the twins, by turns (the world's _villageNPCs talk prompt).
// ═══════════════════════════════════════════════════════════════════════
var ZKIDW={ on:true, NEAR:56, FAR:76,
  GAMES:['tag','hide','swing','goats','ring','tag','hide','ring'],
  VILLAGE:[{key:'v_green',spot:'green',game:'tag',ids:['ck_ylva','ck_noor','ck_finn','ck_gunnar']},{key:'v_ring',spot:'green',off:[4,2],game:'ring',ids:['ck_ingrid','ck_saga','ck_mateo']},{key:'v_pier',spot:'pier',game:'fish',ids:['ck_eirik','ck_leif']}],
  TWIN:['Are you {h}? THE {h}? Can I hold your sword? Just for a bit?','Mum says {h} and {o} woke every runestone. I\'m going to wake one too. A small one.','We play twins. I always have to be {o}, because nobody can be {h} as well as you.',
    'Gran says before you, there were hardly any children in the hamlets. Where did they all go? …Oh. We\'re them.','You walked all the way to the gods? My legs get tired walking to the well.','I said hello to our runestone. It didn\'t say anything. Do they talk to you?',
    'When I grow up I\'m going to be a hero like {h}. Or a baker. Probably a baker.','{o} came by and showed us how to hold a sword. Then we weren\'t allowed sticks any more.'],
  idx:function(id){ for(var i=0;i<ZKIDS.L.length;i++)if(ZKIDS.L[i][0]===id)return i; return -1; },
  // the children who live in the hamlets (the village's own band stays in the village)
  pool:function(){ if(ZKIDW._pool)return ZKIDW._pool; var V={}; ZKIDW.VILLAGE.forEach(function(g){ g.ids.forEach(function(id){ V[id]=1; }); }); return (ZKIDW._pool=ZKIDS.L.map(function(K,i){ return i; }).filter(function(i){ return !V[ZKIDS.L[i][0]]; })); },
  kidsFor:function(n){ var P=ZKIDW.pool(), c=2+(n%2), out=[]; for(var j=0;j<c;j++){ var k=P[(n*7+j*5)%P.length]; if(out.indexOf(k)<0)out.push(k); } return out; },
  gameFor:function(n){ return ZKIDW.GAMES[n%ZKIDW.GAMES.length]; },
  names:function(ps){ var f=ps&&ps.hero==='f'; return {h:f?'Zeldara':'Zeldor',o:f?'Zeldor':'Zeldara'}; },
  // the groups: where each plays, who, and what
  groups:function(ws){ if(ws._zkG)return ws._zkG; var G=[];
    if(typeof ZHAMW!=='undefined')ZHAMW.plan(ws).forEach(function(H){ var y=H.pieces.find(function(q){ return q.kind==='yard'; }), hx=(y?y.fx:H.cx)*TILE, hy=((y?y.fy:H.cy+1.5)+1.6)*TILE;
      G.push({key:'h'+H.n,n:H.n,H:H,hx:hx,hy:hy,game:ZKIDW.gameFor(H.n),ids:ZKIDW.kidsFor(H.n).map(function(i){ return ZKIDS.L[i][0]; })}); });
    ZKIDW.VILLAGE.forEach(function(V,i){ var s=ws._villageFolkSpot?ws._villageFolkSpot(V.spot,i):null; if(!s)return; G.push({key:V.key,n:-1,hx:s.x+(V.off?V.off[0]*TILE:0),hy:s.y+(V.off?V.off[1]*TILE:0),game:V.game,ids:V.ids}); });
    return (ws._zkG=G); },
  make:function(ws,g){ var nm=ZKIDW.names(ws.playerState); g.kids=[]; g.t=0; g.it=0; g.freeze=0; g.phase='count'; g.found=0; g.turn=0;
    g.ids.forEach(function(id,j){ var i=ZKIDW.idx(id); if(i<0)return; var K=ZKIDS.L[i], a=j/g.ids.length*Math.PI*2, x=g.hx+Math.cos(a)*TILE*1.1, y=g.hy+Math.sin(a)*TILE*0.8;
      var im=typeof CHX!=='undefined'?CHX.sprite(ws,id,x,y+12,1.45):null; if(!im)return; im.setDepth(WR_DEPTH(y)); im._act=g.game!=='fish';
      var k={K:K,i:i,id:id,im:im,x:x,y:y,tx:x,ty:y,wait:Math.random()*2,sp:K[3]==='toddler'?0.55:K[3]==='small'?0.8:K[3]==='teen'?1.1:1,talk:0};
      k.npc={id:id+'@'+g.key,n:K[1],icon:'💬',x:x,y:y,folk:true,kid:true}; Object.defineProperty(k.npc,'line',{get:function(){ var L=k.talk++%2===0?K[7]:ZKIDW.TWIN[(k.i+(k.talk>>1))%ZKIDW.TWIN.length]; return L.replace(/\{h\}/g,nm.h).replace(/\{o\}/g,nm.o); }});
      (ws._villageNPCs=ws._villageNPCs||[]).push(k.npc); g.kids.push(k); });
    if(g.game==='goats')g.goat={x:g.hx+TILE,y:g.hy+TILE*0.5,vx:0,vy:0,tx:g.hx,ty:g.hy,wait:1};
    g.on=true; },
  drop:function(ws,g){ (g.kids||[]).forEach(function(k){ if(k.im&&k.im.scene)k.im.destroy(); }); var ids={}; (g.kids||[]).forEach(function(k){ ids[k.npc.id]=1; });
    ws._villageNPCs=(ws._villageNPCs||[]).filter(function(n){ return !ids[n.id]; }); if(g.goat&&g.goat._zim&&g.goat._zim.scene)g.goat._zim.destroy(); g.goat=null; g.kids=[]; g.on=false; },
  clear:function(ws){ if(ws._zkG)ws._zkG.forEach(function(g){ if(g.on)ZKIDW.drop(ws,g); }); },
  // every quarter second (from ZHAMW.tick): make the groups near you, drop the far ones; hook the frame update once per scene
  manage:function(ws){ if(!ZKIDW.on||typeof ZKIDS==='undefined')return; var ps=ws.playerState; if(!ps||!ps.spiritsHome){ ZKIDW.clear(ws); return; }
    if(ws._zkHook!==ws.sys.settings){ ws._zkHook=ws.sys.settings; ws._zkG=null; ws.events.on('update',function(t,dt){ try{ ZKIDW.frame(ws,Math.min(0.1,dt/1000)); }catch(e){} }); ws.events.once('shutdown',function(){ ws._zkHook=null; ws._zkG=null; }); }
    var px=ws.player.x, py=ws.player.y; ZKIDW.groups(ws).forEach(function(g){ var d=Math.hypot(g.hx-px,g.hy-py)/TILE; if(d<ZKIDW.NEAR&&!g.on)ZKIDW.make(ws,g); else if(d>ZKIDW.FAR&&g.on)ZKIDW.drop(ws,g); }); },
  // moving: free = through things (hiding beside a house); returns true when there
  go:function(ws,k,tx,ty,sp,dt,free){ var dx=tx-k.x, dy=ty-k.y, L=Math.hypot(dx,dy); if(L<3)return true; var s=Math.min(L,sp*k.sp*dt), nx=k.x+dx/L*s, ny=k.y+dy/L*s;
    if(free||!ws._canGo||ws._canGo(nx,ny,null)){ k.x=nx; k.y=ny; } else { k.tx=k.x; k.ty=k.y; return true; } if(Math.abs(dx)>1)k.im.setFlipX(dx<0); return false; },
  AGEK:{toddler:0.74,small:0.87,kid:1,teen:1.13},      // the painted children by age (the stand-in is one child's size)
  place:function(k,ox){ k.im.setPosition(k.x+(ox||0),k.y+12).setDepth(WR_DEPTH(k.y)); k.npc.x=k.x; k.npc.y=k.y; var o=k.im._zo; if(o&&o.k&&o._kidK!==o.k){ o.k*=ZKIDW.AGEK[k.K[3]]||1; o._kidK=o.k; } },
  wander:function(ws,g,k,dt,r,sp){ if(k.wait>0){ k.wait-=dt; return; } if(ZKIDW.go(ws,k,k.tx,k.ty,sp||30,dt)){ k.wait=1+Math.random()*3; var a=Math.random()*Math.PI*2, d=Math.random()*(r||2.5)*TILE; k.tx=g.hx+Math.cos(a)*d; k.ty=g.hy+Math.sin(a)*d*0.7; } },
  frame:function(ws,dt){ var G=ws._zkG; if(!G||!ws.player)return; if(typeof _anyModalOpen==='function'&&_anyModalOpen())return; var px=ws.player.x, py=ws.player.y;
    G.forEach(function(g){ if(!g.on||!g.kids.length)return; g.t+=dt;
      var chat=g.kids.filter(function(k){ return Math.hypot(px-k.x,py-k.y)<TILE*1.8; });
      chat.forEach(function(k){ k.im.setFlipX(px<k.x); });                       // stops to talk when you're close
      var play=function(k){ return chat.indexOf(k)<0; };
      (ZKIDW.GAME[g.game]||ZKIDW.GAME.tag)(ws,g,dt,play);
      g.kids.forEach(function(k){ ZKIDW.place(k,k.ox); }); }); },
  GAME:{
    // tag: "it" chases the nearest, the others dodge; a catch swaps who's it (and "it" counts to three)
    tag:function(ws,g,dt,play){ var K=g.kids, it=K[g.it%K.length]; if(K.length<2){ K.forEach(function(k){ if(play(k))ZKIDW.wander(ws,g,k,dt); }); return; }
      if(g.freeze>0){ g.freeze-=dt; CHX.busy(it.im,0.3); }
      else if(play(it)){ var best=null, bd=1e9; K.forEach(function(k){ if(k===it)return; var d=Math.hypot(k.x-it.x,k.y-it.y); if(d<bd){ bd=d; best=k; } });
        if(best){ ZKIDW.go(ws,it,best.x,best.y,64,dt); if(bd<12){ g.it=K.indexOf(best); g.freeze=1.4; CHX.busy(best.im,1); } } }
      K.forEach(function(k){ if(k===it||!play(k))return; var d=Math.hypot(k.x-it.x,k.y-it.y), hd=Math.hypot(k.x-g.hx,k.y-g.hy);
        if(d<TILE*2.4&&g.freeze<=0){ var ax=(k.x-it.x)/(d||1), ay=(k.y-it.y)/(d||1); if(hd>TILE*3.5){ ax+=(g.hx-k.x)/hd*1.2; ay+=(g.hy-k.y)/hd*1.2; } ZKIDW.go(ws,k,k.x+ax*30,k.y+ay*30,58,dt); k.wait=0.4; }
        else ZKIDW.wander(ws,g,k,dt,2.5,34); }); },
    // hide-and-seek: one counts at the yard, the others hide beside the houses and peek out; the seeker finds them one by one
    hide:function(ws,g,dt,play){ var K=g.kids, S=K[g.turn%K.length], H=g.H, P=H?H.pieces.filter(function(q){ return q.kind==='home'||q.kind==='work'||q.kind==='well'; }):[];
      if(!g.spots){ g.spots=K.map(function(k,j){ var q=P[(j+g.turn)%Math.max(1,P.length)]; return q?{x:((j%2?q.x1+1.1:q.x0-0.2))*TILE,y:(q.y1+0.4)*TILE}:{x:g.hx+(j-1)*TILE*3,y:g.hy-TILE*2}; }); }
      if(g.phase==='count'){ if(play(S)){ ZKIDW.go(ws,S,g.hx,g.hy,40,dt); CHX.busy(S.im,0.3); }
        K.forEach(function(k,j){ if(k!==S&&play(k))ZKIDW.go(ws,k,g.spots[j].x,g.spots[j].y,52,dt,true); }); if(g.t>6){ g.phase='seek'; g.t=0; g.found=0; } return; }
      var hid=K.filter(function(k){ return k!==S&&!k.found; });
      K.forEach(function(k,j){ if(k===S||!play(k))return; if(k.found){ ZKIDW.go(ws,k,g.hx+(j-1)*18,g.hy+14,46,dt,true); return; } k.ox=Math.sin(g.t*1.7+j*2)>0.6?(j%2?7:-7):0; });   // peeking out
      if(!hid.length){ if(g.t>3){ K.forEach(function(k){ k.found=false; k.ox=0; }); g.turn++; g.spots=null; g.phase='count'; g.t=0; } return; }
      if(play(S)&&ZKIDW.go(ws,S,hid[0].x,hid[0].y+6,40,dt,true)){ hid[0].found=true; hid[0].ox=0; CHX.busy(hid[0].im,1.2); CHX.busy(S.im,1.2); g.t=0; } },
    // the swing: one swings, the others wait their turn and cheer; turns every few seconds
    swing:function(ws,g,dt,play){ var K=g.kids, W=K[g.turn%K.length], sx=g.hx-TILE*0.8, sy=g.hy-TILE*1.5;
      K.forEach(function(k,j){ if(!play(k))return; if(k===W){ if(ZKIDW.go(ws,k,sx,sy,40,dt,true))k.ox=Math.sin(g.t*3.2)*7; } else { k.ox=0; ZKIDW.go(ws,k,sx+TILE*(1.2+j*0.7),sy+TILE*0.9,36,dt,true); if(Math.random()<dt*0.4)CHX.busy(k.im,0.8); } });
      if(g.t>8){ W.ox=0; g.turn++; g.t=0; } },
    // the ring: hand in hand round and round, singing (clapping)
    ring:function(ws,g,dt,play){ var K=g.kids, n=K.length; K.forEach(function(k,j){ if(!play(k))return; var a=g.t*0.45+j/n*Math.PI*2; ZKIDW.go(ws,k,g.hx+Math.cos(a)*TILE*1.0,g.hy+Math.sin(a)*TILE*0.6,50,dt,true); CHX.busy(k.im,0.3); }); },
    // the goats: a goat wanders, the children toddle after it, giggling when it stops
    goats:function(ws,g,dt,play){ var A=g.goat; if(A){ if(A.wait>0){ A.wait-=dt; A.vx=A.vy=0; } else { var dx=A.tx-A.x, dy=A.ty-A.y, L=Math.hypot(dx,dy); if(L<3){ A.wait=1.5+Math.random()*3; var a=Math.random()*Math.PI*2, d=Math.random()*4*TILE; A.tx=g.hx+Math.cos(a)*d; A.ty=g.hy+Math.sin(a)*d*0.6; A.vx=A.vy=0; } else { A.vx=dx/L*24; A.vy=dy/L*24; A.x+=A.vx*dt; A.y+=A.vy*dt; } }
        if(typeof ZAtlas!=='undefined'&&ZAtlas.animal)try{ ZAtlas.animal(ws,A,'goat'); }catch(e){} }
      g.kids.forEach(function(k,j){ if(!play(k))return; if(!A){ ZKIDW.wander(ws,g,k,dt); return; } var a=j*2.1+g.t*0.2, tx=A.x+Math.cos(a)*TILE*1.1, ty=A.y+Math.sin(a)*TILE*0.6; if(ZKIDW.go(ws,k,tx,ty,30,dt,true)&&A.wait>0&&Math.random()<dt*0.6)CHX.busy(k.im,1); }); },
    // fishing at the pier: still, patient, casting now and then
    fish:function(ws,g,dt,play){ g.kids.forEach(function(k,j){ if(!play(k))return; if(ZKIDW.go(ws,k,g.hx+(j?TILE*1.2:-TILE*0.4),g.hy,30,dt,true)){ k.im.setFlipX(j%2===0); if(Math.random()<dt*0.18)CHX.busy(k.im,1.4); } }); }
  }
};
