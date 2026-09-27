// ─── UI Bridge ──────────────────────────────────
function updateHUD(state){
  var hp=state.hp,maxHp=state.maxHp,gold=state.gold,level=state.level,xp=state.xp;
  var section=state.section,mount=state.mount,familiar=state.familiar,ul=state.unlockedSections;
  var hpPct=Math.min(100,hp/maxHp*100);
  document.getElementById('hp-bar').style.cssText='width:'+hpPct+'%;background:'+(hpPct>60?'#44ff88':hpPct>30?'#ffaa00':'#ff3322');
  document.getElementById('hp-val').textContent=hp+'/'+maxHp;
  var mana=state.mana!==undefined?Math.floor(state.mana):50;
  var maxMana=state.maxMana||50;
  var manaPct=Math.min(100,mana/maxMana*100);
  var manaBar=document.getElementById('mana-bar');
  var manaVal=document.getElementById('mana-val');
  if(manaBar)manaBar.style.width=manaPct+'%';
  if(manaVal)manaVal.textContent=mana+'/'+maxMana;
  document.getElementById('xp-bar').style.width=Math.min(100,xp/(level*100)*100)+'%';
  var lvCap=ul&&ul.length?((Math.max.apply(null,ul)>=4?20:Math.max.apply(null,ul)>=3?15:Math.max.apply(null,ul)>=2?10:5)):5;
  document.getElementById('lv-val').textContent='Lv '+level+'/'+lvCap;
  document.getElementById('gold-val').textContent=gold+'g';
  document.getElementById('region-name').textContent=SECTION_NAMES[section]||'Unknown';
  var dots='';
  for(var s=1;s<=4;s++){
    dots+='<span class="'+(ul&&ul.includes(s)?'rdot-on':'rdot-off')+'">'+(ul&&ul.includes(s)?'◉':'○')+'</span>';
  }
  document.getElementById('section-dots').innerHTML=dots;
  var comp=document.getElementById('comp-panel');
  if(mount||familiar){
    comp.style.display='flex';
    document.getElementById('mount-disp').textContent=mount?(MOUNTS[mount].icon+' '+MOUNTS[mount].n):'';
    document.getElementById('familiar-disp').textContent=familiar?(FAMILIARS[familiar].icon+' '+FAMILIARS[familiar].n):'';
  } else comp.style.display='none';
  // Update spell + magic weapon slots in action bar
  var eq=state.equip||{};
  var spellSlotEl=document.getElementById('action-spell-slot');
  if(spellSlotEl){
    var spItem=ITEMS[eq.spell];
    spellSlotEl.innerHTML='<div class="aib-key">X</div><div class="aib-ico">'+(spItem?spItem.icon:'✨')+'</div><div class="aib-lbl">'+(spItem?spItem.name.replace(/ Tome/,'').replace(/ Scroll/,'').substr(0,8):'Spell')+'</div>'
      +(spItem&&ITEMS[eq.mWeapon]?'<div style="font-size:8px;color:#bb88ff;margin-top:1px">×'+(ITEMS[eq.mWeapon].spellMult||1)+'</div>':'');
  }
}

function renderQuestList(unlockedSections,completed,active,scene){
  var c=document.getElementById('quest-list-container');if(!c)return;
  var h='';
  // Volcano Lord chain (global) — pinned at top once unlocked
  var psRef=scene&&scene.playerState;
  if(psRef && _finalQuestUnlocked(psRef)){
    var keysHeld=_volcanoKeysHeld(psRef);
    var keysDone=keysHeld>=4;
    var bossDone=psRef.completedQuests&&psRef.completedQuests.includes('volcano_lord');
    h+='<div class="qgrp" style="border:1px solid rgba(255,100,40,.45);background:rgba(60,18,10,.3);margin-bottom:14px">';
    h+='<div class="qgrp-hdr" style="color:#ff8844">🌋 The Volcano Lord '+(bossDone?'✓':'(Final Quest)')+'</div>';
    h+='<div class="qitem '+(keysDone?'qdone':'')+'"><div class="qico">🔑</div><div class="qinf">';
    h+='<div class="qtit">Find the four elemental keys '+(keysDone?'✓':'')+'</div>';
    h+='<div class="qdesc">Defeat all four mini-volcanoes to forge: Ember (N), Magma (E), Obsidian (S), Ashfire (W). <b>'+keysHeld+' / 4 collected.</b></div>';
    h+='</div></div>';
    h+='<div class="qitem '+(bossDone?'qdone':'')+'" style="opacity:'+(keysDone?1:.55)+'"><div class="qico">⚔️</div><div class="qinf">';
    h+='<div class="qtit">Defeat the Volcano Lord '+(bossDone?'✓':'')+'</div>';
    h+='<div class="qdesc">'+(keysDone?'Bring the 4 keys to the great volcano in the NW and unlock the door.':'Collect all 4 keys first.')+'</div>';
    h+='</div></div>';
    h+='</div>';
  }
  for(var sec=1;sec<=4;sec++){
    var ul=unlockedSections&&unlockedSections.includes(sec);
    h+='<div class="qgrp" style="'+(ul?'':'opacity:.4')+'"><div class="qgrp-hdr">Section '+sec+': '+SECTION_NAMES[sec]+' '+(ul?'':'🔒')+'</div>';
    if(ul){
      for(var type in MAIN_QUEST_DEFS){
        var def=MAIN_QUEST_DEFS[type];
        var key='s'+sec+'_'+type;
        var done=completed&&completed.includes(key);
        var isAct=active===key;
        h+='<div class="qitem '+(done?'qdone':'')+' '+(isAct?'qact':'')+'"><div class="qico">'+def.icon+'</div><div class="qinf"><div class="qtit">'+def.title+(done?' ✓':'')+'</div><div class="qdesc">'+def.desc+'</div></div>';
        if(!done&&!isAct)h+='<button class="qacc" onclick="window._acceptQuest(\''+key+'\')">Accept</button>';
        else if(isAct)h+='<span class="qbadge">ACTIVE</span>';
        h+='</div>';
      }
    }
    h+='</div>';
  }
  c.innerHTML=h;
}
window._acceptQuest=function(k){var ws=game.scene.getScene('World');if(ws)ws.acceptQuest(k);closeModal('quests');};

