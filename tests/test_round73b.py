"""Round 73b — Kris's saga feedback in the game (16u-twin-godsbane.js, 07zst, 07zt5): the other twin teaches Godsbane in the village once the
Lodestar is whole (C2), the pier's notch wants the word first, the twin casts with you in the feast hall, the new moments (the first spirit,
the three builders, the Lodestar made) and the World Tree after the end with all forty (C3). Run: python tests/test_round73b.py"""
import os, sys, subprocess, tempfile, shutil
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
with game(painted=True) as g:
    s = g.js("""(()=>{ var B={}; ZSTORY.BEATS.forEach(function(b){ B[b.id]=b; }); var cuts=function(id){ return (B[id].opts||[]).filter(function(o){ return o.kind==='cut'; }).map(function(o){ return o.when; }); };
      return {gb:B.godsbane.truth, bar:cuts('barriers'), tat:B.tattoo.truth, ash:cuts('ashnight'), forg:cuts('forges'), lines:cuts('lines'),
        sets:['firstfree','build1','build2','build3','lodestar','worldtree'].filter(function(k){ return !ZSAGA_SETS[k]; }), tt:!!ZLAST_SETS.twinteach,
        pics:['sc_pn_binders_free','sc_pn_build_bram','sc_pn_build_mira','sc_pn_build_dunn','sc_pn_forges_lodestar','sc_pn_lines_life','sc_pn_twin_teach_m','sc_pn_twin_teach_f','sc_pn_fh_cast_twins','sc_pn_saga_orbs','sc_pn_world_tree','sc_twin_study','sc_fx_lake_tree'].filter(function(id){ return !ZSCN.SHEETS.some(function(S){ return S.id===id&&S.wave===84; }); }),
        scar:JSON.stringify(ZSTORY.BEATS).indexOf('Scarp'), badloc:[].concat.apply([],ZSTORY.BEATS.map(function(b){ return (b.opts||[]).filter(function(o){ return !ZSTORY.LOC[o.loc]; }).map(function(o){ return b.id+':'+o.loc; }); }))}; })()""")
    check('The saga map tells Kris\'s version: the twin teaches Godsbane, three builder cut-scenes, the World Tree after the end, the realm panels with the first spirit',
          'twin' in s['gb'] and len([w for w in s['bar'] if 'freed' in w]) == 3 and 'after the end' in s['tat'] and any('first freed' in w for w in s['ash']) and s['forg'] and len(s['lines']) >= 1 and s['scar'] < 0 and not s['badloc'], s)   # every place is on the Lab's map (a missing one stopped the Lab)
    check('The new panel sets are there, and the 13 round-78 pictures are asked for (wave 84)', not s['sets'] and s['tt'] and not s['pics'], s)
    g.page.wait_for_function('!!game.scene.getScene("World")._twin', timeout=60000)
    t = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, T=ws._twin; return {twin:!!T, talk:!!(T&&T.npc&&T.npc.talk===ZTGB.talk), can:ZTGB.canTeach(ps)}; })()""")
    check('The other twin by the Home answers [Tab] through the lesson (no lesson without the Lodestar)', t['twin'] and t['talk'] and not t['can'], t)
    l = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, got=null, z0=ZSPIRIT.talk; ps.inventory.push('lodestar'); ps.asgardDown=1;
      ZSPIRIT.talk=function(n,c,html,btns){ got={n:n, html:html, b:(btns||[]).map(function(b){ return b.t; })}; if(btns&&btns[0])btns[0].f(); };
      try{ ZTGB.talk(ws); }finally{ ZSPIRIT.talk=z0; } return {got:got, gb:ps.godsbane, from:ps.godsbaneFrom, other:ZTWIN.other(ps).name}; })()""")
    check('With the Lodestar in hand, %s finds the word in the old sagas and teaches GODSBANE' % l['other'], l['got'] and 'GODSBANE' in l['got']['html'] and l['got']['n'] == l['other'] and l['gb'] == 1 and l['from'] == 'twin', l)
    n = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, N=ZASG.notchAt(); if(!N)return {no:1}; ps.godsbane=0; ps.bifrost=0; ws.player.x=N.x; ws.player.y=N.y+8;
      var a=ZASG.check(ws), txt=ws._interactPrompt&&ws._interactPrompt._zt; ps.godsbane=1; if(ws._interactPrompt&&ws._interactPrompt._zsp==='notch'){ ws._interactPrompt.destroy(); ws._interactPrompt=null; } return {a:a, txt:txt||'', bif:!!ps.bifrost}; })()""")
    check('At the pier\'s notch the staff sleeps until you have the word ("%s")' % n.get('txt'), n.get('a') is True and 'word' in n.get('txt', '') and not n.get('bif'), n)
    # the moments: watched once a second; what the game had at load counts as told
    m = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; window._zp=[]; var p0=ZSAGA.play; ZSAGA.play=function(p,k,d){ _zp.push(k); return p0.apply(this,arguments); };
      ws._ztgb=null; ps.inventory=ps.inventory.filter(function(i){ return i!=='lodestar'; }); ps.rescued=[]; ZTGB.tick(); ps.rescued=[1]; ZTGB.tick(); ps.rescued=[1,2]; ZTGB.tick(); ps.inventory.push('lodestar'); ZTGB.tick();
      return _zp.slice(); })()""")
    check('Freeing each builder plays their own crossing (build1, build2), and the Lodestar made plays its panel (%s)' % m, m[:3] == ['build1', 'build2', 'lodestar'], m)
    w = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; window._zp=[]; ps.spiritsFreed=[]; for(var i=0;i<40;i++)ps.spiritsFreed.push('s'+i); ps.spiritsHome=0; ZTGB.tick(); var before=!!ps.worldTree;
      ps.spiritsHome=1; ZTGB.tick(); return {before:before, after:ps.worldTree, plays:_zp.slice()}; })()""")
    check('All forty before the end: nothing yet; after the end: the whole tattoo, then the World Tree under the lake (%s)' % w['plays'], not w['before'] and w['after'] == 1 and 'tattoo' in w['plays'] and 'worldtree' in w['plays'], w)
    d = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, L=ZSAGA.seen(ps), had=L.indexOf('tattoo')>=0, at0=ZSAGA.afterTrace, ran=0; ps.spiritsHome=0; ps.sagaSeen=['firstfree'];
      var inner=null; return {wrapped:/firstfree/.test(String(ZSAGA.afterTrace)), fh:/fhMake/.test(String(FeastHallScene.prototype.create))&&/fhTick/.test(String(FeastHallScene.prototype.update)), ls:(function(){ var on=ZLS.on; ZLS.on=false; try{ ZLS.play(ps,'fh_cast',function(){}); }finally{ ZLS.on=on; } return ZLAST_SETS.fh_cast[0][0]; })(), twinsPainted:!!ZCUT.painted('pn_fh_cast_twins')}; })()""")
    check('The first spirit plays the chains and the line of light first; the feast hall brings your twin and their beam; the cast panel shows you both once painted', d['wrapped'] and d['fh'] and d['ls'] == ('pn_fh_cast_twins' if d['twinsPainted'] else 'pn_fh_cast_{w}'), d)   # pn_fh_cast_twins once painted
    f = g.js("""(()=>{ var ws=game.scene.getScene('World'), c={add:ws.add, tweens:ws.tweens, time:ws.time, worldScene:ws, bx:ws.player.x, by:ws.player.y, ox:ws.player.x, oy:ws.player.y-200};
      ZTGB.fhMake(c); var ok1=!!c._twin; if(ok1){ ZTGB.fhTick(c,0.016); ZTGB.fhCast(c); } var r={twin:ok1, cast:!!(c._twin&&c._twin.cast), ch:c._twin&&c._twin.ch}; if(c._twin)c._twin.im.destroy(); return r; })()""")
    check('In the feast hall your twin (%s) stands beside you and casts with you' % f.get('ch'), f['twin'] and f['cast'], f)
    # the clips (07zvc + 16p): a clip in place of the still; a clip that will not play falls back to the picture
    TMP = tempfile.mkdtemp()
    if shutil.which('ffmpeg'):
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'lavfi', '-i', 'testsrc=size=320x180:rate=24', '-t', '2', '-c:v', 'libvpx-vp9', os.path.join(TMP, 'pn_saga_orbs.webm')])
        open(os.path.join(TMP, 'pn_saga_basket.mp4'), 'wb').write(b'not a video')
        g.page.route('**/assets/video/**', lambda r: r.fulfill(path=os.path.join(TMP, r.request.url.rsplit('/', 1)[1].split('?')[0])) if os.path.isfile(os.path.join(TMP, r.request.url.rsplit('/', 1)[1].split('?')[0])) else r.fulfill(status=404, body=''))
        g.js("(()=>{ ZVIDEO_INDEX={pn_saga_orbs:'pn_saga_orbs.webm', pn_saga_basket:'pn_saga_basket.mp4'}; ZCUT.SETS.saga_vt=[['pn_saga_orbs','Two orbs.'],['pn_saga_basket','The basket.']]; window._zcon=ZCUT.on; ZCUT.on=true; ZCUT.play('saga','vt'); })()")
        g.page.wait_for_function("(()=>{ var v=document.querySelector('.zcut-vid'); return v&&v.readyState>=2&&v.style.opacity==='1'; })()", timeout=30000)
        v = g.js("(()=>{ var el=document.getElementById(ZCUT.ID), v=el.querySelector('.zcut-vid'), im=el.querySelector('.zcut-img'); return {src:v.src.split('/').pop(), playing:!v.paused||v.ended, muted:v.muted, img:im.style.display, cap:el.querySelector('.zcut-cap').textContent}; })()")
        check('A cut-scene panel with a clip plays the clip (muted under the music) with its line (%s)' % v['src'], v['src'] == 'pn_saga_orbs.webm' and v['playing'] and v['muted'] and v['img'] == 'none' and v['cap'] == 'Two orbs.', v)
        g.js("document.getElementById(ZCUT.ID).click()")
        g.page.wait_for_function("(()=>{ var el=document.getElementById(ZCUT.ID); return el&&el.querySelector('.zcut-cap').textContent==='The basket.'; })()", timeout=30000)
        b2 = g.js("(()=>{ var el=document.getElementById(ZCUT.ID), v=el.querySelector('.zcut-vid'), im=el.querySelector('.zcut-img'); return {vid:v.style.display, img:im.style.display, src:(im.src||'').split('/').pop().slice(0,40)}; })()")
        check('A clip that will not play falls back to the painted picture (%s)' % b2['src'], b2['vid'] == 'none' and b2['img'] == '' and b2['src'], b2)
        g.js("(()=>{ var el=document.getElementById(ZCUT.ID); if(el)el.querySelector('.zcut-skip').click(); ZCUT.on=_zcon; })()"); g.wait(800)
    else:
        check('ffmpeg is here (to make the test clip)', False)
    errs = [x for x in g.errs if 'favicon' not in x and '404' not in x and 'MEDIA_ERR' not in x and 'not a video' not in x]
    check('No game script errors', not errs, errs[:4])
