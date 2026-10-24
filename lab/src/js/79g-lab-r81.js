// ═══════════════════════════════════════════════════════════════════════
// ║ 79g-lab-r81.js — round 81: PICK THE GENTLE SOUNDS, and THE LIBRARY.
// ║  · Music & sound → "Pick the gentle sounds" (Kris: "let's remake every sound effect, but then in the lab, i want to have these as options
// ║    to choose between"): every effect with today's take (where it has one), option 1 and option 2, each with ▶, and the pick — keep
// ║    today's · 1 · 2 · 1 + 2 (the game alternates the two). The sounds are three joined files (tools/audio/eth_preview.py: the same trim
// ║    and loudness as the game's intake), played a piece at a time. Picks: 'sfxpick-<id>', verdict cur / e1 / e2 / both.
// ║  · Library → the two paintings of the saga-hall (take A, take B): ☆ the one for the village. Picks: 'library-vb_library_a' / '_b'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined')return;
  var P=typeof ZSFX_PICK!=='undefined'&&ZSFX_PICK&&ZSFX_PICK.items?ZSFX_PICK.items:{}, IDS=Object.keys(P);
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var CUES=typeof ZAUD!=='undefined'?ZAUD.all().filter(function(c){ return c.kind==='sfx'; }):[], BY={}; CUES.forEach(function(c){ BY[c.id]=c; });
  var GN={}; if(typeof ZAUD!=='undefined')ZAUD.GROUPS.forEach(function(g){ GN[g[0]]=g[1]; });
  var key=function(id){ return 'sfxpick-'+id; }, pickOf=function(id){ var p=LabApp.picks[key(id)]; return p&&p.verdict||null; };
  var NAMES={cur:'Keep today\'s',e1:'Option 1',e2:'Option 2',both:'1 + 2'};
  // ── the sounds: three joined files, decoded once, a piece played at a time ──
  var AC=null, BUF={}, LOAD={}, cur=null;
  var load=function(k){ if(LOAD[k])return LOAD[k]; AC=AC||new (window.AudioContext||window.webkitAudioContext)();
    LOAD[k]=fetch('preview/audio/eth_'+k+'.mp3').then(function(r){ if(!r.ok)throw new Error(r.status); return r.arrayBuffer(); }).then(function(b){ return new Promise(function(ok,no){ AC.decodeAudioData(b,ok,no); }); }).then(function(d){ BUF[k]=d; return d; });
    LOAD[k].catch(function(){ LOAD[k]=null; }); return LOAD[k]; };
  var play=function(id,k,btn){ var seg=P[id]&&P[id][k]; if(!seg)return; if(cur){ try{ cur.src.stop(); }catch(e){} if(cur.btn)cur.btn.classList.remove('on'); cur=null; }
    if(btn)btn.classList.add('wait');
    load(k).then(function(d){ if(AC.state==='suspended')AC.resume(); var s=AC.createBufferSource(); s.buffer=d; s.connect(AC.destination); s.start(0,Math.max(0,seg[0]-0.02),seg[1]+0.08); if(btn){ btn.classList.remove('wait'); btn.classList.add('on'); }
      cur={src:s,btn:btn}; s.onended=function(){ if(btn)btn.classList.remove('on'); if(cur&&cur.src===s)cur=null; }; },function(){ if(btn){ btn.classList.remove('wait'); btn.textContent='✗ not found'; } }); };
  var row=function(id){ var c=BY[id]||{id:id,name:id,where:''}, p=pickOf(id), has=P[id]||{};
    var pb=function(k,lab){ return has[k]?'<button class="vbtn sfp-play" data-id="'+id+'" data-k="'+k+'" title="'+has[k][1]+' s">▶ '+lab+'</button>':'<span class="sfp-none">'+(k==='cur'?'made by code today':'—')+'</span>'; };
    var ch=function(v){ var ok=v==='cur'?!!has.cur:v==='both'?!!(has.e1&&has.e2):!!has[v]; return ok?'<button class="vbtn sfp-v" data-id="'+id+'" data-v="'+v+'" aria-pressed="'+(p===v)+'">'+NAMES[v]+'</button>':''; };
    return '<tr class="sfp-r'+(p?' done':'')+'" data-id="'+id+'"><td><b>'+esc(c.name)+'</b><br><code>'+id+'</code><div class="sfp-where">'+esc(c.where)+'</div></td>'+
      '<td class="sfp-pl">'+pb('cur','Today')+pb('e1','1')+pb('e2','2')+'</td><td class="sfp-ch">'+ch('cur')+ch('e1')+ch('e2')+ch('both')+'</td>'+
      '<td class="sfp-w"><details><summary>the words sent</summary>'+esc(typeof ZAUD!=='undefined'&&ZAUD.eth&&BY[id]?ZAUD.eth(c):c.eth||'')+'</details></td></tr>'; };
  var count=function(){ return IDS.filter(function(id){ return !!pickOf(id); }).length; };
  var section=function(){ if(!IDS.length)return '<div class="sm-legend">The gentle sounds are not in this Lab yet (tools/audio/eth_preview.py makes them).</div>';
    var groups=[]; CUES.forEach(function(c){ if(P[c.id]&&groups.indexOf(c.group)<0)groups.push(c.group); });
    var n=count(), rows=groups.map(function(g){ var L=CUES.filter(function(c){ return c.group===g&&P[c.id]; }); return '<tr class="au-g"><td colspan="4">'+(GN[g]||g)+' <span>· '+L.length+'</span></td></tr>'+L.map(function(c){ return row(c.id); }).join(''); }).join('');
    return '<div class="sm-legend"><b>Round 81 — pick the gentle sounds.</b> Every effect was made again, gentle and ethereal, two ways. Play <b>today\'s</b> take (where there is one — the rest are made by code today), <b>option 1</b> and <b>option 2</b>, then pick: '+
      '<b>keep today\'s</b>, <b>1</b>, <b>2</b>, or <b>1 + 2</b> (the game alternates the two so it never sounds the same twice). All are at the same loudness here; in the game the menu and page sounds sit quieter under the music. '+
      'The new skill, spell and mount sounds have no take today — pick 1, 2 or both. Picks save as you click; when you are done tell Claude and they go into the game.</div>'+
      '<div class="sfp-bar"><span id="sfp-n">'+n+' of '+IDS.length+' picked</span><button class="vbtn" id="sfp-next">▶ Next to pick</button><label><input type="checkbox" id="sfp-hide"> hide the picked ones</label></div>'+
      '<table class="au-t sfp-t"><thead><tr><th>Sound</th><th>Listen</th><th>Pick</th><th>Words</th></tr></thead><tbody>'+rows+'</tbody></table>'; };
  // into the Music & sound tab, first
  var A=LAB_TABS.find(function(t){ return t.id==='audio'; });
  if(A){ var r0=A.render; A.render=function(){ return LBR.sec('Pick the gentle sounds',IDS.length+' effects · today · option 1 · option 2')+section()+r0.apply(this,arguments); };
    A.blurb='<b>Round 81 — pick the gentle sounds</b> at the top: every effect made again gentle and ethereal, two options each beside today\'s take; pick one (or 1 + 2) per effect. Below: the music cues for Suno and the plan.'; }
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.sfp-play'); if(b){ play(b.dataset.id,b.dataset.k,b); return; }
    var v=e.target.closest&&e.target.closest('.sfp-v'); if(v){ var k=key(v.dataset.id), p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===v.dataset.v?null:v.dataset.v; LabApp.persist(k);
      var tr=v.closest('tr'); tr.querySelectorAll('.sfp-v').forEach(function(x){ x.setAttribute('aria-pressed',String(x.dataset.v===p.verdict)); }); tr.classList.toggle('done',!!p.verdict);
      var el=document.getElementById('sfp-n'); if(el)el.textContent=count()+' of '+IDS.length+' picked'; return; }
    if(e.target.id==='sfp-next'){ var tr2=[].slice.call(document.querySelectorAll('.sfp-r')).find(function(t){ return !pickOf(t.dataset.id); }); if(tr2){ tr2.scrollIntoView({block:'center',behavior:'smooth'}); tr2.classList.add('flash'); setTimeout(function(){ tr2.classList.remove('flash'); },1200); var pb=tr2.querySelector('.sfp-play'); if(pb)play(tr2.dataset.id,pb.dataset.k,pb); } } });
  document.addEventListener('change',function(e){ if(e.target.id==='sfp-hide')document.body.classList.toggle('sfp-hide',e.target.checked); });
  // ── the library: take A or take B ──
  var LIBS=[{id:'vb_library_a',name:'The library — take A',desc:'The gable end with the carved double door facing you, dragon heads on the gable, rune-lit windows, the open-book sign, a reading bench and scrolls by the door.'},
    {id:'vb_library_b',name:'The library — take B',desc:'A little wider, with a small lantern tower of rune-lit glass on the roof ridge. Otherwise as A.'}];
  LBR.TABS.push('library');
  LBR.drawers.library=function(cv,c,W,H,t,full,id){ var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#0e1a2a'); g.addColorStop(1,'#1d3020'); c.fillStyle=g; c.fillRect(0,0,W,H);
    c.fillStyle='#3a5a32'; c.fillRect(0,H*0.82,W,H*0.18); var Z=typeof _scn==='function'?_scn():null;
    if(!Z||!Z.has(id)||!Z.draw(c,id,W/2,H*0.9,H*0.8)){ c.fillStyle='#8aa0b8'; c.font=Math.round(H/18)+'px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText('painting loading…',W/2,H/2); } };
  LAB_TABS.push({ id:'library', name:'Library',
    blurb:'<b>Round 81 — the twin\'s library.</b> The Norse saga-hall now stands in the village, across the street from your Home: go in through its door like the shops. By day your twin reads at their desk inside ([Tab] to talk — with the Lodestar they teach you Godsbane); at night they sleep in the second bed in your Home. <b>☆ the painting you want for the village</b> (take A is in the game until you pick). The room itself is in the Interiors tab (The Library).',
    designs:LIBS.map(function(d){ return {id:d.id,name:d.name}; }),
    render:function(){ setTimeout(LBR.bind,0); return LBR.sec('The saga-hall','two takes — ☆ one')+'<div class="br-grid">'+LIBS.map(function(D,i){ return LBR.card('library',D,i,560,520,''); }).join('')+'</div>'; } });
  if(typeof LAB_ACTIVE!=='undefined'){ LAB_ACTIVE.unshift('library'); LAB_ACTIVE.unshift('audio'); }
  var st=document.createElement('style'); st.textContent='.sfp-bar{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:8px 0;color:#cfdbea;font:600 14px "Segoe UI",sans-serif}.sfp-bar #sfp-n{color:#6fe3f5}'+
    '.sfp-t td{vertical-align:middle}.sfp-pl,.sfp-ch{white-space:nowrap}.sfp-pl .vbtn,.sfp-ch .vbtn{margin:2px 3px 2px 0;padding:4px 9px}.sfp-play.on{background:#1d4a5a;border-color:#6fe3f5;color:#e8fbff}.sfp-play.wait{opacity:.6}'+
    '.sfp-v[aria-pressed="true"]{background:#2a5a3a;border-color:#7fe08a;color:#f0fff2}.sfp-none{display:inline-block;color:#5f7088;font:12px "Segoe UI",sans-serif;margin-right:8px}.sfp-where{color:#8aa0b8;font-size:12px;max-width:340px}'+
    '.sfp-r.done td:first-child b{color:#9fd48a}.sfp-r.flash{outline:2px solid #6fe3f5}body.sfp-hide .sfp-r.done{display:none}.sfp-w details{color:#8aa0b8;font-size:12px;max-width:380px}.sfp-w summary{cursor:pointer}'+
    '@media (max-width:700px){.sfp-pl,.sfp-ch{white-space:normal}}';
  document.head.appendChild(st);
  if(typeof LTODO!=='undefined'){
    LTODO.add({id:'sfxpick',label:'♫ Pick the gentle sounds',where:'Music & sound tab · top · '+IDS.length+' effects, today · option 1 · option 2',done:function(){ return IDS.length>0&&count()>=IDS.length; },go:function(){ LTODO.goTo('audio','.sfp-t',0); }});
    LTODO.add({id:'library',label:'📚 Pick the library painting (take A or B)',where:'Library tab · ☆ one',done:function(){ return LIBS.some(function(d){ return LBR.picked('library',d.id); }); },go:function(){ LTODO.goTo('library','.br-grid',0); }}); }
})();
