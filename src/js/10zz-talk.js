// ═══════════════════════════════════════════════════════════════════════
// ║ 10zz-talk.js — round 59: the dialog boxes show the painted people, and Mira's and Sólveig's boxes show what they need as pictures.
// ║ Kris: "these popups have the old drawn npcs instead of the rich images, which need to be remade. And mira's popup should show each of the
// ║ ingredients you need, and which you have and don't yet have, greyed out, like the inventory or tome, not the simple popup".
// ║  · ZSPIRIT.talk (the spirits, Mira, Sólveig) draws a bigger portrait (150 px) from the painted art: a character's idle frames from the
// ║    atlas (Mira = crafts_2), a painted scenery picture (np_solveig, each spirit's own sp_u_<name>_bound / _free), else the old drawing.
// ║  · ZTALK.grid(rows): ingredient tiles — the item's painted icon, its name, ✓ when you have it; greyed out (like the inventory and the
// ║    Tome) when you do not, with where to get it underneath.
// ═══════════════════════════════════════════════════════════════════════
var ZTALK={ PX:150,
  // a painted character from the atlas, playing its idle frames
  ch:function(ch,fb){ var L=null, asked=false, f=function(x,t,S){ if(!asked&&typeof ZAtlas!=='undefined'&&!ZAtlas.off&&ZAtlas.has(ch)){ asked=true; ZAtlas.thumbs(ch,S,6,function(T){ L=T; }); }
      if(L&&L.length){ x.drawImage(L[Math.floor(t/3)%L.length],0,0,S,S); return; } if(fb){ x.save(); x.scale(S/96,S/96); fb(x,t); x.restore(); } }; f.big=true; return f; },
  // a painted scenery picture (a person standing), gently breathing
  scn:function(id,fb){ var f=function(x,t,S){ var Z=typeof _scn==='function'?_scn():null; if(Z&&Z.has&&Z.has(id)){ try{ Z.draw(x,id,S/2,S-6+Math.sin(t*0.25)*1.5,S*0.9); return; }catch(e){} } if(fb){ x.save(); x.scale(S/96,S/96); fb(x,t); x.restore(); } }; f.big=true; return f; },
  // ingredient tiles: rows = [{title, items:[{k (ITEMS key), have (bool), n (count, optional), need (optional), where (text)}], done (text, optional)}]
  grid:function(rows){ return '<div class="zt-grid">'+rows.map(function(R){ return '<div class="zt-row'+(R.done?' zt-done':'')+'"><div class="zt-rt">'+R.title+(R.done?' <span class="zt-ok">'+R.done+'</span>':'')+'</div><div class="zt-tiles">'+
      R.items.map(function(it){ var I=ITEMS[it.k]||{name:it.k,icon:'?'}, ic=typeof ZIcon!=='undefined'?ZIcon.item(it.k,2.1):'<span>'+I.icon+'</span>';
        return '<div class="zt-tile'+(it.have?' zt-have':' zt-miss')+'" title="'+(I.name||'').replace(/"/g,'&quot;')+(it.where&&!it.have?' — '+it.where.replace(/"/g,'&quot;'):'')+'"><div class="zt-ic">'+ic+'</div><div class="zt-nm">'+I.name+'</div>'+
          (it.need?'<div class="zt-ct">'+(it.n||0)+' / '+it.need+'</div>':'')+(it.have?'<div class="zt-ck">✓</div>':(it.where?'<div class="zt-wh">'+it.where+'</div>':''))+'</div>'; }).join('')+(R.cost?'<div class="zt-tile zt-cost'+(R.costOk?' zt-have':' zt-miss')+'"><div class="zt-ic" style="font-size:22px">💰</div><div class="zt-nm">'+R.cost+' gold</div></div>':'')+(R.out?'<div class="zt-arrow">→</div><div class="zt-tile zt-out'+(R.done?' zt-have':'')+'"><div class="zt-ic">'+(typeof ZIcon!=='undefined'?ZIcon.item(R.out,2.1):'')+'</div><div class="zt-nm">'+((ITEMS[R.out]||{}).name||R.out)+'</div></div>':'')+'</div></div>'; }).join('')+'</div>'; }
};
(function(){ if(typeof document!=='undefined'){ var st=document.createElement('style'); st.textContent=
  '.fairy-modal.zt-wide{max-width:720px}.zt-grid{margin-top:8px;display:flex;flex-direction:column;gap:7px}.zt-row{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:5px 7px}'+
  '.zt-rt{font-size:13.5px;font-weight:700;margin-bottom:4px}.zt-ok{color:#9fe8ff;font-weight:600}.zt-tiles{display:flex;gap:6px;align-items:center;flex-wrap:wrap}'+
  '.zt-tile{position:relative;width:88px;min-height:80px;border-radius:7px;border:1px solid rgba(255,255,255,.14);background:rgba(10,14,28,.6);text-align:center;padding:4px 2px;font-size:11.5px;line-height:1.15}'+
  '.zt-ic{height:36px;display:flex;align-items:center;justify-content:center;font-size:26px}.zt-nm{margin-top:3px;color:#e6e0f4}.zt-ct{color:#ffd890;font-weight:700}.zt-wh{color:#9aa0b4;font-size:10.5px;margin-top:2px}'+
  '.zt-ck{position:absolute;top:2px;right:4px;color:#7cf0a0;font-weight:900;font-size:12px}.zt-have{border-color:rgba(124,240,160,.55)}'+
  '.zt-miss .zt-ic,.zt-miss .zt-nm{filter:grayscale(1);opacity:.42}.zt-arrow{font-size:18px;color:#ffd890;padding:0 2px}.zt-out{border-color:rgba(255,216,144,.5)}.zt-done{opacity:.8}';
  document.head.appendChild(st); } })();
