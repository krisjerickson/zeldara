// ═══════════════════════════════════════════════════════════════════════
// ║ 05e-world-prebuilt.js — round 72 (Kris, L1: P2 "the world built once"; doc 33 §2.2).
// ║ The 1200×1200 world comes from one seed, so it is the same for every player — yet New Game generated it every time (≈ 3.5 s of CPU on
// ║ a computer, ≈ 12 s on a phone). Now it is generated once, in the cloud (`python tests/bake_world.py`), and shipped as one compressed
// ║ file, assets/world/world.bin.gz, which the page starts fetching as soon as it opens (the title page hides the wait).
// ║ Safety: the file carries a hash of everything that shapes the world (the game's code and the painted-art indexes, which build.mjs
// ║ also puts into the page as ZWORLD_HASH). If they differ — the code changed and nobody re-baked — or the file is missing, slow, or the
// ║ browser cannot unzip, the game generates the world as before. Nothing is lost either way.
// ║ The format: gzip of [4 bytes: header length][header JSON][the typed arrays, each 8-byte aligned]. The header's `g` is the world's
// ║ object graph: a typed array is {"$t":n}, an object met before is {"$r":n} (props are shared with propsByChunk), NaN/±Infinity are {"$n":"…"}.
// ═══════════════════════════════════════════════════════════════════════
var ZWORLD={ URL:'assets/world/world.bin.gz', state:'idle', data:null, ms:0, why:'',
  hash:function(){ return typeof ZWORLD_HASH!=='undefined'?ZWORLD_HASH:''; },
  // ── encode (the bake): the world → an ArrayBuffer (not gzipped) ──
  encode:function(wd,hash){ var typed=[], ids=new Map(), nid=0, seen=new Map();
    var enc=function(v){ if(v===null||v===undefined)return v===undefined?{$u:1}:null; var t=typeof v;
      if(t==='number')return isFinite(v)?v:{$n:String(v)}; if(t==='string'||t==='boolean')return v; if(t==='function')return {$u:1};
      if(ArrayBuffer.isView(v)){ if(!ids.has(v)){ ids.set(v,typed.length); typed.push(v); } return {$t:ids.get(v)}; }
      if(seen.has(v)){ var o=seen.get(v); if(o.$id===undefined)o.$id=nid++; return {$r:o.$id}; }
      if(Array.isArray(v)){ var a={$a:[]}; seen.set(v,a); for(var i=0;i<v.length;i++)a.$a.push(enc(v[i])); return a; }
      if(v instanceof Map||v instanceof Set)return {$u:1};
      var r={$o:{}}; seen.set(v,r); Object.keys(v).forEach(function(k){ r.$o[k]=enc(v[k]); }); return r; };
    var g=enc(wd), off=0, T=typed.map(function(a){ off=Math.ceil(off/8)*8; var e={c:a.constructor.name,o:off,n:a.length}; off+=a.byteLength; return e; });
    var head=new TextEncoder().encode(JSON.stringify({v:1,hash:hash,T:T,g:g})), hl=Math.ceil((4+head.length)/8)*8, buf=new ArrayBuffer(hl+off), u8=new Uint8Array(buf);
    new DataView(buf).setUint32(0,head.length,true); u8.set(head,4); typed.forEach(function(a,i){ u8.set(new Uint8Array(a.buffer,a.byteOffset,a.byteLength),hl+T[i].o); }); return buf; },
  // ── decode: an ArrayBuffer → the world (or null) ──
  decode:function(buf){ var dv=new DataView(buf), hlen=dv.getUint32(0,true), H=JSON.parse(new TextDecoder().decode(new Uint8Array(buf,4,hlen))), hl=Math.ceil((4+hlen)/8)*8;
    if(H.v!==1)return {bad:'version'}; if(H.hash!==ZWORLD.hash())return {bad:'stale',fileHash:H.hash};
    var C={Uint8Array:Uint8Array,Uint8ClampedArray:Uint8ClampedArray,Int8Array:Int8Array,Uint16Array:Uint16Array,Int16Array:Int16Array,Uint32Array:Uint32Array,Int32Array:Int32Array,Float32Array:Float32Array,Float64Array:Float64Array};
    var TA=H.T.map(function(e){ var K=C[e.c]; return new K(buf,hl+e.o,e.n); }), byId={}, fix=[];
    var dec=function(x){ if(x===null||typeof x!=='object')return x; if(x.$t!==undefined)return TA[x.$t]; if(x.$n!==undefined)return Number(x.$n); if(x.$u)return undefined;
      if(x.$r!==undefined){ if(byId[x.$r]!==undefined)return byId[x.$r]; var ph={__ref:x.$r}; fix.push(ph); return ph; }
      if(x.$a){ var a=[]; if(x.$id!==undefined)byId[x.$id]=a; for(var i=0;i<x.$a.length;i++)a.push(dec(x.$a[i])); return a; }
      var o={}; if(x.$id!==undefined)byId[x.$id]=o; var src=x.$o||{}; Object.keys(src).forEach(function(k){ var v=dec(src[k]); if(v!==undefined)o[k]=v; }); return o; };
    var wd=dec(H.g); if(fix.length)return {bad:'forward refs'}; return {wd:wd}; },
  // ── at page load: fetch and unzip it while the title shows ──
  prefetch:function(){ if(ZWORLD.state!=='idle'||typeof ZWP_IN_WORKER!=='undefined')return; if(typeof fetch!=='function'||typeof DecompressionStream==='undefined'){ ZWORLD.state='off'; ZWORLD.why='no fetch/unzip'; return; }
    try{ if(/[?&]world=gen/.test(location.search)){ ZWORLD.state='off'; ZWORLD.why='?world=gen'; return; } }catch(e){}
    if(!ZWORLD.hash()){ ZWORLD.state='off'; ZWORLD.why='no hash in this build'; return; }
    ZWORLD.state='loading'; var t0=Date.now();
    fetch(ZWORLD.URL).then(function(r){ if(!r.ok)throw new Error('http '+r.status); return new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer(); })
      .then(function(buf){ ZWORLD.buf=buf; var R=ZWORLD.decode(buf);      /* buf: kept for the worker painter (05c2) — the world's typed arrays are views into it anyway */
         if(R.wd){ ZWORLD.data=R.wd; ZWORLD.state='ready'; } else { ZWORLD.state='off'; ZWORLD.why=R.bad; } ZWORLD.ms=Date.now()-t0; })
      .catch(function(e){ ZWORLD.state='off'; ZWORLD.why=String(e&&e.message||e); }); },
  // the Boot scene asks: the world if it is here (it then becomes _worldData), else null — wait while it is still on its way (cb when settled)
  whenSettled:function(cb,maxMs){ var t0=Date.now(), go=function(){ if(ZWORLD.state==='loading'&&Date.now()-t0<(maxMs||8000)){ setTimeout(go,50); return; } cb(); }; go(); },
  use:function(){ if(ZWORLD.state==='ready'&&ZWORLD.data&&typeof _worldData!=='undefined'&&!_worldData){ _worldData=ZWORLD.data; ZWORLD.data=null; ZWORLD.used=true;
      /* round 72e: what generating also leaves behind — the region, zone and class grids (realms, map names, soul-lines, hamlets, the new game's saga) */
      _WREG=_worldData.region||null; _WZONE=_worldData.zone||null; _WCLS=_worldData.cls||null; return true; } return false; }
};
try{ ZWORLD.prefetch(); }catch(e){ ZWORLD.state='off'; }
