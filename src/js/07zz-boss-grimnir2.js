// ═══════════════════════════════════════════════════════════════════════
// ║ 07zz-boss-grimnir2.js — round 64. GRÍMNIR MADE GOD-LIKE (Kris, Oct 18): "the options shown to pick from are not god-like enough,
// ║ and i'm not seeing them transition between brilliant and bright and dark and ominous. Think of the final boss going back and forth
// ║ between brilliant white radiating out light (like the god they are pretending to be) but then also pulsing back to pure black and
// ║ sucking away all the light (showing the corrupted nature of the god)." His inspiration images are style only, made Nordic, not insect.
// ║ Cards: "the first form is mainly light, with slight pulses to dark, second is balanced between light and dark, pulsing between. the
// ║ last is mainly dark, with minor pulses back to light"; "make sure to also change when he is vulnerable".
// ║  • BA.ARCH.god — a painter of its own for a god: wings of light-feathers (raven quills), halos (rune ring, sun wheel, eclipse),
// ║    crowns of spear-points, antlers or ice, one-eyed masks (Grímnir — "the masked one" — is one of Odin's names), wolf-fur
// ║    and raven-feather mantles, Gungnir, a spearhead body that floats, a beard of light.
// ║  • Three new options for each form (grim_1/2/3 .d .e .f — NEW in the Lab; the old a–c are kept under Reference).
// ║  • ZGOD.light(form, t): the pulse — 1 radiant (shielded), 0 black (open to hits). The Lab cards and the fight (16i) share it.
// ║  • GRIM_NAMES: name options for the Lab (Kris: "Let's think about different names … give me some more options").
// ═══════════════════════════════════════════════════════════════════════
var ZGOD={
  // seconds of light and of black in one beat, per form; T = the turn between them
  FORMS:{1:{L:6.5,D:1.6},2:{L:4,D:4},3:{L:1.6,D:6.4}}, T:0.55,
  light:function(form,t){ var F=ZGOD.FORMS[form]||ZGOD.FORMS[2], T=ZGOD.T, P=F.L+F.D+2*T, u=((t%P)+P)%P, v;
    if(u<F.L){ v=1; if(F.L-u<0.7&&Math.sin(u*47)>0.55)v=0.62; }                         // a flicker just before he turns
    else if(u<F.L+T){ var a=(u-F.L)/T; v=1-a*a*(3-2*a); }
    else if(u<F.L+T+F.D){ v=0; if(F.D-(u-F.L-T)<0.6&&Math.sin(u*41)>0.6)v=0.3; }
    else { var b=(u-F.L-T-F.D)/T; v=b*b*(3-2*b); }
    return v; },
  // where the one eye is, as a share of the painted body canvas (left→right, top→bottom); set by the painter
  eye:function(D){ var b=BA.BOX.god; return D&&D._eyeU?[(D._eyeU[0]-b[0])/(b[1]-b[0]),(D._eyeU[1]-b[2])/(b[3]-b[2])]:[0.5,0.2]; }
};
BA.BOX.god=[-172,172,-262,18];

