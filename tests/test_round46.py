"""Round 46 — Kris's Oct 11 list: lag (terrain pieces cut to about a third, chunk painting sliced into small steps, off-screen chunks parked
instead of repainted, the behind-things outline drawn on the GPU); behind buildings and trees only the covered part of the hero is hidden, with a
thin outline; the blocked part of a building is 60% of it; doors only from the front; sleeping hides the hero and the sleep picture is sized to the
bed; the roll's cooldown is 1.85 s; the site review (old designs once per type, the "this is bad" sites mixed from earlier picks, the asked-for
changes); the old interiors furnished in the new sites; the E of ZELDARA; the Lab's new tabs.
Run: python tests/test_round46.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with game(new=True, painted=True) as g:
    g.wait(5000)
    # ── terrain pieces: about a third ──
    r = g.js("({d:ZWE.LOOK.dens, i:ZWE.LOOK.inDens, fr:typeof ZWE._flipRows, c:typeof ZWE._cells})")
    check('Terrain pieces cut to about a third (density %s at edges, %s inside); chunk painting split into resumable steps' % (r['d'], r['i']),
          r['d'] <= 0.4 and r['i'] <= 0.25 and r['fr'] == 'function' and r['c'] == 'function', r)
    # ── chunk parking ──
    g.chunks()      # round 72: the ground on screen first (slow in a busy test machine)
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), p=ws.player, W=ws._wr, x0=p.x, y0=p.y; var go=async function(x,y){ p.x=x; p.y=y; p.cont.setPosition(x,y); ws.cameras.main.centerOn(x,y); await new Promise(r=>{ var t0=Date.now(), f=function(){ if((W.jobs.size===0&&W.chunks.size>0)||Date.now()-t0>20000)r(); else setTimeout(f,250); }; setTimeout(f,1500); }); };
      var home=Array.from(W.chunks.keys()); await go(x0+TILE*110,y0); var parked=W.parked?W.parked.size:0, parkedHome=home.filter(function(k){ return W.parked&&W.parked.has(k); }); var mk=0, m0=ws._wrMount; ws._wrMount=function(o){ if(parkedHome.indexOf(o.cx+'_'+o.cy)>=0)mk++; return m0.apply(ws,arguments); }; await go(x0,y0); ws._wrMount=m0; var shown=parkedHome.filter(function(k){ return W.chunks.has(k); }).length; return {parked:parked,parkedHome:parkedHome.length,shown:shown,repainted:mk,lim:WR_PARK}; })()""")
    check('Chunks that go off-screen are parked (%d kept, up to %d) and shown again when you walk back, not repainted (%d of %d back, %d repainted)' % (r['parked'], r['lim'], r['shown'], r['parkedHome'], r['repainted']),
          r['parked'] > 0 and r['parked'] <= r['lim'] and r['parkedHome'] > 0 and r['shown'] == r['parkedHome'] and r['repainted'] == 0, r)      # round 72d: judged by the chunks themselves (the worker paints ahead faster, so more get parked)
    # ── behind things: outline only over the covered part ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), p=ws.player; await new Promise(r=>setTimeout(r,300)); var parts=ZOL._parts(p.cont); if(!parts.length)return {np:1};
      var b=ZOL._box(p.cont,parts), key=parts[0].texture.key; var im=ws.add.image((b.x+b.r)/2,b.y+(b.bt-b.y)*0.55,key).setOrigin(0.5,0).setDepth(p.cont.depth+50); im._zcv=true;
      await new Promise(r=>setTimeout(r,400)); var S=ws._zol||{}, o={rt:!!(S.rt&&S.rt.visible), mask:!!S.useMask, front:(S.front||[]).length, tint:(p.cont.list||[]).some(function(c){ return c.isTinted&&c.tintFill; }), on:ZOL.on};
      im.destroy(); await new Promise(r=>setTimeout(r,300)); o.after=!!(S.rt&&S.rt.visible); return o; })()""")
    check('Behind a tree or roof only the covered part of the hero is outlined (a GPU mask, no colour change); gone once out from behind',
          r.get('np') is None and r['rt'] and r['mask'] and r['front'] > 0 and not r['tint'] and r['on'] and not r['after'], r)
    # ── buildings: 60% blocked, door only from the front ──
    r = g.js("""(()=>{ var src=game.scene.getScene('World').update.toString()+Object.getOwnPropertyNames(Object.getPrototypeOf(game.scene.getScene('World'))).map(function(k){ try{ return String(game.scene.getScene('World')[k]); }catch(e){ return ''; } }).join('');
      return {frac:VB_FRAC, front:src.indexOf('py>doorCY-6')>=0}; })()""")
    check('Village buildings block about 60%% of their height (VB_FRAC = %s); doors open only from the front' % r['frac'], r['frac'] == 0.6 and r['front'], r)
    # ── the roll's cooldown ──
    r = g.js("({cd:ZROLL.CD})")
    check('Roll cooldown is 1.85 s (0.75 s added)', abs(r['cd'] - 1.85) < 1e-6, r)
    # ── the E ──
    r = g.js("""(async ()=>{ await document.fonts.ready; var f='700 100px "Cinzel Decorative"', M=ZBrand.eMetrics(f); ZBrand.setE('top'); return {st:ZBrand.E_STYLE, m:M?{t:M.top.x,b:M.bot.x}:null, set:typeof ZBrand.setE}; })()""")
    check('The E of ZELDARA: the top arm drawn out to the bottom arm\'s length (style "top"; measured arms %s)' % r['m'], r['st'] == 'top' and r['set'] == 'function' and (r['m'] is None or r['m']['t'] < r['m']['b']), r)

    # ── sites ──
    r = g.js("""(()=>{ var o={old:Object.keys(ZSP.OLD).sort(), hard:Object.keys(ZSP.HARD_OLD).sort(), bad:[], n:0};
      Object.keys(ZSP.T).forEach(function(id){ if(ZSP.isOld&&ZSP.isOld(id))return; var D=ZSP.design(id,3); o.n++; if(!D||!D.floors.every(function(F){ return F.ok; }))o.bad.push(id); });
      var L=ZSP.design('mage_lightning_rod',3); o.hidden=!!(L&&L.floors.some(function(F){ return F.hiddenDown; }));
      var M=ZSP.design('mage_monolith',3); o.mono=M?[M.floors[0].w,M.floors[0].h]:null; return o; })()""")
    check('Site review: old layouts kept once per type (%s); all %d new designs connected; Lightning Rod hides its stairs down; Monolith %s' % (', '.join(r['old']), r['n'], r['mono']),
          r['old'] == ['castle_q1_b', 'mage_rime_spire', 'sunken_courtyard'] and r['hard'] == ['castle_q1_b', 'mage_rime_spire'] and not r['bad'] and r['hidden'] and r['mono'] and r['mono'][0] >= 80, r)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), o={rooms:[],err:[]}; ws.wd.sites.forEach(function(s){ if(!s.design||o.rooms.length>=3)return; try{ var sp=_siteFloorSpec(s,0,s.floors||3); if(!sp)return; var m=_buildSiteFloor(sp); if(m&&sp.zsp&&ZSP.T[sp.zsp.id]&&ZSP.T[sp.zsp.id].built)o.rooms.push([s.id,m._rooms||0,(m._roomList||[]).map(function(x){ return x.kind||x.k||String(x); }).slice(0,4)]); }catch(e){ o.err.push(s.id+': '+e.message); } }); return o; })()""")
    check('The old interiors (libraries, dining rooms, chapels, galleries …) are furnished into built floors: %s' % r['rooms'][:2],
          r['rooms'] and all(x[1] > 0 for x in r['rooms']) and not r['err'], r)

    # ── sleep ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'); ws._enterBuilding({type:'house'}); await new Promise(r=>setTimeout(r,2000)); var b=game.scene.getScene('Building'), bb=null;
      b._bedIms.forEach(function(im){ var q=im.getBounds(); if(!bb||q.width*q.height>bb.width*bb.height)bb=q; }); b._rest(); await new Promise(r=>setTimeout(r,1200));
      var sl=b.children.list.find(function(c){ return c.texture&&/an_sleep/.test(c.texture.key); }), o={hero:b.bCont.visible, bed:bb?[Math.round(bb.width),Math.round(bb.height)]:null, pic:sl?[Math.round(sl.displayWidth),Math.round(sl.displayHeight)]:null};
      await new Promise(r=>setTimeout(r,6000)); o.back=b.bCont.visible; b._exitBuilding(); await new Promise(r=>setTimeout(r,1000)); return o; })()""")
    check('Sleeping: the hero leaves the room (no double) and the sleep picture is sized to the bed (bed %s, picture %s); back after waking' % (r['bed'], r['pic']),
          not r['hero'] and r['back'] and (r['pic'] is None or (r['bed'] and abs(r['pic'][0] - r['bed'][0]) <= r['bed'][0] * 0.15)), r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

# ── the Lab's new tabs ──
lab = open(os.path.join(ROOT, 'lab', 'lab.artifact.html'), encoding='utf-8').read()
import re
check('The Lab has the round 46 tabs: The E and Empty space (and Site review)', re.search(r'id:["\']logoe', lab) and re.search(r'id:["\']void', lab) and 'sreview' in lab)

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