# the painted pieces for the game, with stand-in pictures (?scenery=fake): the twin at their books; the World Tree's light under the lake
with game(painted=True, query='?scenery=fake') as g:
    g.page.wait_for_function('!!game.scene.getScene("World")._twin', timeout=60000); g.wait(2500)
    k = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, T=ws._twin, D=ws._twinDesk; var r={fake:ZScn.faked||0, has:ZScn.has('twin_study_'+(ZTWIN.other(ps).ch==='hero_m'?'m':'f')), desk:!!(D&&D.scene), twinHidden:!!(T&&!T.im.visible)};
      ps.spiritsFreed=[]; for(var i=0;i<40;i++)ps.spiritsFreed.push('s'+i); ps.spiritsHome=1; ps.worldTree=1; ZTGB.tick(); ZTGB.tick(); var L=ws._wTree; r.tree=!!(L&&L.scene); r.blend=L&&L.blendMode; r.depth=L&&L.depth;
      r.deskAfter=!!(ws._twinDesk&&ws._twinDesk.scene); r.twinBack=!!(T&&T.im.visible); return r; })()""")
    check('The other twin sits at their books in the village (the painted picture in place of the standing twin)', k['fake'] > 0 and k['has'] and k['desk'] and k['twinHidden'], k)
    check('After the end with all forty: the World Tree\'s light lies under Mirror Lake (added light, under the world), and the twin stands up to celebrate', k['tree'] and k['blend'] == 1 and k['depth'] < 0 and not k['deskAfter'] and k['twinBack'], k)
    errs = [x for x in g.errs if 'favicon' not in x and '404' not in x]
    check('No game script errors (stand-in scenery)', not errs, errs[:4])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
