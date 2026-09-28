// ═══════════════════════════════════════════════════════════════════════
// ║ CHARACTERS IN THE GAME (Phase 4) — the pixel stand-ins from 07s used
// ║ everywhere the game used emoji: shop keepers, craftsmen (free and
// ║ captive), village folk (more as the village grows), island NPCs,
// ║ mounts under the hero, orbiting familiars and every boss.
// ║ CHX.sprite() registers the image with a per-scene animator (idle bob,
// ║ now-and-then "doing their job" frames, facing from movement).
// ═══════════════════════════════════════════════════════════════════════
var CHX={
  tex:function(scene,R){ var key='ch_'+R.id; if(scene.textures.exists(key))return key;
    var fr=chFrames(R), n=fr.length, cv=mkCanvas(32*n,32), x=cv.getContext('2d'); fr.forEach(function(f,i){ x.drawImage(f,i*32,0); });
    var tx=scene.textures.addCanvas(key,cv); for(var i=0;i<n;i++)tx.add(String(i),0,i*32,0,32,32);
    if(tx.setFilter)tx.setFilter(Phaser.Textures.FilterMode.NEAREST); return key; },
  glow:function(scene){ if(scene.textures.exists('glow'))return 'glow'; var c=mkCanvas(128,128), x=c.getContext('2d'), g=x.createRadialGradient(64,64,0,64,64,64);
    g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(0.35,'rgba(255,255,255,0.45)'); g.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=g; x.fillRect(0,0,128,128); scene.textures.addCanvas('glow',c); return 'glow'; },
  // a character image; o: {origin:[x,y], act:true (does its job now and then), face:true (flip by movement)}
  sprite:function(scene,id,x,y,sc,o){ var R=CHAR_BY_ID[id]; if(!R||!scene.add)return null; o=o||{};
    var im=scene.add.image(x,y,CHX.tex(scene,R),'0').setScale(sc||1.45).setDepth(o.depth!==undefined?o.depth:5);
    if(o.origin)im.setOrigin(o.origin[0],o.origin[1]); else im.setOrigin(0.5,0.9);
    im._ch=R; im._t=Math.random()*3; if(R.cat==='npc'||R.cat==='boss'){ im._tomeId=id; im._tomeCat=R.cat==='npc'?'character':'monster'; } im._act=o.act!==false; im._face=o.face!==false; im._nextAct=2+Math.random()*6;
    CHX._reg(scene,im); return im; },
  _reg:function(scene,im){ if(!scene._chAnim){ scene._chAnim=[]; scene.events.on('update',function(t,ms){ CHX._tick(scene,ms/1000); });
      scene.events.once('shutdown',function(){ scene._chAnim=[]; }); }
    scene._chAnim.push(im); },
  _tick:function(scene,dt){ var L=scene._chAnim; if(!L||!L.length)return; if(typeof _anyModalOpen==='function'&&_anyModalOpen())return;
    for(var i=L.length-1;i>=0;i--){ var im=L[i]; if(!im||!im.scene||!im.active){ L.splice(i,1); continue; } if(im._manual)continue;
      im._t+=dt; var f;
      if(im._tomeId&&typeof Tome!=='undefined'&&(im._seenT=(im._seenT||0)-dt)<=0){ im._seenT=0.5; var pp=CHX.ppos(scene), wx=im.parentContainer?im.parentContainer.x:im.x, wy=im.parentContainer?im.parentContainer.y:im.y;
        if(pp&&Math.hypot(pp.x-wx,pp.y-wy)<(im._tomeCat==='character'?110:300)&&im.visible&&(!im.parentContainer||im.parentContainer.visible)){ Tome.see(im._tomeCat||'monster',im._tomeId); im._tomeId=null; } }
      if(im._busy>0){ im._busy-=dt; f=Math.floor(im._t*5)%2?3:2; }
      else { f=Math.floor(im._t*1.8)%2; if(im._act){ im._nextAct-=dt; if(im._nextAct<=0){ im._busy=1.1; im._nextAct=4+Math.random()*7; } } }
      im.setFrame(String(f));
      if(im._face){ var px=im.parentContainer?im.parentContainer.x:im.x; if(im._lx!==undefined&&Math.abs(px-im._lx)>0.3)im.setFlipX(px<im._lx); im._lx=px; } } },
  ppos:function(s){ if(s.player&&s.player.x!==undefined)return s.player; if(s.px!==undefined)return {x:s.px,y:s.py}; if(s._px!==undefined)return {x:s._px,y:s._py}; return null; },
  busy:function(im,s){ if(im)im._busy=Math.max(im._busy||0,s||1.1); },

  // ── bosses ──
  bossId:function(type,def){ if(CHAR_BOSS_FOR_MDEF[type])return CHAR_BOSS_FOR_MDEF[type];
    var n=def&&def.name?def.name.replace(/ \(Rematch\)$/,'').toUpperCase():''; return CHAR_BOSS_BY_NAME[n]||null; },
  // a boss body for a monster container (keeps the setFillStyle hit-flash API of the old circle)
  bossBody:function(scene,type,def,cont){ var id=CHX.bossId(type,def), R=id&&CHAR_BY_ID[id]; if(!R)return null;
    var r=def.r||18, sc=Math.max(1.9,r*0.118), col=hexNum(R.spec.pal[2]||'#ffffff');
    if(cont){ var au=scene.add.image(0,2,CHX.glow(scene)).setBlendMode(Phaser.BlendModes.ADD).setTint(col).setAlpha(0.35).setScale(r/40); cont.add(au);
      scene.tweens.add({targets:au,alpha:0.12,scale:r/34,duration:900,yoyo:true,repeat:-1,ease:'Sine.inOut'}); }
    var im=CHX.sprite(scene,id,0,r*0.55,sc,{origin:[0.5,0.9]}), base=def.color;
    im.setFillStyle=function(c){ if(c===0xffffff)this.setTintFill(0xffffff); else if(c===undefined||c===base)this.clearTint(); else this.setTint(c); return this; };
    im.setStrokeStyle=function(){ return this; };
    return im; },

  // a roster monster body by display name (volcano swarm imps, island monsters with a roster look-alike)
  ISL_LOOK:{'sea pirate':'stilt_bandit','giant crab':'mire_crab','shell knight':'barnacle_brute','bog frog':'glowfrog','water serpent':'bog_serpent','giant mosquito':'bloodgnats',
    'lava lizard':'salamander_wyrmling','magma sprite':'phoenix_chick','ice wraith':'frost_ghoul','snow golem':'crystal_golemling'},
  monBody:function(scene,name,def){ if(typeof MON_ROSTER==='undefined'||!name)return null; var n=name.toLowerCase(), R=MON_BY_ID[CHX.ISL_LOOK[n]]||MON_ROSTER.find(function(r){ return r.name.toLowerCase()===n; });
    if(!R){ var lk=Object.keys(MON_LEGACY).find(function(k){ var M=MDEFS[MON_LEGACY[k]]; return M&&M.name.toLowerCase()===n; }); R=lk&&MON_BY_ID[lk]; }
    if(!R)return null; var im=monLegacyBody(scene,R.id,Object.assign({color:def.color||def.col},def)); return im; },
  // ── mounts: drawn under the hero; the hero sits ON the back (legs hidden), and in the front
  //    view the mount's head is drawn over the rider so it reads as sitting behind the neck ──
  MOUNT_SC:1.9, MOUNT_KEEP:0.58,
  MOUNT_SEAT:{quad:-3,drake:-4,gator:6,bird:-3,serpent:4,glider:null},   // hero sprite y (feet line) per mount kind
  mountTick:function(scene,p,mount,moving,dt){
    var R=mount&&mount!=='horse'?CHAR_BY_ID['mt_'+mount]:null, sp=p.sprite;
    if(!R){ if(p.mountSpr&&p.mountSpr.visible){ p.mountSpr.setVisible(false); if(p.mountHead)p.mountHead.setVisible(false); sp.setY(14); sp.setCrop(); if(p._mtShadow)p._mtShadow.setScale(1); } return false; }
    var mk=CHX.tex(scene,R);
    if(!p.mountSpr||!p.mountSpr.scene){ p.mountSpr=scene.add.image(0,16,mk,'0').setOrigin(0.5,1).setScale(CHX.MOUNT_SC); p.mountSpr._manual=true; p.cont.addAt(p.mountSpr,p.cont.getIndex(sp)); p._mtShadow=p.cont.list[0];
      p.mountHead=scene.add.image(0,16,mk,'8').setOrigin(0.5,1).setScale(CHX.MOUNT_SC).setVisible(false); p.cont.addAt(p.mountHead,p.cont.getIndex(sp)+1); }
    if(p.mountSpr.texture.key!==mk){ p.mountSpr.setTexture(mk,'0'); p.mountHead.setTexture(mk,'8'); }
    p.mountSpr.setVisible(true); if(p._mtShadow&&p._mtShadow.setScale)p._mtShadow.setScale(1.9,1.4);
    p._mtT=(p._mtT||0)+dt*(moving?1:0.25); var d=p.dir, f, front=false, ph=moving?Math.floor(p._mtT*6)%2:0;
    if(d==='left'||d==='right'){ f=moving?Math.floor(p._mtT*9)%4:0; p.mountSpr.setFlipX(d==='left'); }
    else { f=(d==='up'?6:4)+ph; front=d!=='up'; p.mountSpr.setFlipX(false); }
    p.mountSpr.setFrame(String(f));
    var seat=CHX.MOUNT_SEAT[R.spec.kind];
    if(seat===null){ p.mountHead.setVisible(false); p.mountSpr.setY(-30); sp.setY(14); sp.setCrop(); p.cont.bringToTop(p.mountSpr); return true; }   // glider: hang below the canopy
    var bob=moving?Math.round(Math.sin(p._mtT*18)):0, headOver=front&&(R.spec.kind==='quad'||R.spec.kind==='drake'||R.spec.kind==='bird'); p.mountSpr.setY(16); sp.setY(seat+bob-(headOver?9:front?4:0));
    sp.setCrop(0,0,sp.frame.width,Math.round(sp.frame.height*CHX.MOUNT_KEEP));
    if(p.cont.getIndex(p.mountSpr)>p.cont.getIndex(sp))p.cont.moveBelow(p.mountSpr,sp);
    p.mountHead.setVisible(headOver); if(headOver){ p.mountHead.setFrame(String(8+ph)); if(p.cont.getIndex(p.mountHead)<p.cont.getIndex(sp))p.cont.moveAbove(p.mountHead,sp); }
    return true; }
};

