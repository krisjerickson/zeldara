// ═══════════════════════════════════════════════════════════════════════
// ║ 79c-lab-saga.js — round 72: THE SAGA, END TO END (ZSTORY, src/js/07zst-saga-story.js; doc 31).
// ║ Kris: "a new design lab that articulates each element of the full saga, end-to-end … for me to review for accuracy as well as have it show
// ║ where in the world you learn about each of these during the gameplay, starting from the intro scene all the way to the credits. Have
// ║ multiple options … for when and how you learn this info. Also, have a 2nd section for a "redundancy" check … a back-up option … split into
// ║ where you have a full cut-scene … vs. hints that you get from NPCs or other minor progress".
// ║  · At a glance: the 27 story elements in order on two lanes — cut-scenes and hints — with your picked way (or the first) and its back-up.
// ║  · Section 1: each element — what is true (☆ / notes to correct it), then the ways you could learn it, each on a map of Runeheim.
// ║  · Section 2: the redundancy check — a back-up way for each, in case the first is missed.
// ║ Picks: 'storymap-<id>' (sm_t_<beat> the truth, sm_o_<beat>_<a|b|c> a way, sm_b_<beat>_<x|y> a back-up).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZSTORY==='undefined')return; LBR.TABS.push('storymap');
  var S=ZSTORY, BE=S.BEATS, AB='abcdefgh', XY='xy', IMG={}, CUT='#f2c14e', HINT='#6fe3f5', BAK='#c8a8ff';
  var load=function(src){ if(IMG[src])return IMG[src]; var im=new Image(); im.onerror=function(){ if(!im._b){ im._b=1; im.src='../'+src; } }; im.src=src; IMG[src]=im; return im; };
  var R=function(){ return (typeof ZSCN_META!=='undefined'&&ZSCN_META.rooms)||{}; };
  var picked=function(id){ return LBR.picked('storymap',id); };
  var primary=function(b){ for(var i=0;i<b.opts.length;i++)if(picked('sm_o_'+b.id+'_'+AB[i]))return i; return 0; };
  var backup=function(b){ for(var i=0;i<b.bak.length;i++)if(picked('sm_b_'+b.id+'_'+XY[i]))return i; return 0; };
  var ICON={cut:'🎬',hint:'💬'}, KIND={cut:'Cut-scene',hint:'Hint'}, ST={built:['in the game','#7fe08a'],partly:['partly built','#ffd27a'],planned:['to build','#ff9a8a']};
  // a schematic Runeheim: the four realms round the village and the lake, the sea with Muspelheim and the forges, the sky above
  var map=function(c,W,H,locs){ c.fillStyle='#0b2a3a'; c.fillRect(0,0,W,H); var g=c.createLinearGradient(0,0,0,H*0.16); g.addColorStop(0,'#2a3a6a'); g.addColorStop(1,'rgba(11,42,58,0)'); c.fillStyle=g; c.fillRect(0,0,W,H*0.16);
    var x0=W*0.16, y0=H*0.14, w=W*0.72, h=H*0.78, R4=[['#4f8a3a',0.5,0,1,0.5],['#3f6a52',0.5,0.5,1,1],['#7a6a58',0,0.5,0.5,1],['#4a3a36',0,0,0.5,0.5]];
    c.save(); c.beginPath(); if(c.roundRect)c.roundRect(x0,y0,w,h,40); else c.rect(x0,y0,w,h); c.clip(); R4.forEach(function(q){ c.fillStyle=q[0]; c.fillRect(x0+w*q[1],y0+h*q[2],w*(q[3]-q[1]),h*(q[4]-q[2])); }); c.restore();
    c.strokeStyle='rgba(255,255,255,.25)'; c.lineWidth=1; c.beginPath(); if(c.roundRect)c.roundRect(x0,y0,w,h,40); else c.rect(x0,y0,w,h); c.stroke();
    var P=function(k){ var L=S.LOC[k]; return L?[L[0]*W,L[1]*H]:[W/2,H/2]; };
    c.fillStyle='#2a6a8a'; c.beginPath(); c.ellipse(W*0.6,H*0.64,W*0.06,H*0.06,0,0,Math.PI*2); c.fill();      // Mirror Lake
    c.fillStyle='#e8d8a8'; c.beginPath(); c.arc(W*0.5,H*0.5,Math.max(4,W*0.018),0,Math.PI*2); c.fill();      // the village
    c.fillStyle='#5a2a1a'; c.beginPath(); c.arc(W*0.07,H*0.1,W*0.03,0,Math.PI*2); c.fill(); c.fillStyle='#ff7a3a'; c.beginPath(); c.arc(W*0.07,H*0.1,W*0.01,0,Math.PI*2); c.fill();      // Muspelheim
    [[0.09,0.36],[0.09,0.5],[0.09,0.64],[0.06,0.78]].forEach(function(f){ c.fillStyle='#4a2418'; c.beginPath(); c.arc(W*f[0],H*f[1],W*0.012,0,Math.PI*2); c.fill(); });      // the forges
    c.fillStyle='rgba(255,255,255,.55)'; c.font='600 '+Math.round(W/34)+'px "Segoe UI",sans-serif'; c.textAlign='center';
    [['Grasslands',0.74,0.2],['Wetlands',0.74,0.88],['Highlands',0.26,0.88],['Ashlands',0.26,0.2]].forEach(function(t){ c.fillText(t[0],W*t[1],H*t[2]); });
    (locs||[]).forEach(function(L){ var p=P(L.loc), col=L.col, r=Math.max(9,W*0.035); c.fillStyle=col; c.globalAlpha=0.25; c.beginPath(); c.arc(p[0],p[1],r*1.9,0,Math.PI*2); c.fill(); c.globalAlpha=1;
      c.beginPath(); c.arc(p[0],p[1],r,0,Math.PI*2); c.fill(); c.strokeStyle='#081018'; c.lineWidth=2; c.stroke(); c.font=Math.round(r*1.1)+'px "Segoe UI Emoji",sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle='#000'; c.fillText(L.ic,p[0],p[1]+1); c.textBaseline='alphabetic'; }); };
  var optOf=function(id){ var m=/^sm_([ob])_(.+)_([a-z])$/.exec(id); if(!m)return null; var b=BE.find(function(x){ return x.id===m[2]; }); if(!b)return null; var L=m[1]==='o'?b.opts:b.bak, i=(m[1]==='o'?AB:XY).indexOf(m[3]); return {b:b,o:L[i],bak:m[1]==='b'}; };
  // the drawers
  var draw=function(cv,c,W,H,t,full,id){
    if(id==='sm_overview'){ var k='ov'+W+BE.map(function(b){ return primary(b)+''+backup(b); }).join(''); if(cv._done===k&&!full)return; cv._done=k; c.fillStyle='#070b12'; c.fillRect(0,0,W,H);
      var n=BE.length, x0=150, dx=(W-x0-20)/n, lanes=[['🎬 Cut-scenes',CUT,0.53],['💬 Hints',HINT,0.7],['⟲ Back-ups',BAK,0.86]];
      lanes.forEach(function(L){ c.fillStyle='rgba(255,255,255,.04)'; c.fillRect(x0-6,H*L[2]-22,W-x0,44); c.fillStyle=L[1]; c.font='600 15px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText(L[0],12,H*L[2]+5); });
      var act=-1; BE.forEach(function(b,i){ var x=x0+dx*(i+0.5); if(b.act!==act){ act=b.act; c.strokeStyle='rgba(255,255,255,.18)'; c.beginPath(); c.moveTo(x-dx/2,24); c.lineTo(x-dx/2,H-6); c.stroke(); c.fillStyle='#cfe0f4'; c.font='700 13px Georgia,serif'; c.textAlign='left'; c.fillText(S.ACTS[act][0]+' · '+S.ACTS[act][1],x-dx/2+5,16); }
        var o=b.opts[primary(b)], bk=b.bak[backup(b)], ly=o.kind==='cut'?0.53:0.7; c.fillStyle=o.kind==='cut'?CUT:HINT; c.beginPath(); c.arc(x,H*ly,9,0,Math.PI*2); c.fill(); if(o.st!=='built'){ c.strokeStyle='#ff9a8a'; c.lineWidth=2.5; c.stroke(); }
        if(bk){ c.fillStyle=BAK; c.beginPath(); c.arc(x,H*0.86,7,0,Math.PI*2); c.fill(); if(bk.st!=='built'){ c.strokeStyle='#ff9a8a'; c.lineWidth=2; c.stroke(); } }
        c.save(); c.translate(x-2,H*0.44); c.rotate(-Math.PI/3.2); c.fillStyle='rgba(230,236,245,.75)'; c.font='11px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText(b.title.length>22?b.title.slice(0,21)+'…':b.title,0,0); c.restore(); });
      c.fillStyle='#8aa0b8'; c.font='12px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText('filled = in the game · red ring = still to build · each column: your ☆ way (or the first) and its back-up',x0,H-8); return; }
    if(/^sm_t_/.test(id)){ var b=BE.find(function(x){ return 'sm_t_'+x.id===id; }); if(!b)return; c.fillStyle='#05070b'; c.fillRect(0,0,W,H); var pn=b.panel&&R()[b.panel];
      if(pn){ var im=load('assets/scenery/'+pn); if(im.complete&&im.naturalWidth){ var s=Math.max(W/im.naturalWidth,H/im.naturalHeight); c.globalAlpha=0.9; c.drawImage(im,(W-im.naturalWidth*s)/2,(H-im.naturalHeight*s)/2,im.naturalWidth*s,im.naturalHeight*s); c.globalAlpha=1; } }
      else { var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#16202e'); g.addColorStop(1,'#05070b'); c.fillStyle=g; c.fillRect(0,0,W,H); c.fillStyle='rgba(242,193,78,.85)'; c.font='700 '+Math.round(H/5)+'px Georgia,serif'; c.textAlign='center'; c.fillText(S.ACTS[b.act][0],W/2,H*0.55); c.font='600 '+Math.round(H/14)+'px Georgia,serif'; c.fillText(S.ACTS[b.act][1],W/2,H*0.72); }
      return; }
    var O=optOf(id); if(!O)return; var k2=id+W; if(cv._done===k2&&!full)return; cv._done=k2;
    map(c,W,H,[{loc:O.o.loc,ic:ICON[O.o.kind],col:O.bak?BAK:O.o.kind==='cut'?CUT:HINT}]);
    var L=S.LOC[O.o.loc]; c.fillStyle='rgba(5,8,14,.75)'; c.fillRect(0,H-26,W,26); c.fillStyle='#e8eef8'; c.font='600 13px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText('📍 '+(L?L[2]:O.o.loc)+'  ·  '+O.o.when,8,H-9,W-16); };
  LBR.drawers.storymap=draw;
  // the cards
  var badge=function(o,bak){ var st=ST[o.st]||ST.planned; return '<span class="bb-m" style="color:'+(bak?BAK:o.kind==='cut'?CUT:HINT)+';border-color:'+(bak?BAK:o.kind==='cut'?CUT:HINT)+'">'+ICON[o.kind]+' '+KIND[o.kind]+'</span><span class="bb-m" style="color:'+st[1]+';border-color:'+st[1]+'">'+st[0]+'</span>'; };
  var desc=function(o){ return '<b>When:</b> '+o.when+' · <b>How:</b> '+o.how+'<br><i>'+o.text.replace(/</g,'&lt;')+'</i>'; };
  var ALL=[{id:'sm_overview',name:'The saga at a glance',desc:''}], n=0, H1=[], H2=[];
  BE.forEach(function(b,bi){ var head=LBR.sec((bi===0||BE[bi-1].act!==b.act?'<span style="color:#f2c14e">Act '+S.ACTS[b.act][0]+' · '+S.ACTS[b.act][1]+'</span> — ':'')+(bi+1)+'. '+b.title,b.mystery?'stays hidden: '+b.mystery:'');
    var T={id:'sm_t_'+b.id,name:'What is true — '+b.title,desc:b.truth+(b.mystery?'<br><small style="color:#ffd27a">Kept a mystery: '+b.mystery+'</small>':'')+'<br><small style="color:#8aa0b8">☆ if it is right · a note to correct it</small>'};
    var Os=b.opts.map(function(o,i){ return {id:'sm_o_'+b.id+'_'+AB[i],name:'Way '+AB[i].toUpperCase()+' — '+o.how.replace(/^(the |a |an )/,'').slice(0,60),desc:desc(o),o:o}; });
    var Bs=b.bak.map(function(o,i){ return {id:'sm_b_'+b.id+'_'+XY[i],name:'Back-up '+XY[i].toUpperCase()+' — '+o.how.replace(/^(the |a |an )/,'').slice(0,60),desc:desc(o),o:o,bak:true}; });
    ALL.push(T); Os.forEach(function(x){ ALL.push(x); }); Bs.forEach(function(x){ ALL.push(x); });
    H1.push({head:head,cards:[T].concat(Os)}); H2.push({head:LBR.sec((bi+1)+'. '+b.title,'if the way you pick is missed'),cards:Bs}); });
  var card=function(d){ var w=d.id==='sm_overview'?1400:/^sm_t_/.test(d.id)?420:380, h=d.id==='sm_overview'?420:/^sm_t_/.test(d.id)?280:250; return LBR.card('storymap',d,n++,w,h,d.o?badge(d.o,d.bak):''); };
  var LEGEND='<div class="sm-legend"><b>How to read this.</b> Every element of the saga, from the opening to the credits, in the order you meet it. <b>What is true</b> — the story as it stands; ☆ it if it is right, or write a note to correct it. Then the <b>ways you could learn it</b>, each on a map of Runeheim (where) with when, from whom, a sample line, and whether it is <span style="color:#7fe08a">in the game</span>, <span style="color:#ffd27a">partly built</span> or <span style="color:#ff9a8a">still to build</span>. '+
    '<span style="color:'+CUT+'">🎬 Cut-scene</span> = a full scene that tells a larger part of the story; <span style="color:'+HINT+'">💬 Hint</span> = a line from someone, or a small moment as you progress. ☆ the way you want for each — more than one is fine. <b>Section 2</b> is the redundancy check: a back-up way for each, in case the first one is missed. The strip at the top shows your choices end to end.</div>';
  LAB_TABS.push({ id:'storymap', name:'The saga, end to end',
    blurb:'<b>Round 72 — the whole saga, end to end.</b> 27 story elements in six acts: what is true, and when, where and how you learn each one — cut-scenes and hints — with back-ups. ☆ the ways you want; notes to correct anything.',
    designs:ALL.map(function(d){ return {id:d.id,name:d.name}; }),
    render:function(){ setTimeout(LBR.bind,0); n=0;
      return LEGEND+LBR.sec('The saga at a glance','your ways in order — cut-scenes, hints and back-ups')+'<div class="br-grid sm-one">'+card(ALL[0])+'</div>'+
        '<h2 class="sm-h">Section 1 — The saga, and how you learn it</h2>'+H1.map(function(G){ return G.head+'<div class="br-grid sm-grid">'+G.cards.map(card).join('')+'</div>'; }).join('')+
        '<h2 class="sm-h">Section 2 — Redundancy: the back-ups</h2>'+H2.map(function(G){ return G.head+'<div class="br-grid sm-grid">'+G.cards.map(card).join('')+'</div>'; }).join(''); } });
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('storymap');
  var st=document.createElement('style'); st.textContent='.sm-legend{background:#0d1522;border:1px solid #24364e;border-radius:10px;padding:12px 16px;margin:6px 0 14px;color:#cfdbea;font-size:14px;line-height:1.55}.sm-one{grid-template-columns:minmax(0,1fr)!important}.sm-grid{grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}.sm-h{margin:26px 0 6px;color:#f2c14e;font:700 22px Georgia,serif;border-bottom:1px solid #2a3a4e;padding-bottom:6px}';
  document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'storymap',label:'✦ The saga, end to end — check the story and pick how you learn it',where:'The saga, end to end tab · 27 elements, their ways and back-ups',done:function(){ return ALL.some(function(d){ return d.id!=='sm_overview'&&LBR.picked('storymap',d.id); }); },go:function(){ LTODO.goTo('storymap','.sm-grid',0); }});
})();
