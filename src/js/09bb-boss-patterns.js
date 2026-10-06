// ═══════════════════════════════════════════════════════════════════════
// ║ BOSS PATTERNS (round 8) — runs the signature attacks in 07zz-boss-attacks.js.
// ║ A "director" per boss: every few seconds (faster by quadrant) it picks the
// ║ next pattern for the boss's form, telegraphs it, then runs it over the
// ║ visible screen. Everything is driven from DungeonScene.update (dt), so it
// ║ freezes with the game when a menu is open.
// ║ Also: stagger (enough hits → the boss reels and takes +50% damage), a
// ║ punish window after each big move, and the last stand at 15% health.
// ║ The boss holds still while it performs (mon._hold, read by the dungeon
// ║ monster loop); in the Highlands and Ashlands it keeps fighting during
// ║ screen-wide patterns.
// ═══════════════════════════════════════════════════════════════════════
var BossPat={
  D_TELE:26, D_FX:30, D_DARK:40,   // above the dungeon's fog of war (25): telegraphs must always be readable
  // ── helpers ──
  rig:function(m){ var b=m.spr||m.body; return b&&b._rig||null; },
  slotOf:function(m){ var R=BossPat.rig(m); return R&&R.D&&R.D.slot||null; },
  q:function(S){ return Math.max(1,Math.min(4,S.siteSection||1)); },
  // the screen around the hero (the camera follows the hero, so this is what you see)
  field:function(S){ var v=S.cameras.main.worldView, z=S.cameras.main.zoom||1, w=Math.max(320,v.width||S.scale.width/z), h=Math.max(240,v.height||S.scale.height/z);
    if(v.width&&S.px>v.x+40&&S.px<v.x+v.width-40&&S.py>v.y+40&&S.py<v.y+v.height-40)return {x:v.x+16,y:v.y+16,w:v.width-32,h:v.height-110};   // the visible screen (minus the hotbar)
    return {x:S.px-w/2+16,y:S.py-h/2+16,w:w-32,h:h-32}; },
  P:function(S){ return {x:S.px,y:S.py}; },
  hurt:function(S,ctx,mult,label){ var A=MX.A(S); return A.hurt(ctx.dmg*(mult||1),label||'',ctx.col); },
  col:function(c){ return MX.col(c); },
  // round 9: a boss always stands where the hero can reach it — on a tile reachable from the
  // entrance, with a little floor around it (never half inside a wall)
  stand:function(S,x,y){ if(!S._canGoD||!S._canGoD(x,y))return false; var R=S._labReach; if(R&&typeof DW!=='undefined'){ var tx=Math.floor(x/TILE), ty=Math.floor(y/TILE); if(!R[ty*DW+tx])return false; }
    var c=16; return S._canGoD(x+c,y)&&S._canGoD(x-c,y)&&S._canGoD(x,y+c)&&S._canGoD(x,y-c*0.6); },
  reach:function(S){ S.monsters.forEach(function(m){ if(!m.isBoss||m.dead)return; if(BossPat.stand(S,m.x,m.y)){ m._okX=m.x; m._okY=m.y; return; }
      if(m._okX===undefined){ for(var r=8;r<=160;r+=8)for(var a=0;a<6.28;a+=0.5){ var x=m.x+Math.cos(a)*r, y=m.y+Math.sin(a)*r; if(BossPat.stand(S,x,y)){ m._okX=x; m._okY=y; r=999; break; } } }
      if(m._okX!==undefined){ m.x=m._okX; m.y=m._okY; if(m.cont)m.cont.setPosition(m.x,m.y); } }); },
  setPos:function(S,m,x,y){ if(!BossPat.stand(S,x,y)){ var ok=false; for(var r=8;r<=96&&!ok;r+=8)for(var a=0;a<6.28&&!ok;a+=0.8){ if(BossPat.stand(S,x+Math.cos(a)*r,y+Math.sin(a)*r)){ x+=Math.cos(a)*r; y+=Math.sin(a)*r; ok=true; } } if(!ok)return false; }
    m.x=x; m.y=y; if(m.cont)m.cont.setPosition(x,y); return true; },
  frame:function(m,f){ var R=BossPat.rig(m); if(R)R.ff=f; },
  say:function(S,x,y,t,c){ if(S._floatText)S._floatText(x,y,t,c||'#ffe0a0'); },
  gfx:function(S,d){ return S.add.graphics().setDepth(d===undefined?BossPat.D_TELE:d); },
  // ── director ──
  tick:function(S,dt){ if(!S.monsters||S._phaseLock)return; var q=BossPat.q(S), RP=ZDiff.ramp(q); BossPat.reach(S);
    if(!S._bpAct||S._bpAct._s!==S._bpRun){ S._bpRun=(S._bpRun||0)+1; S._bpAct=[]; S._bpAct._s=S._bpRun; S.events.once('shutdown',function(){ S._bpAct=null; }); }
    for(var i=S._bpAct.length-1;i>=0;i--){ var a=S._bpAct[i]; var done=false; try{ done=a.upd(dt); }catch(e){ done=true; } if(done||(a.boss&&a.boss.dead&&!a.keep)){ try{ a.kill(); }catch(e2){} S._bpAct.splice(i,1); } }
    if(S._introT>0)return;
    S.monsters.forEach(function(m){ if(!m.isBoss||m.dead||m.bossAlly||m.eliteKin)return; var d=Math.hypot(m.x-S.px,m.y-S.py); if(!m._bp){ if(d>420)return; BossPat.init(S,m); if(!m._bp)return; }
      var B=m._bp; BossPat.stagger(S,m,B,RP,dt); if(B.stagT>0)return;
      // last stand
      var hp=m.hp/(m.maxHp||1); if(B.desp&&!B.despDone&&hp<=ZDiff.cur().stand&&hp>0&&!B.busy){ B.despDone=true; BossPat.lastStand(S,m,B); return; }
      if(B.busy)return; B.t-=dt; if(B.t>0||d>520)return;
      var name=BossPat.next(B); BossPat.run(S,m,name,B);
      B.t=Math.max(1.4,RP.every*(0.85+Math.random()*0.3)*(B.enraged?0.75:1)-(B.phase-1)*0.25); });
  },
  init:function(S,m){ var sl=BossPat.slotOf(m), I=sl&&BossAtk.forSlot(sl); if(!I)return; var q=BossPat.q(S);
    var last=I.fam?(BOSS_PHASES[I.fam]?(S._bossPhase||1)>=BossPhases.count(I.fam):true):true;
    m._bp={list:I.list.slice(),col:I.col,desp:last?I.desp:null,phase:I.phase,fam:I.fam,i:Math.floor(Math.random()*I.list.length),t:2.4,hits:0,lastHp:m.hp,quiet:0,stagT:0,busy:0,elite:/^elite_/.test(sl||'')};
    if(m._bp.elite)m._bp.t=4; },
  next:function(B){ B.i=(B.i+1)%B.list.length; return B.list[B.i]; },
  // stagger: count hits (HP drops); enough → the boss reels, +50% damage taken
  stagger:function(S,m,B,RP,dt){ var hp=m.hp; if(hp<B.lastHp-0.01){ var drop=B.lastHp-hp; if(B.stagT>0){ var extra=Math.min(drop*0.5,Math.max(0,hp-1)); if(extra>0){ if(m.mx)m._hp-=extra; else m.hp-=extra; hp=m.hp; } } else { B.hits++; B.quiet=0; } }
    B.lastHp=hp; B.quiet+=dt; if(B.quiet>4&&B.hits>0){ B.hits=Math.max(0,B.hits-1); B.quiet=3.2; }
    var need=Math.round(RP.stag*(B.elite?0.8:1)+(B.phase-1)*1.5);
    if(B.stagT>0){ B.stagT-=dt; m._hold=Math.max(m._hold||0,0.05); BossPat.frame(m,'0'); if(B.stagG){ B.stagG.setPosition(m.x,m.y-(BossPat.rig(m)?BossPat.rig(m).D.h*0.9:60)); B.stagG.rotation+=dt*3; } if(B.stagT<=0){ if(B.stagG){ B.stagG.destroy(); B.stagG=null; } BossPat.frame(m,null); var R=BossPat.rig(m); if(R&&R.body)R.body.clearTint(); } return; }
    if(B.hits>=need&&!B.busy){ B.hits=0; B.stagT=2.4; m._hold=2.4; BossPat.say(S,m.x,m.y-80,'✦ STAGGERED! ✦','#fff0a0'); if(typeof ZSFX!=='undefined')ZSFX.play('boom');
      S.cameras.main.shake(180,0.006); var R=BossPat.rig(m); if(R&&R.body)R.body.setTint(0xb0b0c0);
      var g=S.add.graphics().setDepth(BossPat.D_FX); for(var i=0;i<5;i++){ var a=i/5*Math.PI*2; g.fillStyle(0xfff0a0,0.95); g.fillCircle(Math.cos(a)*22,Math.sin(a)*7,3.5); } B.stagG=g;
      // a stagger interrupts the boss's own moves (not area hazards already on the field)
      (S._bpAct||[]).forEach(function(a){ if(a.boss===m&&a.attached)a.cut=true; }); B.busy=0; } },
  run:function(S,m,name,B,o){ var a=name.split(':'), F=BossPat.PAT[a[0]]; if(!F)return; var q=BossPat.q(S), RP=ZDiff.ramp(q);
    var ctx=Object.assign({S:S,m:m,B:B,q:q,R:RP,theme:a[1]||'',col:B.col,dmg:(m.def.atk||10)*RP.dmg,tele:RP.tele*(B.enraged?0.85:1)},o||{});
    var act=F(ctx); if(!act)return; act.boss=m; act.attached=!!act.attached; B.busy++; var up=act.upd, done=false;
    act.upd=function(dt){ if(act.cut)return true; return up.call(act,dt); };
    var kill=act.kill; act.kill=function(){ if(done)return; done=true; B.busy=Math.max(0,B.busy-1); BossPat.frame(m,null); if(kill)kill();
      if(act.attached&&!m.dead&&!act.cut){ m._hold=Math.max(m._hold||0,RP.punish); } };
    if(act.attached||RP.hold)m._hold=Math.max(m._hold||0,act.dur||2);
    S._bpAct.push(act); return act; },
  lastStand:function(S,m,B){ var nm=(m.def.name||'').split(',')[0].replace(/ \(Rematch\)$/,''); showNotif('⚠ '+nm+'\'s last stand!','#ff9060');
    S.cameras.main.flash(300,255,90,60); S.cameras.main.shake(600,0.012); if(typeof ZSFX!=='undefined')ZSFX.play('roar',{big:1.6}); B.enraged=true; m._hold=0.8;
    B.desp.forEach(function(p,i){ BossPat.run(S,m,p,B,{tele:ZDiff.ramp(BossPat.q(S)).tele+0.3+i*0.25}); }); B.t=3; },

  // ═══════════ the patterns: each returns {upd(dt)→done, kill(), dur, attached} ═══════════
  PAT:{
    // ☄ strikes fall down columns of the screen
    rain:function(c){ var S=c.S, F=BossPat.field(S), n=Math.max(7,Math.round(F.w/58)), cw=F.w/n, waves=c.R.waves+(c.B.enraged?1:0), g=BossPat.gfx(S), fx=BossPat.gfx(S,BossPat.D_FX), t=0, w=0, cols=null, hit=false, drops=[];
      var pick=function(){ var safe={}, ng=c.R.gaps, p=Math.floor(S.px-F.x)/cw|0; var start=Math.floor(Math.random()*n); for(var k=0;k<ng;k++)safe[(start+k*Math.max(2,Math.floor(n/ng)))%n]=1; if(w>0&&cols)Object.keys(cols).forEach(function(k){ if(!cols[k])safe[k]=0; }); var L={}; for(var i=0;i<n;i++)L[i]=safe[i]?0:1;
        var free=0; for(var j=0;j<n;j++)if(!L[j])free++; if(!free)L[(start+1)%n]=0; return L; };
      var colOf={rock:'#9a8a78',coins:'#e8c040',lightning:'#fff8c0',fire:'#ff8030',blades:'#c8c8e0',light:'#fff0b0',bubbles:'#a0ff60',frost:'#c0f0ff'}[c.theme]||c.col;
      var tele=c.tele;
      return {dur:tele*waves+1, upd:function(dt){ t+=dt; if(!cols){ cols=pick(); t=0; hit=false; }
          this.cols=cols; this.F=F; this.cw=cw; g.clear(); var k=Math.min(1,t/tele); for(var i=0;i<n;i++){ if(!cols[i])continue; g.fillStyle(BossPat.col(colOf),0.12+0.24*k); g.fillRect(F.x+i*cw+2,F.y,cw-4,F.h); g.fillStyle(0xffffff,0.25+0.4*k); g.fillRect(F.x+i*cw+2,F.y,cw-4,3); g.lineStyle(2,BossPat.col(colOf),0.4+0.45*k); g.strokeRect(F.x+i*cw+2,F.y,cw-4,F.h); }
          if(t>=tele&&!hit){ hit=true; g.clear(); fx.clear(); BossPat.frame(c.m,'3');
            for(var i2=0;i2<n;i2++){ if(!cols[i2])continue; for(var d=0;d<2;d++){ var dx=F.x+i2*cw+cw*(0.3+Math.random()*0.4), dy=F.y+F.h*(0.15+Math.random()*0.75); drops.push({x:dx,y:dy,t:0}); } }
            var pc=Math.floor((S.px-F.x)/cw); if(S.px>=F.x&&S.px<=F.x+F.w&&cols[pc])BossPat.hurt(S,c,1,c.theme==='lightning'?'⚡':'');
            S.cameras.main.shake(140,0.004); if(typeof ZSFX!=='undefined')ZSFX.play(c.theme==='lightning'?'hit':'stomp',{big:0.8}); }
          if(hit){ fx.clear(); var all=true; drops.forEach(function(p){ p.t+=dt; var a=Math.max(0,1-p.t/0.5); if(a>0)all=false; fx.fillStyle(BossPat.col(colOf),a); if(c.theme==='lightning'||c.theme==='light'){ fx.lineStyle(3,BossPat.col(colOf),a); fx.beginPath(); fx.moveTo(p.x,F.y); fx.lineTo(p.x+6,p.y-F.h*0.4); fx.lineTo(p.x-5,p.y-F.h*0.2); fx.lineTo(p.x,p.y); fx.strokePath(); } else if(c.theme==='blades'){ fx.fillRect(p.x-2,p.y-18,4,22); } else fx.fillCircle(p.x,p.y,7*(1+p.t)); fx.lineStyle(2,BossPat.col(colOf),a*0.8); fx.strokeCircle(p.x,p.y,10+p.t*40); });
            if(all||t>tele+0.55){ w++; if(w>=waves)return true; drops=[]; cols=pick(); t=0; hit=false; } }
          return false; }, kill:function(){ g.destroy(); fx.destroy(); }}; },
    // ⇶ a wall sweeps across the screen with gaps
    wall:function(c){ var S=c.S, F=BossPat.field(S), horiz=Math.random()<0.6, dir=Math.random()<0.5?1:-1, L=horiz?F.h:F.w, span=horiz?F.w:F.h, ng=c.q<=2?2:1, gw=c.q<=2?92:78, gaps=[], t=0, g=BossPat.gfx(S,BossPat.D_FX), hit=false, waves=c.q>=3?2:1, w=0;
      var mk=function(){ gaps=[]; for(var i=0;i<ng;i++){ var p; for(var k=0;k<20;k++){ p=40+Math.random()*(L-80-gw); if(!gaps.some(function(q){ return Math.abs(q-p)<gw*1.6; }))break; } gaps.push(p); } t=0; hit=false; };
      mk(); var colW={thunder:'#fff8c0',gears:'#c8a040',lava:'#ff7020',fire:'#ff8030',void:'#8060ff',light:'#fff0b0',frost:'#c0f0ff',wave:'#60c0ff'}[c.theme]||c.col, spd=span/(2.3/c.R.speed), tele=c.tele;
      return {dur:(tele+2.4)*waves, upd:function(dt){ t+=dt; g.clear(); var C=BossPat.col(colW);
          var pos0=dir>0?(horiz?F.x:F.y):(horiz?F.x+F.w:F.y+F.h), along=function(v){ return (horiz?F.y:F.x)+v; };
          if(t<tele){ var k=t/tele; g.lineStyle(3,C,0.35+0.5*k); if(horiz)g.lineBetween(pos0,F.y,pos0,F.y+F.h); else g.lineBetween(F.x,pos0,F.x+F.w,pos0);
            gaps.forEach(function(p){ g.lineStyle(3,0xffffff,0.8); if(horiz){ g.lineBetween(pos0-8,along(p),pos0+8,along(p)); g.lineBetween(pos0-8,along(p+gw),pos0+8,along(p+gw)); } else { g.lineBetween(along(p),pos0-8,along(p),pos0+8); g.lineBetween(along(p+gw),pos0-8,along(p+gw),pos0+8); } });
            g.fillStyle(C,0.12*k); var arrow=dir*30; if(horiz)g.fillTriangle(pos0+arrow,F.y+F.h/2,pos0,F.y+F.h/2-16,pos0,F.y+F.h/2+16); else g.fillTriangle(F.x+F.w/2,pos0+arrow,F.x+F.w/2-16,pos0,F.x+F.w/2+16,pos0); return false; }
          BossPat.frame(c.m,'3'); var pos=pos0+dir*(t-tele)*spd, segs=[], s0=0; gaps.slice().sort(function(a,b){ return a-b; }).forEach(function(p){ segs.push([s0,p]); s0=p+gw; }); segs.push([s0,L]);
          segs.forEach(function(sg){ if(sg[1]<=sg[0])return; g.fillStyle(C,0.85); if(horiz)g.fillRect(pos-9,along(sg[0]),18,sg[1]-sg[0]); else g.fillRect(along(sg[0]),pos-9,sg[1]-sg[0],18); g.fillStyle(0xffffff,0.6); if(horiz)g.fillRect(pos-2,along(sg[0]),4,sg[1]-sg[0]); else g.fillRect(along(sg[0]),pos-2,sg[1]-sg[0],4); });
          var me=horiz?S.px:S.py, ac=horiz?S.py-F.y:S.px-F.x, pv=this._pv===undefined?pos:this._pv; this._pv=pos; if(!hit&&(Math.abs(me-pos)<14||(me-pv)*(me-pos)<0)){ var inGap=gaps.some(function(p){ return ac>p+6&&ac<p+gw-6; }); if(!inGap){ hit=true; BossPat.hurt(S,c,1.1); } }
          if((t-tele)*spd>span+20){ w++; if(w>=waves)return true; dir=-dir; mk(); this._pv=undefined; } return false; }, kill:function(){ g.destroy(); }}; },
    // ✺ beams fan out from the boss (spin: they rotate)
    burst:function(c){ return BossPat.PAT._beams(c,false); },
    spin:function(c){ return BossPat.PAT._beams(c,true); },
    _beams:function(c,spin){ var S=c.S, m=c.m, F=BossPat.field(S), n=spin?(c.q>=3?5:4):(c.q===1?6:c.q===2?7:c.q===3?8:10), a0=Math.random()*Math.PI*2, L=Math.hypot(F.w,F.h), t=0, g=BossPat.gfx(S,BossPat.D_FX), w=(spin?0.45:0)*c.R.speed*(Math.random()<0.5?1:-1), dur=spin?2.8:0.5, tele=c.tele+(spin?0.3:0), lastHit=-9, col=c.theme==='crystal'?'#e0c0ff':c.col;
      return {attached:true, dur:tele+dur+0.3, upd:function(dt){ t+=dt; g.clear(); var cx=m.x, cy=m.y-(BossPat.rig(m)?BossPat.rig(m).D.h*0.35:20), C=BossPat.col(col), act=t>=tele, ang=a0+(act?(t-tele)*w:0);
          BossPat.frame(m,act?'3':'2');
          for(var i=0;i<n;i++){ var a=ang+i/n*Math.PI*2, ex=cx+Math.cos(a)*L, ey=cy+Math.sin(a)*L;
            if(!act){ g.lineStyle(2,C,0.25+0.5*(t/tele)); g.lineBetween(cx,cy,ex,ey); }
            else { g.lineStyle(18,C,0.35); g.lineBetween(cx,cy,ex,ey); g.lineStyle(7,C,0.9); g.lineBetween(cx,cy,ex,ey); g.lineStyle(2,0xffffff,0.95); g.lineBetween(cx,cy,ex,ey);
              var px=S.px-cx, py=S.py-cy, along=px*Math.cos(a)+py*Math.sin(a), off=Math.abs(-px*Math.sin(a)+py*Math.cos(a)); if(along>10&&off<14&&t-lastHit>0.6){ lastHit=t; BossPat.hurt(S,c,spin?0.8:1.1); } } }
          if(act&&!g._snd){ g._snd=true; if(typeof ZSFX!=='undefined')ZSFX.play('boom'); S.cameras.main.shake(120,0.004); }
          return t>=tele+dur; }, kill:function(){ g.destroy(); }}; },
    // ▤ half the floor becomes a hazard (the half you're on), then the other half
    floor:function(c){ var S=c.S, F=BossPat.field(S), vert=Math.random()<0.5, g=BossPat.gfx(S,BossPat.D_TELE), t=0, step=0, steps=c.q>=3?2:1, half=null, tele=c.tele+0.35, on=2.6, acc=0;
      var colF={lava:'#ff6a20',bog:'#70a030',web:'#e8e8f0',frost:'#a0e0ff'}[c.theme]||c.col, st={lava:'burn',bog:'slow',web:'root',frost:'freeze'}[c.theme]||null;
      var pickHalf=function(){ var mine=vert?(S.px<F.x+F.w/2?0:1):(S.py<F.y+F.h/2?0:1); half=step===0?mine:1-half; t=0; };
      var rect=function(){ return vert?[F.x+half*F.w/2,F.y,F.w/2,F.h]:[F.x,F.y+half*F.h/2,F.w,F.h/2]; };
      pickHalf();
      return {dur:(tele+on)*steps, upd:function(dt){ t+=dt; g.clear(); var r=rect(), C=BossPat.col(colF);
          if(t<tele){ var k=t/tele; g.fillStyle(C,0.1+0.18*k); g.fillRect(r[0],r[1],r[2],r[3]); g.lineStyle(3,C,0.5+0.4*k); g.strokeRect(r[0],r[1],r[2],r[3]); return false; }
          BossPat.frame(c.m,'3'); g.fillStyle(C,0.42); g.fillRect(r[0],r[1],r[2],r[3]); var R=BA.rnd((t*10|0)+half); g.fillStyle(0xffffff,0.25); for(var i=0;i<18;i++)g.fillCircle(r[0]+R()*r[2],r[1]+R()*r[3],2+R()*4);
          var inside=S.px>r[0]&&S.px<r[0]+r[2]&&S.py>r[1]&&S.py<r[1]+r[3]; acc+=dt; if(inside&&acc>0.5){ acc=0; if(BossPat.hurt(S,c,0.55)&&st)MX.status(MX.A(S),st,1.2,st==='slow'?0.45:undefined); }
          if(t>=tele+on){ step++; if(step>=steps)return true; pickHalf(); } return false; }, kill:function(){ g.destroy(); }}; },
    // ⤓ the boss dives under; a trail hunts you; it erupts where the trail stops
    burrow:function(c){ var S=c.S, m=c.m, g=BossPat.gfx(S,BossPat.D_TELE), t=0, tx=m.x, ty=m.y, trail=[], end=null, phase=0, R=72, hunt=1.7/c.R.speed;
      var cont=m.cont; if(cont)cont.setAlpha(0.12);
      return {attached:true, dur:hunt+c.tele+1.2, upd:function(dt){ t+=dt; g.clear(); var C=BossPat.col(c.col);
          if(phase===0){ var a=Math.atan2(S.py-ty,S.px-tx), sp=200*c.R.speed; tx+=Math.cos(a)*sp*dt; ty+=Math.sin(a)*sp*dt; trail.push([tx,ty,0]); if(t>=hunt){ phase=1; t=0; end=[tx,ty]; } }
          trail.forEach(function(p){ p[2]+=dt; var a=Math.max(0,1-p[2]/1.2); g.fillStyle(C,0.5*a); g.fillCircle(p[0]+Math.sin(p[2]*20)*3,p[1],5+p[2]*3); });
          if(phase===1){ var k=t/c.tele; g.fillStyle(C,0.12+0.2*k); g.fillCircle(end[0],end[1],R); g.lineStyle(3,C,0.6+0.3*k); g.strokeCircle(end[0],end[1],R*(1.1-0.1*k)); if(t>=c.tele){ phase=2; t=0; BossPat.setPos(S,m,end[0],end[1]); if(cont)cont.setAlpha(1);
              BossPat.frame(m,'3'); S.cameras.main.shake(260,0.01); if(typeof ZSFX!=='undefined')ZSFX.play('boom'); if(Math.hypot(S.px-end[0],S.py-end[1])<R+8)BossPat.hurt(S,c,1.3); if(c.q>=3)BossPat.run(S,m,'quake',c.B,{tele:0.2}); } }
          if(phase===2){ g.lineStyle(4,C,Math.max(0,1-t*2)); g.strokeCircle(end[0],end[1],R+t*120); return t>0.6; } return false; },
        kill:function(){ g.destroy(); if(cont)cont.setAlpha(1); }}; },
    // ⟲ a weapon flies out and comes back
    boomerang:function(c){ var S=c.S, m=c.m, g=BossPat.gfx(S,BossPat.D_FX), t=0, a=Math.atan2(S.py-(m.y-20),S.px-m.x), dist=Math.min(360,Math.max(160,Math.hypot(S.px-m.x,S.py-(m.y-20))+70)), side=Math.random()<0.5?1:-1, out=0.9/c.R.speed, n=c.q>=3?2:1, hit=[false,false], wind=0.45+c.tele*0.3;
      var pos=function(k){ var bx=m.x, by=m.y-20, s=k<1?k:2-k, lat=k<1?0:Math.sin(s*Math.PI)*90*side; return [bx+Math.cos(a)*dist*s-Math.sin(a)*lat, by+Math.sin(a)*dist*s+Math.cos(a)*lat]; };
      var colB={lantern:'#c0ff60',orb:c.col,hammer:'#c8c8d0',axe:'#e0e0e8'}[c.theme]||c.col;
      return {attached:true, dur:wind+out*2+0.2, upd:function(dt){ t+=dt; g.clear(); var C=BossPat.col(colB);
          if(t<wind){ BossPat.frame(m,'2'); g.lineStyle(2,C,0.8); g.strokeCircle(m.x,m.y-20,10+t*30); g.lineStyle(1,C,0.3); g.lineBetween(m.x,m.y-20,m.x+Math.cos(a)*dist,m.y-20+Math.sin(a)*dist); return false; }
          BossPat.frame(m,'3'); var k=(t-wind)/out; if(k>=2){ if(n>1){ n--; t=wind*0.4; a=Math.atan2(S.py-m.y,S.px-m.x); side=-side; hit=[false,false]; return false; } return true; }
          var p=pos(k), sp=t*14; g.fillStyle(C,0.25); g.fillCircle(p[0],p[1],20); g.lineStyle(4,C,0.95); g.beginPath(); for(var i=0;i<3;i++){ var aa=sp+i*2.09; g.moveTo(p[0],p[1]); g.lineTo(p[0]+Math.cos(aa)*16,p[1]+Math.sin(aa)*16); } g.strokePath(); g.fillStyle(0xffffff,0.9); g.fillCircle(p[0],p[1],4);
          var leg=k<1?0:1; if(!hit[leg]&&Math.hypot(S.px-p[0],S.py-p[1])<20){ hit[leg]=true; BossPat.hurt(S,c,0.9); } return false; }, kill:function(){ g.destroy(); }}; },
    // ◎ a shockwave ring with one gap
    quake:function(c){ var S=c.S, m=c.m, g=BossPat.gfx(S,BossPat.D_FX), t=0, cx=m.x, cy=m.y, rings=[], max=360, sp=190*c.R.speed, tele=Math.min(c.tele,0.7), gapW=c.q<=2?1.1:0.85;
      var add=function(){ rings.push({R:10,gap:Math.atan2(S.py-cy,S.px-cx)+(Math.random()<0.5?1:-1)*(1.2+Math.random()*1.4),hit:false}); };
      return {attached:true, dur:tele+max/sp+0.8, upd:function(dt){ t+=dt; g.clear(); var C=BossPat.col(c.col);
          if(t<tele){ BossPat.frame(m,'2'); g.lineStyle(3,C,0.6); g.strokeCircle(cx,cy,24+t*20); return false; }
          if(!rings.length){ add(); BossPat.frame(m,'3'); S.cameras.main.shake(200,0.008); if(typeof ZSFX!=='undefined')ZSFX.play('stomp',{big:1.5}); }
          if(c.q>=3&&rings.length===1&&t>tele+0.6)add();
          var alive=false; rings.forEach(function(r){ if(r.R>max)return; alive=true; r.R0=r.R; r.R+=sp*dt; g.lineStyle(10,C,0.75); g.beginPath(); g.arc(cx,cy,r.R,r.gap+gapW/2,r.gap+Math.PI*2-gapW/2,false); g.strokePath(); g.lineStyle(3,0xffffff,0.8); g.beginPath(); g.arc(cx,cy,r.R,r.gap+gapW/2,r.gap+Math.PI*2-gapW/2,false); g.strokePath();
            var d=Math.hypot(S.px-cx,S.py-cy), a=Math.atan2(S.py-cy,S.px-cx), inGap=Math.abs(Math.atan2(Math.sin(a-r.gap),Math.cos(a-r.gap)))<gapW/2-0.05; if(!r.hit&&(Math.abs(d-r.R)<11||(d>r.R0&&d<r.R))&&!inGap){ r.hit=true; BossPat.hurt(S,c,0.9); } });
          return !alive; }, kill:function(){ g.destroy(); }}; },
    // ⚔ three leaping slams toward you, then a shockwave
    combo:function(c){ var S=c.S, m=c.m, g=BossPat.gfx(S,BossPat.D_TELE), t=0, i=0, gap=0.42/c.R.speed, r=58, marks=[], tele=c.tele*0.8;
      var plan=function(){ var sx=m.x, sy=m.y, tx=S.px, ty=S.py; for(var k=1;k<=3;k++)marks.push({x:sx+(tx-sx)*k/3,y:sy+(ty-sy)*k/3,at:tele+(k-1)*gap,done:false}); }; plan();
      return {attached:true, dur:tele+gap*3+1.2, upd:function(dt){ t+=dt; g.clear(); var C=BossPat.col(c.col), all=true;
          marks.forEach(function(k,j){ if(k.done)return; all=false; var p=Math.max(0,Math.min(1,(t-(k.at-tele))/tele)); g.fillStyle(C,0.1+0.22*p); g.fillCircle(k.x,k.y,r); g.lineStyle(3,C,0.4+0.5*p); g.strokeCircle(k.x,k.y,r); BossPat.frame(m,'2');
            if(t>=k.at){ k.done=true; BossPat.setPos(S,m,k.x,k.y); BossPat.frame(m,'3'); S.cameras.main.shake(150,0.007); if(typeof ZSFX!=='undefined')ZSFX.play('stomp',{big:1.3}); if(Math.hypot(S.px-k.x,S.py-k.y)<r+6)BossPat.hurt(S,c,1); } });
          if(all&&!g._q){ g._q=true; if(c.q>=2)BossPat.run(S,m,'quake',c.B,{tele:0.25}); return true; } return false; }, kill:function(){ g.destroy(); }}; },
    // ➶ a charge down a marked lane, leaving fire behind (flyers swoop)
    strafe:function(c){ var S=c.S, m=c.m, F=BossPat.field(S), g=BossPat.gfx(S,BossPat.D_TELE), t=0, a=Math.atan2(S.py-m.y,S.px-m.x), x0=m.x, y0=m.y, L=Math.max(F.w,F.h)*0.9, x1=x0+Math.cos(a)*L, y1=y0+Math.sin(a)*L, lw=64, dash=0.55/c.R.speed, hit=false, fire=c.theme==='fire'||c.q>=3, lastZ=0, n=c.q>=4?2:1;
      var colS=c.theme==='fire'?'#ff7030':c.col;
      return {attached:true, dur:c.tele+dash+0.3, upd:function(dt){ t+=dt; g.clear(); var C=BossPat.col(colS);
          var lane=function(al){ g.lineStyle(lw,C,al); g.lineBetween(x0,y0,x1,y1); g.lineStyle(2,C,Math.min(1,al*3)); var nx=-Math.sin(a)*lw/2, ny=Math.cos(a)*lw/2; g.lineBetween(x0+nx,y0+ny,x1+nx,y1+ny); g.lineBetween(x0-nx,y0-ny,x1-nx,y1-ny); };
          if(t<c.tele){ BossPat.frame(m,'2'); lane(0.08+0.14*t/c.tele); return false; }
          BossPat.frame(m,'3'); lane(0.06); var k=Math.min(1,(t-c.tele)/dash), x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; BossPat.setPos(S,m,x,y)||(k=1);
          if(fire&&k-lastZ>0.12){ lastZ=k; MX.zone(MX.A(S),{x:x,y:y,r:26,t:2.6,st:'burn',dps:c.dmg*0.25,col:'#ff6a20'}); }
          var kp=this._kp===undefined?k:this._kp; this._kp=k; var dxl=S.px-x0, dyl=S.py-y0, al=(dxl*Math.cos(a)+dyl*Math.sin(a))/L, off=Math.abs(-dxl*Math.sin(a)+dyl*Math.cos(a)); if(!hit&&off<lw/2+6&&al>=kp-0.05&&al<=k+0.05){ hit=true; BossPat.hurt(S,c,1.2); }
          if(k>=1){ if(n>1){ n--; t=c.tele*0.4; x0=m.x; y0=m.y; a=Math.atan2(S.py-y0,S.px-x0); x1=x0+Math.cos(a)*L; y1=y0+Math.sin(a)*L; hit=false; lastZ=0; this._kp=undefined; return false; } return true; } return false; }, kill:function(){ g.destroy(); }}; },
    // ◐ darkness except right around you; blades strike from the dark
    eclipse:function(c){ var S=c.S, key='bp_dark'; if(!S.textures.exists(key)){ var cv=mkCanvas(512,512), x=cv.getContext('2d'), gr=x.createRadialGradient(256,256,40,256,256,256); gr.addColorStop(0,'rgba(4,2,10,0)'); gr.addColorStop(0.38,'rgba(4,2,10,0.15)'); gr.addColorStop(0.62,'rgba(4,2,10,0.88)'); gr.addColorStop(1,'rgba(4,2,10,0.94)'); x.fillStyle=gr; x.fillRect(0,0,512,512); S.textures.addCanvas(key,cv); }
      var im=S.add.image(S.px,S.py,key).setDepth(BossPat.D_DARK).setScale(2.4).setAlpha(0), t=0, dur=4.6, g=BossPat.gfx(S,BossPat.D_DARK+1), marks=[], next=0.9, every=Math.max(0.55,0.95-c.q*0.08);
      return {dur:dur, upd:function(dt){ t+=dt; im.setPosition(S.px,S.py); im.setAlpha(Math.min(1,t*2,(dur-t)*2)); g.clear(); var C=BossPat.col(c.col);
          if(t>=next&&t<dur-0.8){ next+=every; for(var i=0;i<(c.q>=4?2:1);i++){ var r=i?60:0; marks.push({x:S.px+(Math.random()-0.5)*r*2,y:S.py+(Math.random()-0.5)*r*2,t:0,hit:false}); } }
          marks.forEach(function(k){ k.t+=dt; var tl=0.8; if(k.t<tl){ g.lineStyle(2,C,0.4+0.5*k.t/tl); g.strokeCircle(k.x,k.y,26); g.lineBetween(k.x-8,k.y,k.x+8,k.y); g.lineBetween(k.x,k.y-8,k.x,k.y+8); }
            else if(k.t<tl+0.25){ if(!k.hit){ k.hit=true; if(Math.hypot(S.px-k.x,S.py-k.y)<30)BossPat.hurt(S,c,0.8); } g.fillStyle(C,0.8); g.fillRect(k.x-2,k.y-40,4,44); g.lineStyle(3,0xffffff,0.8); g.strokeCircle(k.x,k.y,26+(k.t-tl)*60); } });
          return t>=dur; }, kill:function(){ im.destroy(); g.destroy(); }}; },
    // ⧉ copies of the boss appear and strike through your position together
    mirror:function(c){ var S=c.S, m=c.m, R=BossPat.rig(m), g=BossPat.gfx(S,BossPat.D_FX), t=0, n=c.q>=4?3:2, copies=[], tele=c.tele+0.25, hit=false;
      for(var i=0;i<n;i++){ var a=Math.random()*Math.PI*2/n+i*Math.PI*2/n, x=S.px+Math.cos(a)*170, y=S.py+Math.sin(a)*130, im=null;
        if(R&&R.body&&R.body.texture)im=S.add.image(x,y+R.fy,R.body.texture.key,'2').setOrigin(R.body.originX,R.body.originY).setScale(R.body.scaleX,R.body.scaleY).setAlpha(0).setTint(BossPat.col(c.col)).setBlendMode(Phaser.BlendModes.ADD).setDepth(BossPat.D_FX-1);
        copies.push({x:x,y:y,im:im,a:Math.atan2(S.py-y,S.px-x)}); }
      return {dur:tele+0.6, upd:function(dt){ t+=dt; g.clear(); var C=BossPat.col(c.col);
          copies.forEach(function(k){ if(k.im)k.im.setAlpha(Math.min(0.75,t*1.5)); var L=520, ex=k.x+Math.cos(k.a)*L, ey=k.y+Math.sin(k.a)*L;
            if(t<tele){ g.lineStyle(2,C,0.3+0.5*t/tele); g.lineBetween(k.x,k.y,ex,ey); }
            else { if(k.im)k.im.setFrame('3'); g.lineStyle(14,C,0.45); g.lineBetween(k.x,k.y,ex,ey); g.lineStyle(4,0xffffff,0.9); g.lineBetween(k.x,k.y,ex,ey);
              var px=S.px-k.x, py=S.py-k.y, along=px*Math.cos(k.a)+py*Math.sin(k.a), off=Math.abs(-px*Math.sin(k.a)+py*Math.cos(k.a)); if(!hit&&along>0&&off<13){ hit=true; BossPat.hurt(S,c,1); } } });
          return t>=tele+0.6; }, kill:function(){ g.destroy(); copies.forEach(function(k){ if(k.im)k.im.destroy(); }); }}; }
  }
};
// guardians: summons mostly give way to these attacks
if(typeof BossAtk!=='undefined')BossAtk.stripSummons();
// boss health (Kris): round 8 +20% (stagger windows), round 9 +50% more, round 12 ×2 → ×3.6 for guardians (all phases follow the base)
var BOSS_HP_R9=1.5, ELITE_HP_R9=1.25;
(function(){ Object.keys(BOSS_ATTACKS).forEach(function(k){ if(MDEFS[k]&&!MDEFS[k]._r8hp){ MDEFS[k]._r8hp=true; MDEFS[k].hp=Math.round(MDEFS[k].hp*1.2*BOSS_HP_R9*BOSS_HP_R12); } }); })();
// rigs: a pattern can pin a body frame (wind-up '2' / strike '3')
(function(){ var an=MX.anim; MX.anim=function(A,mon,m,dt,dx){ an.apply(this,arguments); var R=mon.spr&&mon.spr._rig; if(R&&R.ff&&!mon._za&&mon.spr.frame.name!==R.ff)mon.spr.setFrame(R.ff); }; })();
