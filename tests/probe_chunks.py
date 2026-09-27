import sys, os, json, statistics
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
with game(new=None) as g:
    g.page.evaluate("""() => { window._PR=null; (async function(){ _worldData=null; var wd=generateWorld(); _wpWorker(); var res=[];
      var list=[]; for(var cy=1;cy<37;cy+=5)for(var cx=1;cx<37;cx+=5)list.push([cx,cy]); list.push([21,16],[21,15],[22,16],[20,16]);
      for(var c of list){ var j=wpChunkJob(wd,c[0],c[1]), pm={}, mx=0, main=0, t0=performance.now(), steps=0;
        while(true){ var ph=j.phase(), a=performance.now(), done=j.step(0.001), dt=performance.now()-a; pm[ph]=Math.max(pm[ph]||0,Math.round(dt)); main+=dt; if(dt>mx)mx=dt; steps++; if(done)break; _WPW.finMs=0; await new Promise(r=>setTimeout(r,0)); if(_WPW.finMs){ pm.fin=Math.round(_WPW.finMs); main+=_WPW.finMs; } }
        var land=0; for(var y=c[1]*32;y<c[1]*32+32;y++)for(var x=c[0]*32;x<c[0]*32+32;x++){ if(wd.cls[y*1200+x]>1)land++; }
        res.push({c:c,land:land,wall:Math.round(performance.now()-t0),main:Math.round(main),maxStep:Math.round(mx),steps:steps,pm:pm}); }
      window._PR={res:res,worker:!!_WPW.w}; })(); }""")
    for i in range(240):
        g.wait(1000)
        r=g.js("window._PR")
        if r: break
    res=r['res']; land=[x for x in res if x['land']>200]
    print('worker',r['worker'],'chunks',len(res),'land',len(land))
    print('main mean',statistics.mean(x['main'] for x in land),'wall mean',statistics.mean(x['wall'] for x in land),'max step',max(x['maxStep'] for x in land))
    for x in sorted(res,key=lambda x:-x['maxStep'])[:8]: print(x)
