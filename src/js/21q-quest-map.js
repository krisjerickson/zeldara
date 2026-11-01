// ═══════════════════════════════════════════════════════════════════════
// ║ 21q-quest-map.js — round 85: MAP AND QUESTS IN ONE (Kris: "We should also consolidate map and quest into one icon and interface, too,
// ║ such that you get info about where on the map the different quests you are doing are at").
// ║ The world map's side panel opens with your quests, numbered, and the same numbers stand on the map where each one is:
// ║  · the quest you took at the guild (gold, pulsing);
// ║  · in every region you have opened: its boss tower and boss dungeon (sealed until its treasure sites are cleared — those are listed
// ║    too, as the way to unseal them), and the harbour, sky port, mage towers and castle isles you have found and not yet finished.
// ║ 📍 on a quest centres the map on it; "Quest journal" opens the full journal (accepting quests still happens at the guild).
// ║ Also fixed: the old marker lit every site of the same type (a mage tower for "s1_tower", a castle isle for "s1_harbor").
// ═══════════════════════════════════════════════════════════════════════
var ZQMAP={ on:true, _c:null, _t:0,
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  // the main site of a quest key ("s2_tower" → the region's boss tower, not a mage tower)
  siteOf:function(wd,key){ var m=/^s(\d)_(dungeon|tower|harbor|skyport)$/.exec(key||''); if(!m)return null; var r=+m[1], t=m[2];
    return (wd.sites||[]).find(function(S){ if(S.section!==r||S.type!==t)return false; if(t==='tower'||t==='dungeon')return !!S.boss&&!S.mage&&!S.bonus; if(t==='harbor')return !S.castle; return true; })||null; },
  list:function(ws){ ws=ws||ZQMAP.ws(); if(!ws||!ws.wd||!ws.playerState)return []; var now=Date.now(); if(ZQMAP._c&&now-ZQMAP._t<600&&ZQMAP._c.ws===ws)return ZQMAP._c.L;
    var wd=ws.wd, ps=ws.playerState, cq=ps.completedQuests||[], out=[], seen={}, ex=function(S){ return typeof _wmExplored!=='function'||_wmExplored(ps,S.tx+1.5,S.ty+1.5); },
      done=function(S,key){ return cq.indexOf(key)>=0||cq.indexOf(S.id)>=0; },
      add=function(S,o){ if(!S||seen[S.id])return; seen[S.id]=1; out.push(Object.assign({id:S.id,tx:S.tx+1.5,ty:S.ty+1.5,S:S},o)); },
      nm=function(S){ try{ return typeof _siteLabel==='function'?_siteLabel(S):(S.name||S.type); }catch(e){ return S.name||S.type; } },
      gives=function(S){ return typeof _wmGives==='function'?_wmGives(S):''; };
    if(ps.activeQuest){ var A=ZQMAP.siteOf(wd,ps.activeQuest); if(A)add(A,{act:true,ic:'⭐',title:nm(A),sub:'your quest from the guild'+(gives(A)?' · '+gives(A):'')}); }
    (ps.unlockedSections||[1]).slice().sort().forEach(function(r){ var R=(typeof WM_REGION_NAMES!=='undefined'&&WM_REGION_NAMES[r])||('Region '+r);
      ['tower','dungeon'].forEach(function(t){ var S=ZQMAP.siteOf(wd,'s'+r+'_'+t); if(!S||done(S,'s'+r+'_'+t))return; var G=typeof _bossSiteGate==='function'?_bossSiteGate(ps,S,wd.sites):{open:true,left:[]};
        add(S,{ic:t==='tower'?'🗼':'🕳',title:nm(S),sub:R+' · '+(G.open?'the boss waits'+(gives(S)?' · '+gives(S):''):'sealed — clear '+G.left.length+' more treasure site'+(G.left.length===1?'':'s'))});
        if(!G.open)(G.left||[]).forEach(function(B){ add(B,{ic:'💰',title:nm(B),sub:R+' · a treasure site — clearing it helps unseal the boss'}); }); });
      (wd.sites||[]).forEach(function(S){ if(S.section!==r||!ex(S))return;
        if(S.type==='harbor'&&!S.castle&&!done(S,'s'+r+'_harbor'))add(S,{ic:'⚓',title:nm(S),sub:R+' · the harbour'+(gives(S)?' · '+gives(S):'')});
        else if(S.type==='harbor'&&S.castle&&(ps.castlesDone||[]).indexOf(S.castle)<0)add(S,{ic:'🏰',title:nm(S),sub:R+' · a castle isle'+(gives(S)?' · '+gives(S):'')});
        else if(S.type==='skyport'&&!done(S,'s'+r+'_skyport'))add(S,{ic:'🎈',title:nm(S),sub:R+' · the sky port'+(gives(S)?' · '+gives(S):'')});
        else if(S.mage&&(ps.mageDone||[]).indexOf(S.mage)<0)add(S,{ic:'🔮',title:nm(S),sub:R+' · a mage tower'+(gives(S)?' · '+gives(S):'')}); }); });
    var px=ws.player?ws.player.x/TILE:CENTER_X, py=ws.player?ws.player.y/TILE:CENTER_Y;
    out.forEach(function(q){ q.d=Math.hypot(q.tx-px,q.ty-py); var a=Math.atan2(q.ty-py,q.tx-px); q.dir=['E','SE','S','SW','W','NW','N','NE'][((Math.round(a/(Math.PI/4))%8)+8)%8]; });
    out.sort(function(a,b){ return (b.act?1:0)-(a.act?1:0)||a.d-b.d; }); out=out.slice(0,14); out.forEach(function(q,i){ q.n=i+1; });
    ZQMAP._c={ws:ws,L:out}; ZQMAP._t=now; return out; },
  // the next step on the main path — one clear thread through the game (round 85 quest review, doc 42 §3)
  next:function(ws){ ws=ws||ZQMAP.ws(); if(!ws||!ws.playerState)return null; var ps=ws.playerState, wd=ws.wd, cq=ps.completedQuests||[], has=function(k){ return cq.indexOf(k)>=0; }, RN=function(r){ return (typeof WM_REGION_NAMES!=='undefined'&&WM_REGION_NAMES[r])||('region '+r); };
    for(var r=1;r<=4;r++){ var T=ZQMAP.siteOf(wd,'s'+r+'_tower'), Dn=ZQMAP.siteOf(wd,'s'+r+'_dungeon'); if(has('s'+r+'_tower')&&has('s'+r+'_dungeon'))continue;
      var G=T&&typeof _bossSiteGate==='function'?_bossSiteGate(ps,T,wd.sites):null;
      if(G&&!G.open)return {t:'Clear the treasure sites of the '+RN(r)+' ('+G.done+' / '+G.need+') to unseal its boss tower and dungeon',S:G.left[0]};
      if(!has('s'+r+'_tower'))return {t:'Free the master builder in the '+RN(r)+'\'s boss tower'+(r<4?' — he opens the way into the next realm':''),S:T};
      if(!has('s'+r+'_dungeon'))return {t:'Defeat the boss of the '+RN(r)+'\'s dungeon'+(Dn&&_wmGives(Dn)?' ('+_wmGives(Dn)+')':''),S:Dn}; }
    if(typeof _finalQuestUnlocked==='function'&&_finalQuestUnlocked(ps)){ var fd=(ps.forgesDone||[]).length; if(fd<4)return {t:'The four forges have risen — the next forge awaits ('+fd+' / 4 lit)',S:null}; return {t:'Muspelheim, the Spirit Saga and beyond — see the Quest journal',S:null}; }
    return null; },
  // the side panel block
  html:function(ws){ var L=ZQMAP.list(ws), N=ZQMAP.next(ws), h='<div id="wm-quests">'+(N?'<div class="wmq-next"><b>Next on your path</b><span>'+N.t+'</span>'+(N.S?'<button class="wmq-go" data-x="'+(N.S.tx+1.5)+'" data-y="'+(N.S.ty+1.5)+'" title="Show on the map">📍</button>':'')+'</div>':'')+'<h4>Your quests <span class="wmq-n">'+L.length+'</span></h4>';
    if(!L.length)h+='<div class="wm-note">Nothing open just now. Visit the guild in the village for a quest, or explore — what you find appears here.</div>';
    L.forEach(function(q){ h+='<div class="wmq'+(q.act?' act':'')+'"><b class="wmq-k">'+q.n+'</b><span class="wmq-t">'+q.ic+' '+q.title+'<small>'+q.sub+' · '+Math.round(q.d)+' tiles '+q.dir+'</small></span><button class="wmq-go" data-x="'+q.tx+'" data-y="'+q.ty+'" title="Show on the map">📍</button></div>'; });
    return h+'<button class="wmq-j">📜 Quest journal</button></div>'; },
  // the numbered pins on the map
  pins:function(ctx,cw,ch,ws,v,o){ if(!ZQMAP.on||!o||!o.full)return; var L=ZQMAP.list(ws); if(!L.length)return; var sc=cw/v.w, t=Date.now()/1000;
    ctx.save(); ctx.textAlign='center'; ctx.textBaseline='middle';
    L.forEach(function(q){ var x=(q.tx-v.x)*sc, y=(q.ty-v.y)*sc; if(x<-20||y<-20||x>cw+20||y>ch+20)return; var r=10;
      if(q.act){ ctx.fillStyle='rgba(255,240,90,'+(0.25+0.15*Math.sin(t*4))+')'; ctx.beginPath(); ctx.arc(x,y-r-6,r*2.1,0,Math.PI*2); ctx.fill(); }
      ctx.fillStyle=q.act?'#fff35a':'#f2c14e'; ctx.strokeStyle='#1a1206'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-6,y-r); ctx.arc(x,y-r-6,r,Math.PI*0.8,Math.PI*0.2,false); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle='#1a1206'; ctx.font='800 12px "Segoe UI",sans-serif'; ctx.fillText(String(q.n),x,y-r-6); });
    ctx.restore(); }
};
(function(){
  if(typeof _wmDrawView==='function'){ var d0=_wmDrawView; _wmDrawView=function(ctx,cw,ch,ws,v,o){ var r=d0.apply(this,arguments); try{ ZQMAP.pins(ctx,cw,ch,ws,v,o); }catch(e){} return r; }; }
  if(typeof _wmRenderSide==='function'){ var s0=_wmRenderSide; _wmRenderSide=function(ws){ var r=s0.apply(this,arguments); try{ if(!ZQMAP.on||(typeof WMAP!=='undefined'&&WMAP.travel))return r; var side=document.getElementById('wmap-side'); if(!side)return r;
      var h=ZQMAP.html(ws), q=document.getElementById('wm-quests'); if(q&&q.parentNode===side&&side._qh===h)return r; if(q)q.remove(); side._qh=h; side.insertAdjacentHTML('afterbegin',h); }catch(e){} return r; }; }
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.wmq-go'), j=e.target.closest&&e.target.closest('.wmq-j'), ws=ZQMAP.ws();
    if(b&&ws&&typeof WMAP!=='undefined'){ e.stopPropagation(); WMAP.cx=+b.dataset.x; WMAP.cy=+b.dataset.y; WMAP.zoom=Math.max(WMAP.zoom||1,3); if(typeof renderMinimap==='function')renderMinimap(ws.wd,null,null,null,0,null,true); return; }
    if(j&&ws){ e.stopPropagation(); if(typeof closeModal==='function')closeModal('map'); var ps=ws.playerState; if(typeof renderQuestList==='function')try{ renderQuestList(ps.unlockedSections,ps.completedQuests,ps.activeQuest,ws); }catch(x){} var el=document.getElementById('modal-quests'); if(el)el.style.display='flex'; } },true);
  var st=document.createElement('style'); st.textContent='#wm-quests{margin-bottom:10px}#wm-quests h4 .wmq-n{color:#9fe8ff;font-size:11px;margin-left:6px}.wmq{display:flex;align-items:center;gap:8px;padding:5px 4px;border-bottom:1px solid rgba(255,255,255,.06)}.wmq.act{background:rgba(255,240,90,.08)}'+
    '.wmq-k{flex:0 0 22px;height:22px;border-radius:50%;background:#f2c14e;color:#1a1206;display:flex;align-items:center;justify-content:center;font:800 12px "Segoe UI",sans-serif}.wmq.act .wmq-k{background:#fff35a}'+
    '.wmq-next{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:8px;margin-bottom:8px;border:1px solid rgba(111,227,245,.45);border-radius:8px;background:rgba(111,227,245,.08);color:#e8fbff;font:13px "Segoe UI",sans-serif}.wmq-next b{width:100%;color:#6fe3f5;font-size:11px;text-transform:uppercase;letter-spacing:.06em}.wmq-next span{flex:1}'+
    '.wmq-t{flex:1;font:600 13px "Segoe UI",sans-serif;color:#e8eef8}.wmq-t small{display:block;font-weight:400;color:#8aa0b8;font-size:11px}.wmq-go,.wmq-j{cursor:pointer;background:rgba(30,46,66,.6);border:1px solid rgba(111,227,245,.3);border-radius:6px;color:#cfe3f4;padding:3px 7px}.wmq-j{margin-top:8px;width:100%;padding:6px}';
  document.head.appendChild(st);
})();
