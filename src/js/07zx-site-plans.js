// ═══════════════════════════════════════════════════════════════════════
// ║ 07zx-site-plans.js — ZSP: Kris's adventure-site picks, built for the game (round 45).
// ║ Kris (Oct 10): "picks are in for the adventure sites. … 1. There always needs to be a big enough space at the end of the adventure site for a
// ║ boss fight 2. … make sure that every single adventure site is a unique design type, and that we don't reuse designs for any of them. Variety is
// ║ key! stay creative even within the comments and picks i made". Painting: "let's do hybrid for all the adventure sites" (tile sets + big set-pieces).
// ║ Every one of the 53 sites has its OWN layout type (ZSP.T: name, idea, generator), grown from the family he picked in the Lab (ZSD, 07zw) and
// ║ from his notes on it. All of them share:
// ║   • 2–3× the old size; you arrive above where you left the floor below, the way on is far away (ZSD.landing / stairs)
// ║   • the last floor ends in a guardian's arena — a big open room around the boss (ZSP.arena)
// ║   • mazes have at least two routes, and some sites hide doors: a wall with a hairline crack and a faint draft. Bump into it for a moment,
// ║     or strike it, and it opens (12-scene-dungeon: _zspSecrets). Behind them: shortcuts and small treasure rooms.
// ║ Tiles: 0 void · 1 floor · 2 wall · 3 water / lava / chasm · 4 bridge · 5 second floor (carpet, moss, ice, courtyard) · 6 pillar / rock / hedge ·
// ║ 7 hidden door. The painter (ZSP.paint) turns a floor into the map model every site scene already uses (07-site-art newMap).
// ═══════════════════════════════════════════════════════════════════════
var ZSP={
  // Kris's picks (Lab DB asites-*, Oct 10): site → option (its family and colours in ZSD)
  PICK:{silverwood:0,sunken_courtyard:1,elven_library:1,hyrule_keep:0,mushroom_forest:1,frost_cathedral:2,lake_ring:1,moonglass:0,crystal_grotto:2,root_hollow:1,
    observatory:0,bone_pit:0,sky_cloister:2,rivendell:1,pillared_hall:1,dawn_sanctum:2,lava_archipelago:1,reflecting_hall:2,boulder_field:1,spiral_chasm:2,
    mage_rime_spire:1,mage_scriptorium:0,mage_hearthfire:2,mage_rootspire:2,mage_conductor:1,mage_frozen_belfry:2,mage_mire_tower:2,mage_drowned_lighthouse:2,
    mage_ember_observatory:2,mage_hollow_spire:0,mage_lightning_rod:2,mage_monolith:1,mage_frostbitten_crown:1,mage_rift_tower:2,mage_crimson_spire:1,mage_astral_spire:2,
    castle_q1_b:0,castle_q1_c:0,castle_q1_d:2,castle_q2_b:0,castle_q2_c:2,castle_q2_d:0,castle_q3_b:2,castle_q3_c:0,castle_q3_d:2,castle_q4_b:1,castle_q4_c:1,castle_q4_d:2,
    isle_1:0,isle_2:0,isle_3:2,isle_4:1,ember_cave:0},
  on:true,
  // ── the game's site → its design id ──
  idOf:function(site,floor){ if(!site)return null; if(site.mage)return 'mage_'+site.mage; if(site.castle)return 'castle_'+site.castle;
    var m=/^isl_adv_(\d)/.exec(site.id||''); if(m){ var q=+m[1]; if(q===3)return floor<2?'ember_cave':'isle_3'; return 'isle_'+q; }      // Ember Isle: the Ember Cave above, the Ember Crypt below
    return ZSP.T[site.design]?site.design:null; },
  zsdSite:function(id){ return ZSD.sites().filter(function(s){ return s.id===id; })[0]||null; },
  // ── a floor-building kit ──
  kit:function(W,H,R){ var g=new Uint8Array(W*H), c={W:W,H:H,g:g,R:R,cx:W/2,cy:H/2,hints:{}};
    c.I=function(x,y){ return y*W+x; }; c.inb=function(x,y){ return x>0&&y>0&&x<W-1&&y<H-1; }; c.get=function(x,y){ return (x<0||y<0||x>=W||y>=H)?0:g[y*W+x]; };
    c.set=function(x,y,v,only){ x=Math.round(x); y=Math.round(y); if(c.inb(x,y)&&(only===undefined||g[y*W+x]===only))g[y*W+x]=v; };
    c.fill=function(v){ g.fill(v); };
    c.rect=function(x,y,w,h,v,only){ x=Math.round(x); y=Math.round(y); for(var j=y;j<y+h;j++)for(var i=x;i<x+w;i++)c.set(i,j,v,only); };
    c.box=function(x,y,w,h,inV){ c.rect(x,y,w,h,2); c.rect(x+1,y+1,w-2,h-2,inV===undefined?1:inV); };
    c.ell=function(cx,cy,rx,ry,v,only){ for(var j=Math.floor(cy-ry-1);j<=cy+ry+1;j++)for(var i=Math.floor(cx-rx-1);i<=cx+rx+1;i++){ var dx=(i+0.5-cx)/rx, dy=(j+0.5-cy)/ry; if(dx*dx+dy*dy<=1)c.set(i,j,v,only); } };
    c.disc=function(cx,cy,r,v,only){ c.ell(cx,cy,r,r,v,only); };
    c.room=function(cx,cy,r,inV){ c.disc(cx,cy,r,2); c.disc(cx,cy,r-1,inV===undefined?1:inV); };
    c.ring=function(cx,cy,rx,ry,th,v){ for(var j=Math.floor(cy-ry-1);j<=cy+ry+1;j++)for(var i=Math.floor(cx-rx-1);i<=cx+rx+1;i++){ var dx=(i+0.5-cx)/rx, dy=(j+0.5-cy)/ry, d=Math.sqrt(dx*dx+dy*dy), dr=(1-d)*Math.min(rx,ry); if(dr>=0&&dr<th)c.set(i,j,v); } };
    c.line=function(x0,y0,x1,y1,wd,v,only){ var n=Math.ceil(Math.hypot(x1-x0,y1-y0)*2)+1; for(var k=0;k<=n;k++){ var x=x0+(x1-x0)*k/n, y=y0+(y1-y0)*k/n, o=Math.floor(wd/2);
      for(var j=0;j<wd;j++)for(var i=0;i<wd;i++)c.set(Math.floor(x)-o+i,Math.floor(y)-o+j,v,only); } };
    c.path=function(P,wd,v,only){ for(var i=1;i<P.length;i++)c.line(P[i-1][0],P[i-1][1],P[i][0],P[i][1],wd,v,only); };
    c.wiggle=function(x0,y0,x1,y1,wd,v,amp,only){ var n=Math.max(2,Math.round(Math.hypot(x1-x0,y1-y0)/4)), P=[], nx=-(y1-y0), ny=x1-x0, nl=Math.hypot(nx,ny)||1, ph=R.f()*6;
      for(var k=0;k<=n;k++){ var t=k/n, s=Math.sin(t*Math.PI)*Math.sin(t*6+ph)*(amp||2); P.push([x0+(x1-x0)*t+nx/nl*s,y0+(y1-y0)*t+ny/nl*s]); } c.path(P,wd,v,only); };
    // rooms: split a rectangle (already wall) into rooms one wall apart
    c.bsp=function(x,y,w,h,min,out){ if((w<min*2+1&&h<min*2+1)||(w*h<min*min*3&&R.chance(0.5))){ out.push([x,y,w,h]); return; } var vert=w>h*1.2?true:h>w*1.2?false:R.chance(0.5);
      if(vert&&w>=min*2+1){ var s=R.i(min,w-min-1); c.bsp(x,y,s,h,min,out); c.bsp(x+s+1,y,w-s-1,h,min,out); } else if(!vert&&h>=min*2+1){ var t=R.i(min,h-min-1); c.bsp(x,y,w,t,min,out); c.bsp(x,y+t+1,w,h-t-1,min,out); } else out.push([x,y,w,h]); };
    c.rooms=function(x,y,w,h,min,p5,mask){ var L=[]; c.bsp(x,y,w,h,min,L); L.forEach(function(r){ var v=R.chance(p5||0)?5:1; for(var j=r[1];j<r[1]+r[3];j++)for(var i=r[0];i<r[0]+r[2];i++)if(!mask||mask(i,j))c.set(i,j,v); }); return L; };
    c.walk=function(v){ return v===1||v===4||v===5; };
    // doors: a wall tile with walkable ground on two opposite sides opens (rate: share of candidates)
    c.doors=function(rate,v){ for(var k=0;k<W*H*(rate||0.04);k++){ var x=R.i(2,W-3), y=R.i(2,H-3); if(g[c.I(x,y)]!==2)continue; var a=c.walk(c.get(x-1,y))&&c.walk(c.get(x+1,y)), b=c.walk(c.get(x,y-1))&&c.walk(c.get(x,y+1)); if(a||b)g[c.I(x,y)]=v||1; } };
    // a maze in a rectangle: cells cw wide, walls ww thick; loops = share of extra openings (Kris: "at least 2 solutions")
    c.maze=function(x0,y0,w,h,cw,ww,loops,v){ var cs=cw+ww, gw=Math.floor((w-ww)/cs), gh=Math.floor((h-ww)/cs); if(gw<2||gh<2)return; c.rect(x0,y0,w,h,2); var seen=new Uint8Array(gw*gh), st=[[R.i(0,gw-1),R.i(0,gh-1)]];
      var cell=function(i,j){ c.rect(x0+ww+i*cs,y0+ww+j*cs,cw,cw,v||1); }, open=function(i,j,di,dj){ if(di)c.rect(x0+ww+Math.min(i,i+di)*cs+cw,y0+ww+j*cs,ww,cw,v||1); else c.rect(x0+ww+i*cs,y0+ww+Math.min(j,j+dj)*cs+cw,cw,ww,v||1); };
      seen[st[0][1]*gw+st[0][0]]=1; cell(st[0][0],st[0][1]);
      while(st.length){ var q=st[st.length-1], nb=[[1,0],[-1,0],[0,1],[0,-1]].filter(function(d){ var i=q[0]+d[0], j=q[1]+d[1]; return i>=0&&j>=0&&i<gw&&j<gh&&!seen[j*gw+i]; }); if(!nb.length){ st.pop(); continue; }
        var d=nb[R.i(0,nb.length-1)], ni=q[0]+d[0], nj=q[1]+d[1]; seen[nj*gw+ni]=1; cell(ni,nj); open(q[0],q[1],d[0],d[1]); st.push([ni,nj]); }
      for(var k=0;k<gw*gh*(loops||0.08);k++){ var i=R.i(0,gw-2), j=R.i(0,gh-2); if(R.chance(0.5))open(i,j,1,0); else open(i,j,0,1); }
      return {gw:gw,gh:gh,cs:cs,x0:x0+ww,y0:y0+ww}; };
    c.cave=function(x0,y0,w,h,p,iters,v){ var tmp=new Uint8Array(w*h); for(var i=0;i<w*h;i++)tmp[i]=R.chance(p||0.46)?1:0;
      for(var it=0;it<(iters||5);it++){ var n2=new Uint8Array(w*h); for(var y=0;y<h;y++)for(var x=0;x<w;x++){ var wc=0; for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){ var xx=x+dx, yy=y+dy; if(xx<0||yy<0||xx>=w||yy>=h||tmp[yy*w+xx])wc++; } n2[y*w+x]=wc>=5?1:0; } tmp=n2; }
      for(var y2=0;y2<h;y2++)for(var x2=0;x2<w;x2++)c.set(x0+x2,y0+y2,tmp[y2*w+x2]?2:(v||1)); };
    c.scatter=function(v,n,only,min){ for(var k=0;k<n;k++){ var x=R.i(2,W-3), y=R.i(2,H-3); if(g[c.I(x,y)]!==(only===undefined?1:only))continue; if(min){ var ok=true; for(var j=-1;j<=1;j++)for(var i=-1;i<=1;i++)if(!c.walk(c.get(x+i,y+j)))ok=false; if(!ok)continue; } g[c.I(x,y)]=v; } };
    // a star with n points (radius r, inner r2) as corridors wd wide from the middle to each tip, a sanctum at each tip
    c.star=function(cx,cy,n,r,wd,rot,tip){ c.room(cx,cy,Math.max(3.5,r*0.28),5); for(var p=0;p<n;p++){ var a=(rot||-Math.PI/2)+p*Math.PI*2/n, ex=cx+Math.cos(a)*r, ey=cy+Math.sin(a)*r; c.line(cx,cy,ex,ey,wd+2,2,0); c.line(cx,cy,ex,ey,wd,1); c.room(ex,ey,tip||3.2,R.chance(0.4)?5:1); } };
    c.diamond=function(cx,cy,r,v){ for(var j=-r;j<=r;j++)for(var i=-r;i<=r;i++){ var d=Math.abs(i)+Math.abs(j), X=Math.round(cx+i), Y=Math.round(cy+j); if(d<r)c.set(X,Y,v===undefined?1:v); else if(d===r&&c.get(X,Y)===0)c.set(X,Y,2); } };
    c.hex=function(cx,cy,r,v){ for(var j=-r;j<=r;j++)for(var i=-r*2;i<=r*2;i++){ var X=Math.round(cx+i/1.6), Y=Math.round(cy+j), ax=Math.abs(i/1.6), ay=Math.abs(j), inside=ay<=r*0.866*1.15&&ax*0.5+ay*0.577<=r*0.95; if(inside)c.set(X,Y,v===undefined?1:v); } };
    return c; },
  // ── the 53 layout types ── each: n name · d what it is · s size [w,h] (optional) · built (painted as masonry) · liq liquid kind · gen(c, floor, floors)
  T:{},
  // ── one floor of a site ──
  floor:function(id,fi,nf,R){ var T=ZSP.T[id], S=ZSD.zsdSize(id), sz=T.s?T.s(fi,nf):S, c=ZSP.kit(sz[0],sz[1],R); T.gen(c,fi,nf); var F={w:c.W,h:c.H,g:c.g,arch:id,_bridgeOver:T.liq?3:0,hints:c.hints};
    ZSD.connect(F,R); return F; },
  design:function(id,nfl){ var key=id+'|'+nfl; ZSP._d=ZSP._d||{}; if(ZSP._d[key])return ZSP._d[key]; var T=ZSP.T[id]; if(!T)return null;
    var floors=[], prev=null, base=ZSD.seed(id)*13+7;
    for(var f=0;f<nfl;f++){ var R=rngOf(base+f*7919), F=ZSP.floor(id,f,nfl,R), last=f===nfl-1;
      if(prev&&prev.down&&prev.w===F.w&&prev.h===F.h)ZSD.landing(F,prev.down,R); else if(prev&&prev.down)ZSD.landing(F,[Math.round(prev.down[0]*F.w/prev.w),Math.round(prev.down[1]*F.h/prev.h)],R);
      ZSP.stairs(F,prev,R,last,T); if(last)ZSP.arena(F,R,T); if(T.secrets)ZSP.secrets(F,R,T.secrets); ZSP.check(F); floors.push(F); prev=F; }
    var ks=Object.keys(ZSP._d); if(ks.length>24)delete ZSP._d[ks[0]]; return (ZSP._d[key]={id:id,floors:floors}); },
  // stairs: the way on in the farthest part of the floor (a hint narrows it: Kris's Conductor note, "entrance and exit in different halls")
  stairs:function(F,prev,R,last,T){ var W=F.w, H=F.h, g=F.g, near=function(x,y){ var best=null, bd=1e9; for(var i=0;i<W*H;i++){ if(g[i]!==1&&g[i]!==5)continue; var d=Math.hypot(i%W-x,((i/W)|0)-y); if(d<bd){ bd=d; best=[i%W,(i/W)|0]; } } return best; };
    var h=F.hints||{}; F.up=prev&&prev.down?near(Math.round(prev.down[0]*W/prev.w),Math.round(prev.down[1]*H/prev.h)):h.up?near(h.up[0],h.up[1]):near(W/2,H-3);
    // a 3 × 3 landing round the arrival, so the stairs never sit in a doorway
    for(var j=-1;j<=1;j++)for(var i=-1;i<=1;i++){ var X=F.up[0]+i, Y=F.up[1]+j; if(X>0&&Y>0&&X<W-1&&Y<H-1&&!(g[Y*W+X]===1||g[Y*W+X]===5||g[Y*W+X]===4))g[Y*W+X]=1; }
    ZSD.connect(F,R);
    var D=ZSP.bfs(F,F.up), mx=0; for(var k=0;k<W*H;k++)if(D[k]>mx)mx=D[k];
    var lo=(T.near||0.86)*mx, cand=[]; for(var k2=0;k2<W*H;k2++){ if(D[k2]>=lo&&(g[k2]===1||g[k2]===5)){ var x=k2%W, y=(k2/W)|0; if(h.down&&Math.hypot(x-h.down[0],y-h.down[1])>h.down[2])continue; cand.push(k2); } }
    if(!cand.length)for(var k3=0;k3<W*H;k3++)if(D[k3]>=lo&&(g[k3]===1||g[k3]===5))cand.push(k3);
    var pick=cand.length?cand[R.i(0,cand.length-1)]:F.up[1]*W+F.up[0]; F.far=mx; if(last)F.goal=[pick%W,(pick/W)|0]; else F.down=[pick%W,(pick/W)|0]; },
  bfs:function(F,from){ var W=F.w, H=F.h, g=F.g, D=new Int32Array(W*H).fill(-1), q=[from[1]*W+from[0]], h=0; D[q[0]]=0;
    while(h<q.length){ var k=q[h++], x=k%W, y=(k/W)|0; for(var d=0;d<4;d++){ var xx=x+(d===0?1:d===1?-1:0), yy=y+(d===2?1:d===3?-1:0); if(xx<0||yy<0||xx>=W||yy>=H)continue; var n=yy*W+xx; if(D[n]<0&&(g[n]===1||g[n]===4||g[n]===5)){ D[n]=D[k]+1; q.push(n); } } } return D; },
  // Kris: "There always needs to be a big enough space at the end of the adventure site for a boss fight": a clear arena (15 × 13 at least) round the goal
  arena:function(F,R,T){ var W=F.w, H=F.h, g=F.g, aw=Math.min(W-6,T.arena?T.arena[0]:17), ah=Math.min(H-6,T.arena?T.arena[1]:14), gx=F.goal[0], gy=F.goal[1];
    var x0=Math.max(2,Math.min(W-2-aw,Math.round(gx-aw/2))), y0=Math.max(2,Math.min(H-2-ah,Math.round(gy-ah/2)));
    if(Math.abs(F.up[0]-(x0+aw/2))<aw/2+3&&Math.abs(F.up[1]-(y0+ah/2))<ah/2+3){ x0=F.up[0]<W/2?W-2-aw:2; y0=F.up[1]<H/2?H-2-ah:2; }
    for(var y=y0-1;y<=y0+ah;y++)for(var x=x0-1;x<=x0+aw;x++){ if(x<1||y<1||x>=W-1||y>=H-1)continue; var edge=x===x0-1||y===y0-1||x===x0+aw||y===y0+ah; if(edge){ if(g[y*W+x]===0||g[y*W+x]===3)g[y*W+x]=2; } else g[y*W+x]=(Math.abs(x-x0-aw/2)<aw*0.3&&Math.abs(y-y0-ah/2)<ah*0.3)?5:1; }
    // two ways in, on different sides
    var sides=[[Math.round(x0+aw/2),y0-1,0,-1],[Math.round(x0+aw/2),y0+ah,0,1],[x0-1,Math.round(y0+ah/2),-1,0],[x0+aw,Math.round(y0+ah/2),1,0]], used=0;
    sides.sort(function(){ return R.f()-0.5; }).forEach(function(s){ if(used>=2)return; var x=s[0], y=s[1], n=0; while(n<14&&x>0&&y>0&&x<W-1&&y<H-1){ var v=g[y*W+x]; if((v===1||v===5||v===4)&&n>0)break; g[y*W+x]=v===3?4:1; if(s[2])g[(y+1)*W+x]=g[(y+1)*W+x]===3?4:(g[(y+1)*W+x]===2||g[(y+1)*W+x]===0?1:g[(y+1)*W+x]); else g[y*W+x+1]=g[y*W+x+1]===3?4:(g[y*W+x+1]===2||g[y*W+x+1]===0?1:g[y*W+x+1]); x+=s[2]; y+=s[3]; n++; } used++; });
    ZSD.connect(F,R); F.goal=[Math.round(x0+aw/2),Math.round(y0+ah/2)]; F.arena=[x0,y0,aw,ah]; },
  // hidden doors (Kris, Crystal Grotto: "add in hidden doors and come up with ideas of how to find them"): shortcuts through thin walls between two
  // far-apart parts of the floor, and a small treasure room behind a wall. Found by a hairline crack and a draft (painted), opened by bumping or striking.
  secrets:function(F,R,n){ var W=F.w, H=F.h, g=F.g, D=ZSP.bfs(F,F.up), out=[], tries=0;
    while(out.length<n&&tries++<3000){ var x=R.i(2,W-3), y=R.i(2,H-3), k=y*W+x; if(g[k]!==2)continue; var a=null, b=null;
      if(ZSP.w(g[k-1])&&ZSP.w(g[k+1])){ a=k-1; b=k+1; } else if(ZSP.w(g[k-W])&&ZSP.w(g[k+W])){ a=k-W; b=k+W; } if(a===null||D[a]<0||D[b]<0||Math.abs(D[a]-D[b])<30)continue;
      if(out.some(function(s){ return Math.abs(s[0]-x)+Math.abs(s[1]-y)<10; }))continue; g[k]=7; out.push([x,y,'short']); }
    // a treasure room in solid wall next to a passage
    for(var t=0;t<600;t++){ var rw=R.i(3,4), rh=R.i(3,4), x0=R.i(3,W-rw-4), y0=R.i(3,H-rh-4), ok=true; for(var y=y0-1;y<=y0+rh&&ok;y++)for(var x=x0-1;x<=x0+rw;x++)if(g[y*W+x]!==2){ ok=false; break; } if(!ok)continue;
      var dx=x0+Math.floor(rw/2), dy=y0+rh+1; if(!(ZSP.w(g[dy*W+dx])&&D[dy*W+dx]>=0)){ dy=y0-2; if(!(dy>0&&ZSP.w(g[dy*W+dx])&&D[dy*W+dx]>=0))continue; }
      for(var yy=y0;yy<y0+rh;yy++)for(var xx=x0;xx<x0+rw;xx++)g[yy*W+xx]=5; var door=dy>y0?[dx,y0+rh]:[dx,y0-1]; g[door[1]*W+door[0]]=7; out.push([door[0],door[1],'room',[dx,dy>y0?y0+rh-1:y0]]); F.treasure=[x0+Math.floor(rw/2),y0+Math.floor(rh/2)]; break; }
    F.secrets=out; },
  // which floors keep the site's old layout: a middle floor in every three (never the first or the last), for sites of four floors or more
  oldFloor:function(id,f,nf){ return nf>=4&&f>0&&f<nf-1&&f%3===2; },
  // the map model for one floor (the Dungeon scene calls this through _buildSiteFloor)
  build:function(spec){ var Z=spec.zsp, site=ZSP.zsdSite(Z.id), D=ZSP.design(Z.id,Z.floors), F=D.floors[Math.min(Z.floor,D.floors.length-1)]; return ZSPP.paint(F,site,ZSP.PICK[Z.id]||0,Z.floor,Z.floors); },
  w:function(v){ return v===1||v===4||v===5; },
  check:function(F){ var D=ZSP.bfs(F,F.up), t=F.goal||F.down; F.ok=!!(t&&D[t[1]*F.w+t[0]]>=0); F.path=t?D[t[1]*F.w+t[0]]:-1; }
};
// ZSD's sizes per site (some layouts change them)
ZSD.zsdSize=function(id){ var s=ZSP.zsdSite(id); return ZSD.SIZE[s?s.type:'dungeon']; };

