// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 46 — THE E tab: Kris (Oct 11): "the top of the E in Zeldara is too small. There are three horizontal lines in the E, with the top one
// ║ that should be as long as the bottom one. Let's fix the overall Zeldara to have this, and propose new designs, as needed to run by me".
// ║ The game now draws the fix (07zz-brand4.js, ZBrand.E_STYLE 'top'). Cards: the E before, the fix, and four other typefaces of the Ringed Z
// ║ whose own E is evener. ☆ Pick one; notes per card. Picks: 'logoe-<id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZBrand==='undefined'||!ZBrand.setE)return; LBR.TABS.push('logoe');
  var OPT=[['pick','rz_medieval','top','Your pick — MedievalSharp, the top arm drawn out','Round 47: the Ringed Z in MedievalSharp, the E\'s top arm drawn a touch past its foot, and the letters in front of the axes. This is in the game now.'],
    ['fix','ring_z','top','The fix — the top arm as long as the bottom one','Your Ringed Z in Cinzel Decorative, the E\'s top arm drawn out to the length of its foot (the serif kept at the new end). Round 46\'s fix.'],
    ['before','ring_z','font','Before — the typeface\'s own E','For comparison: Cinzel Decorative draws its E with a short top arm.'],
    ['marcellus','rz_marcellus','font','Marcellus SC','Calm Roman capitals; its E has three nearly even arms. Lighter and plainer than now.'],
    ['meta','rz_meta','font','Metamorphous','Wide chiselled capitals with flared tips; a broad, balanced E.'],
    ['almendra','rz_almendra','font','Almendra SC','Pen-drawn small capitals, storybook feel; even arms with a soft pen finish.'],
    ['medieval','rz_medieval','font','MedievalSharp','Broad-nib medieval lettering; the E is round and friendly.']];
  LBR.drawers.logoe=function(cv,c,W,H,t,full,id){ var o=OPT.find(function(x){ return x[0]===id; }); if(!o)return; var key=id+W+'|'+(document.fonts&&document.fonts.status); if(cv._done===key&&!full)return;
    c.fillStyle='#0b1220'; c.fillRect(0,0,W,H); var prev=ZBrand.E_STYLE; ZBrand.setE(o[2]);
    try{ ZBrand.word(c,o[1],W*0.5,H*0.3,Math.min(W/11.5,H/3.6),t||0); }catch(e){}
    // the E alone, large, under the wordmark
    try{ var D=ZBrand.wordById(o[1]), fam=D&&D.fam?'"'+D.fam+'","Cinzel",Georgia,serif':'"Cinzel Decorative","Cinzel",Georgia,serif', wt=D&&D.wt||'700'; c.save(); c.translate(W*0.5,H*0.93); var sc=(full?H*0.28:H*0.3)/100; c.scale(sc,sc); c.font=wt+' 100px '+fam; c.fillStyle='#f2c14e'; c.strokeStyle='#2a1a08'; ZBrand.glyph(c,[0,1],'E',-35,0); c.restore(); }catch(e){}
    ZBrand.setE(prev); cv._done=key; };
  LAB_TABS.push({ id:'logoe', name:'The E',
    blurb:'<b>Round 47 — the E of Zeldara.</b> Your pick, MedievalSharp, is in the game (first card): the top arm drawn out a touch past the foot, and ELDARA now stands in front of the axes. The other cards are the earlier options, for comparison.',
    designs:OPT.map(function(o){ return {id:o[0],name:o[3]}; }),
    render:function(){ setTimeout(LBR.bind,0); return LBR.sec('The E','the fix, the old E, and four typefaces')+'<div class="br-grid br-wide">'+OPT.map(function(o,i){ return LBR.card('logoe',{id:o[0],name:o[3],desc:o[4]},i,560,300,''); }).join('')+'</div>'; } });
})();
