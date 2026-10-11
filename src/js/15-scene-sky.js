// ═══════════════════════════════════════════════════════════════════════
// ║ 15-scene-sky.js — the Sky Port siege (round 45 rewrite).
// ║ Kris (Oct 10): "we also need to fix skyports. First off, you don't pause in the real world when entering them. Also, the graphics are bad, and we
// ║ need to improve them … Make it even more like space invaders with additional skills, including if we need to create any new painted images."
// ║   • The world sleeps while you fly (it was left running), and its HUD, labels and leaves are hidden.
// ║   • Space-Invaders rules: a formation of the realm's flying monsters marches side to side and steps down at each edge, faster as it thins;
// ║     the bottom of each column drops bombs; cloud bunkers shield you and wear away; a war-galleon crosses the top now and then for a bonus;
// ║     four waves, then the realm's sky guardian.
// ║   • Your skills: Space shoot (hold and release for a charged, piercing shot) · Alt barrel roll (a quick side-dodge, untouchable) · Shift wind
// ║     shield · X sky bomb (clears the shots, hurts everything; two per flight) · drops: triple shot, rapid fire, wingmen, shield, bomb, repairs.
// ║   • Painted where the pictures exist: the hero's sky ship, the realm's painted flying monsters, floating islands, the sky dock; the new sky
// ║     sheets (wave 47, sk_*: backdrops, galleons, bunkers, wingman, power-ups, explosions) are used as soon as they are in; until then they are drawn.
// ═══════════════════════════════════════════════════════════════════════
var SKY={
  BG:{1:['#7ec8f0','#e6f6ff','#ffe9b0'],2:['#5f9fb8','#cfe6e2','#e8f0e0'],3:['#33508f','#a9c2ea','#e8eeff'],4:['#2e1626','#d0603e','#ffd08a']},
  FLY:/bird|bat|moth|wasp|wisp|fly|kite|sylph|spirit|harpy|wing|drake|gull|crow|owl|heron|phoenix|wyvern|imp|sprite|djinn|gargoyle/,
  ROWS:[[4,9],[4,10],[5,10],[5,11]], MOTHER:{1:'mt_sky_glider',2:'mt_storm_drake',3:'mt_ember_phoenix',4:'mt_void_serpent'},
  // the realm's flyers (painted roster monsters) for the formation
  flyers:function(q){ var L=(typeof MON_ROSTER!=='undefined'?MON_ROSTER:[]).filter(function(R){ var pl=(R.spec&&R.spec.plan)||''; return R.q===q&&(SKY.FLY.test(R.id)||SKY.FLY.test(String(pl))); });
    if(L.length<3)L=(typeof MON_ROSTER!=='undefined'?MON_ROSTER:[]).filter(function(R){ return R.q===q; }).slice(0,6); return L; }
};
class SkyScene extends Phaser.Scene{
  constructor(){super('Sky')}
  init(d){this.worldScene=d.worldScene;this.site=d.site||{section:1,id:'s1_skyport'};}
  create(){
    var W=this.scale.width,H=this.scale.height,self=this;
    this.ps=this.worldScene.playerState; this.W=W; this.H=H; this.sec=(this.site&&this.site.section)||1;
    // the world stops while you fly (Kris: "you don't pause in the real world when entering them")
    this._sleepWorld=function(){ try{ var w=game.scene.getScene('World'); if(w&&(w.sys.isActive()||w.sys.isPaused())){ if(w.sys.isPaused())w.sys.resume(); w.sys.sleep(); } }catch(e){} }; this._sleepWorld();
    document.body.classList.add('sky-mode'); ['hud','dungeon-hud'].forEach(function(id){ var el=document.getElementById(id); if(el)el.style.display='none'; });
    this._bg(); this._city();
    // ── the ship ──
    this.px=W/2; this.py=H*0.8; this.plCont=this.add.container(this.px,this.py).setDepth(10);
    var fus=this.add.rectangle(0,0,8,28,0x4488dd), wl=this.add.triangle(-18,4,0,-8,0,8,-18,8,0x4466bb), wr=this.add.triangle(18,4,0,-8,0,8,18,8,0x4466bb), nose=this.add.triangle(0,-14,-5,-8,5,-8,0,-20,0xaaccff);
    this.plCont.add([wl,wr,fus,nose]); this.shieldVis=this.add.circle(0,0,30,0x9fe8ff,0.18).setStrokeStyle(2,0xbff6ff,0.8).setVisible(false); this.plCont.add(this.shieldVis);
    // ── state ──
    this.shipLevel=0; this.shipXp=0; this.shipBaseDmg=2+(this.ps.skyportShotUpgrade||0); this.shipDmg=this.shipBaseDmg; this._xpForLevel=function(lv){ return 10+5*lv; };
    this.lives=3; this.iT=0; this.cityHp=500; this.cityMaxHp=500; this.score=0; this.combo=0;
    this.bullets=[]; this.eshots=[]; this.enemies=[]; this.drops=[]; this.bunkers=[]; this.wing=[];
    this.cd={shot:0,roll:0,shield:0}; this.charge=0; this.bombs=2; this.buff={tri:0,rapid:0,wing:0}; this.shieldT=0; this.rollT=0; this.rollDir=0;
    this.waveNum=0; this._totalWaves=4; this.done=false; this.bossOn=false; this.motherT=14;
    // ── HUD (crisp DOM text, like the rest of the game) ──
    this.hud=domText(this,W/2,10,'',{fontSize:'14px',color:'#ffffff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5,0).setDepth(30).setScrollFactor(0);
    this.hudL=domText(this,12,10,'',{fontSize:'11px',color:'#ffe9a8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(0,0).setDepth(30).setScrollFactor(0);
    this.hudR=domText(this,W-12,10,'',{fontSize:'11px',color:'#bff6ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'right'}).setOrigin(1,0).setDepth(30).setScrollFactor(0);
    this.help=domText(this,W/2,H-28,'A/D move · Space shoot (hold to charge) · Alt roll · Shift shield · X sky bomb',{fontSize:'10px',color:'rgba(255,255,255,.7)',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5,1).setDepth(30);
    this.cityBarBg=this.add.rectangle(W/2,H-8,W-40,8,0x101820,0.8).setDepth(29); this.cityBar=this.add.rectangle(20,H-8,W-40,8,0x44ff88).setOrigin(0,.5).setDepth(30);
    this.keys=this.input.keyboard.addKeys({UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',W:'W',A:'A',S:'S',D:'D',SPACE:'SPACE',SHIFT:'SHIFT',X:'X',ALT:'ALT'});
    this.input.keyboard.on('keydown-ALT',function(e){ if(e&&e.preventDefault)e.preventDefault(); self._roll(); });
    this.input.keyboard.on('keydown-X',function(){ self._bomb(); }); this.input.keyboard.on('keydown-SHIFT',function(){ self._shield(); });
    this.FLY=SKY.flyers(this.sec); this._bunkers(); this._wave(1); this._hudUp();
  }
  // ── backdrop: the realm's sky, three layers of soft clouds drifting at different speeds, distant painted floating islands ──
  _bg(){ var W=this.W, H=this.H, C=SKY.BG[this.sec]||SKY.BG[1], self=this, Z=typeof ZScn!=='undefined'?ZScn:null;
    var bgId='sk_bg_'+this.sec, tex=Z&&Z.has(bgId)&&Z.texture(this,bgId,H,{shadow:false});
    if(tex){ this.add.image(W/2,H,tex.key).setOrigin(0.5,1).setDisplaySize(Math.max(W,tex.w*H/tex.h),H).setDepth(-20); }
    else { var cv=mkCanvas(4,256), g=cv.getContext('2d'), gr=g.createLinearGradient(0,0,0,256); gr.addColorStop(0,C[0]); gr.addColorStop(0.75,C[1]); gr.addColorStop(1,C[2]); g.fillStyle=gr; g.fillRect(0,0,4,256);
      if(!this.textures.exists('sky_grad_'+this.sec))this.textures.addCanvas('sky_grad_'+this.sec,cv); this.add.image(0,0,'sky_grad_'+this.sec).setOrigin(0).setDisplaySize(W,H).setDepth(-20);
      var sun=this.add.circle(W*0.78,H*0.18,70,0xfff2c0,0.35).setDepth(-19); this.add.circle(W*0.78,H*0.18,34,0xffffff,0.55).setDepth(-19); }
    if(!this.textures.exists('sky_cloud')){ var cc=mkCanvas(256,128), x=cc.getContext('2d'); [[60,80,46],[110,60,58],[170,74,48],[210,88,34],[140,92,50]].forEach(function(b){ var rg=x.createRadialGradient(b[0],b[1]-10,4,b[0],b[1],b[2]); rg.addColorStop(0,'rgba(255,255,255,1)'); rg.addColorStop(0.7,'rgba(240,248,255,.85)'); rg.addColorStop(1,'rgba(220,235,250,0)'); x.fillStyle=rg; x.beginPath(); x.arc(b[0],b[1],b[2],0,Math.PI*2); x.fill(); }); this.textures.addCanvas('sky_cloud',cc); }
    this.clouds=[]; [[0.35,0.5,8,-18],[0.6,0.75,16,-15],[0.95,1,30,-12]].forEach(function(L,li){ for(var i=0;i<5;i++){ var c=self.add.image(Math.random()*W,H*(0.08+Math.random()*0.6),'sky_cloud').setScale(L[0]+Math.random()*0.3).setAlpha(L[1]*0.8).setDepth(L[3]); c._v=L[2]; self.clouds.push(c); } });
    // distant floating islands (the painted ones of the world)
    if(Z&&Z.has('lm_floatrock')){ for(var k=0;k<3;k++){ var t2=Z.texture(this,k%2&&Z.has('lm_floatrock_tree')?'lm_floatrock_tree':'lm_floatrock',70+Math.random()*50,{shadow:false}); if(t2){ var im=this.add.image(W*(0.15+k*0.33)+Math.random()*60,H*(0.25+Math.random()*0.25),t2.key).setOrigin(0.5,1).setAlpha(0.55).setDepth(-16); im._v=4; im.setTint(0xd8e6ff); self.clouds.push(im); this.tweens.add({targets:im,y:im.y-8,duration:2600+k*500,yoyo:true,repeat:-1,ease:'Sine.inOut'}); } } }
  }
  // the skyport you defend: painted docks and balloons when there, a soft skyline otherwise
  _city(){ var W=this.W, H=this.H, Z=typeof ZScn!=='undefined'?ZScn:null, self=this, g=this.add.graphics().setDepth(2);
    var C=SKY.BG[this.sec]||SKY.BG[1]; g.fillStyle(Phaser.Display.Color.HexStringToColor(shade(C[0],-0.45)).color,1);
    for(var x=0;x<W;x+=46){ var h=24+Math.abs(Math.sin(x*0.07))*40+(x%92?0:20); g.fillRect(x,H-14-h,40,h); g.fillStyle(0xffd27a,0.7); for(var w=0;w<3;w++)if(Math.random()<0.6)g.fillRect(x+6+w*11,H-8-h+8+Math.random()*(h-16),4,5); g.fillStyle(Phaser.Display.Color.HexStringToColor(shade(C[0],-0.45)).color,1); }
    if(Z&&Z.has('vb_sky_dock')){ [0.18,0.82].forEach(function(f){ var t=Z.texture(self,'vb_sky_dock',96,{shadow:false}); if(t)self.add.image(W*f,H-12,t.key).setOrigin(0.5,1).setDepth(3); }); if(Z.has('vb_balloon')){ var tb=Z.texture(self,'vb_balloon',70,{shadow:false}); if(tb){ var b=self.add.image(W*0.18+18,H-90,tb.key).setOrigin(0.5,1).setDepth(3); self.tweens.add({targets:b,y:b.y-6,duration:1800,yoyo:true,repeat:-1,ease:'Sine.inOut'}); } } } }
  // ── cloud bunkers (each a block of puffs that wears away) ──
  _bunkers(){ var W=this.W, H=this.H, n=4, self=this; this.bunkers.forEach(function(c){ c.vis.destroy(); }); this.bunkers=[];
    for(var b=0;b<n;b++){ var cx=W*(b+0.5)/n, cy=this.py-80; for(var j=0;j<3;j++)for(var i=0;i<7;i++){ if(j===2&&(i===2||i===3||i===4))continue; var x=cx+(i-3)*12, y=cy+j*10, Z=typeof ZScn!=='undefined'?ZScn:null, pz=Z&&Z.has('sk_bunker'), v=this.add.image(x,y,'sky_cloud').setScale(0.13+Math.random()*0.04).setAngle(Math.random()*40-20).setDepth(6); this.bunkers.push({x:x,y:y,hp:3,vis:v}); } } }
  // ── a wave: the formation ──
  _wave(n){ var self=this, W=this.W; this.waveNum=n; var RC=SKY.ROWS[Math.min(n-1,3)], rows=RC[0], cols=RC[1], sx=W/2-(cols-1)*26, sy=70;
    this.form={dx:1,spd:26+n*8,step:16,x:0,y:0}; this.enemies=[];
    for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){ var R=this.FLY[(r+n)%Math.max(1,this.FLY.length)], hp=(r===0?3:r<2?2:1)*(2+n);
      var e=this._mkEnemy(R,sx+c*52,sy+r*44,26+(r===0?6:0)); e.hp=e.maxHp=hp; e.row=r; e.col=c; e.bx=sx+c*52; e.by=sy+r*44; e.xp=r===0?3:r<2?2:1; this.enemies.push(e); }
    this._banner('Wave '+n+' / '+this._totalWaves); this._hudUp(); }
  _mkEnemy(R,x,y,h){ var cont=this.add.container(x,y).setDepth(8), im=null;
    if(R&&typeof ZAtlas!=='undefined'){ try{ im=this.add.image(0,0,'__DEFAULT').setOrigin(0.5,0.6); var zk=ZAtlas.kHeight(R.id,h), zr=ZAtlas.simple(im,R.id,['move','idle','fly','walk'],'x',Math.random()*3,8,true,zk); if(!zr&&ZAtlas.state(R.id)!=='load'){ im.destroy(); im=null; } else { im._zch=R.id; im._zk=zk; } }catch(e){ im=null; } }
    if(!im&&R&&typeof MX!=='undefined'){ try{ im=this.add.image(0,0,MX.tex(this,R),'0').setScale(h/30); }catch(e){ im=null; } }
    if(!im)im=this.add.text(0,0,'👾',{fontSize:h+'px'}).setOrigin(0.5);
    cont.add(im); return {cont:cont,im:im,R:R,x:x,y:y,h:h,t:Math.random()*3,dead:false}; }
  _banner(t){ var b=domText(this,this.W/2,this.H*0.42,t,{fontSize:'26px',color:'#ffe9a8',fontFamily:'"Cinzel",Georgia,serif',stroke:'#000',strokeThickness:5}).setOrigin(.5).setDepth(40); this.tweens.add({targets:b,alpha:0,delay:1300,duration:600,onComplete:function(){ b.destroy(); }}); }
  // ── the guardian (wave 5): a great painted beast that sweeps and fires fans of shots ──
  _boss(){ this.bossOn=true; var id=SKY.MOTHER[this.sec], R={id:id}, e=this._mkEnemy(null,this.W/2,110,90), Z=null;
    if(typeof ZAtlas!=='undefined'){ try{ e.im.destroy(); var im=this.add.image(0,0,'__DEFAULT').setOrigin(0.5,0.6); if(ZAtlas.simple(im,id,['ride_side','move','idle'],'x',0,6,true,ZAtlas.kHeight(id,120))){ e.cont.removeAll(); e.cont.add(im); e.im=im; } else { im.destroy(); e.cont.add(e.im=this.add.text(0,0,'🐉',{fontSize:'80px'}).setOrigin(0.5)); } }catch(err){} }
    e.boss=true; e.hp=e.maxHp=180+this.sec*90+(this.ps.level||1)*6; e.t=0; e.bar=this.add.rectangle(this.W/2,52,this.W*0.5,8,0xff5040).setDepth(30); e.barBg=this.add.rectangle(this.W/2,52,this.W*0.5,8,0x101010,0.7).setDepth(29);
    this.enemies=[e]; this._banner('The Sky Guardian!'); }
  // ── skills ──
  _roll(){ if(this.done||this.cd.roll>0)return; var dir=(this.keys.A.isDown||this.keys.LEFT.isDown)?-1:(this.keys.D.isDown||this.keys.RIGHT.isDown)?1:(this.rollDir||1); this.rollT=0.32; this.rollDir=dir; this.cd.roll=1.1; this.iT=Math.max(this.iT,0.45);
    this.tweens.add({targets:this.plCont,angle:dir*360,duration:320,onComplete:(function(c){ return function(){ c.angle=0; }; })(this.plCont)}); }
  _shield(){ if(this.done||this.cd.shield>0)return; this.shieldT=2.6; this.cd.shield=12; this.shieldVis.setVisible(true); this._hudUp(); }
  _bomb(){ if(this.done||this.bombs<=0)return; this.bombs--; var self=this; this.cameras.main.flash(260,255,250,220); this.eshots.forEach(function(s){ s.vis.destroy(); }); this.eshots=[];
    this.enemies.forEach(function(e){ if(!e.dead)self._hit(e,e.boss?25:6+self.waveNum*2); }); this._hudUp(); }
  _fire(charged){ var self=this, n=this.buff.tri>0?3:1, dmg=this.shipDmg*(charged?4:1);
    for(var i=0;i<n;i++){ var a=-Math.PI/2+(n>1?(i-1)*0.18:0); self._shot(self.px,self.py-22,a,dmg,charged); }
    this.wing.forEach(function(w){ self._shot(w.x,w.y-10,-Math.PI/2,Math.max(1,dmg*0.4),false); }); }
  _shot(x,y,a,dmg,big){ var spd=big?560:640, vis=(typeof ZShot!=='undefined'&&ZShot.make(this,'lightning',x,y,a,9))||this.add.rectangle(x,y,3,12,0xbff6ff).setDepth(9);
    if(big&&vis.setTint)vis.setTint(0xfff0a0); this.bullets.push({x:x,y:y,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd,dmg:dmg,pierce:big?4:0,vis:vis}); }
  _eshot(x,y,a,spd,boss){ var vis=(typeof ZShot!=='undefined'&&ZShot.make(this,boss?'fireball':'spit',x,y,a,9))||this.add.circle(x,y,4,0xff7040).setDepth(9); this.eshots.push({x:x,y:y,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd,vis:vis}); }
  _hit(e,d){ if(e.dead)return; e.hp-=d; if(e.im&&e.im.setTintFill){ e.im.setTintFill(0xffffff); this.time.delayedCall(70,function(){ if(e.im&&e.im.clearTint)e.im.clearTint(); }); }
    if(e.boss&&e.bar)e.bar.width=this.W*0.5*Math.max(0,e.hp/e.maxHp); if(e.hp<=0)this._kill(e); }
  _kill(e){ e.dead=true; var self=this; this._boom(e.cont.x,e.cont.y,e.boss?3:1); e.cont.destroy(); if(e.bar){ e.bar.destroy(); e.barBg.destroy(); }
    this.combo++; this.score+=(e.xp||1)*10*Math.min(5,1+Math.floor(this.combo/5)); this._gainXp(e.boss?20:e.mother?8:(e.xp||1));
    if(e.mother||Math.random()<0.12)this._drop(e.cont.x,e.cont.y); if(e.boss){ this.time.delayedCall(900,function(){ self._endGame(true); }); } }
  _boom(x,y,k){ for(var i=0;i<8*k;i++){ var c=this.add.circle(x,y,3+Math.random()*4*k,[0xfff0a0,0xffa040,0xffffff][i%3],0.9).setDepth(12); this.tweens.add({targets:c,x:x+(Math.random()-0.5)*60*k,y:y+(Math.random()-0.5)*50*k,alpha:0,scale:0.2,duration:380+Math.random()*300,onComplete:(function(o){ return function(){ o.destroy(); }; })(c)}); } }
  _drop(x,y){ var K=['tri','rapid','wing','shield','bomb','heal'], k=K[Math.floor(Math.random()*K.length)], ic={tri:'🔱',rapid:'⚡',wing:'🕊️',shield:'🛡️',bomb:'💣',heal:'💚'}[k], Z=typeof ZScn!=='undefined'?ZScn:null, vis;
    var pid='sk_pu_'+k, t=Z&&Z.has(pid)&&Z.texture(this,pid,30,{shadow:false}); vis=t?this.add.image(x,y,t.key).setDepth(9):this.add.text(x,y,ic,{fontSize:'22px'}).setOrigin(0.5).setDepth(9);
    var ring=this.add.circle(x,y,15,0xffffff,0.15).setStrokeStyle(2,0xffe9a8,0.8).setDepth(8); this.drops.push({x:x,y:y,k:k,vis:vis,ring:ring}); }
  _take(d){ var self=this; if(d.k==='tri')this.buff.tri=10; else if(d.k==='rapid')this.buff.rapid=10; else if(d.k==='shield'){ this.cd.shield=0; this._shield(); } else if(d.k==='bomb')this.bombs=Math.min(4,this.bombs+1); else if(d.k==='heal')this.cityHp=Math.min(this.cityMaxHp,this.cityHp+60);
    else if(d.k==='wing'){ this.buff.wing=15; if(!this.wing.length)[-1,1].forEach(function(s){ var Z=typeof ZScn!=='undefined'?ZScn:null, t=Z&&Z.has('sk_drone')&&Z.texture(self,'sk_drone',22,{shadow:false}), v=t?self.add.image(0,0,t.key).setDepth(10):self.add.triangle(0,0,0,-8,-7,6,7,6,0xbff6ff).setDepth(10); self.wing.push({s:s,x:self.px,y:self.py,vis:v}); }); }
    showNotif({tri:'🔱 Triple shot!',rapid:'⚡ Rapid fire!',wing:'🕊️ Wingmen!',shield:'🛡️ Wind shield!',bomb:'💣 +1 sky bomb',heal:'💚 The port is patched up'}[d.k],'#bff6ff'); this._hudUp(); }
  _gainXp(n){ this.shipXp+=n; var need=this._xpForLevel(this.shipLevel); if(this.shipXp>=need){ this.shipXp-=need; this.shipLevel++; this.shipDmg=this.shipBaseDmg+this.shipLevel; this._banner('Ship level '+this.shipLevel+'!'); } this._hudUp(); }
  _hudUp(){ if(!this.hud)return; this.hud.setText(this.bossOn?'The Sky Guardian':'Wave '+this.waveNum+' / '+this._totalWaves+'   ·   score '+this.score+(this.combo>=5?'  ×'+Math.min(5,1+Math.floor(this.combo/5)):''));
    this.hudL.setText('Ship Lv '+this.shipLevel+' · shot '+this.shipDmg+'   '+'♥'.repeat(Math.max(0,this.lives)));
    this.hudR.setText('💣 '+this.bombs+'   🛡 '+(this.cd.shield>0?Math.ceil(this.cd.shield)+'s':'ready')+(this.buff.tri>0?'   🔱':'')+(this.buff.rapid>0?'   ⚡':'')+(this.buff.wing>0?'   🕊️':''));
    var pct=Math.max(0,this.cityHp/this.cityMaxHp); this.cityBar.width=(this.W-40)*pct; this.cityBar.setFillStyle(pct>0.6?0x44ff88:pct>0.3?0xffaa00:0xff3322); }
  _hurtShip(){ if(this.iT>0||this.shieldT>0||this.rollT>0)return; this.lives--; this.iT=1.6; this.combo=0; this.cameras.main.shake(200,0.01); this._boom(this.px,this.py,1); this._hudUp(); if(this.lives<=0)this._endGame(false); }
  update(_,ms){ if(game.scene.isActive('World'))this._sleepWorld(); if(this.done)return; var dt=Math.min(0.05,ms/1000), self=this, W=this.W, H=this.H, k=this.keys;
    this.clouds.forEach(function(c){ c.x+=c._v*dt; if(c.x>W+160)c.x=-160; });
    // ship
    var vx=0, spd=this.buff.rapid>0?300:260; if(k.A.isDown||k.LEFT.isDown)vx=-spd; if(k.D.isDown||k.RIGHT.isDown)vx=spd; if(this.rollT>0){ this.rollT-=dt; vx=this.rollDir*620; }
    var vy=(k.W.isDown||k.UP.isDown)?-160:(k.S.isDown||k.DOWN.isDown)?160:0; this.px=Phaser.Math.Clamp(this.px+vx*dt,24,W-24); this.py=Phaser.Math.Clamp(this.py+vy*dt,H*0.72,H*0.86);
    this.plCont.setPosition(this.px,this.py); if(this.iT>0){ this.iT-=dt; this.plCont.setAlpha(this.rollT>0?1:(Math.floor(this.iT*12)%2?0.4:1)); } else this.plCont.setAlpha(1);
    if(this.shieldT>0){ this.shieldT-=dt; if(this.shieldT<=0)this.shieldVis.setVisible(false); }
    ['shot','roll','shield'].forEach(function(q){ if(self.cd[q]>0)self.cd[q]-=dt; }); ['tri','rapid','wing'].forEach(function(q){ if(self.buff[q]>0)self.buff[q]-=dt; });
    if(this.buff.wing<=0&&this.wing.length){ this.wing.forEach(function(w){ w.vis.destroy(); }); this.wing=[]; }
    this.wing.forEach(function(w,i){ w.x+=(self.px+w.s*42-w.x)*Math.min(1,dt*8); w.y+=(self.py+12-w.y)*Math.min(1,dt*8); w.vis.setPosition(w.x,w.y); });
    if(typeof ZAtlas!=='undefined'){ try{ ZAtlas.vehicle(this,this.plCont,'veh_'+((this.ps&&this.ps.hero)==='f'?'f':'m')+'_sky_ship',44,!!(vx||vy),this.cd.shot>0.05,dt); }catch(e){} }
    // shooting: tap, or hold to charge (a bright ring grows), release for a piercing shot
    if(k.SPACE.isDown){ this.charge+=dt; if(this.cd.shot<=0&&this.charge<0.35){ this._fire(false); this.cd.shot=this.buff.rapid>0?0.12:0.26; } if(this.charge>0.6&&!this._chVis){ this._chVis=this.add.circle(0,-24,6,0xfff0a0,0.8).setDepth(11); this.plCont.add(this._chVis); } if(this._chVis)this._chVis.setRadius(6+Math.min(1,(this.charge-0.6)/0.6)*8); }
    else { if(this.charge>0.6){ this._fire(true); } this.charge=0; if(this._chVis){ this._chVis.destroy(); this._chVis=null; } }
    this.bullets=this.bullets.filter(function(b){ b.x+=b.vx*dt; b.y+=b.vy*dt; b.vis.setPosition(b.x,b.y); if(b.y<-20){ b.vis.destroy(); return false; }
      for(var i=0;i<self.enemies.length;i++){ var e=self.enemies[i]; if(e.dead)continue; var r=e.boss?60:e.h*0.55; if(Math.abs(b.x-e.cont.x)<r&&Math.abs(b.y-e.cont.y)<r){ self._hit(e,b.dmg); if(b.pierce-->0)continue; b.vis.destroy(); return false; } }
      for(var j=0;j<self.bunkers.length;j++){ var c=self.bunkers[j]; if(c.hp>0&&Math.abs(b.x-c.x)<8&&Math.abs(b.y-c.y)<8&&!b.pierce){ b.vis.destroy(); return false; } } return true; });
    // the formation marches; the bottom of each column bombs
    var alive=this.enemies.filter(function(e){ return !e.dead; });
    if(!this.bossOn&&alive.length){ var F=this.form, sp=F.spd*(1+(1-alive.length/(SKY.ROWS[Math.min(this.waveNum-1,3)][0]*SKY.ROWS[Math.min(this.waveNum-1,3)][1]))*2.2), minX=1e9, maxX=-1e9, maxY=0;
      F.x+=F.dx*sp*dt; alive.forEach(function(e){ minX=Math.min(minX,e.bx+F.x); maxX=Math.max(maxX,e.bx+F.x); maxY=Math.max(maxY,e.by+F.y); });
      if(maxX>W-30||minX<30){ F.dx*=-1; F.x+=F.dx*4; F.y+=F.step; }
      alive.forEach(function(e){ e.t+=dt; e.cont.setPosition(e.bx+F.x,e.by+F.y+Math.sin(e.t*3)*2); if(e.im&&e.im._zch&&typeof ZAtlas!=='undefined'){ try{ ZAtlas.simple(e.im,e.im._zch,['move','idle','fly','walk'],'x',e.t,8,true,e.im._zk); }catch(err){} } });
      if(maxY>this.py-110)this.bunkers.forEach(function(c){ if(c.hp>0&&c.y<maxY+20){ c.hp=0; c.vis.setVisible(false); } });
      if(maxY>this.py-30){ this.cityHp-=120; this._hurtShip(); alive.forEach(function(e){ e.dead=true; e.cont.destroy(); }); }
      this._bombT=(this._bombT||1.2)-dt; if(this._bombT<=0){ this._bombT=Math.max(0.35,1.4-this.waveNum*0.2)*(0.6+Math.random()*0.8); var cols={}; alive.forEach(function(e){ if(!cols[e.col]||cols[e.col].row<e.row)cols[e.col]=e; }); var L=Object.keys(cols).map(function(c){ return cols[c]; }); if(L.length){ var sh=L[Math.floor(Math.random()*L.length)]; this._eshot(sh.cont.x,sh.cont.y+12,Math.PI/2,200+this.waveNum*20); } }
      // the galleon crosses the top for a bonus
      this.motherT-=dt; if(this.motherT<=0&&!this._mother){ this.motherT=18+Math.random()*8; var dir=Math.random()<0.5?1:-1, Z=typeof ZScn!=='undefined'?ZScn:null, gid='sk_galleon_'+this.sec, t=Z&&Z.has(gid)&&Z.texture(this,gid,46,{shadow:false}), mc=this.add.container(dir>0?-60:W+60,38).setDepth(8);
        mc.add(t?this.add.image(0,0,t.key).setFlipX(dir<0):this.add.text(0,0,'⛵',{fontSize:'34px'}).setOrigin(0.5)); this._mother={cont:mc,im:mc.list[0],dir:dir,hp:6+this.waveNum*3,maxHp:9,xp:5,mother:true,h:40,dead:false}; this.enemies.push(this._mother); } }
    if(this._mother){ var M=this._mother; if(M.dead)this._mother=null; else { M.cont.x+=M.dir*120*dt; if(M.cont.x<-80||M.cont.x>W+80){ M.dead=true; M.cont.destroy(); this._mother=null; } } }
    // the guardian
    if(this.bossOn){ var B=this.enemies[0]; if(B&&!B.dead){ B.t+=dt; B.cont.setPosition(W/2+Math.sin(B.t*0.6)*W*0.33,110+Math.sin(B.t*1.3)*24); this._bfT=(this._bfT||1.5)-dt;
      if(this._bfT<=0){ var ph=B.hp<B.maxHp*0.5; this._bfT=ph?0.9:1.4; var a0=Math.atan2(this.py-B.cont.y,this.px-B.cont.x), n=ph?7:5; for(var q=0;q<n;q++)this._eshot(B.cont.x,B.cont.y+30,a0+(q-(n-1)/2)*0.16,220,true); } } }
    // enemy shots
    this.eshots=this.eshots.filter(function(s){ s.x+=s.vx*dt; s.y+=s.vy*dt; s.vis.setPosition(s.x,s.y); if(s.y>H+20||s.x<-20||s.x>W+20){ s.vis.destroy(); return false; }
      for(var j=0;j<self.bunkers.length;j++){ var c=self.bunkers[j]; if(c.hp>0&&Math.abs(s.x-c.x)<9&&Math.abs(s.y-c.y)<9){ c.hp--; c.vis.setAlpha(0.3+c.hp*0.22); if(c.hp<=0)c.vis.setVisible(false); s.vis.destroy(); return false; } }
      if(Math.abs(s.x-self.px)<16&&Math.abs(s.y-self.py)<18){ s.vis.destroy(); self._hurtShip(); return false; }
      if(s.y>H-40){ self.cityHp-=8; s.vis.destroy(); self._hudUp(); if(self.cityHp<=0)self._endGame(false); return false; } return true; });
    // drops
    this.drops=this.drops.filter(function(d){ d.y+=70*dt; d.vis.setPosition(d.x,d.y); d.ring.setPosition(d.x,d.y); if(Math.hypot(d.x-self.px,d.y-self.py)<30){ d.vis.destroy(); d.ring.destroy(); self._take(d); return false; } if(d.y>H){ d.vis.destroy(); d.ring.destroy(); return false; } return true; });
    // next wave / the guardian
    if(!this.bossOn&&!this.enemies.some(function(e){ return !e.dead&&!e.mother; })&&!this._between){ this._between=true; this.time.delayedCall(1400,function(){ self._between=false; if(self.done)return; if(self.waveNum<self._totalWaves){ self._wave(self.waveNum+1); if(self.waveNum===3)self._bunkers(); } else self._boss(); }); }
    if(!this._hudT||(this._hudT-=dt)<=0){ this._hudT=0.25; this._hudUp(); }
  }
  _endGame(won){ if(this.done)return; this.done=true; var self=this;
    if(!won){ this._banner('The port fell — retreating…'); this.time.delayedCall(2000,function(){ self._exitToWorld(); }); return; }
    var ps=this.ps; if(!ps.lockedSites)ps.lockedSites=[]; var siteId=this.site?this.site.id:'s1_skyport'; if(!ps.lockedSites.includes(siteId))ps.lockedSites.push(siteId);
    _completeQuest(ps,'s'+((this.site&&this.site.section)||1)+'_skyport');
    var W=this.W,H=this.H, sec=this.sec;
    // Round 37 (Kris): the port's mount is always given on the first victory; the choice is a weapon or gems.
    var MT={1:'sky_glider',2:'storm_drake',3:'ember_phoenix',4:'void_serpent'}[sec]||'void_serpent';
    if(!ps.ownedMounts)ps.ownedMounts=[];
    if(ps.ownedMounts.indexOf(MT)<0){ ps.ownedMounts.push(MT); showNotif(MOUNTS[MT].icon+'  '+MOUNTS[MT].n+' — the port\'s mount is yours! (Choose it at the stables.)','#aaddff'); if(typeof Tome!=='undefined'&&Tome.see)Tome.see('mount',MT); }
    if(typeof _zMountChecks==='function'&&_zMountChecks(ps))this.time.delayedCall(1400,function(){ showNotif('🦅  All four Sky Ports stand — Captain Vela gives you the Sky Eagle!','#ffe9a8'); });
    var rewardsBySec={
      1:[{id:'iron_sword',  label:'Iron Sword',  icon:'⚔️', desc:'+5 ATK — sky-forged iron'},              {id:'gem_topaz',n:2,label:'2 Topaz',   icon:'🟡', desc:'The storm gem — for forging and gem setting'}],
      2:[{id:'long_sword',  label:'Long Sword',  icon:'🗡️',desc:'+10 ATK — tempered sky-steel'},          {id:'gem_topaz',n:3,label:'3 Topaz',   icon:'🟡', desc:'The storm gem — for forging and gem setting'}],
      3:[{id:'flame_sword', label:'Flame Sword', icon:'🔥', desc:'+16 ATK +4 fire — a blade of sky-fire'}, {id:'skystone', n:1,label:'Skystone',  icon:'💫', desc:'Rare storm gem — for master-work forging'}],
      4:[{id:'sky_sword',   label:'Sky Sword',   icon:'✨', desc:'+28 ATK +6 storm — sky-forged blade'},   {id:'skystone', n:2,label:'2 Skystones',icon:'💫', desc:'Rare storm gem — for master-work forging'}]
    };
    var rewards=rewardsBySec[sec]||rewardsBySec[4];
    self.add.rectangle(W/2,H/2,W*0.7,220,0x050a18,0.95).setStrokeStyle(2,0x88aaff).setDepth(40);
    domText(self,W/2,H/2-86,'The port stands! Choose 1 reward  ·  score '+this.score,{fontSize:'16px',color:'#aaddff',fontFamily:'Segoe UI',fontStyle:'bold'}).setOrigin(.5).setDepth(41);
    rewards.forEach(function(r,i){ var bx=W/2+(i-(rewards.length-1)/2)*170;
      var btn=self.add.rectangle(bx,H/2+6,140,96,0x112233,0.9).setStrokeStyle(1,0x4488aa).setInteractive({useHandCursor:true}).setDepth(41);
      domText(self,bx,H/2-24,r.icon,{fontSize:'26px',fontFamily:'serif'}).setOrigin(.5).setDepth(42);
      domText(self,bx,H/2+8,r.label,{fontSize:'11px',color:'#aaccff',fontFamily:'Segoe UI',fontStyle:'bold'}).setOrigin(.5).setDepth(42);
      domText(self,bx,H/2+28,r.desc,{fontSize:'9px',color:'#8a9ab0',fontFamily:'Segoe UI',align:'center',wordWrap:{width:130}}).setOrigin(.5).setDepth(42);
      btn.on('pointerover',function(){btn.setStrokeStyle(2,0x88ccff);}); btn.on('pointerout',function(){btn.setStrokeStyle(1,0x4488aa);});
      btn.on('pointerup',function(){ var ps2=self.ps; if(!ps2.inventory)ps2.inventory=[]; for(var _n=0;_n<(r.n||1);_n++)ps2.inventory.push(r.id); var it=ITEMS[r.id]; showNotif((it?it.icon:r.icon||'')+'  '+r.label+' added to inventory!','#aaddff'); self.worldScene._emitUI(); self.time.delayedCall(500,function(){ self._exitToWorld(); }); }); });
  }
  _exitToWorld(){
    (this.enemies||[]).forEach(function(e){if(e.cont&&e.cont.scene)e.cont.destroy();});
    (this.bullets||[]).forEach(function(b){if(b.vis&&b.vis.scene)b.vis.destroy();});
    document.body.classList.remove('sky-mode');
    this.scene.stop('Sky');
    this.scene.wake('World');
    document.getElementById('hud').style.display='';
    document.getElementById('dungeon-hud').style.display='none';
    if(this.worldScene)this.worldScene._emitUI();
  }
}

// ─── Return Home (homecast) ─────────────────────
function doHomecast(){
  var ws=game.scene.getScene('World');
  if(ws&&ws._ready&&ws.player)ws._startHomeCast();
}
function doCycleAmmo(){
  var ws=game.scene.getScene('World');
  if(ws&&ws._ready)ws._cycleAmmo();
}
