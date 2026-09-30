"""Sandbox Site Lab: lists every implemented tower/dungeon (4 quadrants + islands),
renders thumbnails, launches any floor with inspect options, inspect bar works."""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
SHOTS=os.environ.get('SHOTS')
def wait_for(g,expr,tries=40,ms=250):
    for _ in range(tries):
        if g.js(expr): return True
        g.wait(ms)
    return False
def dstate(g):
    return g.js("(()=>{var d=game.scene.getScene('Dungeon');if(!d||!game.scene.isActive('Dungeon'))return null;return {sid:d.siteId,f:d.floor,mons:d.monsters.length,boss:d.monsters.some(m=>m.isBoss),fogVis:d._dngFogGfx.visible,bar:document.getElementById('sl-bar').textContent,lab:!!d._lab,zoom:d.cameras.main.zoom};})()")

with game() as g:
    g.js("toggleModal('sandbox')"); g.page.fill('#sb-pw','agricola'); g.js("checkSandboxPw()")
    g.page.click('.sb-lab-btn'); g.wait(300)
    check('Site Lab opens from the sandbox and pauses the game', g.js("document.getElementById('modal-sitelab').style.display==='flex'&&isGamePaused()"))
    tabs=g.js("[...document.querySelectorAll('.sl-tab')].map(t=>t.textContent)")
    check('Tabs: 4 quadrants + harbor islands + castles + trials + mage towers', len(tabs)==8 and tabs[-1].startswith('Mage towers16'), tabs)
    counts=[]
    for i in range(5):
        g.js(f"document.querySelectorAll('.sl-tab')[{i}].click()"); g.wait(100)
        counts.append(g.js("document.querySelectorAll('.sl-card').length"))
    check('24 sites listed (5 per quadrant + 4 island dungeons)', counts==[5,5,5,5,4], counts)
    g.js("document.querySelectorAll('.sl-tab')[0].click()")
    ok=wait_for(g,"[...document.querySelectorAll('.sl-thumb')].every(t=>t.style.backgroundImage.indexOf('data:image')>=0)",tries=80)
    check('Floor thumbnails render for every card', ok)
    check('Floor chips = floors per site (Q1: 5,5,4,5,4)', g.js("[...document.querySelectorAll('.sl-card')].map(c=>c.querySelectorAll('.sl-fl').length).join()")=='5,5,4,5,4')
    if SHOTS: g.shot(SHOTS+'/site_lab.png')
    g.js("document.querySelector('.sl-seg[data-k=mons][data-v=none]').click()")
    g.js("document.querySelector('.sl-fl[data-s=s1_tower][data-f=\"2\"]').click()")
    ok=wait_for(g,"(()=>{var d=game.scene.getScene('Dungeon');return !!(d&&d._ready&&game.scene.isActive('Dungeon')&&d.floor===2);})()")
    st=dstate(g)
    check('Chip launches Silverwood Palace floor 3 with inspect options', ok and st and st['sid']=='s1_tower' and st['mons']==0 and not st['fogVis'] and 'Floor 3/5' in st['bar'], st)
    if SHOTS: g.wait(800); g.shot(SHOTS+'/site_lab_bar.png')
    g.page.keyboard.press(']'); wait_for(g,"(()=>{var d=game.scene.getScene('Dungeon');return d&&d._ready&&game.scene.isActive('Dungeon')&&d.floor===3;})()")
    check('] steps up a floor', (dstate(g) or {}).get('f')==3, dstate(g))
    g.js("document.querySelector('#sl-bar button[data-a=prev]').click()"); wait_for(g,"(()=>{var d=game.scene.getScene('Dungeon');return d&&d._ready&&game.scene.isActive('Dungeon')&&d.floor===2;})()")
    check('◀ steps back down', (dstate(g) or {}).get('f')==2)
    g.js("document.querySelector('#sl-bar button[data-a=over]').click()"); g.wait(200)
    check('Overview zooms out to the whole floor', (dstate(g) or {}).get('zoom',9)<1)
    g.js("document.querySelector('#sl-bar button[data-a=mons]').click()"); wait_for(g,"(()=>{var d=game.scene.getScene('Dungeon');return d&&d._ready&&game.scene.isActive('Dungeon')&&d._inspect.mons==='all';})()")
    g.wait(300)
    check('Monsters button cycles to all monsters (floor rebuilt)', (dstate(g) or {}).get('mons',0)>0, dstate(g))
    check('Inspecting never writes fog into the save', g.ws("!Object.keys(ps.dungeonFog||{}).some(k=>k.indexOf('s1_tower_')===0)"))
    g.js("document.querySelector('#sl-bar button[data-a=exit]').click()")
    check('Exit returns to the overworld, bar hidden', wait_for(g,"game.scene.isActive('World')") and g.js("document.getElementById('sl-bar').style.display==='none'"))
    # Island dungeons + cave
    g.js("openSiteLab()"); g.js("document.querySelector('.sl-tab[data-g=isl]').click()"); g.wait(200)
    g.js("document.querySelector('.sl-fl[data-s=isl_adv_4_tower_island][data-f=\"4\"]').click()")
    ok=wait_for(g,"(()=>{var d=game.scene.getScene('Dungeon');return !!(d&&d._ready&&game.scene.isActive('Dungeon')&&d.siteId==='isl_adv_4_tower_island');})()")
    check('Island: Frost Spire top floor opens with the Frost Lord', ok and g.js("game.scene.getScene('Dungeon').monsters.some(m=>m.isBoss&&/Frost Lord/.test(m.def.name))"))
    g.js("document.querySelector('#sl-bar button[data-a=lab]').click()"); g.wait(200)
    check('🧪 Lab button reopens the Site Lab', g.js("document.getElementById('modal-sitelab').style.display==='flex'"))
    g.js("document.querySelector('.sl-tab[data-g=isl]').click()"); g.wait(100)
    g.js("document.querySelector('.sl-fl[data-s=isl_adv_3_dungeon][data-f=\"1\"]').click()")
    check('Island: Ember Cave (now an island dungeon) floor 2 opens', wait_for(g,"(()=>{var d=game.scene.getScene('Dungeon');return !!(d&&d._ready&&game.scene.isActive('Dungeon')&&d.siteId==='isl_adv_3_dungeon'&&d.floor===1&&d.maxFloors===4);})()"))
    errs=[e for e in g.errs if 'GL Driver' not in e]
    check('No JS errors', not errs, errs[:4])
print('%d/%d'%(sum(res),len(res)))
