// ═══════════════════════════════════════════════════════════════════════
// ║ 22c-inventory.js — the inventory, rebuilt (round 35; Kris: "hero + gear slots + item grid").
// ║ Left: the hero's painted figure (idle animation) on a rune dais, with his gear in slots round him, the active
// ║ slots, the rings and his numbers. Right: filter tabs, a grid of item tiles (same items stack with a count), and a
// ║ detail panel for the selected thing: what it does, how it compares with what is worn, and the buttons.
// ║ Nothing about items, slots or saves changes: the buttons call the same functions as before
// ║ (window._equipItem / _unequipSlot / _useItem, showQuickPick, toggleModal). This file's updateInventoryModal replaces the
// ║ one in 21-ui.js (it comes later in the page), and it takes over the old slot picker and tab switch.
// ║ Click a tile or a slot to select it; double-click (or Enter) does its main action.
// ═══════════════════════════════════════════════════════════════════════
var ZINV={filter:'all',sel:null,timer:null,
  SLOT_NAME:{lHand:'Melee weapon',rHand:'Ranged weapon',mWeapon:'Magic weapon',body:'Body armor',shield:'Shield',head:'Helmet',feet:'Boots',pants:'Leg armor',gauntlets:'Gauntlets',neck:'Amulet',back:'Cloak',spell:'Spell (X)',special:'Special attack (Z)',ring:'Ring'},
  SLOT_FB:{lHand:'⚔',rHand:'🏹',mWeapon:'🔮',body:'🛡',shield:'🛡️',head:'🪖',feet:'🥾',pants:'🦵',gauntlets:'🧤',neck:'🧿',back:'🧣',spell:'💫',special:'⚡',ring:'💍'},
  LEFT:['head','body','gauntlets','pants','feet'], RIGHT:['back','neck','shield','lHand','rHand'], LOW:['mWeapon','spell','special'],
  TABS:[['all','All','tab_all','🎒',null],['weapons','Weapons','tab_weapons','⚔️',['lHand','rHand','mWeapon']],['armor','Armor','tab_armor','🛡️',['body','shield','head','feet','pants','gauntlets']],
    ['accessories','Accessories','tab_accessories','💍',['neck','back','ring']],['ammo','Ammo','tab_ammo','🏹',['ammo']],['food','Food','tab_food','🍖',['food']],['potions','Potions','tab_potions','🧪',['use']],
    ['gems','Treasure','tab_gems','💎',['gem','key','material','misc']],['magic','Spells & skills','ui_spell','✨',['spell','special']]],
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  slotOf:function(it){ return it&&(it.slot||it.type)||'misc'; },
  // what an item does, as short coloured chips
  stats:function(it){ if(!it)return []; var L=[]; if(it.atk)L.push(['+'+it.atk+' ATK','a']); if(it.def)L.push(['+'+it.def+' DEF','d']); if(it.heal)L.push(['+'+it.heal+' HP','h']); if(it.elementDmg)L.push(['+'+it.elementDmg+' '+(it.element||''),'e']);
    if(it.spellMult)L.push(['spells ×'+it.spellMult,'e']); if(it.spdBonus)L.push(['+'+Math.round(it.spdBonus*100)+'% speed','s']); if(it.cdReduce)L.push(['−'+Math.round(it.cdReduce*100)+'% cooldown','s']); if(it.manaRegen)L.push(['+'+it.manaRegen+' mana/s','s']); return L; },
  // is the item's description only its numbers again? (then the chips say it all)
  plain:function(it){ var d=String(it.desc||'').replace(/[\s,]/g,'').toLowerCase(), c=ZINV.stats(it).map(function(x){ return x[0]; }).join('').replace(/[\s,]/g,'').toLowerCase(); return !d||d===c||(d.length<=c.length+2&&/^[+\-−×\d%.a-z]*$/.test(d)&&!/[a-z]{6,}/.test(d)); },
  chips:function(it){ return ZINV.stats(it).map(function(c){ return '<span class="zv-chip '+c[1]+'">'+c[0]+'</span>'; }).join(''); },
  // one slot tile round the hero
  slot:function(ps,sk,small){ var id=(ps.equip||{})[sk], it=id&&ITEMS[id], base=sk.indexOf('ring')===0?'ring':sk, on=ZINV.sel&&ZINV.sel.k==='eq'&&ZINV.sel.slot===sk, nm=ZINV.SLOT_NAME[base]+(base==='ring'?' '+sk.slice(4):'');
    return '<div class="zv-slot'+(small?' sm':'')+(it?' full':'')+(on?' on':'')+'" data-tip="'+(it?it.name+' — ':'')+nm+(it?'':' (empty)')+'" onclick="ZINV.pickSlot(\''+sk+'\')" ondblclick="ZINV.actSlot(\''+sk+'\')">'+
      (it?ZIcon.item(id,small?1.9:2.6)+(typeof ZElUI!=='undefined'?ZElUI.pips(it):''):ZIcon.html('sl_'+base,ZINV.SLOT_FB[base],small?1.7:2.3,'zv-empty'))+'</div>'; },
  quick:function(tip,html,on,click){ return '<div class="zv-slot sm'+(on?' full':'')+'" data-tip="'+tip+'" onclick="'+click+'">'+html+'</div>'; },
  render:function(ps){ var W=ZINV.ws(); if(!ps){ if(!W||!W.playerState)return; ps=W.playerState; } var inv=ps.inventory||[], eq=ps.equip||{}, st=calcStatsFromState(ps), F=ZINV.filter;
    var tb=document.getElementById('inv-tabs'), ct=document.getElementById('inv-content'); if(!ct)return; if(tb){ tb.innerHTML=''; tb.style.display='none'; }
    // ── left: the hero and his gear ──
    var h='<div class="zv"><div class="zv-left"><div class="zv-doll"><div class="zv-col">'+ZINV.LEFT.map(function(s){ return ZINV.slot(ps,s); }).join('')+'</div>'+
      '<div class="zv-hero"><div class="zv-dais">'+ZIcon.html('rn_circle','',11)+'</div><canvas id="zv-hero-cv" width="260" height="300"></canvas><div class="zv-lv">Level '+ps.level+'</div></div>'+
      '<div class="zv-col">'+ZINV.RIGHT.map(function(s){ return ZINV.slot(ps,s); }).join('')+'</div></div>';
    var mnt=ps.mount&&MOUNTS[ps.mount], fam=ps.familiar&&FAMILIARS[ps.familiar], pot=inv.filter(function(i){ return ITEMS[i]&&ITEMS[i].slot==='use'; })[0], fd=inv.filter(function(i){ return ITEMS[i]&&ITEMS[i].slot==='food'; })[0];
    h+='<div class="zv-row">'+ZINV.LOW.map(function(s){ return ZINV.slot(ps,s,true); }).join('')+'<span class="zv-gap"></span>'+
      ZINV.quick('Mount'+(mnt?' — '+mnt.n:' (none)')+' [M]',mnt?ZIcon.of(mnt,1.7):ZIcon.html('ui_mount','🐎',1.7,'zv-empty'),!!mnt,'toggleModal(\'mounts\')')+
      ZINV.quick('Familiar'+(fam?' — '+fam.n:' (none)')+' [N]',fam?ZIcon.of(fam,1.7):ZIcon.html('ui_familiar','🐾',1.7,'zv-empty'),!!fam,'showQuickPick(\'familiar\')')+
      ZINV.quick('Potion'+(pot?' — '+ITEMS[pot].name:' (none)')+' [P]',pot?ZIcon.item(pot,1.9):ZIcon.html('ui_potion','🧪',1.7,'zv-empty'),!!pot,'showQuickPick(\'potion\')')+
      ZINV.quick('Food'+(fd?' — '+ITEMS[fd].name:' (none)')+' [O]',fd?ZIcon.item(fd,1.9):ZIcon.html('ui_food','🍞',1.7,'zv-empty'),!!fd,'showQuickPick(\'food\')')+'</div>';
    h+='<div class="zv-rings">'; for(var r=1;r<=10;r++)h+=ZINV.slot(ps,'ring'+r,true); h+='</div>';
    var S=function(ico,fb,lbl,val){ return '<div class="zv-st">'+ZIcon.html(ico,fb,1.25)+'<span>'+lbl+'</span><b>'+val+'</b></div>'; };
    h+='<div class="zv-stats">'+S('ui_heart','❤️','Health',ps.hp+' / '+ps.maxHp)+S('ui_mana','💧','Mana',Math.floor(ps.mana||0)+' / '+ps.maxMana)+S('ui_attack','⚔️','Attack',st.atk)+S('ui_defend','🛡️','Defense',st.def)+S('ui_gold','💰','Gold',ps.gold)+S('ui_xp','⭐','Experience',ps.xp+' / '+(ps.level*100))+
      (st.spdBonus>0?S('st_speed','💨','Speed','+'+Math.round(st.spdBonus*100)+'%'):'')+(st.cdReduce>0?S('st_haste','⏳','Cooldown','−'+Math.round(st.cdReduce*100)+'%'):'')+(st.manaRegen>0?S('ui_mana','💧','Mana regen',(4+st.manaRegen).toFixed(1)+'/s'):'')+'</div>'+(typeof ZElUI!=='undefined'&&ZElUI.resLine(ps)?'<div class="zv-res"><span class="l">Resists</span>'+ZElUI.resLine(ps)+'</div>':'')+'</div>';
    // ── right: tabs, tiles, detail ──
    h+='<div class="zv-right"><div class="zv-tabs">'+ZINV.TABS.map(function(t){ return '<button class="inv-tab-btn'+(F===t[0]?' itab-active':'')+'" data-tip="'+t[1]+'" onclick="ZINV.setFilter(\''+t[0]+'\')">'+ZIcon.html(t[2],t[3],1.5)+'<span>'+t[1]+'</span></button>'; }).join('')+'</div>';
    var T=ZINV.TABS.filter(function(t){ return t[0]===F; })[0]||ZINV.TABS[0], want=T[4], cnt={}, order=[];
    inv.forEach(function(id){ var it=ITEMS[id]; if(!it)return; if(want&&want.indexOf(ZINV.slotOf(it))<0)return; if(!cnt[id]){ cnt[id]=0; order.push(id); } cnt[id]++; });
    var ammo=ps.ammo||{}; if(!want||want.indexOf('ammo')>=0)Object.keys(ammo).forEach(function(a){ if(ammo[a]>0&&ITEMS[a]&&!cnt[a]){ cnt[a]=ammo[a]; order.push(a); } });
    var rank={lHand:1,rHand:2,mWeapon:3,body:4,shield:5,head:6,gauntlets:7,pants:8,feet:9,neck:10,back:11,ring:12,spell:13,special:14,use:15,food:16,ammo:17,gem:18,key:19,material:20,misc:21};
    order.sort(function(a,b){ var A=ITEMS[a],B=ITEMS[b]; return (rank[ZINV.slotOf(A)]||30)-(rank[ZINV.slotOf(B)]||30)||((B.atk||0)+(B.def||0)+(B.heal||0))-((A.atk||0)+(A.def||0)+(A.heal||0))||A.name.localeCompare(B.name); });
    h+='<div class="zv-grid">'+(order.length?order.map(function(id){ var it=ITEMS[id], on=ZINV.sel&&ZINV.sel.k==='inv'&&ZINV.sel.id===id, sl=ZINV.slotOf(it), cur=eq[sl]&&ITEMS[eq[sl]], up=cur&&((it.atk||0)+(it.def||0))>((cur.atk||0)+(cur.def||0));
        return '<div class="zv-tile'+(on?' on':'')+'" data-tip="'+it.name.replace(/"/g,'&quot;')+'" onclick="ZINV.pick(\''+id+'\')" ondblclick="ZINV.act(\''+id+'\')">'+ZIcon.item(id,2.5)+(typeof ZElUI!=='undefined'?ZElUI.pips(it):'')+(cnt[id]>1?'<b class="zv-n">'+cnt[id]+'</b>':'')+(up?'<i class="zv-up">▲</i>':'')+'</div>'; }).join(''):
      '<div class="zv-none">'+(F==='all'?'Your pack is empty. Shops, chests and fallen monsters will fill it.':'Nothing of this kind in your pack.')+'</div>')+'</div>';
    h+='<div class="zv-detail">'+ZINV.detail(ps)+'</div></div></div>';
    if(F==='magic'&&typeof CASTLE_ISLANDS!=='undefined'){ var learned=ps.skillsLearned||[]; h+='<div class="zv-foot"><b>The twelve masters</b> — '+learned.length+' / 12 skills learned. Each castle island holds a master who teaches one.</div>'; }
    var own=ps.ownedFamiliars||[]; if(own.length&&typeof _familiarCardHTML==='function'){ h+='<div class="zv-fams"><div class="zv-fams-t">Familiars <span>— click for details · N to switch</span></div>'; own.forEach(function(fid){ h+=_familiarCardHTML(fid,ps,"showFamiliarInfo('"+fid+"')"); }); h+='</div>'; }
    ct.innerHTML=h; ct.style.maxHeight='none'; ct.style.overflow='visible'; ZINV.hero(); },
  // the detail panel for what is selected
  detail:function(ps){ var s=ZINV.sel, eq=ps.equip||{}, inv=ps.inventory||[]; if(!s)return '<div class="zv-hint">Select an item or a gear slot.<br><span>Double-click to equip, use or take off.</span></div>';
    var id=s.k==='eq'?eq[s.slot]:s.id, it=id&&ITEMS[id]; if(s.k==='eq'&&!it){ var base=s.slot.indexOf('ring')===0?'ring':s.slot; return '<div class="zv-hint">'+ZINV.SLOT_NAME[base]+' — empty.<br><span>Items that fit are shown on the right.</span></div>'; }
    if(!it||(s.k==='inv'&&inv.indexOf(id)<0&&!((ps.ammo||{})[id]>0))){ ZINV.sel=null; return ZINV.detail(ps); }
    var sl=ZINV.slotOf(it), cur=s.k==='inv'&&eq[sl]&&ITEMS[eq[sl]], cmp='';
    if(cur&&cur!==it){ var d=function(k,l){ var v=(it[k]||0)-(cur[k]||0); return v?'<span class="zv-chip '+(v>0?'up':'dn')+'">'+(v>0?'+':'−')+Math.abs(v)+' '+l+'</span>':''; }; cmp='<div class="zv-cmp">Instead of '+cur.name+': '+((d('atk','ATK')+d('def','DEF'))||'<span class="zv-chip">no change in attack or defense</span>')+'</div>'; }
    var btn=''; if(s.k==='eq')btn='<button class="ir-equip zv-off" onclick="window._unequipSlot(\''+s.slot+'\')">Take off</button>';
    else if(ZINV.SLOT_NAME[sl]&&sl!=='ring'||sl==='ring')btn='<button class="ir-equip" onclick="ZINV.act(\''+id+'\')">'+(sl==='spell'||sl==='special'?'Ready it':'Equip')+'</button>';
    else if(it.heal)btn='<button class="ir-equip" onclick="ZINV.act(\''+id+'\')">'+(sl==='food'?'Eat':'Use')+'</button>';
    return '<div class="zv-d-ico">'+ZIcon.item(id,4)+'</div><div class="zv-d-txt"><div class="zv-d-name">'+it.name+' <small>'+(ZINV.SLOT_NAME[sl]||({food:'Food',use:'Potion',gem:'Treasure',key:'Key',ammo:'Ammunition',material:'Material'})[sl]||'')+(s.k==='eq'?' · worn':'')+'</small></div>'+
      '<div class="zv-d-chips">'+ZINV.chips(it)+'</div><div class="zv-d-desc">'+(ZINV.plain(it)?'':(it.desc||''))+'</div>'+cmp+'</div><div class="zv-d-btn">'+btn+'</div>'; },
  setFilter:function(f){ ZINV.filter=f; ZINV.render(); },
  pick:function(id){ ZINV.sel={k:'inv',id:id}; ZINV.render(); },
  pickSlot:function(sk){ ZINV.sel={k:'eq',slot:sk}; var base=sk.indexOf('ring')===0?'ring':sk, T=ZINV.TABS.filter(function(t){ return t[4]&&t[4].indexOf(base)>=0; })[0]; if(T)ZINV.filter=T[0]; ZINV.render(); },
  actSlot:function(sk){ var W=ZINV.ws(); if(W&&W.playerState&&(W.playerState.equip||{})[sk]){ ZINV.sel=null; window._unequipSlot(sk); } },
  // an item's main action: equip it, or eat / drink it
  act:function(id){ var W=ZINV.ws(); if(!W)return; var ps=W.playerState, it=ITEMS[id], i=ps.inventory.indexOf(id); if(!it||i<0)return; var sl=ZINV.slotOf(it);
    if(ZINV.SLOT_NAME[sl]){ ZINV.sel=null; window._equipItem(i,sl); } else if(it.heal){ window._useItem(i); if(ps.inventory.indexOf(id)<0)ZINV.sel=null; ZINV.render(ps); } },
  // the hero in the middle: his painted idle frames (the drawn stand-in when painted sprites are off)
  hero:function(){ var cv=document.getElementById('zv-hero-cv'); if(!cv)return; var x=cv.getContext('2d'), W=ZINV.ws(), who=(typeof _heroWho==='function'&&W)?_heroWho(W):'m', ch='hero_'+who, frames=null, n=1, t0=Date.now();
    var draw=function(){ var c=document.getElementById('zv-hero-cv'); if(!c||c!==cv){ clearInterval(ZINV.timer); ZINV.timer=null; return; } x.clearRect(0,0,cv.width,cv.height);
      if(frames){ var f=frames[Math.floor((Date.now()-t0)/260)%n]; x.imageSmoothingEnabled=true; x.drawImage(f,(cv.width-f.width)/2,cv.height-f.height-18); }
      else { try{ var k=(who==='f'&&game.textures.exists('heroF_front_0'))?'heroF_front_0':'hero_front_0', im=game.textures.get(k).getSourceImage(), s=Math.min(200/im.height,200/im.width); x.imageSmoothingEnabled=false; x.drawImage(im,(cv.width-im.width*s)/2,cv.height-im.height*s-22,im.width*s,im.height*s); }catch(e){} } };
    if(ZINV.timer)clearInterval(ZINV.timer); ZINV.timer=setInterval(draw,130); draw();
    if(typeof ZAtlas!=='undefined'&&!ZAtlas.off&&ZAtlas.has(ch)){ var P=ZAtlas.pick(ch,['idle','still','float'],'f'); ZAtlas.thumbs(ch,260,8,function(L){ if(L&&L.length){ frames=L; n=Math.max(1,Math.min(L.length,(P&&P.n)||1)); draw(); } }); } }
};
function updateInventoryModal(ps){ try{ ZINV.render(ps); }catch(e){ if(typeof console!=='undefined')console.error('inventory',e); } }
// the slot picker of the old layout now just selects the slot here
window._openSlotPicker2=function(sk){ ZINV.pickSlot(sk); };
window._switchInvTab=function(t){ ZINV.setFilter(({equip:'all',weapons:'weapons',armor:'armor',accessories:'accessories',ammo:'ammo',food:'food',gems:'gems',potions:'potions',skills:'magic'})[t]||'all'); };
document.addEventListener('keydown',function(e){ if(e.key!=='Enter')return; var el=document.getElementById('modal-inventory'); if(!el||el.style.display==='none'||!ZINV.sel)return; if(ZINV.sel.k==='inv')ZINV.act(ZINV.sel.id); else ZINV.actSlot(ZINV.sel.slot); });
