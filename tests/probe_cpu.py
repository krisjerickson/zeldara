import sys, os, json, time
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
# Per-frame JS cost split: scene update vs renderer submit vs chunk streaming.
INST="""(()=>{ var ws=game.scene.getScene('World'), R=game.renderer; window._P={upd:[],ren:[],chunk:[]};
  if(!ws._uOrig){ ws._uOrig=ws.update; ws.update=function(t,d){ var a=performance.now(); ws._uOrig.call(ws,t,d); _P.upd.push(performance.now()-a); };
    var ro=R.render; R.render=function(){ var a=performance.now(); ro.apply(R,arguments); _P.ren.push(performance.now()-a); };
    var uc=ws._updateChunks; ws._updateChunks=function(s){ var a=performance.now(); uc.call(ws,s); if(window._P)_P.chunk.push(performance.now()-a); };
    _P.m={}; ['_movePlayer','_updateWorldMonsters','_updateSpells','_updateBogPatches','_updateSpecials','_checkInteraction','_tickTravel','_runicTick','_updateSiteLabels','_revealFog','_drawWorldFog','_emitUI','_wrTick','_updateLife','_updateLargeAnimals','_updateLavaAndBurn','_tickHomeCast','_updatePlayerProj','_updateSpellClouds','_wrMount','_wrUnmount'].forEach(function(k){ var f=ws[k]; if(!f)return; ws[k]=function(){ var a=performance.now(), r=f.apply(ws,arguments); var d=performance.now()-a; (_P.m[k]||(_P.m[k]=[])).push(d); return r; }; });
    var ts=game.loop.step; } })()"""
REP="""(()=>{ var f=a=>{ a=a.slice().sort((x,y)=>x-y); return a.length?[Math.round(a[a.length>>1]*10)/10, Math.round(a[Math.floor(a.length*.95)]*10)/10, Math.round(a[a.length-1])]:null; };
  var ws=game.scene.getScene('World'), n={}; ws.children.list.forEach(o=>{ var k=o.type; if(o.texture&&o.texture.key==='glow')k='glow'; n[k]=(n[k]||0)+1; });
  var m={}; Object.keys(_P.m).forEach(k=>{ var a=_P.m[k]; var sum=a.reduce((x,y)=>x+y,0); m[k]=[a.length, Math.round(sum/Math.max(1,_P.ren.length)*10)/10, Math.round(Math.max(...a))]; });
  return {m:m, frames:_P.upd.length, update:f(_P.upd), render:f(_P.ren), chunks:f(_P.chunk), objs:ws.children.list.length, byType:n}; })()"""
def goto(g,reg):
    g.js(f"(()=>{{var ws=game.scene.getScene('World'),w=ws.wd.waystones.find(q=>q.region==={reg}); ws.player.x=w.x*TILE+16; ws.player.y=(w.y+2)*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y); ws.cameras.main.centerOn(ws.player.x,ws.player.y);}})()")
def run(g,label,keys):
    g.js("_P.upd=[];_P.ren=[];_P.chunk=[];Object.keys(_P.m).forEach(k=>_P.m[k]=[])")
    for k in keys: g.hold(k,2500)
    r=g.js(REP); m=r.pop('m'); print(label, r, flush=True); print('   per-frame ms (calls, avg/frame, max):', {k:v for k,v in sorted(m.items(),key=lambda x:-x[1][1]) if v[1]>=0.3 or v[2]>=10}, flush=True)
with game(new=True) as g:
    g.js("sbUnlockAll()"); g.js(INST); g.wait(1000)
    run(g,'village',['ArrowRight','ArrowLeft','ArrowDown'])
    for reg in [1,2,3,4]:
        goto(g,reg); g.wait(3000); run(g,'region%d'%reg,['ArrowRight','ArrowLeft'])
    g.js("sbNight()"); g.wait(1000); run(g,'region4-night',['ArrowRight','ArrowLeft'])
    print(g.errs[:3])
