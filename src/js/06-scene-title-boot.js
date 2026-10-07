// ─── TitleScene ─────────────────────────────────
class TitleScene extends Phaser.Scene{
  constructor(){super('Title')}
  // Round 13: the title wears the brand Kris picked — World Tree Veil home page, the World Tree logo and the
  // Ringed Z wordmark (07zz-brand*.js). The page is painted on a canvas texture a few times a second; the two
  // buttons are part of that painting, with invisible hit areas (and hidden labels) placed exactly over them.
  create(){
    var w=this.scale.width,h=this.scale.height;
    var self=this;
    // Hide action bars on the title — no game state to interact with yet.
    document.body.classList.add('bars-hidden'); document.body.classList.add('on-title');
    this.events.once('shutdown', function(){ document.body.classList.remove('bars-hidden'); document.body.classList.remove('on-title'); });
    // players + save slots live in 04d-profiles.js (ZSave / ZProfilesUI)
    var moved=ZSave.migrateLegacy(), start=function(isNew){ ZProfilesUI.close(); self.scene.start('Boot',{newGame:isNew}); };
    this.events.once('shutdown',function(){ ZProfilesUI.close(); });
    var has=ZSave.players().length>0, brand=(typeof ZBrand!=='undefined'&&ZBrand.HOME)?ZBrand.HOMES.find(function(x){ return x.id===ZBrand.HOME; }):null;
    this._opts={sym:brand?ZBrand.LOGO:null,word:brand?ZBrand.WORDMARK:null,btns:has?['NEW GAME','RETURNING PLAYER']:['NEW GAME']};
    this._brand=null; this._lt=-1e9;
    this.add.rectangle(w/2,h/2,w,h,0x000000);
    if(brand){ try{ if(this.textures.exists('title_bg'))this.textures.remove('title_bg'); this._tex=this.textures.createCanvas('title_bg',Math.max(2,Math.round(w)),Math.max(2,Math.round(h))); this.add.image(0,0,'title_bg').setOrigin(0); this._brand=brand; this._paint(0); }catch(e){ console.error('title brand',e); this._brand=null; } }
    var rects=this._brand?ZBrand.homeLayout(brand,w,h,this._opts):[{x:w/2-105,y:h*0.5-23,w:210,h:46},{x:w/2-105,y:h*0.5+47,w:210,h:46}];
    if(!this._brand)this.add.text(w/2,h*0.22,'QUESTS OF ZELDARA',{fontSize:'38px',color:'#63f2dc',fontFamily:'Segoe UI',fontStyle:'bold'}).setOrigin(.5);
    var newBtn=this._mkBtn(rects[0],'NEW GAME');
    newBtn.on('pointerup',function(){ ZProfilesUI.newGame(start); });
    var foot=h-14, note=function(t,col){ self.add.text(w/2,foot,t,{fontSize:'11px',color:col,fontFamily:'Segoe UI'}).setOrigin(.5,1); foot-=16; };
    if(has){
      var cBtn=this._mkBtn(rects[1],'RETURNING PLAYER');
      cBtn.on('pointerup',function(){ ZProfilesUI.returning(start); });
      var lp=ZSave.players()[0];
      if(moved)note('Your earlier save is now under “'+moved.name+'”, slot 1 (rename it there).','#7fb08a');
      note('Last played: '+lp.name+'  ·  '+ZSave.players().length+' player'+(ZSave.players().length===1?'':'s')+' on this device','#5f8ea0');
      // back from a graphics reset (20-game-config.js): continue the same player + slot straight away
      var rs=null; try{ rs=sessionStorage.getItem('qoz_resume'); sessionStorage.removeItem('qoz_resume'); }catch(e){}
      if(rs&&Date.now()-(+rs)<60000&&ZSave.current&&ZSave.read())this.time.delayedCall(60,function(){ self.scene.start('Boot',{newGame:false}); });
    }
    // the home page's buttons arrive here as /play?start=new or ?start=returning (also noted in sessionStorage, in case a redirect drops the query): open that dialog straight away
    try{ var q=new URLSearchParams(location.search).get('start'); if(!q){ q=sessionStorage.getItem('zeldara_start'); } sessionStorage.removeItem('zeldara_start'); if(q&&!window._zStartUsed){ window._zStartUsed=true; if(history.replaceState)history.replaceState(null,'',location.pathname); this.time.delayedCall(80,function(){ if(q==='returning'&&has)ZProfilesUI.returning(start); else if(q==='new'||q==='returning')ZProfilesUI.newGame(start); }); } }catch(e){}
    // a resized window repaints the title at the new size
    var onR=function(gs){ if(self._rz||(gs&&Math.abs(gs.width-w)<2&&Math.abs(gs.height-h)<2))return; self._rz=true; self.time.delayedCall(180,function(){ self._rz=false; var dlg=ZProfilesUI.el&&ZProfilesUI.el.style.display==='flex';   // not while a name is being typed
      if(self.scene.isActive('Title')&&!dlg&&(Math.abs(self.scale.width-w)>=2||Math.abs(self.scale.height-h)>=2))self.scene.restart(); }); };
    this.scale.on('resize',onR); this.events.once('shutdown',function(){ self.scale.off('resize',onR); });
  }
  _paint(t){ var T=this._tex; ZBrand.home(T.getContext(),this._brand,T.width,T.height,t,this._opts); T.refresh(); }
  update(time){ if(!this._brand||time-this._lt<40)return; this._lt=time; try{ this._paint(time/1000); }catch(e){ console.error('title brand',e); this._brand=null; } }
  _mkBtn(r,label){
    var x=r.x+r.w/2, y=r.y+r.h/2, B=!!this._brand;
    var bg=this.add.rectangle(x,y,r.w,r.h,0x63f2dc,B?0.001:0.12).setInteractive({useHandCursor:true}); if(!B)bg.setStrokeStyle(1,0x63f2dc);
    this.add.text(x,y,label,{fontSize:'17px',color:'#63f2dc',fontFamily:'Segoe UI',fontStyle:'bold'}).setOrigin(.5).setDepth(1).setAlpha(B?0:1);
    bg.on('pointerover',function(){bg.setFillStyle(0x63f2dc,B?0.14:0.28);});
    bg.on('pointerout',function(){bg.setFillStyle(0x63f2dc,B?0.001:0.12);});
    return bg;
  }
}

