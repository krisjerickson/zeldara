// ═══════════════════════════════════════════════════════════════════════
// ║ 04h-scenery.js — painted scenery (round 30): ZScn.
// ║ Loads the pictures cut by tools/sprites/intake_scenery.py (assets/scenery/: atlas pages + index.json, inlined by
// ║ build.mjs as ZSCN_META, and tex/<id>.webp ground textures) and gives the scenery painters three calls:
// ║   ZScn.sprite(m, id, cx, footY, h, o)   a depth-sorted object (replaces addSprite + a drawing function)
// ║   ZScn.draw(ctx, id, cx, footY, h, o)   draw into a canvas that is already there
// ║   ZScn.pattern(ctx, id, px)             a repeating ground texture
// ║ Each returns false when the picture is not there (not painted yet, still loading, switched off): the painter
// ║ then draws what it always drew. Placement, collision and depth sorting are untouched — only the picture changes.
// ║ Switch: Dev panel → "Painted scenery", or ?scenery=0. Size trial: ZScn.K (objects) and ZScn.KB (buildings),
// ║ also in the Dev panel; both need a reload, because the ground is painted once per area.
// ═══════════════════════════════════════════════════════════════════════
var ZScn={
  META:(typeof ZSCN_META!=='undefined'&&ZSCN_META)||{pages:[],items:{},tex:{}}, BASE:'assets/scenery/', img:{}, timg:{}, done:false, _n:0, _cb:[],
  off:(function(){ try{ if(/[?&]scenery=0/.test(location.search))return true; return localStorage.getItem('zeldara_scenery')==='off'; }catch(e){ return false; } })(),
  K:(function(){ try{ var v=parseFloat(localStorage.getItem('zeldara_scn_k')); return v>=0.5&&v<=2?v:1; }catch(e){ return 1; } })(),
  KB:(function(){ try{ var v=parseFloat(localStorage.getItem('zeldara_scn_kb')); return v>=0.5&&v<=2?v:1.15; }catch(e){ return 1.15; } })(),      // buildings at 115 % (Kris, round 31)
  RES:2,           // painted objects are drawn into canvases at twice the world's pixels and shown at half size, so they stay sharp at the camera's zoom
  GRASS:0.27,      // how strongly a ground texture shows over the generated colour
  set:function(k,v){ try{ if(v===null)localStorage.removeItem(k); else localStorage.setItem(k,String(v)); }catch(e){} },
  // fetch every page and texture now (small: the pilot is 1.5 MB); the world waits for it briefly (whenReady)
  load:function(){ if(ZScn._started||typeof Image==='undefined')return; ZScn._started=true; var M=ZScn.META, L=[];
    (M.pages||[]).forEach(function(p){ L.push([ZScn.img,p,ZScn.BASE+p+'.webp']); }); Object.keys(M.tex||{}).forEach(function(t){ L.push([ZScn.timg,t,ZScn.BASE+M.tex[t].file]); });
    if(!L.length||ZScn.off){ ZScn._fin(); return; } ZScn._n=ZScn._tot=L.length;
    L.forEach(function(e){ var im=new Image(), end=function(ok){ if(ok)e[0][e[1]]=im; if(--ZScn._n<=0)ZScn._fin(); }; im.onload=function(){ end(true); }; im.onerror=function(){ end(false); }; im.src=e[2]; }); },
  // Stand-ins for every object and texture that has not been painted yet: a labelled box of the ordered size (07zt ZSCN). For checking the wiring before the sheets arrive:
  // open the game with ?scenery=fake. Nothing is saved.
  fake:function(){ if(typeof ZSCN==='undefined'||typeof document==='undefined')return 0; var M=ZScn.META, n=0, PW=2048, x=2, y=2, rowH=0, pg=0, cv=null, g=null, hue=0;
    var page=function(){ cv=document.createElement('canvas'); cv.width=PW; cv.height=2048; g=cv.getContext('2d'); ZScn.img['fake'+pg]=cv; x=2; y=2; rowH=0; };
    page(); M.items=Object.assign({},M.items); M.tex=Object.assign({},M.tex);
    ZSCN.SHEETS.forEach(function(S){ S.items.forEach(function(it){ var id=it[0]; hue=(hue+47)%360;
      if(S.kind==='tex'){ if(ZScn.timg[id])return; var t=document.createElement('canvas'); t.width=t.height=256; var tg=t.getContext('2d'); tg.fillStyle='hsl('+hue+',35%,50%)'; tg.fillRect(0,0,256,256); tg.strokeStyle='hsl('+hue+',40%,30%)'; tg.lineWidth=5; for(var i=0;i<4;i++)for(var j=0;j<4;j++){ tg.strokeRect(i*64+6+(j%2)*10,j*64+6,52,52); } ZScn.timg[id]=t; M.tex[id]={file:''}; n++; return; }
      if(M.items[id]&&ZScn.img[M.items[id][0]])return; var w=it[3]*2, h=it[4]*2; if(w>PW-4){ h=Math.round(h*(PW-4)/w); w=PW-4; } if(x+w>PW-2){ x=2; y+=rowH+2; rowH=0; } if(y+h>2046){ pg++; page(); }
      g.fillStyle='hsla('+hue+',55%,55%,0.92)'; g.fillRect(x+3,y+3,w-6,h-6); g.strokeStyle='#1a1420'; g.lineWidth=5; g.strokeRect(x+3,y+3,w-6,h-6); g.fillStyle='#fff'; g.font='bold '+Math.max(9,Math.min(22,w/id.length*1.5))+'px sans-serif'; g.textAlign='center'; g.fillText(id,x+w/2,y+h/2+5,w-8);
      var flat=S.kind==='flat'; M.items[id]=['fake'+pg,x,y,w,h,w/2,flat?h/2:h,0.5]; x+=w+2; rowH=Math.max(rowH,h); n++; }); });
    ZScn.faked=n; return n; },
  _fin:function(){ try{ if(/[?&]scenery=fake/.test(location.search))ZScn.fake(); }catch(e){} ZScn.done=true; var L=ZScn._cb; ZScn._cb=[]; L.forEach(function(f){ try{ f(); }catch(e){} }); },
  // how much has arrived: [files in, files in all]
  progress:function(){ return [(ZScn._tot||0)-Math.max(0,ZScn._n||0),ZScn._tot||0]; },
  whenReady:function(f,ms){ if(ZScn.done||ZScn.off)return f(); var fired=false, go=function(){ if(!fired){ fired=true; f(); } }; ZScn._cb.push(go); setTimeout(go,ms||2500); ZScn.load(); },
  SKIP:{rn_henge_tri:1,rn_henge_post:1},      // pieces whose sheet was cut badly (sc_rune_henge: the trilithon is cut in half) — the drawn ones stay until the sheet is redone
  has:function(id){ if(ZScn.off||ZScn.SKIP[id])return false; var it=ZScn.META.items[id]; return !!(it&&ZScn.img[it[0]]); },
  // the first of the ids that is painted (variants: pick by a number 0..1)
  pick:function(ids,r){ var L=ids.filter(ZScn.has); return L.length?L[Math.min(L.length-1,Math.floor((r||0)*L.length))]:null; },
  // size on screen when drawn h px tall (h omitted: the size it was designed for); o.w = fit this width instead
  size:function(id,h,o){ var it=ZScn.META.items[id]; if(!it)return null; var s=(o&&o.w)?o.w/it[3]:(h?h/it[4]:it[7]), kx=(o&&o.stretch)||1; return {s:s,w:it[3]*s*kx,h:it[4]*s,ax:it[5]*s*kx,ay:it[6]*s}; },      // o.stretch: wider only (a counter along several tiles)
  // its designed size × K, shrunk if it would be wider than maxW
  fit:function(m,id,cx,footY,maxW,o){ var Z=ZScn.size(id,0); if(!Z)return false; var h=Z.h*ZScn.K, w=Z.w*ZScn.K; if(maxW&&w>maxW)h*=maxW/w; return ZScn.sprite(m,id,cx,footY,h,o); },
  // draw into ctx with the object's standing point at (cx, footY)
  draw:function(ctx,id,cx,footY,h,o){ if(!ZScn.has(id))return false; var it=ZScn.META.items[id], Z=ZScn.size(id,h,o), sm=ctx.imageSmoothingEnabled, q=ctx.imageSmoothingQuality;
    ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='high'; if(o&&o.alpha!==undefined){ ctx.save(); ctx.globalAlpha=o.alpha; }
    ctx.drawImage(ZScn.img[it[0]],it[1],it[2],it[3],it[4],cx-Z.ax,footY-Z.ay,Z.w,Z.h); if(o&&o.alpha!==undefined)ctx.restore(); ctx.imageSmoothingEnabled=sm; ctx.imageSmoothingQuality=q; return Z; },
  // a depth-sorted object in a map model (07-site-art addSprite): its own canvas, bottom centre at (cx, footY); a soft shadow under it
  // Sizes go in steps of 6 % and the finished canvas is kept (the last 260): a forest of the same tree is one picture in memory and in the chunk's atlas, not one per tree.
  _sc:{}, _scq:[],
  sprite:function(m,id,cx,footY,h,o){ if(!ZScn.has(id)||typeof addSprite!=='function')return false; o=o||{}; var it=ZScn.META.items[id], q;
    if(o.w){ q=it[3]*it[7]*0.06; o=Object.assign({},o,{w:Math.max(q,Math.round(o.w/q)*q)}); } else if(h){ q=it[4]*it[7]*0.06; h=Math.max(q,Math.round(h/q)*q); }
    var Z=ZScn.size(id,h,o), half=Math.ceil(Math.max(Z.ax,Z.w-Z.ax))+3, W=half*2, H=Math.ceil(Z.ay)+5, RS=ZScn.RES;
    var key=id+'|'+Math.round(Z.w*8)+'|'+Math.round(Z.h*8)+'|'+(o.shadow===false?'n':(o.shw||0)+'/'+(o.sha||0))+'|'+(o.alpha===undefined?'':o.alpha), c=ZScn._sc[key];
    if(!c){ c=document.createElement('canvas'); c.width=W*RS; c.height=H*RS; var ctx=c.getContext('2d'); ctx.scale(RS,RS); if(o.shadow!==false)softShadow(ctx,W/2,H-5,Math.min(half,Z.w*(o.shw||0.42)),Math.max(4,Z.w*0.09),o.sha||0.38); ZScn.draw(ctx,id,W/2,H-4,h,o);
      ZScn._sc[key]=c; ZScn._scq.push(key); if(ZScn._scq.length>260)delete ZScn._sc[ZScn._scq.shift()]; }
    var sp={canvas:c,x:cx,y:footY+4,res:RS}; m.sprites.push(sp); if(o.sp)for(var k in o.sp)sp[k]=o.sp[k]; return Z; },
  // a flat picture (rug, floor inlay) filling the rectangle x,y,w,h on the ground, turned a quarter when the rectangle runs the other way
  rect:function(m,id,x,y,w,h,o){ if(!ZScn.has(id)||typeof addSprite!=='function')return false; o=o||{}; var it=ZScn.META.items[id], RS=ZScn.RES, turn=o.turn!==false&&((w>h*1.3&&it[4]>it[3]*1.3)||(h>w*1.3&&it[3]>it[4]*1.3));
    addSprite(m,x+w/2,y+h/2,Math.ceil(w*RS),Math.ceil(h*RS),function(g){ g.imageSmoothingEnabled=true; g.imageSmoothingQuality='high'; if(o.alpha!==undefined)g.globalAlpha=o.alpha;
      if(turn){ g.translate(w*RS/2,h*RS/2); g.rotate(Math.PI/2); g.drawImage(ZScn.img[it[0]],it[1],it[2],it[3],it[4],-h*RS/2,-w*RS/2,h*RS,w*RS); } else g.drawImage(ZScn.img[it[0]],it[1],it[2],it[3],it[4],0,0,w*RS,h*RS); });
    var sp=m.sprites[m.sprites.length-1]; sp.res=RS; sp.ox=0.5; sp.oy=0.5; sp.flat=true; if(o.sp)for(var k in o.sp)sp[k]=o.sp[k]; return true; },
  // a picture hanging on a wall: top centre at (cx, topY); w = shown width (0 = its designed size); after(g,W,H) may draw over it (a crest)
  hang:function(m,id,cx,topY,w,o){ if(!ZScn.has(id)||typeof addSprite!=='function')return false; o=o||{}; var Z=ZScn.size(id,0,w?{w:w}:null), RS=ZScn.RES, W=Math.ceil(Z.w)+2, H=Math.ceil(Z.h)+2;
    addSprite(m,cx,topY+H,W*RS,H*RS,function(g){ g.scale(RS,RS); ZScn.draw(g,id,1+Z.ax,1+Z.ay,0,w?{w:w}:null); if(o.after)o.after(g,W,H); });
    var sp=m.sprites[m.sprites.length-1]; sp.res=RS; sp.depth=o.depth!==undefined?o.depth:topY-40; if(o.sp)for(var k in o.sp)sp[k]=o.sp[k]; return Z; },
  // a run of the same piece side by side (a fence, a rail), totalW wide, standing on footY, starting at x0
  row:function(m,id,x0,footY,totalW,o){ if(!ZScn.has(id)||typeof addSprite!=='function')return false; o=o||{}; var N=ZScn.size(id,0), n=Math.max(1,Math.round(totalW/(N.w*ZScn.K))), each=totalW/n, Z=ZScn.size(id,0,{w:each}), RS=ZScn.RES, W=Math.ceil(totalW)+4, H=Math.ceil(Z.ay)+5;
    addSprite(m,x0+totalW/2,footY+4,W*RS,H*RS,function(ctx){ ctx.scale(RS,RS); if(o.shadow!==false)softShadow(ctx,W/2,H-5,totalW*0.48,4,0.3); for(var i=0;i<n;i++)ZScn.draw(ctx,id,2+each*(i+0.5)+(Z.ax-Z.w/2),H-4,0,{w:each}); });
    var sp=m.sprites[m.sprites.length-1]; sp.res=RS; if(o.sp)for(var k in o.sp)sp[k]=o.sp[k]; return Z; },
  // a flat picture lying on the ground (a rune circle): its own sharp image under everything that stands, centred on (cx, cy)
  decal:function(m,id,cx,cy,o){ if(!ZScn.has(id)||typeof addSprite!=='function')return false; var Z=ZScn.size(id,0,o), RS=ZScn.RES, W=Math.ceil(Z.w)+2, H=Math.ceil(Z.h)+2;
    addSprite(m,cx,cy,W*RS,H*RS,function(ctx){ ctx.scale(RS,RS); ZScn.draw(ctx,id,1+Z.ax,1+Z.ay,0,o); }); var sp=m.sprites[m.sprites.length-1]; sp.res=RS; sp.ox=0.5; sp.oy=0.5; sp.flat=true; return Z; },
  // a game texture holding one painted object at 2 ×, bottom centre = its standing point; returns {key, w, h} (world px) or null
  texture:function(scene,id,h,o){ if(!ZScn.has(id))return null; o=o||{}; var Z=ZScn.size(id,h,o), key='zs_'+id+'_'+Math.round(Z.h)+(o.shadow===false?'n':''), RS=ZScn.RES, half=Math.ceil(Math.max(Z.ax,Z.w-Z.ax))+3, W=half*2, H=Math.ceil(Z.ay)+6;
    if(!scene.textures.exists(key)){ var c=document.createElement('canvas'); c.width=W*RS; c.height=H*RS; var x=c.getContext('2d'); x.scale(RS,RS); if(o.shadow!==false&&typeof softShadow==='function')softShadow(x,W/2,H-6,Math.min(half,Z.w*0.44),Math.max(4,Z.w*0.09),0.4); ZScn.draw(x,id,W/2,H-5,h,o);
      var t=scene.textures.addCanvas(key,c); try{ t.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} }
    return {key:key,w:Z.w,h:Z.h,scale:1/RS}; },
  // a painted object as a scene image standing on (x, footY); mult scales its designed size (ZScn.K for objects, ZScn.KB for buildings); null when the picture is not there
  image:function(scene,id,x,footY,mult,depth,o){ if(!ZScn.has(id))return null; var t=ZScn.texture(scene,id,ZScn.size(id,0).h*(mult||1),o); if(!t)return null; var im=scene.add.image(x,footY+5,t.key).setOrigin(0.5,1).setScale(t.scale); im._zh=t.h; im._zw=t.w; if(depth!==undefined)im.setDepth(depth); return im; },
  // a repeating ground texture, one repeat = px world pixels (default 128); cached per id + size
  _pat:{}, tile:function(id,px){ var im=ZScn.timg[id]; if(!im||ZScn.off)return null; px=px||128; var k=id+'|'+px, c=ZScn._pat[k]; if(c)return c;
    c=document.createElement('canvas'); c.width=px; c.height=px; var x=c.getContext('2d'); x.imageSmoothingEnabled=true; x.imageSmoothingQuality='high'; x.drawImage(im,0,0,px,px); return (ZScn._pat[k]=c); },
  // the texture's light-and-dark only, as greys around 128: laid over the generated ground with 'overlay', it adds the painted marks and keeps the ground's own colour
  detail:function(id,px,gain){ var t=ZScn.tile(id,px); if(!t)return null; var k=id+'|'+px+'|d', c=ZScn._pat[k]; if(c)return c; c=document.createElement('canvas'); c.width=t.width; c.height=t.height; var x=c.getContext('2d'); x.drawImage(t,0,0);
    try{ var im=x.getImageData(0,0,c.width,c.height), d=im.data, n=d.length/4, sum=0, i, L; for(i=0;i<n;i++)sum+=d[i*4]*0.3+d[i*4+1]*0.59+d[i*4+2]*0.11; var mean=sum/n; gain=gain||1;
      for(i=0;i<n;i++){ L=d[i*4]*0.3+d[i*4+1]*0.59+d[i*4+2]*0.11; L=Math.max(0,Math.min(255,128+(L-mean)*gain)); d[i*4]=d[i*4+1]=d[i*4+2]=L; d[i*4+3]=255; } x.putImageData(im,0,0); }catch(e){ return null; }
    return (ZScn._pat[k]=c); },
  // which painted texture goes on a kind of ground (by the kind's id); null = none yet
  GROUND:{grass:'tx_grass',meadow:'tx_grass',verge:'tx_grass',land:'tx_grass',turf:'tx_grass',green:'tx_grass',isle:'tx_grass',wild:'tx_grass_wild',vgrass:'tx_grass_village',vgreen:'tx_grass_village',garden:'tx_grass_village',moss:'tx_moss',heath:'tx_heath',heather:'tx_heath',marsh:'tx_marsh',
    path:'tx_dirt',trail:'tx_dirt',earth:'tx_dirt',dust:'tx_dirt',vlane:'tx_dirt',mud:'tx_mud',sand:'tx_sand',shore:'tx_sand',snow:'tx_snow',soil:'tx_soil',vsoil:'tx_soil',crop:'tx_soil',
    rock:'tx_rock',mesatop:'tx_rock',hightop:'tx_rock',high:'tx_rock',peak:'tx_rock',ledge:'tx_rock',grey:'tx_rock',floor:'tx_rock',rubble:'tx_scree',scree:'tx_scree',scar:'tx_scree',ice:'tx_ice',
    ash:'tx_ash',sulfur:'tx_ash',char:'tx_char',scorch:'tx_char',bowl:'tx_char',glass:'tx_glass',basalt:'tx_hex',crust:'tx_crust',lavacrust:'tx_crust',
    water:'tx_water',shallow:'tx_water',lagoon:'tx_water',pool:'tx_water',creek:'tx_water',reef:'tx_water',deep:'tx_water_deep',sea:'tx_sea',lava:'tx_lava',
    plaza:'tx_slab',square:'tx_slab',street:'tx_flag'},
  // built surfaces by the pattern they are drawn with (07f WPATTERN): the painted texture takes the pattern's place
  GROUND_PAT:{cobble:'tx_cobble',flag:'tx_flag',slab:'tx_slab',brick:'tx_brick',planks:'tx_planks',hex:'tx_hex'},
  // how strongly a texture's marks are laid on (0–1) and how much contrast they keep; grass uses ZScn.GRASS
  TEXA:{tx_cobble:[0.95,1.15],tx_flag:[0.95,1.15],tx_slab:[0.9,1.1],tx_brick:[0.95,1.15],tx_planks:[0.95,1.15],tx_hex:[0.95,1.15],tx_water:[0.4,0.8],tx_water_deep:[0.4,0.8],tx_sea:[0.4,0.8],tx_lava:[0.5,0.9],tx_crust:[0.8,1.1]},
  texa:function(tid){ return ZScn.TEXA[tid]||(/^tx_(grass|moss|heath|marsh)/.test(tid)?[Math.min(1,ZScn.GRASS*2),0.9]:[0.7,1]); },
  ground:function(kindId,pattern){ var t=(pattern&&ZScn.GROUND_PAT[pattern])||ZScn.GROUND[kindId]; return t&&!ZScn.off&&ZScn.timg[t]?t:null; },
  // a texture's marks turned a quarter (planks running up and down)
  turned:function(c){ if(c._t)return c._t; var t=document.createElement('canvas'); t.width=c.height; t.height=c.width; var x=t.getContext('2d'); x.translate(t.width/2,t.height/2); x.rotate(Math.PI/2); x.drawImage(c,-c.width/2,-c.height/2); return (c._t=t); },
  // an indoor floor or wall as one flat picture at 2 ×: the colour col with the texture's marks laid on it (or the texture's own colours when col is not given); after(g, w, h) draws shadows over it
  floor:function(m,tid,x,y,w,h,o){ if(ZScn.off||!ZScn.timg[tid]||typeof addSprite!=='function')return false; o=o||{}; var RS=ZScn.RES, px=(o.px||128)*RS, d=o.col?ZScn.detail(tid,px,o.gain||1.1):ZScn.tile(tid,px); if(!d)return false;
    addSprite(m,x+w/2,y+h/2,Math.ceil(w*RS),Math.ceil(h*RS),function(g,W,H){ if(o.col){ g.fillStyle=o.col; g.fillRect(0,0,W,H); g.globalCompositeOperation='overlay'; g.globalAlpha=o.a||1; } g.fillStyle=g.createPattern(d,'repeat'); g.fillRect(0,0,W,H); g.globalCompositeOperation='source-over'; g.globalAlpha=1; if(o.after){ g.scale(RS,RS); o.after(g,w,h); } });
    var sp=m.sprites[m.sprites.length-1]; sp.res=RS; sp.ox=0.5; sp.oy=0.5; sp.flat=true; sp.depth=-9; sp.under=true; return true; },
  pattern:function(ctx,id,px){ var t=ZScn.tile(id,px); return t?ctx.createPattern(t,'repeat'):null; }
};
ZScn.load();
