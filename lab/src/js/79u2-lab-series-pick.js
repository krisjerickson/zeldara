// ═══════════════════════════════════════════════════════════════════════
// ║ 79u2-lab-series-pick.js — round 117: SHOT SERIES — PICK (Kris: "are we able to update the shot series now with all the images in? we need
// ║ to make this easier to view and select like in the first 5 cut scenes we developed where i can see the series of images, and then have a
// ║ selector for which ones to keep, and if any need to be rearranged in order").
// ║ One cut-scene at a time (chips along the top): each frame's painted shots side by side, big. Click a shot to keep it; the kept shots carry
// ║ their place in the cut (1, 2, 3…) and ◀ ▶ move a kept shot earlier or later. Below: the whole cut-scene as it will play, in order, and ▶
// ║ plays it full screen with its words. Click 🔍 for a shot at full size.
// ║ Picks: 'series-<scene>_<nn>' verdict 'keep:<k>,<k>,…' in the order they play (the same key the round-113 review used; that one sorted
// ║ them, this one keeps your order), notes on the same key.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof ZSS==='undefined'||typeof ZSB==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var IX=(typeof ZSB_SHEETS!=='undefined'&&ZSB_SHEETS)||{}, SX=(typeof ZSS_SHEETS!=='undefined'&&ZSS_SHEETS)||{}, LENS=ZSS.LENS||{};
  var nn=function(n){ return ('0'+n).slice(-2); }, scOf=function(id){ return ZSB.SCENES.find(function(s){ return s.id===id; }); };
  var keyOf=function(sc){ return ZSB.whos(sc).length>1?sc.id+'_zeldor':sc.id+'_all'; };
  var frame=function(sc,n,W){ var key=keyOf(sc), I=IX[key], H=Math.round(W*9/16); if(!I||!I.n||I.n.indexOf(n)<0)return '<div class="sp-fr sp-none" style="width:'+W+'px;height:'+H+'px">'+n+'</div>';
    var i=n-1, s=W/(I.tw-4), x=(i%I.cols)*I.tw+2, y=Math.floor(i/I.cols)*I.th+2, rows=Math.ceil(Math.max.apply(null,I.n)/I.cols);
    return '<div class="sp-fr" style="width:'+W+'px;height:'+H+'px;background-image:url(preview/storyboards/'+key+'.webp);background-size:'+(I.cols*I.tw*s)+'px '+(rows*I.th*s)+'px;background-position:-'+(x*s)+'px -'+(y*s)+'px"></div>'; };
  // each frame of a cut-scene with its shots (the same rows as round 113's review): {b, shots:[{k,pos,lens,who}], rk, R, top}
  var rows=function(id){ var sc=scOf(id), out=[]; if(!sc)return out; sc.beats.forEach(function(b){ var A=(ZSS.AUTO||[]).find(function(r){ return r.scene===id&&r.n===b.n; }), Tp=(ZSS.TOP||[]).find(function(S){ return S.scene===id&&S.n===b.n; });
      var shots=A?A.shots.map(function(x,j){ return {k:j+1,pos:j+1,lens:x.lens,who:x.who}; }):Tp?Tp.shots.map(function(x,j){ return {k:x.k||j+1,pos:j+1,lens:x[1],who:x[0]}; }):[];
      var hs=shots.some(function(x){ return x.who==='h'; }), rk=id+'_'+nn(b.n)+'_'+(hs?'zeldor':'all'), R=SX[rk];
      shots.forEach(function(x){ x.has=!!(R&&R.n.indexOf(x.pos)>=0); }); out.push({b:b,shots:shots,rk:rk,R:R,top:!!Tp}); }); return out; };
  var key=function(id,n){ return 'series-'+id+'_'+nn(n); };
  var kept=function(id,r){ var m=/^keep:([\d,]+)$/.exec(V(key(id,r.b.n))||''); if(m)return m[1].split(',').map(Number); return r.top?r.shots.map(function(x){ return x.k; }):[]; };
  var setKept=function(id,n,K){ var k=key(id,n), p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=K.length?'keep:'+K.join(','):null; LabApp.persist(k); };
  var shotBg=function(r,x,W){ var H=Math.round(W*9/16); return x.has?'background-image:url(preview/series/'+r.rk+'.webp);background-size:'+(r.R.count*W)+'px '+H+'px;background-position:-'+((x.pos-1)*W)+'px 0':''; };
  var SCN=ZSB.SCENES.filter(function(sc){ return rows(sc.id).some(function(r){ return r.shots.length; }); }).map(function(sc){ return sc.id; });
  var cur=(function(){ try{ var v=localStorage.getItem('sp_scene'); return SCN.indexOf(v)>=0?v:SCN[0]; }catch(e){ return SCN[0]; } })();
  var stat=function(id){ var R=rows(id), fr=0, done=0, painted=0, total=0; R.forEach(function(r){ total+=r.shots.length; var p=r.shots.filter(function(x){ return x.has; }).length; painted+=p; if(p){ fr++; if(/^keep:/.test(V(key(id,r.b.n))||''))done++; } }); return {fr:fr,done:done,painted:painted,total:total}; };
  var html=function(){ var id=cur, sc=scOf(id), R=rows(id), S=stat(id), W=264, H=Math.round(W*9/16);
    var h='<div class="sp-chips">'+SCN.map(function(x){ var s=stat(x), all=s.fr&&s.done===s.fr; return '<button class="sp-chip'+(x===id?' on':'')+(all?' done':'')+'" data-sc="'+x+'">'+esc(scOf(x).name)+' <small>'+s.done+'/'+s.fr+'</small></button>'; }).join('')+'</div>';
    h+='<div class="sp-head"><div><h3>'+esc(sc.name)+'</h3><small>plays: '+esc(sc.plays||'')+' · '+S.painted+' of '+S.total+' shots painted · '+S.done+' of '+S.fr+' frames picked</small></div><button class="vbtn sp-play">▶ Play my cut</button></div>';
    R.forEach(function(r){ if(!r.shots.length)return; var K=kept(id,r), k=key(id,r.b.n), picked=/^keep:/.test(V(k)||'');
      h+='<div class="sp-row'+(picked?' picked':'')+'"><div class="sp-left">'+frame(sc,r.b.n,200)+'<b>'+r.b.n+'. '+esc(r.b.title)+'</b><small>“'+esc(r.b.cap)+'”</small>'+(r.top&&!picked?'<i>your round-112 cut — change it if you like</i>':'')+'<input class="tl-n sp-note" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note on this frame…"></div><div class="sp-shots">'+
        r.shots.map(function(x){ var o=K.indexOf(x.k);
          return '<div class="sp-shot'+(o>=0?' on':'')+(x.has?'':' none')+'" style="width:'+W+'px"><button class="sp-pic" data-sc="'+id+'" data-n="'+r.b.n+'" data-k="'+x.k+'" style="width:'+W+'px;height:'+H+'px;'+shotBg(r,x,W)+'">'+(x.has?'':'<span>not painted yet</span>')+(o>=0?'<em class="sp-ord">'+(o+1)+'</em>':'')+'</button>'+
            '<div class="sp-bar"><span>'+x.k+' · '+esc(LENS[x.lens]||x.lens||'')+(x.who==='h'?' · hero':'')+'</span>'+(o>=0?'<button class="sp-mv" data-d="-1" data-sc="'+id+'" data-n="'+r.b.n+'" data-k="'+x.k+'" title="Play earlier"'+(o===0?' disabled':'')+'>◀</button><button class="sp-mv" data-d="1" data-sc="'+id+'" data-n="'+r.b.n+'" data-k="'+x.k+'" title="Play later"'+(o===K.length-1?' disabled':'')+'>▶</button>':'')+(x.has?'<button class="sp-zoom" data-rk="'+r.rk+'" data-pos="'+x.pos+'" data-c="'+r.R.count+'" title="See it large">🔍</button>':'')+'</div></div>'; }).join('')+'</div></div>'; });
    // the whole cut, in order
    var Q=[]; R.forEach(function(r){ var K=kept(id,r), L=K.map(function(k){ return r.shots.find(function(x){ return x.k===k&&x.has; }); }).filter(Boolean); if(!L.length&&!r.shots.length)Q.push({frame:r.b.n}); L.forEach(function(x){ Q.push({r:r,x:x}); }); });
    h+='<div class="sp-cut"><h4>The cut, in order — '+Q.length+' pictures</h4><div class="sp-strip">'+Q.map(function(q,i){ return q.frame?'<div class="sp-mini">'+frame(sc,q.frame,128)+'<small>'+(i+1)+' · frame '+q.frame+'</small></div>':'<div class="sp-mini"><div class="sp-fr" style="width:128px;height:72px;'+shotBg(q.r,q.x,128)+'"></div><small>'+(i+1)+' · '+q.r.b.n+'.'+q.x.k+'</small></div>'; }).join('')+'</div></div>';
    return '<div id="sp-root">'+h+'</div>'; };
  var redraw=function(){ var el=document.getElementById('sp-root'); if(!el)return; var y=window.scrollY, t=document.createElement('div'); t.innerHTML=html(); el.replaceWith(t.firstChild); window.scrollTo(0,y); };
  // ── play the cut full screen: each picture with a slow push-in, the frame's words under it ──
  var play=function(){ var id=cur, sc=scOf(id), Q=[]; rows(id).forEach(function(r){ var K=kept(id,r), L=K.map(function(k){ return r.shots.find(function(x){ return x.k===k&&x.has; }); }).filter(Boolean);
      if(!L.length&&!r.shots.length)L=[null]; L.forEach(function(x,i){ Q.push({r:r,x:x,cap:i===0?r.b.cap:''}); }); });
    if(!Q.length)return; var el=document.getElementById('sp-full'); if(!el){ el=document.createElement('div'); el.id='sp-full'; el.innerHTML='<div class="spf-v"><div class="spf-p"></div></div><div class="spf-w"></div><div class="spf-n"></div>'; document.body.appendChild(el); }
    var v=el.querySelector('.spf-v'), pic=el.querySelector('.spf-p'), w=el.querySelector('.spf-w'), nEl=el.querySelector('.spf-n'), Wd=Math.min(window.innerWidth,window.innerHeight*0.8*16/9), Hd=Wd*9/16, q=0, t0=0, tok={}, skip=false;
    v.style.width=Wd+'px'; v.style.height=Hd+'px'; el.style.display='flex'; play.tok=tok;
    var close=function(){ el.style.display='none'; play.tok=null; document.removeEventListener('keydown',kd,true); }, kd=function(e){ if(e.key==='Escape'){ e.preventDefault(); close(); } else if(e.key===' '||e.key==='ArrowRight'){ e.preventDefault(); skip=true; } };
    document.addEventListener('keydown',kd,true); el.onclick=function(){ skip=true; };
    var step=function(ts){ if(play.tok!==tok)return; var c=Q[q]; if(!t0){ t0=ts;
        if(c.x){ pic.style.backgroundImage='url(preview/series/'+c.r.rk+'.webp)'; pic.style.backgroundSize=(c.r.R.count*Wd)+'px '+Hd+'px'; pic.style.backgroundPosition='-'+((c.x.pos-1)*Wd)+'px 0'; }
        else { var I=IX[keyOf(sc)]; if(I){ var f=c.r.b.n-1, s2=Wd/(I.tw-4), rr=Math.ceil(Math.max.apply(null,I.n)/I.cols); pic.style.backgroundImage='url(preview/storyboards/'+keyOf(sc)+'.webp)'; pic.style.backgroundSize=(I.cols*I.tw*s2)+'px '+(rr*I.th*s2)+'px'; pic.style.backgroundPosition='-'+(((f%I.cols)*I.tw+2)*s2)+'px -'+((Math.floor(f/I.cols)*I.th+2)*s2)+'px'; } }
        if(c.cap)w.textContent=c.cap; nEl.textContent=sc.name+' · '+(q+1)+' / '+Q.length+' · frame '+c.r.b.n+(c.x?' · shot '+c.x.k:'')+'   ·   Space: next · Esc: close'; }
      var u=skip?1:Math.min(1,(ts-t0)/2600), z=1+0.07*u*u*(3-2*u); pic.style.transform='scale('+z+')';
      if(u>=1){ skip=false; t0=0; q++; if(q>=Q.length){ nEl.textContent='The end · Esc: close'; return; } }
      requestAnimationFrame(step); };
    w.textContent=''; requestAnimationFrame(step); };
  var zoom=function(rk,pos,count){ var el=document.getElementById('sp-big'); if(!el){ el=document.createElement('div'); el.id='sp-big'; el.onclick=function(){ el.style.display='none'; }; document.body.appendChild(el); }
    var Wd=Math.min(window.innerWidth*0.94,window.innerHeight*0.9*16/9), Hd=Wd*9/16; el.innerHTML='<div style="width:'+Wd+'px;height:'+Hd+'px;background:url(preview/series/'+rk+'.webp) -'+((pos-1)*Wd)+'px 0/'+(count*Wd)+'px '+Hd+'px no-repeat;border-radius:8px"></div>'; el.style.display='flex'; };
  document.addEventListener('click',function(e){ var t=e.target.closest&&e.target.closest('#sp-root button, .sp-chip'); if(!t)return;
    if(t.classList.contains('sp-chip')){ cur=t.dataset.sc; try{ localStorage.setItem('sp_scene',cur); }catch(er){} redraw(); window.scrollTo(0,document.getElementById('sp-root').getBoundingClientRect().top+window.scrollY-120); return; }
    if(t.classList.contains('sp-play')){ play(); return; }
    if(t.classList.contains('sp-zoom')){ zoom(t.dataset.rk,+t.dataset.pos,+t.dataset.c); return; }
    var id=t.dataset.sc, n=+t.dataset.n, k=+t.dataset.k, r=rows(id).find(function(x){ return x.b.n===n; }); if(!r)return; var K=kept(id,r).slice(), i=K.indexOf(k);
    if(t.classList.contains('sp-pic')){ if(i>=0)K.splice(i,1); else K.push(k); setKept(id,n,K); redraw(); return; }
    if(t.classList.contains('sp-mv')&&i>=0){ var j=i+(+t.dataset.d); if(j<0||j>=K.length)return; K.splice(i,1); K.splice(j,0,k); setKept(id,n,K); redraw(); return; } });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.sp-note'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  LAB_TABS.push({ id:'serpick', name:'Shot series — pick',
    blurb:'<b>Round 117 — every shot is in. Pick your cut, one cut-scene at a time.</b> Choose a cut-scene along the top. Each frame shows the story picture on the left and its painted shots beside it, large. <b>Click a shot to keep it</b> (click again to drop it): kept shots get their place in the cut (1, 2, 3…), and <b>◀ ▶</b> move one earlier or later. 🔍 shows a shot full size. Underneath, <b>the cut, in order</b>, and <b>▶ Play my cut</b> runs it full screen with its words. Two or three a frame is usually right. Your picks save as you go; a frame you have not touched shows its round-112 cut, if it had one.',
    designs:SCN.map(function(id){ return {id:id,name:scOf(id).name}; }),
    render:function(){ return html(); } });
  var st=document.createElement('style'); st.textContent='.sp-chips{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 12px}.sp-chip{padding:4px 10px;border-radius:14px;border:1px solid #2e4a66;background:#0d1622;color:#cfe8ff;font:600 12.5px "Segoe UI";cursor:pointer}.sp-chip small{color:#8aa0b8;font-weight:400;margin-left:3px}.sp-chip.on{background:#1d3a5a;border-color:#6fe3f5;color:#fff}.sp-chip.done{border-color:#8fe8a0}.sp-chip.done small{color:#8fe8a0}'+
    '.sp-head{display:flex;align-items:center;gap:12px;justify-content:space-between;margin:6px 0 10px}.sp-head h3{margin:0;font:700 20px Georgia,serif;color:#ffe9a8}.sp-head small{color:#9fb0c8}.sp-play{font-size:14px!important;padding:6px 14px!important}'+
    '.sp-row{display:flex;gap:14px;border:1px solid #243246;border-radius:10px;background:#0b121c;padding:10px;margin:8px 0}.sp-row.picked{border-color:#2e7a4a}.sp-left{width:200px;flex:none;display:flex;flex-direction:column;gap:3px}.sp-left b{color:#e8eef6;font-size:13px}.sp-left small{color:#9fb0c8;font-size:12px;font-style:italic}.sp-left i{color:#8fe8a0;font-size:11.5px}.sp-note{width:100%;box-sizing:border-box;font-size:12px;margin-top:4px}'+
    '.sp-fr{border-radius:6px;background:#05070b no-repeat;border:1px solid #243246;flex:none}.sp-none{display:flex;align-items:center;justify-content:center;color:#3a5a7a;font:700 16px "Segoe UI"}.sp-shots{display:flex;flex-wrap:wrap;gap:10px;align-content:flex-start}'+
    '.sp-shot{display:flex;flex-direction:column;gap:3px}.sp-pic{position:relative;border:3px solid #1c2838;border-radius:8px;background:#05070b no-repeat;cursor:pointer;padding:0;opacity:.62;transition:opacity .15s,border-color .15s}.sp-pic:hover{opacity:.9}.sp-shot.on .sp-pic{opacity:1;border-color:#8fe8a0;box-shadow:0 0 0 1px #2e7a4a}.sp-shot.none .sp-pic{cursor:default;opacity:.4}.sp-pic span{color:#6a7a8e;font:12px "Segoe UI"}'+
    '.sp-ord{position:absolute;left:6px;top:6px;width:26px;height:26px;border-radius:50%;background:#1f6a3a;color:#fff;font:700 14px/26px "Segoe UI";font-style:normal;text-align:center;box-shadow:0 1px 4px #000}'+
    '.sp-bar{display:flex;gap:4px;align-items:center;font:12px "Segoe UI";color:#9fb0c8}.sp-bar span{flex:1}.sp-bar button{background:#13202e;border:1px solid #2e4a66;color:#cfe8ff;border-radius:5px;padding:1px 7px;cursor:pointer;font-size:12px}.sp-bar button:disabled{opacity:.3;cursor:default}'+
    '.sp-cut{border:1px dashed #3a5a7a;border-radius:10px;padding:8px 10px;margin:14px 0}.sp-cut h4{margin:0 0 6px;color:#ffe9a8;font:600 14px Georgia,serif}.sp-strip{display:flex;flex-wrap:wrap;gap:6px}.sp-mini{display:flex;flex-direction:column;gap:2px}.sp-mini small{color:#8aa0b8;font-size:11px}'+
    '#sp-full{position:fixed;inset:0;z-index:100200;background:#000;display:none;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:pointer}.spf-v{overflow:hidden;position:relative}.spf-p{position:absolute;inset:0;background-repeat:no-repeat;transform-origin:50% 50%}.spf-w{color:#f2ead8;font:italic 22px/1.4 Georgia,serif;min-height:34px;text-align:center;max-width:80vw}.spf-n{color:#6a7a8e;font:12px "Segoe UI"}'+
    '#sp-big{position:fixed;inset:0;z-index:100200;background:rgba(0,0,0,.9);display:none;align-items:center;justify-content:center;cursor:zoom-out}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('serpick');
  if(typeof LTODO!=='undefined')LTODO.add({id:'serpick',label:'🎞 Shot series — pick: keep 2–3 shots a frame and set their order, one cut-scene at a time',where:'Shot series — pick tab',
    done:function(){ return SCN.every(function(id){ var s=stat(id); return s.done===s.fr; }); },go:function(){ LTODO.goTo('serpick','.sp-chips',0); }});
})();
