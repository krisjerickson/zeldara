// ═══════════════════════════════════════════════════════════════════════
// ║ 09bx-boss-plan2.js — round 129: THE BOSS PLAN, IN THE GAME (Kris: "all the picks for boss fights are in … let's get it into the
// ║ game … if some of these don't work with the new ones that were proposed, ok to take out the 'today' ones i picked").
// ║ Every boss form (97 phases of 59 bosses) now fights from the ranked list Kris made in the Lab (or the suggested one he accepted),
// ║ generated into BP2D (09bx-0, tools/world/boss_plan2_game.py):
// ║  · its own signature attacks, last stand, extra-health bars and arena events stay where he kept them, and go where he did not;
// ║  · today's kit attacks he did not keep make way for the new elements (its walk always stays); allies make way where he left them out;
// ║  · 69 kinds of new element (fans, spirals, seekers, lances, safe circles, rising pillars, great strikes, shield stances, wardens,
// ║    totems, eggs, weak points, braziers, doom marks, roars, the beat …) — each a boss pattern here, kept inside the arena (09bd);
// ║  · how hard: Hearthside plays the top half of each phase's ranked list, Wayfarer 70 %, Shieldbearer 85 %, Ragnarök all of it
// ║    (never fewer than two) — the scheme Kris chose ('share');
// ║  · how it travels: only bosses with magic blink; the others leap, stomp, charge, dive, burrow, drift as mist or swoop (09u).
// ║ BP2.on: the switch (the tests turn it off to compare with the old fights).
// ═══════════════════════════════════════════════════════════════════════
var BP2={ on:true, BEAT:0.6, swingT:0,
  // what the boss is made of
  EL:{fire:{c:'#ff7a30',st:'burn'},water:{c:'#5ab0ff',st:'slow'},grass:{c:'#7ad050',st:'poison'},earth:{c:'#c0a070',st:'root'},storm:{c:'#fff080',st:'slow'},shadow:{c:'#b070ff',st:'blind'}},
  // the patterns that are states (the boss keeps fighting while they last) and the ones that change the rules rather than attack
  STATE:{bash:1,stance:1,hide:1,slow:1,wardens:1,totems:1,eggs:1,split:1,use:1,light:0,event:1,crumble:1,swarm:1,drift:1,gravity:0},
  MOD:{weak:1,rhythm:1},
  plan:function(m){ if(!BP2.on||typeof BP2D==='undefined'||!m)return null; var D=BP2D.slots, sl=BossPat.slotOf(m); return (m.bossKey&&D[m.bossKey])||(sl&&D[sl])||null; },
  // the ranked list, cut by the difficulty level (scheme 'share')
  keep:function(E){ var n=E.r.length, L=(typeof ZDiff!=='undefined'?ZDiff.lv():1), f=BP2D.f[L]; if(typeof f!=='number')f=1; return E.r.slice(0,Math.min(n,Math.max(BP2D.min||2,Math.ceil(n*f-1e-9)))); },
  elOf:function(E){ var e=E&&E.el&&E.el[0]; return BP2.EL[e]||{c:'#ffd080',st:null}; },
  // ── helpers ──
  A:function(S){ return MX.A(S); },
  near:function(S,x,y){ if(typeof BARENA!=='undefined'){ var q=BARENA.near(S,x,y); return {x:q[0],y:q[1]}; } return {x:x,y:y}; },
  inA:function(S,x,y){ return typeof BARENA==='undefined'||BARENA.in(S,x,y); },
  ok:function(S,x,y){ return BP2.inA(S,x,y)&&(!S._canGoD||S._canGoD(x,y)); },
  F:function(S){ return BossPat.field(S); },
  bc:function(m){ var R=BossPat.rig(m); return {x:m.x,y:m.y-(R?R.D.h*0.35:20)}; },
  mask:function(S,o){ return typeof BARENA!=='undefined'?BARENA.mask(S,o):o; },
  swung:function(S,x,y,r){ return Date.now()-BP2.swingT<260&&Math.hypot(S.px-x,S.py-y)<(r||46); },
  boss:function(c,d,mult,why){ var m=c.m; if(!m||m.dead)return; var v=Math.max(1,Math.round((m.maxHp||100)*d)); if(m.mx){ m._hp=Math.max(1,m._hp-v); if(m.hpFill)m.hpFill.displayWidth=28*Math.max(0,m._hp/m.maxHp); } else m.hp=Math.max(1,m.hp-v); if(m._bp){ m._bp.lastHp=m.hp; m._bp._p2hp=m.hp; }
    BossPat.say(c.S,m.x,m.y-70,(why||'')+' -'+v,'#fff0a0'); try{ c.S.cameras.main.shake(140,0.006); if(typeof ZSFX!=='undefined')ZSFX.play('boom'); }catch(e){} },
  open:function(c,t,txt){ var B=c.B; if(!B)return; B.p2w=Math.max(B.p2w||0,t||2.6); BossPat.say(c.S,c.m.x,c.m.y-86,txt||'✦ An opening! ✦','#fff0a0'); },
  // an act: a timeline (at), graphics it owns (g) and an optional per-frame step; ends when step returns true, or when its time and timeline are done
  act:function(c,o){ var a={dur:o.dur||3,attached:!!o.att,keep:!!o.keep,t:0,q:[],gs:[],ob:[],
      at:function(t,f){ this.q.push([t,f]); this.q.sort(function(x,y){ return x[0]-y[0]; }); },
      g:function(d){ var g=BossPat.gfx(c.S,d); this.gs.push(g); return g; },
      own:function(o2){ if(o2){ BP2.mask(c.S,o2); this.ob.push(o2); } return o2; },
      upd:function(dt){ a.t+=dt; while(a.q.length&&a.q[0][0]<=a.t){ var f=a.q.shift()[1]; if(!c.m.dead){ try{ f.call(a); }catch(e){ if(!BP2._w){ BP2._w=1; console.warn('bp2',e); } } } }
        var r; try{ r=o.step?o.step.call(a,dt,a.t):undefined; }catch(e2){ if(!BP2._w2){ BP2._w2=1; console.warn('bp2 step',e2); } return true; } if(r===true)return true; if(a.t>a.dur+8)return true; return a.t>=a.dur&&!a.q.length&&r!=='hold'; },
      kill:function(){ a.gs.forEach(function(g){ try{ g.destroy(); }catch(e){} }); a.ob.forEach(function(g){ try{ g.destroy(); }catch(e){} }); if(o.kill)try{ o.kill.call(a); }catch(e){} }};
    return a; },
  // a telegraphed circle that strikes after a delay
  strike:function(c,a,x,y,r,delay,o){ o=o||{}; var S=c.S, A=MX.A(S), p=o.free?{x:x,y:y}:BP2.near(S,x,y), col=o.col||c.ec; MX.tele.circle(A,p.x,p.y,r,col,delay);
    a.at(a.t+delay,function(){ MX.fxRing(A,p.x,p.y,r,col); if(Math.hypot(S.px-p.x,S.py-p.y)<r+6&&!(o.safe&&o.safe(p)))if(BossPat.hurt(S,c,o.m||0.9,o.lb||'')&&o.st)MX.status(A,o.st,o.stT||2,o.stV);
      if(o.zone)MX.zone(A,{x:p.x,y:p.y,r:r*0.8,t:o.zt||3,st:o.zone,dps:c.dmg*0.2,src:c.m}); if(o.then)o.then(p); }); return p; },
  // a telegraphed lane (a rectangle from x0,y0 along angle ang) that strikes after a delay
  lane:function(c,a,x0,y0,ang,len,w,delay,o){ o=o||{}; var S=c.S, g=a.g(BossPat.D_TELE), col=MX.col(o.col||c.ec), ca=Math.cos(ang), sa=Math.sin(ang), nx=-sa*w/2, ny=ca*w/2, t0=a.t, hit=false;
    var pts=[{x:x0+nx,y:y0+ny},{x:x0+ca*len+nx,y:y0+sa*len+ny},{x:x0+ca*len-nx,y:y0+sa*len-ny},{x:x0-nx,y:y0-ny}];
    var draw=function(al){ g.clear(); g.fillStyle(col,al); g.fillPoints(pts,true); g.lineStyle(2,col,Math.min(1,al*2.5)); g.strokePoints(pts,true,true); };
    var L={g:g,inside:function(){ var dx=S.px-x0, dy=S.py-y0, al=dx*ca+dy*sa, of=Math.abs(-dx*sa+dy*ca); return al>-6&&al<len+6&&of<w/2+4; }}; draw(0.12);
    a.at(t0+delay*0.5,function(){ draw(0.24); }); a.at(t0+delay,function(){ draw(0.55); if(!hit&&L.inside()){ hit=true; if(BossPat.hurt(S,c,o.m||1,o.lb||'')&&o.st)MX.status(MX.A(S),o.st,o.stT||2); } if(o.then)o.then(); });
    a.at(t0+delay+0.25,function(){ g.clear(); }); return L; },
  shot:function(c,x,y,ang,spd,o){ o=o||{}; return MX.proj(MX.A(c.S),{x:x,y:y,vx:Math.cos(ang)*spd,vy:Math.sin(ang)*spd,dmg:c.dmg*(o.m||0.55),col:o.col||c.ec,kind:o.kind||'bolt',src:c.m,life:o.life||3.2,ric:o.ric||0,homing:!!o.homing,zone:o.zone,zr:o.zr,st:o.st,stT:o.stT,r:o.r,pierce:!!o.pierce,fly:o.fly!==false}); },
  dart:function(c,x,y,ang,spd,life,r){ var S=c.S, g=S.add.circle(x,y,r||4,MX.col(c.ec),0.95).setDepth(BossPat.D_FX); BP2.mask(S,g); S.tweens.add({targets:g,x:x+Math.cos(ang)*spd*life,y:y+Math.sin(ang)*spd*life,alpha:0.2,duration:life*1000,onComplete:function(){ g.destroy(); }}); return g; },
  aim:function(c,x,y){ return Math.atan2(c.S.py-y,c.S.px-x); },
  // a painted prop if there is one (round 129 asks for them), else a drawn stand-in
  prop:function(c,a,id,x,y,h,draw){ var S=c.S, im=null; try{ if(typeof ZScn!=='undefined'&&ZScn.has(id))im=ZScn.image(S,id,x,y,h/Math.max(1,ZScn.size(id,0).h),MX.A(S).depth(y)); }catch(e){ im=null; } if(im){ a.own(im); return {im:im}; }
    var g=a.g(MX.A(S).depth(y)); draw(g); return {g:g}; },
  // a stand-in cover block (a pillar, an anvil) — a wall the hero and shots go round
  cover:function(c,x,y,w,h,t,col,id){ var A=MX.A(c.S); if(!BP2.ok(c.S,x,y))return null; if(MX.wall(A,x,y,w,h,t,col||'#8a8e96')===false)return null; var F=MX.fx(A), W=F.walls[F.walls.length-1]||{x:x,y:y,w:w,h:h};
    /* the painted piece over the block, while it stands (07zt22) */ try{ if(id&&typeof ZScn!=='undefined'&&ZScn.has(id)){ var im=ZScn.image(c.S,id,x,y+h/2,(h*1.4)/Math.max(1,ZScn.size(id,0).h),A.depth(y+h/2)); if(im){ BP2.mask(c.S,im); c.S.time.delayedCall(t*1000,function(){ im.destroy(); }); } } }catch(e){} return W; },
  pillar:function(c){ var e=c.E&&c.E.el&&c.E.el[0]; return 'bp_pillar_'+({water:'ice',storm:'crystal',shadow:'crystal',fire:'obsidian'}[e]||'stone'); },
  // is the line from (x0,y0) to the hero blocked by a cover block?
  shade:function(S,x0,y0){ var F=S._mxFx, x1=S.px, y1=S.py; if(!F||!F.walls)return false; return F.walls.some(function(w){ for(var k=0.15;k<0.95;k+=0.05){ var x=x0+(x1-x0)*k, y=y0+(y1-y0)*k; if(Math.abs(x-w.x)<w.w/2+2&&Math.abs(y-w.y)<w.h/2+2)return true; } return false; }); },
  // a minion of the boss's own kind (a summon id it had, else one of its realm's monsters)
  minionId:function(c){ var E=c.E, q=c.m.def&&c.m.def.sec||BossPat.q(c.S); if(E&&E.sm&&MON_BY_ID[E.sm])return E.sm; if(!BP2._pool)BP2._pool={};
    var P=BP2._pool[q]||(BP2._pool[q]=(typeof MON_ROSTER!=='undefined'?MON_ROSTER:[]).filter(function(R){ return R.q===q&&R.seg==='main'&&!(typeof MON_LEGACY!=='undefined'&&MON_LEGACY[R.id])&&MX.kit(R.id)&&R.tier<=2; }).map(function(R){ return R.id; }));
    if(!P.length)return null; var h=0, s=(c.E&&c.E.b)||'x'; for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0; return P[Math.abs(h)%P.length]; },
  spawn:function(c,rid,x,y,o){ var A=MX.A(c.S), p=BP2.near(c.S,x,y); if(!BP2.ok(c.S,p.x,p.y)){ p={x:c.m.x+(Math.random()-0.5)*40,y:c.m.y+30}; } var mon=A.spawn(rid,p.x,p.y,Object.assign({q:(c.m.def&&c.m.def.sec)||1,hpMult:0.5},o||{}));
    if(mon){ mon._m.aggro=true; mon._m.summoned=true; mon.noSplit=true; mon.temp=true; mon._summoner=c.m; mon._bp2kid=true; MX.fxRing(A,p.x,p.y,20,c.ec); } return mon; },
  // a stand-in monster made from another (a totem, an egg): the kit given, its look borrowed and tinted
  kin:function(kind,base,kit,name){ var id='bp2_'+kind+'_'+base; if(!MON_BY_ID[id]){ var R=MON_BY_ID[base]; if(!R)return null; MON_BY_ID[id]=Object.assign({},R,{id:id,name:name,tier:1,role:'minion',chId:undefined}); MX.KITS[id]=kit; } return id; },
  kids:function(c){ return (c.S.monsters||[]).filter(function(k){ return k&&!k.dead&&k._summoner===c.m; }); }
};

