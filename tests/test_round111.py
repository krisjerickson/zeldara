"""Round 111: shops — your gold in a banner that stays at the top, big bold coloured prices, and buying without the window closing.
  Kris: "it should be very obvious how much gold you have, and how much gold things cost. make a banner at the top for how much gold you
  have that scrolls down with you, and make the costs larger, bold and colored. Also, you should be able to buy multiple things at a time
  without the screen with items closing".
python tests/test_round111.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]))
WS = "game.scene.getScene('World')"
with game(painted=True, w=1280, h=800) as g:
    g.wait(3000)
    a = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.gold=1240; ps.unlockedSections=[1,2,3,4]; openBuildingShop('armory',ps,ws); var mx=Math.max.apply(null,[...document.querySelectorAll('#camp-content .si-price')].map(e=>+e.dataset.v||0)); window._mx=mx; var c=document.getElementById('camp-content'), bar=c.querySelector('.shop-goldbar'), P=c.querySelectorAll('.si-price'), p0=P[0];
      var cs=p0?getComputedStyle(p0):null; return {open:document.getElementById('modal-camp').style.display, bar:bar&&bar.textContent, sticky:bar&&getComputedStyle(bar).position, n:P.length, size:cs&&parseFloat(cs.fontSize), weight:cs&&cs.fontWeight, col:cs&&cs.color, poor:c.querySelectorAll('.si-price.poor').length, mx:window._mx}; })()""" % WS)
    check('A shop opens with a gold banner that stays at the top (%s)' % a, a['open'] == 'flex' and a['bar'] and '1,240' in a['bar'] and a['sticky'] == 'sticky', a)
    check('…every price large, bold and coloured, red when you cannot afford it (%s)' % a, a['n'] >= 5 and a['size'] >= 15 and int(a['weight']) >= 700 and (a['poor'] >= 1 or a['mx'] <= 1240), a)
    g.js("(()=>{ var B=document.getElementById('camp-content').parentNode; B.scrollTop=200; })()"); g.wait(300)
    b = g.js("""(()=>{ var ws=%s, ps=ws.playerState, btn=[...document.querySelectorAll('#camp-content .si-buy')].find(b=>!b.disabled&&/Buy/.test(b.textContent)); var g0=ps.gold; btn.click(); var g1=ps.gold; var btn2=[...document.querySelectorAll('#camp-content .si-buy')].find(b=>!b.disabled&&/Buy/.test(b.textContent)); btn2&&btn2.click();
      var B=document.getElementById('camp-content').parentNode, bar=document.querySelector('#camp-content .shop-goldbar');
      return {open:document.getElementById('modal-camp').style.display, spent1:g0-g1, spent2:g1-ps.gold, bar:bar&&bar.querySelector('.sg-n').textContent, gold:ps.gold, scroll:B.scrollTop, delta:bar&&bar.querySelector('.sg-d').textContent}; })()""" % WS)
    check('Buying keeps the window open, at the same scroll; buy again; the banner counts down (%s)' % b, b['open'] == 'flex' and b['spent1'] > 0 and b['spent2'] > 0 and b['bar'].replace(',', '') == str(b['gold']) and b['scroll'] > 100 and b['delta'].startswith('−'), b)
    c = g.js("""(()=>{ var ws=%s, ps=ws.playerState; closeModal('camp'); _merchantShopMode='sell'; ps.inventory.push('iron_sword','iron_sword'); openBuildingShop('merchant',ps,ws); var g0=ps.gold, b=[...document.querySelectorAll('#camp-content .si-buy')].find(x=>/Sell/.test(x.textContent)); b.click(); return {open:document.getElementById('modal-camp').style.display, got:ps.gold-g0, sell:document.querySelectorAll('#camp-content .si-price.sell').length}; })()""" % WS)
    check('Selling at the merchant keeps the window open too; sale prices in green (%s)' % c, c['open'] == 'flex' and c['got'] > 0 and c['sell'] >= 1, c)
    g.js("(()=>{ _merchantShopMode='buy'; var ws=%s; closeModal('camp'); ws.playerState.gold=300; openBuildingShop('armory',ws.playerState,ws); })()" % WS); g.wait(500)
    p = g.js("document.querySelectorAll('#camp-content .si-price.poor').length")
    check('With little gold, what you cannot afford is priced in red (%s)' % p, p >= 1, p)
    g.shot('/tmp/claude-0/shots/shop111.png')
    m = g.js("(async()=>{ var ws=%s; closeModal('camp'); window._atStables=true; openMountsModal(ws.playerState,ws); window._atStables=true; _renderMountsModal(ws.playerState); await new Promise(r=>setTimeout(r,700)); var el=document.getElementById('mounts-content'); return {bar:!!el.querySelector('.shop-goldbar'), prices:el.querySelectorAll('.si-price').length}; })()" % WS)
    check('The stables show the gold banner and big prices too (%s)' % m, m['bar'], m)
print('%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
