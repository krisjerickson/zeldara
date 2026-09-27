// ── World designs: shared kinds, decorations and particles ─────────────
var WK_SOFT={grass:1,wild:1,heath:1,heather:1,meadow:1,marsh:1,moss:1,mud:1,scorch:1,dust:1,ash:1,soil:1,bloom:1,snow:1,earth:1,crust:1,grey:1,sheen:1,verge:1,shore:1,scar:1,char:1,glass:1,rubble:1,isle:1,aisle:1,crop:0};
function WK(id,a,b,o){ return Object.assign({id:id,a:a,b:b,soft:!!WK_SOFT[id]},o||{}); }
var WK_PATH=function(a,b){ return WK('path',a||'#8e826c',b||'#a89a7e',{pattern:'cobble',grout:'#4a4032',flat:true}); };
var WDECO={
  grass:function(col,dens){ return function(ctx,px,py,R){ if(!R.chance(dens||0.35))return; ctx.strokeStyle=col; ctx.lineWidth=1.3; for(var i=0;i<4;i++){ var bx=px+R.f()*30, by=py+8+R.f()*22; ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(bx+R.f()*4-2,by-4-R.f()*5); ctx.stroke(); } }; },
  dots:function(cols,dens,sz){ return function(ctx,px,py,R){ if(!R.chance(dens||0.3))return; for(var i=0;i<3;i++){ ctx.fillStyle=R.pick(cols); ctx.fillRect(px+R.f()*30,py+R.f()*30,sz||2,sz||2); } }; },
  flag:function(col,line){ return function(ctx,px,py,R,n,x,y){ ctx.strokeStyle=rgba(line||'#000000',0.22); ctx.lineWidth=1; ctx.strokeRect(px+0.5+(y%2)*16,py+0.5,LT-1,LT-1); if(R.chance(0.25)){ ctx.fillStyle=rgba(col,0.35); ctx.fillRect(px+R.f()*24,py+R.f()*24,8,5);} }; },
  planks:function(col,vert){ return function(ctx,px,py,R){ for(var i=0;i<LT;i+=8){ ctx.fillStyle=shade(col,(R.f()-0.5)*0.25); if(vert)ctx.fillRect(px+2,py+i,LT-4,7); else ctx.fillRect(px+i,py+2,7,LT-4); } ctx.fillStyle='rgba(0,0,0,.25)'; if(vert){ctx.fillRect(px+1,py,2,LT);ctx.fillRect(px+LT-3,py,2,LT);} else {ctx.fillRect(px,py+1,LT,2);ctx.fillRect(px,py+LT-3,LT,2);} }; },
  cracks:function(col,dens){ return function(ctx,px,py,R){ if(!R.chance(dens||0.25))return; ctx.strokeStyle=col; ctx.lineWidth=1.4; ctx.beginPath(); var x=px+R.f()*32,y=py+R.f()*32; ctx.moveTo(x,y); for(var i=0;i<3;i++){ x+=R.f()*16-8; y+=R.f()*16-8; ctx.lineTo(x,y);} ctx.stroke(); }; },
  glowCracks:function(col,dens){ return function(ctx,px,py,R,n,x,y,c){ if(!R.chance(dens||0.2))return; ctx.save(); ctx.shadowColor=col; ctx.shadowBlur=8; ctx.strokeStyle=col; ctx.lineWidth=1.6; ctx.beginPath(); var X=px+R.f()*32,Y=py+R.f()*32; ctx.moveTo(X,Y); for(var i=0;i<4;i++){ X+=R.f()*18-9; Y+=R.f()*18-9; ctx.lineTo(X,Y);} ctx.stroke(); ctx.restore(); if(R.chance(0.25))addLight(c.m,px+16,py+16,46,col,0.3,{pulse:0.4,period:1600+R.i(0,1400),depth:-4,noCut:true}); }; },
  ripple:function(col){ return function(ctx,px,py,R){ if(!R.chance(0.18))return; ctx.strokeStyle=rgba(col,0.35); ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(px+R.f()*32,py+R.f()*32,6+R.f()*6,2+R.f()*2,0,0,Math.PI*2); ctx.stroke(); }; },
  steps:function(col){ return function(ctx,px,py){ for(var i=0;i<4;i++){ ctx.fillStyle=shade(col,-0.08*i); ctx.fillRect(px,py+i*8,LT,7); ctx.fillStyle='rgba(255,255,255,.15)'; ctx.fillRect(px,py+i*8,LT,1);} }; }
};
var WPART={
  motes:function(col,f){ return {col:col,freq:f||140,scale:{start:0.35,end:0},alpha:{start:0.8,end:0},vx:{min:-5,max:5},vy:{min:-9,max:-2},life:{min:3000,max:6500}}; },
  fireflies:function(area){ return {tints:['#eaff80','#b8ff80','#fff4a0'],freq:110,scale:{start:0.5,end:0.1},alpha:{start:1,end:0},vx:{min:-12,max:12},vy:{min:-10,max:10},life:{min:2500,max:5000},area:area}; },
  petals:function(cols){ return {tex:'leaf',tints:cols||['#ffc6de','#ff9cc8','#fff0f6'],freq:260,vx:{min:12,max:30},vy:{min:6,max:16},scale:{start:0.8,end:0.5},alpha:{start:0.9,end:0},life:{min:6000,max:9000},blend:false,rotate:{min:0,max:360},depth:6500}; },
  ash:function(){ return {tints:['#c8c4c0','#a8a4a0','#e8e4e0'],freq:60,vx:{min:4,max:14},vy:{min:10,max:24},scale:{start:0.45,end:0.3},alpha:{start:0.8,end:0},life:{min:5000,max:9000},blend:false,depth:6500}; },
  embers:function(f){ return {tints:['#ffb040','#ff6020','#ffd070'],freq:f||90,vx:{min:-8,max:8},vy:{min:-40,max:-12},scale:{start:0.45,end:0},alpha:{start:1,end:0},life:{min:1500,max:3200}}; },
  mist:function(col){ return {col:col||'#dfe8f0',freq:420,scale:{start:4,end:7},alpha:{start:0.10,end:0},vx:{min:4,max:12},vy:{min:-2,max:2},life:{min:8000,max:12000},blend:false,depth:6400}; },
  snow:function(){ return {col:'#ffffff',freq:50,vx:{min:-6,max:10},vy:{min:14,max:30},scale:{start:0.4,end:0.3},alpha:{start:0.9,end:0.2},life:{min:5000,max:8000},blend:false,depth:6500}; },
  wind:function(){ return {col:'#f4f8ff',freq:90,vx:{min:90,max:150},vy:{min:-6,max:6},scale:{start:0.25,end:0.1},alpha:{start:0.55,end:0},life:{min:1500,max:2500},blend:false,depth:6500}; },
  dust:function(col){ return {col:col||'#e0c8a0',freq:200,vx:{min:4,max:16},vy:{min:-3,max:3},scale:{start:0.3,end:0},alpha:{start:0.5,end:0},life:{min:4000,max:7000},blend:false}; }
};
// A few larger shared set pieces
WPROP.windmill=function(c,ctx,x,y,w,h,o){ var m=c.m;
  addSprite(m,x+w/2,y+h,w+30,190,function(g,W,H){ softShadow(g,W/2,H-6,W/2-10,9,0.35); var gr=g.createLinearGradient(W/2-22,0,W/2+22,0); gr.addColorStop(0,'#e8dcc4'); gr.addColorStop(1,'#b8a888'); g.fillStyle=gr; g.beginPath(); g.moveTo(W/2-24,H-6); g.lineTo(W/2-15,H-120); g.lineTo(W/2+15,H-120); g.lineTo(W/2+24,H-6); g.fill(); g.fillStyle='#7a4b32'; g.beginPath(); g.moveTo(W/2-22,H-118); g.lineTo(W/2,H-150); g.lineTo(W/2+22,H-118); g.fill(); g.fillStyle='#5a3a26'; g.fillRect(W/2-6,H-30,12,24); g.fillStyle='#ffd27a'; g.fillRect(W/2-4,H-80,8,10); drawRune(g,W/2,H-100,12,o.rune||'#6fe3f5',c.R.i(0,9)); });
  addSprite(m,x+w/2,y+h-128,150,150,function(g,W,H){ g.translate(W/2,H/2); for(var i=0;i<4;i++){ g.rotate(Math.PI/2); g.fillStyle='#6a4a30'; g.fillRect(-2,0,4,70); g.fillStyle='rgba(240,232,210,.92)'; g.fillRect(4,14,16,54); g.strokeStyle='rgba(106,74,48,.8)'; g.lineWidth=1; for(var k=0;k<5;k++){ g.beginPath(); g.moveTo(4,18+k*10); g.lineTo(20,18+k*10); g.stroke(); } } g.fillStyle='#4a3020'; g.beginPath(); g.arc(0,0,6,0,Math.PI*2); g.fill(); });
  var sp=m.sprites[m.sprites.length-1]; sp.ox=0.5; sp.oy=0.5; sp.spin=9000+c.R.i(0,4000); sp.depth=y+h+1;
  addLight(m,x+w/2,y+h-100,50,o.rune||'#6fe3f5',0.3,{react:true,rune:true});
};
WPROP.kite=function(c,ctx,x,y,w,h,o){ var m=c.m,R=c.R,col=R.pick(['#ff7a6a','#ffd27a','#8fd0ff','#c8a0ff']), gx=x+w/2, gy=y+h;
  ctx.strokeStyle='rgba(255,255,255,.35)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(gx,gy); ctx.quadraticCurveTo(gx+30,gy-60,gx+46,gy-120); ctx.stroke(); ctx.fillStyle='#5a3a26'; ctx.fillRect(gx-2,gy-6,4,6);
  addSprite(m,gx+46,gy-100,50,60,function(g,W,H){ g.fillStyle=col; g.beginPath(); g.moveTo(W/2,4); g.lineTo(W-6,H/2-4); g.lineTo(W/2,H-12); g.lineTo(6,H/2-4); g.closePath(); g.fill(); g.strokeStyle='rgba(0,0,0,.25)'; g.stroke(); drawRune(g,W/2,H/2-5,14,'#e8fbff',R.i(0,9)); g.strokeStyle=col; g.beginPath(); g.moveTo(W/2,H-12); g.quadraticCurveTo(W/2+6,H-6,W/2-4,H); g.stroke(); });
  var sp=m.sprites[m.sprites.length-1]; sp.depth=8000; sp.bob=8; addLight(m,gx+46,gy-130,40,'#bff4ff',0.3,{react:true,rune:true,depth:8001});
};
WPROP.floatrock=function(c,ctx,x,y,w,h,o){ var m=c.m,R=c.R, s=o.s||1, alt=o.alt||110;
  softShadow(ctx,x+w/2,y+h/2,w*0.55,h*0.3,0.28);
  addSprite(m,x+w/2,y+h/2-alt,w+40,h+90,function(g,W,H){ var cx=W/2, top=H-60; g.fillStyle='#6a5e50'; g.beginPath(); g.moveTo(cx-w/2,top); g.lineTo(cx-w/4,top+40); g.lineTo(cx,H-4); g.lineTo(cx+w/4,top+36); g.lineTo(cx+w/2,top); g.closePath(); g.fill(); g.fillStyle='#4f463c'; g.fillRect(cx-4,top+10,8,40);
    g.fillStyle='#5f9a45'; g.beginPath(); g.ellipse(cx,top,w/2+4,16,0,0,Math.PI*2); g.fill(); g.fillStyle='#7ab85a'; g.beginPath(); g.ellipse(cx-6,top-4,w/2-10,9,0,0,Math.PI*2); g.fill();
    if(o.tree){ g.fillStyle='#5b4028'; g.fillRect(cx-3,top-40,6,36); for(var i=0;i<4;i++){ g.fillStyle=i%2?'#3f7a3a':'#57944a'; g.beginPath(); g.arc(cx+(R.f()-0.5)*26,top-44+(R.f()-0.5)*14,13,0,Math.PI*2); g.fill(); } }
    g.strokeStyle='#4a3a28'; g.lineWidth=1.5; for(var r=0;r<5;r++){ g.beginPath(); g.moveTo(cx-w/4+r*w/8,top+20); g.lineTo(cx-w/4+r*w/8+R.f()*6-3,top+44+R.f()*16); g.stroke(); }
    drawRune(g,cx,top+24,12,o.rune||'#9ff0ff',R.i(0,9)); });
  var sp=m.sprites[m.sprites.length-1]; sp.depth=8000; sp.bob=6+R.i(0,5);
  addLight(m,x+w/2,y+h/2-alt+30,60,o.rune||'#9ff0ff',0.35,{react:true,rune:true,depth:8001});
  if(o.chain){ var ax=x+w/2+(R.f()-0.5)*40, ay=y+h+30; ctx.strokeStyle='rgba(60,60,70,.8)'; ctx.lineWidth=3; ctx.setLineDash([5,3]); ctx.beginPath(); ctx.moveTo(x+w/2,y+h/2); ctx.lineTo(ax,ay); ctx.stroke(); ctx.setLineDash([]); }
};
WPROP.arch=function(c,ctx,x,y,w,h,o){ var col=o.col||'#bdb4a2', R=c.R; addSprite(c.m,x+w/2,y+h,w+20,150,function(g,W,H){ softShadow(g,W/2,H-4,W/2-4,7,0.35); g.fillStyle=shade(col,-0.15); g.fillRect(8,H-120,20,116); g.fillRect(W-28,H-120,20,116); g.fillStyle=col; g.beginPath(); g.moveTo(4,H-116); g.lineTo(W-4,H-116); g.lineTo(W-4,H-136); g.lineTo(4,H-136); g.fill(); g.strokeStyle=shade(col,-0.35); g.lineWidth=2; g.beginPath(); g.arc(W/2,H-90,W/2-28,Math.PI,0); g.stroke(); drawRune(g,W/2,H-126,14,o.rune||'#6fe3f5',R.i(0,9)); if(o.moss){ g.fillStyle='rgba(95,150,80,.55)'; g.fillRect(8,H-60,20,10); g.fillRect(W-28,H-40,20,8);} });
  addLight(c.m,x+w/2,y+h-126,70,o.rune||'#6fe3f5',0.38,{react:true,rune:true}); };

