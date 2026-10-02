// ═══════════════════════════════════════════════════════════════════════
// ║ BRAND tabs: Logos, Wordmarks and Home Pages. Round 11 (second pass) is shown
// ║ first: 32 teal logos (8 picks × elaborate / knotwork / fractal + 8 new), 10 gold
// ║ wordmarks with war axes, 6 combined home pages. Round 10's designs (20 / 10 / 15)
// ║ stay below in a collapsed reference section. All drawn by src/js/07zz-brand.js
// ║ and 07zz-brand2.js (ZBrand). ★ Pick as many as you like per tab and add
// ║ notes; picks are saved as 'logos-<id>', 'words-<id>', 'homes-<id>'.
// ║ ⛶ opens a design full-screen (click anywhere to close).
// ═══════════════════════════════════════════════════════════════════════
var LBR={ vis:new Set(),
  picked:function(tab,id){ var p=LabApp.picks[tab+'-'+id]; return !!(p&&p.verdict==='pick'); },
  firstPick:function(tab,list,dflt,gen){ var d=list.find(function(x){ return (!gen||x.gen===gen)&&LBR.picked(tab,x.id); }); return d?d.id:dflt; },
  g:function(list,gen){ return list.filter(function(x){ return x.gen===gen; }); },
  sec:function(title,sub){ return '<h3 class="br-h">'+title+(sub?'<span>'+sub+'</span>':'')+'</h3>'; },
  ref:function(title,html){ return '<details class="br-ref"><summary>'+title+'</summary>'+html+'</details>'; },
  card:function(tab,D,i,w,h,extra){ var on=LBR.picked(tab,D.id), p=LabApp.picks[tab+'-'+D.id]||{};
    return '<article class="br-card'+(on?' on':'')+'" data-tab="'+tab+'" data-id="'+D.id+'"><canvas class="br-cv" width="'+w+'" height="'+h+'" data-tab="'+tab+'" data-id="'+D.id+'" data-i="'+i+'"></canvas>'+
      '<div class="br-t"><b>'+(i+1)+' · '+D.name+'</b>'+(D.col?'<span class="br-sw" style="background:'+D.col+'"></span>':'')+(extra||'')+'<p>'+D.desc+'</p>'+
      '<div class="br-act"><button class="vbtn br-pick" aria-pressed="'+on+'">'+(on?'★ Picked':'☆ Pick')+'</button><button class="vbtn br-full" title="See it full-screen">⛶ Full screen</button></div>'+
      '<textarea class="mn-notes br-notes" rows="1" placeholder="Notes (colour, mix with another, changes)…">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea></div></article>'; },
  draw:function(cv,t,full){ var tab=cv.dataset.tab, id=cv.dataset.id, c=cv.getContext('2d'), W=cv.width, H=cv.height; c.setTransform(1,0,0,1,0,0);
    if(tab==='homes'){ var cfg=ZBrand.HOMES.find(function(h){ return h.id===id; });
      if(cfg.gen===2)ZBrand.home(c,cfg,W,H,t,{sym:LBR.firstPick('logos',ZBrand.SYMBOLS,'tree_b',2),word:LBR.firstPick('words',ZBrand.WORDS,'twin_axes',2)});
      else ZBrand.home(c,cfg,W,H,t,{sym:LBR.firstPick('logos',ZBrand.SYMBOLS,ZBrand.SYMBOLS[(+cv.dataset.i*3)%20].id,1),word:LBR.firstPick('words',ZBrand.WORDS,ZBrand.WORDS[(+cv.dataset.i)%10].id,1)}); return; }
    c.fillStyle='#000'; c.fillRect(0,0,W,H);
    if(tab==='logos'){ var S=ZBrand.byId(id);
      if(full){ ZBrand.symbol(c,S,W/2,H/2,Math.min(W,H)*(S.gen===2?0.27:0.31),3,t); return; }
      if(S.gen===2){ ZBrand.symbol(c,S,205,H/2-6,122,3,t); ZBrand.symbol(c,S,490,120,54,2,t); ZBrand.symbol(c,S,446,256,22,1,t); ZBrand.symbol(c,S,520,256,11,1,t);
        c.fillStyle='#5f7088'; c.font='11px "JetBrains Mono",monospace'; c.textAlign='center'; c.fillText('full detail',205,H-8); c.fillText('medium',490,206); c.fillText('small',446,302); c.fillText('icon',520,302);
        c.strokeStyle='#22364e'; c.fillStyle='#0a1020'; c.fillRect(392,336,206,44); c.strokeRect(392.5,336.5,206,44); ZBrand.symbol(c,S,416,358,13,1,t); c.fillStyle='#cfe0f4'; c.font='13px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText('Waystone activated',438,362); return; }
      ZBrand.symbol(c,S,150,H/2-4,92,3,t); ZBrand.symbol(c,S,372,112,50,2,t); ZBrand.symbol(c,S,486,100,22,1,t); ZBrand.symbol(c,S,538,100,11,1,t);
      c.fillStyle='#5f7088'; c.font='11px "JetBrains Mono",monospace'; c.textAlign='center'; c.fillText('full screen',150,H-8); c.fillText('medium',372,196); c.fillText('small',486,146); c.fillText('icon',538,146);
      // the small one in use: a HUD chip
      c.strokeStyle='#22364e'; c.fillStyle='#0a1020'; c.fillRect(322,224,220,44); c.strokeRect(322.5,224.5,220,44); ZBrand.symbol(c,S,346,246,13,1,t); c.fillStyle='#cfe0f4'; c.font='13px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText('Waystone activated',368,250); }
    else { var D=ZBrand.wordById(id); if(full){ ZBrand.word(c,D,W/2,H/2,D.gen===2?Math.min(W/13,H/6):Math.min(W/9,H/4),t); return; }
      if(D.gen===2){ ZBrand.word(c,D,W/2,150,48,t); ZBrand.word(c,D,W*0.3,330,15,t); ZBrand.word(c,D,W*0.75,330,9,t); return; } ZBrand.word(c,D,W/2,H*(D.stack?0.4:0.38),D.stack?64:46,t); ZBrand.word(c,D,W*0.3,H*0.84,D.stack?26:15,t); ZBrand.word(c,D,W*0.74,H*0.84,D.stack?18:9,t); } },
  loop:function(){ if(LBR._raf)return; var last=0, tick=function(ts){ LBR._raf=null; if(['logos','words','homes'].indexOf(LabApp.tab)<0&&!LBR.fs)return; if(ts-last>33){ last=ts; var t=ts/1000;
        if(LBR.fs)LBR.draw(LBR.fs,t,true); else LBR.vis.forEach(function(cv){ if(cv.isConnected)LBR.draw(cv,t); }); }
      LBR._raf=requestAnimationFrame(tick); }; LBR._raf=requestAnimationFrame(tick); },
  bind:function(){ if(LBR._io)LBR._io.disconnect(); LBR.vis.clear(); LBR._io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting)LBR.vis.add(e.target); else LBR.vis.delete(e.target); }); },{rootMargin:'120px'});
    document.querySelectorAll('.br-cv').forEach(function(cv){ LBR._io.observe(cv); }); if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ Object.keys(ZBrand.cache).forEach(function(k){ if(k.indexOf('w_')===0)delete ZBrand.cache[k]; }); }); LBR.loop(); },
  full:function(tab,id,i){ var o=document.createElement('div'); o.id='br-fs'; var cv=document.createElement('canvas'), dpr=Math.min(2,window.devicePixelRatio||1); cv.width=Math.round(innerWidth*dpr); cv.height=Math.round(innerHeight*dpr); cv.dataset.tab=tab; cv.dataset.id=id; cv.dataset.i=i; o.appendChild(cv);
    var hint=document.createElement('span'); hint.textContent='Click anywhere to close'; o.appendChild(hint); document.body.appendChild(o); LBR.fs=cv; o.onclick=function(){ LBR.fs=null; o.remove(); }; LBR.loop(); },
  refresh:function(){ document.querySelectorAll('.br-card').forEach(function(a){ var on=LBR.picked(a.dataset.tab,a.dataset.id); a.classList.toggle('on',on); var b=a.querySelector('.br-pick'); b.setAttribute('aria-pressed',String(on)); b.textContent=on?'★ Picked':'☆ Pick'; }); }
};
LAB_TABS.push({ id:'logos', name:'Logos', blurb:'<b>Second pass: 32 logos, all in light glowing teal.</b> Each of your 8 picks comes back at <b>three levels of richness</b> — <b>A · Elaborate</b> (more parts, a ring of runes), <b>B · Knotwork</b> (braided knot rings, rays) and <b>C · Fractal</b> (the shape repeats inside itself, with key-pattern borders). Then <b>8 new ones</b> that mix your picks with pieces from the pictures you sent: a serpent ring, twin dragons, crossed war axes, a rune pillar, a knot-winged dragon, a hammer. Everything is our own drawing. The medium / small / icon sizes use the simple form of each shape, so they stay readable. <b>☆ Pick</b> favourites, <b>⛶</b> for full-screen, and leave notes. Your first-round picks are kept at the bottom for reference.',
  designs:ZBrand.SYMBOLS.map(function(S){ return {id:S.id,name:S.name}; }),
  render:function(){ setTimeout(LBR.bind,0); var G2=LBR.g(ZBrand.SYMBOLS,2), n=0, card=function(S){ return LBR.card('logos',S,n++,620,430,'<span class="bb-m">'+({A:'A · elaborate',B:'B · knotwork',C:'C · fractal',N:'new'})[S.lvl]+'</span>'); }, h='';
    ['world_tree','compass','four_spirits','realm_peak','shield_knot','triquetra','wayfinder','winged_blade'].forEach(function(b){ var B=ZBrand.SYMBOLS.find(function(x){ return x.id===b; }); h+=LBR.sec(B.name,'your pick, three ways')+'<div class="br-grid">'+G2.filter(function(S){ return S.from===b; }).map(card).join('')+'</div>'; });
    h+=LBR.sec('New designs','mixing your picks with the pictures you sent')+'<div class="br-grid">'+G2.filter(function(S){ return S.lvl==='N'; }).map(card).join('')+'</div>';
    return h+LBR.ref('First round — the 20 earlier logos (reference; your picks are still marked)','<div class="br-grid">'+LBR.g(ZBrand.SYMBOLS,1).map(function(S,i){ return LBR.card('logos',S,i,560,300,'<span class="bb-m">'+S.style+' finish</span>'); }).join('')+'</div>'); } });
