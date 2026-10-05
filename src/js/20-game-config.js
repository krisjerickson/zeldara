// ─── Phaser Config ──────────────────────────────
var game=new Phaser.Game(ZENG.config({
  type:Phaser.AUTO,
  backgroundColor:'#0a0a0a',
  scene:[TitleScene,BootScene,WorldScene,BuildingScene,DungeonScene,IslandScene,SkyScene,VolcanoMazeScene,VolcanoBulletHellScene,VolcanoPuzzleScene,VolcanoEscapeScene,VolcanoBossRushScene],
  scale:{mode:Phaser.Scale.RESIZE,parent:document.getElementById('phaser-root'),width:'100%',height:'100%'},
  render:{antialias:false},
}));
if(typeof ZAtlas!=='undefined')ZAtlas.start(game);   // painted sprites: the sweeper that dresses anything still wearing a pixel sprite (04f)

// Keyboard shortcuts: see 24-pause-input.js (one global handler for every scene).



// ─── Graphics reset guard ───────────────────────
// If the browser drops the WebGL context (GPU memory pressure, driver reset — seen on integrated
// graphics), Phaser 3.60 can't recover: the canvas goes black while the DOM labels keep working.
// Save, then reload straight back into the game (the Title scene auto-continues once).
game.events.once(Phaser.Core.Events.READY,function(){
  var cv=game.canvas, fired=false; if(!cv||!cv.addEventListener||game.renderer.type!==Phaser.WEBGL)return;
  cv.addEventListener('webglcontextlost',function(e){
    e.preventDefault(); if(fired)return; fired=true;
    try{ var ws=game.scene.getScene('World'); if(ws&&ws.player&&ws.playerState)ws._save(); }catch(err){}
    try{ sessionStorage.setItem('qoz_resume',String(Date.now())); }catch(err){}
    var o=document.createElement('div'); o.id='gl-reset'; o.textContent='✨ Refreshing graphics…';
    o.style.cssText='position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#070b16;color:#bff6ff;font:600 20px Segoe UI,system-ui,sans-serif;z-index:9999';
    document.body.appendChild(o);
    setTimeout(function(){ location.reload(); },700);
  },false);
});
