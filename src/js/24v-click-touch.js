// ═══════════════════════════════════════════════════════════════════════
// ║ 24v-click-touch.js — round 86: CLICK (OR TAP) TO INTERACT, AND THE PHONE LAYOUT PUT RIGHT.
// ║ Kris: "we also need a different way to interact instead of tab. you should be able to just click on the thing instead of needing to do
// ║ tab. lets also make this a feature for our desktop version"; on the phone: "all of the space, ctrl, c, shift, p o x m need to have icons
// ║ removed and small clickable icons like the attack button. also, needs to be more zoomed out, things are too big … zoom out 50% (then: 18%), also
// ║ the banner at the top which tells you where you are is too large".
// ║  · CLICK TO INTERACT (desktop and phone): click or tap a door, a person, a chest, the stairs, a waystone — anything that shows a
// ║    "[Tab] …" line. Near enough, it happens at once (as Tab). Further off, the hero walks there in a straight line (up to 6 s; any
// ║    movement key or the thumbstick takes over) and then does it. A click on open ground just walks there. The lines read "Tap" on a phone.
// ║  · PHONE: the bar of key-labelled slots (SPC CTRL C SHIFT P O X M N Z) is gone; next to the round buttons there is a column of small
// ║    round ones — ammo (C), potion (P), food (O), mount (M), familiar (N); the ≡ menu keeps only what has no button.
// ║  · PHONE: the view is zoomed out by 18 % (ZCLICK.ZOOM — every play scene's camera, set as it opens); the place banner and the realm
// ║    panel at the top are smaller.
// ║ Switches: ZCLICK.on (click to interact), ZCLICK.ZOOM (phone zoom factor, 1 = as on desktop).
// ═══════════════════════════════════════════════════════════════════════
var ZCLICK={ on:true, ZOOM:0.82,      /* round 86b (Kris: "50% was way too zoomed out … only zoom out by 18%") */  REACH:2.6, goal:null, _down:null,
  SCENES:{World:1,Island:1,Dungeon:1,Building:1},
  touch:function(){ return typeof ZTOUCH!=='undefined'&&ZTOUCH.want(); },
  scene:function(){ var s=typeof _activePlayScene==='function'?_activePlayScene(false):null; return s&&ZCLICK.SCENES[s.sys.settings.key]?s:null; },
  hero:function(s){ var k=s.sys.settings.key; if(k==='Dungeon')return {x:s.px,y:s.py}; if(k==='Building')return {x:s.bx,y:s.by}; return s.player?{x:s.player.x,y:s.player.y}:null; },
  // the "[Tab] …" line showing now, and where its thing stands (the line floats about 30 px above it)
  prompt:function(s){ var P=s._interactPrompt||s.interactPrompt; if(!P||P.visible===false||P.active===false||!(P.text||(P._el&&P._el.textContent)))return null; return {x:P.x,y:P.y+30}; },
  busy:function(){ return (typeof _openOverlays==='function'&&_openOverlays().length)||(typeof isGamePaused==='function'&&isGamePaused())||(typeof ZPAUSE!=='undefined'&&ZPAUSE.cur&&ZPAUSE.cur()); },
  worldPoint:function(s,e){ var cv=game.canvas, r=cv.getBoundingClientRect(), gx=(e.clientX-r.left)*game.scale.width/r.width, gy=(e.clientY-r.top)*game.scale.height/r.height; return s.cameras.main.getWorldPoint(gx,gy); },
  ring:function(s,x,y,col){ try{ var g=s.add.graphics().setDepth(9999); g.lineStyle(2,col||0x6fe3f5,0.9); g.strokeCircle(x,y,10); s.tweens.add({targets:g,alpha:0,scale:1.6,duration:420,onComplete:function(){ g.destroy(); }}); g.x=0; }catch(e){} },
  act:function(){ if(typeof ZTOUCH!=='undefined')ZTOUCH.tap('tab'); },
  // a person in the village you clicked (the Tab line may belong to something else close by — the waystone beside the elder)
  npcAt:function(s,p){ var L=s._villageNPCs||[], best=null, bd=TILE*1.3; L.forEach(function(n){ var d=Math.hypot(n.x-p.x,(n.y-14)-p.y); if(d<bd){ bd=d; best=n; } }); return best; },
  talk:function(s,n){ if(typeof n.talk==='function')return n.talk(s); if(typeof ZDLG!=='undefined'&&ZDLG.on)return ZDLG.say(n.n,String(n.line||'').replace(/^\s*[A-Z][\w'’ .-]{1,30}:\s*["“]?/,'').replace(/["”]\s*$/,''),{id:n.id}); if(typeof showNotif==='function')showNotif(n.icon+' '+n.line,'#ffe9a8'); },
  click:function(e){ if(!ZCLICK.on||ZCLICK.busy())return; var s=ZCLICK.scene(); if(!s)return; var H=ZCLICK.hero(s); if(!H)return; var p=ZCLICK.worldPoint(s,e), T=TILE, P=ZCLICK.prompt(s);
    var N=s.sys.settings.key==='World'?ZCLICK.npcAt(s,p):null;
    if(N){ ZCLICK.ring(s,N.x,N.y-14,0xfff2b0); if(Math.hypot(N.x-H.x,N.y-H.y)<T*1.8){ ZCLICK.stop(); ZCLICK.talk(s,N); } else ZCLICK.goal={s:s,x:N.x,y:N.y+TILE*0.6,t0:Date.now(),last:{x:H.x,y:H.y,t:Date.now()},npc:N}; return; }
    if(P&&(Math.hypot(p.x-P.x,p.y-P.y)<T*ZCLICK.REACH||Math.hypot(p.x-H.x,p.y-H.y)<T*1.6)){ ZCLICK.ring(s,P.x,P.y,0xfff2b0); ZCLICK.stop(); ZCLICK.act(); return; }
    ZCLICK.ring(s,p.x,p.y); ZCLICK.goal={s:s,x:p.x,y:p.y,t0:Date.now(),last:{x:H.x,y:H.y,t:Date.now()},act:true}; },
  stop:function(){ if(ZCLICK.goal){ ZCLICK.goal=null; if(typeof ZTOUCH!=='undefined')ZTOUCH.stick(null); } },
  // walk toward the goal, a little at a time; arrive, give up when stuck, or do the thing on reaching it
  step:function(){ var G=ZCLICK.goal; if(!G)return; var s=ZCLICK.scene(); if(!s||s!==G.s||ZCLICK.busy()){ ZCLICK.stop(); return; } var H=ZCLICK.hero(s); if(!H){ ZCLICK.stop(); return; }
    var now=Date.now(), dx=G.x-H.x, dy=G.y-H.y, d=Math.hypot(dx,dy), P=ZCLICK.prompt(s);
    if(G.npc){ if(Math.hypot(G.npc.x-H.x,G.npc.y-H.y)<TILE*1.6){ var n=G.npc; ZCLICK.stop(); ZCLICK.talk(s,n); return; } }
    else if(P&&Math.hypot(G.x-P.x,G.y-P.y)<TILE*ZCLICK.REACH){ ZCLICK.stop(); ZCLICK.act(); return; }      // reached what was clicked
    if(d<12||now-G.t0>6000){ ZCLICK.stop(); return; }
    if(now-G.last.t>650){ if(Math.hypot(H.x-G.last.x,H.y-G.last.y)<6){ ZCLICK.stop(); return; } G.last={x:H.x,y:H.y,t:now}; }      // blocked: stop
    if(typeof ZTOUCH!=='undefined')ZTOUCH.stick({x:dx/d,y:dy/d}); },
  // ── the phone: small round buttons for the slots ──
  MINI:[['c','🎯','Ammo'],['p','🧪','Potion'],['o','🍞','Food'],['m','🐎','Mount'],['n','🐾','Familiar']],
  mini:function(){ if(typeof ZTOUCH==='undefined'||!ZTOUCH.el||ZTOUCH.el.querySelector('.zt-mini'))return; if(!ZTOUCH.KEYS.c)ZTOUCH.KEYS.c=['c','KeyC',67];
    var col=document.createElement('div'); col.className='zt-mini'; col.innerHTML=ZCLICK.MINI.map(function(b){ return '<button class="zt-b zt-sm" data-k="'+b[0]+'" aria-label="'+b[2]+'">'+b[1]+'</button>'; }).join('');
    ZTOUCH.el.appendChild(col);
    // round 86b: the buttons press and release like the keys (so holding 🧪 throws the readied flask, as holding P does)
    col.querySelectorAll('.zt-sm').forEach(function(b){ var k=b.dataset.k, t0=0; b.addEventListener('pointerdown',function(e){ e.preventDefault(); e.stopPropagation(); try{ b.setPointerCapture(e.pointerId); }catch(x){} b.classList.add('down'); t0=Date.now(); ZTOUCH.key(k,true); });
      var up=function(){ if(!b.classList.contains('down'))return; b.classList.remove('down'); var left=Math.max(0,70-(Date.now()-t0)); setTimeout(function(){ ZTOUCH.key(k,false); },left); }; b.addEventListener('pointerup',up); b.addEventListener('pointercancel',up); b.addEventListener('lostpointercapture',up); });
    // the ≡ menu keeps only what has no button now (the pause panel ☰ has the map, quests, inventory and Tome)
    ZTOUCH.el.querySelectorAll('.zt-m').forEach(function(m){ if(/^(m|n|p|o|b|q|i|t|esc)$/.test(m.dataset.k))m.style.display='none'; });
    // the thumbstick half of the screen: a drag steers, a quick tap there is a tap on the world like anywhere else
    var pad=ZTOUCH.el.querySelector('.zt-pad'); if(pad){ var pd=null; pad.addEventListener('pointerdown',function(e){ ZCLICK.stop(); pd={x:e.clientX,y:e.clientY,t:Date.now()}; });
      pad.addEventListener('pointerup',function(e){ var D=pd; pd=null; if(D&&Math.hypot(e.clientX-D.x,e.clientY-D.y)<14&&Date.now()-D.t<350)ZCLICK.click(e); }); } },
  // round 86b (Kris: "on the mobile version, i'm currently not able to click on the map and get it to pop up"): the whole corner map is a
  // button for Map & Quests (its small 🗺 was the only target, and on a phone it is shrunk to a few pixels)
  mapTap:function(){ var h=document.getElementById('minimap-hud'); if(!h||h._zct)return; h._zct=1; h.style.pointerEvents='auto'; h.style.cursor='pointer'; h.title='World map (B)';
    h.addEventListener('click',function(e){ e.stopPropagation(); e.preventDefault(); if(typeof ZPAUSE!=='undefined')ZPAUSE.go('map'); else if(typeof openWorldMap==='function')openWorldMap(); },true); },
  css:function(){ if(document.getElementById('zclick-css'))return; var st=document.createElement('style'); st.id='zclick-css'; st.textContent=
    'body.ztouch-on #action-icon-bar{display:none!important}'+
    '.zt-mini{position:absolute;right:calc(max(14px,env(safe-area-inset-right)) + 222px);bottom:max(14px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:6px;pointer-events:none}'+
    '.zt-mini .zt-sm{position:static;width:38px;height:38px;font-size:17px;pointer-events:auto}'+
    '@media (max-height:430px){.zt-mini{transform:scale(.82);transform-origin:right bottom;right:calc(max(14px,env(safe-area-inset-right)) + 186px)}}'+
    'body.ztouch-on #zone-banner{top:58px}body.ztouch-on #zone-banner .zb-name{font-size:14px}body.ztouch-on #zone-banner .zb-reg{font-size:8px;letter-spacing:1px}'+
    'body.ztouch-on #region-panel{left:auto;right:6px;top:4px;transform:scale(.6);transform-origin:top right}body.ztouch-on #minimap-hud{top:40px;bottom:auto;right:6px;transform:scale(.48);transform-origin:top right}body.ztouch-on #stats-panel{transform:scale(.78);transform-origin:top left}'+
    'body.zclick-hover #phaser-root canvas{cursor:pointer}'+
    // round 86b (Kris: "the inventory and other tabs doesn't scale … check … that the screen is balanced for visibility in the inventory and other
    // tabs"): on a phone (or any short window) every menu is scaled to fit — the factor (--zmz) follows the screen, ~0.67 on a phone held sideways
    'body.zmz-on .overlay>.modal{zoom:var(--zmz,.7);max-height:calc((100vh - 48px) / var(--zmz,.7))!important;max-width:calc(98vw / var(--zmz,.7))!important;overflow:auto!important}'+
    'body.zmz-on .overlay{align-items:flex-start!important}body.zmz-on .overlay>.modal{margin-top:6px!important;margin-bottom:0!important}'+
    'body.zmz-on.zpz-on .overlay{padding-top:40px}body.zmz-on #zpause{padding:3px 6px;gap:5px}body.zmz-on #zpause button{padding:4px 8px;font-size:12px}'+
    'body.zmz-on #zaud-panel,body.zmz-on #quick-pick-popup,body.zmz-on #zdlg .zd-box{zoom:var(--zmz,.7)}';
    document.head.appendChild(st); },
  // the words on a phone: no Tab key there
  word:function(t){ if(typeof t!=='string'||t.indexOf('Tab')<0||!ZCLICK.touch())return t;
    return t.replace(/\b(?:press|pressing|hit)\s+\[?Tab\]?/gi,'tap').replace(/\bwith\s+\[Tab\]/g,'with a tap').replace(/(^|\n)([^\w\[\]]{0,6}?)\s*\[Tab\]\s*/g,'$1$2👆 Tap: ').replace(/\[Tab\]/g,'tap').replace(/\(Tab\)/g,'(tap)').replace(/\bTab\b/g,'Tap'); },
  textPatch:function(){ if(typeof Phaser==='undefined'||!Phaser.GameObjects||!Phaser.GameObjects.Text)return; var T=Phaser.GameObjects.Text.prototype; if(T._zwRaw)return; var raw=T._zwRaw=T.setText;
    T.setText=function(v){ return raw.call(this,typeof v==='string'?ZCLICK.word(v):v); }; },
  // the phone's zoom: a play scene's main camera is set ZOOM times what the scene asks for (Title and Boot as they are). 16l's boss view
  // eases the zoom itself through _setZoomRaw, on top of what is already set.
  zoomPatch:function(){ if(typeof Phaser==='undefined'||!Phaser.Cameras)return; var C=Phaser.Cameras.Scene2D.Camera.prototype; if(C._setZoomRaw)return; var raw=C._setZoomRaw=C.setZoom;
    C.setZoom=function(x,y){ try{ var sc=this.scene, k=sc&&sc.sys&&sc.sys.settings.key; if(ZCLICK.ZOOM!==1&&k&&k!=='Title'&&k!=='Boot'&&sc.cameras&&this===sc.cameras.main&&ZCLICK.touch()){ x*=ZCLICK.ZOOM; if(y!==undefined)y*=ZCLICK.ZOOM; } }catch(e){} return raw.call(this,x,y); }; }
};
(function(){ ZCLICK.css(); ZCLICK.zoomPatch(); ZCLICK.textPatch();
  var bind=function(){ ZCLICK.zoomPatch(); ZCLICK.textPatch(); var cv=typeof game!=='undefined'&&game.canvas; if(!cv){ setTimeout(bind,400); return; }
    cv.addEventListener('pointerdown',function(e){ ZCLICK._down={x:e.clientX,y:e.clientY,t:Date.now()}; });
    cv.addEventListener('pointerup',function(e){ var D=ZCLICK._down; ZCLICK._down=null; if(!D||Math.hypot(e.clientX-D.x,e.clientY-D.y)>14||Date.now()-D.t>600)return; ZCLICK.click(e); });
    // a pointer over something you can use (desktop)
    cv.addEventListener('pointermove',function(e){ if(e.pointerType!=='mouse')return; var s=ZCLICK.scene(), P=s&&ZCLICK.prompt(s), on=false; if(P){ var p=ZCLICK.worldPoint(s,e); on=Math.hypot(p.x-P.x,p.y-P.y)<TILE*ZCLICK.REACH; } document.body.classList.toggle('zclick-hover',on); });
  };
  if(document.readyState==='loading')window.addEventListener('DOMContentLoaded',bind); else bind();
  // the menus' scale on a small screen
  var fit=function(){ var on=ZCLICK.touch()||window.innerHeight<560; document.body.classList.toggle('zmz-on',on); if(on){ var z=Math.max(0.55,Math.min(1,window.innerHeight/560,window.innerWidth/1000)); document.documentElement.style.setProperty('--zmz',z.toFixed(3)); } };
  window.addEventListener('resize',fit); window.addEventListener('orientationchange',function(){ setTimeout(fit,300); }); setInterval(fit,2000); setTimeout(fit,500);
  setInterval(ZCLICK.step,50); setInterval(ZCLICK.mini,600); setInterval(ZCLICK.mapTap,1000);
  // the keyboard takes over from a walk
  document.addEventListener('keydown',function(e){ if(e._ztouch||!ZCLICK.goal)return; if(/^(w|a|s|d|arrow\w+)$/i.test(e.key||''))ZCLICK.stop(); },true);
  // "[Tab]" reads "Tap" on a phone
  // round 86b (Kris: "since in mobile we can't click tab, it shouldn't say 'tab'"): on a phone every "[Tab] …" line, prompt and message
  // reads "👆 Tap: …" — the floating prompts (DOM and canvas text, as made and as changed) and the lines at the top
  if(typeof domText==='function'){ var dt0=domText; domText=function(sc,x,y,txt,st){ var o=dt0.call(this,sc,x,y,ZCLICK.word(txt),st); if(o&&typeof o.setText==='function'&&!o._zw){ var s0=o.setText; o.setText=function(t){ return s0.call(this,ZCLICK.word(t)); }; o._zw=1; } return o; }; }
  if(typeof showNotif==='function'){ var sn0=showNotif; showNotif=function(m){ var a=[].slice.call(arguments); a[0]=ZCLICK.word(m); return sn0.apply(this,a); }; window.showNotif=showNotif; }
})();
