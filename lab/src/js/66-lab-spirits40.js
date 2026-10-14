// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 54 — "The forty spirits" tab. Kris: "for the spirits, i've picked ones i like, but we still need more options and variety. use my selections to come
// ║ up with more ideas for how the spirits could look, with 40 different unique spirits for all 40 of the runestones. No need for more lab options for me to
// ║ choose from, but show these generated ones in the lab after creating the image request."
// ║ One card per spirit (ZSPIRIT40, 07zt): its name, old trade, realm and look (his three picks — Ancestor, Lantern folk, Aurora-robed — or a blend), bound and
// ║ freed, from the wave 55 sheets (tools/sprites/round54.ps1). Notes per card welcome (a ☆ marks a favourite; nothing to choose).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZSPIRIT40==='undefined')return; LBR.TABS.push('spirits40');
  var M=(typeof ZSCN_META!=='undefined'&&ZSCN_META)||{items:{}}, IMG={}, tried={}, REALM=['','Grasslands','Wetlands','Highlands','Ashlands'], ICO=['','🌿','💧','⛰','🔥'];
  var page=function(pg){ if(IMG[pg]||tried[pg])return IMG[pg]; tried[pg]=1; var im=new Image(); im.onload=function(){ IMG[pg]=im; }; im.onerror=function(){ if(!im._b){ im._b=1; im.src='../assets/scenery/'+pg+'.webp'; } }; im.src='assets/scenery/'+pg+'.webp'; return null; };
  var draw=function(c,id,cx,foot,h,mw){ var it=M.items[id]; if(!it)return false; var im=page(it[0]); if(!im)return false; var s=Math.min(h/it[4],mw/it[3],2.6); c.imageSmoothingEnabled=true; c.imageSmoothingQuality='high'; c.drawImage(im,it[1],it[2],it[3],it[4],cx-it[3]*s/2,foot-it[4]*s,it[3]*s,it[4]*s); return true; };
  var BY={}; ZSPIRIT40.forEach(function(r){ BY[r[0]]=r; });
  var AGE={grown:'',old:'old ',young:'young ',child:'child, '};
  LBR.drawers.spirits40=function(cv,c,W,H,t,full,id){ var r=BY[id]; if(!r)return; var acc=['','#2e4a34','#24404a','#4a4030','#4a3028'][r[3]]; c.fillStyle=acc; c.fillRect(0,0,W,H);
    var ok=0; ['_bound','_free'].forEach(function(sfx,i){ var cx=W*(i+0.5)/2, bob=i?Math.sin((t||0)*2+r[0].length)*3:0; if(draw(c,'sp_u_'+r[0]+sfx,cx,H-12+bob,H*0.8,W*0.46))ok++; c.fillStyle='rgba(255,255,255,.65)'; c.font='11px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText(i?'freed':'bound',cx,14); });
    if(!ok){ c.fillStyle='#cfe0f4'; c.font='13px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText('Waiting for the painted sheet',W/2,H/2-6); c.fillStyle='#8aa0b8'; c.font='11px "Segoe UI",sans-serif'; c.fillText('tools\\sprites\\round54.ps1 (wave 55)',W/2,H/2+12); } };
  LAB_TABS.push({ id:'spirits40', name:'The forty spirits',
    blurb:'<b>Round 54 — forty spirits, one for every bindstone.</b> Built from your picks (Ancestor warrior, Lantern folk, Aurora-robed, and blends of them): each has its own name, its old trade, its realm\'s colours and an age. Bound they dig in chains with their tools hanging forgotten at the belt; freed they hold the tools of their trade. Painted in wave 55 — nothing to choose here, but notes on any card are welcome.',
    designs:ZSPIRIT40.map(function(r){ return {id:r[0],name:r[1]}; }),
    render:function(){ setTimeout(LBR.bind,0); var h=''; for(var q=1;q<=4;q++){ h+=LBR.sec(ICO[q]+' '+REALM[q],'the ten bindstones of the '+REALM[q])+'<div class="br-grid">'+ZSPIRIT40.filter(function(r){ return r[3]===q; }).map(function(r,i){
        return LBR.card('spirits40',{id:r[0],name:r[1]+' — once '+r[2].replace(/^an? /,''),desc:(r[5]==='child'?(r[6]==='m'?'boy':'girl'):(AGE[r[5]]||'')+(r[6]==='m'?'man':'woman'))+' · '+(ZSPIRIT40.STYLE[r[4]]||r[4])},(q-1)*10+i,360,260,''); }).join('')+'</div>'; } return h; } });
})();
