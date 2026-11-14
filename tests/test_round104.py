"""Round 104: the remakes' words (sprites/requests/sfx_remake.json → tools/audio/audio6.ps1 → <id>.x1-x5), shown in the Lab, and the two new songs.
python tests/test_round104.py   (after node build.mjs)"""
import sys, os, re, json, subprocess
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]))
J = json.load(open(os.path.join(R, 'sprites', 'requests', 'sfx_remake.json'), encoding='utf-8'))
check('Remake list: %d effects, five new words each' % len(J['items']), J['items'] and all(len(v['words']) == 5 for v in J['items'].values()), J['items'].keys())
out = subprocess.run(['node', os.path.join(R, 'tools', 'audio', 'sfx.mjs'), '--set', 'remake', '--dry-run'], capture_output=True, text=True, cwd=R).stdout
check('audio6.ps1 sends them (dry run: %d to make)' % (5 * len(J['items'])), ('%d to make' % (5 * len(J['items']))) in out, out[:200])
A = json.load(open(os.path.join(R, 'assets', 'audio', 'index.json')))
check('New songs in the game: mu_home (only the new one), mu_village_night, mu_ash_day (%s, %s, %s)' % (A['mu_home']['files'], A['mu_village_night']['files'][0]['secs'], A['mu_ash_day']['files'][0]['secs']), len(A['mu_home']['files']) == 1 and A['mu_home']['files'][0]['secs'] > 230 and A['mu_village_night']['files'][0]['secs'] > 280 and 235 < A['mu_ash_day']['files'][0]['secs'] < 245)
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html?tabs=all"); pg.wait_for_timeout(2500)
    pg.evaluate("LTODO.goTo('sfxpick','#s103',0)"); pg.wait_for_timeout(1500)
    r = pg.evaluate("({re:[].slice.call(document.querySelectorAll('.s103-grp[data-g=\"re\"] .s103-r')).map(t=>t.dataset.id), w:document.querySelectorAll('.s103-grp[data-g=\"re\"] .s104-w li').length, x:!!document.querySelector('.s103-k .s89-wait')})")
    check('Lab → Sound effects → Remake all: the three, with their 15 new words (%s)' % r, sorted(r['re']) == sorted(J['items'].keys()) and r['w'] == 15, r)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
