// ═══════════════════════════════════════════════════════════════════════
// ║ SITE LAB (sandbox) — inspect every implemented tower & dungeon.
// ║ Built from the live game data (SITE_ROSTER via the world's sites, and
// ║ ISL_ADV for the island dungeons), so anything added later shows up
// ║ here automatically. Pick a floor to jump straight in; an inspect bar
// ║ then lets you step floor to floor, zoom out, and toggle lights / fog.
// ║ Open it from the password-protected Developer Sandbox.
// ═══════════════════════════════════════════════════════════════════════
var SITE_LAB={tab:null, thumbs:{}, queue:[], busy:false,
  opts:{mons:'all', god:true, fog:false, dark:true}};
(function(){ try{ var o=JSON.parse(localStorage.getItem('zeldara_sitelab')||'null'); if(o){ if(o.opts)Object.assign(SITE_LAB.opts,o.opts); if(o.tab)SITE_LAB.tab=o.tab; } }catch(e){} })();
function _slSavePrefs(){ try{ localStorage.setItem('zeldara_sitelab',JSON.stringify({opts:SITE_LAB.opts,tab:SITE_LAB.tab})); }catch(e){} }

// All inspectable sites, grouped: 4 quadrants + the harbor islands.
function _slCatalog(){
  var ws=game.scene.getScene('World'), sites=(ws&&ws.wd&&ws.wd.sites)||[], groups=[];
  [1,2,3,4].forEach(function(sec){
    groups.push({id:'q'+sec, name:SECTION_NAMES[sec].replace(/^(NE|SE|SW|NW) /,''), sites:sites.filter(function(s){return s.section===sec&&s.design&&(s.type==='tower'||s.type==='dungeon');})});
  });
  var isl=[];
  [1,2,3,4].forEach(function(sec){
    var a=ISL_ADV[sec]; if(!a)return;
    var name=a.label.replace(/^\S+\s/,'');
    if(a.type==='cave')isl.push({id:'isl_cave_'+sec, cave:true, type:'dungeon', section:sec, name:name, floors:a.floors||4, island:true});
    else isl.push({id:'isl_adv_'+sec+'_'+a.type, type:a.kind||(a.type==='tower_island'?'tower':'dungeon'), section:sec, design:a.design, island:true, name:name, floors:a.floors||4, _theme:a.type==='volcano'?'volcano':a.type==='tower_island'?'tower_island':'cave_dungeon'});
  });
  groups.push({id:'isl', name:'Harbor islands', sites:isl});
  if(typeof CASTLE_ISLANDS!=='undefined')groups.push({id:'castles', name:'Island castles', sites:Object.keys(CASTLE_ISLANDS).map(function(k){ return CastleRun.site(k); })});
  return groups;
}
function _slGuardian(s){
  var sec=s.section;
  if(s.castle){ var W=CHAR_BY_ID[CASTLE_ISLANDS[s.castle].warden]; return '⛓ '+(W?W.name:'Warden'); }
  if(s.island){ var b=HARBOR_ISLANDS[sec]&&HARBOR_ISLANDS[sec].boss; return b?b.icon+' '+b.name:'—'; }
  if(s.bonus){ var k=_bonusMiniBossKey(sec); return k?MDEFS[k].icon+' '+MDEFS[k].name:'—'; }
  var key=s.type==='dungeon'?['goblin_king','swamp_witch','rock_dragon','lava_titan'][sec-1]:['dark_warlock','storm_mage','iron_sentinel','shadow_lord'][sec-1];
  return MDEFS[key]?MDEFS[key].icon+' '+MDEFS[key].name:'—';
}
function _slReward(s){
  var sec=s.section;
  if(s.castle){ var it=ITEMS[CASTLE_ISLANDS[s.castle].skill]; return 'Teaches: '+(it?it.icon+' '+it.name:'?'); }
  if(s.island){ var f=FAMILIARS[FAM_BY_SEC[sec]]; return 'Familiar: '+(f?f.icon+' '+f.n:'?'); }
  if(s.bonus)return 'Treasure vault · relic: '+(SITE_RELICS[s.design]||'?');
  if(s.type==='tower')return 'Frees '+(CRAFTSMEN[sec]?CRAFTSMEN[sec].icon+' '+CRAFTSMEN[sec].n:'a craftsman')+' · opens next region';
  var rw=BOSS_REWARDS[s.id], m=rw&&rw.mount&&MOUNTS[rw.mount]; return 'Mount: '+(m?m.icon+' '+m.n:'—');
}
function _slDone(s,ps){
  if(s.castle)return (ps.castlesDone||[]).includes(s.castle);
  if(s.island)return (ps.completedIslands||[]).includes(s.section);
  if(s.bonus)return (ps.bonusCleared||[]).includes(s.id);
  return (ps.completedQuests||[]).includes(s.id);
}

