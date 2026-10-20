// ═══════════════════════════════════════════════════════════════════════
// ║ 16t-after-the-end.js — round 72 (Kris, N1: "the world after the end"): what the panels of the village moment show now happens in
// ║ the world itself, once the spirits are home (ps.spiritsHome) — doc 30 §9 step 6 and Kris's answers E1/E2 (round 67):
// ║  · ASGARD SINKS: the white city on Mirror Lake goes down into the water; only a few spires stand above it (the citadel's crown and
// ║    four wall towers, the painted towers cut at the waterline, a ripple round each). The Bifröst from the pier goes with it.
// ║  · THE FORGES ARE GONE: the four forge islands and their causeways sink into the sea, as Muspelheim did after the escape.
// ║  · NO MORE MONSTERS: the roaming monsters and the camp guards fade away in a little light; nothing spawns again — in the world, on
// ║    the islands, in the adventure sites (E2: "gone everywhere — sites become peaceful"). The camps' treasures lie free.
// ║  · THE FAMILIARS have gone home with the spirits (E1: "they all go like originally intended, and live only in legend thereafter") —
// ║    the Tome still tells of them.
// ║ The world is re-made on every load (as ZASG.watch and ZESC do), quietly: the change happens while the village moment's panels play.
// ║ The sandbox can wind the end back (its Spirit saga arc sets ps.spiritsHome=0): Asgard and the forges come back up (ZAFTER.undo).
// ║ Switch: ZAFTER.on (Dev: ZAFTER.on=false).
// ═══════════════════════════════════════════════════════════════════════
var ZAFTER={ on:true, FORGES:['volcano_n','volcano_e','volcano_s','volcano_w'],
  done:function(ps){ return !!(ZAFTER.on&&ps&&ps.spiritsHome); },
  ps:function(){ var ws=typeof _heroWS==='function'?_heroWS():null; return ws&&ws.playerState; },
  // the lake's own water look (a lake cell just outside Asgard's wall)
  lakeKind:function(ws,P){ var wd=ws.wd; for(var i=0;i<P.rim.length;i++){ var c=P.rim[i]; for(var j=-2;j<=2;j++)for(var k=-2;k<=2;k++){ var x=c[0]+k, y=c[1]+j, t=(wd.tiles[y]||[])[x]; if(!P.isl[y*WORLD_W+x]&&(t===T.DEEP_WATER||t===T.SHALLOW_WATER))return {t:T.DEEP_WATER,k:wd.kind?wd.kind[y*WORLD_W+x]:undefined}; } } return {t:T.DEEP_WATER,k:undefined}; },
  // set a tile, remembering what it was (for the sandbox's undo)
  set:function(wd,log,x,y,t,k,ch){ if(!wd.tiles[y]||wd.tiles[y][x]===undefined)return; log.push([x,y,wd.tiles[y][x],wd.kind?wd.kind[y*WORLD_W+x]:0]); wd.tiles[y][x]=t; if(wd.kind&&k!==undefined)wd.kind[y*WORLD_W+x]=k; ch.push([x,y]); },
  // ── Asgard sinks to its spires ──
  sinkAsgard:function(ws){ var wd=ws.wd; if(!wd||wd._asgSunk||!wd._asgDone||typeof ZASG==='undefined')return; var P=ZASG.plan(ws); if(!P.n)return;
    var W=ZAFTER.lakeKind(ws,P), log=wd._asgLog=[], ch=[], N=ZASG.pierEnd();
    P.cells.forEach(function(c){ ZAFTER.set(wd,log,c[0],c[1],W.t,W.k,ch); });
    (wd._bifCells||[]).forEach(function(c){ var t=(wd.tiles[c[1]]||[])[c[0]]; if(t===T.BRIDGE&&!(N&&Math.hypot(c[0]-N[0],c[1]-N[1])<1.5))ZAFTER.set(wd,log,c[0],c[1],W.t,W.k,ch); });
    wd._asgSunk=true; wd.baseVer=(wd.baseVer||0)+1;
    // the pictures go (the array stays, so ZASG.watch does not dress it again); the Bifröst's shimmer too
    (ws._asgDress||[]).forEach(function(o){ try{ if(o&&o.scene){ ws.tweens.killTweensOf(o); o.destroy(); } }catch(e){} }); ws._asgDress=[]; if(ws._bifRb){ ws._bifRb.destroy(); ws._bifRb=null; }
    ZAFTER.repaint(ws,ch); ZAFTER.spires(ws); ZAFTER.rescue(ws); },
  spires:function(ws){ if(ws._zaSp)ws._zaSp.forEach(function(o){ if(o&&o.scene){ ws.tweens.killTweensOf(o); o.destroy(); } }); var L=ws._zaSp=[], P=ZASG.plan(ws), Z=typeof _scn==='function'?_scn():null, D=function(y){ return typeof WR_DEPTH==='function'?WR_DEPTH(y):y; };
    var cx=P.cx*TILE+16, cy=P.cy*TILE+16, spots=[[cx,cy,ZASG.KEEP,1.3,0.42]];
    // four wall towers round the old rim, a quarter turn apart (the one nearest each diagonal)
    [-2.4,-0.8,0.8,2.4].forEach(function(a,i){ var best=null, bd=1e9; P.rim.forEach(function(c){ var x=c[0]*TILE+16, y=c[1]*TILE+16, d=Math.abs(Math.atan2(y-cy,x-cx)-a); if(d<bd){ bd=d; best=[x,y]; } }); if(best)spots.push([cx+(best[0]-cx)*0.82,cy+(best[1]-cy)*0.82,ZASG.TOWERS[i%2],i%2?0.9:1.05,0.5]); });
    spots.forEach(function(s){ var x=s[0], y=s[1], im=null;
      if(Z&&Z.has&&Z.has(s[2])){ im=Z.image(ws,s[2],x,y,s[3]*(s[2]===ZASG.KEEP?(Z.K||1):1),D(y)); if(im){ var f=s[4]; im.setCrop(0,0,im.width,im.height*f); im.y=y+im.displayHeight*(1-f)-5; im.setTint(0xd8e4ec); L.push(im); } }
      if(!im){ var g=ws.add.graphics().setDepth(D(y)); g.fillStyle(0xe6e0d0,1).fillRect(x-8,y-46,16,46); g.fillStyle(0xd0b048,1).fillTriangle(x-11,y-46,x+11,y-46,x,y-80); L.push(g); }
      // the waterline: a soft dark band and a ripple that comes and goes
      var sh=ws.add.ellipse(x,y,70,16,0x0a2a3a,0.28).setDepth(D(y)+0.002); L.push(sh);
      var r=ws.add.ellipse(x,y,60,13).setStrokeStyle(2,0xe8f6ff,0.55).setDepth(D(y)+0.003); L.push(r);
      ws.tweens.add({targets:r,scaleX:{from:0.8,to:1.5},scaleY:{from:0.8,to:1.5},alpha:{from:0.8,to:0},duration:2600,repeat:-1,delay:Math.random()*2000}); });
    return L; },
  // ── the forges sink, as Muspelheim did ──
  sinkForges:function(ws){ var wd=ws.wd; if(!wd||wd._fgSunk||!wd._volcCarved||typeof _volcanoSiteDefs!=='function')return; var log=wd._fgLog=[], ch=[], sea=typeof WSK!=='undefined'&&WSK.sea?WSK.sea._gi:undefined;
    var ok=function(t){ return t===T.DARK_ROCK||t===T.ASH_GROUND||t===T.OBSIDIAN||t===T.THIN_MAGMA||t===T.DEEP_MAGMA||t===T.ROCKY_GROUND||t===T.GRAVEL||t===T.CLIFF; };
    _volcanoSiteDefs().forEach(function(d){ if(ZAFTER.FORGES.indexOf(d.id)<0)return; var cx=d.tx+1.5, cy=d.ty+1.5, an=wd.volcanoAnchors&&wd.volcanoAnchors[d.id];
      for(var y=Math.floor(cy-12);y<=cy+12;y++)for(var x=Math.floor(cx-12);x<=cx+12;x++){ if(Math.hypot(x-cx,y-cy)>10.5)continue; var t=(wd.tiles[y]||[])[x]; if(t!==undefined&&ok(t))ZAFTER.set(wd,log,x,y,T.OCEAN,sea,ch); }
      if(an){ var ux=an.x-cx, uy=an.y-cy, L2=ux*ux+uy*uy||1; for(var y2=Math.floor(Math.min(cy,an.y))-4;y2<=Math.max(cy,an.y)+4;y2++)for(var x2=Math.floor(Math.min(cx,an.x))-4;x2<=Math.max(cx,an.x)+4;x2++){ var u=((x2-cx)*ux+(y2-cy)*uy)/L2; if(u<0||u>0.97)continue; if(Math.hypot(x2-(cx+ux*u),y2-(cy+uy*u))>3.2)continue; var t2=(wd.tiles[y2]||[])[x2]; if(t2!==undefined&&ok(t2))ZAFTER.set(wd,log,x2,y2,T.OCEAN,sea,ch); } } });
    wd._fgSunk=true; wd.baseVer=(wd.baseVer||0)+1; wd._fgSites=wd.sites.filter(function(s){ return ZAFTER.FORGES.indexOf(s.id)>=0; }); wd.sites=wd.sites.filter(function(s){ return ZAFTER.FORGES.indexOf(s.id)<0; }); if(ws.sites!==wd.sites)ws.sites=wd.sites;
    (ws.siteObjs||[]).forEach(function(o){ if(o.s&&ZAFTER.FORGES.indexOf(o.s.id)>=0){ try{ if(o.ico&&o.ico.destroy)o.ico.destroy(); }catch(e){} if(o.lblEl)o.lblEl.remove(); o.gone=true; } }); ws.siteObjs=(ws.siteObjs||[]).filter(function(o){ return !o.gone; });
    ZAFTER.repaint(ws,ch); ZAFTER.rescue(ws); },
  // ── the monsters fade away; the camps' treasures lie free ──
  peace:function(ws){ if(ws._zaPeace)return; ws._zaPeace=true; var M=ws.worldMonsters||[];
    M.forEach(function(m){ if(!m)return; m.dead=true; m._zaGone=true; var c=m.cont; if(!c||!c.scene)return; var x=c.x, y=c.y;
      if(Math.abs(x-ws.player.x)<900&&Math.abs(y-ws.player.y)<700){ var s=ws.add.circle(x,y-10,6,0xfff4c0,0.7).setDepth(c.depth+1).setBlendMode(Phaser.BlendModes.ADD); ws.tweens.add({targets:s,radius:24,y:y-60,alpha:0,duration:1400,onComplete:function(){ s.destroy(); }}); }
      ws.tweens.add({targets:c,alpha:0,duration:1200,onComplete:function(){ try{ c.destroy(); }catch(e){} }}); });
    ws.worldMonsters=[]; (ws._camps||[]).forEach(function(C){ C.guards=[]; if(C.state==='guarded'){ C.state='open'; C.clearedAt=Date.now(); C._zaPeace=true; if(C.glow)C.glow.setVisible(false); } }); },
  // every chunk touched is painted again — mounted or not (a chunk off screen gets its new ground the next time it is needed)
  repaint:function(ws,ch){ if(!ws._refreshChunkAt||!ch.length)return; var seen={}, C=typeof WCH!=='undefined'?WCH:32; ch.forEach(function(p){ var k=Math.floor(p[0]/C)+'_'+Math.floor(p[1]/C); if(seen[k])return; seen[k]=1; try{ ws._refreshChunkAt(p[0],p[1]); }catch(e){} }); },
  // a hero left standing on sunk ground (an old save) is taken home to the village green
  rescue:function(ws){ try{ var p=ws.player; if(!p)return; var t=(ws.wd.tiles[Math.floor(p.y/TILE)]||[])[Math.floor(p.x/TILE)]; if(t===undefined||canPassTile(t))return;
      p.x=(CENTER_X+0.5)*TILE; p.y=(CENTER_Y+5)*TILE; if(p.cont)p.cont.setPosition(p.x,p.y); }catch(e){} },
  // ── the sandbox winds the end back: Asgard and the forges come up again ──
  undo:function(ws){ var wd=ws.wd, ch=[]; if(!wd)return; var back=function(log){ for(var i=log.length-1;i>=0;i--){ var q=log[i]; if(!wd.tiles[q[1]])continue; wd.tiles[q[1]][q[0]]=q[2]; if(wd.kind)wd.kind[q[1]*WORLD_W+q[0]]=q[3]; ch.push([q[0],q[1]]); } };
    if(wd._asgSunk){ back(wd._asgLog||[]); wd._asgLog=null; wd._asgSunk=false; if(ws._zaSp){ ws._zaSp.forEach(function(o){ if(o&&o.scene){ ws.tweens.killTweensOf(o); o.destroy(); } }); ws._zaSp=null; } try{ ZASG.dress(ws); }catch(e){} }
    if(wd._fgSunk){ back(wd._fgLog||[]); wd._fgLog=null; wd._fgSunk=false; var S=wd._fgSites||[]; wd._fgSites=null;
      S.forEach(function(vs){ if(wd.sites.some(function(s){ return s.id===vs.id; }))return; wd.sites.push(vs); var ico=typeof _wsSiteArt==='function'?_wsSiteArt(ws,vs):null, lblEl=document.createElement('div'); lblEl.className='wlbl site hidden'; lblEl.textContent=_volcanoSiteLabel(vs);
        var host=document.getElementById('world-labels'); if(host)host.appendChild(lblEl); (ws.siteObjs=ws.siteObjs||[]).push({s:vs,ico:ico,lblEl:lblEl,wx:vs.tx*TILE+TILE*1.5,wy:vs.ty*TILE-2}); }); if(ws.sites!==wd.sites)ws.sites=wd.sites; }
    if(ch.length){ wd.baseVer=(wd.baseVer||0)+1; ZAFTER.repaint(ws,ch); } },
  tick:function(){ try{ if(!ZAFTER.on||typeof game==='undefined'||!game.scene)return; var ws=game.scene.getScene('World'); if(!ws||!ws.wd||!ws.playerState||!ws.player||!ws.sys||ws.sys.settings.status<5||ws.sys.settings.status>7)return;      /* running, paused (a cut-scene, a talk) or asleep — the change happens behind the panels */ var ps=ws.playerState, wd=ws.wd;
      if(!ps.spiritsHome){ if(wd._asgSunk||wd._fgSunk)ZAFTER.undo(ws); return; }
      ZAFTER.peace(ws); if(wd._volcCarved&&!wd._fgSunk)ZAFTER.sinkForges(ws); if(ps.asgardDown&&wd._asgDone&&(typeof ZCITY==='undefined'||wd._cityDone)&&!wd._asgSunk)ZAFTER.sinkAsgard(ws); }catch(e){ if(!ZAFTER._err){ ZAFTER._err=1; console.warn('after the end',e); } } }
};
setInterval(ZAFTER.tick,1000);
setTimeout(function(){
  // nothing spawns once the spirits are home: the world's and the islands' monsters (IslandScene extends WorldScene), the sites'
  if(typeof WorldScene!=='undefined'){ var P=WorldScene.prototype;
    ['_spawnRosterMon','_spawnLegacyMon'].forEach(function(k){ var f=P[k]; if(typeof f!=='function')return; P[k]=function(){ if(ZAFTER.done(this.playerState||ZAFTER.ps()))return null; return f.apply(this,arguments); }; });
    var cr=P._campRespawn; if(typeof cr==='function')P._campRespawn=function(C){ if(ZAFTER.done(this.playerState))return; return cr.apply(this,arguments); }; }
  if(typeof DungeonScene!=='undefined'){ var sm=DungeonScene.prototype._spawnMonsters; DungeonScene.prototype._spawnMonsters=function(){ var ps=this.worldScene&&this.worldScene.playerState; if(ZAFTER.done(ps)&&!this._inspect){ this.monsters=this.monsters||[]; return; } return sm.apply(this,arguments); }; }
  // the familiars have gone home with the spirits; the Tome keeps them
  if(typeof _heroActiveFamiliars==='function'){ var af=_heroActiveFamiliars; _heroActiveFamiliars=function(ps){ if(ZAFTER.done(ps))return []; return af.apply(this,arguments); }; }
  if(typeof _toggleFamiliar==='function'){ var tf=_toggleFamiliar; _toggleFamiliar=function(){ if(ZAFTER.done(ZAFTER.ps())){ if(typeof showNotif==='function')showNotif('✨ Your familiars went home with the spirits — they live in legend now (the Tome tells of them).','#fff2b0'); return; } return tf.apply(this,arguments); }; }
},0);
