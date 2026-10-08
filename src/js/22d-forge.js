// ═══════════════════════════════════════════════════════════════════════
// ║ 22d-forge.js — the forge tree, the jeweller's gems and gem setting, element chips (round 37).
// ║   ZElUI            small pieces every screen uses: element chips, "weak to / resists" lines, resistance chips
// ║   ZForge           the forging tree: lanes of weapons, each node knows its recipe and what you own.
// ║                    The blacksmith shows it to forge from; the Tome shows the same tree to read (26b).
// ║   Jeweller         one of each common gem at a time, for gold AND dungeon coins (ZLoot, 09h); gem setting
// ║                    for armor, shields, amulets and rings (up to two elements on a piece).
// ║ Kris (Oct 7): "create both a forging tree and tech tree"; "gems … difficult to get at the jeweler".
// ═══════════════════════════════════════════════════════════════════════
var ZElUI={
  chip:function(el,txt){ var E=ZEL.E[el]; if(!E)return ''; return '<span class="zel" style="--zc:'+E.col+'">'+ZIcon.html(E.ic,E.em,1.15)+'<b>'+(txt||E.n)+'</b></span>'; },
  chips:function(els){ if(els==='all')return '<span class="zel zel-all" style="--zc:#f4ecd0">✦<b>All elements</b></span>'; return ZEL.els(els).map(function(e){ return ZElUI.chip(e); }).join(''); },
  none:'<span class="zel zel-none" style="--zc:#9aa4b4"><b>No element</b></span>',
  // the Tome's two lines for anything that has elements: what hurts it more, what it shrugs off
  versus:function(els,boss){ var T=ZEL.table(els,boss), w2=[],w1=[],r1=[],r2=[]; ZEL.LIST.forEach(function(a){ var t=T[a]; (t>=2?w2:t===1?w1:t===-1?r1:t<=-2?r2:[]).push(a); });
    var f=function(L){ return L.map(function(e){ return ZElUI.chip(e); }).join(''); }, out=[];
    if(w2.length)out.push(['▲▲ Bane',f(w2)+' <small>— struck twice over</small>']); if(w1.length)out.push(['▲ Weak to',f(w1)]);
    if(r1.length)out.push(['▽ Resists',f(r1)]); if(r2.length)out.push(['▽▽ Warded',f(r2)+' <small>— barely scratched</small>']); return out; },
  pct:function(v){ return Math.round(v*100)+'%'; },
  // the small coloured dots on an inventory tile: the elements a piece carries
  pips:function(it){ if(!it)return ''; var L=it.el==='all'?['all']:ZEL.carried(it); if(L.length>2)L=['all']; if(!L.length)return ''; return '<span class="zel-pips">'+L.map(function(e){ return '<i style="background:'+(e==='all'?'conic-gradient(#ff7a3a,#ffe060,#7ad85a,#5ab8ff,#b080ff,#ff7a3a)':ZEL.E[e].col)+'"></i>'; }).join('')+'</span>'; },
  // the hero's resistances as chips (inventory)
  resLine:function(ps){ var S=ZHit.sums(ps), L=ZEL.LIST.filter(function(e){ return S.res[e]>0; }); return L.length?L.map(function(e){ return ZElUI.chip(e,'−'+ZElUI.pct(S.res[e])); }).join(''):''; },
  // extra chips for an item (inventory, shops, forge): [text, class]
  itemChips:function(it){ var L=[], k; if(!it)return L; if(it.cls==='axe')L.push(['axe · slow, heavy, staggers','s']); if(it.cls==='xbow')L.push(['crossbow · pierces one foe','s']);
    if(it.el&&!it.elementDmg)L.push([(it.el==='all'?'all elements':ZEL.name(it.el).toLowerCase()),'e']);
    if(it.spellPow)L.push(['+'+ZElUI.pct(it.spellPow)+' spell power','e']); if(it.elPow)for(k in it.elPow)L.push(['+'+ZElUI.pct(it.elPow[k])+' '+k+' damage','e']);
    if(it.res){ var ks=Object.keys(it.res); if(ks.length===6&&ks.every(function(x){ return it.res[x]===it.res[ks[0]]; }))L.push(['−'+ZElUI.pct(it.res[ks[0]])+' damage from every element','d']); else ks.forEach(function(x){ L.push(['−'+ZElUI.pct(it.res[x])+' '+x+' damage','d']); }); }
    if(it.gemEl)L.push([(it.rare?'rare ':'')+it.gemEl+' gem','e']); if(it.buff||it.ward)L.push(['2 minutes','s']); return L; }
};
// the inventory's chips learn the new numbers
if(typeof ZINV!=='undefined'&&ZINV.stats){ (function(){ var _s=ZINV.stats; ZINV.stats=function(it){ var L=_s(it); return L.concat(ZElUI.itemChips(it)); }; })(); }

