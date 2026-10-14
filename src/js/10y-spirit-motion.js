// ═══════════════════════════════════════════════════════════════════════
// ║ 10y-spirit-motion.js — round 54c: the spirits move naturally.
// ║ Kris: "All of the spirits are selected and good, they just need to have some natural movements added in. for the groups, we need to work on
// ║ the movement, but this is going in the right direction. generate enough variety for when all the spirits are released."
// ║ ZSPM.make(scene, pictureId, x, footY, 'bound'|'free') builds a living spirit from one painted picture (wave 55, sp_u_<name>_bound/_free):
// ║  · the picture is cut at the waist into two layers, so the body can move against its wisp (no seam: the cut overlaps);
// ║  · its shadow stays on the ground while the spirit floats;
// ║  · BOUND — a digging rhythm: wind-up (leans back, rises), a quick strike (forward, squashed), dust and sparks at the rock, recover;
// ║    every few strikes a weary pause (slumps, slow heavy breathing); each spirit keeps its own tempo;
// ║  · FREE — floats and breathes, the body sways while the wisp ripples, a soft glow pulses, it turns to face the way it drifts, and now
// ║    and then gives a little happy bounce;
// ║  · everything runs every frame on the scene's update (the old shrine code moved spirits four times a second).
// ║ ZGREEN (below) runs the Runestone Green: the freed spirits wander, meet at gathering spots and form groups (the painted group loops when
// ║ they are in — wave 56 — or the still group pictures with life added in code), stay a while, then drift apart again.
// ═══════════════════════════════════════════════════════════════════════
var ZSPM={ CUT:0.5,
  _reg:function(scene){ if(scene._zspm)return scene._zspm; var L=scene._zspm=[], last=0;
    var f=function(time){ var t=time/1000, dt=last?Math.min(0.05,t-last):0.016; last=t; for(var i=L.length-1;i>=0;i--){ var C=L[i]; if(!C.scene||!C.active){ L.splice(i,1); continue; } try{ ZSPM.step(C,t,dt); }catch(e){} } };
    scene.events.on('update',f); scene.events.once('shutdown',function(){ scene.events.off('update',f); scene._zspm=null; }); return L; },
  // the living spirit: container [shadow, body[low, upperPivot[up]], glow]
  make:function(scene,id,x,y,mode,o){ var Z=typeof _scn==='function'?_scn():null; if(!Z||!Z.has||!Z.has(id))return null; o=o||{};
    var h=Z.size(id,0).h*(Z.K||1)*(o.k||1), T=Z.texture(scene,id,h,{shadow:false}); if(!T)return null; var tex=scene.textures.get(T.key), src=tex.getSourceImage(), fw=src.width, fh=src.height, s=T.scale, Hd=fh*s;
    var C=scene.add.container(x,y), cut=ZSPM.CUT, waistUp=(Hd-5)*(1-cut), wyF=Math.round((Hd-5-waistUp)/s);      // waist: cut fraction of the figure from the top
    var sh=scene.add.ellipse(0,0,T.w*0.5,Math.max(5,T.w*0.12),0x000000,0.28); C.add(sh);
    var B=scene.add.container(0,0); C.add(B);
    var low=scene.add.image(0,5,T.key).setOrigin(0.5,1).setScale(s); low.setCrop(0,wyF,fw,fh-wyF); B.add(low);
    var UP=scene.add.container(0,-waistUp); B.add(UP);
    var up=scene.add.image(0,5+waistUp,T.key).setOrigin(0.5,1).setScale(s); up.setCrop(0,0,fw,wyF+Math.round(3/s)); UP.add(up);
    var glow=null; if(mode==='free'){ glow=scene.add.image(0,5,T.key).setOrigin(0.5,1).setScale(s*1.04).setBlendMode(Phaser.BlendModes.ADD).setAlpha(0); B.add(glow); }
    C._m={mode:mode,B:B,UP:UP,low:low,up:up,sh:sh,glow:glow,Hd:Hd,w:T.w,ph:Math.random()*10,tempo:0.85+Math.random()*0.4,x0:x,y0:y,face:1,hop:0,id:id};
    if(o.depth!==undefined)C.setDepth(o.depth); ZSPM._reg(scene).push(C); return C; },
  // set the place a free spirit should drift to (it eases there, turning to face its way)
  goTo:function(C,x,y,speed){ var m=C._m; m.tx=x; m.ty=y; m.spd=speed||16; },
  step:function(C,t,dt){ var m=C._m, B=m.B, UP=m.UP; if(!m)return;
    if(m.mode==='bound'){ var per=1.55/m.tempo, u=((t+m.ph)/per), cyc=Math.floor(u), f=u-cyc, rest=(cyc%5)===4;
      if(rest){ // a weary pause: slumps, heavy slow breathing, the pick resting
        var br=Math.sin(f*Math.PI*2); B.rotation=0.03; B.y=1.5; B.scaleY=1-0.012-0.012*br; B.scaleX=1+0.006*br; UP.rotation=0.05+0.03*br; m.struck=false; }
      else{ var lean, rise, sq=1; // wind-up 0–0.55, strike 0.55–0.66, recover
        if(f<0.55){ var a=Math.sin(f/0.55*Math.PI/2); lean=-0.09*a; rise=-2.5*a; }
        else if(f<0.66){ var b=(f-0.55)/0.11; lean=-0.09+0.21*b; rise=-2.5+3.5*b; sq=1-0.05*b; }
        else { var c=(f-0.66)/0.34, e=1-Math.pow(1-c,2); lean=0.12*(1-e); rise=1*(1-e); sq=0.95+0.05*e; }
        B.rotation=lean*0.55; UP.rotation=lean*0.6; B.y=rise; B.scaleY=sq; B.scaleX=1+(1-sq)*0.6;
        if(f>=0.62&&!m.struck){ m.struck=true; ZSPM.dust(C); } if(f<0.5)m.struck=false; }
      return; }
    // FREE: drift towards the target, float, sway, ripple, glow
    if(m.tx!==undefined){ var dx=m.tx-C.x, dy=m.ty-C.y, d=Math.hypot(dx,dy); if(d>1.5){ var v=Math.min(d,m.spd*dt*(0.7+0.3*Math.sin(t*1.3+m.ph))); C.x+=dx/d*v; C.y+=dy/d*v; if(Math.abs(dx)>2)m.face=dx>0?1:-1; } else { m.tx=undefined; } if(C.scene&&typeof WR_DEPTH==='function')C.setDepth(WR_DEPTH(C.y)); }
    var fl=Math.sin((t+m.ph)*1.9)*3.2-4.5;      // float height above the shadow
    if(m.hop>0){ m.hop=Math.max(0,m.hop-dt); fl-=Math.sin((1-m.hop/0.6)*Math.PI)*7; } else if(Math.random()<dt*0.04){ m.hop=0.6; }      // now and then a little happy bounce
    var br2=Math.sin((t+m.ph)*1.3);
    B.y=fl; B.scaleX=(1+0.012*br2)*m.face; B.scaleY=1-0.012*br2;
    UP.rotation=Math.sin((t+m.ph)*0.9)*0.045+(m.hop>0?Math.sin(m.hop*20)*0.03:0);
    m.low.x=Math.sin((t+m.ph)*3.1)*1.4; m.low.scaleX=m.up.scaleX*(1+0.035*Math.sin((t+m.ph)*2.3));
    m.sh.scaleX=1-(-fl)*0.025; m.sh.alpha=0.3-(-fl)*0.012;
    if(m.glow)m.glow.alpha=0.10+0.10*Math.sin((t+m.ph)*1.7); },
  // dust and two sparks where the pick bites the rock (only when it can be seen)
  dust:function(C){ var sc=C.scene, cam=sc&&sc.cameras&&sc.cameras.main; if(!cam||!cam.worldView.contains(C.x,C.y))return; var m=C._m, side=m.face||1, px=C.x-m.w*0.28*side, py=C.y-4;
    for(var i=0;i<4;i++){ var p=sc.add.circle(px+(Math.random()-0.5)*8,py,2+Math.random()*2.5,0xb8a890,0.7).setDepth(C.depth+0.001); sc.tweens.add({targets:p,x:p.x+(Math.random()-0.5)*22,y:py-6-Math.random()*10,alpha:0,scale:1.8,duration:420+Math.random()*200,onComplete:function(){ this.targets[0].destroy(); }}); }
    for(var j=0;j<2;j++){ var s=sc.add.circle(px,py-3,1.5,0xfff0a0,1).setDepth(C.depth+0.002); sc.tweens.add({targets:s,x:px+(Math.random()-0.5)*26,y:py-10-Math.random()*14,alpha:0,duration:260,onComplete:function(){ this.targets[0].destroy(); }}); } }
};

