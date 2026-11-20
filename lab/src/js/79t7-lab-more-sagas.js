// ═══════════════════════════════════════════════════════════════════════
// ║ 79t7-lab-more-sagas.js — round 116: FIVE MORE SAGAS (LSAGA5, 79t7-0), bigger than the villagers' arcs, for Kris to review.
// ║ Picks: 'saga5-<id>' ✓ yes / ◐ part of it / ✕ no, with a note; 'saga5-<id>_c<n>' a note on one chapter.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LSAGA5==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var S=typeof LVSTORY!=='undefined'?LVSTORY:{}, P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var nm=function(k){ return S[k]?S[k].name:k; };
  var OPT=[['pick','✓ Yes, weave it in'],['mix','◐ Part of it'],['cut','✕ No']];
  var seg=function(k){ var v=V(k); return '<span class="s5-seg" data-k="'+k+'">'+OPT.map(function(o){ return '<button class="vbtn s5-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n s5-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+esc(ph)+'">'; };
  var card=function(A,i){ var k='saga5-'+A.id, v=V(k);
    var h='<div class="na-arc s5 na-'+(v||'x')+'" id="s5-'+A.id+'"><div class="na-hd"><h3>'+(i+1)+'. '+esc(A.title)+'</h3><span class="na-tone">'+esc(A.kind)+'</span><span class="na-tone s5-t">'+esc(A.tone)+'</span>'+seg(k)+'</div>';
    h+='<p class="na-log">'+esc(A.logline)+'</p><p class="na-why"><b>Why it is bigger:</b> '+esc(A.why)+'</p><p class="na-why"><b>Where it meets the Saga:</b> '+esc(A.saga)+'</p>';
    h+='<table class="tl na-ch"><thead><tr><th>Chapter</th><th>What happens</th><th>Who carries it</th><th>Your note</th></tr></thead><tbody>'+A.chapters.map(function(C,j){
      return '<tr><td><b>'+esc(C.t)+'</b><br><small>'+esc(C.when)+'</small></td><td>'+esc(C.story)+'<div class="na-mo">✦ '+esc(C.moment)+'</div></td><td class="na-mi">'+C.who.map(function(w){ return esc(nm(w)); }).join('<br>')+'</td><td>'+note(k+'_c'+j,'Note on this chapter…')+'</td></tr>'; }).join('')+'</tbody></table>';
    if(A.answer)h+='<div class="s5-ans">💬 '+esc(A.answer)+'</div>'; h+='<p class="na-meta"><b>How you would play it:</b> '+esc(A.play)+'<br><b>★ The seasons in it:</b> '+esc(A.seasons)+'<br><b>Canon kept:</b> '+esc(A.guard)+'<br><b>What it would cost:</b> '+esc(A.cost)+'</p>';
    return h+'<div class="na-fb">'+note(k,'Your feedback on '+A.title+'…')+'</div></div>'; };
  LAB_TABS.push({ id:'sagas5', name:'Five more sagas',
    blurb:'<b>Round 118 — your picks: ✓ The Lake Remembers and ✓ The Other Half will be woven in; ✕ The Four Eclipses and ✕ The Thing on the Green are set aside. The Sealed Sea (◐): your question about sailing to the islands is answered on its card — ✓ it if that works for you.</b> <b>Round 116 — five more sagas, bigger than the villagers\' arcs.</b> The four arcs you picked are the village\'s own stories. These five reach further: the enemy felt all game (<b>The Four Eclipses</b>), the deep past (<b>The Lake Remembers</b>), the twin at home as a second hero (<b>The Other Half</b>), the free folk of the four realms and a new law (<b>The Thing on the Green</b>), and the world beyond the sea (<b>The Sealed Sea</b>). Each runs the whole game. ✓ the ones to weave in, ◐ for part of one (say which part), ✕ the rest — then the villagers\' lines are written with everything you picked.',
    designs:LSAGA5.SAGAS.map(function(A){ return {id:A.id,name:A.title}; }),
    render:function(){ var h=LBR.sec('Five more sagas','each runs the whole game · ✓ weave it in · ◐ part of it · ✕ no');
      h+='<div class="na-pick">'+LSAGA5.SAGAS.map(function(A){ var v=V('saga5-'+A.id); return '<a href="#s5-'+A.id+'" class="na-chip na-'+(v||'x')+'">'+esc(A.title)+'</a>'; }).join('')+'</div>';
      return h+LSAGA5.SAGAS.map(card).join(''); } });
  document.addEventListener('click',function(e){ var sg=e.target.closest&&e.target.closest('.s5-seg .s5-sg'); if(!sg)return; var s=sg.parentNode, k=s.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn s5-sg'+(x.dataset.v===nv?' on '+nv:''); }); var c=s.closest('.na-arc'); if(c)c.className=c.className.replace(/\bna-(pick|mix|cut|x)\b/,'na-'+(nv||'x')); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.s5-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.s5-t{background:#3a2a4a!important;color:#f0d8ff!important}.s5-sg{padding:3px 9px;font-size:12px;opacity:.75}.s5-sg.on{opacity:1}.s5-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.s5-sg.on.mix{background:#5a4510;border-color:#ffd84a;color:#fff}.s5-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}.s5 .na-mi{width:170px}.s5-ans{margin:8px 0;padding:8px 12px;border-left:3px solid #6fe3f5;background:#0e1a28;color:#dff4ff;font-size:13px;line-height:1.5;border-radius:0 8px 8px 0}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('sagas5');
  if(typeof LTODO!=='undefined')LTODO.add({id:'sagas5',label:'📜 Five more sagas: ✓, ◐ or ✕ each one (bigger than the villagers\' arcs)',where:'Five more sagas tab',
    done:function(){ return LSAGA5.SAGAS.every(function(A){ return !!V('saga5-'+A.id); }); },go:function(){ LTODO.goTo('sagas5','.na-pick',0); }});
})();