// ═══ NE Grasslands ═════════════════════════════════════════════════════
var G_GRASS=WK('grass','#4f8f3e','#6fae52',{sc:0.12,deco:WDECO.grass('rgba(40,90,30,.55)',0.4)});
var WORLD_DESIGNS=[];
WORLD_DESIGNS.push(
{ id:'fairy_rings', quad:1, seed:101, name:'Fairy-Ring Meadows', tagline:'Glowing mushroom rings in wildflower meadows', runeCol:'#e0a8ff',
  blurb:'Rolling meadows dotted with fairy rings: circles of glowing toadstools around faint rune circles that brighten as you step inside. Wildflowers, lone oaks and violet motes. The largest, the Queen\'s Ring, is the landmark.',
  ground:G_GRASS, kinds:[WK('wild','#3f7a34','#5c9a44',{deco:WDECO.grass('rgba(30,70,25,.6)',0.6)}),WK_PATH('#8a7e68','#a4967a')],
  hills:{sc:0.06,k:1.2},
  layout:function(c){ c.noise('wild',0.09,0.58); c.line('path',[[4,52],[18,44],[30,40],[44,30],[56,12]],2.4,5); },
  props:function(c){ c.place('mushring',24,14,8,8,{solid:false,n:16,col:'#e8a6ff',rune:'#e0a8ff',claim:true}); c.landmark(24,14,8,8,'The Queen\'s Ring — the oldest fairy ring. Its runes wake when you step inside.');
    for(var i=0;i<5;i++){ var p=c.randomOpen(); if(p&&Math.hypot(p.x-28,p.y-18)>10)c.place('mushring',p.x-2,p.y-2,5,5,{solid:false,n:9,col:c.R.pick(['#ffb0e0','#b0d8ff','#e8a6ff']),rune:'#e0a8ff'}); }
    c.scatter('tree',22,{kind:'round',col:'#3a7434',col2:'#5c9a48'}); c.scatter('bush',16,{col:'#3e6e36',berry:'#ff9ad8'});
    c.scatter('flowers',55,{solid:false,claim:false,cols:['#ffd6e8','#fff3a8','#d8c0ff','#ffffff']}); c.scatter('tuft',50,{solid:false,claim:false}); },
  particles:[WPART.motes('#e8b8ff',120)] },

{ id:'standing_stones', quad:1, seed:103, name:'Runic Standing Stones', tagline:'Stone circles joined by ley lines on the heath', runeCol:'#7fe8ff',
  blurb:'Open heath and heather with three ancient stone circles. Each stone carries a rune; a rune circle is carved in the middle, and glowing ley lines run between the circles across the grass.',
  ground:WK('heath','#6b7d4a','#879454',{sc:0.14,deco:WDECO.grass('rgba(60,70,30,.5)',0.35)}), kinds:[WK('heather','#6f5480','#8c6a98',{sc:0.2,deco:WDECO.dots(['#b890d0','#d8b0e8'],0.6)})],
  hills:{sc:0.05,k:1.6},
  layout:function(c){ c.noise('heather',0.1,0.56); },
  props:function(c){ var circles=[[16,16],[44,20],[30,44]];
    circles.forEach(function(q,ci){ c.place('runecircle',q[0]-2,q[1]-2,5,5,{solid:false,col:'#7fe8ff'}); for(var k=0;k<8;k++){ var a=k/8*Math.PI*2; c.place('stone',Math.round(q[0]+Math.cos(a)*5),Math.round(q[1]+Math.sin(a)*5),1,1,{rune:'#7fe8ff',tall:54+ci*8,noReach:false}); } });
    c.landmark(13,13,7,7,'The Elder Circle — eight stones, eight runes. Ley lines link it to the other circles.');
    c.leyLine([[16,16],[44,20],[30,44],[16,16]],'#7fe8ff');
    c.scatter('rock',18,{col:'#8a8578',moss:'#6a8a48'}); c.scatter('bush',10,{col:'#5a6a3a'}); c.scatter('tuft',40,{solid:false,claim:false,col:'#7a8a4a'}); },
  particles:[WPART.motes('#bff4ff',160)] },

{ id:'windmill_hills', quad:1, seed:107, name:'Windmill Hills', tagline:'Rolling hills, windmills and glyph kites', runeCol:'#ffd27a',
  blurb:'Big rolling green hills with golden crop strips, three windmills with turning sails, and kites painted with glowing glyphs tugging at their strings high above. Rune marks on each windmill brighten as you pass.',
  ground:WK('grass','#5f9a45','#86b85a',{sc:0.1,deco:WDECO.grass('rgba(50,100,35,.5)',0.3)}), kinds:[WK('crop','#c9b35a','#dcc56c',{sc:0.3,deco:function(ctx,px,py){ ctx.fillStyle='rgba(140,110,40,.35)'; for(var i=0;i<LT;i+=6)ctx.fillRect(px,py+i,LT,2); }}),WK_PATH('#948870','#ae9f82')],
  hills:{sc:0.045,k:2.6},
  layout:function(c){ for(var i=0;i<5;i++){ var y0=c.R.i(4,54),x0=c.R.i(2,40); c.rect('crop',x0,y0,c.R.i(8,16),c.R.i(3,5)); } c.line('path',[[2,40],[20,34],[34,36],[58,28]],2.2,4); c.line('path',[[30,36],[28,58]],2,3); },
  props:function(c){ [[12,20],[40,14],[46,44]].forEach(function(q,i){ c.place('windmill',q[0],q[1],2,2,{rune:'#ffd27a'}); }); c.landmark(11,18,4,4,'Old Mill — the miller paints a luck rune on every mill.');
    for(var k=0;k<6;k++){ var p=c.randomOpen('grass'); if(p)c.place('kite',p.x,p.y,1,1,{solid:false}); }
    c.scatter('tree',10,{kind:'round',col:'#3f7a3a'}); c.scatter('bush',12,{col:'#4a7a3a'}); c.scatter('flowers',30,{solid:false,claim:false,cols:['#fff3a8','#ffffff','#ffb0b0']}); },
  particles:[WPART.petals(['#fff6c8','#ffffff','#e8f0a0'])] },

{ id:'firefly_river', quad:1, seed:109, name:'Firefly River Valley', tagline:'A winding river, willows and fireflies', runeCol:'#c8ff80',
  blurb:'A lazy river winds down the valley between sandy banks and weeping willows. Two old bridges cross it; the stone one is carved with runes and hung with lanterns. Fireflies swarm over the water.',
  ground:WK('grass','#3e6e3a','#5a8a4a',{sc:0.12,deco:WDECO.grass('rgba(30,60,25,.55)',0.4)}),
  kinds:[WK('water','#23607f','#3a86a6',{solid:true,liquid:true,shore:'#d8f0e8',sc:0.08,deco:WDECO.ripple('#ffffff')}),WK('sand','#b8a57a','#cdb98c',{sc:0.3}),WK('bridge','#8a6a44','#9a7a50',{pattern:'planks',vert:false,flat:true}),WK('stonebridge','#a09a8a','#bab2a0',{pattern:'brick',grout:'#5a544a',flat:true})],
  layout:function(c){ var pts=[[8,0],[14,12],[26,20],[24,32],[34,42],[48,48],[54,60]]; c.line('sand',pts,9,6); c.line('water',pts,5.5,6); c.rect('bridge',10,11,9,2,['water','sand']); c.rect('stonebridge',25,33,2,8,['water','sand']); c.rect('stonebridge',21,33,10,3,['water','sand']); },
  props:function(c){ c.place('rail',21,32,10,1,{solid:false,any:true,claim:false,stone:true}); c.place('rail',21,36,4,1,{solid:false,any:true,claim:false,stone:true}); c.place('rail',27,36,4,1,{solid:false,any:true,claim:false,stone:true}); c.place('rail',10,10,9,1,{solid:false,any:true,claim:false}); c.place('rail',10,13,9,1,{solid:false,any:true,claim:false});
    c.landmark(21,32,10,4,'Lantern Bridge — the runes on its stones light up at dusk.'); [[21,32],[30,32],[21,36],[30,36]].forEach(function(q){ c.place('lantern',q[0],q[1],1,1,{col:'#ffe08a'}); });
    c.place('runeglyph',25,34,2,1,{solid:false,any:true,col:'#c8ff80',size:14});
    c.scatter('tree',16,{kind:'willow',col:'#4f8a44',col2:'#7ab860',on:'grass'}); c.scatter('reeds',30,{on:['sand','grass'],solid:false,n:8}); c.scatter('tree',8,{kind:'round',col:'#3a6e34',on:'grass'}); c.scatter('flowers',25,{solid:false,claim:false,on:'grass',cols:['#fff3a8','#c8e0ff']}); },
  particles:[WPART.fireflies({x:6*LT,y:4*LT,w:48*LT,h:56*LT})], nightA:0.55 },

{ id:'giant_bones', quad:1, seed:113, name:'Moss-covered Giant Bones', tagline:'An ancient giant\'s skeleton under the grass', runeCol:'#9fffc8',
  blurb:'The bones of something enormous lie half-buried in the meadow, green with moss and wildflowers. You walk between its ribs and along its spine to a skull the size of a house, whose eye sockets glow faintly.',
  ground:WK('grass','#577a3c','#739850',{sc:0.12,deco:WDECO.grass('rgba(40,70,25,.55)',0.4)}), kinds:[WK('moss','#46703a','#5b8c44',{sc:0.25,deco:WDECO.dots(['#7ab860','#9ad070'],0.5)})],
  layout:function(c){ c.line('moss',[[6,48],[20,40],[34,32],[46,20]],7,3); },
  props:function(c){ var spine=[[8,47],[12,45],[16,43],[20,41],[24,38],[28,36],[32,33],[36,30],[40,27]];
    spine.forEach(function(p,i){ c.place('rock',p[0],p[1],1,1,{col:'#ddd2b8',moss:'#6a9a50'}); if(i%2===0&&i<8){ c.place('rib',p[0]-2,p[1]-2,1,1,{moss:true,s:1.2}); c.place('rib',p[0]+2,p[1]+2,1,1,{moss:true,s:1.2,flip:true}); } });
    c.place('skull',42,21,3,3,{s:2.2,moss:true,eye:'#9fffc8'}); c.landmark(41,19,5,5,'The Sleeper\'s Skull — its eyes still glow on moonless nights.');
    c.place('runeglyph',44,26,1,1,{solid:false,col:'#9fffc8',size:14});
    c.scatter('flowers',45,{solid:false,claim:false,cols:['#ffffff','#fff3a8','#ffd6e8']}); c.scatter('tree',12,{kind:'round',col:'#3f7234'}); c.scatter('bush',14,{col:'#476e38'}); },
  particles:[WPART.motes('#b8ffd0',150)] },

{ id:'blossom_terraces', quad:1, seed:127, name:'Blossom Orchard Terraces', tagline:'Stepped orchards of cherry blossom', runeCol:'#ffb0d8',
  blurb:'Hillside terraces held up by low stone walls, each planted with rows of blossom trees. Stone stairs join the levels, lanterns line the steps, and pink petals drift across everything.',
  ground:WK('grass','#5d8f46','#78a85a',{sc:0.12,deco:WDECO.grass('rgba(40,80,30,.45)',0.3)}),
  kinds:[WK('terrace','#8a8070','#9a9080',{solid:true,wall:{top:'#a89c86',face:'#7a6e5e',strata:true,runes:0.03}}),WK('stairs','#a89c86','#a89c86',{deco:WDECO.steps('#b0a48e')})],
  hills:{sc:0.05,k:0.8},
  layout:function(c){ for(var y=10;y<58;y+=11){ for(var x=0;x<c.W;x++){ var yy=y+Math.round((c.nz(x*0.08,y)-0.5)*3); c.set(x,yy,'terrace'); } var sx=c.R.i(6,50); for(var k=0;k<2;k++){ var gx=sx+k*c.R.i(-20,20); gx=Math.max(3,Math.min(56,gx)); for(var d=-2;d<=2;d++)for(var dx=0;dx<2;dx++){ if(c.is(gx+dx,y+d,'terrace'))c.set(gx+dx,y+d,'stairs'); } } } },
  props:function(c){ for(var y=2;y<60;y+=3)for(var x=3;x<58;x+=4){ if(c.R.chance(0.72))c.place('tree',x+c.R.i(0,1),y,1,1,{kind:'blossom',col:'#e889b0',col2:'#ffc6de',trunk:'#5b3a2a',s:0.8}); }
    for(var y2=0;y2<c.H;y2++)for(var x2=0;x2<c.W;x2++){ if(c.is(x2,y2,'stairs')&&c.R.chance(0.2))c.place('lantern',x2+(c.R.chance(0.5)?-1:2),y2,1,1,{col:'#ffc0e0'}); }
    var p=c.randomOpen('grass'); if(p){ c.place('runecircle',p.x-1,p.y-1,3,3,{solid:false,col:'#ffb0d8',n:6}); c.landmark(p.x-1,p.y-1,3,3,'Blossom shrine — petals never settle inside the rune circle.'); } },
  particles:[WPART.petals()] },

{ id:'amphitheatre', quad:1, seed:131, name:'Sunken Amphitheatre Ruins', tagline:'Grass-grown stone tiers around a rune stage', runeCol:'#8fe8ff',
  blurb:'A huge ruined amphitheatre sunk into the meadow: rings of stone seating step down to a round stage carved with a rune circle. Broken columns ring the top; grass and flowers have claimed the seats.',
  ground:WK('grass','#58884a','#72a05a',{sc:0.12,deco:WDECO.grass('rgba(40,80,30,.45)',0.3)}),
  kinds:[WK('tier','#a8a090','#bcb4a2',{pattern:'tier',flat:true}),WK('stage','#c4bcaa','#d6cebc',{pattern:'slab',flat:true}),WK('ruinwall','#8a8272','#9a9282',{solid:true,wall:{top:'#b0a896',face:'#80786a',runes:0.06}})],
  layout:function(c){ var cx=30,cy=28; [15,12,9].forEach(function(r){ c.ring('tier',cx,cy,r,2.2); }); c.blob('stage',cx,cy,5,0.1); c.ring('ruinwall',cx,cy,18,1.2); for(var k=0;k<4;k++){ var a=k*Math.PI/2+0.4; for(var d=-2;d<=2;d++)for(var e=16;e<=20;e++)c.set(Math.round(cx+Math.cos(a)*e+d*Math.sin(a)),Math.round(cy+Math.sin(a)*e-d*Math.cos(a)),'grass','ruinwall'); } },
  spawnAt:[30,52],
  props:function(c){ [[25,23],[35,23],[25,33],[35,33],[30,22],[30,34],[24,28],[36,28]].forEach(function(q){ c.place('block',q[0],q[1],1,1,{rune:'#8fe8ff'}); }); c.place('runecircle',27,25,7,7,{solid:false,col:'#8fe8ff',n:10}); c.landmark(26,24,9,9,'The Singing Stage — whisper here and the runes answer.');
    for(var k=0;k<14;k++){ var a=k/14*Math.PI*2; c.place('column',Math.round(30+Math.cos(a)*21),Math.round(28+Math.sin(a)*21),1,1,{broken:c.R.chance(0.6),moss:true,rune:k%4===0?'#8fe8ff':null,col:'#cfc6b2'}); }
    c.scatter('flowers',40,{solid:false,claim:false,cols:['#fff3a8','#ffffff','#ffd6e8']}); c.scatter('tree',14,{kind:'round',col:'#3f7234',away:[30,28,22]}); c.scatter('rock',10,{col:'#b8b0a0',moss:'#6a9a50'}); },
  particles:[WPART.motes('#c8f4ff',150)] },

{ id:'floating_rocks', quad:1, seed:137, name:'Floating-Rock Meadow', tagline:'Grassy islets drifting above the meadow', runeCol:'#9ff0ff',
  blurb:'Chunks of meadow float in the air above the grass, trailing roots, each marked with a rune. Some are chained to rune-anchors in the ground. Their shadows drift over the flowers below.',
  ground:WK('grass','#5a9448','#7cb45e',{sc:0.12,deco:WDECO.grass('rgba(40,85,30,.45)',0.35)}), kinds:[WK('meadow','#6aa452','#8cc46a',{sc:0.2,deco:WDECO.dots(['#fff3a8','#ffffff','#c8e0ff'],0.5)})],
  hills:{sc:0.05,k:1.2},
  layout:function(c){ c.noise('meadow',0.08,0.52); },
  props:function(c){ for(var i=0;i<9;i++){ var p=c.randomOpen(); if(p)c.place('floatrock',p.x,p.y,3,2,{solid:false,claim:true,tree:c.R.chance(0.5),chain:c.R.chance(0.5),alt:90+c.R.i(0,70)}); }
    for(var j=0;j<6;j++){ var q=c.randomOpen(); if(q)c.place('stone',q.x,q.y,1,1,{rune:'#9ff0ff',tall:34,col:'#7a7a86'}); }
    c.landmark(c.sp.x-2,c.sp.y-8,5,4,'The islets float on rune-light; the anchors keep them from drifting away.');
    c.scatter('tree',12,{kind:'round',col:'#3f7a3a'}); c.scatter('flowers',40,{solid:false,claim:false}); },
  particles:[WPART.motes('#bff4ff',130)] },

{ id:'crystal_grass', quad:1, seed:139, name:'Crystal-tipped Tallgrass', tagline:'Waist-high grass with glowing crystal tips', runeCol:'#9ff0ff',
  blurb:'Fields of tall grass whose tips have grown into little crystals that chime and glow. You wade through it (it hides you as you pass). Bigger crystal clusters break through the turf here and there.',
  ground:WK('grass','#4a8a6a','#62a47e',{sc:0.12,deco:WDECO.grass('rgba(30,80,60,.5)',0.35)}),kinds:[WK_PATH('#8a8a78','#a2a290')],
  layout:function(c){ c.line('path',[[0,30],[20,26],[40,34],[60,30]],2,4); },
  draw:{ tallgrass:function(c,ctx,x,y,w,h,o){ var R=c.R; addSprite(c.m,x+w/2,y+h,w+16,70,function(g,W,H){ for(var i=0;i<16;i++){ var bx=4+R.f()*(W-8), hh=26+R.f()*30; g.strokeStyle=R.pick(['#5aa07a','#6ab88a','#4a8a66']); g.lineWidth=2; g.beginPath(); g.moveTo(bx,H-2); g.quadraticCurveTo(bx+R.f()*6-3,H-hh/2,bx+R.f()*8-4,H-hh); g.stroke(); if(R.chance(0.6)){ g.fillStyle=R.pick(['#bff4ff','#dff8ff','#c8b8ff']); g.beginPath(); g.moveTo(bx,H-hh-6); g.lineTo(bx+2.5,H-hh); g.lineTo(bx,H-hh+3); g.lineTo(bx-2.5,H-hh); g.fill(); } } }); if(R.chance(0.35))addLight(c.m,x+w/2,y-10,46,'#9ff0ff',0.3,{react:true,rune:true}); } },
  props:function(c){ for(var i=0;i<160;i++){ var p=c.randomOpen('grass'); if(p)c.place('tallgrass',p.x,p.y,1,1,{solid:false}); }
    c.scatter('crystal',14,{col:'#9ff0ff',on:'grass'}); c.scatter('crystal',6,{col:'#c8a8ff',on:'grass'});
    var q=c.randomOpen('grass'); if(q){ c.place('crystal',q.x,q.y,1,1,{col:'#dff8ff',s:1.8}); c.landmark(q.x-1,q.y-1,3,3,'The Chiming Shard — the whole field hums in tune with it.'); } },
  particles:[WPART.motes('#dff8ff',110)] },

{ id:'waystone_road', quad:1, seed:149, name:'Waystone Ancient Road', tagline:'An old paved road lined with rune waystones', runeCol:'#6fe3f5',
  blurb:'A broad paved road from an older age crosses the grassland, lined with waystones whose runes light up one after another as you walk. A ley line runs under the paving, and a ruined arch marks the old gate.',
  ground:G_GRASS, kinds:[WK('road','#a09a8a','#b8b2a0',{pattern:'flag',grout:'#4a443a',rim:'#6a6458',rimW:2,flat:true,moss:true}),WK('verge','#7a8a5a','#8a9a66',{sc:0.3})],
  hills:{sc:0.05,k:1},
  layout:function(c){ var pts=[[0,44],[16,38],[30,30],[44,20],[60,14]]; c.line('verge',pts,6,2); c.line('road',pts,3.4,2); c.line('verge',[[30,30],[34,48],[36,60]],4,3); c.line('road',[[30,30],[34,48],[36,60]],2.4,3); },
  props:function(c){ var pts=[[4,39],[12,36],[20,32],[36,24],[44,17],[52,12],[33,40],[35,52]]; pts.forEach(function(q){ c.place('stone',q[0],q[1],1,1,{rune:'#6fe3f5',tall:46,col:'#9a9690'}); });
    c.leyLine([[0,45],[16,39],[30,31],[44,21],[60,15]],'#6fe3f5');
    c.place('arch',27,27,3,1,{moss:true}); c.landmark(26,26,5,3,'The Old Gate — travellers still touch its rune for luck.');
    c.scatter('tree',18,{kind:'round',col:'#3a7434',on:'grass'}); c.scatter('rock',10,{col:'#9a9486',moss:'#6a8a48',on:'grass'}); c.scatter('flowers',30,{solid:false,claim:false,on:'grass'}); },
  particles:[WPART.motes('#bff4ff',180)] }
);
