// ── Tavern menu (cup fill / direct drink / rest) ─────────────────────────
function _showTavernMenu(ps, ws){
  var hasEmptyCup=(ps.inventory||[]).indexOf('cup_empty')>=0;
  var ov=document.createElement('div');
  ov.id='tavern-menu-overlay';
  ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
  var html2='<div style="background:linear-gradient(160deg,#2a1f12,#1a1208);border:1px solid #6a4422;border-radius:12px;padding:22px 26px;min-width:340px;text-align:center;font-family:Segoe UI">';
  html2+='<div style="font-size:20px;color:#ffcc88;font-weight:bold;margin-bottom:4px">🍺 Tavern</div>';
  html2+='<div style="font-size:11px;color:#998877;margin-bottom:14px">Welcome, traveler. What can I get you?</div>';
  html2+='<div style="font-size:11px;color:#ffd700;margin-bottom:14px">💰 Gold: '+ps.gold+'g</div>';
  function row(label, desc, cost, action, dis){
    var ok=ps.gold>=cost && !dis;
    return '<div onclick="'+(ok?action:'')+'" style="cursor:'+(ok?'pointer':'default')+';background:rgba('+(ok?'255,200,100,.10':'40,30,20,.40')+');border:1px solid rgba('+(ok?'255,200,100,.4':'80,60,40,.3')+');border-radius:7px;padding:10px 14px;margin-bottom:8px;text-align:left;color:'+(ok?'#ffeecc':'#776655')+'">'
      +'<div style="font-size:13px;font-weight:600">'+label+'</div>'
      +'<div style="font-size:10px;color:#aa9988;margin-top:3px">'+desc+'</div>'
      +'<div style="font-size:11px;color:'+(ok?'#ffd700':'#665544')+';margin-top:4px">'+cost+'g</div>'
      +'</div>';
  }
  html2+=row('💤 Rest', 'Restore HP fully. No buff.', 10, "window._tavernAct('rest')");
  html2+=row('🍺 Drink Direct', 'Full heal + random 2-min buff (+25% ATK / DEF / SPD).', 100, "window._tavernAct('drink')");
  if(hasEmptyCup){
    html2+=row('🍶 Fill Cup', 'Take a filled cup. Heals 20 + random 2-min buff when consumed.', 100, "window._tavernAct('fill')");
  } else {
    html2+='<div style="font-size:9px;color:#665;font-style:italic;margin:8px 0 4px">Buy an empty cup at the General Shop to take drinks to-go.</div>';
  }
  html2+='<button onclick="window._tavernClose()" style="margin-top:8px;background:#1a1108;border:1px solid #5a3a22;color:#aa8866;padding:7px 18px;border-radius:6px;cursor:pointer;font-family:inherit;font-size:11px">Leave</button>';
  html2+='</div>';
  ov.innerHTML=html2;
  document.body.appendChild(ov);
  window._tavernClose=function(){ if(ov.parentNode) ov.parentNode.removeChild(ov); };
  window._tavernAct=function(act){
    if(act==='rest'){
      if(ps.gold<10){showNotif('Not enough gold!','#ff4444');return;}
      ps.gold-=10; ps.hp=ps.maxHp;
      showNotif('💤 Rested for 10g. HP restored!','#44ffaa');
    } else if(act==='drink'){
      if(ps.gold<100){showNotif('Not enough gold!','#ff4444');return;}
      ps.gold-=100; ps.hp=ps.maxHp;
      var b=_heroBuffRandom(ps, 120000);
      var msg={atkUp:'+25% ATK',defUp:'+25% DEF',spdUp:'+25% SPD'}[b];
      showNotif('🍺 Drank! Full heal + '+msg+' for 2 min','#ffcc44');
    } else if(act==='fill'){
      if(ps.gold<100){showNotif('Not enough gold!','#ff4444');return;}
      var idx=ps.inventory.indexOf('cup_empty');
      if(idx<0){showNotif('No empty cup!','#ff4444');return;}
      ps.gold-=100;
      ps.inventory[idx]='cup_filled';
      showNotif('🍶 Cup filled! Drink it any time for HP + buff.','#44ddff');
    }
    if(ws&&ws._emitUI)ws._emitUI();
    window._tavernClose();
  };
}
window._useItem=function(idx){
  var ws=game.scene.getScene('World');if(!ws)return;
  var ps=ws.playerState;
  var id=ps.inventory[idx],item=ITEMS[id];
  if(!item||!item.heal)return;
  if(_inBossRush()){showNotif('🚫 No healing in the boss rush!','#ff4444');return;}
  ps.hp=Math.min(ps.maxHp,ps.hp+item.heal);
  ps.inventory.splice(idx,1);
  // Cup-specific: also apply a random 2-min buff. Other foods just heal.
  if(item.isCup){
    var b=_heroBuffRandom(ps, 120000);
    var bMsg={atkUp:'+25% ATK',defUp:'+25% DEF',spdUp:'+25% SPD'}[b];
    showNotif(item.icon+' +'+item.heal+' HP & '+bMsg+' for 2 min','#ffcc44');
  } else {
    showNotif(item.icon+' Healed '+item.heal+' HP!','#44ffaa');
  }
  updateInventoryModal(ps);ws._emitUI();
};
window._sellItem=function(idx){
  var ws=game.scene.getScene('World');if(!ws)return;
  var ps=ws.playerState;
  var id=ps.inventory[idx],item=ITEMS[id];
  if(!item||!item.goldVal)return;
  ps.gold+=item.goldVal;ps.inventory.splice(idx,1);
  showNotif('Sold '+item.icon+' for '+item.goldVal+'g','#ffd700');
  updateInventoryModal(ps);ws._emitUI();
};


