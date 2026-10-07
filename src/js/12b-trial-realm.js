// ═══════════════════════════════════════════════════════════════════════
// ║ THE TRIAL REALM (round 5) — every familiar trial happens in its own
// ║ temporary arena. The fairy opens a portal; you and your familiar step
// ║ into a small floating realm built for that trial, then come back.
// ║ • 12 trial themes, each scaling with the quadrant (tier 1–4; the
// ║   Fairy Monarchs' trials run at tier 5 and chain several stages).
// ║ • Every fairy has her own trial (FAIRY_TRIAL_PLAN): 20 in all.
// ║ • Runs inside the Dungeon scene (data.trial) so movement, combat,
// ║   familiars, spells and statuses all work as usual.
// ║ • Entry stairs = give up (the trial fails, nothing is lost).
// ═══════════════════════════════════════════════════════════════════════
// ── Dungeon-scene integration ──
(function(){
  var _bf=_buildSiteFloor; _buildSiteFloor=function(spec){ if(spec&&spec.kind==='trial')return _trialBuild(spec.run); return _bf(spec); };
  var P=DungeonScene.prototype;
  var _pd=P._playerDied; P._playerDied=function(){ if(this._trialRun&&!this._trialOver){ var ps=this.worldScene.playerState; ps.hp=Math.max(1,Math.round(ps.maxHp*0.3)); TrialRealm.end(this,false,'You were knocked out of the realm.'); return; } return _pd.call(this); };
  var _int=P._interact; P._interact=function(){ if(this._trialRun){ if(TrialRealm.interact(this))return; var self=this, near=this.interactables.find(function(i){ return i.type==='stairs_up'&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; }); if(near){ TrialRealm.end(this,false,'You left the trial.'); } return; } return _int.call(this); };
})();
var TrialRealm={
  // the world side: step through the fairy's portal
  enter:function(ws,run){ run.stage=run.stage||0; run.seed=run.seed||(1000+run.q*97+(run.i||0)*13);
    var P=ws.player; for(var i=0;i<16;i++){ var s=ws.add.circle(P.x+(Math.random()-0.5)*40,P.y+(Math.random()-0.5)*30,2+Math.random()*2,hexNum((TRIAL_PAL[run.q]||TRIAL_PAL[1]).glow),1).setDepth(WR_DEPTH(P.y)+0.02); ws.tweens.add({targets:s,y:s.y-40,alpha:0,duration:700,onComplete:function(){ this.targets[0].destroy(); }}); }
    ws.cameras.main.flash(350,255,255,255);
    if(ws.sys.isPaused())ws.scene.resume();
    setTimeout(function(){ if(!ws.sys||!ws.scene)return; ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:{id:'trial_'+run.key+'_'+run.stage,type:'trial',section:run.q,name:run.title,floors:1},floor:0,maxFloors:1,worldScene:ws,theme:'dungeon',trial:run});
      document.getElementById('hud').style.display='none'; document.getElementById('dungeon-hud').style.display='block'; },360); },
  spec:function(run){ return {kind:'trial',run:run,seed:run.seed,last:true}; },
  // called from DungeonScene.create when data.trial is set (after the map is built)
  start:function(S){ var run=S._trialRun, L=S._lab.trial, st=run.stages[run.stage], ps=S.worldScene.playerState;
    // no chest / portal: the far point is plain floor
    if(S.bossChestTile){ S.dtiles[S.bossChestTile.y][S.bossChestTile.x]=DNG.FLOOR; S.bossChestTile=null; }
    ps.hp=Math.max(ps.hp,Math.round(ps.maxHp*0.8));
    var T=S._tr={theme:st,t:0,L:L,run:run,d:run.tier,q:run.q,fx:[],mobs:[],el:SPIRIT_ELEMENTS[FAM_EL[run.fid]]||SPIRIT_ELEMENTS.grass,pal:TRIAL_PAL[run.q]||TRIAL_PAL[1]};
    var el=document.getElementById('trial-hud'); if(!el){ el=document.createElement('div'); el.id='trial-hud'; (document.getElementById('app')||document.body).appendChild(el); } el.style.display='block'; el._h='';
    var ttl=document.getElementById('dng-title'); if(ttl)ttl.textContent='✨ '+run.title+(run.stages.length>1?' — stage '+(run.stage+1)+'/'+run.stages.length:'');
    (TR_THEME[st].start||function(){})(S,T);
    showNotif(TRIAL_THEMES[st].icon+' '+TRIAL_THEMES[st].name+' — '+TRIAL_THEMES[st].text,'#ffe8ff'); },
  tick:function(S,dt){ var T=S._tr; if(!T||S._trialOver)return; T.t+=dt; if(T.time!==undefined)T.time-=dt;
    var hud=TR_THEME[T.theme].tick(S,T,dt); if(S._trialOver)return; var el=document.getElementById('trial-hud'); if(el&&hud!==undefined&&el._h!==hud){ el._h=hud; el.textContent=hud; } },
  interact:function(S){ var T=S._tr; if(!T||S._trialOver)return false; var f=TR_THEME[T.theme].tab; return !!(f&&f(S,T)); },
  end:function(S,ok,why){ if(S._trialOver)return; S._trialOver=true; var run=S._trialRun, T=S._tr||{};
    (T.mobs||[]).forEach(function(m){ if(!m.dead){ m.dead=true; m._hp=0; if(m.cont)m.cont.setVisible(false); } });
    var el=document.getElementById('trial-hud'); if(el){ el.textContent=ok?'✔ Trial passed!':'✖ '+(why||'The trial failed.'); el._h=''; }
    var last=run.stage>=run.stages.length-1;
    if(ok&&!last){ showNotif('✔ Stage '+(run.stage+1)+' of '+run.stages.length+' passed! The realm shifts…','#aaffcc'); S.cameras.main.flash(400,255,255,255);
      S.time.delayedCall(1300,function(){ var r2=Object.assign({},run,{stage:run.stage+1}); S.scene.restart(Object.assign({},S._initData,{site:Object.assign({},S._site,{id:'trial_'+run.key+'_'+r2.stage}),trial:r2})); }); return; }
    if(ok)campCelebrate(S,S.px,S.py,'Trial passed!',run.title); else showNotif('✖ '+(why||'The trial failed.')+' Talk to '+run.host+' to try again.','#ffb0a0');
    S.time.delayedCall(ok?1800:1200,function(){ var hudEl=document.getElementById('trial-hud'); if(hudEl)hudEl.style.display='none'; S._exitToWorld(null); var ws=S.worldScene; if(ok&&run.win)ws.time.delayedCall(200,function(){ run.win(); }); else if(!ok&&run.lose)run.lose(); }); },
  // helpers
  px:function(t){ return t*TILE+16; },
  mob:function(S,id,x,y,o){ if(!id)return null; var T=S._tr, mon=MX.spawn(S,id,x,y,Object.assign({q:T.q,temp:true},o||{})); if(!mon)return null; mon.isBoss=false; mon._m.aggro=true; mon._trialMob=true; S.monsters.push(mon); T.mobs.push(mon); return mon; },
  famNear:function(S,x,y,r){ var V=S._famVisuals||{}; return Object.keys(V).some(function(k){ var v=V[k]; return v&&Math.hypot(v.x-x,v.y-y)<r; })||Math.hypot(S.px-x,S.py-y)<r*0.8; },
  hurt:function(S,frac,label){ var ps=S.worldScene.playerState; if(ps.godMode)return; var d=Math.max(1,Math.round(ps.maxHp*frac)); ps.hp=Math.max(0,ps.hp-d); S._floatText(S.px,S.py-26,'-'+d+(label?' '+label:''),'#ff6a6a'); var fl=document.getElementById('damage-flash'); if(fl){ fl.style.opacity='0.18'; setTimeout(function(){ fl.style.opacity='0'; },250); } if(ps.hp<=0)S._playerDied(); },
  ring:function(S,x,y,r,col){ var c=S.add.circle(x,y,6,hexNum(col),0).setStrokeStyle(3,hexNum(col),0.9).setDepth(12.62); S.tweens.add({targets:c,radius:r,alpha:0,duration:380,onComplete:function(){ c.destroy(); }}); },
  glyph:function(S,x,y,s,col,size,depth){ return S.add.text(x,y,TRIAL_GLYPHS[s%TRIAL_GLYPHS.length],{fontSize:(size||20)+'px',fontFamily:'serif',color:col||'#ffffff',stroke:'#000',strokeThickness:3}).setOrigin(0.5).setDepth(depth||12.63); },
  // a painted trial prop standing on (x, footY) (round 31); null when its picture is not there, and the drawn one is used
  pic:function(S,id,x,footY,h,depth){ var Zs=_scn(), t=Zs&&Zs.texture(S,id,h||0); if(!t)return null; return S.add.image(x,footY+3,t.key).setOrigin(0.5,1).setScale(t.scale).setDepth(depth!==undefined?depth:S._yDepth(footY)); },
  stone:function(S,x,y,col,h,id){ var pz=TR.pic(S,id||'tp_stone',x,y+14,(h||30)+16); if(pz)return pz; var g=S.add.graphics().setDepth(S._yDepth(y+14)); g.fillStyle(0x000000,0.3).fillEllipse(x,y+12,26,8); g.fillStyle(0x6a6a78,1).fillRoundedRect(x-10,y+12-(h||30),20,(h||30),5); g.fillStyle(0x8a8a9a,1).fillRoundedRect(x-10,y+12-(h||30),20,6,3); g.lineStyle(2,hexNum(col),0.8).strokeRoundedRect(x-10,y+12-(h||30),20,(h||30),5); return g; }
};
var TR=TrialRealm;
// ── the 12 themes: start(S,T) · tick(S,T,dt) → hud text · tab(S,T) → true if [Tab] was used ──
var TR_THEME={
  rune_targets:{ start:function(S,T){ T.need=6+2*T.d; T.hits=0; T.miss=0; T.next=0.6; T.targets=[]; T.time=60+10*T.d; T.life=Math.max(3.2,7.5-0.8*T.d); },
    tick:function(S,T,dt){ var L=T.L, cx=L.W/2, cy=L.H/2; T.next-=dt;
      if(T.next<=0&&T.targets.length<2+(T.d>=3?1:0)&&T.hits+T.targets.length<T.need){ T.next=1.1-0.08*T.d; for(var k=0;k<30;k++){ var a=Math.random()*6.28, r=2+Math.random()*(Math.min(L.W,L.H)/2-4.5), tx=Math.round(cx+Math.cos(a)*r), ty=Math.round(cy+Math.sin(a)*r*0.85); if(S.dtiles[ty]&&S.dtiles[ty][tx]!==DNG.WALL){ var x=TR.px(tx), y=TR.px(ty), g=S.add.star(x,y,6,7,15,hexNum(T.el.col),0.9).setStrokeStyle(2,0xffffff,0.9).setDepth(12.6); S.tweens.add({targets:g,angle:360,duration:3000,repeat:-1}); T.targets.push({g:g,x:x,y:y,life:T.life}); break; } } }
      T.targets=T.targets.filter(function(t){ t.life-=dt; t.g.setAlpha(Math.min(1,t.life/2)); if(TR.famNear(S,t.x,t.y,40)){ T.hits++; SFX.pickup&&SFX.pickup(); TR.ring(S,t.x,t.y,40,T.el.col); t.g.destroy(); return false; } if(t.life<=0){ T.miss++; t.g.destroy(); return false; } return true; });
      if(T.hits>=T.need)return TR.end(S,true); if(T.miss>=4||T.time<=0)return TR.end(S,false,T.time<=0?'Out of time.':'Too many stars faded.');
      return '🎯 Rune Targets — '+T.hits+' / '+T.need+' · missed '+T.miss+' / 4 · '+Math.ceil(T.time)+' s'; } },
  echo_path:{ start:function(S,T){ var L=T.L, n=Math.min(10,5+T.d), cx=L.W/2, cy=L.H/2+0.5; T.tiles=[]; for(var i=0;i<n;i++){ var a=i/n*Math.PI*2-Math.PI/2, x=TR.px(0)-16+(cx+Math.cos(a)*5.2)*TILE, y=(cy+Math.sin(a)*4.6)*TILE, g=S.add.circle(x,y,17,hexNum(T.el.deep),0.4).setStrokeStyle(2,hexNum(T.el.col),0.85).setDepth(S._yDepth(y)-0.001); T.tiles.push({x:x,y:y,g:g}); }
      T.lens=[2+T.d,3+T.d,4+T.d]; T.round=0; T.mist=0; TR_THEME.echo_path.show(S,T); },
    show:function(S,T){ var n=T.lens[T.round]; T.seq=[]; for(var i=0;i<n;i++){ var k; do{ k=Math.floor(Math.random()*T.tiles.length); }while(T.seq.length&&T.seq[T.seq.length-1]===k); T.seq.push(k); } T.pos=-1; T.showing=true; var gap=Math.max(420,760-60*T.d);
      T.seq.forEach(function(k,i){ S.time.delayedCall(700+i*gap,function(){ if(S._trialOver)return; var t=T.tiles[k]; t.g.setFillStyle(hexNum(T.el.col),0.95); S.time.delayedCall(gap*0.6,function(){ if(t.g.active)t.g.setFillStyle(hexNum(T.el.deep),0.4); }); }); });
      S.time.delayedCall(700+n*gap,function(){ if(!S._trialOver){ T.showing=false; T.pos=0; } }); },
    tick:function(S,T,dt){ if(!T.showing&&T.pos>=0){ for(var k=0;k<T.tiles.length;k++){ var t=T.tiles[k], on=Math.hypot(S.px-t.x,S.py-t.y)<20; if(on&&!t.on){ t.on=true;
            if(k===T.seq[T.pos]){ t.g.setFillStyle(0xffffff,0.85); (function(g){ S.time.delayedCall(250,function(){ if(g.active)g.setFillStyle(hexNum(T.el.deep),0.4); }); })(t.g); T.pos++;
              if(T.pos>=T.seq.length){ T.round++; if(T.round>=T.lens.length)return TR.end(S,true); showNotif('✔ Round '+T.round+' of 3!','#aaffcc'); T.pos=-1; T.showing=true; S.time.delayedCall(700,function(){ if(!S._trialOver)TR_THEME.echo_path.show(S,T); }); } }
            else { T.mist++; t.g.setFillStyle(0xff4040,0.85); (function(g){ S.time.delayedCall(300,function(){ if(g.active)g.setFillStyle(hexNum(T.el.deep),0.4); }); })(t.g); if(T.mist>=3)return TR.end(S,false,'Three wrong tiles.'); showNotif('✖ Wrong tile — watch again','#ffb0a0'); T.pos=-1; T.showing=true; S.time.delayedCall(800,function(){ if(!S._trialOver)TR_THEME.echo_path.show(S,T); }); } }
          if(!on)t.on=false; } }
      return '🎼 Echo Path — round '+(T.round+1)+' / 3 · '+(T.showing?'watch the tiles…':'step on them in order ('+Math.max(0,T.pos)+' / '+T.seq.length+')')+' · mistakes '+T.mist+' / 3'; } },
  guardian:{ start:function(S,T){ var L=T.L, tx=Math.floor(L.W/2), ty=Math.floor(L.H/2); S.dtiles[ty][tx]=DNG.WALL; T.cx=TR.px(tx); T.cy=TR.px(ty); T.stoneG=TR.stone(S,T.cx,T.cy-12,T.pal.glow,36); T.time=28+6*T.d; T.stone=6; T.next=1; },
    tick:function(S,T,dt){ T.next-=dt; if(T.next<=0&&T.time>3){ T.next=Math.max(0.7,2.3-0.28*T.d-Math.min(0.8,T.t*0.02)); var a=Math.random()*6.28, id=_trialShadeId(T.q), m=TR.mob(S,id,T.cx+Math.cos(a)*8*TILE,T.cy+Math.sin(a)*6.5*TILE); if(m){ m._seek={x:T.cx,y:T.cy}; m.maxHp=Math.round(m.maxHp*(0.7+0.1*T.d)); m._hp=m.maxHp; }
        if(m&&!S._canGoD(m.x,m.y)){ m.x=T.cx+Math.cos(a)*5*TILE; m.y=T.cy+Math.sin(a)*4*TILE; } }
      T.mobs.forEach(function(m){ if(!m.dead&&Math.hypot(m.x-T.cx,m.y-T.cy)<34){ T.stone--; TR.ring(S,T.cx,T.cy,50,'#b080ff'); m._hp=0; m.dead=true; if(m.cont)m.cont.setVisible(false); } });
      if(T.stone<=0)return TR.end(S,false,'The runestone went dark.'); if(T.time<=0)return TR.end(S,true);
      return '🛡️ Guard the Runestone — '+'◆'.repeat(Math.max(0,T.stone))+' · '+Math.ceil(T.time)+' s'; } },
  shadow_duel:{ start:function(S,T){ var L=T.L, q=T.q, base=MDEFS[['dark_warlock','storm_mage','iron_sentinel','shadow_lord'][Math.min(4,q)-1]], m=1+(T.d-q)*0.3;
      var boss=MX.spawn(S,_trialDuelId(Math.min(4,q),T.run.fid),TR.px(Math.floor(L.W/2)),TR.px(5),{q:Math.min(4,q),temp:true,stats:{hp:Math.round(base.hp*1.1*m),atk:Math.round(base.atk*0.8),def:base.def||0,lv:base.lvMax||base.lvMin||5,xp:Math.round(base.xp*0.5),gMin:base.gMin,gMax:base.gMax,r:18},scale:2});
      if(boss){ boss._m.aggro=true; boss._trialMob=true; boss.isBoss=true; S.monsters.push(boss); T.mobs.push(boss); T.duel=boss; if(boss.spr)boss.spr.setTint(0x8060c0); } },
    tick:function(S,T,dt){ if(!T.duel||T.duel.dead||T.duel.hp<=0)return TR.end(S,true); return '👤 Shadow Duel — Shadow '+_famDesign(T.run.fid).name+': '+Math.max(0,Math.round(T.duel.hp))+' / '+T.duel.maxHp; } },
  rune_lock:{ start:function(S,T){ var L=T.L, n=Math.min(6,2+T.d), K=Math.min(6,3+Math.min(T.d,3)), R=rngOf(T.run.seed+5); T.K=K; T.link=T.d>=3; T.mode=T.d>=4?'hidden':T.d===3?'reversed':T.d===2?'flicker':'shown';
      T.target=[]; T.cur=[]; T.stones=[]; for(var i=0;i<n;i++){ T.target.push(R.i(0,K-1)); }
      for(var j=0;j<n;j++){ var tx=Math.floor(L.W/2)-Math.floor(n*3/2)+1+j*3, ty=11, x=TR.px(tx), y=TR.px(ty); S.dtiles[ty][tx]=DNG.WALL; var g=TR.stone(S,x,y-10,T.pal.glow,34), gl=TR.glyph(S,x,y-26,0,'#fff4c0',20,S._yDepth(y+20)); T.stones.push({tx:tx,ty:ty,x:x,y:y,g:g,gl:gl}); T.cur.push(R.i(0,K-1)); }
      if(T.cur.every(function(v,i){ return v===T.target[i]; }))T.cur[0]=(T.cur[0]+1)%K;
      var ax=TR.px(Math.floor(L.W/2)), ay=TR.px(4); S.dtiles[4][Math.floor(L.W/2)]=DNG.WALL; T.altar={x:ax,y:ay}; var ag=S.add.graphics().setDepth(S._yDepth(ay+14)); if(!TR.pic(S,'tp_altar',ax,ay+16,0)){ ag.fillStyle(0x4a4a58,1).fillRoundedRect(ax-22,ay-6,44,20,4); ag.lineStyle(2,hexNum(T.pal.glow),0.8).strokeRoundedRect(ax-22,ay-6,44,20,4); }
      T.show=[]; var seq=T.mode==='reversed'?T.target.slice().reverse():T.target; seq.forEach(function(s,i){ T.show.push(TR.glyph(S,ax-(n-1)*14+i*28,ay-40,s,T.el.col,26,12.64)); });
      T.time=60+12*T.d; T.showT=T.mode==='hidden'?6:0; TR_THEME.rune_lock.paint(S,T); },
    paint:function(S,T){ T.stones.forEach(function(s,i){ s.gl.setText(TRIAL_GLYPHS[T.cur[i]%TRIAL_GLYPHS.length]).setColor(T.cur[i]===T.target[i]&&T.mode!=='hidden'&&T.d<=1?'#aaffcc':'#fff4c0'); }); },
    tab:function(S,T){ var best=-1, bd=1e9; T.stones.forEach(function(s,i){ var d=Math.hypot(S.px-s.x,S.py-s.y); if(d<bd){ bd=d; best=i; } });
      if(T.altar&&Math.hypot(S.px-T.altar.x,S.py-T.altar.y)<60&&T.mode==='hidden'){ T.showT=5; T.time-=8; showNotif('Your familiar draws the pattern again (−8 s)','#ffe8ff'); return true; }
      if(best<0||bd>TILE*1.7)return false; T.cur[best]=(T.cur[best]+1)%T.K; if(T.link&&best<T.stones.length-1)T.cur[best+1]=(T.cur[best+1]+1)%T.K; TR.ring(S,T.stones[best].x,T.stones[best].y-20,26,T.pal.glow); TR_THEME.rune_lock.paint(S,T); return true; },
    tick:function(S,T,dt){ var vis=T.mode==='shown'||T.mode==='reversed'||(T.mode==='flicker'&&(T.t%7)<4.2)||(T.mode==='hidden'&&T.showT>0); if(T.showT>0)T.showT-=dt; T.show.forEach(function(g){ g.setAlpha(vis?0.95:0.06); });
      if(T.cur.every(function(v,i){ return v===T.target[i]; })){ T.stones.forEach(function(s){ TR.ring(S,s.x,s.y-20,40,'#aaffcc'); }); return TR.end(S,true); }
      if(T.time<=0)return TR.end(S,false,'Out of time.');
      return '🔐 Rune Lock — match the pattern above the altar'+(T.mode==='reversed'?' (it is written right-to-left!)':'')+(T.link?' · each stone also turns the one to its right':'')+(T.mode==='hidden'?' · [Tab] at the altar to see it again (−8 s)':'')+' · '+Math.ceil(T.time)+' s'; } },
  escort:{ start:function(S,T){ var L=T.L; T.seed={x:TR.px(Math.floor(L.W/2)),y:TR.px(L.H-6),hp:10,max:10}; T.goal={x:TR.px(Math.floor(L.W/2)),y:TR.px(4)}; T.sg=S.add.container(T.seed.x,T.seed.y).setDepth(S._yDepth(T.seed.y));
      var gl=S.add.circle(0,-6,14,hexNum(T.pal.glow),0.25), stem=S.add.rectangle(0,-4,3,14,0x4a8a3a), l1=S.add.ellipse(-5,-10,10,5,0x80d060), l2=S.add.ellipse(5,-12,10,5,0x80d060), bud=S.add.circle(0,-14,4,0xfff0a0); T.sg.add([gl,stem,l1,l2,bud]);
      T.bar=S.add.rectangle(T.seed.x,T.seed.y-30,30,4,0x60ff90).setDepth(12.64); T.next=2.5; var gd=S.add.graphics().setDepth(S._yDepth(T.goal.y+10)); T.d0=Math.hypot(T.goal.x-T.seed.x,T.goal.y-T.seed.y); gd.fillStyle(hexNum(T.pal.glow),0.25).fillCircle(T.goal.x,T.goal.y,24); gd.lineStyle(2,hexNum(T.pal.glow),0.8).strokeCircle(T.goal.x,T.goal.y,24); T.spd=24+2*T.d; },
    tick:function(S,T,dt){ var sd=T.seed, scared=T.mobs.some(function(m){ return !m.dead&&Math.hypot(m.x-sd.x,m.y-sd.y)<60; });
      var dx=T.goal.x-sd.x, dy=T.goal.y-sd.y, d=Math.hypot(dx,dy); if(d<16)return TR.end(S,true);
      if(!scared){ var sp=T.spd*dt, a=Math.atan2(dy,dx), nx=sd.x+Math.cos(a)*sp, ny=sd.y+Math.sin(a)*sp; if(!S._canGoD(nx,ny)){ var side=sd.x<S._lab.w*LT/2?1:-1; nx=sd.x+side*sp; ny=sd.y; if(!S._canGoD(nx,ny)){ nx=sd.x-side*sp; } } if(S._canGoD(nx,ny)){ sd.x=nx; sd.y=ny; } }
      T.sg.setPosition(sd.x,sd.y).setDepth(S._yDepth(sd.y)); T.bar.setPosition(sd.x,sd.y-30).setSize(30*sd.hp/sd.max,4);
      T.next-=dt; if(T.next<=0){ T.next=Math.max(1.3,3.4-0.45*T.d); var side2=Math.random()<0.5?3:S._lab.w-4, m=TR.mob(S,_trialMobId(T.q),TR.px(side2),sd.y-TILE*(3+Math.random()*4)); if(m){ m._seek={x:sd.x,y:sd.y}; m.maxHp=Math.round(m.maxHp*0.7); m._hp=m.maxHp; } }
      T.mobs.forEach(function(m){ if(m.dead)return; m._seek={x:sd.x,y:sd.y}; if(Math.hypot(m.x-sd.x,m.y-sd.y)<26){ m._bite=(m._bite||0)-dt; if(m._bite<=0){ m._bite=1.1; sd.hp--; TR.ring(S,sd.x,sd.y-8,24,'#ff6060'); } } });
      if(sd.hp<=0)return TR.end(S,false,'The seedling was eaten.');
      return '🌱 Escort the Seedling — '+Math.max(0,Math.round(100-d/T.d0*100))+'% of the way · seedling '+'♥'.repeat(Math.max(0,Math.ceil(sd.hp/2)))+(scared?' · it hides while monsters are near!':''); } },
  light_align:{ start:function(S,T){ var P=T.L.puzzle; if(!P){ T.fail=true; return; } T.P=P;
      // board frame, emitter, targets, mirrors
      var g=S.add.graphics().setDepth(-4); g.lineStyle(2,hexNum(T.pal.glow),0.35).strokeRect(P.bx*TILE-2,P.by*TILE-2,P.bw*TILE+4,P.bh*TILE+4); for(var y=P.by;y<P.by+P.bh;y++)for(var x=P.bx;x<P.bx+P.bw;x++){ g.fillStyle(hexNum(T.pal.glow),(x+y)%2?0.05:0.09).fillRect(x*TILE+1,y*TILE+1,TILE-2,TILE-2); }
      var ex=TR.px(P.emitter.x), ey=TR.px(P.emitter.y); S.dtiles[P.emitter.y][P.emitter.x]=DNG.WALL; TR.stone(S,ex,ey-6,'#fff4a0',30); S.add.circle(ex+6,ey-12,5,0xfff4a0,1).setDepth(12.61);
      T.tg=P.targets.map(function(t){ var c=S.add.circle(TR.px(t.x),TR.px(t.y),11,hexNum(T.pal.glow),0.2).setStrokeStyle(2,hexNum(T.pal.glow),0.9).setDepth(-3); var gl=TR.glyph(S,TR.px(t.x),TR.px(t.y),t.x*3+t.y,T.pal.rune,16,-2.9); return {c:c,gl:gl}; });
      T.mg=P.mirrors.map(function(m){ S.dtiles[m.y][m.x]=DNG.WALL; var c=S.add.container(TR.px(m.x),TR.px(m.y)).setDepth(S._yDepth(TR.px(m.y)+10)); var base=S.add.ellipse(0,10,24,8,0x000000,0.3), post=S.add.rectangle(0,6,6,10,0x6a6a78), plate=S.add.rectangle(0,-6,28,5,0xd8e8ff).setStrokeStyle(1.5,0xffffff,0.9); c.add([base,post,plate]); return {c:c,plate:plate}; });
      T.beam=S.add.graphics().setDepth(12.55); T.hold=0; TR_THEME.light_align.paint(S,T); },
    paint:function(S,T){ T.P.mirrors.forEach(function(m,i){ T.mg[i].plate.setRotation(m.o==='/'?-Math.PI/4:Math.PI/4); }); var tr=_trBeamTrace(T.P); T.lit=tr.lit;
      T.beam.clear(); [[10,0.18],[5,0.45],[2,1]].forEach(function(w){ T.beam.lineStyle(w[0],w[1]===1?0xffffff:0xfff0a0,w[1]); T.beam.beginPath(); tr.pts.forEach(function(p,i){ var X=TR.px(p.x), Y=TR.px(p.y)-6; if(i===0)T.beam.moveTo(X,Y); else T.beam.lineTo(X,Y); }); T.beam.strokePath(); });
      T.tg.forEach(function(t,i){ t.c.setFillStyle(hexNum(tr.lit[i]?'#fff4a0':T.pal.glow),tr.lit[i]?0.8:0.2); }); },
    tab:function(S,T){ if(!T.P)return false; var best=-1,bd=1e9; T.P.mirrors.forEach(function(m,i){ var d=Math.hypot(S.px-TR.px(m.x),S.py-TR.px(m.y)); if(d<bd){ bd=d; best=i; } }); if(best<0||bd>TILE*1.6)return false; var m=T.P.mirrors[best]; m.o=m.o==='/'?'\\':'/'; TR.ring(S,TR.px(m.x),TR.px(m.y),22,'#fff4a0'); TR_THEME.light_align.paint(S,T); return true; },
    tick:function(S,T,dt){ if(T.fail)return TR.end(S,true); var n=T.P.targets.length, lit=Object.keys(T.lit||{}).length; if(lit>=n){ T.hold+=dt; if(T.hold>0.8)return TR.end(S,true); } else T.hold=0;
      return '🔦 Light Alignment — runes lit '+lit+' / '+n+' · stand by a mirror and press [Tab] to turn it'; } },
  collapse_path:{ start:function(S,T){ var W=T.L.walk; T.W=W; T.lives=3; T.state={}; T.stones=[]; T.hold=Math.max(1.2,4.2-0.55*T.d); T.fallT=0; T.row=-1; T.lastRow=-1;
      for(var r=0;r<W.rows;r++)for(var c=0;c<W.cols;c++){ var tx=W.x0+c, ty=W.y0+W.rows-1-r, x=TR.px(tx), y=TR.px(ty); var slab=S.add.rectangle(x,y,TILE-3,TILE-3,0x6a6680).setStrokeStyle(2,0x2a2838,1).setDepth(-3.5), gl=TR.glyph(S,x,y,W.sym[r][c],T.pal.rune,18,-3.4); T.stones.push({r:r,c:c,tx:tx,ty:ty,x:x,y:y,slab:slab,gl:gl,st:0,t:0}); }
      // the spire, with the path's symbols stacked up its face (it goes dark once you are on the walkway)
      var sp=W.spire, sx=TR.px(sp.x), sy=TR.px(sp.y); S.dtiles[sp.y][sp.x]=DNG.WALL; var g=S.add.graphics().setDepth(S._yDepth(sy+14)); var hgt=40+W.rows*22;
      var spz=TR.pic(S,'tp_spire',sx,sy+14,hgt+16); if(!spz){ g.fillStyle(0x000000,0.35).fillEllipse(sx,sy+12,34,10); g.fillStyle(0x4a4658,1).fillRect(sx-12,sy+12-hgt,24,hgt); g.fillStyle(0x6a6680,1).fillRect(sx-12,sy+12-hgt,6,hgt); g.fillStyle(0x3a3648,1).fillTriangle(sx-14,sy+12-hgt,sx+14,sy+12-hgt,sx,sy-hgt-14); g.lineStyle(2,hexNum(T.pal.glow),0.7).strokeRect(sx-12,sy+12-hgt,24,hgt); }
      T.spireG=[]; for(var r2=0;r2<W.rows;r2++){ var s=W.sym[r2][W.path[r2]]; T.spireG.push(TR.glyph(S,sx,sy+2-r2*22-12,s,T.pal.glow,18,S._yDepth(sy+15))); }
      T.lbl=S.add.text(sx,sy-hgt-26,'Read me from the bottom up',{fontSize:'8px',fontFamily:'Segoe UI',color:'#fff4c8',stroke:'#000',strokeThickness:3}).setOrigin(0.5).setDepth(12.64); T.start={x:S.px,y:S.py}; },
    reset:function(S,T){ T.stones.forEach(function(s){ s.st=0; s.t=0; s.slab.setVisible(true).setFillStyle(0x6a6680).setAlpha(1); s.gl.setVisible(true); }); T.row=-1; T.spireG.forEach(function(g){ g.setAlpha(1); }); },
    tick:function(S,T,dt){ var W=T.W, tx=Math.floor(S.px/TILE), ty=Math.floor(S.py/TILE), ps=S.worldScene.playerState;
      if(T.fallT>0){ T.fallT-=dt; if(T.fallT<=0){ S.px=T.start.x; S.py=T.start.y; S.pCont.setPosition(S.px,S.py).setAlpha(1).setScale(1); TR_THEME.collapse_path.reset(S,T); } return '🌉 You fell! Lives '+'♥'.repeat(T.lives); }
      var on=T.stones.find(function(s){ return s.tx===tx&&s.ty===ty; });
      if(on){ if(T.row<0)T.spireG.forEach(function(g){ g.setAlpha(0.08); });
        if(on.st===2||on.c!==W.path[on.r]||on.r>T.row+1){ // wrong stone (or a crumbled one): it drops away with you
          on.st=2; on.slab.setVisible(false); on.gl.setVisible(false); T.lives--; T.fallT=1.1; MX.S(S).rootT=1.2; S.tweens.add({targets:S.pCont,scale:0.2,alpha:0,duration:700}); TR.hurt(S,0.06,'fell'); if(T.lives<=0)return TR.end(S,false,'You fell three times.'); showNotif('The stone gives way! Back to the start ('+T.lives+' ♥ left) — read the spire again.','#ffb0a0'); return; }
        if(on.st===0){ on.st=1; on.t=0; on.slab.setFillStyle(0x8a86a8); } T.row=Math.max(T.row,on.r);
        // stones in rows you've left crumble behind you
        T.stones.forEach(function(s){ if(s.r<T.row&&s.st!==2){ s.st=2; S.tweens.add({targets:[s.slab,s.gl],alpha:0,duration:500}); } }); }
      // standing too long on a stone cracks it
      T.stones.forEach(function(s){ if(s.st===1){ s.t+=dt; s.slab.setFillStyle(s.t>T.hold*0.6?0xa05050:0x8a86a8); if(s.t>T.hold){ s.st=2; S.tweens.add({targets:[s.slab,s.gl],alpha:0,duration:300}); } } });
      if(ty<W.y0&&T.row>=W.rows-1)return TR.end(S,true);
      return '🌉 Collapsing Path — row '+Math.max(0,T.row+1)+' / '+W.rows+' · lives '+'♥'.repeat(T.lives)+' · don\'t linger (stones crack after '+T.hold.toFixed(1)+' s)'; } },
  lights_out:{ start:function(S,T){ var M=T.L.maze; T.got=0; T.need=M.wisps.length; S.dtiles[M.gate.y][M.gate.x]=DNG.WALL; T.gate=S.add.rectangle(TR.px(M.gate.x),TR.px(M.gate.y),TILE,TILE,0x3a2a5a).setStrokeStyle(2,hexNum(T.pal.glow),0.9).setDepth(12.66);
      T.wisps=M.wisps.map(function(w){ var x=TR.px(w.x), y=TR.px(w.y), g=S.add.circle(x,y,6,hexNum(T.pal.glow),1).setDepth(12.66), h=S.add.image(x,y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(T.pal.glow)).setAlpha(0.6).setScale(0.5).setDepth(12.65); S.tweens.add({targets:[g,h],y:y-5,duration:900,yoyo:true,repeat:-1}); return {x:x,y:y,g:g,h:h}; });
      for(var i=0;i<Math.max(0,T.d-1);i++){ var w=M.wisps[i%M.wisps.length], m=TR.mob(S,_trialShadeId(T.q),TR.px(w.x),TR.px(w.y)+TILE); if(m){ m._m.aggro=false; m.maxHp=Math.round(m.maxHp*0.8); m._hp=m.maxHp; } } },
    tick:function(S,T,dt){ var M=T.L.maze; T.wisps=T.wisps.filter(function(w){ if(Math.hypot(S.px-w.x,S.py-w.y)<22||TR.famNear(S,w.x,w.y,18)){ T.got++; SFX.pickup&&SFX.pickup(); TR.ring(S,w.x,w.y,30,T.pal.glow); w.g.destroy(); w.h.destroy(); if(T.got>=T.need){ S.dtiles[M.gate.y][M.gate.x]=DNG.FLOOR; S.tweens.add({targets:T.gate,alpha:0,duration:600}); showNotif('The gate opens! Find it at the top of the maze.','#ffe8ff'); } return false; } return true; });
      if(T.got>=T.need&&Math.floor(S.py/TILE)<=M.gate.y)return TR.end(S,true);
      return '🌑 Lights-Out Labyrinth — wisps '+T.got+' / '+T.need+(T.got>=T.need?' · the gate at the top is open!':''); } },
  boulder_push:{ start:function(S,T){ var K=T.L.soko; T.K=K; T.B=K.boulders.map(function(b){ return {x:b.x,y:b.y,x0:b.x,y0:b.y}; }); T.push=0;
      T.goalG=K.goals.map(function(g){ var c=S.add.circle(TR.px(g.x),TR.px(g.y),13,hexNum(T.pal.glow),0.25).setStrokeStyle(2,hexNum(T.pal.glow),0.9).setDepth(-3); return c; });
      T.bg=T.B.map(function(b){ S.dtiles[b.y][b.x]=DNG.WALL; var c=S.add.container(TR.px(b.x),TR.px(b.y)).setDepth(S._yDepth(TR.px(b.y)+12)); var sh=S.add.ellipse(0,12,28,8,0x000000,0.3), rock=(function(){ var Zs=_scn(), t=Zs&&Zs.texture(S,'tp_boulder',34,{shadow:false}); return t?S.add.image(0,17,t.key).setOrigin(0.5,1).setScale(t.scale):S.add.circle(0,0,14,0x7a7684).setStrokeStyle(2,0x3a3848,1); })(), gl=TR.glyph(S,0,0,b.x+b.y,T.pal.rune,14,0); gl.setDepth(0); c.add([sh,rock,gl]); return c; });
      var rs=K.reset; T.resetPt={x:TR.px(rs.x),y:TR.px(rs.y)}; if(!TR.pic(S,'tp_reset',T.resetPt.x,T.resetPt.y+14,0,-3))S.add.circle(T.resetPt.x,T.resetPt.y,12,0x2a2a3a,0.8).setStrokeStyle(2,0xffe8a0,0.9).setDepth(-3); S.add.text(T.resetPt.x,T.resetPt.y-22,'↺ Reset [Tab]',{fontSize:'8px',fontFamily:'Segoe UI',color:'#ffe8a0',stroke:'#000',strokeThickness:3}).setOrigin(0.5).setDepth(12.64); },
    tab:function(S,T){ if(Math.hypot(S.px-T.resetPt.x,S.py-T.resetPt.y)>TILE*1.6)return false; T.B.forEach(function(b,i){ S.dtiles[b.y][b.x]=DNG.FLOOR; b.x=b.x0; b.y=b.y0; }); T.B.forEach(function(b,i){ S.dtiles[b.y][b.x]=DNG.WALL; T.bg[i].setPosition(TR.px(b.x),TR.px(b.y)).setDepth(S._yDepth(TR.px(b.y)+12)); }); showNotif('↺ The boulders roll back to where they started.','#ffe8a0'); return true; },
    tick:function(S,T,dt){ var k=S.keys, dir=null; if(k.LEFT.isDown||k.A.isDown)dir=[-1,0]; else if(k.RIGHT.isDown||k.D.isDown)dir=[1,0]; else if(k.UP.isDown||k.W.isDown)dir=[0,-1]; else if(k.DOWN.isDown||k.S.isDown)dir=[0,1];
      if(dir){ var fx=Math.floor((S.px+dir[0]*18)/TILE), fy=Math.floor((S.py+dir[1]*14)/TILE), bi=T.B.findIndex(function(b){ return b.x===fx&&b.y===fy; });
        if(bi>=0){ T.push+=dt; if(T.push>0.16){ T.push=0; var b=T.B[bi], nx=b.x+dir[0], ny=b.y+dir[1]; if(S.dtiles[ny]&&S.dtiles[ny][nx]!==DNG.WALL&&!(Math.floor(S.px/TILE)===nx&&Math.floor(S.py/TILE)===ny)){ S.dtiles[b.y][b.x]=DNG.FLOOR; b.x=nx; b.y=ny; S.dtiles[ny][nx]=DNG.WALL; S.tweens.add({targets:T.bg[bi],x:TR.px(nx),y:TR.px(ny),duration:140}); T.bg[bi].setDepth(S._yDepth(TR.px(ny)+12)); } } } else T.push=0; } else T.push=0;
      var on=T.B.filter(function(b){ return T.K.goals.some(function(g){ return g.x===b.x&&g.y===b.y; }); }).length; T.goalG.forEach(function(c,i){ var g=T.K.goals[i], cov=T.B.some(function(b){ return b.x===g.x&&b.y===g.y; }); c.setFillStyle(hexNum(cov?'#aaffcc':T.pal.glow),cov?0.6:0.25); });
      if(on>=T.K.goals.length)return TR.end(S,true);
      return '🪨 Boulder Push — plates covered '+on+' / '+T.K.goals.length+' · walk into a boulder to push it · stuck? [Tab] on the reset rune'; } },
  mirror_walk:{ start:function(S,T){ var M=T.L.mirror, L=T.L; T.M=M; T.midX=(M.mid+0.5)*TILE; T.sx=2*T.midX-S.px; T.sy=S.py-TILE; T.lx=S.px; T.ly=S.py; T.safe={x:T.sx,y:T.sy}; T.got=0; T.hitT=0;
      var g=S.add.graphics().setDepth(12.4); g.fillStyle(0xc0e0ff,0.12).fillRect(M.mid*TILE,0,TILE,L.H*TILE); g.lineStyle(2,0xe0f0ff,0.5).lineBetween(M.mid*TILE+4,0,M.mid*TILE+4,L.H*TILE).lineBetween(M.mid*TILE+TILE-4,0,M.mid*TILE+TILE-4,L.H*TILE);
      T.fires=M.fires.map(function(f){ var x=TR.px(f.x), y=TR.px(f.y), c=S.add.circle(x,y,12,0xa040ff,0.35).setStrokeStyle(2,0xd080ff,0.9).setDepth(-3); S.tweens.add({targets:c,alpha:0.15,duration:600,yoyo:true,repeat:-1}); return {x:x,y:y,c:c}; });
      T.runes=M.runes.map(function(r){ var x=TR.px(r.x), y=TR.px(r.y), gl=TR.glyph(S,x,y,r.x+r.y,T.pal.glow,20,12.6); S.tweens.add({targets:gl,y:y-4,duration:800,yoyo:true,repeat:-1}); return {x:x,y:y,gl:gl}; });
      T.shadow=S.add.image(T.sx,T.sy,S.pSprite.texture.key,S.pSprite.frame.name).setOrigin(0.5,1).setTint(0x5a3aa0).setAlpha(0.85).setDepth(S._yDepth(T.sy));
      T.pat=[]; for(var i=0;i<(T.d>=3?T.d-1:0);i++){ var r0=M.runes[i%M.runes.length]; T.pat.push({x:TR.px(r0.x),y:TR.px(r0.y)+TILE,a:Math.random()*6,r:TILE*(1.2+i*0.3),g:S.add.circle(0,0,9,0xff60ff,0.8).setDepth(12.6)}); } },
    wall:function(S,T,x,y){ var L=T.L, tx=Math.floor(x/TILE), ty=Math.floor(y/TILE); if(tx<=T.M.mid||tx>=L.W-2||ty<2||ty>=L.H-3)return true; return !!L.g[ty*L.W+tx]; },
    tick:function(S,T,dt){ var dx=S.px-T.lx, dy=S.py-T.ly; T.lx=S.px; T.ly=S.py; var W=TR_THEME.mirror_walk.wall, hw=7, ok=function(x,y){ return !W(S,T,x-hw,y-5)&&!W(S,T,x+hw,y-5)&&!W(S,T,x-hw,y+5)&&!W(S,T,x+hw,y+5); };
      if(Math.abs(dx)+Math.abs(dy)<40){ var nx=T.sx-dx, ny=T.sy+dy; if(ok(nx,T.sy))T.sx=nx; if(ok(T.sx,ny))T.sy=ny; }
      T.shadow.setPosition(T.sx,T.sy+12).setTexture(S.pSprite.texture.key,S.pSprite.frame.name).setFlipX(!S.pSprite.flipX).setScale(S.pSprite.scaleX,S.pSprite.scaleY).setDepth(S._yDepth(T.sy));
      T.pat.forEach(function(p){ p.a+=dt*(0.9+0.2*T.d); p.g.setPosition(p.x+Math.cos(p.a)*p.r,p.y+Math.sin(p.a)*p.r*0.6); });
      if(T.hitT>0)T.hitT-=dt; var burn=T.fires.some(function(f){ return Math.hypot(f.x-T.sx,f.y-T.sy)<18; })||T.pat.some(function(p){ return Math.hypot(p.g.x-T.sx,p.g.y-T.sy)<16; });
      if(burn&&T.hitT<=0){ T.hitT=1; TR.hurt(S,0.04,'rune-fire'); T.sx=T.safe.x; T.sy=T.safe.y; TR.ring(S,T.sx,T.sy,24,'#d080ff'); } else if(!burn&&(Math.floor(T.t*2)%2===0))T.safe={x:T.sx,y:T.sy};
      T.runes=T.runes.filter(function(r){ if(Math.hypot(r.x-T.sx,r.y-T.sy)<20){ T.got++; SFX.pickup&&SFX.pickup(); TR.ring(S,r.x,r.y,28,T.pal.glow); r.gl.destroy(); return false; } return true; });
      if(!T.runes.length)return TR.end(S,true);
      return '🪞 Mirror Walk — your shadow copies you, mirrored: runes '+T.got+' / '+T.M.runes.length+' · keep it out of the purple rune-fire'; } },
  beam_gauntlet:{ start:function(S,T){ var B=T.L.beam; T.B=B; T.cp={x:S.px,y:S.py}; T.got=0; T.inv=0; T.g=S.add.graphics().setDepth(12.5);
      B.pylons.forEach(function(p){ TR.stone(S,TR.px(p.x),TR.px(p.y)-6,'#fff080',36,'tp_pylon'); });
      T.sh=B.shards.map(function(s){ var x=TR.px(s.x), y=TR.px(s.y), c=S.add.star(x,y,5,5,11,0xfff0a0,1).setStrokeStyle(1.5,0xffffff,1).setDepth(12.6); S.tweens.add({targets:c,angle:360,duration:2400,repeat:-1}); return {x:x,y:y,c:c}; });
      var A=B.altar; T.alt={x:TR.px(A.x),y:TR.px(A.y)}; var ag=S.add.graphics().setDepth(-3); ag.fillStyle(hexNum(T.pal.glow),0.25).fillCircle(T.alt.x,T.alt.y,22); ag.lineStyle(2,hexNum(T.pal.glow),0.9).strokeCircle(T.alt.x,T.alt.y,22); },
    tick:function(S,T,dt){ var g=T.g; g.clear(); if(T.inv>0)T.inv-=dt; var hit=false;
      T.B.pylons.forEach(function(p){ p.a+=p.spd*dt; var x0=TR.px(p.x), y0=TR.px(p.y)-12, L=p.len*TILE, x1=x0+Math.cos(p.a)*L, y1=y0+Math.sin(p.a)*L;
        [[12,0.15],[5,0.5],[2,1]].forEach(function(w){ g.lineStyle(w[0],w[1]===1?0xffffff:0xfff080,w[1]); g.lineBetween(x0,y0,x1,y1); });
        var px=S.px, py=S.py-8, t=Math.max(0,Math.min(1,((px-x0)*(x1-x0)+(py-y0)*(y1-y0))/(L*L))), d=Math.hypot(px-(x0+t*(x1-x0)),py-(y0+t*(y1-y0))); if(d<11)hit=true; });
      if(hit&&T.inv<=0){ T.inv=1.2; TR.hurt(S,0.07,'zap'); S.px=T.cp.x; S.py=T.cp.y; S.pCont.setPosition(S.px,S.py); showNotif('⚡ Zapped! Back to your last shard.','#fff080'); }
      T.sh=T.sh.filter(function(s){ if(Math.hypot(S.px-s.x,S.py-s.y)<22){ T.got++; T.cp={x:s.x,y:s.y}; SFX.pickup&&SFX.pickup(); TR.ring(S,s.x,s.y,28,'#fff0a0'); s.c.destroy(); return false; } return true; });
      if(!T.sh.length&&Math.hypot(S.px-T.alt.x,S.py-T.alt.y)<26)return TR.end(S,true);
      return '⚡ Beam Gauntlet — shards '+T.got+' / '+T.B.shards.length+(T.sh.length?'':' · now reach the altar at the top!'); } }
};
// trial helpers kept from round 3 (mobs + the shadow familiar)
MX.MOVE.seek=function(A,mon,m,P,d,dt,spd,p){ var T=mon._seek; if(!T)return MX.MOVE.chase(A,mon,m,P,d,dt,spd,p); if(d<60&&m.aggro)return MX.MOVE.chase(A,mon,m,P,d,dt,spd,p); if(Math.hypot(T.x-mon.x,T.y-mon.y)>14)MX.step(A,mon,Math.atan2(T.y-mon.y,T.x-mon.x),spd,dt,true); };
function _trialMobId(q){ var L=MON_ROSTER.filter(function(R){ return R.q===q&&R.seg==='main'&&R.tier<=2&&!MON_LEGACY[R.id]&&MX.KITS[R.id]&&!/split|summon|burrow|revive|explode/.test(MX.KITS[R.id]); }); return L.length?L[(q*7)%L.length].id:null; }
function _trialShadeId(q){ var rid='trial_shade_'+q; if(MON_BY_ID[rid])return rid; var base=MON_ROSTER.find(function(R){ return R.q===q&&(R.spec.plan==='wisp'||R.spec.plan==='wraith'); })||MON_ROSTER.find(function(R){ return R.spec.plan==='wisp'; });
  MON_BY_ID[rid]={id:rid,name:'Shadow Wisp',q:q,seg:'main',role:'',tier:1,spec:Object.assign({},base.spec,{pal:['#3a2a5a','#1a1030','#b080ff','#ff60ff'],_fr:null}),tags:[]}; MX.KITS[rid]='seek spd=48 | melee m=0.6 cd=1.4'; return rid; }
