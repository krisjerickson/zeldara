// ═══════════════════════════════════════════════════════════════════════
// ║ 21y-wave1.js — round 130: "PLAYING AND COMING BACK", WAVE 1 (Kris's picks, docs 83 and 88; "let's progress with building").
// ║  · safe_saves   ZSAFE: a quiet safety save every minute and whenever the tab is hidden or closed, in its own slot next to the real one
// ║                 (key + '_safety'). Continue loads whichever of the two is newer. The saga-book saves stay as they were.
// ║  · lessons_soft ZLESOFT: most lessons are a small card under the little map while you keep playing; only five big ones still pause
// ║                 (moving, the pause panel, sites and their boss, the forges, Godsbane).
// ║  · stuck_help   ZSTUCK: ten minutes of play without the Saga moving → Oswin offers a hint, once per stall, and you can say no. Three steps:
// ║                 what to do → where (direction and paces) → the gold arrow on the little map.
// ║  · site_time    ZSITET: the map tip and the site door show a site's usual length (≈ 8 min …) and, once you have cleared it, your time.
// ║  · next_hook    ZHOOK: when you wake from your bed, one line of what is waiting (the next step of your road).
// ║  · fair_pledge  ZPLEDGE: "Our promise" on the title screen: no loot boxes, no energy timers, nothing for sale that wins, no punishment for
// ║                 a missed day.
// ║  · play_now     the new-game form is one step: your name, your hero, the difficulty, Begin Quest (the first free slot is used).
// ║ Still to come in wave 1: the Controls page with remapping, the opt-in play log, the fast first load.
// ═══════════════════════════════════════════════════════════════════════
var ZSAFE={ on:true, EVERY:60000, last:0,
  key:function(){ return typeof ZSave!=='undefined'?ZSave.key()+'_safety':null; },
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  ok:function(){ try{ return typeof ZLEAVE!=='undefined'?ZLEAVE.playing():false; }catch(e){ return false; } },
  write:function(){ if(!ZSAFE.on||!ZSAFE.ok())return false; var ws=ZSAFE.ws(); if(!ws||!ws._save||!ws.player||!ws.playerState)return false; var k=ZSAFE.key(), w0=ZSave.write, ok=false;
    ZSave.write=function(json){ ok=ZSave.store.set(k,json); return ok; }; try{ ws._save(); }catch(e){} finally{ ZSave.write=w0; } if(ok)ZSAFE.last=Date.now(); return ok; },
  at:function(raw){ var m=/"_savedAt":(\d+)/.exec(raw||''); return m?+m[1]:0; } };
(function(){ if(typeof ZSave==='undefined')return;
  var r0=ZSave.read; ZSave.read=function(){ var m=r0.apply(ZSave,arguments); if(!ZSAFE.on)return m; var s=ZSave.store.get(ZSave.key()+'_safety'); if(!s)return m; if(!m)return s; return ZSAFE.at(s)>=ZSAFE.at(m)?s:m; };      /* a real save drops the safety copy, so one still here was written after it */
  var rm=ZSave.store.remove; ZSave.store.remove=function(k){ rm.call(ZSave.store,k); if(/^zeldara_save_/.test(k)&&!/_safety$/.test(k))rm.call(ZSave.store,k+'_safety'); };
  var cc=ZSave.clearCurrent; ZSave.clearCurrent=function(){ cc.apply(ZSave,arguments); ZSave.store.remove(ZSave.key()+'_safety'); };
  /* a real save is the newest: the safety copy behind it is dropped */
  var w0=ZSave.write; ZSave.write=function(json){ var r=w0.apply(ZSave,arguments); if(r!==false&&ZSAFE.on){ try{ localStorage.removeItem(ZSave.key()+'_safety'); }catch(e){} } return r; };
  if(typeof setInterval!=='undefined')setInterval(function(){ if(Date.now()-ZSAFE.last>=ZSAFE.EVERY)ZSAFE.write(); },5000);
  if(typeof document!=='undefined'){ document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='hidden')ZSAFE.write(); }); window.addEventListener('pagehide',function(){ ZSAFE.write(); }); }
})();

