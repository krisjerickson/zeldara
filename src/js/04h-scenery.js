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
  KB:(function(){ try{ var v=parseFloat(localStorage.getItem('zeldara_scn_kb')); return v>=0.5&&v<=2?v:1; }catch(e){ return 1; } })(),
  RES:2,           // painted objects are drawn into canvases at twice the world's pixels and shown at half size, so they stay sharp at the camera's zoom
  GRASS:0.27,      // how strongly a ground texture shows over the generated colour
  set:function(k,v){ try{ if(v===null)localStorage.removeItem(k); else localStorage.setItem(k,String(v)); }catch(e){} },
  // fetch every page and texture now (small: the pilot is 1.5 MB); the world waits for it briefly (whenReady)
  load:function(){ if(ZScn._started||typeof Image==='undefined')return; ZScn._started=true; var M=ZScn.META, L=[];
    (M.pages||[]).forEach(function(p){ L.push([ZScn.img,p,ZScn.BASE+p+'.webp']); }); Object.keys(M.tex||{}).forEach(function(t){ L.push([ZScn.timg,t,ZScn.BASE+M.tex[t].file]); });
    if(!L.length||ZScn.off){ ZScn._fin(); return; } ZScn._n=L.length;
    L.forEach(function(e){ var im=new Image(), end=function(ok){ if(ok)e[0][e[1]]=im; if(--ZScn._n<=0)ZScn._fin(); }; im.onload=function(){ end(true); }; im.onerror=function(){ end(false); }; im.src=e[2]; }); },
  _fin:function(){ ZScn.done=true; var L=ZScn._cb; ZScn._cb=[]; L.forEach(function(f){ try{ f(); }catch(e){} }); },
  whenReady:function(f,ms){ if(ZScn.done||ZScn.off)return f(); var fired=false, go=function(){ if(!fired){ fired=true; f(); } }; ZScn._cb.push(go); setTimeout(go,ms||2500); ZScn.load(); },
  has:function(id){ if(ZScn.off)return false; var it=ZScn.META.items[id]; return !!(it&&ZScn.img[it[0]]); },
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
  sprite:function(m,id,cx,footY,h,o){ if(!ZScn.has(id)||typeof addSprite!=='function')return false; o=o||{}; var Z=ZScn.size(id,h,o), half=Math.ceil(Math.max(Z.ax,Z.w-Z.ax))+3, W=half*2, H=Math.ceil(Z.ay)+5;
    var RS=ZScn.RES; addSprite(m,cx,footY+4,W*RS,H*RS,function(ctx){ ctx.scale(RS,RS); if(o.shadow!==false)softShadow(ctx,W/2,H-5,Math.min(half,Z.w*(o.shw||0.42)),Math.max(4,Z.w*0.09),o.sha||0.38); ZScn.draw(ctx,id,W/2,H-4,h,o); });
    m.sprites[m.sprites.length-1].res=RS; return Z; },
  // a flat picture lying on the ground (a rune circle): its own sharp image under everything that stands, centred on (cx, cy)
  decal:function(m,id,cx,cy,o){ if(!ZScn.has(id)||typeof addSprite!=='function')return false; var Z=ZScn.size(id,0,o), RS=ZScn.RES, W=Math.ceil(Z.w)+2, H=Math.ceil(Z.h)+2;
    addSprite(m,cx,cy,W*RS,H*RS,function(ctx){ ctx.scale(RS,RS); ZScn.draw(ctx,id,W/2,H/2,0,o); }); var sp=m.sprites[m.sprites.length-1]; sp.res=RS; sp.ox=0.5; sp.oy=0.5; sp.flat=true; return Z; },
  // a game texture holding one painted object at 2 ×, bottom centre = its standing point; returns {key, w, h} (world px) or null
  texture:function(scene,id,h,o){ if(!ZScn.has(id))return null; o=o||{}; var Z=ZScn.size(id,h,o), key='zs_'+id+'_'+Math.round(Z.h)+(o.shadow===false?'n':''), RS=ZScn.RES, half=Math.ceil(Math.max(Z.ax,Z.w-Z.ax))+3, W=half*2, H=Math.ceil(Z.ay)+6;
    if(!scene.textures.exists(key)){ var c=document.createElement('canvas'); c.width=W*RS; c.height=H*RS; var x=c.getContext('2d'); x.scale(RS,RS); if(o.shadow!==false&&typeof softShadow==='function')softShadow(x,W/2,H-6,Math.min(half,Z.w*0.44),Math.max(4,Z.w*0.09),0.4); ZScn.draw(x,id,W/2,H-5,h,o);
      var t=scene.textures.addCanvas(key,c); try{ t.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} }
    return {key:key,w:Z.w,h:Z.h,scale:1/RS}; },
  // a repeating ground texture, one repeat = px world pixels (default 128); cached per id + size
  _pat:{}, tile:function(id,px){ var im=ZScn.timg[id]; if(!im||ZScn.off)return null; px=px||128; var k=id+'|'+px, c=ZScn._pat[k]; if(c)return c;
    c=document.createElement('canvas'); c.width=px; c.height=px; var x=c.getContext('2d'); x.imageSmoothingEnabled=true; x.imageSmoothingQuality='high'; x.drawImage(im,0,0,px,px); return (ZScn._pat[k]=c); },
  // the texture's light-and-dark only, as greys around 128: laid over the generated ground with 'overlay', it adds the painted marks and keeps the ground's own colour
  detail:function(id,px,gain){ var t=ZScn.tile(id,px); if(!t)return null; var k=id+'|'+px+'|d', c=ZScn._pat[k]; if(c)return c; c=document.createElement('canvas'); c.width=t.width; c.height=t.height; var x=c.getContext('2d'); x.drawImage(t,0,0);
    try{ var im=x.getImageData(0,0,c.width,c.height), d=im.data, n=d.length/4, sum=0, i, L; for(i=0;i<n;i++)sum+=d[i*4]*0.3+d[i*4+1]*0.59+d[i*4+2]*0.11; var mean=sum/n; gain=gain||1;
      for(i=0;i<n;i++){ L=d[i*4]*0.3+d[i*4+1]*0.59+d[i*4+2]*0.11; L=Math.max(0,Math.min(255,128+(L-mean)*gain)); d[i*4]=d[i*4+1]=d[i*4+2]=L; d[i*4+3]=255; } x.putImageData(im,0,0); }catch(e){ return null; }
    return (ZScn._pat[k]=c); },
  // which painted texture goes on a kind of ground (by the kind's id); null = none yet
  GROUND:{grass:'tx_grass',meadow:'tx_grass',verge:'tx_grass',wild:'tx_grass_wild',vgrass:'tx_grass_village',vgreen:'tx_grass_village',moss:'tx_moss',heath:'tx_heath',heather:'tx_heath',marsh:'tx_marsh'},
  ground:function(kindId){ var t=ZScn.GROUND[kindId]; return t&&!ZScn.off&&ZScn.timg[t]?t:null; },
  pattern:function(ctx,id,px){ var t=ZScn.tile(id,px); return t?ctx.createPattern(t,'repeat'):null; }
};
ZScn.load();
