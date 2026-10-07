// ═══════════════════════════════════════════════════════════════════════
// ║ THE HOME VILLAGE (Phase 3, Kris's pick): Runestone Hamlet, plus
// ║ borrowed pieces — market carts, windmills, walls with turrets, glowing
// ║ lanterns by the doors, chimney smoke, many roof types, fountains, harbour
// ║ stone streets and neat vegetable gardens.
// ║ It GROWS in 5 stages (1 + craftsmen freed): outward and denser.
// ║   buildings: 13 → 20 → 28 → 36 → 44 (stage 1 ≈ 30% of the final count;
// ║   the final town is ~2× as dense as the old stage-5 design)
// ║ villagePlan(stage, ok) returns a layout in tiles relative to the village
// ║ centre; the game (villageApply, 05d) and the Lab (village tab) render it.
// ═══════════════════════════════════════════════════════════════════════
var VILLAGE_CORE=[   // the enterable buildings (fixed; doors at the bottom centre)
  {dx:-12,dy:-12,w:5,h:4,type:'tavern'}, {dx:7,dy:-12,w:5,h:4,type:'shop'}, {dx:-12,dy:6,w:4,h:4,type:'house'},
  {dx:8,dy:6,w:4,h:4,type:'forge'}, {dx:-4,dy:-14,w:4,h:3,type:'guild'}, {dx:14,dy:-4,w:6,h:5,type:'stables'},
  {dx:-20,dy:-8,w:5,h:4,type:'armory'}, {dx:-20,dy:4,w:5,h:4,type:'clothing'}, {dx:0,dy:14,w:5,h:4,type:'jeweler'},
  {dx:10,dy:14,w:6,h:4,type:'apothecary'}, {dx:9,dy:-19,w:5,h:4,type:'merchant'}];
var VR={ R:[20,24,28,31,33], disk:[24,28,32,37,37], total:[13,20,28,36,44], houses:[2,9,17,25,33], carts:[1,3,5,7,9], gardens:[2,3,4,6,8],
  mills:[0,1,2,2,3], trees:[10,14,18,22,26], wallR:35 };
// looks for the enterable buildings (borrowed from all four styles)
var VR_CORE_LOOK={ tavern:{style:'timber',roof:'#a8452e',roofPat:'tile',sign:'#c84a3a'}, shop:{style:'timber',roof:'#3d5f9a',roofPat:'tile',awning:'#3a7ac8',sign:'#3a7ac8'},
  house:{style:'round',roof:'#b8964a'}, forge:{style:'stone',roof:'#4a5060',roofPat:'slate',sign:'#6a6a70',smoke:true},
  guild:{style:'stone',roof:'#5a5a6a',roofPat:'slate',sign:'#e0c060'}, stables:{style:'wood',roof:'#8a6440',roofPat:'shingle',sign:'#8a6440',wallH:40},
  armory:{style:'stone',roof:'#3e4656',roofPat:'slate',sign:'#8a8a90'}, clothing:{style:'timber',roof:'#6a3a5a',roofPat:'tile',awning:'#b070d0',sign:'#b070d0'},
  jeweler:{style:'round',roof:'#c4a25a',sign:'#40c0d0'}, apothecary:{style:'wood',roof:'#3f6a3a',roofPat:'shingle',sign:'#60a060'},
  merchant:{style:'timber',roof:'#8a5a2a',roofPat:'tile',awning:'#e0a030',sign:'#f0c040'} };
var VR_HOUSE_LOOKS=[ // weights: runestone round cottages first, then the other villages' houses
  {w:4,style:'round',roofs:['#b8964a','#a88a44','#c4a25a']},
  {w:2,style:'wood',roofPat:'shingle',roofs:['#3f6a3a','#4f7a44','#5a4a7a']},
  {w:2,style:'timber',roofPat:'tile',roofs:['#a8452e','#3d5f9a','#8a5a2a','#6a3a5a']},
  {w:2,style:'stone',roofPat:'slate',roofs:['#4a5060','#5a5a6a','#3e4656']},
  {w:1,style:'timber',roofPat:'thatch',roofs:['#b8964a','#a88a44']}];

