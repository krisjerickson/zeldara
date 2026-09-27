// ─── Phaser Config ──────────────────────────────
var game=new Phaser.Game({
  type:Phaser.AUTO,
  backgroundColor:'#0a0a0a',
  scene:[TitleScene,BootScene,WorldScene,BuildingScene,DungeonScene,IslandScene,CaveScene,SkyScene,VolcanoMazeScene,VolcanoBulletHellScene,VolcanoPuzzleScene,VolcanoEscapeScene,VolcanoBossRushScene],
  scale:{mode:Phaser.Scale.RESIZE,parent:document.getElementById('phaser-root'),width:'100%',height:'100%'},
  render:{antialias:false},
});

// Keyboard shortcuts: see 24-pause-input.js (one global handler for every scene).


