// ═══════════════════════════════════════════════════════════════════════
// ║ 79t2-lab-villagers-meet.js — round 113b (Kris: "i also want a way to preview the new characters in the lab. load up into the villagers and
// ║ side quests a way to see the updated characters, click on their stories to see their dialogue and other ways to make sure this all
// ║ looks correct").
// ║  · "Meet the villagers": every villager as painted in the game (idle, and talking while they speak), with the personality you picked.
// ║  · Click one: their dialogue in the game's own dialogue box (typed out, with their talking picture) — Tab lines, the shop line, passing
// ║    remarks, the Saga stage lines (1–5) for the arcs — then each of their requests played through from the offer to the reward
// ║    (steps, riddle hints, what the villagers who know say), the lines they say in other people's requests, and checks (every reward
// ║    item exists, every person and place is known, riddles have their hints).
// ║  · ✓ Looks right / ✎ Change and a note per villager: picks 'npcs-v_<id>'.
// ║ The data is the game's own (ZVOICE 21w, ZNPCQ 21x/21x2, in the Lab since this round); the pictures: lab/preview/villagers.webp.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof ZVOICE==='undefined'||typeof ZNPCQ==='undefined')return;
  var T=LAB_TABS.find(function(t){ return t.id==='npcs'; }); if(!T)return;
  var IDX={"cell": 120, "rows": {"oswin": {"r": 0, "n": 3}, "benno": {"r": 1, "n": 3}, "morwen": {"r": 2, "n": 3}, "tilda": {"r": 3, "n": 3}, "garrick": {"r": 4, "n": 3}, "brask": {"r": 5, "n": 3}, "hana": {"r": 6, "n": 3}, "pell": {"r": 7, "n": 3}, "iva": {"r": 8, "n": 3}, "rolf": {"r": 9, "n": 3}, "mira": {"r": 10, "n": 3}, "bram": {"r": 11, "n": 3}, "dunn": {"r": 12, "n": 3}, "vela": {"r": 13, "n": 3}, "runa": {"r": 14, "n": 3}, "tob": {"r": 15, "n": 3}, "nell": {"r": 16, "n": 3}, "hesk": {"r": 17, "n": 3}, "greta": {"r": 18, "n": 3}, "corr": {"r": 19, "n": 3}, "marta": {"r": 20, "n": 3}, "fenwick": {"r": 21, "n": 3}, "ilsa": {"r": 22, "n": 3}, "pip": {"r": 23, "n": 3}, "wren": {"r": 24, "n": 3}, "coral": {"r": 25, "n": 3}, "mael": {"r": 26, "n": 3}, "holt": {"r": 27, "n": 3}, "quill": {"r": 28, "n": 3}, "pia": {"r": 29, "n": 3}, "twin": {"r": 30, "n": 2}, "odin": {"r": 31, "n": 3}, "freya": {"r": 32, "n": 3}}}, esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var SHEET=new Image(); SHEET.src='preview/villagers.webp'; SHEET.onerror=function(){ if(!SHEET._b){ SHEET._b=1; SHEET.src='../lab/preview/villagers.webp'; } };
  var KEYS=Object.keys(ZVOICE.V).concat(['solveig']).filter(function(k,i,a){ return a.indexOf(k)===i; });
  var nameOf=function(k){ var v=ZVOICE.V[k]; return v&&v.who?v.who.replace(/^your twin$/,'Your twin'):(ZNPCQ.NPC[k]||{}).n||k; };
  var draw=function(cx,k,f,W,H){ var R=IDX.rows[k]; cx.clearRect(0,0,W,H); if(!R||!SHEET.complete||!SHEET.naturalWidth){ cx.fillStyle='#22324a'; cx.beginPath(); cx.arc(W/2,H/2,Math.min(W,H)*0.38,0,7); cx.fill(); cx.fillStyle='#ffd27a'; cx.font='700 '+Math.round(H*0.4)+'px Georgia'; cx.textAlign='center'; cx.textBaseline='middle'; cx.fillText(nameOf(k).charAt(0),W/2,H/2+2); return true; }
    var c=IDX.cell, i=Math.min(f,R.n-1); cx.imageSmoothingEnabled=true; cx.drawImage(SHEET,i*c,R.r*c,c,c,0,0,W,H); return true; };
  // the requests each villager gives, and the lines they say in others'
  var mine=function(k){ return ZNPCQ.Q.filter(function(q){ return q.giver===k; }); };
  var cameo=function(k){ var L=[]; ZNPCQ.Q.forEach(function(q){ if(q.giver===k)return; q.steps.forEach(function(st){ if(st.to===k&&st.done)L.push([q.name,'When you bring it',st.done]); if(st.to===k&&st.right)L.push([q.name,'The right answer',st.right]); if(st.wrong&&typeof st.wrong==='object'&&st.wrong[k])L.push([q.name,'When it is not for them',[st.wrong[k]]]); }); if(q.riddle&&q.riddle.knows&&q.riddle.knows[k])L.push([q.name,'If you ask them about the riddle',[q.riddle.knows[k]]]); }); return L; };
  var rw=function(r){ if(!r)return ''; var a=[]; if(r.gold)a.push(r.gold+' gold'); (r.items||[]).forEach(function(x){ var I=ITEMS[x[0]]; a.push((x[1]>1?x[1]+'× ':'')+(I?(I.icon||'')+' '+I.name:'⚠ '+x[0])); }); if(r.f)a.push('a special gift'); return a.join(', '); };
  var checks=function(k){ var out=[], ok=function(b,t){ out.push([!!b,t]); }, v=ZVOICE.V[k];
    if(v)ok((v.talk||[]).length||(v.shop||[]).length||v.stage,'has lines to say ('+((v.talk||[]).length+(v.shop||[]).length+(v.bark||[]).length+(v.stage?Object.keys(v.stage).reduce(function(n,s){ return n+v.stage[s].length; },0):0))+')');
    mine(k).forEach(function(q){ var bad=[]; [q.reward].concat((q.choice||[]).map(function(c){ return c.rw; })).concat(q.steps.map(function(s){ return s.each; })).filter(Boolean).forEach(function(r){ (r.items||[]).forEach(function(x){ if(!ITEMS[x[0]])bad.push(x[0]); }); });
      ok(!bad.length,q.name+': every reward item exists'+(bad.length?' — missing '+bad.join(', '):''));
      q.steps.forEach(function(st,i){ if(st.to)ok(ZNPCQ.NPC[st.to],q.name+' step '+(i+1)+': takes you to '+((ZNPCQ.NPC[st.to]||{}).n||'⚠ '+st.to));
        var at=[st.at].concat((st.items||[]).map(function(it){ return it.at; })).concat(st.pts||[]).filter(Boolean); at.forEach(function(a){ ok(/^(site|woods|shore|harbor):[1-4]$|^village:\w+$|^firefrost$/.test(a),q.name+' step '+(i+1)+': a place the game knows ('+a+')'); }); });
      if(q.riddle){ ok(q.riddle.hints.length>=2,q.name+': the riddle has '+q.riddle.hints.length+' hints'); var hide=(q.steps[q.riddle.step||0]||{}).hide; if(hide)ok(hide<=q.riddle.hints.length,q.name+': its place shows after '+hide+' hints'); ok(q.riddle.knows&&Object.keys(q.riddle.knows).length,q.name+': villagers who know: '+Object.keys(q.riddle.knows||{}).map(nameOf).join(', ')); } });
    return out; };
  // ── the dialogue: the game's own box ──
  var live=null, playing=null;
  var play=function(host,L,k){ if(live)try{ live.close(); }catch(e){} var i=0, tok={}; playing=tok;
    var next=function(){ if(playing!==tok)return; if(i>=L.length){ live=null; host.classList.remove('talk'); return; } var x=L[i++], who=x[0]||nameOf(k), sk=x[2]||k; host.classList.add('talk');
      live=ZDLG.render(host,{style:ZDLG.style,name:who,text:x[1],icon:x[3]||'💬',portrait:IDX.rows[sk]||sk==='solveig'?function(cx,t){ return draw(cx,sk,1+(Math.floor((t||0)*4)%2),96,96); }:null,onClose:function(){ setTimeout(next,120); }}); };
    next(); };
  var lineSet=function(k,kind,stage){ var v=ZVOICE.V[k]; if(!v)return []; if(kind==='stage')return (v.stage&&v.stage[stage])||[]; return v[kind]||[]; };
  var playQuest=function(host,q){ var k=q.giver, L=[], nm=nameOf(k), sys=['','',null,'📜'], add=function(who,t,sk,ic){ L.push([who,t,sk,ic]); };
    q.offer.forEach(function(t){ add(nm,t,k); });
    if(q.riddle)q.riddle.hints.forEach(function(h,i){ add(nm+' (asked again — hint '+(i+1)+')',h,k); });
    if(q.riddle&&q.riddle.knows)Object.keys(q.riddle.knows).forEach(function(w){ add(nameOf(w)+' (who knows)',q.riddle.knows[w],w); });
    q.steps.forEach(function(st,i){ add('Step '+(i+1)+' of '+q.steps.length,(st.sub||st.k)+({fetch:' — Tab to take each one',give:' — from your pack',deliver:'',visit:' — Tab there',chase:' — get close while it rests, Tab',kill:'',relay:' — before the time runs out',tracks:' — follow the marks',choose:''}[st.k]||''),null,'📜');
      if(st.start)st.start.forEach(function(t){ add(nm,t,k); }); (st.items||[]).forEach(function(it){ (it.say||[]).forEach(function(t){ add(nm,t,k); }); });
      if(st.k==='choose'){ (st.ask||[]).forEach(function(t){ add(nameOf(st.to||k),t+'  ['+st.opts.join(' | ')+']',st.to||k); }); (st.right||[]).forEach(function(t){ add(nameOf(st.to||k),t,st.to||k); }); }
      if(st.k==='visit'||st.k==='tracks')(st.found||[]).forEach(function(t){ add('',t,null,'✨'); });
      if(st.k==='deliver'||st.k==='kill'||st.k==='chase'||st.k==='relay'||st.k==='give'||st.k==='fetch')(st.done||[]).forEach(function(t){ add(st.to?nameOf(st.to):nm,t,st.to||k); }); });
    (q.end||[]).forEach(function(t){ add(nm,t,k); });
    add('Reward',q.choice?'Choose: '+q.choice.map(function(c){ return c.t+' ('+rw(c.rw)+')'; }).join('  or  '):rw(q.reward)+(q.riddle?' (less a tenth for each hint you asked for)':''),null,'🎁');
    play(host,L,k); };
  // ── the panel for one villager ──
  var open=function(k){ var el=document.getElementById('vm-panel'); if(!el){ el=document.createElement('div'); el.id='vm-panel'; document.body.appendChild(el); }
    var v=ZVOICE.V[k]||{}, Q=mine(k), C=cameo(k), CH=checks(k), key='npcs-v_'+k, vv=V(key);
    var lines=function(kind,label,stage){ var L=lineSet(k,kind,stage); if(!L.length)return ''; return '<div class="vm-ls"><div class="vm-lh"><b>'+label+'</b> <button class="vbtn vm-play" data-kind="'+kind+'" data-st="'+(stage||'')+'">▶ Hear them</button></div><ol>'+L.map(function(t){ return '<li>'+esc(t)+'</li>'; }).join('')+'</ol></div>'; };
    var h='<div class="vm-card"><button class="vm-x" title="Close (Esc)">✕</button><div class="vm-l"><canvas class="vm-big" width="240" height="240" data-k="'+k+'"></canvas><h3>'+esc(nameOf(k))+'</h3><p class="vm-pick">'+esc(v.pick||'—')+'</p>'+
      '<div class="vm-stage"></div><p class="vm-tip">Click the box (or Space) for the next line, as in the game.</p>'+
      '<div class="vm-ok"><span class="np-seg" data-k="'+key+'">'+[['pick','✓ Looks right'],['change','✎ Change']].map(function(o){ return '<button class="vbtn np-sg'+(vv===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span><input class="tl-n np-n" data-k="'+key+'" value="'+esc(P(key).notes||'')+'" placeholder="What should change…"></div></div><div class="vm-r">';
    h+='<h4>What they say</h4>'+lines('talk','When you Tab them')+lines('shop','As their window opens')+lines('bark','Passing remarks');
    if(v.stage)h+='<div class="vm-ls"><div class="vm-lh"><b>As the Saga moves on</b></div>'+[1,2,3,4,5].map(function(s){ var L=lineSet(k,'stage',s); return L.length?'<div class="vm-st"><span>'+['','Grasslands','Wetlands','Highlands','Ashlands','After the end'][s]+'</span> <button class="vbtn vm-play" data-kind="stage" data-st="'+s+'">▶</button><ol>'+L.map(function(t){ return '<li>'+esc(t)+'</li>'; }).join('')+'</ol></div>':''; }).join('')+'</div>';
    if(!v.talk&&!v.shop&&!v.stage)h+='<p class="vm-none">No voice lines of their own yet (their requests and story lines are below).</p>';
    h+='<h4>Their requests</h4>'+(Q.length?Q.map(function(q,i){ return '<div class="vm-q"><div class="vm-lh"><b>'+(q.riddle?'🧩 ':'')+esc(q.name)+'</b> <button class="vbtn vm-pq" data-i="'+i+'">▶ Play it through</button></div><ol class="vm-steps">'+q.steps.map(function(st){ return '<li><i>'+esc(st.k)+'</i> '+esc(st.sub||'')+'</li>'; }).join('')+'</ol><p class="vm-rw">🎁 '+esc(q.choice?q.choice.map(function(c){ return c.t; }).join(' or '):rw(q.reward))+(q.realm?' · needs '+['','','the Wetlands','the Highlands','the Ashlands'][q.realm]+' open':'')+'</p></div>'; }).join(''):'<p class="vm-none">No request of their own'+(['runa','dunn'].indexOf(k)>=0?' yet — '+(k==='runa'?'hnefatafl at dusk':'the forge-off')+' comes next round (a mini-game)':'')+'.</p>');
    if(C.length)h+='<h4>In other villagers\' requests</h4>'+C.map(function(c,i){ return '<div class="vm-ls"><div class="vm-lh"><b>'+esc(c[0])+'</b> · '+esc(c[1])+' <button class="vbtn vm-pc" data-i="'+i+'">▶</button></div><ol>'+c[2].map(function(t){ return '<li>'+esc(t)+'</li>'; }).join('')+'</ol></div>'; }).join('');
    h+='<h4>Checks</h4><ul class="vm-chk">'+CH.map(function(c){ return '<li class="'+(c[0]?'ok':'bad')+'">'+(c[0]?'✓':'⚠')+' '+esc(c[1])+'</li>'; }).join('')+'</ul></div></div>';
    el.innerHTML=h; el.style.display='flex'; el._k=k; var stg=el.querySelector('.vm-stage');
    el.querySelectorAll('.vm-play').forEach(function(b){ b.onclick=function(){ var L=lineSet(k,b.dataset.kind,+b.dataset.st||null); play(stg,L.map(function(t){ return [null,t,k]; }),k); }; });
    el.querySelectorAll('.vm-pq').forEach(function(b){ b.onclick=function(){ playQuest(stg,Q[+b.dataset.i]); }; });
    el.querySelectorAll('.vm-pc').forEach(function(b){ b.onclick=function(){ play(stg,C[+b.dataset.i][2].map(function(t){ return [null,t,k]; }),k); }; });
    el.querySelector('.vm-x').onclick=close;
    var first=lineSet(k,'talk')[0]||lineSet(k,'shop')[0]||(v.stage&&lineSet(k,'stage',1)[0]); if(first)play(stg,[[null,first,k]],k); };
  var close=function(){ var el=document.getElementById('vm-panel'); if(el){ el.style.display='none'; el.innerHTML=''; } playing=null; live=null; };
  document.addEventListener('keydown',function(e){ var el=document.getElementById('vm-panel'); if(!el||el.style.display!=='flex')return; if(e.key==='Escape'){ close(); e.stopImmediatePropagation(); } else if(e.key===' '&&live){ e.preventDefault(); e.stopImmediatePropagation(); live.next(); } },true);
  document.addEventListener('click',function(e){ var c=e.target.closest&&e.target.closest('.vm-tile'); if(c){ open(c.dataset.k); return; } var bg=e.target.id==='vm-panel'; if(bg)close(); });
  // the tiles: idle, and talking when you hover
  var anim=function(){ var t=Date.now(); document.querySelectorAll('canvas.vm-cv, canvas.vm-big').forEach(function(cv){ var k=cv.dataset.k, hot=cv.matches(':hover')||cv.classList.contains('vm-big')&&document.querySelector('#vm-panel .vm-stage.talk'); draw(cv.getContext('2d'),k,hot?1+(Math.floor(t/260)%2):0,cv.width,cv.height); }); requestAnimationFrame(anim); };
  SHEET.onload=function(){}; requestAnimationFrame(anim);
  var r0=T.render; T.render=function(){ var tiles=KEYS.map(function(k){ var v=ZVOICE.V[k]||{}, q=mine(k).length, key='npcs-v_'+k, vv=V(key), bad=checks(k).filter(function(c){ return !c[0]; }).length;
      return '<button class="vm-tile'+(vv?' '+vv:'')+'" data-k="'+k+'"><canvas class="vm-cv" width="96" height="96" data-k="'+k+'"></canvas><b>'+esc(nameOf(k))+'</b><small>'+esc(v.pick||'')+'</small><i>'+(q?q+' request'+(q>1?'s':''):'')+(bad?' · ⚠ '+bad:'')+(vv==='pick'?' · ✓':vv==='change'?' · ✎':'')+'</i></button>'; }).join('');
    return LBR.sec('Meet the villagers — as built','click one to hear them in the game\'s dialogue box, play their requests through, and check them · ✓ Looks right or ✎ what to change')+'<div class="vm-grid">'+tiles+'</div>'+r0.apply(this,arguments); };
  KEYS.forEach(function(k){ T.designs.push({id:'v_'+k,name:'Villager as built: '+nameOf(k)}); });
  var st=document.createElement('style'); st.textContent='.vm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin:6px 0 18px}.vm-tile{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 6px;border-radius:10px;border:1px solid #243246;background:#0b121c;color:#e8eef8;cursor:pointer;font:inherit}.vm-tile:hover{border-color:#6fe3f5;background:#0f1a28}.vm-tile.pick{border-color:#2e7a4a}.vm-tile.change{border-color:#a08a2a}'+
    '.vm-tile b{font-size:13px}.vm-tile small{font-size:11px;color:#9fb0c8;text-align:center;line-height:1.25}.vm-tile i{font-style:normal;font-size:11px;color:#ffd27a}'+
    '#vm-panel{position:fixed;inset:0;z-index:99990;background:rgba(3,6,12,.82);display:none;align-items:center;justify-content:center;padding:18px}.vm-card{position:relative;display:flex;gap:18px;width:min(1180px,96vw);height:min(860px,92vh);background:#0b121c;border:1px solid #3b5a6a;border-radius:14px;padding:16px;box-sizing:border-box}'+
    '.vm-x{position:absolute;right:10px;top:8px;background:none;border:0;color:#ccd;font-size:20px;cursor:pointer}.vm-l{width:430px;flex:none;display:flex;flex-direction:column;align-items:center}.vm-l h3{margin:4px 0 0;color:#ffe6a8;font:600 20px Cinzel,Georgia,serif}.vm-pick{margin:2px 0 8px;color:#9fe8ff;font-size:13px}'+
    '.vm-stage{position:relative;width:430px;height:190px;border-radius:10px;background:radial-gradient(ellipse at 50% 30%,#1a2840,#05070b);overflow:hidden}.vm-tip{font-size:11px;color:#8aa0b8;margin:4px 0 8px}.vm-ok{display:flex;flex-direction:column;gap:6px;width:100%}'+
    '.vm-r{flex:1;overflow:auto;padding-right:6px}.vm-r h4{margin:12px 0 6px;color:#ffd27a;font:600 13px "Segoe UI";text-transform:uppercase;letter-spacing:.05em}.vm-ls,.vm-q{background:#0f1824;border:1px solid #1e2c40;border-radius:8px;padding:6px 10px;margin:0 0 8px}.vm-lh{display:flex;gap:8px;align-items:center;justify-content:space-between}.vm-lh b{color:#e8eef8;font-size:13px}'+
    '.vm-r ol{margin:4px 0 2px 18px;padding:0;font-size:12.5px;color:#c8d4e4}.vm-r li{margin:2px 0}.vm-st span{color:#9fe8ff;font-size:12px;font-weight:600}.vm-steps i{color:#d8c8ff;font-style:normal;font-size:11px;margin-right:4px}.vm-rw{margin:4px 0 0;color:#8fe8a0;font-size:12.5px}.vm-none{color:#8aa0b8;font-size:12.5px}'+
    '.vm-chk{list-style:none;margin:0;padding:0;font-size:12px}.vm-chk li.ok{color:#8fe8a0}.vm-chk li.bad{color:#ff9a8a}.vm-play,.vm-pq,.vm-pc{padding:2px 8px;font-size:12px}';
  document.head.appendChild(st);
})();
