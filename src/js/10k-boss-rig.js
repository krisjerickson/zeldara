// ═══════════════════════════════════════════════════════════════════════
// ║ BOSS RIG (round 7) — file 10k so it loads after CHX (10g) and MX (09) — puts the painted bosses (07zz) into the game and
// ║ gives each its own way of moving.
// ║  • dress(scene, mon|null, slot, cont, body?) swaps a boss's body for the
// ║    painted texture: back layer (wings, cape, rings, aura) behind, body
// ║    frames 0–3, and a pupil layer for great eyes (it follows you).
// ║  • tick() animates it: breathing, hover, heavy footfalls (camera shake +
// ║    dust), slithering sway, heartbeat pulse, turning rings, plane-shifting
// ║    flicker, afterimages when fast, and a fade-out/fade-in when it
// ║    teleports (any jump > 70 px in one frame).
// ║  • pace: slow/daunting bosses move slower, blur/fly ones faster.
// ║  • names: the picked design's name replaces the boss's old name.
// ║ Hooks: CHX.bossBody (10g) for phase-1 guardians, island + volcano bosses,
// ║ roaming world bosses and elites; MX.spawn (09) for engine bosses (phase
// ║ forms, allies, castle wardens, mage-tower masters).
// ═══════════════════════════════════════════════════════════════════════
var BossRig={ keys:[], MAXTEX:8,
  // a Phaser texture for a design: frames '0'-'3' body, 'b' back, 'p' pupil
  tex:function(scene,D){ var key='ba_'+D.id, TM=scene.textures; if(TM.exists(key)){ BossRig._touch(key); return key; }
    var S=BA.sheet(D), P=S.P, t=TM.addCanvas(key,S.c); for(var i=0;i<4;i++)t.add(String(i),0,i*P.W,0,P.W,P.H); t.add('b',0,4*P.W,0,P.W,P.H); if(P.pupil)t.add('p',0,5*P.W,0,P.W,P.H);
    BossRig._touch(key); BossRig._evict(TM,key); return key; },
  _touch:function(key){ var i=BossRig.keys.indexOf(key); if(i>=0)BossRig.keys.splice(i,1); BossRig.keys.push(key); },
  // keep graphics memory bounded: drop the oldest painted-boss textures (and their canvases)
  _evict:function(TM,keep){ while(BossRig.keys.length>BossRig.MAXTEX){ var k=BossRig.keys.shift(); if(k===keep)continue; try{ if(TM.exists(k))TM.remove(k); }catch(e){} delete BA.cache[k.slice(3)]; } },
  // slot for a legacy boss type / name
  slotOf:function(type,def){ if(type&&/^elite_\d$/.test(type)&&BOSS_SLOTS[type])return type; var id=CHX.bossId(type,def); return id&&BOSS_SLOTS[id]?id:null; },
  // Build the painted body. Returns the body image (with the old setFillStyle hit-flash API).
  dress:function(scene,slot,cont,mon,feetY){ var D=BA.of(slot); if(!D||!scene.add||!scene.textures)return null;
    var key=BossRig.tex(scene,D), P=BA.paint(D), sc=1/BA.RES, ox=P.ox/P.W, oy=P.oy/P.H, M=BA.MOTION[D.motion]||BA.MOTION.stride, fy=feetY||0;
    var pvU=(BA.PIVOT[D.arch]||0)*(D.h/100)*(D._kfix||1), pv=pvU*BA.RES;   // rotation pivot (rings) in texture px above the feet
    var back=scene.add.image(0,fy+pvU,key,'b').setOrigin(ox,(P.oy+pv)/P.H).setScale(sc);
    var body=scene.add.image(0,fy,key,'0').setOrigin(ox,oy).setScale(sc);
    var pupil=P.pupil?scene.add.image(0,fy,key,'p').setOrigin(ox,oy).setScale(sc):null;
    if(cont){ cont.add(back); cont.add(body); if(pupil)cont.add(pupil); }
    body._ch=true; body._baseSc=sc;
    var R=body._rig={D:D,M:M,back:back,body:body,pupil:pupil,cont:cont,fy:fy,t:Math.random()*6,lx:null,ly:null,fade:0,trailT:0,ghosts:0,step:0,laid:false,mon:mon||null,scene:scene};
    body.setFillStyle=function(c){ if(c===0xffffff)this.setTintFill(0xffffff); else if(c===undefined||c===null)this.clearTint(); else if(typeof c==='number'&&c!==(this._baseCol||-1))this.setTint(c); else this.clearTint(); return this; };
    body.setStrokeStyle=function(){ return this; };
    return body; },
  // grow the boss's footprint: hit radius + shadow (legacy defs are shared → copy first)
  size:function(mon,D){ if(!mon||!D)return; var r=Math.min(46,Math.max(mon.def.r||14,Math.round(D.h*0.15))), M=BA.MOTION[D.motion]||BA.MOTION.stride;
    mon.def=Object.assign({},mon.def,{r:r,spd:Math.round((mon.def.spd||55)*(D.pace||M.pace||1))}); mon.bossArt=D.id; },
  // lay out the container once (shadow + hp bar above the painted body)
  _layout:function(R){ var c=R.cont; if(!c||!c.list)return; R.laid=true; var D=R.D, top=R.fy-D.h-(D.arch==='orb'?30:10), sh=null, mv=[];
    c.list.forEach(function(o){ if(o===R.back||o===R.body||o===R.pupil)return; if(o.type==='Ellipse'&&!sh&&o.y>=0){ sh=o; return; } if(o.y<-4&&o.type!=='Image')mv.push(o); });
    if(sh){ sh.setSize(Math.max(sh.width,D.h*0.55),Math.max(sh.height,D.h*0.09)); if(sh.setDisplaySize)sh.setDisplaySize(Math.max(sh.displayWidth,D.h*0.55),Math.max(sh.displayHeight,D.h*0.09)); }
    if(mv.length){ var maxY=Math.max.apply(null,mv.map(function(o){ return o.y; })), d=(top-6)-maxY; mv.forEach(function(o){ o.y+=d; }); } },
  // per-frame animation. dt seconds.
  tick:function(R,dt){ var b=R.body; if(!b||!b.scene||!R.cont||!R.cont.scene)return; if(!R.laid)BossRig._layout(R);
    var c=R.cont, x=c.x, y=c.y, sc=b._baseSc, D=R.D, M=R.M; R.t+=dt;
    var dx=R.lx===null?0:x-R.lx, dy=R.ly===null?0:y-R.ly, d=Math.hypot(dx,dy), spd=dt>0?d/dt:0, moving=spd>10?1:0.25;
    // teleport: a jump > 70 px in one frame → ghost left behind + fade back in
    if(d>70&&R.lx!==null){ BossRig.ghost(R,R.lx,R.ly,0.7,420,true); R.fade=0.4; BossRig.ring(R.scene,x,y-D.h*0.4,D.pal.g); if(typeof ZSFX!=='undefined')ZSFX.play('warp'); }
    R.lx=x; R.ly=y;
    var st=M.pose(R.t,moving,D), fl=b.flipX, fa=R.fade>0?1-R.fade/0.4:1; if(R.fade>0)R.fade=Math.max(0,R.fade-dt);
    b.setScale(sc*st.sx,sc*st.sy); b.y=R.fy+st.y; b.rotation=(st.rot||0)*(fl?-1:1);
    var baseA=(R.mon&&R.mon.mx)?b.alpha:1; b.setAlpha(Math.max(0,Math.min(1,(st.a===undefined?1:st.a)*fa*baseA)));
    var bk=R.back; bk.setFlipX(fl); bk.setScale(sc*st.flap*(fl?1:1),sc); bk.y=R.fy+st.y+(BA.PIVOT[D.arch]||0)*(D.h/100)*(D._kfix||1); bk.rotation=D.orb==='heart'?0:(st.backRot||0)*(fl?-1:1); bk.setAlpha(b.alpha);
    if(R.pupil){ var pp=CHX.ppos(R.scene), ex=0, ey=0; if(pp){ var vx=pp.x-x, vy=pp.y-(y-D.h*0.5), l=Math.hypot(vx,vy)||1; ex=vx/l*D.h*0.035; ey=vy/l*D.h*0.02; } R.pupil.x=ex; R.pupil.y=R.fy+st.y+ey; R.pupil.setScale(sc*st.sx,sc*st.sy); R.pupil.setAlpha(b.alpha); }
    // plane-shift: now and then a translucent copy slides out of step with the body
    if(st.ghost&&M.veil!==undefined&&Math.random()<dt*0.9)BossRig.ghost(R,x+(st.gx||0)*(Math.random()<0.5?-1:1),y,0.35,360,true);
    // afterimages when fast (always for blur/fly styles; any boss that charges)
    R.trailT-=dt; if(R.trailT<=0&&(spd>150||(M.trail&&spd>45))){ R.trailT=M.trail?0.06:0.08; BossRig.ghost(R,x,y,M.trail?0.42:0.3,300,false); }
    // heavy footfalls: dust + a little camera shake when the hero is near
    if(M.step&&moving===1){ var ph=Math.sin(R.t*(M===BA.MOTION.lumber?2.2:3.2)), s=ph>0?1:-1; if(s!==R.step){ R.step=s; BossRig.foot(R,x,y); } } },
  ghost:function(R,x,y,a,ms,add){ if(R.ghosts>8)return; var b=R.body, s=R.scene; if(!s||!s.add)return; R.ghosts++;
    var g=s.add.image(x,y+R.fy+(b.y-R.fy),b.texture.key,b.frame.name).setOrigin(b.originX,b.originY).setScale(b.scaleX,b.scaleY).setFlipX(b.flipX).setRotation(b.rotation).setAlpha(a).setTint(hexNum(R.D.pal.g)).setDepth((R.cont.depth||10)-0.5);
    if(add)g.setBlendMode(Phaser.BlendModes.ADD);
    s.tweens.add({targets:g,alpha:0,duration:ms,onComplete:function(){ g.destroy(); R.ghosts--; }}); },
  ring:function(s,x,y,col){ if(!s||!s.add)return; var r=s.add.circle(x,y,10,hexNum(col),0).setStrokeStyle(3,hexNum(col),0.9).setDepth(60); s.tweens.add({targets:r,scale:6,alpha:0,duration:420,onComplete:function(){ r.destroy(); }}); },
  foot:function(R,x,y){ var s=R.scene, D=R.D, M=R.M; if(!s||!s.add)return; var pp=CHX.ppos(s), near=pp&&Math.hypot(pp.x-x,pp.y-y)<460;
    if(near&&M.shake&&s.cameras&&s.cameras.main)s.cameras.main.shake(110,M.shake*(D.h/160));
    if(near&&typeof ZSFX!=='undefined')ZSFX.play('stomp',{big:D.h/150});
    for(var i=0;i<2;i++){ var p=s.add.ellipse(x+(i?1:-1)*D.h*0.12,y+R.fy-2,D.h*0.12,D.h*0.04,0xb8a890,0.4).setDepth((R.cont.depth||10)-0.4); s.tweens.add({targets:p,scaleX:2.2,scaleY:1.6,alpha:0,y:p.y-4,duration:520,onComplete:(function(q){ return function(){ q.destroy(); }; })(p)}); } },
  // ── names: the picked design names the boss everywhere ──
  applyNames:function(){ if(typeof CHAR_BY_ID==='undefined')return;
    BOSS_SLOT_LIST.forEach(function(sl){ var D=BA.of(sl); if(!D)return; if(CHAR_BY_ID[sl]){ CHAR_BY_ID[sl]._oldName=CHAR_BY_ID[sl]._oldName||CHAR_BY_ID[sl].name; CHAR_BY_ID[sl].name=D.name; } });
    Object.keys(CHAR_BOSS_FOR_MDEF).forEach(function(k){ var D=BA.of(CHAR_BOSS_FOR_MDEF[k]); if(D&&MDEFS[k])MDEFS[k].name=D.name; });
    Object.keys(MON_BY_ID).forEach(function(rid){ var R=MON_BY_ID[rid]; if(R.chId){ var D=BA.of(R.chId); if(D)R.name=D.name; } });
    CHAR_BOSS_BY_NAME={}; CHAR_ROSTER.forEach(function(R){ if(R.cat==='boss'){ CHAR_BOSS_BY_NAME[R.name.toUpperCase()]=R.id; if(R._oldName)CHAR_BOSS_BY_NAME[R._oldName.toUpperCase()]=R.id; } });
    // phase intros use the names ({prev} = the form before, {NAME} = the new form)
    if(typeof BOSS_PHASES!=='undefined')Object.keys(BOSS_PHASES).forEach(function(k){ var B=BOSS_PHASES[k]; B.phases.forEach(function(P,i){ if(!P||!P.introT)return; var prev=i===1?BA.of(CHAR_BOSS_FOR_MDEF[k]):BA.of(B.phases[i-1].form), cur=BA.of(P.form);
      P.intro=P.introT.replace('{prev}',prev?prev.name.split(',')[0]:'The guardian').replace('{NAME}',cur?cur.name.toUpperCase():'IT'); }); }); }
};
// ── hooks ──
(function(){
  // legacy boss bodies (phase-1 guardians, island, volcano, roaming world bosses, elites)
  var bb=CHX.bossBody;
  CHX.bossBody=function(scene,type,def,cont){ var sl=BossRig.slotOf(type,def); if(sl){ var r=def.r||18, fy=r*0.9+1, body=BossRig.dress(scene,sl,cont,null,fy); if(body){ body._baseCol=def.color; if(cont){ var au=scene.add.image(0,fy-BA.of(sl).h*0.35,CHX.glow(scene)).setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(BA.of(sl).pal.g)).setAlpha(0.28).setScale(BA.of(sl).h/70); cont.addAt(au,0); scene.tweens.add({targets:au,alpha:0.1,duration:1100,yoyo:true,repeat:-1,ease:'Sine.inOut'}); }
        BossRig._legacy(scene,body); return body; } }
    return bb.apply(this,arguments); };
  // animate legacy rigs from a scene update hook; the monster def (shared MDEF) is copied + grown on first tick
  BossRig._legacy=function(scene,body){ if(!scene._bossRigs){ scene._bossRigs=[]; scene.events.on('update',function(t,ms){ if(typeof _anyModalOpen==='function'&&_anyModalOpen())return; var L=scene._bossRigs;
        for(var i=L.length-1;i>=0;i--){ var b=L[i]; if(!b.scene){ L.splice(i,1); continue; } var R=b._rig; if(!R.mon){ var list=scene.monsters||scene.worldMonsters||scene._mons||[]; for(var j=0;j<list.length;j++){ if(list[j].body===b){ R.mon=list[j]; BossRig.size(R.mon,R.D); break; } } }
          var m=R.mon, f=m&&m.dead?'0':(m&&m.atkTimer>0.25?'3':(Math.floor(R.t*1.6)%2?'1':'0')); if(b.frame.name!==f)b.setFrame(f); if(m&&m.x!==undefined){ var px=m.x; if(R._px!==undefined&&Math.abs(px-R._px)>0.4)b.setFlipX(px<R._px); R._px=px; }
          BossRig.tick(R,ms/1000); } });
      scene.events.once('shutdown',function(){ scene._bossRigs=[]; }); }
    scene._bossRigs.push(body); };
  // engine bosses: MX.spawn → painted body when the monster has a design
  var sp=MX.spawn;
  MX.spawn=function(scene,rid,x,y,o){ var mon=sp.apply(this,arguments); if(!mon)return mon; var R=MON_BY_ID[rid], sl=R&&R.chId;
    if(sl&&BA.of(sl)&&mon.cont){ var old=mon.spr, fy=(mon.def.r||14)*0.9+1, body=BossRig.dress(scene,sl,null,mon,fy);
      if(body){ var i=mon.cont.getIndex(old); mon.cont.addAt(body._rig.back,i); mon.cont.addAt(body,i+1); if(body._rig.pupil)mon.cont.addAt(body._rig.pupil,i+2); body._rig.cont=mon.cont; body._baseCol=old._baseCol; old.destroy(); mon.spr=body; mon.body=body; BossRig.size(mon,body._rig.D); } }
    return mon; };
  var an=MX.anim; MX.anim=function(A,mon,m,dt,dx){ an.apply(this,arguments); if(mon.spr&&mon.spr._rig)BossRig.tick(mon.spr._rig,dt); };
})();
// the engine rids that are painted bosses (phase forms + allies, wardens, masters)
(function(){ Object.keys(BOSS_PHASES).forEach(function(k){ BOSS_PHASES[k].phases.forEach(function(P){ if(!P)return; if(MON_BY_ID[P.rid])MON_BY_ID[P.rid].chId=P.form; (P.allies||[]).forEach(function(a){ if(MON_BY_ID[a.rid])MON_BY_ID[a.rid].chId=a.form; }); }); });
  if(typeof CASTLE_ISLANDS!=='undefined')Object.keys(CASTLE_ISLANDS).forEach(function(k){ var C=CASTLE_ISLANDS[k]; if(C.rid&&MON_BY_ID[C.rid])MON_BY_ID[C.rid].chId=C.warden; });
  if(typeof MAGE_TOWERS!=='undefined')MAGE_TOWERS.forEach(function(M){ if(M.rid&&MON_BY_ID[M.rid])MON_BY_ID[M.rid].chId=M.boss; });
  BOSS_SLOT_LIST.forEach(function(sl){ if(CHAR_BY_ID[sl]&&CHAR_BY_ID[sl].spec)CHAR_BY_ID[sl].spec._bossSlot=sl; });   // the Tome paints them
  BossRig.applyNames(); })();

