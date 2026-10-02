"""Round 10: brand — 20 symbol logos (3 detail levels), 10 wordmarks, 15 home-page looks, the Lab tabs.
Run: python tests/test_brand.py  (after node build.mjs)"""
import os, re, sys
from playwright.sync_api import sync_playwright
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
HERE=os.path.dirname(os.path.abspath(__file__)); PH=os.path.join(HERE,'.phaser','package','dist','phaser.min.js')
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"]); pg=b.new_page(viewport={'width':1280,'height':1000}); errs=[]
    pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*cdnjs.*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.goto('file://'+os.path.join(HERE,'..','lab','index.html')); pg.wait_for_timeout(1500)
    n=pg.evaluate("[ZBrand.SYMBOLS.length, ZBrand.WORDS.length, ZBrand.HOMES.length, new Set(ZBrand.SYMBOLS.map(s=>s.col)).size]")
    check('20 symbols, 10 wordmarks, 15 home looks; symbol colours vary', n[:3]==[20,10,15] and n[3]>=15, n)
    r=pg.evaluate("""(()=>{ var bad=[], ink=function(cv){ var d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data, n=0; for(var i=3;i<d.length;i+=16)if(d[i]>40)n++; return n; };
      ZBrand.SYMBOLS.forEach(function(S){ var a=[1,2,3].map(function(L){ return ink(ZBrand.layers(S,60,L).main); }); if(!(a[0]>20&&a[1]>20&&a[2]>20))bad.push(S.id+':'+a.join('/')); });
      ZBrand.WORDS.forEach(function(D){ if(ink(ZBrand.wordLayers(D,30).main)<50)bad.push(D.id); });
      var cv=document.createElement('canvas'); cv.width=320; cv.height=180; ZBrand.HOMES.forEach(function(Hm){ try{ ZBrand.home(cv.getContext('2d'),Hm,320,180,3.3,{}); ZBrand.home(cv.getContext('2d'),Hm,320,180,9.1,{}); }catch(e){ bad.push(Hm.id+' '+e.message); } });
      return bad; })()""")
    check('Every symbol draws at all 3 levels, every wordmark and home look draws', not r, r[:5])
    for tab,cnt in [('Logos',20),('Wordmarks',10),('Home Pages',15)]:
        pg.click('.lab-tab:has-text("%s")'%tab); pg.wait_for_timeout(700)
        k=pg.evaluate("document.querySelectorAll('.br-card').length"); check('Lab tab %s shows %d cards'%(tab,cnt), k==cnt, k)
    pg.evaluate("document.querySelector('.br-card[data-id=quiet_dark] .br-pick').click()"); pg.wait_for_timeout(200)
    pk=pg.evaluate("JSON.stringify(LabApp.picks['homes-quiet_dark'])"); check('☆ Pick saves under homes-<id>', '"verdict":"pick"' in pk, pk)
    pg.evaluate("document.querySelector('.br-card[data-id=quiet_dark] .br-full').click()"); pg.wait_for_timeout(400)
    fs=pg.evaluate("!!document.getElementById('br-fs')"); pg.evaluate("document.getElementById('br-fs').click()"); pg.wait_for_timeout(100)
    check('⛶ opens full-screen and a click closes it', fs and not pg.evaluate("!!document.getElementById('br-fs')"))
    check('No JS errors (Lab)', not errs, errs[:3]); b.close()
print('%d/%d passed'%(sum(res),len(res)))