setTimeout(function(){ if(typeof ZSPIRIT==='undefined')return;
  // the box: a 150 px portrait; painted portraits draw at full size, the old drawings are scaled up to fill it
  ZSPIRIT.talk=function(name,col,html,btns,draw,wide){ var el=document.getElementById('fairy-talk'), S=ZTALK.PX; if(!el){ el=document.createElement('div'); el.id='fairy-talk'; el.className='overlay'; el.style.display='none'; el.onclick=function(e){ if(e.target===el)FairyTalk.close(); }; document.body.appendChild(el); }
    el.innerHTML='<div class="modal fairy-modal'+(wide||/zt-grid/.test(html)?' zt-wide':'')+'" onclick="event.stopPropagation()" style="border-color:'+col+'"><div class="ft-row"><canvas id="ft-cv" width="'+S+'" height="'+S+'"></canvas><div style="flex:1;min-width:0"><div class="ft-name" style="color:'+col+'"></div><div class="ft-text">'+html+'</div></div></div><div class="ft-btns">'+btns.map(function(b,i){ return '<button data-i="'+i+'">'+b.t+'</button>'; }).join('')+'</div></div>';
    el.querySelector('.ft-name').textContent=name; el.style.display='flex'; if(typeof ZIcon!=='undefined'&&ZIcon.hydrate)try{ ZIcon.hydrate(el); }catch(e){}
    el.querySelectorAll('.ft-btns button').forEach(function(b){ b.onclick=function(){ var B=btns[+b.dataset.i]; FairyTalk.close(); if(B.f)setTimeout(B.f,30); }; });
    clearInterval(FairyTalk._t); var cv=document.getElementById('ft-cv'), x=cv.getContext('2d'), t=0; x.imageSmoothingEnabled=true; x.imageSmoothingQuality='high';
    var step=function(){ if(!cv.isConnected){ clearInterval(FairyTalk._t); return; } x.clearRect(0,0,S,S); try{ if(draw&&draw.big)draw(x,t,S); else if(draw){ x.save(); x.scale(S/96,S/96); draw(x,t); x.restore(); } }catch(e){} t++; };
    step(); FairyTalk._t=setInterval(step,120); };
  // the spirits: their own painted picture (bound or free) — the spirit of the bindstone the hero stands at
  var ds0=ZSPIRIT._drawSpirit; ZSPIRIT._drawSpirit=function(free,s){ var fb=ds0.apply(ZSPIRIT,arguments);
    if(!s){ try{ var ws=game.scene.getScene('World'), b=1e9; (ws&&ws.wd&&ws.wd._shrines||[]).forEach(function(q){ var d=Math.hypot(ws.player.x-q.x,ws.player.y-q.y); if(d<TILE*4&&d<b){ b=d; s=q; } }); }catch(e){} }
    var id=s&&ZSPIRIT.uniqueId(s,free?'free':'toil'); return id?ZTALK.scn(id,fb):fb; };
  ZSPIRIT._drawSolveig=function(){ return ZTALK.scn('np_solveig',function(x,t){ x.save(); x.translate(48,50+Math.sin(t*0.3)); x.fillStyle='#2e4a66'; x.beginPath(); x.moveTo(-16,40); x.lineTo(-10,0); x.lineTo(10,0); x.lineTo(16,40); x.closePath(); x.fill(); x.fillStyle='#f0d2b0'; x.beginPath(); x.arc(0,-10,10,0,Math.PI*2); x.fill(); x.restore(); }); };
  // Sólveig: the shards of each realm as tiles (six needed), the lattice they make
  ZSPIRIT.solveig=function(ws){ var ps=ws.playerState, btns=[], rows=[];
    for(var q=1;q<=4;q++){ var sh=ZSPIRIT.items(ps,'soulglass_'+q), latK='soulglass_lattice_'+q, lat=ZSPIRIT.items(ps,latK)||((ps.inventory||[]).indexOf('heartglass_'+q)>=0), fr=ZSPIRIT.count(ps,q);
      rows.push({title:['','🌿','💧','⛰','🔥'][q]+' '+ZSPIRIT.REALM[q]+' <span style="font-weight:400;color:#9aa0b4">· spirits freed '+fr+' / 10</span>',done:lat?'lattice made ✓':'',items:[{k:'soulglass_'+q,have:sh>=ZSPIRIT.NEED,n:sh,need:ZSPIRIT.NEED,where:'free the '+ZSPIRIT.REALM[q]+'\'s bound spirits'}],out:latK});
      if(sh>=ZSPIRIT.NEED&&!lat)(function(q){ btns.push({t:'Fuse the '+ZSPIRIT.REALM[q]+' lattice',f:function(){ ZSPIRIT.fuse(ws,q); }}); })(q); }
    btns.push({t:'Farewell'});
    ZSPIRIT.talk('Sólveig the Glasswright','#9fe8ff','Welcome to the Glimmerhall, '+heroName(ps)+'. Every spirit you free leaves a shard of <b>soulglass</b> — the light the Binders chained. Bring me <b>six shards of one realm</b> and I will fuse them into that realm\'s <b>Soulglass lattice</b>. Its true form can only be made in the heart of a forge.'+ZTALK.grid(rows),btns,ZSPIRIT._drawSolveig()); };
},0);
// Mira: her portrait from the painted atlas, and each tray's ingredients as tiles
setTimeout(function(){ if(typeof ZMIRA==='undefined')return;
  var d0=ZMIRA._draw; ZMIRA._draw=function(){ return ZTALK.ch('crafts_2',d0.apply(ZMIRA,arguments)); };
  ZMIRA.talk=function(ws){ var ps=ws.playerState, btns=[], rows=[], c=function(id){ return ZMIRA.has(ps,id); };
    for(var q=1;q<=4;q++){ var m=ZMIRA.METAL[q], g=ZMIRA.GEM[q], tr=ZMIRA.TRAY(q), done=c(tr)||((ps.traysMade||{})[q]), open=(ps.unlockedSections||[1]).indexOf(q)>=0;
      rows.push({title:['','🌿','💧','⛰','🔥'][q]+' '+ITEMS[tr].name+(open?'':' <span style="font-weight:400;color:#9aa0b4">· the '+ZMIRA.REALM[q]+' is not open yet</span>'),done:done?'made ✓':'',
        items:[{k:m,have:done||c(m),where:'the '+ZMIRA.ISLE[q]+' trader'},{k:g,have:done||c(g),where:'the '+ZMIRA.REALM[q]+' boss dungeon'}],cost:done?0:ZMIRA.COST,costOk:(ps.gold||0)>=ZMIRA.COST,out:tr});
      if(!done&&c(m)&&c(g))(function(q){ btns.push({t:'Make the '+ITEMS[ZMIRA.TRAY(q)].name+' ('+ZMIRA.COST+'g)',f:function(){ ZMIRA.make(ws,q); }}); })(q); }
    btns.push({t:'Farewell'});
    ZSPIRIT.talk('Mira the Mechanic','#ffd890','So you\'re '+heroName(ps)+'. Sólveig tells me you\'re making soulglass for the forges. Glass alone will melt in that heat — it needs a <b>hearth tray</b> under it. Bring me a realm\'s <b>metal</b> from its island trader and its <b>soul gem</b>, and I\'ll make that realm\'s tray.'+ZTALK.grid(rows),btns,ZMIRA._draw()); };
},0);

