"""Round 97 — the opening as a video (16w2 ZSC): the first line on its own black screen, then the Kling montage part by part (each frame one
part of the video, cut where the video cuts), the words building under it, the twins' frames as paintings after; the opening's music.
Run: python tests/test_round97.py [shots]"""
import sys, os, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]), flush=True)
SHOTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_shots97') if 'shots' in sys.argv else None
if SHOTS: os.makedirs(SHOTS, exist_ok=True)
def until(g, expr, ms=15000):
    t = time.time()
    while (time.time() - t) * 1000 < ms:
        if g.js(expr): return True
        g.wait(200)
    return False
ST = """(()=>{ var el=document.getElementById('zcut'); if(!el)return null; var v=el.querySelector('.zsc-vid'), sb=el.querySelector('.zcut-sb'), p=el.querySelector('.zsc-panel'), cap=el.querySelector('.zcut-cap');
  return {panel:!!(p&&p.classList.contains('show')), ptext:p?p.textContent:'', vid:!!(v&&v.style.display!=='none'&&v.style.opacity==='1'), t:v?Math.round(v.currentTime*100)/100:null, paused:v?v.paused:null, rate:v?v.playbackRate:null,
    sb:!!(sb&&sb.style.display!=='none'&&sb.style.opacity==='1'), words:cap?cap.querySelectorAll('.zsc-w').length:0, cap:cap?cap.textContent:'', n:(el.querySelector('.zcut-n')||{}).textContent, story:el.classList.contains('zsc-story'), key:ZCUT._key}; })()"""
SPACE = "(()=>{ document.dispatchEvent(new KeyboardEvent('keydown',{key:' ',bubbles:true})); return 1; })()"
with game(painted=True, w=1280, h=720) as g:
    g.wait(3500)
    g.js("(()=>{ ZCUT.on=true; var ps=game.scene.getScene('World').playerState; ps.sagaSeen=[]; ps.sagaQ=[]; ZSQ.now(ps,'opening'); })()")
    g.wait(1200); a = g.js(ST)
    check('The opening starts on its first line, alone on a black screen (%s)' % (a and a['ptext']), a and a['panel'] and a['story'] and 'World Tree' in a['ptext'] and not a['vid'], a)
    if SHOTS: g.shot(os.path.join(SHOTS, '1_panel.png'))
    ok = until(g, "(()=>{ var v=document.querySelector('#zcut .zsc-vid'); return !!(v&&v.style.opacity==='1'&&!v.paused&&v.currentTime>0.3); })()", 16000)
    b = g.js(ST)
    check('…then the Kling video plays its first part, with no line under it (the line was on the black screen) (%s)' % b, ok and b['vid'] and b['t'] < 6.75 and not b['words'] and not b['cap'].strip(), b)
    if SHOTS: g.shot(os.path.join(SHOTS, '2_video.png'))
    g.js(SPACE); g.wait(2600); c = g.js(ST)
    check('Space: the second part — the video from its cut at 6.75 s, the words building under it (%s)' % c, c['vid'] and 6.7 <= c['t'] < 13.6 and c['words'] >= 1 and 'quiet' in c['cap'], c)
    if SHOTS: g.shot(os.path.join(SHOTS, '3_words.png'))
    g.js(SPACE); g.wait(300); g.js(SPACE); g.wait(300); g.js(SPACE); g.wait(2500); d = g.js(ST)
    check('The storm part plays slowed until its line can be read (rate %s), from its own cut (%s)' % (d['rate'], d['t']), d['vid'] and 28.9 <= d['t'] < 33.4 and 0.6 <= d['rate'] < 1 and 'storm' in d['cap'], d)
    g.js(SPACE); g.wait(300); g.js(SPACE); g.wait(2500); e = g.js(ST)
    check('After the video: the twins\' frames as paintings, words building under them (%s)' % e, not e['vid'] and e['sb'] and e['words'] >= 1 and str(e['n']).startswith('7 /'), e)
    if SHOTS: g.shot(os.path.join(SHOTS, '4_painting.png'))
    m = g.js("ZAUDIO.cutCue(ZCUT._key)")
    check('The opening\'s own music plays under it (%s); the video is muted' % m, m == 'mu_saga_storm' and g.js("document.querySelector('#zcut .zsc-vid').muted"), m)
    g.page.keyboard.press('Escape'); g.wait(1200)
    check('Skip ends it', not g.js("!!document.getElementById('zcut')"))
    f = g.js("(()=>{ ZSC.on=false; var r=ZSC.seg('sb:opening:sb_opening_01'); ZSC.on=true; return {off:r, on:ZSC.seg('sb:opening:sb_opening_03'), seven:ZSC.seg('sb:opening:sb_opening_07_m')}; })()")
    check('Frames 1–6 map to the video\'s parts, 7–12 do not; the switch turns it off (%s)' % f, f['off'] is None and f['on'] and f['on']['a'] == 13.583 and f['seven'] is None, f)
    E = [x for x in g.errs if '404' not in x and 'decode audio' not in x]
    check('No script errors', not E, E[:3])
print('%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
