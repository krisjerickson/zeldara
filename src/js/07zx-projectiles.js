// ═══════════════════════════════════════════════════════════════════════
// ║ PROJECTILES (round 14, Lab review): arrows, bolts, spells and monster shots
// ║ redrawn to look more real — options for Kris to pick from in the Lab.
// ║ Today the game draws every shot as a plain coloured circle; nothing in the
// ║ game changes until a look is picked.
// ║   ZProj.draw(ctx, kind, style, t, o)  one shot, centred at 0,0, flying toward +x
// ║   ZProj.trail(ctx, kind, style, pts, t)  what it leaves behind (pts = past positions)
// ║ kinds — arrows: arrow, arrow_cold, arrow_fire, arrow_heat, dart
// ║         spells: frost_bolt, fireball, lightning, ice_shards, void_orb
// ║         monsters: rock, spit, bone_arrow, dark_bolt
// ═══════════════════════════════════════════════════════════════════════
var ZProj={ PI:Math.PI,
  ARROWS:[
    {id:'ar_fletched',name:'Fletched Arrow',desc:'A real arrow: wooden shaft, steel broadhead, three feather vanes. It flies in a shallow arc with a soft shadow on the ground, and wobbles slightly.',head:'broad',arc:10,shadow:true,trail:'none'},
    {id:'ar_streak',name:'Arrow with Speed Lines',desc:'The same arrow flying flat and fast, with two thin speed lines behind it so it is easy to follow in a busy fight.',head:'broad',arc:0,trail:'streak'},
    {id:'ar_longbow',name:'Longbow Arc',desc:'A longer arrow lobbed high: its shadow runs along the ground below it and the arrow tips down as it falls. Missed arrows stick in the ground for a moment.',head:'leaf',len:1.3,arc:26,shadow:true,stick:true,trail:'none'},
    {id:'ar_bodkin',name:'Heavy Bodkin',desc:'Thick shaft, narrow armour-piercing point, short stiff fletching. Flies flat with a faint air ripple; hits with a small spark.',head:'bodkin',thick:1.5,arc:3,trail:'ripple',spark:true},
    {id:'ar_rune',name:'Rune-Fletched',desc:'A fine arrow with teal fletching and a rune that glows along the shaft — it ties the arrows to the Zeldara look. Leaves a short glimmer.',head:'leaf',arc:8,shadow:true,rune:true,trail:'glimmer'},
    {id:'ar_pixel',name:'Pixel Arrow',desc:'The fletched arrow drawn in chunky pixels to match the hero sprite, with a two-pixel motion blur.',head:'broad',arc:8,shadow:true,pixel:true,trail:'none'}],
  SPELLS:[
    {id:'sp_solid',name:'Solid Elements',desc:'Each spell is a thing you could touch: a faceted icicle, a burning ball with licking flames and smoke, a forked bolt of lightning, spinning ice crystals, a dark orb with a bright ring.',mode:'solid'},
    {id:'sp_comet',name:'Comets',desc:'A bright core with a long tapering tail of sparks in the spell\'s colour — clear to read at speed.',mode:'comet'},
    {id:'sp_rune',name:'Rune-Cast',desc:'The solid shapes, each wrapped in a small turning ring of runes in its colour — magic that looks cast, not thrown.',mode:'rune'},
    {id:'sp_paint',name:'Painterly Glow',desc:'Soft layered light with drifting wisps; the gentlest look, closest to the aurora on the title screen.',mode:'paint'},
    {id:'sp_pixel',name:'Pixel Spells',desc:'The solid shapes in chunky pixels to match the sprites.',mode:'solid',pixel:true}],
  SHOTS:[
    {id:'en_real',name:'Real Things',desc:'A tumbling rock with a shadow, a glob of spit trailing drips, a bone arrow with black fletching, a dark bolt with smoke.',mode:'real'},
    {id:'en_warn',name:'Real Things, with a Warning Edge',desc:'The same shots with a thin red rim so anything that can hurt you stands out against the ground.',mode:'real',warn:true},
    {id:'en_glow',name:'Glowing Shots',desc:'Each shot carries a coloured glow and a short tail — easier to see in dark dungeons.',mode:'glow'},
    {id:'en_pixel',name:'Pixel Shots',desc:'The real shapes in chunky pixels.',mode:'real',pixel:true}],
  ELEM:{arrow:null,dart:null,arrow_cold:'#aee6ff',arrow_fire:'#ff8a2a',arrow_heat:'#ff4a4a',frost_bolt:'#9fe2ff',fireball:'#ff7a1a',lightning:'#ffe86a',ice_shards:'#bfe8ff',void_orb:'#9a4dff',rock:'#8a8478',spit:'#8fd04a',bone_arrow:'#e8e2d0',dark_bolt:'#b060ff'},
  rnd:function(s){ s=Math.sin(s*127.1)*43758.5453; return s-Math.floor(s); },
  // ── one arrow / dart, pointing +x, about 34 px long at scale 1 ──
  arrow:function(c,kind,S,t){ var dart=kind==='dart', len=34*(S.len||1)*(dart?0.62:1), th=(S.thick||1)*(dart?1.5:1), el=ZProj.ELEM[kind], x0=-len/2, x1=len/2, wob=Math.sin(t*26)*0.5;
    c.lineCap='round'; c.lineJoin='round';
    // shaft
    c.strokeStyle='#5a4226'; c.lineWidth=2.2*th; c.beginPath(); c.moveTo(x0+3,wob); c.lineTo(x1-6,0); c.stroke(); c.strokeStyle='#a8845a'; c.lineWidth=1*th; c.beginPath(); c.moveTo(x0+3,wob-0.5*th); c.lineTo(x1-6,-0.5*th); c.stroke();
    if(S.rune){ c.save(); c.strokeStyle='#63f2dc'; c.shadowColor='#63f2dc'; c.shadowBlur=5; c.lineWidth=0.9; for(var i=0;i<4;i++){ var rx=-len*0.12+i*5; c.beginPath(); c.moveTo(rx,-1.4); c.lineTo(rx+1.6,0); c.lineTo(rx,1.4); c.stroke(); } c.restore(); }
    // head
    var hc=el&&kind!=='arrow_heat'?el:'#d5dbe0', hd=el&&kind!=='arrow_heat'?ZProj.shade(el,-0.35):'#7c858e'; c.fillStyle=hc; c.strokeStyle=hd; c.lineWidth=0.8; c.beginPath();
    if(S.head==='bodkin'||dart){ c.moveTo(x1+1,0); c.lineTo(x1-7,-1.7*th); c.lineTo(x1-9,0); c.lineTo(x1-7,1.7*th); }
    else if(S.head==='leaf'){ c.moveTo(x1+1,0); c.quadraticCurveTo(x1-4,-4,x1-10,-1.2); c.lineTo(x1-8,0); c.lineTo(x1-10,1.2); c.quadraticCurveTo(x1-4,4,x1+1,0); }
    else { c.moveTo(x1+1,0); c.lineTo(x1-8,-4.2); c.lineTo(x1-6,0); c.lineTo(x1-8,4.2); }
    c.closePath(); c.fill(); c.stroke(); c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=0.6; c.beginPath(); c.moveTo(x1,0); c.lineTo(x1-6,-0.4); c.stroke();
    // fletching (three vanes: two seen edge-on, one flat)
    var fc=kind==='arrow_heat'?'#e0483a':S.rune?'#3fd6c0':dart?'#b8915a':'#e8e4d6', fl=dart?5:9; c.fillStyle=fc; c.strokeStyle=ZProj.shade(fc,-0.4); c.lineWidth=0.5;
    [[-1,1],[1,1]].forEach(function(q){ c.beginPath(); c.moveTo(x0+2,wob+q[0]*0.6); c.lineTo(x0+1,wob+q[0]*(4.2*th)); c.lineTo(x0+fl,wob+q[0]*(3.2*th)); c.lineTo(x0+fl+3,wob+q[0]*0.6); c.closePath(); c.fill(); c.stroke(); });
    c.fillStyle=ZProj.shade(fc,-0.18); c.fillRect(x0+2,wob-0.7,fl,1.4); c.fillStyle='#3a2a18'; c.fillRect(x0,wob-1.1,2.4,2.2);
    // elements on the head
    if(kind==='arrow_fire'){ ZProj.flame(c,x1-4,0,7,t,1); }
    if(kind==='arrow_cold'){ c.save(); c.globalCompositeOperation='lighter'; var g=c.createRadialGradient(x1-4,0,0,x1-4,0,9); g.addColorStop(0,'rgba(190,235,255,.75)'); g.addColorStop(1,'rgba(190,235,255,0)'); c.fillStyle=g; c.fillRect(x1-14,-10,20,20); c.restore(); c.strokeStyle='#eaf8ff'; c.lineWidth=0.7; for(var k=0;k<3;k++){ c.beginPath(); c.moveTo(x1-9-k*3,-2-k); c.lineTo(x1-12-k*3,-5-k); c.moveTo(x1-9-k*3,2+k); c.lineTo(x1-12-k*3,5+k); c.stroke(); } }
    if(kind==='arrow_heat'){ c.save(); c.globalCompositeOperation='lighter'; var g2=c.createRadialGradient(x1-3,0,0,x1-3,0,6+Math.sin(t*14)); g2.addColorStop(0,'rgba(255,90,60,.9)'); g2.addColorStop(1,'rgba(255,90,60,0)'); c.fillStyle=g2; c.fillRect(x1-12,-9,18,18); c.restore(); } },
  flame:function(c,x,y,r,t,dir){ c.save(); c.globalCompositeOperation='lighter'; for(var i=0;i<5;i++){ var ph=t*9+i*1.7, l=r*(1.6+0.7*Math.sin(ph)), yy=y+Math.sin(ph*1.3+i)*r*0.35, g=c.createRadialGradient(x-dir*l*0.3*i/2,yy,0,x-dir*l*0.3*i/2,yy,r*(1.1-i*0.12)); g.addColorStop(0,i<2?'rgba(255,240,170,.95)':'rgba(255,150,40,.7)'); g.addColorStop(1,'rgba(255,70,10,0)'); c.fillStyle=g; c.beginPath(); c.ellipse(x-dir*l*0.3*i/2,yy,r*(1.5-i*0.1),r*(0.95-i*0.13),0,0,Math.PI*2); c.fill(); } c.restore(); },
  shade:function(hex,k){ var a=parseInt(hex.slice(1),16), f=function(s){ var v=(a>>s)&255; v=k<0?v*(1+k):v+(255-v)*k; return Math.max(0,Math.min(255,Math.round(v))); }; return 'rgb('+f(16)+','+f(8)+','+f(0)+')'; },
  glow:function(c,x,y,r,col,a){ c.save(); c.globalCompositeOperation='lighter'; var g=c.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,ZBrand.rgba(col,a)); g.addColorStop(1,ZBrand.rgba(col,0)); c.fillStyle=g; c.fillRect(x-r,y-r,r*2,r*2); c.restore(); },
  shard:function(c,x,y,l,w,rot,col){ c.save(); c.translate(x,y); c.rotate(rot); var g=c.createLinearGradient(0,-w,0,w); g.addColorStop(0,'#ffffff'); g.addColorStop(0.5,col); g.addColorStop(1,ZProj.shade(col,-0.45)); c.fillStyle=g; c.strokeStyle=ZProj.shade(col,-0.5); c.lineWidth=0.7; c.beginPath(); c.moveTo(l,0); c.lineTo(l*0.2,-w); c.lineTo(-l,-w*0.45); c.lineTo(-l*0.8,0); c.lineTo(-l,w*0.45); c.lineTo(l*0.2,w); c.closePath(); c.fill(); c.stroke(); c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=0.6; c.beginPath(); c.moveTo(l,0); c.lineTo(-l*0.8,0); c.moveTo(l*0.2,-w); c.lineTo(l*0.05,0); c.stroke(); c.restore(); },
  bolt:function(c,x0,x1,amp,seed,col,w){ var n=7, pts=[[x0,0]]; for(var i=1;i<n;i++)pts.push([x0+(x1-x0)*i/n,(ZProj.rnd(seed+i)-0.5)*amp*2]); pts.push([x1,0]);
    [[w*3.2,ZBrand.rgba(col,0.25)],[w*1.6,ZBrand.rgba(col,0.7)],[w*0.7,'#ffffff']].forEach(function(p){ c.strokeStyle=p[1]; c.lineWidth=p[0]; c.lineJoin='miter'; c.beginPath(); pts.forEach(function(q,i){ if(i)c.lineTo(q[0],q[1]); else c.moveTo(q[0],q[1]); }); c.stroke(); });
    var m=pts[3]; c.strokeStyle=ZBrand.rgba(col,0.8); c.lineWidth=w*0.7; c.beginPath(); c.moveTo(m[0],m[1]); c.lineTo(m[0]-6,m[1]+(ZProj.rnd(seed+9)-0.5)*amp*3); c.lineTo(m[0]-11,m[1]+(ZProj.rnd(seed+11)-0.5)*amp*4); c.stroke(); },
  // ── one spell ──
  spell:function(c,kind,S,t){ var col=ZProj.ELEM[kind], m=S.mode, i;
    if(m==='comet'){ var L=kind==='void_orb'?26:44, g=c.createLinearGradient(-L,0,6,0); g.addColorStop(0,ZBrand.rgba(col,0)); g.addColorStop(1,ZBrand.rgba(col,0.9)); c.fillStyle=g; c.beginPath(); c.moveTo(4,-5); c.quadraticCurveTo(-L*0.4,-3,-L,0); c.quadraticCurveTo(-L*0.4,3,4,5); c.closePath(); c.fill();
      for(i=0;i<7;i++){ var u=ZProj.rnd(i+Math.floor(t*12)*0.37); c.fillStyle=ZBrand.rgba(col,0.9*(1-u)); c.fillRect(-u*L,(ZProj.rnd(i*3+Math.floor(t*12))-0.5)*10*(0.4+u),1.6,1.6); }
      ZProj.glow(c,2,0,13,col,0.9); c.fillStyle=kind==='void_orb'?'#12041e':'#ffffff'; c.beginPath(); c.arc(2,0,kind==='void_orb'?5:3.6,0,Math.PI*2); c.fill(); return; }
    if(m==='paint'){ for(i=0;i<4;i++){ ZProj.glow(c,-i*6+Math.sin(t*5+i)*2,Math.sin(t*4+i*1.4)*3,14-i*2,col,0.5-i*0.09); } c.strokeStyle=ZBrand.rgba(col,0.6); c.lineWidth=1.2; c.lineCap='round'; for(i=0;i<3;i++){ c.beginPath(); for(var x=0;x>-34;x-=3){ var y=Math.sin(x*0.25+t*8+i*2)*(2+(-x)*0.14)+(i-1)*3; if(x)c.lineTo(x,y); else c.moveTo(x,y); } c.stroke(); }
      c.fillStyle=kind==='void_orb'?'#1a0630':'rgba(255,255,255,.95)'; c.beginPath(); c.arc(1,0,kind==='void_orb'?5.5:3.2,0,Math.PI*2); c.fill(); return; }
    // solid shapes (also the base of 'rune')
    if(kind==='frost_bolt'){ ZProj.glow(c,0,0,15,col,0.45); ZProj.shard(c,0,0,13,4.6,0,col); for(i=0;i<3;i++){ c.fillStyle='rgba(235,250,255,.9)'; var sx=-14-i*6-((t*40)%6), sy=Math.sin(i*2+t*9)*3; c.fillRect(sx,sy,1.6,1.6); } }
    else if(kind==='fireball'){ c.save(); c.globalAlpha=0.5; for(i=0;i<4;i++){ var u2=((t*1.6+i/4)%1); c.fillStyle='rgba(40,34,30,'+(0.5*(1-u2))+')'; c.beginPath(); c.arc(-10-u2*26,-u2*7+Math.sin(i)*3,3+u2*5,0,Math.PI*2); c.fill(); } c.restore();
      ZProj.flame(c,0,0,8.5,t,1); var g3=c.createRadialGradient(1,-1,0,0,0,8); g3.addColorStop(0,'#fff6c8'); g3.addColorStop(0.5,'#ffb030'); g3.addColorStop(1,'#d83a08'); c.fillStyle=g3; c.beginPath(); c.arc(0,0,7,0,Math.PI*2); c.fill(); }
    else if(kind==='lightning'){ ZProj.glow(c,6,0,12,col,0.6); ZProj.bolt(c,-34,10,6,Math.floor(t*22),col,1.5); c.fillStyle='#fff'; c.beginPath(); c.arc(10,0,2.6,0,Math.PI*2); c.fill(); }
    else if(kind==='ice_shards'){ ZProj.glow(c,0,0,13,col,0.35); for(i=0;i<3;i++){ var a=t*7+i*Math.PI*2/3; ZProj.shard(c,Math.cos(a)*5,Math.sin(a)*5,6.5,2.6,a*1.5,col); } }
    else if(kind==='void_orb'){ ZProj.glow(c,0,0,20,col,0.5); for(i=0;i<8;i++){ var a2=i/8*Math.PI*2+t*2.4, rr=17-((t*14+i*3)%11); c.fillStyle=ZBrand.rgba(col,0.85); c.fillRect(Math.cos(a2)*rr,Math.sin(a2)*rr,1.5,1.5); }
      var g4=c.createRadialGradient(-2,-2,0,0,0,9.5); g4.addColorStop(0,'#2a0a48'); g4.addColorStop(0.75,'#08010f'); g4.addColorStop(1,col); c.fillStyle=g4; c.beginPath(); c.arc(0,0,9.5,0,Math.PI*2); c.fill();
      c.strokeStyle='#e8c8ff'; c.lineWidth=1.2; c.beginPath(); c.ellipse(0,0,14,4.4,t*1.3,0,Math.PI*2); c.stroke(); }
    if(m==='rune'){ c.save(); c.rotate(t*2.2); c.strokeStyle=ZBrand.rgba(col,0.9); c.shadowColor=col; c.shadowBlur=6; c.lineWidth=0.9; c.beginPath(); c.arc(0,0,15.5,0,Math.PI*2); c.stroke(); var P=ZBrand.P(c,3,1); c.lineWidth=1; for(i=0;i<6;i++){ var a3=i/6*Math.PI*2; P.rune(Math.cos(a3)*15.5,Math.sin(a3)*15.5,5,i*3+1,a3+Math.PI/2); } c.restore(); } },
  // ── one monster shot ──
  shot:function(c,kind,S,t){ var col=ZProj.ELEM[kind], i;
    if(S.mode==='glow'){ var L=30, g=c.createLinearGradient(-L,0,4,0); g.addColorStop(0,ZBrand.rgba(col,0)); g.addColorStop(1,ZBrand.rgba(col,0.75)); c.fillStyle=g; c.beginPath(); c.moveTo(3,-5); c.lineTo(-L,0); c.lineTo(3,5); c.closePath(); c.fill(); ZProj.glow(c,0,0,15,col,0.75); }
    if(kind==='rock'){ c.save(); c.rotate(t*7); var pts=[[7,-2],[4,-7],[-3,-7.5],[-8,-2],[-6.5,5],[0,8],[6.5,5]]; c.fillStyle='#8a8478'; c.strokeStyle='#3e3a34'; c.lineWidth=1; c.beginPath(); pts.forEach(function(q,i){ if(i)c.lineTo(q[0],q[1]); else c.moveTo(q[0],q[1]); }); c.closePath(); c.fill(); c.stroke(); c.fillStyle='#b0aa9c'; c.beginPath(); c.moveTo(4,-7); c.lineTo(-3,-7.5); c.lineTo(-1,-2); c.lineTo(5,-3); c.closePath(); c.fill(); c.strokeStyle='#5a554c'; c.beginPath(); c.moveTo(-1,-2); c.lineTo(-6.5,5); c.moveTo(-1,-2); c.lineTo(0,8); c.stroke(); c.restore(); }
    else if(kind==='spit'){ for(i=0;i<4;i++){ var u=((t*2.2+i/4)%1); c.fillStyle='rgba(120,190,60,'+(0.8*(1-u))+')'; c.beginPath(); c.arc(-8-u*24,2+u*u*14,2.6*(1-u*0.5),0,Math.PI*2); c.fill(); }
      var g2=c.createRadialGradient(-2,-2,0,0,0,8); g2.addColorStop(0,'#e4ffb0'); g2.addColorStop(0.6,'#8fd04a'); g2.addColorStop(1,'#3f7a1e'); c.fillStyle=g2; c.beginPath(); c.moveTo(8,0); c.bezierCurveTo(8,-7,-4,-7+Math.sin(t*12),-11,0); c.bezierCurveTo(-4,7+Math.cos(t*10),8,7,8,0); c.fill(); c.fillStyle='rgba(255,255,255,.75)'; c.beginPath(); c.ellipse(2,-2.5,2.4,1.2,-0.4,0,Math.PI*2); c.fill(); }
    else if(kind==='bone_arrow'){ c.lineCap='round'; c.strokeStyle='#8a8372'; c.lineWidth=2.6; c.beginPath(); c.moveTo(-15,0); c.lineTo(10,0); c.stroke(); c.strokeStyle='#efe9d6'; c.lineWidth=1.3; c.beginPath(); c.moveTo(-15,-0.5); c.lineTo(10,-0.5); c.stroke(); c.fillStyle='#efe9d6'; [-9,-1,7].forEach(function(x){ c.beginPath(); c.arc(x,0,1.9,0,Math.PI*2); c.fill(); });
      c.fillStyle='#d8d0b8'; c.strokeStyle='#6a6456'; c.lineWidth=0.8; c.beginPath(); c.moveTo(18,0); c.lineTo(9,-4); c.lineTo(11,0); c.lineTo(9,4); c.closePath(); c.fill(); c.stroke(); c.fillStyle='#1c1820'; [[-1],[1]].forEach(function(q){ c.beginPath(); c.moveTo(-14,q[0]*0.6); c.lineTo(-17,q[0]*4.4); c.lineTo(-9,q[0]*3.4); c.lineTo(-7,q[0]*0.6); c.closePath(); c.fill(); }); }
    else if(kind==='dark_bolt'){ c.save(); c.globalAlpha=0.55; for(i=0;i<4;i++){ var u3=((t*1.8+i/4)%1); c.fillStyle='rgba(30,10,46,'+(0.6*(1-u3))+')'; c.beginPath(); c.arc(-9-u3*22,Math.sin(i*2+t*3)*4,3+u3*4,0,Math.PI*2); c.fill(); } c.restore(); ZProj.shard(c,0,0,12,4.2,0,'#7a3ad0'); c.fillStyle='#12041e'; c.beginPath(); c.moveTo(9,0); c.lineTo(0,-2); c.lineTo(-9,0); c.lineTo(0,2); c.closePath(); c.fill(); }
    if(S.warn){ c.save(); c.globalCompositeOperation='source-over'; c.strokeStyle='rgba(255,60,50,.95)'; c.lineWidth=1.3; c.shadowColor='#ff3020'; c.shadowBlur=6; c.beginPath(); c.ellipse(0,0,kind==='bone_arrow'?19:11,kind==='bone_arrow'?6:10,0,0,Math.PI*2); c.stroke(); c.restore(); } },
  family:function(kind){ return /arrow$|^arrow|dart/.test(kind)&&kind!=='bone_arrow'?'arrow':ZProj.ELEM[kind]&&/frost|fire|light|ice|void/.test(kind)?'spell':'shot'; },
  // draw one shot (centred, pointing +x). o.scale, o.pixel are handled here.
  draw:function(c,kind,S,t){ var fam=ZProj.family(kind), f=function(q){ if(fam==='arrow')ZProj.arrow(q,kind,S,t); else if(fam==='spell')ZProj.spell(q,kind,S,t); else ZProj.shot(q,kind,S,t); };
    if(!S.pixel)return f(c);
    var k=3, W=96, H=60, cv=ZProj._px||(ZProj._px=ZBrand.mk(W/k,H/k)), q=cv.getContext('2d'); q.setTransform(1,0,0,1,0,0); q.clearRect(0,0,cv.width,cv.height); q.imageSmoothingEnabled=false; q.setTransform(1/k,0,0,1/k,W/2/k,H/2/k); f(q);
    var d=q.getImageData(0,0,cv.width,cv.height), a=d.data; for(var i=3;i<a.length;i+=4)a[i]=a[i]>110?255:0; q.putImageData(d,0,0);
    c.save(); c.imageSmoothingEnabled=false; c.drawImage(cv,-W/2,-H/2,W,H); c.restore(); },
  // what the shot leaves behind. pts = [[x,y],...] newest first, in the same space as the shot.
  trail:function(c,kind,S,pts,t){ var el=ZProj.ELEM[kind], n=pts.length, i; if(n<2)return; c.save(); c.lineCap='round';
    var line=function(col,w,a,len){ for(i=1;i<Math.min(n,len);i++){ c.strokeStyle=ZBrand.rgba(col,a*(1-i/len)); c.lineWidth=w*(1-i/len*0.7); c.beginPath(); c.moveTo(pts[i-1][0],pts[i-1][1]); c.lineTo(pts[i][0],pts[i][1]); c.stroke(); } };
    if(S.trail==='streak'){ c.translate(0,-2.4); line('#ffffff',1.1,0.55,9); c.translate(0,4.8); line('#ffffff',1.1,0.55,9); c.translate(0,-2.4); }
    if(S.trail==='ripple'){ for(i=2;i<Math.min(n,10);i+=3){ c.strokeStyle='rgba(255,255,255,'+(0.28*(1-i/10))+')'; c.lineWidth=1; c.beginPath(); c.ellipse(pts[i][0],pts[i][1],2,5+i*0.5,0,0,Math.PI*2); c.stroke(); } }
    if(S.trail==='glimmer'){ c.globalCompositeOperation='lighter'; line('#63f2dc',2.2,0.6,10); }
    if(kind==='arrow_cold'){ c.globalCompositeOperation='lighter'; for(i=1;i<Math.min(n,12);i+=1){ c.fillStyle='rgba(200,238,255,'+(0.5*(1-i/12))+')'; c.fillRect(pts[i][0]+(ZProj.rnd(i+7)-0.5)*6,pts[i][1]+(ZProj.rnd(i*3)-0.5)*8,1.5,1.5); } }
    if(kind==='arrow_fire'){ for(i=2;i<Math.min(n,14);i+=2){ c.fillStyle='rgba(50,44,40,'+(0.32*(1-i/14))+')'; c.beginPath(); c.arc(pts[i][0],pts[i][1]-i*0.5,1.5+i*0.35,0,Math.PI*2); c.fill(); } }
    if(kind==='arrow_heat'){ c.globalCompositeOperation='lighter'; line('#ff5a3a',1.6,0.6,12); }
    c.restore(); },
  byId:function(id){ return ZProj.ARROWS.concat(ZProj.SPELLS,ZProj.SHOTS).find(function(s){ return s.id===id; }); }
};
