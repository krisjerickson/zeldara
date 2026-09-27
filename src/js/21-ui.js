// ─── UI Bridge ──────────────────────────────────
function updateHUD(state){
  var hp=state.hp,maxHp=state.maxHp,gold=state.gold,level=state.level,xp=state.xp;
  var section=state.section,mount=state.mount,familiar=state.familiar,ul=state.unlockedSections;
  var hpPct=Math.min(100,hp/maxHp*100);
  document.getElementById('hp-bar').style.cssText='width:'+hpPct+'%;background:'+(hpPct>60?'#44ff88':hpPct>30?'#ffaa00':'#ff3322');
  document.getElementById('hp-val').textContent=hp+'/'+maxHp;
  var mana=state.mana!==undefined?Math.floor(state.mana):50;
  var maxMana=state.maxMana||50;
  var manaPct=Math.min(100,mana/maxMana*100);
  var manaBar=document.getElementById('mana-bar');
  var manaVal=document.getElementById('mana-val');
  if(manaBar)manaBar.style.width=manaPct+'%';
  if(manaVal)manaVal.textContent=mana+'/'+maxMana;
  document.getElementById('xp-bar').style.width=Math.min(100,xp/(level*100)*100)+'%';
  var lvCap=ul&&ul.length?((Math.max.apply(null,ul)>=4?20:Math.max.apply(null,ul)>=3?15:Math.max.apply(null,ul)>=2?10:5)):5;
  document.getElementById('lv-val').textContent='Lv '+level+'/'+lvCap;
  document.getElementById('gold-val').textContent=gold+'g';
  document.getElementById('region-name').textContent=SECTION_NAMES[section]||'Unknown';
  var dots='';
  for(var s=1;s<=4;s++){
    dots+='<span class="'+(ul&&ul.includes(s)?'rdot-on':'rdot-off')+'">'+(ul&&ul.includes(s)?'◉':'○')+'</span>';
  }
  document.getElementById('section-dots').innerHTML=dots;
  var comp=document.getElementById('comp-panel');
  if(mount||familiar){
    comp.style.display='flex';
    document.getElementById('mount-disp').textContent=mount?(MOUNTS[mount].icon+' '+MOUNTS[mount].n):'';
    document.getElementById('familiar-disp').textContent=familiar?(FAMILIARS[familiar].icon+' '+FAMILIARS[familiar].n):'';
  } else comp.style.display='none';
  // Update spell + magic weapon slots in action bar
  var eq=state.equip||{};
  var spellSlotEl=document.getElementById('action-spell-slot');
  if(spellSlotEl){
    var spItem=ITEMS[eq.spell];
    spellSlotEl.innerHTML='<div class="aib-key">X</div><div class="aib-ico">'+(spItem?spItem.icon:'✨')+'</div><div class="aib-lbl">'+(spItem?spItem.name.replace(/ Tome/,'').replace(/ Scroll/,'').substr(0,8):'Spell')+'</div>'
      +(spItem&&ITEMS[eq.mWeapon]?'<div style="font-size:8px;color:#bb88ff;margin-top:1px">×'+(ITEMS[eq.mWeapon].spellMult||1)+'</div>':'');
  }
}

function renderQuestList(unlockedSections,completed,active,scene){
  var c=document.getElementById('quest-list-container');if(!c)return;
  var h='';
  // Volcano Lord chain (global) — pinned at top once unlocked
  var psRef=scene&&scene.playerState;
  if(psRef && _finalQuestUnlocked(psRef)){
    var keysHeld=_volcanoKeysHeld(psRef);
    var keysDone=keysHeld>=4;
    var bossDone=psRef.completedQuests&&psRef.completedQuests.includes('volcano_lord');
    h+='<div class="qgrp" style="border:1px solid rgba(255,100,40,.45);background:rgba(60,18,10,.3);margin-bottom:14px">';
    h+='<div class="qgrp-hdr" style="color:#ff8844">🌋 The Volcano Lord '+(bossDone?'✓':'(Final Quest)')+'</div>';
    h+='<div class="qitem '+(keysDone?'qdone':'')+'"><div class="qico">🔑</div><div class="qinf">';
    h+='<div class="qtit">Find the four elemental keys '+(keysDone?'✓':'')+'</div>';
    h+='<div class="qdesc">Defeat all four mini-volcanoes to forge: Ember (N), Magma (E), Obsidian (S), Ashfire (W). <b>'+keysHeld+' / 4 collected.</b></div>';
    h+='</div></div>';
    h+='<div class="qitem '+(bossDone?'qdone':'')+'" style="opacity:'+(keysDone?1:.55)+'"><div class="qico">⚔️</div><div class="qinf">';
    h+='<div class="qtit">Defeat the Volcano Lord '+(bossDone?'✓':'')+'</div>';
    h+='<div class="qdesc">'+(keysDone?'Bring the 4 keys to the great volcano in the NW and unlock the door.':'Collect all 4 keys first.')+'</div>';
    h+='</div></div>';
    h+='</div>';
  }
  for(var sec=1;sec<=4;sec++){
    var ul=unlockedSections&&unlockedSections.includes(sec);
    h+='<div class="qgrp" style="'+(ul?'':'opacity:.4')+'"><div class="qgrp-hdr">Section '+sec+': '+SECTION_NAMES[sec]+' '+(ul?'':'🔒')+'</div>';
    if(ul){
      for(var type in MAIN_QUEST_DEFS){
        var def=MAIN_QUEST_DEFS[type];
        var key='s'+sec+'_'+type;
        var done=completed&&completed.includes(key);
        var isAct=active===key;
        h+='<div class="qitem '+(done?'qdone':'')+' '+(isAct?'qact':'')+'"><div class="qico">'+def.icon+'</div><div class="qinf"><div class="qtit">'+def.title+(done?' ✓':'')+'</div><div class="qdesc">'+def.desc+'</div></div>';
        if(!done&&!isAct)h+='<button class="qacc" onclick="window._acceptQuest(\''+key+'\')">Accept</button>';
        else if(isAct)h+='<span class="qbadge">ACTIVE</span>';
        h+='</div>';
      }
      h+=_journalSitesHTML(sec,scene);
    }
    h+='</div>';
  }
  c.innerHTML=h;
}
// Towers & dungeons of one section, with boss/bonus status (journal)
function _journalSitesHTML(sec,scene){
  var ps=scene&&scene.playerState||{}, sites=((scene&&scene.sites)||[]).filter(function(s){return s.section===sec&&s.design&&(s.type==='tower'||s.type==='dungeon');});
  if(!sites.length)return '';
  var h='<div class="qdesc" style="margin:8px 0 4px;letter-spacing:.06em;text-transform:uppercase;opacity:.75">Towers &amp; dungeons</div>';
  sites.forEach(function(s){
    var done, desc;
    if(s.boss){
      done=(ps.completedQuests||[]).includes(s.id);
      if(s.type==='tower')desc='★ Boss tower · '+s.floors+' floors · frees '+(CRAFTSMEN[sec]?CRAFTSMEN[sec].n:'a craftsman');
      else { var rw=BOSS_REWARDS[s.id], mt=rw&&rw.mount&&MOUNTS[rw.mount]; desc='★ Boss dungeon · '+s.floors+' floors · mount: '+(mt?mt.icon+' '+mt.n:'—'); }
    } else {
      done=(ps.bonusCleared||[]).includes(s.id);
      desc='Bonus · '+s.floors+' floors · elite guard + treasure vault · relic: '+(done?(SITE_RELICS[s.design]||'?'):'???');
    }
    h+='<div class="qitem '+(done?'qdone':'')+'"><div class="qico">'+(s.type==='tower'?'🗼':'⚔️')+'</div><div class="qinf"><div class="qtit">'+s.name+(done?' ✓':'')+'</div><div class="qdesc">'+desc+'</div></div></div>';
  });
  return h;
}
window._acceptQuest=function(k){var ws=game.scene.getScene('World');if(ws)ws.acceptQuest(k);closeModal('quests');};

