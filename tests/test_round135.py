"""Round 135: the last five songs in; the stingers held back and compared with the effects in the Lab (Stingers or effects?).
python tests/test_round135.py   (after node build.mjs)"""
import sys, os, re; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
src = open(os.path.join(R, 'tools', 'audio', 'intake_audio.py')).read()
check('Audio intake leaves the stingers out unless asked (--stingers or --ids)', "'--stingers' not in args and not IDS" in src)
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/lab.artifact.html"); pg.wait_for_timeout(3000)
    pg.evaluate("LTODO.goTo('stingcmp','.sc-c',0)"); pg.wait_for_timeout(700)
    c = pg.evaluate("""(()=>{ var B=[...document.querySelectorAll('.sc-b')], keys=[].concat(...B.map(b=>b.dataset.p.split(','))), miss=keys.filter(k=>!VSTG[k]);
      return {cards:document.querySelectorAll('.sc-c').length, seg:document.querySelectorAll('.sc-c .wl-seg').length, btn:B.length, cut:document.querySelectorAll('.sc-cut').length, both:document.querySelectorAll('.sc-both').length, miss:miss, first:LAB_ACTIVE[1]}; })()""")
    check('Lab → Stingers or effects?: eight moments to pick (+ treasure to hear), every stinger whole, cut and with its effect, every sound in the asset store (%s)' % c, c['cards'] == 9 and c['seg'] == 8 and c['cut'] == 12 and c['both'] == 12 and not c['miss'] and bool(c['first']), c)   # round 137: answered, so a newer ask leads
    pg.evaluate("document.querySelector('.sc-c .wl-sg[data-v=\"both\"]').click()"); pg.wait_for_timeout(300)
    v = pg.evaluate("(LabApp.picks['stingcmp-spirit']||{}).verdict")
    check('A pick is kept (%s)' % v, v == 'both', v)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
