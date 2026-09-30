// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 7 — BOSSES tab: every boss, every phase, with 2–3 painted options
// ║ each (07zz). Pick one option per slot ("Choose this"); the choice is
// ║ saved as {verdict:'pick', regions:[option index]} under 'bosses-<slot>'.
// ║ Animated previews show how each one moves (breathing, hovering, heavy
// ║ strides, plane-shifting, afterimages …); ⇄ toggles idle / on the move.
// ═══════════════════════════════════════════════════════════════════════
(function(){ var i=LAB_TABS.findIndex(function(t){ return t.id==='bosses'; }); if(i>=0)LAB_TABS.splice(i,1); })();
var LBB={ moving:true, vis:new Set(), QN:['','Grasslands','Wetlands','Highlands','Ashlands'],
  fams:function(){ var F=[], QN=LBB.QN;
    [['goblin_king',1,'★ dungeon'],['dark_warlock',1,'★ tower'],['swamp_witch',2,'★ dungeon'],['storm_mage',2,'★ tower'],['rock_dragon',3,'★ dungeon'],['iron_sentinel',3,'★ tower'],['lava_titan',4,'★ dungeon'],['shadow_lord',4,'★ tower']].forEach(function(a){ var B=BOSS_PHASES[a[0]], rows=[{slot:'boss_'+a[0],lbl:'Phase 1 · the site\'s top floor',kit:null}];
      B.phases.forEach(function(P,i){ if(!P)return; rows.push({slot:P.form,lbl:'Phase '+(i+1)+' · '+((BOSS_ARENAS[P.arena]||{}).name||P.arena)+(P.bars?' · extra health: '+P.bars.map(function(b){ return BOSS_BAR_INFO[b.k].ic+' '+BOSS_BAR_INFO[b.k].n; }).join(', '):''),kit:P.kit});
        (P.allies||[]).forEach(function(al){ rows.push({slot:al.form,lbl:'Phase '+(i+1)+' ally ×'+al.n,kit:al.kit,ally:true}); }); });
      F.push({grp:'guardians',id:a[0],title:QN[a[1]]+' '+a[2]+' — '+B.phases.length+' phases',rows:rows}); });
    if(typeof CASTLE_ISLANDS!=='undefined')Object.keys(CASTLE_ISLANDS).forEach(function(k){ var C=CASTLE_ISLANDS[k]; F.push({grp:'wardens',id:k,title:QN[C.sec]+' castle warden · '+C.name,rows:[{slot:C.warden,lbl:'Top floor of the castle',kit:C.kit}]}); });
    MAGE_TOWERS.forEach(function(M){ F.push({grp:'mages',id:M.key,title:QN[M.q]+' mage tower · '+M.name+' — teaches '+((ITEMS[M.spell]||{}).name||M.spell),rows:[{slot:M.boss,lbl:M.skills.map(function(s){ return s.split(' — ')[0]; }).join(' · '),kit:M.kit}]}); });
    [1,2,3,4].forEach(function(q){ F.push({grp:'islands',id:'isl'+q,title:QN[q]+' familiar island guardian',rows:[{slot:'boss_isl_'+q,lbl:'Island dungeon, last floor'}]}); });
    CHAR_ROSTER.filter(function(R){ return R.cat==='boss'&&R.sub==='Volcano boss rush'; }).forEach(function(R){ F.push({grp:'volcano',id:R.id,title:'Volcano boss rush · '+R.where,rows:[{slot:R.id,lbl:R.doing}]}); });
    [1,2,3,4].forEach(function(q){ F.push({grp:'elites',id:'elite'+q,title:QN[q]+' elite · treasure-vault den',rows:[{slot:'elite_'+q,lbl:'One room: the elite + '+(2+q)+' of its kin'}]}); });
    return F.filter(function(f){ f.rows=f.rows.filter(function(r){ return BOSS_SLOTS[r.slot]; }); return f.rows.length; }); },
  GROUPS:[['guardians','★ Quadrant guardians — every phase'],['wardens','🏰 Castle wardens'],['mages','🔮 Mage-tower masters'],['islands','🏝 Island guardians'],['volcano','🌋 Volcano boss rush'],['elites','💎 Elites (treasure vaults)']],
  isNew:function(D){ return D.opt>='d'; },
  hasNew:function(slot){ return (BOSS_SLOTS[slot]||[]).some(LBB.isNew); },
  // the design the game will use: Kris's Lab pick, unless the slot was redrawn with new options he hasn't chosen from yet
  eff:function(slot){ var L=BOSS_SLOTS[slot]||[], i=LBB.pickOf(slot); if(i!==null&&L[i]&&(!LBB.hasNew(slot)||LBB.isNew(L[i])))return L[i]; return BA.of(slot); },
  pickOf:function(slot){ var p=LabApp.picks['bosses-'+slot]; return p&&p.verdict==='pick'&&p.regions&&p.regions.length?p.regions[0]:null; },
  card:function(D,i,slot){ var M=BA.MOTION[D.motion]||{}, pk=LBB.pickOf(slot);
    var tag=LBB.isNew(D)?'<i class="bb-tag new">NEW</i>':(pk===i&&D.r8?'<i class="bb-tag upd">Your pick · retuned to match the family</i>':'');
    return '<article class="bb-card'+(pk===i?' on':'')+'" data-slot="'+slot+'" data-i="'+i+'"><canvas class="bb-cv" width="230" height="220" data-id="'+D.id+'"></canvas>'+
      '<div class="bb-t">'+tag+'<b>'+String.fromCharCode(65+i)+' · '+D.name+'</b><span class="bb-m">'+(M.n||D.motion)+' · pace ×'+(M.pace||1)+'</span><p>'+D.lore+'</p>'+
      '<button class="vbtn bb-pick" data-slot="'+slot+'" data-i="'+i+'" aria-pressed="'+(pk===i)+'">'+(pk===i?'✓ Chosen':'Choose this')+'</button></div></article>'; },
  row:function(r){ var L=BOSS_SLOTS[r.slot], p=LabApp.picks['bosses-'+r.slot]||{}, pk=LBB.pickOf(r.slot), nw=LBB.hasNew(r.slot), main=[], ref=[];
    L.forEach(function(D,i){ ((nw?LBB.isNew(D):(pk===null||pk===i))?main:ref).push(LBB.card(D,i,r.slot)); });
    var ask=nw?'<b class="bb-ask">Redrawn as you asked — choose one of the new options'+(pk!==null&&!LBB.isNew(L[pk])?' (your earlier pick is kept under Reference)':'')+'</b>':'';
    return '<div class="bb-row" data-slot="'+r.slot+'"><div class="bb-rh"><span>'+r.lbl+'</span>'+ask+(r.kit?'<em>'+_rvKit(r.kit)+'</em>':'')+'</div><div class="bb-opts">'+main.join('')+'</div>'+
      (ref.length?'<details class="bb-ref"><summary>Reference — '+ref.length+' not selected (kept for later)</summary><div class="bb-opts">'+ref.join('')+'</div></details>':'')+
      '<textarea class="mn-notes bb-notes" data-slot="'+r.slot+'" rows="1" placeholder="Notes for this '+(r.ally?'ally':'form')+' (optional): mix-and-match, colours, names…">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea></div>'; },
  draw:function(cv,t){ var D=BOSS_ART[cv.dataset.id]; if(!D)return; var x=cv.getContext('2d'), W=cv.width, H=cv.height; x.clearRect(0,0,W,H);
    var g=x.createRadialGradient(W/2,H*0.7,10,W/2,H*0.6,W*0.7); g.addColorStop(0,rgba(D.pal.g,0.18)); g.addColorStop(1,'rgba(10,14,24,0)'); x.fillStyle=g; x.fillRect(0,0,W,H);
    var P=BA.paint(D), bx=BA.BOX[D.arch]||BA.BOX.hum, bw=(bx[1]-bx[0])*D.h/100*(D._kfix||1)*0.8, s=Math.min(0.95,(H-40)/(D.h*1.28),(W-24)/bw,D.arch==='wyvern'?Math.min((W-6)/(P.W/BA.RES),(H-10)/(P.H/BA.RES)):9), off=D.arch==='wyvern'?-(P.ox-P.W/2)/BA.RES*s:0, M=BA.MOTION[D.motion]||{}, mv=LBB.moving, sw=mv?Math.sin(t*0.9*(M.pace||1))*Math.min(28,(W-bw*s)/2):0, cx=W/2+sw+off, cy=H-18, fr=mv&&Math.floor(t*2)%5===4?(Math.floor(t*6)%2?3:2):(Math.floor(t*1.6)%2);
    if(mv&&(M.trail||D.motion==='phase'))for(var k=3;k>=1;k--){ x.save(); x.globalAlpha=0.12*k/(D.motion==='phase'?2:1); BA.drawPreview(x,D,W/2+off+Math.sin((t-k*0.07)*0.9*(M.pace||1))*28,cy,s,t-k*0.07,fr,{moving:true}); x.restore(); }
    BA.drawPreview(x,D,cx,cy,s,t,fr,{moving:mv}); },
  loop:function(){ if(LBB._raf)return; var tick=function(ts){ LBB._raf=null; if(LabApp.tab!=='bosses'||document.body.classList.contains('walking'))return; var t=ts/1000; LBB.vis.forEach(function(cv){ if(cv.isConnected)LBB.draw(cv,t+(+cv.dataset.ph||0)); }); LBB._raf=requestAnimationFrame(tick); }; LBB._raf=requestAnimationFrame(tick); },
  bind:function(){ if(LBB._io)LBB._io.disconnect(); LBB.vis.clear(); LBB._io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting)LBB.vis.add(e.target); else LBB.vis.delete(e.target); }); },{rootMargin:'150px'});
    document.querySelectorAll('.bb-cv').forEach(function(cv,i){ cv.dataset.ph=(i*0.37)%5; LBB._io.observe(cv); }); LBB.loop(); },
  refresh:function(){ document.querySelectorAll('.bb-lcv').forEach(function(cv){ cv.dataset.id=LBB.eff(cv.dataset.slot).id; });
    document.querySelectorAll('.bb-famok').forEach(function(b){ var p=LabApp.picks['bosses-fam-'+b.dataset.fam]||{}, ok=p.verdict==='pick'; b.setAttribute('aria-pressed',String(ok)); b.textContent=ok?'✓ The family looks right':'The family looks right'; });
    document.querySelectorAll('.bb-card').forEach(function(c){ var pk=LBB.pickOf(c.dataset.slot), on=pk===+c.dataset.i; c.classList.toggle('on',on); var b=c.querySelector('.bb-pick'); b.setAttribute('aria-pressed',String(on)); b.textContent=on?'✓ Chosen':'Choose this'; }); }
};
LAB_TABS.push({ id:'bosses', name:'Bosses',
  blurb:'<b>Boss finalisation (round 8)</b> — your picks are in, and every multi-phase boss now keeps its <b>colours and signature pieces through all its phases</b> (crowns, hats, chest stars, background effects). Each guardian family starts with a <b>line-up</b> of every phase: mark it “The family looks right” or leave notes. Rows marked <b>NEW</b> were redrawn as you asked — choose one. Options you didn’t pick are kept under <b>Reference</b>. <button class="vbtn" id="bb-mv">⇄ Idle / on the move</button>',
  designs:LBB.fams().reduce(function(a,f){ return a.concat(f.rows.map(function(r){ return {id:r.slot,name:(BA.of(r.slot)||{}).name||r.slot}; })); },[]),
  render:function(){ setTimeout(LBB.bind,0);
    var F=LBB.fams(); return '<div class="bb-wrap">'+LBB.GROUPS.map(function(G){ var L=F.filter(function(f){ return f.grp===G[0]; }); if(!L.length)return '';
      return '<h3 class="ch-sub">'+G[1]+' — '+L.length+'</h3>'+L.map(function(f){ return '<section class="bb-fam"><h4>'+f.title+'</h4>'+(f.grp==='guardians'?LBB.lineup(f):'')+f.rows.map(LBB.row).join('')+'</section>'; }).join(''); }).join('')+'</div>'; } });
