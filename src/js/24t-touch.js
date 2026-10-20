// ═══════════════════════════════════════════════════════════════════════
// ║ 24t-touch.js — round 72 (Kris, N1: "touch controls"): play on a phone or a tablet.
// ║  · A thumbstick on the left half of the screen: put a thumb down anywhere there and drag — the stick appears under it (8 ways).
// ║  · Buttons on the right: ⚔ attack (big), ✋ [Tab] talk / open / enter, 🤸 roll, 🏹 bow, ✨ spell, 💥 skill, 🛡 defend (hold).
// ║  · ≡ More: mount, familiar, potion, food, Godsbane, map, quests, inventory, Tome, pause.
// ║  · How: each control presses the keyboard key the game already knows (a synthetic keydown, then keyup), so every scene — the world,
// ║    the sites, the forges, the feast hall — works without change. Menus and pop-ups are HTML and were already tappable.
// ║  · Shown on touch screens (a coarse pointer), hidden while a menu, a talk box or a cut-scene is open and on the title page.
// ║    ?touch=1 forces it on (and the Dev panel's ZTOUCH.on(true)); ?touch=0 off. Pointer events, so a mouse can drive it too (tests).
// ═══════════════════════════════════════════════════════════════════════
var ZTOUCH={ el:null, held:{}, dirs:{}, shown:false, force:null,
  KEYS:{w:['w','KeyW',87],a:['a','KeyA',65],s:['s','KeyS',83],d:['d','KeyD',68],space:[' ','Space',32],tab:['Tab','Tab',9],alt:['Alt','AltLeft',18],ctrl:['Control','ControlLeft',17],shift:['Shift','ShiftLeft',16],
    x:['x','KeyX',88],z:['z','KeyZ',90],m:['m','KeyM',77],n:['n','KeyN',78],p:['p','KeyP',80],o:['o','KeyO',79],v:['v','KeyV',86],b:['b','KeyB',66],i:['i','KeyI',73],t:['t','KeyT',84],q:['q','KeyQ',81],esc:['Escape','Escape',27]},
  want:function(){ if(ZTOUCH.force!==null)return ZTOUCH.force; try{ var q=/[?&]touch=([01])/.exec(location.search); if(q)return q[1]==='1'; return !!(window.matchMedia&&matchMedia('(pointer: coarse)').matches)||('ontouchstart' in window&&navigator.maxTouchPoints>0); }catch(e){ return false; } },
  on:function(v){ ZTOUCH.force=v===undefined?null:!!v; ZTOUCH.tick(); },
  // press / release a key the way the keyboard does (Phaser reads keyCode; the game's own listeners read key)
  key:function(k,down){ var K=ZTOUCH.KEYS[k]; if(!K)return; if(down&&ZTOUCH.held[k])return; if(!down&&!ZTOUCH.held[k])return; ZTOUCH.held[k]=down?1:0;
    try{ var ev=new KeyboardEvent(down?'keydown':'keyup',{key:K[0],code:K[1],bubbles:true,cancelable:true,altKey:k==='alt'&&down,ctrlKey:k==='ctrl'&&down,shiftKey:k==='shift'&&down});
      Object.defineProperty(ev,'keyCode',{get:function(){ return K[2]; }}); Object.defineProperty(ev,'which',{get:function(){ return K[2]; }}); ev._ztouch=1; document.dispatchEvent(ev); }catch(e){} },
  tap:function(k){ ZTOUCH.key(k,true); setTimeout(function(){ ZTOUCH.key(k,false); },90); },
  releaseAll:function(){ Object.keys(ZTOUCH.held).forEach(function(k){ if(ZTOUCH.held[k])ZTOUCH.key(k,false); }); ZTOUCH.stick(null); },
  // the thumbstick: an angle → up to two of W A S D
  stick:function(v){ var want={}; if(v&&Math.hypot(v.x,v.y)>0.28){ var a=Math.atan2(v.y,v.x), s=Math.PI/8; if(a>-3*s&&a<3*s)want.d=1; if(a>5*s||a<-5*s)want.a=1; if(a>s&&a<7*s)want.s=1; if(a<-s&&a>-7*s)want.w=1; }
    ['w','a','s','d'].forEach(function(k){ if(want[k]&&!ZTOUCH.held[k])ZTOUCH.key(k,true); else if(!want[k]&&ZTOUCH.held[k])ZTOUCH.key(k,false); }); },
  BTN:[['atk','⚔','space',1,'Attack'],['tab','✋','tab',0,'Talk / open'],['roll','🤸','alt',0,'Roll'],['bow','🏹','ctrl',0,'Bow'],['spell','✨','x',0,'Spell'],['skill','💥','z',0,'Skill'],['def','🛡','shift',2,'Defend (hold)']],
  MORE:[['m','🐎','Mount'],['n','🐾','Familiar'],['p','🧪','Potion'],['o','🍞','Food'],['v','✦','Godsbane'],['b','🗺','Map'],['q','📜','Quests'],['i','🎒','Inventory'],['t','📖','Tome'],['esc','⏸','Pause']],
  build:function(){ if(ZTOUCH.el||typeof document==='undefined')return; var el=ZTOUCH.el=document.createElement('div'); el.id='ztouch';
    el.innerHTML='<div class="zt-pad"><div class="zt-base"><div class="zt-knob"></div></div></div><div class="zt-btns">'+ZTOUCH.BTN.map(function(b){ return '<button class="zt-b zt-'+b[0]+'" data-k="'+b[2]+'" data-hold="'+(b[3]===2?1:0)+'" aria-label="'+b[4]+'">'+b[1]+'</button>'; }).join('')+
      '<button class="zt-b zt-more" aria-label="More">≡</button></div><div class="zt-menu">'+ZTOUCH.MORE.map(function(b){ return '<button class="zt-m" data-k="'+b[0]+'"><span>'+b[1]+'</span>'+b[2]+'</button>'; }).join('')+'</div>';
    var st=document.createElement('style'); st.id='ztouch-css'; st.textContent='#ztouch{position:fixed;inset:0;z-index:40;pointer-events:none;display:none;touch-action:none;-webkit-user-select:none;user-select:none}#ztouch.on{display:block}'+
      '.zt-pad{position:absolute;left:0;top:18%;bottom:0;width:46%;pointer-events:auto;touch-action:none}.zt-base{position:absolute;width:120px;height:120px;margin:-60px 0 0 -60px;border-radius:50%;background:rgba(10,16,26,.28);border:2px solid rgba(255,242,176,.35);display:none}.zt-base.on{display:block}'+
      '.zt-knob{position:absolute;left:50%;top:50%;width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;background:rgba(255,242,176,.55);box-shadow:0 0 12px rgba(255,220,120,.5)}'+
      '.zt-btns{position:absolute;right:max(14px,env(safe-area-inset-right));bottom:max(14px,env(safe-area-inset-bottom));width:212px;height:212px;pointer-events:none}'+
      '.zt-b{position:absolute;pointer-events:auto;touch-action:none;border-radius:50%;border:2px solid rgba(255,242,176,.55);background:rgba(16,24,38,.62);color:#fff2b0;font-size:22px;width:54px;height:54px;padding:0;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.45)}'+
      '.zt-b.down,.zt-m.down{background:rgba(255,220,120,.55);color:#1a1206}.zt-atk{width:84px;height:84px;font-size:36px;right:0;bottom:0}.zt-tab{right:96px;bottom:2px}.zt-roll{right:2px;bottom:96px}.zt-bow{right:150px;bottom:30px}.zt-spell{right:84px;bottom:76px}.zt-skill{right:30px;bottom:150px}'+
      '.zt-def{right:150px;bottom:96px;width:46px;height:46px;font-size:18px}.zt-more{right:96px;bottom:150px;width:42px;height:42px;font-size:20px}'+
      '.zt-menu{position:absolute;right:max(14px,env(safe-area-inset-right));bottom:240px;display:none;grid-template-columns:repeat(5,58px);gap:6px;pointer-events:auto;background:rgba(8,12,20,.82);border:1px solid rgba(255,242,176,.35);border-radius:12px;padding:8px}.zt-menu.on{display:grid}'+
      '.zt-m{border:1px solid rgba(255,242,176,.3);border-radius:8px;background:rgba(20,30,46,.9);color:#e8eef8;font:600 10px "Segoe UI",sans-serif;padding:4px 0;display:flex;flex-direction:column;align-items:center;gap:2px;touch-action:none}.zt-m span{font-size:20px}'+
      '@media (max-height:430px){.zt-btns{transform:scale(.82);transform-origin:right bottom}.zt-menu{bottom:190px}}'+
      'body.ztouch-on #ctrl-hint{display:none!important}body.ztouch-on #action-icon-bar{transform:scale(.72);transform-origin:center bottom}';
    document.head.appendChild(st); document.body.appendChild(el);
    // the stick
    var pad=el.querySelector('.zt-pad'), base=el.querySelector('.zt-base'), knob=el.querySelector('.zt-knob'), sp=null;
    pad.addEventListener('pointerdown',function(e){ e.preventDefault(); if(sp)return; sp={id:e.pointerId,x:e.clientX,y:e.clientY}; try{ pad.setPointerCapture(e.pointerId); }catch(x){} var r=pad.getBoundingClientRect(); base.style.left=(e.clientX-r.left)+'px'; base.style.top=(e.clientY-r.top)+'px'; base.classList.add('on'); knob.style.transform=''; });
    pad.addEventListener('pointermove',function(e){ if(!sp||e.pointerId!==sp.id)return; e.preventDefault(); var dx=e.clientX-sp.x, dy=e.clientY-sp.y, L=Math.hypot(dx,dy), R=50; if(L>R){ dx*=R/L; dy*=R/L; } knob.style.transform='translate('+dx+'px,'+dy+'px)'; ZTOUCH.stick({x:dx/R,y:dy/R}); });
    var end=function(e){ if(!sp||e.pointerId!==sp.id)return; sp=null; base.classList.remove('on'); ZTOUCH.stick(null); }; pad.addEventListener('pointerup',end); pad.addEventListener('pointercancel',end); pad.addEventListener('lostpointercapture',end);
    // the buttons: down = key down; up = key up (a tap still gives the game one frame of the key held)
    el.querySelectorAll('.zt-b[data-k]').forEach(function(b){ var k=b.dataset.k, t0=0;
      b.addEventListener('pointerdown',function(e){ e.preventDefault(); e.stopPropagation(); try{ b.setPointerCapture(e.pointerId); }catch(x){} b.classList.add('down'); t0=Date.now(); ZTOUCH.key(k,true); });
      var up=function(e){ if(!b.classList.contains('down'))return; b.classList.remove('down'); var left=Math.max(0,70-(Date.now()-t0)); setTimeout(function(){ ZTOUCH.key(k,false); },left); }; b.addEventListener('pointerup',up); b.addEventListener('pointercancel',up); b.addEventListener('lostpointercapture',up); });
    var menu=el.querySelector('.zt-menu'); el.querySelector('.zt-more').addEventListener('pointerdown',function(e){ e.preventDefault(); menu.classList.toggle('on'); });
    menu.querySelectorAll('.zt-m').forEach(function(b){ b.addEventListener('pointerdown',function(e){ e.preventDefault(); b.classList.add('down'); setTimeout(function(){ b.classList.remove('down'); },150); menu.classList.remove('on'); ZTOUCH.tap(b.dataset.k); }); });
    // no page zoom, scroll or long-press menu while playing
    document.addEventListener('contextmenu',function(e){ if(ZTOUCH.shown&&e.target&&e.target.closest&&e.target.closest('#ztouch,#phaser-root'))e.preventDefault(); });
    window.addEventListener('blur',ZTOUCH.releaseAll); document.addEventListener('visibilitychange',function(){ if(document.hidden)ZTOUCH.releaseAll(); }); },
  // show it only while you play
  tick:function(){ try{ if(typeof document==='undefined'||!document.body)return; var want=ZTOUCH.want(); if(want&&!ZTOUCH.el)ZTOUCH.build(); if(!ZTOUCH.el)return;
      var play=want&&typeof game!=='undefined'&&game.scene&&!game.scene.isActive('Title')&&(game.scene.isActive('FeastHall')||(typeof _activePlayScene==='function'&&!!_activePlayScene(false)))&&!(typeof _anyModalOpen==='function'&&_anyModalOpen())&&!(typeof ZCUT!=='undefined'&&ZCUT.isOpen&&ZCUT.isOpen())&&!document.getElementById('zcine-panel');
      document.body.classList.toggle('ztouch-on',!!want);
      if(play!==ZTOUCH.shown){ ZTOUCH.shown=play; ZTOUCH.el.classList.toggle('on',play); if(!play){ ZTOUCH.releaseAll(); var m=ZTOUCH.el.querySelector('.zt-menu'); if(m)m.classList.remove('on'); } } }catch(e){} }
};
setInterval(ZTOUCH.tick,250);
