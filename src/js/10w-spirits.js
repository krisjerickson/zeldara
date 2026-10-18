// ═══════════════════════════════════════════════════════════════════════
// ║ 10w-spirits.js — round 52: the spirit saga, part 1 (doc 28). Kris: "Spirits are now going to be attached to runestones and runic
// ║ points throughout the game … about 10 spirits per section, with mini-bosses that guard these spirits. You need to defeat at-least 6
// ║ of these per section, and when the mini-boss is defeated, the spirit thanks you and gives you a runic glass piece. The spirit then
// ║ travels to the village center in the runic area." — "Spirits should look friendly, but in toil and frustrated before you free them,
// ║ and then relaxed once you free them … mimic the runic colors of light blue and glowing." — "spirits should look like people".
// ║ · Bindstones: one per zone (10 per realm), by its rune circle, on ground you can walk to. A spirit is chained to each, toiling.
// ║ · Binders: a named mini-boss of that realm's monsters rises when you come near; beat it and the spirit is free.
// ║ · The freed spirit thanks you, gives a Soulglass shard of its realm, and drifts away home; on the Runestone Green the freed
// ║   spirits gather round the runestone, more with every one.
// ║ · The Glimmerhall (Sólveig the Glasswright) rises in the village once the first familiar island's guardian is beaten; she fuses
// ║   six shards of one realm into that realm's Soulglass lattice — "its true form can only be made in the heart of a forge".
// ║ Painted spirits, bindstones, the Glimmerhall and Sólveig come with wave 53; drawn stand-ins until then.
// ═══════════════════════════════════════════════════════════════════════
var ZSPIRIT={ on:true, NEED:6, REALM:['','Grasslands','Wetlands','Highlands','Ashlands'], FORGE:['','Ember','Cinder','Slag','Ash'],
  COL:'#6fe3f5',
  SPIRIT_NAMES:['Asa','Bersi','Dagny','Eyvind','Frida','Geir','Hallveig','Ingolf','Jorunn','Ketil','Liv','Magni','Nanna','Oddny','Ragna','Sigrid','Torvi','Ulf','Vigdis','Yrsa',
    'Arnor','Bodil','Dalla','Einar','Gudrun','Hakon','Ingrid','Joreid','Kolbein','Lofn','Mord','Njal','Orm','Ranveig','Sverri','Thora','Unn','Vali','Alfhild','Brand'],
  TRADES:['a weaver','a fisher','a cooper','a herder','a midwife','a smith','a skald','a shipwright','a beekeeper','a tanner','a miller','a potter','a forester','a baker','a net-mender','a carver','a dyer','a stonemason','a shepherd','a brewer'],
  BINDER_NAMES:['Grimkell','Hrafn','Skuli','Kolgrim','Svarthof','Ormarr','Bolli','Thorgaut','Hjalmar','Ulfhedin','Vandrad','Skarphedin','Glum','Hauk','Ljot','Morgrim','Ozur','Sigtrygg','Tjorvi','Vemund',
    'Atli','Bardi','Drafli','Eldgrim','Falki','Gorm','Hrolf','Illugi','Jokul','Kari','Mord','Narfi','Onund','Raknar','Snaeulf','Thrand','Ulfar','Vagn','Yngvar','Zorvald'],
  // the shrines: one per zone, by its rune circle, on walkable ground (computed once per world)
  shrines:function(ws){ var wd=ws.wd; if(wd._shrines)return wd._shrines; var out=[], R=_footReach(wd), W=WORLD_W, self=ZSPIRIT;
    for(var q=1;q<=4;q++){ var zs=WMAP_ZONES.filter(function(z){ return (z.r||z.region)===q; }).slice(0,10);
      zs.forEach(function(z,i){ var r=ws._runeSpot?ws._runeSpot(z.id):{x:z.x,y:z.y}; if(!r)return; var p=self._spot(ws,R,r.x-6,r.y-5); if(!p)return; var n=out.length;
        out.push({id:'sb_'+z.id, n:n, q:q, zone:z.id, zname:_wmZoneName(z.id), tx:p.x, ty:p.y, x:p.x*TILE+16, y:p.y*TILE+16, spirit:self.SPIRIT_NAMES[n%40], trade:self.TRADES[(n*7)%20], binder:self.BINDER_NAMES[(n*13+7)%40]}); }); }
    return (wd._shrines=out); },
  // the nearest 5×5 open patch you can walk to
  _spot:function(ws,R,tx,ty){ for(var r=0;r<90;r+=1)for(var a=0;a<(r?12:1);a++){ var x=Math.round(tx+Math.cos(a/12*Math.PI*2)*r), y=Math.round(ty+Math.sin(a/12*Math.PI*2)*r), ok=!!(R&&R[y*WORLD_W+x]);
      for(var dy=-2;dy<=2&&ok;dy++)for(var dx=-2;dx<=2;dx++){ var t=(ws.tiles[y+dy]||[])[x+dx]; if(t===undefined||!canPassTile(t)||(typeof FOOT_SLOW!=='undefined'&&FOOT_SLOW[t])){ ok=false; break; } } if(ok)return {x:x,y:y}; } return null; },
  freed:function(ps,id){ return ((ps&&ps.spiritsFreed)||[]).indexOf(id)>=0; },
  count:function(ps,q){ var S=(ZSPIRIT._ws&&ZSPIRIT._ws.wd&&ZSPIRIT._ws.wd._shrines)||[]; return ((ps&&ps.spiritsFreed)||[]).filter(function(id){ var s=S.find(function(x){ return x.id===id; }); return s?s.q===q:id.indexOf('|q'+q)>=0; }).length; },
  items:function(ps,id){ return ((ps&&ps.inventory)||[]).filter(function(i){ return i===id; }).length; },
  // ── drawn stand-ins (until the painted spirits are in) ──
  _spiritTex:function(scene,kind){ var key='zsp_spirit_'+kind; if(scene.textures.exists(key))return key; var W=40, H=60, cv=mkCanvas(W,H), g=cv.getContext('2d'), C=ZSPIRIT.COL;
    var glow=g.createRadialGradient(W/2,H*0.45,2,W/2,H*0.45,W*0.7); glow.addColorStop(0,'rgba(111,227,245,'+(kind==='toil'?0.25:0.45)+')'); glow.addColorStop(1,'rgba(111,227,245,0)'); g.fillStyle=glow; g.fillRect(0,0,W,H);
    var body=kind==='toil'?'rgba(150,205,225,0.82)':'rgba(190,245,255,0.9)', edge=kind==='toil'?'#4a8aa0':'#9ff4ff';
    g.save(); if(kind==='toil'){ g.translate(W/2,H*0.55); g.rotate(0.18); g.translate(-W/2,-H*0.55); }
    // robe fading into a wisp
    var rb=g.createLinearGradient(0,22,0,H); rb.addColorStop(0,body); rb.addColorStop(1,'rgba(111,227,245,0)'); g.fillStyle=rb; g.beginPath(); g.moveTo(W/2-7,22); g.lineTo(W/2+7,22); g.lineTo(W/2+11,H-6); g.quadraticCurveTo(W/2,H+2,W/2-11,H-6); g.closePath(); g.fill();
    g.strokeStyle=edge; g.lineWidth=1; g.stroke();
    // head, hair, face
    g.fillStyle=body; g.beginPath(); g.arc(W/2,15,7,0,Math.PI*2); g.fill(); g.stroke(); g.fillStyle='rgba(60,120,140,0.7)'; g.beginPath(); g.arc(W/2,12,7,Math.PI,0); g.fill();
    g.fillStyle='#1d4a58'; if(kind==='toil'){ g.fillRect(W/2-4,16,2,1); g.fillRect(W/2+2,16,2,1); g.fillRect(W/2-2,19,4,1); } else { g.fillRect(W/2-4,15,2,2); g.fillRect(W/2+2,15,2,2); g.beginPath(); g.arc(W/2,18,2.4,0.1,Math.PI-0.1); g.stroke(); }
    // arms: toiling with a pick, or open and easy
    g.strokeStyle=body; g.lineWidth=3; g.lineCap='round'; g.beginPath();
    if(kind==='toil'){ g.moveTo(W/2-6,26); g.lineTo(W/2+6,32); g.moveTo(W/2+6,26); g.lineTo(W/2+8,32); g.stroke(); g.strokeStyle='#7a5a3a'; g.lineWidth=2; g.beginPath(); g.moveTo(W/2+2,36); g.lineTo(W/2+14,18); g.stroke(); g.strokeStyle='#8a8f96'; g.lineWidth=3; g.beginPath(); g.moveTo(W/2+9,16); g.lineTo(W/2+19,22); g.stroke(); }
    else { g.moveTo(W/2-6,26); g.lineTo(W/2-13,22); g.moveTo(W/2+6,26); g.lineTo(W/2+13,22); g.stroke(); }
    g.restore();
    if(kind==='toil'){ g.strokeStyle='#5a5a62'; g.lineWidth=1.6; for(var i=0;i<5;i++){ g.beginPath(); g.ellipse(6+i*4,H-8+(i%2),2.4,1.6,0,0,Math.PI*2); g.stroke(); } }
    var T=scene.textures.addCanvas(key,cv); try{ T.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} return key; },
  _stoneTex:function(scene,free){ var key='zsp_stone_'+(free?1:0); if(scene.textures.exists(key))return key; var W=44, H=76, cv=mkCanvas(W,H), g=cv.getContext('2d');
    g.fillStyle='rgba(0,0,0,0.3)'; g.beginPath(); g.ellipse(W/2,H-6,18,5,0,0,Math.PI*2); g.fill();
    var gr=g.createLinearGradient(8,0,W-8,0); gr.addColorStop(0,'#5a6068'); gr.addColorStop(0.5,'#8a9098'); gr.addColorStop(1,'#4a5058'); g.fillStyle=gr; g.beginPath(); g.moveTo(10,H-8); g.lineTo(13,14); g.lineTo(W/2,4); g.lineTo(W-13,14); g.lineTo(W-10,H-8); g.closePath(); g.fill(); g.strokeStyle='#2e3238'; g.lineWidth=1.5; g.stroke();
    for(var i=0;i<4;i++)drawRune(g,W/2,20+i*13,9,free?'#6fe3f5':'#ff6a40',(i*3+1)%10,true);
    if(!free){ g.strokeStyle='#3a3a40'; g.lineWidth=2.2; for(var k=0;k<2;k++){ g.beginPath(); for(var x=8;x<=W-8;x+=5){ var y=34+k*16+(x-8)*0.25; g.moveTo(x,y); g.ellipse(x+2,y,2.6,1.7,0,0,Math.PI*2); } g.stroke(); } }
    var T=scene.textures.addCanvas(key,cv); try{ T.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} return key; },
  // a picture of a spirit: the painted frames (wave 53) when they are in, else the stand-in
  _spiritSprite:function(scene,x,y,kind,depth,s){ var U=ZSPIRIT.uniqueId(s,kind); if(U){ var Z=_scn(), im=Z.image(scene,U,x,y,Z.K,depth); if(im){ im.setOrigin(0.5,1); if(kind==='toil')scene.tweens.add({targets:im,angle:{from:-4,to:5},duration:520,yoyo:true,repeat:-1,ease:'Sine.inOut'}); return im; } }
    var A=typeof ZWE!=='undefined'?ZWE.animTex(scene,kind==='toil'?'an_spirit_toil':'an_spirit_free'):null, s;
    if(A){ s=scene.add.sprite(x,y,A.key,'0').setOrigin(A.ox,A.oy).setScale(A.scale*(46/A.h)); try{ s.play(A.key); }catch(e){} }
    else { s=scene.add.image(x,y,ZSPIRIT._spiritTex(scene,kind)).setOrigin(0.5,0.92); if(kind!=='toil')s.setBlendMode(Phaser.BlendModes.SCREEN); }
    s.setDepth(depth); return s; },
  // round 54: Kris picked eight bindstones in the Lab (Spirits & stones) — every shrine gets one of them, mixed through each realm
  STONES:['now','carved','gate','cage','obelisk','circle','altar','crystal'],
  stoneOf:function(s){ var k=ZSPIRIT.STONES[((s.n||0)*3+(s.q||1))%8]; return k; },
  stoneId:function(s,free){ var k=s?ZSPIRIT.stoneOf(s):'now'; return k==='now'?(free?'sp_bindstone_free':'sp_bindstone'):'bs_opt_'+k+(free?'_free':'_bound'); },
  // round 54: each shrine's own spirit (wave 55, sp_u_<name>_bound / _free), when painted
  uniqueId:function(s,kind){ if(!s||!s.spirit)return null; var Z=typeof _scn==='function'?_scn():null, id='sp_u_'+s.spirit.toLowerCase()+(kind==='toil'?'_bound':'_free'); return Z&&Z.has&&Z.has(id)?id:null; },
  _stoneImg:function(scene,x,y,free,s){ var Z=typeof _scn==='function'?_scn():null, id=ZSPIRIT.stoneId(s,free); if(Z&&Z.has&&!Z.has(id))id=free?'sp_bindstone_free':'sp_bindstone';
    if(Z&&Z.has&&Z.has(id)){ var im=Z.image(scene,id,x,y,Z.K,WR_DEPTH(y)); if(im)return im; } return scene.add.image(x,y,ZSPIRIT._stoneTex(scene,free)).setOrigin(0.5,0.92).setDepth(WR_DEPTH(y)); },
  // ── the dialog box (the fairies' box, with a spirit's or Sólveig's picture) ──
  talk:function(name,col,html,btns,draw){ var el=document.getElementById('fairy-talk'); if(!el){ el=document.createElement('div'); el.id='fairy-talk'; el.className='overlay'; el.style.display='none'; el.onclick=function(e){ if(e.target===el)FairyTalk.close(); }; document.body.appendChild(el); }
    el.innerHTML='<div class="modal fairy-modal" onclick="event.stopPropagation()" style="border-color:'+col+'"><div class="ft-row"><canvas id="ft-cv" width="96" height="96"></canvas><div><div class="ft-name" style="color:'+col+'"></div><div class="ft-text">'+html+'</div></div></div><div class="ft-btns">'+btns.map(function(b,i){ return '<button data-i="'+i+'">'+b.t+'</button>'; }).join('')+'</div></div>';
    el.querySelector('.ft-name').textContent=name; el.style.display='flex';
    el.querySelectorAll('.ft-btns button').forEach(function(b){ b.onclick=function(){ var B=btns[+b.dataset.i]; FairyTalk.close(); if(B.f)setTimeout(B.f,30); }; });
    clearInterval(FairyTalk._t); var cv=document.getElementById('ft-cv'), x=cv.getContext('2d'), t=0; FairyTalk._t=setInterval(function(){ if(!cv.isConnected){ clearInterval(FairyTalk._t); return; } x.clearRect(0,0,96,96); try{ draw(x,t++); }catch(e){} },120); },
  _drawSpirit:function(free){ var cv=null; return function(x,t){ if(!cv){ cv=mkCanvas(40,60); var tmp={textures:{exists:function(){ return false; },addCanvas:function(k,c){ cv=c; return {setFilter:function(){}}; }}}; ZSPIRIT._spiritTex(tmp,free?'free':'toil'); } x.drawImage(cv,24,6+Math.sin(t*0.4)*2,48,72); }; },
  // ── per tick (world) ──
  tick:function(){ try{ if(!ZSPIRIT.on||typeof game==='undefined'||!game.scene)return; var ws=game.scene.getScene('World'); if(!ws||!ws.wd||!ws.player||!ws.playerState||!ws.sys.isActive())return; ZSPIRIT._ws=ws;
      var ps=ws.playerState; if(!ps.spiritsFreed)ps.spiritsFreed=[]; var S=ZSPIRIT.shrines(ws), px=ws.player.x, py=ws.player.y; ZSPIRIT.shards(ws,ps,S);
      S.forEach(function(s){ var d=Math.hypot(px-s.x,py-s.y), V=s._v, fr=ZSPIRIT.freed(ps,s.id);
        if(d<1200&&!V){ V=s._v={}; V.stone=ZSPIRIT._stoneImg(ws,s.x,s.y+10,fr,s); if(!fr){ V.sp=ZSPIRIT._spiritSprite(ws,s.x+34,s.y+16,'toil',WR_DEPTH(s.y+16),s); V.tw=ws.tweens.add({targets:V.sp,y:V.sp.y-2,duration:520,yoyo:true,repeat:-1,ease:'Sine.inOut'});
            var Zg=typeof _scn==='function'?_scn():null, gk=null;      // round 59 (Kris): ONE spirit at each bindstone — the chain-gang and haul groups belong in the forges and Muspelheim      // round 54c: Kris's picked bound groups (Chain gang, The great haul) at two stones in three; the loop (wave 56) when painted
            if(gk&&Zg){ var GA=typeof ZGREEN!=='undefined'?ZGREEN.loop(ws,gk):null, gid=gk==='chaingang'?'sp_grp_chaingang':'sp_g2_haul';
              if(GA){ V.gang=ws.add.sprite(s.x-78,s.y+44,GA.key,'0').setOrigin(GA.ox,GA.oy).setScale(GA.scale*Zg.K).setDepth(WR_DEPTH(s.y+44)); try{ V.gang.play(GA.key); }catch(e){} }
              else if(Zg.has(gid)){ V.gang=Zg.image(ws,gid,s.x-78,s.y+44,Zg.K,WR_DEPTH(s.y+44)); if(V.gang)ws.tweens.add({targets:V.gang,x:V.gang.x-3,y:V.gang.y-1,duration:900,yoyo:true,repeat:-1,ease:'Sine.inOut'}); } }
            V.lbl=domText(ws,s.x+22,s.y-46,'⛓ '+s.spirit,{fontSize:'9px',color:'#9fe8ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(20); } }
        else if(d>1700&&V){ ['stone','sp','lbl','gang'].forEach(function(k){ if(V[k]&&V[k].destroy)V[k].destroy(); }); if(V.tw)V.tw.stop(); s._v=null; V=null; }
        // the Binder rises when you come near a bound spirit (and goes back to his post if you leave)
        if(!fr&&!s.mon&&!s._won&&d<420&&(ps.unlockedSections||[1]).indexOf(s.q)>=0)ZSPIRIT._binder(ws,s);
        if(s.mon&&!s.mon.dead&&d>1600){ ZSPIRIT._drop(ws,s.mon); s.mon=null; }
        // round 64 (Kris, freeing Orm: "the monsters to complete the battle seem to have run away. make sure that all monsters that are part of
        // liberating a spirit are drawn back to the rune with the spirit when they aren't engaged with you in battle"): the Binder (and whatever
        // he called up) drifts back to the bindstone whenever it is not fighting you; one that strayed far is pulled back at once
        if(s.mon&&!s.mon.dead)ZSPIRIT.leash(ws,s,px,py);
        if(s.mon&&s.mon.dead&&!fr){ s._won=true; s.mon=null; ZSPIRIT.free(ws,s); } });
      ZSPIRIT.green(ws); ZSPIRIT.glimmer(ws); }catch(e){ if(!ZSPIRIT._err){ ZSPIRIT._err=1; console.warn('spirits',e); } } },
  _binder:function(ws,s){ var pool=MON_ROSTER.filter(function(R){ return R.q===s.q&&R.seg==='main'&&MX.kit(R.id)&&!MON_LEGACY[R.id]; }); if(!pool.length)return;
    pool.sort(function(a,b){ return (b.tier||0)-(a.tier||0); }); var top=pool.slice(0,Math.max(4,Math.ceil(pool.length/3))), R=top[(s.id.length*7+s.tx)%top.length];
    var a=Math.atan2(ws.player.y-s.y,ws.player.x-s.x), x=s.x+Math.cos(a)*70, y=s.y+Math.sin(a)*70;
    var m=MX.spawn(ws,R.id,x,y,{q:s.q,hpMult:6.4,scale:1.25,temp:true,name:s.binder+' the Binder'}); if(!m)return; m.monAtk=Math.round(m.monAtk*1.3); m.def.atk=Math.round(m.def.atk*1.3); m.section=s.q; m._binder=s.id; m._noLoot=false; if(m._m)m._m.aggro=true; ws.worldMonsters.push(m); s.mon=m;
    if(!s._seen){ s._seen=true; showNotif('⛓ '+s.binder+' the Binder holds '+s.spirit+'\'s spirit at the bindstone of '+s.zname+'!','#9fe8ff'); }
    try{ var r=ws.add.circle(x,y,8,0x6fe3f5,0.5).setDepth(WR_DEPTH(y)); if(typeof ZFX!=='undefined')ZFX.dress(r,'fx_crack_ring'); ws.tweens.add({targets:r,radius:60,alpha:0,duration:500,onComplete:function(){ r.destroy(); }}); }catch(e){} },
  LEASH:{r:200,far:640,spd:42,eng:3500},
  leash:function(ws,s,px,py){ var now=Date.now(), L=ZSPIRIT.LEASH, mons=(ws.worldMonsters||[]).filter(function(m){ return m&&!m.dead&&(m===s.mon||m._binder===s.id||(m._summoner&&m._summoner===s.mon)); });
    mons.forEach(function(m){ if(m!==s.mon&&!m._binder)m._binder=s.id; var dm=Math.hypot(m.x-s.x,m.y-s.y); if(dm<=L.r)return;
      var eng=m._engT&&now-m._engT<L.eng, near=Math.hypot(px-m.x,py-m.y)<300; if(eng&&near)return;
      var nx, ny; if(dm>L.far){ var a=Math.atan2(py-s.y,px-s.x)+((m===s.mon)?0:(Math.random()-0.5)); nx=s.x+Math.cos(a)*90; ny=s.y+Math.sin(a)*90;
          try{ var r=ws.add.circle(nx,ny,8,0x6fe3f5,0.5).setDepth(WR_DEPTH(ny)); if(typeof ZFX!=='undefined')ZFX.dress(r,'fx_crack_ring'); ws.tweens.add({targets:r,radius:50,alpha:0,duration:450,onComplete:function(){ r.destroy(); }}); }catch(e){} }
      else { var k=Math.min(1,L.spd/dm); nx=m.x+(s.x-m.x)*k; ny=m.y+(s.y-m.y)*k; }
      m.x=nx; m.y=ny; if(m.cont&&m.cont.setPosition)m.cont.setPosition(nx,ny); if(m._m){ m._m.aggro=false; } }); },
  _drop:function(ws,m){ m.dead=true; m.temp=true; if(m.cont&&m.cont.destroy)m.cont.destroy(); var i=ws.worldMonsters.indexOf(m); if(i>=0)ws.worldMonsters.splice(i,1); },
  // round 64d (Kris: "i ended up with 22 ashland shards instead of shards from all of the different regions … making sure that each spirit you
  // liberate gives you a shard from their representative region"): every freed spirit pays out ONE shard of its own realm, once, however it was
  // freed (its bindstone, or the sandbox's buttons — the sandbox's "Green" used to free spirits without their shards). ps.shardsGiven keeps who
  // has paid; an older save counts every spirit it has already freed as paid.
  paid:function(ps){ if(!ps.shardsGiven)ps.shardsGiven=(ps.spiritsFreed||[]).slice(); return ps.shardsGiven; },
  shards:function(ws,ps,S){ var G=ZSPIRIT.paid(ps), L=ps.spiritsFreed||[]; if(G.length>=L.length&&ps._shardN===L.length)return; ps._shardN=L.length; var got=[];
    L.forEach(function(id){ if(G.indexOf(id)>=0)return; var s=(S||[]).find(function(x){ return x.id===id; }); if(!s)return; G.push(id); (ps.inventory=ps.inventory||[]).push('soulglass_'+s.q); got.push(s.q); });
    if(got.length&&ws&&ws._emitUI)ws._emitUI(); return got; },
  free:function(ws,s){ var ps=ws.playerState; if(ZSPIRIT.freed(ps,s.id))return; ZSPIRIT.paid(ps); ps.spiritsFreed.push(s.id); var item='soulglass_'+s.q; ps.inventory.push(item); ps.shardsGiven.push(s.id);
    var n=ZSPIRIT.count(ps,s.q), V=s._v;
    if(V){ if(V.lbl)V.lbl.destroy(); V.lbl=null; if(V.gang){ var gg=V.gang; V.gang=null; ws.tweens.add({targets:gg,alpha:0,duration:1200,onComplete:function(){ gg.destroy(); }}); } if(V.stone)V.stone.destroy(); V.stone=ZSPIRIT._stoneImg(ws,s.x,s.y+10,true,s);
      if(V.sp){ if(V.tw)V.tw.stop(); var ox=V.sp.x, oy=V.sp.y; V.sp.destroy(); var f=ZSPIRIT._spiritSprite(ws,ox,oy,'free',WR_DEPTH(oy),s); V.sp=f; f.setAlpha(0.95);
        var vx=CENTER_X*TILE-ox, vy=CENTER_Y*TILE-oy, L=Math.hypot(vx,vy)||1;
        ws.tweens.add({targets:f,y:oy-10,duration:900,yoyo:true,repeat:1,ease:'Sine.inOut',onComplete:function(){ ws.tweens.add({targets:f,x:ox+vx/L*220,y:oy+vy/L*220-60,alpha:0,duration:2600,ease:'Sine.in',onComplete:function(){ f.destroy(); if(s._v)s._v.sp=null; }}); }}); } }
    if(typeof ZSFX!=='undefined')try{ ZSFX.play('warp'); }catch(e){}
    var realm=ZSPIRIT.REALM[s.q], need=ZSPIRIT.NEED, have=ZSPIRIT.items(ps,item);
    ZSPIRIT.talk(s.spirit,ZSPIRIT.COL,'<b>The chains are gone…</b> I was '+s.trade+' in the '+realm+', before the Binders dragged me to this stone to dig for the Tyrant of Muspelheim. Thank you, '+heroName(ps)+'.<br><br>Take this — a <b>Soulglass shard</b>, a piece of the light that held me here. I am going home, to the Runestone Green.<br><br><span style="color:#9fe8ff">Soulglass of the '+realm+': '+have+' (the Glasswright needs '+need+') · spirits freed here: '+n+' / 10</span>',[{t:'Go in peace'}],ZSPIRIT._drawSpirit(true));
    if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('a spirit freed'); }catch(e){}
    if(ws._emitUI)ws._emitUI(); },
  // the freed spirits gather on the Runestone Green
  green:function(ws){ var ps=ws.playerState, n=Math.min(40,(ps.spiritsFreed||[]).length), cx=CENTER_X*TILE+16, cy=CENTER_Y*TILE+16, near=Math.hypot(ws.player.x-cx,ws.player.y-cy)<1500, G=ws._greenSp||(ws._greenSp=[]);
    var GR=ws._greenGr||(ws._greenGr=[]);
    if(!near){ if(G.length){ G.forEach(function(o){ o.destroy(); }); ws._greenSp=[]; } if(GR.length){ GR.forEach(function(o){ o.destroy(); }); ws._greenGr=[]; ws._greenGrN=0; } return; }
    // once the painted spirit groups (wave 53) are in: a dozen drift around the stone, the rest rest in little groups around the green
    var Z=typeof _scn==='function'?_scn():null, grp=!!(Z&&Z.has&&Z.has('sp_group_2')), solo=grp?Math.min(n,12):n, rest=n-solo;
    if(grp&&ws._greenGrN!==rest){ GR.forEach(function(o){ o.destroy(); }); GR=ws._greenGr=[]; ws._greenGrN=rest; var left=rest, k=0;
      [10,6,4,3,2].forEach(function(sz){ while(left>=sz||(sz===2&&left===1)){ var a=0.6+k*1.13, x=cx+Math.cos(a)*TILE*10.5, y=cy+Math.sin(a)*TILE*8.2, id='sp_group_'+sz, im=Z.has(id)?Z.image(ws,id,x,y,Z.K,WR_DEPTH(y)):null;
        if(im){ im.setAlpha(0.9); GR.push(im); ws.tweens.add({targets:im,y:y-3,duration:1700+k*150,yoyo:true,repeat:-1,ease:'Sine.inOut'}); } left-=Math.min(sz,left); k++; } }); }
    while(G.length>solo){ G.pop().destroy(); }
    while(G.length<solo){ var i=G.length, a=i*2.39996, r=TILE*(4.5+(i%4)*1.3), x=cx+Math.cos(a)*r, y=cy+Math.sin(a)*r*0.8, fid=(ps.spiritsFreed||[])[i], fs=fid&&ZSPIRIT.shrines(ws).find(function(q){ return q.id===fid; }), o=ZSPIRIT._spiritSprite(ws,x,y,'free',WR_DEPTH(y),fs); o.setAlpha(0.85); o._a=a; o._r=r; G.push(o);
      ws.tweens.add({targets:o,y:y-5,duration:1400+(i%5)*200,yoyo:true,repeat:-1,ease:'Sine.inOut'}); }
    var t=Date.now()/1000; G.forEach(function(o,i){ var a=o._a+t*0.05*(i%2?1:-1); o.x=cx+Math.cos(a)*o._r; o.setDepth(WR_DEPTH(o.y)); }); },
  // ── the Glimmerhall ──
  glimmerOpen:function(ps){ return ['s1_harbor','s2_harbor','s3_harbor','s4_harbor'].some(function(k){ return (ps.completedQuests||[]).indexOf(k)>=0; }); },
  glimmer:function(ws){ var ps=ws.playerState, want=ZSPIRIT.glimmerOpen(ps); VR_EXTRA.glimmer=want; if(!ws.wd||ws.wd._glim===want)return; var first=ws.wd._glim!==undefined; ws.wd._glim=want; if(!first&&!want)return;
    if(typeof villageApply==='function'&&ws.wd.villageStage){ villageApply(ws.wd,ws.wd.villageStage).forEach(function(q){ ws._refreshChunkAt(q[0]*WCH,q[1]*WCH); }); }
    if(want&&first)showNotif('✨ A new hall of glass rises on the village green — the Glimmerhall. Sólveig the Glasswright has come.','#9fe8ff'); },
  door:function(){ var g=VR_EXTRA.glimmerAt; if(!g||!VR_EXTRA.glimmer)return null; return {x:(CENTER_X+g[0]+3)*TILE+16, y:(CENTER_Y+g[1]+g[3])*TILE+16}; },
  // [Tab] near a bound spirit or the Glimmerhall's door
  check:function(ws){ if(!ws.player)return false; var px=ws.player.x, py=ws.player.y, D=ZSPIRIT.door(), tgt=null, ps=ws.playerState;
    if(D&&Math.hypot(px-D.x,py-D.y)<TILE*1.6)tgt={id:'glim',x:D.x,y:D.y-40,t:'[Tab] Enter the Glimmerhall'};
    if(!tgt)(ws.wd._shrines||[]).forEach(function(s){ if(!tgt&&s._v&&Math.hypot(px-s.x,py-s.y)<TILE*2.4)tgt={id:s.id,s:s,x:s.x,y:s.y-60,t:ZSPIRIT.freed(ps,s.id)?'The bindstone of '+s.zname+' (free)':'[Tab] '+s.spirit+'\'s bindstone'}; });
    if(!tgt){ if(ws._interactPrompt&&ws._interactPrompt._zsp){ ws._interactPrompt.destroy(); ws._interactPrompt=null; } return false; }
    if(!ws._interactPrompt||ws._interactPrompt._zsp!==tgt.id){ if(ws._interactPrompt)ws._interactPrompt.destroy(); ws._interactPrompt=domText(ws,tgt.x,tgt.y,tgt.t,{fontSize:'10px',color:'#9fe8ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20); ws._interactPrompt._zsp=tgt.id; }
    if(Phaser.Input.Keyboard.JustDown(ws.keys.TAB)){ if(tgt.id==='glim')ZSPIRIT.solveig(ws); else if(!ZSPIRIT.freed(ps,tgt.s.id)){ var s=tgt.s;
        ZSPIRIT.talk(s.spirit,'#7fb8c8','<i>(The spirit\'s chains rattle as it swings its pick.)</i> Please… '+s.binder+' the Binder keeps me here, digging for the Tyrant. '+((ps.unlockedSections||[1]).indexOf(s.q)<0?'He will not show himself to one who has not yet earned the '+ZSPIRIT.REALM[s.q]+'.':'Beat him and I am free!'),[{t:'I will free you'}],ZSPIRIT._drawSpirit(false)); } }
    return true; },
  // ── Sólveig the Glasswright ──
  solveig:function(ws){ var ps=ws.playerState, rows='', btns=[];
    for(var q=1;q<=4;q++){ var sh=ZSPIRIT.items(ps,'soulglass_'+q), lat=ZSPIRIT.items(ps,'soulglass_lattice_'+q), fr=ZSPIRIT.count(ps,q);
      rows+='<div style="margin:3px 0">'+['','🌿','💧','⛰','🔥'][q]+' <b>'+ZSPIRIT.REALM[q]+'</b>: '+sh+' shard'+(sh===1?'':'s')+' · freed '+fr+' / 10'+(lat?' · <span style="color:#9fe8ff">'+ITEMS['soulglass_lattice_'+q].name+' ✓</span>':'')+'</div>';
      if(sh>=ZSPIRIT.NEED&&!lat)(function(q){ btns.push({t:'Fuse the '+ZSPIRIT.REALM[q]+' lattice',f:function(){ ZSPIRIT.fuse(ws,q); }}); })(q); }
    btns.push({t:'Farewell'});
    ZSPIRIT.talk('Sólveig the Glasswright','#9fe8ff','Welcome to the Glimmerhall, '+heroName(ps)+'. Every spirit you free leaves a shard of <b>soulglass</b> — the light the Binders chained. Bring me <b>six shards of one realm</b> and I will fuse them into that realm\'s <b>Soulglass lattice</b>. But its true form… that can only be made in the heart of a forge.'+'<div style="margin-top:8px;font-size:11px">'+rows+'</div>',btns,ZSPIRIT._drawSolveig()); },
  fuse:function(ws,q){ var ps=ws.playerState, n=0; ps.inventory=ps.inventory.filter(function(i){ if(i==='soulglass_'+q&&n<ZSPIRIT.NEED){ n++; return false; } return true; }); ps.inventory.push('soulglass_lattice_'+q);
    if(typeof ZSFX!=='undefined')try{ ZSFX.play('levelup'); }catch(e){}
    ZSPIRIT.talk('Sólveig the Glasswright','#9fe8ff','There — the <b>'+ITEMS['soulglass_lattice_'+q].name+'</b>. Feel how it hums? Take it to the <b>'+ZSPIRIT.FORGE[q]+' Forge</b>. Only a forge\'s heart can give it its true form — and you will need something to carry it through that heat.',[{t:'Thank you'}],ZSPIRIT._drawSolveig());
    if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('a soulglass lattice'); }catch(e){} if(ws._emitUI)ws._emitUI(); },
  _drawSolveig:function(){ var Z=typeof _scn==='function'?_scn():null; return function(x,t){ if(Z&&Z.has&&Z.has('np_solveig')){ try{ Z.draw(x,'np_solveig',48,92,88); return; }catch(e){} }
      x.save(); x.translate(48,50+Math.sin(t*0.3)); x.fillStyle='#2e4a66'; x.beginPath(); x.moveTo(-16,40); x.lineTo(-10,0); x.lineTo(10,0); x.lineTo(16,40); x.closePath(); x.fill(); x.fillStyle='#f0d2b0'; x.beginPath(); x.arc(0,-10,10,0,Math.PI*2); x.fill();
      x.fillStyle='#e8e0c0'; x.beginPath(); x.arc(0,-13,10,Math.PI,0); x.fill(); x.fillRect(-10,-13,4,22); x.fillRect(6,-13,4,22); x.fillStyle='#1d3a52'; x.fillRect(-5,-10,2,2); x.fillRect(3,-10,2,2);
      var g=x.createRadialGradient(18,6,1,18,6,12); g.addColorStop(0,'rgba(160,240,255,1)'); g.addColorStop(1,'rgba(111,227,245,0)'); x.fillStyle=g; x.beginPath(); x.arc(18,6,12,0,Math.PI*2); x.fill(); x.restore(); }; },
  // the quest journal: the realms' spirits and the Glimmerhall
  questHTML:function(ps){ if(!ps||!ZSPIRIT._ws||!ZSPIRIT._ws.wd)return ''; var S=ZSPIRIT.shrines(ZSPIRIT._ws), h='<div class="qgrp" style="border:1px solid rgba(111,227,245,.4);background:rgba(10,40,60,.3);margin-bottom:14px"><div class="qgrp-hdr" style="color:#9fe8ff">⛓ The Bound Spirits</div>';
    for(var q=1;q<=4;q++){ if((ps.unlockedSections||[1]).indexOf(q)<0)continue; var mine=S.filter(function(s){ return s.q===q; }), fr=mine.filter(function(s){ return ZSPIRIT.freed(ps,s.id); }).length, lat=ZSPIRIT.items(ps,'soulglass_lattice_'+q)>0;
      var left=mine.filter(function(s){ return !ZSPIRIT.freed(ps,s.id); }).map(function(s){ return s.zname; }).slice(0,10).join(', ');
      h+='<div class="qitem '+(fr>=ZSPIRIT.NEED?'qdone':'')+'"><div class="qico">'+['','🌿','💧','⛰','🔥'][q]+'</div><div class="qinf"><div class="qtit">'+ZSPIRIT.REALM[q]+': '+fr+' / 10 freed '+(lat?'· lattice ✓':fr>=ZSPIRIT.NEED?'· take 6 shards to the Glimmerhall':'· free '+(ZSPIRIT.NEED-fr)+' more')+'</div><div class="qdesc">Bindstones still chained: '+(left||'none')+'</div></div></div>'; }
    h+='<div class="qitem"><div class="qico">✨</div><div class="qinf"><div class="qtit">The Glimmerhall '+(ZSPIRIT.glimmerOpen(ps)?'✓':'🔒')+'</div><div class="qdesc">'+(ZSPIRIT.glimmerOpen(ps)?'Sólveig the Glasswright fuses six shards of one realm into its Soulglass lattice.':'Rises in the village once you beat the guardian of a familiar island.')+'</div></div></div></div>';
    return h; } };

// ── the items: the shards and lattices (the Tome lists them with the other items) ──
(function(){ if(typeof ITEMS==='undefined')return; var R=ZSPIRIT.REALM, F=ZSPIRIT.FORGE;
  for(var q=1;q<=4;q++){ ITEMS['soulglass_'+q]={name:'Soulglass Shard ('+R[q]+')',icon:'💠',slot:'key',sell:0,tomeHint:'Given by a spirit of the '+R[q]+' when you beat the Binder at its bindstone',desc:'A shard of the light that chained a spirit in the '+R[q]+'. Six of them, fused by Sólveig in the Glimmerhall, make the '+F[q]+' Lattice.'};
    ITEMS['soulglass_lattice_'+q]={name:F[q]+' Soulglass Lattice',icon:'🔷',slot:'key',sell:0,tomeHint:'Fused by Sólveig in the Glimmerhall from six '+R[q]+' shards',desc:'Six '+R[q]+' shards fused into one humming lattice. Its true form can only be made at the hearth of the '+F[q]+' Forge.'}; } })();
// ── hooks: the world's [Tab], the journal, the tick ──
(function(){ if(typeof WorldScene==='undefined')return; var c0=WorldScene.prototype._checkInteraction; if(c0)WorldScene.prototype._checkInteraction=function(){ if(ZSPIRIT.on&&ZSPIRIT.check(this))return; return c0.apply(this,arguments); };
  if(typeof ZROLL!=='undefined'&&ZROLL.questHTML){ var q0=ZROLL.questHTML; ZROLL.questHTML=function(ps){ return ZSPIRIT.questHTML(ps)+q0.apply(ZROLL,arguments); }; }
  if(typeof villageStageOf==='function'){ var v0=villageStageOf; villageStageOf=function(ps){ if(ps&&ps.completedQuests)VR_EXTRA.glimmer=ZSPIRIT.glimmerOpen(ps); return v0.apply(this,arguments); }; } })();
setInterval(ZSPIRIT.tick,250);
