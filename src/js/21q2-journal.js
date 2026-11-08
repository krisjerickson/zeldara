// ═══════════════════════════════════════════════════════════════════════
// ║ 21q2-journal.js — round 100: THE SAGA AND THE SIDE QUESTS (doc 52; Kris's picks, Lab → Training & quests).
// ║  · The journal in two parts (pick "The Saga + Side quests"): THE SAGA — the whole main road as numbered steps, to the very end (the
// ║    treasure sites, each builder and boss dungeon, the spirits and Sólveig's lattices, a castle for Mira's workshop, the island metals and
// ║    soul gems for her trays, the Sovereign staff, the four forges, Muspelheim, the Lodestar, your twin's word, the Bifröst, Solmyrk, the
// ║    gods); done steps ✓, the one you are on lit, the next two shown, the rest "???". SIDE QUESTS below, grouped, each with a SIDE badge —
// ║    the ones the Saga needs say so (an island's metal, the first castle).
// ║  · "Accept" is gone (Kris: drop it): the journal tracks everything by itself. ◎ Track on any quest → a gold arrow on the rim of the little
// ║    map points to it (pick "On the minimap"); with nothing tracked it points to the next step of the Saga.
// ║  · "Next on your path" follows the Saga to the end (ZQMAP.next), and stands as one line under the little map (pick "A line under the
// ║    minimap"); a click opens the map at it.
// ║  · Extras picked: a "quest complete" banner when a Saga step is done (what it opened, what is next); the suggested level on every pin and
// ║    quest (red when you are under it); Oswin's rumours as faint rings on the map (21u).
// ║  · The quest texts approved (doc 52 §6): "Free Bram — his bridge opens the Wetlands", the dungeon's mount and soul gem, the islands'
// ║    metal, the sky ports' reward, region names instead of "Section 1".
// ═══════════════════════════════════════════════════════════════════════
var ZJOUR={ on:true,
  RN:['','the Grasslands','the Wetlands','the Highlands','the Ashlands'], RS:['','Grasslands','Wetlands','Highlands','Ashlands'],
  LV:[0,1,6,11,16],      // the suggested level for a realm (its cap is 5 / 10 / 15 / 20)
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  inv:function(ps,id){ return (ps.inventory||[]).indexOf(id)>=0||(ps.equip&&Object.keys(ps.equip).some(function(k){ return ps.equip[k]===id; })); },
  site:function(wd,key){ return typeof ZQMAP!=='undefined'?ZQMAP.siteOf(wd,key):null; },
  nm:function(S){ try{ return typeof _siteLabel==='function'?_siteLabel(S).replace(/^★ /,'').replace(/ \((Tower|Dungeon)\)$/,''):(S.name||S.type); }catch(e){ return S&&S.name||''; } },
  // ── the Saga: every step of the main road, in order ──
  steps:function(ws){ ws=ws||ZJOUR.ws(); if(!ws||!ws.playerState)return []; var ps=ws.playerState, wd=ws.wd||{}, cq=ps.completedQuests||[], has=function(k){ return cq.indexOf(k)>=0; }, I=function(id){ return ZJOUR.inv(ps,id); }, out=[];
    var lode=I('lodestar')||!!ps.asgardDown, hg=function(q){ return I('heartglass_'+q)||lode; }, add=function(o){ out.push(o); };
    var M=typeof ZMIRA!=='undefined'?ZMIRA:null, SP=typeof ZSPIRIT!=='undefined'?ZSPIRIT:null;
    for(var r=1;r<=4;r++){ (function(r){ var T=ZJOUR.site(wd,'s'+r+'_tower'), D=ZJOUR.site(wd,'s'+r+'_dungeon'), G=T&&typeof _bossSiteGate==='function'?_bossSiteGate(ps,T,wd.sites):null, C=typeof CRAFTSMEN!=='undefined'&&CRAFTSMEN[r];
        var rw=typeof BOSS_REWARDS!=='undefined'&&BOSS_REWARDS['s'+r+'_dungeon'], mt=rw&&rw.mount&&typeof MOUNTS!=='undefined'&&MOUNTS[rw.mount], gem=M&&ITEMS[M.GEM[r]];
        add({id:'unseal'+r,r:r,t:'Unseal '+ZJOUR.RN[r]+'\'s boss: clear its three treasure sites'+(G&&!G.open?' ('+G.done+' / '+G.need+')':''),done:has('s'+r+'_tower')||!!(G&&G.open),S:G&&G.left&&G.left[0]});
        add({id:'tower'+r,r:r,t:'Free '+(C?C.n.split(' ')[0]:'the builder')+' in '+(T?ZJOUR.nm(T):'the boss tower')+(r<4?' — '+(r===1?'his bridge opens':r===2?'her lift opens':'his bridge opens')+' '+ZJOUR.RN[r+1]:' — her passes open the Ember Wall and the sky ports'),done:has('s'+r+'_tower'),S:T});
        add({id:'dungeon'+r,r:r,t:'Defeat '+(D?ZJOUR.nm(D):'the boss dungeon')+'\'s guardian'+(mt?' — the '+mt.n.toLowerCase()+(r<4?' crosses '+ZJOUR.RN[r+1]:''):'')+(gem?', and '+gem.name+', which Mira needs':''),done:has('s'+r+'_dungeon'),S:D});
        var n=SP?SP.count(ps,r):0, lat=I('soulglass_lattice_'+r)||hg(r);
        add({id:'spirits'+r,r:r,t:'Free 6 spirits of '+ZJOUR.RN[r]+' at their bindstones'+(lat?'':' ('+Math.min(n,6)+' / 6)'),done:lat||n>=6});
        add({id:'lattice'+r,r:r,t:'Sólveig fuses '+ZJOUR.RN[r]+'\' lattice in the Glimmerhall',done:lat}); })(r); }
    var mOpen=M&&M.open(ps);
    add({id:'castle',t:'Clear any island castle — it opens Mira\'s workshop in the village',done:!!mOpen});
    for(var q=1;q<=4;q++){ (function(q){ var metal=M&&ITEMS[M.METAL[q]], gem=M&&ITEMS[M.GEM[q]];
      add({id:'tray'+q,t:'Mira\'s '+ZJOUR.RS[q]+' hearth tray — '+(metal?metal.name:'the metal')+' from '+(M?M.ISLE[q]:'the island')+'\'s trader and '+(gem?gem.name:'the soul gem'),done:I(M?M.TRAY(q):'hearth_tray_'+q)||hg(q)}); })(q); }
    var forges=typeof _finalQuestUnlocked==='function'&&_finalQuestUnlocked(ps), fd=ps.forgesDone||[], FN=typeof VOLC_ORDER!=='undefined'?VOLC_ORDER:[];
    add({id:'sov',t:'The Sovereign staff from the apothecary (6,000 gold; it can be made once the forges rise)',done:I('sov_staff')||lode});
    ['Ember','Cinder','Slag','Ash'].forEach(function(F,i){ var vid=FN[i]; add({id:'forge'+(i+1),t:'The '+F+' Forge — win its key, and make '+ZJOUR.RS[i+1]+' Heartglass at its hearth',done:(vid&&fd.indexOf(vid)>=0&&hg(i+1))||lode,S:vid?(wd.sites||[]).find(function(s){ return s.id===vid; }):null}); });
    add({id:'musp',t:'Muspelheim — defeat Surtharn',done:has('volcano_lord')||lode});
    add({id:'lode',t:'Make the Lodestar at the great hearth: the Sovereign staff and the four Heartglasses',done:lode});
    add({id:'escape',t:'Escape Muspelheim',done:!!ps.asgardDown});
    add({id:'word',t:'Ask your twin in the library for the Lodestar\'s word',done:!!ps.godsbane});
    add({id:'bifrost',t:'Set the Lodestar in the notch at the end of the pier — the Bifröst',done:!!ps.bifrost});
    add({id:'solmyrk',t:'Asgard\'s citadel — defeat Solmyrk',done:!!ps.grimnirDown||!!ps.spiritsHome});
    add({id:'home',t:'Free the gods, and bring the spirits home',done:!!ps.spiritsHome});
    var cur=out.findIndex(function(s){ return !s.done; }); out.forEach(function(s,i){ s.n=i+1; s.cur=i===cur; s.state=s.done?'done':i===cur?'cur':(cur>=0&&i<=cur+2?'next':'later'); });
    return out; },
  current:function(ws){ var L=ZJOUR.steps(ws); return L.find(function(s){ return s.cur; })||null; },
  // ── the side quests ──
  side:function(ws){ var ps=ws.playerState, wd=ws.wd||{}, cq=ps.completedQuests||[], ul=ps.unlockedSections||[1], G=[], ex=function(S){ return typeof _wmExplored!=='function'||_wmExplored(ps,S.tx+1.5,S.ty+1.5); };
    var M=typeof ZMIRA!=='undefined'?ZMIRA:null, tq=ps.tq||{};
    var st=[]; if(tq.camp)st.push({id:'tq_camp',t:'Oswin\'s purse — the camp on the east road',sub:'beat its guards; its chest holds 50 g',done:tq.camp>=3,trk:'tq:camp'});
    if(tq.net)st.push({id:'tq_net',t:'Old Nell\'s net',sub:tq.net>=3?'returned':tq.net===2?'take it back to Old Nell at the pier':'fetch it from the lake\'s far shore — two skeletons stand over it',done:tq.net>=3,trk:'tq:net'});
    if(ps.rollQ!==undefined||ps.canRoll)st.push({id:'roll',t:'The Tumbler\'s Lesson — Pia\'s pins',sub:ps.canRoll?'the roll (Alt) is yours':'by the Rime Spire; the reward: the roll',done:!!ps.canRoll,trk:'roll'});
    if(st.length)G.push({n:'Oswin\'s first tasks',L:st});
    var isl=[]; ul.forEach(function(r){ var S=(wd.sites||[]).find(function(s){ return s.section===r&&s.type==='harbor'&&!s.castle; }); if(!S)return; isl.push({id:S.id,t:(M?M.ISLE[r]:'The island')+' — a familiar',sub:'its trader sells '+(M&&ITEMS[M.METAL[r]]?ITEMS[M.METAL[r]].name:'the realm\'s metal')+', which Mira needs for '+ZJOUR.RS[r]+' tray · Lv '+ZJOUR.LV[r]+'+',done:cq.indexOf('s'+r+'_harbor')>=0,S:S,r:r}); });
    if(isl.length)G.push({n:'Islands',L:isl});
    var cas=(wd.sites||[]).filter(function(s){ return s.type==='harbor'&&s.castle&&ex(s); }).map(function(s){ var C=typeof CASTLE_ISLANDS!=='undefined'&&CASTLE_ISLANDS[s.castle], sk=C&&ITEMS[C.skill]; return {id:s.id,t:(C?C.name:'A castle isle'),sub:'a skill'+(sk?': '+sk.name:'')+((ps.castlesDone||[]).length?'':' — the first castle opens Mira\'s workshop (the Saga needs it)'),done:(ps.castlesDone||[]).indexOf(s.castle)>=0,S:s,r:s.section}; });
    if(cas.length)G.push({n:'Castle isles',L:cas,all:typeof CASTLE_ISLANDS!=='undefined'?Object.keys(CASTLE_ISLANDS).length:12});
    var mg=(wd.sites||[]).filter(function(s){ return s.mage&&ex(s); }).map(function(s){ var MG=typeof MAGE_BY_KEY!=='undefined'&&MAGE_BY_KEY[s.mage], sp=MG&&ITEMS[MG.spell]; return {id:s.id,t:s.name||'A mage tower',sub:'a spell'+(sp?': '+sp.name:''),done:(ps.mageDone||[]).indexOf(s.mage)>=0,S:s,r:s.section}; });
    if(mg.length)G.push({n:'Mage towers',L:mg,all:typeof MAGE_TOWERS!=='undefined'?MAGE_TOWERS.length:16});
    if(cq.indexOf('s4_tower')>=0){ var sk=[]; [1,2,3,4].forEach(function(r){ var S=(wd.sites||[]).find(function(s){ return s.section===r&&s.type==='skyport'; }); if(S)sk.push({id:S.id,t:'The sky port of '+ZJOUR.RN[r],sub:'defend the city in the clouds: its flying mount, and a weapon or gems · all four → the Sky Eagle',done:cq.indexOf('s'+r+'_skyport')>=0,S:S,r:r}); }); if(sk.length)G.push({n:'Sky ports',L:sk}); }
    var fam=(ps.ownedFamiliars||[]).length; if(fam)G.push({n:'Fairies',L:[{id:'fairies',t:'The fairies\' errands and trials',sub:'each lesson teaches your familiar a new skill — the Tome\'s quest page shows what they want',done:false},{id:'kings',t:'The Fairy Kings (3)',sub:'their henges in the Wetlands, Highlands and Ashlands — each adds a familiar slot',done:false}]});
    var d=typeof ALL_MAIN_QUESTS!=='undefined'?ALL_MAIN_QUESTS.filter(function(k){ return cq.indexOf(k)>=0; }).length:0;
    G.push({n:'The Dragon',L:[{id:'dragon',t:'Every tower, dungeon, island and sky port ('+d+' / 16)',sub:'the Dragon flies over all land and deep water',done:(ps.ownedMounts||[]).indexOf('dragon')>=0}]});
    if(ps.spiritsHome)G.push({n:'After the end',L:[{id:'tree',t:'All forty spirits free ('+(ps.spiritsFreed||[]).length+' / 40)',sub:'the World Tree under the lake',done:!!ps.worldTree}]});
    return G; },
  // ── tracking: what the arrow points to ──
  target:function(ws){ ws=ws||ZJOUR.ws(); if(!ws||!ws.playerState)return null; var ps=ws.playerState, k=ps.tracked, wd=ws.wd||{}, P=function(S,t){ return S?{x:(S.tx+1.5)*TILE,y:(S.ty+1.5)*TILE,t:t||ZJOUR.nm(S)}:null; };
    if(typeof ZWALK!=='undefined'&&ZWALK.target){ var w=ZWALK.target(ws); if(w)return w; }
    if(k){ if(k.indexOf('tq:')===0&&typeof ZOSW!=='undefined'){ var o=ZOSW.target(ws,k.slice(3)); if(o)return o; }
      else if(k==='roll'&&typeof ZROLL!=='undefined'){ var R=(wd.sites||[]).find(function(s){ return s.mage&&/rime/i.test(s.name||''); }); if(R&&!ps.canRoll)return P(R,'Pia, by the Rime Spire'); }
      else { var S=(wd.sites||[]).find(function(s){ return s.id===k; }); if(S&&!ZJOUR.siteDone(ps,S))return P(S); } ps.tracked=null; }
    if(typeof ZOSW!=='undefined'){ var t=ZOSW.target(ws); if(t)return t; }
    var c=ZJOUR.current(ws); return c&&c.S?P(c.S,c.t):null; },
  siteDone:function(ps,S){ var cq=ps.completedQuests||[]; if(S.mage)return (ps.mageDone||[]).indexOf(S.mage)>=0; if(S.castle)return (ps.castlesDone||[]).indexOf(S.castle)>=0; if(S.bonus)return (ps.bonusCleared||[]).indexOf(S.id)>=0;
    return cq.indexOf(S.id)>=0||cq.indexOf('s'+S.section+'_'+S.type)>=0; },
  // ── the journal ──
  html:function(ws){ var ps=ws.playerState, L=ZJOUR.steps(ws), G=ZJOUR.side(ws), esc=function(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }, tr=ps.tracked, lv=ps.level||1;
    var trk=function(id,label){ return id?'<button class="zj-trk'+(tr===id?' on':'')+'" data-trk="'+id+'" title="Track it — an arrow on the little map">'+(tr===id?'◉ Tracked':'◎ Track')+'</button>':''; };
    var h='<div class="zj"><div class="zj-col"><h3>📜 The Saga</h3>', later=0;
    L.forEach(function(s){ if(s.state==='later'){ later++; return; } var sid=s.S?s.S.id:null, rq=s.r?ZJOUR.LV[s.r]:0;
      h+='<div class="zj-s zj-'+s.state+'"><span class="zj-n">'+(s.done?'✓':s.n)+'</span><span class="zj-t">'+esc(s.t)+(s.state!=='done'&&rq?' <small class="zj-lv'+(lv<rq?' low':'')+'">Lv '+rq+'+</small>':'')+'</span>'+(s.state==='cur'?trk(sid):'')+'</div>'; });
    if(later)h+='<div class="zj-s zj-later"><span class="zj-n">…</span><span class="zj-t">??? — '+later+' more steps, told as you reach them</span></div>';
    h+='</div><div class="zj-col"><h3>Side quests</h3>';
    if(!G.length)h+='<p class="zj-none">None yet — Oswin at the guild has work for you.</p>';
    G.forEach(function(g){ h+='<div class="zj-g"><h4>'+esc(g.n)+(g.all?' <small>'+g.L.length+' of '+g.all+' found</small>':'')+'</h4>';
      g.L.forEach(function(q){ var rq=q.r?ZJOUR.LV[q.r]:0; h+='<div class="zj-q'+(q.done?' done':'')+'"><i>SIDE</i><span><b>'+esc(q.t)+(q.done?' ✓':'')+'</b><small>'+esc(q.sub||'')+(rq&&!q.done&&!/Lv /.test(q.sub||'')?' · <span class="zj-lv'+(lv<rq?' low':'')+'">Lv '+rq+'+</span>':'')+'</small></span>'+(q.done?'':trk(q.trk||(q.S&&q.S.id)))+'</div>'; });
      h+='</div>'; });
    return h+'</div></div>'; },
  render:function(scene){ var c=document.getElementById('quest-list-container'); if(!c)return false; var ws=(scene&&scene.playerState)?scene:ZJOUR.ws(); if(!ws||!ws.playerState)return false; var h=ZJOUR.html(ws); if(c._qh!==h){ c._qh=h; c.innerHTML=h; } return true; },
  // ── the line under the little map ──
  line:function(){ var hud=document.getElementById('minimap-hud'); if(!hud)return; var el=document.getElementById('zpath'); if(!el){ el=document.createElement('div'); el.id='zpath'; el.title='Next on your path — click for the map'; el.onclick=function(){ if(typeof openWorldMap==='function')openWorldMap(); }; hud.appendChild(el); }
    var ws=ZJOUR.ws(), w=typeof ZWALK!=='undefined'&&ZWALK.line?ZWALK.line(ws):null, N=w?{t:w}:(typeof ZQMAP!=='undefined'?ZQMAP.next(ws):null), t=N?N.t:'';
    if(el._t!==t){ el._t=t; el.innerHTML=t?'<b>'+(w?'▸ ':'▶ Next: ')+'</b>'+String(t).replace(/</g,'&lt;'):''; el.style.display=t?'':'none'; } },
  // ── the gold arrow on the little map's rim ──
  arrow:function(ws){ var cv=document.getElementById('minimap-hud-canvas'); if(!cv||!ws||!ws.player)return; var T=ZJOUR.target(ws); if(!T)return; var ctx=cv.getContext('2d'), cw=cv.width, ch=cv.height, dx=T.x-ws.player.x, dy=T.y-ws.player.y, d=Math.hypot(dx,dy)/TILE, a=Math.atan2(dy,dx), R=Math.min(cw,ch)*0.43, t=Date.now()/1000;
    ctx.save(); ctx.translate(cw/2,ch/2); if(d<3){ ctx.strokeStyle='rgba(255,224,90,'+(0.6+0.3*Math.sin(t*5))+')'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(0,0,14,0,Math.PI*2); ctx.stroke(); ctx.restore(); return; }
    ctx.rotate(a); ctx.translate(R,0); ctx.fillStyle='#ffd84a'; ctx.strokeStyle='#2a1a00'; ctx.lineWidth=3; ctx.shadowColor='rgba(255,210,60,.9)'; ctx.shadowBlur=10+4*Math.sin(t*4);
    ctx.beginPath(); ctx.moveTo(16,0); ctx.lineTo(-10,-12); ctx.lineTo(-4,0); ctx.lineTo(-10,12); ctx.closePath(); ctx.stroke(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.fillStyle='#fff3c0'; ctx.font='700 20px "Segoe UI",sans-serif'; ctx.textAlign='center'; ctx.shadowColor='#000'; ctx.shadowBlur=4; var lx=cw/2+Math.cos(a)*(R-30), ly=ch/2+Math.sin(a)*(R-30)+7; ctx.fillText(Math.round(d)+'',lx,ly); ctx.restore(); },
  // ── a Saga step done: the banner (what it opened, what is next) ──
  _done:null,
  watch:function(){ try{ if(!ZJOUR.on){ var zp=document.getElementById('zpath'); if(zp)zp.style.display='none'; return; } var ws=ZJOUR.ws(); if(!ws||!ws.playerState||!ws.player)return; ZJOUR.line(); var L=ZJOUR.steps(ws), D=L.filter(function(s){ return s.done; }).map(function(s){ return s.id; });
    if(ZJOUR._done&&ZJOUR._ps===ws.playerState){ var nw=D.filter(function(id){ return ZJOUR._done.indexOf(id)<0; }); if(nw.length){ var s=L.find(function(x){ return x.id===nw[nw.length-1]; }), c=L.find(function(x){ return x.cur; }); ZJOUR.banner('✓ '+s.t,c?'Next: '+c.t:'The Saga is done.'); } }
    ZJOUR._done=D; ZJOUR._ps=ws.playerState; }catch(e){ if(!ZJOUR._err){ ZJOUR._err=1; console.warn('journal',e); } } },
  banner:function(a,b){ var el=document.getElementById('zq-banner'); if(!el){ el=document.createElement('div'); el.id='zq-banner'; document.body.appendChild(el); }
    el.innerHTML='<div class="zqb-t">'+String(a).replace(/</g,'&lt;')+'</div><div class="zqb-n">'+String(b||'').replace(/</g,'&lt;')+'</div>'; el.classList.remove('show'); void el.offsetWidth; el.classList.add('show'); clearTimeout(ZJOUR._bt); ZJOUR._bt=setTimeout(function(){ el.classList.remove('show'); },5200);
    if(typeof ZSFX!=='undefined')try{ ZSFX.play('quest'); }catch(e){} }
};
setTimeout(function(){
  // the journal: the Saga and the side quests (no more Accept)
  if(typeof renderQuestList==='function'){ var rq0=renderQuestList; renderQuestList=function(u,c,a,scene){ if(ZJOUR.on&&ZJOUR.render(scene))return; return rq0.apply(this,arguments); }; }
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.zj-trk'); if(!b)return; e.stopPropagation(); var ws=ZJOUR.ws(); if(!ws)return; var ps=ws.playerState, id=b.dataset.trk; ps.tracked=ps.tracked===id?null:id;
    var m=/^s(\d)_(tower|dungeon|harbor|skyport)$/.exec(id); ps.activeQuest=m?id:null; var c=document.getElementById('quest-list-container'); if(c)c._qh=''; ZJOUR.render(ws); if(typeof ZQMAP!=='undefined')ZQMAP._c=null; });
  // "Next on your path" follows the Saga to the end
  if(typeof ZQMAP!=='undefined'){ var nx0=ZQMAP.next; ZQMAP.next=function(ws){ ws=ws||ZJOUR.ws(); if(!ZJOUR.on||!ws||!ws.playerState)return nx0.apply(this,arguments); var o=typeof ZOSW!=='undefined'?ZOSW.next(ws):null; if(o)return o; var c=ZJOUR.current(ws); return c?{t:c.t,S:c.S||null}:null; };
    // the suggested level on each pin; Oswin's rumours as faint rings
    var ls0=ZQMAP.list; ZQMAP.list=function(ws){ var L=ls0.apply(this,arguments); ws=ws||ZJOUR.ws(); var lv=ws&&ws.playerState&&ws.playerState.level||1; L.forEach(function(q){ var r=q.S&&q.S.section; if(r&&ZJOUR.LV[r]&&!q._lv){ q._lv=1; q.sub+=' · '+(lv<ZJOUR.LV[r]?'⚠ ':'')+'Lv '+ZJOUR.LV[r]+'+'; } }); return L; };
    var pn0=ZQMAP.pins; ZQMAP.pins=function(ctx,cw,ch,ws,v,o){ var r=pn0.apply(this,arguments); try{ if(o&&o.full&&typeof ZOSW!=='undefined')ZOSW.rings(ctx,cw,ch,ws,v); }catch(e){} return r; }; }
  // the arrow on the little map's rim
  if(typeof _drawMinimapHud==='function'){ var mm0=_drawMinimapHud; _drawMinimapHud=function(ws,dng){ var r=mm0.apply(this,arguments); try{ if(ZJOUR.on&&!dng&&ws&&ws.wd&&!ws.wd.islKey)ZJOUR.arrow(ws); }catch(e){} return r; }; }
  var st=document.createElement('style'); st.textContent=
    '.zj{display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start}.zj-col{flex:1 1 320px;min-width:280px}.zj h3{margin:2px 0 8px;color:#ffe6a8;font:600 17px "Cinzel",Georgia,serif}.zj h4{margin:10px 0 4px;color:#cfe0f0;font:600 13px "Segoe UI";text-transform:uppercase;letter-spacing:.06em}.zj h4 small{color:#8aa0b8;text-transform:none;letter-spacing:0;font-weight:400}'+
    '.zj-s{display:flex;gap:8px;align-items:center;padding:5px 6px;border-radius:7px;font:13.5px/1.35 "Segoe UI"}.zj-n{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:700 12px "Segoe UI";background:rgba(255,255,255,.08);color:#cfe0f0}.zj-t{flex:1}'+
    '.zj-done{opacity:.45}.zj-done .zj-n{background:rgba(120,220,140,.25);color:#9ff0b0}.zj-cur{background:rgba(255,224,90,.10);border:1px solid rgba(255,224,90,.5)}.zj-cur .zj-n{background:#ffd84a;color:#2a1a00}.zj-cur .zj-t{color:#fff6c8;font-weight:600}.zj-later{opacity:.5;font-style:italic}'+
    '.zj-q{display:flex;gap:8px;align-items:center;padding:5px 6px;border-bottom:1px solid rgba(255,255,255,.06);font:13px/1.35 "Segoe UI";color:#e3ecf6}.zj-q>span{flex:1}.zj-q small{display:block;color:#8aa0b8}.zj-q.done{opacity:.5}.zj-q i{flex:none;font-style:normal;font:700 9px "Segoe UI";letter-spacing:.08em;padding:1px 5px;border:1px solid #8aa0b8;border-radius:4px;color:#8aa0b8}'+
    '.zj-lv{color:#9fb0c8;font-weight:600}.zj-lv.low{color:#ff8a7a}.zj-none{color:#8aa0b8;font:13px "Segoe UI"}'+
    '.zj-trk{flex:none;font:600 11px "Segoe UI";padding:3px 8px;border-radius:7px;border:1px solid rgba(255,216,74,.6);background:rgba(40,30,0,.5);color:#ffe27a;cursor:pointer}.zj-trk.on{background:#ffd84a;color:#2a1a00}'+
    '#zpath{margin:4px auto 0;max-width:240px;padding:4px 8px;border-radius:8px;background:rgba(5,8,18,.78);border:1px solid rgba(255,216,74,.45);color:#fff3c0;font:600 11px/1.3 "Segoe UI",sans-serif;text-align:center;cursor:pointer;text-shadow:0 1px 2px #000;pointer-events:auto}#zpath b{color:#ffd84a}'+
    '#zq-banner{position:fixed;left:50%;top:14%;transform:translate(-50%,-12px);z-index:400;min-width:300px;max-width:min(680px,92vw);padding:14px 22px;border-radius:12px;background:linear-gradient(180deg,rgba(40,30,8,.94),rgba(16,12,4,.94));border:2px solid #ffd84a;box-shadow:0 0 28px rgba(255,210,60,.35);text-align:center;opacity:0;pointer-events:none;transition:opacity .5s,transform .5s}'+
    '#zq-banner.show{opacity:1;transform:translate(-50%,0)}.zqb-t{color:#fff3c0;font:600 18px "Cinzel",Georgia,serif}.zqb-n{color:#e8d8a0;font:14px "Segoe UI";margin-top:4px}';
  document.head.appendChild(st);
},0);
setInterval(ZJOUR.watch,1000);
