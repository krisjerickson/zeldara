import sys, os, json, re
sys.path.insert(0,'/home/claude/z/repo/tests')
from playwright.sync_api import sync_playwright
PH=os.environ['PHASER_JS']; INDEX='/home/claude/z/repo/index.html'
INIT="""
window.__gl={draw:0,verts:0,bind:0,buf:0,prog:0};
(function(){ var og=HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext=function(t){ var c=og.apply(this,arguments); if(c&&/webgl/.test(t)&&!c.__w){ c.__w=1; window.__glv=t;
  var da=c.drawArrays, de=c.drawElements, bt=c.bindTexture, bs=c.bufferSubData, bd=c.bufferData, up=c.useProgram;
  c.drawArrays=function(m,f,n){ __gl.draw++; __gl.verts+=n; return da.apply(this,arguments); };
  c.drawElements=function(m,n){ __gl.draw++; __gl.verts+=n; return de.apply(this,arguments); };
  ['drawArraysInstanced','drawElementsInstanced'].forEach(function(k){ var o=c[k]; if(o)c[k]=function(){ __gl.draw++; return o.apply(this,arguments); }; });
  var ge=c.getExtension; c.getExtension=function(n){ var e=ge.apply(this,arguments); if(e&&/instanced/i.test(n)&&!e.__w){ e.__w=1; ['drawArraysInstancedANGLE','drawElementsInstancedANGLE'].forEach(function(k){ var o=e[k]; e[k]=function(){ __gl.draw++; return o.apply(this,arguments); }; }); } return e; };
  c.bindTexture=function(){ __gl.bind++; return bt.apply(this,arguments); };
  c.bufferSubData=function(a,b,d){ __gl.buf+=(d&&d.byteLength)||0; return bs.apply(this,arguments); };
  c.bufferData=function(a,d){ __gl.buf+=(d&&d.byteLength)||0; return bd.apply(this,arguments); };
  c.useProgram=function(){ __gl.prog++; return up.apply(this,arguments); };
 } return c; }; })();
"""
MEASURE="""async (n)=>{ var G=window.__gl, s0=Object.assign({},G), f=0, cpu=0, t0=performance.now(), tp=0;
  var pre=function(){ tp=performance.now(); }, post=function(){ cpu+=performance.now()-tp; f++; };
  game.events.on('prestep',pre); game.events.on('postrender',post);
  await new Promise(function(r){ var iv=setInterval(function(){ if(f>=n){ clearInterval(iv); r(); } },20); });
  game.events.off('prestep',pre); game.events.off('postrender',post); var dt=performance.now()-t0;
  var sc=game.scene.getScenes(true), objs=0; sc.forEach(function(s){ objs+=s.children.list.length; });
  return {frames:f, draw:+((G.draw-s0.draw)/f).toFixed(1), verts:Math.round((G.verts-s0.verts)/f), binds:+((G.bind-s0.bind)/f).toFixed(1), bufKB:+((G.buf-s0.buf)/f/1024).toFixed(1), progs:+((G.prog-s0.prog)/f).toFixed(1), cpu_ms:+(cpu/f).toFixed(2), frame_ms:+(dt/f).toFixed(1), objs:objs, scenes:sc.map(function(s){return s.sys.settings.key;})}; }"""
out={}
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"]); pg=b.new_page(viewport={"width":1280,"height":800}); errs=[]
    pg.on("pageerror", lambda e: errs.append("PAGEERR "+str(e)[:300]))
    pg.on("console", lambda m: errs.append(m.type+": "+m.text[:300]) if m.type in("error","warning") else None)
    pg.add_init_script(INIT)
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    html=open(INDEX,encoding='utf-8').read(); pg.route("http://zeldara.test/**", lambda r: r.fulfill(body=html, content_type="text/html"))
    pg.goto("http://zeldara.test/index.html"); pg.wait_for_timeout(2500)
    out['ver']=pg.evaluate("Phaser.VERSION+' '+window.__glv+' type='+(typeof game!=='undefined'?game.config.renderType:'nogame')")
    try:
        out['title']=pg.evaluate(MEASURE,20)
        pg.evaluate("game.loop.smoothStep=false; game.scene.getScene('Title').scene.start('Boot',{newGame:true})")
        for _ in range(60):
            pg.wait_for_timeout(250)
            if pg.evaluate("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): break
        pg.wait_for_timeout(4000)
        out['village']=pg.evaluate(MEASURE,30)
        pg.screenshot(path=os.environ.get('SHOT','/tmp/x.png'))
        for extra in sys.argv[1:]:
            pass
    except Exception as e: out['exc']=str(e)[:400]
    out['errs']=errs[:25]; out['nerr']=len(errs); b.close()
print(json.dumps(out,indent=1))
