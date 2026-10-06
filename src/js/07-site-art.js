// ═══════════════════════════════════════════════════════════════════════
// ║ SITE ART — shared by the game (towers & dungeons) and the Design Lab.
// ║ Canvas painters + a tiny map model. Builders (07b towers, 07c caverns)
// ║ return a map: pre-painted base canvas, depth-sorted sprites, lights,
// ║ particles, light shafts and a solid grid. The game's DungeonScene turns
// ║ that into floors (12-scene-dungeon.js); the Lab walks it directly.
// ═══════════════════════════════════════════════════════════════════════
var LT = 32; // lab tile size (same as the game)

// ── Tiny utilities ─────────────────────────────────────────────────────
function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; var t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function rngOf(seed){ var r=mulberry32(seed); return { f:r, i:function(a,b){return a+Math.floor(r()*(b-a+1));}, pick:function(arr){return arr[Math.floor(r()*arr.length)];}, chance:function(p){return r()<p;} }; }
function hexToRgb(h){ h=h.replace('#',''); if(h.length===3)h=h.split('').map(function(c){return c+c;}).join(''); var n=parseInt(h,16); return [n>>16&255,n>>8&255,n&255]; }
function rgbToHex(r,g,b){ return '#'+[r,g,b].map(function(v){v=Math.max(0,Math.min(255,Math.round(v)));return (v<16?'0':'')+v.toString(16);}).join(''); }
function shade(h,f){ var c=hexToRgb(h); return f>=0? rgbToHex(c[0]+(255-c[0])*f,c[1]+(255-c[1])*f,c[2]+(255-c[2])*f) : rgbToHex(c[0]*(1+f),c[1]*(1+f),c[2]*(1+f)); }
function mix(a,b,t){ var x=hexToRgb(a),y=hexToRgb(b); return rgbToHex(x[0]+(y[0]-x[0])*t,x[1]+(y[1]-x[1])*t,x[2]+(y[2]-x[2])*t); }
function rgba(h,a){ var c=hexToRgb(h); return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')'; }
function hexNum(h){ return parseInt(h.replace('#',''),16); }
function mkCanvas(w,h){ var c=document.createElement('canvas'); c.width=Math.max(1,Math.ceil(w)); c.height=Math.max(1,Math.ceil(h)); return c; }
// A big painted canvas → a GPU texture. Phaser's addCanvas keeps a full CPU pixel copy of every canvas
// (getImageData: a GPU read-back stall + 4 MB per 1024² chunk) and the canvas itself; with WebGL we only
// need the uploaded texture, so the canvas is shrunk to 1×1 right after upload (frees its memory).
function gpuTex(scene,key,cv){ scene.textures.addImage(key,cv); if(scene.game.renderer&&scene.game.renderer.type===Phaser.WEBGL){ cv.width=1; cv.height=1; } return key; }
function rr(ctx,x,y,w,h,r){ r=Math.min(r,w/2,h/2); ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function softShadow(ctx,cx,cy,rx,ry,a){ var g=ctx.createRadialGradient(cx,cy,0,cx,cy,rx); g.addColorStop(0,'rgba(0,0,0,'+a+')'); g.addColorStop(1,'rgba(0,0,0,0)'); ctx.save(); ctx.translate(cx,cy); ctx.scale(1,ry/rx); ctx.translate(-cx,-cy); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,rx,0,Math.PI*2); ctx.fill(); ctx.restore(); }
function glowSpot(ctx,cx,cy,r,col,a){ var g=ctx.createRadialGradient(cx,cy,0,cx,cy,r); g.addColorStop(0,rgba(col,a)); g.addColorStop(1,rgba(col,0)); ctx.fillStyle=g; ctx.fillRect(cx-r,cy-r,r*2,r*2); }

// ── Map model ──────────────────────────────────────────────────────────
// Designs call newMap(w,h) and fill it in.
function newMap(w,h){
  return { w:w, h:h, T:LT, solid:new Uint8Array(w*h), base:null, sprites:[], lights:[], particles:[],
    shafts:[], labels:[], spawn:{x:w*LT/2,y:h*LT/2}, dark:0, bg:'#000000', tick:null, stats:{} };
}
function mapSolid(m,tx,ty){ if(tx<0||ty<0||tx>=m.w||ty>=m.h)return true; return m.solid[ty*m.w+tx]===1; }
function setSolid(m,tx,ty,v){ if(tx<0||ty<0||tx>=m.w||ty>=m.h)return; m.solid[ty*m.w+tx]=v?1:0; }
// A tall sprite drawn into its own canvas: fn(ctx, w, h) with (w/2, h) = foot point.
// painted scenery (04h, round 30): the loader, or null (the Design Lab has none) · a colour as [r,g,b]
function _scn(){ return (typeof ZScn!=='undefined'&&!ZScn.off)?ZScn:null; }
function _scnRGB(col){ var m=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.exec(col||''); return m?[parseInt(m[1],16),parseInt(m[2],16),parseInt(m[3],16)]:[128,128,128]; }
function addSprite(m, x, y, w, h, fn){ var c=mkCanvas(w,h); fn(c.getContext('2d'),w,h); m.sprites.push({canvas:c,x:x,y:y}); }
function addLight(m, x, y, r, col, a, opts){ m.lights.push(Object.assign({x:x,y:y,r:r,col:col,a:a},opts||{})); }
function addLabel(m, tx, ty, tw, th, text){ m.labels.push({x:tx*LT,y:ty*LT,w:tw*LT,h:th*LT,text:text}); }

// Reachability helper for generators: returns Uint8Array of cells reachable from (sx,sy).
function floodReach(m,sx,sy){
  var seen=new Uint8Array(m.w*m.h), q=[sy*m.w+sx]; if(mapSolid(m,sx,sy))return seen; seen[q[0]]=1;
  for(var i=0;i<q.length;i++){ var c=q[i],x=c%m.w,y=(c/m.w)|0;
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var nx=x+d[0],ny=y+d[1]; if(mapSolid(m,nx,ny))return; var k=ny*m.w+nx; if(!seen[k]){seen[k]=1;q.push(k);} }); }
  return seen;
}

