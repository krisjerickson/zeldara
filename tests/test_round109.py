"""Round 109: Kris's Lab picks.
  Inventory layout: sub-tabs under Weapons / Armor / Accessories, and all seven extras (sort menu, element chips, upgrades only,
  the same item stacked ×3, tier badges I–V, 🪙 mark to sell + "Sell all marked" at the merchant, a dot on new things).
  Site backdrops: all seven fixes (07zy3): a built edge, the backdrop far away, two moving layers, inside a tower, floating islands,
  painted wall caps, clear floor / plain void.
python tests/test_round109.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]))
WS = "game.scene.getScene('World')"
with game(painted=True) as g:
    g.wait(3000)
    g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.invSeen=null; ps.inventory=['iron_sword','iron_sword','iron_sword','flame_blade','short_bow','hand_axe'];
      var xb=Object.keys(ITEMS).find(k=>ITEMS[k].cls==='xbow'), st=Object.keys(ITEMS).find(k=>ITEMS[k].slot==='mWeapon'), hm=Object.keys(ITEMS).find(k=>ITEMS[k].slot==='head');
      ps.inventory.push(xb,st,hm); window._ids={xb:xb,st:st,hm:hm}; ps.equip.lHand='wooden_sword'; toggleModal('inventory'); ZINV.setFilter('weapons'); })()""" % WS)
    g.wait(600)
    a = g.js("[...document.querySelectorAll('.zv-sub')].map(b=>b.textContent.trim())")
    check('Weapons has sub-tabs with counts (%s)' % a, len(a) == 6 and a[0].startswith('⚔️ All') and any('Axes' in x and x.endswith('1') for x in a) and any('Crossbows' in x and x.endswith('1') for x in a), a)
    g.js("ZINV.setSub('sword')"); g.wait(300)
    b = g.js("[...document.querySelectorAll('.zv-grid .zv-tile')].map(t=>t.dataset.tip)")
    check('Swords shows only the swords, the same sword stacked ×3 and a tier badge (%s)' % b, len(b) == 2 and any('Iron Sword ×3' in t for t in b) and all('tier' in t for t in b), b)
    check('…best first (Flame Blade before Iron Sword)', b and b[0].startswith('Flame Blade'), b)
    g.js("ZINV.setSort('name')"); g.wait(300)
    c = g.js("[...document.querySelectorAll('.zv-grid .zv-tile')].map(t=>t.dataset.tip.split(' ')[0])")
    check('Sort by name (%s)' % c, c == ['Flame', 'Iron'], c)
    g.js("ZINV.setSort('power'); ZINV.setSub('all'); ZINV.setEl('fire')"); g.wait(300)
    d = g.js("[...document.querySelectorAll('.zv-grid .zv-tile')].map(t=>t.dataset.tip.split(' ·')[0])")
    check('Element chip 🔥 shows only fire gear (%s)' % d, d == ['Flame Blade'], d)
    g.js("ZINV.setEl('fire'); ZINV.setUpg()"); g.wait(300)
    e = g.js("[...document.querySelectorAll('.zv-grid .zv-tile')].map(t=>t.dataset.tip.split(' ·')[0].split(' ×')[0])")
    check('"Upgrades only" hides what does not beat what you wear (%s)' % e, 'Flame Blade' in e and 'Iron Sword' in e and len(e) >= 3, e)
    g.js("ZINV.setUpg()")
    f = g.js("""(()=>{ var ws=%s, ps=ws.playerState; var n0=document.querySelectorAll('.zv-dot').length; ps.inventory.push('long_sword'); ZINV.render(ps); var n1=[...document.querySelectorAll('.zv-tile.zv-new')].map(t=>t.dataset.tip); ZINV.setSub('sword'); var n2=document.querySelectorAll('.zv-dot').length; ZINV.setSub('all');
      closeModal('inventory'); toggleModal('inventory'); ZINV.render(ps); var n3=document.querySelectorAll('.zv-dot').length; return {n0:n0, n1:n1, n2:n2, n3:n3}; })()""" % WS)
    check('A dot on what is new since you last looked: it stays while you browse, and is gone once you close and come back (%s)' % f, f['n0'] == 0 and len(f['n1']) == 1 and 'Long Sword' in f['n1'][0] and f['n2'] == 1 and f['n3'] == 0, f)
    g.js("ZINV.pick('iron_sword')"); g.wait(200)
    h = g.js("(()=>{ var b=[...document.querySelectorAll('.zv-mkb')][0]; var t0=b&&b.textContent; b&&b.click(); return {t0:t0, mk:document.querySelectorAll('.zv-coin').length, ps:Object.keys(%s.playerState.sellMarks||{})}; })()" % WS)
    check('🪙 Mark to sell marks the item (%s)' % h, h['t0'] and 'Mark to sell' in h['t0'] and h['mk'] == 1 and h['ps'] == ['iron_sword'], h)
    g.js("closeModal&&closeModal('inventory')")
    k = g.js("""(()=>{ var ws=%s, ps=ws.playerState, g0=ps.gold; _merchantShopMode='sell'; openBuildingShop('merchant',ps,ws); var b=document.querySelector('.zv-sellall'); var t=b&&b.textContent; window._merchantSellMarked(); return {t:t, left:ps.inventory.filter(i=>i==='iron_sword').length, gold:ps.gold-g0, marks:Object.keys(ps.sellMarks||{})}; })()""" % WS)
    check('The merchant offers "Sell all marked" and sells every marked copy (%s)' % k, k['t'] and 'Sell all marked' in k['t'] and '3 items' in k['t'] and k['left'] == 0 and k['gold'] > 0 and not k['marks'], k)
    g.js("closeModal&&closeModal('camp')")
    l = g.js("(()=>{ var ws=%s; ZINV.setFilter('armor'); toggleModal('inventory'); ZINV.render(ws.playerState); var s=[...document.querySelectorAll('.zv-sub')].map(b=>b.textContent.trim().replace(/^\\S+ /,'').replace(/ \\d+$/,'')); ZINV.setFilter('accessories'); var a=[...document.querySelectorAll('.zv-sub')].map(b=>b.textContent.trim().replace(/^\\S+ /,'').replace(/ \\d+$/,'')); return {s:s, a:a}; })()" % WS)
    check('Armor and Accessories have their sub-tabs (%s)' % l, l['s'] == ['All', 'Helmets', 'Body', 'Legs', 'Boots', 'Gloves', 'Shields'] and l['a'] == ['All', 'Amulets', 'Cloaks', 'Rings'], l)
    g.js("closeModal&&closeModal('inventory')")
    # ── the backdrops ──
    L = """(([id,floor])=>{var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.id===id); ws.playerState.godMode=true;
      var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
      if(game.scene.isActive('Dungeon'))game.scene.stop('Dungeon'); if(game.scene.isActive('World'))ws.scene.sleep('World'); game.scene.start('Dungeon',data);})"""
    g.js("window._zc={edge:0,cap:0}; ['edge','cap'].forEach(function(k){ var f=ZBD[k]; ZBD[k]=function(){ _zc[k]++; return f.apply(this,arguments); }; })")
    g.js(L, ['s3_tower', 1]); g.wait(7000)
    t = g.js("(()=>{ var d=game.scene.getScene('Dungeon'), S=d._zv, V=d._lab.zvoid; return {k:ZVOID.kindOf(V), tower:!!V.tower, ts:S.L[0].o.tileScaleX, pf:S.L[0].pf, near:S.bd.length, haze:!!S.bdHaze, vig:!!S.bdVig, zc:_zc}; })()")
    check('A tower\'s upper floor: inside its wall with windows, the cloud sea far off (a third the size, slower), a near layer drifting, haze (%s)' % t,
          t['k'] == 'clouds' and t['tower'] and abs(t['ts'] - 1/3) < 0.01 and t['pf'] <= 0.32 and t['near'] == 2 and t['haze'] and t['vig'] and t['zc']['edge'] >= 1 and t['zc']['cap'] > 50, t)
    g.js(L, ['s3_dungeon', 0]); g.wait(7000)
    u = g.js("(()=>{ var d=game.scene.getScene('Dungeon'), S=d._zv, V=d._lab.zvoid; return {k:ZVOID.kindOf(V), tower:!!V.tower, island:ZBD.island(V), layers:S.bd.length}; })()")
    check('A floor over the abyss is a floating island: small islands far off and the near mist (%s)' % u, u['k'] == 'abyss' and not u['tower'] and u['island'] and u['layers'] == 2, u)
    v = g.js("(()=>{ var V=ZVOID.pick({type:'tower',el:'shadow',id:'x'},{liq:'stars'},0,3); return {k:ZVOID.kindOf(V), solid:ZBD.solid(V), tower:!!V.tower}; })()")
    check('Floors over the stars get solid stone; the void stays darker (%s)' % v, v['k'] == 'stars' and v['solid'], v)
    w = g.js("(()=>{ var c=document.createElement('canvas'); c.width=c.height=64; var x=c.getContext('2d'); x.fillStyle='#ffffff'; x.fillRect(0,0,64,64); ZBD.cap(x,0,0,32,32,{wallTop:'#f0f0f0'},null,true,'earth'); var d=x.getImageData(0,0,32,32).data, dark=0; for(var i=0;i<d.length;i+=4)if(d[i]<200)dark++; return dark; })()")
    check('A wall top is painted with bricks, not a blank block (%d darker pixels of 1024)' % w, w > 60, w)
print('%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
