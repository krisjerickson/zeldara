// ═══════════════════════════════════════════════════════════════════════
// ║ 79d-lab-audio.js — round 72: MUSIC & SOUND (the proposal, doc 32; the list is ZAUD in src/js/07zau-audio-cues.js).
// ║ Kris: "music and ambiance are going to be new files requests with Suno. we might need to do API requests like we did for painted
// ║ images. Prepare a proposal for this, including all of the music you think we need throughout the game as well as what sounds
// ║ effects, and how to pull this off".
// ║  · The plan card (how the files get made and into the game) — ☆ it if it is right, notes to change it.
// ║  · Every music cue and stinger as a card: where it plays, how long, loop or once, first wave or later, and the words for Suno with a
// ║    Copy button (paste into Suno's "Style of music" box, Instrumental on). ☆ = make it as written; a note to change it.
// ║  · Ambience and effects as a request sheet (they go to a sound-effects model by script; the words are there to check).
// ║ Picks: 'audio-<id>' (au_plan, mu_*, st_*).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZAUD==='undefined')return; LBR.TABS.push('audio');
  var COL={title:'#f2c14e',village:'#9fd48a',realms:'#6fb3e0',sites:'#c8a8ff',fights:'#ff8a6a',endgame:'#ff7a3a',last:'#fff2b0',sting:'#6fe3f5'};
  var A=ZAUD.all(), MU=A.filter(function(c){ return c.kind==='music'; }), REST=A.filter(function(c){ return c.kind!=='music'; }), GN={}; ZAUD.GROUPS.forEach(function(g){ GN[g[0]]=g[1]; });
  var mmss=function(s){ return s<60?s+' s':Math.floor(s/60)+':'+('0'+(s%60)).slice(-2); };
  var TIER={1:['first wave','#7fe08a'],2:['second wave','#ffd27a'],3:['nice to have','#9fb0c8']};
  var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var hash=function(s){ var h=2166136261; for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; };
  // the plan, drawn: two roads into the game
  var plan=function(c,W,H,t){ c.fillStyle='#070b12'; c.fillRect(0,0,W,H); var sc=W/1400;
    var box=function(x,y,w,h,col,t1,t2){ c.fillStyle='rgba(255,255,255,.04)'; c.strokeStyle=col; c.lineWidth=2; c.beginPath(); if(c.roundRect)c.roundRect(x*sc,y*sc,w*sc,h*sc,12*sc); else c.rect(x*sc,y*sc,w*sc,h*sc); c.fill(); c.stroke();
      c.fillStyle=col; c.font='700 '+Math.round(16*sc)+'px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText(t1,(x+w/2)*sc,(y+34)*sc); c.fillStyle='#cfdbea'; c.font=Math.round(14*sc)+'px "Segoe UI",sans-serif'; (t2||[]).forEach(function(l,i){ c.fillText(l,(x+w/2)*sc,(y+60+i*20)*sc); }); };
    var arrow=function(x1,y1,x2,y2,col){ c.strokeStyle=col; c.lineWidth=3*sc; c.setLineDash([10*sc,8*sc]); c.lineDashOffset=-t*30*sc; c.beginPath(); c.moveTo(x1*sc,y1*sc); c.lineTo(x2*sc,y2*sc); c.stroke(); c.setLineDash([]); var a=Math.atan2(y2-y1,x2-x1); c.fillStyle=col; c.beginPath(); c.moveTo(x2*sc,y2*sc); c.lineTo((x2-14*Math.cos(a-0.4))*sc,(y2-14*Math.sin(a-0.4))*sc); c.lineTo((x2-14*Math.cos(a+0.4))*sc,(y2-14*Math.sin(a+0.4))*sc); c.fill(); };
    c.fillStyle='#e8eef8'; c.font='700 '+Math.round(24*sc)+'px Georgia,serif'; c.textAlign='left'; c.fillText('How the sound gets made — two roads into the game',30*sc,42*sc);
    box(30,80,300,150,'#f2c14e','♫ MUSIC — Suno (by hand)',['this Lab: copy the words per cue','Suno app · Instrumental · Pro/Premier','download into audio\\incoming\\<id>']);
    box(30,290,300,150,'#6fe3f5','◌ AMBIENCE + EFFECTS — by script',['audioNN.ps1 · key typed in the window','a sound-effects API (ElevenLabs)','saved into audio\\incoming\\<id>']);
    box(430,170,300,170,'#c8a8ff','⚙ intake (on your PC)',['trim · find the loop · even loudness','Ogg + MP3 · small mono effects','assets/audio/index.json']);
    box(830,170,240,170,'#9fd48a','▶ the game',['music by place, day/night, fight','ambience under it, effects on top','old procedural sound as fall-back']);
    box(1120,170,250,170,'#ffd27a','☆ you check',['Lab → Music & sound plays them','redo any with a note','then the next wave']);
    arrow(330,155,430,230,'#f2c14e'); arrow(330,365,430,290,'#6fe3f5'); arrow(730,255,830,255,'#c8a8ff'); arrow(1070,255,1120,255,'#9fd48a');
    var s=ZAUD.stats(); c.fillStyle='#8aa0b8'; c.font=Math.round(15*sc)+'px "Segoe UI",sans-serif'; c.textAlign='left';
    c.fillText(s.music+' music cues ('+Math.round(s.musicSecs/60)+' min) · '+s.sting+' stingers · '+s.amb+' ambience loops · '+s.sfx+' effects — '+s.t1+' of them in the first wave. Never an unofficial Suno API: it breaks Suno\'s terms and its songs could not be used in a game.',30*sc,(H/sc-24)*sc); };
  // a music cue: a strip of sound — loud and quiet over its length — with a playhead, the loop mark, its facts
  var draw=function(cv,c,W,H,t,full,id){ if(id==='au_plan')return plan(c,W,H,t);
    var q=MU.find(function(x){ return x.id===id; }); if(!q)return; var col=COL[q.group]||'#cfdbea', h=hash(id), N=64, sc=W/420;
    var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#0c1422'); g.addColorStop(1,'#05070b'); c.fillStyle=g; c.fillRect(0,0,W,H);
    c.fillStyle=col; c.fillRect(0,0,W,4*sc); c.fillStyle='#e8eef8'; c.font='700 '+Math.round(17*sc)+'px Georgia,serif'; c.textAlign='left'; c.fillText(q.name.length>40?q.name.slice(0,39)+'…':q.name,14*sc,34*sc);
    c.fillStyle=col; c.font='600 '+Math.round(12*sc)+'px "Segoe UI",sans-serif'; c.fillText((GN[q.group]||'').toUpperCase(),14*sc,54*sc);
    var y0=H*0.42, hh=H*0.32, bw=(W-28*sc)/N, energy=/fight|boss|escape|surtharn|solmyrk|celebration/.test(id)?0.85:/night|old|feast_hall|home|glimpse/.test(id)?0.35:0.6;
    for(var i=0;i<N;i++){ var u=i/N, r=((Math.imul(h^(i*2654435761),1597334677)>>>0)%1000)/1000, shape=q.loop?0.75+0.25*Math.sin(u*Math.PI*4):Math.sin(u*Math.PI)*(id==='mu_credits'?1:0.9)+0.1, a=Math.max(0.08,Math.min(1,shape*energy*(0.6+0.5*r)));
      var x=14*sc+i*bw, ph=((t/Math.max(3,Math.min(q.secs,24)))%1)*N; c.fillStyle=i<ph?col:'rgba(255,255,255,.22)'; c.fillRect(x,y0+hh*(1-a)/2,bw*0.7,hh*a); }
    if(q.loop){ c.strokeStyle=col; c.lineWidth=2*sc; c.beginPath(); c.moveTo(W-14*sc,y0-6*sc); c.lineTo(W-14*sc,y0+hh+6*sc); c.stroke(); c.font=Math.round(16*sc)+'px "Segoe UI Symbol",sans-serif'; c.fillStyle=col; c.textAlign='right'; c.fillText('⟲',W-20*sc,y0-8*sc); }
    var T=TIER[q.tier]||TIER[3], chips=[[mmss(q.secs),'#cfdbea'],[q.loop?'loops':'plays once','#cfdbea'],[T[0],T[1]]].concat(q.bpm?[[q.bpm+' bpm','#8aa0b8']]:[]), x0=14*sc;
    c.font='600 '+Math.round(12*sc)+'px "Segoe UI",sans-serif'; c.textAlign='left'; chips.forEach(function(ch){ var w=c.measureText(ch[0]).width+16*sc; c.strokeStyle=ch[1]; c.lineWidth=1; c.strokeRect(x0+0.5,H-34*sc,w,22*sc); c.fillStyle=ch[1]; c.fillText(ch[0],x0+8*sc,H-18*sc); x0+=w+8*sc; }); };
  LBR.drawers.audio=draw;
  var n=0, cardOf=function(D,w,h){ return LBR.card('audio',D,n++,w,h,''); };
  var copyBox=function(id,txt){ return '<span class="au-req"><textarea readonly rows="3" data-au="'+id+'">'+esc(txt)+'</textarea><button class="vbtn au-copy" data-au="'+id+'">⧉ Copy for Suno</button></span>'; };
  var PLAN={id:'au_plan',name:'The plan — how the sound gets made and into the game',desc:'Music made in Suno by hand (it has no API we may use), ambience and effects by a script like the painted pictures, one intake on your PC, then the game. The whole proposal is in doc 32 (project docs). ☆ if the plan is right; notes to change it.'};
  var musicCards=function(G){ return MU.filter(function(q){ return q.group===G; }).map(function(q){ return cardOf({id:q.id,name:q.name,desc:'<b>Plays:</b> '+esc(q.where)+'<br>'+copyBox(q.id,ZAUD.request(q))},420,230); }).join(''); };
  var sheet=function(){ var rows=ZAUD.GROUPS.filter(function(g){ return REST.some(function(q){ return q.group===g[0]; }); }).map(function(g){ var L=REST.filter(function(q){ return q.group===g[0]; });
      return '<tr class="au-g"><td colspan="5">'+g[1]+' <span>· '+L.length+'</span></td></tr>'+L.map(function(q){ var T=TIER[q.tier]||TIER[3]; return '<tr><td><b>'+esc(q.name)+'</b><br><code>'+q.id+'</code></td><td>'+esc(q.where)+'</td><td>'+(q.secs<1?q.secs+' s':mmss(Math.round(q.secs)))+(q.loop?' ⟲':'')+'</td><td style="color:'+T[1]+'">'+T[0]+'</td><td class="au-w">'+esc(ZAUD.request(q))+'</td></tr>'; }).join(''); }).join('');
    return '<table class="au-t"><thead><tr><th>Sound</th><th>Where</th><th>Length</th><th>Wave</th><th>The words sent</th></tr></thead><tbody>'+rows+'</tbody></table>'; };
  var LEGEND='<div class="sm-legend"><b>Music &amp; sound — the proposal.</b> Today the game makes its few sounds with code (boss drums, hits, a fanfare). This is every sound it would use instead: <b>'+ZAUD.stats().music+' music cues</b>, <b>'+ZAUD.stats().sting+' stingers</b>, <b>'+ZAUD.stats().amb+' ambience loops</b> and <b>'+ZAUD.stats().sfx+' effects</b>. '+
    'Music: copy a cue\'s words into Suno\'s <i>Style of music</i> box with <i>Instrumental</i> on, make it, and download it as <code>audio\\incoming\\&lt;id&gt;.mp3</code> (or .wav). ☆ a cue to make it as written, or write a note to change it. The ambience and effects are sent by a script (the sheet at the bottom); the plan card says how it all comes together.</div>';
  LAB_TABS.push({ id:'audio', name:'Music & sound',
    blurb:'<b>Round 72 — music, ambience and sound effects: the proposal.</b> Every cue with where it plays and the words for Suno (Copy button), the ambience and effects sheet, and the plan. ☆ the plan and the cues you are happy with; notes to change them.',
    designs:[PLAN].concat(MU.map(function(q){ return {id:q.id,name:q.name}; })).map(function(d){ return {id:d.id,name:d.name}; }),
    render:function(){ setTimeout(LBR.bind,0); n=0;
      return LEGEND+LBR.sec('The plan','two roads into the game')+'<div class="br-grid sm-one">'+cardOf(PLAN,1400,460)+'</div>'+
        ['title','village','realms','sites','fights','endgame','last','sting'].map(function(G){ return LBR.sec(GN[G],MU.filter(function(q){ return q.group===G; }).length+' cues')+'<div class="br-grid au-grid">'+musicCards(G)+'</div>'; }).join('')+
        LBR.sec('Ambience and effects — the request sheet','sent by script to a sound-effects model')+sheet(); } });
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('audio');
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.au-copy'); if(!b)return; var ta=document.querySelector('textarea[data-au="'+b.dataset.au+'"]'); if(!ta)return; ta.focus(); ta.select();
    var ok=function(){ b.textContent='✓ Copied'; setTimeout(function(){ b.textContent='⧉ Copy for Suno'; },1500); };
    try{ if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(ta.value).then(ok,function(){ try{ document.execCommand('copy'); ok(); }catch(x){} }); else { document.execCommand('copy'); ok(); } }catch(x){} });
  var st=document.createElement('style'); st.textContent='.au-grid{grid-template-columns:repeat(auto-fill,minmax(340px,1fr))!important}.au-req{display:block;margin-top:6px}.au-req textarea{width:100%;box-sizing:border-box;background:#0a101a;color:#cfdbea;border:1px solid #24364e;border-radius:6px;font:12px/1.4 "Segoe UI",sans-serif;padding:6px;resize:vertical}'+
    '.au-copy{margin-top:4px}.au-t{width:100%;border-collapse:collapse;font:13px/1.45 "Segoe UI",sans-serif;color:#cfdbea;margin:6px 0 30px}.au-t th{text-align:left;color:#8aa0b8;font-weight:600;border-bottom:1px solid #24364e;padding:6px}.au-t td{border-bottom:1px solid #141e2c;padding:6px;vertical-align:top}.au-t code{color:#6fe3f5;font-size:11px}.au-g td{background:#0d1522;color:#f2c14e;font-weight:700;padding-top:12px}.au-g span{color:#8aa0b8;font-weight:400}.au-w{color:#9fb0c8;font-size:12px;max-width:520px}'+
    '@media (max-width:700px){.au-t thead{display:none}.au-t td{display:block;border:0;padding:2px 6px}.au-t tr{display:block;border-bottom:1px solid #24364e;padding:6px 0}}';
  document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'audio',label:'♫ Music & sound — check the plan and the music list',where:'Music & sound tab · the plan, '+MU.length+' music cues and stingers, the effects sheet',done:function(){ return LBR.picked('audio','au_plan'); },go:function(){ LTODO.goTo('audio','.br-grid',0); }});
})();
