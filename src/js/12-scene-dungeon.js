// ─── DungeonScene ───────────────────────────────
// Explored-fog per floor is saved run-length packed ("r<n>,<n>,…" alternating 0/1 runs)
function _fogPack(a){ var out=[],cur=0,n=0; for(var i=0;i<a.length;i++){ var v=a[i]?1:0; if(v===cur)n++; else { out.push(n); cur=v; n=1; } } out.push(n); return 'r'+out.join(','); }
function _fogUnpack(src,len){
  var a=new Uint8Array(len);
  if(typeof src==='string'&&src.charAt(0)==='r'){ var runs=src.slice(1).split(','),p=0,v=0; for(var i=0;i<runs.length&&p<len;i++){ var n=+runs[i]; if(v)for(var k=0;k<n&&p+k<len;k++)a[p+k]=1; p+=n; v^=1; } }
  else if(src&&src.length===len){ for(var j=0;j<len;j++)a[j]=src[j]?1:0; }
  return a;
}
const DNG={WALL:0,FLOOR:1,UP:2,DOWN:3,CHEST:4,BOSS_CHEST:5};
var DW=42,DH=32; // current floor size (Lab-design floors resize these per floor)
class DungeonScene extends Phaser.Scene{
  constructor(){super({key:'Dungeon'})}
  init(data){
    this.siteType=data.site.type;this.siteSection=data.site.section;
    this.siteId=data.site.id;this.floor=data.floor||0;
    this.maxFloors=data.maxFloors||3;
    this.isLastFloor=this.floor===this.maxFloors-1;
    this.worldScene=data.worldScene;this._initData=data;
    this._returnScene=data.returnScene||'World'; // which scene to wake on exit
    this._theme=data.theme||'dungeon'; // 'dungeon','volcano','cave_dungeon','tower_island'
    this._site=data.site; this._arriveAt=data.arriveAt||null;
    this._isIsland=!!(this.siteId&&this.siteId.indexOf('isl_adv_')===0);
    this._isBonus=!!data.site.bonus;
    this._castle=CastleRun.of(data.site);   // castle-island dungeon (07t/09c)
    this._mage=MageRun.of(data.site);       // mage tower (07zm/09e)
    this._inspect=data.inspect||null; // Site Lab (sandbox) inspect options: {mons,fog,dark}
    this._trialRun=data.trial||null; this._trialOver=false; this._tr=null;   // the fairies' trial realm (12b)
  }
  create(){
    _heroStowMount(this);
    window._dngExit=function(){var ds=game.scene.getScene('Dungeon');if(ds)ds._exitToWorld(null);};
    this._ready=false;
    try{
      this._lab=null;this._captive=null;this._entryPx=null;this._exitPx=null;this._spawnPt=null;
      this._darkRT=null;this._heroGlow=null;this._lightObjs=[];this._portalOpen=null;
      this.bossChestTile=null;this.stairsDownTile=null;this.bossSpawnX=undefined;this.bossSpawnY=undefined;
      this._claimed=false;
      var spec=this._trialRun?TrialRealm.spec(this._trialRun):_siteFloorSpec(this._site,this.floor,this.maxFloors);
      // multi-phase guardians: phase 2+ is fought in its own arena (09b-boss-phases.js)
      this._bossPhase=(this._initData.bossPhase)||1; this._bossGroup=null; this._bossKey=null; this._bpEv=null; this._phaseLock=false;
      // bonus (treasure-vault) sites: the last floor is one room — the elite's den
      if(this._isBonus&&this.isLastFloor&&typeof ELITE_ARENAS!=='undefined'){ spec={kind:'dungeon',design:ELITE_ARENAS[this.siteSection]||ELITE_ARENAS[1],seed:(spec&&spec.seed||7)+313,last:true}; }
      if(this._bossPhase>1&&this.isLastFloor&&!this._isIsland&&!this._isBonus){ var abk=this._getBossKey(), aspec=BossPhases.arenaSpec(abk,this._bossPhase,(spec&&spec.seed||7)+this._bossPhase*101); if(aspec)spec=aspec; }
      var isTowerTheme=this.siteType==='tower'||this._theme==='tower_island';
      if(spec){
        // ── Lab-design floor (Phase 3): painted map + y-sorted sprites + lights
        this._buildLabFloor(spec);
        if(this._trialRun&&this.bossChestTile){ this.dtiles[this.bossChestTile.y][this.bossChestTile.x]=DNG.FLOOR; this.bossChestTile=null; }
        if(this.isLastFloor&&!this._trialRun)this._ensureBossArena(this.dtiles);
        this._renderLabMap(this._lab);
        this.cameras.main.setBackgroundColor(this._lab.bg||'#000');
      } else {
        DW=42;DH=32;
        this.dtiles=this._generateDungeon();
        if(this.isLastFloor)this._ensureBossArena(this.dtiles);
        this._renderDungeon();
        // Animated FX layer (runes, embers, drips, torches, mist)
        this._dFXGfx=this.add.graphics().setDepth(1);
        this._dFXTime=0;this._embers=[];this._drips=[];this._mistParticles=[];
        var bgCol=isTowerTheme?'#110a06':({dungeon:'#0a0812',volcano:'#1a0402',cave_dungeon:'#080a04'}[this._theme]||'#0a0812');
        this.cameras.main.setBackgroundColor(bgCol);
      }
      this.cameras.main.setBounds(0,0,DW*TILE,DH*TILE);
      this.cameras.main.setZoom(1.6);
      applyTheme(this._trialRun?'aurora':this.isLastFloor?'blood-moon':isTowerTheme?'aurora':'void');
      this._spawnPlayer();
      this.hero=this.pCont; // Lab map tick functions follow "scene.hero"
      this.monsters=[];this._spawnMonsters();
      this.interactables=[];this._buildInteractables();
      if(this.isLastFloor&&!this._trialRun)this._drawExitPortal();
      if(this._lab)this._drawLabStairs();
      if(this._lab&&this.isLastFloor&&this.siteType==='tower'&&this._site.boss&&!this._isIsland)this._placeCaptive();
      if(this._lab&&this.isLastFloor&&this._castle)CastleRun.placeTeacher(this,this._castle);
      // Restore state for previously visited floors
      var savedState=(this._initData.floorStates||{})[this.floor];
      if(savedState)this._restoreFloorState(savedState);
      this.playerAtkTimer=0;this.playerIFrames=0;
      this._playerDead=false;this._bossDefeated=false;
      this._updateDungeonHUD();
      // Dungeon fog of war — persistent radius-based reveal
      this._initDngFog();
      if((this._bossPhase>1||(this._trialRun&&this._trialRun.stages[this._trialRun.stage]!=='lights_out'))&&this._dngFogExplored){ this._dngFogExplored.fill(1); if(this._dngFogGfx)this._dngFogGfx.setVisible(false); this._dngRevealFog(true); }
      if(this._inspect){
        if(!this._inspect.fog){ this._dngFogExplored.fill(1); this._dngFogGfx.setVisible(false); this._dngRevealFog(true); }
        if(this._inspect.dark===false&&this._darkRT){ this._darkRT.setVisible(false); if(this._heroGlow)this._heroGlow.setVisible(false); }
        _slShowBar(this);
        this.events.once('shutdown',function(){ _slHideBar(); });
      }
      if(this._trialRun)this._trialStartPending=true;
    }catch(err){console.error('DungeonScene.create error:',err);}
    // Keys MUST init outside try-catch — if anything above throws,
    // keys would be undefined and update() would crash on k.LEFT.isDown
    this.keys=this.input.keyboard.addKeys({
      UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',
      W:'W',A:'A',S:'S',D:'D',SPACE:'SPACE',
      SHIFT:Phaser.Input.Keyboard.KeyCodes.SHIFT,
      TAB:Phaser.Input.Keyboard.KeyCodes.TAB
    });
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    this._ready=true;
    if(this._trialStartPending){ this._trialStartPending=false; try{ TrialRealm.start(this); }catch(e){ console.error('trial start',e); } }
  }
  _generateDungeon(){
    var tiles=[];for(var r=0;r<DH;r++)tiles.push(new Uint8Array(DW));
    var seed=this.siteId.split('').reduce(function(a,c){return a+c.charCodeAt(0);},0);
    var rng=new PRNG(WORLD_SEED+seed*997+this.floor*37);
    var isTower=this.siteType==='tower'||this._theme==='tower_island';
    if(isTower){
      // ── Tower: 5 distinct layout types, seeded per floor ──────────────────
      var self=this;
      this.rooms=[];
      var lt=(this.floor * 3 + rng.i(0,3)) % 5; // layout type 0..4 — varies by floor

      // Helpers
      var _mkRoom=function(x1,y1,x2,y2){
        var rm={x:x1,y:y1,w:x2-x1+1,h:y2-y1+1};
        self.rooms.push(rm);
        for(var ty=y1+1;ty<y2;ty++)for(var tx=x1+1;tx<x2;tx++)tiles[ty][tx]=DNG.FLOOR;
        return rm;
      };
      var _cx=function(r){return r.x+Math.floor(r.w/2);};
      var _cy=function(r){return r.y+Math.floor(r.h/2);};
      // 3-wide horizontal corridor
      var _corrH=function(x1,x2,cy){
        var xa=Math.min(x1,x2),xb=Math.max(x1,x2);
        for(var tx=xa;tx<=xb;tx++)for(var off=-1;off<=1;off++){var ty=cy+off;if(ty>=0&&ty<DH)tiles[ty][tx]=DNG.FLOOR;}
      };
      // 3-wide vertical corridor
      var _corrV=function(y1,y2,cx){
        var ya=Math.min(y1,y2),yb=Math.max(y1,y2);
        for(var ty=ya;ty<=yb;ty++)for(var off=-1;off<=1;off++){var tx=cx+off;if(tx>=0&&tx<DW)tiles[ty][tx]=DNG.FLOOR;}
      };
      // L-shaped corridor: horizontal from ax→bx at ay, then vertical from ay→by at bx
      var _corrL=function(ax,ay,bx,by){_corrH(ax,bx,ay);_corrV(ay,by,bx);};

      var upRoom,downRoom;

      if(lt===0){
        // ── Type 0: 3×3 grid, room sizes vary per floor ──────────────────────
        var rW=9+rng.i(0,2),rH=7+rng.i(0,1);
        var grid0=[];
        for(var gr0=0;gr0<3;gr0++)for(var gc0=0;gc0<3;gc0++){
          grid0.push(_mkRoom(1+gc0*(rW+2),1+gr0*(rH+2),1+gc0*(rW+2)+rW,1+gr0*(rH+2)+rH));
        }
        for(var gr0=0;gr0<3;gr0++)for(var gc0=0;gc0<2;gc0++){
          var a0=grid0[gr0*3+gc0],b0=grid0[gr0*3+gc0+1];
          _corrH(a0.x+a0.w-1,b0.x+1,_cy(a0)+rng.i(-1,1));
        }
        for(var gc0=0;gc0<3;gc0++)for(var gr0=0;gr0<2;gr0++){
          var a0=grid0[gr0*3+gc0],b0=grid0[(gr0+1)*3+gc0];
          _corrV(a0.y+a0.h-1,b0.y+1,_cx(a0)+rng.i(-1,1));
        }
        var ui0=rng.i(0,2),di0=6+rng.i(0,2);
        if(di0===6+ui0)di0=6+(ui0+1)%3;
        upRoom=grid0[ui0]; downRoom=grid0[di0];
        self.rooms.splice(self.rooms.indexOf(upRoom),1); self.rooms.unshift(upRoom);

      } else if(lt===1){
        // ── Type 1: Hub + 4 spoke rooms ──────────────────────────────────────
        var hW1=14,hH1=10,hx1=14,hy1=11;
        var hub1=_mkRoom(hx1,hy1,hx1+hW1,hy1+hH1);
        var tsp=_mkRoom(hx1+2,1,hx1+11,7);
        var bsp=_mkRoom(hx1+hW1-11,DH-8,hx1+hW1-2,DH-2);
        var lsp=_mkRoom(1,hy1+2,10,hy1+8);
        var rsp=_mkRoom(DW-11,hy1+hH1-8,DW-2,hy1+hH1-2);
        _corrV(tsp.y+tsp.h-1,hub1.y+1,_cx(tsp));
        _corrV(hub1.y+hub1.h-1,bsp.y+1,_cx(bsp));
        _corrH(lsp.x+lsp.w-1,hub1.x+1,_cy(lsp));
        _corrH(hub1.x+hub1.w-1,rsp.x+1,_cy(rsp));
        upRoom=tsp; downRoom=bsp;
        self.rooms.splice(self.rooms.indexOf(upRoom),1); self.rooms.unshift(upRoom);

      } else if(lt===2){
        // ── Type 2: S-path winding through 5 rooms ───────────────────────────
        var r2_0=_mkRoom(1,1,14,9);
        var r2_1=_mkRoom(27,1,40,9);
        var r2_2=_mkRoom(12,11,29,20);
        var r2_3=_mkRoom(1,22,14,30);
        var r2_4=_mkRoom(27,22,40,30);
        // r0↔r1 horizontal at top
        _corrH(r2_0.x+r2_0.w-1,r2_1.x+1,_cy(r2_0));
        // r1↔r2 L-shape (right wall of r1 → centre of r2)
        _corrL(r2_1.x+r2_1.w-1,_cy(r2_1),_cx(r2_2),r2_2.y+1);
        // r2↔r3 L-shape (centre of r2 → right wall of r3)
        _corrL(r2_3.x+r2_3.w-1,_cy(r2_3),_cx(r2_2),r2_2.y+r2_2.h-1);
        // r3↔r4 horizontal at bottom
        _corrH(r2_3.x+r2_3.w-1,r2_4.x+1,_cy(r2_3));
        upRoom=r2_0; downRoom=r2_4;

      } else if(lt===3){
        // ── Type 3: Two wide halls + 2 side alcoves ───────────────────────────
        var hW3=20+rng.i(0,4),hH3=6+rng.i(0,2);
        var hx3=10;
        var hall3a=_mkRoom(hx3,1,hx3+hW3,1+hH3);
        var hall3b=_mkRoom(hx3,DH-2-hH3,hx3+hW3,DH-2);
        var midX3=_cx(hall3a)+rng.i(-3,3);
        _corrV(hall3a.y+hall3a.h-1,hall3b.y+1,midX3);
        var alc3L=_mkRoom(1,11,9,20);
        _corrH(alc3L.x+alc3L.w-1,hx3+1,_cy(alc3L));
        var rx3=hx3+hW3+1;
        if(rx3+8<=DW-1){
          var alc3R=_mkRoom(rx3,11,rx3+8,20);
          _corrH(hall3a.x+hall3a.w-1,alc3R.x+1,_cy(alc3R));
        }
        upRoom=hall3a; downRoom=hall3b;

      } else {
        // ── Type 4: Four corner rooms + big center ────────────────────────────
        var ctrW4=14+rng.i(0,3),ctrH4=10+rng.i(0,2);
        var ctrX4=Math.floor((DW-ctrW4)/2),ctrY4=Math.floor((DH-ctrH4)/2);
        var center4=_mkRoom(ctrX4,ctrY4,ctrX4+ctrW4,ctrY4+ctrH4);
        var tl4=_mkRoom(1,1,11,8);
        var tr4=_mkRoom(DW-12,1,DW-2,8);
        var bl4=_mkRoom(1,DH-9,11,DH-2);
        var br4=_mkRoom(DW-12,DH-9,DW-2,DH-2);
        _corrL(tl4.x+tl4.w-1,_cy(tl4),center4.x+1,_cy(center4));
        _corrL(center4.x+center4.w-1,_cy(center4),tr4.x+1,_cy(tr4));
        _corrL(bl4.x+bl4.w-1,_cy(bl4),center4.x+1,_cy(center4));
        _corrL(center4.x+center4.w-1,_cy(center4),br4.x+1,_cy(br4));
        upRoom=tl4; downRoom=br4;
        self.rooms.splice(self.rooms.indexOf(upRoom),1); self.rooms.unshift(upRoom);
      }

      // Place stairs UP
      var sux=_cx(upRoom),suy=_cy(upRoom);
      tiles[suy][sux]=DNG.UP; this.stairsUpTile={x:sux,y:suy};

      // Place stairs DOWN / boss chest
      var dlx=_cx(downRoom),dly=_cy(downRoom);
      if(this.isLastFloor){
        tiles[dly][dlx]=DNG.BOSS_CHEST; this.bossChestTile={x:dlx,y:dly};
        this.bossSpawnX=dlx*TILE+TILE*2; this.bossSpawnY=dly*TILE+TILE/2;
      } else {
        tiles[dly][dlx]=DNG.DOWN; this.stairsDownTile={x:dlx,y:dly};
      }

      // Chests in non-stair rooms (75% chance each)
      for(var ci=0;ci<self.rooms.length;ci++){
        var cr=self.rooms[ci];
        if(cr===upRoom||cr===downRoom)continue;
        if(rng.i(0,3)>0){
          var chx=cr.x+2,chy=cr.y+2;
          if(tiles[chy]&&tiles[chy][chx]===DNG.FLOOR)tiles[chy][chx]=DNG.CHEST;
        }
      }
      return tiles;
    }
    // ── Standard dungeon: random BSP rooms connected by corridors ──
    this.rooms=[];
    var numRooms=5+rng.i(0,3)+(this.isLastFloor?1:0);
    for(var att=0;att<200&&this.rooms.length<numRooms;att++){
      var rw=rng.i(5,9),rh=rng.i(4,6),rx=rng.i(1,DW-rw-1),ry=rng.i(1,DH-rh-1);
      var overlap=false;
      for(var ri=0;ri<this.rooms.length;ri++){
        var rm=this.rooms[ri];
        if(rx<rm.x+rm.w+2&&rx+rw+2>rm.x&&ry<rm.y+rm.h+2&&ry+rh+2>rm.y){overlap=true;break;}
      }
      if(overlap)continue;
      this.rooms.push({x:rx,y:ry,w:rw,h:rh});
    }
    if(this.rooms.length<2)this.rooms.push({x:2,y:2,w:7,h:5});
    for(var ri=0;ri<this.rooms.length;ri++){
      var rm=this.rooms[ri];
      for(var y=rm.y;y<rm.y+rm.h;y++)for(var x=rm.x;x<rm.x+rm.w;x++)tiles[y][x]=DNG.FLOOR;
    }
    for(var i=1;i<this.rooms.length;i++){
      var a=this.rooms[i-1],b=this.rooms[i];
      var ax=a.x+Math.floor(a.w/2),ay=a.y+Math.floor(a.h/2);
      var bx=b.x+Math.floor(b.w/2),by=b.y+Math.floor(b.h/2);
      var fx=ax<bx?ax:bx,tx_=ax<bx?bx:ax;
      for(var x=fx;x<=tx_;x++)tiles[ay][x]=DNG.FLOOR;
      var fy=ay<by?ay:by,ty_=ay<by?by:ay;
      for(var y=fy;y<=ty_;y++)tiles[y][bx]=DNG.FLOOR;
    }
    var sr=this.rooms[0];
    var sux=sr.x+Math.floor(sr.w/2),suy=sr.y+Math.floor(sr.h/2);
    tiles[suy][sux]=DNG.UP;this.stairsUpTile={x:sux,y:suy};
    var lr=this.rooms[this.rooms.length-1];
    var dlx=lr.x+Math.floor(lr.w/2),dly=lr.y+Math.floor(lr.h/2);
    if(this.isLastFloor){
      tiles[dly][dlx]=DNG.BOSS_CHEST;this.bossChestTile={x:dlx,y:dly};
      this.bossSpawnX=dlx*TILE+TILE*2;this.bossSpawnY=dly*TILE+TILE/2;
    } else {
      tiles[dly][dlx]=DNG.DOWN;this.stairsDownTile={x:dlx,y:dly};
    }
    for(var ri=1;ri<this.rooms.length-1;ri++){
      if(ri%2===1){var cx=this.rooms[ri].x+1,cy=this.rooms[ri].y+1;if(tiles[cy]&&tiles[cy][cx]===DNG.FLOOR)tiles[cy][cx]=DNG.CHEST;}
    }
    return tiles;
  }
  // ═══ Lab-design floors (Phase 3) ═════════════════════════════════════
  // Depth scheme on Lab floors (keeps every hero/UI effect, which uses
  // depths 8–40, above the map): base -10, shafts -5, floor glows -4,
  // y-sorted sprites/hero/monsters 10–10.02, lights 11.5, particles 12,
  // darkness 12.5, overhead 12.6, monster shots 12.9, fog 25.
  _ld(d){
    if(d===undefined||d===null)return 11.5;
    if(d<0)return d;
    if(d>=9000)return 12.7; if(d>=8000)return 12.6; if(d>=7000)return 12.5;
    if(d>=6000)return 12+(d-6000)/100000; if(d>=5000)return 11.5;
    return 10+d/100000;
  }
  _yDepth(y){ return 10+y/100000; }
  _buildLabFloor(spec){
    var m=_buildSiteFloor(spec); this._lab=m; this._labSpec=spec;
    DW=m.w; DH=m.h;
    var tiles=[]; for(var r=0;r<DH;r++){ var row=new Uint8Array(DW); for(var c=0;c<DW;c++)row[c]=m.solid[r*DW+c]?DNG.WALL:DNG.FLOOR; tiles.push(row); }
    this.rooms=[];
    var en=m.site.entry, ex=m.site.exit;
    if(!ex){ ex={x:en.x,y:Math.max(2,en.y-6)}; }
    // Entry: stairs back down (tower) / up (dungeon); floor 0 = the way out
    tiles[en.y][en.x]=DNG.UP; this.stairsUpTile={x:en.x,y:en.y};
    if(spec.kind==='tower'){ tiles[en.y][en.x+1]=DNG.FLOOR; this._entryPx={x:(en.x+1)*TILE,y:en.y*TILE+TILE/2}; }
    else this._entryPx={x:en.x*TILE+TILE/2,y:en.y*TILE+TILE/2};
    this._exitPx={x:ex.x*TILE+TILE/2,y:ex.y*TILE+TILE/2};
    if(this.isLastFloor){ tiles[ex.y][ex.x]=DNG.BOSS_CHEST; this.bossChestTile={x:ex.x,y:ex.y}; this.bossSpawnX=this._exitPx.x; this.bossSpawnY=this._exitPx.y; }
    else { tiles[ex.y][ex.x]=DNG.DOWN; this.stairsDownTile={x:ex.x,y:ex.y}; }
    this.dtiles=tiles;
    this._spawnPt={x:m.spawn.x,y:m.spawn.y};
    // Reachable open cells (for monsters, chests, arrival spots)
    var seen=new Uint8Array(DW*DH), q=[en.y*DW+en.x]; seen[q[0]]=1;
    for(var qi=0;qi<q.length;qi++){ var cc=q[qi],cx=cc%DW,cy=(cc/DW)|0;
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var nx=cx+d[0],ny=cy+d[1]; if(nx<0||ny<0||nx>=DW||ny>=DH)return; var k=ny*DW+nx; if(!seen[k]&&tiles[ny][nx]!==DNG.WALL){seen[k]=1;q.push(k);} }); }
    this._labReach=seen;
    // Chests: a few seeded spots away from the stairs
    var R=rngOf(spec.seed*17+5), want=(this._bossPhase>1||this._trialRun)?0:(spec.kind==='tower'?2:3), got=0, self=this;
    for(var t=0;t<600&&got<want;t++){
      var x=R.i(2,DW-3), y=R.i(2,DH-3);
      if(!seen[y*DW+x]||tiles[y][x]!==DNG.FLOOR)continue;
      if(Math.hypot(x-en.x,y-en.y)<7||Math.hypot(x-ex.x,y-ex.y)<5)continue;
      // keep chests off narrow lanes: need 3 open neighbours
      var nb=0; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ if(tiles[y+d[1]][x+d[0]]!==DNG.WALL)nb++; }); if(nb<3)continue;
      tiles[y][x]=DNG.CHEST; got++;
    }
    // Arriving from the floor above/below: stand next to that floor's stairs
    if(this._arriveAt==='exit'){
      var best=null,bd=1e9;
      for(var yy=Math.max(1,ex.y-4);yy<=Math.min(DH-2,ex.y+4);yy++)for(var xx=Math.max(1,ex.x-4);xx<=Math.min(DW-2,ex.x+4);xx++){
        if(!seen[yy*DW+xx]||tiles[yy][xx]!==DNG.FLOOR)continue;
        var dd=Math.abs(Math.hypot(xx-ex.x,yy-ex.y)-2); if(dd<bd){bd=dd;best={x:xx,y:yy};}
      }
      if(best)this._spawnPt={x:best.x*TILE+TILE/2,y:best.y*TILE+TILE/2};
    }
  }
  _labTextures(){
    var tx=this.textures;
    if(!tx.exists('glow')){ var c=mkCanvas(128,128), x=c.getContext('2d'), g=x.createRadialGradient(64,64,0,64,64,64);
      g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(0.35,'rgba(255,255,255,0.45)'); g.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=g; x.fillRect(0,0,128,128); tx.addCanvas('glow',c); }
    if(!tx.exists('dot')){ var d=mkCanvas(8,8), y=d.getContext('2d'), g2=y.createRadialGradient(4,4,0,4,4,4);
      g2.addColorStop(0,'rgba(255,255,255,1)'); g2.addColorStop(1,'rgba(255,255,255,0)'); y.fillStyle=g2; y.fillRect(0,0,8,8); tx.addCanvas('dot',d); }
    if(!tx.exists('leaf')){ var l=mkCanvas(10,6), z=l.getContext('2d'); z.fillStyle='#fff'; z.beginPath(); z.ellipse(5,3,5,2.2,0.4,0,Math.PI*2); z.fill(); tx.addCanvas('leaf',l); }
    if(!tx.exists('dark_hole')){ var h=mkCanvas(256,256), qq=h.getContext('2d'), g3=qq.createRadialGradient(128,128,0,128,128,128);
      g3.addColorStop(0,'rgba(255,255,255,1)'); g3.addColorStop(0.55,'rgba(255,255,255,0.75)'); g3.addColorStop(1,'rgba(255,255,255,0)'); qq.fillStyle=g3; qq.fillRect(0,0,256,256); tx.addCanvas('dark_hole',h); }
  }
  _renderLabMap(m){
    var self=this, tag='dl'+(DungeonScene._seq=(DungeonScene._seq||0)+1), keys=[];
    this._labTextures();
    var addTex=function(k,cv){ gpuTex(self,k,cv); keys.push(k); return k; };
    this.add.image(0,0,addTex('base_'+tag,m.base)).setOrigin(0,0).setDepth(-10);
    m.shafts.forEach(function(sh,i){
      var im=self.add.image(sh.x,sh.y,addTex('shaft_'+tag+'_'+i,sh.canvas)).setOrigin(0,0).setBlendMode(Phaser.BlendModes.ADD).setAlpha(sh.a||0.5).setDepth(-5);
      if(sh.sway)self.tweens.add({targets:im,alpha:(sh.a||0.5)*0.6,duration:2200+i*170,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    });
    m.sprites.forEach(function(sp,i){
      var im=self.add.image(sp.x,sp.y,addTex('spr_'+tag+'_'+i,sp.canvas)).setOrigin(0.5,1).setDepth(self._ld(sp.depth!==undefined?sp.depth:sp.y));
      if(sp.bob)self.tweens.add({targets:im,y:sp.y-sp.bob,duration:1400+(i%7)*130,yoyo:true,repeat:-1,ease:'Sine.inOut'});
      if(sp.spin)self.tweens.add({targets:im,angle:360,duration:sp.spin,repeat:-1});
    });
    this._lightObjs=[];
    m.lights.forEach(function(L,i){
      var im=self.add.image(L.x,L.y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(L.col)).setAlpha(L.a).setScale(L.r/64).setDepth(self._ld(L.depth));
      if(L.pulse)self.tweens.add({targets:im,alpha:L.a*(1-L.pulse),scale:(L.r/64)*(1-L.pulse*0.25),duration:(L.period||1800)+i*37,yoyo:true,repeat:-1,ease:'Sine.inOut'});
      if(L.flicker)im._flicker=L.flicker;
      im._base=L; self._lightObjs.push(im);
    });
    m.particles.forEach(function(p){
      var a=p.area||{x:0,y:0,w:m.w*LT,h:m.h*LT};
      var e=self.add.particles(0,0,p.tex||'dot',{ x:{min:a.x,max:a.x+a.w}, y:{min:a.y,max:a.y+a.h}, lifespan:p.life||{min:3000,max:6000},
        speedX:p.vx||{min:-6,max:6}, speedY:p.vy||{min:-10,max:-3}, scale:p.scale||{start:0.5,end:0}, alpha:p.alpha||{start:0.8,end:0},
        tint:p.tints?p.tints.map(hexNum):hexNum(p.col||'#ffffff'), frequency:p.freq||120, quantity:p.qty||1,
        blendMode:p.blend===false?'NORMAL':'ADD', rotate:p.rotate||0, gravityY:p.gravity||0 });
      e.setDepth(self._ld(p.depth!==undefined?p.depth:6000));
    });
    // Darkness with light holes (dark caverns); capped so fights stay readable
    this._labDark=m.trialDark!==undefined?m.trialDark:Math.min(0.6,m.dark||0);
    if(this._labDark>0){
      this._darkRT=this.add.renderTexture(0,0,m.w*LT,m.h*LT).setOrigin(0,0).setDepth(12.5);
      this._holeImg=this.make.image({x:0,y:0,key:'dark_hole',add:false});
      this._heroGlow=this.add.image(0,0,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(m.heroLightCol||'#ffcc88')).setAlpha(0.3).setScale(Math.max(230,m.heroLight||0)/64).setDepth(11.5);
    }
    this._labT=0;
    // Free this floor's textures once the scene is gone (every floor change restarts the scene)
    this.events.once('shutdown',function(){ self.tweens.killAll(); setTimeout(function(){ keys.forEach(function(k){ try{ if(game.textures.exists(k))game.textures.remove(k); }catch(e){} }); },60); });
  }
  _labUpdate(dt){
    var m=this._lab; if(!m)return;
    this._labT+=dt; var tt=this._labT;
    this._lightObjs.forEach(function(o,i){ if(o._flicker)o.setAlpha(o._base.a*(1-o._flicker*0.5+o._flicker*0.5*Math.sin(tt*11+i*1.7)*Math.sin(tt*7.3+i))); });
    if(m.tick){ try{ m.tick(this,dt,tt); }catch(e){} }
    // blinded (a mage's darkness): the room itself goes black — only the master's eyes still glow
    var _bl=this._mxs&&this._mxs.blindT>0;
    if(_bl&&!this._darkRT){ this._darkRT=this.add.renderTexture(0,0,m.w*LT,m.h*LT).setOrigin(0,0).setDepth(12.5); this._holeImg=this.make.image({x:0,y:0,key:'dark_hole',add:false}); this._labDark=0; }
    if(this._darkRT){ this._darkRT.setVisible(!!(_bl||this._labDark>0)); this._blindEyes=this._blindEyes||[];
      var self2=this, eyes=this._blindEyes, bosses=_bl?this.monsters.filter(function(mo){ return !mo.dead&&mo.isBoss; }):[];
      while(eyes.length<bosses.length*2)eyes.push(this.add.circle(0,0,2.4,0xff60ff,1).setDepth(12.7));
      eyes.forEach(function(e,i){ var b=bosses[i>>1]; if(!b){ e.setVisible(false); return; } e.setVisible(true).setPosition(b.x+((i%2)?5:-5),b.y-(b.def&&b.def.r?b.def.r*1.6:26)).setFillStyle(0xff60ff,0.6+0.4*Math.sin(tt*6+i)); }); }
    if(this._darkRT&&(_bl||this._labDark>0)){
      var rt=this._darkRT, hole=this._holeImg, v=this.cameras.main.worldView, pad=200;
      var fire=(_heroActiveFamiliars(this.worldScene.playerState).length>0);
      var heroR=m.trialDark!==undefined?(m.heroLight||70)*(fire?1.5:1):Math.max(230,m.heroLight||0)*(fire?1.3:1);
      if(this._heroGlow)this._heroGlow.setPosition(this.px,this.py-14);
      if(_bl)heroR=64;
      rt.clear(); rt.fill(hexNum(m.darkCol||'#000000'),_bl?0.94:this._labDark);
      var cut=function(x,y,r,a){ if(x<v.x-pad-r||x>v.right+pad+r||y<v.y-pad-r||y>v.bottom+pad+r)return; hole.setScale(r/128); hole.setAlpha(a); rt.erase(hole,x,y); };
      cut(this.px,this.py-14,heroR*(1+0.03*Math.sin(tt*9)),1);
      if(!_bl)this._lightObjs.forEach(function(o){ var L=o._base; if(L.noCut)return; cut(o.x,o.y,L.r*(L.cut||0.9),Math.min(1,o.alpha*1.6)); });
      if(m.trialDark!==undefined){ var FV=this._famVisuals||{}; Object.keys(FV).forEach(function(k){ var fv=FV[k]; if(fv&&fv.x!==undefined)cut(fv.x,fv.y,110,0.9); }); }
    }
  }
  // Stairs markers + floor labels on Lab floors
  _drawLabStairs(){
    var isTower=this.siteType==='tower', f=this.floor, st={fontSize:'8px',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'};
    var e=this._entryPx;
    if(isTower&&f>0){
      // stairs down at the entry
      var g=this.add.graphics().setDepth(-3);
      for(var i=0;i<5;i++){ g.fillStyle(0x1a1c2a,0.35+i*0.1).fillRect(e.x-26+i*2,e.y-12+i*5,52-i*4,5); }
    }
    var entryTxt=f===0?(isTower?'🚪 Exit':'▲ Exit'):(isTower?'▼ Floor '+f:'▲ Floor '+f);
    this.add.text(e.x,e.y-22,entryTxt,Object.assign({color:'#fff4c8'},st)).setOrigin(.5,1).setDepth(13);
    if(!this.isLastFloor){
      var x=this._exitPx;
      this.add.text(x.x,x.y-20,(isTower?'▲ Floor ':'▼ Floor ')+(f+2),Object.assign({color:isTower?'#cfe8ff':'#ffcf8a'},st)).setOrigin(.5,1).setDepth(13);
    }
  }
  // The captive craftsman at the top of a boss tower
  _placeCaptive(){
    var C=CRAFTSMEN[this.siteSection]; if(!C||!this.bossChestTile)return;
    var ps=this.worldScene.playerState;
    if((ps.rescued||[]).includes(this.siteSection))return; // already freed
    var bc=this.bossChestTile, best=null, bd=1e9, bx=Math.floor(this.bossSpawnX/TILE), by=Math.floor(this.bossSpawnY/TILE);
    for(var y=bc.y-3;y<=bc.y+3;y++)for(var x=bc.x-3;x<=bc.x+3;x++){
      if(x<1||y<1||x>=DW-1||y>=DH-1||this.dtiles[y][x]!==DNG.FLOOR||!this._labReach[y*DW+x])continue;
      if(Math.abs(x-bx)+Math.abs(y-by)<3)continue;
      var d=Math.abs(Math.hypot(x-bc.x,y-bc.y)-2); if(d<bd){bd=d;best={x:x,y:y};}
    }
    if(!best)return;
    var cx=best.x*TILE+TILE/2, cy=best.y*TILE+TILE/2;
    var cont=this.add.container(cx,cy).setDepth(this._yDepth(cy));
    cont.add(this.add.ellipse(0,12,22,7,0x000000,0.35));
    var cSpr=CHX.sprite(this,'crafts_'+this.siteSection,0,14,1.3,{act:false,face:false});
    if(cSpr){ cSpr.setTint(0xc8c0b8); cont.add(cSpr); } else { cont.add(this.add.circle(0,0,12,0x6a5a3a,1).setStrokeStyle(2,0xffd27a,0.9)); cont.add(this.add.text(0,0,C.icon,{fontSize:'14px',fontFamily:'serif'}).setOrigin(.5)); }
    var bars=this.add.graphics(); bars.lineStyle(2,0x9aa0b0,1); for(var i=-12;i<=12;i+=6){ bars.lineBetween(i,-18,i,14); } bars.strokeRect(-14,-18,28,32); cont.add(bars);
    var lbl=this.add.text(0,-26,'⛓ '+C.n,{fontSize:'8px',color:'#ffe9a8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5); cont.add(lbl);
    this._captive={cont:cont,bars:bars,lbl:lbl,C:C};
  }
  _freeCaptive(){
    var c=this._captive; if(!c||c.freed)return; c.freed=true;
    c.bars.destroy(); c.lbl.setText('✨ '+c.C.n+' — free!').setColor('#aaffcc');
    this.tweens.add({targets:c.cont,y:c.cont.y-6,duration:300,yoyo:true,repeat:2});
    showNotif(c.C.icon+' '+c.C.freed,'#ffe9a8');
  }
  _spawnMonstersLab(regTypes){
    var spec=this._labSpec, R=rngOf(spec.seed*31+7), en=this.stairsUpTile, ex=this.bossChestTile||this.stairsDownTile;
    var base=spec.kind==='tower'?7:10, per=spec.kind==='tower'?1.5:2;
    var n=Math.round(base+this.floor*per), cap=(this._lab.stats&&this._lab.stats.spawns)||n; if(spec.kind==='dungeon')n=Math.min(n,Math.max(8,cap));
    var mult=1+this.floor*0.05, placed=0;
    for(var t=0;t<3000&&placed<n;t++){
      var x=R.i(1,DW-2), y=R.i(1,DH-2);
      if(!this._labReach[y*DW+x]||this.dtiles[y][x]===DNG.WALL)continue;
      if(Math.hypot(x-en.x,y-en.y)<7)continue;
      if(this.isLastFloor&&ex&&Math.hypot(x-ex.x,y-ex.y)<4)continue;
      var mon=this._spawnRosterMonster(x*TILE+TILE/2,y*TILE+TILE/2);   // roster, 80/15/5 (floor depth adds 5%/floor)
      if(mon&&mult!==1){ mon.maxHp=Math.round(mon.maxHp*mult); mon.hp=mon.maxHp; if(mon._hp!==undefined)mon._hp=mon.maxHp; }
      placed++;
    }
  }
  // Guardians stay by the exit portal unless you are close enough to fight.
  _leashBoss(dt){
    var self=this;
    this.monsters.forEach(function(m){
      if(!m.isBoss||m.dead||m.mx||self.bossSpawnX===undefined)return;
      var toPlayer=Math.hypot(self.px-m.x,self.py-m.y);
      var hx=self.bossSpawnX-m.x, hy=self.bossSpawnY-m.y, home=Math.hypot(hx,hy);
      if(toPlayer>TILE*6&&home>TILE*1.5){
        var sp=(m.def.spd||40)*dt, nx=m.x+hx/home*sp, ny=m.y+hy/home*sp;
        if(self._canGoD(nx,ny)){ m.x=nx; m.y=ny; m.cont.setPosition(nx,ny); }
      }
    });
  }
  _drawExitPortal(){
    var bc=this.bossChestTile; if(!bc)return;
    var x=bc.x*TILE+TILE/2, y=bc.y*TILE+TILE/2, self=this;
    var vault=this._isBonus, zb=this._lab?-3:3, zl=this._lab?13:4;
    var ring=this.add.circle(x,y,15,0x000000,0).setStrokeStyle(3,vault?0xc89a2a:0xaa2244,0.9).setDepth(zb);
    var core=this.add.circle(x,y,11,vault?0x3a2a08:0x440011,0.7).setDepth(zb);
    var lbl=this.add.text(x,y-26,vault?'⛓ Sealed Vault':'⛓ Sealed Exit',{fontSize:'8px',color:vault?'#ffd27a':'#ff8899',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(zl);
    var tw=this.tweens.add({targets:ring,scaleX:1.15,scaleY:1.15,alpha:0.6,duration:700,yoyo:true,repeat:-1});
    this._portalOpen=function(){
      ring.setStrokeStyle(3,0x66ffee,1); core.setFillStyle(0x44ccff,0.55);
      lbl.setText(vault?'💎 Treasure Vault':'★ Exit Portal').setColor(vault?'#ffe9a8':'#aaffee');
      var burst=self.add.circle(x,y,6,0xaaffff,0.8).setDepth(5);
      self.tweens.add({targets:burst,scaleX:8,scaleY:8,alpha:0,duration:600,onComplete:function(){burst.destroy();}});
    };
    // Re-opened floor after the boss is already dead
    var b=this.interactables.find(function(i){return i.type==='boss_chest';});
    if(b&&!b.locked)this._portalOpen();
  }
  // ── Boss arena (Phase 1 · B5) ───────────────────────────────────────
  // The last floor always ends with the guardian standing between you and
  // the exit portal (the boss chest tile). Works for any generator:
  //  1. BFS from the stairs-up tile; if the portal is unreachable, carve a
  //     corridor to it from the closest reachable tile.
  //  2. Put the boss on the path, 3 steps before the portal, so it is
  //     always reachable and always guarding the way out.
  _ensureBossArena(tiles){
    var up=this.stairsUpTile, bc=this.bossChestTile; if(!up||!bc)return;
    var W=DW,H=DH, key=function(x,y){return y*W+x;};
    var walk=function(x,y){return x>0&&y>0&&x<W-1&&y<H-1&&tiles[y][x]!==DNG.WALL;};
    var bfs=function(){
      var prev=new Int32Array(W*H).fill(-2), q=[key(up.x,up.y)]; prev[q[0]]=-1;
      for(var qi=0;qi<q.length;qi++){
        var c=q[qi],cx=c%W,cy=(c/W)|0;
        [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){
          var nx=cx+d[0],ny=cy+d[1],k=key(nx,ny);
          if(walk(nx,ny)&&prev[k]===-2){prev[k]=c;q.push(k);}
        });
      }
      return prev;
    };
    var prev=bfs(), noCarve=!!this._lab;
    if(prev[key(bc.x,bc.y)]===-2&&!noCarve){
      // carve from nearest reachable tile to the portal
      var best=null,bd=1e9;
      for(var y=1;y<H-1;y++)for(var x=1;x<W-1;x++){
        if(prev[key(x,y)]===-2)continue;
        var d=Math.abs(x-bc.x)+Math.abs(y-bc.y); if(d<bd){bd=d;best={x:x,y:y};}
      }
      if(best){
        var cx2=best.x,cy2=best.y;
        while(cx2!==bc.x){cx2+=cx2<bc.x?1:-1; if(tiles[cy2][cx2]===DNG.WALL)tiles[cy2][cx2]=DNG.FLOOR;}
        while(cy2!==bc.y){cy2+=cy2<bc.y?1:-1; if(tiles[cy2][cx2]===DNG.WALL)tiles[cy2][cx2]=DNG.FLOOR;}
        tiles[bc.y][bc.x]=DNG.BOSS_CHEST;
      }
      prev=bfs();
    }
    // Walk back from the portal along the shortest path
    var path=[], c=key(bc.x,bc.y);
    while(c>=0&&path.length<400){ path.push(c); c=prev[c]; }
    var pick=path[Math.min(3,path.length-1)];
    if(pick===undefined)pick=key(bc.x,bc.y);
    var bx=pick%W, by=(pick/W)|0;
    // Clear a small arena around the guardian so it can fight (legacy floors only)
    if(!noCarve)for(var yy=by-1;yy<=by+1;yy++)for(var xx=bx-1;xx<=bx+1;xx++){
      if(xx>0&&yy>0&&xx<W-1&&yy<H-1&&tiles[yy][xx]===DNG.WALL)tiles[yy][xx]=DNG.FLOOR;
    }
    this.bossSpawnX=bx*TILE+TILE/2; this.bossSpawnY=by*TILE+TILE/2;
  }
  _renderDungeon(){
    var g=this.add.graphics().setDepth(0);
    // Theme-based palette: dungeon (purple), volcano (red/orange), tower (blue), cave_dungeon (green)
    var themes={
      dungeon:     {wallA:0x1a1525,wallB:0x2e2545,wallC:0x0d0a18,floorA:0x2e2840,floorB:0x3a3455,floorC:0x1e1c30,crack:0x0d0a14,heat:null},
      volcano:     {wallA:0x3a0800,wallB:0x5a1800,wallC:0x1e0400,floorA:0x2a0e00,floorB:0x3c1400,floorC:0x180800,crack:0x100400,heat:0xff4400},
      cave_dungeon:{wallA:0x1a2008,wallB:0x2c3812,wallC:0x0e1506,floorA:0x1e2a0a,floorB:0x2a3812,floorC:0x121a06,crack:0x0a1204,heat:null},
      tower:       {wallA:0x2a1e14,wallB:0x3c2c1e,wallC:0x1a110a,floorA:0x6e5440,floorB:0x7e6450,floorC:0x5a4030,crack:0x15090A,heat:null},
      tower_island:{wallA:0x2a1e14,wallB:0x3c2c1e,wallC:0x1a110a,floorA:0x6e5440,floorB:0x7e6450,floorC:0x5a4030,crack:0x15090A,heat:null},
    };
    var pal=themes[this._theme]||(this.siteType==='tower'?themes.tower:themes.dungeon);
    var wallA=pal.wallA,wallB=pal.wallB,wallC=pal.wallC;
    var floorA=pal.floorA,floorB=pal.floorB,floorC=pal.floorC;
    var isTower=this.siteType==='tower'||this._theme==='tower_island';
    var isVolcano=this._theme==='volcano';
    // Pre-seed simple hash for per-tile variation
    function _th(tx,ty){return(((tx*17)^(ty*31))&0xff);}
    for(var ty=0;ty<DH;ty++){
      for(var tx=0;tx<DW;tx++){
        var v=this.dtiles[ty][tx],px=tx*TILE,py=ty*TILE;
        var vh=_th(tx,ty);
        if(v===DNG.WALL){
          // Base wall fill
          g.fillStyle(wallA,1).fillRect(px,py,TILE,TILE);
          if(isTower){
            // Tower: weathered wood/plaster wall — warm, trashed house feel
            g.fillStyle(wallB,.65).fillRect(px+1,py+1,TILE-2,7);
            g.fillStyle(0xc89060,.12).fillRect(px+1,py+1,TILE-2,3);
            // Plank/mortar lines
            g.fillStyle(wallC,.55).fillRect(px,py+TILE-3,TILE,3);
            g.fillStyle(wallC,.28).fillRect(px,py+Math.floor(TILE/2),TILE,1);
            if(vh%2===0){g.fillStyle(wallC,.22).fillRect(px+TILE-2,py,2,TILE/2);}
            // Warm amber top highlight (aged wood grain)
            g.fillStyle(0xd09050,.08).fillRect(px+2,py+2,TILE-4,3);
          } else {
            // Stone/rock wall: top bevel + shaded bottom + variant cracks
            g.fillStyle(wallB,.48).fillRect(px+1,py+1,TILE-2,10);
            g.fillStyle(wallC,.55).fillRect(px,py+TILE-4,TILE,4);
            // Brick row lines
            g.fillStyle(wallC,.22).fillRect(px,py+Math.floor(TILE*.45),TILE,1);
            // Horizontal mortar with per-column offset
            var bOff=(vh%3)*4;
            g.fillStyle(wallC,.18).fillRect(px+bOff,py,1,TILE*.45).fillRect(px+bOff+8,py+TILE*.45,1,TILE*.55);
            // Crack detail on every 3rd tile
            if(vh%3===0){
              g.fillStyle(pal.crack,.45);
              var csx=px+4+(vh%8)*3, csy=py+3;
              g.fillRect(csx,csy,1,6+(vh%4)*2).fillRect(csx+1,csy+4,2,1).fillRect(csx,csy+8,2,3);
            }
            // Volcano: lava seep glow at base
            if(isVolcano){
              g.fillStyle(0xff4400,.28).fillRect(px,py+TILE-5,TILE,5);
              g.fillStyle(0xff8800,.14).fillRect(px,py+TILE-8,TILE,3);
              if(vh%4===0){g.fillStyle(0xff2200,.18).fillRect(px+vh%12,py+TILE-3,3,3);}
            } else {
              // Damp stain at base (moisture seeping down)
              g.fillStyle(wallC,.30).fillRect(px+2,py+TILE-3,TILE-4,3);
            }
          }
        } else {
          // Floor
          var flCol=(v===DNG.CHEST||v===DNG.BOSS_CHEST)?0x3a3020:floorA;
          g.fillStyle(flCol,1).fillRect(px,py,TILE,TILE);
          if(isTower){
            // Tower floor: worn wood planks — horizontal grain lines
            g.fillStyle(floorC,.30).fillRect(px,py+TILE-2,TILE,2).fillRect(px+TILE-2,py,2,TILE);
            // Horizontal plank grain
            g.fillStyle(floorC,.20).fillRect(px,py+Math.floor(TILE*0.33),TILE,1);
            g.fillStyle(floorC,.15).fillRect(px,py+Math.floor(TILE*0.66),TILE,1);
            // Occasional worn patch or debris scatter
            if(vh%5===0){g.fillStyle(floorB,.12).fillRect(px+3,py+3,TILE-6,TILE-6);}
            if(vh%9===0){g.fillStyle(0x2a1808,.18).fillRect(px+2+vh%8,py+3+vh%6,3,2);}
          } else {
            // Dungeon floor: grout lines + per-tile shading variation
            g.fillStyle(floorC,.22).fillRect(px,py+TILE-1,TILE,1).fillRect(px+TILE-1,py,1,TILE);
            // Subtle diagonal shading based on tile hash
            if(vh%4===0){g.fillStyle(floorB,.14).fillRect(px,py,TILE,TILE);}
            else if(vh%4===1){g.fillStyle(floorC,.10).fillRect(px+2,py+2,TILE-4,TILE-4);}
            // Worn scuff mark on some floor tiles
            if(vh%7===0){g.fillStyle(floorC,.18).fillCircle(px+8+(vh%14),py+8+(vh%10),3);}
            // Volcano: faint heat shimmer — random glow dots
            if(isVolcano&&vh%6===0){g.fillStyle(0xff6600,.10).fillCircle(px+vh%28,py+vh%22,2+vh%3);}
          }
          // Stair markers
          if(v===DNG.UP){
            g.fillStyle(isTower?0xffffff:0xdda020,.85);
            [[11,22,10,3],[7,17,18,3],[3,12,26,3]].forEach(function(d){g.fillRect(px+d[0],py+d[1],d[2],d[3]);});
            // Glow halo
            g.fillStyle(isTower?0xaaddff:0xffcc44,.15).fillCircle(px+TILE/2,py+17,12);
            this.add.text(px+TILE/2,py+5,'▲ Exit',{fontSize:'7px',color:isTower?'#fff':'#ffd700',stroke:isTower?'#0a1e50':'#000',strokeThickness:2,fontFamily:'Segoe UI'}).setOrigin(.5,0).setDepth(2);
          } else if(v===DNG.DOWN){
            if(isTower){
              g.fillStyle(0xffffff,.9);[[11,8,10,3],[7,13,18,3],[3,18,26,3]].forEach(function(d){g.fillRect(px+d[0],py+d[1],d[2],d[3]);});
              g.fillStyle(0xaaddff,.18).fillCircle(px+TILE/2,py+14,12);
              this.add.text(px+TILE/2,py+5,'▲ Up',{fontSize:'7px',color:'#ffffff',stroke:'#0a1e50',strokeThickness:2,fontFamily:'Segoe UI'}).setOrigin(.5,0).setDepth(2);
            } else {
              g.fillStyle(0xaa3800,.85);[[3,8,26,3],[7,13,18,3],[11,18,10,3]].forEach(function(d){g.fillRect(px+d[0],py+d[1],d[2],d[3]);});
              g.fillStyle(0xff4400,.14).fillCircle(px+TILE/2,py+14,12);
              this.add.text(px+TILE/2,py+24,'▼ Down',{fontSize:'7px',color:'#ff8844',stroke:'#000',strokeThickness:2,fontFamily:'Segoe UI'}).setOrigin(.5,0).setDepth(2);
            }
          } else if(v===DNG.CHEST){
            // Chest body with lid detail
            g.fillStyle(0x7a4800,1).fillRect(px+5,py+10,TILE-10,TILE-16);
            g.fillStyle(0x5a3200,1).fillRect(px+5,py+10,TILE-10,3);
            g.fillStyle(0xd4a000,.88).fillRect(px+5,py+8,TILE-10,5);
            g.fillStyle(0xffee88,1).fillCircle(px+TILE/2,py+14,2);
            // Lid corner rivets
            g.fillStyle(0xcc8800,.8).fillCircle(px+7,py+11,1.5).fillCircle(px+TILE-7,py+11,1.5);
          } else if(v===DNG.BOSS_CHEST){
            g.fillStyle(0x660000,.5).fillRect(px,py,TILE,TILE);
            g.fillStyle(0xff2200,.25).fillCircle(px+TILE/2,py+TILE/2,10);
          }
        }
      }
    }
    // Second pass: wall edge darkening (ambient occlusion-like borders)
    for(var ty=0;ty<DH;ty++){
      for(var tx=0;tx<DW;tx++){
        if(this.dtiles[ty][tx]!==DNG.WALL)continue;
        var px=tx*TILE,py2=ty*TILE;
        // If the tile below is a floor, draw a shadow at the top of that floor tile
        if(ty+1<DH&&this.dtiles[ty+1][tx]!==DNG.WALL){
          g.fillStyle(0x000000,.30).fillRect(px,(ty+1)*TILE,TILE,4);
        }
        // If tile to the right is floor, draw a left-side shadow
        if(tx+1<DW&&this.dtiles[ty][tx+1]!==DNG.WALL){
          g.fillStyle(0x000000,.20).fillRect((tx+1)*TILE,py2,4,TILE);
        }
      }
    }
  }
  // ─── Animated Dungeon/Tower FX (runs each frame) ──────────────────────────
  _updateDungeonFX(dt){
    if(!this._dFXGfx)return;
    this._dFXTime=(this._dFXTime||0)+dt;
    var t=this._dFXTime;
    var g=this._dFXGfx;
    g.clear();
    var cam=this.cameras.main;
    var wv=cam.worldView;
    var txMin=Math.max(0,Math.floor(wv.x/TILE)-1);
    var txMax=Math.min(DW-1,Math.ceil((wv.x+wv.width)/TILE)+1);
    var tyMin=Math.max(0,Math.floor(wv.y/TILE)-1);
    var tyMax=Math.min(DH-1,Math.ceil((wv.y+wv.height)/TILE)+1);
    var isTower=this.siteType==='tower'||this._theme==='tower_island';
    var isVolcano=this._theme==='volcano';
    var isCave=this._theme==='cave_dungeon';
    function dvh(tx,ty){return(((tx*17)^(ty*31))&0xff);}

    // ── Ember particles (volcano) ────────────────────────
    if(isVolcano){
      if(!this._embers)this._embers=[];
      if(Math.random()<0.35){
        var etx=Math.floor(txMin+Math.random()*(txMax-txMin+1));
        var ety=Math.floor(tyMin+Math.random()*(tyMax-tyMin+1));
        if(ety<DH&&etx>=0&&etx<DW&&ety>=0&&this.dtiles[ety]&&this.dtiles[ety][etx]===DNG.WALL){
          this._embers.push({x:etx*TILE+Math.random()*TILE,y:(ety+1)*TILE,vy:-(20+Math.random()*22),vx:(Math.random()-.5)*12,life:1.2+Math.random()*1.2,r:1.2+Math.random()*1.5});
        }
      }
      this._embers=this._embers.filter(function(em){
        em.x+=em.vx*dt;em.y+=em.vy*dt;em.life-=dt;
        if(em.life<=0)return false;
        var a2=Math.min(0.88,em.life*0.85);
        g.fillStyle(em.life>0.6?0xff8800:0xff4400,a2).fillCircle(Math.round(em.x),Math.round(em.y),em.r);
        return true;
      });
    }

    // ── Tower dust particles (abandoned house feel, warm tone) ────────────────
    if(isTower){
      if(!this._mistParticles)this._mistParticles=[];
      if(Math.random()<0.10){
        var mtx=Math.floor(txMin+Math.random()*(txMax-txMin+1));
        var mty=Math.floor(tyMin+Math.random()*(tyMax-tyMin+1));
        if(mty>=0&&mty<DH&&mtx>=0&&mtx<DW&&this.dtiles[mty]&&this.dtiles[mty][mtx]!==DNG.WALL){
          this._mistParticles.push({x:mtx*TILE+Math.random()*TILE,y:mty*TILE+TILE,vy:-(2+Math.random()*3),vx:(Math.random()-.5)*2.5,life:3+Math.random()*2.5,r:1.5+Math.random()*2});
        }
      }
      this._mistParticles=this._mistParticles.filter(function(mp){
        mp.x+=mp.vx*dt;mp.y+=mp.vy*dt;mp.life-=dt;
        if(mp.life<=0)return false;
        g.fillStyle(0xc09060,Math.min(0.10,mp.life*0.04)).fillCircle(Math.round(mp.x),Math.round(mp.y),Math.round(mp.r));
        return true;
      });
    }

    // ── Drip particles (dungeon/cave) ────────────────────
    if(!isVolcano&&!isTower){
      if(!this._drips)this._drips=[];
      if(Math.random()<0.12){
        var dtx=Math.floor(txMin+Math.random()*(txMax-txMin+1));
        var dty=Math.floor(tyMin+Math.random()*(tyMax-tyMin+1));
        if(dty>=1&&dty<DH&&dtx>=0&&dtx<DW&&this.dtiles[dty]&&this.dtiles[dty][dtx]===DNG.WALL&&dty+1<DH&&this.dtiles[dty+1]&&this.dtiles[dty+1][dtx]!==DNG.WALL){
          this._drips.push({x:dtx*TILE+6+Math.random()*(TILE-12),y:(dty+1)*TILE,vy:28+Math.random()*18,life:0.8+Math.random()*0.8});
        }
      }
      this._drips=this._drips.filter(function(dr){
        dr.y+=dr.vy*dt;dr.life-=dt;
        if(dr.life<=0)return false;
        g.fillStyle(isCave?0x44ff88:0x3377aa,Math.min(0.65,dr.life)).fillRect(Math.round(dr.x),Math.round(dr.y),1,3);
        return true;
      });
    }

    // ── Per-tile animated effects ─────────────────────────
    for(var ty=tyMin;ty<=tyMax;ty++){
      for(var tx=txMin;tx<=txMax;tx++){
        if(ty<0||ty>=DH||tx<0||tx>=DW||!this.dtiles[ty])continue;
        var v=this.dtiles[ty][tx];
        var px=tx*TILE,py=ty*TILE;
        var vh=dvh(tx,ty);

        if(v===DNG.WALL){
          if(isTower){
            // Sparse candle-flicker on every 13th wall tile (warm house lighting)
            if(vh%13===0){
              var tf2=0.09+Math.sin(t*8+vh*0.5)*0.06+Math.sin(t*13+vh)*0.03;
              g.fillStyle(0xff9933,tf2).fillRect(px,py,TILE,TILE);
              var tcx2=px+TILE/2,tcy2=py+TILE*.38;
              g.fillStyle(0x886644,0.65).fillRect(Math.round(tcx2-1),Math.round(tcy2),2,6);
              var fs2=3+tf2*5;
              g.fillStyle(0xff8800,0.65+tf2*.12).fillEllipse(Math.round(tcx2),Math.round(tcy2-3),Math.round(fs2),Math.round(fs2*1.4));
              g.fillStyle(0xffdd44,0.75+tf2*.10).fillEllipse(Math.round(tcx2),Math.round(tcy2-4),Math.round(fs2*.45),Math.round(fs2*.8));
            }
            // Weathered dust stain on some walls
            if(vh%11===3){var dp2=Math.sin(t*0.3+vh*0.2)*0.5+0.5;g.fillStyle(0x3a2818,0.05+dp2*0.04).fillRect(px+2,py+TILE-5,TILE-4,5);}
          } else if(isVolcano){
            // Animated lava glow seeping at wall base
            var lg2=0.14+Math.sin(t*2.2+vh*0.45)*0.09;
            g.fillStyle(0xff4400,lg2).fillRect(px,py+TILE-6,TILE,6);
            g.fillStyle(0xff8800,lg2*0.55).fillRect(px,py+TILE-10,TILE,4);
            // Occasional bright crack flare
            if(vh%5===0){
              var cf=Math.sin(t*3+vh*0.7);
              if(cf>0.65)g.fillStyle(0xff2200,(cf-.65)*0.5).fillRect(px+vh%20,py+TILE-3,3,3);
            }
          } else if(isCave){
            // Bioluminescent patches
            if(vh%6===0){
              var bp=Math.sin(t*1.4+vh*0.55)*0.5+0.5;
              g.fillStyle(0x44ff88,0.06+bp*0.09).fillCircle(px+7+vh%16,py+7+vh%14,4+vh%4);
            }
          } else {
            // Regular dungeon: sparse torch flicker on walls (every 13th tile)
            if(vh%13===0){
              var tf=0.11+Math.sin(t*9+vh*0.4)*0.07+Math.sin(t*14+vh)*0.04;
              g.fillStyle(0xff8800,tf).fillRect(px,py,TILE,TILE);
              // Torch bracket + flame
              var tcx=px+TILE/2,tcy=py+TILE*.35;
              g.fillStyle(0x886644,0.72).fillRect(Math.round(tcx-1),Math.round(tcy),2,7);
              var fs=3.5+tf*6;
              g.fillStyle(0xff8800,0.70+tf*.15).fillEllipse(Math.round(tcx),Math.round(tcy-3),Math.round(fs),Math.round(fs*1.5));
              g.fillStyle(0xffee44,0.80+tf*.10).fillEllipse(Math.round(tcx),Math.round(tcy-4),Math.round(fs*.5),Math.round(fs*.9));
            }
          }

        } else {
          // Floor animated effects
          if(isTower){
            // Floating dust motes — warm, abandoned-house atmosphere
            if(vh%5===0){
              var dm=Math.sin(t*1.4+vh*0.55+tx*0.18+ty*0.22);
              if(dm>0.50)g.fillStyle(0xd0a060,(dm-0.50)*0.28).fillCircle(px+5+vh%20,py+5+vh%16,1.5);
            }
            // Faint warm ambient tint on floor
            var wa=Math.sin(t*0.5+tx*0.12+ty*0.09)*0.025;
            if(wa>0)g.fillStyle(0xc07828,wa).fillRect(px,py,TILE,TILE);
          } else if(isVolcano){
            // Heat shimmer overlay
            var hs=Math.sin(t*3.5+tx*0.28+ty*0.44)*0.05;
            if(hs>0)g.fillStyle(0xff4400,hs).fillRect(px,py,TILE,TILE);
          } else {
            // Puddle from drip on some floor tiles
            if(vh%9===0){
              var da=(((t*.25+vh*.08)%1));
              var da2=da>0.75?(1-da)*0.45:0;
              if(da2>0)g.fillStyle(0x446688,da2).fillCircle(px+TILE/2,py+TILE-5,2.5);
            }
          }
        }
      }
    }
  }

  _buildInteractables(){
    var ep=this._entryPx||{x:this.stairsUpTile.x*TILE+TILE/2,y:this.stairsUpTile.y*TILE+TILE/2};
    this.interactables.push({type:'stairs_up',x:ep.x,y:ep.y});
    if(!this.isLastFloor&&this.stairsDownTile)
      this.interactables.push({type:'stairs_down',x:this.stairsDownTile.x*TILE+TILE/2,y:this.stairsDownTile.y*TILE+TILE/2});
    for(var ty=0;ty<DH;ty++)for(var tx=0;tx<DW;tx++)
      if(this.dtiles[ty][tx]===DNG.CHEST){
        var ch={type:'chest',tx:tx,ty:ty,x:tx*TILE+TILE/2,y:ty*TILE+TILE/2,opened:false};
        if(this._lab)ch.gfx=this._drawLabChest(tx,ty);
        this.interactables.push(ch);
      }
    if(this.isLastFloor&&this.bossChestTile)
      this.interactables.push({type:'boss_chest',tx:this.bossChestTile.x,ty:this.bossChestTile.y,x:this.bossChestTile.x*TILE+TILE/2,y:this.bossChestTile.y*TILE+TILE/2,opened:false,locked:!(this._inspect&&this._inspect.mons==='none')});
  }
  _drawLabChest(tx,ty){
    var x=tx*TILE+TILE/2, y=ty*TILE+TILE-4, g=this.add.graphics().setDepth(this._yDepth(y));
    g.fillStyle(0x000000,0.3).fillEllipse(x,y,26,7);
    g.fillStyle(0x6a3c10,1).fillRoundedRect(x-11,y-17,22,15,2);
    g.fillStyle(0x8a5418,1).fillRoundedRect(x-11,y-21,22,7,3);
    g.fillStyle(0xd4a000,1).fillRect(x-11,y-15,22,2).fillRect(x-2,y-17,4,6);
    g.fillStyle(0xffee88,1).fillCircle(x,y-13,1.5);
    return g;
  }
  _spawnPlayer(){
    var sx=this.stairsUpTile.x*TILE+TILE/2,sy=(this.stairsUpTile.y+1)*TILE+TILE/2;
    if(this._spawnPt){sx=this._spawnPt.x;sy=this._spawnPt.y;}
    this.px=sx;this.py=sy;this.pdir='down';this.p_bobPhase=0;
    var cont=this.add.container(sx,sy).setDepth(this._lab?this._yDepth(sy):10);
    var shadow=this.add.ellipse(0,12,20,6,0x000000,.3);
    var body=this.add.rectangle(0,2,16,18,0x4488dd).setVisible(false);
    var head=this.add.circle(0,-11,8,0xf0c880).setVisible(false);
    var eyeL=this.add.circle(-3,-12,2,0x222222).setVisible(false);
    var eyeR=this.add.circle(3,-12,2,0x222222).setVisible(false);
    this.pWeapon=this.add.rectangle(12,-2,4,14,0xcccccc).setVisible(false);
    cont.add([shadow,body,head,eyeL,eyeR,this.pWeapon]);
    this.pSprite=_heroAddSprite(this,cont,12);
    this.pWalkSt=_heroNewState('down');
    this.pCont=cont;this.pBody=body;this.pHead=head;this.pEyeL=eyeL;this.pEyeR=eyeR;
    this.cameras.main.startFollow(cont,true,.12,.12);
    this.interactPrompt=this.add.text(sx,sy-50,'',{fontSize:'9px',color:'#ffff88',stroke:'#000',strokeThickness:2,fontFamily:'Segoe UI',align:'center'}).setOrigin(.5,1).setDepth(20);
  }
  _spawnMonsters(){
    var ps=this.worldScene.playerState;
    // Use the full siteId as the done-check so island adventure dungeons
    // don't falsely inherit completion state from main-world dungeons/towers
    var qKey=this.siteId||('s'+this.siteSection+'_'+this.siteType);
    var done=this._isIsland?(ps.completedIslands||[]).includes(this.siteSection)
            :this._castle?CastleRun.done(ps,this._castle.key)
            :this._mage?MageRun.done(ps,this._mage.key)
            :this._isBonus?(ps.bonusCleared||[]).includes(this.siteId)
            :(ps.completedQuests&&ps.completedQuests.includes(qKey));
    var regTypes=[];
    for(var k in MDEFS){if(MDEFS[k].sec===this.siteSection&&!MDEFS[k].boss)regTypes.push(k);}
    var im=this._inspect&&this._inspect.mons;
    if(im==='boss'||im==='none'){ /* Site Lab: no regular monsters */ }
    else if(this._trialRun){ /* trial realm: the trial spawns its own */ }
    else if(this._lab&&this._mage&&this.isLastFloor){ /* the mage's sanctum: only the master (and their summons) */ }
    else if(this._lab&&this._bossPhase>1){ /* boss arena: only the boss (and its summons) */ }
    else if(this._lab&&this._isBonus&&this.isLastFloor){ /* elite den: only the elite and its plain kin (below) */ }
    else if(this._lab){ this._spawnMonstersLab(regTypes); }
    else {
    var spawnRooms=this.isLastFloor?this.rooms.slice(1,-1):this.rooms.slice(1);
    if(this._bossPhase>1)spawnRooms=[];
    var monCount=7+this.floor*2+Math.floor(Math.random()*3); // harder: 7-9 on floor 0, scales up
    for(var i=0;i<monCount;i++){
      if(!spawnRooms.length)break;
      var room=spawnRooms[Math.floor(Math.random()*spawnRooms.length)];
      var mx=(room.x+1+Math.floor(Math.random()*(room.w-2)))*TILE+TILE/2;
      var my=(room.y+1+Math.floor(Math.random()*(room.h-2)))*TILE+TILE/2;
      this._spawnRosterMonster(mx,my);   // 80/15/5 from the roster (dungeon: melee+ranged · tower: magic)
    }
    }
    this._wasDone=!!done;
    if(this._trialRun){ this._wasDone=false; return; }
    if(this.isLastFloor&&im!=='none'&&this._mage){
      MageRun.spawnBoss(this,this._mage,this.bossSpawnX,this.bossSpawnY,done?1.25:1);
      if(done)showNotif('⚔️ '+this._mage.bossName+' is back, stronger (+25%)!','#ffaa66');
    } else if(this.isLastFloor&&im!=='none'&&this._castle){
      CastleRun.spawnWarden(this,this._castle,this.bossSpawnX,this.bossSpawnY,done?1.25:1);
      showNotif(done?'⚔️ '+CHAR_BY_ID[this._castle.warden].name+' is back, stronger (+25%)!':'⛓ '+CHAR_BY_ID[this._castle.warden].name+' guards the captive master!','#ffaa66');
    } else if(this.isLastFloor&&im!=='none'){
      var bk=this._getBossKey();
      var multi=bk&&!this._isIsland&&!this._isBonus&&BossPhases.count(bk)>1;
      if(multi&&this._bossPhase>1){ BossPhases.spawn(this,bk,this._bossPhase,this.bossSpawnX,this.bossSpawnY,done?1.25:1); }
      else if(bk){
        var bmon=this._spawnMonster(bk,this.bossSpawnX,this.bossSpawnY,true,done?1.25:1);
        if(multi&&bmon){ this._bossGroup=[bmon]; this._bossKey=bk; this._bossPhase=1; this._bpEv=[]; BossPhases.hud(this,true); }
        if(this._isBonus&&bmon){ if(bmon.kit&&typeof ELITE_FAM_COUNTER!=='undefined')MX.addToKit(bmon,ELITE_FAM_COUNTER); this._spawnEliteKin(bk,done); this._bossGroup=[bmon]; this._bossKey=bk; this._bossPhase=1; this._bpEv=[]; BossPhases.hud(this,true); }
        if(this._isBonus)showNotif(done?'⚔️ A stronger elite guards the vault again (+25%)!':'💎 '+bmon.def.name+' guards the treasure vault with its kin!','#ffaa66');
        else showNotif(done?'⚔️ The guardian has returned, stronger (+25%)!':'⚔️ The guardian blocks the exit portal!', '#ffaa66');
      }
    }
  }
  // the elite's kin: plain versions of the same monster (3 in the Grasslands … 6 in the Ashlands)
  _spawnEliteKin(ek,done){ var E=MDEFS[ek], base=E&&E._base; if(!base||!MDEFS[base])return; var n=2+this.siteSection, R=rngOf((this._labSpec&&this._labSpec.seed||7)*17+3), placed=0, bx=this.bossSpawnX/TILE, by=this.bossSpawnY/TILE, en=this.stairsUpTile||{x:bx,y:by+6};
    for(var t=0;t<2000&&placed<n;t++){ var x=R.i(2,DW-3), y=R.i(2,DH-3); if(this.dtiles[y][x]===DNG.WALL||(this._labReach&&!this._labReach[y*DW+x]))continue; if(Math.hypot(x-en.x,y-en.y)<6||Math.hypot(x-bx,y-by)<2.5)continue;
      var m=this._spawnMonster(base,x*TILE+TILE/2,y*TILE+TILE/2,false,done?1.25:1,true,E._rid); if(m){ m.eliteKin=true; placed++; } } }
  _spawnRosterMonster(mx,my){
    var q=this.siteSection||1, seg=this.siteType==='tower'?'tow':'dun', pick=monPick({next:Math.random},q,seg), R=pick.R;
    if(MON_LEGACY[R.id]){ var key='rs_'+R.id; if(!MDEFS[key]){ var base=MDEFS[MON_LEGACY[R.id]], st=MX.stats(R,q); MDEFS[key]=Object.assign({},base,{boss:false,name:R.name,hp:st.hp,atk:st.atk,def:st.def,xp:st.xp,gMin:st.gMin,gMax:st.gMax,r:Math.min(base.r,13),sec:q}); }
      return this._spawnMonster(key,mx,my,false,1,false,R.id); }
    var mon=MX.spawn(this,R.id,mx,my,{q:q}); if(mon){ mon.isBoss=false; this.monsters.push(mon); } return mon;
  }
  _getBossKey(){
    var t=this.siteType,s=this.siteSection;
    if(this._isIsland){ var ik=_islandBossKey(s); if(ik)return ik; }
    if(this._isBonus){ var ek=_bonusMiniBossKey(s); if(ek)return ek; }
    return t==='dungeon'?['goblin_king','swamp_witch','rock_dragon','lava_titan'][s-1]:['dark_warlock','storm_mage','iron_sentinel','shadow_lord'][s-1];
  }
  _spawnMonster(type,wx,wy,isBoss,mult,quiet,rid){
    var def=MDEFS[type];if(!def)return;
    if(mult&&mult!==1)def=Object.assign({},def,{hp:Math.round(def.hp*mult),atk:Math.round(def.atk*mult),def:Math.round((def.def||0)*mult),name:quiet?def.name:def.name+' (Rematch)'});
    var cont=this.add.container(wx,wy).setDepth(this._lab?this._yDepth(wy):(isBoss?12:10));
    var shadow=this.add.ellipse(0,def.r+2,def.r*2.2,7,0x000000,.3);
    var body=(isBoss&&CHX.bossBody(this,type,def,cont))||(rid&&monLegacyBody(this,rid,def))||(def.elite&&def._rid&&monLegacyBody(this,def._rid,def))||this.add.circle(0,0,def.r,def.color);
    var icon=this.add.text(0,0,(rid||body.setTexture)?'':def.icon,{fontSize:isBoss?'20px':'14px',fontFamily:'serif'}).setOrigin(.5,.5);
    var _tr=body._ch?def.r+22:def.r;
    var hpBg=this.add.rectangle(0,-(_tr+8),32,5,0x000000,.7);
    var hpFill=this.add.rectangle(-16,-(_tr+8),32,5,isBoss?0xff4400:0xff2222).setOrigin(0,.5);
    var nameT=this.add.text(0,-(_tr+17),def.name+(isBoss?' ★':''),{fontSize:'8px',color:isBoss?'#ffaa44':'#ffffff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5);
    cont.add([shadow,body,icon,hpBg,hpFill,nameT]);
    var mon0={cont:cont,body:body,hpFill:hpFill,type:type,def:def,hp:def.hp,maxHp:def.hp,x:wx,y:wy,dir:'down',atkTimer:0,wanderTimer:0,wanderVx:0,wanderVy:0,state:'wander',dead:false,isBoss:!!isBoss,rid:rid||null};
    this.monsters.push(mon0); return mon0;
  }
  update(_,ms){
    if(!this._ready||this._playerDead)return;
    var dt=ms/1000;
    if(this._hitStop>0){ this._hitStop-=dt; return; }   // hit-pause on heavy blows (10k BossMoments)
    var paused=_anyModalOpen();
    if(!paused){
      this._movePlayer(dt);
      if(this._introT>0)this._introT-=dt; else this._updateMonsters(dt);   // monsters wait while the boss title card shows
      if(typeof BossMoments!=='undefined'&&this.isLastFloor)BossMoments.tick(this,dt);
      this._leashBoss(dt);
      if(this._bossGroup)BossPhases.tick(this,dt);
      if(this.isLastFloor&&typeof BossPat!=='undefined')BossPat.tick(this,dt);   // round 8: signature boss attacks, stagger, last stand
      if(this._trialRun)TrialRealm.tick(this,dt);
      if(this._lab)this._labUpdate(dt); else this._updateDungeonFX(dt);
      if(Phaser.Input.Keyboard.JustDown(this.keys.SPACE))this._playerAttack();
      if(this._dngFogExplored)this._dngRevealFog(false);
    }
    this.playerAtkTimer=Math.max(0,this.playerAtkTimer-dt);
    this.pBowTimer=Math.max(0,(this.pBowTimer||0)-dt);
    _heroUpdateProjs(this,'dungeon',dt);
    this.playerIFrames=Math.max(0,this.playerIFrames-dt);
    if(Phaser.Input.Keyboard.JustDown(this.keys.TAB))this._interact();
    this._updateInteractPrompt();
    this._updateDungeonHUD();
  }
  _movePlayer(dt){
    // Bog slow timer
    if(this._bogSlowTimer>0){this._bogSlowTimer=Math.max(0,this._bogSlowTimer-dt);}
    var bogMult=(this._bogSlowTimer>0)?0.4:1.0;
    var k=this.keys,spd=150*bogMult,vx=0,vy=0;
    if(this._bogSlowTimer>0&&!this._bogFlashShown){this._bogFlashShown=true;this._floatText(this.px,this.py-28,'🐍 SLOWED!','#44cc44');}
    if(this._bogSlowTimer<=0)this._bogFlashShown=false;
    if(k.LEFT.isDown||k.A.isDown){vx=-spd;this.pdir='left';}
    if(k.RIGHT.isDown||k.D.isDown){vx=spd;this.pdir='right';}
    if(k.UP.isDown||k.W.isDown){vy=-spd;if(!k.LEFT.isDown&&!k.A.isDown&&!k.RIGHT.isDown&&!k.D.isDown)this.pdir='up';}
    if(k.DOWN.isDown||k.S.isDown){vy=spd;if(!k.LEFT.isDown&&!k.A.isDown&&!k.RIGHT.isDown&&!k.D.isDown)this.pdir='down';}
    if(vx&&vy){vx*=.707;vy*=.707;}
    var _mm=MX.moveMods(this); if(_mm.rev){vx=-vx;vy=-vy;} vx*=_mm.mult; vy*=_mm.mult;
    // ice floors: you slide — velocity changes slowly and carries on when you let go
    var _S=this._mxs; if(_S&&_S.slipT>0){ var sv=this._slipV||(this._slipV={x:vx,y:vy}), kk=Math.min(1,dt*1.6); sv.x+=(vx-sv.x)*kk; sv.y+=(vy-sv.y)*kk; if(!this._canGoD(this.px+sv.x*dt,this.py))sv.x*=-0.4; if(!this._canGoD(this.px,this.py+sv.y*dt))sv.y*=-0.4; vx=sv.x; vy=sv.y; } else this._slipV=null;
    var nx=this.px+vx*dt,ny=this.py+vy*dt;
    if(this._canGoD(nx,this.py))this.px=nx;
    if(this._canGoD(this.px,ny))this.py=ny;
    if(vx||vy)this.p_bobPhase+=dt*8;
    this.pHead.setY(-11+Math.sin(this.p_bobPhase)*2*(vx||vy?1:0));
    this.pWeapon.setPosition(this.pdir==='left'?-12:12,-2);
    this.pEyeL.setY(this.pdir==='up'?-16:-12);this.pEyeR.setY(this.pdir==='up'?-16:-12);
    if(this.playerIFrames>0)this.pBody.setFillStyle(Math.floor(this.playerIFrames*10)%2===0?0xff4444:0x4488dd);
    else this.pBody.setFillStyle(0x4488dd);
    this.pCont.setPosition(this.px,this.py);
    if(this._lab)this.pCont.setDepth(this._yDepth(this.py));
    if(this.pWalkSt){this.pWalkSt.dir=this.pdir;_heroAnimate(this,this.pSprite,this.pWalkSt,vx,vy,dt,(this.playerAtkTimer||0),(this.pBowTimer||0));}
    _heroShieldTick(this, this.px, this.py);
  }
  // ─── Dungeon Fog of War (radius-based, persistent per floor) ────────────────
  _initDngFog(){
    if(this._dngFogGfx){this._dngFogGfx.destroy();this._dngFogGfx=null;}
    var ps=this.worldScene.playerState;
    var key=this.siteId+'_'+this.floor;
    if(!ps.dungeonFog)ps.dungeonFog={};
    if(ps.dungeonFog[key]){
      this._dngFogExplored=_fogUnpack(ps.dungeonFog[key],DW*DH);
    }else{
      this._dngFogExplored=new Uint8Array(DW*DH);
    }
    this._dngFogGfx=this.add.graphics().setDepth(25);
    this._dngFogTile={tx:-1,ty:-1};
    this._dngRevealFog(true); // initial reveal at spawn
  }
  _dngRevealFog(force){
    var ptx=Math.floor(this.px/TILE),pty=Math.floor(this.py/TILE);
    if(!force&&ptx===this._dngFogTile.tx&&pty===this._dngFogTile.ty)return;
    this._dngFogTile={tx:ptx,ty:pty};
    var R=(_heroActiveFamiliars(this.worldScene.playerState).length>0)?10:7,fog=this._dngFogExplored,changed=false;
    for(var dy=-R;dy<=R;dy++){
      for(var dx=-R;dx<=R;dx++){
        if(dx*dx+dy*dy>R*R)continue;
        var nx=ptx+dx,ny=pty+dy;
        if(nx<0||nx>=DW||ny<0||ny>=DH)continue;
        if(!fog[ny*DW+nx]){fog[ny*DW+nx]=1;changed=true;}
      }
    }
    if(changed||force){
      this._dngRedrawFog();
      if(this._inspect){ _drawMinimapHud(null,this); return; } // Site Lab: never write fog into the save
      // Persist fog to playerState
      var ps=this.worldScene.playerState;
      if(!ps.dungeonFog)ps.dungeonFog={};
      ps.dungeonFog[this.siteId+'_'+this.floor]=_fogPack(fog);
    }
    _drawMinimapHud(null,this);
  }
  _dngRedrawFog(){
    var g=this._dngFogGfx;if(!g)return;
    g.clear();g.fillStyle(0x000000,1);
    for(var ty=0;ty<DH;ty++){
      for(var tx=0;tx<DW;tx++){
        if(!this._dngFogExplored[ty*DW+tx])g.fillRect(tx*TILE,ty*TILE,TILE,TILE);
      }
    }
  }

  _canGoD(nx,ny){
    var hw=7,hh=5;
    var corners=[[nx-hw,ny-hh],[nx+hw,ny-hh],[nx-hw,ny+hh],[nx+hw,ny+hh],[nx,ny]];
    for(var i=0;i<corners.length;i++){
      var tx=Math.floor(corners[i][0]/TILE),ty=Math.floor(corners[i][1]/TILE);
      if(tx<0||tx>=DW||ty<0||ty>=DH)return false;
      if(this.dtiles[ty][tx]===DNG.WALL)return false;
    }
    if(this._mxFx&&MX.blocked(this,nx,ny))return false;
    return true;
  }
  _updateMonsters(dt){
    var self=this;
    if(!this.dngProj)this.dngProj=[];
    // Update projectiles
    this.dngProj=this.dngProj.filter(function(pr){
      if(!pr.vis)return false;
      pr.life-=dt;
      var prevX=pr.x,prevY=pr.y;
      pr.x+=pr.vx*dt;pr.y+=pr.vy*dt;
      // Section 3 (SW Highlands): projectiles bounce off walls, max 4 bounces, lose 25% speed per bounce
      if(self.siteSection===3){
        var _bptx=Math.floor(pr.x/TILE),_bpty=Math.floor(pr.y/TILE);
        if(_bptx>=0&&_bptx<DW&&_bpty>=0&&_bpty<DH&&self.dtiles[_bpty]&&self.dtiles[_bpty][_bptx]===DNG.WALL){
          pr.bounces=(pr.bounces||0)+1;
          if(pr.bounces>=4){pr.vis.destroy();return false;}
          // Determine which axis caused the collision
          var _xWall=self.dtiles[Math.floor(prevY/TILE)]&&self.dtiles[Math.floor(prevY/TILE)][_bptx]===DNG.WALL;
          var _yWall=self.dtiles[_bpty]&&self.dtiles[_bpty][Math.floor(prevX/TILE)]===DNG.WALL;
          if(_xWall&&!_yWall)pr.vx*=-0.75;
          else if(_yWall&&!_xWall)pr.vy*=-0.75;
          else{pr.vx*=-0.75;pr.vy*=-0.75;}
          pr.x=prevX+pr.vx*dt;pr.y=prevY+pr.vy*dt;
        }
      }
      pr.vis.setPosition(pr.x,pr.y);
      if(pr.life<=0){pr.vis.destroy();return false;}
      if(Math.hypot(pr.x-self.px,pr.y-self.py)<14&&self.playerIFrames<=0){
        pr.vis.destroy();
        // Apply bog slow if this was a bog_flame projectile
        if(pr.bog){self._bogSlowTimer=2.5;self._bogFlashShown=false;}
        // Knockback: 3× for section 3, normal for others
        var _ks=Math.hypot(pr.vx,pr.vy)||1;
        var _kb=self.siteSection===3?96:32;
        var _kbx=pr.vx/_ks*_kb,_kby=pr.vy/_ks*_kb;
        if(self._canGoD(self.px+_kbx,self.py+_kby)){self.px+=_kbx;self.py+=_kby;}
        else if(self._canGoD(self.px+_kbx*0.4,self.py+_kby*0.4)){self.px+=_kbx*0.4;self.py+=_kby*0.4;}
        self.pCont.setPosition(self.px,self.py);
        self._monsterHitsPlayer({def:{atk:pr.dmg},isBoss:pr.isBoss});
        return false;
      }
      return pr.life>0;
    });
    // Tick bog floor puddles
    if(this._dngBogPuddles){
      var _self2=this;
      this._dngBogPuddles=this._dngBogPuddles.filter(function(bp){
        bp.life-=dt;
        if(bp.life<=0){bp.vis.destroy();return false;}
        bp.vis.setAlpha(Math.min(0.45,bp.life*0.15));
        if(Math.hypot(_self2.px-bp.x,_self2.py-bp.y)<bp.r+8){
          _self2._bogSlowTimer=Math.max(_self2._bogSlowTimer||0,1.5);
          _self2._bogFlashShown=false;
        }
        return true;
      });
    }
    MX.tickScene(this,dt);
    this.monsters.forEach(function(mon){
      if(mon.dead)return;
      if(mon._hold>0){ mon._hold-=dt; if(mon.mx)MX.anim(MX.A(self),mon,mon._m,dt,0); return; }   // performing a boss pattern / staggered (09bb)
      if(mon.mx){ MX.tick(self,mon,dt); return; }
      if(mon.rid&&typeof Tome!=='undefined'&&Math.hypot(self.px-mon.x,self.py-mon.y)<280)Tome.see('monster',mon.rid);
      var dx=self.px-mon.x,dy=self.py-mon.y,dist=Math.hypot(dx,dy);
      var at=mon.def.atkType||'melee';
      var isRanged=['arrow','flame','bog_flame','heat_seek','scatter','scatter_arrow','scatter_flame','lightning'].includes(at);
      var RANGED_CHASE=isRanged?260:190;
      if(dist<RANGED_CHASE)mon.state='chase'; else if(dist>320)mon.state='wander';
      var mdefSpd=mon.def.spd||55;
      var spd=mon.isBoss?Math.min(mdefSpd+15,90):mdefSpd;
      if(!mon._md)mon._md={};
      var md=mon._md;
      // Always save the true player-aimed angle before movement may override it
      var playerAng=Math.atan2(dy,dx);
      if(mon.state==='chase'){
        var ang=playerAng;
        var mv=spd;
        var mt=mon.def.moveType||'normal';
        if(mt==='pulse'){
          md.pt=(md.pt||0)-dt; if(md.pt<=0){md.pt=1.2+Math.random();md.pon=!md.pon;}
          mv=md.pon?spd*2.2:0;
        } else if(mt==='zigzag'){
          md.zt=(md.zt||0)-dt; if(md.zt<=0){md.zt=0.5;md.zd=(md.zd||1)*-1;}
          var perp=ang+Math.PI/2;
          var lx=mon.x+Math.cos(perp)*spd*0.7*md.zd*dt,ly=mon.y+Math.sin(perp)*spd*0.7*md.zd*dt;
          if(self._canGoD(lx,mon.y))mon.x=lx; if(self._canGoD(mon.x,ly))mon.y=ly;
          mv=spd*0.7;
        } else if(mt==='rush'){
          md.rc=(md.rc||0)-dt;
          if(dist<100&&md.rc<=0){md.rushing=true;md.rt=0.4;md.rc=3+Math.random()*2;}
          if(md.rushing){md.rt-=dt;if(md.rt<=0)md.rushing=false;mv=spd*3.5;} else mv=spd*0.4;
        } else if(mt==='orbit'){
          md.oa=(md.oa||ang)+spd*0.006*dt;
          var tx=self.px+Math.cos(md.oa)*130,ty=self.py+Math.sin(md.oa)*130;
          ang=Math.atan2(ty-mon.y,tx-mon.x); mv=spd*1.3;
        } else if(mt==='teleport'){
          md.tt=(md.tt||0)-dt;
          if(md.tt<=0&&dist>70){
            md.tt=2.5+Math.random()*2;
            var td=Math.min(dist-50,100);
            var tx2=mon.x+Math.cos(ang)*td,ty2=mon.y+Math.sin(ang)*td;
            if(self._canGoD(tx2,ty2)){mon.x=tx2;mon.y=ty2;mon.body.setFillStyle(0xffffff);
              self.time.delayedCall(100,function(){if(!mon.dead)mon.body.setFillStyle(mon.def.color||0x884422);});}
          }
          mv=spd*0.5;
        } else if(mt==='strafe'){
          md.sd=(md.sd||1); md.st=(md.st||0)-dt;
          if(md.st<=0){md.st=1+Math.random();md.sd*=-1;}
          var perp2=ang+Math.PI/2;
          var sx2=mon.x+Math.cos(perp2)*spd*md.sd*dt,sy2=mon.y+Math.sin(perp2)*spd*md.sd*dt;
          if(self._canGoD(sx2,mon.y))mon.x=sx2; if(self._canGoD(mon.x,sy2))mon.y=sy2;
          if(dist<120)mv=-spd*0.6; else if(dist>200)mv=spd*0.5; else mv=0;
        }
        if(mv!==0){
          var nmx=mon.x+Math.cos(ang)*mv*dt,nmy=mon.y+Math.sin(ang)*mv*dt;
          if(self._canGoD(nmx,mon.y))mon.x=nmx;
          if(self._canGoD(mon.x,nmy))mon.y=nmy;
        }
        // Ranged monsters keep preferred firing distance
        if(isRanged&&mt!=='orbit'){
          var prefDist=120;
          var ang2=Math.atan2(dy,dx);
          if(dist<prefDist-20){
            var bx2=mon.x-Math.cos(ang2)*spd*0.7*dt,by2=mon.y-Math.sin(ang2)*spd*0.7*dt;
            if(self._canGoD(bx2,mon.y))mon.x=bx2; if(self._canGoD(mon.x,by2))mon.y=by2;
          } else if(dist<prefDist+30){
            if(!md.sD)md.sD=1; if(!md.sT)md.sT=0;
            md.sT-=dt; if(md.sT<=0){md.sT=1.2+Math.random();md.sD*=-1;}
            var perp3=ang2+Math.PI/2;
            var sx3=mon.x+Math.cos(perp3)*spd*0.5*md.sD*dt,sy3=mon.y+Math.sin(perp3)*spd*0.5*md.sD*dt;
            if(self._canGoD(sx3,mon.y))mon.x=sx3; if(self._canGoD(mon.x,sy3))mon.y=sy3;
          }
        }
      } else {
        mon.wanderTimer-=dt;
        if(mon.wanderTimer<=0){mon.wanderTimer=1.5+Math.random()*2;var wA=Math.random()*Math.PI*2;mon.wanderVx=Math.cos(wA)*(spd*.4);mon.wanderVy=Math.sin(wA)*(spd*.4);}
        var wnx=mon.x+(mon.wanderVx||0)*dt,wny=mon.y+(mon.wanderVy||0)*dt;
        if(self._canGoD(wnx,mon.y))mon.x=wnx; else mon.wanderVx*=-1;
        if(self._canGoD(mon.x,wny))mon.y=wny; else mon.wanderVy*=-1;
      }
      mon.cont.setPosition(mon.x,mon.y);
      if(self._lab)mon.cont.setDepth(self._yDepth(mon.y));
      mon.atkTimer=Math.max(0,mon.atkTimer-dt);
      if(mon.atkTimer>0||self.playerIFrames>0)return;
      // Stomp attack: full AoE in section 2 (wetlands); melee fallback elsewhere
      if(at==='stomp'){
        if(self.siteSection===2&&dist<90){
          mon.atkTimer=3.5;
          var _sw=self.add.circle(mon.x,mon.y,0,0x5a4a28,0.55).setDepth(9);
          self.tweens.add({targets:_sw,radius:72,alpha:0,duration:520,onComplete:function(){_sw.destroy();}});
          if(dist<72&&self.playerIFrames<=0){
            var _smAtk=mon.monAtk!==undefined?mon.monAtk:mon.def.atk;
            self._monsterHitsPlayer({def:{atk:Math.ceil(_smAtk*0.75)},isBoss:mon.isBoss});
            self._floatText(self.px,self.py-22,'STOMP!','#886600');
          }
        } else if(dist<30){
          mon.atkTimer=1.5;self._monsterHitsPlayer(mon);
        }
      } else if(at==='melee'){
        if(dist<30){mon.atkTimer=mon.isBoss?1.2:1.5;self._monsterHitsPlayer(mon);}
      } else if(dist<200){
        // Ranged attack — bosses fire 50% faster projectiles
        var bossSpeedMult=mon.isBoss?1.5:1.0;
        var cfg={arrow:{col:0xccaa44,spd:260,r:4,life:2.5},
          flame:{col:0xff5500,spd:180,r:6,life:2},
          bog_flame:{col:0x44cc44,spd:150,r:7,life:2.5,bog:true},
          heat_seek:{col:0xff8800,spd:140,r:7,life:3},
          lightning:{col:0x88aaff,spd:320,r:4,life:1.5},
          scatter:{col:0xccaa44,spd:240,r:4,life:2},
          scatter_arrow:{col:0xccaa44,spd:240,r:4,life:2},
          scatter_flame:{col:0xff6600,spd:180,r:6,life:2},
        }[at]||{col:0xaa8844,spd:220,r:4,life:2};
        var finalSpd=cfg.spd*bossSpeedMult;
        var atkCd=mon.isBoss?1.5:2.2;
        mon.atkTimer=atkCd;
        var toFire=(at==='scatter'||at==='scatter_arrow'||at==='scatter_flame')?[-0.3,0,0.3]:[0];
        // Use saved playerAng for aiming — 'ang' may have been overwritten by orbit/strafe movement
        var _atkAng=playerAng;
        toFire.forEach(function(offset){
          var fAng=_atkAng+offset;
          var vis2=self.add.circle(mon.x,mon.y,cfg.r,cfg.col).setDepth(self._lab?12.9:12);
          var monAtk2=mon.monAtk!==undefined?mon.monAtk:mon.def.atk;
          self.dngProj.push({vis:vis2,x:mon.x,y:mon.y,vx:Math.cos(fAng)*finalSpd,vy:Math.sin(fAng)*finalSpd,
            dmg:Math.max(1,Math.round(monAtk2*0.5)),life:cfg.life,isBoss:mon.isBoss,bounces:0,bog:cfg.bog||false});
        });
      }
      // Contact damage: touching any monster deals continuous damage (1 per second)
      var contactR=(mon.def.r||10)+14;
      if(dist<contactR&&self.playerIFrames<=0&&!self.worldScene.playerState.godMode){
        if(!mon._contactDmgTimer)mon._contactDmgTimer=0;
        mon._contactDmgTimer-=dt;
        if(mon._contactDmgTimer<=0){
          mon._contactDmgTimer=1.0;
          var ps2=self.worldScene.playerState;
          var cdef=calcStatsFromState(ps2).def||0;
          var cdmg=Math.max(1,Math.ceil((mon.def.atk||1)*0.3)-Math.floor(cdef*0.5));
          ps2.hp=Math.max(0,ps2.hp-cdmg);
          self.playerIFrames=0.25;
          self._floatText(self.px,self.py-20,'-'+cdmg+' contact','#ff8866');
          self._updateDungeonHUD();
          if(ps2.hp<=0){self._playerDied();return;}
        }
      } else if(dist>=contactR){
        mon._contactDmgTimer=0;
      }
    });
  }
  _monsterHitsPlayer(mon){
    var ps=this.worldScene.playerState;
    if(ps.godMode)return;
    var def=calcStatsFromState(ps).def||0;
    var dmg=Math.max(1,mon.def.atk-def+Math.floor(Math.random()*4-1));
    dmg=_heroApplyShield(this, ps, dmg, this.px, this.py);
    if(dmg<=0){this.playerIFrames=0.5;return;}
    ps.hp=Math.max(0,ps.hp-dmg);this.playerIFrames=0.9;
    this._floatText(this.px,this.py-20,'-'+dmg,'#ff4444');
    if(ps.hp<=0)this._playerDied();
  }
  _playerAttack(){
    if(this.playerAtkTimer>0)return;
    var ps=this.worldScene.playerState;
    var atk=calcStatsFromState(ps).atk||ps.atk||3;
    this.playerAtkTimer=0.45; if(typeof ZSFX!=='undefined')ZSFX.play('swing');
    var self=this;
    // ── Directional sword swing tween ──────────────────────────────────────
    var wep=this.pWeapon;
    var dir=this.pdir||'right';
    var sw={right:[-50,110,12,-10,16,8],left:[230,70,-12,-10,-16,8],down:[-60,60,10,4,-10,6],up:[120,60,10,-16,-10,-16]};
    var s=sw[dir]||sw.right;
    wep.setAngle(s[0]);wep.setPosition(s[2],s[3]);wep.setFillStyle(0xeeffdd);wep.setSize(5,18);
    this.tweens.add({targets:wep,angle:s[1],x:s[4],y:s[5],duration:160,ease:'Power3',
      onComplete:function(){
        self.tweens.add({targets:wep,angle:dir==='left'?-15:15,x:dir==='left'?-12:12,y:-2,duration:80,
          onComplete:function(){wep.setFillStyle(0xcccccc);wep.setSize(4,14);}});
      }});
    var hit=false;
    this.monsters.forEach(function(mon){
      if(mon.dead||Math.hypot(mon.x-self.px,mon.y-self.py)>78+Math.max(0,(mon.def.r||10)-18))return;
      if(!_heroInArc(self.pdir||'right',mon.x-self.px,mon.y-self.py))return;
      if(!_heroLOS(self,self.px,self.py,mon.x,mon.y))return;   // no hitting through walls
      var dmg=Math.max(1,atk-(mon.def.def||0)+Math.floor(Math.random()*5-2));
      MX._src='melee'; mon.hp-=dmg; MX._src=null; hit=true; if(mon.isBoss&&typeof BossMoments!=='undefined'){ BossMoments.hitStop(self,0.05); ZSFX.play('hit'); }
      self._floatText(mon.x,mon.y-mon.def.r-10,'-'+dmg,'#ffdd44');
      mon.body.setFillStyle(0xffffff);
      var bodyRef=mon.body,monDef=mon.def;
      self.time.delayedCall(130,function(){if(!mon.dead)mon.body.setFillStyle(monDef.color);});
      mon.hpFill.displayWidth=32*Math.max(0,mon.hp/mon.maxHp);
      if(mon.hp<=0)self._monsterDied(mon);
    });
    if(!hit)this._floatText(this.px,this.py-25,'miss','#888888');
  }
  _monsterDied(mon){
    if(mon.dead)return;mon.dead=true;
    var ps=this.worldScene.playerState;
    ps.xp+=mon.def.xp;this._floatText(mon.x,mon.y-28,'+'+mon.def.xp+' XP','#88aaff');
    var g=mon.def.gMin+Math.floor(Math.random()*(mon.def.gMax-mon.def.gMin+1));
    ps.gold+=g;this._floatText(mon.x,mon.y-40,'+'+g+'g','#ffd700');
    this._checkLevelUp(ps);
    if(Math.random()<0.08&&!mon.isBoss)this._dropItem(mon.def.sec);
    if(mon.isBoss)this._onBossDefeated(mon);
    var cont=mon.cont;
    this.tweens.add({targets:cont,alpha:0,scaleX:1.5,scaleY:1.5,duration:500,ease:'Power2',onComplete:function(){cont.destroy();}});
  }
  _onBossDefeated(mon){
    if(!this._isIsland&&!this._isBonus&&!this._castle&&!this._mage&&BossPhases.onDefeated(this,mon)){ if(this._phaseLock&&typeof BossMoments!=='undefined')BossMoments.transform(this,mon); return; }   // next phase / allies still fighting
    if(typeof BossMoments!=='undefined')BossMoments.finale(this,mon);
    this._bossDefeated=true;
    var ps=this.worldScene.playerState;
    // Only the quadrant's ★ boss sites count for the main quests (bonus + island dungeons have their own tracking)
    if(!this._isIsland&&!this._isBonus&&!this._castle&&!this._mage)_completeQuest(ps,'s'+this.siteSection+'_'+this.siteType);
    if(this._mage)BossPhases.hud(this,false);
    var bc=this.interactables.find(function(i){return i.type==='boss_chest';});
    if(bc)bc.locked=false;
    if(this._portalOpen)this._portalOpen();
    if(this._captive)this._freeCaptive();
    if(this._isBonus)BossPhases.hud(this,false);
    showNotif('🏆 '+mon.def.name+' defeated!','#ffdd44');
    if(this._mage)showNotif('📖 The sanctum is yours — [Tab] the chest to learn '+((ITEMS[this._mage.spell]||{}).name||'the spell'),'#e0c0ff'); else
    if(this._castle)showNotif('🎓 The master is free — [Tab] the portal chest to learn their skill','#ffe9a8'); else
    showNotif(this._isBonus?'The treasure vault is open — [Tab] to claim it':'The exit portal is open — [Tab] to claim your reward and leave','#aaffaa');
    var self=this;
    for(var i=0;i<8;i++){
      var star=this.add.text(mon.x,mon.y,'⭐',{fontSize:'14px',fontFamily:'serif'}).setOrigin(.5).setDepth(25);
      var ang=Math.random()*Math.PI*2,d=40+Math.random()*40;
      this.tweens.add({targets:star,x:star.x+Math.cos(ang)*d,y:star.y+Math.sin(ang)*d,alpha:0,duration:900,ease:'Power2',onComplete:function(){star.destroy();}});
    }
  }
  _checkLevelUp(ps){
    var ul=ps.unlockedSections||[1];
    var maxSec=Math.max.apply(null,ul);
    var cap=maxSec>=4?20:maxSec>=3?15:maxSec>=2?10:5;
    if(ps.level>=cap){ps.xp=Math.min(ps.xp,(cap*100)-1);return;}
    var needed=ps.level*100;
    if(ps.xp>=needed){
      ps.xp-=needed;ps.level++;
      var hpGain=5+Math.floor((ps.level-1)/2);
      var atkGain=1+Math.floor((ps.level-1)/4);
      ps.maxHp+=hpGain;ps.atk=(ps.atk||3)+atkGain;
      ps.hp=Math.min(ps.hp+hpGain,ps.maxHp);
      var newMaxSec=Math.max.apply(null,ps.unlockedSections||[1]);
      var newCap=newMaxSec>=4?20:newMaxSec>=3?15:newMaxSec>=2?10:5;
      if(ps.level>=newCap){
        showNotif('⭐ Level '+ps.level+'! — Level cap reached!','#ffdd44');
      } else {
        showNotif('⭐ Level '+ps.level+'! +'+atkGain+' ATK, +'+hpGain+' HP','#ffdd44');
      }
      this._floatText(this.px,this.py-50,'LEVEL UP!','#ffdd44');
    }
  }
  _openChest(){
    // 60% chance gold, 40% chance item
    var sec=this.siteSection;
    var floor=this.floor;
    var ps=this.worldScene.playerState;
    if(!ps.inventory)ps.inventory=[];
    if(Math.random()<0.60){
      // Gold — scales with section and floor
      // Sec 1: 10-50g, Sec 2: 25-75g, Sec 3: 50-100g, Sec 4: 75-150g
      var mins=[10,25,50,75]; var maxs=[50,75,100,150];
      var mn=mins[Math.min(sec-1,3)], mx=maxs[Math.min(sec-1,3)];
      var floorBonus=Math.floor(floor*mx*0.1); // each floor adds ~10% of max
      var gold=mn+Math.floor(Math.random()*(mx-mn))+floorBonus;
      ps.gold+=gold;
      showNotif('💰 Found '+gold+' gold!','#ffd700');
      this.worldScene._emitUI();
    } else {
      // Rare item drop
      this._dropItem(sec);
    }
  }
  _dropItem(sec){
    // Area-specific potion (heals 10/20/30/40 by area)
    var areaPot=['potion_a1','potion_a2','potion_a3','potion_a4'][Math.min((sec||1)-1,3)];
    var pool=[areaPot,areaPot,areaPot].concat(
      [['iron_sword'],['long_sword'],['great_sword'],['flame_blade']][sec-1],
      [['leather'],['chain_mail'],['plate_armor'],['dragon_armor']][sec-1],
      [['gem_ruby'],['gem_sapphire'],['gem_emerald'],['gem_emerald']][sec-1]
    );
    var itemId=pool[Math.floor(Math.random()*pool.length)];
    if(!itemId)return;
    var item=ITEMS[itemId];
    var ps=this.worldScene.playerState;
    if(!ps.inventory)ps.inventory=[];
    // Max 5 potions cap — count all slot:'use' items
    if(item&&item.slot==='use'){
      var potCount=ps.inventory.filter(function(id){return ITEMS[id]&&ITEMS[id].slot==='use';}).length;
      if(potCount>=5){showNotif('Potion full (5/5) — dropped '+item.icon+' '+item.name,'#ff8844');return;}
    }
    // Add to inventory — show top notification only (no popup)
    ps.inventory.push(itemId);
    showNotif('Found: '+(item?item.icon:'')+' '+(item?item.name:itemId),'#aaffcc');
  }
  _interact(){
    var self=this;
    var near=this.interactables.find(function(i){return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8;});
    if(!near)return;
    if(near.type==='stairs_up'){
      if(this.floor===0){this._exitToWorld(null);return;}
      // Save current floor state before going back up
      var fs=this._initData.floorStates||{};
      fs[this.floor]=this._saveFloorState();
      this.scene.restart(Object.assign({},this._initData,{floor:this.floor-1,floorStates:fs,arriveAt:'exit'}));
    } else if(near.type==='stairs_down'){
      var fs2=this._initData.floorStates||{};
      fs2[this.floor]=this._saveFloorState();
      this.scene.restart(Object.assign({},this._initData,{floor:this.floor+1,floorStates:fs2,arriveAt:null}));
    } else if(near.type==='chest'){
      near.opened=true;this._openChest();showNotif('Chest opened!','#ffaa44');
      if(near.gfx)near.gfx.setAlpha(0.35);
      var g=this.add.graphics().setDepth(5);
      g.fillStyle(0xffd700,.6).fillRect(near.tx*TILE+6,near.ty*TILE+9,TILE-12,5);
      this.tweens.add({targets:g,alpha:0,duration:800,onComplete:function(){g.destroy();}});
      this.dtiles[near.ty][near.tx]=DNG.FLOOR;
    } else if(near.type==='boss_chest'){
      if(near.locked){showNotif('The exit portal is sealed — defeat the guardian first!','#ff4444');return;}
      near.opened=true;this._openBossChest();
    }
  }
  _openBossChest(){
    var ps=this.worldScene.playerState, sec=this.siteSection, self=this;
    if(!ps.inventory)ps.inventory=[];
    var gem=['gem_ruby','gem_sapphire','gem_emerald','skystone'][sec-1]||'gem_ruby';
    // ── Castle: free the teacher → learn their skill
    if(this._castle){ CastleRun.claim(this); return; }
    if(this._mage){ MageRun.claim(this); return; }
    // ── Island dungeon: the guardian's defeat clears the island → familiar
    if(this._isIsland){
      var goldAdv=80*sec; ps.gold+=goldAdv; ps.inventory.push(gem);
      showNotif('+'+goldAdv+'g + gem — the island guardian is beaten!','#44ffaa');
      _completeQuest(ps,'s'+sec+'_harbor');
      _awardIslandFamiliar(ps,sec);
      this.time.delayedCall(1500,function(){self._exitToWorld(null);});return;
    }
    // ── Bonus site: treasure vault (replayable)
    if(this._isBonus){
      if(!ps.bonusCleared)ps.bonusCleared=[];
      if(this._wasDone){
        var g3=30*sec+10*this.maxFloors; ps.gold+=g3; this._dropItem(sec);
        showNotif('💎 Vault refilled: +'+g3+'g','#ffdd44');
      } else {
        ps.bonusCleared.push(this.siteId);
        var g4=60*sec+15*this.maxFloors; ps.gold+=g4; ps.inventory.push(gem);
        var gear=[['iron_sword','leather'],['long_sword','chain_mail'],['great_sword','plate_armor'],['flame_blade','dragon_armor']][sec-1]||['iron_sword'];
        var gi=gear[Math.floor(Math.random()*gear.length)]; if(ITEMS[gi])ps.inventory.push(gi);
        if(!ps.relics)ps.relics=[];
        var relic=SITE_RELICS[this._site.design]||'Old Relic';
        if(!ps.relics.includes(this._site.design)){ ps.relics.push(this._site.design); ps.maxHp+=3; ps.hp=Math.min(ps.maxHp,ps.hp+3); }
        showNotif('💎 Treasure vault! +'+g4+'g, a gem'+(ITEMS[gi]?' and '+ITEMS[gi].icon+' '+ITEMS[gi].name:''),'#ffdd44');
        this.time.delayedCall(700,function(){showNotif('📜 Relic found: '+relic+' (+3 max HP) — '+ps.relics.length+' relics','#ffe9a8');});
      }
      this.time.delayedCall(2000,function(){self._exitToWorld(null);});return;
    }
    // ── Quadrant boss site
    var qKey='s'+sec+'_'+this.siteType;
    var rw=BOSS_REWARDS[qKey];
    if(!rw){showNotif('Mysterious chest... empty.','#aaa');this._exitToWorld(null);return;}
    // Lock this site for the rest of this life
    if(!ps.lockedSites)ps.lockedSites=[];
    if(!ps.lockedSites.includes(this.siteId))ps.lockedSites.push(this.siteId);
    // Rematch (already cleared before this run): gold + potion + gem, no first-clear rewards
    if(this._wasDone){
      var g2=75*sec; ps.gold+=g2; ps.inventory.push(gem);
      showNotif('⚔️ Rematch won! +'+g2+'g and a gem','#ffdd44');
      this._dropItem(sec);
      this.time.delayedCall(1500,function(){self._exitToWorld(null);});return;
    }
    var reward={completedQuest:qKey,message:rw.message,color:rw.color};
    if(rw.mount){if(!ps.ownedMounts)ps.ownedMounts=[];if(!ps.ownedMounts.includes(rw.mount)){ps.ownedMounts.push(rw.mount);if(!ps.mount&&!ps._stowedMount)ps._stowedMount=rw.mount;}}
    if(rw.rings){rw.rings.forEach(function(r){ps.inventory.push(r);var ri=ITEMS[r];if(ri)showNotif('💍 Found: '+ri.name,'#ffccff');});}
    if(rw.unlockSection)reward.unlockSection=rw.unlockSection;
    // Boss tower: the captive craftsman moves to the village
    if(this.siteType==='tower'){
      if(!ps.rescued)ps.rescued=[];
      if(!ps.rescued.includes(sec)){ ps.rescued.push(sec); var C=CRAFTSMEN[sec]; if(C)this.time.delayedCall(900,function(){showNotif(C.icon+' '+C.n+' has moved into the village!','#ffe9a8');}); }
    }
    var goldBonus=50*sec;ps.gold+=goldBonus;
    showNotif('+'+goldBonus+'g','#ffd700');showNotif(rw.message,rw.color||'#ffdd44');
    this.time.delayedCall(2000,function(){self._exitToWorld(reward);});
  }
  _updateInteractPrompt(){
    var self=this;
    var near=this.interactables.find(function(i){return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8;});
    if(near){
      var txt='[Tab] ';
      var tw=this.siteType==='tower';
      if(near.type==='stairs_up')txt+=this._trialRun?'Give up the trial':this.floor===0?(tw?'Leave the Tower':'Leave the Dungeon'):(tw?'Go Down to Floor '+this.floor:'Climb Up to Floor '+this.floor);
      else if(near.type==='stairs_down')txt+=(tw?'Climb Up':'Descend')+' to Floor '+(this.floor+2)+'/'+this.maxFloors;
      else if(near.type==='chest')txt+='Open Chest';
      else if(near.type==='boss_chest')txt+=near.locked?(this._isBonus?'Vault sealed — defeat the elite':'Sealed — defeat the guardian'):(this._isBonus?'💎 Open the treasure vault':'★ Claim reward & exit');
      if(this.interactPrompt)this.interactPrompt.setText(txt).setPosition(this.px,this.py-52).setVisible(true);
    } else if(this.interactPrompt) this.interactPrompt.setVisible(false);
  }
  _updateDungeonHUD(){
    if(!this.worldScene||!this.worldScene.playerState)return;
    var ps=this.worldScene.playerState;
    if(this._trialRun){ var _tl=document.getElementById('dng-title'), _tr=this._trialRun, _tt='✨ '+_tr.title+(_tr.stages.length>1?' — trial '+(_tr.stage+1)+' of '+_tr.stages.length:''); if(_tl&&_tl.textContent!==_tt)_tl.textContent=_tt; }
    var label=(this._mage?'🔮 ':this.siteType==='tower'?'🗼 ':'⚔️ ')+((this._site&&this._site.name)||(this.siteType==='tower'?'Tower':'Dungeon'))+(this._site&&this._site.boss?' ★':'');
    if(!this._trialRun)document.getElementById('dng-title').textContent=label+' — Floor '+(this.floor+1)+'/'+this.maxFloors;
    // HP bar
    var hpPct=Math.min(100,ps.hp/ps.maxHp*100);
    var hpCol=hpPct>60?'#44ff88':hpPct>30?'#ffaa00':'#ff3322';
    document.getElementById('dng-hp-bar').style.width=hpPct+'%';
    document.getElementById('dng-hp-bar').style.background=hpCol;
    document.getElementById('dng-hp-txt').textContent=ps.hp+'/'+ps.maxHp;
    // XP bar
    var xpPct=Math.min(100,(ps.xp/(ps.level*100))*100);
    var xpBar=document.getElementById('dng-xp-bar');
    if(xpBar)xpBar.style.width=xpPct+'%';
    var lvEl=document.getElementById('dng-lv-txt');
    if(lvEl)lvEl.textContent='Lv '+ps.level+' ('+Math.floor(xpPct)+'%)';
    // Gold
    var gEl=document.getElementById('dng-gold-txt');
    if(gEl)gEl.textContent='💰 '+ps.gold+'g';
    // Show minimap HUD in dungeon
    var mh=document.getElementById('minimap-hud');if(mh)mh.style.display='';
  }
  _playerDied(){ if(this._playerDead)return; this._playerDead=true; _heroDied(this); }
  _floatText(x,y,msg,col){
    var t=this.add.text(x,y,msg,{fontSize:'12px',color:col,fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(30);
    this.tweens.add({targets:t,y:y-40,alpha:0,duration:1400,ease:'Power2',onComplete:function(){t.destroy();}});
  }
  _saveFloorState(){
    // Record which monsters are dead and which chests are opened
    var dead=[];
    if(this.monsters)this.monsters.forEach(function(m,i){if(m.dead)dead.push(i);});
    var opened=[];
    if(this.interactables)this.interactables.forEach(function(i){if(i.opened)opened.push({x:i.x,y:i.y});});
    return{dead:dead,opened:opened};
  }
  _restoreFloorState(state){
    if(!state)return;
    // Kill monsters that were dead on this floor
    if(state.dead&&this.monsters)state.dead.forEach(function(idx){
      var m=this.monsters[idx];if(m&&!m.dead){m.dead=true;m.cont.setAlpha(0);}
    }.bind(this));
    // Re-open chests that were opened
    if(state.opened&&this.interactables){
      this.interactables.forEach(function(i){
        if(!state.opened.some(function(o){return Math.abs(o.x-i.x)<4&&Math.abs(o.y-i.y)<4;}))return;
        if(i.type==='chest'||i.type==='boss_chest')i.opened=true;
        if(i.gfx)i.gfx.setAlpha(0.35);
      });
    }
  }
  _exitToWorld(reward){
    var ws=this.worldScene;
    // Only give section unlock if NOT an island dungeon/volcano/tower
    if(reward&&reward.unlockSection&&this._returnScene==='World')ws.unlockSection(reward.unlockSection);
    // Record exit time for respawn system
    if(ws&&ws.playerState){
      if(!ws.playerState.siteExitTimes)ws.playerState.siteExitTimes={};
      ws.playerState.siteExitTimes[this.siteId||('s'+this.siteSection+'_'+this.siteType)]=Date.now();
    }
    this.scene.stop('Dungeon');
    this.scene.wake(this._returnScene||'World');
    document.getElementById('hud').style.display='';
    document.getElementById('dungeon-hud').style.display='none';
    if(ws)ws._emitUI();
  }
}

