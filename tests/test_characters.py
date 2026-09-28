"""Characters (Phase 4): every NPC, mount, familiar and boss has a pixel
stand-in that paints, and the game uses them — shop keepers, craftsmen,
village folk (by stage), mounts under the hero (all 3 directions),
orbiting familiars, world / dungeon / boss-rush bosses; Tome entries show
them. Screenshots go to argv[1] if given."""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
SHOTS = sys.argv[1] if len(sys.argv) > 1 else None
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  -> ' + str(info)), flush=True)
TP = "(([x,y])=>{var ws=game.scene.getScene('World'); ws.player.x=x*TILE+16; ws.player.y=y*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y); ws.cameras.main.centerOn(ws.player.x,ws.player.y);})"
with game(new=True) as g:
    r = g.js("""(()=>{ var c={}, ids={}, dup=[], bad=[];
      CHAR_ROSTER.forEach(function(R){ c[R.cat]=(c[R.cat]||0)+1; if(ids[R.id])dup.push(R.id); ids[R.id]=1;
        if(!R.look||!R.doing||!R.where)bad.push(R.id+':text');
        try{ var f=chFrames(R); if(f.length!==(R.cat==='mount'?10:4))bad.push(R.id+':frames');
          f.forEach(function(cv,i){ if(i>=8)return; var d=cv.getContext('2d').getImageData(0,0,32,32).data, n=0; for(var k=3;k<d.length;k+=4)if(d[k]>200)n++; if(n<30)bad.push(R.id+':f'+i+'='+n); }); }catch(e){ bad.push(R.id+':'+e.message); } });
      var miss=[]; Object.keys(MOUNTS).forEach(function(m){ if(!CHAR_BY_ID['mt_'+m])miss.push('mount '+m); });
      Object.keys(FAMILIARS).forEach(function(f){ if(!SPIRIT_BY_ID[FAMILIARS[f].design])miss.push('familiar '+f); });
      [1,2,3,4].forEach(function(s){ if(!CHAR_BY_ID['crafts_'+s])miss.push('craftsman '+s); });
      Object.keys(CHAR_NPC_FOR_BUILDING).forEach(function(b){ if(!CHAR_BY_ID[CHAR_NPC_FOR_BUILDING[b]])miss.push('npc '+b); });
      Object.keys(MDEFS).forEach(function(k){ if(MDEFS[k].boss&&!MDEFS[k].elite&&!CHX.bossId(k,MDEFS[k]))miss.push('boss '+k); });
      [1,2,3,4].forEach(function(s){ var B=HARBOR_ISLANDS[s]&&HARBOR_ISLANDS[s].boss; if(B&&!CHX.bossId(null,B))miss.push('island boss '+s); });
      return {c:c,dup:dup,bad:bad,miss:miss}; })()""")
    check('Roster: 41 NPCs (incl. 12 castle teachers), 11 mounts, 21 bosses + 23 evolved forms + 12 castle wardens (familiars are spirits now)', r['c'] == {'npc': 41, 'mount': 11, 'boss': 56}, r['c'])
    check('Unique ids; every one has look / doing / where text and paints all its frames', not r['dup'] and not r['bad'], (r['dup'], r['bad'][:8]))
    check('Every mount, familiar, craftsman, shop keeper and boss in the game data has a character', not r['miss'], r['miss'])

    # ── world bosses use their pixel sprite ──
    wb = g.js("(()=>{ var ws=game.scene.getScene('World'); return ws.worldMonsters.filter(m=>m.def&&m.def.boss).map(m=>[m.type, m.body.texture?m.body.texture.key:'circle']); })()")
    check('World bosses are drawn with their boss sprites', wb and all(k.startswith('ch_boss_') for _, k in wb), wb)

    # ── village folk by stage ──
    n1 = g.js("(game.scene.getScene('World')._folk||[]).length")
    g.js("game.scene.getScene('World').playerState.rescued=[1,2,3,4]"); g.wait(2600)
    f5 = g.js("(()=>{ var ws=game.scene.getScene('World'); return (ws._folk||[]).map(f=>({id:f.F.id,x:f.x,y:f.y,tex:f.im.texture.key})); })()")
    check('Village folk: 3 at stage 1, 11 at stage 5, each with its sprite', n1 == 3 and len(f5) == 11 and all(f['tex'] == 'ch_' + f['id'] for f in f5), (n1, len(f5)))
    g.wait(6000)
    f5b = g.js("(game.scene.getScene('World')._folk||[]).map(f=>[f.x,f.y])")
    moved = sum(1 for a, b in zip(f5, f5b) if abs(a['x'] - b[0]) + abs(a['y'] - b[1]) > 4)
    check('Village folk wander around their spots', moved >= 3, moved)
    talk = g.js("(()=>{ var ws=game.scene.getScene('World'); var f=ws._folk[0]; return ws._villageNPCs.some(n=>n.id===f.F.id); })()")
    check('Village folk can be talked to ([Tab])', talk)

    # ── labels are sharp HTML text that follows the camera ──
    g.js(TP + "([CENTER_X+2,CENTER_Y+4])"); g.wait(1800)
    for _ in range(16):   # labels follow the camera a frame later; headless runs at a few fps
        lb = g.js("""(()=>{ var ws=game.scene.getScene('World'), L=(ws._dtx||[]).filter(t=>t.active&&/Village/.test(t.text)); if(!L.length)return null; var t=L[0], r=t._el.getBoundingClientRect(), cam=ws.cameras.main, vw=cam.worldView;
          var sx=(t.x-vw.x)/vw.width*cam.width, sy=(t.y-vw.y)/vw.height*cam.height; return {shown:t._el.style.display!=='none', dx:Math.round((r.left+r.width/2)-sx), dy:Math.round(r.bottom-sy), fs:parseFloat(t._el.style.fontSize)}; })()""")
        if lb and abs(lb['dx']) <= 3 and abs(lb['dy']) <= 4: break
        g.wait(500)
    check('Waystone name is DOM text placed over its world position', lb and lb['shown'] and abs(lb['dx']) <= 3 and abs(lb['dy']) <= 4 and lb['fs'] > 11, lb)
    # ── shop keeper inside a building ──
    g.js("(()=>{ var ws=game.scene.getScene('World'); var b=ws.buildings.find(b=>b.type==='tavern'); ws._enterBuilding(b); })()"); g.wait(1500)
    bk = g.js("(()=>{ var b=game.scene.getScene('Building'); return b&&b._npcSpr?b._npcSpr.texture.key:null; })()")
    check('The tavern keeper inside is Rolf the Bartender\'s sprite', bk == 'ch_npc_tavern', bk)
    hid = g.js("(()=>{ var ws=game.scene.getScene('World'); return ws._dtxHost?ws._dtxHost.style.display:'none'; })()")
    check('World labels hide while inside a building', hid == 'none', hid)
    if SHOTS: g.shot(os.path.join(SHOTS, 'ch_tavern.png'))
    g.js("(()=>{ var b=game.scene.getScene('Building'); b._exitBuilding(); })()"); g.wait(1500)

    # ── mounts under the hero, all directions ──
    g.js(TP + "([CENTER_X+1,CENTER_Y+10])"); g.js("(()=>{ var ps=game.scene.getScene('World').playerState; ps.ownedMounts=Object.keys(MOUNTS); ps.godMode=true; })()")
    bad = []
    for m in ['alligator', 'boar', 'lava_unicorn', 'ash_salamander', 'dragon', 'sky_eagle', 'sky_glider', 'storm_drake', 'ember_phoenix', 'void_serpent']:
        g.js(f"game.scene.getScene('World').playerState.mount='{m}'")
        for k, want in [('ArrowRight', [0, 1, 2, 3]), ('ArrowDown', [4, 5]), ('ArrowUp', [6, 7])]:
            g.key(k, 700)
            s = g.js("(()=>{ var p=game.scene.getScene('World').player; return {vis:!!(p.mountSpr&&p.mountSpr.visible), tex:p.mountSpr&&p.mountSpr.texture.key, f:p.mountSpr&&+p.mountSpr.frame.name, crop:p.sprite.isCropped, icon:p.mountLbl.text}; })()")
            glider = m == 'sky_glider'
            if not (s['vis'] and s['tex'] == 'ch_mt_' + m and s['f'] in want and (glider or s['crop']) and s['icon'] == ''): bad.append((m, k, s))
        if SHOTS and m in ('boar', 'dragon', 'sky_glider'):
            g.key('ArrowRight', 200); g.wait(150)
            g.page.screenshot(path=os.path.join(SHOTS, f'ch_ride_{m}.png'), clip={'x': 520, 'y': 280, 'width': 240, 'height': 240})
    check('Every mount is drawn under the hero (side / front / back), hero seated, no emoji', not bad, bad[:3])
    g.js("game.scene.getScene('World').playerState.mount=null"); g.key('ArrowLeft', 200)
    dm = g.js("(()=>{ var p=game.scene.getScene('World').player; return {vis:!!(p.mountSpr&&p.mountSpr.visible), crop:p.sprite.isCropped, y:p.sprite.y}; })()")
    check('Dismounting hides the mount and restores the hero', not dm['vis'] and not dm['crop'] and dm['y'] == 14, dm)

    # ── familiars ──
    g.js("(()=>{ var ps=game.scene.getScene('World').playerState; ps.ownedFamiliars=Object.keys(FAMILIARS); ps.completedIslands=[1,2,3,4]; ps.fairyKings=['k2','k3']; ps.familiar='fam_grass'; ps.familiar2='fam_earth'; ps.familiar3='fam_fire'; })()")
    g.wait(900)
    fv = g.js("(()=>{ var ws=game.scene.getScene('World'), V=ws._famVisuals||{}; return Object.keys(V).map(k=>[k, V[k].texture?V[k].texture.key:'text']); })()")
    check('Equipped familiars fly as spirit sprites', len(fv) == 3 and all(t.startswith('spirit_') for k, t in fv), fv)

    # ── dungeon + tower guardians ──
    LAUNCH = """(([typ,sec])=>{var ws=game.scene.getScene('World');var site=ws.wd.sites.find(s=>s.type===typ&&s.section===sec);var mf=site.floors||{1:3,2:4,3:5,4:6}[sec];
      if(game.scene.isActive('Dungeon'))game.scene.getScene('Dungeon').scene.stop(); if(game.scene.isActive('World'))ws.scene.sleep('World');
      ws.scene.launch('Dungeon',{site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:typ==='tower'?'tower':'dungeon'});})"""
    gb = []
    for typ in ['dungeon', 'tower']:
        for sec in [1, 2, 3, 4]:
            g.js(LAUNCH + f"(['{typ}',{sec}])"); g.wait(1400)
            gb.append(g.js("(()=>{ var d=game.scene.getScene('Dungeon'); var b=d&&d.monsters.find(m=>m.isBoss); return b?(b.body.texture?b.body.texture.key:'circle'):null; })()"))
    check('All 8 dungeon/tower guardians use their boss sprites', all(k and k.startswith('ch_boss_') for k in gb), gb)
    if SHOTS:
        g.js("(()=>{ var d=game.scene.getScene('Dungeon'); var b=d.monsters.find(m=>m.isBoss); d.px=b.x-70; d.py=b.y+20; d.pCont.setPosition(d.px,d.py); d.cameras.main.centerOn(b.x,b.y); })()"); g.wait(700)
        g.shot(os.path.join(SHOTS, 'ch_boss_dungeon.png'))
    g.js("(()=>{ var d=game.scene.getScene('Dungeon'); d.scene.stop(); game.scene.getScene('World').scene.wake('World'); })()"); g.wait(900)

    # ── volcano boss rush ──
    g.js("(()=>{ var ws=game.scene.getScene('World'); ws.scene.sleep('World'); ws.scene.launch('VolcanoBossRush',{site:{id:'volcano_main',type:'volcano_main'},worldScene:ws}); })()"); g.wait(1500)
    br = []
    for i in range(10):
        br.append(g.js("(()=>{ var s=game.scene.getScene('VolcanoBossRush'); return (s.monsters||[]).map(m=>m.body.texture?m.body.texture.key:'circle'); })()"))
        g.js("(()=>{ var s=game.scene.getScene('VolcanoBossRush'); (s.monsters||[]).forEach(m=>{ if(m.cont)m.cont.destroy(); }); if(s.bossIdx<s.bosses.length-1)s._spawnNext(); })()"); g.wait(300)
    flat = [k for w in br for k in w]
    check('Boss rush: imps use roster sprites, every boss its boss sprite', flat and all(k != 'circle' for k in flat) and sum(1 for k in flat if k.startswith('ch_boss_')) >= 9, br)
    g.js("(()=>{ game.scene.getScene('VolcanoBossRush').scene.stop(); game.scene.getScene('World').scene.wake('World'); })()"); g.wait(800)

    # ── Tome shows the sprites ──
    t = g.js("""(()=>{ var bad=[]; ['mount','familiar','character'].forEach(function(c){ Tome.list(c).forEach(function(id){ var e=Tome.entry(c,id); if(e&&!e.spec&&id!=='npc_house')bad.push(c+':'+id); }); });
      CHAR_ROSTER.filter(r=>r.cat==='boss').forEach(function(R){ var e=Tome.entry('monster',R.id); if(!e||!e.spec)bad.push('boss:'+R.id); }); return bad; })()""")
    check('Tome entries for mounts, familiars, characters and all bosses carry their sprite', not t, t[:6])
    check('No JS errors', not g.errs, g.errs[:4])
print('%d/%d' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
