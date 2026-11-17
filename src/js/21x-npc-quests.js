// ═══════════════════════════════════════════════════════════════════════
// ║ 21x-npc-quests.js — round 113: THE VILLAGERS' SIDE QUESTS (Kris's picks in the Lab, "Villagers & side quests": "Let's aim for each NPC
// ║ to have at-least 1 side quest … gold, special food or potions, but sometimes also items"; "quests … can also have a riddle-like nature
// ║ … go to a different NPC and ask questions for hints, or just continue to ask the NPC").
// ║  · ZNPCQ.Q: every quest (giver, the realm it needs, its steps, its reward). ps.nq[id] = {s: step, got: {item: n}, h: hints, done}.
// ║  · Steps: fetch (things lying in the world — Tab to take them; per-item rewards for the long ones), give (things from your pack),
// ║    deliver (talk to someone), visit (Tab at a place), chase (a runaway animal — Tab when you catch it), kill (a few creatures at a
// ║    place), relay (run between places before the time runs out), tracks (follow marks to the end), choose (pick the right answer).
// ║  · Riddles: the giver tells it; talk to them again for the next hint (a hint costs a tenth of the gold), or ask the villagers who know
// ║    (each knows one thing). The yellow mark shows a riddle's place only once you have a hint that points there.
// ║  · Pick your reward (Kris ✓ "Pick your reward"): some quests end with a choice of two.
// ║  · The journal lists them under "Villagers' requests"; ☆ makes one current — its things and places are the yellow mark.
// ║ Givers are reached where they are: village folk (Tab), the shops (their window opens after), the island folk, Pia, Mira, Sólveig.
// ║ Next round: Runa's hnefatafl, Dunn's forge-off, the fairy monarchs' feast (mini-games and the henges).
// ═══════════════════════════════════════════════════════════════════════
var ZNPCQ={ on:true, Q:[], BY:{},
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  // who is who: where each giver is talked to
  NPC:{oswin:{n:'Master Oswin',b:'guild'},benno:{n:'Benno the Baker',b:'merchant'},morwen:{n:'Morwen the Sorcerer',b:'apothecary'},tilda:{n:'Tilda the Merchant',b:'shop'},garrick:{n:'Garrick the Blacksmith',b:'forge'},
    brask:{n:'Sergeant Brask',b:'armory'},hana:{n:'Hana the Stable Master',b:'stables'},pell:{n:'Pell the Tailor',b:'clothing'},iva:{n:'Iva the Jeweler',b:'jeweler'},rolf:{n:'Rolf the Bartender',b:'tavern'},
    mira:{n:'Mira the Mechanic',b:'workshop'},twin:{n:'your twin'},solveig:{n:'Sólveig the Glasswright'},pia:{n:'Tumbler Pia'},
    coral:{n:'Coral the Island Trader',isl:'trader'},mael:{n:'Sister Mael',isl:'well'},holt:{n:'Ranger Holt',isl:'guide'},quill:{n:'Harbormaster Quill',isl:'dock'},
    runa:{n:'Elder Runa',vf:'vf_elder'},tob:{n:'Tob the Farmer',vf:'vf_farmer'},nell:{n:'Old Nell the Fisher',vf:'vf_fisher'},hesk:{n:'Hesk the Boatwright',vf:'vf_boatwright'},greta:{n:'Greta the Miller',vf:'vf_miller'},
    corr:{n:'Watchman Corr',vf:'vf_guard'},marta:{n:'Marta the Cart Vendor',vf:'vf_vendor'},fenwick:{n:'Old Fenwick',vf:'vf_lamplighter'},ilsa:{n:'Ilsa the Lighthouse Keeper',vf:'vf_keeper'},
    bram:{n:'Bram the Builder',vf:'zv_bram'},dunn:{n:'Dunn the Dwarf Forger',vf:'zv_dunn'},vela:{n:'Captain Vela',vf:'zv_vela'}},
  idOfVF:function(vf){ var k=Object.keys(ZNPCQ.NPC).find(function(k){ return ZNPCQ.NPC[k].vf===vf; }); return k||null; },
  add:function(q){ ZNPCQ.Q.push(q); ZNPCQ.BY[q.id]=q; },
  st:function(ps,id){ ps.nq=ps.nq||{}; return ps.nq[id]||null; },
  has:function(ps,r){ return (ps.unlockedSections||[1]).indexOf(r)>=0; },
  rescued:function(ps,k){ var cq=ps.completedQuests||[]; return k==='bram'?cq.indexOf('s1_tower')>=0:k==='mira'?cq.indexOf('s2_tower')>=0:k==='dunn'?cq.indexOf('s3_tower')>=0:k==='vela'?cq.indexOf('s4_tower')>=0:true; },
  // a quest can be offered: the realm it needs is open, the people in it are free, the first walk and Oswin's first tasks are behind you
  open:function(ps,q){ if(!ps.oswin||(ps.walk&&ps.walk!=='done'))return false; if(q.realm&&!ZNPCQ.has(ps,q.realm))return false; if(q.need&&!q.need(ps))return false;
    var T=typeof ZOSW!=='undefined'?ZOSW.tq(ps):{}; if(T.camp&&T.camp<3&&q.giver==='oswin')return false; return true; },
  // ── places ──
  rng:function(s){ var h=2166136261; s=String(s); for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return function(){ h=Math.imul(h^(h>>>13),1274126177); h^=h>>>16; return ((h>>>0)%100000)/100000; }; },
  walk:function(ws,x,y){ return !ws._canGo||ws._canGo(x,y,null); },
  near:function(ws,x0,y0,r0,r1,R,sec){ for(var t=0;t<80;t++){ var a=R()*Math.PI*2, d=(r0+R()*(r1-r0))*TILE, x=x0+Math.cos(a)*d, y=y0+Math.sin(a)*d, tx=Math.floor(x/TILE), ty=Math.floor(y/TILE);
      if(sec&&typeof getTileSection==='function'&&getTileSection(tx,ty)!==sec)continue; if(ZNPCQ.walk(ws,x,y))return {x:tx*TILE+TILE/2,y:ty*TILE+TILE/2}; } return {x:x0,y:y0}; },
  shoreNear:function(ws,x0,y0,R,sec){ var wd=ws.wd, W=[T.SHALLOW_WATER,T.DEEP_WATER]; for(var t=0;t<400;t++){ var a=R()*Math.PI*2, d=(2+R()*14)*TILE, tx=Math.floor((x0+Math.cos(a)*d)/TILE), ty=Math.floor((y0+Math.sin(a)*d)/TILE);
      if(!wd.tiles[ty]||W.indexOf(wd.tiles[ty][tx])>=0)continue; if(sec&&getTileSection(tx,ty)!==sec)continue; var wet=[[1,0],[-1,0],[0,1],[0,-1]].some(function(o){ var r=wd.tiles[ty+o[1]]; return r&&W.indexOf(r[tx+o[0]])>=0; });
      if(wet&&ZNPCQ.walk(ws,tx*TILE+TILE/2,ty*TILE+TILE/2))return {x:tx*TILE+TILE/2,y:ty*TILE+TILE/2}; } return ZNPCQ.near(ws,x0,y0,2,8,R,sec); },
  // spec: 'site:r' near one of realm r's sites · 'shore:r' a shore by realm r's harbour · 'harbor:r' by the harbour · 'village:<kind>' (the folk's spots) · 'firefrost' the Ashlands nearest the Highlands
  spot:function(ws,spec,key){ ws._nqSp=ws._nqSp||{}; if(ws._nqSp[key])return ws._nqSp[key]; var R=ZNPCQ.rng(key+'|'+(ws.wd&&ws.wd.seed||0)), m=/^(\w+):?(\w*)$/.exec(spec)||[], k=m[1], a=m[2], S=(ws.wd.sites||[]), P=null;
    if(k==='village'){ var v=ws._villageFolkSpot?ws._villageFolkSpot(a,0):null; P=v?ZNPCQ.near(ws,v.x,v.y,1,3,R):{x:CENTER_X*TILE,y:CENTER_Y*TILE}; }
    else if(k==='site'||k==='woods'){ var r=+a||1, L=S.filter(function(s){ return s.section===r&&!s.castle&&s.type!=='harbor'&&s.type!=='skyport'; }); var s0=L[Math.floor(R()*L.length)]; P=s0?ZNPCQ.near(ws,(s0.tx+1.5)*TILE,(s0.ty+1.5)*TILE,5,12,R,r):ZNPCQ.near(ws,CENTER_X*TILE,CENTER_Y*TILE,20,40,R); }
    else if(k==='shore'||k==='harbor'){ var r2=+a||1, H=S.find(function(s){ return s.section===r2&&s.type==='harbor'&&!s.castle; })||S.find(function(s){ return s.section===r2; }); P=H?(k==='shore'?ZNPCQ.shoreNear(ws,(H.tx+1.5)*TILE,(H.ty+1.5)*TILE,R,r2):ZNPCQ.near(ws,(H.tx+1.5)*TILE,(H.ty+1.5)*TILE,3,6,R,r2)):null; }
    else if(k==='firefrost'){ var A=S.filter(function(s){ return s.section===4; }), Hs=S.filter(function(s){ return s.section===3; }), best=null, bd=1e9; A.forEach(function(s){ Hs.forEach(function(h){ var d=Math.hypot(s.tx-h.tx,s.ty-h.ty); if(d<bd){ bd=d; best=s; } }); });
      P=best?ZNPCQ.near(ws,(best.tx+1.5)*TILE,(best.ty+1.5)*TILE,4,9,R,4):null; }
    if(!P)P={x:CENTER_X*TILE+TILE*6,y:CENTER_Y*TILE+TILE*6}; ws._nqSp[key]=P; return P; },
  // ── the world: what lies about for the quests you have ──
  things:function(ws){ var ps=ws.playerState, out=[]; ZNPCQ.Q.forEach(function(q){ var S=ZNPCQ.st(ps,q.id); if(!S||S.done)return; var st=q.steps[S.s]; if(!st)return;
      if(st.k==='fetch')st.items.forEach(function(it,i){ var n=(S.got[it.it]||0)+(S.in&&S.in[it.it]||0); if(n>=1||(it.r&&!ZNPCQ.has(ps,it.r)))return; out.push({q:q,i:i,it:it,key:q.id+':'+it.it,P:ZNPCQ.spot(ws,it.at,q.id+':'+it.it)}); });
      if(st.k==='visit'&&ZNPCQ.shown(ps,q,S))out.push({q:q,visit:true,it:{ic:st.ic||'✦',name:st.name},key:q.id+':v'+S.s,P:ZNPCQ.spot(ws,st.at,q.id+':v'+S.s)});
      if(st.k==='tracks'){ var k=S.t||0; out.push({q:q,track:k,it:{ic:k<st.n?'🐾':'🦌',name:k<st.n?'tracks':st.name},key:q.id+':t'+k,P:ZNPCQ.spot(ws,st.at,q.id+':t'+k)}); } }); return out; },
  shown:function(ps,q,S){ var st=q.steps[S.s]; return !q.riddle||!st.hide||(S.h||0)>=st.hide||(S.kn||0)>0; },
  draw:function(ws){ ws._nqIm=ws._nqIm||{}; var want={}, P=ws.player; ZNPCQ.things(ws).forEach(function(t){ want[t.key]=1; var d=Math.hypot(P.x-t.P.x,P.y-t.P.y); var o=ws._nqIm[t.key];
      if(!o&&d<TILE*24){ var Z=typeof _scn==='function'?_scn():null, pid=t.it.pc||('pc_'+t.it.it.replace(/\d+$/,'')), im=null; try{ if(Z&&t.it.it&&Z.has&&Z.has(pid))im=ws.add.image(t.P.x,t.P.y,Z.texture(ws,pid,34)); }catch(e){}
        if(!im)im=ws.add.text(t.P.x,t.P.y,t.it.ic||'❔',{fontSize:'24px'}).setOrigin(0.5);
        var g=ws.add.circle(t.P.x,t.P.y+8,15,0xffe27a,0.22); ws.tweens.add({targets:g,alpha:0.05,scale:1.35,duration:900,yoyo:true,repeat:-1});
        im.setDepth(typeof WR_DEPTH==='function'?WR_DEPTH(t.P.y):5); g.setDepth(im.depth-0.1); o=ws._nqIm[t.key]={im:im,g:g}; ws.events.once('shutdown',function(){ ws._nqIm={}; }); }
      if(o&&d>TILE*30){ o.im.destroy(); o.g.destroy(); delete ws._nqIm[t.key]; } });
    Object.keys(ws._nqIm).forEach(function(k){ if(!want[k]){ var o=ws._nqIm[k]; o.im.destroy(); o.g.destroy(); delete ws._nqIm[k]; } }); },
  // [Tab] near one of them
  take:function(ws){ var ps=ws.playerState, P=ws.player, hit=ZNPCQ.things(ws).find(function(t){ return Math.hypot(P.x-t.P.x,P.y-t.P.y)<TILE*1.6; }); if(!hit)return false;
    var q=hit.q, S=ZNPCQ.st(ps,q.id), st=q.steps[S.s];
    if(hit.visit){ if(st.guard&&(ws._nqG||[]).some(function(m){ return m&&!m.dead; })){ showNotif('⚔ Something guards it — beat it first.','#ffcc88'); return true; } ZNPCQ.say(ws,q,st.found||['You find it.'],function(){ ZNPCQ.next(ws,q); }); return true; }
    if(hit.track!==undefined){ if(hit.track<st.n){ S.t=(S.t||0)+1; showNotif('🐾 Fresh tracks — they lead on ('+S.t+' / '+st.n+').','#cfe8ff'); } else { ZNPCQ.say(ws,q,st.found,function(){ ZNPCQ.next(ws,q); }); } return true; }
    S.got[hit.it.it]=(S.got[hit.it.it]||0)+1; showNotif((hit.it.ic||'✦')+' '+hit.it.name+(st.items.length>1?' ('+ZNPCQ.count(S,st)+' / '+st.items.length+')':''),'#ffe27a');
    if(st.each){ /* each one is handed in on its own */ } else if(ZNPCQ.count(S,st)>=st.items.length&&st.auto)ZNPCQ.next(ws,q);
    ZNPCQ.redo(); return true; },
  count:function(S,st){ return st.items.filter(function(it){ return (S.got[it.it]||0)+((S.in||{})[it.it]||0)>0; }).length; },
  // ── talking to someone: what they have to say about quests (null: nothing) ──
  talk:function(ws,who,after){ var ps=ws.playerState, L=[], fx=[], ex=null;
    ZNPCQ.Q.forEach(function(q){ var S=ZNPCQ.st(ps,q.id); if(S&&S.done)return; if(!S){ if(q.giver===who&&ZNPCQ.open(ps,q)&&!L.length){ L=L.concat(q.offer); fx.push(function(){ ps.nq[q.id]={s:0,got:{},h:0,kn:0,in:{}}; ZNPCQ.journal(q); }); } return; }
      var st=q.steps[S.s]; if(!st)return;
      if(st.k==='fetch'&&st.each&&(st.to||q.giver)===who){ var hand=st.items.filter(function(it){ return (S.got[it.it]||0)>0; }); if(hand.length){ hand.forEach(function(it){ S.got[it.it]=0; S.in[it.it]=1; L=L.concat(it.say||[]); if(st.each)ZNPCQ.pay(ws,st.each,q); });
          if(ZNPCQ.count(S,st)>=st.items.length&&st.items.every(function(it){ return S.in[it.it]; }))fx.push(function(){ ZNPCQ.next(ws,q); }); return; } }
      if(st.k==='fetch'&&!st.each&&!st.auto&&(st.to||q.giver)===who&&ZNPCQ.count(S,st)>=st.items.length){ L=L.concat(st.done||['That\'s all of them. Thank you.']); fx.push(function(){ ZNPCQ.next(ws,q); }); return; }
      if(st.k==='give'&&(st.to||q.giver)===who){ var n=(ps.inventory||[]).filter(function(i){ return i===st.it; }).length; if(n>=st.n){ for(var j=0;j<st.n;j++)ps.inventory.splice(ps.inventory.indexOf(st.it),1); L=L.concat(st.done); fx.push(function(){ ZNPCQ.next(ws,q); }); return; } }
      if(st.k==='deliver'){ if(st.to===who){ L=L.concat(st.done); fx.push(function(){ ZNPCQ.next(ws,q); }); return; } if(st.wrong&&st.wrong[who]&&!L.length){ L.push(st.wrong[who]); return; } }
      if(st.k==='choose'&&(st.to||q.giver)===who){ L=L.concat(st.ask); ex=st.opts.map(function(o,i){ return {t:o,f:function(){ if(i===st.ok){ ZNPCQ.say(ws,q,st.right||['Right!'],function(){ ZNPCQ.next(ws,q); }); } else { S.h=(S.h||0)+1; ZNPCQ.say(ws,q,[st.wrong||'Not that one.'].concat(q.riddle&&q.riddle.hints[Math.min(S.h,q.riddle.hints.length)-1]?[q.riddle.hints[Math.min(S.h,q.riddle.hints.length)-1]]:[])); } }}; }); return; }
      if(st.k==='relay'&&q.giver===who&&!S.t0){ L=L.concat(st.go); fx.push(function(){ S.t0=Date.now(); S.r=0; }); return; }
      // a riddle: ask the giver again for the next hint; or a knower's piece
      if(q.riddle&&q.giver===who&&!L.length&&S.s===(q.riddle.step||0)){ var h=q.riddle.hints; if((S.h||0)<h.length){ L.push(h[S.h||0]); S.h=(S.h||0)+1; } else L.push(q.riddle.last||h[h.length-1]); return; }
      if(q.riddle&&q.riddle.knows&&q.riddle.knows[who]&&!L.length&&S.s===(q.riddle.step||0)){ L.push(q.riddle.knows[who]); S.kn=(S.kn||0)+1; return; }
      // a reminder from the giver
      if(q.giver===who&&!L.length&&st.remind)L.push(st.remind); });
    if(!L.length)return false;
    ZNPCQ.say(ws,{giver:who},L,function(){ fx.forEach(function(f){ try{ f(); }catch(e){ console.warn('nq',e); } }); ZNPCQ.redo(); if(after)after(); },ex); return true; },
  say:function(ws,q,L,done,extra){ var nm=(ZNPCQ.NPC[q.giver]||{}).n||'', id=(ZNPCQ.NPC[q.giver]||{}).vf||null; var i=0, one=function(){ if(i>=L.length){ if(done)done(); return; } var last=i===L.length-1, t=L[i++];
      if(typeof ZDLG!=='undefined'&&ZDLG.on)ZDLG.say(nm||'',t,{id:id,icon:'💬',extra:last?extra:null,done:one}); else { showNotif('💬 '+(nm?nm+': ':'')+t+(last&&extra?' ['+extra.map(function(x){ return x.t; }).join(' | ')+']':''),'#ffe9a8'); if(last&&extra)ZNPCQ._extra=extra; one(); } }; one(); },
  next:function(ws,q){ var ps=ws.playerState, S=ZNPCQ.st(ps,q.id); S.s++; S.got={}; S.in={}; S.t=0; S.t0=0; if(S.s>=q.steps.length)ZNPCQ.finish(ws,q); else { var st=q.steps[S.s]; if(st.start)ZNPCQ.say(ws,q,st.start); } ZNPCQ.redo(); },
  finish:function(ws,q){ var ps=ws.playerState, S=ZNPCQ.st(ps,q.id); S.done=true; if(ps.tracked==='nq:'+q.id)ps.tracked=null;
    var pay=function(rw){ ZNPCQ.pay(ws,rw,q,S); if(typeof ZJOUR!=='undefined')ZJOUR.banner('✓ '+q.name,'A villager\'s request done'); };
    if(q.choice){ ZNPCQ.say(ws,q,q.end||[],function(){}, q.choice.map(function(c){ return {t:c.t,f:function(){ pay(c.rw); }}; })); }
    else { ZNPCQ.say(ws,q,q.end||[],function(){ pay(q.reward); }); } },
  pay:function(ws,rw,q,S){ if(!rw)return; var ps=ws.playerState, got=[]; var cut=S&&q&&q.riddle?Math.max(0.5,1-0.1*(S.h||0)):1;
    if(rw.gold){ var g=Math.round(rw.gold*cut); ps.gold=(ps.gold||0)+g; got.push(g+' gold'); }
    (rw.items||[]).forEach(function(x){ var id=x[0], n=x[1]||1; if(!ITEMS[id])return; for(var i=0;i<n;i++)ps.inventory.push(id); got.push((n>1?n+'× ':'')+ITEMS[id].name); if(typeof Tome!=='undefined'&&Tome.see)try{ Tome.see('item',id); }catch(e){} });
    if(rw.f)try{ rw.f(ws,ps); }catch(e){}
    if(got.length)showNotif('🎁 '+got.join(', '),'#ffe27a'); if(ws._emitUI)try{ ws._emitUI(); }catch(e){} },
  journal:function(q){ showNotif('📜 New request: '+q.name+' — in your journal (☆ to follow it)','#ffe27a'); var ws=ZNPCQ.ws(); if(ws&&!ws.playerState.tracked)ws.playerState.tracked='nq:'+q.id; },
  redo:function(){ try{ var c=document.getElementById('quest-list-container'); if(c)c._qh=''; if(typeof ZQMAP!=='undefined')ZQMAP._c=null; }catch(e){} },
  // ── the yellow mark: where the current request leads ──
  target:function(ws,id){ var ps=ws.playerState, q=ZNPCQ.BY[id], S=q&&ZNPCQ.st(ps,id); if(!q||!S||S.done)return null; var st=q.steps[S.s], P=ws.player;
    var who=function(k){ var N=ZNPCQ.NPC[k]||{}; return ZNPCQ.whereIs(ws,k)||null; };
    if(st.k==='fetch'){ var T=ZNPCQ.things(ws).filter(function(t){ return t.q===q; }); if(T.length){ T.sort(function(a,b){ return Math.hypot(P.x-a.P.x,P.y-a.P.y)-Math.hypot(P.x-b.P.x,P.y-b.P.y); }); return {x:T[0].P.x,y:T[0].P.y,t:q.name+' — '+T[0].it.name}; }
      var w=who(st.to||q.giver); return w?{x:w.x,y:w.y,t:q.name+' — back to '+w.n}:null; }
    if(st.k==='visit'||st.k==='tracks'){ var V=ZNPCQ.things(ws).find(function(t){ return t.q===q; }); if(V)return {x:V.P.x,y:V.P.y,t:q.name+' — '+V.it.name}; var g0=who(q.giver); return g0?{x:g0.x,y:g0.y,t:q.name+' — ask '+g0.n+' again (a hint)'}:null; }
    if(st.k==='deliver'){ if(q.riddle&&(S.h||0)<2&&!(S.kn>0)){ var g1=who(q.giver); return g1?{x:g1.x,y:g1.y,t:q.name+' — who is it for? Ask '+g1.n+' again'}:null; } var w2=who(st.to); return w2?{x:w2.x,y:w2.y,t:q.name+' — to '+w2.n}:null; }
    if(st.k==='chase'||st.k==='kill'){ var C=ZNPCQ.spot(ws,st.at,q.id+':c'); var cr=st.k==='chase'&&ws._nqC&&ws._nqC[q.id]; return cr?{x:cr.x,y:cr.y,t:q.name}:{x:C.x,y:C.y,t:q.name}; }
    if(st.k==='relay'){ if(!S.t0){ var g2=who(q.giver); return g2?{x:g2.x,y:g2.y,t:q.name}:null; } var R=ZNPCQ.spot(ws,st.pts[S.r||0],q.id+':r'+(S.r||0)); return {x:R.x,y:R.y,t:q.name+' — '+st.names[S.r||0]}; }
    var w3=who(st.to||q.giver); return w3?{x:w3.x,y:w3.y,t:q.name+' — '+w3.n}:null; },
  // where a person is (in the world: the village folk, the shop doors, the harbours for the island folk)
  whereIs:function(ws,k){ var N=ZNPCQ.NPC[k]; if(!N)return null; var n=N.n;
    if(N.vf){ var v=(ws._villageNPCs||[]).find(function(x){ return x.id===N.vf; }); return v?{x:v.x,y:v.y,n:n}:null; }
    if(N.b){ var B=(ws.wd&&ws.wd.buildings||[]).find(function(b){ return b.type===N.b; }); return B?{x:B.worldX+Math.floor(B.w/2)*TILE+TILE/2,y:B.worldY+B.h*TILE,n:n}:null; }
    if(N.isl){ var H=(ws.wd.sites||[]).find(function(s){ return s.type==='harbor'&&!s.castle&&s.section===1; }); return H?{x:(H.tx+1.5)*TILE,y:(H.ty+1.5)*TILE,n:n+' (on the harbour island)'}:null; }
    if(k==='pia'&&typeof ZROLL!=='undefined'){ var p=ZROLL.npc||ZROLL.spot(ws); return p?{x:p.x,y:p.y,n:n}:null; }
    if(k==='twin'){ var L=(ws.wd&&ws.wd.buildings||[]).find(function(b){ return b.type==='library'; }); return L?{x:L.worldX+Math.floor(L.w/2)*TILE+TILE/2,y:L.worldY+L.h*TILE,n:n}:null; }
    if(k==='solveig'&&typeof VR_EXTRA!=='undefined'&&VR_EXTRA.glimmerAt){ var g=VR_EXTRA.glimmerAt; return {x:(g.x||g.tx||0)*TILE,y:(g.y||g.ty||0)*TILE,n:n}; }
    return null; },
  // ── each second: the things in the world, the runaway animals, the creatures to beat, the relay's clock ──
  tick:function(){ try{ if(!ZNPCQ.on)return; var ws=ZNPCQ.ws(); if(!ws||!ws.player||!ws.playerState||!ws.sys.isActive()||ws.wd&&ws.wd.islKey)return; var ps=ws.playerState;
    ZNPCQ.draw(ws); ZNPCQ.Q.forEach(function(q){ var S=ZNPCQ.st(ps,q.id); if(!S||S.done)return; var st=q.steps[S.s]; if(!st)return;
      if(st.k==='kill'){ ws._nqK=ws._nqK||{}; var G=ws._nqK[q.id]; var C=ZNPCQ.spot(ws,st.at,q.id+':c');
        if(!G&&Math.hypot(ws.player.x-C.x,ws.player.y-C.y)<TILE*18){ G=ws._nqK[q.id]=[]; ZNPCQ.spawn(ws,st.mon,st.n,C,G,st.q||1); }
        if(G&&G.length&&G.every(function(m){ return !m||m.dead; })){ ws._nqK[q.id]=null; ZNPCQ.say(ws,q,st.done||['That\'s all of them!'],function(){ ZNPCQ.next(ws,q); }); } }
      if(st.k==='chase')ZNPCQ.critter(ws,q,S,st);
      if(st.k==='relay'&&S.t0){ var left=st.secs-(Date.now()-S.t0)/1000, R=ZNPCQ.spot(ws,st.pts[S.r||0],q.id+':r'+(S.r||0));
        if(Math.hypot(ws.player.x-R.x,ws.player.y-R.y)<TILE*1.8){ S.r=(S.r||0)+1; if(S.r>=st.pts.length){ S.t0=0; ZNPCQ.say(ws,q,st.done,function(){ ZNPCQ.next(ws,q); }); } else showNotif('🔥 '+st.names[S.r-1]+' — on to '+st.names[S.r]+'! ('+Math.ceil(left)+' s)','#ffcc66'); }
        else if(left<=0){ S.t0=0; S.r=0; showNotif('💨 The signal went out. Ask '+(ZNPCQ.NPC[q.giver]||{}).n+' to light it again.','#ff9a8a'); }
        else if(Math.floor(left)%10===0)ZNPCQ._lastT!==Math.floor(left)&&(ZNPCQ._lastT=Math.floor(left),showNotif('⏳ '+Math.ceil(left)+' s','#ffcc66')); }
      if(st.k==='visit'&&st.guard){ ws._nqVG=ws._nqVG||{}; var V=ZNPCQ.spot(ws,st.at,q.id+':v'+S.s); if(!ws._nqVG[q.id]&&ZNPCQ.shown(ps,q,S)&&Math.hypot(ws.player.x-V.x,ws.player.y-V.y)<TILE*16){ ws._nqG=[]; ws._nqVG[q.id]=1; ZNPCQ.spawn(ws,st.guard,2,V,ws._nqG,st.q||1); } } });
  }catch(e){ if(!ZNPCQ._e){ ZNPCQ._e=1; console.warn('npc quests',e); } } },
  spawn:function(ws,re,n,C,G,q){ if(typeof MX==='undefined'||typeof MON_ROSTER==='undefined')return; var pool=MON_ROSTER.filter(function(R){ return R.q===q&&MX.kit(R.id)&&!(typeof MON_LEGACY!=='undefined'&&MON_LEGACY[R.id]); }), pick=pool.filter(function(R){ return new RegExp(re).test(R.id); }), id=((pick.length?pick:pool)[0]||{}).id; if(!id)return;
    for(var i=0;i<n;i++){ var a=i/n*Math.PI*2, x=C.x+Math.cos(a)*TILE*2.2, y=C.y+Math.sin(a)*TILE*1.6; if(!ZNPCQ.walk(ws,x,y)){ x=C.x; y=C.y; } var m=MX.spawn(ws,id,x,y,{q:q,temp:true}); if(m){ m.section=q; m._guard=true; ws.worldMonsters.push(m); G.push(m); } } },
  // a runaway: dashes off, tires, rests — like the animals; Tab when you are on it
  critter:function(ws,q,S,st){ ws._nqC=ws._nqC||{}; var C=ws._nqC[q.id], P=ws.player, H=ZNPCQ.spot(ws,st.at,q.id+':c');
    if(!C){ if(Math.hypot(P.x-H.x,P.y-H.y)>TILE*22)return; var im=ws.add.text(H.x,H.y,st.ic,{fontSize:'30px'}).setOrigin(0.5,0.8).setDepth(WR_DEPTH(H.y)); C=ws._nqC[q.id]={x:H.x,y:H.y,im:im,rest:0,run:0}; ws.events.once('shutdown',function(){ ws._nqC={}; }); }
    var d=Math.hypot(P.x-C.x,P.y-C.y);
    if(d<TILE*1.6&&C.rest>0){ C.caught=true; }
    if(C.rest>0)C.rest-=1; else if(d<TILE*5){ var a=Math.atan2(C.y-P.y,C.x-P.x)+(Math.random()-.5)*0.8, sp=TILE*(2.6+Math.random()); for(var t=0;t<6;t++){ var nx=C.x+Math.cos(a)*sp, ny=C.y+Math.sin(a)*sp; if(ZNPCQ.walk(ws,nx,ny)&&Math.hypot(nx-H.x,ny-H.y)<TILE*18){ ws.tweens.add({targets:C.im,x:nx,y:ny,duration:650}); C.x=nx; C.y=ny; break; } a+=0.9; } C.run++; if(C.run%3===0)C.rest=2; }
    C.im.setDepth(WR_DEPTH(C.y)); },
  catchIt:function(ws){ var C=ws._nqC||{}; var id=Object.keys(C).find(function(k){ var c=C[k]; return c&&c.caught&&Math.hypot(ws.player.x-c.x,ws.player.y-c.y)<TILE*1.8; }); if(!id)return false; var q=ZNPCQ.BY[id], st=q.steps[ZNPCQ.st(ws.playerState,id).s];
    C[id].im.destroy(); C[id]=null; ZNPCQ.say(ws,q,st.done||['Got it!'],function(){ ZNPCQ.next(ws,q); }); return true; },
  // ── the journal and the map ──
  journalRows:function(ws){ var ps=ws.playerState; return ZNPCQ.Q.filter(function(q){ return ZNPCQ.st(ps,q.id); }).map(function(q){ var S=ZNPCQ.st(ps,q.id), st=q.steps[S.s]||{};
      return {id:'nq_'+q.id,t:(q.riddle?'🧩 ':'')+q.name+' — '+(ZNPCQ.NPC[q.giver]||{}).n,sub:S.done?'done':(st.sub||st.remind||'')+(q.riddle&&!S.done?' · ask '+(ZNPCQ.NPC[q.giver]||{}).n+' again for a hint, or someone who might know':''),done:!!S.done,trk:'nq:'+q.id}; }); },
  offers:function(ws){ var ps=ws.playerState; return ZNPCQ.Q.filter(function(q){ return !ZNPCQ.st(ps,q.id)&&ZNPCQ.open(ps,q); }).map(function(q){ return q.giver; }); }
};
setInterval(ZNPCQ.tick,500);
