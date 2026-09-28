// ─── BuildingScene ──────────────────────────────
const INT_W=10,INT_H=8;
class BuildingScene extends Phaser.Scene{
  constructor(){super('Building')}
  init(data){this.building=data.building;this.worldScene=data.worldScene;}
  create(){
    var type=this.building.type;
    applyTheme('celestial');
    this.cameras.main.setBackgroundColor('#1a1008');
    this.cameras.main.setZoom(2.2);
    this.cameras.main.centerOn(INT_W*TILE/2,INT_H*TILE/2);
    this._renderInterior(type);
    this._spawnPlayer();
    this._spawnNPC(type);
    this.keys=this.input.keyboard.addKeys({
      UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',
      W:'W',A:'A',S:'S',D:'D',
      TAB:Phaser.Input.Keyboard.KeyCodes.TAB
    });
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    this.interactPrompt=this.add.text(INT_W*TILE/2,INT_H*TILE/2,'',
      {fontSize:'8px',color:'#ffff88',stroke:'#000',strokeThickness:2,fontFamily:'Segoe UI',align:'center'}).setOrigin(.5).setDepth(20);
    var bnames={tavern:'🍺 Tavern',shop:'🏪 Shop',house:'🏠 Home',forge:'⚒️ Forge',guild:'📜 Guild',quest_board:'📋 Quest Board',stables:'🐎 Stables'};
    this.add.text(INT_W*TILE/2,4,bnames[type]||type,
      {fontSize:'8px',color:'#ffeecc',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5,0).setDepth(25);
    document.getElementById('hud').style.display='';
  }
  _renderInterior(type){
    var g=this.add.graphics().setDepth(0);
    var floorCol=0x4a3420,wallCol=0x2a1a0a,wallLight=0x5a3a1a;
    for(var ty=0;ty<INT_H;ty++){
      for(var tx=0;tx<INT_W;tx++){
        var isWall=tx===0||tx===INT_W-1||ty===0;
        var isBottomWall=ty===INT_H-1&&!(tx>=4&&tx<=5);
        var isDoor=ty===INT_H-1&&(tx>=4&&tx<=5);
        if(isWall||isBottomWall){
          g.fillStyle(wallCol,1).fillRect(tx*TILE,ty*TILE,TILE,TILE);
          g.fillStyle(wallLight,.5).fillRect(tx*TILE+1,ty*TILE+1,TILE-2,8);
        } else if(isDoor){
          g.fillStyle(0xa06020,1).fillRect(tx*TILE,ty*TILE,TILE,TILE);
          g.fillStyle(0xffcc44,1).fillCircle(tx*TILE+TILE/2,ty*TILE+TILE*.6,3);
        } else {
          g.fillStyle(floorCol,1).fillRect(tx*TILE,ty*TILE,TILE,TILE);
          g.fillStyle(0x3a2810,.2).fillRect(tx*TILE,ty*TILE,TILE/2,TILE/2).fillRect(tx*TILE+TILE/2,ty*TILE+TILE/2,TILE/2,TILE/2);
        }
      }
    }
    domText(this,INT_W*TILE/2,(INT_H-1)*TILE+2,'▼ Exit',{fontSize:'7px',color:'#cc9944',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5,0).setDepth(3);
    this._drawFurniture(g,type);
  }
  _drawFurniture(g,type){
    var T2=TILE,H=TILE/2;
    if(type==='tavern'){
      g.fillStyle(0x6b3a1f,1).fillRect(T2,T2,T2*3,H);g.fillStyle(0x8b5a2f,1).fillRect(T2,T2,T2*3,4);
      g.fillStyle(0x5a3010,1).fillRect(T2*6,T2*2,T2,H).fillRect(T2*7,T2*4,T2,H);
    } else if(type==='shop'){
      g.fillStyle(0x6b4020,1).fillRect(T2,T2,T2*7,T2/3);g.fillStyle(0x8b6040,1).fillRect(T2+2,T2+2,T2*7-4,4);
      g.fillStyle(0x7a4a22,1).fillRect(T2*3,T2*3,T2*3,H);
    } else if(type==='house'){
      g.fillStyle(0x4477aa,1).fillRect(T2,T2,T2*2,T2);g.fillStyle(0xffffff,.7).fillRect(T2+2,T2+2,T2*2-4,T2-4);
      g.fillStyle(0x5a3a1a,1).fillRect(T2*5,T2*2,T2*3,T2);g.fillStyle(0x8b5a1a,1).fillRect(T2*5,T2*2,T2*3,4);
    } else if(type==='forge'){
      g.fillStyle(0x444444,1).fillRect(T2*2,T2*2,T2,T2);g.fillStyle(0x666666,1).fillRect(T2*2+2,T2*2-4,T2-4,6);
      g.fillStyle(0x882200,1).fillRect(T2*5,T2,T2*2,T2*2);g.fillStyle(0xff5500,.7).fillRect(T2*5+4,T2+4,T2*2-8,T2*2-8);
    } else if(type==='guild'||type==='quest_board'){
      g.fillStyle(0x8b6020,1).fillRect(T2*2,T2,T2*5,T2*2);g.fillStyle(0xddc080,.8).fillRect(T2*2+2,T2+2,T2*5-4,T2*2-4);
    } else if(type==='stables'){
      g.fillStyle(0x5a3010,1).fillRect(T2*3,T2,4,T2*4).fillRect(T2*6,T2,4,T2*4);
      g.fillStyle(0xddb830,.7).fillRect(T2+4,T2+4,T2*2-8,T2-4).fillRect(T2*4+4,T2+4,T2*2-8,T2-4).fillRect(T2*7+4,T2+4,T2*2-8,T2-4);
    } else if(type==='armory'){
      g.fillStyle(0x556677,1).fillRect(T2,T2,T2*8,T2*.4);
      g.fillStyle(0x334455,.8).fillRect(T2*2,T2*2,T2*2,T2*3);
      g.fillStyle(0x779900,.6).fillRect(T2*5,T2,T2*.5,T2*3);
    } else if(type==='clothing'){
      g.fillStyle(0xaa5599,.6).fillRect(T2,T2*1.5,T2*8,T2*.3);
      g.fillStyle(0x884488,.4).fillRect(T2*2,T2*2,T2,T2*2.5).fillRect(T2*5,T2*2,T2,T2*2.5);
    } else if(type==='jeweler'){
      g.fillStyle(0xddaa00,.7).fillRect(T2*3,T2*2,T2*4,T2*1.5);
      g.fillStyle(0x55aaff,.5).fillCircle(T2*4,T2*3,T2*.6);
    } else if(type==='apothecary'){
      g.fillStyle(0x224422,.8).fillRect(T2,T2,T2*8,T2*.4);
      g.fillStyle(0x44aa44,.6).fillCircle(T2*3,T2*3,T2*.8).fillCircle(T2*6,T2*3,T2*.7);
    } else if(type==='merchant'){
      g.fillStyle(0xcc7722,.7).fillRect(T2,T2*2,T2*8,T2);
      g.fillStyle(0xffaa44,.5).fillRect(T2*2,T2*1,T2*5,T2*.8);
    }
  }
  _spawnPlayer(){
    var sx=(INT_W/2)*TILE,sy=(INT_H-2)*TILE+TILE/2;
    this.bx=sx;this.by=sy;this.bdir='up';
    var cont=this.add.container(sx,sy).setDepth(10);
    var body=this.add.rectangle(0,2,14,16,0x4488dd).setVisible(false);
    var head=this.add.circle(0,-9,7,0xf0c880).setVisible(false);
    var eyeL=this.add.circle(-2,-10,1.5,0x222222).setVisible(false);
    var eyeR=this.add.circle(2,-10,1.5,0x222222).setVisible(false);
    cont.add([body,head,eyeL,eyeR]);
    this.bSprite=_heroAddSprite(this,cont,12);
    this.bWalkSt=_heroNewState('up');
    this.bCont=cont;
  }
  _spawnNPC(type){
    var npcInfo={
      tavern:{icon:'🧔',name:'Bartender',color:0xcc8844},
      shop:{icon:'👝',name:'Merchant',color:0x44aacc},
      house:{icon:'🛏️',name:'(Rest here)',color:0x8888cc},
      forge:{icon:'⚒️',name:'Blacksmith',color:0xaa6622},
      guild:{icon:'📜',name:'Guild Master',color:0x8866aa},
      quest_board:{icon:'📋',name:'Quest Board',color:0x886622},
      stables:{icon:'🐴',name:'Stable Master',color:0x887744},
    };
    var info=npcInfo[type]||{icon:'👤',name:'NPC',color:0x888888};
    var nx=INT_W/2*TILE,ny=INT_H/2*TILE-TILE;
    this.npcX=nx;this.npcY=ny;
    var cont=this.add.container(nx,ny).setDepth(9);
    var chId=CHAR_NPC_FOR_BUILDING[type], chR=chId&&CHAR_BY_ID[chId];
    if(chR){ cont.add(this.add.ellipse(0,14,20,6,0x000000,.3)); this._npcSpr=CHX.sprite(this,chId,0,16,1.25); cont.add(this._npcSpr); info.name=chR.name; }
    else cont.add([this.add.ellipse(0,14,20,6,0x000000,.3),this.add.rectangle(0,2,16,18,info.color),this.add.circle(0,-11,8,0xf0c080),this.add.text(0,-11,info.icon,{fontSize:'12px',fontFamily:'serif'}).setOrigin(.5,.5)]);
    domText(this,nx,ny-(chR?34:28),info.name,{fontSize:'8px',color:'#ffeecc',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(12);
  }
  update(_,ms){
    var dt=ms/1000;
    this._movePlayer(dt);
    this._checkBuildingInteraction();
    if(this.by>(INT_H-1.2)*TILE)this._exitBuilding();
  }
  _movePlayer(dt){
    var k=this.keys,spd=100,vx=0,vy=0;
    if(k.LEFT.isDown||k.A.isDown){vx=-spd;}
    if(k.RIGHT.isDown||k.D.isDown){vx=spd;}
    if(k.UP.isDown||k.W.isDown){vy=-spd;}
    if(k.DOWN.isDown||k.S.isDown){vy=spd;}
    if(vx&&vy){vx*=.707;vy*=.707;}
    var nx=this.bx+vx*dt,ny=this.by+vy*dt;
    if(this._canGoB(nx,this.by))this.bx=nx;
    if(this._canGoB(this.bx,ny))this.by=ny;
    this.bCont.setPosition(this.bx,this.by);
    if(this.bWalkSt){
      this.bWalkSt.dir=_heroDirFromVel(vx,vy,this.bWalkSt.dir);
      this.bdir=this.bWalkSt.dir;
      _heroAnimate(this,this.bSprite,this.bWalkSt,vx,vy,dt,0,0);
    }
  }
  _canGoB(nx,ny){
    var hw=6,hh=5;
    var corners=[[nx-hw,ny-hh],[nx+hw,ny-hh],[nx-hw,ny+hh],[nx+hw,ny+hh]];
    for(var i=0;i<corners.length;i++){
      var tx=Math.floor(corners[i][0]/TILE),ty=Math.floor(corners[i][1]/TILE);
      if(tx<=0||tx>=INT_W-1)return false;
      if(ty<=0)return false;
      if(ty>=INT_H-1&&!(tx>=4&&tx<=5))return false;
    }
    return true;
  }
  _checkBuildingInteraction(){
    var nearNPC=Math.hypot(this.bx-this.npcX,this.by-this.npcY)<TILE*1.5;
    if(nearNPC){
      var acts={tavern:'[Tab] Rest — 10g',shop:'[Tab] Shop',house:'[Tab] Rest (free)',forge:'[Tab] Forge',guild:'[Tab] Quests',quest_board:'[Tab] Quests',stables:'[Tab] Mounts',armory:'[Tab] Armory',clothing:'[Tab] Clothing',jeweler:'[Tab] Jeweler',apothecary:'[Tab] Apothecary',merchant:'[Tab] Merchant'};
      this.interactPrompt.setText(acts[this.building.type]||'[Tab] Talk').setVisible(true).setPosition(this.bx,this.by-28);
      if(Phaser.Input.Keyboard.JustDown(this.keys.TAB))this._npcInteract();
    } else {
      this.interactPrompt.setVisible(false);
    }
  }
  _npcInteract(){
    var ps=this.worldScene.playerState;
    var type=this.building.type;
    if(type==='house'){
      ps.hp=ps.maxHp;showNotif('💤 Rested at home. HP fully restored!','#44ffaa');this.worldScene._emitUI();
    } else if(type==='tavern'){
      _showTavernMenu(ps,this.worldScene);
    } else if(type==='shop'){
      var sec=this.worldScene.currentSection()||0;
      openCampModal({section:Math.max(1,sec),type:'shop'},ps,this.worldScene);
    } else if(type==='forge'){
      openForgeModal(ps,this.worldScene);
    } else if(type==='guild'||type==='quest_board'){
      renderQuestList(ps.unlockedSections,ps.completedQuests,ps.activeQuest,this.worldScene);
      toggleModal('quests');
    } else if(type==='stables'){
      openMountsModal(ps,this.worldScene);
    } else if(type==='armory'||type==='clothing'||type==='jeweler'||type==='apothecary'||type==='merchant'){
      openBuildingShop(type,ps,this.worldScene);
    }
  }
  _exitBuilding(){
    document.getElementById('hud').style.display='none';
    this.scene.stop('Building');
    this.scene.wake('World',{type:'building'});
  }
}

