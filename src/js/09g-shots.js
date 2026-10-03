// ═══════════════════════════════════════════════════════════════════════
// ║ SHOTS IN THE GAME (round 15): every arrow, dart, spell and monster shot is
// ║ now a small animated picture in the look Kris picked (ZProj.PICK), instead of
// ║ a coloured dot.
// ║   ZShot.make(scene,kind,x,y,angle,depth) → an Image that the old code moves
// ║   with setPosition() and destroy()s as before. It turns to face the way it
// ║   flies, plays its frames, leaves the look's trail and sparks when it ends.
// ║ Frames are painted once per kind (2× size, shown at half scale) from
// ║ src/js/07zx-projectiles.js. If anything fails, make() returns null and the
// ║ caller falls back to the old dot.
// ║ Round 16: familiar shots, the sky-chase darts and the Volcano climb's falling
// ║ rocks and homing fireballs use it too.
// ═══════════════════════════════════════════════════════════════════════
var ZShot={ N:8, CW:192, CH:128, on:typeof ZProj!=='undefined'&&typeof ZBrand!=='undefined',
  style:function(kind){ var f=ZProj.family(kind); return ZProj.byId(ZProj.PICK[f]); },
  meta:function(kind){ var b=kind.split(':')[0]; return {spin:b==='rock', one:b==='rock', fam:ZProj.family(kind)}; },
  bake:function(scene,kind){ var key='zs_'+kind.replace(/[^a-z0-9_]/gi,''); if(scene.textures.exists(key))return key; var M=ZShot.meta(kind), S=ZShot.style(kind), n=M.one?1:ZShot.N, cv=ZBrand.mk(ZShot.CW*n,ZShot.CH), c=cv.getContext('2d');
    for(var i=0;i<n;i++){ c.save(); c.beginPath(); c.rect(i*ZShot.CW,0,ZShot.CW,ZShot.CH); c.clip(); c.translate(i*ZShot.CW+ZShot.CW/2,ZShot.CH/2); c.scale(2,2); ZProj.draw(c,kind,S,M.spin?0:i*0.07); c.restore(); }
    var tex=scene.textures.addCanvas(key,cv); for(var k=0;k<n;k++)tex.add(k,0,k*ZShot.CW,0,ZShot.CW,ZShot.CH); return key; },
  make:function(scene,kind,x,y,ang,depth,size){ if(!ZShot.on||!scene||!scene.add)return null; try{ var key=ZShot.bake(scene,kind), M=ZShot.meta(kind), S=ZShot.style(kind), n=M.one?1:ZShot.N;
      var im=scene.add.image(x,y,key,0).setScale(0.5*(size||1)).setDepth(depth||15).setRotation(ang||0), t0=scene.time.now, run=0, sp0=im.setPosition, d0=im.destroy;
      im._zs=kind; im.setStrokeStyle=im.setFillStyle=im.setRadius=function(){ return this; };
      im.setPosition=function(nx,ny){ var dx=nx-this.x, dy=ny-this.y, d=Math.hypot(dx,dy); if(d>0.4){ if(M.spin)this.rotation+=d*0.045; else this.rotation=Math.atan2(dy,dx); }
        if(n>1)this.setFrame(Math.floor((scene.time.now-t0)/70)%n); run+=d; if(run>26){ run=0; ZShot.trail(scene,this,kind,S,M); } return sp0.call(this,nx,ny); };
      im.destroy=function(){ try{ if(!this._gone&&this.scene&&this.scene.sys&&this.scene.sys.isActive()&&M.fam==='arrow'&&S.spark)ZShot.spark(this.scene,this.x,this.y,this.depth); }catch(e){} this._gone=true; return d0.apply(this,arguments); };
      return im; }catch(e){ console.error('shot',kind,e); return null; } },
  // what the picked looks leave behind: an air ripple (bodkin), smoke (fire), frost (cold)
  trail:function(scene,im,kind,S,M){ var fade=function(o,ms,sc){ scene.tweens.add({targets:o,alpha:0,scale:sc||1,duration:ms,onComplete:function(){ o.destroy(); }}); }, d=im.depth-0.01, o;
    if(M.fam==='arrow'&&S.trail==='ripple'){ o=scene.add.ellipse(im.x,im.y,4,11).setStrokeStyle(1,0xffffff,0.3).setFillStyle(0xffffff,0).setRotation(im.rotation).setDepth(d); fade(o,240,1.5); }
    if(/fire$/.test(kind)||kind==='fireball'){ o=scene.add.circle(im.x,im.y,3,0x3a3430,0.32).setDepth(d); fade(o,420,2.2); }
    if(/cold$/.test(kind)||kind==='frost_bolt'){ o=scene.add.rectangle(im.x+(Math.random()-0.5)*6,im.y+(Math.random()-0.5)*6,2,2,0xdaf2ff,0.8).setDepth(d); fade(o,360,1); }
    if(/heat$/.test(kind)){ o=scene.add.circle(im.x,im.y,2,0xff5a3a,0.5).setDepth(d).setBlendMode(Phaser.BlendModes.ADD); fade(o,300,0.4); } },
  spark:function(scene,x,y,depth){ for(var i=0;i<5;i++){ var a=Math.random()*Math.PI*2, r=9+Math.random()*8, s=scene.add.rectangle(x,y,5,1.4,0xffe6a0,0.95).setRotation(a).setDepth(depth||15).setBlendMode(Phaser.BlendModes.ADD); scene.tweens.add({targets:s,x:x+Math.cos(a)*r,y:y+Math.sin(a)*r,alpha:0,duration:170,onComplete:(function(q){ return function(){ q.destroy(); }; })(s)}); } },
  // ── which picture a shot gets ──
  ammoKind:function(ammoId,sub){ var it=typeof ITEMS!=='undefined'&&ITEMS[ammoId], x=it&&it.ammoFor==='xbow', k={normal:'',cold:'_cold',fire:'_fire',heat:'_heat'}[sub||'normal']||''; return (x?'dart':'arrow')+k; },
  spellKind:function(sp,id){ if(id==='chain_lightning')return 'lightning'; if(id&&ZProj.SPELLK.indexOf(id)>=0)return id; var nm=String(sp&&sp.name||'').toLowerCase().replace(/ /g,'_'); if(nm==='lightning_chain')return 'lightning'; if(ZProj.SPELLK.indexOf(nm)>=0)return nm; return ZShot.byColour(sp&&sp.proj&&sp.proj.col); },
  hex:function(col){ if(typeof col==='number')return '#'+('000000'+col.toString(16)).slice(-6); return /^#[0-9a-f]{6}$/i.test(col||'')?col:'#b060ff'; },
  byColour:function(col){ var h=ZShot.hex(col), v=parseInt(h.slice(1),16), r=v>>16&255, g=v>>8&255, b=v&255; if(r>200&&g>180&&b<140)return 'lightning'; if(r>200&&g<170&&b<110)return 'fireball'; if(b>200&&g>170&&r<200)return 'frost_bolt'; if(r>110&&b>180&&g<130)return 'void_orb'; return 'arcane_burst'; },
  // familiars cast in their element (round 16): grass → thorn, water → wave, earth → stone, fire → fireball
  famKind:function(E){ var k=String(E&&(E.key||E.name)||'').toLowerCase(); return {grass:'thorn_snare',water:'tidal_wave',earth:'stone_spikes',fire:'fireball'}[k]||ZShot.byColour(E&&E.col); },
  // legacy monster attacks (world + dungeon)
  monKind:function(type){ return {arrow:'bone_arrow',scatter:'bone_arrow',scatter_arrow:'bone_arrow',flame:'fireball',scatter_flame:'fireball',bog_flame:'spit',heat_seek:'dark_bolt',lightning:'lightning'}[type]||'bone_arrow'; },
  // monster-engine shots: by what is thrown, else by colour
  mxKind:function(p,col){ var h=ZShot.hex(typeof col==='string'&&col[0]==='#'?col:null); if(col&&typeof col==='string'&&col[0]==='#')h=col.length===7?col:h;
    if(p==='arrow'||p==='dart'||p==='feather'||p==='bone')return 'bone_arrow'; if(p==='rock')return 'rock'; if(p==='fire'||p==='lava')return 'fireball'; if(p==='spark')return 'lightning';
    if(p==='poison')return 'spit'; if(p==='web'||p==='net'||p==='ink'||p==='bubble'||p==='water')return 'spit:'+h; return 'bolt:'+h; }
};
