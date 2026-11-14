// ═══════════════════════════════════════════════════════════════════════
// ║ 12d-heal-wells.js — round 106 (Kris: "there also need to be some healing wells in the adventure sites, were you can replenish a fair amount
// ║ of health. i suggest one every 2 levels, but not always easy to find, and restore between 25% and 50% of your health, but no more than 8
// ║ hearts").
// ║  · Every second floor of an adventure site (floors 2, 4, 6 …) has one healing well — not in trials or a boss's own arena.
// ║  · It stands off the way between the stairs: in the corner of the floor furthest from the path you would walk (a side room, a dead
// ║    end), chosen by the floor's seed among the furthest spots, so it is not always in the same kind of place.
// ║  · Tab at the well: it restores between a quarter and a half of your health — never more than 8 hearts — and then runs dry. At full
// ║    health it waits for you. A floor you come back to remembers it is spent.
// ║  · Painted wells (07zt11 sc_r106_wells: stone, frost, basalt) once they are in; a stone ring with glowing water until then.
// ║ HWELL.on: the switch.
// ═══════════════════════════════════════════════════════════════════════
var HWELL={ on:true, MIN:0.25, MAX:0.5, HEARTS:8,
  wants:function(sc){ return HWELL.on&&!sc._trialRun&&!(sc._bossPhase>1)&&!!sc.interactables; },
  every:function(sc){ return sc.floor%2===1; },
  kind:function(sc){ var s=sc.siteSection||(sc._site&&sc._site.section)||1; return s===4?'_ember':s===2?'_ice':''; },
  rnd:function(seed){ var s=seed>>>0||1; return function(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; },
  // the spot: furthest from the walk between the stairs
  spot:function(sc){ var W=DW, H=DH, T=sc.dtiles; if(!T)return null; var ok=function(x,y){ if(x<1||y<1||x>=W-1||y>=H-1)return false; if(T[y][x]===DNG.WALL)return false; try{ return sc._canGoD?!!sc._canGoD(x*TILE+16,y*TILE+16):true; }catch(e){ return true; } };
    var a=sc.stairsUpTile, b=sc.stairsDownTile||sc.bossChestTile; if(!a)return null; var ka=a.y*W+a.x, prev=new Int32Array(W*H).fill(-2), q=[ka]; prev[ka]=-1;
    for(var i=0;i<q.length;i++){ var c=q[i], cx=c%W, cy=(c/W)|0; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(o){ var nx=cx+o[0], ny=cy+o[1]; if(!ok(nx,ny))return; var k=ny*W+nx; if(prev[k]!==-2)return; prev[k]=c; q.push(k); }); }
    var path=[]; if(b){ var kb=b.y*W+b.x; if(prev[kb]===-2){ var bd=1e9; q.forEach(function(k){ var d=Math.abs(k%W-b.x)+Math.abs(((k/W)|0)-b.y); if(d<bd){ bd=d; kb=k; } }); } for(var k=kb;k>=0;k=prev[k])path.push(k); } else path=[ka];
    var D=new Int32Array(W*H).fill(-1), q2=path.slice(); path.forEach(function(k){ D[k]=0; });
    for(var j=0;j<q2.length;j++){ var c2=q2[j], x2=c2%W, y2=(c2/W)|0; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(o){ var nx=x2+o[0], ny=y2+o[1]; if(!ok(nx,ny))return; var k2=ny*W+nx; if(D[k2]>=0||prev[k2]===-2)return; D[k2]=D[c2]+1; q2.push(k2); }); }
    var near=function(x,y){ return (sc.interactables||[]).some(function(it){ return Math.hypot(it.x-(x*TILE+16),it.y-(y*TILE+16))<TILE*3; }); };
    var C=[]; q2.forEach(function(k){ var x=k%W, y=(k/W)|0; if(!ok(x+1,y)||!ok(x-1,y)||!ok(x,y+1)||!ok(x,y-1))return; if(near(x,y))return; C.push([D[k],x,y]); });
    if(!C.length)return null; C.sort(function(p,q3){ return q3[0]-p[0]; }); var top=C.slice(0,Math.max(1,Math.ceil(C.length*0.08))), r=HWELL.rnd(((sc._site&&sc._site.id||'s').length*7919)+sc.floor*104729+(sc.siteSection||1)*31);
    var p=top[Math.floor(r()*top.length)]; return {x:p[1],y:p[2],off:p[0]}; },
  add:function(sc){ if(!HWELL.wants(sc)||!HWELL.every(sc))return; var s=HWELL.spot(sc); if(!s)return; var x=s.x*TILE+TILE/2, y=s.y*TILE+TILE/2, it={type:'heal_well',tx:s.x,ty:s.y,x:x,y:y,opened:false,off:s.off};
    it.gfx=HWELL.draw(sc,it,false); sc.interactables.push(it); sc._hwell=it; },
  draw:function(sc,it,dry){ try{ if(it.gfx){ it.gfx.destroy(); if(it.gfx._glow)it.gfx._glow.destroy(); } }catch(e){}
    var x=it.x, y=it.y+10, Zs=typeof _scn==='function'?_scn():null, id='dg_heal_well'+HWELL.kind(sc)+(dry?'_dry':''), zt=Zs&&Zs.has&&Zs.has(id)&&Zs.texture(sc,id,0)||(Zs&&Zs.has&&Zs.has('dg_heal_well'+(dry?'_dry':''))&&Zs.texture(sc,'dg_heal_well'+(dry?'_dry':''),0));
    var dep=sc._yDepth?sc._yDepth(y):10, o;
    if(zt){ o=sc.add.image(x,y,zt.key).setOrigin(0.5,1).setScale(zt.scale).setDepth(dep); }
    else { o=sc.add.graphics().setDepth(dep); o.fillStyle(0x000000,0.3).fillEllipse(x,y,34,10); o.fillStyle(0x6a7078,1).fillEllipse(x,y-8,32,18); o.fillStyle(0x4a5058,1).fillRect(x-16,y-10,32,9); o.fillStyle(0x7d848c,1).fillEllipse(x,y-12,32,14);
      o.fillStyle(dry?0x1a2228:0x4ff0e0,dry?1:0.95).fillEllipse(x,y-12,24,9); if(!dry){ o.fillStyle(0xd8fffa,0.7).fillEllipse(x-4,y-13,8,3); } }
    if(!dry){ try{ var g=sc.add.image(x,y-14,sc.textures.exists('glow')?'glow':'__WHITE').setBlendMode(Phaser.BlendModes.ADD).setTint(0x4ff0e0).setAlpha(0.5).setScale(0.45).setDepth(dep+0.01); sc.tweens.add({targets:g,alpha:0.85,scale:0.6,duration:1100,yoyo:true,repeat:-1,ease:'Sine.inOut'}); o._glow=g; }catch(e){} }
    return o; },
  heal:function(sc,it){ var ws=sc.worldScene, ps=ws&&ws.playerState; if(!ps||!it||it.opened)return; var mh=ps.maxHp||30, hp=ps.hp||0;
    if(hp>=mh){ showNotif('💧 The well waits — you are already whole.','#9ff8f0'); return; }
    var per=typeof ZHUD!=='undefined'&&ZHUD.hearts?ZHUD.hearts(mh).per:10, f=HWELL.MIN+Math.random()*(HWELL.MAX-HWELL.MIN), amt=Math.max(1,Math.min(Math.round(mh*f),HWELL.HEARTS*per,mh-hp));
    ps.hp=Math.min(mh,hp+amt); it.opened=true; it.gfx=HWELL.draw(sc,it,true);
    if(sc._floatText)sc._floatText(sc.px,sc.py-40,'+'+amt+' ❤','#7fffd8'); showNotif('💧 The healing well restores '+amt+' health — then runs dry.','#9ff8f0');
    try{ if(typeof ZSFX!=='undefined')ZSFX.play('drink'); var r=sc.add.circle(it.x,it.y-6,8,0x4ff0e0,0.5).setDepth(40); sc.tweens.add({targets:r,radius:44,alpha:0,duration:600,onComplete:function(){ r.destroy(); }}); }catch(e){}
    if(sc._updateHUD)try{ sc._updateHUD(); }catch(e){} } };