function _trialDuelId(q,fid){ var rid='trial_duel_'+fid; if(MON_BY_ID[rid])return rid; var D=_famDesign(fid), C=CHAR_BY_ID['bf_shadow_twin']||CHAR_BY_ID['boss_shadow_lord'];
  MON_BY_ID[rid]={id:rid,name:'Shadow '+D.name,q:q,seg:'boss',role:'boss',tier:5,spec:C.spec,tags:[]};
  MX.KITS[rid]={1:'orbit r=120 | shoot p=orb n=2 sp=0.3 m=0.6 cd=2.4',2:'orbit r=130 | shoot p=orb n=3 sp=0.25 m=0.7 cd=2.2 | ring spd=140 max=220 gap=1 m=0.8 cd=4.5',3:'orbit r=130 | shoot p=orb n=4 sp=0.25 m=0.8 cd=2 | ring spd=150 max=230 gap=1 m=0.9 cd=4 | lunge r=180 m=1 cd=5',4:'orbit r=140 | shoot p=orb n=5 sp=0.2 m=0.9 cd=1.8 | ring spd=160 max=240 gap=1 m=1 cd=3.6 | lunge r=200 m=1.1 cd=4.5 | marks n=4 rad=26 delay=1.2 spread=140 col=#b080ff m=0.9 cd=6'}[q]||'chase | melee';
  return rid; }
// dev / Site Lab: jump straight into any fairy's trial (i = 0…4) or a monarch's (i = 'm')
function sbTrial(q,i){ var ws=game.scene.getScene('World'); if(!ws||!game.scene.isActive('World'))return false; var fid=FAM_BY_SEC[q]||'fam_grass';
  if(i==='m'){ var MS=MONARCH_TRIAL_PLAN[q]; if(!MS)return false; TrialRealm.enter(ws,{key:'dev_m'+q,q:q,i:9,fid:fid,stages:MS,tier:q+1,title:'Trial of '+_monarchOf(q).name,host:_monarchOf(q).name,win:function(){ showNotif('(dev) monarch trial passed','#aaffcc'); }}); return true; }
  var tp=_trialPlanOf(q,i); TrialRealm.enter(ws,{key:'dev_'+q+'_'+i,q:q,i:i,fid:fid,stages:[tp.theme],tier:tp.tier,title:tp.name,host:'the fairy',win:function(){ showNotif('(dev) trial passed','#aaffcc'); }}); return true; }