LAB_TABS.push({ id:'words', name:'Wordmarks', blurb:'<b>Second pass: 10 wordmarks, all gold.</b> They build on your two picks — <b>Engraved Capitals</b> and <b>Highland Wide</b> — and each one carries a <b>war axe</b> (or two), with rune bands, braided knot lines, key borders, dragon heads or the world tree. Each shows large, medium and tiny. <b>☆ Pick</b> the ones you like; the first-round wordmarks are kept at the bottom.',
  designs:ZBrand.WORDS.map(function(S){ return {id:S.id,name:S.name}; }),
  render:function(){ setTimeout(LBR.bind,0); return '<div class="br-grid br-wide">'+LBR.g(ZBrand.WORDS,2).map(function(S,i){ return LBR.card('words',S,i,620,380,''); }).join('')+'</div>'+
    LBR.ref('First round — the 10 earlier wordmarks (reference)','<div class="br-grid">'+LBR.g(ZBrand.WORDS,1).map(function(S,i){ return LBR.card('words',S,i,560,230,'<span class="bb-m">'+S.style+' finish</span>'); }).join('')+'</div>'); } });
LAB_TABS.push({ id:'homes', name:'Home Pages', blurb:'<b>Second pass: 6 home pages that combine your three picks</b> — the aurora across the top (Northern Crown), the glowing runes down the sides (Rune Columns) and the teal runes (Rune Frame). New in all of them: <b>knotwork or key-pattern borders around the New Game / Returning Player buttons</b>, button lettering in the <b>wordmark typeface</b>, and carved backgrounds (pillars with spear tips, a knot frame, a rune gate, a faint world tree, a serpent ring). Each preview uses your picked second-pass logo and wordmark (or a sample until you pick). <b>☆ Pick</b> one or two; <b>⛶</b> shows it full-screen. The first-round pages are kept at the bottom.',
  designs:ZBrand.HOMES.map(function(S){ return {id:S.id,name:S.name}; }),
  render:function(){ setTimeout(LBR.bind,0); return '<div class="br-grid br-wide">'+LBR.g(ZBrand.HOMES,2).map(function(S,i){ return LBR.card('homes',S,i,800,450,''); }).join('')+'</div>'+
    LBR.ref('First round — the 15 earlier home pages (reference)','<div class="br-grid br-wide">'+LBR.g(ZBrand.HOMES,1).map(function(S,i){ return LBR.card('homes',S,i,640,360,''); }).join('')+'</div>'); } });
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
   '.br-h{margin:22px 0 10px;font-weight:500;font-size:1.05rem}.br-h:first-child{margin-top:4px}.br-h span{margin-left:10px;color:var(--muted);font-size:.82rem;font-weight:400}.br-ref{margin-top:26px;border-top:1px solid var(--soft);padding-top:14px}.br-ref summary{cursor:pointer;color:var(--muted);margin-bottom:12px}'+
   '@media (max-width:520px){.br-grid,.br-wide{grid-template-columns:1fr}}';
  document.head.appendChild(st); })();