// ═════════ the new elements: each is BossPat.PAT['p2_<kind>'] (the name after ':' is the boss's element) ═════════
BP2.PAT={
  // ── projectiles ──
  fan:function(c){ var a=BP2.act(c,{dur:c.tele+1.6,att:true}), n=c.q>=3?9:7, k=c.q>=3?3:2, spread=1.1; for(var v=0;v<k;v++)(function(v){ a.at(c.tele*0.6+v*0.55,function(){ var b=BP2.bc(c.m), base=BP2.aim(c,b.x,b.y)+(v%2?spread/(n-1)/2:0);
      BossPat.frame(c.m,'3'); for(var i=0;i<n;i++)BP2.shot(c,b.x,b.y,base-spread/2+i*spread/(n-1),190+c.q*15,{m:0.5}); }); })(v); a.at(0,function(){ BossPat.frame(c.m,'2'); MX.tele.cone(MX.A(c.S),c.m.x,c.m.y,BP2.aim(c,c.m.x,c.m.y),160,spread/2,c.ec,c.tele*0.6); }); return a; },
  spiral:function(c){ var arms=c.q>=3?3:2, ang=Math.random()*6.28, dir=Math.random()<0.5?1:-1, acc=0, a=BP2.act(c,{dur:c.tele*0.5+2.6,att:true,step:function(dt,t){ if(t<c.tele*0.5){ BossPat.frame(c.m,'2'); return; } BossPat.frame(c.m,'3'); acc+=dt; ang+=dt*2.1*dir;
      while(acc>0.12){ acc-=0.12; var b=BP2.bc(c.m); for(var i=0;i<arms;i++)BP2.shot(c,b.x,b.y,ang+i*6.283/arms,150,{m:0.45,life:3}); } }}); return a; },
  seekers:function(c){ var orbs=[], a=BP2.act(c,{dur:7,step:function(){ orbs=orbs.filter(function(o){ return o.vis&&o.vis.active&&o.life>0; }); orbs.forEach(function(o){ if(BP2.swung(c.S,o.x,o.y,50)){ MX.fxRing(MX.A(c.S),o.x,o.y,22,'#ffffff'); BossPat.say(c.S,o.x,o.y-14,'popped!','#ffffff'); o.life=0; o.vis.destroy(); } }); return this.out&&!orbs.length; }});
    a.at(c.tele*0.6,function(){ var b=BP2.bc(c.m), n=c.q>=3?4:3; for(var i=0;i<n;i++)orbs.push(BP2.shot(c,b.x,b.y,i*6.283/n,85+c.q*8,{m:0.6,homing:true,life:7,kind:'orb',r:8})); a.out=1; }); return a; },
  ricochet:function(c){ var a=BP2.act(c,{dur:c.tele+0.5,att:true}); a.at(c.tele*0.7,function(){ var b=BP2.bc(c.m), base=BP2.aim(c,b.x,b.y); BossPat.frame(c.m,'3'); for(var i=-2;i<=2;i++)BP2.shot(c,b.x,b.y,base+i*0.32,260,{m:0.5,ric:2,fly:false,life:4}); }); return a; },
  splitter:function(c){ var big=null, done=false, a=BP2.act(c,{dur:6,att:false,step:function(){ if(!big||done)return; if(!big.vis||!big.vis.active||big.life<=0.05||Math.hypot(c.S.px-big.x,c.S.py-big.y)<60||BP2.swung(c.S,big.x,big.y,50)){ done=true; var x=big.x, y=big.y; if(big.vis&&big.vis.active)big.vis.destroy(); big.life=0;
        MX.fxRing(MX.A(c.S),x,y,30,c.ec); for(var i=0;i<8;i++)BP2.shot(c,x,y,i*0.785,170,{m:0.45,life:2}); return true; } }});
    a.at(c.tele*0.6,function(){ var b=BP2.bc(c.m); big=BP2.shot(c,b.x,b.y,BP2.aim(c,b.x,b.y),110,{m:0.9,life:1.6,r:11,kind:'orb'}); }); return a; },
  mortar:function(c){ var a=BP2.act(c,{dur:3.4}), n=c.q>=3?6:4; BossPat.frame(c.m,'3'); for(var i=0;i<n;i++)BP2.strike(c,a,c.S.px+(i?(Math.random()-0.5)*220:0),c.S.py+(i?(Math.random()-0.5)*160:0),30,c.tele+0.5+i*0.18,{m:0.8,zone:c.est&&c.est!=='blind'?c.est:null,zt:2.5}); return a; },
  volley:function(c){ var a=BP2.act(c,{dur:c.tele+1.6}), F=BP2.F(c.S), hz=Math.random()<0.5, w=70; if(hz)BP2.lane(c,a,F.x,c.S.py,0,F.w,w,c.tele+0.4,{m:0.9,lb:'🏹'}); else BP2.lane(c,a,c.S.px,F.y,Math.PI/2,F.h,w,c.tele+0.4,{m:0.9,lb:'🏹'});
    a.at(c.tele+0.25,function(){ for(var i=0;i<9;i++){ var o=hz?{x:F.x+i*F.w/9,y:c.S.py+(Math.random()-0.5)*w*0.7}:{x:c.S.px+(Math.random()-0.5)*w*0.7,y:F.y+i*F.h/9}; BP2.dart(c,o.x,o.y,hz?0:Math.PI/2,520,0.35,3); } }); return a; },
  lance:function(c){ var g=null, ang=null, lock=1.7/c.R.speed, fired=false, a=BP2.act(c,{dur:lock+0.9,att:true,step:function(dt,t){ var b=BP2.bc(c.m), want=BP2.aim(c,b.x,b.y); if(ang===null)ang=want; if(t<lock){ var d=Math.atan2(Math.sin(want-ang),Math.cos(want-ang)); ang+=Math.max(-0.9*dt,Math.min(0.9*dt,d)); }
      g.clear(); var L=520, C=MX.col(c.ec); if(t<lock+0.35){ g.lineStyle(t<lock?2:4,C,t<lock?0.5:0.95); g.lineBetween(b.x,b.y,b.x+Math.cos(ang)*L,b.y+Math.sin(ang)*L); BossPat.frame(c.m,'2'); return; }
      BossPat.frame(c.m,'3'); g.lineStyle(16,C,0.4); g.lineBetween(b.x,b.y,b.x+Math.cos(ang)*L,b.y+Math.sin(ang)*L); g.lineStyle(5,0xffffff,0.9); g.lineBetween(b.x,b.y,b.x+Math.cos(ang)*L,b.y+Math.sin(ang)*L);
      if(!fired){ fired=true; var px=c.S.px-b.x, py=c.S.py-b.y, al=px*Math.cos(ang)+py*Math.sin(ang), of=Math.abs(-px*Math.sin(ang)+py*Math.cos(ang)); if(al>0&&of<16&&!BP2.shade(c.S,b.x,b.y))BossPat.hurt(c.S,c,1.2,'⚡'); try{ if(typeof ZSFX!=='undefined')ZSFX.play('boom'); }catch(e){} } }}); g=a.g(BossPat.D_FX); return a; },
  wave:function(c){ var P=[], a=BP2.act(c,{dur:c.tele*0.6+3.2,att:false,step:function(dt){ P.forEach(function(o){ if(!o.vis||!o.vis.active)return; o.k=(o.k||0)+dt; var s=Math.cos(o.k*6)*120; o.vx=o.bx+o.px*s; o.vy=o.by+o.py*s; }); }});
    a.at(c.tele*0.6,function(){ var b=BP2.bc(c.m), base=BP2.aim(c,b.x,b.y); for(var i=-1;i<=1;i++){ var an=base+i*0.45, sp=160, o=BP2.shot(c,b.x,b.y,an,sp,{m:0.5,life:3.2}); o.bx=Math.cos(an)*sp; o.by=Math.sin(an)*sp; o.px=-Math.sin(an); o.py=Math.cos(an); o.k=i*1.1; P.push(o); } }); return a; },
  deflect:function(c){ return BP2.PAT._volley(c,'swing'); },
  mirror:function(c){ return BP2.PAT._volley(c,'shield'); },
  /* an orb flies at you; strike it (deflect) or hold up your shield as it reaches you (mirror) and it flies back faster; reaching the boss it wounds it; up to three returns */
  _volley:function(c,how){ var o=null, back=false, n=0, max=c.q>=3?3:2, a=BP2.act(c,{dur:14,step:function(dt){ if(!o)return; var g=o.g, b=BP2.bc(c.m), tx=back?b.x:c.S.px, ty=back?b.y:c.S.py, d=Math.hypot(tx-o.x,ty-o.y), sp=o.sp*dt;
      o.x+=(tx-o.x)/Math.max(d,1)*Math.min(sp,d); o.y+=(ty-o.y)/Math.max(d,1)*Math.min(sp,d); g.clear(); g.fillStyle(MX.col(c.ec),0.35); g.fillCircle(o.x,o.y,15); g.fillStyle(0xffffff,0.9); g.fillCircle(o.x,o.y,6); g.lineStyle(2,MX.col(c.ec),0.9); g.strokeCircle(o.x,o.y,10+Math.sin(this.t*12)*2);
      if(!back){ var hit=how==='swing'?BP2.swung(c.S,o.x,o.y,52):(d<26&&c.S._shielding); if(hit){ back=true; o.sp*=1.3; BossPat.say(c.S,o.x,o.y-16,how==='swing'?'returned!':'reflected!','#ffffff'); MX.fxRing(MX.A(c.S),o.x,o.y,20,'#ffffff'); return; }
        if(d<14){ BossPat.hurt(c.S,c,0.9); return true; } return; }
      if(d<24){ n++; BP2.boss(c,0.035,'returned'); if(n>=max){ BP2.open(c,2.4); return true; } back=false; o.sp*=1.15; BossPat.say(c.S,c.m.x,c.m.y-60,'…and back!','#ffd0a0'); } }});
    a.at(c.tele*0.5,function(){ var b=BP2.bc(c.m); o={x:b.x,y:b.y,sp:150,g:a.g(BossPat.D_FX)}; BossPat.say(c.S,b.x,b.y-60,how==='swing'?'Strike it back!':'Shield up as it comes!','#ffe0a0'); }); return a; },
  hook:function(c){ var a=BP2.act(c,{dur:c.tele+1.2,att:true}), b=BP2.bc(c.m), ang=BP2.aim(c,b.x,b.y), L=Math.min(340,Math.hypot(c.S.px-b.x,c.S.py-b.y)+60);
    BP2.lane(c,a,b.x,b.y,ang,L,26,c.tele+0.2,{m:0.5,lb:'⛓',then:function(){ var A=MX.A(c.S), dx=c.m.x-c.S.px, dy=c.m.y-c.S.py, d=Math.hypot(dx,dy); var px=c.S.px-b.x, py=c.S.py-b.y, of=Math.abs(-px*Math.sin(ang)+py*Math.cos(ang));
      if(of<17&&d>50&&A.ifr()<=0.65&&MX.canPull(A)){ MX.push(A,dx/d,dy/d,Math.min(d-46,220)); BossPat.say(c.S,c.S.px,c.S.py-40,'Hooked!','#ffb080'); } }}); return a; },
  trail:function(c){ var P=[], a=BP2.act(c,{dur:c.tele*0.6+2.4,step:function(){ P.forEach(function(o){ if(!o.vis||!o.vis.active)return; if(Math.hypot(o.x-(o.lx||0),o.y-(o.ly||0))>26){ o.lx=o.x; o.ly=o.y; MX.zone(MX.A(c.S),{x:o.x,y:o.y,r:16,t:3,st:c.est||'burn',dps:c.dmg*0.15,col:c.ec,src:c.m}); } }); }});
    a.at(c.tele*0.6,function(){ var b=BP2.bc(c.m), base=BP2.aim(c,b.x,b.y); for(var i=-1;i<=1;i++)P.push(BP2.shot(c,b.x,b.y,base+i*0.4,150,{m:0.5,life:2.2})); }); return a; },
  orbit:function(c){ var P=[], R=46, rot=0, rel=c.tele+1.2, a=BP2.act(c,{dur:rel+2.5,att:true,step:function(dt,t){ var b=BP2.bc(c.m); rot+=dt*2.4; P.forEach(function(o,i){ if(!o.vis||!o.vis.active)return; if(t<rel){ var an=rot+i*6.283/P.length; o.x=b.x+Math.cos(an)*R; o.y=b.y+Math.sin(an)*R*0.8; o.vx=0; o.vy=0; o.life=3; o.vis.setPosition(o.x,o.y); }
        else if(!o.go){ o.go=1; var an2=Math.atan2(o.y-b.y,o.x-b.x)+0.5; o.vx=Math.cos(an2)*200; o.vy=Math.sin(an2)*200; } }); }});
    a.at(0.2,function(){ var b=BP2.bc(c.m), n=c.q>=3?10:8; for(var i=0;i<n;i++)P.push(BP2.shot(c,b.x,b.y,0,0,{m:0.5,life:3,kind:'orb'})); }); return a; },
  sniper:function(c){ var g=null, lock=1.5/c.R.speed, a=BP2.act(c,{dur:lock+0.6,att:true,step:function(dt,t){ var b=BP2.bc(c.m), an=t<lock?BP2.aim(c,b.x,b.y):(this.an||BP2.aim(c,b.x,b.y)); if(t<lock)this.an=an; g.clear(); if(t<lock+0.3){ g.lineStyle(1.5,0xff4040,0.4+0.5*Math.min(1,t/lock)); g.lineBetween(b.x,b.y,b.x+Math.cos(an)*600,b.y+Math.sin(an)*600); BossPat.frame(c.m,'2'); }
      else if(!this.f){ this.f=1; BossPat.frame(c.m,'3'); BP2.shot(c,b.x,b.y,an,640,{m:1.5,life:1.2,fly:false,r:7}); try{ if(typeof ZSFX!=='undefined')ZSFX.play('hit'); }catch(e){} } }}); g=a.g(BossPat.D_FX); return a; },
  boomer:function(c){ return BossPat.PAT.boomerang(c); },
  scatter:function(c){ var a=BP2.act(c,{dur:c.tele+0.6,att:true}), R=96; MX.tele.circle(MX.A(c.S),c.m.x,c.m.y,R,c.ec,c.tele);
    a.at(c.tele,function(){ var b=BP2.bc(c.m); BossPat.frame(c.m,'3'); for(var i=0;i<14;i++)BP2.dart(c,b.x,b.y,i*0.449,320,0.32,4); if(Math.hypot(c.S.px-c.m.x,c.S.py-c.m.y)<R)BossPat.hurt(c.S,c,1); MX.fxRing(MX.A(c.S),c.m.x,c.m.y,R,c.ec); }); return a; },
  // ── area ──
  quake:function(c){ return BossPat.PAT.quake(c); },
  sweep:function(c){ return BossPat.PAT.wall(c); },
  checker:function(c){ var F=BP2.F(c.S), cs=84, a=BP2.act(c,{dur:c.tele*2+1.6}), par=Math.random()<0.5?0:1;
    var cells=function(p){ var L=[]; for(var y=F.y;y<F.y+F.h;y+=cs)for(var x=F.x;x<F.x+F.w;x+=cs){ var i=Math.floor((x-F.x)/cs), j=Math.floor((y-F.y)/cs); if((i+j)%2===p&&BP2.inA(c.S,x+cs/2,y+cs/2))L.push([x,y]); } return L; };
    [0,1].forEach(function(k){ var t0=k*(c.tele+0.6), L=null, g=null; a.at(t0,function(){ L=cells((par+k)%2); g=a.g(BossPat.D_TELE); g.fillStyle(MX.col(c.ec),0.22); L.forEach(function(q){ g.fillRect(q[0]+3,q[1]+3,cs-6,cs-6); }); });
      a.at(t0+c.tele+0.3,function(){ g.clear(); g.fillStyle(MX.col(c.ec),0.6); L.forEach(function(q){ g.fillRect(q[0]+3,q[1]+3,cs-6,cs-6); }); if(L.some(function(q){ return c.S.px>q[0]&&c.S.px<q[0]+cs&&c.S.py>q[1]&&c.S.py<q[1]+cs; }))BossPat.hurt(c.S,c,0.9); });
      a.at(t0+c.tele+0.6,function(){ g.clear(); }); }); return a; },
  cross:function(c){ var a=BP2.act(c,{dur:c.tele*2+1.4}), F=BP2.F(c.S), x=c.S.px, y=c.S.py, L=Math.hypot(F.w,F.h), w=46;
    [[0,Math.PI/2],[Math.PI/4,-Math.PI/4]].forEach(function(set,k){ a.at(k*(c.tele+0.5),function(){ var px=k?c.S.px:x, py=k?c.S.py:y; set.forEach(function(an){ BP2.lane(c,a,px-Math.cos(an)*L/2,py-Math.sin(an)*L/2,an,L,w,c.tele+0.2,{m:0.9}); }); }); }); return a; },
  spiralf:function(c){ var a=BP2.act(c,{dur:c.tele+3}), cx=c.S.px, cy=c.S.py, n=c.q>=3?16:12; for(var i=0;i<n;i++){ var k=i/n, r=260*(1-k)+20, an=k*Math.PI*5; BP2.strike(c,a,cx+Math.cos(an)*r,cy+Math.sin(an)*r*0.8,30,c.tele+i*0.16,{m:0.8}); } return a; },
  safe:function(c){ var F=BP2.F(c.S), a=BP2.act(c,{dur:c.tele+2.6}), n=c.q>=3?3:4, R=c.q>=3?58:66, spots=[], g=a.g(BossPat.D_TELE), delay=c.tele+1.6;
    for(var t=0;t<60&&spots.length<n;t++){ var x=F.x+R+Math.random()*(F.w-R*2), y=F.y+R+Math.random()*(F.h-R*2); if(!BP2.ok(c.S,x,y))continue; if(spots.some(function(s){ return Math.hypot(s.x-x,s.y-y)<R*2.6; }))continue; if(!spots.length&&Math.hypot(x-c.S.px,y-c.S.py)<R*2)continue; spots.push({x:x,y:y}); }
    if(!spots.length){ var an0=Math.random()*6.28; spots.push(BP2.near(c.S,c.S.px+Math.cos(an0)*R*2.2,c.S.py+Math.sin(an0)*R*2.2)); }
    BossPat.say(c.S,c.S.px,c.S.py-50,'Find a safe circle!','#ffe0a0');
    a.step=null; var draw=function(al){ g.clear(); g.fillStyle(MX.col(c.ec),al); g.fillRect(F.x,F.y,F.w,F.h); spots.forEach(function(s){ g.fillStyle(0x000000,0); g.lineStyle(4,0xfff0b0,0.95); g.strokeCircle(s.x,s.y,R); g.fillStyle(0xfff0b0,0.18); g.fillCircle(s.x,s.y,R); }); };
    draw(0.1); a.at(delay*0.5,function(){ draw(0.2); }); a.at(delay*0.85,function(){ draw(0.32); });
    a.at(delay,function(){ draw(0.7); BossPat.frame(c.m,'3'); try{ c.S.cameras.main.shake(300,0.01); }catch(e){} if(!spots.some(function(s){ return Math.hypot(c.S.px-s.x,c.S.py-s.y)<R+4; }))BossPat.hurt(c.S,c,1.5); }); a.at(delay+0.4,function(){ g.clear(); }); return a; },
  tide:function(c){ var F=BP2.F(c.S), a=BP2.act(c,{dur:c.tele+5}), isl=[], cs=72, st=c.est==='burn'?'burn':c.est==='poison'?'poison':'slow';
    for(var t=0;t<40&&isl.length<3;t++){ var x=F.x+70+Math.random()*(F.w-140), y=F.y+70+Math.random()*(F.h-140); if(BP2.ok(c.S,x,y)&&!isl.some(function(s){ return Math.hypot(s.x-x,s.y-y)<200; }))isl.push({x:x,y:y}); }
    var g=a.g(BossPat.D_TELE); g.lineStyle(3,0xfff0b0,0.9); isl.forEach(function(s){ g.strokeCircle(s.x,s.y,52); }); BossPat.say(c.S,c.S.px,c.S.py-50,'The floor floods — get to high ground!','#a0d8ff');
    a.at(c.tele+0.8,function(){ g.clear(); for(var y=F.y+cs/2;y<F.y+F.h;y+=cs)for(var x=F.x+cs/2;x<F.x+F.w;x+=cs){ if(isl.some(function(s){ return Math.hypot(s.x-x,s.y-y)<60; }))continue; MX.zone(MX.A(c.S),{x:x,y:y,r:cs*0.62,t:4,st:st,v:0.5,dps:c.dmg*0.12,col:c.ec,src:c.m}); } g.lineStyle(3,0xfff0b0,0.6); isl.forEach(function(s){ g.strokeCircle(s.x,s.y,52); }); }); return a; },
  crumble:function(c){ var a=BP2.act(c,{dur:8}), A0=typeof BARENA!=='undefined'&&BARENA.get(c.S); if(!A0)return null; var inset=44, pts=[];
    for(var x=A0.x0+inset;x<A0.x1-inset;x+=56){ pts.push([x,A0.y0+inset]); pts.push([x,A0.y1-inset]); } for(var y=A0.y0+inset+56;y<A0.y1-inset;y+=56){ pts.push([A0.x0+inset,y]); pts.push([A0.x1-inset,y]); }
    BossPat.say(c.S,c.S.px,c.S.py-50,'The edges crumble!','#ffd0a0'); pts.forEach(function(p){ var q=BP2.near(c.S,p[0],p[1]); BP2.strike(c,a,q.x,q.y,30,c.tele+0.5,{m:0.7,free:true,zone:c.est==='burn'?'burn':'slow',zt:7}); }); return a; },
  pillars:function(c){ var a=BP2.act(c,{dur:c.tele+1.2}), b={x:c.m.x,y:c.m.y}, n=4; for(var i=1;i<=n;i++){ var k=i/n, x=b.x+(c.S.px-b.x)*k, y=b.y+(c.S.py-b.y)*k;
      BP2.strike(c,a,x,y,24,c.tele+i*0.14,{m:0.9,then:function(p){ var w=BP2.cover(c,p.x,p.y,26,30,6,'#8a8070',BP2.pillar(c)); if(w)MX.fxRing(MX.A(c.S),p.x,p.y,18,'#c0b090'); }}); } return a; },
  meteor:function(c){ var a=BP2.act(c,{dur:c.tele+3}), cx=c.S.px, cy=c.S.py, R=150, delay=c.tele+1.9, A=MX.A(c.S);
    for(var i=0;i<2;i++){ var an=Math.random()*6.28; BP2.cover(c,cx+Math.cos(an)*(R*0.55),cy+Math.sin(an)*(R*0.55),40,34,delay+1.2,'#6a6e76','bp_anvil'); }
    BossPat.say(c.S,cx,cy-60,'Get behind something solid!','#ffd080'); var g=a.g(BossPat.D_TELE); a.step=null;
    var draw=function(k){ g.clear(); g.fillStyle(MX.col(c.ec),0.1+0.3*k); g.fillCircle(cx,cy,R); g.lineStyle(4,MX.col(c.ec),0.6+0.4*k); g.strokeCircle(cx,cy,R*(1.15-0.15*k)); };
    for(var s=0;s<=6;s++)(function(s){ a.at(delay*s/6,function(){ draw(s/6); }); })(s);
    a.at(delay,function(){ g.clear(); MX.fxRing(A,cx,cy,R,c.ec); MX.fxRing(A,cx,cy,R*0.6,'#ffffff'); try{ c.S.cameras.main.shake(420,0.016); if(typeof ZSFX!=='undefined')ZSFX.play('boom'); }catch(e){} if(Math.hypot(c.S.px-cx,c.S.py-cy)<R+6&&!BP2.shade(c.S,cx,cy))BossPat.hurt(c.S,c,2,'☄'); }); return a; },
  drift:function(c){ var Z=[], F=BP2.F(c.S), dir=Math.random()<0.5?1:-1, a=BP2.act(c,{dur:7,step:function(dt){ Z.forEach(function(z){ if(!z.vis)return; z.x+=dir*38*dt; z.y+=Math.sin(this.t+z.ph)*12*dt; if(z.vis.scene)z.vis.setPosition(z.x,z.y); },this); }}), st=c.est==='burn'?'burn':c.est==='blind'?'blind':'poison';
    for(var i=0;i<3;i++){ var y=F.y+F.h*(0.2+0.3*i)+(Math.random()-0.5)*40, x=dir>0?F.x+40:F.x+F.w-40, z=MX.zone(MX.A(c.S),{x:x,y:y,r:54,t:7,st:st,dps:c.dmg*0.12,col:st==='blind'?'#404050':'#a0b070',src:c.m}); z.ph=i*2; Z.push(z); } return a; },
  slick:function(c){ var a=BP2.act(c,{dur:c.tele+0.6}), n=c.q>=3?5:4; for(var i=0;i<n;i++){ var x=c.S.px+(Math.random()-0.5)*260, y=c.S.py+(Math.random()-0.5)*200; BP2.strike(c,a,x,y,34,c.tele*0.6+i*0.1,{m:0.3,col:'#c0f0ff',zone:'slow',zt:6}); } return a; },
  snare:function(c){ var a=BP2.act(c,{dur:c.tele+0.6}), A=MX.A(c.S); for(var i=0;i<5;i++){ var p=BP2.near(c.S,c.S.px+(Math.random()-0.5)*220,c.S.py+(Math.random()-0.5)*160), k=c.est==='poison'||c.est==='root'?'snare':'rune';
      (function(p){ a.at(c.tele*0.5+i*0.08,function(){ var g=c.S.add.circle(p.x,p.y,9,MX.col(c.ec),0.55).setStrokeStyle(2,0x000000,0.5).setDepth(A.depth(p.y)-0.02); BP2.mask(c.S,g); MX.fx(A).traps.push({x:p.x,y:p.y,k:'snare',arm:0.5,t:9,g:g,src:c.m,p:{k:'snare',t:1}}); }); })(p); } return a; },
  firelines:function(c){ var a=BP2.act(c,{dur:c.tele+3}), b={x:c.m.x,y:c.m.y}, base=BP2.aim(c,b.x,b.y), n=3, A=MX.A(c.S);
    for(var i=0;i<n;i++){ var an=base+(i-1)*0.5; MX.tele.line(A,b.x,b.y,an,320,c.ec,c.tele); for(var s=1;s<=8;s++)(function(an,s){ a.at(c.tele+s*0.12,function(){ var x=b.x+Math.cos(an)*s*40, y=b.y+Math.sin(an)*s*40; if(!BP2.ok(c.S,x,y))return; MX.zone(A,{x:x,y:y,r:20,t:3.5,st:'burn',dps:c.dmg*0.2,col:'#ff6a20',src:c.m}); if(Math.hypot(c.S.px-x,c.S.py-y)<22)BossPat.hurt(c.S,c,0.6,'🔥'); }); })(an,s); } return a; },
  columns:function(c){ var a=BP2.act(c,{dur:3.6}), n=c.q>=3?7:5; for(var i=0;i<n;i++)a.at(i*0.32,function(){ BP2.strike(c,a,c.S.px,c.S.py,28,0.62,{m:0.8,lb:'⚡'}); }); return a; },
  geysers:function(c){ var a=BP2.act(c,{dur:c.tele+4}), F=BP2.F(c.S), cx=F.x+F.w/2, cy=F.y+F.h/2, n=6, r0=Math.min(F.w,F.h)*0.32, st=c.est==='burn'?'burn':'slow';
    for(var i=0;i<n;i++){ var an=i/n*6.283; BP2.strike(c,a,cx+Math.cos(an)*r0,cy+Math.sin(an)*r0*0.8,34,c.tele+i*0.4,{m:0.9,zone:st,zt:2}); } return a; },
  // ── rushes ──
  charge:function(c){ var A=MX.A(c.S), a=BossPat.PAT.strafe(Object.assign({},c,{theme:''})); if(!a)return a; var k0=a.kill; a.kill=function(){ k0.apply(this,arguments); if(!c.m.dead){ var b=c.m, n=0; for(var r=24;r<=60;r+=12)for(var t=0;t<6.28;t+=0.8)if(!BP2.ok(c.S,b.x+Math.cos(t)*r,b.y+Math.sin(t)*r))n++; if(n>3){ BossPat.say(c.S,b.x,b.y-60,'It hits the wall!','#ffd080'); c.m._hold=Math.max(c.m._hold||0,1.6); BP2.open(c,1.8,'✦ Stunned — strike! ✦'); } } }; return a; },
  leap:function(c){ return BossPat.PAT.combo(c); },
  combo:function(c){ var a=BP2.act(c,{dur:c.tele+2.2,att:true}), r=64; [0,0.45,1.25].forEach(function(t,i){ a.at(c.tele*0.6+t,function(){ var b={x:c.m.x,y:c.m.y}, an=BP2.aim(c,b.x,b.y); BossPat.frame(c.m,'2');
      BP2.lane(c,a,b.x,b.y,an-0.001,r+40,i===2?110:70,i===2?0.55:0.3,{m:i===2?1.3:0.8,then:function(){ BossPat.frame(c.m,'3'); }}); }); }); return a; },
  whirl:function(c){ var A=MX.A(c.S), last=0, a=BP2.act(c,{dur:c.tele*0.5+2.6,att:true,step:function(dt,t){ var R=BossPat.rig(c.m); if(t<c.tele*0.5){ BossPat.frame(c.m,'2'); return; } if(t<c.tele*0.5+2.2){ BossPat.frame(c.m,(t*10|0)%2?'3':'2'); if(R&&R.body)R.body.setAngle((R.body.angle||0)+dt*900);
        var an=BP2.aim(c,c.m.x,c.m.y); BossPat.setPos(c.S,c.m,c.m.x+Math.cos(an)*95*dt*c.R.speed,c.m.y+Math.sin(an)*95*dt*c.R.speed); if(Math.hypot(c.S.px-c.m.x,c.S.py-c.m.y)<54&&t-last>0.5){ last=t; BossPat.hurt(c.S,c,0.7); } return; }
      if(!this.dz){ this.dz=1; if(R&&R.body)R.body.setAngle(0); BossPat.say(c.S,c.m.x,c.m.y-70,'dizzy…','#e0e0ff'); BP2.open(c,1.6,'✦ Dizzy — strike! ✦'); } }, kill:function(){ var R=BossPat.rig(c.m); if(R&&R.body)R.body.setAngle(0); }}); return a; },
  grab:function(c){ var a=BP2.act(c,{dur:c.tele+1.2,att:true}), A=MX.A(c.S), an=BP2.aim(c,c.m.x,c.m.y); MX.tele.cone(A,c.m.x,c.m.y,an,120,0.6,c.ec,c.tele+0.3); BossPat.frame(c.m,'2');
    a.at(c.tele+0.3,function(){ BossPat.frame(c.m,'3'); var dx=c.S.px-c.m.x, dy=c.S.py-c.m.y, d=Math.hypot(dx,dy), da=Math.abs(Math.atan2(Math.sin(Math.atan2(dy,dx)-an),Math.cos(Math.atan2(dy,dx)-an)));
      if(d<124&&da<0.62&&BossPat.hurt(c.S,c,1.1,'✊')){ BossPat.say(c.S,c.S.px,c.S.py-40,'Grabbed — thrown!','#ffb080'); MX.push(A,dx/(d||1),dy/(d||1),170); } }); return a; },
  slide:function(c){ return BossPat.PAT.strafe(Object.assign({},c,{theme:'fire'})); },
  tail:function(c){ var a=BP2.act(c,{dur:c.tele+0.8,att:true}), A=MX.A(c.S), an=BP2.aim(c,c.m.x,c.m.y); MX.tele.cone(A,c.m.x,c.m.y,an,150,1.3,c.ec,c.tele);
    a.at(c.tele,function(){ BossPat.frame(c.m,'3'); var dx=c.S.px-c.m.x, dy=c.S.py-c.m.y, d=Math.hypot(dx,dy), da=Math.abs(Math.atan2(Math.sin(Math.atan2(dy,dx)-an),Math.cos(Math.atan2(dy,dx)-an))); if(d<154&&da<1.32&&BossPat.hurt(c.S,c,1,'🦎'))MX.push(A,dx/(d||1),dy/(d||1),70); }); return a; },
  /* a shield raised to the front: blows from the front glance off; get round it (or break it with a heavy blow) */
  bash:function(c){ var g=null, face=BP2.aim(c,c.m.x,c.m.y), hp=0, a=BP2.act(c,{dur:6,keep:false,step:function(dt){ var want=Math.atan2(c.S.py-c.m.y,c.S.px-c.m.x), d=Math.atan2(Math.sin(want-face),Math.cos(want-face)); face+=Math.max(-1.1*dt,Math.min(1.1*dt,d));
      g.clear(); g.lineStyle(6,0xd8dce8,0.85); g.beginPath(); g.arc(c.m.x,c.m.y-16,40,face-0.9,face+0.9,false); g.strokePath(); g.lineStyle(2,MX.col(c.ec),0.9); g.beginPath(); g.arc(c.m.x,c.m.y-16,44,face-0.9,face+0.9,false); g.strokePath();
      c.m._p2face=face; if(hp>=3){ BossPat.say(c.S,c.m.x,c.m.y-70,'Shield broken!','#ffffff'); BP2.open(c,1.6); return true; } }, kill:function(){ c.m._p2face=undefined; c.m._p2guard=null; }});
    g=a.g(BossPat.D_FX); c.m._p2guard=function(d,kind){ var an=Math.atan2(c.S.py-c.m.y,c.S.px-c.m.x), df=Math.abs(Math.atan2(Math.sin(an-face),Math.cos(an-face))); if(df<0.95){ if(kind==='melee'&&d>(c.m.maxHp||1)*0.02)hp++; BossPat.say(c.S,c.m.x,c.m.y-60,'blocked — get behind it!','#e0e0e0'); return d*0.15; } return d; };
    BossPat.say(c.S,c.m.x,c.m.y-70,'🛡 Shield up!','#e0e0ff'); return a; },
  stampede:function(c){ var a=BP2.act(c,{dur:c.tele+1.6}), F=BP2.F(c.S), n=3, hz=Math.random()<0.5, w=58, A=MX.A(c.S);
    for(var i=0;i<n;i++){ var k=(i+0.5)/n+(Math.random()-0.5)*0.12; if(hz)BP2.lane(c,a,F.x,F.y+F.h*k,0,F.w,w,c.tele+0.3+i*0.2,{m:1,lb:'🐗'}); else BP2.lane(c,a,F.x+F.w*k,F.y,Math.PI/2,F.h,w,c.tele+0.3+i*0.2,{m:1,lb:'🐗'}); } return a; },
  duel:function(c){ var a=BP2.act(c,{dur:c.tele+2.4,att:true}), parried=0; BossPat.say(c.S,c.m.x,c.m.y-70,'A duel — shield as it strikes!','#ffe0a0');
    [0,0.6,1.2].forEach(function(t,i){ a.at(c.tele*0.6+t,function(){ var x=c.S.px, y=c.S.py; MX.tele.circle(MX.A(c.S),x,y,26,'#ffffff',0.45); BossPat.frame(c.m,'2');
      a.at(a.t+0.45,function(){ BossPat.frame(c.m,'3'); if(Math.hypot(c.S.px-x,c.S.py-y)<30){ if(c.S._shielding){ parried++; MX.fxRing(MX.A(c.S),c.S.px,c.S.py,22,'#ffffff'); BossPat.say(c.S,c.S.px,c.S.py-40,'parried!','#ffffff'); } else BossPat.hurt(c.S,c,0.8,'🤺'); } if(i===2&&parried>=2)BP2.open(c,2.2,'✦ Its guard is open! ✦'); }); }); }); return a; },
  // ── movement ──
  blink:function(c){ var a=BP2.act(c,{dur:c.tele+1.6,att:true}), A=MX.A(c.S); [0,0.8].forEach(function(t){ a.at(t,function(){ var an=Math.random()*6.28, p=BP2.near(c.S,c.S.px+Math.cos(an)*110,c.S.py+Math.sin(an)*90); MX.fxRing(A,c.m.x,c.m.y,26,'#e8d0ff'); MX.tele.circle(A,p.x,p.y,40,c.ec,0.5);
      a.at(a.t+0.5,function(){ if(BossPat.setPos(c.S,c.m,p.x,p.y)){ MX.fxRing(A,p.x,p.y,40,c.ec); if(Math.hypot(c.S.px-p.x,c.S.py-p.y)<44)BossPat.hurt(c.S,c,0.7); } }); }); }); return a; },
  burrow:function(c){ return BossPat.PAT.burrow(c); },
  dive:function(c){ var a=BossPat.PAT.burrow(c); return a; },
  vault:function(c){ var a=BP2.act(c,{dur:c.tele+2.2,att:true}), A=MX.A(c.S), F=BP2.F(c.S); a.at(0.1,function(){ var ex=c.S.px<F.x+F.w/2?F.x+F.w-50:F.x+50, p=BP2.near(c.S,ex,c.S.py); MX.fxRing(A,c.m.x,c.m.y,30,'#ffffff'); BossPat.setPos(c.S,c.m,p.x,p.y); MX.fxRing(A,p.x,p.y,30,c.ec);
      var an=BP2.aim(c,p.x,p.y), L=Math.hypot(F.w,F.h)*0.8; BP2.lane(c,a,p.x,p.y,an,L,60,c.tele+0.3,{m:1.1,then:function(){ var q=BP2.near(c.S,p.x+Math.cos(an)*L*0.85,p.y+Math.sin(an)*L*0.85); BossPat.setPos(c.S,c.m,q.x,q.y); BossPat.frame(c.m,'3'); }}); }); return a; },
  swoop:function(c){ var cont=c.m.cont, a=BossPat.PAT.strafe(Object.assign({},c,{theme:''})); if(!a)return a; if(cont)cont.setAlpha(0.5); var k0=a.kill; a.kill=function(){ k0.apply(this,arguments); if(cont&&cont.scene)cont.setAlpha(1); }; return a; },
  dash:function(c){ var a=BP2.act(c,{dur:c.tele+2,att:true}); [0,0.55,1.1].forEach(function(t){ a.at(c.tele*0.5+t,function(){ var b={x:c.m.x,y:c.m.y}, an=BP2.aim(c,b.x,b.y), L=Math.min(200,Math.hypot(c.S.px-b.x,c.S.py-b.y)+40);
      BP2.lane(c,a,b.x,b.y,an,L,46,0.35,{m:0.8,then:function(){ var q=BP2.near(c.S,b.x+Math.cos(an)*L,b.y+Math.sin(an)*L); BossPat.setPos(c.S,c.m,q.x,q.y); BossPat.frame(c.m,'3'); }}); }); }); return a; },
  phase:function(c){ var cont=c.m.cont, last=0, a=BP2.act(c,{dur:3,step:function(dt,t){ if(cont)cont.setAlpha(0.3); c.m._p2mist=true; var an=BP2.aim(c,c.m.x,c.m.y); c.m.x+=Math.cos(an)*70*dt; c.m.y+=Math.sin(an)*70*dt; var p=BP2.near(c.S,c.m.x,c.m.y); c.m.x=p.x; c.m.y=p.y; if(cont)cont.setPosition(c.m.x,c.m.y);
      if(Math.hypot(c.S.px-c.m.x,c.S.py-c.m.y)<40&&t-last>0.8){ last=t; BossPat.hurt(c.S,c,0.6,'👻'); } }, kill:function(){ c.m._p2mist=false; if(cont&&cont.scene)cont.setAlpha(1); BossPat.reach(c.S); }}); return a; },
  ride:function(c){ var a=BP2.act(c,{dur:c.tele+3.6,att:true}), F=BP2.F(c.S); [0,1.2,2.4].forEach(function(t,i){ a.at(t,function(){ var hz=i%2===0, y=c.S.py, x=c.S.px, from=hz?(Math.random()<0.5?F.x+30:F.x+F.w-30):(Math.random()<0.5?F.y+30:F.y+F.h-30);
      var p=BP2.near(c.S,hz?from:x,hz?y:from), an=hz?(from<F.x+F.w/2?0:Math.PI):(from<F.y+F.h/2?Math.PI/2:-Math.PI/2), L=hz?F.w-60:F.h-60; BossPat.setPos(c.S,c.m,p.x,p.y);
      BP2.lane(c,a,p.x,p.y,an,L,54,c.tele*0.8,{m:1.1,lb:'🐎',then:function(){ var q=BP2.near(c.S,p.x+Math.cos(an)*L,p.y+Math.sin(an)*L); BossPat.setPos(c.S,c.m,q.x,q.y); BossPat.frame(c.m,'3'); }}); }); }); return a; },
  stomp:function(c){ var a=BP2.act(c,{dur:3.4,att:true}); for(var i=0;i<4;i++)a.at(0.3+i*0.75,function(){ var an=BP2.aim(c,c.m.x,c.m.y); BossPat.setPos(c.S,c.m,c.m.x+Math.cos(an)*34,c.m.y+Math.sin(an)*34); BossPat.frame(c.m,'3');
      BP2.strike(c,a,c.m.x,c.m.y,74,0.32,{m:0.7,free:true}); try{ c.S.cameras.main.shake(120,0.006); }catch(e){} }); return a; },
  roll:function(c){ var A=MX.A(c.S), an=null, last=0, a=BP2.act(c,{dur:c.tele*0.5+2.8,att:true,step:function(dt,t){ var R=BossPat.rig(c.m); if(t<c.tele*0.5){ BossPat.frame(c.m,'2'); return; } if(an===null)an=BP2.aim(c,c.m.x,c.m.y);
      var nx=c.m.x+Math.cos(an)*230*dt*c.R.speed, ny=c.m.y+Math.sin(an)*230*dt*c.R.speed; if(!BP2.ok(c.S,nx,ny)||!BossPat.stand(c.S,nx,ny)){ an=BP2.aim(c,c.m.x,c.m.y)+(Math.random()-0.5)*0.6; MX.fxRing(A,c.m.x,c.m.y,26,c.ec); try{ c.S.cameras.main.shake(90,0.005); }catch(e){} } else { c.m.x=nx; c.m.y=ny; if(c.m.cont)c.m.cont.setPosition(nx,ny); }
      if(R&&R.body)R.body.setAngle((R.body.angle||0)+dt*720); if(Math.hypot(c.S.px-c.m.x,c.S.py-c.m.y)<46&&t-last>0.6){ last=t; BossPat.hurt(c.S,c,0.9); } }, kill:function(){ var R=BossPat.rig(c.m); if(R&&R.body)R.body.setAngle(0); BossPat.reach(c.S); }}); return a; },
  // ── summons ──
  minions:function(c){ var a=BP2.act(c,{dur:1.2}), rid=BP2.minionId(c); if(!rid||BP2.kids(c).length>=4)return null; a.at(0.6,function(){ var n=c.q>=3?3:2; for(var i=0;i<n;i++){ var an=i/n*6.28; BP2.spawn(c,rid,c.m.x+Math.cos(an)*60,c.m.y+Math.sin(an)*40); } }); return a; },
  beast:function(c){ var a=BP2.act(c,{dur:c.tele+1.6}), F=BP2.F(c.S), hz=Math.abs(c.S.px-c.m.x)>Math.abs(c.S.py-c.m.y), from=hz?(c.S.px>F.x+F.w/2?F.x:F.x+F.w):(c.S.py>F.y+F.h/2?F.y:F.y+F.h), an=hz?(from===F.x?0:Math.PI):(from===F.y?Math.PI/2:-Math.PI/2);
    BossPat.say(c.S,c.m.x,c.m.y-70,'It calls its beast!','#ffd0a0'); var x0=hz?from:c.S.px, y0=hz?c.S.py:from, L=hz?F.w:F.h; BP2.lane(c,a,x0,y0,an,L,56,c.tele+0.5,{m:1.1,lb:'🐺'});
    a.at(c.tele+0.4,function(){ BP2.dart(c,x0,y0,an,L/0.4,0.4,14); }); return a; },
  echoes:function(c){ return BossPat.PAT.mirror(c); },
  raise:function(c){ var a=BP2.act(c,{dur:3.2}), dead=(c.S.monsters||[]).filter(function(k){ return k&&k.dead&&!k.isBoss&&k.mx&&BP2.inA(c.S,k.x,k.y); }).slice(-3), rid=BP2.minionId(c); if(!rid)return null;
    var spots=dead.length?dead.map(function(k){ return {x:k.x,y:k.y,rid:k.rid||rid}; }):[0,1].map(function(i){ return {x:c.m.x+(i?60:-60),y:c.m.y+40,rid:rid}; }), A=MX.A(c.S), g=a.g(BossPat.D_TELE);
    BossPat.say(c.S,c.m.x,c.m.y-70,'The fallen stir — break their bones!','#e0d8c0');
    a.step=null; var st={}; a.ob.push({destroy:function(){}}); var step=function(){ g.clear(); spots.forEach(function(s,i){ if(st[i])return; if(BP2.swung(c.S,s.x,s.y,48)){ st[i]=1; MX.fxRing(A,s.x,s.y,20,'#ffffff'); BossPat.say(c.S,s.x,s.y-20,'bones broken','#ffffff'); return; } g.lineStyle(2,0xe0d8c0,0.8); g.strokeCircle(s.x,s.y,16+Math.sin(a.t*8)*3); g.fillStyle(0xe0d8c0,0.25); g.fillCircle(s.x,s.y,14); }); };
    for(var k=0;k<60;k++)a.at(k*0.05,step); a.at(3.05,function(){ g.clear(); spots.forEach(function(s,i){ if(!st[i])BP2.spawn(c,MON_BY_ID[s.rid]?s.rid:rid,s.x,s.y,{hpMult:0.4}); }); }); return a; },
  swarm:function(c){ var z=null, a=BP2.act(c,{dur:7,step:function(dt){ if(!z||!z.vis)return; var an=Math.atan2(c.S.py-z.y,c.S.px-z.x); z.x+=Math.cos(an)*62*dt; z.y+=Math.sin(an)*62*dt; if(z.vis.scene)z.vis.setPosition(z.x,z.y);
      if(BP2.swung(c.S,z.x,z.y,60)){ MX.fxRing(MX.A(c.S),z.x,z.y,40,'#ffffff'); BossPat.say(c.S,z.x,z.y-30,'scattered!','#ffffff'); z.t=0; return true; } }});
    a.at(0.4,function(){ z=MX.zone(MX.A(c.S),{x:c.m.x,y:c.m.y,r:36,t:7,st:'poison',dps:c.dmg*0.15,col:'#c0b060',src:c.m}); }); return a; },
  totems:function(c){ var base=BP2.minionId(c), id=base&&BP2.kin('totem',base,'still | shoot p=bolt n=1 spd=190 m=0.45 cd=2.6','Totem'); if(!id||BP2.kids(c).length>=4)return null; var a=BP2.act(c,{dur:1});
    a.at(0.5,function(){ for(var i=0;i<2;i++){ var an=(i?0.6:-0.6)+BP2.aim(c,c.m.x,c.m.y)+Math.PI, k=BP2.spawn(c,id,c.m.x+Math.cos(an)*110,c.m.y+Math.sin(an)*80,{hpMult:0.25,scale:0.8}); if(k&&k.spr)k.spr.setTint(0xc8b890); } }); BossPat.say(c.S,c.m.x,c.m.y-70,'Totems — break them!','#ffe0a0'); return a; },
  /* shield-bearers: while any of them stands, the boss takes a quarter of the damage */
  wardens:function(c){ var rid=BP2.minionId(c); if(!rid||BP2.kids(c).some(function(k){ return k._p2ward; }))return null; var W=[], g=null, a=BP2.act(c,{dur:30,step:function(){ W=W.filter(function(k){ return !k.dead; }); g.clear();
      if(!W.length){ BossPat.say(c.S,c.m.x,c.m.y-70,'The shield falls!','#ffffff'); return true; } g.lineStyle(3,0xd0e0ff,0.7); g.strokeCircle(c.m.x,c.m.y-20,46); W.forEach(function(k){ g.lineStyle(1.5,0xd0e0ff,0.45); g.lineBetween(k.x,k.y-10,c.m.x,c.m.y-20); }); }, kill:function(){ c.m._p2ward=null; }});
    g=a.g(BossPat.D_FX); a.at(0,function(){ for(var i=0;i<2;i++){ var k=BP2.spawn(c,rid,c.m.x+(i?70:-70),c.m.y+30,{hpMult:0.45}); if(k){ k._p2ward=true; W.push(k); } } }); c.m._p2ward=function(d){ return W.some(function(k){ return !k.dead; })?d*0.25:d; };
    BossPat.say(c.S,c.m.x,c.m.y-70,'🛡 Its shield-bearers guard it — fell them first!','#d0e0ff'); return a; },
  eggs:function(c){ var base=BP2.minionId(c), id=base&&BP2.kin('egg',base,'still','Egg'); if(!id)return null; var E=[], a=BP2.act(c,{dur:7});
    a.at(0.3,function(){ for(var i=0;i<3;i++){ var k=BP2.spawn(c,id,c.S.px+(Math.random()-0.5)*240,c.S.py+(Math.random()-0.5)*180,{hpMult:0.15,scale:0.6}); if(k){ if(k.spr)k.spr.setTint(0xf0e0c0); E.push(k); } } BossPat.say(c.S,c.m.x,c.m.y-70,'Eggs — break them before they hatch!','#ffe0a0'); });
    a.at(6.5,function(){ E.forEach(function(k){ if(k.dead)return; var x=k.x, y=k.y; try{ MX.A(c.S).kill(k); }catch(e){ k.dead=true; } BP2.spawn(c,base,x,y,{hpMult:0.4}); }); }); return a; },
  // ── the arena ──
  /* a brazier: strike it to light it; it flares, and if the boss stands near it burns it */
  use:function(c){ var a=BP2.act(c,{dur:12}), A=MX.A(c.S), F=BP2.F(c.S), B=[];
    for(var t=0;t<30&&B.length<2;t++){ var x=F.x+60+Math.random()*(F.w-120), y=F.y+60+Math.random()*(F.h-120); if(BP2.ok(c.S,x,y)&&Math.hypot(x-c.m.x,y-c.m.y)>90&&!B.some(function(b){ return Math.hypot(b.x-x,b.y-y)<160; }))B.push({x:x,y:y,lit:0}); }
    B.forEach(function(b){ b.v=BP2.prop(c,a,'bp_brazier',b.x,b.y,36,function(g){ g.fillStyle(0x4a4038,1); g.fillRect(b.x-9,b.y-20,18,20); g.fillStyle(0x6a5a48,1); g.fillEllipse(b.x,b.y-20,26,8); }); });
    BossPat.say(c.S,c.S.px,c.S.py-50,'Strike a brazier — lure it into the flames!','#ffd080'); var fg=a.g(BossPat.D_FX);
    a.step=null; for(var k=0;k<240;k++)a.at(k*0.05,function(){ fg.clear(); B.forEach(function(b){ if(!b.lit&&BP2.swung(c.S,b.x,b.y-10,46)){ b.lit=a.t; MX.fxRing(A,b.x,b.y,24,'#ffb040'); }
        if(b.lit){ var f=a.t-b.lit; fg.fillStyle(0xff9030,0.8); fg.fillCircle(b.x,b.y-26,7+Math.sin(a.t*14)*2); if(f<3){ fg.lineStyle(3,0xff8030,0.5); fg.strokeCircle(b.x,b.y,90); if(!b.hit&&Math.hypot(c.m.x-b.x,c.m.y-b.y)<94){ b.hit=1; BP2.boss(c,0.05,'🔥 burned'); BP2.open(c,2,'✦ It burns — strike! ✦'); } } } }); }); return a; },
  lure:function(c){ var p=BP2.near(c.S,(c.m.x+c.S.px)/2,(c.m.y+c.S.py)/2+40), w=BP2.cover(c,p.x,p.y,30,34,6,'#7a7060',BP2.pillar(c)); var a=BossPat.PAT.strafe(Object.assign({},c,{theme:''})); if(!a)return a;
    if(w)BossPat.say(c.S,p.x,p.y-40,'Lure it into the pillar!','#ffd080'); var u0=a.upd, hit=false; a.upd=function(dt){ if(!hit&&w&&Math.hypot(c.m.x-w.x,c.m.y-w.y)<44){ hit=true; BossPat.say(c.S,c.m.x,c.m.y-60,'Crash!','#ffd080'); c.m._hold=Math.max(c.m._hold||0,2); BP2.boss(c,0.03,'stunned'); BP2.open(c,2.2); return true; } return u0.call(this,dt); }; return a; },
  light:function(c){ var a=BossPat.PAT.eclipse(c); if(!a)return a; var u0=a.upd, B=[], fg=BossPat.gfx(c.S,BossPat.D_DARK+2), F=BP2.F(c.S), lit=0; for(var i=0;i<2;i++){ var p=BP2.near(c.S,F.x+F.w*(i?0.75:0.25),F.y+F.h*0.5); B.push({x:p.x,y:p.y,lit:false}); }
    a.upd=function(dt){ fg.clear(); B.forEach(function(b){ fg.fillStyle(b.lit?0xffa030:0x6a5a48,1); fg.fillCircle(b.x,b.y-10,b.lit?9:6); if(!b.lit&&BP2.swung(c.S,b.x,b.y,46)){ b.lit=true; lit++; MX.fxRing(MX.A(c.S),b.x,b.y,30,'#ffb040'); BP2.boss(c,0.03,'🕯 its shadow burns'); } }); if(lit>=2)return true; return u0.call(this,dt); };
    var k0=a.kill; a.kill=function(){ k0.apply(this,arguments); fg.destroy(); }; return a; },
  /* it splits: a shimmering half stands apart; strike it six times before it rejoins, or the boss mends */
  split:function(c){ var R=BossPat.rig(c.m), p=BP2.near(c.S,c.m.x+(c.S.px<c.m.x?120:-120),c.m.y), im=null, hits=0, a=BP2.act(c,{dur:9,step:function(){ if(!im)return; im.setAlpha(0.55+Math.sin(this.t*6)*0.15); if(BP2.swung(c.S,p.x,p.y-20,56)&&this.t-(this.lh||0)>0.3){ this.lh=this.t; hits++; MX.fxRing(MX.A(c.S),p.x,p.y-10,22,'#ffffff'); BossPat.say(c.S,p.x,p.y-60,'half '+hits+'/6','#ffffff');
        if(hits>=6){ BP2.boss(c,0.06,'✂ both halves fall'); BP2.open(c,2); return true; } } }});
    if(R&&R.body&&R.body.texture)im=a.own(c.S.add.image(p.x,p.y+(R.fy||0),R.body.texture.key,'0').setOrigin(R.body.originX,R.body.originY).setScale(R.body.scaleX,R.body.scaleY).setTint(MX.col(c.ec)).setAlpha(0.6).setDepth(MX.A(c.S).depth(p.y)));
    else { var g=a.g(MX.A(c.S).depth(p.y)); g.fillStyle(MX.col(c.ec),0.5); g.fillCircle(p.x,p.y-20,22); im={setAlpha:function(){}}; }
    BossPat.say(c.S,p.x,p.y-60,'It splits in two — strike the other half!','#ffe0a0'); a.at(8.9,function(){ if(hits<6){ var v=Math.round((c.m.maxHp||100)*0.06); c.m.hp=Math.min(c.m.maxHp,c.m.hp+v); if(c.B)c.B.lastHp=c.m.hp; BossPat.say(c.S,c.m.x,c.m.y-70,'the halves rejoin (+'+v+')','#ff9080'); } }); return a; },
  /* element stances: rock (blades glance off — use spells or arrows) and flame (spells glance off — use blades), swapping */
  stance:function(c){ var g=null, a=BP2.act(c,{dur:10,step:function(){ var k=Math.floor(this.t/5)%2; if(k!==this.k){ this.k=k; BossPat.say(c.S,c.m.x,c.m.y-74,k?'🔥 Flame stance — use your blade!':'🪨 Stone stance — use spells or arrows!',k?'#ffb080':'#d0c0a0'); }
      g.clear(); g.lineStyle(3,k?0xff8040:0xb0a080,0.8); g.strokeCircle(c.m.x,c.m.y-20,40+Math.sin(this.t*5)*3); }, kill:function(){ c.m._p2st=null; }}); g=a.g(BossPat.D_FX);
    c.m._p2st=function(d,kind){ var k=Math.floor(a.t/5)%2; if(k===0&&kind==='melee')return d*0.4; if(k===1&&(kind==='spell'||kind==='familiar'))return d*0.4; return d*1.15; }; return a; },
  event:function(c){ var a=BP2.act(c,{dur:14}), z=c.est==='burn'||c.est==='poison'?c.est:null; BossPat.say(c.S,c.m.x,c.m.y-70,'The arena stirs!','#ffd080');
    for(var w=0;w<4;w++)a.at(1+w*3.5,function(){ for(var i=0;i<3;i++)BP2.strike(c,a,c.S.px+(i?(Math.random()-0.5)*220:0),c.S.py+(i?(Math.random()-0.5)*160:0),26,1.1+i*0.12,{m:0.7,zone:z,zt:2.5}); }); return a; },
  // ── mind games ──
  curse:function(c){ var a=BP2.act(c,{dur:c.tele+1}), st=['reverse','shrink','frog','slow'][Math.floor(Math.random()*4)]; BossPat.say(c.S,c.m.x,c.m.y-70,'A curse — step out of the ring!','#e0a0ff'); BP2.strike(c,a,c.S.px,c.S.py,44,c.tele+0.4,{m:0.3,col:'#c080ff',st:st,stT:3,stV:0.5}); return a; },
  hide:function(c){ var cont=c.m.cont, n=0, a=BP2.act(c,{dur:4.5,step:function(dt,t){ if(cont)cont.setAlpha(Math.max(0.1,1-t*3)); if(t-(this.ft||0)>0.35){ this.ft=t; n++; var g=c.S.add.circle(c.m.x+(n%2?6:-6),c.m.y+8,4,MX.col(c.ec),0.8).setDepth(BossPat.D_TELE); BP2.mask(c.S,g); c.S.tweens.add({targets:g,alpha:0,duration:1600,onComplete:function(){ g.destroy(); }}); } },
      kill:function(){ if(cont&&cont.scene)c.S.tweens.add({targets:cont,alpha:1,duration:300}); }}); BossPat.say(c.S,c.m.x,c.m.y-70,'It hides — watch its footsteps!','#c0c0d0'); return a; },
  feint:function(c){ var a=BP2.act(c,{dur:c.tele+1.2}), A=MX.A(c.S), p1={x:c.S.px,y:c.S.py}, an=Math.random()*6.28, p2=BP2.near(c.S,c.S.px+Math.cos(an)*90,c.S.py+Math.sin(an)*90), tr=Math.random()<0.5, T=tr?p1:p2, Fk=tr?p2:p1, g=a.g(BossPat.D_TELE), R=48;
    for(var s=0;s<=10;s++)(function(s){ a.at(c.tele*s/10,function(){ g.clear(); [T,Fk].forEach(function(p){ g.fillStyle(MX.col(c.ec),0.2); g.fillCircle(p.x,p.y,R); g.lineStyle(2,MX.col(c.ec),0.7); g.strokeCircle(p.x,p.y,R); }); g.fillStyle(0xffffff,0.85); g.fillCircle(T.x,T.y-R*0.65,3+(s%2)); }); })(s);
    a.at(c.tele+0.05,function(){ g.clear(); MX.fxRing(A,T.x,T.y,R,c.ec); MX.fxRing(A,Fk.x,Fk.y,R*0.5,'#606060'); if(Math.hypot(c.S.px-T.x,c.S.py-T.y)<R+4)BossPat.hurt(c.S,c,1.2); }); return a; },
  mark:function(c){ var a=BP2.act(c,{dur:5.4}), A=MX.A(c.S), F=BP2.F(c.S), L=[], g=a.g(BossPat.D_TELE), cnt=4.6;
    for(var t=0;t<30&&L.length<2;t++){ var x=F.x+60+Math.random()*(F.w-120), y=F.y+60+Math.random()*(F.h-120); if(BP2.ok(c.S,x,y)&&!L.some(function(p){ return Math.hypot(p.x-x,p.y-y)<180; }))L.push({x:x,y:y}); }
    BossPat.say(c.S,c.S.px,c.S.py-54,'⏳ Doom mark — stand in the light!','#ffd080');
    for(var k=0;k<=46;k++)(function(k){ a.at(k*0.1,function(){ g.clear(); L.forEach(function(p){ g.fillStyle(0xfff0b0,0.22); g.fillCircle(p.x,p.y,44); g.lineStyle(3,0xfff0b0,0.9); g.strokeCircle(p.x,p.y,44); }); var r=cnt-k*0.1; g.lineStyle(3,MX.col(c.ec),0.9); g.strokeCircle(c.S.px,c.S.py-34,8+r*2); }); })(k);
    a.at(cnt,function(){ g.clear(); if(!L.some(function(p){ return Math.hypot(c.S.px-p.x,c.S.py-p.y)<46; })){ MX.fxRing(A,c.S.px,c.S.py,50,c.ec); BossPat.hurt(c.S,c,1.6,'⏳'); } else BossPat.say(c.S,c.S.px,c.S.py-40,'the light holds','#fff0b0'); }); return a; },
  slow:function(c){ var z=null, a=BP2.act(c,{dur:6,step:function(){ if(z&&z.vis&&z.vis.scene){ z.x=c.m.x; z.y=c.m.y; z.vis.setPosition(z.x,z.y); } }}); a.at(0.2,function(){ z=MX.zone(MX.A(c.S),{x:c.m.x,y:c.m.y,r:130,t:6,st:'slow',v:0.45,col:'#c0a0ff',src:c.m}); BossPat.say(c.S,c.m.x,c.m.y-70,'⌛ Time drags near it','#c0a0ff'); }); return a; },
  gravity:function(c){ var F=BP2.F(c.S), cx=c.m.x, cy=c.m.y, A=MX.A(c.S), deb=[], last=0, g=null, a=BP2.act(c,{dur:c.tele*0.5+3.4,step:function(dt,t){ g.clear(); var C=MX.col(c.ec); g.lineStyle(2,C,0.6); g.strokeCircle(cx,cy,20+Math.sin(t*6)*4); if(t<c.tele*0.5)return;
      var dx=cx-c.S.px, dy=cy-c.S.py, d=Math.hypot(dx,dy); if(d>30&&MX.canPull(A))MX.push(A,dx/d,dy/d,Math.min(d-30,46*dt));
      for(var i=0;i<6;i++){ var an=t*2.2+i*1.047, r=70+Math.sin(t*1.3+i)*24, x=cx+Math.cos(an)*r, y=cy+Math.sin(an)*r*0.8; g.fillStyle(C,0.9); g.fillCircle(x,y,6); if(Math.hypot(c.S.px-x,c.S.py-y)<14&&t-last>0.6){ last=t; BossPat.hurt(c.S,c,0.6); } } }}); g=a.g(BossPat.D_FX); BossPat.say(c.S,cx,cy-70,'It pulls — walk against it!','#d0b0ff'); return a; },
  roar:function(c){ var a=BP2.act(c,{dur:c.tele+0.6,att:true}), A=MX.A(c.S), R=170; MX.tele.circle(A,c.m.x,c.m.y,R,'#ffffff',c.tele); BossPat.frame(c.m,'2');
    a.at(c.tele,function(){ BossPat.frame(c.m,'3'); MX.fxRing(A,c.m.x,c.m.y,R,'#ffffff'); try{ c.S.cameras.main.shake(380,0.012); if(typeof ZSFX!=='undefined')ZSFX.play('roar'); }catch(e){} var dx=c.S.px-c.m.x, dy=c.S.py-c.m.y, d=Math.hypot(dx,dy);
      if(d<R){ if(c.S._shielding){ BossPat.say(c.S,c.S.px,c.S.py-40,'braced!','#ffffff'); return; } MX.push(A,dx/(d||1),dy/(d||1),Math.min(110,R-d+30)); c.S.playerAtkTimer=Math.max(c.S.playerAtkTimer||0,1); BossPat.say(c.S,c.S.px,c.S.py-40,'staggered by the roar','#ffd0a0'); } }); return a; }
};
// the state kinds run beside the boss's attacks; these do too
['drift','swarm','slow','hide','crumble','event','totems','wardens','eggs','use','split','stance','bash'].forEach(function(k){ BP2.STATE[k]=1; });
Object.keys(BP2.PAT).forEach(function(k){ if(k[0]==='_')return; BossPat.PAT['p2_'+k]=function(c){ return BP2.PAT[k](c); }; });

