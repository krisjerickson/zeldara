// ═══════════════════════════════════════════════════════════════════════
// ║ 16q-asgard-roads.js — round 66: ASGARD'S GOLDEN ROADS, PAINTED (Kris: "the golden road in asgard looks too simple and weird. we need to
// ║ make it better looking, and possible with painted sprites"). Cards: gold-inlaid flagstones; rune medallions; straight into the game.
// ║  · THE PAVING: cream flagstones with gold-inlaid seams (tx_asg_road) fill each road's smooth band; a band of gold kerb engraved with runes
// ║    (tx_asg_rim) edges it; the ring round the heart is gold-and-white mosaic (tx_asg_plaza). Painted in scenery wave 73
// ║    (tools\sprites\round69.ps1); until then drawn stand-ins of the same look are used.
// ║  · THE MEDALLIONS: round gold rune medallions set into the road every ~6 tiles (asr_med_a–d), each with a soft glow; the glow runs along
// ║    each road from its gate toward the heart, over and over — follow the light to the centre.
// ║  · How it is drawn: the paving is laid as tiles inside a container masked by the road's shape (one mask per layer, so it stays cheap),
// ║    over a darker gold edge line; nothing is stair-stepped on the diagonals.
// ═══════════════════════════════════════════════════════════════════════
var ZROAD={ on:true, CELL:96, MED:6, RIM:9,
  // the smooth centre line of a road (the same smoothing the bands used)
  smooth:function(path){ var pts=path.map(function(c){ return {x:c[0]*TILE+16,y:c[1]*TILE+16}; }), out=[];
    for(var i=0;i<pts.length;i+=2){ var sx=0, sy=0, n=0; for(var j=Math.max(0,i-4);j<=Math.min(pts.length-1,i+4);j++){ sx+=pts[j].x; sy+=pts[j].y; n++; } out.push({x:sx/n,y:sy/n}); } if(pts.length)out.push(pts[pts.length-1]); return out; },
  painted:function(id){ var im=typeof ZScn!=='undefined'&&!ZScn.off&&ZScn.timg&&ZScn.timg[id]; return !!(im&&im.width); },
  // a texture for a layer: the painted one if it is in, else a drawn stand-in of the same look
  tex:function(ws,id){ var key='zr_'+id; if(ws.textures.exists(key))return key; var im=typeof ZScn!=='undefined'&&!ZScn.off&&ZScn.timg&&ZScn.timg[id]; if(im&&im.width){ ws.textures.addImage(key,im); return key; }
    var dk=key+'_d'; if(ws.textures.exists(dk))return dk; ws.textures.addCanvas(dk,ZROAD.drawTex(id)); return dk; },
  drawTex:function(id){ var N=256, c=document.createElement('canvas'); c.width=c.height=N; var x=c.getContext('2d'), R=function(s){ return function(){ s=(s*16807)%2147483647; return s/2147483647; }; }(id.length*977+13);
    if(id==='tx_asg_rim'){ var g=x.createLinearGradient(0,0,0,N); g.addColorStop(0,'#b8862a'); g.addColorStop(0.5,'#e2b64e'); g.addColorStop(1,'#b8862a'); x.fillStyle=g; x.fillRect(0,0,N,N);
      x.strokeStyle='rgba(110,72,14,0.75)'; x.lineWidth=3; for(var r=0;r<4;r++)for(var k=0;k<8;k++){ var cx=k*32+16, cy=r*64+32; x.beginPath(); var t=(r*8+k)%4; if(t===0){ x.moveTo(cx,cy-14); x.lineTo(cx,cy+14); x.moveTo(cx,cy-6); x.lineTo(cx+9,cy-14); }
        else if(t===1){ x.moveTo(cx-8,cy+14); x.lineTo(cx,cy-14); x.lineTo(cx+8,cy+14); } else if(t===2){ x.moveTo(cx-8,cy-12); x.lineTo(cx+8,cy+12); x.moveTo(cx+8,cy-12); x.lineTo(cx-8,cy+12); } else { x.moveTo(cx,cy-14); x.lineTo(cx,cy+14); x.moveTo(cx,cy-14); x.lineTo(cx+9,cy-4); x.lineTo(cx,cy+4); } x.stroke(); }
      x.strokeStyle='rgba(255,240,180,0.55)'; x.lineWidth=2; for(var q=0;q<=4;q++){ x.beginPath(); x.moveTo(0,q*64); x.lineTo(N,q*64); x.stroke(); } return c; }
    var base=id==='tx_asg_plaza'?'#f2e2b4':'#efe7d2'; x.fillStyle=base; x.fillRect(0,0,N,N);
    if(id==='tx_asg_plaza'){ for(var yy=0;yy<N;yy+=16)for(var xx=0;xx<N;xx+=16){ var gold=((xx/16+yy/16)%3===0); x.fillStyle=gold?'#d8a840':(R()<0.5?'#f8f0dc':'#ece0c0'); x.fillRect(xx+1,yy+1,14,14); } return c; }
    // staggered flagstones, gold-inlaid seams
    var rows=[0,72,136,200,256]; for(var ri=0;ri<rows.length-1;ri++){ var y0=rows[ri], h=rows[ri+1]-y0, xx2=-(ri%2)*48;
      while(xx2<N){ var w=70+Math.floor(R()*50); x.fillStyle='hsl(42,'+(22+R()*14)+'%,'+(86+R()*6)+'%)'; x.fillRect(xx2+2,y0+2,w-4,h-4);
        if(R()<0.18){ x.strokeStyle='rgba(205,160,60,0.45)'; x.lineWidth=2; var mx=xx2+w/2, my=y0+h/2; x.beginPath(); x.moveTo(mx,my-9); x.lineTo(mx,my+9); x.moveTo(mx,my-3); x.lineTo(mx+7,my-9); x.stroke(); }
        x.fillStyle='#caa04a'; x.fillRect(xx2-1,y0,3,h); xx2+=w; }
      x.fillStyle='#caa04a'; x.fillRect(0,y0-1,N,3); x.fillStyle='rgba(255,236,170,0.8)'; x.fillRect(0,y0,N,1); }
    return c; },
  medTex:function(ws,i){ var ids=['asr_med_a','asr_med_b','asr_med_c','asr_med_d'], id=ids[i%4]; if(ZCITY.has(id))return {id:id};
    var key='zr_med_d'+(i%4); if(!ws.textures.exists(key)){ var c=document.createElement('canvas'); c.width=c.height=96; var x=c.getContext('2d'), g=x.createRadialGradient(48,44,6,48,48,46);
      g.addColorStop(0,'#fff4c8'); g.addColorStop(0.55,'#e8bc52'); g.addColorStop(1,'#a87a22'); x.fillStyle=g; x.beginPath(); x.arc(48,48,44,0,7); x.fill(); x.strokeStyle='#7a5414'; x.lineWidth=3; x.stroke();
      x.strokeStyle='rgba(122,84,20,0.8)'; x.lineWidth=2; x.beginPath(); x.arc(48,48,34,0,7); x.stroke(); x.fillStyle='#fffaf0'; x.beginPath(); x.arc(48,48,24,0,7); x.fill();
      x.strokeStyle='#d4a032'; x.lineWidth=4; x.lineCap='round'; x.beginPath(); var t=i%4; if(t===0){ x.moveTo(54,32); x.lineTo(40,46); x.lineTo(56,52); x.lineTo(42,66); } else if(t===1){ x.moveTo(42,30); x.lineTo(42,66); x.moveTo(42,32); x.lineTo(56,40); x.lineTo(42,48); x.lineTo(56,66); }
      else if(t===2){ x.moveTo(34,34); x.lineTo(34,62); x.lineTo(62,34); x.lineTo(62,62); x.lineTo(34,34); } else { x.moveTo(48,64); x.lineTo(48,34); x.moveTo(48,44); x.lineTo(38,34); x.moveTo(48,44); x.lineTo(58,34); x.moveTo(48,54); x.lineTo(36,46); x.moveTo(48,54); x.lineTo(60,46); } x.stroke();
      ws.textures.addCanvas(key,c); } return {key:key}; },
  // a painted flat piece cut whole from its scenery page (the scenery helper anchors pictures at the foot)
  cut:function(ws,id){ var key='zr_cut_'+id; if(ws.textures.exists(key))return key; var it=typeof ZScn!=='undefined'&&ZScn.META&&ZScn.META.items&&ZScn.META.items[id], pg=it&&ZScn.img&&ZScn.img[it[0]]; if(!pg||!pg.width)return null;
    var c=document.createElement('canvas'); c.width=it[3]; c.height=it[4]; c.getContext('2d').drawImage(pg,it[1],it[2],it[3],it[4],0,0,it[3],it[4]); ws.textures.addCanvas(key,c); return key; },
  glowTex:function(ws){ var k='zr_glow'; if(ws.textures.exists(k))return k; var c=document.createElement('canvas'); c.width=c.height=64; var x=c.getContext('2d'), g=x.createRadialGradient(32,32,2,32,32,32);
    g.addColorStop(0,'rgba(255,250,220,1)'); g.addColorStop(0.35,'rgba(255,226,140,0.55)'); g.addColorStop(1,'rgba(255,220,120,0)'); x.fillStyle=g; x.fillRect(0,0,64,64); ws.textures.addCanvas(k,c); return k; },
  // one paving layer: tiles of a texture over every cell the shape touches, in a container masked by the shape
  layer:function(ws,texKey,shape,cells,depth,L){ var mg=ws.make.graphics({add:false}); shape(mg); var C=ws.add.container(0,0).setDepth(depth), S=ZROAD.CELL;
    Object.keys(cells).forEach(function(k){ var p=k.split(','), cx=+p[0], cy=+p[1]; C.add(ws.add.image(cx*S,cy*S,texKey).setOrigin(0).setDisplaySize(S+1,S+1)); });
    var ks=Object.keys(cells).map(function(k){ return k.split(',').map(Number); }); C._zrBox=ks.length?[Math.min.apply(null,ks.map(function(q){ return q[0]; }))*S,Math.min.apply(null,ks.map(function(q){ return q[1]; }))*S,(Math.max.apply(null,ks.map(function(q){ return q[0]; }))+1)*S,(Math.max.apply(null,ks.map(function(q){ return q[1]; }))+1)*S]:[0,0,0,0];
    C._noCull=true; C.setMask(mg.createGeometryMask()); C._zrMask=mg; L.push(C); L.push(mg); (ZROAD._layers=ZROAD._layers||[]).push(C); return C; },      /* at (0,0) the world's culler would hide it — ZROAD.show() hides it instead when the city is off-screen */
  show:function(ws){ var v=ws.cameras.main.worldView; (ZROAD._layers||[]).forEach(function(C){ if(!C.scene)return; var b=C._zrBox; C.setVisible(!(b[0]>v.right||b[2]<v.x||b[1]>v.bottom||b[3]<v.y)); }); },
  // every cell within reach of a line of points
  cells:function(pts,reach,out){ var S=ZROAD.CELL; for(var i=0;i<pts.length;i++){ var a=pts[i], b=pts[Math.min(pts.length-1,i+1)], n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/32));
      for(var s=0;s<=n;s++){ var x=a.x+(b.x-a.x)*s/n, y=a.y+(b.y-a.y)*s/n; for(var gx=Math.floor((x-reach)/S);gx<=Math.floor((x+reach)/S);gx++)for(var gy=Math.floor((y-reach)/S);gy<=Math.floor((y+reach)/S);gy++)out[gx+','+gy]=1; } } return out; },
  stroke:function(g,pts,w,col,a){ if(pts.length<2)return; col=col===undefined?0xffffff:col; a=a===undefined?1:a; g.lineStyle(w,col,a); g.beginPath(); g.moveTo(pts[0].x,pts[0].y); for(var i=1;i<pts.length;i++)g.lineTo(pts[i].x,pts[i].y); g.strokePath(); g.fillStyle(col,a); pts.forEach(function(p){ g.fillCircle(p.x,p.y,w/2); }); },
  ring:function(H){ var R=ZCITY.RING*TILE, out=[]; for(var i=0;i<=48;i++){ var a=i/48*Math.PI*2; out.push({x:H.x+Math.cos(a)*R,y:H.y+Math.sin(a)*R*0.85}); } return out; },
  // the whole road network
  draw:function(ws,RS,L){ var H=ZASG.heart(ws), W=(ZCITY.ROAD*2+1)*TILE, RW=TILE*1.6, paths=(RS.paths||[]).map(ZROAD.smooth), ring=ZROAD.ring(H), rim=ZROAD.RIM;
    // gate → heart: the far end of each road from the heart comes first
    paths=paths.map(function(p){ var a=p[0], b=p[p.length-1]; return Math.hypot(a.x-H.x,a.y-H.y)<Math.hypot(b.x-H.x,b.y-H.y)?p.slice().reverse():p; });
    // each road stops at the ring round the heart (inside it only the world-tree circle shows)
    var RR=ZCITY.RING*TILE, inR=function(q){ var dx=(q.x-H.x)/RR, dy=(q.y-H.y)/(RR*0.85); return dx*dx+dy*dy<1; };
    paths=paths.map(function(p){ var out=[]; for(var i=0;i<p.length;i++){ if(inR(p[i])){ if(out.length){ var a=out[out.length-1], b=p[i], lo=0, hi=1; for(var k=0;k<12;k++){ var m=(lo+hi)/2; if(inR({x:a.x+(b.x-a.x)*m,y:a.y+(b.y-a.y)*m}))hi=m; else lo=m; } out.push({x:a.x+(b.x-a.x)*hi,y:a.y+(b.y-a.y)*hi}); } break; } out.push(p[i]); } return out; }).filter(function(p){ return p.length>1; });
    var edge=ws.add.graphics().setDepth(-3.64); paths.forEach(function(p){ ZROAD.stroke(edge,p,W+2*rim+6,0x7a5418,0.9); }); ZROAD.stroke(edge,ring,RW+2*rim+6,0x7a5418,0.9); L.push(edge);
    var cAll={}; paths.forEach(function(p){ ZROAD.cells(p,W/2+rim+4,cAll); }); ZROAD.cells(ring,RW/2+rim+4,cAll);
    var cRing=ZROAD.cells(ring,RW/2+4,{}), cRoad={}; paths.forEach(function(p){ ZROAD.cells(p,W/2+4,cRoad); });
    ZROAD.layer(ws,ZROAD.tex(ws,'tx_asg_rim'),function(g){ paths.forEach(function(p){ ZROAD.stroke(g,p,W+2*rim); }); ZROAD.stroke(g,ring,RW+2*rim); },cAll,-3.63,L);
    ZROAD.layer(ws,ZROAD.tex(ws,ZROAD.painted('tx_asg_plaza')?'tx_asg_plaza':'tx_asg_road'),function(g){ ZROAD.stroke(g,ring,RW); },cRing,-3.615,L);
    ZROAD.layer(ws,ZROAD.tex(ws,'tx_asg_road'),function(g){ paths.forEach(function(p){ ZROAD.stroke(g,p,W); }); },cRoad,-3.61,L);
    // the medallions, and the light that runs along them toward the heart
    var meds=[], gk=ZROAD.glowTex(ws), Z=ZCITY.Z(), mi=0;
    paths.forEach(function(p){ var acc=TILE*2.2, idx=0, total=0; for(var i=1;i<p.length;i++)total+=Math.hypot(p[i].x-p[i-1].x,p[i].y-p[i-1].y);
      for(var j=1,run=0;j<p.length;j++){ var a=p[j-1], b=p[j], d=Math.hypot(b.x-a.x,b.y-a.y); while(acc<=run+d){ var u=(acc-run)/d, x=a.x+(b.x-a.x)*u, y=a.y+(b.y-a.y)*u;
          if(acc<total-TILE*2.5&&Math.hypot(x-H.x,y-H.y)>(ZCITY.RING+1.4)*TILE){ var M=ZROAD.medTex(ws,mi++), im=null;
            if(M.id){ var mk=ZROAD.cut(ws,M.id); if(mk)im=ws.add.image(x,y,mk).setDepth(-3.58).setDisplaySize(TILE*1.55,TILE*1.55*0.86); } if(!im)im=ws.add.image(x,y,M.key).setDepth(-3.58).setDisplaySize(TILE*1.5,TILE*1.5*0.85);
            var gl=ws.add.image(x,y,gk).setDepth(-3.57).setBlendMode(Phaser.BlendModes.ADD).setDisplaySize(TILE*3.2,TILE*2.7).setAlpha(0.2); L.push(im); L.push(gl); meds.push({gl:gl,i:idx++}); }
          acc+=TILE*ZROAD.MED; } run+=d; } });
    ZROAD._layers=(ZROAD._layers||[]).filter(function(C){ return C.scene===ws; }); ZROAD.show(ws);
    { var t0=ws.time.now; ws.time.addEvent({delay:50,loop:true,callback:function(){ var t=(ws.time.now-t0)/1000; ZROAD.show(ws); meds.forEach(function(m){ if(!m.gl.scene)return; var ph=((t*1.6-m.i*0.55)%3.2+3.2)%3.2, k=ph<0.9?Math.sin(ph/0.9*Math.PI):0; m.gl.setAlpha(0.18+0.75*k); }); }}); }
    ZROAD._last={paths:paths.length,meds:meds.length,cells:Object.keys(cAll).length}; return meds; }
};