BA.ARCH.god={
  // ── behind him: the halo and the wings of light ──
  back:function(x,D,box){ var G=D.god||{}, c=D.pal, y0=G.lower==='robe'?0:-18; x.translate(0,y0);
    x.save(); x.fillStyle=BA.rad(x,0,-120,6,118,[[0,rgba(c.g,0.42)],[0.4,rgba(c.g,0.12)],[1,rgba(c.g,0)]]); BA.ell(x,0,-120,118,118); x.fill(); x.restore();
    if(G.wings)BA.ARCH.god.wings(x,D,G.wings);
    if(G.halo)BA.ARCH.god.halo(x,D,G.halo);
    if(G.weapon)BA.ARCH.god.weapon(x,D,G);
    x.translate(0,-y0); },
  halo:function(x,D,k){ var c=D.pal, cy=-142, R=k==='sun'?44:k==='eclipse'?40:38; x.save();
    if(k==='eclipse'){ x.fillStyle=BA.rad(x,0,cy,R*0.8,R*1.9,[[0,rgba('#ffffff',0.95)],[0.18,rgba(c.g,0.7)],[1,rgba(c.g,0)]]); BA.ell(x,0,cy,R*1.9,R*1.9); x.fill();
      x.fillStyle='#07070c'; BA.ell(x,0,cy,R,R); x.fill(); x.strokeStyle=rgba('#ffffff',0.9); x.lineWidth=1.6; BA.ell(x,0,cy,R+0.8,R+0.8); x.stroke(); x.restore(); return; }
    x.strokeStyle=rgba(c.m,0.95); x.lineWidth=2.2; BA.ell(x,0,cy,R,R); x.stroke(); x.lineWidth=1; x.strokeStyle=rgba(c.g,0.9); BA.ell(x,0,cy,R-5,R-5); x.stroke();
    if(k==='sun'){ for(var i=0;i<16;i++){ var a=i/16*Math.PI*2, l=i%2?R+10:R+22; x.strokeStyle=rgba(i%2?c.g:c.m,0.85); x.lineWidth=i%2?1:2; x.beginPath(); x.moveTo(Math.cos(a)*(R+3),cy+Math.sin(a)*(R+3)); x.lineTo(Math.cos(a)*l,cy+Math.sin(a)*l); x.stroke(); } }
    else { for(var r=0;r<16;r++){ var an=r/16*Math.PI*2; x.save(); x.translate(Math.cos(an)*(R-2.5),cy+Math.sin(an)*(R-2.5)); x.rotate(an+Math.PI/2); x.strokeStyle=rgba(c.m,0.95); x.lineWidth=1.1; x.beginPath();
        var m=r%4; if(m===0){ x.moveTo(0,-2.4); x.lineTo(0,2.4); x.moveTo(0,-1); x.lineTo(1.8,-2.4); } else if(m===1){ x.moveTo(-1.5,2.4); x.lineTo(0,-2.4); x.lineTo(1.5,2.4); } else if(m===2){ x.moveTo(0,-2.4); x.lineTo(0,2.4); x.moveTo(0,-2.4); x.lineTo(1.8,-0.6); x.lineTo(0,0.6); } else { x.moveTo(-1.6,-2.2); x.lineTo(1.6,2.2); x.moveTo(1.6,-2.2); x.lineTo(-1.6,2.2); }
        x.stroke(); x.restore(); } }
    x.restore(); },
  // wings: 'rays' long feathers of light fanned out and up (raven quills), 'raven' layered dark-and-light raven wings,
  // 'tattered' torn black feathers with light in the tears, 'storm' streamers of cloud and lightning
  wings:function(x,D,k){ var c=D.pal, n=k==='rays'?13:k==='storm'?11:10, R=BA.rnd(BA.hash(D.id));
    [1,-1].forEach(function(s){ x.save(); x.translate(s*10,-118); x.scale(s,1);
      for(var i=0;i<n;i++){ var t=i/(n-1), ang=-1.25+t*1.65, len=(k==='rays'?150:k==='storm'?140:118)*(0.62+0.38*Math.sin(t*Math.PI*0.95+0.25))*(0.92+R()*0.12), w=(k==='rays'?9:11)+R()*3;
        x.save(); x.rotate(ang+Math.PI/2);
        if(k==='storm'){ x.strokeStyle=rgba(i%3?c.a:c.g,0.55); x.lineWidth=w*0.7; x.lineCap='round'; x.beginPath(); x.moveTo(0,0); x.bezierCurveTo(-8,-len*0.3,10,-len*0.6,-4,-len); x.stroke();
          if(i%3===1){ x.strokeStyle=rgba('#ffffff',0.95); x.lineWidth=1.3; x.beginPath(); x.moveTo(0,-len*0.2); x.lineTo(5,-len*0.42); x.lineTo(-3,-len*0.55); x.lineTo(4,-len*0.8); x.stroke(); } x.restore(); continue; }
        var col=k==='raven'?(i%2?c.b:shade(c.b,0.25)):k==='tattered'?shade(c.b,-0.2):c.a;
        x.beginPath(); x.moveTo(-w*0.35,0); x.quadraticCurveTo(-w,-len*0.55,-w*0.18,-len); x.lineTo(0,-len-6); x.lineTo(w*0.18,-len);
        if(k==='tattered'){ x.lineTo(w*0.6,-len*0.7); x.lineTo(w*0.2,-len*0.62); x.lineTo(w*0.8,-len*0.4); x.lineTo(w*0.3,-len*0.3); }
        x.quadraticCurveTo(w,-len*0.55,w*0.35,0); x.closePath();
        x.fillStyle=BA.lin(x,0,0,0,-len,k==='rays'?[[0,rgba(c.g,0.95)],[0.4,rgba('#ffffff',0.95)],[1,rgba(c.a,0.5)]]:[[0,shade(col,-0.25)],[0.7,col],[1,shade(col,0.3)]]); x.fill();
        if(k==='rays'){ x.strokeStyle=rgba(c.m,0.55); x.lineWidth=0.8; x.stroke(); x.strokeStyle=rgba('#ffffff',0.9); x.lineWidth=1; x.beginPath(); x.moveTo(0,-4); x.lineTo(0,-len*0.92); x.stroke(); }
        else { BA.ol(x,1.1,0.6); x.strokeStyle=rgba(k==='tattered'?c.g:shade(col,0.5),k==='tattered'?0.7:0.45); x.lineWidth=0.9; x.beginPath(); x.moveTo(0,-3); x.lineTo(0,-len*0.9); x.stroke(); }
        x.restore(); }
      x.restore(); }); },
  body:function(x,D,f,box){ var G=D.god||{}, c=D.pal, br=[0,-1.2,-2,-1.1][f], fl=G.lower==='robe'?0:[-18,-20,-21,-19.5][f], sw=[0,1,0,-1][f];
    var A=BA.ARCH.god; x.translate(0,fl);
    A.lower(x,D,G,f,sw); A.arms(x,D,G,f,br); A.torso(x,D,G,br); if(G.beard)A.beard(x,D,br,sw); A.mantle(x,D,G,br,f); A.head(x,D,G,br); A.crown(x,D,G,br); if(G.ravens)A.ravens(x,D,br,f);
    x.translate(0,-fl); BA.lightPass(x,box,D); x.translate(0,fl);
    A.glowFx(x,D,G,br,f); x.translate(0,-fl); BA.motes(x,D,f,box); },
  lower:function(x,D,G,f,sw){ var c=D.pal, top=-74;
    if(G.lower==='robe'){ x.beginPath(); x.moveTo(-17,top); x.lineTo(17,top); x.quadraticCurveTo(26,-36,34+sw,0); for(var i=6;i>=0;i--)x.lineTo(-34+68*i/6+sw*(i%2),(i%2)?-3:1); x.quadraticCurveTo(-26,-36,-17,top); x.closePath();
      BA.fillSh(x,c.a,-34,top,34,0,0.2); BA.ol(x,1.4); x.strokeStyle=rgba(c.m,0.8); x.lineWidth=2.2; x.beginPath(); x.moveTo(-33,-3); x.lineTo(33,-3); x.stroke();
      x.strokeStyle=rgba(shade(c.a,-0.35),0.55); x.lineWidth=1; for(var k=-2;k<=2;k++){ x.beginPath(); x.moveTo(k*6,top+6); x.quadraticCurveTo(k*9,-36,k*13+sw,-4); x.stroke(); } return; }
    if(G.lower==='tendril'){ for(var j=0;j<9;j++){ var t=j/8, x0=-16+32*t, ln=46+((j*37)%17), bend=(t-0.5)*30+Math.sin(f*1.6+j)*5; x.strokeStyle=BA.lin(x,0,top,0,top+ln+24,[[0,c.a],[1,rgba(c.b,0)]]); x.lineWidth=7-Math.abs(t-0.5)*5; x.lineCap='round';
        x.beginPath(); x.moveTo(x0,top+4); x.bezierCurveTo(x0,top+24,x0+bend,top+ln*0.6,x0+bend*1.4,top+ln+18); x.stroke(); } return; }
    // 'spear': the robe narrows to a long spearhead point that floats above the ground (the god never touches the earth)
    x.beginPath(); x.moveTo(-18,top); x.lineTo(18,top); x.quadraticCurveTo(15,-30,3,-2); x.lineTo(0,10); x.lineTo(-3,-2); x.quadraticCurveTo(-15,-30,-18,top); x.closePath();
    BA.fillSh(x,c.a,-18,top,18,10,0.22); BA.ol(x,1.4); x.strokeStyle=rgba(c.m,0.9); x.lineWidth=1.3; x.beginPath(); x.moveTo(0,top+4); x.lineTo(0,4); x.stroke();
    x.strokeStyle=rgba(c.m,0.7); x.lineWidth=1; x.beginPath(); x.moveTo(-14,-52); x.quadraticCurveTo(0,-44,14,-52); x.moveTo(-9,-28); x.quadraticCurveTo(0,-22,9,-28); x.stroke(); },
  torso:function(x,D,G,br){ var c=D.pal, y=br; x.beginPath(); x.moveTo(-20,-74+y); x.lineTo(20,-74+y); x.lineTo(24,-116+y); x.quadraticCurveTo(0,-124+y,-24,-116+y); x.closePath(); BA.fillSh(x,G.armor==='dark'?c.b:shade(c.a,-0.05),-24,-120,24,-74,0.25); BA.ol(x,1.3);
    x.fillStyle=BA.lin(x,0,-110,0,-80,[[0,c.m],[1,shade(c.m,-0.35)]]); x.beginPath(); x.moveTo(-18,-80+y); x.lineTo(18,-80+y); x.lineTo(16,-75+y); x.lineTo(-16,-75+y); x.closePath(); x.fill(); BA.ol(x,0.9,0.5);
    // a knot-worked breast-plate with one glowing stone
    x.strokeStyle=rgba(c.m,0.9); x.lineWidth=1.2; x.beginPath(); x.moveTo(-12,-110+y); x.quadraticCurveTo(0,-96+y,12,-110+y); x.moveTo(-10,-100+y); x.quadraticCurveTo(0,-88+y,10,-100+y); x.stroke();
    x.fillStyle=c.e; BA.ell(x,0,-99+y,3.4,4.4); x.fill(); BA.glow(x,0,-99+y,9,c.e,0.8); },
  arms:function(x,D,G,f,br){ var c=D.pal, y=br, sl=G.armor==='dark'?c.b:c.a;
    // left arm: open hand raised a little, light gathering in it
    var sleeve=function(s,hx,hy){ x.beginPath(); x.moveTo(s*16,-118+y); x.quadraticCurveTo(s*30,-116+y,s*36,-104+y); x.quadraticCurveTo(hx+s*10,(hy-104)/2+y*0.5,hx+s*9,hy+4); x.lineTo(hx-s*9,hy+6); x.quadraticCurveTo(s*26,-92+y,s*18,-100+y); x.closePath();
      BA.fillSh(x,sl,s*16,-118,hx,hy,0.22); BA.ol(x,1.2); x.strokeStyle=rgba(c.m,0.9); x.lineWidth=2; x.beginPath(); x.moveTo(hx+s*9,hy+3); x.lineTo(hx-s*9,hy+5); x.stroke();
      x.fillStyle=shade(c.s,0.1); BA.ell(x,hx,hy+8,4.2,4.8); x.fill(); BA.ol(x,1); };
    sleeve(-1,-42,-74-f);
    if(!G.weapon){ sleeve(1,42,-74+f); return; }
    sleeve(1,38,-100); },
  // the weapon is painted on the back layer, so a spear does not count toward his height (every option stands as tall)
  weapon:function(x,D,G){ var c=D.pal, hx=38;
    if(G.weapon==='gungnir'){ x.save(); x.strokeStyle='#3a2a1c'; x.lineWidth=4.4; x.beginPath(); x.moveTo(hx,-6); x.lineTo(hx,-196); x.stroke(); x.strokeStyle=c.m; x.lineWidth=1.4; for(var r=0;r<5;r++){ x.beginPath(); x.moveTo(hx-2.6,-150-r*7); x.lineTo(hx+2.6,-148-r*7); x.stroke(); }
      x.beginPath(); x.moveTo(hx,-238); x.lineTo(hx+7,-210); x.lineTo(hx+3,-196); x.lineTo(hx-3,-196); x.lineTo(hx-7,-210); x.closePath(); x.fillStyle=BA.lin(x,hx-7,-238,hx+7,-196,[[0,'#ffffff'],[0.6,c.g],[1,c.m]]); x.fill(); BA.ol(x,1.1);
      x.strokeStyle=rgba(c.m,0.95); x.lineWidth=0.9; x.beginPath(); x.moveTo(hx,-228); x.lineTo(hx,-202); x.moveTo(hx,-222); x.lineTo(hx+3,-226); x.stroke(); BA.glow(x,hx,-218,22,c.g,0.75); x.restore(); }
    else if(G.weapon==='staff'){ x.save(); x.strokeStyle='#4a3a2a'; x.lineWidth=4; x.lineCap='round'; x.beginPath(); x.moveTo(hx+2,-4); x.quadraticCurveTo(hx-4,-110,hx+3,-176); x.quadraticCurveTo(hx+12,-186,hx+4,-194); x.stroke(); x.strokeStyle='#2a2018'; x.lineWidth=1; x.stroke();
      x.fillStyle=c.e; BA.ell(x,hx+5,-184,3.5,3.5); x.fill(); BA.glow(x,hx+5,-184,16,c.e,0.9); x.restore(); } },
  mantle:function(x,D,G,br,f){ var c=D.pal, y=br, m=G.mantle||'wolf';
    if(m==='wolf'){ x.beginPath(); x.moveTo(-36,-112+y); x.quadraticCurveTo(-30,-134+y,0,-133+y); x.quadraticCurveTo(30,-134+y,36,-112+y);
      for(var i=8;i>=0;i--){ var tx=-36+72*i/8; x.quadraticCurveTo(tx+4.5,-100+y+(i%2)*3,tx,-108+y); } x.closePath();
      x.fillStyle=BA.lin(x,0,-136,0,-100,[[0,'#ffffff'],[0.55,shade(c.a,-0.04)],[1,shade(c.a,-0.28)]]); x.fill(); BA.ol(x,1.2,0.5);
      x.strokeStyle=rgba(shade(c.a,-0.3),0.55); x.lineWidth=0.8; for(var j=0;j<16;j++){ var tx3=-31+j*4.1; x.beginPath(); x.moveTo(tx3,-126+y+Math.abs(tx3)*0.12); x.quadraticCurveTo(tx3+2,-118+y,tx3+0.5,-111+y+(j%3)); x.stroke(); }
      if(G.wolves){ [-1,1].forEach(function(s){ x.save(); x.translate(s*30,-122+y); x.scale(s,1); x.fillStyle=BA.lin(x,0,-8,0,8,[[0,'#ffffff'],[1,shade(c.a,-0.25)]]); x.beginPath(); x.moveTo(-8,4); x.lineTo(-6,-6); x.lineTo(-3,-12); x.lineTo(0,-6); x.lineTo(6,-8); x.lineTo(12,-2); x.lineTo(14,2); x.lineTo(6,5); x.closePath(); x.fill(); BA.ol(x,1);
        x.fillStyle=c.e; x.fillRect(4,-4,2.4,1.6); BA.glow(x,5,-3,5,c.e,0.8); x.restore(); }); }
      return; }
    if(m==='feather'||m==='raven'){ var col=m==='raven'?c.b:c.a; for(var row=0;row<3;row++)for(var k=0;k<9;k++){ var tx2=-30+k*7.5+(row%2)*3.5, ty=-126+y+row*7; BA.ell(x,tx2,ty+5,3.6,7.5,(tx2/30)*0.5);
        x.fillStyle=BA.lin(x,tx2,ty,tx2,ty+12,[[0,shade(col,0.25)],[1,shade(col,-0.25)]]); x.fill(); BA.ol(x,0.7,0.5); } return; }
    if(m==='storm'){ for(var s2=0;s2<7;s2++){ var cx=-28+s2*9.3, cy=-118+y+((s2*5)%4); x.fillStyle=rgba(s2%2?shade(c.a,-0.1):c.a,0.95); BA.ell(x,cx,cy,9,7); x.fill(); } x.strokeStyle=rgba('#ffffff',0.9); x.lineWidth=1; x.beginPath(); x.moveTo(-20,-122+y); x.lineTo(-14,-114+y); x.lineTo(-18,-110+y); x.stroke(); return; }
    // 'plate': golden pauldrons
    [-1,1].forEach(function(s){ x.beginPath(); BA.ell(x,s*24,-114+y,12,8,s*0.3); x.fillStyle=BA.lin(x,s*14,-122,s*34,-106,[[0,shade(c.m,0.3)],[1,shade(c.m,-0.35)]]); x.fill(); BA.ol(x,1.1); }); },
  beard:function(x,D,br,sw){ var c=D.pal, y=br; for(var i=0;i<9;i++){ var t=i/8, x0=-8+16*t, ln=40+Math.sin(t*Math.PI)*34; x.strokeStyle=BA.lin(x,0,-128+y,0,-128+y+ln,[[0,'#ffffff'],[0.5,rgba(c.g,0.9)],[1,rgba(c.g,0)]]); x.lineWidth=3.2; x.lineCap='round';
      x.beginPath(); x.moveTo(x0,-128+y); x.quadraticCurveTo(x0*1.3+sw,-128+y+ln*0.5,x0*0.6+sw*2,-128+y+ln); x.stroke(); } },
  head:function(x,D,G,br){ var c=D.pal, hy=-138+br, h=G.head||'mask', ex=-3.8, ey=hy-1;
    if(h==='hat'){ x.fillStyle='#1a1820'; BA.ell(x,0,hy+1,10,11); x.fill(); x.beginPath(); x.moveTo(-9,hy-7); x.quadraticCurveTo(0,hy-30,10,hy-8); x.closePath(); BA.fillSh(x,c.b,-10,hy-30,10,hy-6,0.25); BA.ol(x,1.2);
      x.beginPath(); BA.ell(x,0,hy-6,27,6); x.fillStyle=BA.lin(x,-27,hy-10,27,hy-2,[[0,shade(c.b,0.25)],[1,shade(c.b,-0.35)]]); x.fill(); BA.ol(x,1.2); ex=-3.5; ey=hy+2; }
    else if(h==='raven'){ x.beginPath(); x.moveTo(-10,hy-10); x.quadraticCurveTo(0,hy-18,10,hy-10); x.lineTo(9,hy+3); x.lineTo(4,hy+6); x.lineTo(0,hy+24); x.lineTo(-4,hy+6); x.lineTo(-9,hy+3); x.closePath();
      x.fillStyle=BA.lin(x,0,hy-18,0,hy+24,[[0,'#ffffff'],[0.6,shade(c.a,-0.08)],[1,shade(c.a,-0.4)]]); x.fill(); BA.ol(x,1.2); ey=hy-3; }
    else if(h==='void'){ x.fillStyle=BA.rad(x,0,hy,1,12,[[0,'#202028'],[1,'#050508']]); BA.ell(x,0,hy,10.5,12.5); x.fill(); BA.ol(x,1.2,0.4); }
    else { // a smooth mask (one eye-slit); 'split' — the mask cracked down the middle and the dark showing through
      x.fillStyle='#14121a'; BA.ell(x,0,hy,11,13); x.fill();
      x.beginPath(); x.moveTo(-10,hy-9); x.quadraticCurveTo(0,hy-17,10,hy-9); x.quadraticCurveTo(12,hy+6,0,hy+15); x.quadraticCurveTo(-12,hy+6,-10,hy-9); x.closePath();
      x.fillStyle=BA.lin(x,-10,hy-16,10,hy+14,[[0,'#ffffff'],[0.5,G.maskCol||c.m],[1,shade(G.maskCol||c.m,-0.35)]]); x.fill(); BA.ol(x,1.2);
      x.strokeStyle=rgba(shade(G.maskCol||c.m,-0.5),0.8); x.lineWidth=0.9; x.beginPath(); x.moveTo(-6,hy+7); x.quadraticCurveTo(0,hy+10,6,hy+7); x.moveTo(0,hy-12); x.lineTo(0,hy-4); x.stroke();
      x.strokeStyle='#1a1418'; x.lineWidth=1.4; x.beginPath(); x.moveTo(2,hy-1); x.lineTo(7,hy-2); x.stroke();                      // the other eye: sealed, a scar across the mask
      if(h==='split'){ x.save(); x.beginPath(); x.moveTo(1,hy-16); x.lineTo(-1,hy-6); x.lineTo(2,hy); x.lineTo(-1,hy+7); x.lineTo(1,hy+16); x.lineTo(12,hy+16); x.lineTo(12,hy-16); x.closePath(); x.fillStyle='#09080d'; x.fill();
        x.strokeStyle=rgba('#ffffff',0.85); x.lineWidth=0.8; x.beginPath(); x.moveTo(1,hy-16); x.lineTo(-1,hy-6); x.lineTo(2,hy); x.lineTo(-1,hy+7); x.lineTo(1,hy+16); x.stroke(); x.restore(); } }
    x.fillStyle='#ffffff'; x.beginPath(); x.moveTo(ex-3.4,ey); x.quadraticCurveTo(ex,ey-2.2,ex+3.4,ey); x.quadraticCurveTo(ex,ey+1.6,ex-3.4,ey); x.fill();
    D._eyeU=[ex,ey+(G.lower==='robe'?0:[-18,-20,-21,-19.5][0])]; },
  crown:function(x,D,G,br){ var c=D.pal, hy=-150+br, k=G.crown; if(!k)return;
    if(k==='spears'){ [[-9,26,-0.18],[0,40,0],[9,26,0.18]].forEach(function(s){ x.save(); x.translate(s[0],hy); x.rotate(s[2]); x.beginPath(); x.moveTo(-2.4,2); x.lineTo(-2.4,-s[1]*0.55); x.lineTo(-5,-s[1]*0.55); x.lineTo(0,-s[1]); x.lineTo(5,-s[1]*0.55); x.lineTo(2.4,-s[1]*0.55); x.lineTo(2.4,2); x.closePath();
        x.fillStyle=BA.lin(x,0,-s[1],0,2,[[0,'#ffffff'],[0.5,c.g],[1,c.m]]); x.fill(); BA.ol(x,1); x.restore(); }); x.fillStyle=BA.lin(x,0,hy-3,0,hy+4,[[0,shade(c.m,0.3)],[1,shade(c.m,-0.3)]]); x.fillRect(-12,hy-1,24,5); x.strokeStyle='rgba(12,8,14,.6)'; x.lineWidth=1; x.strokeRect(-12,hy-1,24,5); return; }
    if(k==='antlers'){ [-1,1].forEach(function(s){ x.save(); x.scale(s,1); x.strokeStyle=BA.lin(x,0,hy,30,hy-46,[[0,c.m],[1,'#ffffff']]); x.lineWidth=3; x.lineCap='round'; x.beginPath(); x.moveTo(4,hy+2); x.quadraticCurveTo(14,hy-10,22,hy-40); x.moveTo(10,hy-10); x.lineTo(24,hy-16); x.moveTo(15,hy-22); x.lineTo(30,hy-30); x.moveTo(19,hy-31); x.lineTo(14,hy-44); x.stroke(); BA.glow(x,22,hy-40,8,c.g,0.6); x.restore(); }); return; }
    if(k==='ring'){ x.fillStyle=BA.lin(x,0,hy-2,0,hy+4,[[0,shade(c.m,0.3)],[1,shade(c.m,-0.3)]]); BA.ell(x,0,hy+3,12,3.2); x.fill(); BA.ol(x,0.9); [-6,0,6].forEach(function(dx){ x.fillStyle=c.e; BA.ell(x,dx,hy+3,1.6,1.6); x.fill(); }); return; }
    // 'spikes' — a jagged crown; 'icicles' — of ice
    var n=k==='icicles'?9:7; for(var i=0;i<n;i++){ var t=i/(n-1), sx=-14+28*t, hh=(k==='icicles'?18:16)+Math.sin(t*Math.PI)*(k==='icicles'?14:22)+((i*7)%3)*3; x.beginPath(); x.moveTo(sx-3,hy+3); x.lineTo(sx+(t-0.5)*6,hy-hh); x.lineTo(sx+3,hy+3); x.closePath();
      x.fillStyle=k==='icicles'?BA.lin(x,sx,hy-hh,sx,hy+3,[[0,'#ffffff'],[1,'#9fd8f0']]):BA.lin(x,sx,hy-hh,sx,hy+3,[[0,shade(c.b,0.4)],[1,c.b]]); x.fill(); BA.ol(x,0.9); } },
  ravens:function(x,D,br,f){ var c=D.pal; [[-34,-128],[36,-130]].forEach(function(p,i){ var y=p[1]+br+(i?f%2:-(f%2)); x.save(); x.translate(p[0],y); x.scale(i?-1:1,1);
      x.fillStyle=BA.lin(x,0,-8,0,8,[[0,'#3a3a4a'],[1,'#0a0a12']]); x.beginPath(); x.moveTo(-9,4); x.quadraticCurveTo(-4,-8,4,-7); x.lineTo(10,-6); x.lineTo(5,-4); x.quadraticCurveTo(8,4,-2,6); x.lineTo(-12,10); x.closePath(); x.fill(); BA.ol(x,0.9);
      x.fillStyle='#ffffff'; x.fillRect(2.5,-6,1.6,1.6); BA.glow(x,3.3,-5.2,5,c.e,0.9); x.restore(); }); },
  glowFx:function(x,D,G,br,f){ var c=D.pal; BA.glow(x,-43,-66+br-f,14+f,c.g,0.8); if(!G.weapon)BA.glow(x,43,-66+br+f,14+f,c.g,0.8); var ey=D._eyeU?D._eyeU[1]-(G.lower==='robe'?0:[-18,-20,-21,-19.5][0]):-139; BA.glow(x,D._eyeU?D._eyeU[0]:-3.8,ey,9,c.e,0.95); }
};

