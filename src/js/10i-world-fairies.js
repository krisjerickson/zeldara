// ═══════════════════════════════════════════════════════════════════════
// ║ FAIRIES, DIGGING, FAMILIAR QUESTS + TRIALS, FAIRY KINGS (Phase 4c)
// ║ • 5 fairies per quadrant flit around its 4 waystones + one rune circle.
// ║   Before you own that quadrant's familiar they just chat (and hint at
// ║   the island). Afterwards fairy n teaches skill n+1: find the object she
// ║   asks for (dig with G at another rune space — the Tome quest page, the
// ║   map ring and sparkles show where), bring it back, and your familiar
// ║   passes her trial → it learns the skill.
// ║ • Fairy Kings (Wetlands, Highlands, Ashlands) hold court in huge rune
// ║   henges: three objects + the hardest trial → one more active familiar.
// ═══════════════════════════════════════════════════════════════════════
// FAIRY_NAMES lives in 07y-trial-arenas.js (shared with the Lab)
var FAIRY_EXTRA_ZONE={1:'fairy_rings',2:'rune_stepping',3:'runic_mesas',4:'magma_channels'};
var FAIRY_KING_ZONE={2:'sunken_spires',3:'windharp_ridges',4:'chained_rocks'};
var FAIRY_KING_NAMES={2:'Oberyn, King of the Mere',3:'Cairnwyn, King of the Peaks',4:'Pyrrhus, King of the Embers'};
// objects: [id, name, icon, dig zone, where-words]
var FAIRY_OBJECTS={
  1:[['silver_acorn','Silver Acorn','🌰','windmill_hills','under the old windmill hill'],['dew_pearl','Dewdrop Pearl','🫧','blossom_terraces','between the blossom terraces'],['bell_flower','Singing Bluebell','🔔','standing_stones','inside the ring of standing stones'],['sun_shard','Sunstone Shard','🌞','crystal_grass','among the crystal-tipped grass'],['sky_feather','Sky-roc Feather','🪶','floating_rocks','beneath the floating rocks']],
  2:[['moon_lily','Moonlily Bulb','🪷','glowfrog_pools','by the glow-frog pools'],['tide_shell','Tide-song Shell','🐚','turtle_isles','on the turtle-shell isles'],['willow_ring','Willow Ring','💍','willow_cathedral','under the willow cathedral'],['drowned_bell','Drowned Bell','🔔','drowned_village','in the drowned village'],['stilt_lantern','Marsh Lantern','🏮','stilt_walkways','below the stilt walkways']],
  3:[['geode_heart','Geode Heart','💜','geode_canyons','deep in the geode canyons'],['golem_eye','Golem Eye','👁️','golem_graveyard','in the golem graveyard'],['stone_bishop','Stone Bishop','♝','giants_chessboard','on the giant\'s chessboard'],['herder_horn','Herder\'s Horn','📯','herder_terraces','on the herder terraces'],['star_iron','Star-iron','☄️','starfall_crater','in the starfall crater']],
  4:[['ember_seed','Ember Seed','🌱','emberflower_fields','in the ember-flower fields'],['obsidian_key','Obsidian Key','🗝️','obsidian_glass','out on the obsidian glass'],['ash_bloom','Ash-snow Bloom','❄️','ashsnow_forest','in the ash-snow forest'],['basalt_rune','Basalt Rune','🪨','basalt_forest','among the basalt columns'],['dragon_tooth','Dragon Tooth','🦷','dragon_valley','in the dragon skeleton valley']]
};
var FAIRY_KING_OBJECTS={
  2:[['crown_pearl','Crown Pearl','⚪','lantern_lilies','among the lantern lilies'],['mere_harp','Mere Harp','🪕','glow_mangroves','under the glowing mangroves'],['wisp_jar','Jar of Wisps','🫙','wisp_cattails','in the wisp cattail maze']],
  3:[['frost_crown','Frost Circlet','👑','glacier_peaks','up on the glacier peaks'],['dwarf_anvil','Dwarf Anvil-charm','⚒️','dwarven_stairs','by the dwarven stairs'],['petrified_heart','Petrified Heart','🪵','petrified_forest','in the petrified forest']],
  4:[['forge_ember','Undying Ember','🔥','forge_ruins','in the forge-city ruins'],['sulfur_crystal','Sulfur Crystal','💛','sulfur_geysers','among the sulfur geysers'],['cathedral_bell','Cathedral Bell','🛎️','burned_cathedral','in the burned cathedral']]
};
var FAIRY_CHAT=['Oh! A big one! Hello, big one.','Do you have a fairy companion? No? The spirits of the islands pick brave friends, you know.','The runestones hum at night. We dance when they hum.','I once rode a dragonfly all the way to the lake. Once.','Mind the monsters near the camps — they get grumpy.'];
function _fairyZoneName(zid){ return _wmZoneName(zid); }
function _fairyObj(q,i){ var a=FAIRY_OBJECTS[q][i]; return {id:a[0],name:a[1],icon:a[2],zone:a[3],where:a[4]}; }
function _kingObj(q,i){ var a=FAIRY_KING_OBJECTS[q][i]; return {id:a[0],name:a[1],icon:a[2],zone:a[3],where:a[4]}; }
function _dirWord(dx,dy){ var a=Math.atan2(dy,dx)*180/Math.PI, d=['east','south-east','south','south-west','west','north-west','north','north-east']; return d[((Math.round(a/45)%8)+8)%8]; }

