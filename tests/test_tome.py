"""The Zeldara Tome: opens with T and the Tome button, lists every category with
found / total counts, ??? silhouettes with hints until discovered, fills in
on meeting a monster / owning a mount / visiting a place, and is saved."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  -> ' + str(info)), flush=True)
with game(new=True) as g:
    g.wait(800)
    g.key('t', 80); g.wait(500)
    r = g.js("({open:document.getElementById('modal-tome')&&document.getElementById('modal-tome').style.display, tabs:[...document.querySelectorAll('#tome-tabs button')].map(b=>b.textContent), cards:document.querySelectorAll('.tome-card').length, locked:document.querySelectorAll('.tome-card.locked').length})")
    check('T opens the Tome with 8 categories (Quests added)', r['open'] == 'flex' and len(r['tabs']) == 8, r)
    check('Monsters: all 240 + 56 bosses (guardians, evolved forms, castle wardens) listed, locked as ??? at the start', r['cards'] == 296 and r['locked'] >= 240, r)
    g.js("document.querySelector('.tome-card.locked').click()")
    h = g.js("document.getElementById('tome-detail').innerText")
    check('A locked entry shows ??? and a hint where to look', '???' in h and 'Found' in h, h[:120])
    g.key('Escape', 60); g.wait(200)
    # meet a monster: spawn one next to the player
    g.js("""(()=>{ var ws=game.scene.getScene('World'), p=ws.player; ws.worldMonsters.forEach(m=>m.cont.destroy()); ws.worldMonsters=[]; ws.playerState.unlockedSections=[1,2,3,4];
      var w=ws.wd.waystones.find(x=>x.region===1); p.x=w.x*TILE+16; p.y=(w.y+6)*TILE+16; p.cont.setPosition(p.x,p.y); ws._spawnRosterMon('thistle_hog',p.x+120,p.y,1,new PRNG(3),{}); })()""")
    g.wait(2500)
    r2 = g.js("({seen:!!(game.scene.getScene('World').playerState.tome.monster.thistle_hog), notif:[...document.querySelectorAll('.notif')].map(n=>n.textContent).join(' | ')})")
    check('Meeting a monster writes it into the Tome (with a notification)', r2['seen'] and 'Tome' in r2['notif'], r2)
    g.js("(()=>{ var ps=game.scene.getScene('World').playerState; ps.ownedMounts=(ps.ownedMounts||[]).concat(['horse']); })()")
    g.js("document.getElementById('tome-btn').click()"); g.wait(400)
    g.js("document.querySelector('[data-tcat=\"mount\"]').click()"); g.wait(200)
    m = g.js("({tab:document.querySelector('[data-tcat=\"mount\"]').textContent, open:[...document.querySelectorAll('.tome-card')].filter(c=>!c.classList.contains('locked')).map(c=>c.textContent)})")
    check('The Tome button opens it; owned mounts are written in', 'Horse' in ' '.join(m['open']) and '1 /' in m['tab'], m)
    g.js("document.querySelector('[data-tcat=\"monster\"]').click()"); g.wait(150)
    g.js("document.querySelector('[data-tid=\"thistle_hog\"]').click()"); g.wait(400)
    d = g.js("({txt:document.getElementById('tome-detail').innerText, spr:!!document.getElementById('tome-big')})")
    check('A found monster shows its sprite, looks, moves, attacks, defence and tips', d['spr'] and 'Thistle Hog' in d['txt'] and 'Defends' in d['txt'] and 'Special' in d['txt'], d['txt'][:200])
    g.key('Escape', 60)
    g.js("game.scene.getScene('World')._save()")
    sv = g.js("JSON.parse(localStorage.getItem('qoz_v2')).tome")
    check('The Tome is saved with the game', sv and sv.get('monster', {}).get('thistle_hog') and sv.get('mount', {}).get('horse'), sv and list(sv.keys()))
    check('No JS errors', not g.errs, g.errs[:4])
print('%d/%d' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