window._openSlotPicker2=function(slotKey){
  var ws=game&&game.scene?game.scene.getScene('World'):null;
  if(!ws||!ws.playerState)return;
  var ps=ws.playerState;var eq=ps.equip||{};
  var SMAP={lHand:'lHand',rHand:'rHand',mWeapon:'mWeapon',body:'body',shield:'shield',head:'head',
    feet:'feet',pants:'pants',gauntlets:'gauntlets',neck:'neck',back:'back',spell:'spell',special:'special'};
  for(var i=1;i<=10;i++)SMAP['ring'+i]='ring';
  var compatSlot=SMAP[slotKey]||slotKey;
  var SLBL={lHand:'Melee Weapon',rHand:'Ranged Weapon',mWeapon:'Magic Weapon',body:'Body Armor',shield:'Shield',
    head:'Helmet',feet:'Boots',pants:'Pants',gauntlets:'Gauntlets',neck:'Amulet',back:'Cloak',spell:'Spell (X)',special:'Special Skill'};
  for(var i=1;i<=10;i++)SLBL['ring'+i]='Ring '+i;
  var pTitle=document.getElementById('slot-picker-title');
  var pBody=document.getElementById('slot-picker-body');
  var pop=document.getElementById('slot-picker-modal');
  if(!pTitle||!pBody||!pop)return;
  pTitle.textContent=(SLBL[slotKey]||slotKey)+' Slot';
  var h='';
  var curId=eq[slotKey];
  if(curId&&ITEMS[curId]){
    var ci=ITEMS[curId];
    h+='<div style="background:rgba(80,180,80,.1);border:1px solid rgba(80,180,80,.3);border-radius:7px;padding:8px 10px;margin-bottom:8px;display:flex;align-items:center;gap:8px">'
      +'<span style="font-size:18px">'+ZIcon.of(ci,1.5)+'</span>'
      +'<span style="flex:1;font-size:12px;color:#aee">'+ci.name+' <span style="color:#556;font-size:10px">(equipped)</span></span>'
      +'<button class="ir-equip" style="color:#ff8888;background:rgba(200,80,80,.2);border-color:rgba(200,80,80,.4)" '
      +'onclick="window._unequipSlot(\''+slotKey+'\');document.getElementById(\'slot-picker-modal\').style.display=\'none\'">Remove</button></div>';
  }
  var matches=[];
  (ps.inventory||[]).forEach(function(id,idx){var it=ITEMS[id];if(it&&it.slot===compatSlot)matches.push({id:id,idx:idx,it:it});});
  if(!matches.length){
    h+='<div style="color:#445;font-size:11px;padding:8px">No compatible items in inventory.<br><span style="color:#334;font-size:10px">Find them in dungeons, shops &amp; drops.</span></div>';
  }else{
    matches.forEach(function(m){
      var st='';
      if(m.it.atk&&m.it.def)st='+'+m.it.atk+' ATK +'+m.it.def+' DEF';
      else if(m.it.atk)st='+'+m.it.atk+' ATK';
      else if(m.it.def)st='+'+m.it.def+' DEF';
      if(m.it.spdBonus)st+=' +'+(m.it.spdBonus*100|0)+'% Spd';
      if(m.it.elementDmg)st+=' +'+m.it.elementDmg+' '+m.it.element;
      h+='<div class="sp-row" onclick="window._equipFromPicker2('+m.idx+',\''+slotKey+'\')">'
        +'<span style="font-size:16px">'+ZIcon.of(m.it,1.5)+'</span>'
        +'<span style="flex:1;margin-left:8px">'+m.it.name+'</span>'
        +'<span style="color:#88aa66;font-size:10px">'+st+'</span></div>';
    });
  }
  pBody.innerHTML=h;
  pop.style.display='flex';
};
window._equipFromPicker2=function(idx,slotKey){
  document.getElementById('slot-picker-modal').style.display='none';
  var ws=game&&game.scene?game.scene.getScene('World'):null;if(!ws)return;
  var ps=ws.playerState,inv=ps.inventory,eq=ps.equip;
  var id=inv[idx];if(!id)return;
  if(/^ring\d+$/.test(slotKey)){
    var old=eq[slotKey];eq[slotKey]=id;inv.splice(idx,1);
    if(old)inv.push(old);
    updateInventoryModal(ps);ws._emitUI();return;
  }
  window._equipItem(idx,slotKey);
};

// ─── Quick Pick popup for action icon bar ────────────────────────────────

// ─── Item Found Popup ─────────────────────────────────────────────────────
function showItemFoundPopup(itemId, equip, ps, ws){
  var pop=document.getElementById('item-found-popup');
  if(!pop)return;
  var item=ITEMS[itemId]; if(!item)return;
  var slotKey=item.slot==='ring'?null:item.slot; // rings go to any ring slot
  var curId=slotKey?equip[slotKey]:null;
  var cur=curId?ITEMS[curId]:null;

  function statStr(it){
    if(!it)return'<span style="color:#446">Nothing equipped</span>';
    var s='<b>'+it.icon+' '+it.name+'</b><br>';
    if(it.atk)s+='ATK: +'+it.atk+'<br>';
    if(it.def)s+='DEF: +'+it.def+'<br>';
    if(it.spdBonus)s+='SPD: +'+(it.spdBonus*100|0)+'%<br>';
    if(it.elementDmg)s+=it.element+': +'+it.elementDmg+'<br>';
    return s;
  }

  var title;
  if(item.slot==='lHand')title='New melee weapon found!';
  else if(item.slot==='rHand')title='New ranged weapon found!';
  else if(item.slot==='mWeapon')title='New magic weapon found!';
  else if(['body','head','shield','feet','pants','gauntlets','back'].includes(item.slot))title='New armor found!';
  else title='Item found: '+item.name;

  document.getElementById('ifp-title').innerHTML=title;
  document.getElementById('ifp-old').innerHTML='<div style="font-size:9px;color:#557;margin-bottom:4px">CURRENT</div>'+statStr(cur);
  document.getElementById('ifp-new').innerHTML='<div style="font-size:9px;color:#395;margin-bottom:4px">NEW FIND</div>'+statStr(item);

  // Equip button
  var equipBtn=document.getElementById('ifp-equip');
  var equipBtnNew=equipBtn.cloneNode(true);
  equipBtn.parentNode.replaceChild(equipBtnNew,equipBtn);
  equipBtnNew.onclick=function(){
    pop.style.display='none';
    if(!ws)return;
    // Find item in inventory and equip to correct slot
    var invIdx=ws.playerState.inventory.lastIndexOf(itemId);
    if(invIdx===-1)return;
    var eqSlot=item.slot;
    if(eqSlot==='ring'){for(var ri=1;ri<=10;ri++){if(!ws.playerState.equip['ring'+ri]){eqSlot='ring'+ri;break;}}}
    window._equipItem(invIdx,eqSlot);
  };

  // Keep button
  var keepBtn=document.getElementById('ifp-keep');
  var keepBtnNew=keepBtn.cloneNode(true);
  keepBtn.parentNode.replaceChild(keepBtnNew,keepBtn);
  keepBtnNew.onclick=function(){pop.style.display='none';};

  pop.style.display='block';
  // Auto-close after 12 seconds if no action
  clearTimeout(window._ifpTimer);
  window._ifpTimer=setTimeout(function(){pop.style.display='none';},12000);
}