var ZForge={ sel:null,
  LANES:[
    {k:'fire',   n:'Fire swords',  el:['fire'],  gem:'gem_ruby',    nodes:['iron_sword','flame_iron','inferno_edge','magma_cleaver','volcano_lord']},
    {k:'ice',    n:'Frost swords', el:['water'], gem:'gem_sapphire',nodes:['iron_sword','frost_iron','glacier_sword','permafrost','absolute_zero']},
    {k:'thunder',n:'Storm swords', el:['storm'], gem:'gem_topaz',   nodes:['iron_sword','thunder_iron','storm_blade','cyclone_blade','thunder_god']},
    {k:'earth',  n:'Earth axes',   el:['earth'], gem:'gem_amber',   nodes:['hand_axe','granite_axe','quake_axe','boulder_maul','mountains_heart']},
    {k:'grass',  n:'Grass axes',   el:['grass'], gem:'gem_emerald', nodes:['hand_axe','briar_axe','thornwood_axe','wildwood_cleaver','verdant_king']}],
  XBOW:{base:'crossbow',t1:['ember_crossbow','frost_crossbow','thorn_crossbow','stone_crossbow','storm_crossbow','night_crossbow'],t2:['geyser_arbalest','wildstone_arbalest','eclipse_arbalest']},
  DUAL:['stormfire_blade','tempest_edge','magmaheart_axe','avalanche_maul','nightbloom_axe'],
  TOP:'elemental_sovereign',
  recipe:function(id){ for(var i=0;i<CRAFT_RECIPES.length;i++)if(CRAFT_RECIPES[i].result===id)return CRAFT_RECIPES[i]; return null; },
  ps:function(){ var ws=game&&game.scene&&game.scene.getScene('World'); return ws&&ws.playerState; },
  owns:function(ps,id){ if(!ps)return false; if((ps.inventory||[]).indexOf(id)>=0)return true; var eq=ps.equip||{}; for(var k in eq)if(eq[k]===id)return true; return false; },
  can:function(ps,id){ var r=ZForge.recipe(id); if(!r||!ps)return false; if(ps.gold<r.gold)return false; var c={}; (ps.inventory||[]).forEach(function(x){ c[x]=(c[x]||0)+1; }); return Object.keys(r.needs).every(function(k){ return (c[k]||0)>=r.needs[k]; }); },
  made:function(ps,id){ return !!(ps&&ps.forged&&ps.forged[id]); },
  // one tile of the tree
  node:function(ps,id){ var it=ITEMS[id]; if(!it)return ''; var own=ZForge.owns(ps,id), can=!own&&ZForge.can(ps,id), r=ZForge.recipe(id), made=ZForge.made(ps,id);
    return '<button class="zf-node'+(own?' own':can?' can':made?' made':'')+(ZForge.sel===id?' sel':'')+'" data-fnode="'+id+'" title="'+it.name+'">'+ZIcon.item(id,2.2)+'<b>'+it.name+'</b><i>'+(it.atk?'+'+it.atk:'')+(it.elementDmg?' <u>+'+it.elementDmg+'</u>':'')+'</i>'+
      (own?'<s>✓ yours</s>':can?'<s>⚒ ready</s>':made?'<s>forged before</s>':r?'':'<s>'+(it.buy?it.buy+' g':'reward')+'</s>')+'</button>'; },
  arrow:'<span class="zf-arr">➜</span>',
  html:function(ps){ var h='<div class="zf">';
    h+='<div class="zf-key"><span class="zf-node own k">yours</span><span class="zf-node can k">ready to forge</span><span class="zf-node made k">forged before</span><span class="zf-node k">not yet</span> · each step uses the weapon before it, a gem and gold · the last step also needs the element\'s rare gem</div>';
    ZForge.LANES.forEach(function(L){ h+='<div class="zf-lane"><div class="zf-lh">'+ZElUI.chips(L.el)+'<span>'+L.n+'</span><em>'+ZIcon.item(L.gem,1.3)+' '+ITEMS[L.gem].name+'</em></div><div class="zf-row">'+L.nodes.map(function(id){ return ZForge.node(ps,id); }).join(ZForge.arrow)+'</div></div>'; });
    var X=ZForge.XBOW; h+='<div class="zf-lane"><div class="zf-lh"><span>Crossbows</span><em>two gems of one kind each · then two crossbows and a rare gem make an arbalest</em></div><div class="zf-row">'+ZForge.node(ps,X.base)+ZForge.arrow+'<div class="zf-fan">'+X.t1.map(function(id){ return ZForge.node(ps,id); }).join('')+'</div>'+ZForge.arrow+'<div class="zf-fan one">'+X.t2.map(function(id){ return ZForge.node(ps,id); }).join('')+'</div></div></div>';
    h+='<div class="zf-lane"><div class="zf-lh"><span>Master-works — two elements</span><em>a third-step weapon, a second-step weapon of another element and a rare gem</em></div><div class="zf-row wrap">'+ZForge.DUAL.map(function(id){ return ZForge.node(ps,id); }).join('')+'</div></div>';
    h+='<div class="zf-lane"><div class="zf-lh">'+ZElUI.chips('all')+'<span>The Sovereign</span><em>the three greatest swords and a Skystone</em></div><div class="zf-row">'+['volcano_lord','absolute_zero','thunder_god'].map(function(id){ return ZForge.node(ps,id); }).join('<span class="zf-arr">+</span>')+ZForge.arrow+ZForge.node(ps,ZForge.TOP)+'</div></div>';
    return h+'</div>'; },
  // the panel under the tree: what the chosen weapon is and what it takes
  detail:function(ps,id,canForge){ var it=ITEMS[id]; if(!it)return '<div class="zf-d zf-hint">Pick a weapon in the tree to see what it takes.</div>'; var r=ZForge.recipe(id), c={}; (ps&&ps.inventory||[]).forEach(function(x){ c[x]=(c[x]||0)+1; });
    var st=[]; if(it.atk)st.push('+'+it.atk+(it.slot==='rHand'?' ranged':'')+' attack'); if(it.elementDmg)st.push('+'+it.elementDmg+' '+(it.el==='all'?'all elements':ZEL.name(it.el).toLowerCase()));
    var fx=it.el&&it.el!=='all'?it.el.map(function(e){ return ZEL.E[e].n+' '+ZEL.E[e].stN; }).join(' · '):it.el==='all'?'Strikes with whichever element is best against the foe':'';
    var h='<div class="zf-d"><div class="zf-d-ic">'+ZIcon.item(id,3.4)+'</div><div class="zf-d-tx"><div class="zf-d-n">'+it.name+' '+(it.el?ZElUI.chips(it.el):ZElUI.none)+'</div><div class="zf-d-s">'+st.join(' · ')+(it.cls==='axe'?' · axe: slow, heavy swings that stagger':it.cls==='xbow'?' · crossbow: slower, the dart passes through one foe':'')+'</div>'+(fx?'<div class="zf-d-s">'+fx+'</div>':'');
    if(r){ var ok=!!ps; h+='<div class="fr-mats">'+Object.keys(r.needs).map(function(k){ var have=c[k]||0, good=have>=r.needs[k]; if(!good)ok=false; return '<span class="forge-mat '+(good?'have':'need')+'" data-fnode="'+k+'">'+ZIcon.item(k,1.2)+' '+ITEMS[k].name+(r.needs[k]>1?' ×'+r.needs[k]:'')+' ('+have+'/'+r.needs[k]+')</span>'; }).join('');
      var gok=ps&&ps.gold>=r.gold; if(!gok)ok=false; h+='<span class="forge-mat '+(gok?'have':'need')+'">'+r.gold+' g</span></div></div>';
      if(canForge)h+='<div class="zf-d-b"><button class="forge-btn'+(ok?'':' disabled-btn')+'"'+(ok?'':' disabled')+' onclick="window._craftItem(\''+id+'\')">⚒️ Forge</button></div>'; }
    else h+='<div class="zf-d-s">'+(it.buy?'Sold at the armory for '+it.buy+' g'+(it.secReq>1?' (from the '+['','Grasslands','Wetlands','Highlands','Ashlands'][it.secReq]+')':''):'Not forged — a reward')+'</div></div>';
    return h+'</div>'; },
  render:function(){ var ps=ZForge.ps(), el=document.getElementById('camp-content'); if(!ps||!el)return;
    el.innerHTML='<p class="zf-intro">The forging tree. Every forged weapon carries an element — see <b>Elements</b> in the Tome for what beats what. Gems come from adventuring: guardians, vaults, strong monsters and chests.</p>'+ZForge.html(ps)+ZForge.detail(ps,ZForge.sel,true)+
      '<p style="font-size:10px;color:#665;margin-top:6px;text-align:center">You have <span style="color:#ffd700">'+ps.gold+' g</span></p>'; if(typeof ZIcon!=='undefined')ZIcon.hydrate(el); }
};
// the blacksmith opens the tree (this replaces the old list — same name, later file)
function openForgeModal(ps,worldScene){ var m=document.getElementById('modal-camp'), open=m&&m.style.display!=='none'&&document.getElementById('camp-title').textContent.indexOf('Blacksmith')>=0;
  document.getElementById('camp-title').textContent='⚒️ Blacksmith — the forging tree'; window._campKind='forge'; ZForge.render(); if(m)m.classList.add('zf-wide'); if(!open)toggleModal('camp'); }
