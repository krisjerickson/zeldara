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
  // round 69 (round 73 in): the forty kin in their workshops — the painted folk, the trade's four pieces, the spirit's keepsake
  var KIN=typeof ZHAM!=='undefined'?ZHAM.KIN.map(function(K,i){ var S=ZHAM.spirit(i), L=ZHAM.lines(i); return {id:ZHAM.kinId(i),kind:'kin',n:i,name:K[1]+' — '+K[2].replace(/^(her|his) /,S.name+'\'s ')+' · '+ZHAM.tradeName(ZHAM.trade(i)),desc:'“'+L[1]+'” · '+ZHAM.REALM[S.q]+'. Keepsake: '+K[6]+'.'}; }):[];
  var PV=(typeof ZSPR_PREVIEW!=='undefined'&&ZSPR_PREVIEW)||{}, PIMG={};
  var ppage=function(pg){ if(PIMG[pg])return PIMG[pg].complete&&PIMG[pg].naturalWidth?PIMG[pg]:null; var im=new Image(); im.onerror=function(){ if(!im._b){ im._b=1; im.src='../sprites/preview/'+pg+'.webp'; } }; im.src='preview/'+pg+'.webp'; PIMG[pg]=im; return null; };
  var ITEM=function(c,id,cx,fy,h){ var it=typeof ZSCN_META!=='undefined'&&ZSCN_META.items&&ZSCN_META.items[id]; if(!it)return false; var pg=load('assets/scenery/'+it[0]+'.webp'); if(!(pg.complete&&pg.naturalWidth))return false; var s=h/it[4]; c.drawImage(pg,it[1],it[2],it[3],it[4],cx-it[3]*s/2,fy-h,it[3]*s,h); return true; };
  S.kin=function(c,W,H,t,C){ var n=C.n, R=(typeof ZHAM!=='undefined'&&ZHAM.ROOM[ZHAM.spirit(n).q])||{wallA:'#8a7a5a',floorA:'#9a7a54'}, wl=H*0.32;
    c.fillStyle=R.wallA; c.fillRect(0,0,W,wl); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(0,wl-6,W,6); c.fillStyle=R.floorA; c.fillRect(0,wl,W,H-wl);
    ITEM(c,'hk_'+ZHAM.KIN[n][0],W/2,wl-8,wl*0.62);      // the keepsake on the back wall
    var t2=ZHAM.trade(n), F=ZHAM.TRADES[t2].f; [[0.16,0.62],[0.84,0.62],[0.14,0.97],[0.86,0.97]].forEach(function(p,i){ ITEM(c,'hf_'+t2+'_'+F[i][0],W*p[0],H*p[1],H*0.3); });
    var E=PV[C.id+'.core.f'], im=E&&ppage(E.page); if(im){ var seq=[0,1,0,1,2,3,2,3,4,5,6,7,4,5,6,7], fi=seq[Math.floor(t*4)%seq.length], cw=E.cell[0], ch=E.cell[1], s=(H*0.5)/ch; c.fillStyle='rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(W/2,H*0.86,cw*s*0.3,7,0,0,Math.PI*2); c.fill(); c.imageSmoothingEnabled=true; c.drawImage(im,E.x+fi*cw,E.y,cw,ch,W/2-cw*s/2,H*0.87-ch*s,cw*s,ch*s); }
    else { c.fillStyle='#fff'; c.font='13px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText(E?'loading…':'not painted yet',W/2,H*0.7); } };
  var ALL=PANELS.concat(BUILD).concat(KIN);
  S.draw=function(cv,c,W,H,t,full,id){ var C=ALL.find(function(x){ return x.id===id; }); if(!C)return;
    if(C.kind==='kin'){ S.kin(c,W,H,(t||performance.now()/1000),C); return; }
    if(C.kind==='panel'){ var im=load('assets/scenery/rooms/'+id+'.webp'); c.fillStyle='#05070b'; c.fillRect(0,0,W,H);
      if(im.complete&&im.naturalWidth){ var s=Math.min(W/im.naturalWidth,H/im.naturalHeight), w=im.naturalWidth*s, h=im.naturalHeight*s; c.drawImage(im,(W-w)/2,(H-h)/2,w,h); } else { c.fillStyle='#9fc8d8'; c.font='14px "Segoe UI",sans-serif'; c.fillText('not painted yet',16,28); }
      return; }
    var it=typeof ZSCN_META!=='undefined'&&ZSCN_META.items&&ZSCN_META.items[id]; var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#5d8a4c'); g.addColorStop(1,'#4a7340'); c.fillStyle=g; c.fillRect(0,0,W,H);
    if(!it){ c.fillStyle='#fff'; c.font='14px "Segoe UI",sans-serif'; c.fillText('not painted yet',16,28); return; }
    var pg=load('assets/scenery/'+it[0]+'.webp'); if(!(pg.complete&&pg.naturalWidth))return; var s=Math.min((W-30)/it[3],(H-30)/it[4]), w=it[3]*s, h=it[4]*s;
    c.fillStyle='rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(W/2,(H+h)/2-4,w*0.42,h*0.06,0,0,Math.PI*2); c.fill(); c.drawImage(pg,it[1],it[2],it[3],it[4],(W-w)/2,(H-h)/2,w,h); };
  LBR.drawers.hamlets=S.draw;
  LAB_TABS.push({ id:'hamlets', name:'Saga panels & hamlets',
    blurb:'<b>Round 69 — what came in from rounds 71, 72 and 73.</b> <b>New: the forty hamlet folk</b> at the bottom — each in their workshop with the trade\'s furniture and the spirit\'s keepsake (they play their idle, talk and work frames). <b>The saga panels</b>: the eleven the game plays — the opening when a new game starts, each realm\'s old disaster at its tenth spirit, the shut gate at the twentieth; the five set before the twins were born are the redone ones (no hero). <b>The hamlet buildings</b>: a workshop for each of the twenty trades and the homes, well, yard and cart that stand round each runestone\'s rune after the gods (see them in place in <i>Soul-lines in the game → After the gods</i>). ☆ to keep; a note on any you want changed and I\'ll order it again.',
    designs:ALL.map(function(d){ return {id:d.id,name:d.name}; }),
    render:function(){ setTimeout(function(){ LBR.bind(); },0);
      return LBR.sec('The saga panels ('+PANELS.length+')','in the order they come · ⛶ for full screen')+'<div class="br-grid">'+PANELS.map(function(d,i){ return LBR.card('hamlets',d,i,640,427,''); }).join('')+'</div>'+
        LBR.sec('The hamlet buildings ('+BUILD.length+')','')+'<div class="br-grid hm-grid">'+BUILD.map(function(d,i){ return LBR.card('hamlets',d,i+PANELS.length,360,300,''); }).join('')+'</div>'+
        LBR.sec('The hamlet folk in their workshops ('+KIN.length+')','each freed spirit\'s kin · their trade\'s furniture · the spirit\'s keepsake on the wall')+'<div class="br-grid hm-grid">'+KIN.map(function(d,i){ return LBR.card('hamlets',d,i+PANELS.length+BUILD.length,420,360,''); }).join('')+'</div>'; } });
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('hamlets'); LBR.TABS.push('hamlets');
  var st=document.createElement('style'); st.textContent='.hm-grid{grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}'; document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'hamlets',label:'✦ Saga panels & hamlet buildings — look them over',where:'Saga panels & hamlets tab · '+PANELS.length+' panels, '+BUILD.length+' buildings',done:function(){ return ALL.some(function(d){ return LBR.picked('hamlets',d.id); }); },go:function(){ LTODO.goTo('hamlets','.br-grid',0); }});
  return S; })();
