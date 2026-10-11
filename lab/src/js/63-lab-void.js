// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 46 — EMPTY SPACE tab: Kris (Oct 11): "There's quite a lot of "black" or empty space in some of the new designs. When we create these
// ║ levels think about how to make these spaces interesting and not just a bunch of black on the screen. Propose ideas to run by me".
// ║ Six ideas, each drawn round a real floor of a site with a lot of empty space (the game's own layouts, 07zx). ☆ Pick any number — they can
// ║ differ by site type (say which in the notes). Picks: 'void-<id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZSP==='undefined')return; LBR.TABS.push('void');
  var IDEAS=[['rock','Carved out of the mountain','The empty space becomes solid rock or masonry — strata, cracks, roots and ore veins painted in — so a floor looks cut out of the stone around it. Quiet, and works for every dungeon and cave.','castle_q4_b'],
    ['sky','Open sky beyond the walls','Towers, castles and cloisters stand in the sky: clouds drift by below, distant peaks and other towers far off, birds now and then. The empty space is the view from a high place.','sky_cloister'],
    ['abyss','A deep drop with depth','The dark becomes a drop: layers of fog at different depths moving at different speeds, far ledges and hanging chains and roots fading into it, dust falling. You feel how far down it goes.','mage_lightning_rod'],
    ['sea','The site\'s own element all round','Each site floats in its element: the lava sea round fire sites, dark water round water sites, a sea of clouds round storm sites, a starry void round shadow sites — all moving.','mage_ember_observatory'],
    ['stars','Night sky and aurora','For the mage towers: a deep starfield with slow aurora bands and a distant planet or two; stars twinkle and a shooting star crosses now and then.','mage_scriptorium'],
    ['frame','Frame the floor tightly','The camera keeps to the part of the floor you can walk on, and a soft painted vignette darkens the edges, so very little empty space ever shows. Works with any of the others.','mage_conductor']];
  var cache={}; function floor(id){ if(cache[id])return cache[id]; var D=ZSP.design(id,3); return (cache[id]=D?D.floors[0]:null); }
  var COLS={rock:['#3a332c','#2b2520'],sky:['#8cc4ee','#d8eefc'],abyss:['#06070c','#121826'],sea:['#ff7a2a','#7a1e08'],stars:['#05040e','#14143a']};
  function drawFloor(c,F,x0,y0,s){ var g=F.g, W=F.w; for(var y=0;y<F.h;y++)for(var x=0;x<W;x++){ var v=g[y*W+x]; if(v===0)continue; c.fillStyle=v===2||v===7?'#5a4e44':v===3?'rgba(0,0,0,0)':v===4?'#8a6440':v===5?'#7f9a74':v===6?'#6a5e50':'#bfb29a'; if(v===3)continue; c.fillRect(x0+x*s,y0+y*s,s+0.5,s+0.5); } }
  function voidMask(F,x,y){ var v=F.g[y*F.w+x]; return v===0||v===3; }
  function bg(c,F,x0,y0,s,k,t){ var W=F.w, H=F.h, w=W*s, h=H*s;
    if(k==='rock'){ c.fillStyle='#2e2924'; c.fillRect(x0,y0,w,h); for(var i=0;i<26;i++){ var yy=y0+(i*37%h); c.strokeStyle='rgba(255,230,190,'+(0.05+(i%3)*0.03)+')'; c.lineWidth=2; c.beginPath(); c.moveTo(x0,yy); for(var xx=0;xx<=w;xx+=12)c.lineTo(x0+xx,yy+Math.sin(xx*0.03+i)*5); c.stroke(); }
      for(var j=0;j<30;j++){ c.fillStyle=j%5?'rgba(120,100,80,.35)':'rgba(120,200,255,.35)'; c.beginPath(); c.arc(x0+(j*61%w),y0+(j*43%h),2+(j%4),0,6.3); c.fill(); } return; }
    if(k==='sky'){ var gr=c.createLinearGradient(0,y0,0,y0+h); gr.addColorStop(0,'#6ea8e0'); gr.addColorStop(1,'#d8eefc'); c.fillStyle=gr; c.fillRect(x0,y0,w,h); c.fillStyle='rgba(120,140,170,.55)'; c.beginPath(); c.moveTo(x0,y0+h*0.75); for(var p=0;p<=8;p++)c.lineTo(x0+w*p/8,y0+h*(0.55+((p*37)%5)*0.04)); c.lineTo(x0+w,y0+h); c.lineTo(x0,y0+h); c.fill();
      for(var q=0;q<7;q++){ var cx=x0+((q*97+t*14)%(w+80))-40, cy=y0+h*(0.2+(q%4)*0.18); c.fillStyle='rgba(255,255,255,.75)'; [0,14,28].forEach(function(o){ c.beginPath(); c.arc(cx+o,cy+(o===14?-6:0),12,0,6.3); c.fill(); }); } return; }
    if(k==='abyss'){ c.fillStyle='#04050a'; c.fillRect(x0,y0,w,h); for(var L=0;L<3;L++){ c.fillStyle='rgba(120,140,190,'+(0.06+L*0.04)+')'; for(var f=0;f<5;f++){ var fx=x0+((f*130+t*(6+L*6))%(w+120))-60, fy=y0+((f*71+L*40)%h); c.beginPath(); c.ellipse(fx,fy,60+L*20,12+L*4,0,0,6.3); c.fill(); } }
      c.strokeStyle='rgba(160,150,140,.35)'; c.lineWidth=1.5; for(var ch=0;ch<5;ch++){ var hx=x0+w*(0.15+ch*0.18); c.beginPath(); c.moveTo(hx,y0); c.lineTo(hx+Math.sin(t+ch)*4,y0+h*(0.3+ch%3*0.12)); c.stroke(); }
      for(var d=0;d<30;d++){ c.fillStyle='rgba(220,210,190,.4)'; c.fillRect(x0+(d*53%w),y0+((d*31+t*30)%h),1.5,1.5); } return; }
    if(k==='sea'){ var g2=c.createLinearGradient(0,y0,0,y0+h); g2.addColorStop(0,'#c03a10'); g2.addColorStop(1,'#5a1204'); c.fillStyle=g2; c.fillRect(x0,y0,w,h); for(var r=0;r<40;r++){ var rx=x0+(r*73%w), ry=y0+(r*41%h); c.strokeStyle='rgba(255,200,90,'+(0.25+0.2*Math.sin(t*2+r))+')'; c.lineWidth=2; c.beginPath(); c.moveTo(rx,ry); c.quadraticCurveTo(rx+10,ry-4+Math.sin(t+r)*3,rx+22,ry); c.stroke(); } return; }
    if(k==='stars'){ c.fillStyle='#05040e'; c.fillRect(x0,y0,w,h); for(var b=0;b<3;b++){ var ag=c.createLinearGradient(x0,y0+h*(0.2+b*0.25),x0+w,y0+h*(0.1+b*0.25)); ag.addColorStop(0,'rgba(80,255,180,0)'); ag.addColorStop(0.5,'rgba(80,255,180,'+(0.12+0.06*Math.sin(t*0.7+b))+')'); ag.addColorStop(1,'rgba(160,100,255,0)'); c.fillStyle=ag; c.fillRect(x0,y0+h*(0.1+b*0.25),w,30); }
      for(var st=0;st<120;st++){ c.fillStyle='rgba(255,255,255,'+(0.3+0.5*Math.abs(Math.sin(t*1.5+st)))+')'; c.fillRect(x0+(st*97%w),y0+(st*57%h),1.5,1.5); } c.fillStyle='#d8a070'; c.beginPath(); c.arc(x0+w*0.82,y0+h*0.2,14,0,6.3); c.fill(); return; }
    c.fillStyle='#000'; c.fillRect(x0,y0,w,h); }
  LBR.drawers.void=function(cv,c,W,H,t,full,id){ var I=IDEAS.find(function(x){ return x[0]===id; }); if(!I)return; var F=floor(I[3]); c.fillStyle='#000'; c.fillRect(0,0,W,H); if(!F)return;
    var s=Math.min(W/F.w,H/F.h), x0=(W-F.w*s)/2, y0=(H-F.h*s)/2;
    if(id==='frame'){ // the camera's view hugging the floor: bounds of the walkable part, then a vignette
      var bx0=F.w, by0=F.h, bx1=0, by1=0; for(var y=0;y<F.h;y++)for(var x=0;x<F.w;x++)if(!voidMask(F,x,y)){ bx0=Math.min(bx0,x); by0=Math.min(by0,y); bx1=Math.max(bx1,x); by1=Math.max(by1,y); }
      var s2=Math.min(W/(bx1-bx0+1),H/(by1-by0+1)); c.save(); c.translate(-bx0*s2+(W-(bx1-bx0+1)*s2)/2,-by0*s2+(H-(by1-by0+1)*s2)/2); bg(c,F,0,0,s2,'abyss',t); drawFloor(c,F,0,0,s2); c.restore();
      var vg=c.createRadialGradient(W/2,H/2,Math.min(W,H)*0.3,W/2,H/2,Math.max(W,H)*0.62); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.75)'); c.fillStyle=vg; c.fillRect(0,0,W,H); return; }
    bg(c,F,x0,y0,s,id,t); drawFloor(c,F,x0,y0,s);
    c.fillStyle='rgba(0,0,0,.55)'; c.fillRect(6,H-22,W*0.6,16); c.fillStyle='#e8f0fa'; c.font='11px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText('shown on: '+(ZSP.T[I[3]]?ZSP.T[I[3]].n:I[3]),10,H-10); };
  LAB_TABS.push({ id:'void', name:'Empty space',
    blurb:'<b>Round 46 — what to do with the empty (black) space round the new floors.</b> Six ideas, each drawn round a real floor that has a lot of it. ☆ Pick any number; they can differ by kind of site (towers, castles, mage towers, dungeons, island crypts) — say which in the notes. The rest of this round\'s site changes are in Site review.',
    designs:IDEAS.map(function(I){ return {id:I[0],name:I[1]}; }),
    render:function(){ setTimeout(LBR.bind,0); return LBR.sec('Six ideas','pick any number')+'<div class="br-grid br-wide">'+IDEAS.map(function(I,i){ return LBR.card('void',{id:I[0],name:I[1],desc:I[2]},i,560,360,''); }).join('')+'</div>'; } });
})();