LBB.lineup=function(f){ var k='bosses-fam-'+f.id, p=LabApp.picks[k]||{}, ok=p.verdict==='pick';
  return '<div class="bb-line"><div class="bb-lh"><b>Line-up — every phase with your picks</b><span>Kept through every phase: '+((typeof BOSS_THREADS!=='undefined'&&BOSS_THREADS[f.id])||'')+'</span></div>'+
    '<div class="bb-strip">'+f.rows.map(function(r){ var D=LBB.eff(r.slot); return '<figure><canvas class="bb-cv bb-lcv" width="200" height="190" data-slot="'+r.slot+'" data-id="'+D.id+'"></canvas><figcaption>'+r.lbl.split(' · ')[0]+'</figcaption></figure>'; }).join('')+'</div>'+
    '<div class="bb-lf"><button class="vbtn bb-famok" data-fam="'+f.id+'" aria-pressed="'+ok+'">'+(ok?'✓ The family looks right':'The family looks right')+'</button>'+
    '<textarea class="mn-notes bb-notes" data-slot="fam-'+f.id+'" rows="1" placeholder="Notes on the whole family (colours, what should carry over)…">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea></div></div>'; };
(function(){ var orig=LabApp.renderGrid;
  LabApp.renderGrid=function(quiet){ if(this.tab==='bosses'&&quiet&&document.querySelector('.bb-card')){ LBB.refresh(); this.renderTabs(); return; } return orig.call(this,quiet); };
  document.addEventListener('click',function(e){ if(e.target.id==='bb-mv'){ LBB.moving=!LBB.moving; return; }
    var fb=e.target.closest('.bb-famok'); if(fb){ var fk='bosses-fam-'+fb.dataset.fam, fp=LabApp.picks[fk]=LabApp.picks[fk]||{}; fp.verdict=fp.verdict==='pick'?null:'pick'; fp.regions=[]; LabApp.persist(fk); LBB.refresh(); return; }
    var b=e.target.closest('.bb-pick'); if(!b)return; var k='bosses-'+b.dataset.slot, p=LabApp.picks[k]=LabApp.picks[k]||{}, i=+b.dataset.i;
    if(p.verdict==='pick'&&p.regions&&p.regions[0]===i){ p.verdict=null; p.regions=[]; } else { p.verdict='pick'; p.regions=[i]; }
    LabApp.persist(k); LBB.refresh(); LabApp.renderTabs(); });
  document.addEventListener('input',function(e){ var ta=e.target.closest&&e.target.closest('.bb-notes'); if(!ta)return; var k='bosses-'+ta.dataset.slot, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=ta.value; LabApp.persist(k,900); });
  var st=document.createElement('style'); st.textContent=
   '.bb-fam{background:var(--surface);border:1px solid var(--soft);border-radius:12px;padding:10px 12px;margin:0 0 14px}.bb-fam h4{margin:2px 0 8px;font-family:var(--display);font-weight:400;font-size:1.1rem;letter-spacing:.03em}'+
   '.bb-row{border-top:1px solid var(--soft);padding:8px 0}.bb-rh{display:flex;flex-direction:column;gap:2px;margin:0 0 6px}.bb-rh span{color:var(--text);font-size:.9rem}.bb-rh em{color:var(--muted);font-style:normal;font-size:.78rem}'+
   '.bb-opts{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}.bb-card{background:var(--ink);border:1px solid var(--line);border-radius:10px;overflow:hidden;display:flex;flex-direction:column}'+
   '.bb-card.on{border-color:var(--pick);box-shadow:0 0 0 1px var(--pick)}.bb-cv{width:100%;height:auto;display:block;background:radial-gradient(circle at 50% 70%,#1a2438,#0a0e18)}'+
   '.bb-t{padding:8px 10px 10px;display:flex;flex-direction:column;gap:4px}.bb-t b{font-weight:500;font-size:.92rem}.bb-m{font-family:var(--mono);font-size:.7rem;color:var(--rune)}.bb-t p{margin:0;color:var(--muted);font-size:.8rem;line-height:1.35}'+
   '.bb-pick{align-self:flex-start;margin-top:4px}.bb-pick[aria-pressed="true"]{border-color:var(--pick);color:var(--pick);background:rgba(127,216,154,.14)}.bb-notes{margin-top:6px}'+
   '.bb-tag{font-style:normal;font-family:var(--mono);font-size:.68rem;align-self:flex-start;padding:1px 6px;border-radius:6px;border:1px solid var(--line)}.bb-tag.new{color:#ffd070;border-color:#ffd070}.bb-tag.upd{color:var(--pick);border-color:var(--pick)}'+
   '.bb-ask{color:#ffd070;font-weight:500;font-size:.84rem}.bb-ref{margin-top:8px}.bb-ref summary{cursor:pointer;color:var(--muted);font-size:.82rem;padding:4px 0}.bb-ref .bb-card{opacity:.82}'+
   '.bb-line{background:var(--ink);border:1px solid var(--line);border-radius:10px;padding:8px 10px;margin:0 0 8px}.bb-lh{display:flex;flex-direction:column;gap:2px;margin-bottom:6px}.bb-lh b{font-weight:500}.bb-lh span{color:var(--muted);font-size:.82rem}'+
   '.bb-strip{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px}.bb-strip figure{margin:0;flex:0 0 170px;text-align:center}.bb-strip figcaption{font-size:.74rem;color:var(--muted)}.bb-lf{display:flex;flex-direction:column;gap:6px;margin-top:6px}.bb-famok{align-self:flex-start}.bb-famok[aria-pressed="true"]{border-color:var(--pick);color:var(--pick)}'+
   '@media (max-width:520px){.bb-opts{grid-template-columns:1fr}}';
  document.head.appendChild(st); })();