// ═════════ the director: the plan applied to each boss as it wakes ═════════
BP2.apply=function(S,m){ var E=BP2.plan(m), B=m._bp; if(!E||!B||B.p2)return; B.p2=E; var keep=BP2.keep(E), sl=BossPat.slotOf(m), I=sl&&BossAtk.forSlot(sl);
  var list=[], el=BP2.elOf(E), sig=I?I.list:B.list;
  keep.forEach(function(e){ if(e[0]==='s'&&sig[e[1]])list.push(sig[e[1]]); else if(e[0]==='n'){ if(BP2.MOD[e[1]]){ B['p2_'+e[1]]=1; return; } list.push('p2_'+e[1]+':'+((E.el&&E.el[0])||'')); } });
  if(list.length)B.list=list; B.i=Math.floor(Math.random()*B.list.length);
  if(!keep.some(function(e){ return e[0]==='d'; }))B.desp=null;
  B.ec=el.c; B.est=el.st; B.p2keep=keep;
  // today's kit attacks that make way (and those the difficulty leaves out)
  if(m.mx&&m.kit){ var drop=(E.kd||[]).slice(); E.r.forEach(function(e){ if(e[0]==='k'&&keep.indexOf(e)<0)drop=drop.concat(e[1]); });
    if(drop.length){ var k={move:m.kit.move,atk:m.kit.atk.slice(),def:m.kit.def.slice()}; drop.forEach(function(t){ var P=MX.parse('still | '+t); P.atk.concat(P.def).forEach(function(D){ ['atk','def'].forEach(function(w){ var i=k[w].findIndex(function(x){ return x.name===D.name&&JSON.stringify(x.p)===JSON.stringify(D.p); }); if(i>=0)k[w].splice(i,1); }); }); }); m.kit=k; } }
  // the arena events and bars the difficulty leaves out (the phase's own list was set at spawn)
  if(m.bars){ var kb=keep.filter(function(e){ return e[0]==='b'; }).map(function(e){ return e[1]; }); if(E.r.some(function(e){ return e[0]==='b'; }))m.bars=m.bars.filter(function(b,i){ return kb.indexOf(i)>=0; }); }
  if(S._bpEv&&E.r.some(function(e){ return e[0]==='e'; })){ var ke=keep.filter(function(e){ return e[0]==='e'; }).map(function(e){ return e[1]; }); S._bpEv=S._bpEv.filter(function(ev,i){ return ev._p2||ke.indexOf(i)>=0; }); }
  m._p2plan=E; };
