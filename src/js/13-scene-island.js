// ─── HarborScene (Island Expedition) ──────────────────────────────
// Island data per section
const HARBOR_ISLANDS={
  1:{name:'Corsair Isle',theme:'Tropical',bgWater:0x1a5a8a,bgLand:0x2a7a3a,
     enemies:[
       {icon:'🏴‍☠️',name:'Sea Pirate',   hp:32,atk:7, def:1,col:0x883322,r:10,spd:48,moveType:'normal',atkType:'melee'},
       {icon:'🦀',  name:'Giant Crab',   hp:28,atk:5, def:4,col:0xcc4400,r:11,spd:38,moveType:'zigzag', atkType:'melee'},
       {icon:'🐚',  name:'Shell Knight', hp:40,atk:6, def:5,col:0x887755,r:11,spd:35,moveType:'normal', atkType:'melee'},
     ],
     boss:{icon:'☠️',name:'Pirate Captain',hp:130,atk:12,def:4,col:0x551100,r:18,spd:52,moveType:'rush',atkType:'melee',boss:true},
     shopItems:['sea_trident','captains_coat','sea_shell_buckler','sea_pearl_neck','pearl'],
     lootItems:['sea_trident','captains_coat','sea_shell_buckler','sea_pearl_neck','pearl'],
     questText:'Storm the Pirate Cave and defeat the Pirate Captain on its lowest floor!',
  },
  2:{name:'Bog Isle',theme:'Swamp',bgWater:0x0a3a1a,bgLand:0x1a4a1a,
     enemies:[
       {icon:'🐸',name:'Bog Frog',      hp:44,atk:8, def:2,col:0x2a6a2a,r:11,spd:55,moveType:'pulse',  atkType:'melee'},
       {icon:'🐍',name:'Water Serpent', hp:30,atk:10,def:1,col:0x1a5a3a,r:10,spd:68,moveType:'zigzag', atkType:'melee'},
       {icon:'🦟',name:'Giant Mosquito',hp:22,atk:9, def:0,col:0x3a5a2a,r: 9,spd:80,moveType:'orbit',  atkType:'melee'},
     ],
     boss:{icon:'🧌',name:'Swamp Titan',hp:170,atk:16,def:6,col:0x2a4a10,r:20,spd:36,moveType:'normal',atkType:'stomp',boss:true},
     shopItems:['long_sword','stormshield','sea_pearl_neck','gem_ruby','pearl'],
     lootItems:['long_sword','stormshield','warriors_talis','gem_ruby'],
     questText:'Descend the Bog Grotto and defeat the Swamp Titan at the bottom!',
  },
  3:{name:'Ember Isle',theme:'Volcanic',bgWater:0x3a0a00,bgLand:0x4a1a0a,
     enemies:[
       {icon:'🔥',name:'Fire Imp',    hp:40,atk:10,def:2,col:0xcc4400,r:10,spd:62,moveType:'rush',   atkType:'melee'},
       {icon:'🦎',name:'Lava Lizard', hp:55,atk:12,def:4,col:0x882200,r:13,spd:44,moveType:'strafe', atkType:'melee'},
       {icon:'💥',name:'Magma Sprite',hp:28,atk:11,def:1,col:0xff5500,r: 9,spd:75,moveType:'teleport',atkType:'flame'},
     ],
     boss:{icon:'🌋',name:'Lava Colossus',hp:210,atk:20,def:8,col:0xaa1100,r:22,spd:30,moveType:'normal',atkType:'stomp',boss:true},
     shopItems:['flame_sword','stormshield','warriors_talis','gem_ruby','gem_sapphire'],
     lootItems:['flame_sword','stormshield','guardians_ward','gem_emerald'],
     questText:'Brave the Ember Cave and slay the Lava Colossus in its depths!',
  },
  4:{name:'Frost Isle',theme:'Frozen',bgWater:0x0a1a3a,bgLand:0x1a2a4a,
     enemies:[
       {icon:'❄️',name:'Ice Wraith', hp:50,atk:14,def:3,col:0x4466aa,r:11,spd:58,moveType:'orbit',   atkType:'melee'},
       {icon:'🐺',name:'Frost Wolf',  hp:45,atk:12,def:2,col:0x8899cc,r:12,spd:72,moveType:'rush',    atkType:'melee'},
       {icon:'🌨️',name:'Snow Golem', hp:70,atk:10,def:7,col:0xaabbdd,r:14,spd:30,moveType:'normal',  atkType:'stomp'},
     ],
     boss:{icon:'🧊',name:'Frost Lord',hp:260,atk:24,def:10,col:0x2233aa,r:24,spd:28,moveType:'teleport',atkType:'melee',boss:true},
     shopItems:['sky_sword','obsidian_shield','dragon_amulet','skystone'],
     lootItems:['sky_sword','obsidian_shield','dragon_amulet','skystone'],
     questText:'Climb the Frost Spire and break the Frost Lord\'s grip on the island!',
  },
};
// ─── IslandScene — full tile-based island world ───────────────────────────
class IslandScene extends Phaser.Scene{
  constructor(){super('Island')}
  init(d){this.worldScene=d.worldScene;this.site=d.site;this._skipCutscene=d.skipCutscene||false;}
  create(){
    var W=this.scale.width,H=this.scale.height,self=this;
    this.playerState=this.worldScene.playerState;
    var sec=this.site?this.site.section||1:1;
    this.sec=sec;
    this.islData=HARBOR_ISLANDS[sec]||HARBOR_ISLANDS[1];
    this.castle=CastleRun.of(this.site);
    if(this.castle)this.islData=_castleIslandData(this.castle,this.islData);
    this._done=false;this._chunks=new Map();
    applyTheme(this.site&&this.site.type==='skyport'?'arctic':'ocean');
    document.getElementById('hud').style.display='none';
    document.getElementById('dungeon-hud').style.display='none';
    if(this._skipCutscene){this._buildIsland();}
    else{this._showSailCutscene(function(){self._buildIsland();});}
    // ESC during sail or anywhere on island = exit back
    this.input.keyboard.on('keydown-ESC',function(){self._exitToWorld();});
    this.events.on('wake',function(){
      _heroRestoreMount(self.worldScene);
      document.getElementById('hud').style.display='none';
      document.getElementById('dungeon-hud').style.display='none';
    });
  }
  _showSailCutscene(onDone){
    var W=this.scale.width,H=this.scale.height,self=this;
    var bg=this.add.rectangle(W/2,H/2,W,H,0x0a2060).setDepth(50);
    var waves=[];
    for(var i=0;i<6;i++){
      var wy=H*0.3+i*(H*0.08);
      waves.push(this.add.rectangle(W/2,wy,W,3,0x3366aa,0.5+i*0.08).setDepth(51));
    }
    var bCont=this.add.container(-60,H*0.55).setDepth(52);
    var hull=this.add.rectangle(0,0,80,22,0x8b5a2b);
    var mast=this.add.rectangle(0,-32,4,50,0x6b3a1b);
    var sail=this.add.triangle(0,-30,-28,-30,28,-30,0,-70,0xeeeebb,0.9);
    var flag=this.add.triangle(2,-70,0,-70,14,-60,0,-54,0xff4444);
    bCont.add([hull,mast,sail,flag]);
    var title=this.add.text(W/2,H*0.22,'\u2693 Setting Sail\u2026',{fontSize:'22px',color:'#88ccff',fontFamily:'Segoe UI',fontStyle:'bold',stroke:'#000',strokeThickness:4}).setOrigin(.5).setDepth(53);
    var sub=this.add.text(W/2,H*0.22+38,this.islData.name,{fontSize:'14px',color:'#aaddff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(53);
    this.tweens.add({targets:bCont,x:W+80,duration:3200,ease:'Sine.easeInOut'});
    waves.forEach(function(w,i){self.tweens.add({targets:w,x:W/2-30+i*20,duration:900+i*120,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});});
    this.time.delayedCall(3400,function(){
      self.tweens.add({targets:[bg,bCont,title,sub].concat(waves),alpha:0,duration:500,
        onComplete:function(){[bg,bCont,title,sub].forEach(function(o){o.destroy();});waves.forEach(function(w){w.destroy();});onDone();}
      });
    });
  }
  _buildIsland(){
    var W=this.scale.width,H=this.scale.height,self=this;
    try{
    var sec=this.sec,isl=this.islData;
    // Generate tile map
    this._imap=generateIsland(sec,this.castle?7919+'bcd'.indexOf(this.castle.key.slice(-1))*104729:0);
    this._chunks=new Map();
    // Background & camera
    var bgCols={1:0x1a5a8a,2:0x0a2a14,3:0x1a0800,4:0x0a1428};
    this.cameras.main.setBackgroundColor(bgCols[sec]||0x0a1428);
    this.cameras.main.setBounds(0,0,ISL_W*TILE,ISL_H*TILE);
    this.cameras.main.setZoom(1.5);
    // Ocean border fill
    this.add.rectangle(ISL_W*TILE/2,ISL_H*TILE/2,ISL_W*TILE,ISL_H*TILE,bgCols[sec]||0x0a1428).setDepth(-1);
    // Spawn player (sandbox: optionally warp straight to adventure spot)
    var spawnX=this._imap.spawnX,spawnY=this._imap.spawnY;
    if(window._sbIslandJumpToAdv){
      window._sbIslandJumpToAdv=false;
      spawnX=this._imap.advPos.tx*TILE+TILE/2;
      spawnY=(this._imap.advPos.ty+1)*TILE+TILE/2;
    }
    this.player=this._createPlayer(spawnX,spawnY);
    this.cameras.main.startFollow(this.player.cont,true,.1,.1);
    // NPC markers
    this._placeNPCMarkers();
    // Spawn monsters
    this.monsters=[];
    this._spawnMonsters();
    // Combat state
    this.atkTimer=0;this.iFrames=0;
    // HUD
    this._createHUD();
    }catch(err){console.error('IslandScene._buildIsland error:',err);}
    // Keys MUST init outside try-catch so update() never crashes on k.TAB.isDown
    this.keys=this.input.keyboard.addKeys({
      UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',
      W:'W',A:'A',S:'S',D:'D',SPACE:'SPACE',
      SHIFT:Phaser.Input.Keyboard.KeyCodes.SHIFT,
      TAB:Phaser.Input.Keyboard.KeyCodes.TAB
    });
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    // ESC listener already added in create() — do NOT duplicate it here
    this._ready=true;
  }
  _updateChunks(){
    if(!this._imap)return;
    var cam=this.cameras.main,zoom=cam.zoom;
    var vw=cam.width/zoom,vh=cam.height/zoom;
    var camCX=Math.floor(cam.scrollX/(CHUNK*TILE));
    var camCY=Math.floor(cam.scrollY/(CHUNK*TILE));
    var numCX=Math.ceil(vw/(CHUNK*TILE))+2,numCY=Math.ceil(vh/(CHUNK*TILE))+2;
    var needed=new Set(),self=this;
    var maxCX=Math.ceil(ISL_W/CHUNK),maxCY=Math.ceil(ISL_H/CHUNK);
    for(var dy2=-1;dy2<=numCY;dy2++){for(var dx2=-1;dx2<=numCX;dx2++){
      var cx=camCX+dx2,cy=camCY+dy2;
      if(cx<0||cy<0||cx>=maxCX||cy>=maxCY)continue;
      var key=cx+'_'+cy;needed.add(key);
      if(!this._chunks.has(key))this._createChunk(cx,cy);
    }}
    this._chunks.forEach(function(ch,key){
      if(!needed.has(key)){ch.img.destroy();if(self.textures.exists('islchunk_'+key))self.textures.remove('islchunk_'+key);self._chunks.delete(key);}
    });
  }
  _createChunk(cx,cy){
    var cw=Math.min(CHUNK,ISL_W-cx*CHUNK),ch2=Math.min(CHUNK,ISL_H-cy*CHUNK);
    var canvas=document.createElement('canvas');
    canvas.width=cw*TILE;canvas.height=ch2*TILE;
    var ctx=canvas.getContext('2d');
    for(var ly=0;ly<ch2;ly++){for(var lx=0;lx<cw;lx++){
      var tx=cx*CHUNK+lx,ty=cy*CHUNK+ly;
      var _ivi=(((tx*2654435761)^(ty*2246822519))>>>0)%12;
      drawTileToCtx(ctx,lx*TILE,ly*TILE,this._imap.tiles[ty]?this._imap.tiles[ty][tx]:T.OCEAN,null,_ivi);
    }}
    var key=cx+'_'+cy;
    if(this.textures.exists('islchunk_'+key))this.textures.remove('islchunk_'+key);
    this.textures.addCanvas('islchunk_'+key,canvas);
    var img=this.add.image(cx*CHUNK*TILE,cy*CHUNK*TILE,'islchunk_'+key).setOrigin(0,0).setDepth(0);
    this._chunks.set(key,{img:img,canvas:canvas});
  }
  _createPlayer(x,y){
    _heroRegisterTextures(this);
    var cont=this.add.container(x,y).setDepth(10);
    var shadow=this.add.ellipse(0,14,22,8,0x000000,.3);
    var body=this.add.rectangle(0,2,18,20,0x4488dd).setVisible(false);
    var legs=this.add.rectangle(0,14,14,8,0x2255aa).setVisible(false);
    var head=this.add.circle(0,-12,9,0xf0c880).setVisible(false);
    var eyeL=this.add.circle(-3,-13,2,0x222222).setVisible(false);
    var eyeR=this.add.circle(3,-13,2,0x222222).setVisible(false);
    var weapon=this.add.rectangle(14,-2,4,16,0xcccccc).setVisible(false);
    var sprite=this.add.image(0,14,this.textures.exists('hero_front_0')?'hero_front_0':'__DEFAULT')
      .setOrigin(.5,1).setDisplaySize(25,42);
    cont.add([shadow,legs,body,head,eyeL,eyeR,weapon,sprite]);
    return{cont:cont,body:body,weapon:weapon,sprite:sprite,x:x,y:y,dir:'down',_walkFrame:0,_walkTimer:0,_wasMoving:false,_lastSet:null};
  }
  _canMove(px,py){
    var tx=Math.floor(px/TILE),ty=Math.floor(py/TILE);
    return !this._imap.blockedFn(tx,ty);
  }
  _placeNPCMarkers(){
    var self=this,imap=this._imap,isl=this.islData;
    // Harbor-back NPC
    var hx=imap.harborPos.tx*TILE+TILE/2,hy=imap.harborPos.ty*TILE+TILE/2;
    if(!CHX.sprite(this,'isl_harbor',hx,hy+12,1.45)){ this.add.circle(hx,hy,16,0x2244aa).setDepth(4); this.add.text(hx,hy,'\u2693',{fontSize:'14px',fontFamily:'serif'}).setOrigin(.5,.5).setDepth(5); }
    domText(this,hx,hy+22,'[Tab] Return',{fontSize:'8px',color:'#88aaff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(5);
    this._harborNPC={x:hx,y:hy,r:36};
    // Shop NPC
    var sx=imap.shopPos.tx*TILE+TILE/2,sy=imap.shopPos.ty*TILE+TILE/2;
    if(!CHX.sprite(this,'isl_trader',sx,sy+12,1.45)){ this.add.circle(sx,sy,16,0x4488aa).setDepth(4); this.add.text(sx,sy,'\uD83D\uDED2',{fontSize:'14px',fontFamily:'serif'}).setOrigin(.5,.5).setDepth(5); }
    domText(this,sx,sy+22,'[Tab] Shop',{fontSize:'8px',color:'#88aaff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(5);
    this._shopNPC={x:sx,y:sy,r:36};
    // Healing well
    var wx=imap.wellPos.tx*TILE+TILE/2,wy=imap.wellPos.ty*TILE+TILE/2;
    this.add.circle(wx+14,wy+4,7,0x44aa66,0.8).setDepth(4);
    if(!CHX.sprite(this,'isl_well',wx-6,wy+12,1.45)){ this.add.text(wx,wy,'\uD83D\uDC9A',{fontSize:'14px',fontFamily:'serif'}).setOrigin(.5,.5).setDepth(5); }
    domText(this,wx,wy+20,'[Tab] Heal 10g',{fontSize:'8px',color:'#88ffaa',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(5);
    this._wellNPC={x:wx,y:wy,r:36};
    // Adventure spot (castle islands: the castle gate)
    var adv=this.castle?{icon:'🏰',label:'🏰 '+(TOWER_STYLES_BY_ID[this.castle.castle]||{name:this.castle.name}).name}:(ISL_ADV[this.sec]||ISL_ADV[1]);
    var ax=imap.advPos.tx*TILE+TILE/2,ay=imap.advPos.ty*TILE+TILE/2;
    var advRing=this.add.circle(ax,ay,22,0,0).setStrokeStyle(3,0xffdd44).setDepth(4);
    this.tweens.add({targets:advRing,scaleX:1.15,scaleY:1.15,duration:900,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
    if(this.castle&&_castleGateTex(this,this.castle))this.add.image(ax,ay+8,'castle_gate_'+this.castle.key).setOrigin(.5,1).setDepth(5);
    else this.add.text(ax,ay,adv.icon,{fontSize:'18px',fontFamily:'serif'}).setOrigin(.5,.5).setDepth(5);
    var gd=CHX.sprite(this,'isl_guide',ax-30,ay+12,1.45); if(gd)gd.setDepth(5);
    domText(this,ax,ay+28,adv.label,{fontSize:'8px',color:'#ffdd88',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(5);
    domText(this,ax,ay+38,'[Tab] Enter',{fontSize:'7px',color:'#ffeeaa',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(5);
    this._advNPC={x:ax,y:ay,r:44};
  }
  _spawnMonsters(){
    var isl=this.islData,self=this;
    var defs=isl.enemies;
    var count=8+Math.floor(Math.random()*4);
    var _spawnOne=function(d,isBoss){
      var mx,my,tries=0;
      do{
        var angle=Math.random()*Math.PI*2,dist2=(ISL_VIL_R+5+Math.random()*(ISL_R-ISL_VIL_R-8))*TILE;
        mx=ISL_CX*TILE+Math.cos(angle)*dist2;
        my=ISL_CY*TILE+Math.sin(angle)*dist2;
        tries++;
      }while((self._imap.blockedFn(Math.floor(mx/TILE),Math.floor(my/TILE)))&&tries<30);
      var r=d.r||10;
      var econt=self.add.container(mx,my).setDepth(8);
      var ebody=(isBoss&&CHX.bossBody(self,null,d,econt))||CHX.monBody(self,d.name,d)||self.add.circle(0,0,r,d.col||0x884422);
      var eico=self.add.text(0,0,ebody.setTexture?'':d.icon,{fontSize:isBoss?'20px':'14px',fontFamily:'serif'}).setOrigin(.5,.5);
      var ehpBg=self.add.rectangle(0,-(r+9),isBoss?40:30,5,0x000,.8);
      var ehpFill=self.add.rectangle(isBoss?-20:-15,-(r+9),isBoss?40:30,5,isBoss?0xff8800:0xff3333).setOrigin(0,.5);
      var eName=self.add.text(0,-(r+18),d.name+(isBoss?' ★':''),{fontSize:isBoss?'9px':'7px',color:isBoss?'#ffdd44':'#fff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5);
      econt.add([ebody,eico,ehpBg,ehpFill,eName]);
      self.monsters.push({cont:econt,body:ebody,hpFill:ehpFill,def:d,
        hp:d.hp,maxHp:d.hp,x:mx,y:my,dead:false,atkTimer:0,state:'wander',
        isBoss:!!isBoss,_md:{},wanderVx:(Math.random()-.5)*30,wanderVy:(Math.random()-.5)*30,wanderTimer:0});
    };
    for(var i=0;i<count;i++)_spawnOne(defs[i%defs.length],false);
    // (The island guardian lives in the island dungeon now — see _enterAdventure.)
  }
  _checkIslandClear(){
    // The island guardian now waits at the bottom of the island's dungeon; clearing
    // the surface just points the way there.
    if(this._surfaceCleared)return;
    if(this.monsters.every(function(m){return m.dead;})){
      this._surfaceCleared=true;
      if(this.castle){ showNotif('🏝️ Surface cleared! '+CHAR_BY_ID[this.castle.warden].name+' waits at the top of the castle.','#44ffaa'); return; }
      var adv=ISL_ADV[this.sec]||ISL_ADV[1];
      showNotif('🏝️ Surface cleared! The guardian waits at the bottom of the '+adv.label.replace(/^\S+\s/,'')+'.','#44ffaa');
    }
  }
  _onIslandCleared(){
    var ps=this.playerState,sec=this.sec;
    var siteId=this.site?this.site.id:'harbor_'+sec;
    // Lock site until death
    if(!ps.lockedSites)ps.lockedSites=[];
    if(!ps.lockedSites.includes(siteId))ps.lockedSites.push(siteId);
    _awardIslandFamiliar(ps,sec);
    var goldBonus=40*sec;ps.gold+=goldBonus;
    showNotif('🏝️ Island cleared! +'+goldBonus+'g','#44ffaa');
    this.worldScene._emitUI();
  }
  _createHUD(){
    var W=this.scale.width,H=this.scale.height;
    this._hudBg=this.add.rectangle(W/2,H-18,W,28,0x050a14,0.88).setDepth(20).setScrollFactor(0);
    this._hpBarBg=this.add.rectangle(W*0.28,H-18,180,10,0x111,.9).setOrigin(.5).setStrokeStyle(1,0x333).setDepth(21).setScrollFactor(0);
    this._hpBar=this.add.rectangle(W*0.28-90,H-18,180,10,0x44ff88).setOrigin(0,.5).setDepth(22).setScrollFactor(0);
    this._hpTxt=this.add.text(W*0.28,H-18,'',{fontSize:'9px',color:'#fff',fontFamily:'Segoe UI'}).setOrigin(.5).setDepth(23).setScrollFactor(0);
    this._goldTxt=this.add.text(W*0.72,H-18,'',{fontSize:'9px',color:'#ffd700',fontFamily:'Segoe UI'}).setOrigin(.5).setDepth(21).setScrollFactor(0);
    this._locTxt=this.add.text(W/2,H-18,'',{fontSize:'8px',color:'rgba(255,255,255,.3)',fontFamily:'Segoe UI'}).setOrigin(.5).setDepth(21).setScrollFactor(0);
    this._updateHUD();
  }
  _updateHUD(){
    if(!this._hpBar)return;
    var ps=this.playerState;
    var pct=Math.min(1,ps.hp/ps.maxHp);
    this._hpBar.displayWidth=180*pct;
    this._hpBar.setFillStyle(pct>.5?0x44ff88:pct>.25?0xffaa00:0xff3322);
    this._hpTxt.setText('\u2764\uFE0F '+ps.hp+'/'+ps.maxHp);
    this._goldTxt.setText('\uD83D\uDCB0 '+ps.gold+'g');
    var isl=this.islData;
    this._locTxt.setText(isl?isl.name+' \u2014 ESC: Leave':'');
  }
  update(_,ms){
    if(!this._ready||this._done||!this.player||!this.monsters)return;
    var dt=ms/1000,self=this,p=this.player;
    // Pause when any modal (inventory, map, etc.) is open. Decrement timers so
    // cooldowns still count down during the pause, but skip movement + AI.
    if(_anyModalOpen()){
      this.atkTimer=Math.max(0,(this.atkTimer||0)-dt);
      this.iFrames=Math.max(0,(this.iFrames||0)-dt);
      return;
    }
    this._updateChunks();
    // Player movement
    var k=this.keys,spd=160,vx=0,vy=0;
    if(k.LEFT.isDown||k.A.isDown)vx=-spd;
    if(k.RIGHT.isDown||k.D.isDown)vx=spd;
    if(k.UP.isDown||k.W.isDown)vy=-spd;
    if(k.DOWN.isDown||k.S.isDown)vy=spd;
    if(vx&&vy){vx*=0.707;vy*=0.707;}
    var nx=p.x+vx*dt,ny=p.y+vy*dt;
    if(this._canMove(nx,p.y)&&nx>0&&nx<ISL_W*TILE)p.x=nx;
    if(this._canMove(p.x,ny)&&ny>0&&ny<ISL_H*TILE)p.y=ny;
    p.cont.setPosition(p.x,p.y);
    if(p.sprite){p.dir=_heroDirFromVel(vx,vy,p.dir);_heroAnimate(this,p.sprite,p,vx,vy,dt,(this.atkTimer||0),(this.iBowTimer||0));}
    _heroShieldTick(this, p.x, p.y);
    this.atkTimer=Math.max(0,this.atkTimer-dt);
    this.iBowTimer=Math.max(0,(this.iBowTimer||0)-dt);
    this.iFrames=Math.max(0,this.iFrames-dt);
    _heroUpdateProjs(this,'island',dt);
    if(Phaser.Input.Keyboard.JustDown(k.SPACE))this._attack();
    // Tab interactions
    if(Phaser.Input.Keyboard.JustDown(k.TAB))this._checkInteraction();
    // Update monster projectiles spawned by ranged attacks
    if(this.islProj){
      var _self2=this;
      this.islProj=this.islProj.filter(function(pr){
        if(!pr.vis)return false;
        pr.life-=dt;
        if(pr.life<=0){pr.vis.destroy();return false;}
        // Heat-seeking: steer toward player
        if(pr.heat){
          var sp=Math.hypot(pr.vx,pr.vy)||200;
          var ta=Math.atan2(_self2.player.y-pr.y,_self2.player.x-pr.x);
          var ca=Math.atan2(pr.vy,pr.vx);
          var df=ta-ca; while(df>Math.PI)df-=Math.PI*2; while(df<-Math.PI)df+=Math.PI*2;
          ca+=df*Math.min(1,dt*3);
          pr.vx=Math.cos(ca)*sp; pr.vy=Math.sin(ca)*sp;
        }
        pr.x+=pr.vx*dt; pr.y+=pr.vy*dt;
        pr.vis.setPosition(pr.x,pr.y);
        // Hit player
        if(Math.hypot(pr.x-_self2.player.x,pr.y-_self2.player.y)<14&&_self2.iFrames<=0&&!_self2.playerState.godMode){
          pr.vis.destroy();
          var def3=_self2.worldScene.calcPlayerStats().def||0;
          var dmg2=Math.max(1,pr.dmg-def3);
          _self2.playerState.hp=Math.max(0,_self2.playerState.hp-dmg2);
          _self2.iFrames=0.7;
          _self2._floatText(_self2.player.x,_self2.player.y-20,'-'+dmg2,'#ff8844');
          _self2._updateHUD();
          if(_self2.playerState.hp<=0)_self2._playerDied();
          return false;
        }
        return true;
      });
    }
    // Monster AI
    this.monsters.forEach(function(mon){
      if(mon.dead)return;
      var ddx=p.x-mon.x,ddy=p.y-mon.y,dist=Math.hypot(ddx,ddy);
      var spd2=(mon.def.spd||50);
      var md=mon._md;
      if(dist<240)mon.state='chase'; else if(dist>320)mon.state='wander';
      var ang=Math.atan2(ddy,ddx);
      if(mon.state==='chase'){
        var mv=spd2,mt=mon.def.moveType||'normal';
        if(mt==='pulse'){md.pt=(md.pt||0)-dt;if(md.pt<=0){md.pt=1.3+Math.random();md.pon=!md.pon;}mv=md.pon?spd2*2.1:0;}
        else if(mt==='zigzag'){md.zt=(md.zt||0)-dt;if(md.zt<=0){md.zt=0.5;md.zd=(md.zd||1)*-1;}var perp=ang+Math.PI/2;var lx2=mon.x+Math.cos(perp)*spd2*0.7*md.zd*dt;var ly2=mon.y+Math.sin(perp)*spd2*0.7*md.zd*dt;if(self._canMove(lx2,mon.y))mon.x=lx2;if(self._canMove(mon.x,ly2))mon.y=ly2;mv=spd2*0.7;}
        else if(mt==='rush'){md.rc=(md.rc||0)-dt;if(dist<100&&md.rc<=0){md.rushing=true;md.rt=0.35;md.rc=3+Math.random()*2;}if(md.rushing){md.rt-=dt;if(md.rt<=0)md.rushing=false;mv=spd2*3.2;}else mv=spd2*0.4;}
        else if(mt==='orbit'){md.oa=(md.oa||ang)+spd2*0.006*dt;var tx2=p.x+Math.cos(md.oa)*110,ty2=p.y+Math.sin(md.oa)*110;ang=Math.atan2(ty2-mon.y,tx2-mon.x);mv=spd2*1.2;}
        else if(mt==='teleport'){md.tt=(md.tt||0)-dt;if(md.tt<=0&&dist>80){md.tt=2.5+Math.random()*2;var td=Math.min(dist-55,95);var ttx=mon.x+Math.cos(ang)*td,tty=mon.y+Math.sin(ang)*td;if(self._canMove(ttx,tty)){mon.x=ttx;mon.y=tty;mon.body.setFillStyle(0xffffff);self.time.delayedCall(100,function(){if(!mon.dead)mon.body.setFillStyle(mon.def.col||0x884422);});}}mv=spd2*0.5;}
        if(mv!==0){var nmx=mon.x+Math.cos(ang)*mv*dt,nmy=mon.y+Math.sin(ang)*mv*dt;if(self._canMove(nmx,mon.y))mon.x=nmx;if(self._canMove(mon.x,nmy))mon.y=nmy;}
      } else {
        mon.wanderTimer-=dt;
        if(mon.wanderTimer<=0){mon.wanderTimer=2+Math.random()*2;mon.wanderVx=(Math.random()-.5)*35;mon.wanderVy=(Math.random()-.5)*35;}
        var wx2=mon.x+mon.wanderVx*dt,wy2=mon.y+mon.wanderVy*dt;
        if(self._canMove(wx2,mon.y))mon.x=wx2;else mon.wanderVx*=-1;
        if(self._canMove(mon.x,wy2))mon.y=wy2;else mon.wanderVy*=-1;
      }
      mon.cont.setPosition(mon.x,mon.y);
      // ── Attack handling (ported from Dungeon, supports ranged types) ─────
      var at=mon.def.atkType||'melee';
      mon.atkTimer=Math.max(0,(mon.atkTimer||0)-dt);
      if(at==='stomp'){
        if(!mon._stT)mon._stT=0;mon._stT-=dt;
        if(mon._stT<=0){mon._stT=mon.state==='chase'?4.0:5.0;var sw=self.add.circle(mon.x,mon.y,0,0x886600,0.45).setDepth(7);self.tweens.add({targets:sw,radius:65,alpha:0,duration:500,onComplete:function(){sw.destroy();}});
          if(dist<90&&self.iFrames<=0&&!self.playerState.godMode){var sdmg=Math.max(1,Math.ceil(mon.def.atk*0.7)-(self.worldScene.calcPlayerStats().def||0));self.playerState.hp=Math.max(0,self.playerState.hp-sdmg);self.iFrames=0.7;self._floatText(p.x,p.y-20,'-'+sdmg+' STOMP','#ff8800');self._updateHUD();if(self.playerState.hp<=0){self._playerDied();return;}}}
      } else if(at==='melee'){
        if(dist<(mon.def.r||10)+28&&mon.atkTimer<=0&&self.iFrames<=0&&!self.playerState.godMode){
          mon.atkTimer=1.8;
          var def2=self.worldScene.calcPlayerStats().def||0;
          var dmg=Math.max(1,mon.def.atk-def2+Math.floor(Math.random()*3-1));
          dmg=_heroApplyShield(self, self.playerState, dmg, p.x, p.y);
          if(dmg<=0){self.iFrames=0.5;return;}
          self.playerState.hp=Math.max(0,self.playerState.hp-dmg);
          self.iFrames=0.8;self._floatText(p.x,p.y-20,'-'+dmg,'#ff4444');self._updateHUD();
          if(self.playerState.hp<=0){self._playerDied();return;}
        }
      } else if(mon.atkTimer<=0&&dist<240){
        // Ranged: spawn projectile aimed at player. Mirrors Dungeon config.
        if(!self.islProj)self.islProj=[];
        var bossSpd=mon.isBoss?1.4:1.0;
        var cfg={arrow:{col:0xccaa44,spd:260,r:4,life:2.5},
          flame:{col:0xff5500,spd:180,r:6,life:2},
          bog_flame:{col:0x44cc44,spd:150,r:7,life:2.5},
          heat_seek:{col:0xff8800,spd:140,r:7,life:3,heat:true},
          lightning:{col:0x88aaff,spd:320,r:4,life:1.5},
          scatter:{col:0xccaa44,spd:240,r:4,life:2,scatter:true},
          scatter_arrow:{col:0xccaa44,spd:240,r:4,life:2,scatter:true},
          scatter_flame:{col:0xff6600,spd:180,r:6,life:2,scatter:true}
        }[at]||{col:0xaa8844,spd:220,r:4,life:2};
        var fSpd=cfg.spd*bossSpd;
        mon.atkTimer=mon.isBoss?1.5:2.4;
        var pAng=Math.atan2(p.y-mon.y,p.x-mon.x);
        var spread=cfg.scatter?[-0.3,0,0.3]:[0];
        spread.forEach(function(off){
          var ang=pAng+off;
          var v=self.add.circle(mon.x,mon.y,cfg.r,cfg.col).setDepth(12);
          self.islProj.push({vis:v,x:mon.x,y:mon.y,vx:Math.cos(ang)*fSpd,vy:Math.sin(ang)*fSpd,
            dmg:Math.max(1,Math.round(mon.def.atk*0.5)),life:cfg.life,heat:!!cfg.heat,isBoss:mon.isBoss});
        });
      }
    });
    this._updateHUD();
  }
  _attack(){
    if(this.atkTimer>0)return;
    this.atkTimer=0.42;
    var p=this.player,self=this;
    var stats=this.worldScene.calcPlayerStats();
    var g=this.add.graphics().setDepth(15).setPosition(p.x,p.y);
    g.lineStyle(6,0x88eeff,0.25);g.arc(0,0,28,-0.8,1.6);g.strokePath();
    g.lineStyle(2,0xccffff,0.9);g.arc(0,0,28,-0.8,1.6);g.strokePath();
    this.tweens.add({targets:g,alpha:0,duration:200,onComplete:function(){g.destroy();}});
    var hit=false;
    this.monsters.forEach(function(mon){
      if(mon.dead)return;
      if(Math.hypot(mon.x-p.x,mon.y-p.y)>68)return;
      if(!_heroInArc(p.dir||'right',mon.x-p.x,mon.y-p.y))return;
      var dmg=Math.max(1,stats.atk-(mon.def.def||0)+Math.floor(Math.random()*4-2));
      MX._src='melee'; mon.hp-=dmg; MX._src=null; hit=true;
      self._floatText(mon.x,mon.y-20,'-'+dmg,'#ffdd44');
      mon.body.setFillStyle(0xffffff);
      self.time.delayedCall(100,function(){if(!mon.dead)mon.body.setFillStyle(mon.def.col||0x884422);});
      mon.hpFill.displayWidth=30*Math.max(0,mon.hp/mon.maxHp);
      if(mon.hp<=0)self._islandMonsterDied(mon);
    });
    if(!hit)this._floatText(p.x,p.y-22,'miss','#555');
  }
  _checkInteraction(){
    var p=this.player,self=this;
    if(this._harborNPC&&Math.hypot(p.x-this._harborNPC.x,p.y-this._harborNPC.y)<this._harborNPC.r){
      this._exitToWorld();return;
    }
    if(this._shopNPC&&Math.hypot(p.x-this._shopNPC.x,p.y-this._shopNPC.y)<this._shopNPC.r){
      this._openShop();return;
    }
    if(this._wellNPC&&Math.hypot(p.x-this._wellNPC.x,p.y-this._wellNPC.y)<this._wellNPC.r){
      this._useWell();return;
    }
    if(this._advNPC&&Math.hypot(p.x-this._advNPC.x,p.y-this._advNPC.y)<this._advNPC.r){
      this._enterAdventure();return;
    }
  }
  _openShop(){
    var ps=this.playerState,isl=this.islData,self=this;
    var W=this.scale.width,H=this.scale.height;
    var overlay=this.add.rectangle(W/2,H/2,W*0.72,Math.min(H*0.7,340),0x050a18,0.97).setStrokeStyle(2,0x4488aa).setDepth(60).setScrollFactor(0);
    var titleT=this.add.text(W/2,H/2-overlay.displayHeight/2+16,'\uD83D\uDED2 '+isl.name+' Shop',{fontSize:'13px',color:'#aaccff',fontFamily:'Segoe UI',fontStyle:'bold'}).setOrigin(.5).setDepth(61).setScrollFactor(0);
    var closeBtn=this.add.text(W/2+overlay.displayWidth/2-16,titleT.y,'✕',{fontSize:'13px',color:'#ff8888',fontFamily:'Segoe UI'}).setOrigin(.5).setDepth(61).setScrollFactor(0).setInteractive({useHandCursor:true});
    var rows=[];var goldLbl=this.add.text(W/2,titleT.y+20,'Gold: '+ps.gold+'g',{fontSize:'9px',color:'#ffd700',fontFamily:'Segoe UI'}).setOrigin(.5).setDepth(61).setScrollFactor(0);rows.push(goldLbl);
    isl.shopItems.forEach(function(id,i){
      var it=ITEMS[id];if(!it)return;
      var ry=titleT.y+44+i*32;
      var rb=self.add.rectangle(W/2,ry,overlay.displayWidth-20,28,0xffffff,0.04).setStrokeStyle(1,0x334455).setDepth(61).setScrollFactor(0);
      var ico=self.add.text(W/2-overlay.displayWidth/2+18,ry,it.icon,{fontSize:'12px',fontFamily:'serif'}).setOrigin(.5).setDepth(62).setScrollFactor(0);
      var nm=self.add.text(W/2-overlay.displayWidth/2+30,ry,it.name,{fontSize:'9px',color:'#aaccff',fontFamily:'Segoe UI'}).setOrigin(0,.5).setDepth(62).setScrollFactor(0);
      var price=it.buy||(it.sell*2)||40;
      var pr=self.add.text(W/2+overlay.displayWidth/2-52,ry,price+'g',{fontSize:'9px',color:'#ffd700',fontFamily:'Segoe UI'}).setOrigin(.5).setDepth(62).setScrollFactor(0);
      var bb=self.add.text(W/2+overlay.displayWidth/2-18,ry,'Buy',{fontSize:'9px',color:'#44ff88',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(62).setScrollFactor(0).setInteractive({useHandCursor:true});
      bb.on('pointerup',function(){if(ps.gold>=price){ps.gold-=price;ps.inventory.push(id);goldLbl.setText('Gold: '+ps.gold+'g');self._floatText(W/2,H/2+20,'Bought: '+it.icon+' '+it.name,'#44ffaa');}else{self._floatText(W/2,H/2+20,'Not enough gold!','#ff4444');}});
      rows.push(rb,ico,nm,pr,bb);
    });
    closeBtn.on('pointerup',function(){overlay.destroy();titleT.destroy();closeBtn.destroy();rows.forEach(function(r){r.destroy();});});
  }
  _useWell(){
    var ps=this.playerState,cost=10;
    if(ps.gold<cost){this._floatText(this.player.x,this.player.y-24,'Need 10g!','#ff4444');return;}
    ps.gold-=cost;ps.hp=ps.maxHp;
    this._floatText(this.player.x,this.player.y-24,'Healed! -10g','#44ffaa');
    this._updateHUD();
  }
  _enterAdventure(){
    if(this.castle){ var cs=CastleRun.site(this.castle.key); this.scene.sleep('Island');
      this.scene.launch('Dungeon',{site:cs,floor:0,maxFloors:cs.floors,worldScene:this.worldScene,returnScene:'Island',theme:'tower'});
      document.getElementById('dungeon-hud').style.display='block'; return; }
    var adv=ISL_ADV[this.sec]||ISL_ADV[1];
    if(adv.type==='cave'){
      this.scene.sleep('Island');
      this.scene.launch('Cave',{worldScene:this.worldScene,islandScene:this,sec:this.sec,maxFloors:adv.floors||4});
    } else {
      var theme=adv.type==='volcano'?'volcano':adv.type==='tower_island'?'tower_island':'cave_dungeon';
      var sType=adv.kind||(adv.type==='tower_island'?'tower':'dungeon');
      var dSite={id:'isl_adv_'+this.sec+'_'+adv.type,type:sType,section:this.sec,design:adv.design,island:true,
        name:adv.label.replace(/^\S+\s/,''),floors:adv.floors||4};
      this.scene.sleep('Island');
      this.scene.launch('Dungeon',{site:dSite,floor:0,maxFloors:dSite.floors,worldScene:this.worldScene,returnScene:'Island',theme:theme});
      document.getElementById('dungeon-hud').style.display='block';
    }
  }
  _floatText(x,y,msg,col){
    var t=domText(this,x,y,msg,{fontSize:'12px',color:col||'#fff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(30);
    this.tweens.add({targets:t,y:y-40,alpha:0,duration:1200,onComplete:function(){t.destroy();}});
  }
  _islandMonsterDied(mon){
    if(mon.dead)return;
    mon.dead=true;mon.cont.setAlpha(0.2);
    var xp=Math.ceil(mon.def.hp*0.6),gold=4+Math.floor(Math.random()*8);
    if(mon.isBoss){xp*=3;gold*=4;}
    this.playerState.xp+=xp;this.playerState.gold+=gold;
    this._floatText(mon.x,mon.y-36,'+'+xp+' xp +'+gold+'g',mon.isBoss?'#ffdd44':'#44ffaa');
    this.worldScene._checkLevelUp(this.playerState);
    this._checkIslandClear();
  }
  _playerDied(){ _heroDied(this); }
  _exitToWorld(){
    if(this._done)return;this._done=true;
    this._chunks.forEach(function(ch,k){ch.img.destroy();});
    this._chunks.clear();
    // Record exit time for respawn system
    if(this.worldScene&&this.worldScene.playerState&&this.site){
      if(!this.worldScene.playerState.siteExitTimes)this.worldScene.playerState.siteExitTimes={};
      this.worldScene.playerState.siteExitTimes[this.site.id]=Date.now();
    }
    this.scene.stop('Island');
    this.scene.wake('World');
    document.getElementById('hud').style.display='';
    document.getElementById('dungeon-hud').style.display='none';
    if(this.worldScene)this.worldScene._emitUI();
  }
}


// castle islands: surface monsters come from the quadrant roster (07t CASTLE_ISLANDS.en)
function _castleIslandData(C,base){ var ens=C.en.map(function(id,i){ var R=MON_BY_ID[id], b=base.enemies[i%base.enemies.length]; if(!R)return b;
    return Object.assign({},b,{name:R.name,icon:'',hp:Math.round(b.hp*1.15),atk:Math.round(b.atk*1.1)}); });
  var T=CHAR_BY_ID[C.teacher], it=ITEMS[C.skill];
  return Object.assign({},base,{name:C.name,enemies:ens,questText:'Storm the castle, defeat '+(CHAR_BY_ID[C.warden]||{name:'its warden'}).name+' and free '+(T?T.name:'the master')+' — they will teach you '+(it?it.name:'a skill')+'.'}); }
// a small painted castle gate for the island's adventure spot
function _castleGateTex(scene,C){ var key='castle_gate_'+C.key; if(scene.textures.exists(key))return true; var S=TOWER_STYLES_BY_ID[C.castle]; if(!S)return false; var p=S.pal;
  var cv=mkCanvas(96,84), x=cv.getContext('2d');
  softShadow(x,48,80,44,6,0.35);
  x.fillStyle=shade(p.wallFace,-0.15); x.fillRect(8,24,20,58); x.fillRect(68,24,20,58);                 // towers
  x.fillStyle=p.wallFace; x.fillRect(24,36,48,46);                                                         // wall
  x.fillStyle=p.wallTop; for(var i=0;i<5;i++){ x.fillRect(8+i*4.5-(i%2),18,4,6); x.fillRect(68+i*4.5-(i%2),18,4,6); } for(var j=0;j<6;j++)x.fillRect(26+j*8,30,5,6);
  x.fillStyle=p.trim; x.fillRect(8,22,20,3); x.fillRect(68,22,20,3); x.fillRect(24,34,48,3);
  x.fillStyle='#1a1410'; rr(x,38,52,20,30,9); x.fill(); x.strokeStyle=p.metal||'#888'; x.lineWidth=1.5; for(var k=0;k<4;k++){ x.beginPath(); x.moveTo(41+k*5,55); x.lineTo(41+k*5,82); x.stroke(); }
  x.fillStyle=p.fabric||'#a33'; x.fillRect(16,4,2,16); x.beginPath(); x.moveTo(18,4); x.lineTo(28,8); x.lineTo(18,12); x.fill(); x.fillRect(76,4,2,16); x.beginPath(); x.moveTo(78,4); x.lineTo(88,8); x.lineTo(78,12); x.fill();
  x.fillStyle=p.glassA||'#ffd'; x.fillRect(15,40,5,8); x.fillRect(76,40,5,8);
  scene.textures.addCanvas(key,cv); return true; }
