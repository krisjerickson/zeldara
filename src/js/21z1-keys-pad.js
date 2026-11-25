// ═══════════════════════════════════════════════════════════════════════
// ║ 21z1-keys-pad.js — round 134: ENGAGEMENT WAVES, the rest of wave 1 (Kris: "lets go onto these waves, proceed with all 3").
// ║  · ZKEYS — the Controls page gets "Your keys": every action can be moved to another key (press the button, then the key). Saved in
// ║    this browser (zeldara_keys). How: a listener that runs before everything else turns the key you press into the key the game
// ║    already knows (a stand-in keydown/keyup, like the touch buttons), so every scene works without change. Arrows always move too.
// ║  · ZPAD — gamepads (Xbox, PlayStation, Switch, Steam Deck), Zelda layout (Kris): X attack · A talk / open · B roll · Y spell ·
// ║    RB skill · RT bow (hold to draw) · LT defend (hold) · LB potion · LS mount · RS familiar · D-pad: ↑ inventory ↓ food ← ammo → Godsbane ·
// ║    View/Back map · Menu/Start pause. Left stick moves. With a menu, a talk box or a pop-up open the pad drives the screen instead: stick
// ║    or D-pad moves between its buttons, A presses, B closes. Every button can be moved on the Controls page. Steam Deck: the back grips
// ║    (L4 R4 L5 R5) reach the game through Steam Input — the Controls page shows the layout we suggest for them; the right trackpad is the mouse.
// ║    While a pad is in use, the lessons show pad buttons instead of keys.
// ║  · ZSTREAM — streamer mode: player names on the title and save screens are blurred; the music is ours, safe to stream.
// ║ Switches: ZKEYS.on, ZPAD.on.
// ═══════════════════════════════════════════════════════════════════════
var ZKEYS={ on:true, map:{},
  // [action, label, the key the game knows: key, code, keyCode]
  A:[['up','Move up','w','KeyW',87],['down','Move down','s','KeyS',83],['left','Move left','a','KeyA',65],['right','Move right','d','KeyD',68],
     ['attack','Attack',' ','Space',32],['talk','Talk / open / enter','Tab','Tab',9],['roll','Roll','Alt','AltLeft',18],['bow','Bow (hold to draw)','Control','ControlLeft',17],
     ['spell','Spell','x','KeyX',88],['skill','Skill','z','KeyZ',90],['defend','Defend (hold)','Shift','ShiftLeft',16],['potion','Potion','p','KeyP',80],['food','Food','o','KeyO',79],
     ['familiar','Familiar','n','KeyN',78],['mount','Mount','m','KeyM',77],['godsbane','Godsbane','v','KeyV',86],['ammo','Change ammo','c','KeyC',67],
     ['map','Map','b','KeyB',66],['quests','Quests','q','KeyQ',81],['inventory','Inventory','i','KeyI',73],['tome','Tome','t','KeyT',84],['pause','Pause / back','Escape','Escape',27]],
  act:function(id){ return ZKEYS.A.find(function(a){ return a[0]===id; }); },
  load:function(){ try{ ZKEYS.map=JSON.parse(localStorage.getItem('zeldara_keys')||'{}')||{}; }catch(e){ ZKEYS.map={}; } },
  save:function(){ try{ localStorage.setItem('zeldara_keys',JSON.stringify(ZKEYS.map)); }catch(e){} },
  codeOf:function(id){ var a=ZKEYS.act(id); return ZKEYS.map[id]||(a&&a[3]); },
  name:function(code){ if(!code)return '—'; var N={Space:'Space',Tab:'Tab',AltLeft:'Alt',AltRight:'Alt Gr',ControlLeft:'Ctrl',ControlRight:'Right Ctrl',ShiftLeft:'Shift',ShiftRight:'Right Shift',Escape:'Esc',Enter:'Enter',Backspace:'Backspace',
      ArrowUp:'↑',ArrowDown:'↓',ArrowLeft:'←',ArrowRight:'→',Slash:'/',Period:'.',Comma:',',Semicolon:';',Quote:"'",BracketLeft:'[',BracketRight:']',Backquote:'`',Minus:'-',Equal:'='};
    return N[code]||code.replace(/^Key/,'').replace(/^Digit/,'').replace(/^Numpad/,'Num '); },
  // a stand-in key the game already knows
  synth:function(a,down,held){ var ev; try{ ev=new KeyboardEvent(down?'keydown':'keyup',{key:a[2],code:a[3],bubbles:true,cancelable:true,altKey:a[0]==='roll'&&down,ctrlKey:a[0]==='bow'&&down,shiftKey:a[0]==='defend'&&down});
      Object.defineProperty(ev,'keyCode',{get:function(){ return a[4]; }}); Object.defineProperty(ev,'which',{get:function(){ return a[4]; }}); ev._zk=1; document.dispatchEvent(ev); }catch(e){} return ev; },
  typing:function(e){ var t=e.target; return !!(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable)); },
  // physical key → the action it now does (only when something was moved)
  route:function(code){ if(!Object.keys(ZKEYS.map).length)return null; for(var id in ZKEYS.map)if(ZKEYS.map[id]===code)return {act:ZKEYS.act(id)};
    var own=ZKEYS.A.find(function(a){ return a[3]===code&&ZKEYS.map[a[0]]&&ZKEYS.map[a[0]]!==code; }); if(own)return {none:1}; return null; },
  listen:null,
  render:function(){ var box=document.getElementById('zkeys-box'); if(!box)return; var pad=ZPAD.id();
    box.innerHTML='<div class="zk-h">⌨ Your keys <small>press a button, then the key you want · Esc keeps it</small><button class="zk-reset">Back to the usual keys</button></div><div class="zk-grid">'+
      ZKEYS.A.map(function(a){ var moved=ZKEYS.map[a[0]]; return '<div class="zk-r"><span>'+a[1]+'</span><button class="zk-b'+(moved?' moved':'')+'" data-a="'+a[0]+'">'+ZKEYS.name(ZKEYS.codeOf(a[0]))+'</button></div>'; }).join('')+'</div>'+
      '<div class="zk-h">🎮 Gamepad <small>'+(pad?'connected: '+ZCARD.esc(pad.slice(0,48)):'press any button on a pad to connect it')+'</small><button class="zp-reset">Back to the Zelda layout</button></div><div class="zk-grid">'+
      ZPAD.B.map(function(b){ var a=ZKEYS.act(ZPAD.bind(b[0])); return '<div class="zk-r"><span>'+ZPAD.glyph(b[0])+' '+b[1]+'</span><button class="zk-b zk-pb'+(ZPAD.map[b[0]]?' moved':'')+'" data-p="'+b[0]+'">'+(a?a[1]:'—')+'</button></div>'; }).join('')+'</div>'+
      '<div class="zk-deck">🕹 <b>Steam Deck</b>: plays as a pad with the layout above. For the back grips we suggest (Steam › Controller settings): <b>L4</b> roll · <b>R4</b> bow · <b>L5</b> potion · <b>R5</b> skill. The right trackpad moves the mouse for the menus; the touch screen works too.</div>'+
      '<div class="zk-h">🎥 Streaming &amp; play log</div><label class="zk-opt"><input type="checkbox" id="zk-stream"'+(ZSTREAM.is()?' checked':'')+'> <b>Streamer mode</b> — player names are hidden on the title and save screens. All music is ours: safe to stream.</label>'+
      (typeof ZPLOG!=='undefined'?ZPLOG.box():'');
    box.querySelector('.zk-reset').onclick=function(){ ZKEYS.map={}; ZKEYS.save(); ZKEYS.render(); };
    box.querySelector('.zp-reset').onclick=function(){ ZPAD.map={}; ZPAD.save(); ZKEYS.render(); };
    box.querySelector('#zk-stream').onchange=function(){ ZSTREAM.set(this.checked); };
    box.querySelectorAll('.zk-b[data-a]').forEach(function(b){ b.onclick=function(e){ e.stopPropagation(); b.textContent='press a key…'; b.classList.add('wait'); ZKEYS.listen=b.dataset.a; }; });
    box.querySelectorAll('.zk-pb').forEach(function(b){ b.onclick=function(e){ e.stopPropagation(); ZPAD.cycle(b.dataset.p); ZKEYS.render(); }; });
    if(typeof ZPLOG!=='undefined')ZPLOG.wire(box); },
  tick:function(){ var m=document.getElementById('modal-controls'); if(!m||m.style.display==='none'){ ZKEYS._shown=0; return; }
    var box=document.getElementById('zkeys-box'); if(!box){ box=document.createElement('div'); box.id='zkeys-box'; var a=document.getElementById('zaim-box'); if(a&&a.parentNode)a.parentNode.insertBefore(box,a.nextSibling); else return; }
    if(!ZKEYS._shown){ ZKEYS._shown=1; ZKEYS.render(); } } };