// Minimap: 1px-per-tile offscreen cache + display canvas overlay
var _mmCache=null,_mmCacheCtx=null,_mmLastExpVer=-1;

function _buildMinimapCache(wd,exploredGrid,expVer){
  if(!_mmCache){
    _mmCache=document.createElement('canvas');
    _mmCache.width=WORLD_W;_mmCache.height=WORLD_H;
    _mmCacheCtx=_mmCache.getContext('2d');
  }
  var img=_mmCacheCtx.createImageData(WORLD_W,WORLD_H);
  for(var ty=0;ty<WORLD_H;ty++){
    var row=wd.tiles[ty];
    for(var tx=0;tx<WORLD_W;tx++){
      var tileVal=row?row[tx]:T.OCEAN;
      var col=TILE_COLORS[tileVal];
      if(col===undefined)col=0x0a2060;
      var cellX=Math.floor(tx/EXP_SCALE),cellY=Math.floor(ty/EXP_SCALE);
      var explored=exploredGrid&&exploredGrid[cellY*EXP_W+cellX];
      var r,g,b;
      if(!explored){r=0x04;g=0x06;b=0x10;}
      else{r=(col>>16)&0xff;g=(col>>8)&0xff;b=col&0xff;}
      var idx=(ty*WORLD_W+tx)*4;
      img.data[idx]=r;img.data[idx+1]=g;img.data[idx+2]=b;img.data[idx+3]=255;
    }
  }
  _mmCacheCtx.putImageData(img,0,0);
  _mmLastExpVer=expVer;
}

