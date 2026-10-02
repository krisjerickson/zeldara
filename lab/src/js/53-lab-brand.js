// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 10 — BRAND tabs: Logos (20 symbols × 3 sizes), Wordmarks (10 ways to
// ║ write ZELDARA) and Home Pages (15 animated looks). All drawn by
// ║ src/js/07zz-brand.js (ZBrand). ★ Pick as many as you like per tab and add
// ║ notes; picks are saved as 'logos-<id>', 'words-<id>', 'homes-<id>'.
// ║ ⛶ opens a design full-screen (click anywhere to close).
// ═══════════════════════════════════════════════════════════════════════
var LBR={ vis:new Set(),
  picked:function(tab,id){ var p=LabApp.picks[tab+'-'+id]; return !!(p&&p.verdict==='pick'); },
  firstPick:function(tab,list,dflt){ var d=list.find(function(x){ return LBR.picked(tab,x.id); }); return d?d.id:dflt; },
  card:function(tab,D,i,w,h,extra){ var on=LBR.picked(tab,D.id), p=LabApp.picks[tab+'-'+D.id]||{};
    return '<article class="br-card'+(on?' on':'')+'" data-tab="'+tab+'" data-id="'+D.id+'"><canvas class="br-cv" width="'+w+'" height="'+h+'" data-tab="'+tab+'" data-id="'+D.id+'" data-i="'+i+'"></canvas>'+
      '<div class="br-t"><b>'+(i+1)+' · '+D.name+'</b>'+(D.col?'<span class="br-sw" style="background:'+D.col+'"></span>':'')+(extra||'')+'<p>'+D.desc+'</p>'+
      '<div class="br-act"><button class="vbtn br-pick" aria-pressed="'+on+'">'+(on?'★ Picked':'☆ Pick')+'</button><button class="vbtn br-full" title="See it full-screen">⛶ Full screen</button></div>'+
      '<textarea class="mn-notes br-notes" rows="1" placeholder="Notes (colour, mix with another, changes)…">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea></div></article>'; },
  draw:function(cv,t,full){ var tab=cv.dataset.tab, id=cv.dataset.id, c=cv.getContext('2d'), W=cv.width, H=cv.height; c.setTransform(1,0,0,1,0,0);
    if(tab==='homes'){ var cfg=ZBrand.HOMES.find(function(h){ return h.id===id; }); ZBrand.home(c,cfg,W,H,t,{sym:LBR.firstPick('logos',ZBrand.SYMBOLS,ZBrand.SYMBOLS[(+cv.dataset.i*3)%20].id),word:LBR.firstPick('words',ZBrand.WORDS,ZBrand.WORDS[(+cv.dataset.i)%10].id)}); return; }
    c.fillStyle='#000'; c.fillRect(0,0,W,H);
    if(tab==='logos'){ var S=ZBrand.byId(id);
      if(full){ ZBrand.symbol(c,S,W/2,H/2,Math.min(W,H)*0.31,3,t); return; }
      ZBrand.symbol(c,S,150,H/2-4,92,3,t); ZBrand.symbol(c,S,372,112,50,2,t); ZBrand.symbol(c,S,486,100,22,1,t); ZBrand.symbol(c,S,538,100,11,1,t);
      c.fillStyle='#5f7088'; c.font='11px "JetBrains Mono",monospace'; c.textAlign='center'; c.fillText('full screen',150,H-8); c.fillText('medium',372,196); c.fillText('small',486,146); c.fillText('icon',538,146);
      // the small one in use: a HUD chip
      c.strokeStyle='#22364e'; c.fillStyle='#0a1020'; c.fillRect(322,224,220,44); c.strokeRect(322.5,224.5,220,44); ZBrand.symbol(c,S,346,246,13,1,t); c.fillStyle='#cfe0f4'; c.font='13px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText('Waystone activated',368,250); }
    else { var D=ZBrand.wordById(id); if(full){ ZBrand.word(c,D,W/2,H/2,Math.min(W/9,H/4),t); return; } ZBrand.word(c,D,W/2,H*(D.stack?0.4:0.38),D.stack?64:46,t); ZBrand.word(c,D,W*0.3,H*0.84,D.stack?26:15,t); ZBrand.word(c,D,W*0.74,H*0.84,D.stack?18:9,t); } },
  loop:function(){ if(LBR._raf)return; var last=0, tick=function(ts){ LBR._raf=null; if(['logos','words','homes'].indexOf(LabApp.tab)<0&&!LBR.fs)return; if(ts-last>33){ last=ts; var t=ts/1000;
        if(LBR.fs)LBR.draw(LBR.fs,t,true); else LBR.vis.forEach(function(cv){ if(cv.isConnected)LBR.draw(cv,t); }); }
      LBR._raf=requestAnimationFrame(tick); }; LBR._raf=requestAnimationFrame(tick); },
  bind:function(){ if(LBR._io)LBR._io.disconnect(); LBR.vis.clear(); LBR._io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting)LBR.vis.add(e.target); else LBR.vis.delete(e.target); }); },{rootMargin:'120px'});
    document.querySelectorAll('.br-cv').forEach(function(cv){ LBR._io.observe(cv); }); if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ Object.keys(ZBrand.cache).forEach(function(k){ if(k.indexOf('w_')===0)delete ZBrand.cache[k]; }); }); LBR.loop(); },
  full:function(tab,id,i){ var o=document.createElement('div'); o.id='br-fs'; var cv=document.createElement('canvas'), dpr=Math.min(2,window.devicePixelRatio||1); cv.width=Math.round(innerWidth*dpr); cv.height=Math.round(innerHeight*dpr); cv.dataset.tab=tab; cv.dataset.id=id; cv.dataset.i=i; o.appendChild(cv);
    var hint=document.createElement('span'); hint.textContent='Click anywhere to close'; o.appendChild(hint); document.body.appendChild(o); LBR.fs=cv; o.onclick=function(){ LBR.fs=null; o.remove(); }; LBR.loop(); },
  refresh:function(){ document.querySelectorAll('.br-card').forEach(function(a){ var on=LBR.picked(a.dataset.tab,a.dataset.id); a.classList.toggle('on',on); var b=a.querySelector('.br-pick'); b.setAttribute('aria-pressed',String(on)); b.textContent=on?'★ Picked':'☆ Pick'; }); }
};
LAB_TABS.push({ id:'logos', name:'Logos', blurb:'<b>20 symbol logos for Zeldara</b> (no lettering) — our own runic emblems, drawing on hero crests, Norse staves and the world tree, and Celtic knots. Each is shown at <b>three levels of detail</b>: full-screen (with its rune ring), medium, and small/icon for use around the game. One main colour each, with a runic glow that slowly breathes. <b>☆ Pick</b> your favourites (several is fine), use <b>⛶</b> to see one full-screen, and leave notes — e.g. “this shape in gold”.',
  designs:ZBrand.SYMBOLS.map(function(S){ return {id:S.id,name:S.name}; }),
  render:function(){ setTimeout(LBR.bind,0); return '<div class="br-grid">'+ZBrand.SYMBOLS.map(function(S,i){ return LBR.card('logos',S,i,560,300,'<span class="bb-m">'+S.style+' finish</span>'); }).join('')+'</div>'; } });
