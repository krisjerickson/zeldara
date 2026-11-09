// ═══════════════════════════════════════════════════════════════════════
// ║ 79m2-lab-sfx93.js — round 93: THEMATIC TAKES (Kris: "they are still largely not very good. Look back into what each sound effect is supposed to
// ║ be representing … redo all of the ones i have not chosen, with 5 total to choose from (including already chosen ones), making sure that the
// ║ sounds are thematic"). As round 89's table (79m, which this replaces): every effect, what it stands for (ZAUD.MEAN93), the takes kept (★),
// ║ a fresh library take where one fits (r1) and new ElevenLabs takes (w1–w5) up to five in all. Picks: 'sfx93-<id>'; ✓ Approve: 'sfxok-<id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof ZAUD==='undefined'||!ZAUD.V93)return;
  var T=LAB_TABS.find(function(t){ return t.id==='sfxpick'; }); if(!T)return;
  var ITEMS=typeof ZSFX84!=='undefined'&&ZSFX84&&ZSFX84.items||{}, CUES={}; ZAUD.all().forEach(function(c){ if(c.kind==='sfx')CUES[c.id]=c; });
  var KN={cur:'Today',l1:'Rec 1',l2:'Rec 2',l3:'Rec 3',l4:'Rec 4',l5:'Rec 5',l6:'Rec 6',n1:'New 84·1',n2:'New 84·2',e1:'Gentle 1',e2:'Gentle 2',v1:'New 89·1',v2:'New 89·2',v3:'New 89·3',v4:'New 89·4',v5:'New 89·5',w1:'New 1',w2:'New 2',w3:'New 3',w4:'New 4',w5:'New 5',r1:'Library',r2:'Library 2'};
  var IDS=Object.keys(ZAUD.KEPT93).filter(function(id){ return (ZAUD.V93[id]||[]).length||ZAUD.LIB93[id]; }).sort(function(a,b){ return (ZAUD.KEPT93[a]||[]).length-(ZAUD.KEPT93[b]||[]).length; });
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var key=function(id){ return 'sfx93-'+id; };
  var mine=function(id){ var p=LabApp.picks[key(id)]; if(p&&p.verdict!==undefined)return p.verdict?String(p.verdict).split('+'):[]; return (ZAUD.KEPT93[id]||[]).slice(); };
  var touched=function(id){ var p=LabApp.picks[key(id)]; return !!(p&&p.verdict!==undefined); };
  // the player: the joined preview files (tools/audio/sfx_preview.py), a piece at a time
  var AC=null, LOAD={}, cur=null;
  var load=function(k){ if(LOAD[k])return LOAD[k]; AC=AC||new (window.AudioContext||window.webkitAudioContext)();
    LOAD[k]=fetch('preview/audio/s84_'+k+'.mp3').then(function(r){ if(!r.ok)throw new Error(r.status); return r.arrayBuffer(); }).then(function(b){ return new Promise(function(ok,no){ AC.decodeAudioData(b,ok,no); }); });
    LOAD[k].catch(function(){ LOAD[k]=null; }); return LOAD[k]; };
  var play=function(id,k,btn){ var seg=ITEMS[id]&&ITEMS[id][k]; if(!seg)return; if(cur){ try{ cur.s.stop(); }catch(e){} if(cur.b)cur.b.classList.remove('on'); cur=null; } btn.classList.add('wait');
    load(k).then(function(d){ if(AC.state==='suspended')AC.resume(); var s=AC.createBufferSource(); s.buffer=d; s.connect(AC.destination); s.start(0,Math.max(0,seg[0]-0.02),seg[1]+0.08); btn.classList.remove('wait'); btn.classList.add('on'); cur={s:s,b:btn}; s.onended=function(){ btn.classList.remove('on'); }; },
      function(){ btn.classList.remove('wait'); btn.textContent='✗ not in yet'; }); };
  var row=function(id){ var c=CUES[id]||{name:id,where:''}, kept=ZAUD.KEPT93[id]||[], M=mine(id), V=ZAUD.V93[id]||[], has=ITEMS[id]||{}, LB=(ZAUD.LIB93[id]?['r1']:[]).concat(has.r2?['r2']:[]);      /* round 93b: a second library take from the 2015-2017 bundles */
    /* round 101: every take you picked (any round) first, then the offered ones until there are five to choose from */
    var SRC=(ZAUD.SRC101||{})[id]||{}, opts=[], seen={}, add=function(k,isNew,w){ if(seen[k])return; seen[k]=1; opts.push([k,isNew,w]); };
    kept.forEach(function(k){ add(k,false); }); M.forEach(function(k){ add(k,!/^(cur|e\d|l\d|n\d)$/.test(k)); });
    var rest=LB.map(function(k){ return [k,true,'a fresh recording from the Sonniss library']; }).concat(V.map(function(w,i){ return ['w'+(i+1),true,w]; })).filter(function(o){ return !seen[o[0]]; });
    while(opts.length<5&&rest.length){ var o=rest.shift(); add(o[0],o[1],o[2]); }
    var take=function(k,isNew,words){ var on=M.indexOf(k)>=0, ready=!!has[k];
      return '<span class="s89-k'+(isNew?' new':' kept')+'">'+(ready?'<button class="vbtn s89-play" data-id="'+id+'" data-k="'+k+'">▶ '+KN[k]+'</button>':'<span class="s89-wait" title="'+esc(words||'')+'">'+KN[k]+' — not made yet</span>')+
        '<button class="vbtn s89-v" data-id="'+id+'" data-k="'+k+'" aria-pressed="'+on+'"'+(ready||!isNew?'':' disabled')+'>'+(on?'★':'☆')+'</button></span>'; };
    return '<tr class="s89-r'+(M.length?' done':'')+'" data-id="'+id+'"><td><b>'+esc(c.name)+'</b><br><code>'+id+'</code><div class="sfp-where">'+esc(c.where)+'</div><div class="s93-mean">🎯 '+esc((ZAUD.MEAN93||{})[id]||'')+'</div>'+
      '<div class="s89-tag">'+(kept.length?'kept: '+kept.map(function(k){ return (KN[k]||k)+(SRC[k]?' <i class="s101-src">('+SRC[k].replace(/\+/g,' · ').replace('game','in the game').replace('lab','picked earlier').replace('kept','kept 89')+')</i>':''); }).join(', '):'<b>no pick yet — five new takes</b>')+(M.length>3?' <b class="s101-trim">· '+M.length+' ★ — the game rotates three: ☆ the ones to drop</b>':'')+'</div></td>'+
      '<td class="s89-pl">'+opts.map(function(o){ return take(o[0],o[1],o[2]); }).join('')+'</td>'+
      '<td class="sfp-w"><details><summary>the new words</summary><ol>'+V.map(function(w){ return '<li>'+esc(w)+'</li>'; }).join('')+'</ol></details></td></tr>'; };
  var count=function(){ return IDS.filter(function(id){ return touched(id); }).length; };
  var section=function(){ var made=IDS.filter(function(id){ return ITEMS[id]&&(ITEMS[id].w1||ITEMS[id].r1); }).length;
    return '<div class="sm-legend s89-lg"><b>Round 93 — thematic takes, five to choose from for every effect.</b> Each row says what the sound stands for (🎯). Your <b>kept</b> takes (★) stay; every other take is new and names the real sound first — lightning sounds like lightning, Starfall like shooting stars. Where the sound library had a fitting recording that was never offered, it is one of the five (Library). The '+IDS.filter(function(id){ return !(ZAUD.KEPT93[id]||[]).length; }).length+' with no pick yet come first. ▶ plays, ☆ picks — <b>up to three</b> (the game takes turns between them). '+
      (made?made+' of '+IDS.length+' have their new takes in.':'<b>The new takes are not made yet</b> — run <code>.\\tools\\audio\\audio5.ps1</code>; the words for each are under "the new words".')+'</div>'+
      '<div class="sfp-bar"><span id="s89-n">'+count()+' of '+IDS.length+' looked at</span><button class="vbtn" id="s89-next">▶ Next to pick</button></div>'+
      '<table class="au-t sfp-t s89-t"><thead><tr><th>Sound</th><th>Kept ★ and new takes — ▶ listen · ☆ pick (up to three)</th><th>Words</th></tr></thead><tbody>'+IDS.map(row).join('')+'</tbody></table>'+
      '<h3 class="br-h">Already three picks<span>done — kept as they are</span></h3>'; };
  // round 89c (Kris: "make a separate button to select for each sound of 'approved' for when i know i am happy with the sound picks"):
  // ✓ Approved on every effect (both tables); approved rows turn green and can be hidden. Picks: 'sfxok-<id>' verdict 'approved'.
  var okKey=function(id){ return 'sfxok-'+id; }, isOk=function(id){ var p=LabApp.picks[okKey(id)]; return !!(p&&p.verdict==='approved'); };
  var okBtn=function(id){ return '<button class="vbtn sfx-ok" data-id="'+id+'" aria-pressed="'+isOk(id)+'">'+(isOk(id)?'✓ Approved':'Approve')+'</button>'; };
  var okCount=function(){ var all=[].slice.call(document.querySelectorAll('.s89-r,.sfp-r')).map(function(r){ return r.dataset.id; }).filter(function(x,i,A){ return A.indexOf(x)===i; }); return all.filter(isOk).length+' of '+all.length+' approved'; };
  var dress=function(){ [].slice.call(document.querySelectorAll('.s89-r,.sfp-r')).forEach(function(r){ var td=r.querySelector('td'); if(!td||td.querySelector('.sfx-ok'))return; td.insertAdjacentHTML('beforeend','<div class="sfx-okw">'+okBtn(r.dataset.id)+'</div>'); r.classList.toggle('ok',isOk(r.dataset.id)); });
    var bar=document.querySelector('.sfp-bar'); if(bar&&!document.getElementById('sfx-okn'))bar.insertAdjacentHTML('beforeend','<span id="sfx-okn">'+okCount()+'</span><label><input type="checkbox" id="sfx-okhide"> hide the approved ones</label>'); };
  var r0=T.render; T.render=function(){ setTimeout(dress,0); setTimeout(dress,400); return LBR.sec('Round 93 — thematic takes',IDS.length+' effects · five to choose from · ✓ approve when happy')+section()+r0.apply(this,arguments); };
  T.name='Sound effects'; T.blurb='<b>Round 93 — thematic takes.</b> At the top: every effect, what it stands for, your kept takes and new ones naming the real sound — five to choose from.';
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.s89-play'); if(b){ play(b.dataset.id,b.dataset.k,b); return; }
    var v=e.target.closest&&e.target.closest('.s89-v'); if(v&&!v.disabled){ var id=v.dataset.id, k=key(id), L=mine(id), i=L.indexOf(v.dataset.k);
      if(i>=0)L.splice(i,1); else { if(L.length>=3){ v.classList.add('s101-full'); setTimeout(function(){ v.classList.remove('s101-full'); },900); var tg=v.closest('tr').querySelector('.s89-tag'); if(tg&&!tg.querySelector('.s101-msg'))tg.insertAdjacentHTML('beforeend',' <b class="s101-msg">three ★ already — ☆ one first</b>'); return; } L.push(v.dataset.k); }
      var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=L.join('+'); LabApp.persist(k);
      var tr=v.closest('tr'); tr.querySelectorAll('.s89-v').forEach(function(x){ var on=L.indexOf(x.dataset.k)>=0; x.setAttribute('aria-pressed',String(on)); x.textContent=on?'★':'☆'; }); tr.classList.toggle('done',L.length>0);
      var n=document.getElementById('s89-n'); if(n)n.textContent=count()+' of '+IDS.length+' looked at'; return; }
    var ok=e.target.closest&&e.target.closest('.sfx-ok'); if(ok){ var id2=ok.dataset.id, k2=okKey(id2), p2=LabApp.picks[k2]=LabApp.picks[k2]||{}; p2.verdict=isOk(id2)?null:'approved'; LabApp.persist(k2);
      document.querySelectorAll('.sfx-ok[data-id="'+id2+'"]').forEach(function(x){ var on=isOk(id2); x.setAttribute('aria-pressed',String(on)); x.textContent=on?'✓ Approved':'Approve'; var tr=x.closest('tr'); if(tr)tr.classList.toggle('ok',on); });
      var c=document.getElementById('sfx-okn'); if(c)c.textContent=okCount(); return; }
    if(e.target.id==='s89-next'){ var tr2=[].slice.call(document.querySelectorAll('.s89-r')).find(function(t){ return !touched(t.dataset.id); }); if(tr2){ tr2.scrollIntoView({block:'center',behavior:'smooth'}); tr2.classList.add('flash'); setTimeout(function(){ tr2.classList.remove('flash'); },1200); } } });
  document.addEventListener('change',function(e){ if(e.target.id==='sfx-okhide')document.body.classList.toggle('sfx-okhide',e.target.checked); });
  var st=document.createElement('style'); st.textContent='.sfx-okw{margin-top:6px}.sfx-ok[aria-pressed="true"]{background:#1f6a3a;border-color:#8fe8a0;color:#fff}tr.ok td:first-child{box-shadow:inset 4px 0 0 #8fe8a0}body.sfx-okhide tr.ok{display:none}#sfx-okn{color:#8fe8a0}'+
    '.s89-k{display:inline-flex;align-items:center;gap:2px;margin:2px 8px 2px 0}.s89-k .vbtn{padding:4px 8px}.s89-k.kept .s89-play{border-color:#7fe08a}'+
    '.s89-v[aria-pressed="true"]{background:#2a5a3a;border-color:#7fe08a;color:#f0fff2}.s89-v[disabled]{opacity:.35}.s89-wait{color:#5f7088;font:12px "Segoe UI",sans-serif}.s89-play.on{background:#1d4a5a;border-color:#6fe3f5}.s89-play.wait{opacity:.6}'+
    '.s89-tag{color:#ffd27a;font-size:12px;margin-top:3px}.s89-r.done td:first-child b{color:#9fd48a}.s89-r.flash{outline:2px solid #6fe3f5}.s89-pl{white-space:normal}.s89-t ol{margin:4px 0 0 16px;padding:0}.s93-mean{color:#9fd0ff;font-size:12px;margin-top:3px}.s101-src{color:#b9c6d8;font-style:normal}.s101-trim,.s101-msg{color:#ffb38a}.s101-full{outline:2px solid #ffb38a}';
  document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'sfx93',label:'🔊 Thematic sound takes: pick for '+IDS.length+' effects',where:'Sound effects tab · top section',done:function(){ return count()>=IDS.length; },go:function(){ LTODO.goTo('sfxpick','.s89-t',0); }});
})();