// the extra (or lesser) damage the new elements deal out: a weak point open, the wardens' shield, the shield stance, the element stances, mist
BP2.mod=function(m,d,kind){ var B=m._bp; if(m._p2mist)return d*0.2; if(m._p2ward)d=m._p2ward(d,kind); if(m._p2guard)d=m._p2guard(d,kind); if(m._p2st)d=m._p2st(d,kind); if(B&&B.p2w>0)d*=1.6; return d; };
(function(){
  if(typeof BossPat==='undefined')return;
  var i0=BossPat.init; BossPat.init=function(S,m){ var r=i0.apply(this,arguments); try{ BP2.apply(S,m); }catch(e){ console.warn('bp2 apply',e); } return r; };
  // the run: element colour for the new ones; the states run beside the boss's attacks; on the beat if it keeps one
  var r0=BossPat.run; BossPat.run=function(S,m,name,B,o){ var k=String(name).split(':')[0].replace(/^p2_/,''); if(B&&B.p2){ var E=B.p2, el=BP2.elOf(E); o=Object.assign({ec:el.c,est:el.st,E:E},o||{});
      if(B.p2_rhythm&&o.tele===undefined){ var RP=ZDiff.ramp(BossPat.q(S)); o.tele=Math.max(BP2.BEAT,Math.round(RP.tele/BP2.BEAT)*BP2.BEAT); } }
    else o=Object.assign({ec:(B&&B.col)||'#ffd080',est:null},o||{});
    if(/^p2_/.test(name)&&BP2.STATE[k]&&(S._bpAct||[]).some(function(x){ return x.boss===m&&x.p2k===k&&!x.cut; })){ var alt=B.list.filter(function(x){ return !/^p2_/.test(x)||!BP2.STATE[x.split(':')[0].slice(3)]; }); if(!alt.length)return null; name=alt[Math.floor(Math.random()*alt.length)]; k=''; }
    if(/^p2_/.test(name)&&BP2.STATE[k]){ var F=BossPat.PAT[name.split(':')[0]], q=BossPat.q(S), RP2=ZDiff.ramp(q), ctx=Object.assign({S:S,m:m,B:B,q:q,R:RP2,theme:'',col:B.col,dmg:(m.def.atk||10)*RP2.dmg,tele:RP2.tele*(B.enraged?0.85:1)},o);
      var act=F&&F(ctx); if(!act){ return r0.call(this,S,m,B.list.filter(function(x){ return !/^p2_/.test(x)||!BP2.STATE[x.split(':')[0].slice(3)]; })[0]||'quake',B,o); } act.boss=m; act.attached=false; act.p2k=k; S._bpAct.push(act); B.t=Math.min(B.t||2,1.6); return act; }
    var a=r0.call(this,S,m,name,B,o); if(!a&&/^p2_/.test(name)&&B){ /* nothing to do now (eg. already four minions): the next one */ B.t=0.4; } return a; };
  // the director: weak points after big moves, the beat, the damage rules
  var t0=BossPat.tick; BossPat.tick=function(S,dt){ var r=t0.apply(this,arguments); try{ BP2.tick(S,dt); }catch(e){ if(!BP2._wt){ BP2._wt=1; console.warn('bp2 tick',e); } } return r; };
})();
BP2.tick=function(S,dt){ if(!BP2.on||!S.monsters)return; S.monsters.forEach(function(m){ var B=m&&m._bp; if(!B||!B.p2||m.dead)return;
    // a big move done: every second one leaves a weak point open (if this form has one)
    if(B.p2_weak){ if(B.busy>0)B._wb=1; else if(B._wb){ B._wb=0; B._wn=(B._wn||0)+1; if(B._wn%2===0){ B.p2w=2.8; BossPat.say(S,m.x,m.y-90,'👁 A weak point shows — strike it!','#fff0a0'); } } }
    if(B.p2w>0){ B.p2w-=dt; var R=BossPat.rig(m), g=B._wg||(B._wg=BossPat.gfx(S,BossPat.D_FX)); g.clear(); if(B.p2w>0){ var y=m.y-(R?R.D.h*0.55:40); g.fillStyle(0xfff0a0,0.35+0.25*Math.sin(Date.now()/90)); g.fillCircle(m.x,y,12); g.lineStyle(2,0xffffff,0.9); g.strokeCircle(m.x,y,15); } }
    else if(B._wg){ B._wg.clear(); }
    // the beat: a pulse on the boss, and its next attack waits for the beat
    if(B.p2_rhythm){ var ph=(S.time?S.time.now/1000:Date.now()/1000)%BP2.BEAT; if(B.t>0&&B.t<=dt){ var tb=BP2.BEAT-ph; if(tb>dt*1.5)B.t=tb; } if(ph<dt&&!B.busy){ try{ MX.fxRing(MX.A(S),m.x,m.y,30,B.ec||'#ffd080'); }catch(e){} } }
    // the damage rules for the old realm guardians (not monster-engine bodies): applied to the health they just lost
    if(!m.mx){ var hp=m.hp; if(B._p2hp!==undefined&&hp<B._p2hp-0.01){ var d=B._p2hp-hp, kind=Math.hypot(S.px-m.x,S.py-m.y)<95?'melee':'ranged', d2=BP2.mod(m,d,kind); if(Math.abs(d2-d)>0.01){ m.hp=Math.max(d2>d?1:0.5,B._p2hp-d2); if(B)B.lastHp=m.hp; } } B._p2hp=m.hp; }
  }); };