// ── village folk: more of them as the village grows ─────────────────────
var VILLAGE_FOLK=[
  {id:'vf_elder',st:1,spot:'green',   r:1.5, line:'The Runestone has stood here since before the lake had a name. It hums when heroes pass.'},
  {id:'vf_farmer',st:1,spot:'vegplot',r:2,   line:'Carrots on the left, beans on the right — rows as straight as a rune!'},
  {id:'vf_fisher',st:1,spot:'pier',   r:0.6, line:'The lake gives when it wants to. Patience, dear.'},
  {id:'vf_kid1',st:2,spot:'fountain', r:3,   line:'Bet you can\'t catch me! …Okay, you probably can.'},
  {id:'vf_boatwright',st:2,spot:'boathouse',r:1.5,line:'Every plank sings if you fit it right. This one\'s a tenor.'},
  {id:'vf_miller',st:2,spot:'windmill',r:2,  line:'Wind\'s good today — plenty of flour for Benno\'s bread.'},
  {id:'vf_guard',st:3,spot:'gate',    r:1,   line:'All quiet at the gate. Monsters don\'t like our runes.'},
  {id:'vf_kid2',st:3,spot:'cart',     r:3,   line:'Marta gives me an apple if I sweep round the carts!'},
  {id:'vf_vendor',st:3,spot:'cart',   r:1,   line:'Fresh from the gardens! Two coppers a bunch!'},
  {id:'vf_lamplighter',st:4,spot:'lamppost',r:4,line:'One lantern at a time, and the whole village glows.'},
  {id:'vf_keeper',st:5,spot:'lighthouse',r:1.2,line:'The light guides every boat home — and you too, traveller.'}
];
Object.assign(WorldScene.prototype,{
  _villageFolkSpot(kind,i){ var wd=this.wd, cx=CENTER_X, cy=CENTER_Y, P=(wd.props||[]).filter(function(p){ return p.vill; }), self=this;
    var near=function(tx,ty){ for(var r=0;r<9;r++)for(var a=0;a<Math.max(1,r*8);a++){ var an=a/Math.max(1,r*8)*Math.PI*2, x=Math.round(tx+Math.cos(an)*r), y=Math.round(ty+Math.sin(an)*r);
        var wx=x*TILE+TILE/2, wy=y*TILE+TILE/2; if(self._canGo(wx,wy,null))return {x:wx,y:wy}; } return null; };
    var pick=function(name){ var L=P.filter(function(p){ return p.prop===name; }); if(!L.length)return null; var p=L[i%L.length]; return near(p.x+p.w/2,p.y+p.h+0.5); };
    if(kind==='green')return near(cx+2,cy+3);
    if(kind==='pier'){ var best=null, bd=-1; for(var dy=-40;dy<=40;dy++)for(var dx=-40;dx<=40;dx++){ var x=cx+dx, y=cy+dy; if(wd.tiles[y]&&wd.tiles[y][x]===T.BRIDGE){ var d=Math.hypot(dx,dy); if(d>bd){bd=d;best={x:x*TILE+TILE/2,y:y*TILE+TILE/2};} } } return best; }
    if(kind==='gate')return near(cx-2,cy+Math.min(33,(wd.villageStage>=3?31:24)));
    return pick(kind)||near(cx+(i%2?4:-4),cy+5);
  },
  _villageFolkInit(){ var st=(this.wd&&this.wd.villageStage)||1, self=this;
    if(!this._folk)this._folk=[]; if(!this._villageNPCs)this._villageNPCs=[];
    VILLAGE_FOLK.forEach(function(F,i){ var have=self._folk.find(function(f){ return f.F.id===F.id; });
      if(F.st>st){ if(have){ have.im.destroy(); self._folk.splice(self._folk.indexOf(have),1); self._villageNPCs=self._villageNPCs.filter(function(n){ return n.id!==F.id; }); } return; }
      var s=self._villageFolkSpot(F.spot,i); if(!s)return;
      if(have){ have.hx=s.x; have.hy=s.y; return; }
      var R=CHAR_BY_ID[F.id], im=CHX.sprite(self,F.id,s.x,s.y+12,1.45); if(!im)return; im.setDepth(WR_DEPTH(s.y));
      var npc={id:F.id,n:R.name,icon:'💬',line:F.line,x:s.x,y:s.y,folk:true};
      self._folk.push({F:F,im:im,hx:s.x,hy:s.y,x:s.x,y:s.y,tx:s.x,ty:s.y,wait:1+Math.random()*3,npc:npc}); self._villageNPCs.push(npc); });
  },
  _villageFolkTick(dt){ if(!this._folk||!this._folk.length)return; var self=this, px=this.player.x, py=this.player.y;
    this._folk.forEach(function(f){ var near=Math.hypot(px-f.x,py-f.y)<TILE*1.8;
      if(near){ if(f.im.setFlipX)f.im.setFlipX(px<f.x); return; }                // stops to chat when you're close
      if(f.wait>0){ f.wait-=dt; if(f.wait<=0){ var a=Math.random()*Math.PI*2, d=Math.random()*f.F.r*TILE; f.tx=f.hx+Math.cos(a)*d; f.ty=f.hy+Math.sin(a)*d; } return; }
      var dx=f.tx-f.x, dy=f.ty-f.y, L=Math.hypot(dx,dy); if(L<2){ f.wait=2+Math.random()*4; CHX.busy(f.im,1.2); return; }
      var sp=f.F.id.indexOf('kid')>0?46:26, nx=f.x+dx/L*sp*dt, ny=f.y+dy/L*sp*dt;
      if(self._canGo(nx,ny,null)){ f.x=nx; f.y=ny; f.im.setPosition(nx,ny+12).setDepth(WR_DEPTH(ny)); f.im.setFlipX(dx<0); f.npc.x=nx; f.npc.y=ny; } else f.wait=1; });
  }
});
