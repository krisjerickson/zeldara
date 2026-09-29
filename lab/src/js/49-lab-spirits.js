// ═══════════════════════════════════════════════════════════════════════
// ║ SPIRIT FAMILIARS, FAIRIES, FAIRY MONARCHS + FAMILIAR TRIALS tabs
// ║ (src/js/07w-spirits.js, 07x-fairies2.js, 07y-trial-arenas.js)
// ║ Kris picks: 1 familiar per element, 5 fairy looks per quadrant, 1 monarch
// ║ per quadrant (Wetlands/Highlands/Ashlands), and reviews the 23 trials.
// ═══════════════════════════════════════════════════════════════════════
var SPT={ vis:new Set(), anims:[],
  card:function(tab,id,title,sub,body,canvasW,canvasH,dflt){ var p=LabApp.picks[tab+'-'+id]||{};
    return '<article class="mn-card sp-card" data-tab="'+tab+'" data-cid="'+id+'" data-verdict="'+(p.verdict||'')+'">'+
      (canvasW?'<div class="mn-top"><canvas class="sp-cv" width="'+canvasW+'" height="'+canvasH+'" data-tab="'+tab+'" data-cid="'+id+'" style="background:radial-gradient(circle,#1c2a3a,#0a1018);border-radius:10px"></canvas><div class="mn-head"><b>'+title+(dflt?' <span title="in the game now" style="color:var(--pick)">★</span>':'')+'</b><span class="mn-role">'+sub+'</span></div></div>':'<div class="mn-head"><b>'+title+(dflt?' <span style="color:var(--pick)">★</span>':'')+'</b><span class="mn-role">'+sub+'</span></div>')+
      '<dl>'+body+'</dl><div class="sp-actions">'+[['pick','Use this'],['maybe','Maybe'],['no','No']].map(function(v){ return '<button class="vbtn sp2-v" data-tab="'+tab+'" data-cid="'+id+'" data-v="'+v[0]+'" aria-pressed="'+(p.verdict===v[0])+'">'+v[1]+'</button>'; }).join('')+'</div>'+
      '<textarea class="mn-notes sp2-notes" data-tab="'+tab+'" data-cid="'+id+'" rows="2" placeholder="Notes (optional)">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea></article>'; },
  bind:function(){ var self=this; if(this._io)this._io.disconnect(); this.vis.clear();
    this._io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting)self.vis.add(e.target); else self.vis.delete(e.target); }); },{rootMargin:'100px'});
    document.querySelectorAll('.sp-cv').forEach(function(cv){ self._io.observe(cv); var t=cv.dataset.tab, id=cv.dataset.cid; cv._fr=t==='spirits'?spiritFrames(SPIRIT_BY_ID[id]):t==='monarchs'?monarchFrames(FAIRY_MONARCH_BY_ID[id]):t==='trials'?null:fairyFrames(FAIRY_BY_ID[id]); });
    if(!this._raf)this._loop(); },
  _loop:function(){ var self=this; this._raf=requestAnimationFrame(function(t){ self._raf=null; if(['spirits','fairies','monarchs','trials'].indexOf(LabApp.tab)<0)return; var f=Math.floor(t/150)%4;
      self.vis.forEach(function(cv){ if(!cv.isConnected)return; if(cv.dataset.tab==='trials'){ if(!cv._done){ cv._done=true; SPT.trialPreview(cv); } return; } if(cv._f===f)return; cv._f=f; var x=cv.getContext('2d'); x.clearRect(0,0,cv.width,cv.height); x.imageSmoothingEnabled=true; x.drawImage(cv._fr[f],0,0,cv.width,cv.height); }); self._loop(); }); },
  trialPreview:function(cv){ var id=cv.dataset.cid, q, run; if(id.charAt(0)==='m'){ q=+id.slice(1); run={q:q,i:9,stages:MONARCH_TRIAL_PLAN[q],stage:0,tier:q+1,seed:1000+q*97+9*13}; } else { q=+id.charAt(1); var i=+id.split('_f')[1]; run={q:q,i:i,stages:[FAIRY_TRIAL_PLAN[q][i][0]],stage:0,tier:q,seed:1000+q*97+i*13}; }
    try{ var m=_trialBuild(run), x=cv.getContext('2d'), s=Math.min(cv.width/m.base.width,cv.height/m.base.height); x.fillStyle=(TRIAL_PAL[q]||TRIAL_PAL[1]).void; x.fillRect(0,0,cv.width,cv.height); x.imageSmoothingEnabled=true; x.drawImage(m.base,(cv.width-m.base.width*s)/2,(cv.height-m.base.height*s)/2,m.base.width*s,m.base.height*s); SPT.trialMarks(x,m,run,s,(cv.width-m.base.width*s)/2,(cv.height-m.base.height*s)/2); }catch(e){ console.error(e); } },
  trialMarks:function(x,m,run,s,ox,oy){ var L=m.trial, P=TRIAL_PAL[run.q]||TRIAL_PAL[1], X=function(t){ return ox+(t+0.5)*LT*s; }, Y=function(t){ return oy+(t+0.5)*LT*s; }, dot=function(tx,ty,r,col){ x.fillStyle=col; x.beginPath(); x.arc(X(tx),Y(ty),r,0,Math.PI*2); x.fill(); };
    if(L.puzzle){ var tr=_trBeamTrace(L.puzzle); L.puzzle.targets.forEach(function(t){ dot(t.x,t.y,3,P.glow); }); L.puzzle.mirrors.forEach(function(mm){ x.strokeStyle='#e8f0ff'; x.lineWidth=2; x.beginPath(); var d=mm.o==='/'?1:-1; x.moveTo(X(mm.x)-4,Y(mm.y)+4*d); x.lineTo(X(mm.x)+4,Y(mm.y)-4*d); x.stroke(); }); x.strokeStyle='rgba(255,240,160,.8)'; x.lineWidth=1.5; x.beginPath(); tr.pts.forEach(function(p,i){ if(i)x.lineTo(X(p.x),Y(p.y)); else x.moveTo(X(p.x),Y(p.y)); }); x.stroke(); }
    if(L.walk){ var W=L.walk; for(var r=0;r<W.rows;r++)for(var c=0;c<W.cols;c++){ x.fillStyle='#6a6680'; x.fillRect(X(W.x0+c)-LT*s*0.45,Y(W.y0+W.rows-1-r)-LT*s*0.45,LT*s*0.9,LT*s*0.9); } dot(W.spire.x,W.spire.y,4,P.glow); }
    if(L.maze){ L.maze.wisps.forEach(function(w){ dot(w.x,w.y,2.5,P.glow); }); dot(L.maze.gate.x,L.maze.gate.y,3,'#ffffff'); }
    if(L.soko){ L.soko.goals.forEach(function(g){ x.strokeStyle=P.glow; x.lineWidth=1.5; x.beginPath(); x.arc(X(g.x),Y(g.y),3.5,0,Math.PI*2); x.stroke(); }); L.soko.boulders.forEach(function(b){ dot(b.x,b.y,3.5,'#9a96a8'); }); }
    if(L.mirror){ L.mirror.runes.forEach(function(r){ dot(r.x,r.y,2.5,P.glow); }); L.mirror.fires.forEach(function(f){ dot(f.x,f.y,2.5,'#c060ff'); }); }
    if(L.beam){ L.beam.pylons.forEach(function(p){ dot(p.x,p.y,3,'#fff080'); x.strokeStyle='rgba(255,240,128,.5)'; x.beginPath(); x.moveTo(X(p.x),Y(p.y)); x.lineTo(X(p.x)+Math.cos(p.a)*p.len*LT*s,Y(p.y)+Math.sin(p.a)*p.len*LT*s); x.stroke(); }); L.beam.shards.forEach(function(sh){ dot(sh.x,sh.y,2.5,'#fff0a0'); }); }
  },
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
    blurb:'<b>Fairies</b> — every fairy in a quadrant now looks different, so <b>pick 5 per quadrant</b> (one for each of its five fairies). ★1…★5 = the look each fairy has in the game now, in order (your earlier picks come first). The <b>15 new looks</b> per quadrant are fairy riders, knights, sages, imps, orbs, jellyfish, mermaids, wisps and more; the 10 <i>classic</i> looks are still here too.',
    designs:FAIRY_DESIGNS.map(function(F){ return {id:F.id,name:F.name}; }),
    render:function(){ setTimeout(function(){ SPT.bind(); },0); return [1,2,3,4].map(function(q){ var L=FAIRY_DESIGNS.filter(function(F){ return F.q===q; }).sort(function(a,b){ var ia=FAIRY_PICK[q].indexOf(a.id), ib=FAIRY_PICK[q].indexOf(b.id); return (ia<0?99:ia)-(ib<0?99:ib)||(a.v2?0:1)-(b.v2?0:1); });
      return '<h3 class="ch-sub">'+WM_REGION_NAMES[q]+' — pick 5</h3><div class="mn-grid">'+L.map(function(F){ var slot=FAIRY_PICK[q].indexOf(F.id);
        return SPT.card('fairies',F.id,F.name+(slot>=0?' <span style="color:var(--pick)">★'+(slot+1)+'</span>':''),(F.v2?'New':'Classic')+' · '+WM_REGION_NAMES[q]+(F.v2?' · '+({rider:'rider',pixie:'pixie',knight:'knight',sage:'sage',imp:'imp',orb:'orb',flower:'flower fairy',jelly:'jelly fairy',mermaid:'mermaid',wisp:'wisp',crystal:'crystal fairy'}[F.body]||F.body):''),'<dt>Looks</dt><dd>'+F.look+'</dd>',96,96,false); }).join('')+'</div>'; }).join(''); } });
  LAB_TABS.push({ id:'monarchs', name:'Fairy Monarchs',
    blurb:'<b>Fairy Monarchs</b> — the Wetlands, Highlands and Ashlands each have a tall, angel-like fairy king or queen in their great rune henge (their trial unlocks one more active familiar). <b>Pick one per quadrant</b> (★ = in the game now).',
    designs:FAIRY_MONARCHS.map(function(M){ return {id:M.id,name:M.name+', '+M.title}; }),
    render:function(){ setTimeout(function(){ SPT.bind(); },0); return [2,3,4].map(function(q){ return '<h3 class="ch-sub">'+WM_REGION_NAMES[q]+'</h3><div class="mn-grid">'+FAIRY_MONARCHS.filter(function(M){ return M.q===q; }).map(function(M){
        return SPT.card('monarchs',M.id,M.name,M.title,'<dt>Looks</dt><dd>'+M.look+'</dd><dt>Trial</dt><dd>'+MONARCH_TRIAL_PLAN[q].map(function(t){ return TRIAL_THEMES[t].name; }).join(' → ')+'</dd>',150,168,FAIRY_MONARCH_PICK[q]===M.id); }).join('')+'</div>'; }).join(''); } });
  LAB_TABS.push({ id:'trials', name:'Familiar Trials',
    blurb:'<b>Familiar trials</b> — every fairy now has her own trial, played in a temporary <b>trial realm</b> (you step through her portal and come back after). 12 kinds of trial, each harder in later quadrants; the Fairy Monarchs chain three in a row. The picture is the realm\'s layout. <b>Mark any you like or want changed.</b> To play one now: in the game, open the 🔧 dev panel → Site Lab → Fairy trials.',
    designs:(function(){ var L=[]; [1,2,3,4].forEach(function(q){ FAIRY_TRIAL_PLAN[q].forEach(function(a,i){ L.push({id:'q'+q+'_f'+i,name:a[1]}); }); }); [2,3,4].forEach(function(q){ L.push({id:'m'+q,name:'Trial of '+_monarchOf(q).name}); }); return L; })(),
    render:function(){ setTimeout(function(){ SPT.bind(); },0); var out='';
      [1,2,3,4].forEach(function(q){ out+='<h3 class="ch-sub">'+WM_REGION_NAMES[q]+' — tier '+q+'</h3><div class="mn-grid">'+FAIRY_TRIAL_PLAN[q].map(function(a,i){ var T=TRIAL_THEMES[a[0]], who=FAIRY_NAMES[q][i]+' (fairy '+(i+1)+')';
          return SPT.card('trials','q'+q+'_f'+i,T.icon+' '+a[1],T.name+' · '+who,'<dt>Trial</dt><dd>'+T.text+'</dd><dt>This one</dt><dd>'+_trialScaleText(a[0],q)+'</dd>',240,180,false); }).join('')+'</div>'; });
      out+='<h3 class="ch-sub">Fairy Monarchs — tier 5, three trials in a row</h3><div class="mn-grid">'+[2,3,4].map(function(q){ var M=_monarchOf(q);
        return SPT.card('trials','m'+q,'👑 Trial of '+M.name,M.title+' · '+WM_REGION_NAMES[q],MONARCH_TRIAL_PLAN[q].map(function(t,k){ return '<dt>'+(k+1)+'. '+TRIAL_THEMES[t].name+'</dt><dd>'+_trialScaleText(t,q+1)+'</dd>'; }).join(''),240,180,false); }).join('')+'</div>';
      return out; } });
  var orig=LabApp.renderGrid;
  LabApp.renderGrid=function(quiet){ if(['spirits','fairies','monarchs','trials'].indexOf(this.tab)>=0&&quiet&&document.querySelector('.sp-card')){ SPT.refresh(); this.renderTabs(); return; } return orig.call(this,quiet); };
  document.addEventListener('click',function(e){ var v=e.target.closest('.sp2-v'); if(!v)return; var k=v.dataset.tab+'-'+v.dataset.cid, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===v.dataset.v?null:v.dataset.v; LabApp.persist(k); SPT.refresh(); LabApp.renderTabs(); });
  document.addEventListener('input',function(e){ var ta=e.target.closest&&e.target.closest('.sp2-notes'); if(!ta)return; var k=ta.dataset.tab+'-'+ta.dataset.cid, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=ta.value; LabApp.persist(k,900); });
})();