// ═══════════════════════════════════════════════════════════════════════
// ║ BOSS MOMENTS (round 7): a title card when you meet a boss, the boss
// ║ transforming on the spot between phases, a finale when it falls, a
// ║ brief hit-pause on heavy blows, and boss music (04c-audio.js).
// ═══════════════════════════════════════════════════════════════════════
var BossMoments={
  ROMAN:['','I','II','III','IV','V'],
  // DungeonScene.update calls this every frame
  tick:function(S,dt){ if(S._bmIntro||!S.monsters)return; var b=S.monsters.find(function(m){ return m.isBoss&&!m.dead&&!m.bossAlly&&!m.eliteKin; }); if(!b)return;
    var d=Math.hypot(b.x-S.px,b.y-S.py); if(d<(S._bossPhase>1?9999:400))BossMoments.intro(S,b); },
  intro:function(S,b){ S._bmIntro=true; var key=S._bossKey||'', ph=S._bossPhase||1, n=(typeof BossPhases!=='undefined'&&BossPhases.count(key))||1, D=b.body&&b.body._rig&&b.body._rig.D;
    var nm=(b.def.name||'').replace(/ \(Rematch\)$/,''), i=nm.indexOf(', '), main=i>0?nm.slice(0,i):nm, sub=i>0?nm.slice(i+2):'';
    var kind=String(key).indexOf('elite_')===0?'Vault guardian':String(key).indexOf('mg_')===0?'Mage-tower master':String(key).indexOf('cw_')===0?'Castle warden':S._isIsland?'Island guardian':(n>1?'Phase '+BossMoments.ROMAN[ph]+' of '+BossMoments.ROMAN[n]:'Guardian');
    BossMoments.card(main,sub,kind,D&&D.lore||'',D?D.pal.g:'#ffb060');
    S._introT=ph>1?1.2:1.7; ZSFX.play('card'); S.time.delayedCall(ph>1?150:500,function(){ ZSFX.play('roar',{big:D?D.h/150:1}); });
    var cam=S.cameras&&S.cameras.main; if(cam){ var z0=cam.zoom; cam.zoomTo(z0*1.18,500,'Sine.easeInOut'); S.time.delayedCall(1300,function(){ if(cam.zoomTo)cam.zoomTo(z0,600,'Sine.easeInOut'); }); cam.shake(400,0.004); }
    if(ph>1&&b.body&&b.body._rig){ var R=b.body._rig; R.fade=0.4; BossRig.ring(S,b.x,b.y-(D?D.h*0.4:40),D?D.pal.g:'#ffffff'); }
    ZSFX.music(S.siteSection||1,Math.max(ph,String(key).indexOf('mg_')===0||String(key).indexOf('cw_')===0?2:1));
    S.events.once('shutdown',function(){ if(!S._bmKeepMusic)ZSFX.stopMusic(); S._bmKeepMusic=false; S._bmIntro=false; S._introT=0; S._hitStop=0; BossMoments.hideCard(); }); },
  card:function(main,sub,kind,lore,col){ var el=document.getElementById('boss-card'); if(!el){ el=document.createElement('div'); el.id='boss-card'; (document.getElementById('app')||document.body).appendChild(el); }
    el.style.setProperty('--bc',col); el.innerHTML='<div class="bc-bar t"></div><div class="bc-bar b"></div><div class="bc-in"><div class="bc-k">'+kind+'</div><div class="bc-n">'+main+'</div>'+(sub?'<div class="bc-s">'+sub+'</div>':'')+(lore?'<div class="bc-l">'+lore+'</div>':'')+'</div>';
    el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); clearTimeout(el._t); el._t=setTimeout(BossMoments.hideCard,2600); },
  hideCard:function(){ var el=document.getElementById('boss-card'); if(el)el.classList.remove('on'); },
  // the fight goes on in the next arena: the boss swells with light, shockwaves, a roar
  transform:function(S,mon){ S._bmKeepMusic=true; var b=mon.body, R=b&&b._rig, D=R&&R.D, x=mon.x, y=mon.y; ZSFX.play('roar',{big:D?D.h/140:1.2}); S.time.delayedCall(900,function(){ ZSFX.play('boom'); });
    if(R&&S.add){ var g=S.add.image(x,y+R.fy,b.texture.key,'3').setOrigin(b.originX,b.originY).setScale(b.scaleX,b.scaleY).setFlipX(b.flipX).setDepth((mon.cont.depth||10)+1).setTintFill(0xffffff).setAlpha(0);
      S.tweens.add({targets:g,alpha:0.95,duration:500}); S.tweens.add({targets:g,scaleX:b.scaleX*1.7,scaleY:b.scaleY*1.7,duration:1500,ease:'Cubic.easeIn'}); S.tweens.add({targets:g,alpha:0,delay:1150,duration:400}); }
    for(var i=0;i<4;i++)(function(i){ S.time.delayedCall(i*260,function(){ BossRig.ring(S,x,y-(D?D.h*0.4:40),D?D.pal.g:'#ffffff'); }); })(i);
    if(S.cameras)S.cameras.main.shake(1400,0.01); },
  // the last phase falls: slow collapse, light, victory
  finale:function(S,mon){ S._bmKeepMusic=false; ZSFX.stopMusic(); var b=mon.body, R=b&&b._rig, D=R&&R.D;
    ZSFX.play('roar',{big:D?D.h/120:1.3}); S.time.delayedCall(700,function(){ ZSFX.play('boom'); }); S.time.delayedCall(1500,function(){ ZSFX.play('victory'); });
    if(S.cameras){ S.cameras.main.shake(900,0.008); S.time.delayedCall(700,function(){ S.cameras.main.flash(600,255,240,220); }); }
    if(R)for(var i=0;i<3;i++)(function(i){ S.time.delayedCall(300+i*250,function(){ BossRig.ring(S,mon.x,mon.y-D.h*0.4,D.pal.g); }); })(i); },
  hitStop:function(S,s){ S._hitStop=Math.max(S._hitStop||0,s||0.06); }
};
// SFX (camp fanfare etc.) respects the mute button too
if(typeof SFX!=='undefined'){ var _sfxTone=SFX.tone; SFX.tone=function(){ if(ZSFX.muted)return; return _sfxTone.apply(this,arguments); }; }
