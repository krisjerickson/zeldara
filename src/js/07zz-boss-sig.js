// ═══════════════════════════════════════════════════════════════════════
// ║ SIGNATURE ELEMENTS (round 8). Kris: every multi-phase boss keeps its
// ║ colours and some design elements (a hat, a glowing gem, a crown, the
// ║ background effect) through ALL its phases, even when the body changes
// ║ archetype (a witch becomes a hydra, a warlock becomes a spider).
// ║
// ║ A design's  sig:{…}  paints the same element onto any archetype, using the
// ║ anchor points each painter records (BA.anc: head / chest / shoulders):
// ║   crown: 'float' (hovering white crown) | 'spike' (spiked crown) | 'gold'
// ║   crownCol, hat: colour (witch hat), mark: 'hourglass'|'star'|'gem', markCol
// ║   rocks: true (boulder crust on the shoulders), rockCol
// ║   magma: true (glowing cracks over the whole body)
// ║   swoosh: colour (a blazing arc on the wind-up / strike frames)
// ║   aura: background effect on the back layer — 'runes' 'coins' 'mist' 'storm'
// ║         'shards' 'forge' 'lava' 'eclipse' 'dawn'
// ║   trail: 'lava'|'smoke'|… (in game: the rig drops embers as it moves)
// ═══════════════════════════════════════════════════════════════════════
BA.SIG_CY={orb:-96,wyvern:-112,golem:-72,hum:-72,drake:-62,wyrm:-84,spider:-54,kraken:-74,bird:-70,toad:-50};
BA.sigPad=function(D,box){ var S=D.sig; if(S.crown||S.hat)box[2]-=28; if(S.rocks)box[2]-=(S.rocks==='spires'?48:36)*(S.rockSize||1); if(/storm|runes|shards|forge|lava|coins|mist/.test(S.aura||'')&&D.arch==='hum'){ box[0]-=18; box[1]+=18; } if(S.aura==='storm')box[2]-=10; if(S.aura==='eclipse'||S.aura==='dawn'){ box[2]-=46; box[0]-=20; } if(S.swoosh){ box[0]-=14; box[1]+=14; box[3]+=18; } };
// ── back layer (unit space, feet at 0,0) ──
BA.sigBack=function(x,D,box){ var S=D.sig, c=D.pal, k=S.aura; if(!k)return; var cy=BA.SIG_CY[D.arch]||-70, R=BA.rnd(BA.hash(D.id)+77), ac=S.auraCol||c.g, i;
  x.save();
  if(k==='runes'){ x.strokeStyle=rgba(ac,0.7); x.lineWidth=1.4; BA.ell(x,0,cy,64,64); x.stroke(); BA.ell(x,0,cy,56,56); x.stroke(); x.lineWidth=1.2;
    for(i=0;i<16;i++){ var an=i/16*Math.PI*2; x.save(); x.translate(Math.cos(an)*60,cy+Math.sin(an)*60); x.rotate(an); x.beginPath(); x.moveTo(0,-3); x.lineTo(0,3); x.moveTo(0,-1); x.lineTo(2.2,-3); if(i%3===0){ x.moveTo(0,1); x.lineTo(-2.2,3); } x.stroke(); x.restore(); }
    x.globalCompositeOperation='lighter'; for(i=0;i<4;i++){ var a2=i*Math.PI/2+0.4; BA.glow(x,Math.cos(a2)*60,cy+Math.sin(a2)*60,6,ac,0.8); } }
  else if(k==='coins'){ for(i=0;i<26;i++){ var gx=(R()-0.5)*150, gy=-2-R()*10-(i>20?R()*60:0); BA.ell(x,gx,gy,3.4,i>20?3.4:1.6); x.fillStyle=i%3?'#e8c040':'#c89020'; x.fill(); x.strokeStyle='rgba(60,30,0,.6)'; x.lineWidth=0.6; x.stroke(); if(i%4===0){ x.save(); x.globalCompositeOperation='lighter'; BA.glow(x,gx,gy,6,'#ffe890',0.9); x.restore(); } } }
  else if(k==='mist'){ x.globalCompositeOperation='lighter'; for(i=0;i<6;i++){ var mx=(R()-0.5)*130, my=-8-R()*50; x.fillStyle=BA.rad(x,mx,my,2,36,[[0,rgba(ac,0.22)],[1,rgba(ac,0)]]); BA.ell(x,mx,my,42,14,(R()-0.5)*0.4); x.fill(); }
    x.strokeStyle=rgba(ac,0.35); x.lineWidth=1.3; for(i=0;i<4;i++){ var wx=(R()-0.5)*110, wy=-20-R()*70; x.beginPath(); x.moveTo(wx,wy); x.bezierCurveTo(wx+14,wy-10,wx+28,wy+6,wx+40,wy-6); x.stroke(); } }
  else if(k==='storm'){ var top=cy-66; for(i=0;i<11;i++){ var sx=-72+i*14.4, sy=top+Math.sin(i*1.3)*5, r=12+R()*7; BA.ell(x,sx,sy,r,r*0.7); x.fillStyle=BA.rad(x,sx-3,sy-4,1,r,[[0,shade(c.b,0.35)],[1,shade(c.b,0.05)]]); x.fill(); }
    x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(ac,0.9); x.lineWidth=1.5; for(i=0;i<3;i++){ var lx=-50+i*50+(R()-0.5)*16, ly=top+8; x.beginPath(); x.moveTo(lx,ly); x.lineTo(lx+(R()-0.5)*10,ly+12); x.lineTo(lx+(R()-0.5)*8,ly+20); x.lineTo(lx+(R()-0.5)*12,ly+34); x.stroke(); BA.glow(x,lx,ly+6,10,ac,0.5); } }
  else if(k==='shards'){ for(i=0;i<9;i++){ var sa=i/9*Math.PI*2+0.3, px=Math.cos(sa)*74, py=cy+Math.sin(sa)*50, L=8+R()*8; x.save(); x.translate(px,py); x.rotate(sa+Math.PI/2);
      x.beginPath(); x.moveTo(0,-L); x.lineTo(3.5,0); x.lineTo(0,L*0.5); x.lineTo(-3.5,0); x.closePath(); x.fillStyle=rgba(ac,0.8); x.fill(); x.strokeStyle='rgba(255,255,255,.8)'; x.lineWidth=0.7; x.stroke(); x.restore();
      x.save(); x.globalCompositeOperation='lighter'; BA.glow(x,px,py,9,ac,0.45); x.restore(); } }
  else if(k==='forge'){ var gr=62; x.strokeStyle=rgba(c.m,0.8); x.lineWidth=3; BA.ell(x,0,cy,gr,gr); x.stroke(); x.fillStyle=rgba(c.m,0.8);
    for(i=0;i<18;i++){ var ga=i/18*Math.PI*2; x.save(); x.translate(Math.cos(ga)*gr,cy+Math.sin(ga)*gr); x.rotate(ga); x.fillRect(-1,-3.5,7,7); x.restore(); }
    x.globalCompositeOperation='lighter'; for(i=0;i<14;i++){ var fa=R()*Math.PI*2, fr=gr*(0.5+R()*0.7); BA.glow(x,Math.cos(fa)*fr,cy+Math.sin(fa)*fr,2.5+R()*2,ac,0.9); } }
  else if(k==='lava'){ x.globalCompositeOperation='lighter'; x.fillStyle=BA.rad(x,0,-6,4,90,[[0,rgba(ac,0.4)],[1,rgba(ac,0)]]); BA.ell(x,0,-6,96,20); x.fill();
    for(i=0;i<11;i++){ var fx=-80+i*16+(R()-0.5)*6, fh=18+R()*34; x.fillStyle=BA.lin(x,fx,-4,fx,-4-fh,[[0,rgba(ac,0.85)],[0.6,rgba('#ffd070',0.45)],[1,rgba('#ffd070',0)]]); x.beginPath(); x.moveTo(fx-6,-2); x.quadraticCurveTo(fx-4,-fh*0.6,fx+(R()-0.5)*6,-fh); x.quadraticCurveTo(fx+5,-fh*0.5,fx+6,-2); x.fill(); } }
  else if(k==='eclipse'||k==='dawn'){ var ex=D.arch==='wyvern'?60*(D.torso||1)*(D.bulk||1)+24:-38, ey=D.arch==='wyvern'?-214:cy-74, er=D.arch==='wyvern'?20:17; x.save(); x.globalCompositeOperation='lighter';
    for(i=0;i<(k==='dawn'?18:12);i++){ var ra=i/(k==='dawn'?18:12)*Math.PI*2, L2=er*(k==='dawn'?2.4:1.7)+(i%2)*8; x.strokeStyle=rgba(k==='dawn'?(i%2?'#fff0a0':'#ffb040'):ac,k==='dawn'?0.8:0.55); x.lineWidth=k==='dawn'?2:1.4; x.beginPath(); x.moveTo(ex+Math.cos(ra)*er*1.05,ey+Math.sin(ra)*er*1.05); x.lineTo(ex+Math.cos(ra)*L2,ey+Math.sin(ra)*L2); x.stroke(); }
    x.fillStyle=BA.rad(x,ex,ey,er*0.9,er*1.7,[[0,rgba(k==='dawn'?'#fff4c0':ac,0.9)],[1,rgba(k==='dawn'?'#ffd070':ac,0)]]); BA.ell(x,ex,ey,er*1.7,er*1.7); x.fill(); x.restore();
    BA.ell(x,ex,ey,er,er); x.fillStyle='#06060a'; x.fill(); if(k==='dawn'){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba('#fff4c0',0.95); x.lineWidth=1.6; BA.ell(x,ex,ey,er*1.04,er*1.04); x.stroke(); x.restore(); } }
  x.restore(); };

