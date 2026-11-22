// ═══════════════════════════════════════════════════════════════════════
// ║ 79z-lab-r128.js — round 128: three new places in the Lab.
// ║  › Playing and coming back (engage) — Kris: "a full 'playability and engagement' analysis … reducing friction and improving gameplay …
// ║    retention and engagement … overarching theses … holistic proposals … Cap this at 40 new proposals".
// ║  › Releasing the game (publish) — "the main ways in which we could actually release this game … Steam and … Roblox … amounts to charge
// ║    and any ongoing fees", and "an analysis on legal exposure … Zeldira instead of Zeldara … how much AI we've used and any labels".
// ║  › Emojis, painted (icons) — "all the places we are still using emojis or icons, and make proposals of how to replace these with
// ║    painted images".
// ║ Data: LR128 (79z-0, tools/world/r128_plan.py). Picks: 'engage-<id>', 'publish-<route>', 'legal-<id>', 'legal-name' (regions:[the pair]),
// ║ 'icons-<part>' — each {verdict: pick|maybe|cut, notes}; '<tab>-all' {notes}.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined'||typeof LR128==='undefined')return;
  var D=LR128, E=D.engage, PB=D.publish, IC=D.icons;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, F={th:'all',part:'all'};
  var asset=function(p){ return (typeof R128A!=='undefined'&&R128A[p])||p; };
  var VB=[['pick','✓ Yes'],['maybe','? Maybe'],['cut','✕ No']];
  var seg=function(k,labels){ var v=P(k).verdict||null; return '<span class="r8-seg" data-k="'+k+'">'+(labels||VB).map(function(o){ return '<button class="vbtn r8-v'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n r8-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+esc(ph||'Your note…')+'">'; };
  var area=function(k,ph){ return '<textarea class="r8-n r8-all" data-k="'+k+'" placeholder="'+esc(ph)+'">'+esc(P(k).notes||'')+'</textarea>'; };
  var srcs=function(S,ids){ return (ids||[]).filter(function(i){ return S[i]; }).map(function(i){ var s=S[i]; return s[1]?'<a href="'+esc(s[1])+'" target="_blank" rel="noopener">'+esc(s[0])+'</a>':esc(s[0]); }).join(' · '); };
  var srcList=function(S){ return '<ol class="r8-src">'+Object.keys(S).map(function(k){ var s=S[k]; return '<li>'+(s[1]?'<a href="'+esc(s[1])+'" target="_blank" rel="noopener">'+esc(s[0])+'</a>':esc(s[0]))+'</li>'; }).join('')+'</ol>'; };
  var count=function(pre,ids){ var c={pick:0,maybe:0,cut:0,none:0}; ids.forEach(function(i){ var v=P(pre+i).verdict; c[v||'none']++; }); return c; };
  var tally=function(c,n){ return '<span class="r8-tally"><b class="pick">✓ '+c.pick+'</b> <b class="maybe">? '+c.maybe+'</b> <b class="cut">✕ '+c.cut+'</b> · '+c.none+' of '+n+' still open</span>'; };
  var TH={}; E.theses.forEach(function(t){ TH[t.id]=t; });

  // ═══ › Playing and coming back ═══
  var pcard=function(p,i){ var t=TH[p.th], k='engage-'+p.id, v=P(k).verdict||'';
    return '<div class="r8-card '+v+'" style="--c:'+t.col+'"><div class="r8-h"><span class="r8-no">'+(i+1)+'</span><h4>'+esc(p.n)+'</h4><span class="r8-chip">'+t.ic+' '+esc(t.n)+'</span><span class="r8-eff">effort '+p.eff+'</span>'+(p.art?'<span class="r8-art">🎨 '+esc(p.art)+'</span>':'')+'</div>'+
      '<p class="r8-d">'+esc(p.d)+'</p><div class="r8-cols"><div><div class="r8-lbl">What changes</div><ul>'+p.ch.map(function(c){ return '<li>'+esc(c)+'</li>'; }).join('')+'</ul></div>'+
      '<div><div class="r8-lbl">Why</div><p>'+esc(p.why)+'</p><div class="r8-lbl">We would measure</div><p>'+esc(p.m)+'</p></div></div>'+
      '<div class="r8-foot">'+seg(k)+note(k,'Your note on '+p.n+'…')+'</div></div>'; };
  LAB_TABS.push({ id:'engage', name:'Playing and coming back',
    blurb:'<b>Round 128 — playability and engagement.</b> What the evidence says (benchmarks, the psychology of play, the games that do it best), where the game rubs today, <b>seven theses</b> and <b>40 proposals</b> in three waves. ✓ / ? / ✕ each one and add a note; nothing is built until you choose.',
    designs:E.p.map(function(p){ return {id:'engage-'+p.id,name:'Engagement: '+p.n}; }),
    render:function(){ var h='';
      h+=LBR.sec('What the numbers say','retention, sessions and the door — the benchmarks the proposals aim at');
      h+='<table class="r8-tab"><tr><th>Measure</th><th>What good looks like</th><th>Source</th></tr>'+E.bench.map(function(b){ return '<tr><td>'+esc(b[0])+'</td><td>'+esc(b[1])+'</td><td>'+srcs(E.src,[b[2]])+'</td></tr>'; }).join('')+'</table>';
      h+=LBR.sec('The game today','what already pulls, and where it rubs');
      h+='<ul class="r8-today">'+E.today.map(function(t){ return '<li class="'+t[0]+'"><b>'+(t[0]==='good'?'✓ ':'△ ')+esc(t[1])+'</b> — '+esc(t[2])+'</li>'; }).join('')+'</ul>';
      h+=LBR.sec('Seven theses','what the 40 proposals stand on');
      h+='<div class="r8-th">'+E.theses.map(function(t){ var n=E.p.filter(function(p){ return p.th===t.id; }).length;
        return '<div class="r8-t" style="--c:'+t.col+'"><h5>'+t.ic+' '+esc(t.n)+' <small>'+n+' proposals</small></h5><p><b>'+esc(t.claim)+'</b></p><p>'+esc(t.why)+'</p><p class="r8-s">'+srcs(E.src,t.src)+'</p></div>'; }).join('')+'</div>';
      h+=LBR.sec('The 40 proposals',tally(count('engage-',E.p.map(function(p){ return p.id; })),40));
      h+='<div class="r8-f">'+['all'].concat(E.theses.map(function(t){ return t.id; })).map(function(id){ var t=TH[id]; return '<button class="vbtn r8-fth'+(F.th===id?' on':'')+'" data-th="'+id+'">'+(t?t.ic+' '+esc(t.n):'All 40')+'</button>'; }).join('')+'</div>';
      h+=E.p.map(function(p,i){ return (F.th==='all'||F.th===p.th)?pcard(p,i):''; }).join('');
      h+=LBR.sec('Three waves','the order I would build them in — your ✓ / ✕ change it');
      var byId={}; E.p.forEach(function(p){ byId[p.id]=p; });
      h+='<div class="r8-waves">'+E.waves.map(function(w){ return '<div class="r8-w"><h5>'+esc(w[0])+'</h5><ul>'+w[1].map(function(id){ var v=P('engage-'+id).verdict||''; return '<li class="'+v+'">'+esc(byId[id].n)+(v?' <em>'+({pick:'✓',maybe:'?',cut:'✕'})[v]+'</em>':'')+'</li>'; }).join('')+'</ul></div>'; }).join('')+'</div>';
      h+=area('engage-all','Anything about playing and coming back as a whole — what you want most, what you never want…');
      h+=LBR.sec('Sources',''); h+=srcList(E.src);
      return h; } });

  // ═══ › Releasing the game ═══
  var rcard=function(r){ var k='publish-'+r.id, v=P(k).verdict||'', rec={first:'my pick: first',later:'my pick: later',maybe:'my pick: maybe',no:'my pick: not now'}[r.rec];
    var row=function(l,t){ return '<tr><th>'+l+'</th><td>'+esc(t)+'</td></tr>'; };
    return '<div class="r8-card '+v+'" style="--c:'+({first:'#8fe8a0',later:'#7fd0ff',maybe:'#ffe08a',no:'#ff8a8a'})[r.rec]+'"><div class="r8-h"><h4>'+r.ic+' '+esc(r.n)+'</h4><span class="r8-chip">'+rec+'</span></div><p class="r8-d">'+esc(r.what)+'</p>'+
      '<div class="r8-cols"><div><div class="r8-lbl">How</div><ul>'+r.how.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul></div><div><table class="r8-kv">'+
      row('Files that ship',r.files)+row('Claude does',r.claude)+row('Kris does',r.kris)+row('Others',r.others)+row('Fees',r.fees)+row('Price',r.price)+row('Time',r.time)+row('Reach',r.reach)+row('Risks',r.risks)+'</table></div></div>'+
      (r.src.length?'<p class="r8-s">'+srcs(PB.src,r.src)+'</p>':'')+'<div class="r8-foot">'+seg(k)+note(k,'Your note on '+r.n.split(' (')[0].split(' —')[0]+'…')+'</div></div>'; };
  var lvl={high:'#ff8a8a',med:'#ffd76a',low:'#8fe8a0'};
  LAB_TABS.push({ id:'publish', name:'Releasing the game',
    blurb:'<b>Round 128 — releasing the game, the money and the law.</b> Nine routes (Steam, the web, itch.io, portals, Epic, phones, Discord, Roblox, consoles) with who does what, the files that ship, fees and prices; then the legal exposure — the name first, the AI tools\' terms, what we own and the labels the game must carry. <i>Facts checked 21 Nov 2026; not legal, tax or financial advice.</i>',
    designs:PB.routes.map(function(r){ return {id:'publish-'+r.id,name:'Release: '+r.n}; }),
    render:function(){ var h='', N=PB.name, M=PB.math;
      h+=LBR.sec('My recommendation','in this order');
      h+='<ol class="r8-rec"><li><b>Rename first</b> — both heroes and the title, away from ZELD- (below), cleared by a trademark search before anything public.</li><li><b>Fix the licences</b> — the Suno free-plan songs and Kling\'s commercial terms (below).</li><li><b>The free first chapter on the web and itch.io</b>, once the game starts in seconds — it builds an audience and Steam wishlists.</li><li><b>Steam</b> as the main paid release, $14.99, with a demo in Next Fest.</li><li><b>Later</b>: Epic (keeps nothing on the first $1M), the web portals as a funnel, phones, Discord once co-op exists.</li><li><b>Maybe</b> a small Roblox companion — it is a second game, not a port. <b>Not</b> consoles for now.</li></ol>';
      h+=LBR.sec('The routes',tally(count('publish-',PB.routes.map(function(r){ return r.id; })),PB.routes.length));
      h+=PB.routes.map(rcard).join('');
      h+=LBR.sec('Fees at a glance','one-time, per sale, and every year');
      h+='<table class="r8-tab"><tr><th>Where</th><th>To start</th><th>Per sale</th><th>Ongoing</th></tr>'+PB.fees.map(function(f){ return '<tr><td>'+esc(f[0])+'</td><td>'+esc(f[1])+'</td><td>'+esc(f[2])+'</td><td>'+esc(f[3])+'</td></tr>'; }).join('')+'</table>';
      h+=LBR.sec('What a Steam release might bring','an illustration, not a forecast');
      h+='<p class="r8-txt">'+M.copies.toLocaleString()+' copies at $'+M.price+' = <b>$'+M.gross.toLocaleString()+'</b> gross. Less refunds (≈ '+Math.round(M.refund*100)+' %) and regional prices and sales tax (≈ '+Math.round(M.region_vat*100)+' %) ≈ <b>$'+M.net.toLocaleString()+'</b>; Valve keeps '+Math.round(M.cut*100)+' % → <b>≈ $'+M.you.toLocaleString()+'</b> to you, before income tax. Most small games sell hundreds, not thousands — the wishlists before launch are the best guide.</p>';
      h+=LBR.sec('Steam, step by step','');
      h+='<ol class="r8-rec">'+PB.steam_steps.map(function(s){ return '<li>'+esc(s)+'</li>'; }).join('')+'</ol>';
      h+=LBR.sec('The law — the name','Kris: "i think i need to change the female hero name to Zeldira instead of Zeldara (too close to Zelda)"');
      h+='<ul class="r8-today">'+N.facts.map(function(f){ return '<li>'+esc(f)+'</li>'; }).join('')+'</ul><p class="r8-verdict"><b>My view:</b> '+esc(N.verdict)+'</p><p class="r8-txt"><b>What a rename touches:</b> '+esc(N.cost)+'</p>';
      var ch=(P('legal-name').regions||[])[0]||'';
      h+='<div class="r8-names">'+N.options.map(function(o){ return '<label class="r8-name'+(ch===o[0]?' on':'')+'" data-c="'+o[0]+'"><input type="radio" name="r8name"'+(ch===o[0]?' checked':'')+'><b>'+esc(o[1])+' &amp; '+esc(o[2])+'</b><i>'+esc(o[3])+'</i><span class="r8-risk '+o[4]+'">'+(o[4]==='high'?'risk: still high':'to clear')+'</span><small>'+esc(o[5])+'</small></label>'; }).join('')+'</div>';
      h+='<p class="r8-s">'+esc(N.note)+'</p>'+note('legal-name','Another pair you like, or a title idea…');
      h+=LBR.sec('The law — everything else','by how much it matters before selling');
      h+=PB.law.filter(function(l){ return l.id!=='name'; }).map(function(l){ var k='legal-'+l.id, v=P(k).verdict||'';
        return '<div class="r8-card '+v+'" style="--c:'+lvl[l.lvl]+'"><div class="r8-h"><h4>'+esc(l.n)+'</h4><span class="r8-chip">'+({high:'matters a lot',med:'matters',low:'small'})[l.lvl]+'</span></div><p class="r8-d">'+esc(l.what)+'</p><p><b>Do:</b> '+esc(l.do)+'</p>'+(l.src.length?'<p class="r8-s">'+srcs(PB.src,l.src)+'</p>':'')+
          '<div class="r8-foot">'+seg(k,[['pick','✓ Do it'],['maybe','? Talk first'],['cut','✕ Not needed']])+note(k)+'</div></div>'; }).join('');
      h+=LBR.sec('The labels','one honest sentence, in four places');
      h+='<blockquote class="r8-q">'+esc(PB.label_text)+'</blockquote><table class="r8-tab"><tr><th>Where</th><th>What</th></tr>'+PB.labels.map(function(l){ return '<tr><td>'+esc(l[0])+'</td><td>'+esc(l[1])+'</td></tr>'; }).join('')+'</table>';
      h+=area('publish-all','Anything about releasing the game — where you want it, a price you have in mind, questions for a lawyer…');
      h+=LBR.sec('Sources',''); h+=srcList(PB.src);
      return h; } });

  // ═══ › Emojis, painted ═══
  var HV=D.have, img=function(id,em){ var p=HV.pos[id]; if(!p)return ''; var s=(em||1.6), k=s/HV.S;
    return '<i class="r8-ic" title="'+esc(id)+'" style="width:'+s+'em;height:'+s+'em;background:url('+asset('preview/r128/have_icons.webp')+') no-repeat -'+(p[0]*k)+'em -'+(p[1]*k)+'em/'+(HV.w*k)+'em '+(HV.h*k)+'em"></i>'; };
  var NEWN={}; IC.sheets.forEach(function(s){ s.items.forEach(function(i){ NEWN[i[0]]=i; }); });
  var gl=function(a){ return a.map(function(g){ return '<span class="r8-g">'+esc(g)+'</span>'; }).join(''); };
  LAB_TABS.push({ id:'icons', name:'Emojis, painted',
    blurb:'<b>Round 128 — the last emojis.</b> Every emoji and symbol still in the game, found by reading the code and by playing it painted. Where a painted icon already exists, only the wiring is missing; where none does, <b>'+IC.new_n+' new icons on 3 sheets</b> are ready to paint (<code>.\\tools\\sprites\\paint.ps1 -List r128_icons</code>). ✓ / ? / ✕ each part.',
    designs:IC.parts.filter(function(p){ return !p.dev; }).map(function(p){ return {id:'icons-'+p.id,name:'Icons: '+p.n}; }),
    render:function(){ var h='', I=IC.items;
      h+=LBR.sec('What I found','');
      h+='<ul class="r8-today"><li><b>'+IC.total.toLocaleString()+'</b> emoji and symbols in the player-facing code, in '+IC.parts.filter(function(p){ return !p.dev; }).length+' parts of the game (the Dev tools are left alone).</li>'+
        '<li>Played painted, with every pause tab, the shop and the journal open, <b>'+IC.runtime.length+' different emoji</b> were on screen: '+gl(IC.runtime)+'</li>'+
        '<li>Items: <b>'+I.ok+' of '+I.n+'</b> have their painted icon. The '+I.miss+' that show an emoji (45 economy pieces, '+I.trophies+' Alpha trophies, 4 saddles) were all ordered in round 121 (sc_eco_icons_1–9) — <b>you have painted them</b>, and this round takes them in.</li>'+
        '<li>The game already has a painted-icon system (ZIcon, round 32): every call carries the emoji it replaces, so a sheet can arrive at any time and nothing is ever blank. This round only adds icons and wiring to it.</li></ul>';
      h+=LBR.sec('Painted icons we already have — only the wiring is missing','today\'s emoji → the painting that would replace it');
      var seen={}, pairs=[]; IC.parts.forEach(function(p){ if(p.dev)return; p.wire.forEach(function(w){ if(!seen[w[0]]){ seen[w[0]]=1; pairs.push(w); } }); });
      h+='<div class="r8-wire">'+pairs.map(function(w){ return '<span class="r8-pair"><span class="r8-g">'+esc(w[0])+'</span>→'+img(w[1])+'<small>'+esc(w[1])+'</small></span>'; }).join('')+'</div>';
      h+=LBR.sec('By part of the game',tally(count('icons-',IC.parts.filter(function(p){ return !p.dev; }).map(function(p){ return p.id; })),IC.parts.filter(function(p){ return !p.dev; }).length));
      h+=IC.parts.map(function(p){ var k='icons-'+p.id, v=P(k).verdict||'';
        return '<div class="r8-card '+v+(p.dev?' dev':'')+'" style="--c:'+(p.dev?'#556':'#a8f0e8')+'"><div class="r8-h"><h4>'+esc(p.n)+'</h4><span class="r8-chip">'+p.uses+' uses in '+p.files.length+' files</span></div>'+
          '<p class="r8-d"><b>Today:</b> '+esc(p.today)+'</p><p><b>Proposal:</b> '+esc(p.prop)+'</p>'+
          (p.wire.length?'<div class="r8-lbl">Wire to a painting we have ('+p.wire.length+')</div><div class="r8-wire">'+p.wire.map(function(w){ return '<span class="r8-pair"><span class="r8-g">'+esc(w[0])+'</span>→'+img(w[1],1.3)+'</span>'; }).join('')+'</div>':'')+
          (p.new.length?'<div class="r8-lbl">New paintings ('+p.new.length+')</div><div class="r8-wire">'+p.new.map(function(w){ var n=NEWN[w[1]]; return '<span class="r8-pair new" title="'+esc(n?n[2]:'')+'"><span class="r8-g">'+esc(w[0])+'</span>→ <b>'+esc(n?n[1]:w[1])+'</b></span>'; }).join('')+'</div>':'')+
          (p.typo.length?'<div class="r8-lbl">Typography (arrows, dots, ticks) — keep as text, in the game\'s rune font</div><div>'+gl(p.typo)+'</div>':'')+
          (p.rest.length?'<div class="r8-lbl">Other glyphs — '+(p.id==='items'||p.id==='elements'?'mostly items, shown through each item\'s own painted icon':'shown through the thing they name (an item, a monster\'s face) or kept')+'</div><div>'+gl(p.rest)+'</div>':'')+
          (p.dev?'':'<div class="r8-foot">'+seg(k,[['pick','✓ Paint and wire'],['maybe','? Later'],['cut','✕ Leave']])+note(k)+'</div>')+'</div>'; }).join('');
      h+=LBR.sec('The new paintings — '+IC.new_n+' icons on 3 sheets','wave 129 · the same style as the painted icons above');
      h+=IC.sheets.map(function(s){ return '<div class="r8-sheet"><h5>'+esc(s.title)+' <small>'+esc(s.id)+' · '+s.items.length+'</small></h5><div class="r8-newl">'+s.items.map(function(i){ return '<span><b>'+esc(i[1])+'</b> — '+esc(i[2])+'</span>'; }).join('')+'</div></div>'; }).join('');
      h+=area('icons-all','Anything about icons — ones you want painted first, a style you prefer, places I missed…');
      return h; } });

  if(typeof LTODO!=='undefined'){
    LTODO.add({id:'engage',label:'🕯 Playing and coming back: ✓ / ? / ✕ the 40 proposals',where:'Playing and coming back tab',done:function(){ return E.p.every(function(p){ return !!P('engage-'+p.id).verdict; }); },go:function(){ LTODO.goTo('engage','.r8-card',0); }});
    LTODO.add({id:'publish',label:'🎮 Releasing the game: choose a new name, ✓ / ✕ the routes and the legal steps',where:'Releasing the game tab',done:function(){ return !!(P('legal-name').regions||[]).length&&PB.routes.every(function(r){ return !!P('publish-'+r.id).verdict; }); },go:function(){ LTODO.goTo('publish','.r8-names',0); }});
    LTODO.add({id:'icons',label:'🎨 Emojis, painted: ✓ / ✕ each part of the game, then paint r128_icons',where:'Emojis, painted tab',done:function(){ return IC.parts.every(function(p){ return p.dev||!!P('icons-'+p.id).verdict; }); },go:function(){ LTODO.goTo('icons','.r8-card',0); }});
  }
  if(typeof LAB_ACTIVE!=='undefined')['icons','publish','engage'].forEach(function(id){ if(LAB_ACTIVE.indexOf(id)<0)LAB_ACTIVE.unshift(id); });
  var rer=function(){ if(typeof LabApp!=='undefined'&&LabApp.renderGrid)LabApp.renderGrid(true); };
  document.addEventListener('click',function(e){ var t=e.target.closest&&e.target.closest('.r8-fth'); if(t){ F.th=t.dataset.th; rer(); return; }
    var b=e.target.closest&&e.target.closest('.r8-v'); if(b){ var s=b.parentNode, k=s.dataset.k, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===b.dataset.v?null:b.dataset.v; LabApp.persist(k);
      [].forEach.call(s.children,function(x){ x.className='vbtn r8-v'+(x.dataset.v===p.verdict?' on '+p.verdict:''); }); var c=s.closest('.r8-card'); if(c){ c.classList.remove('pick','maybe','cut'); if(p.verdict)c.classList.add(p.verdict); } return; }
    var nm=e.target.closest&&e.target.closest('.r8-name'); if(nm){ var p2=LabApp.picks['legal-name']=LabApp.picks['legal-name']||{}; p2.verdict='pick'; p2.regions=[nm.dataset.c]; LabApp.persist('legal-name');
      [].forEach.call(document.querySelectorAll('.r8-name'),function(x){ x.classList.toggle('on',x===nm); }); } });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.r8-n'); if(t){ var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); } });
  var st=document.createElement('style'); st.textContent='.r8-txt,.r8-d,.r8-card p{font:13px/1.5 "Segoe UI";color:#c8d4e4;margin:0 0 8px}.r8-card{background:#0b121c;border:1px solid #243246;border-left:4px solid var(--c);border-radius:10px;padding:10px 12px;margin:0 0 12px}'+
    '.r8-card.pick{background:#0f2016}.r8-card.cut{opacity:.6}.r8-card.dev{opacity:.55}.r8-h{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px;margin-bottom:4px}.r8-h h4{margin:0;color:#ffe9a8;font:600 16px Georgia,serif}.r8-no{font:600 12px "Segoe UI";color:#7f90a8}'+
    '.r8-chip{font:600 11px "Segoe UI";color:var(--c);border:1px solid var(--c);border-radius:8px;padding:0 7px}.r8-eff{font:11px "Segoe UI";color:#9fb0c6}.r8-art{font:11px "Segoe UI";color:#ffb86a}'+
    '.r8-cols{display:grid;grid-template-columns:1fr 1fr;gap:14px}.r8-cols ul{margin:0;padding-left:18px;font:12.5px/1.5 "Segoe UI";color:#b8c6d8}.r8-lbl{font:600 11px "Segoe UI";letter-spacing:.06em;text-transform:uppercase;color:#7f90a8;margin:8px 0 3px}'+
    '.r8-foot{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}.r8-foot .r8-n{flex:1;min-width:200px}.r8-v{padding:2px 9px;font-size:12px;opacity:.8}.r8-v.on{opacity:1}.r8-v.on.pick{background:#1f6a3a;color:#fff}.r8-v.on.maybe{background:#6a5a1f;color:#fff}.r8-v.on.cut{background:#6a1f1f;color:#fff}'+
    '.r8-tab{border-collapse:collapse;width:100%;font:12.5px/1.45 "Segoe UI";color:#c8d4e4;margin:0 0 10px}.r8-tab th,.r8-tab td{border-bottom:1px solid #243246;padding:5px 8px;text-align:left;vertical-align:top}.r8-tab th{color:#7f90a8;font-weight:600}.r8-tab a,.r8-s a,.r8-src a{color:#8fc8ff}'+
    '.r8-kv{border-collapse:collapse;font:12px/1.45 "Segoe UI";color:#b8c6d8}.r8-kv th{color:#7f90a8;text-align:left;padding:2px 8px 2px 0;vertical-align:top;white-space:nowrap;font-weight:600}.r8-kv td{padding:2px 0}'+
    '.r8-today{font:13px/1.55 "Segoe UI";color:#c8d4e4;padding-left:18px}.r8-today li.good b{color:#8fe8a0}.r8-today li.rub b{color:#ffb86a}.r8-th{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}'+
    '.r8-t{background:#0b121c;border:1px solid #243246;border-top:3px solid var(--c);border-radius:10px;padding:10px}.r8-t h5{margin:0 0 6px;color:var(--c);font:600 15px Georgia,serif}.r8-t h5 small{color:#7f90a8;font:11px "Segoe UI"}.r8-t p{font:12.5px/1.5 "Segoe UI";color:#b8c6d8;margin:0 0 6px}'+
    '.r8-s{font:11.5px/1.45 "Segoe UI"!important;color:#7f90a8!important}.r8-f{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px}.r8-fth.on{background:#2a4a6a;color:#fff}.r8-tally{font:12px "Segoe UI";color:#9fb0c6}.r8-tally .pick{color:#8fe8a0}.r8-tally .maybe{color:#ffe08a}.r8-tally .cut{color:#ff8a8a}'+
    '.r8-waves{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}.r8-w{background:#0b121c;border:1px solid #243246;border-radius:10px;padding:10px}.r8-w h5{margin:0 0 6px;color:#ffe9a8;font:600 14px Georgia,serif}.r8-w ul{margin:0;padding-left:18px;font:12.5px/1.5 "Segoe UI";color:#b8c6d8}.r8-w li.pick{color:#8fe8a0}.r8-w li.cut{text-decoration:line-through;opacity:.6}.r8-w em{font-style:normal}'+
    '.r8-all{width:100%;min-height:70px;margin-top:10px;background:#0b121c;color:#e8eef6;border:1px solid #243246;border-radius:8px;padding:8px;font:13px "Segoe UI"}.r8-src{font:12px/1.5 "Segoe UI";color:#9fb0c6}'+
    '.r8-rec{font:13px/1.6 "Segoe UI";color:#c8d4e4}.r8-verdict{background:#1c1620;border:1px solid #5a3a4a;border-radius:8px;padding:8px 10px;font:13px/1.55 "Segoe UI";color:#f0dce6}'+
    '.r8-names{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px;margin:8px 0}.r8-name{display:flex;flex-direction:column;gap:2px;background:#101a28;border:1px solid #243246;border-radius:8px;padding:8px 10px;cursor:pointer;font:12.5px/1.45 "Segoe UI";color:#b8c6d8}'+
    '.r8-name input{display:none}.r8-name b{color:#ffe9a8;font:600 15px Georgia,serif}.r8-name i{color:#c8d4e4}.r8-name.on{background:#16301f;border-color:#8fe8a0}.r8-risk{font:600 11px "Segoe UI"}.r8-risk.high{color:#ff8a8a}.r8-risk.check{color:#ffe08a}'+
    '.r8-q{margin:6px 0 10px;padding:10px 14px;border-left:4px solid #8fc8ff;background:#0f1824;font:13.5px/1.55 Georgia,serif;color:#e8eef6}'+
    '.r8-wire{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0}.r8-pair{display:inline-flex;align-items:center;gap:4px;background:#101a28;border:1px solid #243246;border-radius:8px;padding:2px 8px;font:12px "Segoe UI";color:#9fb0c6}.r8-pair.new{border-color:#5a4a2a}.r8-pair.new b{color:#ffd76a;font-weight:600}'+
    '.r8-g{font-size:17px;line-height:1.3;margin:0 2px}.r8-ic{display:inline-block;vertical-align:middle}.r8-sheet{background:#0b121c;border:1px solid #243246;border-radius:10px;padding:10px;margin:0 0 10px}.r8-sheet h5{margin:0 0 6px;color:#ffe9a8;font:600 14px Georgia,serif}.r8-sheet small{color:#7f90a8;font:11px "Segoe UI"}'+
    '.r8-newl{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:4px 12px;font:12px/1.45 "Segoe UI";color:#9fb0c6}.r8-newl b{color:#e8eef6}@media (max-width:760px){.r8-cols{grid-template-columns:1fr}}';
  document.head.appendChild(st);
})();