// ═══════════════════════════════════════════════════════════════════════
// ║ ZGREEN — the freed spirits on the Runestone Green.
// ║  · Every freed spirit is there as itself (its own picture, ZSPM 'free'), wandering slowly between open spots on the green.
// ║  · Gathering spots ring the green. Now and then a few spirits drift to a spot together; when they arrive they fade into a GROUP scene
// ║    there (one of Kris's picked groups — the painted 4-frame loop gl_<group> once wave 56 is in, else the still picture made to breathe
// ║    and sway), it stays a while, then fades and the same spirits drift off again.
// ║  · The more spirits are free, the more groups at once (one per 7 freed, at most 4), never the same group twice at once.
// ═══════════════════════════════════════════════════════════════════════
var ZGREEN={
  // Kris's picks (Lab → Spirits & stones): round one Ring dance, Family, Honour guard; round two all but the evening stroll; wave 56 adds eight more in the same spirit
  GROUPS:[['ring','sp_grp_ring',6],['family','sp_grp_family',4],['guard','sp_grp_guard',5],['hearth_tale','sp_g2_hearth_tale',5],['reel','sp_g2_reel',6],['sparring','sp_g2_sparring',4],['mead_bench','sp_g2_mead_bench',4],['tafl','sp_g2_tafl',5],['tag','sp_g2_tag',5],
    ['glima',null,4],['archery',null,4],['skald',null,6],['lantern_parade',null,5],['weaving',null,4],['roast',null,5],['knattleikr',null,5],['rune_carving',null,3]],
  BOUND:[['chaingang','sp_grp_chaingang'],['haul','sp_g2_haul']],
  picOf:function(scene,g){ var Z=_scn(); if(typeof ZWE!=='undefined'){ var A=ZWE.animTex(scene,'gl_'+g[0]); if(A)return {anim:A}; } return g[1]&&Z.has(g[1])?{still:g[1]}:null; },
  center:function(){ return {x:CENTER_X*TILE+16, y:CENTER_Y*TILE+16}; },
  // open places on the green (passable tiles), computed once
  spots:function(ws){ if(ws.wd._gSpots)return ws.wd._gSpots; var c=ZGREEN.center(), out=[], wd=ws.wd, ok=function(tx,ty,r){ for(var y=-r;y<=r;y++)for(var x=-r-1;x<=r+1;x++){ var t=(wd.tiles[ty+y]||[])[tx+x]; if(t===undefined||!canPassTile(t))return false; } return true; };
    for(var i=0;i<24;i++){ var a=i/24*Math.PI*2+0.13; for(var rr=7.5;rr<=12;rr+=1.5){ var tx=Math.round(CENTER_X+Math.cos(a)*rr), ty=Math.round(CENTER_Y+Math.sin(a)*rr*0.85); if(ok(tx,ty,1)){ out.push({x:tx*TILE+16,y:ty*TILE+16,a:a}); break; } } }
    var keep=[]; out.forEach(function(p){ if(!keep.some(function(q){ return Math.hypot(q.x-p.x,q.y-p.y)<TILE*5; }))keep.push(p); }); return (ws.wd._gSpots=keep); },
  wander:function(ws,home){ var c=ZGREEN.center(), wd=ws.wd; for(var k=0;k<12;k++){ var a=home===undefined?Math.random()*Math.PI*2:home+(Math.random()-0.5)*1.4, r=TILE*(3.6+Math.random()*6.5), x=c.x+Math.cos(a)*r, y=c.y+Math.sin(a)*r*0.8, t=(wd.tiles[Math.floor(y/TILE)]||[])[Math.floor(x/TILE)]; if(t!==undefined&&canPassTile(t))return {x:x,y:y}; } return {x:c.x+TILE*4,y:c.y}; },
  tick:function(ws){ var ps=ws.playerState, c=ZGREEN.center(), near=Math.hypot(ws.player.x-c.x,ws.player.y-c.y)<1500, S=ws._zg||(ws._zg={sp:{},groups:[],next:0});
    if(!near){ ZGREEN.clear(ws); return; }
    var freed=(ps.spiritsFreed||[]).slice(0,40), shr=ZSPIRIT.shrines(ws), now=Date.now()/1000;
    // each freed spirit, as itself
    freed.forEach(function(fid,i){ if(S.sp[fid])return; var s=shr.find(function(q){ return q.id===fid; }); if(!s)return; var home=i*2.39996, p=ZGREEN.wander(ws,home), id=ZSPIRIT.uniqueId(s,'free'), o=id?ZSPM.make(ws,id,p.x,p.y,'free',{depth:WR_DEPTH(p.y)}):null;
      if(!o){ o=ZSPIRIT._spiritSprite(ws,p.x,p.y,'free',WR_DEPTH(p.y),s); if(o)o._legacy=1; } if(!o)return; o.setAlpha(0); ws.tweens.add({targets:o,alpha:0.95,duration:900}); S.sp[fid]={o:o,s:s,busy:false,home:home,next:now+Math.random()*6}; });
    // wandering
    Object.keys(S.sp).forEach(function(k){ var e=S.sp[k]; if(e.busy||now<e.next)return; e.next=now+8+Math.random()*14; var p=ZGREEN.wander(ws,e.home); if(e.o._m)ZSPM.goTo(e.o,p.x,p.y,10+Math.random()*10); else ws.tweens.add({targets:e.o,x:p.x,y:p.y,duration:6000,ease:'Sine.inOut'}); });
    // groups: form, hold, part
    var want=Math.min(4,Math.floor(freed.length/7)), spots=ZGREEN.spots(ws);
    S.groups=S.groups.filter(function(G){ if(now<G.until)return true; ZGREEN.part(ws,G); return false; });
    if(S.groups.length<want&&now>S.next&&spots.length){ S.next=now+6+Math.random()*8; ZGREEN.form(ws,S,spots,now); }
    S.groups.forEach(function(G){ if(G.stage==='gather'&&(G.who.every(function(e){ return !e.o._m||e.o._m.tx===undefined; })||now>G.t0+14)){ ZGREEN.show(ws,G); G.stage='held'; G.until=now+25+Math.random()*25; } });
  },
  form:function(ws,S,spots,now){ var used={}, taken={}; S.groups.forEach(function(G){ used[G.g[0]]=1; taken[G.spot.x+','+G.spot.y]=1; });
    var free=Object.keys(S.sp).map(function(k){ return S.sp[k]; }).filter(function(e){ return !e.busy; }), opts=ZGREEN.GROUPS.filter(function(g){ return !used[g[0]]&&ZGREEN.picOf(ws,g)&&free.length>=Math.min(g[2],free.length)&&free.length>=3; });
    var sp=spots.filter(function(p){ return !taken[p.x+','+p.y]; }); if(!opts.length||!sp.length)return;
    var g=opts[Math.floor(Math.random()*opts.length)], p=sp[Math.floor(Math.random()*sp.length)], n=Math.min(g[2],free.length), who=free.sort(function(a,b){ return Math.hypot(a.o.x-p.x,a.o.y-p.y)-Math.hypot(b.o.x-p.x,b.o.y-p.y); }).slice(0,n);
    who.forEach(function(e,i){ e.busy=true; var a=i/n*Math.PI*2; if(e.o._m)ZSPM.goTo(e.o,p.x+Math.cos(a)*TILE*1.2,p.y+Math.sin(a)*TILE*0.6,20); else ws.tweens.add({targets:e.o,x:p.x,y:p.y,duration:4000}); });
    S.groups.push({g:g,spot:p,who:who,stage:'gather',t0:now,until:now+60}); },
  show:function(ws,G){ var P=ZGREEN.picOf(ws,G.g), p=G.spot, Z=_scn(), im=null; if(!P)return;
    if(P.anim){ var A=P.anim; im=ws.add.sprite(p.x,p.y+6,A.key,'0').setOrigin(A.ox,A.oy).setScale(A.scale*Z.K*1.05); try{ im.play(A.key); }catch(e){} }
    else { im=Z.image(ws,P.still,p.x,p.y+6,Z.K*1.05,WR_DEPTH(p.y)); if(im){ im._breathe=ws.tweens.add({targets:im,scaleY:im.scaleY*1.025,scaleX:im.scaleX*0.99,y:im.y-2,duration:1300,yoyo:true,repeat:-1,ease:'Sine.inOut'}); } }
    if(!im)return; im.setDepth(WR_DEPTH(p.y)).setAlpha(0); ws.tweens.add({targets:im,alpha:0.95,duration:900}); G.im=im;
    G.who.forEach(function(e){ ws.tweens.add({targets:e.o,alpha:0,duration:700}); }); },
  part:function(ws,G){ if(G.im){ var im=G.im; if(im._breathe)im._breathe.stop(); ws.tweens.add({targets:im,alpha:0,duration:900,onComplete:function(){ im.destroy(); }}); }
    G.who.forEach(function(e){ e.busy=false; e.next=0; if(e.o&&e.o.scene)ws.tweens.add({targets:e.o,alpha:0.95,duration:900}); }); },
  clear:function(ws){ var S=ws._zg; if(!S)return; Object.keys(S.sp).forEach(function(k){ var o=S.sp[k].o; if(o&&o.destroy)o.destroy(); }); S.groups.forEach(function(G){ if(G.im)G.im.destroy(); }); ws._zg=null; }
};
// the Green is ZGREEN's now (10w's own ring of spirits stands down)
(function(){ if(typeof ZSPIRIT==='undefined')return; ZSPIRIT.green=function(ws){ try{ ZGREEN.tick(ws); }catch(e){ if(!ZGREEN._err){ ZGREEN._err=1; console.warn('green',e); } } };
  // shrine spirits: the living picture when painted
  var sp0=ZSPIRIT._spiritSprite; ZSPIRIT._spiritSprite=function(scene,x,y,kind,depth,s){ var U=ZSPIRIT.uniqueId(s,kind); if(U){ var C=ZSPM.make(scene,U,x,y,kind==='toil'?'bound':'free',{depth:depth}); if(C)return C; } return sp0.apply(ZSPIRIT,arguments); };
})();
// the group loops play slowly (four frames, about two and a half a second)
(function(){ if(typeof ZWE==='undefined')return; ZWE.LOOP=ZWE.LOOP||{}; ZGREEN.GROUPS.concat(ZGREEN.BOUND).forEach(function(g){ ZWE.LOOP['gl_'+g[0]]=2.5; }); })();
