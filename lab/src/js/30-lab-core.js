// ═══════════════════════════════════════════════════════════════════════
// ║ ZELDARA DESIGN LAB — core engine (Phase 2 · A2)
// ║
// ║ A walkable preview engine shared by every selector tab. Each design is a
// ║ plain object { id, name, blurb, build(seed) → map }. The engine paints
// ║ nothing itself: designs return a map with a pre-painted base canvas, tall
// ║ sprites (depth-sorted against the hero), lights, particles and colliders.
// ║ The hero is the real game hero (02-hero-api.js + sprite data).
// ═══════════════════════════════════════════════════════════════════════
// Shared utilities + map model live in src/js/07-site-art.js (also used by the game).

// ═══════════════════════════════════════════════════════════════════════
// ║ Walk scene
// ═══════════════════════════════════════════════════════════════════════
class LabWalkScene extends Phaser.Scene{
  constructor(){ super('LabWalk'); }
  init(d){ this.map=d.map; this.design=d.design; this.playerState={mount:null}; }
  create(){
    var m=this.map, self=this;
    this.cameras.main.setBackgroundColor(m.bg||'#000');
    _heroRegisterTextures(this);
    this._makeTextures();
    // Base layer
    var baseKey='base_'+(LabApp.seq++);
    this.textures.addCanvas(baseKey, m.base);
    this.add.image(0,0,baseKey).setOrigin(0,0).setDepth(-10);
    // Light shafts (under sprites, additive)
    m.shafts.forEach(function(s,i){
      var k='shaft_'+baseKey+'_'+i; self.textures.addCanvas(k,s.canvas);
      var im=self.add.image(s.x,s.y,k).setOrigin(0,0).setBlendMode(Phaser.BlendModes.ADD).setAlpha(s.a||0.5).setDepth(-5);
      if(s.sway)self.tweens.add({targets:im,alpha:(s.a||0.5)*0.6,duration:2200+i*170,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    });
    // Tall sprites, depth-sorted by foot y
    m.sprites.forEach(function(s,i){
      var k='spr_'+baseKey+'_'+i; self.textures.addCanvas(k,s.canvas);
      var im=self.add.image(s.x,s.y,k).setOrigin(s.ox!==undefined?s.ox:0.5,s.oy!==undefined?s.oy:1).setDepth(s.depth!==undefined?s.depth:s.y);
      if(s.bob)self.tweens.add({targets:im,y:s.y-s.bob,duration:1400+(i%7)*130,yoyo:true,repeat:-1,ease:'Sine.inOut'});
      if(s.spin)self.tweens.add({targets:im,angle:360,duration:s.spin,repeat:-1});
    });
    // Lights (additive glow sprites)
    this._lightObjs=[];
    m.lights.forEach(function(L,i){
      var im=self.add.image(L.x,L.y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(L.col)).setAlpha(L.a).setScale(L.r/64).setDepth(L.depth!==undefined?L.depth:5000);
      if(L.pulse&&!L.react)self.tweens.add({targets:im,alpha:L.a*(1-L.pulse),scale:(L.r/64)*(1-L.pulse*0.25),duration:(L.period||1800)+i*37,yoyo:true,repeat:-1,ease:'Sine.inOut'});
      if(L.flicker)im._flicker=L.flicker;
      im._base=L; self._lightObjs.push(im);
    });
    // Particles
    m.particles.forEach(function(p){ self._addParticles(p); });
    // Hero
    var sp=m.spawn;
    this.hero=this.add.container(sp.x,sp.y);
    this.heroShadow=this.add.ellipse(0,0,20,7,0x000000,0.3); this.hero.add(this.heroShadow);
    this.heroSprite=_heroAddSprite(this,this.hero,0);
    this.st=_heroNewState('up');
    this.cameras.main.setBounds(0,0,m.w*LT,m.h*LT);
    this.cameras.main.setZoom(LabApp.zoom);
    this.cameras.main.startFollow(this.hero,true,0.12,0.12);
    // Hero light (always follows; matters in dark maps)
    if(m.dark>0||m.night){
      this.heroLight=this.add.image(sp.x,sp.y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(m.heroLightCol||'#ffcc88')).setAlpha(0.35).setScale((m.heroLight||150)/64).setDepth(5001);
      this._initDark();
      // World samples start in daylight; N toggles night (runes glow brighter)
      if(!(m.dark>0)){ this._night=!!LabApp.night; this.darkRT.setVisible(this._night); this.heroLight.setVisible(this._night); }
    }
    this.keys=this.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,SHIFT,TAB');
    this.input.keyboard.on('keydown-TAB',function(e){ if(e&&e.originalEvent)e.originalEvent.preventDefault(); self._inspect(); });
    // M = overview (zoom to fit the whole floor), L = lights on/off (dark maps)
    this.input.keyboard.on('keydown-M',function(){ if(LabApp.typing())return; self._overview=!self._overview; var cam=self.cameras.main;
      if(self._overview){ var z=Math.min(cam.width/(m.w*LT),cam.height/(m.h*LT)); cam.stopFollow(); cam.setZoom(z); cam.centerOn(m.w*LT/2,m.h*LT/2); LabApp.toast('Overview — press M again to walk'); }
      else { cam.setZoom(LabApp.zoom); cam.startFollow(self.hero,true,0.12,0.12); } });
    this.input.keyboard.on('keydown-N',function(){ if(LabApp.typing()||!m.night)return; self._night=!self._night; LabApp.night=self._night; self.darkRT.setVisible(self._night); self.heroLight.setVisible(self._night); LabApp.toast(self._night?'Night — runes and ley lines glow brighter':'Day'); });
    this.input.keyboard.on('keydown-L',function(){ if(LabApp.typing()||!self.darkRT)return; self.darkRT.setVisible(!self.darkRT.visible); LabApp.toast(self.darkRT.visible?'Lighting on':'Lighting off — full layout visible'); });
    this.prompt=this.add.text(0,0,'',{fontSize:'9px',fontFamily:'Segoe UI',color:'#fff8d0',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(0.5,1).setDepth(100000);
    this._t=0;
    this.events.once('shutdown',function(){ self.tweens.killAll(); });
  }
  _makeTextures(){
    if(!this.textures.exists('glow')){
      var c=mkCanvas(128,128), x=c.getContext('2d'), g=x.createRadialGradient(64,64,0,64,64,64);
      g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(0.35,'rgba(255,255,255,0.45)'); g.addColorStop(1,'rgba(255,255,255,0)');
      x.fillStyle=g; x.fillRect(0,0,128,128); this.textures.addCanvas('glow',c);
    }
    if(!this.textures.exists('dot')){
      var d=mkCanvas(8,8), y=d.getContext('2d'), g2=y.createRadialGradient(4,4,0,4,4,4);
      g2.addColorStop(0,'rgba(255,255,255,1)'); g2.addColorStop(1,'rgba(255,255,255,0)'); y.fillStyle=g2; y.fillRect(0,0,8,8); this.textures.addCanvas('dot',d);
    }
    if(!this.textures.exists('leaf')){
      var l=mkCanvas(10,6), z=l.getContext('2d'); z.fillStyle='#fff'; z.beginPath(); z.ellipse(5,3,5,2.2,0.4,0,Math.PI*2); z.fill(); this.textures.addCanvas('leaf',l);
    }
    if(!this.textures.exists('dark_hole')){
      var h=mkCanvas(256,256), q=h.getContext('2d'), g3=q.createRadialGradient(128,128,0,128,128,128);
      g3.addColorStop(0,'rgba(255,255,255,1)'); g3.addColorStop(0.55,'rgba(255,255,255,0.75)'); g3.addColorStop(1,'rgba(255,255,255,0)');
      q.fillStyle=g3; q.fillRect(0,0,256,256); this.textures.addCanvas('dark_hole',h);
    }
  }
  _addParticles(p){
    var tex=p.tex||'dot', a=p.area||{x:0,y:0,w:this.map.w*LT,h:this.map.h*LT};
    var cfg={
      x:{min:a.x,max:a.x+a.w}, y:{min:a.y,max:a.y+a.h},
      lifespan:p.life||{min:3000,max:6000},
      speedX:p.vx||{min:-6,max:6}, speedY:p.vy||{min:-10,max:-3},
      scale:p.scale||{start:0.5,end:0}, alpha:p.alpha||{start:0.8,end:0},
      tint:p.tints?p.tints.map(hexNum):hexNum(p.col||'#ffffff'),
      frequency:p.freq||120, quantity:p.qty||1, blendMode:p.blend===false?'NORMAL':'ADD',
      rotate:p.rotate||0, gravityY:p.gravity||0
    };
    var e=this.add.particles(0,0,tex,cfg); e.setDepth(p.depth!==undefined?p.depth:6000);
    return e;
  }
  _initDark(){
    var m=this.map;
    this.darkRT=this.add.renderTexture(0,0,m.w*LT,m.h*LT).setOrigin(0,0).setDepth(7000);
    this._holeImg=this.make.image({x:0,y:0,key:'dark_hole',add:false});
  }
  _drawDark(){
    var m=this.map, rt=this.darkRT, hole=this._holeImg, cam=this.cameras.main;
    var nightOn=!(m.dark>0)&&m.night;
    rt.clear(); rt.fill(hexNum(nightOn?m.night.col:(m.darkCol||'#000000')), nightOn?m.night.a:m.dark);
    var v=cam.worldView, pad=200;
    var self=this;
    function cut(x,y,r,a){
      if(x<v.x-pad-r||x>v.right+pad+r||y<v.y-pad-r||y>v.bottom+pad+r)return;
      hole.setScale(r/128); hole.setAlpha(a); rt.erase(hole,x,y);
    }
    cut(this.hero.x,this.hero.y-14,(m.heroLight||150)*(1+0.03*Math.sin(this._t*9)),1);
    this._lightObjs.forEach(function(o){ var L=o._base; if(L.noCut)return; cut(o.x,o.y,L.r*(L.cut||0.9),Math.min(1,o.alpha*1.6)); });
  }
  _inspect(){
    var near=this._nearLabel(); if(!near)return;
    LabApp.toast(near.text);
  }
  _nearLabel(){
    var hx=this.hero.x, hy=this.hero.y-8, best=null, bd=1e9;
    this.map.labels.forEach(function(L){
      var cx=Math.max(L.x,Math.min(hx,L.x+L.w)), cy=Math.max(L.y,Math.min(hy,L.y+L.h)), d=Math.hypot(hx-cx,hy-cy);
      if(d<40&&d<bd){bd=d;best=L;}
    });
    return best;
  }
  _blocked(x,y){
    var m=this.map, hw=7;
    var pts=[[x-hw,y-6],[x+hw,y-6],[x-hw,y],[x+hw,y]];
    for(var i=0;i<4;i++){ if(mapSolid(m,Math.floor(pts[i][0]/LT),Math.floor(pts[i][1]/LT)))return true; }
    return false;
  }
  update(t,dms){
    var dt=Math.min(0.05,dms/1000); this._t+=dt;
    var k=this.keys, typing=LabApp.typing(), vx=0, vy=0;
    if(!typing&&!LabApp.overlayOpen){
      if(k.LEFT.isDown||k.A.isDown)vx=-1; if(k.RIGHT.isDown||k.D.isDown)vx=1;
      if(k.UP.isDown||k.W.isDown)vy=-1; if(k.DOWN.isDown||k.S.isDown)vy=1;
    }
    var spd=(k.SHIFT.isDown?260:150);
    if(vx&&vy){vx*=0.7071;vy*=0.7071;}
    var nx=this.hero.x+vx*spd*dt, ny=this.hero.y+vy*spd*dt;
    if(!this._blocked(nx,this.hero.y))this.hero.x=nx;
    if(!this._blocked(this.hero.x,ny))this.hero.y=ny;
    this.hero.setDepth(this.hero.y);
    this.st.dir=_heroDirFromVel(vx,vy,this.st.dir);
    _heroAnimate(this,this.heroSprite,this.st,vx,vy,dt,0,0);
    if(this.heroLight)this.heroLight.setPosition(this.hero.x,this.hero.y-14);
    // Flicker
    var tt=this._t;
    // Runes pulse slowly and brighten as you walk near (brighter still at night)
    var hx=this.hero.x, hy=this.hero.y, nb=this._night?1.5:1;
    this._lightObjs.forEach(function(o,i){ var L=o._base; if(!L.react)return; var near=Math.max(0,1-Math.hypot(hx-o.x,hy-o.y)/150);
      o.setAlpha(Math.min(1,L.a*nb*(0.72+0.28*Math.sin(tt*1.6+i*0.9))*(1+1.6*near))); o.setScale((L.r/64)*(1+0.35*near)); });
    this._lightObjs.forEach(function(o,i){ if(o._flicker){ o.setAlpha(o._base.a*(1-o._flicker*0.5+o._flicker*0.5*Math.sin(tt*11+i*1.7)*Math.sin(tt*7.3+i))); } });
    if(this.map.tick)this.map.tick(this,dt,this._t);
    if(this.darkRT&&this.darkRT.visible)this._drawDark();
    // Inspect prompt
    var L=this._nearLabel();
    if(L){ this.prompt.setText('[Tab] '+L.text.split('—')[0].trim()).setPosition(this.hero.x,this.hero.y-48).setVisible(true); }
    else this.prompt.setVisible(false);
  }
}

// ═══════════════════════════════════════════════════════════════════════
// ║ Lab app — tabs, design grid, walk view, picks
// ═══════════════════════════════════════════════════════════════════════
var LAB_TABS=[];          // filled by 31-/32-/33- files: {id,name,blurb,designs:[...],regionLabel}
var LAB_REGIONS=[{k:1,n:'Grasslands'},{k:2,n:'Wetlands'},{k:3,n:'Highlands'},{k:4,n:'Ashlands'}];
var LabApp={
  seq:0, zoom:1.7, game:null, tab:null, idx:0, picks:{}, db:null, overlayOpen:false, thumbs:{}, groups:{}, _tq:[], _tbusy:false,
  typing:function(){ var a=document.activeElement; return !!(a&&(a.tagName==='TEXTAREA'||a.tagName==='INPUT')); },
  key:function(tab,id){ return tab+'-'+id; },
  toast:function(msg){
    var el=document.getElementById('lab-toast'); el.textContent=msg; el.classList.add('show');
    clearTimeout(this._tt); this._tt=setTimeout(function(){el.classList.remove('show');},3200);
  },
  init:function(){
    var self=this;
    try{ this.picks=JSON.parse(localStorage.getItem('zeldara-lab-picks')||'{}'); }catch(e){ this.picks={}; }
    this.tab=LAB_TABS[0].id;
    this.renderTabs(); this.renderGrid();
    this.bind();
    // Shared store (artifact DB) — picks become readable by Claude.
    (async function(){
      try{
        var c=window.claude&&window.claude.use?await window.claude.use('db'):null;
        if(!c){ self.saveState('Saved in this browser only',true); return; }
        self.db=c; self.saveState('Loading your picks…');
        c.collection('picks').onSnapshot(function(snap){
          snap.docs.forEach(function(d){ var v=d.data(); if(!v)return;
            var ta=document.getElementById('lab-notes'), editing=ta&&document.activeElement===ta&&self.currentKey()===d.id;
            var cur=self.picks[d.id]||{};
            self.picks[d.id]={verdict:v.verdict||null,notes:editing?cur.notes:(v.notes||''),regions:v.regions||[]};
          });
          self.persistLocal(); self.renderGrid(true); self.renderPanel();
          if(!snap.metadata.hasPendingWrites)self.saveState('All picks saved');
        },function(err){ self.saveState('Live sync stopped ('+err.code+') — picks kept in this browser',true); });
      }catch(e){ self.saveState('Saved in this browser only',true); }
    })();
  },
  saveState:function(msg,warn){ var el=document.getElementById('lab-save'); if(el){el.textContent=msg; el.classList.toggle('warn',!!warn);} },
  persistLocal:function(){ try{ localStorage.setItem('zeldara-lab-picks',JSON.stringify(this.picks)); }catch(e){} },
  _q:{}, _timers:{},
  persist:function(k,delay){
    var self=this; this.persistLocal();
    clearTimeout(this._timers[k]);
    this._timers[k]=setTimeout(function(){
      if(!self.db){ self.saveState('Saved in this browser only',true); return; }
      var parts=k.split('-'), tab=parts[0], id=parts.slice(1).join('-');
      var d=self.designOf(tab,id), p=self.picks[k]||{};
      var body={tab:tab,id:id,title:d?d.name:id,verdict:p.verdict||null,notes:p.notes||'',regions:p.regions||[],updatedAt:new Date().toISOString()};
      self.saveState('Saving…');
      self._q[k]=(self._q[k]||Promise.resolve()).then(function(){ return self.db.doc('picks/'+k).set(body); })
        .then(function(){ self.saveState('All picks saved'); })
        .catch(function(e){ self.saveState('Could not save ('+(e&&e.code||'error')+') — kept in this browser',true); });
    }, delay===undefined?200:delay);
  },
  tabObj:function(id){ return LAB_TABS.find(function(t){return t.id===(id||LabApp.tab);}); },
  designOf:function(tab,id){ var t=this.tabObj(tab); return t&&t.designs.find(function(d){return d.id===id;}); },
  currentKey:function(){ var t=this.tabObj(); if(!t||!t.designs.length)return null; return this.key(t.id,t.designs[this.idx].id); },

  // ── Tabs + grid ──
  renderTabs:function(){
    var self=this, el=document.getElementById('lab-tabs');
    el.innerHTML=LAB_TABS.map(function(t){
      var n=t.designs.length, picked=t.designs.filter(function(d){var p=self.picks[self.key(t.id,d.id)];return p&&p.verdict;}).length;
      if(t.render&&window.SPRITE_PILOT){ n=SPRITE_PILOT.pilot.reduce(function(a,c){return a+c.variants.length;},0); picked=Object.keys(self.picks).filter(function(k){return k.indexOf(t.id+'-')===0&&self.picks[k].verdict;}).length; }
      return '<button class="lab-tab" role="tab" data-tab="'+t.id+'" aria-selected="'+(t.id===self.tab)+'">'+t.name+
        (n?'<span class="n">'+picked+'/'+n+'</span>':'<span class="n soon">soon</span>')+'</button>';
    }).join('');
  },
  thumbOf:function(tab,d){
    var k=tab+'-'+d.id; if(this.thumbs[k])return this.thumbs[k];
    try{
      var m=d.build(d.seed||7), W=m.base.width, H=m.base.height, s=Math.min(360/W,240/H);
      var c=mkCanvas(W*s,H*s), x=c.getContext('2d');
      x.drawImage(m.base,0,0,W*s,H*s);
      m.sprites.slice().sort(function(a,b){return (a.depth!==undefined?a.depth:a.y)-(b.depth!==undefined?b.depth:b.y);}).forEach(function(sp){ var ox=sp.ox!==undefined?sp.ox:0.5, oy=sp.oy!==undefined?sp.oy:1; x.drawImage(sp.canvas,(sp.x-sp.canvas.width*ox)*s,(sp.y-sp.canvas.height*oy)*s,sp.canvas.width*s,sp.canvas.height*s); });
      x.globalCompositeOperation='lighter';
      m.lights.forEach(function(L){ glowSpot(x,L.x*s,L.y*s,L.r*s,L.col,Math.min(0.5,L.a*0.8)); });
      x.globalCompositeOperation='source-over';
      if(m.dark>0){ x.fillStyle=rgba(m.darkCol||'#000000',m.dark*0.45); x.fillRect(0,0,c.width,c.height); }
      this.thumbs[k]={url:c.toDataURL('image/jpeg',0.82),stats:m.stats};
    }catch(e){ console.error('thumb',d.id,e); this.thumbs[k]={url:'',stats:{}}; }
    return this.thumbs[k];
  },
  renderGrid:function(quiet){
    var self=this, t=this.tabObj(), el=document.getElementById('lab-grid');
    document.getElementById('lab-tab-blurb').innerHTML=t.blurb;
    if(t.render){ el.className='custom'; el.innerHTML=t.render(); this.renderTabs(); return; }
    el.className='';
    if(!t.designs.length){ el.innerHTML='<p class="lab-empty">'+(t.empty||'Coming next round.')+'</p>'; this.renderTabs(); return; }
    // Optional sub-groups (World: one chip per quadrant) + lazy thumbnails
    var grp=t.groups?this.curGroup(t):null, head='';
    if(t.groups){
      head='<div class="lab-groups">'+t.groups.map(function(G){ var ds=t.designs.filter(function(d){return d.group===G.k;}), pk=ds.filter(function(d){var p=self.picks[self.key(t.id,d.id)];return p&&p.verdict==='pick';}).length;
        return '<button class="lab-grp" data-grp="'+G.k+'" aria-pressed="'+(G.k===grp)+'">'+G.n+' <span class="n">'+pk+' picked</span></button>'; }).join('')+'</div>';
    }
    this._tq=[];
    el.innerHTML=head+'<div class="lab-cards">'+t.designs.map(function(d,i){
      if(grp!==null&&d.group!==grp)return '';
      var th=t.lazy&&!self.thumbs[t.id+'-'+d.id]?(self._tq.push({t:t,d:d}),{url:''}):self.thumbOf(t.id,d), p=self.picks[self.key(t.id,d.id)]||{};
      var regs=(p.regions||[]).map(function(r){var R=LAB_REGIONS.find(function(x){return x.k===r;});return R?R.n:'';}).join(', ');
      return '<button class="lab-card" data-open="'+i+'" data-verdict="'+(p.verdict||'')+'">'+
        '<span class="thumb" id="th-'+t.id+'-'+d.id+'" style="'+(th.url?'background-image:url('+th.url+')':'')+'">'+(th.url?'':'<i class="rendering">painting…</i>')+'</span>'+
        '<span class="num">'+(i+1)+'</span>'+
        (p.verdict?'<span class="verdict v-'+p.verdict+'">'+({pick:'Pick',maybe:'Maybe',no:'No'})[p.verdict]+'</span>':'')+
        '<span class="cap"><b>'+d.name+'</b><span>'+d.tagline+'</span>'+(regs?'<em>For: '+regs+'</em>':'')+'</span></button>';
    }).join('')+'</div>';
    this.renderTabs(); this.pumpThumbs();
  },
  curGroup:function(t){ var g=this.groups[t.id]; if(g===undefined||!t.groups.some(function(G){return G.k===g;}))g=this.groups[t.id]=t.groups[0].k; return g; },
  pumpThumbs:function(){
    var self=this; if(this._tbusy)return; var job=this._tq.shift(); if(!job)return; this._tbusy=true;
    setTimeout(function(){ var th=self.thumbOf(job.t.id,job.d); var el=document.getElementById('th-'+job.t.id+'-'+job.d.id); if(el){ el.style.backgroundImage='url('+th.url+')'; el.innerHTML=''; } self._tbusy=false; self.pumpThumbs(); },20);
  },
  // ── Walk view ──
  open:function(i,step){
    var t=this.tabObj(); if(!t.designs.length)return;
    if(step&&t.groups){ var g=t.designs[this.idx].group, list=[]; t.designs.forEach(function(d,j){ if(d.group===g)list.push(j); });
      var at=list.indexOf(this.idx); i=list[(at+step+list.length)%list.length]; }
    this.idx=(i+t.designs.length)%t.designs.length;
    var d=t.designs[this.idx];
    document.body.classList.add('walking');
    this.renderPanel();
    var map=d.build(d.seed||7);
    var self=this;
    var start=function(){
      if(!self.game.scene.getScene('LabWalk'))self.game.scene.add('LabWalk',LabWalkScene,false);
      if(self.game.scene.isActive('LabWalk'))self.game.scene.stop('LabWalk');
      self.game.scene.start('LabWalk',{map:map,design:d});
      setTimeout(function(){ var cv=document.querySelector('#lab-stage canvas'); if(cv){cv.setAttribute('tabindex','0');cv.focus();} },60);
    };
    if(!this.game){
      this.game=new Phaser.Game({type:Phaser.AUTO,parent:'lab-stage',backgroundColor:'#000',scene:[],
        scale:{mode:Phaser.Scale.RESIZE,width:'100%',height:'100%'},render:{antialias:true},fps:{smoothStep:false}});
      this.game.events.once('ready',start);
    } else start();
  },
  close:function(){
    var t=this.tabObj(); if(t&&t.groups&&t.designs[this.idx])this.groups[t.id]=t.designs[this.idx].group;
    document.body.classList.remove('walking');
    if(this.game&&this.game.scene.isActive('LabWalk'))this.game.scene.stop('LabWalk');
    this.renderGrid();
  },
  renderPanel:function(){
    var t=this.tabObj(); if(!t||!t.designs.length)return;
    var d=t.designs[this.idx], k=this.key(t.id,d.id), p=this.picks[k]||{};
    var el=document.getElementById('lab-panel');
    var regionsUI=t.regionLabel?'<div class="sec-l">'+t.regionLabel+'</div><div class="regions">'+LAB_REGIONS.map(function(R){
      var on=(p.regions||[]).indexOf(R.k)>=0; return '<button class="reg" data-reg="'+R.k+'" aria-pressed="'+on+'">'+R.n+'</button>'; }).join('')+'</div>':'';
    var stats=d.facts?'<ul class="facts">'+d.facts.map(function(f){return '<li>'+f+'</li>';}).join('')+'</ul>':'';
    el.innerHTML='<div class="p-top"><button class="nav" id="lab-back">← All '+t.name.toLowerCase()+'</button>'+
      '<span class="pos">'+(this.idx+1)+' / '+t.designs.length+'</span>'+
      '<button class="nav" id="lab-prev" title="Previous ( [ )">‹</button><button class="nav" id="lab-next" title="Next ( ] )">›</button></div>'+
      '<h2>'+d.name+'</h2><p class="blurb">'+d.blurb+'</p>'+stats+
      '<div class="sec-l">Your verdict</div><div class="verdicts">'+
      ['pick','maybe','no'].map(function(v){return '<button class="vbtn" data-v="'+v+'" aria-pressed="'+(p.verdict===v)+'">'+({pick:'Pick',maybe:'Maybe',no:'No'})[v]+'</button>';}).join('')+'</div>'+
      regionsUI+
      '<div class="sec-l">Notes for Claude</div><textarea id="lab-notes" placeholder="What you like, what to change, mix-and-match ideas…">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea>'+
      '<div class="keys"><b>WASD</b> walk · <b>Shift</b> run · <b>Tab</b> inspect · <b>M</b> overview'+(t.id==='dungeons'?' · <b>L</b> lights on/off':'')+(t.id==='world'?' · <b>N</b> night':'')+' · <b>[ ]</b> prev/next · <b>Esc</b> back</div>';
  },
  bind:function(){
    var self=this;
    document.addEventListener('click',function(e){
      var tb=e.target.closest('.lab-tab'); if(tb){ self.tab=tb.dataset.tab; self.idx=0; if(document.body.classList.contains('walking'))self.close(); self.renderGrid(); return; }
      var op=e.target.closest('[data-open]'); if(op){ self.open(+op.dataset.open); return; }
      if(e.target.id==='lab-back'){ self.close(); return; }
      if(e.target.id==='lab-prev'){ self.open(self.idx-1,-1); return; }
      if(e.target.id==='lab-next'){ self.open(self.idx+1,1); return; }
      var gb=e.target.closest('.lab-grp'); if(gb){ self.groups[self.tab]=+gb.dataset.grp; self.renderGrid(); return; }
      var vb=e.target.closest('.vbtn'); if(vb&&!vb.classList.contains('sp-v')&&self.currentKey()){ var k=self.currentKey(); var p=self.picks[k]=self.picks[k]||{}; p.verdict=p.verdict===vb.dataset.v?null:vb.dataset.v; self.renderPanel(); self.persist(k); self.renderTabs(); return; }
      var rb=e.target.closest('.reg'); if(rb){ var k2=self.currentKey(); var p2=self.picks[k2]=self.picks[k2]||{}; p2.regions=p2.regions||[]; var r=+rb.dataset.reg, i=p2.regions.indexOf(r); if(i>=0)p2.regions.splice(i,1); else p2.regions.push(r); self.renderPanel(); self.persist(k2); return; }
    });
    // Phaser prevents default on canvas mousedown, which would leave the notes box
    // focused (WASD would type into it). Clicking the map hands focus to the game.
    document.addEventListener('pointerdown',function(e){
      if(!e.target.closest('#lab-stage'))return;
      var a=document.activeElement; if(a&&a.blur&&(a.tagName==='TEXTAREA'||a.tagName==='INPUT'))a.blur();
      var cv=document.querySelector('#lab-stage canvas'); if(cv)cv.focus();
    },true);
    document.addEventListener('input',function(e){
      if(e.target.id==='lab-notes'){ var k=self.currentKey(); var p=self.picks[k]=self.picks[k]||{}; p.notes=e.target.value; self.saveState('Typing…'); self.persist(k,900); }
    });
    document.addEventListener('keydown',function(e){
      if(!document.body.classList.contains('walking')||self.typing())return;
      if(e.key==='Escape'){ self.close(); }
      else if(e.key===']'){ self.open(self.idx+1,1); }
      else if(e.key==='['){ self.open(self.idx-1,-1); }
      else if(e.key==='Tab'){ e.preventDefault(); }
    });
  }
};

// The lab restarts its walk scene often; texture registration must happen only
// once per game (addBase64 is async, so an "exists" check alone races).
var _labHeroTexRequested=false;
function _heroRegisterTextures(scene){
  if(_labHeroTexRequested)return; _labHeroTexRequested=true;
  var sets=[['hero_front_',HERO_WALK_FRAMES_FRONT],['hero_side_',HERO_WALK_FRAMES_SIDE],['hero_back_',HERO_WALK_FRAMES_BACK],
    ['hero_attack_',HERO_ATTACK_FRAMES],['hero_bow_',HERO_BOW_FRAMES],['hero_horse_front_',HERO_HORSE_FRONT],['hero_horse_side_',HERO_HORSE_SIDE],['hero_horse_back_',HERO_HORSE_BACK]];
  sets.forEach(function(s){ s[1].forEach(function(uri,i){ if(!scene.textures.exists(s[0]+i))scene.textures.addBase64(s[0]+i,uri); }); });
}
