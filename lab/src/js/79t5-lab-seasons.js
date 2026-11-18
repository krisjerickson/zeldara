// ═══════════════════════════════════════════════════════════════════════
// ║ 79t5-lab-seasons.js — round 114e: the Lab tab "Seasons: the cost" (data: LSEAS, 79t5-0). Kris picks a level: 'seasons-level_<id>'
// ║ ✓ this one / ✕ no, with a note; 'seasons-order' ✓ the order and the mild winter.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LSEAS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var seg=function(k,lab){ var v=V(k); return '<span class="se-seg" data-k="'+k+'">'+lab.map(function(o){ return '<button class="vbtn se-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n se-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+esc(ph)+'">'; };
  var $=function(x){ return '$'+x.toFixed(2); }, N=function(t){ return t.n.scn+t.n.chr+t.n.frm+t.n.sht; };
  LAB_TABS.push({ id:'seasons', name:'Seasons: the cost',
    blurb:'<b>Round 114e — the seasons, end to end, before anything is made.</b> Your order (a mild winter before the start → a mild spring with the Grasslands → summer → autumn → a mild winter → Freya\'s spring), everything a season would touch, and three levels — limited, balanced, holistic — with the number of new pictures and their cost, from what 4,168 paintings have actually cost so far. ✓ the level you want.',
    designs:LSEAS.LEVELS.map(function(L){ return {id:'level_'+L.id,name:L.name}; }).concat([{id:'order',name:'The order and the mild winter'}]),
    render:function(){ var h='';
      h+=LBR.sec('The order of the year','as you set it');
      h+='<div class="se-row">'+seg('seasons-order',[['pick','✓ Right'],['mix','✎ Change']])+note('seasons-order','Anything to change in the order or the looks…')+'</div><table class="tl se-t"><thead><tr><th>When</th><th>Season</th><th>How it looks</th></tr></thead><tbody>'+LSEAS.ORDER.map(function(r){ return '<tr><td><b>'+esc(r[0])+'</b></td><td class="se-s">'+esc(r[1])+'</td><td>'+esc(r[2])+'</td></tr>'; }).join('')+'</tbody></table>';
      h+='<div class="se-box"><b>Winter, kept mild</b> (both winters)<ul>'+LSEAS.WINTER.map(function(t){ return '<li>'+esc(t)+'</li>'; }).join('')+'</ul></div>';
      h+=LBR.sec('The three levels','pictures at the measured averages: scenery sheet $0.048 · character sheet $0.038 · story frame or backdrop $0.078 · shot $0.069 · plus 25 % for redos');
      h+='<div class="se-lv">'+LSEAS.LEVELS.map(function(L){ var t=LSEAS.total(L), k='seasons-level_'+L.id, v=V(k);
        return '<div class="se-c se-'+(v||'x')+'"><h3>'+esc(L.name)+'</h3><p class="se-p">'+esc(L.pitch)+'</p><div class="se-big"><b>'+N(t)+'</b> new pictures · <b>'+$(t.redo)+'</b> <small>('+$(t.usd)+' + redos; '+$(t.two)+' with two takes of each to choose from)</small></div>'+
          '<table class="tl se-i"><tbody>'+L.items.map(function(x){ return '<tr><td>'+esc(x[0])+'</td><td class="se-n2">'+x[2]+'</td><td class="se-k">'+esc(LSEAS.PN[x[1]])+'</td></tr>'; }).join('')+'</tbody></table>'+
          '<p><b>Music & ambience:</b> '+esc(L.audio)+'</p><p><b>Words:</b> '+esc(L.words)+'</p><p><b>Code:</b> '+esc(L.code)+'</p><p><b>Work:</b> '+esc(L.rounds)+' · <b>your review:</b> '+N(t)+' pictures · <b>hosting:</b> about +'+L.mb+' MB a deploy</p>'+
          '<p><b>The waiting shots:</b> '+esc(L.shots)+'</p><p class="se-f">'+esc(L.feel)+'</p>'+(L.opt?'<p class="se-o">'+esc(L.opt)+'</p>':'')+
          '<div class="se-a">'+seg(k,[['pick','✓ This level'],['cut','✕ No']])+note(k,'Note on '+L.name.split(' —')[0]+'…')+'</div></div>'; }).join('')+'</div>';
      h+='<div class="se-box se-rec">'+esc(LSEAS.REC)+'</div><div class="se-box">'+esc(LSEAS.PENDING)+'</div>';
      var S=LSEAS.SAGA, st=LSEAS.total(S); h+=LBR.sec(S.t,N(st)+' pictures · '+$(st.redo)+' with redos');
      h+='<table class="tl se-i"><tbody>'+S.items.map(function(x){ return '<tr><td>'+esc(x[0])+'</td><td class="se-n2">'+x[2]+'</td><td class="se-k">'+esc(LSEAS.PN[x[1]])+'</td></tr>'; }).join('')+'</tbody></table>';
      h+=LBR.sec('Everything a season touches','end to end · what each level does there');
      h+='<table class="tl se-t se-sys"><thead><tr><th>Where</th><th>What changes</th><th>Limited</th><th>Balanced</th><th>Holistic</th></tr></thead><tbody>'+LSEAS.SYS.map(function(r){ return '<tr><td><b>'+esc(r[0])+'</b></td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td><td>'+esc(r[3])+'</td><td>'+esc(r[4])+'</td></tr>'; }).join('')+'</tbody></table>';
      h+=LBR.sec('What does not change','at any level')+'<ul class="se-not">'+LSEAS.NOT.map(function(t){ return '<li>'+esc(t)+'</li>'; }).join('')+'</ul>';
      return h; } });
  document.addEventListener('click',function(e){ var sg=e.target.closest&&e.target.closest('.se-seg .se-sg'); if(!sg)return; var s=sg.parentNode, k=s.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn se-sg'+(x.dataset.v===nv?' on '+nv:''); }); var c=s.closest('.se-c'); if(c)c.className='se-c se-'+(nv||'x'); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.se-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.se-t td{font-size:12.5px;vertical-align:top;line-height:1.45}.se-s{color:#ffd27a;font-weight:600;white-space:nowrap}.se-row{display:flex;gap:8px;align-items:center;margin:4px 0 8px}.se-row .se-n{flex:1}'+
    '.se-box{background:#0d1622;border:1px solid #2a3c52;border-radius:10px;padding:9px 13px;margin:10px 0;font-size:13px;color:#dfe8f2;line-height:1.5}.se-box ul{margin:4px 0 0 18px;padding:0}.se-rec{border-color:#8fe8a0;background:#0c1a14}'+
    '.se-lv{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:12px}.se-c{border:1px solid #243246;border-radius:12px;background:#0b121c;padding:12px 14px;font-size:12.5px;color:#d8e2ee}.se-c.se-pick{border-color:#8fe8a0;box-shadow:0 0 0 1px #2e7a4a inset}.se-c.se-cut{opacity:.5}'+
    '.se-c h3{margin:0 0 4px;font:700 17px Georgia,serif;color:#ffe9a8}.se-p{color:#c8d4e4;margin:2px 0 8px}.se-big{font-size:15px;color:#fff;margin:6px 0}.se-big small{color:#9fb0c8;font-size:11.5px}.se-i td{font-size:12px;padding:3px 6px}.se-n2{text-align:right;color:#ffd84a;font-weight:700}.se-k{color:#8aa0b8;white-space:nowrap}'+
    '.se-c p{margin:5px 0;line-height:1.45}.se-f{color:#9fe8ff;font-style:italic}.se-o{color:#ffd27a}.se-a{display:flex;flex-direction:column;gap:5px;margin-top:8px}.se-sg{padding:3px 9px;font-size:12px;opacity:.75}.se-sg.on{opacity:1}.se-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.se-sg.on.mix{background:#5a4510;border-color:#ffd84a;color:#fff}.se-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}.se-n{box-sizing:border-box;width:100%}'+
    '.se-sys td:nth-child(n+3){color:#c8d4e4;width:17%}.se-not{font-size:12.5px;color:#c8d4e4}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('seasons');
  if(typeof LTODO!=='undefined')LTODO.add({id:'seasons',label:'🍂 Seasons: ✓ one of three levels (limited, balanced, holistic), and check the order',where:'Seasons: the cost tab',
    done:function(){ return LSEAS.LEVELS.some(function(L){ return V('seasons-level_'+L.id)==='pick'; }); },go:function(){ LTODO.goTo('seasons','.se-lv',0); }});
})();
