"""Round 138: the new names in the game (realms, village, lands, sites), monsters still choosing their land by its old words, the fairies' tales
told in order once their two are free, the Flow folders' plan and prompts, the calm music prompts, the three new Lab parts (Flow, the music's
pace, the banners with clips) and the cut-scene frames rebuilt.   python tests/test_round138.py   (after node build.mjs)"""
import sys, os, re, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
sys.path.insert(0, os.path.join(R, 'tools', 'video')); sys.argv = ['x']; import flow
P = flow.plan(); folders = {(s['folder'], s['n']) for p in P for sh in p['versions'].values() for s in sh}
pr = flow.prompt(next(p for p in P if p['id'] == 'escape')['sc'], next(p for p in P if p['id'] == 'escape')['sc']['beats'][2], 'zeldara')
check('Flow: one folder per shot for all 34 cut-scenes (%d shots); a prompt says what happens, the end, the camera; the Lodestar stays in hand' % len(folders), len(P) == 34 and len(folders) > 300 and 'It ends on:' in pr and 'Camera:' in pr and 'Lodestar' in pr, pr)
Z = json.loads(open(os.path.join(R, 'src', 'js', '21w4-0-npc-lines.js'), encoding='utf-8').read().split('var ZNPC=', 1)[1].rstrip().rstrip(';'))
check('The Gildenmark fairies: 40 lines each, a ten-part tale', all(sum(len(v) for v in Z[k]['lines'].values()) >= 40 and len(Z[k]['lines'].get('tale', [])) == 10 for k in ('primrose', 'bramble', 'clover', 'linnet', 'sorrel')))
src = open(os.path.join(R, 'src', 'js', '07zt6-storyboards.js'), encoding='utf-8').read()
check('Cut-scene lines use the new realm names and the new timeline', 'Three years after the Stone-Fall' in src and 'Wetlands' not in src and 'Fernheim' in src)
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    n = g.js("""(()=>{ var ws=%s; return {sec:SECTION_NAMES, reg:WM_REGION_NAMES[0], ws:ws.wd.waystones.map(w=>w.name).slice(0,4), z:_wmZoneName('glow_mangroves'), was:_wmZoneWas('glow_mangroves'), riv:(ws.wd.sites||[]).some(s=>/Rivendell|Twilight Hall/.test(s.name||'')), dusk:(ws.wd.sites||[]).some(s=>s.name==='The Dusk Hall'), mt:MAGE_TOWERS.map(m=>m.name+'|'+m.bossName).join(';')}; })()""" % WS)
    check('The new names in the game: Gildenmark … Cinderheim, The Green, Mirrowby, the lands, the sites, the masters (%s)' % json.dumps(n)[:300],
          n['sec']['1'] == 'Gildenmark' and n['sec']['4'] == 'Cinderheim' and n['sec']['0'] == 'The Green' and 'Mirrowby' in n['reg'] and n['z'] == 'The Glowroots' and n['was'] == 'Bioluminescent Mangroves' and not n['riv'] and n['dusk'] and 'Stormspike' in n['mt'] and 'Vargrim' in n['mt'], n)
    t = g.js("""(()=>{ var ws=%s, ps=ws.playerState; var k='primrose', n=ZNPC[k]; var S=ZSPIRIT.shrines(ws); ps.spiritsFreed=S.filter(s=>(n.spirits||[]).indexOf(s.spirit)>=0).map(s=>s.id); ps.npcTale={}; ps.npcTaleTurn={};
        var got=[]; for(var i=0;i<6;i++)got.push(ZNPCT.line(ws,k)); var tl=got.filter(x=>n.lines.tale.indexOf(x)>=0); return {n:tl.length, first:tl[0]===n.lines.tale[0], second:tl[1]===n.lines.tale[1]}; })()""" % WS)
    check('A fairy tells her tale in order, every other talk, once her two are free (%s)' % t, t['n'] == 3 and t['first'] and t['second'], t)
    c = g.js("(()=>{ var c=ZAUD.all().find(x=>x.id==='mu_wet_night'); var s=c?ZAUD.suno(c):null; return s?{half:/half-time/.test(s.style), drive:/driving electronic/.test(s.style), ex:/double-time/.test(s.exclude)}:null; })()")
    check('Calm songs are asked for with a half-time ending, no driving drums (%s)' % c, c and c['half'] and not c['drive'] and c['ex'], c)
    E = [x for x in g.errs if 'Failed to load resource' not in x and 'decode audio' not in x]
    check('No game errors', not E, E[:3])
with sync_playwright() as pw:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/lab.artifact.html"); pg.wait_for_timeout(3000)
    pg.evaluate("LTODO.goTo('flow138','.fl-i',0)"); pg.wait_for_timeout(500)
    a = pg.evaluate("({items:document.querySelectorAll('.fl-i').length, img:[...document.querySelectorAll('.fl-img')].filter(i=>/_blob/.test(i.getAttribute('src'))).length, tx:document.querySelectorAll('.fl-tx tr').length})")
    check('Lab → Flow: 32 picture problems with their pictures, 24 lines (%s)' % a, a['items'] == 32 and a['img'] == 32 and a['tx'] == 25, a)
    pg.evaluate("LTODO.goTo('musicpace','.mp-t',0)"); pg.wait_for_timeout(500)
    m = pg.evaluate("({rows:document.querySelectorAll('.mp-t tr').length-1, play:document.querySelectorAll('.mp-b').length, fl:document.querySelectorAll('.mp-fl').length})")
    check('Lab → Music: the pace: every song, the 18 flagged with three players each (%s)' % m, m['rows'] == 41 and m['fl'] == 18 and m['play'] == 54, m)
    pg.evaluate("LTODO.goTo('worldlook5','.w5-ban',0)"); pg.wait_for_timeout(500)
    w = pg.evaluate("(()=>{ var n=document.querySelectorAll('.w5-b .wl-n').length; document.querySelector('.w5-play[data-i=\"3\"]').click(); var v=document.querySelector('#w5-view video'); var r={notes:n, vid:!!(v&&/_blob/.test(v.getAttribute('src'))), req:document.querySelectorAll('.w5-rq tr').length}; document.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight'})); r.next=/^4 /.test(document.querySelector('#w5-view .w5-vbar b').textContent); document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'})); r.closed=!document.getElementById('w5-view'); return r; })()")
    check('Lab → World 5: a note box per banner, ▶ its clip full screen, ← → and Esc, the new requests listed (%s)' % w, w['notes'] == 20 and w['vid'] and w['next'] and w['closed'] and w['req'] == 9, w)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