// ── round 60 (Kris: "when releasing the spirit, it still shows the old pixel art in the pop-up as well as when talking to fairies") ──
// the freed spirit's own picture always (not the nearest stone's); the fairies and the fairy kings from their painted atlas frames, in the big box
setTimeout(function(){
  if(typeof ZSPIRIT!=='undefined'){ var fr0=ZSPIRIT.free; ZSPIRIT.free=function(ws,s){ ZSPIRIT._curS=s; try{ return fr0.apply(ZSPIRIT,arguments); } finally{ ZSPIRIT._curS=null; } };
    var ds1=ZSPIRIT._drawSpirit; ZSPIRIT._drawSpirit=function(free,s){ return ds1.call(ZSPIRIT,free,s||ZSPIRIT._curS); }; }
  if(typeof FairyTalk==='undefined'||typeof ZSPIRIT==='undefined')return;
  FairyTalk.show=function(f,html,btns){ var col=f.F?f.F.col:'#ffe0ff', id=f.king?(typeof FAIRY_PICK!=='undefined'&&FAIRY_PICK[f.king]):(f.F&&f.F.id), ch=id?'fairy_'+id:null;
    var fr=null, old=function(x,t){ try{ if(!fr)fr=f.king?fairyKingFrames(f.king):fairyFrames(f.F); x.drawImage(fr[t%4],0,0,96,96); }catch(e){} };
    var draw=ch?ZTALK.ch(ch,old):old;
    if(f.king&&ch){ var d0=draw; draw=function(x,t,S){ d0(x,t,S); x.save(); x.translate(S/2,S*0.1); x.fillStyle='#ffd84a'; x.beginPath(); x.moveTo(-14,10); x.lineTo(-11,-2); x.lineTo(-5,5); x.lineTo(0,-6); x.lineTo(5,5); x.lineTo(11,-2); x.lineTo(14,10); x.closePath(); x.fill(); x.restore(); }; draw.big=true; }
    ZSPIRIT.talk((f.king?'👑 ':'✨ ')+f.name,col,html,btns,draw); };
},0);