LAB_TABS.push({ id:'words', name:'Wordmarks', blurb:'<b>10 ways to write ZELDARA</b> — separate from the symbol, so any wordmark can pair with any logo. Four use our own rune-cut letters; the rest dress a display typeface with runes, knots or rules. Each shows large, medium and tiny. <b>☆ Pick</b> the ones you like.',
  designs:ZBrand.WORDS.map(function(S){ return {id:S.id,name:S.name}; }),
  render:function(){ setTimeout(LBR.bind,0); return '<div class="br-grid">'+ZBrand.WORDS.map(function(S,i){ return LBR.card('words',S,i,560,230,'<span class="bb-m">'+S.style+' finish</span>'); }).join('')+'</div>'; } });
LAB_TABS.push({ id:'homes', name:'Home Pages', blurb:'<b>15 looks for the new home page</b> (the Next.js page players land on, and the matching in-game title). All are black and quiet, with slow glows; they differ in what moves: aurora, runes, shooting stars, spirits. Each preview shows your picked logo + wordmark (or a sample until you pick), the two buttons and the story line. <b>☆ Pick</b> one or two; <b>⛶</b> shows it full-screen.',
  designs:ZBrand.HOMES.map(function(S){ return {id:S.id,name:S.name}; }),
  render:function(){ setTimeout(LBR.bind,0); return '<div class="br-grid br-wide">'+ZBrand.HOMES.map(function(S,i){ return LBR.card('homes',S,i,640,360,''); }).join('')+'</div>'; } });
(function(){ var orig=LabApp.renderGrid;
  LabApp.renderGrid=function(quiet){ if(['logos','words','homes'].indexOf(this.tab)>=0&&quiet&&document.querySelector('.br-card')){ LBR.refresh(); this.renderTabs(); return; } return orig.call(this,quiet); };
  document.addEventListener('click',function(e){ var a=e.target.closest&&e.target.closest('.br-card'); if(!a)return; var k=a.dataset.tab+'-'+a.dataset.id;
    if(e.target.closest('.br-pick')){ var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict==='pick'?null:'pick'; p.regions=[]; LabApp.persist(k); LBR.refresh(); LabApp.renderTabs(); }
    else if(e.target.closest('.br-full')||e.target.closest('.br-cv')){ LBR.full(a.dataset.tab,a.dataset.id,a.querySelector('.br-cv').dataset.i); } });
  document.addEventListener('input',function(e){ var ta=e.target.closest&&e.target.closest('.br-notes'); if(!ta)return; var a=ta.closest('.br-card'), k=a.dataset.tab+'-'+a.dataset.id, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=ta.value; LabApp.persist(k,900); });
  var st=document.createElement('style'); st.textContent=
   '.br-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:14px}.br-wide{grid-template-columns:repeat(auto-fill,minmax(480px,1fr))}'+
   '.br-card{background:var(--surface);border:1px solid var(--soft);border-radius:12px;overflow:hidden;display:flex;flex-direction:column}.br-card.on{border-color:var(--pick);box-shadow:0 0 0 1px var(--pick)}'+
   '.br-cv{width:100%;height:auto;display:block;background:#000;cursor:zoom-in}.br-t{padding:10px 12px 12px;display:flex;flex-direction:column;gap:5px}.br-t b{font-weight:500}.br-t p{margin:0;color:var(--muted);font-size:.84rem;line-height:1.35}'+
   '.br-sw{display:inline-block;width:12px;height:12px;border-radius:50%;margin-left:8px;vertical-align:middle;box-shadow:0 0 8px currentColor}.br-act{display:flex;gap:8px;margin-top:2px}.br-pick[aria-pressed="true"]{border-color:var(--pick);color:var(--pick);background:rgba(127,216,154,.14)}'+
   '#br-fs{position:fixed;inset:0;background:#000;z-index:99999;cursor:zoom-out}#br-fs canvas{width:100%;height:100%;display:block}#br-fs span{position:absolute;bottom:14px;left:0;right:0;text-align:center;color:#56677c;font-size:12px}'+
   '@media (max-width:520px){.br-grid,.br-wide{grid-template-columns:1fr}}';
  document.head.appendChild(st); })();
