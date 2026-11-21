// ═══════════════════════════════════════════════════════════════════════
// ║ 79v2-lab-economy2.js — round 120: THE ECONOMY, SECOND PASS (LECO2, 79v2-0). Kris's round-119 picks put in; the game compared phase by
// ║ phase for a story player and an explorer; what is still out of balance; how items are found and bought; the unique mechanics we keep.
// ║ Picks: 'eco2-<id>' ✓ / ◐ / ✕ with a note (N1–N9, I1–I9); 'eco2-notes'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LECO2==='undefined'||!LECO2.M)return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var M=LECO2.M, RN=['','Grasslands','Wetlands','Highlands','Ashlands'], RC=['','#7fc96a','#5fb8d8','#c9a46a','#e0704a'], f=function(n){ return Math.round(n).toLocaleString('en-US'); };
  var ST={scen:'after',style:'story'};
  var OPT=[['pick','✓ Yes'],['mix','◐ Part of it'],['cut','✕ No']];
  var seg=function(k){ var v=V(k); return '<span class="eco-seg e2-seg" data-k="'+k+'">'+OPT.map(function(o){ return '<button class="vbtn eco-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n e2-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+esc(ph)+'">'; };
  var KND={range:'🎲 rolls in a range',constant:'📌 fixed',show:'✨ how it is shown'};
  var card=function(p,pre){ var k='eco2-'+p.id, v=V(k);
    return '<div class="na-arc eco-p na-'+(v||'x')+'" id="e2-'+p.id+'"><div class="na-hd"><h3>'+esc(p.t)+'</h3><span class="na-tone">'+KND[p.kind]+'</span>'+seg(k)+'</div><p><b>What:</b> '+esc(p.what)+'</p><p class="na-why"><b>Why:</b> '+esc(p.why)+'</p><p class="eco-num"><b>Numbers:</b> '+esc(p.nums)+'</p>'+(pre||'')+'<div class="na-fb">'+note(k,'Your note on '+p.t+'…')+'</div></div>'; };
  var alphaMock='<div class="eco-mock e2-alpha"><span class="a0"><i></i>Hill Gnoll Lv.3</span><span class="a1"><b>♛</b><i></i><em>Alpha Hill Gnoll Lv.3</em></span><small>left: today (only the name and a little bigger) · right: N9 (gold ring, crown pip, gold-framed bar)</small></div>';
  // ── the phase table ──
  var phase=function(){ var L=M.phases[ST.scen+'_'+ST.style], base=M.phases['before_'+ST.style], h='';
    h+='<div class="e2-tog">'+LECO2.SCEN.map(function(s){ return '<button class="vbtn e2-sc'+(ST.scen===s[0]?' on pick':'')+'" data-s="'+s[0]+'" title="'+esc(s[2])+'">'+esc(s[1])+'</button>'; }).join('')+'<span class="e2-gap"></span>'+
      LECO2.STYLES.map(function(s){ return '<button class="vbtn e2-st'+(ST.style===s[0]?' on mix':'')+'" data-s="'+s[0]+'">'+esc(s[1])+'</button>'; }).join('')+'</div>';
    h+='<p class="eco-as">'+esc((LECO2.STYLES.filter(function(s){ return s[0]===ST.style; })[0]||[])[2])+' '+esc((LECO2.SCEN.filter(function(s){ return s[0]===ST.scen; })[0]||[])[2])+'</p>';
    var row=function(lb,fn,cls){ return '<tr><td><b>'+lb+'</b></td>'+L.map(function(p,i){ var r=fn(p,base[i]); return '<td class="'+(cls?cls(p):'')+'">'+r+'</td>'; }).join('')+'</tr>'; };
    var dif=function(a,b){ var d=Math.round((a/b-1)*100); return ST.scen==='before'?'':' <small>('+(d>=0?'+':'')+d+' %)</small>'; };
    h+='<table class="tl eco-t e2-pt"><thead><tr><th></th>'+L.map(function(p){ return '<th style="color:'+RC[p.q]+'">'+RN[p.q]+'</th>'; }).join('')+'</tr></thead><tbody>'+
      row('Minutes',function(p){ return p.mins; })+
      row('Gold in',function(p,b){ return f(p.income)+' g'+dif(p.income,b.income); })+
      row('Gold out',function(p,b){ return f(p.sinks)+' g'+dif(p.sinks,b.sinks); })+
      row('Left over',function(p){ var n=p.income-p.sinks; return (n>=0?'+':'')+f(n)+' g'; },function(p){ var n=(p.income-p.sinks)/Math.max(1,p.sinks); return n>1?'eco-hi':n<-0.15?'eco-ok':'eco-lo'; })+
      row('Gold a minute',function(p){ return f(p.gpm); })+
      row('The kit, in minutes',function(p){ return p.kitMin; },function(p){ return p.kitMin<9?'eco-ok':p.kitMin>16?'eco-hi':'eco-lo'; })+
      row('Level cap reached at',function(p){ return Math.min(100,Math.round(p.need/p.xp*100))+' % of the realm'; },function(p){ if(ST.style!=='story')return ''; var r=p.need/p.xp; return r<0.5?'eco-hi':'eco-lo'; })+
      row('Valour chests',function(p){ return p.valour; },function(p){ return p.valour>15?'eco-hi':''; })+
      row('Gems found'+(ST.style==='explorer'?' (needed)':''),function(p){ return Math.round(p.gems)+(ST.style==='explorer'?' ('+M.gemNeed[p.q]+')':''); },function(p){ if(ST.style!=='explorer')return ''; var r=p.gems/M.gemNeed[p.q]; return r<1?'eco-ok':r>3?'eco-hi':'eco-lo'; })+
      row('Reward moments an hour',function(p){ return p.mph; })+
      '</tbody></table>';
    h+='<p class="eco-as">Green: in balance · amber: short (or too cheap) · red: flooding or a grind. The Forges of Muspelheim, the volcano and Asgard come after the Ashlands (an estimate: about '+f(M.endgame.monG)+' g from their monsters in about '+M.endgame.mins+' minutes, plus Surtharn\'s 2,500 g).</p>';
    // gold in, by source (stacked) and the purse across the game
    var mx=0; L.forEach(function(p){ mx=Math.max(mx,p.income,p.sinks); });
    h+='<div class="eco-flow">'+L.map(function(p){ var ks=Object.keys(p.inB).sort(function(a,b){ return p.inB[b]-p.inB[a]; }), ko=Object.keys(p.outB).sort(function(a,b){ return p.outB[b]-p.outB[a]; });
      var bar=function(o,keys,cls){ var t=0; keys.forEach(function(k){ t+=o[k]; }); return '<div class="eco-bar '+cls+'" style="width:'+(t/mx*100).toFixed(1)+'%">'+keys.map(function(k,i){ return '<i style="flex:'+o[k]+';opacity:'+(1-i*0.07).toFixed(2)+'" title="'+esc(k)+': '+f(o[k])+' g"></i>'; }).join('')+'</div><span class="eco-bt">'+f(t)+' g</span>'; };
      return '<div class="eco-fr"><div class="eco-rn" style="color:'+RC[p.q]+'">'+RN[p.q]+'</div><div class="eco-fb"><div class="eco-row">'+bar(p.inB,ks,'in')+'</div><div class="eco-row">'+bar(p.outB,ko,'out')+'</div><small>In: '+ks.slice(0,3).map(function(k){ return esc(k)+' '+Math.round(p.inB[k]/p.income*100)+' %'; }).join(' · ')+'</small></div></div>'; }).join('')+'</div>';
    // the purse after each realm (all three scenarios)
    var W=640,H=170, sc=['before','after','v2'], cols={before:'#8a96a8',after:'#e0b840',v2:'#8fe8a0'}, pts={}, lo=0, hi=0;
    sc.forEach(function(s){ var c=0; pts[s]=[0].concat(M.phases[s+'_'+ST.style].map(function(p){ c+=p.income-p.sinks; return c; })); pts[s].forEach(function(v){ lo=Math.min(lo,v); hi=Math.max(hi,v); }); });
    var y=function(v){ return 10+(hi-v)/(hi-lo||1)*(H-30); }, x=function(i){ return 40+i*(W-130)/4; };
    h+='<div class="e2-purse"><b>The purse after each realm — '+esc(ST.style==='story'?'story player':'explorer')+'</b><svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+W+'px"><line x1="40" x2="'+(W-20)+'" y1="'+y(0)+'" y2="'+y(0)+'" stroke="#3a4456" stroke-dasharray="3 3"/>'+
      ['Start'].concat(RN.slice(1)).map(function(n,i){ return '<text x="'+x(i)+'" y="'+(H-4)+'" fill="#8a96a8" font-size="10" text-anchor="middle">'+n+'</text>'; }).join('')+
      sc.map(function(s){ return '<polyline fill="none" stroke="'+cols[s]+'" stroke-width="2.5" points="'+pts[s].map(function(v,i){ return x(i)+','+y(v).toFixed(1); }).join(' ')+'"/>'+pts[s].map(function(v,i){ return i?'<circle cx="'+x(i)+'" cy="'+y(v).toFixed(1)+'" r="3" fill="'+cols[s]+'"><title>'+f(v)+' g</title></circle>':''; }).join('')+'<text x="'+(x(4)+8)+'" y="'+(y(pts[s][4])+({before:-4,after:4,v2:12})[s]).toFixed(1)+'" fill="'+cols[s]+'" font-size="10">'+(s==='v2'?'picked + fixes':s==='after'?'as picked':'today')+'</text>'; }).join('')+'</svg></div>';
    return h; };
  var items=function(){ var I=LECO2.ITEMS, h=LBR.sec('Finding items, and buying them','every one of the game\'s items, by how a player gets it today');
    h+='<p class="eco-num">'+esc(I.summary)+'</p>'+'<div class="e2-cats">'+I.cats.map(function(C){ var t=C[1];
      return '<div class="e2-cat"><h4>'+esc(C[0])+' <small>'+t+'</small></h4>'+C[2].map(function(r){ return '<div class="e2-cr"><span class="e2-cb"><i style="width:'+(r[1]/t*100).toFixed(1)+'%"></i></span><b>'+r[1]+'</b> '+esc(r[0])+'</div>'; }).join('')+(C[3]?'<p>'+esc(C[3])+'</p>':'')+'</div>'; }).join('')+'</div>';
    h+='<h3 class="eco-grp">The island traders today</h3><table class="tl eco-t"><tbody>'+I.traders.map(function(t){ return '<tr><td><b>'+esc(t[0])+'</b></td><td>'+esc(t[1])+'</td></tr>'; }).join('')+'</tbody></table>';
    var G={}; LECO2.IPROPS.forEach(function(p){ (G[p.grp]=G[p.grp]||[]).push(p); });
    Object.keys(G).forEach(function(g){ h+='<h3 class="eco-grp">'+esc(g)+'</h3>'+G[g].map(function(p){ return card(p); }).join(''); });
    return h; };
  var unique=function(){ var h=LBR.sec('The unique mechanics we keep','key items with their own way of being won: none of them is sold, dropped at random or changed by this review');
    return h+'<table class="tl eco-t"><thead><tr><th>Key item</th><th>How it is won</th><th>Code</th></tr></thead><tbody>'+LECO2.UNIQUE.map(function(u){ return '<tr><td><b>'+esc(u[0])+'</b></td><td>'+esc(u[1])+'</td><td><small>'+esc(u[2])+'</small></td></tr>'; }).join('')+'</tbody></table>'; };
  LAB_TABS.push({ id:'economy2', name:'Economy — round 2',
    blurb:'<b>Round 121 — ✓ all of it, and it is built:</b> every proposal on this page and in Economy (round 119) except treasure maps is in the game (docs/76). The ✓ buttons work again (both tabs were catching the same click). <b>Round 120 — the economy with your picks in.</b> '+esc(LECO2.PICKED)+' The game compared realm by realm for a story player and an explorer; what is still out of balance; <b>9 new proposals</b> (N1–N9); finding and buying items, with <b>9 item proposals</b> (I1–I9, new items included); and the unique mechanics we keep.',
    designs:[{id:'economy2',name:'Economy — round 2'}],
    render:function(){ var h=LBR.sec('The game, phase by phase','switch the scenario and the player');
      h+='<div id="e2-phase">'+phase()+'</div>';
      h+=LBR.sec('What is still out of balance','with your picks in, before the fixes below')+'<div class="eco-heads">'+LECO2.FIND.map(function(F,i){ return '<div class="eco-hd"><b>'+(i+1)+'. '+esc(F[0])+'</b><p>'+esc(F[1])+'</p></div>'; }).join('')+'</div>';
      var all=LECO2.PROPS.concat(LECO2.IPROPS);
      h+=LBR.sec('New proposals','✓ yes · ◐ part of it · ✕ no — and a note on any of them')+'<div class="na-pick">'+all.map(function(p){ var v=V('eco2-'+p.id); return '<a href="#e2-'+p.id+'" class="na-chip na-'+(v||'x')+'">'+esc(p.t.split(' · ')[0])+'</a>'; }).join('')+'</div>';
      var G={}; LECO2.PROPS.forEach(function(p){ (G[p.grp]=G[p.grp]||[]).push(p); });
      Object.keys(G).forEach(function(g){ h+='<h3 class="eco-grp">'+esc(g)+'</h3>'+G[g].map(function(p){ return card(p,p.id==='alphaseen'?alphaMock:''); }).join(''); });
      h+=items()+unique()+'<div class="na-fb">'+note('eco2-notes','Anything else about the economy or the items…')+'</div>';
      return h; } });
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.e2-sc,.e2-st'); if(b){ if(b.classList.contains('e2-sc'))ST.scen=b.dataset.s; else ST.style=b.dataset.s; var el=document.getElementById('e2-phase'); if(el)el.innerHTML=phase(); return; }
    var sg=e.target.closest&&e.target.closest('.e2-seg .eco-sg'); if(!sg)return; var s=sg.parentNode, k=s.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; p.tab='economy2'; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn eco-sg'+(x.dataset.v===nv?' on '+nv:''); }); var c=s.closest('.na-arc'); if(c)c.className=c.className.replace(/\bna-(pick|mix|cut|x)\b/,'na-'+(nv||'x')); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.e2-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; p.tab='economy2'; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.e2-sc.on,.e2-st.on{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.e2-st.on{background:#5a4510;border-color:#ffd84a}.e2-tog{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.e2-gap{width:18px}.e2-pt td,.e2-pt th{text-align:right}.e2-pt td:first-child,.e2-pt th:first-child{text-align:left}'+
    '.e2-purse svg{display:block;margin-top:6px}.e2-purse{margin:10px 0 18px;background:#121722;border:1px solid #2a3446;border-radius:8px;padding:10px}.e2-purse b{font-size:13px;color:#dfe6ef}'+
    '.e2-cats{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:10px;margin:8px 0 14px}.e2-cat{background:#141922;border:1px solid #2a3446;border-radius:8px;padding:10px 12px}.e2-cat h4{margin:0 0 6px;color:#e8d8b0}.e2-cat h4 small{color:#8a96a8;font-weight:400}.e2-cat p{font-size:12.5px;color:#ffe9a8;margin:6px 0 0}'+
    '.e2-cr{font-size:12.5px;color:#c8d0dc;margin:3px 0;display:flex;align-items:center;gap:6px}.e2-cb{display:inline-block;width:70px;height:8px;background:#0b0f16;border-radius:4px;overflow:hidden;flex:none}.e2-cb i{display:block;height:100%;background:#6aa0e8}'+
    '.e2-alpha{display:flex;gap:40px;align-items:flex-end;flex-wrap:wrap;padding:16px}.e2-alpha span{position:relative;display:inline-flex;flex-direction:column;align-items:center;font-size:11px;color:#dfe6ef}.e2-alpha span i{display:block;width:36px;height:36px;border-radius:50%;background:#6a8a4a;margin-top:4px}.e2-alpha .a1 i{width:44px;height:44px;box-shadow:0 0 0 3px #ffcc33,0 0 18px #ffcc33}.e2-alpha .a1 em{order:-1;font-style:normal;color:#ffcc33;font-weight:700;border:1px solid #ffcc33;padding:0 5px;border-radius:3px}.e2-alpha .a1 b{order:-2;color:#ffcc33}.e2-alpha small{flex-basis:100%;color:#8a96a8}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('economy2');
  if(typeof LTODO!=='undefined')LTODO.add({id:'economy2',label:'💰 Economy, round 2: ✓, ◐ or ✕ the new proposals (N1–N9) and the item proposals (I1–I9)',where:'Economy — round 2 tab',
    done:function(){ return LECO2.PROPS.concat(LECO2.IPROPS).every(function(p){ return !!V('eco2-'+p.id); }); },go:function(){ LTODO.goTo('economy2','.na-pick',0); }});
})();
