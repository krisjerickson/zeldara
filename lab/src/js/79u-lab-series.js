// ═══════════════════════════════════════════════════════════════════════
// ║ 79u-lab-series.js — round 112: SHOT SERIES (Kris: "Instead of videos, let's turn each current image into a series of 3-10 different
// ║ images … Create a place in the lab where you break each video down into its component images, and then describe how you are going to
// ║ request updates for these images to be split into a series of images … try and still create cinematic effects … Start with your top
// ║ 10 ideas to try, we'll do these requests and then update the lab").
// ║  · The plan: the cinematic toolkit, how a series plays in the game, the cost.
// ║  · The first ten: each frame, why it was chosen, its shot list (lens, what we see, the cut in, the camera move), the sheet ids, and a
// ║    rough animatic (▶) — cut from the story frame itself until the painted shots are in (then the real shots, from ZSS_SHEETS).
// ║  · Every cut-scene broken down: all 34 videos, their 259 frames, and the series each frame becomes (pattern, shots, how).
// ║ Data: ZSS (src/js/07zt9b-shot-series.js), ZSB (07zt6). Picks: 'series-<scene>_<nn>' (✓ good / ✎ change / ✕ skip) + a note.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof ZSS==='undefined'||typeof ZSB==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var IX=(typeof ZSB_SHEETS!=='undefined'&&ZSB_SHEETS)||{}, SX=(typeof ZSS_SHEETS!=='undefined'&&ZSS_SHEETS)||{};
  var nn=function(n){ return ('0'+n).slice(-2); };
  var keyOf=function(sc){ return ZSB.whos(sc).length>1?sc.id+'_zeldor':sc.id+'_all'; };
  // a frame's picture, cut from its cut-scene's contact sheet (lab/preview/storyboards/<scene>_<who>.webp)
  var thumb=function(sc,n,W,cls){ var key=keyOf(sc), I=IX[key], H=Math.round(W*9/16); if(!I||!I.n||I.n.indexOf(n)<0)return '<div class="ss-th ss-none '+(cls||'')+'" style="width:'+W+'px;height:'+H+'px">'+n+'</div>';
    var i=n-1, s=W/(I.tw-4), x=(i%I.cols)*I.tw+2, y=Math.floor(i/I.cols)*I.th+2, cols=I.cols, rows=Math.ceil(Math.max.apply(null,I.n)/cols);
    return '<div class="ss-th '+(cls||'')+'" style="width:'+W+'px;height:'+H+'px;background-image:url(preview/storyboards/'+key+'.webp);background-size:'+(cols*I.tw*s)+'px '+(rows*I.th*s)+'px;background-position:-'+(x*s)+'px -'+(y*s)+'px"></div>'; };
  var LENS=ZSS.LENS, CUT=ZSS.CUT, MOVE=ZSS.MOVE;
  var designs=ZSS.TOP.map(function(S){ return {id:S.scene+'_'+nn(S.n),name:'Series: '+S.scene+' '+S.n}; });
  var seg=function(k){ var v=V(k); return '<span class="ss-seg" data-k="'+k+'">'+[['pick','✓ Good'],['change','✎ Change'],['cut','✕ Skip']].map(function(o){ return '<button class="vbtn ss-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'; };
  var scOf=function(id){ return ZSB.SCENES.find(function(s){ return s.id===id; }); };
  var topCard=function(S,i){ var sc=scOf(S.scene), b=sc&&sc.beats[S.n-1], k='series-'+S.scene+'_'+nn(S.n), hs=S.shots.filter(function(x){ return x[0]==='h'; }).length;
    var real=SX[S.scene+'_'+nn(S.n)+'_'+(hs?'zeldor':'all')];
    return '<article class="ss-top'+(V(k)==='pick'?' on':'')+'" data-i="'+i+'"><div class="ss-hd"><span class="ss-n">'+(i+1)+'</span><div><b>'+esc(sc?sc.name:S.scene)+' — frame '+S.n+': '+esc(b?b.title:'')+'</b><small>“'+esc(b?b.cap:'')+'” · plays: '+esc(sc?sc.plays:'')+'</small></div></div>'+
      '<div class="ss-body"><div class="ss-left">'+thumb(sc,S.n,300,'ss-par')+'<div class="ss-stage" data-i="'+i+'"><div class="ss-pic"></div><div class="ss-fx"></div><div class="ss-cap"></div></div>'+
      '<div class="ss-ctl"><button class="vbtn ss-play" data-i="'+i+'">▶ '+(real?'Play the painted shots':'Rough animatic (cut from the frame)')+'</button><span class="ss-real">'+(real?real.n.length+' of '+real.count+' shots painted':'shots not painted yet')+'</span></div></div>'+
      '<div class="ss-right"><p class="ss-why">'+esc(S.why)+'</p><table class="tl ss-shots"><thead><tr><th>#</th><th>Shot</th><th>What we see</th><th>In</th><th>Camera</th></tr></thead><tbody>'+
      S.shots.map(function(x,j){ return '<tr><td>'+(j+1)+'</td><td><b>'+esc(LENS[x[1]]||x[1])+'</b>'+(x[0]==='h'?' <span class="ss-h" title="the hero is in it: Zeldor first">Zeldor</span>':'')+'</td><td>'+esc(x[2].replace(/ \(heart-shaped gems.*?\)\)/,')').replace(/ — inside the great hearth.*$/,'').slice(0,240))+'</td><td>'+esc(CUT[x[3]]||x[3])+'</td><td>'+esc(MOVE[x[4]]||x[4])+'</td></tr>'; }).join('')+'</tbody></table>'+
      '<p class="ss-ids">Sheets: '+S.shots.map(function(x,j){ return '<code>'+ZSS.id(S.scene,S.n,j+1,x[0])+'</code>'; }).join(' ')+'<br>Cut from <code>'+esc(S.parent||'')+'</code> (its first reference) · '+S.shots.length+' pictures</p>'+
      '<div class="ss-pk">'+seg(k)+'<input class="tl-n ss-note" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note — e.g. drop shot 3, add a close-up of…"></div></div></div></article>'; };
  LAB_TABS.push({ id:'series', name:'Shot series',
    blurb:'<b>Round 112 — from videos to shot series.</b> Each story frame becomes 3–10 pictures cut from the same moment — a wide, an insert, an extreme close-up, a reaction — that the game plays like film: a camera move on each shot and a cut between them. The first ten are ordered (63 pictures, Zeldor first); every other frame has its plan below.',
    designs:designs,
    render:function(){ setTimeout(bind,0); var tot=0; ZSB.SCENES.forEach(function(s){ tot+=s.beats.length; });
      var h=LBR.sec('The plan','how a picture becomes a series, and how it plays');
      h+='<div class="ss-plan"><div><h5>1 · Cut, don\'t invent</h5><p>Each new picture is requested with the story frame as its <b>first reference</b>: the same place, people, clothes, colours and light — only the camera changes. That keeps a series consistent (the problem Kling never solved: things out of order, new events).</p></div>'+
        '<div><h5>2 · The cinematic toolkit</h5><p>'+Object.keys(LENS).map(function(k){ return '<span class="ss-chip">'+esc(LENS[k])+'</span>'; }).join(' ')+'</p></div>'+
        '<div><h5>3 · How it plays in the game</h5><p>Each shot is held 1.2–2.5 s with one camera move ('+Object.keys(MOVE).map(function(k){ return esc(MOVE[k]); }).join(', ')+'), joined by a cut ('+Object.keys(CUT).map(function(k){ return esc(CUT[k]); }).join(', ')+'). The caption stays across the series; a sound hit lands on every flash. Captions, music and skipping work as now.</p></div>'+
        '<div><h5>4 · Cost and order</h5><p>The first ten: 63 pictures (Zeldor\'s hero shots only; Zeldara\'s 13 follow once the look is right). Every frame planned below: about '+(tot*4.5|0)+' pictures in all — so we go a cut-scene at a time, best first.</p><p class="ss-cmd"><code>.\\tools\\sprites\\redo.ps1 -List r112</code><br><small>then <code>python tools/video/series_preview.py</code> puts them in the Lab</small></p></div></div>';
      h+=LBR.sec('The first ten to try','✓ good · ✎ change (say how) · ✕ skip — ▶ plays a rough cut of the shot list');
      h+='<div class="ss-tops">'+ZSS.TOP.map(topCard).join('')+'</div>';
      h+=LBR.sec('The patterns','how every other frame is broken down');
      h+='<div class="ss-pats">'+Object.keys(ZSS.PAT).map(function(k){ var p=ZSS.PAT[k]; return '<div><b>'+esc(p.n)+'</b> <small>'+p.sh.length+' shots</small><p>'+esc(p.how)+'</p></div>'; }).join('')+'</div>';
      h+=LBR.sec('Every cut-scene, broken down',ZSB.SCENES.length+' videos · '+tot+' frames · ★ = in the first ten');
      ZSB.SCENES.forEach(function(sc){ var n=0; sc.beats.forEach(function(b){ n+=ZSS.plan(sc,b).count; });
        h+='<details class="ss-sc"><summary><b>'+esc(sc.name)+'</b> <small>'+sc.beats.length+' frames → about '+n+' shots · plays: '+esc(sc.plays)+'</small></summary><div class="ss-fr">'+
          sc.beats.map(function(b){ var pl=ZSS.plan(sc,b); return '<div class="ss-f'+(pl.top?' top':'')+'">'+thumb(sc,b.n,176)+'<div><b>'+b.n+'. '+esc(b.title)+(pl.top?' ★':'')+'</b><small>“'+esc(b.cap)+'”</small><p><span class="ss-chip">'+esc(pl.n)+' · '+pl.count+' shots</span> '+esc(pl.top?pl.top.shots.map(function(x){ return LENS[x[1]]; }).join(' → '):pl.how)+'</p></div></div>'; }).join('')+'</div></details>'; });
      return h; } });
  // ── the animatic ──
  var run={};
  var play=function(i){ var S=ZSS.TOP[i], st=document.querySelector('.ss-stage[data-i="'+i+'"]'); if(!st)return; var sc=scOf(S.scene), pic=st.querySelector('.ss-pic'), fx=st.querySelector('.ss-fx'), cap=st.querySelector('.ss-cap'), W=st.clientWidth, H=st.clientHeight;
    var hs=S.shots.some(function(x){ return x[0]==='h'; }), rk=S.scene+'_'+nn(S.n)+'_'+(hs?'zeldor':'all'), R=SX[rk], key=keyOf(sc), I=IX[key];
    var tok={}; run[i]=tok; var k=0, t0=0, DUR=1900;
    var setPic=function(j){ if(R&&R.n.indexOf(j+1)>=0){ pic.style.backgroundImage='url(preview/series/'+rk+'.webp)'; pic.style.backgroundSize=(R.count*W)+'px '+H+'px'; pic.style.backgroundPosition='-'+(j*W)+'px 0'; pic._real=1; }
      else if(I){ var f=S.n-1, s=W/(I.tw-4), rows=Math.ceil(Math.max.apply(null,I.n)/I.cols); pic.style.backgroundImage='url(preview/storyboards/'+key+'.webp)'; pic.style.backgroundSize=(I.cols*I.tw*s)+'px '+(rows*I.th*s)+'px'; pic.style.backgroundPosition='-'+(((f%I.cols)*I.tw+2)*s)+'px -'+((Math.floor(f/I.cols)*I.th+2)*s)+'px'; pic._real=0; } };
    var flash=function(c){ fx.style.transition='none'; fx.style.background=c; fx.style.opacity=1; void fx.offsetWidth; fx.style.transition='opacity .45s'; fx.style.opacity=0; };
    var step=function(ts){ if(run[i]!==tok)return; if(!t0){ t0=ts; var x=S.shots[k]; setPic(k); cap.textContent=(k+1)+' / '+S.shots.length+' · '+(LENS[x[1]]||x[1])+' · '+(MOVE[x[4]]||'');
        if(/flash/.test(x[3]))flash(x[3]==='flashred'?'#ff6030':x[3]==='flashblue'?'#6fe3f5':'#fff'); else if(x[3]==='dip'||x[3]==='fade')flash('#000'); else if(x[3]==='dissolve'){ fx.style.transition='none'; fx.style.background='#05070b'; fx.style.opacity=.6; void fx.offsetWidth; fx.style.transition='opacity .7s'; fx.style.opacity=0; }
        pic.style.filter=x[3]==='whip'?'blur(6px)':''; }
      var x=S.shots[k], u=Math.min(1,(ts-t0)/DUR), c=pic._real?[.5,.5,1]:x[5], z=c[2], cx=c[0], cy=c[1], rot=0, sx=0, sy=0;
      if(u>.12)pic.style.filter='';
      var e=u*u*(3-2*u); if(x[4]==='push')z*=1+.14*e; else if(x[4]==='pull')z*=1.14-.14*e; else if(x[4]==='panL')cx+=.06-.12*e; else if(x[4]==='panR'||x[4]==='track')cx+=-.06+.12*e; else if(x[4]==='tiltU'||x[4]==='crane')cy+=.07-.14*e; else if(x[4]==='tiltD')cy+=-.07+.14*e; else if(x[4]==='orbit'){ rot=-2+4*e; z*=1.06; } else if(x[4]==='shake'&&u<.45){ sx=(Math.random()-.5)*10*(1-u*2); sy=(Math.random()-.5)*10*(1-u*2); }
      z=Math.max(1,z); var tx=W/2-cx*W*z, ty=H/2-cy*H*z; tx=Math.min(0,Math.max(W-W*z,tx)); ty=Math.min(0,Math.max(H-H*z,ty));
      pic.style.transform='translate('+(tx+sx)+'px,'+(ty+sy)+'px) scale('+z+') rotate('+rot+'deg)';
      if(u>=1){ k++; t0=0; if(k>=S.shots.length){ cap.textContent='▶ again'; return; } }
      requestAnimationFrame(step); };
    requestAnimationFrame(step); };
  var bind=function(){ document.querySelectorAll('.ss-stage').forEach(function(st){ if(st._b)return; st._b=1; var i=+st.dataset.i, S=ZSS.TOP[i], sc=scOf(S.scene), I=IX[keyOf(sc)], pic=st.querySelector('.ss-pic'), W=st.clientWidth||300;
      if(I){ var f=S.n-1, s=W/(I.tw-4), rows=Math.ceil(Math.max.apply(null,I.n)/I.cols); pic.style.backgroundImage='url(preview/storyboards/'+keyOf(sc)+'.webp)'; pic.style.backgroundSize=(I.cols*I.tw*s)+'px '+(rows*I.th*s)+'px'; pic.style.backgroundPosition='-'+(((f%I.cols)*I.tw+2)*s)+'px -'+((Math.floor(f/I.cols)*I.th+2)*s)+'px'; }
      st.querySelector('.ss-cap').textContent=S.shots.length+' shots — ▶ to play'; }); };
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.ss-play'); if(b){ play(+b.dataset.i); return; }
    var sg=e.target.closest&&e.target.closest('.ss-seg .ss-sg'); if(!sg)return; var s=sg.parentNode, k=s.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn ss-sg'+(x.dataset.v===nv?' on '+nv:''); }); var a=s.closest('.ss-top'); if(a)a.classList.toggle('on',nv==='pick'); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.ss-note'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.ss-plan{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px}.ss-plan>div{background:#0b121c;border:1px solid #243246;border-radius:9px;padding:8px 12px}.ss-plan h5{margin:2px 0 6px;color:#ffd27a;font:600 13px "Segoe UI"}.ss-plan p{font-size:12.5px;color:#c8d4e4;margin:4px 0}.ss-cmd code{color:#9fe8ff}'+
    '.ss-chip{display:inline-block;margin:1px 2px;font:600 10.5px "Segoe UI";padding:1px 7px;border-radius:8px;background:#22324a;color:#bfe0ff}'+
    '.ss-top{border:1px solid #243246;border-radius:10px;background:#0b121c;margin:10px 0;padding:10px 12px}.ss-top.on{border-color:#2e7a4a}.ss-hd{display:flex;gap:10px;align-items:center}.ss-hd small{display:block;color:#9fb0c8;font-size:12px}.ss-n{width:26px;height:26px;border-radius:50%;background:#1d4a5a;color:#fff;display:flex;align-items:center;justify-content:center;font:700 13px "Segoe UI";flex:none}'+
    '.ss-body{display:flex;gap:14px;flex-wrap:wrap;margin-top:8px}.ss-left{width:300px;flex:none}.ss-right{flex:1;min-width:300px}.ss-th{background:#05070b no-repeat;border-radius:6px;border:1px solid #243246;display:flex;align-items:center;justify-content:center;color:#3a5a7a;font:700 16px "Segoe UI";flex:none}'+
    '.ss-stage{position:relative;width:300px;height:169px;overflow:hidden;border-radius:6px;margin-top:8px;background:#05070b;border:1px solid #3b5a6a}.ss-pic{position:absolute;left:0;top:0;width:100%;height:100%;background-repeat:no-repeat;transform-origin:0 0}.ss-fx{position:absolute;inset:0;opacity:0;pointer-events:none}.ss-cap{position:absolute;left:0;right:0;bottom:0;padding:3px 8px;font:600 11px "Segoe UI";color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.75))}'+
    '.ss-ctl{display:flex;gap:8px;align-items:center;margin-top:6px}.ss-real{font-size:11.5px;color:#8aa0b8}.ss-why{font-size:12.5px;color:#ffe6a8;margin:0 0 6px}.ss-shots td{font-size:12px;vertical-align:top}.ss-h{font:600 10px "Segoe UI";padding:0 5px;border-radius:6px;background:#3a5a2a;color:#cff0b0}.ss-ids{font-size:11px;color:#8aa0b8;word-break:break-all}.ss-ids code{color:#9fe8ff;margin-right:4px}'+
    '.ss-pk{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.ss-pk .tl-n{flex:1;min-width:200px}.ss-sg{padding:3px 8px;font-size:12px;opacity:.75}.ss-sg.on{opacity:1}.ss-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.ss-sg.on.change{background:#6a5a1a;border-color:#ffd84a;color:#fff}.ss-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}'+
    '.ss-pats{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:8px}.ss-pats>div{background:#0b121c;border:1px solid #243246;border-radius:8px;padding:6px 10px;font-size:12.5px}.ss-pats p{margin:3px 0;color:#c8d4e4}.ss-pats small{color:#8aa0b8}'+
    '.ss-sc{border:1px solid #243246;border-radius:9px;margin:6px 0;background:#0b121c}.ss-sc>summary{cursor:pointer;padding:8px 12px}.ss-sc>summary small{color:#9fb0c8}.ss-fr{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:8px;padding:0 10px 10px}.ss-f{display:flex;gap:8px;font-size:12px}.ss-f.top{background:rgba(255,216,74,.06);border-radius:7px}.ss-f small{display:block;color:#9fb0c8}.ss-f p{margin:4px 0;color:#c8d4e4}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('series');
  if(typeof LTODO!=='undefined')LTODO.add({id:'series',label:'🎞 Shot series: ✓ / ✎ / ✕ the first ten (▶ to see the rough cut), once the pictures are in',where:'Shot series tab',done:function(){ return ZSS.TOP.every(function(S){ return !!V('series-'+S.scene+'_'+nn(S.n)); }); },go:function(){ LTODO.goTo('series','.ss-tops',0); }});
})();
