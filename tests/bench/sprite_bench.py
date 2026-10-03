import sys, os, json
from playwright.sync_api import sync_playwright
PH=os.environ['PHASER_JS']
INIT=open(os.path.dirname(os.path.abspath(__file__))+'/engine_bench.py').read().split('INIT="""')[1].split('"""')[0]
PAGE="""<!doctype html><html><body style="margin:0"><script src="http://z.test/phaser.js"></script><script>
var N_TEX=240, CELL=48;
function paint(c,i,ox,oy){ var h=(i*47)%360; c.fillStyle='hsl('+h+',60%,50%)'; c.beginPath(); c.ellipse(ox+24,oy+28,14,16,0,0,7); c.fill(); c.fillStyle='hsl('+h+',60%,30%)'; c.fillRect(ox+14,oy+8,20,10); c.fillStyle='#fff'; c.fillRect(ox+18,oy+20,4,4); c.fillRect(ox+27,oy+20,4,4); }
var S={ create:function(){ var i, s=this;
   for(i=0;i<N_TEX;i++){ var cv=document.createElement('canvas'); cv.width=cv.height=CELL; paint(cv.getContext('2d'),i,0,0); s.textures.addCanvas('m'+i,cv); }
   var at=document.createElement('canvas'); at.width=16*CELL; at.height=15*CELL; var ac=at.getContext('2d'); for(i=0;i<N_TEX;i++)paint(ac,i,(i%16)*CELL,Math.floor(i/16)*CELL);
   var T=s.textures.addCanvas('atlas',at); for(i=0;i<N_TEX;i++)T.add(i,0,(i%16)*CELL,Math.floor(i/16)*CELL,CELL,CELL);
   window.scene=s; window.items=[]; },
  update:function(t){ var L=window.items; for(var i=0;i<L.length;i++){ var o=L[i]; o.x=o.bx+Math.sin(t*0.002+i)*20; o.y=o.by+Math.cos(t*0.0017+i)*20; } } };
window.setup=function(mode,n){ window.items.forEach(function(o){ o.destroy(); }); window.items=[]; if(window.layer){ window.layer.destroy(); window.layer=null; }
  var s=window.scene, i, rnd=function(k){ var x=Math.sin(k*12.9898)*43758.5453; return x-Math.floor(x); };
  if(mode==='gpu'){ var L=s.add.spriteGPULayer('atlas',n); for(i=0;i<n;i++)L.addMember({x:rnd(i)*1280,y:rnd(i+.5)*800,frame:i%N_TEX}); window.layer=L; return; }
  for(i=0;i<n;i++){ var x=rnd(i)*1280,y=rnd(i+.5)*800, o=mode==='separate'?s.add.image(x,y,'m'+((i*7)%N_TEX)):s.add.image(x,y,'atlas',(i*7)%N_TEX); o.bx=x; o.by=y; window.items.push(o); } };
var game=new Phaser.Game({type:Phaser.WEBGL,width:1280,height:800,scene:S,backgroundColor:'#203020'});
</script></body></html>"""
MEASURE=open(os.path.dirname(os.path.abspath(__file__))+'/engine_bench.py').read().split('MEASURE="""')[1].split('"""')[0]
res={}
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"]); pg=b.new_page(viewport={"width":1280,"height":800}); errs=[]
    pg.on("pageerror", lambda e: errs.append(str(e)[:200])); pg.add_init_script(INIT)
    pg.route("http://z.test/phaser.js", lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route("http://z.test/", lambda r: r.fulfill(body=PAGE, content_type="text/html"))
    pg.goto("http://z.test/"); pg.wait_for_timeout(1500); res['ver']=pg.evaluate("Phaser.VERSION"); res['maxTex']=pg.evaluate("game.renderer.maxTextures||(game.renderer.glTextureUnits&&game.renderer.glTextureUnits.units&&game.renderer.glTextureUnits.units.length)||null")
    modes=['separate','atlas']+(['gpu'] if res['ver'].startswith('4') else [])
    for n in (300,3000):
        for m in modes:
            try:
                pg.evaluate("([m,n])=>setup(m,n)",[m,n]); pg.wait_for_timeout(600); r=pg.evaluate(MEASURE,30)
                res[m+' '+str(n)]={k:r[k] for k in ('draw','binds','bufKB','cpu_ms','frame_ms')}; pg.screenshot(path='synth_'+m+str(n)+'.png') if m=='gpu' else None
            except Exception as e: res[m+' '+str(n)]=str(e)[:200]
    res['errs']=errs[:5]; b.close()
print(json.dumps(res,indent=0))
