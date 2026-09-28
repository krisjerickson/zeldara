// ═══════════════════════════════════════════════════════════════════════
// ║ UNIVERSAL PAUSE + GLOBAL INPUT  (Phase 1 · panel B1)
// ║
// ║ Any menu, popup or shop open  ⇒  every running Phaser scene is paused:
// ║ no movement, no monster AI, no projectiles, no damage, no scene timers.
// ║ Buff timers (Date.now based) are shifted forward on resume so they
// ║ freeze too. Works identically in every scene because it pauses whatever
// ║ is running, instead of each scene checking for menus on its own.
// ║
// ║ Detection is DOM-driven: a MutationObserver watches the overlays listed
// ║ in PAUSE_OVERLAYS. A new overlay only needs its id added there.
// ║
// ║ All keyboard shortcuts live in ONE document-level handler below, so they
// ║ behave the same in every area (the old per-scene bindings only worked
// ║ in the overworld, e.g. X for spells).
// ═══════════════════════════════════════════════════════════════════════
var PAUSE_OVERLAYS=[
  'modal-map','modal-quests','modal-inventory','modal-camp','modal-mounts','modal-controls','modal-sandbox','modal-sitelab','modal-tome',
  'slot-picker-modal','quick-pick-popup','item-found-popup',
  'tavern-menu-overlay','skyport-shop-overlay','familiar-info-modal','scene-error-banner'
];
var _PAUSE={active:false, since:0, scenes:[]};

function _isOverlayShown(el){
  if(!el||!el.isConnected)return false;
  if(el.style.display==='none'||el.hidden)return false;
  var cs=window.getComputedStyle(el);
  return cs.display!=='none'&&cs.visibility!=='hidden';
}
function _openOverlays(){
  var out=[];
  for(var i=0;i<PAUSE_OVERLAYS.length;i++){
    var el=document.getElementById(PAUSE_OVERLAYS[i]);
    if(_isOverlayShown(el))out.push(PAUSE_OVERLAYS[i]);
  }
  return out;
}
function isGamePaused(){ return _PAUSE.active; }

function _pauseAll(){
  if(_PAUSE.active||!game||!game.scene)return;
  _PAUSE.active=true; _PAUSE.since=Date.now(); _PAUSE.scenes=[];
  game.scene.getScenes(true).forEach(function(s){
    var k=s.sys.settings.key;
    if(k==='Title'||k==='Boot')return;
    s.scene.pause();
    _PAUSE.scenes.push(k);
  });
  document.body.classList.add('game-paused');
}
function _resumeAll(){
  if(!_PAUSE.active)return;
  var dur=Date.now()-_PAUSE.since;
  _PAUSE.active=false;
  // Freeze real-time buffs: push every active buff's end time forward.
  var ws=game.scene.getScene('World'), ps=ws&&ws.playerState;
  if(ps&&ps.buffs){ for(var b in ps.buffs){ if(ps.buffs[b]>_PAUSE.since)ps.buffs[b]+=dur; } }
  _PAUSE.scenes.forEach(function(k){
    var s=game.scene.getScene(k);
    if(!s||!s.sys.isPaused())return;
    s.scene.resume();
    // Keys released while paused would otherwise stay "down" (player keeps walking).
    if(s.input&&s.input.keyboard&&s.input.keyboard.resetKeys)s.input.keyboard.resetKeys();
  });
  _PAUSE.scenes=[];
  document.body.classList.remove('game-paused');
}
function _pauseSync(){
  if(!game||!game.scene||game.scene.isActive('Title'))return;
  var want=_openOverlays().length>0;
  if(want&&!_PAUSE.active)_pauseAll();
  else if(!want&&_PAUSE.active)_resumeAll();
  else if(want&&_PAUSE.active){
    // A scene that started while paused (e.g. a menu action launched one) must pause too.
    game.scene.getScenes(true).forEach(function(s){
      var k=s.sys.settings.key; if(k==='Title'||k==='Boot')return;
      s.scene.pause(); if(_PAUSE.scenes.indexOf(k)<0)_PAUSE.scenes.push(k);
    });
  }
}
(function(){
  var queued=false;
  function schedule(){ if(queued)return; queued=true; Promise.resolve().then(function(){queued=false;_pauseSync();}); }
  new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['style','class','hidden']});
  setInterval(_pauseSync,400); // safety net
})();

