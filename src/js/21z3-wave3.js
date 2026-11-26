// ═══════════════════════════════════════════════════════════════════════
// ║ 21z3-wave3.js — round 134: ENGAGEMENT, WAVE 3 (Kris's picks, doc 88: "proceed with all 3").
// ║  · ZFEST     festivals: the first three game-days of each new season (21z2 ZDAY) the Green is dressed with that season's painted
// ║              festival pieces, and a board by the well offers three small games — Rune toss, Rune memory, Race the Green. Playing earns
// ║              the season's ribbon (Tome › Collection, and a keepsake for your shelf at home); a best score is kept. Festivals return each
// ║              time a season does — nothing is missed for good.
// ║  · ZTROPHY   home_trophies: at home, a trophy shelf with eight spots — boss trophies, festival ribbons and keepsakes, placed and
// ║              moved by you.
// ║  · ZLOOM     loom: the Saga Loom in the guild hall weaves a tapestry panel for every saga you finish (each realm, then the end).
// ║  · ZSECRET   secrets: 120 small hidden things, 30 in each realm — lost runes, huldra stones, nests, old carvings, mushroom rings,
// ║              coin pouches, map scraps, and a fox that leads somewhere. A faint glint when you are close; walk over to take it.
// ║  · ZECHO     the crypt by the Green: every guardian you beat waits there as an echo. Fight it again for runes — bronze (win),
// ║              silver (three hits or fewer), gold (no hit). Your time becomes a challenge code; paste a friend's to race their time.
// ║              Falling in an echo costs nothing. After the end, the crypt's far door is THE SAGA RETOLD (ZNGP): a new saga in a free
// ║              slot, the Tome, stickers, runes, ribbons and trophies kept, and every foe stronger.
// ║  · ZBOND     bonds (light, Kris): six villagers — Oswin, Benno, Morwen, Runa, Brask, Garrick — grow hearts as you talk with them
// ║              (once a day each). Every heart unlocks one more line of their own saga.
// ║  · ZBANNER   the saga frame (take 4: "i like all of these") at the big beats — a new realm, a guardian down: the frame fades in with
// ║              a line, holds, fades. It picks among the banners Kris has chosen (the 20 thin ones are being painted: r134_banners).
// ║  · ZAURORA   aurora in the water (take 4 ✓): on clear nights a soft shifting sheen lies on open water only — under every bridge,
// ║              prop and person.
// ║ Not here: the landmarks (take 4: to be repainted — the switch stays off) and the village's six looks (waits for its paintings).
// ═══════════════════════════════════════════════════════════════════════
var Z3={ near:function(ws,x,y,r){ return ws&&ws.player&&Math.hypot(ws.player.x-x,ws.player.y-y)<r; },
  img:function(ws,id,x,footY,h){ if(typeof ZScn==='undefined'||!ZScn.has||!ZScn.has(id))return null; var key='z3_'+id;
    if(!ws.textures.exists(key)){ try{ var it=ZScn.META.items[id], im=ZScn.img[it[0]]; if(!im)return null; var c=document.createElement('canvas'); c.width=it[3]; c.height=it[4]; c.getContext('2d').drawImage(im,it[1],it[2],it[3],it[4],0,0,it[3],it[4]); ws.textures.addCanvas(key,c); }catch(e){ return null; } }
    var t=ws.textures.get(key).getSourceImage(), o=ws.add.image(x,footY,key).setOrigin(0.5,0.96); o.setDisplaySize(h*t.width/t.height,h); o.setDepth(typeof WR_DEPTH==='function'?WR_DEPTH(footY):10); return o; },
  // open ground (no water, rock or building) — whether or not its realm is open yet
  free:function(ws,x,y){ try{ if(typeof _vbBlocked==='function'&&_vbBlocked(ws.wd,x,y,x,y+40))return false; var C=[[x-8,y-6],[x+8,y-6],[x-8,y+6],[x+8,y+6],[x,y]];
      for(var i=0;i<C.length;i++){ var tx=Math.floor(C[i][0]/TILE), ty=Math.floor(C[i][1]/TILE); if(tx<0||ty<0||tx>=WORLD_W||ty>=WORLD_H)return false; var v=ws.tiles&&ws.tiles[ty]?ws.tiles[ty][tx]:null; if(v==null||(typeof canPassTile==='function'&&!canPassTile(v,null)))return false; } return true; }catch(e){ return false; } },
  rng:function(seed){ var s=seed>>>0||1; return function(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; },
  prompt:function(ws,key,x,y,txt){ var P=ws._z3p||(ws._z3p={}); if(!P[key]||!P[key].scene){ P[key]=ws.add.text(x,y,txt,{fontSize:'10px',color:'#ffff88',stroke:'#000',strokeThickness:3,fontFamily:'Segoe UI',align:'center'}).setOrigin(0.5,1).setDepth(10.99); } P[key].setVisible(true); return P[key]; },
  hide:function(ws,key){ var P=ws&&ws._z3p; if(P&&P[key]&&P[key].scene)P[key].setVisible(false); },
  blocked:function(){ try{ return (typeof _openOverlays==='function'&&_openOverlays().length)||(typeof ZDLG!=='undefined'&&ZDLG.open)||document.querySelector('.zfest-ui,.zecho-ui,.zshelf,.zloom,.zrecap,.zhearth,.zletters'); }catch(e){ return false; } },
  // the thing you can [Tab] right now (set by each tick)
  tab:null };
if(typeof document!=='undefined')document.addEventListener('keydown',function(e){ if(e.key!=='Tab'||!Z3.tab||Z3.blocked())return; var f=Z3.tab; if(!Z2.act('World')&&!Z2.act('Building'))return; e.preventDefault(); e.stopImmediatePropagation(); Z3.tab=null; try{ f(); }catch(err){ if(typeof console!=='undefined')console.warn(err); } },true);

// ── festivals ──
var ZFEST={ on:true,
  PIECES:{sp:['fs_sp_pole','fs_sp_arch','fs_sp_tafl','fs_sp_cart','fs_sp_crowns','fs_sp_post'],su:['fs_su_fire_on','fs_su_wheel','fs_su_table','fs_su_boat','fs_su_judge'],au:['fs_au_stage','fs_au_figure','fs_au_barrels','fs_au_baskets','fs_au_forge','fs_au_candles'],
    wi:['fs_wi_tree','fs_wi_goat','fs_wi_log','fs_wi_oath','fs_wi_gifts'],bl:['fs_bl_pole','fs_bl_banner','fs_bl_garland','fs_bl_cart','fs_bl_crowns','fs_bl_cradles']},
  H:{fs_sp_pole:120,fs_sp_arch:90,fs_su_fire_on:70,fs_su_wheel:80,fs_au_stage:90,fs_au_figure:110,fs_wi_tree:120,fs_wi_goat:90,fs_bl_pole:120,fs_bl_banner:90,fs_bl_garland:80},
  GAMES:[['toss','🎯','Rune toss','Stop the rune in the gold — five throws.'],['memory','🧠','Rune memory','Turn the stones two at a time and find the six pairs.'],['run','🏃','Race the Green','Touch the six ribbon posts round the Green before the horn.']],
  centre:function(ws){ return {x:(typeof CENTER_X!=='undefined'?CENTER_X:690)*TILE+TILE/2,y:(typeof CENTER_Y!=='undefined'?CENTER_Y:520)*TILE+TILE/2}; },
  dress:function(ws,s){ ZFEST.undress(ws); var C=ZFEST.centre(ws), L=ws._zfest=[], P=ZFEST.PIECES[s]||[], R=Z3.rng(77+s.length*13), board=null;
    P.forEach(function(id,i){ for(var k=0;k<24;k++){ var a=(i/P.length)*Math.PI*2+R()*0.5+k*0.3, r=(5+R()*4+k*0.25)*TILE, x=C.x+Math.cos(a)*r, y=C.y+Math.sin(a)*r*0.8; if(!Z3.free(ws,x,y))continue; var o=Z3.img(ws,id,x,y,ZFEST.H[id]||64); if(o){ L.push(o); if(!board)board={x:x,y:y}; } break; } });
    if(!board){ for(var k2=0;k2<40;k2++){ var x2=C.x+(3+k2*0.2)*TILE*Math.cos(k2), y2=C.y+(3+k2*0.2)*TILE*Math.sin(k2); if(Z3.free(ws,x2,y2)){ board={x:x2,y:y2}; break; } } }
    if(!board)board={x:C.x+3*TILE,y:C.y+2*TILE};
    var sign=ws.add.text(board.x,board.y-48,ZDAY.FICON[s],{fontSize:'26px'}).setOrigin(0.5,1).setDepth(10.98); ws.tweens.add({targets:sign,y:sign.y-6,duration:900,yoyo:true,repeat:-1,ease:'Sine.inOut'}); L.push(sign);
    ws._zfestBoard=board; ws._zfestS=s; },
  undress:function(ws){ (ws._zfest||[]).forEach(function(o){ try{ ws.tweens.killTweensOf(o); o.destroy(); }catch(e){} }); ws._zfest=null; ws._zfestS=null; ws._zfestBoard=null; Z3.hide(ws,'fest'); },
  tick:function(){ if(!ZFEST.on)return; var ws=Z2.ws(); if(!ws||!ws.player||!ws.playerState||!Z2.act('World'))return; var ps=ws.playerState, s=ZDAY.fest(ps);
    if(s&&ws._zfestS!==s)ZFEST.dress(ws,s); else if(!s&&ws._zfestS)ZFEST.undress(ws);
    var B=ws._zfestBoard; if(B&&Z3.near(ws,B.x,B.y,TILE*2.2)){ Z3.prompt(ws,'fest',B.x,B.y-56,'[Tab] '+ZDAY.FNAME[s]+' — games'); Z3.tab=function(){ ZFEST.open(s); }; } else Z3.hide(ws,'fest');
    if(ZFEST.race)ZFEST.raceTick(ws); },
  open:function(s){ var ps=Z2.ps(), best=ps.festBest||(ps.festBest={}), bg=Z2.pic('fs_'+s+'_'+(s==='su'?'fire_on':s==='wi'?'tree':'pole'));
    var d=Z2.overlay('zfest-ui','<div class="zf-box">'+(bg?'<img class="zf-pic" src="'+bg+'" alt="">':'')+'<h2>'+ZDAY.FICON[s]+' '+ZDAY.FNAME[s]+'</h2><p>The board by the well, chalked in three hands. Each game you play wins the festival\'s ribbon.</p>'+
      ZFEST.GAMES.map(function(g){ var b=best[s+'_'+g[0]]; return '<button class="zf-g" data-g="'+g[0]+'"><span>'+g[1]+'</span><b>'+g[2]+'</b><small>'+g[3]+(b!=null?' · your best: '+b:'')+'</small></button>'; }).join('')+
      '<div class="zf-rib">'+(ps.ribbons&&ps.ribbons[s]?'🎀 You have this festival\'s ribbon.':'🎀 The ribbon is yours after one game.')+'</div><button class="zf-x">Close</button></div>');
    d.querySelector('.zf-x').onclick=function(){ d.remove(); };
    d.querySelectorAll('.zf-g').forEach(function(b){ b.onclick=function(){ d.remove(); ZFEST[b.dataset.g](s); }; }); },
  win:function(s,game,score,better){ var ps=Z2.ps(), B=ps.festBest||(ps.festBest={}), k=s+'_'+game, nb=B[k]==null||(better?better(score,B[k]):score>B[k]); if(nb)B[k]=score; var R=ps.ribbons||(ps.ribbons={}), first=!R[s]; R[s]=1;
    if(typeof showNotif==='function')showNotif((first?'🎀 '+ZDAY.FNAME[s]+'\'s ribbon is yours! ':'')+(nb?'A new best: '+score:'Score: '+score),'#ffe27a'); if(typeof ZSFX!=='undefined')try{ ZSFX.play('coin'); }catch(e){} },
  // 1. rune toss: a timing bar
  toss:function(s){ var n=0, score=0, x=0, dir=1, sp=1.1, d=Z2.overlay('zfest-ui','<div class="zf-box"><h2>🎯 Rune toss</h2><p>Press <b>Space</b> (or click) when the rune is over the gold.</p><div class="zf-bar"><i class="zf-gold"></i><i class="zf-mk">ᚱ</i></div><div class="zf-sc">Throw 1 of 5 · 0 points</div><button class="zf-x">Stop</button></div>');
    var mk=d.querySelector('.zf-mk'), sc=d.querySelector('.zf-sc'), gold=d.querySelector('.zf-gold'), gx=0.35+Math.random()*0.3; gold.style.left=(gx*100-6)+'%';
    var raf, last=performance.now(), loop=function(t){ var dt=(t-last)/1000; last=t; x+=dir*sp*dt; if(x>1){ x=1; dir=-1; } if(x<0){ x=0; dir=1; } mk.style.left=(x*100)+'%'; raf=requestAnimationFrame(loop); }; raf=requestAnimationFrame(loop);
    var end=function(){ cancelAnimationFrame(raf); document.removeEventListener('keydown',kd,true); d.remove(); },
      throwIt=function(){ var off=Math.abs(x-gx), p=off<0.03?10:off<0.06?6:off<0.1?3:0; score+=p; n++; sc.textContent=(n<5?'Throw '+(n+1)+' of 5 · ':'Done · ')+score+' points'+(p?' (+'+p+')':' (miss)');
        gx=0.15+Math.random()*0.7; gold.style.left=(gx*100-6)+'%'; sp+=0.25; if(n>=5){ end(); ZFEST.win(s,'toss',score); } },
      kd=function(e){ if(e.key===' '||e.key==='Enter'||e.key==='Tab'){ e.preventDefault(); e.stopImmediatePropagation(); if(!e.repeat)throwIt(); } else if(e.key==='Escape'){ e.preventDefault(); e.stopImmediatePropagation(); end(); } };
    document.addEventListener('keydown',kd,true); d.querySelector('.zf-bar').onclick=throwIt; d.querySelector('.zf-x').onclick=end; },
  // 2. rune memory: six pairs
  memory:function(s){ var R='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ', pick=R.split('').sort(function(){ return Math.random()-0.5; }).slice(0,6), cards=pick.concat(pick).sort(function(){ return Math.random()-0.5; }), open=[], got=0, turns=0, t0=Date.now();
    var d=Z2.overlay('zfest-ui','<div class="zf-box"><h2>🧠 Rune memory</h2><div class="zf-mem">'+cards.map(function(c,i){ return '<button data-i="'+i+'"><span>'+c+'</span></button>'; }).join('')+'</div><div class="zf-sc">Turns: 0</div><button class="zf-x">Stop</button></div>');
    var sc=d.querySelector('.zf-sc'); d.querySelector('.zf-x').onclick=function(){ d.remove(); };
    d.querySelectorAll('.zf-mem button').forEach(function(b){ b.onclick=function(){ if(b.classList.contains('up')||open.length>=2)return; b.classList.add('up'); open.push(b); if(open.length<2)return; turns++; sc.textContent='Turns: '+turns;
      var a=open[0], c=open[1]; if(cards[a.dataset.i]===cards[c.dataset.i]){ a.classList.add('ok'); c.classList.add('ok'); open=[]; got++; if(got===6){ var secs=Math.round((Date.now()-t0)/1000); setTimeout(function(){ d.remove(); ZFEST.win(s,'memory',turns,function(a2,b2){ return a2<b2; }); },700); sc.textContent='All six in '+turns+' turns ('+secs+' s)'; } }
      else setTimeout(function(){ a.classList.remove('up'); c.classList.remove('up'); open=[]; },750); }; }); },
  // 3. race the Green: six posts in the world
  race:null,
  raceStart:function(s){ var ws=Z2.ws(); if(!ws||!ws.player)return; var C=ZFEST.centre(ws), L=[]; for(var i=0;i<6;i++){ for(var k=0;k<30;k++){ var a=i/6*Math.PI*2+k*0.21, r=(9+k*0.3)*TILE, x=C.x+Math.cos(a)*r, y=C.y+Math.sin(a)*r*0.75; if(!Z3.free(ws,x,y))continue;
        var g=ws.add.image(x,y,'glow').setTint(0xffd76a).setBlendMode(Phaser.BlendModes.ADD).setDepth(10.97).setScale(0.6); var t=ws.add.text(x,y-8,'🎀',{fontSize:'20px'}).setOrigin(0.5,1).setDepth(10.98); ws.tweens.add({targets:g,scale:0.9,duration:600,yoyo:true,repeat:-1}); L.push({x:x,y:y,g:g,t:t}); break; } }
    var hud=Z2.overlay('zfest-race','🏃 Race the Green — <b>45</b> s · posts left: <b>'+L.length+'</b>'); ZFEST.race={s:s,L:L,t0:Date.now(),T:45,hud:hud}; },
  raceTick:function(ws){ var R=ZFEST.race, left=R.T-(Date.now()-R.t0)/1000;
    R.L.forEach(function(p){ if(!p.done&&Z3.near(ws,p.x,p.y,TILE*1.1)){ p.done=1; p.g.destroy(); p.t.destroy(); if(typeof ZSFX!=='undefined')try{ ZSFX.play('pickup'); }catch(e){} } });
    var n=R.L.filter(function(p){ return !p.done; }).length; R.hud.innerHTML='🏃 Race the Green — <b>'+Math.max(0,Math.ceil(left))+'</b> s · posts left: <b>'+n+'</b>';
    if(!n||left<=0){ R.L.forEach(function(p){ if(!p.done){ p.g.destroy(); p.t.destroy(); } }); R.hud.remove(); ZFEST.race=null; var secs=Math.round((Date.now()-R.t0)/10)/100;
      if(!n)ZFEST.win(R.s,'run',Math.round(secs*10)/10,function(a,b){ return a<b; }); else { if(typeof showNotif==='function')showNotif('📯 The horn! '+(6-n)+' of 6 posts — try again any festival day.','#ffcf9a'); var ps=Z2.ps(); (ps.ribbons||(ps.ribbons={}))[R.s]=1; } } } };
ZFEST.run=function(s){ ZFEST.raceStart(s); };

// ── the trophy shelf at home ──
var ZTROPHY={ on:true, SPOTS:8,
  owned:function(ps){ var L=[]; Object.keys(ps.bossSites||{}).forEach(function(k){ L.push(['boss:'+k,'🏆',ps.bossSites[k],'tr_boss']); });
    Object.keys(ps.ribbons||{}).forEach(function(s){ L.push(['rib:'+s,'🎀',ZDAY.FNAME[s]+' ribbon','tr_rib_'+s]); });
    Object.keys(ps.medals||{}).forEach(function(k){ if(ps.medals[k]>=3)L.push(['gold:'+k,'🥇','Gold rune — '+((ps.medalNames||{})[k]||k),'tr_gold']); });
    if((ps.firstWin||0)>=3)L.push(['lamb','🔔','The lamb\'s bell','tr_lamb_bell']); if(ps.equip&&ps.equip.shield||(ps.firstWin||0)>=4)L.push(['shield','🛡','Your first shield','tr_first_shield']);
    if((ps.spiritsFreed||[]).length>=10)L.push(['soulglass','💠','A shard of soulglass','tr_soulglass']); if(Object.keys(ps.secrets||{}).length>=30)L.push(['runes','🔹','A bowl of lost runes','tr_runes']); if(ps.spiritsHome)L.push(['end','🌸','A blossom from the true spring','tr_blossom']);
    return L; },
  find:function(ps,k){ return ZTROPHY.owned(ps).find(function(o){ return o[0]===k; }); },
  open:function(){ var ps=Z2.ps(); if(!ps)return; var S=ps.trophySpots||(ps.trophySpots={}), bg=Z2.pic('home_shelf'), sel=null;
    var d=Z2.overlay('zshelf',''), draw=function(){ var O=ZTROPHY.owned(ps), placed={}; Object.keys(S).forEach(function(i){ if(S[i])placed[S[i]]=1; });
      d.innerHTML='<div class="zt-box">'+(bg?'<img class="zt-bg" src="'+bg+'" alt="">':'')+'<h2>🏺 Your trophy shelf</h2><p>'+(sel===null?'Pick a spot on the shelf.':'Spot '+(sel+1)+': choose what stands there.')+'</p><div class="zt-spots">'+
        Array.apply(null,{length:ZTROPHY.SPOTS}).map(function(_,i){ var o=S[i]&&ZTROPHY.find(ps,S[i]), p=o&&Z2.pic(o[3]); return '<button class="zt-sp'+(sel===i?' on':'')+'" data-i="'+i+'">'+(o?(p?'<img src="'+p+'" alt="">':'<span>'+o[1]+'</span>')+'<small>'+Z2.esc(o[2])+'</small>':'<em>empty</em>')+'</button>'; }).join('')+'</div>'+
        (sel!==null?'<div class="zt-pick">'+(O.length?O.map(function(o){ return '<button data-k="'+o[0]+'"'+(placed[o[0]]&&S[sel]!==o[0]?' class="used"':'')+'>'+o[1]+' '+Z2.esc(o[2])+'</button>'; }).join(''):'<i>Nothing yet — beat a guardian, keep a festival, save a lamb…</i>')+(S[sel]?'<button data-k="">✕ Take it down</button>':'')+'</div>':'')+'<button class="zt-x">Close</button></div>';
      d.querySelector('.zt-x').onclick=function(){ d.remove(); };
      d.querySelectorAll('.zt-sp').forEach(function(b){ b.onclick=function(){ sel=sel===+b.dataset.i?null:+b.dataset.i; draw(); }; });
      d.querySelectorAll('.zt-pick [data-k]').forEach(function(b){ b.onclick=function(){ var k=b.dataset.k; Object.keys(S).forEach(function(i){ if(S[i]===k)S[i]=null; }); S[sel]=k||null; sel=null; draw(); }; }); };
    draw(); } };
ZEV.sub('boss',function(d,ps){ if(d.echo||!d.site)return; (ps.bossSites||(ps.bossSites={}))[d.site]=d.name; (ps.medalNames||(ps.medalNames={}))[d.site]=d.name; });

// ── the Saga Loom in the guild hall ──
var ZLOOM={ on:true,
  P:[[1,'The Grasslands','the first realm opened, the Silverrun crossed',function(ps){ return (ps.unlockedSections||[]).indexOf(2)>=0; }],[2,'The Wetlands','the lantern lilies, the bridge that held',function(ps){ return (ps.unlockedSections||[]).indexOf(3)>=0; }],
     [3,'The Highlands','the Great Scar and the halls beneath',function(ps){ return (ps.unlockedSections||[]).indexOf(4)>=0; }],[4,'The Ashlands','the ember wall, the forges lit again',function(ps){ return !!ps.spiritsHome||!!ps.grimnirDown; }],[5,'Home','the spirits home, the true spring',function(ps){ return !!ps.spiritsHome; }]],
  open:function(){ var ps=Z2.ps(); if(!ps)return; var d=Z2.overlay('zloom','<div class="zlm-box"><h2>🧵 The Saga Loom</h2><p>Every saga you finish, the weavers add a panel. The wall is yours.</p><div class="zlm-wall">'+ZLOOM.P.map(function(p){ var done=false; try{ done=!!p[3](ps); }catch(e){} var pic=done&&Z2.pic('loom_'+p[0]);
      return '<div class="zlm-p'+(done?' on':'')+'">'+(done?(pic?'<img src="'+pic+'" alt="">':'<span class="zlm-ph">'+['','🌾','🪷','⛰','🔥','🌸'][p[0]]+'</span>')+'<b>'+p[1]+'</b><small>'+p[2]+'</small>':'<span class="zlm-ph">…</span><b>Not yet woven</b>')+'</div>'; }).join('')+'</div>'+
      '<div class="zlm-b"><button class="zlm-card">📜 A card of the wall</button><button class="zlm-x">Close</button></div></div>');
    d.querySelector('.zlm-x').onclick=function(){ d.remove(); }; d.querySelector('.zlm-card').onclick=function(){ var n=ZLOOM.P.filter(function(p){ try{ return p[3](ps); }catch(e){ return false; } }).length; ZSHARE.card({kind:'site',title:'The Saga Loom — '+n+' of 5 panels',sub:Z2.hero(ps)+' · day '+ZDAY.day(ps),pic:Z2.pic('loom_wall')}); }; } };

// ── home and the guild hall: buttons by the door ──
var ZHOME={ tick:function(){ var B=game.scene.getScene('Building'), inB=B&&Z2.act('Building')&&B.building, t=inB&&B.building.type, bar=document.getElementById('zhome-bar');
    var want=t==='house'?[['🏺 Trophy shelf',ZTROPHY.open]]:t==='guild'?[['🧵 The Saga Loom',ZLOOM.open]]:[];
    if(!want.length){ if(bar)bar.style.display='none'; return; } if(!bar){ bar=document.createElement('div'); bar.id='zhome-bar'; (document.getElementById('app')||document.body).appendChild(bar); }
    var sig=want.map(function(w){ return w[0]; }).join('|'); if(bar._sig!==sig){ bar._sig=sig; bar.innerHTML=''; want.forEach(function(w){ var b=document.createElement('button'); b.textContent=w[0]; b.onclick=w[1]; bar.appendChild(b); }); } bar.style.display=''; } };

// ── secrets ──
var ZSECRET={ on:true, PER:30,
  K:[['rune','🔹','A lost rune'],['huldra','🪨','A huldra stone'],['nest','🪺','A hidden nest'],['carving','🗿','An old carving'],['fox','🦊','A fox'],['ring','🍄','A mushroom ring'],['purse','👝','A lost coin pouch'],['scrap','📜','A scrap of an old map']],
  LORE:['"Here Ulfar rested, and the stone remembers his snoring." Someone has added a little drawing of a sleeping bear.','A ring of runes so worn only your fingers can read them: "the road home is longer than the road out".',
    '"Keep the lamps lit." Carved by a hand that pressed very hard.','A ship with seven oars and a sun above it. One oar is broken off, on purpose.','Two names in a heart, the moss grown so thick the names are only shapes.','"The waystones listen." Below, smaller: "so mind your language".',
    'A little map of three hills and a tree. One of the hills has an X. The hill is now a lake.','An eye with a spiral in it. Looking at it too long makes the trees seem to lean in.'],
  list:function(ws){ if(ws._zsec)return ws._zsec; var L=[], R=Z3.rng(0x5ec12e7); if(typeof getTileSection!=='function')return (ws._zsec=L);
    for(var q=1;q<=4;q++){ var n=0, tries=0; while(n<ZSECRET.PER&&tries<6000){ tries++; var tx=Math.floor(R()*WORLD_W), ty=Math.floor(R()*WORLD_H); if(getTileSection(tx,ty)!==q)continue;
        if(Math.hypot(tx-(typeof CENTER_X!=='undefined'?CENTER_X:690),ty-(typeof CENTER_Y!=='undefined'?CENTER_Y:520))<40)continue; var x=tx*TILE+TILE/2, y=ty*TILE+TILE/2; if(!Z3.free(ws,x,y))continue;
        if(L.some(function(s){ return Math.hypot(s.tx-tx,s.ty-ty)<14; }))continue; L.push({id:'sec'+q+'_'+n,q:q,tx:tx,ty:ty,x:x,y:y,k:ZSECRET.K[(n*5+q)%ZSECRET.K.length][0]}); n++; } }
    return (ws._zsec=L); },
  count:function(ps){ var ws=Z2.ws(), L=ws?ZSECRET.list(ws):[], G=ps.secrets||{}, by={}; L.forEach(function(s){ var b=by[s.q]||(by[s.q]={got:0,all:0}); b.all++; if(G[s.id])b.got++; }); return {got:Object.keys(G).length,all:L.length||120,by:by}; },
  tick:function(){ if(!ZSECRET.on)return; var ws=Z2.ws(); if(!ws||!ws.player||!ws.playerState||!Z2.act('World')||ws.wd&&ws.wd.islKey)return; var ps=ws.playerState, G=ps.secrets||(ps.secrets={}), L=ZSECRET.list(ws), px=ws.player.x, py=ws.player.y, gl=ws._zsGl||(ws._zsGl={});
    L.forEach(function(s){ if(G[s.id]){ if(gl[s.id]){ gl[s.id].destroy(); delete gl[s.id]; } return; } var d=Math.hypot(px-s.x,py-s.y);
      if(d<TILE*5){ if(!gl[s.id]||!gl[s.id].scene){ var g=gl[s.id]=ws.add.image(s.x,s.y,'glow').setTint(0xbff8ff).setBlendMode(Phaser.BlendModes.ADD).setDepth(10.96).setScale(0.22).setAlpha(0.35); ws.tweens.add({targets:g,alpha:0.85,scale:0.34,duration:700,yoyo:true,repeat:-1,ease:'Sine.inOut'}); } }
      else if(gl[s.id]){ gl[s.id].destroy(); delete gl[s.id]; }
      if(d<TILE*0.9)ZSECRET.take(ws,s); }); },
  take:function(ws,s){ var ps=ws.playerState, K=ZSECRET.K.find(function(k){ return k[0]===s.k; }), msg='';
    if(s.k==='fox'&&!s.led){ s.led=1; var fx=ws.add.text(s.x,s.y,'🦊',{fontSize:'22px'}).setOrigin(0.5,1).setDepth(10.97), nx=s.x, ny=s.y;
      for(var k=0;k<20;k++){ var a=Math.random()*Math.PI*2, r=(6+Math.random()*4)*TILE, x=s.x+Math.cos(a)*r, y=s.y+Math.sin(a)*r; if(Z3.free(ws,x,y)){ nx=x; ny=y; break; } }
      ws.tweens.add({targets:fx,x:nx,y:ny,duration:2200,ease:'Sine.inOut',onComplete:function(){ ws.tweens.add({targets:fx,alpha:0,duration:600,onComplete:function(){ fx.destroy(); }}); }}); s.x=nx; s.y=ny; if(typeof showNotif==='function')showNotif('🦊 A fox! It looks back at you, then trots off… follow it.','#ffcf9a'); return; }
    (ps.secrets||(ps.secrets={}))[s.id]=1;
    if(s.k==='rune'||s.k==='huldra'||s.k==='purse'){ var g={rune:15,huldra:30,purse:40}[s.k]; ps.gold=(ps.gold||0)+g; msg='+'+g+' gold'; }
    else if(s.k==='nest'){ var f=['wild_berries','honey','bread'][Math.floor(Math.random()*3)]; (ps.inventory||(ps.inventory=[])).push(f); msg=(ITEMS[f]?ITEMS[f].icon+' '+ITEMS[f].name:f); }
    else if(s.k==='ring'){ var f2=ITEMS.pot_mana?'pot_mana':'mushroom_stew'; ps.inventory.push(f2); msg=ITEMS[f2]?ITEMS[f2].icon+' '+ITEMS[f2].name:f2; }
    else if(s.k==='fox'){ ps.gold=(ps.gold||0)+50; ps.inventory.push('honey'); msg='the fox\'s cache: +50 gold and 🍯 Honey'; }
    else if(s.k==='scrap'){ var L=ZSECRET.list(ws).filter(function(o){ return !ps.secrets[o.id]&&o.q===s.q; }), t=L[Math.floor(Math.random()*L.length)]; if(t&&typeof ZSTAMP!=='undefined'){ ZSTAMP.reveal(ws,{x:t.tx,y:t.ty}); (ps.stamps||(ps.stamps=[])).push({k:'secret',x:t.tx,y:t.ty}); } msg='it marks another secret on your map ✨'; }
    else if(s.k==='carving'){ var C=ZSECRET.LORE[Math.abs(s.tx*7+s.ty)%ZSECRET.LORE.length]; if(typeof ZCARD!=='undefined')ZCARD.show({who:'An old carving',icon:'🗿',text:C,cls:'zc-hook'}); msg='a page for the Tome'; }
    var c=ZSECRET.count(ps); if(typeof showNotif==='function')showNotif('✨ '+(K?K[2]:'A secret')+' — '+msg+' ('+c.got+' / '+c.all+')','#bff8ff'); if(typeof ZSFX!=='undefined')try{ ZSFX.play('gem'); }catch(e){}
    var gl=ws._zsGl; if(gl&&gl[s.id]){ gl[s.id].destroy(); delete gl[s.id]; } ZEV.emit('secret',{}); } };

// ── the crypt: echoes, and the saga retold ──
var ZECHO={ on:true, cur:null, chal:null,
  spot:function(ws){ if(ws._zcrypt)return ws._zcrypt; var C=ZFEST.centre(ws); for(var r=13;r<24;r++){ for(var a=0;a<24;a++){ var an=Math.PI*0.75+a*0.26, x=C.x+Math.cos(an)*r*TILE, y=C.y+Math.sin(an)*r*TILE; if(Z3.free(ws,x,y)&&Z3.free(ws,x,y+TILE)&&Z3.free(ws,x-TILE,y)&&Z3.free(ws,x+TILE,y))return (ws._zcrypt={x:x,y:y}); } } return (ws._zcrypt={x:C.x-14*TILE,y:C.y+8*TILE}); },
  build:function(ws){ if(ws._zcryptO&&ws._zcryptO.scene)return; var P=ZECHO.spot(ws), o=Z3.img(ws,'crypt_door',P.x,P.y,80);
    if(!o){ var g=ws.add.graphics().setDepth(typeof WR_DEPTH==='function'?WR_DEPTH(P.y):10); g.fillStyle(0x000000,0.3).fillEllipse(P.x,P.y+2,64,14); g.fillStyle(0x5a6470,1).fillRoundedRect(P.x-30,P.y-58,60,58,{tl:28,tr:28,bl:2,br:2}); g.fillStyle(0x3a424c,1).fillRoundedRect(P.x-22,P.y-48,44,48,{tl:20,tr:20,bl:0,br:0});
      g.fillStyle(0x0c0e14,1).fillRoundedRect(P.x-16,P.y-40,32,40,{tl:15,tr:15,bl:0,br:0}); g.lineStyle(2,0x6fe3f5,0.7).strokeRoundedRect(P.x-30,P.y-58,60,58,{tl:28,tr:28,bl:2,br:2}); o=g;
      var r=ws.add.text(P.x,P.y-22,'ᛟ',{fontSize:'18px',color:'#6fe3f5'}).setOrigin(0.5).setDepth(o.depth+0.001); ws.tweens.add({targets:r,alpha:0.35,duration:1400,yoyo:true,repeat:-1}); ws._zcryptR=r; }
    ws._zcryptO=o; },
  bosses:function(ps){ var S=ps.bossSites||{}; return Object.keys(S).sort(); },
  tick:function(){ if(!ZECHO.on)return; var ws=Z2.ws(); if(!ws||!ws.player||!ws.playerState||!Z2.act('World')||ws.wd&&ws.wd.islKey)return; ZECHO.build(ws); var P=ZECHO.spot(ws);
    if(Z3.near(ws,P.x,P.y-10,TILE*2)){ Z3.prompt(ws,'crypt',P.x,P.y-64,'[Tab] The crypt of echoes'); Z3.tab=ZECHO.open; } else Z3.hide(ws,'crypt'); },
  open:function(){ var ws=Z2.ws(), ps=ws.playerState, B=ZECHO.bosses(ps), M=ps.medals||{}, T=ps.echoBest||{}, bg=Z2.pic('crypt_hall');
    var d=Z2.overlay('zecho-ui','<div class="ze-box">'+(bg?'<img class="ze-bg" src="'+bg+'" alt="">':'')+'<h2>🔔 The crypt of echoes</h2><p>'+(B.length?'The guardians you have beaten wait here as echoes. Face one again for its rune: 🥉 a win · 🥈 three hits or fewer · 🥇 no hit at all. A fall here costs nothing.':'The crypt is cold and quiet. Beat a guardian and its echo will wait here.')+'</p>'+
      (B.length?'<div class="ze-list">'+B.map(function(k){ var t=T[k]; return '<div class="ze-r"><span>'+(['🕯','🥉','🥈','🥇'][M[k]||0])+'</span><b>'+Z2.esc(ps.bossSites[k])+'</b><small>'+(t?'best '+ZECHO.fmt(t):'not yet faced')+'</small><button data-k="'+k+'">Face the echo</button></div>'; }).join('')+'</div>':'')+
      '<div class="ze-code"><input class="ze-in" placeholder="A friend\'s challenge code (ZQ-…)" maxlength="16"><button class="ze-go">Take the challenge</button><span class="ze-msg"></span></div>'+
      (ps.spiritsHome?'<div class="ze-ngp"><b>🌅 The Saga Retold</b> — begin again in the thaw with your Tome, stickers, runes, ribbons and trophies kept. The foes are stronger.'+(ps.ngp?' (This is saga '+(ps.ngp+1)+'.)':'')+' <button class="ze-ngpb">Open the far door</button></div>':'')+'<button class="ze-x">Close</button></div>');
    d.querySelector('.ze-x').onclick=function(){ d.remove(); };
    d.querySelectorAll('.ze-r button').forEach(function(b){ b.onclick=function(){ d.remove(); ZECHO.go(b.dataset.k); }; });
    var inp=d.querySelector('.ze-in'); inp.onkeydown=function(e){ e.stopPropagation(); };
    d.querySelector('.ze-go').onclick=function(){ var c=ZCODE.read(inp.value), msg=d.querySelector('.ze-msg'); if(!c){ msg.textContent='That code does not read right.'; return; } var all=ZECHO.allBossSites(ws), k=all[c.bi];
      if(!k){ msg.textContent='That echo is not in this world.'; return; } if(!(ps.bossSites||{})[k]){ msg.textContent='You have not beaten that guardian yet.'; return; } ZECHO.chal={k:k,secs:c.secs,medal:c.medal}; d.remove(); ZECHO.go(k); };
    var ng=d.querySelector('.ze-ngpb'); if(ng)ng.onclick=function(){ d.remove(); ZNGP.ask(); }; },
  fmt:function(t){ var m=Math.floor(t/60), s=t%60; return m+':'+(s<10?'0':'')+s; },
  // every boss site in this world, in a fixed order (the challenge code points into it)
  allBossSites:function(ws){ return ((ws.wd&&ws.wd.sites)||[]).filter(function(s){ return s.boss&&(s.type==='tower'||s.type==='dungeon'); }).map(function(s){ return s.id; }).sort(); },
  go:function(k){ var ws=Z2.ws(), s=((ws.wd&&ws.wd.sites)||[]).find(function(x){ return x.id===k; }); if(!s){ if(typeof showNotif==='function')showNotif('That echo has gone quiet.','#aaa'); return; }
    var ps=ws.playerState, mf=s.floors||({1:3,2:4,3:5,4:6}[s.section]||3), theme=s.type==='tower'?'tower':({1:'dungeon',2:'dungeon',3:'cave_dungeon',4:'volcano'}[s.section]||'dungeon');
    ZECHO.cur={k:k,name:ps.bossSites[k]}; ps.hp=ps.maxHp; ws.scene.sleep('World'); document.getElementById('hud').style.display='none'; document.getElementById('dungeon-hud').style.display='block';
    ws.scene.launch('Dungeon',{site:s,floor:mf-1,maxFloors:mf,worldScene:ws,theme:theme,inspect:{mons:'boss',fog:false,dark:true,from:'echo'}});
    var n=0, iv=setInterval(function(){ if(typeof _slHideBar==='function')_slHideBar(); var D=game.scene.getScene('Dungeon'); if(D&&D._inspect&&D._inspect.from==='echo')D._zEcho=1; if(++n>20)clearInterval(iv); },150);
    if(typeof showNotif==='function')showNotif('🔔 The echo of '+ZECHO.cur.name+' stirs…'+(ZECHO.chal&&ZECHO.chal.k===k?' Time to beat: '+ZECHO.fmt(ZECHO.chal.secs):''),'#bff8ff'); },
  done:function(d){ var ws=Z2.ws(), ps=ws.playerState, k=ZECHO.cur&&ZECHO.cur.k; if(!k)return; var medal=d.hits===0?3:d.hits<=3?2:1, M=ps.medals||(ps.medals={}), T=ps.echoBest||(ps.echoBest={}), up=medal>(M[k]||0), best=!T[k]||d.t<T[k];
    if(up){ ps.gold=(ps.gold||0)+[0,20,40,80][medal]; M[k]=medal; } if(best)T[k]=d.t; var all=ZECHO.allBossSites(ws), code=ZCODE.make(Math.max(0,all.indexOf(k)),d.t,medal), C=ZECHO.chal&&ZECHO.chal.k===k?ZECHO.chal:null; ZECHO.chal=null;
    var D=game.scene.getScene('Dungeon'); try{ (D.interactables||[]).forEach(function(i){ if(i.type==='boss_chest'){ i.opened=true; i.locked=true; } }); }catch(e){}
    var el=Z2.overlay('zhearth','<div class="zh-box"><small>The echo fades</small><h2>'+['','🥉 Bronze','🥈 Silver','🥇 Gold'][medal]+' rune</h2><table><tr><td>⏱ Time</td><td>'+ZECHO.fmt(d.t)+(best?' — your best!':'')+'</td></tr><tr><td>💥 Hits taken</td><td>'+d.hits+'</td></tr>'+(up?'<tr><td>🪙</td><td>+'+[0,20,40,80][medal]+' gold</td></tr>':'')+
      (C?'<tr><td>⚔ Your friend</td><td>'+ZECHO.fmt(C.secs)+' '+['','🥉','🥈','🥇'][C.medal]+' — '+(d.t<C.secs?'you beat them!':'they still lead')+'</td></tr>':'')+'</table><p>Your challenge code: <b class="ze-cd">'+code+'</b> <button class="ze-cp">Copy</button></p><div class="zh-b"><button class="zh-on">Back to the crypt</button></div></div>');
    el.querySelector('.ze-cp').onclick=function(){ var b=this; try{ navigator.clipboard.writeText(code).then(function(){ b.textContent='Copied ✓'; }); }catch(e){} };
    el.querySelector('.zh-on').onclick=function(){ el.remove(); ZECHO.leave(); }; ZECHO.cur=null; },
  leave:function(){ var D=game.scene.getScene('Dungeon'); try{ if(D&&D._exitToWorld)D._exitToWorld(null); else { game.scene.stop('Dungeon'); game.scene.wake('World'); } }catch(e){ try{ game.scene.stop('Dungeon'); game.scene.wake('World'); }catch(e2){} }
    try{ document.getElementById('dungeon-hud').style.display='none'; document.getElementById('hud').style.display=''; }catch(e){} } };
ZEV.sub('boss',function(d){ if(d.echo)setTimeout(function(){ ZECHO.done(d); },1800); });
(function(){ if(typeof _heroDied!=='function')return; var hd=_heroDied; _heroDied=function(scene){ try{ if(scene&&scene._inspect&&scene._inspect.from==='echo'){ if(scene._zEchoFall)return; scene._zEchoFall=1; var ps=Z2.ps(); if(ps)ps.hp=ps.maxHp; ZECHO.cur=null; ZECHO.chal=null;
      if(typeof showNotif==='function')showNotif('🔔 The echo was stronger this time. It waits in the crypt — no harm done.','#bff8ff'); setTimeout(function(){ scene._zEchoFall=0; ZECHO.leave(); },900); return; } }catch(e){} return hd.apply(this,arguments); }; })();

// ── the saga retold (new game +) ──
var ZNGP={ on:true, KEY:'zeldara_ngp',
  ask:function(){ var p=typeof ZSave!=='undefined'&&ZSave.currentPlayer&&ZSave.currentPlayer(); if(!p)return; var free=0; for(var s=1;s<=ZSave.SLOTS;s++)if(!ZSave.info(p.id,s)){ free=s; break; }
    var d=Z2.overlay('zecho-ui','<div class="ze-box"><h2>🌅 The Saga Retold</h2>'+(free?'<p>A new saga will begin in <b>slot '+free+'</b>, in the thaw, at the very start. This saga stays safe in its own slot. You keep the Tome, the stickers, the echo runes, the festival ribbons and the trophy shelf. Every foe is stronger, and the guardians hit harder.</p><div class="zh-b"><button class="ze-yes">Begin the retelling</button><button class="ze-no">Not yet</button></div>':'<p>All three of your save slots are full. Free one (title screen › your saves) and the far door will open.</p><div class="zh-b"><button class="ze-no">Close</button></div>')+'</div>');
    d.querySelector('.ze-no').onclick=function(){ d.remove(); }; var y=d.querySelector('.ze-yes'); if(y)y.onclick=function(){ ZNGP.begin(p,free); }; },
  begin:function(p,slot){ var ws=Z2.ws(), ps=ws.playerState; try{ if(ws._save)ws._save(); }catch(e){}
    var carry={ngp:(ps.ngp||0)+1,tome:ps.tome,stickers:ps.stickers,medals:ps.medals,medalNames:ps.medalNames,echoBest:ps.echoBest,ribbons:ps.ribbons,festBest:ps.festBest,trophySpots:ps.trophySpots,bossSites:ps.bossSites,secretsSeen:Object.keys(ps.secrets||{}).length,hero:ps.hero};
    try{ localStorage.setItem(ZNGP.KEY,JSON.stringify({pid:p.id,slot:slot,at:Date.now(),carry:carry})); sessionStorage.setItem('zeldara_ngp_go',String(Date.now())); }catch(e){}
    ZSave.choose(p.id,slot); setTimeout(function(){ location.href=location.pathname+location.search.replace(/[?&]start=[a-z]+/,''); },300); },
  // on the title page after the far door: start the new saga
  title:function(){ var go=null; try{ go=sessionStorage.getItem('zeldara_ngp_go'); }catch(e){} if(!go||Date.now()-(+go)>60000)return; var T=game&&game.scene&&game.scene.getScene('Title'); if(!T||!game.scene.isActive('Title'))return;
    try{ sessionStorage.removeItem('zeldara_ngp_go'); var P=JSON.parse(localStorage.getItem(ZNGP.KEY)||'null'); if(P&&P.carry&&P.carry.hero)ZSave.pendingHero=P.carry.hero; ZSave.choose(P.pid,P.slot); ZSave.clearCurrent(); }catch(e){}
    T.scene.start('Boot',{newGame:true}); },
  // the new saga's first moment: what it keeps
  apply:function(ps){ var P=null; try{ P=JSON.parse(localStorage.getItem(ZNGP.KEY)||'null'); }catch(e){} if(!P||!P.carry||!ZSave.current||ZSave.current.pid!==P.pid||ZSave.current.slot!==P.slot||Date.now()-P.at>3600000)return; if(ps.ngp)return;
    var C=P.carry; ['ngp','tome','stickers','medals','medalNames','echoBest','ribbons','festBest','trophySpots','bossSites'].forEach(function(k){ if(C[k]!=null)ps[k]=C[k]; }); try{ localStorage.removeItem(ZNGP.KEY); }catch(e){}
    if(typeof ZCARD!=='undefined')setTimeout(function(){ ZCARD.show({who:'The Saga Retold',icon:'🌅',text:'Saga '+(ps.ngp+1)+' begins. Your Tome, your runes and your trophies came with you. The world remembers, and it has grown teeth.',cls:'zc-hook',ms:14000}); },4000); },
  K:function(ps){ var n=ps&&ps.ngp||0; return n?{mon:1+0.3*Math.min(n,3),boss:1+0.45*Math.min(n,3)}:null; },
  // stronger foes: each monster once, as it appears
  tick:function(){ var ps=Z2.ps(), K=ZNGP.K(ps); if(!K)return; [['World','worldMonsters'],['Dungeon','monsters']].forEach(function(p){ var sc=game.scene.getScene(p[0]); if(!sc||!Z2.act(p[0])||sc._inspect&&sc._inspect.from!=='echo')return;
    (sc[p[1]]||[]).forEach(function(m){ if(m._zngp||m.dead||!(m.maxHp>0))return; m._zngp=1; var k=m.isBoss?K.boss:K.mon; m.maxHp=Math.round(m.maxHp*k); m.hp=Math.round((m.hp||m.maxHp/k)*k); }); }); } };
ZEV.sub('load',function(d,ps){ ZNGP.apply(ps); });

// ── bonds (light): hearts unlock each one's own saga lines ──
var ZBOND={ on:true, PER:3, MAX:5,
  WHO:{oswin:'Master Oswin',benno:'Benno the Baker',morwen:'Morwen the Sorcerer',runa:'Elder Runa',brask:'Sergeant Brask',garrick:'Garrick the Blacksmith'},
  LINES:{
   oswin:['Between you and me, the troll at the Silverrun was the size of a large dog. A very large dog. I may have rounded up.','I was the youngest Raven of the five. They called me "Ladle" because I cooked. I never told you that. Now you know.',
     'When the road shut I was out past the second ridge. I walked home through three nights. I do not tell that one, because it has no troll in it.','I keep the Ravens\' tankards on the high shelf so I do not have to look at them every day. Only most days.',
     'You remind me of Hakka, the bravest of us. He laughed at the wrong moments too. Keep laughing. It is the right moment more often than you think.'],
   benno:['I was going to be a sailor, you know. Then I smelled my mother\'s bread one morning and that was the end of the sea. Best decision I ever loafed into.','Old Mother — the sourdough — came over the pass in my grandmother\'s apron pocket. Twenty-eight years I have fed her. She has outlived two ovens.',
     'Some nights I bake for the empty houses too. One loaf each. I leave them on the steps. In the morning the birds have had a feast. Somebody should.','I laugh a lot. A baker who frowns makes heavy bread. That is the whole secret, and now you know it, so do not tell Rolf.',
     'When this is all over, I am going to bake the biggest cake this village has ever seen. I have the recipe written down. I have had it written down for years.'],
   morwen:['In Serkland we say a guest is a gift the road brings. You are the strangest gift this road has brought me, and I mean that kindly.','I came north for a herb that grows only under snow. I found it. Then the road shut behind me. The herb was not worth it. The village was.',
     'My teacher drank a potion of her own making to see the future. She saw a bowl of soup. She was very angry about it for a week.','The bottles on the high shelf are not dangerous. The ones on the low shelf are. I keep them low so that I bend down and think first.',
     'You have stopped flinching when the cauldron spits. Good. Fear is a fine teacher, but a poor apprentice keeps it too long.'],
   runa:['I have been the elder for forty winters. I did not ask to be. The one before me put her staff in my hand and walked into the snow. Some days I still want to hand it back.','The runestones on the Green were here before the village. We did not set them. We only learned to listen to them.',
     'My brother kept the far waystone. When the road shut, the stone went dark. I still walk out there on the longest night and leave a candle.','I kept a little book of everyone who ever lived here. Your page is the longest now. I had to sew in more leaves.',
     'Every saga has a page where the hero is tired. I have watched you turn that page again and again. I am proud of you. There. An old woman has said it.'],
   brask:['I was a shieldman in the old guard at the pass. Twelve of us. I am the one who was sent home with a message. I was the lucky one, they said.','The training dummy in the yard is called Sven. Do not ask why. Sven has taken more blows than any man alive and never once complained.',
     'I do not sleep well. So I polish. Every sword in the armoury has been polished more times than it has been swung. That is how it should be.','You hold your shield better now. Elbow in, chin down. I noticed. I notice everything. It is my curse.',
     'When the road opens all the way, I am going to walk up to the pass and stand where the twelve of us stood. Then I am going to come home and have a very long nap.'],
   garrick:['My first sword broke on its first swing. My master hung it over the forge so I would see it every day. It is still there. Look up next time.','Iron listens. If you hurry it, it remembers. Everything I make for you, I make slow.',
     'Dunn and I have argued about quenching for twenty years. He is wrong. He is also the best smith I know. Both things are true.','I made a cradle once, out of iron and oak, for a family who went over the pass before it shut. I wonder if they ever used it.',
     'You came in with a stick and a wooden shield. Look at you now. I do not say much. I am saying this.']},
  hearts:function(ps,k){ return Math.min(ZBOND.MAX,Math.floor(((ps.bonds||{})[k]||0)/ZBOND.PER)); },
  gain:function(ps,k,n){ if(!ZBOND.WHO[k])return; var B=ps.bonds||(ps.bonds={}), h0=ZBOND.hearts(ps,k); B[k]=Math.min(ZBOND.MAX*ZBOND.PER,(B[k]||0)+(n||1)); var h=ZBOND.hearts(ps,k);
    if(h>h0&&typeof showNotif==='function')showNotif('❤️ '+ZBOND.WHO[k]+' '+'♥'.repeat(h)+'♡'.repeat(ZBOND.MAX-h)+' — they have more to tell you','#ffb0c8'); },
  line:function(ps,k){ var L=ZBOND.LINES[k]; if(!L)return null; var h=ZBOND.hearts(ps,k), H=(ps.bondHeard||(ps.bondHeard={}))[k]||(ps.bondHeard[k]=[]); for(var i=0;i<h&&i<L.length;i++)if(H.indexOf(i)<0){ H.push(i); return L[i]; } return null; } };
(function(){ if(typeof ZVOICE==='undefined')return;
  var met=function(k){ try{ var ps=Z2.ps(); if(ZBOND.on&&ps&&ZBOND.WHO[k]){ var D=ps.bondDay||(ps.bondDay={}), day=Math.floor(ps.gday||0); if(D[k]!==day){ D[k]=day; ZBOND.gain(ps,k,1); } } }catch(e){} };
  var sy=ZVOICE.say; ZVOICE.say=function(k){ met(k); return sy.apply(ZVOICE,arguments); };
  if(ZVOICE.bubble){ var bu=ZVOICE.bubble; ZVOICE.bubble=function(k){ met(k); return bu.apply(ZVOICE,arguments); }; }
  var ln=ZVOICE.line; ZVOICE.line=function(k,ps,kind){ try{ if(ZBOND.on&&ps&&ZBOND.WHO[k]&&(kind==='talk'||kind==='shop'||!kind)&&Math.random()<0.5){ var b=ZBOND.line(ps,k); if(b)return b; } }catch(e){} return ln.apply(ZVOICE,arguments); }; })();
ZEV.sub('quest',function(d,ps){ /* a finished favour counts for the one who asked (21x keeps who) */ try{ var q=ps._lastNpcQ; if(q&&ZBOND.WHO[q])ZBOND.gain(ps,q,2); }catch(e){} });

// ── the saga frame at the big beats ──
var ZBANNER={ on:true, PICKED:['wl_frame_saga'],      /* Kris picks from the 20 thin banners (Lab › The world, revamped 5); the chosen ones join this list */
  ids:function(){ return ZBANNER.PICKED.filter(function(id){ return typeof ZScn!=='undefined'&&ZScn.has&&ZScn.has(id); }); },
  show:function(title,sub){ if(!ZBANNER.on||document.querySelector('.zbanner'))return; var I=ZBANNER.ids(); if(!I.length)return; var ps=Z2.ps(), k=((ps&&ps._bannerN)||0)%I.length; if(ps)ps._bannerN=k+1; var p=Z2.pic(I[k]);
    var d=Z2.overlay('zbanner','<img src="'+p+'" alt=""><div class="zb-t"><b>'+Z2.esc(title)+'</b><small>'+Z2.esc(sub||'')+'</small></div>');
    try{ var sc=typeof _activePlayScene==='function'&&_activePlayScene(false), cam=sc&&sc.cameras&&sc.cameras.main; if(cam&&sc.tweens){ var z0=cam.zoom; sc.tweens.add({targets:cam,zoom:z0*1.06,duration:900,ease:'Sine.out',yoyo:true,hold:1600}); } }catch(e){}
    setTimeout(function(){ d.classList.add('out'); setTimeout(function(){ d.remove(); },700); },3000); } };
ZEV.sub('realm',function(d){ ZBANNER.show(Z2.REALM[d.n].replace(/^the /,'The '),'a new realm opens — the saga goes on'); });
ZEV.sub('boss',function(d){ if(!d.echo)setTimeout(function(){ ZBANNER.show(d.name+' has fallen','the guardian is beaten'); },900); });

// ── the aurora in the water (take 4 ✓) ──
var ZAURORA={ on:true, MAX:0.16,
  draw:function(ws){ var n=ws._night||0; if(!ZAURORA.on||n<0.15||ws.wd&&ws.wd.islKey){ if(ws._zauG)ws._zauG.clear(); return; } var g=ws._zauG; if(!g||!g.scene){ g=ws._zauG=ws.add.graphics().setDepth(1.05).setBlendMode(Phaser.BlendModes.ADD); }
    g.clear(); var cam=ws.cameras.main, wv=cam.worldView, t=(ws._flowTime||0)*0.18, A=ZAURORA.MAX*Math.min(1,(n-0.15)/0.5), Tt=typeof T!=='undefined'?T:null; if(!Tt)return;
    var x0=Math.max(0,Math.floor(wv.x/TILE)), x1=Math.min(WORLD_W-1,Math.ceil((wv.x+wv.width)/TILE)), y0=Math.max(0,Math.floor(wv.y/TILE)), y1=Math.min(WORLD_H-1,Math.ceil((wv.y+wv.height)/TILE));
    for(var ty=y0;ty<=y1;ty++){ var row=ws.tiles&&ws.tiles[ty]; if(!row)continue; for(var tx=x0;tx<=x1;tx++){ var v=row[tx]; if(v!==Tt.SHALLOW_WATER&&v!==Tt.DEEP_WATER&&v!==Tt.OCEAN)continue;
        var w=Math.sin(tx*0.09+t)+Math.sin(ty*0.05-t*0.7+tx*0.03), a=Math.max(0,w)*0.5*A; if(a<0.01)continue; var h=(Math.sin(tx*0.02+ty*0.015+t*0.4)+1)/2, col=h<0.5?0x40ffb0:0x9a6aff; g.fillStyle(col,a); g.fillRect(tx*TILE,ty*TILE,TILE,TILE); } } } };
(function(){ if(typeof WorldScene==='undefined'||!WorldScene.prototype._updateFlow)return; var uf=WorldScene.prototype._updateFlow; WorldScene.prototype._updateFlow=function(dt){ var r=uf.apply(this,arguments); try{ ZAURORA.draw(this); }catch(e){} return r; }; })();

if(typeof setInterval!=='undefined'){ setInterval(function(){ try{ if(!Z2.playing()){ ZNGP.title(); return; } Z3.tab=null; ZFEST.tick(); ZECHO.tick(); ZHOME.tick(); ZNGP.tick(); (Z3.more||[]).forEach(function(f){ try{ f(); }catch(e){} }); }catch(e){ if(typeof console!=='undefined')console.warn('wave3',e); } },250);
  setInterval(function(){ try{ if(Z2.playing())ZSECRET.tick(); }catch(e){} },300); }
(function(){ if(typeof document==='undefined')return; var st=document.createElement('style'); st.textContent=
  '.zfest-ui,.zecho-ui,.zshelf,.zloom{position:fixed;inset:0;z-index:140;display:flex;align-items:center;justify-content:center;background:rgba(4,6,10,.62);animation:zcpIn .4s ease-out}'+
  '.zf-box,.ze-box,.zt-box,.zlm-box{position:relative;width:min(640px,94vw);max-height:90vh;overflow:auto;padding:18px 24px;border-radius:14px;background:linear-gradient(180deg,#1c1a28,#0e0c16);border:1px solid rgba(255,226,122,.45);color:#e8eef6;font:14.5px/1.5 Georgia,serif;box-shadow:0 18px 60px rgba(0,0,0,.7)}'+
  '.zf-box h2,.ze-box h2,.zt-box h2,.zlm-box h2{margin:0 0 6px;color:#ffe27a;font-size:24px}.zf-pic{float:right;max-width:130px;max-height:150px;margin:0 0 6px 10px}.zf-g{display:grid;grid-template-columns:36px 1fr;gap:0 8px;width:100%;text-align:left;margin:6px 0;padding:8px 10px;border-radius:10px;border:1px solid #3a3a5a;background:#181a2a;color:#e8eef6;cursor:pointer}'+
  '.zf-g span{grid-row:span 2;font-size:26px}.zf-g b{color:#ffe9a8}.zf-g small{color:#9ab0c8;font:12px "Segoe UI"}.zf-g:hover{border-color:#ffd76a}.zf-rib{margin:8px 0;color:#ffcf9a}'+
  '.zf-x,.ze-x,.zt-x,.zlm-x,.zlm-card{margin-top:8px;padding:6px 16px;border-radius:8px;border:1px solid #2a1404;background:linear-gradient(180deg,#8a4a1a,#5a2a0a);color:#f8e8c0;font:600 13px Georgia,serif;cursor:pointer}'+
  '.zf-bar{position:relative;height:42px;margin:14px 0;border-radius:21px;background:#0a0c14;border:1px solid #445;cursor:pointer}.zf-gold{position:absolute;top:4px;bottom:4px;width:12%;border-radius:16px;background:linear-gradient(90deg,#8a6a1a,#ffd76a,#8a6a1a)}.zf-mk{position:absolute;top:2px;width:0;font:700 30px serif;color:#bff8ff;text-shadow:0 0 10px #6fe3f5;transform:translateX(-50%);font-style:normal}'+
  '.zf-sc{font:600 14px "Segoe UI";color:#ffe9a8}.zf-mem{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:10px 0}.zf-mem button{height:64px;border-radius:10px;border:1px solid #445;background:radial-gradient(#3a3a5a,#1a1a2a);cursor:pointer}.zf-mem span{visibility:hidden;font:700 30px serif;color:#bff8ff}.zf-mem .up span{visibility:visible}.zf-mem .up{background:#20243a}.zf-mem .ok{border-color:#ffd76a;box-shadow:0 0 10px rgba(255,215,106,.5)}'+
  '.zfest-race{position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:120;padding:6px 16px;border-radius:12px;background:rgba(8,12,20,.85);border:1px solid #ffd76a;color:#ffe9a8;font:15px "Segoe UI"}'+
  '.ze-bg,.zt-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.25;pointer-events:none}.ze-r{display:grid;grid-template-columns:30px 1fr auto auto;gap:8px;align-items:center;padding:5px 0;border-bottom:1px dashed rgba(255,255,255,.15)}.ze-r span{font-size:20px}.ze-r small{color:#9ab0c8;font:12px "Segoe UI"}'+
  '.ze-r button,.ze-go,.ze-cp,.ze-ngpb{padding:4px 10px;border-radius:7px;border:1px solid rgba(255,226,122,.5);background:#3a2e10;color:#ffe9a8;cursor:pointer;font:12.5px "Segoe UI"}.ze-code{display:flex;gap:6px;align-items:center;margin:10px 0;flex-wrap:wrap}.ze-in{flex:1;min-width:180px;padding:5px 8px;border-radius:6px;border:1px solid #445;background:#0a0c14;color:#e8eef6}.ze-msg{color:#ffb080;font:12px "Segoe UI"}'+
  '.ze-ngp{margin:10px 0;padding:8px 10px;border-radius:10px;background:rgba(255,200,120,.08);border:1px solid rgba(255,200,120,.35)}.ze-cd{font:700 16px "Consolas",monospace;color:#bff8ff;letter-spacing:.06em}'+
  '.zt-spots{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:8px 0}.zt-sp{height:104px;border-radius:10px;border:2px dashed rgba(255,226,122,.35);background:rgba(40,30,16,.6);color:#e8eef6;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}.zt-sp.on{border-style:solid;border-color:#ffd76a}.zt-sp span{font-size:34px}.zt-sp img{max-width:70px;max-height:64px}.zt-sp small{font:11px/1.2 "Segoe UI";color:#ffe9a8;padding:0 4px}.zt-sp em{color:#7a7a8a;font:12px "Segoe UI"}'+
  '.zt-pick{position:relative;display:flex;flex-wrap:wrap;gap:6px}.zt-pick button{padding:4px 10px;border-radius:8px;border:1px solid #445;background:#181a2a;color:#e8eef6;cursor:pointer;font:12.5px "Segoe UI"}.zt-pick .used{opacity:.5}'+
  '.zlm-wall{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:10px 0}.zlm-p{min-height:170px;border-radius:6px;padding:8px 4px;text-align:center;background:repeating-linear-gradient(90deg,#2a1a1a 0 3px,#321e1c 3px 6px);border:2px solid #5a3a20;color:#8a7a6a;display:flex;flex-direction:column;align-items:center;gap:4px}'+
  '.zlm-p.on{background:repeating-linear-gradient(90deg,#6a2020 0 3px,#7a2a24 3px 6px);border-color:#c8a040;color:#ffe9c8}.zlm-p img{width:100%;border-radius:3px}.zlm-ph{font-size:40px;margin-top:10px}.zlm-p b{font-size:13px}.zlm-p small{font:11px/1.3 "Segoe UI"}.zlm-b{display:flex;gap:8px}'+
  '#zhome-bar{position:absolute;left:50%;bottom:136px;transform:translateX(-50%);z-index:60;display:flex;gap:8px}#zhome-bar button{padding:7px 14px;border-radius:10px;border:1px solid rgba(255,226,122,.6);background:rgba(40,28,10,.85);color:#ffe9a8;font:600 14px Georgia,serif;cursor:pointer}'+
  '.zbanner{position:fixed;inset:0;z-index:125;pointer-events:none;animation:zcpIn .8s ease-out;transition:opacity .7s}.zbanner.out{opacity:0}.zbanner img{position:absolute;inset:0;width:100%;height:100%;object-fit:fill}.zb-t{position:absolute;left:0;right:0;bottom:12%;text-align:center;color:#ffe9a8;text-shadow:0 2px 10px #000}.zb-t b{display:block;font:700 34px Georgia,serif}.zb-t small{font:italic 17px Georgia,serif;color:#e8dcc0}'+
  '@media (max-width:640px){.zlm-wall{grid-template-columns:repeat(3,1fr)}.zt-spots{grid-template-columns:repeat(2,1fr)}}';
  document.head.appendChild(st); })();
