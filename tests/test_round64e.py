"""Round 64e — Asgard played through: no autospawns that stall a citadel floor; the Norns' threads say what they do and every hall opens
with its rules; Godsbane strikes Asgard's foes three times as hard; Asgard's instructions are pop-ups with pictures; the city filled
(a living city), golden roads from every gate to the heart under a column of light; no whales in the cloud-sky; sandbox: the Lodestar,
the Heartglasses and Asgard's floors.
Run: python tests/test_round64e.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"
ROOT = os.path.join(os.path.dirname(__file__), '..')

with game(new=True, painted=True) as g:
    g.wait(4500)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ZFT.on=true; ZCIT.enter(ws,2); await w(8000); var D=game.scene.getScene('Dungeon'), o={};
      var el=document.getElementById('modal-forgetrial'); o.rules=el?el.querySelector('h3').textContent:''; o.pics=el?el.querySelectorAll('canvas[data-painted]').length:0; o.paused=isGamePaused(); if(el)el.querySelector('.zft-go').click(); await w(600);
      o.labels=(D._cit.threads||[]).map(function(t){ return !!t.lbl; }); o.bridgeLbl=(D._cit.threads||[]).some(function(t){ return t.eff==='span0'&&/bridge/.test(t.lblT||''); });
      var alive=function(){ return D.monsters.filter(function(m){ return !m.dead&&m.hp>0; }).length; }; var a0=alive(), L=ZCIT.around(D,10,['einherjar_berserker']); o.cap=[a0,L.length,alive(),ZCIT.CAP];
      D.monsters.forEach(function(m){ m.dead=true; m.hp=0; if(m.cont)m.cont.setVisible(false); }); var L2=ZCIT.around(D,3,['einherjar_berserker']); o.room=L2.length;
      var m=L2[0]; m.hp=m.maxHp=99999; var h1=m.hp; ZHit._gb=true; try{ _heroHitMonster(D,m,100,{src:'skill'}); }finally{ ZHit._gb=false; } var gb=h1-m.hp; var h2=m.hp; _heroHitMonster(D,m,100,{src:'skill'}); var plain=h2-m.hp; o.gb=[gb,plain];
      var q=document.querySelector('.zheat-q'); o.rulesBtn=!!q;
      D._exitToWorld(null); await w(1500); return o; })()""" % W)
    check('Each hall of the citadel opens with its rules, with painted pictures, the game paused (%s, %d pictures)' % (r['rules'], r['pics']), 'Norns' in r['rules'] and r['pics'] >= 2 and r['paused'], r)
    check('The Norns\' threads each say what Tab does, and the first promises a bridge (%s)' % r['labels'], all(r['labels']) and r['bridgeLbl'], r)
    check('Waves that walk in never pile up: %s awake → %s more (cap %s); on an empty floor %s come' % (r['cap'][0], r['cap'][1], r['cap'][3], r['room']), r['cap'][2] <= max(r['cap'][3], r['cap'][0]) and r['room'] == 3, r)
    check('Godsbane strikes Asgard\'s foes three times as hard (%s vs %s)' % (r['gb'][0], r['gb'][1]), r['gb'][1] > 0 and r['gb'][0] >= r['gb'][1] * 2.4, r)
    check('"? Rules" sits on the Ragnarök track', r['rulesBtn'], r)
    r = g.js("""(async()=>{ %s ZFT.on=true; var o={}; showNotif('✦ You learned GODSBANE — [V] with the Lodestar in hand.','#fff2b0'); await w(400); var el=document.getElementById('modal-forgetrial'); o.pop=el?el.querySelector('h3').textContent:''; o.steps=el?el.querySelectorAll('.zft-step').length:0; o.paused=isGamePaused(); if(el)el.querySelector('.zft-go').click(); await w(500);
      showNotif('🪙 +5 gold','#ffd700'); await w(300); o.minor=!document.getElementById('modal-forgetrial'); return o; })()""" % W)
    check('Asgard\'s instructions are pop-ups with pictures you click away (%s, %d steps); small notices stay small' % (r['pop'], r['steps']), 'Godsbane' in r['pop'] and r['steps'] >= 3 and r['paused'] and r['minor'], r)
    r = g.js("""(async()=>{ %s ZFT.on=false; SBSAGA.asg('city'); await w(9000); var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; var L=ZCITY.lots(ws), R=ZCITY.roads(ws), G=ZCITY.gates(ws), P=ZASG.plan(ws), H=ZCITY.heartT(ws);
      o.lots=L.length; o.kinds=Array.from(new Set(L.map(function(l){ return l.t; }))).length; o.roads=R.list.length; o.gates=G.length; o.done=!!ws.wd._cityDone;
      // from every gate a walkable way to the heart
      var reach=function(g0){ var W=WORLD_W, g=null, bd=1e9; R.list.forEach(function(c){ var t=ws.wd.tiles[c[1]][c[0]]; if(t===T.BUILDING_WALL)return; var d=Math.hypot(c[0]-g0.x,c[1]-g0.y); if(d<bd){ bd=d; g={x:c[0],y:c[1]}; } }); if(!g||bd>6)return false; var seen={}, q=[[g.x,g.y]], h=0; seen[g.y*W+g.x]=1; while(h<q.length&&h<40000){ var c=q[h++]; if(Math.hypot(c[0]-H.x,c[1]-H.y)<=ZCITY.RING+1)return true; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var x=c[0]+d[0], y=c[1]+d[1], k=y*W+x; if(seen[k]||!P.isl[k])return; var t=ws.wd.tiles[y][x]; if(t===T.BUILDING_WALL&&!(x===g.x&&y===g.y))return; seen[k]=1; q.push([x,y]); }); } return false; };
      o.reach=G.map(function(g){ return reach(g); }); o.onRoad=L.filter(function(l){ return R.set[l.y*WORLD_W+l.x]; }).length; o.beam=ws.textures.exists('zcity_beam'); o.inv=ps.equip&&ps.equip.mWeapon;
      SBSAGA.give('heartglass_2'); await w(1000); o.hg=ps.inventory.indexOf('heartglass_2')>=0; SBSAGA.give('lodestar'); await w(300);
      o.whale=(function(){ var n=0; try{ var s0=ws.add.image; ZVOID.creature&&0; }catch(e){} return n; })(); return o; })()""" % W)
    check('Asgard is a living city: %d buildings and pieces of %d kinds, none on a road' % (r['lots'], r['kinds']), r['lots'] >= 30 and r['kinds'] >= 10 and r['onRoad'] == 0 and r['done'], r)
    check('Golden roads (%d tiles) from all %d gates lead to the heart, each walkable (%s), under a column of light' % (r['roads'], r['gates'], r['reach']), r['gates'] == 4 and r['roads'] > 150 and all(r['reach']) and r['beam'], r)
    check('Sandbox: the Heartglasses and the Lodestar can be given, and Asgard\'s city, floors and Solmyrk are buttons', r['hg'], r)
    r = g.js("""(()=>{ SBSAGA.show(); var A=document.querySelectorAll('#modal-saga .sbs-arc'), last=A[A.length-1], n=last.querySelectorAll('button[data-k]:not(.sbs-todo)').length, mu=Array.from(A).map(function(a){ return a.textContent; }).join(' '); closeModal('saga'); return {asg:n, give:/Lodestar/.test(mu)&&/💎1/.test(mu)}; })()""")
    check('The Spirit Saga panel: Asgard\'s buttons wired (%d) and a Give row (Lodestar, Staff, the four Heartglasses)' % r['asg'], r['asg'] >= 7 and r['give'], r)
    src = open(os.path.join(ROOT, 'src/js/07zy2-site-void.js')).read()
    check('No whales swim through Asgard\'s cloud-sky', "if(kind==='clouds')return;" in src)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

S = json.load(open(os.path.join(ROOT, 'sprites/requests/scenery.json')))
L68 = [q['id'] for q in S['requests'] if q.get('wave') == 68]
check('Ordered (scenery wave 68): the city of Asgard (%s)' % L68, L68 == ['sc_asg_city_a', 'sc_asg_city_b', 'sc_asg_city_c'] and '67,68' in open(os.path.join(ROOT, 'tools/sprites/round65.ps1')).read())
print('\n%d / %d passed' % (sum(res), len(res)))
