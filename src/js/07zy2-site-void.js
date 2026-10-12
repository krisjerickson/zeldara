// ═══════════════════════════════════════════════════════════════════════
// ║ 07zy2-site-void.js — round 47: what fills the empty (black) space round an adventure-site floor.
// ║ Kris (round 46): "There's quite a lot of "black" or empty space in some of the new designs … think about how to make these spaces interesting".
// ║ His Lab picks (void-*): rock, abyss ("fog is a great idea, but it currently doesn't look good"), the site's element all round ("this is epic
// ║ and good. maybe some lava creatures as well, like lava or rock gargoyles"); and (round 47) "filling it with terrain similar to where the
// ║ adventure site is. Let's do a mix of standard terrain outside the walls of the adventure site mixed with the choices made."
// ║ His card — BY FLOOR: ground floors and castles stand in the world's own terrain; underground floors are cut out of rock, or hang over an abyss
// ║ (chasm sites), or float in lava (lava sites); the upper floors of towers float in the site's element (lava, deep sea, a sea of clouds, storm
// ║ clouds, a starry void, a sea of treetops). Framing: the camera keeps to the floor, a soft vignette at the edges.
// ║ How: the floor picture (07zy ZSPP.paint) leaves the empty cells clear; behind it, layers fill the view — the ground plane moves with the floor,
// ║ deeper layers (the abyss, the sky, the stars) move slower, so you feel the depth; decor and creatures live in those layers, under the floor,
// ║ so they only ever show in the empty space. Painted pictures (wave 50, tools/sprites/round47.ps1) are used when they are in; until then
// ║ everything is drawn here.
// ═══════════════════════════════════════════════════════════════════════
var ZVOID={ on:true, frameOn:true, VIG:0.5,
  // the site's element → its sea; the world's ground → its decor
  SEA:{fire:'lava',water:'deep',earth:'clouds',storm:'storm',shadow:'stars',grass:'canopy'},
  TERRAIN:{grass:'tx_grass_wild',water:'tx_marsh',earth:'tx_heath',fire:'tx_ash',storm:'tx_heath',shadow:'tx_moss'},
  DECOR:{tx_grass:['tr_round_a','tr_round_b','tr_round_c','tr_ash_a','pl_bush','pl_bush_flower','rk_rock_moss','pl_tallgrass'],
    tx_grass_wild:['tr_round_a','tr_round_b','tr_ash_b','pl_bush','pl_tallgrass','rk_rock_moss','pl_flowers_yellow'],
    tx_grass_village:['tr_round_a','tr_blossom_a','pl_bush_flower','pl_flowers_red','pl_hedge_arch'],
    tx_moss:['tr_willow_a','tr_round_c','pl_fern','rk_rock_moss','pl_mushrooms'], tx_heath:['tr_pine_a','tr_pine_b','rk_rock','pl_heather','rk_boulder'],
    tx_marsh:['tr_willow_b','tr_cypress','pl_reeds','pl_cattails','tr_mangrove_a'], tx_swamp:['tr_cypress','tr_mangrove_a','pl_reeds','pl_cattails'],
    tx_snow:['tr_pine_snow','rk_rock_snow','tr_pine_snow','rk_rock_snow'], tx_ice:['tr_pine_snow','rk_rock_snow','rk_crystal_teal'],
    tx_sand:['pl_cactus','rk_rock','pl_tuft','tr_dead_a'], tx_dirt:['tr_round_b','rk_rock','pl_bush','tr_stump'], tx_soil:['pl_crop_green','pl_wheat','tr_round_a'],
    tx_ash:['tr_burnt_stump','tr_dead_a','tr_dead_b','rk_basalt_a','rk_lava_rock','pl_emberflower'], tx_char:['tr_burnt_stump','tr_dead_b','rk_basalt_b','rk_lava_rock'],
    tx_rock:['rk_rock','rk_boulder','tr_pine_a','rk_pebbles'], tx_scree:['rk_rock','rk_boulder','rk_pebbles'], tx_hex:['rk_basalt_a','rk_basalt_b','rk_lava_rock'], tx_crust:['rk_basalt_a','rk_lava_rock','tr_burnt_stump']},
  // ── which fill for this floor (his card: by floor) ──
  pick:function(site,T,fi,nf){ var t=site&&site.type, el=(site&&site.el)||'earth', liq=T&&T.liq, k;
    if(liq==='stars')k={k:'sea',sea:'stars'};
    else if(t==='castle')k={k:'terrain'};
    else if((t==='tower'||t==='mage')&&fi===0)k={k:'terrain'};
    else if(t==='tower'||t==='mage')k={k:'sea',sea:ZVOID.SEA[el]||'clouds'};
    else if(liq==='lava')k={k:'sea',sea:'lava'};
    else if(liq==='chasm')k={k:'abyss'};
    else k={k:'rock'};
    k.el=el; k.liq=liq||null; k.ground=ZVOID.TERRAIN[el]||'tx_grass'; k.rock={grass:'tx_v_roots',water:'tx_v_ore',storm:'tx_v_ore',shadow:'tx_v_ore'}[el]||'tx_v_strata'; return k; },
  // ── seamless tiles (S × S), drawn once ──
  _t:{}, S:256,
  _wrap:function(S,f){ [-S,0,S].forEach(function(dx){ [-S,0,S].forEach(function(dy){ f(dx,dy); }); }); },
  _tex:function(id,px){ var Z=typeof _scn==='function'?_scn():null; return Z&&Z.has&&Z.tile&&Z.timg&&Z.timg[id]?Z.tile(id,px||256):null; },
  tile:function(key,o){ o=o||{}; var k=key+'|'+(o.ground||'')+'|'+(o.tint||'')+'|'+(o.rock||''); if(ZVOID._t[k])return ZVOID._t[k]; var S=ZVOID.S, cv=mkCanvas(S,S), g=cv.getContext('2d'), R=rngOf(key.length*977+(o.ground||'').length*31+7), W=ZVOID._wrap;
    var pat=function(id,a,dark){ var t=ZVOID._tex(id,S); if(!t)return false; g.save(); g.globalAlpha=a===undefined?1:a; g.fillStyle=g.createPattern(t,'repeat'); g.fillRect(0,0,S,S); g.restore(); if(dark){ g.fillStyle='rgba(0,0,0,'+dark+')'; g.fillRect(0,0,S,S); } return true; };
    var blob=function(x,y,r,col){ W(S,function(dx,dy){ var gr=g.createRadialGradient(x+dx,y+dy,0,x+dx,y+dy,r); gr.addColorStop(0,col); gr.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=gr; g.fillRect(x+dx-r,y+dy-r,2*r,2*r); }); };
    if(key==='terrain'){ var gid=o.ground||'tx_grass'; if(!pat(gid,1,0.1)){ g.fillStyle={tx_snow:'#dfe8ee',tx_ash:'#4a4440',tx_sand:'#d8c48e',tx_marsh:'#3e5a34',tx_heath:'#6a6a3e'}[gid]||'#5a7a40'; g.fillRect(0,0,S,S); for(var i=0;i<300;i++){ g.fillStyle='rgba(0,0,0,'+(0.05+R.f()*0.08)+')'; g.fillRect(R.f()*S,R.f()*S,2,3); } }
      for(var j=0;j<6;j++)blob(R.f()*S,R.f()*S,30+R.f()*40,'rgba(0,0,0,0.08)'); }
    else if(key==='rock'){ if(!pat(o.rock||'tx_v_strata',1,0.12)&&!pat('tx_v_strata',1,0.12)){ if(!pat('tx_rock',0.55,0.45)){ g.fillStyle='#2e2924'; g.fillRect(0,0,S,S); } else { g.globalCompositeOperation='multiply'; g.fillStyle='#5a4c40'; g.fillRect(0,0,S,S); g.globalCompositeOperation='source-over'; }
        // strata: soft wavy bands, lighter and darker, as if the floor were cut down through layered stone
        for(var b=0;b<9;b++){ var y0=b*S/9+R.f()*6, ph=R.f()*6, amp=3+R.f()*4, col=b%2?'rgba(255,225,180,0.07)':'rgba(0,0,0,0.16)'; g.fillStyle=col; g.beginPath(); g.moveTo(0,y0); for(var x=0;x<=S;x+=8)g.lineTo(x,y0+Math.sin(x/S*Math.PI*2+ph)*amp); for(var x2=S;x2>=0;x2-=8)g.lineTo(x2,y0+10+Math.sin(x2/S*Math.PI*2+ph+0.6)*amp); g.fill(); }
        // cracks, pale roots, ore glints
        g.lineCap='round'; for(var c2=0;c2<7;c2++){ var cx=R.f()*S, cy=R.f()*S; W(S,function(dx,dy){ g.strokeStyle='rgba(0,0,0,0.35)'; g.lineWidth=1.4; g.beginPath(); g.moveTo(cx+dx,cy+dy); var px=cx, py=cy; for(var s=0;s<4;s++){ px+=R.f()*18-9; py+=R.f()*14+4; g.lineTo(px+dx,py+dy); } g.stroke(); }); }
        for(var r2=0;r2<4;r2++){ var rx=R.f()*S, ry=R.f()*S, ra=R.f()*6; W(S,function(dx,dy){ g.strokeStyle='rgba(200,180,140,0.22)'; g.lineWidth=1.2; g.beginPath(); g.moveTo(rx+dx,ry+dy); g.bezierCurveTo(rx+dx+Math.cos(ra)*20,ry+dy+16,rx+dx-10,ry+dy+28,rx+dx+Math.cos(ra+1)*14,ry+dy+44); g.stroke(); }); }
        for(var o2=0;o2<16;o2++){ var ox=R.f()*S, oy=R.f()*S, oc=o2%4===0?'rgba(120,210,255,0.55)':o2%4===1?'rgba(255,190,90,0.45)':'rgba(170,150,130,0.35)'; W(S,function(dx,dy){ g.fillStyle=oc; g.beginPath(); g.arc(ox+dx,oy+dy,1.2+R.f()*1.4,0,7); g.fill(); }); } } }
    else if(key==='abyss'){ g.fillStyle='#05060a'; g.fillRect(0,0,S,S); for(var a=0;a<10;a++)blob(R.f()*S,R.f()*S,40+R.f()*60,'rgba(60,70,100,0.10)');
      for(var d=0;d<40;d++){ g.fillStyle='rgba(180,190,220,'+(0.05+R.f()*0.12)+')'; g.fillRect(R.f()*S,R.f()*S,1,1); }
      // far ledges: dim broken shelves of rock a long way down
      for(var l=0;l<3;l++){ var lx=R.f()*S, ly=R.f()*S, lw=30+R.f()*40; W(S,function(dx,dy){ g.fillStyle='rgba(40,44,58,0.55)'; g.beginPath(); g.moveTo(lx+dx,ly+dy); g.lineTo(lx+dx+lw,ly+dy+3); g.lineTo(lx+dx+lw-6,ly+dy+9); g.lineTo(lx+dx+4,ly+dy+8); g.fill(); g.fillStyle='rgba(90,96,120,0.35)'; g.fillRect(lx+dx,ly+dy,lw,1.5); }); } }
    else if(key==='fog'){ // soft fog banks, white on clear, for the abyss's drifting layers: long low banks built of many soft puffs, wisps between
      for(var bk=0;bk<4;bk++){ var by=R.f()*S, bx=R.f()*S, len=90+R.f()*120; for(var pf=0;pf<18;pf++){ var t2=pf/17; blob(bx+t2*len,by+Math.sin(t2*3+bk)*10+R.f()*8,16+R.f()*26*(1-Math.abs(t2-0.5)),'rgba(235,240,255,'+(0.10+R.f()*0.10)+')'); } }
      for(var f=0;f<14;f++)blob(R.f()*S,R.f()*S,10+R.f()*22,'rgba(255,255,255,'+(0.04+R.f()*0.06)+')'); }
    else if(key==='lava'){ if(!pat('tx_v_lavasea',1)){ if(!pat('tx_lava',1)){ g.fillStyle='#c84a10'; g.fillRect(0,0,S,S); }
        // cooling crust plates afloat on the glow
        for(var p=0;p<11;p++){ var px2=R.f()*S, py2=R.f()*S, pr=10+R.f()*18, n=7, pts=[]; for(var q=0;q<n;q++){ var an=q/n*Math.PI*2, rr=pr*(0.7+R.f()*0.5); pts.push([Math.cos(an)*rr,Math.sin(an)*rr*0.8]); }
          W(S,function(dx,dy){ g.fillStyle='rgba(40,16,8,0.82)'; g.beginPath(); pts.forEach(function(pt,i){ if(i)g.lineTo(px2+dx+pt[0],py2+dy+pt[1]); else g.moveTo(px2+dx+pt[0],py2+dy+pt[1]); }); g.closePath(); g.fill(); g.strokeStyle='rgba(255,170,60,0.55)'; g.lineWidth=1.5; g.stroke(); }); }
        for(var h=0;h<5;h++)blob(R.f()*S,R.f()*S,22+R.f()*30,'rgba(255,230,120,0.25)'); } }
    else if(key==='deep'){ if(!pat('tx_v_deepsea',1)){ if(!pat('tx_water_deep',1,0.35)){ g.fillStyle='#0c2a44'; g.fillRect(0,0,S,S); } for(var w=0;w<14;w++){ var wx=R.f()*S, wy=R.f()*S, wl=20+R.f()*30; W(S,function(dx,dy){ g.strokeStyle='rgba(180,220,255,0.13)'; g.lineWidth=1.5; g.beginPath(); g.moveTo(wx+dx,wy+dy); g.quadraticCurveTo(wx+dx+wl/2,wy+dy-4,wx+dx+wl,wy+dy); g.stroke(); }); } for(var e=0;e<6;e++)blob(R.f()*S,R.f()*S,40,'rgba(0,10,30,0.25)'); } }
    else if(key==='clouds'||key==='storm'){ if(!(key==='clouds'&&pat('tx_v_cloudsea',1))){ var st=key==='storm';
        g.fillStyle=st?'#3a3a52':'#9fc6e8'; g.fillRect(0,0,S,S); for(var cl=0;cl<34;cl++){ var x3=R.f()*S, y3=R.f()*S, r3=18+R.f()*34; blob(x3,y3+r3*0.25,r3,st?'rgba(10,10,24,0.35)':'rgba(60,90,140,0.22)'); blob(x3,y3,r3,st?'rgba(150,150,190,0.45)':'rgba(255,255,255,0.62)'); blob(x3-r3*0.25,y3-r3*0.25,r3*0.5,st?'rgba(200,200,235,0.25)':'rgba(255,250,235,0.5)'); } } }
    else if(key==='cloudpuff'){ for(var cp=0;cp<9;cp++){ var x4=R.f()*S, y4=R.f()*S, r4=16+R.f()*26; blob(x4,y4,r4,'rgba(255,255,255,'+(0.35+R.f()*0.3)+')'); } }
    else if(key==='stars'){ g.fillStyle='#04030c'; g.fillRect(0,0,S,S); for(var nb=0;nb<5;nb++)blob(R.f()*S,R.f()*S,50+R.f()*60,['rgba(120,60,200,0.16)','rgba(40,140,200,0.14)','rgba(220,80,140,0.10)'][nb%3]);
      for(var s2=0;s2<170;s2++){ var a2=R.f(), sz=a2>0.96?2:a2>0.8?1.4:1; g.fillStyle='rgba(255,255,255,'+(0.25+R.f()*0.7)+')'; g.fillRect(R.f()*S,R.f()*S,sz,sz); } }
    else if(key==='canopy'){ g.fillStyle='#1e3a1e'; g.fillRect(0,0,S,S); var Z=typeof _scn==='function'?_scn():null, ids=['tr_round_a','tr_round_b','tr_round_c','tr_ash_a'].filter(function(i){ return Z&&Z.has(i); });
      for(var tr=0;tr<26;tr++){ var x5=R.f()*S, y5=R.f()*S, r5=16+R.f()*12; if(ids.length){ var id=ids[tr%ids.length]; W(S,function(dx,dy){ Z.draw(g,id,x5+dx,y5+dy+r5,r5*2.2); }); } else { blob(x5,y5+3,r5,'rgba(0,0,0,0.35)'); blob(x5,y5,r5,'rgba(70,130,60,0.9)'); blob(x5-r5*0.3,y5-r5*0.3,r5*0.55,'rgba(140,200,100,0.45)'); } }
      g.fillStyle='rgba(10,30,20,0.18)'; g.fillRect(0,0,S,S); }
    else if(key==='aurora'){ for(var au=0;au<3;au++){ var y6=S*(0.2+au*0.3); for(var x6=0;x6<S;x6+=2){ var hh=24+Math.sin(x6/S*Math.PI*2*(au+1)+au)*14, gr2=g.createLinearGradient(0,y6-hh,0,y6+hh*0.3); gr2.addColorStop(0,'rgba(80,255,170,0)'); gr2.addColorStop(0.6,au===1?'rgba(170,110,255,0.20)':'rgba(80,255,170,0.22)'); gr2.addColorStop(1,'rgba(80,255,170,0)'); g.fillStyle=gr2; g.fillRect(x6,y6-hh+Math.sin(x6/S*Math.PI*4)*6,2,hh*1.3); } } }
    return (ZVOID._t[k]=cv); },
  // the deep layers for each kind: [tile, parallax (1 = moves with the floor), drift px/s x, y, alpha, blend]
  LAYERS:{ terrain:[['terrain',1,0,0,1]], rock:[['rock',1,0,0,1]],
    abyss:[['abyss',0.45,0,0,1],['fog',0.55,-4,-1,0.7,'screen',1],['fog',0.7,6,0.5,0.6,'screen',1],['fog',0.85,-10,0,0.45,'screen',1]],
    lava:[['lava',1,3,1.5,1],['fog',0.95,9,-4,0.16,'add']], deep:[['deep',1,4,2,1]],
    clouds:[['clouds',0.55,6,1,1],['cloudpuff',0.8,14,2,0.7,null,1]], storm:[['storm',0.55,8,1,1],['cloudpuff',0.8,18,3,0.35,null,1]],
    stars:[['stars',0.35,0,0,1],['aurora',0.5,10,0,0.9,'add',1]], canopy:[['canopy',0.7,0,0,1],['fog',0.85,8,1,0.18,'screen']] },
  kindOf:function(V){ return V.k==='sea'?V.sea:V.k; },
  // ── the floor picture's empty cells: which ones are clear (07zy calls this) ──
  clearCell:function(V,v,built,liq,near){ if(!ZVOID.on||!V)return false; if(v===0)return true; if(v===2&&!near&&!built)return true; if(v===3&&V.k!=='terrain'&&(liq==='chasm'||liq==='stars'||!liq))return true; if(v===3&&V.k==='sea'&&((liq==='lava'&&V.sea==='lava')||(liq==='water'&&V.sea==='deep')))return true;      // the floor's own lava or sea is the moving sea round it
    return false; },
  // a soft shade on the clear cells along the floor's edge, so the floor reads as standing on (or over) what is round it
  rim:function(ctx,V,F,LT){ var W=F.w, H=F.h, g=F.g, deep=V.k==='abyss'||V.k==='sea', clr=function(x,y){ if(x<0||y<0||x>=W||y>=H)return true; return !!(F._clr&&F._clr[y*W+x]); };
    for(var y=0;y<H;y++)for(var x=0;x<W;x++){ if(!clr(x,y))continue; var px=x*LT, py=y*LT; [[0,-1],[0,1],[-1,0],[1,0]].forEach(function(d){ if(clr(x+d[0],y+d[1]))return; var a=deep?(d[1]<0?0.75:0.45):(d[1]<0?0.32:0.2), L=deep&&d[1]<0?LT:LT*0.6, gr;
        if(d[1]){ gr=ctx.createLinearGradient(0,d[1]<0?py:py+LT,0,d[1]<0?py+L:py+LT-L); } else { gr=ctx.createLinearGradient(d[0]<0?px:px+LT,0,d[0]<0?px+L:px+LT-L,0); }
        gr.addColorStop(0,'rgba(0,0,0,'+a+')'); gr.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=gr; ctx.fillRect(px,py,LT,LT); }); } },
  // ── in the Dungeon scene: the layers behind the floor, decor, creatures, framing ──
  apply:function(scene,m){ var V=m&&m.zvoid; if(!V||!ZVOID.on||!scene.add)return; ZVOID.drop(scene); var S=scene._zv={L:[],dec:[],t:0,next:3+Math.random()*4,crit:[]}, cam=scene.cameras.main, kind=ZVOID.kindOf(V), LT0=typeof LT!=='undefined'?LT:32;
    // the ground the site stands on, from the world round it (ground floors and castles)
    if(V.k==='terrain'){ var gid=ZVOID.worldGround(scene)||V.ground; V.ground=gid; }
    var dim=1-Math.min(0.6,m.dark||0)*0.7, tint=Phaser.Display.Color.GetColor(Math.round(255*dim),Math.round(255*dim),Math.round(255*dim));
    (ZVOID.LAYERS[kind]||ZVOID.LAYERS.rock).forEach(function(L,i){ if(L[6]&&ZVOID.painted(kind))return; var key='zv_'+L[0]+'_'+(L[0]==='terrain'?V.ground:L[0]==='rock'?V.rock:''); if(!scene.textures.exists(key))scene.textures.addCanvas(key,ZVOID.tile(L[0],{ground:V.ground,rock:V.rock}));
      var ts=scene.add.tileSprite(0,0,8,8,key).setOrigin(0.5,0.5).setScrollFactor(0).setDepth(-12+i*0.1).setAlpha(L[4]); if(L[5]==='add')ts.setBlendMode(Phaser.BlendModes.ADD); else if(L[5]==='screen')ts.setBlendMode(Phaser.BlendModes.SCREEN); if(dim<0.99)ts.setTint(tint);
      S.L.push({o:ts,pf:L[1],vx:L[2],vy:L[3]}); });
    ZVOID.drifters(scene,m,V,kind,tint,dim);      // round 48: the painted fog banks, clouds, peaks and night sky
    ZVOID._size(scene); if(V.k==='terrain')ZVOID.decor(scene,m,V);      // framing comes after the scene sets its camera (12-scene-dungeon)
    scene.events.on('update',S.up=function(t,dt){ ZVOID.tick(scene,dt||16); }); scene.scale.on('resize',S.rs=function(){ ZVOID._size(scene); });
    scene.events.once('shutdown',function(){ ZVOID.drop(scene); }); },
  drop:function(scene){ var S=scene._zv; if(!S)return; if(S.up)scene.events.off('update',S.up); if(S.rs&&scene.scale)scene.scale.off('resize',S.rs); S.L.forEach(function(l){ if(l.o&&l.o.destroy)l.o.destroy(); }); S.dec.forEach(function(o){ if(o&&o.destroy)o.destroy(); }); S.crit.forEach(function(o){ if(o&&o.destroy)o.destroy(); }); (S.dr||[]).forEach(function(d){ if(d.o&&d.o.destroy)d.o.destroy(); }); if(S.vig&&S.vig.destroy)S.vig.destroy(); scene._zv=null; },
  _size:function(scene){ var S=scene._zv; if(!S)return; var cam=scene.cameras.main, z=cam.zoom||1, w=cam.width/z+96, h=cam.height/z+96; S.L.forEach(function(l){ l.o.setPosition(cam.width/2,cam.height/2).setSize(w,h); l.o.width=w; l.o.height=h; });
    if(S.vig){ S.vig.setPosition(cam.width/2,cam.height/2).setDisplaySize(cam.width/z,cam.height/z); } },
  tick:function(scene,dt){ var S=scene._zv; if(!S)return; var cam=scene.cameras.main, s=dt/1000; S.t+=s;
    // a screen-fixed tile whose left edge shows world x = middle − half its width (the ground plane, pf 1); deeper layers move by pf of that
    var mx=cam.scrollX+cam.width/2, my=cam.scrollY+cam.height/2;
    S.L.forEach(function(l){ l.o.tilePositionX=mx*l.pf-l.o.width/2+S.t*l.vx; l.o.tilePositionY=my*l.pf-l.o.height/2+S.t*l.vy; });
    // drifting pictures: a fixed place in a wide field that moves past at pf of the floor's speed, wrapped round the view
    if(S.dr){ var vw=cam.width/(cam.zoom||1), vh=cam.height/(cam.zoom||1); S.dr.forEach(function(d){ var span=vw+d.w+200, spanY=vh+d.h+200, ox=d.bx+S.t*d.vx-mx*d.pf, oy=d.by+S.t*d.vy-my*d.pf; ox=((ox%span)+span)%span-span/2; oy=((oy%spanY)+spanY)%spanY-spanY/2;
      d.o.setPosition(mx+ox,my+oy); if(d.pulse)d.o.setAlpha(d.a*(0.65+0.35*Math.sin(S.t*d.pulse+d.ph))); }); }
    if(S.t>S.next){ S.next=S.t+5+Math.random()*7; try{ ZVOID.creature(scene); }catch(e){} } },
  // ── the world ground round the game's site ──
  worldGround:function(scene){ try{ var ws=scene.worldScene||scene.scene.get('World'), wd=ws&&ws.wd, s=scene._site; if(!wd||!s||typeof WK_REG==='undefined')return null; var sx=Math.round(s.x!==undefined?s.x:s.tx), sy=Math.round(s.y!==undefined?s.y:s.ty); if(!(sx>=0))return null;
      var cnt={}; for(var dy=-6;dy<=6;dy+=2)for(var dx=-6;dx<=6;dx+=2){ var x=sx+dx, y=sy+dy; if(x<0||y<0||x>=WORLD_W||y>=WORLD_H)continue; var kd=WK_REG.list[wd.kind[y*WORLD_W+x]]; if(!kd)continue; var tid=ZScn.GROUND[kd.id]; if(!tid||/water|sea|lava|slab|flag|cobble/.test(tid))continue; cnt[tid]=(cnt[tid]||0)+1; }
      var best=null, bn=0; Object.keys(cnt).forEach(function(k){ if(cnt[k]>bn){ bn=cnt[k]; best=k; } }); return best; }catch(e){ return null; } },
  // ── trees, rocks and plants on the open ground (under the floor picture, so they only show outside its walls) ──
  // where the decor stands: [id, x px, y px (its foot), height px, flip] — shared by the game and the Lab
  decorList:function(m,V){ var Z=typeof _scn==='function'?_scn():null; if(!Z)return []; var ids=(ZVOID.DECOR[V.ground]||ZVOID.DECOR.tx_grass).filter(function(i){ return Z.has(i); }); if(!ids.length)return [];
    var LT0=typeof LT!=='undefined'?LT:32, W=m.w, H=m.h, F=m._zclr, R=rngOf(W*131+H*17+(V.ground||'').length), b=m._zbox||[0,0,W-1,H-1], M=10, out=[], cap=150, hOf={}, wOf={};
    var free=function(x,y){ if(x<0||y<0||x>=W||y>=H)return true; return !!(F&&F[y*W+x]); };
    for(var t=0;t<2600&&out.length<cap;t++){ var x=R.i(b[0]-M,b[2]+M), y=R.i(b[1]-M,b[3]+M); if(!free(x,y)||!free(x-1,y)||!free(x+1,y)||!free(x,y-1))continue; if(R.f()>0.32)continue;
      var id=ids[R.i(0,ids.length-1)]; if(hOf[id]===undefined){ var it=Z.size(id,0); hOf[id]=it?Math.min(it.h*Z.K,/^tr_/.test(id)?LT0*3.2:LT0*1.4):0; if(hOf[id]){ var sz0=Z.size(id,hOf[id]); wOf[id]=sz0?sz0.w:hOf[id]; } } if(!hOf[id])continue;
      // round 49 (Kris: "any special features like trees need to not overlap with the adventure site map walls or interiors"): the whole picture,
      // canopy and all, plus a tile round it, stands on clear ground
      var rx=Math.ceil((wOf[id]/2+6)/LT0), ry=Math.ceil((hOf[id]+6)/LT0), fits=true; for(var yy=y-ry;yy<=y+1&&fits;yy++)for(var xx=x-rx;xx<=x+rx;xx++)if(!free(xx,yy)){ fits=false; break; } if(!fits)continue;
      out.push([id,(x+0.5)*LT0+R.f()*10-5,(y+1)*LT0,hOf[id],R.f()<0.5]); }
    return out.sort(function(a,b){ return a[2]-b[2]; }); },
  decor:function(scene,m,V){ var S=scene._zv, Z=typeof _scn==='function'?_scn():null; if(!Z)return; var keyOf={};
    ZVOID.decorList(m,V).forEach(function(d){ var id=d[0], h=d[3], k=keyOf[id]; if(!k){ var sz=Z.size(id,h), cv=mkCanvas(sz.w+4,sz.h+4); Z.draw(cv.getContext('2d'),id,sz.ax+2,sz.ay+2,h); k=keyOf[id]={key:'zvd_'+id+'_'+Math.round(h),ax:(sz.ax+2)/cv.width,ay:(sz.ay+2)/cv.height}; if(!scene.textures.exists(k.key))scene.textures.addCanvas(k.key,cv); }
      S.dec.push(scene.add.image(d[1],d[2],k.key).setOrigin(k.ax,k.ay).setDepth(-11+d[2]*0.000001).setFlipX(d[4])); }); },
  // ── the painted pictures of the empty space (wave 50) ──
  DRIFT:{ abyss:[['vd_fog_bank_1',3,0.6,560,-6,0,0.55],['vd_fog_bank_2',3,0.75,640,9,0,0.45],['vd_mist_wisps',3,0.9,420,-14,0,0.35],['vd_light_shaft',1,0.5,320,0,0,0.35]],
    clouds:[['vd_peak_1',2,0.35,300,0,0,1],['vd_peak_2',2,0.35,280,0,0,1],['vd_tower_far',1,0.3,200,0,0,0.95],['vd_cloud_1',4,0.6,380,10,1,0.95],['vd_cloud_2',4,0.75,420,16,1,0.9],['vd_cloud_3',4,0.9,220,22,2,0.9]],
    storm:[['vd_peak_2',2,0.35,280,0,0,0.7],['vd_cloud_1',4,0.6,380,14,1,0.75],['vd_cloud_2',5,0.75,420,22,2,0.7],['vd_cloud_3',4,0.9,220,30,2,0.7]],
    stars:[['vd_milkyway',1,0.2,760,0,0,0.85],['vd_nebula_violet',1,0.25,520,0,0,0.7],['vd_nebula_rose',1,0.25,480,0,0,0.6],['vd_aurora',2,0.4,640,4,0,0.55,0.6],['vd_planet_ringed',1,0.15,170,0,0,0.95]],
    deep:[], lava:[], rock:[], canopy:[['vd_cloud_3',4,0.85,220,12,1,0.55]] },
  painted:function(kind){ var Z=typeof _scn==='function'?_scn():null, D=ZVOID.DRIFT[kind]; return !!(Z&&D&&D.length&&D.some(function(d){ return Z.has(d[0]); })); },
  drifters:function(scene,m,V,kind,tint,dim){ var S=scene._zv, Z=typeof _scn==='function'?_scn():null, D=ZVOID.DRIFT[kind]; S.dr=[]; if(!Z||!D)return; var R=rngOf((m.w||40)*71+(m.h||40)*13+kind.length), storm=kind==='storm';
    D.forEach(function(d,j){ if(!Z.has(d[0]))return; var k='zvp_'+d[0]; if(!scene.textures.exists(k)){ var it=Z.size(d[0],0), sc=Math.min(1,512/Math.max(it.w,it.h)), cv=mkCanvas(it.w*sc+4,it.h*sc+4); Z.draw(cv.getContext('2d'),d[0],2+it.ax*sc,2+it.ay*sc,it.h*sc); scene.textures.addCanvas(k,cv); }
      for(var i=0;i<d[1];i++){ var o=scene.add.image(0,0,k).setDepth(-11.9+j*0.02+(d[2]>0.7?0.1:0)), w=d[3]*(0.8+R.f()*0.4); o.setDisplaySize(w,w*o.height/o.width).setAlpha(d[6]).setFlipX(R.f()<0.5);
        if(storm)o.setTint(0x7a7890); else if(dim<0.99&&tint)o.setTint(tint);
        S.dr.push({o:o,bx:R.f()*4000,by:R.f()*4000,pf:d[2],vx:d[4]*(0.7+R.f()*0.6),vy:d[5],w:w,h:w*o.height/o.width,a:d[6],pulse:d[7]||0,ph:R.f()*6}); } }); },
  // ── now and then something lives in the empty space ──
  creature:function(scene){ var S=scene._zv, m=scene._lab, V=m&&m.zvoid; if(!V)return; var kind=ZVOID.kindOf(V); if(kind==='terrain'||kind==='canopy')return; var cam=scene.cameras.main, wv=cam.worldView, LT0=typeof LT!=='undefined'?LT:32;
    // a clear spot in view
    var spot=null; for(var t=0;t<40&&!spot;t++){ var x=wv.x+Math.random()*wv.width, y=wv.y+Math.random()*wv.height, cx=Math.floor(x/LT0), cy=Math.floor(y/LT0), ok=true; for(var dy=-1;dy<=1&&ok;dy++)for(var dx=-1;dx<=1;dx++){ var X=cx+dx, Y=cy+dy; if(X>=0&&Y>=0&&X<m.w&&Y<m.h&&!(m._zclr&&m._zclr[Y*m.w+X])){ ok=false; break; } } if(ok)spot=[x,y]; }
    if(!spot)return; var Z=typeof _scn==='function'?_scn():null, pic={lava:['vd_gargoyle_lava','vd_gargoyle_rock','vd_magma_serpent'],rock:['vd_mole','vd_rock_worm','vd_beetle'],deep:['vd_tentacle','vd_whale_fin'],clouds:['vd_sky_whale'],storm:['vd_storm_eel'],stars:['vd_star_whale'],abyss:['vd_bat_swarm']}[kind]||[], id=Z?Z.pick?Z.pick(pic,Math.random()):null:null;
    if(kind==='stars'&&Math.random()<0.6&&Z&&Z.has('vd_shooting_star'))id='vd_shooting_star';
    var key=id?'zvc_'+id:'zvc_'+kind; if(!scene.textures.exists(key)){ var cv=id?(function(){ var sz=Z.size(id,LT0*2.4), c=mkCanvas(sz.w+4,sz.h+4); Z.draw(c.getContext('2d'),id,sz.ax+2,sz.ay+2,LT0*2.4); return c; })():ZVOID.critter(kind); if(!cv)return; scene.textures.addCanvas(key,cv); }
    var how=id==='vd_shooting_star'||(!id&&kind==='stars')?'shoot':/bat_swarm|sky_whale|storm_eel|star_whale/.test(id||'')||(!id&&(kind==='clouds'||kind==='storm'||kind==='abyss'))?'cross':'rise';
    if(how==='shoot'){ var ss=scene.add.image(spot[0],spot[1],key).setDepth(-11.5).setAlpha(0).setAngle(id?-20:25).setScale(id?0.8:1); if(!id)ss.setBlendMode(Phaser.BlendModes.ADD); S.crit.push(ss); scene.tweens.add({targets:ss,x:spot[0]+300,y:spot[1]+(id?-110:120),alpha:{from:1,to:0},duration:1100,ease:'Sine.in',onComplete:function(){ ss.destroy(); }}); return; }
    if(how==='cross'){ var dir=Math.random()<0.5?-1:1, x0=spot[0]-dir*wv.width*0.7, x1=spot[0]+dir*wv.width*0.7, cr=scene.add.image(x0,spot[1],key).setDepth(-11.6).setAlpha(0.9).setFlipX(dir<0).setScale(id&&/whale/.test(id)?1.6:1.1); S.crit.push(cr);
      scene.tweens.add({targets:cr,x:x1,y:spot[1]+(Math.random()-0.5)*80,duration:id&&/whale/.test(id)?14000:7000,ease:'Linear',onComplete:function(){ cr.destroy(); }}); if(kind==='storm')cam.flash(120,200,200,255,false); return; }
    var im=scene.add.image(spot[0],spot[1]+18,key).setOrigin(0.5,1).setDepth(-11.5).setAlpha(0).setScale(0.6); S.crit.push(im);
    scene.tweens.add({targets:im,y:spot[1],alpha:1,scale:/gargoyle/.test(id||'')?1.4:1,duration:900,ease:'Sine.out',onComplete:function(){ scene.tweens.add({targets:im,y:spot[1]+22,alpha:0,scale:0.7,delay:1800+Math.random()*1500,duration:900,ease:'Sine.in',onComplete:function(){ im.destroy(); }}); }});
    if(kind==='lava'){ var gl=scene.add.image(spot[0],spot[1]-10,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(0xff7a30).setAlpha(0).setScale(1.4).setDepth(-11.4); S.crit.push(gl); scene.tweens.add({targets:gl,alpha:0.55,yoyo:true,duration:1300,hold:1200,onComplete:function(){ gl.destroy(); }}); }
    if(kind==='storm'){ cam.flash(120,200,200,255,false); } },
  // a small drawn creature until the painted ones are in
  critter:function(kind){ var c=mkCanvas(64,56), g=c.getContext('2d');
    if(kind==='lava'){ // a lava gargoyle's head and shoulders, glowing eyes and cracks
      g.fillStyle='#2a1610'; g.beginPath(); g.moveTo(8,56); g.quadraticCurveTo(10,26,22,20); g.lineTo(18,6); g.lineTo(28,16); g.quadraticCurveTo(32,13,36,16); g.lineTo(46,6); g.lineTo(42,20); g.quadraticCurveTo(54,26,56,56); g.fill();
      g.strokeStyle='#ff8a30'; g.lineWidth=1.5; g.beginPath(); g.moveTo(20,44); g.lineTo(26,34); g.lineTo(24,28); g.moveTo(44,46); g.lineTo(38,36); g.stroke(); g.fillStyle='#ffd060'; g.beginPath(); g.arc(27,24,2.4,0,7); g.arc(37,24,2.4,0,7); g.fill(); }
    else if(kind==='rock'){ // a mole up out of its mound
      g.fillStyle='#4a3a2c'; g.beginPath(); g.ellipse(32,50,22,7,0,0,7); g.fill(); g.fillStyle='#3a2c22'; g.beginPath(); g.ellipse(32,38,11,13,0,0,7); g.fill(); g.fillStyle='#e8a0a0'; g.beginPath(); g.arc(32,28,3,0,7); g.fill(); g.fillStyle='#1a1410'; g.fillRect(27,32,2,2); g.fillRect(35,32,2,2); g.fillStyle='#e8c8b0'; g.fillRect(22,44,5,3); g.fillRect(37,44,5,3); }
    else if(kind==='deep'){ g.fillStyle='rgba(20,40,60,0.9)'; g.beginPath(); g.moveTo(14,54); g.quadraticCurveTo(30,4,40,8); g.quadraticCurveTo(36,30,50,54); g.fill(); }
    else if(kind==='clouds'||kind==='storm'){ g.fillStyle=kind==='storm'?'rgba(60,60,90,0.9)':'rgba(70,90,120,0.55)'; g.beginPath(); g.ellipse(32,40,28,9,0,0,7); g.fill(); g.beginPath(); g.moveTo(52,40); g.lineTo(62,30); g.lineTo(60,46); g.fill(); }
    else if(kind==='stars'){ var c2=mkCanvas(90,6), q=c2.getContext('2d'), gr=q.createLinearGradient(0,0,90,0); gr.addColorStop(0,'rgba(255,255,255,0)'); gr.addColorStop(1,'rgba(255,255,255,1)'); q.fillStyle=gr; q.fillRect(0,2,90,2); return c2; }
    else if(kind==='abyss'){ for(var b=0;b<7;b++){ g.fillStyle='rgba(20,18,28,0.85)'; var x=10+b*7, y=20+(b%3)*8; g.beginPath(); g.moveTo(x,y); g.lineTo(x-5,y-3); g.lineTo(x,y+2); g.lineTo(x+5,y-3); g.fill(); } }
    else return null; return c; },
  // ── framing: the camera keeps to the floor; a soft vignette ──
  frame:function(scene,m){ var S=scene._zv; if(!S||!ZVOID.frameOn)return; var cam=scene.cameras.main, LT0=typeof LT!=='undefined'?LT:32, b=m._zbox; if(b){ var pad=4; cam.setBounds((b[0]-pad)*LT0,(b[1]-pad)*LT0,(b[2]-b[0]+1+2*pad)*LT0,(b[3]-b[1]+1+2*pad)*LT0); }
    if(!scene.textures.exists('zv_vig')){ var c=mkCanvas(512,512), g=c.getContext('2d'), gr=g.createRadialGradient(256,256,150,256,256,362); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(0.7,'rgba(0,0,0,0.35)'); gr.addColorStop(1,'rgba(0,0,0,0.9)'); g.fillStyle=gr; g.fillRect(0,0,512,512); scene.textures.addCanvas('zv_vig',c); }
    S.vig=scene.add.image(0,0,'zv_vig').setScrollFactor(0).setDepth(13).setAlpha(ZVOID.VIG); ZVOID._size(scene); },
  // ── the Lab: draw a floor with its fill (static, or drifting with t) ──
  drawUnder:function(c,m,ox,oy,s,t,bw,bh){ var V=m&&m.zvoid; if(!V)return; var kind=ZVOID.kindOf(V), LT0=typeof LT!=='undefined'?LT:32, k=Math.max(0.6,s/LT0);      /* the Lab draws floors small: the fill keeps a readable scale */ bw=bw||m.w*s; bh=bh||m.h*s;
    (ZVOID.LAYERS[kind]||ZVOID.LAYERS.rock).forEach(function(L){ if(L[6]&&ZVOID.painted(kind))return; var cv=ZVOID.tile(L[0],{ground:V.ground,rock:V.rock}), p=c.createPattern(cv,'repeat'); c.save(); c.beginPath(); c.rect(ox,oy,bw,bh); c.clip(); c.globalAlpha=L[4]; if(L[5]==='add')c.globalCompositeOperation='lighter'; else if(L[5]==='screen')c.globalCompositeOperation='screen';
      var dx=(t||0)*L[2], dy=(t||0)*L[3]; c.translate(ox-dx*k,oy-dy*k); c.scale(k,k); c.fillStyle=p; c.fillRect(dx-2,dy-2,bw/k+4,bh/k+4); c.restore(); });
    // the painted drifting pictures, laid at fixed places (the Lab)
    var Z=typeof _scn==='function'?_scn():null, D=ZVOID.DRIFT[kind]; if(Z&&D){ var R=rngOf(kind.length*97+7); c.save(); c.beginPath(); c.rect(ox,oy,bw,bh); c.clip(); D.forEach(function(d){ if(!Z.has(d[0]))return; for(var i=0;i<d[1];i++){ var w=d[3]*k*0.8, x=ox+((R.f()*bw+(t||0)*d[4]*k)%(bw+w))-w/2, y=oy+R.f()*bh; c.globalAlpha=d[6]*(d[7]?0.8:1); var it=Z.size(d[0],0); if(!it)continue; Z.draw(c,d[0],x,y+w*it.h/it.w*0.5,w*it.h/it.w); } }); c.restore(); } }
};
