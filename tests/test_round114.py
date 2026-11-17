"""Round 114: the training and key talks still come first now that every villager has a voice and requests.
  Kris: "make sure that we still have all the training and other interactions with key NPCs, especially like oswin".
python tests/test_round114.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
with game(painted=True) as g:
    g.wait(3500)
    g.js("ZDLG.on=false; ZOSW.on=true")   # the harness starts with Oswin off
    # Oswin at the guild: his own talk, never the generic voice
    a = g.js("""(()=>{ var ws=%s, n=0, t0=ZOSW.talk; ZOSW.talk=function(){ n++; }; try{ var B={building:{type:'guild'},worldScene:ws}; BuildingScene.prototype._npcInteract.call(B); }finally{ ZOSW.talk=t0; } return n; })()""" % WS)
    check('Master Oswin still speaks at the guild (his lessons, tasks and quest list) (%s)' % a, a == 1, a)
    # Oswin's talk itself still runs its lesson flow at the start
    a2 = g.js("""(()=>{ var ws=%s, ps=ws.playerState, said=[], d0=ZDLG.say, n0=window.showNotif; window.showNotif=function(t){ said.push(t); }; ZDLG.say=function(w,l){ said.push(l); };
      try{ ps.oswin=0; ZOSW.talk(ws); }catch(e){ said.push('ERR '+e); } finally{ window.showNotif=n0; ZDLG.say=d0; } return {said:said.slice(0,3), n:ps.oswin}; })()""" % WS)
    check('Oswin\'s first talk still teaches (his own words, the count of meetings goes up) (%s)' % a2, a2['said'] and not any('ERR' in s for s in a2['said']) and a2['n'] >= 1, a2)
    # his quest list opened after the talk (a window that pauses the world): close it
    g.js("(()=>{ document.querySelectorAll('[id^=modal-]').forEach(function(m){ if(m.style.display!=='none')closeModal(m.id.slice(6)); }); if(typeof resumeGame==='function')resumeGame(); })()")
    g.wait(800)
    g.js("(()=>{ var ws=game.scene.getScene('World'); if(!ws.sys.isActive())ws.scene.resume(); })()")
    # Old Nell: the net goes back to her, and the gold is paid
    g.wait(2500)
    b = g.js("""(()=>{ var ws=%s, ps=ws.playerState, T=ZOSW.tq(ps); T.net=2; var g0=ps.gold||0, F=(ws._villageNPCs||[]).find(n=>n.id==='vf_fisher'); if(!F)return null; F.talk(ws); return {net:T.net, paid:(ps.gold||0)-g0, wrapped:!!(F.talk&&F.talk._zv)}; })()""" % WS)
    check('Old Nell takes her net back and pays Oswin\'s fifty gold (%s)' % b, b and b['net'] == 3 and b['paid'] == 50, b)
    c = g.js("""(()=>{ var ws=%s, F=(ws._villageNPCs||[]).find(n=>n.id==='vf_fisher'), said=[], v0=ZVOICE.talkVF; q0=ZNPCQ.talk; ZVOICE.talkVF=function(){ said.push('voice'); }; ZNPCQ.talk=function(w,k){ said.push('requests:'+k); return false; }; try{ F.talk(ws); }finally{ ZVOICE.talkVF=v0; ZNPCQ.talk=q0; } return said; })()""" % WS)
    check('…and after the net she talks with her own voice and requests (%s)' % c, c[-1:] == ['voice'] and 'requests:nell' in c, c)
    # Elder Runa's first walk
    g.js("""(()=>{ var ws=%s, ps=ws.playerState; ZWALK.on=true; ps.walk='runa'; ZWALK._t=Date.now(); ws.player.x=CENTER_X*TILE; ws.player.y=CENTER_Y*TILE; })()""" % WS)
    g.wait(1500)      # the walk and the voices both tick
    d = g.js("""(()=>{ var ws=%s, ps=ws.playerState, R=(ws._villageNPCs||[]).find(n=>n.id==='vf_elder'); if(!R)return null;
      var n=0, r0=ZWALK.runa; ZWALK.runa=function(){ n++; }; try{ R.talk(ws); }finally{ ZWALK.runa=r0; } var info={walk:ps.walk, w:R._walk, zv:R.talk&&R.talk._zv, own:String(R.talk&&(R.talk._own||R.talk)).slice(0,50)}; ps.walk='done'; ZWALK.on=false; return n===1?1:info; })()""" % WS)
    check('Elder Runa\'s first-walk lesson still comes first when you talk to her (%s)' % d, d == 1, d)
    # Pia's roll lesson
    e = g.js("""(()=>{ var ws=%s, ps=ws.playerState, keep=[ps.canRoll,ps.rollQ,ps.rollPins]; ps.canRoll=false; ps.rollQ=1; ps.rollPins=[1,2,3,4,5,6,7,8]; var s0=ZROLL.say; ZROLL.say=function(){}; try{ ZROLL.talk(ws); }finally{ ZROLL.say=s0; }
      var r={can:ps.canRoll, q:ps.rollQ}; ps.canRoll=keep[0]; ps.rollQ=keep[1]; ps.rollPins=keep[2]; return r; })()""" % WS)
    check('Pia still teaches the roll once the pins are found (%s)' % e, e['can'] is True and e['q'] == 2, e)
    # Mira / Sólveig: the Saga talk still runs
    f = g.js("""(()=>{ var out={}; ['ZMIRA.talk','ZSPIRIT.solveig'].forEach(function(k){ var o=k.split('.'), O=window[o[0]]; if(!O||!O[o[1]]){ out[k]='none'; return; } out[k]=/m0\\.apply|s0\\.apply/.test(O[o[1]].toString()); }); return out; })()""")
    check('Mira and Sólveig still hand you their part of the Saga after any request (%s)' % f, all(v is True or v == 'none' for v in f.values()), f)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
