// ═══════════════════════════════════════════════════════════════════════
// ║ WORLD MAP (Phase 3 · D1/D2) — the 1200 × 1200 island
// ║ No longer a circle cut in quarters: a rugged continent (bays, fjords,
// ║ capes, offshore islets) whose four regions are divided by natural
// ║ borders meeting at a central lake. Each border has THREE crossings
// ║ (lakeside, middle, coast) that open together when its craftsman is freed:
// ║   Grasslands↔Wetlands  Silverrun river   — Bram's bridges     (s1 tower)
// ║   Wetlands↔Highlands   the Great Scarp   — Mira's lifts       (s2 tower)
// ║   Highlands↔Ashlands   Cinder Chasm      — Dunn's iron bridges(s3 tower)
// ║   Ashlands↔Grasslands  Ember Wall ridge  — Vela's passes      (s4 tower)
// ║ Each region holds its 10 Lab designs as hand-placed sub-zones, plus
// ║ roads, rivers, sites, harbors and rune waystones (fast travel).
// ║ Shared by the game (world generation) and the Design Lab (Map tab).
// ═══════════════════════════════════════════════════════════════════════
var WMAP_W=1200, WMAP_H=1200, WMAP_CX=600, WMAP_CY=600;
// terrain classes in the map grid
var WM={OCEAN:0,SHALLOW:1,BEACH:2,LAND:3,LAKE:4,RIVER:5,CLIFF:6,CHASM:7,RIDGE:8,ROAD:9,BRIDGE:10,VILLAGE:11,PEAK:12,GATE:13};
var WM_REGION_NAMES={0:'Village & Mirror Lake',1:'Grasslands',2:'Wetlands',3:'Highlands',4:'Ashlands'};
// Hand-placed sub-zones: every Lab design has a home (x,y = zone heart)
var WMAP_ZONES=[
  // Grasslands (NE)
  {id:'waystone_road',r:1,x:720,y:410},{id:'fairy_rings',r:1,x:840,y:450},{id:'firefly_river',r:1,x:960,y:540},
  {id:'windmill_hills',r:1,x:770,y:290},{id:'standing_stones',r:1,x:930,y:330},{id:'giant_bones',r:1,x:1070,y:440},
  {id:'blossom_terraces',r:1,x:700,y:160},{id:'amphitheatre',r:1,x:870,y:170},{id:'crystal_grass',r:1,x:1070,y:290},{id:'floating_rocks',r:1,x:1030,y:140},
  // Wetlands (SE)
  {id:'lantern_lilies',r:2,x:740,y:720},{id:'rune_stepping',r:2,x:1040,y:690},{id:'sunken_spires',r:2,x:900,y:770},
  {id:'glowfrog_pools',r:2,x:700,y:880},{id:'willow_cathedral',r:2,x:830,y:900},{id:'glow_mangroves',r:2,x:1060,y:860},
  {id:'wisp_cattails',r:2,x:700,y:1040},{id:'turtle_isles',r:2,x:830,y:1090},{id:'drowned_village',r:2,x:960,y:1010},{id:'stilt_walkways',r:2,x:1080,y:1010},
  // Highlands (SW)
  {id:'dwarven_stairs',r:3,x:500,y:720},{id:'golem_graveyard',r:3,x:350,y:700},{id:'runic_mesas',r:3,x:180,y:760},
  {id:'petrified_forest',r:3,x:390,y:840},{id:'herder_terraces',r:3,x:530,y:900},{id:'windharp_ridges',r:3,x:170,y:930},
  {id:'geode_canyons',r:3,x:300,y:960},{id:'glacier_peaks',r:3,x:480,y:1060},{id:'giants_chessboard',r:3,x:320,y:1090},{id:'starfall_crater',r:3,x:150,y:1080},
  // Ashlands (NW)
  {id:'emberflower_fields',r:4,x:430,y:510},{id:'burned_cathedral',r:4,x:520,y:420},{id:'obsidian_glass',r:4,x:300,y:470},
  {id:'sulfur_geysers',r:4,x:140,y:480},{id:'forge_ruins',r:4,x:360,y:320},{id:'ashsnow_forest',r:4,x:500,y:280},
  {id:'magma_channels',r:4,x:200,y:350},{id:'basalt_forest',r:4,x:450,y:170},{id:'dragon_valley',r:4,x:290,y:210},{id:'chained_rocks',r:4,x:150,y:230}
];
// Which zone each site lives in (tower/dungeon sites by design id; camp/skyport/harbor per region)
var WMAP_SITE_ZONE={
  silverwood:'blossom_terraces', sunken_courtyard:'amphitheatre', elven_library:'standing_stones', hyrule_keep:'windmill_hills', mushroom_forest:'fairy_rings',
  frost_cathedral:'willow_cathedral', lake_ring:'rune_stepping', moonglass:'lantern_lilies', crystal_grotto:'sunken_spires', root_hollow:'glow_mangroves',
  observatory:'starfall_crater', bone_pit:'golem_graveyard', sky_cloister:'windharp_ridges', rivendell:'herder_terraces', pillared_hall:'dwarven_stairs',
  dawn_sanctum:'burned_cathedral', lava_archipelago:'chained_rocks', reflecting_hall:'obsidian_glass', boulder_field:'basalt_forest', spiral_chasm:'dragon_valley',
  camp1:'firefly_river', skyport1:'floating_rocks', harbor1:'giant_bones',
  camp2:'glowfrog_pools', skyport2:'wisp_cattails', harbor2:'stilt_walkways',
  camp3:'petrified_forest', skyport3:'glacier_peaks', harbor3:'runic_mesas',
  camp4:'emberflower_fields', skyport4:'ashsnow_forest', harbor4:'sulfur_geysers'
};
// Rune waystones (fast travel): village + 4 per region, placed in these zones
var WMAP_WAYSTONE_ZONES={1:['waystone_road','firefly_river','amphitheatre','giant_bones'],2:['lantern_lilies','sunken_spires','wisp_cattails','glow_mangroves'],
  3:['dwarven_stairs','runic_mesas','geode_canyons','glacier_peaks'],4:['emberflower_fields','forge_ruins','sulfur_geysers','dragon_valley']};
