// ═══════════════════════════════════════════════════════════════════════
// ║ 09g-hero-skills.js — round 49 (Kris: "you should be able to use skills in the adventure sites, not just the overworld").
// ║ Z uses the equipped special skill in every scene you fight in. The overworld keeps its own version (10-scene-world _useSpecial); the
// ║ adventure sites and every other scene use this one, built on the shared hero helpers (09-hero-core) so it works wherever the hero is:
// ║ sprint, roll, petal step, blink, war stomp, whirlwind, smoke bomb, shield bash, berserker, second wind, time slow, meteor, phantom veil.
// ║ Same strengths and cooldowns as in the overworld.
// ═══════════════════════════════════════════════════════════════════════
var ZSKILL={ cdUntil:0, sprintUntil:0, berserkUntil:0,
  use:function(scene){ if(!scene)return; var key=scene.sys.settings.key;
    if(_isOverworld(scene)&&scene._useSpecial){ scene._useSpecial(); return; }
    if(key==='Sky'){ showNotif('Skills can’t be used while flying','#8899aa'); return; }
    if(key==='Building'){ showNotif('No skills indoors','#8899aa'); return; }
    var ws=_heroWS(), ps=ws&&ws.playerState; if(!ps)return; var id0=ps.equip&&ps.equip.special, item=id0&&ITEMS[id0];
    if(!item||!item.skillId){ showNotif('No special ability equipped! Open inventory → Special slot.','#ff8844'); return; }
    var now=Date.now(); if(now<ZSKILL.cdUntil){ showNotif('Special on cooldown: '+Math.ceil((ZSKILL.cdUntil-now)/1000)+'s remaining','#aaaaaa'); return; }
    var stats=ws.calcPlayerStats?ws.calcPlayerStats():{atk:ps.atk||3}, cdr=stats.cdReduce||0, id=item.skillId, c=_heroCtx(scene), ang=_heroDirAngle(c.dir), atk=stats.atk||ps.atk||3, T=typeof TILE!=='undefined'?TILE:32;
    if(id==='shield_bash'&&!(ps.equip&&ps.equip.shield)){ showNotif('Shield Bash requires a shield equipped!','#ff8844'); return; }
    ZSKILL.cdUntil=now+(item.cd||8)*1000*(1-cdr); ZSKILL.cdLen=(item.cd||8)*(1-cdr);
    var iframes=function(t){ scene.playerIFrames=Math.max(scene.playerIFrames||0,t); scene.iFrames=Math.max(scene.iFrames||0,t); scene._iFrames=Math.max(scene._iFrames||0,t); };
    var ring=function(x,y,r0,r1,col,fx,ms,o){ var g=scene.add.circle(x,y,r0,col,0.55).setDepth(15); if(typeof ZFX!=='undefined')ZFX.dress(g,fx,o); scene.tweens.add({targets:g,radius:r1,alpha:0,duration:ms||450,onComplete:function(){ g.destroy(); }}); return g; };
    var near=function(x,y,r){ return (c.monsters||[]).filter(function(m){ return m&&!m.dead&&(typeof _hbD==='function'?_hbD(m,x,y):Math.hypot(m.x-x,m.y-y))<r; }); };
    var hit=function(m,d,o){ return _heroHitMonster(scene,m,d,Object.assign({src:'skill',pure:true,col:'#ffdd88'},o||{})); };
    var dash=function(dist,steps,ms,each){ var sx=c.x, sy=c.y, tx=sx+Math.cos(ang)*dist, ty=sy+Math.sin(ang)*dist, k=0; scene.time.addEvent({delay:ms||16,repeat:steps-1,callback:function(){ k++; var t=k/steps, cur=_heroCtx(scene), nx=sx+(tx-sx)*t, ny=sy+(ty-sy)*t, x=cur.x, y=cur.y;
        if(_heroWalkAt(scene,nx,y))x=nx; if(_heroWalkAt(scene,x,ny))y=ny; _heroSetPos(scene,x,y); if(each)each(x,y,t); }}); };
    var say=function(t,col){ _heroFloat(scene,c.x,c.y-32,t,col); };
    if(id==='sprint'){ ZSKILL.sprintUntil=now+3000; say('🏃 SPRINT!','#88ffcc'); }
    else if(id==='roll'){ iframes(0.65); say('🔄 ROLL!','#88ccff'); dash(T*3,16,16); }
    else if(id==='petal_step'){ iframes(0.3); say('🌸 PETAL STEP','#ffe070'); var x0=c.x, y0=c.y; dash(T*2.5,10,16); scene.time.delayedCall(200,function(){ for(var q=0;q<3;q++){ var zx=x0+Math.cos(ang)*T*2.5*q/3, zy=y0+Math.sin(ang)*T*2.5*q/3; near(zx,zy,44).forEach(function(m){ _heroHold(scene,m,0.4); _heroSlow(scene,m,3,0.5); }); } }); }
    else if(id==='blink'){ var lx=c.x, ly=c.y, d=0; while(d<T*5){ var nx=lx+Math.cos(ang)*8, ny=ly+Math.sin(ang)*8; if(!_heroOpenAt(scene,nx,ny)||!_heroWalkAt(scene,nx,ny))break; lx=nx; ly=ny; d+=8; }
      ring(c.x,c.y,22,40,0xaaddff,'fx_arcane_aura',300); _heroSetPos(scene,lx,ly); ring(lx,ly,22,40,0xaaddff,'fx_arcane_aura',300); iframes(0.4); _heroFloat(scene,lx,ly-32,'✨ BLINK!','#aaddff'); }
    else if(id==='war_stomp'){ ring(c.x,c.y,8,96,0xff8800,'fx_shockwave',600); try{ scene.cameras.main.shake(160,0.009); }catch(e){} say('👊 WAR STOMP!','#ff8800'); var sd=Math.ceil(atk*0.8+5); near(c.x,c.y,96).forEach(function(m){ hit(m,sd,{el:ZEL.SKILL&&ZEL.SKILL.war_stomp}); _heroHold(scene,m,1.5); }); }
    else if(id==='whirlwind'){ ring(c.x,c.y,8,64,0x88ffee,'fx_whirlwind',520,{rot:9}); say('🌀 WHIRLWIND!','#88ffee'); var wd=Math.ceil(atk*1.2); near(c.x,c.y,64).forEach(function(m){ hit(m,wd,{el:ZEL.SKILL&&ZEL.SKILL.whirlwind});
        var ka=Math.atan2(m.y-c.y,m.x-c.x), mx=m.x+Math.cos(ka)*64, my=m.y+Math.sin(ka)*64, ok=scene._canGoMonster?scene._canGoMonster(mx,my):scene._canGoD?scene._canGoD(mx,my):true; if(ok&&!m.isBoss){ m.x=mx; m.y=my; if(m.cont)m.cont.setPosition(mx,my); } }); }
    else if(id==='smoke_bomb'){ var sm=scene.add.circle(c.x,c.y,4,0x888888,0.65).setDepth(11); if(typeof ZFX!=='undefined')ZFX.dress(sm,'fx_smoke'); scene.tweens.add({targets:sm,radius:72,alpha:0.45,duration:450}); scene.time.delayedCall(4000,function(){ scene.tweens.add({targets:sm,alpha:0,duration:600,onComplete:function(){ sm.destroy(); }}); });
      iframes(2.5); near(c.x,c.y,90).forEach(function(m){ if(!m.isBoss)_heroHold(scene,m,1.8); else _heroSlow(scene,m,2,0.5); }); say('💨 SMOKE BOMB!','#aaaaaa'); }
    else if(id==='shield_bash'){ iframes(0.45); dash(T*2.5,14,14); var sdef=(ITEMS[ps.equip.shield]||{}).def||0, bd=Math.ceil(atk+sdef*0.5), done=false; near(c.x,c.y,T*3.5).forEach(function(m){ if(done)return; done=true; hit(m,bd,{suffix:' BASH!',col:'#88ccff'}); _heroHold(scene,m,2); }); say('🛡️ SHIELD BASH!','#88ccff'); }
    else if(id==='berserker'){ ZSKILL.berserkUntil=now+5000; ring(c.x,c.y,8,48,0xff4400,'fx_berserk_aura',440); say('⚔️ BERSERKER!','#ff4422'); }
    else if(id==='second_wind'){ var h=Math.ceil(ps.maxHp*0.30); ps.hp=Math.min(ps.maxHp,ps.hp+h); ring(c.x,c.y,8,40,0x44ff88,'fx_heal_aura',440); say('+'+h+' HP 💚','#44ff88'); if(ws._emitUI)ws._emitUI(); }
    else if(id==='time_slow'){ ring(c.x,c.y,10,220,0x9fe8ff,'fx_time_ring',500); near(c.x,c.y,220).forEach(function(m){ _heroSlow(scene,m,4,0.35); }); say('⏳ TIME SLOW!','#9fe8ff'); }
    else if(id==='meteor'){ var ax=c.x+Math.cos(ang)*T*4, ay=c.y+Math.sin(ang)*T*4, tg=null, bd2=T*9; (c.monsters||[]).forEach(function(m){ if(!m||m.dead)return; var d2=Math.hypot(m.x-ax,m.y-ay); if(d2<bd2){ bd2=d2; tg=m; } });
      var mx0=tg?tg.x:ax, my0=tg?tg.y:ay, mR=64, mD=Math.ceil(atk*2.4+12), mark=scene.add.circle(mx0,my0,mR,0xff6020,0.12).setStrokeStyle(2,0xff8040,0.8).setDepth(6); if(typeof ZFX!=='undefined')ZFX.dress(mark,'fx_meteor_mark',{a:0.85});
      var rock=scene.add.circle(mx0-160,my0-260,12,0xffa040,1).setStrokeStyle(3,0xff4010,0.9).setDepth(20); say('☄️ METEOR!','#ff9040');
      scene.tweens.add({targets:rock,x:mx0,y:my0,duration:600,ease:'Quad.easeIn',onComplete:function(){ rock.destroy(); mark.destroy(); try{ scene.cameras.main.shake(220,0.012); }catch(e){} ring(mx0,my0,10,mR+10,0xffc060,'fx_impact_meteor',450);
        (_heroCtx(scene).monsters||[]).forEach(function(m){ if(!m||m.dead)return; if(typeof _hbHit==='function'?_hbHit(m,mx0,my0,mR):Math.hypot(m.x-mx0,m.y-my0)<mR){ hit(m,mD,{el:ZEL.SKILL&&ZEL.SKILL.meteor,col:'#ff9040'}); if(typeof _heroBurn==='function')_heroBurn(m,3,Math.max(1,mD*0.08)); } }); }}); }
    else if(id==='phantom_veil'){ iframes(3); ring(c.x,c.y,8,36,0xccaaff,'fx_arcane_aura',400); say('👻 PHANTOM VEIL!','#ccaaff'); }
    else { showNotif(item.name+' can only be used in the overworld','#8899aa'); ZSKILL.cdUntil=0; return; }
    if(typeof ZSPR!=='undefined'&&scene.pCont&&scene._heroCast)try{ scene._heroCast(); }catch(e){} },
  left:function(){ return Math.max(0,(ZSKILL.cdUntil-Date.now())/1000); } };
// sprint and berserker: faster feet (the shared movement modifier), berserker's harder melee hits
(function(){ if(typeof MX!=='undefined'&&MX.moveMods){ var mm=MX.moveMods; MX.moveMods=function(scene){ var r=mm.call(MX,scene), now=Date.now(); if(scene&&!_isOverworld(scene)&&r&&r.mult>0){ if(now<ZSKILL.sprintUntil)r={mult:r.mult*1.6,rev:r.rev}; else if(now<ZSKILL.berserkUntil)r={mult:r.mult*1.3,rev:r.rev}; } return r; }; }
  if(typeof ZHit!=='undefined'&&ZHit.dmg){ var d0=ZHit.dmg; ZHit.dmg=function(scene,mon,raw,kind,o){ if(kind==='melee'&&Date.now()<ZSKILL.berserkUntil&&scene&&!_isOverworld(scene))raw=Math.round(raw*1.5); return d0.call(ZHit,scene,mon,raw,kind,o); }; } })();
