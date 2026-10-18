// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 64 — Grímnir as a god in the Bosses tab (👑 Grímnir). Kris: "i'm not seeing them transition between brilliant and bright
// ║ and dark and ominous" — every new option (grim_N .d .e .f) is drawn PULSING the way its form fights (ZGOD.light, 07zz-boss-grimnir2):
// ║ radiant — white light pours out in rays and he is shielded; black — he turns to a silhouette, the light is sucked into him and
// ║ only his one eye burns — open to hits. Form 1 mostly light, form 2 even, form 3 mostly black (Kris's card).
// ║ When the painted concept options arrive (scenery wave 66, tools\sprites\round64.ps1) each card cross-fades the painted radiant and
// ║ black versions instead of the drawn stand-in. The name options sit above the forms.
// ═══════════════════════════════════════════════════════════════════════
var LGOD={ IMG:{}, tried:{}, oc:null,
  M:function(){ return (typeof ZSCN_META!=='undefined'&&ZSCN_META)||{items:{}}; },
  img:function(id){ var it=LGOD.M().items[id]; if(!it)return null; if(LGOD.IMG[id])return LGOD.IMG[id]; if(LGOD.tried[id])return null; LGOD.tried[id]=1; var im=new Image();
    im.onload=function(){ LGOD.IMG[id]={im:im,r:it}; }; im.onerror=function(){ if(!im._b){ im._b=1; im.src='../assets/scenery/'+it[0]+'.webp'; } }; im.src='assets/scenery/'+it[0]+'.webp'; return null; },
  painted:function(D){ var k='gd_'+D.id.replace('.','_'); return {lt:LGOD.img(k),dk:LGOD.img(k+'_dk')}; },
  intro:function(){ var p=LabApp.picks['bosses-grim_name']||{}, pk=LBB.pickOf('grim_name');
    var cards=GRIM_NAMES.map(function(n,i){ return '<article class="gn-card'+(pk===i?' on':'')+'"><b>'+n[0]+', '+n[1]+'</b><span class="gn-say">say it: '+n[2]+'</span><p>'+n[3]+'</p><button class="vbtn bb-name" data-i="'+i+'" aria-pressed="'+(pk===i)+'">'+(pk===i?'✓ Chosen':'Choose this')+'</button></article>'; }).join('');
    return '<section class="bb-fam gn-wrap"><h4>His name</h4><p class="gn-lead">You asked for names that sound more god-like. The false god wears Odin\'s own names, so most are those; the last two were made for him. The game uses <b>Grímnir, the Masked King</b> until you choose.</p><div class="gn-grid">'+cards+'</div>'+
      '<textarea class="mn-notes bb-notes" data-slot="grim_name" rows="1" placeholder="Another name, or mix a name with another title…">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea></section>'+
      '<section class="bb-fam gn-wrap"><h4>How he fights now (your cards)</h4><p class="gn-lead">He swings between <b>☀ radiant</b> — white light pours out of him, he is <b>shielded</b> and throws light — and <b>● black</b> — he turns to a silhouette, the room darkens, the light is sucked into him and only his eye burns: <b>that is when your hits land</b>. Godsbane tears the light off him at once. Form 1 is mostly light (≈ 6½ s light / 1½ s black), form 2 even (4 s / 4 s), form 3 mostly black (1½ s / 6½ s). The NEW cards below pulse exactly that way; the bar on each card shows the beat.</p></section>'; },
  // one card: the drawn (or painted) god at the right point of his beat
  draw:function(cv,D,t){ var x=cv.getContext('2d'), W=cv.width, H=cv.height, form=D.form||+String(D.id).charAt(5)||2, lt=ZGOD.light(form,t), dk=1-lt, cx=W/2, cy=H-30;
    x.save(); x.globalCompositeOperation='source-over'; x.globalAlpha=1; x.fillStyle='#0a0e18'; x.fillRect(0,0,W,H);
    var M=BA.MOTION[D.motion]||BA.MOTION.glide, st=M.pose(t,LBB.moving?1:0.3,D), s=Math.min(1.6,(H-56)/(D.h*1.24)), u=(D.h/100)*(D._kfix||1)*s, chestY=cy+st.y*s-112*u;
    // radiance behind him / the dark drawing in
    var g=x.createRadialGradient(cx,chestY,6,cx,chestY,W*0.72); g.addColorStop(0,'rgba(255,246,214,'+(0.45*lt)+')'); g.addColorStop(0.45,'rgba(255,230,170,'+(0.14*lt)+')'); g.addColorStop(1,'rgba(255,230,170,0)'); x.fillStyle=g; x.fillRect(0,0,W,H);
    if(lt>0.02){ x.save(); x.globalCompositeOperation='lighter'; for(var i=0;i<18;i++){ var a=i/18*Math.PI*2+t*0.12, w=0.035+0.02*Math.sin(i*1.7), L=W*(0.62+0.18*Math.sin(i*2.3+t)); x.fillStyle='rgba(255,248,224,'+(0.1*lt)+')'; x.beginPath(); x.moveTo(cx,chestY); x.lineTo(cx+Math.cos(a-w)*L,chestY+Math.sin(a-w)*L); x.lineTo(cx+Math.cos(a+w)*L,chestY+Math.sin(a+w)*L); x.closePath(); x.fill(); } x.restore(); }
    if(dk>0.02){ x.fillStyle='rgba(0,0,0,'+(0.78*dk)+')'; x.fillRect(0,0,W,H); var g2=x.createRadialGradient(cx,chestY,4,cx,chestY,W*0.42); g2.addColorStop(0,'rgba(0,0,0,'+(0.9*dk)+')'); g2.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=g2; x.fillRect(0,0,W,H); }
    // the figure
    if(!LGOD.oc||LGOD.oc.width!==W||LGOD.oc.height!==H){ LGOD.oc=document.createElement('canvas'); LGOD.oc.width=W; LGOD.oc.height=H; LGOD.ow=document.createElement('canvas'); LGOD.ow.width=W; LGOD.ow.height=H; }
    var o=LGOD.oc.getContext('2d'); o.clearRect(0,0,W,H); var P=LGOD.painted(D);
    if(P.lt&&P.dk){ [[P.lt,lt],[P.dk,dk]].forEach(function(q){ if(q[1]<0.01)return; var r=q[0].r, k=Math.min((H-40)/r[4],(W-10)/r[3]); o.globalAlpha=q[1]; o.drawImage(q[0].im,r[1],r[2],r[3],r[4],cx-r[3]*k/2,H-14-r[4]*k,r[3]*k,r[4]*k); }); o.globalAlpha=1; x.drawImage(LGOD.oc,0,0); }
    else { BA.drawPreview(o,D,cx,cy,s,t,LBB.moving&&Math.floor(t*2)%5===4?(Math.floor(t*6)%2?3:2):(Math.floor(t*1.6)%2),{moving:LBB.moving}); x.drawImage(LGOD.oc,0,0);
      var w2=LGOD.ow.getContext('2d'); w2.clearRect(0,0,W,H); w2.globalCompositeOperation='source-over'; w2.drawImage(LGOD.oc,0,0); w2.globalCompositeOperation='source-atop';
      if(lt>0.02){ w2.fillStyle='#fff6dc'; w2.fillRect(0,0,W,H); x.save(); x.globalCompositeOperation='lighter'; x.globalAlpha=0.14*lt; x.drawImage(LGOD.ow,0,0); x.restore(); }
      if(dk>0.02){ w2.globalCompositeOperation='source-over'; w2.clearRect(0,0,W,H); w2.drawImage(LGOD.oc,0,0); w2.globalCompositeOperation='source-atop'; w2.fillStyle='#030306'; w2.fillRect(0,0,W,H); x.save(); x.globalAlpha=0.96*dk; x.drawImage(LGOD.ow,0,0); x.restore(); } }
    // the light being sucked into him
    if(dk>0.05){ x.save(); x.globalCompositeOperation='lighter'; for(var j=0;j<34;j++){ var p=(t*0.55+j/34)%1, a2=j*2.39996+p*1.6, r2=(1-p)*W*0.62+8; x.fillStyle='rgba(255,240,200,'+(dk*Math.sin(p*Math.PI)*0.85)+')'; x.beginPath(); x.arc(cx+Math.cos(a2)*r2,chestY+Math.sin(a2)*r2*0.8,1.2+1.6*(1-p),0,6.3); x.fill(); } x.restore(); }
    // the one eye
    var e=D._eyeU||[-3.8,-157], ex=cx+e[0]*u, ey=cy+st.y*s+e[1]*u; if(P.lt&&P.dk){ ex=cx-2; ey=H*0.28; }
    x.save(); x.globalCompositeOperation='lighter'; var g3=x.createRadialGradient(ex,ey,0,ex,ey,5+12*dk); g3.addColorStop(0,'rgba(255,255,255,'+(0.55+0.45*dk)+')'); g3.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=g3; x.fillRect(ex-20,ey-20,40,40); x.restore();
    // the beat: light and black for this form, and where he is in it
    var F=ZGOD.FORMS[form], T=ZGOD.T, Pd=F.L+F.D+2*T, bw=W-24, uu=((t%Pd)+Pd)%Pd; x.fillStyle='rgba(255,240,200,.85)'; x.fillRect(12,10,bw*(F.L+T)/Pd,5); x.fillStyle='#16161e'; x.fillRect(12+bw*(F.L+T)/Pd,10,bw*(F.D+T)/Pd,5); x.strokeStyle='rgba(255,255,255,.4)'; x.strokeRect(12,10,bw,5);
    x.fillStyle='#ffd070'; x.fillRect(12+bw*uu/Pd-1,7,2.5,11);
    x.font='600 11px "Segoe UI",sans-serif'; x.textAlign='left'; x.fillStyle=lt>0.5?'#fff2b0':'#c8d0e0'; x.fillText(lt>0.5?'☀ radiant — shielded':'● black — open to hits',12,32);
    x.textAlign='right'; x.fillStyle='rgba(200,208,224,.8)'; x.fillText(P.lt&&P.dk?'painted':'drawn stand-in',W-12,32); x.restore(); }
};
(function(){ var st=document.createElement('style'); st.textContent='.gn-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px;margin:6px 0 8px}.gn-card{background:var(--ink);border:1px solid var(--line);border-radius:10px;padding:8px 10px;display:flex;flex-direction:column;gap:3px}'+
  '.gn-card.on{border-color:var(--pick);box-shadow:0 0 0 1px var(--pick)}.gn-card b{font-family:var(--display);font-weight:400;font-size:1.02rem;letter-spacing:.02em}.gn-say{font-family:var(--mono);font-size:.72rem;color:var(--rune)}.gn-card p{margin:0;color:var(--muted);font-size:.8rem;line-height:1.35}'+
  '.gn-card .bb-name{align-self:flex-start;margin-top:4px}.bb-name[aria-pressed="true"]{border-color:var(--pick);color:var(--pick);background:rgba(127,216,154,.14)}.gn-lead{margin:0 0 4px;color:var(--muted);font-size:.86rem;line-height:1.45}.bb-god .bb-cv{background:#0a0e18}'+
  '.bb-opts:has(.bb-god){grid-template-columns:repeat(auto-fill,minmax(270px,1fr))}';
  document.head.appendChild(st); })();