// the monster-engine bodies: the damage rules where the hit is counted (09-monster-engine calls MX.dmgMod)
MX.dmgMod=function(mon,d,kind){ return (mon&&mon._bp&&mon._bp.p2)?BP2.mod(mon,d,kind):d; };
// a swing of the blade (seekers, returned orbs, braziers, bones and the other half are struck with it)
(function(){ if(typeof ZHit==='undefined'||!ZHit.swing)return; var s0=ZHit.swing; ZHit.swing=function(){ BP2.swingT=Date.now(); return s0.apply(this,arguments); }; })();

// ═════════ the phase spawn: bars, events and allies the plan leaves out ═════════
(function(){ if(typeof BossPhases==='undefined')return; var sp=BossPhases.spawn; BossPhases.spawn=function(scene,key,phase,x,y,mult){ var BP=BOSS_PHASES[key], P=BP&&BP.phases[phase-1]; if(!BP2.on||!P||typeof BP2D==='undefined')return sp.apply(this,arguments);
    var E=BP2D.slots[key]||BP2D.slots[P.form]; if(!E)return sp.apply(this,arguments); var keep=BP2.keep(E), Q=Object.assign({},P);
    if(E.r.some(function(e){ return e[0]==='b'; })||P.bars){ var kb=keep.filter(function(e){ return e[0]==='b'; }).map(function(e){ return e[1]; }); Q.bars=(P.bars||[]).filter(function(b,i){ return kb.indexOf(i)>=0; }); if(!Q.bars.length)delete Q.bars; }
    if(P.ev){ var ke=keep.filter(function(e){ return e[0]==='e'; }).map(function(e){ return e[1]; }); Q.ev=P.ev.filter(function(e,i){ return ke.indexOf(i)>=0; }); }
    if(E.ad)Q.allies=[];
    BP.phases[phase-1]=Q; try{ return sp.apply(this,arguments); } finally { BP.phases[phase-1]=P; } }; })();