// ════════════ the new options: three per form, NEW in the Lab (Kris picks one per form) ════════════
// pal: a = robe / light, b = dark, m = gold, g = glow, s = skin, e = the one eye
var GD=function(id,name,h,pal,god,lore,motes){ return BD(id,name,'god',h,'glide',pal,{god:god,motes:motes||'stars',moteN:18,rim:0.4,form:+id.charAt(5),_kfix:0.54},lore); };
// FORM 1 — mainly light, with slight pulses to dark
GD('grim_1.d','Grímnir, the Allfather\'s Mask',178,'#f6f2e8,#2a2a36,#e8c060,#fff4c8,#e8dccc,#fff8e0',{lower:'spear',mantle:'wolf',head:'mask',crown:'spears',halo:'runes',wings:'rays',weapon:'gungnir'},'He floats above his high seat in a mantle of white wolf-fur, a smooth golden mask with one burning eye-slit, a crown of three spear-points and a ring of runes behind his head. Wings of white light-feathers fan out behind him; Gungnir blazes in his hand. Every few heartbeats the light gutters and, for a breath, he is black.');
GD('grim_1.e','Grímnir, the Sun on the High Seat',176,'#fffaf0,#30303c,#f0c860,#ffffff,#ecdfcc,#ffffff',{lower:'robe',mantle:'plate',head:'mask',maskCol:'#f4f0e6',crown:'antlers',halo:'sun',wings:'rays',beard:1,weapon:'gungnir'},'A king of light: a white robe to the floor, golden shoulder-plates, a pale mask under antlers of light, a sun-wheel blazing behind him and a beard that pours down like light. The god everyone in Asgard was told he is.');
GD('grim_1.f','Grímnir, the Raven-Crowned',174,'#f2eee6,#22222e,#e0b860,#fff0c0,#e0d4c4,#fff4d0',{lower:'spear',mantle:'feather',head:'mask',crown:'ring',halo:'runes',wings:'raven',ravens:1,weapon:'staff'},'A tall shining figure cloaked in white raven-feathers, a gold circlet with three rune-stones, Thought and Memory perched on his shoulders, wings of raven feathers rimmed with light, a wanderer\'s staff that ends in a star.');
// FORM 2 — balanced: light and black in even beats
GD('grim_2.d','Grímnir, the Wanderer of Two Lights',176,'#e8e4dc,#1c1c26,#d8b060,#e8f4ff,#d8ccbc,#ffffff',{lower:'tendril',mantle:'raven',head:'hat',wings:'raven',ravens:1,weapon:'staff'},'The mask is gone: a broad-brimmed wanderer\'s hat over a face of shadow and one white eye, a cloak of raven feathers, the lower body fraying into ribbons of light — and in the black beats, into smoke.');
GD('grim_2.e','Grímnir, the Cracked Mask',178,'#f0ece4,#14141c,#e0b860,#f0f0ff,#ddd0c0,#ffffff',{lower:'spear',mantle:'wolf',head:'split',crown:'spears',halo:'runes',wings:'tattered',weapon:'gungnir'},'The golden mask has split down the middle: one half the radiant god, the other a black void. His light-wings are torn and the tears show darkness. Gungnir still shines.');
GD('grim_2.f','Grímnir, the Raven God',174,'#e4e0d8,#18181f,#c8a060,#e0ecff,#d0c4b4,#ffffff',{lower:'tendril',mantle:'feather',head:'raven',crown:'spikes',wings:'raven',ravens:1},'A raven-skull helm with a long beak, a crown of dark spikes, two great raven wings — one rimmed in white light, one in shadow — and both hands open, gathering light and drinking it.');
// FORM 3 — mainly black, with minor pulses back to light
GD('grim_3.d','Grímnir, the Eclipse of Ragnarök',190,'#dcdce6,#08080e,#b8a070,#ffffff,#c8c8d4,#ffffff',{lower:'tendril',mantle:'storm',head:'void',crown:'spikes',halo:'eclipse',wings:'tattered',armor:'dark'},'The sun behind him is swallowed: an eclipse with a white corona. His head is a void with one white eye, his crown is jagged, his wings are torn black feathers and his body pours away into tendrils. Now and then the old light flares through him.',  'sparks');
GD('grim_3.e','Grímnir, the Storm That Ends the World',192,'#e0e8f4,#0a0c14,#c8d8f0,#ffffff,#c8d0dc,#bfe8ff',{lower:'tendril',mantle:'storm',head:'mask',maskCol:'#c8d0dc',crown:'spikes',halo:'eclipse',wings:'storm',weapon:'gungnir',armor:'dark'},'A colossal storm-figure: a mantle of thunderheads, wings of cloud and white lightning, a pale mask in a black body, Gungnir crackling with lightning.','sparks');
GD('grim_3.f','Grímnir, the Fimbulwinter King',188,'#e8f4ff,#0a0e18,#a8c8e0,#ffffff,#d0dce8,#e0f8ff',{lower:'robe',mantle:'wolf',head:'void',crown:'icicles',halo:'runes',wings:'tattered',wolves:1,armor:'dark'},'The endless winter wears him: black robes rimed with frost, a crown of icicles, the wolves Geri and Freki at his shoulders with white eyes, torn black wings dusted with snow.','snow');
// until Kris picks, the game shows the first of the new options
if(typeof BOSS_PICK!=='undefined')['grim_1','grim_2','grim_3'].forEach(function(s){ if(!BOSS_PICK[s]||BOSS_PICK[s]<'d')BOSS_PICK[s]='d'; });

