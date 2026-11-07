// ═══════════════════════════════════════════════════════════════════════
// ║ 79o1-lab-cutstyles.js — round 92: CUT-SCENE STYLES (Kris: "i'm still not set on the cutscenes … Study video game cut scenes and what make
// ║ especially good ones, and come up with 5 very different types of prompts … I'm also thinking about having full screen text pauses (screen
// ║ is black except for text, and perhaps text that comes out at a reading pace) … 10 different initial ideas for me to choose 5 from").
// ║ Four parts: what makes a great cut-scene (doc 48); the five prompt styles; how the words appear — the first montage played three ways
// ║ (under the picture / black text cards between shots / prologue cards first), the words revealed by letter, word or fade; and the ten first
// ║ tries (ZCUTSTY, made by tools/video/kling_styles.py): their pictures, style, why, the whole prompt (Copy) — ☆ five.
// ║ Picks: 'cutidea-<id>', 'cuttext-<mode>', 'cutreveal-<how>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof ZCUTSTY==='undefined')return;
  var D=ZCUTSTY, SB=typeof ZSB!=='undefined'&&ZSB.SCENES?ZSB.SCENES:[], IX=(typeof ZSB_SHEETS!=='undefined'&&ZSB_SHEETS)||{};
  var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, on=function(k){ return P(k).verdict==='pick'; };
  var set=function(k,v){ var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=v; LabApp.persist(k); };
  var nIdeas=function(){ return D.ideas.filter(function(I){ return on('cutidea-'+I.id); }).length; };
  var SN={}; D.styles.forEach(function(s){ SN[s.id]=s; });
  var SCOL={living:'#9fd0ff',director:'#ffd27a',onetake:'#7fe08a',rhythm:'#ff8a6a',poem:'#c8a8ff'};
  // ── 1. what makes a great cut-scene ──
  var PRIN=[
    ['One job','Every cut-scene does one thing: reveal, reward, warn, or turn the story. If it does two, cut one.'],
    ['Short, then shorter','Players lean forward for 15–30 seconds and lean back after 60. Ours fit 20 s a part.'],
    ['Show, don\'t say','The picture tells what happens; the words tell what the picture can\'t — the past, the meaning, the stakes (Bastion: "dialogue is for subtext").'],
    ['Rhythm and contrast','Vary it: wide then close, fast then still, loud then quiet. A held still moment after action is what makes the action land.'],
    ['One unforgettable image','The best cut-scenes are remembered by one frame (the gate shutting, the hand of fire). Build up to it and hold it.'],
    ['Music leads','Cut to the music\'s phrases; let a big moment hit on a downbeat; leave silence before a reveal. Our music plays under every cut-scene.'],
    ['Begin and end in play','Start from where the player is and hand control back where the story leaves them, with the next goal clear.'],
    ['Respect the player','Skippable, never repeated, and in the world\'s own voice — never explaining the controls.']];
  // ── 3. the words: the first montage three ways ──
  var SC=SB.find(function(s){ return s.id==='opening'; });
  var CAPS=SC?SC.beats.slice(0,6).map(function(b){ return String(b.cap||'').replace(/\{H\}/g,'Zeldor').replace(/\{O\}/g,'Zeldara'); }):[];
  var MODES=[['under','Under the picture','today: the line sits under the moving picture, in time with it'],
             ['cards','Text cards between shots','the screen goes black and the line appears at a reading pace; then the shot plays; then the next card'],
             ['prologue','Prologue cards, then the film','all the lines first, on black, one after another — then the whole montage with no words']];
  var REVEAL=[['letter','Letter by letter'],['word','Word by word'],['fade','Whole line fades in']];
  var rv=function(){ var r=REVEAL.find(function(x){ return on('cutreveal-'+x[0]); }); return r?r[0]:'word'; };
  var player=function(){ return '<div class="cs-pl"><div class="cs-stage"><video class="cs-v" src="preview/cutscene/opening_p1_20s.mp4" preload="metadata" playsinline muted></video>'+
      '<div class="cs-card"><div class="cs-rune">ᚱ ✦ ᛉ</div><div class="cs-ct"></div></div></div><div class="cs-under"></div>'+
      '<div class="cs-ctl">'+MODES.map(function(m){ return '<button class="vbtn cs-go" data-m="'+m[0]+'">▶ '+m[1]+'</button>'; }).join('')+'<button class="vbtn cs-stop">■ Stop</button>'+
      '<span class="cs-rv">Words: '+REVEAL.map(function(r){ return '<button class="vbtn cs-rvb" data-r="'+r[0]+'" aria-pressed="'+(rv()===r[0])+'">'+r[1]+'</button>'; }).join('')+'</span></div>'+
      '<div class="cs-modes">'+MODES.map(function(m){ var k='cuttext-'+m[0]; return '<div class="cs-mode'+(on(k)?' on':'')+'"><b>'+m[1]+'</b><p>'+m[2]+'</p><button class="vbtn cs-pk" data-k="'+k+'" aria-pressed="'+on(k)+'">'+(on(k)?'★ Picked':'☆ Pick')+'</button>'+
        '<textarea class="mn-notes cs-note" data-k="'+k+'" rows="1" placeholder="Notes…">'+esc(P(k).notes||'')+'</textarea></div>'; }).join('')+'</div></div>'; };
  // ── 4. the ten tries ──
  var thumbs=function(I){ return '<div class="cs-th">'+I.frames.map(function(n,i){ return '<canvas class="cs-fr" width="160" height="90" data-key="'+I.scene+'_'+(ZSB.whos&&ZSB.whos(SB.find(function(s){ return s.id===I.scene; })).length>1?I.who:'all')+'" data-sc="'+I.scene+'" data-n="'+n+'" title="'+esc((i+1)+'. '+(I.caps[i]||''))+'"></canvas>'; }).join('')+'</div>'; };
  var idea=function(I){ var S=SN[I.style], k='cutidea-'+I.id, p=P(k);
    return '<article class="cs-idea'+(on(k)?' on':'')+'" data-id="'+I.id+'"><div class="cs-ih"><span class="cs-num">S'+(I.k<10?'0':'')+I.k+'</span><b>'+esc(I.title)+'</b>'+
      '<span class="cs-badge" style="border-color:'+SCOL[I.style]+';color:'+SCOL[I.style]+'">'+S.name+' · freedom '+'●'.repeat(S.free)+'○'.repeat(5-S.free)+'</span></div>'+thumbs(I)+
      '<p class="cs-why">'+esc(I.why)+'</p><div class="cs-meta">'+I.frames.length+' pictures · '+I.secs+' s ('+(I.secs/I.frames.length).toFixed(1)+' s each) · prompt '+I.chars.toLocaleString()+' characters · folder <code>video_requests\\'+I.folder+'</code></div>'+
      '<div class="cs-act"><button class="vbtn cs-ipk" data-k="'+k+'" aria-pressed="'+on(k)+'">'+(on(k)?'★ Picked':'☆ Pick')+'</button><button class="vbtn cs-copy" data-id="'+I.id+'">⧉ Copy the prompt</button><button class="vbtn cs-show" data-id="'+I.id+'">Show the prompt</button></div>'+
      '<pre class="cs-pr" data-id="'+I.id+'" hidden>'+esc(I.prompt)+'</pre><textarea class="mn-notes cs-note" data-k="'+k+'" rows="1" placeholder="Notes…">'+esc(p.notes||'')+'</textarea></article>'; };
  LAB_TABS.push({ id:'cutstyle', name:'Cut-scene styles',
    blurb:'<b>Round 92 — dialling in the cut-scenes.</b> What makes a great game cut-scene, five very different ways to prompt Kling (each feeds it <i>every</i> picture, each opens its freedom differently, and the prompts are long again), how the words could appear — including black text cards at a reading pace — and ten first tries to choose from. ☆ <b>five</b> of the ten to make in Kling; ☆ how the words should appear.',
    designs:D.ideas.map(function(I){ return {id:I.id,name:I.title}; }),
    render:function(){ setTimeout(drawThumbs,0);
      return LBR.sec('What makes a great cut-scene','eight things the best ones share (doc 48)')+'<div class="cs-pr8">'+PRIN.map(function(x,i){ return '<div><b>'+(i+1)+'. '+x[0]+'</b><p>'+x[1]+'</p></div>'; }).join('')+'</div>'+
        LBR.sec('Five ways to prompt Kling','from "animate the picture exactly" to "let it dream" — all of them use every picture')+'<div class="cs-st5">'+D.styles.map(function(S){
          return '<div class="cs-st" style="border-top:3px solid '+SCOL[S.id]+'"><b style="color:'+SCOL[S.id]+'">'+S.name+'</b><div class="cs-free">freedom '+'●'.repeat(S.free)+'○'.repeat(5-S.free)+'</div><p>'+esc(S.how)+'</p>'+
            '<dl><dt>Like</dt><dd>'+esc(S.like)+'</dd><dt>Cutting</dt><dd>'+esc(S.cut)+'</dd><dt>Best for</dt><dd>'+esc(S.best)+'</dd><dt>Words</dt><dd>'+esc(S.text)+'</dd></dl></div>'; }).join('')+'</div>'+
        LBR.sec('How the words appear','the first montage, three ways · the game\'s music under it · ☆ the one you like')+player()+
        LBR.sec('Ten first tries — ☆ five','<span class="cs-count">'+nIdeas()+' / 5 picked</span> · every picture of the scene in each · each folder is ready in video_requests (S01 … S10)')+'<div class="cs-ideas">'+D.ideas.map(idea).join('')+'</div>'; } });
  // thumbnails from the story-frame sheets (as the Story cut-scenes tab)
  var SHEET={}, sheet=function(key){ if(SHEET[key])return SHEET[key]; var im=new Image(); im.onload=drawThumbs; im.onerror=function(){ if(!im._b){ im._b=1; im.src='../lab/preview/storyboards/'+key+'.webp'; } }; im.src='preview/storyboards/'+key+'.webp'; return (SHEET[key]=im); };
  function drawThumbs(){ document.querySelectorAll('canvas.cs-fr').forEach(function(cv){ var key=cv.dataset.key, I=IX[key], sc=SB.find(function(s){ return s.id===cv.dataset.sc; }), c=cv.getContext('2d'); if(!sc)return;
      var i=sc.beats.findIndex(function(b){ return b.n===+cv.dataset.n; }), im=I&&I.n&&I.n.indexOf(+cv.dataset.n)>=0?sheet(key):null;
      if(im&&im.complete&&im.naturalWidth){ c.drawImage(im,(i%I.cols)*I.tw+2,Math.floor(i/I.cols)*I.th+2,I.tw-4,I.th-4,0,0,cv.width,cv.height); }
      else { c.fillStyle='#0b1220'; c.fillRect(0,0,cv.width,cv.height); c.fillStyle='#8aa0b8'; c.font='12px Georgia,serif'; c.textAlign='center'; c.fillText(String(cv.dataset.n),cv.width/2,cv.height/2+4); } }); }
  // ── the player ──
  var mus=null, run=0, T=20/6;
  var el=function(s){ return document.querySelector(s); };
  var music=function(play){ if(!mus){ mus=new Audio('preview/music/mu_saga_storm.mp3'); mus.volume=0.75; } if(play){ try{ mus.currentTime=0; mus.play(); }catch(e){} } else mus.pause(); };
  var stop=function(){ run++; var v=el('.cs-v'); if(v)v.pause(); music(false); var c=el('.cs-card'); if(c)c.classList.remove('show'); var u=el('.cs-under'); if(u)u.textContent=''; };
  var wait=function(ms,id){ return new Promise(function(res,rej){ setTimeout(function(){ id===run?res():rej(); },ms); }); };
  // show one line on black at a reading pace: about 230 words a minute to read, then a pause
  var card=function(txt,id){ var c=el('.cs-card'), t=el('.cs-ct'), how=rv(); c.classList.add('show'); t.textContent=''; t.style.opacity=1; var words=txt.split(' ');
    var hold=1100+txt.split(' ').length*260, p=wait(450,id);
    if(how==='fade'){ t.textContent=txt; t.style.opacity=0; p=p.then(function(){ t.style.transition='opacity 0.9s'; t.style.opacity=1; return wait(900,id); }); }
    else if(how==='word'){ words.forEach(function(w,i){ p=p.then(function(){ t.textContent+=(i?' ':'')+w; return wait(Math.min(420,120+w.length*28),id); }); }); }
    else { txt.split('').forEach(function(ch){ p=p.then(function(){ t.textContent+=ch; return wait(/[.,;—…!?]/.test(ch)?160:34,id); }); }); }
    return p.then(function(){ return wait(hold,id); }).then(function(){ t.style.transition='opacity 0.5s'; t.style.opacity=0; return wait(520,id); }).then(function(){ t.style.transition=''; c.classList.remove('show'); return wait(250,id); }); };
  var seg=function(i,id){ var v=el('.cs-v'); v.currentTime=i*T; v.play(); return new Promise(function(res,rej){ var f=function(){ if(id!==run){ rej(); return; } if(v.currentTime>=(i+1)*T-0.05||v.ended){ v.pause(); res(); return; } requestAnimationFrame(f); }; f(); }); };
  var play=function(m){ stop(); var id=run, v=el('.cs-v'), u=el('.cs-under'); if(!v)return; music(true);
    if(m==='under'){ v.currentTime=0; v.play(); var f=function(){ if(id!==run)return; var i=Math.min(5,Math.floor(v.currentTime/T)); if(u._i!==i){ u._i=i; u.textContent=CAPS[i]||''; } if(!v.ended)requestAnimationFrame(f); else music(false); }; u._i=-1; f(); return; }
    var p=Promise.resolve();
    if(m==='cards'){ CAPS.forEach(function(c,i){ p=p.then(function(){ return card(c,id); }).then(function(){ return seg(i,id); }); }); }
    else { CAPS.forEach(function(c){ p=p.then(function(){ return card(c,id); }); }); p=p.then(function(){ v.currentTime=0; v.play(); return new Promise(function(res){ v.onended=res; }); }); }
    p.then(function(){ if(id===run)setTimeout(function(){ if(id===run)music(false); },1200); }).catch(function(){}); };
  var flip=function(btns,k){ document.querySelectorAll(btns).forEach(function(b){ if(b.dataset.k!==k)return; var o=on(k); b.setAttribute('aria-pressed',String(o)); b.textContent=o?'★ Picked':'☆ Pick'; var box=b.closest('.cs-mode,.cs-idea'); if(box)box.classList.toggle('on',o); }); };
  document.addEventListener('click',function(e){ var t=e.target.closest&&e.target.closest('.cs-go,.cs-stop,.cs-rvb,.cs-pk,.cs-ipk,.cs-copy,.cs-show'); if(!t)return;
    if(t.classList.contains('cs-go'))play(t.dataset.m); else if(t.classList.contains('cs-stop'))stop();
    else if(t.classList.contains('cs-rvb')){ REVEAL.forEach(function(r){ var k='cutreveal-'+r[0]; if(r[0]===t.dataset.r){ if(!on(k))set(k,'pick'); } else if(on(k))set(k,null); }); document.querySelectorAll('.cs-rvb').forEach(function(b){ b.setAttribute('aria-pressed',String(b.dataset.r===rv())); }); }
    else if(t.classList.contains('cs-pk')){ var k=t.dataset.k; set(k,on(k)?null:'pick'); flip('.cs-pk',k); }
    else if(t.classList.contains('cs-ipk')){ var k2=t.dataset.k; if(!on(k2)&&nIdeas()>=5){ t.textContent='5 already — un-☆ one first'; setTimeout(function(){ flip('.cs-ipk',k2); },1400); return; } set(k2,on(k2)?null:'pick'); flip('.cs-ipk',k2); var cn=el('.cs-count'); if(cn)cn.textContent=nIdeas()+' / 5 picked'; }
    else if(t.classList.contains('cs-copy')){ var I=D.ideas.find(function(x){ return x.id===t.dataset.id; }); try{ navigator.clipboard.writeText(I.prompt).then(function(){ t.textContent='✓ Copied'; setTimeout(function(){ t.textContent='⧉ Copy the prompt'; },1500); }); }catch(x){ var pr=el('.cs-pr[data-id="'+t.dataset.id+'"]'); if(pr){ pr.hidden=false; var r=document.createRange(); r.selectNodeContents(pr); var s=getSelection(); s.removeAllRanges(); s.addRange(r); } } }
    else if(t.classList.contains('cs-show')){ var pr2=el('.cs-pr[data-id="'+t.dataset.id+'"]'); if(pr2){ pr2.hidden=!pr2.hidden; t.textContent=pr2.hidden?'Show the prompt':'Hide the prompt'; } } });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.cs-note'); if(t){ var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); } });
  var st=document.createElement('style'); st.textContent=
    '.cs-pr8{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;margin:6px 0 18px}.cs-pr8>div{background:#0d1420;border:1px solid #24364e;border-radius:8px;padding:10px 12px}.cs-pr8 b{color:#f2e3b0}.cs-pr8 p{margin:4px 0 0;color:#a9bbcf;font:13px/1.45 "Segoe UI",sans-serif}'+
    '.cs-st5{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;margin:6px 0 18px}.cs-st{background:#0d1420;border:1px solid #24364e;border-radius:8px;padding:10px 12px}.cs-st>p{color:#d6e2ef;font:13px/1.45 "Segoe UI",sans-serif;margin:6px 0}.cs-free{color:#8aa0b8;font:12px "Segoe UI",sans-serif;letter-spacing:1px}'+
    '.cs-st dl{margin:0;font:12px/1.4 "Segoe UI",sans-serif}.cs-st dt{color:#8aa0b8;margin-top:5px}.cs-st dd{margin:0;color:#b9c8d8}'+
    '.cs-pl{margin:6px 0 18px;max-width:960px}.cs-stage{position:relative;background:#000;border-radius:10px 10px 0 0;overflow:hidden}.cs-v{display:block;width:100%;aspect-ratio:16/9;background:#000}'+
    '.cs-card{position:absolute;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .45s}.cs-card.show{opacity:1}'+
    '.cs-rune{color:#6fe3f5;opacity:.55;letter-spacing:10px;font:15px Georgia,serif;margin-bottom:18px;text-shadow:0 0 10px #6fe3f5}.cs-ct{max-width:74%;color:#f2e3b0;font:italic clamp(16px,2.6vw,30px)/1.5 Georgia,serif;text-align:center;text-shadow:0 0 18px rgba(111,227,245,.25);min-height:2.6em}'+
    '.cs-under{min-height:52px;padding:10px 16px;color:#f2e3b0;font:italic 17px/1.4 Georgia,serif;text-align:center;background:#06090f;border-top:1px solid #1b2738}'+
    '.cs-ctl{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:8px 0}.cs-rv{margin-left:auto;color:#8aa0b8;font:12px "Segoe UI",sans-serif;display:flex;gap:4px;align-items:center;flex-wrap:wrap}.cs-rvb[aria-pressed="true"]{background:#24405e;border-color:#6fe3f5}'+
    '.cs-modes{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px}.cs-mode{background:#0d1420;border:1px solid #24364e;border-radius:8px;padding:8px 10px}.cs-mode.on,.cs-idea.on{border-color:#7fe08a}.cs-mode p{color:#a9bbcf;font:12px/1.4 "Segoe UI",sans-serif;margin:4px 0 6px}'+
    '.cs-pk[aria-pressed="true"],.cs-ipk[aria-pressed="true"]{background:#2a5a3a;border-color:#7fe08a}.cs-note{width:100%;margin-top:6px}'+
    '.cs-ideas{display:grid;grid-template-columns:repeat(auto-fill,minmax(440px,1fr));gap:14px;margin:6px 0 18px}.cs-idea{background:#0d1420;border:1px solid #24364e;border-radius:10px;padding:10px 12px}'+
    '.cs-ih{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.cs-num{font:700 12px "Segoe UI",sans-serif;color:#05070b;background:#8aa0b8;border-radius:4px;padding:2px 6px}.cs-ih b{color:#f2e3b0;font:600 15px Georgia,serif}.cs-badge{border:1px solid;border-radius:12px;padding:1px 8px;font:12px "Segoe UI",sans-serif}'+
    '.cs-th{display:flex;gap:3px;margin:8px 0;overflow-x:auto}.cs-fr{width:calc((100% - 18px)/7);min-width:56px;aspect-ratio:16/9;border-radius:3px;background:#0b1220}'+
    '.cs-why{color:#d6e2ef;font:13px/1.45 "Segoe UI",sans-serif;margin:4px 0}.cs-meta{color:#8aa0b8;font:12px "Segoe UI",sans-serif}.cs-meta code{color:#b9c8d8}.cs-act{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}'+
    '.cs-pr{white-space:pre-wrap;background:#060a10;border:1px solid #1b2738;border-radius:6px;padding:10px;color:#cfdbea;font:12px/1.45 Consolas,monospace;max-height:360px;overflow:auto;margin:8px 0 0}'+
    '@media (max-width:600px){.cs-ideas{grid-template-columns:1fr}.cs-rv{margin-left:0}}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('cutstyle');
  if(typeof LTODO!=='undefined'){ LTODO.add({id:'cutidea',label:'🎬 Cut-scene styles: ☆ five of the ten first tries',where:'Cut-scene styles tab · bottom',done:function(){ return nIdeas()>=5; },go:function(){ LTODO.goTo('cutstyle','.cs-ideas',0); }});
    LTODO.add({id:'cuttext',label:'🖋 How should the words appear? (under, text cards, prologue)',where:'Cut-scene styles tab · How the words appear',done:function(){ return MODES.some(function(m){ return on('cuttext-'+m[0]); }); },go:function(){ LTODO.goTo('cutstyle','.cs-pl',0); }}); }
})();
