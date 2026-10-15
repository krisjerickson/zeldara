"""Round 56 — Kris's Saga-art notes and the forge-masters: twelve forge-master forms (four masters × three phases) as painted-boss designs with
options in the Lab's Bosses tab and their own sprite wave (7.6); the six group loops whose frames changed held back and re-ordered (wave 59);
moving fire and steam over the forge hearths; the Muspelheim options (wave 58) painted and in the Lab.
Run: python tests/test_round56.py"""
import sys, os, re, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
ROOT = os.path.join(os.path.dirname(__file__), '..')
lab = open(os.path.join(ROOT, 'lab', 'index.html'), encoding='utf8').read()
req = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'requests.json'), encoding='utf8'))

with game(new=True, painted=True) as g:
    g.wait(4000)
    r = g.js("""(()=>{ var out={}; ['glodr','eisa','gjallr','eimyrja'].forEach(function(k){ [1,2,3].forEach(function(i){ var s='fm_'+k+'_'+i; out[s]=(BOSS_SLOTS[s]||[]).length; }); });
      var ph=Object.keys(ZFORGE.F).map(function(v){ var B=BOSS_PHASES[ZFORGE.F[v].boss]; return B.phases.map(function(P){ return [P.form, MON_BY_ID[P.rid].chId, MON_BY_ID[P.rid].name]; }); }); return {slots:out, ph:ph}; })()""")
    check('Twelve forge-master forms, each with 2–3 design options (%s)' % r['slots'], len(r['slots']) == 12 and all(2 <= v <= 3 for v in r['slots'].values()), r['slots'])
    check('Each forge-master phase wears its own form (%s)' % [p[2] for f in r['ph'] for p in f][:6], all(p[0] == p[1] and re.match(r'fm_\w+_[123]$', p[0]) for f in r['ph'] for p in f), r['ph'])
    # the Ember forge-master's floor: the boss is dressed in its painted form, the hearth breathes fire
    r = g.js("""(async()=>{ var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }; var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true;
      document.getElementById('hud').style.display='none'; document.getElementById('dungeon-hud').style.display='block'; game.scene.sleep('World');
      game.scene.start('Dungeon',{site:ZFORGE.site('volcano_n'),floor:2,maxFloors:3,worldScene:ws,theme:'volcano',forgeKey:'volcano_key_n',forgeKeyName:'Ember Key'}); await w(5000);
      var D=game.scene.getScene('Dungeon'), B=D._bossGroup[0], H=D._forgeHearth, cnt=function(){ return D.children.list.filter(function(o){ return o.type==='Arc'&&Math.abs(o.x-H.x)<90&&o.y<H.y+30&&o.y>H.y-160; }).length; };
      var a=cnt(); await w(700); var b=cnt(), ys=D.children.list.filter(function(o){ return o.type==='Arc'&&Math.abs(o.x-H.x)<90&&o.y<H.y+30&&o.y>H.y-160; }).map(function(o){ return Math.round(o.y); });
      await w(1500); var chars=['glodr','eisa','gjallr','eimyrja'].reduce(function(n,k){ return n+[1,2,3].filter(function(i){ return !!ZAtlas.META.chars['fm_'+k+'_'+i]; }).length; },0);
      return {chars:chars, za:!!B._za, rig:!!(B.spr&&B.spr._rig), slot:B.spr&&B.spr._rig&&B.spr._rig.D&&B.spr._rig.D.id, name:B.def.name, painted:!!(H.vis&&H.vis.texture&&H.vis.texture.key), p0:a, p1:b, ys:ys.length?[Math.min.apply(null,ys),Math.max.apply(null,ys)]:[]}; })()""")
    check('Brokk is dressed in his painted-boss form (%s)' % r['slot'], r['rig'] and (r['slot'] or '').startswith('fm_glodr_1'), r)
    check('The forge-masters are painted (wave 7.6: %d of 12 forms in the atlas) and Brokk wears his painting' % r['chars'], r['chars'] == 12 and r['za'], r)
    check('The Ember hearth has moving fire: particles rising over the painted hearth (%d, then %d)' % (r['p0'], r['p1']), r['painted'] and r['p1'] >= 6 and len(r['ys']) == 2 and r['ys'][1] - r['ys'][0] > 10, r)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), K=['chaingang','haul','hearth_tale','mead_bench','reel','tafl']; return {ring:(ZGREEN.loop(ws,'ring')||{}).key, family:(ZGREEN.loop(ws,'family')||{}).key,
      remade:K.map(function(k){ var A=ZGREEN.loop(ws,k); return A&&A.key; })}; })()""")
    check('The approved loops play as before; the six remade ones play their new wave 59 loops (%s)' % r['remade'], 'gl_ring' in (r['ring'] or '') and 'gl_family' in (r['family'] or '') and all(k and 'gm_' in k for k in r['remade']), r)
    r = g.js("""(()=>{ var W=ZSCN.SHEETS.filter(function(S){ return S.wave===59; }); return {n:W.length, frames:W.map(function(S){ return S.items.length; }), ids:W.map(function(S){ return S.seq[0][0]; }), cols:W.map(function(S){ return S.cols+'x'+S.rows; })}; })()""")
    check('Wave 59 ordered: the six groups again, one per sheet, four frames each, the head-count written in (%s)' % r['ids'], r['n'] == 6 and all(f == 4 for f in r['frames']) and all(c == '2x2' for c in r['cols']), r)
    r = g.js("(()=>{ var Z=_scn(); return ['surt_colossus','sw_relief','mh_lift_a','gh_hearth_a','ls_staff_a','aw_warden_a'].filter(function(i){ return Z.has(i); }).length; })()")
    check('Wave 58 painted and in: the Muspelheim options (%d of 6 sampled)' % r, r == 6, r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

L = [q for q in req['requests'] if q['wave'] == 7.6]
check('The forge-masters have their own sprite wave (7.6: %d sheets for 12 forms), sent once you pick' % len(L), len(set(q['id'].split('.')[0] for q in L)) == 12 and os.path.exists(os.path.join(ROOT, 'sprites', 'requests', 'wave-7_6-forge-masters.md')))
check('The Lab: forge-masters in the Bosses tab, the remade loops marked in Saga art, painted options in Muspelheim', 'Forge-masters of Muspelheim' in lab and 'Being remade' in lab and 'moving steam' in lab)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
