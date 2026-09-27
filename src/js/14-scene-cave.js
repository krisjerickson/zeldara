// ─── CaveScene — Mario-style 2D side-scrolling platformer ────────────────────
// Gravity-based, J key to jump. Multiple levels (floors) in a cave.
const CAVE_TW=200,CAVE_TH=90;  // 5× larger than the original 40×18
const CV=32;                   // cave tile size in pixels (same as TILE)
// Cave tile types
var CT={AIR:0,SOLID:1,PLATFORM:2,LADDER:3,LAVA:4,CHEST_T:5,EXIT_UP:6,EXIT_DOWN:7,BOSS_T:8};
var CAVE_COLORS={
  1:{wall:0x2a1a08,platform:0x5a3a18,bg:0x0c0806,lava:0xff4400,sky:0x080408},
  2:{wall:0x1a2a08,platform:0x3a5a18,bg:0x060c04,lava:0x44aa00,sky:0x04080a},
  3:{wall:0x3a0a02,platform:0x6a2208,bg:0x100402,lava:0xff6600,sky:0x0e0502},
  4:{wall:0x081828,platform:0x183858,bg:0x030812,lava:0x0088ff,sky:0x020810},
};

class CaveScene extends Phaser.Scene{
  constructor(){super('Cave')}
  init(d){
    this.worldScene=d.worldScene;
    this.islandScene=d.islandScene;
    this.sec=d.sec||1;
    this.floor=d.floor||0;
    this.maxFloors=d.maxFloors||4;
    this._data=d;
  }
  create(){
    var W=this.scale.width,H=this.scale.height,self=this;
    this.W=W;this.H=H;
    _heroStowMount(this);
    try{
      this.ps=this.worldScene.playerState;
      document.getElementById('dungeon-hud').style.display='block';
      this._isLastFloor=this.floor===this.maxFloors-1;
      var pal=CAVE_COLORS[this.sec]||CAVE_COLORS[1];
      // Generate cave layout
      this._tiles=this._generateCave(this.floor,this.sec);
      // Background
      this.add.rectangle(W/2,H/2,W,H,pal.sky);
      // Render cave tiles
      this._renderCave(pal);
      // Spawn player at start pos
      var sp=this._findSpawn(false);
      this._px=sp.x;this._py=sp.y;this._pvx=0;this._pvy=0;
      this._onGround=false;this._pFacing=1;
      this._pCont=this.add.container(this._px,this._py).setDepth(10);
      var pb=this.add.rectangle(0,0,14,20,0x4488dd);
      var ph=this.add.circle(0,-14,8,0xf0c880);
      var pew=this.add.rectangle(9,-2,3,14,0xcccccc);
      this._pCont.add([pb,ph,pew]);
      this._pWeap=pew;
      // Camera follows player
      this.cameras.main.setBounds(0,0,CAVE_TW*CV,CAVE_TH*CV);
      this.cameras.main.setZoom(1.6);
      this.cameras.main.startFollow(this._pCont,true,.12,.12);
      this.cameras.main.setBackgroundColor(pal.sky);
      // Monsters
      this._mons=[];this._spawnCaveMonsters(pal);
      // HUD (via dungeon-hud DOM)
      this._updateCaveHUD();
      // Attack timer, iframes
      this._atkTimer=0;this._iFrames=0;
    }catch(err){console.error('CaveScene.create error:',err);}
    // Keys MUST init outside try-catch — if anything above throws,
    // _keys would be undefined and update() would crash on k.LEFT.isDown
    this._keys=this.input.keyboard.addKeys({
      LEFT:'LEFT',RIGHT:'RIGHT',UP:'UP',DOWN:'DOWN',
      A:'A',D:'D',W:'W',S:'S',SPACE:'SPACE',
      J:Phaser.Input.Keyboard.KeyCodes.J,
      TAB:Phaser.Input.Keyboard.KeyCodes.TAB
    });
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    // Debug HUD — fixed to screen, shows live physics state
    this._dbgText=this.add.text(4,4,'',{
      fontSize:'9px',color:'#00ff88',fontFamily:'monospace',
      stroke:'#000',strokeThickness:2,lineSpacing:2
    }).setScrollFactor(0).setDepth(200);
    this._ready=true;
  }
  _generateCave(floor,sec){
    var tiles=[];
    for(var r=0;r<CAVE_TH;r++)tiles.push(new Uint8Array(CAVE_TW));
    var rng=new PRNG(WORLD_SEED^(sec*17+floor*997));
    // Solid floor and ceiling
    for(var x=0;x<CAVE_TW;x++){tiles[0][x]=CT.SOLID;tiles[CAVE_TH-1][x]=CT.SOLID;}
    // Solid walls
    for(var y=0;y<CAVE_TH;y++){tiles[y][0]=CT.SOLID;tiles[y][CAVE_TW-1]=CT.SOLID;}
    // Generate jagged floor and ceiling
    for(var x=1;x<CAVE_TW-1;x++){
      var floorH=CAVE_TH-3-Math.floor(rng.next()*3); // floor height varies 2-4 from bottom
      var ceilH=2+Math.floor(rng.next()*3); // ceiling varies
      for(var y=floorH;y<CAVE_TH-1;y++)tiles[y][x]=CT.SOLID;
      for(var y=1;y<=ceilH;y++)tiles[y][x]=CT.SOLID;
    }
    // Platforms — scaled to cave area (was 5-9 on 40×18; now ~125-225 on 200×90).
    var platCount = Math.floor(CAVE_TW * CAVE_TH / 140);
    for(var i=0;i<platCount;i++){
      var px2=rng.i(3,CAVE_TW-8),py2=rng.i(5,CAVE_TH-7);
      var pw=rng.i(4,9);
      for(var x=px2;x<px2+pw&&x<CAVE_TW-1;x++){
        if(tiles[py2][x]===CT.AIR)tiles[py2][x]=CT.PLATFORM;
      }
    }
    // Lava pits — scale with area too. Player + monsters can fall in.
    if(sec>=2){
      var lavaCount = Math.floor(CAVE_TW / 8);
      for(var i=0;i<lavaCount;i++){
        var lx=rng.i(5,CAVE_TW-10),lw=rng.i(3,7);
        for(var x=lx;x<lx+lw&&x<CAVE_TW-1;x++){
          for(var y=CAVE_TH-4;y<CAVE_TH-1;y++)tiles[y][x]=CT.LAVA;
        }
      }
    }
    // Entrance + exit at the TOP of the cave (above any ground). Player
    // drops in from the entrance and must climb / fly back up to the exit.
    var entX=3, entY=2;
    var exitX=CAVE_TW-4, exitY=2;
    // Carve out a 3-tile-high pocket around each portal so the player isn't
    // immediately crushed by ceiling tiles.
    function carvePortal(tx, ty){
      for(var dy=0; dy<=2; dy++) for(var dx=-1; dx<=1; dx++){
        var nx=tx+dx, ny=ty+dy;
        if(nx>=1 && nx<CAVE_TW-1 && ny>=1 && ny<CAVE_TH-1){
          tiles[ny][nx]=CT.AIR;
        }
      }
      // Solid floor tile right under the portal so the player can stand on it.
      if(ty+1<CAVE_TH-1) tiles[ty+1][tx]=CT.SOLID;
    }
    carvePortal(entX, entY);
    carvePortal(exitX, exitY);
    tiles[entY][entX]=CT.EXIT_UP;
    tiles[exitY][exitX]=this._isLastFloor?CT.BOSS_T:CT.EXIT_DOWN;
    this._entryTile={x:entX, y:entY};
    this._exitTile ={x:exitX, y:exitY};
    // Chests — scale with area
    var chestCount = Math.floor(CAVE_TW / 25);
    for(var i=0;i<chestCount;i++){
      var cx2=rng.i(5,CAVE_TW-5),cy2=CAVE_TH-3;
      for(var y=CAVE_TH-2;y>=3;y--){if(tiles[y][cx2]===CT.SOLID&&tiles[y-1][cx2]===CT.AIR){cy2=y-1;break;}}
      if(tiles[cy2][cx2]===CT.AIR)tiles[cy2][cx2]=CT.CHEST_T;
    }
    return tiles;
  }
  _findSpawn(fromTop){
    var tx=fromTop?this._exitTile.x:this._entryTile.x;
    // Always drop player in from the ceiling — find first open tile below ceiling
    var ceilRow=this._ceilHeight(tx);
    // Place player center in middle of that first open tile so they fall down naturally
    return{x:tx*CV+CV/2, y:ceilRow*CV+CV/2};
  }
  _renderCave(pal){
    var g=this.add.graphics().setDepth(1);
    var t=this._tiles;
    for(var y=0;y<CAVE_TH;y++){
      for(var x=0;x<CAVE_TW;x++){
        var v=t[y][x],px=x*CV,py=y*CV;
        if(v===CT.SOLID){
          g.fillStyle(pal.wall,1).fillRect(px,py,CV,CV);
          g.fillStyle(0xffffff,0.07).fillRect(px,py,CV,4);
          g.fillStyle(0x000000,0.3).fillRect(px,py+CV-3,CV,3);
        } else if(v===CT.PLATFORM){
          g.fillStyle(pal.platform,1).fillRect(px,py,CV,8);
          g.fillStyle(0xffffff,0.1).fillRect(px,py,CV,3);
        } else if(v===CT.LAVA){
          g.fillStyle(pal.lava,0.85).fillRect(px,py,CV,CV);
          g.fillStyle(0xffffff,0.15).fillRect(px,py,CV,4);
        } else if(v===CT.EXIT_DOWN||v===CT.BOSS_T){
          g.fillStyle(v===CT.BOSS_T?0x660000:0x224488,0.7).fillRect(px+4,py+4,CV-8,CV-8);
          g.lineStyle(2,v===CT.BOSS_T?0xff4444:0x44aaff,0.9).strokeRect(px+4,py+4,CV-8,CV-8);
          this.add.text(px+CV/2,py+2,v===CT.BOSS_T?'\uD83D\uDC79':'▼',{fontSize:'11px',color:v===CT.BOSS_T?'#ff4444':'#44aaff',fontFamily:'serif',stroke:'#000',strokeThickness:2}).setOrigin(.5,0).setDepth(3);
        } else if(v===CT.EXIT_UP){
          g.fillStyle(0x336600,0.6).fillRect(px+4,py+4,CV-8,CV-8);
          g.lineStyle(2,0x44ff44,0.9).strokeRect(px+4,py+4,CV-8,CV-8);
          this.add.text(px+CV/2,py+2,'▲',{fontSize:'11px',color:'#44ff44',fontFamily:'serif',stroke:'#000',strokeThickness:2}).setOrigin(.5,0).setDepth(3);
        } else if(v===CT.CHEST_T){
          g.fillStyle(0x8b5a00,1).fillRect(px+4,py+6,CV-8,CV-10);
          g.fillStyle(0xffd700,0.9).fillRect(px+4,py+6,CV-8,4);
          g.fillStyle(0xffee88,1).fillCircle(px+CV/2,py+11,2);
        }
      }
    }
    // Decorative stalagmites / stalactites
    var rng2=new PRNG(WORLD_SEED^(this.sec*31+this.floor*113));
    for(var i=0;i<12;i++){
      var dx=rng2.i(1,CAVE_TW-2)*CV+CV/2,dh=rng2.i(8,24);
      var isTop=(rng2.next()>.5);
      // find y pos from ceiling or floor
      var dy=isTop?this._ceilHeight(Math.floor(dx/CV))*CV:this._floorHeight(Math.floor(dx/CV))*CV;
      g.fillStyle(pal.wall,0.8);
      if(isTop)g.fillTriangle(dx-5,dy,dx+5,dy,dx,dy+dh);
      else g.fillTriangle(dx-5,dy,dx+5,dy,dx,dy-dh);
    }
  }
  _ceilHeight(tx){
    if(tx<0||tx>=CAVE_TW)return 0;
    for(var y=1;y<CAVE_TH;y++){if(this._tiles[y][tx]!==CT.SOLID)return y;}
    return 1;
  }
  _floorHeight(tx){
    if(tx<0||tx>=CAVE_TW)return CAVE_TH-1;
    for(var y=CAVE_TH-2;y>=0;y--){if(this._tiles[y][tx]===CT.SOLID)return y;}
    return CAVE_TH-1;
  }
  _isSolid(tx,ty){
    if(tx<0||ty<0||tx>=CAVE_TW||ty>=CAVE_TH)return true;
    var v=this._tiles[ty][tx];
    return v===CT.SOLID;
  }
  _isPlatform(tx,ty){
    if(tx<0||ty<0||tx>=CAVE_TW||ty>=CAVE_TH)return false;
    return this._tiles[ty][tx]===CT.PLATFORM;
  }
  _isLava(tx,ty){
    if(tx<0||ty<0||tx>=CAVE_TW||ty>=CAVE_TH)return false;
    return this._tiles[ty][tx]===CT.LAVA;
  }
  _spawnCaveMonsters(pal){
    var islDat=HARBOR_ISLANDS[this.sec]||HARBOR_ISLANDS[1];
    if(!islDat)return;
    var defs=islDat.enemies;
    var count=this._isLastFloor?1:4+Math.floor(Math.random()*3);
    var useDefs=this._isLastFloor?[islDat.boss]:defs;
    var self=this;
    for(var i=0;i<count;i++){
      var d=useDefs[i%useDefs.length];
      // Find platform or floor to stand on
      var mx,my,tries=0;
      do{
        var tx2=8+Math.floor(Math.random()*(CAVE_TW-14));// cols 8-33, away from entry(col 3) and exit(col 36)
        var ty2=this._floorHeight(tx2)-1;
        mx=(tx2+0.5)*CV;my=(ty2+0.5)*CV;tries++;
      }while((this._isSolid(tx2,ty2)||ty2<1)&&tries<20);
      var econt=this.add.container(mx,my-10).setDepth(9);
      var ebody=this.add.circle(0,0,d.r||11,d.col||0x884422);
      var eico=this.add.text(0,0,d.icon,{fontSize:'14px',fontFamily:'serif'}).setOrigin(.5,.5);
      var ehpBg=this.add.rectangle(0,-(d.r+10),32,5,0x000,.8);
      var ehpFill=this.add.rectangle(-16,-(d.r+10),32,5,d.boss?0xff8800:0xff3333).setOrigin(0,.5);
      var eName=this.add.text(0,-(d.r+20),d.name,{fontSize:'7px',color:'#fff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5);
      econt.add([ebody,eico,ehpBg,ehpFill,eName]);
      this._mons.push({cont:econt,body:ebody,hpFill:ehpFill,def:d,
        hp:d.hp,maxHp:d.hp,x:mx,y:my-10,dead:false,atkTimer:0,
        dir:1,groundTimer:0,vy:0,isBoss:!!d.boss});
    }
  }
  _updateCaveHUD(){
    var ps=this.ps;
    var hp=ps.hp,maxHp=ps.maxHp,pct=Math.min(1,hp/maxHp);
    var bar=document.getElementById('dng-hp-bar');
    var txt=document.getElementById('dng-hp-txt');
    var title=document.getElementById('dng-title');
    if(bar)bar.style.width=(pct*100)+'%';
    if(txt)txt.textContent='\u2764\uFE0F '+hp+'/'+maxHp;
    if(title)title.textContent=(this._isLastFloor?'\uD83D\uDC79 Boss':'Cave Floor '+(this.floor+1)+'/'+this.maxFloors)+' | \uD83D\uDCB0 '+ps.gold+'g';
  }
  update(_,ms){
    if(!this._ready)return;
    var dt=ms/1000,self=this,k=this._keys;
    var GRAV=820,JUMP_VY=-390;
    // ── Physics ──────────────────────────────────────────────────────
    this._pvx=0;
    if(k.LEFT.isDown||k.A.isDown)this._pvx=-165;
    if(k.RIGHT.isDown||k.D.isDown)this._pvx=165;
    if(this._pvx>0)this._pFacing=1;else if(this._pvx<0)this._pFacing=-1;
    if(Phaser.Input.Keyboard.JustDown(k.J)||Phaser.Input.Keyboard.JustDown(k.UP)||Phaser.Input.Keyboard.JustDown(k.W)){
      if(this._onGround){this._pvy=JUMP_VY;this._onGround=false;}
    }
    this._pvy+=GRAV*dt;
    if(this._pvy>600)this._pvy=600;
    // X movement with wall collision
    var nx=this._px+this._pvx*dt;
    var ptx=Math.floor(nx/CV),tx_r=Math.floor((nx+6)/CV),tx_l=Math.floor((nx-6)/CV);
    // pty=center row, pty2=head row, pty3=feet row — all three must be checked
    var pty=Math.floor(this._py/CV),pty2=Math.floor((this._py-18)/CV),pty3=Math.floor((this._py+10)/CV);
    if(this._pvx>0&&(this._isSolid(tx_r,pty)||this._isSolid(tx_r,pty2)||this._isSolid(tx_r,pty3)))nx=this._px;
    if(this._pvx<0&&(this._isSolid(tx_l,pty)||this._isSolid(tx_l,pty2)||this._isSolid(tx_l,pty3)))nx=this._px;
    this._px=nx;
    // Y movement with floor/ceiling collision
    var ny=this._py+this._pvy*dt;
    var ptxC=Math.floor(this._px/CV),ptxCr=Math.floor((this._px+6)/CV),ptxCl=Math.floor((this._px-6)/CV);
    // FEET_OFF=10: player container origin is center; feet are 10px below center
    var FEET_OFF=10;
    var ptyFt=Math.floor((ny-18)/CV),ptyFb=Math.floor((ny)/CV);
    // Check one pixel below feet (ny+FEET_OFF+1) so we catch the tile we're landing on
    var ptyFbNext=Math.floor((ny+FEET_OFF+1)/CV);
    // Ceiling
    if(this._pvy<0&&(this._isSolid(ptxC,ptyFt)||this._isSolid(ptxCr,ptyFt)||this._isSolid(ptxCl,ptyFt))){
      ny=this._py;this._pvy=0;
    }
    // Floor and platforms
    this._onGround=false;
    if(this._pvy>=0){
      var onFloor=this._isSolid(ptxC,ptyFbNext)||this._isSolid(ptxCr,ptyFbNext)||this._isSolid(ptxCl,ptyFbNext);
      // Platform: one-way — only land if feet were above the platform top last frame
      var onPlat=(this._isPlatform(ptxC,ptyFbNext)||this._isPlatform(ptxCr,ptyFbNext)||this._isPlatform(ptxCl,ptyFbNext))&&((this._py+FEET_OFF)%CV>(CV-10));
      if(onFloor||onPlat){
        // Snap feet to tile top: center = tileTop - FEET_OFF
        ny=ptyFbNext*CV-FEET_OFF;this._pvy=0;this._onGround=true;
      }
    }
    // Lava damage
    if(this._isLava(Math.floor(this._px/CV),Math.floor(ny/CV))){
      if(this._iFrames<=0&&!this.ps.godMode){
        this.ps.hp=Math.max(0,this.ps.hp-8);this._iFrames=0.5;
        self._floatText(this._px,ny-30,'-8 LAVA','#ff4400');
        this._updateCaveHUD();
        if(this.ps.hp<=0){this._playerDied();return;}
      }
    }
    this._py=ny;
    this._pCont.setPosition(this._px,this._py);
    this._pWeap.setScale(this._pFacing,1);
    // Bounds
    if(this._px<10)this._px=10;
    if(this._px>CAVE_TW*CV-10)this._px=CAVE_TW*CV-10;
    this._atkTimer=Math.max(0,this._atkTimer-dt);
    this._iFrames=Math.max(0,this._iFrames-dt);
    if(Phaser.Input.Keyboard.JustDown(k.SPACE))this._attackCave();
    // ── Tile interactions ─────────────────────────────────────────────
    var curTile=this._tiles[Math.floor(this._py/CV)]?this._tiles[Math.floor(this._py/CV)][Math.floor(this._px/CV)]:0;
    var nearExit=Math.hypot(this._px-((this._exitTile.x+0.5)*CV),this._py-((this._exitTile.y+0.5)*CV))<40;
    var nearEntry=Math.hypot(this._px-((this._entryTile.x+0.5)*CV),this._py-((this._entryTile.y+0.5)*CV))<40;
    if(nearExit&&Phaser.Input.Keyboard.JustDown(k.TAB)){
      if(this._isLastFloor){
        if(!this._bossDefeated){ showNotif('The guardian still guards the exit — defeat it first!','#ff6666'); }
        else this._claimCaveGuardian();
      }
      else this._goNextFloor();
    }
    if(nearEntry&&Phaser.Input.Keyboard.JustDown(k.TAB)&&this.floor>0)this._goPrevFloor();
    if(nearEntry&&Phaser.Input.Keyboard.JustDown(k.TAB)&&this.floor===0)this._exitToCave();
    // Chest interaction
    var chestTx=Math.floor(this._px/CV),chestTy=Math.floor((this._py-10)/CV);
    if((this._tiles[chestTy]||[])[chestTx]===CT.CHEST_T&&Phaser.Input.Keyboard.JustDown(k.TAB)){
      this._tiles[chestTy][chestTx]=CT.AIR;
      this._rechunkAt(chestTx,chestTy);
      var gold=15+Math.floor(Math.random()*25);this.ps.gold+=gold;
      this._floatText(this._px,this._py-30,'\uD83D\uDCE6 +'+gold+'g','#ffd700');
      this._updateCaveHUD();
    }
    // ── Monster AI (side-scroller walk-patrol) ─────────────────────────
    this._mons.forEach(function(mon){
      if(mon.dead)return;
      var ddx=self._px-mon.x,ddy=self._py-mon.y,dist=Math.hypot(ddx,ddy);
      // Gravity
      mon.vy=(mon.vy||0)+GRAV*dt;if(mon.vy>600)mon.vy=600;
      var mny=mon.y+mon.vy*dt;
      var mtx=Math.floor(mon.x/CV),mtyN=Math.floor((mny+mon.def.r)/CV);
      // Snap monster feet (center+radius) to tile top, not center to tile row
      if(self._isSolid(mtx,mtyN)){mny=mtyN*CV-mon.def.r;mon.vy=0;}
      mon.y=mny;
      // Walk toward player — NO jumping over walls. The cave monsters are
      // simple chasers: they go horizontally toward the player, and if they
      // hit a wall or a ledge they stop / turn. This is the 'lure them into
      // lava' design — letting the player exploit positioning.
      var walkSpd=mon.def.spd||50;
      if(dist<280){
        var wx3=mon.x+(ddx>0?1:-1)*walkSpd*dt;
        var wtx=Math.floor((wx3+(ddx>0?mon.def.r:-mon.def.r))/CV);
        var wty=Math.floor((mon.y-2)/CV);
        if(!self._isSolid(wtx,wty))mon.x=wx3;
        // Else: hit a wall — DON'T jump. Just stop horizontally and let
        // gravity pull straight down. (Monster might fall off a ledge here.)
      } else {
        // Patrol
        mon.dir=(mon.dir||1);
        var px3=mon.x+mon.dir*walkSpd*0.5*dt;
        var ptxM=Math.floor((px3+(mon.dir>0?mon.def.r:-mon.def.r))/CV);
        if(self._isSolid(ptxM,Math.floor((mon.y-2)/CV))||px3<CV||px3>(CAVE_TW-1)*CV){mon.dir*=-1;}
        else mon.x=px3;
      }
      // ── Lava check — drowned in lava? Mark dead, sink slowly. ───────────
      var feetTx=Math.floor(mon.x/CV), feetTy=Math.floor((mon.y+mon.def.r)/CV);
      var feetTile = (self._tiles[feetTy]||[])[feetTx];
      if(feetTile === CT.LAVA){
        // Damage over time until dead. Visual: tint red, sink.
        mon.hp -= 60*dt;
        mon.cont.setAlpha(0.6);
        mon.body.setFillStyle(0xff3300);
        if(mon.hp <= 0 && !mon.dead){
          mon.dead = true;
          self._floatText(mon.x, mon.y-20, '🌋 BURNT', '#ff4400');
          self.time.delayedCall(800, function(){ if(mon.cont) mon.cont.destroy(); });
        }
      }
      mon.cont.setPosition(mon.x,mon.y);
      // Attack
      mon.atkTimer=Math.max(0,mon.atkTimer-dt);
      if(dist<(mon.def.r||11)+24&&mon.atkTimer<=0&&self._iFrames<=0&&!self.ps.godMode){
        mon.atkTimer=1.5;
        var def3=calcStatsFromState(self.worldScene.playerState).def||0;
        var dmg=Math.max(1,mon.def.atk-def3+Math.floor(Math.random()*3-1));
        self.ps.hp=Math.max(0,self.ps.hp-dmg);
        self._iFrames=0.8;self._floatText(self._px,self._py-22,'-'+dmg,'#ff4444');
        self._updateCaveHUD();
        if(self.ps.hp<=0){self._playerDied();return;}
      }
    });
    // ── Debug HUD overlay ─────────────────────────────────────────────────
    if(this._dbgText){
      var k2=this._keys||{};
      var alv=this._mons.filter(function(m){return!m.dead;}).length;
      this._dbgText.setText([
        'X:'+Math.round(this._px)+'  Y:'+Math.round(this._py),
        'vx:'+Math.round(this._pvx)+'  vy:'+Math.round(this._pvy),
        'gnd:'+this._onGround+'  iF:'+this._iFrames.toFixed(1),
        'L:'+(k2.LEFT&&k2.LEFT.isDown?1:0)+'  R:'+(k2.RIGHT&&k2.RIGHT.isDown?1:0)+'  J:'+(k2.J&&k2.J.isDown?1:0)+'  W:'+(k2.W&&k2.W.isDown?1:0),
        'SPC:'+(k2.SPACE&&k2.SPACE.isDown?1:0)+'  atk:'+this._atkTimer.toFixed(2),
        'mons:'+alv+'/'+this._mons.length+'  fl:'+(this.floor+1)+'/'+this.maxFloors
      ].join('\n'));
    }
    this._updateCaveHUD();
  }
  _rechunkAt(tx,ty){
    // Force re-render the chunk containing this tile
    var cx=Math.floor(tx/CHUNK),cy=Math.floor(ty/CHUNK);
    // Simple: just redraw the whole scene graphics (acceptable for small cave)
    // Actually we just mark tile as air and leave the visual — chest is hidden by context
  }
  _attackCave(){
    if(this._atkTimer>0)return;
    this._atkTimer=0.38;
    var self=this,stats=calcStatsFromState(this.worldScene.playerState);
    // Swing arc effect
    var g=this.add.graphics().setDepth(15).setPosition(this._px,this._py);
    g.lineStyle(5,0x88eeff,0.3);g.arc(0,-10,26*(this._pFacing>0?1:-1),-1.2,0.5);g.strokePath();
    g.lineStyle(2,0xccffff,0.9);g.arc(0,-10,26*(this._pFacing>0?1:-1),-1.2,0.5);g.strokePath();
    this.tweens.add({targets:g,alpha:0,duration:180,onComplete:function(){g.destroy();}});
    var hit=false;
    this._mons.forEach(function(mon){
      if(mon.dead)return;
      if(Math.hypot(mon.x-self._px,mon.y-self._py)>65)return;
      if(Math.abs(mon.x-self._px)>60)return;
      var dmg=Math.max(1,stats.atk-(mon.def.def||0)+Math.floor(Math.random()*4-2));
      mon.hp-=dmg;hit=true;
      self._floatText(mon.x,mon.y-20,'-'+dmg,'#ffdd44');
      mon.body.setFillStyle(0xffffff);
      self.time.delayedCall(100,function(){if(!mon.dead)mon.body.setFillStyle(mon.def.col||0x884422);});
      mon.hpFill.displayWidth=32*Math.max(0,mon.hp/mon.maxHp);
      if(mon.hp<=0){
        mon.dead=true;mon.cont.setAlpha(0.2);
        var xp=Math.ceil(mon.def.hp*0.6),gold=5+Math.floor(Math.random()*10);
        self.ps.xp+=xp;self.ps.gold+=gold;
        self._floatText(mon.x,mon.y-36,'+'+xp+' xp +'+gold+'g','#44ffaa');
        self.worldScene._checkLevelUp(self.ps);
        if(mon.isBoss){self._bossDefeated=true;showNotif('🏆 '+mon.def.name+' defeated! The exit is open — [Tab] at the exit to claim the island.','#ffdd44');}
      }
    });
    if(!hit)this._floatText(this._px,this._py-22,'miss','#555');
  }
  _floatText(x,y,msg,col){
    var t=this.add.text(x,y,msg,{fontSize:'11px',color:col||'#fff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(30);
    this.tweens.add({targets:t,y:y-36,alpha:0,duration:1100,onComplete:function(){t.destroy();}});
  }
  _playerDied(){ if(this._dying)return; this._dying=true; _heroDied(this); }
  // Beating the cave guardian clears the island → familiar (same as the island dungeons)
  _claimCaveGuardian(){
    if(this._claimed)return; this._claimed=true;
    var ps=this.ps, sec=this.sec, g=80*sec; ps.gold+=g;
    if(!ps.inventory)ps.inventory=[]; ps.inventory.push(['gem_ruby','gem_sapphire','gem_emerald','skystone'][sec-1]||'gem_ruby');
    showNotif('+'+g+'g + gem — the island guardian is beaten!','#44ffaa');
    var isl=game.scene.getScene('Island');
    if(isl&&isl._onIslandCleared&&(game.scene.isActive('Island')||game.scene.isSleeping('Island'))){ isl._islandCleared=true; isl._onIslandCleared(); }
    else _awardIslandFamiliar(ps,sec);
    this._exitToCave();
  }
  _goNextFloor(){
    this.scene.restart({worldScene:this.worldScene,islandScene:this.islandScene,sec:this.sec,floor:this.floor+1,maxFloors:this.maxFloors});
  }
  _goPrevFloor(){
    if(this.floor===0)this._exitToCave();
    else this.scene.restart({worldScene:this.worldScene,islandScene:this.islandScene,sec:this.sec,floor:this.floor-1,maxFloors:this.maxFloors});
  }
  _exitToCave(){
    this.scene.stop('Cave');
    var islScene=game.scene.getScene('Island');
    if(islScene&&(game.scene.isActive('Island')||game.scene.isSleeping('Island'))){
      this.scene.wake('Island');
    } else {
      // Launched directly from sandbox — return to world
      this.scene.wake('World');
      document.getElementById('hud').style.display='';
      if(this.worldScene)this.worldScene._emitUI();
    }
    document.getElementById('dungeon-hud').style.display='none';
  }
}

