// ═══════════════════════════════════════════════════════════════════════
// ║ 79m3-lab-sfx103.js — round 103: THE SOUND EFFECTS, ONE CLEAR TABLE (Kris: "i'm also confused about which sound effects we are still
// ║ picking. let's remake this part of the lab to better show which ones are complete for picks, and which ones remain"; and "for sound
// ║ effect picks, i want a selection option of "remake all" for ones we need all new options to choose from").
// ║ Every effect sits in one of five groups, in this order:
// ║   1 To pick            — no ★ yet
// ║   2 Remake all         — you asked for five brand-new takes (↻); your ★ keep playing in the game until you pick from the new ones
// ║   3 Picked — next round — your ★ differ from what the game plays; Claude puts them in at the next round
// ║   4 In the game        — the game plays exactly your ★; ✓ Approve when you are happy, or change them
// ║   5 ✓ Approved         — done (folded away)
// ║ ★ as many as you like up to seven: the game takes turns between them. Picks: 'sfx93-<id>' (as before), 'sfxok-<id>' approved,
// ║ 'sfxre-<id>' remake. ZAUD.GAME103 (79m1b) is what the game plays now.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof ZAUD==='undefined'||!ZAUD.GAME103||!ZAUD.KEPT93)return;
  var T=LAB_TABS.find(function(t){ return t.id==='sfxpick'; }); if(!T)return;
  var ITEMS=typeof ZSFX84!=='undefined'&&ZSFX84&&ZSFX84.items||{}, CUES={}; ZAUD.all().forEach(function(c){ if(c.kind==='sfx')CUES[c.id]=c; });
  var KN={cur:'Today',l1:'Rec 1',l2:'Rec 2',l3:'Rec 3',l4:'Rec 4',l5:'Rec 5',l6:'Rec 6',n1:'New 84·1',n2:'New 84·2',e1:'Gentle 1',e2:'Gentle 2',v1:'New 89·1',v2:'New 89·2',v3:'New 89·3',v4:'New 89·4',v5:'New 89·5',w1:'New 93·1',w2:'New 93·2',w3:'New 93·3',w4:'New 93·4',w5:'New 93·5',r1:'Library',r2:'Library 2',y1:'New 118·1',y2:'New 118·2',y3:'New 118·3',y4:'New 118·4',y5:'New 118·5',x1:'New 104·1',x2:'New 104·2',x3:'New 104·3',x4:'New 104·4',x5:'New 104·5'};
  var R118=(ZAUD.REMAKE118&&ZAUD.REMAKE118.items)||{}, REM=Object.assign({},(ZAUD.REMAKE104&&ZAUD.REMAKE104.items)||{},R118), RX=['y1','y2','y3','y4','y5','x1','x2','x3','x4','x5'];      /* round 118: the second remake (79m1d) first */      /* round 104: the remakes' words (79m1c) */
  var MAX=7, IDS=Object.keys(ZAUD.KEPT93).filter(function(id){ return CUES[id]||ITEMS[id]; }).sort();
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var pk=function(k){ var p=LabApp.picks[k]; return p&&p.verdict!==undefined?p.verdict:undefined; };
  var mine=function(id){ var v=pk('sfx93-'+id); if(v!==undefined)return v?String(v).split('+').filter(Boolean):[]; return (ZAUD.KEPT93[id]||[]).slice(); };
  var game=function(id){ var v=ZAUD.GAME103[id]; if(!v)return ['cur']; if(v==='both')return ['e1','e2']; return String(v).split('+').filter(Boolean); };
  var same=function(a,b){ return a.length===b.length&&a.every(function(x){ return b.indexOf(x)>=0; }); };
  var isOk=function(id){ return pk('sfxok-'+id)==='approved'; }, isRe=function(id){ if(pk('sfxre-'+id)==='remake')return true; if(!REM[id])return false; return !mine(id).length; };      /* round 104: an effect being remade stays here until you ★ one of its takes */
  var st=function(id){ if(isRe(id))return 're'; var M=mine(id); if(!M.length)return 'pick'; if(!same(M,game(id)))return 'next'; return isOk(id)?'ok':'game'; };
  var G=[['pick','To pick','no ★ yet — listen and ☆ one or more','#ffb38a'],['re','Remake all','five brand-new takes each (the new words under each effect), made by tools\\audio\\audio6.ps1; your ★ keep playing until you pick','#c9a0ff'],
    ['next','Picked — goes in next round','your ★ differ from what the game plays; they go in at the next round','#ffd27a'],['game','In the game','the game plays exactly your ★ — ✓ Approve, or change them','#7fd7ff'],['ok','✓ Approved','done','#8fe8a0']];
  var GN={}; G.forEach(function(g){ GN[g[0]]=g; });
  // the player (the joined preview files, tools/audio/sfx_preview.py), a piece at a time
  var AC=null, LOAD={}, cur=null;
  var load=function(k){ if(LOAD[k])return LOAD[k]; AC=AC||new (window.AudioContext||window.webkitAudioContext)();
    LOAD[k]=fetch('preview/audio/s84_'+k+'.mp3').then(function(r){ if(!r.ok)throw new Error(r.status); return r.arrayBuffer(); }).then(function(b){ return new Promise(function(ok,no){ AC.decodeAudioData(b,ok,no); }); });
    LOAD[k].catch(function(){ LOAD[k]=null; }); return LOAD[k]; };
  var play=function(id,k,btn){ var seg=ITEMS[id]&&ITEMS[id][k]; if(!seg)return; if(cur){ try{ cur.s.stop(); }catch(e){} if(cur.b)cur.b.classList.remove('on'); cur=null; } btn.classList.add('wait');
    load(k).then(function(d){ if(AC.state==='suspended')AC.resume(); var s=AC.createBufferSource(); s.buffer=d; s.connect(AC.destination); s.start(0,Math.max(0,seg[0]-0.02),seg[1]+0.08); btn.classList.remove('wait'); btn.classList.add('on'); cur={s:s,b:btn}; s.onended=function(){ btn.classList.remove('on'); }; },
      function(){ btn.classList.remove('wait'); btn.textContent='✗ not in yet'; }); };
  // the takes on offer: your ★, what the game plays, the kept ones, then the newest offered until there are five
  var takes=function(id){ var M=mine(id), out=[], seen={}, has=ITEMS[id]||{}, add=function(k){ if(seen[k]||!(has[k]||k==='cur'))return; seen[k]=1; out.push(k); };
    M.forEach(add); RX.forEach(function(k){ if(REM[id])add(k); }); game(id).forEach(add); (ZAUD.KEPT93[id]||[]).forEach(add);
    ['r1','r2','w1','w2','w3','w4','w5','v1','v2','v3','v4','v5','n1','n2','l1','l2','l3','l4','l5','l6','e1','e2'].forEach(function(k){ if(out.length<5&&has[k])add(k); });
    return out; };
  var badge=function(id){ var g=GN[st(id)]; return '<span class="s103-b" style="--c:'+g[3]+'">'+g[1]+'</span>'; };
  var row=function(id){ var c=CUES[id]||{name:id,where:''}, M=mine(id), Gm=game(id), has=ITEMS[id]||{};
    var tk=takes(id).map(function(k){ var on=M.indexOf(k)>=0, ready=!!has[k], ing=Gm.indexOf(k)>=0;
      return '<span class="s103-k'+(on?' on':'')+'">'+(ready?'<button class="vbtn s103-play" data-id="'+id+'" data-k="'+k+'">▶ '+(KN[k]||k)+'</button>':'<span class="s89-wait">'+(KN[k]||k)+'</span>')+
        '<button class="vbtn s103-v" data-id="'+id+'" data-k="'+k+'" aria-pressed="'+on+'">'+(on?'★':'☆')+'</button>'+(ing?'<i class="s103-in" title="the game plays this one now">🎮</i>':'')+'</span>'; }).join('');
    return '<tr class="s103-r" data-id="'+id+'" data-st="'+st(id)+'"><td class="s103-n">'+badge(id)+'<b>'+esc(c.name)+'</b> <code>'+id+'</code><div class="s93-mean">🎯 '+esc((ZAUD.MEAN93||{})[id]||c.where||'')+'</div>'+
      '<div class="s103-g">In the game now: '+(!ZAUD.GAME103[id]&&!has.cur?'nothing yet':Gm.map(function(k){ return KN[k]||k; }).join(' · '))+'</div>'+(REM[id]?'<details class="s104-w"'+(st(id)==='re'?' open':'')+'><summary>✎ the new words (round '+(R118[id]?'118, from your note':'104')+') — '+(R118[id]?['y1','y2','y3','y4','y5']:['x1','x2','x3','x4','x5']).filter(function(k){ return has[k]; }).length+' of 5 made'+((R118[id]?['y1','y2','y3','y4','y5']:['x1','x2','x3','x4','x5']).some(function(k){ return has[k]; })?'':' · waiting for <code>'+(R118[id]?'audio7.ps1':'audio6.ps1')+'</code>')+'</summary><div class="s104-why">'+esc(REM[id].why||'')+' · '+(REM[id].secs||'')+' s</div><ol>'+REM[id].words.map(function(w){ return '<li>'+esc(String(w).replace(/ — game sound effect.*$/,''))+'</li>'; }).join('')+'</ol></details>':'')+'</td><td class="s103-t">'+tk+
      ((REM[id]||isRe(id))?'<div class="s103-cm"><label>💬 If the new takes are still off, say how:</label><textarea class="s103-note" data-id="'+id+'" rows="2" placeholder="e.g. too much like a whistle · too long · I want more sparkle and less boom">'+esc((LabApp.picks['sfxnote-'+id]||{}).notes||'')+'</textarea></div>':'')+'</td>'+      /* round 110 (Kris: "put a comment box for me to tell how if new ones are still off") */
      '<td class="s103-a"><button class="vbtn s103-re" data-id="'+id+'" aria-pressed="'+isRe(id)+'">↻ Remake all</button><button class="vbtn s103-ok" data-id="'+id+'" aria-pressed="'+isOk(id)+'">'+(isOk(id)?'✓ Approved':'✓ Approve')+'</button></td></tr>'; };
  var counts=function(){ var n={}; G.forEach(function(g){ n[g[0]]=0; }); IDS.forEach(function(id){ n[st(id)]++; }); return n; };
  var bar=function(){ var n=counts(); return '<div class="s103-bar">'+G.map(function(g){ return '<button class="s103-chip" data-g="'+g[0]+'" style="--c:'+g[3]+'"><b>'+n[g[0]]+'</b> '+g[1]+'</button>'; }).join('')+'<span class="s103-tot">'+IDS.length+' effects</span></div>'; };
  var section=function(){ var by={}; G.forEach(function(g){ by[g[0]]=[]; }); IDS.forEach(function(id){ by[st(id)].push(id); });
    return '<div class="sm-legend s103-lg"><b>Every sound effect, sorted by what it still needs.</b> ▶ plays a take, ☆ picks it (up to seven — the game takes turns between them), 🎮 marks what the game plays now. '+
      '<b>↻ Remake all</b> when none of the takes will do: five brand-new ones are made for it. <b>✓ Approve</b> when you are happy. Changes go into the game at the next round.</div>'+bar()+
      G.map(function(g){ var L=by[g[0]], open=g[0]!=='ok'; return '<details class="s103-grp" data-g="'+g[0]+'"'+(open&&L.length?' open':'')+'><summary style="--c:'+g[3]+'">'+g[1]+' <b>'+L.length+'</b> <span>'+g[2]+'</span></summary>'+
        (L.length?'<table class="au-t s103-tb"><tbody>'+L.map(row).join('')+'</tbody></table>':'<div class="s103-none">none</div>')+'</details>'; }).join(''); };
  var r0=T.render; T.render=function(){ return LBR.sec('Sound effects — what is left',IDS.length+' effects · '+counts().pick+' to pick · '+counts().re+' to remake')+'<div id="s103">'+section()+'</div>'+
    '<details class="s103-old"><summary>Earlier rounds\' tables (kept for reference)</summary>'+r0.apply(this,arguments)+'</details>'; };
  T.name='Sound effects'; T.blurb='<b>Round 103 — one table.</b> Every effect sorted: to pick, to remake, picked for next round, in the game, approved.';
  // after a change: the row's badge and the counters update in place (the row moves group the next time the tab opens)
  var refresh=function(id){ document.querySelectorAll('.s103-r[data-id="'+id+'"]').forEach(function(tr){ var M=mine(id);
      tr.querySelectorAll('.s103-v').forEach(function(x){ var on=M.indexOf(x.dataset.k)>=0; x.setAttribute('aria-pressed',String(on)); x.textContent=on?'★':'☆'; x.parentNode.classList.toggle('on',on); });
      var b=tr.querySelector('.s103-b'); if(b)b.outerHTML=badge(id); tr.dataset.st=st(id);
      var re=tr.querySelector('.s103-re'); if(re)re.setAttribute('aria-pressed',String(isRe(id))); var ok=tr.querySelector('.s103-ok'); if(ok){ ok.setAttribute('aria-pressed',String(isOk(id))); ok.textContent=isOk(id)?'✓ Approved':'✓ Approve'; } });
    var b2=document.querySelector('.s103-bar'); if(b2)b2.outerHTML=bar(); };
  var set=function(k,v){ var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=v; LabApp.persist(k); };
  document.addEventListener('change',function(e){ var t=e.target; if(!t||!t.classList||!t.classList.contains('s103-note'))return; var k='sfxnote-'+t.dataset.id, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=t.value; p.verdict=t.value?'note':null; LabApp.persist(k); t.classList.add('saved'); setTimeout(function(){ t.classList.remove('saved'); },900); });
  document.addEventListener('click',function(e){ var t=e.target.closest&&e.target.closest('.s103-play,.s103-v,.s103-re,.s103-ok,.s103-chip'); if(!t)return; var id=t.dataset.id;
    if(t.classList.contains('s103-play')){ play(id,t.dataset.k,t); return; }
    if(t.classList.contains('s103-v')){ var L=mine(id), i=L.indexOf(t.dataset.k); if(i>=0)L.splice(i,1); else { if(L.length>=MAX){ t.classList.add('s101-full'); setTimeout(function(){ t.classList.remove('s101-full'); },900); return; } L.push(t.dataset.k); }
      set('sfx93-'+id,L.join('+')); if(L.length&&isRe(id))set('sfxre-'+id,null); refresh(id); return; }
    if(t.classList.contains('s103-re')){ set('sfxre-'+id,isRe(id)?null:'remake'); if(isRe(id)&&isOk(id))set('sfxok-'+id,null); refresh(id); return; }
    if(t.classList.contains('s103-ok')){ set('sfxok-'+id,isOk(id)?null:'approved'); if(isOk(id)&&isRe(id))set('sfxre-'+id,null); refresh(id); return; }
    if(t.classList.contains('s103-chip')){ var d=document.querySelector('.s103-grp[data-g="'+t.dataset.g+'"]'); if(d){ d.open=true; d.scrollIntoView({block:'start',behavior:'smooth'}); } } });
  var css=document.createElement('style'); css.textContent='.s103-bar{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 14px;align-items:center}.s103-chip{background:#121a26;border:1px solid var(--c);color:#e6eef8;border-radius:18px;padding:6px 12px;cursor:pointer;font:13px "Segoe UI",sans-serif}.s103-chip b{color:var(--c);font-size:15px;margin-right:3px}.s103-tot{color:#8aa0b8;font-size:12px}'+
    '.s103-grp{margin:0 0 10px;border:1px solid #243246;border-radius:8px;background:#0d141e}.s103-grp>summary{cursor:pointer;padding:10px 12px;font:600 15px "Segoe UI",sans-serif;color:var(--c);list-style:none}.s103-grp>summary b{background:var(--c);color:#0b1018;border-radius:10px;padding:1px 8px;margin:0 6px;font-size:12px}.s103-grp>summary span{color:#8aa0b8;font-weight:400;font-size:12px}'+
    '.s103-tb{width:100%}.s103-tb td{vertical-align:top;padding:8px 10px;border-top:1px solid #1d2838}.s103-n{width:30%}.s103-a{width:150px;white-space:nowrap}.s103-a .vbtn{display:block;width:100%;margin:0 0 6px}.s103-b{display:inline-block;font:600 10px "Segoe UI",sans-serif;color:#0b1018;background:var(--c);border-radius:8px;padding:1px 7px;margin-right:6px;vertical-align:2px}'+
    '.s103-g{color:#8aa0b8;font-size:11px;margin-top:3px}.s103-k{display:inline-flex;align-items:center;gap:2px;margin:2px 8px 4px 0}.s103-k .vbtn{padding:4px 8px}.s103-k.on .s103-play{border-color:#7fe08a}.s103-v[aria-pressed="true"]{background:#2a5a3a;border-color:#7fe08a;color:#f0fff2}.s103-in{font-style:normal;font-size:12px;margin-left:2px}'+
    '.s103-cm{margin-top:6px}.s103-cm label{display:block;font-size:11px;color:#c9a0ff;margin-bottom:2px}.s103-note{width:100%;box-sizing:border-box;font:12px "Segoe UI",sans-serif;background:#141a26;color:#e8eef8;border:1px solid #4a3a6a;border-radius:6px;padding:4px 6px;resize:vertical}.s103-note.saved{border-color:#8fe8a0}'+
    '.s103-play.on{background:#1d4a5a;border-color:#6fe3f5}.s103-play.wait{opacity:.6}.s103-re[aria-pressed="true"]{background:#4a2f6a;border-color:#c9a0ff;color:#fff}.s103-ok[aria-pressed="true"]{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.s103-none{color:#5f7088;padding:8px 14px}.s104-w{margin-top:6px;font-size:12px;color:#d8c8ff}.s104-w summary{cursor:pointer}.s104-w ol{margin:4px 0 0 18px;padding:0;color:#cfd8e8}.s104-w li{margin:2px 0}.s104-why{color:#8aa0b8;margin:3px 0}.s103-old{margin-top:24px;opacity:.85}.s103-old>summary{cursor:pointer;color:#8aa0b8}';
  document.head.appendChild(css);
  if(typeof LTODO!=='undefined')LTODO.add({id:'sfx103',label:'🔊 Sound effects: '+IDS.length+' effects — pick, remake or approve',where:'Sound effects tab · grouped by what each still needs',done:function(){ var n=counts(); return !n.pick; },go:function(){ LTODO.goTo('sfxpick','#s103',0); }});
  window.SFX103={st:st,mine:mine,game:game,counts:counts,IDS:IDS};
})();
