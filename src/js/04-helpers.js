// ─── Crisp text everywhere ───────────────────────────
// Every Phaser text is rasterised at the zoom its scene's camera uses (world 1.4×, dungeon 1.6×,
// building 2.2×…) and filtered smoothly, so it reads like the HTML labels instead of blocky
// pixel-doubled 1× text (the game renders pixel art with antialias off).
var ZT_ZOOM={World:1.4,Island:1.5,Dungeon:1.6,Building:2.2,Sky:1.4};
var ZT_FONT="'Segoe UI',system-ui,-apple-system,sans-serif";
(function(){
  var F=Phaser.GameObjects.GameObjectFactory.prototype, C=Phaser.GameObjects.GameObjectCreator.prototype, LIN=Phaser.Textures.FilterMode.LINEAR;
  var prep=function(scene,style){ style=Object.assign({},style||{}); var k=scene&&scene.sys&&scene.sys.settings.key, z=ZT_ZOOM[k]||1;
    if(!style.resolution)style.resolution=Math.min(3,Math.max(2,Math.ceil(z)));
    if(style.fontFamily==='Segoe UI')style.fontFamily=ZT_FONT;
    return style; };
  var fin=function(t){ if(t&&t.texture&&t.scene&&t.scene.sys.game.renderer.type===Phaser.WEBGL)t.texture.setFilter(LIN); return t; };
  var oa=F.text; F.text=function(x,y,txt,style){ return fin(oa.call(this,x,y,txt,prep(this.scene,style))); };
  var om=C.text; C.text=function(cfg,add){ cfg=Object.assign({},cfg||{}); cfg.style=prep(this.scene,cfg.style); return fin(om.call(this,cfg,add)); };
})();

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
    if(k>=4){ keysEl.innerHTML='🔑 All four keys — the gate of Muspelheim awaits!'; keysEl.style.color='#ffaa44'; }
    else { var nx=VOLC_ORDER.find(function(id){ return (ps.inventory||[]).indexOf(_volcanoKeyForSection(VOLC_ORDER.indexOf(id)+1))<0; }); keysEl.innerHTML='🔑 '+k+' / 4 keys'+(nx?' · next: '+VOLC_NAMES[nx]:''); keysEl.style.color='#ffd700'; }
  }
}
function _updateBuffsHUD(){
  var ws=game&&game.scene?game.scene.getScene('World'):null;
  var ps=ws?ws.playerState:null;
  var host=document.getElementById('buffs-hud');
  if(!host)return;
  if(!ps||!ps.buffs){host.innerHTML='';return;}
  var now=Date.now();
  var labels={atkUp:{icon:'⚔️',name:'ATK +25%'},defUp:{icon:'🛡️',name:'DEF +25%'},spdUp:{icon:'⚡',name:'SPD +25%'}}, _zic={atkUp:'st_atk',defUp:'st_def',spdUp:'st_speed'}, _keys=['atkUp','defUp','spdUp'];
  if(typeof ZEL!=='undefined')ZEL.LIST.forEach(function(e){ labels['res_'+e]={icon:ZEL.E[e].em,name:ZEL.E[e].n+' ward +30%'}; _zic['res_'+e]=ZEL.E[e].ic; _keys.push('res_'+e); });      // resistance draughts (round 37)
  var html='';
  _keys.forEach(function(k){
    var end=ps.buffs[k]||0;
    if(end<=now)return;
    var rem=Math.ceil((end-now)/1000);
    var mm=Math.floor(rem/60), ss=rem%60;
    var t=mm+':'+(ss<10?'0':'')+ss;
    html+='<div class="buff-pill"><span class="b-icon">'+(typeof ZIcon!=='undefined'?ZIcon.html(_zic[k],labels[k].icon,1.35):labels[k].icon)+'</span><span>'+labels[k].name+'</span><span class="b-time">'+t+'</span></div>';
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
  // round 51 (Kris): "To unlock the mini volcanoes, you should need to complete all the towers with the master builders as well as the dungeons"
  return ['s1_dungeon','s2_dungeon','s3_dungeon','s4_dungeon','s1_tower','s2_tower','s3_tower','s4_tower'].every(function(k){return ps.completedQuests.includes(k);});
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
// ─── The forges and Muspelheim on the world map (round 51) ───────────────────
// Kris: "the terrain between the magma walkways to the volcanos needs to be separated from the ocean. Make some sort of rock wall".
// Each volcano island is joined to the nearest shore you can walk to (wd.volcanoAnchors, 05b step 9) by a causeway: a walkway of cooled
// magma (dark rock, glowing cracks) between two lines of molten lava, the whole walled off from the sea by a basalt rampart. The island
// is ringed by the same rampart. Seeded, so it comes out the same every time; carved only once the forges are unlocked.
var VOLC_NAMES={volcano_n:'Ember Forge',volcano_e:'Cinder Forge',volcano_s:'Slag Forge',volcano_w:'Ash Forge',volcano_main:'Muspelheim'};
var VOLC_ORDER=['volcano_n','volcano_e','volcano_s','volcano_w'];      // his card: region order, each forge's key opens the next
function _carveBigVolcanoTerrain(ws){
  if(!ws||!ws.wd||!ws.wd.tiles||ws.wd._volcCarved)return;
  var wd=ws.wd, tiles=wd.tiles, defs=_volcanoSiteDefs(), changed=[], R=rngOf(51051), mine=new Uint8Array(WORLD_W*WORLD_H);
  var sea=function(t){ return t===T.OCEAN||t===T.REEF; }, wet=function(t){ return sea(t)||t===T.SHALLOW_WATER||t===T.BEACH; };
  var KD={}; KD[T.DEEP_MAGMA]=WSK.lava; KD[T.THIN_MAGMA]=WSK.crust; KD[T.CLIFF]=WSK.ridge;
  // the islands' ground: the Ashlands' own dark-rock ground (the commonest kind on dark rock round Muspelheim's shore), scree for the rubble
  var AG=(function(){ var an=wd.volcanoAnchors&&wd.volcanoAnchors.volcano_main, cnt={}, best=null, bn=0; if(an)for(var dy=-24;dy<=24;dy++)for(var dx=-24;dx<=24;dx++){ var x=an.x+dx, y=an.y+dy; if(!tiles[y]||tiles[y][x]!==T.DARK_ROCK)continue; var k=wd.kind[y*WORLD_W+x]; cnt[k]=(cnt[k]||0)+1; if(cnt[k]>bn){ bn=cnt[k]; best=k; } } return best; })();
  KD[T.DARK_ROCK]=KD[T.ASH_GROUND]=KD[T.OBSIDIAN]=AG!==null?{_gi:AG}:WSK.crust; KD[T.ROCKY_GROUND]=KD[T.GRAVEL]=WSK.scree;
  var put=function(x,y,t,k){ if(x<0||x>=WORLD_W||y<0||y>=WORLD_H)return; tiles[y][x]=t; if(wd.kind)wd.kind[y*WORLD_W+x]=(k||KD[t]||WSK.ashsand)._gi; mine[y*WORLD_W+x]=1; changed.push([x,y]); };
  function island(cx,cy,Rr,big){ for(var dy=-Rr;dy<=Rr;dy++)for(var dx=-Rr;dx<=Rr;dx++){ var d=Math.hypot(dx,dy); if(d>Rr)continue; if(d>Rr-1.5&&R.f()<0.4)continue;
      var x=Math.round(cx+dx), y=Math.round(cy+dy); if(!tiles[y]||!wet(tiles[y][x]))continue; var t;
      if(big){ t=d<5?(R.f()<0.55?T.DEEP_MAGMA:T.OBSIDIAN):d<11?(R.f()<0.5?T.THIN_MAGMA:T.DARK_ROCK):d<18?(R.f()<0.7?T.DARK_ROCK:T.ASH_GROUND):d<24?(R.f()<0.6?T.DARK_ROCK:T.ROCKY_GROUND):(R.f()<0.5?T.ROCKY_GROUND:T.GRAVEL); }
      else { t=d<2?(R.f()<0.5?T.DEEP_MAGMA:T.THIN_MAGMA):d<4?(R.f()<0.6?T.DARK_ROCK:T.OBSIDIAN):d<6?(R.f()<0.7?T.DARK_ROCK:T.ASH_GROUND):(R.f()<0.5?T.ROCKY_GROUND:T.DARK_ROCK); }
      put(x,y,t); } }
  // the walkway: forced open on its middle (sea, island lava, an islet's rock); molten lava beside it where it crosses the sea
  function causeway(x1,y1,x2,y2,hw){ var n=Math.ceil(Math.max(Math.abs(x2-x1),Math.abs(y2-y1))*2), ux=x2-x1, uy=y2-y1, L=Math.hypot(ux,uy)||1, px=-uy/L, py=ux/L;
    for(var i=0;i<=n;i++){ var bx=x1+ux*i/n, by=y1+uy*i/n;
      for(var w=-hw-1;w<=hw+1;w++){ var x=Math.round(bx+px*w), y=Math.round(by+py*w); if(!tiles[y]||tiles[y][x]===undefined)continue; var t=tiles[y][x];
        if(Math.abs(w)<=hw){ if(wet(t)||mine[y*WORLD_W+x]||!canPassTile(t))put(x,y,T.DARK_ROCK,WSK.crust); }
        else if(sea(t))put(x,y,T.DEEP_MAGMA); } } }
  defs.forEach(function(d){ var big=d.type==='volcano_main', cx=d.tx+1.5, cy=d.ty+1.5; island(cx,cy,big?28:8,big);
    var an=wd.volcanoAnchors&&wd.volcanoAnchors[d.id]; if(an)causeway(an.x,an.y,cx,cy,big?2:1);
    for(var py=0;py<3;py++)for(var px=0;px<3;px++)put(d.tx+px,d.ty+py,T.DARK_ROCK,WSK.plaza);      // the door plaza
    // a walkable ring round the door, so it can be reached from every side
    for(var dy=-2;dy<=4;dy++)for(var dx=-2;dx<=4;dx++){ var x=d.tx+dx, y=d.ty+dy; if(tiles[y]&&!canPassTile(tiles[y][x]))put(x,y,T.DARK_ROCK,WSK.crust); } });
  // the rampart: every bit of sea touching what was carved becomes a basalt wall
  var wall=[]; changed.slice().forEach(function(p){ for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){ var x=p[0]+dx, y=p[1]+dy; if(!tiles[y]||mine[y*WORLD_W+x])continue; if(sea(tiles[y][x]))wall.push([x,y]); } });
  wall.forEach(function(p){ if(sea(tiles[p[1]][p[0]]))put(p[0],p[1],T.CLIFF,WSK.ridge); });
  wd._volcCarved=true;
  if(changed.length)wd.baseVer=(wd.baseVer||0)+1;   // the world map redraws the new islands
  // repaint only the painted chunks that exist now (on screen or parked); the rest are painted from the new ground when first visited
  if(ws._refreshChunkAt&&changed.length&&ws._wr){ var seen={}, todo=[], C=typeof WCH!=='undefined'?WCH:32; changed.forEach(function(p){ var key=Math.floor(p[0]/C)+'_'+Math.floor(p[1]/C); if(seen[key])return; seen[key]=1;
      if((ws._wr.chunks&&ws._wr.chunks.has(key))||(ws._wr.parked&&ws._wr.parked.has(key)))todo.push(p); });
    var flush=function(){ todo.splice(0,2).forEach(function(p){ try{ ws._refreshChunkAt(p[0],p[1]); }catch(e){ console.warn('chunk refresh failed at',p,e); } }); if(todo.length)requestAnimationFrame(flush); }; if(todo.length)requestAnimationFrame(flush); }
}
function _volcanoSiteLabel(s){ var n=VOLC_NAMES[s.id]; return n?(s.type==='volcano_main'?'🌋 '+n:'🔥 '+n):s.type; }
// Spawn the forges and Muspelheim into a live World scene (safe to call again: existing ids are skipped)
function _spawnVolcanoVisuals(ws){
  if(!ws||!ws.wd)return;
  _carveBigVolcanoTerrain(ws);
  _volcanoSiteDefs().forEach(function(vs){
    if(ws.wd.sites.find(function(s){return s.id===vs.id;}))return;
    ws.wd.sites.push(vs);
    var ico=typeof _wsSiteArt==='function'?_wsSiteArt(ws,vs):ws.add.text(vs.tx*TILE+TILE*1.5,vs.ty*TILE+TILE*1.5,vs.type==='volcano_main'?'🌋':'🔥',{fontSize:'22px',fontFamily:'serif'}).setOrigin(.5).setDepth(3);
    var lblEl=document.createElement('div'); lblEl.className='wlbl site hidden'; lblEl.textContent=_volcanoSiteLabel(vs);
    var host=document.getElementById('world-labels'); if(host)host.appendChild(lblEl);
    if(!ws.siteObjs)ws.siteObjs=[]; ws.siteObjs.push({s:vs,ico:ico,lblEl:lblEl,wx:vs.tx*TILE+TILE*1.5,wy:vs.ty*TILE-2});
  });
}
// the key a forge's door needs (its predecessor's), or null for the first; Muspelheim needs all four
function _forgeNeeds(id){ var i=VOLC_ORDER.indexOf(id); return i>0?_volcanoKeyForSection(i):null; }
// Section → mini-volcano key id (which quadrant gives which key).
function _volcanoKeyForSection(sec){
  return {1:'volcano_key_n',2:'volcano_key_e',3:'volcano_key_s',4:'volcano_key_w'}[sec];
}
function _gameBlocked(){
  if(typeof ZDeath!=='undefined'&&ZDeath._hold)return true;      // the hero is falling (21c-death.js)
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

