// ═══════════════════════════════════════════════════════════════════════
// ║ 05c2-world-paint-worker.js — round 72 (Kris's answer O1: P1 "the worker painter — build it, test hard"; doc 33).
// ║ The ground of each 1024-px chunk (its field, terrain edges, built surfaces, painted textures, decoration, walls, props, lava and ley
// ║ lines, and the sprite atlas) was painted on the main thread a slice at a time: 6–14 ms of every frame while the hero moves, and on a
// ║ phone 27–30 ms. Now the whole job (05c wpChunkJob, unchanged) runs in Web Workers on OffscreenCanvas, and the main thread only
// ║ receives the finished pictures and mounts them.
// ║ How: the worker runs THIS SAME game script (the page's own <script>, so every painting function is the very same code) with stand-ins
// ║ for the page (document, Phaser, storage…). It loads the same world from the baked file's bytes (05e, P2), registers the same kinds,
// ║ and gets the painted scenery pictures as ImageBitmaps. Each job carries what may have changed since: the kind and zone grids round
// ║ the chunk, the chunk's props, the felled trees, and the switches (painted scenery on/off, terrain edges on/off).
// ║ Safety: any doubt — no OffscreenCanvas, no baked world, a kind list that differs, a worker error, a clone error — and that chunk (or
// ║ from then on, every chunk) is painted on the main thread exactly as before. Switch: ZWP.on (?wp=1 on, ?wp=0 off).
// ═══════════════════════════════════════════════════════════════════════
var ZWP_SCRIPT=(typeof ZWP_IN_WORKER==='undefined'&&typeof document!=='undefined'&&document.currentScript)||null;      /* the game's own script (this file runs inside it) */
var ZWP={ on:true, state:'off', why:'', pool:[], seq:0, cb:{}, QMAX:2, sent:{}, imgPend:0, nk:0, stats:{jobs:0,fb:0,wms:0,conv:0,maxConv:0},
  // ── the stand-ins a worker needs to run the game's script (prepended to it) ──
  PRELUDE:function(){ return 'var ZWP_IN_WORKER=true; self.window=self; var ZWP_WERR=[];\n'+
    '(function(){ var P; var S=function(){ return P; }; P=new Proxy(S,{get:function(t,k){ if(k===Symbol.toPrimitive)return function(h){ return h==="number"?0:""; }; if(k==="then")return undefined; if(k==="prototype")return {}; if(k==="length")return 0; if(k===Symbol.iterator)return function(){ return [][Symbol.iterator](); }; if(k==="toString"||k==="valueOf")return function(){ return ""; }; return P; }, apply:function(){ return P; }, construct:function(){ return P; }, set:function(){ return true; }}); self.__ZS=P;\n'+
    ' var mkOC=function(){ var c=new OffscreenCanvas(1,1); c.style={}; c.addEventListener=function(){}; c.setAttribute=function(){}; return c; };\n'+
    ' self.document=new Proxy({},{get:function(t,k){ if(k==="createElement")return function(tag){ return String(tag).toLowerCase()==="canvas"?mkOC():P; }; if(k==="currentScript"||k==="getElementById"&&0)return null; if(k==="getElementById"||k==="querySelector")return function(){ return P; }; if(k==="querySelectorAll"||k==="getElementsByTagName"||k==="getElementsByClassName")return function(){ return []; }; return P; }});\n'+
    ' var st={getItem:function(){ return null; },setItem:function(){},removeItem:function(){},key:function(){ return null; },clear:function(){},length:0};\n'+
    ' self.localStorage=st; self.sessionStorage=st; self.Phaser=P; self.innerWidth=1280; self.innerHeight=800; self.devicePixelRatio=1; self.screen={width:1280,height:800};\n'+
    ' self.matchMedia=function(){ return {matches:false,addEventListener:function(){},addListener:function(){}}; }; self.getComputedStyle=function(){ return P; }; self.alert=self.confirm=self.prompt=function(){};\n'+
    ' self.history=P; self.HTMLCanvasElement=OffscreenCanvas; self.HTMLImageElement=function(){}; self.HTMLElement=self.Element=self.Node=function(){}; self.customElements=P;\n'+
    ' self.MutationObserver=self.ResizeObserver=self.IntersectionObserver=function(){ return {observe:function(){},disconnect:function(){},unobserve:function(){}}; };\n'+
    ' ["KeyboardEvent","MouseEvent","PointerEvent","TouchEvent","FocusEvent","WheelEvent"].forEach(function(k){ if(!self[k])self[k]=function(){ return P; }; });\n'+
    ' self.Image=function(){ this.width=0; this.height=0; this.complete=false; }; self.Audio=function(){ return P; }; self.FontFace=self.FontFace||function(){ return P; };\n'+
    ' self.requestAnimationFrame=function(){ return 0; }; self.cancelAnimationFrame=function(){};\n'+
    ' self.setInterval=function(){ return 0; };\n'+      /* the game\'s polling loops have nothing to do here */
    ' var st0=self.setTimeout; self.__zst=st0; self.setTimeout=function(f,ms){ var a=[].slice.call(arguments,2); if(self.__zquiet)return 0; return st0(function(){ try{ if(typeof f==="function")f.apply(null,a); }catch(e){ ZWP_WERR.push(String(e&&e.message)); } },ms); };\n'+
    ' var ce=console.error, cw=console.warn; console.error=console.warn=function(){ ZWP_WERR.push([].slice.call(arguments).join(" ").slice(0,200)); };\n'+
    '})();\n'; },
  want:function(){ try{ var m=/[?&]wp=([01])/.exec(location.search); if(m)return m[1]==='1'; }catch(e){} return ZWP.on; },
  // ── main thread: start the workers once the baked world's bytes are here ──
  start:function(){ if(ZWP.state!=='off'||typeof ZWP_IN_WORKER!=='undefined')return; if(!ZWP.want()){ ZWP.why='switched off'; return; }
    if(typeof OffscreenCanvas==='undefined'||typeof Worker==='undefined'||typeof createImageBitmap==='undefined'){ ZWP.why='no OffscreenCanvas'; ZWP.state='no'; return; }
    try{ var t=new OffscreenCanvas(4,4).getContext('2d'); if(!t||!t.createPattern)throw 0; }catch(e){ ZWP.why='no 2D OffscreenCanvas'; ZWP.state='no'; return; }
    if(!ZWP_SCRIPT||!ZWP_SCRIPT.textContent){ ZWP.why='no script text'; ZWP.state='no'; return; }
    if(typeof ZWORLD==='undefined'||!ZWORLD.buf){ ZWP.why='no baked world'; ZWP.state='no'; return; }
    ZWP.state='loading'; ZWP.t0=performance.now();
    var url=URL.createObjectURL(new Blob([ZWP.PRELUDE(),ZWP_SCRIPT.textContent],{type:'text/javascript'})), n=1;
    try{ var hc=(navigator.hardwareConcurrency||2); n=(typeof ZQUAL!=='undefined'&&ZQUAL.mode==='phone')?1:Math.max(1,Math.min(2,hc-1)); }catch(e){}
    if(ZWP.N)n=ZWP.N;
    for(var i=0;i<n;i++)(function(){ var w; try{ w=new Worker(url); }catch(e){ ZWP.fail('worker: '+e.message); return; } w._busy=0; w._ready=false;
      w.onmessage=function(e){ var m=e.data; if(m.t==='ready'){ w._ready=true; w._nk=m.nk; w._sigs=m.sigs||[]; w._errs=m.errs; if(ZWP.state==='loading'){ ZWP.state='ready'; ZWP.readyMs=Math.round(performance.now()-ZWP.t0); } return; }
        if(m.t==='kinds'){ w._kwait=false; w._miss=new Set(m.miss||[]); return; }
        if(m.t==='done'||m.t==='err'){ w._busy=Math.max(0,w._busy-1); var cb=ZWP.cb[m.id]; delete ZWP.cb[m.id]; if(cb)cb(m); } };
      w.onerror=function(ev){ ZWP.fail('worker error: '+(ev&&ev.message)); try{ ev.preventDefault(); }catch(x){} };
      w.postMessage({t:'init',buf:ZWORLD.buf.slice(0)}); ZWP.pool.push(w); })();
    ZWP.sendImgs(); },
  fail:function(why){ ZWP.state='failed'; ZWP.why=why; var cbs=ZWP.cb; ZWP.cb={}; Object.keys(cbs).forEach(function(k){ cbs[k]({t:'err',why:why}); }); ZWP.pool.forEach(function(w){ try{ w.terminate(); }catch(e){} }); ZWP.pool=[]; },
  // the painted scenery pages and textures that have arrived on the main thread → the workers (as ImageBitmaps; each one once)
  sendImgs:function(){ if(typeof ZScn==='undefined'||!ZWP.pool.length)return; ['img','timg'].forEach(function(k){ var O=ZScn[k]||{}; Object.keys(O).forEach(function(id){ var key=k+':'+id, im=O[id]; if(ZWP.sent[key]===im||!im)return; ZWP.sent[key]=im; ZWP.imgPend++;
      createImageBitmap(im).then(function(b){ ZWP.imgPend--; ZWP.pool.forEach(function(w){ w.postMessage({t:'img',k:k,id:id,bmp:b}); }); }).catch(function(){ ZWP.imgPend--; }); }); }); },
  active:function(wd){ return ZWP.state==='ready'&&!ZWP.hold&&!!wd&&wd===(typeof _worldData!=='undefined'?_worldData:null)&&ZWP.pool.some(function(w){ return w._ready; }); },
  pick:function(){ var b=null; ZWP.pool.forEach(function(w){ if(w._ready&&w._busy<ZWP.QMAX&&(!b||w._busy<b._busy))b=w; }); return b; },
  // a kind's fingerprint: its id and all its settings (the order kinds are registered in differs between this thread and a worker —
  // the village, Asgard and the zones' trails register theirs as the game goes — so kinds are matched by what they are, not their number)
  sig:function(k){ if(!k)return ''; if(k._zsig)return k._zsig; var o=[]; Object.keys(k).sort().forEach(function(p){ if(p[0]==='_')return; var v=k[p]; if(typeof v==='function'){ o.push(p+':f'+String(v).length); return; } try{ o.push(p+':'+JSON.stringify(v)); }catch(e){ o.push(p+':?'); } }); return (k._zsig=o.join(',')); },
  // the worker puts its kinds in this thread's order (a few drawings take their pattern from a kind's number); until it has, no jobs go to it
  kinds:function(w){ var L=WK_REG.list; if(w._kn===L.length&&!w._kwait)return true; if(w._kwait)return false; w._kwait=true; w._kn=L.length; w.postMessage({t:'kinds',sigs:L.map(ZWP.sig)}); return false; },
  cfg:function(){ return {scnOff:typeof ZScn!=='undefined'?!!ZScn.off:true, zwe:typeof ZWE!=='undefined'?!!ZWE.on:false}; },
  // a job with the same face as wpChunkJob: step() until true, then .out
  job:function(wd,cx,cy){ var phase=0, done=false, failed=false, fb=null, out=null, self={out:null,phase:function(){ return fb?fb.phase():phase; }};
    self.step=function(budget){ if(fb){ var r=fb.step(budget); self.out=fb.out; return r; } if(done)return true;
      if(failed){ ZWP.stats.fb++; fb=_wpChunkJob0(wd,cx,cy); var r2=fb.step(budget); self.out=fb.out; return r2; }
      if(phase===1)return false;
      if(ZWP.imgPend>0){ return false; } ZWP.sendImgs(); if(ZWP.imgPend>0)return false;
      var w=ZWP.pick(); if(!w)return false; if(!ZWP.kinds(w))return false;
      var MG=1, MW=4, GW=WCH+2*MG, tx0=cx*WCH-MG-MW, ty0=cy*WCH-MG-MW, WW=GW+2*MW, x0=Math.max(0,tx0), y0=Math.max(0,ty0), x1=Math.min(WORLD_W,tx0+WW), y1=Math.min(WORLD_H,ty0+WW), ww=Math.max(0,x1-x0), hh=Math.max(0,y1-y0);
      var kw=new (wd.kind.constructor)(ww*hh), zw=new (wd.zone.constructor)(ww*hh); for(var y=0;y<hh;y++){ kw.set(wd.kind.subarray((y0+y)*WORLD_W+x0,(y0+y)*WORLD_W+x0+ww),y*ww); zw.set(wd.zone.subarray((y0+y)*WORLD_W+x0,(y0+y)*WORLD_W+x0+ww),y*ww); }
      if(w._miss.size)for(var q=0;q<kw.length;q++){ if(w._miss.has(kw[q])){ failed=true; ZWP.why='a kind the worker lacks: '+(WK_REG.list[kw[q]]||{}).id; return self.step(budget); } }
      var key=cx+'_'+cy, props=(wd.propsByChunk&&wd.propsByChunk[key])||[], chop=wd._chopped&&wd._chopped.size?Array.from(wd._chopped):[];
      var id=++ZWP.seq, msg={t:'job',id:id,cx:cx,cy:cy,key:key,x0:x0,y0:y0,ww:ww,hh:hh,kw:kw,zw:zw,props:props,chop:chop,cfg:ZWP.cfg()};
      try{ w.postMessage(msg,[kw.buffer,zw.buffer]); }catch(e){ failed=true; ZWP.why='post: '+e.message; return self.step(budget); }
      w._busy++; phase=1; var tq=performance.now();
      ZWP.cb[id]=function(m){ if(m.t!=='done'){ failed=true; ZWP.lastErr=m.why; return; } var tc=performance.now(); out=ZWP.unpack(wd,m.out); var dc=performance.now()-tc; ZWP.stats.conv+=dc; ZWP.stats.convPend=(ZWP.stats.convPend||0)+dc; if(dc>ZWP.stats.maxConv)ZWP.stats.maxConv=dc; ZWP.stats.jobs++; ZWP.stats.wms+=m.ms; self.out=out; done=true; };
      return false; };
    return self; },
  // the worker's pictures → canvases (so mounting, the phone's half-size ground and the rest see what they always saw), plus the main
  // thread's own pieces (the stamped particles and light shafts hold canvases made here)
  toCv:function(b){ if(!b||typeof ImageBitmap==='undefined'||!(b instanceof ImageBitmap))return b; var c=mkCanvas(b.width,b.height), r=null;
    try{ r=c.getContext('bitmaprenderer'); }catch(e){} if(r){ r.transferFromImageBitmap(b); return c; }      /* no copy: the canvas shows the worker's bitmap itself */
    var g=c.getContext('2d'); g.drawImage(b,0,0); try{ b.close(); }catch(e){} return c; },
  unpack:function(wd,o){ var cx=o.cx, cy=o.cy; (ZWP.rawGround?['atlas','lavaMask','ley']:['canvas','atlas','lavaMask','ley']).forEach(function(k){ if(o[k])o[k]=ZWP.toCv(o[k]); });      /* rawGround: the opaque ground goes to the GPU as the bitmap itself */
    var inC=function(x,y){ return x>=cx*WCH*LT&&x<(cx+1)*WCH*LT&&y>=cy*WCH*LT&&y<(cy+1)*WCH*LT; };
    o.particles=o.particles||[]; (wd.stampParts||[]).forEach(function(P){ if(inC(P.area.x+P.area.w/2,P.area.y+P.area.h/2))o.particles.push(P); });
    o.shafts=(wd.shafts||[]).filter(function(sh){ return inC(sh.x+sh.canvas.width/2,sh.y); });
    return o; },
  // ── inside a worker ──
  W:{ init:function(m){ var R=ZWORLD.decode(m.buf); if(!R.wd){ postMessage({t:'ready',nk:-1,errs:['world: '+R.bad]}); return; }
      _worldData=R.wd; try{ generateWorld(); }catch(e){} _wkInit(); _wzSkins();
      try{ if(typeof VR_KINDS!=='undefined')Object.keys(VR_KINDS).forEach(function(k){ _wkReg(VR_KINDS[k]); }); }catch(e){} try{ if(typeof ZASG!=='undefined')ZASG.kinds(); }catch(e){} try{ if(typeof ZCITY!=='undefined')ZCITY.kinds(); }catch(e){}      /* the kinds the game adds as it goes */ _WPW.tried=true; _WPW.pool=[]; _WPW.w=null;      /* the field is painted in this worker itself */
      if(typeof ZScn!=='undefined'){ ZScn.done=true; ZScn._started=true; }
      self.__zst(function(){ self.__zquiet=true; postMessage({t:'ready',nk:WK_REG.list.length,sigs:WK_REG.list.map(ZWP.sig),errs:ZWP_WERR.slice(0,8)}); },250); },      /* the script's own setTimeout(…,0) patches run first */
    kinds:function(m){ var L=WK_REG.list, by={}, used=new Set(), N=[], miss=[]; L.forEach(function(k){ var sg=ZWP.sig(k); (by[sg]=by[sg]||[]).push(k); });
      m.sigs.forEach(function(sg,i){ var c=(by[sg]||[]).find(function(k){ return !used.has(k); }); if(c)used.add(c); else { c=Object.assign({},WSK.vgrass); delete c._zsig; miss.push(i); } N.push(c); });
      L.forEach(function(k){ if(!used.has(k))N.push(k); }); N.forEach(function(k,i){ k._gi=i; }); WK_REG.list=N; WP_KT=null; _WPISPAT=null; _WPC={};      /* the tables and tiles made with the old numbers */
      postMessage({t:'kinds',miss:miss}); },
    img:function(m){ var b=m.bmp; b.complete=true; b.naturalWidth=b.width; b.naturalHeight=b.height; if(typeof ZScn!=='undefined')ZScn[m.k][m.id]=b; },
    clean:function(v,T,depth){ if(v===null||typeof v!=='object')return typeof v==='function'?undefined:v; if(depth>6)return undefined;
      if(typeof OffscreenCanvas!=='undefined'&&v instanceof OffscreenCanvas){ var c=new OffscreenCanvas(v.width||1,v.height||1); c.getContext('2d').drawImage(v,0,0); var b=c.transferToImageBitmap(); T.push(b); return b; }
      if(typeof ImageBitmap!=='undefined'&&v instanceof ImageBitmap)return {width:v.width,height:v.height};
      if(ArrayBuffer.isView(v))return v; if(Array.isArray(v))return v.map(function(x){ return ZWP.W.clean(x,T,depth+1); });
      var o={}; for(var k in v){ if(!Object.prototype.hasOwnProperty.call(v,k))continue; var x=ZWP.W.clean(v[k],T,depth+1); if(x!==undefined)o[k]=x; } return o; },
    job:function(m){ var t0=performance.now(), wd=_worldData;
      try{ for(var y=0;y<m.hh;y++){ wd.kind.set(m.kw.subarray(y*m.ww,(y+1)*m.ww),(m.y0+y)*WORLD_W+m.x0); wd.zone.set(m.zw.subarray(y*m.ww,(y+1)*m.ww),(m.y0+y)*WORLD_W+m.x0); }
        wd.propsByChunk=wd.propsByChunk||{}; wd.propsByChunk[m.key]=m.props; wd._chopped=new Set(m.chop); wd.stampParts=[]; wd.shafts=[];
        if(typeof ZScn!=='undefined'){ if(ZWP._so!==undefined&&ZWP._so!==m.cfg.scnOff){ _WPC={}; ZScn._sc={}; ZScn._scq=[]; ZScn._pat={}; } ZWP._so=m.cfg.scnOff; ZScn.off=m.cfg.scnOff; }      /* painted scenery switched: the cached tiles were made with the other setting */ if(typeof ZWE!=='undefined')ZWE.on=m.cfg.zwe;
        var J=_wpChunkJob0(wd,m.cx,m.cy), n=0; while(!J.step(1e9)){ if(++n>1000)throw new Error('the job did not finish'); }
        var o=J.out, T=[], res={};
        Object.keys(o).forEach(function(k){ var v=o[k];
          if((k==='canvas'||k==='atlas'||k==='lavaMask'||k==='ley')&&v&&v.transferToImageBitmap){ var b=v.transferToImageBitmap(); T.push(b); res[k]=b; return; }
          if(k==='sprites'){ res.sprites=v.map(function(sp){ var c=sp.canvas, s2=ZWP.W.clean(Object.assign({},sp,{canvas:null}),T,0); s2.canvas={width:c?c.width:0,height:c?c.height:0}; return s2; }); return; }
          var x=ZWP.W.clean(v,T,0); if(x!==undefined)res[k]=x; });
        postMessage({t:'done',id:m.id,out:res,ms:performance.now()-t0},T);
      }catch(e){ postMessage({t:'err',id:m.id,why:String(e&&e.message||e)}); } } }
};
var _wpChunkJob0=wpChunkJob;
if(typeof ZWP_IN_WORKER!=='undefined'){
  self.onmessage=function(e){ var m=e.data; if(m.t==='init')ZWP.W.init(m); else if(m.t==='img')ZWP.W.img(m); else if(m.t==='kinds')ZWP.W.kinds(m); else if(m.t==='job')ZWP.W.job(m); };
} else {
  wpChunkJob=function(wd,cx,cy){ return ZWP.active(wd)?ZWP.job(wd,cx,cy):_wpChunkJob0(wd,cx,cy); };
  // the workers start as soon as the baked world is unpacked (while the title shows); the patterns made ahead on this thread are no longer needed
  (function poll(){ if(typeof ZWORLD==='undefined'||ZWORLD.state==='loading'||ZWORLD.state==='idle'){ setTimeout(poll,100); return; } setTimeout(function(){ try{ ZWP.start(); }catch(e){ ZWP.state='no'; ZWP.why=String(e.message); } },0); })();
  setTimeout(function(){ if(typeof _wpWarmAhead==='function'){ var wa=_wpWarmAhead; _wpWarmAhead=function(wd){ if(ZWP.active(wd))return false; return wa.apply(this,arguments); }; } },0);
}