// ═════════ how it travels (09u): only magic blinks — the others leap, stomp, charge, dive, burrow, drift or swoop ═════════
BP2.MOVE={ blink:0, stomp:'leap', leap:'leap', vault:'leap', charge:'rush', dash:'rush', stampede:'rush', hook:'rush', dive:'sink', burrow:'sink', phase:'mist', swoop:'fly' };
BP2.travel=function(A,mon){ var E=mon&&(mon._p2plan||BP2.plan(mon)); return E&&BP2.MOVE[E.mv]||null; };
(function(){ var wrap=function(){ if(typeof BMOVE==='undefined'||BMOVE._p2)return; BMOVE._p2=1; var g0=BMOVE.go; BMOVE.go=function(A,mon,m,P,side){ var ok=g0.apply(this,arguments); if(!ok||!m._bmv)return ok; var k=BP2.travel(A,mon); if(!k)return ok;
      var S=A.scene, to=m._bmv.to, cont=mon.cont, x0=mon.x, y0=mon.y, T=k==='sink'?0.7:k==='mist'?0.8:0.5; m._bmv.t=T; m.invuln=Math.max(m.invuln||0,T+0.2); m._bmv.k=k;
      try{ if(cont){ S.tweens.killTweensOf(cont); cont.setAlpha(1); }
        if(k==='leap'||k==='rush'||k==='fly'){ if(cont)S.tweens.add({targets:cont,x:to.x,y:to.y,duration:T*1000,ease:k==='rush'?'Quad.easeIn':'Sine.easeInOut'}); if(k==='leap'&&cont)S.tweens.add({targets:cont,scaleX:1.15,scaleY:1.15,yoyo:true,duration:T*500}); if(k==='fly'&&cont)cont.setAlpha(0.6);
          MX.tele.circle(A,to.x,to.y,k==='leap'?52:34,'#ffd0a0',T); for(var i=0;i<6;i++)MX.fxDot(A,x0+(to.x-x0)*i/6,y0+(to.y-y0)*i/6,'#c8b090',0.7); }
        else if(k==='sink'){ if(cont)S.tweens.add({targets:cont,alpha:0,duration:220}); MX.fxRing(A,x0,y0,30,'#c0a070'); MX.tele.circle(A,to.x,to.y,40,'#c0a070',T); }
        else if(k==='mist'){ if(cont)S.tweens.add({targets:cont,alpha:0.25,x:to.x,y:to.y,duration:T*1000}); }
        S.time.delayedCall(T*1000+20,function(){ if(mon.dead)return; if(cont){ cont.setAlpha(1); cont.setScale(1); } if(k==='leap'||k==='sink'){ MX.fxRing(A,to.x,to.y,k==='leap'?52:40,k==='leap'?'#ffd0a0':'#c0a070'); try{ S.cameras.main.shake(140,0.006); }catch(e){}
            var Q=A.p(); if(Math.hypot(Q.x-to.x,Q.y-to.y)<(k==='leap'?54:42))A.hurt((mon.def&&mon.def.atk||10)*0.6,'',k==='leap'?'#ffd0a0':'#c0a070'); } }); }catch(e){}
      return ok; }; };
  if(typeof BossPat!=='undefined'){ var i1=BossPat.init; BossPat.init=function(){ wrap(); return i1.apply(this,arguments); }; } })();
