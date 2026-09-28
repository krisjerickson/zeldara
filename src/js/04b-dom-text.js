// ═══════════════════════════════════════════════════════════════════════
// ║ DOM TEXT — world-space labels drawn as HTML (like the building names),
// ║ so they are as sharp as the page on any screen (the game canvas itself
// ║ renders at CSS resolution). Drop-in for scene.add.text on stand-alone
// ║ labels and prompts: same x / y / alpha / origin API, tweens work on it.
// ║   domText(scene, x, y, text, style) → proxy
// ═══════════════════════════════════════════════════════════════════════
function _dtxHost(scene){
  if(scene._dtxHost&&scene._dtxHost.isConnected)return scene._dtxHost;
  var app=document.getElementById('app')||document.body, h=document.createElement('div'); h.className='dtx-host'; app.appendChild(h); scene._dtxHost=h;
  scene._dtx=[];
  scene.events.on('postupdate',function(){ _dtxProject(scene); });
  scene.events.on('sleep',function(){ h.style.display='none'; });
  scene.events.on('pause',function(){ h.style.display='none'; });
  scene.events.on('resume',function(){ h.style.display=''; });
  scene.events.on('wake',function(){ h.style.display=''; });
  scene.events.once('shutdown',function(){ (scene._dtx||[]).forEach(function(t){ t.active=false; }); scene._dtx=[]; if(h.parentNode)h.parentNode.removeChild(h); scene._dtxHost=null; });
  return h;
}
function _dtxProject(scene){
  var L=scene._dtx; if(!L||!L.length)return; var cam=scene.cameras.main, vw=cam.worldView, z=cam.zoom, cw=cam.width, ch=cam.height;
  for(var i=L.length-1;i>=0;i--){ var t=L[i]; if(!t.active){ L.splice(i,1); continue; }
    var sx, sy; if(t.scrollFactorX===0){ sx=cam.x+(t.x-cw/2)*z+cw/2; sy=cam.y+(t.y-ch/2)*z+ch/2; }
    else { sx=cam.x+(t.x-vw.x)/vw.width*cw; sy=cam.y+(t.y-vw.y)/vw.height*ch; }
    var on=t.visible&&t.alpha>0.01&&sx>-300&&sx<cw+300&&sy>-120&&sy<ch+120, el=t._el;
    if(!on){ if(el.style.display!=='none')el.style.display='none'; continue; }
    if(el.style.display==='none')el.style.display='';
    var fs=Math.round(t._fs*z*t.scaleY*10)/10; if(t._lastFs!==fs){ el.style.fontSize=fs+'px'; t._lastFs=fs; }
    el.style.transform='translate('+Math.round(sx)+'px,'+Math.round(sy)+'px) translate('+(-t.originX*100)+'%,'+(-t.originY*100)+'%)';
    var a=Math.round(t.alpha*100)/100; if(t._lastA!==a){ el.style.opacity=a; t._lastA=a; }
    if(t._lastD!==t.depth){ el.style.zIndex=Math.round(t.depth*10); t._lastD=t.depth; } }
}
function domText(scene,x,y,txt,style){
  style=style||{}; var host=_dtxHost(scene), el=document.createElement('div'); el.className='dtx';
  var sw=style.strokeThickness||0, sc=style.stroke||'#000';
  el.style.color=style.color||'#fff'; if(style.fontStyle&&/bold/.test(style.fontStyle))el.style.fontWeight='700';
  if(style.align)el.style.textAlign=style.align;
  if(sw)el.style.textShadow=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]].map(function(d){ return d[0]*Math.max(1,sw/2.4)+'px '+d[1]*Math.max(1,sw/2.4)+'px 0 '+sc; }).join(',')+',0 0 3px '+sc;
  el.textContent=txt; host.appendChild(el);
  var t={ _el:el, _fs:parseFloat(style.fontSize)||12, scene:scene, x:x, y:y, alpha:1, visible:true, active:true, originX:0, originY:0, depth:0, scaleX:1, scaleY:1, scrollFactorX:1, text:txt, type:'DomText',
    setText:function(s){ s=String(s); if(s!==this.text){ this.text=s; el.textContent=s; } return this; },
    setOrigin:function(ox,oy){ this.originX=ox; this.originY=oy===undefined?ox:oy; return this; },
    setDepth:function(d){ this.depth=d; return this; }, setPosition:function(nx,ny){ this.x=nx; if(ny!==undefined)this.y=ny; return this; },
    setX:function(v){ this.x=v; return this; }, setY:function(v){ this.y=v; return this; },
    setAlpha:function(a){ this.alpha=a; return this; }, setVisible:function(v){ this.visible=!!v; return this; },
    setScale:function(a,b){ this.scaleX=a; this.scaleY=b===undefined?a:b; return this; },
    setScrollFactor:function(f){ this.scrollFactorX=f; return this; },
    setColor:function(c){ el.style.color=c; return this; }, setFontSize:function(f){ this._fs=parseFloat(f)||this._fs; this._lastFs=null; return this; },
    setStyle:function(s){ if(s&&s.color)el.style.color=s.color; if(s&&s.fontSize)this.setFontSize(s.fontSize); return this; },
    setShadow:function(){ return this; }, setStroke:function(){ return this; }, setWordWrapWidth:function(){ return this; },
    destroy:function(){ if(!this.active)return; this.active=false; if(el.parentNode)el.parentNode.removeChild(el); if(scene.tweens)scene.tweens.killTweensOf(this); }
  };
  t.setOrigin(0,0); scene._dtx.push(t); return t;
}
