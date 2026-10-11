// ═══════════════════════════════════════════════════════════════════════
// ║ 07zw-site-designs.js — ZSD: new layouts for every adventure site (round 44).
// ║ Kris (Oct 10): "towers, dungeons and other adventure sites are too small and too much of a repeated layout. Each adventure site should
// ║ have a very unique and special layout, as well as the coloration. Let's go back through and make a new redesign of adventure sites for me
// ║ to choose from in the lab." Answers (card): all site types at once · a design per individual site · 2–3× bigger · "the stairs up and down
// ║ should be in different places on the floors so you need to explore to figure out where these are, and sometimes it might be a bit of a
// ║ maze, especially in the dungeons".
// ║ ZSD.sites()            every adventure site: 10 towers, 10 dungeons, 16 mage towers, 12 island castles, 4 island crypts, the Ember Cave
// ║ ZSD.design(site, opt)  option 0–2 for that site: a layout family (no two options of a site share one), its own colours, one map per floor
// ║ A floor is a grid of tiles: 0 outside · 1 floor · 2 wall · 3 water / lava / chasm (by the site) · 4 bridge · 5 second floor (carpet,
// ║ courtyard, moss) · 6 pillar or rock. You arrive on a floor where you left the one below; the way on is placed far from it (the farthest
// ║ tenth of the walkable floor), so every floor has to be explored. Nothing here is used by the game yet: Kris picks in the Lab first
// ║ (lab/src/js/59-lab-asites.js), then the picked designs replace the old floor builders.
// ═══════════════════════════════════════════════════════════════════════
var ZSD={
  // floor size in tiles per kind of site, and the old floors' size (for "how much bigger")
  SIZE:{tower:[48,42],dungeon:[80,60],mage:[44,44],castle:[68,54],isle:[66,50],ember:[82,60]},
  OLD:{tower:[30,28],dungeon:[52,40],mage:[28,28],castle:[44,36],isle:[44,34],ember:[52,40]},
  ARCH:{ tower:['rings','cross','spiral','halls','twin','galleries'], dungeon:['labyrinth','caves','catacombs','flooded','islands','hub'],
    mage:['spiral','rings','star','lattice','twin'], castle:['bailey','cross','halls','galleries'], isle:['caves','flooded','catacombs','labyrinth'], ember:['islands','caves','labyrinth'] },
  NAMES:{ rings:'Concentric rings', cross:'Four wings', spiral:'Spiral', halls:'Halls and passages', twin:'Twin halls over a gulf', galleries:'Galleries and bridges',
    labyrinth:'Labyrinth', caves:'Winding caves', catacombs:'Catacombs', flooded:'Flooded halls', islands:'Islands and bridges', hub:'Ring and sunken hub',
    star:'Five-pointed star', lattice:'Crystal lattice', bailey:'Keep and bailey' },
  BLURB:{ rings:'Walls in rings round a central hall; doors in each ring are in different places, so you circle to find the way in or out.',
    cross:'A great hall with four wings, each split into rooms; courtyards in the corners.', spiral:'One long passage winding in towards the middle, rooms off its sides.',
    halls:'Rooms of every size joined by passages — a building, not a corridor.', twin:'Two round halls on either side of a gulf, one narrow bridge between them.',
    galleries:'Long galleries stacked over a drop; bridges between them zig-zag, never in a line.',
    labyrinth:'A true maze with a few loops and hidden chambers — the stairs are deep inside.', caves:'Natural caves of every width, side pockets and dead ends.',
    catacombs:'Long burial passages with crypts off both sides and many dead ends.', flooded:'Halls cut by channels of water; bridges decide your route.',
    islands:'Platforms in a lake of water, lava or darkness, joined by thin bridges.', hub:'A ring passage round a sunken central chamber, halls running out to the rooms beyond.',
    star:'Five arms round a central study; each arm ends in a sanctum.', lattice:'Diamond-shaped rooms meeting at their corners, like a crystal.',
    bailey:'An outer wall with corner towers round a courtyard, the keep in the middle split into rooms.' },
  sites:function(){ if(ZSD._s)return ZSD._s; var L=[], fl=typeof SITE_FLOORS!=='undefined'?SITE_FLOORS:{1:[4,5],2:[5,6],3:[6,7],4:[7,8]}, el=function(q){ return ['', 'grass','water','earth','fire'][q]||'storm'; };
    if(typeof SITE_ROSTER!=='undefined'){ var TS={}, DS={}; (typeof TOWER_STYLES!=='undefined'?TOWER_STYLES:[]).forEach(function(T){ TS[T.id]=T; }); (typeof DUNGEON_DESIGNS!=='undefined'?DUNGEON_DESIGNS:[]).forEach(function(D){ DS[D.id]=D; });
      [1,2,3,4].forEach(function(q){ SITE_ROSTER[q].forEach(function(r){ var D=r.kind==='tower'?TS[r.design]:DS[r.design]; if(!D)return;
        L.push({id:r.design,type:r.kind,name:D.name,q:q,boss:!!r.boss,floors:fl[q][r.boss?1:0],el:el(q),pal:ZSD.basePal(r.kind,D.pal,el(q)),tag:D.tagline||''}); }); }); }
    if(typeof MAGE_TOWERS!=='undefined')MAGE_TOWERS.forEach(function(M){ var key=M.key||M[0], q=M.q||M[1], nm=M.name||M[2]; L.push({id:'mage_'+key,type:'mage',name:nm,q:q,floors:3+Math.min(2,q-1),el:ZSD.mageEl(key),pal:null}); });
    if(typeof CASTLE_ISLANDS!=='undefined')Object.keys(CASTLE_ISLANDS).forEach(function(k){ var C=CASTLE_ISLANDS[k]; L.push({id:'castle_'+k,type:'castle',name:(C.castleName||C.name.replace(' Isle',''))+' Castle',isle:C.name,q:C.sec,floors:C.floors||2,el:el(C.sec),pal:null}); });
    var IN=typeof ISL_FAM_NAMES!=='undefined'?ISL_FAM_NAMES:{1:'Corsair Isle',2:'Bog Isle',3:'Ember Isle',4:'Frost Isle'}; [1,2,3,4].forEach(function(q){ L.push({id:'isle_'+q,type:'isle',name:IN[q].replace(' Isle','')+' Crypt',isle:IN[q],q:q,floors:2+Math.ceil(q/2),el:el(q),pal:null}); });
    L.push({id:'ember_cave',type:'ember',name:'The Ember Cave',q:4,floors:3,el:'fire',pal:null});
    L.forEach(function(s){ if(!s.pal)s.pal=ZSD.basePal(s.type,null,s.el); });
    return (ZSD._s=L); },
  mageEl:function(key){ var K={rime:'water',frost:'water',storm:'storm',thunder:'storm',sky:'storm',ember:'fire',flame:'fire',sun:'fire',bog:'grass',thorn:'grass',petal:'grass',stone:'earth',shard:'earth',crystal:'earth',void:'shadow',rift:'shadow',soul:'shadow',star:'storm',sea:'water',hearth:'fire',script:'storm',blizzard:'water',nova:'storm'}; for(var k in K)if(key.indexOf(k)>=0)return K[k]; return 'storm'; },
  // a palette for a site: floor, floor2, wall, wallTop, liquid, accent, glow, void
  basePal:function(type,P,el){ var E=typeof ZEL!=='undefined'&&ZEL.E[el]?ZEL.E[el].col:'#8a8a9a';
    if(P&&P.rockTop)return {floor:P.floorA,floor2:P.floorB,wall:P.rockFace,wallTop:P.rockTop,liquid:type==='dungeon'&&el==='fire'?'#ff7a2a':'#1f4a6a',accent:E,glow:E,void:P.void||'#0a0808'};
    if(P&&P.wallTop)return {floor:P.floorA,floor2:P.floorB,wall:P.wallFace,wallTop:P.wallTop,liquid:'#2a5a8a',accent:P.accent||E,glow:P.light||E,void:P.outside||'#1a1a2a'};
    var base={water:['#3a5a78','#4a6a8a','#2a3a50','#7ab0d0','#1a4a7a'],fire:['#4a2e26','#5e3a2e','#2e1a14','#8a5a40','#ff7a2a'],grass:['#4a5a3a','#5a6a44','#2e3a24','#8aa060','#2a5a4a'],earth:['#5a4a3a','#6a5a48','#3a2e24','#9a8468','#3a3a50'],storm:['#3a3a58','#4a4a6a','#24243a','#8a8ab0','#20204a'],shadow:['#2e2638','#3a3048','#1a1424','#6a5a80','#0e0a18']}[el]||['#4a4a4a','#5a5a5a','#2a2a2a','#8a8a8a','#1a2a3a'];
    return {floor:base[0],floor2:base[1],wall:base[2],wallTop:base[3],liquid:base[4],accent:E,glow:E,void:'#08080c'}; },
  // three colour treatments: 0 the site's own, 1 deeper and moodier, 2 a bold contrast of its element
  palOpt:function(P,opt,el){ if(opt===0)return P; var E=typeof ZEL!=='undefined'&&ZEL.E[el]?ZEL.E[el].col:P.accent, o={};
    if(opt===1){ Object.keys(P).forEach(function(k){ o[k]=ZSD.hue(P[k],-18,0.9,0.78); }); o.accent=ZSD.hue(E,0,1.1,1.05); o.glow=o.accent; return o; }
    Object.keys(P).forEach(function(k){ o[k]=ZSD.hue(P[k],40,1.15,k==='floor'||k==='floor2'?1.08:1); }); o.floor2=ZSD.mix(o.floor,E,0.28); o.accent=ZSD.hue(E,180,1,1.1); o.glow=E; return o; },
  hue:function(hex,dh,ks,kl){ var c=hexToRgb(hex), r=c[0]/255, g=c[1]/255, b=c[2]/255, mx=Math.max(r,g,b), mn=Math.min(r,g,b), h=0, s=0, l=(mx+mn)/2, d=mx-mn;
    if(d){ s=l>0.5?d/(2-mx-mn):d/(mx+mn); h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4; h*=60; }
    h=(h+dh+360)%360; s=Math.max(0,Math.min(1,s*ks)); l=Math.max(0,Math.min(1,l*kl)); var q=l<0.5?l*(1+s):l+s-l*s, p=2*l-q, f=function(t){ t=(t%1+1)%1; return t<1/6?p+(q-p)*6*t:t<0.5?q:t<2/3?p+(q-p)*(2/3-t)*6:p; };
    return rgbToHex(f(h/360+1/3)*255,f(h/360)*255,f(h/360-1/3)*255); },
  mix:function(a,b,t){ var A=hexToRgb(a), B=hexToRgb(b); return rgbToHex(A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[2]+(B[2]-A[2])*t); },
  seed:function(s){ var n=7; for(var i=0;i<s.length;i++)n=(n*31+s.charCodeAt(i))>>>0; return n; },
  // which three layout families a site gets (different from each other, chosen per site so neighbours differ)
  archOf:function(site){ var A=ZSD.ARCH[site.type].slice(), R=rngOf(ZSD.seed(site.id)+5), o=[]; while(o.length<3&&A.length)o.push(A.splice(R.i(0,A.length-1),1)[0]); while(o.length<3)o.push(o[0]); return o; },
  design:function(site,opt){ var key=site.id+'|'+opt; ZSD._d=ZSD._d||{}; if(ZSD._d[key])return ZSD._d[key]; var arch=ZSD.archOf(site)[opt], sz=ZSD.SIZE[site.type], R=rngOf(ZSD.seed(site.id)*7+opt*1013+11), floors=[], prev=null;
    for(var f=0;f<site.floors;f++){ var F=ZSD.floor(arch,sz[0],sz[1],rngOf(ZSD.seed(site.id)+f*7919+opt*104729),site.type,f,site.floors); if(prev&&prev.down)ZSD.landing(F,prev.down,R); ZSD.stairs(F,prev,R,f===site.floors-1); floors.push(F); prev=F; }
    var o={site:site,opt:opt,arch:arch,name:ZSD.NAMES[arch],blurb:ZSD.BLURB[arch],pal:ZSD.palOpt(site.pal,opt,site.el),floors:floors,w:sz[0],h:sz[1],bigger:Math.round(sz[0]*sz[1]/(ZSD.OLD[site.type][0]*ZSD.OLD[site.type][1])*10)/10};
    var ks=Object.keys(ZSD._d); if(ks.length>90)delete ZSD._d[ks[0]]; return (ZSD._d[key]=o); },
  // ── one floor ──
  floor:function(arch,W,H,R,type,fi,nf){ var g=new Uint8Array(W*H), F={w:W,h:H,g:g,arch:arch}, I=function(x,y){ return y*W+x; }, inb=function(x,y){ return x>0&&y>0&&x<W-1&&y<H-1; };
    var fill=function(v){ g.fill(v); }, rect=function(x,y,w,h,v){ for(var j=y;j<y+h;j++)for(var i=x;i<x+w;i++)if(inb(i,j))g[I(i,j)]=v; }, disc=function(cx,cy,r,v,only){ for(var j=Math.floor(cy-r);j<=cy+r;j++)for(var i=Math.floor(cx-r);i<=cx+r;i++)if(inb(i,j)&&(i+0.5-cx)*(i+0.5-cx)+(j+0.5-cy)*(j+0.5-cy)<=r*r&&(only===undefined||g[I(i,j)]===only))g[I(i,j)]=v; };
    var line=function(x0,y0,x1,y1,wd,v,only){ var n=Math.ceil(Math.hypot(x1-x0,y1-y0)*2)+1; for(var k=0;k<=n;k++){ var x=x0+(x1-x0)*k/n, y=y0+(y1-y0)*k/n; for(var j=Math.floor(y-wd/2+0.5);j<Math.floor(y-wd/2+0.5)+wd;j++)for(var i=Math.floor(x-wd/2+0.5);i<Math.floor(x-wd/2+0.5)+wd;i++)if(inb(i,j)&&(only===undefined||g[I(i,j)]===only))g[I(i,j)]=v; } };
    var cx=W/2, cy=H/2, liq=type==='dungeon'||type==='isle'||type==='ember';
    var bsp=function(x,y,w,h,min,out){ if((w<min*2+1&&h<min*2+1)||(w*h<min*min*3&&R.chance(0.5))){ out.push([x,y,w,h]); return; } var vert=w>h*1.2?true:h>w*1.2?false:R.chance(0.5);
      if(vert&&w>=min*2+1){ var s=R.i(min,w-min-1); bsp(x,y,s,h,min,out); bsp(x+s+1,y,w-s-1,h,min,out); } else if(!vert&&h>=min*2+1){ var t=R.i(min,h-min-1); bsp(x,y,w,t,min,out); bsp(x,y+t+1,w,h-t-1,min,out); } else out.push([x,y,w,h]); };
    var rooms=function(x,y,w,h,min,v2){ var L=[]; bsp(x,y,w,h,min,L); L.forEach(function(r,i){ rect(r[0],r[1],r[2],r[3],(v2&&R.chance(0.3))?5:1); }); return L; };
    // doors between rooms that touch across one wall tile
    var doors=function(){ for(var k=0;k<W*H*0.04;k++){ var x=R.i(2,W-3), y=R.i(2,H-3); if(g[I(x,y)]!==2)continue; var h1=g[I(x-1,y)], h2=g[I(x+1,y)], v1=g[I(x,y-1)], v2=g[I(x,y+1)], w=function(a){ return a===1||a===5; }; if((w(h1)&&w(h2))||(w(v1)&&w(v2)))g[I(x,y)]=1; } };
    if(arch==='halls'){ fill(2); rooms(2,2,W-4,H-4,5,true); doors(); }
    else if(arch==='rings'){ fill(0); var r0=Math.min(W,H)/2-1.5; disc(cx,cy,r0,2); disc(cx,cy,r0-1,1); var nR=3+(R.chance(0.5)?1:0);
      for(var k=1;k<nR;k++){ var rr=r0*k/nR; for(var a=0;a<360;a+=0.5){ var t=a*Math.PI/180; var x=Math.floor(cx+Math.cos(t)*rr), y=Math.floor(cy+Math.sin(t)*rr); if(inb(x,y))g[I(x,y)]=2; }
        var gaps=1+R.i(0,1); for(var q=0;q<gaps;q++){ var ga=R.f()*Math.PI*2; disc(cx+Math.cos(ga)*rr,cy+Math.sin(ga)*rr,1.6,1,2); }
        var sp=R.i(3,6); for(var s=0;s<sp;s++){ var sa=R.f()*Math.PI*2; line(cx+Math.cos(sa)*rr,cy+Math.sin(sa)*rr,cx+Math.cos(sa)*(rr+r0/nR),cy+Math.sin(sa)*(rr+r0/nR),1,2,1); } }
      disc(cx,cy,r0/nR*0.6,5,1); }
    else if(arch==='cross'){ fill(0); var aw=Math.floor(Math.min(W,H)*0.3); rect(1,Math.floor(cy-aw/2),W-2,aw,2); rect(Math.floor(cx-aw/2),1,aw,H-2,2);
      rooms(2,Math.floor(cy-aw/2)+1,W-4,aw-2,4,true); rooms(Math.floor(cx-aw/2)+1,2,aw-2,H-4,4,true); rect(Math.floor(cx-aw/2)+1,Math.floor(cy-aw/2)+1,aw-2,aw-2,5); doors();
      [[2,2],[W-2-Math.floor((W-aw)/2)+2,2],[2,H-Math.floor((H-aw)/2)],[W-Math.floor((W-aw)/2),H-Math.floor((H-aw)/2)]].forEach(function(p){ if(R.chance(0.7)){ var cw=Math.floor((W-aw)/2)-4, ch=Math.floor((H-aw)/2)-4; if(cw>4&&ch>4){ rect(p[0],p[1],cw,ch,2); rect(p[0]+1,p[1]+1,cw-2,ch-2,5); var side=R.chance(0.5); line(p[0]+cw/2,p[1]+ch/2,side?cx:p[0]+cw/2,side?p[1]+ch/2:cy,2,1,2); } } }); }
    else if(arch==='spiral'){ fill(2); var r1=Math.min(W,H)/2-2, turns=2.6+R.f()*0.8, pts=[]; for(var t2=0;t2<=1;t2+=0.002){ var ang=t2*turns*Math.PI*2+R.f()*0, rad=r1*(1-t2)+2; pts.push([cx+Math.cos(ang)*rad,cy+Math.sin(ang)*rad*H/W*1.05]); }
      for(var p2=1;p2<pts.length;p2++)line(pts[p2-1][0],pts[p2-1][1],pts[p2][0],pts[p2][1],3,1);
      for(var al=0;al<14;al++){ var pi=R.i(20,pts.length-40), P=pts[pi], nx=P[0]-cx, ny=P[1]-cy, nl=Math.hypot(nx,ny)||1, out=R.chance(0.5)?3.5:-3.5; disc(P[0]+nx/nl*out,P[1]+ny/nl*out,R.i(2,3),R.chance(0.3)?5:1,2); }
      disc(cx,cy,3.5,5); }
    else if(arch==='twin'){ fill(liq||type==='mage'||type==='tower'?3:0); var rA=Math.min(W*0.26,H*0.45); var ax=W*0.27, bx=W*0.73; disc(ax,cy,rA,2); disc(bx,cy,rA,2); disc(ax,cy,rA-1,1); disc(bx,cy,rA-1,1); [ax,bx].forEach(function(qx){ var x0=Math.floor(qx-rA*0.62), y0=Math.floor(cy-rA*0.62), sz=Math.floor(rA*1.24); rect(x0,y0,sz,sz,2); rooms(x0+1,y0+1,sz-2,sz-2,4,true); }); doors();
      var by=cy+R.i(-Math.floor(rA*0.6),Math.floor(rA*0.6)); line(ax+rA-2,by,bx-rA+2,by,2,4,3); line(ax+rA-2,by,bx-rA+2,by,2,4,0); if(R.chance(0.5)){ var by2=cy+(by>cy?-1:1)*rA*0.7; line(ax+rA-3,by2,bx-rA+3,by2,1,4,3); } }
    else if(arch==='galleries'){ fill(liq?3:0); var bands=4+(H>50?1:0), bh=Math.floor((H-2)/bands);
      for(var b=0;b<bands;b++){ var y0=1+b*bh, gh=bh-3; rect(2,y0,W-4,gh,2); rooms(3,y0+1,W-6,gh-2,4,false); doors(); }
      for(var b2=0;b2<bands-1;b2++){ var y1=1+b2*bh+bh-4, bx2=b2%2?R.i(4,Math.floor(W*0.35)):R.i(Math.floor(W*0.65),W-6); line(bx2,y1,bx2,y1+4,2,4); g[I(bx2,y1)]=1; } }
    else if(arch==='labyrinth'){ fill(2); var cs=3, gw=Math.floor((W-2)/cs), gh2=Math.floor((H-2)/cs), seen=new Uint8Array(gw*gh2), st=[[R.i(0,gw-1),R.i(0,gh2-1)]];
      var cell=function(x,y){ rect(1+x*cs,1+y*cs,cs-1,cs-1,1); }; seen[st[0][1]*gw+st[0][0]]=1; cell(st[0][0],st[0][1]);
      while(st.length){ var c=st[st.length-1], nb=[[1,0],[-1,0],[0,1],[0,-1]].filter(function(d){ var x=c[0]+d[0], y=c[1]+d[1]; return x>=0&&y>=0&&x<gw&&y<gh2&&!seen[y*gw+x]; }); if(!nb.length){ st.pop(); continue; }
        var d=nb[R.i(0,nb.length-1)], nx2=c[0]+d[0], ny2=c[1]+d[1]; seen[ny2*gw+nx2]=1; cell(nx2,ny2); rect(1+c[0]*cs+(d[0]>0?cs-1:0),1+c[1]*cs+(d[1]>0?cs-1:0),d[0]?1:cs-1,d[1]?1:cs-1,1); if(d[0]<0)rect(1+nx2*cs+cs-1,1+ny2*cs,1,cs-1,1); if(d[1]<0)rect(1+nx2*cs,1+ny2*cs+cs-1,cs-1,1,1); st.push([nx2,ny2]); }
      for(var br=0;br<gw*gh2*0.06;br++){ var x3=R.i(1,gw-2), y3=R.i(1,gh2-2); if(R.chance(0.5))rect(1+x3*cs+cs-1,1+y3*cs,1,cs-1,1); else rect(1+x3*cs,1+y3*cs+cs-1,cs-1,1,1); }      // a few loops
      for(var ch2=0;ch2<3+R.i(0,2);ch2++){ var cw2=R.i(3,4), chh=R.i(2,3), x4=R.i(0,gw-cw2), y4=R.i(0,gh2-chh); rect(1+x4*cs,1+y4*cs,cw2*cs-1,chh*cs-1,R.chance(0.5)?5:1); } }
    else if(arch==='caves'){ for(var i3=0;i3<W*H;i3++)g[i3]=R.chance(0.47)?2:1; for(var it=0;it<5;it++){ var n2=new Uint8Array(W*H); for(var y5=0;y5<H;y5++)for(var x5=0;x5<W;x5++){ var wc=0; for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){ var xx=x5+dx, yy=y5+dy; if(xx<0||yy<0||xx>=W||yy>=H||g[I(xx,yy)]===2)wc++; } n2[I(x5,y5)]=wc>=5?2:1; } g.set(n2); }
      for(var x6=0;x6<W;x6++){ g[I(x6,0)]=2; g[I(x6,H-1)]=2; } for(var y6=0;y6<H;y6++){ g[I(0,y6)]=2; g[I(W-1,y6)]=2; }
      if(liq)for(var pl=0;pl<3;pl++)disc(R.i(8,W-8),R.i(8,H-8),R.i(2,4),3,1); for(var pr=0;pr<W*H*0.004;pr++){ var x7=R.i(2,W-3), y7=R.i(2,H-3); if(g[I(x7,y7)]===1)g[I(x7,y7)]=6; } }
    else if(arch==='catacombs'){ fill(2); var sp2=7; for(var yy2=4;yy2<H-3;yy2+=sp2)line(2,yy2,W-3,yy2,2,1); for(var xx2=4+R.i(0,6);xx2<W-3;xx2+=R.i(9,14))line(xx2,3,xx2,H-4,2,1);
      for(var k2=0;k2<W*H*0.012;k2++){ var x8=R.i(3,W-6), y8=R.i(3,H-6); if(g[I(x8,y8)]!==1)continue; var up=R.chance(0.5), sz2=R.i(2,3); var ox=x8-1, oy=up?y8-sz2-2:y8+3; if(oy<2||oy+sz2>H-2)continue; rect(ox,oy,sz2+1,sz2,R.chance(0.25)?5:1); line(x8,y8,x8,up?oy+sz2:oy,1,1); }
      for(var cut=0;cut<W*H*0.002;cut++){ var x9=R.i(3,W-4), y9=R.i(3,H-4); if(g[I(x9,y9)]===1&&g[I(x9-1,y9)]===1&&g[I(x9+1,y9)]===1)g[I(x9,y9)]=2; } }      // a few passages walled off: dead ends
    else if(arch==='flooded'){ fill(2); rooms(2,2,W-4,H-4,6,false); doors(); var rv=R.i(2,3); for(var q2=0;q2<rv;q2++){ if(q2%2===0){ var ry=R.i(8,H-9); for(var x10=1;x10<W-1;x10++){ var yy3=Math.round(ry+Math.sin(x10*0.25+q2)*2); for(var t3=0;t3<3;t3++)if(inb(x10,yy3+t3)&&g[I(x10,yy3+t3)]!==2)g[I(x10,yy3+t3)]=3; else if(inb(x10,yy3+t3)&&R.chance(0.3))g[I(x10,yy3+t3)]=3; } }
        else { var rx=R.i(8,W-9); for(var y10=1;y10<H-1;y10++){ var xx3=Math.round(rx+Math.sin(y10*0.25+q2)*2); for(var t4=0;t4<3;t4++)if(inb(xx3+t4,y10)&&g[I(xx3+t4,y10)]!==2)g[I(xx3+t4,y10)]=3; } } }
      F._bridgeOver=3; }
    else if(arch==='islands'){ fill(3); var isl=[], n3=9+R.i(0,5); for(var k3=0;k3<n3;k3++){ var ix=R.i(7,W-8), iy=R.i(6,H-7), ir=R.i(3,6); isl.push([ix,iy]); disc(ix,iy,ir,1); disc(ix+R.i(-3,3),iy+R.i(-2,2),ir-1,1); if(R.chance(0.4))disc(ix,iy,ir*0.4,6,1); }
      var used=[0], left=isl.slice(1).map(function(_,i){ return i+1; }); while(left.length){ var best=null, bd=1e9; used.forEach(function(a){ left.forEach(function(b){ var d=Math.hypot(isl[a][0]-isl[b][0],isl[a][1]-isl[b][1]); if(d<bd){ bd=d; best=[a,b]; } }); }); line(isl[best[0]][0],isl[best[0]][1],isl[best[1]][0],isl[best[1]][1],R.chance(0.5)?1:2,4,3); used.push(best[1]); left.splice(left.indexOf(best[1]),1); }
      F._bridgeOver=3; }
    else if(arch==='hub'){ fill(2); var rh=Math.min(W,H)*0.16, rring=Math.min(W,H)*0.36; disc(cx,cy,rh,1); disc(cx,cy,rh*0.55,3); for(var a2=0;a2<360;a2+=0.6){ var t5=a2*Math.PI/180; line(cx+Math.cos(t5)*rring*W/H,cy+Math.sin(t5)*rring,cx+Math.cos(t5+0.02)*rring*W/H,cy+Math.sin(t5+0.02)*rring,2,1); }
      var spokes=R.i(4,6); for(var s2=0;s2<spokes;s2++){ var sa2=s2/spokes*Math.PI*2+R.f()*0.4; line(cx+Math.cos(sa2)*rh,cy+Math.sin(sa2)*rh,cx+Math.cos(sa2)*rring*W/H,cy+Math.sin(sa2)*rring,2,1); var ex=cx+Math.cos(sa2)*(rring*W/H+5), ey=cy+Math.sin(sa2)*(rring+4); line(cx+Math.cos(sa2)*rring*W/H,cy+Math.sin(sa2)*rring,ex,ey,2,1); rect(Math.floor(ex-3),Math.floor(ey-2),R.i(5,8),R.i(4,6),R.chance(0.4)?5:1); }
      for(var c4=0;c4<4;c4++){ var qx=c4%2?W-12:3, qy=c4<2?3:H-10; rect(qx,qy,R.i(7,9),R.i(5,7),1); line(qx+4,qy+3,cx,cy,2,1,2); } }
    else if(arch==='star'){ fill(0); var rs=Math.min(W,H)/2-2; disc(cx,cy,rs*0.3,2); disc(cx,cy,rs*0.3-1,5); for(var p3=0;p3<5;p3++){ var t6=-Math.PI/2+p3*Math.PI*2/5, ex2=cx+Math.cos(t6)*rs*0.82, ey2=cy+Math.sin(t6)*rs*0.82; line(cx,cy,ex2,ey2,5,2); line(cx,cy,ex2,ey2,3,1); disc(ex2,ey2,rs*0.2,2); disc(ex2,ey2,rs*0.2-1,1); disc(ex2,ey2,1.5,5); }
      for(var p4=0;p4<5;p4++){ var t7=-Math.PI/2+(p4+0.5)*Math.PI*2/5, mx2=cx+Math.cos(t7)*rs*0.55, my2=cy+Math.sin(t7)*rs*0.55; if(R.chance(0.6)){ disc(mx2,my2,rs*0.14,2,0); disc(mx2,my2,rs*0.14-1,1); line(mx2,my2,cx+Math.cos(t7)*rs*0.28,cy+Math.sin(t7)*rs*0.28,1,1); } } }
    else if(arch==='lattice'){ fill(0); var ds=7, cols=Math.floor((W-4)/ds), rows2=Math.floor((H-4)/ds); for(var j2=0;j2<rows2;j2++)for(var i4=0;i4<cols;i4++){ if(R.chance(0.12))continue; var dcx=3+i4*ds+ds/2+(j2%2?ds/2:0), dcy=3+j2*ds+ds/2; if(dcx>W-4)continue;
        for(var yy4=-4;yy4<=4;yy4++)for(var xx4=-4;xx4<=4;xx4++){ var dd=Math.abs(xx4)+Math.abs(yy4), X=Math.round(dcx+xx4), Y=Math.round(dcy+yy4); if(!inb(X,Y))continue; if(dd<=3)g[I(X,Y)]=dd<=1&&R.chance(0.3)?5:1; else if(dd===4&&g[I(X,Y)]===0)g[I(X,Y)]=2; } } }
    else if(arch==='bailey'){ fill(0); rect(2,2,W-4,H-4,2); rect(3,3,W-6,H-6,5); [[3,3],[W-8,3],[3,H-8],[W-8,H-8]].forEach(function(p){ disc(p[0]+2.5,p[1]+2.5,4,2); disc(p[0]+2.5,p[1]+2.5,2.6,1); });
      var kw=Math.floor(W*0.46), kh=Math.floor(H*0.5), kx=Math.floor(cx-kw/2), ky=Math.floor(cy-kh/2)-2; rect(kx,ky,kw,kh,2); rooms(kx+1,ky+1,kw-2,kh-2,4,true); doors(); rect(Math.floor(cx)-1,ky+kh-1,3,1,1); rect(Math.floor(cx)-2,H-3,5,1,1);
      for(var ou=0;ou<5;ou++){ var bx3=R.i(5,W-12), by3=R.chance(0.5)?R.i(5,ky-6):R.i(ky+kh+2,H-9); if(by3<5||by3>H-9)continue; rect(bx3,by3,R.i(5,7),R.i(4,5),2); rect(bx3+1,by3+1,R.i(3,5),R.i(2,3),1); g[I(bx3+2,by3+R.i(3,4))]=1; } }
    // keep it in one piece: connect every walkable patch to the largest one (bridges over water, passages through walls)
    ZSD.connect(F,R); return F; },
  walk:function(v){ return v===1||v===4||v===5; },
  regions:function(F){ var W=F.w, H=F.h, g=F.g, lab=new Int32Array(W*H).fill(-1), sizes=[]; for(var i=0;i<W*H;i++){ if(lab[i]>=0||!ZSD.walk(g[i]))continue; var id=sizes.length, st=[i], n=0; lab[i]=id;
      while(st.length){ var k=st.pop(); n++; var x=k%W, y=(k/W)|0; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var xx=x+d[0], yy=y+d[1]; if(xx<0||yy<0||xx>=W||yy>=H)return; var q=yy*W+xx; if(lab[q]<0&&ZSD.walk(g[q])){ lab[q]=id; st.push(q); } }); } sizes.push(n); } return {lab:lab,sizes:sizes}; },
  connect:function(F,R){ for(var pass=0;pass<300;pass++){ var Rg=ZSD.regions(F); if(Rg.sizes.length<=1)return; var main=Rg.sizes.indexOf(Math.max.apply(null,Rg.sizes)), W=F.w, g=F.g, lab=Rg.lab;
      // the smallest other patch: tiny ones become wall, the rest get a straight passage to the main one
      var tiny={}, nt=0; Rg.sizes.forEach(function(s,i){ if(i!==main&&s<6){ tiny[i]=1; nt++; } }); if(nt){ for(var i=0;i<lab.length;i++)if(tiny[lab[i]])g[i]=F._bridgeOver===3&&g[i]===4?3:2; continue; }      // crumbs: all walled up at once
      var other=-1, os=1e9; Rg.sizes.forEach(function(s,i){ if(i!==main&&s<os){ os=s; other=i; } });
      var a=null, b=null, bd=1e9, oc=[], mc=[]; for(var i3=0;i3<lab.length;i3++){ if(lab[i3]===other)oc.push(i3); else if(lab[i3]===main&&(i3%2===0||Rg.sizes[main]<400))mc.push(i3); } var so=Math.max(1,Math.floor(oc.length/60));
      for(var oi=0;oi<oc.length;oi+=so){ var i2=oc[oi], ax=i2%W, ay=(i2/W)|0; for(var mi=0;mi<mc.length;mi++){ var j=mc[mi]; var d=Math.abs(j%W-ax)+Math.abs(((j/W)|0)-ay); if(d<bd){ bd=d; a=[ax,ay]; b=[j%W,(j/W)|0]; } } }
      if(!a)return; var x=a[0], y=a[1], xf=((a[0]*7+a[1]*13)&1)===0; while(x!==b[0]||y!==b[1]){ var rc=x!==b[0]&&y!==b[1]?R.chance(0.5):0; if(x!==b[0]&&(y===b[1]||xf))x+=x<b[0]?1:-1; else y+=y<b[1]?1:-1;      /* round 47 (Kris: "make sure the long bridges connect all the way through"): an L, two straight runs, not a staircase; the random draw is kept so every layout stays as it was */ var k=y*W+x; if(!ZSD.walk(g[k]))g[k]=g[k]===3||g[k]===0&&F._bridgeOver===3?4:1; } } },
  // a landing where the stairs from below come out (a small floor, joined to the rest), so you arrive exactly above where you left
  landing:function(F,p,R){ var W=F.w, H=F.h, x=Math.max(2,Math.min(W-3,p[0])), y=Math.max(2,Math.min(H-3,p[1])); if(ZSD.walk(F.g[y*W+x])&&F.g[y*W+x]!==4)return;
    for(var j=-1;j<=1;j++)for(var i=-1;i<=1;i++)F.g[(y+j)*W+x+i]=1; ZSD.connect(F,R); },
  // the stairs: you arrive where you left the floor below; the way on is in the farthest tenth of the floor from there
  stairs:function(F,prev,R,last){ var W=F.w, H=F.h, g=F.g, near=function(x,y){ var best=null, bd=1e9; for(var i=0;i<W*H;i++){ if(g[i]!==1&&g[i]!==5)continue; var d=Math.hypot(i%W-x,((i/W)|0)-y); if(d<bd){ bd=d; best=[i%W,(i/W)|0]; } } return best; };
    F.up=prev&&prev.down?near(prev.down[0],prev.down[1]):near(W/2,H-3);
    var dist=new Int32Array(W*H).fill(-1), q=[F.up[1]*W+F.up[0]], h=0; dist[q[0]]=0; while(h<q.length){ var k=q[h++], x=k%W, y=(k/W)|0; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var xx=x+d[0], yy=y+d[1]; if(xx<0||yy<0||xx>=W||yy>=H)return; var n=yy*W+xx; if(dist[n]<0&&ZSD.walk(g[n])){ dist[n]=dist[k]+1; q.push(n); } }); }
    var cand=[], mx=0; for(var i=0;i<W*H;i++)if(dist[i]>mx)mx=dist[i]; for(var j=0;j<W*H;j++)if(dist[j]>=mx*0.88&&(g[j]===1||g[j]===5))cand.push(j);
    var pick=cand.length?cand[R.i(0,cand.length-1)]:q[q.length-1]; F.far=mx; F.walkable=q.length; if(last)F.goal=[pick%W,(pick/W)|0]; else F.down=[pick%W,(pick/W)|0]; }
};