ZKEYS.load();
if(typeof window!=='undefined'){
  var _zkHeld={};
  var _zkRoute=function(e){ if(!ZKEYS.on||e._zk||e._ztouch||e._zpad)return;
    if(e.type==='keydown'&&ZKEYS.listen){ e.preventDefault(); e.stopImmediatePropagation(); var id=ZKEYS.listen; ZKEYS.listen=null;
      if(e.code!=='Escape'){ var a=ZKEYS.act(id); Object.keys(ZKEYS.map).forEach(function(k){ if(ZKEYS.map[k]===e.code)delete ZKEYS.map[k]; }); if(a&&a[3]===e.code)delete ZKEYS.map[id]; else ZKEYS.map[id]=e.code; ZKEYS.save(); }
      ZKEYS.render(); return; }
    if(ZKEYS.typing(e))return; var r=ZKEYS.route(e.code); if(!r)return;
    e.preventDefault(); e.stopImmediatePropagation(); if(r.none)return;
    if(e.type==='keydown'){ if(e.repeat&&_zkHeld[e.code])return; _zkHeld[e.code]=1; } else delete _zkHeld[e.code];
    ZKEYS.synth(r.act,e.type==='keydown'); };
  window.addEventListener('keydown',_zkRoute,true); window.addEventListener('keyup',_zkRoute,true);
  window.addEventListener('blur',function(){ Object.keys(_zkHeld).forEach(function(c){ var r=ZKEYS.route(c); if(r&&r.act)ZKEYS.synth(r.act,false); }); _zkHeld={}; });
}

