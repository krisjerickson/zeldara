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
// ═══════════════════════════════════════════════════════════════════════
// ║ HARBOR ISLANDS (round 6) — an island is now a small overworld: the
// ║ IslandScene extends WorldScene, so movement, mounts (parked + Call Mount),
// ║ combat and line of sight, the monster engine, camps, familiars, spells,
// ║ the HUD, day/night, fog of war and the minimap all come from the
// ║ mainland code. The map is a Lab island design (07jb, ISLAND_PICK) laid
// ║ into a world-size grid far from the mainland village (ISL_OX/OY), so the
// ║ world renderer (05c/10c) paints it like any other land.
// ║ On each island: the dock (sail home), a village (trader + healing well,
// ║ safe from monsters), a waystone, two monster camps and the adventure
// ║ entrance (the island dungeon / tower, or the castle gate).
// ═══════════════════════════════════════════════════════════════════════
var ISL_OX=100, ISL_OY=100, ISL_N=96;   // the island's corner in the grid (tiles) and its size
var _ISL_WD=null;                       // the last island built (cache)
function _islKeyOf(site){ return (site&&site.section||1)+'' +((site&&site.isle)||'a'); }
function _islDesignFor(key){ return ISLAND_DESIGN_BY_ID[ISLAND_PICK[key]]||ISLAND_DESIGNS.find(function(Z){ return Z.quad===+key[0]; }); }
function _islName(key){ var q=+key[0], h=key[1]; if(h==='a')return (HARBOR_ISLANDS[q]||{}).name||'Island'; var C=typeof CASTLE_ISLANDS!=='undefined'&&CASTLE_ISLANDS['q'+q+'_'+h]; return C?C.name:'Island'; }
function _islAt(p){ return {x:ISL_OX+p[0], y:ISL_OY+p[1]}; }
// the gameplay tile for an island design kind
function _islKindT(k,q){ if(k.id==='sea')return T.OCEAN; if(k.lava)return T.DEEP_MAGMA; if(k.liquid&&k.solid)return T.DEEP_WATER; if(k.liquid||k.id==='shallow')return T.SHALLOW_WATER;
  if(k.wall)return T.CLIFF; if(k.id==='rock'||k.id==='basaltrim')return T.ROCK; if(k.solid)return T.PROP; if(k.id==='sand')return T.SAND; if(k.id==='pier'||k.id==='walk')return T.BRIDGE; if(k.id==='plaza')return T.STONE_FLOOR; if(k.id==='path')return T.PATH;
  return WZ_GROUND_T[q]||T.GRASS; }
