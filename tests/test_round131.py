"""Round 131: the ceremonies Kris picked (the mana arc from the sanctum, the ring's flash, Brask's and Morwen's drills), the sound picks and
the third remake's words, the world take 4 in the Lab.
python tests/test_round131.py   (after node build.mjs)"""
import sys, os, re, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
RM = json.load(open(os.path.join(R, 'sprites', 'requests', 'sfx_remake.json'), encoding='utf-8'))
check('Third remake: 42 effects, take "z", up to five to choose from each (%d takes)' % sum(len(v['words']) for v in RM['items'].values()), RM['take'] != 'z' or (len(RM['items']) == 42 and all(2 <= len(v['words']) <= 5 for v in RM['items'].values())))   # round 136 replaced the remake (take 'q'); this check is for take 'z'
if RM['take'] == 'z':   # round 136 replaced the remake (take 'q')
    check('…the words follow Kris\'s notes (stew and bread, a big wave, little music, lava, a berserker feeling alive)', any('stew' in w for w in RM['items']['sfx_eat']['words']) and sum('wave' in w or 'splash' in w for w in RM['items']['sfx_fam_water']['words']) >= 4 and any('fiddle' in w for w in RM['items']['sfx_feast']['words']) and any('molten' in w for w in RM['items']['sfx_lava']['words']) and any('alive' in w or 'invincible' in w or 'exhilarated' in w for w in RM['items']['sfx_sk_berserker']['words']))