// ═══ World maps (Phase 3): HUD minimap around you + Full World Map ═════
// Both draw from one 1-px-per-tile base image of the world (rebuilt only when
// terrain changes: gates opening, volcano islands) and one fog mask at the
// exploration-grid resolution (1 cell = 8 tiles), smoothed when scaled up.
var _wmBaseCv=null,_wmBaseVer=-1,_wmFogCv=null,_wmFogVer=-1,_wmFogPs=null;
var WM_MINI_TILES=150;                       // HUD minimap: ~150 tiles across
function _wmBase(wd){
  var ver=wd.baseVer||0; if(_wmBaseCv&&_wmBaseVer===ver)return _wmBaseCv;
  if(!_wmBaseCv){ _wmBaseCv=document.createElement('canvas'); _wmBaseCv.width=WORLD_W; _wmBaseCv.height=WORLD_H; }
  var g=_wmBaseCv.getContext('2d'), img=g.createImageData(WORLD_W,WORLD_H), d=img.data, kind=wd.kind, nz=vnoise(WORLD_SEED+1402);
  for(var ty=0;ty<WORLD_H;ty++)for(var tx=0;tx<WORLD_W;tx++){ var k=ty*WORLD_W+tx, c=_wkAvg(kind[k]), tv=wd.tiles[ty][tx], f=0.92+nz(tx*0.08,ty*0.08)*0.16;
    if(tv===T.PROP)f*=0.72;                                    // trees, rocks, ruins read as darker specks
    if(tv===T.OCEAN&&wd.map&&wd.map.coastDist){ var cd=Math.min(1,wd.map.coastDist[k]/120); f*=1-cd*0.45; }
    var i=k*4; d[i]=c[0]*f; d[i+1]=c[1]*f; d[i+2]=c[2]*f; d[i+3]=255; }
  g.putImageData(img,0,0); _wmBaseVer=ver; return _wmBaseCv;
}
function _wmFog(ps,ver){
  if(!_wmFogCv){ _wmFogCv=document.createElement('canvas'); _wmFogCv.width=EXP_W; _wmFogCv.height=EXP_H; }
  if(_wmFogVer===ver&&_wmFogPs===ps)return _wmFogCv;
  var g=_wmFogCv.getContext('2d'), img=g.createImageData(EXP_W,EXP_H), d=img.data, eg=ps.exploredGrid;
  for(var i=0;i<EXP_W*EXP_H;i++){ var j=i*4; d[j]=5;d[j+1]=8;d[j+2]=15;d[j+3]=eg&&eg[i]?0:255; }
  g.putImageData(img,0,0); _wmFogVer=ver; _wmFogPs=ps; return _wmFogCv;
}
function _wmExplored(ps,tx,ty){ var eg=ps&&ps.exploredGrid; if(!eg)return false; var cx=Math.floor(tx/EXP_SCALE),cy=Math.floor(ty/EXP_SCALE); return cx>=0&&cy>=0&&cx<EXP_W&&cy<EXP_H&&!!eg[cy*EXP_W+cx]; }
function _wmZoneAt(tx,ty){ if(!_WZONE)return null; var z=_WZONE[ty*WORLD_W+tx]; return z===255?null:WMAP_ZONES[z]; }
function _wmZoneLabel(tx,ty){
  tx=Math.floor(tx);ty=Math.floor(ty);
  var z=_wmZoneAt(tx,ty), sec=getTileSection(tx,ty);
  if(Math.hypot(tx-CENTER_X,ty-CENTER_Y)<VILLAGE_RADIUS+4)return {name:'Village',region:'Mirror Lake shore'};
  if(!z)return {name:WM_REGION_NAMES[sec]||'',region:''};
  return {name:_wmZoneName(z.id),region:WM_REGION_NAMES[z.r]};
}
var _WM_SITE_ICO={dungeon:'⚔',tower:'🗼',camp:'⛺',harbor:'⚓',skyport:'🎈',volcano_main:'🌋',volcano_mini:'🔥'};
var _WM_BORDER_COL={silverrun:'#7fd0ff',scarp:'#ffd27a',chasm:'#ff8a5a',ember:'#e0a0ff'};
// Draw a view (tile rect v={x,y,w,h}) of the world into ctx (cw×ch px).
function _wmDrawView(ctx,cw,ch,ws,v,o){
  o=o||{}; var wd=ws.wd, ps=ws.playerState, sc=cw/v.w;
  var X=function(tx){return (tx-v.x)*sc;}, Y=function(ty){return (ty-v.y)*sc;};
  ctx.save(); ctx.fillStyle='#05080f'; ctx.fillRect(0,0,cw,ch);
  ctx.imageSmoothingEnabled=sc<1; ctx.drawImage(_wmBase(wd),v.x,v.y,v.w,v.h,0,0,cw,ch);
  ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='high';
  ctx.drawImage(_wmFog(ps,ws._expVer||0),v.x/EXP_SCALE,v.y/EXP_SCALE,v.w/EXP_SCALE,v.h/EXP_SCALE,0,0,cw,ch);
  var inV=function(tx,ty,m){ m=m||4; return tx>=v.x-m&&ty>=v.y-m&&tx<=v.x+v.w+m&&ty<=v.y+v.h+m; };
  var lbl=function(txt,x,y,col,size,weight){ ctx.font=(weight||600)+' '+size+'px "Segoe UI",sans-serif'; ctx.lineWidth=Math.max(2,size/4); ctx.strokeStyle='rgba(0,0,0,.85)'; ctx.strokeText(txt,x,y); ctx.fillStyle=col; ctx.fillText(txt,x,y); };
  ctx.textAlign='center'; ctx.textBaseline='middle';
  var big=!!o.full, U=big?1:0.8;   // marker scale
  // zone + region names (full map only, visited zones only)
  var vz=ps.visitedZones||[];
  if(big&&o.labels!==false){
    WMAP_ZONES.forEach(function(z){ if(vz.indexOf(z.id)<0||!inV(z.x,z.y))return; lbl(_wmZoneName(z.id),X(z.x),Y(z.y)-14*U,'rgba(255,255,255,.92)',Math.max(10,Math.min(14,sc*9)),600); });
    [[1,960,40],[2,900,1165],[3,250,1165],[4,260,40]].forEach(function(q){ var seen=WMAP_ZONES.some(function(z){return z.r===q[0]&&vz.indexOf(z.id)>=0;}); if(!seen||!inV(q[1],q[2],60))return; lbl(WM_REGION_NAMES[q[0]].toUpperCase(),X(q[1]),Y(q[2]),'rgba(255,238,200,.9)',Math.max(14,Math.min(22,sc*16)),700); });
  }
  // village
  if(inV(CENTER_X,CENTER_Y)){ ctx.fillStyle='#e9c46a'; ctx.strokeStyle='#000'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(X(CENTER_X),Y(CENTER_Y),(big?8:6),0,Math.PI*2); ctx.fill(); ctx.stroke(); if(big)lbl('Village',X(CENTER_X),Y(CENTER_Y)+18,'#ffe9a8',12,700); }
  // crossings (explored only)
  (wd.gates||[]).forEach(function(G){ if(!inV(G.x,G.y)||!_wmExplored(ps,G.x,G.y))return; var gx=X(G.x),gy=Y(G.y), r=(big?9:6), col=_WM_BORDER_COL[G.border]||'#ff9a60';
    ctx.fillStyle=G.open?col:'#40404a'; ctx.strokeStyle=G.open?'#000':col; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(gx,gy-r); ctx.lineTo(gx+r,gy); ctx.lineTo(gx,gy+r); ctx.lineTo(gx-r,gy); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.font=(big?11:8)+'px serif'; ctx.fillStyle='#fff'; ctx.fillText(G.open?G.icon:'🔒',gx,gy+1);
    if(big&&o.labels!==false){ var lx=G.dir==='v'?gx:gx+r+6, ly=G.dir==='v'?gy+r+10:gy-r-6; ctx.textAlign=G.dir==='v'?'center':'left'; lbl(G.name,lx,ly,G.open?col:'#b8b8c8',11,700); ctx.textAlign='center'; } });
  // sites (explored only; the active quest's site always)
  (wd.sites||[]).forEach(function(S){ var sx=S.tx+1.5, sy=S.ty+1.5; if(!inV(sx,sy))return; var q=ps.activeQuest&&!S.bonus&&ps.activeQuest==='s'+S.section+'_'+S.type;
    if(!q&&!_wmExplored(ps,sx,sy))return; var px=X(sx),py=Y(sy), r=(big?8:5);
    if(q){ ctx.fillStyle='rgba(255,255,80,.35)'; ctx.beginPath(); ctx.arc(px,py,r*2,0,Math.PI*2); ctx.fill(); }
    ctx.fillStyle='rgba(0,0,0,.65)'; ctx.beginPath(); ctx.arc(px,py,r,0,Math.PI*2); ctx.fill(); ctx.strokeStyle=q?'#ffff44':S.boss?'#ffd24a':'#c8b8ff'; ctx.lineWidth=q?2.5:1.5; ctx.stroke();
    ctx.font=(big?10:7)+'px serif'; ctx.fillStyle='#fff'; ctx.fillText(_WM_SITE_ICO[S.type]||'•',px,py+1);
    if(q&&big)lbl('Quest: '+(S.name||S.type),px,py+r*2+8,'#ffff88',11,700); });
  // hidden caches (explored, unopened)
  var oc=ps.openedCaches||[];
  (wd.caches||[]).forEach(function(c){ if(oc.indexOf(c.id)>=0||!inV(c.x,c.y)||!_wmExplored(ps,c.x,c.y))return; var px=X(c.x),py=Y(c.y), r=big?5:3.5;
    ctx.fillStyle='#ffd24a'; ctx.strokeStyle='#3a2208'; ctx.lineWidth=1.5; ctx.fillRect(px-r,py-r*0.8,r*2,r*1.6); ctx.strokeRect(px-r,py-r*0.8,r*2,r*1.6); });
  // waystones
  var act=ps.activatedWaystones||[];
  (wd.waystones||[]).forEach(function(Wy){ if(!inV(Wy.x,Wy.y))return; var on=act.indexOf(Wy.id)>=0; if(!on&&!_wmExplored(ps,Wy.x,Wy.y))return;
    var px=X(Wy.x),py=Y(Wy.y), w=(big?7:5), h=(big?14:10); if(o.travel&&Wy.id===o.travel){ ctx.strokeStyle='#ffd24a'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(px,py,h,0,Math.PI*2); ctx.stroke(); }
    if(on){ ctx.save(); ctx.shadowColor='#6fe3f5'; ctx.shadowBlur=big?10:6; ctx.fillStyle='#6fe3f5'; ctx.fillRect(px-w/2,py-h/2,w,h); ctx.restore(); } else { ctx.fillStyle='#50606a'; ctx.fillRect(px-w/2,py-h/2,w,h); }
    ctx.strokeStyle='#002830'; ctx.lineWidth=1.2; ctx.strokeRect(px-w/2,py-h/2,w,h); });
  // player arrow
  if(ws.player){ var ptx=ws.player.x/TILE, pty=ws.player.y/TILE, a={up:-Math.PI/2,down:Math.PI/2,left:Math.PI,right:0}[ws.player.dir]||Math.PI/2;
    var px2=X(ptx),py2=Y(pty), s2=big?9:7; ctx.save(); ctx.translate(px2,py2); ctx.rotate(a);
    ctx.fillStyle='#00ffcc'; ctx.strokeStyle='#002a22'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(s2,0); ctx.lineTo(-s2*0.7,s2*0.65); ctx.lineTo(-s2*0.35,0); ctx.lineTo(-s2*0.7,-s2*0.65); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}

// ─── Always-visible HUD Minimap ─────────────────────────────────────────────
function _drawMinimapHud(ws,dng){
  var cv=document.getElementById('minimap-hud-canvas');if(!cv)return;
  var ctx=cv.getContext('2d');
  var cw=cv.width,ch=cv.height;
  ctx.fillStyle='rgba(5,8,18,0.85)';ctx.fillRect(0,0,cw,ch);
  var zl=document.getElementById('mmh-zone');
  if(dng&&dng.dtiles&&dng._dngFogExplored){
    // ── Dungeon minimap ──
    var scaleX=cw/DW,scaleY=ch/DH;
    var fog=dng._dngFogExplored;
    var DCOL={0:'#1a1a2a',1:'#6a5040',2:'#00cc88',3:'#ff8844',4:'#ffcc44',5:'#ffaa44'};
    for(var ty=0;ty<DH;ty++){
      for(var tx=0;tx<DW;tx++){
        var idx=ty*DW+tx;
        if(!fog[idx]){ctx.fillStyle='#050810';ctx.fillRect(tx*scaleX,ty*scaleY,scaleX+.5,scaleY+.5);continue;}
        var tv=dng.dtiles[ty][tx];
        ctx.fillStyle=DCOL[tv]||'#3a2a18';
        ctx.fillRect(tx*scaleX,ty*scaleY,scaleX+.5,scaleY+.5);
      }
    }
    var ppx=(dng.px/TILE)*scaleX,ppy=(dng.py/TILE)*scaleY;
    ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(ppx,ppy,4,0,Math.PI*2);ctx.fill();
    if(zl)zl.innerHTML='&nbsp;';
  } else if(ws&&ws.wd&&ws.playerState&&ws.playerState.exploredGrid&&ws.player){
    // ── World minimap: ~150 tiles around the hero ──
    var n=WM_MINI_TILES, ptx=ws.player.x/TILE, pty=ws.player.y/TILE;
    var v={x:Math.max(0,Math.min(WORLD_W-n,ptx-n/2)),y:Math.max(0,Math.min(WORLD_H-n,pty-n/2)),w:n,h:n};
    _wmDrawView(ctx,cw,ch,ws,v,{full:false});
    if(zl){ var L=_wmZoneLabel(ptx,pty); zl.innerHTML=L.name+(L.region?' <small>· '+L.region+'</small>':''); }
  }
  ctx.strokeStyle='rgba(255,255,255,.2)';ctx.lineWidth=2;ctx.strokeRect(1,1,cw-2,ch-2);
}

// ─── Full World Map (B / 🗺 button) — also the waystone travel screen ─────
var WMAP={zoom:1,cx:null,cy:null,travel:null,drag:null,hover:null,last:0};
function openWorldMap(opts){
  opts=opts||{};
  var ws=game&&game.scene?game.scene.getScene('World'):null; if(!ws||!ws.wd)return;
  var el=document.getElementById('modal-map'); if(!el)return;
  if(typeof _closeAllOverlays==='function'&&el.style.display==='none')_closeAllOverlays();
  WMAP.travel=opts.travelFrom||null;
  el.style.display='flex'; document.body.classList.add('bars-hidden');
  if(opts.travelFrom||WMAP.cx===null){ WMAP.zoom=opts.travelFrom?1:WMAP.zoom; }
  WMAP.cx=ws.player.x/TILE; WMAP.cy=ws.player.y/TILE;
  _wmSizeCanvas(); renderMinimap(ws.wd,ws.player,ws.playerState.unlockedSections,ws.playerState.exploredGrid,ws._expVer||0,ws.playerState.activeQuest,true);
  _wmRenderSide(ws);
}
function _wmSizeCanvas(){
  var cv=document.getElementById('minimap-canvas'); if(!cv)return;
  var side=Math.max(320,Math.min(window.innerHeight*0.94-90,window.innerWidth*0.96-300));
  var dpr=Math.min(2,window.devicePixelRatio||1);
  cv.style.width=side+'px'; cv.style.height=side+'px';
  if(cv.width!==Math.round(side*dpr)){ cv.width=Math.round(side*dpr); cv.height=Math.round(side*dpr); }
  WMAP.dpr=dpr; WMAP.side=side;
}
function _wmView(){
  var n=WORLD_W/WMAP.zoom, cx=WMAP.cx===null?WORLD_W/2:WMAP.cx, cy=WMAP.cy===null?WORLD_H/2:WMAP.cy;
  if(WMAP.zoom<=1){ cx=WORLD_W/2; cy=WORLD_H/2; }
  return {x:Math.max(0,Math.min(WORLD_W-n,cx-n/2)),y:Math.max(0,Math.min(WORLD_H-n,cy-n/2)),w:n,h:n};
}
function renderMinimap(wd,player,unlockedSections,exploredGrid,expVer,activeQuest,force){
  var cv=document.getElementById('minimap-canvas');if(!cv||!wd)return;
  var mapModal=document.getElementById('modal-map');
  if(!mapModal||mapModal.style.display==='none')return;
  var now=Date.now(); if(!force&&now-WMAP.last<90)return; WMAP.last=now;
  var ws=game.scene.getScene('World'); if(!ws||!ws.playerState)return;
  var ctx=cv.getContext('2d');
  _wmDrawView(ctx,cv.width,cv.height,ws,_wmView(),{full:true,travel:WMAP.travel});
  document.querySelectorAll('.wmap-z').forEach(function(b){ b.classList.toggle('on',+b.dataset.z===WMAP.zoom); });
}
function _wmCost(ws,from,to){
  if(!from||!to||from.id===to.id)return 0;
  if(to.region===0)return 0;                                   // going home is always free
  var rf=from.region===0?1:from.region;                        // the village sits on the Grasslands shore
  if(rf===to.region)return 0;                                  // same region: free
  return 10+Math.round(Math.hypot(to.x-from.x,to.y-from.y)/15); // across regions: gold by distance
}
function _wmRenderSide(ws){
  var side=document.getElementById('wmap-side'), title=document.getElementById('wmap-title'); if(!side)return;
  var ps=ws.playerState, wd=ws.wd, act=ps.activatedWaystones||[];
  var from=WMAP.travel?wd.waystones.find(function(w){return w.id===WMAP.travel;}):null;
  if(title)title.textContent=from?'🔷 '+from.name+' — travel':'🗺️ World Map';
  var h='';
  if(from){
    h+='<h4>Travel to</h4><div class="wm-note">Free within a region · gold to cross into another region · home is always free. 💰 '+ps.gold+'g</div>';
    [0,1,2,3,4].forEach(function(r){
      var list=wd.waystones.filter(function(w){return w.region===r&&act.indexOf(w.id)>=0;}); if(!list.length)return;
      h+='<h4>'+(r===0?'Village':WM_REGION_NAMES[r])+'</h4>';
      list.forEach(function(w){ var here=w.id===from.id, c=_wmCost(ws,from,w), poor=c>ps.gold;
        h+='<button class="wm-ws'+(here?' here':'')+'" data-ws="'+w.id+'"'+(here||poor?' disabled':'')+'><b>'+w.name.replace(' Waystone','')+'</b>'+(here?'<em class="free">you are here</em>':c?'<em>'+c+'g</em>':'<em class="free">free</em>')+'</button>'; });
    });
    var locked=wd.waystones.length-act.length;
    if(locked>0)h+='<div class="wm-note">'+locked+' more waystone'+(locked>1?'s':'')+' to find. Touch one with [Tab] to add it to the network.</div>';
  } else {
    h+='<h4>Legend</h4>'+[['#e9c46a','Village'],['#6fe3f5','Waystone (active)'],['#50606a','Waystone (not yet touched)'],['#ffd24a','★ Boss site'],['#c8b8ff','Tower / dungeon / camp'],['#7fd0ff','Crossing (open)'],['#40404a','Crossing (🔒 not built yet)'],['#ffd24a','Hidden cache (use your mount)'],['#00ffcc','You']].map(function(l){return '<div class="wm-lg"><i style="background:'+l[0]+'"></i>'+l[1]+'</div>';}).join('');
    h+='<h4>Crossings</h4>';
    WMAP_BORDERS.forEach(function(B){ var gs=wd.gates.filter(function(g){return g.border===B.id;}), open=gs.length&&gs[0].open, C=CRAFTSMEN[B.craftsman];
      h+='<div class="wm-lg"><i style="background:'+(open?_WM_BORDER_COL[B.id]:'#40404a')+'"></i><span><b>'+B.name+'</b> · '+(open?B.icon+' open (3 crossings)':'🔒 free '+(C?C.n:'the craftsman'))+'</span></div>'; });
    h+='<h4>Waystones</h4><div class="wm-note">'+act.length+' / '+wd.waystones.length+' active. Stand at one and press <b>[Tab]</b> to travel.</div>';
    h+='<div class="wm-note">Drag to pan · wheel or buttons to zoom · only explored land is shown.</div>';
  }
  side.innerHTML=h;
}
(function(){
  document.addEventListener('click',function(e){
    var zb=e.target.closest&&e.target.closest('.wmap-z'); var ws=game&&game.scene?game.scene.getScene('World'):null;
    if(zb&&ws){ var z=+zb.dataset.z; if(z===0){ WMAP.cx=ws.player.x/TILE; WMAP.cy=ws.player.y/TILE; if(WMAP.zoom<2)WMAP.zoom=2; } else { WMAP.zoom=z; WMAP.cx=ws.player.x/TILE; WMAP.cy=ws.player.y/TILE; } renderMinimap(ws.wd,null,null,null,0,null,true); return; }
    var wb=e.target.closest&&e.target.closest('.wm-ws'); if(wb&&!wb.disabled&&ws&&ws._travelTo){ ws._travelTo(wb.dataset.ws); return; }
  });
  var cvOf=function(){ return document.getElementById('minimap-canvas'); };
  var toTile=function(e){ var cv=cvOf(), r=cv.getBoundingClientRect(), v=_wmView(); return [v.x+(e.clientX-r.left)/r.width*v.w, v.y+(e.clientY-r.top)/r.height*v.h]; };
  document.addEventListener('mousedown',function(e){ if(e.target.id!=='minimap-canvas')return; WMAP.drag={x:e.clientX,y:e.clientY,cx:WMAP.cx,cy:WMAP.cy,moved:false}; e.target.classList.add('drag'); });
  document.addEventListener('mouseup',function(e){ var d=WMAP.drag; WMAP.drag=null; var cv=cvOf(); if(cv)cv.classList.remove('drag');
    if(d&&!d.moved&&e.target.id==='minimap-canvas'&&WMAP.travel){ var ws=game.scene.getScene('World'), t=toTile(e), best=null,bd=1e9;
      (ws.wd.waystones||[]).forEach(function(w){ var dd=Math.hypot(w.x-t[0],w.y-t[1]); if(dd<bd){bd=dd;best=w;} });
      var tol=_wmView().w/WMAP.side*14; if(best&&bd<tol&&(ws.playerState.activatedWaystones||[]).indexOf(best.id)>=0&&best.id!==WMAP.travel)ws._travelTo(best.id); } });
  document.addEventListener('mousemove',function(e){
    var cv=cvOf(); if(!cv)return; var ws=game&&game.scene?game.scene.getScene('World'):null; if(!ws||!ws.wd)return;
    if(WMAP.drag){ var r=cv.getBoundingClientRect(), v=_wmView(), dx=(e.clientX-WMAP.drag.x)/r.width*v.w, dy=(e.clientY-WMAP.drag.y)/r.height*v.h; if(Math.abs(e.clientX-WMAP.drag.x)+Math.abs(e.clientY-WMAP.drag.y)>4)WMAP.drag.moved=true;
      if(WMAP.zoom>1&&WMAP.drag.moved){ WMAP.cx=Math.max(v.w/2,Math.min(WORLD_W-v.w/2,WMAP.drag.cx-dx)); WMAP.cy=Math.max(v.h/2,Math.min(WORLD_H-v.h/2,WMAP.drag.cy-dy)); renderMinimap(ws.wd,null,null,null,0,null,true); } return; }
    var tip=document.getElementById('wmap-tip'); if(!tip)return;
    if(e.target.id!=='minimap-canvas'){ tip.style.display='none'; return; }
    var t=toTile(e), ps=ws.playerState, txt='';
    if(!_wmExplored(ps,t[0],t[1])){ txt='<span>Unexplored</span>'; }
    else {
      var near=function(list,f){ var best=null,bd=_wmView().w/WMAP.side*12; (list||[]).forEach(function(o){ var p=f(o), dd=Math.hypot(p[0]-t[0],p[1]-t[1]); if(dd<bd){bd=dd;best=o;} }); return best; };
      var W1=near(ws.wd.waystones,function(o){return [o.x,o.y];}), G=near(ws.wd.gates,function(o){return [o.x,o.y];}), S=near(ws.wd.sites,function(o){return [o.tx+1.5,o.ty+1.5];});
      if(W1){ var on=(ps.activatedWaystones||[]).indexOf(W1.id)>=0, from=WMAP.travel&&ws.wd.waystones.find(function(w){return w.id===WMAP.travel;});
        txt='<b>🔷 '+W1.name+'</b>'+(on?(from&&W1.id!==from.id?' <span>· click to travel ('+(_wmCost(ws,from,W1)||'free')+(_wmCost(ws,from,W1)?'g':'')+')</span>':''):' <span>· touch it to activate</span>'); }
      else if(G){ var C=CRAFTSMEN[G.craftsman]; txt='<b>'+(G.open?G.icon:'🔒')+' '+G.name+'</b> <span>· '+G.borderName+(G.open?'':' · free '+(C?C.n:'the craftsman'))+'</span>'; }
      else if(S){ txt='<b>'+(_WM_SITE_ICO[S.type]||'')+' '+_siteLabel(S)+'</b>'; }
      else { var L=_wmZoneLabel(t[0],t[1]); txt='<b>'+L.name+'</b>'+(L.region?' <span>· '+L.region+'</span>':''); }
    }
    var rr=cv.getBoundingClientRect(); tip.innerHTML=txt; tip.style.display='block'; tip.style.left=Math.min(e.clientX-rr.left+14,rr.width-180)+'px'; tip.style.top=(e.clientY-rr.top+14)+'px';
  });
  document.addEventListener('wheel',function(e){ if(e.target.id!=='minimap-canvas')return; e.preventDefault(); var ws=game.scene.getScene('World'); if(!ws)return;
    var zs=[1,2,4,8], i=zs.indexOf(WMAP.zoom); if(i<0)i=0; var t=toTile(e); i=Math.max(0,Math.min(zs.length-1,i+(e.deltaY<0?1:-1))); WMAP.zoom=zs[i]; WMAP.cx=t[0]; WMAP.cy=t[1]; renderMinimap(ws.wd,null,null,null,0,null,true); },{passive:false});
  window.addEventListener('resize',function(){ var el=document.getElementById('modal-map'); if(el&&el.style.display!=='none')_wmSizeCanvas(); });
})();

function updateInventoryModal(ps){
  if(!ps){var ws=game&&game.scene?game.scene.getScene('World'):null;if(!ws||!ws.playerState)return;ps=ws.playerState;}
  var inv=ps.inventory||[]; var eq=ps.equip||{}; var stats=calcStatsFromState(ps);
  var activeTab=window._invTab||'equip';
  var TABS=[{id:'equip',label:'Equipped'},{id:'weapons',label:'Weapons'},
    {id:'armor',label:'Armor'},{id:'accessories',label:'Accessories'},
    {id:'ammo',label:'🪃 Ammo'},{id:'food',label:'Food'},{id:'gems',label:'Gems'},{id:'potions',label:'Potions'}];
  var tbEl=document.getElementById('inv-tabs');
  if(tbEl)tbEl.innerHTML=TABS.map(function(t){
    return '<button class="inv-tab-btn'+(activeTab===t.id?' itab-active':'')+'" onclick="window._switchInvTab(\''+t.id+'\')">'+t.label+'</button>';
  }).join('');
  var ct=document.getElementById('inv-content'); if(!ct)return;
  var h='';
  var SLBL={lHand:'Melee',rHand:'Ranged',mWeapon:'Magic Weapon',body:'Body Armor',shield:'Shield',head:'Helmet',feet:'Boots',pants:'Pants',gauntlets:'Gauntlets',neck:'Amulet',back:'Cloak',spell:'Spell (X)',special:'Special (Z)'};
  var SICO={lHand:'⚔',rHand:'🏹',mWeapon:'🔮',body:'🛡',shield:'🛡️',head:'🪖',feet:'🥾',pants:'🦵',gauntlets:'🧤',neck:'🧿',back:'🧣',spell:'💫',special:'⚡'};
  function slotCard(sk){
    var iid=eq[sk],item=iid?ITEMS[iid]:null;
    var cf="window._openSlotPicker2('"+sk+"')" ;
    if(item){
      var st='';if(item.atk)st='+'+item.atk+' ATK';if(item.def)st+=(st?' ':'')+'+'+item.def+' DEF';
      return '<div class="pd-slot2 pd-filled" onclick="'+cf+'">'+'<div class="pd-label2">'+SLBL[sk]+'</div><div class="pd-icon2">'+item.icon+'</div><div class="pd-name2">'+item.name+'</div>'+(st?'<div class="pd-stat2">'+st+'</div>':'')+'</div>';
    }else{
      return '<div class="pd-slot2 pd-empty2" onclick="'+cf+'">'+'<div class="pd-label2">'+SLBL[sk]+'</div><div class="pd-icon2" style="font-size:15px;opacity:.3">'+( SICO[sk]||'?')+'</div><div style="font-size:8px;color:#446;margin-top:2px">empty</div></div>';
    }
  }
  if(activeTab==='equip'){
    var GRID=[['back','head',null],[null,'body','shield'],['gauntlets',null,'rHand'],[null,'pants','neck'],['feet','special','lHand'],['spell',null,'mWeapon']];
    h+='<div class="pd-body-wrap"><div class="pd-body-col">';
    h+='<div class="pd-body-grid">';
    GRID.forEach(function(row){row.forEach(function(sk){h+=sk?slotCard(sk):'<div class="pd-blank"></div>';});});
    h+='</div>';
    h+='<div class="inv-stats-row">'
      +'<div class="stat-row"><span>Level</span><span class="sv">'+ps.level+'</span></div>'
      +'<div class="stat-row"><span>HP</span><span class="sv">'+ps.hp+'/'+ps.maxHp+'</span></div>'
      +'<div class="stat-row"><span>Gold</span><span class="sv">'+ps.gold+'g</span></div>'
      +'<div class="stat-row"><span>ATK</span><span class="sv">'+stats.atk+'</span></div>'
      +'<div class="stat-row"><span>DEF</span><span class="sv">'+stats.def+'</span></div>'
      +'<div class="stat-row"><span>Mana</span><span class="sv">'+(Math.floor(ps.mana||0))+'/'+ps.maxMana+'</span></div>'
      +(stats.manaRegen>0?'<div class="stat-row"><span>MP Regen</span><span class="sv">'+(4+stats.manaRegen).toFixed(1)+'/s</span></div>':'')
      +(stats.cdReduce>0?'<div class="stat-row"><span>Cooldown</span><span class="sv">-'+Math.round(stats.cdReduce*100)+'%</span></div>':'')
      +(stats.spdBonus>0?'<div class="stat-row"><span>Speed</span><span class="sv">+'+(Math.round(stats.spdBonus*100))+'%</span></div>':'')
      +'<div class="stat-row"><span>XP</span><span class="sv">'+ps.xp+'/ '+(ps.level*100)+'</span></div>'
      +'</div>';
    // Active slots
    h+='<div style="font-size:9px;color:#557;text-transform:uppercase;letter-spacing:.5px;margin-top:10px;margin-bottom:5px">Active Slots</div>';
    h+='<div class="pd-active-row">';
    var _spIt=(ps.equip&&ps.equip.special)?ITEMS[ps.equip.special]:null;
    var sk2Name=_spIt?_spIt.name:'none';
    var sk2Icon=_spIt?_spIt.icon:'⚡';
    h+='<div class="pd-active-slot'+(sk2Name!=='none'?' pd-active-filled':'')+'" onclick="showQuickPick(\'special\')">'+'<div class="pd-label2">Special</div><div class="pd-icon2">'+sk2Icon+'</div><div style="font-size:8px;color:'+(sk2Name!=='none'?'#aaddff':'#446')+';margin-top:2px">'+sk2Name+'</div></div>';
    var mnt=ps.mount?MOUNTS[ps.mount]:null;
    h+='<div class="pd-active-slot'+(mnt?' pd-active-filled':'')+'" onclick="toggleModal(\'mounts\')">'+'<div class="pd-label2">Mount</div><div class="pd-icon2">'+(mnt?mnt.icon:'🐎')+'</div><div style="font-size:8px;color:'+(mnt?'#aaddff':'#446')+';margin-top:2px">'+(mnt?mnt.n:'none')+'</div></div>';
    var fam=ps.familiar?FAMILIARS[ps.familiar]:null;
    h+='<div class="pd-active-slot'+(fam?' pd-active-filled':'')+'" onclick="showQuickPick(\'familiar\')">'+'<div class="pd-label2">Familiar</div><div class="pd-icon2">'+(fam?fam.icon:'🐾')+'</div><div style="font-size:8px;color:'+(fam?'#aaddff':'#446')+';margin-top:2px">'+(fam?fam.n:'none')+'</div></div>';
    var potIdx=inv.findIndex(function(id){return ITEMS[id]&&ITEMS[id].slot==='use';});
    var pot=potIdx>=0?ITEMS[inv[potIdx]]:null;
    h+='<div class="pd-active-slot'+(pot?' pd-active-filled':'')+'" onclick="showQuickPick(\'potion\')">'+'<div class="pd-label2">Potion (P)</div><div class="pd-icon2">'+(pot?pot.icon:'🧪')+'</div><div style="font-size:8px;color:'+(pot?'#44eeff':'#446')+';margin-top:2px">'+(pot?pot.name:'none')+'</div></div>';
    var foodIdx=inv.findIndex(function(id){return ITEMS[id]&&ITEMS[id].slot==='food';});
    var fd2=foodIdx>=0?ITEMS[inv[foodIdx]]:null;
    h+='<div class="pd-active-slot'+(fd2?' pd-active-filled':'')+'" onclick="showQuickPick(\'food\')">'+'<div class="pd-label2">Food (O)</div><div class="pd-icon2">'+(fd2?fd2.icon:'🍞')+'</div><div style="font-size:8px;color:'+(fd2?'#44eeff':'#446')+';margin-top:2px">'+(fd2?fd2.name:'none')+'</div></div>';
    h+='</div></div>'; // /pd-active-row /pd-body-col
    // Rings column
    h+='<div class="pd-ring-col"><div class="pd-ring-col-title">💍 Rings</div>';
    for(var ri=1;ri<=10;ri++){
      var rk='ring'+ri,rid=eq[rk],ritem=rid?ITEMS[rid]:null;
      var rc="window._openSlotPicker2('"+rk+"')" ;
      if(ritem){
        var rst='';if(ritem.atk)rst='+'+ritem.atk+' ATK';if(ritem.def)rst+=(rst?' ':'')+('+ '+ritem.def+' DEF');
        h+='<div class="pd-ring-slot pd-ring-filled" onclick="'+rc+'"><span class="pr-icon">'+(ritem.icon)+'</span><span class="pr-name">'+(ritem.name)+'</span>'+(rst?'<span class="pr-stat">'+rst+'</span>':'')+ '</div>';
      }else{ h+='<div class="pd-ring-slot" onclick="'+rc+'"><span class="pr-icon" style="opacity:.28">💍</span><span class="pr-name" style="color:#445">Ring '+ri+'</span></div>';
      }
    }
    h+='<div style="margin-top:8px;font-size:9px;color:#446;text-align:center">2 rings per Tower reward</div>';
    h+='</div></div>'; // /pd-ring-col /pd-body-wrap
  }else if(activeTab==='weapons'){
    function wRow(id){var it=ITEMS[id];if(!it)return'';var i=inv.indexOf(id);var st=it.atk?'+'+it.atk+' ATK':'';if(it.elementDmg)st+=' +'+it.elementDmg+' '+it.element;if(it.spellMult)st+=' ×'+it.spellMult+' spell';return'<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">'+st+'</span><button class="ir-equip" onclick="window._equipItem('+i+',\''+it.slot+'\')">Equip</button></div>';}
    var ml=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='lHand';}),rl=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='rHand';}),mgw=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='mWeapon';});
    h+='<div class="wep-section-title">⚔ Melee Weapons</div>';
    h+=ml.length?'<div class="item-list">'+ml.map(wRow).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">None in inventory</p>';
    h+='<div class="wep-section-title">🏹 Ranged Weapons</div>';
    h+=rl.length?'<div class="item-list">'+rl.map(wRow).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">None in inventory</p>';
    h+='<div class="wep-section-title">🔮 Magic Weapons (Staff/Wand)</div>';
    h+=mgw.length?'<div class="item-list">'+mgw.map(wRow).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">None in inventory</p>';
  }else if(activeTab==='armor'){
    var ASEC=[{slot:'body',lbl:'Body Armor'},{slot:'shield',lbl:'Shields'},{slot:'head',lbl:'Helmets'},{slot:'gauntlets',lbl:'Gauntlets'},{slot:'pants',lbl:'Pants'},{slot:'feet',lbl:'Boots'},{slot:'back',lbl:'Cloaks'}];
    var any=false;
    ASEC.forEach(function(s){var it2=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot===s.slot;});if(!it2.length)return;any=true;h+='<div class="wep-section-title">'+s.lbl+'</div><div class="item-list">';it2.forEach(function(id){var it=ITEMS[id];if(!it)return;var i=inv.indexOf(id);var st=it.def?'+'+it.def+' DEF':'';if(it.spdBonus)st+=' +'+(it.spdBonus*100|0)+'% Spd';if(it.atk)st+=' +'+it.atk+' ATK';if(it.cdReduce)st+=' -'+(it.cdReduce*100|0)+'%CD';if(it.manaRegen)st+=' +'+it.manaRegen+'mp/s';if(it.maxMana)st+=' +'+it.maxMana+'MP';h+='<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">'+st+'</span><button class="ir-equip" onclick="window._equipItem('+i+',\''+s.slot+'\')">Equip</button></div>';});h+='</div>';});
    if(!any)h='<p style="color:#445;font-size:12px;padding:12px">No armor in inventory</p>';
  }else if(activeTab==='accessories'){
    function accRow(id,slotKey){var it=ITEMS[id];if(!it)return'';var i=inv.indexOf(id);var st='';if(it.atk)st='+'+it.atk+' ATK';if(it.def)st+=(st?' ':'')+'+'+it.def+' DEF';if(it.spdBonus)st+=(st?' ':'')+'+'+((it.spdBonus*100)|0)+'% Spd';if(it.cdReduce)st+=(st?' ':'')+'-'+((it.cdReduce*100)|0)+'%CD';if(it.manaRegen)st+=(st?' ':'')+'+'+it.manaRegen+'mp/s';if(it.maxMana)st+=(st?' ':'')+'+'+it.maxMana+'MP';return'<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">'+st+'</span><button class="ir-equip" onclick="window._equipItem('+i+',\''+slotKey+'\')">Equip</button></div>';}
    var rings=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='ring';}),amults=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='neck';}),spells=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='spell';});
    h+='<div class="wep-section-title">💍 Rings</div>';h+=rings.length?'<div class="item-list">'+rings.map(function(id){return accRow(id,'ring');}).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">No rings in inventory</p>';
    h+='<div class="wep-section-title">🧿 Amulets</div>';h+=amults.length?'<div class="item-list">'+amults.map(function(id){return accRow(id,'neck');}).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">No amulets in inventory</p>';
    h+='<div class="wep-section-title">💫 Spells</div>';h+=spells.length?'<div class="item-list">'+spells.map(function(id){return accRow(id,'spell');}).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">No spells in inventory</p>';
  }else if(activeTab==='ammo'){
    h+='<div class="wep-section-title">🏹 Arrows &amp; 🪃 Darts</div>';
    h+='<div class="item-list">';
    var ammoObj=ps.ammo||{};
    var ammoIds=['arrow_normal','arrow_cold','arrow_fire','arrow_heat','dart_normal','dart_cold','dart_fire','dart_heat'];
    var anyAmmo=false;
    ammoIds.forEach(function(aid){
      var it=ITEMS[aid];if(!it)return;
      var qty=ammoObj[aid]||0;
      anyAmmo=true;
      h+='<div class="item-row"><span class="ir-icon">'+it.icon+'</span>'
        +'<span class="ir-name">'+it.name+'</span>'
        +'<span class="ir-stat" style="color:'+(qty>0?'#88ccff':'#445')+'">× '+qty+'</span>'
        +'<span class="ir-stat" style="color:#445;font-size:9px">'+it.desc+'</span>'
        +'</div>';
    });
    if(!anyAmmo)h+='<p style="color:#445;font-size:11px;padding:8px">No ammo items defined yet.</p>';
    h+='</div>';
    h+='<p style="font-size:10px;color:#556;margin-top:8px">Arrows require a bow. Darts require a crossbow. Buy ammo at the Armory.</p>';
  }else if(activeTab==='food'){
    var fd=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='food';});
    h=fd.length?'<div class="item-list">'+fd.map(function(id){var it=ITEMS[id];return'<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">Restores '+it.heal+' HP</span><button class="ir-equip" style="color:#44eeff" onclick="window._useItem('+inv.indexOf(id)+')">Eat</button></div>';}).join('')+'</div>':'<p style="color:#445;font-size:12px;padding:12px">No food in inventory</p>';
  }else if(activeTab==='gems'){
    var gm=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='gem';});
    h=gm.length?'<div class="item-list">'+gm.map(function(id){var it=ITEMS[id];return'<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">'+it.desc+'</span></div>';}).join('')+'</div>':'<p style="color:#445;font-size:12px;padding:12px">No gems in inventory<br><small style="color:#334">Tip: use gems at the Blacksmith to craft elemental weapons. Sell them at the Jeweler or Merchant.</small></p>';
  }else if(activeTab==='potions'){
    var pt=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='use';});
    h=pt.length?'<div class="item-list">'+pt.map(function(id){var it=ITEMS[id];return'<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">Heals '+it.heal+' HP</span><button class="ir-equip" style="color:#44eeff" onclick="window._useItem('+inv.indexOf(id)+')">Use (P)</button></div>';}).join('')+'</div>':'<p style="color:#445;font-size:12px;padding:12px">No potions in inventory</p>';
  }else if(activeTab==='artifacts'){
    h='<div style="padding:20px;text-align:center;color:#557"><div style="font-size:28px;margin-bottom:10px">✨</div><div style="font-size:13px">Artifacts coming soon…</div><div style="font-size:10px;color:#334;margin-top:6px">Powerful passive items unlocked via special quests.</div></div>';
  }else if(activeTab==='skills'){
    var skItems=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='special';});
    var curSk=eq.special?ITEMS[eq.special]:null;
    if(curSk){
      h+='<div style="background:rgba(0,200,80,.08);border:1px solid rgba(0,200,80,.3);border-radius:8px;padding:10px 12px;margin-bottom:10px;display:flex;align-items:center;gap:10px">';
      h+='<span style="font-size:22px">'+curSk.icon+'</span>';
      h+='<div style="flex:1"><div style="font-size:12px;font-weight:700;color:#aee">'+curSk.name+' <span style="font-size:9px;color:#556">(press Z to activate)</span></div>';
      h+='<div style="font-size:10px;color:#446;margin-top:2px">'+(curSk.desc||'')+"</div></div>";
      h+='<button class="ir-equip" style="background:rgba(200,80,80,.15);border-color:rgba(200,80,80,.4);color:#ff8888" onclick="window._unequipSlot(\x27special\x27)">Remove</button></div>';
    }
    if(!skItems.length&&!curSk){
      h+='<p style="color:#445;font-size:12px;padding:12px">No skills yet. Use sandbox \'Give All Items\' or find skill books in dungeons.</p>';
    }else{
      h+='<div class="item-list">';
      skItems.forEach(function(id){
        var it=ITEMS[id];if(!it)return;var idx=inv.indexOf(id);var isEq=eq.special===id;
        h+='<div class="item-row" style="'+(isEq?'border-color:rgba(100,200,100,.4);background:rgba(0,200,80,.06)':'')+'"><span class="ir-icon">'+it.icon+'</span><div style="flex:1"><div class="ir-name">'+it.name+(isEq?' <span style="color:#44ffaa;font-size:9px">(active)</span>':'')+"</div><div class='ir-stat' style='text-align:left;margin-top:2px'>"+(it.desc||'')+"</div></div>"+(isEq?"":"<button class='ir-equip' onclick='window._equipItem("+idx+",'special')'>Equip</button>")+"</div>";
      });
      h+='</div>';
    }
  }
  // ── Familiars footer (always shown at bottom of inventory) ───────────
  var ownedFams=ps.ownedFamiliars||[];
  if(ownedFams.length){
    h+='<div style="margin-top:18px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08)">';
    h+='<div style="font-size:12px;font-weight:600;color:#aaccff;margin-bottom:8px">🐾 Familiars <span style="font-size:9px;color:#667;font-weight:400">— click for details · N to equip</span></div>';
    ownedFams.forEach(function(fid){ h+=_familiarCardHTML(fid, ps, "showFamiliarInfo('"+fid+"')"); });
    h+='</div>';
  }
  ct.innerHTML=h;
}

