// ═══════════════════════════════════════════════════════════════════════
// ║ 26b-tome-elements.js — the element system in the Tome (round 37).
// ║ Kris (Oct 7): "we need to represent all of this in the Tome, and create both a forging tree and tech tree".
// ║   • every monster, item, spell, familiar and mount entry gains its element lines
// ║     (Element · ▲ Weak to · ▽ Resists · forged from · how to get it)
// ║   • three new chapters that are pages, not lists:
// ║       Elements    the wheel, the four steps, what you carry now, what each realm holds, the gems
// ║       Forge tree  the same tree the blacksmith shows (ZForge, 22d), to read anywhere
// ║       Paths       the tech tree: the road through the realms, skills (castles), spells (mage towers),
// ║                   familiar skills (fairies) and how far each forge line has been taken
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof Tome==='undefined'||typeof ZEL==='undefined')return;
  var PAGES={elements:{n:'Elements',i:'🔥',ic:'tm_elements'},forge:{n:'Forge tree',i:'⚒️',ic:'tm_forge'},paths:{n:'Paths',i:'🧭',ic:'tm_paths'}};
  Object.keys(PAGES).forEach(function(k){ TOME_CATS.push({k:k,n:PAGES[k].n,i:PAGES[k].i,page:1}); });
  var QN=['','Grasslands','Wetlands','Highlands','Ashlands'], P={sel:{}};
  var _list=Tome.list; Tome.list=function(cat){ return PAGES[cat]?[]:_list.call(Tome,cat); };

  // ── the elements of a Tome monster id ──
  function monEls(id){ if(MON_EL[id])return {els:MON_EL[id],boss:false}; var m;
    if(id.indexOf('boss_')===0){ var k=id.slice(5); if(BOSS_EL[k])return {els:[BOSS_EL[k]],boss:true}; if((m=k.match(/^isl_(\d)$/)))return {els:[BOSS_EL['isl_boss_'+m[1]]],boss:true}; if(/^vr_|volcano/.test(k))return {els:['fire'],boss:true}; }
    if(typeof CASTLE_ISLANDS!=='undefined'){ var ck=Object.keys(CASTLE_ISLANDS).find(function(x){ return CASTLE_ISLANDS[x].warden===id; }); if(ck)return {els:WARDEN_EL[ck]||[],boss:false,unique:'castle warden'}; }
    if(typeof MAGE_TOWERS!=='undefined'){ var M=MAGE_TOWERS.find(function(x){ return x.boss===id; }); if(M)return {els:MASTER_EL[M.key]||[],boss:false,unique:'tower master'}; }
    var e=ZEL.ofId(id); return {els:e,boss:/^(bf_|boss_)/.test(id)}; }
  function elLines(els,boss,unique){ var L=[];
    L.push(['Element',(els.length?ZElUI.chips(els):ZElUI.none+' <small>— never weak, never resists</small>')+(els.length>1?' <small>— two elements: a unique foe</small>':'')+(boss&&els.length?' <small>— a boss: the right element helps a little, the wrong one hinders a little</small>':'')]);
    return L.concat(ZElUI.versus(els,boss)); }
  function recipeTxt(r){ return Object.keys(r.needs).map(function(k){ return (r.needs[k]>1?r.needs[k]+'× ':'')+ITEMS[k].name; }).join(' + ')+' + '+r.gold+' g'; }
  var GEM_WHERE={0:'Dropped by monsters of its element — alphas, site elites and two-element foes most of all — and given by guardians of that element. The jeweller parts with one at a time, for gold and three Dungeon Coins.',
                 1:'Rare. Never sold. Given once by treasure vaults, island guardians and realm bosses of its element; now and then by a site elite or a hidden cache.'};

  var _entry=Tome.entry;
  Tome.entry=function(cat,id){ var e=_entry.call(Tome,cat,id); if(!e||e._zel)return e; e._zel=1;
    try{
      if(cat==='monster'){ var M=monEls(id), at=e.lines.findIndex(function(l){ return l[0]==='Immune to'; }), add=elLines(M.els,M.boss,M.unique);
        if(M.els.length&&!M.boss)add.push(['Drops','Sometimes '+M.els.map(function(x){ return ITEMS[ZEL.E[x].gem].name; }).join(' or ')+' — more often from an alpha or a site elite']);
        if(at<0)e.lines=e.lines.concat(add); else Array.prototype.splice.apply(e.lines,[at,0].concat(add)); }
      else if(cat==='item'){ var I=ITEMS[id], L=[]; if(!I)return e;
        if(I.el)L.push(['Element',ZElUI.chips(I.el)+(I.slot==='mWeapon'?' <small>— spells of this element do a quarter more</small>':I.el==='all'?' <small>— strikes with whichever is best against the foe</small>':' <small>— '+I.el.map(function(x){ return ZEL.E[x].stN; }).join(', ')+'</small>')]);
        if(I.cls)L.push(['Kind',I.cls==='axe'?'Axe — slower, heavier swings with a longer reach that stagger what they hit':'Crossbow — slower than a bow, hits harder, and the dart passes through one foe. Shoots darts.']);
        if(I.res){ var ks=Object.keys(I.res); L.push(['Protects',ks.length===6?'−'+ZElUI.pct(I.res[ks[0]])+' damage from every element':ks.map(function(x){ return ZElUI.chip(x,'−'+ZElUI.pct(I.res[x])+' '+ZEL.E[x].n.toLowerCase()); }).join('')+' <small>— and that element\'s burning, slowing or poison lasts as much less. All your pieces together stop at −50%.</small>']); }
        if(I.elPow)L.push(['Strengthens',Object.keys(I.elPow).map(function(x){ return ZElUI.chip(x,'+'+ZElUI.pct(I.elPow[x])+' '+ZEL.E[x].n.toLowerCase()); }).join('')]);
        if(I.spellPow)L.push(['Spell power','+'+ZElUI.pct(I.spellPow)+' to every spell']);
        if(I.gemEl){ L.push(['Gem of',ZElUI.chip(I.gemEl)+(I.rare?' <small>— rare: the last step of a forge line, master-works and arbalests</small>':' <small>— forging and gem setting</small>')]); L.push(['Found',GEM_WHERE[I.rare?1:0]]); e.hint='A reward for adventuring'+(I.rare?' — never sold':'')+'.'; }
        var r=typeof ZForge!=='undefined'&&ZForge.recipe(id); if(r){ L.push(['Forged from',recipeTxt(r)]); e.hint='Made at the forge — see the Forge tree.'; }
        var used=CRAFT_RECIPES.filter(function(x){ return x.needs[id]; }).map(function(x){ return ITEMS[x.result].name; }); if(used.length)L.push(['Used for',used.slice(0,8).join(', ')+(used.length>8?' …':'')]);
        if(ZEL.SETTABLE[I.slot]&&!I.sov){ var c=ZEL.carried(I).length; L.push(['Gem setting',c>=2?'Holds two elements already.':'The jeweller can set '+(2-c)+' gem'+(2-c>1?'s':'')+' into it.']); }
        if(I.sov){ var SS=typeof ZSov!=='undefined'&&ZSov.setOf(id), ps9=Tome.ps(), pr=SS&&ps9?ZSov.progress(ps9).find(function(x){ return x.piece===id; }):null; e.hint=SS?'One piece of the Sovereign set. '+SS.how+'.':'One piece of the Sovereign set.';
          L.push(['Set','The Sovereign set: one piece of every kind, each carrying all six elements. Each piece is the reward for finishing one whole part of the journey.']); if(SS)L.push(['Won by',SS.how+(pr?' — <b>'+pr.have+' / '+pr.of+'</b>'+(pr.got?' ✓':''):'')]); }
        if(I.old)L.push(['Note','No longer sold — the potions were cut to one of each strength.']);
        if(I.skillId&&ZEL.SKILL[I.skillId])L.push(['Element',ZElUI.chip(ZEL.SKILL[I.skillId])]);
        if(id==='night_edge')e.hint='In the chest of the Ashlands boss tower.';
        e.lines=e.lines.concat(L); }
      else if(cat==='spell'){ var se=ZEL.SPELL[id]; e.lines.push(['Element',se?ZElUI.chip(se)+' <small>— a staff of the same element makes it a quarter stronger</small>':ZElUI.none+' <small>— works the same on everything</small>']); if(se)e.lines=e.lines.concat(ZElUI.versus([ZEL.E[se].beats]).slice(0,0)); e.lines.push(['Grows','With your level (3% a level) and with mage gear.']);
        if(se)e.lines.push(['Best against',ZElUI.chip(ZEL.E[se].beats)+' foes']); }
      else if(cat==='familiar'){ var fe=typeof FAM_EL!=='undefined'&&FAM_EL[id]; if(fe){ e.lines.push(['Element',ZElUI.chip(fe)]); e.lines.push(['Best against',ZElUI.chip(ZEL.E[fe].beats)+' foes <small>— a little stronger (familiars gain less from a weakness than you do)</small>']); e.lines.push(['Poor against',ZEL.resists(fe).length?ZEL.LIST.filter(function(d){ return ZEL.rel(fe,d)<0; }).map(function(d){ return ZElUI.chip(d); }).join('')+' foes':'—']); } }
      else if(cat==='mount'){ var Mo=MOUNTS[id]; if(Mo&&Mo.src){ e.lines.push(['How to get it',Mo.src]); e.hint=Mo.src; } }
    }catch(err){ if(typeof console!=='undefined')console.warn('tome elements',cat,id,err); }
    return e; };

  // ── pages ──
  function psNow(){ return Tome.ps(); }
  function realmCounts(){ if(P._rc)return P._rc; var o={1:{},2:{},3:{},4:{}}; MON_ROSTER.forEach(function(R){ var e=MON_EL[R.id]; if(!e||!o[R.q])return; (e.length?e:['none']).forEach(function(x){ o[R.q][x]=(o[R.q][x]||0)+1; }); }); return (P._rc=o); }
  function wheel(){ var pos={water:[150,22],fire:[262,112],grass:[150,202],earth:[38,112],storm:[400,62],shadow:[400,162]}, sel=P.sel.el;
    var h='<div class="ze-wheel"><svg viewBox="0 0 470 240" width="470" height="240"><defs><marker id="zeA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#8a6a3a"/></marker></defs>'+
      '<g fill="none" stroke="#8a6a3a" stroke-width="2.4" marker-end="url(#zeA)"><path d="M186 44 Q236 56 252 92"/><path d="M252 150 Q236 190 190 208"/><path d="M112 208 Q62 190 50 150"/><path d="M50 92 Q62 52 112 40"/></g>'+
      '<g fill="none" stroke="#8a6a3a" stroke-width="2.4" marker-end="url(#zeA)" marker-start="url(#zeA)"><path d="M400 96 L400 142"/></g>'+
      '<text x="150" y="126" text-anchor="middle" font-size="11" fill="#6a5030" font-family="Georgia,serif" font-style="italic">each beats the next</text><text x="400" y="222" text-anchor="middle" font-size="11" fill="#6a5030" font-family="Georgia,serif" font-style="italic">each beats the other</text></svg>';
    ZEL.LIST.forEach(function(e){ h+='<button class="ze-n'+(sel===e?' sel':'')+'" data-tel="'+e+'" style="left:'+pos[e][0]+'px;top:'+pos[e][1]+'px;--zc:'+ZEL.E[e].col+'">'+ZIcon.html(ZEL.E[e].ic,ZEL.E[e].em,1.9)+'<b>'+ZEL.E[e].n+'</b></button>'; });
    return h+'</div>'; }
  function pageElements(ps){ var S=ZHit.sums(ps), hm=ZHit.hero('melee'), hr=ZHit.hero('ranged'), tome=ps&&ps.equip&&ITEMS[ps.equip.spell], se=tome&&ZEL.SPELL[tome.spellId], RC=realmCounts();
    var h='<div class="ze"><section class="tome-sec ze-top"><h4>The six elements</h4>'+wheel()+
      '<div class="ze-steps"><div><b class="up">▲▲ Bane</b><span>a two-element weapon finds two weaknesses at once: the hit is doubled and its effect always lands</span></div><div><b class="up">▲ Weak</b><span>your element beats the foe\'s: half again as much</span></div>'+
      '<div><b class="dn">▽ Resists</b><span>the foe is your element, or its element beats yours: a good deal less</span></div><div><b class="dn">▽▽ Warded</b><span>both of a two-element foe\'s elements turn your hit: barely a scratch</span></div>'+
      '<div><b>Bosses</b><span>one element each; the right element only helps a little</span></div><div><b>Two elements</b><span>a weapon strikes with its better one; a foe\'s two add up — a weakness and a resistance cancel</span></div></div>'+
      (function(){ var E=ZEL.dl(), D=typeof ZDiff!=='undefined'?ZDiff.cur(ps):null, x=function(v){ return '×'+(Math.round(v*100)/100); }; return '<p class="ze-note ze-diff">On '+(D?D.icon+' '+D.name:'this level')+': Bane '+x(E.bane)+' · Weak '+x(E.weak)+' · Resists '+x(E.res)+' · Warded '+x(E.ward)+' · a boss '+x(E.bossUp)+' / '+x(E.bossDown)+' · your resistance at most '+Math.round(E.resCap*100)+' %. Harder levels pay less for a weakness and more for a resistance.</p>'; })()+'</section>';
    var res=ZEL.LIST.filter(function(e){ return S.res[e]>0; }).map(function(e){ return ZElUI.chip(e,'−'+ZElUI.pct(S.res[e])+' '+ZEL.E[e].n.toLowerCase()); }).join('');
    h+='<section class="tome-sec"><h4>What you carry now</h4><dl class="ze-dl"><dt>Sword or axe</dt><dd>'+(hm.els==='all'||hm.els.length?ZElUI.chips(hm.els):ZElUI.none)+'</dd><dt>Bow or crossbow</dt><dd>'+(hr.els==='all'||hr.els.length?ZElUI.chips(hr.els):ZElUI.none)+' <small>element arrows add theirs</small></dd><dt>Spell</dt><dd>'+(tome?tome.name+' '+(se?ZElUI.chip(se):ZElUI.none):'none readied')+'</dd><dt>You resist</dt><dd>'+(res||'nothing yet <small>— armor with an element, gems set by the jeweller, or a ward draught</small>')+'</dd></dl></section>';
    h+='<section class="tome-sec"><h4>What each realm holds</h4><table class="ze-t"><tr><th>Realm</th>'+ZEL.LIST.map(function(e){ return '<th>'+ZIcon.html(ZEL.E[e].ic,ZEL.E[e].em,1.3)+'</th>'; }).join('')+'<th>Bring</th></tr>'+[1,2,3,4].map(function(q){ var c=RC[q], top=ZEL.LIST.slice().sort(function(a,b){ return (c[b]||0)-(c[a]||0); }).slice(0,2), bring=[]; top.forEach(function(d){ ZEL.weakTo(d).forEach(function(a){ if(bring.indexOf(a)<0)bring.push(a); }); });
      return '<tr><td>'+QN[q]+'</td>'+ZEL.LIST.map(function(e){ var n=c[e]||0; return '<td'+(top.indexOf(e)>=0?' class="hi"':'')+'>'+(n||'·')+'</td>'; }).join('')+'<td>'+bring.map(function(a){ return ZElUI.chip(a); }).join('')+'</td></tr>'; }).join('')+'</table><p class="ze-note">Counts of monster kinds. The open land is mostly the realm\'s own element; its towers, dungeons and islands lean on the others.</p></section>';
    h+='<section class="tome-sec"><h4>Gems</h4><table class="ze-t ze-g"><tr><th>Element</th><th>Gem</th><th>Rare gem</th><th>On a weapon it</th></tr>'+ZEL.LIST.map(function(e){ var E=ZEL.E[e]; return '<tr><td>'+ZElUI.chip(e)+'</td><td>'+ZIcon.item(E.gem,1.4)+' '+ITEMS[E.gem].name+'</td><td>'+ZIcon.item(E.rare,1.4)+' '+ITEMS[E.rare].name+'</td><td>'+E.stN+'</td></tr>'; }).join('')+'</table><p class="ze-note">Gems are the reward for adventuring: guardians give the gems of their own element, strong monsters drop theirs, and chests hold the gems of their realm. The jeweller sells one of each at a time, for gold and Dungeon Coins.</p></section>';
    return h+'</div>'; }
  function detailElement(el){ if(!el)return '<p class="tome-empty">Pick an element on the wheel.</p>'; var E=ZEL.E[el], RC=realmCounts(), where=[1,2,3,4].filter(function(q){ return (RC[q][el]||0)>=5; }).map(function(q){ return QN[q]+' ('+RC[q][el]+')'; });
    var wp=Object.keys(ITEMS).filter(function(k){ var I=ITEMS[k]; return I.el&&I.el!=='all'&&I.el.indexOf(el)>=0&&(I.slot==='lHand'||I.slot==='rHand'||I.slot==='mWeapon'); }).map(function(k){ return ITEMS[k].name; });
    var ar=Object.keys(ITEMS).filter(function(k){ var I=ITEMS[k]; return I.res&&I.res[el]&&!I.sov&&k.indexOf('~')<0; }).map(function(k){ return ITEMS[k].name; });
    var sp=Object.keys(ZEL.SPELL).filter(function(k){ return ZEL.SPELL[k]===el&&k!=='meteor'; }).map(function(k){ return SPELL_DATA[k].name; });
    return '<div class="tome-bigic">'+ZIcon.html(E.ic,E.em,1.5)+'</div><h3>'+E.n+'</h3><div class="tome-sub">'+(E.realm?'The element of the '+QN[E.realm]:el==='storm'?'The element of the sky':'The element of the dark')+'</div><dl>'+
      [['Beats',ZElUI.chip(E.beats)],['Beaten by',ZEL.weakTo(el).map(function(a){ return ZElUI.chip(a); }).join('')],['On a weapon',E.n+' '+E.stN+' — one hit in four, and every time on a Bane'],['Gem',ITEMS[E.gem].name+' · rare: '+ITEMS[E.rare].name],
       ['Found in',where.length?where.join(', '):'towers, crypts and sky — never a whole realm'],['Weapons',wp.join(', ')||'—'],['Spells',sp.join(', ')||'—'],['Armor against it',ar.join(', ')||'gems set by the jeweller']].map(function(l){ return '<dt>'+l[0]+'</dt><dd>'+l[1]+'</dd>'; }).join('')+'</dl>'; }

  // the tech tree
  function pn(cat,id,ic,name,sub,on,el){ return '<button class="zp-node'+(on?' on':'')+(P.sel.pn===cat+':'+id?' sel':'')+'" data-pnode="'+cat+':'+id+'"'+(el&&ZEL.E[el]?' style="--zc:'+ZEL.E[el].col+'"':'')+'>'+ic+'<b>'+name+'</b><i>'+sub+'</i>'+(on?'<s>✓</s>':'')+'</button>'; }
  function pagePaths(ps){ ps=ps||{}; var cq=ps.completedQuests||[], ul=ps.unlockedSections||[1], h='<div class="zp">';
    // 1. the road
    h+='<section class="tome-sec"><h4>The road through the realms</h4><div class="zp-road">'+[1,2,3,4].map(function(q){ var open=ul.indexOf(q)>=0, tw=cq.indexOf('s'+q+'_tower')>=0, dg=cq.indexOf('s'+q+'_dungeon')>=0, hb=cq.indexOf('s'+q+'_harbor')>=0, sk=cq.indexOf('s'+q+'_skyport')>=0, C=CRAFTSMEN[q], rw=BOSS_REWARDS['s'+q+'_dungeon'], fe=Object.keys(SPIRIT_ELEMENTS).find(function(k){ return SPIRIT_ELEMENTS[k].q===q; });
      return '<div class="zp-realm'+(open?' on':'')+'"><h5>'+ZElUI.chip(fe)+' '+QN[q]+'</h5><ul><li class="'+(tw?'on':'')+'">★ Tower — free '+C.n+(q<4?' → opens the '+QN[q+1]:' → opens the Sky Ports')+'</li><li class="'+(dg?'on':'')+'">★ Dungeon — '+MOUNTS[rw.mount].n+(q<4?' (crosses the '+QN[q+1]+')':' (crosses everything)')+'</li><li class="'+(hb?'on':'')+'">Island — the '+SPIRIT_ELEMENTS[fe].name.toLowerCase()+' familiar</li><li class="'+(sk?'on':'')+'">Sky Port — '+MOUNTS[{1:'sky_glider',2:'storm_drake',3:'ember_phoenix',4:'void_serpent'}[q]].n+'</li></ul></div>'; }).join('')+'</div>'+
      '<p class="ze-note">Each realm\'s tower opens the next realm. All sixteen done: the Dragon. All four Sky Ports: the Sky Eagle.</p></section>';
    // 2. skills
    h+='<section class="tome-sec"><h4>Skills — taught by the masters held in the island castles</h4>'+[1,2,3,4].map(function(q){ return '<div class="zp-row"><span class="zp-q">'+QN[q]+'</span>'+Object.keys(CASTLE_ISLANDS).filter(function(k){ return CASTLE_ISLANDS[k].sec===q; }).map(function(k){ var C=CASTLE_ISLANDS[k], I=ITEMS[C.skill], on=(ps.castlesDone||[]).indexOf(k)>=0||ZForge.owns(ps,C.skill); return pn('item',C.skill,ZIcon.item(C.skill,2),I.name,C.name,on,ZEL.SKILL[I.skillId]); }).join('')+'</div>'; }).join('')+'</section>';
    // 3. spells
    h+='<section class="tome-sec"><h4>Spells — won from the masters of the mage towers</h4>'+[1,2,3,4].map(function(q){ return '<div class="zp-row"><span class="zp-q">'+QN[q]+'</span>'+MAGE_TOWERS.filter(function(M){ return M.q===q; }).map(function(M){ var I=ITEMS[M.spell], on=(ps.mageDone||[]).indexOf(M.key)>=0||ZForge.owns(ps,M.spell), e=ZEL.SPELL[I.spellId]; return pn('spell',I.spellId,ZIcon.item(M.spell,2),I.name,M.name.replace(/^The /,''),on,e); }).join('')+'</div>'; }).join('')+'</section>';
    // 4. familiars
    h+='<section class="tome-sec"><h4>Familiars — each fairy lesson opens the next skill</h4>'+['grass','water','earth','fire'].map(function(el){ var fid=FAM_BY_EL[el], own=(ps.ownedFamiliars||[]).indexOf(fid)>=0, L=own?_famLevel(ps,fid):0, D=_famDesign(fid);
      return '<div class="zp-row"><span class="zp-q">'+ZElUI.chip(el)+'<br><small>'+D.name+'</small></span>'+FAM_SKILLS[el].map(function(S,i){ return pn('familiar',fid,'<span class="zp-lv">'+(i?'Lv '+(i+1):'Base')+'</span>',S.name,S.kind,i<L,el); }).join('')+'</div>'; }).join('')+'</section>';
    // 5. the Sovereign set
    if(typeof ZSov!=='undefined'){ h+='<section class="tome-sec"><h4>The Sovereign set — one piece for each finished part of the journey</h4><div class="zp-row">'+ZSov.progress(ps).map(function(P){ return pn('item',P.piece,ZIcon.item(P.piece,2),P.name.replace('Sovereign ',''),P.have+' / '+P.of,P.got,null); }).join('')+'</div><p class="ze-note">The Elemental Sovereign sword is forged: the three greatest swords and a Skystone.</p></section>'; }
    // 6. forge
    h+='<section class="tome-sec"><h4>The forge — how far each line has been taken</h4>'+ZForge.LANES.map(function(L){ var n=L.nodes.slice(1).filter(function(id){ return ZForge.made(ps,id)||ZForge.owns(ps,id); }).length; return '<div class="zp-bar"><span>'+ZElUI.chips(L.el)+' '+L.n+'</span><i><u style="width:'+(n/4*100)+'%;background:'+ZEL.E[L.el[0]].col+'"></u></i><b>'+n+' / 4</b></div>'; }).join('')+
      (function(){ var X=ZForge.XBOW.t1.concat(ZForge.XBOW.t2), D=ZForge.DUAL, f=function(A){ return A.filter(function(id){ return ZForge.made(ps,id)||ZForge.owns(ps,id); }).length; }; return '<div class="zp-bar"><span>Crossbows and arbalests</span><i><u style="width:'+(f(X)/X.length*100)+'%"></u></i><b>'+f(X)+' / '+X.length+'</b></div><div class="zp-bar"><span>Two-element master-works</span><i><u style="width:'+(f(D)/D.length*100)+'%"></u></i><b>'+f(D)+' / '+D.length+'</b></div>'; })()+
      '<p class="ze-note"><button class="zp-link" data-tcat="forge">Open the Forge tree ➜</button></p></section>';
    return h+'</div>'; }
  function detailEntry(cat,id){ var e=Tome.entry(cat,id); if(!e)return '<p class="tome-empty">Pick a step to read about it.</p>'; var ic=cat==='item'?ZIcon.item(id,1.5):cat==='spell'?ZIcon.item(Object.keys(ITEMS).find(function(k){ return ITEMS[k].spellId===id; })||'',1.5):(e.icon||'');
    return '<div class="tome-bigic">'+ic+'</div><h3>'+e.name+'</h3><div class="tome-sub">'+e.sub+'</div><p class="tome-hint">'+(e.hint||'')+'</p><dl>'+e.lines.map(function(l){ return '<dt>'+l[0]+'</dt><dd>'+l[1]+'</dd>'; }).join('')+'</dl>'; }

  var _render=Tome.render;
  Tome.render=function(){ _render.call(Tome); var cat=Tome.ui.cat, tabs=document.getElementById('tome-tabs'), grid=document.getElementById('tome-grid'), det=document.getElementById('tome-detail'); if(!tabs||!grid||!det)return;
    Object.keys(PAGES).forEach(function(k){ var b=tabs.querySelector('[data-tcat="'+k+'"]'); if(b)b.innerHTML=ZIcon.html(PAGES[k].ic,PAGES[k].i,1.35)+' '+PAGES[k].n; });
    grid.classList.toggle('tome-page',!!PAGES[cat]); if(!PAGES[cat])return; var ps=psNow();
    try{
      if(cat==='elements'){ grid.innerHTML=pageElements(ps); det.innerHTML=detailElement(P.sel.el); }
      else if(cat==='forge'){ grid.innerHTML='<p class="ze-note" style="margin:0 0 8px">The blacksmith in the village forges these. Pick a weapon to see what it takes.</p>'+ZForge.html(ps).replace(/zf-node sel/g,'zf-node').replace('data-fnode="'+P.sel.fn+'"','data-fnode="'+P.sel.fn+'" data-on="1"'); det.innerHTML=P.sel.fn?ZForge.detail(ps,P.sel.fn,false)+detailEntry('item',P.sel.fn):'<p class="tome-empty">Pick a weapon in the tree.</p>'; }
      else if(cat==='paths'){ grid.innerHTML=pagePaths(ps); var s=(P.sel.pn||'').split(':'); det.innerHTML=s.length===2?detailEntry(s[0],s[1]):'<p class="tome-empty">Everything that can be learned, won or forged, and what you have so far. Pick a step to read about it.</p>'; }
    }catch(err){ grid.innerHTML='<p class="tome-empty">This page could not be drawn.</p>'; if(typeof console!=='undefined')console.warn('tome page',cat,err); }
    if(typeof ZIcon!=='undefined'){ ZIcon.hydrate(grid); ZIcon.hydrate(det); } };
  if(typeof document!=='undefined')document.addEventListener('click',function(e){ if(!e.target.closest)return; var m=e.target.closest('#modal-tome'); if(!m)return; var t;
    if((t=e.target.closest('[data-tel]'))){ P.sel.el=t.getAttribute('data-tel'); Tome.render(); }
    else if((t=e.target.closest('[data-fnode]'))&&Tome.ui.cat==='forge'){ P.sel.fn=t.getAttribute('data-fnode'); Tome.render(); }
    else if((t=e.target.closest('[data-pnode]'))){ P.sel.pn=t.getAttribute('data-pnode'); Tome.render(); } },true);      // (capture: the panel stops clicks from bubbling)
  Tome._pages=P;
})();
