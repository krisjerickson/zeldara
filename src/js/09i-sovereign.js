// ═══════════════════════════════════════════════════════════════════════
// ║ 09i-sovereign.js — ZSov: how the Sovereign set is won (round 39).
// ║ Kris (Oct 8): "For the sovereign set, let's do the one piece per finished set".
// ║ Each "collect them all" in the game gives one piece. The Elemental Sovereign sword keeps its forge recipe.
// ║   ZSov.SETS          piece → what finishes it, and how far you are (have / of)
// ║   ZSov.check(ps)     gives every piece whose set is finished (called every few seconds and when a save loads)
// ║   ZSov.progress(ps)  [{piece, name, how, have, of, got}]  for the Tome and the Paths page
// ═══════════════════════════════════════════════════════════════════════
var ZSov={
  SETS:[
    {piece:'sov_axe',      how:'Win all four boss dungeons',               f:function(ps){ return [[1,2,3,4].filter(function(s){ return ZSov._q(ps,'s'+s+'_dungeon'); }).length,4]; }},
    {piece:'sov_shield',   how:'Win all four boss towers',                 f:function(ps){ return [[1,2,3,4].filter(function(s){ return ZSov._q(ps,'s'+s+'_tower'); }).length,4]; }},
    {piece:'sov_crossbow', how:'Beat all four island guardians',           f:function(ps){ return [[1,2,3,4].filter(function(s){ return ZSov._q(ps,'s'+s+'_harbor'); }).length,4]; }},
    {piece:'sov_bow',      how:'Defend all four Sky Ports',                f:function(ps){ return [[1,2,3,4].filter(function(s){ return ZSov._q(ps,'s'+s+'_skyport'); }).length,4]; }},
    {piece:'sov_crown',    how:'Clear all twelve island castles',          f:function(ps){ return [(ps.castlesDone||[]).length,typeof CASTLE_ISLANDS!=='undefined'?Object.keys(CASTLE_ISLANDS).length:12]; }},
    {piece:'sov_staff',    how:'Win all sixteen mage towers',              f:function(ps){ return [(ps.mageDone||[]).length,typeof MAGE_TOWERS!=='undefined'?MAGE_TOWERS.length:16]; }},
    {piece:'sov_amulet',   how:'Find all twelve relics in the treasure vaults', f:function(ps){ return [(ps.relics||[]).length,12]; }},
    {piece:'sov_mantle',   how:'Win the trials of all three Fairy Kings',  f:function(ps){ return [(ps.fairyKings||[]).length,3]; }},
    {piece:'sov_greaves',  how:'Learn all twenty fairy lessons',           f:function(ps){ var Q=ps.fairyQuests||{}; return [Object.keys(Q).filter(function(k){ return /^q\d_f\d$/.test(k)&&Q[k]&&Q[k].st==='done'; }).length,20]; }},
    {piece:'sov_ring',     how:'Raise all four familiars to their last level', f:function(ps){ var L=ps.famLevels||{}, own=ps.ownedFamiliars||[]; return [['fam_grass','fam_water','fam_earth','fam_fire'].filter(function(f){ return own.indexOf(f)>=0&&(L[f]||1)>=6; }).length,4]; }},
    {piece:'sov_gauntlets',how:'Clear every monster camp in the four realms', f:function(ps){ var ws=ZSov._ws(), n=(ws&&ws._camps)?ws._camps.filter(function(c){ return /^c[1-4]_/.test(c.id||''); }).length:132, d=ps.campsDone||{}; return [Object.keys(d).filter(function(k){ return /^c[1-4]_/.test(k); }).length,n||132]; }},
    {piece:'sov_boots',    how:'Walk every region of the four realms',     f:function(ps){ var n=typeof WMAP_ZONES!=='undefined'?WMAP_ZONES.length:40; return [Math.min(n,(ps.visitedZones||[]).length),n]; }},
    {piece:'sov_plate',    how:'Defeat the Volcano Lord',                  f:function(ps){ return [ZSov._q(ps,'volcano_lord')?1:0,1]; }}],
  _q:function(ps,k){ return (ps.completedQuests||[]).indexOf(k)>=0; },
  _ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  owned:function(ps,id){ if((ps.sovGot||[]).indexOf(id)>=0)return true; if((ps.inventory||[]).indexOf(id)>=0)return true; var e=ps.equip||{}; for(var k in e)if(e[k]===id)return true; return false; },
  progress:function(ps){ return ZSov.SETS.map(function(S){ var r=[0,1]; try{ r=S.f(ps); }catch(e){} var I=ITEMS[S.piece]; return {piece:S.piece,name:I?I.name:S.piece,how:S.how,have:Math.min(r[0],r[1]),of:r[1],got:ZSov.owned(ps,S.piece)}; }); },
  setOf:function(id){ return ZSov.SETS.find(function(S){ return S.piece===id; })||null; },
  check:function(ps,quiet){ if(!ps)return []; var got=[]; ps.sovGot=ps.sovGot||[];
    ZSov.progress(ps).forEach(function(P){ if(P.got||P.have<P.of)return; ps.sovGot.push(P.piece); if(!ps.inventory)ps.inventory=[]; ps.inventory.push(P.piece); got.push(P);
      if(typeof Tome!=='undefined'&&Tome.see)Tome.see('item',P.piece);
      if(!quiet){ try{ showNotif('✦ '+P.how.replace(/^./,function(c){ return c.toLowerCase(); }).replace(/^/,'You did it — ')+'. The '+P.name+' is yours: every element at once.','#fff2b0'); if(typeof ZLogo!=='undefined'&&ZLogo.banner)ZLogo.banner('blade_b','Sovereign set',P.name); }catch(e){} } });
    return got; }
};
// every few seconds, and once when a save has loaded (pieces whose set was already finished come at once, quietly)
if(typeof window!=='undefined'){ setInterval(function(){ try{ var ws=ZSov._ws(); if(!ws||!ws.playerState||!ws.player)return; var ps=ws.playerState; if(!ps._sovInit){ Object.defineProperty(ps,'_sovInit',{value:1,enumerable:false,writable:true,configurable:true}); var g0=ZSov.check(ps,true); if(g0.length)showNotif('✦ Sovereign set: '+g0.map(function(P){ return P.name; }).join(', ')+' — for what you had already finished','#fff2b0'); return; } if(ZSov.check(ps).length&&ws._emitUI)ws._emitUI(); }catch(e){} },2500); }
// the pieces say how they are won
(function(){ if(typeof ITEMS==='undefined')return; ZSov.SETS.forEach(function(S){ var I=ITEMS[S.piece]; if(I&&I.desc)I.desc=I.desc.replace(/ — every element at once\..*$/,' — every element at once. Won by: '+S.how.replace(/^./,function(c){ return c.toLowerCase(); })+'.'); }); })();
