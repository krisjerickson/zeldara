"""Round 53 — the new name (THE QUESTS OF ZELDARA AND ZELDOR; ten wordmarks in the Lab; the heroes are Zeldara and Zeldor; the land is
Runeheim), the forge by stages (docs/29), the ring cap, Sovereign as the seventh element, and the spirit saga part 2: soul gems from the
dungeon spirits, island metals, Mira's workshop and the hearth trays. Plus the wave 54 option sheets and the Lab's "Spirits & stones".
Run: python tests/test_round53.py"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
ROOT = os.path.join(os.path.dirname(__file__), '..')
lab = open(os.path.join(ROOT, 'lab', 'index.html'), encoding='utf8').read()

with game(new=True, painted=True) as g:
    g.wait(4000)
    r = g.js("""(()=>{ var W=ZBrand.wordById(ZBrand.WORDMARK); return {title:document.title, wm:ZBrand.WORDMARK, tall:!!W.tall, fam:W.fam, n:(ZBrand.QZ||[]).length, names:(ZBrand.QZ||[]).map(function(id){ return ZBrand.wordById(id).name; }),
      tag:(ZBrand.TAGLINE||[]).join(' '), m:heroName({hero:'m'}), f:heroName({hero:'f'})}; })()""")
    check('The game is THE QUESTS OF ZELDARA AND ZELDOR ("%s"); the title shows the new three-line name (%s) in MedievalSharp' % (r['title'], r['wm']), r['title'] == 'The Quests of Zeldara and Zeldor' and r['tall'] and r['fam'] in ('MedievalSharp', 'Eagle Lake'), r)      # round 71: Kris's new pick
    check('Ten wordmarks to choose from (%s)' % ', '.join(r['names']), r['n'] == 10 and len(set(r['names'])) == 10, r)
    check('The heroes are Zeldara (the girl) and Zeldor (the boy); the land is Runeheim ("%s")' % r['tag'][:60], r['m'] == 'Zeldor' and r['f'] == 'Zeldara' and 'Runeheim' in r['tag'], r)
    # ── the forge by stages ──
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.gold=99999; ps.inventory=ps.inventory.concat(['iron_sword','gem_ruby','gem_ruby','flame_iron']);
      var L=function(id){ return !!ZForge.lock(ps,id); }, o={t1:L('flame_iron'), t2:L('inferno_edge'), t3:L('magma_cleaver'), t4:L('volcano_lord'), xb:L('ember_crossbow'), ab:L('geyser_arbalest'), du:L(ZForge.DUAL[0]), top:L('elemental_sovereign')};
      o.node=/🔒/.test(ZForge.node(ps,'inferno_edge')); o.det=/Locked/.test(ZForge.detail(ps,'inferno_edge',true)); var n0=ps.inventory.filter(function(x){ return x==='inferno_edge'; }).length; window._craftItem('inferno_edge'); o.made=ps.inventory.filter(function(x){ return x==='inferno_edge'; }).length-n0;
      ps.unlockedSections=[1,2]; o.t2b=L('inferno_edge'); o.t3b=L('magma_cleaver'); ps.unlockedSections=[1,2,3,4]; o.t4c=L('volcano_lord'); o.topc=L('elemental_sovereign'); ps.unlockedSections=[1]; return o; })()""")
    check('From the start only the first heat of each lane: T2+ (%s), crossbows and bows, arbalests, master-works and the Elemental Sovereign are locked' % r, not r['t1'] and r['t2'] and r['t3'] and r['t4'] and r['xb'] and r['ab'] and r['du'] and r['top'], r)
    check('A locked tile shows a padlock and what opens it, the Forge button is locked, and forging it is refused', r['node'] and r['det'] and r['made'] == 0, r)
    check('Each realm that opens teaches the next heat (Wetlands → T2; Ashlands → T4); the Sovereign waits for the forges to rise', not r['t2b'] and r['t3b'] and not r['t4c'] and r['topc'], r)
    # ── the ring cap and Sovereign ──
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.equip=ps.equip||{}; var e0=JSON.stringify(ps.equip); for(var i=1;i<=10;i++)ps.equip['ring'+i]='band_ring~fire'; var pow=ZHit.sums(ps).pow.fire;
      var mon=(ws.worldMonsters||[]).find(function(m){ return !m.dead&&m.def; }); ps.equip.lHand='sov_axe'; var tierN=ZEL.tier(ZEL.item(ITEMS.sov_axe),ZEL.mon(mon),false), plain=ZHit.dmg(ws,mon,50,'melee',{pure:true,noProc:true});
      mon.sovWard=1; var sov=ZHit.dmg(ws,mon,50,'melee',{pure:true,noProc:true}); ps.equip.lHand='flame_iron'; var other=ZHit.dmg(ws,mon,50,'melee',{pure:true,noProc:true}); mon.sovWard=0; ps.equip=JSON.parse(e0);
      return {pow:pow, tierN:tierN, plain:plain, sov:sov, other:other, chip:ZElUI.chips(ZEL.item(ITEMS.sov_axe)).indexOf('Sovereign')>=0, name:ZEL.name(ZEL.item(ITEMS.elemental_sovereign))}; })()""")
    check('Ten fire-gemmed rings now give +%d%% fire damage (capped at +40%%)' % round(r['pow'] * 100), abs(r['pow'] - 0.4) < 1e-6, r)
    check('Sovereign is the seventh element: no weakness against an ordinary monster; ×2 against a Muspelheim ward (%d) while a fire blade does ×0.35 (%d)' % (r['sov'], r['other']), r['tierN'] == 0 and r['chip'] and r['name'] == 'Sovereign' and r['sov'] == 140 and r['other'] <= 25, r)
    # ── soul gems, metals, Mira ──
    r = g.js("""(async()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ps.completedQuests=(ps.completedQuests||[]).concat(['s1_dungeon']); await new Promise(function(r){ setTimeout(r,2500); });
      var el=document.getElementById('fairy-talk'), t=el&&el.style.display!=='none'?el.textContent:''; FairyTalk.close(); return {gem:ps.inventory.indexOf('grovesoul')>=0, t:t.slice(0,160), metals:[1,2,3,4].map(function(q){ return HARBOR_ISLANDS[q].shopItems.indexOf(ZMIRA.METAL[q])>=0; }), price:ITEMS.sea_silver.buy}; })()""")
    check('Winning the Grasslands\' boss dungeon frees its great spirit, who gives the Grovesoul ("%s…")' % r['t'][:70], r['gem'] and 'Hildr' in r['t'] and 'Zeldor' in r['t'], r)
    check('Each familiar island\'s trader sells its realm\'s metal (Sea-silver %dg …)' % r['price'], all(r['metals']), r)
    r = g.js("""(async()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.rescued=[1,2]; ps.unlockedSections=[1,2,3]; var st=villageStageOf(ps); villageApply(ws.wd,st).forEach(function(c){ ws._refreshChunkAt(c[0]*WCH,c[1]*WCH); }); ws.wd.villageStage=st;
      await new Promise(function(r){ setTimeout(r,1500); }); var D=ZMIRA.door(); ws.player.x=D.x; ws.player.y=D.y+20; ws.player.cont.setPosition(ws.player.x,ws.player.y); await new Promise(function(r){ setTimeout(r,800); });
      var txt=function(){ var p=ws._interactPrompt; return p?(p.text||(p.node&&p.node.textContent)||''):''; }, shut=txt(); ps.castlesDone=['q1_c']; if(ws._interactPrompt){ ws._interactPrompt.destroy(); ws._interactPrompt=null; } await new Promise(function(r){ setTimeout(r,500); }); var open=txt();
      ws._enterBuilding({type:'workshop'}); await new Promise(function(r){ setTimeout(r,2500); }); var B=game.scene.getScene('Building'), npc=B._imap.npc.id;
      ps.gold=1000; ps.inventory.push('sea_silver'); B._npcInteract(); var el=document.getElementById('fairy-talk'), btns=Array.from(el.querySelectorAll('button')).map(function(b){ return b.textContent; }); FairyTalk.close();
      ZMIRA.make(ws,1); FairyTalk.close(); var o={shut:shut, open:open, npc:npc, btns:btns, tray:ps.inventory.indexOf('hearth_tray_1')>=0, left:[ps.inventory.indexOf('sea_silver'),ps.inventory.indexOf('grovesoul')], gold:ps.gold, q:ZROLL.questHTML(ps).indexOf('Ember Hearth Tray ✓')>=0};
      if(B.scene.isActive()){ B.scene.stop(); ws.scene.wake(); } return o; })()""")
    check('Mira\'s workshop is shut ("%s") until an island castle is cleared, then opens ("%s")' % (r['shut'], r['open']), 'shut' in r['shut'] and 'Enter' in r['open'], r)
    check('Inside, Mira at her bench offers the Ember Hearth Tray for Sea-silver and the Grovesoul (%s)' % r['btns'], r['npc'] == 'crafts_2' and any('Ember Hearth Tray' in b for b in r['btns']), r)
    check('She makes it: both used up, 150g, the tray in your bag, the journal ticks it', r['tray'] and r['left'] == [-1, -1] and r['gold'] == 850 and r['q'], r)
    r = g.js("(()=>{ var ids=[]; ZSCN.SHEETS.filter(function(S){ return S.wave===54; }).forEach(function(S){ ids.push(S.id); }); return ids; })()")
    check('Wave 54 ordered: spirit looks, groupings and bindstones to choose from, Mira\'s furniture and the icons (%s)' % ', '.join(r), len(r) == 7 and 'sc_spirit_grp_opts' in r and 'sc_bindstone_opts_b' in r, r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

check('The Lab has "The new name" (ten wordmarks) and "Spirits & stones" (looks, groupings, bindstones)', re.search(r"id:['\"]qname", lab) and re.search(r"id:['\"]spiritopt", lab) and 'Zeldara &amp; Zeldor Design Lab' in lab)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
