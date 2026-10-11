// ═══════════════════════════════════════════════════════════════════════
// ║ 10o-outline.js — the hero's outline where something stands in front of him (round 45, redone in round 46).
// ║ Round 45 (Kris): "hero outline through the roof is great, and anytime the hero is behind or partially behind something, like a tree, you
// ║ should also do this outline approach".
// ║ Round 46 (Kris): "Best would be to only hide the portion of you behind the object, instead of your entire sprite turning color" → card:
// ║ "Hidden + thin outline" — the covered part is hidden like real depth and only that part shows a thin outline of the hero.
// ║ How: the hero is depth-sorted as before (what stands in front hides him). When a standing picture in front overlaps him, a small
// ║ render texture above the scenery draws a thin teal ring of his shape (his pictures tint-filled at four 1.5 px offsets, his own shape
// ║ erased from the middle), masked by the pictures in front — so the ring shows only where he is covered. All on the GPU: the round 45
// ║ version read every picture's pixels back once (getImageData), which was a long frame the first time he passed behind a big picture.
// ║ Used by the World (10-scene-world), the adventure sites (12-scene-dungeon) and the houses (11-scene-building).
// ║ ZOL.keep / ZOL.mask only mark a picture as one that can stand in front (im._zcv). Switch: ZOL.on (Dev: ZOL.on=false).
// ═══════════════════════════════════════════════════════════════════════
var ZOL={ on:true, COL:0x7ff5e6, A:0.95, W:1.5, PAD:6,
  mask:function(cv){ if(!cv)return null; cv._zm=true; return true; },          // marks a picture that can stand in front (the callers then set im._zcv); nothing is read back any more
  keep:function(im,cv,res,lazy){ if(!im||!cv)return; var h=(cv.height||0)/(res||1); if(cv.width>1&&h<30)return; im._zcv=true; },
  _parts:function(cont){ var L=[]; (cont.list||[]).forEach(function(c){ if(c.type==='Image'&&c.visible&&c.alpha>0.05&&c.texture&&c.texture.key!=='__DEFAULT'&&c.texture.key!=='__MISSING'&&!c._zolSkip)L.push(c); }); return L; },
  // the hero's box in world space
  _box:function(cont,parts){ var b=null; parts.forEach(function(c){ var r=c.getBounds(); if(r.width<4||r.height<6)return; if(!b)b={x:r.x,y:r.y,r:r.right,bt:r.bottom}; else { b.x=Math.min(b.x,r.x); b.y=Math.min(b.y,r.y); b.r=Math.max(b.r,r.right); b.bt=Math.max(b.bt,r.bottom); } }); return b; },
  // the standing pictures in front of the hero whose box overlaps his
  _front:function(scene,cont,b){ var d0=cont.depth, L=scene.children.list, out=[];
    for(var i=0;i<L.length;i++){ var o=L[i]; if(o===cont||o.depth<=d0||!o.visible||o.alpha<0.35||!o._zcv||o.blendMode!==0||(o.scrollFactorX!==undefined&&o.scrollFactorX!==1))continue;
      if(o.cameraFilter&&scene.cameras&&(o.cameraFilter&scene.cameras.main.id))continue;
      var dw=o.displayWidth, dh=o.displayHeight, ox=o.x-o.originX*dw, oy=o.y-o.originY*dh; if(ox+dw<b.x||ox>b.r||oy+dh<b.y||oy>b.bt)continue; out.push(o); }
    return out; },
  tick:function(scene,cont,depth){ if(!scene||!cont||!cont.scene)return; var S=scene._zol||(scene._zol={n:0,front:[]});
    S.n++; var parts=ZOL._parts(cont), b=(ZOL.on&&cont.visible&&parts.length)?ZOL._box(cont,parts):null;
    if(S.n%2===0||!b)S.front=b?ZOL._front(scene,cont,b):[]; else S.front=S.front.filter(function(o){ return o.scene&&o.visible; });      // a chunk can be parked or dropped between two looks
    if(!b||!S.front.length){ if(S.rt)S.rt.setVisible(false); return; }
    try{ ZOL._draw(scene,cont,parts,b,S,depth); }catch(e){ if(S.rt)S.rt.setVisible(false); ZOL._err=(ZOL._err||0)+1; if(ZOL._err>30)ZOL.on=false; if(typeof console!=='undefined')console.warn('outline:',e&&e.message); } },
  _draw:function(scene,cont,parts,b,S,depth){ var P=ZOL.PAD, x0=Math.floor(b.x-P), y0=Math.floor(b.y-P), w=Math.ceil(b.r-b.x+2*P), h=Math.ceil(b.bt-b.y+2*P);
    if(!S.rt||!S.rt.scene){ S.rt=scene.add.renderTexture(0,0,w,h).setOrigin(0,0); S.rt._zolSkip=true; S.mrt=scene.make.renderTexture({x:0,y:0,width:w,height:h,add:false}).setOrigin(0,0);
      S.stamp=scene.make.image({x:0,y:0,key:parts[0].texture.key,add:false}); S.useMask=!!(S.rt.setMask&&S.mrt.createBitmapMask); if(S.useMask)S.rt.setMask(S.mrt.createBitmapMask()); }
    if(S.rt.width<w||S.rt.height<h){ S.rt.resize(Math.max(w,S.rt.width),Math.max(h,S.rt.height)); S.mrt.resize(Math.max(w,S.mrt.width),Math.max(h,S.mrt.height)); }
    S.rt.setPosition(x0,y0).setDepth(depth).setVisible(true).setAlpha(ZOL.A); S.mrt.setPosition(x0,y0);
    var rt=S.rt, st=S.stamp, sx=cont.scaleX, sy=cont.scaleY, W=ZOL.W;
    var place=function(c,dx,dy){ if(st.texture.key!==c.texture.key||st.frame.name!==c.frame.name)st.setTexture(c.texture.key,c.frame.name);
      st.setOrigin(c.originX,c.originY).setScale(c.scaleX*sx,c.scaleY*sy).setFlip(c.flipX,c.flipY).setAngle(c.angle).setPosition(cont.x+c.x*sx-x0+dx,cont.y+c.y*sy-y0+dy); };
    rt.clear();
    // the ring: his shape filled at four small offsets, his own shape taken out of the middle
    st.setTintFill(ZOL.COL).setAlpha(1);
    parts.forEach(function(c){ [[W,0],[-W,0],[0,W],[0,-W]].forEach(function(o){ place(c,o[0],o[1]); rt.draw(st); }); });
    parts.forEach(function(c){ place(c,0,0); rt.erase(st); });
    st.clearTint();
    // only where he is covered: the mask is the pictures in front of him
    if(S.useMask){ var m=S.mrt; m.clear(); S.front.forEach(function(o){ m.draw(o,o.x-x0,o.y-y0); }); }
  }
};
