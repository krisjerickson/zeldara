// ═══════════════════════════════════════════════════════════════════════
// ║ 09bd-boss-arena-clip.js — round 127 (Kris: "make sure we are fixing all the area attacks, so area attacks only happen in the boss
// ║ arena, and not outside of the edges of the arena").
// ║ The boss patterns (09bb) and the arena events (09b) were laid over the visible screen, which runs past the arena's walls into the rock
// ║ and the rooms beyond. Now each boss fight knows its arena:
// ║  · the arena = the tiles you can stand on inside the site's arena room (the floor plan's F.arena, 07zx) — or, where a floor has no
// ║    planned room (castles, mage towers, the phase arenas), the open ground reached from the boss's spot within BARENA.R tiles
// ║  · every pattern's field is cut to the arena's box, and everything a pattern or a boss's own attack draws is masked to the arena's
// ║    floor (telegraphs, strikes, painted marks, walls, beams, rings, burning ground) — nothing shows over the walls or beyond
// ║  · marks, geysers, rifts and lava waves land only on arena floor; a boss's blink and its mirror copies only stand on arena floor
// ║ BARENA.on is the switch (the tests can turn it off).
// ═══════════════════════════════════════════════════════════════════════
var BARENA={ on:true, R:14, RP:34,
  boss:function(S){ var L=S&&S.monsters; if(!L)return null; for(var i=0;i<L.length;i++){ var m=L[i]; if(m&&m.isBoss&&!m.dead&&!m.bossAlly&&!m.eliteKin)return m; } return null; },
  // the arena of this scene's boss fight (cached until the floor or the phase changes); null outside a boss floor
  get:function(S){ if(!BARENA.on||!S||typeof DW==='undefined'||typeof TILE==='undefined'||!S._canGoD||!S.monsters)return null;
    if(!S.isLastFloor&&!S._bossPhase)return null; var b=BARENA.boss(S), ox=S.bossSpawnX!==undefined?S.bossSpawnX:(b&&b.x), oy=S.bossSpawnY!==undefined?S.bossSpawnY:(b&&b.y); if(ox===undefined||oy===undefined)return null;
    var site=S._lab&&S._lab.site, AR=site&&site.arena&&!(S._bossPhase>1)?site.arena:null, key=[S.scene&&S.scene.key,S._bossPhase||1,Math.floor(ox/TILE),Math.floor(oy/TILE),AR?AR.join(','):'-',DW,DH].join('|');
    if(S._arenaA&&S._arenaA.key===key)return S._arenaA;
    var set=new Uint8Array(DW*DH), open=function(tx,ty){ return tx>0&&ty>0&&tx<DW-1&&ty<DH-1&&!!S._canGoD(tx*TILE+TILE/2,ty*TILE+TILE/2); }, n=0, x0=1e9, y0=1e9, x1=-1e9, y1=-1e9;
    var add=function(tx,ty){ set[ty*DW+tx]=1; n++; if(tx<x0)x0=tx; if(ty<y0)y0=ty; if(tx>x1)x1=tx; if(ty>y1)y1=ty; };
    if(AR){ for(var ty=AR[1];ty<AR[1]+AR[3];ty++)for(var tx=AR[0];tx<AR[0]+AR[2];tx++)if(open(tx,ty))add(tx,ty); }
    else { var R=S._bossPhase>1?BARENA.RP:BARENA.R, sx=Math.floor(ox/TILE), sy=Math.floor(oy/TILE);
      if(!open(sx,sy)){ var f=null; for(var r=1;r<4&&!f;r++)for(var dy=-r;dy<=r&&!f;dy++)for(var dx=-r;dx<=r&&!f;dx++)if(open(sx+dx,sy+dy))f=[sx+dx,sy+dy]; if(!f)return null; sx=f[0]; sy=f[1]; }
      var dist=new Int16Array(DW*DH).fill(-1), q=[sy*DW+sx]; dist[q[0]]=0;
      for(var qi=0;qi<q.length;qi++){ var c=q[qi], cx=c%DW, cy=(c/DW)|0; add(cx,cy); if(dist[c]>=R)continue;
        [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var nx=cx+d[0], ny=cy+d[1], k=ny*DW+nx; if(dist[k]<0&&open(nx,ny)){ dist[k]=dist[c]+1; q.push(k); } }); } }
    if(n<6)return null;
    var A={key:key,set:set,n:n,x0:x0*TILE,y0:y0*TILE,x1:(x1+1)*TILE,y1:(y1+1)*TILE,mask:null};
    try{ var g=S.make.graphics({x:0,y:0,add:false}); g.fillStyle(0xffffff,1); for(var k2=0;k2<set.length;k2++)if(set[k2]){ var gx=k2%DW, gy=(k2/DW)|0; g.fillRect(gx*TILE-3,gy*TILE-3,TILE+6,TILE+6); }
      A.gm=g; A.mask=g.createGeometryMask(); S.events.once('shutdown',function(){ try{ g.destroy(); }catch(e){} if(S._arenaA===A)S._arenaA=null; }); }catch(e){ A.mask=null; }
    return (S._arenaA=A); },
  in:function(S,x,y){ var A=BARENA.get(S); if(!A)return true; var tx=Math.floor(x/TILE), ty=Math.floor(y/TILE); return tx>=0&&ty>=0&&tx<DW&&ty<DH&&!!A.set[ty*DW+tx]; },
  // the nearest arena floor to (x,y)
  near:function(S,x,y){ var A=BARENA.get(S); if(!A||BARENA.in(S,x,y))return [x,y]; var tx=Math.floor(x/TILE), ty=Math.floor(y/TILE), best=null, bd=1e9;
    for(var k=0;k<A.set.length;k++){ if(!A.set[k])continue; var d=Math.abs(k%DW-tx)+Math.abs(((k/DW)|0)-ty); if(d<bd){ bd=d; best=k; } }
    return best===null?[x,y]:[(best%DW)*TILE+TILE/2,((best/DW)|0)*TILE+TILE/2]; },
  // the arena's box cut from a field {x,y,w,h}
  clip:function(S,F){ var A=BARENA.get(S); if(!A||!F)return F; var x0=Math.max(F.x,A.x0+6), y0=Math.max(F.y,A.y0+6), x1=Math.min(F.x+F.w,A.x1-6), y1=Math.min(F.y+F.h,A.y1-6);
    if(x1-x0<96||y1-y0<96)return F; return {x:x0,y:y0,w:x1-x0,h:y1-y0}; },
  // is a boss fight on, with the hero in the arena?
  live:function(S){ return !!(BARENA.on&&S&&S._arenaOn); },
  mask:function(S,o){ if(!o||!o.setMask||!BARENA.live(S))return o; var A=S._arenaA; if(A&&A.mask&&!o._bam){ o._bam=1; try{ o.setMask(A.mask); }catch(e){} } return o; }
};
(function(){
  // the patterns: their field is the arena's box, and all they draw is masked to the arena
  if(typeof BossPat!=='undefined'){
    var f0=BossPat.field; BossPat.field=function(S){ return BARENA.clip(S,f0.apply(this,arguments)); };
    var g0=BossPat.gfx; BossPat.gfx=function(S,d){ return BARENA.mask(S,g0.apply(this,arguments)); };
    var a0=BossPat.art; if(a0)BossPat.art=function(c,d){ var P=a0.apply(this,arguments); if(!P)return P; var put=P.put; P.put=function(){ return BARENA.mask(c.S,put.apply(this,arguments)); }; return P; };
    var t0=BossPat.tick; BossPat.tick=function(S,dt){ try{ var b=BARENA.boss(S), A=b&&b._bp?BARENA.get(S):null; S._arenaOn=!!(A&&BARENA.in(S,S.px,S.py)); }catch(e){ S._arenaOn=false; } return t0.apply(this,arguments); };
  }
  // a boss's own attacks (the monster engine): telegraphs, rings, zones and dots masked to the arena while the fight is on
  if(typeof MX!=='undefined'){
    if(MX.tele)['line','circle','cone'].forEach(function(k){ var f=MX.tele[k]; MX.tele[k]=function(A){ return BARENA.mask(A&&A.scene,f.apply(this,arguments)); }; });
    var z0=MX.zone; MX.zone=function(A,o){ var S=A&&A.scene; if(BARENA.live(S)&&o&&!BARENA.in(S,o.x,o.y))return o; var r=z0.apply(this,arguments); if(r&&r.vis)BARENA.mask(S,r.vis); return r; };
    var r0=MX.fxRing; MX.fxRing=function(A,x,y){ if(BARENA.live(A&&A.scene)&&!BARENA.in(A.scene,x,y))return; return r0.apply(this,arguments); };
  }
})();
