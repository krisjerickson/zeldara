// ═══════════════════════════════════════════════════════════════════════
// ║ 16m-painted-shots.js — round 64d: PAINTED SHOTS (Kris, fighting Xal'zor: "a mix of updated painted images for the attacks and old pixel
// ║ effects, like a circle with a plus sign in the middle … we need to get all of these updated to painted images").
// ║ Every shot in flight (09g ZShot: monster shots, and the spells and familiar shots that share the same looks) takes its painting from
// ║ scenery wave 67 (07zt3: pj_*) as soon as it is in; the thrown stone uses the wave-51 painting (fx_pj_rock) already. The white paintings
// ║ (orb, bolt, spit) are coloured by the shot's colour. Until a painting is in, the drawn shot stays.
// ═══════════════════════════════════════════════════════════════════════
var ZPJ={ on:true, K:0.62,
  MAP:{orb:'pj_orb',bolt:'pj_bolt',dark_bolt:'pj_bolt',spit:'pj_spit',bone_arrow:'pj_bone_arrow',fireball:'pj_fireball',frost_bolt:'pj_frost',lightning:'pj_lightning',void_orb:'pj_void',rock:'fx_pj_rock'},
  WHITE:{pj_orb:'#e0a8ff',pj_bolt:'#b060ff',pj_spit:'#8fd04a'},
  id:function(kind){ var b=String(kind||'').split(':')[0], id=ZPJ.MAP[b]; return id&&typeof ZFX!=='undefined'&&ZFX.has(id)?id:null; },
  make:function(scene,kind,x,y,ang,depth,size){ var id=ZPJ.id(kind); if(!ZPJ.on||!id)return null; var key=ZFX.key(scene,id); if(!key)return null;
    var Z=_scn(), z=Z.size(id,0), k=ZPJ.K*(size||1), tint=String(kind).split(':')[1], spin=id==='fx_pj_rock';
    var im=scene.add.image(x,y,key).setDisplaySize(z.w*k,z.h*k).setDepth(depth||15).setRotation(spin?0:(ang||0)); try{ im.texture.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){}
    if(ZPJ.WHITE[id]){ var src=key; if(typeof ZSOFT!=='undefined'&&ZSOFT.grey){ var g=ZSOFT.grey(scene,key); if(g&&g!==key){ im.setTexture(g); im.setDisplaySize(z.w*k,z.h*k); } } im.setTint(typeof ZSOFT!=='undefined'?ZSOFT.col(tint&&tint[0]==='#'?tint:ZPJ.WHITE[id]):0xffffff); }
    im._zs=kind; im._zpj=id; var sp0=im.setPosition, t0=scene.time.now, run=0, sx=im.scaleX, sy=im.scaleY;
    im.setStrokeStyle=im.setFillStyle=im.setRadius=function(){ return this; };
    im.setPosition=function(nx,ny){ var dx=nx-this.x, dy=ny-this.y, d=Math.hypot(dx,dy); if(d>0.4){ if(spin)this.rotation+=d*0.045; else this.rotation=Math.atan2(dy,dx); }
      var p=1+0.06*Math.sin((scene.time.now-t0)/70); this.setScale(sx*p,sy*(2-p)); run+=d; if(run>26&&typeof ZShot!=='undefined'&&ZShot.trail){ run=0; try{ ZShot.trail(scene,this,String(kind).split(':')[0],ZShot.style(kind),ZShot.meta(kind)); }catch(e){} } return sp0.call(this,nx,ny); };
    return im; }
};
setTimeout(function(){ if(typeof ZShot==='undefined')return;
  var m0=ZShot.make; ZShot.make=function(scene,kind,x,y,ang,depth,size){ try{ var im=ZPJ.make(scene,kind,x,y,ang,depth,size); if(im)return im; }catch(e){} return m0.apply(this,arguments); };
  // a monster's "orb" gets the orb painting (it was drawn as a bolt)
  var k0=ZShot.mxKind; ZShot.mxKind=function(p,col){ var r=k0.apply(this,arguments); if(p==='orb'&&ZPJ.id('orb'))return 'orb:'+String(r).split(':')[1]; return r; };
},0);
