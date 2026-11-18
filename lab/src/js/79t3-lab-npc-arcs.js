// ═══════════════════════════════════════════════════════════════════════
// ║ 79t3-lab-npc-arcs.js — round 114: THE VILLAGERS' SAGA. The backstories first (LVSTORY, built by tools/voices/build_voices.py from
// ║ src/villagers/*.md), then five overarching arcs to choose from (LNARC, 79t3-0), three with the seasons option. Kris: "Start with
// ║ developing more robust back stories for the current characters, and then propose 4 different overarching saga arcs … for me to review
// ║ and give feedback on before creating the entire larger story arc for the NPCs".
// ║ Picks: 'npcarc-<arc>' ✓ this one / ◐ mix in / ✕ no; 'npcarc-<arc>_c<n>' a chapter note; 'npcarc-seasons' the seasons option;
// ║ 'npcarc-story_<villager>' ✓ / ✎ change, with a note.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LNARC==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var S=typeof LVSTORY!=='undefined'?LVSTORY:{}, P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var nm=function(k){ return S[k]?S[k].who.replace(/^your twin$/,'Your twin'):k; };
  var seg=function(k,lab){ var v=V(k); return '<span class="na-seg" data-k="'+k+'">'+lab.map(function(o){ return '<button class="vbtn na-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n na-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+esc(ph||'Feedback…')+'">'; };
  var ARC=[['pick','✓ This one'],['mix','◐ Mix in'],['cut','✕ No']], SEA=[['pick','✓ Use seasons'],['mix','◐ Maybe later'],['cut','✕ No seasons']], STO=[['pick','✓ Good'],['mix','✎ Change']];
  var arcCard=function(A){ var k='npcarc-'+A.id, v=V(k);
    var h='<div class="na-arc na-'+(v||'x')+'" id="na-'+A.id+'"><div class="na-hd"><h3>'+esc(A.title)+(A.seasons?' <span class="na-sea" title="carries the seasons option">★ seasons</span>':'')+'</h3><span class="na-tone">'+esc(A.tone)+'</span>'+seg(k,ARC)+'</div>';
    h+='<p class="na-log">'+esc(A.logline)+'</p><p class="na-why"><b>Why it works:</b> '+esc(A.why)+'</p><p class="na-why"><b>Where it meets the Saga:</b> '+esc(A.saga)+'</p>';
    if(A.seasons)h+='<p class="na-why na-s"><b>★ The seasons in it:</b> '+esc(A.seasonsUse)+'</p>';
    h+='<table class="tl na-ch"><thead><tr><th>Chapter</th><th>The main Saga beneath it</th><th>What happens</th><th>Mini-chapters (the villagers\' own stories)</th><th>Your note</th></tr></thead><tbody>'+A.chapters.map(function(C,i){
      return '<tr><td><b>'+esc(C.t)+'</b><br><small>'+esc(C.when)+'</small></td><td class="na-sb">'+esc(C.saga)+'</td><td>'+esc(C.story)+'<div class="na-mo">✦ '+esc(C.moment)+'</div></td><td class="na-mi">'+C.minis.map(function(m){ return '<a href="#na-v-'+m[0]+'" class="na-go" data-id="'+m[0]+'"><b>'+esc(nm(m[0]))+'</b></a> — '+esc(m[1]); }).join('<br>')+'</td><td>'+note(k+'_c'+i,'Note on this chapter…')+'</td></tr>'; }).join('')+'</tbody></table>';
    h+='<p class="na-meta"><b>Uses what you already picked:</b> '+esc(A.uses)+'<br><b>What it takes to build:</b> '+esc(A.build)+'<br><b>The risk:</b> '+esc(A.risk)+'</p>';
    return h+'<div class="na-fb">'+note(k,'Your feedback on '+A.title+'…')+'</div></div>'; };
  var vill=function(k){ var s=S[k], kk='npcarc-story_'+k, v=V(kk);
    var h='<details class="na-v na-'+(v||'x')+'" id="na-v-'+k+'"><summary><b>'+esc(s.name)+'</b> <span class="na-age">'+esc(s.age)+'</span> <span class="na-pk">'+esc(s.pick)+'</span><span class="na-ct">met '+s.meets+' · lines '+(s.count?s.count+' / ':'to write: ')+s.target+'</span></summary>';
    h+='<div class="na-vin"><p class="na-home"><b>Home:</b> '+esc(s.home)+(s.voice?'<br><b>Voice:</b> '+esc(s.voice):'')+'</p>'+s.story.map(function(p){ return '<p>'+esc(p)+'</p>'; }).join('');
    if(s.saga&&s.saga.length)h+='<h5>In the Saga</h5><ul>'+s.saga.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul>';
    if(s.ties&&s.ties.length)h+='<h5>Ties to the others</h5><ul>'+s.ties.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul>';
    var inArcs=LNARC.ARCS.map(function(A){ var m=[]; A.chapters.forEach(function(C){ C.minis.forEach(function(x){ if(x[0]===k)m.push(C.t.replace(/ — .*/,'')+': '+x[1]); }); }); return m.length?'<b>'+esc(A.title)+'</b> — '+m.map(esc).join(' · '):''; }).filter(Boolean);
    if(inArcs.length)h+='<h5>Their mini-chapters in each arc</h5><p class="na-in">'+inArcs.join('<br>')+'</p>';
    return h+'<div class="na-sa">'+seg(kk,STO)+note(kk,'What to change in '+s.name.replace(/^Your twin$/,'the twin')+'\'s story…')+'</div></div></details>'; };
  var ORDER=Object.keys(S).sort(function(a,b){ return S[b].meets-S[a].meets; });
  LAB_TABS.push({ id:'npcarcs', name:'The villagers\' saga',
    blurb:'<b>Round 114e — your picks are in:</b> all four arcs woven together, the Mending tempered (no siege, no broken houses, no defending against the Binders), and the seasons in your order. <b>Round 114 — your review first.</b> Every villager now has a full backstory that fits the Saga — most of them tied to one of the forty bound spirits (Rolf\'s wife Hallveig, Nell\'s Eyvind and Dagny, Garrick\'s sister Thora…). Below: <b>five overarching arcs</b> for the villagers, chapter by chapter across the whole game, each villager\'s story a mini-chapter inside. Three carry the <b>★ seasons</b> option. ✓ the one you want (◐ to mix parts in), note what to change, and I\'ll write every villager\'s lines (3× meetings, at least 40) from the arc you choose.',
    designs:[{id:'seasons',name:'The seasons option'}].concat(LNARC.ARCS.map(function(A){ return {id:A.id,name:'Arc: '+A.title}; }),ORDER.map(function(k){ return {id:'story_'+k,name:'Backstory: '+S[k].name}; })),
    render:function(){ var tot=0, words=0; ORDER.forEach(function(k){ tot+=S[k].target; words+=S[k].story.join(' ').split(/\s+/).length; });
      var h=LBR.sec('How this works','1 · the backstories (below the arcs) · 2 · five ways to weave them into one saga · 3 · once you pick, the lines: '+tot+' to write for '+ORDER.length+' villagers ('+words+' words of backstory so far)');
      h+='<div class="na-pick">'+LNARC.ARCS.map(function(A){ var v=V('npcarc-'+A.id); return '<a href="#na-'+A.id+'" class="na-chip na-'+(v||'x')+'">'+esc(A.title)+(A.seasons?' ★':'')+'</a>'; }).join('')+'</div>';
      if(LNARC.WOVEN){ var W=LNARC.WOVEN; h+=LBR.sec(W.title,'round 114e — your picks, ready for the lines to be written');
        h+='<p class="na-why">'+esc(W.how)+'</p><table class="tl na-ch na-wov"><thead><tr><th>Chapter · season</th>'+W.strands.map(function(x){ return '<th title="'+esc(x[2])+'">'+esc(x[1])+'</th>'; }).join('')+'</tr></thead><tbody>'+W.chapters.map(function(C){
          return '<tr><td><b>'+esc(C.t)+'</b><br><small>'+esc(C.season)+' · '+esc(C.when)+'</small></td>'+W.strands.map(function(x){ return '<td>'+esc(C[x[0]])+'</td>'; }).join('')+'</tr>'; }).join('')+'</tbody></table>'; }
      var SE=LNARC.SEASONS; h+='<div class="na-arc na-seas na-'+(V('npcarc-seasons')||'x')+'"><div class="na-hd"><h3>★ '+esc(SE.title)+'</h3><span class="na-tone">an option, not a commitment</span>'+seg('npcarc-seasons',SEA)+'</div><p class="na-log">'+esc(SE.idea)+'</p><table class="tl na-ch"><tbody>'+SE.map.map(function(r){ return '<tr><td><b>'+esc(r[0])+'</b></td><td>'+esc(r[1])+'</td></tr>'; }).join('')+'</tbody></table><p class="na-meta">'+esc(SE.note)+'</p><div class="na-fb">'+note('npcarc-seasons','Your thoughts on the seasons…')+'</div></div>';
      h+=LBR.sec('Five overarching arcs','each runs the whole game, Prologue to after the end; ★ = has the seasons');
      h+=LNARC.ARCS.map(arcCard).join('');
      h+=LBR.sec('The backstories','most-met first · click to open · ✓ if it\'s right, ✎ with a note if not');
      h+=ORDER.map(vill).join('');
      return h; } });
  document.addEventListener('click',function(e){ var g=e.target.closest&&e.target.closest('.na-go'); if(g){ e.preventDefault(); var d=document.getElementById('na-v-'+g.dataset.id); if(d){ d.open=true; d.scrollIntoView({behavior:'smooth',block:'start'}); } return; }
    var sg=e.target.closest&&e.target.closest('.na-seg .na-sg'); if(!sg)return; var s=sg.parentNode, k=s.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn na-sg'+(x.dataset.v===nv?' on '+nv:''); }); var c=s.closest('.na-arc,.na-v'); if(c)c.className=c.className.replace(/\bna-(pick|mix|cut|x)\b/,'na-'+(nv||'x')); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.na-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.na-pick{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 12px}.na-chip{padding:5px 12px;border-radius:14px;border:1px solid #2e4a66;color:#cfe8ff;text-decoration:none;font:600 13px "Segoe UI"}.na-chip.na-pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.na-chip.na-mix{background:#4a3a10;border-color:#ffd84a}.na-chip.na-cut{opacity:.45}'+
    '.na-arc{border:1px solid #243246;border-radius:12px;background:#0b121c;padding:12px 14px;margin:12px 0}.na-arc.na-pick{border-color:#8fe8a0;box-shadow:0 0 0 1px #2e7a4a inset}.na-arc.na-mix{border-color:#c9a03a}.na-arc.na-cut{opacity:.55}.na-seas{background:#0d1420;border-style:dashed}'+
    '.na-hd{display:flex;flex-wrap:wrap;gap:10px;align-items:center}.na-hd h3{margin:0;font:700 18px Georgia,serif;color:#ffe9a8;flex:1}.na-sea{font:700 11px "Segoe UI";color:#ffd84a;border:1px solid #ffd84a;border-radius:9px;padding:1px 7px;vertical-align:middle}.na-tone{font:600 11px "Segoe UI";padding:2px 8px;border-radius:9px;background:#22324a;color:#bfe0ff}'+
    '.na-log{font:italic 15px/1.45 Georgia,serif;color:#f2ead8;margin:8px 0}.na-why{font-size:12.5px;color:#c8d4e4;margin:4px 0}.na-why.na-s{color:#ffe7a0}.na-ch td{font-size:12.5px;vertical-align:top;line-height:1.4}.na-ch td:first-child{width:150px}.na-ch td:last-child{width:170px}.na-sb{color:#9fe8ff;width:150px}.na-mi{width:230px}.na-mi a{color:#ffd27a;text-decoration:none}.na-mo{margin-top:5px;color:#ffe7a0;font-style:italic}'+
    '.na-wov td{width:auto!important;font-size:12px}.na-wov td:first-child{width:150px!important}.na-meta{font-size:12px;color:#9fb0c8;margin:8px 0 4px}.na-fb .na-n{width:100%}.na-sg{padding:3px 9px;font-size:12px;opacity:.75}.na-sg.on{opacity:1}.na-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.na-sg.on.mix{background:#5a4510;border-color:#ffd84a;color:#fff}.na-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}.na-n{width:100%;box-sizing:border-box}'+
    '.na-v{border:1px solid #243246;border-radius:10px;margin:7px 0;background:#0b121c}.na-v.na-pick{border-color:#2e7a4a}.na-v.na-mix{border-color:#c9a03a}.na-v>summary{cursor:pointer;padding:9px 12px;display:flex;flex-wrap:wrap;gap:10px;align-items:baseline}.na-age{color:#8aa0b8;font-size:12px}.na-pk{color:#bfe0ff;font-size:12.5px;flex:1;font-style:italic}.na-ct{color:#ffd84a;font:600 12px "Segoe UI"}'+
    '.na-vin{padding:0 14px 12px;max-width:980px}.na-vin p{font-size:13.5px;line-height:1.55;color:#e4ebf5;margin:6px 0}.na-vin p.na-home{font-size:12.5px;color:#9fb0c8}.na-vin h5{margin:10px 0 3px;color:#ffd27a;font:600 12.5px "Segoe UI";text-transform:uppercase;letter-spacing:.04em}.na-vin ul{margin:2px 0 2px 18px;padding:0;font-size:12.5px;color:#c8d4e4}.na-in{font-size:12.5px!important;color:#c8d4e4!important}.na-sa{display:flex;gap:8px;align-items:center;margin-top:8px}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('npcarcs');
  if(typeof LTODO!=='undefined')LTODO.add({id:'npcarcs',label:'📜 The villagers\' saga: ✓ one of five arcs (or ◐ mix), say yes or no to the seasons, and check the backstories',where:'The villagers\' saga tab',
    done:function(){ return LNARC.ARCS.some(function(A){ return V('npcarc-'+A.id)==='pick'; })&&!!V('npcarc-seasons'); },go:function(){ LTODO.goTo('npcarcs','.na-pick',0); }});
})();