function villagePlan(stage,ok,water){
  var st=Math.max(1,Math.min(5,stage||1)), s=st-1, N=41, SZ=N*2+1, occ=new Uint8Array(SZ*SZ), R=rngOf(90210);
  ok=ok||function(){ return true; }; var WA=water||function(dx,dy){ return VR_BAY(dx,dy); };
  var land=function(x,y){ return ok(x,y)&&!WA(x,y); };
  var id=function(x,y){ return (y+N)*SZ+x+N; }, inb=function(x,y){ return x>=-N&&y>=-N&&x<=N&&y<=N; };
  var mark=function(x,y,w,h,m,v){ for(var j=-m;j<h+m;j++)for(var i=-m;i<w+m;i++){ if(inb(x+i,y+j))occ[id(x+i,y+j)]=Math.max(occ[id(x+i,y+j)],v||1); } };
  var free=function(x,y,w,h){ for(var j=0;j<h;j++)for(var i=0;i<w;i++){ if(!inb(x+i,y+j)||occ[id(x+i,y+j)]||!land(x+i,y+j))return false; } return true; };
  var plan={stage:st,R:VR.R[s],disk:VR.disk[s],cells:[],props:[],solid:[],landmarks:[],ley:[],houses:0};
  var cellKind={};   // "x,y" -> kind id (streets / green / plazas / soil)
  var setK=function(x,y,k){ cellKind[x+','+y]=k; };
  // ── the fixed skeleton (the same at every stage, so houses never move) ──
  VILLAGE_CORE.forEach(function(b){ mark(b.dx,b.dy,b.w,b.h,1,2); mark(b.dx-1,b.dy+b.h,b.w+2,2,0,2); });   // keep the doorstep clear
  for(var gy=-10;gy<=10;gy++)for(var gx=-10;gx<=10;gx++)if(Math.hypot(gx+0.5,gy+0.5)<=9.6)occ[id(gx,gy)]=2;       // the runestone green
  // ── the harbour (all stages planned now so houses leave room for it) ──
  var H=null; (function(){
    var wc=[], sx=0, sy=0; for(var y=-46;y<=46;y++)for(var x=-46;x<=46;x++){ if(Math.hypot(x,y)>46||!WA(x,y))continue; wc.push([x,y]); if(Math.hypot(x,y)<=38){ sx+=x; sy+=y; } }
    if(!wc.length)return; var L0=Math.hypot(sx,sy)||1, ux=sx/L0, uy=sy/L0;   // direction from the green to the water
    var shore=[]; for(var y2=-36;y2<=36;y2++)for(var x2=-36;x2<=36;x2++){ var d=Math.hypot(x2,y2); if(d>34||d<12||!land(x2,y2))continue; var wn=[[1,0],[-1,0],[0,1],[0,-1]].filter(function(q){ return WA(x2+q[0],y2+q[1]); }).length; if(wn)shore.push({x:x2,y:y2,d:d,a:(x2*ux+y2*uy)/d}); }
    if(!shore.length)return; shore.sort(function(a,b){ return (b.a*10-Math.abs(b.d-22)*0.25)-(a.a*10-Math.abs(a.d-22)*0.25); });
    var A=shore[0], isW=function(x,y){ return WA(x,y); }, used={}, key=function(x,y){ return x+','+y; };
    var dirTo=function(x,y){ var bx=0, by=0; for(var j=-7;j<=7;j++)for(var i=-7;i<=7;i++){ if(isW(x+i,y+j)){ bx+=i; by+=j; } } var l=Math.hypot(bx,by)||1; return [bx/l,by/l]; };
    var pierFrom=function(sx0,sy0,len){ var dv=dirTo(sx0,sy0), cells=[], ends=null; for(var k=1;k<=len;k++){ var cx=Math.round(sx0+dv[0]*k), cy=Math.round(sy0+dv[1]*k), cx2=Math.round(sx0+dv[0]*k-dv[1]), cy2=Math.round(sy0+dv[1]*k+dv[0]);
        if(!isW(cx,cy))break; cells.push([cx,cy]); if(isW(cx2,cy2))cells.push([cx2,cy2]); ends=[cx,cy]; } return {cells:cells,end:ends,dir:dv}; };
    H={anchor:A,dir:[ux,uy]};
    H.pier1=pierFrom(A.x,A.y,8);
    // boardwalk: water cells along the shore within 12 tiles of the anchor
    H.walk=[]; shore.forEach(function(q){ if(Math.hypot(q.x-A.x,q.y-A.y)>12)return; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(o){ var x=q.x+o[0], y=q.y+o[1]; if(isW(x,y)&&!used[key(x,y)]){ used[key(x,y)]=1; H.walk.push([x,y]); } }); });
    H.pier1.cells.forEach(function(c){ used[key(c[0],c[1])]=1; });
    var rectW=function(x,y,w,h,m){ for(var j=-m;j<h+m;j++)for(var i=-m;i<w+m;i++){ if(!isW(x+i,y+j)||used[key(x+i,y+j)])return false; } return true; };
    var findRect=function(w,h,m,minD,maxD,near){ var best=null, bd=1e9; for(var y=A.y-maxD;y<=A.y+maxD;y++)for(var x=A.x-maxD;x<=A.x+maxD;x++){ var d=Math.hypot(x+w/2-A.x,y+h/2-A.y); if(d<minD||d>maxD||!rectW(x,y,w,h,m))continue; var sc=near?near(x,y):d; if(sc<bd){ bd=sc; best=[x,y]; } } if(best)for(var j=0;j<h;j++)for(var i=0;i<w;i++)used[key(best[0]+i,best[1]+j)]=1; return best; };
    var walkSet={}; H.walk.forEach(function(c){ walkSet[key(c[0],c[1])]=1; });
    var nearWalk=function(x,y){ var bd=99; H.walk.forEach(function(c){ var d=Math.hypot(c[0]-(x+2),c[1]-(y+1)); if(d<bd)bd=d; }); return bd; };
    H.boathouse=findRect(4,3,0,3,12,nearWalk);
    H.stilt=findRect(4,3,1,5,16,function(x,y){ return Math.abs(nearWalk(x,y)-5); });
    if(H.stilt){ var dx0=H.stilt[0]+2, dy0=H.stilt[1]+3, bw=null, bd2=99; H.walk.forEach(function(c){ var d=Math.hypot(c[0]-dx0,c[1]-dy0); if(d<bd2){ bd2=d; bw=c; } });
      H.stiltWalk=[]; if(bw){ var n=Math.ceil(bd2*2); for(var k=0;k<=n;k++){ var x=Math.round(bw[0]+(dx0-bw[0])*k/n), y=Math.round(bw[1]+(dy0-bw[1])*k/n); if(isW(x,y)&&!(x>=H.stilt[0]&&x<H.stilt[0]+4&&y>=H.stilt[1]&&y<H.stilt[1]+3)){ H.stiltWalk.push([x,y]); used[key(x,y)]=1; } } } }
    var far=shore.filter(function(q){ var d=Math.hypot(q.x-A.x,q.y-A.y); return d>=7&&d<=11; }).sort(function(a,b){ return b.a-a.a; })[0];
    H.pier2=far?pierFrom(far.x,far.y,7):null; if(H.pier2)H.pier2.cells.forEach(function(c){ used[key(c[0],c[1])]=1; });
    H.quay=shore.filter(function(q){ return Math.hypot(q.x-A.x,q.y-A.y)<=10; }).map(function(q){ return [q.x,q.y]; });
    // reserve the land by the water: fishing hut + quay
    H.quay.forEach(function(c){ mark(c[0],c[1],1,1,0,2); });
    H.hut=null; for(var r=2;r<8&&!H.hut;r++)for(var j=-r;j<=r&&!H.hut;j++)for(var i=-r;i<=r;i++){ var x=A.x-Math.round(ux*3)+i, y=A.y-Math.round(uy*3)+j; if(free(x,y,3,3)){ H.hut=[x,y]; mark(x,y,3,3,1,2); break; } }
  })();
  var streets=[   // [x0,y0,x1,y1,width,kind,fromStage]
    [1,-9,1,-40,2,'vstreet',1],[-1.5,9,-1.5,40,2.5,'vstreet',1],[9,2,40,2,2,'vstreet',1],[-9,2,-40,2,2,'vstreet',1]];
  [45,135,225,315].forEach(function(a){ var r=a*Math.PI/180; streets.push([Math.cos(r)*9.5,Math.sin(r)*9.5,Math.cos(r)*26,Math.sin(r)*26,2,'vlane',3]); });
  if(H)streets.push([Math.sign(H.dir[0])*6,Math.sign(H.dir[1])*6,H.anchor.x-H.dir[0],H.anchor.y-H.dir[1],2,'vlane',1]);
  var street=new Map();   // cell -> {kind, stage}
  var rast=function(x0,y0,x1,y1,w,k,from){ var L=Math.hypot(x1-x0,y1-y0), n=Math.ceil(L*2)+1;
    for(var i=0;i<=n;i++){ var px=x0+(x1-x0)*i/n, py=y0+(y1-y0)*i/n; for(var yy=Math.floor(py-w);yy<=Math.ceil(py+w);yy++)for(var xx=Math.floor(px-w);xx<=Math.ceil(px+w);xx++){
      if(!inb(xx,yy))continue; var tx=xx+0.5-x0, ty=yy+0.5-y0, t=Math.max(0,Math.min(1,(tx*(x1-x0)+ty*(y1-y0))/(L*L||1))), dx=xx+0.5-(x0+(x1-x0)*t), dy=yy+0.5-(y0+(y1-y0)*t);
      if(Math.hypot(dx,dy)>w/2)continue; if(occ[id(xx,yy)]===2||WA(xx,yy))continue; if(Math.hypot(xx+0.5,yy+0.5)>36.5)continue; var key=xx+','+yy, cur=street.get(key); if(!cur||cur.from>from)street.set(key,{k:k,from:from,x:xx,y:yy}); } } };
  streets.forEach(function(q){ rast(q[0],q[1],q[2],q[3],q[4],q[5],q[6]); });
  var ring=function(r,w,k,from){ for(var a=0;a<360;a+=0.6){ var t=a*Math.PI/180; rast(Math.cos(t)*r,Math.sin(t)*r,Math.cos(t+0.011)*r,Math.sin(t+0.011)*r,w,k,from); } };
  ring(15,2,'vlane',2); ring(26,2,'vlane',4);
  street.forEach(function(v){ occ[id(v.x,v.y)]=Math.max(occ[id(v.x,v.y)],1); });
  // plazas with fountains (the harbour town's water fountain)
  var plazas=[{x:8,y:-7,w:6,h:4,from:2,fx:10,fy:-6},{x:-15,y:-4,w:6,h:4,from:4,fx:-14,fy:-4}];
  plazas.forEach(function(p){ mark(p.x,p.y,p.w,p.h,1,2); });
  // town wall: an octagon with turrets at the corners and 4 gates
  var W8=[]; for(var v=0;v<8;v++){ var a8=(22.5+v*45)*Math.PI/180; W8.push([Math.round(Math.cos(a8)*VR.wallR),Math.round(Math.sin(a8)*VR.wallR)]); }
  var wallCells=[]; for(var e=0;e<8;e++){ var A=W8[e], B=W8[(e+1)%8], n2=Math.max(Math.abs(B[0]-A[0]),Math.abs(B[1]-A[1]));
    for(var i2=0;i2<=n2;i2++){ var cx=Math.round(A[0]+(B[0]-A[0])*i2/n2), cy=Math.round(A[1]+(B[1]-A[1])*i2/n2); var gate=(Math.abs(cx)<=3&&Math.abs(cy)>20)||(Math.abs(cy-1.5)<=3&&Math.abs(cx)>20)||WA(cx,cy)||WA(cx,cy+1); wallCells.push({x:cx,y:cy,e:e,gate:gate}); occ[id(cx,cy)]=2; if(inb(cx,cy+1))occ[id(cx,cy+1)]=Math.max(occ[id(cx,cy+1)],1); } }
  W8.forEach(function(q){ mark(q[0]-1,q[1]-1,3,3,1,2); });
  // fixed spots: windmills and the craftsmen's buildings
  var spots={ mill:[[24,-19],[-29,-7],[19,24]], bram:[19,17], mira:[18,-24], dunn:[-27,-11], vela:[-17,-25] };
  var claim=function(p,w,h){ for(var r=0;r<6;r++)for(var dy=-r;dy<=r;dy++)for(var dx=-r;dx<=r;dx++){ if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue; var x=p[0]+dx, y=p[1]+dy; if(free(x,y,w,h)&&Math.hypot(x+w/2,y+h/2)<33.5){ mark(x,y,w,h,1,2); return [x,y]; } } return null; };
  var special={ mill:spots.mill.map(function(p){ return claim(p,2,2); }), bram:claim(spots.bram,5,3), mira:claim(spots.mira,4,3), dunn:claim(spots.dunn,5,3), vela:claim(spots.vela,4,2) };
  // ── house lots: near a street, inner lots first (the same order at every stage) ──
  var near=function(x,y){ for(var dy=0;dy<=3;dy++)for(var dx=-2;dx<=2;dx++){ if(street.has((x+dx)+','+(y+dy)))return true; } return false; };
  // market carts along the east & west streets (claimed first so houses leave room)
  var carts=[], cartSpots=[]; for(var cx2=11;cx2<=31;cx2+=3){ cartSpots.push([cx2,0],[cx2,3],[-cx2-1,0],[-cx2-1,3]); }
  cartSpots.sort(function(a,b){ return Math.abs(a[0])-Math.abs(b[0]); });
  cartSpots.forEach(function(q){ if(carts.length<VR.carts[4]&&free(q[0],q[1],2,1)){ mark(q[0],q[1],2,1,0,2); carts.push({x:q[0],y:q[1]}); } });
  var cand=[]; for(var y=-34;y<=33;y++)for(var x=-34;x<=33;x++){ var d=Math.hypot(x+2,y+1.5); if(d<10||d>32.5)continue; cand.push({x:x,y:y,d:d+R.f()*3}); }
  cand.sort(function(a,b){ return a.d-b.d; });
  var lots=[], gardens=[];
  cand.forEach(function(c){ if(lots.length>=VR.houses[4]+4)return; var w=R.pick([3,4,4,5]); if(!free(c.x,c.y,w,3)||!near(c.x+Math.floor(w/2),c.y+3))return; if(Math.hypot(c.x+w,c.y+3)>33.5||Math.hypot(c.x,c.y)>33.5)return; mark(c.x,c.y,w,3,1,2); mark(c.x-1,c.y+3,w+2,2,0,2); lots.push({x:c.x,y:c.y,w:w,h:3,d:Math.hypot(c.x+w/2,c.y+1.5)}); });
  cand.forEach(function(c){ if(gardens.length>=VR.gardens[4]||c.d<17)return; var w=R.pick([4,5]); if(!free(c.x,c.y,w,3))return; if(Math.hypot(c.x+w,c.y+3)>33.5)return; mark(c.x,c.y,w,3,1,2); gardens.push({x:c.x,y:c.y,w:w,h:3,d:Math.hypot(c.x+w/2,c.y+1.5)}); });
  // market carts along the east street and the market plaza
  // ── render this stage ──
  var P=function(prop,x,y,w,h,o,solid){ plan.props.push({prop:prop,x:x,y:y,w:w,h:h,o:o||{}}); if(solid)for(var j=0;j<h;j++)for(var i=0;i<w;i++)plan.solid.push([x+i,y+j]); };
  var Rs=VR.R[s], inR=function(x,y,w,h){ return Math.hypot(x+w/2,y+h/2)<=Rs+0.5; };
  // ground kinds
  street.forEach(function(v){ if(v.from<=st&&Math.hypot(v.x+0.5,v.y+0.5)<=VR.disk[s]-0.5)setK(v.x,v.y,v.k); });
  for(var gy2=-10;gy2<=10;gy2++)for(var gx2=-10;gx2<=10;gx2++){ var dg=Math.hypot(gx2+0.5,gy2+0.5); if(dg<=9.6)setK(gx2,gy2,dg>8.6&&st>=2?'vpave':'vgreen'); }
  VILLAGE_CORE.forEach(function(b){ for(var j=0;j<b.h;j++)for(var i=0;i<b.w;i++)setK(b.dx+i,b.dy+j,'vgrass'); for(var i2=0;i2<b.w;i2++)setK(b.dx+i2,b.dy+b.h,'vpave'); });
  plazas.forEach(function(p){ if(p.from>st)return; for(var j=0;j<p.h;j++)for(var i=0;i<p.w;i++)setK(p.x+i,p.y+j,'vplaza'); P('fountain',p.fx,p.fy,3,3,{rune:'#6fe3f5'},true);
    // painted dressing (round 31): shown only when its picture is there; nothing blocks the way
    if(p.fx-2>=p.x)P('vdress',p.fx-2,p.fy+1,1,1,{id:'vp_bench'},false); if(p.fx+4<p.x+p.w)P('vdress',p.fx+4,p.fy+1,1,1,{id:'vp_bench'},false); P('vdress',p.x,p.y+p.h-1,1,1,{id:'vp_signpost'},false); P('vdress',p.x+p.w-1,p.y,1,1,{id:'vp_notice'},false); });
  // the runestone green: rune circle, standing stones, well; ley lines grow with the village
  P('runecircle',-3,-3,7,7,{col:'#63f2dc',n:12,solid:false,logo:true,grow:2.12});   // round 14: the Zeldara logo is set into the plaza floor where the game begins; round 15: as wide as the ring of standing stones (grow)
  var stones=[]; for(var k=0;k<8;k++){ var a=(k/8+1/16)*Math.PI*2, sx=Math.round(Math.cos(a)*7.4), sy=Math.round(Math.sin(a)*7.4); if(Math.abs(sx-4)<=1&&Math.abs(sy-3)<=1)continue; stones.push([sx,sy]); P('stone',sx,sy,1,1,{rune:'#6fe3f5',tall:44+(k%3)*8},true); }
  P('well',-6,3,1,1,{},true);
  if(st>=2)plan.ley.push({pts:stones.concat([stones[0]]),col:'#6fe3f5'});
  if(st>=4)[[0,-9],[0,9],[9,0],[-9,0]].forEach(function(q){ plan.ley.push({pts:[[q[0]*0.8,q[1]*0.8],[q[0]*3.6,q[1]*3.6]],col:'#6fe3f5'}); });
  // core buildings (enterable) — drawn with the Lab's house painter
  VILLAGE_CORE.forEach(function(b){ var L=VR_CORE_LOOK[b.type]||{}; P('vbuild',b.dx,b.dy,b.w,b.h,Object.assign({doorX:Math.floor(b.w/2),chimney:true,flowers:st>=3,core:b.type},L),false);
    P('lantern',b.dx+Math.floor(b.w/2)+(b.w>=5?2:1),b.dy+b.h,1,1,{col:'#ffd27a'},false); });
  // houses: the first N lots within this stage's radius
  var HW=[]; VR_HOUSE_LOOKS.forEach(function(L,i){ for(var q=0;q<L.w;q++)HW.push(i); });
  // buildings = enterable + houses + fishing hut + craftsmen's halls + boathouse + lake house → VR.total[s]
  var extra=(H&&H.hut?1:0)+(st>=2&&special.bram?1:0)+(st>=2&&H&&H.boathouse?1:0)+(st>=3&&special.mira?1:0)+(st>=3&&H&&H.stilt?1:0)+(st>=4&&special.dunn?1:0), wantH=Math.max(0,VR.total[s]-VILLAGE_CORE.length-extra);
  var nh=0; lots.forEach(function(l,i){ if(nh>=wantH||!inR(l.x,l.y,l.w,l.h))return; nh++;
    var HR=rngOf(7001+i*31), L=VR_HOUSE_LOOKS[HR.pick(HW)], ch=HR.chance(0.75);
    P('vbuild',l.x,l.y,l.w,l.h,{style:L.style,roof:HR.pick(L.roofs),roofPat:L.roofPat,chimney:ch,smoke:ch&&HR.chance(0.72),flowers:HR.chance(st>=3?0.7:0.35),doorX:Math.floor(l.w/2),nl:1,wallH:L.style==='round'?40:44},true);
    var lx=l.x+Math.floor(l.w/2)+1; if(lx<l.x+l.w)P('lantern',lx,l.y+l.h,1,1,{col:HR.pick(['#ffd27a','#ffc070','#9fe8ff'])},false);
    if(HR.chance(0.5))P('flowers',l.x-1,l.y+l.h,1,1,{n:6,solid:false},false);
    if((i*7+3)%5<3)P('vdress',l.x-1,l.y+l.h-1,1,1,{id:['vp_woodpile','vp_barrels','vp_crates','vp_haystack','vp_laundry'][i%5]},false); });
  plan.houses=VILLAGE_CORE.length+nh+extra;
  // vegetable gardens (neat rows, the harbour town's gardens tidied up)
  var ng=0; gardens.forEach(function(gd){ if(ng>=VR.gardens[s]||Math.hypot(gd.x+gd.w/2,gd.y+1.5)>Rs+2)return; ng++; for(var j=0;j<3;j++)for(var i=0;i<gd.w;i++)setK(gd.x+i,gd.y+j,'vsoil'); P('vegplot',gd.x,gd.y,gd.w,3,{seed:ng},false); });
  // market carts (from the market town)
  carts.filter(function(c){ return Math.abs(c.x)+2<=Rs; }).slice(0,VR.carts[s]).forEach(function(c,i){ P('cart',c.x,c.y,2,1,{col:['#c84a3a','#3a7ac8','#e0a030','#4a9a5a','#b070d0'][i%5]},true); });
  // windmills (from the market & grove towns)
  special.mill.slice(0,VR.mills[s]).forEach(function(q){ if(q)P('windmill',q[0],q[1],2,2,{rune:'#ffd27a'},true); });
  // the craftsmen's buildings
  if(st>=2&&special.bram){ var b2=special.bram; P('vbuild',b2[0],b2[1],5,3,{style:'wood',roof:'#8a6440',roofPat:'shingle',sign:'#c89040',doorX:2,nl:1,pid:'vb_builders_yard'},true); P('pebbles',b2[0]+5,b2[1]+1,2,2,{},false);
    plan.landmarks.push({x:b2[0],y:b2[1],w:5,h:4,text:'Bram\'s Builder\'s Yard — he laid the harbour-stone streets and the ring roads.'}); }
  if(st>=3&&special.mira){ var b3=special.mira; P('vbuild',b3[0],b3[1],4,3,{style:'stone',roof:'#6a6a70',roofPat:'slate',sign:'#c0c0c8',doorX:2,smoke:true,chimney:true,nl:1,pid:'vb_workshop'},true);
    [[3,-11],[-2,-11],[3,11],[-4,11],[11,4],[-11,4],[11,-1],[-11,-1]].forEach(function(q){ P('lamppost',q[0],q[1],1,1,{},false); });
    plan.landmarks.push({x:b3[0],y:b3[1],w:4,h:4,text:'Mira\'s Workshop — gears, lamps and the windmills that power them.'}); }
  if(st>=4&&special.dunn){ var b4=special.dunn; P('vbuild',b4[0],b4[1],5,3,{style:'stone',roof:'#3a3a40',roofPat:'slate',sign:'#ff8a40',chimney:true,smoke:true,doorX:2,nl:1,pid:'vb_forge_hall'},true); P('anvil',b4[0]+5,b4[1]+2,1,1,{},false); P('statue',-4,5,1,1,{},true);
    plan.landmarks.push({x:b4[0],y:b4[1],w:5,h:4,text:'Dunn\'s Forge Hall — the finest steel on the island, and the statue he cast for the green.'}); }
  if(st>=5&&special.vela){ var b5=special.vela; P('balloondock',b5[0],b5[1],4,2,{},true); plan.landmarks.push({x:b5[0],y:b5[1],w:4,h:3,text:'Vela\'s Sky Dock — balloons to every corner of the world.'}); }
  // town wall & turrets (the walled harbour town's): gates from stage 3, the full ring from stage 4
  if(st>=3){ var gatesOnly=st===3;
    wallCells.forEach(function(c){ if(c.gate||WA(c.x,c.y))return; if(gatesOnly&&!(Math.abs(c.x)<=7&&Math.abs(c.y)>20))return; plan.solid.push([c.x,c.y]); });
    for(var e2=0;e2<8;e2++){ var A2=W8[e2], B2=W8[(e2+1)%8], cells=wallCells.filter(function(c){ return c.e===e2&&!c.gate&&(!gatesOnly||(Math.abs(c.x)<=7&&Math.abs(c.y)>20)); });
      for(var i3=0;i3<cells.length;i3+=4){ var seg=cells.slice(i3,i3+4), xs=seg.map(function(q){return q.x;}), ys=seg.map(function(q){return q.y;}), x0=Math.min.apply(null,xs), y0=Math.min.apply(null,ys);
        P('vwall',x0,y0,Math.max.apply(null,xs)-x0+1,Math.max.apply(null,ys)-y0+1,{pts:seg.map(function(q){return [q.x-x0,q.y-y0];})},false); } }
    var gt=[[-5,-33],[4,-33],[-5,31],[4,31]], towers=gatesOnly?gt:W8.map(function(q){return [q[0]-1,q[1]-1];}).concat(gt,[[-33,-3],[-33,5],[31,-3],[31,5]]);
    towers.forEach(function(q){ P('tower',q[0],q[1],2,2,{flag:st>=5?'#6fe3f5':'#c84a3a'},true); });
  } else { // before the wall: dry-stone walls round the sheep pen (runestone)
    P('fence',22,8,7,1,{kind:'stone'},false); for(var sh=0;sh<3;sh++)P('sheep',23+sh*2,10,1,1,{},false); }
  // ── the harbour, growing with the village ──
  plan.walk=[];
  if(H){ var pc=function(list){ (list||[]).forEach(function(c){ setK(c[0],c[1],'vpier'); plan.walk.push(c); }); };
    var p1=H.pier1.cells.slice(0,st>=2?99:8); pc(p1);
    if(H.hut)P('vbuild',H.hut[0],H.hut[1],3,3,{style:'wood',roof:'#4f7a44',roofPat:'shingle',sign:'#4a9ad0',doorX:1,chimney:true,smoke:true,nl:1,pid:'vb_fishing_hut'},true);
    if(H.hut){ P('vdress',H.hut[0]+3,H.hut[1]+2,1,1,{id:'vp_fish_rack'},false); P('vdress',H.hut[0]-1,H.hut[1]+2,1,1,{id:'vp_nets'},false); }
    if(st>=2){ pc(H.walk); if(H.boathouse){ P('boathouse',H.boathouse[0],H.boathouse[1],4,3,{},true); P('vdress',H.boathouse[0]+4,H.boathouse[1]+2,1,1,{id:'hb_cargo'},false); } }
    if(st>=3){ if(H.stilt){ pc(H.stiltWalk); P('stilthouse',H.stilt[0],H.stilt[1],4,3,{roof:'#3f6a3a'},true); plan.landmarks.push({x:H.stilt[0],y:H.stilt[1],w:4,h:3,text:'The Lake House — built on stilts over Mirror Lake. Fishers swear the lake glows beneath it on quiet nights.'}); }
      if(H.pier2)pc(H.pier2.cells); }
    if(st>=4)H.quay.forEach(function(c){ setK(c[0],c[1],'vquay'); });
    if(st>=5&&H.pier1.end){ var e=H.pier1.end; P('lighthouse',e[0],e[1],1,1,{},true); for(var li=2;li<p1.length;li+=4)P('lantern',p1[li][0],p1[li][1],1,1,{col:'#ffd27a'},false); }
    // boats moored beside the piers
    var boatSpots=[], taken={}; plan.walk.forEach(function(c){ taken[c[0]+','+c[1]]=1; });
    [H.pier1].concat(st>=3&&H.pier2?[H.pier2]:[]).forEach(function(pr){ if(!pr||!pr.dir)return; var dv=pr.dir; pr.cells.forEach(function(c,i){ if(i%3!==2)return; [[-dv[1]*2,dv[0]*2],[dv[1]*2,-dv[0]*2]].forEach(function(o){ var x=Math.round(c[0]+o[0]), y=Math.round(c[1]+o[1]); if(WA(x,y)&&WA(x+1,y)&&WA(x+2,y)&&!taken[x+','+y]&&!taken[(x+1)+','+y]){ taken[x+','+y]=taken[(x+1)+','+y]=taken[(x+2)+','+y]=1; boatSpots.push([x,y]); } }); }); });
    boatSpots.slice(0,[1,2,3,4,6][s]).forEach(function(b,i){ P('boatv',b[0],b[1],3,1,{any:true,sail:st>=3&&i%2===0},false); });
    plan.landmarks.push({x:H.anchor.x-1,y:H.anchor.y-1,w:3,h:3,text:st>=4?'Mirror Harbour — stone quay, boathouse and piers. Boats sail from here across the lake.':'The fishing pier — the village\'s way onto Mirror Lake.'});
  }
  // trees, bushes and flowers around the edge; banners & festival lights at the end
  var tr=rngOf(4242), nt=0; for(var t=0;t<400&&nt<VR.trees[s];t++){ var an=tr.f()*Math.PI*2, rr=Rs-6+tr.f()*9, tx=Math.round(Math.cos(an)*rr), ty=Math.round(Math.sin(an)*rr);
    if(!free(tx,ty,1,1)||street.has(tx+','+ty)||Math.hypot(tx,ty)>VR.disk[s]-1)continue; mark(tx,ty,1,1,0,1); nt++; P(tr.chance(0.7)?'tree':'bush',tx,ty,1,1,{kind:'round',col:tr.pick(['#3f7a3a','#4a7a3a','#2f6a2a']),col2:'#6aa452'},true); }
  if(st>=5){ [[-6,-9],[6,-9],[-6,9],[6,9],[-9,-6],[9,-6]].forEach(function(q){ P('banner',q[0],q[1],1,1,{},false); });
    for(var f=0;f<12;f++){ var af=f/12*Math.PI*2; P('lantern',Math.round(Math.cos(af)*11),Math.round(Math.sin(af)*11),1,1,{col:['#ffd27a','#ff9ab0','#9fe8ff'][f%3]},false); } }
  plan.landmarks.push({x:-3,y:-3,w:7,h:7,text:'The Runestone Green — the heart of the village. The stones hum louder with every craftsman who comes home.'});
  plan.kinds=cellKind;
  return plan;
}

