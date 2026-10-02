"""Rounds 10-11: brand — logos (20 first round + 32 teal second pass), wordmarks (10 + 10 gold with axes), home pages (15 + 6 combined), the Lab tabs.
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
    n=pg.evaluate("[1,2].map(g=>[ZBrand.SYMBOLS,ZBrand.WORDS,ZBrand.HOMES].map(L=>L.filter(x=>x.gen===g).length))")
    check('First round 20/10/15 kept; second pass 32 logos, 10 wordmarks, 6 home pages', n==[[20,10,15],[32,10,6]], n)
    r2=pg.evaluate("""(()=>{ var S=ZBrand.SYMBOLS.filter(x=>x.gen===2), W=ZBrand.WORDS.filter(x=>x.gen===2), ids=ZBrand.SYMBOLS.map(x=>x.id);
      return [S.every(x=>x.col===ZBrand.TEAL), W.every(x=>x.col===ZBrand.GOLD), ['world_tree','compass','four_spirits','realm_peak','shield_knot','triquetra','wayfinder','winged_blade'].every(b=>['A','B','C'].every(l=>S.some(x=>x.from===b&&x.lvl===l))), S.filter(x=>x.lvl==='N').length, new Set(ids).size===ids.length]; })()""")
    check('Second pass: all logos teal, all wordmarks gold, each of the 8 picks at A/B/C, 8 new, ids unique', r2==[True,True,True,8,True], r2)
    r3=pg.evaluate("""(()=>{ var ink=function(cv){ var d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data, n=0, was=false; for(var i=3;i<d.length;i+=4){ var on=d[i]>90; if(on!==was)n++; was=on; } return n; }, out=[];
      ['world_tree','compass','triquetra'].forEach(function(b){ var a=['A','B','C'].map(function(l){ return ink(ZBrand.layers(ZBrand.SYMBOLS.find(x=>x.from===b&&x.lvl===l),120,3).main); }), base=ink(ZBrand.layers(ZBrand.byId(b),120,3).main); out.push(a.map(function(v){ return +(v/base).toFixed(2); })); });
      var edge=function(cv){ var c=cv.getContext('2d'), w=cv.width, h=cv.height, n=0; [c.getImageData(0,0,w,2).data,c.getImageData(0,h-2,w,2).data,c.getImageData(0,0,2,h).data,c.getImageData(w-2,0,2,h).data].forEach(function(d){ for(var i=3;i<d.length;i+=4)if(d[i]>60)n++; }); return n; };
      var clip=ZBrand.SYMBOLS.filter(x=>x.gen===2&&edge(ZBrand.layers(x,120,3).main)>0).map(x=>x.id).concat(ZBrand.WORDS.filter(x=>x.gen===2&&edge(ZBrand.wordLayers(x,40).main)>0).map(x=>x.id));
      return [out, clip]; })()""")
    check('Second-pass logos carry clearly more line detail than the first round (edge count ratio), and nothing is cut off at the edge', all(v>1.3 for a in r3[0] for v in a) and not r3[1], r3)
    r=pg.evaluate("""(()=>{ var bad=[], ink=function(cv){ var d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data, n=0; for(var i=3;i<d.length;i+=16)if(d[i]>40)n++; return n; };
      ZBrand.SYMBOLS.forEach(function(S){ var a=[1,2,3].map(function(L){ return ink(ZBrand.layers(S,60,L).main); }); if(!(a[0]>20&&a[1]>20&&a[2]>20))bad.push(S.id+':'+a.join('/')); });
      ZBrand.WORDS.forEach(function(D){ if(ink(ZBrand.wordLayers(D,30).main)<50)bad.push(D.id); });
      var cv=document.createElement('canvas'); cv.width=320; cv.height=180; ZBrand.HOMES.forEach(function(Hm){ try{ ZBrand.home(cv.getContext('2d'),Hm,320,180,3.3,{}); ZBrand.home(cv.getContext('2d'),Hm,320,180,9.1,{}); }catch(e){ bad.push(Hm.id+' '+e.message); } });
      return bad; })()""")
    check('Every symbol draws at all 3 levels, every wordmark and home look draws', not r, r[:5])
    for tab,cnt in [('Logos',52),('Wordmarks',20),('Home Pages',21)]:
        pg.click('.lab-tab:has-text("%s")'%tab); pg.wait_for_timeout(700)
        k=pg.evaluate("[document.querySelectorAll('.br-card').length, document.querySelectorAll('.br-ref .br-card').length, document.querySelector('.br-ref').open]"); check('Lab tab %s shows %d cards, first round folded away below'%(tab,cnt), k[0]==cnt and k[1]>0 and not k[2], k)
    pg.evaluate("document.querySelector('.br-card[data-id=knot_frame] .br-pick').click()"); pg.wait_for_timeout(200)
    pk=pg.evaluate("JSON.stringify(LabApp.picks['homes-knot_frame'])"); check('☆ Pick saves under homes-<id>', '"verdict":"pick"' in pk, pk)
    pg.evaluate("document.querySelector('.br-card[data-id=knot_frame] .br-full').click()"); pg.wait_for_timeout(400)
    fs=pg.evaluate("!!document.getElementById('br-fs')"); pg.evaluate("document.getElementById('br-fs').click()"); pg.wait_for_timeout(100)
    check('⛶ opens full-screen and a click closes it', fs and not pg.evaluate("!!document.getElementById('br-fs')"))
    check('No JS errors (Lab)', not errs, errs[:3]); b.close()
print('%d/%d passed'%(sum(res),len(res)))
