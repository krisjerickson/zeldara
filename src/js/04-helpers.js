// ─── Input Guards & Helpers ──────────────────────────
function _isTyping(){
  var ae=document.activeElement;
  return !!(ae&&(ae.tagName==='INPUT'||ae.tagName==='TEXTAREA'||ae.isContentEditable));
}
function _anyModalOpen(){
  // Universal: true while ANY menu/popup/shop is open (see 24-pause-input.js).
  return (typeof isGamePaused==='function'&&isGamePaused())||
         (typeof _openOverlays==='function'&&_openOverlays().length>0);
}
function _updateVolcanoQuestHUD(){
  var ws=game&&game.scene?game.scene.getScene('World'):null;
  var ps=ws?ws.playerState:null;
  var el=document.getElementById('volcano-quest');
  if(!el||!ps){ if(el) el.classList.remove('show'); return; }
  if(!_finalQuestUnlocked(ps)){ el.classList.remove('show'); return; }
  el.classList.add('show');
  var k=_volcanoKeysHeld(ps);
  var keysEl=document.getElementById('vq-keys');
  if(keysEl){
    if(k>=4){ keysEl.innerHTML='🔑 ALL KEYS — head to the great volcano!'; keysEl.style.color='#ffaa44'; }
    else { keysEl.innerHTML='🔑 '+k+' / 4 keys'; keysEl.style.color='#ffd700'; }
  }
}
function _updateBuffsHUD(){
  var ws=game&&game.scene?game.scene.getScene('World'):null;
  var ps=ws?ws.playerState:null;
  var host=document.getElementById('buffs-hud');
  if(!host)return;
  if(!ps||!ps.buffs){host.innerHTML='';return;}
  var now=Date.now();
  var labels={atkUp:{icon:'⚔️',name:'ATK +25%'},defUp:{icon:'🛡️',name:'DEF +25%'},spdUp:{icon:'⚡',name:'SPD +25%'}};
  var html='';
  ['atkUp','defUp','spdUp'].forEach(function(k){
    var end=ps.buffs[k]||0;
    if(end<=now)return;
    var rem=Math.ceil((end-now)/1000);
    var mm=Math.floor(rem/60), ss=rem%60;
    var t=mm+':'+(ss<10?'0':'')+ss;
    html+='<div class="buff-pill"><span class="b-icon">'+labels[k].icon+'</span><span>'+labels[k].name+'</span><span class="b-time">'+t+'</span></div>';
  });
  host.innerHTML=html;
}
// Tick the HUD twice a second — Date.now() based, so works whether the game
// scene is paused or not.
setInterval(function(){_updateBuffsHUD();_updateVolcanoQuestHUD();}, 500);
// ── Final quest (Volcano Lord chain) ─────────────────────────────────────
// Triggered by defeating the 4 section dungeon bosses (s1_dungeon … s4_dungeon).
// Once triggered, 5 volcano sites appear: the main NW one, plus 1 mini per quadrant.
// Player must collect 4 keys (one per mini), then TAB the main door to enter
// the boss-rush gauntlet.
function _finalQuestUnlocked(ps){
  if(!ps||!ps.completedQuests)return false;
  return ['s1_dungeon','s2_dungeon','s3_dungeon','s4_dungeon'].every(function(k){return ps.completedQuests.includes(k);});
}
function _volcanoKeysHeld(ps){
  if(!ps||!ps.inventory)return 0;
  return ['volcano_key_n','volcano_key_e','volcano_key_s','volcano_key_w']
    .filter(function(k){return ps.inventory.indexOf(k)>=0;}).length;
}
function _hasAllVolcanoKeys(ps){ return _volcanoKeysHeld(ps) === 4; }
// True iff the Volcano Lord boss-rush scene is currently active. Used to
// gate all healing actions (potions, food, inventory consumables).
function _inBossRush(){
  return !!(game && game.scene && game.scene.isActive && game.scene.isActive('VolcanoBossRush'));
}
// Volcano site definitions (tile coords + ids). Single source of truth so
// the dev button can re-use them.
function _volcanoSiteDefs(){
  // Mini-volcanoes: small islands JUST OUTSIDE the main-island radius, one
  // per quadrant. Land bridges (carved when the quest triggers) connect each
  // back to the main island so the player can walk over.
  // Big volcano: large new landmass in the bottom-left (SW corner), also
  // bridged from the main island.
  // Phase 3: positions come from the world map (offshore, one per corner).
  return WMAP_VOLCANOES.map(function(v){ return {type:v.type,section:v.section,tx:v.x-1,ty:v.y-1,id:v.id}; });
}
// Carve out ocean → lava/rock terrain around the big volcano site so it
// looks like a real volcanic island emerged from the sea. Run once per
// quest activation; safe to call repeatedly because it only converts tiles
// that are still OCEAN/SHALLOW_WATER/BEACH.
function _carveBigVolcanoTerrain(ws){
  // Renamed in intent — now carves ALL volcano islands + their land bridges
  // back to the main island. Kept the original function name so existing
  // callers (initial create + dev unlock + spawn helper) still work.
  if(!ws||!ws.wd||!ws.wd.tiles)return;
  var tiles=ws.wd.tiles;
  var defs=_volcanoSiteDefs();
  var changed=[];

  function isOcean(t){ return t===T.OCEAN||t===T.REEF||t===T.SHALLOW_WATER||t===T.BEACH; }
  function setTile(tx,ty,nt){
    if(tx<0||tx>=WORLD_W||ty<0||ty>=WORLD_H)return;
    if(!isOcean(tiles[ty][tx]))return; // never overwrite land
    tiles[ty][tx]=nt;
    if(ws.wd.kind&&WSK){ var vk=nt===T.DEEP_MAGMA?WSK.lava:nt===T.THIN_MAGMA?WSK.crust:WSK.ashsand; ws.wd.kind[ty*WORLD_W+tx]=vk._gi; }
    changed.push([tx,ty]);
  }

  // Volcano-island carve. Big island uses radius 28; minis use 8.
  function carveIsland(cx, cy, R, isBig){
    for(var dy=-R;dy<=R;dy++){
      for(var dx=-R;dx<=R;dx++){
        var d=Math.hypot(dx,dy); if(d>R)continue;
        // Light irregular edge so islands aren't perfect circles
        if(d > R-1.5 && Math.random()<0.4) continue;
        var nt;
        if(isBig){
          if(d<5)        nt = Math.random()<0.55?T.DEEP_MAGMA:T.OBSIDIAN;
          else if(d<11)  nt = Math.random()<0.5 ?T.THIN_MAGMA:T.DARK_ROCK;
          else if(d<18)  nt = Math.random()<0.7 ?T.DARK_ROCK :T.ASH_GROUND;
          else if(d<24)  nt = Math.random()<0.6 ?T.DARK_ROCK :T.ROCKY_GROUND;
          else           nt = Math.random()<0.5 ?T.ROCKY_GROUND:T.GRAVEL;
        } else {
          if(d<2)        nt = Math.random()<0.5 ?T.DEEP_MAGMA:T.THIN_MAGMA;
          else if(d<4)   nt = Math.random()<0.6 ?T.DARK_ROCK :T.OBSIDIAN;
          else if(d<6)   nt = Math.random()<0.7 ?T.DARK_ROCK :T.ASH_GROUND;
          else           nt = Math.random()<0.5 ?T.ROCKY_GROUND:T.DARK_ROCK;
        }
        setTile(Math.round(cx+dx), Math.round(cy+dy), nt);
      }
    }
  }

  // Lava causeway between two world points (Ash Dragon territory). Only carves
  // ocean tiles; lands on existing terrain become no-ops.
  function carveBridge(x1,y1,x2,y2,halfWidth){
    var steps=Math.max(Math.abs(x2-x1), Math.abs(y2-y1)) * 2;
    if(steps<1)return;
    var nx=x2-x1, ny=y2-y1, ln=Math.hypot(nx,ny)||1;
    var px=-ny/ln, py=nx/ln; // perpendicular unit
    for(var i=0;i<=steps;i++){
      var t=i/steps;
      var bx=x1+nx*t, by=y1+ny*t;
      for(var w=-halfWidth; w<=halfWidth; w++){
        var ox=Math.round(bx + px*w), oy=Math.round(by + py*w);
        // Phase 3: a molten causeway — only the Ash Dragon (or the Dragon) crosses it
        setTile(ox,oy,T.DEEP_MAGMA);
      }
    }
  }

  defs.forEach(function(d){
    var cx=d.tx+1.5, cy=d.ty+1.5;
    var isBig=d.type==='volcano_main';
    var R = isBig?28:8;
    carveIsland(cx, cy, R, isBig);
    // Bridge: from main-island edge all the way to the door plaza (no buffer).
    // Bridge: from the nearest shore of the volcano's region (found at build).
    var an=ws.wd.volcanoAnchors&&ws.wd.volcanoAnchors[d.id];
    if(an)carveBridge(an.x, an.y, cx, cy, isBig?3:2);
    // Door plaza — force the 3×3 site tile area to be walkable DARK_ROCK,
    // overwriting whatever was carved there (lava, ocean, etc.). This is
    // where the player stands to TAB the door.
    for(var py=0; py<3; py++) for(var px=0; px<3; px++){
      var ptx=d.tx+px, pty=d.ty+py;
      if(ptx<0||ptx>=WORLD_W||pty<0||pty>=WORLD_H)continue;
      tiles[pty][ptx]=T.DARK_ROCK;
      if(ws.wd.kind&&WSK)ws.wd.kind[pty*WORLD_W+ptx]=WSK.plaza._gi;
      changed.push([ptx,pty]);
    }
  });

  // Refresh affected chunks. Each refresh is wrapped in try-catch so one
  // bad chunk can't abort the whole carve, and batched across animation
  // frames so we don't freeze the browser.
  if(changed.length)ws.wd.baseVer=(ws.wd.baseVer||0)+1;   // world map redraws the new islands
  if(ws._refreshChunkAt && changed.length){
    var seen={};
    var CHUNK_TILES=CHUNK;
    var chunksToRefresh=[];
    changed.forEach(function(p){
      var k=Math.floor(p[0]/CHUNK_TILES)+','+Math.floor(p[1]/CHUNK_TILES);
      if(seen[k])return; seen[k]=1;
      chunksToRefresh.push(p);
    });
    // Batch: refresh ~4 chunks per frame so the main loop stays responsive.
    function flushChunks(){
      var batch=chunksToRefresh.splice(0, 4);
      batch.forEach(function(p){
        try{ ws._refreshChunkAt(p[0], p[1]); }
        catch(e){ console.warn('chunk refresh failed at', p, e); }
      });
      if(chunksToRefresh.length) requestAnimationFrame(flushChunks);
    }
    requestAnimationFrame(flushChunks);
  }
}
function _volcanoSiteLabel(s){
  return ({volcano_main:'🌋 Volcano Lord',volcano_mini:'🔥 Mini-Volcano'})[s.type]||s.type;
}
// Spawn the volcano site visuals into a live World scene. Safe to call
// repeatedly — checks for existing ids first.
function _spawnVolcanoVisuals(ws){
  if(!ws||!ws.wd)return;
  _carveBigVolcanoTerrain(ws);
  var defs=_volcanoSiteDefs();
  var siteColors={volcano_main:0x661100,volcano_mini:0x882200};
  var siteIcons={volcano_main:'🌋',volcano_mini:'🔥'};
  defs.forEach(function(vs){
    var existing=ws.wd.sites.find(function(s){return s.id===vs.id;});
    if(existing)return; // already there (either via initial create or prior call)
    ws.wd.sites.push(vs);
    // Build the visual chrome: rectangle backdrop + icon + DOM label
    ws.add.rectangle(vs.tx*TILE+TILE*1.5, vs.ty*TILE+TILE*1.5, TILE*3, TILE*3, siteColors[vs.type], .88)
      .setDepth(2).setStrokeStyle(2, 0xff6622, .7);
    var ico=ws.add.text(vs.tx*TILE+TILE*1.5, vs.ty*TILE+TILE*1.5, siteIcons[vs.type], {fontSize:'22px',fontFamily:'serif'}).setOrigin(.5).setDepth(3);
    var lblEl=document.createElement('div');
    lblEl.className='wlbl site hidden';
    lblEl.textContent=_volcanoSiteLabel(vs);
    var lblHost=document.getElementById('world-labels');
    if(lblHost)lblHost.appendChild(lblEl);
    if(!ws.siteObjs)ws.siteObjs=[];
    ws.siteObjs.push({s:vs,ico:ico,lblEl:lblEl,wx:vs.tx*TILE+TILE*1.5,wy:vs.ty*TILE-2});
  });
}
// Section → mini-volcano key id (which quadrant gives which key).
function _volcanoKeyForSection(sec){
  return {1:'volcano_key_n',2:'volcano_key_e',3:'volcano_key_s',4:'volcano_key_w'}[sec];
}
function _gameBlocked(){
  return _isTyping()||_anyModalOpen();
}
// ── Buff system (Date.now based; frozen while paused by 24-pause-input.js) ────────────────────────
// Buffs live on playerState.buffs as { atkUp:endMs, defUp:endMs, spdUp:endMs }.
// endMs is a Date.now() timestamp; once Date.now() > endMs the buff lapses.
// All buffs are +25% multiplicative, last 2 minutes.
function _heroBuffActive(ps, key){
  if(!ps||!ps.buffs)return false;
  return (ps.buffs[key]||0) > Date.now();
}
function _heroBuffApply(ps, key, durationMs){
  if(!ps.buffs)ps.buffs={};
  ps.buffs[key]=Date.now()+(durationMs||120000); // 2 min default
}
function _heroBuffRandom(ps, durationMs){
  var keys=['atkUp','defUp','spdUp'];
  var pick=keys[Math.floor(Math.random()*keys.length)];
  _heroBuffApply(ps, pick, durationMs);
  return pick;
}
function _heroBuffMult(ps, key){
  return _heroBuffActive(ps, key) ? 1.25 : 1.0;
}

