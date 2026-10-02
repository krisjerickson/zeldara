// ═══════════════════════════════════════════════════════════════════════
// ║ ZELDARA BRAND (round 10): our own runic symbol logos, "Zeldara" wordmarks
// ║ and home-page looks — all drawn in code (no image files), shared by the
// ║ Design Lab (Logos / Wordmarks / Home Pages tabs) and, once Kris picks,
// ║ the title screen and the Next.js home page.
// ║
// ║ Symbols: ZBrand.SYMBOLS[i] = {id,name,col,style,desc,draw(P,L)} drawn in a
// ║ unit circle (radius 1) at three levels of detail: L=3 full-screen, 2 medium,
// ║ 1 small. One main colour each + a soft runic glow that breathes.
// ║   ZBrand.symbol(ctx,id,cx,cy,R,L,t)      ZBrand.word(ctx,id,cx,cy,H,t)
// ║   ZBrand.home(ctx,cfg,W,H,t,{sym,word})  (the animated home-page looks)
// ║ Inspirations (our own designs): hero-emblem crests, Norse staves and the
// ║ world tree, Celtic knots and spirals.
// ═══════════════════════════════════════════════════════════════════════
var ZBrand={ cache:{},
  mk:function(w,h){ var c=document.createElement('canvas'); c.width=Math.max(1,Math.ceil(w)); c.height=Math.max(1,Math.ceil(h)); return c; },
  mix:function(hex,to,k){ var a=parseInt(hex.slice(1),16), b=parseInt(to.slice(1),16), f=function(s){ return Math.round(((a>>s)&255)+(((b>>s)&255)-((a>>s)&255))*k); }; return 'rgb('+f(16)+','+f(8)+','+f(0)+')'; },
  rgba:function(hex,al){ var a=parseInt(hex.slice(1),16); return 'rgba('+((a>>16)&255)+','+((a>>8)&255)+','+(a&255)+','+al+')'; },
  // drawing helper handed to every symbol: strokes/fills in the pass's colour, widths scale with the level
  P:function(c,L,k){ var base=[0,0.105,0.072,0.05][L]*k, P={c:c,L:L,
      w:function(m){ c.lineWidth=base*(m||1); return P; },
      ln:function(a,close){ c.beginPath(); for(var i=0;i<a.length;i+=2){ if(i)c.lineTo(a[i],a[i+1]); else c.moveTo(a[i],a[i+1]); } if(close)c.closePath(); c.stroke(); return P; },
      qd:function(a,close){ c.beginPath(); c.moveTo(a[0],a[1]); for(var i=2;i<a.length;i+=4)c.quadraticCurveTo(a[i],a[i+1],a[i+2],a[i+3]); if(close)c.closePath(); c.stroke(); return P; },
      ci:function(x,y,r){ c.beginPath(); c.arc(x,y,r,0,Math.PI*2); c.stroke(); return P; },
      ar:function(x,y,r,a0,a1){ c.beginPath(); c.arc(x,y,r,a0,a1); c.stroke(); return P; },
      fc:function(x,y,r){ c.beginPath(); c.arc(x,y,r*(0.6+0.4*k),0,Math.PI*2); c.fill(); return P; },
      fp:function(a){ c.beginPath(); for(var i=0;i<a.length;i+=2){ if(i)c.lineTo(a[i],a[i+1]); else c.moveTo(a[i],a[i+1]); } c.closePath(); c.fill(); c.lineWidth=base*0.5; c.stroke(); return P; },
      mir:function(f){ f(1); c.save(); c.scale(-1,1); f(1); c.restore(); return P; },
      rot:function(n,f,a0){ for(var i=0;i<n;i++){ c.save(); c.rotate((a0||0)+i/n*Math.PI*2); f(i); c.restore(); } return P; },
      // one rune glyph (our own stave alphabet), height h, centred at x,y
      rune:function(x,y,h,i,r){ c.save(); c.translate(x,y); if(r)c.rotate(r); var u=h/2, b=h*0.36; c.beginPath(); i=((i%8)+8)%8;
        if(i!==3){ c.moveTo(0,-u); c.lineTo(0,u); }
        if(i===0){ c.moveTo(0,-u); c.lineTo(b,-u*0.3); } else if(i===1){ c.moveTo(0,-u*0.9); c.lineTo(b,-u*0.45); c.moveTo(0,-u*0.3); c.lineTo(b,u*0.15); }
        else if(i===2){ c.moveTo(0,-u*0.6); c.lineTo(b,0); c.lineTo(0,u*0.6); } else if(i===3){ c.moveTo(-b,-u); c.lineTo(b,u); c.moveTo(b,-u); c.lineTo(-b,u); }
        else if(i===4){ c.moveTo(0,-u); c.lineTo(b,-u*0.3); c.lineTo(-b,u*0.3); c.lineTo(0,u); } else if(i===5){ c.moveTo(-b,-u*0.35); c.lineTo(0,-u); c.lineTo(b,-u*0.35); }
        else if(i===6){ c.moveTo(0,-u*0.5); c.lineTo(b,0); c.lineTo(0,u*0.5); c.lineTo(-b,0); c.closePath(); } else { c.moveTo(-b,-u); c.lineTo(0,-u*0.2); c.lineTo(b,-u); }
        c.stroke(); c.restore(); return P; },
      rr:function(r,n,h,seed){ for(var i=0;i<n;i++){ var a=i/n*Math.PI*2-Math.PI/2; P.rune(Math.cos(a)*r,Math.sin(a)*r,h,i*3+(seed||0),a+Math.PI/2); } return P; },
      ticks:function(r0,r1,n,a0){ c.beginPath(); for(var i=0;i<n;i++){ var a=(a0||0)+i/n*Math.PI*2; c.moveTo(Math.cos(a)*r0,Math.sin(a)*r0); c.lineTo(Math.cos(a)*r1,Math.sin(a)*r1); } c.stroke(); return P; },
      star:function(x,y,r,n,inner){ var a=[]; for(var i=0;i<n*2;i++){ var an=i/(n*2)*Math.PI*2-Math.PI/2, rr=i%2?r*(inner||0.4):r; a.push(x+Math.cos(an)*rr,y+Math.sin(an)*rr); } return P.fp(a); } };
    return P; },
  // passes per style: [colour mix toward white(+)/black(−), width scale, dx, dy]
  STYLES:{ bevel:[[-0.62,1.3,0.02,0.028],[0,1,0,0],[0.7,0.32,-0.01,-0.014]],
    neon:[[0,0.62,0,0],[0.85,0.22,0,0]],
    carved:[[0.55,1.1,0.016,0.022],[-0.35,1,0,0],[-0.75,0.4,-0.01,-0.014]],
    gilded:[[-0.9,1.7,0,0],[-0.5,1.25,0.018,0.026],[0,1,0,0],[0.75,0.3,-0.01,-0.014]] },
  _raw:function(c,S,L,style){ var passes=ZBrand.STYLES[style||S.style]||ZBrand.STYLES.bevel; c.lineJoin='round'; c.lineCap='round';
    passes.forEach(function(p){ var col=p[0]>=0?ZBrand.mix(S.col,'#ffffff',p[0]):ZBrand.mix(S.col,'#000000',-p[0]); c.save(); c.translate(p[2],p[3]); c.strokeStyle=col; c.fillStyle=col; var P=ZBrand.P(c,L,p[1]); P.w(1); S.draw(P,L); c.restore(); }); },
  // cached layers: the symbol itself + its glow
  layers:function(S,R,L){ var k=S.id+'_'+Math.round(R)+'_'+L, o=ZBrand.cache[k]; if(o)return o; var pad=R*(S.gen===2?0.85:0.45), sz=(R+pad)*2, main=ZBrand.mk(sz,sz), c=main.getContext('2d');
    c.translate(sz/2,sz/2); c.scale(R,R);
    if(S.style==='carved'){ c.save(); c.fillStyle='#0b0f16'; c.strokeStyle=ZBrand.mix(S.col,'#000000',0.55); c.lineWidth=0.03; c.beginPath(); c.arc(0,0,1.06,0,Math.PI*2); c.fill(); c.stroke(); c.restore(); }
    ZBrand._raw(c,S,L);
    var glow=ZBrand.mk(sz,sz), g=glow.getContext('2d'); g.shadowColor=S.col; g.shadowBlur=Math.max(3,R*0.22); g.drawImage(main,0,0); g.globalCompositeOperation='source-in'; g.shadowBlur=0; g.fillStyle=S.col; g.globalAlpha=0.9; g.fillRect(0,0,sz,sz);
    var g2=ZBrand.mk(sz,sz), q=g2.getContext('2d'); q.shadowColor=S.col; q.shadowBlur=Math.max(3,R*0.22); q.drawImage(main,0,0); q.shadowBlur=Math.max(6,R*0.5); q.globalAlpha=0.6; q.drawImage(main,0,0);
    o=ZBrand.cache[k]={main:main,glow:g2,sz:sz}; var keys=Object.keys(ZBrand.cache); if(keys.length>260)delete ZBrand.cache[keys[0]]; return o; },
  byId:function(id){ return ZBrand.SYMBOLS.find(function(s){ return s.id===id; })||ZBrand.SYMBOLS[0]; },
  symbol:function(ctx,id,cx,cy,R,L,t,al){ var S=typeof id==='string'?ZBrand.byId(id):id, o=ZBrand.layers(S,R,L), pulse=0.55+0.45*Math.sin((t||0)*1.3+S.col.length); al=al===undefined?1:al;
    ctx.save(); ctx.globalCompositeOperation='lighter'; ctx.globalAlpha=al*(0.35+0.5*pulse); ctx.drawImage(o.glow,cx-o.sz/2,cy-o.sz/2); ctx.restore();
    ctx.save(); ctx.globalAlpha=al; ctx.drawImage(o.main,cx-o.sz/2,cy-o.sz/2); ctx.restore(); },
  SYMBOLS:[], WORDS:[], HOMES:[]
};
(function(){ var S=function(id,name,col,style,desc,draw){ ZBrand.SYMBOLS.push({id:id,name:name,col:col,style:style,desc:desc,draw:draw}); }, PI=Math.PI;
  var tree=function(P,L,sc,y0){ var c=P.c; c.save(); c.translate(0,y0||0); c.scale(sc,sc);
    P.w(1.5).ln([0,0.5,0,-0.4]); P.w(1);
    P.mir(function(){ P.ln([0,-0.4,0.2,-0.68]); P.qd([0,-0.22,0.3,-0.25,0.42,-0.58]); P.qd([0,0,0.4,0,0.6,-0.36]); P.qd([0,0.5,0.22,0.56,0.42,0.82]);
      if(L>=2){ P.qd([0,0.2,0.42,0.24,0.7,-0.06]); P.qd([0,0.5,0.1,0.7,0.16,0.9]); P.qd([0.42,-0.58,0.5,-0.72,0.36,-0.8]); P.qd([0.6,-0.36,0.74,-0.5,0.62,-0.62]); }
      if(L>=3){ P.qd([0.7,-0.06,0.86,-0.14,0.8,-0.3]); P.qd([0.42,0.82,0.6,0.86,0.68,0.72]); [[0.2,-0.68],[0.36,-0.8],[0.62,-0.62],[0.8,-0.3],[0.42,-0.58]].forEach(function(q){ P.fc(q[0],q[1],0.045); }); } });
    P.ln([0,-0.4,0,-0.74]); if(L>=3)P.fc(0,-0.78,0.05); c.restore(); };
  var zr=function(P,s){ P.ln([-0.3*s,-0.4*s,0.3*s,-0.4*s,-0.3*s,0.4*s,0.3*s,0.4*s]); P.ln([-0.14*s,0,0.14*s,0]); };

  S('world_tree','World Tree','#6fe38a','bevel','The tree of life in a ring — branches above, roots below, runes around the rim.',function(P,L){
    tree(P,L,L===1?1.05:0.92,0); if(L>=2)P.w(1.2).ci(0,0,0.98).w(1); if(L>=3){ P.w(0.5).ci(0,0,1.16); P.w(0.7).rr(1.3,16,0.16,1); P.w(0.5).ci(0,0,1.44); } });
  S('zel_rune','Zel-Rune Shield','#4fe8ff','neon','The Z-rune of Zeldara on a kite shield, with spirit wings.',function(P,L){
    P.w(1.3).ln([-0.62,-0.72,0.62,-0.72,0.62,0.08,0,0.94,-0.62,0.08],true).w(1.3); zr(P,L===1?1.05:0.95); P.w(1);
    if(L>=2){ P.w(0.5).ln([-0.5,-0.6,0.5,-0.6,0.5,0.03,0,0.76,-0.5,0.03],true).w(1); P.fc(0,-0.86,0.06); }
    if(L>=3){ P.mir(function(){ for(var k=0;k<5;k++)P.w(0.9).qd([0.66,-0.52+k*0.1,0.98,-0.5+k*0.09,1.42-k*0.13,-1.0+k*0.2]); }); P.w(0.6).rune(-0.36,-0.86,0.14,2).rune(0.36,-0.86,0.14,5); } });
  S('triquetra','Spirit Triquetra','#b890ff','bevel','A three-cornered Celtic knot bound by a ring — three realms of spirit.',function(P,L){
    P.w(1.2).rot(3,function(){ P.qd([0,0.12,-0.6,-0.32,0,-0.94,0.6,-0.32,0,0.12]); }).w(1);
    if(L>=2)P.ci(0,0,0.52); if(L>=3){ P.w(0.6).ci(0,0,1.1); P.rot(3,function(){ P.fc(0,0.78,0.06); },0); P.w(0.7).rr(1.26,18,0.15,4); P.w(0.5).ci(0,0,1.4); } });
  S('compass','Four Realms Compass','#f0c050','gilded','A four-pointed star for the four realms, with a rune at each quarter.',function(P,L){ var a=[]; for(var i=0;i<8;i++){ var an=i/8*PI*2-PI/2, r=i%2?0.24:0.98; a.push(Math.cos(an)*r,Math.sin(an)*r); }
    P.w(1.1).ln(a,true).w(1); P.ln([0,-0.98,0,0.98]); P.ln([-0.98,0,0.98,0]);
    if(L>=2){ var b=[]; for(var j=0;j<8;j++){ var bn=j/8*PI*2-PI/4, br=j%2?0.2:0.6; b.push(Math.cos(bn)*br,Math.sin(bn)*br); } P.w(0.8).ln(b,true).w(1); P.ci(0,0,0.16); }
    if(L>=3){ P.w(0.6).ci(0,0,1.12).ci(0,0,1.36); P.w(0.5).ticks(1.12,1.2,32); P.w(0.8).rot(4,function(i){ P.rune(0,-1.24,0.16,i*2+1); },PI/4); P.rot(4,function(){ P.star(0,-1.24,0.07,4,0.4); }); } });
  S('winged_blade','Winged Blade','#a8c8ff','bevel','A hero\'s blade, point down, lifted by spirit wings.',function(P,L){
    P.w(1.6).ln([0,-0.5,0,0.78]).w(1); P.fp([-0.07,0.74,0.07,0.74,0,0.98]); P.w(1.3).ln([-0.3,-0.5,0.3,-0.5]).w(1); P.ln([0,-0.5,0,-0.82]); P.fc(0,-0.88,0.08);
    P.mir(function(){ var n=L===1?1:L===2?3:5; for(var k=0;k<n;k++)P.qd([0.14,-0.42+k*0.07,0.5+k*0.05,-0.5+k*0.06,1.08-k*0.13,-0.98+k*0.2]); });
    if(L>=3){ P.w(0.5).ci(0,-0.1,1.2); P.w(0.6).rune(0,0,0.14,6).rune(0,0.3,0.14,2).rune(0,-0.26,0.14,5); P.w(0.7).rr(1.36,14,0.14,2); } });
  S('wisp','Spirit Wisp','#5ff0d0','neon','A friendly spirit flame with a curl of light — the familiars of Zeldara.',function(P,L){
    P.w(1.2).qd([0,-0.95,0.2,-0.5,0.5,-0.1,0.86,0.42,0.3,0.78,0,0.94,-0.3,0.78,-0.86,0.42,-0.5,-0.1,-0.3,-0.4,0,-0.95]).w(1);
    P.qd([0.1,0.5,-0.3,0.5,-0.24,0.16,-0.16,-0.14,0.16,-0.08]); if(L>=2){ P.fc(-0.14,0.3,0.07); P.fc(0.2,0.3,0.07); }
    if(L>=3){ P.w(0.7).ar(0,0.2,1.16,PI*0.15,PI*0.85); P.rot(3,function(){ P.w(0.8).qd([0,-1.3,0.08,-1.18,0,-1.08,-0.08,-1.18,0,-1.3]); },PI/3); P.w(0.5).ticks(1.3,1.36,24,0.13); } });
  S('wayfinder','Wayfinder Stave','#9fe8ff','carved','An eight-armed stave compass — so the traveller never loses the way.',function(P,L){ var n=L===1?4:8;
    P.rot(n,function(i){ P.w(1.1).ln([0,-0.14,0,-0.92]).w(1); var k=i%4; if(L===1||k===0)P.ln([-0.16,-0.76,0,-0.92,0.16,-0.76]); else if(k===1)P.ln([-0.14,-0.62,0.14,-0.62]).ln([-0.14,-0.78,0.14,-0.78]); else if(k===2)P.ci(0,-0.78,0.1); else P.ln([-0.14,-0.92,0.14,-0.92]).ln([-0.1,-0.6,0,-0.5,0.1,-0.6]); });
    P.ci(0,0,0.14); if(L>=3){ P.w(0.5).ci(0,0,0.42); P.w(0.7).rr(1.22,16,0.14,3); P.w(0.5).ci(0,0,1.06).ci(0,0,1.38); } });
  S('shield_knot','Shield Knot','#ff9a50','bevel','A four-cornered Celtic shield knot — an old ward against harm.',function(P,L){
    P.w(1.2).rot(4,function(){ P.qd([0.16,-0.16,0.16,-0.9,0.56,-0.9,0.9,-0.9,0.9,-0.56,0.9,-0.16,0.16,-0.16]); },0).w(1); P.ci(0,0,0.5);
    if(L>=2)P.ln([0,-0.5,0.5,0,0,0.5,-0.5,0],true); if(L>=3){ P.fc(0,0,0.07); P.w(0.5).ci(0,0,1.14).ci(0,0,1.4); P.w(0.7).rr(1.27,16,0.14,6); } });
  S('moon_tree','Moon Grove','#d8d0ff','neon','A full moon cradling a sapling, between a waxing and a waning crescent.',function(P,L){
    P.w(1.2).ci(0,0,0.44).w(1); P.mir(function(){ P.ar(0.72,0,0.3,-PI*0.62,PI*0.62); P.ar(0.84,0,0.28,-PI*0.72+PI,PI*0.72+PI); });
    if(L>=2)tree(P,1,0.38,0.03); if(L>=3){ P.w(0.5).ci(0,0,1.18); [[-0.5,-0.72],[0,-0.9],[0.5,-0.72]].forEach(function(q){ P.star(q[0],q[1],0.07,4,0.35); }); P.w(0.7); for(var i=0;i<7;i++){ var a=PI*0.2+i/6*PI*0.6; P.rune(Math.cos(a)*1.0,Math.sin(a)*1.0,0.13,i+2,a-PI/2); } } });
  S('wyrm_ring','Wyrm Ring','#c8e060','gilded','A serpent-dragon biting its tail around the Z-rune — the world without end.',function(P,L){
    P.w(1.7).ar(0,0,0.8,-PI*0.42,PI*1.5).w(1); P.fp([0.1,-0.98,0.42,-0.86,0.2,-0.62,0.02,-0.74]); P.fc(0.22,-0.82,0.03);
    if(L>=2){ P.w(1.1); zr(P,0.7); P.w(1); } if(L>=3){ P.w(0.6).ticks(0.9,1.02,26,0.3); P.w(0.5).ci(0,0,1.2); P.w(0.7).rr(1.34,12,0.14,5); } });
  S('crystal_triad','Crystal Triad','#ff7ac0','bevel','Three crystals locked together — strength, wisdom and heart.',function(P,L){
    P.w(1.2).rot(3,function(){ P.ln([0,-0.96,0.3,-0.36,0,0.16,-0.3,-0.36],true); if(L>=2)P.w(0.5).ln([0,-0.96,0,0.16]).ln([-0.3,-0.36,0.3,-0.36]).w(1.2); }).w(1);
    if(L>=2){ var h=[]; for(var i=0;i<6;i++)h.push(Math.cos(i/6*PI*2)*0.22,Math.sin(i/6*PI*2)*0.22); P.ln(h,true); }
    if(L>=3){ var o=[]; for(var j=0;j<6;j++)o.push(Math.cos(j/6*PI*2+PI/6)*1.18,Math.sin(j/6*PI*2+PI/6)*1.18); P.w(0.6).ln(o,true); P.rot(3,function(){ P.star(0,0.86,0.09,4,0.35); }); P.w(0.5).ci(0,0,1.38); } });
  S('runestone','Runestone','#7fd8e8','carved','A standing stone carved with the Z-rune, humming with power.',function(P,L){
    P.w(1.3).ln([-0.42,0.84,-0.52,-0.3,-0.26,-0.86,0.2,-0.92,0.52,-0.36,0.44,0.84],true).w(1.2); zr(P,0.62); P.w(1);
    if(L>=2){ P.ln([-0.8,0.84,0.8,0.84]); P.mir(function(){ P.w(0.7).ar(0,0,0.84,-PI*0.22,PI*0.12).w(1); }); }
    if(L>=3){ P.w(0.6).rune(0,-0.66,0.14,5).rune(0,0.6,0.14,1); P.mir(function(){ P.w(0.5).ar(0,0,1.04,-PI*0.26,PI*0.14); P.fc(0.9,-0.56,0.05); P.fc(1.04,-0.3,0.035); }); P.w(0.5).ar(0,0,1.24,PI*1.1,PI*1.9); } });
  S('aurora_crown','Aurora Crown','#7dffb0','neon','A crown beneath the northern lights.',function(P,L){
    P.w(1.2).ln([-0.62,0.42,-0.62,-0.06,-0.32,0.2,0,-0.3,0.32,0.2,0.62,-0.06,0.62,0.42],true).w(1); P.ln([-0.62,0.62,0.62,0.62]); P.fc(0,-0.38,0.07); P.fc(-0.62,-0.14,0.06); P.fc(0.62,-0.14,0.06);
    var n=L===1?1:L===2?2:4; for(var k=0;k<n;k++)P.w(0.9-k*0.1).qd([-0.9+k*0.06,-0.5-k*0.14,-0.45,-0.78-k*0.14,0,-0.56-k*0.14,0.45,-0.34-k*0.14,0.9-k*0.06,-0.6-k*0.14]);
    if(L>=3){ P.w(0.6).rune(-0.36,0.52,0.1,2).rune(0,0.52,0.1,6).rune(0.36,0.52,0.1,5); [[-0.7,-1.12],[0.2,-1.2],[0.8,-1.0]].forEach(function(q){ P.star(q[0],q[1],0.06,4,0.35); }); P.w(0.5).ar(0,0.1,1.3,PI*0.12,PI*0.88); } });
  S('stag_sun','Stag of the Sun','#ffb648','gilded','A stag\'s antlers holding the sun — the wild guardian of the Grasslands.',function(P,L){
    P.w(1.2).ci(0,-0.34,0.26).w(1); P.ln([-0.2,0.24,0,0.9,0.2,0.24]);
    P.mir(function(){ P.w(1.2).qd([0.14,0.26,0.52,0.1,0.6,-0.5,0.62,-0.74,0.48,-0.9]).w(1); P.ln([0.5,-0.1,0.78,-0.3]); if(L>=2){ P.ln([0.58,-0.4,0.86,-0.62]); P.ln([0.36,0.14,0.46,0.42]); } if(L>=3){ P.ln([0.6,-0.66,0.8,-0.92]); P.qd([0.2,0.24,0.42,0.3,0.5,0.5]); } });
    if(L>=3)c0(P); function c0(P){ P.c.save(); P.c.translate(0,-0.34); P.w(0.6).ticks(0.34,0.46,12,0.26); P.c.restore(); P.w(0.5).ci(0,0,1.22); P.w(0.7); for(var i=0;i<7;i++){ var a=PI*0.25+i/6*PI*0.5; P.rune(Math.cos(a)*1.36,Math.sin(a)*1.36,0.13,i,a-PI/2); } } });
  S('raven_eye','Raven\'s Eye','#8aa0ff','bevel','An all-seeing eye under raven wings — thought and memory.',function(P,L){
    P.w(1.2).qd([-0.78,0.1,0,-0.42,0.78,0.1,0,0.6,-0.78,0.1]).w(1); P.ci(0,0.1,0.22); P.fc(0,0.1,0.08);
    P.mir(function(){ var n=L===1?1:L===2?2:4; for(var k=0;k<n;k++)P.qd([0.1,-0.42-k*0.06,0.5,-0.9-k*0.08,1.0-k*0.12,-0.5+k*0.04]); });
    if(L>=2)P.ln([0,0.6,0,0.94]); if(L>=3){ P.ln([-0.1,0.78,0,0.68,0.1,0.78,0,0.88],true); P.w(0.5).ticks(0.5,0.6,9,PI*0.08); P.w(0.5).ci(0,0,1.26); P.w(0.7).rr(1.4,14,0.13,7); } });
  S('triskele','Triskele','#50e0c0','bevel','Three spirals turning as one — the old sign of motion, land, sea and sky.',function(P,L){ var turns=L===1?1.6:2.3;
    P.w(1.2).rot(3,function(){ var a=[]; for(var th=0;th<=turns*PI;th+=0.22){ var r=0.04+0.058*th; a.push(Math.cos(th-PI/2)*r,-0.46+Math.sin(th-PI/2)*r); } var e=a.length; a.push(0,0); P.ln(a); }).w(1);
    if(L>=2)P.ci(0,0,0.98); if(L>=3){ P.rot(3,function(){ P.fc(0,0.8,0.06); }); P.w(0.5).ci(0,0,1.14); P.w(0.7).rr(1.27,18,0.13,2); P.w(0.5).ci(0,0,1.4); } });
  S('frost_star','Frost Star','#e0f8ff','neon','A six-armed snow-rune from the Highlands.',function(P,L){
    P.w(1.2).rot(6,function(){ P.ln([0,0,0,-0.94]); P.ln([-0.2,-0.52,0,-0.34,0.2,-0.52]); if(L>=2)P.ln([-0.16,-0.84,0,-0.68,0.16,-0.84]); if(L>=3){ P.ln([0,-1.04,0.07,-0.94,0,-0.84,-0.07,-0.94],true); } }).w(1);
    if(L>=2){ var h=[]; for(var i=0;i<6;i++)h.push(Math.cos(i/6*PI*2)*0.2,Math.sin(i/6*PI*2)*0.2); P.ln(h,true); }
    if(L>=3){ var o=[]; for(var j=0;j<6;j++)o.push(Math.cos(j/6*PI*2)*1.3,Math.sin(j/6*PI*2)*1.3); P.w(0.5).ln(o,true); P.rot(6,function(){ P.fc(0,-0.66,0.04); },PI/6); } });
  S('realm_peak','Realm Peaks','#ff8a6a','gilded','Mountain, volcano and rising sun in a diamond frame — the land of Zeldara.',function(P,L){
    P.w(1.2).ln([0,-0.98,0.98,0,0,0.98,-0.98,0],true).w(1); P.ln([-0.6,0.3,-0.22,-0.22,0,0.06,0.26,-0.42,0.6,0.3]); P.ci(-0.3,-0.5,0.11);
    if(L>=2){ P.ln([-0.68,0.3,0.68,0.3]); P.qd([-0.4,0.5,-0.2,0.42,0,0.5,0.2,0.58,0.4,0.5]); P.ln([0.2,-0.32,0.26,-0.26,0.32,-0.32]); }
    if(L>=3){ P.w(0.5).ln([0,-1.18,1.18,0,0,1.18,-1.18,0],true); P.w(0.7).rot(4,function(i){ P.rune(0,-1.34,0.14,i+1); }); P.qd([-0.26,0.68,-0.13,0.62,0,0.68,0.13,0.74,0.26,0.68]); P.star(0.5,-0.6,0.05,4,0.35); P.w(0.5).ticks(0.15,0.2,8,0.2); } });
  S('waystone_gate','Waystone Gate','#a0a8ff','carved','A rune gate with a guiding star — step through, and the road is short.',function(P,L){
    P.w(1.3).ln([-0.52,0.86,-0.52,-0.2]).ar(0,-0.2,0.52,PI,PI*2).ln([0.52,-0.2,0.52,0.86]).w(1); P.star(0,0.08,0.2,4,0.32); P.ln([-0.74,0.86,0.74,0.86]);
    if(L>=2){ P.w(0.7).ln([-0.34,0.86,-0.34,-0.2]).ar(0,-0.2,0.34,PI,PI*2).ln([0.34,-0.2,0.34,0.86]).w(1); P.ln([-0.6,0.98,0.6,0.98]); }
    if(L>=3){ P.w(0.6); P.mir(function(){ P.rune(0.43,0.6,0.11,1).rune(0.43,0.3,0.11,4).rune(0.43,0,0.11,6); }); P.w(0.5).ar(0,-0.2,0.72,PI*1.08,PI*1.92); P.rot(5,function(){ P.fc(0,-1.08,0.035); },-PI*0.25); P.c.save(); P.c.translate(0,0.08); P.w(0.4).ticks(0.26,0.34,8,PI/8); P.c.restore(); P.w(0.5).ar(0,-0.2,1.0,PI*1.15,PI*1.85); } });
  S('four_spirits','Four Spirits','#6ff0e0','bevel','Four elemental spirits around one heart — leaf, wave, stone and flame.',function(P,L){
    P.w(1.2).rot(4,function(i){ P.qd([0,-0.96,0.36,-0.56,0,-0.22,-0.36,-0.56,0,-0.96]);
      if(L>=3){ P.w(0.6); if(i===0)P.ln([0,-0.42,0,-0.76]).ln([-0.08,-0.56,0,-0.64,0.08,-0.56]); else if(i===1)P.qd([-0.12,-0.56,-0.06,-0.64,0,-0.56,0.06,-0.48,0.12,-0.56]); else if(i===2)P.ln([0,-0.72,0.1,-0.5,-0.1,-0.5],true); else P.qd([0,-0.76,0.12,-0.56,0,-0.44,-0.12,-0.56,0,-0.76]); P.w(1.2); } }).w(1);
    P.ln([0,-0.16,0.16,0,0,0.16,-0.16,0],true); if(L>=2)P.ci(0,0,0.6); if(L>=3){ P.w(0.5).ci(0,0,1.14); P.w(0.7).rot(4,function(i){ P.rune(0,-1.26,0.14,i*2); },PI/4); P.w(0.5).ci(0,0,1.4); } });
})();

