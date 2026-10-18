"""Round 52 — the spirit saga, part 1 (doc 28): the harbour opened wide to the lake, 40 bindstones (10 per realm) each guarded by a named
Binder, freeing a spirit gives a Soulglass shard and sends it to the Runestone Green, the Glimmerhall rises after an island's harbor quest,
and Sólveig fuses six shards of one realm into its lattice.
Run: python tests/test_round52.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

with game(new=True, painted=True) as g:
    g.wait(4000)
    # ── the harbour cove: wide open water from the harbour pool along the axis to the lake ──
    r = g.js("""(()=>{ var wd=game.scene.getScene('World').wd, n=0, bad=[], minW=99;
      for(var i=0;i<=20;i++){ var t=i/20, ax=-23+(-44+23)*t, ay=23+(62-23)*t, L=Math.hypot(21,39), px=39/L, py=21/L, w=0;
        for(var o=-12;o<=12;o++){ var x=Math.round(CENTER_X+ax+px*o), y=Math.round(CENTER_Y+ay+py*o), tt=(wd.tiles[y]||[])[x]; if(!canPassTile(tt))w++; }
        var cx=Math.round(CENTER_X+ax), cy=Math.round(CENTER_Y+ay); if(canPassTile((wd.tiles[cy]||[])[cx]))bad.push([cx,cy]); if(w<minW)minW=w; n++; }
      return {n:n, bad:bad, minW:minW}; })()""")
    check('The harbour opens wide onto the lake: open water all along the cove (narrowest %d tiles)' % r['minW'], not r['bad'] and r['minW'] >= 12, r)
    # ── the bindstones ──
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), S=ZSPIRIT.shrines(ws), R=_footReach(ws.wd), per={1:0,2:0,3:0,4:0}, unreach=[], names=new Set();
      S.forEach(function(s){ per[s.q]++; names.add(s.binder); var tx=Math.floor(s.x/TILE), ty=Math.floor(s.y/TILE), ok=false; for(var dy=-2;dy<=2;dy++)for(var dx=-2;dx<=2;dx++)if(R[(ty+dy)*WORLD_W+tx+dx])ok=true; if(!ok)unreach.push(s.id); });
      return {n:S.length, per:per, unreach:unreach, names:names.size, ex:S.slice(0,2).map(function(s){ return [s.spirit,s.binder,s.zname]; })}; })()""")
    check('40 bindstones, 10 in each realm (%s), every one walkable to' % r['per'], r['n'] == 40 and all(v == 10 for v in r['per'].values()) and not r['unreach'], r)
    check('Each Binder is named (%d different names; %s)' % (r['names'], r['ex']), r['names'] == 40, r)
    # go to the first Grasslands bindstone: the stone, the toiling spirit, the Binder
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; var s=ZSPIRIT.shrines(ws).filter(function(s){ return s.q===1; })[0];
      ws.player.x=s.x+60; ws.player.y=s.y+60; ws.player.cont.setPosition(ws.player.x,ws.player.y); await new Promise(function(r){ setTimeout(r,2500); });
      var b=s.mon; return {id:s.id, v:!!(s._v&&s._v.stone&&s._v.sp), b:b?{name:b.name||(b.def&&b.def.name)||(b._m&&b._m.name), hp:b.maxHp||b.hp, dead:b.dead}:null, sp:s.spirit}; })()""")
    sid = r['id']
    check('At a bindstone the chained spirit toils and its Binder shows himself (%s)' % (r['b'] and r['b']['name']), r['v'] and r['b'] and 'the Binder' in (r['b']['name'] or ''), r)
    r = g.js("""(async (id)=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, s=ZSPIRIT.shrines(ws).find(function(s){ return s.id===id; }), n0=(ps.inventory||[]).filter(function(i){ return i==='soulglass_1'; }).length;
      _heroHitMonster(ws, s.mon, 999999, {pure:true}); await new Promise(function(r){ setTimeout(r,1500); });
      var el=document.getElementById('fairy-talk'), txt=el&&el.style.display!=='none'?el.textContent:''; if(typeof FairyTalk!=='undefined')FairyTalk.close();
      return {freed:ZSPIRIT.freed(ps,id), shards:ps.inventory.filter(function(i){ return i==='soulglass_1'; }).length-n0, txt:txt.slice(0,140), freeVis:!!(s._v&&s._v.sp)}; })""", sid)
    check('Beat the Binder: the spirit is freed, thanks you ("%s…") and gives a Grasslands shard' % r['txt'][:60], r['freed'] and r['shards'] == 1 and 'chains' in r['txt'], r)
    # ── the Green ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ZSPIRIT.shrines(ws).filter(function(s){ return s.q===1; }).slice(1,6).forEach(function(s){ ps.spiritsFreed.push(s.id); ZSPIRIT.paid(ps).push(s.id); ps.inventory.push('soulglass_1'); });      /* round 64d: a freed spirit pays its shard once (shardsGiven) */
      ps.inventory.push('soulglass_2','soulglass_2','soulglass_2','soulglass_2','soulglass_2','soulglass_2');
      ws.player.x=CENTER_X*TILE+16; ws.player.y=(CENTER_Y+6)*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y); await new Promise(function(r){ setTimeout(r,2500); });
      return {freed:ps.spiritsFreed.length, green:(function(S){ return S?Object.keys(S.sp).filter(function(k){ var o=S.sp[k].o; return o&&o.active; }).length:0; })(ws._zg)}; })()""")
    check('The freed spirits gather on the Runestone Green (%d freed, %d pictures there)' % (r['freed'], r['green']), r['freed'] == 6 and r['green'] == 6, r)
    # ── the Glimmerhall ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, before=!!ZSPIRIT.door(); ps.completedQuests=(ps.completedQuests||[]).concat(['s1_harbor']);
      await new Promise(function(r){ setTimeout(r,2500); }); var D=ZSPIRIT.door(); if(!D)return {before:before, door:null};
      var g=VR_EXTRA.glimmerAt, wd=ws.wd, B=(wd.vbuild||wd.villageBuilds||[]);
      ws.player.x=D.x; ws.player.y=D.y+20; ws.player.cont.setPosition(ws.player.x,ws.player.y); await new Promise(function(r){ setTimeout(r,800); });
      var p=ws._interactPrompt, pt=p&&(p.text||(p.node&&p.node.textContent)||'');
      ZSPIRIT.solveig(ws); var el=document.getElementById('fairy-talk'), btns=Array.from(el.querySelectorAll('button')).map(function(b){ return b.textContent; });
      return {before:before, door:D, at:g, prompt:pt, btns:btns, txt:el.textContent.slice(0,90)}; })()""")
    check('No Glimmerhall before an island\'s harbor quest; after it, it rises on the green (at %s)' % r.get('at'), not r['before'] and r['door'], r)
    check('At its door: "%s"; Sólveig offers to fuse the realms with six shards (%s)' % (r.get('prompt'), r.get('btns')), 'Glimmerhall' in (r.get('prompt') or '') and any('Grasslands' in b for b in r['btns']) and any('Wetlands' in b for b in r['btns']), r)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; if(typeof FairyTalk!=='undefined')FairyTalk.close();
      ps.inventory=ps.inventory.filter(function(i){ return i!=='soulglass_2'; }); ps.inventory.push('soulglass_2','soulglass_2','soulglass_2','soulglass_1');      // 3 Wetlands + 7 Grasslands: no Wetlands lattice
      ZSPIRIT.solveig(ws); var el=document.getElementById('fairy-talk'), btns=Array.from(el.querySelectorAll('button')).map(function(b){ return b.textContent; }); FairyTalk.close();
      ZSPIRIT.fuse(ws,1); FairyTalk.close(); var inv=ps.inventory; return {btns:btns, g:inv.filter(function(i){ return i==='soulglass_1'; }).length, w:inv.filter(function(i){ return i==='soulglass_2'; }).length, lat:inv.indexOf('soulglass_lattice_1')>=0, name:ITEMS.soulglass_lattice_1.name}; })()""")
    check('Shards of one realm only: three Wetlands and seven Grasslands shards fuse only the Grasslands lattice (%s)' % r['btns'], any('Grasslands' in b for b in r['btns']) and not any('Wetlands' in b for b in r['btns']), r)
    check('Fusing takes six Grasslands shards and gives the %s (1 Grasslands and 3 Wetlands shards left)' % r['name'], r['lat'] and r['g'] == 1 and r['w'] == 3, r)
    # ── the journal and the Tome ──
    r = g.js("""(()=>{ var ps=game.scene.getScene('World').playerState, h=ZROLL.questHTML(ps), d=document.createElement('div'); d.innerHTML=h; var t=d.textContent;
      return {bound:/The Bound Spirits/.test(t), gl:/Glimmerhall ✓/.test(t), g:(t.match(/Grasslands: (\\d+) \\/ 10/)||[])[1], hint:ITEMS.soulglass_1.tomeHint, ic:typeof ZIcon!=='undefined'}; })()""")
    check('The journal lists the bound spirits by realm (Grasslands %s / 10) and the Glimmerhall; the Tome tells where shards come from' % r['g'], r['bound'] and r['gl'] and r['g'] == '6' and 'Binder' in (r['hint'] or ''), r)
    r = g.js("(()=>{ var ids=[]; ZSCN.SHEETS.filter(function(S){ return S.wave===53; }).forEach(function(S){ (S.items||[]).concat(S.seq||[]).forEach(function(i){ ids.push(i[0]); }); }); return ids; })()")
    need = ['an_spirit_toil', 'an_spirit_free', 'sp_bindstone', 'sp_bindstone_free', 'sp_group_10', 'vb_glimmerhall', 'np_solveig', 'ic_soulglass_1', 'ic_soulglass_lattice_4']
    check('Wave 53 ordered: %d paintings (the spirits, bindstones, the Glimmerhall, Sólveig, the icons)' % len(r), all(n in r for n in need), [n for n in need if n not in r])
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