// ─── BootScene ──────────────────────────────────
class BootScene extends Phaser.Scene{
  constructor(){super('Boot')}
  init(d){this._newGame=!!(d&&d.newGame);}
  preload(){}
  create(){
    var w=this.scale.width,h=this.scale.height;
    this.add.rectangle(w/2,h/2,460,100,0x080c18);
    document.body.classList.add('on-title'); this.events.once('shutdown',function(){ document.body.classList.remove('on-title'); });
    var named=false;   // the wordmark (Ringed Z) above the loading bar
    try{ if(typeof ZBrand!=='undefined'&&ZBrand.WORDMARK){ if(this.textures.exists('boot_brand'))this.textures.remove('boot_brand'); var bt=this.textures.createCanvas('boot_brand',620,200); ZBrand.word(bt.getContext(),ZBrand.WORDMARK,310,100,34,0); bt.refresh(); this.add.image(w/2,h/2-84,'boot_brand'); named=true; } }catch(e){}
    if(!named)this.add.text(w/2,h/2-30,'QUESTS OF ZELDARA',{fontSize:'28px',color:'#ffffff',fontFamily:'Segoe UI',fontStyle:'bold'}).setOrigin(.5);
    this.add.rectangle(w/2,h/2+8,420,20,0x111122).setStrokeStyle(1,0x00f5ff);
    this._bar=this.add.rectangle(w/2-206,h/2+8,4,18,0x00f5ff).setOrigin(0,.5);
    this._pct=this.add.text(w/2,h/2+26,'Generating world...',{fontSize:'11px',color:'#6688aa',fontFamily:'Segoe UI'}).setOrigin(.5);
    this.add.text(w/2,h/2+50,'1200 × 1200 tiles — four regions, twelve crossings, seventeen waystones',{fontSize:'9px',color:'#334455',fontFamily:'Segoe UI'}).setOrigin(.5);
    var self=this;
    this.time.delayedCall(50,function(){self._startGen();});
  }
  _startGen(){
    // The world is generated synchronously (the bar can't move during it), so the bar
    // just reports the real steps: generating → built → entering. No artificial ticks.
    var wd=generateWorld(), self=this;
    this._bar.setSize(412,18);
    this._pct.setText('Entering world...');
    // one frame so "Entering world" shows; the World scene's create() does the rest
    this.time.delayedCall(16,function(){ var go=function(){ self.scene.start('World',{newGame:self._newGame}); }; if(typeof ZScn!=='undefined'){ if(!ZScn.done&&!ZScn.off){ var tk=self.time.addEvent({delay:200,loop:true,callback:function(){ var pr=ZScn.progress(); try{ self._pct.setText('Loading painted scenery… '+pr[0]+' / '+pr[1]); }catch(e){} }}); var go0=go; go=function(){ tk.remove(); go0(); }; } ZScn.whenReady(go,12000); } else go(); });   // the painted scenery is fetched first (the ground is painted once)
  }
}