// ─── World Ranged Attack (CTRL) ───────────────────────────────────────────
function _fireWorldBow(ws){
  if(!ws||!ws.player)return;
  if((ws.worldAtkTimer||0)>0)return;
  var ps=ws.playerState;
  var rWeapon=ps.equip&&ps.equip.rHand?ITEMS[ps.equip.rHand]:null;
  if(!rWeapon||rWeapon.slot!=='rHand'){
    // Check if a magic weapon is equipped — remind player to use X for spells
    if(ps.equip&&ps.equip.mWeapon){
      showNotif('Magic weapon equipped — use X to cast spells!','#aa88ff');
    } else {
      showNotif('No ranged weapon equipped! Equip a bow in the Ranged slot.','#ff8844');
    }
    return;
  }
  // Ranged weapon: needs ammo
  var ammoId=ws._getBestAmmo(rWeapon);
  if(!ammoId){
    showNotif('Out of ammo! Buy arrows/darts at the Armory.','#ff8844');
    return;
  }
  // Consume 1 ammo
  if(!ps.ammo)ps.ammo={};
  ps.ammo[ammoId]=Math.max(0,(ps.ammo[ammoId]||1)-1);
  var ammoItem=ITEMS[ammoId];
  var subtype=ammoItem?ammoItem.subtype:'normal';
  var stats=ws.calcPlayerStats();
  var atkPow=Math.max(1,(rWeapon.atk||6)+Math.floor(stats.atk*0.3));
  ws.worldAtkTimer=0.7;ws.worldBowTimer=0.7; if(ws._mountCombat)ws._mountCombat();
  var p=ws.player;
  // Direction-based aiming: facing direction + optional 45° modifier
  var _aimAng=ws._getAimAngle();
  var nx=Math.cos(_aimAng),ny=Math.sin(_aimAng);
  var spd=subtype==='heat'?220:360;
  var col={normal:0xeedd88,cold:0x88ddff,fire:0xff6600,heat:0xff8800}[subtype]||0xeedd88;
  var vis=(typeof ZShot!=='undefined'&&ZShot.make(ws,ZShot.ammoKind(ammoId,subtype),p.x,p.y,Math.atan2(ny,nx),15))||ws.add.rectangle(p.x,p.y,16,4,col).setDepth(15).setAngle(Math.atan2(ny,nx)*180/Math.PI);
  if(!ws._playerProj)ws._playerProj=[];
  ws._playerProj.push({
    vis:vis,x:p.x,y:p.y,
    vx:nx*spd,vy:ny*spd,
    dmg:atkPow,life:2.2,hit:false,
    type:'arrow',subtype:subtype,
    tracking:subtype==='heat',
    effect:subtype==='cold'?'slow':subtype==='fire'?'fire':'none',
    effectDur:2.0,
    splashR:subtype==='fire'?70:0
  });
  // Bow draw+release animation
  var wep=p.weapon;
  if(wep){
    wep.setFillStyle(col);
    // Draw back: shift weapon opposite to aim direction
    var drawX=p.x-nx*10, drawY=p.y-ny*10;
    ws.tweens.add({targets:wep,x:drawX,y:drawY,duration:80,ease:'Power2',onComplete:function(){
      // Release: snap forward and spawn arrow trail flash
      ws.tweens.add({targets:wep,x:p.x,y:p.y,duration:60,ease:'Power2',onComplete:function(){
        if(wep)wep.setFillStyle(0xcccccc);
      }});
      // Arrow trail streak at point of release
      var streak=ws.add.rectangle(p.x+nx*14,p.y+ny*14,22,3,col,0.8)
        .setDepth(16).setAngle(Math.atan2(ny,nx)*180/Math.PI);
      ws.tweens.add({targets:streak,alpha:0,x:p.x+nx*36,y:p.y+ny*36,duration:120,onComplete:function(){streak.destroy();}});
    }});
  }
  ws._updateAmmoHUD();
}

