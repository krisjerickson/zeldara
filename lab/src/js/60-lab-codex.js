// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 44 — HOW IT ALL FITS tab: ideas for showing the player how elements, monsters, spells, skills and the parts of the world work
// ║ together. Kris (Oct 10): "i'm thinking of other ways to show and visualize how all the elements, monsters, spells, skills and sections
// ║ of the game can be shows for the player to better understand how all this works together. Perhaps some sort of skills tree. Come up with
// ║ ideas of how to represent this". Six ideas, each a moving sketch built from the game's real data (07*, 03b). ☆ Pick any number;
// ║ notes per card. Picks: 'codex-<id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZEL==='undefined')return; LBR.TABS.push('codex');
  var E=ZEL.E, L=ZEL.LIST, col=function(e){ return E[e]?E[e].col:'#bbb'; };
  var IDEAS=[
    ['stars','A constellation skill tree','The night sky of Zeldara: each realm is a constellation, each star something to learn or win — skills (castles), spells (mage towers), familiar lessons, forge steps, the Sovereign pieces. Lines show what opens what; won stars shine, the next ones twinkle. Opened from the Tome or the pause screen.'],
    ['compass','The elemental compass','One big wheel: the six elements in the middle, then rings outward — your weapons, spells and familiars of each element, then the monster families of each. Gaps glow red: "nothing against Earth yet". It answers "what should I forge next?" at a glance.'],
    ['grid','The matchup grid','Rows: everything you can hit with (each weapon, spell, familiar). Columns: the kinds of foes by element. Each cell coloured Bane, Weak, even, Resists, Warded. Pick a monster in the Tome and its column lights up.'],
    ['realms','The realm map overlay','The world map tinted by each region\'s main element, with every site marked by what it teaches or gives (a skill, a spell, a mount, a craftsman) and arrows for the road through the realms. A switch on the map (B).'],
    ['journey','The journey line','A long road across the four realms, left to right: towers, dungeons, castles, mage towers, fairies and sky ports as milestones; under each, what it unlocks. Your marker shows where you are and what is next.'],
    ['web','The rune web','Everything as one web: pick a node (say Fire) and its threads light up — the monsters weak to it, its weapons, spells, familiar, gem, realm and the bosses that use it. For players who like to explore how things connect.']];
  var mons=function(){ if(mons._v)return mons._v; var c={}; (typeof MON_ROSTER!=='undefined'?MON_ROSTER:[]).forEach(function(R){ var e=(typeof MON_EL!=='undefined'&&MON_EL[R.id])||[]; var k=e.length===1?e[0]:e.length?'dual':'none'; c[k]=(c[k]||0)+1; }); return (mons._v=c); };
  var bg=function(c,W,H,a,b){ var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,a); g.addColorStop(1,b); c.fillStyle=g; c.fillRect(0,0,W,H); };
  var txt=function(c,s,x,y,sz,cl,al){ c.fillStyle=cl||'#e8f0fa'; c.font=(sz||11)+'px "Segoe UI",sans-serif'; c.textAlign=al||'center'; c.fillText(s,x,y); };
  var dot=function(c,x,y,r,cl,a){ c.globalAlpha=a===undefined?1:a; c.fillStyle=cl; c.beginPath(); c.arc(x,y,r,0,6.3); c.fill(); c.globalAlpha=1; };
  var D={
    stars:function(c,W,H,t){ bg(c,W,H,'#070a18','#141a34'); for(var i=0;i<120;i++){ var x=(i*97%W), y=(i*57%H); dot(c,x,y,0.8,'#ffffff',0.3+0.3*Math.sin(t*2+i)); }
      var QN=['Grasslands','Wetlands','Highlands','Ashlands'], el=['grass','water','earth','fire'];
      for(var q=0;q<4;q++){ var cx=W*(0.15+q*0.235), cy=H*(0.5+(q%2?-0.12:0.1)), pts=[]; for(var k=0;k<7;k++){ var a=k*0.9+q, r=28+(k%3)*20; pts.push([cx+Math.cos(a)*r*1.2,cy+Math.sin(a)*r]); }
        c.strokeStyle=col(el[q]); c.globalAlpha=0.5; c.lineWidth=1.2; c.beginPath(); pts.forEach(function(p,i){ c[i?'lineTo':'moveTo'](p[0],p[1]); }); c.stroke(); c.globalAlpha=1;
        pts.forEach(function(p,i){ var won=i<(q===0?6:q===1?3:1), nxt=i===(q===0?6:q===1?3:1); dot(c,p[0],p[1],won?5:3.5,won?'#fff6c8':col(el[q]),won?1:nxt?0.5+0.5*Math.sin(t*5):0.45); if(won)dot(c,p[0],p[1],10,'#fff6c8',0.15); });
        txt(c,QN[q],cx,H-14,11,col(el[q])); }
      txt(c,'★ won   ✦ next   · still to find',W-10,18,11,'#cfe0f4','right'); },
    compass:function(c,W,H,t){ bg(c,W,H,'#efe4c8','#e2d4b0'); var cx=W/2, cy=H/2+6, M=mons();
      L.forEach(function(e,i){ var a0=-Math.PI/2+i*Math.PI/3-Math.PI/6, a1=a0+Math.PI/3; [[34,70,0.55],[72,112,0.35],[114,150,0.22]].forEach(function(r,j){ c.fillStyle=col(e); c.globalAlpha=r[2]; c.beginPath(); c.arc(cx,cy,r[1],a0,a1); c.arc(cx,cy,r[0],a1,a0,true); c.fill(); c.globalAlpha=1; });
        var am=(a0+a1)/2; txt(c,E[e].em,cx+Math.cos(am)*52,cy+Math.sin(am)*52+5,15);
        var nW=Object.keys(ITEMS).filter(function(k){ var I=ITEMS[k]; return I.el&&I.el!=='all'&&I.el.indexOf(e)>=0&&/Hand|Weapon/.test(I.slot||''); }).length; txt(c,nW+' arms',cx+Math.cos(am)*93,cy+Math.sin(am)*93+4,10,'#2a2018');
        txt(c,(M[e]||0)+' foes',cx+Math.cos(am)*132,cy+Math.sin(am)*132+4,10,'#2a2018');
        if(e==='earth'){ c.strokeStyle='#d02020'; c.lineWidth=2.5; c.globalAlpha=0.5+0.5*Math.sin(t*4); c.beginPath(); c.arc(cx,cy,92,a0+0.05,a1-0.05); c.stroke(); c.globalAlpha=1; } });
      txt(c,'inner: elements · middle: your weapons, spells, familiars · outer: monsters',cx,16,11,'#3a2a18'); txt(c,'red: nothing of yours against Earth yet',cx,H-8,11,'#a01818'); },
    grid:function(c,W,H,t){ bg(c,W,H,'#0e1422','#151d30'); var rows=['Iron Sword','Flame Iron','Glacier Sword','Briar Axe','Stormfire Blade','Frost Bolt','Fire spirit'], re=[[],['fire'],['water'],['grass'],['fire','storm'],['water'],['fire']], cols=L.concat(['dual']), x0=110, y0=40, cw=(W-x0-10)/cols.length, rh=(H-y0-10)/rows.length;
      cols.forEach(function(e,j){ txt(c,e==='dual'?'2-el':E[e].em,x0+cw*(j+0.5),y0-10,13); });
      rows.forEach(function(r,i){ txt(c,r,x0-8,y0+rh*(i+0.62),11,'#cfe0f4','right'); cols.forEach(function(e,j){ var v=0; var any=false; re[i].forEach(function(a){ if(e==='dual')return; var r=a===e?-1:ZEL.rel(a,e); if(!any){ v=r; any=true; } else v=Math.max(v,r); }); if(e==='dual'&&re[i].length>1)v=1; var cl=v>0?'#3fbf6a':v<0?'#c84a3a':'#5a6478'; c.fillStyle=cl; c.globalAlpha=v===0?0.35:0.85; c.fillRect(x0+cw*j+2,y0+rh*i+2,cw-4,rh-4); c.globalAlpha=1; txt(c,v>0?'▲':v<0?'▽':'·',x0+cw*(j+0.5),y0+rh*(i+0.66),12,'#fff'); }); });
      var hl=Math.floor(t/1.5)%cols.length; c.strokeStyle='#ffe9a8'; c.lineWidth=2; c.strokeRect(x0+cw*hl+1,y0+1,cw-2,rh*rows.length-2); },
    realms:function(c,W,H,t){ bg(c,W,H,'#0f3764','#16487c'); var cx=W/2, cy=H/2, el=['grass','water','earth','fire'], quads=[[-1,-1],[1,-1],[-1,1],[1,1]];
      quads.forEach(function(q,i){ c.fillStyle=col(el[i]); c.globalAlpha=0.55; c.beginPath(); c.ellipse(cx+q[0]*W*0.2,cy+q[1]*H*0.2,W*0.2,H*0.22,0,0,6.3); c.fill(); c.globalAlpha=1;
        ['★','⚔','✨','🏰'].forEach(function(s,k){ txt(c,s,cx+q[0]*W*0.2+(k-1.5)*26,cy+q[1]*H*0.2+(k%2?10:-6),14); }); txt(c,['Grasslands','Wetlands','Highlands','Ashlands'][i]+' — '+E[el[i]].n,cx+q[0]*W*0.2,cy+q[1]*H*0.2+H*0.17,11,'#fff'); });
      c.strokeStyle='#ffe9a8'; c.setLineDash([6,5]); c.lineDashOffset=-t*20; c.lineWidth=2.5; c.beginPath(); c.moveTo(cx-W*0.2,cy-H*0.2); c.lineTo(cx+W*0.2,cy-H*0.2); c.lineTo(cx-W*0.2,cy+H*0.2); c.lineTo(cx+W*0.2,cy+H*0.2); c.stroke(); c.setLineDash([]);
      dot(c,cx,cy,12,'#f4ecd8'); txt(c,'village',cx,cy+24,10,'#fff'); },
    journey:function(c,W,H,t){ bg(c,W,H,'#efe4c8','#d8c8a0'); var y=H*0.42, el=['grass','water','earth','fire']; c.strokeStyle='#8a6a3a'; c.lineWidth=6; c.beginPath(); c.moveTo(20,y); c.bezierCurveTo(W*0.3,y-40,W*0.6,y+40,W-20,y); c.stroke();
      var ms=[['🗼','Tower','frees Bram'],['🕳','Dungeon','a mount'],['🏰','Castle','Sprint'],['🔮','Mage tower','a spell'],['🧚','Fairy','a lesson'],['🗼','Tower','opens Wetlands'],['🏰','Castle','Shield bash'],['☁','Sky port','fly']];
      ms.forEach(function(m,i){ var u=(i+0.5)/ms.length, x=20+u*(W-40), yy=y+Math.sin(u*Math.PI*2)*-20; dot(c,x,yy,13,i<3?'#3a8a3a':'#8a7a5a'); txt(c,m[0],x,yy+5,13); txt(c,m[1],x,yy+30,10,'#3a2a18'); txt(c,m[2],x,yy+44,10,'#6a5030'); });
      var u=(Math.sin(t*0.5)*0.5+0.5)*0.35+0.05, hx=20+u*(W-40); dot(c,hx,y-30+Math.sin(t*4)*3,7,'#2f9e8e'); txt(c,'you',hx,y-42,10,'#2f9e8e');
      el.forEach(function(e,i){ c.fillStyle=col(e); c.globalAlpha=0.25; c.fillRect(i*W/4,H-22,W/4,22); c.globalAlpha=1; txt(c,['Grasslands','Wetlands','Highlands','Ashlands'][i],i*W/4+W/8,H-7,11,'#3a2a18'); }); },
    web:function(c,W,H,t){ bg(c,W,H,'#0b0f18','#121a2a'); var cx=W/2, cy=H/2, sel=L[Math.floor(t/2.5)%L.length], nodes=[];
      L.forEach(function(e,i){ var a=i/L.length*Math.PI*2-Math.PI/2; nodes.push({x:cx+Math.cos(a)*60,y:cy+Math.sin(a)*52,l:E[e].em,c:col(e),k:'el',e:e}); });
      var kinds=[['⚔','weapon'],['✨','spell'],['🧚','familiar'],['💎','gem'],['👹','monster'],['👑','boss'],['🗺','realm']];
      L.forEach(function(e,i){ kinds.forEach(function(k,j){ var a=(i+j/kinds.length)/L.length*Math.PI*2-Math.PI/2; nodes.push({x:cx+Math.cos(a)*(W*0.36),y:cy+Math.sin(a)*(H*0.38),l:k[0],c:col(e),k:k[1],e:(k[1]==='monster')?E[e].beats:e}); }); });
      nodes.forEach(function(n){ if(n.k==='el')return; var on=n.e===sel, from=nodes.find(function(m){ return m.k==='el'&&m.e===(n.k==='monster'?L.find(function(x){ return E[x].beats===n.e; }):n.e); }); if(!from)return; c.strokeStyle=on?'#ffe9a8':'rgba(150,170,200,.12)'; c.lineWidth=on?1.6:1; c.beginPath(); c.moveTo(from.x,from.y); c.lineTo(n.x,n.y); c.stroke(); });
      nodes.forEach(function(n){ var on=n.e===sel||(n.k==='el'&&n.e===sel); dot(c,n.x,n.y,n.k==='el'?13:8,n.c,on?1:0.35); txt(c,n.l,n.x,n.y+(n.k==='el'?5:4),n.k==='el'?13:9); });
      txt(c,'picked: '+E[sel].n+' — its weapons, spells, familiar, gem, realm, bosses, and the monsters it beats',cx,H-8,11,'#cfe0f4'); }
  };
  LBR.drawers.codex=function(cv,c,W,H,t,full,id){ var f=D[id]; if(!f)return; var s=Math.min(W/560,H/315); c.save(); c.scale(s,s); f(c,W/s,H/s,t); c.restore(); };
  LAB_TABS.push({ id:'codex', name:'How it all fits',
    blurb:'<b>Round 44 — ideas for showing how it all fits together.</b> You asked for ways to show how the elements, monsters, spells, skills and the parts of the world work together — "perhaps some sort of skills tree". Here are six ideas, each a moving sketch made from the game\'s real data. ☆ Pick any you like (more than one is fine — they can live in different places: the Tome, the map, the pause screen), and say in the notes where you would want each. The Tome already has the first steps: the Weapon wheel, Elements, the Forge tree, Paths, and monsters by element.',
    designs:IDEAS.map(function(I){ return {id:I[0],name:I[1]}; }),
    render:function(){ setTimeout(LBR.bind,0); return LBR.sec('Six ideas','pick any number')+'<div class="br-grid br-wide">'+IDEAS.map(function(I,i){ return LBR.card('codex',{id:I[0],name:I[1],desc:I[2]},i,560,315,''); }).join('')+'</div>'; } });
})();
