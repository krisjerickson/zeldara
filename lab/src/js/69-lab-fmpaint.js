// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 59 — "Forge-masters" tab: the painted forge-masters (wave 7.6). Kris: "i don't see the art for the forge masters, make a place for this in
// ║ the lab". Brokk, Hissa, Krag and Sinda, a form for every phase: each card plays the form's painted sheet (standing, walking, striking) from the
// ║ sprite previews (tools/sprites/intake.py → sprites/preview), with every cut frame in a strip below. ☆ the forms that look right; notes welcome.
// ║ Also LAB_ACTIVE: the tabs shown as buttons (Kris: "condense previous lab choices down as there are too many buttons") — the rest sit in the
// ║ "Earlier rounds" drop-down (30-lab-core renderTabs).
// ═══════════════════════════════════════════════════════════════════════
var LAB_ACTIVE=['fmpaint','muspel','sagaart','bosses','sprlib'];
(function(){ if(typeof LBR==='undefined'||typeof FORGE_FAMS==='undefined')return; LBR.TABS.push('fmpaint');
  var PV=(typeof ZSPR_PREVIEW!=='undefined'&&ZSPR_PREVIEW)||{}, IMG={}, tried={};
  var page=function(pg){ if(IMG[pg]||tried[pg])return IMG[pg]; tried[pg]=1; var im=new Image(); im.onload=function(){ IMG[pg]=im; }; im.onerror=function(){ if(!im._b){ im._b=1; im.src='../sprites/preview/'+pg+'.webp'; } }; im.src='preview/'+pg+'.webp'; return null; };
  var sheet=function(slot,kind){ var ks=[slot+'.'+kind+'.s',slot+'.'+kind+'.q',slot+'.'+kind]; for(var i=0;i<ks.length;i++)if(PV[ks[i]])return PV[ks[i]]; return null; };
  var frame=function(c,E,i,cx,foot,h,mw){ if(!E)return false; var im=page(E.page); if(!im)return false; var cw=E.cell[0], ch=E.cell[1], s=Math.min(h/ch,mw/cw); c.imageSmoothingEnabled=true; c.imageSmoothingQuality='high'; c.drawImage(im,E.x+i*cw,E.y,cw,ch,cx-cw*s/2,foot-ch*s,cw*s,ch*s); return true; };
  // the main sheet: 1–2 standing, 3–6 walking, 7–8 striking (07zs ZSPR) — played as a little loop: stand, walk, strike
  var SEQ=[[0,1,0,1],[2,3,4,5,2,3,4,5],[6,7,7,6]];
  var BY={}, L=[]; FORGE_FAMS.forEach(function(f){ f[3].forEach(function(lbl,i){ var id='fm_'+f[0]+'_'+(i+1), D=typeof BA!=='undefined'&&BA.of(id); var o={id:id,fam:f,ph:i+1,lbl:lbl,name:(D&&D.name)||f[2]}; BY[id]=o; L.push(o); }); });
  LBR.drawers.fmpaint=function(cv,c,W,H,t,full,id){ var o=BY[id]; if(!o)return; t=t||0; var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#1a0f0c'); g.addColorStop(1,'#2e1610'); c.fillStyle=g; c.fillRect(0,0,W,H);
    var E=sheet(o.id,'core'), X=sheet(o.id,'extra'), F=sheet(o.id,'fb');
    if(!E){ c.fillStyle='#ffd2a8'; c.font='13px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText('Not painted yet',W/2,H/2); return; }
    var all=[], k=Math.floor(t*6); SEQ.forEach(function(s){ all=all.concat(s); }); var fi=all[k%all.length], st=fi<2?'standing':fi<6?'walking':'striking';
    c.fillStyle='rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(W/2,H-68,W*0.22,10,0,0,Math.PI*2); c.fill();
    if(!frame(c,E,fi,W/2,H-64,H-96,W*0.9)){ c.fillStyle='#c8a890'; c.font='12px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText('loading…',W/2,H/2); }
    c.fillStyle='rgba(255,220,180,.6)'; c.font='11px "Segoe UI",sans-serif'; c.textAlign='right'; c.fillText(st,W-10,16);
    // the strip: every cut frame of the main sheet, then the extras (special moves, the fall) and front / back
    var strip=[], n0=(E.n||8); for(var a=0;a<n0;a++)strip.push([E,a]); if(X)for(var b=0;b<(X.n||8);b++)strip.push([X,b]); if(F)for(var d=0;d<Math.min(4,F.n||8);d++)strip.push([F,d]);
    var sw=Math.min(40,(W-12)/strip.length); strip.forEach(function(q,i){ frame(c,q[0],q[1],6+sw*(i+0.5),H-6,48,sw-2); }); };
  LAB_TABS.push({ id:'fmpaint', name:'Forge-masters',
    blurb:'<b>Round 59 — the forge-masters, painted.</b> Brokk, Hissa, Krag and Sinda, a new form for every phase (the designs chosen so each keeps its head and colours). Each card plays the painted sheet the game uses — standing, walking, striking — with every cut frame (special moves, the fall, front and back) in the strip below. ☆ the forms that look right; notes on anything to repaint.',
    designs:L.map(function(o){ return {id:o.id,name:o.name}; }),
    render:function(){ setTimeout(LBR.bind,0); var n=0; return FORGE_FAMS.map(function(f){ return LBR.sec('🔥 '+f[2],f[1]+' · three phases, a form each')+'<div class="br-grid">'+[1,2,3].map(function(i){ var o=BY['fm_'+f[0]+'_'+i]; return LBR.card('fmpaint',{id:o.id,name:'Phase '+i+' · '+o.name,desc:o.lbl},n++,420,330,''); }).join('')+'</div>'; }).join(''); } });
})();
