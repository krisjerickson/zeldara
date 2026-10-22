"""Round 72h — the Suno queue remade from Kris's own tracks and prompts (07zau-audio-cues.js ZAUD.suno; Lab → Music & sound): the house style
(Nordic folk meets dark electronic, a softer form for the gentle pieces), Suno's boxes per cue, some pieces with an elven woman's voice, deep
dwarven voices or a slow violin. Run: python tests/test_round72h.py"""
import os, sys, re, json
from playwright.sync_api import sync_playwright
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript") if os.path.exists(PH) else r.abort())
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        if os.path.isfile(f): r.fulfill(path=f)
        else: r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html?tabs=all"); pg.wait_for_timeout(2500)
    z = pg.evaluate("""(()=>{ var M=ZAUD.all().filter(function(c){ return c.kind==='music'; }), S=M.map(function(c){ return ZAUD.suno(c); }), by={elf:0,dwarf:0,violin:0};
      S.forEach(function(s){ if(s.vox)by[s.vox]++; }); var long=Math.max.apply(null,S.map(function(s){ return s.style.length; }));
      var voiced=S.filter(function(s){ return s.vox==='elf'||s.vox==='dwarf'; }), d=ZAUD.suno(M.find(function(c){ return c.id==='mu_dungeon'; })), v=ZAUD.suno(M.find(function(c){ return c.id==='mu_village_night'; }));
      return {n:M.length, by:by, long:long, titles:S.every(function(s,i){ return s.title===M[i].id; }), voicedOk:voiced.every(function(s){ return !s.instrumental&&s.lyrics.length>20&&!/\\b(the|and)\\b/i.test(s.lyrics.replace(/\\[[^\\]]*\\]/g,'')); }),
        dungeon:/electronic/.test(d.style)&&/deeper bass/.test(d.style)&&d.remix, softNight:/subtle electronic/.test(v.style)&&!/war drums/.test(v.style)}; })()""")
    check('Every cue has Suno boxes: Title = its id, Style (at most %d characters), the voiced ones with wordless lyrics and Instrumental off (%s)' % (z['long'], z['by']), z['titles'] and z['long'] <= 1000 and z['voicedOk'], z)
    check('Some — not all — pieces carry a voice or a solo: %d elven, %d dwarven, %d violin of %d' % (z['by']['elf'], z['by']['dwarf'], z['by']['violin'], z['n']), 4 <= z['by']['elf'] <= 10 and 3 <= z['by']['dwarf'] <= 6 and 4 <= z['by']['violin'] <= 8 and sum(z['by'].values()) < z['n'] / 2, z)
    check('The house style is Kris\'s: Nordic folk meets dark electronic, the dungeon with deeper bass from his remix; the gentle pieces softer (%s)' % {k: z[k] for k in ('dungeon', 'softNight')}, z['dungeon'] and z['softNight'], z)
    pg.evaluate("LTODO.goTo('audio','.au-grid',0)"); pg.wait_for_timeout(2500)
    t = pg.evaluate("({cards:document.querySelectorAll('canvas.br-cv[data-tab=\"audio\"]').length, boxes:document.querySelectorAll('textarea[data-au$=\"_s\"]').length, lyr:document.querySelectorAll('textarea[data-au$=\"_l\"]').length, vox:document.querySelectorAll('.au-vox').length, remix:document.querySelectorAll('.au-remix').length})")
    check('Lab → Music & sound: a card per cue with its Suno boxes (%s)' % t, t['boxes'] == z['n'] and t['lyr'] == z['by']['elf'] + z['by']['dwarf'] and t['vox'] == sum(z['by'].values()) and t['remix'] >= 5, t)
    pg.evaluate("document.querySelector('textarea[data-au=\"mu_village_night_s\"]').closest('.br-card,.br-cell,div').scrollIntoView()"); pg.wait_for_timeout(1200)
    pg.screenshot(path='/tmp/claude-0/aud/lab_suno.png')
    check('No Lab script errors', not errs, errs[:3])
    b.close()
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