(function(){ if(typeof document==='undefined')return;
  document.addEventListener('click',function(e){ var t=e.target.closest&&e.target.closest('#camp-content [data-fnode]'); if(!t||window._campKind!=='forge')return; ZForge.sel=t.getAttribute('data-fnode'); ZForge.render(); },true);
  // remember what has been forged (for the Tome's paths), and keep the tree open after forging
  var _c=window._craftItem; if(_c)window._craftItem=function(id){ var ps=ZForge.ps(), had=ps?(ps.inventory||[]).filter(function(x){ return x===id; }).length:0; _c(id);
    if(ps&&(ps.inventory||[]).filter(function(x){ return x===id; }).length>had){ ps.forged=ps.forged||{}; ps.forged[id]=1; if(typeof Tome!=='undefined'&&Tome.see)Tome.see('item',id); } var m=document.getElementById('modal-camp'); if(m&&m.style.display==='none')toggleModal('camp'); ZForge.sel=id; ZForge.render(); };
})();

// ── the jeweller: gems for coins, and gem setting ─────────────────────
var ZJewel={
  html:function(ps){ var st=ZLoot.shelf(ps), coins=ZLoot.count(ps,'dungeon_coin');
    var h='<div class="zj"><div class="zj-h">Gems for sale <small>one of each at a time · the shelf refills when you clear another dungeon, tower, castle or vault</small></div><div class="zj-coins">'+ZIcon.item('dungeon_coin',1.3)+' You carry <b>'+coins+'</b> Dungeon Coin'+(coins===1?'':'s')+' <small>— they come out of dungeons, towers, castles and vaults</small></div><div class="zj-gems">';
    ZLoot.COMMON.forEach(function(id){ var it=ITEMS[id], pr=ZLoot.priceOf(id), n=st[id]||0, ok=n>0&&ps.gold>=pr.gold&&coins>=pr.coins;
      h+='<div class="zj-gem'+(n>0?'':' out')+'">'+ZIcon.item(id,2)+'<b>'+it.name+'</b>'+ZElUI.chip(it.gemEl)+'<i>'+pr.gold+' g + '+pr.coins+' coins</i><button class="si-buy"'+(ok?'':' disabled')+' onclick="window._buyGem(\''+id+'\')">'+(n>0?'Buy':'Sold out')+'</button></div>'; });
    h+='</div><div class="zj-h">Set a gem <small>armor, shields, amulets and rings · two elements on a piece at most · take the piece off first</small></div>';
    var rows=''; (ps.inventory||[]).forEach(function(id,idx){ var it=ITEMS[id]; if(!it||!ZEL.SETTABLE[it.slot]||it.sov)return; var c=ZEL.carried(it); if(c.length>=2)return; var nth=ZEL.setOf(id).length, cost=ZLoot.setCost(it,nth);
      var btns=ZEL.LIST.filter(function(e){ return ZEL.canSet(id,e)&&ZLoot.count(ps,ZEL.E[e].gem)>=cost.gems; }).map(function(e){ return '<button class="zj-set" style="--zc:'+ZEL.E[e].col+'"'+(ps.gold>=cost.gold?'':' disabled')+' onclick="window._setGem('+idx+',\''+e+'\')">'+ZIcon.html(ZEL.E[e].ic,ZEL.E[e].em,1.1)+' '+ZEL.E[e].n+'</button>'; }).join('');
      rows+='<div class="shop-item"><div class="si-icon">'+ZIcon.item(id,1.5)+'</div><div class="si-info"><div class="si-name">'+it.name+' '+(c.length?ZElUI.chips(c):'')+'</div><div class="si-desc">'+cost.gems+' gem'+(cost.gems>1?'s':'')+' + '+cost.gold+' g → −'+ZElUI.pct(ZEL.RES_GEM)+' damage from that element'+(it.slot==='ring'||it.slot==='neck'?' and +'+ZElUI.pct(ZEL.POW_GEM)+' damage with it':'')+'</div></div><div class="zj-btns">'+(btns||'<small>no gems for it in your pack</small>')+'</div></div>'; });
    h+=rows||'<p class="zj-none">Nothing in your pack can take a gem. Bring armor, a shield, an amulet or a ring (a Silver Band is sold below).</p>';
    return h+'<div class="zj-h">Jewellery and your gems</div></div>'; },
  inject:function(ps){ var el=document.getElementById('camp-content'); if(!el)return; var d=document.createElement('div'); d.innerHTML=ZJewel.html(ps); var p=el.querySelector('p'); if(p)p.remove(); el.insertBefore(d,el.firstChild); if(typeof ZIcon!=='undefined')ZIcon.hydrate(el); }
};
(function(){ if(typeof openBuildingShop!=='function')return; var _o=openBuildingShop;
  openBuildingShop=function(btype,ps,ws){ window._campKind=btype; var m=document.getElementById('modal-camp'); if(m)m.classList.toggle('zf-wide',false); _o(btype,ps,ws); if(btype==='jeweler'){ try{ ZJewel.inject(ps); }catch(e){ if(typeof console!=='undefined')console.warn(e); } } };
  var re=function(){ var ws=game.scene.getScene('World'); if(!ws)return; var m=document.getElementById('modal-camp'), open=m&&m.style.display!=='none'; if(open)toggleModal('camp'); openBuildingShop('jeweler',ws.playerState,ws); ws._emitUI(); };
  window._buyGem=function(id){ var ws=game.scene.getScene('World'); if(!ws)return; var why=ZLoot.buyGem(ws.playerState,id); if(why)showNotif(why,'#ff8844'); else showNotif('💎 Bought '+ITEMS[id].name,'#bfe8ff'); re(); };
  window._setGem=function(idx,el){ var ws=game.scene.getScene('World'); if(!ws)return; var ps=ws.playerState, id=ps.inventory[idx], why=ZLoot.setGem(ps,idx,el); if(why)showNotif(why,'#ff8844'); else { showNotif('💎 The jeweller sets the gem: '+ITEMS[ZEL.setId(id,el)].name,ZEL.E[el].col); } re(); };
})();
// the wide forge panel goes back to normal when the panel closes
(function(){ if(typeof toggleModal!=='function')return; var _t=toggleModal; toggleModal=function(id){ var r=_t.apply(this,arguments); if(id==='camp'){ var m=document.getElementById('modal-camp'); if(m&&m.style.display==='none'){ m.classList.remove('zf-wide'); window._campKind=null; document.body.classList.remove('bars-hidden'); } else if(m&&(window._campKind==='forge'||window._campKind==='jeweler'))document.body.classList.add('bars-hidden'); } return r; }; })();      // (the tall forge and jeweller panels hide the bottom bars, as the inventory does)
(function(){ if(typeof closeModal!=='function')return; var _c=closeModal; closeModal=function(id){ var r=_c.apply(this,arguments); if(id==='camp'){ var m=document.getElementById('modal-camp'); if(m)m.classList.remove('zf-wide'); if(window._campKind==='forge'||window._campKind==='jeweler')document.body.classList.remove('bars-hidden'); window._campKind=null; } return r; }; })();