// ── fairy + henge textures ──
function _sheetTex(scene,key,fr){ if(scene.textures.exists(key))return key; var w=fr[0].width, h=fr[0].height, cv=mkCanvas(w*4,h), x=cv.getContext('2d'); fr.forEach(function(f,i){ x.drawImage(f,i*w,0); }); var t=scene.textures.addCanvas(key,cv); for(var i=0;i<4;i++)t.add(String(i),0,i*w,0,w,h); return key; }
function _fairyTex(scene,F){ return _sheetTex(scene,'fairy_'+F.id,fairyFrames(F)); }
function _kingTex(scene,q){ var M=_monarchOf(q); return _sheetTex(scene,'fairymonarch_'+M.id,monarchFrames(M)); }
function _kingName(q){ var M=_monarchOf(q); return M.name+', '+M.title; }
function _hengeStoneTex(scene,q,kind){ var key='henge_'+q+'_'+kind; if(scene.textures.exists(key))return key; var pal={2:['#8a9a94','#5a6a66','#7fe0c8'],3:['#a8a098','#6a645c','#bfe8ff'],4:['#4a4048','#2a2228','#ff8040']}[q], w=kind==='tri'?78:30, h=kind==='tri'?96:70, cv=mkCanvas(w,h), x=cv.getContext('2d');
  softShadow(x,w/2,h-4,w/2,6,0.45);
  var col=function(px,py,pw,ph){ var g=x.createLinearGradient(px,0,px+pw,0); g.addColorStop(0,shade(pal[0],0.12)); g.addColorStop(0.6,pal[0]); g.addColorStop(1,pal[1]); x.fillStyle=g; x.fillRect(px,py,pw,ph); x.fillStyle='rgba(0,0,0,.15)'; x.fillRect(px+pw-3,py,3,ph); x.fillStyle=rgba('#ffffff',0.12); x.fillRect(px,py,pw,3); };
  if(kind==='tri'){ col(6,20,20,h-24); col(w-26,20,20,h-24); col(2,8,w-4,16); x.fillStyle=pal[2]; x.globalAlpha=0.85; ['ᚱ','ᚢ','ᚾ','ᛖ'].forEach(function(r,i){ x.font='bold 10px serif'; x.fillText(r,11+(i%2)*(w-30),40+Math.floor(i/2)*22); }); x.globalAlpha=1; }
  else { col(4,6,w-8,h-10); x.fillStyle=pal[2]; x.globalAlpha=0.8; x.font='bold 11px serif'; x.fillText('ᛟ',w/2-4,h/2); x.globalAlpha=1; }
  scene.textures.addCanvas(key,cv); return key; }
function _hengeAltarTex(scene,q){ var key='henge_altar_'+q; if(scene.textures.exists(key))return key; var glow={2:'#7fe0c8',3:'#bfe8ff',4:'#ff8040'}[q], cv=mkCanvas(96,56), x=cv.getContext('2d'); softShadow(x,48,48,44,8,0.4);
  x.fillStyle='#6a6660'; x.beginPath(); x.ellipse(48,40,42,12,0,0,Math.PI*2); x.fill(); x.fillStyle='#8a8680'; x.beginPath(); x.ellipse(48,34,38,10,0,0,Math.PI*2); x.fill();
  x.strokeStyle=glow; x.lineWidth=2; x.shadowColor=glow; x.shadowBlur=8; x.beginPath(); x.ellipse(48,34,30,7,0,0,Math.PI*2); x.stroke(); for(var i=0;i<8;i++){ var a=i/8*Math.PI*2; x.fillStyle=glow; x.fillRect(48+Math.cos(a)*24-1,34+Math.sin(a)*5-1,3,3); }
  scene.textures.addCanvas(key,cv); return key; }

