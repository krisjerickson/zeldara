// ═══════════════════════════════════════════════════════════════════════
// ║ 79w2-lab-vidcompare.js — round 129: CUT-SCENE VIDEO, KLING vs GOOGLE FLOW (Kris: "what about using google flow videos compared to
// ║ using the kling ones?" … "yes, let's setup to compare and contrast the 3"). Three shots of Bram's rescue (Zeldara, part 1), each from
// ║ the same painted start frame and the same words: Kling (cut from the montage it already made), Flow · Omni Flash 1.2 and Flow · Veo 3.1
// ║ Lite (Kris makes them in Flow: video_requests/compare_r129/HOW-TO.txt; tools/video/compare_intake.py brings them in).
// ║ Picks: 'vidcmp-shot<n>' {regions:[best tool], notes}; 'vidcmp-shot<n>_<tool>' {verdict pick|cut}; 'vidcmp-way' {regions:[tool], notes}.
// ═══════════════════════════════════════════════════════════════════════
var VIDCMP={'shot1_kling.mp4':'/_blob/0e104945d43b1d89559db87fa911405e','shot2_kling.mp4':'/_blob/613664a933c4594356f6c32b92a265f6','shot3_kling.mp4':'/_blob/7adcc09c0e6cb63ea38bf1422d8d9e10',
  'shot1_kling.jpg':'/_blob/17214ebee881ff581af0a4229455c971','shot2_kling.jpg':'/_blob/97f9e637c7f715891dfc991fe1577f73','shot3_kling.jpg':'/_blob/798a3e8cb1b25d94de42adfea89d2f2c',
  'shot1_start.jpg':'/_blob/fe9d272af62872f1695b3038c85688b2','shot2_start.jpg':'/_blob/61d72da4f8be771d31d479394ba8343a','shot3_start.jpg':'/_blob/89ca55fa975f262dfae30757f5375f53'};
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, U=function(f){ return VIDCMP[f]||null; };
  var TOOLS=[['kling','Kling 3.0','made from the Bram montage (1080p source, shown at 720p)'],['flow_omni','Flow · Omni Flash 1.2','720p, 4 s, ≈ 12 credits'],['flow_lite','Flow · Veo 3.1 Lite','720p, 4 s, ≈ 10 credits']];
  var SHOTS=[[1,'The cage','Bram rattles the bars, the ash-warden crumbles, Zeldara lifts the rune-key — action and a character close up'],
             [2,'Free','The door swings open, Bram steps out laughing and claps Zeldara on the shoulder — two people touching, a held hammer'],
             [3,'The river wall','The river races, the two stand on the bank, mist drifts — mostly the painted world moving']];
  var FACTS=[['Longest clip','up to 15 s, several shots in one','Omni up to 10 s (15 s on paid plans) · Lite 4, 6 or 8 s'],
             ['Sharpness','up to 1080p','720p · free upscale to 1080p on paid plans · 4K on Ultra'],
             ['Start from our painting','start and end frames','first / last frame, up to 3 reference images'],
             ['Selling the game with the clips in it','Kling\'s own terms (s.4.6): no commercial use without its written permission — putting clips in a game you sell is commercial use','Google claims no ownership of what you make; commercial use is not restricted in the help pages (18+, the US is supported)'],
             ['Cost of our 22 cut-scene clips (≈ 8 s each)','depends on Kling credits per clip','≈ 530 credits with Omni — one month of Google AI Pro (1,000 credits)'],
             ['Scripted by Claude','by hand in Kling\'s site today','Flow is by hand too; the same Omni model is scripted by tools/video/omni.mjs (needs Gemini API billing)']];
  var vid=function(n,t){ var f='shot'+n+'_'+t[0]; var src=U(f+'.mp4');
    return '<figure class="vc-v" data-tool="'+t[0]+'">'+(src?'<video class="vc-vid" data-shot="'+n+'" src="'+src+'" poster="'+(U(f+'.jpg')||'')+'" muted playsinline loop preload="metadata"></video>':'<div class="vc-wait">Waiting for <code>shot'+n+'/'+t[0]+'.mp4</code><br><small>make it in Flow — see HOW-TO.txt</small></div>')+
      '<figcaption><b>'+esc(t[1])+'</b> <small>'+esc(t[2])+'</small>'+(src?'<span class="wl-seg" data-k="vidcmp-shot'+n+'_'+t[0]+'">'+[['pick','✓ Usable'],['cut','✕ Not']].map(function(o){ var v=P('vidcmp-shot'+n+'_'+t[0]).verdict; return '<button class="vbtn wl-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>':'')+'</figcaption></figure>'; };
  var shot=function(s){ var n=s[0], k='vidcmp-shot'+n, best=(P(k).regions||[])[0]||'';
    return '<div class="vc-shot"><div class="vc-h"><h4>Shot '+n+' — '+esc(s[1])+'</h4><span>'+esc(s[2])+'</span><button class="vbtn vc-play" data-shot="'+n+'">▶ Play all three together</button><button class="vbtn vc-half" data-shot="'+n+'">½ speed, as in the game</button></div>'+
      '<div class="vc-row"><figure class="vc-v vc-start"><img src="'+(U('shot'+n+'_start.jpg')||'')+'" alt=""><figcaption><b>The painted start frame</b></figcaption></figure>'+TOOLS.map(function(t){ return vid(n,t); }).join('')+'</div>'+
      '<div class="vc-best">Best of the three: '+TOOLS.map(function(t){ return '<label class="vc-b'+(best===t[0]?' on':'')+'" data-k="'+k+'" data-t="'+t[0]+'"><input type="radio" name="'+k+'"'+(best===t[0]?' checked':'')+'> '+esc(t[1])+'</label>'; }).join('')+
      '<input class="tl-n vc-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note — how many tries each took, what went wrong…"></div></div>'; };
  LAB_TABS.push({ id:'vidcompare', name:'Cut-scene video: Kling vs Flow',
    blurb:'<b>Round 129 — three ways to make a cut-scene shot.</b> The same three shots of Bram\'s rescue, each from the same painted start frame and the same words: <b>Kling</b> (already made), and <b>Google Flow</b> with <b>Omni Flash 1.2</b> and with <b>Veo 3.1 Lite</b> (you make these two in Flow — the folder <code>video_requests\\compare_r129</code> has the start frames, the words to paste and a HOW-TO). ▶ plays the three in step; ½ speed shows them as the game does. Selling the game with clips in it counts as commercial use of the clips — the comparison below says what that means for each.',
    designs:SHOTS.map(function(s){ return {id:'shot'+s[0],name:'Video compare: shot '+s[0]}; }).concat([{id:'way',name:'Video compare: the way from now on'}]),
    render:function(){ var h='', w=(P('vidcmp-way').regions||[])[0]||'';
      h+=LBR.sec('The three shots','');
      h+=SHOTS.map(shot).join('');
      h+=LBR.sec('Side by side — the facts','checked 21 Nov 2026 · not legal advice');
      h+='<table class="r8-tab"><tr><th></th><th>Kling 3.0</th><th>Google Flow (Omni Flash 1.2 / Veo 3.1 Lite)</th></tr>'+FACTS.map(function(f){ return '<tr><td><b>'+esc(f[0])+'</b></td><td>'+esc(f[1])+'</td><td>'+esc(f[2])+'</td></tr>'; }).join('')+'</table>';
      h+=LBR.sec('The way from now on','once you have seen all three');
      h+='<div class="vc-best">'+[['kling','Kling (after Kling confirms commercial use in writing)'],['flow_omni','Flow · Omni Flash 1.2'],['flow_lite','Flow · Veo 3.1 Lite'],['mix','A mix — say which for what']].map(function(t){ return '<label class="vc-b'+(w===t[0]?' on':'')+'" data-k="vidcmp-way" data-t="'+t[0]+'"><input type="radio" name="vidcmp-way"'+(w===t[0]?' checked':'')+'> '+esc(t[1])+'</label>'; }).join('')+'</div>';
      h+='<textarea class="wl-n wl-all" data-k="vidcmp-way" placeholder="Anything about the cut-scene videos…">'+esc(P('vidcmp-way').notes||'')+'</textarea>';
      return h; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'vidcompare',label:'🎬 Cut-scene video: make the two Flow takes of three shots, then pick the best and the way from now on',where:'Cut-scene video: Kling vs Flow tab',
    done:function(){ return !!(P('vidcmp-way').regions||[]).length; },go:function(){ LTODO.goTo('vidcompare','.vc-shot',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('vidcompare')<0)LAB_ACTIVE.unshift('vidcompare');
  document.addEventListener('click',function(e){ var pb=e.target.closest&&e.target.closest('.vc-play,.vc-half'); if(pb){ var n=pb.dataset.shot, half=pb.classList.contains('vc-half'), V=[].slice.call(document.querySelectorAll('.vc-vid[data-shot="'+n+'"]'));
      V.forEach(function(v){ v.pause(); v.currentTime=0; v.playbackRate=half?0.5:1; }); setTimeout(function(){ V.forEach(function(v){ var p=v.play(); if(p&&p.catch)p.catch(function(){}); }); },60); return; }
    var b=e.target.closest&&e.target.closest('.vc-b'); if(b){ var k=b.dataset.k, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict='pick'; p.regions=[b.dataset.t]; LabApp.persist(k);
      [].forEach.call(document.querySelectorAll('.vc-b[data-k="'+k+'"]'),function(x){ x.classList.toggle('on',x===b); }); } });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.vc-n'); if(t){ var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); } });
  var st=document.createElement('style'); st.textContent='.vc-shot{background:#0b121c;border:1px solid #243246;border-radius:10px;padding:10px 12px;margin:0 0 14px}.vc-h{display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;margin-bottom:8px}.vc-h h4{margin:0;color:#ffe9a8;font:600 17px Georgia,serif}.vc-h span{font:12.5px "Segoe UI";color:#9fb0c6;flex:1;min-width:200px}'+
    '.vc-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}@media (max-width:900px){.vc-row{grid-template-columns:repeat(2,minmax(0,1fr))}}.vc-v{margin:0;background:#101a28;border:1px solid #243246;border-radius:8px;overflow:hidden}.vc-v video,.vc-v img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;background:#000}'+
    '.vc-v figcaption{font:12px "Segoe UI";color:#b8c6d8;padding:5px 8px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}.vc-v figcaption b{color:#e8eef6}.vc-v figcaption small{color:#7f90a8;flex:1}.vc-start{opacity:.9}'+
    '.vc-wait{aspect-ratio:16/9;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font:12.5px/1.6 "Segoe UI";color:#8fa0b8;background:repeating-linear-gradient(45deg,#0e1724,#0e1724 10px,#111c2b 10px,#111c2b 20px)}'+
    '.vc-best{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px;font:13px "Segoe UI";color:#c8d4e4}.vc-b{background:#101a28;border:1px solid #243246;border-radius:16px;padding:4px 10px;cursor:pointer}.vc-b input{display:none}.vc-b.on{background:#16301f;border-color:#8fe8a0;color:#fff}.vc-n{flex:1;min-width:240px}';
  document.head.appendChild(st);
})();