function showQuickPick(type){
  var pop=document.getElementById('quick-pick-popup');
  if(!pop)return;
  // Toggle off if same type clicked twice
  if(pop.style.display==='block'&&pop.dataset.qtype===type){pop.style.display='none';return;}
  pop.dataset.qtype=type;
  var ws=game&&game.scene?game.scene.getScene('World'):null;
  var ps=ws?ws.playerState:null;
  var inv=(ps?ps.inventory:[])||[];
  var eq=(ps?ps.equip:{})||{};

  function itemRow(id,idx,action,actionLabel,actionStyle){
    var it=ITEMS[id];if(!it)return'';
    var stat='';
    if(it.atk)stat='+'+it.atk+' ATK';
    if(it.def)stat+=(stat?' ':'')+('+'+it.def+' DEF');
    if(it.heal)stat='Heals '+it.heal+' HP';
    if(it.elementDmg)stat+=' +'+it.elementDmg+' '+it.element;
    if(it.spdBonus)stat+=' +'+(it.spdBonus*100|0)+'% Spd';
    if(it.cdReduce)stat+=' -'+(it.cdReduce*100|0)+'%CD';
    if(it.manaRegen)stat+=' +'+it.manaRegen+'mp/s';
    if(it.maxMana)stat+=' +'+it.maxMana+'MP';
    return '<div class="sp-row" style="'+(actionStyle||'')+'" onclick="'+action+'">'+
      '<span style="font-size:17px">'+ZIcon.of(it,1.5)+'</span>'+
      '<span style="flex:1;margin-left:7px;font-size:12px">'+it.name+'</span>'+
      '<span style="color:#88aa66;font-size:10px;margin-right:6px">'+stat+'</span>'+
      '<button class="ir-equip" style="font-size:10px">'+actionLabel+'</button></div>';
  }

  var h='<div style="font-size:11px;font-weight:700;color:#aaccff;margin-bottom:8px;border-bottom:1px solid rgba(100,180,255,.2);padding-bottom:5px">';
  var titles={attack:'Melee Weapon',ranged:'Ranged Weapon',defend:'Armor & Shield',
    potion:'Potions',food:'Food',spell:'Spell',familiar:'Familiar',special:'Special'};
  h+=titles[type]||type;h+='</div>';

  if(type==='attack'){
    // Show equipped + all melee in bag
    var curId=eq.lHand;
    if(curId&&ITEMS[curId])h+='<div style="color:#556;font-size:10px;margin-bottom:4px">Equipped: '+ITEMS[curId].icon+' '+ITEMS[curId].name+'</div>';
    var ml=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='lHand';});
    if(!ml.length)h+='<div style="color:#445;font-size:11px">No melee weapons in inventory</div>';
    ml.forEach(function(id){h+=itemRow(id,inv.indexOf(id),"window._equipItem("+inv.indexOf(id)+",'lHand');document.getElementById('quick-pick-popup').style.display='none'",'Equip');});

  } else if(type==='ranged'){
    var curId=eq.rHand;
    if(curId&&ITEMS[curId])h+='<div style="color:#556;font-size:10px;margin-bottom:4px">Equipped: '+ITEMS[curId].icon+' '+ITEMS[curId].name+'</div>';
    var rl=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='rHand';});
    if(!rl.length)h+='<div style="color:#445;font-size:11px">No ranged weapons in inventory</div>';
    rl.forEach(function(id){h+=itemRow(id,inv.indexOf(id),"window._equipItem("+inv.indexOf(id)+",'rHand');document.getElementById('quick-pick-popup').style.display='none'",'Equip');});

  } else if(type==='defend'){
    // Show shield + body armor options
    ['shield','body','head','gauntlets','pants','feet','back'].forEach(function(slot){
      var items=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot===slot;});
      if(!items.length)return;
      var slotNames={shield:'Shields',body:'Body Armor',head:'Helmets',gauntlets:'Gauntlets',pants:'Pants',feet:'Boots',back:'Cloaks'};
      h+='<div style="color:#88aacc;font-size:9px;text-transform:uppercase;margin:6px 0 3px">'+slotNames[slot]+'</div>';
      items.forEach(function(id){h+=itemRow(id,inv.indexOf(id),"window._equipItem("+inv.indexOf(id)+",'"+slot+"');document.getElementById('quick-pick-popup').style.display='none'",'Equip');});
    });
    if(h.indexOf('sp-row')<0)h+='<div style="color:#445;font-size:11px">No armor in inventory</div>';

  } else if(type==='potion'){
    var pots=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='use';});
    if(!pots.length)h+='<div style="color:#445;font-size:11px">No potions in inventory.<br><span style="font-size:10px;color:#334">Buy from the Camp Shop.</span></div>';
    pots.forEach(function(id){h+=itemRow(id,inv.indexOf(id),"window._useItem("+inv.indexOf(id)+");document.getElementById('quick-pick-popup').style.display='none'",'Use','');});

  } else if(type==='food'){
    var foods=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='food';});
    if(!foods.length)h+='<div style="color:#445;font-size:11px">No food in inventory.</div>';
    foods.forEach(function(id){h+=itemRow(id,inv.indexOf(id),"window._useItem("+inv.indexOf(id)+");document.getElementById('quick-pick-popup').style.display='none'",'Eat');});

  } else if(type==='spell'){
    var curSpell=eq.spell;
    if(curSpell&&ITEMS[curSpell])h+='<div style="color:#556;font-size:10px;margin-bottom:4px">Equipped spell: '+ITEMS[curSpell].icon+' '+ITEMS[curSpell].name+'</div>';
    var spells=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='spell';});
    if(!spells.length)h+='<div style="color:#445;font-size:11px">No spells in inventory.<br><span style="font-size:10px;color:#334">Find spellbooks in dungeons.</span></div>';
    spells.forEach(function(id){h+=itemRow(id,inv.indexOf(id),"window._equipItem("+inv.indexOf(id)+",'spell');document.getElementById('quick-pick-popup').style.display='none'",'Equip');});
    if(curSpell)h+='<div class="sp-row" onclick="window._unequipSlot(\'spell\');document.getElementById(\'quick-pick-popup\').style.display=\'none\'" style="color:#ff8888;font-size:11px;margin-top:4px">Remove equipped spell</div>';
    // Magic weapons in spell quick-pick (boost spell damage)
    var curMW=eq.mWeapon;
    h+='<div style="color:#88aacc;font-size:9px;text-transform:uppercase;letter-spacing:.5px;margin:8px 0 3px">🔮 Magic Weapon (×spell dmg)</div>';
    if(curMW&&ITEMS[curMW])h+='<div style="color:#556;font-size:10px;margin-bottom:4px">Equipped: '+ITEMS[curMW].icon+' '+ITEMS[curMW].name+' ×'+ITEMS[curMW].spellMult+'</div>';
    var mweaps=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='mWeapon';});
    if(!mweaps.length&&!curMW)h+='<div style="color:#445;font-size:10px">No magic weapons in inventory.</div>';
    mweaps.forEach(function(id){var it=ITEMS[id];if(!it)return;var i=inv.indexOf(id);h+=itemRow(id,i,"window._equipItem("+i+",'mWeapon');document.getElementById('quick-pick-popup').style.display='none'",'Equip');});
    if(curMW)h+='<div class="sp-row" onclick="window._unequipSlot(\'mWeapon\');document.getElementById(\'quick-pick-popup\').style.display=\'none\'" style="color:#ff8888;font-size:11px;margin-top:4px">Remove magic weapon</div>';

  } else if(type==='familiar'||type==='familiar2'||type==='familiar3'||type==='familiar4'){
    var fams=ps?ps.ownedFamiliars||[]:[];
    var slotsN=ps?_maxFamiliarSlots(ps):1;
    h+='<div style="font-size:9px;color:#667;margin:-4px 0 6px">'+slotsN+' of 4 active slot'+(slotsN>1?'s':'')+' open'+(slotsN<4?' (each Fairy King opens one more)':'')+' · click to add/remove · ⓘ for skills</div>';
    if(!fams.length)h+='<div style="color:#445;font-size:11px">No familiars yet.<br><span style="font-size:10px;color:#556">Each quadrant\'s familiar island (its first harbor) gives an elemental spirit.</span></div>';
    fams.forEach(function(fid){ h+=_familiarCardHTML(fid, ps, "_toggleFamiliar('"+fid+"');showQuickPick('familiar');showQuickPick('familiar')", true); });

  } else if(type==='special'){
    var curSpec=eq.special;
    var _cdrNow=(ws&&ws.calcPlayerStats)?ws.calcPlayerStats().cdReduce||0:0;
    function _effCd(baseCd){return (baseCd*(1-_cdrNow)).toFixed(1);}
    if(curSpec&&ITEMS[curSpec]){var _sc=ITEMS[curSpec];h+='<div style="color:#556;font-size:10px;margin-bottom:4px">Equipped: '+_sc.icon+' '+_sc.name+'<span style="color:#88aacc;margin-left:6px">CD: '+_effCd(_sc.cd)+'s'+(_cdrNow>0?' (-'+Math.round(_cdrNow*100)+'% CDR)':'')+'</span></div>';}
    var specs=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='special';});
    if(!specs.length){
      h+='<div style="color:#445;font-size:11px">No special abilities in inventory.<br>';
      h+='<span style="font-size:10px;color:#334">Free a master from an island castle to learn one.</span></div>';
    }
    specs.forEach(function(id){
      var it=ITEMS[id];if(!it)return;
      var cdLabel='CD: '+_effCd(it.cd)+'s';
      var isEq=(id===curSpec);
      h+='<div class="sp-row" style="'+(isEq?'border-color:rgba(100,200,255,.4);background:rgba(100,200,255,.06)':'')+'" onclick="window._equipItem('+inv.indexOf(id)+',\'special\');document.getElementById(\'quick-pick-popup\').style.display=\'none\'">'+
        '<span style="font-size:17px">'+ZIcon.of(it,1.5)+'</span>'+
        '<span style="flex:1;margin-left:7px;font-size:12px">'+it.name+'</span>'+
        '<span style="color:#88aacc;font-size:10px;margin-right:6px">'+cdLabel+'</span>'+
        '<button class="ir-equip" style="font-size:10px">'+(isEq?'Active':'Equip')+'</button></div>';
    });
    if(curSpec)h+='<div class="sp-row" onclick="window._unequipSlot(\'special\');document.getElementById(\'quick-pick-popup\').style.display=\'none\'" style="color:#ff8888;font-size:11px;margin-top:4px">🗑 Remove equipped special</div>';
  }

  pop.innerHTML=h;
  pop.style.display='block';
  // Auto-close after 6 seconds or on outside click
  clearTimeout(window._qpTimer);
  window._qpTimer=setTimeout(function(){pop.style.display='none';},6000);
}
document.addEventListener('click',function(e){
  var pop=document.getElementById('quick-pick-popup');
  var bar=document.getElementById('action-icon-bar');
  if(pop&&bar&&!bar.contains(e.target)&&!pop.contains(e.target))pop.style.display='none';
});

