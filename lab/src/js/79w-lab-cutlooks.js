// ═══════════════════════════════════════════════════════════════════════
// ║ 79w-lab-cutlooks.js — round 122b: CUT-SCENE LOOKS (Kris: "a new portion of the lab where my picks for the images get turned into 4 different
// ║ cinematic versions of the cut-scene for me to select from, with different timings and effects, trying to make different looks and moods
// ║ for the cut-scene videos. Do this for the completed ones so far").
// ║ Every cut-scene whose frames are all picked (Shot series — pick) is cut four ways by tools/video/cut_looks.py — Saga, Pulse, Storybook,
// ║ Dream — and shown here side by side, each with its words under it as the game shows them. ★ one look per cut-scene ('cutlook-<scene>'),
// ║ or one look for them all ('cutlook-all'), with notes. The videos live in the Lab's asset store (LCUTLOOK, 79w-0-cutlooks-data.js).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LCUTLOOK==='undefined')return;
  var X=LCUTLOOK, esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var LK=X.LOOKS, ORDER=['saga','pulse','storybook','dream'];
  var src=function(c){ return c.url||('preview/looks/'+c.file); };
  var seg=function(k,cls){ var v=V(k); return '<span class="cl-seg" data-k="'+k+'">'+ORDER.map(function(l){ return '<button class="vbtn cl-sg'+(v===l?' on':'')+'" data-v="'+l+'">'+(v===l?'★ ':'☆ ')+esc(LK[l].short)+'</button>'; }).join('')+'</span>'; };
  var card=function(sc,l){ var c=sc.looks[l]; if(!c)return '<div class="cl-card cl-miss">'+esc(LK[l].name)+' — rendering…</div>'; var on=V('cutlook-'+sc.id)===l;
    return '<div class="cl-card'+(on?' on':'')+'" data-l="'+l+'"><div class="cl-fv"><video class="cl-vid" src="'+esc(src(c))+'#t=3" controls controlslist="nofullscreen" disablepictureinpicture preload="metadata" playsinline data-sc="'+sc.id+'" data-l="'+l+'"></video><div class="cl-fw"></div><button class="cl-fs" title="Full screen, with the words">⛶</button></div>'+
      '<div class="cl-t"><b>'+esc(LK[l].name)+'</b> <small>'+c.length.toFixed(0)+' s</small><p>'+esc(LK[l].what)+'</p>'+
      '<button class="vbtn cl-pick'+(on?' on':'')+'" data-k="cutlook-'+sc.id+'" data-v="'+l+'">'+(on?'★ The look for this cut-scene':'☆ Pick this look')+'</button></div></div>'; };
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('cutlook')<0)LAB_ACTIVE.unshift('cutlook');
  LAB_TABS.push({ id:'cutlook', name:'Cut-scene looks',
    blurb:'<b>Round 122 — your picks, cut four ways.</b> Every cut-scene whose shots you have picked in every frame (Shot series — pick) is cut here in four cinematic looks — the same shots in your order, the same words, but different pacing, camera, transitions and colour. ★ the look you want for each cut-scene, or one for them all, and say what to change. The words show under each video as the game shows them (⛶ keeps them in full screen). Zeldara\'s versions are not asked for until every cut-scene is picked.',
    designs:[{id:'all',name:'One look for every cut-scene'}].concat(X.scenes.map(function(s){ return {id:s.id,name:'Look: '+s.name}; })),
    render:function(){ var h='<div class="cl-looks">'+ORDER.map(function(l){ return '<div class="cl-lk"><b>'+esc(LK[l].name)+'</b><span>'+esc(LK[l].what)+'</span></div>'; }).join('')+'</div>';
      h+='<div class="cl-all"><b>One look for every cut-scene?</b> '+seg('cutlook-all')+'<input class="tl-n cl-n" data-k="cutlook-all" value="'+esc(P('cutlook-all').notes||'')+'" placeholder="Or mix them — e.g. Saga for the fights, Storybook for the quiet ones…"></div>';
      X.scenes.forEach(function(sc){ h+=LBR.sec('🎬 '+esc(sc.name),sc.frames+' frames · '+sc.shots+' shots you kept · '+ORDER.filter(function(l){ return sc.looks[l]; }).length+' looks');
        h+='<div class="cl-grid">'+ORDER.map(function(l){ return card(sc,l); }).join('')+'</div>';
        h+='<textarea class="cl-n cl-note" data-k="cutlook-'+sc.id+'" placeholder="What to change in the look you like — pace, a transition, the colour, a camera move…">'+esc(P('cutlook-'+sc.id).notes||'')+'</textarea>'; });
      if(X.waiting)h+='<p class="cl-wait">'+X.waiting+' more cut-scenes join this tab as soon as every one of their frames is picked in Shot series — pick.</p>';
      return h; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'cutlook',label:'🎬 Cut-scene looks: ★ one of four cinematic versions for each finished cut-scene ('+X.scenes.length+')',where:'Cut-scene looks tab',
    done:function(){ return !!V('cutlook-all')||X.scenes.every(function(s){ return !!V('cutlook-'+s.id); }); },go:function(){ LTODO.goTo('cutlook','.cl-grid',0); }});
  var set=function(k,v){ var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===v?null:v; LabApp.persist(k); return p.verdict; };
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.cl-fs'); if(b){ var w=b.closest('.cl-fv'); if(document.fullscreenElement)document.exitFullscreen(); else if(w&&w.requestFullscreen)w.requestFullscreen(); return; }
    var g=e.target.closest&&e.target.closest('.cl-sg'); if(g){ var s=g.parentNode, nv=set(s.dataset.k,g.dataset.v); [].forEach.call(s.children,function(x){ x.className='vbtn cl-sg'+(x.dataset.v===nv?' on':''); x.textContent=(x.dataset.v===nv?'★ ':'☆ ')+LK[x.dataset.v].short; }); return; }
    var p=e.target.closest&&e.target.closest('.cl-pick'); if(p){ var nv2=set(p.dataset.k,p.dataset.v), grid=p.closest('.cl-grid');
      [].forEach.call(grid.querySelectorAll('.cl-card'),function(c){ var on=c.dataset.l===nv2, bt=c.querySelector('.cl-pick'); c.classList.toggle('on',on); if(bt){ bt.classList.toggle('on',on); bt.textContent=on?'★ The look for this cut-scene':'☆ Pick this look'; } }); } });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.cl-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  document.addEventListener('fullscreenchange',function(){ var f=document.fullscreenElement; if(f&&f.classList&&f.classList.contains('cl-vid')){ var w=f.closest('.cl-fv'); document.exitFullscreen().then(function(){ if(w)w.requestFullscreen(); }); } });
  document.addEventListener('play',function(e){ var v=e.target; if(!v.classList||!v.classList.contains('cl-vid'))return; if(!v._started){ v._started=1; v.currentTime=0; }
    [].forEach.call(document.querySelectorAll('.cl-vid'),function(o){ if(o!==v&&!o.paused)o.pause(); }); },true);
  document.addEventListener('timeupdate',function(e){ var v=e.target; if(!v.classList||!v.classList.contains('cl-vid')||!v._started)return; var sc=X.scenes.find(function(s){ return s.id===v.dataset.sc; }), c=sc&&sc.looks[v.dataset.l]; if(!c)return;
    var t=v.currentTime, f=c.words.find(function(x){ return t>=x[0]&&t<x[1]; }), txt=f?f[2]:'', w=v.parentNode.querySelector('.cl-fw');
    if(w._t!==txt){ w._t=txt; w.classList.remove('on'); setTimeout(function(){ w.textContent=txt; w.classList.add('on'); },220); } },true);
  var st=document.createElement('style'); st.textContent='.cl-looks{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:6px 0 10px}.cl-lk{background:#0f1622;border:1px solid #2a3446;border-radius:8px;padding:6px 9px;font:12.5px/1.4 "Segoe UI";color:#b8c6da}.cl-lk b{display:block;color:#ffe9a8;font:600 14px Georgia,serif;margin-bottom:2px}'+
    '.cl-all{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0 4px;padding:8px 10px;background:#121722;border:1px solid #2a3446;border-radius:9px}.cl-all .cl-n{flex:1 1 280px}.cl-sg{padding:3px 9px;font-size:12px;opacity:.8}.cl-sg.on{opacity:1;background:#5a4a14;border-color:#ffd76a;color:#fff}'+
    '.cl-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cl-card{border:1px solid #243246;border-radius:10px;background:#0b121c;overflow:hidden}.cl-card.on{border-color:#ffd76a;box-shadow:0 0 0 2px rgba(255,215,106,.35)}.cl-miss{padding:30px;color:#6a7a8e;text-align:center}'+
    '.cl-fv{position:relative;background:#000}.cl-vid{width:100%;display:block;aspect-ratio:16/9;background:#000}.cl-fw{min-height:46px;padding:6px 16px;color:#f2ead8;font:italic 600 16px/1.35 Georgia,serif;text-align:center;opacity:0;transition:opacity .5s}.cl-fw.on{opacity:1}'+
    '.cl-fs{position:absolute;right:8px;top:8px;z-index:2;background:rgba(0,0,0,.55);color:#fff;border:1px solid #888;border-radius:6px;font-size:16px;padding:1px 7px;cursor:pointer}'+
    '.cl-fv:fullscreen{display:flex;flex-direction:column;justify-content:center}.cl-fv:fullscreen .cl-vid{width:100vw;height:auto;max-height:86vh;object-fit:contain}.cl-fv:fullscreen .cl-fw{position:absolute;left:0;right:0;bottom:4vh;font-size:3.4vh;text-shadow:0 2px 8px #000}'+
    '.cl-t{padding:7px 10px 10px;font:12.5px/1.4 "Segoe UI";color:#b8c6da}.cl-t b{color:#ffe9a8;font:600 14px Georgia,serif}.cl-t p{margin:3px 0 6px}.cl-pick.on{background:#5a4a14;border-color:#ffd76a;color:#fff}'+
    '.cl-note{width:100%;box-sizing:border-box;min-height:44px;margin:8px 0 16px;font-size:12.5px}.cl-wait{color:#8a9ab0;font-size:12.5px}'+
    '@media (max-width:760px){.cl-grid,.cl-looks{grid-template-columns:1fr}}';
  document.head.appendChild(st);
})();
