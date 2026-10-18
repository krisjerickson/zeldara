// ═══════════════════════════════════════════════════════════════════════
// ║ 16i-grimnir-pulse.js — round 64: GRÍMNIR PULSES BETWEEN LIGHT AND BLACK (Kris's cards, Oct 18).
// ║  "brilliant white radiating out light (like the god they are pretending to be) but then also pulsing back to pure black and
// ║   sucking away all the light (showing the corrupted nature of the god)"; "the first form is mainly light, with slight pulses to dark,
// ║   second is balanced between light and dark, pulsing between. the last is mainly dark, with minor pulses back to light"; "make sure
// ║   to also change when he is vulnerable".
// ║  ☀ RADIANT: rays of white light turn behind him and he glows — SHIELDED: the hero's hits do nothing ("✦ shielded by light").
// ║  ● BLACK:   he turns to a black silhouette, the throne room darkens (only a pool of light round the hero), motes of light are
// ║             sucked into him, his one eye burns white — OPEN: hits land.
// ║  The beat comes from ZGOD.light (07zz-boss-grimnir2, the same the Lab cards show): form 1 ≈ 6½ s light / 1½ s black, form 2 4 / 4,
// ║  form 3 1½ / 6½. GODSBANE (V) tears the light off him at once: black for 4 s (and in form 3 it still strikes three times as hard).
// ═══════════════════════════════════════════════════════════════════════
var ZGP={ on:true, FORCE:4, SHIELD_SAY:0.9,
  formOf:function(m){ return m&&!m.dead&&m._gform?m._gform:0; },
  bosses:function(sc){ return (sc&&sc.monsters||[]).filter(function(m){ return ZGP.formOf(m); }); },
  // 1 radiant … 0 black, for this monster now
  light:function(m){ var g=m._gp||(m._gp={t:Math.random()*2,force:0}); if(g.force>0)return 0; return ZGOD.light(m._gform,g.t); },
  shielded:function(m){ return ZGP.on&&ZGP.formOf(m)>0&&ZGP.light(m)>0.5; },
  _tex:function(sc){ var k='zgp_dark4'; if(sc.textures.exists(k))return k; var c=document.createElement('canvas'); c.width=c.height=256; var x=c.getContext('2d'), g=x.createRadialGradient(128,128,10,128,128,128);
    g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(0.045,'rgba(0,0,0,0.03)'); g.addColorStop(0.11,'rgba(0,0,0,0.7)'); g.addColorStop(0.24,'rgba(0,0,0,0.95)'); g.addColorStop(1,'rgba(0,0,0,1)'); x.fillStyle=g; x.fillRect(0,0,256,256); sc.textures.addCanvas(k,c); return k; },
  _dot:function(sc){ var k='zgp_dot'; if(sc.textures.exists(k))return k; var c=document.createElement('canvas'); c.width=c.height=32; var x=c.getContext('2d'), g=x.createRadialGradient(16,16,0,16,16,16);
    g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(0.3,'rgba(255,248,220,0.7)'); g.addColorStop(1,'rgba(255,240,200,0)'); x.fillStyle=g; x.fillRect(0,0,32,32); sc.textures.addCanvas(k,c); return k; },
  // the eye: on the drawn stand-in it is where the painter put it; on a painted sheet, high on the head
  eyeAt:function(m){ var R=m.body&&m.body._rig, b=R&&R.body; if(!b||!b.scene)return {x:m.x,y:m.y-60};
    try{ var bd=b.getBounds(), D=R.D, f=(!b._zk&&D&&D.arch==='god')?ZGOD.eye(D):[0.5,0.13]; return {x:bd.x+bd.width*(b.flipX?1-f[0]:f[0]),y:bd.y+bd.height*f[1]}; }catch(e){ return {x:m.x,y:m.y-60}; } },
  _tint:function(m,lt){ var R=m.body&&m.body._rig, c=Math.round(12+243*lt), col=(c<<16)|(c<<8)|Math.min(255,c+6);
    [R&&R.body,R&&R.back,R&&R.wb,R&&R.wf,R&&R.pupil].forEach(function(o){ if(o&&o.scene&&o.setTint){ if(lt>0.985)o.clearTint(); else o.setTint(col); } }); },
  tick:function(sc,dt){ if(!ZGP.on)return; var L=ZGP.bosses(sc), V=sc._gpv;
    if(!L.length){ if(V){ ['dark','rays','eye'].forEach(function(k){ if(V[k])V[k].destroy(); }); (V.dots||[]).forEach(function(d){ d.destroy(); }); sc._gpv=null; } return; }
    if(!V){ V=sc._gpv={ dark:sc.add.image(sc.px,sc.py,ZGP._tex(sc)).setDepth(12.5).setAlpha(0).setScale(7.5), rays:sc.add.graphics().setDepth(9.6).setBlendMode(Phaser.BlendModes.ADD),
        eye:sc.add.image(0,0,ZGP._dot(sc)).setDepth(12.6).setBlendMode(Phaser.BlendModes.ADD), dots:[], dotT:0, said:0 }; }
    var m=L[0], g=m._gp||(m._gp={t:0,force:0}); g.t+=dt; if(g.force>0)g.force=Math.max(0,g.force-dt);
    var lt=ZGP.light(m), dk=1-lt, was=g.lastLt===undefined?1:g.lastLt; g.lastLt=lt; m._grimShine=lt>0.5;
    if(was>0.5&&lt<=0.5){ if(!V.said||Date.now()-V.said>6000){ showNotif('● Solmyrk turns black and drinks the light — STRIKE NOW!','#c8d0e0'); V.said=Date.now(); } }
    if(!g.told&&lt>0.5){ g.told=1; showNotif('☀ While Solmyrk blazes with light he cannot be hurt — strike when he turns black (Godsbane forces it).','#fff2b0'); }
    ZGP._tint(m,lt); if(m.cont&&m.cont.setDepth){ if(dk>0.3)m.cont.setDepth(12.52); else if(m.cont.depth===12.52&&sc._yDepth)m.cont.setDepth(sc._yDepth(m.y)); }      /* round 64: while black he is drawn over the darkness — a black shape with a burning eye */
    // the room darkens round a pool of light at the hero's feet
    V.dark.setPosition(sc.px,sc.py).setAlpha(0.8*dk).setScale(7.5);      // 1920 px across — a larger image is dropped by the renderer
    // rays of white light turning behind him
    var r=V.rays, t=g.t, cx=m.x, cy=m.y-((m.def&&m.def.r)||28)*1.6; r.clear();
    if(lt>0.02){ for(var i=0;i<16;i++){ var a=i/16*Math.PI*2+t*0.25, w=0.05+0.025*Math.sin(i*1.7), ln=150+60*Math.sin(i*2.3+t*1.3); r.fillStyle(0xfff6dc,0.22*lt); r.beginPath(); r.moveTo(cx,cy); r.lineTo(cx+Math.cos(a-w)*ln,cy+Math.sin(a-w)*ln); r.lineTo(cx+Math.cos(a+w)*ln,cy+Math.sin(a+w)*ln); r.closePath(); r.fillPath(); }
      r.fillStyle(0xfff4c8,0.18*lt); r.fillCircle(cx,cy,70); r.fillStyle(0xffffff,0.14*lt); r.fillCircle(cx,cy,38); }
    // the one eye
    var e=ZGP.eyeAt(m); V.eye.setPosition(e.x,e.y).setScale(0.35+0.55*dk).setAlpha(0.55+0.45*dk);
    // light sucked into him while he is black
    V.dotT-=dt; if(dk>0.3&&V.dotT<=0&&V.dots.length<40){ V.dotT=0.045; var an=Math.random()*Math.PI*2, rr=180+Math.random()*140, d=sc.add.image(cx+Math.cos(an)*rr,cy+Math.sin(an)*rr*0.8,ZGP._dot(sc)).setDepth(12.6).setBlendMode(Phaser.BlendModes.ADD).setScale(0.18+Math.random()*0.22).setAlpha(0); V.dots.push(d);
      sc.tweens.add({targets:d,x:cx,y:cy,alpha:{from:0.9,to:0},scale:0.05,duration:850+Math.random()*350,ease:'Quad.easeIn',onComplete:function(){ var k=V.dots.indexOf(d); if(k>=0)V.dots.splice(k,1); d.destroy(); }}); } },
  // Godsbane tears the light off him
  force:function(sc){ var hit=false; ZGP.bosses(sc).forEach(function(m){ var g=m._gp||(m._gp={t:0,force:0}); g.force=ZGP.FORCE; m._grimShine=false; hit=true; }); if(hit)showNotif('✦ Godsbane tears the light from Solmyrk — he is black and open!','#fff2b0'); return hit; }
};
setTimeout(function(){
  // shielded while radiant: the hero's hits (every one goes through ZHit.dmg) do nothing
  if(typeof ZHit!=='undefined'){ var d0=ZHit.dmg; ZHit.dmg=function(scene,mon,raw,kind,o){ if(mon&&mon._grimShine&&ZGP.on&&!ZGP._casting&&ZGP.formOf(mon)){ var now=Date.now(); if(!mon._gpSay||now-mon._gpSay>ZGP.SHIELD_SAY*1000){ mon._gpSay=now; try{ var r=(mon.def&&mon.def.r)||20; _heroFloat(scene,mon.x,mon.y-r-26,'✦ shielded by light','#fff2b0'); }catch(e){} } return 0; } return d0.apply(this,arguments); }; }
  if(typeof ZGODS!=='undefined'){ var gc=ZGODS.cast; ZGODS.cast=function(scene){ var ps=scene&&scene.worldScene&&scene.worldScene.playerState, before=ps&&ps._gbUntil, r; ZGP._casting=!!(scene&&scene._asgc); try{ r=gc.apply(this,arguments); } finally{ ZGP._casting=false; }
    try{ if(scene&&scene._asgc&&ps&&ps._gbUntil!==before)ZGP.force(scene); }catch(e){} return r; }; }      // the beam itself lands; then he stays black for a while
  if(typeof DungeonScene==='undefined')return; var D=DungeonScene.prototype;
  var up=D.update; D.update=function(t,ms){ var r=up.apply(this,arguments); if(this._asgc&&this._ready&&!this._playerDead){ try{ ZGP.tick(this,Math.min(0.1,ms/1000)); }catch(e){ if(!this._gpErr){ this._gpErr=1; console.warn('grimnir pulse',e); } } } return r; };
},0);