// ─── Extra sandbox functions ────────────────────────────────────────────
function sbAllItems(){
  var ws=_sbWs();if(!ws)return;
  var ps=ws.playerState;
  if(!ps.inventory)ps.inventory=[];
  // Give ALL 164+ items including skills, gems, food, spells
  Object.keys(ITEMS).forEach(function(k){ps.inventory.push(k);});
  updateInventoryModal(ps);ws._emitUI();
  showNotif('All items added to inventory!','#44ffaa');
  toggleModal('inventory');
}
function sbEnableAllItems(){
  Object.keys(ITEMS).forEach(function(k){ delete ITEMS[k].secReq; });
  showNotif('All items now available in shops!','#ffdd44');
}
function sbAllFood(){
  var ws=_sbWs();if(!ws)return;
  var ps=ws.playerState;
  if(!ps.inventory)ps.inventory=[];
  var foods=['bread','fish','meat','feast'];
  foods.forEach(function(f){ps.inventory.push(f);ps.inventory.push(f);});
  updateInventoryModal(ps);ws._emitUI();
  showNotif('All food added!','#44ffaa');
}
function sbAllMountsAndFamiliars(){
  var ws=_sbWs();if(!ws)return;
  var ps=ws.playerState;
  if(!ps.ownedMounts)ps.ownedMounts=[];
  if(!ps.ownedFamiliars)ps.ownedFamiliars=[];
  Object.keys(MOUNTS).forEach(function(k){if(!ps.ownedMounts.includes(k))ps.ownedMounts.push(k);});
  Object.keys(FAMILIARS).forEach(function(k){if(!ps.ownedFamiliars.includes(k))ps.ownedFamiliars.push(k);});
  ws._emitUI();
  showNotif('All mounts & familiars unlocked!','#44ffaa');
}