// ── gamepads ──
var ZPAD={ on:true, map:{}, held:{}, prev:{}, used:0, lastUse:0, axes:{}, rep:{},
  // standard-mapping button → [label, default action]
  B:[[2,'X','attack'],[0,'A','talk'],[1,'B','roll'],[3,'Y','spell'],[5,'RB','skill'],[7,'RT','bow'],[6,'LT','defend'],[4,'LB','potion'],[10,'LS click','mount'],[11,'RS click','familiar'],
     [12,'D-pad ↑','inventory'],[13,'D-pad ↓','food'],[14,'D-pad ←','ammo'],[15,'D-pad →','godsbane'],[8,'View / Back','map'],[9,'Menu / Start','pause']],
  CYCLE:['attack','talk','roll','spell','skill','bow','defend','potion','food','familiar','mount','godsbane','ammo','map','quests','inventory','tome','pause'],
  load:function(){ try{ ZPAD.map=JSON.parse(localStorage.getItem('zeldara_pad')||'{}')||{}; }catch(e){ ZPAD.map={}; } },
  save:function(){ try{ localStorage.setItem('zeldara_pad',JSON.stringify(ZPAD.map)); }catch(e){} },
  bind:function(i){ if(ZPAD.map[i])return ZPAD.map[i]; var b=ZPAD.B.find(function(x){ return x[0]===+i; }); return b&&b[2]; },
  cycle:function(i){ var cur=ZPAD.bind(i), k=(ZPAD.CYCLE.indexOf(cur)+1)%ZPAD.CYCLE.length, def=(ZPAD.B.find(function(x){ return x[0]===+i; })||[])[2]; if(ZPAD.CYCLE[k]===def)delete ZPAD.map[i]; else ZPAD.map[i]=ZPAD.CYCLE[k]; ZPAD.save(); },
  pads:function(){ try{ return Array.prototype.filter.call(navigator.getGamepads?navigator.getGamepads():[],function(p){ return p&&p.connected; }); }catch(e){ return []; } },
  id:function(){ var p=ZPAD.pads()[0]; return p&&p.id; },
  // the face buttons drawn small: Xbox colours (PlayStation pads show the shapes)
  glyph:function(i){ var ps=/054c|playstation|dualsense|dualshock/i.test(ZPAD.id()||''), b=ZPAD.B.find(function(x){ return x[0]===+i; }), t=b?b[1]:'?';
    var face={0:ps?'✕':'A',1:ps?'○':'B',2:ps?'□':'X',3:ps?'△':'Y'}, col={0:'#4cba4c',1:'#e04848',2:'#3c8ce8',3:'#e8c03c'};
    if(face[i]!==undefined)return '<i class="zpg" style="background:'+col[i]+'">'+face[i]+'</i>'; return '<i class="zpg zpg-w">'+t.replace(/ click/,'')+'</i>'; },
  // a key written in a lesson → the pad button that does it
  KEYTXT:{'Space':'attack','Tab':'talk','Alt':'roll','Ctrl':'bow','X':'spell','Z':'skill','Shift':'defend','P':'potion','O':'food','N':'familiar','M':'mount','V':'godsbane','C':'ammo','B':'map','Q':'quests','I':'inventory','T':'tome','Esc':'pause','WASD':'move'},
  padFor:function(act){ if(act==='move')return 'Left stick'; for(var j=0;j<ZPAD.B.length;j++){ var i=ZPAD.B[j][0]; if(ZPAD.bind(i)===act)return ZPAD.B[j][1]; } return null; },
  words:function(s){ if(!ZPAD.active())return s; return String(s).replace(/\b(Space|Tab|Alt|Ctrl|Shift|Esc|WASD|[XZPONMVCBQIT])\b/g,function(m){ var a=ZPAD.KEYTXT[m], p=a&&ZPAD.padFor(a); return p||m; }); },
  active:function(){ return ZPAD.used&&Date.now()-ZPAD.lastUse<120000; },
  key:function(act,down){ var a=ZKEYS.act(act); if(!a)return; if(down&&ZPAD.held[act])return; if(!down&&!ZPAD.held[act])return; ZPAD.held[act]=down?1:0; var ev=ZKEYS.synth(a,down); },
  tap:function(act){ ZPAD.key(act,true); setTimeout(function(){ ZPAD.key(act,false); },80); },
  // is a screen of buttons in front of the game?
  menu:function(){ try{ if(typeof _openOverlays==='function'&&_openOverlays().length)return true; if(typeof ZDLG!=='undefined'&&ZDLG.open)return true;
      if(document.querySelector('#modal-death[style*="flex"],.zmage-scene,.zrecap,.zhearth,.zfest-ui,.zphoto-bar,#zprofiles[style*="flex"],.zp-wrap')||(typeof FairyTalk!=='undefined'&&FairyTalk.el&&FairyTalk.el.style.display!=='none'&&FairyTalk.el.offsetParent))return true;
      if(game&&game.scene&&game.scene.isActive('Title'))return true; }catch(e){} return false; },
  // the buttons you can see and reach right now
  targets:function(){ var L=[]; document.querySelectorAll('button,a[href],input,select,[data-k],[data-tcat],[data-tid],.zt-m,.zp-pl,.zp-btn').forEach(function(el){ if(el.disabled||!el.offsetParent)return; var r=el.getBoundingClientRect(); if(r.width<4||r.height<4||r.bottom<0||r.top>innerHeight)return;
      var h=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2); if(!h||!(h===el||el.contains(h)||h.contains(el)))return; if(el.closest('#ztouch'))return; L.push({el:el,x:r.left+r.width/2,y:r.top+r.height/2}); }); return L; },
  focus:null,
  move:function(dx,dy){ var T=ZPAD.targets(); if(!T.length)return; var cur=ZPAD.focus&&T.find(function(t){ return t.el===ZPAD.focus; });
    if(!cur){ ZPAD.setFocus(T[0].el); return; } var best=null, bs=1e9;
    T.forEach(function(t){ if(t===cur)return; var vx=t.x-cur.x, vy=t.y-cur.y, along=vx*dx+vy*dy; if(along<=4)return; var across=Math.abs(vx*dy-vy*dx), s=along+across*2.2; if(s<bs){ bs=s; best=t; } });
    if(best)ZPAD.setFocus(best.el); },
  setFocus:function(el){ if(ZPAD.focus)ZPAD.focus.classList.remove('zpad-f'); ZPAD.focus=el; if(el){ el.classList.add('zpad-f'); try{ el.focus({preventScroll:false}); }catch(e){} try{ el.scrollIntoView({block:'nearest'}); }catch(e){} } },
  press:function(){ var f=ZPAD.focus; if(f&&f.isConnected&&f.offsetParent){ if(f.tagName==='INPUT'&&(f.type==='checkbox'||f.type==='radio')){ f.click(); return; } f.click(); return; }
    // nothing chosen: the talk box turns its page; anywhere else the first button is chosen (the title page takes Enter)
    if(typeof ZDLG!=='undefined'&&ZDLG.open){ ZPAD.tap('talk'); return; }
    var T=ZPAD.targets(); if(T.length){ ZPAD.setFocus(T[0].el); return; }
    ZKEYS.synth(['enter','Enter','Enter','Enter',13],true); setTimeout(function(){ ZKEYS.synth(['enter','Enter','Enter','Enter',13],false); },60); },
  poll:function(){ if(!ZPAD.on)return; var P=ZPAD.pads(); if(!P.length){ if(ZPAD._had){ ZPAD._had=0; Object.keys(ZPAD.held).forEach(function(a){ ZPAD.key(a,false); }); } return; } ZPAD._had=1;
    var p=P[0], B=p.buttons||[], now=Date.now(), down=function(i){ var b=B[i]; return !!(b&&(b.pressed||b.value>0.5)); }, menu=ZPAD.menu();
    var any=false; for(var i=0;i<B.length;i++){ var d=down(i); if(d)any=true; var was=!!ZPAD.prev[i]; ZPAD.prev[i]=d; if(d===was)continue; ZPAD.used=1; ZPAD.lastUse=now;
      var act=ZPAD.bind(i);
      if(menu){ if(!d)continue; if(i===0){ ZPAD.press(); continue; } if(i===1||i===9){ ZKEYS.synth(ZKEYS.act('pause'),true); ZKEYS.synth(ZKEYS.act('pause'),false); ZPAD.setFocus(null); continue; }
        if(i>=12&&i<=15){ ZPAD.move([0,0,-1,1][i-12],[-1,1,0,0][i-12]); ZPAD.rep['d'+i]=now+380; continue; }
        if(i===4||i===5){ var tabs=document.querySelectorAll('.zpz-t'), on=-1; tabs.forEach(function(t,k){ if(t.classList.contains('on'))on=k; }); var nx=tabs[(on+(i===5?1:-1)+tabs.length)%tabs.length]; if(nx)nx.click(); continue; }
        continue; }
      if(!act)continue; var hold={bow:1,defend:1,attack:1};
      if(d){ if(hold[act]||act==='talk')ZPAD.key(act,true); else ZPAD.tap(act); } else if(ZPAD.held[act])ZPAD.key(act,false); }
    // held D-pad in a menu repeats
    if(menu)[12,13,14,15].forEach(function(i){ if(down(i)&&ZPAD.rep['d'+i]&&now>ZPAD.rep['d'+i]){ ZPAD.rep['d'+i]=now+140; ZPAD.move([0,0,-1,1][i-12],[-1,1,0,0][i-12]); } });
    // the left stick: walking, or moving between buttons
    var ax=p.axes[0]||0, ay=p.axes[1]||0, mag=Math.hypot(ax,ay), want={};
    if(mag>0.35){ ZPAD.used=1; ZPAD.lastUse=now; }
    if(menu){ ['up','down','left','right'].forEach(function(k){ if(ZPAD.held[k])ZPAD.key(k,false); });
      if(mag>0.55){ if(!ZPAD.axes.t||now>ZPAD.axes.t){ ZPAD.axes.t=now+(ZPAD.axes.on?150:0)+(ZPAD.axes.on?0:0); ZPAD.axes.on=1; if(Math.abs(ax)>Math.abs(ay))ZPAD.move(ax>0?1:-1,0); else ZPAD.move(0,ay>0?1:-1); if(!ZPAD.axes.first){ ZPAD.axes.first=1; ZPAD.axes.t=now+380; } } }
      else { ZPAD.axes={}; }
      return; }
    if(ZPAD.focus){ ZPAD.setFocus(null); }
    if(mag>0.35){ var a=Math.atan2(ay,ax), s=Math.PI/8; if(a>-3*s&&a<3*s)want.right=1; if(a>5*s||a<-5*s)want.left=1; if(a>s&&a<7*s)want.down=1; if(a<-s&&a>-7*s)want.up=1; }
    ['up','down','left','right'].forEach(function(k){ if(want[k]&&!ZPAD.held[k])ZPAD.key(k,true); else if(!want[k]&&ZPAD.held[k])ZPAD.key(k,false); }); } };
