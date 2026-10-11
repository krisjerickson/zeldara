// ─── BuildingScene ──────────────────────────────
var INT_W=14,INT_H=10;   // set from the painted map (07v-interiors.js)
class BuildingScene extends Phaser.Scene{
  constructor(){super('Building')}
  init(data){this.building=data.building;this.worldScene=data.worldScene;}
  create(){
    var type=this.building.type, self=this;
    applyTheme('celestial');
    // painted interior (07v-interiors.js): base + depth-sorted furniture + lights
    var m=this._imap=buildInterior(type);
    INT_W=m.w; INT_H=m.h;
    this.cameras.main.setBackgroundColor(m.bg||'#0a0604');
    this.cameras.main.setZoom(2.2);
    this.cameras.main.centerOn(INT_W*TILE/2,INT_H*TILE/2+6);
    this._renderInterior(m);
    this._spawnPlayer();
    this._spawnNPC(type);
    this.keys=this.input.keyboard.addKeys({
      UP:'UP',DOWN:'DOWN',LEFT:'LEFT',RIGHT:'RIGHT',
      W:'W',A:'A',S:'S',D:'D',
      TAB:Phaser.Input.Keyboard.KeyCodes.TAB
    });
    this.input.keyboard.on('keydown-TAB',function(e){e.preventDefault();});
    this.interactPrompt=domText(this,INT_W*TILE/2,INT_H*TILE/2,'',
      {fontSize:'8px',color:'#ffff88',stroke:'#000',strokeThickness:2,fontFamily:'Segoe UI',align:'center'}).setOrigin(.5).setDepth(9500);
    domText(this,INT_W*TILE/2,(INT_H-1)*TILE-6,(m.theme&&m.theme.name)||type,
      {fontSize:'9px',color:'#ffeecc',fontFamily:'Segoe UI',fontStyle:'bold',stroke:'#000',strokeThickness:3}).setOrigin(.5,1).setDepth(9600);
    document.getElementById('hud').style.display='';
    this.events.once('shutdown',function(){ var ks=self._texKeys||[]; setTimeout(function(){ ks.forEach(function(k){ try{ if(game.textures.exists(k))game.textures.remove(k); }catch(e){} }); },60); });
  }
  _renderInterior(m){
    var self=this, tag='bi'+(BuildingScene._seq=(BuildingScene._seq||0)+1), keys=this._texKeys=[];
    var addTex=function(k,cv){ gpuTex(self,k,cv); keys.push(k); return k; };
    CHX.glow(this); if(!this.textures.exists('dot')){ var dc=mkCanvas(8,8), dx=dc.getContext('2d'); dx.fillStyle='#fff'; dx.beginPath(); dx.arc(4,4,4,0,Math.PI*2); dx.fill(); this.textures.addCanvas('dot',dc); }
    this.add.image(0,0,addTex('base_'+tag,m.base)).setOrigin(0,0).setDepth(-10);
    m.shafts.forEach(function(sh,i){ var im=self.add.image(sh.x,sh.y,addTex('shaft_'+tag+'_'+i,sh.canvas)).setOrigin(0,0).setBlendMode(Phaser.BlendModes.ADD).setAlpha(sh.a||0.4).setDepth(-5);
      self.tweens.add({targets:im,alpha:(sh.a||0.4)*0.55,duration:2600+i*300,yoyo:true,repeat:-1,ease:'Sine.inOut'}); });
    var sprTex=new Map();      // sprites sharing one canvas share one texture
    self._bedIms=[]; self._lightIms=[];
    m.sprites.forEach(function(sp,i){ var tk=sprTex.get(sp.canvas); if(!tk&&!sp.flat&&!sp.under&&typeof ZOL!=='undefined'&&sp.canvas.height/(sp.res||1)>=30)ZOL.mask(sp.canvas); if(!tk){ tk=addTex('spr_'+tag+'_'+i,sp.canvas); sprTex.set(sp.canvas,tk); } var im=self.add.image(sp.x,sp.y,tk).setOrigin(sp.ox!==undefined?sp.ox:0.5,sp.oy!==undefined?sp.oy:1).setDepth(sp.under?-9:sp.flat?-6:sp.depth!==undefined?sp.depth:sp.y); if(sp.canvas&&sp.canvas._zm)im._zcv=sp.canvas; if(sp.res){ im.setScale(1/sp.res); try{ im.texture.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} } if(sp._bed)self._bedIms.push(im); });      // painted scenery (04h): 2 × canvases
    m.lights.forEach(function(L,i){ var im=self.add.image(L.x,L.y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(L.col)).setAlpha(L.a).setScale(L.r/64).setDepth(9000); self._lightIms.push(im);
      if(L.pulse)self.tweens.add({targets:im,alpha:L.a*(1-L.pulse),duration:(L.period||1800)+i*37,yoyo:true,repeat:-1,ease:'Sine.inOut'});
      if(L.flicker)self.tweens.add({targets:im,alpha:L.a*(1-L.flicker),scale:(L.r/64)*0.94,duration:120+i*23,yoyo:true,repeat:-1}); });
    m.particles.forEach(function(p){ var a=p.area||{x:LT,y:2*LT,w:(m.w-2)*LT,h:(m.h-3)*LT};
      self.add.particles(0,0,'dot',{ x:{min:a.x,max:a.x+a.w}, y:{min:a.y,max:a.y+a.h}, lifespan:p.life||{min:2500,max:5000}, speedX:p.vx||{min:-6,max:6}, speedY:p.vy||{min:-10,max:-3},
        scale:p.scale||{start:0.4,end:0}, alpha:p.alpha||{start:0.8,end:0}, tint:p.tints?p.tints.map(hexNum):hexNum(p.col||'#ffffff'), frequency:p.freq||150, blendMode:'ADD' }).setDepth(9100); });
    if(m.dark){ this.add.rectangle(0,0,m.w*LT,m.h*LT,0x000000,m.dark).setOrigin(0,0).setDepth(8900); }
    // soft vignette so the room reads as lit from inside
    var vc=mkCanvas(m.w*LT,m.h*LT), vx=vc.getContext('2d'), vg=vx.createRadialGradient(m.w*LT/2,m.h*LT/2,m.h*LT*0.35,m.w*LT/2,m.h*LT/2,m.w*LT*0.62); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.45)'); vx.fillStyle=vg; vx.fillRect(0,0,vc.width,vc.height);
    this.add.image(0,0,addTex('vig_'+tag,vc)).setOrigin(0,0).setDepth(9200);
    domText(this,INT_W*TILE/2,(INT_H-1)*TILE+4,'▼ Exit',{fontSize:'7px',color:'#ffd890',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5,0).setDepth(9300);
  }
  _spawnPlayer(){
    var sp=this._imap.spawn, sx=sp.x,sy=sp.y;
    this.bx=sx;this.by=sy;this.bdir='up';
    var cont=this.add.container(sx,sy).setDepth(sy);
    var body=this.add.rectangle(0,2,14,16,0x4488dd).setVisible(false);
    var head=this.add.circle(0,-9,7,0xf0c880).setVisible(false);
    var eyeL=this.add.circle(-2,-10,1.5,0x222222).setVisible(false);
    var eyeR=this.add.circle(2,-10,1.5,0x222222).setVisible(false);
    cont.add([this.add.ellipse(0,11,16,5,0x000000,.3),body,head,eyeL,eyeR]);
    this.bSprite=_heroAddSprite(this,cont,12);
    this.bWalkSt=_heroNewState('up');
    this.bCont=cont;
  }
  _spawnNPC(type){
    var N=this._imap.npc, nx=N.x, ny=N.y;
    this.npcX=nx;this.npcY=ny;
    var name=N.rest?'Your bed':'NPC', chR=N.id&&CHAR_BY_ID[N.id];
    if(type==='quest_board')name='Quest Board';
    if(chR){ var cont=this.add.container(nx,ny).setDepth(ny+14); cont.add(this.add.ellipse(0,14,20,6,0x000000,.3)); this._npcSpr=CHX.sprite(this,N.id,0,16,1.25); cont.add(this._npcSpr); name=chR.name; }
    domText(this,nx,ny-(chR?34:6),name,{fontSize:'8px',color:'#ffeecc',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(9400);
  }
  update(_,ms){
    var dt=ms/1000;
    if(this._resting)return;      // round 44: asleep in bed
    this._movePlayer(dt);
    this._checkBuildingInteraction();
    if(this.by>(INT_H-0.55)*TILE)this._exitBuilding();
  }
  _movePlayer(dt){
    var k=this.keys,spd=100,vx=0,vy=0;
    if(k.LEFT.isDown||k.A.isDown){vx=-spd;}
    if(k.RIGHT.isDown||k.D.isDown){vx=spd;}
    if(k.UP.isDown||k.W.isDown){vy=-spd;}
    if(k.DOWN.isDown||k.S.isDown){vy=spd;}
    if(vx&&vy){vx*=.707;vy*=.707;}
    var nx=this.bx+vx*dt,ny=this.by+vy*dt;
    if(this._canGoB(nx,this.by))this.bx=nx;
    if(this._canGoB(this.bx,ny))this.by=ny;
    this.bCont.setPosition(this.bx,this.by).setDepth(this.by+12); if(typeof ZOL!=='undefined')ZOL.tick(this,this.bCont,8990);      // round 45: outline when behind something
    if(this.bWalkSt){
      this.bWalkSt.dir=_heroDirFromVel(vx,vy,this.bWalkSt.dir);
      this.bdir=this.bWalkSt.dir;
      _heroAnimate(this,this.bSprite,this.bWalkSt,vx,vy,dt,0,0);
    }
  }
  _canGoB(nx,ny){
    var hw=6,hh=4, m=this._imap;
    var corners=[[nx-hw,ny-hh],[nx+hw,ny-hh],[nx-hw,ny+hh],[nx+hw,ny+hh]];
    for(var i=0;i<corners.length;i++){
      var tx=Math.floor(corners[i][0]/TILE),ty=Math.floor(corners[i][1]/TILE);
      if(ty>=INT_H)continue;   // walking out through the door
      if(mapSolid(m,tx,ty))return false;
    }
    return true;
  }
  _checkBuildingInteraction(){
    var nearNPC=Math.hypot(this.bx-this.npcX,this.by-this.npcY)<TILE*2.4;
    if(nearNPC){
      var acts={tavern:'[Tab] Rest — 10g',shop:'[Tab] Shop',house:'[Tab] Rest (free)',forge:'[Tab] Forge',guild:'[Tab] Quests',quest_board:'[Tab] Quests',stables:'[Tab] Mounts',armory:'[Tab] Armory',clothing:'[Tab] Clothing',jeweler:'[Tab] Jeweler',apothecary:'[Tab] Apothecary',merchant:'[Tab] Merchant'};
      this.interactPrompt.setText(acts[this.building.type]||'[Tab] Talk').setVisible(true).setPosition(this.bx,this.by-34);
      if(Phaser.Input.Keyboard.JustDown(this.keys.TAB))this._npcInteract();
    } else {
      this.interactPrompt.setVisible(false);
    }
  }
  _npcInteract(){
    var ps=this.worldScene.playerState;
    var type=this.building.type;
    if(type==='house'){
      this._rest();
    } else if(type==='tavern'){
      _showTavernMenu(ps,this.worldScene);
    } else if(type==='shop'){
      var sec=this.worldScene.currentSection()||0;
      openCampModal({section:Math.max(1,sec),type:'shop'},ps,this.worldScene);
    } else if(type==='forge'){
      openForgeModal(ps,this.worldScene);
    } else if(type==='guild'||type==='quest_board'){
      renderQuestList(ps.unlockedSections,ps.completedQuests,ps.activeQuest,this.worldScene);
      toggleModal('quests');
    } else if(type==='stables'){
      window._atStables=true; openMountsModal(ps,this.worldScene);      // the stables sell the horse (round 37)
    } else if(type==='armory'||type==='clothing'||type==='jeweler'||type==='apothecary'||type==='merchant'){
      openBuildingShop(type,ps,this.worldScene);
    }
  }
  // round 44 (Kris: "we need to create an animation for you resting in your bed. We can create new sheets to do this, and we need to make the lights go out for
  // a little bit"): the hero gets into bed, the lights go down, he sleeps (Zzz), the lights come back and he gets up beside the bed, rested.
  // With the painted frames (wave 44, sc_sleep: an_sleep_m / an_sleep_f, an_wake_m / an_wake_f) the bed itself shows him asleep; until then the hero lies
  // in the bed under a drawn quilt.
  _rest(){ if(this._resting)return; var self=this, ps=this.worldScene.playerState, m=this._imap, B=m.bed||{x:this.npcX-LT,y:this.npcY-LT,w:2*LT,h:2*LT}, who=_heroWho(this)==='f'?'f':'m';
    if(this._bedIms&&this._bedIms.length){ var bb=null; this._bedIms.forEach(function(im){ var r=im.getBounds(); if(!bb||r.width*r.height>bb.width*bb.height)bb=r; }); if(bb&&bb.width>8)B={x:bb.x,y:bb.y,w:bb.width,h:bb.height}; }      // the painted bed's own outline
    this._resting=true; if(this.interactPrompt)this.interactPrompt.setVisible(false);
    // round 46 (Kris: "When you sleep, your hero still shows up, so there's a double of you … The bed and yourself get really large when sleeping"):
    // the hero leaves the room while the sleeping picture shows, and that picture is sized to the bed it replaces (its width), not stretched taller.
    // The repainted frames (wave 49, an_sleep2_* / an_wake2_*, drawn to the house bed's own size) are used when they are in.
    var at=function(id){ return typeof ZWE!=='undefined'?ZWE.animTex(self,id):null; };
    var cx=B.x+B.w/2, foot=B.y+B.h-2, A=at('an_sleep2_'+who)||at('an_sleep_'+who), W=at('an_wake2_'+who)||at('an_wake_'+who), parts=[], hx=this.bx, hy=this.by;
    var ov=this.add.rectangle(0,0,m.w*LT,m.h*LT,0x03040c,0).setOrigin(0,0).setDepth(9150), L0=this._lightIms.map(function(l){ return l.alpha; });
    this.tweens.add({targets:ov,fillAlpha:0.8,duration:900,delay:500,ease:'Sine.inOut'}); this._lightIms.forEach(function(l){ self.tweens.killTweensOf(l); self.tweens.add({targets:l,alpha:l.alpha*0.12,duration:900,delay:500}); });
    if(A){ var bw=B.w+10, sc=A.scale*bw/Math.max(1,A.h*1.1); this._bedIms.forEach(function(im){ im.setVisible(false); });
      var aw=Math.max(1,A.w||A.h*0.62), sl=this.add.image(cx,foot,A.key,'0').setOrigin(A.ox,A.oy).setScale(A.scale*B.w/aw).setDepth(foot); parts.push(sl); this.bCont.setVisible(false); var fi=0; this._sleepEv=this.time.addEvent({delay:420,loop:true,callback:function(){ fi=(fi+1)%A.n; sl.setFrame(String(fi)); }}); }
    else { var bd=Math.max.apply(null,[foot].concat(this._bedIms.map(function(im){ return im.depth; }))); this.bCont.setPosition(cx,B.y+B.h*0.74).setDepth(bd+0.5); try{ if(this.bSprite&&this.bSprite.setTexture&&this.textures.exists('hero_front_0'))this.bSprite.setTexture(_heroKey(this,'hero_front_0')); }catch(e){}      // facing out of the bed
      var q=this.add.graphics().setDepth(bd+1), col=hexNum((m.theme&&m.theme.rug)||'#4a6aa8'), qy=B.y+B.h*0.4, qw=B.w*0.74, qh=B.h*0.44; q.fillStyle(0x1a1420,1); q.fillRoundedRect(cx-qw/2-1,qy-1,qw+2,qh+2,6); q.fillStyle(col,1); q.fillRoundedRect(cx-qw/2,qy,qw,qh,6);
      q.fillStyle(0xffffff,0.16); for(var yy=qy+4;yy<qy+qh-4;yy+=9)for(var xx=cx-qw/2+4+((yy/9|0)%2)*9;xx<cx+qw/2-6;xx+=18)q.fillRect(xx,yy,9,9); parts.push(q);
      this.tweens.add({targets:q,scaleY:1.025,y:-1,duration:1200,yoyo:true,repeat:-1,ease:'Sine.inOut'}); }
    var z=0, zz=this.time.addEvent({delay:650,repeat:4,startAt:200,callback:function(){ z++; var t=domText(self,cx+8+z*3,B.y+4,z%2?'z':'Z',{fontSize:(8+z*2)+'px',color:'#cfe0ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(9300);
      self.tweens.add({targets:t,y:B.y-26,x:cx+20+z*4,alpha:0,duration:1500,onComplete:function(){ t.destroy(); }}); }});
    this.time.delayedCall(4000,function(){ self.tweens.add({targets:ov,fillAlpha:0,duration:1000,ease:'Sine.inOut',onComplete:function(){ ov.destroy(); }}); self._lightIms.forEach(function(l,i){ self.tweens.add({targets:l,alpha:L0[i],duration:1000}); });
      if(self._sleepEv){ self._sleepEv.remove(); self._sleepEv=null; }
      var finish=function(){ parts.forEach(function(p){ self.tweens.killTweensOf(p); p.destroy(); }); self._bedIms.forEach(function(im){ im.setVisible(true); });
        self.bx=B.x+B.w+14; self.by=B.y+B.h+6; self.bCont.setPosition(self.bx,self.by).setDepth(self.by).setVisible(true); self.bdir='down';
        ps.hp=ps.maxHp; if(ps.maxMp)ps.mp=ps.maxMp; showNotif('💤 You wake up rested — HP fully restored!','#44ffaa'); self.worldScene._emitUI(); self._resting=false; };
      if(W&&parts[0]&&parts[0].setFrame){ var sl2=parts[0]; sl2.setTexture(W.key,'0').setOrigin(W.ox,W.oy); var k=0; self.time.addEvent({delay:380,repeat:W.n-1,callback:function(){ k++; if(k<W.n)sl2.setFrame(String(k)); else finish(); }}); self.time.delayedCall(380*W.n+60,function(){ if(self._resting)finish(); }); }
      else self.time.delayedCall(700,finish); });
  }
  _exitBuilding(){
    document.getElementById('hud').style.display='none';
    this.scene.stop('Building');
    this.scene.wake('World',{type:'building'});
  }
}

