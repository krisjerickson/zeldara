// ═══════════════════════════════════════════════════════════════════════
// ║ 79t-lab-npcs.js — round 112: THE VILLAGERS (Kris: "The NPCs need to have more personality. Analyze all of the npcs, and rank order
// ║ them for number of interactions … propose 3 ideas for the top 20 and 2 ideas for the remainder … Make a section of the lab where i can
// ║ review your ideas, also it should state number of interactions with each … how the character develops over time … overarching
// ║ narratives and dramas … which of these NPCs give you a quest or a side quest … at-least 1 side quest … at-least 2 options each …
// ║ art … ideas … to make this part of the game overall more interesting"; and "not all NPCs need to be funny … dark and dismal,
// ║ straight up rude (but not profane or insulting, kind of a funny rude), super cheery"; and "quests … can also have a riddle-like
// ║ nature … go to a different NPC and ask questions for hints, or just continue to ask the NPC").
// ║ The data: LNPC (79t-0-npc-data.js). Picks: 'npcs-<npc>_i<k>' ideas, '_arc', '_q<k>' side quests; 'npcs-d_<id>' dramas,
// ║ 'npcs-e_<id>' engagement ideas, 'npcs-a_<id>' art. Each ✓ do / ✕ skip, with a note.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LNPC==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var N=LNPC.N, tot=0, ppl=0; N.forEach(function(x){ tot+=x.meet*(x.count||1); ppl+=(x.count||1); }); var AVG=tot/ppl, TOP6=N.slice(0,6).map(function(x){ return x.id; });
  var Q={main:['Main quest','#3ff0d8'],side:['Side quest','#ffd84a'],tut:['Tutorial','#9fd0ff'],none:['No quest yet','#8a96a8']};
  var seg=function(k,lab){ var v=V(k); lab=lab||[['pick','✓ Do'],['cut','✕ Skip']];
    return '<span class="np-seg" data-k="'+k+'">'+lab.map(function(o){ return '<button class="vbtn np-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k){ return '<input class="tl-n np-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note…">'; };
  var row=function(k,body){ var v=V(k); return '<div class="np-row np-'+(v||'x')+'" data-row="'+k+'"><div class="np-b">'+body+'</div><div class="np-a">'+seg(k)+note(k)+'</div></div>'; };
  var designs=[]; N.forEach(function(x){ x.ideas.forEach(function(I,i){ designs.push({id:x.id+'_i'+(i+1),name:x.n+' — idea: '+I[0]}); }); if(x.arc)designs.push({id:x.id+'_arc',name:x.n+' — how they grow'}); x.side.forEach(function(S,i){ designs.push({id:x.id+'_q'+(i+1),name:x.n+' — side quest: '+S[0]}); }); });
  LNPC.D.forEach(function(d){ designs.push({id:'d_'+d[0],name:'Drama: '+d[1]}); }); LNPC.E.forEach(function(d){ designs.push({id:'e_'+d[0],name:'Idea: '+d[1]}); }); LNPC.A.forEach(function(d){ designs.push({id:'a_'+d[0],name:'Art: '+d[1]}); });
  // round 112d (Kris: "when choosing personalities … it keeps minimizing the NPC i'm selecting"): a pick redraws the tab, so which
  // villagers are open is remembered (and kept in this browser), not reset to the top three
  var OPEN={}; try{ OPEN=JSON.parse(localStorage.getItem('np_open')||'null')||null; }catch(e){ OPEN=null; } if(!OPEN){ OPEN={}; N.slice(0,3).forEach(function(x){ OPEN[x.id]=1; }); }
  document.addEventListener('toggle',function(e){ var d=e.target; if(!d||!d.classList||!d.classList.contains('np-card'))return; var id=d.id.replace(/^np-/,''); if(d.open)OPEN[id]=1; else delete OPEN[id]; try{ localStorage.setItem('np_open',JSON.stringify(OPEN)); }catch(er){} },true);
  var card=function(x,r){ var top=r<20, mult=x.meet/AVG, q=Q[x.q]||Q.none, k0='npcs-'+x.id;
    var h='<details class="np-card'+(TOP6.indexOf(x.id)>=0?' np-top':'')+'" id="np-'+x.id+'"'+(OPEN[x.id]?' open':'')+'><summary><span class="np-rk">'+(r+1)+'</span><b>'+esc(x.n)+'</b>'+(x.count?' <small>× '+x.count+'</small>':'')+
      '<span class="np-role">'+esc(x.role)+'</span><span class="np-m" title="'+esc(x.how)+'">'+x.meet+(x.count?' each':'')+' <i>meetings</i> · '+mult.toFixed(1)+'× avg</span><span class="np-q" style="--c:'+q[1]+'">'+q[0]+'</span></summary>';
    h+='<div class="np-in"><p class="np-how"><b>Where:</b> '+esc(x.where)+' · <b>How the '+x.meet+' are counted:</b> '+esc(x.how)+'<br><b>Quests today:</b> '+esc(x.qt)+'</p>';
    h+='<h5>Personality — '+x.ideas.length+' ideas (✓ the one you like, or more than one to mix)</h5>';
    x.ideas.forEach(function(I,i){ h+=row(k0+'_i'+(i+1),'<span class="np-tone">'+esc(I[1])+'</span><b>'+esc(I[0])+'</b><p>'+I[3]+'</p><small class="np-insp">Inspired by: '+I[2]+'</small>'); });
    if(x.arc)h+='<h5>How they grow through the game <small>(met '+mult.toFixed(1)+'× the average)</small></h5>'+row(k0+'_arc','<ol class="np-arc">'+x.arc.map(function(a){ return '<li><b>'+esc(a[0])+'</b> '+esc(a[1])+'</li>'; }).join('')+'</ol>');
    h+='<h5>Side quests — '+x.side.length+' options</h5>';
    x.side.forEach(function(S,i){ h+=row(k0+'_q'+(i+1),(S[5]?'<span class="np-rid" title="A riddle quest: ask the giver again for hints, or the villagers named">🧩 riddle</span>':'')+'<span class="np-kind">'+esc(S[1])+'</span><b>'+esc(S[0])+'</b> <span class="np-rw">🎁 '+esc(S[2])+'</span><p>'+esc(S[3])+'</p>'+(S[4]&&S[4]!=='—'?'<small class="np-art">🎨 Art: '+esc(S[4])+'</small>':'')); });
    return h+'</div></details>'; };
  LAB_TABS.push({ id:'npcs', name:'Villagers & side quests',
    blurb:'<b>Round 112 — the villagers.</b> Every NPC ranked by how often you meet them, with personality ideas (3 for the top 20, 2 for the rest), how the most-met grow through the game, side quests (2+ each, some riddles), overarching dramas, engagement ideas and the art they need. ✓ do · ✕ skip · a note on anything.',
    designs:designs,
    render:function(){ var h=LBR.sec('How I counted','meetings in one full playthrough on Normal: the talks the story needs, the shop visits a typical run makes, the story moments they are in — from the game\'s own triggers. '+ppl+' people (groups counted per member) · '+tot+' meetings · average '+AVG.toFixed(1)+' · 10× the average = '+(AVG*10).toFixed(0)+'.');
      h+='<p class="np-lead">Only <b>Oswin, Benno and Morwen</b> clear 10× the average; as you chose, the six most-met (with your twin, Tilda and Garrick, all 7–8×) get a "how they grow" arc. The tones are deliberately mixed — cheery, cheerfully rude, dark and dismal, deadpan, eerie, theatrical, tender — and each idea notes the Norse or Viking-world source it draws on (Miklagard, Serkland, the Rus rivers, Ireland, the Sámi, Iceland, Frisia, the steppe).</p>';
      h+='<table class="tl np-tab"><thead><tr><th>#</th><th>Who</th><th>Meetings</th><th>Quest today</th><th>Tones on offer</th></tr></thead><tbody>'+N.map(function(x,r){ var q=Q[x.q]||Q.none, w=Math.min(100,x.meet/62*100);
        return '<tr><td>'+(r+1)+'</td><td><a href="#np-'+x.id+'" class="np-go" data-id="'+x.id+'">'+esc(x.n)+'</a>'+(x.count?' <small>×'+x.count+'</small>':'')+'</td><td><span class="np-bar"><i style="width:'+w+'%"></i></span> '+x.meet+(x.count?' each':'')+'</td><td><span class="np-q" style="--c:'+q[1]+'">'+q[0]+'</span></td><td class="np-tones">'+x.ideas.map(function(I){ return esc(I[1]); }).join(' · ')+'</td></tr>'; }).join('')+'</tbody></table>';
      h+=LBR.sec('Each villager','click a name to open · the top three are open');
      h+=N.map(card).join('');
      h+=LBR.sec('Dramas that run through the game','stories that tie villagers (and side quests) together');
      h+=LNPC.D.map(function(d){ return row('npcs-d_'+d[0],'<span class="np-tone">'+esc(d[2])+'</span><b>'+esc(d[1])+'</b><p>'+esc(d[3])+'</p><small class="np-insp">Who: '+esc(d[4])+' · Quests: '+esc(d[5])+'</small>'); }).join('');
      h+=LBR.sec('Ideas to make villagers more engaging','✓ the ones to build');
      h+=LNPC.E.map(function(d){ return row('npcs-e_'+d[0],'<b>'+esc(d[1])+'</b><p>'+esc(d[2])+'</p>'); }).join('');
      h+=LBR.sec('The art this needs','once you have picked, I order only the art for what you ✓');
      h+=LNPC.A.map(function(d){ return row('npcs-a_'+d[0],'<b>'+esc(d[1])+'</b> <span class="np-rw">'+esc(d[3])+' sheets</span><p>'+esc(d[2])+'</p>'); }).join('');
      return h; } });
  document.addEventListener('click',function(e){ var g=e.target.closest&&e.target.closest('.np-go'); if(g){ e.preventDefault(); var d=document.getElementById('np-'+g.dataset.id); if(d){ d.open=true; OPEN[g.dataset.id]=1; d.scrollIntoView({behavior:'smooth',block:'start'}); } return; }
    var sg=e.target.closest&&e.target.closest('.np-seg .np-sg'); if(!sg)return; var s=sg.parentNode, k=s.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn np-sg'+(x.dataset.v===nv?' on '+nv:''); }); var r=s.closest('.np-row'); if(r)r.className='np-row np-'+(nv||'x'); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.np-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.np-lead{font-size:13px;color:#b8c8dc;max-width:980px}.np-tab td{font-size:12.5px;vertical-align:middle}.np-tab a{color:#9fe8ff}.np-bar{display:inline-block;width:90px;height:7px;border-radius:4px;background:#1a2433;vertical-align:middle}.np-bar i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,#3ff0d8,#ffd84a)}.np-tones{color:#9fb0c8}'+
    '.np-q{display:inline-block;font:600 11px "Segoe UI",sans-serif;padding:1px 7px;border-radius:9px;border:1px solid var(--c);color:var(--c);white-space:nowrap}'+
    '.np-card{border:1px solid #243246;border-radius:10px;margin:8px 0;background:#0b121c}.np-card.np-top{border-color:#3b5a6a}.np-card>summary{cursor:pointer;display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:9px 12px;list-style:none}.np-card>summary::-webkit-details-marker{display:none}'+
    '.np-rk{width:24px;height:24px;border-radius:50%;background:#1d4a5a;color:#fff;display:flex;align-items:center;justify-content:center;font:700 12px "Segoe UI"}.np-role{color:#9fb0c8;font-size:12.5px;flex:1}.np-m{color:#ffd84a;font:600 12px "Segoe UI"}.np-m i{font-style:normal;color:#9fb0c8;font-weight:400}'+
    '.np-in{padding:0 12px 10px}.np-in h5{margin:12px 0 4px;color:#ffd27a;font:600 13px "Segoe UI";text-transform:uppercase;letter-spacing:.04em}.np-in h5 small{color:#8aa0b8;text-transform:none;letter-spacing:0}.np-how{font-size:12px;color:#9fb0c8;margin:2px 0}'+
    '.np-row{display:flex;gap:10px;align-items:flex-start;padding:7px 8px;border-radius:7px;margin:3px 0;border:1px solid transparent}.np-row.np-pick{background:rgba(31,106,58,.18);border-color:#2e7a4a}.np-row.np-cut{opacity:.5}.np-b{flex:1;font-size:13px;color:#e8eef8}.np-b p{margin:3px 0;color:#c8d4e4;font-size:12.5px}.np-a{display:flex;flex-direction:column;gap:4px;width:190px}'+
    '.np-tone,.np-kind{display:inline-block;margin-right:6px;font:600 10.5px "Segoe UI";padding:1px 6px;border-radius:8px;background:#22324a;color:#bfe0ff}.np-kind{background:#2a2a40;color:#d8c8ff}.np-rid{display:inline-block;margin-right:6px;font:700 10.5px "Segoe UI";padding:1px 6px;border-radius:8px;background:#4a3a10;color:#ffd84a}'+
    '.np-insp,.np-art{display:block;color:#8aa0b8;font-size:11.5px}.np-art{color:#d8b8ff}.np-rw{color:#8fe8a0;font-size:12px}.np-arc{margin:2px 0 2px 18px;padding:0;font-size:12.5px;color:#c8d4e4}.np-arc li{margin:2px 0}.np-arc b{color:#9fe8ff}'+
    '.np-sg{padding:3px 8px;font-size:12px;opacity:.75}.np-sg.on{opacity:1}.np-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.np-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}.np-n{width:100%}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('npcs');
  if(typeof LTODO!=='undefined')LTODO.add({id:'npcs',label:'🧑‍🌾 Villagers: ✓ a personality, ✓ a side quest for each (and the dramas, ideas and art you want)',where:'Villagers & side quests tab',
    done:function(){ return N.every(function(x){ return x.ideas.some(function(I,i){ return V('npcs-'+x.id+'_i'+(i+1))==='pick'; })&&x.side.some(function(S,i){ return V('npcs-'+x.id+'_q'+(i+1))==='pick'; }); }); },go:function(){ LTODO.goTo('npcs','.np-tab',0); }});
})();