// ═══════════ WORDMARKS: "ZELDARA" ═══════════
// kinds: 'staves' (our own straight-stroke rune letters), 'font' (a display face + our ornaments)
(function(){ var W=function(id,name,col,style,desc,o){ ZBrand.WORDS.push(Object.assign({id:id,name:name,col:col,style:style,desc:desc},o)); };
  // rune-letter strokes in a 0.6 × 1 box (y down)
  ZBrand.GLYPH={ Z:[[0,0,0.6,0,0,1,0.6,1]], E:[[0.6,0,0,0,0,1,0.6,1],[0,0.5,0.44,0.5]], L:[[0,0,0,1,0.6,1]], D:[[0,0,0,1,0.6,0.5,0,0]], A:[[0,1,0.3,0,0.6,1],[0.13,0.62,0.47,0.62]], R:[[0,1,0,0,0.56,0.26,0,0.52,0.6,1]] };
  ZBrand.GLYPH2={ Z:[[0.02,0.08,0.58,0,0.3,0.5,0.02,1,0.58,0.92]], E:[[0.56,0.04,0.1,0.1,0,0.5,0.1,0.9,0.56,0.96],[0,0.5,0.4,0.5]], L:[[0.06,0,0.06,0.9,0.2,1,0.6,0.96]], D:[[0,0,0,1],[0,0,0.5,0.14,0.6,0.5,0.5,0.86,0,1]], A:[[0,1,0.26,0.1,0.3,0,0.34,0.1,0.6,1]], R:[[0,1,0,0],[0,0,0.5,0.06,0.54,0.28,0.4,0.48,0,0.52],[0.24,0.5,0.6,1]] };
  W('rune_carve','Rune-Carved','#4fe8ff','bevel','Straight-cut rune letters, as if chiselled into a waystone.',{kind:'staves',track:0.26});
  W('blade_slash','Blade Slash','#f0c050','gilded','Rune letters with the Z\'s stroke sweeping under the whole name like a blade.',{kind:'staves',track:0.24,slash:true,slant:-0.16});
  W('hanging_staves','Hanging Staves','#6fe38a','neon','Tall, narrow letters hanging from one line, like carved staves on a beam.',{kind:'staves',track:0.2,narrow:0.62,bar:true});
  W('spirit_script','Spirit Script','#5ff0d0','neon','Flowing letters drawn in one thin line of light.',{kind:'staves',glyph:2,track:0.3,round:true,dots:true});
  W('knot_uncial','Knotwork Uncial','#b890ff','bevel','Round Celtic-manuscript letters with a knotted ring around the Z.',{kind:'font',font:'"Uncial Antiqua","Palatino Linotype",serif',track:0.08,ringZ:true});
  W('engraved','Engraved Capitals','#ffd070','gilded','Tall engraved capitals with a rune band beneath.',{kind:'font',font:'"Cinzel Decorative","Cinzel",Georgia,serif',track:0.12,band:true,weight:'700'});
  W('highland','Highland Wide','#e0f8ff','carved','Wide-spaced capitals between two thin lines — calm and cold.',{kind:'font',font:'"Marcellus SC","Palatino Linotype",serif',track:0.34,rules:true});
  W('world_tree_a','Tree-A','#ff9a50','bevel','Rune letters where each A is a little tree and the D holds a gem.',{kind:'staves',track:0.26,treeA:true,gemD:true});
  W('blackstone','Blackstone','#ff7a7a','gilded','Heavy medieval lettering with ember glow — the Ashlands voice.',{kind:'font',font:'"Pirata One","MedievalSharp",Georgia,serif',track:0.06,sizeK:1.15});
  W('seal','Stacked Seal','#c8d0e0','carved','ZEL over DARA in a square seal with corner runes — for stamps and small spaces.',{kind:'staves',stack:true,track:0.22});
  var word='ZELDARA';
  // returns layout width for a staves wordmark at cap height H
  var stavesW=function(D,H){ var gw=0.6*(D.narrow||1), n=7; return (n*gw+(n-1)*D.track)*H; };
  ZBrand._word=function(c,D,H,k,line){ var G=D.glyph===2?ZBrand.GLYPH2:ZBrand.GLYPH, gw=0.6*(D.narrow||1), lw=H*0.12*k*(D.kind==='staves'&&D.glyph===2?0.7:1); c.lineWidth=lw; c.lineJoin=D.round?'round':'miter'; c.lineCap=D.round?'round':'butt'; c.miterLimit=3;
    var drawLetters=function(txt,x0,y0){ for(var i=0;i<txt.length;i++){ var ch=txt[i], g=G[ch], x=x0+i*(gw+D.track)*H;
        if(D.treeA&&ch==='A'){ c.beginPath(); c.moveTo(x+0.3*gw/0.6*H,y0+H); c.lineTo(x+0.3*gw/0.6*H,y0); [[0.25,0.5,0.02],[0.5,0.62,0.22],[0.75,0.7,0.44]].forEach(function(b){ c.moveTo(x+0.3*H,y0+b[0]*H); c.lineTo(x+(0.3-b[1]*0.5)*H,y0+b[2]*H-0.02*H); c.moveTo(x+0.3*H,y0+b[0]*H); c.lineTo(x+(0.3+b[1]*0.5)*H,y0+b[2]*H-0.02*H); }); c.stroke(); continue; }
        g.forEach(function(s){ c.beginPath(); if(D.round&&s.length>4){ c.moveTo(x+s[0]*gw/0.6*H,y0+s[1]*H); for(var j=2;j<s.length-2;j+=2){ var mx=(s[j]+s[j+2])/2, my=(s[j+1]+s[j+3])/2; c.quadraticCurveTo(x+s[j]*gw/0.6*H,y0+s[j+1]*H,x+mx*gw/0.6*H,y0+my*H); } c.lineTo(x+s[s.length-2]*gw/0.6*H,y0+s[s.length-1]*H); }
          else for(var j2=0;j2<s.length;j2+=2){ var px=x+s[j2]*gw/0.6*H, py=y0+s[j2+1]*H; if(j2)c.lineTo(px,py); else c.moveTo(px,py); } c.stroke(); });
        if(D.gemD&&ch==='D'){ c.beginPath(); c.arc(x+0.2*H,y0+0.5*H,H*0.06*(0.6+0.4*k),0,Math.PI*2); c.fill(); }
        if(D.dots&&(ch==='A'||ch==='E')){ c.beginPath(); c.arc(x+0.3*H,y0+(ch==='A'?0.66:0.5)*H,H*0.035,0,Math.PI*2); c.fill(); } } };
    if(D.stack){ var w3=(3*gw+2*D.track)*H*0.5, w4=(4*gw+3*D.track)*H*0.5, hh=H*0.5; c.save(); c.scale(0.5,0.5); c.lineWidth=lw*1.6; drawLetters('ZEL',-w3,-H*1.12); drawLetters('DARA',-w4,H*0.12); c.restore();
      var bx=Math.max(w3,w4)+H*0.16; c.lineWidth=lw*0.7; c.strokeRect(-bx,-H*0.72,bx*2,H*1.44); c.lineWidth=lw*0.4; c.strokeRect(-bx-H*0.07,-H*0.79,bx*2+H*0.14,H*1.58); return; }
    var Wd=stavesW(D,H); c.save(); if(D.slant)c.transform(1,0,D.slant,1,0,0); drawLetters(word,-Wd/2,-H/2);
    if(D.bar){ c.lineWidth=lw*0.8; c.beginPath(); c.moveTo(-Wd/2-H*0.2,-H/2); c.lineTo(Wd/2+H*0.2,-H/2); c.stroke(); }
    if(D.slash){ c.lineWidth=lw*0.9; c.beginPath(); c.moveTo(-Wd/2+0.6*H,-H/2); c.lineTo(-Wd/2-H*0.16,H/2+H*0.2); c.lineTo(Wd/2+H*0.5,H/2+H*0.2); c.stroke(); c.beginPath(); c.moveTo(Wd/2+H*0.5,H/2+H*0.2); c.lineTo(Wd/2+H*0.24,H/2+H*0.08); c.lineTo(Wd/2+H*0.24,H/2+H*0.32); c.closePath(); c.fill(); }
    c.restore(); };
  ZBrand._font=function(c,D,H,k,pass){ var sz=H*1.32*(D.sizeK||1); c.font=(D.weight||'400')+' '+sz+'px '+D.font; c.textBaseline='middle'; c.textAlign='left'; var tr=D.track*H, wd=0, ws=[]; for(var i=0;i<word.length;i++){ var m=c.measureText(word[i]).width; ws.push(m); wd+=m+(i<word.length-1?tr:0); }
    var x=-wd/2; for(var j=0;j<word.length;j++){ if(pass==='stroke'){ c.lineWidth=H*0.05*k; c.lineJoin='round'; c.strokeText(word[j],x,0); } else c.fillText(word[j],x,0); x+=ws[j]+tr; }
    c.lineWidth=H*0.035*Math.max(0.6,k);
    if(D.band){ c.beginPath(); c.moveTo(-wd/2,H*0.78); c.lineTo(wd/2,H*0.78); c.stroke(); var P=ZBrand.P(c,3,1); c.lineWidth=H*0.03; for(var r=0;r<11;r++)P.rune(-wd/2+wd*(r+0.5)/11,H*1.02,H*0.24,r*3+1); c.beginPath(); c.moveTo(-wd/2,H*1.26); c.lineTo(wd/2,H*1.26); c.stroke(); }
    if(D.rules){ c.beginPath(); c.moveTo(-wd/2,-H*0.82); c.lineTo(wd/2,-H*0.82); c.moveTo(-wd/2,H*0.82); c.lineTo(wd/2,H*0.82); c.stroke(); c.beginPath(); c.arc(0,H*0.82,H*0.06,0,Math.PI*2); c.fill(); }
    if(D.ringZ){ var zx=-wd/2+ws[0]/2; c.beginPath(); c.arc(zx,0,H*0.86,0,Math.PI*2); c.stroke(); c.lineWidth=H*0.02; c.beginPath(); c.arc(zx,0,H*0.98,0,Math.PI*2); c.stroke(); for(var q=0;q<4;q++){ var a=q*Math.PI/2+Math.PI/4; c.beginPath(); c.arc(zx+Math.cos(a)*H*0.92,Math.sin(a)*H*0.92,H*0.07,0,Math.PI*2); c.fill(); } } };
  ZBrand.wordById=function(id){ return ZBrand.WORDS.find(function(w){ return w.id===id; })||ZBrand.WORDS[0]; };
  ZBrand.wordLayers=function(D,H){ var fk=D.kind==='font'&&document.fonts?document.fonts.check('20px '+D.font.split(',')[0]):true, k='w_'+D.id+'_'+Math.round(H)+'_'+fk, o=ZBrand.cache[k]; if(o)return o;
    var w=H*(D.stack?5.2:9.6), h=H*(D.stack?2.6:(D.band?3.6:2.8)), main=ZBrand.mk(w,h), c=main.getContext('2d'); c.translate(w/2,h/2-(D.band?H*0.22:0));
    (ZBrand.STYLES[D.style]||ZBrand.STYLES.bevel).forEach(function(p){ var col=p[0]>=0?ZBrand.mix(D.col,'#ffffff',p[0]):ZBrand.mix(D.col,'#000000',-p[0]); c.save(); c.translate(p[2]*H*1.6,p[3]*H*1.6); c.strokeStyle=col; c.fillStyle=col;
      if(D.kind==='font'){ if(p[1]>1.05)ZBrand._font(c,D,H,(p[1]-1)*3,'stroke'); else if(p[1]<0.5){ c.globalAlpha=0.55; ZBrand._font(c,D,H,0.25,'stroke'); } else ZBrand._font(c,D,H,1,'fill'); }
      else ZBrand._word(c,D,H,p[1]); c.restore(); });
    var glow=ZBrand.mk(w,h), g=glow.getContext('2d'); g.shadowColor=D.col; g.shadowBlur=Math.max(3,H*0.3); g.drawImage(main,0,0); g.shadowBlur=Math.max(5,H*0.7); g.globalAlpha=0.6; g.drawImage(main,0,0);
    return ZBrand.cache[k]={main:main,glow:glow,w:w,h:h,band:D.band}; };
  ZBrand.word=function(ctx,id,cx,cy,H,t,al){ var D=typeof id==='string'?ZBrand.wordById(id):id, o=ZBrand.wordLayers(D,H), pulse=0.55+0.45*Math.sin((t||0)*1.1+2); al=al===undefined?1:al;
    ctx.save(); ctx.globalCompositeOperation='lighter'; ctx.globalAlpha=al*(0.3+0.45*pulse); ctx.drawImage(o.glow,cx-o.w/2,cy-o.h/2); ctx.restore(); ctx.save(); ctx.globalAlpha=al; ctx.drawImage(o.main,cx-o.w/2,cy-o.h/2); ctx.restore(); };
})();