function openSiteLab(){
  var ws=game.scene.getScene('World');
  if(!ws||!ws.playerState||!ws.wd){ showNotif('Start or load a game first!','#ff4444'); return; }
  closeModal('sandbox');
  var groups=_slCatalog();
  if(!SITE_LAB.tab||!groups.some(function(g){return g.id===SITE_LAB.tab;}))SITE_LAB.tab=groups[0].id;
  _slRenderOpts(); _slRenderTabs(groups); _slRenderGrid(groups);
  var el=document.getElementById('modal-sitelab'); if(el)el.style.display='flex';
}
function _slRenderOpts(){
  var o=SITE_LAB.opts, seg=function(key,val,label){ return '<button class="sl-seg" data-k="'+key+'" data-v="'+val+'" aria-pressed="'+(String(o[key])===String(val))+'">'+label+'</button>'; };
  var h='<div class="sl-opt"><span>Monsters</span>'+seg('mons','all','All')+seg('mons','boss','Guardian only')+seg('mons','none','None')+'</div>'+
        '<div class="sl-opt"><span>God mode</span>'+seg('god','true','On')+seg('god','false','Off')+'</div>'+
        '<div class="sl-opt"><span>Fog of war</span>'+seg('fog','false','Reveal floor')+seg('fog','true','Normal')+'</div>'+
        '<div class="sl-opt"><span>Lighting</span>'+seg('dark','true','On')+seg('dark','false','Off')+'</div>';
  var el=document.getElementById('sl-opts'); el.innerHTML=h;
  el.querySelectorAll('.sl-seg').forEach(function(b){ b.onclick=function(){
    var k=b.dataset.k, v=b.dataset.v; SITE_LAB.opts[k]=(v==='true'?true:v==='false'?false:v); _slSavePrefs(); _slRenderOpts(); }; });
}
function _slRenderTabs(groups){
  var el=document.getElementById('sl-tabs');
  el.innerHTML=groups.map(function(g){ return '<button class="sl-tab" role="tab" data-g="'+g.id+'" aria-selected="'+(g.id===SITE_LAB.tab)+'">'+g.name+'<span class="n">'+g.sites.length+'</span></button>'; }).join('');
  el.querySelectorAll('.sl-tab').forEach(function(b){ b.onclick=function(){ SITE_LAB.tab=b.dataset.g; _slSavePrefs(); _slRenderTabs(groups); _slRenderGrid(groups); }; });
}
function _slRenderGrid(groups){
  var g=groups.find(function(x){return x.id===SITE_LAB.tab;}), ps=game.scene.getScene('World').playerState, el=document.getElementById('sl-grid');
  SITE_LAB._sites={}; SITE_LAB.queue=[];
  el.innerHTML=g.sites.map(function(s){
    SITE_LAB._sites[s.id]=s;
    var kind=s.castle?'Castle':s.island?(s.cave?'Island cave':'Island '+s.type):(s.boss?'★ Boss '+s.type:'Bonus '+s.type);
    var fl=''; for(var f=0;f<s.floors;f++){ var last=f===s.floors-1; fl+='<button class="sl-fl'+(last?' last':'')+'" data-s="'+s.id+'" data-f="'+f+'" title="'+(last?(s.bonus?'Vault floor':'Guardian floor'):'Floor '+(f+1))+'">'+(f+1)+(last?' ☠':'')+'</button>'; }
    var th=SITE_LAB.thumbs[s.id];
    if(!th&&!s.cave)SITE_LAB.queue.push(s.id);
    return '<div class="sl-card'+(s.boss?' boss':'')+'"><div class="sl-thumb" id="slth-'+s.id+'" style="'+(th?'background-image:url('+th+')':'')+'">'+(th?'':(s.cave?'Side-view cave':'rendering…'))+'</div>'+
      '<div class="sl-body"><div class="sl-name">'+(s.boss?'<span class="st">★</span> ':'')+s.name+'</div>'+
      '<div class="sl-meta">'+kind+' · '+s.floors+' floors · guardian '+_slGuardian(s)+'</div>'+
      '<div class="sl-rw">'+_slReward(s)+'</div>'+(_slDone(s,ps)?'<div class="sl-done">✓ cleared in this save</div>':'')+
      '<div class="sl-floors">'+fl+'</div></div></div>';
  }).join('');
  el.querySelectorAll('.sl-fl').forEach(function(b){ b.onclick=function(){ _slLaunch(b.dataset.s,+b.dataset.f); }; });
  _slPumpThumbs();
}
// Thumbnails of floor 1, rendered one at a time so the page stays responsive.
function _slPumpThumbs(){
  if(SITE_LAB.busy)return;
  var id=SITE_LAB.queue.shift(); if(!id)return;
  SITE_LAB.busy=true;
  setTimeout(function(){
    try{
      var s=SITE_LAB._sites[id], spec=_siteFloorSpec(s,0,s.floors);
      if(spec){
        var m=_buildSiteFloor(spec), W=m.w*LT, H=m.h*LT, tw=300, sc=tw/W, c=mkCanvas(tw,Math.round(tw*2/3)), x=c.getContext('2d');
        x.fillStyle=m.bg||'#000'; x.fillRect(0,0,c.width,c.height);
        var oy=(c.height-H*sc)/2; x.save(); x.translate(0,oy); x.scale(sc,sc); x.drawImage(m.base,0,0);
        m.sprites.slice().sort(function(a,b){return a.y-b.y;}).forEach(function(sp){ x.drawImage(sp.canvas,sp.x-sp.canvas.width/2,sp.y-sp.canvas.height); });
        x.restore();
        SITE_LAB.thumbs[id]=c.toDataURL('image/jpeg',0.8);
        var el=document.getElementById('slth-'+id); if(el){ el.style.backgroundImage='url('+SITE_LAB.thumbs[id]+')'; el.textContent=''; }
      }
    }catch(e){ console.warn('Site Lab thumbnail failed',id,e); }
    SITE_LAB.busy=false; _slPumpThumbs();
  },30);
}

