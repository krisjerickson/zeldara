// ═══════════════════════════════════════════════════════════════════════
// ║ 79o2-lab-cutstyles2.js — round 92b: Kris's notes on the cut-scenes.
// ║  · the words: "under the picture is best, but the text area needs to be a bit bigger, and let's play with different options for the text
// ║    fading in in blocks, like you would read a sentence fragment, and having it cinematic with fading in and out effects. Also, the first and
// ║    last text blocks can be their own screen-wide panel. Play around with 5 new options … make sure to scale timing for each montage video to
// ║    allow you enough time to read" → five ways under the picture, the first/last-line panels (a switch), and reading-paced timing (each shot
// ║    is slowed until its line can be read; the total is shown);
// ║  · the video: "much better, but we actually need to make it more like 40 seconds in total" → the opening at 40 s (here and Cut-scene videos);
// ║  · "10 different styles to consider for 1 single video … Don't discard the ones you generated" and "options where each of the images is
// ║    inspiration only, and there is a continuous story going throughout" → one video (the opening, part 1) in ten styles and four story-led
// ║    versions (ZCUTSTY.one, tools/video/kling_styles.py; folders video_requests\O01 … O14). The ten tries on other scenes stay below.
// ║ Picks: 'cuttext2-<id>', 'cutpanel-on', 'cutone-<id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof ZCUTSTY==='undefined'||!ZCUTSTY.one)return;
  var T0=LAB_TABS.find(function(t){ return t.id==='cutstyle'; }); if(!T0)return;
  var D=ZCUTSTY, SB=typeof ZSB!=='undefined'&&ZSB.SCENES?ZSB.SCENES:[], COL=window.ZCS_COL||{};
  var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, on=function(k){ return P(k).verdict==='pick'; };
  var set=function(k,v){ var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=v; LabApp.persist(k); };
  var SN={}; D.styles.forEach(function(s){ SN[s.id]=s; });
  var SC=SB.find(function(s){ return s.id==='opening'; });
  var CAPS=SC?SC.beats.slice(0,6).map(function(b){ return String(b.cap||'').replace(/\{H\}/g,'Zeldor').replace(/\{O\}/g,'Zeldara'); }):[];
  // ── the words: five ways under the picture ──
  var OPT=[['build','Fragments that build','each part of the sentence fades in and rises gently into place after the last; the whole line fades out before the cut'],
           ['swap','One fragment at a time','each part replaces the one before with a slow crossfade, like a trailer\'s words'],
           ['blur','Cinematic blur-in','the whole line drifts in from a soft blur and wide spacing to sharp, holds, then dissolves back into blur'],
           ['verse','Lines of verse','the sentence is set as two or three short lines, stacked; each line fades in under the last'],
           ['ember','Glow and embers','each part fades in with a rune-blue glow that settles to cream; at the end the words drift upward and burn away like embers']];
  var VSRC=['preview/cutscene/opening_p1_40s.mp4','preview/cutscene/opening_p1_30s.mp4'];
  var frag=function(line){ var F=String(line).split(/(?<=[,;:…])\s+|\s+(?=[—–]\s)|(?<=[—–])\s+/).map(function(x){ return x.trim(); }).filter(Boolean), out=[];
    F.forEach(function(f){ var w=f.split(' '); if(w.length>9){ var h=Math.ceil(w.length/2); out.push(w.slice(0,h).join(' ')); out.push(w.slice(h).join(' ')); } else out.push(f); }); return out; };
  var readS=function(line){ return 1.4+String(line).split(/\s+/).length*0.36; };      // ≈ 165 words a minute while watching the picture, plus a breath
  var cur=function(){ var o=OPT.find(function(x){ return on('cuttext2-'+x[0]); }); return o?o[0]:'build'; };
  var panels=function(){ var p=P('cutpanel-on'); return p.verdict!=='off'; };
  var plan=function(V){ var n=CAPS.length, T=V/n, pl=panels(); return CAPS.map(function(c,i){ var r=readS(c), isP=pl&&(i===0||i===n-1); return {i:i,cap:c,panel:isP,shot:T,secs:isP?T:Math.max(T,r),rate:isP?1:Math.max(0.5,T/Math.max(T,r)),pread:isP?r+1.2:0}; }); };
  var total=function(V){ return plan(V).reduce(function(a,s){ return a+s.secs+s.pread; },0); };
  var words=function(){ return '<div class="ct2"><div class="ct2-stage"><video class="ct2-v" preload="auto" playsinline muted></video><div class="ct2-panel"><div class="ct2-pt"></div></div></div>'+
      '<div class="ct2-under"></div><div class="cs-ctl">'+OPT.map(function(o,i){ return '<button class="vbtn ct2-go" data-o="'+o[0]+'">▶ '+(i+1)+'. '+o[1]+'</button>'; }).join('')+'<button class="vbtn ct2-stop">■ Stop</button></div>'+
      '<div class="ct2-sw"><label><input type="checkbox" class="ct2-pan"'+(panels()?' checked':'')+'> First and last lines as their own full-screen panel</label><span class="ct2-tot"></span></div>'+
      '<div class="cs-modes">'+OPT.map(function(o,i){ var k='cuttext2-'+o[0]; return '<div class="cs-mode'+(on(k)?' on':'')+'"><b>'+(i+1)+'. '+o[1]+'</b><p>'+o[2]+'</p><button class="vbtn ct2-pk" data-k="'+k+'" aria-pressed="'+on(k)+'">'+(on(k)?'★ Picked':'☆ Pick')+'</button>'+
        '<textarea class="mn-notes cs-note" data-k="'+k+'" rows="1" placeholder="Notes…">'+esc(P(k).notes||'')+'</textarea></div>'; }).join('')+'</div></div>'; };
  // ── one video, fourteen ways ──
  var strip=function(){ var I=D.one[0]; return '<div class="cs-th ct2-strip">'+I.frames.map(function(n,i){ return '<canvas class="cs-fr" width="160" height="90" data-key="opening_zeldor" data-sc="opening" data-n="'+n+'" title="'+esc((i+1)+'. '+(I.caps[i]||''))+'"></canvas>'; }).join('')+'</div>'; };
  var card=function(I){ var S=SN[I.style], k='cutone-'+I.id, c=COL[I.style]||'#9fd0ff';
    return '<article class="cs-idea'+(on(k)?' on':'')+'"><div class="cs-ih"><span class="cs-num">O'+(I.k<10?'0':'')+I.k+'</span><b>'+esc(I.title)+'</b><span class="cs-badge" style="border-color:'+c+';color:'+c+'">'+S.name+' · freedom '+'●'.repeat(S.free)+'○'.repeat(5-S.free)+'</span></div>'+
      '<p class="cs-why">'+esc(S.how)+'</p><div class="cs-meta">Like: '+esc(S.like)+'<br>prompt '+I.chars.toLocaleString()+' characters · folder <code>video_requests\\'+I.folder+'</code></div>'+
      '<div class="cs-act"><button class="vbtn ct2-ipk" data-k="'+k+'" aria-pressed="'+on(k)+'">'+(on(k)?'★ Make this one':'☆ Make this one')+'</button><button class="vbtn ct2-copy" data-id="'+I.id+'">⧉ Copy the prompt</button><button class="vbtn ct2-show" data-id="'+I.id+'">Show the prompt</button></div>'+
      '<pre class="cs-pr ct2-pr" data-id="'+I.id+'" hidden>'+esc(I.prompt)+'</pre><textarea class="mn-notes cs-note" data-k="'+k+'" rows="1" placeholder="Notes…">'+esc(P(k).notes||'')+'</textarea></article>'; };
  var nOne=function(){ return D.one.filter(function(I){ return on('cutone-'+I.id); }).length; };
  var r0=T0.render;
  T0.blurb='<b>Round 92b — your notes, answered.</b> The words: five new ways under the picture (a bigger text area), the first and last lines as their own panel, and every shot slowed until its line can be read. The video: the opening at 40 s. And <b>one video in fourteen ways</b> — ten styles plus four story-led versions where the pictures are only inspiration — so we can dial in the style before making the rest. The ten tries on other scenes are kept further down.';
  T0.render=function(){ setTimeout(function(){ prep(); },0);
    return LBR.sec('The words, under the picture — five new ways','the opening at 40 s · each shot slowed until its line can be read · ☆ the one you like')+words()+
      LBR.sec('One video, fourteen ways','the opening, part 1 — the same six pictures each time · ☆ the ones to make (<span class="ct2-n">'+nOne()+'</span> chosen) · every folder is ready: video_requests\\O01 … O14')+strip()+
      '<h4 class="ct2-h">Ten styles — the pictures as the shots</h4><div class="cs-ideas">'+D.one.filter(function(I){ return I.style!=='story'; }).map(card).join('')+'</div>'+
      '<h4 class="ct2-h">Story-led — the pictures as inspiration only; Kling follows a written storyline</h4><div class="cs-ideas">'+D.one.filter(function(I){ return I.style==='story'; }).map(card).join('')+'</div>'+r0.apply(this,arguments); };
  // ── the player ──
  var run=0, mus=null, V=null, el=function(s){ return document.querySelector(s); };
  var prep=function(){ var v=el('.ct2-v'); if(!v||v._src)return; v._src=1; var i=0, tryNext=function(){ if(i>=VSRC.length)return; v.src=VSRC[i++]; }; v.onerror=tryNext; v.onloadedmetadata=function(){ V=v.duration; tot(); }; tryNext(); };
  var tot=function(){ var t=el('.ct2-tot'); if(t&&V)t.textContent='This montage at reading pace: '+Math.round(total(V))+' s (the video alone: '+Math.round(V)+' s)'; };
  var wait=function(ms,id){ return new Promise(function(res,rej){ setTimeout(function(){ id===run?res():rej(); },ms); }); };
  var stop=function(){ run++; var v=el('.ct2-v'); if(v)v.pause(); if(mus)mus.pause(); var u=el('.ct2-under'); if(u)u.innerHTML=''; var pn=el('.ct2-panel'); if(pn)pn.classList.remove('show'); };
  var music=function(){ if(!mus){ mus=new Audio('preview/music/mu_saga_storm.mp3'); mus.volume=0.75; } try{ mus.currentTime=0; mus.play(); }catch(e){} };
  // show a line in the text area with the chosen effect, over `secs`
  var show=function(box,line,how,secs,id){ var F=frag(line), ms=secs*1000, outAt=Math.max(1200,ms-900), p=Promise.resolve(); box.className='ct2-under ct2-'+how; box.innerHTML='';
    if(how==='blur'){ var s0=document.createElement('span'); s0.textContent=line; box.appendChild(s0); requestAnimationFrame(function(){ s0.classList.add('in'); }); return wait(outAt,id).then(function(){ s0.classList.add('out'); return wait(800,id); }); }
    var spans=F.map(function(f){ var s=document.createElement('span'); s.textContent=f; box.appendChild(s); return s; }), step=Math.min(1600,(outAt*0.62)/Math.max(1,F.length));
    spans.forEach(function(s,i){ p=p.then(function(){ if(how==='swap'&&i>0)spans[i-1].classList.add('out'); s.classList.add('in'); return wait(how==='swap'?Math.max(step,(outAt)/F.length):step,id); }); });
    return p.then(function(){ var used=how==='swap'?outAt:step*F.length; return wait(Math.max(0,outAt-used),id); }).then(function(){ spans.forEach(function(s,i){ setTimeout(function(){ s.classList.add('out'); },how==='ember'?i*120:0); }); return wait(900,id); }); };
  var panel=function(line,secs,id){ var pn=el('.ct2-panel'), t=el('.ct2-pt'); t.innerHTML=''; frag(line).forEach(function(f){ var s=document.createElement('span'); s.textContent=f; t.appendChild(s); }); pn.classList.add('show');
    var S=t.querySelectorAll('span'), p=wait(500,id); S.forEach(function(s){ p=p.then(function(){ s.classList.add('in'); return wait(650,id); }); });
    return p.then(function(){ return wait(Math.max(600,secs*1000-650*S.length-1400),id); }).then(function(){ pn.classList.remove('show'); return wait(800,id); }); };
  var seg=function(v,s,id){ v.playbackRate=s.rate; v.currentTime=s.i*s.shot; v.play(); return new Promise(function(res,rej){ var f=function(){ if(id!==run){ rej(); return; } if(v.currentTime>=(s.i+1)*s.shot-0.04||v.ended){ v.pause(); res(); return; } requestAnimationFrame(f); }; f(); }); };
  var play=function(how){ stop(); var id=run, v=el('.ct2-v'), u=el('.ct2-under'); if(!v||!V)return; music(); var p=Promise.resolve();
    plan(V).forEach(function(s,i){ var last=i===CAPS.length-1;
      if(s.panel&&!last)p=p.then(function(){ v.currentTime=0; return panel(s.cap,s.pread,id); });
      p=p.then(function(){ return Promise.all([seg(v,s,id),s.panel?Promise.resolve():show(u,s.cap,how,s.secs,id)]); });
      if(s.panel&&last)p=p.then(function(){ return panel(s.cap,s.pread,id); }); });
    p.then(function(){ setTimeout(function(){ if(id===run&&mus)mus.pause(); },1500); }).catch(function(){}); };
  var flip=function(sel,k,txt){ document.querySelectorAll(sel).forEach(function(b){ if(b.dataset.k!==k)return; var o=on(k); b.setAttribute('aria-pressed',String(o)); b.textContent=(o?'★ ':'☆ ')+txt; var box=b.closest('.cs-mode,.cs-idea'); if(box)box.classList.toggle('on',o); }); };
  document.addEventListener('click',function(e){ var t=e.target.closest&&e.target.closest('.ct2-go,.ct2-stop,.ct2-pk,.ct2-ipk,.ct2-copy,.ct2-show'); if(!t)return;
    if(t.classList.contains('ct2-go'))play(t.dataset.o); else if(t.classList.contains('ct2-stop'))stop();
    else if(t.classList.contains('ct2-pk')){ var k=t.dataset.k; set(k,on(k)?null:'pick'); flip('.ct2-pk',k,on(k)?'Picked':'Pick'); }
    else if(t.classList.contains('ct2-ipk')){ var k2=t.dataset.k; set(k2,on(k2)?null:'pick'); flip('.ct2-ipk',k2,'Make this one'); var n=el('.ct2-n'); if(n)n.textContent=nOne(); }
    else if(t.classList.contains('ct2-copy')){ var I=D.one.find(function(x){ return x.id===t.dataset.id; }); try{ navigator.clipboard.writeText(I.prompt).then(function(){ t.textContent='✓ Copied'; setTimeout(function(){ t.textContent='⧉ Copy the prompt'; },1500); }); }catch(x){} }
    else if(t.classList.contains('ct2-show')){ var pr=el('.ct2-pr[data-id="'+t.dataset.id+'"]'); if(pr){ pr.hidden=!pr.hidden; t.textContent=pr.hidden?'Show the prompt':'Hide the prompt'; } } });
  document.addEventListener('change',function(e){ if(e.target.classList&&e.target.classList.contains('ct2-pan')){ set('cutpanel-on',e.target.checked?'pick':'off'); tot(); } });
  var st=document.createElement('style'); st.textContent=
    '.ct2{margin:6px 0 18px;max-width:1000px}.ct2-stage{position:relative;background:#000;border-radius:10px 10px 0 0;overflow:hidden}.ct2-v{display:block;width:100%;aspect-ratio:16/9;background:#000}'+
    '.ct2-panel{position:absolute;inset:0;background:#000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .8s}.ct2-panel.show{opacity:1}'+
    '.ct2-pt{max-width:72%;text-align:center;color:#f2e3b0;font:italic clamp(20px,3vw,36px)/1.5 Georgia,serif}.ct2-pt span{display:inline;opacity:0;transition:opacity .9s;margin-right:.3em}.ct2-pt span.in{opacity:1}'+
    '.ct2-under{min-height:118px;padding:18px 28px;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:0 .35em;color:#f2e3b0;font:italic 23px/1.45 Georgia,serif;text-align:center;background:linear-gradient(#05080d,#0a0f17);border-top:1px solid #1b2738}'+
    '.ct2-under span{opacity:0;transition:opacity .9s ease,transform .9s ease,filter .9s ease,text-shadow 1.6s ease}'+
    '.ct2-build span{transform:translateY(8px)}.ct2-build span.in{opacity:1;transform:none}.ct2-build span.out{opacity:0;transition-duration:.7s}'+
    '.ct2-swap{position:relative}.ct2-swap span{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);transition-duration:.8s}.ct2-swap span.in{opacity:1}.ct2-swap span.out{opacity:0}'+
    '.ct2-blur span{filter:blur(10px);letter-spacing:.35em;transition:opacity 1.4s ease,filter 1.4s ease,letter-spacing 1.8s ease}.ct2-blur span.in{opacity:1;filter:none;letter-spacing:.01em}.ct2-blur span.out{opacity:0;filter:blur(10px);letter-spacing:.2em}'+
    '.ct2-verse{flex-direction:column;flex-wrap:nowrap;min-height:150px}.ct2-verse span{display:block;transform:translateY(6px)}.ct2-verse span.in{opacity:1;transform:none}.ct2-verse span.out{opacity:0}'+
    '.ct2-ember span{text-shadow:0 0 18px #6fe3f5,0 0 4px #9ff}.ct2-ember span.in{opacity:1;text-shadow:0 0 6px rgba(111,227,245,.25)}.ct2-ember span.out{opacity:0;transform:translateY(-22px);filter:blur(4px);text-shadow:0 0 14px #ffa64d;transition-duration:1.1s}'+
    '.ct2-sw{display:flex;flex-wrap:wrap;gap:12px;align-items:center;color:#b9c8d8;font:13px "Segoe UI",sans-serif;margin:0 0 8px}.ct2-tot{color:#8aa0b8}'+
    '.ct2-pk[aria-pressed="true"],.ct2-ipk[aria-pressed="true"]{background:#2a5a3a;border-color:#7fe08a}.ct2-h{color:#cfdbea;font:600 14px "Segoe UI",sans-serif;margin:14px 0 4px}.ct2-strip .cs-fr{width:calc((100% - 15px)/6)}';
  document.head.appendChild(st);
  if(typeof LTODO!=='undefined'){ LTODO.add({id:'cutone',label:'🎬 One video, fourteen ways: ☆ the ones to make in Kling',where:'Cut-scene styles tab · One video',done:function(){ return nOne()>=1; },go:function(){ LTODO.goTo('cutstyle','.ct2-strip',0); }});
    LTODO.add({id:'cuttext2',label:'🖋 The words under the picture: ☆ one of the five new ways',where:'Cut-scene styles tab · top',done:function(){ return OPT.some(function(o){ return on('cuttext2-'+o[0]); }); },go:function(){ LTODO.goTo('cutstyle','.ct2',0); }}); }
})();