// ═══ the layouts ═══════════════════════════════════════════════════════
(function(T){
  var D=function(id,n,d,o,gen){ T[id]=Object.assign({n:n,d:d,gen:gen},o||{}); };
  // ── Grasslands ──
  D('silverwood','Silver rings','Off-centre oval rings like the growth rings of a silver tree; each gate is on a different side, so you circle to find it. A garden at the heart.',{built:1},function(c,fi){ var R=c.R; c.fill(0); var rx=c.W/2-1.5, ry=c.H/2-1.5; c.ell(c.cx,c.cy,rx,ry,2); c.ell(c.cx,c.cy,rx-1,ry-1,1);
    var n=3+(fi%2), ox=0, oy=0; for(var k=1;k<=n;k++){ var t=1-k/(n+1); ox+=R.f()*2-1; oy+=R.f()*2-1; var Rx=rx*t, Ry=ry*t, cx=c.cx+ox, cy=c.cy+oy; c.ring(cx,cy,Rx,Ry,1,2); var ga=R.f()*Math.PI*2; for(var q=0;q<2;q++){ var a=ga+q*Math.PI*(0.7+R.f()*0.5); c.disc(cx+Math.cos(a)*(Rx-0.5),cy+Math.sin(a)*(Ry-0.5),1.4,1,2); }
      for(var s=0;s<3;s++){ var a2=R.f()*Math.PI*2; c.line(cx+Math.cos(a2)*Rx,cy+Math.sin(a2)*Ry,cx+Math.cos(a2)*(Rx+rx/(n+1)),cy+Math.sin(a2)*(Ry+ry/(n+1)),1,2,1); } }
    c.ell(c.cx+ox,c.cy+oy,rx/(n+1)*0.7,ry/(n+1)*0.7,5,1); c.hints.center=[c.cx+ox,c.cy+oy]; });
  D('sunken_courtyard','Sunken hall','One vast sunken hall, as the old dungeons were (Kris: "a massive open space with different small obstacles and walls to move around"): fallen columns lie in rows, the outlines of old courtyards stand as broken low walls, shallow pools in the low places.',{liq:'water'},function(c){ var R=c.R; c.cave(1,1,c.W-2,c.H-2,0.3,4);
    for(var k=0;k<6;k++){ var w=R.i(8,13), h=R.i(6,9), x=R.i(3,c.W-w-3), y=R.i(3,c.H-h-3); for(var i=x;i<x+w;i++){ if(R.chance(0.7))c.set(i,y,2,1); if(R.chance(0.7))c.set(i,y+h-1,2,1); } for(var j=y;j<y+h;j++){ if(R.chance(0.6))c.set(x,j,2,1); if(R.chance(0.6))c.set(x+w-1,j,2,1); } if(R.chance(0.5))c.rect(x+2,y+2,w-4,h-4,5,1); }
    for(var r=0;r<5;r++){ var x0=R.i(4,c.W-12), y0=R.i(4,c.H-5), horiz=R.chance(0.6); for(var t=0;t<R.i(4,9);t++){ if(R.chance(0.75))c.set(horiz?x0+t*2:x0,horiz?y0:y0+t*2,6,1); } }
    for(var q=0;q<4;q++)c.ell(R.i(6,c.W-7),R.i(6,c.H-7),R.i(2,4),R.i(1,3),3,1); });

  D('elven_library','Library stacks','A great reading hall crossed by two wide aisles; every quarter is rows of book-stacks with gaps between, reading alcoves at the ends.',{built:1},function(c){ var R=c.R; c.fill(0); c.box(1,1,c.W-2,c.H-2,1); var ax=Math.floor(c.W/2)-1, ay=Math.floor(c.H/2)-1;
    [[2,2,ax-3,ay-3],[ax+3,2,c.W-ax-5,ay-3],[2,ay+3,ax-3,c.H-ay-5],[ax+3,ay+3,c.W-ax-5,c.H-ay-5]].forEach(function(q,qi){ var horiz=qi%2===0; if(horiz){ for(var y=q[1]+1;y<q[1]+q[3]-1;y+=3){ for(var x=q[0]+1;x<q[0]+q[2]-1;x++)c.set(x,y,6); var gp=R.i(q[0]+2,q[0]+q[2]-3); c.set(gp,y,1); c.set(gp+1,y,1); if(R.chance(0.5)){ var g2=R.i(q[0]+2,q[0]+q[2]-3); c.set(g2,y,1); } } }
      else { for(var x2=q[0]+1;x2<q[0]+q[2]-1;x2+=3){ for(var y2=q[1]+1;y2<q[1]+q[3]-1;y2++)c.set(x2,y2,6); var gq=R.i(q[1]+2,q[1]+q[3]-3); c.set(x2,gq,1); c.set(x2,gq+1,1); } } c.rect(q[0],q[1],3,3,5); });
    c.rect(ax-1,2,4,c.H-4,1); c.rect(2,ay-1,c.W-4,4,1); c.rect(ax-2,ay-2,6,6,5); });
  D('hyrule_keep','Ward keep','Square wards one inside the other, each with its gatehouse on another side, round corner towers on the outer wall, rooms built into the wards.',{built:1},function(c,fi){ var R=c.R; c.fill(0); var n=3, side=R.i(0,3);
    for(var k=0;k<n;k++){ var m=k*Math.floor(Math.min(c.W,c.H)/7)+1, x=m, y=m, w=c.W-m*2, h=c.H-m*2; if(w<8||h<8)break; if(k===0)c.box(x,y,w,h,1); else { c.rect(x,y,w,1,2); c.rect(x,y+h-1,w,1,2); c.rect(x,y,1,h,2); c.rect(x+w-1,y,1,h,2); }
      var s=(side+k*(1+R.i(0,1)))%4, gx=s===0||s===1?x+Math.floor(w/2):s===2?x:x+w-1, gy=s===2||s===3?y+Math.floor(h/2):s===0?y:y+h-1; c.rect(gx-1,gy-1,3,3,1);
      if(k>0){ var bw=Math.floor(Math.min(c.W,c.H)/7)-1; c.rooms(x-bw,y-bw,w+bw*2,bw,4,0.2,function(i,j){ return c.get(i,j)===1; }); } }
    [[3,3],[c.W-4,3],[3,c.H-4],[c.W-4,c.H-4]].forEach(function(p){ c.room(p[0],p[1],3.4,5); }); c.doors(0.03); c.rect(Math.floor(c.cx)-3,Math.floor(c.cy)-3,7,7,5); });
  D('mushroom_forest','Mushroom marsh','Round clearings in a black bog, giant mushrooms standing in them, joined by winding raised paths.',{liq:'swamp'},function(c){ var R=c.R; c.fill(3); var P=[], n=10+R.i(0,4);
    for(var k=0;k<n;k++){ var x=R.i(8,c.W-9), y=R.i(7,c.H-8), r=R.i(3,6); P.push([x,y]); c.disc(x,y,r,1); c.disc(x+R.i(-2,2),y+R.i(-2,2),r-1,R.chance(0.3)?5:1); if(r>4)c.set(x,y,6); }
    var used=[0]; for(var k2=1;k2<P.length;k2++){ var best=0, bd=1e9; used.forEach(function(a){ var d=Math.hypot(P[a][0]-P[k2][0],P[a][1]-P[k2][1]); if(d<bd){ bd=d; best=a; } }); c.wiggle(P[best][0],P[best][1],P[k2][0],P[k2][1],2,1,2.5); used.push(k2); }
    for(var x2=0;x2<3;x2++){ var a=R.i(0,P.length-1), b=R.i(0,P.length-1); if(a!==b)c.wiggle(P[a][0],P[a][1],P[b][0],P[b][1],1,4,1.5,3); } });
  // ── Wetlands ──
  D('frost_cathedral','Frost cathedral','A long nave between rows of ice pillars, side aisles with chapels, a transept near the top and the apse beyond it.',{built:1},function(c,fi){ var R=c.R; c.fill(0); var nw=Math.floor(c.W*0.34), nx=Math.floor(c.cx-nw/2), top=4, bot=c.H-3;
    c.box(nx-6,top,nw+12,bot-top,1); c.rect(nx-6,top+6,6,1,2); for(var y=top+2;y<bot-2;y+=3){ c.set(nx,y,6); c.set(nx+nw-1,y,6); }
    var ty=top+5+R.i(0,3); c.box(3,ty,c.W-6,7,1); for(var x=5;x<c.W-5;x+=4){ c.set(x,ty+1,6); c.set(x,ty+5,6); } c.ell(c.cx,top+2,nw/2+2,4,1); c.ell(c.cx,top+2,nw/2-1,2.5,5);
    for(var k=0;k<4;k++){ var cy=ty+10+k*Math.floor((bot-ty-12)/4); [nx-13,nx+nw+6].forEach(function(cx0){ if(cx0<2||cx0+8>c.W-2)return; c.box(cx0,cy,8,6,R.chance(0.4)?5:1); c.set(cx0<nx?cx0+7:cx0,cy+3,1); }); }
    c.rect(nx+2,top+1,nw-4,bot-top-2,1,2); c.rect(Math.floor(c.cx)-1,bot-1,3,2,1); });
  D('lake_ring','Lake ring','Islands in a ring round a dark lake, bridges between neighbours (one gap you must cross the middle for), a holy island at the centre.',{liq:'water'},function(c,fi){ var R=c.R; c.fill(3); var n=8+R.i(0,3), rx=c.W*0.36, ry=c.H*0.34, P=[];
    for(var k=0;k<n;k++){ var a=k/n*Math.PI*2+R.f()*0.3, x=c.cx+Math.cos(a)*rx, y=c.cy+Math.sin(a)*ry, r=R.i(3,5); P.push([x,y]); c.disc(x,y,r,1); c.disc(x+R.i(-2,2),y+R.i(-2,2),r-1,R.chance(0.3)?5:1); }
    var gap=R.i(0,n-1); for(var k2=0;k2<n;k2++){ if(k2===gap)continue; var a2=P[k2], b=P[(k2+1)%n]; c.line(a2[0],a2[1],b[0],b[1],2,4,3); }
    c.disc(c.cx,c.cy,6,1); c.disc(c.cx,c.cy,3,5); [gap,(gap+1)%n].forEach(function(i){ c.line(P[i][0],P[i][1],c.cx,c.cy,2,4,3); }); });
  D('moonglass','Crescent galleries','Moon-shaped galleries curving one above the other over the night sky, slim glass bridges between them, never twice in a line.',{built:1,liq:'chasm'},function(c){ var R=c.R; c.fill(0); var ox=c.cx+R.i(-6,6), oy=-c.H*0.25, n=4;
    for(var k=0;k<n;k++){ var r0=c.H*0.45+k*c.H*0.2, a0=0.25+R.f()*0.2, a1=Math.PI-0.25-R.f()*0.2; for(var a=a0;a<a1;a+=0.01){ var x=ox+Math.cos(a)*r0, y=oy+Math.sin(a)*r0; c.rect(Math.floor(x)-2,Math.floor(y)-2,5,5,2,0); } for(var a3=a0;a3<a1;a3+=0.01){ var x3=ox+Math.cos(a3)*r0, y3=oy+Math.sin(a3)*r0; c.rect(Math.floor(x3)-1,Math.floor(y3)-1,3,3,1); }
      if(k>0){ var nb=1+R.i(0,1); for(var b=0;b<nb;b++){ var ab=a0+0.2+R.f()*(a1-a0-0.4); c.line(ox+Math.cos(ab)*(r0-c.H*0.2+2),oy+Math.sin(ab)*(r0-c.H*0.2+2),ox+Math.cos(ab)*(r0-2),oy+Math.sin(ab)*(r0-2),2,4,0); } }
      var rm=R.i(1,2); for(var q=0;q<rm;q++){ var ar=a0+R.f()*(a1-a0); c.room(ox+Math.cos(ar)*r0,oy+Math.sin(ar)*r0+R.i(-1,1),3.6,R.chance(0.5)?5:1); } } });
  D('crystal_grotto','Crystal maze','A maze of crystal walls cut by flooded channels; there is always more than one way through, and hidden doors (a hairline crack, a cold draft) lead to short cuts and a treasure room.',{liq:'water',secrets:4,near:0.82},function(c){ var R=c.R; c.maze(1,1,c.W-2,c.H-2,2,1,0.22);
    for(var k=0;k<3;k++){ if(k%2===0){ var y=R.i(8,c.H-9); for(var x=2;x<c.W-2;x++){ var yy=Math.round(y+Math.sin(x*0.2+k)*2); c.set(x,yy,3); c.set(x,yy+1,3); } } else { var x0=R.i(10,c.W-11); for(var y2=2;y2<c.H-2;y2++){ var xx=Math.round(x0+Math.sin(y2*0.2+k)*2); c.set(xx,y2,3); c.set(xx+1,y2,3); } } }
    for(var b=0;b<14;b++){ var bx=R.i(3,c.W-4), by=R.i(3,c.H-4); if(c.get(bx,by)===3){ c.set(bx,by,4); c.set(bx+1,by,4,3); c.set(bx-1,by,4,3); c.set(bx,by+1,4,3); c.set(bx,by-1,4,3); } }
    c.scatter(6,60,2); for(var ch=0;ch<3;ch++){ var cw=R.i(6,9), chh=R.i(5,7), x1=R.i(2,c.W-cw-2), y1=R.i(2,c.H-chh-2); c.rect(x1,y1,cw,chh,R.chance(0.5)?5:1); } });
  D('root_hollow','Root labyrinth','A labyrinth of wide tunnels between great roots: two or three ways to every place, never too long a walk to the way down, and a big root-chamber for the guardian.',{secrets:2,near:0.72,arena:[19,15]},function(c){ var R=c.R; c.maze(1,1,c.W-2,c.H-2,3,2,0.35);
    for(var k=0;k<5;k++){ var x=R.i(6,c.W-7), y=R.i(6,c.H-7); c.disc(x,y,R.i(3,4),R.chance(0.4)?5:1); } c.scatter(6,30,1,true); });
  // ── Highlands ──
  D('observatory','Orrery','Rings like the paths of the planets, each with round chambers riding on it; the gates turn round from floor to floor.',{built:1},function(c,fi){ var R=c.R; c.fill(0); var r0=Math.min(c.W,c.H)/2-1.5; c.disc(c.cx,c.cy,r0,2); c.disc(c.cx,c.cy,r0-1,1); var n=3;
    for(var k=1;k<=n;k++){ var rr=r0*(n+1-k)/(n+1); c.ring(c.cx,c.cy,rr,rr,1,2); var rot=fi*0.7+k*1.3; for(var q=0;q<2;q++){ var a=rot+q*Math.PI; c.disc(c.cx+Math.cos(a)*(rr-0.5),c.cy+Math.sin(a)*(rr-0.5),1.5,1,2); }
      var pl=1+R.i(1,2); for(var p=0;p<pl;p++){ var ap=rot+0.8+p*Math.PI*2/pl; c.room(c.cx+Math.cos(ap)*(rr+r0/(n+1)/2),c.cy+Math.sin(ap)*(rr+r0/(n+1)/2),Math.min(4,r0/(n+1)/2+0.5),5); } }
    c.disc(c.cx,c.cy,r0/(n+1)*0.8,5); c.hints.center=[c.cx,c.cy]; });
  D('bone_pit','Bone field','A vast pit floor, open as the old dungeons were: heaps of bones and rib-arches to weave between, a few small pits that drop away into the dark.',{liq:'chasm'},function(c){ var R=c.R; c.cave(1,1,c.W-2,c.H-2,0.32,4);
    for(var k=0;k<22;k++){ var x=R.i(4,c.W-5), y=R.i(4,c.H-5), n=R.i(1,4); for(var q=0;q<n;q++)c.set(x+R.i(-1,1),y+R.i(-1,1),6,1); }
    for(var a=0;a<7;a++){ var x0=R.i(6,c.W-7), y0=R.i(6,c.H-7), r=R.i(2,4), a0=R.f()*Math.PI*2; for(var t=0;t<Math.PI;t+=0.25)c.set(x0+Math.cos(a0+t)*r,y0+Math.sin(a0+t)*r,2,1); }
    for(var p2=0;p2<4;p2++)c.disc(R.i(8,c.W-9),R.i(7,c.H-8),R.i(2,3),3,1); });

  D('sky_cloister','Cloister walk','A square spiral of cloister walks winding inward, open garden courts in its turns and pillars all along.',{built:1},function(c){ var R=c.R; c.fill(2); var x0=2, y0=2, x1=c.W-3, y1=c.H-3, w=3, step=w+2, k=0;
    while(x1-x0>8&&y1-y0>8&&k<12){ var side=k%4; if(side===0)c.rect(x0,y0,x1-x0,w,1); else if(side===1)c.rect(x1-w+1,y0,w,y1-y0,1); else if(side===2)c.rect(x0+step,y1-w+1,x1-x0-step,w,1); else { c.rect(x0+step-w,y0+step,w,y1-y0-step,1); x0+=step; y0+=step; x1-=step; y1-=step; } k++; }
    c.rect(x0,y0,Math.max(3,x1-x0),Math.max(3,y1-y0),5); for(var j=2;j<c.H-2;j+=2)for(var i=2;i<c.W-2;i+=2){ if(c.get(i,j)===1&&c.get(i+1,j)===1&&c.get(i-1,j)===1&&R.chance(0.15))c.set(i,j,6); }
    for(var q=0;q<5;q++){ var gx=R.i(4,c.W-5), gy=R.i(4,c.H-5); c.rect(gx,gy,3,3,5,2); } c.doors(0.02); });
  D('rivendell','Twilight terraces','Halls on terraces stepping down the valley; a stream runs along each step, crossed by small bridges, a waterfall where they meet.',{built:1,liq:'water'},function(c){ var R=c.R; c.fill(2); var n=4, bh=Math.floor((c.H-2)/n);
    for(var k=0;k<n;k++){ var y0=1+k*bh, off=(k%2)*4; c.rooms(2+off,y0+1,c.W-4-off,bh-4,4,0.25); for(var x=2;x<c.W-2;x++){ c.set(x,y0+bh-2,3); } c.doors(0.03); var nb=1+R.i(1,2); for(var b=0;b<nb;b++){ var bx=R.i(4,c.W-5); c.rect(bx,y0+bh-3,2,3,4,3); c.rect(bx,y0+bh-3,2,3,1,2); } }
    var fx=R.i(Math.floor(c.W*0.3),Math.floor(c.W*0.7)); c.rect(fx,2,2,c.H-4,3,1); });
  D('pillared_hall','Pillar archipelago','Square platforms of pillars standing in darkness, more than a dozen of them, bridged one to the next in a maze of crossings.',{liq:'chasm'},function(c){ var R=c.R; c.fill(3); var cs=9, gw=Math.floor((c.W-4)/cs), gh=Math.floor((c.H-4)/cs), P=[];
    for(var j=0;j<gh;j++)for(var i=0;i<gw;i++){ var x=3+i*cs+R.i(0,2), y=3+j*cs+R.i(0,2), s=R.i(4,6); c.rect(x,y,s,s,1); if(s>=5){ c.set(x+1,y+1,6); c.set(x+s-2,y+s-2,6); } P.push([x+s/2,y+s/2,i,j]); }
    var seen={}, st=[0]; seen[0]=1; while(st.length){ var q=st[st.length-1], qi=P[q][2], qj=P[q][3], nb=[[1,0],[-1,0],[0,1],[0,-1]].map(function(d){ return (qj+d[1])*gw+qi+d[0]; }).filter(function(n,ix){ var d=[[1,0],[-1,0],[0,1],[0,-1]][ix]; return qi+d[0]>=0&&qi+d[0]<gw&&qj+d[1]>=0&&qj+d[1]<gh&&!seen[n]; });
      if(!nb.length){ st.pop(); continue; } var n2=nb[R.i(0,nb.length-1)]; seen[n2]=1; c.line(P[q][0],P[q][1],P[n2][0],P[n2][1],R.chance(0.5)?1:2,4,3); st.push(n2); }
    for(var e=0;e<gw*gh*0.25;e++){ var a=R.i(0,P.length-1), b=a+(R.chance(0.5)?1:gw); if(b<P.length&&(b-a===gw||P[a][3]===P[b][3]))c.line(P[a][0],P[a][1],P[b][0],P[b][1],1,4,3); } });
  // ── Ashlands ──
  D('dawn_sanctum','Sunburst','Eight arms run out from a sun-altar like rays: four long ones, four short, each ending in a chapel; an outer walk joins some of the tips.',{built:1},function(c){ var R=c.R; c.fill(0); var r=Math.min(c.W,c.H)/2-3;
    for(var p=0;p<8;p++){ var a=p*Math.PI/4, L=p%2?r*0.68:r, ex=c.cx+Math.cos(a)*L*c.W/c.H*0.95, ey=c.cy+Math.sin(a)*L; c.line(c.cx,c.cy,ex,ey,p%2?5:7,2,0); c.line(c.cx,c.cy,ex,ey,p%2?3:5,1); c.room(ex,ey,p%2?3.5:4.5,R.chance(0.4)?5:1); if(p%2===0)for(var t=0.3;t<0.95;t+=0.2)c.set(c.cx+Math.cos(a)*L*t*c.W/c.H*0.95+Math.cos(a+1.57)*2,c.cy+Math.sin(a)*L*t+Math.sin(a+1.57)*2,6); }
    var walk=R.i(3,5), s0=R.i(0,7); for(var w=0;w<walk;w++){ var a1=(s0+w)*Math.PI/4, a2=(s0+w+1)*Math.PI/4, L1=(s0+w)%2?r*0.68:r, L2=(s0+w+1)%2?r*0.68:r; c.line(c.cx+Math.cos(a1)*L1*c.W/c.H*0.95,c.cy+Math.sin(a1)*L1,c.cx+Math.cos(a2)*L2*c.W/c.H*0.95,c.cy+Math.sin(a2)*L2,2,1,0); }
    c.room(c.cx,c.cy,6,5); });
  D('lava_archipelago','Lava hub','A ring of black rock round a sunken lake of fire; causeways run out to island halls, and the outer islands chain to each other.',{liq:'lava'},function(c){ var R=c.R; c.fill(3); var rr=Math.min(c.W,c.H)*0.16; c.disc(c.cx,c.cy,rr+3,1); c.disc(c.cx,c.cy,rr,3); c.ring(c.cx,c.cy,rr+3,rr+3,1,6);
    for(var g=0;g<4;g++){ var a=g*Math.PI/2+R.f()*0.4; c.line(c.cx+Math.cos(a)*(rr+3),c.cy+Math.sin(a)*(rr+3),c.cx+Math.cos(a)*(rr-1),c.cy+Math.sin(a)*(rr-1),2,1); }
    var n=8+R.i(0,3), P=[]; for(var k=0;k<n;k++){ var a2=k/n*Math.PI*2+R.f()*0.3, d=rr+10+R.f()*Math.min(c.W,c.H)*0.18, x=c.cx+Math.cos(a2)*d*c.W/c.H, y=c.cy+Math.sin(a2)*d; x=Math.max(6,Math.min(c.W-7,x)); y=Math.max(5,Math.min(c.H-6,y)); P.push([x,y]); c.box(Math.round(x)-4,Math.round(y)-3,R.i(8,10),R.i(6,8),R.chance(0.3)?5:1); }
    P.forEach(function(p,i){ if(i%2===0)c.line(p[0],p[1],c.cx,c.cy,2,4,3); var q=P[(i+1)%n]; if(R.chance(0.7))c.line(p[0],p[1],q[0],q[1],2,4,3); }); c.doors(0.04); });
  D('reflecting_hall','Mirror halls','Every room on the left has its twin on the right; a long reflecting pool runs down the middle, crossed twice.',{built:1,liq:'water'},function(c){ var R=c.R; c.fill(2); var half=Math.floor(c.W/2)-3; var L=[]; c.bsp(2,2,half-2,c.H-4,5,L);
    L.forEach(function(r){ var v=R.chance(0.25)?5:1; c.rect(r[0],r[1],r[2],r[3],v); c.rect(c.W-r[0]-r[2],r[1],r[2],r[3],v); }); for(var k=0;k<c.W*c.H*0.02;k++){ var x=R.i(2,half), y=R.i(2,c.H-3); if(c.get(x,y)!==2)continue; var a=c.walk(c.get(x-1,y))&&c.walk(c.get(x+1,y)), b=c.walk(c.get(x,y-1))&&c.walk(c.get(x,y+1)); if(a||b){ c.set(x,y,1); c.set(c.W-1-x,y,1); } }
    c.rect(half,2,c.W-half*2,c.H-4,1); c.rect(half+1,4,c.W-half*2-2,c.H-8,3); var y1=R.i(6,Math.floor(c.H/2)-3), y2=R.i(Math.floor(c.H/2)+3,c.H-7); c.rect(half+1,y1,c.W-half*2-2,2,4); c.rect(half+1,y2,c.W-half*2-2,2,4);
    for(var y=3;y<c.H-3;y+=3){ c.set(half,y,6); c.set(c.W-half-1,y,6); } for(var r2=0;r2<L.length;r2++){ var q=L[r2]; if(q[0]+q[2]>=half-2){ var dy=q[1]+Math.floor(q[3]/2); c.set(half-1,dy,1); c.set(c.W-half,dy,1); } } });
  D('boulder_field','Boulder field','The old dungeon kept (Kris: "a massive open space with different small obstacles and walls to move around"): one huge cave floor strewn with boulders of every size and short broken walls, good for big fights.',{},function(c){ var R=c.R; c.cave(1,1,c.W-2,c.H-2,0.28,4);
    for(var k=0;k<70;k++){ var x=R.i(3,c.W-4), y=R.i(3,c.H-4), big=R.chance(0.35); c.rect(x,y,big?2:1,big?2:1,6,1); }
    for(var w=0;w<12;w++){ var x0=R.i(4,c.W-8), y0=R.i(4,c.H-8), L=R.i(2,5), horiz=R.chance(0.5); for(var t=0;t<L;t++)c.set(horiz?x0+t:x0,horiz?y0:y0+t,2,1); } });

  D('spiral_chasm','Chasm rings','Several systems of rings, each round its own chasm and some rings inside others, all joined: you work out from one hub to the next.',{liq:'chasm'},function(c){ var R=c.R; c.fill(2); var n=3+(c.W>70?1:0), H=[];
    for(var k=0;k<n;k++){ var r=R.i(8,12), x=k%2?c.W-r-4-R.i(0,6):r+4+R.i(0,6), y=Math.round((k+0.5)*c.H/n); x=Math.max(r+3,Math.min(c.W-r-4,x)); y=Math.max(r+2,Math.min(c.H-r-3,y)); H.push([x,y,r]);
      c.disc(x,y,r,1); c.disc(x,y,r-2,2); c.disc(x,y,r-3,1); c.disc(x,y,r*0.35,3); if(r>9){ c.ring(x,y,r-5,r-5,1,2); } for(var g=0;g<4;g++){ var a=g*Math.PI/2+R.f()*0.6+k; c.line(x+Math.cos(a)*(r*0.35+0.5),y+Math.sin(a)*(r*0.35+0.5),x+Math.cos(a)*(r-1),y+Math.sin(a)*(r-1),1,1); } }
    for(var k2=1;k2<n;k2++){ var a2=H[k2-1], b=H[k2]; c.wiggle(a2[0],a2[1],b[0],b[1],2,1,3,2); } if(n>2)c.wiggle(H[0][0],H[0][1],H[n-1][0],H[n-1][1],2,1,4,2); });
  // ── Mage towers ──
  D('mage_rime_spire','Ice honeycomb','Six-sided cells of ice packed together like frost on glass; doors between some neighbours, ice-floor cells here and there.',{built:1},function(c){ var R=c.R; c.fill(0); var r=4, dx=Math.round(r*1.75), dy=r*2-1, C=[];
    for(var j=0;j*dy<c.H-r*2;j++)for(var i=0;i*dx<c.W-r*2;i++){ var x=r+2+i*dx, y=r+1+j*dy+(i%2?Math.floor(dy/2):0); if(y>c.H-r-2||R.chance(0.08))continue; C.push([x,y]); c.hex(x,y,r,2); c.hex(x,y,r-1,R.chance(0.25)?5:1); }
    C.forEach(function(p,ix){ C.forEach(function(q,jx){ if(jx<=ix)return; var d=Math.hypot(p[0]-q[0],p[1]-q[1]); if(d<r*2.2&&R.chance(0.55))c.line((p[0]*2+q[0])/3,(p[1]*2+q[1])/3,(p[0]+q[0]*2)/3,(p[1]+q[1]*2)/3,2,1); }); }); });
  D('mage_scriptorium','Star chart','A great seven-pointed star of reading halls linked to two smaller five-pointed stars — Kris: "we need more points to the star, and there should be multiple connecting stars".',{built:1},function(c){ var R=c.R; c.fill(0); var r=Math.min(c.W,c.H)*0.3;
    c.star(c.cx-3,c.cy+2,7,r,3,-Math.PI/2+R.f()*0.4,3.4); var s1=[c.W-9,8], s2=[8,c.H-9]; c.star(s1[0],s1[1],5,6.5,2,R.f(),2.6); c.star(s2[0],s2[1],5,6.5,2,R.f(),2.6); c.wiggle(c.cx,c.cy,s1[0],s1[1],2,1,2,0); c.wiggle(c.cx,c.cy,s2[0],s2[1],2,1,2,0);
    if(R.chance(0.6))c.line(s1[0],s1[1],s2[0],s2[1],1,4,0); });
  D('mage_hearthfire','Twin flame spiral','Two spiral passages wound into each other round the hearth, joined at the fire and at the rim — one leads in, the other out.',{built:1},function(c){ var R=c.R; c.fill(2); var r1=Math.min(c.W,c.H)/2-2, turns=2.1;
    [0,Math.PI].forEach(function(off){ var P=[]; for(var t=0;t<=1;t+=0.004){ var a=off+t*turns*Math.PI*2, rad=r1*(1-t)+3; P.push([c.cx+Math.cos(a)*rad,c.cy+Math.sin(a)*rad]); } c.path(P,3,1); for(var al=0;al<5;al++){ var p=P[R.i(30,P.length-60)]; c.disc(p[0]+R.i(-3,3),p[1]+R.i(-3,3),2.2,5,2); } });
    c.disc(c.cx,c.cy,4.5,5); for(var k=0;k<3;k++){ var a=R.f()*Math.PI*2, d=R.f()*r1*0.7+4; c.disc(c.cx+Math.cos(a)*d,c.cy+Math.sin(a)*d,1.5,1,2); } });
  D('mage_rootspire','Root spiral','A spiral climbing in, roots branching off it into side burrows that end in seed-pods — some loop back.',{built:1},function(c){ var R=c.R; c.fill(2); var r1=Math.min(c.W,c.H)/2-2, P=[];
    for(var t=0;t<=1;t+=0.003){ var a=t*2.6*Math.PI*2, rad=r1*(1-t)+2.5; P.push([c.cx+Math.cos(a)*rad,c.cy+Math.sin(a)*rad]); } c.path(P,3,1);
    for(var b=0;b<9;b++){ var p=P[R.i(20,P.length-40)], x=p[0], y=p[1], a2=R.f()*Math.PI*2; for(var s=0;s<R.i(5,9);s++){ var nx=x+Math.cos(a2)*2, ny=y+Math.sin(a2)*2; c.line(x,y,nx,ny,2,1,2); x=nx; y=ny; a2+=R.f()*1.2-0.6; } c.disc(x,y,2.2,R.chance(0.5)?5:1); } c.disc(c.cx,c.cy,3.5,5); });
  D('mage_conductor','Five halls','Five halls — Kris: "about 5 halls instead of just 2, with entrance and exit in different halls … 2 out of the 5 halls should be big enough that they have halls within the hall".',{built:1},function(c){ var R=c.R; c.fill(0);
    var P=[[c.W*0.25,c.H*0.27,9.5,1],[c.W*0.74,c.H*0.24,7,0],[c.W*0.52,c.H*0.55,6,0],[c.W*0.23,c.H*0.76,7,0],[c.W*0.75,c.H*0.75,10,1]];
    P.forEach(function(p){ c.room(p[0],p[1],p[2],1); if(p[3]){ c.box(Math.round(p[0]-p[2]*0.45),Math.round(p[1]-p[2]*0.45),Math.round(p[2]*0.9),Math.round(p[2]*0.9),5); c.set(Math.round(p[0]),Math.round(p[1]+p[2]*0.45-1),1); c.set(Math.round(p[0]),Math.round(p[1]-p[2]*0.45),1); } else c.disc(p[0],p[1],2,5); });
    [[0,1],[0,2],[1,2],[2,3],[2,4],[3,4]].forEach(function(e){ if(e[0]===0&&e[1]===2&&R.chance(0.5))return; var a=P[e[0]], b=P[e[1]]; c.line(a[0],a[1],b[0],b[1],4,2,0); c.line(a[0],a[1],b[0],b[1],2,1); });
    c.hints.up=[P[0][0],P[0][1]]; c.hints.down=[P[4][0],P[4][1],P[4][2]]; });
  D('mage_frozen_belfry','Bell grid','A grid of square bell-rooms, joined corner to corner by short diagonal stairs, the great bell chamber in the middle.',{built:1},function(c){ var R=c.R; c.fill(0); var s=8, gap=3, n=Math.floor((Math.min(c.W,c.H)-4)/(s+gap)), x0=Math.floor((c.W-(n*(s+gap)-gap))/2), y0=Math.floor((c.H-(n*(s+gap)-gap))/2), C=[];
    for(var j=0;j<n;j++)for(var i=0;i<n;i++){ var x=x0+i*(s+gap), y=y0+j*(s+gap), mid=i===Math.floor(n/2)&&j===Math.floor(n/2); c.box(x,y,s,s,mid?5:1); C.push([x,y,i,j]); }
    C.forEach(function(p){ C.forEach(function(q){ if(q[2]===p[2]+1&&Math.abs(q[3]-p[3])===1&&R.chance(0.6)){ var ax=p[0]+s-2, ay=q[3]>p[3]?p[1]+s-2:p[1]+1, bx=q[0]+1, by=q[3]>p[3]?q[1]+1:q[1]+s-2; c.line(ax,ay,bx,by,2,1); } if(q[2]===p[2]&&q[3]===p[3]+1&&R.chance(0.35))c.line(p[0]+s/2,p[1]+s-2,q[0]+s/2,q[1]+1,1,1); }); }); });
  D('mage_mire_tower','Sunken rings','Rings half-drowned in the mire: the low side of each ring is under water, stepping stones across, the dry side walled.',{built:1,liq:'swamp'},function(c){ var R=c.R; c.fill(0); var r0=Math.min(c.W,c.H)/2-1.5; c.disc(c.cx,c.cy,r0,2); c.disc(c.cx,c.cy,r0-1,1); var n=3;
    for(var k=1;k<=n;k++){ var rr=r0*(n+1-k)/(n+1); c.ring(c.cx,c.cy,rr,rr,1,2); var a=R.f()*Math.PI*2; c.disc(c.cx+Math.cos(a)*(rr-0.5),c.cy+Math.sin(a)*(rr-0.5),1.4,1,2); }
    var tilt=R.f()*Math.PI*2; for(var j=1;j<c.H-1;j++)for(var i=1;i<c.W-1;i++){ var v=c.get(i,j), side=(i-c.cx)*Math.cos(tilt)+(j-c.cy)*Math.sin(tilt); if(side>2&&(v===1||v===2)&&Math.hypot(i-c.cx,j-c.cy)<r0-1)c.set(i,j,v===2?3:(R.chance(0.82)?3:4)); } c.disc(c.cx,c.cy,3,5); });
  D('mage_drowned_lighthouse','Lighthouse chain','Ringed halls like lighthouse lamps, joined one after another by long sea-walls — Kris: "go through each of the rings and hallways to get to next stairs".',{built:1,liq:'water'},function(c){ var R=c.R; c.fill(3); var n=4, P=[[c.W*0.22,c.H*0.24],[c.W*0.76,c.H*0.26],[c.W*0.26,c.H*0.75],[c.W*0.77,c.H*0.76]];
    if(R.chance(0.5))P=[P[0],P[2],P[3],P[1]];
    P.forEach(function(p,i){ var r=R.i(7,9); c.disc(p[0],p[1],r,2); c.disc(p[0],p[1],r-1,1); c.ring(p[0],p[1],r-3,r-3,1,2); var a=R.f()*Math.PI*2; c.disc(p[0]+Math.cos(a)*(r-3.5),p[1]+Math.sin(a)*(r-3.5),1.3,1,2); c.disc(p[0],p[1],2,5); });
    for(var k=1;k<n;k++){ var a2=P[k-1], b=P[k]; c.line(a2[0],a2[1],b[0],b[1],4,2,3); c.line(a2[0],a2[1],b[0],b[1],2,1); }
    c.hints.up=P[0]; c.hints.down=[P[n-1][0],P[n-1][1],7]; });
  D('mage_ember_observatory','Bridged lattice','Clusters of diamond-shaped crystal rooms float apart over the glow below, bridges reaching from cluster to cluster — Kris: "bridges that connect different sections of the lattices".',{built:1,liq:'chasm'},function(c){ var R=c.R; c.fill(3); var K=[[c.W*0.27,c.H*0.28],[c.W*0.73,c.H*0.3],[c.W*0.3,c.H*0.73],[c.W*0.72,c.H*0.72]];
    K.forEach(function(k){ var n=R.i(4,6); for(var q=0;q<n;q++){ var x=k[0]+R.i(-6,6), y=k[1]+R.i(-6,6); c.diamond(x,y,4,R.chance(0.3)?5:1); } });
    for(var j=0;j<c.H;j++)for(var i=0;i<c.W;i++)if(c.get(i,j)===0)c.set(i,j,3);
    [[0,1],[1,3],[3,2],[2,0]].forEach(function(e,i){ if(i===3&&R.chance(0.5))return; c.line(K[e[0]][0],K[e[0]][1],K[e[1]][0],K[e[1]][1],2,4,3); }); });
  D('mage_hollow_spire','Hollow ring','A ring of rooms and passages round an empty shaft — Kris: "hollow space in the middle … so it looks like a donut. But make the rooms and hallways in the donut more complex".',{built:1,liq:'chasm'},function(c){ var R=c.R; c.fill(0); var r0=Math.min(c.W,c.H)/2-1.5, ri=r0*0.36;
    c.disc(c.cx,c.cy,r0,2); var inR=function(i,j){ var d=Math.hypot(i+0.5-c.cx,j+0.5-c.cy); return d<r0-1&&d>ri+1; }; c.rooms(2,2,c.W-4,c.H-4,4,0.25,inR); c.doors(0.06);
    c.ring(c.cx,c.cy,r0*0.68,r0*0.68,1,1); c.disc(c.cx,c.cy,ri+1,2); c.disc(c.cx,c.cy,ri,3); for(var k=0;k<3;k++){ var a=R.f()*Math.PI*2; c.disc(c.cx+Math.cos(a)*(ri+1.5),c.cy+Math.sin(a)*(ri+1.5),1.2,1,2); } });
  D('mage_lightning_rod','Star field','Stars of three, four and six points, each its own little tower of halls, struck together by crooked passages like lightning.',{built:1},function(c){ var R=c.R; c.fill(0); var S=[[c.W*0.26,c.H*0.27,3,8],[c.W*0.74,c.H*0.3,4,8.5],[c.W*0.5,c.H*0.72,6,10]];
    S.forEach(function(s){ c.star(s[0],s[1],s[2],s[3],2,R.f()*Math.PI,2.6); }); for(var k=0;k<3;k++){ var a=S[k], b=S[(k+1)%3], P=[[a[0],a[1]]]; for(var z=1;z<4;z++){ var t=z/4; P.push([a[0]+(b[0]-a[0])*t+R.i(-3,3),a[1]+(b[1]-a[1])*t+R.i(-3,3)]); } P.push([b[0],b[1]]); c.path(P,4,2,0); c.path(P,2,1); } });
  D('mage_monolith','Monolith','One long rectangle of stone — Kris: "Keep the large open spaces and broad halls, but make it a long rectangle for each floor".',{built:1,s:function(){ return [76,30]; }},function(c){ var R=c.R; c.fill(0); c.box(1,1,c.W-2,c.H-2,2); var x=2;
    while(x<c.W-8){ var w=R.i(10,16); if(x+w>c.W-3)w=c.W-3-x; var big=R.chance(0.5); if(big){ c.rect(x,3,w,c.H-6,1); for(var i=x+2;i<x+w-1;i+=4){ c.set(i,5,6); c.set(i,c.H-6,6); } } else { c.rect(x,3,w,Math.floor(c.H/2)-4,1); c.rect(x,Math.floor(c.H/2)+1,w,Math.floor(c.H/2)-4,R.chance(0.4)?5:1); }
      x+=w+1; if(x<c.W-3)c.rect(x-1,R.i(5,c.H-12),1,R.i(4,6),1); } c.rect(3,Math.floor(c.H/2)-2,c.W-6,4,1); c.rect(3,Math.floor(c.H/2)-1,c.W-6,2,5); });
  D('mage_frostbitten_crown','Glacier maze','A maze of ice blocks — Kris: "different widths of hallways and rooms. Sometimes very narrow hallways … sometime very wide ones, but make it more rectangular"; crevasses with ice bridges.',{built:1,liq:'chasm',near:0.8},function(c){ var R=c.R; c.fill(2);
    var cut=function(x,y,w,h,d){ if(w<7||h<7||d>5){ c.rect(x+1,y+1,w-2,h-2,R.chance(0.3)?5:1); return; } var vert=w>h; var s=vert?R.i(3,w-4):R.i(3,h-4), th=R.chance(0.3)?2:1; if(vert){ cut(x,y,s,h,d+1); cut(x+s+th-1,y,w-s-th+1,h,d+1); var dw=[1,1,2,4][R.i(0,3)]; c.rect(x+s-1,R.i(y+1,y+h-dw-1),th+1,dw,1); }
      else { cut(x,y,w,s,d+1); cut(x,y+s+th-1,w,h-s-th+1,d+1); var dw2=[1,1,2,4][R.i(0,3)]; c.rect(R.i(x+1,x+w-dw2-1),y+s-1,dw2,th+1,1); } };
    cut(1,1,c.W-2,c.H-2,0); for(var k=0;k<2;k++){ var y=R.i(6,c.H-7); for(var x=2;x<c.W-2;x++)if(c.get(x,y)===1&&R.chance(0.9))c.set(x,y,3); for(var b=0;b<4;b++)c.set(R.i(3,c.W-4),y,4,3); } c.doors(0.01); });
  D('mage_rift_tower','Rift keep','A castle in a tower — Kris: "multiple connected turrets and hallways with an inner courtyard"; a rift cracks across the courtyard.',{built:1,liq:'chasm'},function(c){ var R=c.R; c.fill(0); var n=R.i(5,6), rx=c.W*0.36, ry=c.H*0.36, P=[];
    for(var k=0;k<n;k++){ var a=k/n*Math.PI*2+R.f()*0.2, x=c.cx+Math.cos(a)*rx, y=c.cy+Math.sin(a)*ry; P.push([x,y]); }
    P.forEach(function(p,k){ var q=P[(k+1)%n]; c.line(p[0],p[1],q[0],q[1],5,2,0); c.line(p[0],p[1],q[0],q[1],3,1); }); P.forEach(function(p){ c.room(p[0],p[1],4.6,R.chance(0.4)?5:1); });
    var inner=function(i,j){ var a=Math.atan2(j-c.cy,i-c.cx), d=Math.hypot((i-c.cx)/rx,(j-c.cy)/ry); return d<0.62; }; for(var j=0;j<c.H;j++)for(var i=0;i<c.W;i++)if(inner(i,j))c.set(i,j,5);
    for(var g=0;g<3;g++){ var p2=P[R.i(0,n-1)]; c.line(p2[0],p2[1],c.cx+(p2[0]-c.cx)*0.55,c.cy+(p2[1]-c.cy)*0.55,2,1); }
    var a0=R.f()*Math.PI; c.wiggle(c.cx-Math.cos(a0)*rx*0.55,c.cy-Math.sin(a0)*ry*0.55,c.cx+Math.cos(a0)*rx*0.55,c.cy+Math.sin(a0)*ry*0.55,2,3,2,5); c.set(c.cx,c.cy,4); c.set(c.cx+1,c.cy,4); });
  D('mage_crimson_spire','Narrowing spire','Kris: "every subsequent floor should be smaller than the previous. So the first floor should be very big and complicated, with upper floors becoming easier".',{built:1,s:function(fi,nf){ var k=1.18-fi*0.16; k=Math.max(0.55,k); return [Math.round(52*k),Math.round(52*k)]; }},function(c,fi){ var R=c.R; c.fill(0);
    var r0=c.W/2-1.5; c.disc(c.cx,c.cy,r0,2); c.rooms(2,2,c.W-4,c.H-4,Math.max(3,3+fi),0.2,function(i,j){ return Math.hypot(i+0.5-c.cx,j+0.5-c.cy)<r0-1; }); c.doors(0.07-fi*0.01); if(fi===0){ c.maze(Math.floor(c.cx-8),Math.floor(c.cy-8),17,17,2,1,0.15); } c.disc(c.cx,c.cy,2.5,5); });
  D('mage_astral_spire','Constellations','Kris: "the lattices should only have 2-6 cells together, and then should be connected by a series of long hallways to each other, so it looks like a constellation of stars together".',{built:1,liq:'stars'},function(c){ var R=c.R; c.fill(3); var K=[], n=5+R.i(0,2);
    for(var tr=0;tr<400&&K.length<n;tr++){ var x=R.i(8,c.W-9), y=R.i(7,c.H-8); if(K.some(function(p){ return Math.hypot(p[0]-x,p[1]-y)<12; }))continue; K.push([x,y]); var m=R.i(2,6); for(var q=0;q<m;q++)c.diamond(x+R.i(-4,4),y+R.i(-4,4),3,q===0?5:1); }
    for(var j=0;j<c.H;j++)for(var i=0;i<c.W;i++)if(c.get(i,j)===0)c.set(i,j,3);
    var used=[0]; for(var k2=1;k2<K.length;k2++){ var best=0, bd=1e9; used.forEach(function(a){ var d=Math.hypot(K[a][0]-K[k2][0],K[a][1]-K[k2][1]); if(d<bd){ bd=d; best=a; } }); c.line(K[best][0],K[best][1],K[k2][0],K[k2][1],1,4,3); used.push(k2); }
    if(K.length>3)c.line(K[1][0],K[1][1],K[K.length-1][0],K[K.length-1][1],1,4,3); });
  // ── Castles ──
  D('castle_q1_b','Thorn bailey','An outer wall with corner towers round a courtyard grown into a hedge maze, the keep\'s rooms in the middle.',{built:1},function(c){ var R=c.R; c.fill(0); c.box(2,2,c.W-4,c.H-4,5); [[4,4],[c.W-5,4],[4,c.H-5],[c.W-5,c.H-5]].forEach(function(p){ c.room(p[0],p[1],3.6,1); });
    var kw=Math.floor(c.W*0.36), kh=Math.floor(c.H*0.4), kx=Math.floor(c.cx-kw/2), ky=Math.floor(c.cy-kh/2); for(var j=4;j<c.H-4;j+=2)for(var i=4;i<c.W-4;i+=2){ if(i>kx-2&&i<kx+kw+1&&j>ky-2&&j<ky+kh+1)continue; if(R.chance(0.42)){ c.set(i,j,6); if(R.chance(0.5))c.set(i+1,j,6); else c.set(i,j+1,6); } }
    c.box(kx,ky,kw,kh,1); c.rooms(kx+1,ky+1,kw-2,kh-2,4,0.2); c.doors(0.03); c.rect(Math.floor(c.cx)-1,ky+kh-1,3,1,1); c.rect(Math.floor(c.cx)-1,c.H-3,3,1,1); });
  D('castle_q1_c','Sunflower','A round hall like the seed-head of a sunflower, long petal galleries all round it, each petal touching the next at its base.',{built:1},function(c){ var R=c.R; c.fill(0); var n=9, r=Math.min(c.W,c.H)*0.22;
    for(var p=0;p<n;p++){ var a=p/n*Math.PI*2, L=Math.min(c.W,c.H)*0.25; var ex=c.cx+Math.cos(a)*(r+L*0.55)*c.W/c.H, ey=c.cy+Math.sin(a)*(r+L*0.55); c.ell(ex,ey,L*0.32+1,L*0.32+1,2,0); c.ell(ex,ey,L*0.32,L*0.32,R.chance(0.3)?5:1); c.line(c.cx+Math.cos(a)*r*c.W/c.H,c.cy+Math.sin(a)*r,ex,ey,2,1); }
    c.disc(c.cx,c.cy,r+1,2); c.disc(c.cx,c.cy,r,1); for(var k=0;k<40;k++){ var a2=k*2.39996, d=Math.sqrt(k)/Math.sqrt(40)*(r-1.5); c.set(c.cx+Math.cos(a2)*d,c.cy+Math.sin(a2)*d,k%5===0?6:5); } for(var g=0;g<n;g++){ var a3=g/n*Math.PI*2; c.disc(c.cx+Math.cos(a3)*r*c.W/c.H,c.cy+Math.sin(a3)*r,1.3,1,2); } });
  D('castle_q1_d','Pinwheel mill','Four long wings bent like the sails of a windmill, turning round a hub; their tips are joined by a walk round part of the outside.',{built:1},function(c){ var R=c.R; c.fill(0); var L=Math.min(c.W,c.H)*0.42;
    for(var p=0;p<4;p++){ var a=p*Math.PI/2+0.15, ex=c.cx+Math.cos(a)*L*c.W/c.H, ey=c.cy+Math.sin(a)*L, bx=ex+Math.cos(a+Math.PI/2)*L*0.55*c.W/c.H, by=ey+Math.sin(a+Math.PI/2)*L*0.55;
      c.line(c.cx,c.cy,ex,ey,7,2,0); c.line(ex,ey,bx,by,7,2,0); c.line(c.cx,c.cy,ex,ey,5,1); c.line(ex,ey,bx,by,5,R.chance(0.4)?5:1); c.room(bx,by,3.6,1); for(var t=0.25;t<1;t+=0.25){ c.line(c.cx+(ex-c.cx)*t+Math.cos(a+Math.PI/2)*2.5,c.cy+(ey-c.cy)*t+Math.sin(a+Math.PI/2)*2.5,c.cx+(ex-c.cx)*t-Math.cos(a+Math.PI/2)*2.5,c.cy+(ey-c.cy)*t-Math.sin(a+Math.PI/2)*2.5,1,2,1); c.set(c.cx+(ex-c.cx)*t,c.cy+(ey-c.cy)*t,1); } }
    c.room(c.cx,c.cy,5,5); var s=R.i(0,3); for(var k=0;k<2;k++){ var a1=(s+k)*Math.PI/2+0.15, a2=(s+k+1)*Math.PI/2+0.15; c.line(c.cx+Math.cos(a1)*L*c.W/c.H+Math.cos(a1+Math.PI/2)*L*0.55*c.W/c.H,c.cy+Math.sin(a1)*L+Math.sin(a1+Math.PI/2)*L*0.55,c.cx+Math.cos(a2)*L*c.W/c.H,c.cy+Math.sin(a2)*L,2,1,0); } });
  D('castle_q2_b','Lotus court','Halls in a ring round a lotus pond; stepping-stone paths cross the water to a pavilion in the middle.',{built:1,liq:'water'},function(c){ var R=c.R; c.fill(2); c.rooms(2,2,c.W-4,c.H-4,5,0.25,function(i,j){ var dx=(i-c.cx)/(c.W*0.3), dy=(j-c.cy)/(c.H*0.3); return dx*dx+dy*dy>1; }); c.doors(0.05);
    c.ell(c.cx,c.cy,c.W*0.3,c.H*0.3,1); c.ell(c.cx,c.cy,c.W*0.27,c.H*0.27,3); c.disc(c.cx,c.cy,4,5); for(var k=0;k<4;k++){ var a=k*Math.PI/2+R.f()*0.5, P=[[c.cx+Math.cos(a)*c.W*0.28,c.cy+Math.sin(a)*c.H*0.28]]; for(var s=1;s<6;s++){ var t=s/6; P.push([P[0][0]+(c.cx-P[0][0])*t+R.i(-1,1),P[0][1]+(c.cy-P[0][1])*t+R.i(-1,1)]); } P.forEach(function(p){ c.set(p[0],p[1],4); c.set(p[0]+1,p[1],4,3); }); c.path(P,1,4,3); }
    for(var g=0;g<6;g++){ var a2=R.f()*Math.PI*2; c.disc(c.cx+Math.cos(a2)*c.W*0.31,c.cy+Math.sin(a2)*c.H*0.31,1.5,1,2); } });
  D('castle_q2_c','Abbey wings','Kris: "different wings for the castle, and you need to go from wing to wing through some of the turrets, or perhaps a long hallway that connects from the middle of one of the wings to another". A cloister garth between them.',{built:1},function(c){ var R=c.R; c.fill(0);
    var Wg=[[3,3,Math.floor(c.W*0.42),Math.floor(c.H*0.36)],[Math.floor(c.W*0.55),3,Math.floor(c.W*0.42),Math.floor(c.H*0.28)],[3,Math.floor(c.H*0.55),Math.floor(c.W*0.32),Math.floor(c.H*0.42)],[Math.floor(c.W*0.5),Math.floor(c.H*0.52),Math.floor(c.W*0.47),Math.floor(c.H*0.44)]];
    Wg.forEach(function(w){ c.box(w[0],w[1],w[2],w[3],2); c.rooms(w[0]+1,w[1]+1,w[2]-2,w[3]-2,4,0.25); }); c.doors(0.05);
    var T=[]; Wg.forEach(function(w,i){ var tx=i%2?w[0]:w[0]+w[2]-1, ty=i<2?w[1]+w[3]-1:w[1]; T.push([tx,ty]); c.room(tx,ty,3.4,5); });
    [[0,1],[1,3],[2,3]].forEach(function(e){ c.line(T[e[0]][0],T[e[0]][1],T[e[1]][0],T[e[1]][1],3,2,0); c.line(T[e[0]][0],T[e[0]][1],T[e[1]][0],T[e[1]][1],1,1); });
    var a=Wg[0], b=Wg[3]; c.line(a[0]+a[2]/2,a[1]+a[3]/2,b[0]+b[2]/2,b[1]+b[3]/2,4,2,0); c.line(a[0]+a[2]/2,a[1]+a[3]/2,b[0]+b[2]/2,b[1]+b[3]/2,2,1);
    c.box(Math.floor(c.W*0.37),Math.floor(c.H*0.4),Math.floor(c.W*0.14),Math.floor(c.H*0.16),5); });
  D('castle_q2_d','Mangrove roots','Tree-houses on great mangrove trunks in a flooded hall, joined by twisting root-walks; one trunk at each end of a cross.',{built:1,liq:'swamp'},function(c){ var R=c.R; c.fill(3); var P=[[c.cx,c.cy],[c.cx,6],[c.cx,c.H-7],[7,c.cy],[c.W-8,c.cy]];
    for(var k=0;k<5;k++)P.push([R.i(8,c.W-9),R.i(7,c.H-8)]); P.forEach(function(p,i){ c.disc(p[0],p[1],i<5?5:3.2,1); c.set(p[0],p[1],6); if(i<5)c.disc(p[0]+2,p[1]+1,2,5); });
    for(var k2=1;k2<5;k2++)c.wiggle(P[0][0],P[0][1],P[k2][0],P[k2][1],2,4,3,3); for(var k3=5;k3<P.length;k3++){ var best=0, bd=1e9; for(var j=0;j<k3;j++){ var d=Math.hypot(P[j][0]-P[k3][0],P[j][1]-P[k3][1]); if(d<bd){ bd=d; best=j; } } c.wiggle(P[best][0],P[best][1],P[k3][0],P[k3][1],1,4,2,3); } });
  D('castle_q3_b','Anvil forge','Forge galleries in bands, lava runnels between them; the great anvil-hall (a broad T) sits across the middle.',{built:1,liq:'lava'},function(c){ var R=c.R; c.fill(2); var n=4, bh=Math.floor((c.H-2)/n);
    for(var b=0;b<n;b++){ var y0=1+b*bh; c.rooms(2,y0+1,c.W-4,bh-3,4,0.2); c.rect(2,y0+bh-1,c.W-4,1,3); } c.doors(0.04); for(var b2=0;b2<n-1;b2++){ var y1=1+b2*bh+bh-1; for(var k=0;k<2;k++){ var bx=R.i(4,c.W-6); c.rect(bx,y1-1,2,3,4,3); c.rect(bx,y1-1,2,3,1,2); } }
    c.rect(Math.floor(c.W*0.25),Math.floor(c.H*0.38),Math.floor(c.W*0.5),5,5); c.rect(Math.floor(c.cx)-3,Math.floor(c.H*0.38),7,Math.floor(c.H*0.3),5); });
  D('castle_q3_c','Glacier cross','Four ice wings round a frozen hall; crevasses split the wings on the slant, ice bridges over them.',{built:1,liq:'chasm'},function(c){ var R=c.R; c.fill(0); var aw=Math.floor(Math.min(c.W,c.H)*0.32); c.box(1,Math.floor(c.cy-aw/2),c.W-2,aw,1); c.box(Math.floor(c.cx-aw/2),1,aw,c.H-2,1);
    c.rooms(2,Math.floor(c.cy-aw/2)+1,c.W-4,aw-2,4,0.3); c.rooms(Math.floor(c.cx-aw/2)+1,2,aw-2,c.H-4,4,0.3); c.doors(0.06); c.rect(Math.floor(c.cx-aw/2)+1,Math.floor(c.cy-aw/2)+1,aw-2,aw-2,5);
    for(var k=0;k<4;k++){ var x=k%2?R.i(Math.floor(c.cx+aw/2)+3,c.W-6):R.i(4,Math.floor(c.cx-aw/2)-4), y=k<2?Math.floor(c.cy):R.i(4,c.H-5); if(k>=2)x=Math.floor(c.cx); else y=Math.floor(c.cy); var a=k<2?1.2:0.4; c.line(x-Math.cos(a)*aw*0.5,y-Math.sin(a)*aw*0.5,x+Math.cos(a)*aw*0.5,y+Math.sin(a)*aw*0.5,1,3,1); c.line(x-Math.cos(a)*aw*0.5,y-Math.sin(a)*aw*0.5,x+Math.cos(a)*aw*0.5,y+Math.sin(a)*aw*0.5,1,3,5); c.set(x,y,4); c.set(x+1,y,4); } });
  D('castle_q3_d','Eyrie ring','Kris: "a big pit in the middle of each floor that you can\'t go through. Also, the walls of the castle should actually be entire rooms and hallways that connect from turret to turret, and sometimes the stairs are in those hallways".',{built:1,liq:'chasm',near:0.7},function(c){ var R=c.R; c.fill(0); var b=Math.floor(Math.min(c.W,c.H)*0.2);
    c.box(1,1,c.W-2,c.H-2,1); c.rect(1+b,1+b,c.W-2-b*2,c.H-2-b*2,0); c.rooms(2,2,c.W-4,b-2,3,0.2); c.rooms(2,c.H-b,c.W-4,b-2,3,0.2); c.rooms(2,b,b-2,c.H-b*2,3,0.2); c.rooms(c.W-b,b,b-2,c.H-b*2,3,0.2); c.doors(0.08);
    c.rect(b-1,1+b,1,c.H-2-b*2,2); c.rect(c.W-b,1+b,1,c.H-2-b*2,2); c.rect(1+b,b-1,c.W-2-b*2,1,2); c.rect(1+b,c.H-b,c.W-2-b*2,1,2);
    [[b/2+1,b/2+1],[c.W-b/2-2,b/2+1],[b/2+1,c.H-b/2-2],[c.W-b/2-2,c.H-b/2-2],[c.cx,b/2+1],[c.cx,c.H-b/2-2]].forEach(function(p){ c.room(p[0],p[1],b*0.55,5); });
    c.rect(b,b,c.W-b*2,c.H-b*2,1); c.rect(b+3,b+3,c.W-b*2-6,c.H-b*2-6,3); for(var k=0;k<4;k++){ var x=R.i(b+1,c.W-b-2), side=k%2; c.set(x,side?b-1:c.H-b,1); } c.set(b-1,Math.floor(c.cy),1); c.set(c.W-b,Math.floor(c.cy)+2,1); });
  D('castle_q4_b','Obsidian star-wings','Kris: "not always having 4 wings, changing the number of wings, and sometime having an even larger great room in the middle" — three to six wings, a great hall that grows.',{built:1},function(c,fi){ var R=c.R; c.fill(0); var n=[3,5,6,4][(fi+R.i(0,3))%4], big=R.chance(0.5), gr=Math.min(c.W,c.H)*(big?0.24:0.15), L=Math.min(c.W,c.H)*0.46;
    for(var p=0;p<n;p++){ var a=p/n*Math.PI*2+R.f()*0.5, ex=c.cx+Math.cos(a)*L*c.W/c.H, ey=c.cy+Math.sin(a)*L, ww=R.i(7,10); c.line(c.cx,c.cy,ex,ey,ww,2,0); c.line(c.cx,c.cy,ex,ey,ww-2,1);
      for(var t=0.45;t<0.95;t+=0.18){ var px=c.cx+(ex-c.cx)*t, py=c.cy+(ey-c.cy)*t; c.line(px+Math.cos(a+Math.PI/2)*(ww/2-1),py+Math.sin(a+Math.PI/2)*(ww/2-1),px-Math.cos(a+Math.PI/2)*(ww/2-1),py-Math.sin(a+Math.PI/2)*(ww/2-1),1,2,1); c.set(px+Math.cos(a+Math.PI/2)*R.i(-2,2),py+Math.sin(a+Math.PI/2)*R.i(-2,2),1); } c.room(ex,ey,ww/2+1,R.chance(0.5)?5:1); }
    c.disc(c.cx,c.cy,gr+1,2); c.disc(c.cx,c.cy,gr,1); c.disc(c.cx,c.cy,gr*0.5,5); for(var q=0;q<n;q++){ var a2=q/n*Math.PI*2+0.3; c.set(c.cx+Math.cos(a2)*gr*0.75,c.cy+Math.sin(a2)*gr*0.75,6); } });
  D('castle_q4_c','Cinder halls','Burnt-out halls: whole sections of roof have come down in heaps of rubble, and cracks of fire run across the floors.',{built:1,liq:'lava'},function(c){ var R=c.R; c.fill(2); c.rooms(2,2,c.W-4,c.H-4,5,0.15); c.doors(0.05);
    for(var k=0;k<6;k++){ var x=R.i(6,c.W-7), y=R.i(6,c.H-7), r=R.i(2,4); for(var j=-r;j<=r;j++)for(var i=-r;i<=r;i++)if(Math.hypot(i,j)<=r&&R.chance(0.55)&&c.get(x+i,y+j)===1)c.set(x+i,y+j,6); }
    for(var q=0;q<3;q++)c.wiggle(R.i(3,c.W-4),R.i(3,c.H-4),R.i(3,c.W-4),R.i(3,c.H-4),1,3,3,1); for(var b=0;b<10;b++){ var bx=R.i(3,c.W-4), by=R.i(3,c.H-4); if(c.get(bx,by)===3)c.set(bx,by,4); } });
  D('castle_q4_d','Bonefall galleries','Kris: "don\'t make it so repeating long lines. Make the galleries different sizes and shapes, and the bridges longer and shorter" — galleries of every shape over the drop.',{built:1,liq:'chasm'},function(c){ var R=c.R; c.fill(3); var P=[], n=9+R.i(0,3);
    for(var k=0;k<n;k++){ var x=R.i(7,c.W-8), y=R.i(6,c.H-7), sh=R.i(0,2), w=R.i(5,14), h=R.i(4,9); if(sh===0){ c.box(Math.round(x-w/2),Math.round(y-h/2),w,h,R.chance(0.3)?5:1); } else if(sh===1){ c.ell(x,y,w/2+1,h/2+1,2,3); c.ell(x,y,w/2,h/2,1); } else { c.box(Math.round(x-w/2),Math.round(y-2),w,4,1); c.box(Math.round(x-2),Math.round(y-h/2),4,h,1); } P.push([x,y]); }
    var used=[0]; for(var k2=1;k2<P.length;k2++){ var best=0, bd=1e9; used.forEach(function(a){ var d=Math.hypot(P[a][0]-P[k2][0],P[a][1]-P[k2][1]); if(d<bd){ bd=d; best=a; } }); c.line(P[best][0],P[best][1],P[k2][0],P[k2][1],R.chance(0.5)?1:2,4,3); used.push(k2); }
    for(var e=0;e<3;e++){ var a2=R.i(0,n-1), b=R.i(0,n-1); if(a2!==b)c.line(P[a2][0],P[a2][1],P[b][0],P[b][1],1,4,3); } c.doors(0.05); });
  // ── Familiar islands ──
  D('isle_1','Smugglers\' sea caves','Sea caves where the tide runs in channels; wooden docks and piers reach out over the water, a hidden smugglers\' store behind the rock.',{liq:'water',secrets:1},function(c){ var R=c.R; c.cave(1,1,c.W-2,c.H-2,0.44,4);
    for(var k=0;k<3;k++){ var y=R.i(6,c.H-7); for(var x=1;x<c.W-1;x++){ var yy=Math.round(y+Math.sin(x*0.15+k*2)*3); for(var t=0;t<3;t++)if(c.get(x,yy+t)===1)c.set(x,yy+t,3); } }
    for(var p=0;p<10;p++){ var px=R.i(4,c.W-5), py=R.i(4,c.H-5); if(c.get(px,py)!==3)continue; var d=R.chance(0.5)?1:-1; for(var s=0;s<6;s++){ if(c.get(px,py+s*d)===3)c.set(px,py+s*d,4); if(c.get(px+1,py+s*d)===3)c.set(px+1,py+s*d,4); } } });
  D('isle_2','Bog warrens','Burrows in the bog: many small round chambers, tight tunnels between them, pools of mud you skirt round.',{liq:'swamp'},function(c){ var R=c.R; c.fill(2); var P=[], n=22+R.i(0,6);
    for(var k=0;k<n;k++){ var x=R.i(5,c.W-6), y=R.i(5,c.H-6), r=R.i(2,4); P.push([x,y]); c.disc(x,y,r,R.chance(0.2)?5:1); if(r>3&&R.chance(0.4))c.disc(x,y,1.5,3); }
    var used=[0]; for(var k2=1;k2<P.length;k2++){ var best=0, bd=1e9; used.forEach(function(a){ var d=Math.hypot(P[a][0]-P[k2][0],P[a][1]-P[k2][1]); if(d<bd){ bd=d; best=a; } }); c.wiggle(P[best][0],P[best][1],P[k2][0],P[k2][1],R.chance(0.6)?1:2,1,1.5); used.push(k2); }
    for(var e=0;e<5;e++){ var a=R.i(0,n-1), b=R.i(0,n-1); if(a!==b&&Math.hypot(P[a][0]-P[b][0],P[a][1]-P[b][1])<18)c.wiggle(P[a][0],P[a][1],P[b][0],P[b][1],1,1,1.5); } });
  D('isle_3','Ember crypt maze','Below the Ember Cave: a burial maze where cracks of fire have split the walls — two ways through, and a crack that is only a crack until you look closer.',{liq:'lava',secrets:3},function(c){ var R=c.R; c.maze(1,1,c.W-2,c.H-2,2,1,0.2);
    for(var k=0;k<4;k++){ var x0=R.i(3,c.W-4), y0=R.i(3,c.H-4), a=R.f()*Math.PI; for(var s=0;s<14;s++){ var x=Math.round(x0+Math.cos(a)*s), y=Math.round(y0+Math.sin(a)*s); if(c.get(x,y)===2)c.set(x,y,3); a+=R.f()*0.4-0.2; } }
    for(var r=0;r<4;r++){ var w=R.i(5,7), h=R.i(4,6), x1=R.i(2,c.W-w-2), y1=R.i(2,c.H-h-2); c.rect(x1,y1,w,h,R.chance(0.5)?5:1); } });
  D('isle_4','Frozen flood','Crypt halls under a frozen sea: the floors are ice over black water, broken through in holes you must walk round; burial alcoves line the walls.',{liq:'water'},function(c){ var R=c.R; c.fill(2); c.rooms(2,2,c.W-4,c.H-4,6,0.6); c.doors(0.05);
    for(var k=0;k<14;k++){ var x=R.i(4,c.W-5), y=R.i(4,c.H-5); if(c.get(x,y)!==5&&c.get(x,y)!==1)continue; c.ell(x,y,R.i(1,3),R.i(1,2),3,5); } for(var a=0;a<40;a++){ var ax=R.i(2,c.W-3), ay=R.i(2,c.H-3); if(c.get(ax,ay)===2&&c.walk(c.get(ax,ay+1))&&c.get(ax-1,ay)===2&&c.get(ax+1,ay)===2)c.set(ax,ay,6); } });
  D('ember_cave','Lava islands','The Ember Cave: a long chain of rock islands winding across a lake of fire, side islands off the chain, rope bridges between.',{liq:'lava'},function(c){ var R=c.R; c.fill(3); var P=[], n=12+R.i(0,3), x=6, y=R.i(8,c.H-9);
    for(var k=0;k<n;k++){ P.push([x,y]); var r=R.i(3,5); c.disc(x,y,r,1); c.disc(x+R.i(-2,2),y+R.i(-2,2),r-1,R.chance(0.25)?5:1); if(R.chance(0.3))c.set(x,y,6); x+=R.i(5,8); y+=R.i(-9,9); if(x>c.W-7){ x=R.i(6,c.W*0.3); } y=Math.max(6,Math.min(c.H-7,y)); }
    for(var k2=1;k2<n;k2++)c.line(P[k2-1][0],P[k2-1][1],P[k2][0],P[k2][1],1,4,3); for(var s=0;s<6;s++){ var b=P[R.i(0,n-1)], sx=b[0]+R.i(-10,10), sy=b[1]+R.i(-10,10); sx=Math.max(5,Math.min(c.W-6,sx)); sy=Math.max(5,Math.min(c.H-6,sy)); c.disc(sx,sy,R.i(2,3),5); c.line(b[0],b[1],sx,sy,1,4,3); } });
})(ZSP.T);