// ── a small card under the little map (lessons, hints, the morning's line) ──
var ZCARD={ cur:null,
  show:function(o){ if(typeof document==='undefined')return null; ZCARD.close(); var d=document.createElement('div'); d.className='zcard'+(o.cls?' '+o.cls:'');
    d.innerHTML='<div class="zc-h">'+(o.icon||'📜')+' <b>'+ZCARD.esc(o.who||'')+'</b>'+(o.title?'<span>'+ZCARD.esc(o.title)+'</span>':'')+'<button class="zc-x" title="Close">✕</button></div><div class="zc-t">'+ZCARD.esc(o.text||'')+'</div>'+(o.keys?'<div class="zc-k">'+ZCARD.esc(o.keys)+'</div>':'')+
      (o.btns&&o.btns.length?'<div class="zc-b">'+o.btns.map(function(b,i){ return '<button data-i="'+i+'">'+ZCARD.esc(b.t)+'</button>'; }).join('')+'</div>':'');
    var mm=document.getElementById('minimap-hud'), r=mm&&mm.style.display!=='none'?mm.getBoundingClientRect():null; d.style.top=Math.round(r&&r.height?r.bottom+8:70)+'px';
    (document.getElementById('app')||document.body).appendChild(d); ZCARD.cur=d;
    d.querySelector('.zc-x').onclick=function(){ ZCARD.close(); };
    d.querySelectorAll('.zc-b button').forEach(function(b){ b.onclick=function(){ var B=o.btns[+b.dataset.i]; ZCARD.close(); try{ if(B.f)B.f(); }catch(e){} }; });
    var ms=o.ms||Math.min(26000,9000+String(o.text||'').length*45); d._t=setTimeout(function(){ if(ZCARD.cur===d)ZCARD.close(); },ms); return d; },
  close:function(){ var d=ZCARD.cur; ZCARD.cur=null; if(d){ clearTimeout(d._t); d.classList.add('out'); setTimeout(function(){ d.remove(); },350); } },
  esc:function(s){ return String(s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); } };

// ── lessons that don't stop you ──
var ZLESOFT={ on:true, BIG:{move:1,map:1,sites:1,forges:1,godsbane:1} };
(function(){ if(typeof ZLES==='undefined')return; var t0=ZLES.teach;
  ZLES.teach=function(id,quiet){ if(!ZLESOFT.on||ZLESOFT.BIG[id]||typeof ZDLG==='undefined')return t0.apply(ZLES,arguments); var L=ZLES.byId(id), say=ZDLG.say;
    ZDLG.say=function(who,text,o){ var ps=ZLES.ps(); ZCARD.show({who:who,icon:(o&&o.icon)||'📜',title:L?L[1]:'',text:text,keys:L&&L[2]&&L[2]!=='—'?L[2]:'',cls:'zc-les',
      btns:[{t:'Got it'},{t:'Don\'t show lessons',f:function(){ if(ps)ps.lessonsOff=1; if(typeof showNotif==='function')showNotif('📚 Lessons off — turn them back on in the pause panel (Training)','#9fd0ff'); }}]}); return true; };
    try{ return t0.apply(ZLES,arguments); } finally{ ZDLG.say=say; } };
})();

// ── a hint when you're stuck ──
var ZSTUCK={ on:true, AFTER:600,
  tick:function(){ if(!ZSTUCK.on||typeof ZOSW==='undefined')return; var ws=ZOSW.ws(), ps=ws&&ws.playerState; if(!ps||!ws.player||!ws.sys||!ws.sys.isActive())return;
    if((ps.pathT||0)<ZSTUCK.AFTER||ZCARD.cur||(typeof isGamePaused==='function'&&isGamePaused()))return; var id=ps._pathId||'-', A=ps.hintAsked||(ps.hintAsked={}); if(A[id])return; A[id]=1;
    var tg=typeof ZJOUR!=='undefined'?ZJOUR.target(ws):null; if(!tg)return;
    ZCARD.show({who:'Master Oswin',icon:'🧭',title:'Lost?',text:'You have been wandering a while. Shall I point the way?',ms:30000,cls:'zc-hint',btns:[{t:'Yes, a hint',f:function(){ ZSTUCK.hint(ws,1); }},{t:'No thanks'}]}); },
  hint:function(ws,lv){ var tg=typeof ZJOUR!=='undefined'?ZJOUR.target(ws):null; if(!tg)return; var txt;
    if(lv===1)txt='Your road: '+tg.t+'.';
    else if(lv===2)txt=tg.t+' — about '+Math.round(Math.hypot(tg.x-ws.player.x,tg.y-ws.player.y)/(typeof TILE!=='undefined'?TILE:32))+' paces to the '+ZOSW.dir(ws,tg.x,tg.y)+'.';
    else { txt='Follow the gold arrow on your little map — it points straight there.'; try{ if(typeof ZJOUR!=='undefined'&&ZJOUR.track)ZJOUR.track(tg.id||null); }catch(e){} }
    ZCARD.show({who:'Master Oswin',icon:'🧭',text:txt,cls:'zc-hint',btns:lv<3?[{t:'Another hint',f:function(){ ZSTUCK.hint(ws,lv+1); }},{t:'Thanks'}]:[{t:'Thanks'}]}); } };

