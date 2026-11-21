"""Round 127: boss area attacks only inside the arena (09bd); the five seasons (the thaw apart from Freya's spring; requests); the world
revamped 2 (real painted screenshots; requests); boss fights remade (the catalogue and the proposals); the Lab's three new tabs.
python tests/test_round127.py   (after node build.mjs)"""
import sys, os, json, re, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:600]), flush=True)
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
J = json.load(open(os.path.join(R, 'sprites', 'requests', 'scenery.json'), encoding='utf-8'))
S = {x['id']: x for x in J['requests']}
# ── the seasons ──
th = [i for i in S if i.startswith('sc_seas_th_')]
check('The thaw: the 12 world sheets and 5 village sheets are asked for, each a repaint of its summer sheet, muted (%d)' % len(th),
      len(th) == 17 and all(S[i]['wave'] == 127 and S[i]['fam'] == 'seas_th' and 'THAW' in S[i]['body'] and 'NO blossom' in S[i]['body'] or 'vill' in i for i in th))
land = ['sc_land_thaw', 'sc_land_thaw_set', 'sc_land_harvest', 'sc_land_yule', 'sc_land_bloom']
check('The land in each celebration: thaw, harvest (hesje, last sheaf), Yule (julenek, snow lantern), Freya\'s spring (anemones, Valborg)',
      all(i in S for i in land) and 'hesje' in S['sc_land_harvest']['body'] and 'julenek' in S['sc_land_yule']['body'] and 'snölykta' in S['sc_land_yule']['body']
      and 'anemones' in S['sc_land_bloom']['body'] and 'Valborg' in S['sc_land_bloom']['body'])
check('The village spring repaints (round 122) now paint Freya\'s spring', all('FREYA' in S[i]['body'] for i in S if i.startswith('sc_seas_sp_vill_')))
check('The thaw keeps no feast: its door touches are small and hopeful; the Blossom Feast moved to Freya\'s spring',
      'not a feast' in S['sc_fest_dress_sp']['title'] and 'Blossom Feast' in S['sc_fest_set_bl']['title'] and any(it['id'] == 'fs_bl_pole' for it in S['sc_fest_set_bl']['items']))
lst = [l for l in open(os.path.join(R, 'sprites', 'requests', 'r127_seasons.txt')).read().split() if l.startswith('sc_')]
check('r127_seasons lists all 35', len(lst) == 35 and all(i in S for i in lst) and set(th) <= set(lst) and set(land) <= set(lst), len(lst))
src = open(os.path.join(R, 'src', 'js', '10zs-seasons.js'), encoding='utf-8').read()
check('The game: the first spring is the thaw (its own paintings, _th; muted tint), Freya\'s spring takes the lush spring paintings (_sp)',
      "sp:{n:'The thaw'" in src and "art:'th'" in src and "bl:{n:'Freya\\'s spring'" in src and "art:'sp',ban:['Freya" in src and '_(sp|au|wi|th)$' in src)
# ── the world, revamped 2 ──
w = [l for l in open(os.path.join(R, 'sprites', 'requests', 'r127_world.txt')).read().split() if l.startswith('sc_')]
check('r127_world: frames, landmarks, vistas, site exteriors, aurora, water, ground, air, light (%d)' % len(w),
      len(w) == 18 and all(i in S and S[i]['wave'] == 128 for i in w) and sum(1 for i in w if 'frame' in i) == 4 and sum(1 for i in w if 'vista' in i) == 4)