// ── Dev panel helpers for trying the element system (round 37) ────────
function sbElDummies(){ var ws=game.scene.getScene('World'); if(!ws||!ws.player||!game.scene.isActive('World')){ showNotif('Go to the open world first.','#ff8844'); return; }
  var picks=ZEL.LIST.map(function(el){ var R=MON_ROSTER.find(function(r){ var e=MON_EL[r.id]; return e&&e.length===1&&e[0]===el&&r.seg==='main'&&MX.kit(r.id); })||MON_ROSTER.find(function(r){ var e=MON_EL[r.id]; return e&&e.length===1&&e[0]===el&&MX.kit(r.id); }); return R; }).filter(Boolean);
  var two=MON_ROSTER.find(function(r){ return (MON_EL[r.id]||[]).length===2&&MX.kit(r.id); }); if(two)picks.push(two);
  picks.forEach(function(R,i){ var a=i/picks.length*Math.PI*2, m=MX.spawn(ws,R.id,ws.player.x+Math.cos(a)*150,ws.player.y+Math.sin(a)*120,{q:R.q,temp:true,hpMult:4}); if(m){ m._noLoot=true; m.section=1; m.respawnTimer=0; ws.worldMonsters.push(m); } });
  showNotif('Seven test monsters: one of each element and one with two. Their names show which.','#bfe8ff'); if(typeof toggleModal==='function'){ var sb=document.getElementById('modal-sandbox'); if(sb&&sb.style.display!=='none')toggleModal('sandbox'); } }