// ── how long is a site? ──
var ZSITET={ on:true,
  est:function(s){ if(!s)return 0; if(typeof VOLC_NAMES!=='undefined'&&VOLC_NAMES[s.id])return 20; if(s.mage)return 12; if(s.type==='harbor')return s.castle?15:10; if(s.type==='trial')return 5; if(s.boss)return 15; if(s.type==='tower'||s.type==='dungeon'||s.type==='cave')return 8; return 0; },
  tag:function(s,ps){ if(!ZSITET.on||!s)return ''; var e=ZSITET.est(s); if(!e)return ''; var mine=ps&&ps.siteTimes&&ps.siteTimes[s.id]; return ' · ⏱ ≈ '+e+' min'+(mine?' (yours: '+Math.max(1,Math.round(mine/60))+' min)':''); },
  run:null,
  tick:function(){ try{ if(!ZSITET.on||typeof game==='undefined'||!game.scene)return; var D=game.scene.getScene('Dungeon'), ws=game.scene.getScene('World'), ps=ws&&ws.playerState; if(!ps)return; var act=D&&game.scene.isActive('Dungeon')&&D.site;
      if(act){ var id=D.siteId||D.site.id; if(!ZSITET.run||ZSITET.run.id!==id)ZSITET.run={id:id,t:0}; if(!(typeof isGamePaused==='function'&&isGamePaused()))ZSITET.run.t++; return; }
      var R=ZSITET.run; if(!R)return; ZSITET.run=null; if((ps.lockedSites||[]).indexOf(R.id)>=0&&R.t>20){ var T=ps.siteTimes||(ps.siteTimes={}); if(!T[R.id]||R.t<T[R.id])T[R.id]=R.t; } }catch(e){} } };

// ── something left unfinished: the line when you wake ──
var ZHOOK={ on:true, slept:null,
  tick:function(){ if(!ZHOOK.on)return; var ws=ZSAFE.ws(), ps=ws&&ws.playerState; if(!ps)return; var n=ps.slept||0; if(ZHOOK.slept===null){ ZHOOK.slept=n; return; } if(n<=ZHOOK.slept)return; ZHOOK.slept=n;
    var tg=typeof ZJOUR!=='undefined'?ZJOUR.target(ws):null, line=tg?tg.t:null; if(!line)return;
    setTimeout(function(){ ZCARD.show({who:'While you slept',icon:'🌅',text:'Word in the village this morning — '+line+'.',cls:'zc-hook'}); },1500); } };
if(typeof setInterval!=='undefined')setInterval(function(){ try{ ZSTUCK.tick(); ZSITET.tick(); ZHOOK.tick(); }catch(e){} },1000);

// ── our promise ──
var ZPLEDGE={ T:['No loot boxes, ever.','No energy timers or waiting to play.','Nothing for sale that wins the game.','No punishment for a missed day — the world waits for you.','Your saves are yours: in your browser, and you can export them.'],
  open:function(){ if(typeof ZProfilesUI==='undefined')return; ZProfilesUI.open('<h2>🤝 Our promise</h2><p>The Quests of Zola and Zoldor is made to be played, not milked:</p><ul class="zpl">'+ZPLEDGE.T.map(function(t){ return '<li>'+t+'</li>'; }).join('')+'</ul><div class="zp-row"><button class="zp-btn zp-go" id="zpl-ok">Back</button></div>');
    document.getElementById('zpl-ok').onclick=ZProfilesUI.close; },
  tick:function(){ var b=document.getElementById('zpledge-btn'), on=false; try{ on=game.scene.isActive('Title'); }catch(e){}
    if(on&&!b){ b=document.createElement('button'); b.id='zpledge-btn'; b.textContent='🤝 Our promise'; b.onclick=ZPLEDGE.open; (document.getElementById('app')||document.body).appendChild(b); }
    if(b)b.style.display=on?'':'none'; } };
if(typeof setInterval!=='undefined')setInterval(function(){ try{ ZPLEDGE.tick(); }catch(e){} },700);