(function(){ if(typeof DungeonScene==='undefined')return; var P=DungeonScene.prototype;
  var b0=P._buildInteractables; P._buildInteractables=function(){ var r=b0.apply(this,arguments); try{ HWELL.add(this); }catch(e){ if(!HWELL._w){ HWELL._w=1; console.warn('heal well',e); } } return r; };
  var i0=P._interact; P._interact=function(){ var self=this, near=(this.interactables||[]).find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; }); if(near&&near.type==='heal_well'){ HWELL.heal(this,near); return; } return i0.apply(this,arguments); };
  var p0=P._updateInteractPrompt; P._updateInteractPrompt=function(){ var r=p0.apply(this,arguments), self=this, near=(this.interactables||[]).find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; });
    if(near&&near.type==='heal_well'&&this.interactPrompt)this.interactPrompt.setText('[Tab] 💧 Drink from the healing well').setPosition(this.px,this.py-52).setVisible(true); return r; };
  var r0=P._restoreFloorState; if(r0)P._restoreFloorState=function(state){ var r=r0.apply(this,arguments); try{ var w=this._hwell; if(w&&state&&state.opened&&state.opened.some(function(o){ return Math.abs(o.x-w.x)<4&&Math.abs(o.y-w.y)<4; })){ w.opened=true; w.gfx=HWELL.draw(this,w,true); } }catch(e){} return r; }; })();
