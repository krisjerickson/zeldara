// ═══════════════════════════════════════════════════════════════════════
// ║ THE ZELDARA TOME (T) — a field guide that fills in as you play:
// ║ monsters (with how to deal with them), mounts, familiars, spells,
// ║ items, places and characters. Undiscovered entries show as ???
// ║ silhouettes with a hint where to look. Saved in playerState.tome.
// ═══════════════════════════════════════════════════════════════════════
var TOME_CATS=[{k:'monster',n:'Monsters',i:'👹'},{k:'mount',n:'Mounts',i:'🐎'},{k:'familiar',n:'Familiars',i:'🌟'},{k:'spell',n:'Spells',i:'✨'},{k:'item',n:'Items',i:'🎒'},{k:'place',n:'Places',i:'🗺️'},{k:'character',n:'Characters',i:'🧑'},{k:'quest',n:'Quests',i:'📜'}];
var TOME_QCOL=['#ece6d8','#e3f1d6','#d9ebf5','#ece3d4','#f5dfd6'];   // village/other, Grasslands, Wetlands, Highlands, Ashlands
var TOME_QN=['','Grasslands','Wetlands','Highlands','Ashlands'];
var TOME_MOVE_TXT={pulse:'darts in and out',zigzag:'zig-zags toward you',rush:'rushes in short bursts',orbit:'circles around you',teleport:'teleports closer',strafe:'strafes sideways at range',normal:'walks straight at you'};
var TOME_ATK_TXT={melee:'hits in melee',arrow:'shoots arrows',scatter:'fires a 3-way spread',scatter_arrow:'fires 3-way arrow spreads',scatter_flame:'fires 3-way flame spreads',flame:'throws fire (burns)',bog_flame:'spits bog flame (slows)',heat_seek:'fires homing fireballs',lightning:'fires lightning bolts',stomp:'stomps a shockwave'};
// immunities, weaknesses and defences read straight from the monster's engine kit
var TOME_DMG={melee:'sword (melee)',ranged:'arrows & thrown weapons',spell:'spells',fire:'fire & burning'};
function _tomeDefLines(rid){ var K=typeof MX!=='undefined'&&MX.kit(rid); if(!K)return [['Immune to','Nothing — every kind of attack works.']];
  var imm=[], weak=[], other=[], mv=K.move.name;
  K.def.forEach(function(D){ var p=D.p;
    if(D.name==='immune')imm.push(TOME_DMG[p.k]||p.k);
    else if(D.name==='reflect')imm.push('arrows & thrown weapons (reflects them back)');
    else if(D.name==='weak')weak.push((TOME_DMG[p.k]||p.k)+' (×'+(p.m||2)+' damage)');
    else if(D.name==='front')other.push('Shield in front: blocks '+(p.red!==undefined&&p.red<1?Math.round(p.red*100)+'% of ':'')+'hits from the front — attack from the side or behind');
    else if(D.name==='armor')other.push('Armour: the first '+(p.n||3)+' hits do '+Math.round((1-(p.red||0.7))*100)+'% damage, then it breaks');
    else if(D.name==='bubble')other.push('Bubble: after '+(p.n||3)+' quick hits it becomes immune for '+(p.t||2)+' s — pace your attacks');
    else if(D.name==='dodge')other.push('Dodges one attack every '+(p.cd||4)+' s');
    else if(D.name==='tiny')other.push('Tiny: '+Math.round((p.c||0.25)*100)+'% of attacks miss');
    else if(D.name==='thorns')other.push('Thorns: hurts you each time you hit it with your sword');
    else if(D.name==='revive')other.push('Rises again once — stand on its bones to finish it');
    else if(D.name==='regen')other.push('Regenerates'+(p.on?' while on '+p.on:''));
    else if(D.name==='split')other.push('Splits once when killed');
    else if(D.name==='explode')other.push('Explodes when it dies — step back');
    else if(D.name==='enrage')other.push('Enrages below half health');
    else if(D.name==='heal')other.push('Heals nearby allies');
    else if(D.name==='aura')other.push('Hurts you when you stand close');
    else if(typeof FAM_COUNTER_TXT!=='undefined'&&FAM_COUNTER_TXT[D.name])other.push('🐾 '+FAM_COUNTER_TXT[D.name](p));
  });
  K.atk.forEach(function(a){ if(a.name==='banish'&&typeof FAM_COUNTER_TXT!=='undefined')other.push('🐾 '+FAM_COUNTER_TXT.banish(a.p)); });
  if(mv==='burrow'||mv==='ambush'||mv==='disguise')imm.push('everything while hidden ('+mv+')');
  return [['Immune to',imm.length?imm.join(', '):'Nothing — every kind of attack works.']].concat(weak.length?[['Weak to',weak.join(', ')]]:[]).concat(other.length?[['Defences',other.join('<br>')]]:[]); }
