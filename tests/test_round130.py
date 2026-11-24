"""Round 130: the mana arc hidden until a spell (and its reveal), the gold ring only with a ranged weapon or spell; wave 1 of "playing and
coming back" (safety saves, soft lessons, the stuck hint, site times, the morning line, our promise, the one-step new game); the seasons
painted again (requests); the Lab's ceremonies tab.
python tests/test_round130.py   (after node build.mjs)"""
import sys, os, re, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
Q = {q['id']: q for q in json.load(open(os.path.join(R, 'sprites', 'requests', 'scenery.json'), encoding='utf-8'))['requests']}
L = [l.strip() for l in open(os.path.join(R, 'sprites', 'requests', 'r130_seasons_redo.txt')) if l.strip() and not l.startswith('#')]
t = lambda k: Q[k]['body']
check('Seasons painted again: 9 sheets listed, each with its new words (%d)' % len(L), len(L) == 9 and all(k in Q for k in L), L)
check('…autumn pines stay evergreen, colours vary (no "everything orange"); thaw fields are seedlings; winter fields are bare rows',
      'stays fully EVERGREEN' in t('sc_seas_au_trees_3') and 'butter-yellow' in t('sc_seas_au_trees_2') and 'scarlet' in t('sc_seas_au_trees_1') and 'NO grown wheat' in t('sc_seas_th_plants_3') and 'NO vegetables' in t('sc_seas_th_vprops_3') and 'HARVESTED' in t('sc_seas_wi_plants_3'))
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    g.js("ZCER.on=true; ZAIM129.on=true;")
    h = g.js("(()=>{ var ps=%s.playerState; ps.equip.spell=null; ps.spellsLearned=[]; ps.inventory=(ps.inventory||[]).filter(i=>!(ITEMS[i]&&ITEMS[i].spellId)); ps.manaShown=false; ps.aimSeen=false; ps.equip.rHand=null; ZHUD._sig=''; ZHUD.tick(); var M=document.querySelector('#zhud .zh-mana'); return {hid:getComputedStyle(M).display==='none', armed:ZAIM129.armed()}; })()" % WS)
    g.wait(800)
    r = g.js("({lock:!!ZAIM129.lock, ring:!!(ZAIM129.ring&&ZAIM129.ring.active)})")
    check('No spell: no mana arc; no bow or spell: no gold ring (%s %s)' % (h, r), h['hid'] and h['armed'] == '' and not r['ring'], (h, r))
    g.js("(()=>{ var ps=%s.playerState; ps.equip.spell='frost_bolt_tome'; ZHUD._sig=''; ZHUD.tick(); })()" % WS); g.wait(600)
    m = g.js("(()=>{ var ps=%s.playerState, M=document.querySelector('#zhud .zh-mana'); return {vis:getComputedStyle(M).display!=='none', shown:ps.manaShown, pt:!!document.querySelector('.zcer-pt'), drift:M.classList.contains('zm-drift'), aim:ps.aimSeen}; })()" % WS)
    check('A spell in hand: the arc appears (once), a pointer explains it, it shimmers (drift); the ring is introduced (%s)' % m, m['vis'] and m['shown'] and m['pt'] and m['drift'] and m['aim'], m)
    # safety saves
    sv = g.js("""(()=>{ ZLEAVE.on=true; var k=ZSave.key(); localStorage.removeItem(k+'_safety'); var ws=%s; ws._save(); var main=JSON.parse(localStorage.getItem(k)); ws.playerState.gold=main.gold+777;
      var ok=ZSAFE.write(); var raw=ZSave.read(), d=JSON.parse(raw); var r={ok:ok, newer:d.gold===main.gold+777};
      ws._save(); r.dropped=!localStorage.getItem(k+'_safety'); ZLEAVE.on=false; return r; })()""" % WS)
    check('Safety save: written beside the real one; Continue reads the newer; a real save drops it (%s)' % sv, sv['ok'] and sv['newer'] and sv['dropped'], sv)
    # soft lessons
    g.js("(()=>{ ZLES.on=true; ZLESOFT.on=true; var ps=%s.playerState; ps.lessonsOff=0; delete ZLES.seen(ps).camp; ZLES._lastT=0; ZLES.calm=function(){ return true; }; })()" % WS)
    sl = g.js("(()=>{ var r=ZLES.teach('camp'); var c=document.querySelector('.zcard.zc-les:not(.out)'); return {r:r, card:!!c, txt:c&&c.textContent.slice(0,60), dlg:!!(typeof ZDLG!=='undefined'&&ZDLG.open)}; })()")
    check('A small lesson is a card under the little map — the game does not pause (%s)' % sl, sl['card'] and not sl['dlg'] and 'Camps' in (sl['txt'] or ''), sl)
    g.js("ZCARD.close()"); g.wait(400)
    big = g.js("(()=>{ var ps=%s.playerState; delete ZLES.seen(ps).sites; ZLES._lastT=0; ZLES.teach('sites'); return {dlg:!!(typeof ZDLG!=='undefined'&&ZDLG.open), card:[...document.querySelectorAll('.zcard.zc-les:not(.out)')].some(c=>/Treasure sites/.test(c.textContent))}; })()" % WS)
    check('…one of the five big ones still pauses in the dialogue box (%s)' % big, big['dlg'] and not big['card'], big)
    g.js("try{ ZDLG.close&&ZDLG.close(); }catch(e){}"); g.key('Escape', 50); g.wait(400)
    # stuck
    st = g.js("(()=>{ ZCARD.close(); ZSTUCK.on=true; var ps=%s.playerState; ps.hintAsked={}; ps.pathT=601; ZSTUCK.tick(); var c=document.querySelector('.zcard.zc-hint:not(.out)'); var t1=c&&c.textContent; if(c)c.querySelector('.zc-b button').click(); var c2=document.querySelector('.zcard.zc-hint:not(.out)'); return {t1:t1&&t1.slice(0,70), t2:c2&&c2.textContent.slice(0,90)}; })()" % WS)
    g.wait(400)
    st2 = g.js("(()=>{ ZCARD.close(); var ps=%s.playerState; ZSTUCK.tick(); return !!document.querySelector('.zcard.zc-hint:not(.out)'); })()" % WS)
    check('Stuck ten minutes: Oswin offers a hint; yes → the road; not asked twice for the same stall (%s %s)' % (st, st2), st['t1'] and 'Lost' in st['t1'] and st['t2'] and 'Your road' in st['t2'] and not st2, (st, st2))
    # site time
    stt = g.js("(()=>{ var ws=%s, S=ws.wd.sites, a=S.find(s=>s.mage), b=S.find(s=>!s.mage&&!s.boss&&(s.type==='tower'||s.type==='dungeon')), c=S.find(s=>s.boss&&!s.mage); ws.playerState.siteTimes={}; if(b)ws.playerState.siteTimes[b.id]=545; return [a&&ZSITET.tag(a,ws.playerState), b&&ZSITET.tag(b,ws.playerState), c&&ZSITET.tag(c,ws.playerState)]; })()" % WS)
    check('Sites show their usual length — mage tower ≈ 12, treasure site ≈ 8 (and your own time), boss ≈ 15 (%s)' % stt, '12 min' in (stt[0] or '') and '≈ 8 min (yours: 9 min)' in (stt[1] or '') and '15 min' in (stt[2] or ''), stt)
    # next hook
    hk = g.js("(()=>{ ZCARD.close(); ZHOOK.on=true; var ps=%s.playerState; ZHOOK.slept=ps.slept||0; ps.slept=(ps.slept||0)+1; ZHOOK.tick(); return 1; })()" % WS)
    g.wait(1900)
    hk = g.js("(()=>{ var c=document.querySelector('.zcard.zc-hook:not(.out)'); return c&&c.textContent.slice(0,90); })()")
    check('Waking in your bed: one line of what is waiting (%s)' % hk, hk and 'this morning' in hk, hk)
    E = [e for e in g.errs if 'Failed to load resource' not in e and 'decode audio' not in e]
    check('No game errors', not E, E[:3])