function _closeAllOverlays(){
  ['map','quests','inventory','camp','mounts','controls','sandbox','tome'].forEach(function(id){closeModal(id);});
  ['slot-picker-modal','quick-pick-popup','item-found-popup','familiar-info-modal','scene-error-banner'].forEach(function(id){
    var el=document.getElementById(id); if(el)el.style.display='none';
  });
  if(window._tavernClose&&document.getElementById('tavern-menu-overlay'))window._tavernClose();
  // The sky-port shop is left alone: it decides between "launch" and "cancel" itself.
}

// Which scene is the player currently playing in (topmost running scene)?
var _SCENE_PRIORITY=['VolcanoBossRush','VolcanoMaze','VolcanoBulletHell','VolcanoPuzzle','VolcanoEscape',
  'Cave','Sky','Dungeon','Building','Island','World'];
function _activePlayScene(includePaused){
  if(!game||!game.scene)return null;
  for(var i=0;i<_SCENE_PRIORITY.length;i++){
    var k=_SCENE_PRIORITY[i], s=game.scene.getScene(k);
    if(!s)continue;
    if(game.scene.isActive(k)||(includePaused&&s.sys.isPaused()))return s;
  }
  return null;
}

// ── The one keyboard handler ─────────────────────────────────────────────
var _MENU_HOTKEYS={i:'inventory',q:'quests',m:'mounts',b:'map',t:'tome'};
document.addEventListener('keydown',function(e){
  if(_isTyping())return;
  if(!game||!game.scene||game.scene.isActive('Title')||game.scene.isActive('Boot'))return;
  var k=(e.key||'').toLowerCase();

  // Esc closes menus first; with nothing open it falls through to the scene
  // (e.g. leaving a volcano room).
  if(e.key==='Escape'){
    if(_openOverlays().length){ e.preventDefault(); e.stopPropagation(); _closeAllOverlays(); }
    return;
  }

  // Menu hotkeys toggle their own menu and work everywhere.
  if(_MENU_HOTKEYS[k]){
    e.preventDefault();
    var id=_MENU_HOTKEYS[k], el=document.getElementById('modal-'+id);
    if(_isOverlayShown(el)){ closeModal(id); return; }
    _closeAllOverlays();
    var ws=game.scene.getScene('World');
    if(id==='inventory'&&ws&&ws.playerState)updateInventoryModal(ws.playerState);
    toggleModal(id);
    return;
  }
  if(k==='n'||k==='o'){ // familiar / food pickers (shown on the action bar)
    e.preventDefault();
    var type=k==='n'?'familiar':'food', pop=document.getElementById('quick-pick-popup');
    if(!(_isOverlayShown(pop)&&pop.dataset.qtype===type))_closeAllOverlays();
    showQuickPick(type);
    return;
  }

  // Everything below is a gameplay action: blocked while paused.
  var gameplay={control:1,x:1,z:1,c:1,p:1};
  if(!gameplay[k])return;
  e.preventDefault();
  if(_PAUSE.active||_openOverlays().length)return;
  var sc=_activePlayScene(false); if(!sc)return;
  var ws2=game.scene.getScene('World');
  if(k==='control'){
    var key=sc.sys.settings.key;
    if(key==='World')_fireWorldBow(sc);
    else if(key==='Dungeon')_fireSceneBow(sc,'dungeon');
    else if(key==='Island')_fireSceneBow(sc,'island');
  } else if(k==='x'){
    _heroCastSpell(sc);
  } else if(k==='z'){
    if(sc===ws2&&ws2._useSpecial)ws2._useSpecial();
    else showNotif('Specials can only be used in the overworld','#8899aa');
  } else if(k==='c'){
    doCycleAmmo();
  } else if(k==='p'){
    if(ws2)ws2._quickUsePotion();
  }
});

// Drive the shared hero systems (familiars, spells, status effects, mana)
// once per frame for whichever scene is being played.
game.events.on('poststep',function(time,delta){ _heroUpkeep(delta); });
