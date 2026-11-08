// ═══════════════════════════════════════════════════════════════════════
// ║ 16w2-story-clips.js — round 97: THE OPENING AS A VIDEO, WITH THE WORDS AS WE WORKED THEM OUT IN THE LAB
// ║ Kris: "we finally got a good shot from Kling! … The Locked Shot List … Turn this into the intro video with the music and text overlays
// ║ like we've worked on".
// ║  · A story cut-scene's frames can now be played by a Kling montage (ZSC.CLIPS): each frame is one part of the video, cut where the
// ║    video itself cuts. The opening's first six frames are assets/video/sb_opening_p1.mp4 (the O17 video, slowed to 40 s with smooth
// ║    in-between frames — Kris: "more like 40 seconds in total"); frames 7–12 (the twins' part) stay paintings until their video is made.
// ║    The video's own sound is never used — the opening's music (mu_saga_storm, 04c2 ZAUDIO.cutCue) plays under it.
// ║  · The words (Lab picks, round 92c — "Fragments that build"): under the picture in a bigger text area with a bigger font, each part of
// ║    the sentence fading in and rising into place after the last, the whole line fading out before the cut; the FIRST line on its own
// ║    black screen before the first picture ("let's only have the full panel with text before the first image, others, including the end,
// ║    should have below"). Every shot is slowed until its line can be read (rate ≥ 0.6, then it holds on its last frame).
// ║  · For every story cut-scene of three frames or more (the boss forms' short sets keep the plain line).
// ║  · If the video has not loaded in 3.5 s, that frame shows its painting instead (a slow connection never stalls the story).
// ║ Switch: ZSC.on (Dev: ZSC.on=false → the paintings and the plain line, as before); ?video=0 turns the clips off (07zvc ZVID).
// ═══════════════════════════════════════════════════════════════════════
var ZSC={ on:true,
  // scene → its montage clips: the video's id in assets/video, the frames it plays (counted from 1) and where the video cuts (seconds)
  CLIPS:{ opening:[{vid:'sb_opening_p1', from:1, to:6, cuts:[0,6.75,13.583,20,28.917,33.333,39.96]}] },
  read:function(line){ return 1.4+String(line||'').split(/\s+/).filter(Boolean).length*0.36; },      // ≈ 165 words a minute while watching, plus a breath (as in the Lab)
  frag:function(line){ var F=String(line||'').split(/(?<=[,;:…])\s+|\s+(?=[—–]\s)|(?<=[—–])\s+/).map(function(x){ return x.trim(); }).filter(Boolean), out=[];
    F.forEach(function(f){ var w=f.split(' '); if(w.length>9){ var h=Math.ceil(w.length/2); out.push(w.slice(0,h).join(' ')); out.push(w.slice(h).join(' ')); } else out.push(f); }); return out; },
  // the part of a montage that plays frame fid ('sb:<scene>:<frame id>'), or null
  seg:function(fid){ if(!ZSC.on)return null; var p=String(fid).split(':'), C=ZSC.CLIPS[p[1]]; if(!C)return null; var m=/_(\d+)(?:_[mf])?$/.exec(p[2]||''); if(!m)return null; var n=+m[1];
    for(var i=0;i<C.length;i++){ var c=C[i]; if(n<c.from||n>c.to)continue; var src=typeof ZVID!=='undefined'&&ZVID.src(c.vid); if(!src)return null; var k=n-c.from; return {src:src,a:c.cuts[k],b:c.cuts[k+1],k:k}; }
    return null; },
  story:function(){ var k=String(ZCUT._key||''), L=ZCUT.SETS[k]||[]; return ZSC.on&&/^story_/.test(k)&&L.length>=3; },
  // the words, fragment by fragment, over ms; gone 0.9 s before the cut
  words:function(el,line,ms){ var cap=el.querySelector('.zcut-cap'); if(!cap||!line)return; var tok=el._zscW=(el._zscW||0)+1, F=ZSC.frag(line), outAt=Math.max(1400,ms-900);
    cap.innerHTML=''; var S=F.map(function(f){ var s=document.createElement('span'); s.className='zsc-w'; s.textContent=f; cap.appendChild(s); return s; }), step=Math.min(1500,(outAt*0.55)/Math.max(1,F.length));
    S.forEach(function(s,i){ setTimeout(function(){ if(el._zscW===tok)s.classList.add('in'); },120+i*step); });
    setTimeout(function(){ if(el._zscW===tok)S.forEach(function(s){ s.classList.add('out'); }); },outAt); },
  // the first line on its own black screen; done() as it fades away
  panel:function(el,line,done){ var tok=el._zscT, P=document.createElement('div'); P.className='zsc-panel'; var t=document.createElement('div'); t.className='zsc-pt'; P.appendChild(t); el.appendChild(P);
    var F=ZSC.frag(line).map(function(f){ var s=document.createElement('span'); s.textContent=f; t.appendChild(s); return s; }), ms=Math.max(2600,(ZSC.read(line)+1.2)*1000);
    requestAnimationFrame(function(){ P.classList.add('show'); }); F.forEach(function(s,i){ setTimeout(function(){ s.classList.add('in'); },500+i*650); });
    setTimeout(function(){ P.classList.remove('show'); setTimeout(function(){ P.remove(); if(el._zscT===tok)done(); },800); },500+650*F.length+Math.max(900,ms-650*F.length)); return ms+1300+650*F.length; },
  vid:function(el){ var v=el.querySelector('.zsc-vid'); if(v)return v; v=document.createElement('video'); v.className='zsc-vid'; v.muted=true; v.playsInline=true; v.setAttribute('playsinline',''); v.preload='auto';
    var img=el.querySelector('.zcut-img'); el.insertBefore(v,img); return v; },
  hideVid:function(el){ var v=el.querySelector('.zsc-vid'); if(v){ try{ v.pause(); }catch(e){} v.style.opacity='0'; v.style.display='none'; } },
  // play one part of the montage; shown() when it is on screen (then it plays to its cut and holds there)
  play:function(el,S,rate,shown,fail){ var v=ZSC.vid(el), tok=el._zscT; if(v.getAttribute('src')!==S.src)v.src=S.src;
    if(typeof ZSFR!=='undefined')ZSFR.hide(el); var img=el.querySelector('.zcut-img'); if(img)img.style.display='none'; v.style.display='';
    var go=function(){ if(el._zscT!==tok)return; try{ if(Math.abs(v.currentTime-S.a)>0.3)v.currentTime=S.a; v.playbackRate=rate; var pp=v.play(); if(pp&&pp.catch)pp.catch(function(){}); }catch(e){}
      v.style.opacity='1'; setTimeout(function(){ if(el._zscT===tok)shown(); },0);      /* never at once: the player sets its own fallback timer just after asking for the frame */
      var watch=function(){ if(el._zscT!==tok||!el.isConnected)return; if(v.currentTime>=S.b-0.06||v.ended){ try{ v.pause(); }catch(e){} return; } requestAnimationFrame(watch); }; watch(); };
    if(v.readyState>=1)go();      /* metadata is enough to seek and play (after a seek readyState can drop below 2, and loadeddata never comes again) */
    else { var t=setTimeout(function(){ if(el._zscT!==tok)return; v.removeEventListener('loadedmetadata',ok); ZSC.hideVid(el); fail(); },3500), ok=function(){ clearTimeout(t); go(); }; v.addEventListener('loadedmetadata',ok,{once:true}); } }
};
setTimeout(function(){ if(typeof ZCUT==='undefined'||typeof ZSFR==='undefined')return;
  // the time a frame stays: set here for the frame being shown (the cut-scene player asks ZCUT.hold(line))
  var h0=ZCUT.hold; ZCUT.hold=function(line){ var o=ZSC._hold; if(o&&o.line===line)return o.ms; return h0.apply(this,arguments); };
  var s0=ZSFR.show; ZSFR.show=function(el,fid,cb){ if(!ZSC.on||!el)return s0.apply(this,arguments);
    var L=ZCUT.SETS[ZCUT._key]||[], i=-1; for(var j=0;j<L.length;j++)if(L[j][0]===fid){ i=j; break; } var line=i>=0?L[i][1]:'', story=ZSC.story(), S=ZSC.seg(fid);
    el._zscT=(el._zscT||0)+1; el._zscW=(el._zscW||0)+1; el.querySelectorAll('.zsc-panel').forEach(function(p){ p.remove(); });
    if(story)el.classList.add('zsc-story');
    var first=story&&i===0&&!!line, rate=1, segMs=0;
    if(S){ var len=S.b-S.a, r=first?len:ZSC.read(line); rate=Math.max(0.6,Math.min(1,len/Math.max(0.1,r))); segMs=Math.round(Math.max(len/rate,first?len:r)*1000+300); if(first)segMs=Math.round(len*1000+300); }
    var still=story?Math.max(h0(line),Math.round(ZSC.read(line)*1000+1200)):h0(line);
    var after=function(ms){ return function(){ ZSC._hold={line:line,ms:ms}; cb(); var cap=el.querySelector('.zcut-cap'); if(first){ if(cap)cap.textContent=''; } else if(story)ZSC.words(el,line,ms); }; };
    var show=function(){ if(S){ ZSC.play(el,S,rate,after(segMs),function(){ s0.call(ZSFR,el,fid,after(still)); }); } else { ZSC.hideVid(el); s0.call(ZSFR,el,fid,after(still)); } };
    if(S){ var v0=ZSC.vid(el); if(v0.getAttribute('src')!==S.src)v0.src=S.src; }      /* start loading the video now — the first line's screen gives it time */
    if(first){ var pm=ZSC.panel(el,line,show); ZSC._hold={line:line,ms:pm+(S?segMs:still)}; } else { ZSC._hold={line:line,ms:S?segMs:still}; show(); } };
  var st=document.createElement('style'); st.textContent=
    '#zcut.zsc-story,#zcut-closing.zsc-story{padding-bottom:7vh;box-sizing:border-box}'+
    '.zsc-story .zcut-sb,.zsc-vid{width:min(100vw,calc(70vh*16/9))!important;aspect-ratio:16/9;object-fit:cover}'+
    '.zsc-vid{display:block;opacity:0;transition:opacity .5s ease;background:#000}'+
    '.zsc-story .zcut-bar:last-of-type{height:18vh!important}'+
    '.zsc-story .zcut-cap{height:18vh!important;flex-wrap:wrap;align-content:center;gap:0 .32em;font:italic 600 clamp(19px,2.5vw,31px)/1.4 Georgia,serif!important;padding:0 12vw!important}'+
    '.zsc-w{display:inline-block;opacity:0;transform:translateY(8px);transition:opacity .9s ease,transform .9s ease}.zsc-w.in{opacity:1;transform:none}.zsc-w.out{opacity:0;transition-duration:.7s}'+
    '.zsc-panel{position:absolute;inset:0;z-index:6;background:#000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .8s ease;pointer-events:none}.zsc-panel.show{opacity:1}'+
    '.zsc-pt{max-width:72%;text-align:center;color:#f2e3b0;font:italic clamp(22px,3vw,38px)/1.5 Georgia,serif;text-shadow:0 0 18px rgba(111,227,245,.18)}'+
    '.zsc-pt span{display:inline;opacity:0;transition:opacity .9s ease;margin-right:.3em}.zsc-pt span.in{opacity:1}';
  document.head.appendChild(st);
},0);