with game(painted=False, new=None, w=1280, h=720) as g:
    g.wait(2500)
    pl = g.js("(()=>{ ZPLEDGE.tick(); var b=document.getElementById('zpledge-btn'); return !!b&&b.style.display!=='none'; })()")
    g.js("ZPLEDGE.open()"); g.wait(200)
    pt = g.js("document.querySelector('#zp-modal .zpl')&&document.querySelectorAll('#zp-modal .zpl li').length")
    check('The title shows "Our promise" — five promises (%s, %s)' % (pl, pt), pl and pt == 5, (pl, pt))
    g.js("ZProfilesUI.newGame(function(n){ window._started=n; })"); g.wait(400)
    f = g.js("({name:!!document.getElementById('zp-name'), heroes:document.querySelectorAll('.zp-hero').length, diff:document.querySelectorAll('#zp-diff .zdiff-b').length, h2:document.querySelector('#zp-modal h2').textContent})")
    g.js("document.querySelector('.zp-hero[data-h=\"f\"]').click(); document.getElementById('zp-name').value='Tester'; document.getElementById('zp-begin').click();"); g.wait(300)
    s = g.js("({started:window._started, cur:ZSave.current, hero:ZSave.pendingHero, who:(ZSave.currentPlayer()||{}).name})")
    check('New game is one step: name, hero and difficulty on one form; Begin Quest starts in the first free slot (%s · %s)' % (f, s), f['name'] and f['heroes'] == 2 and f['diff'] == 4 and s['started'] is True and s['cur'] and s['cur']['slot'] == 1 and s['who'] == 'Tester' and s['hero'] == 'f', (f, s))
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
    a = pg.evaluate("LAB_ACTIVE.slice(0,3)")
    pg.evaluate("LTODO.goTo('ceremony','.cr-c',0)"); pg.wait_for_timeout(800)
    c = pg.evaluate("({cards:document.querySelectorAll('.cr-c').length, frames:document.querySelectorAll('.cr-f svg').length, demos:document.querySelectorAll('.cr-demo').length, opts:document.querySelectorAll('.cr-r0').length})")
    check('Lab → First spell & first bow: 4 ways for the mana arc, 4 for the ring, each a 3-step storyboard; live shimmer, reveal and ring looks (%s, tabs %s)' % (c, a), a[1] == 'ceremony' and c['cards'] == 8 and c['frames'] == 24 and c['demos'] == 10 and c['opts'] == 5, (c, a))
    pg.evaluate("LTODO.goTo('seasonsall','.sa-g',0)"); pg.wait_for_timeout(800)
    n = pg.evaluate("[...document.querySelectorAll('.sa-ev')].filter(e=>/painted again/.test(e.textContent)).length")
    check('Lab → All the seasons: the groups you sent back say they are being painted again (%d)' % n, n >= 5, n)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
