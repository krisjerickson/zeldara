// ═══════════════════════════════════════════════════════════════════════
// ║ RUNIC WORLD (Phase 3) — the Lab's atmosphere in the game world:
// ║   • each zone's own particles (motes, fireflies, petals, embers, ash,
// ║     snow, mist, wind) drift around the camera while you're in it
// ║   • landmarks: [Tab] near one tells its story (as in the Lab)
// ║   • day & night: a slow cycle; at night the land darkens and runes,
// ║     ley lines, lanterns and glowing plants shine brighter
// ═══════════════════════════════════════════════════════════════════════
var WR_DAY={period:720, night:[0.62,0.88]};   // seconds per day; night = fraction of the day in darkness
Object.assign(WorldScene.prototype,{
  _runicInit(){
    this._zfx={key:null,em:[]};
    this._dayT=(this.playerState&&this.playerState.dayT)||60;
    var self=this; this.events.once('shutdown',function(){ if(self._darkRT)self._darkRT.destroy(); self._darkRT=null; });
  },
  // 0 = full day … 1 = full night
  _nightAmt(){
    if(this._forceNight!==undefined)return this._forceNight;
    var f=(this._dayT%WR_DAY.period)/WR_DAY.period, a=WR_DAY.night[0], b=WR_DAY.night[1], ramp=0.04;
    if(f<a-ramp||f>b+ramp)return 0; if(f>=a&&f<=b)return 1; return f<a?(f-(a-ramp))/ramp:1-(f-b)/ramp;
  },
  _runicTick(dt){
    if(!this.player||!this._zfx)return;
    this._dayT+=dt; if(this.playerState)this.playerState.dayT=this._dayT%WR_DAY.period;
    var cam=this.cameras.main, dw=cam.width/cam.zoom, dh=cam.height/cam.zoom, vx=cam.scrollX+(cam.width-dw)/2, vy=cam.scrollY+(cam.height-dh)/2;
    // zone particles follow the view
    var tx=Math.floor(this.player.x/TILE), ty=Math.floor(this.player.y/TILE), z=_wmZoneAt(tx,ty), key=z?z.id:null;
    if(key!==this._zfx.key){ this._zfx.em.forEach(function(e){ e.stop(); e.scene.time.delayedCall(9000,function(){ e.destroy(); }); }); this._zfx.em=[]; this._zfx.key=key;
      var Z=key?WZ_DESIGN[key]:null, self=this; if(Z)(Z.particles||[]).forEach(function(p){ var q=Object.assign({},p); if(q.freq)q.freq=Math.max(40,q.freq*1.6); var e=self._wrEmitter(q,{x:0,y:0,w:dw+200,h:dh+200}); if(e){ e.setDepth(p.depth!==undefined&&p.depth>=6000?10.95:10.9); self._zfx.em.push(e); } }); }
    this._zfx.em.forEach(function(e){ e.setPosition(vx-100,vy-100); });
    // night
    var n=this._nightAmt(); this._night=n;
    if(n>0.001){
      if(!this._darkRT){ this._darkRT=this.add.renderTexture(0,0,Math.ceil(dw)+64,Math.ceil(dh)+64).setOrigin(0,0).setDepth(11.2); this._holeImg=this.make.image({x:0,y:0,key:'dark_hole',add:false}); this._makeHoleTex(); }
      var rt=this._darkRT; if(rt.width<dw+64||rt.height<dh+64)rt.resize(Math.ceil(dw)+64,Math.ceil(dh)+64);
      rt.setPosition(vx-32,vy-32).setVisible(true); var ZD=this._zfx.key?WZ_DESIGN[this._zfx.key]:null; rt.clear(); rt.fill(hexNum((ZD&&ZD.nightCol)||'#060a1c'),((ZD&&ZD.nightA)||0.6)*n);
      var hole=this._holeImg, ox=vx-32, oy=vy-32, cut=function(x,y,r,a){ if(x<vx-r||x>vx+dw+r||y<vy-r||y>vy+dh+r)return; hole.setScale(r/128); hole.setAlpha(a); rt.erase(hole,x-ox,y-oy); };
      cut(this.player.x,this.player.y-14,200*(1+0.03*Math.sin(this._dayT*9)),1);
      var self=this, cnt=0;
      if(this._wr)this._wr.chunks.forEach(function(ch){ ch.objs.forEach(function(o){ if(cnt>90||!o._base||o._base.noCut)return; cnt++; cut(o.x,o.y,o._base.r*0.9,Math.min(1,o.alpha*1.6)); }); });
      (this._glowObjs||[]).forEach(function(o){ cut(o.x,o.y,o.scale*64*0.9,Math.min(1,o.alpha*1.8)); });
    } else if(this._darkRT)this._darkRT.setVisible(false);
  },
  _makeHoleTex(){ if(this.textures.exists('dark_hole'))return; var h=mkCanvas(256,256), q=h.getContext('2d'), g3=q.createRadialGradient(128,128,0,128,128,128);
    g3.addColorStop(0,'rgba(255,255,255,1)'); g3.addColorStop(0.55,'rgba(255,255,255,0.75)'); g3.addColorStop(1,'rgba(255,255,255,0)'); q.fillStyle=g3; q.fillRect(0,0,256,256); this.textures.addCanvas('dark_hole',h); this._holeImg.setTexture('dark_hole'); },
  // Landmark stories ([Tab] near one); returns true when a prompt is showing
  _checkLandmark(){
    var L=null, px=this.player.x, py=this.player.y-8, bd=48;
    (this.wd.landmarks||[]).forEach(function(q){ var cx=Math.max(q.x,Math.min(px,q.x+q.w)), cy=Math.max(q.y,Math.min(py,q.y+q.h)), d=Math.hypot(px-cx,py-cy); if(d<bd){bd=d;L=q;} });
    if(!L){ if(this._interactPrompt&&this._interactPrompt._lm){this._interactPrompt.destroy();this._interactPrompt=null;} return false; }
    var title=L.text.indexOf('—')>0&&L.text.indexOf('—')<48?L.text.split('—')[0].trim():((WZ_DESIGN[L.zone]&&WZ_DESIGN[L.zone].name)||'Inspect');
    if(!this._interactPrompt||this._interactPrompt._lm!==L){ if(this._interactPrompt)this._interactPrompt.destroy();
      this._interactPrompt=domText(this,px,py-44,'[Tab] '+title,{fontSize:'10px',color:'#fff8d0',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5,1).setDepth(20); this._interactPrompt._lm=L; }
    this._interactPrompt.setPosition(px,py-44);
    if(Phaser.Input.Keyboard.JustDown(this.keys.TAB)){ showNotif('ᚱ '+L.text,'#fff0c0'); var ps=this.playerState; if(!ps.readLandmarks)ps.readLandmarks=[]; if(ps.readLandmarks.indexOf(L.zone)<0)ps.readLandmarks.push(L.zone); }
    return true;
  }
});