// ─── Always-visible HUD Minimap ─────────────────────────────────────────────
function _drawMinimapHud(ws,dng){
  var cv=document.getElementById('minimap-hud-canvas');if(!cv)return;
  var ctx=cv.getContext('2d');
  var cw=cv.width,ch=cv.height;
  ctx.fillStyle='rgba(5,8,18,0.85)';ctx.fillRect(0,0,cw,ch);
  if(dng&&dng.dtiles&&dng._dngFogExplored){
    // ── Dungeon minimap ──
    var scaleX=cw/DW,scaleY=ch/DH;
    var fog=dng._dngFogExplored;
    var DCOL={0:'#1a1a2a',1:'#6a5040',2:'#00cc88',3:'#ff8844',4:'#ffcc44',5:'#ffaa44'};
    for(var ty=0;ty<DH;ty++){
      for(var tx=0;tx<DW;tx++){
        var idx=ty*DW+tx;
        if(!fog[idx]){ctx.fillStyle='#050810';ctx.fillRect(tx*scaleX,ty*scaleY,scaleX+.5,scaleY+.5);continue;}
        var tv=dng.dtiles[ty][tx];
        ctx.fillStyle=DCOL[tv]||'#3a2a18';
        ctx.fillRect(tx*scaleX,ty*scaleY,scaleX+.5,scaleY+.5);
      }
    }
    // Player dot
    var ppx=(dng.px/TILE)*scaleX,ppy=(dng.py/TILE)*scaleY;
    ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(ppx,ppy,2.5,0,Math.PI*2);ctx.fill();
  } else if(ws&&ws.wd&&ws.playerState&&ws.playerState.exploredGrid){
    // ── World minimap (scaled from cache) ──
    var ps=ws.playerState;
    var ver=ws._expVer||0;
    if(ver!==_mmLastExpVer||!_mmCache)_buildMinimapCache(ws.wd,ps.exploredGrid,ver);
    if(_mmCache){
      ctx.drawImage(_mmCache,0,0,WORLD_W,WORLD_H,0,0,cw,ch);
      // Player dot
      var wpx=(ws.player.x/TILE)*(cw/WORLD_W);
      var wpy=(ws.player.y/TILE)*(ch/WORLD_H);
      ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(wpx,wpy,2,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=1;ctx.stroke();
    }
  }
  // Border
  ctx.strokeStyle='rgba(255,255,255,.2)';ctx.lineWidth=1;ctx.strokeRect(.5,.5,cw-1,ch-1);
}

function renderMinimap(wd,player,unlockedSections,exploredGrid,expVer,activeQuest){
  var cv=document.getElementById('minimap-canvas');if(!cv||!wd)return;
  var mapModal=document.getElementById('modal-map');
  if(!mapModal||mapModal.style.display==='none')return;
  if(cv.width!==WORLD_W){cv.width=WORLD_W;cv.height=WORLD_H;}
  var ver=expVer||0;
  if(ver!==_mmLastExpVer||!_mmCache)_buildMinimapCache(wd,exploredGrid,ver);
  var ctx=cv.getContext('2d');
  ctx.drawImage(_mmCache,0,0);

  // ── Site markers ─────────────────────────────────────────────────────────
  var ul=unlockedSections||[1];
  var sc={dungeon:'#8844ff',tower:'#4488ff',camp:'#ffaa44',harbor:'#44aaff',skyport:'#44ffff'};
  // Site type icons for the quest marker
  var si={dungeon:'⚔',tower:'🗼',camp:'⛺',harbor:'⚓',skyport:'🎈'};
  if(wd.sites){
    wd.sites.forEach(function(s){
      if(!ul.includes(s.section))return;
      var sx=s.tx+1, sy=s.ty+1; // centre of the 3-tile site block
      var questKey='s'+s.section+'_'+s.type;
      var isQuest=activeQuest===questKey;

      if(isQuest){
        // ── Big glowing quest marker ────────────────────────────────────────
        // Outer glow ring
        ctx.save();
        ctx.globalAlpha=0.35;
        ctx.fillStyle=sc[s.type]||'#ffff00';
        ctx.beginPath();ctx.arc(sx,sy,13,0,Math.PI*2);ctx.fill();
        ctx.globalAlpha=1;
        // Filled circle
        ctx.fillStyle=sc[s.type]||'#ffff00';
        ctx.beginPath();ctx.arc(sx,sy,8,0,Math.PI*2);ctx.fill();
        // Bright yellow border
        ctx.strokeStyle='#ffff44';ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(sx,sy,8,0,Math.PI*2);ctx.stroke();
        // "!" text in centre
        ctx.fillStyle='#ffffff';
        ctx.font='bold 11px sans-serif';
        ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillText('!',sx,sy);
        ctx.restore();
        // Label below the marker: site type
        ctx.save();
        ctx.fillStyle='rgba(0,0,0,0.65)';
        ctx.fillRect(sx-18,sy+10,36,12);
        ctx.fillStyle='#ffff88';
        ctx.font='bold 9px sans-serif';
        ctx.textAlign='center';ctx.textBaseline='top';
        ctx.fillText((s.type.charAt(0).toUpperCase()+s.type.slice(1))+' S'+s.section,sx,sy+11);
        ctx.restore();
      } else {
        // ── Regular site: 5×5 dot ──────────────────────────────────────────
        ctx.fillStyle=sc[s.type]||'#fff';
        ctx.fillRect(sx-2,sy-2,5,5);
        // thin dark border for legibility
        ctx.strokeStyle='rgba(0,0,0,0.5)';ctx.lineWidth=0.5;
        ctx.strokeRect(sx-2,sy-2,5,5);
      }
    });
  }

  // ── Player dot ───────────────────────────────────────────────────────────
  if(player){
    var ppx=Math.round(player.x/TILE),ppy=Math.round(player.y/TILE);
    // outer ring
    ctx.save();
    ctx.globalAlpha=0.4;
    ctx.fillStyle='#ffffff';
    ctx.beginPath();ctx.arc(ppx,ppy,5,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
    // solid dot
    ctx.fillStyle='#00ffcc';
    ctx.beginPath();ctx.arc(ppx,ppy,3,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#003322';ctx.lineWidth=0.8;ctx.stroke();
    ctx.restore();
  }

  // ── Legend ───────────────────────────────────────────────────────────────
  var legend=[
    {col:'#8844ff',label:'Dungeon'},
    {col:'#4488ff',label:'Tower'},
    {col:'#ffaa44',label:'Camp'},
    {col:'#44ffff',label:'Harbor/Sky'},
    {col:'#00ffcc',label:'You'},
  ];
  var lx=6,ly=WORLD_H-6-legend.length*12;
  ctx.save();
  ctx.fillStyle='rgba(0,0,0,0.55)';
  ctx.fillRect(lx-2,ly-3,78,legend.length*12+6);
  legend.forEach(function(l,i){
    ctx.fillStyle=l.col;
    ctx.fillRect(lx,ly+i*12+1,8,8);
    ctx.fillStyle='#ccc';
    ctx.font='8px sans-serif';ctx.textAlign='left';ctx.textBaseline='top';
    ctx.fillText(l.label,lx+11,ly+i*12+1);
  });
  ctx.restore();
}

function updateInventoryModal(ps){
  if(!ps){var ws=game&&game.scene?game.scene.getScene('World'):null;if(!ws||!ws.playerState)return;ps=ws.playerState;}
  var inv=ps.inventory||[]; var eq=ps.equip||{}; var stats=calcStatsFromState(ps);
  var activeTab=window._invTab||'equip';
  var TABS=[{id:'equip',label:'Equipped'},{id:'weapons',label:'Weapons'},
    {id:'armor',label:'Armor'},{id:'accessories',label:'Accessories'},
    {id:'ammo',label:'🪃 Ammo'},{id:'food',label:'Food'},{id:'gems',label:'Gems'},{id:'potions',label:'Potions'}];
  var tbEl=document.getElementById('inv-tabs');
  if(tbEl)tbEl.innerHTML=TABS.map(function(t){
    return '<button class="inv-tab-btn'+(activeTab===t.id?' itab-active':'')+'" onclick="window._switchInvTab(\''+t.id+'\')">'+t.label+'</button>';
  }).join('');
  var ct=document.getElementById('inv-content'); if(!ct)return;
  var h='';
  var SLBL={lHand:'Melee',rHand:'Ranged',mWeapon:'Magic Weapon',body:'Body Armor',shield:'Shield',head:'Helmet',feet:'Boots',pants:'Pants',gauntlets:'Gauntlets',neck:'Amulet',back:'Cloak',spell:'Spell (X)',special:'Special (Z)'};
  var SICO={lHand:'⚔',rHand:'🏹',mWeapon:'🔮',body:'🛡',shield:'🛡️',head:'🪖',feet:'🥾',pants:'🦵',gauntlets:'🧤',neck:'🧿',back:'🧣',spell:'💫',special:'⚡'};
  function slotCard(sk){
    var iid=eq[sk],item=iid?ITEMS[iid]:null;
    var cf="window._openSlotPicker2('"+sk+"')" ;
    if(item){
      var st='';if(item.atk)st='+'+item.atk+' ATK';if(item.def)st+=(st?' ':'')+'+'+item.def+' DEF';
      return '<div class="pd-slot2 pd-filled" onclick="'+cf+'">'+'<div class="pd-label2">'+SLBL[sk]+'</div><div class="pd-icon2">'+item.icon+'</div><div class="pd-name2">'+item.name+'</div>'+(st?'<div class="pd-stat2">'+st+'</div>':'')+'</div>';
    }else{
      return '<div class="pd-slot2 pd-empty2" onclick="'+cf+'">'+'<div class="pd-label2">'+SLBL[sk]+'</div><div class="pd-icon2" style="font-size:15px;opacity:.3">'+( SICO[sk]||'?')+'</div><div style="font-size:8px;color:#446;margin-top:2px">empty</div></div>';
    }
  }
  if(activeTab==='equip'){
    var GRID=[['back','head',null],[null,'body','shield'],['gauntlets',null,'rHand'],[null,'pants','neck'],['feet','special','lHand'],['spell',null,'mWeapon']];
    h+='<div class="pd-body-wrap"><div class="pd-body-col">';
    h+='<div class="pd-body-grid">';
    GRID.forEach(function(row){row.forEach(function(sk){h+=sk?slotCard(sk):'<div class="pd-blank"></div>';});});
    h+='</div>';
    h+='<div class="inv-stats-row">'
      +'<div class="stat-row"><span>Level</span><span class="sv">'+ps.level+'</span></div>'
      +'<div class="stat-row"><span>HP</span><span class="sv">'+ps.hp+'/'+ps.maxHp+'</span></div>'
      +'<div class="stat-row"><span>Gold</span><span class="sv">'+ps.gold+'g</span></div>'
      +'<div class="stat-row"><span>ATK</span><span class="sv">'+stats.atk+'</span></div>'
      +'<div class="stat-row"><span>DEF</span><span class="sv">'+stats.def+'</span></div>'
      +'<div class="stat-row"><span>Mana</span><span class="sv">'+(Math.floor(ps.mana||0))+'/'+ps.maxMana+'</span></div>'
      +(stats.manaRegen>0?'<div class="stat-row"><span>MP Regen</span><span class="sv">'+(4+stats.manaRegen).toFixed(1)+'/s</span></div>':'')
      +(stats.cdReduce>0?'<div class="stat-row"><span>Cooldown</span><span class="sv">-'+Math.round(stats.cdReduce*100)+'%</span></div>':'')
      +(stats.spdBonus>0?'<div class="stat-row"><span>Speed</span><span class="sv">+'+(Math.round(stats.spdBonus*100))+'%</span></div>':'')
      +'<div class="stat-row"><span>XP</span><span class="sv">'+ps.xp+'/ '+(ps.level*100)+'</span></div>'
      +'</div>';
    // Active slots
    h+='<div style="font-size:9px;color:#557;text-transform:uppercase;letter-spacing:.5px;margin-top:10px;margin-bottom:5px">Active Slots</div>';
    h+='<div class="pd-active-row">';
    var _spIt=(ps.equip&&ps.equip.special)?ITEMS[ps.equip.special]:null;
    var sk2Name=_spIt?_spIt.name:'none';
    var sk2Icon=_spIt?_spIt.icon:'⚡';
    h+='<div class="pd-active-slot'+(sk2Name!=='none'?' pd-active-filled':'')+'" onclick="showQuickPick(\'special\')">'+'<div class="pd-label2">Special</div><div class="pd-icon2">'+sk2Icon+'</div><div style="font-size:8px;color:'+(sk2Name!=='none'?'#aaddff':'#446')+';margin-top:2px">'+sk2Name+'</div></div>';
    var mnt=ps.mount?MOUNTS[ps.mount]:null;
    h+='<div class="pd-active-slot'+(mnt?' pd-active-filled':'')+'" onclick="toggleModal(\'mounts\')">'+'<div class="pd-label2">Mount</div><div class="pd-icon2">'+(mnt?mnt.icon:'🐎')+'</div><div style="font-size:8px;color:'+(mnt?'#aaddff':'#446')+';margin-top:2px">'+(mnt?mnt.n:'none')+'</div></div>';
    var fam=ps.familiar?FAMILIARS[ps.familiar]:null;
    h+='<div class="pd-active-slot'+(fam?' pd-active-filled':'')+'" onclick="showQuickPick(\'familiar\')">'+'<div class="pd-label2">Familiar</div><div class="pd-icon2">'+(fam?fam.icon:'🐾')+'</div><div style="font-size:8px;color:'+(fam?'#aaddff':'#446')+';margin-top:2px">'+(fam?fam.n:'none')+'</div></div>';
    var potIdx=inv.findIndex(function(id){return ITEMS[id]&&ITEMS[id].slot==='use';});
    var pot=potIdx>=0?ITEMS[inv[potIdx]]:null;
    h+='<div class="pd-active-slot'+(pot?' pd-active-filled':'')+'" onclick="showQuickPick(\'potion\')">'+'<div class="pd-label2">Potion (P)</div><div class="pd-icon2">'+(pot?pot.icon:'🧪')+'</div><div style="font-size:8px;color:'+(pot?'#44eeff':'#446')+';margin-top:2px">'+(pot?pot.name:'none')+'</div></div>';
    var foodIdx=inv.findIndex(function(id){return ITEMS[id]&&ITEMS[id].slot==='food';});
    var fd2=foodIdx>=0?ITEMS[inv[foodIdx]]:null;
    h+='<div class="pd-active-slot'+(fd2?' pd-active-filled':'')+'" onclick="showQuickPick(\'food\')">'+'<div class="pd-label2">Food (O)</div><div class="pd-icon2">'+(fd2?fd2.icon:'🍞')+'</div><div style="font-size:8px;color:'+(fd2?'#44eeff':'#446')+';margin-top:2px">'+(fd2?fd2.name:'none')+'</div></div>';
    h+='</div></div>'; // /pd-active-row /pd-body-col
    // Rings column
    h+='<div class="pd-ring-col"><div class="pd-ring-col-title">💍 Rings</div>';
    for(var ri=1;ri<=10;ri++){
      var rk='ring'+ri,rid=eq[rk],ritem=rid?ITEMS[rid]:null;
      var rc="window._openSlotPicker2('"+rk+"')" ;
      if(ritem){
        var rst='';if(ritem.atk)rst='+'+ritem.atk+' ATK';if(ritem.def)rst+=(rst?' ':'')+('+ '+ritem.def+' DEF');
        h+='<div class="pd-ring-slot pd-ring-filled" onclick="'+rc+'"><span class="pr-icon">'+(ritem.icon)+'</span><span class="pr-name">'+(ritem.name)+'</span>'+(rst?'<span class="pr-stat">'+rst+'</span>':'')+ '</div>';
      }else{ h+='<div class="pd-ring-slot" onclick="'+rc+'"><span class="pr-icon" style="opacity:.28">💍</span><span class="pr-name" style="color:#445">Ring '+ri+'</span></div>';
      }
    }
    h+='<div style="margin-top:8px;font-size:9px;color:#446;text-align:center">2 rings per Tower reward</div>';
    h+='</div></div>'; // /pd-ring-col /pd-body-wrap
  }else if(activeTab==='weapons'){
    function wRow(id){var it=ITEMS[id];if(!it)return'';var i=inv.indexOf(id);var st=it.atk?'+'+it.atk+' ATK':'';if(it.elementDmg)st+=' +'+it.elementDmg+' '+it.element;if(it.spellMult)st+=' ×'+it.spellMult+' spell';return'<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">'+st+'</span><button class="ir-equip" onclick="window._equipItem('+i+',\''+it.slot+'\')">Equip</button></div>';}
    var ml=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='lHand';}),rl=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='rHand';}),mgw=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='mWeapon';});
    h+='<div class="wep-section-title">⚔ Melee Weapons</div>';
    h+=ml.length?'<div class="item-list">'+ml.map(wRow).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">None in inventory</p>';
    h+='<div class="wep-section-title">🏹 Ranged Weapons</div>';
    h+=rl.length?'<div class="item-list">'+rl.map(wRow).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">None in inventory</p>';
    h+='<div class="wep-section-title">🔮 Magic Weapons (Staff/Wand)</div>';
    h+=mgw.length?'<div class="item-list">'+mgw.map(wRow).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">None in inventory</p>';
  }else if(activeTab==='armor'){
    var ASEC=[{slot:'body',lbl:'Body Armor'},{slot:'shield',lbl:'Shields'},{slot:'head',lbl:'Helmets'},{slot:'gauntlets',lbl:'Gauntlets'},{slot:'pants',lbl:'Pants'},{slot:'feet',lbl:'Boots'},{slot:'back',lbl:'Cloaks'}];
    var any=false;
    ASEC.forEach(function(s){var it2=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot===s.slot;});if(!it2.length)return;any=true;h+='<div class="wep-section-title">'+s.lbl+'</div><div class="item-list">';it2.forEach(function(id){var it=ITEMS[id];if(!it)return;var i=inv.indexOf(id);var st=it.def?'+'+it.def+' DEF':'';if(it.spdBonus)st+=' +'+(it.spdBonus*100|0)+'% Spd';if(it.atk)st+=' +'+it.atk+' ATK';if(it.cdReduce)st+=' -'+(it.cdReduce*100|0)+'%CD';if(it.manaRegen)st+=' +'+it.manaRegen+'mp/s';if(it.maxMana)st+=' +'+it.maxMana+'MP';h+='<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">'+st+'</span><button class="ir-equip" onclick="window._equipItem('+i+',\''+s.slot+'\')">Equip</button></div>';});h+='</div>';});
    if(!any)h='<p style="color:#445;font-size:12px;padding:12px">No armor in inventory</p>';
  }else if(activeTab==='accessories'){
    function accRow(id,slotKey){var it=ITEMS[id];if(!it)return'';var i=inv.indexOf(id);var st='';if(it.atk)st='+'+it.atk+' ATK';if(it.def)st+=(st?' ':'')+'+'+it.def+' DEF';if(it.spdBonus)st+=(st?' ':'')+'+'+((it.spdBonus*100)|0)+'% Spd';if(it.cdReduce)st+=(st?' ':'')+'-'+((it.cdReduce*100)|0)+'%CD';if(it.manaRegen)st+=(st?' ':'')+'+'+it.manaRegen+'mp/s';if(it.maxMana)st+=(st?' ':'')+'+'+it.maxMana+'MP';return'<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">'+st+'</span><button class="ir-equip" onclick="window._equipItem('+i+',\''+slotKey+'\')">Equip</button></div>';}
    var rings=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='ring';}),amults=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='neck';}),spells=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='spell';});
    h+='<div class="wep-section-title">💍 Rings</div>';h+=rings.length?'<div class="item-list">'+rings.map(function(id){return accRow(id,'ring');}).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">No rings in inventory</p>';
    h+='<div class="wep-section-title">🧿 Amulets</div>';h+=amults.length?'<div class="item-list">'+amults.map(function(id){return accRow(id,'neck');}).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">No amulets in inventory</p>';
    h+='<div class="wep-section-title">💫 Spells</div>';h+=spells.length?'<div class="item-list">'+spells.map(function(id){return accRow(id,'spell');}).join('')+'</div>':'<p style="color:#445;font-size:11px;padding:6px">No spells in inventory</p>';
  }else if(activeTab==='ammo'){
    h+='<div class="wep-section-title">🏹 Arrows &amp; 🪃 Darts</div>';
    h+='<div class="item-list">';
    var ammoObj=ps.ammo||{};
    var ammoIds=['arrow_normal','arrow_cold','arrow_fire','arrow_heat','dart_normal','dart_cold','dart_fire','dart_heat'];
    var anyAmmo=false;
    ammoIds.forEach(function(aid){
      var it=ITEMS[aid];if(!it)return;
      var qty=ammoObj[aid]||0;
      anyAmmo=true;
      h+='<div class="item-row"><span class="ir-icon">'+it.icon+'</span>'
        +'<span class="ir-name">'+it.name+'</span>'
        +'<span class="ir-stat" style="color:'+(qty>0?'#88ccff':'#445')+'">× '+qty+'</span>'
        +'<span class="ir-stat" style="color:#445;font-size:9px">'+it.desc+'</span>'
        +'</div>';
    });
    if(!anyAmmo)h+='<p style="color:#445;font-size:11px;padding:8px">No ammo items defined yet.</p>';
    h+='</div>';
    h+='<p style="font-size:10px;color:#556;margin-top:8px">Arrows require a bow. Darts require a crossbow. Buy ammo at the Armory.</p>';
  }else if(activeTab==='food'){
    var fd=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='food';});
    h=fd.length?'<div class="item-list">'+fd.map(function(id){var it=ITEMS[id];return'<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">Restores '+it.heal+' HP</span><button class="ir-equip" style="color:#44eeff" onclick="window._useItem('+inv.indexOf(id)+')">Eat</button></div>';}).join('')+'</div>':'<p style="color:#445;font-size:12px;padding:12px">No food in inventory</p>';
  }else if(activeTab==='gems'){
    var gm=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='gem';});
    h=gm.length?'<div class="item-list">'+gm.map(function(id){var it=ITEMS[id];return'<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">'+it.desc+'</span></div>';}).join('')+'</div>':'<p style="color:#445;font-size:12px;padding:12px">No gems in inventory<br><small style="color:#334">Tip: use gems at the Blacksmith to craft elemental weapons. Sell them at the Jeweler or Merchant.</small></p>';
  }else if(activeTab==='potions'){
    var pt=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='use';});
    h=pt.length?'<div class="item-list">'+pt.map(function(id){var it=ITEMS[id];return'<div class="item-row"><span class="ir-icon">'+it.icon+'</span><span class="ir-name">'+it.name+'</span><span class="ir-stat">Heals '+it.heal+' HP</span><button class="ir-equip" style="color:#44eeff" onclick="window._useItem('+inv.indexOf(id)+')">Use (P)</button></div>';}).join('')+'</div>':'<p style="color:#445;font-size:12px;padding:12px">No potions in inventory</p>';
  }else if(activeTab==='artifacts'){
    h='<div style="padding:20px;text-align:center;color:#557"><div style="font-size:28px;margin-bottom:10px">✨</div><div style="font-size:13px">Artifacts coming soon…</div><div style="font-size:10px;color:#334;margin-top:6px">Powerful passive items unlocked via special quests.</div></div>';
  }else if(activeTab==='skills'){
    var skItems=inv.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='special';});
    var curSk=eq.special?ITEMS[eq.special]:null;
    if(curSk){
      h+='<div style="background:rgba(0,200,80,.08);border:1px solid rgba(0,200,80,.3);border-radius:8px;padding:10px 12px;margin-bottom:10px;display:flex;align-items:center;gap:10px">';
      h+='<span style="font-size:22px">'+curSk.icon+'</span>';
      h+='<div style="flex:1"><div style="font-size:12px;font-weight:700;color:#aee">'+curSk.name+' <span style="font-size:9px;color:#556">(press Z to activate)</span></div>';
      h+='<div style="font-size:10px;color:#446;margin-top:2px">'+(curSk.desc||'')+"</div></div>";
      h+='<button class="ir-equip" style="background:rgba(200,80,80,.15);border-color:rgba(200,80,80,.4);color:#ff8888" onclick="window._unequipSlot(\x27special\x27)">Remove</button></div>';
    }
    if(!skItems.length&&!curSk){
      h+='<p style="color:#445;font-size:12px;padding:12px">No skills yet. Use sandbox \'Give All Items\' or find skill books in dungeons.</p>';
    }else{
      h+='<div class="item-list">';
      skItems.forEach(function(id){
        var it=ITEMS[id];if(!it)return;var idx=inv.indexOf(id);var isEq=eq.special===id;
        h+='<div class="item-row" style="'+(isEq?'border-color:rgba(100,200,100,.4);background:rgba(0,200,80,.06)':'')+'"><span class="ir-icon">'+it.icon+'</span><div style="flex:1"><div class="ir-name">'+it.name+(isEq?' <span style="color:#44ffaa;font-size:9px">(active)</span>':'')+"</div><div class='ir-stat' style='text-align:left;margin-top:2px'>"+(it.desc||'')+"</div></div>"+(isEq?"":"<button class='ir-equip' onclick='window._equipItem("+idx+",'special')'>Equip</button>")+"</div>";
      });
      h+='</div>';
    }
  }
  // ── Familiars footer (always shown at bottom of inventory) ───────────
  var ownedFams=ps.ownedFamiliars||[];
  if(ownedFams.length){
    h+='<div style="margin-top:18px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08)">';
    h+='<div style="font-size:12px;font-weight:600;color:#aaccff;margin-bottom:8px">🐾 Familiars <span style="font-size:9px;color:#667;font-weight:400">— click for details · N to equip</span></div>';
    ownedFams.forEach(function(fid){ h+=_familiarCardHTML(fid, ps, "showFamiliarInfo('"+fid+"')"); });
    h+='</div>';
  }
  ct.innerHTML=h;
}

