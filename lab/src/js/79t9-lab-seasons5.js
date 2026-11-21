// ═══════════════════════════════════════════════════════════════════════
// ║ 79t9-lab-seasons5.js — round 127: THE FIVE SEASONS (Kris: "separate out our starting spring from our ending spring … the first spring
// ║ being much more muted … the fall is the first true harvest in a generation … the winter after that fall is already starting to be a
// ║ celebration, with more winter and juletide decorations … the spring that Freya brings is a flowery, lush celebration of spring. Look into
// ║ how scandinavian and nordic cultures would show and celebrate all of these, and come up with new image requests … a new place in the
// ║ lab to show all 5 of these seasons").
// ║ Each season: its story, the Nordic customs it draws on, the game today in that season (real screenshots, painted), what is painted and
// ║ what is ordered (07zt19, r127_seasons). Picks: 'seasons5-<s>' ✓ / ? / ✕ + note.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined')return;
  var I=function(n){ var p='preview/seasons5/'+n+'.jpg'; return typeof R127A==='function'?R127A(p):p; };
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var S=[
   {s:'sp',ic:'🌱',name:'The thaw — the first spring',when:'You set out; the Grasslands (and still as the Wetlands open)',col:'#b8c8a0',
    story:'The first spring after thirty-six winters — and it is only just a spring. The land comes out of the deep winter grey-green and wet; the village is waking, not celebrating.',
    nordic:['Snow lingers in the shadows long after it melts in the sun (the Norwegian snøfonn); the ground is mud and meltwater','Pussy-willow catkins and coltsfoot — the first signs of spring in the North, before any leaf','Boats are tarred and nets mended for the first fishing; bedding and furs aired after the winter','The first furrow is cut with the ard, and seed set out — quiet hopes, not yet a feast','The first birds back (starlings, lapwings) — birch twigs and feathers by a door'],
    today:'Until now this season used the lush spring paintings — too joyful. From this round the game shows it muted: the summer paintings with a grey-green, washed-out tint (much less colour) and only a few drifting catkin seeds in the air, until its own paintings come.',
    order:['The thaw: the 12 world sheets repainted (trees bare with buds and catkins, flattened straw-grass, old snow patches, mud)','The thaw: the 5 village building sheets repainted (slush on roofs, dripping eaves, airing bedding, a tar pot)','The land in the thaw: 8 flat pieces (old snow, meltwater, mud ruts, coltsfoot, snowdrops) and 6 set pieces (tarring a boat, airing bedding, the first furrow, seed sacks, pussy willow, a birdhouse)','The thaw\'s small touches at the doors (birch twigs and a feather, starlings, snowdrops) — re-told from the old Blossom Feast sheets'],
    sheets:'19 sheets + 2 re-told'},
   {s:'su',ic:'☀️',name:'Summer',when:'The Wetlands open',col:'#ffe27a',
    story:'As painted: the Silverrun runs clear, the nights are warm — Midsummer at its height.',
    nordic:['Midsummer (Midsommar / Jonsok): bonfires on the shore, birch-leaf garlands, flower crowns, the sun-wheel','Light nights — the sun barely sets in the North'],
    today:'Unchanged: the paintings as they are, fireflies on summer nights. The Midsummer Fires dressings (round 118) stay as they were.',order:['Nothing new — summer is the painted world'],sheets:'—'},
   {s:'au',ic:'🍂',name:'The first true harvest',when:'The Highlands open',col:'#ffb46a',
    story:'The first real harvest in a generation: the stores fill, the fields are heaped, and the village holds its first harvest feast in living memory.',
    nordic:['Haustblót and the Winter Nights (Vetrnætr) — the harvest sacrifice and feast at the turn to winter','Hay drying on long racks (the Norwegian hesje) and grain stooks in the stubble','The last sheaf kept back — later bound to a pole for the birds at Yule','Ale brewed for Yule; meat smoked and fish dried on racks; rowan berries hung as a charm for luck','Lingonberries, cloudberries and chanterelles gathered; turnips, cabbages, apples and barley stored'],
    today:'The autumn world and village paintings are in (gold leaves, harvested gardens). New: the land and the feast heaped with bounty.',
    order:['The harvest on the land: 12 pieces (hay racks, stooks, a sheaf pole, a harvest wagon, baskets of bounty, ale for Yule, a smoking rack, the threshing floor, a rowan garland, berries and mushrooms, the last sheaf)','The harvest dressings at every door and the Haustblót set on the Green, re-told as bounty'],
    sheets:'1 sheet + 2 re-told'},
   {s:'wi',ic:'❄️',name:'The first happy Yule',when:'The Ashlands open',col:'#d8ecff',
    story:'After the harvest, the winter is not a hardship any more: the stores are full, and the village keeps Yule with joy for the first time in a generation.',
    nordic:['Jól: the straw Yule goat (julbock / julebukk), straw stars and straw ornaments bound with red thread, the hanging himmeli','The sheaf for the birds (julenek) on a tall pole by the farm','Snow lanterns (snölykta) and ice lanterns; candles in every window','Spruce and juniper twigs laid at the door and on the path','The Yule log; oaths sworn on the Yule boar; fires on the longest night'],
    today:'The mild-winter paintings are in, with a few wreaths and holly (round 121). New: the land and the village keeping Yule.',
    order:['Yule on the land: 12 pieces (the bird-sheaf pole, snow and ice lanterns, spruce at the door, straw stars, a straw goat, a Yule torch, a sled of gifts, the Yule log, a solstice fire, a fir of lights, a himmeli)','The Yule dressings at every door and Jól on the Green, re-told as joy'],
    sheets:'1 sheet + 2 re-told'},
   {s:'bl',ic:'🌸',name:'Freya\'s spring — the celebration of life',when:'The spirits are home and Freya is free',col:'#ffd0e4',
    story:'The spring Freya brings: the land bursts into flower along the soul-lines, and the village celebrates life — the Blossom Feast moves here.',
    nordic:['Valborg (Walpurgis) fires welcoming the spring, with songs','Birch boughs in fresh leaf at every door (the old Nordic way of greeting spring); flower crowns','Wood anemones carpeting the woods; lily of the valley, cowslips; apple blossom (as in Hardanger)','Bees at the hive, swallows and their nests; a flower-wound pole','Freyja\'s own signs: falcon feathers, amber, flowers — and new life (the cradles)'],
    today:'From this round Freya\'s spring takes the lush spring paintings already painted (blossom, bright green) — they suited her spring far better than the first one. The village spring repaints of round 122 (not painted yet) are re-aimed at her: lusher, more flowers.',
    order:['The land in flower: 12 pieces (wood anemones, lily of the valley, cowslips, a flower meadow, fallen blossom, a birch in new leaf, hawthorn in bloom, a flower arch, a garlanded runestone, bees at the hive, a Valborg fire, a flower pole)','The village\'s 5 spring repaints, re-aimed at Freya\'s spring','Freya\'s dressings and the Blossom Feast on the Green (now with the flower pole, crown stand and flower cart)'],
    sheets:'1 sheet + 5 re-aimed + 2 re-told'}];
  LAB_TABS.push({ id:'seasons5', name:'The five seasons',
    blurb:'<b>Round 127 — the year, told as the story goes.</b> The first spring is now its own muted season (the thaw), and Freya\'s spring is the lush celebration; the harvest is the first in a generation and Yule is the first happy one. Each season shows the game in it today (real screenshots, painted), the Nordic customs it draws on, and the paintings ordered for it (<code>.\\tools\\sprites\\paint.ps1 -List r127_seasons</code>). ✓ / ? / ✕ each, with a note.',
    designs:S.map(function(x){ return {id:x.s,name:'Season: '+x.name}; }),
    render:function(){ var h='';
      h+='<div class="s5-strip">'+S.map(function(x){ return '<div class="s5-c" style="--c:'+x.col+'"><img src="'+I('season_'+x.s+'_village')+'" alt=""><b>'+x.ic+' '+esc(x.name)+'</b><small>'+esc(x.when)+'</small></div>'; }).join('')+'</div>';
      S.forEach(function(x){ var k='seasons5-'+x.s;
        h+=LBR.sec(x.ic+' '+esc(x.name),esc(x.when));
        h+='<div class="s5-row'+(V(k)?' v-'+V(k):'')+'" style="--c:'+x.col+'"><div class="s5-imgs"><figure><img src="'+I('season_'+x.s+'_village')+'" alt=""><figcaption>The village — today</figcaption></figure><figure><img src="'+I('season_'+x.s+'_grass')+'" alt=""><figcaption>The Grasslands — today</figcaption></figure></div>'+
          '<div class="s5-d"><p class="s5-story">'+esc(x.story)+'</p><div class="bp-lbl">How the North keeps it</div><ul>'+x.nordic.map(function(n){ return '<li>'+esc(n)+'</li>'; }).join('')+'</ul>'+
          '<div class="bp-lbl">In the game</div><p>'+esc(x.today)+'</p><div class="bp-lbl">Ordered · '+esc(x.sheets)+'</div><ul>'+x.order.map(function(n){ return '<li>'+esc(n)+'</li>'; }).join('')+'</ul>'+
          '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ Yes'],['maybe','? Maybe'],['cut','✕ No']].map(function(o){ return '<button class="vbtn wl-sg'+(V(k)===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'+
          '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note on this season…"></div></div>'; });
      h+='<textarea class="wl-n wl-all" data-k="seasons5-all" placeholder="Anything about the year as a whole…">'+esc(P('seasons5-all').notes||'')+'</textarea>';
      return h; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'seasons5',label:'🌸 The five seasons: the thaw, summer, the harvest, Yule and Freya\'s spring — ✓ / ? / ✕ each',where:'The five seasons tab',
    done:function(){ return S.every(function(x){ return !!V('seasons5-'+x.s); }); },go:function(){ LTODO.goTo('seasons5','.s5-row',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('seasons5')<0)LAB_ACTIVE.unshift('seasons5');
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.s5-row .wl-sg'); if(!b)return; var r=b.closest('.s5-row'), k=b.parentNode.dataset.k, v=(LabApp.picks[k]||{}).verdict; setTimeout(function(){ var p=LabApp.picks[k]||{}; r.className='s5-row'+(p.verdict?' v-'+p.verdict:''); },0); });
  var st=document.createElement('style'); st.textContent='.s5-strip{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:6px 0 14px}.s5-c{background:#0b121c;border:1px solid #243246;border-top:4px solid var(--c);border-radius:8px;overflow:hidden;font:12px "Segoe UI";color:#c8d4e4}.s5-c img{width:100%;display:block}.s5-c b{display:block;padding:4px 6px 0;color:#ffe9a8}.s5-c small{display:block;padding:0 6px 6px;color:#8a9ab0}'+
    '.s5-row{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:14px;background:#0b121c;border:1px solid #243246;border-left:5px solid var(--c);border-radius:10px;padding:10px;margin:0 0 14px}.s5-row.v-pick{border-color:#8fe8a0}.s5-row.v-maybe{border-color:#ffd76a}.s5-row.v-cut{border-color:#ff9a8a}'+
    '.s5-imgs{display:grid;grid-template-columns:1fr 1fr;gap:8px}.s5-imgs figure{margin:0}.s5-imgs img{width:100%;border-radius:6px;display:block}.s5-imgs figcaption{font:12px "Segoe UI";color:#8a9ab0}.s5-d{font:13px/1.45 "Segoe UI";color:#c8d4e4}.s5-d p{margin:0 0 6px}.s5-d ul{margin:0 0 6px;padding-left:18px}.s5-story{color:#ffe9a8!important;font-style:italic}'+
    '@media (max-width:900px){.s5-strip{grid-template-columns:repeat(2,1fr)}.s5-row{grid-template-columns:1fr}}';
  document.head.appendChild(st);
})();
