// ═══════════════════════════════════════════════════════════════════════
// ║ 21q3-current-quest.js — round 110 (Kris: "i like the arrow that shows you where to go for your quests, lets make a way that you can
// ║ have a current quest, and it will show up on the map like it does for the guild hall and such").
// ║  · Any quest can be made THE CURRENT QUEST: "☆ Make current" in the quest journal, or ☆ beside it in the map's quest list. (It is the
// ║    journal's tracking, round 100, under a plainer name.) Click again to let it go; with none chosen, the next step of the Saga leads.
// ║  · The gold arrow on the rim of the little map points to it (as for the guild hall), and the line under the little map names it.
// ║  · On the big map it stands out: a pulsing gold star pin with its name, wherever it is, beside your own "You" ring.
// ═══════════════════════════════════════════════════════════════════════
var ZCURQ={ on:true,
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  // what the arrow points to now: {x, y, t} (world pixels and a name) — the same target as the minimap arrow
  now:function(ws){ try{ return typeof ZJOUR!=='undefined'&&ZJOUR.target?ZJOUR.target(ws):null; }catch(e){ return null; } },
  set:function(ws,id){ var ps=ws.playerState; ps.tracked=ps.tracked===id?null:id; var m=/^s(\d)_(tower|dungeon|harbor|skyport)$/.exec(id||''); ps.activeQuest=ps.tracked&&m?id:null;
    if(typeof ZQMAP!=='undefined')ZQMAP._c=null; var c=document.getElementById('quest-list-container'); if(c)c._qh='';
    try{ if(typeof ZJOUR!=='undefined'&&ZJOUR.render)ZJOUR.render(ws); }catch(e){}
    var t=ZCURQ.now(ws); if(ps.tracked&&t)showNotif('★ Current quest: '+t.t+' — the gold arrow points the way','#ffe27a'); else if(!ps.tracked)showNotif('☆ No current quest — the arrow follows the Saga','#cfe8ff');
    ZCURQ.redraw(ws); },
  redraw:function(ws){ try{ var m=document.getElementById('modal-map'); if(m&&m.style.display!=='none'&&m.offsetParent!==null&&typeof renderMinimap==='function')renderMinimap(ws.wd,null,null,null,0,null,true); }catch(e){} },
  // the star pin on the big map
  pin:function(cv,ws,v){ var wrap=cv.parentNode; if(!wrap)return; var el=document.getElementById('wm-cur'), T=ZCURQ.on?ZCURQ.now(ws):null;
    if(!el){ el=document.createElement('div'); el.id='wm-cur'; el.innerHTML='<i></i><u>★</u><b></b>'; wrap.appendChild(el);
      var st=document.createElement('style'); st.textContent='#wm-cur{position:absolute;width:0;height:0;pointer-events:none;z-index:3}#wm-cur i{position:absolute;left:-15px;top:-15px;width:30px;height:30px;border-radius:50%;border:3px solid #ffd84a;box-shadow:0 0 12px #ffd84a;animation:wmYou 1.6s ease-out infinite}'+
        '#wm-cur u{position:absolute;left:-12px;top:-14px;width:24px;text-align:center;font:700 20px/24px serif;text-decoration:none;color:#ffe27a;text-shadow:0 0 6px #000,0 0 10px #ffb000}'+
        '#wm-cur b{position:absolute;left:-90px;top:16px;width:180px;text-align:center;font:700 11px "Segoe UI",sans-serif;color:#2a1a00}#wm-cur b span{background:#ffd84a;border-radius:8px;padding:1px 7px;box-shadow:0 1px 4px rgba(0,0,0,.6);white-space:nowrap}'+
        '.wmq-cur{flex:none;margin-left:4px;font:700 13px serif;width:24px;height:22px;border-radius:6px;border:1px solid rgba(255,216,74,.6);background:rgba(40,30,0,.5);color:#ffe27a;cursor:pointer;padding:0}.wmq-cur.on{background:#ffd84a;color:#2a1a00}.wmq.cur{box-shadow:inset 3px 0 0 #ffd84a}';
      document.head.appendChild(st); }
    if(!T){ el.style.display='none'; return; }
    var tx=T.x/TILE, ty=T.y/TILE, w=cv.clientWidth||(typeof WMAP!=='undefined'?WMAP.side:400), inV=tx>=v.x&&ty>=v.y&&tx<=v.x+v.w&&ty<=v.y+v.h;
    el.style.display=inV?'':'none'; if(!inV)return; el.style.left=(cv.offsetLeft+(tx-v.x)/v.w*w)+'px'; el.style.top=(cv.offsetTop+(ty-v.y)/v.h*(cv.clientHeight||w))+'px';
    var ps=ws.playerState, lab=(ps.tracked?'':'Next: ')+T.t; el.querySelector('b').innerHTML='<span>'+String(lab).replace(/</g,'&lt;')+'</span>'; }
};
(function(){
  // the big map: the star pin with "You"
  if(typeof _wmYou==='function'){ var y0=_wmYou; _wmYou=function(cv,ws,v){ var r=y0.apply(this,arguments); try{ ZCURQ.pin(cv,ws,v); }catch(e){} return r; }; }
  // the map's quest list: ☆ to make one current (★ the current one)
  if(typeof ZQMAP!=='undefined'&&ZQMAP.html){ var h0=ZQMAP.html; ZQMAP.html=function(ws){ var h=h0.apply(this,arguments); try{ ws=ws||ZCURQ.ws(); var tr=ws&&ws.playerState&&ws.playerState.tracked;
      ZQMAP.list(ws).forEach(function(q){ var on=tr===q.id, k='data-x="'+q.tx+'" data-y="'+q.ty+'" title="Show on the map">📍</button>', i=h.indexOf(k);
        if(i>=0){ var j=i+k.length; h=h.slice(0,j)+'<button class="wmq-cur'+(on?' on':'')+'" data-cur="'+q.id+'" title="'+(on?'Your current quest — click to let it go':'Make this your current quest: the gold arrow points to it')+'">'+(on?'★':'☆')+'</button>'+h.slice(j); } });
    }catch(e){} return h; }; }
  // the journal: "Track" is called what it is
  if(typeof ZJOUR!=='undefined'&&ZJOUR.html){ var j0=ZJOUR.html; ZJOUR.html=function(ws){ var h=j0.apply(this,arguments); return String(h).replace(/◎ Track/g,'☆ Make current').replace(/◉ Tracked/g,'★ Current quest').replace(/title="Track it — an arrow on the little map"/g,'title="Make it your current quest — the gold arrow points to it, and it is starred on the map"'); }; }
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.wmq-cur'); if(!b)return; e.stopPropagation(); e.preventDefault(); var ws=ZCURQ.ws(); if(ws&&ws.playerState)ZCURQ.set(ws,b.dataset.cur); },true);
})();
// ── round 110 (Kris: "it would also be helpful to have monster camps shown somehow on the map"): every monster camp you have explored near
// is drawn on the big map as a small tent — red while its guards stand, green once beaten (grey when its one-time reward is taken); zoomed
// in, the reward it guards shows beside it. A line under the quest list says what the tents mean. ZCURQ.CAMPS: the switch.
ZCURQ.CAMPS=true;
ZCURQ.RW={chest:'💰',food:'🍖',well:'💧',mana:'🔷',buff:'✨',xp:'ᚱ',ammo:'🏹',gems:'💎'};
ZCURQ.camps=function(ctx,cw,ch,ws,v,o){ if(!ZCURQ.CAMPS||!o||!o.full||!ws||!ws._camps)return; var ps=ws.playerState, sc=cw/v.w, r=Math.max(4,Math.min(9,sc*1.6)), big=sc>=2.2;
  ctx.save(); ctx.textAlign='center'; ctx.textBaseline='middle'; ZCURQ._drawn=0;
  ws._camps.forEach(function(C){ if(!/^c[1-4]_/.test(C.id||''))return; var tx=C.tx+0.5, ty=C.ty+0.5; if(typeof _wmExplored==='function'&&!_wmExplored(ps,tx,ty))return;
    var x=(tx-v.x)*sc, y=(ty-v.y)*sc; if(x<-12||y<-12||x>cw+12||y>ch+12)return; ZCURQ._drawn++;
    var g=C.state==='guarded', spent=C.state==='spent'||(ps.campsDone||{})[C.id], col=g?'#e0483c':spent?'#8a8f88':'#5cc86a';
    ctx.fillStyle='rgba(0,0,0,.45)'; ctx.beginPath(); ctx.ellipse(x,y+r*0.55,r*1.1,r*0.35,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle=col; ctx.strokeStyle='#1a0e08'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(x,y-r); ctx.lineTo(x+r,y+r*0.55); ctx.lineTo(x-r,y+r*0.55); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle='#1a0e08'; ctx.beginPath(); ctx.moveTo(x,y-r*0.15); ctx.lineTo(x+r*0.3,y+r*0.55); ctx.lineTo(x-r*0.3,y+r*0.55); ctx.closePath(); ctx.fill();
    if(big){ var e=ZCURQ.RW[C.T&&C.T.r&&C.T.r.k]; if(e){ ctx.font=Math.round(r*1.2)+'px serif'; ctx.globalAlpha=g?1:0.6; ctx.fillText(e,x+r*1.5,y-r*0.4); ctx.globalAlpha=1; } } });
  ctx.restore(); };
(function(){
  if(typeof _wmDrawView==='function'){ var d1=_wmDrawView; _wmDrawView=function(ctx,cw,ch,ws,v,o){ var r=d1.apply(this,arguments); try{ ZCURQ.camps(ctx,cw,ch,ws,v,o); }catch(e){} return r; }; }
  if(typeof ZQMAP!=='undefined'&&ZQMAP.html){ var h1=ZQMAP.html; ZQMAP.html=function(ws){ var h=h1.apply(this,arguments); if(!ZCURQ.CAMPS)return h;
      var leg='<div class="wm-note wmq-camps"><span style="color:#e0483c">▲</span> monster camps still guarded · <span style="color:#5cc86a">▲</span> beaten · <span style="color:#8a8f88">▲</span> reward taken — the places you have explored</div>';
      var k='<button class="wmq-j">'; var i=h.lastIndexOf(k); return i>=0?h.slice(0,i)+leg+h.slice(i):h+leg; }; }
})();
// ── round 110 (Kris: "as well as quest locations on the map. like the first ones for master oswin"): the side quests that have a place —
// Oswin's purse (the camp) and Old Nell's net, Tumbler Pia's pins — stand in the map's quest list and as numbered pins with the rest, and
// can be made the current quest like any other.
ZCURQ.side=function(ws){ var ps=ws.playerState, out=[];
  if(typeof ZOSW!=='undefined'){ var T=ZOSW.tq(ps);
    if(T.camp===1){ var a=ZOSW.target(ws,'camp'); if(a)out.push({id:'tq:camp',x:a.x,y:a.y,ic:'💰',title:'Oswin\'s purse',sub:a.t.replace(/^Oswin's purse — /,'')+' · 50 g'}); }
    if(T.net===1||T.net===2){ var b=ZOSW.target(ws,'net'); if(b)out.push({id:'tq:net',x:b.x,y:b.y,ic:'🎣',title:T.net===1?'Old Nell\'s net':'Bring Nell her net',sub:b.t+' · 50 g'}); } }
  if(ps.rollQ===1&&typeof ZROLL!=='undefined'){ var L=(ZROLL.pins||[]).filter(function(p){ return !p.got; }), P=ws.player;
    if(L.length){ var n=L.slice().sort(function(p,q){ return Math.hypot(p.x-P.x,p.y-P.y)-Math.hypot(q.x-P.x,q.y-P.y); })[0]; out.push({id:'roll',x:n.x,y:n.y,ic:'🤸',title:'Pia\'s juggling pins',sub:L.length+' still in the meadow'}); }
    else { var N=ZROLL.npc||(ZROLL.spot&&ZROLL.spot(ws)); if(N)out.push({id:'roll',x:N.x,y:N.y,ic:'🤸',title:'Back to Tumbler Pia',sub:'all three pins found'}); } }
  return out; };
(function(){ if(typeof ZQMAP==='undefined'||!ZQMAP.list)return; var l0=ZQMAP.list; ZQMAP.list=function(ws){ var L=l0.apply(this,arguments); ws=ws||ZCURQ.ws(); if(!ws||!ws.playerState||!ws.player)return L;
    var S=[]; try{ S=ZCURQ.side(ws); }catch(e){} if(!S.length)return L; var tr=ws.playerState.tracked, px=ws.player.x/TILE, py=ws.player.y/TILE, out=L.filter(function(q){ return !/^(tq:|roll$)/.test(q.id); });
    S.forEach(function(s){ var q={id:s.id,tx:s.x/TILE,ty:s.y/TILE,ic:s.ic,title:s.title,sub:s.sub,act:tr===s.id,side:true}; q.d=Math.hypot(q.tx-px,q.ty-py); var a=Math.atan2(q.ty-py,q.tx-px); q.dir=['E','SE','S','SW','W','NW','N','NE'][((Math.round(a/(Math.PI/4))%8)+8)%8]; out.push(q); });
    out.sort(function(a,b){ return (b.act?1:0)-(a.act?1:0)||(b.side?1:0)-(a.side?1:0)||a.d-b.d; }); out=out.slice(0,16); out.forEach(function(q,i){ q.n=i+1; }); return out; }; })();
