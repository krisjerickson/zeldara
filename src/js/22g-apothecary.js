// ═══════════════════════════════════════════════════════════════════════
// ║ 22g-apothecary.js — round 60: the Sorcerer's Apothecary sells the magic weapons AND upgrades them.
// ║ Kris: "basic magic weapon and magic weapon upgrades should be at the apothecary, not the blacksmith"; "since apothecary sells the magic weapons and
// ║ the upgrades, we need more art in the apothecary to show items like this in the room" (its furniture: 07v layout; painted pieces wave 62).
// ║ STAFF-CRAFT: bring a staff and the gems of the element you want, and the apothecary works it up into the next staff — cheaper than buying one
// ║ new, since your old staff goes into it. The tree: Magic Wand → Staff of Embers (ruby) / Root Staff (emerald) / Tide Staff (sapphire);
// ║ Root Staff → Stone Rod (2 amber); Tide Staff → Storm Staff (2 topaz); Stone Rod → Shade Staff (2 onyx); Shade Staff → Arcane Staff (ruby,
// ║ sapphire, emerald, topaz); Arcane Staff → the Sovereign Staff (2 ruby, 2 sapphire, 2 emerald, a skystone, 6000 g — once the forges rise; it is
// ║ still won from the sixteen mage towers too). Each row shows its pieces as tiles, greyed out when missing.
// ═══════════════════════════════════════════════════════════════════════
var ZAPO={
  CRAFT:[
    {out:'ember_staff',from:'magic_wand',gems:{gem_ruby:1},gold:60},
    {out:'root_staff',from:'magic_wand',gems:{gem_emerald:1},gold:60},
    {out:'tide_staff',from:'magic_wand',gems:{gem_sapphire:1},gold:90},
    {out:'stone_staff',from:'root_staff',gems:{gem_amber:2},gold:120},
    {out:'storm_staff',from:'tide_staff',gems:{gem_topaz:2},gold:130},
    {out:'shade_staff',from:'stone_staff',gems:{gem_onyx:2},gold:200},
    {out:'arcane_staff',from:'shade_staff',gems:{gem_ruby:1,gem_sapphire:1,gem_emerald:1,gem_topaz:1},gold:300},
    {out:'sov_staff',from:'arcane_staff',gems:{gem_ruby:2,gem_sapphire:2,gem_emerald:2,skystone:1},gold:6000,forges:true}],
  n:function(ps,id){ return (ps.inventory||[]).filter(function(x){ return x===id; }).length+((ps.equip&&ps.equip.mWeapon===id)?1:0); },
  open:function(ps,R){ var mx=Math.max.apply(null,ps.unlockedSections||[1]); if(R.forges)return typeof _finalQuestUnlocked==='function'&&_finalQuestUnlocked(ps); var it=ITEMS[R.out]; return it&&(it.secReq||0)<=mx; },
  ready:function(ps,R){ if(ZAPO.n(ps,R.from)<1||(ps.gold||0)<R.gold)return false; for(var g in R.gems)if(ZAPO.n(ps,g)<R.gems[g])return false; return true; },
  html:function(ps){ var rows=[], btn=[]; ZAPO.CRAFT.forEach(function(R,i){ if(!ZAPO.open(ps,R)||!ITEMS[R.out])return; var have=ZAPO.n(ps,R.out)>0;
      var items=[{k:R.from,have:ZAPO.n(ps,R.from)>0,where:'bring the staff'}].concat(Object.keys(R.gems).map(function(g){ var n=ZAPO.n(ps,g); return {k:g,have:n>=R.gems[g],n:n,need:R.gems[g]>1?R.gems[g]:0,where:'a gem'}; }));
      rows.push({title:(ITEMS[R.out].name)+(have?' <span style="font-weight:400;color:#9aa0b4">· you have one</span>':''),items:items,cost:R.gold,costOk:(ps.gold||0)>=R.gold,out:R.out,_i:i}); });
    if(!rows.length)return '';
    var out=rows.map(function(R){ var ok=ZAPO.ready(ps,ZAPO.CRAFT[R._i]); return (typeof ZTALK!=='undefined'?ZTALK.grid([R]):'')+'<div style="text-align:right;margin:3px 0 6px"><button class="si-buy" '+(ok?'':'disabled ')+'onclick="ZAPO.make('+R._i+')">'+(ok?'Work it up':'Missing pieces')+'</button></div>'; }).join('');
    return '<div style="margin-top:14px;border-top:1px solid rgba(255,255,255,.12);padding-top:10px"><div style="font-weight:700;color:#b8f0a0;font-size:13px">🔮 Staff-craft — bring a staff and gems, get the next staff</div><div style="font-size:11px;color:#9aa0b4;margin:2px 0 4px">Your old staff goes into the new one, so it costs far less than buying.</div>'+out+'</div>'; },
  make:function(i){ var ws=game.scene.getScene('World'), ps=ws&&ws.playerState, R=ZAPO.CRAFT[i]; if(!ps||!R||!ZAPO.ready(ps,R))return; var inv=ps.inventory;
    var j=inv.indexOf(R.from); if(j>=0)inv.splice(j,1); else if(ps.equip&&ps.equip.mWeapon===R.from)ps.equip.mWeapon=null;
    for(var g in R.gems)for(var c=0;c<R.gems[g];c++){ var k=inv.indexOf(g); if(k>=0)inv.splice(k,1); }
    ps.gold-=R.gold; inv.push(R.out); if(typeof Tome!=='undefined'&&Tome.see)try{ Tome.see('item',R.out); }catch(e){} if(typeof ZSFX!=='undefined')try{ ZSFX.play('levelup'); }catch(e){}
    showNotif('🔮 The apothecary works your '+ITEMS[R.from].name+' into the '+ITEMS[R.out].name+'!','#b8f0a0'); if(ws._emitUI)ws._emitUI(); if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('a new staff'); }catch(e){}
    if(typeof openBuildingShop==='function')openBuildingShop('apothecary',ps,ws); }
};
(function(){ if(typeof openBuildingShop!=='function')return; var o0=openBuildingShop; openBuildingShop=function(btype,ps,worldScene){ var r=o0.apply(this,arguments); if(btype!=='apothecary')return r;
    var el=document.getElementById('camp-content'); if(!el)return r; var add=ZAPO.html(ps); if(!add)return r; var ps2=el.querySelectorAll('p'), last=ps2[ps2.length-1];
    var d=document.createElement('div'); d.innerHTML=add; if(last)el.insertBefore(d,last); else el.appendChild(d); return r; };
  if(typeof BUILDING_TITLES!=='undefined')BUILDING_TITLES.apothecary='🔮 Sorcerer\'s Apothecary — Potions, Staffs & Staff-craft';
  // the new furniture, drawn as its nearest kin until the paintings are in (wave 62)
  if(typeof INT_PROPS!=='undefined'){ var al=function(a,b){ if(!INT_PROPS[a]&&INT_PROPS[b])INT_PROPS[a]=function(){ return INT_PROPS[b].apply(this,arguments); }; if(typeof INT_HT!=='undefined'&&!INT_HT[a])INT_HT[a]=INT_HT[b]||48; };
    al('staffrack','rack'); al('wandcase','showcase'); al('orbstand','crystalball'); al('staffstand','crystalball'); al('enchantbench','longtable'); }
  if(typeof INT_WALLDECO!=='undefined'&&!INT_WALLDECO.staffs)INT_WALLDECO.staffs=INT_WALLDECO.swords; })();
