"""Round 18: the engine switch (Phaser 3.60 default, Phaser 4 optional), two playable heroes, the sprite library
manifest (every character, its moves, sheets and ChatGPT requests), the hero weapon / skill mapping and the Lab tab.
Run: python tests/test_round18.py            (Phaser 3.60)
     ZELDARA_ENGINE=4 python tests/test_round18.py   (Phaser 4)"""
import sys, os, re, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game, PHASER, ENGINE
from playwright.sync_api import sync_playwright
R=os.path.join(os.path.dirname(__file__),'..')
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info)[:500] if info!='' else ''), flush=True)
def to_world(g):
    for _ in range(80):
        g.wait(250)
        if g.js("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): return True
    return False

# ── build outputs ──
idx=open(os.path.join(R,'index.html'),encoding='utf-8').read()
check('The page can load either engine: ?engine=3 or ?engine=4, default 3.60', "engine=([34])" in idx and "ZELDARA_ENGINE||'3'" in idx and 'phaser/3.60.0' in idx and 'phaser@4' in idx)
p4=os.path.join(R,'dist','play4','index.html')
check('The hosted build has /play4 with Phaser 4 as its default', os.path.exists(p4) and "ZELDARA_ENGINE||'4'" in open(p4,encoding='utf-8').read())
art=open(os.path.join(R,'zeldara.artifact.html'),encoding='utf-8').read()
check('The artifact builds load one fixed engine (no document.write)', 'document.write' not in art and 'phaser/3.60.0/phaser.min.js' in art and 'document.write' not in open(os.path.join(R,'lab','lab.artifact.html'),encoding='utf-8').read())
J=json.load(open(os.path.join(R,'sprites','requests','requests.json'),encoding='utf-8'))
ids=[q['id'] for q in J['requests']]
check('Requests are exported: unique ids, every pilot id exists, every reference is a style image or another request', len(ids)==len(set(ids)) and all(p in ids for p in J['pilot']) and all(r in ('style_hero','style_centaur') or r in ids for q in J['requests'] for r in q['refs']), [len(ids),J['stats']['core']])
check('Every request names the teal highlight style and both references', all('teal' in J['style'] and 'Reference image 1' in q['body'] and 'Reference image 2' in q['body'] for q in J['requests'] if not q.get('legacy')))
G=[q for q in J['requests'] if q['id']=='hero_f.model']
check('Round 20: the girl is locked as look B (two long auburn braids, teal mantle); her model request attaches the boy\'s model sheet', len(G)==1 and 'LONG BRAIDED AUBURN' in G[0]['body'] and 'two long braids' in G[0]['body'] and 'hero_m.model' in G[0]['refs'] and not [q for q in J['requests'] if q['id'].startswith('hero_f.model_')])
BS=[q for q in J['requests'] if q['group']=='boss']
check('Round 21: every boss has its own sheets again (no shared boss sheets), and the pilot boss is the Goblin King', len(BS)>150 and not any(q.get('multi') for q in BS) and 'boss_goblin_king.core.s' in J['pilot'] and len(set(q['char'] for q in BS))==76, [len(BS)])
MD=[q for q in J['requests'] if q['group']=='monster' and any(p.startswith('death/') for p in q['poses'])]
RQ={q['id']:q for q in J['requests']}
check('Round 21: every monster has two death frames; the sheets already received (goblin, hog) keep their 8 poses', len(set(q['char'] for q in MD))==240 and all(sum(p.startswith('death/') for p in q['poses'])==2 for q in MD) and all(len(RQ[k]['poses'])==8 and not any(p.startswith('death/') for p in RQ[k]['poses']) for k in ('meadow_goblin.core.s','thistle_hog.core.q')), [len(MD)])
check('The two reference images are in the repo', all(os.path.exists(os.path.join(R,'sprites','reference',n+'.png')) for n in ('style_hero','style_centaur')))

# ── game ──
with game(new=None) as g:
    r=g.js("({v:Phaser.VERSION, z:ZENG.ver, v4:ZENG.v4, has:['tintFill','tint','mask','rtDone','config'].every(function(k){ return typeof ZENG[k]==='function'; })})")
    check('The engine helper matches the loaded engine ('+r['v']+')', r['z']==r['v'] and r['has'] and r['v4']==(ENGINE=='4'), r)
    # New game through the menus: name → slot → hero
    g.js("ZProfilesUI.newGame(function(isNew){ ZProfilesUI.close(); game.scene.getScene('Title').scene.start('Boot',{newGame:isNew}); })"); g.wait(200)
    g.js("document.getElementById('zp-name').value='Rin'; document.getElementById('zp-next').click()"); g.wait(200)
    g.js("document.querySelectorAll('.zp-slot')[0].querySelector('[data-a=new]').click()"); g.wait(400)
    r=g.js("({n:document.querySelectorAll('.zp-hero').length, t:[...document.querySelectorAll('.zp-hero b')].map(function(b){ return b.textContent; }), drawn:[...document.querySelectorAll('.zp-hero canvas')].map(function(cv){ var d=cv.getContext('2d').getImageData(0,0,100,168).data, n=0; for(var i=3;i<d.length;i+=4)if(d[i]>40)n++; return n; })})")
    check('New Game asks which hero: the boy or the girl, each with a picture', r['n']==2 and r['t']==['The boy','The girl'] and min(r['drawn'])>800, r)
    g.js("document.querySelector('.zp-hero[data-h=f]').click()")
    check('Choosing the girl starts the game', to_world(g))
    g.wait(900); g.key('d',300); g.wait(200)
    r=g.ws("({hero:ps.hero, key:ws.player.sprite.texture.key, anim:ws.player.anim})")
    check('The girl is the hero and is drawn with her own (stand-in) frames; the pose is tagged for the mapping', r['hero']=='f' and str(r['key']).startswith('heroF_') and r['anim'] in ('idle','walk'), r)
    r=g.js("""(()=>{ var T=game.textures, a=T.get('hero_front_0').getSourceImage(), b=T.exists('heroF_front_0')?T.get('heroF_front_0').getSourceImage():_heroRecolour(a); var px=function(s){ var c=document.createElement('canvas'); c.width=s.width; c.height=s.height; var x=c.getContext('2d'); x.drawImage(s,0,0); return x.getImageData(0,0,s.width,s.height).data; };
      var A=px(a), B=px(b), diff=0, n=0, alphaSame=true; for(var i=0;i<A.length;i+=4){ if(A[i+3]>40){ n++; if(Math.abs(A[i]-B[i])+Math.abs(A[i+1]-B[i+1])+Math.abs(A[i+2]-B[i+2])>40)diff++; } if(A[i+3]!==B[i+3])alphaSame=false; } return {diff:diff,n:n,alphaSame:alphaSame}; })()""")
    check('Her stand-in is the same shape with different hair and cape colours', r['alphaSame'] and r['diff']>r['n']*0.08 and r['diff']<r['n']*0.7, r)
    g.js("game.scene.getScene('World')._save()"); saved=g.js("JSON.parse(ZSave.read()).hero")
    check('The choice is saved', saved=='f', saved)
    # mapping
    r=g.js("""(()=>{ var H=ZSPR.HERO, o={}; var eq=function(e){ return {equipped:e}; };
      o.sword=H.animFor(eq({lHand:'iron_sword'}),'melee'); o.axe=H.animFor(eq({lHand:'axe'}),'melee'); o.cleaver=H.animFor(eq({lHand:'magma_cleaver'}),'melee'); o.none=H.animFor(eq({}),'melee');
      o.bow=H.animFor(eq({rHand:'longbow'}),'ranged'); o.xbow=H.animFor(eq({rHand:'bone_crossbow'}),'ranged'); o.staff=H.animFor(eq({mWeapon:'storm_staff'}),'spell'); o.wand=H.animFor(eq({mWeapon:'magic_wand'}),'spell'); o.hand=H.animFor(eq({}),'spell'); o.block=H.animFor(eq({}),'block');
      o.unclassed=Object.keys(ITEMS).filter(function(k){ return ['lHand','rHand','mWeapon','shield'].indexOf(ITEMS[k].slot)>=0&&!H.weaponClass(k); });
      o.skills=Object.keys(ITEMS).filter(function(k){ return ITEMS[k].slot==='special'; }); o.badSkill=o.skills.filter(function(k){ return !H.ANIMS[H.SKILL_ANIM[k]]; });
      var hm=ZSPR.all().find(function(e){ return e.id==='hero_m'; }), on={}; hm.sheets.forEach(function(s){ s.poses.forEach(function(p){ on[p.a]=1; }); }); o.offSheet=Object.keys(H.ANIMS).filter(function(k){ return !on[k]; });
      o.frame=H.frame('f','melee_axe','b',2)+' '+H.frame('m','whirlwind','f',1); return o; })()""")
    check('Weapons pick the animation: sword, battle axe, bow, crossbow, staff, wand, bare hand, shield', [r['sword'],r['axe'],r['cleaver'],r['none'],r['bow'],r['xbow'],r['staff'],r['wand'],r['hand'],r['block']]==['melee_sword','melee_axe','melee_axe','melee_sword','ranged_bow','ranged_xbow','magic_staff','magic_wand','magic_hand','block'], r)
    check('Every weapon and shield in the game has a class; all 12 skills have an animation; every hero animation is on a sheet', not r['unclassed'] and len(r['skills'])==12 and not r['badSkill'] and not r['offSheet'] and r['frame']=='hero_f/melee_axe/b/2 hero_m/whirlwind/s/1', r)
    # manifest
    r=g.js("""(()=>{ var S=ZSPR.stats(), A=ZSPR.all(), o={chars:S.chars,sheets:S.sheets,core:S.core,unknown:S.unknown,g:{}}; Object.keys(S.byGroup).forEach(function(k){ o.g[k]=S.byGroup[k].chars; });
      var mods={}; Object.keys(MON_KIT_SRC).forEach(function(id){ ZSPR.kitMods(ZSPR.kitOf(id)).forEach(function(m){ mods[m]=1; }); }); o.unmapped=Object.keys(mods).filter(function(m){ return !(m in ZSPR.MOD); });
      o.noCore=A.filter(function(e){ return e.group==='monster'&&!(e.sheets[0]&&e.sheets[0].poses.some(function(p){ return /idle|still/.test(p.a); })&&e.sheets[0].poses.some(function(p){ return /move|float|still/.test(p.a); })&&e.anims.some(function(a){ return a.main; })&&e.anims.some(function(a){ return a.k==='hurt'; })); }).map(function(e){ return e.id; });
      o.humNoFb=A.filter(function(e){ return (e.group==='monster'||e.group==='boss')&&e.humanoid&&!e.sheets.some(function(s){ return s.key==='fb'; }); }).length; o.beastFb=A.filter(function(e){ return e.group==='monster'&&!e.humanoid&&e.sheets.some(function(s){ return s.key==='fb'; }); }).length;
      o.bossNoPhase=A.filter(function(e){ return e.group==='boss'&&!(e.anims.some(function(a){ return a.k==='transform'; })&&e.anims.some(function(a){ return a.k==='death'; })); }).length;
      o.big=A.filter(function(e){ return e.sheets.some(function(s){ return s.poses.length>10||s.poses.length<1; }); }).length; o.riders=A.filter(function(e){ return e.group==='rider'; }).length; o.mounts=Object.keys(MOUNTS).length;
      o.bossQ0=A.filter(function(e){ return e.group==='boss'&&!e.q; }).length; return o; })()""")
    check('The survey covers everyone: 2 heroes, 240 monsters, 76 bosses and forms, every mount alone and with each hero', r['g'].get('hero')==2 and r['g'].get('monster')==240 and r['g'].get('boss')==76 and r['riders']==2*r['mounts'] and r['g'].get('mount')==r['mounts'] and r['g'].get('npc',0)>=40 and r['g'].get('familiar')==4 and r['g'].get('fairy')==23 and r['g'].get('animal')==16, r['g'])
    check('Every move in every monster kit maps to an animation (none left over)', not r['unmapped'] and not r['unknown'], [r['unmapped'],r['unknown']])
    check('Every monster\'s first sheet has idle, movement, its main attack and hurt; humanoids also get a front-and-back sheet, beasts do not', not r['noCore'] and r['humNoFb']==0 and r['beastFb']==0, [r['noCore'][:6],r['humNoFb'],r['beastFb']])
    check('Every boss has a phase change and a death; no sheet is empty or over 10 poses; every boss has a region', r['bossNoPhase']==0 and r['big']==0 and r['bossQ0']==0, r)
    # engine-sensitive drawing: hit flash, lava mask, night darkness
    r=g.js("""(()=>{ var ws=game.scene.getScene('World'), p=ws.player, o={}; var im=ws.add.image(p.x+40,p.y,'hero_front_0'); try{ ZENG.tintFill(im,0xffffff); o.fill=true; ZENG.tint(im,0xff0000); im.clearTint(); o.tint=true; }catch(e){ o.err=String(e); } im.destroy();
      var c=ws.add.container(p.x,p.y), t=ws.add.rectangle(0,0,40,40,0xff0000); c.add(t); var mk=ws.make.image({x:p.x,y:p.y,key:'hero_front_0',add:false}); try{ ZENG.mask(c,mk,'hero_front_0'); o.mask=true; }catch(e){ o.merr=String(e); } ws._zt=[c,mk]; return o; })()""")
    g.wait(400); g.js("game.scene.getScene('World')._zt.forEach(function(o){ o.destroy(); })")
    check('Hit flash, tint and masks work on this engine', r.get('fill') and r.get('tint') and r.get('mask'), r)
    errs=[e for e in g.errs if 'GL Driver' not in e and 'GPU stall' not in e]
    check('No JS errors (game, engine '+ENGINE+')', not errs, errs[:4])

# old save / plain new game = the boy
with game(new=True) as g:
    g.wait(500); r=g.ws("({hero:ps.hero})"); k=g.js("game.scene.getScene('World').player.sprite.texture.key")
    check('Without a choice (old saves, quick start) the hero is the boy', r['hero']=='m' and str(k).startswith('hero_'), [r,k])
    # night: the darkness layer draws on this engine (the screen gets darker)
    def lum():
        import io
        from PIL import Image
        im=Image.open(io.BytesIO(g.page.screenshot())).convert('L').crop((300,200,900,600)); px=list(im.getdata()); return sum(px)/len(px)
    g.js("(function(){ var ws=game.scene.getScene('World'); ws.player.x+=TILE*14; ws.player.y+=TILE*14; ws._forceNight=0; })()"); g.wait(1500); day=lum()
    g.js("game.scene.getScene('World')._forceNight=1"); g.wait(4000); night=lum()
    check('Night darkness is drawn (render texture) on this engine: the view gets clearly darker', day and night and night<day*0.8, [day,night])
    errs=[e for e in g.errs if 'GL Driver' not in e and 'GPU stall' not in e]
    check('No JS errors (night, engine '+ENGINE+')', not errs, errs[:4])

# ── Lab: the Sprite Library tab ──
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"]); pg=b.new_page(viewport={'width':1500,'height':1000}); errs=[]
    pg.on('pageerror',lambda e: errs.append(str(e)[:300]))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    pg.goto('file://'+os.path.abspath(os.path.join(R,'lab','index.html'))); pg.wait_for_timeout(2500)
    pg.click('.lab-tab:has-text("Sprite Library")'); pg.wait_for_timeout(900)
    r=pg.evaluate("({chips:document.querySelectorAll('.sl-grp').length, tabs:document.querySelectorAll('.sl-tab').length, refs:document.querySelectorAll('.sl-refs img').length, pilot:document.querySelectorAll('#lab-grid .sl-sh').length, girls:document.querySelectorAll('.sl-card[data-id^=hero_f]').length, locked:/look B/i.test(document.getElementById('lab-grid').textContent)&&/is locked/.test(document.getElementById('lab-grid').textContent), rcv:document.querySelectorAll('.sl-rcv .sl-strip').length, game:document.querySelectorAll('.sl-game').length, rows:[...document.querySelectorAll('.sl-tab')].map(function(t){ return t.rows.length; })})")
    check('Lab → Sprite Library opens on the Guide: totals, the two references, weapon / skill / action tables, 12 pilot requests', r['chips']==14 and r['tabs']==5 and r['refs']==2 and r['pilot']==12 and r['rows'][2]==9 and r['rows'][3]==13, r)
    check('The Guide shows the locked girl look and every received sheet with its frames at game size', r['locked'] and r['rcv']>=2 and r['game']>=2, r)
    pg.evaluate("document.querySelector('.sl-grp[data-sl=m1]').click()"); pg.wait_for_timeout(1200)
    r=pg.evaluate("""(()=>{ var cards=document.querySelectorAll('.sl-card'), o={n:cards.length, painted:0}; document.querySelectorAll('.sl-cv').forEach(function(cv){ var d=cv.getContext('2d').getImageData(0,0,72,72).data, n=0; for(var i=3;i<d.length;i+=4)if(d[i]>40)n++; if(n>60)o.painted++; });
      var li=document.querySelector('.sl-card .sl-sh'); li.querySelector('.sl-show').click(); o.pre=li.querySelector('.sl-pre').textContent; return o; })()""")
    check('Grasslands monsters: 60 cards, each with its stand-in; Show reveals the full request', r['n']==60 and r['painted']>=58 and 'Zeldara' in r['pre'] and 'teal' in r['pre'] and 'sprites/incoming/' in r['pre'] and 'Layout: exactly' in r['pre'], [r['n'],r['painted'],r['pre'][:120]])
    pg.evaluate("document.querySelector('.sl-card .br-pick').click()"); pg.wait_for_timeout(200)
    pg.evaluate("(function(){ var ta=document.querySelector('.sl-card .br-notes'); ta.value='needs a net attack'; ta.dispatchEvent(new Event('input',{bubbles:true})); })()"); pg.wait_for_timeout(200)
    r=pg.evaluate("({p:LabApp.picks['sprlib-'+document.querySelector('.sl-card').dataset.id], txt:document.querySelector('.sl-card .br-pick').textContent})")
    check('"Looks right" and notes are saved per character', r['p'] and r['p'].get('verdict')=='pick' and r['p'].get('notes')=='needs a net attack' and 'Looks right' in r['txt'], r)
    pg.evaluate("document.querySelector('.sl-grp[data-sl=hero]').click()"); pg.wait_for_timeout(2500)
    r=pg.evaluate("""(()=>{ var o={play:document.querySelectorAll('.sl-play').length, strips:document.querySelectorAll('.sl-strip').length, pages:Object.keys(LabSprLib._pg).map(function(k){ return LabSprLib._pg[k].ok; }), ink:0};
      var pl=document.querySelector('.sl-play'); o.clips=pl&&pl._clips?pl._clips.length:0; return o; })()""")
    check('Round 22: received sheets load from preview pages (files beside the Lab): each hero card has a player and a strip per received sheet', r['play']==2 and r['strips']>=2 and r['pages'] and all(r['pages']) and r['clips']>=1, r)
    for grp,n in (('hero',2),('boss',76),('rider',22)):
        pg.evaluate("g=>document.querySelector('.sl-grp[data-sl='+g+']').click()",grp); pg.wait_for_timeout(1500)
        c=pg.evaluate("document.querySelectorAll('.sl-card').length"); check('Group "'+grp+'" lists '+str(n)+' characters', c==n, c)
    check('No JS errors (Lab)', not errs, errs[:3]); b.close()
print('%d/%d passed'%(sum(res),len(res)))
sys.exit(0 if all(res) else 1)
