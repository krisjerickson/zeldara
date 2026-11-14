// ═══════════════════════════════════════════════════════════════════════
// ║ 12c-boss-camera.js — round 106 (Kris: "once you are in a boss area, the camera should stay still, and now the hero moves around in the
// ║ arena, without the camera following the hero").
// ║  · The boss's arena is the ground round where the guardian stands: every tile it can walk to within 12 steps of its spot (a phase-2+
// ║    arena: all of it).
// ║  · When you step into it while the guardian lives, the camera glides to the arena's middle, zooms out just enough to show all of it
// ║    (never closer than the usual 1.6, never further than 0.8) and stays there. Leave the arena or win, and it follows you again.
// ║  · An arena too big to show at 0.8 keeps the camera following you (the round-64 boss view still leans it toward the boss).
// ║ BCAM.on: the switch (the tests and the Site Lab's overview turn it off).
// ═══════════════════════════════════════════════════════════════════════
var BCAM={ on:true, DEPTH:12, ZMAX:1.6, ZMIN:0.8, PAD:1.5, T:700,      /* T: the glide in ms (0: at once — the tests) */
  box:function(sc){ if(sc._bcBox!==undefined)return sc._bcBox; sc._bcBox=null; var T=sc.dtiles; if(!T||sc.bossSpawnX===undefined)return null;
    var W=DW, H=DH, sx=Math.floor(sc.bossSpawnX/TILE), sy=Math.floor(sc.bossSpawnY/TILE), lim=sc._bossPhase>1?9999:BCAM.DEPTH, walk=function(x,y){ return x>=0&&y>=0&&x<W&&y<H&&T[y]&&T[y][x]!==DNG.WALL; };
    if(!walk(sx,sy))return null; var D=new Int16Array(W*H).fill(-1), q=[sy*W+sx], x0=sx, x1=sx, y0=sy, y1=sy; D[q[0]]=0;
    for(var i=0;i<q.length;i++){ var c=q[i], cx=c%W, cy=(c/W)|0; if(cx<x0)x0=cx; if(cx>x1)x1=cx; if(cy<y0)y0=cy; if(cy>y1)y1=cy; if(D[c]>=lim)continue;
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(o){ var nx=cx+o[0], ny=cy+o[1]; if(!walk(nx,ny))return; var k=ny*W+nx; if(D[k]>=0)return; D[k]=D[c]+1; q.push(k); }); }
    sc._bcBox={x0:x0,y0:y0,x1:x1,y1:y1,cx:(x0+x1+1)/2*TILE,cy:(y0+y1+1)/2*TILE,w:(x1-x0+1)*TILE,h:(y1-y0+1)*TILE}; return sc._bcBox; },
  boss:function(sc){ return (sc.monsters||[]).find(function(m){ return m&&m.isBoss&&!m.dead; })||null; },
  tick:function(sc){ if(!BCAM.on||!sc.isLastFloor||sc._trialRun||sc._inspect&&sc._slOver)return BCAM.off(sc); var cam=sc.cameras&&sc.cameras.main; if(!cam||!sc.pCont)return;
    var b=BCAM.boss(sc), B=b&&!sc._bossDefeated?BCAM.box(sc):null; if(!B)return BCAM.off(sc);
    var tx=sc.px/TILE, ty=sc.py/TILE, inside=tx>=B.x0-0.5&&tx<=B.x1+1.5&&ty>=B.y0-0.5&&ty<=B.y1+1.5;
    if(!inside)return BCAM.off(sc);
    if(sc._bcOn){ if(sc._bcMode==='still'){ if(cam._follow)cam.stopFollow(); var zr=cam.zoomEffect&&cam.zoomEffect.isRunning, pr=cam.panEffect&&cam.panEffect.isRunning;      /* hold the frame: a boss intro or anything else that moves the camera is put back */
        if(!zr&&Math.abs(cam.zoom-sc._bcZ)>0.01)cam.setZoom(sc._bcZ); if(!pr&&!zr&&Math.hypot(cam.midPoint.x-sc._bcC.x,cam.midPoint.y-sc._bcC.y)>2)cam.centerOn(B.cx,B.cy), sc._bcC={x:cam.midPoint.x,y:cam.midPoint.y}; } return; }
    sc._bcOn=true;
    var z=Math.min(BCAM.ZMAX,cam.width/(B.w+BCAM.PAD*2*TILE),cam.height/(B.h+BCAM.PAD*2*TILE));
    if(z<BCAM.ZMIN){ sc._bcMode='follow'; return; }      /* too big to show whole: the camera keeps following (the round-64 boss view leans it toward the boss) */
    sc._bcMode='still'; sc._bcZ=z; sc._bcC={x:B.cx,y:B.cy}; cam.stopFollow(); if(BCAM.T>0){ cam.pan(B.cx,B.cy,BCAM.T,'Sine.easeInOut'); cam.zoomTo(z,BCAM.T,'Sine.easeInOut'); } else { cam.setZoom(z); cam.centerOn(B.cx,B.cy); } setTimeout(function(){ try{ sc._bcC={x:cam.midPoint.x,y:cam.midPoint.y}; }catch(e){} },BCAM.T+120); },
  off:function(sc){ if(!sc._bcOn)return; sc._bcOn=false; var cam=sc.cameras.main; if(sc._slOver)return; if(sc._bcMode==='still'){ cam.zoomTo(BCAM.ZMAX,500,'Sine.easeInOut'); cam.startFollow(sc.pCont,true,.12,.12); } sc._bcMode=null; } };
(function(){ if(typeof DungeonScene==='undefined')return; var P=DungeonScene.prototype, u0=P.update;
  P.update=function(t,ms){ var r=u0.apply(this,arguments); try{ BCAM.tick(this); }catch(e){ if(!BCAM._w){ BCAM._w=1; console.warn('bcam',e); } } return r; };
  var c0=P.create; if(c0)P.create=function(){ this._bcBox=undefined; this._bcOn=false; this._bcMode=null; return c0.apply(this,arguments); }; })();
