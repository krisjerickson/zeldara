"""Round 60 — the forges remade as four painted floors with their own monsters (the old challenge scenes gone), quests taken only at the guild,
magic weapons and staff-craft at the apothecary (the Sovereign staff off the blacksmith), windows clear of the action bars, painted portraits for
freed spirits and fairies, no more pixel flowers or drawn sheep, Surtharn painted, and the Lab's Potions tab.
Run: python tests/test_round60.py"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"
SETUP = """var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ps.soulGems={1:1,2:1,3:1,4:1};
      ps.completedQuests=['s1_dungeon','s2_dungeon','s3_dungeon','s4_dungeon','s1_tower','s2_tower','s3_tower','s4_tower']; ps.rescued=[1,2,3,4]; ps.unlockedSections=[1,2,3,4]; _wgApplyGates(ws.wd,ps); await w(2600); if(typeof FairyTalk!=='undefined')FairyTalk.close();"""

with game(new=True, painted=True) as g:
    g.wait(4000)
    r = g.js("""(async()=>{ %s %s var site=ws.wd.sites.find(function(s){ return s.id==='volcano_n'; }); ws._enterSite(site); await w(5500); var D=game.scene.getScene('Dungeon');
      var o={old:['VolcanoMaze','VolcanoBulletHell','VolcanoPuzzle','VolcanoEscape'].some(function(k){ return game.scene.isActive(k); }), run:game.scene.isActive('Dungeon'), floor:D.floor, max:D.maxFloors, title:document.getElementById('dng-title').textContent,
        mons:D.monsters.filter(function(m){ return !m.dead; }).map(function(m){ return m.rid; })};
      var site2=ws.wd.sites.find(function(s){ return s.id==='volcano_e'; }); game.scene.getScene('Dungeon')._exitToWorld(null); await w(1200); ws._enterSite(site2); await w(1500); o.sealed=!game.scene.isActive('Dungeon'); return o; })()""" % (W, SETUP))
    check('The forge door opens straight onto the first of four painted floors ("%s"), its own monsters (%s); no old challenge scene; the next forge stays sealed' % (r['title'], ', '.join(sorted(set(r['mons'])))), not r['old'] and r['run'] and r['floor'] == 0 and r['max'] == 4 and len(r['mons']) >= 3 and set(r['mons']) <= {'bellows_imp', 'coalback'} and r['sealed'], r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), o={fl:[]}; for(var f=1;f<4;f++){ ZFORGE.enter(ws,'volcano_s',f); await w(5500); var D=game.scene.getScene('Dungeon'); o.fl.push(f+':'+(D._forgeSp||[]).length+':'+(D.isLastFloor?'last':'')+':'+(D._forgeHearth?'hearth':'')); }
      var D2=game.scene.getScene('Dungeon'), H=D2._forgeHearth; o.boss=D2._bossGroup&&D2._bossGroup[0]&&D2._bossGroup[0].def.name; o.overlay=D2.children.list.filter(function(c){ return c.type==='Arc'&&c.blendMode===Phaser.BlendModes.ADD; }).length;
      var K=Object.keys(ZFORGE.MONS).map(function(k){ return ZFORGE.MONS[k]; }).reduce(function(a,b){ return a.concat(b); },[]); o.kits=K.filter(function(id){ return MX.KITS[id]&&MON_BY_ID[id]; }).length; o.leak=MON_ROSTER.filter(function(R){ return R.seg==='forge'; }).length;
      game.scene.getScene('Dungeon')._exitToWorld(null); await w(1000); return o; })()""" % W)
    check('Floors 2–4: the spirit galleries (5), the deep workings (5), the hearth hall with %s and the hearth — no drawn fire over it (%d sparks); eight forge monsters with kits (%d)' % (r['boss'], r['overlay'], r['kits']), r['fl'] == ['1:5::', '2:5::', '3:0:last:hearth'] and 'Krag' in (r['boss'] or '') and r['overlay'] == 0 and r['kits'] == 8 and r['leak'] == 8, r)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; renderQuestList(ps.unlockedSections,ps.completedQuests,ps.activeQuest,ws); var c=document.getElementById('quest-list-container'), acc=c.querySelectorAll('button.qacc').length, gu=c.textContent.indexOf('at the Guild')>=0;
      var t=0; window._acceptQuest('s1_harbor'); var took=ps.activeQuest==='s1_harbor'; return {acc:acc, gu:gu, took:took, txt:/Defeat Surtharn/.test(c.textContent)}; })()""")
    check('The quest list outside the guild only shows quests (no Accept buttons, "at the Guild"); taking one there does nothing', r['acc'] == 0 and r['gu'] and not r['took'], r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ws._enterBuilding({type:'guild'}); await w(3000); renderQuestList(ps.unlockedSections,ps.completedQuests,ps.activeQuest,ws); var acc=document.querySelectorAll('#quest-list-container button.qacc').length;
      var B=game.scene.getScene('Building'); if(B&&B._exitBuilding)B._exitBuilding(); await w(1500); return {acc:acc}; })()""" % W)
    check('In the guild the quests can be taken (%d Accept buttons)' % r['acc'], r['acc'] >= 1, r)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.gold=500; ps.inventory.push('magic_wand','gem_ruby'); openBuildingShop('apothecary',ps,ws); var el=document.getElementById('camp-content'), sc=/Staff-craft/.test(el.textContent), rows=el.querySelectorAll('.zt-row').length, staffs=Array.from(el.querySelectorAll('.si-name')).filter(function(n){ return /Staff|Wand|Rod/.test(n.textContent); }).length;
      ZAPO.make(0); var got=ps.inventory.indexOf('ember_staff')>=0&&ps.inventory.indexOf('magic_wand')<0&&ps.inventory.indexOf('gem_ruby')<0, gold=ps.gold; closeModal('camp');
      var bs=ZForge.html(ps); return {sc:sc, rows:rows, staffs:staffs, got:got, gold:gold, sovBlack:/Sovereign staff/i.test(bs)||!!ZForge.recipe('sov_staff')}; })()""")
    check('The apothecary sells the staffs (%d) and works them up (%d staff-craft rows): wand + ruby + 60 g → Staff of Embers; the blacksmith no longer makes the Sovereign staff' % (r['staffs'], r['rows']), r['sc'] and r['rows'] >= 7 and r['staffs'] >= 4 and r['got'] and r['gold'] == 440 and not r['sovBlack'], r)
    r = g.js("""(()=>{ var ov=document.createElement('div'); ov.className='overlay'; document.body.appendChild(ov); var cs=getComputedStyle(ov), pb=parseInt(cs.paddingBottom); ov.remove();
      var F={id:'x',name:'Test',F:FAIRY_DESIGNS[0]}; FairyTalk.show(F,'hi',[{t:'ok'}]); var cv=document.getElementById('ft-cv'), cw=cv&&cv.width; FairyTalk.close();
      var calls=0, ctx={beginPath(){},arc(){ calls++; },fill(){},fillRect(){ calls++; },set fillStyle(v){}}, c={R:{f:Math.random,pick:function(a){ return a[0]; }},m:{sprites:[]}}; var Zs=_scn(), off=ZScn.off; ZScn.off=true; WPROP.flowers(c,ctx,0,0,64,64,{cols:['#ffffff','#fff3a8'],n:20}); WPROP.sheep(c,ctx,0,0,32,32,{}); ZScn.off=off;
      return {pb:pb, cw:cw, dots:calls, sheep:c.m.sprites.length, surt:ZAtlas.has('surt_1')&&ZAtlas.has('surt_6'), sform:BOSS_PHASES.surtharn.phases[0].form}; })()""")
    check('Windows sit above the action bars (%d px); fairies and freed spirits talk from a %d px painted portrait; no pixel flowers (%d dots) and no drawn sheep; Surtharn is painted' % (r['pb'], r['cw'], r['dots'], ), r['pb'] >= 120 and r['cw'] == 150 and r['dots'] == 0 and r['sheep'] == 0 and r['surt'], r)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), R=MON_ROSTER.filter(function(R){ return R.seg==='main'&&R.tier===3&&R.spec.plan==='biped'; }), hp={}; R.forEach(function(x){ if(!hp[x.q])hp[x.q]=MX.stats(x).hp; });
      var chop=ws._chopTree(ws.player.x,ws.player.y,'down'), dens=ZWE.LOOK.dens, ft=parseFloat(getComputedStyle(document.querySelector('.ft-text')||document.body).fontSize);
      ZSPIRIT.talk('T','#fff','hello',[{t:'ok'}],null); var fs=parseFloat(getComputedStyle(document.querySelector('#fairy-talk .ft-text')).fontSize); FairyTalk.close();
      return {hp:hp, chop:chop, dens:dens, fs:fs, src:ZSTAIRMM.draw.toString().indexOf('seen(on)')>=0, shield:WorldScene.prototype._movePlayer?/_shielding\?0\.25/.test(WorldScene.prototype.update.toString()+WorldScene.prototype._movePlayer.toString()):null}; })()""")
    check('Monster health by realm ×1 / 1.5 / 2 / 2.5 (%s); no tree chopping; terrain pieces at 70 %% (%s); dialog text %s px; the exit shows once explored' % (r['hp'], r['dens'], r['fs']), r['hp'].get('1') and r['hp']['2'] / r['hp']['1'] > 3 and r['hp']['4'] / r['hp']['1'] > 18 and r['chop'] is False and abs(r['dens'] - 0.266) < 1e-6 and r['fs'] >= 14 and r['src'], r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

lab = open(os.path.join(os.path.dirname(__file__), '..', 'lab', 'index.html'), encoding='utf8').read()
check('The Lab: a Potions tab with rebalance and new-potion proposals', 'the potions, rebalanced and expanded' in lab and 'Spell oils' in lab)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
