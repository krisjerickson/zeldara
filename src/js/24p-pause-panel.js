// ═══════════════════════════════════════════════════════════════════════
// ║ 24p-pause-panel.js — round 85: ONE PAUSE INTERFACE (Kris: "let's rebuild the paused interface and make it 1 singular interface. We
// ║ should do tabs for all the different types of interfaces we currently have (map, tome, inventory, mounts, familar, etc.) to choose from
// ║ and switch between. For desktop, OK to show these as separate clickable things, but you can then easily go to any of them without
// ║ unpausing … Also should be able to get to sound, controls, and dev. We should also consolidate map and quest into one"; U1 answered:
// ║ on a phone, ONE ☰ icon).
// ║  · Whenever any of its screens is open, a strip of tabs runs across the top: Map & Quests · Inventory · Skills & Familiars · Mounts ·
// ║    Tome · Sound · Controls · Dev, and ✕ Resume. A tab swaps the screen without un-pausing (the game stays paused: 24 PAUSE_OVERLAYS).
// ║  · Desktop keeps its bar of icons; each opens its tab (the Quests icon is gone — the journal lives in Map & Quests). Esc with nothing open
// ║    opens the panel where you left it; Esc in it resumes. Q opens Map & Quests.
// ║  · Phone / tablet: the bar of icons gives way to one ☰ (top centre), with ⛶ full screen beside it.
// ║  · Sound: all sound on/off, and music · ambience · effects each on/off with its own level (saved per browser).
// ║  · Fixed: the Inventory icon showed an empty or stale pack (it never drew it); Save Game and Main Menu in Controls did nothing.
// ║ ZPAUSE.go(id) opens a tab; ZPAUSE.open() the last one. Switch: ZPAUSE.on.
// ═══════════════════════════════════════════════════════════════════════
var ZPAUSE={ on:true, last:'map',
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  shown:function(id){ var e=document.getElementById(id); return !!(e&&e.style.display!=='none'&&e.offsetParent!==null); },
  TABS:[
    {id:'map',ic:'🗺️',n:'Map & Quests',el:['modal-map','modal-quests'],open:function(){ if(typeof openWorldMap==='function')openWorldMap(); }},
    {id:'inventory',ic:'🎒',n:'Inventory',el:['modal-inventory'],is:function(){ return typeof ZINV==='undefined'||ZINV.filter!=='magic'; },open:function(){ if(typeof ZINV!=='undefined'&&ZINV.filter==='magic')ZINV.filter='all'; ZPAUSE.inv(); }},
    {id:'skills',ic:'✨',n:'Skills & Familiars',el:['modal-inventory'],is:function(){ return typeof ZINV!=='undefined'&&ZINV.filter==='magic'; },open:function(){ if(typeof ZINV!=='undefined')ZINV.filter='magic'; ZPAUSE.inv(); }},
    {id:'mounts',ic:'🐎',n:'Mounts',el:['modal-mounts'],open:function(){ if(typeof toggleModal==='function')toggleModal('mounts'); }},
    {id:'tome',ic:'📖',n:'Tome',el:['modal-tome'],open:function(){ if(typeof Tome!=='undefined')Tome.open(); }},
    {id:'sound',ic:'🔊',n:'Sound',el:['modal-sound'],open:function(){ ZPAUSE.sound(); }},
    {id:'controls',ic:'🎮',n:'Controls',el:['modal-controls'],open:function(){ if(typeof toggleModal==='function')toggleModal('controls'); if(typeof ZDiff!=='undefined')ZDiff.render(); }},
    {id:'dev',ic:'🔧',n:'Dev',el:['modal-sandbox'],open:function(){ if(typeof openSandbox==='function')openSandbox(); }}],
  tab:function(id){ return ZPAUSE.TABS.find(function(t){ return t.id===id; }); },
  inv:function(){ var ws=ZPAUSE.ws(); if(ws&&ws.playerState&&typeof updateInventoryModal==='function')updateInventoryModal(ws.playerState); var e=document.getElementById('modal-inventory'); if(e&&e.style.display==='none'&&typeof toggleModal==='function')toggleModal('inventory'); else if(e)e.style.display='flex'; document.body.classList.add('bars-hidden'); },
  // which tab is showing now (null: none)
  cur:function(){ for(var i=0;i<ZPAUSE.TABS.length;i++){ var t=ZPAUSE.TABS[i]; if(t.el.some(ZPAUSE.shown)&&(!t.is||t.is()))return t.id; } return null; },
  closeAll:function(){ if(typeof _closeAllOverlays==='function')_closeAllOverlays(); var s=document.getElementById('modal-sound'); if(s)s.style.display='none'; },
  go:function(id){ if(!ZPAUSE.can())return; var t=ZPAUSE.tab(id); if(!t)return; ZPAUSE.closeAll(); ZPAUSE.last=id; try{ t.open(); }catch(e){ if(typeof console!=='undefined')console.warn('pause tab',id,e); } ZPAUSE.sync(); },
  open:function(){ ZPAUSE.go(ZPAUSE.last||'map'); },
  resume:function(){ ZPAUSE.closeAll(); ZPAUSE.sync(); },
  can:function(){ try{ return !!(game&&game.scene&&!game.scene.isActive('Title')&&!game.scene.isActive('Boot')&&ZPAUSE.ws()&&ZPAUSE.ws().playerState); }catch(e){ return false; } },
  // ── the strip of tabs ──
  strip:function(){ var s=document.getElementById('zpause'); if(s)return s; s=document.createElement('div'); s.id='zpause';
    s.innerHTML='<div class="zpz-tabs">'+ZPAUSE.TABS.map(function(t){ return '<button class="zpz-t" data-t="'+t.id+'" title="'+t.n+'"><span>'+t.ic+'</span><b>'+t.n+'</b></button>'; }).join('')+'</div>'+
      '<button class="zpz-fs" title="Full screen">⛶</button><button class="zpz-x" title="Resume (Esc)">✕ <b>Resume</b></button>';
    s.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b)return; e.stopPropagation(); if(b.dataset.t)ZPAUSE.go(b.dataset.t); else if(b.classList.contains('zpz-x'))ZPAUSE.resume(); else if(b.classList.contains('zpz-fs'))ZPAUSE.fullscreen(); });
    document.body.appendChild(s); return s; },
  sync:function(){ if(!ZPAUSE.on)return; var c=ZPAUSE.cur(), s=ZPAUSE.strip(); s.style.display=c?'flex':'none'; document.body.classList.toggle('zpz-on',!!c);
    var bl=document.body.classList; if(c){ if(!bl.contains('bars-hidden')){ bl.add('bars-hidden'); ZPAUSE._bh=1; } } else if(ZPAUSE._bh){ ZPAUSE._bh=0; if(!(game&&game.scene&&game.scene.isActive('Title')))bl.remove('bars-hidden'); }
    if(c){ ZPAUSE.last=c; s.querySelectorAll('.zpz-t').forEach(function(b){ b.classList.toggle('on',b.dataset.t===c); }); } },
  // ── sound ──
  _prev:{}, mutedK:function(k){ return ZAUDIO.vol[k]<=0.001; },
  sound:function(){ var o=document.getElementById('modal-sound'); if(!o){ o=document.createElement('div'); o.className='overlay'; o.id='modal-sound'; o.style.display='none'; o.onclick=function(){ o.style.display='none'; }; document.body.appendChild(o); }
    var row=function(k,name,hint){ var on=!ZPAUSE.mutedK(k), v=Math.round((on?ZAUDIO.vol[k]:(ZPAUSE._prev[k]||0.7))*100);
      return '<div class="zsnd-r"><label class="zsnd-on"><input type="checkbox" data-on="'+k+'"'+(on?' checked':'')+'> <b>'+name+'</b></label><input type="range" min="0" max="100" value="'+v+'" data-k="'+k+'"'+(on?'':' disabled')+'><span class="zsnd-v">'+v+'</span><div class="zsnd-h">'+hint+'</div></div>'; };
    var M=typeof ZSFX!=='undefined'&&ZSFX.muted;
    o.innerHTML='<div class="modal zsnd" onclick="event.stopPropagation()"><div class="mhdr"><h2>🔊 Sound</h2></div>'+
      '<div class="zsnd-r zsnd-all"><label class="zsnd-on"><input type="checkbox" data-all="1"'+(M?'':' checked')+'> <b>All sound</b></label><input type="range" min="0" max="100" value="'+Math.round(((typeof ZSFX!=='undefined'&&ZSFX.vol)||0.7)*100)+'" data-master="1"'+(M?' disabled':'')+'><span class="zsnd-v">'+Math.round(((typeof ZSFX!=='undefined'&&ZSFX.vol)||0.7)*100)+'</span><div class="zsnd-h">Everything at once (also the 🔊 icon\'s right-click).</div></div>'+
      row('music','Music','The pieces for each place, the fights and the cut-scenes.')+row('amb','Ambience','Wind, water, birds, the village, the forges.')+row('sfx','Sound effects','Blows, steps, doors, spells, the menus.')+
      '<div class="zsnd-n">Your choices are kept in this browser. A browser plays no sound until you first click or press a key in the game.</div></div>';
    o.querySelectorAll('input[type=range]').forEach(function(i){ i.oninput=function(){ var v=i.value/100, sp=i.parentNode.querySelector('.zsnd-v'); if(sp)sp.textContent=i.value;
        if(i.dataset.master){ if(typeof ZSFX!=='undefined'){ ZSFX.vol=v; if(ZSFX.out&&!ZSFX.muted)ZSFX.out.gain.value=v; try{ localStorage.setItem('zeldara_master',String(v)); }catch(e){} } return; }
        ZAUDIO.setVol(i.dataset.k,v); }; });
    o.querySelectorAll('input[type=checkbox]').forEach(function(c){ c.onchange=function(){
        if(c.dataset.all){ if(typeof ZSFX!=='undefined')ZSFX.setMuted(!c.checked); ZPAUSE.sound(); return; }
        var k=c.dataset.on; if(c.checked){ ZAUDIO.setVol(k,ZPAUSE._prev[k]||0.7); } else { ZPAUSE._prev[k]=ZAUDIO.vol[k]||0.7; try{ localStorage.setItem('zeldara_vprev',JSON.stringify(ZPAUSE._prev)); }catch(e){} ZAUDIO.setVol(k,0); }
        ZPAUSE.sound(); }; });
    o.style.display='flex'; },
  // ── full screen (phones: the browser bar goes away; an iPhone has no full screen for pages — Add to Home Screen instead) ──
  fullscreen:function(){ var d=document, el=d.documentElement, on=d.fullscreenElement||d.webkitFullscreenElement;
    try{ if(on){ (d.exitFullscreen||d.webkitExitFullscreen).call(d); return; } var f=el.requestFullscreen||el.webkitRequestFullscreen; if(f){ var p=f.call(el,{navigationUI:'hide'}); if(p&&p.catch)p.catch(function(){ ZPAUSE.fsTip(); }); return; } }catch(e){}
    ZPAUSE.fsTip(); },
  fsTip:function(){ if(typeof showNotif==='function')showNotif('⛶ This browser can\'t go full screen here. On an iPhone or iPad: Share → "Add to Home Screen", then open the game from that icon — it fills the screen.','#9fe8ff'); },
  touch:function(){ return !!document.getElementById('ztouch')||(window.matchMedia&&matchMedia('(pointer:coarse)').matches)||/[?&]touch=1/.test(location.search); },
  // ── the HUD: desktop icons open their tabs; a phone gets one ☰ ──
  wire:function(){ var bar=document.getElementById('action-bar'); if(bar){ var B=bar.querySelectorAll('button');
      B.forEach(function(b){ var oc=b.getAttribute('onclick')||'', m=/toggleModal\('(\w+)'\)/.exec(oc), id=m?m[1]:/openSandbox/.test(oc)?'dev':null;
        if(id==='quests'){ b.style.display='none'; return; }      // map and quests are one now
        if(id==='controls'||id==='dev'||id==='map'||id==='inventory'||id==='tome'){ var tid=id; b.removeAttribute('onclick'); b.onclick=function(e){ e.stopPropagation(); if(ZPAUSE.cur()===tid)ZPAUSE.resume(); else ZPAUSE.go(tid); }; } });
      var mb=document.getElementById('mute-btn'); if(mb){ mb.removeAttribute('onclick'); mb.title='Sound (right-click: all sound on/off)'; mb.onclick=function(e){ e.stopPropagation(); if(ZPAUSE.cur()==='sound')ZPAUSE.resume(); else ZPAUSE.go('sound'); }; mb.oncontextmenu=function(e){ e.preventDefault(); e.stopImmediatePropagation(); ZSFX.toggleMute(); }; }
      var mh=document.getElementById('mmh-full'); if(mh){ mh.removeAttribute('onclick'); mh.onclick=function(e){ e.stopPropagation(); ZPAUSE.go('map'); }; } }
    var mn=document.getElementById('zpz-menu'); if(!mn){ mn=document.createElement('div'); mn.id='zpz-menu'; mn.innerHTML='<button class="zpz-m" title="Menu (Esc)">☰</button><button class="zpz-mfs" title="Full screen">⛶</button>'; document.body.appendChild(mn);
      mn.querySelector('.zpz-m').onclick=function(e){ e.stopPropagation(); ZPAUSE.cur()?ZPAUSE.resume():ZPAUSE.open(); }; mn.querySelector('.zpz-mfs').onclick=function(e){ e.stopPropagation(); ZPAUSE.fullscreen(); }; }
    document.body.classList.toggle('zpz-touch',ZPAUSE.touch()); },
  css:function(){ if(document.getElementById('zpz-css'))return; var st=document.createElement('style'); st.id='zpz-css'; st.textContent=
    '#zpause{position:fixed;left:0;right:0;top:0;z-index:10050;display:none;align-items:center;gap:8px;padding:6px 10px;background:linear-gradient(180deg,rgba(6,10,18,.97),rgba(10,16,28,.92));border-bottom:1px solid rgba(111,227,245,.35);box-shadow:0 0 22px rgba(111,227,245,.18)}'+
    '#zpause .zpz-tabs{display:flex;gap:4px;flex:1;overflow-x:auto;scrollbar-width:none}#zpause .zpz-tabs::-webkit-scrollbar{display:none}'+
    '#zpause button{font:600 13px "Segoe UI",sans-serif;color:#cfe3f4;background:rgba(30,46,66,.6);border:1px solid rgba(111,227,245,.22);border-radius:8px;padding:6px 10px;cursor:pointer;white-space:nowrap;display:flex;align-items:center;gap:6px}'+
    '#zpause button:hover{border-color:rgba(111,227,245,.6);color:#fff}#zpause .zpz-t.on{background:linear-gradient(180deg,rgba(60,120,140,.75),rgba(30,70,90,.75));border-color:#6fe3f5;color:#fff;box-shadow:0 0 10px rgba(111,227,245,.45)}'+
    '#zpause .zpz-x{border-color:rgba(242,193,78,.5);color:#ffe9b0}#zpause .zpz-fs{display:none}body.zpz-touch #zpause .zpz-fs{display:flex}'+
    'body.zpz-on.game-paused::after{display:none}'+
    'body.zpz-on .overlay{padding-top:54px;box-sizing:border-box}body.zpz-on .overlay>.modal{max-height:calc(100vh - 170px)!important}'+
    '#zpz-menu{position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:320;display:none;gap:6px}body.zpz-touch #zpz-menu{display:flex}body.zpz-on #zpz-menu{display:none!important}'+
    '#zpz-menu button{width:46px;height:46px;border-radius:50%;font-size:22px;color:#e8fbff;background:rgba(10,18,30,.72);border:1px solid rgba(111,227,245,.55);box-shadow:0 0 12px rgba(111,227,245,.3)}#zpz-menu .zpz-mfs{width:38px;height:38px;font-size:17px;margin-top:4px}'+
    'body.zpz-touch #action-bar{display:none!important}'+
    '@media (max-width:760px){#zpause .zpz-t b,#zpause .zpz-x b{display:none}#zpause button{padding:8px 11px;font-size:17px}}'+
    '.zsnd{min-width:min(460px,94vw)}.zsnd-r{display:grid;grid-template-columns:150px 1fr 38px;align-items:center;gap:8px 12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.07)}.zsnd-r input[type=range]{width:100%;accent-color:#6fe3f5}.zsnd-r input[type=checkbox]{accent-color:#6fe3f5;width:16px;height:16px}'+
    '.zsnd-on{display:flex;align-items:center;gap:8px;cursor:pointer}.zsnd-v{text-align:right;color:#9fe8ff;font:600 12px "Segoe UI",sans-serif}.zsnd-h{grid-column:1/-1;color:#8aa0b8;font-size:12px;margin-top:-4px}.zsnd-all b{color:#fff2b0}.zsnd-n{color:#8aa0b8;font-size:12px;margin-top:12px}';
    document.head.appendChild(st); }
};
// Save Game and Main Menu in Controls (they called functions that did not exist)
window.doSaveGame=function(){ if(typeof ZSAVE!=='undefined'&&ZSAVE.manual)ZSAVE.manual(); else if(typeof showNotif==='function')showNotif('Saving is not available here.','#ffb070'); };
window.doReturnToTitle=function(){ if(!confirm('Save and go back to the title screen?'))return; try{ if(typeof ZSAVE!=='undefined'&&ZSAVE.manual)ZSAVE.manual(); }catch(e){} setTimeout(function(){ location.href=location.pathname+location.search.replace(/[?&]start=new/,''); },400); };
(function(){ ZPAUSE.css();
  try{ var mv=parseFloat(localStorage.getItem('zeldara_master')); if(mv>=0&&mv<=1&&typeof ZSFX!=='undefined')ZSFX.vol=mv; var pv=JSON.parse(localStorage.getItem('zeldara_vprev')||'null'); if(pv)ZPAUSE._prev=pv; }catch(e){}
  if(typeof PAUSE_OVERLAYS!=='undefined'&&PAUSE_OVERLAYS.indexOf('modal-sound')<0)PAUSE_OVERLAYS.push('modal-sound');
  // the Esc and Q keys: Esc with nothing open opens the panel; Q opens Map & Quests (the journal is inside it)
  document.addEventListener('keydown',function(e){ if(!ZPAUSE.on||(typeof _isTyping==='function'&&_isTyping()))return; var k=(e.key||'').toLowerCase();
    if(e.key==='Escape'){ if(ZPAUSE.shown('modal-sound')){ e.preventDefault(); e.stopImmediatePropagation(); ZPAUSE.resume(); return; }
      var open=typeof _openOverlays==='function'?_openOverlays().length:0; if(!open&&ZPAUSE.can()&&!((document.getElementById('zdlg')||{}).childElementCount)&&!document.getElementById('zcut')){ var sc=typeof _activePlayScene==='function'?_activePlayScene(false):null; var key=sc&&sc.sys.settings.key;
        if(key==='World'||key==='Dungeon'||key==='Building'||key==='Island'){ e.preventDefault(); e.stopImmediatePropagation(); ZPAUSE.open(); } } return; }
    if(k==='q'&&!e.ctrlKey&&!e.metaKey&&ZPAUSE.can()){ e.preventDefault(); e.stopImmediatePropagation(); if(ZPAUSE.cur()==='map')ZPAUSE.resume(); else ZPAUSE.go('map'); } },true);
  var go=function(){ ZPAUSE.wire(); ZPAUSE.strip(); setInterval(ZPAUSE.sync,220); };
  if(document.readyState==='loading')window.addEventListener('DOMContentLoaded',go); else go();
  window.addEventListener('load',function(){ setTimeout(ZPAUSE.wire,600); });
})();
