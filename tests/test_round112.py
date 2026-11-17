"""Round 112: the side quest you chose is a yellow mark, the Saga a runic teal one, and no distance number; Elder Runa's step no longer
  holds the arrow on the Green; the first ten shot series are ordered (one picture per shot, cut from its story frame).
  Kris: "whatever side quest you choose is a yellow indicator on the map. it seemed to be stuck at the town center" — "let's have the main
  quest be a runic teal indicator on the map as well, but let's get rid of the proximity counter" — "turn each current image into a
  series of 3-10 different images".
python tests/test_round112.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
with game(painted=True) as g:
    g.wait(3000)
    a = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.walk='done'; ps.tracked=null; var T=ZOSW.tq(ps); T.net=1; ps.tracked='tq:net';
      var s=ZJOUR.sideT(ws), m=ZJOUR.mainT(ws), t=ZJOUR.target(ws); return {side:s&&s.t, main:m&&m.t, target:t&&t.t}; })()""" % WS)
    check('The side quest you chose and the Saga each have their own mark (%s)' % a, a['side'] and 'net' in a['side'] and a['main'] and a['main'] != a['side'] and a['target'] == a['side'], a)
    b = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ZWALK.on=true; ps.walk='runa'; ps.tracked='tq:net'; var s=ZJOUR.sideT(ws); ps.tracked=null; var s2=ZJOUR.sideT(ws); return {chosen:s&&s.t, none:s2&&s2.t}; })()""" % WS)
    check("Elder Runa's step no longer outranks the quest you chose (it stays only while nothing is chosen) (%s)" % b, 'net' in (b['chosen'] or '') and 'Runa' in (b['none'] or ''), b)
    c = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.walk='runa'; ZWALK._t=Date.now(); ws.player.x=(CENTER_X+48)*TILE; ws.player.y=CENTER_Y*TILE; ZWALK.tick(); var w=ps.walk; ZWALK.on=false; return {walk:w}; })()""" % WS)
    check('Walking out of the village ends Runa\'s step (her lesson comes as a note) (%s)' % c, c['walk'] == 'done', c)
    d = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.walk='done'; ps.tracked='tq:net'; ws.player.x=CENTER_X*TILE; ws.player.y=CENTER_Y*TILE; var cv=document.getElementById('minimap-hud-canvas'); if(!cv)return null; var ctx=cv.getContext('2d'), ft=ctx.fillText, n=0, cols=[], fl=ctx.fill;
      ctx.fillText=function(){ n++; return ft.apply(this,arguments); }; ctx.fill=function(){ cols.push(this.fillStyle); return fl.apply(this,arguments); };
      try{ ZJOUR.arrow(ws); }finally{ ctx.fillText=ft; ctx.fill=fl; } return {text:n, fills:cols}; })()""" % WS)
    check('The little map shows a teal Saga mark and a yellow side-quest arrow, and no distance number (%s)' % d, d and d['text'] == 0 and '#3ff0d8' in d['fills'] and '#ffd84a' in d['fills'], d)
    e = g.js("""(()=>{ var ws=%s; openWorldMap(); WMAP.zoom=1; renderMinimap(ws.wd,null,null,null,0,null,true); return 1; })()""" % WS)
    g.wait(1200)
    f = g.js("""(()=>{ var m=document.getElementById('wm-main'), c=document.getElementById('wm-cur'), q=document.getElementById('wm-quests'); return {main:m&&m.style.display!=='none', mlab:m&&m.textContent, cur:c&&c.style.display!=='none', clab:c&&c.textContent, tiles:q?/ tiles /.test(q.innerHTML):null, legend:!!document.querySelector('.wmq-marks')}; })()""")
    check('The big map: a teal rune pin for the Saga, the yellow star for your side quest, a legend, and no tile counts (%s)' % f, f['main'] and 'Saga' in (f['mlab'] or '') and f['cur'] and 'net' in (f['clab'] or '') and f['tiles'] is False and f['legend'], f)
    g.js("closeModal&&closeModal('map')")
    h = g.js("""(()=>{ ZJOUR.line(); var el=document.getElementById('zpath'); return el&&el.innerHTML; })()""")
    check('Under the little map: the Saga in teal and your side quest in yellow (%s)' % (h or '')[:160], h and 'zp-m' in h and 'zp-s' in h, h)
    k = g.js("""(()=>{ var r=ZSS.SHEETS[0]; return {top:ZSS.TOP.length, shots:ZSS.SHEETS.length, hero:ZSS.SHEETS.filter(s=>/_m$/.test(s.id)).length, zeldara:ZSS.SHEETS.filter(s=>/_f$/.test(s.id)).length, first:r.refs[0], id:r.id,
      allParent:ZSS.SHEETS.every(s=>/^sc_sb_/.test(s.refs[0])), heroRef:ZSS.SHEETS.filter(s=>/_m$/.test(s.id)).every(s=>s.refs.indexOf('hero_m.model')>=0), sizes:ZSS.TOP.every(S=>S.shots.length>=2&&S.shots.length<=3), kept:ZSS.TOP.map(S=>S.shots.map(x=>x.k).join('')).join(' '),
      inScn:ZSCN.SHEETS.filter(s=>/^sc_ss_/.test(s.id)&&s.wave===112).length, auto:ZSS.AUTO.length, storm:ZSS.TOP.some(S=>S.scene==='opening'&&S.n===5), body:/FIRST reference/.test(ZSCN.body(ZSS.SHEETS[0])), plan:ZSS.plan(ZSB.SCENES[0],ZSB.SCENES[0].beats[0]).count}; })()""")
    check('Round 112d: the nine series trimmed to Kris\'s picks (three shots, the storm cut), each shot cut from its story frame, Zeldor only for now (%s)' % k,
          k['top'] == 9 and k['shots'] == 26 and k['zeldara'] == 0 and k['hero'] == 10 and k['allParent'] and k['heroRef'] and k['sizes'] and k['inScn'] == 26 and not k['storm'] and k['kept'].startswith('146 346 235 15') and k['body'] and k['plan'] >= 3, k)

# the Lab: the Villagers tab and the Shot series tab
import re
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
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
    pg.evaluate("LTODO.goTo('npcs','.np-tab',0)"); pg.wait_for_timeout(1500)
    n = pg.evaluate("""({cards:document.querySelectorAll('.np-card').length, top20:[].slice.call(document.querySelectorAll('.np-card')).slice(0,20).every(c=>c.querySelectorAll('.np-row[data-row*="_i"]').length===3),
      rest:[].slice.call(document.querySelectorAll('.np-card')).slice(20).every(c=>c.querySelectorAll('.np-row[data-row*="_i"]').length===2), side:[].slice.call(document.querySelectorAll('.np-card')).every(c=>c.querySelectorAll('.np-row[data-row*="_q"]').length>=2),
      arcs:document.querySelectorAll('.np-row[data-row$="_arc"]').length, riddles:document.querySelectorAll('.np-rid').length, meets:document.querySelector('#np-oswin .np-m').textContent, dramas:document.querySelectorAll('.np-row[data-row^="npcs-d_"]').length})""")
    check('Lab → Villagers: every NPC ranked with its meetings, 3 ideas for the top 20, 2 for the rest, 2+ side quests each, arcs for the top 6, riddles, dramas (%s)' % n,
          n['cards'] >= 40 and n['top20'] and n['rest'] and n['side'] and n['arcs'] == 6 and n['riddles'] >= 15 and '62' in n['meets'] and n['dramas'] >= 6, n)
    op = pg.evaluate("""(()=>{ var d=document.getElementById('np-pell'); d.open=true; d.dispatchEvent(new Event('toggle')); d.querySelector('.np-seg .np-sg').click(); LabApp.renderGrid(true); var d2=document.getElementById('np-pell'); var r=d2&&d2.open; d2.querySelector('.np-seg .np-sg').click(); return r; })()""")
    check('Lab → Villagers: a pick no longer closes the villager you are on (the tab redraws with it still open) (%s)' % op, op is True, op)
    pg.screenshot(path='/tmp/claude-0/lab_npcs.png')
    pg.evaluate("LTODO.goTo('series','.ss-tops',0)"); pg.wait_for_timeout(1500)
    s2 = pg.evaluate("""({tops:document.querySelectorAll('.ss-top').length, scenes:document.querySelectorAll('.ss-sc').length, frames:document.querySelectorAll('.ss-f').length, starred:document.querySelectorAll('.ss-f.top').length, thumbs:[].slice.call(document.querySelectorAll('.ss-th')).filter(x=>x.style.backgroundImage).length})""")
    check('Lab → Shot series: the nine with their three shots, and all 34 cut-scenes broken into their 259 frames (%s)' % s2, s2['tops'] == 9 and s2['scenes'] == 34 and s2['frames'] == 259 and s2['starred'] == 9, s2)
    pg.evaluate("document.querySelector('.ss-play').click()"); pg.wait_for_timeout(2600)
    pg.locator('.ss-top').first.screenshot(path='/tmp/claude-0/lab_series_top.png')
    pg.screenshot(path='/tmp/claude-0/lab_series.png')
    pg.evaluate("document.querySelectorAll('.ss-full')[0].click()"); pg.wait_for_timeout(2500)
    fs = pg.evaluate("""(()=>{ var el=document.getElementById('ss-full'), v=el&&el.querySelector('.ssf-view'); return {shown:el&&el.style.display, w:v&&v.clientWidth, words:el&&el.querySelectorAll('.ssf-words span').length, pic:v&&!!v.querySelector('.ss-pic').style.backgroundImage}; })()""")
    pg.keyboard.press('Escape'); pg.wait_for_timeout(300); gone = pg.evaluate("document.getElementById('ss-full').style.display")
    check('Shot series: full screen as in the game (black bars, the picture, its words below, phrase by phrase; Esc closes) (%s, %s)' % (fs, gone), fs['shown'] == 'block' and fs['w'] > 900 and fs['words'] >= 1 and fs['pic'] and gone == 'none', (fs, gone))
    check('No Lab script errors', not errs, errs[:3])
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
