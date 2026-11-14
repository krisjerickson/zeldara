// ═══════════════════════════════════════════════════════════════════════
// ║ 79r-lab-inventory.js — round 105 (Kris: "in the inventory, we need to better catagorized the different types of weapons, armor and
// ║ accessories. Propose way to organize these for better viewing and selection"). Three layouts to ☆ one of, and extras to ✓ / ✕.
// ║ Today: one Weapons tab holds 52 melee weapons (31 swords and spears, 21 axes), 29 bows and crossbows and 10 staffs together;
// ║ Armor mixes 6 slots (71 pieces); Accessories 3 (34). Picks: 'invorg-lay_<a|b|c>' (one), 'invorg-x_<id>' (✓ pick / ✕ cut).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var it=function(ic,n,st,cl){ return '<div class="io-it'+(cl?' '+cl:'')+'"><span class="io-ic">'+ic+'</span><span class="io-nm">'+n+'</span><span class="io-st">'+st+'</span></div>'; };
  var chips=function(L,on){ return '<div class="io-chips">'+L.map(function(c,i){ return '<span class="io-chip'+(i===on?' on':'')+'">'+c+'</span>'; }).join('')+'</div>'; };
  var LAY=[
   ['a','Sub-tabs under each tab','Keep the 10 tabs. Weapons, Armor and Accessories each get a row of small chips just under them. Weapons: <b>All · Swords · Axes · Bows · Crossbows · Staffs</b>. Armor: <b>All · Helmets · Body · Legs · Boots · Gloves · Shields</b>. Accessories: <b>All · Amulets · Cloaks · Rings</b>. Each chip shows its count; the list below is sorted best first.',
    '<div class="io-mock">'+chips(['All 18','⚔ Swords 7','🪓 Axes 4','🏹 Bows 3','🎯 Crossbows 2','🔮 Staffs 2'],1)+it('⚔','Flame Blade','22 atk · 🔥','up')+it('⚔','Long Sword','10 atk','worn')+it('⚔','Iron Sword','5 atk','dn')+it('⚔','Wooden Sword','1 atk','dn')+'</div>'],
   ['b','One list in groups','Weapons, Armor and Accessories each show ONE scrolling list, split under headers for each kind (Swords, Axes, Bows…). What you wear sits at the top of its group with a ✓; the rest follow best first, with ▲ / ▼ against it. Each header folds away.',
    '<div class="io-mock"><div class="io-h">⚔ Swords <i>7</i></div>'+it('⚔','Long Sword','10 atk ✓ worn','worn')+it('⚔','Flame Blade','22 atk · 🔥 ▲12','up')+it('⚔','Iron Sword','5 atk ▼5','dn')+'<div class="io-h">🪓 Axes <i>4</i></div>'+it('🪓','Woodcutter\'s Axe','7 atk ▼3','dn')+'<div class="io-h fold">🏹 Bows <i>3</i> ▸</div></div>'],
   ['c','Slot first (the hero figure)','The hero figure on the left is the way in: click a slot (helmet, body, sword hand, bow hand, ring…) and the list shows only what fits there, best first, with ▲ / ▼ against what you wear and one click to put it on. The tabs stay for food, potions, treasure, spells and skills.',
    '<div class="io-mock io-c"><div class="io-doll"><span>🪖</span><span class="on">⚔</span><span>🛡</span><span>🧥</span><span>🏹</span><span>💍</span></div><div style="flex:1"><div class="io-h">Sword hand — 11 fit</div>'+it('⚔','Flame Blade','22 atk · 🔥 ▲12','up')+it('🪓','Woodcutter\'s Axe','7 atk ▼3','dn')+it('⚔','Iron Sword','5 atk ▼5','dn')+'</div></div>']];
  var EXT=[
   ['sort','A sort menu','Sort by: Power (default) · Tier · Element · Newest · Name.'],
   ['elem','Element chips','🔥 💧 🌿 🪨 ⚡ 🌑 to show only one element\'s gear (or what a boss is weak to).'],
   ['upg','"Upgrades only"','One switch: only what beats what you wear (▲).'],
   ['stack','Stack the same item','Three Iron Swords show once as "Iron Sword ×3".'],
   ['tier','Tier badges','A small I–V on each piece, so the forge tree is easy to read.'],
   ['junk','Mark to sell','A 🪙 mark on anything; the shops then offer "Sell all marked".'],
   ['newdot','A dot on new things','A small dot on what you picked up since you last looked; it goes once you have seen it.']];
  LAB_TABS.push({ id:'invorg', name:'Inventory layout',
    blurb:'<b>Round 105 — sorting the gear.</b> Three ways to organise weapons, armour and accessories (☆ one), and extras (✓ / ✕ each).',
    designs:LAY.map(function(x){ return {id:'lay_'+x[0],name:'Layout: '+x[1]}; }).concat(EXT.map(function(x){ return {id:'x_'+x[0],name:'Extra: '+x[1]}; })),
    render:function(){
      return LBR.sec('Today','one Weapons tab: 52 melee weapons, 29 bows and crossbows, 10 staffs — Armor: 71 pieces in 6 slots — Accessories: 34 in 3')+
        LBR.sec('Three layouts','☆ the one you want — or ✎ a note on it')+
        '<div class="tc-grid io-grid">'+LAY.map(function(x){ var k='invorg-lay_'+x[0], on=V(k)==='pick';
          return '<article class="tc'+(on?' on':'')+'"><b>'+esc(x[1])+'</b><p>'+x[2]+'</p>'+x[3]+'<div class="tc-a"><button class="vbtn io-pk" data-k="'+k+'" aria-pressed="'+on+'">'+(on?'★ Picked':'☆ Pick')+'</button> <input class="tl-n io-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note…"></div></article>'; }).join('')+'</div>'+
        LBR.sec('Extras','✓ do · ✕ skip each — they work with any layout')+
        '<table class="tl io-x"><tbody>'+EXT.map(function(x){ var k='invorg-x_'+x[0], v=V(k);
          return '<tr class="tl-'+(v||'x')+'"><td style="width:22%"><b>'+esc(x[1])+'</b></td><td>'+esc(x[2])+'</td><td><span class="pz-seg io-seg" data-k="'+k+'">'+[['pick','✓ Do'],['cut','✕ Skip']].map(function(o){ return '<button class="vbtn io-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span></td><td><input class="tl-n io-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note…"></td></tr>'; }).join('')+'</tbody></table>'; } });
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.io-pk'); if(b){ var k=b.dataset.k, was=V(k)==='pick';
      LAY.forEach(function(x){ var k2='invorg-lay_'+x[0]; if(k2!==k&&V(k2)==='pick'){ LabApp.picks[k2].verdict=null; LabApp.persist(k2); } }); var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=was?null:'pick'; LabApp.persist(k);
      document.querySelectorAll('.io-pk').forEach(function(x){ var on=V(x.dataset.k)==='pick'; x.setAttribute('aria-pressed',String(on)); x.textContent=on?'★ Picked':'☆ Pick'; x.closest('.tc').classList.toggle('on',on); }); return; }
    var sg=e.target.closest&&e.target.closest('.io-seg .io-sg'); if(sg){ var seg=sg.parentNode, k3=seg.dataset.k, nv=V(k3)===sg.dataset.v?null:sg.dataset.v, p3=LabApp.picks[k3]=LabApp.picks[k3]||{}; p3.verdict=nv; LabApp.persist(k3);
      [].forEach.call(seg.children,function(x){ x.className='vbtn io-sg'+(x.dataset.v===nv?' on '+nv:''); }); seg.closest('tr').className='tl-'+(nv||'x'); } });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.io-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.io-grid .tc p{font-size:12.5px}.io-mock{background:#0b121c;border:1px solid #243246;border-radius:8px;padding:8px;margin:8px 0;font:12px "Segoe UI",sans-serif}.io-chips{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px}.io-chip{border:1px solid #3a4a62;border-radius:10px;padding:1px 7px;color:#b8c8dc}.io-chip.on{background:#1d4a5a;border-color:#6fe3f5;color:#fff}'+
    '.io-it{display:flex;gap:6px;align-items:center;padding:3px 4px;border-radius:5px}.io-it.worn{background:rgba(111,227,245,.12)}.io-nm{flex:1;color:#e8eef8}.io-st{color:#9fb0c8}.io-it.up .io-st{color:#8fe8a0}.io-it.dn .io-st{color:#ff9a8a}.io-h{color:#ffd27a;font-weight:600;margin:6px 0 2px}.io-h i{font-style:normal;color:#8aa0b8;margin-left:4px}.io-h.fold{opacity:.7}'+
    '.io-c{display:flex;gap:8px}.io-doll{display:grid;grid-template-columns:repeat(2,26px);gap:4px;align-content:start}.io-doll span{width:26px;height:26px;border:1px solid #3a4a62;border-radius:6px;display:flex;align-items:center;justify-content:center}.io-doll span.on{border-color:#6fe3f5;background:#1d4a5a}.io-x td{font-size:12.5px}.io-sg{padding:4px 8px;font-size:12px;opacity:.75}.io-sg.on{opacity:1}.io-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.io-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('invorg');
  if(typeof LTODO!=='undefined')LTODO.add({id:'invorg',label:'🎒 Inventory: ☆ a layout for weapons, armour and accessories · ✓ / ✕ the extras',where:'Inventory layout tab',done:function(){ return LAY.some(function(x){ return V('invorg-lay_'+x[0])==='pick'; })&&EXT.every(function(x){ return !!V('invorg-x_'+x[0]); }); },go:function(){ LTODO.goTo('invorg','.io-grid',0); }});
})();
