// ═══════════════════════════════════════════════════════════════════════
// ║ 79n2-lab-intro.js — round 97: THE NEW INTRO, AS THE GAME PLAYS IT (Kris: "i also want our new intro video to go into the lab in cut-scene
// ║ videos for me to review").
// ║ The O17 video (The Locked Shot List), slowed to 40 s, played exactly as the game does (16w2 ZSC): the first line alone on a black screen;
// ║ then each part of the video cut where the video cuts, the words building in fragments under it, each part slowed until its line can be
// ║ read (rate ≥ 0.6, then it holds); the opening's music under it. In the game frames 7–12 (the twins) follow as paintings.
// ║ Picks: 'cutvid-intro_lock' (☆ = keep it as the intro), with notes.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined')return;
  var T=LAB_TABS.find(function(t){ return t.id==='cutvid'; }); if(!T)return;
  var SC=typeof ZSB!=='undefined'&&ZSB.SCENES?ZSB.SCENES.find(function(s){ return s.id==='opening'; }):null;
  var CAPS=SC?SC.beats.slice(0,6).map(function(b){ return String(b.cap||'').replace(/\{H\}/g,'Zeldor').replace(/\{O\}/g,'Zeldara'); }):[];
  var SRC='preview/cutscene/opening_lock_40s.mp4', MUSIC='preview/music/mu_saga_storm.mp3', CUTS=[0,6.75,13.583,20,28.917,33.333,39.96], K='cutvid-intro_lock';
  var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); };
  var P=function(){ return LabApp.picks[K]||{}; }, on=function(){ return P().verdict==='pick'; };
  var read=function(l){ return 1.4+String(l||'').split(/\s+/).filter(Boolean).length*0.36; };
  var frag=function(line){ var F=String(line||'').split(/(?<=[,;:…])\s+|\s+(?=[—–]\s)|(?<=[—–])\s+/).map(function(x){ return x.trim(); }).filter(Boolean), out=[];
    F.forEach(function(f){ var w=f.split(' '); if(w.length>9){ var h=Math.ceil(w.length/2); out.push(w.slice(0,h).join(' ')); out.push(w.slice(h).join(' ')); } else out.push(f); }); return out; };
  var plan=function(){ return CAPS.map(function(c,i){ var len=CUTS[i+1]-CUTS[i], first=i===0, rate=first?1:Math.max(0.6,Math.min(1,len/read(c))); return {i:i,a:CUTS[i],b:CUTS[i+1],cap:c,first:first,rate:rate,ms:Math.round((first?len:Math.max(len/rate,read(c)))*1000+300)}; }); };
  var total=function(){ return Math.round(plan().reduce(function(a,s){ return a+s.ms; },0)/1000+read(CAPS[0])+3); };
  var card=function(){ return '<article class="li-card'+(on()?' on':'')+'"><div class="li-stage"><video class="li-v" src="'+SRC+'" preload="auto" playsinline muted></video><div class="li-panel"><div class="li-pt"></div></div></div>'+
      '<div class="li-under"></div><div class="li-t"><b>★ NEW — the intro as it plays in the game (round 97)</b><p>Your pick from Kling: <b>The Locked Shot List</b> (O17), slowed to 40 s with smooth in-between frames, the KlingAI mark cropped from the corner. '+
      'Exactly as the game plays it: the first line alone on black; then each part of the video, cut where the video cuts, the words building in under it; each part slowed until its line can be read; the opening\'s music under it (the video\'s own sound is never used). '+
      'In the game the twins\' frames (7–12) follow as paintings until their video is made. About '+total()+' s here.</p>'+
      '<div class="li-act"><button class="vbtn li-play">▶ Play as in the game</button><button class="vbtn li-stop">■ Stop</button><button class="vbtn li-pick" aria-pressed="'+on()+'">'+(on()?'★ Keep it as the intro':'☆ Keep it as the intro')+'</button></div>'+
      '<textarea class="mn-notes li-notes" rows="2" placeholder="Notes — timing, a part to remake, the words…">'+esc(P().notes||'')+'</textarea></div></article>'; };
  var r0=T.render; T.render=function(){ return LBR.sec('The new intro — as it plays in the game','round 97 · the O17 video · the first line on black, then the words building under each part')+card()+r0.apply(this,arguments); };
  T.blurb='<b>Round 97 — the new intro is in the game.</b> Your Kling pick (The Locked Shot List) played as the game plays it, at the top. ☆ to keep it, or note what to change. The earlier montage tries are kept below.';
  if(T.designs)T.designs.unshift({id:'intro_lock',name:'The new intro (O17, as in the game)'});
  var run=0, mus=null, el=function(s){ return document.querySelector(s); };
  var wait=function(ms,id){ return new Promise(function(res,rej){ setTimeout(function(){ id===run?res():rej(); },ms); }); };
  var stop=function(){ run++; var v=el('.li-v'); if(v)v.pause(); if(mus)mus.pause(); var u=el('.li-under'); if(u)u.innerHTML=''; var p=el('.li-panel'); if(p)p.classList.remove('show'); };
  var words=function(line,ms,id){ var u=el('.li-under'); u.innerHTML=''; var F=frag(line), outAt=Math.max(1400,ms-900), step=Math.min(1500,(outAt*0.55)/Math.max(1,F.length));
    var S=F.map(function(f){ var s=document.createElement('span'); s.textContent=f; u.appendChild(s); return s; });
    S.forEach(function(s,i){ setTimeout(function(){ if(id===run)s.classList.add('in'); },120+i*step); }); setTimeout(function(){ if(id===run)S.forEach(function(s){ s.classList.add('out'); }); },outAt); };
  var panel=function(line,id){ var p=el('.li-panel'), t=el('.li-pt'); t.innerHTML=''; var F=frag(line).map(function(f){ var s=document.createElement('span'); s.textContent=f; t.appendChild(s); return s; }), ms=Math.max(2600,(read(line)+1.2)*1000);
    p.classList.add('show'); F.forEach(function(s,i){ setTimeout(function(){ if(id===run)s.classList.add('in'); },500+i*650); });
    return wait(500+650*F.length+Math.max(900,ms-650*F.length),id).then(function(){ p.classList.remove('show'); return wait(800,id); }); };
  var seg=function(v,s,id){ v.playbackRate=s.rate; if(Math.abs(v.currentTime-s.a)>0.3)v.currentTime=s.a; var pp=v.play(); if(pp&&pp.catch)pp.catch(function(){});
    if(!s.first)words(s.cap,s.ms,id); else el('.li-under').innerHTML='';
    var f=function(){ if(id!==run)return; if(v.currentTime>=s.b-0.06||v.ended){ v.pause(); return; } requestAnimationFrame(f); }; f(); return wait(s.ms,id); };
  var play=function(){ stop(); var id=run, v=el('.li-v'); if(!v)return; if(!mus){ mus=new Audio(MUSIC); mus.volume=0.75; } try{ mus.currentTime=0; mus.play(); }catch(e){} v.currentTime=0;
    var p=panel(CAPS[0],id); plan().forEach(function(s){ p=p.then(function(){ return seg(v,s,id); }); });
    p.then(function(){ return wait(1200,id); }).then(function(){ if(mus){ var a=mus, t0=Date.now(), f=setInterval(function(){ a.volume=Math.max(0,0.75*(1-(Date.now()-t0)/1500)); if(a.volume<=0){ a.pause(); a.volume=0.75; clearInterval(f); } },60); } }).catch(function(){}); };
  document.addEventListener('click',function(e){ var t=e.target.closest&&e.target.closest('.li-play,.li-stop,.li-pick'); if(!t)return;
    if(t.classList.contains('li-play'))play(); else if(t.classList.contains('li-stop'))stop();
    else { var p=LabApp.picks[K]=LabApp.picks[K]||{}; p.verdict=on()?null:'pick'; LabApp.persist(K); t.setAttribute('aria-pressed',String(on())); t.textContent=(on()?'★ ':'☆ ')+'Keep it as the intro'; var c=t.closest('.li-card'); if(c)c.classList.toggle('on',on()); } });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.li-notes'); if(!t)return; var p=LabApp.picks[K]=LabApp.picks[K]||{}; p.notes=t.value; LabApp.persist(K); });
  var st=document.createElement('style'); st.textContent=
    '.li-card{max-width:1000px;margin:6px 0 22px;background:#0d1420;border:1px solid #24364e;border-radius:10px;overflow:hidden}.li-card.on{border-color:#7fe08a}'+
    '.li-stage{position:relative;background:#000}.li-v{display:block;width:100%;aspect-ratio:16/9;background:#000}'+
    '.li-panel{position:absolute;inset:0;background:#000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .8s}.li-panel.show{opacity:1}'+
    '.li-pt{max-width:72%;text-align:center;color:#f2e3b0;font:italic clamp(20px,3vw,36px)/1.5 Georgia,serif}.li-pt span{opacity:0;transition:opacity .9s;margin-right:.3em}.li-pt span.in{opacity:1}'+
    '.li-under{min-height:132px;padding:18px 28px;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:0 .35em;color:#f2e3b0;font:italic 600 29px/1.4 Georgia,serif;text-align:center;background:linear-gradient(#05080d,#0a0f17);border-top:1px solid #1b2738}'+
    '.li-under span{display:inline-block;opacity:0;transform:translateY(8px);transition:opacity .9s ease,transform .9s ease}.li-under span.in{opacity:1;transform:none}.li-under span.out{opacity:0;transition-duration:.7s}'+
    '.li-t{padding:12px 16px}.li-t p{color:#8aa0b8;font:13px/1.5 "Segoe UI",sans-serif;margin:4px 0 10px}.li-act{display:flex;gap:8px;flex-wrap:wrap}.li-pick[aria-pressed="true"]{background:#2a5a3a;border-color:#7fe08a}.li-notes{width:100%;margin-top:8px}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined'){ var j=LAB_ACTIVE.indexOf('cutvid'); if(j>=0)LAB_ACTIVE.splice(j,1); LAB_ACTIVE.unshift('cutvid'); }
  if(typeof LTODO!=='undefined')LTODO.add({id:'cutintro',label:'🎬 Review the new intro (as it plays in the game)',where:'Cut-scene videos tab · top',done:function(){ return on()||!!P().notes; },go:function(){ LTODO.goTo('cutvid','.li-card',0); }});
})();