var Tome={ ui:{cat:'monster',sel:null,q:0}, _qT:0, _queue:[],
  ps:function(){ var ws=game&&game.scene&&game.scene.getScene('World'); return ws&&ws.playerState; },
  book:function(){ var ps=Tome.ps(); if(!ps)return null; if(!ps.tome||typeof ps.tome!=='object')ps.tome={}; TOME_CATS.forEach(function(c){ if(!ps.tome[c.k])ps.tome[c.k]={}; }); return ps.tome; },
  has:function(cat,id){ var b=Tome.book(); return !!(b&&b[cat][id]); },
  see:function(cat,id){ var b=Tome.book(); if(!b||!id||b[cat][id])return false; var e=Tome.entry(cat,id); if(!e)return false; b[cat][id]=Date.now();
    Tome._queue.push(e.name); if(!Tome._flushT)Tome._flushT=setTimeout(Tome._flush,600); return true; },
  _flush:function(){ Tome._flushT=null; var q=Tome._queue; Tome._queue=[]; if(!q.length)return; showNotif('📖 Tome: '+(q.length===1?q[0]:q.length+' new entries ('+q.slice(0,2).join(', ')+'…)'),'#e8d8a8'); var el=document.getElementById('tome-btn'); if(el){ el.classList.add('tome-new'); } },
  // everything we already own counts as found
  sync:function(){ var ps=Tome.ps(); if(!ps)return; var b=Tome.book(), mark=function(c,id){ if(id&&!b[c][id]&&Tome.entry(c,id))b[c][id]=Date.now(); };
    (ps.ownedMounts||[]).forEach(function(m){ mark('mount',m); }); if(ps.mount)mark('mount',ps.mount);
    (ps.ownedFamiliars||[]).forEach(function(f){ mark('familiar',f); }); ['familiar','familiar2','familiar3'].forEach(function(k){ mark('familiar',ps[k]); });
    var items=[]; (ps.inventory||[]).forEach(function(it){ items.push(typeof it==='string'?it:(it&&(it.id||it.key))); }); Object.keys(ps.equip||{}).forEach(function(k){ items.push(ps.equip[k]); });
    items.forEach(function(id){ if(id&&ITEMS[id]){ mark('item',id); if(ITEMS[id].spellId)mark('spell',ITEMS[id].spellId); } });
    (ps.visitedZones||[]).forEach(function(z){ mark('place','zone_'+z); }); (ps.rescued||[]).forEach(function(s){ var C=CRAFTSMEN[s]; if(C)mark('character','crafts_'+s); });
    Object.keys(ps.fairyQuests||{}).forEach(function(k){ mark('quest',k); });
    (ps.castlesDone||[]).forEach(function(k){ var C=typeof CASTLE_ISLANDS!=='undefined'&&CASTLE_ISLANDS[k]; if(!C)return; mark('character',C.teacher); mark('monster',C.warden); mark('place','castle_'+k); });
    (ps.completedQuests||[]).forEach(function(q){ var m=q.match(/^s(\d)_(dungeon|tower)$/); if(m){ var bk=m[2]==='dungeon'?['goblin_king','swamp_witch','rock_dragon','lava_titan'][m[1]-1]:['dark_warlock','storm_mage','iron_sentinel','shadow_lord'][m[1]-1]; mark('monster','boss_'+bk); } }); },
  // ── catalogue ──
  list:function(cat){ var out=[];
    if(cat==='monster'){ MON_ROSTER.forEach(function(R){ out.push(R.id); }); CHAR_ROSTER.forEach(function(R){ if(R.cat==='boss')out.push(R.id); }); }
    else if(cat==='mount')out=Object.keys(MOUNTS); else if(cat==='familiar')out=Object.keys(FAMILIARS); else if(cat==='spell')out=Object.keys(SPELL_DATA).filter(function(k){ return k!=='meteor'; });
    else if(cat==='item')out=Object.keys(ITEMS).filter(function(k){ return ITEMS[k].slot!=='material'||k==='wood_log'; });
    else if(cat==='place'){ WMAP_ZONES.forEach(function(z){ out.push('zone_'+z.id); }); out.push('village'); if(typeof BOSS_ARENAS!=='undefined')Object.keys(BOSS_ARENAS).forEach(function(k){ out.push('arena_'+k); }); if(typeof CAMP_BY_ID!=='undefined')Object.keys(CAMP_BY_ID).forEach(function(k){ out.push('camp_'+k); }); if(typeof CASTLE_ISLANDS!=='undefined')Object.keys(CASTLE_ISLANDS).forEach(function(k){ out.push('castle_'+k); }); var ws=game.scene.getScene('World'); ((ws&&ws.wd&&ws.wd.sites)||[]).forEach(function(s){ out.push('site_'+s.id); }); }
    else if(cat==='quest'){ [1,2,3,4].forEach(function(q){ for(var i=0;i<5;i++)out.push('q'+q+'_f'+i); if(FAIRY_KING_OBJECTS[q])out.push('king'+q); }); }
    else if(cat==='character'){ CHAR_ROSTER.forEach(function(R){ if(R.cat==='npc')out.push(R.id); }); out.push('npc_house'); }
    return out; },
  entry:function(cat,id){
    if(cat==='monster'){ if(id.indexOf('boss_')===0){ var B=MDEFS[id.slice(5)], CB=CHAR_BY_ID[id]; if(!B&&!CB)return null;
        if(!B)return {name:CB.name,spec:CB.spec,sub:'Boss · '+CB.sub,hint:'Waits in: '+CB.where,lines:[['Looks',CB.look],['Fights',CB.doing],['Where',CB.where],['Tip','Bosses hit hard but slowly — keep moving and strike after each attack.']]};
        return {name:B.name,icon:B.icon,spec:CB&&CB.spec,sub:'Boss · '+TOME_QN[B.sec]+' guardian',hint:'Guards a ★ '+(['goblin_king','swamp_witch','rock_dragon','lava_titan'].indexOf(id.slice(5))>=0?'dungeon':'tower')+' in the '+TOME_QN[B.sec],
        lines:(CB?[['Looks',CB.look]]:[]).concat(BOSS_PHASES[id.slice(5)]?[['Phases',BOSS_PHASES[id.slice(5)].phases.map(function(P,i){ if(!P)return '1 · '+B.name+' (on the last floor)'; var F=CHAR_BY_ID[P.form]; return (i+1)+' · '+(F?F.name:'?')+' — '+BOSS_ARENAS[P.arena].name+(P.bars?' · '+P.bars.map(function(b){ return BOSS_BAR_INFO[b.k].ic+' '+BOSS_BAR_INFO[b.k].n; }).join(' '):'')+(P.allies?' · with allies':''); }).join('<br>')],['Extra health','✨ Ward: spells & familiars · 🏹 Guard: arrows · 🛡 Plate: sword. Other attacks only chip it (15%).']]:[]).concat([['Fights',(TOME_MOVE_TXT[B.moveType]||'moves')+'; '+(TOME_ATK_TXT[B.atkType]||'attacks')+'.'],['Strength','HP '+B.hp+' · ATK '+B.atk+' · DEF '+(B.def||0)],['Tip','Bosses hit hard but slowly — keep moving and strike after each attack.']])}; }
      var CB2=CHAR_BY_ID[id]; if(CB2&&CB2.cat==='boss'){ var isW=id.indexOf('cw_')===0, MGT=typeof MAGE_TOWERS!=='undefined'&&MAGE_TOWERS.find(function(M){ return M.boss===id; }), rk=isW&&typeof CASTLE_ISLANDS!=='undefined'?'cwd_'+Object.keys(CASTLE_ISLANDS).find(function(k){ return CASTLE_ISLANDS[k].warden===id; }):MGT?'mgb_'+MGT.key:null; if(!rk&&typeof BOSS_PHASES!=='undefined')Object.keys(BOSS_PHASES).forEach(function(k){ BOSS_PHASES[k].phases.forEach(function(P){ if(P&&P.form===id)rk=P.rid; }); }); return {name:CB2.name,spec:CB2.spec,q:MGT?MGT.q:undefined,sub:'Boss · '+CB2.sub,hint:'Waits in: '+CB2.where,lines:[['Looks',CB2.look],['Fights',CB2.doing],['Where',CB2.where]].concat(MGT?[['Teaches',(ITEMS[MGT.spell]||{}).icon+' '+(ITEMS[MGT.spell]||{}).name]]:[]).concat(rk?_tomeDefLines(rk):[]).concat([['Tip',MGT?'A tower master: one phase, but full of tricks. Beat them to learn their spell.':isW?'A one-phase warden holding a master captive. Beat it, then open the portal chest to learn the master\'s skill.':'A later phase of a ★ guardian fight.']])}; }
      var R=MON_BY_ID[id]; if(!R)return null; var seg={main:'roams the '+TOME_QN[R.q],dun:TOME_QN[R.q]+' dungeons ('+R.role+')',tow:TOME_QN[R.q]+' towers (magic)'}[R.seg];
      var where=(R.tags.find(function(t){ return t.indexOf('T:')===0; })||'').slice(2);
      return {name:R.name,spec:R.spec,sub:TOME_QN[R.q]+' · '+{main:'Mainland',dun:'Dungeon',tow:'Tower'}[R.seg]+' · '+'★★★★★'.slice(0,R.tier),hint:'Found: '+seg+(where?' — '+where:'')+(R.tags.indexOf('night')>=0?' · only at night':''),
        lines:[['Looks',R.look],['Moves',R.move],['Attacks',R.atk],['Defends',R.def]].concat(MON_LEGACY[id]?[['Immune to','Nothing — every kind of attack works.']]:_tomeDefLines(id)).concat([['Special',R.sp],['Where',seg+(where?' — '+where:'')+(R.tags.indexOf('pack')>=0?' · in packs with an alpha':'')+(R.tags.indexOf('night')>=0?' · night only':'')]])}; }
    if(cat==='mount'){ var M=MOUNTS[id]; if(!M)return null; var cc=Array.isArray(M.canCross)?M.canCross.map(function(t){ return Object.keys(T).find(function(k){ return T[k]===t; }); }).filter(Boolean).map(function(s){ return s.toLowerCase().replace(/_/g,' '); }).join(', '):M.canCross;
      var CM=CHAR_BY_ID['mt_'+id]; return {name:M.n,icon:M.icon,spec:CM&&CM.spec,look:CM&&CM.look,sub:'Mount · '+(M.spdMult||1)+'× speed',hint:M.cost?'Sold at the stables':'Won in the '+TOME_QN[M.sec]||'',lines:(CM?[['Looks',CM.look]]:[]).concat([['What it does',M.desc],['Crosses',cc||'roads & grass'],['Tip','Press M to mount / dismount. Signature terrain is slow on foot but full speed on the right mount.']])}; }
    if(cat==='familiar'){ var F=FAMILIARS[id]; if(!F)return null; var D=_famDesign(id), E=SPIRIT_ELEMENTS[D.el], ps0=Tome.ps(), L=ps0?_famLevel(ps0,id):1;
      return {name:F.n,spec:{_cf:spiritFrames(D)},q:E.q,sub:'Familiar · '+E.name+' spirit · '+TOME_QN[E.q],hint:'A spirit sleeping on the '+TOME_QN[E.q]+' familiar island (its first harbor)',
        lines:[['Looks',D.blurb],['Moves',D.move==='hover'?'Hovers and circles around you':'Walks along behind you'],['Skills',FAM_SKILLS[D.el].map(function(S,i){ return (i<L?'<b>':'<span style="opacity:.55">')+(i?'Lv '+(i+1):'Base')+' · '+S.name+(i<L?'</b>':'</span>')+' — '+S.text; }).join('<br>')],['Level up','Each of the five '+TOME_QN[E.q]+' fairies by the runestones teaches one more skill: find the object she asks for (dig with G), then pass her trial.'],['Tip','Press N to choose active familiars. Each Fairy King (Wetlands, Highlands, Ashlands) lets one more fly with you — up to 4.']]}; }
    if(cat==='spell'){ var S=SPELL_DATA[id]; if(!S)return null; var tk=Object.keys(ITEMS).find(function(k){ return ITEMS[k].spellId===id; }), TI=tk&&ITEMS[tk], MT=tk&&typeof MAGE_TOWERS!=='undefined'&&MAGE_TOWERS.find(function(M){ return M.spell===tk; });
      return {name:S.name,icon:TI?TI.icon:'✨',q:MT?MT.q:undefined,sub:'Spell · '+S.manaCost+' mana',hint:MT?'Taught at '+MT.name+' ('+TOME_QN[MT.q]+') by '+MT.bossName+', '+MT.title+'.':'No longer taught anywhere.',lines:[['Effect',TI&&TI.desc||({slow:'slows the target',splash:'explodes in an area',chain:'jumps between enemies',nova:'burns everything around you',none:'pierces through enemies',stun:'teleports you and stuns enemies'}[S.effect]||S.effect)],['Cost',S.manaCost+' mana · '+S.cooldown+' s cooldown'],['Tip','Equip the tome in the spell slot and press X.']]}; }
    if(cat==='item'&&typeof CASTLE_BY_SKILL!=='undefined'&&CASTLE_BY_SKILL[id]){ var IS=ITEMS[id], CS=CASTLE_ISLANDS[CASTLE_BY_SKILL[id]], TS=CHAR_BY_ID[CS.teacher], SS=TOWER_STYLES_BY_ID[CS.castle];
      return {name:IS.name,icon:IS.icon,sub:'Skill · special attack (Z) · '+TOME_QN[CS.sec],hint:'Taught by a master held in a '+TOME_QN[CS.sec]+' island castle',lines:[['Effect',IS.desc],['Cooldown',IS.cd+' s'],['Teacher',(TS?TS.name:'?')+' — held in '+(SS?SS.name:CS.name)+' on '+CS.name],['Tip','Skills are never sold: free the master to learn it. Equip one in the Special slot (skills tab) and press Z.']]}; }
    if(cat==='item'){ var I=ITEMS[id]; if(!I)return null; return {name:I.name,icon:I.icon,sub:'Item · '+(I.slot||'misc'),hint:I.buy?'Sold in the village':'Found in chests or dropped by monsters',lines:[['Use',I.desc||''],['Value',(I.buy?'Buy '+I.buy+'g · ':'')+(I.sell?'sell '+I.sell+'g':'')]]}; }
    if(cat==='place'&&id.indexOf('camp_')===0){ var CT=CAMP_BY_ID[id.slice(5)]; if(!CT)return null; var rk={food:'food to gather',chest:'a treasure chest (one time)',well:'a healing spring',mana:'a mana spring',buff:'a 2-minute blessing',xp:'runes that teach (XP, one time)',ammo:'arrows',gems:'gems (one time)'}[CT.r.k];
      return {name:CT.name,icon:'🔥',sub:'Camp · '+TOME_QN[CT.q],hint:'Monsters guard it somewhere in the '+TOME_QN[CT.q],lines:[['Guarded',rk],['Tip','Beat every guard around it. Food, springs, shrines and racks come back after about 10 minutes.']]}; }
    if(cat==='place'&&id.indexOf('castle_')===0){ var CI=CASTLE_ISLANDS[id.slice(7)]; if(!CI)return null; var CSt=TOWER_STYLES_BY_ID[CI.castle], CW=CHAR_BY_ID[CI.warden], CTe=CHAR_BY_ID[CI.teacher], CIt=ITEMS[CI.skill];
      return {name:CSt?CSt.name:CI.name,icon:'🏰',sub:'Castle · '+CI.name+' · '+TOME_QN[CI.sec],hint:'On an island off the '+TOME_QN[CI.sec]+' coast — sail from its own harbor',lines:[['About',CSt?CSt.blurb:''],['Floors',CI.floors+' floors'],['Warden',CW?CW.name+' — '+CW.doing:'?'],['Captive',(CTe?CTe.name:'?')+' teaches '+(CIt?CIt.icon+' '+CIt.name:'?')],['Island',CI.name+' — sail from its harbor on the '+TOME_QN[CI.sec]+' coast']]}; }
    if(cat==='place'&&id.indexOf('arena_')===0){ var AR=BOSS_ARENAS[id.slice(6)]; if(!AR)return null; var who=''; Object.keys(BOSS_PHASES).forEach(function(k){ BOSS_PHASES[k].phases.forEach(function(P,i){ if(P&&P.arena===id.slice(6))who=MDEFS[k].name+' · phase '+(i+1); }); });
      return {name:AR.name,icon:'⚔️',sub:'Boss arena · '+who,hint:'Reached in a later phase of a ★ guardian fight',lines:[['About',AR.tagline+'.'],['Fight',who]]}; }
    if(cat==='place'){ if(id==='village')return {name:'The Village',icon:'🏘',sub:'Home · Mirror Lake shore',hint:'Where it all begins',lines:[['About','A runestone hamlet on the shore of Mirror Lake. It grows every time a craftsman comes home: harbour, walls, windmills and more.']]};
      if(id.indexOf('zone_')===0){ var Z=WZ_DESIGN[id.slice(5)]||(WORLD_DESIGNS||[]).find(function(d){ return d.id===id.slice(5); }); if(!Z)return null; return {name:Z.name,icon:'🗺️',sub:'Region · '+TOME_QN[Z.quad],hint:'Somewhere in the '+TOME_QN[Z.quad],lines:[['About',Z.tagline+'.'],['Details',(Z.blurb||'').replace(/<[^>]+>/g,'')]]}; }
      if(id.indexOf('site_')===0){ var ws=game.scene.getScene('World'), s=ws&&ws.wd&&ws.wd.sites.find(function(x){ return 'site_'+x.id===id; }); if(!s)return null; return {name:_siteLabel(s),icon:{tower:'🗼',dungeon:'⚔️',harbor:'⚓',skyport:'🎈',camp:'⛺',volcano:'🌋'}[s.type]||'📍',sub:(s.type||'site')+' · '+TOME_QN[s.sec||getTileSection(s.tx,s.ty)],hint:'A '+(s.type||'site')+' in the '+TOME_QN[s.sec||getTileSection(s.tx,s.ty)],lines:[['About',(MAIN_QUEST_DEFS[s.type]&&MAIN_QUEST_DEFS[s.type].desc)||'Explore it to find out.']]}; } }
    if(cat==='quest'){ var ws=game.scene.getScene('World'), ps1=Tome.ps(), S=((ps1&&ps1.fairyQuests)||{})[id], km=id.match(/^king(\d)$/), fm=id.match(/^q(\d)_f(\d)$/); if(!km&&!fm)return null;
      var st=!S?'Not started':S.st==='done'?'✔ Complete':(S.got||[]).length>=S.need.length?'Found everything — return and take the trial':'Searching ('+(S.got||[]).length+' / '+S.need.length+' found)';
      var objLine=function(o){ var got=S&&(S.got||[]).indexOf(o.id)>=0; return (got?'✔ ':'')+o.icon+' <b>'+o.name+'</b> — buried '+o.where+' in <b>'+_wmZoneName(o.zone)+'</b>, next to the runes at its heart.'+(!got&&ws&&ws._digHint?' '+ws._digHint(o.id):''); };
      if(km){ var q=+km[1]; return {name:_kingName(q)+' — Trial',icon:'👑',q:q,sub:'Fairy Monarch quest · '+TOME_QN[q],hint:'A Fairy Monarch holds court in a great rune henge in the '+TOME_QN[q]+'. His trial needs a '+TOME_QN[q]+' spirit with two fairy lessons.',
        lines:[['Status',st],['Find',FAIRY_KING_OBJECTS[q].map(function(a,i){ return objLine(_kingObj(q,i)); }).join('<br>')],['How','Press G to dig. Golden sparkles appear when you are close, and the world map (B) circles the area with a 🪏.'],['Trial','Hold the King\'s circle against waves of monsters for 30 s, then defeat the shadow of your own spirit.'],['Reward','One more familiar can be active at once (up to 4).']]}; }
      var q2=+fm[1], i2=+fm[2], o=_fairyObj(q2,i2), el=Object.keys(SPIRIT_ELEMENTS).find(function(k){ return SPIRIT_ELEMENTS[k].q===q2; }), sk=FAM_SKILLS[el][i2+1], _tp=_trialPlanOf(q2,i2), tr={name:_tp.name+' ('+TRIAL_THEMES[_tp.theme].name+')',text:TRIAL_THEMES[_tp.theme].text};
      var f=ws&&ws._fairies&&ws._fairies.find(function(x){ return x.q===q2&&x.i===i2; });
      return {name:FAIRY_NAMES[q2][i2]+'\'s Lesson: '+sk.name,icon:o.icon,q:q2,sub:'Fairy quest '+(i2+1)+' of 5 · '+TOME_QN[q2],hint:'The fairy '+FAIRY_NAMES[q2][i2]+' lives '+(f?'near '+f.home.name:'by a runestone')+' in the '+TOME_QN[q2]+'.',
        lines:[['Status',st],['Fairy',FAIRY_NAMES[q2][i2]+' — '+(f?'flits around '+f.home.name:'by the runestones')],['Find',objLine(o)],['How','Press G to dig. Golden sparkles appear when you are close, and the world map (B) circles the area with a 🪏.'],['Trial',tr.name+' — '+tr.text],['Teaches',sk.name+' — '+sk.text]]}; }
    if(cat==='character'){ var CN=CHAR_BY_ID[id]; if(CN){ var C0=id.indexOf('crafts_')===0?CRAFTSMEN[+id.slice(7)]:null;
        return {name:CN.name,spec:CN.spec,sub:CN.sub.replace(/s$/,'')+' · '+CN.where,hint:'Look for them: '+CN.where,lines:[['Looks',CN.look],['Does',CN.doing]].concat(C0?[['Says',C0.village||''],['Tip','Freeing a craftsman opens the next region and grows the village.']]:CN.extra?[['Also',CN.extra]]:[])}; }
      if(id.indexOf('crafts_')===0){ var C=CRAFTSMEN[+id.slice(7)]; if(!C)return null; return {name:C.n,icon:C.icon,sub:'Craftsman',hint:'A captive in a '+TOME_QN[+id.slice(7)]+' tower',lines:[['About',C.village||''],['Tip','Freeing a craftsman opens the next region and grows the village.']]}; }
      var nm={tavern:'The Tavern Keeper',shop:'The Shopkeeper',house:'Your Home',forge:'The Blacksmith',guild:'The Guild Master',stables:'The Stable Master',armory:'The Armourer',clothing:'The Tailor',jeweler:'The Jeweller',apothecary:"The Sorcerer's Apothecary",merchant:'The Travelling Merchant'}[id.slice(4)];
      return nm?{name:nm,icon:'🧑',sub:'Villager',hint:'Somewhere in the village',lines:[['About','Walk up to their door and press Tab.']]}:null; }
    return null; },
  frames:function(spec){ return spec._cf||(spec.mount?mtFrames(spec):msFrames(spec)); },
  // which quadrant an entry belongs to (0 = village / everywhere)
  qOf:function(cat,id,e){ if(e&&e.q!==undefined)return e.q; var n;
    if(cat==='monster'){ var R=MON_BY_ID[id]; if(R&&R.q)return R.q; var B=MDEFS[id.slice(5)]; if(B&&B.sec)return B.sec; var cw=typeof CASTLE_ISLANDS!=='undefined'&&Object.keys(CASTLE_ISLANDS).find(function(k){ return CASTLE_ISLANDS[k].warden===id; }); if(cw)return CASTLE_ISLANDS[cw].sec; if(typeof BOSS_PHASES!=='undefined'){ var q0=0; Object.keys(BOSS_PHASES).forEach(function(k){ BOSS_PHASES[k].phases.forEach(function(P){ if(P&&(P.form===id||(P.allies||[]).some(function(a){ return a.form===id; })))q0=BOSS_PHASES[k].q; }); }); if(q0)return q0; } return 0; }
    if(cat==='mount')return (MOUNTS[id]&&MOUNTS[id].sec)||0;
    if(cat==='item'){ n=typeof CASTLE_BY_SKILL!=='undefined'&&CASTLE_BY_SKILL[id]; if(n)return CASTLE_ISLANDS[n].sec; return (ITEMS[id]&&ITEMS[id].secReq)||0; }
    if(cat==='spell'){ var it=Object.keys(ITEMS).find(function(k){ return ITEMS[k].spellId===id; }); return it&&ITEMS[it].secReq||0; }
    if(cat==='place'){ if(id.indexOf('zone_')===0){ var z=WMAP_ZONES.find(function(z){ return 'zone_'+z.id===id; }); return z?z.r:0; } if(id.indexOf('camp_')===0){ var C=CAMP_BY_ID[id.slice(5)]; return C?C.q:0; } if(id.indexOf('castle_')===0)return CASTLE_ISLANDS[id.slice(7)].sec; if(id.indexOf('arena_')===0){ var qa=0; Object.keys(BOSS_PHASES).forEach(function(k){ BOSS_PHASES[k].phases.forEach(function(P){ if(P&&P.arena===id.slice(6))qa=BOSS_PHASES[k].q; }); }); return qa; } if(id.indexOf('site_')===0){ var m=id.match(/^site_s(\d)/); return m?+m[1]:0; } return 0; }
    if(cat==='character'){ if(id.indexOf('crafts_')===0)return +id.slice(7); var tc=typeof CASTLE_ISLANDS!=='undefined'&&Object.keys(CASTLE_ISLANDS).find(function(k){ return CASTLE_ISLANDS[k].teacher===id; }); if(tc)return CASTLE_ISLANDS[tc].sec; return 0; }
    return 0; },
  // ── UI ──
  open:function(){ Tome.sync(); var el=document.getElementById('modal-tome'); if(!el){ el=document.createElement('div'); el.className='overlay'; el.id='modal-tome'; el.style.display='none'; el.onclick=function(){ closeModal('tome'); };
      el.innerHTML='<div class="modal tome-modal" onclick="event.stopPropagation()"><div class="mhdr"><span>📖 The Zeldara Tome</span><button class="mcls" onclick="closeModal(\'tome\')">✕</button></div><div class="tome-body"><div id="tome-tabs"></div><div class="tome-main"><div id="tome-grid"></div><div id="tome-detail"></div></div></div></div>';
      document.body.appendChild(el);
      el.addEventListener('click',function(e){ var t=e.target.closest('[data-tcat]'); if(t){ Tome.ui.cat=t.dataset.tcat; Tome.ui.sel=null; Tome.ui.q=0; Tome.render(); return; } var q=e.target.closest('[data-tq]'); if(q){ Tome.ui.q=+q.dataset.tq; Tome.render(); return; } var c=e.target.closest('[data-tid]'); if(c){ Tome.ui.sel=c.dataset.tid; Tome.render(); } },true); }   // capture: the book stops click bubbling
    var btn=document.getElementById('tome-btn'); if(btn)btn.classList.remove('tome-new');
    el.style.display='flex'; document.body.classList.add('bars-hidden'); Tome.render(); },
  render:function(){ var b=Tome.book(); if(!b)return; var cat=Tome.ui.cat;
    document.getElementById('tome-tabs').innerHTML=TOME_CATS.map(function(c){ var L=Tome.list(c.k), n=L.filter(function(id){ return b[c.k][id]; }).length; return '<button data-tcat="'+c.k+'" class="'+(c.k===cat?'on':'')+'">'+c.i+' '+c.n+' <span>'+n+' / '+L.length+'</span></button>'; }).join('');
    var ids=Tome.list(cat), qf=Tome.ui.q, groups=[[],[],[],[],[]];
    ids.forEach(function(id){ var e=Tome.entry(cat,id); if(!e)return; var q=Tome.qOf(cat,id,e); if(qf&&q!==qf)return; groups[q].push([id,e]); });
    var qbar='<div class="tome-q">'+['All','Grasslands','Wetlands','Highlands','Ashlands'].map(function(n,i){ return '<button data-tq="'+i+'" class="'+(i===Tome.ui.q?'on':'')+(i?' tq'+i:'')+'">'+n+'</button>'; }).join('')+'</div>';
    var card=function(p){ var id=p[0], e=p[1], got=!!b[cat][id], ic=e.spec?'<canvas class="tome-spr'+(got?'':' dark')+(e.spec._cf?' smooth':'')+'" data-spr="'+id+'" width="48" height="48"></canvas>':'<span class="tome-ic'+(got?'':' dark')+'">'+(e.icon||'•')+'</span>';
      return '<button class="tome-card'+(got?'':' locked')+(Tome.ui.sel===id?' sel':'')+'" data-tid="'+id+'">'+ic+'<b>'+(got?e.name:'???')+'</b></button>'; };
    document.getElementById('tome-grid').innerHTML=qbar+[1,2,3,4,0].map(function(q){ var G=groups[q]; if(!G.length)return ''; var n=G.filter(function(p){ return b[cat][p[0]]; }).length;
      return '<section class="tome-sec q'+q+'" style="background:'+TOME_QCOL[q]+'"><h4>'+(q?TOME_QN[q]:'Village & everywhere')+' <span>'+n+' / '+G.length+'</span></h4><div class="tome-cards">'+G.map(card).join('')+'</div></section>'; }).join('');
    document.querySelectorAll('#tome-grid canvas[data-spr]').forEach(function(cv){ var e0=Tome.entry(cat,cv.dataset.spr); if(!e0||!e0.spec)return; var x=cv.getContext('2d'); x.imageSmoothingEnabled=!!e0.spec._cf; x.drawImage(Tome.frames(e0.spec)[0],0,0,48,48); if(cv.classList.contains('dark')){ x.globalCompositeOperation='source-atop'; x.fillStyle='#0c0a14'; x.fillRect(0,0,48,48); } });
    var sel=Tome.ui.sel, det=document.getElementById('tome-detail');
    if(!sel){ det.innerHTML='<p class="tome-empty">Pick an entry. Things you have met, owned or visited are written in; the rest show as ??? with a hint.</p>'; return; }
    var e=Tome.entry(cat,sel), got=!!b[cat][sel];
    if(!got){ det.innerHTML='<h3>???</h3><p class="tome-hint">'+(e?e.hint:'')+'</p>'; return; }
    det.innerHTML=(e.spec?'<canvas id="tome-big" width="128" height="128"></canvas>':'<div class="tome-bigic">'+(e.icon||'')+'</div>')+'<h3>'+e.name+'</h3><div class="tome-sub">'+e.sub+'</div><dl>'+e.lines.map(function(l){ return '<dt>'+l[0]+'</dt><dd>'+l[1]+'</dd>'; }).join('')+'</dl>';
    if(e.spec){ var cv=document.getElementById('tome-big'), fr=Tome.frames(e.spec), SEQ=e.spec._cf?[0,1,2,3]:e.spec.mount?[0,1,2,3,0,1,2,3,4,5,4,5,6,7,6,7]:[0,1,0,1,2,3,3], i=0; clearInterval(Tome._anim); var draw=function(){ if(!cv.isConnected){ clearInterval(Tome._anim); return; } var x=cv.getContext('2d'); x.clearRect(0,0,128,128); x.imageSmoothingEnabled=!!e.spec._cf; x.drawImage(fr[SEQ[i++%SEQ.length]],0,0,128,128); }; draw(); Tome._anim=setInterval(draw,220); } }
};
