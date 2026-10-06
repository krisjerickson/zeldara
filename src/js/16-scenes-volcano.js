// ─── VolcanoMazeScene — Mini-volcano #1: lava-floor platforming maze ────
class VolcanoMazeScene extends Phaser.Scene {
  constructor(){super('VolcanoMaze')}
  init(d){
    this.worldScene=d.worldScene;
    this.site=d.site;
    this.keyId=d.keyId||'volcano_key_n';
    this.keyName=d.keyName||'Ember Key';
  }
  create(){
    this._sceneKey = "VolcanoMaze";
    _attachSafetyEscape(this);
    _heroStowMount(this);
    var _self_safety = this; try {
    var self=this;
    this.ps=this.worldScene.playerState;
    // Maze: '#'=lava, '.'=path, 'K'=key tile, 'E'=exit door tile
    var maze=[
      '###########################',
      '#E........#...............#',
      '#.#######.#.#######.#####.#',
      '#.#.....#.#.#.....#.#...#.#',
      '#.#.###.#.#.#.###.#.#.#.#.#',
      '#.#.#.#.#...#.#.#.#.#.#.#.#',
      '#.#.#.#.#####.#.#.#.#.#.#.#',
      '#.#.#.#.......#...#.#.#.#.#',
      '#.#.#.#######.#####.#.#.#.#',
      '#.#.#.........#.....#.#.#.#',
      '#.#.###########.#####.#.#.#',
      '#.#...........#.......#.#.#',
      '#.###########.#########.#.#',
      '#.#..K........#.........#.#',
      '#.#.###########.#########.#',
      '#.#.........#...#.........#',
      '#.#########.#.#.#.#######.#',
      '#...........#.#...#.......#',
      '###########################',
    ];
    this.maze=maze; this.MW=maze[0].length; this.MH=maze.length;
    this.TS=32; this.W=this.MW*this.TS; this.H=this.MH*this.TS;
    this._drawTiles();
    var exitX=1,exitY=1,keyX=4,keyY=13;
    for(var ty=0;ty<this.MH;ty++) for(var tx=0;tx<this.MW;tx++){
      var c=maze[ty].charAt(tx);
      if(c==='E'){exitX=tx;exitY=ty;}
      if(c==='K'){keyX=tx;keyY=ty;}
    }
    this.exitTile={tx:exitX,ty:exitY};
    this.keyTile={tx:keyX,ty:keyY};
    // Key chest
    this.keyChest=this.add.text(keyX*this.TS+this.TS/2, keyY*this.TS+this.TS/2, '🔥', {fontSize:'24px',fontFamily:'serif'}).setOrigin(.5).setDepth(5);
    var glow=this.add.circle(keyX*this.TS+this.TS/2, keyY*this.TS+this.TS/2, 14, 0xffaa44, 0.35).setDepth(4);
    this.tweens.add({targets:glow,radius:22,alpha:0.1,duration:800,yoyo:true,repeat:-1});
    // Exit door
    this.add.rectangle(exitX*this.TS+this.TS/2, exitY*this.TS+this.TS/2, 28, 28, 0x4a3010, 0.9).setDepth(3).setStrokeStyle(2,0xccaa66,0.8);
    this.add.text(exitX*this.TS+this.TS/2, exitY*this.TS+this.TS/2, '🚪', {fontSize:'20px',fontFamily:'serif'}).setOrigin(.5).setDepth(4);
    // Player spawn — just east of the exit door
    this.player={x:(exitX+2)*this.TS+this.TS/2, y:exitY*this.TS+this.TS/2, dir:'right'};
    this._lastSafe={x:this.player.x, y:this.player.y};
    var cont=this.add.container(this.player.x, this.player.y).setDepth(10);
    var shadow=this.add.ellipse(0,14,22,8,0x000000,.3);
    cont.add(shadow);
    if(typeof _heroAddSprite==='function'){
      this.playerSprite=_heroAddSprite(this,cont,14);
      this.playerWalkState=_heroNewState('right');
    }
    this.playerCont=cont;
    // Camera
    this.cameras.main.startFollow(cont,true,0.1,0.1);
    this.cameras.main.setZoom(1.5);
    this.cameras.main.setBackgroundColor('#1a0a08');
    this.cameras.main.setBounds(0,0,this.W,this.H);
    // Keys
    this.keys=this.input.keyboard.addKeys({UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',W:'W',A:'A',S:'S',D:'D',SPACE:'SPACE',SHIFT:Phaser.Input.Keyboard.KeyCodes.SHIFT,TAB:Phaser.Input.Keyboard.KeyCodes.TAB});
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    // HUD overlay
    document.getElementById('dungeon-hud').style.display='block';
    this.titleTxt=this.add.text(this.scale.width/2,18,'🔥 Ember Maze — find the key',{fontSize:'14px',color:'#ffaa44',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    this.hintTxt=this.add.text(this.scale.width/2,this.scale.height-30,'WASD: move • Stay on obsidian • TAB on the 🔥 chest • ESC: leave',{fontSize:'10px',color:'#cca988',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    this.gotKey=this.ps.inventory&&this.ps.inventory.indexOf(this.keyId)>=0;
    if(this.gotKey){
      this.keyChest.setText('✨');
      this.hintTxt.setText('Already cleared. Return to the door (TAB) to leave.');
    }
    this.lavaCD=0;
    this._ready=true;
  
    } catch(_safetyErr) { console.error("VolcanoMazeScene.create", _safetyErr); _showSceneError(_self_safety, _safetyErr); }
  }
  _drawTiles(){
    var g=this.add.graphics().setDepth(1);
    var TS=this.TS;
    for(var ty=0;ty<this.MH;ty++){
      for(var tx=0;tx<this.MW;tx++){
        var c=this.maze[ty].charAt(tx);
        if(c==='#'){
          g.fillStyle(0xaa1100,1); g.fillRect(tx*TS,ty*TS,TS,TS);
          if(((tx*7+ty*13)%5)===0){g.fillStyle(0xff5500,0.55);g.fillCircle(tx*TS+TS/2,ty*TS+TS/2,5);}
          if(((tx*3+ty*5)%7)===0){g.fillStyle(0xffaa00,0.3);g.fillRect(tx*TS+4,ty*TS+TS-6,TS-8,3);}
        } else {
          g.fillStyle(0x1a1010,1); g.fillRect(tx*TS,ty*TS,TS,TS);
          g.fillStyle(0x281818,0.6); g.fillRect(tx*TS+2,ty*TS+2,TS-4,TS-4);
        }
      }
    }
  }
  _tileAt(x,y){
    var tx=Math.floor(x/this.TS), ty=Math.floor(y/this.TS);
    if(tx<0||tx>=this.MW||ty<0||ty>=this.MH)return '#';
    return this.maze[ty].charAt(tx);
  }
  update(_,ms){
    if(!this._ready)return;
    var dt=ms/1000;
    if(_anyModalOpen())return;
    var k=this.keys, spd=140, vx=0, vy=0;
    if(k.LEFT.isDown||k.A.isDown){vx=-spd; this.player.dir='left';}
    if(k.RIGHT.isDown||k.D.isDown){vx=spd; this.player.dir='right';}
    if(k.UP.isDown||k.W.isDown){vy=-spd; if(!vx)this.player.dir='up';}
    if(k.DOWN.isDown||k.S.isDown){vy=spd; if(!vx)this.player.dir='down';}
    if(vx&&vy){vx*=0.707;vy*=0.707;}
    this.player.x=Phaser.Math.Clamp(this.player.x+vx*dt,8,this.W-8);
    this.player.y=Phaser.Math.Clamp(this.player.y+vy*dt,8,this.H-8);
    this.playerCont.setPosition(this.player.x,this.player.y);
    if(typeof _heroAnimate==='function' && this.playerSprite){
      this.playerWalkState.dir=this.player.dir;
      _heroAnimate(this,this.playerSprite,this.playerWalkState,vx,vy,dt,0,0);
    }
    // Lava tile = damage + teleport back
    var c=this._tileAt(this.player.x,this.player.y);
    if(c==='#'){
      this.lavaCD-=dt;
      if(this.lavaCD<=0){
        this.lavaCD=0.7;
        var ps=this.worldScene.playerState;
        if(!ps.godMode){
          ps.hp=Math.max(0,ps.hp-10);
          if(this.worldScene._emitUI)this.worldScene._emitUI();
          if(ps.hp<=0){_heroDied(this);return;}
        }
        this.player.x=this._lastSafe.x; this.player.y=this._lastSafe.y;
        this.playerCont.setPosition(this.player.x,this.player.y);
        var fl=this.add.circle(this.player.x,this.player.y,22,0xff4400,0.6).setDepth(11);
        this.tweens.add({targets:fl,radius:42,alpha:0,duration:300,onComplete:function(){fl.destroy();}});
        var msg=this.add.text(this.player.x,this.player.y-30,'-10 LAVA',{fontSize:'13px',color:'#ff4400',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(20);
        this.tweens.add({targets:msg,y:msg.y-30,alpha:0,duration:900,onComplete:function(){msg.destroy();}});
      }
    } else {
      this._lastSafe.x=this.player.x; this._lastSafe.y=this.player.y;
      this.lavaCD=0;
    }
    // Chest interaction
    if(!this.gotKey){
      var kdx=this.player.x-this.keyTile.tx*this.TS-this.TS/2;
      var kdy=this.player.y-this.keyTile.ty*this.TS-this.TS/2;
      if(Math.hypot(kdx,kdy)<28 && Phaser.Input.Keyboard.JustDown(k.TAB)){
        this._grantKey();
      }
    }
    // Exit door (always works once you've got the key)
    var edx=this.player.x-this.exitTile.tx*this.TS-this.TS/2;
    var edy=this.player.y-this.exitTile.ty*this.TS-this.TS/2;
    if(Math.hypot(edx,edy)<28 && Phaser.Input.Keyboard.JustDown(k.TAB) && this.gotKey){
      this._exitToWorld();
    }
  }
  _grantKey(){
    this.gotKey=true;
    var ps=this.worldScene.playerState;
    if(!ps.inventory)ps.inventory=[];
    if(ps.inventory.indexOf(this.keyId)<0)ps.inventory.push(this.keyId);
    this.keyChest.setText('✨');
    showNotif('🔥 '+this.keyName+' obtained! Return to the door.','#ffaa44');
    if(this.hintTxt)this.hintTxt.setText('You got the key! TAB on the 🚪 door to leave.');
    if(this.worldScene._emitUI)this.worldScene._emitUI();
    if(this.worldScene._save)this.worldScene._save();
  }
  _exitToWorld(){
    document.getElementById('dungeon-hud').style.display='none';
    document.getElementById('hud').style.display='';
    this.scene.stop('VolcanoMaze');
    this.scene.wake('World');
    if(this.worldScene && this.worldScene._emitUI) this.worldScene._emitUI();
  }
}



// ═════════════════════════════════════════════════════════════════════════
// ║ MINI-VOLCANO #2 — Bullet-hell ascension (volcano_e, Magma Key)
// ║ Vertical climb. Lava geysers from below, falling rocks from above,
// ║ occasional homing fireball. Key chest at the top.
// ═════════════════════════════════════════════════════════════════════════
class VolcanoBulletHellScene extends Phaser.Scene {
  constructor(){super('VolcanoBulletHell')}
  init(d){this.worldScene=d.worldScene;this.site=d.site;this.keyId=d.keyId||'volcano_key_e';this.keyName=d.keyName||'Magma Key';}
  create(){
    this._sceneKey = "VolcanoBulletHell";
    _attachSafetyEscape(this);
    _heroStowMount(this);
    var _self_safety = this; try {
    var self=this;
    this.ps=this.worldScene.playerState;
    var W=420, H=1800;
    this.W=W; this.H=H;
    this.cameras.main.setBounds(0,0,W,H); this.cameras.main.setZoom(1.4);
    this.cameras.main.setBackgroundColor('#2a0a0a');
    // Background lava texture (gradient bands)
    var g=this.add.graphics().setDepth(0);
    for(var i=0;i<60;i++){
      var alpha=0.04+(i%3)*0.02;
      g.fillStyle(0x661100, alpha); g.fillRect(0, i*30, W, 30);
    }
    // Side walls (obsidian)
    g.fillStyle(0x140808,1).fillRect(0,0,40,H);
    g.fillStyle(0x140808,1).fillRect(W-40,0,40,H);
    // Top finish line — golden glow + key chest
    g.fillStyle(0xffaa44,0.4).fillRect(40,30,W-80,8);
    this.keyChest=this.add.text(W/2, 60, '🔥', {fontSize:'30px',fontFamily:'serif'}).setOrigin(.5).setDepth(5);
    var glow=this.add.circle(W/2,60,20,0xffaa44,0.4).setDepth(4);
    this.tweens.add({targets:glow,radius:32,alpha:0.1,duration:800,yoyo:true,repeat:-1});
    // Player at bottom
    this.player={x:W/2, y:H-60, dir:'up'};
    this._spawnY=this.player.y;
    var cont=this.add.container(this.player.x, this.player.y).setDepth(10);
    cont.add(this.add.ellipse(0,14,22,8,0x000000,.3));
    if(typeof _heroAddSprite==='function'){
      this.playerSprite=_heroAddSprite(this,cont,14);
      this.playerWalkState=_heroNewState('up');
    }
    this.playerCont=cont;
    this.cameras.main.startFollow(cont,true,0.08,0.18);
    this.keys=this.input.keyboard.addKeys({UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',W:'W',A:'A',S:'S',D:'D',SPACE:'SPACE',SHIFT:Phaser.Input.Keyboard.KeyCodes.SHIFT,TAB:Phaser.Input.Keyboard.KeyCodes.TAB});
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    document.getElementById('dungeon-hud').style.display='block';
    this.titleTxt=this.add.text(this.scale.width/2,18,'🟧 Magma Climb — reach the top, grab the key',{fontSize:'14px',color:'#ff8844',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    this.hintTxt=this.add.text(this.scale.width/2,this.scale.height-30,'WASD: move • Dodge geysers/rocks • TAB on chest • ESC: leave',{fontSize:'10px',color:'#ffcca8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    this.geysers=[]; this.rocks=[]; this.fireballs=[];
    this._gT=0; this._rT=0; this._fT=0; this._iframes=0;
    this.gotKey=this.ps.inventory&&this.ps.inventory.indexOf(this.keyId)>=0;
    if(this.gotKey){this.keyChest.setText('✨');this.hintTxt.setText('Already cleared. TAB the chest to leave.');}
    this._ready=true;
  
    } catch(_safetyErr) { console.error("VolcanoBulletHellScene.create", _safetyErr); _showSceneError(_self_safety, _safetyErr); }
  }
  update(_,ms){
    var self=this;
    if(!this._ready)return;
    var dt=ms/1000;
    if(_anyModalOpen())return;
    var k=this.keys, spd=160, vx=0, vy=0;
    if(k.LEFT.isDown||k.A.isDown){vx=-spd;this.player.dir='left';}
    if(k.RIGHT.isDown||k.D.isDown){vx=spd;this.player.dir='right';}
    if(k.UP.isDown||k.W.isDown){vy=-spd;if(!vx)this.player.dir='up';}
    if(k.DOWN.isDown||k.S.isDown){vy=spd;if(!vx)this.player.dir='down';}
    if(vx&&vy){vx*=0.707;vy*=0.707;}
    this.player.x=Phaser.Math.Clamp(this.player.x+vx*dt, 46, this.W-46);
    this.player.y=Phaser.Math.Clamp(this.player.y+vy*dt, 8, this.H-8);
    this.playerCont.setPosition(this.player.x,this.player.y);
    if(typeof _heroAnimate==='function'&&this.playerSprite){
      this.playerWalkState.dir=this.player.dir;
      _heroAnimate(this,this.playerSprite,this.playerWalkState,vx,vy,dt,0,0);
    }
    this._iframes=Math.max(0,this._iframes-dt);
    // Difficulty scales with height climbed (lower y = harder)
    var climbed=1 - (this.player.y/this.H); // 0 at bottom, 1 at top
    // Geysers
    this._gT-=dt;
    if(this._gT<=0){
      this._gT=1.0-climbed*0.5;
      var gx=60+Math.random()*(this.W-120);
      var gy=this.player.y+200+Math.random()*100;
      var col=this.add.rectangle(gx,gy,18,80,0xff5500,0.7).setDepth(8);
      this.geysers.push({vis:col,x:gx,y:gy,life:1.5,t:0});
    }
    this.geysers=this.geysers.filter(function(gz){
      gz.t+=dt; gz.life-=dt;
      gz.vis.height=Math.min(120, gz.t*120);
      gz.vis.y=gz.y - gz.vis.height/2;
      if(gz.life<=0){gz.vis.destroy();return false;}
      // Hit check
      if(Math.abs(self.player.x-gz.x)<14 && Math.abs(self.player.y-gz.y)<60 && self._iframes<=0){
        self._takeHit();
      }
      return true;
    });
    // Rocks falling from above
    this._rT-=dt;
    if(this._rT<=0){
      this._rT=0.7-climbed*0.4;
      var rx=60+Math.random()*(this.W-120);
      var rv=(typeof ZShot!=='undefined'&&ZShot.make(this,'rock',rx,this.player.y-300,0,8,1.35))||this.add.circle(rx, this.player.y-300, 8, 0x442211, 1).setDepth(8).setStrokeStyle(2,0x664422,1);
      this.rocks.push({vis:rv,x:rx,y:this.player.y-300,vy:160+Math.random()*80});
    }
    this.rocks=this.rocks.filter(function(rk){
      rk.y+=rk.vy*dt; rk.vis.setPosition(rk.x, rk.y);
      if(rk.y > self.player.y + 200){rk.vis.destroy();return false;}
      if(Math.hypot(rk.x-self.player.x, rk.y-self.player.y)<14 && self._iframes<=0){
        self._takeHit(); rk.vis.destroy(); return false;
      }
      return true;
    });
    // Homing fireballs (rare)
    this._fT-=dt;
    if(this._fT<=0 && climbed>0.25){
      this._fT=3.5;
      var fx=60+Math.random()*(this.W-120);
      var fy=this.player.y+250;
      var fv=(typeof ZShot!=='undefined'&&ZShot.make(this,'fireball',fx,fy,-Math.PI/2,8,1.1))||this.add.circle(fx,fy,7,0xff6600,1).setDepth(8).setStrokeStyle(2,0xffaa44,0.8);
      this.fireballs.push({vis:fv,x:fx,y:fy,life:6});
    }
    this.fireballs=this.fireballs.filter(function(fb){
      fb.life-=dt;
      if(fb.life<=0){fb.vis.destroy();return false;}
      var ang=Math.atan2(self.player.y-fb.y, self.player.x-fb.x);
      fb.x+=Math.cos(ang)*110*dt; fb.y+=Math.sin(ang)*110*dt;
      fb.vis.setPosition(fb.x,fb.y);
      if(Math.hypot(fb.x-self.player.x, fb.y-self.player.y)<13 && self._iframes<=0){
        self._takeHit(); fb.vis.destroy(); return false;
      }
      return true;
    });
    // Chest interaction
    if(this.player.y < 100){
      if(!this.gotKey && Phaser.Input.Keyboard.JustDown(k.TAB)){this._grantKey();}
      else if(this.gotKey && Phaser.Input.Keyboard.JustDown(k.TAB)){this._exitToWorld();}
    }
  }
  _takeHit(){
    this._iframes=1.0;
    var ps=this.worldScene.playerState;
    if(!ps.godMode){
      ps.hp=Math.max(0,ps.hp-10);
      if(this.worldScene._emitUI)this.worldScene._emitUI();
      if(ps.hp<=0){_heroDied(this);return;}
    }
    // Push player down a bit
    this.player.y=Math.min(this.H-8, this.player.y+60);
    this.playerCont.setPosition(this.player.x,this.player.y);
    var fl=this.add.circle(this.player.x,this.player.y,22,0xff4400,0.6).setDepth(11);
    this.tweens.add({targets:fl,radius:42,alpha:0,duration:300,onComplete:function(){fl.destroy();}});
  }
  _grantKey(){
    this.gotKey=true;
    var ps=this.worldScene.playerState;
    if(!ps.inventory)ps.inventory=[];
    if(ps.inventory.indexOf(this.keyId)<0)ps.inventory.push(this.keyId);
    this.keyChest.setText('✨');
    showNotif('🟧 '+this.keyName+' obtained!','#ff8844');
    if(this.hintTxt)this.hintTxt.setText('You got the key! TAB the chest again to leave.');
    if(this.worldScene._emitUI)this.worldScene._emitUI();
    if(this.worldScene._save)this.worldScene._save();
  }
  _exitToWorld(){
    document.getElementById('dungeon-hud').style.display='none';
    document.getElementById('hud').style.display='';
    this.scene.stop('VolcanoBulletHell');
    this.scene.wake('World');
    if(this.worldScene && this.worldScene._emitUI) this.worldScene._emitUI();
  }
}

// ═════════════════════════════════════════════════════════════════════════
// ║ MINI-VOLCANO #3 — Obsidian block puzzle (volcano_s, Obsidian Key)
// ║ Push 3 obsidian blocks onto 3 pressure plates → door opens → grab key
// ═════════════════════════════════════════════════════════════════════════
class VolcanoPuzzleScene extends Phaser.Scene {
  constructor(){super('VolcanoPuzzle')}
  init(d){this.worldScene=d.worldScene;this.site=d.site;this.keyId=d.keyId||'volcano_key_s';this.keyName=d.keyName||'Obsidian Key';}
  create(){
    this._sceneKey = "VolcanoPuzzle";
    _attachSafetyEscape(this);
    _heroStowMount(this);
    var _self_safety = this; try {
    var self=this;
    this.ps=this.worldScene.playerState;
    this.TS=32;
    // Layout: '#'=wall, '.'=floor, 'B'=block, 'P'=plate, 'K'=key (locked), 'E'=exit
    var L=[
      '#################',
      '#E.......#......#',
      '#........#......#',
      '#........#......#',
      '#..B.....+...K..#',
      '#........#......#',
      '#..P.....#......#',
      '#........#......#',
      '#..B.P.B.#......#',
      '#........#......#',
      '#......P.#......#',
      '#................',
      '#################',
    ];
    this.layout=L.map(function(r){return r.split('');});
    this.MW=L[0].length; this.MH=L.length;
    this.W=this.MW*this.TS; this.H=this.MH*this.TS;
    this.cameras.main.setBounds(0,0,this.W,this.H);
    this.cameras.main.setZoom(1.6);
    this.cameras.main.setBackgroundColor('#0a0606');
    this._drawTiles();
    // Find positions
    this.blocks=[]; this.plates=[]; this.keyTile=null; this.exitTile=null;
    this.doorTile=null;
    for(var ty=0;ty<this.MH;ty++) for(var tx=0;tx<this.MW;tx++){
      var c=this.layout[ty][tx];
      if(c==='B'){this.blocks.push({tx:tx,ty:ty,vis:null}); this.layout[ty][tx]='.';}
      if(c==='P'){this.plates.push({tx:tx,ty:ty,pressed:false,vis:null});}
      if(c==='K'){this.keyTile={tx:tx,ty:ty};}
      if(c==='E'){this.exitTile={tx:tx,ty:ty};}
      if(c==='+'){this.doorTile={tx:tx,ty:ty};}
    }
    // Render plates (red glow circles) — under blocks
    var self0=this;
    this.plates.forEach(function(p){
      p.vis=self0.add.circle(p.tx*self0.TS+self0.TS/2, p.ty*self0.TS+self0.TS/2, 12, 0xcc3333, 0.55).setDepth(3).setStrokeStyle(2,0xff6666,0.8);
    });
    // Render blocks
    this.blocks.forEach(function(b){
      b.vis=self0.add.rectangle(b.tx*self0.TS+self0.TS/2, b.ty*self0.TS+self0.TS/2, self0.TS-6, self0.TS-6, 0x1a1010).setDepth(5).setStrokeStyle(2,0x4a3a3a,1);
    });
    // Door — closed initially
    this.doorOpen=false;
    if(this.doorTile){
      this.doorVis=this.add.rectangle(this.doorTile.tx*this.TS+this.TS/2, this.doorTile.ty*this.TS+this.TS/2, this.TS-4, this.TS-4, 0x4a2010).setDepth(4).setStrokeStyle(2,0xcc6622,0.9);
    }
    // Key chest
    this.keyChest=this.add.text(this.keyTile.tx*this.TS+this.TS/2, this.keyTile.ty*this.TS+this.TS/2, '🟫', {fontSize:'22px',fontFamily:'serif'}).setOrigin(.5).setDepth(5);
    // Exit door
    this.add.rectangle(this.exitTile.tx*this.TS+this.TS/2, this.exitTile.ty*this.TS+this.TS/2, this.TS-4, this.TS-4, 0x4a3010).setDepth(3).setStrokeStyle(2,0xccaa66,0.8);
    this.add.text(this.exitTile.tx*this.TS+this.TS/2, this.exitTile.ty*this.TS+this.TS/2, '🚪', {fontSize:'20px',fontFamily:'serif'}).setOrigin(.5).setDepth(4);
    // Player spawn near exit
    var spawn={tx:(this.exitTile.tx+2), ty:this.exitTile.ty};
    this.playerTile={tx:spawn.tx, ty:spawn.ty};
    this.player={x:spawn.tx*this.TS+this.TS/2, y:spawn.ty*this.TS+this.TS/2, dir:'right'};
    var cont=this.add.container(this.player.x,this.player.y).setDepth(10);
    cont.add(this.add.ellipse(0,14,22,8,0x000000,.3));
    if(typeof _heroAddSprite==='function'){
      this.playerSprite=_heroAddSprite(this,cont,14);
      this.playerWalkState=_heroNewState('right');
    }
    this.playerCont=cont;
    this.cameras.main.startFollow(cont,true,0.12,0.12);
    this.keys=this.input.keyboard.addKeys({UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',W:'W',A:'A',S:'S',D:'D',SPACE:'SPACE',SHIFT:Phaser.Input.Keyboard.KeyCodes.SHIFT,TAB:Phaser.Input.Keyboard.KeyCodes.TAB});
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    document.getElementById('dungeon-hud').style.display='block';
    this.titleTxt=this.add.text(this.scale.width/2,18,'🟫 Obsidian Puzzle — push all 3 blocks onto plates',{fontSize:'14px',color:'#cc8866',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    this.hintTxt=this.add.text(this.scale.width/2,this.scale.height-30,'WASD: move • Walk into a block to push it • TAB the chest • ESC: leave',{fontSize:'10px',color:'#cca988',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    this._moveCD=0;
    this.gotKey=this.ps.inventory&&this.ps.inventory.indexOf(this.keyId)>=0;
    if(this.gotKey){
      this.keyChest.setText('✨');
      this.doorOpen=true;
      if(this.doorVis)this.doorVis.setVisible(false);
      this.hintTxt.setText('Already cleared. TAB the chest to leave.');
    }
    this._ready=true;
  
    } catch(_safetyErr) { console.error("VolcanoPuzzleScene.create", _safetyErr); _showSceneError(_self_safety, _safetyErr); }
  }
  _drawTiles(){
    var g=this.add.graphics().setDepth(0);
    for(var ty=0;ty<this.MH;ty++) for(var tx=0;tx<this.MW;tx++){
      var c=this.layout[ty][tx];
      if(c==='#'){
        g.fillStyle(0x281410,1).fillRect(tx*this.TS,ty*this.TS,this.TS,this.TS);
        g.fillStyle(0x3a2018,0.6).fillRect(tx*this.TS+2,ty*this.TS+2,this.TS-4,this.TS-4);
      } else {
        g.fillStyle(0x1a1410,1).fillRect(tx*this.TS,ty*this.TS,this.TS,this.TS);
      }
    }
  }
  _tileAt(tx,ty){
    if(tx<0||tx>=this.MW||ty<0||ty>=this.MH)return '#';
    return this.layout[ty][tx];
  }
  _blockAt(tx,ty){return this.blocks.find(function(b){return b.tx===tx && b.ty===ty;});}
  _canStandOn(tx,ty){
    var c=this._tileAt(tx,ty);
    if(c==='#')return false;
    if(c==='K' && !this.gotKey)return false;
    if(tx===(this.doorTile&&this.doorTile.tx) && ty===(this.doorTile&&this.doorTile.ty) && !this.doorOpen)return false;
    return true;
  }
  update(_,ms){
    if(!this._ready)return;
    var dt=ms/1000;
    if(_anyModalOpen())return;
    this._moveCD=Math.max(0,this._moveCD-dt);
    var k=this.keys;
    var dx=0, dy=0;
    if(k.LEFT.isDown||k.A.isDown){dx=-1;this.player.dir='left';}
    else if(k.RIGHT.isDown||k.D.isDown){dx=1;this.player.dir='right';}
    else if(k.UP.isDown||k.W.isDown){dy=-1;this.player.dir='up';}
    else if(k.DOWN.isDown||k.S.isDown){dy=1;this.player.dir='down';}
    if((dx||dy) && this._moveCD<=0){
      this._moveCD=0.16;
      var ntx=this.playerTile.tx+dx, nty=this.playerTile.ty+dy;
      var blk=this._blockAt(ntx,nty);
      if(blk){
        // Try to push: target must be walkable and empty
        var btx=blk.tx+dx, bty=blk.ty+dy;
        if(this._canStandOn(btx,bty) && !this._blockAt(btx,bty)){
          blk.tx=btx; blk.ty=bty;
          blk.vis.setPosition(btx*this.TS+this.TS/2, bty*this.TS+this.TS/2);
          this.playerTile.tx=ntx; this.playerTile.ty=nty;
          this._checkPlates();
        }
      } else if(this._canStandOn(ntx,nty)){
        this.playerTile.tx=ntx; this.playerTile.ty=nty;
      }
    }
    // Smooth player render
    var targetX=this.playerTile.tx*this.TS+this.TS/2;
    var targetY=this.playerTile.ty*this.TS+this.TS/2;
    this.player.x+=(targetX-this.player.x)*Math.min(1,dt*12);
    this.player.y+=(targetY-this.player.y)*Math.min(1,dt*12);
    this.playerCont.setPosition(this.player.x,this.player.y);
    if(typeof _heroAnimate==='function'&&this.playerSprite){
      this.playerWalkState.dir=this.player.dir;
      var moving=Math.abs(targetX-this.player.x)>1 || Math.abs(targetY-this.player.y)>1;
      _heroAnimate(this,this.playerSprite,this.playerWalkState, moving?(dx*100):0, moving?(dy*100):0, dt, 0, 0);
    }
    // Chest interaction
    if(this.playerTile.tx===this.keyTile.tx && this.playerTile.ty===this.keyTile.ty){
      if(!this.gotKey && Phaser.Input.Keyboard.JustDown(k.TAB)){this._grantKey();}
    }
    if(this.playerTile.tx===this.exitTile.tx && this.playerTile.ty===this.exitTile.ty){
      if(Phaser.Input.Keyboard.JustDown(k.TAB))this._exitToWorld();
    }
  }
  _checkPlates(){
    var self=this;
    var allPressed=true;
    this.plates.forEach(function(p){
      var occupied=!!self._blockAt(p.tx,p.ty);
      p.pressed=occupied;
      p.vis.setFillStyle(occupied?0x44ff44:0xcc3333, occupied?0.7:0.55);
      p.vis.setStrokeStyle(2, occupied?0x88ff88:0xff6666, occupied?1:0.8);
      if(!occupied)allPressed=false;
    });
    if(allPressed && !this.doorOpen){
      this.doorOpen=true;
      if(this.doorVis){
        var dv=this.doorVis;
        this.tweens.add({targets:dv,alpha:0,duration:400,onComplete:function(){dv.setVisible(false);}});
      }
      showNotif('🟫 All plates pressed — the door opens!','#cc8866');
    }
  }
  _grantKey(){
    this.gotKey=true;
    var ps=this.worldScene.playerState;
    if(!ps.inventory)ps.inventory=[];
    if(ps.inventory.indexOf(this.keyId)<0)ps.inventory.push(this.keyId);
    this.keyChest.setText('✨');
    showNotif('🟫 '+this.keyName+' obtained!','#cc8866');
    if(this.hintTxt)this.hintTxt.setText('You got the key! Walk back and TAB the 🚪 door.');
    if(this.worldScene._emitUI)this.worldScene._emitUI();
    if(this.worldScene._save)this.worldScene._save();
  }
  _exitToWorld(){
    document.getElementById('dungeon-hud').style.display='none';
    document.getElementById('hud').style.display='';
    this.scene.stop('VolcanoPuzzle');
    this.scene.wake('World');
    if(this.worldScene && this.worldScene._emitUI) this.worldScene._emitUI();
  }
}

// ═════════════════════════════════════════════════════════════════════════
// ║ MINI-VOLCANO #4 — Lava-rising escape (volcano_w, Ashfire Key)
// ║ Lava floods chamber over 90s. Collect 3 fragments to forge key, escape.
// ═════════════════════════════════════════════════════════════════════════
class VolcanoEscapeScene extends Phaser.Scene {
  constructor(){super('VolcanoEscape')}
  init(d){this.worldScene=d.worldScene;this.site=d.site;this.keyId=d.keyId||'volcano_key_w';this.keyName=d.keyName||'Ashfire Key';}
  create(){
    this._sceneKey = "VolcanoEscape";
    _attachSafetyEscape(this);
    _heroStowMount(this);
    var _self_safety = this; try {
    var self=this;
    this.ps=this.worldScene.playerState;
    this.TS=32;
    // Layout: walls + platforms above lava floor
    var L=[
      '#################',
      '#...............#',
      '#..F.....#......#',
      '#........#...F..#',
      '#####....####...#',
      '#...........#...#',
      '#...F.......#...#',
      '#...........#####',
      '#######.........#',
      '#.......E.......#',
      '#################',
    ];
    this.layout=L.map(function(r){return r.split('');});
    this.MW=L[0].length; this.MH=L.length;
    this.W=this.MW*this.TS; this.H=this.MH*this.TS;
    this.cameras.main.setBounds(0,0,this.W,this.H);
    this.cameras.main.setZoom(1.6);
    this.cameras.main.setBackgroundColor('#1a0606');
    this._drawTiles();
    // Lava rises from the bottom over time
    this._lavaY=this.H+10;
    this._lavaTarget=this.H+10;
    this.lavaRect=this.add.rectangle(this.W/2, this._lavaY, this.W, 600, 0xff3300, 0.85).setOrigin(.5,0).setDepth(20);
    this.lavaGlow=this.add.rectangle(this.W/2, this._lavaY-4, this.W, 8, 0xffaa44, 0.7).setOrigin(.5,0).setDepth(21);
    // Fragments
    this.fragments=[]; this.exitTile=null;
    for(var ty=0;ty<this.MH;ty++) for(var tx=0;tx<this.MW;tx++){
      var c=this.layout[ty][tx];
      if(c==='F'){
        var fv=this.add.text(tx*this.TS+this.TS/2, ty*this.TS+this.TS/2, '🟡', {fontSize:'18px',fontFamily:'serif'}).setOrigin(.5).setDepth(7);
        this.fragments.push({tx:tx,ty:ty,vis:fv,grabbed:false});
        this.layout[ty][tx]='.';
      }
      if(c==='E')this.exitTile={tx:tx,ty:ty};
    }
    // Exit door (locked until 3 fragments)
    this.add.rectangle(this.exitTile.tx*this.TS+this.TS/2, this.exitTile.ty*this.TS+this.TS/2, this.TS-4, this.TS-4, 0x4a3010).setDepth(3).setStrokeStyle(2,0xccaa66,0.8);
    this.exitIcon=this.add.text(this.exitTile.tx*this.TS+this.TS/2, this.exitTile.ty*this.TS+this.TS/2, '🚪', {fontSize:'20px',fontFamily:'serif'}).setOrigin(.5).setDepth(4);
    // Player spawn at top-left
    this.player={x:48, y:48, dir:'right'};
    var cont=this.add.container(this.player.x,this.player.y).setDepth(10);
    cont.add(this.add.ellipse(0,14,22,8,0x000000,.3));
    if(typeof _heroAddSprite==='function'){
      this.playerSprite=_heroAddSprite(this,cont,14);
      this.playerWalkState=_heroNewState('right');
    }
    this.playerCont=cont;
    this.cameras.main.startFollow(cont,true,0.1,0.1);
    this.keys=this.input.keyboard.addKeys({UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',W:'W',A:'A',S:'S',D:'D',SPACE:'SPACE',SHIFT:Phaser.Input.Keyboard.KeyCodes.SHIFT,TAB:Phaser.Input.Keyboard.KeyCodes.TAB});
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    document.getElementById('dungeon-hud').style.display='block';
    this.titleTxt=this.add.text(this.scale.width/2,18,'🌋 Ashfire Escape — collect 3 fragments before the lava rises',{fontSize:'13px',color:'#ff8844',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    this.timerTxt=this.add.text(this.scale.width/2,38,'',{fontSize:'15px',color:'#ffdd44',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,fontStyle:'bold'}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    this.hintTxt=this.add.text(this.scale.width/2,this.scale.height-30,'WASD: move • Grab 🟡 fragments • TAB the 🚪 door • ESC: leave',{fontSize:'10px',color:'#ffcca8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    this._lavaT=90; // seconds
    this._iframes=0;
    this.gotKey=this.ps.inventory&&this.ps.inventory.indexOf(this.keyId)>=0;
    if(this.gotKey){
      this.fragments.forEach(function(f){f.vis.setText('✨');});
      this.exitIcon.setText('✅');
      this.hintTxt.setText('Already cleared. TAB the door to leave.');
    }
    this._ready=true;
  
    } catch(_safetyErr) { console.error("VolcanoEscapeScene.create", _safetyErr); _showSceneError(_self_safety, _safetyErr); }
  }
  _drawTiles(){
    var g=this.add.graphics().setDepth(0);
    for(var ty=0;ty<this.MH;ty++) for(var tx=0;tx<this.MW;tx++){
      var c=this.layout[ty][tx];
      if(c==='#'){
        g.fillStyle(0x282010,1).fillRect(tx*this.TS,ty*this.TS,this.TS,this.TS);
        g.fillStyle(0x3a3018,0.6).fillRect(tx*this.TS+2,ty*this.TS+2,this.TS-4,this.TS-4);
      } else {
        g.fillStyle(0x1a1410,1).fillRect(tx*this.TS,ty*this.TS,this.TS,this.TS);
      }
    }
  }
  _wallAt(x,y){
    var tx=Math.floor(x/this.TS), ty=Math.floor(y/this.TS);
    if(tx<0||tx>=this.MW||ty<0||ty>=this.MH)return true;
    return this.layout[ty][tx]==='#';
  }
  update(_,ms){
    if(!this._ready)return;
    var dt=ms/1000;
    if(_anyModalOpen())return;
    var k=this.keys, spd=150, vx=0, vy=0;
    if(k.LEFT.isDown||k.A.isDown){vx=-spd;this.player.dir='left';}
    if(k.RIGHT.isDown||k.D.isDown){vx=spd;this.player.dir='right';}
    if(k.UP.isDown||k.W.isDown){vy=-spd;if(!vx)this.player.dir='up';}
    if(k.DOWN.isDown||k.S.isDown){vy=spd;if(!vx)this.player.dir='down';}
    if(vx&&vy){vx*=0.707;vy*=0.707;}
    var nx=this.player.x+vx*dt, ny=this.player.y+vy*dt;
    if(!this._wallAt(nx,this.player.y) && !this._wallAt(nx,this.player.y-8) && !this._wallAt(nx,this.player.y+8)) this.player.x=Phaser.Math.Clamp(nx,8,this.W-8);
    if(!this._wallAt(this.player.x,ny) && !this._wallAt(this.player.x-8,ny) && !this._wallAt(this.player.x+8,ny)) this.player.y=Phaser.Math.Clamp(ny,8,this.H-8);
    this.playerCont.setPosition(this.player.x,this.player.y);
    if(typeof _heroAnimate==='function'&&this.playerSprite){
      this.playerWalkState.dir=this.player.dir;
      _heroAnimate(this,this.playerSprite,this.playerWalkState,vx,vy,dt,0,0);
    }
    this._iframes=Math.max(0,this._iframes-dt);
    if(!this.gotKey){
      this._lavaT=Math.max(0,this._lavaT-dt);
      var frac=1 - (this._lavaT/90);
      this._lavaTarget=this.H - frac*(this.H-40);
    }
    this._lavaY+=(this._lavaTarget-this._lavaY)*Math.min(1,dt*1.5);
    this.lavaRect.y=this._lavaY;
    this.lavaGlow.y=this._lavaY-4;
    this.timerTxt.setText(this.gotKey?'KEY READY — escape!':'Lava in '+Math.ceil(this._lavaT)+'s');
    if(this.player.y>this._lavaY-6 && this._iframes<=0){
      this._iframes=1;
      var ps=this.worldScene.playerState;
      if(!ps.godMode){
        ps.hp=Math.max(0,ps.hp-15);
        if(this.worldScene._emitUI)this.worldScene._emitUI();
        if(ps.hp<=0){_heroDied(this);return;}
      }
      this.player.y=Math.max(48, this._lavaY-50);
      this.playerCont.setPosition(this.player.x,this.player.y);
    }
    // Fragment pickup
    var self=this, fragsLeft=0;
    this.fragments.forEach(function(f){
      if(f.grabbed)return;
      var cx=f.tx*self.TS+self.TS/2, cy=f.ty*self.TS+self.TS/2;
      if(Math.hypot(self.player.x-cx, self.player.y-cy)<18){
        f.grabbed=true;
        f.vis.setText('✨');
        showNotif('🟡 Fragment '+(self.fragments.filter(function(x){return x.grabbed;}).length)+' / 3 collected','#ffdd44');
      }
      if(!f.grabbed)fragsLeft++;
    });
    if(fragsLeft===0 && !this.gotKey){
      this._grantKey();
    }
    if(this.gotKey){
      var dxE=this.player.x-(this.exitTile.tx*this.TS+this.TS/2);
      var dyE=this.player.y-(this.exitTile.ty*this.TS+this.TS/2);
      if(Math.hypot(dxE,dyE)<22 && Phaser.Input.Keyboard.JustDown(k.TAB))this._exitToWorld();
    }
  }
  _grantKey(){
    this.gotKey=true;
    var ps=this.worldScene.playerState;
    if(!ps.inventory)ps.inventory=[];
    if(ps.inventory.indexOf(this.keyId)<0)ps.inventory.push(this.keyId);
    this.exitIcon.setText('✅');
    showNotif('🌋 '+this.keyName+' forged! TAB the 🚪 door to leave.','#ff8844');
    if(this.hintTxt)this.hintTxt.setText('Key forged! TAB the door to escape.');
    if(this.worldScene._emitUI)this.worldScene._emitUI();
    if(this.worldScene._save)this.worldScene._save();
  }
  _exitToWorld(){
    document.getElementById('dungeon-hud').style.display='none';
    document.getElementById('hud').style.display='';
    this.scene.stop('VolcanoEscape');
    this.scene.wake('World');
    if(this.worldScene && this.worldScene._emitUI) this.worldScene._emitUI();
  }
}

// ═════════════════════════════════════════════════════════════════════════
// ║ FINAL BOSS — Volcano Lord boss-rush gauntlet (volcano_main)
// ║ Three sequential bosses: Fire Imp → Lava Wyrm → Volcano Lord
// ═════════════════════════════════════════════════════════════════════════
class VolcanoBossRushScene extends Phaser.Scene {
  constructor(){super('VolcanoBossRush')}
  init(d){this.worldScene=d.worldScene;this.site=d.site;}
  create(){
    this._sceneKey = "VolcanoBossRush";
    _attachSafetyEscape(this);
    _heroStowMount(this);
    if(typeof ZSFX!=='undefined'){ ZSFX.music(4,4); this.events.once('shutdown',function(){ ZSFX.stopMusic(); }); }   // boss-rush music (round 7)
    var _self_safety = this; try {
    var self=this;
    this.ps=this.worldScene.playerState;
    var W=720, H=560;
    this.W=W; this.H=H;
    this.cameras.main.setBounds(0,0,W,H);
    this.cameras.main.setZoom(1.4);
    this.cameras.main.setBackgroundColor('#1a0405');
    // Arena floor — obsidian with lava cracks
    var g=this.add.graphics().setDepth(0);
    g.fillStyle(0x1a0a08,1).fillRect(0,0,W,H);
    for(var i=0;i<20;i++){
      var cx=Math.random()*W, cy=Math.random()*H, len=20+Math.random()*40;
      var ang=Math.random()*Math.PI*2;
      g.lineStyle(2+Math.random()*2, 0xff4400, 0.5);
      g.lineBetween(cx, cy, cx+Math.cos(ang)*len, cy+Math.sin(ang)*len);
    }
    // Walls
    g.fillStyle(0x140404,1);
    g.fillRect(0,0,W,30); g.fillRect(0,H-30,W,30);
    g.fillRect(0,0,30,H); g.fillRect(W-30,0,30,H);
    // Player
    this.player={x:W/2, y:H-80, dir:'up'};
    var cont=this.add.container(this.player.x,this.player.y).setDepth(10);
    cont.add(this.add.ellipse(0,14,22,8,0x000000,.3));
    if(typeof _heroAddSprite==='function'){
      this.playerSprite=_heroAddSprite(this,cont,14);
      this.playerWalkState=_heroNewState('up');
    }
    this.playerCont=cont;
    this.cameras.main.startFollow(cont,true,0.08,0.08);
    this.keys=this.input.keyboard.addKeys({UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',W:'W',A:'A',S:'S',D:'D',SPACE:'SPACE',SHIFT:Phaser.Input.Keyboard.KeyCodes.SHIFT,TAB:Phaser.Input.Keyboard.KeyCodes.TAB});
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    document.getElementById('dungeon-hud').style.display='block';
    this.titleTxt=this.add.text(this.scale.width/2,18,'⚔️ Volcano Lord — Boss Rush',{fontSize:'15px',color:'#ff4444',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,fontStyle:'bold'}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    this.bossTxt=this.add.text(this.scale.width/2,40,'',{fontSize:'12px',color:'#ffaa44',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    this.hintTxt=this.add.text(this.scale.width/2,this.scale.height-26,'WASD: move • SPACE: attack • SHIFT: shield • CTRL: bow',{fontSize:'10px',color:'#cca988',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setScrollFactor(0).setDepth(100);
    // 10 waves, ramping difficulty. Wave 1 is a SWARM (3 simultaneous
    // Fire Imps). Waves 2-9 each have a single boss with HP >= 200.
    // Wave 10 is the Volcano Lord finale.
    this.bosses=[
      // Wave 1 — swarm
      {wave:'swarm',count:3,name:'Fire Imp',hp:60,atk:12,color:0xff5500,r:13,spd:95,icon:'😈'},
      // Wave 2-9 — ascending bosses (all >= 200 HP)
      {name:'Ember Wraith',  hp:200,atk:16,color:0xff7733,r:16,spd:78,icon:'👻'},
      {name:'Magma Spitter', hp:220,atk:18,color:0xcc4400,r:17,spd:62,icon:'🐊'},
      {name:'Obsidian Golem',hp:260,atk:20,color:0x332222,r:20,spd:48,icon:'🗿'},
      {name:'Cinder Phoenix',hp:240,atk:22,color:0xff9933,r:17,spd:96,icon:'🦅'},
      {name:'Lava Wyrm',     hp:290,atk:24,color:0xcc2200,r:19,spd:74,icon:'🦎'},
      {name:'Ashen Knight',  hp:320,atk:26,color:0x554433,r:18,spd:66,icon:'🤺'},
      {name:'Pyrokraken',    hp:360,atk:28,color:0x882211,r:22,spd:58,icon:'🐙'},
      {name:'Inferno Wraith',hp:400,atk:32,color:0xaa3300,r:20,spd:72,icon:'👹'},
      // Wave 10 — finale
      {name:'VOLCANO LORD',  hp:520,atk:38,color:0x661100,r:26,spd:62,icon:'🌋'},
    ];
    this.bossIdx=-1;
    this.monsters=[];
    this.playerAtkTimer=0; this.pBowTimer=0;
    this.iFrames=0;
    this._spawnNext();
    this._ready=true;
  
    } catch(_safetyErr) { console.error("VolcanoBossRushScene.create", _safetyErr); _showSceneError(_self_safety, _safetyErr); }
  }
  _spawnNext(){
    this.bossIdx++;
    if(this.bossIdx>=this.bosses.length){this._victory();return;}
    var b=this.bosses[this.bossIdx];
    var self=this;
    var total=this.bosses.length;
    function spawnOne(b, x, y){
      var cont=self.add.container(x, y).setDepth(9);
      var body=CHX.bossBody(self,null,b,cont)||CHX.monBody(self,b.name,b)||self.add.circle(0,0,b.r,b.color).setStrokeStyle(2,0x000000,0.5);
      var icon=self.add.text(0,0,body.setTexture?'':b.icon,{fontSize:(b.r*1.4)+'px',fontFamily:'serif'}).setOrigin(.5);
      var tr=body.setTexture?b.r+20:b.r;
      var hpBg=self.add.rectangle(0,-tr-12,b.r*2.2,5,0x000000,0.8);
      var hpFill=self.add.rectangle(-b.r*1.1,-tr-12,b.r*2.2,5,0xff3333).setOrigin(0,.5);
      var nameT=self.add.text(0,-tr-22,b.name,{fontSize:'10px',color:'#fff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5);
      cont.add([body,icon,hpBg,hpFill,nameT]);
      var bhp=b.wave==='swarm'?Math.round(b.hp*ZDiff.cur().monHp):Math.round(b.hp*1.5*BOSS_HP_R12*ZDiff.cur().bossHp);   // round 9: bosses +50%, round 12: ×2 (the imp swarm stays)
      return {cont:cont,body:body,hpFill:hpFill,def:b,hp:bhp,maxHp:bhp,x:x,y:y,atkTimer:1.5,isBoss:true,dead:false};
    }
    this.monsters=[];
    if(b.wave==='swarm'){
      // 3 fire imps spawning around the top of the arena
      var pts=[[this.W*0.3, 100],[this.W*0.5, 80],[this.W*0.7, 100]];
      for(var i=0;i<b.count;i++){
        this.monsters.push(spawnOne(b, pts[i][0], pts[i][1]));
      }
      this.bossTxt.setText('Wave '+(this.bossIdx+1)+'/'+total+': '+b.count+'× '+b.name);
      showNotif('⚔ Wave '+(this.bossIdx+1)+': '+b.count+'× '+b.name+'!','#ff8844');
    } else {
      this.monsters.push(spawnOne(b, this.W/2, 100));
      this.bossTxt.setText('Wave '+(this.bossIdx+1)+'/'+total+': '+b.name+'  HP '+b.hp);
      showNotif('⚔ Wave '+(this.bossIdx+1)+'/'+total+': '+b.name+' approaches!','#ff8844');
    }
  }
  update(_,ms){
    if(!this._ready||this._done)return;
    var dt=ms/1000, self=this;
    if(_anyModalOpen())return;
    var k=this.keys, spd=180, vx=0, vy=0;
    if(k.LEFT.isDown||k.A.isDown){vx=-spd;this.player.dir='left';}
    if(k.RIGHT.isDown||k.D.isDown){vx=spd;this.player.dir='right';}
    if(k.UP.isDown||k.W.isDown){vy=-spd;if(!vx)this.player.dir='up';}
    if(k.DOWN.isDown||k.S.isDown){vy=spd;if(!vx)this.player.dir='down';}
    if(vx&&vy){vx*=0.707;vy*=0.707;}
    this.player.x=Phaser.Math.Clamp(this.player.x+vx*dt, 40, this.W-40);
    this.player.y=Phaser.Math.Clamp(this.player.y+vy*dt, 40, this.H-40);
    this.playerCont.setPosition(this.player.x,this.player.y);
    if(typeof _heroAnimate==='function'&&this.playerSprite){
      this.playerWalkState.dir=this.player.dir;
      _heroAnimate(this,this.playerSprite,this.playerWalkState,vx,vy,dt,(this.playerAtkTimer||0),(this.pBowTimer||0));
    }
    if(typeof _heroShieldTick==='function')_heroShieldTick(this,this.player.x,this.player.y);
    if(typeof _heroUpdateProjs==='function')_heroUpdateProjs(this,'island',dt);
    this.playerAtkTimer=Math.max(0,this.playerAtkTimer-dt);
    this.pBowTimer=Math.max(0,this.pBowTimer-dt);
    this.iFrames=Math.max(0,this.iFrames-dt);
    // Attack via SPACE
    if(Phaser.Input.Keyboard.JustDown(k.SPACE) && this.playerAtkTimer<=0){
      this._playerAttack();
    }
    // Update monsters
    this.monsters=this.monsters.filter(function(m){
      if(m.dead){
        if(!m._cleanT){m._cleanT=0.6;}
        m._cleanT-=dt;
        if(m._cleanT<=0){m.cont.destroy();return false;}
        return true;
      }
      // Chase player
      var ang=Math.atan2(self.player.y-m.y, self.player.x-m.x);
      m.x+=Math.cos(ang)*m.def.spd*dt;
      m.y+=Math.sin(ang)*m.def.spd*dt;
      m.x=Phaser.Math.Clamp(m.x,40,self.W-40); m.y=Phaser.Math.Clamp(m.y,40,self.H-40);
      m.cont.setPosition(m.x,m.y);
      m.atkTimer-=dt;
      var dist=Math.hypot(m.x-self.player.x, m.y-self.player.y);
      if(dist<m.def.r+20 && m.atkTimer<=0 && self.iFrames<=0){
        m.atkTimer=1.5;
        var dmg=Math.round(m.def.atk*(m.def.wave==='swarm'?ZDiff.cur().monDmg:ZDiff.cur().bossDmg));   // difficulty level (04g)
        var ps=self.worldScene.playerState;
        if(typeof _heroApplyShield==='function')dmg=_heroApplyShield(self,ps,dmg,self.player.x,self.player.y);
        if(dmg>0 && !ps.godMode){
          ps.hp=Math.max(0,ps.hp-dmg);
          self.iFrames=0.7;
          var ft=self.add.text(self.player.x,self.player.y-28,'-'+dmg,{fontSize:'14px',color:'#ff4444',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(20);
          self.tweens.add({targets:ft,y:ft.y-30,alpha:0,duration:800,onComplete:function(){ft.destroy();}});
          if(self.worldScene._emitUI)self.worldScene._emitUI();
          if(ps.hp<=0){self._defeat();return false;}
        } else if(dmg<=0){
          self.iFrames=0.5;
        }
      }
      return true;
    });
    // Check if ALL monsters in current wave are dead → spawn next wave
    var allDead = this.monsters.length>0 && this.monsters.every(function(m){return m.dead;});
    if(allDead || this.monsters.length===0){
      if(!this._spawning){this._spawning=true; this.time.delayedCall(1500, function(){self._spawning=false; self._spawnNext();});}
    }
  }
  _playerAttack(){
    this.playerAtkTimer=0.45;
    var self=this;
    var stats=this.worldScene.calcPlayerStats?this.worldScene.calcPlayerStats():{atk:this.ps.atk||5};
    var atk=stats.atk||5;
    var dir=this.player.dir||'right';
    var ang={right:0,left:Math.PI,down:Math.PI/2,up:-Math.PI/2}[dir]||0;
    var px=this.player.x+Math.cos(ang)*20, py=this.player.y+Math.sin(ang)*20;
    var sw=this.add.graphics().setDepth(11);
    sw.lineStyle(4,0xffaa44,0.85);
    sw.arc(px,py,30,ang-Math.PI/3,ang+Math.PI/3); sw.strokePath();
    this.tweens.add({targets:sw,alpha:0,duration:200,onComplete:function(){sw.destroy();}});
    this.monsters.forEach(function(m){
      if(m.dead)return;
      var hq=_hbP(m,self.player.x,self.player.y), d=Math.hypot(hq.x-self.player.x, hq.y-self.player.y);   // round 9: boss hurtbox
      if(d>(m._hurtR?52:70))return;
      if(d>8&&typeof _heroInArc==='function' && !_heroInArc(dir, hq.x-self.player.x, hq.y-self.player.y))return;
      m.hp-=atk;
      m.hpFill.displayWidth=m.def.r*2.2*Math.max(0,m.hp/m.maxHp);
      var ft=self.add.text(m.x,m.y-m.def.r-12,'-'+atk,{fontSize:'12px',color:'#ffdd44',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(20);
      self.tweens.add({targets:ft,y:ft.y-22,alpha:0,duration:700,onComplete:function(){ft.destroy();}});
      m.body.setFillStyle(0xffffff);
      var bRef=m.body, dRef=m.def;
      self.time.delayedCall(120,function(){if(!m.dead)bRef.setFillStyle(dRef.color);});
      if(m.hp<=0){
        m.dead=true; m.cont.setAlpha(0.3);
        showNotif('💀 '+m.def.name+' defeated!','#ffdd44');
      }
    });
  }
  _victory(){
    this._done=true;
    var ps=this.worldScene.playerState;
    if(!ps.completedQuests)ps.completedQuests=[];
    if(!ps.completedQuests.includes('volcano_lord'))ps.completedQuests.push('volcano_lord');
    ps.gold=(ps.gold||0)+2500;
    ps.xp=(ps.xp||0)+500;
    // Bestow legendary weapon (placeholder reward)
    if(!ps.inventory)ps.inventory=[];
    if(ITEMS['elemental_sovereign'] && !ps.inventory.includes('elemental_sovereign'))ps.inventory.push('elemental_sovereign');
    // Big victory banner
    var bg=this.add.rectangle(this.scale.width/2, this.scale.height/2, 480, 240, 0x000000, 0.9).setScrollFactor(0).setDepth(200);
    var t1=this.add.text(this.scale.width/2, this.scale.height/2-50, '🏆 VOLCANO LORD VANQUISHED', {fontSize:'22px',color:'#ffdd44',fontFamily:'Segoe UI',fontStyle:'bold',stroke:'#000',strokeThickness:4}).setOrigin(.5).setScrollFactor(0).setDepth(201);
    var t2=this.add.text(this.scale.width/2, this.scale.height/2, '+2500g  +500 XP  Elemental Sovereign added', {fontSize:'13px',color:'#ffaa66',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setScrollFactor(0).setDepth(201);
    var t3=this.add.text(this.scale.width/2, this.scale.height/2+60, 'TAB to return to the world', {fontSize:'11px',color:'#cccccc',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setScrollFactor(0).setDepth(201);
    if(this.worldScene._emitUI)this.worldScene._emitUI();
    if(this.worldScene._save)this.worldScene._save();
    var self=this;
    this.input.keyboard.on('keydown-TAB', function(){self._exitToWorld();});
    this.input.keyboard.on('keydown-SPACE', function(){self._exitToWorld();});
  }
  _defeat(){
    this._done=true;
    var bg=this.add.rectangle(this.scale.width/2, this.scale.height/2, 420, 150, 0x110000, 0.92).setScrollFactor(0).setDepth(200);
    this.add.text(this.scale.width/2, this.scale.height/2-18, '💀 DEFEATED', {fontSize:'22px',color:'#ff4444',fontFamily:'Segoe UI',fontStyle:'bold',stroke:'#000',strokeThickness:4}).setOrigin(.5).setScrollFactor(0).setDepth(201);
    this.add.text(this.scale.width/2, this.scale.height/2+20, 'The Volcano Lord remains…', {fontSize:'12px',color:'#cccccc',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setScrollFactor(0).setDepth(201);
    var self=this;
    this.time.delayedCall(1600,function(){ _heroDied(self); });
  }
  _exitToWorld(){
    document.getElementById('dungeon-hud').style.display='none';
    document.getElementById('hud').style.display='';
    // No mercy heal — survive on whatever HP you walk out with.
    this.scene.stop('VolcanoBossRush');
    this.scene.wake('World');
    if(this.worldScene && this.worldScene._emitUI) this.worldScene._emitUI();
  }
}


