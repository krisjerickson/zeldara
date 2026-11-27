// ═══════════════════════════════════════════════════════════════════════
// ║ 27z6-world5.js — round 142: THE WORLD, REVAMPED (take 5) — the paintings Kris ✓ put into the world.
// ║  · Set-pieces (sc_wl_set_1..4): five or six big things a realm where a road bends — a watermill, a drowned bell-tower, a stone giant, a
// ║    burned hall … (no shepherd's fold: "no one would be there to tend them"). Kris: "when you find one, you should be able to tab to
// ║    explore it. there should be a chance that you find something useful, like bread or a little gold or an animal, but also ~25% chance it
// ║    might spawn 1-3 enemies … and you can only explore it once for each of them in the world" — ps.w5Explored.
// ║  · Little scenes along the roads (sc_wl_vig_1/2): a lantern post, a signpost, a road shrine, an old well, a campsite, a broken wagon…
// ║  · Road dressing (sc_wl_road_1/2): stepping stones, worn edges and cart tracks on the ground; flowers and tufts, mile-stones and broken
// ║    fences beside the road — thicker near the village.
// ║  · Water that lives (sc_wl_water5): lantern lilies, reeds, floating lanterns and a mirrored glow on Fernheim's lakes and marshes.
// ║  · Forests with depth (sc_wl_forest_1/2): belts of tall pines along the land's outer edge, the dark ones at the back; snowy firs in Cragland.
// ║ Everything is placed once per world (seeded), streamed in near the hero, solid at its foot where it stands up, and a tall piece turns
// ║ see-through while you are behind it. Switch: ZW5.on (and ZW5.ON.set / vig / road / water / forest).
// ═══════════════════════════════════════════════════════════════════════
var ZW5={ on:true, ON:{set:true,vig:true,road:true,water:true,forest:true}, R:1.3, L:null, G:null, live:{},
  SET:{1:['set1_mill','set1_arch','set1_watch','set1_birch','set1_windmill','set1_barrow'],2:['set2_bells','set2_stilt','set2_willow','set2_boathouse','set2_sluice','set2_shrine'],
       3:['set3_headframe','set3_dwarfdoor','set3_statue','set3_crag','set3_cairn'],4:['set4_hall','set4_spire','set4_skull','set4_embertree','set4_gate','set4_chimney']},
  NAME:{set1_mill:'the watermill',set1_arch:'the old stone arch',set1_watch:'the ruined watchtower',set1_birch:'the giant birch',set1_windmill:'the windmill',set1_barrow:'the barrow mound',
    set2_bells:'the drowned bell-tower',set2_stilt:'the stilt hut',set2_willow:'the great willow',set2_boathouse:'the boathouse',set2_sluice:'the dike sluice',set2_shrine:'the lily shrine',
    set3_headframe:'the mine head-frame',set3_dwarfdoor:'the dwarven door',set3_statue:'the stone giant',set3_crag:'the crag tower',set3_cairn:'the great cairn',
    set4_hall:'the burned hall',set4_spire:'the black glass spire',set4_skull:'the dragon skull',set4_embertree:'the ember tree',set4_gate:'the fallen city gate',set4_chimney:'the forge chimney'},
  SET_H:260, VIG:['lantern','signpost','shrine','well','camp','wagon','stack','waycrystal'], VIG_H:120,
  ROAD_FLAT:['steps','worn']      /* round 142 (Kris): no puddles, no cart ruts */, ROAD_UP:['flowers','tufts','mile','fence'], ROAD_H:{steps:46,worn:52,cart:56,puddle:42,flowers:40,tufts:36,mile:44,fence:46},
  WAT:['wat_lilies','wat_lilies','wat_reeds','wat_float','wat_glow'], WAT_H:{wat_lilies:44,wat_reeds:62,wat_float:40,wat_glow:46},
  FOREST:{1:['forest1_tall','forest1_mid','forest1_small','forest1_clump','forest1_dark'],2:['forest2_tall','forest2_mid','forest2_small','forest2_clump','forest2_dark'],3:['forest1_fir','forest2_fir','forest1_tall','forest2_dark','forest1_dark']},
  rng:function(s){ s=s>>>0||1; return function(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; },
  tile:function(ws,tx,ty){ var r=ws.tiles&&ws.tiles[ty]; return r?r[tx]:null; },
  road:function(t){ return t===T.PATH||t===T.BRIDGE; },
  water:function(t){ return t===T.SHALLOW_WATER||t===T.DEEP_WATER||t===T.LILY||t===T.REED; },
  land:function(t){ return t!=null&&!ZW5.water(t)&&t!==T.OCEAN&&t!==T.DEEP_MAGMA&&t!==T.THIN_MAGMA&&t!==T.CLIFF&&t!==T.BUILDING_WALL; },
  has:function(id){ return typeof ZScn!=='undefined'&&ZScn.has&&ZScn.has(id); },
  free:function(ws,x,y){ return typeof Z3!=='undefined'&&Z3.free(ws,x,y); },
  // the places to keep clear: the village, waystones, sites, camps
  keep:function(ws){ if(ws._w5keep)return ws._w5keep; var K=[], wd=ws.wd; K.push([CENTER_X,CENTER_Y,ZW5.VR||46]);
    (wd.waystones||[]).forEach(function(w){ K.push([w.x,w.y,9]); }); (wd.sites||[]).forEach(function(s){ if(s.tx!=null)K.push([s.tx,s.ty,13]); });
    (ws._camps||[]).forEach(function(c){ K.push([c.x/TILE,c.y/TILE,8]); }); return (ws._w5keep=K); },
  kept:function(ws,tx,ty,extra){ var K=ZW5.keep(ws); for(var i=0;i<K.length;i++){ if(Math.hypot(K[i][0]-tx,K[i][1]-ty)<K[i][2]+(extra||0))return true; } return false; },
  add:function(o){ ZW5.L.push(o); var k=Math.floor(o.x/512)+','+Math.floor(o.y/512); (ZW5.G[k]||(ZW5.G[k]=[])).push(o);
    if(o.solid){ var c0=Math.floor((o.x-o.solid[0]/2)/256), c1=Math.floor((o.x+o.solid[0]/2)/256), r0=Math.floor((o.y-o.solid[1])/256), r1=Math.floor(o.y/256);
      for(var cx=c0;cx<=c1;cx++)for(var cy=r0;cy<=r1;cy++){ var kk=cx+','+cy; (ZW5.S[kk]||(ZW5.S[kk]=[])).push([o.x-o.solid[0]/2,o.y-o.solid[1],o.x+o.solid[0]/2,o.y]); } } },
  // ── laying it all out, once per world ──
  build:function(ws){ if(ws._w5wd===ws.wd)return; ws._w5wd=ws.wd; ZW5.L=[]; ZW5.G={}; ZW5.S={}; ZW5.clear(ws); ws._w5keep=null;
    if(!ws.tiles||!ws.wd)return; var seed=(ws.wd.seed||WORLD_SEED||1)>>>0, t0=Date.now();
    var roads={1:[],2:[],3:[],4:[]};
    for(var y=2;y<WORLD_H-2;y+=2)for(var x=2;x<WORLD_W-2;x+=2){ if(ZW5.road(ZW5.tile(ws,x,y))){ var q=getTileSection(x,y); if(roads[q])roads[q].push([x,y]); } }
    try{ if(ZW5.ON.set)ZW5.sets(ws,roads,ZW5.rng(seed^0x5e7)); }catch(e){ console.warn('w5 sets',e); }
    try{ if(ZW5.ON.vig)ZW5.vigs(ws,roads,ZW5.rng(seed^0x716)); }catch(e){ console.warn('w5 vig',e); }
    try{ if(ZW5.ON.road)ZW5.roads(ws,roads,ZW5.rng(seed^0x20ad)); }catch(e){ console.warn('w5 road',e); }
    try{ if(ZW5.ON.water)ZW5.waters(ws,ZW5.rng(seed^0x3a7e)); }catch(e){ console.warn('w5 water',e); }
    try{ if(ZW5.ON.forest)ZW5.forests(ws,ZW5.rng(seed^0xf0e)); }catch(e){ console.warn('w5 forest',e); }
    ZW5.ms=Date.now()-t0; },
  // a road tile where the road bends or meets another: road both ways across an 8-tile box
  bends:function(ws,L){ return L.filter(function(p,i){ if(i%3)return false; var minx=1e9,maxx=-1e9,miny=1e9,maxy=-1e9,n=0;
      for(var dy=-8;dy<=8;dy+=2)for(var dx=-8;dx<=8;dx+=2){ if(ZW5.road(ZW5.tile(ws,p[0]+dx,p[1]+dy))){ n++; if(dx<minx)minx=dx; if(dx>maxx)maxx=dx; if(dy<miny)miny=dy; if(dy>maxy)maxy=dy; } }
      return n>=6&&maxx-minx>=10&&maxy-miny>=10; }); },
  // a clear patch of ground (w × h tiles, foot at tx,ty) with no road in it
  patch:function(ws,tx,ty,w,h){ for(var dy=-h+1;dy<=1;dy++)for(var dx=-Math.floor(w/2);dx<=Math.floor(w/2);dx++){ var t=ZW5.tile(ws,tx+dx,ty+dy); if(!ZW5.land(t)||ZW5.road(t)||t===T.TREE)return false; }
    return ZW5.free(ws,tx*TILE+16,ty*TILE+16); },
  sets:function(ws,roads,R){ var all=[];
    for(var q=1;q<=4;q++){ var B=ZW5.bends(ws,roads[q]).sort(function(){ return R()-0.5; }), ids=ZW5.SET[q].filter(ZW5.has), got=[];
      for(var i=0;i<B.length&&got.length<ids.length;i++){ var p=B[i]; if(ZW5.kept(ws,p[0],p[1],4))continue; if(all.some(function(a){ return Math.hypot(a[0]-p[0],a[1]-p[1])<70; }))continue;
        for(var k=0;k<12;k++){ var a=R()*Math.PI*2, r=6+R()*3, tx=Math.round(p[0]+Math.cos(a)*r), ty=Math.round(p[1]+Math.sin(a)*r);
          if(!ZW5.patch(ws,tx,ty,7,4)||ZW5.kept(ws,tx,ty))continue;
          var id=ids[got.length]; got.push(id); all.push([tx,ty]); var x=tx*TILE+16, y=ty*TILE+24;
          ZW5.add({kind:'set',id:id,x:x,y:y,h:ZW5.SET_H*(id==='set4_skull'?0.8:id==='set1_arch'?0.85:1),solid:[TILE*5.2,TILE*1.4],tall:true,key:'w5_'+id}); break; } } }
    ZW5.SETS=ZW5.L.filter(function(o){ return o.kind==='set'; }); },
  vigs:function(ws,roads,R){
    for(var q=1;q<=4;q++){ var L=roads[q], n=0, last=[];
      for(var i=0;i<L.length;i+=7){ var p=L[Math.floor(R()*L.length)]; if(ZW5.kept(ws,p[0],p[1],-3)||last.some(function(a){ return Math.hypot(a[0]-p[0],a[1]-p[1])<34; }))continue;
        var side=R()<0.5?-1:1, ok=false;
        for(var k=0;k<8&&!ok;k++){ var a=R()*Math.PI*2, tx=Math.round(p[0]+Math.cos(a)*3), ty=Math.round(p[1]+Math.sin(a)*3); if(!ZW5.patch(ws,tx,ty,3,2))continue;
          var v=ZW5.VIG[n%ZW5.VIG.length], id=(q<=2?'vig1_':'vig2_')+v; if(!ZW5.has(id))break;
          ZW5.add({kind:'vig',id:id,x:tx*TILE+16,y:ty*TILE+24,h:ZW5.VIG_H*(v==='camp'||v==='wagon'?0.85:1),solid:[TILE*2,TILE*0.8],tall:true}); last.push(p); n++; ok=true; }
        if(n>=22)break; } } },
  roads:function(ws,roads,R){ var C=[CENTER_X,CENTER_Y];
    for(var q=1;q<=4;q++){ var L=roads[q], pre=q<=2?'road1_':'road2_';
      L.forEach(function(p){ var d=Math.hypot(p[0]-C[0],p[1]-C[1]), chance=d<120?0.16:0.07; if(R()>chance)return; if(ZW5.kept(ws,p[0],p[1],-4))return;
        // beside the road: the first non-road tile out from it
        var dirs=[[1,0],[-1,0],[0,1],[0,-1]], dd=dirs[Math.floor(R()*4)], tx=p[0], ty=p[1];
        for(var s=1;s<4;s++){ var t=ZW5.tile(ws,p[0]+dd[0]*s,p[1]+dd[1]*s); if(!ZW5.road(t)){ tx=p[0]+dd[0]*s; ty=p[1]+dd[1]*s; break; } }
        var t2=ZW5.tile(ws,tx,ty); if(!ZW5.land(t2)||t2===T.TREE)return; var flat=R()<0.45, k=flat?ZW5.ROAD_FLAT[Math.floor(R()*ZW5.ROAD_FLAT.length)]:ZW5.ROAD_UP[Math.floor(R()*ZW5.ROAD_UP.length)];
        if(flat&&k!=='puddle'){ tx=p[0]; ty=p[1]; }      /* the worn bits lie on the road itself */
        var id=pre+k; if(!ZW5.has(id))return; var solid=(k==='mile'||k==='fence')?[TILE*1.1,TILE*0.5]:null; if(solid&&!ZW5.free(ws,tx*TILE+16,ty*TILE+16))return;
        ZW5.add({kind:'road',id:id,x:tx*TILE+16+(R()-0.5)*12,y:ty*TILE+20+(R()-0.5)*8,h:ZW5.ROAD_H[k],flat:flat,solid:solid,flip:R()<0.5}); }); } },
  waters:function(ws,R){ var n=0;
    for(var i=0;i<26000&&n<520;i++){ var tx=2+Math.floor(R()*(WORLD_W-4)), ty=2+Math.floor(R()*(WORLD_H-4)); if(getTileSection(tx,ty)!==2)continue; var t=ZW5.tile(ws,tx,ty); if(t!==T.SHALLOW_WATER&&t!==T.LILY&&t!==T.REED)continue;
      var shore=false; for(var d=1;d<=2&&!shore;d++)[[d,0],[-d,0],[0,d],[0,-d]].forEach(function(o){ if(ZW5.land(ZW5.tile(ws,tx+o[0],ty+o[1])))shore=true; }); if(!shore&&R()<0.7)continue;
      var id=ZW5.WAT[Math.floor(R()*ZW5.WAT.length)]; if(!ZW5.has(id))continue; ZW5.add({kind:'water',id:id,x:tx*TILE+16,y:ty*TILE+20,h:ZW5.WAT_H[id],flat:id!=='wat_reeds',glow:id==='wat_float'||id==='wat_glow',flip:R()<0.5}); n++; } },
  // the land's outer edge: land tiles within a few tiles of the ocean, away from roads — a belt of trees, the dark ones furthest out
  forests:function(ws,R){ var n=0;
    for(var y=4;y<WORLD_H-4;y+=3)for(var x=4;x<WORLD_W-4;x+=3){ var q=getTileSection(x,y); if(!ZW5.FOREST[q])continue; var t=ZW5.tile(ws,x,y); if(!ZW5.land(t)||ZW5.road(t))continue;
      var oc=99; for(var d=1;d<=9;d+=2){ [[d,0],[-d,0],[0,d],[0,-d]].forEach(function(o){ var tt=ZW5.tile(ws,x+o[0],y+o[1]); if(tt===T.OCEAN||tt===T.BEACH)oc=Math.min(oc,d); }); if(oc<99)break; }
      if(oc>7||oc<3)continue; if(R()>0.55)continue; if(ZW5.kept(ws,x,y,2))continue; var near=false; for(var dy=-3;dy<=3&&!near;dy++)for(var dx=-3;dx<=3;dx++)if(ZW5.road(ZW5.tile(ws,x+dx,y+dy))){ near=true; break; } if(near)continue;
      var P=ZW5.FOREST[q], id=oc<=4?P[4]:P[Math.floor(R()*4)]; if(!ZW5.has(id))continue; var jx=(R()-0.5)*TILE*2, jy=(R()-0.5)*TILE*1.4, fx=x*TILE+16+jx, fy=y*TILE+20+jy; if(!ZW5.free(ws,fx,fy))continue;
      ZW5.add({kind:'forest',id:id,x:fx,y:fy,h:(id.indexOf('small')>0?120:id.indexOf('clump')>0?170:id.indexOf('dark')>0?190:170)*(0.9+R()*0.25),solid:[TILE*0.9,TILE*0.5],tall:true,flip:R()<0.5}); n++; } },
  // ── streaming: only what is near the hero is in the scene ──
  clear:function(ws){ Object.keys(ZW5.live).forEach(function(k){ var o=ZW5.live[k]; try{ if(o.im&&o.im.scene)o.im.destroy(); if(o.g&&o.g.scene)o.g.destroy(); }catch(e){} }); ZW5.live={}; },
  show:function(ws,o,i){ var im=Z3.img(ws,o.id,o.x,o.y,o.h); if(!im)return null; if(o.flip)im.setFlipX(true);
    if(o.flat){ im.setOrigin(0.5,0.62); im.setDepth(o.kind==='road'?-5.5:-5.4); }
    var rec={im:im,o:o}; if(o.glow&&ws.textures.exists('glow')){ rec.g=ws.add.image(o.x,o.y-6,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(0xffd27a).setAlpha(0.28).setScale(0.36).setDepth(-5.3); ws.tweens.add({targets:rec.g,alpha:0.5,duration:1600+i%7*120,yoyo:true,repeat:-1,ease:'Sine.inOut'}); }
    return rec; },
  tick:function(){ if(!ZW5.on)return; var ws=Z2.ws(); if(!ws||!ws.player||!ws.wd||!Z2.act('World')||ws.wd.islKey)return; ZW5.build(ws); if(!ZW5.L)return;
    var cam=ws.cameras.main, vw=cam.width/(cam.zoom||1), vh=cam.height/(cam.zoom||1), px=ws.player.x, py=ws.player.y, rx=vw*ZW5.R, ry=vh*ZW5.R+300, want={};
    for(var gx=Math.floor((px-rx)/512);gx<=Math.floor((px+rx)/512);gx++)for(var gy=Math.floor((py-ry)/512);gy<=Math.floor((py+ry)/512);gy++){ var C=ZW5.G[gx+','+gy]; if(!C)continue;
      for(var i=0;i<C.length;i++){ var o=C[i]; if(Math.abs(o.x-px)>rx||Math.abs(o.y-py)>ry)continue; var k=o.kind+o.x+'_'+o.y; want[k]=1; if(!ZW5.live[k]){ var r=ZW5.show(ws,o,i); if(r)ZW5.live[k]=r; } } }
    Object.keys(ZW5.live).forEach(function(k){ if(want[k])return; var r=ZW5.live[k]; try{ if(r.im&&r.im.scene)r.im.destroy(); if(r.g&&r.g.scene)r.g.destroy(); }catch(e){} delete ZW5.live[k]; });
    // a tall piece goes see-through while you are behind it
    Object.keys(ZW5.live).forEach(function(k){ var r=ZW5.live[k], o=r.o; if(!o.tall||!r.im.scene)return; var w=r.im.displayWidth*0.45, behind=py<o.y-6&&py>o.y-r.im.displayHeight*0.95&&Math.abs(px-o.x)<w; var a=behind?0.45:1; if(r.im.alpha!==a&&!r.im._zanim)r.im.setAlpha(a); });
    ZW5.explore(ws); },
  // ── a set-piece: [Tab] to explore it, once ──
  explore:function(ws){ var ps=ws.playerState, E=ps.w5Explored||(ps.w5Explored={}), px=ws.player.x, py=ws.player.y, near=null;
    (ZW5.SETS||[]).forEach(function(o){ if(E[o.id])return; var d=Math.hypot(px-o.x,py-(o.y+8)); if(d<TILE*3.6&&(!near||d<near.d))near={o:o,d:d}; });
    if(!near){ Z3.hide(ws,'w5'); if(ZW5._tab&&Z3.tab===ZW5._tab)Z3.tab=null; return; }
    var o=near.o; Z3.prompt(ws,'w5',o.x,o.y+30,'[Tab] Explore '+(ZW5.NAME[o.id]||'it')); ZW5._tab=Z3.tab=function(){ ZW5.search(ws,o); }; },
  search:function(ws,o){ var ps=ws.playerState, E=ps.w5Explored||(ps.w5Explored={}); if(E[o.id])return; E[o.id]=1; Z3.hide(ws,'w5');
    var R=ZW5.rng(((ws.wd.seed||1)^(o.x*7+o.y*13))>>>0), q=getTileSection(Math.floor(o.x/TILE),Math.floor(o.y/TILE)), nm=ZW5.NAME[o.id]||'it', r=R(), msg;
    if(r<0.25){ var n=1+Math.floor(R()*3), rng=new PRNG(((o.x*31+o.y*17)^(ws.wd.seed||7))>>>0), got=0;
      for(var i=0;i<n;i++){ var pick=null; for(var k=0;k<8&&(!pick||(typeof MON_LEGACY!=='undefined'&&MON_LEGACY[pick.R.id]));k++)pick=monPick(rng,q,'main'); if(!pick)continue;
        var a=i/n*Math.PI*2+R(), x=o.x+Math.cos(a)*TILE*3, y=o.y+40+Math.sin(a)*TILE*1.6; var m=ws._spawnRosterMon(pick.R.id,x,y,q,rng,{}); if(m){ got++; if(ws._monWake)ws._monWake(m); if(m._m)m._m.aggro=true; } }
      msg='⚔ You searched '+nm+' — and woke '+(got>1?got+' things':'something')+' that lived there!'; if(typeof ZSFX!=='undefined')try{ ZSFX.play('beast_growl'); }catch(e){} }
    else if(r<0.62){ var g=10+Math.floor(R()*31); ps.gold=(ps.gold||0)+g; msg='💰 In '+nm+' you find a little purse: +'+g+' gold.'; if(typeof ZSFX!=='undefined')try{ ZSFX.play('coin'); }catch(e){} }
    else if(r<0.86){ var F=['bread','wild_berries','honey','cheese'].filter(function(f){ return typeof ITEMS!=='undefined'&&ITEMS[f]; }), f=F[Math.floor(R()*F.length)]||'bread'; (ps.inventory||(ps.inventory=[])).push(f); msg='🍞 In '+nm+' you find '+(ITEMS[f]?ITEMS[f].name.toLowerCase():'some food')+', still good.'; }
    else { var A=(ws._largeAnimals||[]).find(function(a){ return a.section===q; }), sx=o.x+TILE*4, sy=o.y+TILE*2;
      if(A){ ws._largeAnimals.push({type:A.type,def:A.def,x:sx,y:sy,hp:A.def.hp,maxHp:A.def.hp,section:q,state:'flee',vx:0,vy:0,ph:0,wanderTimer:0,fleeTimer:2,corneredTimer:0,respawnTimer:0,dead:false,atkTimer:0,hitFlash:0,spawnX:sx,spawnY:sy,w5:1});
        msg='🦌 Something bolts out of '+nm+' — game to hunt!'; } else { ps.gold=(ps.gold||0)+15; msg='💰 +15 gold, tucked away in '+nm+'.'; } }
    if(typeof showNotif==='function')showNotif(msg,'#ffe9a8'); try{ if(ws._save)ws._save(); }catch(e){} },
  count:function(ps){ var E=ps&&ps.w5Explored||{}; return {got:Object.keys(E).length,all:(ZW5.SETS||[]).length}; } };
// their feet are solid (a grid of rects — thousands of trees stay cheap to test)
if(typeof ZR140!=='undefined'&&ZR140.hit){ var _w5hit=ZR140.hit; ZR140.hit=function(wd,x,y,fx,fy){ if(_w5hit.apply(this,arguments))return true; var S=ZW5.on&&ZW5.S&&ZW5.S[Math.floor(x/256)+','+Math.floor(y/256)]; if(!S)return false;
    for(var i=0;i<S.length;i++){ var r=S[i]; if(x>r[0]&&x<r[2]&&y>r[1]&&y<r[3]){ if(fx>r[0]&&fx<r[2]&&fy>r[1]&&fy<r[3])continue; return true; } } return false; }; }
if(typeof setInterval!=='undefined')setInterval(function(){ try{ ZW5.tick(); }catch(e){ if(!ZW5._err){ ZW5._err=1; console.warn('world5',e); } } },250);
