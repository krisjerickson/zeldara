// ═══════════════════════════════════════════════════════════════════════
// ║ 79l-lab-bossfx.js — round 90: PAINTED BOSS ATTACKS (the request, then the paintings to review).
// ║ One card per family (src/js/07zt9-art-r90.js ZBFX_ART): which bosses use it, its seven pieces and where each goes in an attack.
// ║ Until the pictures are in, the card shows the seven cells with their words; once painted (preview/bossfx/<sheet>.webp) it shows the
// ║ painted sheet with its strike beside it. ☆ the families you like; notes for changes. Picks: 'bossfx-<family>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined'||typeof ZBFX_ART==='undefined')return;
  var A=ZBFX_ART, IMG={}, img=function(src){ if(IMG[src])return IMG[src]; var im=new Image(); im._ok=false; im.onload=function(){ im._ok=true; }; im.onerror=function(){ im._bad=true; }; im.src=src; IMG[src]=im; return im; };
  var WHERE={mark:'the warning before a strike (sky rain, the leaping combo, the hunting trail)',impact:'where a strike lands',patch:'the floor takeover, and what a strafing run leaves behind',
    band:'the sweeping wall, piece after piece',beam:'each ray of the radial burst and the rotating beams',ring:'the shockwave ring of a quake',strike:'what falls in the sky rain'};
  // which bosses use which family (from their attack themes)
  var users=function(fam){ if(typeof BOSS_ATTACKS==='undefined')return []; return Object.keys(BOSS_ATTACKS).filter(function(k){ var B=BOSS_ATTACKS[k], all=[].concat(B.desp||[]); (B.phases||[]).forEach(function(p){ all=all.concat(p); });
    return all.some(function(a){ var th=String(a).split(':')[1]; return th&&A.THEME[th]===fam; }); }).map(function(k){ return k.replace(/_/g,' '); }); };
  var wrap=function(c,txt,x,y,w,lh,max){ var words=txt.split(' '), line='', n=0; for(var i=0;i<words.length;i++){ var tl=line?line+' '+words[i]:words[i]; if(c.measureText(tl).width>w&&line){ c.fillText(line,x,y+n*lh); n++; line=words[i]; if(n>=max)return; } else line=tl; } if(line&&n<max)c.fillText(line,x,y+n*lh); };
  LBR.TABS.push('bossfx');
  LBR.drawers.bossfx=function(cv,c,W,H,t,full,id){ var F=A.fam(id); if(!F)return; c.fillStyle='#0c0e14'; c.fillRect(0,0,W,H);
    var sh=img('preview/bossfx/'+A.sheet(id)+'.webp'), st=img('preview/bossfx/'+A.id(id,'strike')+'.webp'), sw=W*0.8;
    if(sh._ok){ var k=Math.min(sw/sh.width,H/sh.height); c.drawImage(sh,(sw-sh.width*k)/2,(H-sh.height*k)/2,sh.width*k,sh.height*k);
      if(st._ok){ var k2=Math.min((W-sw-8)/st.width,(H-20)/st.height); c.drawImage(st,sw+4+((W-sw-8)-st.width*k2)/2,(H-st.height*k2)/2,st.width*k2,st.height*k2); } return; }
    // not painted yet: the seven cells and their words, glowing in the family's colour
    var cw=sw/3, ch=H/2, pulse=0.5+0.5*Math.sin(t*2);
    A.ROLES.forEach(function(r,i){ var x=i<6?(i%3)*cw:sw, y=i<6?Math.floor(i/3)*ch:0, w=i<6?cw:W-sw, h=i<6?ch:H;
      var g=c.createRadialGradient(x+w/2,y+h/2,4,x+w/2,y+h/2,Math.max(w,h)*0.6); g.addColorStop(0,F[2]+'55'); g.addColorStop(1,'rgba(0,0,0,0)'); c.globalAlpha=0.6+0.4*pulse; c.fillStyle=g; c.fillRect(x,y,w,h); c.globalAlpha=1;
      c.strokeStyle='rgba(255,255,255,0.08)'; c.strokeRect(x+0.5,y+0.5,w-1,h-1);
      c.fillStyle=F[2]; c.font='600 '+(full?16:11)+'px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText(A.ROLE_NAME[r],x+8,y+(full?22:16));
      c.fillStyle='#b9c8d8'; c.font=(full?14:10)+'px "Segoe UI",sans-serif'; wrap(c,F[4][i],x+8,y+(full?44:30),w-16,full?18:12,i<6?5:16); });
    c.fillStyle='rgba(8,10,16,0.8)'; c.fillRect(0,H-22,sw,22); c.fillStyle='#ffd27a'; c.font=(full?14:11)+'px "Segoe UI",sans-serif'; c.fillText('Waiting for the painting — .\\tools\\sprites\\redo.ps1 -List bossfx',8,H-7); };
  LAB_TABS.push({ id:'bossfx', name:'Painted boss attacks',
    blurb:'<b>Round 90 — the bosses\' area attacks, painted.</b> Today the screen-wide attacks are flat coloured blocks and circles. Each boss\'s attacks have a theme, and the themes fall into eight families — fire and lava, earth and stone, lightning, bog and poison, frost and tide, shadow and void, iron and blades, gold and light — and Surtharn and Solmyrk have their own. Every family gets seven painted pieces: the warning sigil, the impact, the deadly ground, a length of the sweeping wall, a beam, the shockwave ring and the falling strike. ☆ the families you like and write notes for changes; once you\'re happy, they go into the fights.',
    designs:A.FAM.map(function(F){ return {id:F[0],name:F[1]}; }),
    render:function(){ setTimeout(LBR.bind,0);
      return LBR.sec('Ten families','12 sheets, 70 pieces · the request: .\\tools\\sprites\\redo.ps1 -List bossfx')+'<div class="br-grid">'+A.FAM.map(function(F,i){ var U=users(F[0]);
        var desc='<b>Used by:</b> '+F[3]+(U.length&&F[0]!=='surt'&&F[0]!=='sol'?' <i>('+U.join(', ')+')</i>':'')+'<br>'+A.ROLES.map(function(r,j){ return '<b>'+A.ROLE_NAME[r]+'</b> — '+F[4][j]+' <i>· '+WHERE[r]+'</i>'; }).join('<br>');
        return LBR.card('bossfx',{id:F[0],name:F[1],col:F[2],desc:desc},i,640,300,''); }).join('')+'</div>'; } });
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('bossfx');
  if(typeof LTODO!=='undefined')LTODO.add({id:'bossfx',label:'🔥 Review the painted boss attacks (ten families)',where:'Painted boss attacks tab · ☆ and notes, once painted',done:function(){ return A.FAM.some(function(F){ return LBR.picked('bossfx',F[0]); }); },go:function(){ LTODO.goTo('bossfx','.br-grid',0); }});
})();
