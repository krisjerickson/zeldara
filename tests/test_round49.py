"""Round 49 — skills in the adventure sites, the mana bar always on, a way in and out on every floor (marked on the minimap), a wall round
the sites that stand in open land with nothing painted over them, the dungeon lag (the darkness and the fog), and the soft / painted
attack effects in place of the hard little squares and stair-stepped lines.
Run: python tests/test_round49.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

L = """(([id,floor])=>{var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.id===id); ws.playerState.godMode=true;
  var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
  if(game.scene.isActive('Dungeon'))game.scene.stop('Dungeon'); if(game.scene.isActive('World'))ws.scene.sleep('World'); game.scene.start('Dungeon',data);})"""

with game(new=True, painted=True) as g:
    g.wait(5000)
    # ── the mana bar, from the very start ──
    r = g.js("(()=>{ var b=document.getElementById('mana-bar'), row=b&&b.closest('.srow'); var ps=game.scene.getScene('World').playerState; return {shown:!!row&&row.style.display!=='none', spells:ZMANA.has(ps)}; })()")
    check('The mana bar shows in the overworld from the start, before any spell (%s)' % r, r['shown'] and not r['spells'], r)

    # ── every floor: a way on, reachable from where you arrive (hidden doors counted as doors) ──
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), bad=[], n=0; ws.wd.sites.forEach(function(s){ var nf=s.floors||3; for(var f=0;f<nf;f++){ var sp=null, m=null; try{ sp=_siteFloorSpec(s,f,nf); if(sp)m=_buildSiteFloor(sp); }catch(e){} if(!m||!m.site)continue; n++;
        var W=m.w, H=m.h, sx=Math.floor(m.spawn.x/LT), sy=Math.floor(m.spawn.y/LT), last=f===nf-1, tgt=m.site.exit||m.site.goal||m.site.boss||null; if(!tgt){ if(!last)bad.push([s.id,f,'no way on']); continue; }
        var door={}; (m.site.secrets||[]).forEach(function(q){ door[q[1]*W+q[0]]=1; }); var open=function(k){ return !m.solid[k]||door[k]; };
        var seen=new Uint8Array(W*H), q=[sy*W+sx], h=0; seen[q[0]]=1; while(h<q.length){ var k=q[h++], x=k%W, y=(k/W)|0; for(var i=0;i<4;i++){ var X=x+[1,-1,0,0][i], Y=y+[0,0,1,-1][i]; if(X<0||Y<0||X>=W||Y>=H)continue; var kk=Y*W+X; if(seen[kk])continue; seen[kk]=1; if(open(kk))q.push(kk); } }
        var tx=Math.floor(tgt.x), ty=Math.floor(tgt.y), ok=false; for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){ var X=tx+dx, Y=ty+dy; if(X>=0&&Y>=0&&X<W&&Y<H&&seen[Y*W+X]&&open(Y*W+X))ok=true; } if(!ok)bad.push([s.id,f,last?'goal':'down']); } }); return {n:n,bad:bad}; })()""")
    check('All %d site floors have their way on (or their goal) reachable from where you arrive' % r['n'], r['n'] > 150 and not r['bad'], r['bad'][:6])

    # ── open land round a site: a wall all the way round, nothing painted over the site ──
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), Z=_scn(), out={floors:0,edge:[],decor:[],nDec:0}; ws.wd.sites.forEach(function(s){ var nf=s.floors||3; for(var f=0;f<nf;f++){ var m=null; try{ var sp=_siteFloorSpec(s,f,nf); if(sp)m=_buildSiteFloor(sp); }catch(e){} if(!m||!m.zvoid||m.zvoid.k!=='terrain'||!m._zclr)continue; out.floors++;
        var W=m.w, H=m.h, C=m._zclr, nb=0; for(var y=0;y<H;y++)for(var x=0;x<W;x++){ if(m.solid[y*W+x])continue; for(var j=-1;j<=1;j++)for(var i=-1;i<=1;i++){ var X=x+i, Y=y+j; if(X<0||Y<0||X>=W||Y>=H||C[Y*W+X])nb++; } } if(nb)out.edge.push([s.id,f,nb]);
        ZVOID.decorList(m,m.zvoid).forEach(function(d){ out.nDec++; var sz=Z.size(d[0],d[3]), w=sz?sz.w:d[3], x0=Math.floor((d[1]-w/2)/LT), x1=Math.floor((d[1]+w/2)/LT), y0=Math.floor((d[2]-d[3])/LT), y1=Math.floor((d[2]-1)/LT), bad=false;
          for(var yy=y0;yy<=y1;yy++)for(var xx=x0;xx<=x1;xx++){ if(xx<0||yy<0||xx>=W||yy>=H)continue; if(!C[yy*W+xx])bad=true; } if(bad&&out.decor.length<6)out.decor.push([s.id,f,d[0],Math.round(d[1]),Math.round(d[2])]); }); } }); return out; })()""")
    check('Sites in open land (%d floors): no walkable ground meets the open land — a wall stands between' % r['floors'], r['floors'] > 10 and not r['edge'], r['edge'][:6])
    check('Trees and rocks round them (%d) stand wholly on open ground, never over the site\'s walls or rooms' % r['nDec'], r['nDec'] > 100 and not r['decor'], r['decor'])

    # ── in a site: skills, the mana bar, the stairs on the minimap, the lag fixes ──
    g.js(L, ['s1_dungeon', 0]); g.wait(6000)
    r = g.js("""(()=>{ var d=game.scene.getScene('Dungeon'), t=d.stairsDownTile, cv=document.getElementById('minimap-hud-canvas'), c=cv.getContext('2d'); _drawMinimapHud(null,d);
      var x=Math.round((t.x+0.5)*cv.width/DW), y=Math.round((t.y+0.5)*cv.height/DH), p=c.getImageData(x,y,1,1).data, row=document.getElementById('mana-bar').closest('.srow');
      return {px:[p[0],p[1],p[2]], explored:!!d._dngFogExplored[t.y*DW+t.x], mana:row.style.display!=='none'}; })()""")
    check('In the site the mana bar still shows, and the way down is NOT marked on the minimap before you find it (round 60, Kris: "only show the exit once you\'ve revealed it") (%s)' % r, r['mana'] and not r['explored'] and not (r['px'][0] > 200 and r['px'][1] > 150 and r['px'][2] < 140), r)
    r = g.js("""(async ()=>{ var d=game.scene.getScene('Dungeon'), ps=d.worldScene.playerState; if(ps.inventory.indexOf('sp_war_stomp')<0)ps.inventory.push('sp_war_stomp'); ps.equip.special='sp_war_stomp'; ZSKILL.cdUntil=0;
      var mon=d.monsters.find(function(m){ return !m.dead; }); mon.x=d.px+30; mon.y=d.py; if(mon.cont)mon.cont.setPosition(mon.x,mon.y); var h0=mon.hp!==undefined?mon.hp:mon._hp;
      window.dispatchEvent(new KeyboardEvent('keydown',{key:'z',bubbles:true})); document.dispatchEvent(new KeyboardEvent('keydown',{key:'z',bubbles:true}));
      await new Promise(r=>setTimeout(r,400)); var h1=mon.hp!==undefined?mon.hp:mon._hp; return {h0:h0,h1:h1,cd:Math.round(ZSKILL.left()),dead:!!mon.dead}; })()""")
    check('Z uses the equipped skill in an adventure site: War Stomp hits the monster beside you (%s) and starts its cooldown' % r, (r['h1'] < r['h0'] or r['dead']) and r['cd'] >= 8, r)
    g.js(L, ['s3_dungeon', 0]); g.wait(6000)
    r = g.js("""(()=>{ var d=game.scene.getScene('Dungeon'), gl=game.renderer.gl, C={fb:0,tex:0}, o={b:gl.bindFramebuffer,t:gl.texImage2D,c:gl.createTexture,f:gl.createFramebuffer};
      gl.bindFramebuffer=function(){ C.fb++; return o.b.apply(gl,arguments); }; gl.createTexture=function(){ C.tex++; return o.c.apply(gl,arguments); }; gl.createFramebuffer=function(){ C.tex++; return o.f.apply(gl,arguments); };
      game.loop.sleep(); for(var i=0;i<10;i++)game.step(performance.now(),16.6); game.loop.wake(); gl.bindFramebuffer=o.b; gl.createTexture=o.c; gl.createFramebuffer=o.f; var v=d.cameras.main.worldView;
      return {dark:d._darkRT&&d._darkRT.type, darkPx:d._darkRT&&d._darkRT._zcv?[d._darkRT._zcv.width,d._darkRT._zcv.height]:null, view:[Math.round(v.width),Math.round(v.height)], fog:d._dngFogGfx&&d._dngFogGfx.type, fbPerFrame:C.fb/10, newTex:C.tex}; })()""")
    check('Lag: the darkness is a small picture of the view (%s for a %s view), the fog one picture, no render targets made or resized each frame (%s binds a frame)' % (r['darkPx'], r['view'], r['fbPerFrame']),
          r['dark'] == 'Image' and r['darkPx'] and r['darkPx'][0] <= r['view'][0] / 2 and r['fog'] == 'Image' and r['newTex'] == 0 and r['fbPerFrame'] <= 30, r)

    # ── the attack effects ──
    r = g.js("""(async ()=>{ var d=game.scene.getScene('Dungeon'), A=MX.A(d), AT=MX.ATK, P=A.p(), mon=d.monsters.find(function(m){ return !m.dead&&m._m; }), m=mon._m; mon.x=P.x+120; mon.y=P.y; if(mon.cont)mon.cont.setPosition(mon.x,mon.y);
      var kinds=function(){ var o={}; d.children.list.forEach(function(c){ o[c.type]=(o[c.type]||0)+1; }); return o; }, k0=kinds();
      MX.fxDot(A,P.x,P.y,'#ff9040',0.9); AT.pull.fire(A,mon,m,P,{col:'#ff7090',m:0}); var db={t:0}; AT.drain.fire(A,mon,m,P,{},db); AT.drain.act(A,mon,m,P,{},db,0.016); _heroBolt(d,P.x,P.y-60,P.x+100,P.y-90,0xffff66);
      var k1=kinds(); var rb={}; AT.ring.fire(A,mon,m,P,{gap:1},rb); AT.ring.act(A,mon,m,P,{gap:1},rb,0.1); var ringPic=!!(rb._zim&&rb._zim.mask), ringHidden=rb.g&&!rb.g.visible;
      var n0=d.children.list.length; AT.lob.fire(A,mon,m,P,{col:'#9a8a78'}); var ball=d.children.list.slice(n0).find(function(c){ return c.type==='Image'&&/zs_rock|zfx_fx_pj/.test(c.texture.key); });
      var s=ZShot.make(d,'frost_bolt',P.x,P.y,0,15); var lin=function(k){ var t=game.textures.get(k); return t&&t.source&&t.source[0]?t.source[0].scaleMode:null; };
      return {graphicsAdded:(k1.Graphics||0)-(k0.Graphics||0), containersAdded:(k1.Container||0)-(k0.Container||0), ringPic:ringPic, ringHidden:ringHidden, ball:!!ball, linear:Object.assign({shot:lin(s.texture.key),dot:lin('dot')},(function(){ var o={}; game.textures.getTextureKeys().filter(function(k){ return /^(zsoft_|zfx_fx_(mote|ring_wave|lash|drain|fam|bolt|pj|trap))/.test(k); }).forEach(function(k){ o[k]=lin(k); }); return o; })())}; })()""")
    check('Attack lines (lash, drain, chain lightning) are soft beams, not stair-stepped lines (%s graphics, %s soft groups)' % (r['graphicsAdded'], r['containersAdded']), r['graphicsAdded'] == 0 and r['containersAdded'] >= 3, r)
    check('The expanding ring is a painted ring cut to keep its gap; the lobbed stone a real stone', r['ringPic'] and r['ringHidden'] and r['ball'], r)
    check('Shots, motes and soft pictures are sampled smoothly, not pixel by pixel (%s)' % r['linear'], len(r['linear']) >= 5 and all(v == 0 for v in r['linear'].values()), r['linear'])
    r = g.js("(()=>{ var ids=[]; ZSCN.SHEETS.filter(function(S){ return S.wave===51; }).forEach(function(S){ (S.items||[]).forEach(function(it){ ids.push(it[0]); }); }); return ids; })()")
    check('Wave 51 ordered: %d painted attack pieces (%s…)' % (len(r), ', '.join(r[:5])), len(r) == 16 and 'fx_ring_wave' in r and 'fx_pj_rock' in r, r)
    r = g.js("(()=>{ var ids=[]; ZSCN.SHEETS.filter(function(S){ return S.wave===51; }).forEach(function(S){ (S.items||[]).forEach(function(it){ ids.push(it[0]); }); }); return ids.filter(function(id){ return !ZScn.has(id); }); })()")
    check('All 16 wave 51 paintings are in the game', not r, r)
    g.js("(()=>{ var ws=game.scene.getScene('World'); game.scene.stop('Dungeon'); ws.scene.wake('World'); })()"); g.wait(1500)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
