// ═══════════════════════════════════════════════════════════════════════
// ║ 79n-lab-cutvideo.js — round 89e: THE FIRST KLING MONTAGE, TWO WAYS TO READ IT (Kris: "the first opening video is in and it looks great!
// ║ i am a little worried about the text to be read is too long … put the text below like for the current 20 second video, and then just
// ║ stretch the video to 30 seconds for the 6 image montage. put both versions in the Lab for me to consider").
// ║ The opening's first part (6 pictures): A — as made, 20 s (3.3 s a line); B — slowed to 30 s (5 s a line; the in-between frames
// ║ made by motion interpolation). Both with each shot's line under the picture, in time with it, and the game's own music under them
// ║ (the videos' sound is never used — the game plays its music under every cut-scene). ☆ the one to use for every montage.
// ║ Picks: 'cutvid-<id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined')return;
  var SC=typeof ZSB!=='undefined'&&ZSB.SCENES?ZSB.SCENES.find(function(s){ return s.id==='opening'; }):null;
  var CAPS=SC?SC.beats.slice(0,6).map(function(b){ return String(b.cap||'').replace(/\{H\}/g,'Zeldor').replace(/\{O\}/g,'Zeldara'); }):[];
  var V=[{id:'opening_20',name:'A · as made — 20 seconds',file:'preview/cutscene/opening_p1_20s.mp4',secs:20,desc:'Kling\'s video as it came: each picture and its line for about 3.3 seconds.'},
         {id:'opening_30',name:'B · slowed to 30 seconds',file:'preview/cutscene/opening_p1_30s.mp4',secs:30,desc:'The same video slowed to 30 seconds — 5 seconds a line; the frames in between are made by motion interpolation, so it stays smooth.'},
         {id:'opening_40',name:'C · slowed to 40 seconds (round 92b)',file:'preview/cutscene/opening_p1_40s.mp4',secs:40,desc:'Kris: "much better, but we actually need to make it more like 40 seconds in total" — the same video at 40 seconds, 6.7 s a line.'}];
  var MUSIC='preview/music/mu_saga_storm.mp3';
  var key=function(id){ return 'cutvid-'+id; }, picked=function(id){ var p=LabApp.picks[key(id)]; return !!(p&&p.verdict==='pick'); };
  var card=function(D){ var p=LabApp.picks[key(D.id)]||{};
    return '<article class="cv-card'+(picked(D.id)?' on':'')+'" data-id="'+D.id+'"><div class="cv-frame"><video class="cv-v" data-id="'+D.id+'" src="'+D.file+'" preload="metadata" playsinline muted></video>'+
      '<div class="cv-cap" data-id="'+D.id+'">▶ to play</div></div>'+
      '<div class="cv-t"><b>'+D.name+'</b><p>'+D.desc+'</p><div class="cv-act"><button class="vbtn cv-play" data-id="'+D.id+'">▶ Play with the music</button><button class="vbtn cv-pick" data-id="'+D.id+'" aria-pressed="'+picked(D.id)+'">'+(picked(D.id)?'★ Picked':'☆ Pick')+'</button></div>'+
      '<textarea class="mn-notes cv-notes" data-id="'+D.id+'" rows="1" placeholder="Notes…">'+String(p.notes||'').replace(/</g,'&lt;')+'</textarea></div></article>'; };
  var mus=null, stopAll=function(){ document.querySelectorAll('.cv-v').forEach(function(v){ v.pause(); }); if(mus){ mus.pause(); } };
  LAB_TABS.push({ id:'cutvid', name:'Cut-scene videos',
    blurb:'<b>Round 89 — the first montage, two ways.</b> The opening\'s first part from Kling (6 pictures). <b>A</b> as made, 20 s; <b>B</b> slowed to 30 s so each line has 5 s to read. Each shot\'s line sits under the picture, in time with it, and the game\'s own music plays under it — the videos\' sound is never used. ☆ the one to use for every montage.',
    designs:V.map(function(d){ return {id:d.id,name:d.name}; }),
    render:function(){ return LBR.sec('The opening, part 1','6 pictures · the line under the picture · the game\'s music')+'<div class="cv-grid">'+V.map(card).join('')+'</div>'+
      '<div class="sm-legend">The lines: '+CAPS.map(function(c,i){ return '<b>'+(i+1)+'</b> '+c; }).join(' · ')+'</div>'; } });
  var tick=function(){ document.querySelectorAll('.cv-v').forEach(function(v){ var D=V.find(function(x){ return x.id===v.dataset.id; }), el=document.querySelector('.cv-cap[data-id="'+v.dataset.id+'"]'); if(!D||!el||v.paused&&!v.currentTime)return;
      var i=Math.min(CAPS.length-1,Math.floor(v.currentTime/(D.secs/CAPS.length))); if(el._i!==i){ el._i=i; el.textContent=CAPS[i]||''; } }); requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.cv-play'); if(b){ var v=document.querySelector('.cv-v[data-id="'+b.dataset.id+'"]'); if(!v)return; var was=!v.paused; stopAll(); if(was)return;
      v.currentTime=0; if(!mus){ mus=new Audio(MUSIC); mus.volume=0.8; } try{ mus.currentTime=0; mus.play(); }catch(x){} v.play(); v.onended=function(){ if(mus){ var a=mus, t0=Date.now(), f=setInterval(function(){ a.volume=Math.max(0,0.8*(1-(Date.now()-t0)/1500)); if(a.volume<=0){ a.pause(); a.volume=0.8; clearInterval(f); } },60); } }; return; }
    var pk=e.target.closest&&e.target.closest('.cv-pick'); if(pk){ var id=pk.dataset.id, k=key(id), p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=picked(id)?null:'pick'; LabApp.persist(k);
      document.querySelectorAll('.cv-pick').forEach(function(x){ var on=picked(x.dataset.id); x.setAttribute('aria-pressed',String(on)); x.textContent=on?'★ Picked':'☆ Pick'; x.closest('.cv-card').classList.toggle('on',on); }); } });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.cv-notes'); if(t){ var k=key(t.dataset.id), p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=t.value; LabApp.persist(k); } });
  var st=document.createElement('style'); st.textContent='.cv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(520px,1fr));gap:16px;margin:8px 0 18px}.cv-card{background:#0d1420;border:1px solid #24364e;border-radius:10px;overflow:hidden}.cv-card.on{border-color:#7fe08a}'+
    '.cv-frame{background:#000}.cv-v{display:block;width:100%;aspect-ratio:16/9;background:#000}.cv-cap{min-height:58px;padding:10px 16px;color:#f2e3b0;font:italic 17px/1.4 Georgia,serif;text-align:center;background:#06090f;border-top:1px solid #1b2738}'+
    '.cv-t{padding:10px 14px}.cv-t p{color:#8aa0b8;font:13px/1.4 "Segoe UI",sans-serif;margin:4px 0 8px}.cv-act{display:flex;gap:8px}.cv-pick[aria-pressed="true"]{background:#2a5a3a;border-color:#7fe08a}.cv-notes{width:100%;margin-top:8px}'+
    '@media (max-width:600px){.cv-grid{grid-template-columns:1fr}}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('cutvid');
  if(typeof LTODO!=='undefined')LTODO.add({id:'cutvid',label:'🎬 The first montage: 20 s or 30 s?',where:'Cut-scene videos tab · ☆ one',done:function(){ return V.some(function(d){ return picked(d.id); }); },go:function(){ LTODO.goTo('cutvid','.cv-grid',0); }});
})();
