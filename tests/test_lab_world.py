"""Design Lab · World tab: 40 quadrant samples (10 per quadrant) build, are walkable,
each has a landmark and runes, lazy thumbnails render, quadrant chips filter, night toggle works."""
import re, os, sys
from playwright.sync_api import sync_playwright
HERE=os.path.dirname(os.path.abspath(__file__))
PHASER=os.environ.get('PHASER_JS', os.path.join(HERE,'.phaser','package','dist','phaser.min.js'))
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"])
    pg=b.new_page(viewport={"width":1400,"height":860}); errs=[]
    pg.on("pageerror",lambda e: errs.append("PAGEERR "+str(e)))
    pg.on("console",lambda m: errs.append("console.error "+m.text) if m.type=="error" and 'Failed to load resource' not in m.text else None)
    pg.route(re.compile(r".*cdnjs.*phaser.*"),lambda r: r.fulfill(path=PHASER,content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"),lambda r: r.abort())
    html=open(os.path.join(HERE,'..','lab','index.html'),encoding='utf-8').read()
    pg.route("http://lab.test/**",lambda r: r.fulfill(body=html,content_type="text/html"))
    pg.goto("http://lab.test/"); pg.wait_for_timeout(1500)
    audit=pg.evaluate("""(()=>{ var t=LAB_TABS.find(t=>t.id==='world'); return t.designs.map(function(d){ var t0=performance.now(), m=d.build(d.seed||7), ms=performance.now()-t0;
      var sx=Math.floor(m.spawn.x/LT), sy=Math.floor(m.spawn.y/LT), open=0; for(var k=0;k<m.w*m.h;k++)if(!m.solid[k])open++;
      return {g:d.group,id:d.id,ms:Math.round(ms),open:open,spawnOk:!mapSolid(m,sx,sy),labels:m.labels.length,runes:m.stats.runes,lights:m.lights.length}; }); })()""")
    by={}
    for a in audit: by.setdefault(a['g'],[]).append(a)
    check('40 designs, 10 per quadrant', len(audit)==40 and all(len(by.get(q,[]))==10 for q in [1,2,3,4]), {q:len(v) for q,v in by.items()})
    check('All 40 unique ids', len(set(a['id'] for a in audit))==40)
    bad=[a for a in audit if not a['spawnOk'] or a['open']<250]
    check('Every design has a walkable spawn and a usable area', not bad, bad[:3])
    check('Every design has a landmark to inspect', all(a['labels']>=1 for a in audit), [a['id'] for a in audit if a['labels']<1])
    check('Every design has runes (medium runic theme)', all(a['runes']>=1 for a in audit), [a['id'] for a in audit if a['runes']<1])
    check('Light budget per map stays under 260', all(a['lights']<260 for a in audit), max(a['lights'] for a in audit))
    check('Each design builds in under 2 s', all(a['ms']<2000 for a in audit), max(a['ms'] for a in audit))
    pg.click('.lab-tab[data-tab="world"]'); pg.wait_for_timeout(300)
    check('Quadrant chips: 4, showing 10 cards', pg.evaluate("document.querySelectorAll('.lab-grp').length")==4 and pg.evaluate("document.querySelectorAll('.lab-card').length")==10)
    ok=False
    for _ in range(60):
        if pg.evaluate("[...document.querySelectorAll('.lab-card .thumb')].every(t=>t.style.backgroundImage.indexOf('data:image')>=0)"): ok=True; break
        pg.wait_for_timeout(250)
    check('Lazy thumbnails fill in', ok)
    pg.click('.lab-grp[data-grp="3"]'); pg.wait_for_timeout(200)
    check('Highlands chip shows the Highlands designs', 'Runic Mesas' in pg.evaluate("document.getElementById('lab-grid').textContent"))
    pg.evaluate("LabApp.open(LAB_TABS.find(t=>t.id==='world').designs.findIndex(d=>d.id==='runic_mesas'))"); pg.wait_for_timeout(2500)
    y0=pg.evaluate("LabApp.game.scene.getScene('LabWalk').hero.y")
    pg.keyboard.down('w'); pg.wait_for_timeout(600); pg.keyboard.up('w')
    y1=pg.evaluate("LabApp.game.scene.getScene('LabWalk').hero.y")
    check('Walk scene runs, hero moves', y1<y0, (y0,y1))
    pg.keyboard.press('n'); pg.wait_for_timeout(300)
    check('N toggles night', pg.evaluate("LabApp.game.scene.getScene('LabWalk').darkRT.visible===true"))
    pg.keyboard.press(']'); pg.wait_for_timeout(2200)
    check('] goes to the next design in the same quadrant', pg.evaluate("LAB_TABS.find(t=>t.id==='world').designs[LabApp.idx].group")==3)
    errs=[e for e in errs]
    check('No JS errors', not errs, errs[:3])
    b.close()
print('%d/%d'%(sum(res),len(res)))
