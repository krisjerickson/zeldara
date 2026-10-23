"""Round 80 — gentler sounds (07zau2-ethereal.js, 27z, 04c2): the harsh UI, page and "can't do that" sounds play softer and muffled until
the ethereal takes are picked; every effect has gentle words for the remake (two options each); skills, spells and mounts get their own
sounds; the twin's library and second bed are requested (07zt7, wave 90). Run: python tests/test_round80.py"""
import os, sys, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
A = json.load(open(os.path.join(R, 'sprites', 'requests', 'audio.json'), encoding='utf-8'))
S = [c for c in A['cues'] if c['kind'] == 'sfx']
check('Every one of the %d effects has gentle, ethereal words for the remake' % len(S), len(S) >= 147 and all(c.get('eth') and 'never harsh' in c['eth'] for c in S))
new = [c['id'] for c in S if c['id'].startswith(('sfx_sk_', 'sfx_sp_', 'sfx_mt_'))]
check('Skills, spells and mounts have their own sounds (%d)' % len(new), len([x for x in new if x.startswith('sfx_sk_')]) >= 12 and len([x for x in new if x.startswith('sfx_sp_')]) == 16 and 'sfx_mt_horse' in new and 'sfx_mt_dragon' in new, new[:6])
J = json.load(open(os.path.join(R, 'sprites', 'requests', 'scenery.json'), encoding='utf-8'))
w90 = [q['id'] for q in J['requests'] if q['wave'] == 90]
check('The library, its furniture and wall pieces, and the second bed are requested (wave 90: %s)' % w90, set(w90) == {'sc_library', 'sc_int_library', 'sc_int_library_wall', 'sc_twin_bed'})
with game(painted=True) as g:
    g.wait(1500)
    r = g.js("""(()=>{ var got=[]; var p0=ZAUDIO.play, h0=ZAUDIO.has; ZAUDIO.play=function(id,o){ got.push([id,o&&o.vol,o&&o.lp]); return true; };
      ZAHOOK.last={}; ZAHOOK.s('sfx_page'); ZAHOOK.s('sfx_ui_click'); ZAHOOK.s('sfx_nomana'); ZAHOOK.s('sfx_sword_hit');
      ZAUDIO.has=function(id){ return id==='sfx_sp_fireball'||id==='sfx_mt_horse'||id==='sfx_sk_roll'||h0.call(ZAUDIO,id); };
      var sp=ZAHOOK.spellSfx('fireball'), sp2=ZAHOOK.spellSfx('frost_bolt');
      var ws=game.scene.getScene('World'), ps=ws.playerState; ps.ownedMounts=['horse']; ps.mount=null; for(var r=40;r<200;r+=4){ var x=(CENTER_X+r)*TILE+16, y=CENTER_Y*TILE+16, t=(ws.tiles[CENTER_Y]||[])[CENTER_X+r]; if(t!==undefined&&canPassTile(t,null)&&!_inVillagePx(x,y,0)){ ws.player.x=x; ws.player.y=y; break; } } return new Promise(function(res){ setTimeout(function(){ ps.mount='horse'; setTimeout(function(){
        ZAUDIO.play=p0; ZAUDIO.has=h0; ps.mount=null; res({got:got, sp:sp, sp2:sp2}); },700); },500); }); })()""")
    soft = {x[0]: x for x in r['got']}
    check('Until the new takes are picked, the page, click and "can\'t do that" sounds play softer and muffled; a sword hit is untouched (%s)' % r['got'][:4],
          soft['sfx_page'][1] and soft['sfx_page'][1] <= 0.35 and soft['sfx_page'][2] and soft['sfx_ui_click'][2] and soft['sfx_nomana'][1] <= 0.3 and not soft['sfx_sword_hit'][2], r['got'])
    check('A spell plays its own sound once it is in (fireball → %s), else its element (%s)' % (r['sp'], r['sp2']), r['sp'] == 'sfx_sp_fireball' and r['sp2'] == 'sfx_frost')
    check('Climbing on a horse plays the horse\'s call', any(x[0] == 'sfx_mt_horse' for x in r['got']), r['got'])
    errs = [x for x in g.errs if 'favicon' not in x and '404' not in x]
    check('No game script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
