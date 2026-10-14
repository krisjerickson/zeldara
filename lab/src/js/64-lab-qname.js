// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 53 — "The new name" tab. Kris: "I want to rename the game to "The Quests of Zeldara and Zeldor". Lets use the same font as before …
// ║ Come up with 10 options in the lab for me to choose from, but generally "The Quests of" should be small font, with "Zeldara" and Zeldor"
// ║ being large and having additional visual elements like the axes."
// ║ Ten wordmarks (07zz-brand5.js, ZBrand.QZ) in MedievalSharp, each shown alone and then on the title page as it would be. ☆ Pick one;
// ║ notes per card. Picks: 'qname-<id>'. The game shows the first (Twin Rings) until a pick is made.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZBrand==='undefined'||!ZBrand.QZ)return; LBR.TABS.push('qname');
  var OPT=ZBrand.QZ.map(function(id){ return ZBrand.wordById(id); });
  LBR.drawers.qname=function(cv,c,W,H,t,full,id){ var D=ZBrand.wordById(id); if(!D)return; var key=id+W+'|'+(document.fonts&&document.fonts.status); if(cv._done===key&&!full)return;
    c.fillStyle='#05090f'; c.fillRect(0,0,W,H);
    // left: the wordmark alone, large · right: the title page as it would be
    var lw=W*0.56; try{ ZBrand.word(c,D,lw*0.5,H*0.5,Math.min(lw/10.5,H/5.4),t||0); }catch(e){}
    try{ var pw=W-lw-16, ph=H-16, cv2=ZBrand.mk(Math.round(pw*2),Math.round(ph*2)), c2=cv2.getContext('2d'), home=ZBrand.HOMES.find(function(h){ return h.id===ZBrand.HOME; });
      ZBrand.home(c2,home,cv2.width,cv2.height,t||0,{sym:ZBrand.LOGO,word:id,btns:['NEW GAME','RETURNING PLAYER']}); c.drawImage(cv2,lw+8,8,pw,ph); c.strokeStyle='#2a3a4a'; c.strokeRect(lw+8.5,8.5,pw-1,ph-1); }catch(e){ console.warn('qname',e); }
    cv._done=key; };
  LAB_TABS.push({ id:'qname', name:'The new name',
    blurb:'<b>Round 53 — THE QUESTS OF ZELDARA AND ZELDOR.</b> Ten wordmarks in your MedievalSharp face, each built from the Ringed Z\'s parts (the ringed Z, the crossed bearded axes, rune bands). Left: the wordmark; right: the title page with it. ☆ your favourite and add notes; your pick, <b>One Great Z</b>, is in the game now.',
    designs:OPT.map(function(o){ return {id:o.id,name:o.name}; }),
    render:function(){ setTimeout(LBR.bind,0); return LBR.sec('The new name','ten wordmarks · the title page with each')+'<div class="br-grid br-wide">'+OPT.map(function(o,i){ return LBR.card('qname',{id:o.id,name:o.name,desc:o.desc},i,960,420,''); }).join('')+'</div>'; } });
})();
