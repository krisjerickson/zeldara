"""Round 79 — story cut-scenes in pictures (07zt6-storyboards.js, Lab -> Story cut-scenes, round79.ps1): every cut-scene told in 4-12
frames with a line each, both hero versions, Kris's epic touch in every request. Run: python tests/test_round79.py"""
import os, sys, re, json
from playwright.sync_api import sync_playwright
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
import json
J = json.load(open(os.path.join(R, 'sprites', 'requests', 'scenery.json'), encoding='utf-8'))
Q = [q for q in J['requests'] if q['id'].startswith('sc_sb_')]
hero = [q for q in Q if q['id'].endswith(('_m', '_f'))]
check('%d story pictures requested in waves 85-89, every one a whole 1536x1024 painting' % len(Q), len(Q) > 300 and {q['wave'] for q in Q} == {85, 86, 87, 88, 89} and all(q['size'] == '1536x1024' for q in Q), len(Q))
check('Frames with the twin you play come in both versions, each with its own hero model sheet (%d)' % len(hero), all(('hero_m.model' if q['id'].endswith('_m') else 'hero_f.model') in q['refs'] for q in hero) and len([q for q in hero if q['id'].endswith('_m')]) == len([q for q in hero if q['id'].endswith('_f')]))
bad = [q['id'] for q in Q if any(t in q['body'] for t in ('{H}', '{O}', '{T}', '{K}')) or 'aurora' not in q['body'] or 'valknut' not in q['body'] or 'exactly how the named characters look' not in q['body']]
check('Every request names its characters, keeps the epic touch (aurora, neon runes) and the rules (no valknut)', not bad, bad[:5])
check('No more than 10 reference pictures on any request', max(len(q['refs']) for q in Q) <= 10, max(len(q['refs']) for q in Q))
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
    pg.evaluate("LTODO.goTo('storyb','.br-grid',0)"); pg.wait_for_timeout(3000)
    t = pg.evaluate("""(()=>({cards:document.querySelectorAll('canvas.br-cv[data-tab="storyb"]').length, rows:document.querySelectorAll('.sbf').length, prompts:document.querySelectorAll('textarea[data-au^="sbp_"]').length, montages:document.querySelectorAll('textarea[data-au^="sbm_"]').length, canv:document.querySelectorAll('canvas.sbf-cv').length, scenes:ZSB.SCENES.length,
      beats:ZSB.SCENES.reduce(function(a,s){ return a+s.beats.length; },0), sizes:ZSB.SCENES.map(function(s){ return s.beats.length; }), caps:ZSB.SCENES.every(function(s){ return s.beats.every(function(b){ return b.cap&&b.cap.length>3; }); }),
      todo:LTODO.open().map(function(o){ return o.id; }).indexOf('storyb')>=0, builders:['bram','mira','dunn','vela'].every(function(id){ return ZSB.SCENES.some(function(s){ return s.id===id&&s.beats.length>=9; }); }),
      boss:['surt1','surt2','surt3','surt4','surt5','surt6','sol1','sol2','sol3'].every(function(id){ return ZSB.SCENES.some(function(s){ return s.id===id; }); })}))()""")
    check('Lab -> Story cut-scenes: %d cut-scenes, %d frames — each scene a card, its montage video prompt(s), and every frame with its picture, line and picture prompt(s)' % (t['scenes'], t['beats']), t['cards'] == t['scenes'] and t['rows'] == t['beats'] and t['canv'] == t['beats'] and t['prompts'] == 368 and t['montages'] == 59 and t['caps'] and min(t['sizes']) >= 4 and max(t['sizes']) <= 12, t)
    check('The builders (all four) and every boss form are there; "read the story lines" waits in the picks', t['builders'] and t['boss'] and t['todo'], t)
    sp = pg.evaluate("(()=>{ var s=ZSB.SCENES.find(function(x){ return x.id==='spirit'; }); return s.beats.map(function(b){ return b.title; }); })()")
    check('The first spirit: toiling, you come, its struggle, the rune, your hand and blue eyes, the chains break, lines beneath you, home to the village (%s)' % ' / '.join(sp), len(sp) == 12 and 'Your hand on the stone' in sp and 'The chains break' in sp and 'Lines beneath your feet' in sp and 'Toward the village' in sp)
    v = pg.evaluate("""(()=>{ var z=document.querySelector('.sbv-btn[data-v=zeldara]'); z.click(); var a=document.body.classList.contains('sb-zeldara'), vis=Array.from(document.querySelectorAll('textarea[data-au^="sbp_sb_spirit_05"]')).filter(function(t){ return t.closest('details').offsetParent!==null; }).map(function(t){ return t.dataset.au; });
      document.querySelector('canvas.sbf-cv[data-sc="spirit"][data-i="4"]').click(); var big=!!document.querySelector('.sbf-big canvas'), cap=(document.querySelector('.sbf-bigcap')||{}).textContent; document.querySelector('.sbf-big').click();
      document.querySelector('.sbv-btn[data-v=zeldor]').click(); return {zeldara:a, vis:vis, big:big, cap:cap, back:!document.body.classList.contains('sb-zeldara')}; })()""")
    check('The Zeldor / Zeldara switch shows that version\'s prompts; a frame opens big with its line (%s)' % v['cap'], v['zeldara'] and v['vis'] == ['sbp_sb_spirit_05_f'] and v['big'] and 'eyes burned' in (v['cap'] or '') and v['back'], v)
    check('No Lab errors', not errs, errs[:3])
    b.close()
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