SP = json.load(open(os.path.join(R, 'sprites', 'requests', 'sound_picks.json'))); WAS = json.load(open(os.path.join(R, 'sprites', 'requests', 'sound_picks_was131.json')))
ch = [k for k in SP if SP[k] != WAS.get(k)]
check('Sound picks: %d effects changed to Kris\'s ★ (e.g. chain lightning %s, starfall %s)' % (len(ch), SP['sfx_sp_chain_lightning'], SP['sfx_sp_starfall']), len(ch) >= 70 and SP['sfx_sp_chain_lightning'] == 'y1+y4' and SP['sfx_sp_starfall'] == 'y3+y5')
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    g.js("ZCER.on=true; ZAIM129.on=true; ZTEACH.on=true; ['ZAIM','ZDRAW'].forEach(k=>window[k].on=true);")
    g.js("(()=>{ var ps=%s.playerState; ps.equip.spell=null; ps.spellsLearned=[]; ps.inventory=(ps.inventory||[]).filter(i=>!(ITEMS[i]&&ITEMS[i].spellId)); ps.manaShown=false; ps.aimSeen=false; ps.cer={bow:0,spell:0}; ps.equip.rHand=null; ZHUD._sig=''; ZHUD.tick(); })()" % WS); g.wait(400)
    g.js("(()=>{ var ps=%s.playerState; ps.equip.spell='frost_bolt_tome'; ZHUD._sig=''; ZHUD.tick(); })()" % WS); g.wait(500)
    m1 = g.js("({runes:document.querySelectorAll('.zcer-rune').length, dim:!!document.querySelector('.zcer-dim'), wait:document.querySelector('#zhud .zh-mana').classList.contains('zm-wait')})")
    g.wait(2600)
    m2 = g.js("({bloom:document.querySelector('#zhud .zh-mana').classList.contains('zm-bloom'), cap:(document.querySelector('.zcer-cap')||{}).textContent||'', runes:document.querySelectorAll('.zcer-rune').length, fill:document.querySelector('#zhud .zh-mana').classList.contains('zm-fill')})")
    check('First spell: the runes circle the hero and fly to the corner (arc held back), then it blooms, named by the tome; colour by fullness (%s %s)' % (m1, m2), m1['runes'] == 8 and m1['dim'] and m1['wait'] and m2['bloom'] and 'well of mana' in m2['cap'] and m2['runes'] == 0 and m2['fill'], (m1, m2))
    g.wait(4500)
    # the ring: a flash on the first lock, then Morwen sends for you
    g.js("""(()=>{ var ws=%s, ps=ws.playerState, X=ws.wd.spawnX, Y=ws.wd.spawnY; var m=ws.worldMonsters.filter(m=>!m.dead).sort((a,b)=>Math.hypot(a.x-X,a.y-Y)-Math.hypot(b.x-X,b.y-Y))[0]; m.x=X; m.y=Y-120; if(m.cont)m.cont.setPosition(m.x,m.y); m.hp=m.maxHp=99999;
      ws.player.x=X; ws.player.y=Y+60; ws.player.dir='up'; window._m=m; window._pin=setInterval(function(){ m.x=X; m.y=Y-120; if(m.cont)m.cont.setPosition(m.x,m.y); },16); })()""" % WS)
    g.wait(2500)
    r = g.js("(()=>{ var ps=%s.playerState, c=document.querySelector('.zcard.zc-hint:not(.out)'); return {seen:ps.aimSeen, cer:ps.cer, card:c&&c.textContent.slice(0,120)}; })()" % WS)
    check('The ring appears with its flash; Morwen sends for you (%s)' % r, r['seen'] and r['cer']['spell'] == 1 and r['card'] and 'Morwen' in r['card'], r)
    g.js("clearInterval(window._pin); ZCARD.close()")
    # the drill at Morwen's door
    d = g.js("""(()=>{ var ws=%s, sp=ZTEACH.spot(ws,'spell'); if(!sp)return null; ws.player.x=sp.x; ws.player.y=sp.y+20; ws.player.dir='up'; ws.worldMonsters.forEach(function(m){ if(Math.hypot(m.x-sp.x,m.y-sp.y)<500){ m.x+=1500; if(m.cont)m.cont.x+=1500; } }); ZTEACH.tick(); return {L:!!ZTEACH.L, k:ZTEACH.L&&ZTEACH.L.k}; })()""" % WS)
    for _ in range(8):
        if g.js("!!(typeof ZDLG!=='undefined'&&ZDLG.open)"): g.page.keyboard.press('Space'); g.wait(500)
        else: break
    g.wait(600)
    t = g.js("({n:ZTEACH.targets.length, drill:!!document.querySelector('.zcard.zc-drill'), lock:!!(ZAIM129.lock&&ZAIM129.lock.isTarget)})")
    check('At Morwen\'s door: her words, three practice wisps, the drill card, and the ring finds a wisp (%s %s)' % (d, t), d and d['L'] and t['n'] == 3 and t['drill'] and t['lock'], (d, t))
    g.js("(()=>{ var ws=%s; ws.playerState.mana=ws.playerState.maxMana; ZAIM.press(ws,{}); ZAIM.release(); })()" % WS); g.wait(3300)
    g.js("(()=>{ var ws=%s; ws.playerState.mana=ws.playerState.maxMana; ZAIM.press(ws,{}); ZAIM.cur.t0-=900; ZAIM.release(); })()" % WS); g.wait(3300)
    g.js("(()=>{ var ws=%s; ws.playerState.mana=ws.playerState.maxMana; ZAIM.press(ws,{}); ZAIM.cur._sw=1; ZAIM.release(); })()" % WS); g.wait(800)
    for _ in range(4):
        if g.js("!!(typeof ZDLG!=='undefined'&&ZDLG.open)"): g.page.keyboard.press('Space'); g.wait(500)
    e = g.js("(()=>{ var ps=%s.playerState; return {cer:ps.cer, L:!!ZTEACH.L, n:ZTEACH.targets.length, pot:(ps.inventory||[]).filter(i=>i==='pot_mana').length}; })()" % WS)
    check('Tap, a full charge, a switch: the drill is done, the wisps go, a mana draught as reward (%s)' % e, e['cer']['spell'] == 2 and not e['L'] and e['n'] == 0 and e['pot'] >= 1, e)
    E = [x for x in g.errs if 'Failed to load resource' not in x and 'decode audio' not in x]
    check('No game errors', not E, E[:3])
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/lab.artifact.html"); pg.wait_for_timeout(3000)
    a = pg.evaluate("LAB_ACTIVE.slice()")
    pg.evaluate("LTODO.goTo('worldlook4','.w4-c',0)"); pg.wait_for_timeout(800)
    c = pg.evaluate("({cards:document.querySelectorAll('.w4-c').length, vids:document.querySelectorAll('.w4-c video').length, imgs:document.querySelectorAll('.w4-c img').length, blobs:[...document.querySelectorAll('.w4-c video')].every(v=>/_blob/.test(v.getAttribute('src')))})")
    check('Lab → The world, revamped 4: four cards, 8 clips and 15 pictures from the asset store (decided round 134: in the drop-down) (%s; tabs %s)' % (c, a), c['cards'] == 4 and c['vids'] == 8 and c['imgs'] == 15 and c['blobs'] and 'worldlook4' not in a and 'worldlook3' not in a and 'ceremony' not in a, (c, a))
    k = pg.evaluate("Object.keys(ZAUD.REMAKE131.items).length")
    check('Lab → Sound effects knows the third remake (%s)' % k, k == 42, k)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
