// ═══════════════════════════════════════════════════════════════════════
// ║ 10o-outline.js — the hero's outline through whatever stands in front of him (round 45).
// ║ Kris: "hero outline through the roof is great, and anytime the hero is behind or partially behind something, like a tree, you should
// ║ also do this outline approach".
// ║ Every other frame the hero's picture is tested against the standing pictures drawn in front of him (a higher depth): a few points of
// ║ his body are looked up in a small alpha map of each picture (ZOL.mask, made once per picture). When any point is covered, a soft teal
// ║ silhouette of the hero (and his mount) is drawn above the scenery; it fades out again when he steps clear.
// ║ Used by the World (10-scene-world), the adventure sites (12-scene-dungeon) and the houses (11-scene-building).
// ║ Switch: ZOL.on (Dev: ZOL.on=false).
// ═══════════════════════════════════════════════════════════════════════
var ZOL={ on:true, COL:0x7ff5e6, A:0.6, F:4,
  // a small alpha map of a canvas: 1 cell per F × F pixels (drawn down, so it is cheap); kept on the canvas
  mask:function(cv){ if(!cv||cv._zm===null)return null; if(cv._zm)return cv._zm; if(!cv.width||cv.width<=1||typeof document==='undefined')return null;
    try{ var w=Math.max(1,Math.ceil(cv.width/ZOL.F)), h=Math.max(1,Math.ceil(cv.height/ZOL.F)), c=ZOL._c||(ZOL._c=document.createElement('canvas')); c.width=w; c.height=h;
      var g=c.getContext('2d'); g.clearRect(0,0,w,h); g.drawImage(cv,0,0,w,h); var d=g.getImageData(0,0,w,h).data, a=new Uint8Array(w*h); for(var i=0;i<a.length;i++)a[i]=d[i*4+3];
      cv._zm={w:w,h:h,cw:cv.width,ch:cv.height,a:a}; return cv._zm; }catch(e){ cv._zm=null; return null; } },
  // a picture tall enough to hide part of the hero gets its map now (before its canvas is uploaded and emptied)
  keep:function(im,cv,res,lazy){ if(!im||!cv)return; var h=(cv._zm?cv._zm.ch:cv.height)/(res||1); if(h<30)return; im._zcv=cv; if(!lazy&&cv.width>1)ZOL.mask(cv); },
  _covered:function(im,wx,wy){ var M=im._zcv&&(im._zcv._zm||ZOL.mask(im._zcv)); if(!M)return false;
    var lp=im.getLocalPoint(wx,wy), fw=im.frame.width, fh=im.frame.height, lx=lp.x, ly=lp.y; if(lx<0||ly<0||lx>=fw||ly>=fh)return false; if(im.flipX)lx=fw-1-lx; if(im.flipY)ly=fh-1-ly;
    var mx=Math.floor(lx/fw*M.w), my=Math.floor(ly/fh*M.h); return M.a[my*M.w+mx]>110; },
  // call every frame: scene, the hero's container, the depth for the silhouette (above the scenery, below the menus)
  tick:function(scene,cont,depth){ if(!scene||!cont||!cont.scene)return; var S=scene._zol||(scene._zol={n:0,on:false,a:0,g:null});
    S.n++; if(S.n%2===0){ S.on=ZOL.on&&cont.visible&&ZOL._occluded(scene,cont); }
    var want=S.on?ZOL.A:0; S.a+=(want-S.a)*0.25; if(S.a<0.02&&!S.on){ if(S.g)S.g.setVisible(false); return; }
    ZOL._ghost(scene,cont,S,depth); },
  _parts:function(cont){ var L=[]; (cont.list||[]).forEach(function(c){ if(c.type==='Image'&&c.visible&&c.alpha>0.05&&c.texture&&c.texture.key!=='__DEFAULT'&&c.texture.key!=='__MISSING'&&!c._zolSkip)L.push(c); }); return L; },
  _occluded:function(scene,cont){ var parts=ZOL._parts(cont); if(!parts.length)return false; var b=null;
    parts.forEach(function(c){ var r=c.getBounds(); if(r.width<6||r.height<10)return; if(!b)b={x:r.x,y:r.y,r:r.right,bt:r.bottom}; else { b.x=Math.min(b.x,r.x); b.y=Math.min(b.y,r.y); b.r=Math.max(b.r,r.right); b.bt=Math.max(b.bt,r.bottom); } });
    if(!b)return false; var W=b.r-b.x, H=b.bt-b.y, pts=[]; [0.3,0.5,0.7].forEach(function(fx){ [0.12,0.35,0.6,0.84].forEach(function(fy){ pts.push([b.x+W*fx,b.y+H*fy]); }); });
    var d0=cont.depth, L=scene.children.list;
    for(var i=0;i<L.length;i++){ var o=L[i]; if(o===cont||o.depth<=d0||!o.visible||o.alpha<0.35||!o._zcv||o.blendMode!==0||(o.scrollFactorX!==undefined&&o.scrollFactorX!==1))continue;
      var dw=o.displayWidth, dh=o.displayHeight, ox=o.x-o.originX*dw, oy=o.y-o.originY*dh; if(ox+dw<b.x||ox>b.r||oy+dh<b.y||oy>b.bt)continue;      // (no rotation on scenery: a cheap box)
      for(var k=0;k<pts.length;k++)if(ZOL._covered(o,pts[k][0],pts[k][1]))return true; }
    return false; },
  _ghost:function(scene,cont,S,depth){ var parts=ZOL._parts(cont);
    if(!S.g||!S.g.scene){ S.g=scene.add.container(0,0); S.g._zolSkip=true; S.ims=[]; }
    var G=S.g; G.setDepth(depth).setVisible(true).setPosition(cont.x,cont.y).setScale(cont.scaleX,cont.scaleY);
    while(S.ims.length<parts.length){ var im=scene.add.image(0,0,parts[0].texture.key); G.add(im); S.ims.push(im); }
    S.ims.forEach(function(im,i){ var c=parts[i]; if(!c){ im.setVisible(false); return; }
      if(im.texture.key!==c.texture.key||im.frame.name!==c.frame.name)im.setTexture(c.texture.key,c.frame.name);
      im.setVisible(true).setPosition(c.x,c.y).setOrigin(c.originX,c.originY).setScale(c.scaleX,c.scaleY).setFlip(c.flipX,c.flipY).setAngle(c.angle).setAlpha(S.a);
      try{ if(im.setTintFill)im.setTintFill(ZOL.COL); else im.setTint(ZOL.COL); }catch(e){} }); }
};
