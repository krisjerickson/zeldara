// ─── WorldScene ─────────────────────────────────
// World labels (DOM): only write when something changed. classList.add/remove of a class that is
// already (not) there still mutates the attribute and invalidates style, so check first (a read);
// positions are cached on the element.
function _wsLblShow(el,x,y){ var l=x+'px', t=y+'px'; if(el._lblL!==l){ el._lblL=l; el.style.left=l; } if(el._lblT!==t){ el._lblT=t; el.style.top=t; }
  if(el.classList.contains('hidden'))el.classList.remove('hidden'); }
function _wsLblHide(el){ if(!el.classList.contains('hidden'))el.classList.add('hidden'); }
class WorldScene extends Phaser.Scene{
  constructor(key){super(key||'World')}   // IslandScene (13) extends this with key 'Island'
  init(d){this._newGame=!!(d&&d.newGame);}
  create(){
    this._wr=null;
    this.wd=generateWorld();
    var wd=this.wd;
    this.tiles=wd.tiles;
    this.sites=wd.sites;
    this.buildings=wd.buildings;
    // Final-quest volcano sites: pushed BEFORE the site render loop so they
    // get full visual treatment on initial scene create. (After create, the
    // dev button uses _spawnVolcanoVisuals() instead.)
    var _fps=this.playerState||{};
    if(_finalQuestUnlocked(_fps)){
      _volcanoSiteDefs().forEach(function(vs){
        if(!wd.sites.find(function(s){return s.id===vs.id;}))wd.sites.push(vs);
      });
      // Carve terrain right now so it's baked into the initial chunk render.
      _carveBigVolcanoTerrain(this);
    }

    // Dynamic chunk system
    this.activeChunks=new Map();

    // Adventure site objects
    this.siteObjs=[];
    var siteColors={dungeon:0x4422aa,tower:0x2244aa,camp:0xaa6622,harbor:0x224499,skyport:0x111833,volcano_main:0x661100,volcano_mini:0x882200};
    var siteIcons={dungeon:'⚔️',tower:'🗼',camp:'⛺',harbor:'⚓',skyport:'🎈',volcano_main:'🌋',volcano_mini:'🔥'};
    var self=this;
    wd.sites.forEach(function(s){
      var ico=_wsSiteArt(self,s);
      // DOM label (crisp HiDPI). World-space pos is tracked; per-frame
      // _updateWorldLabels() projects to screen coords.
      var lblEl=document.createElement('div');
      lblEl.className='wlbl site hidden';
      lblEl.textContent=_siteLabel(s);
      var lblHost=document.getElementById('world-labels');
      if(lblHost)lblHost.appendChild(lblEl);
      self.siteObjs.push({s:s,ico:ico,lblEl:lblEl,wx:s.tx*TILE+TILE*1.5,wy:s.ty*TILE-2});
    });

    // Building labels
    var bicons={tavern:'🍺',shop:'🛒',house:'🏠',forge:'⚒️',guild:'📜',quest_board:'📋',stables:'🐎',armory:'⚔️',clothing:'🧥',jeweler:'💍',apothecary:'🔮',merchant:'🍞'};
    var bnames={tavern:'Tavern',shop:'General Shop',house:'Home',forge:'Blacksmith',guild:'Guild',quest_board:'Quest Board',stables:'Stables',armory:'Armory',clothing:'Clothing',jeweler:'Jeweler',apothecary:'Sorcerer\'s Apothecary',merchant:'Merchant'};
    wd.buildings.forEach(function(b){
      var bcx=b.worldX+(b.w*TILE)/2, bcy=b.worldY+(b.h*TILE)/2;
      self.add.text(bcx,bcy,bicons[b.type]||'🏛',{fontSize:'22px',fontFamily:'serif'}).setOrigin(.5).setDepth(4);
      // DOM label for building name
      var bEl=document.createElement('div');
      bEl.className='wlbl building hidden';
      bEl.textContent=bnames[b.type]||b.type;
      var bHost=document.getElementById('world-labels');
      if(bHost)bHost.appendChild(bEl);
      if(!self.buildingLabels)self.buildingLabels=[];
      self.buildingLabels.push({el:bEl,wx:bcx,wy:b.worldY-6,b:b});
    });

    // Player
    this.player=this._createPlayer(wd.spawnX,wd.spawnY);
    // ── World label overlay show/hide tied to scene lifecycle ────────────
    var lblHostEl=document.getElementById('world-labels');
    if(lblHostEl){
      lblHostEl.style.display='block';
      // Sleep: hide overlay so labels don't ghost over Building/Dungeon/Island.
      this.events.on('sleep',function(){lblHostEl.style.display='none';});
      this.events.on('wake', function(){lblHostEl.style.display='block';});
      // Shutdown (full restart): tear down DOM labels so they don't accumulate.
      var _selfWS=this;
      this.events.on('shutdown',function(){
        if(_selfWS.siteObjs)_selfWS.siteObjs.forEach(function(o){if(o.lblEl&&o.lblEl.parentNode)o.lblEl.parentNode.removeChild(o.lblEl);});
        if(_selfWS.buildingLabels)_selfWS.buildingLabels.forEach(function(o){if(o.el&&o.el.parentNode)o.el.parentNode.removeChild(o.el);});
        _selfWS.siteObjs=[];_selfWS.buildingLabels=[];
        lblHostEl.style.display='none';
      });
    }
    this.cameras.main.startFollow(this.player.cont,true,.1,.1);
    this.cameras.main.setBounds(0,0,WORLD_W*TILE,WORLD_H*TILE);
    this.cameras.main.setZoom(1.4);
    this.cameras.main.centerOn(this.player.x,this.player.y);
    // Snap camera immediately to player — avoids black ocean during initial lerp pan

    // Animated flow overlay (water ripples + magma flow)
    this._flowGfx=this.add.graphics().setDepth(1);
    this._flowTime=0;

    // Ambient life system (grass sway, animals, village effects)
    this._lifeGfx=this.add.graphics().setDepth(2);
    this._lifeTime=0;
    this._animals=[];
    this._animalSpawnTimer=0;
    this._smokeEmitters=[];
    this._smokeParticles=[];
    this._laundryItems=[];
    this._torchData=[];
    this._largeAnimals=[];
    this._meatPickups=[];
    this._initVillageEffects();

    // Fog overlay objects (for locked sections)
    this.fogObjs=[];

    // Keys
    this.keys=this.input.keyboard.addKeys({
      UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',
      W:'W',A:'A',S:'S',D:'D',
      M:'M',Q:'Q',I:'I',SPACE:'SPACE',P:'P',
      SHIFT:Phaser.Input.Keyboard.KeyCodes.SHIFT,
      TAB:Phaser.Input.Keyboard.KeyCodes.TAB
    });
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    // M/B/Q/I/N/O menus and X/Z/C/P/Ctrl actions are handled globally in 24-pause-input.js

    this.playerState={
      hp:30,maxHp:30,atk:3,def:0,gold:0,level:1,xp:0,
      mana:50,maxMana:50,
      mount:null,ownedMounts:[],familiar:null,familiar2:null,familiar3:null,familiar4:null,famLevels:{},fairyKings:[],fairyQuests:{},completedIslands:[],
      unlockedSections:[1],
      equip:{lHand:'wooden_sword',rHand:null,mWeapon:null,body:null,shield:null,head:null,feet:null,pants:null,gauntlets:null,ring1:null,ring2:null,ring3:null,ring4:null,ring5:null,ring6:null,ring7:null,ring8:null,ring9:null,ring10:null,neck:null,back:null,spell:null,special:null},
      inventory:[],
      ammo:{},
      activeQuest:null,completedQuests:[],
      exploredGrid:new Uint8Array(EXP_W*EXP_H),
      dungeonFog:{},
      godMode:false
    ,
    ownedFamiliars:[],
    skills:[],lockedSites:[]  };
    if(!this._newGame)this._loadSave();
    villageApply(this.wd,villageStageOf(this.playerState));   // the village at its current stage (grows as craftsmen are freed)
    this._refreshVillageNPCs();
    this._villageFolkInit();
    this._initTravel();
    this._runicInit();
    this._initWorldMonsters();
    this._updateFog();
    this._revealFog();
    this._initWorldFog();
    this._emitUI();
    this._interactPrompt=null;
    this.worldAtkTimer=0;this.worldBowTimer=0;
    this.worldIFrames=0;
    this._worldSleepTime=0;

    var sceneRef=this;
    this.events.on('sleep',function(){
      sceneRef._worldSleepTime=Date.now();
      sceneRef._hideWorldFog(); // hide fog canvas while in dungeon
      var zb=document.getElementById('zone-banner'); if(zb)zb.style.visibility='hidden';
      // Clean up meat pickups on sleep so they don't float when we return
      if(sceneRef._meatPickups){
        sceneRef._meatPickups.forEach(function(mp){
          if(mp.glow)mp.glow.destroy();
          if(mp.label)mp.label.destroy();
        });
        sceneRef._meatPickups=[];
      }
    });
    this.events.on('wake',function(_,data){
      _heroRestoreMount(sceneRef);
      document.getElementById('hud').style.display='';
      document.getElementById('dungeon-hud').style.display='none';
      sceneRef._initWorldFog(); // re-init fog canvas on return from dungeon
      var zb2=document.getElementById('zone-banner'); if(zb2)zb2.style.visibility='';
      sceneRef._worldFogDirty=true;
      var elapsed=Date.now()-(sceneRef._worldSleepTime||0);
      // Reset overworld monster HP to full when player returns
      if(sceneRef.worldMonsters)sceneRef.worldMonsters.forEach(function(mon){
        if(!mon.dead){
          mon.hp=mon.maxHp;
          if(mon.hpFill)mon.hpFill.displayWidth=28;
          mon.state='wander';mon.atkTimer=2;
          if(mon._md)mon._md={};
        }
      });
      // If away >60s, respawn 30% of dead overworld monsters
      if(elapsed>60000&&sceneRef.worldMonsters){
        var dead=sceneRef.worldMonsters.filter(function(m){return m.dead;});
        var toRevive=Math.ceil(dead.length*0.3);
        for(var ri=0;ri<toRevive;ri++){
          var rm=dead[ri];
          rm.dead=false;rm.hp=rm.maxHp;rm.state='wander';rm.atkTimer=2;
          if(rm._md)rm._md={};
          if(rm.cont)rm.cont.setActive(true).setVisible(true);
          if(rm.hpFill)rm.hpFill.displayWidth=28;
        }
        if(toRevive>0)showNotif('⚠️ Monsters have respawned while you were away!','#ff6644');
      }
      sceneRef._cancelHomeCast(false); // ensure overlay is hidden on return
      sceneRef._lastThemeSec=null; // force theme re-apply on section detection
      sceneRef._refreshVillageNPCs();
      sceneRef._updateFog();sceneRef._emitUI();sceneRef._save();
    });
    // paint the chunks on screen before the first frame (the rest stream in)
    // pattern tiles for the ground around the hero (and the village) now; the rest are made lazily
    // (chunk jobs make them on demand, _updateChunks warms the next ring while idle — 05c/10c)
    _wpWarmNear(this.wd,this.player.x,this.player.y,1); _wpWarmNear(this.wd,CENTER_X*TILE,CENTER_Y*TILE,1);
    this._updateChunks(true);
    this._ready=true;
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
    var mountLbl=this.add.text(0,-30,'',{fontSize:'18px',fontFamily:'serif'}).setOrigin(.5);
    var nameLbl=this.add.text(0,-40,'Hero',{fontSize:'9px',color:'#fff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setVisible(false);
    var sprite=this.add.image(0,14,this.textures.exists('hero_front_0')?'hero_front_0':'__DEFAULT')
      .setOrigin(.5,1).setDisplaySize(25,42);
    cont.add([shadow,legs,body,head,eyeL,eyeR,weapon,sprite,mountLbl,nameLbl]);
    return{cont:cont,body:body,head:head,eyeL:eyeL,eyeR:eyeR,weapon:weapon,mountLbl:mountLbl,nameLbl:nameLbl,sprite:sprite,x:x,y:y,dir:'down',_bobPhase:0,_walkFrame:0,_walkTimer:0,_wasMoving:false,_lastSet:null};
  }

  update(_,ms){
    if(!this.player||!this.player.cont||!this.player.cont.scene)return;
    var dt=ms/1000;
    this._updateChunks();
    if(!_gameBlocked())this._movePlayer(dt);
    // Pause all world simulation when any modal is open (inventory, map, etc.)
    if(!_anyModalOpen()){
      this._updateWorldMonsters(dt);
      this._updateSpells(dt);
      this._updateBogPatches(dt);
      this._updateSpecials(dt);
    }
    this._checkInteraction();
    this._tickTravel(dt);
    this._villageFolkTick(dt);
    this._campTick(dt);
    this._fairyTick(dt);
    this._parkedTick(dt);
    this._runicTick(dt);
    this._updateSiteLabels();
    this._revealFog();
    this._drawWorldFog();
    this._emitUI();
    this._wrTick(dt);
    this._updateLife(dt);
    this._updateLargeAnimals(dt);
    this._updateLavaAndBurn(dt);
    this.worldAtkTimer=Math.max(0,(this.worldAtkTimer||0)-dt);
    this.worldBowTimer=Math.max(0,(this.worldBowTimer||0)-dt);
    this.worldIFrames=Math.max(0,(this.worldIFrames||0)-dt);
    // Homecast tick (must come after worldIFrames is decayed, before hit flag reset)
    this._tickHomeCast(dt);
    this._homeCastHit=false; // reset hit flag each frame
    // Familiars (auto-attack + visual orbit) — generic helper, works in any scene
    // Mana regen (4 base + up to +4 from items, capped at 8 total)
    var ps2=this.playerState;
    if(ps2.mana<ps2.maxMana){var _mr=this.calcPlayerStats().manaRegen||0;ps2.mana=Math.min(ps2.maxMana,ps2.mana+(4+_mr)*dt);}
    // Player projectiles and spell effects
    this._updatePlayerProj(dt);
    this._updateSpellClouds(dt);
    if(!this._saveTimer)this._saveTimer=0;
    this._saveTimer+=dt;
    if(this._saveTimer>30){this._saveTimer=0;this._save();}
  }

  // ─── Village Effects Init ──────────────────────────────────────────────────
  _initVillageEffects(){
    var self=this;
    if(!this.wd||!this.wd.buildings)return;
    var chimneySet={tavern:true,forge:true,house:true,armory:true};
    this.wd.buildings.forEach(function(b){
      if(chimneySet[b.type]){
        self._smokeEmitters.push({
          x:b.worldX+(b.w-1)*TILE+TILE*.6,
          y:b.worldY-4,
          timer:Math.random()*1.5,
          interval:b.type==='forge'?0.32:0.75,
          thick:b.type==='forge',
        });
      }
    });
    // Laundry line between house and tavern
    var tav=null;
    this.wd.buildings.forEach(function(b){if(b.type==='tavern')tav=b;});
    if(tav){
      var lx=tav.worldX+TILE,ly=tav.worldY+TILE*.4;
      [0xcc4444,0x4488cc,0xccaa44,0x88cc44,0xcc88aa,0xffffff].forEach(function(col,i){
        self._laundryItems.push({x:lx+i*14,y:ly,col:col,phase:i*0.7+Math.random(),amp:2+i%3});
      });
    }
    // Two torches flanking each DOOR tile
    var vx=CENTER_X,vy=CENTER_Y;
    for(var dy=-VILLAGE_RADIUS;dy<=VILLAGE_RADIUS;dy++){
      for(var dx=-VILLAGE_RADIUS;dx<=VILLAGE_RADIUS;dx++){
        var ttx=vx+dx,tty=vy+dy;
        if(ttx>=0&&tty>=0&&ttx<WORLD_W&&tty<WORLD_H&&this.tiles[tty]&&this.tiles[tty][ttx]===T.DOOR){
          this._torchData.push({x:ttx*TILE+TILE*.25,y:tty*TILE,ph:Math.random()*Math.PI*2});
          this._torchData.push({x:ttx*TILE+TILE*.75,y:tty*TILE,ph:Math.random()*Math.PI*2+1.5});
        }
      }
    }
  }

  // ─── Ambient Life Update ───────────────────────────────────────────────────
  _updateLife(dt){
    if(!this._lifeGfx)return;
    this._lifeTime=(this._lifeTime||0)+dt;
    var t=this._lifeTime;
    var g=this._lifeGfx;
    g.clear();
    var cam=this.cameras.main;
    var wv=cam.worldView;
    var plx=this.player?this.player.x:CENTER_X*TILE;
    var ply=this.player?this.player.y:CENTER_Y*TILE;
    var txMin=Math.max(0,Math.floor(wv.x/TILE)-1);
    var txMax=Math.min(WORLD_W-1,Math.ceil((wv.x+wv.width)/TILE)+1);
    var tyMin=Math.max(0,Math.floor(wv.y/TILE)-1);
    var tyMax=Math.min(WORLD_H-1,Math.ceil((wv.y+wv.height)/TILE)+1);

    // ── Grass blade sway (off: the Lab-painted ground has its own blades) ──
    for(var sty=tyMin;sty<=tyMax&&false;sty++){
      for(var stx=txMin;stx<=txMax;stx++){
        var stv=this.tiles[sty]?this.tiles[sty][stx]:T.OCEAN;
        if(stv===T.GRASS||stv===T.GRASS2||stv===T.DRY_GRASS){
          var swx=stx*TILE,swy=sty*TILE;
          var w1=Math.sin(t*1.8+stx*0.55+sty*0.38)*2.4;
          var w2=Math.sin(t*2.2+stx*0.38+sty*0.55+1.1)*2.0;
          var bAlpha=(stv===T.DRY_GRASS)?0.22:0.16;
          g.fillStyle(0xffffff,bAlpha);
          [[3,20],[11,8],[19,23],[26,13]].forEach(function(b,bi){
            g.fillRect(swx+b[0]+Math.round(bi%2===0?w1:w2),swy+1,1,5);
          });
        }
      }
    }

    // ── Village smoke ─────────────────────────────────────
    var self=this;
    if(this._smokeEmitters){
      this._smokeEmitters.forEach(function(em){
        em.timer-=dt;
        if(em.timer<=0){
          em.timer=em.interval*(0.8+Math.random()*0.4);
          var spd=em.thick?18:12;
          self._smokeParticles.push({
            x:em.x+(Math.random()-0.5)*5,y:em.y,
            vy:-(spd+Math.random()*6),vx:(Math.random()-0.5)*3,
            r:em.thick?4.5:2.5,alpha:em.thick?0.52:0.44,age:0
          });
        }
      });
      this._smokeParticles=this._smokeParticles.filter(function(sp){
        sp.age+=dt;sp.x+=sp.vx*dt;sp.y+=sp.vy*dt;
        sp.r+=dt*3.5;sp.alpha-=dt*0.20;
        if(sp.alpha<=0)return false;
        g.fillStyle(0xaaaaaa,Math.min(sp.alpha,0.5)).fillCircle(Math.round(sp.x),Math.round(sp.y),Math.round(sp.r));
        return true;
      });
    }

    // ── Laundry ───────────────────────────────────────────
    if(this._laundryItems&&this._laundryItems.length){
      var li0=this._laundryItems[0],liN=this._laundryItems[this._laundryItems.length-1];
      g.lineStyle(1,0x888888,0.30);
      g.beginPath();g.moveTo(li0.x-7,li0.y-4);g.lineTo(liN.x+7,liN.y-4);g.strokePath();
      this._laundryItems.forEach(function(li){
        var dx=Math.sin(t*1.4+li.phase)*li.amp;
        // Peg
        g.fillStyle(0x886644,0.7).fillRect(Math.round(li.x+dx-1),Math.round(li.y-6),2,3);
        // Cloth
        g.fillStyle(li.col,0.78).fillRect(Math.round(li.x+dx-5),Math.round(li.y-3),10,8);
        // Bottom hem shadow
        g.fillStyle(0x000000,0.10).fillRect(Math.round(li.x+dx-5),Math.round(li.y+4),10,2);
      });
    }

    // ── Door torches ──────────────────────────────────────
    if(this._torchData){
      this._torchData.forEach(function(tc){
        var flk=Math.sin(t*11+tc.ph)*0.14+Math.sin(t*7+tc.ph*1.6)*0.09;
        var sz=4.5+flk*3;
        // Bracket
        g.fillStyle(0x7a6040,0.8).fillRect(Math.round(tc.x-1),Math.round(tc.y-12),2,8);
        // Outer glow
        g.fillStyle(0xff8800,0.14+flk*0.08).fillCircle(Math.round(tc.x),Math.round(tc.y-14),Math.round(sz+4));
        // Flame (orange)
        g.fillStyle(0xff8800,0.78+flk*0.15).fillEllipse(Math.round(tc.x),Math.round(tc.y-14),Math.round(sz),Math.round(sz*1.55));
        // Core (yellow)
        g.fillStyle(0xffee44,0.88+flk*0.08).fillEllipse(Math.round(tc.x),Math.round(tc.y-15),Math.round(sz*0.48),Math.round(sz*0.85));
      });
    }

    // ── Animal pool management ────────────────────────────
    this._animalSpawnTimer=(this._animalSpawnTimer||0)-dt;
    if(this._animalSpawnTimer<=0){
      this._animalSpawnTimer=4.0+Math.random()*2.5;
      this._trySpawnAnimal(plx,ply);
    }
    this._animals=this._animals.filter(function(a){
      if(Math.hypot(a.x-plx,a.y-ply)>14*TILE)return false;
      self._tickAnimal(a,dt,plx,ply);
      if(a.state==='gone')return false;
      self._drawAnimal(g,a,t);
      return true;
    });
  }

  // ─── Animal Spawn ─────────────────────────────────────────────────────────
  _trySpawnAnimal(plx,ply){
    if(this._animals.length>=8)return;
    var self=this;
    for(var att=0;att<10;att++){
      var ang=Math.random()*Math.PI*2;
      var dist=(6+Math.random()*5)*TILE;
      var ax=Math.round((plx+Math.cos(ang)*dist)/TILE);
      var ay=Math.round((ply+Math.sin(ang)*dist)/TILE);
      if(ax<1||ay<1||ax>=WORLD_W-1||ay>=WORLD_H-1)continue;
      var tv=this.tiles[ay]?this.tiles[ay][ax]:T.OCEAN;
      var sec=getTileSection(ax,ay);
      if(sec===0)continue;
      var type=this._animalFor(tv,sec);
      if(!type)continue;
      var crowded=this._animals.some(function(a){return Math.hypot(a.x-ax*TILE,a.y-ay*TILE)<TILE*2;});
      if(crowded)continue;
      this._animals.push({type:type,x:ax*TILE+TILE/2+(Math.random()-.5)*TILE*.4,y:ay*TILE+TILE/2+(Math.random()-.5)*TILE*.4,state:'idle',timer:1+Math.random()*3,vx:0,vy:0,ph:Math.random()*Math.PI*2,sec:sec});
      break;
    }
  }
  _animalFor(tv,sec){
    var m={};
    m[T.GRASS]=(sec===1?'rabbit':(sec===2?'frog':null));
    m[T.GRASS2]=(sec===1?'rabbit':(sec===2?'frog':null));
    m[T.FLOWER]=(sec===1?'butterfly':null);
    m[T.SHALLOW_WATER]=(sec===2?'heron':null);
    m[T.LILY]=(sec===2?'frog':null);
    m[T.REED]=(sec===2?'frog':null);
    m[T.ROCKY_GROUND]=(sec===3?'lizard':null);
    m[T.GRAVEL]=(sec===3?'lizard':null);
    m[T.LARGE_BOULDER]=(sec===3?'goat':null);
    m[T.SMALL_BOULDER]=(sec===3?'goat':null);
    m[T.DEEP_MAGMA]=(sec===4?'fire_imp':null);
    m[T.THIN_MAGMA]=(sec===4?'fire_imp':null);
    m[T.DARK_ROCK]=(sec===4?'ash_crow':null);
    m[T.ASH_GROUND]=(sec===4?'ash_crow':null);
    return m[tv]||null;
  }

  // ─── Animal Tick ──────────────────────────────────────────────────────────
  _tickAnimal(a,dt,plx,ply){
    var fleeRanges={rabbit:3.5,butterfly:2.5,heron:4.5,frog:3,lizard:3.5,goat:4.5,fire_imp:4,ash_crow:5};
    var wanderSpd={rabbit:35,butterfly:32,heron:22,frog:45,lizard:52,goat:55,fire_imp:55,ash_crow:45};
    var fleeSpd={rabbit:145,butterfly:95,heron:105,frog:125,lizard:165,goat:170,fire_imp:125,ash_crow:140};
    var fr=(fleeRanges[a.type]||4)*TILE;
    var dist=Math.hypot(a.x-plx,a.y-ply);
    a.ph+=dt*3;
    if(a.state!=='flee'&&dist<fr){
      a.state='flee';a.timer=1.8+Math.random()*1.5;
      var fAng=Math.atan2(a.y-ply,a.x-plx)+(Math.random()-.5)*0.6;
      var fs=fleeSpd[a.type]||130;
      a.vx=Math.cos(fAng)*fs;a.vy=Math.sin(fAng)*fs;
    }
    if(a.state==='flee'){
      a.x+=a.vx*dt;a.y+=a.vy*dt;a.timer-=dt;
      if(a.timer<=0)a.state='gone';
    } else if(a.state==='wander'){
      a.x+=a.vx*dt;a.y+=a.vy*dt;a.timer-=dt;
      if(a.timer<=0){a.state='idle';a.timer=1.5+Math.random()*2.5;a.vx=0;a.vy=0;}
    } else {
      a.timer-=dt;
      if(a.timer<=0){
        a.state='wander';a.timer=0.8+Math.random()*1.8;
        var wa=Math.random()*Math.PI*2;var ws=wanderSpd[a.type]||38;
        a.vx=Math.cos(wa)*ws;a.vy=Math.sin(wa)*ws;
      }
    }
  }

  // ─── Animal Draw ──────────────────────────────────────────────────────────
  _drawAnimal(g,a,t){
    var x=Math.round(a.x),y=Math.round(a.y);
    var fl=(a.state==='flee');
    var ph=a.ph;
    switch(a.type){
      case 'rabbit':{
        // Body
        g.fillStyle(fl?0xf0e8e0:0xe0d8cc,0.88).fillEllipse(x,y+3,10,7);
        // Head
        g.fillStyle(fl?0xf0e8e0:0xe0d8cc,0.90).fillCircle(x+(fl?3:0),y-2,4.5);
        // Ears — upright idle, laid flat fleeing
        g.fillStyle(0xddd0c8,0.85);
        if(fl){g.fillRect(x+2,y-7,2,4).fillRect(x+4,y-6,2,4);}
        else{g.fillRect(x-3,y-9,2,7).fillRect(x+1,y-9,2,7);}
        // Inner ear pink
        g.fillStyle(0xff9999,0.45);
        if(fl){g.fillRect(x+3,y-6,1,3);}else{g.fillRect(x-2,y-8,1,5).fillRect(x+2,y-8,1,5);}
        // Eye
        g.fillStyle(0x882222,1).fillCircle(x+(fl?5:2),y-3,1.5);
        // Nose
        g.fillStyle(0xcc6666,1).fillCircle(x+(fl?7:3),y-1,1);
        // Tail
        g.fillStyle(0xffffff,0.88).fillCircle(x+(fl?-5:5),y+3,2.5);
        // Hop bob when idle
        if(!fl){var bob=Math.abs(Math.sin(t*4+ph))*2;g.fillStyle(0xe0d8cc,0.88).fillEllipse(x,y+3-bob,10,7);}
        break;}
      case 'butterfly':{
        var flap=Math.sin(t*(fl?22:9)+ph)*5.5;
        // Wings
        g.fillStyle(fl?0xff6622:0xff9933,0.72);
        g.fillTriangle(x-2,y,x-11,y-4+flap,x-10,y+3-flap);
        g.fillTriangle(x-2,y,x-9,y-6+flap*.7,x-3,y+5);
        g.fillTriangle(x+2,y,x+11,y-4+flap,x+10,y+3-flap);
        g.fillTriangle(x+2,y,x+9,y-6+flap*.7,x+3,y+5);
        // Wing spots
        g.fillStyle(0x772200,0.55).fillCircle(x-6,y,1.5).fillCircle(x+6,y,1.5);
        // Body
        g.fillStyle(0x331100,0.90).fillRect(x-1,y-4,2,8);
        // Antenna dots
        g.fillStyle(0x441100,0.85).fillCircle(x-4,y-9,1.5).fillCircle(x+4,y-9,1.5);
        g.fillStyle(0x441100,0.5).fillRect(x-1,y-4,1,5).fillRect(x,y-4,1,5);
        break;}
      case 'heron':{
        if(fl){
          // Wings spread open in flight
          g.fillStyle(0xeeeeee,0.88);
          g.fillTriangle(x,y-2,x-20,y-8,x-16,y+5);
          g.fillTriangle(x,y-2,x+20,y-8,x+16,y+5);
          g.fillEllipse(x,y-2,12,7);
          // Head + neck
          g.fillStyle(0xeeeeee,0.88).fillRect(x+4,y-10,4,10).fillCircle(x+6,y-11,4);
          g.fillStyle(0x222222,0.8).fillRect(x+4,y-14,4,3);
          g.fillStyle(0xddaa00,0.9).fillRect(x+9,y-13,8,2);
        }else{
          // Standing — long legs, S-curved neck
          g.fillStyle(0xd49060,0.85).fillRect(x-3,y+5,2,12).fillRect(x+1,y+5,2,12);
          g.fillStyle(0xeeeeee,0.92).fillEllipse(x,y,13,8);
          g.fillStyle(0xeeeeee,0.90).fillRect(x+3,y-9,4,9).fillCircle(x+6,y-11,4.5);
          g.fillStyle(0x222222,0.82).fillRect(x+4,y-14,4,3);
          g.fillStyle(0xddaa00,0.92).fillRect(x+9,y-12,9,2);
          // Wing fold
          g.fillStyle(0xd8d8d8,0.38).fillRect(x-4,y,12,4);
          // Slow wading bob
          var hbob=Math.sin(t*1+ph)*1;
          g.fillStyle(0xeeeeee,0.0).fillEllipse(x,y+hbob,13,8);
        }
        break;}
      case 'frog':{
        var fbob=fl?0:Math.sin(t*1.8+ph)*1.5;
        // Body blob
        g.fillStyle(fl?0x55cc55:0x44aa44,0.90).fillEllipse(x,y+2+fbob,13,9);
        // Bulging eyes
        g.fillStyle(0x55cc55,1).fillCircle(x-4,y-3+fbob,3.5).fillCircle(x+4,y-3+fbob,3.5);
        g.fillStyle(0x111111,0.9).fillCircle(x-4,y-4+fbob,1.5).fillCircle(x+4,y-4+fbob,1.5);
        // Mouth line (two small rects)
        g.fillStyle(0x228822,0.6).fillRect(x-3,y+2+fbob,3,1).fillRect(x+1,y+2+fbob,3,1);
        // Back legs
        if(fl){g.fillStyle(0x339933,0.80).fillRect(x-9,y+3,5,4).fillRect(x+4,y+3,5,4);}
        else{g.fillStyle(0x339933,0.75).fillRect(x-7,y+4+fbob,4,4).fillRect(x+3,y+4+fbob,4,4);}
        break;}
      case 'lizard':{
        var ld=(a.vx>=0||fl)?1:-1;
        // Tail (triangle behind)
        g.fillStyle(0x9a7858,0.82).fillTriangle(x-ld*7,y+2,x-ld*18,y+1,x-ld*9,y+5);
        // Body
        g.fillStyle(fl?0xb09070:0x9a7858,0.90).fillEllipse(x,y+1,18,7);
        // Head
        g.fillStyle(0xaa8865,0.90).fillEllipse(x+ld*8,y,8,5);
        // Legs (4 stubs)
        g.fillStyle(0x887050,0.80).fillRect(x-4,y+3,2,5).fillRect(x+2,y+3,2,5).fillRect(x-6,y+3,2,4).fillRect(x+4,y+3,2,4);
        // Eye
        g.fillStyle(0xcc8800,1).fillCircle(x+ld*10,y-1,1.5);
        g.fillStyle(0x111111,0.9).fillCircle(x+ld*10,y-1,0.8);
        // Tongue flick when idle
        if(!fl&&Math.sin(t*5+ph)>0.75){
          g.fillStyle(0xff4444,0.90).fillRect(x+ld*13,y,3,1);
          g.fillStyle(0xff2222,0.85).fillRect(x+ld*15,y-1,1,1).fillRect(x+ld*15,y+1,1,1);
        }
        break;}
      case 'goat':{
        var gd=(a.vx>=0||fl)?1:-1;
        // Shadow
        g.fillStyle(0x000000,0.11).fillEllipse(x,y+12,18,5);
        // Legs
        g.fillStyle(0xd0c8b8,0.88).fillRect(x-7,y+4,3,9).fillRect(x-2,y+4,3,9).fillRect(x+3,y+4,3,9);
        // Hooves
        g.fillStyle(0x3a3228,0.85).fillRect(x-7,y+12,3,2).fillRect(x-2,y+12,3,2).fillRect(x+3,y+12,3,2);
        // Body
        g.fillStyle(0xe0d8c8,0.93).fillEllipse(x,y+2,20,10);
        // Neck + head
        g.fillStyle(0xd8d0c0,0.92).fillRect(x+gd*5,y-5,5,8).fillEllipse(x+gd*9,y-8,9,7);
        // Horns
        g.fillStyle(0x888870,0.90).fillRect(x+gd*7,y-14,2,6).fillRect(x+gd*11,y-13,2,5);
        // Eye
        g.fillStyle(0x442200,1).fillCircle(x+gd*11,y-9,1.5);
        // Beard
        g.fillStyle(0xd8d0c0,0.65).fillTriangle(x+gd*10,y-4,x+gd*8,y-1,x+gd*12,y-1);
        break;}
      case 'fire_imp':{
        var bob2=Math.sin(t*4+ph)*3;
        var gs=5.5+Math.sin(t*6+ph)*1.2;
        // Glow
        g.fillStyle(0xff4400,0.13+Math.sin(t*3+ph)*0.04).fillCircle(x,y+bob2,Math.round(gs+7));
        // Body teardrop
        g.fillStyle(0xff5500,0.92).fillEllipse(x,y+3+bob2,10,14);
        // Head
        g.fillStyle(0xff7733,0.95).fillCircle(x,y-3+bob2,6);
        // Horns
        g.fillStyle(0xcc2200,0.90);
        g.fillTriangle(x-4,y-7+bob2,x-8,y-15+bob2,x-2,y-8+bob2);
        g.fillTriangle(x+4,y-7+bob2,x+8,y-15+bob2,x+2,y-8+bob2);
        // Eyes
        g.fillStyle(0xffee44,1).fillCircle(x-2,y-4+bob2,2).fillCircle(x+2,y-4+bob2,2);
        g.fillStyle(0x660000,0.9).fillCircle(x-2,y-4+bob2,1).fillCircle(x+2,y-4+bob2,1);
        // Wing-arms
        g.fillStyle(0xdd3300,0.72);
        g.fillTriangle(x-5,y+bob2,x-15,y-4+bob2,x-6,y+7+bob2);
        g.fillTriangle(x+5,y+bob2,x+15,y-4+bob2,x+6,y+7+bob2);
        // Tail spark
        g.fillStyle(0xffcc00,0.85).fillCircle(x+Math.round(Math.sin(t*5+ph)*4),y+9+bob2,2.5);
        break;}
      case 'ash_crow':{
        if(fl){
          // Taking flight — wings wide
          g.fillStyle(0x282828,0.90);
          g.fillTriangle(x,y-2,x-20,y-10,x-14,y+4);
          g.fillTriangle(x,y-2,x+20,y-10,x+14,y+4);
          g.fillEllipse(x,y,10,7);
          g.fillStyle(0x333333,0.75).fillRect(x-3,y-12,6,12).fillCircle(x,y-12,5);
          g.fillStyle(0x555544,0.88).fillTriangle(x+4,y-14,x+4,y-12,x+9,y-13);
        }else{
          // Perched and watching — occasional wing shuffle
          var wsh=Math.sin(t*0.7+ph)*0.4;
          g.fillStyle(0x282828,0.90).fillEllipse(x,y+2,14,9);
          g.fillStyle(0x323232,0.88).fillCircle(x,y-4,5);
          // Beak
          g.fillStyle(0x555544,0.90).fillTriangle(x+4,y-5,x+4,y-3,x+10,y-4);
          // Eye (piercing silver)
          g.fillStyle(0xb0b0a8,1).fillCircle(x+2,y-5,1.8);
          g.fillStyle(0x111111,0.92).fillCircle(x+2,y-5,0.9);
          // Talons
          g.fillStyle(0x333322,0.82).fillRect(x-3,y+6,2,5).fillRect(x+1,y+6,2,5);
          // Wing fold shadow
          g.fillStyle(0x1e1e1e,0.45).fillRect(x-5,y,14,4);
          // Ash dust shimmer
          g.fillStyle(0x888888,0.12+wsh*0.06).fillEllipse(x,y+2,12,6);
        }
        break;}
    }
  }

  // ─── Large Huntable Animals ────────────────────────────────────────────────
  _initLargeAnimals(){
    var LADEFS={
      deer:        {name:'Deer',        icon:'🦌',hp:20, atk:5, r:14,spd:90, sec:1,color:0xc87040,fleeR:200,safeType:T.DEEP_WATER},
      boar:        {name:'Wild Boar',   icon:'🐗',hp:25, atk:14,r:16,spd:75, sec:1,color:0x704830,fleeR:160,safeType:T.SMALL_BOULDER},
      crocodile:   {name:'Crocodile',   icon:'🐊',hp:40, atk:16,r:18,spd:65, sec:2,color:0x2a6820,fleeR:180,safeType:T.DEEP_WATER},
      swamp_bear:  {name:'Swamp Bear',  icon:'🐻',hp:50, atk:20,r:18,spd:70, sec:2,color:0x3a2818,fleeR:140,safeType:T.SHALLOW_WATER},
      highland_ram:{name:'Highland Ram',icon:'🐏',hp:60, atk:12,r:15,spd:90, sec:3,color:0xa89878,fleeR:190,safeType:T.LARGE_BOULDER},
      cave_bear:   {name:'Cave Bear',   icon:'🐻',hp:72, atk:22,r:18,spd:60, sec:3,color:0x584838,fleeR:130,safeType:T.LARGE_BOULDER},
      lava_wyrm:   {name:'Lava Wyrm',   icon:'🦎',hp:80, atk:24,r:16,spd:80, sec:4,color:0xcc4400,fleeR:150,safeType:T.DEEP_MAGMA},
      ash_titan:   {name:'Ash Titan',   icon:'🦍',hp:92, atk:26,r:20,spd:55, sec:4,color:0x4a3028,fleeR:120,safeType:T.OBSIDIAN},
    };
    this._largeAnimalDefs=LADEFS;
    var rng=new PRNG(WORLD_SEED+55555);
    var secPairs={1:['deer','boar'],2:['crocodile','swamp_bear'],3:['highland_ram','cave_bear'],4:['lava_wyrm','ash_titan']};
    for(var sec=1;sec<=4;sec++){
      var types=secPairs[sec];
      for(var ti=0;ti<types.length;ti++){
        for(var ci=0;ci<8;ci++){  // 8 of each type per region = 16 per region (4× the old world)
        var mtype=types[ti];
        var def=LADEFS[mtype];
        var _rl=this._randLand(rng,sec,VILLAGE_RADIUS+20); if(!_rl)continue;
        var tx=_rl.tx,ty=_rl.ty;
        this._largeAnimals.push({
          type:mtype,def:def,
          x:tx*TILE+TILE/2,y:ty*TILE+TILE/2,
          hp:def.hp,maxHp:def.hp,
          section:sec,state:'idle',
          vx:0,vy:0,ph:0,
          wanderTimer:0,fleeTimer:0,corneredTimer:0,
          respawnTimer:0,dead:false,
          atkTimer:0,hitFlash:0,
          spawnX:tx*TILE+TILE/2,spawnY:ty*TILE+TILE/2,
        });
        } // end ci loop
      }
    }
  }
  _updateLargeAnimals(dt){
    if(!this._largeAnimals||!this.player)return;
    var self=this;
    var px=this.player.x, py=this.player.y;
    var g=this._lifeGfx;
    var stats=this.calcPlayerStats();
    // Update meat pickups
    if(!this._meatPickups)this._meatPickups=[];
    this._meatPickups=this._meatPickups.filter(function(mp){
      mp.life=(mp.life||5)-dt;
      if(mp.life<0){
        if(mp.glow)mp.glow.destroy();
        if(mp.label)mp.label.destroy();
        return false;
      }
      // Pulsing glow
      var scale=0.85+0.15*Math.sin(Date.now()*0.006);
      if(mp.glow)mp.glow.setScale(scale);
      return true;
    });
    // Update large animals. Perf: like monsters, animals beyond ~1700 px sleep (no AI),
    // and only animals inside the camera view (+ margin) are drawn into _lifeGfx.
    var wv=this.cameras.main.worldView, vx0=wv.x-96, vy0=wv.y-96, vx1=wv.right+96, vy1=wv.bottom+96;
    this._largeAnimals.forEach(function(a){
      if(!a.dead&&Math.hypot(px-a.x,py-a.y)>1700)return;   // asleep: frozen, not drawn
      a.ph=(a.ph||0)+dt*2;
      if(a.dead){
        // Respawn after 90s
        a.respawnTimer=(a.respawnTimer||90)-dt;
        if(a.respawnTimer<=0){
          a.dead=false;a.hp=a.maxHp;a.state='idle';
          a.x=a.spawnX;a.y=a.spawnY;
          a.respawnTimer=0;
        }
        return;
      }
      if(a.hitFlash>0)a.hitFlash-=dt;
      var dist=Math.hypot(px-a.x,py-a.y);
      var def=a.def;
      // State transitions
      if(a.state==='idle'||a.state==='wander'){
        a.wanderTimer-=dt;
        if(a.wanderTimer<0){
          a.wanderTimer=1.5+Math.random()*2;
          var ang=Math.random()*Math.PI*2;
          a.vx=Math.cos(ang)*(def.spd*0.4); a.vy=Math.sin(ang)*(def.spd*0.4);
          a.state='wander';
        }
        // Flee if player gets too close
        if(dist<def.fleeR){a.state='flee';a.fleeTimer=0;a.corneredTimer=0;}
      } else if(a.state==='flee'){
        a.fleeTimer+=dt;
        // Accelerate away
        var fleeSpd=def.spd*(1+Math.min(a.fleeTimer*0.4,1.2));
        // Find direction toward nearest safe tile
        var safeTx=null,safeTy=null,bestSafeDist=9999;
        var ax=Math.floor(a.x/TILE),ay=Math.floor(a.y/TILE);
        var searchR=12;
        for(var sy2=-searchR;sy2<=searchR;sy2++){for(var sx2=-searchR;sx2<=searchR;sx2++){
          var stx=ax+sx2,sty=ay+sy2;
          if(stx<0||stx>=WORLD_W||sty<0||sty>=WORLD_H)continue;
          var stv=self.tiles[sty]?self.tiles[sty][stx]:T.OCEAN;
          if(stv===def.safeType){
            var sd=Math.hypot(sx2,sy2);
            if(sd<bestSafeDist){bestSafeDist=sd;safeTx=stx*TILE+TILE/2;safeTy=sty*TILE+TILE/2;}
          }
        }}
        if(safeTx!==null){
          var sa2=Math.atan2(safeTy-a.y,safeTx-a.x);
          a.vx=Math.cos(sa2)*fleeSpd; a.vy=Math.sin(sa2)*fleeSpd;
          // Reached safe zone → disappear
          if(Math.hypot(safeTx-a.x,safeTy-a.y)<TILE*1.5){
            a.dead=true;a.respawnTimer=90;
            return;
          }
        } else {
          // No safe tile found — flee away from player
          var fd=Math.hypot(px-a.x,py-a.y)||1;
          a.vx=-(px-a.x)/fd*fleeSpd; a.vy=-(py-a.y)/fd*fleeSpd;
        }
        // Cornered check: if player is between us and safety, switch to fight
        if(dist<80&&a.fleeTimer>3){a.state='fight';a.atkTimer=0;}
        // Return to idle if player far enough away
        if(dist>def.fleeR*1.6){a.state='idle';a.wanderTimer=2;}
      } else if(a.state==='fight'){
        // Charge at player
        var fd2=Math.hypot(px-a.x,py-a.y)||1;
        var chargeSpd=def.spd*1.3;
        a.vx=(px-a.x)/fd2*chargeSpd; a.vy=(py-a.y)/fd2*chargeSpd;
        a.atkTimer=(a.atkTimer||0)-dt;
        // Deal damage to player on contact
        if(dist<def.r+18&&a.atkTimer<=0){
          a.atkTimer=1.2;
          var ps=self.playerState;
          var stats2=self.calcPlayerStats();
          var dmgToPlayer=Math.max(1,def.atk-stats2.def+Math.floor(Math.random()*4-2));
          ps.hp=Math.max(0,(ps.hp||0)-dmgToPlayer);
          self._floatText(px,py-25,'-'+dmgToPlayer+'💥','#ff4444');
          var _fl=document.getElementById('damage-flash');
          if(_fl){_fl.style.opacity='0.20';clearTimeout(self._flashT);self._flashT=setTimeout(function(){_fl.style.opacity='0';},350);}
          self.worldIFrames=0.4;
          self._emitUI();
          if(ps.hp<=0){self._worldPlayerDied();return;}
        }
        // Flee again if player retreats far
        if(dist>def.fleeR*2){a.state='flee';a.fleeTimer=0;}
      }
      // Move
      if(a.state!=='idle'){
        var nx2=a.x+a.vx*dt, ny2=a.y+a.vy*dt;
        var ltx=Math.floor(nx2/TILE),lty=Math.floor(ny2/TILE);
        var ltv=self.tiles[lty]?self.tiles[lty][ltx]:T.OCEAN;
        var blocked=(a.state==='flee')?ALWAYS_BLOCKED.has(ltv):(ALWAYS_BLOCKED.has(ltv));
        if(!blocked){a.x=nx2;a.y=ny2;}
        else{a.vx=0;a.vy=0;if(a.state==='flee')a.corneredTimer=(a.corneredTimer||0)+dt;}
      }
      // Draw large animal (on-screen only)
      if(a.x>vx0&&a.x<vx1&&a.y>vy0&&a.y<vy1)self._drawLargeAnimal(g,a,dt);
    });
  }
  _drawLargeAnimal(g,a){
    if(a.dead)return;
    var x=Math.round(a.x),y=Math.round(a.y);
    var fl=(a.state==='flee'||a.state==='fight');
    var ph=a.ph;
    var hitCol=(a.hitFlash>0);
    // HP bar above animal
    var hpFrac=Math.max(0,a.hp/a.maxHp);
    var bw=Math.round(a.def.r*2.4);
    g.fillStyle(0x000000,0.6).fillRect(x-bw/2,y-a.def.r-14,bw,4);
    var barCol=hpFrac>0.6?0x44ee44:hpFrac>0.3?0xffcc00:0xff3333;
    g.fillStyle(barCol,0.9).fillRect(x-bw/2,y-a.def.r-14,Math.round(bw*hpFrac),4);
    // Shadow
    g.fillStyle(0x000000,0.22).fillEllipse(x,y+a.def.r+2,a.def.r*2.8,9);
    // Body by type
    switch(a.type){
      case 'deer':{
        // Legs (running bob if fleeing)
        var legB=fl?Math.sin(ph*4)*4:0;
        g.fillStyle(0xb06030,0.9).fillRect(x-6,y+4,3,10+legB).fillRect(x+3,y+4,3,10-legB);
        // Body
        g.fillStyle(hitCol?0xffffff:0xc87040,0.95).fillEllipse(x,y,28,18);
        // Head
        g.fillStyle(hitCol?0xffffff:0xd08050,0.95).fillCircle(x+(fl?9:6),y-8,9);
        // Antlers
        if(!fl){
          g.lineStyle(2,0x806040,1);g.lineBetween(x+4,y-16,x+2,y-24);g.lineBetween(x+2,y-24,x-1,y-20);
          g.lineBetween(x+2,y-24,x+5,y-20);g.lineBetween(x+8,y-16,x+10,y-24);
          g.lineBetween(x+10,y-24,x+7,y-20);g.lineBetween(x+10,y-24,x+13,y-20);
        }
        // Eye + snout
        g.fillStyle(0x222222,1).fillCircle(x+(fl?12:9),y-9,2);
        g.fillStyle(0x604030,0.8).fillEllipse(x+(fl?14:10),y-8,6,4);
        // White tail when fleeing
        if(fl)g.fillStyle(0xffffff,0.9).fillCircle(x-9,y-3,5);
        break;}
      case 'boar':{
        // Legs
        var blegB=fl?Math.sin(ph*5)*3:0;
        g.fillStyle(0x503020,0.9).fillRect(x-8,y+5,4,9+blegB).fillRect(x+4,y+5,4,9-blegB);
        // Body (stocky)
        g.fillStyle(hitCol?0xffffff:0x704830,0.95).fillEllipse(x,y,34,22);
        // Head (big, forward-pointing)
        g.fillStyle(hitCol?0xffffff:0x806040,0.95).fillEllipse(x+(fl?10:8),y-4,20,16);
        // Tusks
        g.fillStyle(0xeeeecc,0.9).fillRect(x+(fl?14:12),y+1,6,3).fillRect(x+(fl?14:12),y-3,6,3);
        // Eye
        g.fillStyle(0xff2200,0.9).fillCircle(x+(fl?13:10),y-5,2.5);
        // Spiky back hair
        g.fillStyle(0x302010,0.7);
        for(var hi=0;hi<5;hi++)g.fillTriangle(x-10+hi*5,y-9,x-8+hi*5,y-17+Math.sin(hi)*2,x-6+hi*5,y-9);
        break;}
      case 'crocodile':{
        // Body (long, low)
        g.fillStyle(hitCol?0xffffff:0x2a6820,0.95).fillEllipse(x,y+2,38,16);
        // Tail
        g.fillStyle(hitCol?0xffffff:0x2a6820,0.9).fillTriangle(x-18,y+2,x-30,y-2,x-30,y+6);
        // Head (pointed snout)
        g.fillStyle(hitCol?0xffffff:0x3a7830,0.95).fillEllipse(x+(fl?12:10),y,24,14);
        // Teeth
        g.fillStyle(0xeeeebb,0.85);
        for(var ci=0;ci<3;ci++)g.fillRect(x+(fl?10:8)+ci*4,y+5,2,4);
        // Eye (yellow, evil)
        g.fillStyle(0xdddd00,0.9).fillCircle(x+(fl?15:13),y-4,3);
        g.fillStyle(0x000000,1).fillRect(x+(fl?15:13)-1,y-5,2,4);
        // Scales (dots)
        g.fillStyle(0x1a5010,0.4);
        for(var sci=0;sci<4;sci++)g.fillCircle(x-10+sci*7,y,3);
        break;}
      case 'swamp_bear':{
        // Big rounded bear
        var sblegB=fl?Math.sin(ph*4)*4:0;
        g.fillStyle(0x2a1e10,0.9).fillRect(x-10,y+6,5,11+sblegB).fillRect(x+5,y+6,5,11-sblegB);
        g.fillStyle(hitCol?0xffffff:0x3a2818,0.95).fillEllipse(x,y,36,28);
        g.fillStyle(hitCol?0xffffff:0x4a3828,0.95).fillCircle(x+(fl?6:3),y-11,14);
        // Round ears
        g.fillStyle(0x2a1e10,1).fillCircle(x-4,y-21,5).fillCircle(x+10,y-21,5);
        // Eyes (menacing red)
        g.fillStyle(fl?0xff2200:0x440000,0.9).fillCircle(x+(fl?2:-1),y-12,3).fillCircle(x+(fl?10:7),y-12,3);
        // Moss patches
        g.fillStyle(0x2a6020,0.3).fillEllipse(x-5,y+3,14,8).fillEllipse(x+8,y-3,10,6);
        break;}
      case 'highland_ram':{
        var hrlegB=fl?Math.sin(ph*5)*3:0;
        g.fillStyle(0x887858,0.9).fillRect(x-7,y+5,4,10+hrlegB).fillRect(x+3,y+5,4,10-hrlegB);
        g.fillStyle(hitCol?0xffffff:0xa89878,0.95).fillEllipse(x,y,30,20);
        g.fillStyle(hitCol?0xffffff:0xc0b090,0.95).fillCircle(x+(fl?8:5),y-8,11);
        // Curved horns
        if(!fl){
          g.lineStyle(3,0x806040,1);
          g.arc(x-1,y-15,8,Math.PI*1.2,Math.PI*2.2);g.strokePath();
          g.arc(x+9,y-15,8,Math.PI*(-0.2),Math.PI*0.8);g.strokePath();
        }
        g.fillStyle(0x222222,1).fillCircle(x+(fl?11:7),y-9,2);
        break;}
      case 'cave_bear':{
        // Bigger, more dangerous version
        var cblegB=fl?Math.sin(ph*3)*5:0;
        g.fillStyle(0x3a2818,0.9).fillRect(x-11,y+7,6,12+cblegB).fillRect(x+5,y+7,6,12-cblegB);
        g.fillStyle(hitCol?0xffffff:0x584838,0.95).fillEllipse(x,y,40,30);
        g.fillStyle(hitCol?0xffffff:0x684848,0.95).fillCircle(x+(fl?6:3),y-13,16);
        g.fillStyle(0x2a1808,1).fillCircle(x-5,y-24,6).fillCircle(x+12,y-24,6);
        g.fillStyle(fl?0xff4400:0xcc2200,0.95).fillCircle(x+(fl?2:-2),y-14,3.5).fillCircle(x+(fl?10:6),y-14,3.5);
        // Claw marks on chest
        g.lineStyle(1,0x402010,0.5);g.lineBetween(x-4,y-2,x,y+6);g.lineBetween(x,y-2,x+4,y+6);g.lineBetween(x+4,y-2,x+8,y+6);
        break;}
      case 'lava_wyrm':{
        // Long serpentine lizard
        var lwph=Math.sin(ph*3)*5;
        g.fillStyle(hitCol?0xffffff:0x882200,0.9).fillTriangle(x-12,y+lwph,x-24,y-4+lwph,x-24,y+4+lwph);
        g.fillStyle(hitCol?0xffffff:0xcc4400,0.95).fillEllipse(x,y+lwph*0.5,36,18);
        g.fillStyle(hitCol?0xffffff:0xdd5510,0.95).fillEllipse(x+(fl?10:8),y-6+lwph*0.3,22,16);
        // Horns
        g.fillStyle(0x881100,0.9).fillTriangle(x+8,y-12,x+5,y-20,x+12,y-12).fillTriangle(x+14,y-11,x+11,y-19,x+18,y-11);
        // Glowing eye
        g.fillStyle(0xff8800,0.95).fillCircle(x+(fl?13:10),y-7,4);
        g.fillStyle(0xffcc00,0.9).fillCircle(x+(fl?13:10),y-7,2);
        // Scale pattern
        g.fillStyle(0xaa3300,0.35);
        for(var lsi=0;lsi<4;lsi++)g.fillEllipse(x-6+lsi*7,y+2+lwph*0.3,7,5);
        // Heat glow beneath
        g.fillStyle(0xff4400,0.08).fillEllipse(x,y+12,40,12);
        break;}
      case 'ash_titan':{
        // Massive ape-like creature covered in ash
        var atlegB=fl?Math.sin(ph*3)*5:0;
        g.fillStyle(0x2a1a10,0.9).fillRect(x-12,y+8,7,14+atlegB).fillRect(x+5,y+8,7,14-atlegB);
        // Knuckle walk arms
        g.fillStyle(0x3a2418,0.9).fillRect(x-18,y+4,6,12).fillRect(x+12,y+4,6,12);
        g.fillStyle(hitCol?0xffffff:0x4a3028,0.95).fillEllipse(x,y,44,34);
        g.fillStyle(hitCol?0xffffff:0x5a3a28,0.95).fillEllipse(x+(fl?4:0),y-16,30,26);
        // Ash wisps
        g.fillStyle(0x888888,0.15).fillEllipse(x-8,y-28,12,18).fillEllipse(x+6,y-26,10,16);
        // Glowing red eyes in the ash
        g.fillStyle(0xff2200,0.95).fillCircle(x+(fl?0:-4),y-17,4).fillCircle(x+(fl?8:4),y-17,4);
        g.fillStyle(0xff8800,0.8).fillCircle(x+(fl?0:-4),y-17,2).fillCircle(x+(fl?8:4),y-17,2);
        break;}
    }
  }
  _hitLargeAnimal(a,dmg){
    // Scale damage based on weapon tier — early weapons do little, strong weapons do more
    var scaledDmg=Math.max(1,Math.round(dmg/5));
    a.hp-=scaledDmg;
    a.hitFlash=0.15;
    this._floatText(a.x,a.y-a.def.r-12,'-'+scaledDmg+'🩸','#ff8844');
    if(a.state!=='fight')a.state='flee';
    a.fleeTimer=(a.fleeTimer||0);
    if(a.hp<=0){
      a.dead=true;a.respawnTimer=90;
      // Drop roast meat
      this._spawnMeatPickup(a.x,a.y);
    }
  }
  _spawnMeatPickup(x,y){
    var glow=this.add.circle(x,y,16,0xff8800,0.45).setDepth(11);
    var label=this.add.text(x,y,'🍖',{fontSize:'20px',fontFamily:'serif'}).setOrigin(.5,.5).setDepth(12);
    this.tweens.add({targets:label,y:y-8,duration:600,ease:'Sine.out'});
    this._meatPickups.push({x:x,y:y,glow:glow,label:label,life:30});
    showNotif('🍖 Roast Meat dropped! [Tab] to collect','#ffcc44');
  }

  _updateFlow(dt){
    if(!this._flowGfx)return;
    this._flowTime=(this._flowTime||0)+dt;
    var g=this._flowGfx;
    g.clear();
    var cam=this.cameras.main;
    var wv=cam.worldView;
    var txMin=Math.max(0,Math.floor(wv.x/TILE)-1);
    var txMax=Math.min(WORLD_W-1,Math.ceil((wv.x+wv.width)/TILE)+1);
    var tyMin=Math.max(0,Math.floor(wv.y/TILE)-1);
    var tyMax=Math.min(WORLD_H-1,Math.ceil((wv.y+wv.height)/TILE)+1);
    var t=this._flowTime;
    var WATER_TILES=[T.SHALLOW_WATER,T.DEEP_WATER,T.OCEAN];
    var MAGMA_TILES=[T.THIN_MAGMA,T.DEEP_MAGMA];
    for(var ty2=tyMin;ty2<=tyMax;ty2++){
      for(var tx2=txMin;tx2<=txMax;tx2++){
        var tv2=this.tiles[ty2]?this.tiles[ty2][tx2]:T.OCEAN;
        var wx2=tx2*TILE, wy2=ty2*TILE;
        // ── Water ripples ───────────────────────────────────────
        if(tv2===T.SHALLOW_WATER||tv2===T.DEEP_WATER||tv2===T.OCEAN){
          var wAlpha=(tv2===T.OCEAN)?0.14:(tv2===T.DEEP_WATER)?0.20:0.28;
          g.fillStyle(0x88ccff,wAlpha);
          // 3 ripple bands scrolling diagonally; sine offset for gentle curves
          for(var wl=0;wl<3;wl++){
            var bandBase=wl*(TILE/3);
            var scrollY=((t*(9+wl*3)+bandBase)%TILE+TILE)%TILE;
            var sineX=Math.sin(tx2*0.55+t*(1.2+wl*0.35))*2;
            var ry=Math.round(scrollY+sineX);
            if(ry>=0&&ry<TILE){g.fillRect(wx2,wy2+ry,TILE,1+(wl===1?1:0));}
            // wrap-around copy so bands are seamless across tile edge
            var ry2=ry-TILE;
            if(ry2>=0&&ry2<TILE){g.fillRect(wx2,wy2+ry2,TILE,1+(wl===1?1:0));}
          }
        // ── Magma flow ───────────────────────────────────────────
        } else if(tv2===T.THIN_MAGMA||tv2===T.DEEP_MAGMA){
          var mAlpha=(tv2===T.DEEP_MAGMA)?0.32:0.24;
          // Two sets of diagonal flow stripes (45°) scrolling upward-right
          for(var ml=0;ml<2;ml++){
            var diagOff=((t*22+ml*TILE*.7)%(TILE*1.5)+TILE*1.5)%(TILE*1.5);
            // Rasterise diagonal band as a series of small rects
            for(var seg=0;seg<TILE+8;seg+=4){
              var sx3=seg;
              var sy3=Math.round(diagOff-seg);
              if(sy3>=0&&sy3<TILE&&sx3>=0&&sx3<TILE){
                g.fillStyle(ml===0?0xff6600:0xff9900,mAlpha*(1-.06*seg/TILE));
                g.fillRect(wx2+sx3,wy2+sy3,3,2);
              }
            }
          }
          // Pulsing bright core vein
          var pulseA=0.14+Math.sin(t*3+tx2*0.8)*0.07;
          g.fillStyle(0xffcc44,pulseA);
          var veinY=Math.round(((t*15+tx2*5)%TILE+TILE)%TILE);
          if(veinY<TILE){g.fillRect(wx2,wy2+veinY,TILE,1);}
        }
      }
    }
  }

  _updateWorldMonsters(dt){
    if(!this.worldMonsters)return;
    var self=this;
    var px=this.player.x, py=this.player.y;

    // Update projectiles
    if(!this._monProj)this._monProj=[];
    this._monProj=this._monProj.filter(function(pr){
      if(!pr||!pr.vis)return false;
      pr.life-=dt;
      if(pr.life<=0){
        pr.vis.destroy();
        // Bog flame: drop a final sludge puddle where it landed
        if(pr.bog)self._spawnBogPatch(pr.x,pr.y,40,3.0);
        return false;
      }
      if(pr.tracking){
        var ang=Math.atan2(py-pr.y,px-pr.x);
        pr.vx+=Math.cos(ang)*80*dt; pr.vy+=Math.sin(ang)*80*dt;
        var spd=Math.hypot(pr.vx,pr.vy);
        if(spd>180){pr.vx=pr.vx/spd*180;pr.vy=pr.vy/spd*180;}
      }
      pr.x+=pr.vx*dt; pr.y+=pr.vy*dt;
      pr.vis.setPosition(pr.x,pr.y);
      // Bog flame leaves a sludge trail every 0.25s
      if(pr.bog){
        pr.trailT=(pr.trailT||0)+dt;
        if(pr.trailT>=0.25){pr.trailT=0;self._spawnBogPatch(pr.x,pr.y,22,2.5);}
      }
      if(Math.hypot(pr.x-px,pr.y-py)<18&&!pr.hit&&(self.worldIFrames||0)<=0&&!self.playerState.godMode){
        pr.hit=true;pr.life=0;pr.vis.destroy();
        var def=self.calcPlayerStats().def;
        var dmg=Math.max(1,pr.dmg-def+Math.floor(Math.random()*3));
        dmg=self._applyShieldToDmg(dmg);
        if(dmg<=0){return false;}
        self.playerState.hp=Math.max(0,self.playerState.hp-dmg);
        self.worldIFrames=0.7; self._homeCastHit=true;
        // Knockback: nudge player away from projectile direction (wall-safe)
        var _ks=Math.hypot(pr.vx,pr.vy)||1;
        var _kbx=pr.vx/_ks*32,_kby=pr.vy/_ks*32;
        var _mnt=self.playerState.mount;
        if(self._canGo(self.player.x+_kbx,self.player.y+_kby,_mnt)){self.player.x+=_kbx;self.player.y+=_kby;}
        else if(self._canGo(self.player.x+_kbx,self.player.y,_mnt)){self.player.x+=_kbx;}
        else if(self._canGo(self.player.x,self.player.y+_kby,_mnt)){self.player.y+=_kby;}
        // Flame/heat_seek: apply burn status + reset lava ramp
        if(pr.type==='flame'||pr.type==='heat_seek'){
          self._burnTime=3; self._burnDmgAccum=self._burnDmgAccum||0;
          self._lavaTime=0; self._showFireOverlay(true);
        }
        // Bog flame: drop a large sludge puddle at hit location
        if(pr.bog){
          self._spawnBogPatch(pr.x,pr.y,55,3.0);
          self._floatText(px,py-30,'-'+dmg+' HP | Bogged!','#44cc44');
        } else if(pr.type==='flame'||pr.type==='heat_seek'){
          self._floatText(px,py-30,'-'+dmg+' HP | 🔥 Burning!','#ff6600');
        } else {
          self._floatText(px,py-30,'-'+dmg+' HP','#ff3322');
        }
        var fl=document.getElementById('damage-flash');
        if(fl){fl.style.opacity='0.20';clearTimeout(self._flashT);self._flashT=setTimeout(function(){fl.style.opacity='0';},350);}
        self._emitUI();
        if(self.playerState.hp<=0)self._worldPlayerDied();
        return false;
      }
      return pr.life>0&&!pr.hit;
    });

    MX.tickScene(this,dt);
    this.worldMonsters.forEach(function(mon){
      // Respawn
      if(mon.dead){
        if(mon.temp||mon.campId)return;   // camp guards come back with their camp
        mon.respawnTimer-=dt;
        // packs stay dead while you are in the area: respawn only once you are well away (~30 tiles)
        if(mon.respawnTimer<=0&&Math.hypot(px-mon.spawnX,py-mon.spawnY)>TILE*30&&self.playerState.unlockedSections.includes(mon.section)){
          mon.dead=false; mon.hp=mon.maxHp;
          mon.x=mon.spawnX; mon.y=mon.spawnY;
          mon.cont.setPosition(mon.x,mon.y); mon.cont.setDepth(WR_DEPTH(mon.y)); mon.cont.setAlpha(1);
          mon.hpFill.displayWidth=28; mon.state='wander';
          mon._md={}; if(mon.mx)MX.reset(mon);
        }
        return;
      }
      if(!self.playerState.unlockedSections.includes(mon.section)){mon.cont.setVisible(false);return;}
      mon.cont.setVisible(true);

      var dx=px-mon.x, dy=py-mon.y, dist=Math.hypot(dx,dy);
      // 4× world: monsters far off-screen sleep (no AI, not drawn)
      if(dist>1700){ mon.cont.setVisible(false); if(mon.state!=='wander'){mon.state='wander';} return; }
      if(mon._lazyVis)self._monWake(mon);   // first wake: name label + sprite texture (10f)
      var mdef=mon.def;
      var spd=mdef.spd||50;
      if(!mon._md)mon._md={};
      var md=mon._md;

      // Stun: skip all movement/attacks while stunned
      if(mon._stun>0){mon._stun-=dt;return;}

      if(dist<280&&mon.rid&&typeof Tome!=='undefined')Tome.see('monster',mon.rid);
      if(mon.mx){ MX.tick(self,mon,dt); return; }
      // Smoke bomb: force wander if player is inside smoke cloud
      if(self._smokeBomb&&self._smokeBomb.life>0){
        var sb=self._smokeBomb;
        if(Math.hypot(mon.x-sb.x,mon.y-sb.y)<sb.r)mon.state='wander';
      }

      // State transitions
      var RANGED_TYPES=new Set(['arrow','flame','bog_flame','heat_seek','scatter','scatter_arrow','scatter_flame','lightning']);
      var isRangedAtk=RANGED_TYPES.has(mdef.atkType);
      // Ranged attackers enter chase state from further away
      var chaseRange=isRangedAtk?300:220;
      if(dist<chaseRange)mon.state='chase'; else if(dist>350)mon.state='wander';

      // Movement by moveType
      if(mon.state==='chase'){
        var ang=Math.atan2(dy,dx);
        var mv=spd;
        var mt=mdef.moveType||'normal';
        if(mt==='pulse'){
          md.pt=(md.pt||0)-dt; if(md.pt<=0){md.pt=1.2+Math.random();md.pon=!md.pon;}
          mv=md.pon?spd*2.2:0;
        } else if(mt==='zigzag'){
          md.zt=(md.zt||0)-dt; if(md.zt<=0){md.zt=0.5;md.zd=(md.zd||1)*-1;}
          var perp=ang+Math.PI/2;
          var lx=mon.x+Math.cos(perp)*spd*0.7*md.zd*dt, ly=mon.y+Math.sin(perp)*spd*0.7*md.zd*dt;
          if(self._canGoMonster(lx,mon.y))mon.x=lx; if(self._canGoMonster(mon.x,ly))mon.y=ly;
          mv=spd*0.7;
        } else if(mt==='rush'){
          md.rc=(md.rc||0)-dt;
          if(dist<120&&md.rc<=0){md.rushing=true;md.rt=0.4;md.rc=3+Math.random()*2;}
          if(md.rushing){md.rt-=dt;if(md.rt<=0)md.rushing=false;mv=spd*3.5;} else mv=spd*0.4;
        } else if(mt==='orbit'){
          md.oa=(md.oa||ang)+spd*0.006*dt;
          var tx=px+Math.cos(md.oa)*160, ty=py+Math.sin(md.oa)*160;
          ang=Math.atan2(ty-mon.y,tx-mon.x); mv=spd*1.3;
        } else if(mt==='teleport'){
          md.tt=(md.tt||0)-dt;
          if(md.tt<=0&&dist>90){
            md.tt=2.5+Math.random()*2;
            var td=Math.min(dist-60,120);
            var tx2=mon.x+Math.cos(ang)*td, ty2=mon.y+Math.sin(ang)*td;
            if(self._canGoMonster(tx2,ty2)){
              mon.x=tx2; mon.y=ty2;
              mon.body.setFillStyle(0xffffff);
              self.time.delayedCall(100,function(){if(!mon.dead)mon.body.setFillStyle(mdef.color);});
            }
          }
          mv=spd*0.5;
        } else if(mt==='strafe'){
          md.sd=(md.sd||1); md.st=(md.st||0)-dt;
          if(md.st<=0){md.st=1+Math.random();md.sd*=-1;}
          var perp2=ang+Math.PI/2;
          var sx=mon.x+Math.cos(perp2)*spd*md.sd*dt, sy=mon.y+Math.sin(perp2)*spd*md.sd*dt;
          if(self._canGoMonster(sx,mon.y))mon.x=sx; if(self._canGoMonster(mon.x,sy))mon.y=sy;
          if(dist<140)mv=-spd*0.6; else if(dist>220)mv=spd*0.5; else mv=0;
        }
        // Apply slow effect
        var slowMult=1;
        if(mon._slow&&mon._slow>0){mon._slow-=dt;slowMult=0.5;}
        if(mv!==0){
          var nx=mon.x+Math.cos(ang)*mv*slowMult*dt, ny=mon.y+Math.sin(ang)*mv*slowMult*dt;
          if(self._canGoMonster(nx,mon.y))mon.x=nx;
          if(self._canGoMonster(mon.x,ny))mon.y=ny;
        }
        // ── Ranged distance correction (all ranged atkType monsters) ───────
        // Orbit already manages distance; others need explicit range-keeping.
        var mt2=mdef.moveType||'normal';
        if(isRangedAtk&&mt2!=='orbit'){
          var prefDist=140; // preferred firing range in pixels
          var ang2=Math.atan2(dy,dx);
          if(dist<prefDist-20){
            // Too close — back away
            var bx=mon.x-Math.cos(ang2)*spd*0.7*dt;
            var by=mon.y-Math.sin(ang2)*spd*0.7*dt;
            if(self._canGoMonster(bx,mon.y))mon.x=bx;
            if(self._canGoMonster(mon.x,by))mon.y=by;
          } else if(dist<prefDist+30){
            // In firing range — strafe sideways
            if(!md.sD)md.sD=1; if(!md.sT)md.sT=0;
            md.sT-=dt; if(md.sT<=0){md.sT=1.2+Math.random()*0.8;md.sD*=-1;}
            var perp3=ang2+Math.PI/2;
            var sx3=mon.x+Math.cos(perp3)*spd*0.5*md.sD*dt;
            var sy3=mon.y+Math.sin(perp3)*spd*0.5*md.sD*dt;
            if(self._canGoMonster(sx3,mon.y))mon.x=sx3;
            if(self._canGoMonster(mon.x,sy3))mon.y=sy3;
          }
          // If dist > prefDist+30: already chasing above, let that movement stand
        }
      } else {
        // Wander
        md.wt=(md.wt||0)-dt;
        if(md.wt<=0){md.wt=2+Math.random()*3;var wa=Math.random()*Math.PI*2;md.wx=Math.cos(wa)*(spd*.35);md.wy=Math.sin(wa)*(spd*.35);}
        var wnx=mon.x+(md.wx||0)*dt, wny=mon.y+(md.wy||0)*dt;
        if(self._canGoMonster(wnx,mon.y))mon.x=wnx; else md.wx*=-1;
        if(self._canGoMonster(mon.x,wny))mon.y=wny; else md.wy*=-1;
      }
      mon.cont.setPosition(mon.x,mon.y);

      // Attacks
      mon.atkTimer=Math.max(0,mon.atkTimer-dt);
      if(!mon._ct)mon._ct=0; mon._ct=Math.max(0,mon._ct-dt);
      var pTx=Math.floor(px/TILE),pTy=Math.floor(py/TILE);
      if(getTileSection(pTx,pTy)===0)return; // village safe
      var atkRange=mdef.r+36;

      // ── Close-range contact damage ──
      var isBossType=!!mdef.boss;
      var contactCd=isBossType?1.8:(mdef.sec<=1?4.5:mdef.sec<=2?3.5:2.5);
      if(dist<atkRange&&mon._ct<=0&&!self.playerState.godMode){
        if((self.worldIFrames||0)<=0){
          // Deal reduced contact damage — "half a point" feel (1 min, low max)
          mon._ct=contactCd;
          var def0=self.calcPlayerStats().def;
          // Damage scales down heavily for weak enemies: sec1→~1, sec2→~1-2, sec3→~2-3, boss→normal
          var baseAtk=mon.monAtk!==undefined?mon.monAtk:mdef.atk;
          var rawDmg=isBossType?Math.round(baseAtk*0.8):Math.ceil(baseAtk*0.2);
          var dmg0=Math.max(1,rawDmg-def0+Math.floor(Math.random()*2));
          if(!isBossType&&dmg0>3)dmg0=Math.ceil(dmg0*0.5); // hard cap for non-boss
          dmg0=self._applyShieldToDmg(dmg0);
          if(dmg0<=0){self._emitUI();return;}
          self.playerState.hp=Math.max(0,self.playerState.hp-dmg0);
          self.worldIFrames=isBossType?0.6:1.2; self._homeCastHit=true; // longer iframes for weaker hits
          self._floatText(px,py-30,'-'+dmg0+' HP','#ff5533');
          var flc=document.getElementById('damage-flash');
          if(flc){flc.style.opacity='0.10';clearTimeout(self._flashT);self._flashT=setTimeout(function(){flc.style.opacity='0';},250);}
          self._emitUI();
          if(self.playerState.hp<=0)self._worldPlayerDied();
        }
      }

      // ── Ranged / special attacks (use main atkTimer) ──────────────────────
      // ── Mud troll idle stomp (visual, every 5s even when wandering) ──────────
      if(mdef.atkType==='stomp'){
        if(!mon._stompT)mon._stompT=0;
        mon._stompT-=dt;
        var stompCd=mon.state==='chase'?4.0:5.0;
        if(mon._stompT<=0){
          mon._stompT=stompCd;
          // Always show stomp shockwave
          var sw0=self.add.circle(mon.x,mon.y,0,0x886600,0.45).setDepth(12);
          self.tweens.add({targets:sw0,radius:70,alpha:0,duration:500,onComplete:function(){sw0.destroy();}});
          // Only damage player if close enough
          if(dist<90&&!self.playerState.godMode&&(self.worldIFrames||0)<=0){
            var def0s=self.calcPlayerStats().def;
            var effAtkS=mon.monAtk!==undefined?mon.monAtk:mdef.atk;
            var dmgS=Math.max(1,Math.ceil(effAtkS*0.6)-def0s+Math.floor(Math.random()*2));
            dmgS=self._applyShieldToDmg(dmgS);
            if(dmgS<=0){self._emitUI();return;}
            self.playerState.hp=Math.max(0,self.playerState.hp-dmgS);
            self.worldIFrames=0.7; self._homeCastHit=true;
            self._floatText(px,py-30,'-'+dmgS+' STOMP','#ff8800');
            var fl3=document.getElementById('damage-flash');
            if(fl3){fl3.style.opacity='0.20';clearTimeout(self._flashT);self._flashT=setTimeout(function(){fl3.style.opacity='0';},350);}
            self._emitUI();
            if(self.playerState.hp<=0)self._worldPlayerDied();
          }
        }
      }
      if(mon.atkTimer>0)return; // main attack cooldown
      var at=mdef.atkType||'melee';
      // stomp is now handled by the separate stomp timer above
      if(at==='stomp')return;
      if(at==='melee'&&dist<atkRange){
        mon.atkTimer=1.8;
        if(!self.playerState.godMode&&(self.worldIFrames||0)<=0){
          var def=self.calcPlayerStats().def;
          var effAtk=mon.monAtk!==undefined?mon.monAtk:mdef.atk;
          var baseDmg=effAtk*0.4;
          var dmg=Math.max(1,Math.ceil(baseDmg)-def+Math.floor(Math.random()*2));
          if(!mdef.boss&&dmg>4)dmg=Math.ceil(dmg*0.5);
          dmg=self._applyShieldToDmg(dmg);
          if(dmg<=0){self._emitUI();return;}
          self.playerState.hp=Math.max(0,self.playerState.hp-dmg);
          self.worldIFrames=0.7; self._homeCastHit=true;
          self._floatText(px,py-30,'-'+dmg+' HP','#ff3322');
          var fl2=document.getElementById('damage-flash');
          if(fl2){fl2.style.opacity='0.20';clearTimeout(self._flashT);self._flashT=setTimeout(function(){fl2.style.opacity='0';},350);}
          self._emitUI();
          if(self.playerState.hp<=0)self._worldPlayerDied();
        }
      } else if(at==='arrow'&&dist<280){mon.atkTimer=2.2;self._spawnMonProj(mon,px,py,'arrow',mdef.atk*0.7);}
      else if(at==='flame'&&dist<240){mon.atkTimer=2.5;self._spawnMonProj(mon,px,py,'flame',mdef.atk*0.8);}
      else if(at==='bog_flame'&&dist<240){mon.atkTimer=2.5;self._spawnMonProj(mon,px,py,'bog_flame',mdef.atk*0.7);}
      else if(at==='heat_seek'&&dist<300){mon.atkTimer=2.8;self._spawnMonProj(mon,px,py,'heat_seek',mdef.atk*0.9);}
      else if((at==='scatter'||at==='scatter_arrow')&&dist<250){mon.atkTimer=2.5;self._spawnMonProjScatter(mon,px,py,'arrow',mdef.atk*0.6);}
      else if(at==='scatter_flame'&&dist<200){mon.atkTimer=3.5;self._spawnMonProjScatter(mon,px,py,'flame',mdef.atk*0.7);}
      else if(at==='lightning'&&dist<260){mon.atkTimer=2.0;self._spawnMonProj(mon,px,py,'lightning',mdef.atk*0.85);}
    });
  }

  _spawnMonProj(mon,px,py,type,dmg){
    if(!this._monProj)this._monProj=[];
    var ang=Math.atan2(py-mon.y,px-mon.x);
    var cfg={arrow:{spd:280,col:0xaa8844,r:4,tracking:false},
             flame:{spd:155,col:0xff6600,r:7,tracking:false},
             bog_flame:{spd:130,col:0x44cc44,r:8,tracking:false,bog:true,trailT:0},
             heat_seek:{spd:110,col:0xff8800,r:8,tracking:true},
             lightning:{spd:320,col:0x88bbff,r:5,tracking:false}};
    var f=cfg[type]||cfg.arrow;
    var vis=this.add.circle(mon.x,mon.y,f.r,f.col).setDepth(11);
    this._monProj.push({vis:vis,x:mon.x,y:mon.y,vx:Math.cos(ang)*f.spd,vy:Math.sin(ang)*f.spd,
      dmg:Math.ceil(dmg),tracking:f.tracking,bog:f.bog||false,trailT:0,type:type,treePen:10,life:3.5,hit:false});
  }

  _spawnMonProjScatter(mon,px,py,type,dmg){
    var baseAng=Math.atan2(py-mon.y,px-mon.x);
    var self=this;
    [-0.35,0,0.35].forEach(function(o){
      var a=baseAng+o;
      self._spawnMonProj({x:mon.x,y:mon.y,def:mon.def},
        mon.x+Math.cos(a)*999,mon.y+Math.sin(a)*999,type,dmg);
    });
  }

  _canGoMonster(nx,ny){
    var tx=Math.floor(nx/TILE),ty=Math.floor(ny/TILE);
    if(tx<0||tx>=WORLD_W||ty<0||ty>=WORLD_H)return false;
    // Monsters cannot enter the village (section 0 circle)
    if(Math.hypot(tx-CENTER_X,ty-CENTER_Y)<VILLAGE_RADIUS)return false;
    var tv=this.tiles[ty]?this.tiles[ty][tx]:T.OCEAN;
    return !ALWAYS_BLOCKED.has(tv);
  }
  
  _moveTowardPlayer(mon,spd){
    var dx=this.playerState.x-mon.x,dy=this.playerState.y-mon.y,d=Math.hypot(dx,dy);
    if(d>0){mon.x+=dx/d*spd;mon.y+=dy/d*spd;}
  }

  // ─── Lava damage + Burn status tick ─────────────────────────────────────────
  _updateLavaAndBurn(dt){
    var ps=this.playerState,p=this.player;
    if(!p||ps.godMode)return;

    // --- Burn tick (3 hp/sec for 3 seconds, refreshes on re-hit) ---
    if((this._burnTime||0)>0){
      this._burnTime-=dt;
      this._burnDmgAccum=(this._burnDmgAccum||0)+dt;
      if(this._burnDmgAccum>=1){
        this._burnDmgAccum-=1;
        var bd=(this._lavaTime>0||this._inFire)?0:Math.max(1,Math.round(ps.maxHp*0.02));   // (magma itself hurts more while you stand in it)
        if(bd){ ps.hp=Math.max(0,ps.hp-bd); this._floatText(p.x,p.y-38,'-'+bd+' 🔥','#ff6600'); }
        this._emitUI();
        if(ps.hp<=0){this._burnTime=0;this._showFireOverlay(false);this._worldPlayerDied();return;}
      }
      this._showFireOverlay(true);
    } else {
      this._burnTime=0;
      this._showFireOverlay(false);
    }

    // --- Lava tile damage ---
    var tx=Math.floor(p.x/TILE),ty=Math.floor(p.y/TILE);
    var tile=(this.tiles[ty]||[])[tx];
    var mnt=ps.mount;
    var mountDef=mnt&&MOUNTS[mnt];
    // Dragon's wings carry the rider above the heat — full lava immunity.
    // Only the Lava Unicorn and the dragons (Dragon, Ash Dragon) keep you safe from magma and fire.
    var hasLavaProt=_fireSafeMount(ps);
    // Boots with lava protection (slot check for future items)
    if(!hasLavaProt&&ps.equipped){
      var btSlot=ps.equipped.boots;
      if(btSlot&&(btSlot==='lava_boots'||btSlot==='obsidian_boots'))hasLavaProt=true;
    }
    if((tile===T.THIN_MAGMA||tile===T.DEEP_MAGMA)&&!hasLavaProt){
      if(!(this._lavaTime>0))this._lavaDmgAccum=1;   // the first touch stings at once
      this._lavaTime=(this._lavaTime||0)+dt;
      // standing in magma keeps you burning; 3 s more after you step out
      this._burnTime=3;this._burnDmgAccum=this._burnDmgAccum||0;
      this._lavaDmgAccum=(this._lavaDmgAccum||0)+dt;
      if(this._lavaDmgAccum>=1){
        this._lavaDmgAccum-=1;
        var dps=Math.max(2,Math.round(ps.maxHp*0.05));
        ps.hp=Math.max(0,ps.hp-dps);
        var lfl=document.getElementById('damage-flash');
        if(lfl){lfl.style.opacity='0.18';clearTimeout(this._flashT);this._flashT=setTimeout(function(){lfl.style.opacity='0';},280);}
        this._floatText(p.x,p.y-28,'-'+dps+' 🌋','#ff4400');
        this._emitUI();
        if(ps.hp<=0){this._worldPlayerDied();return;}
      }
    } else {
      this._lavaTime=0;
      this._lavaDmgAccum=0;
    }
  }

  _showFireOverlay(on){
    var el=document.getElementById('fire-overlay');
    if(el)el.style.display=on?'block':'none';
  }

  _worldPlayerDied(){
    if(this._dying)return;
    this._dying=true;
    var ps=this.playerState;
    // Apply penalty immediately
    var goldLoss=Math.floor(ps.gold*0.10);
    ps.gold=Math.max(0,ps.gold-goldLoss);
    ps.hp=Math.max(10,Math.floor(ps.maxHp*0.25));
    // Brief red flash — fades on its own, no pause
    var flash=document.getElementById('damage-flash');
    if(flash){flash.style.transition='opacity .05s';flash.style.opacity='0.7';
      setTimeout(function(){flash.style.transition='opacity 1.5s ease-out';flash.style.opacity='0';},80);}
    // Instant teleport to village — no waiting
    if(this.player){
      var vx=CENTER_X*TILE+TILE/2, vy=CENTER_Y*TILE+TILE/2;
      this.player.x=vx; this.player.y=vy;
      this.player.cont.setPosition(vx,vy);
      this.cameras.main.centerOn(vx,vy);
    }
    // Clear burn/lava status
    this._burnTime=0;this._burnDmgAccum=0;this._lavaTime=0;this._lavaDmgAccum=0;
    this._showFireOverlay(false);
    // Clear aggro & projectiles
    if(this.worldMonsters)this.worldMonsters.forEach(function(mon){
      if(!mon.dead){
        mon.state='wander';mon.atkTimer=3;if(mon._md)mon._md={};
        // Reset HP to full when player dies
        mon.hp=mon.maxHp;
        if(mon.hpFill)mon.hpFill.displayWidth=28;
      }
    });
    if(this._monProj){this._monProj.forEach(function(pr){if(pr&&pr.vis)pr.vis.destroy();});this._monProj=[];}
    if(this._playerProj){this._playerProj.forEach(function(pr){if(pr.vis)pr.vis.destroy();if(pr.trail)pr.trail.destroy();});this._playerProj=[];}
    // Clear dungeon completion locks on death so player can revisit
    ps.lockedSites=[];
    // Brief invincibility in the village
    this.worldIFrames=3.0;
    this._dying=false;
    this._emitUI();
    showNotif('💀 Defeated! -'+goldLoss+'g — back to village','#ff3322');
    showNotif('HP restored to 25%','#44ffaa');
  }

  _movePlayer(dt){
    if(_gameBlocked())return;
    var k=this.keys,p=this.player,ps=this.playerState;
    var mount=ps.mount,mdef=MOUNTS[mount];
    var _stats=this.calcPlayerStats();
    // Check if player is in a bog patch
    var inBog=false;
    if(this._bogPatches)this._bogPatches.forEach(function(bp){if(bp&&Math.hypot(p.x-bp.x,p.y-bp.y)<bp.r)inBog=true;});
    var bogMult=inBog?0.35:1;
    // Sprint / berserker speed multiplier
    var _spdMult=1;
    if(this._sprintTimer>0)_spdMult=2.0;
    else if(this._berserkerTimer>0)_spdMult=1.5;
    // Wetlands shallow water: 20% slow unless mount can cross water
    var _pTx=Math.floor(p.x/TILE),_pTy=Math.floor(p.y/TILE);
    var _curTile=this.tiles[_pTy]?this.tiles[_pTy][_pTx]:T.OCEAN;
    // Signature terrain: slow on foot (water, marsh, boulders, lava crust),
    // full speed on the mount that crosses it.
    var shallowMult=terrainSpeedMult(_curTile,mount);
    var baseSpd=180*(mdef?mdef.spdMult:1)*(1+(_stats.spdBonus||0))*bogMult*_spdMult*shallowMult*_heroBuffMult(ps,'spdUp');
    var vx=0,vy=0;
    // SHIFT = shield block mode
    var _hadShield=this._shielding;
    this._shielding=!!(this.keys.SHIFT&&this.keys.SHIFT.isDown&&ps.equip&&ps.equip.shield&&ITEMS[ps.equip.shield]);
    if(this._shielding&&!_hadShield){this._shieldFlash(false);} // flash on activation
    // Update persistent shield ring position
    if(this._shieldRing){
      if(this._shielding){this._shieldRing.setPosition(p.x,p.y).setVisible(true);}
      else{this._shieldRing.setVisible(false);}
    } else if(this._shielding){
      this._shieldRing=this.add.circle(p.x,p.y,24,0x4488ff,0.20).setDepth(9);
    }
    var L=k.LEFT.isDown||k.A.isDown, R=k.RIGHT.isDown||k.D.isDown;
    var U=k.UP.isDown||k.W.isDown, D=k.DOWN.isDown||k.S.isDown;
    // Track direction key timestamps for 45° aim modifier
    if(!this._lastDirPress)this._lastDirPress={L:0,R:0,U:0,D:0};
    var _now=Date.now();
    if(L)this._lastDirPress.L=_now; if(R)this._lastDirPress.R=_now;
    if(U)this._lastDirPress.U=_now; if(D)this._lastDirPress.D=_now;
    if(L){vx=-baseSpd;p.dir='left';p.weapon.setPosition(-14,-2);}
    if(R){vx= baseSpd;p.dir='right';p.weapon.setPosition(14,-2);}
    if(U){vy=-baseSpd;if(!L&&!R)p.dir='up';}
    if(D){vy= baseSpd;if(!L&&!R)p.dir='down';}
    if(vx&&vy){vx*=.707;vy*=.707;}
    var _mm=MX.moveMods(this); if(_mm.rev){vx=-vx;vy=-vy;} vx*=_mm.mult; vy*=_mm.mult;   // monster effects: slow / root / charm
    var nx=p.x+vx*dt, ny=p.y+vy*dt;
    var tileAtX=this.tiles[Math.floor(p.y/TILE)]?this.tiles[Math.floor(p.y/TILE)][Math.floor(p.x/TILE)]:T.OCEAN;
    var onTree=tileAtX===T.TREE;
    if(onTree&&!mount){nx=p.x+vx*dt*.33;ny=p.y+vy*dt*.33;}
    if(this._canGo(nx,p.y,mount))p.x=nx;
    if(this._canGo(p.x,ny,mount))p.y=ny;
    if(vx||vy)p._bobPhase+=dt*8;
    var bob=Math.sin(p._bobPhase)*2*(vx||vy?1:0);
    p.head.setY(-12+bob);
    p.cont.setPosition(p.x,p.y); p.cont.setDepth(WR_DEPTH(p.y));
    if(p.sprite){
      _heroAnimate(this, p.sprite, p, vx, vy, dt, this.worldAtkTimer, this.worldBowTimer);
    }
    // Mount icon overhead — hidden for 'horse' since the rider sprite already
    // shows the horse. Other mounts (alligator, boar, lava unicorn, dragon,
    // sky eagle) still show their emoji so you can tell what you're riding.
    var _mtDrawn=CHX.mountTick(this,p,mount,!!(vx||vy),dt);   // pixel mount under the hero (10g)
    p.mountLbl.setText(mount && mount!=='horse' && !_mtDrawn ? (MOUNTS[mount].icon) : '');
    p.eyeL.setY(p.dir==='up'?-16:-13);
    p.eyeR.setY(p.dir==='up'?-16:-13);
    p.body.setFillStyle(mount?0x8844aa:0x4488dd);
    // Body tint: skip damage blink during phantom veil
    if(this.worldIFrames>0&&!(this._phantomTimer>0))
      p.body.setFillStyle(Math.floor(this.worldIFrames*10)%2===0?0xff4444:(mount?0x8844aa:0x4488dd));
    // Berserker tint (only when not being hit)
    if(this._berserkerTimer>0&&this.worldIFrames<=0&&!(this._phantomTimer>0))p.body.setFillStyle(0xff4422);
    // Phantom veil: ghost alpha + purple tint
    if(this._phantomTimer>0){
      p.cont.setAlpha(0.28+(Math.sin(Date.now()*0.012)*0.12));
      p.body.setFillStyle(0xccaaff);
    } else if(!mount){p.cont.setAlpha(1);}
    if(Phaser.Input.Keyboard.JustDown(k.SPACE))this._worldAttack();
  }

  // Returns aim angle (radians) based on player facing + 45° diagonal modifier.
  // If a perpendicular direction key was pressed within 100 ms before calling, the
  // angle is shifted 45° toward that key (e.g. facing right + Up pressed → NE).
  _getAimAngle(){
    var p=this.player;
    var dir=p.dir||'down';
    var dv={right:[1,0],left:[-1,0],down:[0,1],up:[0,-1]};
    var pv=dv[dir]||[0,1];
    if(!this._lastDirPress)this._lastDirPress={L:0,R:0,U:0,D:0};
    var now=Date.now();
    var W=100; // ms window for 45° modifier
    var isH=(dir==='right'||dir==='left');
    var mx=0,my=0;
    if(isH){
      if(now-this._lastDirPress.U<=W)my=-1;
      else if(now-this._lastDirPress.D<=W)my=1;
    } else {
      if(now-this._lastDirPress.R<=W)mx=1;
      else if(now-this._lastDirPress.L<=W)mx=-1;
    }
    return Math.atan2(pv[1]+my,pv[0]+mx);
  }

  // ── Shield helpers ───────────────────────────────────────────────────────
  _applyShieldToDmg(rawDmg){
    if(!this._shielding)return rawDmg;
    var ps=this.playerState;
    if(!ps.equip||!ps.equip.shield)return rawDmg;
    var si=ITEMS[ps.equip.shield]; if(!si)return rawDmg;
    var sdef=si.def||0;
    var blockChance=0.15+sdef*0.02; // 15% + 2% per DEF point
    if(Math.random()<blockChance){
      this._floatText(this.player.x,this.player.y-42,'🛡️ BLOCKED!','#88ffcc');
      this._shieldFlash(true);
      return 0;
    }
    this._shieldFlash(false);
    return Math.max(1,Math.ceil(rawDmg*0.75)); // 25% passive reduction
  }
  _shieldFlash(fullBlock){
    var p=this.player;
    var col=fullBlock?0x00ffcc:0x4488ff;
    var r=fullBlock?34:26;
    var vis=this.add.circle(p.x,p.y,r,col,fullBlock?0.70:0.50).setDepth(16);
    this.tweens.add({targets:vis,radius:r+16,alpha:0,duration:fullBlock?380:220,
      onComplete:function(){vis.destroy();}});
  }

  // ── Special ability update tick ──────────────────────────────────────────
  _updateSpecials(dt){
    if(!this.player)return;
    var p=this.player,self=this;
    // Cooldown
    if(this._specialCd>0)this._specialCd=Math.max(0,this._specialCd-dt);
    // Time Slow timer (engine monsters near the hero run at 30% — see 09c)
    if(this._timeSlow>0){ this._timeSlow=Math.max(0,this._timeSlow-dt); if(this._tsRing){ this._tsRing.setPosition(p.x,p.y); if(this._timeSlow<=0){ this._tsRing.destroy(); this._tsRing=null; } } }
    // Sprint timer
    if(this._sprintTimer>0){
      this._sprintTimer-=dt;
      if(this._sprintTimer<=0){this._sprintTimer=0;}
    }
    // Berserker timer
    if(this._berserkerTimer>0){
      this._berserkerTimer-=dt;
      if(this._berserkerTimer<=0){
        this._berserkerTimer=0;
        p.body.setFillStyle(0x4488dd);
        this._floatText(p.x,p.y-30,'Berserker ended','#ff8844');
      }
    }
    // Phantom veil timer
    if(this._phantomTimer>0){
      this._phantomTimer-=dt;
      if(this._phantomTimer<=0){
        this._phantomTimer=0;
        this.worldIFrames=Math.max(0,this.worldIFrames); // don't extend
        p.cont.setAlpha(1);
        this._floatText(p.x,p.y-30,'Phantom Veil ended','#ccaaff');
      }
    }
    // Smoke bomb lifetime
    if(this._smokeBomb&&this._smokeBomb.life>0){
      this._smokeBomb.life-=dt;
      if(this._smokeBomb.life<=0)this._smokeBomb=null;
    }
  }

  // ── Use equipped special ability ─────────────────────────────────────────
  _useSpecial(){
    var ps=this.playerState,self=this,p=this.player;
    if(!ps.equip||!ps.equip.special){
      showNotif('No special ability equipped! Open inventory → Special slot.','#ff8844');
      return;
    }
    var item=ITEMS[ps.equip.special];
    if(!item||!item.skillId){return;}
    if(!((this._specialCd||0)>0)&&['war_stomp','whirlwind','shield_bash','berserker','meteor','time_slow'].indexOf(item.skillId)>=0)this._mountCombat();   // fighting skills make you jump off
    if((this._specialCd||0)>0){
      showNotif('Special on cooldown: '+Math.ceil(this._specialCd)+'s remaining','#aaaaaa');
      return;
    }
    var _cdr=this.calcPlayerStats().cdReduce||0;
    this._specialCd=(item.cd||8)*(1-_cdr);
    var id=item.skillId;
    var ang=this._getAimAngle();
    var stats=this.calcPlayerStats();

    if(id==='sprint'){
      this._sprintTimer=3.0;
      this._floatText(p.x,p.y-32,'🏃 SPRINT!','#88ffcc');
      // Speed trail for 3 s
      var _trailCount=0;
      var _trailEv=self.time.addEvent({delay:80,repeat:36,callback:function(){
        var tr=self.add.circle(p.x,p.y,6,0x44ccff,0.45).setDepth(8);
        self.tweens.add({targets:tr,alpha:0,duration:240,onComplete:function(){tr.destroy();}});
      }});

    } else if(id==='roll'){
      var dist=TILE*3,sx=p.x,sy=p.y;
      var tx=p.x+Math.cos(ang)*dist,ty=p.y+Math.sin(ang)*dist;
      this.worldIFrames=Math.max(this.worldIFrames,0.65);
      this._floatText(p.x,p.y-32,'🔄 ROLL!','#88ccff');
      var steps=16,step=0;
      self.time.addEvent({delay:16,repeat:steps-1,callback:function(){
        step++;var t=step/steps;
        var nx=sx+(tx-sx)*t,ny=sy+(ty-sy)*t;
        if(self._canGo(nx,p.y))p.x=nx;
        if(self._canGo(p.x,ny))p.y=ny;
        p.cont.setPosition(p.x,p.y);
        var tr=self.add.circle(p.x,p.y,8,0x88ccff,0.50).setDepth(8);
        self.tweens.add({targets:tr,alpha:0,duration:220,onComplete:function(){tr.destroy();}});
      }});

    } else if(id==='blink'){
      var dist=TILE*5;
      var tx=p.x+Math.cos(ang)*dist,ty=p.y+Math.sin(ang)*dist;
      // Flash at origin
      var fo=self.add.circle(p.x,p.y,22,0xaaddff,0.75).setDepth(16);
      self.tweens.add({targets:fo,radius:40,alpha:0,duration:300,onComplete:function(){fo.destroy();}});
      p.x=tx;p.y=ty;p.cont.setPosition(tx,ty);
      var fd=self.add.circle(tx,ty,22,0xaaddff,0.75).setDepth(16);
      self.tweens.add({targets:fd,radius:40,alpha:0,duration:300,onComplete:function(){fd.destroy();}});
      self.worldIFrames=Math.max(self.worldIFrames,0.4);
      self._floatText(tx,ty-32,'✨ BLINK!','#aaddff');

    } else if(id==='war_stomp'){
      var sw=self.add.circle(p.x,p.y,8,0xff8800,0.55).setDepth(12);
      self.tweens.add({targets:sw,radius:96,alpha:0,duration:600,onComplete:function(){sw.destroy();}});
      self.cameras.main.shake(160,0.009);
      self._floatText(p.x,p.y-32,'👊 WAR STOMP!','#ff8800');
      var stompDmg=Math.ceil(stats.atk*0.8+5);
      self.worldMonsters.forEach(function(m){
        if(m.dead)return;
        if(Math.hypot(m.x-p.x,m.y-p.y)<96){
          m.hp=Math.max(0,m.hp-stompDmg);
          m.hpFill.displayWidth=Math.max(0,28*(m.hp/m.maxHp));
          m._stun=(m._stun||0)+1.5;
          self._floatText(m.x,m.y-22,'-'+stompDmg,'#ff8800');
          if(m.hp<=0)self._worldMonsterDied(m);
        }
      });

    } else if(id==='whirlwind'){
      var ww=self.add.circle(p.x,p.y,8,0x88ffee,0.50).setDepth(12);
      self.tweens.add({targets:ww,radius:64,alpha:0,duration:520,onComplete:function(){ww.destroy();}});
      self._floatText(p.x,p.y-32,'🌀 WHIRLWIND!','#88ffee');
      var wwDmg=Math.ceil(stats.atk*1.2);
      self.worldMonsters.forEach(function(m){
        if(m.dead)return;
        var dd=Math.hypot(m.x-p.x,m.y-p.y);
        if(dd<64){
          m.hp=Math.max(0,m.hp-wwDmg);
          m.hpFill.displayWidth=Math.max(0,28*(m.hp/m.maxHp));
          var ka=Math.atan2(m.y-p.y,m.x-p.x);
          m.x+=Math.cos(ka)*64;m.y+=Math.sin(ka)*64;
          m.cont.setPosition(m.x,m.y);
          self._floatText(m.x,m.y-22,'-'+wwDmg,'#88ffee');
          if(m.hp<=0)self._worldMonsterDied(m);
        }
      });

    } else if(id==='smoke_bomb'){
      var smk=self.add.circle(p.x,p.y,4,0x888888,0.65).setDepth(11);
      self.tweens.add({targets:smk,radius:72,alpha:0.45,duration:450});
      var _sbLife=4.0;
      self._smokeBomb={x:p.x,y:p.y,r:72,vis:smk,life:_sbLife};
      self.time.delayedCall(4000,function(){
        self.tweens.add({targets:smk,alpha:0,duration:600,onComplete:function(){smk.destroy();}});
      });
      self._floatText(p.x,p.y-32,'💨 SMOKE BOMB!','#aaaaaa');

    } else if(id==='shield_bash'){
      if(!ps.equip||!ps.equip.shield){
        showNotif('Shield Bash requires a shield equipped!','#ff8844');
        this._specialCd=0;return;
      }
      var dist=TILE*2.5,bx2=p.x+Math.cos(ang)*dist,by2=p.y+Math.sin(ang)*dist;
      var sx2=p.x,sy2=p.y,steps2=14,step2=0;
      self.worldIFrames=Math.max(self.worldIFrames,0.45);
      self.time.addEvent({delay:14,repeat:steps2-1,callback:function(){
        step2++;var t=step2/steps2;
        var nx2=sx2+(bx2-sx2)*t,ny2=sy2+(by2-sy2)*t;
        if(self._canGo(nx2,p.y))p.x=nx2;
        if(self._canGo(p.x,ny2))p.y=ny2;
        p.cont.setPosition(p.x,p.y);
      }});
      var shieldDef=ITEMS[ps.equip.shield].def||0;
      var bashDmg=Math.ceil(stats.atk*1.0+shieldDef*0.5);
      var bashed=false;
      self.worldMonsters.forEach(function(m){
        if(m.dead||bashed)return;
        if(Math.hypot(m.x-p.x,m.y-p.y)<TILE*3.5){
          bashed=true;
          m.hp=Math.max(0,m.hp-bashDmg);
          m.hpFill.displayWidth=Math.max(0,28*(m.hp/m.maxHp));
          m._stun=(m._stun||0)+2.0;
          self._floatText(m.x,m.y-22,'🛡️ -'+bashDmg+' BASH!','#88ccff');
          if(m.hp<=0)self._worldMonsterDied(m);
        }
      });
      self._floatText(p.x,p.y-32,'🛡️ SHIELD BASH!','#88ccff');

    } else if(id==='berserker'){
      this._berserkerTimer=5.0;
      this._floatText(p.x,p.y-32,'⚔️ BERSERKER!','#ff4422');
      var bvs=self.add.circle(p.x,p.y,8,0xff4400,0.55).setDepth(12);
      self.tweens.add({targets:bvs,radius:48,alpha:0,duration:440,onComplete:function(){bvs.destroy();}});
      p.body.setFillStyle(0xff4422);

    } else if(id==='second_wind'){
      var healAmt=Math.ceil(ps.maxHp*0.30);
      ps.hp=Math.min(ps.maxHp,ps.hp+healAmt);
      this._floatText(p.x,p.y-32,'+'+healAmt+' HP 💚','#44ff88');
      var hvs=self.add.circle(p.x,p.y,8,0x44ff88,0.55).setDepth(12);
      self.tweens.add({targets:hvs,radius:40,alpha:0,duration:440,onComplete:function(){hvs.destroy();}});
      self._emitUI();

    } else if(id==='time_slow'){
      this._timeSlow=4.0;
      if(this._tsRing)this._tsRing.destroy();
      this._tsRing=self.add.circle(p.x,p.y,220,0x9fe8ff,0.08).setStrokeStyle(2,0x9fe8ff,0.5).setDepth(6);
      var tsf=self.add.circle(p.x,p.y,10,0x9fe8ff,0.5).setDepth(12);
      self.tweens.add({targets:tsf,radius:220,alpha:0,duration:500,onComplete:function(){tsf.destroy();}});
      this._floatText(p.x,p.y-32,'⏳ TIME SLOW!','#9fe8ff');

    } else if(id==='meteor'){
      // target: the nearest living enemy to the aim point (or the aim point itself)
      var aimX=p.x+Math.cos(ang)*TILE*4, aimY=p.y+Math.sin(ang)*TILE*4, tgt=null, bd=TILE*9;
      self.worldMonsters.forEach(function(m){ if(m.dead)return; var d=Math.hypot(m.x-aimX,m.y-aimY); if(d<bd){bd=d;tgt=m;} });
      var mx0=tgt?tgt.x:aimX, my0=tgt?tgt.y:aimY, mR=64, mDmg=Math.ceil(stats.atk*2.4+12);
      var mark=self.add.circle(mx0,my0,mR,0xff6020,0.12).setStrokeStyle(2,0xff8040,0.8).setDepth(6);
      var rock=self.add.circle(mx0-160,my0-260,12,0xffa040,1).setStrokeStyle(3,0xff4010,0.9).setDepth(20);
      this._floatText(p.x,p.y-32,'☄️ METEOR!','#ff9040');
      self.tweens.add({targets:rock,x:mx0,y:my0,duration:600,ease:'Quad.easeIn',onComplete:function(){
        rock.destroy(); mark.destroy(); self.cameras.main.shake(220,0.012);
        var boom=self.add.circle(mx0,my0,10,0xffc060,0.8).setDepth(12);
        self.tweens.add({targets:boom,radius:mR+10,alpha:0,duration:450,onComplete:function(){boom.destroy();}});
        self.worldMonsters.forEach(function(m){ if(m.dead)return; if(Math.hypot(m.x-mx0,m.y-my0)<mR+(m.def&&m.def.r||10)){
          MX._src='spell'; m.hp=Math.max(0,m.hp-mDmg); MX._src=null; if(m.hpFill)m.hpFill.displayWidth=Math.max(0,28*(m.hp/m.maxHp));
          if(m._m)m._m.burn=Math.max(m._m.burn||0,3); self._floatText(m.x,m.y-22,'-'+mDmg,'#ff9040');
          if(m.hp<=0)self._worldMonsterDied(m); } });
      }});

    } else if(id==='phantom_veil'){
      this._phantomTimer=3.0;
      this.worldIFrames=Math.max(this.worldIFrames,3.0);
      this._floatText(p.x,p.y-32,'👻 PHANTOM VEIL!','#ccaaff');
      var pvs=self.add.circle(p.x,p.y,8,0xccaaff,0.55).setDepth(12);
      self.tweens.add({targets:pvs,radius:36,alpha:0,duration:400,onComplete:function(){pvs.destroy();}});
    }
  }

  _spawnBogPatch(x,y,radius,life){
    if(!this._bogPatches)this._bogPatches=[];
    var g=this.add.graphics().setDepth(6);
    g.fillStyle(0x226622,0.55);
    g.fillEllipse(x,y,radius*2,radius*1.2);
    g.lineStyle(2,0x44aa44,0.4);
    g.strokeEllipse(x,y,radius*2,radius*1.2);
    var patch={x:x,y:y,r:radius,life:life,maxLife:life,g:g};
    this._bogPatches.push(patch);
  }
  _updateBogPatches(dt){
    if(!this._bogPatches)return;
    this._bogPatches=this._bogPatches.filter(function(bp){
      bp.life-=dt;
      if(bp.life<=0){bp.g.destroy();return false;}
      // Fade out as life drains
      bp.g.setAlpha(Math.min(1,bp.life/bp.maxLife*1.5));
      return true;
    });
  }
  _canGo(nx,ny,mount){
    var hw=8,hh=6;
    var corners=[[nx-hw,ny-hh],[nx+hw,ny-hh],[nx-hw,ny+hh],[nx+hw,ny+hh],[nx,ny]];
    for(var i=0;i<corners.length;i++){
      var cx=corners[i][0],cy=corners[i][1];
      var tx=Math.floor(cx/TILE),ty=Math.floor(cy/TILE);
      if(tx<0||tx>=WORLD_W||ty<0||ty>=WORLD_H)return false;
      var tileVal=this.tiles[ty]?this.tiles[ty][tx]:T.OCEAN;
      if(!canPassTile(tileVal,mount))return false;
      if(this._mxFx&&MX.blocked(this,cx,cy))return false;
      // Section lock
      var sec=getTileSection(tx,ty);
      if(sec>0&&!this.playerState.unlockedSections.includes(sec))return false;
    }
    return true;
  }

  _castSpell(){
    var ps=this.playerState;
    if(!ps.equip||!ps.equip.spell)return;
    var tomeItem=ITEMS[ps.equip.spell];
    if(!tomeItem||!tomeItem.spellId)return;
    var spDef=SPELL_DATA[tomeItem.spellId];
    if(!spDef)return;
    // Check mana and cooldown
    if((ps.mana||0)<spDef.manaCost){showNotif('Not enough mana! (need '+spDef.manaCost+')','#4466ff');return;}
    if((this._spellCd||0)>0)return;
    ps.mana=Math.max(0,(ps.mana||0)-spDef.manaCost);
    this._spellCd=spDef.cooldown;
    this._mountCombat();
    var self=this;
    // Staff cast animation: spinning particle ring burst
    (function(){
      var castX=self.player.x,castY=self.player.y;
      var spellCol=spDef.proj?spDef.proj.col:(spDef.aoe?spDef.aoe.col:0xaaddff);
      var numParticles=8;
      for(var ci=0;ci<numParticles;ci++){
        var baseAng=(ci/numParticles)*Math.PI*2;
        var r0=14, r1=40;
        var px0=castX+Math.cos(baseAng)*r0, py0=castY+Math.sin(baseAng)*r0;
        var px1=castX+Math.cos(baseAng)*r1, py1=castY+Math.sin(baseAng)*r1;
        var orb=self.add.circle(px0,py0,4,spellCol,0.9).setDepth(20);
        self.tweens.add({targets:orb,x:px1,y:py1,alpha:0,scaleX:0.3,scaleY:0.3,
          duration:280,delay:ci*18,ease:'Cubic.out',
          onComplete:function(tw,targets){targets[0].destroy();}});
      }
      // Inner glow flash
      var glow=self.add.circle(castX,castY,18,spellCol,0.5).setDepth(19);
      self.tweens.add({targets:glow,alpha:0,scaleX:2.2,scaleY:2.2,duration:250,ease:'Power2',
        onComplete:function(tw,targets){targets[0].destroy();}});
      // Staff weapon spin flash
      var wep2=self.player.weapon;
      if(wep2){
        wep2.setFillStyle(spellCol);
        self.tweens.add({targets:wep2,angle:wep2.angle+360,duration:300,ease:'Linear',
          onComplete:function(){if(wep2)wep2.setFillStyle(0xcccccc);}});
      }
    })();
    // Direction-based aiming: facing direction + optional 45° modifier
    var px=this.player.x,py=this.player.y;
    var _aimAng=this._getAimAngle();
    var nx=Math.cos(_aimAng),ny=Math.sin(_aimAng);
    var _spStats=this.calcPlayerStats();
    var atkPow=Math.round(Math.max(5,tomeItem.atk||12)*(_spStats.spellMult||1.0));
    // Dispatch by spell type
    var id=tomeItem.spellId;
    if(!this._playerProj)this._playerProj=[];
    if(!this._spellClouds)this._spellClouds=[];
    if(spDef.proj){
      // Projectile spells
      var count=spDef.proj.count||1;
      for(var pi=0;pi<count;pi++){
        var ang=Math.atan2(ny,nx);
        if(count>1){ang+=((pi-(count-1)/2)*(spDef.proj.spread||0.3));}
        var vx2=Math.cos(ang)*spDef.proj.spd;
        var vy2=Math.sin(ang)*spDef.proj.spd;
        var vis2=self.add.circle(px,py,spDef.proj.r,spDef.proj.col).setDepth(15);
        var delay2=(spDef.proj.burstDelay||0)*pi;
        (function(v,vx3,vy3,d){
          if(d>0){
            self.time.delayedCall(d*1000,function(){
              v.setPosition(px,py);
              v.setActive(true);
              self._playerProj.push({vis:v,x:px,y:py,vx:vx3,vy:vy3,dmg:atkPow,life:2.5,hit:false,
                type:'spell',effect:spDef.effect,effectDur:spDef.effectDur,
                pierce:spDef.proj.pierce||false,chainN:spDef.chainN||0,splashR:spDef.splashR||0,
                col:spDef.proj.col});
            });
          } else {
            self._playerProj.push({vis:v,x:px,y:py,vx:vx3,vy:vy3,dmg:atkPow,life:2.5,hit:false,
              type:'spell',effect:spDef.effect,effectDur:spDef.effectDur,
              pierce:spDef.proj.pierce||false,chainN:spDef.chainN||0,splashR:spDef.splashR||0,
              col:spDef.proj.col});
          }
        })(vis2,vx2,vy2,delay2);
      }
    } else if(id==='flame_nova'){
      // Instant AoE burst around player
      self._spellNovaEffect(px,py,spDef.aoe.r,spDef.aoe.col,atkPow,'fire');
    } else if(spDef.delay&&spDef.aoe){
      // Meteor / Starfall: impacts ahead in the aim direction after a short delay
      var nImp=spDef.n||1;
      for(var ii=0;ii<nImp;ii++)(function(ii){ var tx2=px+nx*200+(nImp>1?(Math.random()-0.5)*150:0), ty2=py+ny*200+(nImp>1?(Math.random()-0.5)*120:0);
        var ind=self.add.circle(tx2,ty2,spDef.aoe.r,spDef.aoe.col,0.22).setDepth(14);
        self.tweens.add({targets:ind,alpha:0.5,duration:400,yoyo:true});
        self.time.delayedCall((spDef.delay+ii*0.18)*1000,function(){
          ind.destroy();
          self._spellNovaEffect(tx2,ty2,spDef.aoe.r,spDef.aoe.col,atkPow*(nImp>1?1:1.5),'fire');
          self.cameras.main.shake(nImp>1?90:200,nImp>1?0.006:0.012);
        }); })(ii);
    } else if(id==='thunder_step'){
      // Teleport forward, lightning at origin
      var oldX=px,oldY=py;
      var newX=px+nx*spDef.teleportDist,newY=py+ny*spDef.teleportDist;
      self.player.x=newX;self.player.y=newY;self.player.cont.setPosition(newX,newY);
      self._spellNovaEffect(oldX,oldY,spDef.aoe.r,spDef.aoe.col,atkPow,'stun');
      self.worldIFrames=0.5;
    } else if(spDef.cloud){
      // Lingering cloud: Poison Mist on you, Blizzard where you aim
      var clx=spDef.cloud.at==='aim'?px+nx*160:px, cly=spDef.cloud.at==='aim'?py+ny*160:py;
      var cloud=self.add.circle(clx,cly,spDef.cloud.r,spDef.cloud.col,0.35).setDepth(14);
      self._spellClouds.push({vis:cloud,x:clx,y:cly,r:spDef.cloud.r,life:spDef.cloud.dur,st:spDef.cloud.st,
        dps:Math.max(spDef.poisonDps||4,spDef.cloud.st?atkPow*0.3:0),dmgTick:0,dmgInterval:0.5,atk:atkPow});
      self._floatText(clx,cly-30,spDef.cloud.st==='slow'?'🌨️ Blizzard':'☁️ Poison Mist',spDef.cloud.st==='slow'?'#c8f0ff':'#44cc44');
    }
    this._emitUI();
  }
  _spellNovaEffect(cx,cy,radius,col,dmg,effect){
    // Visual ring burst
    var self=this;
    var ring=this.add.circle(cx,cy,4,col,0.9).setDepth(15);
    this.tweens.add({targets:ring,scaleX:radius/4,scaleY:radius/4,alpha:0,duration:350,
      onComplete:function(){ring.destroy();}});
    // Damage all monsters in radius
    this.worldMonsters.forEach(function(mon){
      if(mon.dead)return;
      if(Math.hypot(mon.x-cx,mon.y-cy)>radius||!_heroLOS(self,cx,cy,mon.x,mon.y))return;
      var def=(mon.monDef!==undefined?mon.monDef:mon.def.def)||0;
      var d=Math.max(1,Math.round(dmg)-def+Math.floor(Math.random()*3));
      mon.hp-=d;
      self._floatText(mon.x,mon.y-mon.def.r-10,'-'+d,'#ff8844');
      mon.body.setFillStyle(0xffffff);
      var bRef=mon.body,dRef=mon.def;
      self.time.delayedCall(120,function(){if(!mon.dead)mon.body.setFillStyle(dRef.color);});
      mon.hpFill.displayWidth=28*Math.max(0,mon.hp/mon.maxHp);
      if(effect==='slow')mon._slow=1.5;
      if(effect==='stun')mon._slow=2.0;
      if(mon.hp<=0)self._worldMonsterDied(mon);
    });
  }
  _updateSpellClouds(dt){
    if(!this._spellClouds||!this._spellClouds.length)return;
    var self=this;
    this._spellClouds=this._spellClouds.filter(function(cl){
      cl.life-=dt;
      if(cl.life<=0){cl.vis.destroy();return false;}
      cl.vis.setAlpha(Math.min(0.45,cl.life*0.15));
      cl.dmgTick=(cl.dmgTick||0)+dt;
      if(cl.dmgTick>=cl.dmgInterval){
        cl.dmgTick=0;
        self.worldMonsters.forEach(function(mon){
          if(mon.dead)return;
          if(Math.hypot(mon.x-cl.x,mon.y-cl.y)>cl.r||!_heroLOS(self,cl.x,cl.y,mon.x,mon.y))return;
          var d=Math.max(1,Math.ceil(cl.dps*cl.dmgInterval));
          if(cl.st==='slow')mon._slow=1.2;
          mon.hp-=d;
          self._floatText(mon.x,mon.y-mon.def.r-8,'-'+d+'☠','#44cc44');
          mon.hpFill.displayWidth=28*Math.max(0,mon.hp/mon.maxHp);
          if(mon.hp<=0)self._worldMonsterDied(mon);
        });
      }
      return true;
    });
  }
  _updateSpells(dt){/* replaced by _updatePlayerProj + _updateSpellClouds */}
  _updatePlayerProj(dt){
    if(!this._playerProj||!this._playerProj.length)return;
    var self=this;
    if(this._spellCd)this._spellCd=Math.max(0,this._spellCd-dt);
    this._playerProj=this._playerProj.filter(function(pr){
      if(!pr||!pr.vis)return false;
      pr.life-=dt;
      if(pr.life<=0){
        // Bog flame leaves a floor slow-puddle when it expires
        if(pr.bog){
          if(!self._dngBogPuddles)self._dngBogPuddles=[];
          var _bp=self.add.circle(pr.x,pr.y,18,0x2a6a30,0.45).setDepth(3);
          self._dngBogPuddles.push({x:pr.x,y:pr.y,r:18,vis:_bp,life:4.0});
        }
        pr.vis.destroy();return false;
      }
      // Heat-seeking: steer toward nearest live monster
      if(pr.tracking||pr.subtype==='heat'){
        var best=null,bestD=9999;
        self.worldMonsters.forEach(function(m){
          if(m.dead)return;
          var d=Math.hypot(m.x-pr.x,m.y-pr.y);
          if(d<bestD&&_heroLOS(self,pr.x,pr.y,m.x,m.y)){bestD=d;best=m;}
        });
        if(best){
          var spd=Math.hypot(pr.vx,pr.vy)||300;
          var ta=Math.atan2(best.y-pr.y,best.x-pr.x);
          var ca=Math.atan2(pr.vy,pr.vx);
          var diff=ta-ca;
          while(diff>Math.PI)diff-=Math.PI*2;
          while(diff<-Math.PI)diff+=Math.PI*2;
          ca+=diff*Math.min(1,dt*3.5);
          pr.vx=Math.cos(ca)*spd;pr.vy=Math.sin(ca)*spd;
        }
      }
      pr.x+=pr.vx*dt; pr.y+=pr.vy*dt;
      pr.vis.setPosition(pr.x,pr.y);
      // Wall collision: destroy player projectile if it hits a blocking tile
      var _pptx=Math.floor(pr.x/TILE),_ppty=Math.floor(pr.y/TILE);
      var _pptile=(self.tiles[_ppty]||[])[_pptx];if(_pptile===undefined)_pptile=T.OCEAN;
      if(PROJ_WALL_TILES.has(_pptile)){pr.vis.destroy();return false;}
      if(_pptile===T.TREE){
        var _ptk=_pptx+','+_ppty;
        if(pr._lastTreeTile!==_ptk){pr._lastTreeTile=_ptk;pr.treePen=(pr.treePen===undefined?10:pr.treePen)-1;if(pr.treePen<=0){pr.vis.destroy();return false;}}
      }else{pr._lastTreeTile=null;}
      // Hit detection (skip if already hit and not piercing)
      if(pr.hit&&!pr.pierce)return false;
      var hitAny=false;
      self.worldMonsters.forEach(function(mon){
        if(mon.dead||(pr.hit&&!pr.pierce))return;
        var hitR=mon.def.r+6;
        if(Math.hypot(mon.x-pr.x,mon.y-pr.y)>hitR)return;
        // Hit!
        pr.hit=true;hitAny=true;
        var monDef=(mon.monDef!==undefined?mon.monDef:mon.def.def)||0;
        var dmg=Math.max(1,pr.dmg-monDef+Math.floor(Math.random()*3));
        MX._src='ranged'; mon.hp-=dmg; MX._src=null;
        self._floatText(mon.x,mon.y-mon.def.r-10,'-'+dmg,'#aaddff');
        mon.body.setFillStyle(0xffffff);
        var bRef=mon.body,dRef=mon.def;
        self.time.delayedCall(120,function(){if(!mon.dead)mon.body.setFillStyle(dRef.color);});
        mon.hpFill.displayWidth=28*Math.max(0,mon.hp/mon.maxHp);
        // Special effects
        var eff=pr.effect||pr.subtype;
        if(eff==='cold'||eff==='slow'){mon._slow=pr.effectDur||2.0;}
        if(eff==='fire'||eff==='splash'){
          // Explosion visual
          var ex=self.add.circle(pr.x,pr.y,8,0xff6600,0.9).setDepth(16);
          self.tweens.add({targets:ex,scaleX:6,scaleY:6,alpha:0,duration:300,onComplete:function(){ex.destroy();}});
          // Splash damage
          var splR=pr.splashR||70;
          self.worldMonsters.forEach(function(mon2){
            if(mon2.dead||mon2===mon)return;
            if(Math.hypot(mon2.x-pr.x,mon2.y-pr.y)>splR||!_heroLOS(self,pr.x,pr.y,mon2.x,mon2.y))return;
            var d2=Math.max(1,Math.floor(dmg*0.5));
            mon2.hp-=d2;self._floatText(mon2.x,mon2.y-mon2.def.r-8,'-'+d2+'🔥','#ff8800');
            mon2.hpFill.displayWidth=28*Math.max(0,mon2.hp/mon2.maxHp);
            if(mon2.hp<=0)self._worldMonsterDied(mon2);
          });
          pr.vis.destroy();return;
        }
        if(eff==='root'||eff==='drain'||eff==='kb'||eff==='stun_short')_spellExtraFx(self,mon,eff,dmg,pr.vx,pr.vy,pr.effectDur);
        if(eff==='chain'||eff==='chain_lightning'){
          // Chain to nearby monsters
          var chainCount=pr.chainN||3,lastMon=mon,cx2=pr.x,cy2=pr.y;
          for(var ci=0;ci<chainCount;ci++){
            var best2=null,best2D=200;
            self.worldMonsters.forEach(function(m2){
              if(m2.dead||m2===lastMon)return;
              var d3=Math.hypot(m2.x-lastMon.x,m2.y-lastMon.y);
              if(d3<best2D&&_heroLOS(self,lastMon.x,lastMon.y,m2.x,m2.y)){best2D=d3;best2=m2;}
            });
            if(!best2)break;
            var d4=Math.max(1,Math.floor(dmg*0.7));
            best2.hp-=d4;self._floatText(best2.x,best2.y-best2.def.r-8,'-'+d4+'⚡','#ffff88');
            best2.hpFill.displayWidth=28*Math.max(0,best2.hp/best2.maxHp);
            // Visual arc
            var lg=self.add.graphics().setDepth(15);
            lg.lineStyle(2,0xffff66,0.9);lg.lineBetween(lastMon.x,lastMon.y,best2.x,best2.y);lg.strokePath();
            self.tweens.add({targets:lg,alpha:0,duration:200,onComplete:function(){lg.destroy();}});
            if(best2.hp<=0)self._worldMonsterDied(best2);
            lastMon=best2;
          }
        }
        if(mon.hp<=0)self._worldMonsterDied(mon);
      });
      // Check large animal projectile hits
      if(self._largeAnimals&&!(pr.hit&&!pr.pierce)){
        self._largeAnimals.forEach(function(a){
          if(a.dead)return;
          if(Math.hypot(a.x-pr.x,a.y-pr.y)>a.def.r+8)return;
          self._hitLargeAnimal(a,pr.dmg);
          pr.hit=true;hitAny=true;
        });
      }
      // Auto-expire on any hit if not piercing
      if(hitAny&&!pr.pierce){pr.vis.destroy();return false;}
      return true;
    });
    // Update ammo HUD
    self._updateAmmoHUD();
  }
  _updateAmmoHUD(){
    var ps=this.playerState;
    var el=document.getElementById('ammo-hud');
    var el2=document.getElementById('ammo-type-hud');
    if(!el)return;
    var rw=ps.equip&&ps.equip.rHand?ITEMS[ps.equip.rHand]:null;
    if(!rw){el.textContent='—';if(el2)el2.textContent='—';return;}
    if(rw.magic){
      el.textContent='💧 '+(Math.floor(ps.mana||0))+'/'+ps.maxMana;
      if(el2)el2.textContent='mana';
      return;
    }
    var ammoId=this._getBestAmmo(rw);
    if(!ammoId){el.textContent='No ammo!';el.style.color='#ff6644';if(el2)el2.textContent='none';return;}
    var qty=(ps.ammo&&ps.ammo[ammoId])||0;
    var it=ITEMS[ammoId];
    el.textContent=(it?it.icon:'🏹')+' '+qty;
    el.style.color=qty>5?'#88ccff':qty>0?'#ffaa44':'#ff4444';
    // Show active ammo type label
    if(el2){
      var sub=it?it.subtype:'?';
      var typeColors={normal:'#aaaaaa',cold:'#88ddff',fire:'#ff8844',heat:'#ffaa22'};
      el2.textContent=it?it.icon+' '+(sub||'').charAt(0).toUpperCase()+(sub||'').slice(1):'—';
      el2.style.color=typeColors[sub]||'#88ccff';
    }
  }
  _getBestAmmo(rw){
    var ps=this.playerState;
    var isXbow=rw&&(rw.name||'').toLowerCase().indexOf('cross')>=0;
    var prefix=isXbow?'dart':'arrow';
    // If player has manually selected ammo and it has qty, use it
    var active=ps.activeAmmo;
    if(active&&active.indexOf(prefix)===0&&(ps.ammo&&ps.ammo[active]||0)>0)return active;
    // Otherwise fall through priority order
    var order=[prefix+'_heat',prefix+'_fire',prefix+'_cold',prefix+'_normal'];
    for(var i=0;i<order.length;i++){
      if((ps.ammo&&ps.ammo[order[i]]||0)>0)return order[i];
    }
    return null;
  }
  _cycleAmmo(){
    var ps=this.playerState;
    var rw=ps.equip&&ps.equip.rHand?ITEMS[ps.equip.rHand]:null;
    if(rw&&rw.magic){showNotif('Magic weapon uses mana, not ammo.','#888');return;}
    var isXbow=rw&&(rw.name||'').toLowerCase().indexOf('cross')>=0;
    var prefix=isXbow?'dart':'arrow';
    var all=[prefix+'_heat',prefix+'_fire',prefix+'_cold',prefix+'_normal'];
    // Only include types that have qty > 0
    var avail=all.filter(function(id){return (ps.ammo&&ps.ammo[id]||0)>0;});
    if(!avail.length){showNotif('No ammo available! Buy some at the Armory.','#ff8844');return;}
    var cur=ps.activeAmmo&&avail.indexOf(ps.activeAmmo)>=0?ps.activeAmmo:avail[0];
    var idx=(avail.indexOf(cur)+1)%avail.length;
    ps.activeAmmo=avail[idx];
    var it=ITEMS[ps.activeAmmo];
    showNotif((it?it.icon:'🏹')+' Ammo: '+(it?it.name:ps.activeAmmo),'#88ccff');
    this._updateAmmoHUD();
  }

  _quickUsePotion(){
    if(_inBossRush()){showNotif('🚫 No healing in the boss rush!','#ff4444');return;}
    var ps=this.playerState;
    // Find best available healing item (prefer highest heal value)
    var inv=ps.inventory||[];
    var bestIdx=-1,bestHeal=0;
    inv.forEach(function(id,i){var it=ITEMS[id];if(it&&it.slot==='use'&&(it.heal||0)>bestHeal){bestHeal=it.heal;bestIdx=i;}});
    if(bestIdx===-1){showNotif('No potions in inventory!','#ff8844');return;}
    var id=inv[bestIdx];
    var item=ITEMS[id];
    ps.hp=Math.min(ps.maxHp,ps.hp+(item.heal||0));
    ps.inventory.splice(bestIdx,1);
    showNotif(item.icon+' Used '+item.name+' — +'+item.heal+' HP!','#44ffaa');
    this._emitUI();
  }

  // ─── World Monsters ───────────────────────────
  _initWorldMonsters(){
    this.worldMonsters=[];
    this._spawnRosterPods();   // the 240-monster roster (10f): 80/15/5, terrain, packs, night
    this._pm=null;   // parked-mount sprite (10j) is rebuilt from ps.parkedMount
    try{ this._initFairies(); }catch(e){ console.error('fairies',e); }   // fairies, kings, dig spots (10i)
    // 6 types per section: 4 regulars + 2 elites (boss-tier, rarer)
    // Regular enemy types per section (no bosses in list — bosses spawned separately below)
    var regTypes={
      1:['goblin','skeleton'],
      2:['mud_troll','bog_serpent'],
      3:['stone_golem','harpy'],
      4:['fire_imp','ash_wraith']
    };
    // 1 boss per section (spawned at the end of the section's monster loop)
    var bossTypes={
      1:'goblin_king',2:'swamp_witch',3:'iron_sentinel',4:'shadow_lord'
    };
    var rng=new PRNG(WORLD_SEED+77777);
    var self=this;
    for(var sec=1;sec<=4;sec++){
      // Pod spawning: clusters of 2-10 monsters, ~140 total per section, mixed types
      var podMonsSpawned=0, podMonsTarget=0;   // ~2× the old density over 4× the land
      var podTypes=regTypes[sec]||['goblin'];
      while(podMonsSpawned<podMonsTarget){
        // Find a valid pod center tile
        var _pc=self._randLand(rng,sec); if(!_pc){podMonsSpawned++;continue;}
        var pcTx=_pc.tx,pcTy=_pc.ty;
        // Spawn 2-10 monsters in this pod, mixed types, within ±4 tiles of center
        var podSize=2+Math.floor(rng.next()*9);
        for(var pi=0;pi<podSize&&podMonsSpawned<podMonsTarget;pi++){
          var tx=pcTx+Math.floor((rng.next()-0.5)*8);
          var ty=pcTy+Math.floor((rng.next()-0.5)*8);
          if(tx<0||tx>=WORLD_W||ty<0||ty>=WORLD_H)continue;
          if(!isOnIsland(tx,ty)||getTileSection(tx,ty)!==sec)continue;
          if(ALWAYS_BLOCKED.has(self.tiles[ty]?self.tiles[ty][tx]:T.OCEAN))continue;
          if(Math.hypot(tx-CENTER_X,ty-CENTER_Y)<VILLAGE_RADIUS+12)continue;
          if(self._nearSafeSpot(tx,ty,12))continue;
          var mtype=podTypes[Math.floor(rng.next()*podTypes.length)];
          var mdef=MDEFS[mtype];
          if(!mdef)continue;
          var wx=tx*TILE+TILE/2, wy=ty*TILE+TILE/2;
          var cont=self.add.container(wx,wy).setDepth(9);
          var shadow=self.add.ellipse(0,mdef.r+2,mdef.r*2.2,7,0x000000,.3);
          var body=self.add.circle(0,0,mdef.r,mdef.color);
          var icon=self.add.text(0,0,mdef.icon,{fontSize:'14px',fontFamily:'serif'}).setOrigin(.5,.5);
          var hpBg=self.add.rectangle(0,-(mdef.r+8),28,4,0x000000,.7);
          var hpFill=self.add.rectangle(-14,-(mdef.r+8),28,4,0xff3333).setOrigin(0,.5);
          var monLvMin=mdef.lvMin||1,monLvMax=mdef.lvMax||3;
          // Enforce per-area minimum levels: A2≥8, A3≥15, A4≥25
          var areaMinLv={1:1,2:8,3:15,4:25}[sec]||1;
          monLvMin=Math.max(monLvMin,areaMinLv);
          monLvMax=Math.max(monLvMax,monLvMin);
          var monLevel=monLvMin+Math.floor(rng.next()*(monLvMax-monLvMin+1));
          var monHp=Math.round(mdef.hp*(1+(monLevel-1)*0.08));
          var monAtk=mdef.atk+(monLevel-1);
          var monDef=mdef.def+( mdef.def>=3 ? Math.floor((monLevel-1)*0.4) : 0 );
          var lvCol=monLevel>=15?'#ff4444':monLevel>=10?'#ff8844':monLevel>=5?'#ffdd44':'#88ff88';
          var nameT=self.add.text(0,-(mdef.r+16),mdef.name+' Lv.'+monLevel,{fontSize:'7px',color:'#ffffff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5);
          var lvBadge=self.add.text(0,-(mdef.r+24),'Lv.'+monLevel,{fontSize:'6px',color:lvCol,fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(10);
          cont.add([shadow,body,icon,hpBg,hpFill,nameT,lvBadge]);
          self.worldMonsters.push({
            cont:cont,body:body,hpFill:hpFill,type:mtype,def:mdef,
            hp:monHp,maxHp:monHp,x:wx,y:wy,spawnX:wx,spawnY:wy,
            section:sec,dead:false,respawnTimer:0,level:monLevel,monDef:monDef,monAtk:monAtk,
            state:'wander',wanderVx:0,wanderVy:0,wanderTimer:0,atkTimer:0
          });
          podMonsSpawned++;
        }
      }
      // Spawn exactly 1 boss-tier monster per section
      var btype=bossTypes[sec];
      if(btype&&MDEFS[btype]){
        var _bp=self._randLand(rng,sec,VILLAGE_RADIUS+60), btx=_bp?_bp.tx:0, bty=_bp?_bp.ty:0;
        if(_bp){
          var bmdef=MDEFS[btype];
          var bwx=btx*TILE+TILE/2,bwy=bty*TILE+TILE/2;
          var bcont=self.add.container(bwx,bwy).setDepth(9);
          var bshadow=self.add.ellipse(0,bmdef.r+2,bmdef.r*2.2,7,0x000000,.3);
          var bbody=CHX.bossBody(self,btype,bmdef,bcont)||self.add.circle(0,0,bmdef.r,bmdef.color);
          var bicon=self.add.text(0,0,bbody._ch?'':bmdef.icon,{fontSize:'16px',fontFamily:'serif'}).setOrigin(.5,.5);
          var _bt=bbody._ch?bmdef.r+24:bmdef.r;   // the pixel boss stands taller than the old circle
          var bhpBg=self.add.rectangle(0,-(_bt+10),34,5,0x000000,.7);
          var bhpFill=self.add.rectangle(-17,-(_bt+10),34,5,0xff3333).setOrigin(0,.5);
          var bnameT=self.add.text(0,-(_bt+20),bmdef.name,{fontSize:'8px',color:'#ffdd88',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5);
          var bLvMin=bmdef.lvMin||3,bLvMax=bmdef.lvMax||6;
          var bLevel=bLvMin+Math.floor(rng.next()*(bLvMax-bLvMin+1));
          var bHp=Math.round(bmdef.hp*(1+(bLevel-1)*0.10));
          var bAtk=bmdef.atk+(bLevel-1);
          var bDef=bmdef.def+( bmdef.def>=3 ? Math.floor((bLevel-1)*0.5) : 0 );
          var bLvCol=bLevel>=15?'#ff4444':bLevel>=10?'#ff8844':bLevel>=5?'#ffdd44':'#88ff88';
          var bLvBadge=self.add.text(0,-(_bt+28),'★ Lv.'+bLevel,{fontSize:'7px',color:bLvCol,fontFamily:'Segoe UI',fontStyle:'bold',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(10);
          bcont.add([bshadow,bbody,bicon,bhpBg,bhpFill,bnameT,bLvBadge]);
          self.worldMonsters.push({cont:bcont,body:bbody,hpFill:bhpFill,type:btype,def:bmdef,
            hp:bHp,maxHp:bHp,x:bwx,y:bwy,spawnX:bwx,spawnY:bwy,
            section:sec,dead:false,respawnTimer:120,level:bLevel,monDef:bDef,monAtk:bAtk,state:'wander',atkTimer:2,_md:{}});
        }
      }
    }
    // Spawn large huntable animals (8 total, 2 per section)
    this._initLargeAnimals();
  }


  _canGoMonster(nx,ny){
    var tx=Math.floor(nx/TILE),ty=Math.floor(ny/TILE);
    if(tx<0||tx>=WORLD_W||ty<0||ty>=WORLD_H)return false;
    // Monsters cannot enter the village (section 0 circle)
    if(Math.hypot(tx-CENTER_X,ty-CENTER_Y)<VILLAGE_RADIUS)return false;
    var tv=this.tiles[ty]?this.tiles[ty][tx]:T.OCEAN;
    return !ALWAYS_BLOCKED.has(tv);
  }

  _worldAttack(){
    if(this.worldAtkTimer>0)return;
    this._mountCombat();
    var ps=this.playerState;
    var stats=this.calcPlayerStats();
    this.worldAtkTimer=0.45;
    var p=this.player;
    var wep=p.weapon;
    var dir=p.dir||'right';
    var self=this;
    // ── Directional swing tween ────────────────────────────────────────
    var sw={right:[-50,110,12,-10,16,8],left:[230,70,-12,-10,-16,8],down:[-60,60,10,4,-10,6],up:[120,60,10,-16,-10,-16]};
    var s=sw[dir]||sw.right;
    wep.setAngle(s[0]);wep.setPosition(s[2],s[3]);wep.setFillStyle(0xeeffdd);wep.setSize(5,18);
    this.tweens.add({targets:wep,angle:s[1],x:s[4],y:s[5],duration:160,ease:'Power3',
      onComplete:function(){
        self.tweens.add({targets:wep,angle:dir==='left'?-15:15,x:dir==='left'?-14:14,y:-2,duration:80,
          onComplete:function(){wep.setFillStyle(0xcccccc);wep.setSize(4,16);}});
    }});
    // ── Swoosh arc ─────────────────────────────────────────────────────
    var px=p.x, py=p.y;
    var am={right:{sa:-1.1,ea:1.6,cx:18,cy:0},left:{sa:Math.PI-1.6,ea:Math.PI+1.1,cx:-18,cy:0},
            down:{sa:-0.8,ea:Math.PI+0.8,cx:0,cy:8},up:{sa:Math.PI+0.8,ea:Math.PI*2-0.8,cx:0,cy:-16}};
    var a=am[dir]||am.right;
    var g=self.add.graphics().setDepth(15).setPosition(px+a.cx,py+a.cy);
    g.lineStyle(8,0x88eeff,0.22);g.arc(0,0,28,a.sa,a.ea);g.strokePath();
    g.lineStyle(3,0xccffff,0.88);g.arc(0,0,28,a.sa,a.ea);g.strokePath();
    g.lineStyle(1,0xffffff,1.0);g.arc(0,0,22,a.sa,a.ea);g.strokePath();
    this.tweens.add({targets:g,alpha:0,duration:220,onComplete:function(){g.destroy();}});
    var hit=false;
    this.worldMonsters.forEach(function(mon){
      if(mon.dead)return;
      if(Math.hypot(mon.x-px,mon.y-py)>90)return;
      if(!_heroInArc(dir,mon.x-px,mon.y-py))return;
      if(!_heroLOS(self,px,py,mon.x,mon.y))return;   // no hitting through walls
      var monDefVal=(mon.monDef!==undefined?mon.monDef:mon.def.def)||0;
      var dmg=Math.max(1,stats.atk-monDefVal+Math.floor(Math.random()*4-2));
      MX._src='melee'; mon.hp-=dmg; MX._src=null; hit=true;
      self._floatText(mon.x,mon.y-mon.def.r-10,'-'+dmg,'#ffdd44');
      mon.body.setFillStyle(0xffffff);
      var bodyRef=mon.body,monDef=mon.def;
      self.time.delayedCall(120,function(){if(!mon.dead)mon.body.setFillStyle(monDef.color);});
      mon.hpFill.displayWidth=28*Math.max(0,mon.hp/mon.maxHp);
      if(mon.hp<=0)self._worldMonsterDied(mon);
    });
    // Check large animal melee hits
    if(this._largeAnimals)this._largeAnimals.forEach(function(a){
      if(a.dead)return;
      if(Math.hypot(a.x-px,a.y-py)>90+a.def.r)return;
      if(!_heroInArc(dir,a.x-px,a.y-py))return;
      self._hitLargeAnimal(a,stats.atk);
      hit=true;
    });
    // Axe: chop tree tile in facing direction
    if(ps.equipped&&ps.equipped.lHand==='axe'){
      var _fNx={right:1,left:-1,up:0,down:0}[dir]||0;
      var _fNy={right:0,left:0,up:-1,down:1}[dir]||0;
      var _ftx=Math.floor((p.x+_fNx*TILE*0.75)/TILE);
      var _fty=Math.floor((p.y+_fNy*TILE*0.75)/TILE);
      if(_ftx>=0&&_ftx<WORLD_W&&_fty>=0&&_fty<WORLD_H&&this.tiles[_fty]&&this.tiles[_fty][_ftx]===T.TREE){
        hit=true;
        this.tiles[_fty][_ftx]=T.DIRT;
        this._refreshChunkAt(_ftx,_fty);
        var _logRoll=1+Math.floor(Math.random()*5);
        var _space=Math.max(0,99-(ps.wood||0));
        var _got=Math.min(_logRoll,_space);
        if(_got>0){
          ps.wood=(ps.wood||0)+_got;
          this._floatText(p.x,p.y-32,'+'+_got+' 🪵','#c09050');
          showNotif('🪵 +'+_got+' wood  ('+ps.wood+'/99)','#c08040');
          this._emitUI();
        } else {
          showNotif('🪵 Wood bag full! (99/99)','#ff8844');
        }
      }
    }
    if(!hit)this._floatText(px,py-25,'miss','#666666');
  }

  _worldMonsterDied(mon){
    if(mon.dead)return;
    mon.dead=true;
    var ps=this.playerState;
    var monLv=mon.level||1;
    var lvDiff=monLv-ps.level;
    // XP scales by level difference: beating higher-level = bonus XP, lower = penalty
    var xpMult=lvDiff>=5?3.0:lvDiff>=3?2.0:lvDiff>=1?1.5:lvDiff>=0?1.0:lvDiff>=-3?0.5:lvDiff>=-6?0.15:0.05;
    var xpGain=Math.max(1,Math.floor(mon.def.xp*0.33*xpMult));
    var gGain=Math.floor((mon.def.gMin+Math.floor(Math.random()*(mon.def.gMax-mon.def.gMin+1)))*0.33);
    ps.xp+=xpGain; ps.gold+=gGain;
    var xpColor=lvDiff>=3?'#ffdd44':lvDiff>=1?'#aaddff':lvDiff>=-3?'#88aaff':'#446688';
    this._floatText(mon.x,mon.y-28,'+'+(lvDiff>0?'★':'')+xpGain+' XP',xpColor);
    this._floatText(mon.x,mon.y-40,'+'+gGain+'g','#ffd700');
    this._checkLevelUp(ps);
    mon.respawnTimer=75;
    if(mon.campId)this._campGuardDied(mon);
    var cont=mon.cont;
    this.tweens.add({targets:cont,alpha:0,scaleX:1.4,scaleY:1.4,duration:500,ease:'Power2',onComplete:function(){cont.setAlpha(0);}});
  }

  _levelCap(ps){
    var ul=ps.unlockedSections||[1];
    var maxSec=Math.max.apply(null,ul);
    if(maxSec>=4)return 20;
    if(maxSec>=3)return 15;
    if(maxSec>=2)return 10;
    return 5;
  }
  _checkLevelUp(ps){
    var cap=this._levelCap(ps);
    if(ps.level>=cap){
      // Cap hit — clamp XP so it doesn't accumulate past the cap
      ps.xp=Math.min(ps.xp,(cap*100)-1);
      return;
    }
    var needed=ps.level*100;
    if(ps.xp>=needed){
      ps.xp-=needed;ps.level++;
      var hpGain=5+Math.floor((ps.level-1)/2); // Lv3=6, Lv5=7, Lv7=8...
      var atkGain=1+Math.floor((ps.level-1)/4); // Lv5=2, Lv9=3, Lv13=4...
      ps.maxHp+=hpGain;ps.atk=(ps.atk||3)+atkGain;
      ps.hp=Math.min(ps.hp+hpGain,ps.maxHp);
      var newCap=this._levelCap(ps);
      var capMsg=ps.level>=newCap?' — Level cap reached!':' (cap: '+newCap+')';
      showNotif('⭐ Level '+ps.level+'! +'+atkGain+' ATK, +'+hpGain+' HP'+capMsg,'#ffdd44');
      if(this.player)this._floatText(this.player.x,this.player.y-50,'LEVEL UP!','#ffdd44');
    }
  }

  _floatText(x,y,msg,col){
    var t=domText(this,x,y,msg,{fontSize:'13px',color:col,fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(20);
    this.tweens.add({targets:t,y:y-40,alpha:0,duration:1400,ease:'Power2',onComplete:function(){t.destroy();}});
  }

  // ─── Fog of War ──────────────────────────────
  _expGrid(){ return this.playerState&&this.playerState.exploredGrid; }   // islands (13) keep their own
  _revealFog(){
    var ps=this.playerState, EG=this._expGrid();
    var cellX=Math.floor(this.player.x/TILE/EXP_SCALE);
    var cellY=Math.floor(this.player.y/TILE/EXP_SCALE);
    var newCells=false;
    for(var dy=-EXP_REVEAL_R;dy<=EXP_REVEAL_R;dy++){
      for(var dx=-EXP_REVEAL_R;dx<=EXP_REVEAL_R;dx++){
        if(Math.hypot(dx,dy)>EXP_REVEAL_R)continue;
        var cx=cellX+dx, cy=cellY+dy;
        if(cx>=0&&cx<EXP_W&&cy>=0&&cy<EXP_H){
          if(!EG[cy*EXP_W+cx])newCells=true;
          EG[cy*EXP_W+cx]=1;
        }
      }
    }
    if(newCells){if(!this._expVer)this._expVer=0;this._expVer++;this._worldFogDirty=true;}
  }

  // ─── World Fog of War Canvas Overlay ──────────────────────────────────────
  _initWorldFog(){
    var c=document.getElementById('world-fog-canvas');
    if(!c)return;
    c.width=window.innerWidth;c.height=window.innerHeight;
    this._worldFogCtx=c.getContext('2d');
    this._worldFogLastCellX=-999;this._worldFogLastCellY=-999;
    this._worldFogDirty=true;
    var mh=document.getElementById('minimap-hud');if(mh)mh.style.display='';
  }
  _drawWorldFog(){
    var ctx=this._worldFogCtx;if(!ctx)return;
    var cam=this.cameras.main;
    var ps=this.playerState, EG=this._expGrid&&this._expGrid();if(!ps||!EG)return;
    var sx=cam.scrollX,sy=cam.scrollY,zoom=cam.zoom;
    var cellPx=EXP_SCALE*TILE; // world-pixel size of one EXP cell (256px)
    var cCellX=Math.floor(sx/cellPx),cCellY=Math.floor(sy/cellPx);
    if(cCellX===this._worldFogLastCellX&&cCellY===this._worldFogLastCellY&&!this._worldFogDirty)return;
    this._worldFogLastCellX=cCellX;this._worldFogLastCellY=cCellY;this._worldFogDirty=false;
    // Resize canvas if needed
    var cw=window.innerWidth,ch=window.innerHeight;
    if(ctx.canvas.width!==cw||ctx.canvas.height!==ch){ctx.canvas.width=cw;ctx.canvas.height=ch;}
    ctx.clearRect(0,0,cw,ch);
    ctx.fillStyle='rgba(0,0,0,0.94)';
    var cellLeft=Math.max(0,Math.floor(sx/cellPx)-1);
    var cellTop=Math.max(0,Math.floor(sy/cellPx)-1);
    var cellRight=Math.min(EXP_W-1,Math.ceil((sx+cw/zoom)/cellPx)+1);
    var cellBottom=Math.min(EXP_H-1,Math.ceil((sy+ch/zoom)/cellPx)+1);
    for(var cy2=cellTop;cy2<=cellBottom;cy2++){
      for(var cx2=cellLeft;cx2<=cellRight;cx2++){
        if(EG[cy2*EXP_W+cx2])continue; // explored — clear
        var wx=cx2*cellPx,wy=cy2*cellPx;
        ctx.fillRect((wx-sx)*zoom,(wy-sy)*zoom,cellPx*zoom+1,cellPx*zoom+1);
      }
    }
    // Update HUD minimap
    _drawMinimapHud(this,null);
  }
  _hideWorldFog(){
    var c=document.getElementById('world-fog-canvas');if(c){c.width=1;c.height=1;}
    this._worldFogCtx=null;
    var mh=document.getElementById('minimap-hud');if(mh)mh.style.display='none';
  }

  // Locked regions are now sealed by their borders: the crossings stay shut
  // until the craftsman is freed (10b-world-travel.js). Called on wake/unlock.
  _updateFog(){
    if(this._gateObjs)this._syncGates(true);
  }

  // A safe spot in a region (tile coords): its first waystone.
  _getSectionCenter(sec){
    var w=this.wd&&this.wd.waystones?this.wd.waystones.find(function(q){return q.region===sec;}):null;
    if(w)return{x:w.x,y:w.y+2};
    return{x:CENTER_X,y:CENTER_Y};
  }

  unlockSection(id){
    var ps=this.playerState;
    if(!ps.unlockedSections.includes(id)){
      ps.unlockedSections.push(id);
      this._updateFog();
      this._showNotif('✨ '+SECTION_NAMES[id]+' Unlocked!','#00ffaa');
      this._emitUI();
    }
  }

  currentSection(){
    var tx=Math.floor(this.player.x/TILE),ty=Math.floor(this.player.y/TILE);
    return getTileSection(tx,ty);
  }

  calcPlayerStats(){
    var ps=this.playerState;
    var atk=(ps.atk||3)+(ITEMS[ps.equip?ps.equip.lHand:null]?ITEMS[ps.equip.lHand].atk||0:0);
    var def=(ps.def||0)+
      (ps.equip&&ITEMS[ps.equip.body]?ITEMS[ps.equip.body].def||0:0)+
      (ps.equip&&ITEMS[ps.equip.shield]?ITEMS[ps.equip.shield].def||0:0);
    // Berserker: 2× ATK, −50% DEF
    if(this._berserkerTimer>0){atk=Math.ceil(atk*2);def=Math.floor(def*0.5);}
    // Buff multipliers — +25% per active buff (atk/def). Speed buff is
    // applied directly in the movement formula.
    if(_heroBuffActive(ps,'atkUp'))atk=Math.ceil(atk*1.25);
    if(_heroBuffActive(ps,'defUp'))def=Math.ceil(def*1.25);
    // Aggregate all item stats from equipped slots (spdBonus, manaRegen, cdReduce, maxMana, atk bonus from armor/accessories, def bonus from accessories)
    // rHand and spell atk are used directly in combat formulas — excluded here to avoid double-counting
    var cdReduce=0,manaRegen=0,maxManaBonus=0,spdBonus=0;
    var _atkOnlySlots={lHand:1,rHand:1,mWeapon:1,spell:1}; // ATK already handled or used separately
    var _defOnlySlots={body:1,shield:1};          // DEF already handled above
    // Magic weapon spell multiplier
    var spellMult=1.0;
    if(ps.equip&&ps.equip.mWeapon&&ITEMS[ps.equip.mWeapon]&&ITEMS[ps.equip.mWeapon].spellMult){
      spellMult=ITEMS[ps.equip.mWeapon].spellMult;
    }
    if(ps.equip){
      var _eqSlots=['lHand','rHand','mWeapon','body','shield','head','feet','pants','gauntlets','neck','back','spell','special'];
      for(var _ri=1;_ri<=10;_ri++)_eqSlots.push('ring'+_ri);
      for(var _si=0;_si<_eqSlots.length;_si++){
        var _sl=_eqSlots[_si];
        var _it=ITEMS[ps.equip[_sl]];
        if(!_it)continue;
        if(_it.cdReduce)cdReduce+=_it.cdReduce;
        if(_it.manaRegen)manaRegen+=_it.manaRegen;
        if(_it.maxMana)maxManaBonus+=_it.maxMana;
        if(_it.spdBonus)spdBonus+=_it.spdBonus;
        // Add ATK from armor/accessories (not from weapon slots — those are handled elsewhere)
        if(_it.atk&&!_atkOnlySlots[_sl])atk+=_it.atk;
        // Add DEF from accessories/armor not already counted in init
        if(_it.def&&!_defOnlySlots[_sl])def+=_it.def;
      }
    }
    cdReduce=Math.min(0.80,cdReduce);
    manaRegen=Math.min(4.0,manaRegen);
    // Update maxMana dynamically
    ps.maxMana=50+maxManaBonus;
    return{atk:atk,def:def,cdReduce:cdReduce,manaRegen:manaRegen,spdBonus:spdBonus,spellMult:spellMult};
  }

  _checkInteraction(){
    if(this._checkFairy&&this._checkFairy())return;
    if(this._checkWaystone&&this._checkWaystone())return;
    var px=this.player.x, py=this.player.y;
    var self=this;
    var nearBuilding=null;
    for(var i=0;i<this.buildings.length;i++){
      var b=this.buildings[i];
      var doorCX=b.worldX+Math.floor(b.w/2)*TILE+TILE/2;
      var doorCY=b.worldY+(b.h-1)*TILE+TILE/2;
      if(Math.hypot(px-doorCX,py-doorCY)<TILE*2){nearBuilding=b;break;}
    }
    // Rescued craftsmen in the village
    if(!nearBuilding&&this._villageNPCs){
      var nearNPC=this._villageNPCs.find(function(n){return Math.hypot(px-n.x,py-n.y)<TILE*1.6;});
      if(nearNPC){
        if(!this._interactPrompt||this._interactPrompt._npc!==nearNPC.id){
          if(this._interactPrompt)this._interactPrompt.destroy();
          this._interactPrompt=domText(this,nearNPC.x,nearNPC.y-30,'[Tab] Talk to '+nearNPC.n,{fontSize:'10px',color:'#ffff88',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20);
          this._interactPrompt._npc=nearNPC.id;
        }
        if(Phaser.Input.Keyboard.JustDown(this.keys.TAB))showNotif(nearNPC.icon+' '+nearNPC.line,'#ffe9a8');
        return;
      } else if(this._interactPrompt&&this._interactPrompt._npc){this._interactPrompt.destroy();this._interactPrompt=null;}
    }
    var nearSite=null;
    if(!nearBuilding){
      for(var i=0;i<this.sites.length;i++){
        var s=this.sites[i];
        if(Math.hypot(px-(s.tx*TILE+TILE*1.5),py-(s.ty*TILE+TILE*1.5))<TILE*2.5){nearSite=s;break;}
      }
    }
    var bnames={tavern:'Tavern',shop:'General Shop',house:'Home',forge:'Blacksmith',guild:'Guild',quest_board:'Quest Board',stables:'Stables',armory:'Armory',clothing:'Clothing',jeweler:'Jeweler',apothecary:'Sorcerer\'s Apothecary',merchant:'Merchant'};
    if(nearBuilding){
      if(!this._interactPrompt){
        var dCX=nearBuilding.worldX+Math.floor(nearBuilding.w/2)*TILE+TILE/2;
        var dCY=nearBuilding.worldY+(nearBuilding.h-1)*TILE+TILE/2;
        this._interactPrompt=this.add.text(dCX,dCY-22,'[Tab] Enter '+(bnames[nearBuilding.type]||nearBuilding.type),
          {fontSize:'10px',color:'#ffff88',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20);
      }
      if(Phaser.Input.Keyboard.JustDown(this.keys.TAB))this._enterBuilding(nearBuilding);
    } else if(nearSite){
      if(!this._interactPrompt){
        this._interactPrompt=this.add.text(nearSite.tx*TILE+TILE*1.5,nearSite.ty*TILE-18,
          '[Tab] Enter '+_siteLabel(nearSite),
          {fontSize:'10px',color:'#ffff88',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20);
      }
      if(Phaser.Input.Keyboard.JustDown(this.keys.TAB))this._enterSite(nearSite);
    } else if(this._meatPickups&&this._meatPickups.length>0){
      // Check for nearby meat pickups
      var nearMeat=null;
      for(var mi2=0;mi2<this._meatPickups.length;mi2++){
        var mp2=this._meatPickups[mi2];
        if(Math.hypot(px-mp2.x,py-mp2.y)<TILE*2){nearMeat=mp2;break;}
      }
      if(nearMeat){
        if(!this._interactPrompt){
          this._interactPrompt=this.add.text(nearMeat.x,nearMeat.y-28,'[Tab] 🍖 Pick up Roast Meat',
            {fontSize:'10px',color:'#ffcc44',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5,1).setDepth(20);
        }
        if(Phaser.Input.Keyboard.JustDown(this.keys.TAB)){
          // Collect the meat
          var ps3=this.playerState;
          if(!ps3.inventory)ps3.inventory=[];
          ps3.inventory.push('roast_meat');
          if(nearMeat.glow)nearMeat.glow.destroy();
          if(nearMeat.label)nearMeat.label.destroy();
          var idx3=this._meatPickups.indexOf(nearMeat);
          if(idx3>=0)this._meatPickups.splice(idx3,1);
          showNotif('🍖 Roast Meat added to inventory! (+40 HP when eaten)','#ffcc44');
          this._emitUI();
          if(this._interactPrompt){this._interactPrompt.destroy();this._interactPrompt=null;}
        }
      } else {
        if(this._interactPrompt){this._interactPrompt.destroy();this._interactPrompt=null;}
      }
    } else {
      if(this._interactPrompt){this._interactPrompt.destroy();this._interactPrompt=null;}
    }
  }

  // Craftsmen freed from the boss towers live in the village square.
  _refreshVillageNPCs(){
    var ps=this.playerState||{}, self=this, have=(ps.rescued||[]);
    if(!this._villageNPCs)this._villageNPCs=[];
    var spots={1:[-5,-4],2:[-2,-4],3:[2,-4],4:[5,-4]};
    have.forEach(function(sec){
      if(self._villageNPCs.some(function(n){return n.sec===sec;}))return;
      var C=CRAFTSMEN[sec]; if(!C)return;
      var x=(CENTER_X+spots[sec][0])*TILE+TILE/2, y=(CENTER_Y+spots[sec][1])*TILE+TILE/2;
      var cim=CHX.sprite(self,'crafts_'+sec,x,y+12,1.5); if(cim)cim.setDepth(WR_DEPTH(y));
      else { self.add.circle(x,y,12,0x6a5a3a,1).setStrokeStyle(2,0xffd27a,0.9).setDepth(4); self.add.text(x,y,C.icon,{fontSize:'14px',fontFamily:'serif'}).setOrigin(.5).setDepth(5); }
      domText(self,x,y-34,C.n,{fontSize:'9px',color:'#ffe9a8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(WR_DEPTH(y)+0.5);
      self._villageNPCs.push({sec:sec,id:C.id,n:C.n,icon:C.icon,line:C.village,x:x,y:y});
    });
  }

  _enterBuilding(building){
    if(typeof Tome!=='undefined')Tome.see('character','npc_'+building.type);
    if(this._interactPrompt){this._interactPrompt.destroy();this._interactPrompt=null;}
    this._cancelHomeCast(false); // cancel homecast silently when entering a building
    var hb=document.getElementById('home-btn');if(hb)hb.style.display='none';
    this.scene.sleep('World');
    this.scene.launch('Building',{building:building,worldScene:this});
    document.getElementById('hud').style.display='none';
  }

  _enterSite(site){
    if(typeof Tome!=='undefined')Tome.see('place','site_'+site.id);
    if(this._interactPrompt){this._interactPrompt.destroy();this._interactPrompt=null;}
    // Respawn check: if away from this site for >60s, allow full replay
    var ps=this.playerState;
    var siteKey=site.id;
    var locked=(this.playerState.lockedSites||[]).includes(site.id);
    if(locked&&site.type!=='harbor'){   // islands stay open (their dungeon/castle has its own replay rules)
      this._showNotif('✅ Already cleared — die in battle to re-enter with fresh enemies!','#44ffaa');return;
    }
    // Cancel homecast and hide button when entering any site
    this._cancelHomeCast(false);
    var hb=document.getElementById('home-btn');if(hb)hb.style.display='none';
    var gate=_bossSiteGate(ps,site,this.wd.sites);
    if(gate&&!gate.open){
      this._showNotif('🔒 '+site.name+' is sealed — clear the other towers & dungeons of the '+(SECTION_NAMES[site.section]||'region')+' first ('+gate.done+'/'+gate.need+'): '+gate.left.map(function(s){return s.name;}).join(', '),'#ffb080');
      if(hb)hb.style.display=''; return;
    }
    if(site.type==='dungeon'||site.type==='tower'){
      var maxFloors=site.floors||({1:3,2:4,3:5,4:6}[site.section]||3);
      // Choose theme: towers use tower palette; dungeons vary by section
      var dngTheme=site.type==='tower'?'tower':({1:'dungeon',2:'dungeon',3:'cave_dungeon',4:'volcano'}[site.section]||'dungeon');
      this.scene.sleep('World');
      this.scene.launch('Dungeon',{site:site,floor:0,maxFloors:maxFloors,worldScene:this,theme:dngTheme});
      document.getElementById('hud').style.display='none';
      document.getElementById('dungeon-hud').style.display='block';
    } else if(site.type==='camp'){
      openCampModal(site,this.playerState,this);
    } else if(site.type==='harbor'){
      this._sailTo(site.section+(site.isle||'a'),'dock');   // the island is a small overworld now (13)
    } else if(site.type==='skyport'){
      this._showSkyportUpgradeShop(site);
    } else if(site.type==='volcano_mini'){
      var keyId=_volcanoKeyForSection(site.section);
      var sceneByMini={volcano_n:{scene:'VolcanoMaze',name:'Ember Key'},
                        volcano_e:{scene:'VolcanoBulletHell',name:'Magma Key'},
                        volcano_s:{scene:'VolcanoPuzzle',name:'Obsidian Key'},
                        volcano_w:{scene:'VolcanoEscape',name:'Ashfire Key'}};
      var target=sceneByMini[site.id];
      if(target){
        this.scene.sleep('World');
        this.scene.launch(target.scene,{site:site,worldScene:this,keyId:keyId,keyName:target.name});
        document.getElementById('hud').style.display='none';
      } else {
        this._showNotif('Unknown volcano','#ff8844');
      }
    } else if(site.type==='volcano_main'){
      var ps2=this.playerState;
      if(_hasAllVolcanoKeys(ps2)){
        showNotif('🌋 The four keys turn — the door opens!','#ff6622');
        this.scene.sleep('World');
        this.scene.launch('VolcanoBossRush',{site:site,worldScene:this});
        document.getElementById('hud').style.display='none';
      } else {
        var held=_volcanoKeysHeld(ps2);
        this._showNotif('🔒 The volcano door has 4 keyholes. '+held+'/4 keys collected.','#ff8844');
      }
    } else {
      this._showNotif(site.type.charAt(0).toUpperCase()+site.type.slice(1)+' — not yet implemented!','#ffaa44');
    }
  }

  _updateSiteLabels(){
    var self=this;
    // Position + visibility for every world-space DOM label. Site labels show
    // when the player is within ~5 tiles. Building labels stay visible at
    // longer range. Both project to screen coords via the camera transform.
    var cam=this.cameras.main;
    var px=this.player.x, py=this.player.y;
    // Use worldView rect → correct under any zoom/origin combo. cam.worldView
    // is the visible world rectangle; scaling to displayWidth/Height gives
    // pixel coords that line up with the canvas.
    // cam.width/height are PIXEL dimensions of the viewport. (cam.displayWidth
    // is world units = pixel/zoom, which would cancel out the zoom in the
    // ratio below — that was the bug.) cam.x/y is the viewport offset
    // (default 0,0) on the canvas.
    var vw=cam.worldView, hostW=cam.width, hostH=cam.height, hostX=cam.x||0, hostY=cam.y||0;
    function project(wx,wy){
      return [hostX + (wx-vw.x)/vw.width*hostW, hostY + (wy-vw.y)/vw.height*hostH];
    }
    // Site labels (close-range)
    this.siteObjs.forEach(function(obj){
      if(!obj.lblEl)return;
      var near=Math.hypot(px-obj.wx,py-obj.wy)<TILE*5;
      var p2=project(obj.wx,obj.wy);
      var onScr=(p2[0]>-100&&p2[0]<hostW+100&&p2[1]>-50&&p2[1]<hostH+50);
      if(near&&onScr){
        _wsLblShow(obj.lblEl,p2[0],p2[1]);
        if(obj.s.boss){ var gt=_bossSiteGate(self.playerState,obj.s,self.wd.sites), txt=_siteLabel(obj.s)+(gt&&!gt.open?'  🔒 '+gt.done+'/'+gt.need:''); if(obj.lblEl.textContent!==txt)obj.lblEl.textContent=txt; }
      } else {
        _wsLblHide(obj.lblEl);
      }
    });
    // Building labels (longer range — visible up to ~15 tiles)
    if(this.buildingLabels){
      this.buildingLabels.forEach(function(obj){
        if(!obj.el)return;
        var near=Math.hypot(px-obj.wx,py-obj.wy)<TILE*15;
        var p3=project(obj.wx,obj.wy);
        var onScr=(p3[0]>-100&&p3[0]<hostW+100&&p3[1]>-50&&p3[1]<hostH+50);
        if(near&&onScr)_wsLblShow(obj.el,p3[0],p3[1]);
        else _wsLblHide(obj.el);
      });
    }
  }

  _showSkyportUpgradeShop(site){
    var ps=this.playerState,self=this;
    var cur=ps.skyportShotUpgrade||0;
    // Build HTML overlay
    var ov=document.createElement('div');
    ov.id='skyport-shop-overlay';
    ov.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,15,.88);z-index:9999;display:flex;align-items:center;justify-content:center;';
    var costs=[50,100,200,400];
    var html='<div style="background:#050c1a;border:1px solid #4488aa;border-radius:10px;padding:20px 28px;min-width:320px;text-align:center;">';
    html+='<div style="font-size:16px;color:#aaddff;font-family:Segoe UI;font-weight:bold;margin-bottom:4px">🎈 Skyport Pre-Flight Shop</div>';
    html+='<div style="font-size:9px;color:#668;font-family:Segoe UI;margin-bottom:12px">Purchased upgrades persist across all Sky Ports</div>';
    html+='<div style="font-size:11px;color:#ffd700;font-family:Segoe UI;margin-bottom:14px">💰 Gold: '+ps.gold+'g &nbsp;|&nbsp; Current shot DMG: '+(2+cur)+' per bullet</div>';
    var upgradeLabels=['+1 Shot DMG (2→3)  50g','+2 Shot DMG (2→4)  100g','+3 Shot DMG (2→5)  200g','+4 Shot DMG (2→6)  400g'];
    for(var ui=0;ui<4;ui++){
      var owned=(cur>ui)?'✅ ':'';
      var canBuy=(ps.gold>=costs[ui]&&cur<=ui);
      html+='<div onclick="window._skyBuy('+ui+')" style="cursor:'+(canBuy?'pointer':'default')+';background:'+(cur===ui+1?'rgba(68,200,120,.15)':(canBuy?'rgba(68,120,200,.08)':'rgba(0,0,0,.1)'))+';border:1px solid '+(cur>ui?'rgba(68,200,120,.4)':(canBuy?'rgba(68,120,200,.4)':'rgba(50,50,80,.3)'))+';border-radius:5px;padding:7px 10px;margin-bottom:6px;font-family:Segoe UI;font-size:10px;color:'+(canBuy?'#aaccff':'#556')+'">';
      html+=owned+upgradeLabels[ui]+'</div>';
    }
    html+='<button onclick="window._skyEnter()" style="margin-top:10px;background:#225;border:1px solid #4488aa;color:#aaddff;border-radius:5px;padding:7px 22px;font-size:12px;cursor:pointer;font-family:Segoe UI">Launch ✈️</button>';
    html+='</div>';
    ov.innerHTML=html;
    document.body.appendChild(ov);
    // Pause world simulation while the pre-flight shop is open. (Without
    // this, monsters/projectiles keep ticking under the overlay.)
    if(self.scene&&self.scene.pause)self.scene.pause();
    window._skyBuy=function(tier){
      if(ps.gold<costs[tier]){showNotif('Not enough gold!','#ff4444');return;}
      if((ps.skyportShotUpgrade||0)>tier){return;} // already have higher
      ps.gold-=costs[tier];
      ps.skyportShotUpgrade=tier+1;
      ov.querySelectorAll('[onclick^="window._skyBuy"]').forEach(function(el,i){
        var cu2=ps.skyportShotUpgrade||0;
        el.style.background=i<cu2?'rgba(68,200,120,.15)':'rgba(68,120,200,.08)';
        el.style.borderColor=i<cu2?'rgba(68,200,120,.4)':'rgba(68,120,200,.4)';
        el.style.color=i<cu2?'#88ff88':(i===cu2?'#aaccff':'#556');
      });
      ov.querySelector('[style*="font-size:11px"]').textContent='💰 Gold: '+ps.gold+'g  |  Current shot DMG: '+(2+(ps.skyportShotUpgrade||0))+' per bullet';
      showNotif('✈️ Shot upgrade +'+ps.skyportShotUpgrade+' purchased!','#aaddff');
    };
    window._skyEnter=function(){
      document.body.removeChild(ov);
      // Resume so the next sleep() transitions cleanly, then sleep + launch Sky.
      if(self.scene&&self.scene.resume)self.scene.resume();
      self.scene.sleep('World');
      self.scene.launch('Sky',{site:site,worldScene:self});
      document.getElementById('hud').style.display='none';
      document.getElementById('dungeon-hud').style.display='none';
    };
  }

  _showNotif(msg,col){
    showNotif(msg,col||'#ffffff');
    var p=this.player;
    var t=domText(this,p.x,p.y-60,msg,{fontSize:'14px',color:col||'#ffffff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:4,align:'center'}).setOrigin(.5).setDepth(20);
    this.tweens.add({targets:t,y:t.y-50,alpha:0,duration:2200,ease:'Power2',onComplete:function(){t.destroy();}});
  }

  acceptQuest(questKey){
    this.playerState.activeQuest=questKey;
    this._showNotif('Quest Accepted!','#ffdd44');
    this._emitUI();
  }

  _emitUI(){
    if(!this.player)return;
    var ps=this.playerState;
    var stats=this.calcPlayerStats();
    var _sec=this.currentSection();
    var _secTheme={1:'grasslands',2:'desert',3:'forest',4:'volcanic'};
    if(this._lastThemeSec!==_sec){this._lastThemeSec=_sec;applyTheme(_secTheme[_sec]||'grasslands');}
    updateHUD(Object.assign({},ps,{atk:stats.atk,def:stats.def,section:_sec}));
    renderQuestList(ps.unlockedSections,ps.completedQuests,ps.activeQuest,this);
    renderMinimap(this.wd,this.player,ps.unlockedSections,ps.exploredGrid,this._expVer||0,ps.activeQuest);
    // (no Home button — waystones are the way back; the village waystone is free)
  }

  // ── Homecast — 3-second channelled teleport back to village ──────────────
  _startHomeCast(){
    if(this._homeCastActive)return; // already casting
    this._homeCastActive=true;
    this._homeCastTimer=0;
    this._homeCastHit=false;
    var ov=document.getElementById('homecast-overlay');
    var bar=document.getElementById('homecast-bar');
    if(ov)ov.style.display='';
    if(bar)bar.style.width='0%';
    showNotif('🏠 Channelling… (3s)','#88ffcc');
  }
  _cancelHomeCast(msg){
    if(!this._homeCastActive)return;
    this._homeCastActive=false;
    this._homeCastTimer=0;
    var ov=document.getElementById('homecast-overlay');
    if(ov)ov.style.display='none';
    if(msg!==false)showNotif('🚫 '+(msg||'Homecast interrupted!'),'#ff8866');
  }
  _tickHomeCast(dt){
    if(!this._homeCastActive)return;
    // Cancel if player took damage this frame
    if(this._homeCastHit){this._cancelHomeCast('Hit! Homecast cancelled.');return;}
    var CAST_TIME=3;
    this._homeCastTimer+=dt;
    var pct=Math.min(1,this._homeCastTimer/CAST_TIME);
    var bar=document.getElementById('homecast-bar');
    if(bar)bar.style.width=(pct*100)+'%';
    if(this._homeCastTimer>=CAST_TIME){
      // Teleport to village center
      this._homeCastActive=false;
      var ov=document.getElementById('homecast-overlay');
      if(ov)ov.style.display='none';
      var hx=CENTER_X*TILE+TILE/2, hy=CENTER_Y*TILE+TILE/2;
      this.player.x=hx; this.player.y=hy;
      this.player.cont.setPosition(hx,hy);
      this.cameras.main.centerOn(hx,hy);
      this.worldIFrames=1.5; // brief invincibility on arrival
      showNotif('🏠 Returned home!','#88ffcc');
      this._emitUI();
    }
  }

  _save(){
    try{
      var d=Object.assign({},this.playerState,{px:this.player.x,py:this.player.y});
      delete d.exploredGrid; // don't stringify typed array
      delete d.exploredGridArr;
      d.exploredBits=_packBits(this.playerState.exploredGrid);   // v8: bit-packed (08-save.js)
      _prepareSave(d);
      localStorage.setItem('qoz_v2',JSON.stringify(d));
    }catch(e){}
  }
  _loadSave(){
    try{
      var raw=localStorage.getItem('qoz_v2');
      var d=JSON.parse(raw||'null');
      if(!d)return;
      d=_migrateSave(d,raw);
      if(d.exploredBits){
        d.exploredGrid=_unpackBits(d.exploredBits,EXP_W*EXP_H);
        delete d.exploredBits;
      } else if(d.exploredGridArr){   // pre-v8 format (normally converted by _migrateSave)
        var arr=new Uint8Array(EXP_W*EXP_H);
        for(var i=0;i<Math.min(d.exploredGridArr.length,arr.length);i++)arr[i]=d.exploredGridArr[i];
        d.exploredGrid=arr;
        delete d.exploredGridArr;
      } else {
        d.exploredGrid=new Uint8Array(EXP_W*EXP_H);
      }
      if(!d.ownedMounts)d.ownedMounts=[];
      if(!d.unlockedSections)d.unlockedSections=[1];
      Object.assign(this.playerState,d);
      // Guard: fill any missing equip slots added since save
      var eq=this.playerState.equip=this.playerState.equip||{};
      ['lHand','rHand','mWeapon','body','shield','head','feet','pants','gauntlets','neck','back','spell','special'].forEach(function(s){if(eq[s]===undefined)eq[s]=null;});
      for(var _r=1;_r<=10;_r++){var _k='ring'+_r;if(eq[_k]===undefined)eq[_k]=null;}
      if(!this.playerState.ownedFamiliars)this.playerState.ownedFamiliars=[];
      if(!this.playerState.completedIslands)this.playerState.completedIslands=[];
      if(this.playerState.familiar2===undefined)this.playerState.familiar2=null;
      if(this.playerState.familiar3===undefined)this.playerState.familiar3=null;
      _famMigrate(this.playerState);
      if(!this.playerState.skills)this.playerState.skills=[];
      if(!this.playerState.ammo)this.playerState.ammo={arrow_normal:20};
      if(!this.playerState.mana)this.playerState.mana=50;
      if(!this.playerState.maxMana)this.playerState.maxMana=50;
      if(!this.playerState.dungeonFog)this.playerState.dungeonFog={};
      if(d.px&&d.py){this.player.x=d.px;this.player.y=d.py;this.player.cont.setPosition(d.px,d.py);}
    }catch(e){}
  }
}

