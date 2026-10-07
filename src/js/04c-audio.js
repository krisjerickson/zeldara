// ═══════════════════════════════════════════════════════════════════════
// ║ ZSFX (round 7) — procedural sound: no audio files, all made with the
// ║ Web Audio API, so it adds nothing to the download.
// ║   ZSFX.play(name, {big})  one-shots: stomp, warp, roar, boom, hit, swing,
// ║                           hurt, card, victory
// ║   ZSFX.music(kind, level) boss-fight music (drone + drums + ostinato);
// ║                           level 1–5 = phase (faster, more layers)
// ║   ZSFX.stopMusic(), ZSFX.toggleMute()  (🔊 button, saved per browser)
// ║ Silent until the first key press / click (browser autoplay rules) and
// ║ while the game is paused.
// ═══════════════════════════════════════════════════════════════════════
var ZSFX={ ctx:null, out:null, muted:false, vol:0.7, _mus:null,
  init:function(){ if(ZSFX.ctx)return ZSFX.ctx; try{ var C=window.AudioContext||window.webkitAudioContext; if(!C)return null; var a=new C(); ZSFX.ctx=a; ZSFX.out=a.createGain(); ZSFX.out.gain.value=ZSFX.muted?0:ZSFX.vol;
      var comp=a.createDynamicsCompressor(); ZSFX.out.connect(comp); comp.connect(a.destination); ZSFX._noise=ZSFX._mkNoise(a); return a; }catch(e){ return null; } },
  ac:function(){ var a=ZSFX.init(); if(a&&a.state==='suspended'&&ZSFX._unlocked)a.resume(); return a&&a.state!=='closed'?a:null; },
  _mkNoise:function(a){ var n=a.sampleRate*1.5, b=a.createBuffer(1,n,a.sampleRate), d=b.getChannelData(0); for(var i=0;i<n;i++)d[i]=Math.random()*2-1; return b; },
  // building blocks
  osc:function(t0,type,f0,f1,dur,vol,to){ var a=ZSFX.ac(); if(!a)return; var t=a.currentTime+t0, o=a.createOscillator(), g=a.createGain(); o.type=type; o.frequency.setValueAtTime(f0,t); if(f1)o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+dur);
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.015); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); o.connect(g); g.connect(to||ZSFX.out); o.start(t); o.stop(t+dur+0.05); return o; },
  noise:function(t0,dur,vol,ftype,f0,f1,q,to){ var a=ZSFX.ac(); if(!a)return; var t=a.currentTime+t0, s=a.createBufferSource(), fl=a.createBiquadFilter(), g=a.createGain(); s.buffer=ZSFX._noise; fl.type=ftype||'lowpass'; fl.frequency.setValueAtTime(f0||800,t); if(f1)fl.frequency.exponentialRampToValueAtTime(Math.max(30,f1),t+dur); fl.Q.value=q||0.8;
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); s.connect(fl); fl.connect(g); g.connect(to||ZSFX.out); s.start(t,Math.random()*0.5); s.stop(t+dur+0.05); },
  play:function(name,o){ if(ZSFX.muted||!ZSFX._unlocked)return; o=o||{}; var big=Math.max(0.6,Math.min(2,o.big||1)), now=Date.now(); ZSFX._last=ZSFX._last||{}; if(now-(ZSFX._last[name]||0)<60)return; ZSFX._last[name]=now;
    switch(name){
      case 'stomp': ZSFX.osc(0,'sine',70/big,32,0.35*big,0.5); ZSFX.noise(0,0.25,0.25*big,'lowpass',400,80); break;
      case 'warp': ZSFX.noise(0,0.45,0.18,'bandpass',300,3000,4); ZSFX.osc(0,'sine',900,120,0.4,0.07); ZSFX.osc(0.05,'triangle',200,1400,0.3,0.05); break;
      case 'roar': ZSFX.osc(0,'sawtooth',110/big,45/big,1.3,0.22); ZSFX.osc(0.02,'sawtooth',116/big,48/big,1.3,0.14); ZSFX.noise(0,1.2,0.22,'bandpass',600/big,180,1.2); ZSFX.osc(0,'sine',55/big,30,1.4,0.35); break;
      case 'boom': ZSFX.osc(0,'sine',90,25,1.2,0.6); ZSFX.noise(0,1,0.35,'lowpass',1800,60); ZSFX.noise(0.05,0.5,0.15,'highpass',3000,900); break;
      case 'hit': ZSFX.noise(0,0.09,0.3,'bandpass',2200,900,1.5); ZSFX.osc(0,'sine',160,60,0.14,0.3); break;
      case 'swing': ZSFX.noise(0,0.16,0.12,'bandpass',900,2600,2.5); break;
      case 'hurt': ZSFX.osc(0,'square',240,110,0.18,0.08); ZSFX.noise(0,0.12,0.15,'lowpass',1400,300); break;
      case 'card': ZSFX.osc(0,'sine',55,55,2.4,0.3); ZSFX.osc(0,'triangle',110,110,2.2,0.08); ZSFX.osc(0.25,'sawtooth',164.8,164.8,1.9,0.04); ZSFX.noise(0,1.8,0.08,'bandpass',200,90,2); break;
      case 'victory': [[392,0],[523,0.14],[659,0.28],[784,0.42],[1047,0.62]].forEach(function(n){ ZSFX.osc(n[1],'triangle',n[0],0,0.7,0.12); }); ZSFX.osc(0.62,'sine',523,0,1.6,0.08); break;
    } },
  // ── boss music: a lookahead scheduler (100 ms tick, 0.4 s ahead) ──
  // kind picks the key/mode per quadrant; level (phase) adds tempo + layers
  MODES:{1:[0,3,7,10,12,10,7,3],2:[0,1,5,7,8,7,5,1],3:[0,2,3,7,10,7,3,2],4:[0,1,4,6,7,6,4,1]},
  music:function(kind,level){ if(ZSFX.muted)return; var a=ZSFX.ac(); if(!a)return; ZSFX.stopMusic(); level=Math.max(1,Math.min(5,level||1));
    var root=[0,49,46.25,43.65,41.2][kind]||49, bpm=78+level*9, beat=60/bpm, step=beat/2, bus=a.createGain(); bus.gain.value=0.0001; bus.connect(ZSFX.out); bus.gain.exponentialRampToValueAtTime(0.55,a.currentTime+1.2);
    var drone=[1,1.498,2.004].map(function(m,i){ var o=a.createOscillator(), f=a.createBiquadFilter(), g=a.createGain(); o.type=i===2?'triangle':'sawtooth'; o.frequency.value=root*m*(i===1?1.003:1); f.type='lowpass'; f.frequency.value=260+level*60; g.gain.value=i===2?0.05:0.07; o.connect(f); f.connect(g); g.connect(bus); o.start(); return o; });
    var M={bus:bus,drone:drone,next:a.currentTime+0.2,n:0,kind:kind,level:level,step:step,root:root,mode:ZSFX.MODES[kind]||ZSFX.MODES[1]};
    M.iv=setInterval(function(){ var a2=ZSFX.ctx; if(!a2||ZSFX._mus!==M)return; if(typeof _anyModalOpen==='function'&&_anyModalOpen()){ M.next=a2.currentTime+0.2; return; }
      while(M.next<a2.currentTime+0.4){ var t=M.next-a2.currentTime, i=M.n%16;
        if(i%4===0)ZSFX.osc(t,'sine',120,42,0.45,0.42,bus);                            // taiko-ish kick on the beat
        if(M.level>=2&&(i===6||i===14))ZSFX.noise(t,0.18,0.16,'bandpass',900,400,1.2,bus); // off-beat hit
        if(M.level>=3&&i%2===1)ZSFX.noise(t,0.05,0.05,'highpass',6000,4000,0.7,bus);       // ticking hats
        var nt=M.mode[M.n%M.mode.length], f=M.root*2*Math.pow(2,nt/12)*(M.level>=4&&(M.n>>3)%2?2:1);
        if(i%2===0||M.level>=3)ZSFX.osc(t,'triangle',f,0,M.step*0.9,0.06,bus);                 // ostinato
        if(M.level>=5&&i%8===0)ZSFX.osc(t,'sawtooth',M.root*4*Math.pow(2,M.mode[(M.n>>3)%M.mode.length]/12),0,M.step*7,0.035,bus); // brass stab
        M.n++; M.next+=M.step; } },100);
    ZSFX._mus=M; },
  stopMusic:function(){ var M=ZSFX._mus, a=ZSFX.ctx; if(!M)return; ZSFX._mus=null; clearInterval(M.iv); try{ M.bus.gain.cancelScheduledValues(a.currentTime); M.bus.gain.setValueAtTime(M.bus.gain.value,a.currentTime); M.bus.gain.exponentialRampToValueAtTime(0.0001,a.currentTime+1.2); M.drone.forEach(function(o){ o.stop(a.currentTime+1.3); }); setTimeout(function(){ try{ M.bus.disconnect(); }catch(e){} },1500); }catch(e){} },
  setMuted:function(m){ ZSFX.muted=!!m; try{ localStorage.setItem('zeldara_mute',m?'1':'0'); }catch(e){} if(ZSFX.out)ZSFX.out.gain.value=m?0:ZSFX.vol; if(m)ZSFX.stopMusic(); var b=document.getElementById('mute-btn'); if(b)b.innerHTML=(typeof ZIcon!=='undefined')?ZIcon.html(m?'ui_sound_off':'ui_sound_on',m?'🔇':'🔊',1.35):(m?'🔇':'🔊'); },
  toggleMute:function(){ ZSFX.setMuted(!ZSFX.muted); }
};
try{ ZSFX.muted=localStorage.getItem('zeldara_mute')==='1'; }catch(e){}
// browsers only allow audio after a user gesture
(function(){ var un=function(){ ZSFX._unlocked=true; var a=ZSFX.init(); if(a&&a.state==='suspended')a.resume(); };
  document.addEventListener('keydown',un,{capture:true}); document.addEventListener('pointerdown',un,{capture:true}); })();
setTimeout(function(){ var b=document.getElementById('mute-btn'); if(b)b.innerHTML=(typeof ZIcon!=='undefined')?ZIcon.html(ZSFX.muted?'ui_sound_off':'ui_sound_on',ZSFX.muted?'🔇':'🔊',1.35):(ZSFX.muted?'🔇':'🔊'); },0);