// ═══════════ HOME-PAGE LOOKS (animated, on black) ═══════════
(function(){ var H=function(id,name,desc,o){ ZBrand.HOMES.push(Object.assign({id:id,name:name,desc:desc},o)); }, PI=Math.PI;
  var rnd=function(s){ s=(s*9301+49297)%233280; return function(){ s=(s*9301+49297)%233280; return s/233280; }; };
  H('northern_crown','Northern Crown','Green-teal aurora across the top, a slow rune ring turning behind the logo.',{layout:'center',aurora:{cols:['#3dffa0','#30c8ff'],y:0.16,h:0.34,a:0.5},stars:90,shoot:9,runes:'ring',acc:'#6fe3f5'});
  H('rune_gate','Rune Gate','A standing-stone gate glowing faintly; you step through to play.',{layout:'center',stars:60,shoot:14,sil:'gate',runes:'gate',glow:0.5,acc:'#a0a8ff'});
  H('spirit_drift','Spirit Drift','Just a few spirit wisps drifting through the dark, leaving trails of light.',{layout:'center',stars:40,spirits:5,acc:'#5ff0d0'});
  H('world_tree','World Tree','A great tree faint in the dark with rune-leaves that light up one by one.',{layout:'left',stars:50,sil:'tree',shoot:16,acc:'#6fe38a',aurora:{cols:['#3dffa0'],y:0.1,h:0.2,a:0.22}});
  H('starfall','Starfall','A full night sky, shooting stars every few seconds, a thin aurora over far peaks.',{layout:'center',stars:200,shoot:3.5,sil:'peaks',aurora:{cols:['#40e0ff','#8060ff'],y:0.56,h:0.2,a:0.4},acc:'#9fe8ff'});
  H('rune_columns','Rune Columns','Two columns of runes down the sides; a soft light travels down them.',{layout:'center',stars:30,runes:'columns',acc:'#f0c050'});
  H('aurora_veil','Aurora Veil','Tall violet-green curtains of light, very faint, the whole height of the page.',{layout:'center',aurora:{cols:['#9060ff','#3dffa0','#30c8ff'],y:0.0,h:0.95,a:0.3},stars:70,shoot:12,acc:'#b890ff'});
  H('constellations','Rune Constellations','Runes drawn as constellations — stars joined by thin lines that fade in and out.',{layout:'bottom',stars:110,shoot:10,runes:'const',acc:'#cfe4ff'});
  H('four_realms','Four Realms','A whisper of each realm\'s colour in the four corners: grass, water, stone, ember.',{layout:'center',stars:50,corners:['#4fd070','#40b0ff','#a8a0c0','#ff7030'],runes:'corners',acc:'#e8e0d0'});
  H('ember_frost','Ember & Frost','Cold aurora on the horizon while warm embers rise from below.',{layout:'left',stars:60,aurora:{cols:['#40e0ff'],y:0.5,h:0.22,a:0.4},embers:26,sil:'peaks',acc:'#ff9a50'});
  H('rune_frame','Rune Frame','A thin frame of runes around the page, lighting up in turn like a slow heartbeat.',{layout:'center',stars:36,runes:'border',shoot:18,acc:'#4fe8ff'});
  H('monolith','Lone Waystone','One waystone on the right with a pulsing rune and a spirit circling it.',{layout:'left',stars:70,sil:'stone',spirits:1,orbit:true,shoot:15,acc:'#7fd8e8'});
  H('moonlit','Moonlit Peaks','Crescent moon, quiet mountains, a breath of aurora and the odd shooting star.',{layout:'bottom',stars:80,sil:'peaks',moon:true,shoot:8,aurora:{cols:['#60ffc0'],y:0.3,h:0.18,a:0.25},acc:'#d8d0ff'});
  H('spirit_ring','Spirit Ring','Spirits circling the logo in a slow ring, runes between them.',{layout:'center',stars:40,spirits:6,ring:true,runes:'ring',acc:'#6ff0e0'});
  H('quiet_dark','Quiet Dark','Almost nothing: black, a few stars, one slow glow behind the logo. The calmest option.',{layout:'center',stars:24,shoot:22,glow:0.8,acc:'#6fe3f5'});
  var runeAt=function(c,x,y,h,i,rot,col,al,lw){ c.save(); c.globalAlpha=al; c.strokeStyle=col; c.lineWidth=lw||1.2; c.lineCap='round'; ZBrand.P(c,3,1).rune(x,y,h,i,rot); c.lineWidth=lw||1.2; c.restore(); };
  ZBrand.home=function(c,cfg,W,Hh,t,o){ o=o||{}; var acc=cfg.acc, R=rnd(cfg.id.length*7+3), i;
    c.fillStyle='#000'; c.fillRect(0,0,W,Hh);
    var L={center:{lx:0.5,ly:0.3,wy:0.57,by:0.73,ty:0.87,al:'center'},left:{lx:0.37,ly:0.3,wy:0.57,by:0.73,ty:0.87,al:'center'},bottom:{lx:0.5,ly:0.26,wy:0.5,by:0.66,ty:0.82,al:'center'}}[cfg.layout]||{}, cx=W*L.lx, cy=Hh*L.ly, SR=Hh*0.17;
    // corner colours (four realms)
    if(cfg.corners)cfg.corners.forEach(function(col,k){ var x=k%2?W:0, y=k<2?0:Hh, g=c.createRadialGradient(x,y,0,x,y,W*0.42); g.addColorStop(0,ZBrand.rgba(col,0.2+0.07*Math.sin(t*0.5+k))); g.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=g; c.fillRect(0,0,W,Hh); });
    // stars
    for(i=0;i<(cfg.stars||0);i++){ var sx=R()*W, sy=R()*Hh*(cfg.sil?0.8:1), ph=R()*6.3, sz=R()<0.08?1.6:0.9; c.globalAlpha=0.25+0.55*(0.5+0.5*Math.sin(t*(0.6+R())+ph)); c.fillStyle='#fff'; c.fillRect(sx,sy,sz,sz); } c.globalAlpha=1;
    // aurora: soft vertical strips whose top edge waves
    if(cfg.aurora){ var A=cfg.aurora; c.save(); c.globalCompositeOperation='lighter'; A.cols.forEach(function(col,b){ for(var x=0;x<W;x+=5){ var y0=Hh*A.y+Math.sin(x*0.011+t*0.22+b*1.7)*Hh*0.06+Math.sin(x*0.027-t*0.13+b)*Hh*0.03, hh=Hh*A.h*(0.55+0.45*Math.sin(x*0.017+t*0.3+b*2.1)), al=A.a*(0.35+0.65*Math.pow(0.5+0.5*Math.sin(x*0.021-t*0.35+b*1.3),2))/A.cols.length*1.6;
          var g=c.createLinearGradient(0,y0,0,y0+hh); g.addColorStop(0,ZBrand.rgba(col,0)); g.addColorStop(0.18,ZBrand.rgba(col,al)); g.addColorStop(1,ZBrand.rgba(col,0)); c.fillStyle=g; c.fillRect(x,y0,5,hh); } }); c.restore(); }
    // moon
    if(cfg.moon){ var mx=W*0.8, my=Hh*0.2, mr=Hh*0.07; c.save(); c.shadowColor='#d8d0ff'; c.shadowBlur=18; c.fillStyle='#e8e4ff'; c.beginPath(); c.arc(mx,my,mr,0,PI*2); c.fill(); c.shadowBlur=0; c.fillStyle='#000'; c.beginPath(); c.arc(mx+mr*0.45,my-mr*0.1,mr*0.92,0,PI*2); c.fill(); c.restore(); }
    // shooting stars
    if(cfg.shoot){ var per=cfg.shoot, n=Math.floor(t/per), u=(t-n*per)/1.1; if(u<1){ var Q=rnd(n*13+5), x0=W*(0.15+Q()*0.7), y0b=Hh*(0.05+Q()*0.3), dx=W*0.28*(Q()<0.5?-1:1), dy=Hh*0.2, hx=x0+dx*u, hy=y0b+dy*u, g2=c.createLinearGradient(hx,hy,hx-dx*0.22,hy-dy*0.22); g2.addColorStop(0,'rgba(255,255,255,'+(0.9*(1-u))+')'); g2.addColorStop(1,'rgba(255,255,255,0)'); c.strokeStyle=g2; c.lineWidth=1.6; c.beginPath(); c.moveTo(hx,hy); c.lineTo(hx-dx*0.22,hy-dy*0.22); c.stroke(); } }
    // silhouettes
    if(cfg.sil==='peaks'){ c.fillStyle='#04070b'; c.beginPath(); c.moveTo(0,Hh); var Rp=rnd(41); for(var px=0;px<=W;px+=W/14)c.lineTo(px,Hh*(0.72+Rp()*0.16)); c.lineTo(W,Hh); c.fill(); c.strokeStyle=ZBrand.rgba(acc,0.16); c.lineWidth=1; c.stroke(); }
    if(cfg.sil==='tree'){ var T=ZBrand.byId('world_tree'); ZBrand.symbol(c,Object.assign({},T,{id:'home_tree',col:'#2a6a44',style:'neon',draw:function(P){ T.draw(P,2); }}),W*0.76,Hh*0.52,Hh*0.4,2,t,0.32);
      for(i=0;i<9;i++){ var an=-PI*0.9+i/8*PI*0.8, rr=Hh*(0.26+0.08*(i%3)), on=Math.pow(0.5+0.5*Math.sin(t*0.7-i*0.8),6); runeAt(c,W*0.76+Math.cos(an)*rr,Hh*0.5+Math.sin(an)*rr,Hh*0.035,i*3,0,acc,0.15+0.8*on,1.2); } }
    if(cfg.sil==='gate'){ var gx=W*0.5, gy=Hh*0.5, gw=Hh*0.36; c.save(); var gg=c.createRadialGradient(gx,gy,0,gx,gy,gw*1.2); gg.addColorStop(0,ZBrand.rgba(acc,0.16+0.08*Math.sin(t*0.8))); gg.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=gg; c.fillRect(0,0,W,Hh);
      c.strokeStyle='#0c1018'; c.lineWidth=Hh*0.07; c.beginPath(); c.moveTo(gx-gw,Hh*0.98); c.lineTo(gx-gw,gy-gw*0.2); c.arc(gx,gy-gw*0.2,gw,PI,PI*2); c.lineTo(gx+gw,Hh*0.98); c.stroke(); c.strokeStyle=ZBrand.rgba(acc,0.25); c.lineWidth=1; c.stroke(); c.restore();
      for(i=0;i<9;i++){ var ga=PI+i/8*PI, on2=Math.pow(0.5+0.5*Math.sin(t*0.9-i*0.7),5); runeAt(c,gx+Math.cos(ga)*gw,gy-gw*0.2+Math.sin(ga)*gw,Hh*0.035,i*3+1,ga+PI/2,acc,0.2+0.8*on2,1.2); } }
    if(cfg.sil==='stone'){ var stx=W*0.76, sty=Hh*0.56, sh=Hh*0.5; c.fillStyle='#070a10'; c.strokeStyle=ZBrand.rgba(acc,0.22); c.lineWidth=1; c.beginPath(); c.moveTo(stx-sh*0.2,sty+sh*0.42); c.lineTo(stx-sh*0.24,sty-sh*0.15); c.lineTo(stx-sh*0.1,sty-sh*0.44); c.lineTo(stx+sh*0.1,sty-sh*0.46); c.lineTo(stx+sh*0.24,sty-sh*0.16); c.lineTo(stx+sh*0.2,sty+sh*0.42); c.closePath(); c.fill(); c.stroke();
      c.save(); c.shadowColor=acc; c.shadowBlur=14; runeAt(c,stx,sty-sh*0.06,sh*0.26,4,0,acc,0.45+0.5*Math.sin(t*1.1),2.4); c.restore(); }
    // glow breathing behind the logo
    var gl=c.createRadialGradient(cx,cy,0,cx,cy,SR*2.6); gl.addColorStop(0,ZBrand.rgba(acc,(cfg.glow||0.3)*(0.2+0.12*Math.sin(t*0.7)))); gl.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=gl; c.fillRect(0,0,W,Hh);
    // runes
    if(cfg.runes==='ring'){ for(i=0;i<16;i++){ var ra=i/16*PI*2+t*0.05, on3=Math.pow(0.5+0.5*Math.sin(t*0.8-i*0.39),8); runeAt(c,cx+Math.cos(ra)*SR*1.75,cy+Math.sin(ra)*SR*1.75,SR*0.2,i*3,ra+PI/2,acc,0.16+0.7*on3,1.1); } }
    if(cfg.runes==='columns'){ [0.06,0.94].forEach(function(fx,s){ for(i=0;i<9;i++){ var on4=Math.pow(0.5+0.5*Math.sin(t*0.9-i*0.6+s*2),6); c.save(); c.shadowColor=acc; c.shadowBlur=8*on4; runeAt(c,W*fx,Hh*(0.1+i*0.1),Hh*0.055,i*5+s*3,0,acc,0.14+0.8*on4,1.4); c.restore(); } }); }
    if(cfg.runes==='border'){ c.strokeStyle=ZBrand.rgba(acc,0.22); c.lineWidth=1; c.strokeRect(W*0.03,Hh*0.05,W*0.94,Hh*0.9); var per2=2*(W*0.94+Hh*0.9), nB=44; for(i=0;i<nB;i++){ var d=i/nB*per2, bx, by; if(d<W*0.94){ bx=W*0.03+d; by=Hh*0.05; } else if(d<W*0.94+Hh*0.9){ bx=W*0.97; by=Hh*0.05+d-W*0.94; } else if(d<W*1.88+Hh*0.9){ bx=W*0.97-(d-W*0.94-Hh*0.9); by=Hh*0.95; } else { bx=W*0.03; by=Hh*0.95-(d-W*1.88-Hh*0.9); }
        var on5=Math.pow(0.5+0.5*Math.sin(t*0.6-i*0.29),10); c.fillStyle='#000'; c.fillRect(bx-5,by-7,10,14); runeAt(c,bx,by,Hh*0.035,i*3,0,acc,0.2+0.8*on5,1.1); } }
    if(cfg.runes==='corners'){ [[0.06,0.1],[0.94,0.1],[0.06,0.9],[0.94,0.9]].forEach(function(q,k){ runeAt(c,W*q[0],Hh*q[1],Hh*0.07,k*2+1,0,cfg.corners[k],0.35+0.4*Math.sin(t*0.7+k*1.5),1.6); }); }
    if(cfg.runes==='const'){ var Rc=rnd(77); for(i=0;i<5;i++){ var qx=W*(0.12+Rc()*0.76), qy=Hh*(0.1+Rc()*0.34), hh2=Hh*0.12, on6=0.5+0.5*Math.sin(t*0.35+i*1.3); c.save(); c.translate(qx,qy); c.rotate((Rc()-0.5)*0.6); runeAt(c,0,0,hh2,i*3+2,0,acc,0.1+0.4*on6,0.8); c.fillStyle='#fff'; c.globalAlpha=0.5+0.5*on6; [[0,-hh2/2],[0,hh2/2],[hh2*0.36,0],[0,0]].forEach(function(v){ c.fillRect(v[0]-1,v[1]-1,2.2,2.2); }); c.restore(); } }
    // embers rising
    for(i=0;i<(cfg.embers||0);i++){ var ex=R()*W, sp=0.03+R()*0.05, off=R(), ey=Hh*(1-((t*sp+off)%1)), ea=Math.min(1,(Hh-ey)/(Hh*0.2))*Math.max(0,(ey-Hh*0.35)/(Hh*0.65)); c.fillStyle=ZBrand.rgba('#ff8040',0.8*ea); c.fillRect(ex+Math.sin(t+i)*6,ey,1.6,1.6); }
    // spirits: wisps with trails
    for(i=0;i<(cfg.spirits||0);i++){ var sc=['#5ff0d0','#9fe8ff','#b890ff','#7dffb0','#ffd070','#ff9ad0'][i%6]; for(var k=10;k>=0;k--){ var tt=t-k*0.07, px2, py2;
        if(cfg.ring){ var a2=tt*0.35+i/cfg.spirits*PI*2; px2=cx+Math.cos(a2)*SR*2.1; py2=cy+Math.sin(a2)*SR*1.5; }
        else if(cfg.orbit){ var a3=tt*0.6; px2=W*0.76+Math.cos(a3)*Hh*0.2; py2=Hh*0.5+Math.sin(a3)*Hh*0.1; }
        else { px2=W*(0.5+0.42*Math.sin(tt*(0.11+i*0.023)+i*2.1)); py2=Hh*(0.5+0.38*Math.sin(tt*(0.16+i*0.031)+i*1.3)); }
        var rr2=(k?Hh*0.012*(1-k/11):Hh*0.02), g3=c.createRadialGradient(px2,py2,0,px2,py2,rr2*3); g3.addColorStop(0,ZBrand.rgba(sc,k?0.22*(1-k/11):0.9)); g3.addColorStop(1,ZBrand.rgba(sc,0)); c.fillStyle=g3; c.fillRect(px2-rr2*3,py2-rr2*3,rr2*6,rr2*6); if(!k){ c.fillStyle='#fff'; c.beginPath(); c.arc(px2,py2,rr2*0.5,0,PI*2); c.fill(); } } }
    // logo + name + buttons + blurb (in the real page these are HTML; here they show the layout)
    ZBrand.symbol(c,o.sym||'world_tree',cx,cy,SR,2,t); ZBrand.word(c,o.word||'rune_carve',cx,Hh*L.wy,Hh*0.07,t);
    var bw=W*0.23, bh=Hh*0.085, by2=Hh*L.by; [['NEW GAME','#00cc88',cx-bw*0.56],['RETURNING PLAYER','#4488cc',cx+bw*0.56]].forEach(function(b){ c.fillStyle=ZBrand.rgba(b[1],0.13); c.strokeStyle=b[1]; c.lineWidth=1; c.fillRect(b[2]-bw/2,by2-bh/2,bw,bh); c.strokeRect(b[2]-bw/2,by2-bh/2,bw,bh); c.fillStyle=b[1]; c.font='600 '+Math.round(Hh*0.03)+'px "Segoe UI",system-ui,sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(b[0],b[2],by2); });
    c.fillStyle='rgba(190,205,225,.7)'; c.font=Math.round(Hh*0.03)+'px "Segoe UI",system-ui,sans-serif'; c.textAlign='center'; c.fillText('Four realms. One awakening. Wake the waystones, befriend the spirits,',cx,Hh*L.ty); c.fillText('and face the Volcano Lord.',cx,Hh*L.ty+Hh*0.045); };
})();