function openForgeModal(ps,worldScene){
  var invCounts={};
  (ps.inventory||[]).forEach(function(id){invCounts[id]=(invCounts[id]||0)+1;});
  var h='<p style="font-size:11px;color:#aa8833;margin-bottom:12px">Craft powerful weapons using base weapons, gems &amp; gold. Items are consumed.</p>';
  var tierNames=['','Tier 1 — Iron Sword Base','Tier 2 — Long Sword Base','Tier 3 — Great Sword Base','Tier 4 — Flame Blade Base','Ultimate'];
  var lastTier=0;
  CRAFT_RECIPES.forEach(function(recipe){
    if(recipe.tier!==lastTier){
      h+='<div style="font-size:9px;color:#776;text-transform:uppercase;letter-spacing:1px;margin:10px 0 5px;border-bottom:1px solid rgba(255,180,0,.15);padding-bottom:3px">'+tierNames[recipe.tier]+'</div>';
      lastTier=recipe.tier;
    }
    var item=ITEMS[recipe.result];if(!item)return;
    var matOk=true;
    var matsHtml='';
    Object.keys(recipe.needs).forEach(function(needId){
      var needCount=recipe.needs[needId];
      var haveCount=invCounts[needId]||0;
      var ok=haveCount>=needCount;
      if(!ok)matOk=false;
      var needItem=ITEMS[needId];
      var label=(needItem?needItem.icon+' '+needItem.name:'?')+(needCount>1?' x'+needCount:'');
      matsHtml+='<span class="forge-mat '+(ok?'have':'need')+'">'+label+' ('+haveCount+'/'+needCount+')</span>';
    });
    var goldOk=ps.gold>=recipe.gold;
    if(!goldOk)matOk=false;
    matsHtml+='<span class="forge-mat '+(goldOk?'have':'need')+'">'+recipe.gold+'g (have '+ps.gold+'g)</span>';
    var stat=item.atk?'+'+item.atk+' ATK':'';
    if(item.elementDmg&&item.element)stat+=' +'+item.elementDmg+' '+item.element+' dmg';
    h+='<div class="forge-recipe'+(matOk?' can-craft':'')+'">'
      +'<div class="fr-header"><span class="fr-icon">'+ZIcon.of(item,1.5)+'</span>'
      +'<span class="fr-name">'+item.name+'</span>'
      +'<span class="fr-tier">Tier '+recipe.tier+'</span></div>'
      +'<div class="fr-stats">'+stat+'</div>'
      +'<div class="fr-mats">'+matsHtml+'</div>'
      +'<button class="forge-btn '+(matOk?'':'disabled-btn')+'" '+(matOk?'':' disabled')
      +' onclick="window._craftItem(\''+(recipe.result)+'\')">⚒️ Craft</button>'
      +'<div style="clear:both"></div></div>';
  });
  h+='<p style="font-size:10px;color:#554;margin-top:8px">Gems drop from monsters and dungeons.</p>';
  document.getElementById('camp-title').textContent='⚒️ Blacksmith';
  document.getElementById('camp-content').innerHTML=h;
  toggleModal('camp');
}
window._craftItem=function(resultId){
  var ws=game.scene.getScene('World');if(!ws)return;
  var ps=ws.playerState;
  var recipe=null;
  for(var i=0;i<CRAFT_RECIPES.length;i++){if(CRAFT_RECIPES[i].result===resultId){recipe=CRAFT_RECIPES[i];break;}}
  if(!recipe)return;
  var inv=ps.inventory||[];
  var invCopy=inv.slice();
  var ok=true;
  Object.keys(recipe.needs).forEach(function(needId){
    var need=recipe.needs[needId];
    for(var n=0;n<need;n++){var idx=invCopy.indexOf(needId);if(idx===-1){ok=false;return;}invCopy.splice(idx,1);}
  });
  if(!ok||ps.gold<recipe.gold){showNotif('Missing materials!','#ff4444');return;}
  ps.inventory=invCopy;
  ps.gold-=recipe.gold;
  ps.inventory.push(resultId);
  var item=ITEMS[resultId];
  showNotif('⚒️ Crafted: '+item.icon+' '+item.name+'!','#ffcc44');
  ws._emitUI();
  openForgeModal(ps,ws);
};
// ─── Specialized Building Shops ────────────────────────────────────────
// Slot routing for each building type
var BUILDING_SLOTS={
  armory:   function(it){ return (it.slot==='lHand')||(it.slot==='rHand')||(it.slot==='shield')||(it.slot==='head')||(it.type==='ammo'); },
  clothing: function(it){ return it.slot==='feet'||it.slot==='pants'||it.slot==='gauntlets'||it.slot==='back'; },
  jeweler:  function(it){ return it.slot==='neck'||it.slot==='ring'||it.slot==='gem'; },
  apothecary: function(it){ return it.slot==='mWeapon'||it.slot==='use'; },   // specials: castle masters · spells: mage towers — neither is sold
  merchant: function(it){ return it.slot==='food'||it.slot==='body'; },
};
var BUILDING_TITLES={
  armory:'\u2694\uFE0F Armory \u2014 Weapons & Armor',
  clothing:'\U0001F9E5 Clothing \u2014 Apparel & Footwear',
  jeweler:'\U0001F48D Jeweler \u2014 Amulets, Rings & Gems',
  apothecary:'\U0001F52E Sorcerer\u2019s Apothecary \u2014 Spells & Potions',
  merchant:'\U0001F35E Merchant \u2014 Food & Supplies',
};
// Track merchant shop mode globally
var _merchantShopMode='buy'; // 'buy' or 'sell'
function openBuildingShop(btype,ps,worldScene){
  var filter=BUILDING_SLOTS[btype];if(!filter)return;
  var ul=ps.unlockedSections||[1];
  var maxSec=Math.max.apply(null,ul);
  var title=BUILDING_TITLES[btype]||btype;
  document.getElementById('camp-title').textContent=title;
  var h='';
  // Merchant gets a buy/sell toggle
  if(btype==='merchant'){
    var isBuy=(_merchantShopMode!=='sell');
    h+='<div style="display:flex;gap:8px;margin-bottom:12px">'
      +'<button onclick="window._merchantToggle(\'buy\')" style="flex:1;padding:6px;border-radius:6px;border:1px solid rgba(255,200,80,'+(isBuy?'0.7':'0.2')+');background:rgba(255,200,80,'+(isBuy?'0.2':'0.05')+');color:'+(isBuy?'#ffd700':'#888')+';cursor:pointer;font-size:12px">🛒 Buy</button>'
      +'<button onclick="window._merchantToggle(\'sell\')" style="flex:1;padding:6px;border-radius:6px;border:1px solid rgba(100,200,100,'+(isBuy?'0.2':'0.7')+');background:rgba(100,200,100,'+(isBuy?'0.05':'0.2')+');color:'+(isBuy?'#888':'#88ff88')+';cursor:pointer;font-size:12px">💰 Sell</button>'
      +'</div>';
  } else {
    h+='<p style="font-size:11px;color:#667;margin-bottom:12px">'+(btype==='jeweler'?'Gems can also be used at the Blacksmith for crafting.':'Availability expands as you unlock new regions.')+'</p>';
  }
  if(btype==='merchant'&&_merchantShopMode==='sell'){
    // ── Sell mode: show sellable inventory items ──
    var inv=ps.inventory||[];
    var SELLABLE=function(it){return it&&(it.slot==='lHand'||it.slot==='rHand'||it.slot==='mWeapon'||it.slot==='body'||it.slot==='head'||it.slot==='shield'||it.slot==='feet'||it.slot==='pants'||it.slot==='gauntlets'||it.slot==='back'||it.slot==='neck'||it.slot==='ring'||it.slot==='gem'||it.slot==='food'||it.slot==='use')&&it.sell;};   // learned skills (special) and spells (mage towers) can't be sold
    var sellableItems=inv.map(function(id,idx){return {id:id,idx:idx,it:ITEMS[id]};}).filter(function(e){return SELLABLE(e.it);});
    if(sellableItems.length===0){
      h+='<p style="color:#445;font-size:12px;padding:12px">Nothing to sell. Items with a sell value will appear here.</p>';
    } else {
      h+='<div class="item-list">';
      sellableItems.forEach(function(e){
        var it=e.it;var sellVal=it.sell||Math.floor((it.buy||10)*0.4);
        h+='<div class="shop-item"><div class="si-icon">'+ZIcon.of(it,1.5)+'</div>'
          +'<div class="si-info"><div class="si-name">'+it.name+'</div>'
          +'<div class="si-desc">Sell value: <span style="color:#ffd700">'+sellVal+'g</span></div></div>'
          +'<button class="si-buy" style="background:rgba(200,160,0,.2);border-color:rgba(200,160,0,.5);color:#ffd700" onclick="window._merchantSellItem('+e.idx+')">Sell</button>'
          +'</div>';
      });
      h+='</div>';
    }
    h+='<p style="font-size:10px;color:#445;margin-top:8px;text-align:center">You have <span style="color:#ffd700">'+ps.gold+'g</span></p>';
    document.getElementById('camp-content').innerHTML=h;
    toggleModal('camp');
    return;
  }
  // ── Buy mode (default for all shops) ──
  var found=false;
  Object.keys(ITEMS).forEach(function(id){
    var it=ITEMS[id];
    if(!filter(it))return;
    var reqSec=it.secReq||0;
    if(reqSec>maxSec){return;} // locked
    if(!it.buy&&it.slot!=='gem')return; // no buy price (tower rewards etc.)
    found=true;
    var canAfford=it.buy?ps.gold>=it.buy:false;
    var stat='';
    if(it.atk)stat='+'+it.atk+' ATK';
    if(it.def)stat+=(stat?' ':'')+('+ '+it.def+' DEF');
    if(it.heal)stat='Heals '+it.heal+' HP';
    if(it.goldVal)stat='Worth '+it.goldVal+'g';
    if(it.spdBonus)stat+=' +'+(it.spdBonus*100|0)+'% Spd';
    if(it.elementDmg)stat+=' +'+it.elementDmg+' '+it.element;
    var price=it.buy?it.buy+'g':it.goldVal?'Sell '+it.goldVal+'g':'—';
    h+='<div class="shop-item"><div class="si-icon">'+ZIcon.of(it,1.5)+'</div>'
      +'<div class="si-info"><div class="si-name">'+it.name+'</div>'
      +'<div class="si-desc">'+stat+' &nbsp;•&nbsp; '+price+'</div></div>';
    if(it.buy){
      h+='<button class="si-buy" '+(canAfford?'':' disabled')+' onclick="window._buyItem(\''+(id)+'\','+(it.buy)+')">'+(canAfford?'Buy':'No gold')+'</button>';
    } else if(it.goldVal){
      h+='<button class="si-buy" style="background:rgba(200,150,0,.2);border-color:rgba(200,150,0,.35);color:#ffcc44" onclick="window._sellGem(\''+(id)+'\')">Sell</button>';
    }
    h+='</div>';
  });
  if(!found)h+='<p style="color:#445;font-size:12px;padding:10px">Nothing available yet — unlock more sections!</p>';
  h+='<p style="font-size:10px;color:#445;margin-top:8px;text-align:center">You have <span style="color:#ffd700">'+ps.gold+'g</span></p>';
  document.getElementById('camp-content').innerHTML=h;
  toggleModal('camp');
}
window._merchantToggle=function(mode){
  _merchantShopMode=mode;
  var ws=game.scene.getScene('World');if(!ws)return;
  openBuildingShop('merchant',ws.playerState,ws);
};
window._merchantSellItem=function(idx){
  var ws=game.scene.getScene('World');if(!ws)return;
  var ps=ws.playerState;var inv=ps.inventory||[];
  var id=inv[idx];if(!id)return;
  var it=ITEMS[id];if(!it)return;
  var sellVal=it.sell||Math.floor((it.buy||10)*0.4);
  ps.gold+=sellVal;inv.splice(idx,1);
  showNotif('Sold '+it.icon+' '+it.name+' for '+sellVal+'g','#ffd700');
  ws._emitUI();openBuildingShop('merchant',ps,ws);
};
window._sellGem=function(id){
  var ws=game.scene.getScene('World');if(!ws)return;
  var ps=ws.playerState;var inv=ps.inventory;
  var idx=inv.indexOf(id);if(idx===-1)return;
  var it=ITEMS[id];if(!it||!it.goldVal)return;
  ps.gold+=it.goldVal;inv.splice(idx,1);
  showNotif('Sold '+it.icon+' '+it.name+' for '+it.goldVal+'g','#ffd700');
  ws._emitUI();closeModal('camp');
};

