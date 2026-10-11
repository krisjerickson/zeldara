// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 44 — ADVENTURE SITES tab: a new design for every adventure site (07zw ZSD), three options each, for Kris to pick.
// ║ Kris (Oct 10): "make a new redesign of adventure sites for me to choose from in the lab. Also look at ways to create and paint these to look
// ║ better for me to choose from." Answers: all site types at once · a design per individual site · 2–3× bigger · stairs in different places
// ║ on each floor, a bit of a maze (dungeons most of all) · compare both painting approaches.
// ║ Section 1: pick a site (53: 10 towers, 10 dungeons, 16 mage towers, 12 island castles, 4 island crypts, the Ember Cave); its three options
// ║ show every floor — ▲ where you arrive, ▼ the way on, ★ the treasure or boss on the top floor. One ☆ Pick per site ('asites-<site>__<opt>').
// ║ Section 2: three ways to paint them (sketches until the painted pilot rooms of wave 45 arrive).
// ═══════════════════════════════════════════════════════════════════════
var ASITES=(function(){ if(typeof LBR==='undefined'||typeof ZSD==='undefined')return null; LBR.TABS.push('asites');
  var TN={tower:'Towers',dungeon:'Dungeons',mage:'Mage towers',castle:'Island castles',isle:'Island crypts',ember:'Ember Cave'}, QN=['','Grasslands','Wetlands','Highlands','Ashlands'];
  var cur=null;
  // the painted pilot rooms (wave 45), when they are in: published beside the Lab as rooms/<id>.webp, or ../assets/scenery/rooms/ locally
  var ROOMS=['room_crystal_grotto','room_elven_library','room_ember_hall'], RIMG={}; ROOMS.forEach(function(id){ var im=new Image(); im.onerror=function(){ if(!im._b){ im._b=1; im.src='../assets/scenery/rooms/'+id+'.webp'; } }; im.src='rooms/'+id+'.webp'; RIMG[id]=im; });
  var sites=function(){ return ZSD.sites(); };
  var picked=function(s){ for(var o=0;o<3;o++)if(LBR.picked('asites',s.id+'__'+o))return o; return -1; };
  var liquidCol=function(d){ return d.site.type==='ember'||(d.site.el==='fire'&&d.site.type!=='tower')?'#ff7a2a':d.site.type==='tower'||d.site.type==='mage'||d.site.type==='castle'?ZSD.mix(d.pal.void,'#000000',0.3):d.pal.liquid; };
  // one floor as a little map: walls show their face where a floor lies below them; ▲ arrive, ▼ the way on, ★ the goal
  var lum=function(h){ var c=hexToRgb(h); return (c[0]*0.3+c[1]*0.59+c[2]*0.11)/255; };
  // walls must read against the floor on a small map: pull them apart when the site's colours are close
  var mapPal=function(P){ if(P._m)return P._m; var o=Object.assign({},P), d=lum(P.wallTop)-lum(P.floor); if(Math.abs(d)<0.22){ var up=lum(P.floor)<0.5; o.wallTop=ZSD.mix(P.wallTop,up?'#ffffff':'#000000',0.45); o.wall=ZSD.mix(P.wall,up?'#ffffff':'#000000',up?0.25:0.5); } P._m=o; return o; };
  function drawFloor(c,d,F,x0,y0,bw,bh,label,t){ var s=Math.min(bw/F.w,bh/F.h), ox=x0+(bw-F.w*s)/2, oy=y0+(bh-F.h*s)/2, P=mapPal(d.pal), g=F.g, W=F.w, lq=liquidCol(d);
    c.fillStyle=P.void; c.fillRect(ox-2,oy-2,F.w*s+4,F.h*s+4);
    for(var y=0;y<F.h;y++)for(var x=0;x<W;x++){ var v=g[y*W+x], X=ox+x*s, Y=oy+y*s; if(v===0)continue;
      if(v===1||v===5){ c.fillStyle=v===5?P.floor2:((x+y)%2?P.floor:ZSD.mix(P.floor,'#ffffff',0.05)); c.fillRect(X,Y,s+0.6,s+0.6); }
      else if(v===2){ var below=y<F.h-1?g[(y+1)*W+x]:0; c.fillStyle=ZSD.walk(below)?P.wall:P.wallTop; c.fillRect(X,Y,s+0.6,s+0.6); }
      else if(v===3){ c.fillStyle=lq; c.fillRect(X,Y,s+0.6,s+0.6); if(s>3&&(x*7+y*13)%9===0){ c.fillStyle='rgba(255,255,255,'+(0.12+0.1*Math.sin(t*2+x+y))+')'; c.fillRect(X+s*0.2,Y+s*0.4,s*0.6,s*0.15); } }
      else if(v===4){ c.fillStyle='#8a6440'; c.fillRect(X,Y,s+0.6,s+0.6); if(s>3){ c.fillStyle='#5a3e24'; c.fillRect(X,Y+s*0.45,s,Math.max(1,s*0.1)); } }
      else if(v===6){ c.fillStyle=P.floor; c.fillRect(X,Y,s+0.6,s+0.6); c.fillStyle=P.wallTop; c.fillRect(X+s*0.15,Y+s*0.1,s*0.7,s*0.7); } }
    var mk=function(p,ch,col){ if(!p)return; var X=ox+(p[0]+0.5)*s, Y=oy+(p[1]+0.5)*s, r=Math.max(5,s*1.4); c.fillStyle='rgba(0,0,0,.55)'; c.beginPath(); c.arc(X,Y,r+2,0,6.3); c.fill(); c.fillStyle=col; c.beginPath(); c.arc(X,Y,r,0,6.3); c.fill(); c.fillStyle='#10131c'; c.font='bold '+Math.round(r*1.3)+'px sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(ch,X,Y+1); };
    mk(F.up,'▲','#9fe8ff'); mk(F.down,'▼','#ffd27a'); mk(F.goal,'★','#ff9ad0');
    if(label){ c.fillStyle='rgba(0,0,0,.6)'; c.font='11px "Segoe UI",sans-serif'; var tw=c.measureText(label).width+10; c.fillRect(x0,y0,tw,16); c.fillStyle='#e8f0fa'; c.textAlign='left'; c.textBaseline='alphabetic'; c.fillText(label,x0+5,y0+12); } return s; }
  function drawDesign(cv,c,W,H,t,d,full){ c.fillStyle='#0b0f18'; c.fillRect(0,0,W,H); var n=d.floors.length;
    if(full){ var cols=Math.ceil(Math.sqrt(n*W/H)), rows=Math.ceil(n/cols), cw=W/cols, ch=(H-30)/rows; d.floors.forEach(function(F,i){ drawFloor(c,d,F,(i%cols)*cw+6,30+Math.floor(i/cols)*ch+6,cw-12,ch-12,'Floor '+(i+1),t); });
      c.fillStyle='#e8f0fa'; c.font='bold 15px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText(d.site.name+' — option '+(d.opt+1)+': '+d.name+'  ·  '+n+' floors  ·  '+d.w+' × '+d.h+' tiles a floor (about '+d.bigger+'× the old)',10,20); return; }
    var mainW=W*0.66, s=drawFloor(c,d,d.floors[0],4,4,mainW-8,H-8,'Floor 1 of '+n,t);
    var rest=d.floors.slice(1), colW=W-mainW-6, rh=rest.length?Math.min((H-6)/rest.length,colW*d.h/d.w+18):0; rest.forEach(function(F,i){ drawFloor(c,d,F,mainW+2,4+i*rh,colW,rh-4,'Floor '+(i+2),t); });
    // a hero for scale (one tile)
    var hx=6, hy=H-30; c.fillStyle='rgba(0,0,0,.6)'; c.fillRect(hx,hy,92,24); c.fillStyle='#2f9e8e'; c.fillRect(hx+6,hy+12-s,Math.max(2,s),Math.max(3,s*1.6)); c.fillStyle='#e8f0fa'; c.font='10px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText('= the hero',hx+16,hy+16); }
  // the painting approaches (sketches drawn from the site's colours)
  var APPR=[['tiles','Painted tile sets + props','New painted floors, walls, edges and stairs for each site\'s look, laid out by the game on any design, with painted furniture, statues and crystals on top. Works for every layout above and every floor; the room colours above become the tile colours.'],
    ['backdrop','Painted room backdrops','Each floor painted as one big picture (walls, floor, light and all), the walls and doors laid over it for walking. The richest look — but each design and floor needs its own painting, and changes mean painting again. A pilot of three rooms is ordered (wave 45) so you can judge it.'],
    ['hybrid','Hybrid: tile sets + big painted set-pieces','Tile sets as in the first, plus a few large painted centrepieces per floor (a rune circle, a great tree, a frozen fountain, a lava forge) that make each floor memorable, placed by the design.']];
  function drawAppr(c,W,H,t,k){ var s=sites()[0], d=ZSD.design(cur||s,0), P=d.pal; c.fillStyle=P.void; c.fillRect(0,0,W,H); var ts=24, cols=Math.ceil(W/ts), rows=Math.ceil(H/ts);
    var RL=ROOMS.filter(function(id){ var im=RIMG[id]; return im&&im.complete&&im.naturalWidth; }), IMG=RL.length?RIMG[RL[Math.floor(t/4)%RL.length]]:null;
    if(k==='backdrop'){ if(IMG){ var sc=Math.max(W/IMG.naturalWidth,H/IMG.naturalHeight); c.drawImage(IMG,(W-IMG.naturalWidth*sc)/2,(H-IMG.naturalHeight*sc)/2,IMG.naturalWidth*sc,IMG.naturalHeight*sc); return; } var g=c.createRadialGradient(W/2,H/2,20,W/2,H/2,W*0.6); g.addColorStop(0,ZSD.mix(P.floor,'#ffffff',0.25)); g.addColorStop(1,P.void); c.fillStyle=g; c.fillRect(0,0,W,H);
      c.fillStyle='rgba(0,0,0,.55)'; c.fillRect(W/2-150,H/2-22,300,44); c.fillStyle='#ffe9a8'; c.font='13px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText('Pilot rooms ordered — shown here when painted',W/2,H/2+5); return; }
    for(var y=0;y<rows;y++)for(var x=0;x<cols;x++){ var wall=y<2||x===0||x===cols-1; c.fillStyle=wall?(y===1?P.wall:P.wallTop):((x+y)%2?P.floor:ZSD.mix(P.floor,'#000000',0.08)); c.fillRect(x*ts,y*ts,ts,ts);
      if(!wall){ c.strokeStyle='rgba(0,0,0,.18)'; c.strokeRect(x*ts+0.5,y*ts+0.5,ts-1,ts-1); c.fillStyle='rgba(255,255,255,.06)'; c.fillRect(x*ts+3,y*ts+3,ts*0.4,2); } }
    var prop=function(px,py,col,h){ c.fillStyle='rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(px,py,14,5,0,0,6.3); c.fill(); c.fillStyle='#1a1420'; c.fillRect(px-9,py-h-1,18,h+2); c.fillStyle=col; c.fillRect(px-8,py-h,16,h); c.fillStyle=ZSD.mix(col,'#ffffff',0.35); c.fillRect(px-8,py-h,16,4); };
    prop(W*0.2,H*0.6,P.wallTop,34); prop(W*0.8,H*0.62,P.accent,26); prop(W*0.35,H*0.9,P.wall,20);
    if(k==='hybrid'){ var cx=W*0.55, cy=H*0.62, r=Math.min(W,H)*0.22; c.save(); c.translate(cx,cy); c.scale(1,0.55); c.strokeStyle=P.glow; c.lineWidth=4; c.globalAlpha=0.6+0.3*Math.sin(t*2); c.beginPath(); c.arc(0,0,r,0,6.3); c.stroke(); c.beginPath(); c.arc(0,0,r*0.7,0,6.3); c.stroke();
      for(var i=0;i<8;i++){ var a=i/8*Math.PI*2+t*0.2; c.beginPath(); c.arc(Math.cos(a)*r*0.85,Math.sin(a)*r*0.85,5,0,6.3); c.fillStyle=P.glow; c.fill(); } c.restore(); } }
  LBR.drawers.asites=function(cv,c,W,H,t,full,id){ var m=/^(.*)__(\d)$/.exec(id); if(m){ var s=sites().find(function(x){ return x.id===m[1]; }); if(!s)return; var d=ZSD.design(s,+m[2]); if(!full&&cv._done===id+W&&!/islands|flooded/.test(d.arch))return; drawDesign(cv,c,W,H,t,d,full); if(!full)cv._done=id+W; return; }
    var a=/^appr_(\w+)$/.exec(id); if(a)drawAppr(c,W,H,t,a[1]); };
  function chips(){ var by={}, n=sites().filter(function(s){ return picked(s)>=0; }).length; sites().forEach(function(s){ (by[s.type]=by[s.type]||[]).push(s); });
    return '<div class="as-prog">Picked <b>'+n+'</b> of '+sites().length+' sites</div>'+Object.keys(TN).map(function(k){ var L=by[k]||[]; if(!L.length)return ''; return '<div class="as-grp"><span>'+TN[k]+'</span>'+L.map(function(s){ var p=picked(s); return '<button class="vbtn as-site'+(cur&&cur.id===s.id?' on':'')+(p>=0?' done':'')+'" data-asite="'+s.id+'" title="'+QN[s.q]+'">'+(p>=0?'★ ':'')+s.name+'</button>'; }).join('')+'</div>'; }).join(''); }
  function siteBlock(s){ var opts=[0,1,2].map(function(o){ var d=ZSD.design(s,o); return LBR.card('asites',{id:s.id+'__'+o,name:'Option '+(o+1)+' — '+d.name,desc:d.blurb+' <i>'+d.floors.length+' floors, '+d.w+' × '+d.h+' tiles each — about '+d.bigger+'× the old. '+['The site\'s own colours.','Deeper, moodier colours.','A bold colour twist on its element.'][o]+'</i>'},o,560,360,'<span class="bb-m">'+QN[s.q]+' · '+TN[s.type].replace(/s$/,'')+'</span>'); }).join('');
    var i=sites().indexOf(s), nx=sites()[(i+1)%sites().length];
    return '<div class="as-head"><h3>'+s.name+'</h3><span>'+QN[s.q]+' · '+TN[s.type].replace(/s$/,'')+(s.boss?' · ★ boss site':'')+(s.isle?' · on '+s.isle:'')+'</span><button class="vbtn as-next" data-asite="'+nx.id+'">Next site ▶ '+nx.name+'</button></div><div class="br-grid as-grid">'+opts+'</div>'; }
  var html=function(){ cur=cur||sites()[0]; return LBR.sec('1. A new design for every site','pick one option per site — ▲ arrive · ▼ the way on · ★ treasure / boss')+'<div id="as-chips">'+chips()+'</div><div id="as-site">'+siteBlock(cur)+'</div>'+
      LBR.sec('2. How to paint them','pick the approach')+'<div class="br-grid as-grid">'+APPR.map(function(A,i){ return LBR.card('asites',{id:'appr_'+A[0],name:A[1],desc:A[2]},i,560,315,''); }).join('')+'</div>'+
      LBR.sec('3. Anything else','your words — saved as you type')+'<textarea id="as-notes" class="mn-notes" placeholder="Anything about the sites, their layouts or colours…">'+(((LabApp.picks['asites-notes']||{}).notes)||'').replace(/</g,'&lt;')+'</textarea>'; };
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('[data-asite]'); if(b){ cur=sites().find(function(s){ return s.id===b.dataset.asite; })||cur; var el=document.getElementById('as-site'), ch=document.getElementById('as-chips'); if(el){ el.innerHTML=siteBlock(cur); ch.innerHTML=chips(); LBR.bind(); el.scrollIntoView({block:'start',behavior:'smooth'}); } return; }
    var pk=e.target.closest&&e.target.closest('.br-pick'), a=pk&&pk.closest('.br-card'); if(!a||a.dataset.tab!=='asites')return; var m=/^(.*)__(\d)$/.exec(a.dataset.id), m2=/^appr_/.test(a.dataset.id);
    if(m&&LBR.picked('asites',a.dataset.id))[0,1,2].forEach(function(o){ var k='asites-'+m[1]+'__'+o; if(String(o)!==m[2]&&LBR.picked('asites',m[1]+'__'+o)){ LabApp.picks[k].verdict=null; LabApp.persist(k); } });
    if(m2&&LBR.picked('asites',a.dataset.id))APPR.forEach(function(A){ var k='asites-appr_'+A[0]; if('appr_'+A[0]!==a.dataset.id&&LBR.picked('asites','appr_'+A[0])){ LabApp.picks[k].verdict=null; LabApp.persist(k); } });
    LBR.refresh(); var ch2=document.getElementById('as-chips'); if(ch2)ch2.innerHTML=chips(); });
  document.addEventListener('input',function(e){ if(e.target.id!=='as-notes')return; var k='asites-notes', p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=e.target.value; p.verdict=e.target.value?'note':null; LabApp.saveState('Typing…'); LabApp.persist(k,900); });
  (function(){ var st=document.createElement('style'); st.textContent='.as-prog{margin:6px 0;color:#9fb3cc}.as-grp{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:4px 0}.as-grp>span{min-width:110px;color:#cfe0f4;font-weight:600}.as-site{font-size:12px;padding:4px 9px}.as-site.on{border-color:#7fd8ff;color:#7fd8ff}.as-site.done{color:var(--pick)}'+
    '.as-head{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin:14px 0 6px}.as-head h3{margin:0;color:#e8f0fa}.as-head span{color:#9fb3cc}.as-next{margin-left:auto}.as-grid{grid-template-columns:repeat(auto-fill,minmax(520px,1fr))}#as-notes{width:100%;min-height:100px;box-sizing:border-box}'; document.head.appendChild(st); })();
  LAB_TABS.push({ id:'asites', name:'Adventure sites',
    blurb:'<b>Round 44 — a new design for every adventure site.</b> As you asked: every site has its own layout and colours, the floors are about <b>2–3× bigger</b>, and on every floor you arrive in one place and the way on is somewhere far away — so you explore, and the dungeons are often real mazes. Each site has <b>three options</b>, each a different kind of layout (rings, wings, spirals, mazes, caves, catacombs, flooded halls, islands, keeps…) in different colours; every floor of it is drawn. ☆ Pick one per site (or note what to change). Below: three ways to paint them. Nothing changes in the game until you have picked.',
    designs:[].concat.apply([],ZSD.sites().map(function(s){ return [0,1,2].map(function(o){ return {id:s.id+'__'+o,name:s.name+' — option '+(o+1)}; }); })), render:function(){ setTimeout(LBR.bind,0); return html(); } });
  return {sites:sites,picked:picked,html:html,drawDesign:drawDesign,setSite:function(id){ cur=sites().find(function(s){ return s.id===id; })||cur; }};
})();