ws = open(os.path.join(R, 'tools', 'world', 'world_shots.py'), encoding='utf-8').read()
check('The screenshots are taken painted, and stop if the painted art is not all there', 'game(painted=True' in ws and "sys.exit('STOP" in ws)
lab = open(os.path.join(R, 'lab', 'lab.artifact.html'), encoding='utf-8').read()
imgs = set(re.findall(r"preview/worldlook2/'\+n\+'\.jpg", lab))
need = set(re.findall(r"\['([a-z_]+)','([a-z_]+)','", open(os.path.join(R, 'lab', 'src', 'js', '79x2-lab-worldlook2.js'), encoding='utf-8').read()))
miss = [n for p in need for n in p if not os.path.exists(os.path.join(R, 'lab', 'preview', 'worldlook2', n + '.jpg'))]
check('Lab › The world, revamped 2: every picture it shows exists (%d pairs)' % len(need), 'worldlook2' in lab and not miss, miss)
s5 = [s for s in ('sp', 'su', 'au', 'wi', 'bl') for p in ('village', 'grass') if not os.path.exists(os.path.join(R, 'lab', 'preview', 'seasons5', 'season_%s_%s.jpg' % (s, p)))]
check('Lab › The five seasons: the village and the Grasslands in all five', "id:'seasons5'" in lab.replace('"', "'") and not s5, s5)
# ── boss fights remade ──
D = json.loads(open(os.path.join(R, 'lab', 'src', 'js', '79y-0-bossplan-data.js'), encoding='utf-8').read().split('var LBPLAN=', 1)[1].rstrip().rstrip(';'))
T = {t['id']: t for t in D['types']}
check('Boss plan: at least 50 kinds of move in 7 themes (%d)' % len(T), len(T) >= 50 and len(D['themes']) == 7 and all(t['th'] in D['themes'] for t in T.values()))
B = D['bosses']
check('Boss plan: every boss has ten proposals of known kinds (%d bosses)' % len(B), len(B) >= 55 and all(len(b['p']) == 10 and all(p['t'] in T for p in b['p']) for b in B))
check('Boss plan: only bosses with magic keep the blink (skeletons, brutes, beasts and machines get their own way to close the gap)',
      all(b['move']['t'] != 'blink' for b in B if b['nature'] != 'magic') and next(b for b in B if b['id'] == 'q4_d')['move']['t'] != 'blink')
check('Boss plan: the proposals differ from boss to boss (no two bosses with the same ten)', len({tuple(p['n'] for p in b['p']) for b in B}) == len(B))
check('Boss plan: the painted units bosses bring in are shown (%d), each with its picture' % len(D['units']),
      len(D['units']) >= 30 and all(u['painted'] and os.path.exists(os.path.join(R, 'lab', 'preview', 'bossplan', u['img'])) for u in D['units']))
check('Lab › Boss fights, remade is in the Lab and on the to-do list', 'bossplan' in lab and 'Boss fights, remade' in lab)
# ── area attacks only in the arena (in the game) ──
from harness import game
exec(open(os.path.join(R, 'tests', 'test_round8b.py')).read().split("if only in (None,'game'):")[0].split('res=[]')[1].replace('def check', 'def _c'))
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500); g.js(LAUNCH + '(["tower",1,1])'); until(g, READY); g.wait(1500)
    a = g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), A=BARENA.get(S), m=S.monsters.find(x=>x.isBoss&&!x.dead&&!x.bossAlly); S.px=m.x+40; S.py=m.y+60; S.pCont.setPosition(S.px,S.py); if(!m._bp)BossPat.init(S,m); m._bp.t=999; BossPat.tick(S,0.01);
      var F=BossPat.field(S), n0=S.children.list.length; BossPat.run(S,m,'rain',m._bp); BossPat.run(S,m,'wall:fire',m._bp); for(var i=0;i<10;i++)BossPat.tick(S,0.05);
      var made=S.children.list.slice(n0), g=made.filter(o=>o.type==='Graphics'||o.type==='Image'); var MA=MX.A(S), t=MX.tele.circle(MA,A.x0-200,A.y0-200,20,'#fff',0.5);
      var out=0, inn=0; for(var k=0;k<40;k++){ var p=BMOVE.spot(MA,m,{x:S.px,y:S.py}); if(!p)continue; if(BARENA.in(S,p.x,p.y))inn++; else out++; }
      return {A:!!A, n:A&&A.n, F:F, box:A&&[A.x0,A.y0,A.x1,A.y1], on:S._arenaOn, masked:g.filter(o=>!!o.mask).length, all:g.length, tele:!!t.mask, inn:inn, out:out}; })()""")
    check('A boss fight knows its arena; the patterns\' field lies inside it (%s)' % a, a['A'] and a['n'] > 50 and a['F']['x'] >= a['box'][0] and a['F']['y'] >= a['box'][1]
          and a['F']['x'] + a['F']['w'] <= a['box'][2] and a['F']['y'] + a['F']['h'] <= a['box'][3] and a['on'])
    check('Everything a pattern draws is masked to the arena floor, and so are the boss\'s own telegraphs (%d of %d)' % (a['masked'], a['all']), a['all'] > 0 and a['masked'] == a['all'] and a['tele'])
    check('A boss blinks only onto arena floor (%d in, %d out)' % (a['inn'], a['out']), a['out'] == 0)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