Object.assign(WorldScene.prototype,{
  // find a walkable tile near (tx,ty)
  _fairySpot(tx,ty,minR){ minR=minR||0; for(var r=minR;r<40;r++)for(var a=0;a<Math.max(8,r*6);a++){ var an=a/Math.max(8,r*6)*Math.PI*2, x=Math.round(tx+Math.cos(an)*r), y=Math.round(ty+Math.sin(an)*r); if(y<2||x<2||y>=WORLD_H-2||x>=WORLD_W-2)continue; var t=this.tiles[y][x]; if(canPassTile(t)&&!(FOOT_SLOW&&FOOT_SLOW[t]))return {x:x,y:y}; } return {x:tx,y:ty}; },
  _runeSpot(zid){ var s=(this.wd.runeSpots||[]).find(function(p){ return p.zone===zid; }); if(s)return {x:s.x,y:s.y}; var z=WMAP_ZONES.find(function(z){ return z.id===zid; }); return z?this._fairySpot(z.x,z.y):null; },
  _initFairies(){ var self=this, wd=this.wd; this._fairies=[]; this._kings=[]; this._digSpots={};
    [1,2,3,4].forEach(function(q){
      var homes=wd.waystones.filter(function(w){ return w.region===q; }).map(function(w){ return {x:w.x,y:w.y,name:w.name.replace(/^Waystone (.+) Waystone$/,'$1 Waystone'),zone:w.zone,ws:true}; });
      var ex=self._runeSpot(FAIRY_EXTRA_ZONE[q]); if(ex)homes.push({x:ex.x,y:ex.y,name:'the rune circle of '+_fairyZoneName(FAIRY_EXTRA_ZONE[q]),zone:FAIRY_EXTRA_ZONE[q]});
      homes.slice(0,5).forEach(function(h,i){ var p=self._fairySpot(h.x+(i%2?3:-3),h.y+2,0);
        self._fairies.push({q:q,i:i,id:'f'+q+'_'+i,name:FAIRY_NAMES[q][i],F:_fairyLook(q,i),x:p.x*TILE+16,y:p.y*TILE+16,home:h,t:Math.random()*6,spr:null}); });
      // dig spots for the fairies' objects: beside the rune space of their zones
      FAIRY_OBJECTS[q].forEach(function(a,i){ var o=_fairyObj(q,i), r=self._runeSpot(o.zone); if(!r)return; var p=self._fairySpot(r.x+4,r.y+3,1); self._digSpots[o.id]={x:p.x,y:p.y,obj:o,q:q,zone:o.zone}; });
      if(FAIRY_KING_OBJECTS[q])FAIRY_KING_OBJECTS[q].forEach(function(a,i){ var o=_kingObj(q,i), r=self._runeSpot(o.zone); if(!r)return; var p=self._fairySpot(r.x-4,r.y+4,1); self._digSpots[o.id]={x:p.x,y:p.y,obj:o,q:q,zone:o.zone,king:true}; });
      if(FAIRY_KING_ZONE[q]){ var r=self._runeSpot(FAIRY_KING_ZONE[q]), c=self._hengeSpot(r.x,r.y+26); self._kings.push({q:q,id:'k'+q,name:_kingName(q),x:c.x*TILE+16,y:c.y*TILE+16,tx:c.x,ty:c.y,t:0}); }
    });
    this._fairyVisT=0; },
  // a 15×15 open patch for the henge (search outward)
  _hengeSpot(tx,ty){ for(var r=0;r<40;r+=2)for(var a=0;a<16;a++){ var x=Math.round(tx+Math.cos(a/16*Math.PI*2)*r), y=Math.round(ty+Math.sin(a/16*Math.PI*2)*r), ok=true;
      for(var dy=-7;dy<=7&&ok;dy+=2)for(var dx=-7;dx<=7;dx+=2){ var t=(this.tiles[y+dy]||[])[x+dx]; if(t===undefined||!canPassTile(t)){ ok=false; break; } } if(ok)return {x:x,y:y}; } return this._fairySpot(tx,ty); },
  _hengeBuild(K){ if(K.built)return; K.built=true; var self=this, n=10, R=6.2*TILE;
    for(var i=0;i<n;i++){ var a=i/n*Math.PI*2-Math.PI/2, x=K.x+Math.cos(a)*R, y=K.y+Math.sin(a)*R*0.8, kind=i%2?'post':'tri'; this.add.image(x,y,_hengeStoneTex(this,K.q,kind)).setOrigin(0.5,1).setDepth(WR_DEPTH(y)); }
    for(var j=0;j<5;j++){ var a2=j/5*Math.PI*2+0.3, x2=K.x+Math.cos(a2)*R*0.55, y2=K.y+Math.sin(a2)*R*0.45; this.add.image(x2,y2,_hengeStoneTex(this,K.q,'post')).setOrigin(0.5,1).setScale(0.8).setDepth(WR_DEPTH(y2)); }
    this.add.image(K.x,K.y+20,_hengeAltarTex(this,K.q)).setOrigin(0.5,1).setDepth(WR_DEPTH(K.y-10));
    CHX.glow(this); K.glow=this.add.image(K.x,K.y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum({2:'#7fe0c8',3:'#bfe8ff',4:'#ff8040'}[K.q])).setAlpha(0.35).setScale(3.2).setDepth(WR_DEPTH(K.y)+0.001);
    this.tweens.add({targets:K.glow,alpha:0.18,duration:2200,yoyo:true,repeat:-1});
    K.spr=this.add.image(K.x,K.y-26,_kingTex(this,K.q),'0').setOrigin(0.5,1).setScale(1.25).setDepth(WR_DEPTH(K.y)+0.002);
    K.lbl=domText(this,K.x,K.y-120,'👑 '+K.name,{fontSize:'10px',color:'#fff0a0',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(20); },
  // per-frame: show fairies/kings near the player, animate, sparkles at active dig spots
  _fairyTick(dt){ if(!this._fairies||!this.player)return; var self=this, px=this.player.x, py=this.player.y, ps=this.playerState;
    this._fairies.forEach(function(f){ var near=Math.hypot(px-f.x,py-f.y)<1100;
      if(near&&!f.spr){ f.spr=self.add.image(f.x,f.y,_fairyTex(self,f.F),'0').setScale(1.15); CHX.glow(self); f.glow=self.add.image(f.x,f.y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(f.F.col)).setAlpha(0.4).setScale(0.6);
        f.lbl=domText(self,f.x,f.y-30,'✨ '+f.name,{fontSize:'9px',color:'#ffe8ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(20); }
      if(!near&&f.spr){ f.spr.destroy(); f.glow.destroy(); f.lbl.destroy(); f.spr=null; }
      if(!f.spr)return; f.t+=dt; var hx=f.home.ws?f.home.x*TILE+16:f.x, hy=f.home.ws?f.home.y*TILE+16:f.y, fx=hx+Math.cos(f.t*0.9)*70+Math.sin(f.t*2.1)*6, fy=hy-18+Math.sin(f.t*1.3)*16;
      f.cx=fx; f.cy=fy; f.spr.setPosition(fx,fy).setFrame(String(Math.floor(f.t*10)%4)).setFlipX(Math.cos(f.t*0.9+Math.PI/2)<0).setDepth(WR_DEPTH(fy+30)); f.glow.setPosition(fx,fy).setDepth(WR_DEPTH(fy+30)-0.00001); f.lbl.setPosition(fx,fy-24);
      var st=self._fairyState(f); f.lbl.setText((st.mark?st.mark+' ':'✨ ')+f.name); });
    (this._kings||[]).forEach(function(K){ var near=Math.hypot(px-K.x,py-K.y)<1400; if(near)self._hengeBuild(K); if(!K.spr)return; K.t+=dt; K.spr.setFrame(String(Math.floor(K.t*8)%4)).setY(K.y-26+Math.sin(K.t*1.6)*5); });
    // sparkles where an active quest's object is buried
    this._fairyVisT-=dt; if(this._fairyVisT<=0){ this._fairyVisT=0.35; var act=this._activeDigs();
      act.forEach(function(D){ var sx=D.x*TILE+16, sy=D.y*TILE+16, d=Math.hypot(px-sx,py-sy); if(d<TILE*12){ var n=d<TILE*3?4:2; for(var i=0;i<n;i++){ var s=self.add.circle(sx+(Math.random()-0.5)*26,sy+(Math.random()-0.5)*18,d<TILE*3?2.4:1.6,0xfff0a0,1).setDepth(WR_DEPTH(sy)+0.01); self.tweens.add({targets:s,y:s.y-18,alpha:0,duration:900,onComplete:function(){ s.destroy(); }}); } } }); }
    // dig prompt
    var nd=this._activeDigs().find(function(D){ return Math.hypot(px-(D.x*TILE+16),py-(D.y*TILE+16))<TILE*2.2; });
    if(nd&&!this._digPrompt){ this._digPrompt=domText(this,px,py-50,'[G] Dig here',{fontSize:'10px',color:'#fff0a0',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(20); }
    if(this._digPrompt){ if(!nd){ this._digPrompt.destroy(); this._digPrompt=null; } else this._digPrompt.setPosition(px,py-50); }
  },
  _activeDigs(){ var ps=this.playerState, Q=ps.fairyQuests||{}, out=[], self=this; Object.keys(Q).forEach(function(k){ var S=Q[k]; if(!S||S.st!=='seek')return; (S.need||[]).forEach(function(oid){ if((S.got||[]).indexOf(oid)<0&&self._digSpots[oid])out.push(self._digSpots[oid]); }); }); return out; },
  // where this fairy's story stands
  _fairyState(f){ var ps=this.playerState, fid=FAM_BY_SEC[f.q], own=(ps.ownedFamiliars||[]).indexOf(fid)>=0, L=own?_famLevel(ps,fid):0, qk='q'+f.q+'_f'+f.i, S=(ps.fairyQuests||{})[qk];
    if(!own)return {k:'chat'}; if(L>f.i+1)return {k:'done'}; if(L<f.i+1)return {k:'wait'};
    if(!S)return {k:'offer',mark:'❗'}; if(S.st==='seek'){ var ok=(S.got||[]).length>=S.need.length; return {k:ok?'ready':'seek',mark:ok?'⭐':'❔',S:S}; } return {k:'offer',mark:'❗'}; },
  _checkFairy(){ if(!this._fairies)return false; var px=this.player.x, py=this.player.y, f=null, bd=TILE*1.9;
    this._fairies.forEach(function(x){ if(!x.spr)return; var d=Math.hypot(px-x.cx,py-(x.cy+18)); if(d<bd){bd=d;f=x;} });
    var K=null; (this._kings||[]).forEach(function(k){ if(k.spr&&Math.hypot(px-k.x,py-k.y)<TILE*3)K=k; });
    // the waystone wins when you are closer to it than to the fairy (so [Tab] still activates / travels)
    if(f&&this._nearWaystone){ var w=this._nearWaystone(); if(w&&Math.hypot(px-(w.x*TILE+16),py-(w.y*TILE+16))<bd)f=null; }
    var tgt=f||K; if(!tgt){ if(this._interactPrompt&&this._interactPrompt._fairy){ this._interactPrompt.destroy(); this._interactPrompt=null; } return false; }
    var id=tgt.id; if(!this._interactPrompt||this._interactPrompt._fairy!==id){ if(this._interactPrompt)this._interactPrompt.destroy(); this._interactPrompt=domText(this,tgt.x,tgt.y-(K&&!f?130:52),'[Tab] Talk to '+(f?f.name:K.name),{fontSize:'10px',color:'#ffe8ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20); this._interactPrompt._fairy=id; }
    if(Phaser.Input.Keyboard.JustDown(this.keys.TAB)){ if(f)this._talkFairy(f); else this._talkKing(K); }
    return true; },
  _talkFairy(f){ var self=this, ps=this.playerState, st=this._fairyState(f), fid=FAM_BY_SEC[f.q], fam=FAMILIARS[fid], o=_fairyObj(f.q,f.i), qk='q'+f.q+'_f'+f.i, isl=(HARBOR_ISLANDS[f.q]||{}).name||'the island';
    if(st.k==='chat'){ var line=f.i===0?'Do you have a fairy companion? No? Every quadrant has a spirit sleeping on its familiar island — here that\'s '+isl+', from the first harbor. Win it, then come back: we fairies can teach it things!':FAIRY_CHAT[(f.i+Math.floor(Date.now()/9000))%FAIRY_CHAT.length];
      return FairyTalk.show(f,line,[{t:'Bye!'}]); }
    if(st.k==='done')return FairyTalk.show(f,'Your '+fam.n+' is shining brighter every day. I taught it '+FAM_SKILLS[fam.el][f.i+1].name+' — use it well!',[{t:'Thank you!'}]);
    if(st.k==='wait'){ var prev=this._fairies.find(function(x){ return x.q===f.q&&x.i===_famLevel(ps,fid)-1; }); return FairyTalk.show(f,'Ooh, a '+fam.n+'! It isn\'t ready for my lesson yet. First visit '+(prev?prev.name+' near '+prev.home.name:'my sisters')+' — she teaches the lesson before mine.',[{t:'I\'ll go'}]); }
    var skill=FAM_SKILLS[fam.el][f.i+1], tp=_trialPlanOf(f.q,f.i), tr={name:tp.name+' ('+TRIAL_THEMES[tp.theme].name+')',text:TRIAL_THEMES[tp.theme].text};
    if(st.k==='offer')return FairyTalk.show(f,'What a lovely '+fam.n+'! I could teach it <b>'+skill.name+'</b> — '+skill.text.toLowerCase()+' But first, fetch me the <b>'+o.icon+' '+o.name+'</b>. It\'s buried '+o.where+' in <b>'+_fairyZoneName(o.zone)+'</b>, beside the runes at its heart.'+(ps.hasTrowel?'':' Here — take this <b>Fairy Trowel</b>. Press <b>G</b> to dig.'),[{t:'I\'ll find it!',f:function(){ self._fairyAccept(qk,[o.id],f.q,'Fairy '+f.name); }},{t:'Later'}]);
    if(st.k==='seek')return FairyTalk.show(f,'The '+o.icon+' '+o.name+' is buried '+o.where+' in '+_fairyZoneName(o.zone)+'. '+this._digHint(o.id)+' Look for golden sparkles, then press <b>G</b> to dig. (Your Tome\'s Quests page and the map show the area too.)',[{t:'On my way'}]);
    if(st.k==='ready')return FairyTalk.show(f,'You found it! '+o.icon+' Now your '+fam.n+' must show me what it can do. <b>Trial: '+tr.name+'</b> — '+tr.text,[{t:'Step through the portal',f:function(){ TrialRealm.enter(self,{key:qk,q:f.q,i:f.i,fid:fid,stages:[tp.theme],tier:tp.tier,title:tp.name,host:f.name,win:function(){ self._fairyWin(f,qk,fid,skill); }}); }},{t:'Not yet'}]); },
  _talkKing(K){ var self=this, ps=this.playerState, fid=FAM_BY_SEC[K.q], fam=FAMILIARS[fid], own=(ps.ownedFamiliars||[]).indexOf(fid)>=0, qk='king'+K.q, S=(ps.fairyQuests||{})[qk], done=(ps.fairyKings||[]).indexOf(K.id)>=0, need=FAIRY_KING_OBJECTS[K.q].map(function(a){ return a[0]; });
    var Kf={name:K.name,F:{col:_monarchOf(K.q).glow},king:K.q};
    if(done)return FairyTalk.show(Kf,'Go well, champion. Your familiars fly together now — '+_maxFamiliarSlots(ps)+' at once.',[{t:'Farewell'}]);
    if(!own||_famLevel(ps,fid)<3)return FairyTalk.show(Kf,'I am '+K.name+'. Only a hero whose '+TOME_QN[K.q]+' spirit has learned at least two fairy lessons may take my trial. '+(own?'Your '+fam.n+' knows '+(_famLevel(ps,fid)-1)+'.':'You have no '+TOME_QN[K.q]+' spirit yet — its island waits beyond the first harbor.'),[{t:'I understand'}]);
    if(!S||S.st!=='seek')return FairyTalk.show(Kf,'Bring me three treasures of this land: '+FAIRY_KING_OBJECTS[K.q].map(function(a){ return a[2]+' <b>'+a[1]+'</b> ('+a[4]+' in '+_fairyZoneName(a[3])+')'; }).join(', ')+'. Then you and your spirit will face my trial. Win, and one more familiar may fly at your side.',[{t:'I accept',f:function(){ self._fairyAccept(qk,need,K.q,K.name,true); }},{t:'Later'}]);
    if((S.got||[]).length<need.length)return FairyTalk.show(Kf,'You have '+(S.got||[]).length+' of 3. Still missing: '+need.filter(function(id){ return S.got.indexOf(id)<0; }).map(function(id){ var D=self._digSpots[id]; return D.obj.icon+' '+D.obj.name+' — '+D.obj.where+' in '+_fairyZoneName(D.zone); }).join('; ')+'.',[{t:'Onward'}]);
    var MS=MONARCH_TRIAL_PLAN[K.q]||['guardian','shadow_duel'];
    return FairyTalk.show(Kf,'All three! Now you and your spirit enter my realm for '+MS.length+' trials in a row: '+MS.map(function(t){ return '<b>'+TRIAL_THEMES[t].name+'</b>'; }).join(' → ')+'. Fall at any one and we begin again.',[{t:'Enter the Monarch\'s realm',f:function(){ TrialRealm.enter(self,{key:qk,q:K.q,i:9,fid:fid,stages:MS,tier:K.q+1,title:'Trial of '+_monarchOf(K.q).name,host:_monarchOf(K.q).name,win:function(){ self._kingWin(K,qk); }}); }},{t:'Not yet'}]); },
  _fairyAccept(qk,need,q,who,king){ var ps=this.playerState; if(!ps.fairyQuests)ps.fairyQuests={}; ps.fairyQuests[qk]={st:'seek',need:need,got:[],q:q,who:who,king:!!king,t:Date.now()};
    if(!ps.hasTrowel){ ps.hasTrowel=true; showNotif('🪏 Fairy Trowel — press G to dig','#fff0a0'); }
    showNotif('📜 Quest added to your Tome: '+need.map(function(id){ var D=this._digSpots[id]; return D?D.obj.icon+' '+D.obj.name:id; },this).join(', '),'#ffe8ff'); if(typeof Tome!=='undefined')Tome.see('quest',qk); this._save&&this._save(); },
  _digHint(oid){ var D=this._digSpots[oid]; if(!D)return ''; var ws=this.wd.waystones.filter(function(w){ return w.region===D.q; }), best=null, bd=1e9; ws.forEach(function(w){ var d=Math.hypot(w.x-D.x,w.y-D.y); if(d<bd){bd=d;best=w;} });
    return best?'From the '+best.name+', head '+_dirWord(D.x-best.x,D.y-best.y)+' about '+Math.round(bd)+' steps.':''; },
  _dig(){ var ps=this.playerState, px=this.player.x, py=this.player.y, self=this; if(!ps.hasTrowel){ showNotif('You need a Fairy Trowel to dig — ask a fairy by the runestones.','#c8b8a0'); return; }
    if(this._digCd>Date.now())return; this._digCd=Date.now()+600;
    for(var i=0;i<10;i++){ var d=this.add.circle(px+(Math.random()-0.5)*10,py+10,2+Math.random()*2,0x7a5a3a,1).setDepth(WR_DEPTH(py)+0.01); this.tweens.add({targets:d,x:d.x+(Math.random()-0.5)*40,y:d.y-10-Math.random()*16,alpha:0,duration:500,onComplete:function(){ this.targets[0].destroy(); }}); }
    var hole=this.add.ellipse(px,py+12,18,7,0x3a2a1a,0.8).setDepth(WR_DEPTH(py)-0.001); this.tweens.add({targets:hole,alpha:0,delay:4000,duration:1500,onComplete:function(){ hole.destroy(); }});
    var D=this._activeDigs().find(function(D){ return Math.hypot(px-(D.x*TILE+16),py-(D.y*TILE+16))<TILE*1.8; });
    if(!D){ var near=this._activeDigs().find(function(D){ return Math.hypot(px-(D.x*TILE+16),py-(D.y*TILE+16))<TILE*12; }); showNotif(near?'Only dirt… the sparkles are close — keep looking!':'Only dirt here.','#c8b8a0'); return; }
    var Q=ps.fairyQuests, qk=Object.keys(Q).find(function(k){ return Q[k].st==='seek'&&Q[k].need.indexOf(D.obj.id)>=0; }); if(!qk)return; Q[qk].got.push(D.obj.id);
    campCelebrate(this,px,py,D.obj.icon+' '+D.obj.name+' found!',Q[qk].got.length>=Q[qk].need.length?'Bring it to '+Q[qk].who:(Q[qk].need.length-Q[qk].got.length)+' more to find');
    if(typeof Tome!=='undefined')Tome.see('quest',qk); this._save&&this._save(); },
  _fairyWin(f,qk,fid,skill){ var ps=this.playerState; ps.famLevels=ps.famLevels||{}; ps.famLevels[fid]=_famLevel(ps,fid)+1; ps.fairyQuests[qk].st='done';
    campCelebrate(this,this.player.x,this.player.y,FAMILIARS[fid].n+' learned '+skill.name+'!','Level '+ps.famLevels[fid]+' / 6'); if(typeof Tome!=='undefined')Tome.see('quest',qk); this._emitUI(); this._save&&this._save(); },
  _kingWin(K,qk){ var ps=this.playerState; if(!ps.fairyKings)ps.fairyKings=[]; if(ps.fairyKings.indexOf(K.id)<0)ps.fairyKings.push(K.id); ps.fairyQuests[qk].st='done';
    campCelebrate(this,this.player.x,this.player.y,'The Monarch\'s blessing!','Up to '+_maxFamiliarSlots(ps)+' familiars can be active — press N'); if(typeof Tome!=='undefined')Tome.see('quest',qk); this._emitUI(); this._save&&this._save(); }
});

// ── dialogue box ──
var FairyTalk={ show:function(f,html,btns){ var el=document.getElementById('fairy-talk'); if(!el){ el=document.createElement('div'); el.id='fairy-talk'; el.className='overlay'; el.style.display='none'; el.onclick=function(e){ if(e.target===el)FairyTalk.close(); }; document.body.appendChild(el); }
    var col=f.F?f.F.col:'#ffe0ff';
    el.innerHTML='<div class="modal fairy-modal" onclick="event.stopPropagation()" style="border-color:'+col+'"><div class="ft-row"><canvas id="ft-cv" width="96" height="96"></canvas><div><div class="ft-name" style="color:'+col+'">'+(f.king?'👑 ':'✨ ')+f.name+'</div><div class="ft-text">'+html+'</div></div></div><div class="ft-btns">'+btns.map(function(b,i){ return '<button data-i="'+i+'">'+b.t+'</button>'; }).join('')+'</div></div>';
    el.style.display='flex'; el.querySelectorAll('.ft-btns button').forEach(function(b){ b.onclick=function(){ var B=btns[+b.dataset.i]; FairyTalk.close(); if(B.f)setTimeout(B.f,30); }; });
    var cv=document.getElementById('ft-cv'), x=cv.getContext('2d'), fr=f.king?fairyKingFrames(f.king):fairyFrames(f.F), i=0; clearInterval(FairyTalk._t); FairyTalk._t=setInterval(function(){ if(!cv.isConnected){ clearInterval(FairyTalk._t); return; } x.clearRect(0,0,96,96); x.imageSmoothingEnabled=true; if(f.king)x.drawImage(fr[i++%4],5,0,86,96); else x.drawImage(fr[i++%4],0,0,96,96); },120); },
  close:function(){ var el=document.getElementById('fairy-talk'); if(el)el.style.display='none'; } };

// ── trials: see 12b-trial-realm.js (every trial runs in its own temporary arena) ──

// ── world-map marks: fairies (explored), kings, and the area of each active dig ──
function _wmFairyMarks(ctx,wd,ps,X,Y,inV,big,lbl){ var ws=game.scene.getScene('World'); if(!ws||!ws._fairies)return;
  ws._fairies.forEach(function(f){ var tx=f.x/TILE, ty=f.y/TILE; if(!inV(tx,ty)||!_wmExplored(ps,tx,ty))return; ctx.fillStyle=f.F.col; ctx.beginPath(); ctx.arc(X(tx),Y(ty),big?4:3,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='#2a1030'; ctx.lineWidth=1; ctx.stroke(); var st=ws._fairyState(f); if(big&&st.mark){ ctx.font='11px serif'; ctx.fillText(st.mark,X(tx)+8,Y(ty)-6); } });
  (ws._kings||[]).forEach(function(K){ var tx=K.x/TILE, ty=K.y/TILE; if(!inV(tx,ty)||!_wmExplored(ps,tx,ty))return; ctx.font=(big?14:10)+'px serif'; ctx.fillText('👑',X(tx),Y(ty)); if(big)lbl('Fairy Monarch',X(tx),Y(ty)+14,'#fff0a0',10,700); });
  ws._activeDigs().forEach(function(D){ var ox=((D.obj.id.charCodeAt(0)*7)%9)-4, oy=((D.obj.id.charCodeAt(1)*5)%9)-4, cx=X(D.x+ox), cy=Y(D.y+oy), r=Math.max(8,Math.abs(X(D.x+10)-X(D.x)));
    ctx.save(); ctx.setLineDash([4,3]); ctx.strokeStyle='#fff0a0'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke(); ctx.restore(); ctx.font=(big?13:9)+'px serif'; ctx.fillText('🪏',cx,cy+4); if(big)lbl('Dig: '+D.obj.name,cx,cy+r+10,'#fff0a0',10,700); }); }
function sbFairyMax(){ var ws=_sbWs&&_sbWs(); if(!ws)return; var ps=ws.playerState; ps.ownedFamiliars=['fam_grass','fam_water','fam_earth','fam_fire']; ps.famLevels={fam_grass:6,fam_water:6,fam_earth:6,fam_fire:6}; ps.fairyKings=['k2','k3','k4']; ps.hasTrowel=true; ps.familiar='fam_grass'; ps.familiar2='fam_water'; ps.familiar3='fam_earth'; ps.familiar4='fam_fire'; ws._emitUI(); showNotif('All 4 spirit familiars at level 6, 4 active','#88eeff'); }