function switchInvTab(tab){
  window._invTab=tab;
  var ws=game&&game.scene?game.scene.getScene('World'):null;
  if(ws&&ws.playerState)updateInventoryModal(ws.playerState);
}
window._switchInvTab=switchInvTab;


function clickEquipSlot(slot){
  document.getElementById('slot-picker-modal').style.display='flex';
  window.selectedSlot=slot;
  var ps=getWorldScene().playerState,items=ITEMS,grid=document.getElementById('slot-picker-grid');
  grid.innerHTML='';
  for(var k in items){
    var it=items[k];
    if(it.slot===slot&&ps.inventory.indexOf(k)>=0){
      var btn=document.createElement('button');
      btn.className='abtn';
      btn.style.padding='10px';
      btn.textContent=it.icon+' '+it.name;
      btn.onclick=function(){equipItem(k,slot);};
      grid.appendChild(btn);
    }
  }
}

function equipItem(item,slot){
  var ps=getWorldScene().playerState;
  ps.equip[slot]=item;
  document.getElementById('slot-picker-modal').style.display='none';
  updateInventoryModal();
}


function calcStatsFromState(ps){
  var eq=ps.equip||{};
  function ia(k){return eq[k]&&ITEMS[eq[k]]?ITEMS[eq[k]]:null;}
  var allSlots=['lHand','rHand','mWeapon','body','shield','head','feet','pants','gauntlets','neck','back','spell'];
  for(var _i=1;_i<=10;_i++)allSlots.push('ring'+_i);
  // Melee ATK = base (which already includes level bumps) + sword (lHand) +
  // non-weapon-slot ATK bonuses. Bow (rHand), magic weapon (mWeapon) and
  // spell slots are EXCLUDED — they have their own combat formulas.
  var _atkExclude={rHand:1,mWeapon:1,spell:1};
  var atk=(ps.atk||3)+allSlots.reduce(function(s,k){return s+(_atkExclude[k]?0:(ia(k)?ia(k).atk||0:0));},0);
  var dSlots=['body','shield','head','feet','pants','gauntlets','neck','back'];
  for(var _i=1;_i<=10;_i++)dSlots.push('ring'+_i);
  var def=(ps.def||0)+dSlots.reduce(function(s,k){return s+(ia(k)?ia(k).def||0:0);},0);
  var spd=allSlots.reduce(function(s,k){return s+(ia(k)?ia(k).spdBonus||0:0);},0);
  return{atk:atk,def:def,spdBonus:spd};
}
window._equipItem=function(idx,slot){
  var ws=game.scene.getScene('World');if(!ws)return;
  var ps=ws.playerState;
  var id=ps.inventory[idx];if(!id)return;
  var eqSlot=slot;
  if(slot==='ring'){for(var _ri=1;_ri<=10;_ri++){if(!ps.equip['ring'+_ri]){eqSlot='ring'+_ri;break;}}}
  var old=ps.equip[eqSlot];
  ps.equip[eqSlot]=id;ps.inventory.splice(idx,1);
  if(old)ps.inventory.push(old);
  updateInventoryModal(ps);ws._emitUI();
};
window._unequipSlot=function(slot){
  var ws=game&&game.scene?game.scene.getScene('World'):null;if(!ws)return;
  var ps=ws.playerState;if(!ps)return;
  var id=ps.equip[slot];
  if(!id)return;
  ps.equip[slot]=null;
  ps.inventory.push(id);
  updateInventoryModal(ps);ws._emitUI();
};
