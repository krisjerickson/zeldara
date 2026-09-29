// ═══════════════════════════════════════════════════════════════════════
// ║ WORLD TRAVEL (Phase 3 · steps 3–4): border crossings, rune waystones,
// ║ zone banners and the HUD minimap tick. Added onto WorldScene.
// ║   Crossings — 3 per border; shut (the river / cliff / chasm / ridge) until
// ║     the border's craftsman is freed, then all three are built at once.
// ║   Waystones — [Tab] to activate; [Tab] again to open the travel map.
// ║     Travel: free inside a region and to the village, gold across regions.
// ═══════════════════════════════════════════════════════════════════════
Object.assign(WorldScene.prototype,{
  _initTravel(){
    var ps=this.playerState;
    if(!Array.isArray(ps.activatedWaystones))ps.activatedWaystones=[];
    if(ps.activatedWaystones.indexOf('ws_village')<0)ps.activatedWaystones.push('ws_village');
    if(!Array.isArray(ps.visitedZones))ps.visitedZones=[];
    this._gateObjs={}; this._wsObjs={};
    this._syncGates(false);
    var self=this;
    this.wd.waystones.forEach(function(w){ self._drawWaystone(w); });
    if(!Array.isArray(ps.openedCaches))ps.openedCaches=[];
    this._cacheObjs={}; (this.wd.caches||[]).forEach(function(c){ self._drawCache(c); });
    this._travelTick=0; this._zoneKey=null;
  },

  // ── crossings ──
  _syncGates(announce){
    if(!this.wd||!this.wd.gates)return;
    var self=this, changed=_wgApplyGates(this.wd,this.playerState);
    changed.forEach(function(g){ var seen={}; g.cells.forEach(function(c){ var x=c[0]%WORLD_W, y=(c[0]/WORLD_W)|0, key=Math.floor(x/CHUNK)+'_'+Math.floor(y/CHUNK); if(seen[key])return; seen[key]=1; if(self.activeChunks&&self.activeChunks.has(key))self._refreshChunkAt(x,y); }); });
    if(this._gateObjs)this.wd.gates.forEach(function(g){ self._drawGate(g); });
    if(announce&&changed.length){
      var borders={}; changed.forEach(function(g){ if(g.open)borders[g.border]=g; });
      Object.keys(borders).forEach(function(b,i){ var B=WMAP_BORDERS.find(function(q){return q.id===b;}), C=CRAFTSMEN[B.craftsman];
        self.time.delayedCall(1400+i*1200,function(){ showNotif(B.icon+' '+(C?C.n.replace(/^Captain /,'').split(' ')[0]:'The craftsman')+' opened the '+B.name+': '+B.names.join(', ')+'!','#ffe9a8'); }); });
    }
  },
  _drawGate(g){
    var old=this._gateObjs[g.id]; if(old&&old.open===g.open)return;
    if(old)old.parts.forEach(function(o){o.destroy();});
    var cx=g.x*TILE+TILE/2, cy=g.y*TILE+TILE/2, parts=[], col=parseInt((_WM_BORDER_COL[g.border]||'#ff9a60').slice(1),16);
    // two posts on each bank + a name board
    var along=g.dir==='v'?[0,1]:[1,0], across=g.dir==='v'?[1,0]:[0,1];
    // banks: just past the first/last border cell along the crossing
    var lo=0,hi=0; g.cells.forEach(function(c){ var a=g.dir==='v'?((c[0]/WORLD_W)|0)-g.y:(c[0]%WORLD_W)-g.x; if(a<lo)lo=a; if(a>hi)hi=a; });
    var bank={'-1':(lo-1)*TILE,'1':(hi+1)*TILE}, half=Math.max(-bank['-1'],bank['1']);
    for(var s=-1;s<=1;s+=2)for(var q=-1;q<=1;q+=2){
      var px=cx+along[0]*bank[s]+across[0]*q*TILE*2.6, py=cy+along[1]*bank[s]+across[1]*q*TILE*2.6;
      parts.push(this.add.rectangle(px,py-8,7,22,g.open?0x6a4a2a:0x4a3a2a).setStrokeStyle(1,0x000000,.6).setDepth(6));
      parts.push(this.add.circle(px,py-20,4,g.open?col:0x884444).setDepth(6));
    }
    if(!g.open){
      // barrier ropes on both banks
      for(var s2=-1;s2<=1;s2+=2){ var bx=cx+along[0]*bank[s2], by=cy+along[1]*bank[s2]-10;
        parts.push(this.add.rectangle(bx,by,across[0]*TILE*5.2+(across[0]?0:4),across[1]*TILE*5.2+(across[1]?0:4),0xaa3322,.9).setDepth(6)); }
    }
    var C=CRAFTSMEN[g.craftsman], txt=(g.open?g.icon+' ':'🔒 ')+g.name+(g.open?'':'\n'+(C?'free '+C.n:''));
    var lx=cx+along[0]*(half+TILE*1.5), ly=cy+along[1]*(half+TILE*1.5)-30;
    parts.push(domText(this,lx,ly,txt,{fontSize:'10px',color:g.open?'#ffe9a8':'#ffb0a0',fontFamily:'Segoe UI',align:'center',stroke:'#000',strokeThickness:3}).setOrigin(.5,1).setDepth(8));
    this._gateObjs[g.id]={open:g.open,parts:parts};
  },

  // ── waystones ──
  _drawWaystone(w){
    var old=this._wsObjs[w.id]; if(old)old.parts.forEach(function(o){o.destroy();});
    var on=(this.playerState.activatedWaystones||[]).indexOf(w.id)>=0;
    var x=w.x*TILE+TILE/2, y=w.y*TILE+TILE/2, parts=_wsWaystoneArt(this,w,on);
    parts.push(domText(this,x,y-110,w.name.replace(' Waystone',''),{fontSize:'9px',color:on?'#bff6ff':'#9aa6b0',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5,1).setDepth(8));
    this._wsObjs[w.id]={on:on,parts:parts,w:w,x:x,y:y};
  },
  _nearWaystone(){
    var px=this.player.x, py=this.player.y, best=null, bd=TILE*2.2;
    for(var i=0;i<this.wd.waystones.length;i++){ var w=this.wd.waystones[i], d=Math.hypot(px-(w.x*TILE+TILE/2),py-(w.y*TILE+TILE/2)); if(d<bd){bd=d;best=w;} }
    return best;
  },
  // ── hidden caches (islets inside the signature terrain) ──
  _drawCache(c){
    var old=this._cacheObjs[c.id]; if(old)old.forEach(function(o){o.destroy();});
    var open=this.playerState.openedCaches.indexOf(c.id)>=0, x=c.x*TILE+TILE/2, y=c.y*TILE+TILE/2, parts=[];
    parts.push(this.add.ellipse(x,y+9,26,8,0x000000,.35).setDepth(4));
    parts.push(this.add.rectangle(x,y+2,22,14,open?0x4a3420:0x7a4a22).setStrokeStyle(2,0x2a1808,1).setDepth(5));
    parts.push(this.add.rectangle(x,y-7,22,6,open?0x3a2818:0x8a5a2a).setStrokeStyle(2,0x2a1808,1).setDepth(5).setAngle(open?-18:0));
    parts.push(this.add.rectangle(x,y,4,5,open?0x777777:0xffd24a).setDepth(5));
    if(!open){ var sp=this.add.circle(x,y-4,14,0xffd24a,.14).setDepth(5).setBlendMode(Phaser.BlendModes.ADD); this.tweens.add({targets:sp,alpha:{from:.05,to:.25},duration:1100,yoyo:true,repeat:-1}); parts.push(sp); }
    this._cacheObjs[c.id]=parts;
  },
  _checkCache(){
    var px=this.player.x, py=this.player.y, ps=this.playerState, c=null;
    for(var i=0;i<(this.wd.caches||[]).length;i++){ var q=this.wd.caches[i]; if(ps.openedCaches.indexOf(q.id)>=0)continue; if(Math.hypot(px-(q.x*TILE+TILE/2),py-(q.y*TILE+TILE/2))<TILE*1.8){c=q;break;} }
    if(!c){ if(this._interactPrompt&&this._interactPrompt._cache){this._interactPrompt.destroy();this._interactPrompt=null;} return false; }
    if(!this._interactPrompt||this._interactPrompt._cache!==c.id){ if(this._interactPrompt)this._interactPrompt.destroy();
      this._interactPrompt=domText(this,c.x*TILE+TILE/2,c.y*TILE-18,'[Tab] Open hidden cache',{fontSize:'10px',color:'#ffe08a',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5,1).setDepth(20); this._interactPrompt._cache=c.id; }
    if(Phaser.Input.Keyboard.JustDown(this.keys.TAB))this._openCache(c);
    return true;
  },
  _openCache(c){
    var ps=this.playerState, r=c.region, gold=40*r+Math.floor(Math.random()*20*r);
    var gem={1:'gem_ruby',2:'pearl',3:'gem_sapphire',4:'fire_opal'}[r], pot='potion_a'+r;
    ps.openedCaches.push(c.id); ps.gold+=gold; if(!ps.inventory)ps.inventory=[];
    if(ITEMS[gem])ps.inventory.push(gem); if(ITEMS[pot])ps.inventory.push(pot,pot);
    if(this._interactPrompt){this._interactPrompt.destroy();this._interactPrompt=null;}
    this._drawCache(c);
    var n=ps.openedCaches.length, tot=this.wd.caches.length;
    showNotif('🎁 Hidden cache ('+n+'/'+tot+'): +'+gold+'g'+(ITEMS[gem]?', '+ITEMS[gem].icon+' '+ITEMS[gem].name:'')+', 2 potions','#ffe08a');
    this._emitUI(); this._save();
  },

  // Called at the top of _checkInteraction; true = handled this frame.
  _checkWaystone(){
    if(this._checkCache())return true;
    var w=this._nearWaystone();   // waystones win over landmark stories
    if(!w){ if(this._interactPrompt&&this._interactPrompt._ws){this._interactPrompt.destroy();this._interactPrompt=null;} return !!(this._checkLandmark&&this._checkLandmark()); }
    if(this._interactPrompt&&this._interactPrompt._lm){ this._interactPrompt.destroy(); this._interactPrompt=null; }
    var on=(this.playerState.activatedWaystones||[]).indexOf(w.id)>=0;
    var label=on?'[Tab] Travel — '+w.name:'[Tab] Activate '+w.name;
    if(!this._interactPrompt||this._interactPrompt._ws!==w.id+on){
      if(this._interactPrompt)this._interactPrompt.destroy();
      this._interactPrompt=domText(this,w.x*TILE+TILE/2,w.y*TILE-44,label,{fontSize:'10px',color:'#bff6ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20);
      this._interactPrompt._ws=w.id+on;
    }
    if(Phaser.Input.Keyboard.JustDown(this.keys.TAB)){ if(on)this._openTravel(w); else this._activateWaystone(w); }
    return true;
  },
  _activateWaystone(w){
    var ps=this.playerState; if(ps.activatedWaystones.indexOf(w.id)<0)ps.activatedWaystones.push(w.id);
    this._drawWaystone(w);
    if(this._interactPrompt){this._interactPrompt.destroy();this._interactPrompt=null;}
    var x=w.x*TILE+TILE/2, y=w.y*TILE-10, ring=this.add.circle(x,y,10,0x6fe3f5,.5).setDepth(9).setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({targets:ring,scale:6,alpha:0,duration:900,ease:'Cubic.easeOut',onComplete:function(){ring.destroy();}});
    var allW=_wmAllWaystones((game.scene.getScene('World')||this).wd), n=allW.filter(function(q){ return ps.activatedWaystones.indexOf(q.id)>=0; }).length, tot=allW.length;
    showNotif('🔷 '+w.name+' activated ('+n+'/'+tot+') — press [Tab] here to travel','#6fe3f5');
    this._expVer=(this._expVer||0)+1; this._save();
  },
  _openTravel(w){ if(this._interactPrompt){this._interactPrompt.destroy();this._interactPrompt=null;} openWorldMap({travelFrom:w.id}); },
  _travelTo(id){
    // travel works from any waystone (mainland or island) to any active one; islands are reached by boat-ferry
    var ws=game.scene.getScene('World')||this, ps=this.playerState, all=_wmAllWaystones(ws.wd), from=all.find(function(q){return q.id===WMAP.travel;}), to=all.find(function(q){return q.id===id;});
    var here=_owScene(); if(!from&&here&&here.islKey)from=(here.wd.waystones||[]).find(function(q){return q.id===WMAP.travel;});
    if(!from||!to||from.id===to.id)return;
    if((ps.activatedWaystones||[]).indexOf(to.id)<0){ showNotif('That waystone is not active yet','#ff8866'); return; }
    var cost=_wmCost(ws,from,to);
    if(cost>ps.gold){ showNotif('Not enough gold — '+cost+'g needed','#ff4444'); return; }
    ps.gold-=cost; closeModal('map');
    var onIsland=here&&here.islKey;
    if(onIsland){ if(to.island===here.islKey)return;
      if(to.island){ here._exitToWorld(null); ws._sailTo(to.island,'waystone'); }
      else here._exitToWorld(to);
      showNotif('🔷 Travelled to '+to.name+(cost?' (−'+cost+'g)':''),'#6fe3f5'); return; }
    if(to.island){ ws._sailTo(to.island,'waystone'); showNotif('🔷 Travelled to '+to.name+(cost?' (−'+cost+'g)':''),'#6fe3f5'); return; }
    this._cancelHomeCast(false); this._arriveAtWaystone(to,cost);
  },
  _arriveAtWaystone(to,cost){
    var x=to.x*TILE+TILE/2, y=(to.y+2)*TILE+TILE/2, self=this;
    this.cameras.main.fadeOut(220,120,230,255);
    this.cameras.main.once('camerafadeoutcomplete',function(){
      self.player.x=x; self.player.y=y; self.player.cont.setPosition(x,y);
      self.cameras.main.centerOn(x,y); self._updateChunks(); self.worldIFrames=1.5;
      self.cameras.main.fadeIn(320,120,230,255);
      if(cost!==undefined)showNotif('🔷 Travelled to '+to.name+(cost?' (−'+cost+'g)':''),'#6fe3f5');
      self._emitUI(); self._save();
    });
  },
  // take the ferry to a harbor island (from its harbor, or a waystone jump)
  _sailTo(key,arrive){
    var site=this.wd.sites.find(function(s){ return s.type==='harbor'&&(s.section+(s.isle||'a'))===key; }); if(!site)return;
    this._cancelHomeCast(false); if(this._interactPrompt){ this._interactPrompt.destroy(); this._interactPrompt=null; }
    this.scene.sleep('World'); this.scene.launch('Island',{site:site,worldScene:this,arrive:arrive||'dock'});
    document.getElementById('dungeon-hud').style.display='none';
  },
  // Random open land tile in a region (for monster / animal spawns).
  _randLand(rng,sec,minVil){
    var wd=this.wd;
    if(!wd.regionBox){ var bx={}; for(var y=0;y<WORLD_H;y+=4)for(var x=0;x<WORLD_W;x+=4){ var r=wd.region[y*WORLD_W+x], c=wd.cls[y*WORLD_W+x]; if(!r||c===WM.OCEAN||c===WM.SHALLOW)continue; var b=bx[r]||(bx[r]={x0:x,y0:y,x1:x,y1:y}); if(x<b.x0)b.x0=x; if(y<b.y0)b.y0=y; if(x>b.x1)b.x1=x; if(y>b.y1)b.y1=y; } wd.regionBox=bx; }
    var B=wd.regionBox[sec]; if(!B)return null;
    for(var a=0;a<80;a++){ var tx=Math.floor(B.x0+rng.next()*(B.x1-B.x0)), ty=Math.floor(B.y0+rng.next()*(B.y1-B.y0)), k=ty*WORLD_W+tx;
      if(wd.region[k]!==sec||wd.cls[k]!==WM.LAND)continue;
      if(ALWAYS_BLOCKED.has(this.tiles[ty][tx]))continue;
      if(Math.hypot(tx-CENTER_X,ty-CENTER_Y)<(minVil||VILLAGE_RADIUS+15))continue;
      if(this._nearSafeSpot(tx,ty,14))continue;
      return {tx:tx,ty:ty}; }
    return null;
  },

  // Waystones and site doors are kept clear of monster spawns.
  _nearSafeSpot(tx,ty,r){
    var wd=this.wd, i;
    for(i=0;i<wd.waystones.length;i++){ var w=wd.waystones[i]; if(Math.abs(w.x-tx)<r&&Math.abs(w.y-ty)<r)return true; }
    for(i=0;i<wd.sites.length;i++){ var s=wd.sites[i]; if(Math.abs(s.tx+1-tx)<r*0.6&&Math.abs(s.ty+1-ty)<r*0.6)return true; }
    return false;
  },

  // ── per-frame: minimap redraw + zone banner ──
  _tickTravel(dt){
    // the village grows when a craftsman comes home
    this._vT=(this._vT||0)+dt; if(this._vT>1){ this._vT=0; var vs=villageStageOf(this.playerState); if(this.wd&&vs!==this.wd.villageStage){ var self=this;
      villageApply(this.wd,vs).forEach(function(q){ self._refreshChunkAt(q[0]*WCH,q[1]*WCH); }); showNotif('🏘 The village has grown!','#ffe9a8'); this._villageFolkInit(); } }
    this._travelTick=(this._travelTick||0)+dt;
    if(this._travelTick<0.12)return; this._travelTick=0;
    _drawMinimapHud(this,null);
    var tx=Math.floor(this.player.x/TILE), ty=Math.floor(this.player.y/TILE);
    var inVillage=Math.hypot(tx-CENTER_X,ty-CENTER_Y)<VILLAGE_RADIUS+2, z=inVillage?null:_wmZoneAt(tx,ty);
    var key=inVillage?'village':z?z.id:null;
    if(key&&key!==this._zoneKey){
      this._zoneKey=key; var ps=this.playerState;
      if(z&&ps.visitedZones.indexOf(z.id)<0){ ps.visitedZones.push(z.id); if(typeof Tome!=='undefined')Tome.see('place','zone_'+z.id); }
      var el=document.getElementById('zone-banner');
      if(el){ el.querySelector('.zb-name').textContent=inVillage?'The Village':_wmZoneName(z.id); el.querySelector('.zb-reg').textContent=inVillage?'Mirror Lake shore':WM_REGION_NAMES[z.r];
        el.classList.add('on'); clearTimeout(this._zbT); this._zbT=setTimeout(function(){el.classList.remove('on');},2600); }
    }
  }
});
