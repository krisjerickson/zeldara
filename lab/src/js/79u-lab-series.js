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
      '<div class="ss-body"><div class="ss-left">'+thumb(sc,S.n,300,'ss-par')+'<div class="ss-stage" data-i="'+i+'"><div class="ss-view"><div class="ss-pic"></div><div class="ss-fx"></div><div class="ss-cap"></div></div><div class="ss-words"></div></div>'+
      '<div class="ss-ctl"><button class="vbtn ss-play" data-i="'+i+'">▶ '+(real?'Play':'Rough cut')+'</button><button class="vbtn ss-full" data-i="'+i+'" title="Full screen, as in the game (Esc to close, Space for the next shot)">⛶ Full screen</button><span class="ss-real">'+(real?real.n.length+' of '+real.count+' painted':'not painted yet')+'</span></div></div>'+
      '<div class="ss-right">'+(S.first&&S.first>S.shots.length?'<p class="ss-trim">✂ Trimmed to your picks: shots '+S.shots.map(function(x){ return x.k; }).join(', ')+' of the first '+S.first+'. ✓ Good if three works, or ✎ say what to change.</p>':'')+'<p class="ss-why">'+esc(S.why)+'</p><table class="tl ss-shots"><thead><tr><th>#</th><th>Shot</th><th>What we see</th><th>In</th><th>Camera</th></tr></thead><tbody>'+
      S.shots.map(function(x,j){ return '<tr><td>'+(j+1)+'</td><td><b>'+esc(LENS[x[1]]||x[1])+'</b>'+(x[0]==='h'?' <span class="ss-h" title="the hero is in it: Zeldor first">Zeldor</span>':'')+'</td><td>'+esc(x[2].replace(/ \(heart-shaped gems.*?\)\)/,')').replace(/ — inside the great hearth.*$/,'').slice(0,240))+'</td><td>'+esc(CUT[x[3]]||x[3])+'</td><td>'+esc(MOVE[x[4]]||x[4])+'</td></tr>'; }).join('')+'</tbody></table>'+
      '<p class="ss-ids">Sheets: '+S.shots.map(function(x,j){ return '<code>'+ZSS.id(S.scene,S.n,x.k||j+1,x[0])+'</code>'; }).join(' ')+'<br>Cut from <code>'+esc(S.parent||'')+'</code> (its first reference) · '+S.shots.length+' pictures</p>'+
      '<div class="ss-pk">'+seg(k)+'<input class="tl-n ss-note" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note — e.g. drop shot 3, add a close-up of…"></div></div></div></article>'; };
  LAB_TABS.push({ id:'series', name:'Shot series',
    blurb:'<b>Round 112d — three shots a frame.</b> Each story frame becomes three pictures cut from the same moment — a wide, an insert, an extreme close-up, a reaction — that the game plays like film: a camera move on each shot and a cut between them. Your cut of the first series is in (nine, three shots each; the storm stays a video); every other frame is planned at three shots.',
    designs:designs,
    render:function(){ setTimeout(bind,0); var tot=0; ZSB.SCENES.forEach(function(s){ tot+=s.beats.length; });
      var h=LBR.sec('The plan','how a picture becomes a series, and how it plays');
      h+='<div class="ss-plan"><div><h5>1 · Cut, don\'t invent</h5><p>Each new picture is requested with the story frame as its <b>first reference</b>: the same place, people, clothes, colours and light — only the camera changes. That keeps a series consistent (the problem Kling never solved: things out of order, new events).</p></div>'+
        '<div><h5>2 · The cinematic toolkit</h5><p>'+Object.keys(LENS).map(function(k){ return '<span class="ss-chip">'+esc(LENS[k])+'</span>'; }).join(' ')+'</p></div>'+
        '<div><h5>3 · How it plays in the game</h5><p>Each shot is held 1.2–2.5 s with one camera move ('+Object.keys(MOVE).map(function(k){ return esc(MOVE[k]); }).join(', ')+'), joined by a cut ('+Object.keys(CUT).map(function(k){ return esc(CUT[k]); }).join(', ')+'). The caption stays across the series; a sound hit lands on every flash. Captions, music and skipping work as now.</p></div>'+
        '<div><h5>4 · Cost and order</h5><p>Three shots a frame (your rule). The first nine: 26 pictures, already painted. Every frame planned below: about '+(tot*3)+' pictures in all — so we go a cut-scene at a time, best first. Zeldara\'s hero shots follow once the look is right.</p><p class="ss-cmd"><code>.\\tools\\sprites\\redo.ps1 -List r112</code><br><small>then <code>python tools/video/series_preview.py</code> puts them in the Lab</small></p></div></div>';
      h+=LBR.sec('The first series — trimmed to three','✓ good · ✎ change (say how) · ✕ skip — ▶ plays it, ⛶ full screen as in the game');
      h+='<div class="ss-tops">'+ZSS.TOP.map(topCard).join('')+'</div>';
      if(ZSS.AUTO&&ZSS.AUTO.length){ var bySc={}, ORDL=[]; ZSS.AUTO.forEach(function(r){ if(!bySc[r.scene]){ bySc[r.scene]=[]; ORDL.push(r.scene); } bySc[r.scene].push(r); });
        var nPic=0; ZSS.AUTO.forEach(function(r){ nPic+=r.shots.length; });
        h+=LBR.sec('The plan for every frame (round 113)',ZSS.AUTO.length+' more frames · three shots each · '+nPic+' pictures (Zeldor first) — one list per cut-scene, made a cut-scene at a time');
        h+='<table class="tl ss-planT"><thead><tr><th>#</th><th>Cut-scene</th><th>Frames</th><th>Pictures</th><th>Painted</th><th>Make it</th></tr></thead><tbody>'+ORDL.map(function(sc,i){ var L=bySc[sc], np=0, got=0; L.forEach(function(r){ np+=r.shots.length; var hs=r.shots.some(function(x){ return x.who==='h'; }), R=SX[sc+'_'+nn(r.n)+'_'+(hs?'zeldor':'all')]; if(R)got+=R.n.length; });
          var S0=scOf(sc); return '<tr><td>'+(i+1)+'</td><td><b>'+esc(S0?S0.name:sc)+'</b></td><td>'+L.length+'</td><td>'+np+'</td><td>'+(got?got+' / '+np:'—')+'</td><td><code>.\\tools\\sprites\\redo.ps1 -List r114_'+nn(i+1)+'_'+sc+'</code></td></tr>'; }).join('')+'</tbody></table>'; }
      h+=LBR.sec('Review a cut-scene — keep 2 or 3 shots of each frame','six shots per frame to choose from · click a shot to keep it (✓), again to drop it · ▶ plays the cut-scene with your kept shots (or all of them), full screen with its words')+REV.html();
      h+=LBR.sec('The patterns','how every other frame is broken down');
      h+='<div class="ss-pats">'+Object.keys(ZSS.PAT).map(function(k){ var p=ZSS.PAT[k]; return '<div><b>'+esc(p.n)+'</b> <small>'+p.sh.length+' shots</small><p>'+esc(p.how)+'</p></div>'; }).join('')+'</div>';
      h+=LBR.sec('Every cut-scene, broken down',ZSB.SCENES.length+' videos · '+tot+' frames · ★ = in the first series');
      ZSB.SCENES.forEach(function(sc){ var n=0; sc.beats.forEach(function(b){ n+=ZSS.plan(sc,b).count; });
        h+='<details class="ss-sc"><summary><b>'+esc(sc.name)+'</b> <small>'+sc.beats.length+' frames → about '+n+' shots · plays: '+esc(sc.plays)+'</small></summary><div class="ss-fr">'+
          sc.beats.map(function(b){ var pl=ZSS.plan(sc,b); return '<div class="ss-f'+(pl.top?' top':'')+'">'+thumb(sc,b.n,176)+'<div><b>'+b.n+'. '+esc(b.title)+(pl.top?' ★':'')+'</b><small>“'+esc(b.cap)+'”</small><p><span class="ss-chip">'+esc(pl.n)+' · '+pl.count+' shots</span> '+esc(pl.top?pl.top.shots.map(function(x){ return LENS[x[1]]; }).join(' → '):(function(){ var A=(ZSS.AUTO||[]).find(function(r){ return r.scene===sc.id&&r.n===b.n; }); return A?A.shots.map(function(x){ return LENS[x.lens]+(x.who==='h'?' (Zeldor)':''); }).join(' → '):pl.how; })())+'</p></div></div>'; }).join('')+'</div></details>'; });
      return h; } });
  // ── round 113d: review every cut-scene's shots (Kris: "It was better last time when I had 6 to 7 to choose from to get down to the right 2 or 3")
  // picks: 'series-<scene>_<nn>' verdict 'keep:1,4,6' (the shot numbers kept)
  var REV={ sc:(function(){ try{ return localStorage.getItem('ss_rev')||'opening'; }catch(e){ return 'opening'; } })(),
    rows:function(sc){ var out=[]; (scOf(sc)||{beats:[]}).beats.forEach(function(b){ var A=(ZSS.AUTO||[]).find(function(r){ return r.scene===sc&&r.n===b.n; }), Tp=ZSS.TOP.find(function(S){ return S.scene===sc&&S.n===b.n; });
        var shots=A?A.shots.map(function(x,j){ return {k:j+1,lens:x.lens,who:x.who}; }):Tp?Tp.shots.map(function(x,j){ return {k:x.k||j+1,lens:x[1],who:x[0],pos:j+1}; }):[];
        var hs=shots.some(function(x){ return x.who==='h'; }), rk=sc+'_'+nn(b.n)+'_'+(hs?'zeldor':'all'); out.push({b:b,shots:shots,rk:rk,R:SX[rk],top:!!Tp}); }); return out; },
    kept:function(sc,n){ var v=V('series-'+sc+'_'+nn(n)); var m=/^keep:([\d,]+)$/.exec(v||''); return m?m[1].split(',').map(Number):[]; },
    html:function(){ var sc=REV.sc, S0=scOf(sc), opts=ZSB.SCENES.map(function(x){ return '<option value="'+x.id+'"'+(x.id===sc?' selected':'')+'>'+esc(x.name)+'</option>'; }).join('');
      var rows=REV.rows(sc), painted=0, total=0; rows.forEach(function(r){ total+=r.shots.length; if(r.R)painted+=r.R.n.length; });
      var h='<div class="rv-bar"><select class="rv-sel">'+opts+'</select> <button class="vbtn rv-play">▶ Play the cut-scene</button> <span class="rv-n">'+painted+' of '+total+' shots painted</span></div><div class="rv-rows">';
      rows.forEach(function(r){ var K=REV.kept(sc,r.b.n), W=150, H=84;
        h+='<div class="rv-row"><div class="rv-f">'+thumb(S0,r.b.n,150)+'<b>'+r.b.n+'. '+esc(r.b.title)+'</b><small>“'+esc(r.b.cap)+'”</small>'+(r.top?'<i>trimmed in round 112</i>':'')+'</div><div class="rv-shots">'+
          (r.shots.length?r.shots.map(function(x,j){ var pos=r.top?j+1:x.k, has=r.R&&r.R.n.indexOf(pos)>=0, on=r.top||K.indexOf(x.k)>=0;
            var bg=has?'background-image:url(preview/series/'+r.rk+'.webp);background-size:'+(r.R.count*W)+'px '+H+'px;background-position:-'+((pos-1)*W)+'px 0':'';
            return '<button class="rv-s'+(on?' on':'')+(has?'':' none')+'" data-sc="'+sc+'" data-n="'+r.b.n+'" data-k="'+x.k+'"'+(r.top?' disabled':'')+'><span style="'+bg+'"></span><em>'+esc(LENS[x.lens]||x.lens)+(x.who==='h'?' · Zeldor':'')+'</em></button>'; }).join(''):'<p class="rv-no">no shots planned</p>')+'</div></div>'; });
      return h+'</div>'; } };
  var revRedraw=function(){ var el=document.querySelector('.rv-bar'); if(!el)return; var box=el.parentNode, tmp=document.createElement('div'); tmp.innerHTML=REV.html(); var a=box.querySelector('.rv-bar'), b=box.querySelector('.rv-rows'); a.replaceWith(tmp.firstChild); b.replaceWith(tmp.firstChild); };
  document.addEventListener('change',function(e){ if(e.target.classList&&e.target.classList.contains('rv-sel')){ REV.sc=e.target.value; try{ localStorage.setItem('ss_rev',REV.sc); }catch(er){} revRedraw(); } });
  document.addEventListener('click',function(e){ var t=e.target.closest&&e.target.closest('.rv-s'); if(t&&!t.disabled){ var sc=t.dataset.sc, n=+t.dataset.n, k=+t.dataset.k, K=REV.kept(sc,n), i=K.indexOf(k); if(i>=0)K.splice(i,1); else K.push(k); K.sort(function(a,b){ return a-b; });
      var key='series-'+sc+'_'+nn(n), p=LabApp.picks[key]=LabApp.picks[key]||{}; p.verdict=K.length?'keep:'+K.join(','):null; LabApp.persist(key); t.classList.toggle('on',K.indexOf(k)>=0); return; }
    if(e.target.closest&&e.target.closest('.rv-play'))reel(REV.sc); });
  // the cut-scene, full screen: each frame's kept shots (all its painted shots if none is kept yet; the frame itself if none is painted)
  var reel=function(sc){ var rows=REV.rows(sc), Q=[]; rows.forEach(function(r){ var K=REV.kept(sc,r.b.n), L=[];
      r.shots.forEach(function(x,j){ var pos=r.top?j+1:x.k; if(r.R&&r.R.n.indexOf(pos)>=0&&(r.top||!K.length||K.indexOf(x.k)>=0))L.push({rk:r.rk,pos:pos,count:r.R.count,lens:x.lens}); });
      if(!L.length)L.push({frame:r.b.n}); L.forEach(function(x,i){ x.cap=i===0?r.b.cap:null; x.span=L.length; x.n=r.b.n; Q.push(x); }); });
    var el=document.getElementById('ss-full'); if(!el){ full(0); closeFull(); el=document.getElementById('ss-full'); }
    el.style.display='block'; try{ if(el.requestFullscreen&&!document.fullscreenElement)el.requestFullscreen().catch(function(){}); }catch(er){}
    var v=el.querySelector('.ssf-view'), pic=v.querySelector('.ss-pic'), fx=v.querySelector('.ss-fx'), wd=el.querySelector('.ssf-words'), nEl=el.querySelector('.ssf-n'), S0=scOf(sc), I=IX[keyOf(S0)];
    var vw=window.innerWidth, vh=window.innerHeight, W=Math.min(vw,vh*0.78*16/9), H=W*9/16; v.style.width=W+'px'; v.style.height=H+'px';
    var tok={}; run.full=tok; FS={id:'full',i:0,view:v,pic:pic,fx:fx,words:wd,n:nEl,dur:2400,reel:true}; var q=0, t0=0, skip=false; FS.next=function(){ skip=true; }; FS.over=false;
    el._go=function(){ reel(sc); };
    var step=function(ts){ if(run.full!==tok)return; var x=Q[q]; if(!t0){ t0=ts;
        if(x.frame){ if(I){ var f=x.frame-1, s2=W/(I.tw-4), rows2=Math.ceil(Math.max.apply(null,I.n)/I.cols); pic.style.backgroundImage='url(preview/storyboards/'+keyOf(S0)+'.webp)'; pic.style.backgroundSize=(I.cols*I.tw*s2)+'px '+(rows2*I.th*s2)+'px'; pic.style.backgroundPosition='-'+(((f%I.cols)*I.tw+2)*s2)+'px -'+((Math.floor(f/I.cols)*I.th+2)*s2)+'px'; } }
        else { pic.style.backgroundImage='url(preview/series/'+x.rk+'.webp)'; pic.style.backgroundSize=(x.count*W)+'px '+H+'px'; pic.style.backgroundPosition='-'+((x.pos-1)*W)+'px 0'; }
        if(x.cap!==null)words(wd,x.cap,Math.min(2,x.span)*2400); fx.style.transition='none'; fx.style.background='#000'; fx.style.opacity=x.cap!==null?0.9:0.35; void fx.offsetWidth; fx.style.transition='opacity .5s'; fx.style.opacity=0;
        nEl.textContent=(S0?S0.name:sc)+' · frame '+x.n+(x.lens?' · '+(LENS[x.lens]||x.lens):x.frame?' · the frame (no shots painted yet)':'')+'   ·   Space: next · Esc: close'; }
      var u=skip?1:Math.min(1,(ts-t0)/2400), e2=u*u*(3-2*u), z=1+0.08*e2; pic.style.transform='translate('+(W/2-W/2*z)+'px,'+(H/2-H/2*z)+'px) scale('+z+')';
      if(u>=1){ skip=false; q++; t0=0; if(q>=Q.length){ nEl.textContent='The end · Space or click: again · Esc: close'; FS.over=true; return; } }
      requestAnimationFrame(step); };
    requestAnimationFrame(step); };
  // ── the animatic: the inline stage, or full screen as in the game (black bars, the picture, its words below) ──
  var run={};
  // the words below the picture, as the game shows them (one by one, then they stay)
  var words=function(el,line,ms){ if(!el)return;      /* round 113 (Kris: "words … come out as phrases, slowly appearing together, but we can have a brief pause before the next phrase") */
    var F=typeof ZSC!=='undefined'&&ZSC.frag?ZSC.frag(String(line||'')):String(line||'').split(/(?<=[,;:.!?…—])\s+/);
    F=F.map(function(f){ return String(f).trim(); }).filter(Boolean); var n=F.length, T=(ms||3800)/1000, step=n>1?Math.max(0.9,(T-1.4)/(n-1)):0;      /* the phrases over the first two shots */
    el.innerHTML=F.map(function(f,j){ return '<span class="ssp" style="animation-delay:'+(0.35+j*step).toFixed(2)+'s">'+esc(f)+'</span>'; }).join(' '); };
  // box: {view, pic, fx, cap (the small shot label, may be null), words, n (the counter, may be null), dur}
  var play=function(i,box,done){ var S=ZSS.TOP[i], sc=scOf(S.scene), b=sc&&sc.beats[S.n-1], pic=box.pic, fx=box.fx, W=box.view.clientWidth, H=box.view.clientHeight;
    var hs=S.shots.some(function(x){ return x[0]==='h'; }), rk=S.scene+'_'+nn(S.n)+'_'+(hs?'zeldor':'all'), R=SX[rk], key=keyOf(sc), I=IX[key];
    var tok={}; run[box.id]=tok; var k=0, t0=0, DUR=box.dur||1900, skip=false; box.next=function(){ skip=true; };
    words(box.words,b?b.cap:'',2*DUR);      /* the line comes out over the first two shots */
    var setPic=function(j){ if(R&&R.n.indexOf(j+1)>=0){ pic.style.backgroundImage='url(preview/series/'+rk+'.webp)'; pic.style.backgroundSize=(R.count*W)+'px '+H+'px'; pic.style.backgroundPosition='-'+(j*W)+'px 0'; pic._real=1; }
      else if(I){ var f=S.n-1, s=W/(I.tw-4), rows=Math.ceil(Math.max.apply(null,I.n)/I.cols); pic.style.backgroundImage='url(preview/storyboards/'+key+'.webp)'; pic.style.backgroundSize=(I.cols*I.tw*s)+'px '+(rows*I.th*s)+'px'; pic.style.backgroundPosition='-'+(((f%I.cols)*I.tw+2)*s)+'px -'+((Math.floor(f/I.cols)*I.th+2)*s)+'px'; pic._real=0; } };
    var flash=function(c){ fx.style.transition='none'; fx.style.background=c; fx.style.opacity=1; void fx.offsetWidth; fx.style.transition='opacity .45s'; fx.style.opacity=0; };
    var step=function(ts){ if(run[box.id]!==tok)return; if(!t0){ t0=ts; var x=S.shots[k]; setPic(k); var lab=(k+1)+' / '+S.shots.length+' · '+(LENS[x[1]]||x[1])+' · '+(MOVE[x[4]]||''); if(box.cap)box.cap.textContent=lab; if(box.n)box.n.textContent=lab+'   ·   Space: next shot · Esc: close';
        if(/flash/.test(x[3]))flash(x[3]==='flashred'?'#ff6030':x[3]==='flashblue'?'#6fe3f5':'#fff'); else if(x[3]==='dip'||x[3]==='fade')flash('#000'); else if(x[3]==='dissolve'){ fx.style.transition='none'; fx.style.background='#05070b'; fx.style.opacity=.6; void fx.offsetWidth; fx.style.transition='opacity .7s'; fx.style.opacity=0; }
        pic.style.filter=x[3]==='whip'?'blur(6px)':''; }
      var x=S.shots[k], u=skip?1:Math.min(1,(ts-t0)/DUR), c=pic._real?[.5,.5,1]:x[5], z=c[2], cx=c[0], cy=c[1], rot=0, sx=0, sy=0, A=W/300;
      if(u>.12)pic.style.filter='';
      var e=u*u*(3-2*u); if(x[4]==='push')z*=1+.14*e; else if(x[4]==='pull')z*=1.14-.14*e; else if(x[4]==='panL')cx+=.06-.12*e; else if(x[4]==='panR'||x[4]==='track')cx+=-.06+.12*e; else if(x[4]==='tiltU'||x[4]==='crane')cy+=.07-.14*e; else if(x[4]==='tiltD')cy+=-.07+.14*e; else if(x[4]==='orbit'){ rot=-2+4*e; z*=1.06; } else if(x[4]==='shake'&&u<.45){ sx=(Math.random()-.5)*10*A*(1-u*2); sy=(Math.random()-.5)*10*A*(1-u*2); }
      z=Math.max(1,z); var tx=W/2-cx*W*z, ty=H/2-cy*H*z; tx=Math.min(0,Math.max(W-W*z,tx)); ty=Math.min(0,Math.max(H-H*z,ty));
      pic.style.transform='translate('+(tx+sx)+'px,'+(ty+sy)+'px) scale('+z+') rotate('+rot+'deg)';
      if(u>=1){ skip=false; k++; t0=0; if(k>=S.shots.length){ if(box.cap)box.cap.textContent='▶ again'; if(box.n)box.n.textContent='The end of the series · Space or click: again · Esc: close'; box.over=true; if(done)done(); return; } }
      requestAnimationFrame(step); };
    box.over=false; requestAnimationFrame(step); };
  var inline=function(i){ var st=document.querySelector('.ss-stage[data-i="'+i+'"]'); if(!st)return null; return {id:'in'+i,view:st.querySelector('.ss-view'),pic:st.querySelector('.ss-pic'),fx:st.querySelector('.ss-fx'),cap:st.querySelector('.ss-cap'),words:st.querySelector('.ss-words')}; };
  // full screen: the game's cut-scene look — black bars top and bottom, the 16:9 picture between, the words in the bottom bar
  var FS=null;
  var full=function(i){ var el=document.getElementById('ss-full'); if(!el){ el=document.createElement('div'); el.id='ss-full';
      el.innerHTML='<div class="ssf-view"><div class="ss-pic"></div><div class="ss-fx"></div></div><div class="ssf-words"></div><div class="ssf-n"></div><div class="ssf-btns"><button class="ssf-prev" title="The series before">◀</button><button class="ssf-next" title="The next series">▶</button><button class="ssf-close" title="Close (Esc)">✕ Close</button></div>';
      document.body.appendChild(el); }
    el.style.display='block'; try{ if(el.requestFullscreen&&!document.fullscreenElement)el.requestFullscreen().catch(function(){}); }catch(e){}
    var go=function(j){ i=(j+ZSS.TOP.length)%ZSS.TOP.length; setTimeout(function(){ var v=el.querySelector('.ssf-view'), vw=window.innerWidth, vh=window.innerHeight, w=Math.min(vw,vh*0.78*16/9); v.style.width=w+'px'; v.style.height=(w*9/16)+'px';
      FS={id:'full',i:i,view:v,pic:v.querySelector('.ss-pic'),fx:v.querySelector('.ss-fx'),words:el.querySelector('.ssf-words'),n:el.querySelector('.ssf-n'),dur:2600}; play(i,FS); },60); };
    el._go=go; go(i); };
  var closeFull=function(){ var el=document.getElementById('ss-full'); if(!el)return; run.full=null; el.style.display='none'; FS=null; try{ if(document.fullscreenElement)document.exitFullscreen(); }catch(e){} };
  document.addEventListener('keydown',function(e){ var el=document.getElementById('ss-full'); if(!el||el.style.display==='none'||!FS)return; e.stopImmediatePropagation(); if(e.key==='Escape'){ closeFull(); }
    else if(e.key===' '||e.key==='Enter'){ e.preventDefault(); if(FS.over)el._go(FS.i); else if(FS.next)FS.next(); } else if(e.key==='ArrowRight'&&!FS.reel){ el._go(FS.i+1); } else if(e.key==='ArrowLeft'&&!FS.reel){ el._go(FS.i-1); } },true);
  document.addEventListener('fullscreenchange',function(){ var el=document.getElementById('ss-full'); if(el&&el.style.display!=='none'&&FS&&!document.fullscreenElement){ /* left the browser's full screen: keep the overlay, re-fit */ el._go(FS.i); } });
  document.addEventListener('click',function(e){ var el=document.getElementById('ss-full'); if(el&&el.style.display!=='none'&&el.contains(e.target)){ var t=e.target.closest('button');
      if(t&&t.classList.contains('ssf-close'))closeFull(); else if(t&&t.classList.contains('ssf-prev'))el._go(FS.i-1); else if(t&&t.classList.contains('ssf-next'))el._go(FS.i+1); else if(FS&&FS.over)el._go(FS.i); else if(FS&&FS.next)FS.next(); return; }
    var f=e.target.closest&&e.target.closest('.ss-full'); if(f){ full(+f.dataset.i); } });
  var bind=function(){ document.querySelectorAll('.ss-stage').forEach(function(st){ if(st._b)return; st._b=1; var i=+st.dataset.i, S=ZSS.TOP[i], sc=scOf(S.scene), b=sc&&sc.beats[S.n-1], I=IX[keyOf(sc)], pic=st.querySelector('.ss-pic'), W=st.querySelector('.ss-view').clientWidth||300;
      if(I){ var f=S.n-1, s=W/(I.tw-4), rows=Math.ceil(Math.max.apply(null,I.n)/I.cols); pic.style.backgroundImage='url(preview/storyboards/'+keyOf(sc)+'.webp)'; pic.style.backgroundSize=(I.cols*I.tw*s)+'px '+(rows*I.th*s)+'px'; pic.style.backgroundPosition='-'+(((f%I.cols)*I.tw+2)*s)+'px -'+((Math.floor(f/I.cols)*I.th+2)*s)+'px'; }
      st.querySelector('.ss-cap').textContent=S.shots.length+' shots — ▶ to play'; var wd=st.querySelector('.ss-words'); if(wd&&b)wd.innerHTML='<span class="on">'+esc(b.cap)+'</span>'; }); };
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.ss-play'); if(b){ var bx=inline(+b.dataset.i); if(bx)play(+b.dataset.i,bx); return; }
    var sg=e.target.closest&&e.target.closest('.ss-seg .ss-sg'); if(!sg)return; var s=sg.parentNode, k=s.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn ss-sg'+(x.dataset.v===nv?' on '+nv:''); }); var a=s.closest('.ss-top'); if(a)a.classList.toggle('on',nv==='pick'); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.ss-note'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.ss-plan{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px}.ss-plan>div{background:#0b121c;border:1px solid #243246;border-radius:9px;padding:8px 12px}.ss-plan h5{margin:2px 0 6px;color:#ffd27a;font:600 13px "Segoe UI"}.ss-plan p{font-size:12.5px;color:#c8d4e4;margin:4px 0}.ss-cmd code{color:#9fe8ff}'+
    '.ss-chip{display:inline-block;margin:1px 2px;font:600 10.5px "Segoe UI";padding:1px 7px;border-radius:8px;background:#22324a;color:#bfe0ff}'+
    '.ss-top{border:1px solid #243246;border-radius:10px;background:#0b121c;margin:10px 0;padding:10px 12px}.ss-top.on{border-color:#2e7a4a}.ss-hd{display:flex;gap:10px;align-items:center}.ss-hd small{display:block;color:#9fb0c8;font-size:12px}.ss-n{width:26px;height:26px;border-radius:50%;background:#1d4a5a;color:#fff;display:flex;align-items:center;justify-content:center;font:700 13px "Segoe UI";flex:none}'+
    '.ss-body{display:flex;gap:14px;flex-wrap:wrap;margin-top:8px}.ss-left{width:300px;flex:none}.ss-right{flex:1;min-width:300px}.ss-th{background:#05070b no-repeat;border-radius:6px;border:1px solid #243246;display:flex;align-items:center;justify-content:center;color:#3a5a7a;font:700 16px "Segoe UI";flex:none}'+
    '.ss-stage{width:300px;margin-top:8px;border-radius:6px;overflow:hidden;border:1px solid #3b5a6a;background:#000}.ss-view{position:relative;width:300px;height:169px;overflow:hidden;background:#05070b}.ss-words{min-height:44px;padding:6px 10px;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:0 .3em;text-align:center;font:italic 600 13px/1.35 Georgia,serif;color:#fff4d8;text-shadow:0 2px 6px #000}.ss-pic{position:absolute;left:0;top:0;width:100%;height:100%;background-repeat:no-repeat;transform-origin:0 0}.ss-fx{position:absolute;inset:0;opacity:0;pointer-events:none}.ss-words span{opacity:0;animation:ssW 1.1s ease forwards}.ss-words span.on{opacity:1;animation:none}@keyframes ssW{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}#ss-full{position:fixed;inset:0;z-index:100000;background:#000;display:none;cursor:pointer}#ss-full .ssf-view{position:absolute;left:50%;top:11vh;transform:translateX(-50%);overflow:hidden;background:#05070b}#ss-full:fullscreen{background:#000}#ss-full .ssf-words{position:absolute;left:0;right:0;bottom:0;height:11vh;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:0 .32em;text-align:center;padding:0 15vw;box-sizing:border-box;font:italic 600 clamp(16px,2vw,23px)/1.3 Georgia,serif;color:#fff4d8;text-shadow:0 2px 8px #000,0 0 3px #000}#ss-full .ssf-words span{opacity:0;animation:ssW 1.1s ease forwards;white-space:nowrap}#ss-full .ssf-n{position:absolute;left:18px;top:4vh;font:600 12px Segoe UI,sans-serif;color:rgba(255,244,216,.6)}#ss-full .ssf-btns{position:absolute;right:18px;top:3vh;display:flex;gap:6px}#ss-full button{font:600 13px Segoe UI,sans-serif;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.4);background:rgba(20,20,26,.7);color:#eee;cursor:pointer}.ss-cap{position:absolute;left:0;right:0;bottom:0;padding:3px 8px;font:600 11px "Segoe UI";color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.75))}'+
    '.ss-ctl{display:flex;gap:8px;align-items:center;margin-top:6px}.ss-real{font-size:11.5px;color:#8aa0b8}.ss-why{font-size:12.5px;color:#ffe6a8;margin:0 0 6px}.ss-trim{font-size:12.5px;color:#8fe8a0;margin:0 0 4px}.ss-shots td{font-size:12px;vertical-align:top}.ss-h{font:600 10px "Segoe UI";padding:0 5px;border-radius:6px;background:#3a5a2a;color:#cff0b0}.ss-planT td{font-size:12.5px}.rv-bar{display:flex;gap:10px;align-items:center;margin:4px 0 10px}.rv-sel{background:#0b121c;color:#e8eef8;border:1px solid #3b5a6a;border-radius:6px;padding:4px 8px;font:13px Segoe UI}.rv-n{font-size:12px;color:#8aa0b8}.rv-row{display:flex;gap:12px;padding:8px;border:1px solid #1e2c40;border-radius:9px;margin:0 0 8px;background:#0b121c}.rv-f{width:150px;flex:none;font-size:12px}.rv-f b{display:block;margin-top:4px;color:#e8eef8}.rv-f small{display:block;color:#9fb0c8}.rv-f i{display:block;color:#8fe8a0;font-style:normal;font-size:11px}.rv-shots{display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start}.rv-s{width:154px;padding:2px;border-radius:7px;border:2px solid #243246;background:#05070b;cursor:pointer;display:flex;flex-direction:column;gap:2px}.rv-s span{display:block;width:150px;height:84px;border-radius:5px;background:#101a28 no-repeat}.rv-s em{font-style:normal;font-size:11px;color:#b8c8dc;text-align:center}.rv-s.on{border-color:#8fe8a0;box-shadow:0 0 0 2px rgba(143,232,160,.25)}.rv-s.on em::before{content:"✓ ";color:#8fe8a0}.rv-s.none span{opacity:.35}.rv-s:disabled{cursor:default}.rv-no{color:#8aa0b8;font-size:12px}.ss-planT code{color:#9fe8ff;font-size:11.5px}.ss-ids{font-size:11px;color:#8aa0b8;word-break:break-all}.ss-ids code{color:#9fe8ff;margin-right:4px}'+
    '.ss-pk{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.ss-pk .tl-n{flex:1;min-width:200px}.ss-sg{padding:3px 8px;font-size:12px;opacity:.75}.ss-sg.on{opacity:1}.ss-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.ss-sg.on.change{background:#6a5a1a;border-color:#ffd84a;color:#fff}.ss-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}'+
    '.ss-pats{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:8px}.ss-pats>div{background:#0b121c;border:1px solid #243246;border-radius:8px;padding:6px 10px;font-size:12.5px}.ss-pats p{margin:3px 0;color:#c8d4e4}.ss-pats small{color:#8aa0b8}'+
    '.ss-sc{border:1px solid #243246;border-radius:9px;margin:6px 0;background:#0b121c}.ss-sc>summary{cursor:pointer;padding:8px 12px}.ss-sc>summary small{color:#9fb0c8}.ss-fr{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:8px;padding:0 10px 10px}.ss-f{display:flex;gap:8px;font-size:12px}.ss-f.top{background:rgba(255,216,74,.06);border-radius:7px}.ss-f small{display:block;color:#9fb0c8}.ss-f p{margin:4px 0;color:#c8d4e4}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('series');
  if(typeof LTODO!=='undefined')LTODO.add({id:'series',label:'🎞 Shot series: the nine, trimmed to three shots — ✓ good or ✕ skip each (▶ / ⛶ to watch)',where:'Shot series tab',done:function(){ return ZSS.TOP.every(function(S){ var v=V('series-'+S.scene+'_'+nn(S.n)); return v==='pick'||v==='cut'; }); },go:function(){ LTODO.goTo('series','.ss-tops',0); }});
})();
