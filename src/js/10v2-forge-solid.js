// ═══════════════════════════════════════════════════════════════════════
// ║ 10v2-forge-solid.js — round 64d: the four forges and Muspelheim are SOLID on the world map.
// ║ Kris: "the volcano forge images in the overworld you can walk over, and it looks weird. you should stop at the border of the forge
// ║ image, although OK to be able to walk behind the back 25% of it, but you should have the normal outline like when walking behind
// ║ an object".
// ║ How: each forge's painted picture is read once into a coarse grid of where it is painted (its soft ground shadow does not count).
// ║ The hero's feet may not step onto a painted cell — except in the top quarter of the picture, where he walks behind it. The
// ║ picture is marked as one that can stand in front of him, so the usual thin outline (10o-outline) shows where it hides him.
// ║ He still enters with TAB from in front (the door is within reach of the bottom edge). A hero already standing inside the picture
// ║ (an old save) may walk out toward the front.
// ║ Switch: ZFSOLID.on (Dev: ZFSOLID.on=false).
// ═══════════════════════════════════════════════════════════════════════
var ZFSOLID={ on:true, BACK:0.25, A:150, G:3,
  TYPES:{volcano_mini:1,volcano_main:1,volcano:1},
  // the grid of painted cells of one site picture (in world pixels, G px a cell), read once
  mask:function(im){ if(!im||!im.texture)return null; if(im._fsM!==undefined)return im._fsM; im._fsM=null;
    try{ var src=im.texture.getSourceImage(); if(!src||!src.width)return null; var cv=src;
      if(!src.getContext){ cv=document.createElement('canvas'); cv.width=src.width; cv.height=src.height; cv.getContext('2d').drawImage(src,0,0); }
      var W=cv.width, H=cv.height, d=cv.getContext('2d').getImageData(0,0,W,H).data, sx=Math.abs(im.scaleX)||1, sy=Math.abs(im.scaleY)||1, G=ZFSOLID.G,
        cw=Math.ceil(W*sx/G), ch=Math.ceil(H*sy/G), g=new Uint8Array(cw*ch), top=-1, bot=-1;
      for(var j=0;j<ch;j++)for(var i=0;i<cw;i++){ var u=Math.min(W-1,Math.floor((i+0.5)*G/sx)), v=Math.min(H-1,Math.floor((j+0.5)*G/sy));
        if(d[(v*W+u)*4+3]>=ZFSOLID.A){ g[j*cw+i]=1; if(top<0)top=j; bot=j; } }
      if(top<0)return null;
      var x0=im.x-im.displayWidth*im.originX, y0=im.y-im.displayHeight*im.originY, back=top+Math.ceil((bot-top+1)*ZFSOLID.BACK);
      im._fsM={g:g,cw:cw,ch:ch,x0:x0,y0:y0,back:back,top:top,bot:bot};
    }catch(e){ if(typeof console!=='undefined')console.warn('forge solid:',e&&e.message); }
    return im._fsM; },
  // is this world point on the solid (front three quarters) of the picture?
  _on:function(M,x,y){ var i=Math.floor((x-M.x0)/ZFSOLID.G), j=Math.floor((y-M.y0)/ZFSOLID.G); if(i<0||j<0||i>=M.cw||j>=M.ch||j<M.back)return false; return M.g[j*M.cw+i]===1; },
  pics:function(ws){ var L=[]; (ws&&ws.siteObjs||[]).forEach(function(o){ if(o&&o.s&&ZFSOLID.TYPES[o.s.type]&&o.ico&&o.ico.scene&&o.ico.texture){ if(!o.ico._zcv)o.ico._zcv=true; L.push(o.ico); } }); return L; },
  // the hero's feet: their middle and either side
  hit:function(ws,x,y){ var L=ZFSOLID.pics(ws); for(var k=0;k<L.length;k++){ var M=ZFSOLID.mask(L[k]); if(!M)continue; if(ZFSOLID._on(M,x,y)||ZFSOLID._on(M,x-7,y)||ZFSOLID._on(M,x+7,y))return true; } return false; },
  blocked:function(ws,x,y,fx,fy){ if(!ZFSOLID.on||!ZFSOLID.hit(ws,x,y))return false; if(fx!==undefined&&ZFSOLID.hit(ws,fx,fy)&&y>=fy-0.01)return false; return true; }
};
setTimeout(function(){ if(typeof WorldScene==='undefined')return; var P=WorldScene.prototype, c0=P._canGo;
  P._canGo=function(nx,ny,mount){ if(ZFSOLID.on&&this.player&&this.siteObjs&&ZFSOLID.blocked(this,nx,ny,this.player.x,this.player.y))return false; return c0.apply(this,arguments); };
},0);