// ════════════ name options (Kris: "it's doesn't quite sound god-like enough. We might stick with grimnir, but give me some more options") ════════════
// [name, title, how to say it, what it means] — Odin's own names first (the false god wears them), then names made for him
var GRIM_NAMES=[
  ['Grímnir','the Masked God','GREEM-neer','"the masked one" — one of Odin\'s names; the god behind the mask of light'],
  ['Alfather','the False Allfather','ALL-fah-ther','Odin\'s greatest name, worn by the one who stole his seat'],
  ['Valfather','Lord of the Slain','VAL-fah-ther','"father of the slain" (Valföðr) — he who chooses who dies'],
  ['Hár','the High One','HAR','"the High One" — the name Odin gives on his high seat'],
  ['Yggr','the Terrible','IG-er','"the terrible one" — the name the world-tree Yggdrasil is named for'],
  ['Ginnar','the Deceiver God','GIN-ar','"the deceiver" — one of Odin\'s names; fits a god who is pretending'],
  ['Bolverk','the Bale-Worker','BOL-verk','"evil-doer" — the name Odin wore when he stole the mead of poetry'],
  ['Sigfather','the Victory-Father','SIG-fah-ther','"father of victory" (Sigföðr)'],
  ['Solmyrk','the Black Sun','SOHL-mirk','made for him: sól (sun) + myrkr (darkness) — the light and the black in one name'],
  ['Ragnvald','Ruler of the Gods','RAG-n-vald','an old Norse name: regin (the gods) + vald (rule)']
];
