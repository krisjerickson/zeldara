"""Player profiles + 3 save slots (04d-profiles.js): New Game asks your name, Returning player lists
names, each name has 3 slots, saves go to the chosen slot, export/import codes, the old single save is
moved into Player 1 / slot 1.  Run: python tests/test_saves.py"""
import sys, os, re, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
def click_title(g,label):
    g.js("""(l=>{ var T=game.scene.getScene('Title'); var t=T.children.list.find(o=>o.type==='Text'&&o.text===l); var bg=T.children.list.filter(o=>o.type==='Rectangle'&&o.input).find(o=>Math.abs(o.x-t.x)<2&&Math.abs(o.y-t.y)<2); bg.emit('pointerup'); })""", label)
def to_world(g):
    for _ in range(60):
        g.wait(250)
        if g.js("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): return True
    return False
with game(new=None) as g:
    g.js("localStorage.clear(); sessionStorage.clear(); game.scene.getScene('Title').scene.restart()"); g.wait(800)
    labels=g.js("game.scene.getScene('Title').children.list.filter(o=>o.type==='Text').map(o=>o.text)")
    check('First visit: only NEW GAME (no Returning player yet)', 'NEW GAME' in labels and 'RETURNING PLAYER' not in labels, labels[:6])
    click_title(g,'NEW GAME'); g.wait(300)
    check('New Game asks for your name', g.js("!!document.getElementById('zp-name')&&document.getElementById('zp-modal').style.display==='flex'"))
    g.page.fill('#zp-name','Kris'); g.page.click('#zp-next'); g.wait(300)
    n=g.js("document.querySelectorAll('.zp-slot').length")
    check('…then shows that player\'s 3 save slots', n==3, n)
    g.js("document.querySelectorAll('.zp-slot')[1].querySelector('[data-a=new]').click()")
    g.wait(200); nh=g.js("document.querySelectorAll('.zp-hero').length")
    check('…then asks which hero to play (boy or girl)', nh==2, nh)
    g.js("document.querySelector('.zp-hero[data-h=f]').click()")
    check('Starting a new game in slot 2 enters the world', to_world(g))
    g.js("game.scene.getScene('World')._save()")
    k=g.js("Object.keys(localStorage).filter(k=>/^zeldara_save_/.test(k))")
    pid=g.js("ZSave.byName('Kris').id")
    check('The save goes to Kris\'s slot 2', k==['zeldara_save_%s_2'%pid], k)
    # a second player on the same device
    g.js("ZSave.addPlayer('Maya'); var p=ZSave.byName('Maya'); ZSave.choose(p.id,1); var ws=game.scene.getScene('World'); ws.playerState.gold=777; ws._save();")
    info=g.js("[ZSave.info(ZSave.byName('Kris').id,2).gold!==777, ZSave.info(ZSave.byName('Maya').id,1).gold, ZSave.players().map(p=>p.name)]")
    check('Two players keep separate saves', info[0] and info[1]==777 and set(info[2])=={'Kris','Maya'}, info)
    # export → import into another slot round-trips
    rt=g.js("(()=>{ var k=ZSave.byName('Kris').id, m=ZSave.byName('Maya').id, code=ZSave.exportCode(m,1); var ok=ZSave.importCode(k,3,code); return [code.slice(0,5), ok, ZSave.info(k,3).gold, ZSave.parseCode('nonsense')]; })()")
    check('Export / import: a save code moves a game between slots (or devices)', rt[0]=='ZLD1:' and rt[1] and rt[2]==777 and rt[3] is None, rt)
    dup=g.js("ZSave.addPlayer('kris').err||''")
    check('Names are unique on a device (case-insensitive)', 'already' in dup, dup)
    # back to the title: Returning player lists both names; Kris → Continue slot 2 loads it
    g.js("location.reload()"); g.wait(2500)
    labels=g.js("game.scene.getScene('Title').children.list.filter(o=>o.type==='Text').map(o=>o.text)")
    check('Returning visit: NEW GAME + RETURNING PLAYER', 'RETURNING PLAYER' in labels, labels[:6])
    click_title(g,'RETURNING PLAYER'); g.wait(300)
    names=g.js("[...document.querySelectorAll('.zp-pl b')].map(b=>b.textContent)")
    check('Returning player lists the names (last played first)', names[:1]==['Maya'] and 'Kris' in names, names)
    g.js("[...document.querySelectorAll('.zp-pl')].find(b=>b.textContent.indexOf('Kris')>=0).click()"); g.wait(200); g.js("document.querySelectorAll('.zp-slot')[1].querySelector('[data-a=play]').click()")
    ok=to_world(g); cur=g.js("[ZSave.currentPlayer().name, ZSave.current.slot]")
    check('Continue loads that player\'s slot', ok and cur==['Kris',2], cur)
    errs=[e for e in g.errs if 'GL Driver' not in e]
    check('No JS errors', not errs, errs[:3])
# the old single save moves into Player 1 / slot 1
with game(new=None) as g:
    g.js("localStorage.clear(); localStorage.setItem('qoz_v2', JSON.stringify({level:7,gold:123,saveVersion:8})); game.scene.getScene('Title').scene.restart()"); g.wait(800)
    m=g.js("[ZSave.players().map(p=>p.name), ZSave.info(ZSave.players()[0].id,1), ZSave.read(), !!localStorage.getItem('qoz_v2_moved')]")
    check('An old save becomes Player 1, slot 1 (a copy is kept)', m[0]==['Player 1'] and m[1]['level']==7 and m[2] is None and m[3], m)
print('%d/%d passed'%(sum(res),len(res)))
