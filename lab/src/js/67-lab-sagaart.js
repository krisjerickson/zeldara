// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 55b — "Saga art" tab. Kris: "Make sure to also get these into the lab for me to view" (the round 55 sheets: waves 56 and 57).
// ║ The spirit groups as their 4-frame moving loops (wave 56: his eleven picks and the eight new ones), and the forges' art (wave 57): each forge's
// ║ hearth with the Heartglass it makes. Nothing to choose; a ☆ marks a favourite and notes on any card are welcome.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined')return; LBR.TABS.push('sagaart');
  var M=(typeof ZSCN_META!=='undefined'&&ZSCN_META)||{items:{}}, IMG={}, tried={};
  var page=function(pg){ if(IMG[pg]||tried[pg])return IMG[pg]; tried[pg]=1; var im=new Image(); im.onload=function(){ IMG[pg]=im; }; im.onerror=function(){ if(!im._b){ im._b=1; im.src='../assets/scenery/'+pg+'.webp'; } }; im.src='assets/scenery/'+pg+'.webp'; return null; };
  var draw=function(c,id,cx,foot,h,mw){ var it=M.items[id]; if(!it)return false; var im=page(it[0]); if(!im)return false; var s=Math.min(h/it[4],mw/it[3],2.6); c.imageSmoothingEnabled=true; c.imageSmoothingQuality='high'; c.drawImage(im,it[1],it[2],it[3],it[4],cx-it[3]*s/2,foot-it[4]*s,it[3]*s,it[4]*s); return true; };
  var GROUPS=[
    ['ring','Ring dance','your pick · on the Green'],['family','Family','your pick · on the Green'],['guard','Honour guard','your pick · on the Green'],
    ['hearth_tale','Tale by the hearth','your pick · on the Green'],['reel','The reel','your pick · on the Green'],['sparring','Sparring ancestors','your pick · on the Green'],
    ['mead_bench','Mead bench','your pick · on the Green'],['tafl','Game of tafl','your pick · on the Green'],['tag','Children at play','your pick · on the Green'],
    ['chaingang','Chain gang','your pick · at the bindstones (bound)'],['haul','The great haul','your pick · at the bindstones (bound)'],
    ['glima','Glima wrestling','new · on the Green'],['archery','Archery contest','new · on the Green'],['skald','The skald','new · on the Green'],
    ['lantern_parade','Lantern parade','new · on the Green'],['weaving','Weaving circle','new · on the Green'],['roast','Ghost-fire feast','new · on the Green'],
    ['knattleikr','Knattleikr','new · on the Green'],['rune_carving','Rune carving','new · on the Green']];
  var FORGES=[['ember','Ember Forge','Grasslands lattice + Sea-silver tray · Glóðr, the Bellows-Wyrm',1],['cinder','Cinder Forge','Wetlands lattice + Bog-iron tray · Eisa, the Quench-Hag',2],
    ['slag','Slag Forge','Highlands lattice + Fire-bronze tray · Gjallr, the Slag Troll',3],['ash','Ash Forge','Ashlands lattice + Rime-steel tray · Eimyrja, the Chainmistress',4]];
  var BY={}; GROUPS.forEach(function(g){ BY['g_'+g[0]]={k:'g',g:g}; }); FORGES.forEach(function(f){ BY['f_'+f[0]]={k:'f',f:f}; });
  var wait=function(c,W,H,cmd){ c.fillStyle='#cfe0f4'; c.font='13px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText('Waiting for the painted sheet',W/2,H/2-6); c.fillStyle='#8aa0b8'; c.font='11px "Segoe UI",sans-serif'; c.fillText(cmd,W/2,H/2+12); };
  LBR.drawers.sagaart=function(cv,c,W,H,t,full,id){ var D=BY[id]; if(!D)return; t=t||0;
    if(D.k==='g'){ var bound=/bound/.test(D.g[2]); c.fillStyle=bound?'#2a2a34':'#2e4a34'; c.fillRect(0,0,W,H); c.fillStyle=bound?'#22222a':'#284230'; c.beginPath(); c.ellipse(W/2,H-30,W*0.42,26,0,0,Math.PI*2); c.fill();
      var f=1+Math.floor(t*2.5)%4; if(!draw(c,'gl_'+D.g[0]+'_'+f,W/2,H-14,H*0.86,W*0.92))wait(c,W,H,'tools\\sprites\\round55.ps1 (wave 56)');
      else{ c.fillStyle='rgba(255,255,255,.55)'; c.font='11px "Segoe UI",sans-serif'; c.textAlign='right'; c.fillText('frame '+f+' / 4',W-10,16); } return; }
    var F=D.f, acc=['','#3a2a1e','#1e2a36','#33281e','#361e1e'][F[3]]; c.fillStyle=acc; c.fillRect(0,0,W,H);
    var g=c.createRadialGradient(W*0.38,H*0.62,10,W*0.38,H*0.62,W*0.4); g.addColorStop(0,'rgba(255,150,60,'+(0.22+0.08*Math.sin(t*3))+')'); g.addColorStop(1,'rgba(255,150,60,0)'); c.fillStyle=g; c.fillRect(0,0,W,H);
    var a=draw(c,'ff_hearth_'+F[0],W*0.38,H-16,H*0.8,W*0.62), b=draw(c,'ic_heartglass_'+F[3],W*0.82,H*0.62+Math.sin(t*2)*4,H*0.36,W*0.26);
    if(b){ c.fillStyle='rgba(255,255,255,.65)'; c.font='11px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText(['','Ember','Cinder','Slag','Ash'][F[3]]+' Heartglass',W*0.82,H*0.62+22); }
    if(!a&&!b)wait(c,W,H,'tools\\sprites\\round55.ps1 (wave 57)'); };
  LAB_TABS.push({ id:'sagaart', name:'Saga art',
    blurb:'<b>Round 55b — the round 55 sheets, painted and in the game.</b> The groups play as their 4-frame loops: your nine Green picks and the two bound groups at the bindstones, plus eight new ones of the same kind so the Green never runs short once all forty spirits are free. Below them, the four forges: each hearth with the Heartglass it makes. Nothing to choose here, but notes on any card are welcome (☆ marks a favourite).',
    designs:GROUPS.map(function(g){ return {id:'g_'+g[0],name:g[1]}; }).concat(FORGES.map(function(f){ return {id:'f_'+f[0],name:f[1]}; })),
    render:function(){ setTimeout(LBR.bind,0);
      return LBR.sec('🌿 The spirit groups, moving','wave 56 · each plays its four frames as a loop')+'<div class="br-grid">'+GROUPS.map(function(g,i){ return LBR.card('sagaart',{id:'g_'+g[0],name:g[1],desc:g[2]},i,420,280,''); }).join('')+'</div>'+
        LBR.sec('🔥 The four forges','wave 57 · the hearth on the forge-master\'s floor, and the Heartglass it makes')+'<div class="br-grid">'+FORGES.map(function(f,i){ return LBR.card('sagaart',{id:'f_'+f[0],name:f[1],desc:f[2]},20+i,420,280,''); }).join('')+'</div>'; } });
})();
