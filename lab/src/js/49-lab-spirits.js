// ═══════════════════════════════════════════════════════════════════════
// ║ SPIRIT FAMILIARS, FAIRIES + FAMILIAR TRIALS tabs (src/js/07w-spirits.js)
// ║ Kris picks: 1 familiar per element (grass/water/earth/fire), 1 fairy
// ║ look per quadrant, and which trial ideas the fairies use. The game runs
// ║ with the ★ defaults until the picks are applied.
// ═══════════════════════════════════════════════════════════════════════
var SPT={ vis:new Set(), anims:[],
  card:function(tab,id,title,sub,body,canvasW,canvasH,dflt){ var p=LabApp.picks[tab+'-'+id]||{};
    return '<article class="mn-card sp-card" data-tab="'+tab+'" data-cid="'+id+'" data-verdict="'+(p.verdict||'')+'">'+
      (canvasW?'<div class="mn-top"><canvas class="sp-cv" width="'+canvasW+'" height="'+canvasH+'" data-tab="'+tab+'" data-cid="'+id+'" style="background:radial-gradient(circle,#1c2a3a,#0a1018);border-radius:10px"></canvas><div class="mn-head"><b>'+title+(dflt?' <span title="in the game now" style="color:var(--pick)">★</span>':'')+'</b><span class="mn-role">'+sub+'</span></div></div>':'<div class="mn-head"><b>'+title+(dflt?' <span style="color:var(--pick)">★</span>':'')+'</b><span class="mn-role">'+sub+'</span></div>')+
      '<dl>'+body+'</dl><div class="sp-actions">'+[['pick','Use this'],['maybe','Maybe'],['no','No']].map(function(v){ return '<button class="vbtn sp2-v" data-tab="'+tab+'" data-cid="'+id+'" data-v="'+v[0]+'" aria-pressed="'+(p.verdict===v[0])+'">'+v[1]+'</button>'; }).join('')+'</div>'+
      '<textarea class="mn-notes sp2-notes" data-tab="'+tab+'" data-cid="'+id+'" rows="2" placeholder="Notes (optional)">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea></article>'; },
  bind:function(){ var self=this; if(this._io)this._io.disconnect(); this.vis.clear();
    this._io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting)self.vis.add(e.target); else self.vis.delete(e.target); }); },{rootMargin:'100px'});
    document.querySelectorAll('.sp-cv').forEach(function(cv){ self._io.observe(cv); cv._fr=cv.dataset.tab==='spirits'?spiritFrames(SPIRIT_BY_ID[cv.dataset.cid]):fairyFrames(FAIRY_BY_ID[cv.dataset.cid]); });
    if(!this._raf)this._loop(); },
  _loop:function(){ var self=this; this._raf=requestAnimationFrame(function(t){ self._raf=null; if(['spirits','fairies'].indexOf(LabApp.tab)<0)return; var f=Math.floor(t/150)%4;
      self.vis.forEach(function(cv){ if(!cv.isConnected||cv._f===f)return; cv._f=f; var x=cv.getContext('2d'); x.clearRect(0,0,cv.width,cv.height); x.imageSmoothingEnabled=true; x.drawImage(cv._fr[f],0,0,cv.width,cv.height); }); self._loop(); }); },
  refresh:function(){ document.querySelectorAll('.sp-card').forEach(function(c){ var p=LabApp.picks[c.dataset.tab+'-'+c.dataset.cid]||{}; c.dataset.verdict=p.verdict||''; c.querySelectorAll('.sp2-v').forEach(function(b){ b.setAttribute('aria-pressed',String(p.verdict===b.dataset.v)); }); }); }
};
(function(){
  var EL=['grass','water','earth','fire'];
  LAB_TABS.push({ id:'spirits', name:'Familiars',
    blurb:'<b>12 spirit familiars</b> — glowing elemental spirits, 3 per element. Each quadrant\'s island gives its element: Grasslands 🌿 grass, Wetlands 💧 water, Highlands 🪨 earth, Ashlands 🔥 fire. <b>Pick one per element</b> (★ = in the game now). Hover spirits circle above you; follow spirits walk behind you.',
    designs:SPIRIT_DESIGNS.map(function(D){ return {id:D.id,name:D.name}; }),
    render:function(){ setTimeout(function(){ SPT.bind(); },0); return EL.map(function(el){ var E=SPIRIT_ELEMENTS[el];
      return '<h3 class="ch-sub" style="color:'+E.col+'">'+E.name+' — '+WM_REGION_NAMES[E.q]+'</h3><div class="mn-grid">'+SPIRIT_DESIGNS.filter(function(D){ return D.el===el; }).map(function(D){
        return SPT.card('spirits',D.id,D.name,D.tagline,'<dt>Looks</dt><dd>'+D.blurb+'</dd><dt>Moves</dt><dd>'+(D.move==='hover'?'Hovers and circles around you':'Walks along behind you')+'</dd><dt>Skills</dt><dd>'+FAM_SKILLS[el].map(function(S){ return S.name; }).join(' → ')+'</dd>',160,160,FAMILIAR_PICK[el]===D.id); }).join('')+'</div>'; }).join(''); } });
  LAB_TABS.push({ id:'fairies', name:'Fairies',
    blurb:'<b>Fairies</b> — 10 looks per quadrant; <b>pick one per quadrant</b> (★ = in the game now). Five fairies flit around each quadrant\'s runestones and teach your familiar its skills; the Wetlands, Highlands and Ashlands Fairy Kings wear a crown on the same look, three times the size.',
    designs:FAIRY_DESIGNS.map(function(F){ return {id:F.id,name:F.name}; }),
    render:function(){ setTimeout(function(){ SPT.bind(); },0); return [1,2,3,4].map(function(q){ return '<h3 class="ch-sub">'+WM_REGION_NAMES[q]+'</h3><div class="mn-grid">'+FAIRY_DESIGNS.filter(function(F){ return F.q===q; }).map(function(F){
        return SPT.card('fairies',F.id,F.name,WM_REGION_NAMES[q]+' fairy','<dt>Looks</dt><dd>'+F.look+'</dd>',96,96,FAIRY_PICK[q]===F.id); }).join('')+'</div>'; }).join(''); } });
  LAB_TABS.push({ id:'trials', name:'Familiar Trials',
    blurb:'<b>Familiar trials</b> — what your familiar must do after you bring a fairy her object. <b>Pick the ones you like</b> (the five fairies of each quadrant use them in order). ★ = in the game now; ideas without ✔ are not built yet — pick them and I\'ll build them. The Fairy King\'s trial is Hold the Circle + Shadow Duel.',
    designs:FAMILIAR_TRIALS.map(function(T){ return {id:T.id,name:T.name}; }),
    render:function(){ setTimeout(function(){ SPT.bind(); },0); return '<div class="mn-grid">'+FAMILIAR_TRIALS.map(function(T){ var used=FAMILIAR_TRIAL_PICK.indexOf(T.id);
      return SPT.card('trials',T.id,T.name,(T.ok?'✔ playable':'idea — not built yet')+(used>=0?' · fairy '+(used+1):T.id==='shadow_duel'?' · Fairy King':''),'<dt>Trial</dt><dd>'+T.text+'</dd>',0,0,used>=0||T.id==='shadow_duel'); }).join('')+'</div>'; } });
  var orig=LabApp.renderGrid;
  LabApp.renderGrid=function(quiet){ if(['spirits','fairies','trials'].indexOf(this.tab)>=0&&quiet&&document.querySelector('.sp-card')){ SPT.refresh(); this.renderTabs(); return; } return orig.call(this,quiet); };
  document.addEventListener('click',function(e){ var v=e.target.closest('.sp2-v'); if(!v)return; var k=v.dataset.tab+'-'+v.dataset.cid, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===v.dataset.v?null:v.dataset.v; LabApp.persist(k); SPT.refresh(); LabApp.renderTabs(); });
  document.addEventListener('input',function(e){ var ta=e.target.closest&&e.target.closest('.sp2-notes'); if(!ta)return; var k=ta.dataset.tab+'-'+ta.dataset.cid, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=ta.value; LabApp.persist(k,900); });
})();
