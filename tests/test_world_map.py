"""World Map (Phase 3 design): 1200x1200 rugged island, 4 regions + lake, 40 zones,
3 craftsman gates, sites/harbors/waystones all reachable from the village."""
import re, os, json
from playwright.sync_api import sync_playwright
HERE=os.path.dirname(os.path.abspath(__file__))
PHASER=os.environ.get('PHASER_JS', os.path.join(HERE,'.phaser','package','dist','phaser.min.js'))
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"])
    pg=b.new_page(viewport={"width":1400,"height":1000}); errs=[]
    pg.on("pageerror",lambda e: errs.append("PAGEERR "+str(e)))
    pg.route(re.compile(r".*cdnjs.*phaser.*"),lambda r: r.fulfill(path=PHASER,content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"),lambda r: r.abort())
    html=open(os.path.join(HERE,'..','lab','index.html'),encoding='utf-8').read()
    pg.route("http://lab.test/**",lambda r: r.fulfill(body=html,content_type="text/html"))
    pg.goto("http://lab.test/"); pg.wait_for_timeout(1200)
    r=pg.evaluate("""(()=>{ var t0=performance.now(), M=buildWorldMap(12345), ms=performance.now()-t0, W=M.W, seen=worldMapReach(M);
      var zc={}, ocean=0, edgeLand=0; for(var i=0;i<W*M.H;i++){ var c=M.cls[i]; if(c===WM.OCEAN||c===WM.SHALLOW)ocean++; var x=i%W,y=(i/W)|0; if((x<8||y<8||x>=W-8||y>=M.H-8)&&!(c===WM.OCEAN||c===WM.SHALLOW))edgeLand++;
        var z=M.zone[i]; if(z!==255&&(c===WM.LAND||c===WM.ROAD||c===WM.BEACH||c===WM.PEAK)){ zc[z]=zc[z]||[0,0]; zc[z][0]++; if(seen[i])zc[z][1]++; } }
      var regionOk=WMAP_ZONES.every(function(z,zi){ return M.region[z.y*W+z.x]===z.r; });
      var gatesOnBorder=M.gates.every(function(g){ return M.cls[g.y*W+g.x]===WM.GATE; });
      var gateReg=M.gates.map(function(g){ var a=g.dir==='v'?[g.x,g.y-16]:[g.x-16,g.y], b=g.dir==='v'?[g.x,g.y+16]:[g.x+16,g.y]; return [M.region[a[1]*W+a[0]],M.region[b[1]*W+b[0]]]; });
      return {ms:Math.round(ms),W:W,H:M.H,oceanFrac:ocean/(W*M.H),edgeLand:edgeLand,zones:WMAP_ZONES.map(function(z,zi){ var c=zc[zi]||[0,0]; return [z.id,z.r,c[0],c[1]]; }),
        regionOk:regionOk,gatesOnBorder:gatesOnBorder,gateReg:gateReg,sites:M.sites.map(function(s){return [s.kind,s.section,!!seen[s.y*W+s.x]];}),ways:M.waystones.map(function(w){return [w.region,!!seen[w.y*W+w.x]];})}; })()""")
    check('Map is 1200x1200 (4x the old 600x600)', r['W']==1200 and r['H']==1200)
    check('Island, not a square: 25-50% sea, no land on the map edge', 0.25<r['oceanFrac']<0.5 and r['edgeLand']==0, (round(r['oceanFrac'],2),r['edgeLand']))
    ok_z=lambda z: z[2]>3000 and (z[3]>0.6*z[2] or z[0]=='floating_rocks')  # floating_rocks is mostly offshore islets by design
    check('40 zones, each with a real area (>3000 tiles, mostly reachable)', len(r['zones'])==40 and all(ok_z(z) for z in r['zones']), [z for z in r['zones'] if not ok_z(z)])
    check('Every zone heart lies in its own region', r['regionOk'])
    check('3 gates sit on the borders and join the right regions', r['gatesOnBorder'] and [sorted(g) for g in r['gateReg']]==[[1,2],[2,3],[3,4]], r['gateReg'])
    check('32 sites (5 towers/dungeons + camp + skyport + harbor per region), all reachable', len(r['sites'])==32 and all(s[2] for s in r['sites']), [s for s in r['sites'] if not s[2]])
    check('Waystones: village + 4 per region, all reachable', len(r['ways'])==17 and all(w[1] for w in r['ways']) and all(sum(1 for w in r['ways'] if w[0]==q)==4 for q in [1,2,3,4]))
    check('Map builds in under 3 s', r['ms']<3000, r['ms'])
    pg.click('.lab-tab[data-tab="map"]'); pg.wait_for_timeout(4000)
    check('World Map tab renders', pg.evaluate("!!document.getElementById('map-cv')&&LabMap.M!==null"))
    check('No JS errors', not errs, errs[:3])
    b.close()
print('%d/%d'%(sum(res),len(res)))