// ─── Special Skills as equippable items ──────────────────────────────────
// Skills are unlocked via progression; once in inventory they can be equipped
// to the special slot and activated with Z.
function openCampModal(site,ps,worldScene){
  document.getElementById('camp-title').textContent='⛺ Shop — Section '+site.section;
  var shopItems=[
    {id:'cup_empty',secReq:0},
    {id:'axe',secReq:0},
    {id:'potion',secReq:1},{id:'iron_sword',secReq:1},{id:'leather',secReq:1},{id:'wood_shield',secReq:1},
    {id:'elixir',secReq:3},{id:'long_sword',secReq:2},{id:'chain_mail',secReq:2},{id:'iron_shield',secReq:2},
    {id:'great_sword',secReq:3},{id:'plate_armor',secReq:3},
  ].filter(function(si){return si.secReq<=site.section;});
  var h='<p style="font-size:11px;color:#667;margin-bottom:12px">Trade your gold for equipment and supplies.</p>';
  shopItems.forEach(function(si){
    var item=ITEMS[si.id];if(!item||!item.buy)return;
    var canAfford=ps.gold>=item.buy;
    var stat=item.atk?'ATK +'+item.atk:item.def?'DEF +'+item.def:item.heal?'Heals '+item.heal+' HP':'';
    h+='<div class="shop-item"><div class="si-icon">'+ZIcon.of(item,1.5)+'</div><div class="si-info"><div class="si-name">'+item.name+'</div><div class="si-desc">'+stat+' &nbsp;•&nbsp; '+item.buy+'g</div></div><button class="si-buy" '+(canAfford?'':'disabled')+' onclick="window._buyItem(\''+si.id+'\','+item.buy+')">'+(canAfford?'Buy':'No gold')+'</button></div>';
  });
  // Sell wood logs
  var wood=ps.wood||0;
  if(wood>0){
    var wgold=wood*5;
    h+='<div class="shop-item" style="border-color:rgba(160,100,30,.35);background:rgba(80,50,10,.2)"><div class="si-icon">🪵</div><div class="si-info"><div class="si-name">Wood Logs</div><div class="si-desc">'+wood+' logs &nbsp;•&nbsp; 5g each = <span style="color:#ffd700">'+wgold+'g</span></div></div><button class="si-buy" style="background:rgba(100,70,10,.35);border-color:rgba(180,130,40,.5);color:#e8b840" onclick="window._sellWood()">Sell All</button></div>';
  }
  h+='<p style="font-size:10px;color:#445;margin-top:8px;text-align:center">You have <span style="color:#ffd700">'+ps.gold+'g</span>'+(wood>0?' &nbsp;|&nbsp; 🪵 '+wood+'/99':'')+'</p>';
  document.getElementById('camp-content').innerHTML=h;
  toggleModal('camp');
}
window._buyItem=function(id,cost){
  var ws=game.scene.getScene('World');if(!ws)return;
  var ps=ws.playerState;
  if(ps.gold<cost){showNotif('Not enough gold!','#ff4444');return;}
  var it=ITEMS[id];
  // Max 5 potions cap
  if(it&&it.slot==='use'){
    var potCount=(ps.inventory||[]).filter(function(pid){return ITEMS[pid]&&ITEMS[pid].slot==='use';}).length;
    if(potCount>=5){showNotif('Potion bag full! (5/5 max)','#ff8844');return;}
  }
  ps.gold-=cost;
  if(it&&it.type==='ammo'){
    // Ammo: add to ammo pool
    if(!ps.ammo)ps.ammo={};
    ps.ammo[id]=(ps.ammo[id]||0)+(it.qty||1);
    showNotif('Bought: '+it.icon+' '+it.name+' ×'+(it.qty||1),'#44ffaa');
  } else {
    if(!ps.inventory)ps.inventory=[];ps.inventory.push(id);
    showNotif('Bought: '+(it?it.icon:'')+' '+(it?it.name:id),'#44ffaa');
  }
  ws._emitUI();
  closeModal('camp');
};
window._sellWood=function(){
  var ws=game.scene.getScene('World');if(!ws)return;
  var ps=ws.playerState;
  var wood=ps.wood||0;
  if(wood<=0){showNotif('No wood to sell!','#ff4444');return;}
  var gold=wood*5;
  ps.gold+=gold;ps.wood=0;
  showNotif('Sold '+wood+'🪵 for '+gold+'g!','#ffd700');
  ws._emitUI();closeModal('camp');
};
window._buyAmmoQuick=function(id){
  var ws=game.scene.getScene('World');if(!ws)return;
  var ps=ws.playerState;
  var it=ITEMS[id];if(!it||!it.buy)return;
  if(ps.gold<it.buy){showNotif('Not enough gold!','#ff4444');return;}
  ps.gold-=it.buy;
  if(!ps.ammo)ps.ammo={};
  ps.ammo[id]=(ps.ammo[id]||0)+(it.qty||1);
  showNotif('Bought: '+it.icon+' '+it.name+' ×'+(it.qty||1),'#44ffaa');
  ws._emitUI();
  updateInventoryModal(ps);
};