ZPAD.load();
if(typeof window!=='undefined'){ (function loop(){ try{ ZPAD.poll(); }catch(e){} (window.requestAnimationFrame||function(f){ setTimeout(f,16); })(loop); })();
  window.addEventListener('gamepadconnected',function(e){ ZPAD.used=1; ZPAD.lastUse=Date.now(); if(typeof showNotif==='function')try{ showNotif('🎮 Gamepad ready — X attack · A talk · B roll (Controls to change)','#9fd0ff'); }catch(x){} ZKEYS._shown=0; });
  window.addEventListener('gamepaddisconnected',function(){ Object.keys(ZPAD.held).forEach(function(a){ ZPAD.key(a,false); }); ZKEYS._shown=0; });
  // the lessons show pad buttons while a pad is in use
  if(typeof ZCARD!=='undefined'){ var _zcs=ZCARD.show; ZCARD.show=function(o){ if(o&&o.keys&&ZPAD.active())o.keys=ZPAD.words(o.keys); return _zcs.apply(ZCARD,arguments); }; } }

// ── streamer mode ──
var ZSTREAM={ is:function(){ try{ return localStorage.getItem('zeldara_stream')==='1'; }catch(e){ return false; } },
  set:function(v){ try{ localStorage.setItem('zeldara_stream',v?'1':'0'); }catch(e){} ZSTREAM.apply(); },
  apply:function(){ if(typeof document!=='undefined'&&document.body)document.body.classList.toggle('zstream',ZSTREAM.is()); } };
