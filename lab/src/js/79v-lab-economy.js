// ═══════════════════════════════════════════════════════════════════════
// ║ 79v-lab-economy.js — round 119: THE ECONOMY (LECO, 79v-0). Every way to earn gold measured from the live game, set against the hero's
// ║ climb and what there is to buy; comparable games, theory, the critique, and proposals for Kris.
// ║ Picks: 'eco-<id>' ✓ yes / ◐ part of it / ✕ no, with a note; 'eco-notes' a note on the whole review.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LECO==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var M=LECO.M, R4=[1,2,3,4], RN=['','Grasslands','Wetlands','Highlands','Ashlands'], RC=['','#7fc96a','#5fb8d8','#c9a46a','#e0704a'];
  var f=function(n){ return Math.round(n).toLocaleString('en-US'); }, sum=function(o){ var t=0; for(var k in o)t+=o[k]; return t; };
  var OPT=[['pick','✓ Yes'],['mix','◐ Part of it'],['cut','✕ No']];
  var seg=function(k){ var v=V(k); return '<span class="eco-seg" data-k="'+k+'">'+OPT.map(function(o){ return '<button class="vbtn eco-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n eco-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+esc(ph)+'">'; };
  var cite=function(L){ return (L||[]).map(function(i){ var S=LECO.SRC[i]; return S?'<a class="eco-cite" href="'+S[1]+'" target="_blank" rel="noopener" title="'+esc(S[0])+'">['+(i+1)+']</a>':''; }).join(''); };
  // where each source's live numbers come from (LECO.M.sources, per realm)
  var SK={world:['World monsters (one sweep)'],camps:['Camp chests and nests (33 camps)'],caches:['Hidden caches'],inside:['Monsters inside sites'],boss:['Boss towers (clear prize)','Boss dungeons (clear prize)'],
    vault:['Treasure vaults (clear prize)'],mage:['Mage towers (clear prize)'],castle:['Castles (clear prize)'],island:['Island guardians'],quests:["Villagers' requests"],oswin:["Oswin's purse"],end:['Surtharn (the end)']};
  var srcQ=function(id,q){ var L=SK[id]; if(!L)return null; var t=0; L.forEach(function(k){ t+=M.sources[q][k]||0; }); return t; };
  // ── the model behind "Try it" ──
  var EST=function(o){ return R4.map(function(q){ var S=M.sources[q], w=S['World monsters (one sweep)']*(o.cut/0.33), ins=S['Monsters inside sites'], st=M.sites.filter(function(s){ return s.q===q; });
      var prize=o.prize>0?st.reduce(function(a,s){ return a+s.monG*o.prize; },0):(S['Boss towers (clear prize)']+S['Boss dungeons (clear prize)']+S['Treasure vaults (clear prize)']+S['Mage towers (clear prize)']+S['Castles (clear prize)']);
      var chest=o.chest?ins*0.15:0, alpha=S['World monsters (one sweep)']*(o.cut/0.33)*0.08*(o.alpha-1), rest=sum(S)-S['World monsters (one sweep)']-ins-(S['Boss towers (clear prize)']+S['Boss dungeons (clear prize)']+S['Treasure vaults (clear prize)']+S['Mage towers (clear prize)']+S['Castles (clear prize)']);
      var tot=w+ins+prize+chest+alpha+rest, gpm=M.siteGpm[q-1]*(1+(o.chest?0.15:0)+(o.prize>0?o.prize:0)), kit=o.price?[0,600,2400,4500,7500][q]:M.pace[q].cost;
      return {q:q,tot:tot,gpm:gpm,kit:kit,min:kit/gpm}; }); };
  // ── sections ──
  var head=function(){ var h=LBR.sec('What the numbers say','the critique, measured from the live game · round 119');
    h+='<div class="eco-heads">'+LECO.HEAD.map(function(H,i){ return '<div class="eco-hd"><b>'+(i+1)+'. '+esc(H[0])+'</b><p>'+esc(H[1])+'</p></div>'; }).join('')+'</div>'; return h; };
  var flow=function(){ var h=LBR.sec('Gold in, gold out — one full clear of each realm','every faucet once (sites once, every monster once) against every sink once (every shop item, recipe and staff, and a gem-set kit)');
    var mx=0; R4.forEach(function(q){ mx=Math.max(mx,sum(M.sources[q]),sum(M.sinks[q])); });
    var bar=function(o,cls){ var t=sum(o), ks=Object.keys(o).filter(function(k){ return o[k]>0; }).sort(function(a,b){ return o[b]-o[a]; });
      return '<div class="eco-bar '+cls+'" style="width:'+(t/mx*100).toFixed(1)+'%">'+ks.map(function(k,i){ return '<i style="flex:'+o[k]+';opacity:'+(1-i*0.07).toFixed(2)+'" title="'+esc(k)+': '+f(o[k])+' g"></i>'; }).join('')+'</div><span class="eco-bt">'+f(t)+' g</span>'; };
    h+='<div class="eco-flow">'+R4.map(function(q){ var S=M.sources[q], top=Object.keys(S).sort(function(a,b){ return S[b]-S[a]; }).slice(0,3);
      return '<div class="eco-fr"><div class="eco-rn" style="color:'+RC[q]+'">'+RN[q]+'</div><div class="eco-fb"><div class="eco-row">'+bar(S,'in')+'</div><div class="eco-row">'+bar(M.sinks[q],'out')+'</div>'+
        '<small>In: '+top.map(function(k){ return esc(k)+' '+Math.round(S[k]/sum(S)*100)+' %'; }).join(' · ')+'</small></div></div>'; }).join('')+'</div>';
    h+='<p class="eco-key"><i class="in"></i> gold in &nbsp; <i class="out"></i> gold out · hover a band for its source. In all: <b>'+f(R4.reduce(function(a,q){ return a+sum(M.sources[q]); },0))+' g</b> in, <b>'+f(R4.reduce(function(a,q){ return a+sum(M.sinks[q]); },0))+' g</b> out; '+M.nBuy+' of the '+M.nItems+' items are for sale ('+f(M.buyAll)+' g to buy each once).</p>';
    return h; };
  var ramp=function(){ var h=LBR.sec('The climb: the hero against the price of the next step','at each realm\'s level cap, with that realm\'s shop sword');
    h+='<table class="tl eco-t"><thead><tr><th>Realm</th><th>Level cap</th><th>Hero hit</th><th>Monster health</th><th>Swings a kill</th><th>Gold a kill (world · inside)</th><th>Gold a minute (world · sites)</th><th>The realm\'s kit</th><th>Minutes of site gold</th><th>XP to the cap · a world kill</th></tr></thead><tbody>'+
      M.ramp.map(function(r,i){ var q=r.q, kit=M.pace[q].cost, mn=kit/M.siteGpm[i];
        return '<tr><td style="color:'+RC[q]+'"><b>'+RN[q]+'</b></td><td>'+r.cap+'</td><td>'+r.hit+'</td><td>'+r.monHp+'</td><td>'+r.hits+'</td><td>'+r.killG+' · '+r.dunG+'</td><td>'+M.worldGpm[i]+' · '+M.siteGpm[i]+'</td><td>'+f(kit)+' g</td><td class="'+(mn>9?'eco-hi':'eco-lo')+'">'+mn.toFixed(1)+'</td><td>'+f(r.xpToCap)+' · '+r.worldXp+'</td></tr>'; }).join('')+'</tbody></table>';
    h+='<p class="eco-as">'+esc(LECO.ASSUME)+' "The realm\'s kit" is the strongest shop weapon, armour, shield, helm, boots, legs and gauntlets of that realm.</p>';
    h+='<div class="eco-spark">'+['Monster health','Gold a kill','Kit price'].map(function(lb,j){ var vals=M.ramp.map(function(r){ return j===0?r.monHp:j===1?r.killG:M.pace[r.q].cost; }), b=vals[0];
      return '<div><b>'+lb+'</b>'+vals.map(function(v,i){ return '<span style="height:'+Math.max(4,Math.min(100,v/vals[3]*100))+'%;background:'+RC[i+1]+'" title="'+RN[i+1]+': '+f(v)+'"><em>×'+(v/b).toFixed(1)+'</em></span>'; }).join('')+'</div>'; }).join('')+'</div>';
    return h; };
  var sources=function(){ var h=LBR.sec('Every way to earn gold','one full clear per realm, measured · difficulty 1 (easy) to 5 (the hardest fights)');
    h+='<table class="tl eco-t"><thead><tr><th>Source</th><th>How it pays</th><th>Once?</th><th>Difficulty</th>'+R4.map(function(q){ return '<th style="color:'+RC[q]+'">'+RN[q]+'</th>'; }).join('')+'<th>Note</th></tr></thead><tbody>'+
      LECO.SOURCES.map(function(S){ return '<tr><td><b>'+esc(S.n)+'</b></td><td>'+esc(S.how)+'</td><td>'+(S.once?'once':'again and again')+'</td><td><span class="eco-d d'+S.diff+'">'+'●'.repeat(S.diff)+'</span></td>'+
        R4.map(function(q){ var v=srcQ(S.id,q); return '<td class="eco-n2">'+(v==null?'—':v?f(v):'0')+'</td>'; }).join('')+'<td><small>'+esc(S.note)+'</small></td></tr>'; }).join('')+'</tbody></table>';
    return h; };
  var sites=function(){ var h=LBR.sec('Every site, run by run','monsters inside × their gold, against the prize for finishing it');
    h+='<details class="eco-det"><summary>Show all '+M.sites.length+' sites</summary><table class="tl eco-t"><thead><tr><th>Site</th><th>Kind</th><th>Floors</th><th>Monsters</th><th>Their gold</th><th>Prize (first · again)</th><th>Prize share</th><th>Minutes</th><th>Gold a minute</th></tr></thead><tbody>'+
      M.sites.slice().sort(function(a,b){ return a.q-b.q||b.monG-a.monG; }).map(function(s){ var sh=s.first/(s.first+s.monG)*100;
        return '<tr><td style="color:'+RC[s.q]+'">'+esc(s.name)+'</td><td>'+esc(s.kind)+'</td><td>'+s.floors+'</td><td>'+s.mons+'</td><td>'+f(s.monG)+'</td><td'+(s.again>s.first?' class="eco-hi" title="the rematch pays more"':'')+'>'+f(s.first)+' · '+f(s.again)+'</td><td class="'+(sh<10?'eco-hi':'')+'">'+sh.toFixed(0)+' %</td><td>'+s.mins+'</td><td>'+f(s.gpm)+'</td></tr>'; }).join('')+'</tbody></table></details>';
    return h; };
  var find=function(){ var h=LBR.sec('How items are found','where each of the '+M.nItems+' items comes from');
    return h+'<table class="tl eco-t"><tbody>'+LECO.FIND.map(function(F){ return '<tr><td><b>'+esc(F[0])+'</b></td><td>'+esc(F[1])+'</td></tr>'; }).join('')+'</tbody></table>'; };
  var comps=function(){ var h=LBR.sec('Games like ours, and what they teach','numbers in brackets are the sources at the bottom of the page');
    return h+'<div class="eco-cards">'+LECO.COMPS.map(function(C){ return '<div class="eco-card"><h4>'+esc(C.g)+cite(C.src)+'</h4><p>'+esc(C.t)+'</p><p class="eco-l">→ '+esc(C.l)+'</p></div>'; }).join('')+'</div>'; };
  var theory=function(){ var h=LBR.sec('How an economy like this is best set up','eight ideas the proposals are built on');
    return h+'<div class="eco-cards">'+LECO.THEORY.map(function(T,i){ return '<div class="eco-card th"><h4>'+(i+1)+'. '+esc(T[0])+cite(T[2])+'</h4><p>'+esc(T[1])+'</p></div>'; }).join('')+'</div>'; };
  var mock=function(id){
    if(id==='xpmoments')return '<div class="eco-mock"><div class="eco-xpb"><i style="flex:46;background:#5a8fe8"></i><i style="flex:8;background:#ffd84a" title="Daring"></i><i style="flex:6;background:#b58cff" title="First of its kind"></i><i style="flex:5;background:#8fe8a0" title="Flawless"></i><i style="flex:18;background:#2a4a7a;outline:1px dashed #7fb4ff" title="Rested"></i><i style="flex:17;background:#111"></i></div><div class="eco-xpl"><span style="color:#ffd84a">DARING ×2</span><span style="color:#b58cff">FIRST OF ITS KIND +50 %</span><span style="color:#8fe8a0">FLAWLESS +25 %</span><span style="color:#7fb4ff">RESTED: double XP</span></div></div>';
    if(id==='ledger')return '<div class="eco-mock eco-led"><b>Dawn Sanctum — cleared</b><div>Monsters <em>9,129 g</em></div><div>Chests <em>1,370 g</em></div><div>The prize <em>2,280 g</em></div><div class="tot">Total <em>12,779 g</em></div><div class="its"><span class="r-c">Healing draught</span><span class="r-r">Fire opal</span><span class="r-e">Night Edge</span></div></div>';
    if(id==='rarity')return '<div class="eco-mock eco-rar">'+[['Common','#e8e8e8'],['Fine','#6fe07a'],['Rare','#5fa8ff'],['Epic','#b06aff'],['Legendary','#ffcc33']].map(function(r,i){ return '<span style="--c:'+r[1]+'"><i class="'+(i>=3?'beam':'')+'"></i>'+r[0]+'</span>'; }).join('')+'</div>';
    return ''; };
  var props=function(){ var h=LBR.sec('Proposals','✓ yes · ◐ part of it · ✕ no — and a note on any of them'), G={};
    LECO.PROPS.forEach(function(p){ (G[p.grp]=G[p.grp]||[]).push(p); });
    h+='<div class="na-pick">'+LECO.PROPS.map(function(p){ var v=V('eco-'+p.id); return '<a href="#eco-'+p.id+'" class="na-chip na-'+(v||'x')+'">'+esc(p.t)+'</a>'; }).join('')+'</div>';
    var KND={range:'🎲 rolls in a range',constant:'📌 fixed',show:'✨ how it is shown'};
    Object.keys(G).forEach(function(g){ h+='<h3 class="eco-grp">'+esc(g)+'</h3>'+G[g].map(function(p){ var k='eco-'+p.id, v=V(k);
      return '<div class="na-arc eco-p na-'+(v||'x')+'" id="eco-'+p.id+'"><div class="na-hd"><h3>'+esc(p.t)+'</h3><span class="na-tone">'+KND[p.kind]+'</span>'+seg(k)+'</div>'+
        '<p><b>What:</b> '+esc(p.what)+'</p><p class="na-why"><b>Why:</b> '+esc(p.why)+'</p><p class="eco-num"><b>Numbers:</b> '+esc(p.nums)+'</p>'+mock(p.id)+'<div class="na-fb">'+note(k,'Your note on '+p.t+'…')+'</div></div>'; }).join(''); });
    return h; };
  var rule=function(){ var h=LBR.sec('Fixed or rolled? The rule, case by case','');
    return h+'<table class="tl eco-t"><thead><tr><th>Reward</th><th>Fixed or rolled</th><th>Why</th></tr></thead><tbody>'+LECO.RULE.map(function(R){ return '<tr><td>'+esc(R[0])+'</td><td><b>'+esc(R[1])+'</b></td><td>'+esc(R[2])+'</td></tr>'; }).join('')+'</tbody></table>'; };
  var tryit=function(){ var h=LBR.sec('Try it','move the sliders: gold from one full clear of each realm, and how many minutes of site play the realm\'s kit costs');
    h+='<div class="eco-try"><label>World cut <input type="range" id="ecs-cut" min="0.33" max="1" step="0.01" value="0.33"> <b id="eco-cutv">0.33</b></label>'+
      '<label>Prize = share of the run <input type="range" id="ecs-prize" min="0" max="0.4" step="0.05" value="0"> <b id="eco-prizev">today</b></label>'+
      '<label>Alpha gold × <input type="range" id="ecs-alpha" min="1" max="3" step="0.5" value="1"> <b id="eco-alphav">1</b></label>'+
      '<label><input type="checkbox" id="ecs-chest"> Treasure on every floor</label><label><input type="checkbox" id="ecs-price"> Price by the minute</label><div id="eco-out"></div></div>'; return h; };
  var paint=function(){ var o={cut:+document.getElementById('ecs-cut').value,prize:+document.getElementById('ecs-prize').value,alpha:+document.getElementById('ecs-alpha').value,chest:document.getElementById('ecs-chest').checked,price:document.getElementById('ecs-price').checked};
    document.getElementById('eco-cutv').textContent=o.cut.toFixed(2); document.getElementById('eco-prizev').textContent=o.prize?Math.round(o.prize*100)+' %':'today'; document.getElementById('eco-alphav').textContent=o.alpha;
    var base=EST({cut:0.33,prize:0,alpha:1,chest:false,price:false}), E=EST(o);
    document.getElementById('eco-out').innerHTML='<table class="tl eco-t"><thead><tr><th>Realm</th><th>Gold, one full clear</th><th>Site gold a minute</th><th>The kit</th><th>Minutes for the kit</th></tr></thead><tbody>'+E.map(function(e,i){ var b=base[i];
      return '<tr><td style="color:'+RC[e.q]+'">'+RN[e.q]+'</td><td>'+f(e.tot)+' g <small>('+(e.tot>=b.tot?'+':'')+Math.round((e.tot/b.tot-1)*100)+' %)</small></td><td>'+f(e.gpm)+'</td><td>'+f(e.kit)+' g</td><td class="'+(e.min<9?'eco-lo':e.min>16?'eco-hi':'eco-ok')+'">'+e.min.toFixed(1)+'</td></tr>'; }).join('')+'</tbody></table><small>Green under 9 minutes (too cheap), amber 9–16 (the target), red over 16 (a grind).</small>'; };
  var srcs=function(){ return LBR.sec('Sources','')+'<ol class="eco-src">'+LECO.SRC.map(function(S){ return '<li><a href="'+S[1]+'" target="_blank" rel="noopener">'+esc(S[0])+'</a></li>'; }).join('')+'</ol>'; };
  LAB_TABS.push({ id:'economy', name:'Economy',
    blurb:'<b>Round 120 — your picks: ✓ every proposal except ✕ Treasure maps. They are put in and measured in the new tab, Economy — round 2.</b> <b>Round 119 — the economy review.</b> Every way to earn gold, measured from the game itself, set against how fast the hero grows and what there is to buy; how items are found; games like ours; the theory; what is out of balance; and <b>'+LECO.PROPS.length+' proposals</b> for you to ✓, ◐ or ✕ (with a note). "Try it" lets you move the main dials and see the result.',
    designs:[{id:'economy',name:'Economy'}],
    render:function(){ setTimeout(function(){ if(document.getElementById('ecs-cut'))paint(); },0);
      return head()+flow()+ramp()+sources()+sites()+find()+comps()+theory()+props()+rule()+tryit()+'<div class="na-fb">'+note('eco-notes','Anything else about the economy…')+'</div>'+srcs(); } });
  document.addEventListener('click',function(e){ var sg=e.target.closest&&e.target.closest('.eco-seg .eco-sg'); if(!sg)return; var s=sg.parentNode, k=s.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; p.tab='economy'; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn eco-sg'+(x.dataset.v===nv?' on '+nv:''); }); var c=s.closest('.na-arc'); if(c)c.className=c.className.replace(/\bna-(pick|mix|cut|x)\b/,'na-'+(nv||'x')); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.eco-n'); if(t){ var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; p.tab='economy'; LabApp.persist(t.dataset.k); return; }
    if(e.target.closest&&e.target.closest('.eco-try'))paint(); });
  document.addEventListener('input',function(e){ if(e.target.closest&&e.target.closest('.eco-try'))paint(); });
  var st=document.createElement('style'); st.textContent=
    '.eco-heads{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px;margin:8px 0 18px}.eco-hd{background:#151a24;border:1px solid #2a3446;border-left:3px solid #ffd84a;border-radius:8px;padding:9px 12px}.eco-hd b{color:#ffe9a8}.eco-hd p{margin:5px 0 0;font-size:13px;color:#c8d0dc;line-height:1.45}'+
    '.eco-flow{display:flex;flex-direction:column;gap:12px;margin:8px 0}.eco-fr{display:flex;gap:12px;align-items:flex-start}.eco-rn{width:92px;font-weight:700;padding-top:2px}.eco-fb{flex:1;min-width:0}.eco-row{display:flex;align-items:center;gap:8px;margin:2px 0}.eco-bar{display:flex;height:16px;border-radius:4px;overflow:hidden;min-width:4px}.eco-bar i{display:block;height:100%;border-right:1px solid rgba(0,0,0,.35)}.eco-bar.in i{background:#e0b840}.eco-bar.out i{background:#6aa0e8}.eco-bt{font-size:12px;color:#c8d0dc;white-space:nowrap}.eco-fb small{color:#8a96a8;font-size:11.5px}'+
    '.eco-key i{display:inline-block;width:12px;height:10px;border-radius:2px;vertical-align:middle}.eco-key i.in{background:#e0b840}.eco-key i.out{background:#6aa0e8}.eco-key{font-size:13px;color:#c8d0dc}'+
    '.eco-t td,.eco-t th{font-size:12.5px;vertical-align:top}.eco-hi{color:#ff9a8a;font-weight:700}.eco-lo{color:#8fe8a0;font-weight:700}.eco-ok{color:#ffd84a;font-weight:700}.eco-n2{text-align:right;white-space:nowrap}.eco-as{font-size:12px;color:#8a96a8}.eco-d{letter-spacing:1px;font-size:11px}.eco-d.d1{color:#8fe8a0}.eco-d.d2{color:#c8e870}.eco-d.d3{color:#ffd84a}.eco-d.d4{color:#ffa060}.eco-d.d5{color:#ff6a5a}'+
    '.eco-spark{display:flex;gap:26px;margin:10px 0 18px}.eco-spark>div{display:flex;align-items:flex-end;gap:6px;height:110px;position:relative;padding-top:18px}.eco-spark>div>b{position:absolute;top:0;left:0;font-size:12px;color:#c8d0dc;white-space:nowrap}.eco-spark span{width:34px;border-radius:3px 3px 0 0;position:relative}.eco-spark em{position:absolute;top:-15px;left:0;right:0;text-align:center;font-size:10.5px;color:#dfe6ef;font-style:normal}'+
    '.eco-det summary{cursor:pointer;color:#9fd0ff;margin:6px 0}.eco-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;margin:8px 0 18px}.eco-card{background:#141922;border:1px solid #2a3446;border-radius:8px;padding:10px 12px}.eco-card h4{margin:0 0 6px;color:#e8d8b0}.eco-card p{margin:4px 0;font-size:13px;line-height:1.45;color:#c8d0dc}.eco-card .eco-l{color:#9fe8b0}.eco-card.th{border-left:3px solid #6fe3f5}.eco-cite{font-size:11px;margin-left:4px;color:#9fd0ff;text-decoration:none}'+
    '.eco-grp{margin:16px 0 6px;color:#ffe9a8;border-bottom:1px solid #2a3446;padding-bottom:3px}.eco-num{font-size:13px;color:#ffe9a8}.eco-sg{padding:3px 9px;font-size:12px;opacity:.75}.eco-sg.on{opacity:1}.eco-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.eco-sg.on.mix{background:#5a4510;border-color:#ffd84a;color:#fff}.eco-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}'+
    '.eco-mock{margin:6px 0 8px;padding:10px;background:#0b0f16;border:1px solid #2a3446;border-radius:8px;max-width:520px}.eco-xpb{display:flex;height:12px;border-radius:6px;overflow:hidden;border:1px solid #3a4456}.eco-xpb i{display:block}.eco-xpl{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;font-size:11px;font-weight:700;letter-spacing:.5px}'+
    '.eco-led{font-size:13px;color:#dfe6ef}.eco-led>b{display:block;color:#ffe9a8;margin-bottom:4px}.eco-led div{display:flex;justify-content:space-between;border-bottom:1px dotted #2a3446;padding:2px 0}.eco-led em{font-style:normal;color:#ffd84a}.eco-led .tot{font-weight:700;border:0}.eco-led .its{gap:6px;justify-content:flex-start;border:0;margin-top:6px}.eco-led .its span{padding:2px 8px;border-radius:4px;border:1px solid;font-size:12px}.r-c{color:#e8e8e8}.r-r{color:#5fa8ff}.r-e{color:#b06aff}'+
    '.eco-rar{display:flex;gap:14px;align-items:flex-end;height:74px}.eco-rar span{position:relative;color:var(--c);font-size:12px;font-weight:700;padding-top:30px;text-align:center}.eco-rar span i{position:absolute;left:50%;bottom:18px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:var(--c);box-shadow:0 0 10px var(--c)}.eco-rar span i.beam{height:52px;width:8px;margin-left:-4px;border-radius:4px;background:linear-gradient(to top,var(--c),transparent)}'+
    '.eco-try{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center;background:#121722;border:1px solid #2a3446;border-radius:8px;padding:12px}.eco-try label{font-size:13px;color:#dfe6ef}.eco-try input[type=range]{vertical-align:middle;width:140px}#eco-out{flex-basis:100%}.eco-src{font-size:12.5px;line-height:1.6}.eco-src a{color:#9fd0ff}'+
    '@media (max-width:700px){.eco-fr{flex-direction:column}.eco-spark{flex-wrap:wrap}}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('economy');
  if(typeof LTODO!=='undefined')LTODO.add({id:'economy',label:'💰 The economy review: ✓, ◐ or ✕ each proposal',where:'Economy tab',
    done:function(){ return LECO.PROPS.every(function(p){ return !!V('eco-'+p.id); }); },go:function(){ LTODO.goTo('economy','.na-pick',0); }});
})();