// ── new props for the village ──
WPROP.cart=function(c,ctx,x,y,w,h,o){ var col=o.col||'#c84a3a', R=c.R; addSprite(c.m,x+w/2,y+h,w+24,70,function(g,W,H){ softShadow(g,W/2,H-4,W/2-6,5,0.35);
  g.fillStyle='#6a4a2e'; g.fillRect(8,H-30,W-16,12); g.fillStyle='#8a6440'; g.fillRect(8,H-32,W-16,3);
  var goods=['#e05050','#f0c040','#80c050','#e08030','#b070d0','#d8c8a0']; for(var i=0;i<(W-20)/6;i++){ g.fillStyle=R.pick(goods); g.beginPath(); g.arc(12+i*6,H-34-(i%2)*2,3.2,0,Math.PI*2); g.fill(); }
  for(var s=0;s<W-14;s+=9){ g.fillStyle=(s/9)%2?col:'#f4ecd8'; g.fillRect(7+s,H-56,9,5); } g.fillStyle='#5a3a22'; g.fillRect(9,H-56,3,26); g.fillRect(W-12,H-56,3,26);
  [[14,H-12],[W-14,H-12]].forEach(function(q){ g.fillStyle='#3a2a1a'; g.beginPath(); g.arc(q[0],q[1],8,0,Math.PI*2); g.fill(); g.fillStyle='#8a6a44'; g.beginPath(); g.arc(q[0],q[1],5.5,0,Math.PI*2); g.fill(); g.strokeStyle='#3a2a1a'; g.lineWidth=1.5; g.beginPath(); g.moveTo(q[0]-5,q[1]); g.lineTo(q[0]+5,q[1]); g.moveTo(q[0],q[1]-5); g.lineTo(q[0],q[1]+5); g.stroke(); });
  g.strokeStyle='#5a3a22'; g.lineWidth=3; g.beginPath(); g.moveTo(W-8,H-22); g.lineTo(W-1,H-16); g.stroke(); }); };
