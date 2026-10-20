// ═══════════════════════════════════════════════════════════════════════
// ║ 79-lab-hamlets.js — round 69: THE SAGA PANELS AND THE HAMLET WORKSHOPS IN THE LAB (Kris: "where are the hamlet workshops and good saga
// ║ panels in the design lab?").
// ║  · The eleven saga panels the game plays (scenery waves 76 and 77 — the five set before the twins were born are the redone ones,
// ║    without the hero), each with its line and when it plays.
// ║  · The hamlet buildings (wave 75): the twenty workshops, one per trade, and the new homes, well, play yard and cart.
// ║ ☆ to keep, notes to change; a panel or building with a note can be ordered again.
// ═══════════════════════════════════════════════════════════════════════
var LHM=(function(){ if(typeof LBR==='undefined')return null;
  var S={ img:{} };
  var load=function(src){ if(S.img[src])return S.img[src]; var im=new Image(); im.onerror=function(){ if(!im._b){ im._b=1; im.src='../'+src; } }; im.src=src; S.img[src]=im; return im; };
  var WHEN={opening:'the opening, when a new game starts',realm4:'the Ashlands\' tenth spirit',realm3:'the Highlands\' tenth spirit',realm2:'the Wetlands\' tenth spirit',realm1:'the Grasslands\' tenth spirit',gate:'the twentieth spirit'};
  var PANELS=[]; if(typeof ZSAGA_SETS!=='undefined')Object.keys(ZSAGA_SETS).forEach(function(k){ ZSAGA_SETS[k].forEach(function(p,i){ PANELS.push({id:p[0],kind:'panel',name:(k==='opening'?'Opening '+(i+1)+' — ':'')+p[0].replace(/^pn_saga_/,'').replace(/_b$/,'').replace(/^\w/,function(c){ return c.toUpperCase(); }),desc:'“'+p[1]+'” — plays at '+WHEN[k]+(/_b$/.test(p[0])?' (redone without the hero).':'.')}); }); });
  var TR=['weaver','shipwright','netmender','fisher','beekeeper','carver','cooper','tanner','dyer','herder','miller','stonemason','midwife','potter','shepherd','smith','forester','brewer','skald','baker'];
  var BUILD=TR.map(function(t){ return {id:'hw_'+t,kind:'bld',name:'Workshop — '+(t==='netmender'?'net-mender':t),desc:'The '+(t==='netmender'?'net-mender':t)+'\'s workshop: it stands in the hamlet of each spirit of this trade (two in Runeheim).'}; })
    .concat([['hh_new_a','New cottage'],['hh_new_b','New longhouse'],['hh_new_c','New stone cottage'],['hh_well','Hamlet well'],['hh_yard','Children\'s play yard'],['hh_cart','Settler\'s cart']].map(function(h){ return {id:h[0],kind:'bld',name:h[1],desc:'In every hamlet, round its rune.'}; }));
  var ALL=PANELS.concat(BUILD);
  S.draw=function(cv,c,W,H,t,full,id){ var C=ALL.find(function(x){ return x.id===id; }); if(!C)return;
    if(C.kind==='panel'){ var im=load('assets/scenery/rooms/'+id+'.webp'); c.fillStyle='#05070b'; c.fillRect(0,0,W,H);
      if(im.complete&&im.naturalWidth){ var s=Math.min(W/im.naturalWidth,H/im.naturalHeight), w=im.naturalWidth*s, h=im.naturalHeight*s; c.drawImage(im,(W-w)/2,(H-h)/2,w,h); } else { c.fillStyle='#9fc8d8'; c.font='14px "Segoe UI",sans-serif'; c.fillText('not painted yet',16,28); }
      return; }
    var it=typeof ZSCN_META!=='undefined'&&ZSCN_META.items&&ZSCN_META.items[id]; var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#5d8a4c'); g.addColorStop(1,'#4a7340'); c.fillStyle=g; c.fillRect(0,0,W,H);
    if(!it){ c.fillStyle='#fff'; c.font='14px "Segoe UI",sans-serif'; c.fillText('not painted yet',16,28); return; }
    var pg=load('assets/scenery/'+it[0]+'.webp'); if(!(pg.complete&&pg.naturalWidth))return; var s=Math.min((W-30)/it[3],(H-30)/it[4]), w=it[3]*s, h=it[4]*s;
    c.fillStyle='rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(W/2,(H+h)/2-4,w*0.42,h*0.06,0,0,Math.PI*2); c.fill(); c.drawImage(pg,it[1],it[2],it[3],it[4],(W-w)/2,(H-h)/2,w,h); };
  LBR.drawers.hamlets=S.draw;
  LAB_TABS.push({ id:'hamlets', name:'Saga panels & hamlets',
    blurb:'<b>Round 69 — what came in from rounds 71 and 72.</b> <b>The saga panels</b>: the eleven the game plays — the opening when a new game starts, each realm\'s old disaster at its tenth spirit, the shut gate at the twentieth; the five set before the twins were born are the redone ones (no hero). <b>The hamlet buildings</b>: a workshop for each of the twenty trades and the homes, well, yard and cart that stand round each runestone\'s rune after the gods (see them in place in <i>Soul-lines in the game → After the gods</i>). ☆ to keep; a note on any you want changed and I\'ll order it again.',
    designs:ALL.map(function(d){ return {id:d.id,name:d.name}; }),
    render:function(){ setTimeout(function(){ LBR.bind(); },0);
      return LBR.sec('The saga panels ('+PANELS.length+')','in the order they come · ⛶ for full screen')+'<div class="br-grid">'+PANELS.map(function(d,i){ return LBR.card('hamlets',d,i,640,427,''); }).join('')+'</div>'+
        LBR.sec('The hamlet buildings ('+BUILD.length+')','')+'<div class="br-grid hm-grid">'+BUILD.map(function(d,i){ return LBR.card('hamlets',d,i+PANELS.length,360,300,''); }).join('')+'</div>'; } });
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('hamlets'); LBR.TABS.push('hamlets');
  var st=document.createElement('style'); st.textContent='.hm-grid{grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}'; document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'hamlets',label:'✦ Saga panels & hamlet buildings — look them over',where:'Saga panels & hamlets tab · '+PANELS.length+' panels, '+BUILD.length+' buildings',done:function(){ return ALL.some(function(d){ return LBR.picked('hamlets',d.id); }); },go:function(){ LTODO.goTo('hamlets','.br-grid',0); }});
  return S; })();
