// ═══════════════════════════════════════════════════════════════════════
// ║ 79m-lab-sfx89.js — round 89: THE NEW TAKES, AT THE TOP OF SOUND EFFECTS (Kris: "bring them to the top of the lab with all new choices …
// ║ keep all currently chosen ones, discard the unchosen … create an updated way to pick in the lab").
// ║ Every effect with fewer than three picks: the takes you kept (★, still picked) and its 3–5 brand-new takes (New 1–5, from
// ║ tools/audio/audio4.ps1). ▶ plays; ☆ picks — up to three in all, kept ones included (click a kept one to drop it). The ones with no
// ║ pick yet come first. Picks: 'sfx89-<id>' (e.g. 'l2+v3'); until you touch a row it stands at what you kept. The effects that already
// ║ have three picks are listed below, done.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof ZAUD==='undefined'||!ZAUD.V89)return;
  var T=LAB_TABS.find(function(t){ return t.id==='sfxpick'; }); if(!T)return;
  var ITEMS=typeof ZSFX84!=='undefined'&&ZSFX84&&ZSFX84.items||{}, CUES={}; ZAUD.all().forEach(function(c){ if(c.kind==='sfx')CUES[c.id]=c; });
  var KN={cur:'Today',l1:'Rec 1',l2:'Rec 2',l3:'Rec 3',l4:'Rec 4',l5:'Rec 5',l6:'Rec 6',n1:'New 84·1',n2:'New 84·2',e1:'Gentle 1',e2:'Gentle 2',v1:'New 1',v2:'New 2',v3:'New 3',v4:'New 4',v5:'New 5'};
  var IDS=Object.keys(ZAUD.V89).sort(function(a,b){ return (ZAUD.KEPT89[a]||[]).length-(ZAUD.KEPT89[b]||[]).length; });
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var key=function(id){ return 'sfx89-'+id; };
  var mine=function(id){ var p=LabApp.picks[key(id)]; if(p&&p.verdict!==undefined)return p.verdict?String(p.verdict).split('+'):[]; return (ZAUD.KEPT89[id]||[]).slice(); };
  var touched=function(id){ var p=LabApp.picks[key(id)]; return !!(p&&p.verdict!==undefined); };
  // the player: the joined preview files (tools/audio/sfx_preview.py), a piece at a time
  var AC=null, LOAD={}, cur=null;
  var load=function(k){ if(LOAD[k])return LOAD[k]; AC=AC||new (window.AudioContext||window.webkitAudioContext)();
    LOAD[k]=fetch('preview/audio/s84_'+k+'.mp3').then(function(r){ if(!r.ok)throw new Error(r.status); return r.arrayBuffer(); }).then(function(b){ return new Promise(function(ok,no){ AC.decodeAudioData(b,ok,no); }); });
    LOAD[k].catch(function(){ LOAD[k]=null; }); return LOAD[k]; };
  var play=function(id,k,btn){ var seg=ITEMS[id]&&ITEMS[id][k]; if(!seg)return; if(cur){ try{ cur.s.stop(); }catch(e){} if(cur.b)cur.b.classList.remove('on'); cur=null; } btn.classList.add('wait');
    load(k).then(function(d){ if(AC.state==='suspended')AC.resume(); var s=AC.createBufferSource(); s.buffer=d; s.connect(AC.destination); s.start(0,Math.max(0,seg[0]-0.02),seg[1]+0.08); btn.classList.remove('wait'); btn.classList.add('on'); cur={s:s,b:btn}; s.onended=function(){ btn.classList.remove('on'); }; },
      function(){ btn.classList.remove('wait'); btn.textContent='✗ not in yet'; }); };
  var row=function(id){ var c=CUES[id]||{name:id,where:''}, kept=ZAUD.KEPT89[id]||[], M=mine(id), V=ZAUD.V89[id], has=ITEMS[id]||{};
    var take=function(k,isNew,words){ var on=M.indexOf(k)>=0, ready=!!has[k];
      return '<span class="s89-k'+(isNew?' new':' kept')+'">'+(ready?'<button class="vbtn s89-play" data-id="'+id+'" data-k="'+k+'">▶ '+KN[k]+'</button>':'<span class="s89-wait" title="'+esc(words||'')+'">'+KN[k]+' — not made yet</span>')+
        '<button class="vbtn s89-v" data-id="'+id+'" data-k="'+k+'" aria-pressed="'+on+'"'+(ready||!isNew?'':' disabled')+'>'+(on?'★':'☆')+'</button></span>'; };
    return '<tr class="s89-r'+(M.length?' done':'')+'" data-id="'+id+'"><td><b>'+esc(c.name)+'</b><br><code>'+id+'</code><div class="sfp-where">'+esc(c.where)+'</div>'+
      '<div class="s89-tag">'+(kept.length?'kept: '+kept.map(function(k){ return KN[k]||k; }).join(', '):'<b>no pick yet — five new takes</b>')+'</div></td>'+
      '<td class="s89-pl">'+kept.map(function(k){ return take(k,false); }).join('')+V.map(function(w,i){ return take('v'+(i+1),true,w); }).join('')+'</td>'+
      '<td class="sfp-w"><details><summary>the new words</summary><ol>'+V.map(function(w){ return '<li>'+esc(w)+'</li>'; }).join('')+'</ol></details></td></tr>'; };
  var count=function(){ return IDS.filter(function(id){ return touched(id); }).length; };
  var section=function(){ var made=IDS.filter(function(id){ return ITEMS[id]&&ITEMS[id].v1; }).length;
    return '<div class="sm-legend s89-lg"><b>Round 89 — new takes for '+IDS.length+' effects.</b> Every effect with fewer than three picks: the takes you <b>kept</b> (★, still picked) and <b>3–5 brand-new takes</b> — each from its own new wording; the takes you didn\'t pick are gone. The '+IDS.filter(function(id){ return !(ZAUD.KEPT89[id]||[]).length; }).length+' with no pick yet come first, with five new takes each. ▶ plays, ☆ picks — <b>up to three</b> in all, your kept ones included (click a ★ to drop it). '+
      (made?made+' of '+IDS.length+' have their new takes in.':'<b>The new takes are not made yet</b> — run <code>.\\tools\\audio\\audio4.ps1</code> (389 takes, about 18,500 ElevenLabs credits); the words for each are under "the new words".')+'</div>'+
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
  var r0=T.render; T.render=function(){ setTimeout(dress,0); setTimeout(dress,400); return LBR.sec('Round 89 — the new takes',IDS.length+' effects · kept ★ + new · ✓ approve when happy')+section()+r0.apply(this,arguments); };
  T.name='Sound effects'; T.blurb='<b>Round 89 — more takes.</b> At the top: every effect with fewer than three picks, its kept takes and 3–5 brand-new ones. Below: the effects already done.';
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.s89-play'); if(b){ play(b.dataset.id,b.dataset.k,b); return; }
    var v=e.target.closest&&e.target.closest('.s89-v'); if(v&&!v.disabled){ var id=v.dataset.id, k=key(id), L=mine(id), i=L.indexOf(v.dataset.k);
      if(i>=0)L.splice(i,1); else { if(L.length>=3)L.shift(); L.push(v.dataset.k); }
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
    '.s89-tag{color:#ffd27a;font-size:12px;margin-top:3px}.s89-r.done td:first-child b{color:#9fd48a}.s89-r.flash{outline:2px solid #6fe3f5}.s89-pl{white-space:normal}.s89-t ol{margin:4px 0 0 16px;padding:0}';
  document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'sfx89',label:'🔊 Pick from the new sound takes ('+IDS.length+' effects)',where:'Sound effects tab · top section',done:function(){ return count()>=IDS.length; },go:function(){ LTODO.goTo('sfxpick','.s89-t',0); }});
})();