// ── body frames: drawn in canvas px at the recorded anchors ──
BA.sigBody=function(x,D,f,box,k){ var S=D.sig, c=D.pal, A=BA._A; x.save(); x.setTransform(1,0,0,1,0,0);
  var H=A.head, C=A.chest;
  if(S.aura==='storm'||S.aura==='runes'||S.aura==='shards'){} // (aura lives on the back layer)
  // rocky crust on the shoulders (mountain-like bulk)
  if(S.rocks==='spires'){ var sc2=S.rockCol||'#6e665c';
    (S.rockHead?['shL','shR','head']:['shL','shR']).forEach(function(n,j){ var a=A[n]; if(!a)return; var Rn=BA.rnd(BA.hash(D.id)+j*31), m=j===2?3:5, rs=S.rockSize||1, side=j===0?-1:j===1?1:0;
      var L=[]; for(var i=0;i<m;i++){ var t=m>1?i/(m-1):0.5, base=a.x+side*a.r*(0.1+t*0.9)+(side===0?(t-0.5)*a.r*2.2:0), lean=(side||((t-0.5)*2))*(0.15+t*0.55), len=a.r*(j===2?1.0:1.5+Math.sin(t*Math.PI)*1.3)*rs*(0.8+Rn()*0.35), w=a.r*(j===2?0.22:0.34)*(0.85+Rn()*0.3)*Math.min(1.3,rs); L.push([base,a.y+a.r*0.15,lean,len,w]); }
      L.sort(function(p,q){ return q[3]-p[3]; }).forEach(function(q){ var bx=q[0], by=q[1], tx=bx+Math.sin(q[2])*q[3], ty=by-Math.cos(q[2])*q[3], w=q[4], nx=Math.cos(q[2])*w, ny=Math.sin(q[2])*w;
        x.beginPath(); x.moveTo(bx-nx,by-ny); x.quadraticCurveTo((bx+tx)/2-nx*0.55,(by+ty)/2-ny*0.55,tx,ty); x.quadraticCurveTo((bx+tx)/2+nx*0.55,(by+ty)/2+ny*0.55,bx+nx,by+ny); x.closePath();
        x.fillStyle=BA.lin(x,bx-nx,by,bx+nx,by,[[0,shade(sc2,0.35)],[0.45,sc2],[1,shade(sc2,-0.5)]]); x.fill(); x.strokeStyle='rgba(12,8,14,.8)'; x.lineWidth=Math.max(1,w*0.14); x.stroke();
        x.strokeStyle=rgba(shade(sc2,-0.45),0.7); x.lineWidth=Math.max(0.7,w*0.08); for(var b2=1;b2<4;b2++){ var bt=b2/4.2, mx=bx+(tx-bx)*bt, my=by+(ty-by)*bt, ww=w*(1-bt)*0.9; x.beginPath(); x.moveTo(mx-Math.cos(q[2])*ww,my-Math.sin(q[2])*ww); x.lineTo(mx+Math.cos(q[2])*ww,my+Math.sin(q[2])*ww+ww*0.2); x.stroke(); }
        if(S.magma||S.rockGlow){ x.save(); x.globalCompositeOperation='lighter'; BA.glow(x,tx,ty,w*0.8,c.g,0.6); x.restore(); } }); }); }
  else if(S.rocks){ var rc=S.rockCol||'#6e665c'; (S.rockHead?['shL','shR','head']:['shL','shR']).forEach(function(n,j){ var a=A[n]; if(!a)return; var Rn=BA.rnd(BA.hash(D.id)+j*31), m=j===2?5:8, rs=S.rockSize||1;
      for(var i=0;i<m;i++){ var rx=a.x+(j===2?(Rn()<0.5?-1:1)*a.r*(1+Rn()*0.8):(Rn()-0.5)*a.r*1.8*rs+(j===0?-a.r*0.3:a.r*0.3)), ry=a.y-a.r*(j===2?0.1:0.4)*rs-Rn()*a.r*(j===2?0.5:1.1)*rs, s=a.r*(0.35+Rn()*0.4)*(j===2?0.55:1)*rs;
        x.beginPath(); for(var p=0;p<6;p++){ var pa=p/6*Math.PI*2+Rn()*0.5, pr=s*(0.75+Rn()*0.35); if(p)x.lineTo(rx+Math.cos(pa)*pr,ry+Math.sin(pa)*pr*0.85); else x.moveTo(rx+Math.cos(pa)*pr,ry+Math.sin(pa)*pr*0.85); } x.closePath();
        x.fillStyle=BA.lin(x,rx-s,ry-s,rx+s,ry+s,[[0,shade(rc,0.3)],[0.5,rc],[1,shade(rc,-0.45)]]); x.fill(); x.strokeStyle='rgba(12,8,14,.75)'; x.lineWidth=Math.max(1,s*0.12); x.stroke();
        if(S.magma||S.rockGlow){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.7); x.lineWidth=Math.max(0.8,s*0.08); x.beginPath(); x.moveTo(rx-s*0.4,ry); x.lineTo(rx+s*0.1,ry+s*0.2); x.lineTo(rx+s*0.3,ry-s*0.3); x.stroke(); x.restore(); } } }); }
  // glowing cracks over the whole silhouette
  if(S.magma){ var W=x.canvas.width, Hh=x.canvas.height, R=BA.rnd(BA.hash(D.id)+f*3+1); x.save(); x.globalCompositeOperation='source-atop'; x.lineCap='round';
    for(var cr=0;cr<(S.magmaN||22);cr++){ var sx=W*(0.1+R()*0.8), sy=Hh*(0.15+R()*0.8), ln=W*0.03+R()*W*0.05; x.strokeStyle=rgba(cr%3?c.g:'#ffe080',0.9); x.lineWidth=Math.max(1,k*(1+R()*0.8)); x.beginPath(); x.moveTo(sx,sy); for(var sg=0;sg<3;sg++){ sx+=(R()-0.5)*ln; sy+=R()*ln*0.8; x.lineTo(sx,sy); } x.stroke(); }
    x.restore(); }
  // chest emblem: the same star / hourglass / gem in every phase
  if(S.mark&&C){ var mc=S.markCol||c.g, r=C.r*(S.markSize||1), cx=C.x, cy=C.y; x.save(); x.globalCompositeOperation='lighter'; BA.glow(x,cx,cy,r*2.6,mc,0.8); x.restore();
    x.save(); x.translate(cx,cy);
    if(S.mark==='star'){ x.beginPath(); for(var i=0;i<16;i++){ var a=i/16*Math.PI*2-Math.PI/2, rr=i%2?r*0.38:(i%4===0?r*1.15:r*0.72); if(i)x.lineTo(Math.cos(a)*rr,Math.sin(a)*rr); else x.moveTo(Math.cos(a)*rr,Math.sin(a)*rr); } x.closePath(); x.fillStyle=BA.rad(x,0,0,0,r,[[0,'#ffffff'],[0.35,shade(mc,0.4)],[1,mc]]); x.fill(); x.strokeStyle='rgba(20,10,4,.7)'; x.lineWidth=Math.max(0.8,r*0.08); x.stroke(); }
    else if(S.mark==='heart'){ var hb=1+[0,0.04,0.12,0.06][f]; x.scale(hb,hb); x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(mc,0.7); x.lineWidth=Math.max(1,r*0.08); [-1,1].forEach(function(sg2){ for(var v=0;v<3;v++){ x.beginPath(); x.moveTo(sg2*r*0.3,-r*0.2+v*r*0.3); x.quadraticCurveTo(sg2*r*(1.2+v*0.2),-r*(0.6-v*0.4),sg2*r*(1.8+v*0.3),r*(0.1+v*0.35)); x.stroke(); } }); x.restore();
      x.beginPath(); x.moveTo(0,r*0.95); x.bezierCurveTo(-r*1.3,r*0.1,-r*0.9,-r*1.05,0,-r*0.45); x.bezierCurveTo(r*0.9,-r*1.05,r*1.3,r*0.1,0,r*0.95); x.closePath(); x.fillStyle=BA.rad(x,-r*0.2,-r*0.2,1,r*1.2,[[0,'#fff0a0'],[0.35,mc],[0.85,c.a],[1,c.b]]); x.fill(); x.strokeStyle='rgba(20,6,4,.85)'; x.lineWidth=Math.max(1,r*0.1); x.stroke(); }
    else if(S.mark==='hourglass'){ x.beginPath(); x.moveTo(-r*0.7,-r); x.lineTo(r*0.7,-r); x.lineTo(r*0.08,0); x.lineTo(r*0.7,r); x.lineTo(-r*0.7,r); x.lineTo(-r*0.08,0); x.closePath(); x.globalCompositeOperation='lighter'; x.fillStyle=rgba(mc,0.95); x.fill(); x.globalCompositeOperation='source-over'; x.strokeStyle='rgba(10,20,16,.6)'; x.lineWidth=Math.max(0.7,r*0.08); x.stroke(); }
    else { x.beginPath(); x.moveTo(0,-r); x.lineTo(r*0.7,0); x.lineTo(0,r); x.lineTo(-r*0.7,0); x.closePath(); x.fillStyle=BA.lin(x,-r,-r,r,r,[[0,'#ffffff'],[0.4,mc],[1,shade(mc,-0.4)]]); x.fill(); x.strokeStyle='rgba(12,8,14,.75)'; x.lineWidth=Math.max(0.8,r*0.09); x.stroke(); }
    x.restore(); }
  // witch hat (the same hat on the witch, the hag and the hydra)
  if(S.hat&&H){ var hr=H.r*(S.hatSize||1), hx=H.x, hy=H.y+hr*0.25, hc=S.hat; x.save(); x.translate(hx,hy); x.rotate(S.hatTilt||-0.12);
    x.beginPath(); x.moveTo(-hr*1.9,0); x.quadraticCurveTo(0,hr*0.45,hr*1.9,0); x.quadraticCurveTo(0,-hr*0.5,-hr*1.9,0); x.fillStyle=shade(hc,-0.1); x.fill(); x.strokeStyle='rgba(12,8,14,.8)'; x.lineWidth=Math.max(1,hr*0.1); x.stroke();
    x.beginPath(); x.moveTo(-hr*1.05,-hr*0.1); x.quadraticCurveTo(-hr*0.35,-hr*1.7,hr*1.7,-hr*2.4); x.quadraticCurveTo(hr*0.5,-hr*1.2,hr*1.05,-hr*0.1); x.closePath(); x.fillStyle=BA.lin(x,-hr,-hr*2.4,hr,0,[[0,shade(hc,0.25)],[1,shade(hc,-0.3)]]); x.fill(); x.stroke();
    x.fillStyle=S.hatBand||c.m; x.fillRect(-hr*1.0,-hr*0.42,hr*2.0,hr*0.3); if(S.hatBuckle!==false){ x.fillStyle=c.g; x.fillRect(-hr*0.18,-hr*0.46,hr*0.36,hr*0.38); }
    x.restore(); }
  // crowns
  if(S.crown&&H){ var cr2=H.r*(S.crownSize||1), cx2=H.x, top=H.y-(S.crown==='float'?cr2*0.9:-cr2*0.3), ccol=S.crownCol||(S.crown==='float'?'#f4f8ff':S.crown==='spike'?'#8a8a98':'#e8c040'), n=S.crown==='spike'?5:4, cw=cr2*1.05, hgt=S.crown==='spike'?cr2*1.2:cr2*0.8;
    if(S.crown==='float'){ top+=[0,-1,-2,1][f]*H.s; x.save(); x.globalCompositeOperation='lighter'; BA.glow(x,cx2,top-hgt*0.3,cr2*2.2,S.crownGlow||c.g,0.7); x.restore(); }
    x.beginPath(); x.moveTo(cx2-cw,top); for(var q=0;q<=n*2;q++){ var qx=cx2-cw+cw*2*q/(n*2), qy=top-hgt*0.35-(q%2?0:hgt*0.65); x.lineTo(qx,q%2?top-hgt*0.3:qy); } x.lineTo(cx2+cw,top); x.closePath();
    x.fillStyle=BA.lin(x,cx2,top-hgt,cx2,top,[[0,shade(ccol,0.35)],[1,shade(ccol,-0.3)]]); x.fill(); x.strokeStyle='rgba(12,8,14,.75)'; x.lineWidth=Math.max(0.8,cr2*0.09); x.stroke();
    x.save(); x.globalCompositeOperation='lighter'; for(var g=0;g<=n;g++){ var gx=cx2-cw+cw*2*g/n; BA.glow(x,gx,top-hgt,cr2*0.28,S.crownGlow||c.g,0.9); } x.restore();
    if(S.crown==='float'){ x.strokeStyle=rgba(S.crownGlow||c.g,0.7); x.lineWidth=Math.max(0.7,cr2*0.06); x.setLineDash([cr2*0.2,cr2*0.25]); x.beginPath(); x.ellipse(cx2,top+cr2*0.15,cw*1.25,cr2*0.28,0,0,Math.PI*2); x.stroke(); x.setLineDash([]); } }
  // blazing weapon arc: faint on the wind-up, full on the strike
  if(S.swoosh&&C&&f>=2){ var sc=S.swoosh, R2=C.r*(S.swooshR||6), sx2=C.x+R2*0.1, sy2=C.y; x.save(); x.globalCompositeOperation='lighter'; x.lineCap='round';
    var a0=f===2?-2.6:-1.5, a1=f===2?-0.9:1.1; var LAY=[[sc,0.28,12],[sc,0.45,8.5],['#ff9040',0.6,5.5],['#ffd070',0.75,3],['#fff4c0',0.85,1.4]]; LAY.forEach(function(L,w){ x.strokeStyle=rgba(L[0],L[1]*(f===2?0.45:1)); x.lineWidth=C.s*L[2]; x.beginPath(); x.arc(sx2,sy2,R2*(1-w*0.02),a0+w*0.16,a1,false); x.stroke(); });
    x.restore(); }
  x.restore(); };
