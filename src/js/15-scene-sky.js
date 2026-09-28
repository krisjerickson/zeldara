// ─── SkyScene (Sky Exploration) ──────────────────────────────────────
// ─── SkyScene: Sky Port Defender ─────────────────────────────────────────
// Player pilots a plane and shoots enemies before they reach the city below.
class SkyScene extends Phaser.Scene{
  constructor(){super('Sky')}
  init(d){this.worldScene=d.worldScene;this.site=d.site||{section:1,id:'s1_skyport'};}
  create(){
    var W=this.scale.width,H=this.scale.height,self=this;
    this.ps=this.worldScene.playerState;
    this.W=W;this.H=H;

    // ── Background: sky gradient + clouds ─────────────────────────────────
    this.add.rectangle(W/2,H*0.4,W,H*0.8,0x88bbee);
    this.add.rectangle(W/2,H*0.9,W,H*0.2,0x99bb66);
    [[W*.2,H*.15,180,30,0.7],[W*.6,H*.08,220,28,0.6],[W*.85,H*.2,150,25,0.65]].forEach(function(cl){
      self.add.ellipse(cl[0],cl[1],cl[2],cl[3],0xffffff,cl[4]);
    });

    // ── City at bottom ─────────────────────────────────────────────────────
    this.cityHp=500;this.cityMaxHp=500;
    var cityG=this.add.graphics().setDepth(2);
    cityG.fillStyle(0x445566,1);
    [[W*.1,H*.92,60,H*.08],[W*.2,H*.88,80,H*.12],[W*.35,H*.90,50,H*.10],
     [W*.55,H*.87,90,H*.13],[W*.72,H*.91,65,H*.09],[W*.85,H*.89,75,H*.11]
    ].forEach(function(b){cityG.fillRect(b[0]-b[2]/2,b[1],b[2],b[3]);});
    // City HP bar
    this.cityBarBg=this.add.rectangle(W/2,H-8,W-40,10,0x222222).setDepth(5);
    this.cityBar=this.add.rectangle(20,H-8,W-40,10,0x44ff88).setOrigin(0,.5).setDepth(6);
    this.cityLbl=this.add.text(W/2,H-8,'City: 100%',{fontSize:'8px',color:'#fff',fontFamily:'Segoe UI'}).setOrigin(.5).setDepth(7);

    // ── Player plane ───────────────────────────────────────────────────────
    this.px=W/2;this.py=H*0.75;
    this.plCont=this.add.container(this.px,this.py).setDepth(10);
    var fuselage=this.add.rectangle(0,0,8,28,0x4488dd);
    var wingL=this.add.triangle(-18,4, 0,-8, 0,8, -18,8, 0x4466bb);
    var wingR=this.add.triangle(18,4,  0,-8,  0,8,  18,8,  0x4466bb);
    var tail=this.add.rectangle(0,14,16,6,0x336699);
    var nose=this.add.triangle(0,-14, -5,-8, 5,-8, 0,-20, 0xaaccff);
    this.plCont.add([wingL,wingR,tail,fuselage,nose]);
    this.cameras.main.setBackgroundColor('#88bbee');

    // ── Ship level + upgrade ───────────────────────────────────────────────
    this.shipLevel=0;
    this.shipXp=0;
    this.shipBaseDmg=2+(this.ps.skyportShotUpgrade||0); // base dmg + purchased upgrade
    this.shipDmg=this.shipBaseDmg;
    // XP needed per level: 10, 15, 20, 25 ...
    this._xpForLevel=function(lv){return 10+5*lv;};

    // ── HUD ────────────────────────────────────────────────────────────────
    this.waveTxt=this.add.text(W/2,14,'Survive the waves!',{fontSize:'13px',color:'#fff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(10);
    this.shipLvTxt=this.add.text(14,14,'',{fontSize:'10px',color:'#ffdd88',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(0).setDepth(10);
    this.buffTxt=this.add.text(this.W-14,14,'',{fontSize:'11px',color:'#88ffcc',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2,align:'right'}).setOrigin(1,0).setDepth(10);
    this.add.text(14,H-22,'WASD: Move  SPACE: Shoot',{fontSize:'9px',color:'rgba(255,255,255,.4)',fontFamily:'Segoe UI'}).setDepth(10);

    // ── Keys ────────────────────────────────────────────────────────────────
    this.keys=this.input.keyboard.addKeys({
      UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',
      W:'W',A:'A',S:'S',D:'D',SPACE:'SPACE'
    });

    // ── Game state ─────────────────────────────────────────────────────────
    this.enemies=[];
    this.bullets=[];
    this.powerups=[];     // floating buff drops
    this.spdBuffT=0;      // seconds remaining of speed boost
    this.triShotT=0;      // seconds remaining of 3-way shot
    this._powerupSpawnT=8+Math.random()*4; // first drop ~8-12s in
    this.bulletCd=0;
    this.waveNum=0;
    this.wavesQueued=0;
    this.done=false;
    this._totalWaves=4;

    // Wave definitions: [{type, hp, spd, count, interval}]
    this.WAVES=[
      {enemies:[{type:'scout',count:6,interval:1.2},{type:'bomber',count:2,interval:2}]},
      {enemies:[{type:'scout',count:8,interval:1.0},{type:'bomber',count:4,interval:1.8}]},
      {enemies:[{type:'scout',count:10,interval:0.9},{type:'bomber',count:5,interval:1.6},{type:'heavy',count:2,interval:3}]},
      {enemies:[{type:'scout',count:6,interval:1.0},{type:'bomber',count:6,interval:1.5},{type:'heavy',count:3,interval:2.5}]},
    ];
    this.EDEFS={
      scout: {hp:10,  spd:58, col:0xee4444, r:8,  w:16, h:10, xp:1},
      bomber:{hp:40,  spd:36, col:0xcc6600, r:11, w:22, h:14, xp:3},
      heavy: {hp:140, spd:22, col:0x884400, r:16, w:30, h:18, xp:5},
    };
    this._queuedSpawns=[];
    this._allWavesSpawned=false;
    this._enqueueWave(0);
    this.wavesQueued=1;
    var waveDelays=[30000,55000,75000];
    for(var wi=0;wi<3;wi++){
      (function(idx,delay){
        self.time.delayedCall(delay,function(){self._enqueueWave(idx+1);self.wavesQueued=idx+2;});
      })(wi,waveDelays[wi]);
    }
    // Mark all waves spawned after last wave spawn + buffer
    this.time.delayedCall(80000,function(){self._allWavesSpawned=true;});
    this._updateShipHUD();
  }
  _enqueueWave(wIdx){
    var wave=this.WAVES[wIdx];if(!wave)return;
    this.waveNum=wIdx+1;
    this.waveTxt.setText('Wave '+this.waveNum+'/'+this._totalWaves);
    var self=this,delay=0;
    wave.enemies.forEach(function(group){
      for(var i=0;i<group.count;i++){
        (function(d,type){self.time.delayedCall(d*1000,function(){self._spawnEnemy(type);});})(delay,group.type);
        delay+=group.interval;
      }
    });
  }
  _spawnEnemy(type){
    if(this.done)return;
    var def=this.EDEFS[type];if(!def)return;
    var ex=40+Math.random()*(this.W-80);
    var cont=this.add.container(ex,-20).setDepth(8);
    var body=this.add.rectangle(0,0,def.w,def.h,def.col);
    var hpBg=this.add.rectangle(0,def.h/2+5,def.w,4,0x000000,.7);
    var hpFill=this.add.rectangle(-def.w/2,def.h/2+5,def.w,4,0xff3333).setOrigin(0,.5);
    cont.add([body,hpBg,hpFill]);
    this.enemies.push({cont:cont,body:body,hpFill:hpFill,type:type,def:def,
      hp:def.hp,maxHp:def.hp,x:ex,y:-20,spd:def.spd+(Math.random()*20-10),
      wobble:Math.random()*Math.PI*2,wobbleSpd:0.8+Math.random()*0.6});
  }
  _spawnPowerup(){
    if(this.done)return;
    var kind=Math.random()<0.5?'spd':'tri';
    var ex=40+Math.random()*(this.W-80);
    var cont=this.add.container(ex,-20).setDepth(9);
    // Glow ring + icon. Powerups can't be damaged — bullets ignore them.
    var glowCol=kind==='spd'?0x88ffcc:0xaaffff;
    var glow=this.add.circle(0,0,16,glowCol,0.25);
    var border=this.add.circle(0,0,12,0xffffff,0);
    border.setStrokeStyle(2, kind==='spd'?0x44ffcc:0x88ddff, 0.9);
    var icon=this.add.text(0,0, kind==='spd'?'⚡':'🔱', {fontSize:'18px',fontFamily:'serif'}).setOrigin(.5);
    cont.add([glow, border, icon]);
    this.powerups.push({cont:cont, bx:ex, x:ex, y:-20, spd:60+Math.random()*30, wobble:Math.random()*Math.PI*2, kind:kind});
  }
  _addShipXp(type){
    var xpByType={scout:1,bomber:3,heavy:5};
    this.shipXp+=(xpByType[type]||1);
    var needed=this._xpForLevel(this.shipLevel);
    while(this.shipXp>=needed){
      this.shipXp-=needed;
      this.shipLevel++;
      this.shipDmg=this.shipBaseDmg+this.shipLevel;
      needed=this._xpForLevel(this.shipLevel);
      showNotif('✈️ Ship Lv.'+this.shipLevel+'! Shot dmg: '+this.shipDmg,'#aaddff');
    }
    this._updateShipHUD();
  }
  _updateShipHUD(){
    var needed=this._xpForLevel(this.shipLevel);
    this.shipLvTxt.setText('Ship Lv.'+this.shipLevel+' | XP '+this.shipXp+'/'+needed+' | DMG '+this.shipDmg);
  }
  update(_,ms){
    if(this.done)return;
    var dt=ms/1000,self=this;
    this.bulletCd=Math.max(0,this.bulletCd-dt);

    // ── Move plane ───────────────────────────────────────────────────────────
    var k=this.keys,spd=220*(this.spdBuffT>0?1.5:1),vx=0,vy=0;
    if(k.LEFT.isDown||k.A.isDown)vx=-spd;
    if(k.RIGHT.isDown||k.D.isDown)vx=spd;
    if(k.UP.isDown||k.W.isDown)vy=-spd;
    if(k.DOWN.isDown||k.S.isDown)vy=spd;
    if(vx&&vy){vx*=.707;vy*=.707;}
    this.px=Phaser.Math.Clamp(this.px+vx*dt,20,this.W-20);
    this.py=Phaser.Math.Clamp(this.py+vy*dt,this.H*0.3,this.H*0.85);
    this.plCont.setPosition(this.px,this.py);

    // ── Shoot ────────────────────────────────────────────────────────────────
    if(Phaser.Input.Keyboard.JustDown(k.SPACE)&&this.bulletCd<=0){
      this.bulletCd=0.22;
      // 3-way shot (active during triShot buff): center + ±25° spread
      var triActive=this.triShotT>0;
      var spreads=triActive?[-0.44,0,0.44]:[0];
      var sx=this.px, sy=this.py-18, dmg=this.shipDmg;
      var self0=this;
      spreads.forEach(function(ang){
        var v=self0.add.rectangle(sx,sy,4,12,triActive?0xaaffcc:0xffffff).setDepth(9).setAngle(ang*180/Math.PI);
        self0.bullets.push({vis:v,x:sx,y:sy,vx:Math.sin(ang)*480,vy:-480*Math.cos(ang),dmg:dmg});
      });
    }

    // ── Update bullets ───────────────────────────────────────────────────────
    this.bullets=this.bullets.filter(function(b){
      // Support diagonal bullets (3-way shot). Center bullet has vx=0.
      b.x+=(b.vx||0)*dt; b.y+=b.vy*dt; b.vis.setPosition(b.x,b.y);
      if(b.y<-20||b.x<-20||b.x>self.W+20){b.vis.destroy();return false;}
      var hit=false;
      self.enemies.forEach(function(e){
        if(e.hp<=0)return;
        if(Math.hypot(b.x-e.x,b.y-e.y)<e.def.r+6){
          hit=true;e.hp-=b.dmg;
          e.hpFill.displayWidth=e.def.w*Math.max(0,e.hp/e.maxHp);
          if(e.hp<=0){e.cont.setAlpha(0.2);self._addShipXp(e.type);}
        }
      });
      if(hit){b.vis.destroy();return false;}
      return true;
    });

    // ── Update enemies ───────────────────────────────────────────────────────
    this.enemies=this.enemies.filter(function(e){
      if(e.hp<=0){
        self.time.delayedCall(400,function(){e.cont.destroy();});
        return false;
      }
      e.wobble+=e.wobbleSpd*dt;
      e.x+=Math.sin(e.wobble)*40*dt;
      e.y+=e.spd*dt;
      e.cont.setPosition(e.x,e.y);
      // Reached city?
      if(e.y>self.H-30){
        var dmg=Math.max(1,e.hp);
        self.cityHp=Math.max(0,self.cityHp-dmg);
        self._updateCityBar();
        e.cont.destroy();
        if(self.cityHp<=0){self._endGame(false);return false;}
        return false;
      }
      return true;
    });

    // ── Powerups: spawn, drift, player/city collision ─────────────────────
    this._powerupSpawnT-=dt;
    if(this._powerupSpawnT<=0){
      this._powerupSpawnT=15+Math.random()*5; // every 15-20s
      this._spawnPowerup();
    }
    this.powerups=this.powerups.filter(function(pu){
      pu.y+=pu.spd*dt;
      pu.wobble=(pu.wobble||0)+dt*1.8;
      pu.x=pu.bx+Math.sin(pu.wobble)*20;
      pu.cont.setPosition(pu.x, pu.y);
      // Player touch — apply buff
      if(Math.hypot(pu.x-self.px, pu.y-self.py) < 22){
        if(pu.kind==='spd'){self.spdBuffT=12; showNotif('⚡ Speed Boost! 12s','#88ffcc');}
        else {self.triShotT=12; showNotif('🔱 Triple Shot! 12s','#aaffdd');}
        var pop=self.add.circle(pu.x,pu.y,4,0x88ffcc,0.9).setDepth(11);
        self.tweens.add({targets:pop,radius:34,alpha:0,duration:380,onComplete:function(){pop.destroy();}});
        pu.cont.destroy();
        return false;
      }
      // City contact — destroy without damage
      if(pu.y > self.H-30){
        pu.cont.destroy();
        return false;
      }
      return true;
    });
    // ── Buff timer countdowns + HUD ───────────────────────────────────────
    if(this.spdBuffT>0) this.spdBuffT=Math.max(0, this.spdBuffT-dt);
    if(this.triShotT>0) this.triShotT=Math.max(0, this.triShotT-dt);
    var buffLines=[];
    if(this.spdBuffT>0) buffLines.push('⚡ Speed '+this.spdBuffT.toFixed(1)+'s');
    if(this.triShotT>0) buffLines.push('🔱 Tri-shot '+this.triShotT.toFixed(1)+'s');
    if(this.buffTxt) this.buffTxt.setText(buffLines.join('  '));
    // ── Win check: all waves spawned + all enemies cleared ────────────────────
    if(this._allWavesSpawned&&this.enemies.length===0&&this.wavesQueued>=this._totalWaves){
      this._endGame(true);
    }
  }
  _updateCityBar(){
    var pct=this.cityHp/this.cityMaxHp;
    this.cityBar.displayWidth=(this.W-40)*pct;
    this.cityBar.setFillStyle(pct>0.6?0x44ff88:pct>0.3?0xffaa00:0xff3322);
    this.cityLbl.setText('City: '+Math.ceil(this.cityHp)+' / '+this.cityMaxHp);
  }
  _endGame(won){
    if(this.done)return;
    this.done=true;
    var self=this;
    if(!won){
      this.waveTxt.setText('City fell! Retreating...');
      this.time.delayedCall(2000,function(){self._exitToWorld();});
      return;
    }
    // Victory! Lock this skyport until death
    var ps=this.ps;
    if(!ps.lockedSites)ps.lockedSites=[];
    var siteId=this.site?this.site.id:'s1_skyport';
    if(!ps.lockedSites.includes(siteId))ps.lockedSites.push(siteId);
    _completeQuest(ps,'s'+((this.site&&this.site.section)||1)+'_skyport');
    // (the NE sky port used to give the Wind Sprite familiar; familiars now come from the islands)
    // Victory!
    this.waveTxt.setText('All waves cleared! Choose your reward:');
    var W=this.W,H=this.H;
    // Reward choices — scale by section
    var sec=this.site?this.site.section||1:1;
    var rewardsBySec={
      1:[
        {id:'iron_sword',   label:'Iron Sword',    icon:'⚔️',  desc:'+7 ATK — Sky-forged iron'},
        {id:'sky_glider',   label:'Sky Glider',    mount:true, icon:'🪁',  desc:'1.8× speed — new sky mount'},
        {id:'gem_ruby',     label:'Ruby',          icon:'💎',  desc:'Worth 40g — fire gem'},
      ],
      2:[
        {id:'long_sword',   label:'Long Sword',    icon:'🗡️', desc:'+10 ATK — tempered sky-steel'},
        {id:'storm_drake',  label:'Storm Drake',   mount:true, icon:'🐲',  desc:'2.0× speed, flies over all terrain'},
        {id:'gem_sapphire', label:'Sapphire',      icon:'💠',  desc:'Worth 80g — ice gem'},
      ],
      3:[
        {id:'flame_sword',  label:'Flame Sword',   icon:'🔥',  desc:'+16 ATK — elemental fire blade'},
        {id:'ember_phoenix',label:'Ember Phoenix', mount:true, icon:'🦜',  desc:'1.9× speed, crosses magma'},
        {id:'gem_emerald',  label:'Emerald',       icon:'🟢',  desc:'Worth 120g — lightning gem'},
      ],
      4:[
        {id:'sky_sword',    label:'Sky Sword',     icon:'✨',  desc:'+28 ATK — Sky-forged blade'},
        {id:'void_serpent', label:'Void Serpent',  mount:true, icon:'🐦',  desc:'2.2× speed, flies everywhere'},
        {id:'skystone',     label:'Skystone',      icon:'💫',  desc:'Worth 200g — rare sky gem'},
      ],
    };
    var rewards=rewardsBySec[sec]||rewardsBySec[4];
    var bg=self.add.rectangle(W/2,H/2,W*0.7,200,0x050a18,0.95).setStrokeStyle(2,0x88aaff).setDepth(20);
    self.add.text(W/2,H/2-80,'Choose 1 Reward',{fontSize:'16px',color:'#aaddff',fontFamily:'Segoe UI',fontStyle:'bold'}).setOrigin(.5).setDepth(21);
    rewards.forEach(function(r,i){
      var bx=W/2+(i-1)*160;
      var btn=self.add.rectangle(bx,H/2,140,90,0x112233,0.9).setStrokeStyle(1,0x4488aa).setInteractive({useHandCursor:true}).setDepth(21);
      self.add.text(bx,H/2-28,r.icon,{fontSize:'26px',fontFamily:'serif'}).setOrigin(.5).setDepth(22);
      self.add.text(bx,H/2+4,r.label,{fontSize:'11px',color:'#aaccff',fontFamily:'Segoe UI',fontStyle:'bold'}).setOrigin(.5).setDepth(22);
      self.add.text(bx,H/2+20,r.desc,{fontSize:'8px',color:'#667',fontFamily:'Segoe UI',align:'center',wordWrap:{width:130}}).setOrigin(.5).setDepth(22);
      btn.on('pointerover',function(){btn.setStrokeStyle(2,0x88ccff);});
      btn.on('pointerout',function(){btn.setStrokeStyle(1,0x4488aa);});
      btn.on('pointerup',function(){
        var ps2=self.ps;
        if(r.mount){
          if(!ps2.ownedMounts)ps2.ownedMounts=[];
          if(!ps2.ownedMounts.includes(r.id))ps2.ownedMounts.push(r.id);
          showNotif(r.icon+'  '+r.label+' mount unlocked!','#aaddff');
        } else {
          if(!ps2.inventory)ps2.inventory=[];
          ps2.inventory.push(r.id);
          var it=ITEMS[r.id];
          showNotif((it?it.icon:r.icon||'')+'  '+r.label+' added to inventory!','#aaddff');
        }
        self.worldScene._emitUI();
        self.time.delayedCall(500,function(){self._exitToWorld();});
      });
    });
  }
  _exitToWorld(){
    this.enemies.forEach(function(e){if(e.cont)e.cont.destroy();});
    this.bullets.forEach(function(b){if(b.vis)b.vis.destroy();});
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