// Jump into a site's floor with the chosen inspect options.
function _slLaunch(id,floor){
  var ws=game.scene.getScene('World'); if(!ws||!ws.player)return;
  var s=SITE_LAB._sites&&SITE_LAB._sites[id]; if(!s)return;
  closeModal('sitelab'); closeModal('sandbox');
  var ps=ws.playerState, o=SITE_LAB.opts;
  ps.godMode=!!o.god; var gs=document.getElementById('sb-godmode-status'); if(gs)gs.style.display=ps.godMode?'':'none';
  if(ps.hp<=0)ps.hp=ps.maxHp;
  // Let the pause system resume the current scene first (it resumes whatever it paused
  // when the menu closes), then stop it, then launch the chosen floor.
  setTimeout(function(){ _sbStopAdventure(); setTimeout(_go,150); },80);
  function _go(){
    if(!game.scene.isSleeping('World'))ws.scene.sleep('World');
    document.getElementById('hud').style.display='none';
    document.getElementById('dungeon-hud').style.display='block';
    if(s.cave){ ws.scene.launch('Cave',{worldScene:ws,islandScene:null,sec:s.section,floor:floor,maxFloors:s.floors}); return; }
    var theme=s._theme||(s.type==='tower'?'tower':'dungeon');
    ws.scene.launch('Dungeon',{site:s,floor:floor,maxFloors:s.floors,worldScene:ws,theme:theme,
      inspect:{mons:o.mons,fog:!!o.fog,dark:!!o.dark,from:'sitelab'}});
  }
}

