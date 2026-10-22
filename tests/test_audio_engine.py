"""Round 72 — Kris's answer O2: the sound engine for the made files (04c2-audio-files.js). Stand-in tones (ffmpeg) play the part of the
Suno and ElevenLabs files. Run: python tests/test_audio_engine.py"""
import os, sys, json, subprocess, tempfile
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
HERE = os.path.dirname(os.path.abspath(__file__))
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:400] if info != '' else ''), flush=True)
T = tempfile.mkdtemp(prefix='zaud_')
def tone(base, hz, secs, stereo=False):
    for ext, codec in (('ogg', 'libvorbis'), ('mp3', 'libmp3lame')):
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'sine=frequency=%d:duration=%s' % (hz, secs), '-ac', '2' if stereo else '1', '-c:a', codec, os.path.join(T, base + '.' + ext)], check=True)
IDX = {}
def add(cid, kind, loop, secs, hz, takes=('',)):
    for t in takes:
        b = cid + ('.' + t if t else ''); tone(b, hz, secs, kind == 'music')
        IDX.setdefault(cid, {'kind': kind, 'loop': loop, 'files': []})['files'].append({'base': b, 'secs': secs, 'ls': 0.2 if loop and kind == 'music' else 0, 'le': 1.6 if loop and kind == 'music' else secs})
add('mu_village_day', 'music', True, 3, 330); add('mu_fight', 'music', True, 3, 440); add('mu_dungeon', 'music', True, 3, 220); add('mu_title', 'music', True, 3, 262)
add('am_village', 'amb', True, 2, 150); add('am_cave', 'amb', True, 2, 120)
add('sfx_sword_hit', 'sfx', False, 0.3, 900, takes=('', 'b')); add('st_quest', 'sting', False, 1, 660)
json.dump(IDX, open(os.path.join(T, 'index.json'), 'w'))
def serve(r):
    f = os.path.join(T, r.request.url.split('assets/audio/', 1)[1].split('?')[0])
    if os.path.isfile(f): return r.fulfill(path=f)
    g2 = os.path.join(HERE, '..', 'assets', 'audio', r.request.url.split('assets/audio/', 1)[1].split('?')[0])   # the game's own made sounds (round 73), when a test sound has none
    return r.fulfill(path=g2) if os.path.isfile(g2) else r.fulfill(status=404, body='')
