"""Round 54 — Kris's picks in: One Great Z is the wordmark; the eight bindstones he picked stand at the shrines (mixed through each realm); forty unique
spirits (one per bindstone, from his Ancestor / Lantern folk / Aurora-robed picks) ordered as wave 55 and shown in the Lab; groupings round two and
three ways for them to move, to pick in the Lab.
Run: python tests/test_round54.py"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
ROOT = os.path.join(os.path.dirname(__file__), '..')
lab = open(os.path.join(ROOT, 'lab', 'index.html'), encoding='utf8').read()

with game(new=True, painted=True) as g:
    g.wait(4000)
    r = g.js("(()=>({wm:ZBrand.WORDMARK, name:ZBrand.wordById(ZBrand.WORDMARK).name}))()")
    check('The title wears his pick, One Great Z (%s)' % r['name'], r['wm'] == 'qz_shared', r)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), S=ZSPIRIT.shrines(ws), Z=_scn(), per={}, kinds=new Set(), miss=[];
      S.forEach(function(s){ var k=ZSPIRIT.stoneOf(s); kinds.add(k); (per[s.q]=per[s.q]||new Set()).add(k); [false,true].forEach(function(f){ var id=ZSPIRIT.stoneId(s,f); if(!Z.has(id))miss.push(id); }); });
      return {kinds:Array.from(kinds), per:Object.keys(per).map(function(q){ return per[q].size; }), miss:miss}; })()""")
    check('The eight bindstones he picked stand at the shrines (%s), at least five kinds in every realm (%s), all painted, bound and freed' % (', '.join(r['kinds']), r['per']), len(r['kinds']) == 8 and min(r['per']) >= 5 and not r['miss'], r)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), S=ZSPIRIT.shrines(ws), by={}; ZSPIRIT40.forEach(function(x){ by[x[1]]=x; });
      var bad=S.filter(function(s){ var x=by[s.spirit]; return !x||x[3]!==s.q||('a '+x[2].replace(/^an? /,''))!=='a '+s.trade.replace(/^an? /,''); }).map(function(s){ return [s.spirit,s.trade,s.q]; });
      var looks={}; ZSPIRIT40.forEach(function(x){ looks[x[4]]=(looks[x[4]]||0)+1; });
      return {n:ZSPIRIT40.length, uniq:new Set(ZSPIRIT40.map(function(x){ return x[0]; })).size, bad:bad, looks:looks}; })()""")
    check('Forty unique spirits, each matching its bindstone\'s spirit (name, trade, realm); looks %s' % r['looks'], r['n'] == 40 and r['uniq'] == 40 and not r['bad'] and len(r['looks']) == 6, r)
    r = g.js("""(()=>{ var W=ZSCN.SHEETS.filter(function(S){ return S.wave===55; }), it=[]; W.forEach(function(S){ S.items.forEach(function(i){ it.push(i[0]); }); });
      return {sheets:W.map(function(S){ return S.id; }), sp:it.filter(function(i){ return /^sp_u_/.test(i); }).length, g2:it.filter(function(i){ return /^sp_g2_/.test(i); }).length,
        both:ZSPIRIT40.every(function(x){ return it.indexOf('sp_u_'+x[0]+'_bound')>=0&&it.indexOf('sp_u_'+x[0]+'_free')>=0; })}; })()""")
    check('Wave 55 ordered: ten sheets of spirits (%d pictures, each bound and freed) and the second round of groups (%d)' % (r['sp'], r['g2']), len(r['sheets']) == 11 and r['sp'] == 80 and r['both'] and r['g2'] == 8, r)
    # a bound shrine near you: its stone and its spirit (the wave 53 stand-in until wave 55 is in)
    r = g.js("""(async()=>{ var ws=game.scene.getScene('World'), s=ZSPIRIT.shrines(ws).filter(function(s){ return s.q===1&&ZSPIRIT.stoneOf(s)!=='now'; })[0];
      ws.player.x=s.x+120; ws.player.y=s.y+40; ws.player.cont.setPosition(ws.player.x,ws.player.y); await new Promise(function(r){ setTimeout(r,2500); });
      var V=s._v; return {kind:ZSPIRIT.stoneOf(s), stone:!!(V&&V.stone&&V.stone.texture&&V.stone.texture.key), sp:!!(V&&V.sp), id:s.id}; })()""")
    check('At a %s the stone and its toiling spirit appear' % r['kind'], r['stone'] and r['sp'], r)
    g.wait(500); g.js("(()=>{ var ws=game.scene.getScene('World'); ws.cameras.main.setZoom(1.6); })()"); g.wait(400); g.shot('/tmp/round54_shrine.png')
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

check('The Lab shows the forty spirits, groupings round two and how they move', re.search(r"id:['\"]spirits40", lab) and 'Groupings, round two' in lab and 'How they move' in lab)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
