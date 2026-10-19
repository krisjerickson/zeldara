// ═══════════════════════════════════════════════════════════════════════
// ║ 78-lab-soulgame.js — round 68: SOUL-LINES IN THE GAME (Lab rounds C and D, doc 30 §2).
// ║ Kris's picks: the World-Tree, drawn as the rune vein with a wave of motes; answers: straight into the game, map page flash for a spirit
// ║ freed far away. This tab draws with the GAME's own code (07zsl ZSL.paint) and the painted pieces of scenery wave 74, so what you see
// ║ here is what the game draws:
// ║  · the reveal (a spirit freed: its piece traces out from the runestone while the view eases back; motes run along the lines),
// ║  · the runestone ring three ways — it becomes a hamlet's outline at the end, so pick the one to keep,
// ║  · the map page (lit pieces, the newest glowing, faint dotted ghosts once a realm is 8/10 freed),
// ║  · after the gods (the lines become paths of grass and stone).
// ═══════════════════════════════════════════════════════════════════════
var LSG=(function(){ if(typeof LBR==='undefined'||typeof ZSL==='undefined'||typeof LSS==='undefined'||!LSS||typeof LabMap==='undefined')return null;
  var S={ q:1, night:false, D:null, img:{}, cache:{}, t0:performance.now() }, TAU=Math.PI*2, TS=32;
  var load=function(src){ if(S.img[src])return S.img[src]; var im=new Image(); im.onerror=function(){ if(!im._b){ im._b=1; im.src='../'+src; } }; im.src=src; S.img[src]=im; return im; };
  var IMG=function(id){ var it=typeof ZSCN_META!=='undefined'&&ZSCN_META.items&&ZSCN_META.items[id]; if(!it)return null; var pg=load('assets/scenery/'+it[0]+'.webp'); return (pg.complete&&pg.naturalWidth)?[pg,it[1],it[2],it[3],it[4]]:null; };
  S.data=function(){ if(S.D)return S.D; var M=LabMap.build(); return (S.D=ZSL.build({cls:M.cls,W:M.W,H:M.H,C:{x:M.village.x,y:M.village.y},CH:32})); };
  // the spirits freed in the map card: 22, with the Grasslands at 9/10 so its ghosts show; the newest is the last
  S.freed=function(){ if(S._fr)return S._fr; var Z=S.data().G.Z, take={1:9,2:6,3:4,4:3}, L=[]; [2,1,3,4].forEach(function(q){ L=L.concat(Z.filter(function(z){ return z.r===q; }).slice(0,take[q]).map(function(z){ return z.i; })); }); return (S._fr=L); };
  var CARDS=[
    {id:'sg_reveal',kind:'reveal',name:'The reveal',desc:'What freeing a spirit looks like in the game: its piece of the World-Tree traces out from the runestone while the view eases back, then settles into the ground — the rune vein with painted rune stamps, the seed under the stone, and light motes running along the lines. It replays every few seconds.'},
    {id:'sg_ring_vein',kind:'ring',ring:'vein',name:'Runestone ring — the vein itself',desc:'The ring round the runestone drawn as the same rune vein as the lines, runes stamped along it (as in the game now). At the end it becomes the hamlet\'s path.'},
    {id:'sg_ring_a',kind:'ring',ring:'painted',ringId:'sl_ring_a',name:'Runestone ring — painted, with runes',desc:'The painted ring (wave 74): a band of light with runes all round it and four flourishes at the quarters. Bolder: it reads as a magic circle round every freed stone.'},
    {id:'sg_ring_b',kind:'ring',ring:'painted',ringId:'sl_ring_b',name:'Runestone ring — painted, knotted',desc:'The painted knotted ring (wave 74): two veins braided over and under all the way round, four blooms of light at the quarters.'},
    {id:'sg_map',kind:'map',name:'The map page',desc:'The tattoo on the world map with 22 spirits freed: lit pieces in rune-blue, the newest pulsing until you have seen it (a spirit freed far away waits there, and traces when you next walk near), and — because the Grasslands are 9/10 — its last missing piece as a faint dotted ghost.'},
    {id:'sg_green',kind:'green',name:'After the gods',desc:'When the spirits have gone home, the soul-lines turn into paths of grass and stone across the land; the rings round the runestones become the hamlets\' paths (the hamlets come after the credits).'}];
  // the close-up view of a realm's window (the Lab round B window and ground)
  S.view=function(W,H,zf){ var w=LSS.window(S.q), z=w.z, k=Math.min(W/(LSS.WT*TS),H/(LSS.HT*TS))*TS*(zf||1), ox=W/2-(z.x-w.x0)*k, oy=H/2-(z.y-w.y0)*k; return {w:w,z:z,k:k,ox:ox,oy:oy,V:{x0:w.x0-ox/k,y0:w.y0-oy/k,k:k}}; };
  S.ground=function(c,W,H,v){ var g=LSS.paintGround(S.q); c.fillStyle='#05080c'; c.fillRect(0,0,W,H); c.drawImage(g,v.ox-LSS.MG*v.k,v.oy-LSS.MG*v.k,(LSS.WT+2*LSS.MG)*v.k,(LSS.HT+2*LSS.MG)*v.k); };
  S.stone=function(c,v){ var it=typeof ZSCN_META!=='undefined'&&ZSCN_META.items&&ZSCN_META.items.sp_bindstone_free, bx=v.ox+(v.z.x-v.w.x0)*v.k, by=v.oy+(v.z.y-v.w.y0)*v.k, k=v.k;
    if(it){ var pg=load('assets/scenery/'+it[0]+'.webp'); if(pg.complete&&pg.naturalWidth){ var hh=2.6*k, ww=hh*it[3]/it[4]; c.drawImage(pg,it[1],it[2],it[3],it[4],bx-ww/2,by-hh*0.82,ww,hh); } }
    var hx=bx+3.2*k, hy=by+2.2*k; c.fillStyle='rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(hx,hy,0.42*k,0.15*k,0,0,TAU); c.fill(); c.fillStyle='#3a8a4a'; c.fillRect(hx-0.3*k,hy-0.95*k,0.6*k,0.75*k); c.fillStyle='#f0c8a0'; c.beginPath(); c.arc(hx,hy-1.12*k,0.26*k,0,TAU); c.fill(); };
  // the lit layer, cached (the painted pieces are drawn once per view)
  S.layer=function(W,H,v,o,key){ var ready=IMG('sl_rune_a')?1:0, K=key+'|'+W+'x'+H+'|'+S.q+'|'+S.night+'|'+v.k.toFixed(3)+'|'+ready; if(S.cache[K])return S.cache[K]; if(Object.keys(S.cache).length>40)S.cache={};
    var cv=document.createElement('canvas'); cv.width=W; cv.height=H; ZSL.paint(cv.getContext('2d'),S.data(),v.V,Object.assign({img:IMG,night:S.night},o)); return (S.cache[K]=cv); };
  S.motes=function(c,v,lit,t){ var D=S.data(), m=IMG('sl_mote_a'), N=26, w=v.w, own=v.z.i;
    if(!S._mc||S._mc.q!==S.q){ var L=[]; D.St.forEach(function(s){ for(var j=0;j<s.pts.length-1;j+=5){ var p=s.pts[j]; if(p.x>w.x0-2&&p.x<w.x0+LSS.WT+2&&p.y>w.y0-2&&p.y<w.y0+LSS.HT+2&&!s.gap[j])L.push([s.id,j]); } }); S._mc={q:S.q,L:L}; }
    var L=S._mc.L; if(!L.length)return; c.save(); c.globalCompositeOperation='lighter';
    for(var n=0;n<N;n++){ var life=4.5, ph=(t/1000+n*0.61)%life, cyc=Math.floor((t/1000+n*0.61)/life), pk=L[(n*7919+cyc*104729)%L.length], s=D.St[pk[0]];
      if(!lit(s.owner[pk[1]]))continue; var p=ZSL.along(s,pk[1],ph*2.6); if(!p||s.gap[p.i])continue; var a=Math.min(1,ph/0.6,(life-ph)/0.8)*(S.night?1:0.75), x=v.V.x0, X=(p.x-v.V.x0)*v.k, Y=(p.y-v.V.y0)*v.k, r=0.45*v.k*(S.night?1.2:1);
      c.globalAlpha=a; if(m)c.drawImage(m[0],m[1],m[2],m[3],m[4],X-r,Y-r,r*2,r*2); else { var g=c.createRadialGradient(X,Y,0,X,Y,r); g.addColorStop(0,'rgba(235,253,255,1)'); g.addColorStop(1,'rgba(111,227,245,0)'); c.fillStyle=g; c.fillRect(X-r,Y-r,r*2,r*2); } }
    c.restore(); };
  S.closeup=function(c,W,H,t,C){ var D=S.data(), loop=7.5, age=C.kind==='reveal'?((t-S.t0)/1000)%loop:99, tr=age<3.6, zf=C.kind==='reveal'?1-0.16*Math.sin(Math.min(1,age/4.6)*Math.PI):1, v=S.view(W,H,zf), own=v.z.i;
    S.ground(c,W,H,v); if(S.night){ c.fillStyle='rgba(6,10,30,.6)'; c.fillRect(0,0,W,H); }
    var green=C.kind==='green', lit=function(o){ return !(tr&&o===own); };
    c.drawImage(S.layer(W,H,v,{lit:lit,style:green?'green':'vein',ring:C.ring,ringId:C.ringId},C.id+(tr?'_t':'')),0,0);
    if(tr){ var f=Math.min(1,age/3.4)*(D.reach[own]+2); ZSL.paint(c,D,v.V,{img:IMG,night:S.night,lit:function(o){ return o===own; },ok:function(s,i){ if(!s)return f>=ZSL.RING_R; var p=s.pts[i]; return Math.hypot(p.x-v.z.x,p.y-v.z.y)<=f; },only:D.St.filter(function(s){ return s.owner.indexOf(own)>=0; }).map(function(s){ return s.id; }),zones:[own]}); }
    if(!green)S.motes(c,v,lit,t);
    S.stone(c,v);
    if(C.kind==='reveal'&&age<3.2){ var bx=v.ox+(v.z.x-v.w.x0)*v.k, by=v.oy+(v.z.y-v.w.y0)*v.k; c.strokeStyle='rgba(255,255,255,'+(0.8*(1-age/3.2))+')'; c.lineWidth=2; c.beginPath(); c.arc(bx,by,(0.5+age*1.6)*v.k,0,TAU); c.stroke(); }
    return v; };
  S.map=function(c,W,H,t){ var D=S.data(), M=LabMap.build(), sc=Math.min(W/M.W,H/M.H), ox=(W-M.W*sc)/2, oy=(H-M.H*sc)/2, fr=S.freed(), L={}, cnt={1:0,2:0,3:0,4:0}, nw=fr[fr.length-1];
    fr.forEach(function(i){ L[i]=1; cnt[D.G.Z[i].r]++; });
    c.fillStyle='#05080f'; c.fillRect(0,0,W,H); c.drawImage(LabMap.base,ox,oy,M.W*sc,M.H*sc); c.fillStyle='rgba(2,10,18,.45)'; c.fillRect(0,0,W,H);
    var pass=function(test,width,style,dash){ c.strokeStyle=style; c.lineWidth=width; c.setLineDash(dash||[]); c.lineCap='round'; c.lineJoin='round'; c.beginPath();
      D.St.forEach(function(s){ var dn=false; for(var j=0;j<s.pts.length;j++){ var p=s.pts[j]; if(test(s.owner[j])){ var x=ox+p.x*sc, y=oy+p.y*sc; if(dn)c.lineTo(x,y); else { c.moveTo(x,y); dn=true; } } else dn=false; } }); c.stroke(); c.setLineDash([]); };
    var any=fr.length>0, lit=function(o){ return o===-1?any:(!!L[o]&&o!==nw); }, ghost=function(o){ return o>=0&&!L[o]&&cnt[D.G.Z[o].r]>=8; }, pu=0.5+0.5*Math.sin(t/220);
    pass(ghost,Math.max(1,0.5*sc*1.6),'rgba(160,230,245,.4)',[3,4]);
    pass(lit,Math.max(3.5,1.8*sc),'rgba(111,227,245,.3)'); pass(lit,Math.max(1.4,0.55*sc),'#d8fbff');
    pass(function(o){ return o===nw; },Math.max(3,3*sc),'rgba(111,227,245,'+(0.25+0.4*pu)+')'); pass(function(o){ return o===nw; },Math.max(1,0.7*sc),'rgba(235,253,255,'+(0.6+0.4*pu)+')');
    c.fillStyle='rgba(3,10,18,.75)'; c.fillRect(8,8,300,48); c.fillStyle='#bff6ff'; c.font='600 14px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText(fr.length+' / 40 freed · the newest pulses',16,27);
    c.font='11px "Segoe UI",sans-serif'; c.fillStyle='#9fc8d8'; c.fillText('Grass '+cnt[1]+' (ghost shows) · Wet '+cnt[2]+' · High '+cnt[3]+' · Ash '+cnt[4],16,45); };
  S.draw=function(cv,c,W,H,t,full,id){ var C=CARDS.find(function(x){ return x.id===id; }); if(!C)return; t=performance.now();
    if(C.kind==='map'){ S.map(c,W,H,t); return; }
    var v=S.closeup(c,W,H,t,C);
    c.fillStyle='rgba(3,10,18,.7)'; c.fillRect(8,8,full?380:300,full?34:26); c.fillStyle='#bff6ff'; c.font=(full?15:12)+'px "Segoe UI",sans-serif'; c.textAlign='left';
    c.fillText(['','Grasslands','Wetlands','Highlands','Ashlands'][S.q]+' · '+(typeof _wmZoneName==='function'?_wmZoneName(v.z.id):v.z.id)+(C.kind==='green'?' · after the gods':S.night?' · night':' · day'),16,full?30:25); };
  LBR.drawers.soulgame=S.draw;
  S.bind=function(){ document.querySelectorAll('.sg-q').forEach(function(b){ b.onclick=function(){ S.q=+b.dataset.q; S._mc=null; S.t0=performance.now(); document.querySelectorAll('.sg-q').forEach(function(x){ x.setAttribute('aria-pressed',String(x===b)); }); }; });
    var n=document.getElementById('sg-night'); if(n)n.onchange=function(){ S.night=n.checked; }; };
  LAB_TABS.push({ id:'soulgame', name:'Soul-lines in the game',
    blurb:'<b>Round 68 — the soul-lines as the game draws them (Lab rounds C and D).</b> Your picks — the World-Tree, the rune vein with a wave of motes — are now <b>in the game</b> (you said "straight into the game"), with the painted pieces from round 70\'s sheets: rune stamps, the seed under each stone, the motes. These cards use the game\'s own drawing code. Look at <b>the reveal</b>, <b>the map page</b> and <b>after the gods</b>; and ☆ <b>one of the three runestone rings</b> — that ring becomes each hamlet\'s outline at the end. Notes welcome on any card.',
    designs:CARDS.map(function(d){ return {id:d.id,name:d.name}; }),
    render:function(){ setTimeout(function(){ LBR.bind(); S.bind(); },0);
      return '<div class="sl-bar sg-bar">'+[1,2,3,4].map(function(q){ return '<button class="vbtn sg-q" data-q="'+q+'" aria-pressed="'+(S.q===q)+'">'+['','🌿 Grasslands','💧 Wetlands','⛰ Highlands','🔥 Ashlands'][q]+'</button>'; }).join('')+
        '<label><input type="checkbox" id="sg-night"'+(S.night?' checked':'')+'> night</label></div>'+
        LBR.sec('The reveal and the ring (☆ one ring)','⛶ for full screen')+'<div class="br-grid sl-grid">'+CARDS.slice(0,4).map(function(d,i){ return LBR.card('soulgame',d,i,640,420,''); }).join('')+'</div>'+
        LBR.sec('The map page and after the gods','')+'<div class="br-grid sl-grid">'+CARDS.slice(4).map(function(d,i){ return LBR.card('soulgame',d,i+4,640,420,''); }).join('')+'</div>'; } });
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('soulgame'); LBR.TABS.push('soulgame');
  var st=document.createElement('style'); st.textContent='.sg-q[aria-pressed="true"]{border-color:var(--pick);color:var(--pick)}'; document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'soulgame',label:'✦ Soul-lines in the game — pick the runestone ring',where:'Soul-lines in the game tab · 3 rings (the hamlet outline)',done:function(){ return ['sg_ring_vein','sg_ring_a','sg_ring_b'].some(function(d){ return LBR.picked('soulgame',d); }); },go:function(){ LTODO.goTo('soulgame','.sg-bar',0); }});
  return S; })();
