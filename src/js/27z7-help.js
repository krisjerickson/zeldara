// ═══════════════════════════════════════════════════════════════════════
// ║ 27z7-help.js — round 142 (Kris: "these notifications down at the bottom right are too much — they are adding lag and very distracting:
// ║ let's completely take them out, and instead there should be a ? button at the top right that you can press if you need help with things
// ║ like this … the ? button [can] have numbers, so you realize there are multiple things to see").
// ║ ZHELP: no card ever pops up at the bottom right any more, and the path box under the little map is gone. Everything they said goes into
// ║ the ? at the top right — a number on it for each new thing — and pressing it opens: What now (your next step, the Saga step, the side
// ║ quest you follow), then the new tips and the earlier ones, each with its buttons (a hint, Got it …).
// ║ What mattered too much to wait for the ? (doc 98): the first fight's guidance is spoken by Oswin in the dialogue box (a short cheer over
// ║ your head mid-fight); a new Saga is announced in the dialogue box; a drill's own counter stays on screen while you drill.
// ║ Switch: ZHELP.on (off = the old cards).
// ═══════════════════════════════════════════════════════════════════════
var ZHELP={ on:true, L:[], MAX:60, open_:false,
  esc:function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); },
  ps:function(){ try{ var ws=game.scene.getScene('World'); return ws&&ws.playerState; }catch(e){ return null; } },
  unread:function(){ return ZHELP.L.filter(function(x){ return !x.read; }).length; },
  add:function(o){ if(!o)return; var key=(o.title||'')+'|'+(o.text||''), old=ZHELP.L.find(function(x){ return x.key===key; });
    if(old){ old.t=Date.now(); old.btns=o.btns||old.btns; if(old.read&&o.btns&&o.btns.length)old.read=false; }
    else { ZHELP.L.unshift({key:key,who:o.who||'',icon:o.icon||'📜',title:o.title||'',text:o.text||'',keys:o.keys||'',btns:o.btns||null,t:Date.now(),read:false}); if(ZHELP.L.length>ZHELP.MAX)ZHELP.L.length=ZHELP.MAX; }
    ZHELP.badge(true); if(ZHELP.open_)ZHELP.render(); },
  btn:function(){ var b=document.getElementById('zhelp-btn'); if(b)return b; b=document.createElement('button'); b.id='zhelp-btn'; b.title='Help and tips (H)'; b.innerHTML='?<i></i>';
    b.onclick=function(e){ e.stopPropagation(); ZHELP.toggle(); }; (document.getElementById('app')||document.body).appendChild(b); return b; },
  badge:function(ping){ if(typeof document==='undefined')return; var b=ZHELP.btn(), n=ZHELP.unread(), i=b.querySelector('i'); i.textContent=n?String(n):''; i.style.display=n?'':'none';
    if(ping&&n){ b.classList.remove('ping'); void b.offsetWidth; b.classList.add('ping'); } },
  // the next step, as the box under the little map used to say it (that box is hidden, still kept up to date by the journal)
  now:function(){ var z=document.getElementById('zpath'); var h=z&&z.innerHTML.trim(); return h?'<div class="zhp-now">'+h+'</div>':'<div class="zhp-now"><i>Nothing pressing — explore, or open the journal (Q).</i></div>'; },
  render:function(){ var p=document.getElementById('zhelp'); if(!p)return; var E=ZHELP.esc, New=ZHELP.L.filter(function(x){ return !x.read; }), Old=ZHELP.L.filter(function(x){ return x.read; });
    var card=function(x,i){ return '<div class="zhp-c'+(x.read?'':' new')+'"><div class="zhp-h"><span>'+E(x.icon)+'</span> <b>'+E(x.who)+'</b>'+(x.title?' <em>'+E(x.title)+'</em>':'')+'</div><div class="zhp-t">'+E(x.text).replace(/\n/g,'<br>')+'</div>'+(x.keys?'<div class="zhp-k">'+E(x.keys)+'</div>':'')+
      (x.btns&&x.btns.length?'<div class="zhp-b">'+x.btns.map(function(b,j){ return '<button data-i="'+ZHELP.L.indexOf(x)+'" data-j="'+j+'">'+E(b.t)+'</button>'; }).join('')+'</div>':'')+'</div>'; };
    p.querySelector('.zhp-body').innerHTML='<h4>What now</h4>'+ZHELP.now()+(New.length?'<h4>New ('+New.length+')</h4>'+New.map(card).join(''):'')+(Old.length?'<h4>Earlier</h4>'+Old.map(card).join(''):'')+(!ZHELP.L.length?'<p class="zhp-none">Tips from Master Oswin and the others land here as you play.</p>':''); },
  toggle:function(){ ZHELP.open_?ZHELP.close():ZHELP.open(); },
  open:function(){ var p=document.getElementById('zhelp'); if(!p){ p=document.createElement('div'); p.id='zhelp'; p.innerHTML='<div class="zhp-top"><b>Help &amp; tips</b><button class="zhp-x" title="Close">✕</button></div><div class="zhp-body"></div>';
      (document.getElementById('app')||document.body).appendChild(p); p.addEventListener('click',function(e){ e.stopPropagation(); if(e.target.closest('.zhp-x')){ ZHELP.close(); return; } var b=e.target.closest('.zhp-b button'); if(!b)return;
        var x=ZHELP.L[+b.dataset.i], f=x&&x.btns&&x.btns[+b.dataset.j]; if(x){ x.btns=null; } try{ if(f&&f.f)f.f(); }catch(err){} ZHELP.render(); }); }
    ZHELP.open_=true; p.style.display='block'; ZHELP.render(); ZHELP.L.forEach(function(x){ x.read=true; }); ZHELP.badge(false); },
  close:function(){ var p=document.getElementById('zhelp'); if(p)p.style.display='none'; ZHELP.open_=false; ZHELP.render(); } };
