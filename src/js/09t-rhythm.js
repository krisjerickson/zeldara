// ═══════════════════════════════════════════════════════════════════════
// ║ 09t-rhythm.js — round 103: COMBAT RHYTHM (Kris: "i like the idea of sword and axe swings having combos when doing the timing right, with
// ║ more damage happening if timing the combo. propose some additional mechanic like this, including a place to teach this"; Lab › Mechanics
// ║ guide: seven ✓, the charged swing ✕; taught by "each teacher teaches their own").
// ║  · Sword combo: after a sword hit a rune-ring shines on the hero for a beat (it opens as the swing recovers, 0.28 s long). Space in it
// ║    chains: the 2nd swing ×1.2, the 3rd a wide finisher ×1.6 that knocks back. Pressing early, or missing the beat, starts again.
// ║  · Axe rhythm: slower, two beats (the ring opens as the axe recovers, 0.36 s). The 2nd on the beat is a full-circle cleave ×1.8.
// ║  · Perfect block: raise the shield (Shift) within 0.2 s of a blow landing — no damage, the striker staggers 1 s, the next swing is a
// ║    sure critical ×2.
// ║  · Roll-counter: swing within 0.4 s after a roll ends — ×1.5 and a 0.5 s stun.
// ║  · Rune-weave: cast within 1 s of a sword finisher — the spell is +25 % and goes where the finisher went (no aiming).
// ║  · Together!: your familiar strikes the foe you struck (or you strike its foe) within 0.5 s — both hits +20 %, a shared spark.
// ║  · Follow-up shot: a full-draw arrow at a frozen, rooted, stunned or staggered foe — ×1.5 on top of the draw.
// ║ Each works once its teacher has shown you (21t lessons r_*: the armoury keeper — sword, block, follow-up; the blacksmith — the axe;
// ║ Pia — the counter; the first mage-tower master — the weave; your first fairy — together). ZRHY.on: the switch; ZRHY.all: every one
// ║ known (the tests).
// ═══════════════════════════════════════════════════════════════════════
var ZRHY={ on:true, all:false,
  SW:{sword:[0,0.28],axe:[0,0.36]},      // the beat: from when the swing recovers, how long it shines
  now:function(){ return Date.now()/1000; },
  ps:function(){ var ws=typeof _heroWS==='function'&&_heroWS(); return ws&&ws.playerState; },
  has:function(k){ if(!ZRHY.on)return false; if(ZRHY.all)return true; var ps=ZRHY.ps(); return !!(ps&&ps.lessons&&ps.lessons['r_'+k]); },
  axe:function(){ var ps=ZRHY.ps(), w=ps&&typeof ZHit!=='undefined'&&ZHit._eq?ZHit._eq(ps,'lHand'):null; return !!(w&&w.cls==='axe'); },
  held:function(m){ if(!m||m.dead)return false; if(m._m&&m._m.stunT>0)return true; if(m._stun>0)return true; var S=m._zst; if(S)for(var k in S){ if((k==='freeze'||k==='root'||k==='earth'||k==='shock'||k==='shock2'||k==='star')&&S[k].t>0)return true; } return (m._rhyStag||0)>ZRHY.now(); },
  // state: the last melee hit, the chain, the swing in progress
  S:{hitT:-9,step:0,cd:0.45,kind:'sword',early:false,cur:null,finT:-9,finMon:null,weaveT:-9,crit:false,rollT:-9,meleeMon:null,meleeT:-9,famMon:null,famT:-9,blockT0:-9},
  win:function(){ var S=ZRHY.S, w=ZRHY.SW[S.kind], a=S.hitT+S.cd+w[0]; return [a,a+w[1]]; },
  // a swing starts (ZHit.swing): is it on the beat?
  swing:function(r){ var S=ZRHY.S, t=ZRHY.now(), kind=ZRHY.axe()?'axe':'sword', W=ZRHY.win(), on=!S.early&&S.kind===kind&&S.step<(kind==='axe'?1:2)&&t>=W[0]-0.03&&t<=W[1]&&ZRHY.has(kind);
    S.step=on?S.step+1:0; S.kind=kind; S.cd=r.t; S.early=false;
    var m=1, tag='', fin=false, cleave=false;
    if(S.step===1&&kind==='sword'){ m=1.2; tag='combo ×1.2'; }
    else if(S.step===2&&kind==='sword'){ m=1.6; tag='finisher!'; fin=true; }
    else if(S.step===1&&kind==='axe'){ m=1.8; tag='cleave!'; cleave=true; }
    if(t-S.rollT<=0.25+0.4&&ZRHY.has('counter')){ m*=1.5; tag=(tag?tag+' · ':'')+'counter!'; S.rollT=-9; S.counter=true; } else S.counter=false;
    if(S.crit){ m*=2; tag=(tag?tag+' · ':'')+'critical!'; S.crit=false; }
    S.cur={t:t,m:m,tag:tag,fin:fin,cleave:cleave,wide:fin,said:false,hit:false};
    if(fin||cleave)S.step=kind==='axe'?0:S.step;      // after the finisher / cleave the chain starts again (S.step is reset on the next swing)
    return r; },
  // a melee hit lands inside the swing
  melee:function(scene,mon,raw){ var S=ZRHY.S, C=S.cur, t=ZRHY.now(), d=raw;
    if(C&&t-C.t<=0.25){ d=raw*C.m;
      if(!C.hit){ C.hit=true; S.hitT=C.t; if(C.fin){ S.finT=t; S.finMon=mon; S.step=2; } }
      if(C.tag&&!C.said){ C.said=true; ZRHY.say(scene,mon,C.tag,C.fin||C.cleave?'#ffe066':'#cfe8ff'); }
      if(C.fin)ZRHY.knock(scene,mon,34);
      if(S.counter&&typeof _heroHold==='function')try{ _heroHold(scene,mon,0.5); }catch(e){} }
    // together: your familiar struck this foe a moment ago
    if(ZRHY.has('together')&&S.famMon===mon&&t-S.famT<=0.5){ d*=1.2; ZRHY.spark(scene,mon); S.famMon=null; }
    S.meleeMon=mon; S.meleeT=t; return d; },
  familiar:function(scene,mon,raw){ var S=ZRHY.S, t=ZRHY.now(), d=raw;
    if(ZRHY.has('together')&&S.meleeMon===mon&&t-S.meleeT<=0.5){ d*=1.2; ZRHY.spark(scene,mon); S.meleeMon=null; }
    S.famMon=mon; S.famT=t; return d; },
  spell:function(scene,mon,raw){ var S=ZRHY.S; return ZRHY.now()-S.weaveT<=3?raw*1.25:raw; },
  say:function(scene,mon,t,c){ try{ if(typeof ZSTAT!=='undefined'&&ZSTAT.say)ZSTAT.say(scene,mon,t,c); }catch(e){} },
  spark:function(scene,mon){ ZRHY.say(scene,mon,'together! +20 %','#9ff8d0'); try{ var g=scene.add.circle(mon.x,mon.y-10,6,0x9ff8d0,0.8).setDepth(40); scene.tweens.add({targets:g,radius:26,alpha:0,duration:320,onComplete:function(){ g.destroy(); }}); }catch(e){} },
  knock:function(scene,mon,d){ if(!mon||mon.dead||mon.isBoss||(mon.def&&mon.def.boss))return; var c=_heroCtx(scene), a=Math.atan2(mon.y-c.y,mon.x-c.x), nx=mon.x+Math.cos(a)*d, ny=mon.y+Math.sin(a)*d;
    var ok=typeof _heroMonsterCanStand==='function'?_heroMonsterCanStand(scene,nx,ny):true; if(!ok)return; mon.x=nx; mon.y=ny; if(mon.cont&&mon.cont.setPosition)mon.cont.setPosition(nx,ny); },
  // the rune-ring on the hero while the beat is open (and faint just before)
  tick:function(sc){ var S=ZRHY.S, t=ZRHY.now(), c=_heroCtx(sc); if(!c)return; var g=sc._rhyG;
    if(!g||!g.scene){ g=sc._rhyG=sc.add.graphics().setDepth(17); }
    g.clear(); if(!S.cur||!S.cur.hit||!ZRHY.has(S.kind)||S.early)return; var W=ZRHY.win(), lim=S.kind==='axe'?1:2; if(S.step>=lim)return;
    if(t>=W[0]-0.12&&t<W[0]){ g.lineStyle(1.5,0x9ff8f0,0.35); g.strokeCircle(c.x,c.y+4,20); }
    else if(t>=W[0]&&t<=W[1]){ var u=(t-W[0])/(W[1]-W[0]); g.lineStyle(3,S.kind==='axe'?0xffd27a:0x9ff8f0,0.95-u*0.4); g.strokeCircle(c.x,c.y+4,18+u*6); g.fillStyle(0x9ff8f0,0.12); g.fillCircle(c.x,c.y+4,18+u*6); } },
  // Space pressed while the swing is still recovering: the chain breaks
  key:function(){ var S=ZRHY.S, t=ZRHY.now(); if(S.cur&&S.cur.hit&&t<S.hitT+S.cd-0.03&&t>S.hitT+0.05)S.early=true; },
  // a blow lands on the hero while the shield went up a moment ago
  parry:function(scene,raw){ var S=ZRHY.S; if(!ZRHY.has('parry')||!scene._shielding||ZRHY.now()-S.blockT0>0.2||!(raw>0))return null;
    var m=S.striker&&!S.striker.dead&&ZRHY.now()-S.strikerT<0.3?S.striker:null; if(!m){ var c=_heroCtx(scene); m=c.monsters.filter(function(o){ return o&&!o.dead; }).sort(function(a,b){ return Math.hypot(a.x-c.x,a.y-c.y)-Math.hypot(b.x-c.x,b.y-c.y); })[0]; if(m&&Math.hypot(m.x-c.x,m.y-c.y)>110)m=null; }
    S.crit=true; S.blockT0=-9; var c2=_heroCtx(scene); if(scene._floatText)scene._floatText(c2.x,c2.y-44,'⚔ PERFECT BLOCK!','#9ff8f0');
    if(m){ m._rhyStag=ZRHY.now()+1; if(typeof _heroHold==='function')try{ _heroHold(scene,m,1); }catch(e){} }
    try{ if(typeof _heroShieldFlash==='function')_heroShieldFlash(scene,c2.x,c2.y,true); }catch(e){}
    return 0; } };
