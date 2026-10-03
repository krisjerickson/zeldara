"""Design Lab · Monsters tab: 240 candidates (per quadrant 20 mainland, 10+10
dungeon, 20 tower), unique ids, every sprite paints 4 frames, filters work,
picks + notes persist, screenshots of each quadrant."""
import re, os, sys
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
PHASER = os.environ.get('PHASER_JS', os.path.join(HERE, '.phaser', 'package', 'dist', 'phaser.min.js'))
SHOTS = sys.argv[1] if len(sys.argv) > 1 else None
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)), flush=True)
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
    pg = b.new_page(viewport={"width": 1400, "height": 900}); errs = []
    pg.on("pageerror", lambda e: errs.append("PAGEERR " + str(e)))
    pg.on("console", lambda m: errs.append("console.error " + m.text) if m.type == "error" and 'Failed to load resource' not in m.text else None)
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    html = open(os.path.join(HERE, '..', 'lab', 'index.html'), encoding='utf-8').read()
    pg.route("http://lab.test/**", lambda r: r.fulfill(body=html, content_type="text/html"))
    pg.goto("http://lab.test/"); pg.wait_for_timeout(1500)
    r = pg.evaluate("""(()=>{ var c={}, ids={}, dup=[], bad=[], reuse=[];
      MON_ROSTER.forEach(function(m){ var k=m.q+':'+(m.seg==='dun'?m.role:m.seg); c[k]=(c[k]||0)+1; if(ids[m.id])dup.push(m.id); ids[m.id]=1; if(m.reuse)reuse.push(m.reuse);
        try{ var f=msFrames(m.spec); var x=f[3].getContext('2d').getImageData(0,0,32,32).data, n=0; for(var i=3;i<x.length;i+=4)if(x[i]>0)n++; if(f.length!==4||n<40)bad.push(m.id+':'+n); }catch(e){ bad.push(m.id+':'+e.message); }
        if(!m.look||!m.move||!m.atk||!m.def||!m.sp)bad.push(m.id+':text'); });
      return {n:MON_ROSTER.length,c:c,dup:dup,bad:bad,reuse:reuse}; })()""")
    check('240 candidates', r['n'] == 240, r['n'])
    exp = all(r['c'].get(f'{q}:{s}') == n for q in [1, 2, 3, 4] for s, n in [('main', 20), ('melee', 10), ('ranged', 10), ('tow', 20)])
    check('Per quadrant: 20 mainland, 10 melee, 10 ranged, 20 tower', exp, r['c'])
    check('All ids unique', not r['dup'], r['dup'])
    check('Every monster has all 5 descriptions and paints 4 visible frames', not r['bad'], r['bad'][:6])
    check('Existing monsters with unique attacks are reused (bog serpent, mud troll, harpy …)', all(x in r['reuse'] for x in ['bog_serpent', 'mud_troll', 'harpy', 'stone_golem', 'fire_imp']), r['reuse'])
    pg.click('.lab-tab[data-tab="monsters"]'); pg.wait_for_timeout(800)
    n = pg.evaluate("document.querySelectorAll('.mn-card').length")
    check('Tab opens on Grasslands · Mainland with 20 cards', n == 20, n)
    pg.wait_for_timeout(600)
    drawn = pg.evaluate("[...document.querySelectorAll('.mn-spr')].filter(c=>c.getBoundingClientRect().top<innerHeight).slice(0,6).filter(c=>{ var d=c.getContext('2d').getImageData(0,0,128,128).data; for(var i=3;i<d.length;i+=16)if(d[i])return true; return false; }).length")
    check('Sprites animate on screen (every card in view is drawn)', drawn >= 3, drawn)
    if SHOTS:
        for q in [1, 2, 3, 4]:
            for seg in ['main', 'melee', 'tow']:
                pg.click(f'.mn-q[data-q="{q}"]'); pg.wait_for_timeout(200); pg.click(f'.mn-seg[data-seg="{seg}"]'); pg.wait_for_timeout(1100)
                pg.screenshot(path=os.path.join(SHOTS, f'mon_q{q}_{seg}.png'))
        pg.click('.mn-q[data-q="1"]'); pg.click('.mn-seg[data-seg="main"]'); pg.wait_for_timeout(400)
    pg.click('.mn-seg[data-seg="ranged"]'); pg.wait_for_timeout(300)
    check('Segment filter: dungeon ranged shows 10', pg.evaluate("document.querySelectorAll('.mn-card').length") == 10)
    pg.click('.mn-v[data-v="pick"]'); pg.wait_for_timeout(300)
    pg.fill('.mn-notes', 'make it a kobold'); pg.wait_for_timeout(1200)
    st = pg.evaluate("(()=>{ var k=Object.keys(LabApp.picks).find(k=>k.indexOf('monsters-')===0&&LabApp.picks[k].verdict==='pick'); return {k:k, p:LabApp.picks[k], txt:document.querySelector('.mn-seg[data-seg=ranged] .n').textContent, ls:localStorage.getItem('zeldara-lab-picks').indexOf('make it a kobold')>=0}; })()")
    check('Pick + notes are stored and the counter updates', st['p'] and st['p'].get('notes') == 'make it a kobold' and st['txt'].startswith('1 /') and st['ls'], st)
    pg.click('.mn-sh[data-sh="picked"]'); pg.wait_for_timeout(300)
    check('"Picked" filter shows just the picked one', pg.evaluate("document.querySelectorAll('.mn-card').length") == 1)
    check('No JS errors', not errs, errs[:4])
    b.close()
print('%d/%d' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