with game() as g:
    r = g.js("({idx:ZAUDIO.idx, on:ZAUDIO.on})")
    check('The made sounds\' index is in the page (no request for it; %s sounds)' % (len(r['idx'] or {})), r['on'] and (r['idx'] is None or len(r['idx']) > 20), len(r['idx'] or {}))
    g.js("ZSFX.play('hit')")
    g.page.route('**/assets/audio/**', serve)
    g.js("(()=>{ ZAUDIO_INDEX=null; history.replaceState(null,'','?audio=fetch'); ZAUDIO.load(); })()"); g.key('ArrowRight', 80); g.page.wait_for_function('!!ZAUDIO.idx', timeout=30000); g.wait(300)
    r = g.js("({n:ZAUDIO.idx&&Object.keys(ZAUDIO.idx).length, unl:ZSFX._unlocked, ext:ZAUDIO.ext()})")
    check('The index is read and the sound unlocks on the first key (%s files, %s)' % (r['n'], r['ext']), r['n'] == len(IDX) and r['unl'], r)
    # the village by day → its music and ambience
    g.js("(()=>{ var ws=game.scene.getScene('World'); ws._night=0; ZAUDIO.tick(); })()"); g.wait(2600); g.js("ZAUDIO.tick()"); g.wait(1500)
    r = g.js("""(()=>{ var M=ZAUDIO.mus, e=M&&M.els[M.cur]; return {d:ZAUDIO.decide(), cue:ZAUDIO.cue, amb:ZAUDIO.amb&&ZAUDIO.amb.id, loop:ZAUDIO.amb&&ZAUDIO.amb.s.loop, playing:!!(e&&!e.paused), t:e&&e.currentTime}; })()""")
    check('In the village by day the director plays its music and ambience (%s, %s)' % (r['cue'], r['amb']), r['cue'] == 'mu_village_day' and r['amb'] == 'am_village' and r['loop'] and r['playing'], r)
    # the loop: past loopEnd (1.6 s) the other element takes over at loopStart
    g.wait(2500)
    r = g.js("(()=>{ var M=ZAUDIO.mus; return {cur:M.cur, els:M.els.length, t:M.els[M.cur].currentTime, paused:M.els[M.cur].paused}; })()")
    check('A looping piece joins its ends: the second player takes over at the loop point (%s)' % r, r['els'] == 2 and not r['paused'] and r['t'] < 1.7, r)
    # night with no night file → the fallback chain
    r = g.js("(()=>{ var ws=game.scene.getScene('World'); ws._night=1; var d=ZAUDIO.decide(); ws._night=0; return {d:d.m, pick:ZAUDIO.pick(d.m), none:ZAUDIO.pick('mu_grass_day')}; })()")
    check('A cue with no file yet falls back to its nearest kin (%s → %s), or to the procedural music (none: %s)' % (r['d'], r['pick'], r['none']), r['d'] == 'mu_village_night' and r['pick'] == 'mu_village_day' and r['none'] is None, r)
    # a fight
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), p=ws.player, m=(ws.worldMonsters||[]).filter(function(m){ return m&&!m.dead; })[0]; if(!m)return {none:1}; m._sx=m.x; m._sy=m.y; m.x=p.x+80; m.y=p.y; m._engT=Date.now(); var d=ZAUDIO.decide(); m.x=m._sx; m.y=m._sy; m._engT=0; return {m:d.m, fast:d.fast}; })()""")
    check('A monster in the fight brings in the fight music, fast (%s)' % r, r.get('m') == 'mu_fight' and r.get('fast'), r)
    ZAUDIO_fight = g.js("ZAUDIO._fightT=0")
    # effects: the file plays (after its first fetch) and the takes alternate
    g.js("ZSFX.play('hit')"); g.page.wait_for_function("Object.keys(ZAUDIO.buf).filter(function(u){ return /sword_hit/.test(u); }).length===2", timeout=30000)
    r = g.js("(()=>{ var a=ZAUDIO.play('sfx_sword_hit'), k1=ZAUDIO._var.sfx_sword_hit, b=ZAUDIO.play('sfx_sword_hit'), k2=ZAUDIO._var.sfx_sword_hit; return {a:a,b:b,k1:k1,k2:k2}; })()")
    check('An effect plays from its file and alternates its takes (%s)' % r, r['k1'] != r['k2'] and (r['a'] or r['b']), r)
    g.wait(500)
    r = g.js("(()=>{ var n=0, p=ZAUDIO.play; ZAUDIO.play=function(id){ var x=p.apply(this,arguments); if(x)n++; return x; }; ZSFX.play('hit'); ZSFX.play('hit'); ZAUDIO.play=p; return n; })()")
    check('ZSFX.play(\'hit\') uses the file instead of the made-up sound (%d of 2)' % r, r == 2, r)
    r = g.js("(()=>{ var n=0, p=ZAUDIO.play; ZAUDIO.play=function(id){ var x=p.apply(this,arguments); if(x)n++; return x; }; ZSFX.play('roar'); ZAUDIO.play=p; return n; })()")
    check('A sound with no file still plays the procedural one (roar → %d files)' % r, r == 0, r)
    # a quest stinger ducks the music
    g.js("ZAUDIO.play('st_quest')"); g.page.wait_for_function("Object.keys(ZAUDIO.buf).some(function(u){ return /st_quest/.test(u); })", timeout=30000)
    r = g.js("(()=>{ var ok=ZAUDIO.play('st_quest'); return {ok:ok, g:ZAUDIO.bus.music.gain.value}; })()"); g.wait(300)
    r2 = g.js("ZAUDIO.bus.music.gain.value")
    check('A stinger plays over the music and ducks it (%s → %.2f)' % (r, r2), r['ok'] and r2 < 0.6, [r, r2])
    # a dungeon
    g.js("(()=>{ var ws=game.scene.getScene('World'); var s=ws.wd.sites.find(function(q){ return /dungeon/.test(q.type)&&!/island/.test(q.id||''); }); ws.scene.launch('Dungeon',{site:s,floor:0,maxFloors:2,worldScene:ws,theme:'dungeon'}); ws.scene.pause('World'); })()"); g.page.wait_for_function("game.scene.isActive('Dungeon')", timeout=30000); g.wait(1500)
    r = g.js("(()=>{ var d=ZAUDIO.decide(); return d&&{m:d.m,a:d.a}; })()")
    check('In a dungeon the director picks the dungeon music and the cave ambience (%s)' % r, r and r['m'] == 'mu_dungeon' and r['a'] == 'am_cave', r)
    g.js("(()=>{ game.scene.stop('Dungeon'); game.scene.resume('World'); })()"); g.wait(800)
    # the volume panel
    g.js("document.getElementById('mute-btn').dispatchEvent(new MouseEvent('contextmenu',{bubbles:true,cancelable:true}))"); g.wait(200)
    r = g.js("(()=>{ var p=document.getElementById('zaud-panel'); if(!p)return null; var i=p.querySelector('input[data-k=music]'); i.value=40; i.dispatchEvent(new Event('input')); return {n:p.querySelectorAll('input[type=range]').length, v:ZAUDIO.vol.music, saved:JSON.parse(localStorage.getItem('zeldara_vol')).music, bus:ZAUDIO.bus.music.gain.value}; })()")
    check('Right-click 🔊 opens the volumes: music, ambience, effects — saved for next time (%s)' % r, r and r['n'] == 3 and abs(r['v'] - 0.4) < 0.01 and abs(r['saved'] - 0.4) < 0.01, r)
    g.js("ZSFX.toggleMute()"); g.wait(200)
    r = g.js("({m:ZSFX.muted, p:ZAUDIO.play('sfx_sword_hit')})")
    check('A click on 🔊 still mutes everything, the files too (%s)' % r, r['m'] and not r['p'], r)
    g.js("ZSFX.toggleMute()")
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No game script errors', not errs, errs[:4])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