// ── Inspect bar (shown while a Site-Lab floor is open) ─────────────────
function _slShowBar(scene){
  var bar=document.getElementById('sl-bar'); if(!bar)return;
  var name=(scene._site&&scene._site.name)||'Site', f=scene.floor, n=scene.maxFloors;
  bar.innerHTML='<button data-a="prev" '+(f<=0?'disabled':'')+' title="Previous floor  [">◀</button>'+
    '<span class="lbl">🧪 '+name+' · Floor '+(f+1)+'/'+n+(scene.isLastFloor?' ☠':'')+'</span>'+
    '<button data-a="next" '+(f>=n-1?'disabled':'')+' title="Next floor  ]">▶</button>'+
    '<button data-a="over" title="Zoom out to the whole floor">⤢ Overview</button>'+
    '<button data-a="fog">🌫 Fog '+(scene._inspect.fog?'on':'off')+'</button>'+
    (scene._darkRT?'<button data-a="dark">💡 Lights '+(scene._darkRT.visible?'on':'off')+'</button>':'')+
    '<button data-a="mons" title="Rebuilds the floor">👾 '+({all:'All monsters',boss:'Guardian only',none:'No monsters'}[scene._inspect.mons]||'All monsters')+'</button>'+
    '<button data-a="lab">🧪 Lab</button><button data-a="exit">⏏ Exit</button>';
  bar.style.display='flex';
  bar.querySelectorAll('button').forEach(function(b){ b.onclick=function(){ _slBarAction(b.dataset.a); b.blur(); var cv=document.querySelector('#phaser-root canvas'); if(cv)cv.focus&&cv.focus(); }; });
}
function _slHideBar(){ var bar=document.getElementById('sl-bar'); if(bar){ bar.style.display='none'; bar.innerHTML=''; } }
function _slBarAction(a){
  var d=game.scene.getScene('Dungeon'); if(!d||!game.scene.isActive('Dungeon')||!d._inspect)return;
  var go=function(f,patch){ d.scene.restart(Object.assign({},d._initData,{floor:f,floorStates:{},arriveAt:null},patch||{})); };
  if(a==='prev'&&d.floor>0)go(d.floor-1);
  else if(a==='next'&&d.floor<d.maxFloors-1)go(d.floor+1);
  else if(a==='over'){
    var cam=d.cameras.main; d._slOver=!d._slOver;
    if(d._slOver){ var z=Math.min(cam.width/(DW*TILE),cam.height/(DH*TILE)); cam.stopFollow(); cam.setBounds(0,0,DW*TILE,DH*TILE); cam.setZoom(z); cam.centerOn(DW*TILE/2,DH*TILE/2); }
    else { cam.setZoom(1.6); cam.startFollow(d.pCont,true,.12,.12); }
  }
  else if(a==='fog'){ d._inspect.fog=!d._inspect.fog; SITE_LAB.opts.fog=d._inspect.fog; _slSavePrefs(); d._dngFogExplored.fill(d._inspect.fog?0:1); if(d._dngFogGfx)d._dngFogGfx.setVisible(d._inspect.fog); d._dngRevealFog(true); _slShowBar(d); }
  else if(a==='dark'){ if(d._darkRT){ d._darkRT.setVisible(!d._darkRT.visible); if(d._heroGlow)d._heroGlow.setVisible(d._darkRT.visible); d._inspect.dark=d._darkRT.visible; SITE_LAB.opts.dark=d._inspect.dark; _slSavePrefs(); } _slShowBar(d); }
  else if(a==='mons'){ var order=['all','boss','none']; var nx=order[(order.indexOf(d._inspect.mons)+1)%3]; SITE_LAB.opts.mons=nx; _slSavePrefs(); go(d.floor,{inspect:Object.assign({},d._inspect,{mons:nx})}); }
  else if(a==='lab'){ openSiteLab(); }
  else if(a==='exit'){ d._exitToWorld(null); }
}
document.addEventListener('keydown',function(e){
  if(e.key!=='['&&e.key!==']')return;
  if(typeof _isTyping==='function'&&_isTyping())return;
  var d=game&&game.scene&&game.scene.getScene('Dungeon');
  if(!d||!game.scene.isActive('Dungeon')||!d._inspect||(typeof _openOverlays==='function'&&_openOverlays().length))return;
  _slBarAction(e.key==='['?'prev':'next');
});
