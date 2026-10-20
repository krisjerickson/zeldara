// ═══════════════════════════════════════════════════════════════════════
// ║ 79b-lab-zfonts.js — round 70b: THE FONTS TAB. Kris: "we still need to get a better font for zeldara, including for the intro screen …
// ║ create … zeldara and zeldor intro panels with a variety of different fonts … create entire alphabets for these … and propose places for
// ║ the font to be used throughout the game" — "let's do 12 sets of fonts to choose from".
// ║ Twelve sets (07zz-brand6.js, ZBrand.FONTSETS), each: the plain title panel, the elaborate one (left the wordmark, right the title page
// ║ with it), and a card of both alphabets with the face at work in the game (a realm banner, a talk box, the menu, a map label, the Tome).
// ║ ☆ to pick (one set, or a plain from one and an elaborate from another); notes for changes. Picks: 'zfonts-<id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZBrand==='undefined'||!ZBrand.FONTSETS)return; LBR.TABS.push('zfonts');
  var SETS=ZBrand.FONTSETS, G=ZBrand.GOLD, ROWS=['ABCDEFGHIJKLM','NOPQRSTUVWXYZ','abcdefghijklm','nopqrstuvwxyz','0123456789 &?!','ÅÄÖ ÆØ åäö æø'];
  var ready=function(D){ try{ return document.fonts.check(D.wt+' 20px "'+D.fam+'"')&&(!D.famE||document.fonts.check(D.wt+' 20px "'+D.famE+'"')); }catch(e){ return true; } };
  var AC={}, alpha=function(D,E,H,rows,key){ var k=key+H+ready(D); return AC[k]||(AC[k]=ZBrand.fontAlphabet(D,E,H,rows)); };
  var lbl=function(c,t,x,y){ c.save(); c.fillStyle='#6f84a0'; c.font='11px "JetBrains Mono",monospace'; c.textAlign='left'; c.fillText(t,x,y); c.restore(); };
  var face=function(D,px,E){ return D.wt+' '+px+'px "'+(E&&D.famE||D.fam)+'",Georgia,serif'; };
  var panel=function(cv,c,W,H,t,full,id){ var D=ZBrand.wordById(id); if(!D)return; var key=id+W+'|'+ready(ZBrand.FONTSETS.find(function(s){ return s.id===D.set; })); if(cv._done===key&&!full)return;
    c.fillStyle='#05090f'; c.fillRect(0,0,W,H); var lw=W*0.56; try{ ZBrand.word(c,D,lw*0.5,H*0.5,Math.min(lw/10.5,H/5.4),t||0); }catch(e){ console.warn('zfonts',e); }
    try{ var pw=W-lw-16, ph=H-16, cv2=ZBrand.mk(Math.round(pw*2),Math.round(ph*2)), c2=cv2.getContext('2d'), home=ZBrand.HOMES.find(function(h){ return h.id===ZBrand.HOME; });
      ZBrand.home(c2,home,cv2.width,cv2.height,t||0,{sym:ZBrand.LOGO,word:id,btns:['NEW GAME','RETURNING PLAYER']}); c.drawImage(cv2,lw+8,8,pw,ph); c.strokeStyle='#2a3a4a'; c.strokeRect(lw+8.5,8.5,pw-1,ph-1); }catch(e){ console.warn('zfonts home',e); }
    cv._done=key; };
  // the alphabets, and the face at work in the game
  var abc=function(cv,c,W,H,t,full,id){ var D=SETS.find(function(s){ return 'abc_'+s.id===id; }); if(!D)return; var key=id+W+'|'+ready(D); if(cv._done===key&&!full)return;
    c.fillStyle='#070b12'; c.fillRect(0,0,W,H); var hw=W/2;
    [false,true].forEach(function(E,j){ var a=alpha(D,E,30,ROWS,D.id+E), s=Math.min((hw-24)/a.width,280/a.height); c.drawImage(a,j*hw+12,22,a.width*s,a.height*s); lbl(c,E?'elaborate — '+(D.famE||D.fam):'plain — '+D.fam,j*hw+14,14); });
    // the game: a field at dusk with a realm banner, a talk box; the menu, a map label and the Tome to the right
    var gx=12, gy=318, gw=W*0.6, gh=H-gy-12, g=c.createLinearGradient(0,gy,0,gy+gh); g.addColorStop(0,'#1d3a4a'); g.addColorStop(0.55,'#2d4a36'); g.addColorStop(1,'#1f3426'); c.fillStyle=g; c.fillRect(gx,gy,gw,gh);
    c.fillStyle='rgba(0,0,0,.25)'; for(var i=0;i<9;i++){ c.beginPath(); c.ellipse(gx+30+i*gw/9,gy+gh*0.55+((i*37)%23),18,30,0,0,Math.PI*2); c.fill(); }
    var b=alpha(D,true,22,['The Ashlands'],D.id+'ban'), bs=Math.min((gw-60)/b.width,1.25); c.drawImage(b,gx+gw/2-b.width*bs/2,gy+10,b.width*bs,b.height*bs); lbl(c,'realm banner · elaborate',gx+gw/2-80,gy+20+b.height*bs);
    var tx=gx+16, ty=gy+gh-96, tw=gw-32; c.fillStyle='rgba(10,14,22,.92)'; c.fillRect(tx,ty,tw,84); c.strokeStyle='#8a6a2a'; c.strokeRect(tx+0.5,ty+0.5,tw-1,83);
    c.fillStyle=G; c.font=face(D,20); c.textAlign='left'; c.fillText('Elder Runa',tx+12,ty+26); c.fillStyle='#e8e2d4'; c.font=D.small?face(D,17):'italic 15px Georgia,serif';
    c.fillText('The rune-light has come home to the hamlets, child.',tx+12,ty+52,tw-24); c.fillStyle='#9fb0c4'; c.font='12px Georgia,serif'; c.fillText(D.small?'the line in the plain face':'the line in a book face (this one is for names, not lines)',tx+12,ty+72);
    lbl(c,'talk box · plain name'+(D.small?' and line':''),tx,ty-6);
    var rx=gx+gw+18, rw=W-rx-12; [['NEW GAME',gy+18],['RETURNING PLAYER',gy+62]].forEach(function(B){ c.fillStyle='#0e1622'; c.fillRect(rx,B[1],rw,34); c.strokeStyle='#8a6a2a'; c.strokeRect(rx+0.5,B[1]+0.5,rw-1,33); c.fillStyle=G; c.font=face(D,17); c.textAlign='center'; c.fillText(D.lc&&!/Caveat|Eagle/.test(D.fam)?B[0]:B[0],rx+rw/2,B[1]+23,rw-12); });
    lbl(c,'menu · plain',rx,gy+110);
    c.fillStyle='#c8b48a'; c.fillRect(rx,gy+122,rw,58); c.fillStyle='#3a2a14'; c.font=face(D,22); c.textAlign='center'; c.fillText('Runeheim',rx+rw/2,gy+152); c.font=face(D,13); c.fillText('the hamlet of Ylva the weaver',rx+rw/2,gy+170,rw-10); lbl(c,'map page labels · plain',rx,gy+196);
    var tb=alpha(D,true,20,['The Tome'],D.id+'tome'), ts=Math.min((rw-10)/tb.width,1); c.fillStyle='#2a1c10'; c.fillRect(rx,gy+206,rw,gh-206); c.drawImage(tb,rx+rw/2-tb.width*ts/2,gy+212,tb.width*ts,tb.height*ts); lbl(c,'Tome heading · elaborate',rx,gy+gh-6);
    cv._done=key; };
  LBR.drawers.zfonts=function(cv,c,W,H,t,full,id){ return /^abc_/.test(id)?abc(cv,c,W,H,t,full,id):panel(cv,c,W,H,t,full,id); };
  var ALL=[]; SETS.forEach(function(D){ ALL.push({id:'fz_'+D.id+'_p',name:D.name+' — plain',desc:'<b>'+D.fam+'</b> in the gilded gold, in your One Great Z. From '+D.insp+'.'});
    ALL.push({id:'fz_'+D.id+'_e',name:D.name+' — elaborate',desc:D.idea}); ALL.push({id:'abc_'+D.id,name:D.name+' — alphabets & in the game',desc:'Both alphabets, then the face at work: the realm banner and the Tome heading in the elaborate, the menu, names and map labels in the plain. '+(D.small?'Reads well small, so it can carry the talk lines too.':'Best for names and headings; the talk lines stay in a book face.')}); });
  var USES='<div class="zf-uses"><b>Where I\'d use the font in the game</b> (for whichever set you pick):<ul>'+
    '<li><b>Elaborate</b> — the title page; the realm banner when you cross into a realm; the saga panels\' titles; the Tome of Spirits\' cover and chapter heads; the map page\'s title; boss and great-spirit names as they appear; the ending\'s last words.</li>'+
    '<li><b>Plain</b> — the menu and its buttons (New game, Returning player); the name over every talk box; the area name on the screen; map labels (realms, hamlets, waystones); the [Tab] Enter … prompts; item, keepsake and trade names; shop and workshop signs; the Lab-free in-game headings (Inventory, Quests, Settings).</li>'+
    '<li><b>Kept in a plain book face</b> — the talk lines themselves, the Tome\'s long entries and the small HUD numbers, unless the plain face reads well small (marked on each set\'s third card).</li></ul>You can ☆ a whole set, or mix — the plain of one with the elaborate of another.</div>';
  LAB_TABS.push({ id:'zfonts', name:'Fonts',
    blurb:'<b>Round 70b — a better font for Zeldara.</b> Twelve typefaces drawn from your examples, each as a set: a <b>plain</b> version in today\'s gilded gold and an <b>elaborate</b> one with its style\'s flourishes and colour, both in your One Great Z on the title page. The uncials and blackletters keep the ringed Z over the axes; the others let the letters carry it. Each set\'s third card shows both alphabets and the face at work in the game. ☆ your favourites and add notes.',
    designs:ALL.map(function(d){ return {id:d.id,name:d.name}; }),
    render:function(){ setTimeout(LBR.bind,0); var n=0;
      return USES+SETS.map(function(D,i){ var L=ALL.filter(function(d){ return d.id.indexOf('_'+D.id)>0||d.id==='abc_'+D.id; });
        return LBR.sec('Set '+(i+1)+' — '+D.name,D.fam+(D.famE?' + '+D.famE:'')+' · from '+D.insp)+'<div class="br-grid br-wide">'+L.map(function(d){ var c=LBR.card('zfonts',d,n++,960,/^abc/.test(d.id)?640:420,''); return c; }).join('')+'</div>'; }).join(''); } });
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('zfonts');
  var st=document.createElement('style'); st.textContent='.zf-uses{background:#0d1522;border:1px solid #24364e;border-radius:10px;padding:12px 16px;margin:6px 0 14px;color:#cfdbea;font-size:14px;line-height:1.5}.zf-uses ul{margin:6px 0 6px 18px;padding:0}';
  document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'zfonts',label:'✦ Fonts — pick a set (or a plain and an elaborate)',where:'Fonts tab · 12 sets, 24 title panels, the alphabets',done:function(){ return ALL.some(function(d){ return LBR.picked('zfonts',d.id); }); },go:function(){ LTODO.goTo('zfonts','.br-grid',0); }});
})();