function switchInvTab(tab){
  window._invTab=tab;
  var ws=game&&game.scene?game.scene.getScene('World'):null;
  if(ws&&ws.playerState)updateInventoryModal(ws.playerState);
}
window._switchInvTab=switchInvTab;


function clickEquipSlot(slot){
  document.getElementById('slot-picker-modal').style.display='flex';
  window.selectedSlot=slot;
  var ps=getWorldScene().playerState,items=ITEMS,grid=document.getElementById('slot-picker-grid');
  grid.innerHTML='';
  for(var k in items){
    var it=items[k];
    if(it.slot===slot&&ps.inventory.indexOf(k)>=0){
      var btn=document.createElement('button');
      btn.className='abtn';
      btn.style.padding='10px';
      btn.textContent=it.icon+' '+it.name;
      btn.onclick=function(){equipItem(k,slot);};
      grid.appendChild(btn);
    }
  }
}

function equipItem(item,slot){
  var ps=getWorldScene().playerState;
  ps.equip[slot]=item;
  document.getElementById('slot-picker-modal').style.display='none';
  updateInventoryModal();
}


function calcStatsFromState(ps){
  var eq=ps.equip||{};
  function ia(k){return eq[k]&&ITEMS[eq[k]]?ITEMS[eq[k]]:null;}
  var allSlots=['lHand','rHand','mWeapon','body','shield','head','feet','pants','gauntlets','neck','back','spell'];
  for(var _i=1;_i<=10;_i++)allSlots.push('ring'+_i);
  // Melee ATK = base (which already includes level bumps) + sword (lHand) +
  // non-weapon-slot ATK bonuses. Bow (rHand), magic weapon (mWeapon) and
  // spell slots are EXCLUDED — they have their own combat formulas.
  var _atkExclude={rHand:1,mWeapon:1,spell:1};
  var atk=(ps.atk||3)+allSlots.reduce(function(s,k){return s+(_atkExclude[k]?0:(ia(k)?ia(k).atk||0:0));},0);
  var dSlots=['body','shield','head','feet','pants','gauntlets','neck','back'];
  for(var _i=1;_i<=10;_i++)dSlots.push('ring'+_i);
  var def=(ps.def||0)+dSlots.reduce(function(s,k){return s+(ia(k)?ia(k).def||0:0);},0);
  var spd=allSlots.reduce(function(s,k){return s+(ia(k)?ia(k).spdBonus||0:0);},0);
  return{atk:atk,def:def,spdBonus:spd};
}
window._equipItem=function(idx,slot){
  var ws=game.scene.getScene('World');if(!ws)return;
  var ps=ws.playerState;
  var id=ps.inventory[idx];if(!id)return;
  var eqSlot=slot;
  if(slot==='ring'){for(var _ri=1;_ri<=10;_ri++){if(!ps.equip['ring'+_ri]){eqSlot='ring'+_ri;break;}}}
  var old=ps.equip[eqSlot];
  ps.equip[eqSlot]=id;ps.inventory.splice(idx,1);
  if(old)ps.inventory.push(old);
  updateInventoryModal(ps);ws._emitUI();
};
window._unequipSlot=function(slot){
  var ws=game&&game.scene?game.scene.getScene('World'):null;if(!ws)return;
  var ps=ws.playerState;if(!ps)return;
  var id=ps.equip[slot];
  if(!id)return;
  ps.equip[slot]=null;
  ps.inventory.push(id);
  updateInventoryModal(ps);ws._emitUI();
};