function openMountsModal(ps,worldScene){ _renderMountsModal(ps); toggleModal('mounts'); }
function _renderMountsModal(ps){
  var h='<p style="font-size:11px;color:#667;margin-bottom:12px">Owned mounts. Click to ride; attacking makes you jump off — your mount waits where you left it.</p>';
  // A mount waiting somewhere in the world: call it back
  if(ps.parkedMount&&MOUNTS[ps.parkedMount.id]){
    var pm=MOUNTS[ps.parkedMount.id], ws0=_owScene(), dist=ws0&&ws0.player&&(ps.parkedMount.map||'world')===_mapKeyOf(ws0)?Math.round(Math.hypot(ws0.player.x-ps.parkedMount.x,ws0.player.y-ps.parkedMount.y)/TILE):0;
    h+='<div class="mount-row" style="background:rgba(120,200,255,.10);border:1px solid rgba(120,200,255,.4);margin-bottom:10px">'
      +'<div class="mr-icon">'+ZIcon.of(pm,1.5)+'</div>'
      +'<div class="mr-info"><div class="mr-name">Your '+pm.n+' is waiting</div>'
      +'<div class="mr-desc">'+(dist>1?dist+' steps away':'right beside you')+' — call it and it gallops to you</div></div>'
      +'<button class="mr-btn call-mount" style="background:rgba(120,200,255,.28);border-color:rgba(120,200,255,.6);color:#bfe6ff;font-weight:700" onclick="window._callMount()">📣 Call Mount!</button>'
      +'</div>';
  }
  // Active-mount dismount button — only shown when something is equipped.
  if(ps.mount){
    var cur=MOUNTS[ps.mount];
    var name=cur?cur.n:ps.mount;
    var icon=cur?cur.icon:'🐎';
    h+='<div class="mount-row" style="background:rgba(255,200,100,.10);border:1px solid rgba(255,200,100,.35);margin-bottom:10px">'
      +'<div class="mr-icon">'+icon+'</div>'
      +'<div class="mr-info"><div class="mr-name">Currently riding: '+name+'</div>'
      +'<div class="mr-desc">Press the button to get off</div></div>'
      +'<button class="mr-btn" style="background:rgba(255,140,80,.25);border-color:rgba(255,140,80,.5);color:#ffb088" onclick="window._dismount()">🚶 Dismount</button>'
      +'</div>';
  }
  if(!ps.ownedMounts||ps.ownedMounts.length===0){
    h+='<p style="font-size:12px;color:#445;padding:8px">No mounts yet — defeat dungeon bosses to earn them!</p>';
  } else {
    ps.ownedMounts.forEach(function(mid){
      var m=MOUNTS[mid];if(!m)return;
      var isActive=ps.mount===mid;
      h+='<div class="mount-row"><div class="mr-icon">'+ZIcon.of(m,1.5)+'</div><div class="mr-info"><div class="mr-name">'+m.n+'</div><div class="mr-desc">Speed x'+m.spdMult+' '+(m.canCross?' • Special terrain':'')+'</div></div><button class="mr-btn '+(isActive?'active':'')+'" onclick="window._equipMount(\''+mid+'\')">'+(isActive?'✓ Equipped':'Equip')+'</button></div>';
    });
  }
  document.getElementById('mounts-content').innerHTML=h;
}
window._dismount=function(){
  var ws=_owScene();if(!ws)return;
  var ps=ws.playerState;
  if(!ps.mount){showNotif('Already on foot!','#aaaaaa');return;}
  if(_inOverworld()&&ws._parkMount)ws._parkMount('manual'); else { ps.mount=null; showNotif('🚶 Dismounted','#aaccff'); }
  _renderMountsModal(ps);
  ws._emitUI();
};
window._equipMount=function(mid){
  var ws=_owScene();if(!ws)return;var ps=ws.playerState;
  if(ps.mount===mid){ window._dismount(); return; }
  if(ps.parkedMount&&ws._pmRemove){ ws._pmRemove(); ps.parkedMount=null; }
  ps.mount=mid;_renderMountsModal(ps);ws._emitUI();
};

function toggleModal(id){
  if(id==='tome'){ var te=document.getElementById('modal-tome'); if(te&&te.style.display!=='none')closeModal('tome'); else if(typeof Tome!=='undefined')Tome.open(); return; }
  var e=document.getElementById('modal-'+id);if(!e)return;
  var opening=e.style.display==='none';
  e.style.display=opening?'flex':'none';
  // Inventory hides the bottom action bars while open.
  if(id==='inventory'){ document.body.classList.toggle('bars-hidden', opening); }
  if(id==='mounts'&&opening){ var _mws=game.scene.getScene('World'); if(_mws&&_mws.playerState)_renderMountsModal(_mws.playerState); }
  // Force immediate minimap render when map opens
  if(id==='map'&&opening){ e.style.display='none'; openWorldMap(); }
}
function closeModal(id){var e=document.getElementById('modal-'+id);if(e)e.style.display='none';if(id==='tome')document.body.classList.remove('bars-hidden');if(id==='map'){ if(typeof WMAP!=='undefined')WMAP.travel=null; document.body.classList.remove('bars-hidden'); }if(id==='inventory')document.body.classList.remove('bars-hidden');}
function showNotif(msg,col){
  var a=document.getElementById('notif-area'),d=document.createElement('div');
  d.className='notif';d.style.color=col||'#ffffff';d.textContent=msg;a.appendChild(d);
  setTimeout(function(){d.style.transition='opacity .5s';d.style.opacity='0';setTimeout(function(){d.remove();},500);},2500);
}

