// ═══════════════════════════════════════════════════════════════════════
// ║ 79y2-lab-bossplan2.js — round 128: BOSS FIGHTS, PHASE BY PHASE — replaces round 127's "Boss fights, remade".
// ║ Kris: "rebalance the proposals … take into consideration the number of phases of the boss, and allow for some of the old mechanics to
// ║ also be sprinkled in … increased health, ward, and resistances … each phase should be individually selectable … different numbers of
// ║ boss elements per the difficulty of the game … rank ordered proposals … double-check that all of these new elements can easily be added".
// ║ Data: LBPLAN2 (79y2-0, tools/world/boss_plan2.py). Per phase: today's mechanics (keep), the new ones (tick), one ranked list.
// ║ Picks: 'bossplan2-<boss>_p<n>' {verdict:'pick', regions:[the chosen ids in rank order — 'k3' today, 'n2' new], notes};
// ║ 'bossplan2-<boss>_move' {verdict pick|cut}; 'bossplan2-scheme' {regions:[scheme index]}; 'bossplan2-all' {notes}.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined'||typeof LBPLAN2==='undefined')return;
  var D=LBPLAN2, TY={}, TH=D.themes; D.types.forEach(function(t){ TY[t.id]=t; });
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, F={grp:'all'};
  var GROUP=function(b){ var w=b.where; return /★/.test(w)?'Realm guardians':/castle warden/.test(w)?'Castle wardens':/mage tower/.test(w)?'Mage-tower masters':/island guardian/.test(w)?'Island guardians':/elite|treasure-vault/.test(w)?'Elites':/Volcano boss rush/.test(w)?'Volcano boss rush':'Forges, Muspelheim and Asgard'; };
  var GROUPS=['Realm guardians','Forges, Muspelheim and Asgard','Castle wardens','Mage-tower masters','Island guardians','Elites','Volcano boss rush'];
  var KIC={sig:'⚔',kit:'•',move:'↝',event:'🌋',ally:'👥',hp:'❤',bar:'▣',stand:'‼'}, KN={sig:'signature',kit:'kit',move:'moves',event:'arena',ally:'allies',hp:'health',bar:'extra health',stand:'last stand'};
  var EZ={ready:['ready','#8fe8a0'],small:['small code','#7fd0ff'],prop:['needs an arena object','#ffd76a'],art:['needs paintings','#ffb86a'],cut:['does not fit','#ff8a8a']};
  var scheme=function(){ var r=P('bossplan2-scheme').regions; return r&&r.length?r[0]:0; };
  // how many of a phase's n ranked elements each difficulty uses
  var counts=function(n){ var S=D.schemes[scheme()], f=S.f, c=function(x){ return Math.max(Math.min(2,n),Math.min(n,x)); };
    if(S.id==='share')return f.map(function(v){ return v>=1?n:c(Math.ceil(n*v)); });
    if(S.id==='steps')return f.map(function(v){ return c(n+v); });
    var core=c(Math.ceil(n*0.6)); return [core,core,c(core+1),n]; };
  var key=function(b,i){ return 'bossplan2-'+b.id+'_p'+(i+1); };
  var chosen=function(b,i){ var p=P(key(b,i)); return p.verdict==='pick'&&p.regions?p.regions.slice():null; };
  var list=function(b,i){ var c=chosen(b,i); return c||b.phases[i].sug.slice(); };
  var item=function(Ph,id){ var a=id.charAt(0)==='k'?Ph.today:Ph.new; for(var j=0;j<a.length;j++)if(a[j].id===id)return a[j]; return null; };
  var label=function(Ph,id){ var x=item(Ph,id); if(!x)return id; return id.charAt(0)==='k'?'<span class="b2-old">today</span> '+esc(x.n):'<span class="b2-ty" style="--c:'+TH[TY[x.t].th].col+'">'+TY[x.t].ic+'</span> '+esc(x.n); };
  var phase=function(b,i){ var Ph=b.phases[i], k=key(b,i), c=chosen(b,i), L=list(b,i), n=L.length, cn=counts(n), mine=!!c;
    var h='<div class="b2-ph'+(mine?' mine':'')+'"><div class="b2-ph-h"><b>'+esc(Ph.lbl)+'</b><span class="b2-st">'+(mine?'✓ your choice · ':'my suggestion · ')+n+' elements</span>'+(mine?'':'<button class="vbtn b2-take" data-b="'+b.id+'" data-i="'+i+'">✓ Keep my suggestion</button>')+'</div>';
    h+='<div class="b2-cols"><div><div class="b2-lbl">Today — tick what to keep</div>'+(Ph.today.length?Ph.today.map(function(t){ var on=L.indexOf(t.id)>=0, al=Ph.always.indexOf(t.id)>=0;
        return '<label class="b2-it old'+(on||al?' on':'')+'"><input type="checkbox" class="b2-cb" data-b="'+b.id+'" data-i="'+i+'" data-id="'+t.id+'"'+(on||al?' checked':'')+(al?' disabled':'')+'><span class="b2-k" title="'+KN[t.k]+'">'+KIC[t.k]+'</span>'+esc(t.n)+(al?' <small>always (scaled by difficulty)</small>':'')+'</label>'; }).join(''):'<p class="b2-none">—</p>')+
      (b.el?'<div class="b2-it old on"><span class="b2-k">◈</span>Element: '+esc(b.el)+' <small>always</small></div>':'')+'</div>';
    h+='<div><div class="b2-lbl">New — tick what to add</div>'+Ph.new.map(function(p){ var on=L.indexOf(p.id)>=0, T=TY[p.t], E=EZ[p.ease];
        return '<label class="b2-it'+(on?' on':'')+'" style="--c:'+TH[T.th].col+'"><input type="checkbox" class="b2-cb" data-b="'+b.id+'" data-i="'+i+'" data-id="'+p.id+'"'+(on?' checked':'')+'><span class="b2-ty" style="--c:'+TH[T.th].col+'">'+T.ic+'</span><span><b>'+esc(p.n)+'</b> <small>'+esc(T.n)+(p.src==='new'?' · new this round':'')+'</small><br>'+esc(p.d)+' <i class="b2-ez" style="--e:'+E[1]+'">'+E[0]+'</i></span></label>'; }).join('')+'</div></div>';
    h+='<div class="b2-lbl">Ranked — the order elements join as the difficulty rises <small>(▲ ▼ to reorder)</small></div><ol class="b2-rank">'+L.map(function(id,j){ var tags=D.diff.map(function(d,di){ return j<cn[di]?'<i title="'+esc(d.n)+'">'+d.ic+'</i>':'<i class="off" title="'+esc(d.n)+'">'+d.ic+'</i>'; }).join('');
        return '<li><span class="b2-rl">'+label(Ph,id)+'</span><span class="b2-dd">'+tags+'</span><button class="b2-mv" data-b="'+b.id+'" data-i="'+i+'" data-j="'+j+'" data-d="-1">▲</button><button class="b2-mv" data-b="'+b.id+'" data-i="'+i+'" data-j="'+j+'" data-d="1">▼</button></li>'; }).join('')+'</ol>';
    h+='<p class="b2-cnt">'+D.diff.map(function(d,di){ return d.ic+' '+esc(d.n)+': <b>'+cn[di]+'</b>'; }).join(' · ')+'</p>';
    h+='<input class="tl-n b2-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note on '+esc(Ph.lbl.split(' · ')[0].toLowerCase())+'…"></div>'; return h; };
  var card=function(b){ var mk='bossplan2-'+b.id+'_move', mv=P(mk).verdict||(P('bossplan-'+b.id).verdict)||null, done=b.phases.filter(function(x,i){ return !!chosen(b,i); }).length;
    var h='<div class="b2-boss"><div class="b2-h"><h4>'+esc(b.name)+'</h4><span class="b2-w">'+esc(b.where)+'</span><span class="b2-nat">'+(b.nature==='magic'?'✨ magic':'⚒ '+esc(b.nature))+'</span><span class="b2-pc">'+b.n+' phase'+(b.n>1?'s':'')+' · '+done+' chosen</span>'+
      (done<b.n?'<button class="vbtn b2-takeall" data-b="'+b.id+'">✓ My suggestion for every phase</button>':'')+'</div>';
    h+='<div class="b2-move"><b>Moving about:</b> '+(TY[b.move.t]?TY[b.move.t].ic+' '+esc(TY[b.move.t].n)+' — ':'')+esc(b.move.d)+' <span class="b2-mseg" data-k="'+mk+'">'+[['pick','✓ Yes'],['cut','✕ Keep as today']].map(function(o){ return '<button class="vbtn b2-mvv'+(mv===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'+(!P(mk).verdict&&P('bossplan-'+b.id).verdict?' <small>(your round-127 answer)</small>':'')+'</div>';
    h+=b.phases.map(function(x,i){ return phase(b,i); }).join('')+'</div>'; return h; };
  LAB_TABS.push({ id:'bossplan2', name:'Boss fights, phase by phase',
    blurb:'<b>Round 128 — the boss plan, rebalanced.</b> Every boss now has proposals <b>for each of its phases</b> (a five-phase titan gets four new elements per phase; a one-phase warden ten), today\'s mechanics sit beside them to <b>keep</b> — its signature attacks, kit, extra health, ward / guard / plate, arena events, allies, last stand and element — and each phase is <b>one ranked list</b>: the higher an element, the gentler the difficulty that still uses it. Everything was checked against the game: '+D.cuts.length+' proposals that needed a ceiling, a rope from above or a world past the arena walls are gone, '+D.reworks.length+' were re-told to happen on the arena floor. Until you touch a phase, it shows my suggestion.',
    designs:[].concat.apply([],D.bosses.map(function(b){ return b.phases.map(function(x,i){ return {id:b.id+'_p'+(i+1),name:'Boss phases: '+b.name+' — '+x.lbl}; }).concat([{id:b.id+'_move',name:'Boss moves: '+b.name}]); })).concat([{id:'scheme',name:'Boss elements by difficulty'},{id:'all',name:'Boss fights, phase by phase — notes'}]),
    render:function(){ var h='', sc=scheme();
      h+=LBR.sec('More elements as the difficulty rises','choose how the ranked list scales — the counts under every phase follow your choice');
      h+='<div class="b2-sch">'+D.schemes.map(function(S,i){ return '<label class="b2-s'+(sc===i?' on':'')+'" data-i="'+i+'"><input type="radio" name="b2sch"'+(sc===i?' checked':'')+'><b>'+esc(S.n)+'</b><span>'+esc(S.d)+'</span></label>'; }).join('')+'</div>';
      h+='<p class="b2-txt">Health, damage, warning time and speed already change with the difficulty (Hearthside: bosses ¾ health, longer warnings; Ragnarök: more of everything) — the extra-health bars and the element stay on at every level unless you un-tick them; the ranked list decides <b>which</b> attacks and set-pieces each level adds.</p>';
      h+=LBR.sec('Every boss, phase by phase','');
      h+='<div class="b2-f">'+['all'].concat(GROUPS).map(function(g){ var n=D.bosses.filter(function(b){ return g==='all'||GROUP(b)===g; }); return '<button class="vbtn b2-g'+(F.grp===g?' on':'')+'" data-g="'+esc(g)+'">'+(g==='all'?'All '+D.bosses.length:esc(g)+' ('+n.length+')')+'</button>'; }).join('')+'</div>';
      GROUPS.forEach(function(g){ if(F.grp!=='all'&&F.grp!==g)return; var L=D.bosses.filter(function(b){ return GROUP(b)===g; }); if(!L.length)return; h+='<h3 class="b2-gh">'+esc(g)+'</h3>'+L.map(card).join(''); });
      h+=LBR.sec('Checked against the game','what was discarded, what was re-told, and how easily the rest goes in');
      h+='<div class="b2-cols"><div><div class="b2-lbl">Discarded ('+D.cuts.length+')</div><ul class="b2-ul">'+D.cuts.map(function(c){ return '<li><b>'+esc(c.n)+'</b> ('+esc(c.name.split(',')[0])+') — '+esc(c.why)+'</li>'; }).join('')+'</ul></div>'+
        '<div><div class="b2-lbl">Re-told for the arena floor ('+D.reworks.length+')</div><ul class="b2-ul">'+D.reworks.map(function(c){ return '<li><b>'+esc(c.n)+'</b> ('+esc(c.name.split(',')[0])+'): '+esc(c.new)+'</li>'; }).join('')+'</ul></div></div>';
      var EC={}; D.bosses.forEach(function(b){ b.phases.forEach(function(Ph){ Ph.new.forEach(function(p){ EC[p.ease]=(EC[p.ease]||0)+1; }); }); });
      h+='<ul class="b2-ul">'+Object.keys(EZ).filter(function(e){ return e!=='cut'; }).map(function(e){ return '<li><i class="b2-ez" style="--e:'+EZ[e][1]+'">'+EZ[e][0]+'</i> <b>'+(EC[e]||0)+'</b> — '+esc(D.ease[e])+'</li>'; }).join('')+'</ul>';
      h+=LBR.sec('The catalogue — '+D.types.length+' kinds','with how easily each goes into the game');
      h+='<div class="b2-cat">'+Object.keys(TH).map(function(th){ return '<div class="b2-th" style="--c:'+TH[th].col+'"><h5>'+esc(TH[th].n)+'</h5>'+D.types.filter(function(t){ return t.th===th; }).map(function(t){ var E=EZ[t.ease];
          return '<div class="b2-t'+(t.ease==='cut'?' cut':'')+'"><span>'+t.ic+'</span><div><b>'+esc(t.n)+'</b> <i class="b2-ez" style="--e:'+E[1]+'">'+E[0]+'</i><br>'+esc(t.d)+'</div></div>'; }).join('')+'</div>'; }).join('')+'</div>';
      h+='<textarea class="b2-n b2-all" data-k="bossplan2-all" placeholder="Anything about boss fights as a whole…">'+esc(P('bossplan2-all').notes||'')+'</textarea>';
      return h; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'bossplan2',label:'⚔ Boss fights, phase by phase: for every phase keep today\'s mechanics you want, tick the new ones, rank them; choose how they scale by difficulty',where:'Boss fights, phase by phase tab',
    done:function(){ return D.bosses.every(function(b){ return b.phases.every(function(x,i){ return !!chosen(b,i); }); }); },go:function(){ LTODO.goTo('bossplan2','.b2-boss',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('bossplan2')<0)LAB_ACTIVE.unshift('bossplan2');
  var rer=function(){ if(typeof LabApp!=="undefined"&&LabApp.renderGrid)LabApp.renderGrid(true); };
  var B=function(id){ for(var i=0;i<D.bosses.length;i++)if(D.bosses[i].id===id)return D.bosses[i]; };
  var save=function(b,i,L){ var k=key(b,i), p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict='pick'; p.regions=L; LabApp.persist(k); };
  document.addEventListener('click',function(e){ var t=e.target.closest&&e.target.closest('.b2-g'); if(t){ F.grp=t.dataset.g; rer(); return; }
    var s=e.target.closest&&e.target.closest('.b2-s'); if(s){ var p=LabApp.picks['bossplan2-scheme']=LabApp.picks['bossplan2-scheme']||{}; p.verdict='pick'; p.regions=[+s.dataset.i]; LabApp.persist('bossplan2-scheme'); rer(); return; }
    var a=e.target.closest&&e.target.closest('.b2-take'); if(a){ var b=B(a.dataset.b); save(b,+a.dataset.i,b.phases[+a.dataset.i].sug.slice()); rer(); return; }
    var aa=e.target.closest&&e.target.closest('.b2-takeall'); if(aa){ var b2=B(aa.dataset.b); b2.phases.forEach(function(Ph,i){ if(!chosen(b2,i))save(b2,i,Ph.sug.slice()); }); rer(); return; }
    var m=e.target.closest&&e.target.closest('.b2-mv'); if(m){ var b3=B(m.dataset.b), i=+m.dataset.i, j=+m.dataset.j, d=+m.dataset.d, L=list(b3,i), k2=j+d; if(k2<0||k2>=L.length)return; var x=L[j]; L[j]=L[k2]; L[k2]=x; save(b3,i,L); rer(); return; }
    var v=e.target.closest&&e.target.closest('.b2-mvv'); if(v){ var sg=v.parentNode, k=sg.dataset.k, p2=LabApp.picks[k]=LabApp.picks[k]||{}; p2.verdict=p2.verdict===v.dataset.v?null:v.dataset.v; LabApp.persist(k);
      [].forEach.call(sg.children,function(x){ x.className='vbtn b2-mvv'+(x.dataset.v===p2.verdict?' on '+p2.verdict:''); }); } });
  document.addEventListener('change',function(e){ var c=e.target.closest&&e.target.closest('.b2-cb'); if(c){ var b=B(c.dataset.b), i=+c.dataset.i, L=list(b,i), id=c.dataset.id, j=L.indexOf(id);
      if(c.checked&&j<0)L.push(id); if(!c.checked&&j>=0)L.splice(j,1); save(b,i,L); rer(); return; }
    var n=e.target.closest&&e.target.closest('.b2-n'); if(n){ var p=LabApp.picks[n.dataset.k]=LabApp.picks[n.dataset.k]||{}; p.notes=n.value; if(!p.verdict&&/_p\d+$/.test(n.dataset.k)){ var mm=n.dataset.k.match(/^bossplan2-(.+)_p(\d+)$/), b4=B(mm[1]); if(b4){ p.verdict='pick'; p.regions=list(b4,+mm[2]-1); } } LabApp.persist(n.dataset.k); } });
  var st=document.createElement('style'); st.textContent='.b2-txt{font:13px/1.5 "Segoe UI";color:#c8d4e4;margin:6px 0 10px}.b2-sch{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px}'+
    '.b2-s{display:flex;flex-direction:column;gap:3px;background:#101a28;border:1px solid #243246;border-radius:8px;padding:8px 10px;cursor:pointer;font:12.5px/1.45 "Segoe UI";color:#b8c6d8}.b2-s input{display:none}.b2-s b{color:#ffe9a8;font:600 14px Georgia,serif}.b2-s.on{background:#16301f;border-color:#8fe8a0}'+
    '.b2-f{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px}.b2-g.on{background:#2a4a6a;color:#fff}.b2-gh{color:#ffe9a8;font:600 18px Georgia,serif;margin:18px 0 6px}'+
    '.b2-boss{background:#0b121c;border:1px solid #243246;border-radius:10px;padding:10px 12px;margin:0 0 14px}.b2-h{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px}.b2-h h4{margin:0;color:#ffe9a8;font:600 16px Georgia,serif}.b2-w{font:12px "Segoe UI";color:#8fa0b8}'+
    '.b2-nat{font:600 11px "Segoe UI";padding:1px 7px;border-radius:8px;background:#2a2a2a;color:#d8c8a8}.b2-pc{margin-left:auto;font:12px "Segoe UI";color:#8fe8a0}.b2-move{font:12.5px/1.5 "Segoe UI";color:#b8c6d8;margin:6px 0}.b2-move small{color:#7f90a8}'+
    '.b2-mvv{padding:2px 9px;font-size:12px;opacity:.8}.b2-mvv.on{opacity:1}.b2-mvv.on.pick{background:#1f6a3a;color:#fff}.b2-mvv.on.cut{background:#6a1f1f;color:#fff}'+
    '.b2-ph{border:1px solid #243246;border-radius:8px;padding:8px 10px;margin:8px 0;background:#0e1724}.b2-ph.mine{border-color:#3f7a52}.b2-ph-h{display:flex;flex-wrap:wrap;gap:8px;align-items:baseline}.b2-ph-h b{color:#e8eef6;font:600 14px Georgia,serif}.b2-st{font:12px "Segoe UI";color:#9fb0c6}.b2-take,.b2-takeall{padding:2px 9px;font-size:12px}'+
    '.b2-cols{display:grid;grid-template-columns:1fr 1.4fr;gap:12px}.b2-lbl{font:600 11px "Segoe UI";letter-spacing:.06em;text-transform:uppercase;color:#7f90a8;margin:8px 0 3px}.b2-lbl small{text-transform:none;letter-spacing:0;font-weight:400}'+
    '.b2-it{display:flex;gap:6px;align-items:flex-start;font:12px/1.45 "Segoe UI";color:#9fb0c6;padding:3px 6px;border-radius:6px;cursor:pointer}.b2-it.on{color:#e8eef6;background:#132a1c}.b2-it input{margin-top:2px}.b2-it small{color:#7f90a8}.b2-it b{color:#e8eef6}'+
    '.b2-k{width:16px;text-align:center;color:#ffd76a}.b2-ty{display:inline-block;min-width:18px;text-align:center;color:var(--c)}.b2-old{font:600 10px "Segoe UI";color:#ffd76a;border:1px solid #6a5a2a;border-radius:5px;padding:0 4px}'+
    '.b2-ez{font-style:normal;font:600 10.5px "Segoe UI";color:var(--e);border:1px solid var(--e);border-radius:5px;padding:0 4px;white-space:nowrap}'+
    '.b2-rank{margin:2px 0 4px;padding-left:22px;font:12.5px/1.6 "Segoe UI";color:#c8d4e4}.b2-rank li{display:flex;gap:6px;align-items:center}.b2-rl{flex:1}.b2-dd i{font-style:normal;margin-right:2px}.b2-dd i.off{opacity:.18;filter:grayscale(1)}'+
    '.b2-mv{background:#1a2738;border:1px solid #2a3a50;color:#9fb0c6;border-radius:4px;font-size:10px;padding:0 5px;cursor:pointer}.b2-cnt{font:12px "Segoe UI";color:#9fb0c6;margin:2px 0 6px}.b2-cnt b{color:#ffe9a8}.b2-none{color:#5a6a80;font:12px "Segoe UI"}'+
    '.b2-n{width:100%}.b2-all{min-height:70px;margin-top:10px;background:#0b121c;color:#e8eef6;border:1px solid #243246;border-radius:8px;padding:8px;font:13px "Segoe UI"}'+
    '.b2-ul{font:12.5px/1.5 "Segoe UI";color:#b8c6d8;padding-left:18px}.b2-cat{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}.b2-th{background:#0b121c;border:1px solid #243246;border-top:3px solid var(--c);border-radius:10px;padding:10px}'+
    '.b2-th h5{margin:0 0 6px;color:var(--c);font:600 14px Georgia,serif}.b2-t{display:flex;gap:8px;font:12px/1.4 "Segoe UI";color:#b8c6d8;margin:0 0 6px}.b2-t.cut{opacity:.45;text-decoration:line-through}.b2-t b{color:#e8eef6}@media (max-width:760px){.b2-cols{grid-template-columns:1fr}}';
  document.head.appendChild(st);
})();