function _buildIslandWorld(key,castle){
  var pick=ISLAND_PICK[key]; if(_ISL_WD&&_ISL_WD.islKey===key&&_ISL_WD.pick===pick)return _ISL_WD;
  _wkInit(); var Z=_islDesignFor(key), q=+key[0], W=WORLD_W, H=WORLD_H, N=W*H, c=buildWorld(Z,Z.seed,{layoutOnly:true}), K=c.K;
  // tiles is an array of rows: every row outside the island's box shares ONE read-only sea row
  // (nothing writes outside the box: design cells, props and the entrance are all inside it; the
  // axe only turns TREE tiles to DIRT). kind/zone/region/cls are flat W×H arrays (indexed y*W+x
  // everywhere), so they stay full size.
  var seaRow=new Uint8Array(W); seaRow.fill(T.OCEAN);
  var tiles=[]; for(var y=0;y<H;y++){ if(y<ISL_OY||y>=ISL_OY+ISL_N){ tiles.push(seaRow); continue; } var row=new Uint8Array(W); row.fill(T.OCEAN); tiles.push(row); }
  var kind=new Uint16Array(N); kind.fill(Z.ground._gi); var zone=new Uint8Array(N); zone.fill(255); var region=new Uint8Array(N); region.fill(q); var cls=new Uint8Array(N); cls.fill(WM.OCEAN);
  for(var ly=0;ly<ISL_N;ly++)for(var lx=0;lx<ISL_N;lx++){ var k=K[c.t[ly*ISL_N+lx]], X=ISL_OX+lx, Y=ISL_OY+ly, i=Y*W+X, t=_islKindT(k,q);
    tiles[Y][X]=t; kind[i]=k._gi; cls[i]=t===T.OCEAN?WM.OCEAN:(t===T.SAND||t===T.SHALLOW_WATER||t===T.BRIDGE)?WM.BEACH:WM.LAND; }
  // the village is safe ground (region 0: monsters don't follow you in)
  var V=_islAt(ISL_ANCH.village); for(var vy=-6;vy<=6;vy++)for(var vx=-8;vx<=8;vx++){ if(Math.hypot(vx/8,vy/6)<=1)region[(V.y+vy)*W+V.x+vx]=0; }
  // props from the design (solid ones block)
  var props=[]; c.obst.forEach(function(ob){ props.push({prop:ob.prop,x:ISL_OX+ob.x,y:ISL_OY+ob.y,w:ob.w,h:ob.h,o:ob.o,zi:-1,Z:Z});
    if(ob.o.solid!==false)for(var a=0;a<ob.h;a++)for(var b=0;b<ob.w;b++){ var X2=ISL_OX+ob.x+b, Y2=ISL_OY+ob.y+a; if(!ALWAYS_BLOCKED.has(tiles[Y2][X2]))tiles[Y2][X2]=T.PROP; } });
  var byChunk={}; props.forEach(function(p){ var c0=Math.floor((p.x-2)/WCH), c1=Math.floor((p.x+p.w+1)/WCH), r0=Math.floor((p.y-2)/WCH), r1=Math.floor((p.y+p.h+1)/WCH);
    for(var cy=r0;cy<=r1;cy++)for(var cx=c0;cx<=c1;cx++){ var kk=cx+'_'+cy; (byChunk[kk]=byChunk[kk]||[]).push(p); } });
  var landmarks=c.landmarks.map(function(L){ return {x:(ISL_OX+L.x)*LT,y:(ISL_OY+L.y)*LT,w:L.w*LT,h:L.h*LT,text:L.text,zone:Z.id}; });
  var ley=c.ley.map(function(L){ var pts=L.pts.map(function(p){ return [ISL_OX+p[0],ISL_OY+p[1]]; }), xs=pts.map(function(p){return p[0];}), ys=pts.map(function(p){return p[1];});
    return {pts:pts,col:L.col,bx0:Math.min.apply(null,xs),bx1:Math.max.apply(null,xs),by0:Math.min.apply(null,ys),by1:Math.max.apply(null,ys)}; });
  var shafts=(c.m.shafts||[]).map(function(sh){ return {canvas:sh.canvas,x:sh.x+ISL_OX*LT,y:sh.y+ISL_OY*LT,a:sh.a,sway:sh.sway}; });
  var area={x:(ISL_OX+8)*LT,y:(ISL_OY+8)*LT,w:(ISL_N-16)*LT,h:(ISL_N-16)*LT}, stampParts=[];
  (Z.particles||[]).concat(c.m.particles||[]).forEach(function(P){ var a=P.area?{x:P.area.x+ISL_OX*LT,y:P.area.y+ISL_OY*LT,w:P.area.w,h:P.area.h}:area; stampParts.push(Object.assign({},P,{area:a,_w:1})); });
  // the adventure entrance: a site door like the mainland's (3×3: wall, door, stone floor)
  var A=_islAt(ISL_ANCH.adv), tx=A.x-1, ty=A.y-1, adv, site;
  if(castle){ site=Object.assign(CastleRun.site(castle.key),{tx:tx,ty:ty,islAdv:true}); }
  else { adv=ISL_ADV[q]||ISL_ADV[1]; site={id:'isl_adv_'+q+'_'+adv.type,type:adv.kind||(adv.type==='tower_island'?'tower':'dungeon'),section:q,design:adv.design,island:true,name:adv.label.replace(/^\S+\s/,''),floors:adv.floors||4,tx:tx,ty:ty,islAdv:true,
    theme:adv.theme||(adv.type==='volcano'?'volcano':adv.type==='tower_island'?'tower_island':'cave_dungeon')}; }
  for(var dy1=0;dy1<3;dy1++)for(var dx1=0;dx1<3;dx1++)tiles[ty+dy1][tx+dx1]=T.STONE_FLOOR;
  for(var dx3=0;dx3<3;dx3++)tiles[ty][tx+dx3]=T.BUILDING_WALL; tiles[ty+2][tx+1]=T.DOOR;
  var WS=_islAt(ISL_ANCH.waystone), waystones=[{id:'wsi_'+key,name:_islName(key)+' Waystone',x:WS.x,y:WS.y,region:q,island:key}];
  var D=_islAt(ISL_ANCH.dock);
  var wd={tiles:tiles,kind:kind,zone:zone,region:region,cls:cls,buildings:[],lines:new Float32Array(0),sites:[site],gates:[],waystones:waystones,caches:[],volcanoAnchors:{},
    props:props,propsByChunk:byChunk,landmarks:landmarks,runeSpots:[{x:ISL_OX+c.sp.x,y:ISL_OY+c.sp.y,zi:255,zone:Z.id}],ley:ley,shafts:shafts,stampParts:stampParts,baseVer:0,
    spawnX:D.x*TILE+TILE/2,spawnY:(D.y-3)*TILE+TILE/2,islKey:key,pick:pick,design:Z,
    box:{x0:ISL_OX,y0:ISL_OY,x1:ISL_OX+ISL_N,y1:ISL_OY+ISL_N}};
  _ISL_WD=wd; return wd;
}

