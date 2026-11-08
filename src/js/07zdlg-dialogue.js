// ═══════════════════════════════════════════════════════════════════════
// ║ 07zdlg-dialogue.js — round 84: NPC DIALOGUE BOXES (Kris: "when you talk to NPCs, the text at the top is small, and doesn't look like it
// ║ comes from the NPC. you should have a text box pop up, and it should write out text at the pace like a person talking, and we should
// ║ have a sound effect that mimicks someone talking. And then if it's a long thing the NPC is saying, you might have to click "next" or
// ║ just press space. and then the game is paused during text, and you next to press "close" or press space to resume at the end of their
// ║ dialogue"; "i also want 10 options in the lab to choose from for how these text boxes and dialogue comes out").
// ║  · ZDLG.say(name, text, {id, icon}) — a box with the speaker's name (and picture when one is painted), the words typed out at talking
// ║    pace (pauses at commas and full stops), a soft "talking" babble whose pitch is the speaker's own; long speeches in pages:
// ║    Space / Enter / click → the rest of the page at once, then the next page; on the last page "Close" (Space) — Esc closes at once.
// ║    The game is paused while the box is up (24-pause-input: the box is one of PAUSE_OVERLAYS).
// ║  · ZDLG.STYLES — the ten looks for the Lab (Dialogue boxes); ZDLG.style is the one in the game (Kris's pick; ?dlg=<id> to try one).
// ║  · The village folk, the builders, Mira, the twin and every "Name: \"…\"" notice now speak through it.
// ║ This file is shared with the Lab (07-files), so the looks and the voice are the same in both.
// ═══════════════════════════════════════════════════════════════════════
var ZDLG={ on:true, style:'rune', CPS:20, PAGE:150, _q:[], open:false,
  // the ten looks: id, name, what it is, the voice of the babble, letters a second
  STYLES:[
    {id:'rune',name:'Rune-stone',desc:'A slab of dark slate across the bottom, its edge glowing rune-blue; the speaker\'s picture in a rune ring, the name on a carved plate.',voice:'boop',cps:20},
    {id:'parchment',name:'Saga parchment',desc:'A scroll of warm parchment that unrolls across the bottom; ink lettering, the name on a red wax seal.',voice:'quill',cps:18},
    {id:'longhouse',name:'Longhouse wood',desc:'A carved oak panel with knotwork corners and brass studs, lit warm like firelight; the name on a brass plaque.',voice:'wood',cps:20},
    {id:'aurora',name:'Aurora glass',desc:'Dark frosted glass with a slowly shifting aurora along its border and soft neon lettering.',voice:'chime',cps:22},
    {id:'bubble',name:'Speech bubble',desc:'A rounded white speech bubble with a tail pointing to the speaker\'s picture — the classic comic look.',voice:'blip',cps:24},
    {id:'saga',name:'Cinematic saga',desc:'The screen gets black bars top and bottom like a film; big lettering centred in the lower bar, the name above it in gold.',voice:'hum',cps:16},
    {id:'tome',name:'Open tome',desc:'An open book: the speaker\'s picture and name on the left page, the words on the right page in ink.',voice:'murmur',cps:18},
    {id:'gilded',name:'Asgard gilt',desc:'White marble edged with gold filigree, deep-blue lettering — grand and bright.',voice:'bell',cps:20},
    {id:'minimal',name:'Clean modern',desc:'A soft dark rounded box, clean lettering, a small name chip — quick and quiet.',voice:'tick',cps:28},
    {id:'classic',name:'Classic RPG',desc:'The deep-blue window with a white border of the old role-playing games; the name in its own little box above.',voice:'square',cps:24}],
  byId:function(id){ return ZDLG.STYLES.find(function(s){ return s.id===id; })||ZDLG.STYLES[0]; },
  // ── the words: pages of about PAGE letters, broken at the ends of sentences ──
  pages:function(text){ var t=String(text||'').replace(/\s+/g,' ').trim(), out=[], cur='';
    var parts=t.match(/[^.!?…]+[.!?…]+["”']?\s*|[^.!?…]+$/g)||[t];
    parts.forEach(function(p){ if(cur&&(cur+p).length>ZDLG.PAGE){ out.push(cur.trim()); cur=''; } cur+=p; }); if(cur.trim())out.push(cur.trim()); return out.length?out:['…']; },
  hash:function(s){ var h=0; s=String(s||''); for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0; return Math.abs(h); },
  // ── the voice: a short syllable every other letter, the pitch the speaker's own ──
  ac:function(){ try{ if(typeof ZSFX!=='undefined'&&ZSFX.ac&&ZSFX._unlocked){ var a=ZSFX.ac(); if(a)return a; } if(!ZDLG._ac)ZDLG._ac=new (window.AudioContext||window.webkitAudioContext)(); return ZDLG._ac; }catch(e){ return null; } },
  muted:function(){ return typeof ZSFX!=='undefined'&&ZSFX.muted; },
  blip:function(voice,name,ch,vol){ if(ZDLG.muted())return; var a=ZDLG.ac(); if(!a)return; if(a.state==='suspended')try{ a.resume(); }catch(e){}
    var h=ZDLG.hash(name), base=[180,210,240,150,280,320][h%6]*(voice==='bell'||voice==='chime'?3:voice==='square'||voice==='blip'?1.6:1), v=/[aeiouy]/i.test(ch)?1.12:/[mnlr]/i.test(ch)?0.92:1, f=base*v*(0.94+((ch.charCodeAt(0)*7)%13)/100);
    var t=a.currentTime, g=a.createGain(), out=(typeof ZAUDIO!=='undefined'&&ZAUDIO.bus&&ZAUDIO.bus.sfx)||a.destination, L=0.07, peak=(vol||1)*0.07;
    g.connect(out); g.gain.setValueAtTime(0.0001,t);
    if(voice==='quill'||voice==='murmur'||voice==='wood'){ var n=a.createBufferSource(), b=a.createBuffer(1,Math.floor(a.sampleRate*0.06),a.sampleRate), d=b.getChannelData(0); for(var i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
      var bp=a.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=voice==='quill'?3200:voice==='wood'?700:f*3; bp.Q.value=voice==='wood'?6:3; n.buffer=b; n.connect(bp); bp.connect(g);
      g.gain.linearRampToValueAtTime(peak*(voice==='wood'?1.8:1.4),t+0.006); g.gain.exponentialRampToValueAtTime(0.0001,t+(voice==='wood'?0.05:0.06)); n.start(t); n.stop(t+0.07);
      if(voice!=='murmur')return; }
    var o=a.createOscillator(); o.type=voice==='square'?'square':voice==='blip'?'triangle':voice==='tick'?'triangle':'sine';
    o.frequency.setValueAtTime(f,t); o.frequency.exponentialRampToValueAtTime(f*(voice==='hum'?0.97:0.86),t+L);
    var lp=a.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=voice==='square'?2400:voice==='hum'?900:3200; o.connect(lp); lp.connect(g);
    g.gain.linearRampToValueAtTime(peak*(voice==='square'?0.45:voice==='hum'?1.1:1),t+0.008); g.gain.exponentialRampToValueAtTime(0.0001,t+(voice==='hum'?0.11:voice==='tick'?0.035:L));
    o.start(t); o.stop(t+0.13);
    if(voice==='bell'||voice==='chime'){ var o2=a.createOscillator(); o2.type='sine'; o2.frequency.value=f*2.01; var g2=a.createGain(); g2.gain.setValueAtTime(peak*0.4,t); g2.gain.exponentialRampToValueAtTime(0.0001,t+0.16); o2.connect(g2); g2.connect(out); o2.start(t); o2.stop(t+0.18); } },
  // ── the look ──
  css:function(){ if(typeof document==='undefined'||document.getElementById('zdlg-css'))return; var s=document.createElement('style'); s.id='zdlg-css'; s.textContent=[
    '.zd{position:absolute;left:0;right:0;bottom:0;top:0;pointer-events:none;font-family:"Alegreya Sans","Segoe UI",sans-serif}',
    '.zd-box{position:absolute;left:50%;transform:translateX(-50%);bottom:var(--zdb,4%);width:min(92%,880px);min-height:132px;display:flex;gap:16px;align-items:flex-start;padding:18px 22px 30px;box-sizing:border-box;pointer-events:auto;cursor:pointer;animation:zdIn .22s ease-out}',
    '@keyframes zdIn{from{opacity:0;transform:translate(-50%,14px)}to{opacity:1;transform:translate(-50%,0)}}',
    '.zd-pic{flex:0 0 auto;width:96px;height:96px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;font:700 40px "Cinzel",serif}',
    '.zd-pic canvas{width:96px;height:96px;image-rendering:auto}',
    '.zd-main{flex:1 1 auto;min-width:0}',
    '.zd-name{display:inline-block;font:700 17px "Cinzel","Marcellus SC",serif;letter-spacing:.04em;margin-bottom:6px}',
    '.zd-text{font-size:20px;line-height:1.42;min-height:3.9em;white-space:pre-wrap}',
    '.zd-more{position:absolute;right:18px;bottom:8px;font:600 13px "Alegreya Sans","Segoe UI",sans-serif;opacity:.85;display:flex;gap:8px;align-items:center}',
    '.zd-more b{display:inline-block;padding:2px 9px;border-radius:6px;border:1px solid currentColor;font-weight:700}',
    '.zd-more .zd-arrow{animation:zdBob 1s ease-in-out infinite}@keyframes zdBob{50%{transform:translateY(3px)}}',
    // 1 rune-stone
    '.zd-s-rune .zd-box{background:linear-gradient(180deg,#1f2a36,#0e151d);border:2px solid #6fe3f5;border-radius:10px;box-shadow:0 0 18px rgba(111,227,245,.45),inset 0 0 22px rgba(0,0,0,.6);color:#e7f6ff}',
    '.zd-s-rune .zd-pic{border:3px solid #6fe3f5;box-shadow:0 0 14px rgba(111,227,245,.6);background:#0b1218;color:#6fe3f5}',
    '.zd-s-rune .zd-name{color:#bff6ff;background:linear-gradient(180deg,#3b4652,#222b34);padding:3px 12px;border-radius:4px;border:1px solid #6b7c8c;text-shadow:0 0 6px rgba(111,227,245,.7)}',
    '.zd-s-rune .zd-more{color:#9fe8ff}',
    // 2 parchment
    '.zd-s-parchment .zd-box{background:radial-gradient(ellipse at 50% 40%,#f7e8c4,#e2c690 70%,#c9a66a);border-radius:6px;color:#3a2410;border-top:10px solid #b88a4c;border-bottom:10px solid #b88a4c;box-shadow:0 6px 22px rgba(0,0,0,.55);font-family:"Alegreya Sans",Georgia,serif;animation:zdUnroll .35s ease-out}',
    '@keyframes zdUnroll{from{clip-path:inset(0 48% 0 48%)}to{clip-path:inset(0 0 0 0)}}',
    '.zd-s-parchment .zd-pic{border:3px solid #7a4a1e;background:#ead8b0;color:#7a2a1a}',
    '.zd-s-parchment .zd-name{color:#fff4e0;background:radial-gradient(circle,#c0392b,#7d1d12);padding:4px 14px;border-radius:18px;box-shadow:0 2px 4px rgba(0,0,0,.4)}',
    '.zd-s-parchment .zd-text{font-family:Georgia,"Alegreya Sans",serif;font-style:italic}.zd-s-parchment .zd-more{color:#7a4a1e}',
    // 3 longhouse wood
    '.zd-s-longhouse .zd-box{background:repeating-linear-gradient(90deg,#5b3a1e 0 7px,#61401f 7px 13px),#5b3a1e;border:6px double #c79a4a;border-radius:8px;color:#fbe9c8;box-shadow:0 0 0 2px #2a1a0c,0 8px 26px rgba(0,0,0,.6),inset 0 0 40px rgba(255,170,60,.18)}',
    '.zd-s-longhouse .zd-pic{border:4px solid #c79a4a;border-radius:10px;background:#2a1a0c;color:#ffd38a}',
    '.zd-s-longhouse .zd-name{color:#2a1a0c;background:linear-gradient(180deg,#f0cf7a,#b8862e);padding:3px 12px;border-radius:3px;box-shadow:inset 0 0 0 1px #7a5418}',
    '.zd-s-longhouse .zd-more{color:#ffd38a}',
    // 4 aurora glass
    '.zd-s-aurora .zd-box{background:rgba(8,14,26,.72);backdrop-filter:blur(6px);border-radius:16px;color:#eaffff;border:2px solid transparent;background-clip:padding-box;box-shadow:0 0 0 2px rgba(120,255,200,.0)}',
    '.zd-s-aurora .zd-box:before{content:"";position:absolute;inset:-2px;border-radius:18px;padding:2px;background:linear-gradient(90deg,#3cf0a8,#4fb7ff,#b98cff,#3cf0a8);background-size:300% 100%;animation:zdAur 6s linear infinite;-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}',
    '@keyframes zdAur{to{background-position:300% 0}}',
    '.zd-s-aurora .zd-pic{border:2px solid #4fb7ff;background:rgba(10,20,40,.8);color:#7fffd4;box-shadow:0 0 16px rgba(79,183,255,.5)}',
    '.zd-s-aurora .zd-name{color:#7fffd4;text-shadow:0 0 8px rgba(60,240,168,.8)}.zd-s-aurora .zd-text{text-shadow:0 0 6px rgba(120,220,255,.35)}.zd-s-aurora .zd-more{color:#9fdfff}',
    // 5 speech bubble
    '.zd-s-bubble .zd-box{background:#fffdf6;color:#1d1d24;border:3px solid #1d1d24;border-radius:26px;box-shadow:6px 6px 0 rgba(0,0,0,.35);margin-left:48px}',
    '.zd-s-bubble .zd-box:after{content:"";position:absolute;left:-26px;bottom:24px;border:14px solid transparent;border-right:24px solid #1d1d24}',
    '.zd-s-bubble .zd-pic{position:absolute;left:-126px;bottom:-6px;border:3px solid #1d1d24;background:#ffe9a8;color:#1d1d24}',
    '.zd-s-bubble .zd-name{color:#c0392b;font-family:"Pirata One","Cinzel",serif;font-size:20px}.zd-s-bubble .zd-text{font-weight:600}.zd-s-bubble .zd-more{color:#1d1d24}',
    // 6 cinematic saga
    '.zd-s-saga .zd:before,.zd-s-saga .zd:after{content:"";position:absolute;left:0;right:0;height:13%;background:#000;animation:zdBars .3s ease-out}',
    '.zd-s-saga .zd:before{top:0}.zd-s-saga .zd:after{bottom:0;height:30%}@keyframes zdBars{from{transform:scaleY(0)}}',
    '.zd-s-saga .zd-box{z-index:2;background:none;bottom:2%;width:min(94%,980px);color:#f1ead8;text-align:center;flex-direction:column;align-items:center;min-height:0}',
    '.zd-s-saga .zd-pic{display:none}.zd-s-saga .zd-name{color:#f2c14e;font-size:16px;letter-spacing:.2em;text-transform:uppercase}',
    '.zd-s-saga .zd-text{font-family:"Marcellus SC",Georgia,serif;font-size:23px;min-height:2.9em}.zd-s-saga .zd-more{color:#c9b98a}',
    // 7 open tome
    '.zd-s-tome .zd-box{background:linear-gradient(90deg,#efe0bd 0 49.6%,#a88a58 49.6% 50.4%,#f3e6c6 50.4%);border:8px solid #5a2e1a;border-radius:6px 6px 14px 14px;color:#2e1d10;box-shadow:0 10px 24px rgba(0,0,0,.6)}',
    '.zd-s-tome .zd-pic{border-radius:6px;border:2px solid #8a6a3a;background:#e6d3a8;color:#5a2e1a;margin-left:6%}',
    '.zd-s-tome .zd-box{min-height:170px}.zd-s-tome .zd-main{position:absolute;left:53%;right:26px;top:16px}.zd-s-tome .zd-name{color:#5a2e1a;font-family:"Uncial Antiqua","Cinzel",serif;border-bottom:1px solid #8a6a3a}.zd-s-tome .zd-text{font-family:Georgia,serif}.zd-s-tome .zd-more{color:#5a2e1a}',
    // 8 Asgard gilt
    '.zd-s-gilded .zd-box{background:linear-gradient(180deg,#ffffff,#eef1f6);border:3px solid #d4a640;outline:2px solid #f6dc8a;outline-offset:-9px;border-radius:12px;color:#14306e;box-shadow:0 0 24px rgba(244,214,120,.55)}',
    '.zd-s-gilded .zd-pic{border:3px solid #d4a640;background:#fff7dc;color:#b07d10}',
    '.zd-s-gilded .zd-name{color:#8a5c00;font-family:"Cinzel Decorative","Cinzel",serif}.zd-s-gilded .zd-more{color:#8a5c00}',
    // 9 clean modern
    '.zd-s-minimal .zd-box{background:rgba(14,16,22,.82);border-radius:14px;color:#f2f4f8;min-height:104px;padding:14px 18px 26px}',
    '.zd-s-minimal .zd-pic{width:64px;height:64px;background:#2a2f3a;color:#cfd6e4;font-size:28px}.zd-s-minimal .zd-pic canvas{width:64px;height:64px}',
    '.zd-s-minimal .zd-name{font:600 13px "Alegreya Sans","Segoe UI",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#9fb0c8;background:rgba(255,255,255,.08);padding:2px 8px;border-radius:999px}',
    '.zd-s-minimal .zd-text{font-size:18px}.zd-s-minimal .zd-more{color:#9fb0c8}',
    // 10 classic RPG
    '.zd-s-classic .zd-box{background:linear-gradient(180deg,#2a3fb0,#101a62);border:4px solid #f4f4f4;outline:2px solid #222;border-radius:8px;color:#fff;margin-top:26px}',
    '.zd-s-classic .zd-pic{border-radius:4px;border:3px solid #f4f4f4;background:#18247a;color:#fff}',
    '.zd-s-classic .zd-name{position:absolute;top:-30px;left:14px;background:linear-gradient(180deg,#2a3fb0,#101a62);border:3px solid #f4f4f4;border-radius:6px;padding:2px 12px;color:#fff;font-family:"Alegreya Sans","Segoe UI",sans-serif}',
    '.zd-s-classic .zd-text{font-family:"JetBrains Mono",Consolas,monospace;font-size:17px;text-shadow:2px 2px 0 #000}.zd-s-classic .zd-more{color:#fff}'
  ].join('\n'); document.head.appendChild(s); },
  // ── one box, in a host element (the game's screen, or a card in the Lab) ──
  render:function(host,o){ ZDLG.css(); var S=ZDLG.byId(o.style||ZDLG.style), P=ZDLG.pages(o.text), cps=o.cps||S.cps||ZDLG.CPS, pi=0, idx=0, timer=null, done=false, beat=0;
    var wrap=document.createElement('div'); wrap.className='zd-s-'+S.id; wrap.style.cssText='position:absolute;inset:0;z-index:'+(o.z||0)+';pointer-events:none';
    wrap.innerHTML='<div class="zd"><div class="zd-box" role="dialog" aria-live="polite"><div class="zd-pic"></div><div class="zd-main"><div class="zd-name"></div><div class="zd-text"></div></div><div class="zd-more"></div></div></div>';
    host.appendChild(wrap); var box=wrap.querySelector('.zd-box'), pic=wrap.querySelector('.zd-pic'), tx=wrap.querySelector('.zd-text'), more=wrap.querySelector('.zd-more');
    wrap.querySelector('.zd-name').textContent=o.name||'';
    var drew=false; if(o.portrait){ var cv=document.createElement('canvas'); cv.width=96; cv.height=96; try{ drew=!!o.portrait(cv.getContext('2d'),0); }catch(e){} if(drew){ pic.appendChild(cv); var tt=0; wrap._pt=setInterval(function(){ if(!cv.isConnected)return clearInterval(wrap._pt); tt++; var x=cv.getContext('2d'); x.clearRect(0,0,96,96); try{ o.portrait(x,tt); }catch(e){} },120); } }
    if(!drew)pic.textContent=o.icon||(o.name||'?').trim().charAt(0).toUpperCase();
    var showMore=function(){ var last=pi>=P.length-1; more.innerHTML=(P.length>1?'<span>'+(pi+1)+' / '+P.length+'</span>':'')+(last?'<b>Close</b><span>Space</span>':'<b>Next</b><span class="zd-arrow">▼</span><span>Space</span>'); };
    var type=function(){ var page=P[pi]; tx.textContent=''; idx=0; done=false; more.innerHTML='';
      var step=function(){ if(!wrap.isConnected)return; if(idx>=page.length){ done=true; showMore(); return; }
        var ch=page.charAt(idx++); tx.textContent=page.slice(0,idx);
        if(/[A-Za-z]/.test(ch)&&(beat++%2===0)&&!o.silent)ZDLG.blip(o.voice||S.voice,o.name,ch,o.vol);
        var d=1000/cps; if(/[.!?…]/.test(ch))d+=260; else if(/[,;:—–]/.test(ch))d+=110;
        timer=setTimeout(step,d); };
      step(); };
    var api={ next:function(){ if(!done){ clearTimeout(timer); tx.textContent=P[pi]; done=true; showMore(); return 'shown'; }
        if(pi<P.length-1){ pi++; type(); return 'next'; } api.close(); return 'closed'; },
      close:function(){ clearTimeout(timer); clearInterval(wrap._pt); if(wrap.parentNode)wrap.parentNode.removeChild(wrap); if(o.onClose)o.onClose(); },
      el:wrap, box:box, pages:P };
    box.addEventListener('click',function(e){ e.stopPropagation(); api.next(); });
    if(o.extra&&o.extra.length){ var ex=document.createElement('div'); ex.className='zd-extra'; ex.style.cssText='position:absolute;left:22px;bottom:6px;display:flex;gap:8px;pointer-events:auto';      /* round 100: small choices under the words ("Don\'t show lessons") */
      o.extra.forEach(function(x){ var bt=document.createElement('button'); bt.type='button'; bt.textContent=x.t; bt.style.cssText='font:600 12px "Segoe UI",sans-serif;padding:3px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.35);background:rgba(10,14,20,.6);color:inherit;opacity:.85;cursor:pointer';
        bt.addEventListener('click',function(e){ e.stopPropagation(); try{ x.f(api); }catch(er){} if(x.close!==false)api.close(); }); ex.appendChild(bt); }); box.appendChild(ex); }
    type(); return api; },
  // ── in the game: one box at a time, the game paused under it ──
  root:function(){ var r=document.getElementById('zdlg'); if(!r){ r=document.createElement('div'); r.id='zdlg'; r.style.cssText='position:fixed;inset:0;z-index:420;display:none;--zdb:112px'; document.body.appendChild(r); } return r; },
  say:function(name,text,opt){ opt=opt||{}; if(typeof document==='undefined')return false;
    if(ZDLG.open){ ZDLG._q.push([name,text,opt]); return true; }
    var r=ZDLG.root(); r.style.display='block'; ZDLG.open=true; ZDLG._t0=Date.now();
    ZDLG.cur=ZDLG.render(r,{style:ZDLG.style,name:name,text:text,icon:opt.icon,portrait:opt.portrait||ZDLG.portraitFor(opt.id),z:1,extra:opt.extra,onClose:function(){ ZDLG.cur=null;
      var nx=ZDLG._q.shift(); if(nx){ ZDLG.open=false; ZDLG.say(nx[0],nx[1],nx[2]); return; }
      r.style.display='none'; ZDLG.open=false; ZDLG._closedAt=Date.now(); ZDLG.calm(); if(opt.done)try{ opt.done(); }catch(e){} }});
    return true; },
  // after the box closes, the key that closed it must not also swing the sword
  calm:function(){ try{ if(typeof game==='undefined'||!game.scene)return; game.scene.getScenes(true).forEach(function(s){ if(s.input&&s.input.keyboard)s.input.keyboard.resetKeys(); }); }catch(e){} },
  // the speaker's picture: their painted talking frames when there are any
  portraitFor:function(id){ if(!id||typeof ZAtlas==='undefined'||!ZAtlas.drawTo)return null; return function(x,t){ return ZAtlas.drawTo(x,id,['talk','idle'],'f',t,4,2,88,92); }; },
  // "Name: \"words\"" notices are someone speaking
  SPEECH:/^\s*(?:[^\w\s"“]{1,3}\s+)?([A-Z][A-Za-z'’ .\-]{1,30}?):\s*["“](.+?)["”]?\s*$/,
  parse:function(msg){ var m=ZDLG.SPEECH.exec(String(msg||'')); if(!m)return null; var w=m[2].replace(/["”]\s*$/,''); return w.length>3?{name:m[1].trim(),text:w}:null; }
};
(function(){ if(typeof location!=='undefined'){ var q=/[?&]dlg=([a-z]+)/.exec(location.search); if(q&&ZDLG.STYLES.some(function(s){ return s.id===q[1]; }))ZDLG.style=q[1]; if(/[?&]dlg=off/.test(location.search))ZDLG.on=false; } })();
// the game's own wiring (not in the Lab): keys, the pause list, who speaks through the box
if(typeof window!=='undefined')window.addEventListener('load',function(){ if(typeof game==='undefined'||typeof PAUSE_OVERLAYS==='undefined')return;
  if(PAUSE_OVERLAYS.indexOf('zdlg')<0)PAUSE_OVERLAYS.push('zdlg');      // the game waits while someone is talking
  document.addEventListener('keydown',function(e){ if(!ZDLG.open||!ZDLG.cur)return; var k=e.key;
    if(k===' '||k==='Enter'||k==='e'||k==='E'||k==='Tab'){ e.preventDefault(); e.stopImmediatePropagation(); if(!e.repeat&&Date.now()-ZDLG._t0>180)ZDLG.cur.next(); return; }
    if(k==='Escape'){ e.preventDefault(); e.stopImmediatePropagation(); ZDLG._q=[]; ZDLG.cur.close(); return; }
    e.stopImmediatePropagation(); },true);
  document.addEventListener('keyup',function(e){ if(ZDLG.open||Date.now()-(ZDLG._closedAt||0)<250){ if(e.key===' '||e.key==='Enter'||e.key==='Tab')ZDLG.calm(); } },true);
  // every "Name: \"…\"" notice is now said in the box
  if(typeof showNotif==='function'){ var n0=showNotif; showNotif=function(msg,col){ if(ZDLG.on){ var sp=ZDLG.parse(msg); if(sp){ var ws=game.scene.getScene('World'), npc=ws&&(ws._villageNPCs||[]).find(function(v){ return v.n===sp.name||String(v.n||'').split(' ')[0]===sp.name.split(' ')[0]; });
      // round 85: only a line said to you face to face opens the box — in the village beside its speaker, or inside a building; a cry in a fight or a site (a freed builder, a boss) stays a line at the top and never pauses the game
      var _ps=typeof _activePlayScene==='function'?_activePlayScene(false):null, _k=_ps&&_ps.sys.settings.key, _P=ws&&ws.player, _np=npc&&_P&&npc.x!=null?Math.hypot(npc.x-_P.x,npc.y-_P.y):1e9;
      if(!(_k==='Building'||(_k==='World'&&_np<TILE*4)))return n0.apply(this,arguments);
      ZDLG.say(sp.name,sp.text,{id:npc&&npc.id,icon:(/^\s*([^\w\s"“]{1,3})\s/.exec(String(msg))||[])[1]}); return; } } return n0.apply(this,arguments); }; window.showNotif=showNotif; }
});