// every card goes to the ? instead (a drill keeps its own counter on screen while you drill)
if(typeof ZCARD!=='undefined'){ var _zh_cs=ZCARD.show; ZCARD.show=function(o){ o=o||{}; if(!ZHELP.on||/zc-drill/.test(o.cls||''))return _zh_cs.apply(this,arguments); ZHELP.add(o); return null; }; }
// the first fight: Oswin says it in the dialogue box; a mid-fight word floats over your head
if(typeof ZFWIN!=='undefined'){ var _zh_fc=ZFWIN.card; ZFWIN.card=function(t,btn){ if(!ZHELP.on)return _zh_fc.apply(this,arguments);
    try{ var ws=ZFWIN.ws(); if(/^Shake it off/.test(t)&&ws&&ws._floatText&&ws.player){ ws._floatText(ws.player.x,ws.player.y-70,'Oswin: “Watch for the crouch — then roll!”','#ffe9a8'); return; }
      if(typeof ZDLG!=='undefined'&&ZDLG.say){ ZDLG.say('Master Oswin',t,{id:'npc_guild',icon:'⚔'}); return; } }catch(e){} return _zh_fc.apply(this,arguments); }; }
// a new Saga (New Game+) is announced in the dialogue box, not a card
(function(){ var a0=ZHELP.add; ZHELP.add=function(o){ if(o&&o.who==='The Saga Retold'&&typeof ZDLG!=='undefined'&&ZDLG.say){ ZDLG.say(o.who,o.text,{icon:o.icon}); return; } return a0.apply(this,arguments); }; })();
// H opens it too
if(typeof document!=='undefined'){ document.addEventListener('keydown',function(e){ if(!ZHELP.on||e.repeat||e.ctrlKey||e.altKey||e.metaKey)return; var t=e.target&&e.target.tagName; if(t==='INPUT'||t==='TEXTAREA')return;
    if((e.key==='h'||e.key==='H')&&typeof Z2!=='undefined'&&Z2.playing&&Z2.playing()){ ZHELP.toggle(); } else if(e.key==='Escape'&&ZHELP.open_){ ZHELP.close(); e.stopImmediatePropagation(); } },true);
  setInterval(function(){ try{ if(!ZHELP.on)return; var playing=typeof Z2!=='undefined'&&Z2.playing&&Z2.playing(); var b=ZHELP.btn(); b.style.display=playing?'':'none'; if(!playing&&ZHELP.open_)ZHELP.close(); if(ZHELP.open_)ZHELP.render(); }catch(e){} },1000);
  var st=document.createElement('style'); st.textContent=
    '#zpath{display:none!important}'+
    '#zhelp-btn{position:fixed;top:8px;right:10px;z-index:160;width:34px;height:34px;border-radius:50%;border:2px solid rgba(255,226,122,.75);background:radial-gradient(circle at 35% 30%,#2a3a52,#0c1420);color:#ffe9a8;font:800 18px "Cinzel",Georgia,serif;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.6);padding:0}'+
    '#zhelp-btn:hover{border-color:#fff3c0;color:#fff}#zhelp-btn i{position:absolute;top:-6px;right:-7px;min-width:18px;height:18px;padding:0 4px;border-radius:9px;background:#d8402c;color:#fff;font:700 11px/18px "Segoe UI",sans-serif;font-style:normal;box-shadow:0 1px 3px #000}'+
    '#zhelp-btn.ping{animation:zhPing .9s ease-out 2}@keyframes zhPing{50%{transform:scale(1.18);box-shadow:0 0 14px rgba(255,226,122,.8)}}'+
    'body.ztouch-on #zhelp-btn{top:6px;right:auto;left:50%;transform:translateX(150px)}'+
    '#zhelp{display:none;position:fixed;top:50px;right:10px;z-index:170;width:min(380px,92vw);max-height:min(70vh,620px);overflow:auto;background:linear-gradient(180deg,rgba(14,22,32,.97),rgba(10,16,24,.97));border:1px solid rgba(255,226,122,.45);border-radius:12px;color:#e8eef6;font:13px/1.45 "Segoe UI",sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.6)}'+
    '#zhelp .zhp-top{position:sticky;top:0;display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(14,22,32,.98);border-bottom:1px solid rgba(255,226,122,.25);font:600 14px "Cinzel",Georgia,serif;color:#ffe9a8}'+
    '#zhelp .zhp-x{background:none;border:0;color:#9ab0c8;font-size:15px;cursor:pointer}#zhelp .zhp-body{padding:4px 12px 12px}#zhelp h4{margin:10px 0 4px;font:600 11px "Segoe UI";letter-spacing:.08em;text-transform:uppercase;color:#9fb6cc}'+
    '#zhelp .zhp-now{padding:7px 9px;border-radius:8px;background:rgba(255,216,74,.08);border:1px solid rgba(255,216,74,.35);color:#fff3c0}#zhelp .zhp-now b{color:#ffe27a}'+
    '#zhelp .zhp-c{padding:7px 9px;margin:6px 0;border-radius:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}#zhelp .zhp-c.new{border-color:rgba(127,200,255,.55);background:rgba(80,140,220,.1)}'+
    '#zhelp .zhp-h em{font-style:normal;color:#9fd0ff;margin-left:4px}#zhelp .zhp-k{margin-top:3px;font:600 11.5px "Segoe UI";color:#bff8ff}#zhelp .zhp-b{display:flex;gap:6px;margin-top:6px}'+
    '#zhelp .zhp-b button{background:#1e3048;color:#e8eef6;border:1px solid #3a5a7a;border-radius:6px;padding:3px 10px;cursor:pointer;font:12px "Segoe UI"}#zhelp .zhp-none{color:#8aa0b8;font-style:italic}';
  document.head.appendChild(st); }