class IslandScene extends WorldScene{
  constructor(){ super('Island'); }
  init(d){ this.worldScene=d.worldScene||game.scene.getScene('World'); this.site=d.site; this._skipCutscene=!!d.skipCutscene; this._arrive=d.arrive||'dock'; this._newGame=false; this._done=false; }
  create(){
    var self=this, ws=this.worldScene, site=this.site||{section:1,isle:'a'};
    this.sec=site.section||1; this.castle=CastleRun.of(site); this.islKey=_islKeyOf(site);
    this.islData=HARBOR_ISLANDS[this.sec]||HARBOR_ISLANDS[1]; if(this.castle)this.islData=_castleIslandData(this.castle,this.islData);
    this.playerState=ws.playerState; var ps=this.playerState;
    // the section grids are global (getTileSection…): swap in the island's while it lives
    this._wgSave={reg:_WREG,zone:_WZONE,cls:_WCLS};
    this._wr=null; this._wrTag='wi'+this.islKey+'_'+(IslandScene._n=(IslandScene._n||0)+1)+'_'; var wd=this.wd=_buildIslandWorld(this.islKey,this.castle);
    _WREG=wd.region; _WZONE=wd.zone; _WCLS=wd.cls;
    this.tiles=wd.tiles; this.sites=wd.sites; this.buildings=[]; this.activeChunks=new Map();
    applyTheme('ocean');
    document.getElementById('dungeon-hud').style.display='none'; document.getElementById('hud').style.display='';
    // the adventure entrance
    this.siteObjs=[]; var lblHost=document.getElementById('world-labels');
    wd.sites.forEach(function(s){ var ico=null;
      var zcg=self.castle&&_scn()&&_scn().image(self,_wsCastleId(self.castle),(s.tx+1.5)*TILE,(s.ty+3)*TILE,_scn().KB,WR_DEPTH((s.ty+3)*TILE));      // painted castle (round 31)
      if(zcg)ico=zcg; else if(self.castle&&_castleGateTex(self,self.castle)){ ico=self.add.image((s.tx+1.5)*TILE,(s.ty+3)*TILE,'castle_gate_'+self.castle.key).setOrigin(.5,1).setScale(1.3).setDepth(WR_DEPTH((s.ty+3)*TILE)); }
      else ico=_wsSiteArt(self,s);
      var el=document.createElement('div'); el.className='wlbl site hidden'; el.textContent=self.castle?'🏰 '+s.name:(ISL_ADV[self.sec]||{}).label||s.name; if(lblHost)lblHost.appendChild(el);
      self.siteObjs.push({s:s,ico:ico,lblEl:el,wx:s.tx*TILE+TILE*1.5,wy:s.ty*TILE-2}); });
    this.buildingLabels=[]; if(lblHost)Array.prototype.forEach.call(lblHost.children,function(el){ if(!self.siteObjs.some(function(o){ return o.lblEl===el; }))el.classList.add('hidden'); });   // the mainland's labels stay hidden here
    // player at the dock (or the waystone when travelling)
    var AD=_islAt(ISL_ANCH.adv), sp=this._arrive==='waystone'?{x:(wd.waystones[0].x)*TILE+TILE/2,y:(wd.waystones[0].y+2)*TILE+TILE/2}:this._arrive==='adv'?{x:AD.x*TILE+TILE/2,y:(AD.y+4)*TILE+TILE/2}:{x:wd.spawnX,y:wd.spawnY};
    this.player=this._createPlayer(sp.x,sp.y);
    this.cameras.main.startFollow(this.player.cont,true,.1,.1);
    this.cameras.main.setBounds((ISL_OX-6)*TILE,(ISL_OY-6)*TILE,(ISL_N+12)*TILE,(ISL_N+12)*TILE);
    this.cameras.main.setZoom(1.4); this.cameras.main.centerOn(sp.x,sp.y);
    this._flowGfx=this.add.graphics().setDepth(1); this._flowTime=0;
    this._lifeGfx=this.add.graphics().setDepth(2); this._lifeTime=0;
    this._animals=[]; this._animalSpawnTimer=0; this._smokeEmitters=[]; this._smokeParticles=[]; this._laundryItems=[]; this._torchData=[]; this._largeAnimals=[]; this._meatPickups=[];
    this.fogObjs=[];
    this.keys=this.input.keyboard.addKeys({UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',W:'W',A:'A',S:'S',D:'D',M:'M',Q:'Q',I:'I',SPACE:'SPACE',P:'P',SHIFT:Phaser.Input.Keyboard.KeyCodes.SHIFT,TAB:Phaser.Input.Keyboard.KeyCodes.TAB});
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    this._interactPrompt=null; this.worldAtkTimer=0; this.worldBowTimer=0; this.worldIFrames=1; this._worldSleepTime=0;
    // fog of war: its own explored grid, kept in the save as the island's cells only
    this._expG=new Uint8Array(EXP_W*EXP_H); var saved=((ps.islFog||{})[this.islKey])||'', ex0=Math.floor(ISL_OX/EXP_SCALE), ey0=Math.floor(ISL_OY/EXP_SCALE), en=Math.ceil(ISL_N/EXP_SCALE)+1;
    for(var i=0;i<saved.length;i++)if(saved[i]==='1')this._expG[(ey0+Math.floor(i/en))*EXP_W+ex0+i%en]=1;
    this._expBox={x0:ex0,y0:ey0,n:en};
    this._initTravel(); this._runicInit(); this._initIslandMonsters(); this._placeIslandNPCs();
    try{ this._initLargeAnimals(); var LA=this._largeAnimals||[]; LA.slice(4).forEach(function(a){ ['cont','gfx','body','label','shadow'].forEach(function(k){ if(a[k]&&a[k].destroy)a[k].destroy(); }); }); this._largeAnimals=LA.slice(0,4); }catch(e){ this._largeAnimals=[]; }   // a few big animals, not a region's worth
    this._revealFog(); this._initWorldFog(); this._emitUI();
    this.events.on('sleep',function(){ self._hideWorldFog(); var lh=document.getElementById('world-labels'); if(lh)lh.style.display='none'; });
    this.events.on('wake',function(){ _heroRestoreMount(self); document.getElementById('hud').style.display=''; document.getElementById('dungeon-hud').style.display='none'; var lh=document.getElementById('world-labels'); if(lh)lh.style.display='block'; self._initWorldFog(); self._worldFogDirty=true; applyTheme('ocean'); self._emitUI(); });
    this.events.once('shutdown',function(){ _WREG=self._wgSave.reg; _WZONE=self._wgSave.zone; _WCLS=self._wgSave.cls;
      (self.siteObjs||[]).forEach(function(o){ if(o.lblEl&&o.lblEl.parentNode)o.lblEl.parentNode.removeChild(o.lblEl); }); self.siteObjs=[]; });
    if(lblHost)lblHost.style.display='block';
    _wpWarmNear(wd,this.player.x,this.player.y,1); this._updateChunks(true); this._ready=true;
    var Q=this.castle?this.islData.questText:this.islData.questText;
    showNotif('⚓ '+this.islData.name+' — '+Q,'#aaddff');
    if(typeof Tome!=='undefined')Tome.see('place','site_'+(site.id||('s'+this.sec+'_harbor')));
  }
  // ── what the mainland does that an island doesn't ──
  _save(){ this._saveFog(); if(this.worldScene)this.worldScene._save(); }
  _saveFog(){ var ps=this.playerState; if(!ps||!this._expG)return; if(!ps.islFog)ps.islFog={}; var B=this._expBox, s='';
    for(var y=0;y<B.n;y++)for(var x=0;x<B.n;x++)s+=this._expG[(B.y0+y)*EXP_W+B.x0+x]?'1':'0'; ps.islFog[this.islKey]=s; }
  _expGrid(){ return this._expG; }
  _villageFolkTick(){} _villageFolkInit(){} _refreshVillageNPCs(){} _initVillageEffects(){} _updateFog(){}
  _tickTravel(dt){ this._travelTick=(this._travelTick||0)+dt; if(this._travelTick<0.12)return; this._travelTick=0; _drawMinimapHud(this,null);
    if(!this._bannerShown){ this._bannerShown=true; var el=document.getElementById('zone-banner'); if(el){ el.querySelector('.zb-name').textContent=this.islData.name; el.querySelector('.zb-reg').textContent=(WM_REGION_NAMES[this.sec]||'')+' · island'; el.classList.add('on'); clearTimeout(this._zbT); this._zbT=setTimeout(function(){ el.classList.remove('on'); },2600); } } }
  _worldPlayerDied(){ _heroDied(this); }
  _playerDied(){ _heroDied(this); }
  // ── monsters: roamers from the quadrant roster + two camps ──
  _initIslandMonsters(){ var self=this, q=this.sec, rng=new PRNG(WORLD_SEED+7700+this.sec*131+'abcd'.indexOf(this.islKey[1])*17);
    this.worldMonsters=[]; this._camps=[]; this._pm=null;
    var types=CAMP_TYPES[q]||CAMP_TYPES[1];
    ISL_ANCH.camps.forEach(function(p,i){ var P=_islAt(p); self._makeCamp(q,P.x,P.y,types[(i*5+'abcd'.indexOf(self.islKey[1]))%types.length],'i'+self.islKey+'_'+i,rng,null); });
    var want=ZDiff.n(this.castle?16:12), got=0;
    for(var a=0;a<3000&&got<want;a++){ var tx=ISL_OX+8+Math.floor(rng.next()*(ISL_N-16)), ty=ISL_OY+8+Math.floor(rng.next()*(ISL_N-16)), k=ty*WORLD_W+tx;
      if(this.wd.cls[k]!==WM.LAND||this.wd.region[k]!==q||ALWAYS_BLOCKED.has(this.tiles[ty][tx])||this.tiles[ty][tx]===T.PROP)continue;
      if(this._nearSafeSpot(tx,ty,10)||this._camps.some(function(C){ return Math.hypot(C.tx-tx,C.ty-ty)<10; }))continue;
      var pick=null; for(var t2=0;t2<8&&(!pick||MON_LEGACY[pick.R.id]);t2++)pick=monPick(rng,q,this.castle?'tow':'main'); if(!pick||MON_LEGACY[pick.R.id])continue;
      if(this._spawnRosterMon(pick.R.id,tx*TILE+TILE/2,ty*TILE+TILE/2,q,rng,{}))got++; } }
  // ── the village: trader, healing well, the dock, and a guide by the path ──
  _placeIslandNPCs(){ var self=this, isl=this.islData; this._islNPCs=[];
    var add=function(kind,anch,spr,label,dy){ var P=_islAt(anch), x=P.x*TILE+TILE/2, y=P.y*TILE+TILE/2, im=CHX.sprite(self,spr,x,y+12,1.45); if(im)im.setDepth(WR_DEPTH(y));
      domText(self,x,y-34,label,{fontSize:'9px',color:'#ffe9a8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(WR_DEPTH(y)+0.5);
      self._islNPCs.push({kind:kind,x:x,y:y+(dy||0)}); };
    add('trader',ISL_ANCH.trader,'isl_trader','Trader');
    add('well',ISL_ANCH.well,'isl_well','Healing well');
    add('guide',ISL_ANCH.guide,'isl_guide',this.castle?'Castle guide':'Guide');
    add('dock',[ISL_ANCH.dock[0],ISL_ANCH.dock[1]-4],'isl_harbor','Harbour master'); }
  _checkInteraction(){
    if(this._checkWaystone&&this._checkWaystone())return;
    var px=this.player.x, py=this.player.y, self=this, near=null;
    (this._islNPCs||[]).forEach(function(n){ if(!near&&Math.hypot(px-n.x,py-n.y)<TILE*1.7)near=n; });
    var s=this.sites[0], nearSite=!near&&s&&Math.hypot(px-(s.tx*TILE+TILE*1.5),py-(s.ty*TILE+TILE*1.5))<TILE*2.5;
    var label=near?({trader:'[Tab] Trade',well:'[Tab] Drink from the well (heal, 10g)',guide:'[Tab] Talk',dock:'[Tab] Sail home'}[near.kind]):nearSite?'[Tab] Enter '+(this.castle?s.name:(ISL_ADV[this.sec]||{}).label||s.name):null;
    if(!label){ if(this._interactPrompt&&!this._interactPrompt._ws){ this._interactPrompt.destroy(); this._interactPrompt=null; } if(this._campTick)return; return; }
    var key=label; if(!this._interactPrompt||this._interactPrompt._k!==key){ if(this._interactPrompt)this._interactPrompt.destroy(); var X=near?near.x:s.tx*TILE+TILE*1.5, Y=near?near.y-44:s.ty*TILE-18;
      this._interactPrompt=domText(this,X,Y,label,{fontSize:'10px',color:'#ffff88',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20); this._interactPrompt._k=key; }
    if(!Phaser.Input.Keyboard.JustDown(this.keys.TAB))return;
    if(nearSite)return this._enterSite(s);
    if(near.kind==='trader')openIslandShop(this.islData,this.playerState,this);
    else if(near.kind==='well')this._useWell();
    else if(near.kind==='dock')this._exitToWorld();
    else if(near.kind==='guide')showNotif('🧭 '+this.islData.questText,'#ffe9a8'); }
  _useWell(){ var ps=this.playerState, cost=10; if(ps.hp>=ps.maxHp){ showNotif('💧 You are already at full health','#aaddff'); return; }
    if(ps.gold<cost){ this._floatText(this.player.x,this.player.y-24,'Need 10g!','#ff4444'); return; }
    ps.gold-=cost; ps.hp=ps.maxHp; this._floatText(this.player.x,this.player.y-24,'Healed! -10g','#44ffaa'); this._emitUI(); }
  _enterSite(site){ if(this._interactPrompt){ this._interactPrompt.destroy(); this._interactPrompt=null; }
    var ps=this.playerState; if(!site.castle&&(ps.lockedSites||[]).indexOf('s'+this.sec+'_harbor'+(this.islKey[1]==='a'?'':'_'+this.islKey[1]))>=0&&(ps.completedIslands||[]).indexOf(this.sec)>=0){ /* cleared: replay is fine */ }
    if(typeof Tome!=='undefined')Tome.see('place','site_'+site.id);
    this._saveFog(); this.scene.sleep('Island');
    this.scene.launch('Dungeon',{site:site,floor:0,maxFloors:site.floors||4,worldScene:this.worldScene,returnScene:'Island',theme:site.castle?'tower':(site.theme||'cave_dungeon')});
    document.getElementById('hud').style.display='none'; document.getElementById('dungeon-hud').style.display='block'; }
  _enterBuilding(){}
  // leave: back to the harbour on the mainland (or straight to a mainland waystone)
  _exitToWorld(toWaystone){ if(this._done)return; this._done=true; this._saveFog();
    var ps=this.playerState, ws=this.worldScene;
    if(ps&&this.site){ if(!ps.siteExitTimes)ps.siteExitTimes={}; ps.siteExitTimes[this.site.id]=Date.now(); }
    if(this._interactPrompt){ this._interactPrompt.destroy(); this._interactPrompt=null; }
    this.scene.stop('Island'); game.scene.wake('World');
    document.getElementById('hud').style.display=''; document.getElementById('dungeon-hud').style.display='none';
    if(ws){ if(toWaystone&&ws._arriveAtWaystone)ws._arriveAtWaystone(toWaystone); ws._emitUI(); ws._save(); } }
}
// the island trader, in the shared shop window (pauses the game like every menu)
function openIslandShop(isl,ps,scene){ document.getElementById('camp-title').textContent='🛒 '+isl.name+' — Trader';
  var h='<p style="font-size:11px;color:#667;margin-bottom:12px">Island goods for your gold.</p>';
  (isl.shopItems||[]).forEach(function(id){ var it=ITEMS[id]; if(!it)return; var price=it.buy||(it.sell*2)||40, ok=ps.gold>=price, stat=it.atk?'ATK +'+it.atk:it.def?'DEF +'+it.def:it.heal?'Heals '+it.heal+' HP':'';
    h+='<div class="shop-item"><div class="si-icon">'+it.icon+'</div><div class="si-info"><div class="si-name">'+it.name+'</div><div class="si-desc">'+stat+(stat?' &nbsp;•&nbsp; ':'')+price+'g</div></div><button class="si-buy" '+(ok?'':'disabled')+' onclick="window._buyItem(\''+id+'\','+price+')">Buy</button></div>'; });
  h+='<p style="font-size:10px;color:#445;margin-top:8px;text-align:center">You have <span style="color:#ffd700">'+ps.gold+'g</span></p>';
  document.getElementById('camp-content').innerHTML=h; toggleModal('camp'); }

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