WPROP.vegplot=function(c,ctx,x,y,w,h,o){ var R=c.R; // neat rows: cabbages, carrots, leeks, pumpkins
  var Zs=_scn(), vid=Zs&&['vp_veg_cabbage','vp_veg_carrot','vp_veg_leek','vp_veg_pumpkin'][(o.seed||0)%4]; if(vid&&Zs.sprite(c.m,vid,x+w/2,y+h,0,{w:w+4,shadow:false,sp:{depth:y+6}}))return;      // painted garden bed (round 31): lies low, so it sorts behind who walks past its front
  ctx.fillStyle='#5a3e24'; ctx.fillRect(x+3,y+3,w-6,h-6);
  var rows=Math.floor((h-8)/12), crops=['cab','car','leek','pump'];
  for(var r=0;r<rows;r++){ var cy=y+8+r*12, kind=crops[(r+(o.seed||0))%4]; ctx.fillStyle='rgba(0,0,0,.25)'; ctx.fillRect(x+6,cy+7,w-12,2);
    for(var cx=x+10;cx<x+w-8;cx+=10){ if(kind==='cab'){ ctx.fillStyle='#6aa84a'; ctx.beginPath(); ctx.arc(cx,cy+3,4.2,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#9ad070'; ctx.beginPath(); ctx.arc(cx-1,cy+2,2,0,Math.PI*2); ctx.fill(); }
      else if(kind==='car'){ ctx.fillStyle='#e07a2a'; ctx.fillRect(cx-1,cy+3,3,3); ctx.strokeStyle='#5aa040'; ctx.lineWidth=1.3; ctx.beginPath(); ctx.moveTo(cx,cy+3); ctx.lineTo(cx-3,cy-3); ctx.moveTo(cx,cy+3); ctx.lineTo(cx+3,cy-3); ctx.moveTo(cx,cy+3); ctx.lineTo(cx,cy-4); ctx.stroke(); }
      else if(kind==='leek'){ ctx.fillStyle='#e8e4c8'; ctx.fillRect(cx-1,cy,3,6); ctx.fillStyle='#4a8a3a'; ctx.fillRect(cx-2,cy-5,2,6); ctx.fillRect(cx+1,cy-6,2,7); }
      else { ctx.fillStyle='#e08a2a'; ctx.beginPath(); ctx.ellipse(cx,cy+3,5,4,0,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='#b0601a'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(cx,cy-1); ctx.lineTo(cx,cy+7); ctx.stroke(); ctx.fillStyle='#4a7a2a'; ctx.fillRect(cx-1,cy-3,2,3); } } }
  addSprite(c.m,x+w/2,y+h,w+6,30,function(g,W,H){ g.fillStyle='#8a6440'; g.fillRect(3,H-14,W-6,2); g.fillRect(3,H-8,W-6,2); for(var p=3;p<=W-4;p+=12)g.fillRect(p,H-18,3,15); });
  addSprite(c.m,x+w/2,y+4,w+6,24,function(g,W,H){ g.fillStyle='#8a6440'; g.fillRect(3,H-12,W-6,2); g.fillRect(3,H-6,W-6,2); for(var p=3;p<=W-4;p+=12)g.fillRect(p,H-15,3,12); });
  var sp=c.m.sprites[c.m.sprites.length-1]; sp.depth=y+4; };
WPROP.vwall=function(c,ctx,x,y,w,h,o){ var pts=o.pts||[[0,0]], top=46; // a run of town wall, blocks drawn back to front
  var Zs=_scn(); if(Zs&&Zs.has('vw_wall_h')){ var RS=Zs.RES, W0=w+8, H0=h+top+14, kx=(LT+1)/Zs.size('vw_wall_h',50).w;      // painted wall blocks (round 31), each one tile wide and 50 px tall
    addSprite(c.m,x+w/2,y+h,W0*RS,H0*RS,function(g){ g.scale(RS,RS); var ox=4, oy=H0-h-2; pts.slice().sort(function(a,b){return a[1]-b[1];}).forEach(function(p){ Zs.draw(g,'vw_wall_h',ox+p[0]*LT+LT/2,oy+p[1]*LT+LT,50,{stretch:kx}); }); });
    var zsp=c.m.sprites[c.m.sprites.length-1]; zsp.oy=1; zsp.res=RS; return; }
  addSprite(c.m,x+w/2,y+h,w+8,h+top+10,function(g,W,H){ var ox=4, oy=H-h-2; pts.slice().sort(function(a,b){return a[1]-b[1];}).forEach(function(p){ var px=ox+p[0]*LT, py=oy+p[1]*LT;
      var gf=g.createLinearGradient(0,py+LT-top,0,py+LT); gf.addColorStop(0,'#a8a296'); gf.addColorStop(1,'#6e6a62'); g.fillStyle=gf; g.fillRect(px,py+LT-top+10,LT,top-10);
      g.fillStyle='rgba(0,0,0,.2)'; for(var yy=py+LT-top+18;yy<py+LT;yy+=9){ g.fillRect(px,yy,LT,1.2); for(var xx=px+((yy/9)%2)*8;xx<px+LT;xx+=16)g.fillRect(xx,yy,1.2,9); }
      g.fillStyle='#bdb6a8'; g.fillRect(px,py+LT-top,LT,12); g.fillStyle='#8a8478'; for(var m=0;m<2;m++)g.fillRect(px+2+m*16,py+LT-top-7,11,8); }); });
  var sp=c.m.sprites[c.m.sprites.length-1]; sp.oy=1; };

// ground kinds for the village (shared by the game and the Lab)
var VR_KINDS={
  vstreet:WK('vstreet','#9a9486','#b0aa9a',{pattern:'flag',grout:'#5a564e',flat:true,rim:'#7a766c',rimW:1,nowarp:true}),   // harbour stones
  vlane:WK('vlane','#9a8660','#aa9670',{sc:0.3,deco:WDECO.dots(['#8a7650','#b8a888'],0.3)}),
  vgreen:WK('vgreen','#78a058','#90b468',{sc:0.15,deco:WDECO.grass('rgba(60,100,40,.5)',0.4)}),
  vplaza:WK('vplaza','#b4ac98','#c6beaa',{pattern:'slab',flat:true}),
  vsoil:WK('vsoil','#5a3e24','#6a4a2e',{sc:0.3}),
  vpave:WK('vpave','#a8a08a','#bab29c',{pattern:'flag',grout:'#5a564e',flat:true}),
  vgrass:WK('grass','#6b8a4a','#86a05a',{sc:0.12,deco:WDECO.grass('rgba(40,80,30,.45)',0.35)}),
  vpier:WK('vpier','#8a6a44','#9a7a50',{pattern:'planks',vert:true,flat:true,nowarp:true}),
  vquay:WK('vquay','#9a9486','#b0aa9a',{pattern:'brick',grout:'#4a463e',flat:true,nowarp:true}),
  vwater:WK('water','#1d5878','#2a6f92',{solid:true,liquid:true,shore:'#d8f0e8',sc:0.06,deco:WDECO.ripple('#ffffff')}) };
// The harbour bay: Mirror Lake reaches into the village's south-west quarter
// (carved by the world map; simulated by the Lab preview).
function VR_BAY(dx,dy){ if(Math.hypot(dx+23,dy-23)<13.5)return true; var ax=-23, ay=23, bx=-46, by=40, t=Math.max(0,Math.min(1,((dx-ax)*(bx-ax)+(dy-ay)*(by-ay))/((bx-ax)*(bx-ax)+(by-ay)*(by-ay)))); return Math.hypot(dx-(ax+(bx-ax)*t),dy-(ay+(by-ay)*t))<7.5; }
// Lab preview: the same plan on an 80×80 sample
function villagePlusDesign(stage){
  var K=VR_KINDS, plan=villagePlan(stage), O=48;
  return { id:'village_runestone_plus_'+stage, quad:0, w:96, h:96, seed:900+stage, name:'Runestone Hamlet+ · Stage '+stage, runeCol:'#6fe3f5',
    ground:K.vgrass, kinds:[K.vstreet,K.vlane,K.vgreen,K.vplaza,K.vpave,K.vsoil,K.vwater,K.vpier,K.vquay], hills:{sc:0.05,k:0.4}, spawnAt:[O+1,O+11],
    layout:function(c){ for(var y=0;y<96;y++)for(var x=0;x<96;x++)if(VR_BAY(x-O,y-O))c.set(x,y,'water'); Object.keys(plan.kinds).forEach(function(k){ var q=k.split(','); c.set(+q[0]+O,+q[1]+O,plan.kinds[k]); }); },
    props:function(c){ plan.props.forEach(function(p){ c.obst.push({prop:p.prop,x:p.x+O,y:p.y+O,w:p.w,h:p.h,o:p.o}); });
      plan.solid.forEach(function(q){ var x=q[0]+O, y=q[1]+O; if(x>=0&&y>=0&&x<96&&y<96)c.m.solid[y*96+x]=1; });
      plan.landmarks.forEach(function(L){ c.landmark(L.x+O,L.y+O,L.w,L.h,L.text); });
      plan.ley.forEach(function(L){ c.leyLine(L.pts.map(function(p){ return [p[0]+O,p[1]+O]; }),L.col); }); },
    particles:[WPART.motes('#fff4c8',200)].concat(stage>=5?[WPART.petals(['#ffd6e8','#fff3a8','#c8e0ff'])]:[]) };
}
// ── harbour props ──
WPROP.boathouse=function(c,ctx,x,y,w,h,o){ addSprite(c.m,x+w/2,y+h,w+30,h+120,function(g,W,H){ var x0=15, bw=w, base=H-4;
  g.fillStyle='rgba(0,0,0,.25)'; g.fillRect(x0,base-6,bw,6);
  for(var p=0;p<5;p++){ g.fillStyle='#4a3424'; g.fillRect(x0+4+p*(bw-12)/4,base-18,5,18); }
  g.fillStyle='#8a6440'; g.fillRect(x0,base-22,bw,5);
  var wt=base-70; g.fillStyle='#8a6440'; g.fillRect(x0+4,wt,bw-8,48); g.fillStyle='rgba(0,0,0,.25)'; for(var py=wt+6;py<base-22;py+=7)g.fillRect(x0+4,py,bw-8,1.4);
  g.fillStyle='#1a2a3a'; g.beginPath(); g.moveTo(x0+bw/2-22,base-22); g.lineTo(x0+bw/2-22,wt+14); g.quadraticCurveTo(x0+bw/2,wt,x0+bw/2+22,wt+14); g.lineTo(x0+bw/2+22,base-22); g.fill();
  g.fillStyle='#6a4a2e'; g.beginPath(); g.moveTo(x0+bw/2-16,base-26); g.lineTo(x0+bw/2+16,base-26); g.lineTo(x0+bw/2+10,base-34); g.lineTo(x0+bw/2-10,base-34); g.fill();   // a boat inside
  var roof='#3f6a3a'; g.fillStyle=shade(roof,-0.1); g.beginPath(); g.moveTo(x0-8,wt+4); g.lineTo(x0+bw/2,wt-40); g.lineTo(x0+bw+8,wt+4); g.fill();
  g.fillStyle=rgba(shade(roof,-0.4),0.55); for(var ry=wt-30;ry<wt+4;ry+=7){ var t=(ry-(wt-40))/44; for(var sx=x0+bw/2-(bw/2+8)*t;sx<x0+bw/2+(bw/2+8)*t-4;sx+=10){ g.beginPath(); g.arc(sx+5,ry,5,0,Math.PI); g.fill(); } }
  drawRune(g,x0+bw/2,wt-14,8,'#6fe3f5',2); });
  addLight(c.m,x+w/2,y+h-60,60,'#ffd27a',0.3,{flicker:0.2}); };
WPROP.stilthouse=function(c,ctx,x,y,w,h,o){ var roof=o.roof||'#3f6a3a'; addSprite(c.m,x+w/2,y+h,w+40,h+170,function(g,W,H){ var x0=20, bw=w, base=H-6;
  for(var p=0;p<4;p++){ g.fillStyle='#3a2818'; g.fillRect(x0+6+p*(bw-18)/3,base-40,5,40); g.fillStyle='rgba(200,240,255,.35)'; g.fillRect(x0+4+p*(bw-18)/3,base-3,9,2); }
  g.fillStyle='#7a5a38'; g.fillRect(x0-6,base-46,bw+12,7); g.fillStyle='#5a3e24'; for(var r=x0-6;r<x0+bw+6;r+=8)g.fillRect(r,base-58,2,12); g.fillRect(x0-6,base-58,bw+12,2);
  var wt=base-100; g.fillStyle='#9a7248'; g.fillRect(x0+2,wt,bw-4,54); g.fillStyle='rgba(0,0,0,.2)'; for(var py=wt+6;py<base-46;py+=7)g.fillRect(x0+2,py,bw-4,1.4);
  [[x0+bw*0.25,wt+14],[x0+bw*0.75,wt+14]].forEach(function(q){ g.fillStyle='#3a2a1a'; g.fillRect(q[0]-8,q[1]-1,16,15); g.fillStyle='#ffd98a'; g.fillRect(q[0]-6,q[1]+1,12,11); });
  g.fillStyle='#2a1a10'; g.fillRect(x0+bw/2-7,base-72,14,26);
  g.fillStyle=shade(roof,-0.05); g.beginPath(); g.moveTo(x0-10,wt+6); g.lineTo(x0+10,wt-34); g.lineTo(x0+bw-10,wt-34); g.lineTo(x0+bw+10,wt+6); g.fill();
  g.fillStyle=rgba(shade(roof,-0.4),0.5); for(var ry=wt-28;ry<wt+6;ry+=7){ for(var sx=x0-6+((ry/7)%2)*5;sx<x0+bw+4;sx+=10){ g.beginPath(); g.arc(sx+5,ry,5,0,Math.PI); g.fill(); } }
  g.fillStyle='#6a625a'; g.fillRect(x0+bw*0.7,wt-46,9,20); });
  addLight(c.m,x+w/2,y+h-90,70,'#ffc870',0.35,{flicker:0.2});
  wParticlesAt(c,x+w*0.7-2,y+h-6-100-48,8,4,{tints:['#d8d4cc','#b8b4ac'],freq:300,vy:{min:-24,max:-10},vx:{min:4,max:10},scale:{start:0.6,end:2.2},alpha:{start:0.4,end:0},life:{min:2600,max:4000},blend:false,depth:6500}); };
WPROP.lighthouse=function(c,ctx,x,y,w,h,o){ addSprite(c.m,x+w/2,y+h,70,230,function(g,W,H){ var cx=W/2, base=H-6; softShadow(g,cx,base,22,6,0.35);
  var gr=g.createLinearGradient(cx-16,0,cx+16,0); gr.addColorStop(0,'#c8c0b0'); gr.addColorStop(0.5,'#f4ecdc'); gr.addColorStop(1,'#a8a090');
  g.fillStyle=gr; g.beginPath(); g.moveTo(cx-18,base); g.lineTo(cx-11,base-150); g.lineTo(cx+11,base-150); g.lineTo(cx+18,base); g.fill();
  g.fillStyle='#b84a3a'; [base-30,base-80,base-130].forEach(function(yy,i){ var t=(base-yy)/150, hw=18-7*t; g.fillRect(cx-hw,yy-10,hw*2,12); });
  g.fillStyle='#3a3a42'; g.fillRect(cx-15,base-156,30,6); g.fillStyle='#ffe08a'; g.fillRect(cx-9,base-178,18,22); g.fillStyle='#3a3a42'; g.beginPath(); g.moveTo(cx-13,base-178); g.lineTo(cx,base-196); g.lineTo(cx+13,base-178); g.fill();
  drawRune(g,cx,base-100,8,'#6fe3f5',4); });
  addLight(c.m,x+w/2,y+h-190,160,'#ffe8a0',0.5,{pulse:0.35,period:2600}); addLight(c.m,x+w/2,y+h-100,40,'#6fe3f5',0.3,{react:true,rune:true}); };
