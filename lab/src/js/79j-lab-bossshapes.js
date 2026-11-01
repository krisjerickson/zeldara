// ═══════════════════════════════════════════════════════════════════════
// ║ 79j-lab-bossshapes.js — round 85 (B3, answered "Lab first"): TWELVE NEW SHAPES FOR THE BOSSES' SCREEN-WIDE ATTACKS.
// ║ Kris: "These screen-wide attacks are also the same for almost all bosses, and variety needs to be added. We can use different shapes and
// ║ geometries for the safe vs. attack areas." Each card plays its attack over a boss arena seen from above: the warning (faint, outlined),
// ║ the strike (bright), a breath, again — and measures, at the strike, how much of the screen is safe and in how many separate places
// ║ (every one keeps ≥ 30 % safe in two or more places, the rule of BossPat.SAFE since round 84c). The hero (the white dot) runs to safety.
// ║ ☆ the ones you want and write in the notes which bosses should have them (or "any fire boss", "the Ashlands" …). Picks: 'bshape-<id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined')return;
  var A=16/9, BX=A/2, BY=0.42, TAU=Math.PI*2, CYC=4.2;
  var h1=function(n){ var s=Math.sin(n*127.1+311.7)*43758.5453; return s-Math.floor(s); };
  var d2=function(x,y,a,b){ return Math.hypot(x-a,y-b); };
  // hz(x, y, k, p): is (x, y) struck? x 0…A, y 0…1; k = which cycle (the pattern moves on each time), p = 0…1 through the cycle
  var S=[
    {id:'rings',name:'Rune rings',col:'#6fe3f5',for:'frost and rune bosses, the mage-tower masters',desc:'Concentric bands of runes ripple out from the boss; the dark bands between them are safe — step outward with the ripple.',
      hz:function(x,y,k,p){ var d=d2(x,y,BX,BY); return Math.floor(d*7-p*1.6+k*0.5)%2===0; }},
    {id:'checker',name:'Runestone checker',col:'#f2c14e',for:'the castle wardens, Asgard',desc:'The floor becomes a board of runestones; every other square erupts, then the board flips — two quick steps to the next safe square.',
      hz:function(x,y,k,p){ var i=Math.floor(x*4.5), j=Math.floor(y*4.5); return (i+j+(p>0.62?1:0)+k)%2===0; }},
    {id:'islands',name:'Islands of safety',col:'#ff7030',for:'fire and lava bosses (Lava Titan, Surtharn), the frost witch with ice',desc:'The whole floor floods with fire (or frost) except five glowing circles that drift slowly — reach one and ride it.',
      hz:function(x,y,k,p){ for(var i=0;i<5;i++){ var cx=0.2+(i+0.5)/5*(A-0.4)+(h1(k*5+i)-0.5)*0.12, cy=(i%2?0.28:0.7)+(h1(k*9+i*3)-0.5)*0.16, ox=Math.cos(p*TAU*0.5+i)*0.04; if(d2(x,y,cx+ox,cy)<0.225)return false; } return true; }},
    {id:'spiral',name:'Spiral arms',col:'#c28bff',for:'void and shadow bosses, the Shadow Lord',desc:'Three arms of light spiral out from the boss and turn; walk round with the dark gaps between them.',
      hz:function(x,y,k,p){ var d=d2(x,y,BX,BY), a=Math.atan2(y-BY,x-BX), ph=a*3-d*9+p*3.2+k; var s=Math.sin(ph); return s>0.15||d<0.1; }},
    {id:'cross',name:'Cross and saltire',col:'#fff0b0',for:'light and holy bosses, Grimnir',desc:'Beams strike in a + from the boss, then in an ×; the four wedges between them are safe, then the next four.',
      hz:function(x,y,k,p){ var a=Math.atan2(y-BY,x-BX)+(p>0.6?Math.PI/4:0)+(k%2)*Math.PI/8, d=d2(x,y,BX,BY), w=Math.abs(Math.sin(2*a))*d; return Math.abs(Math.cos(2*a))>0.82||d<0.06; }},
    {id:'jaws',name:'Closing jaws',col:'#9a8a78',for:'stone and earth bosses (Rock Dragon, Iron Sentinel)',desc:'Walls of stone grind in from the sides and the middle and stop, leaving two gaps that wander up and down — stay in a gap as it moves.',
      hz:function(x,y,k,p){ var g1=A*(0.22+0.12*h1(k)), g2=A*(0.66+0.12*h1(k+7)), half=A*0.1, wob=Math.sin(y*6+p*4+k)*0.06; return Math.abs(x-(g1+wob))>half&&Math.abs(x-(g2-wob))>half; }},
    {id:'hex',name:'Hex comb',col:'#a0ff60',for:'insect and poison bosses (the Swamp Witch, the Hive Queen)',desc:'The floor is a honeycomb; the cells light up in waves and burst, the safe ones marked with a glowing rune.',
      hz:function(x,y,k,p){ var s=0.12, q=Math.round(x/(s*1.5)), r=Math.round((y-(q%2?s*0.866:0))/(s*1.732)); return h1(q*17+r*31+k*7)>0.42; }},
    {id:'shadows',name:'Falling shadows',col:'#ffb070',for:'sky and dragon bosses, the volcano',desc:'Meteors fall from above: their shadows grow on the floor before they land (about a third of it) — stand in the light.',
      hz:function(x,y,k,p){ var g=Math.min(1,p/0.5); for(var i=0;i<9;i++){ var cx=h1(k*13+i)*A, cy=h1(k*7+i*5)*1; if(d2(x,y,cx,cy)<0.15*g+0.03)return true; } return false; }},
    {id:'shelter',name:'Shelter from the storm',col:'#c0f0ff',for:'storm and ice bosses (Storm Drake, the Frost Witch), giants',desc:'A gale of fire or ice blows from one side; the boss raises four standing stones — the lee behind each is safe, and so is the far edge.',
      hz:function(x,y,k,p){ if(x>A-0.18)return false; var P=[[0.45,0.25],[0.75,0.7],[1.05,0.3],[1.35,0.68]]; for(var i=0;i<4;i++){ var px=P[i][0], py=P[i][1]; if(x>px&&Math.abs(y-py)<0.11+(x-px)*0.12)return false; } return true; }},
    {id:'aurora',name:'Aurora curtains',col:'#5ff7d2',for:'the Bifröst, Asgard, the spirit bosses',desc:'Curtains of aurora light drift across the arena at different speeds; between them is safe, and the gaps open and close.',
      hz:function(x,y,k,p){ for(var i=0;i<4;i++){ var sp=0.25+h1(k*3+i)*0.5, cx=((h1(i*7+k)+p*sp*(i%2?1:-1))%1+1)%1*A; if(Math.abs(x-cx-Math.sin(y*5+i)*0.05)<0.13)return true; } return false; }},
    {id:'heartbeat',name:'Heartbeat',col:'#ff6080',for:'the Spirit Drain bosses, Solmyrk, the last forms',desc:'The boss beats like a heart: first everything far from it is struck (come close), then everything near it (run out) — in, out.',
      hz:function(x,y,k,p){ var d=d2(x,y,BX,BY), out=(p<0.62)===(k%2===0); return out?d>0.52:d<0.42; }},
    {id:'mirror',name:'Mirror halves',col:'#e0c0ff',for:'the Mirror and Trickster bosses, the mage-tower masters',desc:'Blocks strike on one half of the arena, and a beat later the same blocks strike mirrored on the other half — read one side to know the other.',
      hz:function(x,y,k,p){ var left=x<BX, mx=left?x:A-x, i=Math.floor(mx*5.5), j=Math.floor(y*5); var on=h1(i*11+j*5+k*3)>0.55; if(!on)return false; return left?(p<0.6):(p>=0.6); }}
  ];
  var BYID={}; S.forEach(function(s){ BYID[s.id]=s; });
  var rgb=function(h){ var m=/^#?(..)(..)(..)/.exec(h); return [parseInt(m[1],16),parseInt(m[2],16),parseInt(m[3],16)]; };
  // how much is safe at the strike, and in how many separate places (flood fill on the grid; a place counts if ≥ 2 % of the floor)
  var measure=function(s,k,p,GW,GH){ var g=new Uint8Array(GW*GH), safe=0; for(var j=0;j<GH;j++)for(var i=0;i<GW;i++){ var hz=s.hz((i+0.5)/GW*A,(j+0.5)/GH,k,p); g[j*GW+i]=hz?1:0; if(!hz)safe++; }
    var seen=new Uint8Array(GW*GH), places=0, best=null, bn=0;
    for(var q=0;q<GW*GH;q++){ if(g[q]||seen[q])continue; var st=[q], n=0, sx=0, sy=0; seen[q]=1; while(st.length){ var c=st.pop(), ci=c%GW, cj=(c/GW)|0; n++; sx+=ci; sy+=cj;
        [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var ni=ci+d[0], nj=cj+d[1]; if(ni<0||nj<0||ni>=GW||nj>=GH)return; var nq=nj*GW+ni; if(!g[nq]&&!seen[nq]){ seen[nq]=1; st.push(nq); } }); }
      if(n>=GW*GH*0.02){ places++; if(n>bn){ bn=n; best=[(sx/n+0.5)/GW*A,(sy/n+0.5)/GH]; } } }
    return {share:safe/(GW*GH), places:places, spot:best}; };
  var M={}, HERO={};
  LBR.TABS.push('bshape');
  LBR.drawers.bshape=function(cv,c,W,H,t,full,id){ var s=BYID[id]; if(!s)return; var cyc=t/CYC, k=Math.floor(cyc), p=cyc-k, col=rgb(s.col);
    var key=id+'|'+k; if(!M[key]){ M[key]=measure(s,k,0.55,96,54); var m2=measure(s,k,0.75,96,54); if(m2.share<M[key].share){ M[key].share=m2.share; } M[key].places=Math.min(M[key].places,m2.places||M[key].places); }
    var mz=M[key];
    // the arena
    var g=c.createRadialGradient(W/2,H*0.45,10,W/2,H*0.45,W*0.7); g.addColorStop(0,'#2a2a34'); g.addColorStop(1,'#101016'); c.fillStyle=g; c.fillRect(0,0,W,H);
    c.strokeStyle='rgba(255,255,255,0.04)'; c.lineWidth=1; for(var gx=0;gx<W;gx+=W/16){ c.beginPath(); c.moveTo(gx,0); c.lineTo(gx,H); c.stroke(); } for(var gy=0;gy<H;gy+=H/9){ c.beginPath(); c.moveTo(0,gy); c.lineTo(W,gy); c.stroke(); }
    // the attack: warning 0–0.45 (faint + edge), strike 0.45–0.8 (bright), rest
    var warn=p<0.45, strike=p>=0.45&&p<0.8, a=warn?0.1+0.22*(p/0.45):strike?0.62:Math.max(0,0.62*(1-(p-0.8)/0.2)), GW=full?160:80, GH=Math.round(GW*H/W), cw=W/GW, ch=H/GH;
    if(a>0.01){ for(var j=0;j<GH;j++)for(var i=0;i<GW;i++){ var x=(i+0.5)/GW*A, y=(j+0.5)/GH; if(!s.hz(x,y,k,p))continue;
        var fl=strike?0.85+0.15*Math.sin(t*20+i*0.7+j*0.4):1; c.fillStyle='rgba('+col[0]+','+col[1]+','+col[2]+','+(a*fl).toFixed(3)+')'; c.fillRect(i*cw,j*ch,cw+0.6,ch+0.6); } }
    if(strike){ c.globalCompositeOperation='lighter'; c.fillStyle='rgba('+col[0]+','+col[1]+','+col[2]+',0.08)'; c.fillRect(0,0,W,H); c.globalCompositeOperation='source-over'; }
    // the boss
    var bx=BX/A*W, by=BY*H, br=Math.min(W,H)*0.06, bg=c.createRadialGradient(bx,by,2,bx,by,br*2.4); bg.addColorStop(0,'rgba('+col[0]+','+col[1]+','+col[2]+',0.55)'); bg.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=bg; c.beginPath(); c.arc(bx,by,br*2.4,0,TAU); c.fill();
    c.fillStyle='#3a2a2a'; c.beginPath(); c.arc(bx,by,br,0,TAU); c.fill(); c.strokeStyle=s.col; c.lineWidth=2; c.stroke(); c.fillStyle='#ffe0a0'; c.fillRect(bx-br*0.45,by-br*0.2,br*0.25,br*0.18); c.fillRect(bx+br*0.2,by-br*0.2,br*0.25,br*0.18);
    // the hero runs to the biggest safe place
    var hp=HERO[id]||(HERO[id]={x:A*0.3,y:0.75}), want=mz.spot||[A*0.2,0.8], kk=Math.min(1,0.05); hp.x+=(want[0]-hp.x)*kk; hp.y+=(want[1]-hp.y)*kk;
    var hx=hp.x/A*W, hy=hp.y*H, hit=strike&&s.hz(hp.x,hp.y,k,p); c.fillStyle=hit?'#ff4040':'#ffffff'; c.beginPath(); c.arc(hx,hy,Math.max(4,W/110),0,TAU); c.fill(); c.strokeStyle='#0a0a10'; c.lineWidth=2; c.stroke();
    // the measure
    c.fillStyle='rgba(8,10,16,0.78)'; c.fillRect(8,H-30,W*0.62,22); var ok=mz.share>=0.3&&(mz.places>=2||mz.share>=0.4); c.fillStyle=ok?'#9fe8a0':'#ffb080'; c.font=(full?18:12)+'px "Segoe UI",sans-serif'; c.textAlign='left';
    c.fillText('safe '+Math.round(mz.share*100)+' % · '+(mz.places>=2?mz.places+' places':'one wide open area')+' · '+(warn?'warning':strike?'STRIKE':'breath'),14,H-14); };
  LAB_TABS.push({ id:'bshape', name:'Boss attack shapes',
    blurb:'<b>Round 85 — twelve new shapes for the bosses\' screen-wide attacks</b> (you asked for variety; answered "Lab first"). Each card plays its attack over an arena seen from above — the faint warning, the strike, a breath — and measures at the strike how much of the screen is safe and in how many separate places (all keep at least 30 % safe, in two or more places or one wide open area of 40 % or more). The white dot is you. <b>☆ the ones you want</b> and write in the notes which bosses should have them; the suggestion under each title is only a starting point.',
    designs:S.map(function(s){ return {id:s.id,name:s.name}; }),
    render:function(){ setTimeout(LBR.bind,0); return LBR.sec('Twelve attack shapes','warning · strike · breath — the share safe is measured live')+'<div class="br-grid">'+S.map(function(s,i){ return LBR.card('bshape',{id:s.id,name:s.name,col:s.col,desc:s.desc+' <i>Suggested for: '+s.for+'.</i>'},i,560,315,''); }).join('')+'</div>'; } });
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('bshape');
  if(typeof LTODO!=='undefined')LTODO.add({id:'bshape',label:'⚔ Pick the new boss attack shapes (and which bosses get them)',where:'Boss attack shapes tab · ☆ and notes',done:function(){ return S.some(function(s){ return LBR.picked('bshape',s.id); }); },go:function(){ LTODO.goTo('bshape','.br-grid',0); }});
  window.ZBSHAPE={S:S,measure:measure};      // for the tests
})();
