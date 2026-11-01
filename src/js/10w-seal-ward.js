// ═══════════════════════════════════════════════════════════════════════
// ║ 10w-seal-ward.js — round 84c: A SEALED REGION SHOWS ITS WARD (Kris: "we are also still finding invisible walls in the game").
// ║ A region you have not opened yet (its master builder still held in the tower before it) stops you at its border — on foot only at a few
// ║ beaches, but on the Alligator across open water and the lakes. Nothing showed why. Now, where you touch the border, a curtain of
// ║ aurora light with glowing runes rises and fades, and a line says what is sealed and how to open it (once every few seconds).
// ║ ZSEAL.hit(scene, region, x, y) — called by the World's walking (10-scene-world.js). Switch: ZSEAL.on.
// ═══════════════════════════════════════════════════════════════════════
// ZFEET: how far below the hero's position his feet box sits — W in the World (10-scene-world.js _canGo), D in the adventure sites
// (12-scene-dungeon.js _heroGoD). Round 84c: it was 0 (the box at his waist).
var ZFEET={W:6,D:9};
var ZSEAL={ on:true, RUNES:'ᚱᛉᚨᛟᛞᚹᛗᛇ', _t:0, _n:0,
  hit:function(sc,sec,x,y){ if(!ZSEAL.on||!sc||!sc.add)return; var now=Date.now();
    if(now-ZSEAL._t>260){ ZSEAL._t=now; try{ ZSEAL.ward(sc,x,y); }catch(e){} }
    if(now-ZSEAL._n>5000){ ZSEAL._n=now; var nm=(typeof SECTION_NAMES!=='undefined'&&SECTION_NAMES[sec])||'This land';
      var who=['','','the Wetlands','the Highlands','the Ashlands'][sec]||'its';
      if(typeof showNotif==='function')showNotif('🔒 '+nm+' is sealed by an old ward — free the master builder held in the tower before '+who+' to open it.','#9fe8ff'); } },
  // a curtain of light: soft aurora bands and three runes, rising and fading
  ward:function(sc,x,y){ var D=(typeof WR_DEPTH==='function'?WR_DEPTH(y+40):9000)+5, g=sc.add.graphics().setDepth(D).setBlendMode(Phaser.BlendModes.ADD);
    var cols=[0x5ff7d2,0x7fb8ff,0xc28bff];
    for(var i=0;i<3;i++){ g.fillStyle(cols[i],0.16); g.fillEllipse(x+(i-1)*9,y-26,22,74); }
    g.fillStyle(0xeaffff,0.22); g.fillEllipse(x,y-24,8,64);
    var t=[]; for(var k=0;k<3;k++){ var r=ZSEAL.RUNES[Math.floor(Math.random()*ZSEAL.RUNES.length)];
      t.push(sc.add.text(x+(k-1)*13,y-14-k*14,r,{fontFamily:'Segoe UI Symbol, serif',fontSize:'15px',color:'#c9fff4',stroke:'#1a6a7a',strokeThickness:3}).setOrigin(0.5).setDepth(D+1).setAlpha(0.95)); }
    g.setAlpha(0); sc.tweens.add({targets:g,alpha:1,duration:140,yoyo:true,hold:260,onComplete:function(){ g.destroy(); }});
    t.forEach(function(o,k){ sc.tweens.add({targets:o,y:o.y-16,alpha:0,delay:80+k*60,duration:620,onComplete:function(){ o.destroy(); }}); }); }
};
