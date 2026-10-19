// ═══════════════════════════════════════════════════════════════════════
// ║ 16o-asgard-city.js — round 64e: ASGARD, A LIVING CITY, AND THE GOLDEN ROADS.
// ║ Kris: "asgard needs to be filled up with other buildings and things in the city to match some of the pictures we have. come up with quite a
// ║ few more and start to fill up the city, but also make it easy to realize where you need to go in the center, and have golden roads that
// ║ lead you to the center". Cards: "A living city" (gold-roofed longhouses, mead halls, a market, smithies, stables, gardens, statues of the gods,
// ║ fountains, towers); golden roads "From every gate" to the rune circle, a glowing marker over the centre.
// ║  · THE ROADS: four gates in the wall — the Bifröst's, and one at each other quarter — each with a golden road (3 tiles wide) straight to a
// ║    golden ring round the world-tree rune circle at the heart. Statues of the gods and lamp-posts stand along them.
// ║  · THE CENTRE: a column of white-gold light rises over the rune circle (seen from anywhere in the city, and from the shore), and its name.
// ║  · THE CITY: about forty buildings and pieces fill the island round the roads — longhouses, homes, mead halls, a temple, a market, smithies,
// ║    stables, Iðunn's walled garden, fountains, wells, towers, banners — set by a fixed seed, never on a road or the circle. Each building is
// ║    solid at its walls (you walk behind its roof with the outline). Painted where a picture exists (the Lab's keeps and towers now; scenery
// ║    wave 68 orders the rest — tools/sprites/round65.ps1), drawn stand-ins until then.
// ═══════════════════════════════════════════════════════════════════════
var ZCITY={ on:true, SEED:7717, ROAD:1, RING:6,
  // what can stand in the city: [type, half-width, depth (tiles), weight, painted ids (first found), solid]
  TYPES:[['longhouse',3,3,5,['asc_longhouse'],1],['house',2,2,7,['asc_house'],1],['meadhall',4,4,2,['asc_meadhall','asg_keep_c'],1],['temple',3,3,1,['asc_temple','asg_keep_b'],1],
    ['market',3,2,2,['asc_market'],1],['smithy',2,3,2,['asc_smithy'],1],['stable',3,3,2,['asc_stable'],1],['garden',3,3,1,['asc_garden'],1],['tower',1,1,3,['asc_tower','asgB_tower','asgC_tower'],1],
    ['fountain',1,1,2,['asc_fountain'],1],['well',1,1,2,['asc_well'],1],['banner',0,0,2,['asc_banner'],1],['tree',1,1,3,['asc_tree'],1],['bench',1,0,2,['asc_bench'],1],['runestone',0,0,2,['asc_runestone'],1],['cart',1,1,1,['asc_cart'],1]],
  STATUES:['asc_statue_thor','asc_statue_freyja','asc_statue_tyr'],
  kinds:function(){ if(ZCITY._K)return ZCITY._K; if(typeof WK!=='function'||typeof _wkReg!=='function')return null; var K=ZCITY._K={gold:WK('plaza','#d8b048','#f2d47a',{pattern:'goldslab',flat:true,soft:true})}; _wkReg(K.gold); return K; },
  Z:function(){ return typeof _scn==='function'?_scn():null; },
  has:function(id){ var Z=ZCITY.Z(); return !!(id&&Z&&Z.has&&Z.has(id)); },
  // the four gates: the Bifröst's, then the rim cells nearest the other three quarters
  gates:function(ws){ var P=ZASG.plan(ws); if(P._gates)return P._gates; var G=[], cx=P.cx, cy=P.cy; if(P.gate)G.push({x:P.gate[0],y:P.gate[1],main:true});
    // only rim cells on the city's main body (not a lobe behind a narrow neck of wall): next to an inner cell reachable from the heart
    var W=WORLD_W, inn={}, H=ZCITY.heartT(ws), reach={}, q0=[H.y*W+H.x], h0=0; P.inner.forEach(function(c){ inn[c[1]*W+c[0]]=1; }); reach[q0[0]]=1;
    while(h0<q0.length){ var k=q0[h0++], kx=k%W, ky=(k/W)|0; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var n=(ky+d[1])*W+kx+d[0]; if(inn[n]&&!reach[n]){ reach[n]=1; q0.push(n); } }); }
    var good=P.rim.filter(function(c){ for(var j=-1;j<=1;j++)for(var i=-1;i<=1;i++)if(reach[(c[1]+j)*W+c[0]+i])return true; return false; });
    var a0=P.gate?Math.atan2(P.gate[1]-cy,P.gate[0]-cx):Math.PI/2; for(var q=1;q<4;q++){ var a=a0+q*Math.PI/2, best=null, bd=1e9; good.forEach(function(c){ var ca=Math.atan2(c[1]-cy,c[0]-cx), da=Math.abs(Math.atan2(Math.sin(ca-a),Math.cos(ca-a))); if(da<bd){ bd=da; best=c; } }); if(best)G.push({x:best[0],y:best[1],main:false,a:a}); }
    return (P._gates=G); },
  heartT:function(ws){ var P=ZASG.plan(ws); return {x:P.cx,y:P.cy+7}; },
  // the road cells: a 3-wide line from each gate (just inside) to the ring round the heart, and the ring
  roads:function(ws){ var P=ZASG.plan(ws); if(P._roads)return P._roads; var H=ZCITY.heartT(ws), set={}, list=[], paths=[], add=function(x,y){ var k=y*WORLD_W+x; if(set[k]||!P.isl[k])return; set[k]=1; list.push([x,y]); };
    var lots=ZASG.lots(ws), inLot=function(x,y){ return lots.some(function(L){ return x>=L.x-L.hw-1&&x<=L.x+L.hw+1&&y>=L.y-L.d&&y<=L.y+1; }); };
    // each road finds its way round the citadel and the halls (8-way, so it runs straight where it can)
    ZCITY.gates(ws).forEach(function(g){ var W=WORLD_W, prev={}, st=g.y*W+g.x, q=[st], h=0, end=-1; prev[st]=st;
      var ok=function(x,y){ var k=y*W+x; return !!P.isl[k]&&!inLot(x,y); };
      while(h<q.length&&h<60000){ var k=q[h++], x=k%W, y=(k/W)|0; if(Math.hypot(x-H.x,(y-H.y)/0.85)<=ZCITY.RING){ end=k; break; }
        for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){ if(!dx&&!dy)continue; var nx=x+dx, ny=y+dy, n=ny*W+nx; if(prev[n]!==undefined||!ok(nx,ny))continue; if(dx&&dy&&(!ok(x+dx,y)||!ok(x,y+dy)))continue; prev[n]=k; q.push(n); } }
      if(end<0)return; var path=[]; for(var c2=end;;c2=prev[c2]){ path.push([c2%W,(c2/W)|0]); if(c2===st)break; } paths.push(path.reverse());
      for(var c=end;;c=prev[c]){ var cx=c%W, cy=(c/W)|0; for(var j=-ZCITY.ROAD;j<=ZCITY.ROAD;j++)for(var i=-ZCITY.ROAD;i<=ZCITY.ROAD;i++){ if(Math.abs(i)+Math.abs(j)>ZCITY.ROAD+1)continue; if(!inLot(cx+i,cy+j))add(cx+i,cy+j); } if(c===st)break; } });
    for(var a=0;a<Math.PI*2;a+=0.03)for(var r=ZCITY.RING-1;r<=ZCITY.RING+0.6;r+=0.5){ var x2=Math.round(H.x+Math.cos(a)*r), y2=Math.round(H.y+Math.sin(a)*r*0.85); if(!inLot(x2,y2))add(x2,y2); }
    return (P._roads={set:set,list:list,paths:paths}); },
  // the buildings: a fixed seed, never on a road, the ring, the citadel's lots, or the gates' mouths
  lots:function(ws){ var P=ZASG.plan(ws); if(P._city)return P._city; var R=typeof rngOf==='function'?rngOf(ZCITY.SEED+P.n):{f:Math.random,i:function(a,b){ return a+Math.floor(Math.random()*(b-a+1)); }};
    var RD=ZCITY.roads(ws).set, H=ZCITY.heartT(ws), used={}, out=[], L0=ZASG.lots(ws), G=ZCITY.gates(ws), W=WORLD_W;
    L0.forEach(function(L){ for(var y=L.y-L.d-3;y<=L.y+3;y++)for(var x=L.x-L.hw-3;x<=L.x+L.hw+3;x++)used[y*W+x]=1; });
    var free=function(x,y,hw,d,m){ for(var yy=y-d-m-1;yy<=y+m;yy++)for(var xx=x-hw-m;xx<=x+hw+m;xx++){ var k=yy*W+xx; if(!P.isl[k]||used[k]||RD[k])return false; }
      if(Math.hypot(x-H.x,y-H.y)<ZCITY.RING+4)return false; for(var i=0;i<G.length;i++)if(Math.hypot(x-G[i].x,y-G[i].y)<7)return false; return true; };
    var take=function(x,y,hw,d,m){ for(var yy=y-d-m-1;yy<=y+m;yy++)for(var xx=x-hw-m;xx<=x+hw+m;xx++)used[yy*W+xx]=1; };
    var bag=[]; ZCITY.TYPES.forEach(function(T){ for(var i=0;i<T[3];i++)bag.push(T); });
    // the statues and lamps along the roads: every ~9 tiles, both sides
    ZCITY.gates(ws).forEach(function(g,gi){ var dx=H.x-g.x, dy=H.y-g.y, n=Math.hypot(dx,dy), ux=dx/n, uy=dy/n, nx=-uy, ny=ux;
      for(var s=6;s<n-ZCITY.RING-2;s+=9){ [-1,1].forEach(function(sd,j){ var x=Math.round(g.x+ux*s+nx*sd*(ZCITY.ROAD+2)), y=Math.round(g.y+uy*s+ny*sd*(ZCITY.ROAD+2)); if(free(x,y,0,0,0)){ take(x,y,0,0,0); var lamp=(s/9|0)%2===1; out.push({t:lamp?'lamp':'statue',x:x,y:y,hw:0,d:0,ids:lamp?['asc_lamp']:[ZCITY.STATUES[(gi*3+j+(s|0))%ZCITY.STATUES.length]],solid:1}); } }); } });
    // the buildings: try spots on a jittered grid, nearest the heart first (the middle of the city fills first)
    var spots=[]; for(var y=P.cy-60;y<=P.cy+60;y+=5)for(var x=P.cx-60;x<=P.cx+60;x+=6){ var jx=x+R.i(-1,1), jy=y+R.i(-1,1); if(P.isl[jy*W+jx])spots.push([jx,jy,Math.hypot(jx-H.x,jy-H.y)+R.f()*8]); }
    spots.sort(function(a,b){ return a[2]-b[2]; });
    spots.forEach(function(sp){ if(out.length>=96)return; var T=bag[R.i(0,bag.length-1)], ok=free(sp[0],sp[1],T[1],T[2],1); if(!ok){ T=ZCITY.TYPES[1]; ok=free(sp[0],sp[1],T[1],T[2],1); } if(!ok){ T=ZCITY.TYPES[12]; ok=free(sp[0],sp[1],T[1],T[2],0); } if(!ok)return;
      take(sp[0],sp[1],T[1],T[2],1); out.push({t:T[0],x:sp[0],y:sp[1],hw:T[1],d:T[2],ids:T[4],solid:T[5],v:R.i(0,3)}); });
    return (P._city=out); },
  // the ground: gold roads; the buildings' walls solid
  carve:function(ws){ var wd=ws.wd; if(!ZCITY.on||wd._cityDone||!wd._asgDone)return; var K=ZCITY.kinds(), KA=ZASG.kinds(), P=ZASG.plan(ws), ch=[]; if(!K||!P.n)return;
    var RS=ZCITY.roads(ws), mid={}; (RS.paths||[]).forEach(function(pa){ pa.forEach(function(c){ mid[c[1]*WORLD_W+c[0]]=1; }); }); RS.list.forEach(function(c){ var t=(wd.tiles[c[1]]||[])[c[0]]; if(t===T.BUILDING_WALL)return; ZASG.put(wd,c[0],c[1],T.STONE_FLOOR,mid[c[1]*WORLD_W+c[0]]?K.gold:KA.g,ch); });      /* the road's middle line is gold on the map; the road itself is drawn smooth over it (dress) */      /* the gold itself is drawn smooth over it (dress) */
    ZCITY.lots(ws).forEach(function(L){ if(!L.solid)return; var d=Math.max(1,Math.ceil(L.d*0.6)); for(var y=L.y-d+1;y<=L.y;y++)for(var x=L.x-L.hw;x<=L.x+L.hw;x++)if(P.isl[y*WORLD_W+x])ZASG.put(wd,x,y,T.BUILDING_WALL,KA.g,ch); });      /* solid, but the paving stays (no wall-block under a statue) */
    wd._cityDone=true; wd.baseVer=(wd.baseVer||0)+1; if(typeof ZESC!=='undefined')ZESC.refresh(ws,ch); },
  // the pictures
  dress:function(ws){ var D=function(y){ return typeof WR_DEPTH==='function'?WR_DEPTH(y):y; }, Z=ZCITY.Z(), L=ws._asgDress||(ws._asgDress=[]);
    ZCITY.lots(ws).forEach(function(Lt){ var px=Lt.x*TILE+16, foot=(Lt.y+1)*TILE, id=null; (Lt.ids||(Lt.id?[Lt.id]:[])).some(function(q){ if(ZCITY.has(q)){ id=q; return true; } return false; });
      var im=null; if(id){ var z=Z.size(id,0), want=Math.max(1,Lt.hw*2+1)*TILE*1.15, m=Lt.t==='tower'||Lt.t==='statue'||Lt.t==='lamp'||Lt.t==='banner'?Z.K:Math.min(2.2,want/Math.max(1,z.w)); im=Z.image(ws,id,px,foot,m,D(foot)); if(im)im.setFlipX(Lt.v===1&&Lt.t!=='temple'); }
      if(!im)im=ZCITY.draw(ws,Lt,px,foot,D(foot)); if(im){ im._zcv=true; L.push(im); } });
    // the golden roads: smooth wide bands along each road's way (a tile-by-tile gold would be stair-stepped on the diagonals)
    var RS=ZCITY.roads(ws), gR=ws.add.graphics().setDepth(-3.6), Hh=ZASG.heart(ws), sm=function(path){ var pts=path.map(function(c){ return {x:c[0]*TILE+16,y:c[1]*TILE+16}; }), out=[];
        for(var i=0;i<pts.length;i+=2){ var sx=0, sy=0, n=0; for(var j=Math.max(0,i-4);j<=Math.min(pts.length-1,i+4);j++){ sx+=pts[j].x; sy+=pts[j].y; n++; } out.push({x:sx/n,y:sy/n}); } if(pts.length)out.push(pts[pts.length-1]); return out; };
    if(typeof ZROAD!=='undefined'&&ZROAD.on){ gR.destroy(); try{ ZROAD.draw(ws,RS,L); }catch(e){ console.warn('roads',e); } } else {      /* round 66: painted roads (16q) */
    var band=function(pts,w,col,a){ if(pts.length<2)return; gR.lineStyle(w,col,a); gR.beginPath(); gR.moveTo(pts[0].x,pts[0].y); for(var i=1;i<pts.length;i++)gR.lineTo(pts[i].x,pts[i].y); gR.strokePath(); pts.forEach(function(p,i){ if(i%3===0)gR.fillStyle(col,a).fillCircle(p.x,p.y,w/2); }); };
    (RS.paths||[]).forEach(function(path){ var pts=sm(path); band(pts,(ZCITY.ROAD*2+1)*TILE+10,0xa8822a,1); band(pts,(ZCITY.ROAD*2+1)*TILE-4,0xe4bc54,1); band(pts,(ZCITY.ROAD*2+1)*TILE*0.45,0xf6dc8a,0.55); });
    gR.lineStyle(TILE*1.6+10,0xa8822a,1).strokeEllipse(Hh.x,Hh.y,ZCITY.RING*2*TILE,ZCITY.RING*2*TILE*0.85); gR.lineStyle(TILE*1.6-4,0xe4bc54,1).strokeEllipse(Hh.x,Hh.y,ZCITY.RING*2*TILE,ZCITY.RING*2*TILE*0.85); L.push(gR); }
    // the column of light over the heart, and its name
    var H=ZASG.heart(ws), key='zcity_beam'; if(!ws.textures.exists(key)){ var c=document.createElement('canvas'); c.width=64; c.height=512; var x=c.getContext('2d'), g=x.createLinearGradient(0,512,0,0); g.addColorStop(0,'rgba(255,246,214,0.9)'); g.addColorStop(0.5,'rgba(255,236,170,0.45)'); g.addColorStop(1,'rgba(255,236,170,0)');
      var gh=x.createLinearGradient(0,0,64,0); x.fillStyle=g; x.fillRect(0,0,64,512); x.globalCompositeOperation='destination-in'; gh.addColorStop(0,'rgba(0,0,0,0)'); gh.addColorStop(0.5,'rgba(0,0,0,1)'); gh.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=gh; x.fillRect(0,0,64,512); ws.textures.addCanvas(key,c); }
    var beam=ws.add.image(H.x,H.y+6,key).setOrigin(0.5,1).setDisplaySize(90,900).setDepth(9000).setBlendMode(Phaser.BlendModes.ADD).setAlpha(0.7); ws.tweens.add({targets:beam,alpha:{from:0.45,to:0.85},displayWidth:{from:80,to:104},duration:1800,yoyo:true,repeat:-1,ease:'Sine.inOut'}); L.push(beam);
    var ring=ws.add.circle(H.x,H.y,60,0xfff0b0,0).setStrokeStyle(3,0xffe080,0.7).setDepth(-2.5).setBlendMode(Phaser.BlendModes.ADD); ws.tweens.add({targets:ring,scale:{from:0.7,to:1.25},alpha:{from:0.9,to:0},duration:2200,repeat:-1}); L.push(ring);
    if(typeof domText==='function'){ var t=domText(ws,H.x,H.y-120,'✦ The Heart of Asgard ✦',{fontSize:'14px',color:'#fff2b0',fontFamily:'Georgia',stroke:'#3a2a08',strokeThickness:4}).setOrigin(.5).setDepth(9001); L.push(t); }
    // the extra gates' pictures (the Bifröst's is drawn already)
    ZCITY.gates(ws).forEach(function(g,i){ if(g.main)return; var id=['asgB_gate','asgC_gate','asgA_gate'][i%3]; if(ZCITY.has(id)){ var im=Z.image(ws,id,g.x*TILE+16,g.y*TILE+32,1.05,D(g.y*TILE+32)); if(im){ im._zcv=true; L.push(im); } } }); },
  // drawn stand-ins: white stone, gold roofs (a sketch of each kind until its painting comes)
  draw:function(ws,Lt,px,foot,dep){ var g=ws.add.graphics().setDepth(dep), w=(Lt.hw*2+1)*TILE, hh=Lt.d*TILE, x0=px-w/2, gold=0xe2b84a, gold2=0xc8962c, wall=0xf2ecdc, wall2=0xd8ccb0, wood=0x8a6a40;
    g.fillStyle(0x000000,0.22).fillEllipse(px,foot-2,w+10,14);
    var roof=function(y,ww,h,c1,c2){ g.fillStyle(c1,1).fillTriangle(px-ww/2-6,y,px+ww/2+6,y,px,y-h); g.fillStyle(c2,1).fillTriangle(px,y,px+ww/2+6,y,px,y-h); };
    switch(Lt.t){
      case 'longhouse': case 'house': case 'meadhall': case 'smithy': case 'stable': { var wh=Lt.t==='meadhall'?hh*0.9:hh*0.7; g.fillStyle(wall,1).fillRect(x0+4,foot-wh,w-8,wh); g.fillStyle(wall2,1).fillRect(px+w*0.2,foot-wh,w*0.3-4,wh);
        roof(foot-wh,w-8,Lt.t==='meadhall'?hh*0.9:hh*0.55,gold,gold2); g.fillStyle(wood,1).fillRect(px-7,foot-26,14,26); g.fillStyle(0x9fc8e8,0.9).fillRect(x0+12,foot-wh+12,10,10).fillRect(x0+w-22,foot-wh+12,10,10);
        if(Lt.t==='meadhall'){ g.lineStyle(3,gold,1).lineBetween(px,foot-wh-hh*0.9,px-14,foot-wh-hh*0.9-20).lineBetween(px,foot-wh-hh*0.9,px+14,foot-wh-hh*0.9-20); }
        if(Lt.t==='smithy'){ g.fillStyle(0x6a6a70,1).fillRect(px+w*0.25,foot-wh-hh*0.75,10,hh*0.6); g.fillStyle(0xff8a30,0.85).fillCircle(px-w*0.25,foot-12,6); }
        if(Lt.t==='stable'){ g.fillStyle(wood,1).fillRect(x0+6,foot-18,w-12,4); } break; }
      case 'temple': g.fillStyle(wall,1).fillRect(x0+4,foot-hh*0.8,w-8,hh*0.8); for(var i=0;i<5;i++)g.fillStyle(wall2,1).fillRect(x0+8+i*(w-24)/4,foot-hh*0.8,6,hh*0.8); g.fillStyle(gold,1).fillEllipse(px,foot-hh*0.8,w*0.7,hh*0.9); g.fillStyle(0xfff0a0,1).fillCircle(px,foot-hh*1.25,4); break;
      case 'market': [-1,0,1].forEach(function(k){ var sx=px+k*w/3; g.fillStyle(wood,1).fillRect(sx-12,foot-30,3,30).fillRect(sx+9,foot-30,3,30); g.fillStyle([0xc84a3a,0x3a7ac8,0xe2b84a][k+1],1).fillTriangle(sx-16,foot-28,sx+16,foot-28,sx,foot-42); g.fillStyle(0x6a4a2a,1).fillRect(sx-12,foot-12,24,8); g.fillStyle([0xe8c040,0x9ad060,0xe06040][k+1],1).fillCircle(sx-5,foot-14,3).fillCircle(sx+4,foot-14,3); }); break;
      case 'garden': g.fillStyle(wall,1).fillRect(x0+2,foot-10,w-4,10); g.fillStyle(0x4a8a3a,1).fillRect(x0+6,foot-hh*0.6,w-12,hh*0.6-10); g.fillStyle(0x6a4a2a,1).fillRect(px-3,foot-hh*1.1,6,hh*0.6); g.fillStyle(0x3a7a2a,1).fillCircle(px,foot-hh*1.2,hh*0.45); for(var a2=0;a2<7;a2++)g.fillStyle(0xffd040,1).fillCircle(px+Math.cos(a2)*hh*0.3,foot-hh*1.2+Math.sin(a2*1.7)*hh*0.25,3); break;
      case 'tower': g.fillStyle(wall,1).fillRect(px-11,foot-90,22,90); g.fillStyle(wall2,1).fillRect(px+3,foot-90,8,90); g.fillStyle(gold,1).fillTriangle(px-15,foot-90,px+15,foot-90,px,foot-130); g.fillStyle(0x6a8ab0,1).fillRect(px-3,foot-66,6,10); break;
      case 'fountain': g.fillStyle(wall2,1).fillEllipse(px,foot-6,40,16); g.fillStyle(0x6ab0e8,1).fillEllipse(px,foot-8,32,10); g.fillStyle(wall,1).fillRect(px-3,foot-30,6,22); g.fillStyle(gold,1).fillCircle(px,foot-32,6); g.fillStyle(0xbfe8ff,0.8).fillCircle(px-6,foot-24,2).fillCircle(px+6,foot-22,2); break;
      case 'well': g.fillStyle(wall2,1).fillEllipse(px,foot-6,26,12); g.fillStyle(0x2a3a4a,1).fillEllipse(px,foot-8,18,7); g.fillStyle(wood,1).fillRect(px-11,foot-30,3,24).fillRect(px+8,foot-30,3,24); g.fillStyle(gold,1).fillTriangle(px-15,foot-28,px+15,foot-28,px,foot-40); break;
      case 'banner': g.fillStyle(wood,1).fillRect(px-2,foot-70,4,70); g.fillStyle(0xc83a2a,1).fillRect(px+2,foot-68,18,28); g.fillStyle(gold,1).fillCircle(px+11,foot-56,4); break;
      case 'tree': g.fillStyle(0x6a4a2a,1).fillRect(px-4,foot-36,8,36); g.fillStyle(0x4a8a3a,1).fillCircle(px,foot-46,20); g.fillStyle(0x5aa04a,1).fillCircle(px-8,foot-52,10); g.fillStyle(0xffd040,1).fillCircle(px+6,foot-44,3).fillCircle(px-6,foot-38,3); break;
      case 'bench': g.fillStyle(wood,1).fillRect(px-16,foot-14,32,5).fillRect(px-14,foot-9,3,9).fillRect(px+11,foot-9,3,9); [-20,20].forEach(function(dx){ g.fillStyle(0x4a8a3a,1).fillCircle(px+dx,foot-8,7); g.fillStyle(0xe8a0c0,1).fillCircle(px+dx-2,foot-10,2).fillCircle(px+dx+3,foot-7,2); }); break;
      case 'runestone': g.fillStyle(0xb8b0a0,1).fillRoundedRect(px-9,foot-46,18,46,{tl:8,tr:8,bl:1,br:1}); g.lineStyle(2,gold,1).lineBetween(px-3,foot-38,px+3,foot-30).lineBetween(px+3,foot-30,px-3,foot-22).lineBetween(px,foot-40,px,foot-14); break;
      case 'cart': g.fillStyle(wood,1).fillRect(px-18,foot-22,36,14); g.fillStyle(gold,1).fillRect(px-18,foot-24,36,3); g.fillStyle(0x3a2a1a,1).fillCircle(px-11,foot-6,6).fillCircle(px+11,foot-6,6); g.fillStyle(0xe8c040,1).fillCircle(px-6,foot-26,4).fillCircle(px+4,foot-27,4); break;
      case 'statue': g.fillStyle(wall2,1).fillRect(px-10,foot-12,20,12); g.fillStyle(wall,1).fillRect(px-6,foot-44,12,32); g.fillCircle(px,foot-50,6); g.lineStyle(3,gold,1).lineBetween(px+8,foot-58,px+8,foot-20); break;
      case 'lamp': g.fillStyle(gold2,1).fillRect(px-2,foot-46,4,46); g.fillStyle(0xfff0b0,1).fillCircle(px,foot-50,6); var lg=ws.add.circle(px,foot-50,18,0xfff0b0,0.25).setDepth(dep+0.001).setBlendMode(Phaser.BlendModes.ADD); if(ws._asgDress)ws._asgDress.push(lg); break;
    }
    // the drawn picture's size, for the outline (graphics have no frame size)
    g._zcv=false; return g; }
};
(function(){ if(typeof WPATTERN!=='undefined'&&!WPATTERN.goldslab)WPATTERN.goldslab=WPATTERN.slab; })();
setTimeout(function(){ if(typeof ZASG==='undefined')return;
  var c0=ZASG.carve; ZASG.carve=function(ws){ var r=c0.apply(this,arguments); try{ ZCITY.carve(ws); }catch(e){ console.warn('city carve',e); } return r; };
  var d0=ZASG.dress; ZASG.dress=function(ws){ var r=d0.apply(this,arguments); try{ ZCITY.dress(ws); }catch(e){ console.warn('city dress',e); } return r; };
  // an older save, Asgard already down: its roads and buildings come the next time the world loads it
  setInterval(function(){ try{ var ws=game.scene.getScene('World'); if(!ws||!ws.wd||!ws.playerState||!ws.playerState.asgardDown||!ws.wd._asgDone||ws.wd._cityDone||!ws.sys.isActive())return; ZCITY.carve(ws); ZASG.dress(ws); }catch(e){} },1500);
},0);
