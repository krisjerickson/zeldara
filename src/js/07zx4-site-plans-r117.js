// ═══════════════════════════════════════════════════════════════════════
// ║ 07zx4-site-plans-r117.js — round 117: the Elven Library, redesigned.
// ║ Kris: "elven library with lots of bookshelves needs to be redesigned. you just need to go back and forth lots of times and gets boring".
// ║ Round 47 filled each quarter with shelves in close rows that snaked (one gap at alternate ends), so crossing a stack-room meant walking
// ║ the whole length of every row. Now the hall reads as a library and can be crossed in any direction:
// ║   • each quarter is a reading room with a door on BOTH of its aisle walls, three wide;
// ║   • inside, freestanding bookcases (short, 3–4 long) in staggered rows with lanes of floor between them both ways — cover to fight
// ║     round and corners to search, never a corridor you must walk to its end;
// ║   • a big feature per room: a ring of shelves round a reading table, a map table, or a sunken reading pit; a reading nook in a corner;
// ║   • the two great aisles stay open, with reading tables set against their sides, and the rotunda at the crossing keeps its four pillars.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSP==='undefined'||!ZSP.T||!ZSP.T.elven_library)return; var T=ZSP.T;
  T.elven_library.d='The great reading hall: four reading rooms off two open aisles, each with a door on both sides; freestanding bookcases in staggered rows with lanes between them, a centrepiece in each room (a ring of shelves, a map table or a reading pit), reading tables along the aisles and the rotunda at the crossing.';
  T.elven_library.gen=function(c){ var R=c.R, W=c.W, H=c.H; c.fill(0); c.box(1,1,W-2,H-2,1); var ax=Math.floor(W/2)-1, ay=Math.floor(H/2)-1;
    var Q=[[2,2,ax-3,ay-3],[ax+3,2,W-ax-5,ay-3],[2,ay+3,ax-3,H-ay-5],[ax+3,ay+3,W-ax-5,H-ay-5]];
    Q.forEach(function(q,qi){ var x0=q[0], y0=q[1], x1=q[0]+q[2]-1, y1=q[1]+q[3]-1, right=qi%2===0, below=qi<2; if(q[2]<8||q[3]<8)return;
      // the two walls facing the aisles, each with a door three wide near its middle
      var sx=right?x1:x0, sy=below?y1:y0; c.rect(sx,y0,1,y1-y0+1,2); c.rect(x0,sy,x1-x0+1,1,2);
      var my=Math.round((y0+y1)/2)+R.i(-2,1), mx=Math.round((x0+x1)/2)+R.i(-2,1); c.rect(sx,my,1,3,1); c.rect(mx,sy,3,1,1);
      var ix0=right?x0:x0+1, ix1=right?x1-1:x1, iy0=below?y0:y0+1, iy1=below?y1-1:y1;
      // the centrepiece, kept clear of the doors
      var cx=Math.round((ix0+ix1)/2), cy=Math.round((iy0+iy1)/2), kind=(qi+R.i(0,2))%3, clear=function(x,y){ return Math.abs(x-cx)<=3&&Math.abs(y-cy)<=3; };
      // freestanding bookcases: staggered rows, lanes of floor between them both ways (one or two wide along a row, two wide between rows)
      var horiz=R.chance(0.5), row=0;
      if(horiz){ for(var y=iy0+2;y<=iy1-2;y+=3,row++){ for(var x=ix0+1+(row%2)*2;x<=ix1-3;x+=5){ var L=R.i(3,4); if(R.chance(0.08))continue; for(var k=0;k<L;k++){ if(!clear(x+k,y))c.set(x+k,y,6); } } } }
      else { for(var x2=ix0+2;x2<=ix1-2;x2+=3,row++){ for(var y2=iy0+1+(row%2)*2;y2<=iy1-3;y2+=5){ var L2=R.i(3,4); if(R.chance(0.08))continue; for(var k2=0;k2<L2;k2++){ if(!clear(x2,y2+k2))c.set(x2,y2+k2,6); } } } }
      // the centrepiece
      for(var j=-3;j<=3;j++)for(var i=-3;i<=3;i++)c.set(cx+i,cy+j,1);
      if(kind===0){ [[-2,-2],[-1,-2],[1,-2],[2,-2],[-2,2],[-1,2],[1,2],[2,2],[-2,-1],[2,1]].forEach(function(p){ c.set(cx+p[0],cy+p[1],6); }); c.set(cx,cy,6); }      // a ring of shelves (open on two sides) round a reading table
      else if(kind===1){ c.rect(cx-1,cy,3,1,6); }      // a long map table
      else { c.rect(cx-1,cy-1,3,3,5); }      // a sunken reading pit
      // a reading nook in the corner against the outer wall
      c.rect(right?ix0:ix1-2,below?iy0:iy1-2,3,3,5); });
    // the aisles stay open: reading tables against their sides, never across them
    c.rect(ax-1,2,4,H-4,1); c.rect(2,ay-1,W-4,4,1);
    var k3=0; for(var y3=5;y3<H-5;y3+=6,k3++){ if(Math.abs(y3-ay)<5)continue; c.set(k3%2?ax-1:ax+2,y3,6); }
    k3=0; for(var x3=5;x3<W-5;x3+=6,k3++){ if(Math.abs(x3-ax)<5)continue; c.set(x3,k3%2?ay-1:ay+2,6); }
    c.rect(ax-2,ay-2,6,6,5); [[ax-2,ay-2],[ax+3,ay-2],[ax-2,ay+3],[ax+3,ay+3]].forEach(function(p){ c.set(p[0],p[1],6); }); };
})();