(function(){ if(typeof window==='undefined')return;
  setTimeout(function(){      // after every file has run (ZDRAW, ZAIM, ZROLL, the scenes' helpers)
    if(typeof ZHit!=='undefined'){
      var sw0=ZHit.swing; ZHit.swing=function(){ var r=sw0.apply(ZHit,arguments); try{ ZRHY.swing(r); }catch(e){} return r; };
      var d0=ZHit.dmg; ZHit.dmg=function(scene,mon,raw,kind,o){ try{ if(ZRHY.on&&mon&&!mon.dead){ if(kind==='melee')raw=ZRHY.melee(scene,mon,raw); else if(kind==='familiar')raw=ZRHY.familiar(scene,mon,raw); else if(kind==='spell')raw=ZRHY.spell(scene,mon,raw); } }catch(e){} return d0.call(ZHit,scene,mon,raw,kind,o); }; }
    // the wide finisher and the cleave reach round the hero
    if(typeof _heroInArc==='function'){ var ia0=_heroInArc; _heroInArc=function(dir,dx,dy){ var C=ZRHY.S.cur; if(C&&ZRHY.now()-C.t<0.25){ if(C.cleave)return true; if(C.wide){ var a={right:0,down:Math.PI/2,left:Math.PI,up:-Math.PI/2}[dir]; if(a!==undefined){ var df=Math.abs(Math.atan2(dy,dx)-a); if(df>Math.PI)df=2*Math.PI-df; return df<=Math.PI*0.55; } } } return ia0(dir,dx,dy); }; }
    // perfect block: the striker is known to the monster engine
    if(typeof MX!=='undefined'&&MX.striker){ var st0=MX.striker; MX.striker=function(){ var s=st0.apply(MX,arguments); if(s){ ZRHY.S.striker=s; ZRHY.S.strikerT=ZRHY.now(); } return s; }; }
    if(typeof _heroApplyShield==='function'){ var as0=_heroApplyShield; _heroApplyShield=function(scene,ps,raw,x,y){ var p=ZRHY.parry(scene,raw); return p===null?as0.apply(this,arguments):p; }; }
    // the roll
    if(typeof ZROLL!=='undefined'&&ZROLL.go){ var rg0=ZROLL.go; ZROLL.go=function(sc){ var cd=ZROLL._cdUntil||0; var r=rg0.apply(ZROLL,arguments); if((ZROLL._cdUntil||0)!==cd)ZRHY.S.rollT=ZRHY.now(); return r; }; }
    // rune-weave: X within 1 s of a finisher casts at once, where the finisher went, +25 %
    if(typeof ZAIM!=='undefined'){ var pr0=ZAIM.press; ZAIM.press=function(sc,e){ var S=ZRHY.S, m=S.finMon; if(ZRHY.has('weave')&&ZRHY.now()-S.finT<=1&&!(e&&e.repeat)&&ZAIM.ok&&ZAIM.ok(sc)){ S.finT=-9; S.weaveT=ZRHY.now(); var c=_heroCtx(sc);
          if(m&&!m.dead){ if(ZAIM.cur)ZAIM.clear('weave'); ZAIM.cur={sc:sc,x:m.x,y:m.y,mon:m,r:22,col:0x9ff8f0,g:sc.add.graphics(),im:null,t:1,spin:0}; ZRHY.say(sc,{x:c.x,y:c.y,def:{r:10}},'rune-weave +25 %','#c9a0ff'); ZAIM.fire(sc); return; } }
        return pr0.apply(ZAIM,arguments); }; }
    // follow-up shot
    if(typeof ZDRAW!=='undefined'){ var sh0=ZDRAW.shoot; ZDRAW.shoot=function(sc,mult,mon){ if(mult>=2&&mon&&ZRHY.has('follow')&&ZRHY.held(mon)){ mult*=1.5; ZRHY.say(sc,mon,'follow-up shot ×1.5','#ffe066'); } ZRHY.lastShot=mult; return sh0.call(ZDRAW,sc,mult,mon); }; }
    // the ring, the shield's moment, every frame
    if(typeof _heroStatusTick==='function'){ var tk0=_heroStatusTick; _heroStatusTick=function(sc,dt){ tk0(sc,dt); try{ if(sc._shielding&&!sc._rhyShWas)ZRHY.S.blockT0=ZRHY.now(); sc._rhyShWas=!!sc._shielding;
        if(sc._applyShieldToDmg&&!sc._rhyWrapped){ sc._rhyWrapped=true; var w0=sc._applyShieldToDmg; sc._applyShieldToDmg=function(dmg){ var p=ZRHY.parry(sc,dmg); return p===null?w0.apply(sc,arguments):p; }; }
        ZRHY.tick(sc); }catch(e){} }; }
    window.addEventListener('keydown',function(e){ if(e.key===' '&&!e.repeat)ZRHY.key(); },true);
  },0);
})();