// Endgame volcano islands stay offshore (raised when the final quest starts)
var WMAP_VOLCANOES=[{id:'volcano_main',type:'volcano_main',section:3,x:60,y:1160},{id:'volcano_n',type:'volcano_mini',section:1,x:1170,y:40},
  {id:'volcano_e',type:'volcano_mini',section:2,x:1170,y:1170},{id:'volcano_s',type:'volcano_mini',section:3,x:30,y:860},{id:'volcano_w',type:'volcano_mini',section:4,x:30,y:30}];

// The four borders and their three crossings each (lakeside → coast).
// arm: which border arm (E river, S cliff, W chasm, N ridge); dir: 'v' = cross
// north/south, 'h' = cross east/west. sides: [region before, region after] along dir.
var WMAP_BORDERS=[
  {id:'silverrun',name:'Silverrun',   arm:'E',dir:'v',sides:[1,2],craftsman:1,kind:'bridge',icon:'🔨',names:['Lakeside Bridge','Millrace Bridge','Estuary Bridge']},
  {id:'scarp',    name:'Great Scarp', arm:'S',dir:'h',sides:[3,2],craftsman:2,kind:'lift',  icon:'⚙️',names:['Lakeside Lift','Scarp Lift','Seacliff Lift']},
  {id:'chasm',    name:'Cinder Chasm',arm:'W',dir:'v',sides:[4,3],craftsman:3,kind:'iron',  icon:'⚒️',names:['Lakeside Iron Bridge','Chasm Iron Bridge','Cape Iron Bridge']},
  {id:'ember',    name:'Ember Wall',  arm:'N',dir:'h',sides:[4,1],craftsman:4,kind:'pass',  icon:'🧭',names:['Lakeside Pass','Ember Pass','Northcoast Pass']}
];
var WMAP_GATE_T=[0.16,0.5,0.82];
var WMAP_STAMP_R=30;   // radius (tiles) of the zone's Lab sample stamped at its heart   // where along each arm the crossings sit
function buildWorldMap(seed){
  seed=seed||12345;
  WMAP_ZONES.forEach(function(z){ if(z.x0===undefined){z.x0=z.x;z.y0=z.y;} z.x=z.x0; z.y=z.y0; });
  var W=WMAP_W, H=WMAP_H, N=W*H, CX=WMAP_CX, CY=WMAP_CY;
  var n1=vnoise(seed+11), n2=vnoise(seed+23), n3=vnoise(seed+37), n4=vnoise(seed+51), n5=vnoise(seed+67), R=rngOf(seed*3+1);
  var fbm=function(x,y){ return n1(x/280,y/280)*0.46+n2(x/120,y/120)*0.28+n3(x/48,y/48)*0.16+n4(x/17,y/17)*0.10; };
  // meandering border arms (offsets from the axes)
  var mE=function(x){ return (n5(x/85,1.7)-0.5)*90; }, mW=function(x){ return (n5(x/85,7.3)-0.5)*90; };
  var mN=function(y){ return (n5(4.1,y/85)-0.5)*90; }, mS=function(y){ return (n5(9.9,y/85)-0.5)*90; };
  var armX=function(y){ return CX+(y<CY?mN(y):mS(y)); }, armY=function(x){ return CY+(x>CX?mE(x):mW(x)); };
  // coastline shaping: bays eat in, capes push out, fjords cut narrow inlets
  var bays=[[1010,1100,120,0.6],[1160,700,95,0.55],[60,630,90,0.55],[330,30,80,0.42],[660,1170,85,0.5],[1180,420,70,0.45],[40,300,80,0.5],[560,30,60,0.45],[880,1180,60,0.4],[1180,860,60,0.35],[780,40,70,0.4],[200,1180,70,0.4]];
  var capes=[[1140,220,110,0.4],[110,1030,95,0.35],[250,90,80,0.3],[1110,1110,75,0.25],[980,90,60,0.25]];
  var fjords=[[90,430,170,16,0.25],[150,90,90,12,-0.9],[1110,560,130,13,0.1],[130,760,110,12,-0.15],[460,60,110,11,1.35]];
  WMAP_VOLCANOES.forEach(function(v){ bays.push([v.x,v.y,70,1.1]); });
  var gauss=function(x,y,cx,cy,r){ var d2=((x-cx)*(x-cx)+(y-cy)*(y-cy))/(r*r); return d2>9?0:Math.exp(-d2); };
  var cls=new Uint8Array(N), region=new Uint8Array(N), zone=new Uint8Array(N).fill(255), height=new Float32Array(N), coastDist=new Float32Array(N);
  // ── 1. land & sea ──
  for(var y=0;y<H;y++)for(var x=0;x<W;x++){
    var dx=(x-CX)/520, dy=(y-CY)/520, d=Math.pow(Math.pow(Math.abs(dx),2.3)+Math.pow(Math.abs(dy),2.3),1/2.3);
    var rug=(x>CX&&y>CY)?1.35:(x<CX&&y<CY)?1.2:1.0;  // wetlands & ashlands coasts are the most broken
    var f=1-d+(fbm(x,y)-0.5)*1.05*rug;
    var edge=Math.min(x,y,W-1-x,H-1-y); if(edge<60)f-=(60-edge)/60*0.6;
    for(var b=0;b<bays.length;b++){ var q=bays[b]; if(Math.abs(x-q[0])<q[2]*3&&Math.abs(y-q[1])<q[2]*3)f-=gauss(x,y,q[0],q[1],q[2])*q[3]; }
    for(var p=0;p<capes.length;p++){ var q2=capes[p]; if(Math.abs(x-q2[0])<q2[2]*3&&Math.abs(y-q2[1])<q2[2]*3)f+=gauss(x,y,q2[0],q2[1],q2[2])*q2[3]; }
    for(var fj=0;fj<fjords.length;fj++){ var F=fjords[fj], ca=Math.cos(F[4]), sa=Math.sin(F[4]), lx=(x-F[0])*ca+(y-F[1])*sa, ly=-(x-F[0])*sa+(y-F[1])*ca; if(Math.abs(lx)<F[2]*1.2&&Math.abs(ly)<F[3]*3)f-=Math.exp(-(lx*lx)/(F[2]*F[2])-(ly*ly)/(F[3]*F[3]))*0.6; }
    // offshore islets
    if(f<0&&f>-0.22&&n4(x/9+50,y/9+50)>0.83)f=0.02;
    var i=y*W+x; height[i]=f; cls[i]=f>0?WM.LAND:(f>-0.06?WM.SHALLOW:WM.OCEAN);
  }
  // beaches: land next to shallow/ocean
  for(var y2=1;y2<H-1;y2++)for(var x2=1;x2<W-1;x2++){ var i2=y2*W+x2; if(cls[i2]!==WM.LAND)continue; if(cls[i2-1]<WM.BEACH||cls[i2+1]<WM.BEACH||cls[i2-W]<WM.BEACH||cls[i2+W]<WM.BEACH)cls[i2]=WM.BEACH; }
  // ── 2. regions (warped quadrants) ──
  for(var y3=0;y3<H;y3++){ var ax=armX(y3); for(var x3=0;x3<W;x3++){ var ay=armY(x3), east=x3>=ax, north=y3<ay; region[y3*W+x3]=east?(north?1:2):(north?4:3); } }
  // ── 3. central Mirror Lake + the four border arms ──
  var lakeR=function(x,y){ return 52+(n3(x/20,y/20)-0.5)*22; };
  for(var y4=CY-90;y4<CY+90;y4++)for(var x4=CX-90;x4<CX+90;x4++){ var dd=Math.hypot(x4-CX,y4-CY); if(dd<lakeR(x4,y4)){ cls[y4*W+x4]=WM.LAKE; region[y4*W+x4]=0; } }
  var paint=function(x,y,r,c,onlyLand){ for(var yy=Math.floor(y-r);yy<=y+r;yy++)for(var xx=Math.floor(x-r);xx<=x+r;xx++){ if(xx<0||yy<0||xx>=W||yy>=H)continue; if((xx-x)*(xx-x)+(yy-y)*(yy-y)>r*r)continue; var k=yy*W+xx; if(onlyLand&&(cls[k]===WM.OCEAN))continue; if(cls[k]===WM.LAKE&&c!==WM.LAKE)continue; cls[k]=c; } };
  var armEnd={};
  for(var x5=CX+40;x5<W;x5++){ var yy5=armY(x5), c5=cls[Math.round(yy5)*W+x5]; if(c5===WM.OCEAN||c5===WM.SHALLOW)break; paint(x5,yy5,4+n2(x5/30,0)*3,WM.RIVER,true); armEnd.E=x5; }       // east: Silverrun river
  for(var y6=CY+40;y6<H;y6++){ var xx6=armX(y6), c6=cls[y6*W+Math.round(xx6)]; if(c6===WM.OCEAN||c6===WM.SHALLOW)break; paint(xx6,y6,2.5,WM.CLIFF,true); armEnd.S=y6; }                     // south: Great Scarp
  for(var x7=CX-40;x7>=0;x7--){ var yy7=armY(x7), c7=cls[Math.round(yy7)*W+x7]; if(c7===WM.OCEAN||c7===WM.SHALLOW)break; paint(x7,yy7,4+n2(x7/30,5)*2.5,WM.CHASM,true); armEnd.W=x7; }  // west: Cinder Chasm
  for(var y8=CY-40;y8>=0;y8--){ var xx8=armX(y8), c8=cls[y8*W+Math.round(xx8)]; if(c8===WM.OCEAN||c8===WM.SHALLOW)break; paint(xx8,y8,6+n2(3,y8/30)*4,WM.RIDGE,true); armEnd.N=y8; }     // north: Ember Wall
  // ── 4. village on the Grasslands shore of the lake ──
  var village={x:690,y:520,r:30};
  for(var y9=village.y-village.r;y9<=village.y+village.r;y9++)for(var x9=village.x-village.r;x9<=village.x+village.r;x9++){ if(Math.hypot(x9-village.x,y9-village.y)<=village.r){ var k9=y9*W+x9; cls[k9]=WM.VILLAGE; region[k9]=0; } }
  // harbour bay: Mirror Lake reaches into the village's south-west quarter (07l VR_BAY)
  if(typeof VR_BAY==='function')for(var yb=village.y-8;yb<=village.y+50;yb++)for(var xb=village.x-60;xb<=village.x+4;xb++){ if(!VR_BAY(xb-village.x,yb-village.y))continue; var kb=yb*W+xb; if(cls[kb]===WM.RIDGE||cls[kb]===WM.RIVER||cls[kb]===WM.CLIFF)continue; cls[kb]=WM.LAKE; region[kb]=0; }
  // ── 5. relief: mountains & inner lakes & rivers, by region ──
  var mtn=vnoise(seed+91);
  for(var y10=0;y10<H;y10++)for(var x10=0;x10<W;x10++){ var i10=y10*W+x10; if(cls[i10]!==WM.LAND)continue; var rg=region[i10], m=mtn(x10/38,y10/38);
    var thr=rg===3?0.80:rg===4?0.82:rg===1?0.9:0.93; if(m>thr&&Math.hypot(x10-village.x,y10-village.y)>60)cls[i10]=WM.PEAK;
    if(rg===2&&n5(x10/26+30,y10/26+30)>0.76)cls[i10]=WM.LAKE; }
  var rivers=[[[470,1040],[430,1110],[380,1180]],[[900,150],[930,80],[950,0]],[[180,760],[110,730],[20,720]],[[830,900],[900,950],[960,1010]]];
  rivers.forEach(function(rv){ for(var s=0;s<rv.length-1;s++){ var a=rv[s],bb=rv[s+1],L=Math.hypot(bb[0]-a[0],bb[1]-a[1]); for(var u=0;u<=L;u++){ var tt=u/L, px=a[0]+(bb[0]-a[0])*tt+(n2(u/40,s)-0.5)*30, py=a[1]+(bb[1]-a[1])*tt+(n3(u/40,s)-0.5)*30; paint(px,py,2.2,WM.RIVER,true); } } });
  // hearts that fell in water move inland toward the lake
  WMAP_ZONES.forEach(function(z){ for(var s2=0;s2<80;s2++){ var c2=cls[Math.round(z.y)*W+Math.round(z.x)]; if(c2===WM.LAND||c2===WM.BEACH||c2===WM.PEAK)break; var a2=Math.atan2(CY-z.y,CX-z.x); z.x=Math.round(z.x+Math.cos(a2)*4); z.y=Math.round(z.y+Math.sin(a2)*4); } });
  // Lloyd relaxation (3 passes on a coarse grid): hearts drift to the middle of
  // their land so zone sizes even out while keeping the hand-placed arrangement.
  (function(){ var ST=6; for(var it=0;it<3;it++){ var acc={}; WMAP_ZONES.forEach(function(z,zi){ acc[zi]=[0,0,0]; });
      for(var y=0;y<H;y+=ST)for(var x=0;x<W;x+=ST){ var k=y*W+x, rg=region[k], c=cls[k]; if(!rg||!(c===WM.LAND||c===WM.BEACH||c===WM.PEAK))continue; var best=-1,bd=1e18;
        WMAP_ZONES.forEach(function(z,zi){ if(z.r!==rg)return; var dz=(z.x-x)*(z.x-x)+(z.y-y)*(z.y-y); if(dz<bd){bd=dz;best=zi;} }); if(best>=0){ acc[best][0]+=x; acc[best][1]+=y; acc[best][2]++; } }
      WMAP_ZONES.forEach(function(z,zi){ var a=acc[zi]; if(a[2]>20){ z.x=Math.round(z.x*0.4+a[0]/a[2]*0.6); z.y=Math.round(z.y*0.4+a[1]/a[2]*0.6); } }); } })();
  // ── 6. zones: nearest heart within the region (noise-warped → organic borders) ──
  var zr={1:[],2:[],3:[],4:[]}; WMAP_ZONES.forEach(function(z,zi){ z.idx=zi; zr[z.r].push(z); });
  for(var y11=0;y11<H;y11++)for(var x11=0;x11<W;x11++){ var i11=y11*W+x11, rg2=region[i11]; if(!rg2||cls[i11]===WM.OCEAN)continue;
    var wx=x11+(n1(x11/60,y11/60)-0.5)*80, wy=y11+(n2(x11/60+9,y11/60+9)-0.5)*80, best=255, bd=1e18;
    var zs=zr[rg2]; for(var zz=0;zz<zs.length;zz++){ var dz=(zs[zz].x-wx)*(zs[zz].x-wx)+(zs[zz].y-wy)*(zs[zz].y-wy); if(dz<bd){bd=dz;best=zs[zz].idx;} } zone[i11]=best; }
  // ── 7. gates: three crossings per border (lakeside, middle, coast) ──
  // Each spot is nudged along the arm until solid land waits on both banks.
  var gates=[], landish=function(c){ return c===WM.LAND||c===WM.BEACH; };
  var gatePos=function(B,p){ return B.dir==='v'?{x:p,y:Math.round(armY(p))}:{x:Math.round(armX(p)),y:p}; };
  var bankOk=function(B,g){ for(var sd=-1;sd<=1;sd+=2)for(var d=14;d<=22;d++)for(var w=-2;w<=2;w++){ var gx=B.dir==='v'?g.x+w:g.x+sd*d, gy=B.dir==='v'?g.y+sd*d:g.y+w; if(gx<0||gy<0||gx>=W||gy>=H)return false; var k=gy*W+gx; if(!landish(cls[k]))return false; if(region[k]!==B.sides[sd<0?0:1])return false; } return true; };
  WMAP_BORDERS.forEach(function(B){
    var start=B.arm==='E'?CX+40:B.arm==='W'?CX-40:B.arm==='S'?CY+40:CY-40, end=armEnd[B.arm], L=end-start;
    WMAP_GATE_T.forEach(function(t,gi){
      var base=Math.round(start+L*t), best=null;
      for(var off=0;off<120&&!best;off+=2)for(var sg=-1;sg<=1&&!best;sg+=2){ var p=base+sg*off; if((p-start)*(end-p)<=0)continue; var g=gatePos(B,p); if(bankOk(B,g))best=g; }
      if(!best)best=gatePos(B,base);
      gates.push({id:'gate_'+B.id+'_'+(gi+1),border:B.id,borderName:B.name,name:B.names[gi],icon:B.icon,kind:B.kind,x:best.x,y:best.y,dir:B.dir,
        from:B.sides[0],to:B.sides[1],craftsman:B.craftsman,idx:gi});
    });
  });
  var gateAt=new Uint8Array(N);   // gate index+1 on every crossing cell
  gates.forEach(function(g,gi){ g.cells=[]; for(var d=-13;d<=13;d++)for(var w=-2;w<=2;w++){ var gx=g.dir==='v'?g.x+w:g.x+d, gy=g.dir==='v'?g.y+d:g.y+w; if(gx<0||gy<0||gx>=W||gy>=H)continue; var k=gy*W+gx; if(cls[k]===WM.RIVER||cls[k]===WM.CLIFF||cls[k]===WM.CHASM||cls[k]===WM.RIDGE){ g.cells.push([k,cls[k]]); cls[k]=WM.GATE; gateAt[k]=gi+1; } } });
  // ── 8. roads: village → zones of each region (via the gates) ──
  var roadPts=[];   // road centre-line samples (smooth roads when painted)
  var road=function(a,b,rg){ var L=Math.hypot(b[0]-a[0],b[1]-a[1]); for(var u=0;u<=L;u+=0.5){ var tt=u/L, px=a[0]+(b[0]-a[0])*tt+Math.sin(tt*Math.PI)*(n3(a[0]/50+u/60,a[1]/50)-0.5)*40, py=a[1]+(b[1]-a[1])*tt+Math.sin(tt*Math.PI)*(n4(a[1]/50+u/60,a[0]/50)-0.5)*40; roadPts.push(px+0.5,py+0.5);
      for(var yy=Math.floor(py-1.5);yy<=py+1.5;yy++)for(var xx=Math.floor(px-1.5);xx<=px+1.5;xx++){ if(xx<0||yy<0||xx>=W||yy>=H)continue; var k=yy*W+xx, c=cls[k]; if(rg&&region[k]!==rg&&c!==WM.VILLAGE)continue;
        if(c===WM.LAND||c===WM.BEACH||c===WM.PEAK)cls[k]=WM.ROAD; else if(c===WM.RIVER||c===WM.LAKE||c===WM.SHALLOW||c===WM.OCEAN)cls[k]=WM.BRIDGE; } } };
  var mst=function(pts,rg){ var inT=[0], edges=[]; while(inT.length<pts.length){ var best=null,bd=1e18; inT.forEach(function(a){ pts.forEach(function(p,j){ if(inT.indexOf(j)>=0)return; var d=Math.hypot(p[0]-pts[a][0],p[1]-pts[a][1]); if(d<bd){bd=d;best=[a,j];} }); }); inT.push(best[1]); edges.push(best); } edges.forEach(function(e){ road(pts[e[0]],pts[e[1]],rg); }); };
  // a point 16 tiles onto the bank of region r
  var gateSide=function(g,r){ var side=(r===g.from)?-1:1; return g.dir==='v'?[g.x,g.y+side*16]:[g.x+side*16,g.y]; };
  var hearts=function(r){ return zr[r].map(function(z){return [z.x,z.y];}); };
  var sidesOf=function(r){ return gates.filter(function(g){return g.from===r||g.to===r;}).map(function(g){ return gateSide(g,r); }); };
  mst([[village.x,village.y]].concat(sidesOf(1),hearts(1)),1);
  [2,3,4].forEach(function(r){ mst(sidesOf(r).concat(hearts(r)),r); });
  // ── 9. sites, harbors, waystones ──
  var zoneById={}; WMAP_ZONES.forEach(function(z){ zoneById[z.id]=z; });
  var reach=worldMapReach({W:W,H:H,cls:cls,village:village});
  // Each zone heart holds that zone's Lab sample (60×60, the landmark), so sites
  // and waystones go on a ring just outside it, in the direction of `off`.
  var nearOpen=function(x,y,off,minR){ minR=minR===undefined?WMAP_STAMP_R+6:minR; var a0=Math.atan2(off[1],off[0]), best=null;
    for(var rr=minR;rr<minR+60&&!best;rr+=3)for(var ai=0;ai<24&&!best;ai++){ var a=a0+(ai%2?1:-1)*Math.ceil(ai/2)*Math.PI/12, px=Math.round(x+Math.cos(a)*rr), py=Math.round(y+Math.sin(a)*rr);
      if(px<4||py<4||px>=W-4||py>=H-4)continue; var k0=py*W+px; if(!reach[k0]||zone[k0]!==zone[y*W+x])continue; var ok=true;
      for(var q=-2;q<=4&&ok;q++)for(var r=-2;r<=4;r++){ var c=cls[(py+q)*W+px+r]; if(c!==WM.LAND){ok=false;break;} } if(ok)best={x:px,y:py}; }
    if(!best)for(var rr2=minR;rr2<minR+60&&!best;rr2+=2)for(var a2=0;a2<32&&!best;a2++){ var px2=Math.round(x+Math.cos(a2/32*Math.PI*2)*rr2), py2=Math.round(y+Math.sin(a2/32*Math.PI*2)*rr2); if(px2<4||py2<4||px2>=W-4||py2>=H-4)continue; var k2=py2*W+px2; if(reach[k2]&&cls[k2]===WM.LAND)best={x:px2,y:py2}; }
    return best||{x:x,y:y}; };
  var sites=[];
  SITE_ROSTER&&[1,2,3,4].forEach(function(sec){ (SITE_ROSTER[sec]||[]).forEach(function(r){ var z=zoneById[WMAP_SITE_ZONE[r.design]]; if(!z)return; var p=nearOpen(z.x,z.y,[10,6]); sites.push({kind:r.kind,design:r.design,boss:!!r.boss,section:sec,x:p.x,y:p.y,zone:z.id}); });
    ['camp','skyport'].forEach(function(t){ var z=zoneById[WMAP_SITE_ZONE[t+sec]]; var p=nearOpen(z.x,z.y,[-12,8]); sites.push({kind:t,section:sec,x:p.x,y:p.y,zone:z.id}); });
    // harbor: walk from the zone heart outward (away from the lake) to the coast
    var hz=zoneById[WMAP_SITE_ZONE['harbor'+sec]], ang=Math.atan2(hz.y-CY,hz.x-CX), hx=hz.x, hy=hz.y, last=null;
    for(var st=0;st<400;st++){ hx+=Math.cos(ang); hy+=Math.sin(ang); var k=Math.round(hy)*W+Math.round(hx); if(k<0||k>=N)break; if(cls[k]===WM.OCEAN||cls[k]===WM.SHALLOW)break; if((cls[k]===WM.BEACH||cls[k]===WM.LAND)&&reach[k])last={x:Math.round(hx),y:Math.round(hy)}; }
    if(last)sites.push({kind:'harbor',section:sec,x:last.x,y:last.y,angle:ang,zone:hz.id}); });
  var waystones=[{id:'ws_village',name:'Village Waystone',region:0,x:village.x+4,y:village.y+3}];
  [1,2,3,4].forEach(function(r){ WMAP_WAYSTONE_ZONES[r].forEach(function(zid,i){ var z=zoneById[zid], p=nearOpen(z.x,z.y,[-6,-10]); waystones.push({id:'ws_'+zid,name:_wmZoneName(zid)+' Waystone',region:r,x:p.x,y:p.y,zone:zid}); }); });
  // coast distance (for ocean depth colouring) — cheap 2-pass chamfer
  for(var i12=0;i12<N;i12++)coastDist[i12]=(cls[i12]===WM.OCEAN||cls[i12]===WM.SHALLOW)?1e6:0;
  for(var y13=1;y13<H;y13++)for(var x13=1;x13<W;x13++){ var k13=y13*W+x13; coastDist[k13]=Math.min(coastDist[k13],coastDist[k13-1]+1,coastDist[k13-W]+1); }
  for(var y14=H-2;y14>=0;y14--)for(var x14=W-2;x14>=0;x14--){ var k14=y14*W+x14; coastDist[k14]=Math.min(coastDist[k14],coastDist[k14+1]+1,coastDist[k14+W]+1); }
  return {W:W,H:H,cls:cls,region:region,zone:zone,gateAt:gateAt,roadPts:roadPts,height:height,coastDist:coastDist,village:village,gates:gates,sites:sites,waystones:waystones,volcanoes:WMAP_VOLCANOES,zones:WMAP_ZONES,
    armX:armX, armY:armY};
}
function _wmZoneName(id){ if(typeof WORLD_DESIGNS!=='undefined'){ var d=WORLD_DESIGNS.find(function(z){return z.id===id;}); if(d)return d.name; } return id.replace(/_/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();}); }
// Walkability check used by tests / the Lab: flood fill from the village through
// open land, roads, bridges and gates (ignores region locks). openGate(g) → false
// keeps that crossing shut (default: all open).
function worldMapReach(M,openGate){ var W=M.W,H=M.H,cls=M.cls,seen=new Uint8Array(W*H),q=[M.village.y*W+M.village.x]; seen[q[0]]=1;
  var gOpen=M.gates?M.gates.map(function(g){ return !openGate||!!openGate(g); }):[];
  var walk=function(c,k){ if(c===WM.GATE)return !M.gateAt||!M.gateAt[k]||gOpen[M.gateAt[k]-1]; return c===WM.LAND||c===WM.BEACH||c===WM.ROAD||c===WM.BRIDGE||c===WM.VILLAGE; };
  for(var i=0;i<q.length;i++){ var k=q[i],x=k%W,y=(k/W)|0; if(x>0&&!seen[k-1]&&walk(cls[k-1],k-1)){seen[k-1]=1;q.push(k-1);} if(x<W-1&&!seen[k+1]&&walk(cls[k+1],k+1)){seen[k+1]=1;q.push(k+1);} if(y>0&&!seen[k-W]&&walk(cls[k-W],k-W)){seen[k-W]=1;q.push(k-W);} if(y<H-1&&!seen[k+W]&&walk(cls[k+W],k+W)){seen[k+W]=1;q.push(k+W);} }
  return seen; }