// ── play now: the new-game form in one step ──
(function(){ if(typeof ZProfilesUI==='undefined')return;
  ZProfilesUI.newGame=function(start,err,val){ var firstFree=function(p){ for(var s=1;s<=ZSave.SLOTS;s++)if(!ZSave.info(p.id,s))return s; return 0; };
    ZProfilesUI.pickHero({name:''},function(h){ var inp=document.getElementById('zp-name'), v=inp?inp.value:'', p=ZSave.byName(v);
      if(!String(v).trim()){ var n=ZSave.load().players.length+1; while(ZSave.byName('Adventurer '+n))n++; v='Adventurer '+n; }
      if(!p){ var r=ZSave.addPlayer(v); if(r.err){ ZProfilesUI.newGame(start,r.err,v); return; } p=r.player; }
      var s=firstFree(p); ZSave.pendingHero=h; if(!s){ ZProfilesUI.slots(p,start,true,'All three of '+p.name+'\'s slots are full — choose one to replace.'); return; }
      ZSave.choose(p.id,s); ZSave.clearCurrent(); ZProfilesUI.close(); start(true); },ZProfilesUI.close);
    var box=ZProfilesUI.el&&ZProfilesUI.el.querySelector('.zp-box'); if(!box)return; var h2=box.querySelector('h2'), p1=box.querySelector('p');
    if(h2)h2.textContent='New player'; if(p1)p1.outerHTML='<div class="zp-nm"><label>Your name <input id="zp-name" maxlength="16" placeholder="(optional)" value="'+ZProfilesUI.esc(val||'')+'"></label>'+(err?'<p class="zp-err">'+ZProfilesUI.esc(err)+'</p>':'')+'</div><p>Who will you play — Zola or Zoldor?</p>';
    var hb=document.getElementById('zp-hback'); if(hb)hb.textContent='Cancel';
    var inp=document.getElementById('zp-name'); if(inp){ inp.onkeydown=function(e){ e.stopPropagation(); if(e.key==='Escape')ZProfilesUI.close(); }; setTimeout(function(){ inp.focus(); },30); } };
})();
(function(){ if(typeof document==='undefined')return; var st=document.createElement('style'); st.textContent=
  '.zcard{position:absolute;right:10px;width:300px;z-index:110;background:linear-gradient(180deg,rgba(14,22,30,.95),rgba(10,16,24,.92));border:1px solid rgba(255,226,122,.45);border-radius:10px;padding:8px 10px;color:#e8eef6;font:12.5px/1.45 "Segoe UI",sans-serif;box-shadow:0 4px 18px rgba(0,0,0,.45);animation:zcIn .35s ease-out;transition:opacity .35s,transform .35s}'+
  '.zcard.out{opacity:0;transform:translateX(20px)}@keyframes zcIn{from{opacity:0;transform:translateX(30px)}}.zc-h{display:flex;align-items:center;gap:6px;margin-bottom:3px}.zc-h b{color:#ffe27a}.zc-h span{color:#9ab0c8;font-size:11.5px;flex:1}.zc-x{margin-left:auto;background:none;border:0;color:#9ab0c8;cursor:pointer;font-size:13px}'+
  '.zc-k{margin-top:4px;font:600 11.5px "Segoe UI";color:#bff8ff}.zc-b{display:flex;gap:6px;margin-top:6px}.zc-b button{padding:3px 9px;border-radius:6px;border:1px solid rgba(255,226,122,.5);background:rgba(80,64,20,.45);color:#ffe9a8;cursor:pointer;font:12px "Segoe UI"}.zc-b button+button{border-color:rgba(160,180,200,.4);background:transparent;color:#c8d4e4}'+
  '.zcard.zc-hint{border-color:rgba(127,200,255,.55)}.zcard.zc-hook{border-color:rgba(255,190,120,.5)}body.ztouch-on .zcard{transform:scale(.85);transform-origin:top right}'+
  '#zpledge-btn{position:absolute;right:14px;bottom:14px;z-index:60;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,226,122,.45);background:rgba(10,16,24,.75);color:#ffe9a8;font:600 13px "Segoe UI";cursor:pointer}.zpl{text-align:left;line-height:1.7}'+
  '.zp-nm{margin:6px 0 10px}.zp-nm label{display:flex;align-items:center;gap:8px;justify-content:center;font-weight:600}.zp-nm input{width:180px}';
  document.head.appendChild(st); })();
