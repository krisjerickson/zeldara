// ═══════════════════════════════════════════════════════════════════════
// ║ 10z-glimmerhall.js — round 59: the Glimmerhall is a room you walk into, like Mira's workshop and the other great village buildings.
// ║ Kris: "the glimmerhall needs to be a room like the other major village buildings, with an NPC and interiors, instead of just a popup".
// ║ [Tab] at its door now enters the hall (07v interior 'glimmerhall'): tall windows of coloured glass, a glassblower's furnace and its
// ║ crucible, a long fusing bench with lattices on it, shelves of soulglass, the realm-banners, lamps of spirit light, and Sólveig the
// ║ Glasswright at her bench (her painted picture np_solveig, wave 53). Talk to her ([Tab]) to fuse six shards of a realm into its lattice.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof INTERIOR_THEMES==='undefined'||typeof INTERIOR_LAYOUTS==='undefined')return;
  INTERIOR_THEMES.glimmerhall={name:'The Glimmerhall',npc:null,wall:'plaster',floor:'marble',wallA:'#2e4a66',wallB:'#1d3248',trim:'#9fe8ff',floorA:'#c8d8e0',floorB:'#8aa4b4',light:'#bff4ff',rug:'#1d5a6a',rug2:'#9fe8ff',
    blurb:'A hall of glass on the village green: tall windows of coloured glass, a glassblower\'s furnace glowing blue, a long fusing bench with half-made lattices, shelves of soulglass shards sorted by realm, the four realms\' banners, lamps of captured spirit light — and Sólveig the Glasswright at her bench.'};
  // her pieces are drawn as their nearest kin (a glass furnace = the forge hearth, the fusing bench = the long table)
  if(typeof INT_PROPS!=='undefined'){ INT_PROPS.glassfurnace=function(){ return INT_PROPS.forgehearth.apply(this,arguments); }; INT_PROPS.fusebench=function(ctx,w,h,P,o){ return INT_PROPS.longtable(ctx,w,h,P,o||{}); };
    if(typeof INT_HT!=='undefined'){ INT_HT.glassfurnace=INT_HT.forgehearth||88; INT_HT.fusebench=INT_HT.longtable||48; } }
  INTERIOR_LAYOUTS.glimmerhall={ deco:[['banner',1.2,0.9,'#3a8a3a'],['window',2.6,1],['shelf2',4.2,2.4,'gems'],['window',7,1],['shelf2',8.4,2.4,'gems'],['window',11.2,1],['banner',12.5,0.9,'#c84a20']], rug:[4,5,6,3], npc:[7,3.4],
    props:[['glassfurnace',1,2,3,1],['fusebench',5,3,4,1,{top:['crystalball','candle','jar']}],['showcase',10,3,3,1],['bookshelf',12,5,1,2],['candelabra',4,7,1,1],['candelabra',9,7,1,1],['crates',1,6,2,1],['plant',12,7,1,1],['lectern',2,5,1,1]],
    lights:[[2.5,2.6,170,0.45,{flicker:0.25}],[7,4,150,0.4,{pulse:0.18}],[11.5,4,110,0.3,{pulse:0.25,period:1500}],[4.5,7.3,80,0.3,{flicker:0.2}],[9.5,7.3,80,0.3,{flicker:0.2}]], particles:'sparkle', dark:0.04 };
  if(typeof INTERIOR_TYPES!=='undefined'&&INTERIOR_TYPES.indexOf('glimmerhall')<0)INTERIOR_TYPES.push('glimmerhall');
  setTimeout(function(){
    if(typeof ZSPIRIT!=='undefined'){ var c0=ZSPIRIT.check; ZSPIRIT.check=function(ws){ var D=ZSPIRIT.door(); if(D&&ws.player&&Math.hypot(ws.player.x-D.x,ws.player.y-D.y)<TILE*1.6){
          if(!ws._interactPrompt||ws._interactPrompt._zsp!=='glim'){ if(ws._interactPrompt)ws._interactPrompt.destroy(); ws._interactPrompt=domText(ws,D.x,D.y-40,'[Tab] Enter the Glimmerhall',{fontSize:'10px',color:'#9fe8ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20); ws._interactPrompt._zsp='glim'; }
          if(Phaser.Input.Keyboard.JustDown(ws.keys.TAB))ws._enterBuilding({type:'glimmerhall'}); return true; }
        return c0.apply(ZSPIRIT,arguments); }; }
    if(typeof BuildingScene==='undefined')return; var B=BuildingScene.prototype;
    var sn=B._spawnNPC; B._spawnNPC=function(type){ if(!(this.building&&this.building.type==='glimmerhall'))return sn.apply(this,arguments);
      var N=this._imap.npc, nx=N.x, ny=N.y, Z=typeof _scn==='function'?_scn():null; this.npcX=nx; this.npcY=ny;
      var im=Z&&Z.has&&Z.has('np_solveig')?Z.image(this,'np_solveig',nx,ny+16,Z.K,ny+14):null;
      if(im){ im.setOrigin(0.5,1); this.tweens.add({targets:im,y:im.y-2,duration:1600,yoyo:true,repeat:-1,ease:'Sine.inOut'}); }
      else { var g=this.add.graphics().setDepth(ny+14); g.fillStyle(0x000000,0.3).fillEllipse(nx,ny+14,20,6); g.fillStyle(0x2e4a66,1).fillTriangle(nx-9,ny+12,nx+9,ny+12,nx,ny-8); g.fillStyle(0xf0d2b0,1).fillCircle(nx,ny-12,6); g.fillStyle(0xe8e0c0,1).fillRect(nx-6,ny-16,12,4); g.fillStyle(0x9fe8ff,0.8).fillCircle(nx+10,ny-2,4); }
      domText(this,nx,ny-40,'Sólveig the Glasswright',{fontSize:'8px',color:'#9fe8ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(9400); };
    var ni=B._npcInteract; B._npcInteract=function(){ if(this.building&&this.building.type==='glimmerhall')return ZSPIRIT.solveig(this.worldScene); return ni.apply(this,arguments); };
    var ci=B._checkBuildingInteraction; B._checkBuildingInteraction=function(){ var r=ci.apply(this,arguments); if(this.building&&this.building.type==='glimmerhall'&&this.interactPrompt&&this.interactPrompt.visible)this.interactPrompt.setText('[Tab] Talk to Sólveig'); return r; };
  },0);
})();
