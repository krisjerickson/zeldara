// ═══════════════════════════════════════════════════════════════════════
// ║ 26d-tome-fits.js — round 45: the Tome's "How it all fits" chapter.
// ║ Kris (Oct 10): "i'm thinking of other ways to show and visualize how all the elements, monsters, spells, skills and sections of the game
// ║ can be shows for the player to better understand how all this works together" → six ideas in the Lab (60-lab-codex.js); he picked all six
// ║ ("Let's add these somewhere into the tome") and answered: one chapter with six pages; FOUND ONLY — what the player has not met, won or
// ║ visited shows as a dim "?" and the next step glows; the realm view is also a switch on the world map (B) — 21-ui.js _wmRealms.
// ║ Pages: Stars (what you learn and win, a constellation per realm) · Compass (the six elements: yours vs the foes) · Matchups (what you
// ║ carry against each element) · Realms (the world map tinted by element, what each place gives) · Journey (the road, milestone by
// ║ milestone) · Web (pick an element: everything tied to it).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof Tome==='undefined'||typeof ZEL==='undefined')return;
  TOME_CATS.push({k:'fits',n:'How it all fits',i:'✨',page:1});
  var _list=Tome.list; Tome.list=function(cat){ return cat==='fits'?[]:_list.call(Tome,cat); };
  var F={pg:'stars',sel:null,el:'fire'}, QN=['','Grasslands','Wetlands','Highlands','Ashlands'], REL={1:'grass',2:'water',3:'earth',4:'fire'};
  var PAGES=[['stars','Stars','✦','Everything you can learn or win, one constellation per realm. Lit stars are yours; the next one in each line twinkles; the rest wait as "?".'],
    ['compass','Compass','🧭','The six elements. Inside: what you carry of each. Outside: the foes of each you have met. A red edge means nothing of yours beats that element yet.'],
    ['grid','Matchups','▦','Everything you carry, against each element of foe. Pick a column to see the foes of that element you have met.'],
    ['realms','Realms','🗺️','The world tinted by each realm\'s element, and what each place you have found gives. (The same view is a switch on the map: B → Realms.)'],
    ['journey','Journey','🛤️','The road through the four realms, milestone by milestone. The marker shows where you are and what comes next.'],
    ['web','Web','🕸️','Pick an element and follow its threads: its weapons, spells, familiar, gem, realm, the foes it beats and the guardians who wield it.']];
  var E=ZEL.E, L=ZEL.LIST, esc=function(s){ return String(s==null?'':s).replace(/[<>&"]/g,function(c){ return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); };
  function ps(){ return Tome.ps()||{}; }
  function book(){ return Tome.book()||{}; }
  function has(cat,id){ var b=book(); return !!(b[cat]&&b[cat][id]); }
  function owns(id){ return typeof ZForge!=='undefined'&&ZForge.owns(ps(),id); }
  function els(I){ if(!I||!I.el)return []; if(I.el==='all')return L.slice(); return [].concat(I.el).filter(function(e){ return E[e]; }); }
  var WSLOT={lHand:1,rHand:1,mWeapon:1};
  function weapons(){ return Object.keys(ITEMS).filter(function(k){ var I=ITEMS[k]; return I&&WSLOT[I.slot]&&k.indexOf('~')<0&&els(I).length; }); }
  function learned(k){ return !!k&&(((ps().spellsLearned)||[]).indexOf(k)>=0||owns(k)); }
  function spellKey(sid){ return Object.keys(ITEMS).find(function(k){ return ITEMS[k].spellId===sid; }); }
  function monList(){ if(monList._v)return monList._v; var out=[]; Tome.list('monster').forEach(function(id){ var M=Tome._monEls?Tome._monEls(id):{els:[]}; out.push({id:id,els:M.els||[],boss:!!M.boss||id.indexOf('boss_')===0}); }); return (monList._v=out); }
  // a node: [cat,id,label,html-icon,won,found]
  function node(cat,id,name,em,won){ var found=won||has(cat,id); return {cat:cat,id:id,name:found?name:'?',ic:found?Tome.pic(cat,id,{icon:em},1.3):'<span class="zf-q">?</span>',won:!!won,found:found}; }

  // ── 1. stars ───────────────────────────────────────────────────────
  function realmLines(q){ var P=ps(), el=REL[q], out=[];
    // skills of the realm's castles
    out.push({n:'Skills',items:Object.keys(CASTLE_ISLANDS).filter(function(k){ return CASTLE_ISLANDS[k].sec===q; }).map(function(k){ var C=CASTLE_ISLANDS[k], I=ITEMS[C.skill]; return node('item',C.skill,I?I.name:k,I&&I.icon,(P.castlesDone||[]).indexOf(k)>=0||owns(C.skill)); })});
    // spells of the realm's mage towers
    if(typeof MAGE_TOWERS!=='undefined')out.push({n:'Spells',items:MAGE_TOWERS.filter(function(M){ return M.q===q; }).map(function(M){ var I=ITEMS[M.spell]; return node('spell',I?I.spellId:M.spell,I?I.name:M.spell,I&&I.icon,(P.mageDone||[]).indexOf(M.key)>=0||learned(M.spell)); })});
    // the familiar's lessons
    if(typeof FAM_SKILLS!=='undefined'&&FAM_SKILLS[el]){ var fid=FAM_BY_EL[el], own=(P.ownedFamiliars||[]).indexOf(fid)>=0, lv=own?_famLevel(P,fid):0;
      out.push({n:'Familiar',items:FAM_SKILLS[el].map(function(S,i){ var n=node('familiar',fid,S.name,'🌟',i<lv); n.sub=i?'Lv '+(i+1):'Base'; return n; })}); }
    // the forge lines of the realm's element
    if(typeof ZForge!=='undefined')ZForge.LANES.filter(function(Ln){ return Ln.el[0]===el; }).forEach(function(Ln){ out.push({n:Ln.n,items:Ln.nodes.slice(1).map(function(id){ var I=ITEMS[id]; return node('item',id,I?I.name:id,I&&I.icon,owns(id)||ZForge.made(P,id)); })}); });
    // mounts won in the realm
    var cq=P.completedQuests||[], mt=[]; try{ var rw=BOSS_REWARDS['s'+q+'_dungeon']; if(rw&&MOUNTS[rw.mount])mt.push(node('mount',rw.mount,MOUNTS[rw.mount].n,MOUNTS[rw.mount].icon,cq.indexOf('s'+q+'_dungeon')>=0)); }catch(e){}
    var sk={1:'sky_glider',2:'storm_drake',3:'ember_phoenix',4:'void_serpent'}[q]; if(MOUNTS[sk])mt.push(node('mount',sk,MOUNTS[sk].n,MOUNTS[sk].icon,cq.indexOf('s'+q+'_skyport')>=0));
    if(mt.length)out.push({n:'Mounts',items:mt});
    return out; }
  function pageStars(){ var W=760, H=620, s='<svg class="zfit-svg" viewBox="0 0 '+W+' '+H+'" width="100%"><defs><radialGradient id="zfG"><stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient></defs>';
    s+='<rect width="'+W+'" height="'+H+'" rx="12" fill="#0a0e1e"/>';
    for(var i=0;i<140;i++){ s+='<circle cx="'+((i*97)%W)+'" cy="'+((i*57+i*i)%H)+'" r="'+(i%5?0.7:1.1)+'" fill="#fff" opacity="'+(0.15+(i%7)*0.05)+'"/>'; }
    [1,2,3,4].forEach(function(q){ var cx=q%2?200:560, cy=q<3?160:460, el=REL[q], col=E[el].col, lines=realmLines(q), n=lines.length;
      s+='<text x="'+cx+'" y="'+(cy-128)+'" text-anchor="middle" class="zfit-rn" fill="'+col+'">'+E[el].em+' '+QN[q]+'</text>';
      lines.forEach(function(Ln,k){ var a=-Math.PI/2+(k+0.5)/n*Math.PI*2, pts=Ln.items.map(function(it,j){ var r=28+j*(96/Math.max(3,Ln.items.length)); var w=Math.sin(j*1.7+q)*0.16; return [cx+Math.cos(a+w)*r*1.25,cy+Math.sin(a+w)*r]; });
        s+='<polyline points="'+[[cx,cy]].concat(pts).map(function(p){ return p[0].toFixed(1)+','+p[1].toFixed(1); }).join(' ')+'" fill="none" stroke="'+col+'" stroke-opacity=".35" stroke-width="1.2"/>';
        var nextDone=false;
        Ln.items.forEach(function(it,j){ var p=pts[j], next=!it.won&&!nextDone; if(next)nextDone=true; var r=it.won?6:next?4.6:3.4, key=it.cat+':'+it.id+(it.sub?':'+j:'');
          if(it.won)s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="14" fill="url(#zfG)" opacity=".5"/>';
          s+='<g class="zfit-n'+(next?' zfit-next':'')+(F.sel===key?' on':'')+'" data-fsel="'+key+'"><circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+r+'" fill="'+(it.won?'#fff6c8':col)+'" opacity="'+(it.won?1:it.found?0.75:0.4)+'"/><title>'+esc(it.found?it.name+(it.sub?' ('+it.sub+')':''):'? — still to find')+'</title>'+
            '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="12" fill="transparent"/></g>'; });
        var lp=[cx+Math.cos(a)*150,cy+Math.sin(a)*112]; s+='<text x="'+lp[0]+'" y="'+lp[1]+'" text-anchor="middle" class="zfit-ln" fill="'+col+'">'+esc(Ln.n)+'</text>'; });
      var won=0, all=0; lines.forEach(function(Ln){ Ln.items.forEach(function(it){ all++; if(it.won)won++; }); }); s+='<circle cx="'+cx+'" cy="'+cy+'" r="16" fill="'+col+'" opacity=".22"/><text x="'+cx+'" y="'+(cy+4)+'" text-anchor="middle" class="zfit-c">'+won+'/'+all+'</text>'; });
    s+='<text x="'+(W-12)+'" y="'+(H-12)+'" text-anchor="end" class="zfit-key">● lit: yours   ● twinkling: next   · dim: still to find</text>';
    return s+'</svg>'; }
  function findStar(key){ var k=key.split(':'), out=null; [1,2,3,4].forEach(function(q){ realmLines(q).forEach(function(Ln){ Ln.items.forEach(function(it,j){ if(it.cat===k[0]&&it.id===k[1]&&(!it.sub||+k[2]===j))out={it:it,line:Ln.n,q:q}; }); }); }); return out; }

  // ── 2. compass ─────────────────────────────────────────────────────
  function compassData(){ var P=ps(), D={}; L.forEach(function(e){ D[e]={mine:[],foes:0,foesAll:0}; });
    weapons().forEach(function(k){ if(!owns(k))return; els(ITEMS[k]).forEach(function(e){ D[e].mine.push(['item',k]); }); });
    Object.keys(SPELL_DATA||{}).forEach(function(sid){ var e=ZEL.SPELL[sid], k=spellKey(sid); if(!e||!D[e])return; if(learned(k))D[e].mine.push(['spell',sid]); });
    (P.ownedFamiliars||[]).forEach(function(fid){ var e=FAM_EL[fid]; if(D[e])D[e].mine.push(['familiar',fid]); });
    monList().forEach(function(m){ m.els.forEach(function(e){ if(!D[e])return; D[e].foesAll++; if(has('monster',m.id))D[e].foes++; }); });
    L.forEach(function(d){ D[d].beat=L.some(function(a){ return ZEL.rel(a,d)>0&&D[a].mine.length; }); });
    return D; }
  function pageCompass(){ var D=compassData(), S=640, C=S/2, ANG={}, s='<svg class="zfit-svg" viewBox="0 0 '+S+' '+S+'" width="100%">'; s+='<rect width="'+S+'" height="'+S+'" rx="12" fill="#efe4c8"/>';
    L.forEach(function(e,i){ ANG[e]=-90+i*60; });
    var pol=function(d,r){ var a=d*Math.PI/180; return [C+Math.cos(a)*r,C+Math.sin(a)*r]; };
    var arc=function(d0,d1,r0,r1){ var a=pol(d0,r1), b=pol(d1,r1), c=pol(d1,r0), d=pol(d0,r0); return 'M'+a+' A'+r1+' '+r1+' 0 0 1 '+b+' L'+c+' A'+r0+' '+r0+' 0 0 0 '+d+'Z'; };
    L.forEach(function(e){ var a0=ANG[e]-29, a1=ANG[e]+29, x=D[e], sel=F.el===e;
      s+='<g class="zfit-n'+(sel?' on':'')+'" data-fel="'+e+'">';
      s+='<path d="'+arc(a0,a1,58,128)+'" fill="'+E[e].col+'" fill-opacity="'+(sel?0.6:0.42)+'" stroke="#6a5030" stroke-opacity=".4"/>';
      s+='<path d="'+arc(a0,a1,132,218)+'" fill="'+E[e].col+'" fill-opacity="'+(sel?0.38:0.22)+'" stroke="#6a5030" stroke-opacity=".4"/>';
      s+='<path d="'+arc(a0,a1,222,290)+'" fill="'+E[e].col+'" fill-opacity="'+(sel?0.24:0.12)+'" stroke="#6a5030" stroke-opacity=".4"/>';
      if(x.foes&&!x.beat)s+='<path d="'+arc(a0+1,a1-1,286,294)+'" fill="#d02020" class="zfit-gap"/>';
      var p=pol(ANG[e],92); s+='<text x="'+p[0]+'" y="'+(p[1]+6)+'" text-anchor="middle" font-size="22">'+E[e].em+'</text><text x="'+p[0]+'" y="'+(p[1]+24)+'" text-anchor="middle" class="zfit-t">'+E[e].n+'</text>';
      p=pol(ANG[e],176); s+='<text x="'+p[0]+'" y="'+(p[1]+5)+'" text-anchor="middle" class="zfit-b">'+x.mine.length+'</text><text x="'+p[0]+'" y="'+(p[1]+20)+'" text-anchor="middle" class="zfit-t">yours</text>';
      p=pol(ANG[e],256); s+='<text x="'+p[0]+'" y="'+(p[1]+5)+'" text-anchor="middle" class="zfit-b">'+x.foes+'</text><text x="'+p[0]+'" y="'+(p[1]+20)+'" text-anchor="middle" class="zfit-t">foes met</text></g>'; });
    s+='<circle cx="'+C+'" cy="'+C+'" r="54" fill="#f7efdc" stroke="#6a5030" stroke-opacity=".35"/><text x="'+C+'" y="'+(C-4)+'" text-anchor="middle" class="zfit-t">you</text><text x="'+C+'" y="'+(C+14)+'" text-anchor="middle" class="zfit-t">vs. them</text>';
    return s+'</svg>'; }
  function detailCompass(e){ var D=compassData()[e], h='<h3>'+E[e].em+' '+E[e].n+'</h3><div class="tome-sub">Beats '+E[E[e].beats].n+' · '+(e==='storm'||e==='shadow'?'storm and shadow beat each other':'is beaten by '+E[L.find(function(a){ return E[a].beats===e; })].n)+'</div>';
    h+='<h4 class="zfit-h">Yours ('+D.mine.length+')</h4>'+(D.mine.length?'<div class="zfit-chips">'+D.mine.map(function(m){ var en=Tome.entry(m[0],m[1]); return '<span data-fsel="'+m[0]+':'+m[1]+'">'+Tome.pic(m[0],m[1],en,1.2)+' '+esc(en?en.name:m[1])+'</span>'; }).join('')+'</div>':'<p class="tome-hint">Nothing of this element yet.</p>');
    var beaters=L.filter(function(a){ return ZEL.rel(a,e)>0; });
    h+='<h4 class="zfit-h">Against '+E[e].n+' foes</h4><p>'+(D.foes?D.foes+' met of '+D.foesAll+'. ':'None met yet. ')+'Strong against them: '+beaters.map(function(a){ return ZElUI.chip(a); }).join(' ')+(D.foes&&!D.beat?' — <b style="color:#b02020">you carry nothing of these yet.</b>':'')+'</p>';
    return h; }

  // ── 3. matchups ────────────────────────────────────────────────────
  function rows(){ var P=ps(), R=[]; weapons().forEach(function(k){ if(owns(k))R.push({cat:'item',id:k,els:els(ITEMS[k]),n:ITEMS[k].name}); });
    Object.keys(SPELL_DATA||{}).forEach(function(sid){ var e=ZEL.SPELL[sid], k=spellKey(sid); if(e&&learned(k))R.push({cat:'spell',id:sid,els:[e],n:SPELL_DATA[sid].name}); });
    (P.ownedFamiliars||[]).forEach(function(fid){ var e=FAM_EL[fid]; if(e)R.push({cat:'familiar',id:fid,els:[e],n:(FAMILIARS[fid]||{}).n||fid}); });
    return R; }
  function step(atk,d){ if(!atk.length)return 0; var t=0; atk.forEach(function(a){ t+=ZEL.rel(a,d); }); return t; }
  var STEP={2:['Bane','zg-b','▲▲'],1:['Weak','zg-w','▲'],0:['even','zg-e','·'],'-1':['Resists','zg-r','▽'],'-2':['Warded','zg-x','▽▽']};
  function pageGrid(){ var R=rows(), cols=L.slice(), h='<div class="zfit-grid"><table><tr><th></th>'+cols.map(function(e){ return '<th class="zfit-n'+(F.el===e?' on':'')+'" data-fel="'+e+'" style="--zc:'+E[e].col+'">'+E[e].em+'<br><small>'+E[e].n+'</small></th>'; }).join('')+'</tr>';
    if(!R.length)h+='<tr><td colspan="7" class="tome-hint">You carry no element yet — forge an element weapon, learn a spell or win a familiar.</td></tr>';
    R.forEach(function(r){ h+='<tr><th class="zfit-rh" data-fsel="'+r.cat+':'+r.id+'">'+Tome.pic(r.cat,r.id,Tome.entry(r.cat,r.id),1.1)+' '+esc(r.n)+'</th>'+cols.map(function(e){ var t=Math.max(-2,Math.min(2,step(r.els,e))), S=STEP[t]; return '<td class="'+S[1]+(F.el===e?' on':'')+'" title="'+esc(r.n)+' vs '+E[e].n+': '+S[0]+'">'+S[2]+'</td>'; }).join('')+'</tr>'; });
    h+='</table></div><p class="ze-note">▲▲ Bane · ▲ Weak (more damage) · · even · ▽ Resists · ▽▽ Warded (less damage). Things you have not found yet are not listed.</p>';
    return h; }
  function detailGrid(e){ var met=monList().filter(function(m){ return m.els.indexOf(e)>=0&&has('monster',m.id); }), n=monList().filter(function(m){ return m.els.indexOf(e)>=0; }).length;
    return '<h3>'+E[e].em+' '+E[e].n+' foes</h3><div class="tome-sub">'+met.length+' met of '+n+'</div>'+(met.length?'<div class="zfit-chips">'+met.slice(0,60).map(function(m){ var en=Tome.entry('monster',m.id); return '<span data-fsel="monster:'+m.id+'">'+esc(en?en.name:m.id)+'</span>'; }).join('')+'</div>':'<p class="tome-hint">None met yet.</p>'); }

  // ── 4. realms (draws the world map with the realm overlay — 21-ui.js) ──
  function pageRealms(){ return '<div class="zfit-map"><canvas id="zfit-map" width="760" height="760"></canvas></div><div class="zfit-legend">'+[1,2,3,4].map(function(q){ return '<span style="--zc:'+E[REL[q]].col+'">'+E[REL[q]].em+' '+QN[q]+' — '+E[REL[q]].n+'</span>'; }).join('')+'</div>'; }
  function drawRealms(){ var cv=document.getElementById('zfit-map'); if(!cv||typeof _wmDrawView!=='function')return; var ws=game.scene.getScene('World'); if(!ws||!ws.wd)return;
    var ctx=cv.getContext('2d'); try{ _wmDrawView(ctx,cv.width,cv.height,ws,{x:0,y:0,w:WORLD_W,h:WORLD_H},{full:true,realms:true}); }catch(e){ ctx.fillStyle='#223'; ctx.fillRect(0,0,cv.width,cv.height); } }

  // ── 5. journey ─────────────────────────────────────────────────────
  function milestones(q){ var P=ps(), cq=P.completedQuests||[], out=[], C=CRAFTSMEN[q];
    out.push({ic:'🗼',zi:'mk_tower',n:'★ Tower',g:'frees '+(C?C.n:'a craftsman')+(q<4?', opens the '+QN[q+1]:', opens the Sky Ports'),won:cq.indexOf('s'+q+'_tower')>=0,found:has('place','site_s'+q+'_tower')});
    var rw=null; try{ rw=BOSS_REWARDS['s'+q+'_dungeon']; }catch(e){}
    out.push({ic:'⚔️',zi:'mk_dungeon',n:'★ Dungeon',g:rw&&MOUNTS[rw.mount]?'wins the '+MOUNTS[rw.mount].n:'a mount',won:cq.indexOf('s'+q+'_dungeon')>=0,found:has('place','site_s'+q+'_dungeon')});
    var fe=REL[q]; out.push({ic:'⚓',zi:'mk_harbor',n:'Familiar island',g:'the '+E[fe].n.toLowerCase()+' familiar',won:(P.ownedFamiliars||[]).indexOf(FAM_BY_EL[fe])>=0,found:cq.indexOf('s'+q+'_harbor')>=0||(P.ownedFamiliars||[]).indexOf(FAM_BY_EL[fe])>=0});
    Object.keys(CASTLE_ISLANDS).filter(function(k){ return CASTLE_ISLANDS[k].sec===q; }).forEach(function(k){ var CI=CASTLE_ISLANDS[k], I=ITEMS[CI.skill]; out.push({ic:'🏰',zi:'mk_castle',n:CI.name,g:'teaches '+(I?I.name:'a skill'),won:(P.castlesDone||[]).indexOf(k)>=0,found:has('place','castle_'+k)}); });
    if(typeof MAGE_TOWERS!=='undefined')MAGE_TOWERS.filter(function(M){ return M.q===q; }).forEach(function(M){ var I=ITEMS[M.spell]; out.push({ic:'🔮',zi:'mk_mage',n:M.name.replace(/^The /,''),g:'teaches '+(I?I.name:'a spell'),won:(P.mageDone||[]).indexOf(M.key)>=0,found:has('place','site_mage_'+M.key)}); });
    for(var i=0;i<5;i++){ var id='q'+q+'_f'+i, st=(P.fairyQuests||{})[id]; out.push({ic:'🧚',zi:'q_fairy',n:'Fairy lesson '+(i+1),g:'a familiar skill',won:!!(st&&st.st==='done'),found:has('quest',id)}); }
    var kst=(P.fairyQuests||{})['king'+q]; if(typeof FAIRY_KING_OBJECTS!=='undefined'&&FAIRY_KING_OBJECTS[q])out.push({ic:'👑',zi:'q_fairy',n:'Fairy Monarch',g:'the monarch\'s trial',won:!!(kst&&kst.st==='done'),found:has('quest','king'+q)});
    var sk={1:'sky_glider',2:'storm_drake',3:'ember_phoenix',4:'void_serpent'}[q]; out.push({ic:'🎈',zi:'mk_skyport',n:'Sky Port',g:MOUNTS[sk]?'wins the '+MOUNTS[sk].n:'a flying mount',won:cq.indexOf('s'+q+'_skyport')>=0,found:has('place','site_s'+q+'_skyport')||cq.indexOf('s'+q+'_skyport')>=0});
    out.forEach(function(m){ if(m.won)m.found=true; }); return out; }
  function pageJourney(){ var P=ps(), ul=P.unlockedSections||[1], youSet=false, h='<div class="zfit-jy">';
    [1,2,3,4].forEach(function(q){ var open=ul.indexOf(q)>=0, M=milestones(q), done=M.filter(function(m){ return m.won; }).length;
      h+='<section class="zfit-jr'+(open?'':' shut')+'" style="--zc:'+E[REL[q]].col+'"><h5>'+E[REL[q]].em+' '+QN[q]+' <span>'+done+' / '+M.length+'</span>'+(open?'':' <em>— not open yet</em>')+'</h5><div class="zfit-road">';
      M.forEach(function(m){ var you=!youSet&&open&&!m.won; if(you)youSet=true;
        h+='<div class="zfit-ms'+(m.won?' won':'')+(you?' you':'')+(m.found?'':' unk')+'" title="'+esc(m.found?m.n+' — '+m.g:'? — still to find')+'"><i>'+(m.found?ZIcon.html(m.zi,m.ic,1.4):'?')+'</i><b>'+esc(m.found?m.n:'?')+'</b><small>'+esc(m.found?m.g:'')+'</small>'+(you?'<u>you are here</u>':'')+'</div>'; });
      h+='</div></section>'; });
    return h+'</div>'; }

  // ── 6. web ─────────────────────────────────────────────────────────
  function webNodes(e){ var P=ps(), G=[];
    G.push({n:'Weapons',ic:'⚔️',items:weapons().filter(function(k){ return els(ITEMS[k]).indexOf(e)>=0&&ITEMS[k].el!=='all'; }).map(function(k){ return node('item',k,ITEMS[k].name,ITEMS[k].icon,owns(k)); })});
    G.push({n:'Spells',ic:'✨',items:Object.keys(SPELL_DATA||{}).filter(function(sid){ return ZEL.SPELL[sid]===e; }).map(function(sid){ var k=spellKey(sid); return node('spell',sid,SPELL_DATA[sid].name,k&&ITEMS[k].icon,learned(k)); })});
    var fid=Object.keys(FAM_EL||{}).find(function(f){ return FAM_EL[f]===e; }); if(fid)G.push({n:'Familiar',ic:'🌟',items:[node('familiar',fid,(FAMILIARS[fid]||{}).n||fid,'🌟',(P.ownedFamiliars||[]).indexOf(fid)>=0)]});
    var gems=[E[e].gem,E[e].rare].filter(function(k){ return ITEMS[k]; }); G.push({n:'Gems',ic:'💎',items:gems.map(function(k){ return node('item',k,ITEMS[k].name,ITEMS[k].icon,owns(k)); })});
    if(E[e].realm)G.push({n:'Realm',ic:'🗺️',items:[{cat:'realm',id:E[e].realm,name:QN[E[e].realm],ic:ZIcon.html('mk_village','🗺️',1.3),won:(P.unlockedSections||[1]).indexOf(E[e].realm)>=0,found:(P.unlockedSections||[1]).indexOf(E[e].realm)>=0}]});
    var foes=monList().filter(function(m){ return !m.boss&&m.els.some(function(d){ return ZEL.rel(e,d)>0; }); }), bos=monList().filter(function(m){ return m.boss&&m.els.indexOf(e)>=0; });
    G.push({n:'Foes it beats',ic:'👹',items:foes.map(function(m){ var en=Tome.entry('monster',m.id); return node('monster',m.id,en?en.name:m.id,'👹',false); }),big:1});
    G.push({n:'Guardians who wield it',ic:'👑',items:bos.map(function(m){ var en=Tome.entry('monster',m.id); return node('monster',m.id,en?en.name:m.id,'👑',false); }),big:1});
    return G; }
  function pageWeb(){ var e=F.el, G=webNodes(e), h='<div class="zfit-elbar">'+L.map(function(a){ return '<button class="zfit-n'+(a===e?' on':'')+'" data-fel="'+a+'" style="--zc:'+E[a].col+'">'+ZIcon.html(E[a].ic,E[a].em,1.2)+' '+E[a].n+'</button>'; }).join('')+'</div>';
    var W=760, H=560, cx=W/2, cy=H/2, s='<svg class="zfit-svg" viewBox="0 0 '+W+' '+H+'" width="100%"><rect width="'+W+'" height="'+H+'" rx="12" fill="#0b0f18"/>';
    G.forEach(function(g,i){ var a=-Math.PI/2+i/G.length*Math.PI*2, gx=cx+Math.cos(a)*150, gy=cy+Math.sin(a)*120, found=g.items.filter(function(x){ return x.found; }), unk=g.items.length-found.length;
      s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+gx+'" y2="'+gy+'" stroke="'+E[e].col+'" stroke-opacity=".7" stroke-width="2"/>';
      var show=found.slice(0,g.big?7:6); show.forEach(function(it,j){ var b=a+(j-(show.length-1)/2)*0.17, r=g.big?232:222, x=cx+Math.cos(b)*r*1.32, y=cy+Math.sin(b)*r*0.98;
        s+='<line x1="'+gx+'" y1="'+gy+'" x2="'+x+'" y2="'+y+'" stroke="'+E[e].col+'" stroke-opacity=".3"/><g class="zfit-n" data-fsel="'+it.cat+':'+it.id+'"><circle cx="'+x+'" cy="'+y+'" r="6" fill="'+(it.won?'#fff6c8':E[e].col)+'"/><text x="'+x+'" y="'+(y-10)+'" text-anchor="middle" class="zfit-wl">'+esc(it.name.length>18?it.name.slice(0,17)+'…':it.name)+'</text></g>'; });
      s+='<circle cx="'+gx+'" cy="'+gy+'" r="22" fill="#1a2234" stroke="'+E[e].col+'" stroke-width="2"/><text x="'+gx+'" y="'+(gy+6)+'" text-anchor="middle" font-size="16">'+g.ic+'</text>';
      s+='<text x="'+gx+'" y="'+(gy+38)+'" text-anchor="middle" class="zfit-wg">'+esc(g.n)+' '+found.length+(unk?' · ?×'+unk:'')+(found.length>show.length?' (+'+(found.length-show.length)+')':'')+'</text>'; });
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="34" fill="'+E[e].col+'"/><text x="'+cx+'" y="'+(cy+8)+'" text-anchor="middle" font-size="24">'+E[e].em+'</text></svg>';
    return h+s; }
  function detailWeb(e){ var G=webNodes(e); return '<h3>'+E[e].em+' '+E[e].n+'</h3><div class="tome-sub">Everything tied to '+E[e].n.toLowerCase()+'</div>'+G.map(function(g){ var f=g.items.filter(function(x){ return x.found; }), u=g.items.length-f.length;
      return '<h4 class="zfit-h">'+g.ic+' '+esc(g.n)+'</h4><div class="zfit-chips">'+f.map(function(it){ return '<span data-fsel="'+it.cat+':'+it.id+'"'+(it.won?' class="won"':'')+'>'+esc(it.name)+'</span>'; }).join('')+(u?'<span class="unk">? × '+u+'</span>':'')+(g.items.length?'':'<span class="unk">none</span>')+'</div>'; }).join(''); }

  // ── the chapter ─────────────────────────────────────────────────────
  function entryDetail(cat,id){ if(cat==='realm')return '<h3>'+QN[id]+'</h3><div class="tome-sub">Realm of '+E[REL[id]].n+'</div>';
    if(!has(cat,id)&&cat!=='familiar')return '<h3>?</h3><p class="tome-hint">Still to find.</p>'; var e=Tome.entry(cat,id); if(!e)return '';
    return '<div class="tome-bigic">'+Tome.pic(cat,id,e,1.5)+'</div><h3>'+e.name+'</h3><div class="tome-sub">'+(e.sub||'')+'</div><dl>'+(e.lines||[]).map(function(l){ return '<dt>'+l[0]+'</dt><dd>'+l[1]+'</dd>'; }).join('')+'</dl>'; }
  function detail(){ var pg=PAGES.find(function(p){ return p[0]===F.pg; }), intro='<p class="tome-hint">'+pg[3]+'</p>';
    if(F.sel){ var k=F.sel.split(':');
      if(F.pg==='stars'){ var S=findStar(F.sel); if(S){ var it=S.it; if(!it.found)return intro+'<h3>?</h3><p class="tome-hint">A '+S.line.toLowerCase()+' star of the '+QN[S.q]+' — still to find.</p>'; return intro+(it.sub?'<div class="tome-sub">'+S.line+' · '+it.sub+' — '+esc(it.name)+'</div>':'')+entryDetail(k[0],k[1]); } }
      return intro+entryDetail(k[0],k[1]); }
    if(F.pg==='compass')return intro+detailCompass(F.el); if(F.pg==='grid')return intro+detailGrid(F.el); if(F.pg==='web')return intro+detailWeb(F.el);
    return intro; }
  var _render=Tome.render;
  Tome.render=function(){ _render.call(Tome); var tabs=document.getElementById('tome-tabs'), grid=document.getElementById('tome-grid'), det=document.getElementById('tome-detail'); if(!tabs||!grid||!det)return;
    var b=tabs.querySelector('[data-tcat="fits"]'); if(b)b.innerHTML=ZIcon.html('tm_paths','✨',1.35)+' How it all fits';
    if(Tome.ui.cat!=='fits'){ return; } grid.classList.add('tome-page'); monList._v=null;
    var h='<div class="zfit-tabs">'+PAGES.map(function(p){ return '<button data-fpg="'+p[0]+'" class="'+(p[0]===F.pg?'on':'')+'">'+p[2]+' '+p[1]+'</button>'; }).join('')+'</div>';
    try{ h+=({stars:pageStars,compass:pageCompass,grid:pageGrid,realms:pageRealms,journey:pageJourney,web:pageWeb})[F.pg](); }catch(err){ h+='<p class="tome-empty">This page could not be drawn.</p>'; if(typeof console!=='undefined')console.warn('tome fits',F.pg,err); }
    grid.innerHTML=h; try{ det.innerHTML=detail(); }catch(err){ det.innerHTML=''; }
    if(F.pg==='realms')setTimeout(drawRealms,0);
    if(typeof ZIcon!=='undefined'){ ZIcon.hydrate(grid); ZIcon.hydrate(det); } };
  if(typeof document!=='undefined')document.addEventListener('click',function(e){ if(!e.target.closest||!e.target.closest('#modal-tome')||Tome.ui.cat!=='fits')return; var t;
    if((t=e.target.closest('[data-fpg]'))){ F.pg=t.getAttribute('data-fpg'); F.sel=null; Tome.render(); }
    else if((t=e.target.closest('[data-fel]'))){ F.el=t.getAttribute('data-fel'); F.sel=null; Tome.render(); }
    else if((t=e.target.closest('[data-fsel]'))){ F.sel=t.getAttribute('data-fsel'); Tome.render(); } },true);
  Tome._fits=F;
})();
