// ─── TitleScene ─────────────────────────────────
class TitleScene extends Phaser.Scene{
  constructor(){super('Title')}
  create(){
    var w=this.scale.width,h=this.scale.height;
    var self=this;
    // Hide action bars on the title — no game state to interact with yet.
    document.body.classList.add('bars-hidden');
    this.events.once('shutdown', function(){ document.body.classList.remove('bars-hidden'); });
    this.add.rectangle(w/2,h/2,w,h,0x070b16);
    for(var i=0;i<120;i++){
      var sx=Phaser.Math.Between(0,w),sy=Phaser.Math.Between(0,h);
      this.add.circle(sx,sy,Math.random()<0.05?2:1,0xffffff,0.3+Math.random()*0.7);
    }
    this.add.text(w/2,h*0.22,'QUESTS OF ZELDARA',{fontSize:'38px',color:'#00f5ff',fontFamily:'Segoe UI',fontStyle:'bold'}).setOrigin(.5);
    this.add.text(w/2,h*0.22+44,'Version 4  —  The Volcano Lord Awakens',{fontSize:'13px',color:'#336688',fontFamily:'Segoe UI'}).setOrigin(.5);
    var hasSave=false,saveInfo='';
    try{var raw=localStorage.getItem('qoz_v2');if(raw){var sv=JSON.parse(raw);hasSave=true;saveInfo='Level '+(sv.level||1)+' — '+(sv.gold||0)+' gold';}}catch(e){localStorage.removeItem('qoz_v2');}
    var newBtn=this._mkBtn(w/2,h*0.5,'NEW GAME',0x00cc88);
    newBtn.on('pointerup',function(){try{localStorage.removeItem('qoz_v2');}catch(e){}self.scene.start('Boot',{newGame:true});});
    if(hasSave){
      var cBtn=this._mkBtn(w/2,h*0.5+70,'CONTINUE',0x4488cc);
      cBtn.on('pointerup',function(){self.scene.start('Boot',{newGame:false});});
      // back from a graphics reset (20-game-config.js): continue straight away
      var rs=null; try{ rs=sessionStorage.getItem('qoz_resume'); sessionStorage.removeItem('qoz_resume'); }catch(e){}
      if(rs&&Date.now()-(+rs)<60000)this.time.delayedCall(60,function(){ self.scene.start('Boot',{newGame:false}); });
    }
  }
  _mkBtn(x,y,label,col){
    var hex='#'+col.toString(16).padStart(6,'0');
    var bg=this.add.rectangle(x,y,210,46,col,0.12).setStrokeStyle(1,col).setInteractive({useHandCursor:true});
    this.add.text(x,y,label,{fontSize:'17px',color:hex,fontFamily:'Segoe UI',fontStyle:'bold'}).setOrigin(.5).setDepth(1);
    bg.on('pointerover',function(){bg.setFillStyle(col,0.28);});
    bg.on('pointerout',function(){bg.setFillStyle(col,0.12);});
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
    this.add.text(w/2,h/2-30,'QUESTS OF ZELDARA V2',{fontSize:'28px',color:'#ffffff',fontFamily:'Segoe UI',fontStyle:'bold'}).setOrigin(.5);
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
    this.time.delayedCall(16,function(){ self.scene.start('World',{newGame:self._newGame}); });
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