if(typeof setInterval!=='undefined')setInterval(function(){ try{ ZKEYS.tick(); if(document.body&&document.body.classList.contains('zstream')!==ZSTREAM.is())ZSTREAM.apply(); }catch(e){} },400);
(function(){ if(typeof document==='undefined')return; var st=document.createElement('style'); st.textContent=
  '#zkeys-box{margin:4px 0 12px}.zk-h{display:flex;align-items:center;gap:8px;margin:10px 0 6px;font:600 13px "Segoe UI";color:#ffe27a}.zk-h small{font-weight:400;color:#8aa0b8;flex:1}.zk-h button{padding:2px 8px;border-radius:6px;border:1px solid #445;background:#1a2230;color:#c8d4e4;font-size:11px;cursor:pointer}'+
  '.zk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:3px 12px}.zk-r{display:flex;align-items:center;justify-content:space-between;gap:6px;font:12.5px "Segoe UI";color:#c8d4e4}'+
  '.zk-b{min-width:74px;padding:2px 8px;border-radius:6px;border:1px solid rgba(255,226,122,.4);background:#141c28;color:#ffe9a8;font:600 12px "Segoe UI";cursor:pointer}.zk-b.moved{border-color:#7fd0ff;color:#bff8ff}.zk-b.wait{background:#5a4a14;color:#fff;animation:zkW .8s infinite alternate}@keyframes zkW{to{background:#2a2010}}'+
  '.zpg{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 3px;border-radius:9px;color:#fff;font:700 11px "Segoe UI";font-style:normal;box-shadow:inset 0 -2px 0 rgba(0,0,0,.3)}.zpg-w{background:#3a4456;border-radius:5px}'+
  '.zk-deck{margin:8px 0;padding:6px 10px;border-radius:8px;background:#121a26;border:1px solid #2a3a50;font:12px/1.5 "Segoe UI";color:#b8c8dc}.zk-opt{display:block;font:12.5px/1.5 "Segoe UI";color:#c8d4e4;margin:4px 0}'+
  '.zpad-f{outline:3px solid #ffd76a!important;outline-offset:2px;box-shadow:0 0 14px rgba(255,215,106,.7)!important}'+
  'body.zstream .zp-pl b,body.zstream .zp-box h2,body.zstream .zp-box .zp-nm input,body.zstream #zp-name{filter:blur(6px)}';
  document.head.appendChild(st); })();
