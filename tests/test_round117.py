"""Round 117: Kris's fixes — no boss healing; Old Nell pays for her net; the sky port's guardian (seen, kinder, its own painting when in) and its
sky bombs; the Elven Library redesigned; no text box opens by itself in the middle of a fight.
python tests/test_round117.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
with game(painted=True) as g:
    g.wait(4000)
    # 1 · bosses never heal
    a = g.js("""(()=>{ var ws=%s, P=ws.player, out={};
      var mon=MX.spawn(ws,'bramble_wolf',P.x+60,P.y,{q:1,temp:true}); mon.isBoss=true; ws.worldMonsters.push(mon); mon._hp=mon.maxHp*0.5; var h0=mon._hp;
      out.boss=MX.bossy(mon);
      var A=MX.A(ws), PP=A.p(); var D=MX.ATK.drain, bb={t:0}; D.fire(A,mon,mon._m,PP,{m:0.3},bb); var ph=ws.playerState.hp; for(var j=0;j<6;j++)D.act(A,mon,mon._m,PP,{m:0.3,dur:2.5},bb,0.5);
      out.drainHurt=ws.playerState.hp<ph; out.after=mon._hp; out.before=h0; mon.dead=true; try{ mon.cont.destroy(); }catch(e){} return out; })()""" % WS)
    check("A boss's drain still hurts but no longer heals it (%s)" % a, a['boss'] and a['after'] <= a['before'], a)
    # 2 · Old Nell pays
    n = g.js("""(()=>{ var ws=%s, ps=ws.playerState, g0=ps.gold||0; ZOSW.tq(ps).net=2; var F=ws._villageNPCs.find(n=>n.id==='vf_fisher'); F._tq=0; F.talk(ws); if(ZDLG.cur){ ZDLG._q=[]; ZDLG.cur.close(); } return {paid:(ps.gold||0)-g0, net:ps.tq.net}; })()""" % WS)
    check('Old Nell pays her fifty gold for the net, whatever set her talk first (%s)' % n, n['paid'] == 50 and n['net'] == 3, n)
    # 6 · no box by itself in a fight; one you ask for opens
    c = g.js("""(()=>{ var ws=%s; ZLES._hurtT=Date.now(); ZCALMBOX.userT=0; ZDLG.say('Test','A line that should wait.'); var held=ZCALMBOX.held.length, open=ZDLG.open;
      ZCALMBOX.userT=Date.now(); ZDLG.say('Test','A line you asked for.'); var open2=ZDLG.open; if(ZDLG.cur){ ZDLG._q=[]; ZDLG.cur.close(); }
      ZLES._hurtT=0; return {held:held, open:open, asked:open2}; })()""" % WS)
    check('In a fight a box that opens by itself waits; one you ask for opens at once (%s)' % c, c['held'] == 1 and not c['open'] and c['asked'], c)
    g.wait(2500)
    c2 = g.js("(()=>{ var r={held:ZCALMBOX.held.length, open:ZDLG.open, txt:(document.querySelector('#zdlg')||{}).textContent||''}; if(ZDLG.cur){ ZDLG._q=[]; ZDLG.cur.close(); } return r; })()")
    check('…and it opens once the fight is over (%s)' % c2, c2['held'] == 0 and c2['open'] and 'A line' in c2['txt'], c2)
    # 5 · the library
    L = g.js("""(()=>{ var D=ZSP.design('elven_library',4), out={ok:D.floors.every(f=>f.ok)}; var F=D.floors[0], W=F.w, run=0, maxRun=0;
      for(var y=0;y<F.h;y++){ for(var x=0;x<W;x++){ if(F.g[y*W+x]===6){ run++; maxRun=Math.max(maxRun,run); } else run=0; } run=0; }
      for(var x2=0;x2<W;x2++){ for(var y2=0;y2<F.h;y2++){ if(F.g[y2*W+x2]===6){ run++; maxRun=Math.max(maxRun,run); } else run=0; } run=0; }
      out.maxRun=maxRun; var n=0; for(var i=0;i<W*F.h;i++)if(F.g[i]===6)n++; out.cases=n; return out; })()""")
    check('Elven Library: every floor joins up; bookcases are short and freestanding (longest run %d), %d of them' % (L['maxRun'], L['cases']), L['ok'] and L['maxRun'] <= 5 and L['cases'] > 100, L)
    # 3 · 4 · the sky port
    g.js("(()=>{ var ws=%s; ws.playerState.unlockedSections=[1,2,3,4]; ws.playerState.skyBriefSeen=true; var s=ws.wd.sites.find(x=>x.type==='skyport'&&x.section===1); ws._enterSite(s); })()" % WS)
    g.wait(3000)
    g.js("(()=>{ var b=[...document.querySelectorAll('button')].find(x=>/launch/i.test(x.textContent)&&x.offsetParent); if(b)b.click(); })()")
    g.wait(2500)
    b0 = g.js("(()=>game.scene.getScene('Sky').bombs)()")
    g.key('x', 60); g.wait(400)
    b1 = g.js("(()=>game.scene.getScene('Sky').bombs)()")
    check('Sky port: X drops a sky bomb (%s → %s)' % (b0, b1), b1 == b0 - 1, [b0, b1])
    g.js("(()=>{ var S=game.scene.getScene('Sky'); S.bombs=0; S.enemies.forEach(e=>{ if(!e.dead)S._kill(e); }); S.waveNum=S._totalWaves; })()")
    g.wait(3500)
    s = g.js("""(()=>{ var S=game.scene.getScene('Sky'), B=S.enemies[0]; var im=B.im, b=im.getBounds?im.getBounds():{width:0,height:0};
      return {on:S.bossOn, name:B.name, hp:B.maxHp, tex:im.texture&&im.texture.key, vis:im.visible!==false&&im.alpha>0.3, w:Math.round(b.width), h:Math.round(b.height), bombs:S.bombs, hud:S.hud.text}; })()""")
    check('The guardian is seen (%s, %s×%s) with its name, and the port hands up fresh bombs (%s)' % (s['tex'], s['w'], s['h'], s),
          s['on'] and s['vis'] and s['tex'] != '__DEFAULT' and s['w'] > 40 and s['name'] in s['hud'] and s['bombs'] == 2, s)
    check('The guardian is kinder: %d health at level 1 in the Grasslands (was 276)' % s['hp'], s['hp'] <= 160, s)
    h0 = g.js("(()=>game.scene.getScene('Sky').enemies[0].hp)()")
    g.key('x', 60); g.wait(400)
    h1 = g.js("(()=>({hp:game.scene.getScene('Sky').enemies[0].hp, bombs:game.scene.getScene('Sky').bombs}))()")
    check('A sky bomb works on the guardian too (%s → %s)' % (h0, h1), h1['hp'] < h0 and h1['bombs'] == 1, [h0, h1])
    g.shot('/tmp/claude-0/r117_sky.png')
    errs = [x for x in g.errs if 'favicon' not in x and '404' not in x and 'decode audio' not in x]
    check('No page errors', errs == [], errs[:4])
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
