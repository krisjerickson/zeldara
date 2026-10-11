// ═══════════════════════════════════════════════════════════════════════
// ║ 22e-quick.js — round 47: quick-use slots.
// ║ Kris: "make it so you can equip food and potion to use in action during the live game. "o" for food should automatically eat the food you
// ║ have equipped, ammo and other things for selecting". His card: two slots — one food and one potion are equipped in the inventory (and the
// ║ ammo is chosen there too); O eats the food, P drinks the potion; when one runs out the next of the same kind is equipped.
// ═══════════════════════════════════════════════════════════════════════
var ZQUICK={
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  isFood:function(id){ var I=ITEMS[id]; return !!(I&&I.slot==='food'); },
  isPotion:function(id){ var I=ITEMS[id]; return !!(I&&I.slot==='use'); },
  list:function(ps,kind){ var seen={}, out=[]; (ps.inventory||[]).forEach(function(id){ if(seen[id])return; if(kind==='food'?ZQUICK.isFood(id):ZQUICK.isPotion(id)){ seen[id]=1; out.push(id); } }); return out; },
  count:function(ps,id){ return (ps.inventory||[]).filter(function(x){ return x===id; }).length; },
  // the equipped one, or (when that is gone) the next of the same kind
  cur:function(ps,kind){ ps.quick=ps.quick||{}; var k=kind, id=ps.quick[k]; if(id&&ZQUICK.count(ps,id)>0)return id; var L=ZQUICK.list(ps,kind);
    if(kind==='potion'){ L.sort(function(a,b){ return ((ITEMS[b].heal||0)-(ITEMS[a].heal||0)); }); } id=L[0]||null; ps.quick[k]=id; return id; },
  use:function(kind){ var ws=ZQUICK.ws(), ps=ws&&ws.playerState; if(!ps)return; var id=ZQUICK.cur(ps,kind);
    if(!id){ showNotif(kind==='food'?'No food to eat — equip some in the inventory':'No potions — buy some at the Apothecary','#ff8844'); return; }
    var I=ITEMS[id], idx=ps.inventory.indexOf(id);
    if(I.heal&&typeof window._useItem==='function')window._useItem(idx);
    else { if(typeof _inBossRush==='function'&&_inBossRush()){ showNotif('🚫 No potions in the boss rush!','#ff4444'); return; } ps.inventory.splice(idx,1); var fx=typeof ZHit!=='undefined'&&ZHit.useFx?ZHit.useFx(ps,I):''; showNotif(I.icon+' '+I.name+(fx?' — '+fx:''),'#44ffaa'); }
    ZQUICK.cur(ps,kind); if(ws._emitUI)ws._emitUI(); ZQUICK.bar(); },
  setQ:function(kind,id){ var ws=ZQUICK.ws(), ps=ws&&ws.playerState; if(!ps)return; ps.quick=ps.quick||{}; if(kind==='ammo'){ ps.activeAmmo=id||null; } else ps.quick[kind]=id||null; ZQUICK.bar(); if(ws._emitUI)ws._emitUI(); },
  // the action bar shows what O and P will use
  bar:function(){ var ws=ZQUICK.ws(), ps=ws&&ws.playerState; if(!ps)return; ['food','potion'].forEach(function(kind){ var slot=document.querySelector('.aib-slot[title="'+(kind==='food'?'Eat food':'Use potion')+'"] .aib-lbl'); if(!slot)return; var id=ZQUICK.cur(ps,kind), I=id&&ITEMS[id], t=I?(I.name.length>11?I.name.slice(0,10)+'…':I.name)+' ×'+ZQUICK.count(ps,id):(kind==='food'?'Food':'Potion'); if(slot.textContent!==t)slot.textContent=t; }); },
  // the inventory's quick-use row: food, potion, ammo
  panel:function(ps){ var opt=function(kind,L,cur,lab){ return '<label style="display:inline-flex;align-items:center;gap:6px;margin-right:14px;font-size:12px;color:#cfe">'+lab+'<select onchange="ZQUICK.setQ(\''+kind+'\',this.value)" style="background:#10202a;color:#e8f6ff;border:1px solid rgba(159,232,255,.35);border-radius:5px;padding:2px 4px;font-size:12px">'+
        (L.length?'':'<option value="">— none —</option>')+L.map(function(id){ var I=ITEMS[id], n=kind==='ammo'?((ps.ammo||{})[id]||0):ZQUICK.count(ps,id); return '<option value="'+id+'"'+(id===cur?' selected':'')+'>'+(I.icon||'')+' '+I.name+' ×'+n+'</option>'; }).join('')+'</select></label>'; };
    var ammo=Object.keys(ps.ammo||{}).filter(function(id){ return ITEMS[id]&&(ps.ammo[id]||0)>0; });
    return '<div id="zquick-row" style="display:flex;flex-wrap:wrap;align-items:center;padding:6px 8px;margin-bottom:8px;border:1px solid rgba(159,232,255,.2);border-radius:8px;background:rgba(20,50,60,.25)"><b style="font-size:12px;color:#9fe8ff;margin-right:12px">Quick use</b>'+
      opt('food',ZQUICK.list(ps,'food'),ZQUICK.cur(ps,'food'),'O — eat')+opt('potion',ZQUICK.list(ps,'potion'),ZQUICK.cur(ps,'potion'),'P — drink')+(ammo.length?opt('ammo',ammo,ps.activeAmmo||ammo[0],'Ammo'):'')+'</div>'; } };
(function(){ if(typeof updateInventoryModal!=='function')return; var u0=updateInventoryModal;
  updateInventoryModal=function(ps){ var r=u0.apply(this,arguments); try{ var c=document.getElementById('inv-content'); if(c&&ps){ var old=document.getElementById('zquick-row'); if(old)old.remove(); c.insertAdjacentHTML('afterbegin',ZQUICK.panel(ps)); } }catch(e){} return r; }; })();
if(typeof setInterval!=='undefined')setInterval(function(){ try{ ZQUICK.bar(); }catch(e){} },700);
