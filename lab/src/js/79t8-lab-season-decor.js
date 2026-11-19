// ═══════════════════════════════════════════════════════════════════════
// ║ 79t8-lab-season-decor.js — round 117: SEASONS — DECORATIONS AND FESTIVALS, for Kris to review.
// ║ Kris: "season updates is great. we can also look into additional season updates with things like decorating the buildings, proposed some
// ║ things around this, including things for the different season festivals".
// ║ Two ways to dress the buildings (overlays now, full repaints later), five festivals in Kris's order of the year, and the small things
// ║ that make a season felt. Each with what it takes and its cost (list prices: scenery sheet $0.048, story frame $0.078). Picks
// ║ 'seasdeco-<id>' ✓ / ◐ / ✕ with a note.
// ═══════════════════════════════════════════════════════════════════════
var LSDECO={
  HOW:[
    {id:'overlay',t:'A · Dressings laid over the buildings (recommended first)',d:'Every building keeps its summer painting; on top of it the game sets painted dressings at anchor points it already knows — the door, the roof ridge, the windows, the eaves. A spring garland over a door, a sun-wheel on a ridge, a harvest sheaf by the step, an evergreen bough and a lantern at Yule. One sheet of dressings per season covers all fourteen buildings, because the pieces are shared and placed by code.',cost:'4 sheets (one per season) + 1 for night lanterns and window candles = 5 sheets ≈ $0.24',build:'Anchors per building type in code (door, ridge, two windows, eaves); a small table of which piece goes where each season; dressings drawn above the building, lit at night.'},
    {id:'repaint',t:'B · Buildings repainted in their season (already in Holistic)',d:'The full repaint the Holistic level plans: each of the fourteen buildings painted again in autumn and in a mild winter (frost on the thatch, smoke from chimneys). The festival dressings from A then go on top.',cost:'14 × 2 = 28 sheets ≈ $1.34 (counted in the Holistic total already)',build:'Same as the seasonal sheets of wave S1: each building\'s own painting as its first reference.'}],
  FEST:[
    {id:'spring',season:'Mild spring · the Grasslands open',name:'The Blossom Feast (Sumarmál)',why:'The old Norse "summer\'s beginning" — the first feast the village has dared to hold in years, the morning after you set out.',
      deck:'Birch boughs and blossom garlands over every door; ribbons on the Runestone; a birch pole on the Green with streamers; flower crowns on the villagers; Tob\'s first furrow marked with a little rune-post.',
      play:'Pell\'s flower-crown contest (find six wildflowers in the Grasslands); hnefatafl against Runa on the Green (already in the woven saga); the first-furrow blessing with Tob.',
      art:'Spring dressings sheet (from A); a festival set-piece sheet for the Green (birch pole, garland arches, the tafl table, a flower cart); 6 story frames for the feast; flower-crown icons.',cost:'2 sheets + 6 frames ≈ $0.56'},
    {id:'midsummer',season:'Summer · the Wetlands open',name:'Midsummer Fires (Miðsumar)',why:'The longest day: bonfires on the hills, the night that never quite gets dark.',
      deck:'Straw sun-wheels on the roof ridges; lanterns strung across the street; flower garlands on Hesk\'s boats; a bonfire stack on the hill above the Green; the long trestle tables out for the taste-off.',
      play:'Benno and Morwen\'s taste-off (bring them each a Wetland ingredient, then judge); rolling a burning sun-wheel down the hill (a short race); the bonfire lit at dusk with the hero\'s first fire spell, if you have it.',
      art:'Summer dressings sheet; set-piece sheet (bonfire stack lit and unlit, trestle tables, the sun-wheel, garlanded boats); 6 story frames; festival food icons.',cost:'2 sheets + 6 frames ≈ $0.56'},
    {id:'harvest',season:'Autumn · the Highlands open',name:'The Harvest Fires and Winter Nights (Haustblót · Vetrnætr)',why:'The harvest is in — and on Winter Nights the dead are remembered. With spirits coming home, it is the most moving feast of the year.',
      deck:'Sheaves tied by every door; baskets of apples and gourds on the steps; the last sheaf made into a straw figure on the Green; ale barrels outside the tavern; on Winter Nights a candle in every window and on the Runestone for the spirits.',
      play:'Garrick and Dunn\'s forge-off; Rolf\'s flyting (insult-verse) contest, where you choose the lines; Winter Nights: lay a candle on the Runestone for each spirit you have freed — they gather round it.',
      art:'Autumn dressings sheet; set-piece sheet (the straw figure, barrels and baskets, the flyting stage, Runestone candles); 6 story frames.',cost:'2 sheets + 6 frames ≈ $0.56'},
    {id:'yule',season:'A mild winter · the Ashlands open',name:'Yule (Jól)',why:'Midwinter, kept warm: not deep snow — frost, evergreen and firelight.',
      deck:'Evergreen boughs and red-berry wreaths on the doors; rune-lit lanterns along the street; a great Yule log at the tavern hearth; straw Yule goats by the doors (and one huge one on the Green); a light frost on roofs and windows only.',
      play:'The Yule goat goes missing every night (a little search through the village, a different hiding place each time); the oath-taking at the tavern — the villagers swear the year\'s oaths over the Yule boar (each a small promise you can help keep); gifts left at the Home for your twin.',
      art:'Winter dressings sheet; set-piece sheet (the giant straw goat, the Yule log, lantern strings, the oath table); 6 story frames.',cost:'2 sheets + 6 frames ≈ $0.56'},
    {id:'freya',season:'Freya\'s spring · after the end',name:'Freya\'s Spring (the first-cry feast)',why:'The celebration already in the game, dressed as the year\'s crowning feast: the real spring, the first newborn.',
      deck:'Every dressing of the year at once, in blossom; the soul-lines\' light threaded through the garlands; cradles carved and set out on the Green; Freya\'s falcon banners.',
      play:'The celebration as it is, with the village dressed for it; afterwards the village stays dressed in spring for good.',
      art:'One set-piece sheet (carved cradles, falcon banners, light-threaded garlands); the celebration frames already exist.',cost:'1 sheet ≈ $0.05'}],
  SMALL:[
    {id:'clothes',t:'Festival clothes',d:'The outdoor villagers in their festival best for each feast (a flower crown, a sheaf pin, a red Yule cloak) — a second costume sheet for the eleven outdoor villagers.',cost:'11 × 2 sheets per festival ≈ $0.84 a festival — or one shared "festive" set for all four ≈ $0.84'},
    {id:'music',t:'Festival music',d:'One short Suno piece per feast (≤125 BPM, medieval midcore): a spring dance, the midsummer fire, the harvest drinking song, a Yule hymn. Played on the Green while the festival lasts.',cost:'4 Suno pieces (your credits)'},
    {id:'food',t:'Festival food',d:'Each feast\'s food in Benno\'s and the tavern\'s shops for the season, with a small seasonal buff (spring cake: +stamina; midsummer mead: fire resist; harvest bread: +max health for a day; Yule pork: cold resist).',cost:'1 icon sheet ≈ $0.05'},
    {id:'nights',t:'Festival nights',d:'Lanterns, candles and bonfires light the village at night during a festival (light drawn in code, the lantern dressings from A).',cost:'code only'},
    {id:'when',t:'When a festival is on',d:'A festival starts the first time you come home after a season turns and lasts three in-game days; Elder Runa announces it, a banner shows it, and it waits if you are in a fight. The dressings go up the moment the season turns and come down at the next.',cost:'code only'}]
};
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var OPT=[['pick','✓ Yes'],['mix','◐ Some of it'],['cut','✕ No']];
  var pk=function(k){ var v=V(k); return '<div class="sd-pk"><span class="sd-seg" data-k="'+k+'">'+OPT.map(function(o){ return '<button class="vbtn sd-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span><input class="tl-n sd-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note…"></div>'; };
  var all=[].concat(LSDECO.HOW.map(function(x){ return 'how_'+x.id; }),LSDECO.FEST.map(function(x){ return 'fest_'+x.id; }),LSDECO.SMALL.map(function(x){ return 'small_'+x.id; }));
  LAB_TABS.push({ id:'seasdeco', name:'Seasons: decorations & festivals',
    blurb:'<b>Round 117 — dressing the village for the year.</b> Two ways to decorate the buildings — <b>A</b>, dressings laid over the painted buildings (cheap, every building at once), and <b>B</b>, the full seasonal repaints already in Holistic — then <b>five festivals</b> in your order of the year, each with how the village is decorated, what you do there and what it costs, and the small things that make a feast felt (clothes, music, food, lights). ✓, ◐ or ✕ each, with a note.',
    designs:all.map(function(id){ return {id:id,name:id}; }),
    render:function(){ var h=LBR.sec('Decorating the buildings','A and B work together: A for the festivals, B for the season itself');
      h+=LSDECO.HOW.map(function(x){ return '<div class="sd-card"><h4>'+esc(x.t)+'</h4><p>'+esc(x.d)+'</p><p class="sd-m"><b>Cost:</b> '+esc(x.cost)+'<br><b>How it is built:</b> '+esc(x.build)+'</p>'+pk('seasdeco-how_'+x.id)+'</div>'; }).join('');
      h+=LBR.sec('The festivals','one a season, in your order of the year · each lasts three days after the season turns');
      h+='<table class="tl sd-t"><thead><tr><th>Festival</th><th>The village, decorated</th><th>What you do</th><th>Paintings · cost</th><th>Your pick</th></tr></thead><tbody>'+LSDECO.FEST.map(function(x){
        return '<tr><td><b>'+esc(x.name)+'</b><br><small>'+esc(x.season)+'</small><p>'+esc(x.why)+'</p></td><td>'+esc(x.deck)+'</td><td>'+esc(x.play)+'</td><td>'+esc(x.art)+'<br><b>'+esc(x.cost)+'</b></td><td>'+pk('seasdeco-fest_'+x.id)+'</td></tr>'; }).join('')+'</tbody></table>';
      h+=LBR.sec('The small things','what makes a feast felt');
      h+='<table class="tl sd-t"><tbody>'+LSDECO.SMALL.map(function(x){ return '<tr><td><b>'+esc(x.t)+'</b></td><td>'+esc(x.d)+'</td><td><small>'+esc(x.cost)+'</small></td><td>'+pk('seasdeco-small_'+x.id)+'</td></tr>'; }).join('')+'</tbody></table>';
      h+='<p class="sd-m"><b>Everything above:</b> about 15 sheets and 24 story frames ≈ $2.60 in pictures (A + five festivals + food), plus festival clothes if you want them (≈ $0.84 for one shared set) and four Suno pieces. Building repaints (B) are already in the Holistic total.</p>';
      return h; } });
  document.addEventListener('click',function(e){ var sg=e.target.closest&&e.target.closest('.sd-seg .sd-sg'); if(!sg)return; var s=sg.parentNode, k=s.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn sd-sg'+(x.dataset.v===nv?' on '+nv:''); }); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.sd-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.sd-card{border:1px solid #243246;border-radius:10px;background:#0b121c;padding:10px 14px;margin:8px 0}.sd-card h4{margin:0 0 4px;color:#ffe9a8;font:600 15px Georgia,serif}.sd-card p{font-size:13px;color:#d8e2ee;margin:4px 0;line-height:1.5}.sd-m{font-size:12.5px!important;color:#9fb0c8!important}'+
    '.sd-t td{font-size:12.5px;vertical-align:top;line-height:1.45}.sd-t td p{margin:4px 0;color:#ffe6a8;font-size:12px}.sd-t td:first-child{width:200px}.sd-t td:last-child{width:190px}.sd-pk{display:flex;flex-direction:column;gap:4px}.sd-sg{padding:2px 8px;font-size:11.5px;opacity:.75}.sd-sg.on{opacity:1}.sd-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.sd-sg.on.mix{background:#5a4510;border-color:#ffd84a;color:#fff}.sd-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}.sd-n{width:100%;box-sizing:border-box;font-size:11.5px}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('seasdeco');
  if(typeof LTODO!=='undefined')LTODO.add({id:'seasdeco',label:'🎉 Seasons — decorations & festivals: ✓, ◐ or ✕ each idea',where:'Seasons: decorations & festivals tab',
    done:function(){ return all.every(function(id){ return !!V('seasdeco-'+id); }); },go:function(){ LTODO.goTo('seasdeco','.sd-card',0); }});
})();
