// ═══════════════════════════════════════════════════════════════════════
// ║ 79w-lab-cutlooks.js — CUT-SCENE LOOKS. Round 122b: four looks per finished cut-scene. Round 124 (Kris: "All of the pulse, storybook and dream
// ║ ones are very bad … Keep all of the 'saga' ones … create 3 new varieties … different types for each different video … We also need text to
// ║ come out during each image, which is paced with how you would read it. Some images are also OK not having any text"):
// ║  · each cut-scene: Saga + three looks of its own (fifteen editing styles in all, tools/video/cut_looks2.py LOOKS2)
// ║  · the words come out over the picture, phrase by phrase, at reading pace (each edit's "cues"); some shots carry none
// ║  · ★ the look for a cut-scene ('cutlook-<scene>'); ♥ a style to try on the other cut-scenes too ('cutstyle-<look>'); notes per cut-scene
// ║ The videos live in the Lab's asset store (LCUTLOOK, 79w-0-cutlooks-data.js, made by tools/video/cut_looks_lab.py).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LCUTLOOK==='undefined')return;
  var X=LCUTLOOK, esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var LK=X.LOOKS, src=function(c){ return c.url||('preview/looks/'+c.file); };
  var order=function(sc){ return ['saga'].concat(Object.keys(sc.looks).filter(function(l){ return l!=='saga'; })); };
  var card=function(sc,l){ var c=sc.looks[l], on=V('cutlook-'+sc.id)===l, lv=V('cutstyle-'+l)==='pick';
    return '<div class="cl-card'+(on?' on':'')+'" data-l="'+l+'"><div class="cl-fv"><video class="cl-vid" src="'+esc(src(c))+'#t=4" controls controlslist="nofullscreen" disablepictureinpicture preload="metadata" playsinline data-sc="'+sc.id+'" data-l="'+l+'"></video><div class="cl-ov"></div><button class="cl-fs" title="Full screen, with the words">⛶</button></div>'+
      '<div class="cl-t"><b>'+(l==='saga'?'Saga — epic widescreen <i class="cl-kept">kept from round 122 · new word timing</i>':esc(LK[l].name))+'</b> <small>'+c.length.toFixed(0)+' s</small><p>'+esc(LK[l].what)+'</p>'+
      '<button class="vbtn cl-pick'+(on?' on':'')+'" data-k="cutlook-'+sc.id+'" data-v="'+l+'">'+(on?'★ The look for this cut-scene':'☆ The look for this cut-scene')+'</button> '+
      (l==='saga'?'':'<button class="vbtn cl-like'+(lv?' on':'')+'" data-k="cutstyle-'+l+'">'+(lv?'♥ Try this style on others':'♡ Try this style on others')+'</button>')+'</div></div>'; };
  LAB_TABS.push({ id:'cutlook', name:'Cut-scene looks',
    blurb:'<b>Round 124 — fifteen new ways to cut, three for each cut-scene, beside the Saga cut you liked.</b> Every new look keeps Saga\'s letterbox, colour and grand camera, and tries a different way of editing — from painted cut-scenes (Elden Ring\'s prologue, Ken Burns reveals, motion-comic panels, chapter cards) and from film (one unbroken take, zoom-through cuts, rack focus, split screen, freeze-frames, smash cuts, wipes, a frame that changes shape). <b>The words now come out over each picture</b>, phrase by phrase, at reading pace (about 14 letters a second), and some pictures carry no words so you can take them in. ★ the look for each cut-scene; ♥ any style you would like to see tried on the other cut-scenes; notes on what to change. ⛶ full screen keeps the words.',
    designs:X.scenes.map(function(s){ return {id:s.id,name:'Look: '+s.name}; }).concat(Object.keys(LK).filter(function(l){ return l!=='saga'; }).map(function(l){ return {id:l,name:'Style: '+LK[l].name}; })),
    render:function(){ var h='';
      X.scenes.forEach(function(sc){ h+=LBR.sec('🎬 '+esc(sc.name),sc.frames+' frames · '+sc.shots+' shots you kept · Saga + '+(order(sc).length-1)+' new looks');
        h+='<div class="cl-grid">'+order(sc).map(function(l){ return card(sc,l); }).join('')+'</div>';
        h+='<textarea class="cl-n cl-note" data-k="cutlook-'+sc.id+'" placeholder="What to change in the look you like — pace, the words, a transition, the colour, a camera move…">'+esc(P('cutlook-'+sc.id).notes||'')+'</textarea>'; });
      if(X.waiting)h+='<p class="cl-wait">'+X.waiting+' more cut-scenes join this tab as soon as every one of their frames is picked in Shot series — pick.</p>';
      return h; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'cutlook2',label:'🎬 Cut-scene looks: Saga + three new looks for each of the '+X.scenes.length+' finished cut-scenes — ★ one each, ♥ the styles to try elsewhere',where:'Cut-scene looks tab',
    done:function(){ return X.scenes.every(function(s){ return !!V('cutlook-'+s.id); }); },go:function(){ LTODO.goTo('cutlook','.cl-grid',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('cutlook')<0)LAB_ACTIVE.unshift('cutlook');
  var set=function(k,v){ var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===v?null:v; LabApp.persist(k); return p.verdict; };
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.cl-fs'); if(b){ var w=b.closest('.cl-fv'); if(document.fullscreenElement)document.exitFullscreen(); else if(w&&w.requestFullscreen)w.requestFullscreen(); return; }
    var lk=e.target.closest&&e.target.closest('.cl-like'); if(lk){ var nv0=set(lk.dataset.k,'pick'); [].forEach.call(document.querySelectorAll('.cl-like[data-k="'+lk.dataset.k+'"]'),function(x){ x.classList.toggle('on',!!nv0); x.textContent=nv0?'♥ Try this style on others':'♡ Try this style on others'; }); return; }
    var p=e.target.closest&&e.target.closest('.cl-pick'); if(p){ var nv2=set(p.dataset.k,p.dataset.v), grid=p.closest('.cl-grid');
      [].forEach.call(grid.querySelectorAll('.cl-card'),function(c){ var on=c.dataset.l===nv2, bt=c.querySelector('.cl-pick'); c.classList.toggle('on',on); if(bt){ bt.classList.toggle('on',on); bt.textContent=on?'★ The look for this cut-scene':'☆ The look for this cut-scene'; } }); } });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.cl-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  document.addEventListener('fullscreenchange',function(){ var f=document.fullscreenElement; if(f&&f.classList&&f.classList.contains('cl-vid')){ var w=f.closest('.cl-fv'); document.exitFullscreen().then(function(){ if(w)w.requestFullscreen(); }); } });
  document.addEventListener('play',function(e){ var v=e.target; if(!v.classList||!v.classList.contains('cl-vid'))return; if(!v._started){ v._started=1; v.currentTime=0; }
    [].forEach.call(document.querySelectorAll('.cl-vid'),function(o){ if(o!==v&&!o.paused)o.pause(); }); },true);
  /* the words: the cue of the moment, its phrases appearing one after another, all fading together at its end */
  document.addEventListener('timeupdate',function(e){ var v=e.target; if(!v.classList||!v.classList.contains('cl-vid')||!v._started)return; var sc=X.scenes.find(function(s){ return s.id===v.dataset.sc; }), c=sc&&sc.looks[v.dataset.l]; if(!c)return;
    var t=v.currentTime, ov=v.parentNode.querySelector('.cl-ov'), q=(c.cues||[]).find(function(x){ return t>=x[0]-0.05&&t<x[1]; });
    if(!q){ if(ov._q){ ov._q=null; ov.classList.add('out'); } return; }
    if(ov._q!==q){ ov._q=q; ov.className='cl-ov st-'+q[3]; ov.innerHTML=q[2].map(function(p){ return '<span>'+esc(p[0])+'</span>'; }).join(' '); }
    [].forEach.call(ov.children,function(s,i){ if(t>=q[2][i][1]-0.05)s.classList.add('in'); }); ov.classList.toggle('out',t>q[1]-0.45); },true);
  var st=document.createElement('style'); st.textContent='.cl-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cl-card{border:1px solid #243246;border-radius:10px;background:#0b121c;overflow:hidden}.cl-card.on{border-color:#ffd76a;box-shadow:0 0 0 2px rgba(255,215,106,.35)}'+
    '.cl-fv{position:relative;background:#000;container-type:inline-size}.cl-vid{width:100%;display:block;aspect-ratio:16/9;background:#000}'+
    '.cl-ov{position:absolute;left:4%;right:4%;bottom:2.2%;text-align:center;color:#f4ecd8;font:italic 600 3.3cqw/1.3 Georgia,serif;text-shadow:0 1px 2px #000,0 0 10px rgba(0,0,0,.85);pointer-events:none;transition:opacity .45s}.cl-ov.out{opacity:0}'+
    '.cl-ov span{display:inline-block;opacity:0;transform:translateY(6px);transition:opacity .5s,transform .6s}.cl-ov span.in{opacity:1;transform:none}'+
    '.cl-ov.st-lower{bottom:7%;font-size:3.6cqw}.cl-ov.st-card{top:0;bottom:0;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:0 .35em;font-size:4.6cqw;padding:0 8%}'+
    '.cl-fs{position:absolute;right:8px;top:8px;z-index:2;background:rgba(0,0,0,.55);color:#fff;border:1px solid #888;border-radius:6px;font-size:16px;padding:1px 7px;cursor:pointer}'+
    '.cl-fv:fullscreen{display:flex;flex-direction:column;justify-content:center}.cl-fv:fullscreen .cl-vid{width:100vw;height:auto;max-height:100vh;object-fit:contain}'+
    '.cl-t{padding:7px 10px 10px;font:12.5px/1.4 "Segoe UI";color:#b8c6da}.cl-t b{color:#ffe9a8;font:600 14px Georgia,serif}.cl-kept{font:italic 11.5px "Segoe UI";color:#9fb0c8}.cl-t p{margin:3px 0 6px}.cl-pick,.cl-like{font-size:12px;padding:3px 9px}.cl-pick.on{background:#5a4a14;border-color:#ffd76a;color:#fff}.cl-like.on{background:#5a1f3a;border-color:#ff9ac8;color:#fff}'+
    '.cl-note{width:100%;box-sizing:border-box;min-height:44px;margin:8px 0 16px;font-size:12.5px}.cl-wait{color:#8a9ab0;font-size:12.5px}@media (max-width:760px){.cl-grid{grid-template-columns:1fr}}';
  document.head.appendChild(st);
})();
