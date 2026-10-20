// ═══════════════════════════════════════════════════════════════════════
// ║ 07zz-brand7.js — round 71: THE FONT, ROUND TWO (the Lab's Fonts tab, 79b-lab-zfonts.js).
// ║ Kris picked Runeheim Uncial (Uncial Antiqua) and Scribe's Hand (Eagle Lake), plain, and said: "1. I don't like any of the multicolored
// ║ fonts, lets make them all gold 2. i don't like any of the frills on the elaborate fonts, let's skip these 3. For Zeldara and Zeldor, we need
// ║ these to be all capital letters, but keep the same size of the letters for "eldara" and "eldor". also for "the quests of" and "and"
// ║ 4. I like the axes around the Z, need to keep this. 5. Come up with 6 updated recommendations … 6. also have the current intro page for me
// ║ to compare. Make entire intro pages for these".
// ║ Six wordmarks, all gilded gold, no flourishes, One Great Z with the ringed Z over the crossed axes. Every word is in capitals, each set so
// ║ it takes the room its lower-case word took in round 70 (the same letter size on the page) and stands on the same line.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZBrand==='undefined'||!ZBrand.text||!ZBrand.WORDS)return;
  var PI=Math.PI, G=ZBrand.GOLD, UA='Uncial Antiqua', EL='Eagle Lake';
  var erase=function(q,f){ q.save(); q.globalCompositeOperation='destination-out'; f(); q.restore(); };
  // the six: names face, the great Z's and the small words' face, tracking
  ZBrand.FZ2=[
    {id:'fz2_uncial',name:'Runeheim Uncial',names:UA,z:UA,tr:0.06,desc:'Your first pick, Uncial Antiqua, throughout: round Celtic capitals, the ringed Z over the axes.'},
    {id:'fz2_eagle',name:'Scribe\'s Hand',names:EL,z:EL,tr:0.03,desc:'Your second pick, Eagle Lake, throughout: a calligrapher\'s broad-pen capitals, a little slanted and lively.'},
    {id:'fz2_unc_eag',name:'Uncial names, scribe\'s Z',names:UA,z:EL,tr:0.06,desc:'The names in Uncial Antiqua; the great Z, THE QUESTS OF and AND in Eagle Lake — the pen-drawn Z leads the round uncials.'},
    {id:'fz2_eag_unc',name:'Scribe\'s names, uncial Z',names:EL,z:UA,tr:0.03,desc:'The names in Eagle Lake; the great Z, THE QUESTS OF and AND in Uncial Antiqua — a sturdy Celtic Z leads the pen capitals.'},
    {id:'fz2_macondo',name:'Skald Hand',names:'Macondo',z:'Macondo',tr:0.05,desc:'Macondo, a cousin of your two: uncial-flavoured capitals, lighter and very readable, so the same face can carry the menus.'},
    {id:'fz2_metam',name:'Carved Runic',names:'Metamorphous',z:'Metamorphous',tr:0.05,desc:'Metamorphous: Celtic capitals with a carved, chiselled edge — between the uncial and the scribe\'s hand.'}];
  var W=function(q,s,fam,sz,tr){ return ZBrand.text(q,[0,1,0,0],s,'"'+fam+'",Georgia,serif','400',sz,tr*sz,0,0,{norm:true,dry:true}).w; };
  // the size at which CAPS fill the width the lower-case word took (at size sz), kept between 0.55 and 1 of sz
  var fit=function(q,lc,fam,sz,tr){ var a=W(q,lc,fam,sz,tr), b=W(q,lc.toUpperCase(),fam,sz,tr); return sz*Math.max(0.55,Math.min(1,a/b)); };
  var build=function(D){ return function(P,q,p){ var FN='"'+D.names+'",Georgia,serif', FZ='"'+D.z+'",Georgia,serif', trN=D.tr, trZ=D.z===D.names?D.tr:(D.z===UA?0.06:0.03);
      var T=function(F,tr,s,sz,x,y){ return ZBrand.text(q,p,s,F,'400',sz,tr*sz,x,y,{norm:true}); };
      // a word in capitals sized to its lower-case footprint, standing on the old baseline (cy + 0.35·sz0)
      var cap=function(F,fam,tr,lc,sz0,x0,cy,front){ var sz=fit(q,lc,fam,sz0,tr), s=lc.toUpperCase(), w=W(q,s,fam,sz,tr), y=cy+0.35*sz0-0.35*sz;
        if(front){ var pe=p.slice(); pe[1]=Math.max(p[1],1.5); erase(q,function(){ ZBrand.text(q,pe,s,F,'400',sz,tr*sz,x0+w/2,y,{norm:true}); }); }
        T(F,tr,s,sz,x0+w/2,y); return {w:w,sz:sz}; };
      var s=1.35, x0=1.35, wa=W(q,'ELDARA',D.names,fit(q,'eldara',D.names,1,trN),trN), wo=W(q,'ELDOR',D.names,fit(q,'eldara',D.names,1,trN),trN), L=-2.25, R=x0+Math.max(wa,wo), dx=-(L+R)/2;
      q.save(); q.translate(dx,0);
      // the ringed Z over the crossed axes
      P.axe(0,0,2.9*s,-0.7,true); P.axe(0,0,2.9*s,0.7); erase(q,function(){ q.beginPath(); q.arc(0,0,1.2*s,0,PI*2); q.fill(); });
      T(FZ,trZ,'Z',1.7*s,0,0); P.w(0.45).ci(0,0,0.9*s).ci(0,0,1.14*s); q.save(); P.w(0.8).braid(ZBrand.ring(1.02*s),22,0.065*s); q.restore();
      // ELDARA and ELDOR: both at the size that fits ELDARA to eldara's room
      var szN=fit(q,'eldara',D.names,1,trN), yA=-0.78+0.35-0.35*szN, yO=0.92+0.35-0.35*szN, F2=function(t,y){ var pe=p.slice(), w=W(q,t,D.names,szN,trN); pe[1]=Math.max(p[1],1.5); erase(q,function(){ ZBrand.text(q,pe,t,FN,'400',szN,trN*szN,x0+w/2,y,{norm:true}); }); T(FN,trN,t,szN,x0+w/2,y); };
      F2('ELDARA',yA); F2('ELDOR',yO);
      // THE QUESTS OF over the first name, ruled to its end; AND between the rules — capitals in the room the lower case took
      var Q=cap(FZ,D.z,trZ,'The Quests of',0.34,x0+0.1,-1.62); P.w(0.45).ln([x0+0.1+Q.w+0.22,-1.62,x0+wa,-1.62]); P.fc(x0+wa+0.08,-1.62,0.05);
      P.w(0.6).ln([x0,-0.12,x0+wa,-0.12]).ln([x0,0.24,x0+wa,0.24]); var aw=W(q,'AND',D.z,fit(q,'and',D.z,0.26,trZ),trZ); cap(FZ,D.z,trZ,'and',0.26,x0+wa*0.5-aw/2,0.06);
      q.restore(); }; };
  ZBrand.FZ2.forEach(function(D){ ZBrand.WORDS.push({id:D.id,name:D.name,col:G,style:'gilded',gen:4,kind:'custom',fam:D.names,wt:'400',tall:true,desc:D.desc,paint:build(D)}); });
  // Kris's pick (Lab → Fonts, round two): "Scribe's names, uncial Z" — the faces are embedded in the game by 07zy-brand-fonts3.js
  // round 71c: Kris's own tagline (Lab note on today's: "I don't want to give away anything")
  ZBrand.TAGLINE=['Four realms, one broken land. Free the bound spirits','and unravel the fragmented past to liberate Runeheim.'];
  ZBrand.WORDMARK='fz2_eag_unc'; ZBrand.TAGFONT='"Eagle Lake","Marcellus SC",Georgia,serif';
  // Kris: "recommend new taglines for the intro screen to choose from now that the story has gotten more elaborate" — ten, two lines each,
  // shown on the whole title page in the Lab. spoil: how much of the story it gives away (none / a hint / a reveal)
  ZBrand.TAGLINES=[
    ['tg_storm','Two foundlings from the storm. Forty spirits in chains.','Free them, break the forges, and bring the light back to Runeheim.','none'],
    ['tg_gate','The gate of Asgard is shut, and no soul can rise or return.','Wake the runestones, free the forty spirits, and mend the cycle.','a hint'],
    ['tg_runes','Two foundlings from the lake read runes no one else can.','Free the bound spirits, and draw the World-Tree across Runeheim.','none'],
    ['tg_seat','A false god sits on Odin\'s high seat, and the dead have nowhere to go.','Two children of the storm are Runeheim\'s last hope.','a reveal (the false god)'],
    ['tg_cradles','No child born in a lifetime. Then the lake brought two.','Free the spirits of Runeheim, and the land will bloom again.','none'],
    ['tg_count','Forty spirits. Four forges. One false god.','Two twins from the storm, to set the souls of Runeheim free.','a hint'],
    ['tg_lines','Every spirit you free draws a line of light across the land.','Finish the World-Tree, and open the gate of the gods.','a hint'],
    ['tg_gods','Wake the runestones. Break the forges of Muspelheim.','Free Odin and Freya, and let the souls of Runeheim go home.','a reveal (the gods bound)'],
    ['tg_milk','Raised on goat\'s milk and old songs, the twins of the storm set out','to free the spirits of Runeheim and open the gate of the gods.','none'],
    ['tg_fire','Fire below, a false god above, and the dead with nowhere to go.','Free the spirits, and turn Runeheim green again.','a hint']];
})();
