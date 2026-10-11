// ═══════════════════════════════════════════════════════════════════════
// ║ 07zx3-site-plans-r47.js — round 47: Kris's second Site review (Lab sreview-*, Oct 11 evening).
// ║   • Elven Library: "there right now is not too much in the big open room. let's add in lots of bookshelves and other things to make it more
// ║     difficult to walk through and find the stairs" — each quarter is now a walled stack-room with one or two doors, its shelves in close rows
// ║     that snake (a gap at alternate ends), and the two great aisles are broken by shelf islands and reading tables.
// ║   • Boulder Field: "we need to make sure there are enough obstacles, like big rocks and boulders around in the open spaces" — rock outcrops,
// ║     boulder clusters and low ridges over the whole floor, kept clear of the stone rings.
// ║   • Ember Observatory: "the last level is too easy to get to the stairs, Make the top open door of the starting room a closed wall instead" —
// ║     on the last floor the way into the boss room nearest the arrival is walled up, so the long way round is the way in.
// ║   (Mushroom Forest's bridges: 07zw ZSD.connect lays straight bridges, 07zy paints them as one run — "make sure the long bridges connect".)
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSP==='undefined')return; var T=ZSP.T;
  // ── Elven Library: walled stack-rooms ──
  if(T.elven_library){ T.elven_library.d='The great reading hall, filled: four walled stack-rooms, their shelves in close rows that snake back and forth, one or two doors each; the two great aisles broken by shelf islands and reading tables, a rotunda at the crossing.';
    T.elven_library.gen=function(c){ var R=c.R, W=c.W, H=c.H; c.fill(0); c.box(1,1,W-2,H-2,1); var ax=Math.floor(W/2)-1, ay=Math.floor(H/2)-1;
      var Q=[[2,2,ax-3,ay-3],[ax+3,2,W-ax-5,ay-3],[2,ay+3,ax-3,H-ay-5],[ax+3,ay+3,W-ax-5,H-ay-5]];
      Q.forEach(function(q,qi){ var x0=q[0], y0=q[1], x1=q[0]+q[2]-1, y1=q[1]+q[3]-1, right=qi%2===0, below=qi<2;
        // the walls facing the aisles, a door (2 wide) in one or both, set towards the far ends
        var sx=right?x1:x0, sy=below?y1:y0; c.rect(sx,y0,1,y1-y0+1,2); c.rect(x0,sy,x1-x0+1,1,2);
        var dv=below?R.i(y0+1,y0+3):R.i(y1-4,y1-2), dh=right?R.i(x0+1,x0+3):R.i(x1-4,x1-2), both=R.chance(0.35), one=R.chance(0.5);
        if(both||one){ c.rect(sx,dv,1,2,1); } if(both||!one){ c.rect(dh,sy,2,1,1); }
        // the shelves: close rows, a gap at alternate ends, now and then one in the middle
        var ix0=right?x0:x0+1, ix1=right?x1-1:x1, iy0=below?y0:y0+1, iy1=below?y1-1:y1, horiz=qi===0||qi===3;
        if(horiz){ var n=0; for(var y=iy0+1;y<iy1-1;y+=2,n++){ for(var x=ix0;x<=ix1;x++)c.set(x,y,6); var gx=n%2?ix1-1:ix0; c.set(gx,y,1); c.set(gx+1,y,1); if(R.chance(0.3)){ var m=R.i(ix0+3,ix1-4); c.set(m,y,1); } } }
        else { var n2=0; for(var x2=ix0+1;x2<ix1-1;x2+=2,n2++){ for(var y2=iy0;y2<=iy1;y2++)c.set(x2,y2,6); var gy=n2%2?iy1-1:iy0; c.set(x2,gy,1); c.set(x2,gy+1,1); if(R.chance(0.3)){ var m2=R.i(iy0+3,iy1-4); c.set(x2,m2,1); } } }
        // a reading nook in the corner against the outer wall
        c.rect(right?ix0:ix1-2,below?iy0:iy1-2,3,3,5); });
      // the aisles, broken: shelf islands and reading tables leave a way past on alternate sides
      c.rect(ax-1,2,4,H-4,1); c.rect(2,ay-1,W-4,4,1);
      var k=0; for(var y3=4;y3<H-4;y3+=5,k++){ if(Math.abs(y3-ay)<5)continue; c.rect(k%2?ax-1:ax+1,y3,2,1,6); if(R.chance(0.5))c.set(k%2?ax+2:ax-1,y3+2,6); }
      k=0; for(var x3=4;x3<W-4;x3+=5,k++){ if(Math.abs(x3-ax)<5)continue; c.rect(x3,k%2?ay-1:ay+1,1,2,6); if(R.chance(0.5))c.set(x3+2,k%2?ay+2:ay-1,6); }
      c.rect(ax-2,ay-2,6,6,5); [[ax-2,ay-2],[ax+3,ay-2],[ax-2,ay+3],[ax+3,ay+3]].forEach(function(p){ c.set(p[0],p[1],6); }); }; }
  // ── Boulder Field: rocks and boulders in the open ──
  if(T.boulder_field){ var g0=T.boulder_field.gen; T.boulder_field.d+=' Round 47: rock outcrops, boulder clusters and low ridges over all the open ground.';
    T.boulder_field.gen=function(c,fi,nf){ g0(c,fi,nf); var R=c.R, W=c.W, H=c.H, clear=function(x,y,r){ for(var j=-r;j<=r;j++)for(var i=-r;i<=r;i++){ var v=c.get(x+i,y+j); if(v===3||v===0)return false; } return true; };
      var n=Math.round(W*H/90); for(var k=0;k<n;k++){ var x=R.i(4,W-5), y=R.i(4,H-5), r=R.f()<0.35?R.i(2,3):R.i(1,2); if(!clear(x,y,r+2))continue;
        if(r>=2)c.disc(x+0.5,y+0.5,r+R.f()*0.6,2,1); else { for(var q=0;q<R.i(3,6);q++)c.set(x+R.i(-1,1),y+R.i(-1,1),6,1); } }
      for(var r2=0;r2<Math.round(W*H/600);r2++){ var x0=R.i(6,W-7), y0=R.i(6,H-7), a=R.f()*Math.PI, L=R.i(5,9); if(!clear(x0,y0,3))continue; c.line(x0,y0,x0+Math.cos(a)*L,y0+Math.sin(a)*L,1,2,1); }
      c.scatter(6,Math.round(W*H/40),1,true); }; }
  // ── the last floor: wall up the way into the boss room nearest the arrival (Ember Observatory) ──
  ZSP.closeNearDoor=function(F){ if(!F.arena||!F.goal||!F.up)return false; var W=F.w, g=F.g, a=F.arena, x0=a[0]-1, y0=a[1]-1, x1=a[0]+a[2], y1=a[1]+a[3], D=ZSP.bfs(F,F.up), doors=[], seen={};
    for(var y=y0;y<=y1;y++)for(var x=x0;x<=x1;x++){ if(!(x===x0||x===x1||y===y0||y===y1))continue; var k=y*W+x; if(!ZSP.w(g[k])||seen[k])continue; var grp=[], st=[k]; seen[k]=1;
      while(st.length){ var q=st.pop(); grp.push(q); [1,-1,W,-W].forEach(function(d){ var n=q+d, nx=n%W, ny=(n/W)|0; if(seen[n]||!ZSP.w(g[n]))return; if(!(nx===x0||nx===x1||ny===y0||ny===y1)||nx<x0||nx>x1||ny<y0||ny>y1)return; seen[n]=1; st.push(n); }); }
      var dm=Math.min.apply(null,grp.map(function(q){ return D[q]<0?1e9:D[q]; })); doors.push({t:grp,d:dm}); }
    if(doors.length<2)return false; doors.sort(function(p,q){ return p.d-q.d; }); var near=doors[0], old=near.t.map(function(q){ return g[q]; }); near.t.forEach(function(q){ g[q]=2; });
    var D2=ZSP.bfs(F,F.up); if(D2[F.goal[1]*W+F.goal[0]]<0){ near.t.forEach(function(q,i){ g[q]=old[i]; }); return false; } F.closedDoor=near.t.length; ZSP.check(F); return true; };
  // the quick way to the boss: along the shortest path from the arrival, the first bridge whose removal keeps the boss room reachable and makes
  // the way at least a third longer is taken away (on this layout the bridge from the arrival room straight to the boss room)
  ZSP.cutShortcut=function(F){ if(!F.goal||!F.up)return false; var W=F.w, g=F.g, D=ZSP.bfs(F,F.up), gk=F.goal[1]*W+F.goal[0], L0=D[gk]; if(L0<0)return false;
    var path=[], k=gk; while(D[k]>0){ path.push(k); var nk=-1; [1,-1,W,-W].forEach(function(d){ var n=k+d; if(n>=0&&n<W*F.h&&D[n]===D[k]-1&&nk<0)nk=n; }); if(nk<0)break; k=nk; } path.reverse();
    var tried={}; for(var i=0;i<path.length;i++){ var t=path[i]; if(g[t]!==4||tried[t])continue; var br=[], st=[t]; tried[t]=1; while(st.length){ var q=st.pop(); br.push(q); [1,-1,W,-W].forEach(function(d){ var n=q+d; if(n>=0&&n<W*F.h&&g[n]===4&&!tried[n]){ tried[n]=1; st.push(n); } }); }
      br.forEach(function(q){ g[q]=3; }); var D2=ZSP.bfs(F,F.up); if(D2[gk]>=0&&D2[gk]>=L0*1.33){ F.closedDoor=br.length; F.cutFrom=L0; ZSP.check(F); return true; } br.forEach(function(q){ g[q]=4; }); }
    return ZSP.closeNearDoor(F); };
  if(T.mage_ember_observatory)T.mage_ember_observatory.closeNear=1;
  var _design=ZSP.design; ZSP.design=function(id,nfl){ var key=id+'|'+nfl, had=ZSP._d&&ZSP._d[key], D=_design.call(ZSP,id,nfl); if(!D||had)return D; var T0=ZSP.T[id];
    if(T0&&T0.closeNear){ var L=D.floors[D.floors.length-1]; ZSP.cutShortcut(L); } return D; };
})();
