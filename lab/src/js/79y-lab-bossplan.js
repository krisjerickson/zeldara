// ═══════════════════════════════════════════════════════════════════════
// ║ 79y-lab-bossplan.js — round 127: BOSS FIGHTS, REMADE (Kris: "a full rehaul of boss attacks and battles. they are too similar to each
// ║ other right now … bosses like skeletons shouldn't have this power of teleportation … a long list of all of the bosses, and around 10
// ║ proposals for what their attacks could be on top of their current attacks, with a way to select on the ones that i like … thematic to
// ║ the boss … a total of at least 50 different types … make sure to show any current summons sprites").
// ║ Data: LBPLAN (79y-0, tools/world/boss_plan.py). Per boss: today's attacks (from the boss list, LBB), how it moves today and how it
// ║ should, its 10 proposals to tick. Picks: 'bossplan-<boss>' {regions:[ticked proposals], verdict: the movement (pick|cut), notes}.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined'||typeof LBPLAN==='undefined')return;
  var D=LBPLAN, TY={}, TH=D.themes; D.types.forEach(function(t){ TY[t.id]=t; });
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, F={grp:'all',open:{}};
  var GROUP=function(b){ var w=b.where; return /★/.test(w)?'Realm guardians':/castle warden/.test(w)?'Castle wardens':/mage tower/.test(w)?'Mage-tower masters':/island guardian/.test(w)?'Island guardians':/elite|treasure-vault/.test(w)?'Elites':/Volcano boss rush/.test(w)?'Volcano boss rush':'Forges, Muspelheim and Asgard'; };
  var GROUPS=['Realm guardians','Castle wardens','Mage-tower masters','Island guardians','Elites','Volcano boss rush','Forges, Muspelheim and Asgard'];
  // today's attacks, from the Lab's own boss list (52-lab-bosses)
  var TODAY=null, today=function(b){ if(!TODAY){ TODAY={}; try{ LBB.fams().forEach(function(f){ TODAY[f.id]=f.rows; }); }catch(e){} }
    var R=TODAY[b.id]||TODAY['boss_'+b.id]; if(!R)return '<p class="bp-now"><i>Its phases and attacks are in the Muspelheim and Solmyrk tabs.</i></p>';
    return '<ul class="bp-now">'+R.map(function(r){ var a=(typeof BossAtk!=='undefined'&&BossAtk.describe)?BossAtk.describe(r.slot):''; var k=(r.kit||'').split('|').map(function(x){ return x.trim().split(' ')[0]; }).filter(Boolean).join(' · ');
      return '<li><b>'+esc(r.lbl)+'</b>'+(a?' — '+esc(a):'')+(k?' <span class="bp-kit">kit: '+esc(k)+'</span>':'')+'</li>'; }).join('')+'</ul>'; };
  var chip=function(t){ var T=TY[t]; return T?'<span class="bp-ty" style="--c:'+TH[T.th].col+'">'+T.ic+' '+esc(T.n)+'</span>':t; };
  var card=function(b){ var k='bossplan-'+b.id, p=P(k), sel=p.regions||[], mv=p.verdict||null, nat=b.nature==='magic';
    var h='<div class="bp-boss" data-b="'+b.id+'"><div class="bp-h"><h4>'+esc(b.name)+'</h4><span class="bp-w">'+esc(b.where)+'</span><span class="bp-nat '+(nat?'magic':'')+'">'+(nat?'✨ magic':'⚒ '+esc(b.nature))+'</span><span class="bp-cnt">'+sel.length+' / 10 ticked</span></div>';
    h+='<div class="bp-today"><div class="bp-lbl">Today</div>'+today(b)+'</div>';
    h+='<div class="bp-move"><div class="bp-lbl">Moving about</div><p><b>Today:</b> like every boss, it blinks to you when you keep away, and every ~9 s at random (09u). <b>Proposed:</b> '+chip(b.move.t)+' '+esc(b.move.d)+'</p>'+
      '<span class="bp-mseg" data-k="'+k+'">'+[['pick','✓ Yes'],['cut','✕ Keep as today']].map(function(o){ return '<button class="vbtn bp-mv'+(mv===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span></div>';
    h+='<div class="bp-lbl">Ten proposals — tick the ones you like</div><div class="bp-ps">'+b.p.map(function(q,i){ var T=TY[q.t], on=sel.indexOf(i)>=0;
      return '<label class="bp-p'+(on?' on':'')+'" data-k="'+k+'" data-i="'+i+'" style="--c:'+TH[T.th].col+'"><input type="checkbox"'+(on?' checked':'')+'><span class="bp-pi">'+T.ic+'</span><span class="bp-pt"><b>'+esc(q.n)+'</b> <small>'+esc(T.n)+' · '+esc(TH[T.th].n)+'</small><br>'+esc(q.d)+(q.art?' <em class="bp-art">new art</em>':'')+'</span></label>'; }).join('')+'</div>';
    h+='<input class="tl-n bp-n" data-k="'+k+'" value="'+esc(p.notes||'')+'" placeholder="Your note on '+esc(b.name.split(',')[0])+'…"></div>'; return h; };
  LAB_TABS.push({ id:'bossplan', name:'Boss fights, remade',
    blurb:'<b>Round 127 — every boss its own fight.</b> A catalogue of <b>'+D.types.length+' kinds of boss move</b> in seven themes, drawn from the game\'s inspirations (Zelda, Hollow Knight and Silksong, Hades, Cuphead and Gungeon, Furi, Titan Souls and Shadow of the Colossus, Dark Souls and Elden Ring, Monster Hunter, God of War and Valheim, Sekiro) and from the game\'s own systems. Then <b>all '+D.bosses.length+' bosses</b>, each with what it does today, how it should move (only bosses with magic keep the blink), and <b>ten proposals chosen for it</b> — tick the ones you like. Below that, every painted unit a boss brings into a fight, for review.',
    designs:D.bosses.map(function(b){ return {id:b.id,name:'Boss plan: '+b.name}; }),
    render:function(){ var h='';
      h+=LBR.sec('The catalogue — '+D.types.length+' kinds of boss move','how often each is proposed below; the themes are colour-coded on every proposal');
      h+='<div class="bp-cat">'+Object.keys(TH).map(function(th){ return '<div class="bp-th" style="--c:'+TH[th].col+'"><h5>'+esc(TH[th].n)+'</h5>'+D.types.filter(function(t){ return t.th===th; }).map(function(t){
          return '<div class="bp-t"><span>'+t.ic+'</span><div><b>'+esc(t.n)+'</b> <small>×'+t.uses+'</small><br>'+esc(t.d)+'<br><i>'+esc(t.from)+'</i></div></div>'; }).join('')+'</div>'; }).join('')+'</div>';
      h+=LBR.sec('Teleporting','Kris: "bosses like skeletons shouldn\'t have this power of teleportation"');
      h+='<p class="bp-txt">Today every boss blinks to you when you keep away (round 106). Proposed: <b>only bosses with magic blink</b> — '+D.bosses.filter(function(b){ return b.move.t==='blink'; }).length+' of '+D.bosses.length+' — and each of them gets a tell of its own (moths, frost, a rift, a hearth). Every other boss gets a way to close the gap that fits it: charges, leaps, swoops, burrows, dives, stomping advances, chain swings, mounted passes or phasing through walls. ✓ or ✕ it on each boss.</p>';
      h+=LBR.sec('Every boss','tick up to ten proposals each · the theme colour is on the left of each');
      h+='<div class="bp-f">'+['all'].concat(GROUPS).map(function(g){ return '<button class="vbtn bp-g'+(F.grp===g?' on':'')+'" data-g="'+esc(g)+'">'+(g==='all'?'All '+D.bosses.length:esc(g)+' ('+D.bosses.filter(function(b){ return GROUP(b)===g; }).length+')')+'</button>'; }).join('')+'</div>';
      GROUPS.forEach(function(g){ if(F.grp!=='all'&&F.grp!==g)return; var L=D.bosses.filter(function(b){ return GROUP(b)===g; }); if(!L.length)return; h+='<h3 class="bp-gh">'+esc(g)+'</h3>'+L.map(card).join(''); });
      h+=LBR.sec('The units bosses bring in — today','every summon, ally, guard and kin I could find, cut from the game\'s own painted sheets');
      h+='<p class="bp-txt"><b>What I checked:</b> every boss and monster that summons (17 kinds), the allies of the phase fights (4), the Muspelheim guards and wardens (6), the elites\' kin (4), the mirror copies, the Asgard risers, the forges\' foes (8) and the volcano rush swarm. <b>All of them have painted sheets, and in live boss fights they drew painted</b> (sampled 16 times each). The only time a stand-in can show is the first frame or two while a sheet loads, and since round 101 it is hidden then. If you saw pixel art, tell me which fight (a note below) — it may be a fight I have not been able to reach in a test, and I will find it there.</p>';
      h+='<div class="bp-units">'+D.units.map(function(u){ return '<div class="bp-u">'+(u.img?'<img src="preview/bossplan/'+u.img+'" alt="" loading="lazy">':'<div class="bp-miss">no painting</div>')+'<b>'+esc(u.name)+'</b><small>'+esc(u.who)+' · '+esc(u.how)+'</small></div>'; }).join('')+'</div>';
      var NEW=[]; D.bosses.forEach(function(b){ b.p.forEach(function(q,i){ if(q.art)NEW.push([b,q,i]); }); });
      h+=LBR.sec('New paintings these proposals would need','I will request them once you have ticked — only for the ones you keep');
      h+='<ul class="bp-new">'+NEW.map(function(x){ var on=(P('bossplan-'+x[0].id).regions||[]).indexOf(x[2])>=0; return '<li class="'+(on?'on':'')+'">'+chip(x[1].t)+' <b>'+esc(x[1].n)+'</b> — '+esc(x[0].name.split(',')[0])+': '+esc(x[1].d)+(on?' <em>✓ ticked</em>':'')+'</li>'; }).join('')+'</ul>';
      h+='<textarea class="bp-n bp-all" data-k="bossplan-all" placeholder="Anything about boss fights as a whole — which themes you want more of, which fights felt alike…">'+esc(P('bossplan-all').notes||'')+'</textarea>';
      return h; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'bossplan',label:'⚔ Boss fights, remade: tick the proposals you like for each of the '+D.bosses.length+' bosses, and ✓ / ✕ how each moves',where:'Boss fights, remade tab',
    done:function(){ return D.bosses.every(function(b){ var p=P('bossplan-'+b.id); return !!p.verdict||(p.regions||[]).length>0; }); },go:function(){ LTODO.goTo('bossplan','.bp-boss',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('bossplan')<0)LAB_ACTIVE.unshift('bossplan');
  var rer=function(){ if(typeof LabApp!=="undefined"&&LabApp.renderGrid)LabApp.renderGrid(true); };
  document.addEventListener('click',function(e){ var g=e.target.closest&&e.target.closest('.bp-g'); if(g){ F.grp=g.dataset.g; rer(); return; }
    var b=e.target.closest&&e.target.closest('.bp-mv'); if(b){ var s=b.parentNode, k=s.dataset.k, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===b.dataset.v?null:b.dataset.v; LabApp.persist(k);
      [].forEach.call(s.children,function(x){ x.className='vbtn bp-mv'+(x.dataset.v===p.verdict?' on '+p.verdict:''); }); } });
  document.addEventListener('change',function(e){ var l=e.target.closest&&e.target.closest('.bp-p'); if(l){ var k=l.dataset.k, i=+l.dataset.i, p=LabApp.picks[k]=LabApp.picks[k]||{}, R=(p.regions||[]).slice(), j=R.indexOf(i);
      if(e.target.checked&&j<0)R.push(i); if(!e.target.checked&&j>=0)R.splice(j,1); R.sort(function(a,b){ return a-b; }); p.regions=R; if(!p.verdict&&R.length)p.verdict=p.verdict||null; LabApp.persist(k); l.classList.toggle('on',e.target.checked);
      var c=l.closest('.bp-boss'); if(c){ var n=c.querySelector('.bp-cnt'); if(n)n.textContent=R.length+' / 10 ticked'; } return; }
    var t=e.target.closest&&e.target.closest('.bp-n'); if(t){ var p2=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p2.notes=t.value; LabApp.persist(t.dataset.k); } });
  var st=document.createElement('style'); st.textContent='.bp-txt{font:13px/1.5 "Segoe UI";color:#c8d4e4;margin:0 0 10px}.bp-cat{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}.bp-th{background:#0b121c;border:1px solid #243246;border-left:4px solid var(--c);border-radius:8px;padding:8px}'+
    '.bp-th h5{margin:0 0 6px;color:var(--c);font:600 14px Georgia,serif}.bp-t{display:flex;gap:8px;font:12px/1.4 "Segoe UI";color:#b8c6d8;margin:0 0 6px}.bp-t>span{font-size:16px}.bp-t b{color:#e8eef6}.bp-t i{color:#7f90a8}.bp-t small{color:#ffd76a}'+
    '.bp-f{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px}.bp-g.on{background:#2a4a6a;color:#fff}.bp-gh{color:#ffe9a8;font:600 18px Georgia,serif;margin:18px 0 6px}'+
    '.bp-boss{background:#0b121c;border:1px solid #243246;border-radius:10px;padding:10px 12px;margin:0 0 12px}.bp-h{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px}.bp-h h4{margin:0;color:#ffe9a8;font:600 16px Georgia,serif}.bp-w{font:12px "Segoe UI";color:#8a9ab0}'+
    '.bp-nat{font:600 11px "Segoe UI";padding:1px 7px;border-radius:8px;background:#2a2a2a;color:#d8c8a8}.bp-nat.magic{background:#3a2a5a;color:#e0d0ff}.bp-cnt{margin-left:auto;font:12px "Segoe UI";color:#8fe8a0}'+
    '.bp-lbl{font:600 11px "Segoe UI";letter-spacing:.06em;text-transform:uppercase;color:#7f90a8;margin:8px 0 3px}.bp-now{margin:0;padding-left:18px;font:12px/1.45 "Segoe UI";color:#a8b8cc}.bp-kit{color:#6f8098}.bp-move p{margin:0 0 4px;font:12.5px/1.45 "Segoe UI";color:#c8d4e4}'+
    '.bp-ty{display:inline-block;font:600 11px "Segoe UI";color:var(--c);border:1px solid var(--c);border-radius:6px;padding:0 5px;margin-right:3px}.bp-mv{padding:2px 9px;font-size:12px;opacity:.8}.bp-mv.on{opacity:1}.bp-mv.on.pick{background:#1f6a3a;color:#fff}.bp-mv.on.cut{background:#4a4a4a;color:#fff}'+
    '.bp-ps{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:6px}.bp-p{display:flex;gap:7px;align-items:flex-start;background:#101a28;border:1px solid #243246;border-left:4px solid var(--c);border-radius:7px;padding:6px 8px;cursor:pointer;font:12px/1.4 "Segoe UI";color:#b8c6d8}'+
    '.bp-p.on{background:#16301f;border-color:#8fe8a0;border-left-color:var(--c)}.bp-p input{margin-top:3px}.bp-pi{font-size:16px}.bp-p b{color:#e8eef6}.bp-p small{color:#7f90a8}.bp-art{font-style:normal;font-weight:600;color:#ffb86a;margin-left:4px}.bp-n{width:100%;box-sizing:border-box;margin-top:8px;font-size:12.5px}.bp-all{min-height:60px}'+
    '.bp-units{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:8px}.bp-u{background:#101a28;border:1px solid #243246;border-radius:8px;padding:6px;text-align:center;font:12px "Segoe UI";color:#c8d4e4}.bp-u img{width:100%;height:96px;object-fit:contain;display:block;margin-bottom:4px}.bp-u small{display:block;color:#7f90a8;font-size:11px}.bp-miss{height:96px;display:flex;align-items:center;justify-content:center;color:#ff9a8a}'+
    '.bp-new{font:12.5px/1.5 "Segoe UI";color:#b8c6d8;padding-left:18px}.bp-new li.on{color:#e8f8e8}.bp-new em{color:#8fe8a0;font-style:normal}@media (max-width:700px){.bp-ps{grid-template-columns:1fr}}';
  document.head.appendChild(st);
})();