function sbForgeKit(){ var ws=game.scene.getScene('World'); if(!ws)return; var ps=ws.playerState; ps.gold+=6000; if(!ps.inventory)ps.inventory=[];
  ['iron_sword','iron_sword','iron_sword','hand_axe','hand_axe','crossbow','crossbow','band_ring','raw_iron','raw_iron'].forEach(function(k){ ps.inventory.push(k); });
  ZEL.LIST.forEach(function(e){ for(var i=0;i<5;i++)ps.inventory.push(ZEL.E[e].gem); ps.inventory.push(ZEL.E[e].rare); }); for(var i=0;i<12;i++)ps.inventory.push('dungeon_coin');
  ps.ammo=ps.ammo||{}; ['arrow_normal','arrow_fire','arrow_cold','arrow_thorn','arrow_shock','dart_normal','dart_fire','dart_cold','dart_thorn','dart_shock'].forEach(function(a){ ps.ammo[a]=(ps.ammo[a]||0)+20; });
  ws._emitUI(); showNotif('Forge kit: base weapons, 5 of every gem, 1 of every rare gem, 12 coins, 6000 g, element arrows.','#ffcc44'); }
function sbOpenForge(){ var ws=game.scene.getScene('World'); if(!ws)return; var sb=document.getElementById('modal-sandbox'); if(sb&&sb.style.display!=='none')toggleModal('sandbox'); openForgeModal(ws.playerState,ws); }
function sbOpenJeweller(){ var ws=game.scene.getScene('World'); if(!ws)return; var sb=document.getElementById('modal-sandbox'); if(sb&&sb.style.display!=='none')toggleModal('sandbox'); openBuildingShop('jeweler',ws.playerState,ws); }
