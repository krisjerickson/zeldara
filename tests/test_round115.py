"""Round 115: the seasons (Kris ✓ holistic, no winter mantle) — the engine and wave S1's requests.
  The order: a mild spring as you set out (the Grasslands) → summer (Wetlands) → autumn (Highlands) → a mild winter (Ashlands) → Freya's spring.
python tests/test_round115.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
with game(painted=True) as g:
    g.wait(4000)
    a = g.js("""(()=>{ var o=function(u,h){ return ZSEASON.of({unlockedSections:u,spiritsHome:h}); }; return [o([1]),o([1,2]),o([1,2,3]),o([1,2,3,4]),o([1,2,3,4],1)]; })()""")
    check("The year follows the realms: spring, summer, autumn, winter, then Freya's spring (%s)" % a, a == ['sp', 'su', 'au', 'wi', 'bl'], a)
    b = g.js("""(()=>{ var k=WK_REG.list.find(function(x){ return x.id==='grass'; }); var s0=ZSEASON.cur; ZSEASON.set('au'); var au=k._a.slice(); ZSEASON.set('wi'); var wi=k._a.slice(); ZSEASON.set('su'); var su=k._a.slice(); ZSEASON.set(s0);
      var hue=function(c){ return c[0]-c[2]; }; return {a0:k._a0, au:au, wi:wi, su:su, rock:WK_REG.list.find(function(x){ return x.id==='rock'; })._a0===undefined}; })()""")
    check("The grass takes the season's colour (autumn warmer, winter paler); summer is as painted; rock never changes (%s)" % b,
          b['su'] == b['a0'] and b['au'][0] > b['a0'][0] and b['au'] != b['a0'] and (max(b['wi'])-min(b['wi'])) < (max(b['a0'])-min(b['a0'])) and b['rock'], b)
    c = g.js("""(()=>{ var s0=ZSEASON.cur; ZSEASON.set('au'); var t=ZSEASON.item('tr_round_a'), r=ZSEASON.item('rk_rock'); ZSEASON.set('su'); var s=ZSEASON.item('tr_round_a'); ZSEASON.set(s0); return {tree:t, rock:r, summer:s}; })()""")
    check('Trees are drawn in their season (tinted until their autumn painting is in); rocks and summer are left alone (%s)' % c, c['tree'] and c['tree'].get('f') and c['rock'] is None and c['summer'] is None, c)
    d = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.unlockedSections=[1]; ps.spiritsHome=0; ZSEASON.tick(); var start=ZSEASON.cur; ps.unlockedSections=[1,2,3]; ZSEASON.tick();
      var ban=document.getElementById('zq-banner'), badge=document.getElementById('zseason'); return {start:start, now:ZSEASON.cur, seen:ps.seasonsSeen, ban:ban&&ban.textContent, badge:badge&&badge.textContent, rn:ZSEASON._rn, air:!!ws._zsAir, cfg:ZWP.cfg().season}; })()""" % WS)
    check('Opening the Highlands turns the year to autumn: a banner, the mark by the little map, the world repainted, leaves in the air, and the workers told (%s)' % d,
          d['start'] == 'sp' and d['now'] == 'au' and 'au' in d['seen'] and 'Autumn' in (d['ban'] or '') and 'Autumn' in (d['badge'] or '') and d['rn'] > 0 and d['air'] and d['cfg'] == 'au', d)
    def settle(n=60):
        for i in range(n):
            if g.js("(()=>{ var W=%s._wr; return W.jobs.size===0&&!(W.ready||[]).length; })()" % WS): return True
            g.wait(1000)
        return False
    def shot(name):
        settle(); g.wait(800); g.page.screenshot(path='/tmp/claude-0/season_%s.png' % name)
        from PIL import Image
        im = Image.open('/tmp/claude-0/season_%s.png' % name).convert('RGB').crop((0, 90, 520, 260)).resize((52, 17)); px = list(im.getdata())
        return [round(sum(p[i] for p in px) / len(px)) for i in range(3)]
    cols = {'au': shot('au')}
    for name, u in (('wi', [1,2,3,4]), ('sp', [1]), ('su', [1,2])):
        g.js("""(()=>{ var ps=%s.playerState; ps.unlockedSections=%s; ZSEASON.tick(); })()""" % (WS, u)); cols[name] = shot(name)
    check('On screen: the world repaints in each season — autumn warmest, winter palest, summer greenest (%s)' % cols,
          cols['au'][0] - cols['au'][1] > cols['su'][0] - cols['su'][1] and cols['su'][1] - cols['su'][0] > cols['wi'][1] - cols['wi'][0], cols)
    e = g.js("""(()=>{ var L=ZLES.byId('season'); return {lesson:!!L, who:L&&L[6], cond:ZLES.cond('season',%s,{seasonsSeen:['sp','su']})}; })()""" % WS)
    check('Elder Runa teaches the turning of the year the first time it turns (%s)' % e, e['lesson'] and e['who'] == 'vf_elder' and e['cond'], e)
    f = g.js("""(()=>{ var S=ZSCN.SHEETS.filter(function(s){ return s.wave===115; }), sea=S.filter(function(s){ return s.season; }); var b=ZSCN.body(sea[0]);
      return {n:S.length, seasonal:sea.length, refs:sea.every(function(s){ return s.refs.length===1&&s.refs[0]===s.src&&s.noStyle; }), ids:sea[0].items[0][0], body:/SEASONAL REPAINT/.test(b)&&/NO snow cover/.test(ZSCN.body(sea.find(function(s){ return s.season==='wi'; })))}; })()""")
    check('Wave S1: 36 seasonal repaints (12 painted sheets × spring, autumn, winter, each with its original as the reference; winter with no snow cover), the air and the season icons (%s)' % f,
          f['n'] == 38 and f['seasonal'] == 36 and f['refs'] and f['ids'].endswith('_sp') and f['body'], f)
    errs = [x for x in g.errs if 'favicon' not in x]
    check('No page errors', errs == [], errs[:4])
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