// ─── Theme System ────────────────────────────────
function applyTheme(name){
  var b=document.body,cls=b.className.replace(/\btheme-\S+/g,'').trim();
  b.className=cls+(name?' theme-'+name:'');
  _setAmbient(name);
}

function _setAmbient(theme){
  var el=document.getElementById('ambient-layer');
  if(!el)return;
  el.innerHTML='';
  var h='';
  // helper: append a particle div
  function p(s){h+='<div style="position:absolute;pointer-events:none;'+s+'"></div>';}

  if(theme==='grasslands'){
    // Autumn-tinted grasslands: falling leaves + dust
    var lc=['#c86010','#e07820','#d04808','#b85a08','#cc7010','#d03808'];
    var la=['lf0','lf1','lf2','lf3','lf1','lf2'];
    for(var i=0;i<20;i++){
      var ll=(i*6+5)%96, ld=(i*1.4)%10, ldur=6+i%5;
      p('top:-14px;left:'+ll+'%;width:'+(6+i%5)+'px;height:'+(5+i%3)+'px;background:'+lc[i%6]+';border-radius:'+(3+i%3)+'px '+(i%2)+'px;animation:'+la[i%6]+' '+ldur+'s '+ld+'s ease-in infinite;opacity:0;');
    }
    for(var j=0;j<8;j++){
      var dl=(j*13+8)%88, dd=(j*2.3)%11;
      p('bottom:'+(15+j*9)+'px;left:'+dl+'%;width:3px;height:3px;border-radius:50%;background:rgba(190,150,60,.45);animation:'+(j%2===0?'dust-float':'dust-float2')+' '+(9+j*1.2)+'s '+dd+'s ease-in-out infinite;opacity:0;');
    }
  } else if(theme==='desert'){
    // Sand particles drifting right + heat shimmer dots
    for(var i=0;i<14;i++){
      var sl=(i*7+2)%80, sd=(i*1.8)%13;
      p('top:'+(10+i*6)+'%;left:'+sl+'%;width:'+(3+i%3)+'px;height:'+(2+i%2)+'px;border-radius:1px;background:rgba(210,180,80,'+(0.2+i%3*.1)+');animation:sand-drift '+(7+i%5)+'s '+sd+'s linear infinite;opacity:0;');
    }
    // Shimmer dots
    for(var j=0;j<6;j++){
      p('bottom:'+(5+j*12)+'px;left:'+(10+j*14)+'%;width:2px;height:2px;border-radius:50%;background:rgba(255,220,120,.5);animation:dust-float '+(6+j)+'s '+(j*1.5)+'s ease-in-out infinite;opacity:0;');
    }
  } else if(theme==='forest'){
    // Floating spores
    for(var i=0;i<22;i++){
      var fl=(i*5+8)%92, fd=(i*1.6)%12, fsz=2+i%3;
      p('bottom:-8px;left:'+fl+'%;width:'+fsz+'px;height:'+fsz+'px;border-radius:50%;background:rgba(60,220,160,'+(0.4+i%3*.15)+');box-shadow:0 0 '+(3+i%4)+'px rgba(40,200,140,.5);animation:spore-rise '+(6+i%5)+'s '+fd+'s ease-in infinite;opacity:0;');
    }
  } else if(theme==='volcanic'){
    // Rising embers
    for(var i=0;i<18;i++){
      var el2=(i*7+4)%90, ed=(i*1.1)%8, esz=2+i%3;
      var ea=i%2===0?'ember-rise':'ember-rise2';
      p('bottom:-6px;left:'+el2+'%;width:'+esz+'px;height:'+esz+'px;border-radius:50%;background:rgba('+(200+i%55)+','+(60+i%80)+',0,'+(0.6+i%4*.1)+');box-shadow:0 0 4px rgba(255,100,0,.5);animation:'+ea+' '+(4+i%4)+'s '+ed+'s ease-in infinite;opacity:0;');
    }
  } else if(theme==='aurora'){
    // Star streaks + twinkling stars
    for(var i=0;i<18;i++){
      var al=(i*11+20)%85, at=(i*8+5)%70;
      p('top:'+at+'%;left:'+al+'%;width:'+(8+i%12)+'px;height:1px;background:linear-gradient(90deg,rgba(255,255,255,.9),transparent);animation:streak '+(2.5+i%3)+'s '+(i*0.7)+'s linear infinite;opacity:0;');
    }
    for(var j=0;j<20;j++){
      var stl=(j*9+3)%95, stt=(j*7+2)%85, stsz=j%3+1;
      p('top:'+stt+'%;left:'+stl+'%;width:'+stsz+'px;height:'+stsz+'px;border-radius:50%;background:#fff;animation:star-twinkle '+(1.5+j%3)+'s '+(j*.4)+'s ease-in-out infinite;opacity:0;');
    }
  } else if(theme==='void'){
    // Pulsing void orbs
    for(var i=0;i<14;i++){
      var vl=(i*9+12)%88, vt=(i*7+8)%78, vsz=8+i%14;
      p('top:'+vt+'%;left:'+vl+'%;width:'+vsz+'px;height:'+vsz+'px;border-radius:50%;background:radial-gradient(circle,rgba(180,60,255,.45),transparent);animation:void-pulse '+(2+i%3)+'s '+(i*.5)+'s ease-in-out infinite;opacity:0;');
    }
    // Void sparks
    for(var j=0;j<10;j++){
      p('top:'+(10+j*8)+'%;left:'+(5+j*9)+'%;width:2px;height:2px;border-radius:50%;background:rgba(220,100,255,.8);animation:star-twinkle '+(1+j%2*.5)+'s '+(j*.3)+'s ease-in-out infinite;opacity:0;');
    }
  } else if(theme==='blood-moon'){
    // Red mist patches + falling sparks
    for(var i=0;i<10;i++){
      var ml=(i*11+5)%85, mt=(i*9+10)%70;
      p('top:'+mt+'%;left:'+ml+'%;width:'+(40+i*8)+'px;height:'+(20+i*4)+'px;border-radius:50%;background:radial-gradient(ellipse,rgba(180,10,20,.18),transparent);animation:mist-drift '+(4+i%4)+'s '+(i*.6)+'s ease-in-out infinite;');
    }
    for(var j=0;j<14;j++){
      p('top:-6px;left:'+(j*7+2)+'%;width:2px;height:2px;border-radius:50%;background:rgba(220,20,40,.8);animation:lf0 '+(5+j%4)+'s '+(j*.5)+'s ease-in infinite;opacity:0;');
    }
  } else if(theme==='ocean'){
    // Bubbles rising
    for(var i=0;i<18;i++){
      var bl=(i*6+8)%90, bd=(i*1.5)%11, bsz=3+i%5;
      var ba=i%2===0?'bubble-rise':'bubble-rise2';
      p('bottom:-8px;left:'+bl+'%;width:'+bsz+'px;height:'+bsz+'px;border-radius:50%;border:1px solid rgba(80,220,240,'+(0.3+i%3*.1)+');animation:'+ba+' '+(5+i%4)+'s '+bd+'s ease-in infinite;opacity:0;');
    }
  } else if(theme==='arctic'){
    // Snowflakes
    for(var i=0;i<24;i++){
      var snl=(i*5+3)%95, snd=(i*1.2)%10, snsz=3+i%5;
      var sna=i%2===0?'snow-fall':'snow-fall2';
      p('top:-14px;left:'+snl+'%;width:'+snsz+'px;height:'+snsz+'px;border-radius:50%;background:rgba(220,240,255,'+(0.5+i%3*.15)+');animation:'+sna+' '+(7+i%5)+'s '+snd+'s linear infinite;opacity:0;');
    }
  } else if(theme==='celestial'){
    // Golden sparkles drifting
    for(var i=0;i<20;i++){
      var cl=(i*7+5)%92, ct=(i*9+10)%80, csz=2+i%4;
      var ca=i%2===0?'gold-drift':'gold-drift2';
      p('top:'+ct+'%;left:'+cl+'%;width:'+csz+'px;height:'+csz+'px;border-radius:50%;background:rgba(255,'+(180+i%60)+',60,'+(0.5+i%3*.15)+');box-shadow:0 0 4px rgba(255,200,80,.4);animation:'+ca+' '+(5+i%4)+'s '+(i*.4)+'s ease-in-out infinite;opacity:0;');
    }
  }
  el.innerHTML=h;
}

