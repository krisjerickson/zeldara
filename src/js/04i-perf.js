// ═══════════════════════════════════════════════════════════════════════
// ║ 04i-perf.js — ZPERF: a performance readout (round 44, Kris: "we're having lag issues, especially around in the village.
// ║ Check to see what is causing this and come up with recommendations on how to fix it").
// ║ Dev panel → "📈 Performance readout", the F9 key, or ?perf=1. A small box shows, over the last second:
// ║   fps · average and worst frame (ms) · draw calls a frame · objects drawn · ground painting and chunk mounting (ms)
// ║   and the cause of the worst frame (painting a chunk, mounting one, or the game itself).
// ║ "Copy" puts the last 10 seconds as text on the clipboard, to paste back to Claude.
// ═══════════════════════════════════════════════════════════════════════
var ZPERF={ on:false, acc:{}, hist:[], el:null, gl:false, dc:0,
  // time spent in a named part of this frame (called by the chunk painter, 10c)
  note:function(k,ms){ var a=ZPERF.acc; a[k]=(a[k]||0)+ms; if(ms>(a['max_'+k]||0))a['max_'+k]=ms; },
  hookGL:function(){ if(ZPERF.gl||typeof WebGLRenderingContext==='undefined')return; ZPERF.gl=true; [WebGLRenderingContext.prototype,window.WebGL2RenderingContext&&WebGL2RenderingContext.prototype].forEach(function(P){ if(!P)return;
      ['drawElements','drawArrays'].forEach(function(m){ var o=P[m]; P[m]=function(){ ZPERF.dc++; return o.apply(this,arguments); }; }); }); },
  toggle:function(v){ ZPERF.on=v===undefined?!ZPERF.on:!!v; try{ localStorage.setItem('zeldara_perf',ZPERF.on?'1':'0'); }catch(e){} if(ZPERF.on){ ZPERF.hookGL(); ZPERF.box(); } else if(ZPERF.el){ ZPERF.el.remove(); ZPERF.el=null; }
    var b=typeof document!=='undefined'&&document.getElementById('sb-perf'); if(b)b.textContent='📈 Performance readout: '+(ZPERF.on?'on':'off'); },
  box:function(){ if(ZPERF.el||typeof document==='undefined')return; var d=document.createElement('div'); d.id='zperf'; d.style.cssText='position:fixed;left:8px;bottom:8px;z-index:99999;background:rgba(6,10,20,.82);color:#cfe8ff;font:11px/1.35 monospace;padding:6px 8px;border:1px solid #2c4a6a;border-radius:6px;white-space:pre;pointer-events:auto';
    d.innerHTML='<span id="zperf-t"></span>\n<button id="zperf-c" style="margin-top:4px;font:11px monospace;background:#16304c;color:#cfe8ff;border:1px solid #2c4a6a;border-radius:4px;cursor:pointer">Copy the last 10 s</button>';
    document.body.appendChild(d); ZPERF.el=d; d.querySelector('#zperf-c').onclick=function(){ var t=ZPERF.report(); try{ navigator.clipboard.writeText(t); this.textContent='Copied'; }catch(e){ prompt('Copy:',t); } }; },
  // once a frame (WorldScene.update): close the frame, every second refresh the box
  frame:function(scene,ms){ if(!ZPERF.on)return; var f=ZPERF._f||(ZPERF._f={n:0,sum:0,worst:0,why:'',dc:0,t:0,paint:0,mount:0,maxPaint:0,maxMount:0});
    var a=ZPERF.acc, why=(a.paint||0)>ms*0.5?'painting a chunk':(a.mount||0)>ms*0.5?'mounting a chunk':'game / drawing';
    f.n++; f.sum+=ms; if(ms>f.worst){ f.worst=ms; f.why=why; } f.paint+=a.paint||0; f.mount+=a.mount||0; f.maxPaint=Math.max(f.maxPaint,a.max_paint||0); f.maxMount=Math.max(f.maxMount,a.max_mount||0); ZPERF.acc={};
    f.t+=ms; if(f.t<1000)return; var dc=ZPERF.dc; ZPERF.dc=0; var objs=0; scene.children.list.forEach(function(o){ if(o.visible)objs++; });
    var where=scene.player?Math.floor(scene.player.x/TILE)+','+Math.floor(scene.player.y/TILE):'';
    var row={fps:Math.round(f.n*1000/f.t),avg:+(f.sum/f.n).toFixed(1),worst:Math.round(f.worst),why:f.why,draws:Math.round(dc/f.n),objs:objs,paint:Math.round(f.paint),mount:Math.round(f.mount),maxPaint:Math.round(f.maxPaint),maxMount:Math.round(f.maxMount),chunks:scene._wr?scene._wr.chunks.size:0,jobs:scene._wr?scene._wr.jobs.size:0,at:where};
    ZPERF.hist.push(row); if(ZPERF.hist.length>10)ZPERF.hist.shift(); ZPERF._f=null;
    var t=ZPERF.el&&ZPERF.el.querySelector('#zperf-t'); if(t)t.textContent=row.fps+' fps   frame '+row.avg+' ms (worst '+row.worst+' — '+row.why+')\n'+row.draws+' draw calls · '+row.objs+' objects drawn · '+row.chunks+' chunks ('+row.jobs+' painting)\npainting '+row.paint+' ms/s (longest step '+row.maxPaint+') · mounting '+row.mount+' ms/s (longest '+row.maxMount+')\ntile '+row.at; },
  report:function(){ return 'Quests of Zeldara and Zeldor performance (last '+ZPERF.hist.length+' s)\n'+(typeof navigator!=='undefined'?navigator.userAgent+'\n':'')+'screen '+(typeof window!=='undefined'?window.innerWidth+'x'+window.innerHeight+' @'+(window.devicePixelRatio||1):'')+'\n'+ZPERF.hist.map(function(r){ return JSON.stringify(r); }).join('\n'); }
};
(function(){ try{ if(/[?&]perf=1/.test(location.search)||localStorage.getItem('zeldara_perf')==='1')setTimeout(function(){ ZPERF.toggle(true); },500);
  window.addEventListener('keydown',function(e){ if(e.key==='F9'){ e.preventDefault(); ZPERF.toggle(); } }); }catch(e){} })();
function sbPerf(){ ZPERF.toggle(); }
