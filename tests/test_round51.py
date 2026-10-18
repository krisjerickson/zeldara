"""Round 51 — the light ocean for the dragon and the alligator, a fairy court you can walk to, the Forges of Muspelheim and Muspelheim
itself reachable over walled causeways (unlocked by the boss dungeons and the master builders' towers, opening in region order), the
mana bar in the site HUD, and familiars never called spirits.
Run: python tests/test_round51.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

with game(new=True, painted=True) as g:
    g.wait(4000)
    r = g.js("({drR:canPassTile(T.REEF,'dragon'), drO:canPassTile(T.OCEAN,'dragon'), alR:canPassTile(T.REEF,'alligator'), alO:canPassTile(T.OCEAN,'alligator'), hoR:canPassTile(T.REEF,'horse'), foot:canPassTile(T.REEF)})")
    check('The dragon and the alligator go on the light ocean; not the deep sea; the horse and you on foot do not (%s)' % r, r['drR'] and r['alR'] and not r['drO'] and not r['alO'] and not r['hoR'] and not r['foot'], r)
    r = g.js("(()=>{ var ws=game.scene.getScene('World'), R=_footReach(ws.wd); return (ws._kings||[]).map(function(K){ return [K.name,K.tx,K.ty,!!R[K.ty*WORLD_W+K.tx]]; }); })()")
    check('Every Fairy Monarch\'s court can be walked to — Pyrrhus by the Chained Rocks too (%s)' % r, len(r) == 3 and all(k[3] for k in r), r)
    # ── the forges ──
    r = g.js("(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.soulGems={1:1,2:1,3:1,4:1}; ps.completedQuests=['s1_dungeon','s2_dungeon','s3_dungeon','s4_dungeon']; return {u:_finalQuestUnlocked(ps)}; })()")
    g.wait(1500)
    r2 = g.js("(()=>{ var wd=game.scene.getScene('World').wd; return {sites:wd.sites.filter(function(s){ return /^volcano/.test(s.id); }).length}; })()")
    check('The four boss dungeons alone do not unlock the forges', not r['u'] and r2['sites'] == 0, [r, r2])
    g.js("(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.completedQuests=ps.completedQuests.concat(['s1_tower','s2_tower','s3_tower','s4_tower']); ps.soulGems={1:1,2:1,3:1,4:1}; if(typeof FairyTalk!=='undefined')FairyTalk.close(); ps.rescued=[1,2,3,4]; ps.unlockedSections=[1,2,3,4]; _wgApplyGates(ws.wd,ps); })()")
    g.wait(2500)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), wd=ws.wd, W=WORLD_W; wd._footReach=null; var R=_footReach(wd), sea=function(t){ return t===T.OCEAN||t===T.REEF; };
      var sites=_volcanoSiteDefs().map(function(d){ var ok=false; for(var dy=-1;dy<=3;dy++)for(var dx=-1;dx<=3;dx++)if(R[(d.ty+dy)*W+d.tx+dx])ok=true; var an=wd.volcanoAnchors[d.id];
        return {id:d.id, name:VOLC_NAMES[d.id], reach:ok, there:!!wd.sites.find(function(s){ return s.id===d.id; }), region:an?wd.region[an.y*W+an.x]:null, sec:d.section, x:d.tx, y:d.ty}; });
      // walkable ground that touches the sea anywhere on the causeways and islands (should be none: the rampart is between)
      var leak=0, walls=0; for(var y=0;y<WORLD_H;y++)for(var x=0;x<W;x++){ var k=y*W+x; if(!R[k])continue; var near=false; for(var j=0;j<sites.length&&!near;j++){ var s=sites[j]; if(Math.hypot(x-s.x,y-s.y)<(s.id==='volcano_main'?34:14))near=true; } if(!near)continue;
        [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var t=(wd.tiles[y+d[1]]||[])[x+d[0]]; if(sea(t))leak++; if(t===T.CLIFF)walls++; }); }
      return {spawned:!!wd._volcSpawned, sites:sites, leak:leak, walls:walls}; })()""")
    s = r['sites']
    check('With the boss towers too, the four forges and Muspelheim appear (%s)' % ', '.join(x['name'] for x in s), r['spawned'] and all(x['there'] for x in s), s)
    check('Each can be walked to from the village over its causeway', all(x['reach'] for x in s), [(x['id'], x['reach']) for x in s])
    check('The causeways and islands are walled off from the sea (%d wall faces, %d bits of open sea touching the walkways)' % (r['walls'], r['leak']), r['walls'] > 200 and r['leak'] == 0, r['leak'])
    m = [x for x in s if x['id'] == 'volcano_main'][0]
    check('Muspelheim stands off the Ashlands coast (region %s), clear of the map\'s compass (tile %d, %d)' % (m['region'], m['x'], m['y']), m['region'] == 4 and (m['x'] > 214 or m['y'] < 980), m)
    check('Each forge is anchored on its own realm\'s coast', all(x['region'] == x['sec'] for x in s), [(x['id'], x['region'], x['sec']) for x in s])
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, site=ws.wd.sites.find(function(s){ return s.id==='volcano_e'; }), msg=null, n0=ws._showNotif; ws._showNotif=function(t){ msg=t; return n0.apply(ws,arguments); };
      ps.inventory=(ps.inventory||[]).filter(function(i){ return !/^volcano_key/.test(i); }); ws._enterSite(site); var sealed=msg, a1=game.scene.isActive('VolcanoBulletHell')||game.scene.isActive('Dungeon');
      ps.inventory.push('volcano_key_n'); ws._enterSite(site); await new Promise(function(r){ setTimeout(r,1500); }); var a2=game.scene.isActive('Dungeon')&&!!game.scene.getScene('Dungeon')._forge;      /* round 60: the forge door opens onto its painted floors */
      var row=document.getElementById('dng-mana-row'), H=document.getElementById('dungeon-hud'); ps.hp=17; ps.mana=23; await new Promise(function(r){ setTimeout(r,600); });
      var o={sealed:sealed, a1:a1, a2:a2, title:document.getElementById('dng-title').textContent, hp:document.getElementById('dng-hp-txt').textContent, mana:document.getElementById('dng-mana-txt').textContent, rowShown:!!row&&getComputedStyle(row).display!=='none'&&getComputedStyle(H).display!=='none'};
      ws._showNotif=n0; var sc=game.scene.getScene('Dungeon'); if(sc&&sc._exitToWorld&&game.scene.isActive('Dungeon'))sc._exitToWorld(null); await new Promise(function(r){ setTimeout(r,800); }); return o; })()""")
    check('The forges open in region order: the Cinder Forge is sealed without the Ember Forge\'s key ("%s"), opens with it' % (r['sealed'] or '')[:70], r['sealed'] and 'sealed' in r['sealed'] and not r['a1'] and r['a2'], r)
    check('In a forge the site HUD shows the forge\'s name, health and the mana bar between health and experience (%s · %s · %s)' % (r['title'], r['hp'], r['mana']), r['rowShown'] and 23 <= int(r['mana'].split('/')[0]) <= 27 and r['hp'].startswith('17/') and 'Cinder Forge' in r['title'], r)
    g.js("""(()=>{ var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.type==='dungeon'&&!s.boss&&s.section===1); ws._enterSite(site); })()""")
    g.wait(5000)
    r = g.js("(()=>{ var ps=game.scene.getScene('World').playerState; ps.mana=31; return new Promise(function(res){ setTimeout(function(){ var row=document.getElementById('dng-mana-row'), kids=Array.from(row.parentNode.children).map(function(c){ return c.querySelector('[id]')&&c.querySelector('[id]').id; }); res({act:game.scene.getScenes(true).map(function(s){ return s.sys.settings.key; }), hud:getComputedStyle(document.getElementById('dungeon-hud')).display, txt:document.getElementById('dng-mana-txt').textContent, order:kids, w:Math.round(document.getElementById('dng-mana-bar-bg').getBoundingClientRect().width)}); },500); }); })()")
    check('In an adventure site too: the mana bar (%s, %d px wide) sits between health and experience (%s)' % (r['txt'], r['w'], r['order']), 31 <= int(r['txt'].split('/')[0]) <= 34 and r['order'][0] == 'dng-hp-bar-bg' and r['order'][1] == 'dng-mana-bar-bg' and r['order'][2] == 'dng-xp-bar-bg' and r['w'] > 100, r)      # round 64d: the bars are a small panel at the top left now (Kris)
    g.js("(()=>{ var ws=game.scene.getScene('World'); game.scene.stop('Dungeon'); ws.scene.wake('World'); })()"); g.wait(1500)
    r = g.js("""(()=>{ var t=[]; t.push(FAIRY_CHAT.join(' ')); var mons=['chime_spirit','rain_spirit','storm_heron','aurora_spirit'].map(function(id){ return (MON_BY_ID[id]||{}).name; });
      return {chat:/spirit/i.test(FAIRY_CHAT.join(' ')), mons:mons, title:document.title}; })()""")
    check('Familiars and monsters are no longer called spirits (fairy chat clean; %s)' % r['mons'], not r['chat'] and not any('Spirit' in (m or '') for m in r['mons']), r)
    r = g.js("(()=>{ var S=ZSCN.SHEETS.find(function(S){ return S.id==='sc_ent_forges'; }); return S?{wave:S.wave,ids:S.items.map(function(i){ return i[0]; })}:null; })()")
    check('Wave 52 ordered: the painted entrances (%s)' % (r and ', '.join(r['ids'])), r and r['wave'] == 52 and len(r['ids']) == 5, r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
