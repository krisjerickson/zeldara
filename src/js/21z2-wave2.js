// ═══════════════════════════════════════════════════════════════════════
// ║ 21z2-wave2.js — round 134: ENGAGEMENT, WAVE 2 (Kris's picks, docs 83 and 88) and the play log from wave 1.
// ║  · ZEV          one place that notices what happens (a boss falls, a site is cleared, a spirit freed, a season turns, you die …) and
// ║                 keeps the last few things you did (ps.recent) for the letters, the recap and the saga cards.
// ║  · ZPLOG        playtest_data: OFF unless you turn it on (Controls). Kept only in this browser: where sessions end, deaths per boss,
// ║                 time per site. "Copy the log" puts it on the clipboard to send; the Lab's Play log tab draws it.
// ║  · ZDAY         the game-day counter: a day is 20 minutes of play, and sleeping in your bed moves you to the next morning. Seasons still
// ║                 turn only with the story; the first three days of each new season are its FESTIVAL (21z3). Shown on the little map.
// ║  · ZDSTORY      death_story: the fall keeps its small cost, and now tells you something — who found you, a villager's word, a page of
// ║                 lore — and reminds you the lost purse waits where you fell.
// ║  · ZLETTER      letters: back after a day or more away, villagers have left letters on your table at home, each with a small gift.
// ║  · ZRECAP       saga_night / where you were: back after half an hour or more, "Last time, in your saga…" — where you are, what you
// ║                 did last, three goals of about twenty minutes.
// ║  · ZSTAMP       map_stamps: eight stamps you place on the map (chest, danger, come back, boss, trader, secret, favourite, question);
// ║                 a waystone you wake reveals the land around it on the map.
// ║  · ZBOOK        tome_book: the Tome's Collection chapter — how full every chapter is, stickers for firsts (two are yours from the
// ║                 start), secrets found per realm, echo medals, festival ribbons.
// ║  · ZHEARTH      rest_hearth: after a site or a boss, a tally of what you won, then "Onward" or "Rest by the hearth" (save, the village
// ║                 at dusk, stop on a high).
// ║  · ZPHOTO       photo_mode: Photo in the pause panel — the menus and HUD hide, choose a frame, a light, which way you face, then save
// ║                 the picture (a small title mark in the corner).
// ║  · ZSHARE       share_cards: at the peaks (a boss falls, a festival, the ending) a saga card to save, copy or share — no spoilers.
// ║  · ZCODE        challenge_codes: an echo's time as a code; paste a friend's code at the crypt and their time is the one to beat.
// ║ Switches: each has .on.
// ═══════════════════════════════════════════════════════════════════════
var Z2={ ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  ps:function(){ var w=Z2.ws(); return w&&w.playerState; },
  esc:function(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); },
  playing:function(){ try{ return !!(game&&game.scene&&!game.scene.isActive('Title')&&!game.scene.isActive('Boot')&&Z2.ps()); }catch(e){ return false; } },
  paused:function(){ try{ return typeof isGamePaused==='function'&&isGamePaused(); }catch(e){ return false; } },
  act:function(k){ try{ return game.scene.isActive(k); }catch(e){ return false; } },
  region:function(){ var r=document.getElementById('region-name'); return (r&&r.textContent.trim())||'the village'; },
  pic:function(id){ return typeof ZHUD!=='undefined'&&ZHUD.pic?ZHUD.pic(id):null; },      /* whole-picture paintings (rooms) too: see below */
  REALM:['the village','the Grasslands','the Wetlands','the Highlands','the Ashlands'],
  hero:function(ps){ return ps&&ps.hero==='zoldor'?'Zoldor':(ps&&ps.hero==='zola'?'Zola':((ps&&ps.heroName)||'our hero')); },
  overlay:function(cls,html){ var d=document.createElement('div'); d.className=cls; d.innerHTML=html; (document.getElementById('app')||document.body).appendChild(d); return d; } };

// whole paintings (kind 'room': vistas, story panels, the hearth …) live as their own files, not in the atlas — ZHUD.pic now finds them too
(function(){ if(typeof ZHUD==='undefined'||!ZHUD.pic)return; var p0=ZHUD.pic; ZHUD.pic=function(id){ var r=p0.apply(ZHUD,arguments); if(r)return r; try{ var R=typeof ZScn!=='undefined'&&!ZScn.off&&ZScn.META&&ZScn.META.rooms; if(R&&R[id])return ZScn.BASE+R[id]; }catch(e){} return null; }; })();

// ── what happened ──
var ZEV={ on:true, L:{}, last:{},
  sub:function(k,f){ (ZEV.L[k]||(ZEV.L[k]=[])).push(f); },
  emit:function(k,d){ d=d||{}; var ps=Z2.ps(); if(ps&&d.txt){ var R=ps.recent||(ps.recent=[]); R.push({k:k,txt:d.txt,day:Math.floor(ps.gday||0),at:Date.now()}); if(R.length>12)R.splice(0,R.length-12); }
    (ZEV.L[k]||[]).forEach(function(f){ try{ f(d,ps); }catch(e){ if(typeof console!=='undefined')console.warn('ZEV',k,e); } }); },
  run:null,
  tick:function(){ if(!ZEV.on||!Z2.playing())return; var ws=Z2.ws(), ps=ws.playerState, D=game.scene.getScene('Dungeon');
    // a fresh save loaded (or a new game): only count what changes from here
    if(ZEV._ps!==ps){ ZEV._ps=ps; ZEV.last={spirits:(ps.spiritsFreed||[]).length,quests:(ps.completedQuests||[]).length,level:ps.level||1,spells:(ps.spellsLearned||[]).length,sec:Math.max.apply(null,(ps.unlockedSections||[1]).concat([1])),home:!!ps.spiritsHome}; ZEV.run=null; ZEV.emit('load',{}); return; }
    var L=ZEV.last, n;
    if((n=(ps.spiritsFreed||[]).length)>L.spirits){ L.spirits=n; ZEV.emit('spirit',{txt:'freed a bound spirit ('+n+' of 40)'}); }
    if((n=(ps.completedQuests||[]).length)>L.quests){ L.quests=n; ZEV.emit('quest',{txt:'finished a quest'}); }
    if((n=ps.level||1)>L.level){ L.level=n; ZEV.emit('level',{n:n,txt:'reached level '+n}); }
    if((n=(ps.spellsLearned||[]).length)>L.spells){ L.spells=n; ZEV.emit('spell',{txt:'learned a new spell'}); }
    if((n=Math.max.apply(null,(ps.unlockedSections||[1]).concat([1])))>L.sec){ L.sec=n; ZEV.emit('realm',{n:n,txt:'opened the way into '+Z2.REALM[n]}); }
    if(ps.spiritsHome&&!L.home){ L.home=true; ZEV.emit('end',{txt:'brought the spirits home'}); }
    // inside a site: who, how long, what you carried in
    var inD=D&&Z2.act('Dungeon')&&(D._site||D.site), echo=!!(D&&(D._zEcho||(D._inspect&&D._inspect.from==='echo')));
    if(inD&&D._inspect&&!echo)return;      /* the Site Lab's test runs count for nothing */
    if(inD){ var id=D.siteId||(D._site&&D._site.id)||'?';
      if(!ZEV.run||ZEV.run.id!==id||ZEV.run.D!==D){ ZEV.run={id:id,D:D,name:(D._site&&D._site.name)||'the site',sec:D.siteSection,t:0,g0:ps.gold||0,xp0:ps.xp||0,inv0:(ps.inventory||[]).slice(),hp:ps.hp,hits:0,boss:null,echo:echo,cleared0:(ps.lockedSites||[]).indexOf(id)>=0}; }
      var R=ZEV.run; if(!Z2.paused())R.t++; if((ps.hp||0)<R.hp)R.hits++; R.hp=ps.hp;
      if(D._bossDefeated&&!R.boss){ var b=(D.monsters||[]).find(function(m){ return m.isBoss; }); R.boss=(b&&b.def&&b.def.name)||R.name; ZEV.emit('boss',{name:R.boss,site:id,sec:R.sec,t:R.t,hits:R.hits,echo:R.echo,txt:R.echo?null:'defeated '+R.boss}); }
      return; }
    if(ZEV.run&&Z2.act('World')){ var R2=ZEV.run; ZEV.run=null; var cleared=!R2.cleared0&&(ps.lockedSites||[]).indexOf(R2.id)>=0;
      if(!R2.echo&&(cleared||R2.boss)){ var got=(ps.inventory||[]).slice(); R2.inv0.forEach(function(i){ var k=got.indexOf(i); if(k>=0)got.splice(k,1); });
        ZEV.emit('site',{id:R2.id,name:R2.name,boss:R2.boss,t:R2.t,gold:Math.max(0,(ps.gold||0)-R2.g0),xp:Math.max(0,(ps.xp||0)-R2.xp0),items:got,hits:R2.hits,txt:R2.boss?null:'cleared '+R2.name}); }
      else ZEV.emit('leave',{id:R2.id,t:R2.t,name:R2.name}); } } };
if(typeof ZDeath!=='undefined'&&ZDeath.run){ var _zevD=ZDeath.run; ZDeath.run=function(sc,info){ try{ var ps=Z2.ps(); ZEV.emit('death',{area:info&&info.area,foe:(info&&info.foe)||(ps&&ps._lastFoe),scene:sc&&sc.sys&&sc.sys.settings.key}); }catch(e){} return _zevD.apply(this,arguments); }; }

// ── the play log (opt-in, local) ──
var ZPLOG={ KEY:'zeldara_playlog',
  on:function(){ try{ return localStorage.getItem('zeldara_playlog_on')==='1'; }catch(e){ return false; } },
  set:function(v){ try{ localStorage.setItem('zeldara_playlog_on',v?'1':'0'); }catch(e){} if(v)ZPLOG.add('start',{place:Z2.region()}); },
  get:function(){ try{ return JSON.parse(localStorage.getItem(ZPLOG.KEY)||'[]')||[]; }catch(e){ return []; } },
  add:function(k,d){ if(!ZPLOG.on())return; var L=ZPLOG.get(), ps=Z2.ps(); var e={k:k,at:Date.now(),lv:ps&&ps.level,sec:ps?Math.max.apply(null,(ps.unlockedSections||[1]).concat([1])):0}; for(var x in d)e[x]=d[x]; L.push(e); if(L.length>3000)L.splice(0,L.length-3000); try{ localStorage.setItem(ZPLOG.KEY,JSON.stringify(L)); }catch(err){} },
  text:function(){ return JSON.stringify({game:'zeldara',v:1,made:new Date().toISOString(),log:ZPLOG.get()}); },
  box:function(){ var n=ZPLOG.get().length; return '<label class="zk-opt"><input type="checkbox" id="zk-plog"'+(ZPLOG.on()?' checked':'')+'> <b>Help make the game better</b> — keep an anonymous play log in this browser (where sessions end, falls per boss, time per site). Nothing is sent unless you copy it and send it yourself.</label>'+
      '<div class="zk-plb"><button id="zk-plcopy">Copy the log ('+n+')</button><button id="zk-plsave">Save it as a file</button><button id="zk-plclear">Clear it</button></div>'; },
  wire:function(box){ var c=box.querySelector('#zk-plog'); if(!c)return; c.onchange=function(){ ZPLOG.set(this.checked); };
    box.querySelector('#zk-plcopy').onclick=function(){ var b=this; try{ navigator.clipboard.writeText(ZPLOG.text()).then(function(){ b.textContent='Copied ✓'; }); }catch(e){ b.textContent='Copy failed'; } };
    box.querySelector('#zk-plsave').onclick=function(){ var a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([ZPLOG.text()],{type:'application/json'})); a.download='zeldara-playlog.json'; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); },500); };
    box.querySelector('#zk-plclear').onclick=function(){ try{ localStorage.removeItem(ZPLOG.KEY); }catch(e){} this.textContent='Cleared'; }; } };
ZEV.sub('death',function(d){ var D=game.scene.getScene('Dungeon'), b=D&&Z2.act('Dungeon')&&D.isLastFloor?((D.monsters||[]).find(function(m){ return m.isBoss&&!m.dead; })||{}).def:null; ZPLOG.add('death',{area:d.area,foe:d.foe,boss:b&&b.name}); });
ZEV.sub('site',function(d){ ZPLOG.add('site',{id:d.id,t:d.t,boss:d.boss,hits:d.hits}); });
ZEV.sub('leave',function(d){ ZPLOG.add('left',{id:d.id,t:d.t}); });
ZEV.sub('boss',function(d){ ZPLOG.add('boss',{name:d.name,t:d.t,hits:d.hits,echo:d.echo}); });
ZEV.sub('load',function(){ ZPLOG.add('session',{place:Z2.region()}); });
if(typeof window!=='undefined')window.addEventListener('pagehide',function(){ if(Z2.playing())ZPLOG.add('end',{place:Z2.region(),site:ZEV.run&&ZEV.run.id}); });

// ── the game-day counter, and festival days ──
var ZDAY={ on:true, SEC:1200, FEST:3,
  NAME:{sp:'The Thaw',su:'Summer',au:'Autumn',wi:'Winter',bl:'Freya\'s spring'},
  FNAME:{sp:'the Thaw-fair',su:'the Midsummer Fires',au:'the Harvest Fires',wi:'Yule',bl:'the Blossom Feast'},
  FICON:{sp:'🌱',su:'🔥',au:'🍂',wi:'🕯️',bl:'🌸'},
  day:function(ps){ return Math.floor((ps&&ps.gday)||0)+1; },
  season:function(ps){ return typeof ZSEASON!=='undefined'&&ZSEASON.of?ZSEASON.of(ps):'su'; },
  // the festival running now (its season), or null
  fest:function(ps){ if(!ps||ps.seasStart==null)return null; var d=Math.floor(ps.gday||0)-ps.seasStart; return d>=0&&d<ZDAY.FEST?ps.seasNow:null; },
  tick:function(){ if(!ZDAY.on||!Z2.playing())return; var ps=Z2.ps(); if(ps.gday==null)ps.gday=0;
    if(!Z2.paused()&&(Z2.act('World')||Z2.act('Dungeon')||Z2.act('Island')||Z2.act('Building')))ps.gday+=1/ZDAY.SEC;
    var n=ps.slept||0; if(ZDAY._ps!==ps){ ZDAY._ps=ps; ZDAY._slept=n; }
    if(n>ZDAY._slept){ ZDAY._slept=n; ps.gday=Math.floor(ps.gday)+1; }
    var s=ZDAY.season(ps); if(ps.seasNow!==s){ var first=ps.seasNow==null; ps.seasNow=s; ps.seasStart=first?null:Math.floor(ps.gday); if(!first){ ZEV.emit('season',{s:s,txt:'saw '+ZDAY.NAME[s]+' come'}); } }
    // the very first season's festival waits until the opening is over
    if(ps.seasStart==null&&((ps.firstWin||0)>=4||ps.gday>=1)){ ps.seasStart=Math.floor(ps.gday); }
    var f=ZDAY.fest(ps); if(f&&ps.festSeen!==f+'@'+ps.seasStart){ ps.festSeen=f+'@'+ps.seasStart; ZEV.emit('festival',{s:f,txt:'kept '+ZDAY.FNAME[f]+' on the Green'}); }
    ZDAY.chip(ps); },
  chip:function(ps){ var mm=document.getElementById('minimap-hud'); if(!mm)return; var c=document.getElementById('zday'); if(!c){ c=document.createElement('div'); c.id='zday'; mm.appendChild(c); }
    var s=ps.seasNow||ZDAY.season(ps), f=ZDAY.fest(ps), t='Day '+ZDAY.day(ps)+' · '+ZDAY.NAME[s]+(f?' · '+ZDAY.FICON[f]+' '+ZDAY.FNAME[f]:''); if(c.textContent!==t){ c.textContent=t; c.classList.toggle('fest',!!f); } } };

// ── dying tells you something ──
var ZDSTORY={ on:true,
  FOUND:['Ranger Holt found you by your tracks and carried you home over one shoulder, grumbling about the weight of your boots.','Old Nell spotted you from her boat and rowed for the village, shouting until half the street came running.',
    'Hana and her grey mare found you on the road. "She stopped dead and would not go on," Hana said. "She knew."','Watchman Corr saw your lantern go out from the wall and went out after you without waiting for a relief.',
    'Tilda\'s cart came by at dusk. She wrapped you in a bolt of good wool and only charged you for the wool.','A waystone fairy sat on your chest and sang until someone came. She would not say who taught her the song.',
    'Master Oswin says he found you. He says he fought off three of whatever it was. Nobody else saw anything.','Sister Mael met the cart at the edge of the village and walked beside it, one hand on your brow, all the way home.',
    'Sergeant Brask found you face down and turned you over with his boot. Then he carried you home, very gently, and told no one.','Tob was out late after a strayed ewe and found you instead. The ewe, he says, followed you both home.',
    'Greta heard the mill-wheel stop for no reason and went to look. You were lying in the lane a mile off. She has not explained how she knew.','Your twin was waiting at the gate. "I felt it," they said. "Like a door closing somewhere. Don\'t do that again."'],
  WORD:['Benno pressed a warm loaf into your hands. "For courage. The yeast kind. Ha!" He did not laugh as long as usual.','Garrick looked at your blade and said nothing, which is how Garrick says "you were lucky".',
    'Morwen sniffed the wound and named three herbs, two of which you are fairly sure she made up. It still worked.','Rolf poured you something brown. "On the house. Don\'t make a habit of it." He has said this before.',
    'Elder Runa held your hand a moment. "Every saga has a page where the hero lies still. Turn it."','Pell mended the tear in your cloak with a gold thread. "So you remember," he said. "And so you look good doing it."',
    'Iva set a small grey stone in your palm. "It is nothing. A worry stone. Keep it anyway."','Quill wrote your name in the harbour log under "returned". He underlined it twice.'],
  LORE:['A page of the old saga, read to you as you woke: "The ley lines remember every foot that walks them, and pull the fallen home."','Runa says the runestones on the Green were set to keep heroes, not to keep anything out. You are beginning to believe her.',
    'An old rhyme the healers use: "Rise from the hay, the road will wait; the wolf is patient, but so is fate."','Fenwick says the first heroes of Runeheim fell a hundred times each. "The songs leave that bit out," he says. "The songs are liars."',
    'They say a soul crossing the ley lines sees, for a moment, every waystone lit at once. You do not remember. Perhaps that is a mercy.','The well on the Green is older than the village. Water drawn from it is given to the fallen. No one remembers why. It helps.'],
  pick:function(ps){ var H=ps.deathHeard||(ps.deathHeard=[]), all=[]; [['f',ZDSTORY.FOUND],['w',ZDSTORY.WORD],['l',ZDSTORY.LORE]].forEach(function(p){ p[1].forEach(function(t,i){ if(H.indexOf(p[0]+i)<0)all.push([p[0]+i,t]); }); });
    if(!all.length){ ps.deathHeard=H=[]; return ZDSTORY.pick(ps); } var c=all[Math.floor(Math.random()*all.length)]; H.push(c[0]); return c[1]; } };
if(typeof ZDeath!=='undefined'&&ZDeath.text){ var _zdT=ZDeath.text; ZDeath.text=function(L,I){ var T=_zdT.apply(ZDeath,arguments); try{ var ps=Z2.ps(); if(ZDSTORY.on&&ps&&!I.preview){ T.lines.push(ZDSTORY.pick(ps)); if(I.gold>0)T.wake+=' Your purse lies where you fell — walk back for it.'; } }catch(e){} return T; }; }

// ── letters while you were away, and the recap ──
var ZLETTER={ on:true, AWAY:20*3600*1000,
  WHO:{boss:['Sergeant Brask','Garrick the Blacksmith','Master Oswin'],site:['Tilda the Merchant','Ranger Holt','Iva the Jeweler'],spirit:['Elder Runa','Sister Mael','Old Nell'],realm:['Harbormaster Quill','Hana the Stable Master','Rolf the Bartender'],
    quest:['Benno the Baker','Pell the Tailor','Tob the Farmer'],level:['Sergeant Brask','Master Oswin'],season:['Greta the Miller','Benno the Baker'],festival:['Rolf the Bartender','Tumbler Pia'],spell:['Morwen the Sorcerer'],end:['Elder Runa']},
  BODY:{boss:['Word came up the road that you {txt}. I polished the old trophy shelf at the armoury just in case you need room for more.','You {txt}. I told the whole tavern. Twice. Come home and tell it properly.'],
    site:['Heard you {txt}. Bring back anything shiny and I will give you a fair price — fairer than fair, for you.','You {txt}, they say. Rest your feet before the next one. The road is long and the boots are not.'],
    spirit:['You {txt}. A chair at the long table had someone in it again last night. Thank you.','Another one home — you {txt}. The village is a little louder every week. I like the sound.'],
    realm:['You {txt}. The maps in the harbour office need redrawing. I have started.','You {txt}. The horses can smell new grass on the wind. So can I.'],
    quest:['You {txt}, and it mattered more than you know. Here is a little something for the road.','Thank you for your help — you {txt}. I have not forgotten.'],
    level:['You {txt}. You are getting quicker. Not as quick as me at your age, but quicker.'],
    season:['We {txt}. The flour tastes different with the season. Come and taste it.'],
    festival:['We {txt}. You were missed at the last of it. There is still a slice of the good cake.'],
    spell:['You {txt}. Careful with it. Spells, like soup, are best stirred slowly.'],
    end:['You {txt}. The whole village is changed. Come home and see.']},
  GIFT:[['gold',15],['bread'],['cheese'],['honey'],['trail_mix'],['gold',25],['grilled_fish'],['mushroom_stew']],
  write:function(ps){ var R=(ps.recent||[]).slice(-6).reverse(), out=[], used={};
    R.forEach(function(e){ if(out.length>=3||!ZLETTER.BODY[e.k])return; var W=ZLETTER.WHO[e.k], who=W[Math.floor(Math.random()*W.length)]; if(used[who])return; used[who]=1;
      var B=ZLETTER.BODY[e.k], b=B[Math.floor(Math.random()*B.length)].replace('{txt}',e.txt); out.push({who:who,body:b,gift:ZLETTER.GIFT[Math.floor(Math.random()*ZLETTER.GIFT.length)]}); });
    if(!out.length)out.push({who:'Elder Runa',body:'The village is quiet without you. The Green keeps your place. Come home when the road allows.',gift:['bread']});
    var L=ps.letters||(ps.letters=[]); out.forEach(function(l){ L.push(l); }); return out.length; },
  giftText:function(g){ if(g[0]==='gold')return g[1]+' gold'; var I=typeof ITEMS!=='undefined'&&ITEMS[g[0]]; return I?I.icon+' '+I.name:g[0]; },
  give:function(ps,g){ if(g[0]==='gold'){ ps.gold=(ps.gold||0)+g[1]; return; } if(typeof ITEMS!=='undefined'&&ITEMS[g[0]])(ps.inventory||(ps.inventory=[])).push(g[0]); },
  // at home: a button on the table
  tick:function(){ if(!ZLETTER.on||!Z2.playing())return; var ps=Z2.ps(), B=game.scene.getScene('Building'), home=B&&Z2.act('Building')&&B.building&&B.building.type==='house', n=(ps.letters||[]).length;
    var b=document.getElementById('zletters-btn'); if(home&&n){ if(!b){ b=document.createElement('button'); b.id='zletters-btn'; b.onclick=ZLETTER.open; (document.getElementById('app')||document.body).appendChild(b); } b.textContent='✉ Letters on the table ('+n+')'; b.style.display=''; } else if(b)b.style.display='none'; },
  open:function(){ var ps=Z2.ps(); if(!ps||!(ps.letters||[]).length)return; var L=ps.letters.splice(0), d=Z2.overlay('zletters','<div class="zl-box"><h2>✉ Letters while you were away</h2>'+L.map(function(l){ ZLETTER.give(ps,l.gift);
      return '<div class="zl-l"><p>'+Z2.esc(l.body)+'</p><div class="zl-s">— '+Z2.esc(l.who)+'</div><div class="zl-g">Tucked inside: <b>'+Z2.esc(ZLETTER.giftText(l.gift))+'</b></div></div>'; }).join('')+'<button>Put them away</button></div>');
    d.querySelector('button').onclick=function(){ d.remove(); }; ZEV.emit('letters',{n:L.length}); if(typeof ZSFX!=='undefined')try{ ZSFX.play('page'); }catch(e){} } };
var ZRECAP={ on:true, AWAY:30*60*1000,
  goals:function(ws){ var ps=ws.playerState, G=[], tg=typeof ZJOUR!=='undefined'&&ZJOUR.target?ZJOUR.target(ws):null; if(tg&&tg.t)G.push(['🧭',tg.t,'your road']);
    var open=ps.unlockedSections||[1], best=null; (ws.wd&&ws.wd.sites||[]).forEach(function(s){ if(open.indexOf(s.section)<0||(ps.lockedSites||[]).indexOf(s.id)>=0||!(s.type==='tower'||s.type==='dungeon'))return; var e=typeof ZSITET!=='undefined'?ZSITET.est(s):8; var d=ws.player?Math.hypot(s.tx*TILE-ws.player.x,s.ty*TILE-ws.player.y):0; if(!best||d<best.d)best={s:s,d:d,e:e}; });
    if(best)G.push(['🏰','Clear '+best.s.name,'≈ '+best.e+' min']);
    var f=ZDAY.fest(ps); if(f)G.push([ZDAY.FICON[f],'Keep '+ZDAY.FNAME[f]+' on the Green','festival days']);
    else if(typeof ZSECRET!=='undefined'){ var c=ZSECRET.count(ps); G.push(['✨','Find a secret ('+c.got+' of '+c.all+' so far)','a little off the road']); }
    if(G.length<3&&(ps.letters||[]).length)G.push(['✉','Read the letters on your table','at home']);
    return G.slice(0,3); },
  show:function(ws,away){ if(!ZRECAP.on||document.querySelector('.zrecap'))return; var ps=ws.playerState, R=(ps.recent||[]).slice(-3).reverse(), bg=Z2.pic(['wl_vista_silverrun','wl_vista_lilies','wl_vista_scar','wl_vista_ember'][Math.max(0,Math.min(3,(typeof getTileSection==='function'&&ws.player?getTileSection(Math.floor(ws.player.x/TILE),Math.floor(ws.player.y/TILE)):1)-1))]);
    var h=Math.round(away/3600000), when=h>=48?Math.round(h/24)+' days':h>=1?h+' hour'+(h===1?'':'s'):'a little while';
    var d=Z2.overlay('zrecap',(bg?'<img class="zr-bg" src="'+bg+'" alt="">':'')+'<div class="zr-box"><small>'+when+' away</small><h2>Last time, in your saga…</h2><p class="zr-where">'+Z2.esc(Z2.hero(ps))+' stands in <b>'+Z2.esc(Z2.region())+'</b> — day '+ZDAY.day(ps)+', '+Z2.esc(ZDAY.NAME[ps.seasNow||ZDAY.season(ps)])+'.</p>'+
      (R.length?'<ul class="zr-did">'+R.map(function(e){ return '<li>You '+Z2.esc(e.txt)+'.</li>'; }).join('')+'</ul>':'')+
      '<h3>Three things for tonight</h3><ol class="zr-g">'+ZRECAP.goals(ws).map(function(g){ return '<li><span>'+g[0]+'</span>'+Z2.esc(g[1])+' <small>'+Z2.esc(g[2])+'</small></li>'; }).join('')+'</ol>'+
      ((ps.letters||[]).length?'<p class="zr-l">✉ '+ps.letters.length+' letter'+(ps.letters.length===1?'':'s')+' wait on your table at home.</p>':'')+'<button>Onward</button></div>');
    var close=function(){ d.classList.add('out'); setTimeout(function(){ d.remove(); },450); document.removeEventListener('keydown',kd,true); }, kd=function(e){ if(e.key===' '||e.key==='Enter'||e.key==='Escape'||e.key==='Tab'){ e.preventDefault(); e.stopPropagation(); close(); } };
    d.querySelector('button').onclick=close; setTimeout(function(){ document.addEventListener('keydown',kd,true); },700); } };
ZEV.sub('load',function(d,ps){ var ws=Z2.ws(), at=ps._savedAt||0, away=at?Date.now()-at:0; if(!at||away<0)return;
  setTimeout(function(){ if(ZLETTER.on&&away>=ZLETTER.AWAY)ZLETTER.write(ps); if(away>=ZRECAP.AWAY&&ws&&ws.player)ZRECAP.show(ws,away); },2600); });

// ── stamps on the map; a waystone shows the land around it ──
var ZSTAMP={ on:true, tool:null, R:40,
  K:[['chest','📦','A chest'],['danger','⚠️','Danger'],['back','↩️','Come back'],['boss','💀','A boss'],['trader','🪙','A trader'],['secret','✨','A secret'],['fav','❤️','A favourite place'],['ask','❓','A question']],
  of:function(k){ return ZSTAMP.K.find(function(x){ return x[0]===k; }); },
  bar:function(){ var md=document.querySelector('#modal-map .wmap-modal')||document.querySelector('#modal-map .modal'); if(!md||md.querySelector('.zstamp-bar'))return; var b=document.createElement('div'); b.className='zstamp-bar';
    b.innerHTML='<span>Stamps:</span>'+ZSTAMP.K.map(function(k){ var p=Z2.pic('stamp_'+k[0]); return '<button data-st="'+k[0]+'" title="'+k[2]+'">'+(p?'<img src="'+p+'" alt="">':k[1])+'</button>'; }).join('')+'<button data-st="x" title="Lift a stamp">✕</button><small>pick one, then click the map</small>';
    var hd=md.querySelector('.mhdr'); if(hd&&hd.nextSibling)md.insertBefore(b,hd.nextSibling); else md.appendChild(b);
    b.addEventListener('click',function(e){ var t=e.target.closest('[data-st]'); if(!t)return; e.stopPropagation(); ZSTAMP.tool=ZSTAMP.tool===t.dataset.st?null:t.dataset.st; b.querySelectorAll('[data-st]').forEach(function(x){ x.classList.toggle('on',x.dataset.st===ZSTAMP.tool); }); var cv=document.getElementById('minimap-canvas'); if(cv)cv.style.cursor=ZSTAMP.tool?'crosshair':''; }); },
  at:function(e){ var cv=document.getElementById('minimap-canvas'), r=cv.getBoundingClientRect(), v=_wmView(); return {x:v.x+(e.clientX-r.left)/r.width*v.w,y:v.y+(e.clientY-r.top)/r.height*v.h,v:v,r:r}; },
  click:function(e){ if(!ZSTAMP.tool)return; var ws=Z2.ws(), ps=ws&&ws.playerState; if(!ps)return; e.preventDefault(); e.stopImmediatePropagation(); var p=ZSTAMP.at(e), S=ps.stamps||(ps.stamps=[]), near=-1, px=p.v.w/p.r.width;
    S.forEach(function(s,i){ if(Math.hypot(s.x-p.x,s.y-p.y)<14*px)near=i; });
    if(near>=0)S.splice(near,1); else if(ZSTAMP.tool!=='x'){ S.push({k:ZSTAMP.tool,x:Math.round(p.x),y:Math.round(p.y)}); ZEV.emit('stamp',{}); }
    try{ renderMinimap(ws.wd,ws.player,ps.unlockedSections,ps.exploredGrid,ws._expVer||0,ps.activeQuest,true); }catch(err){} },
  draw:function(ctx,v,cw,ws){ var S=ws.playerState&&ws.playerState.stamps; if(!S||!S.length)return; var sc=cw/v.w; ctx.save(); ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.font=Math.round(Math.max(14,Math.min(26,cw/40)))+'px "Segoe UI Emoji",sans-serif';
    S.forEach(function(s){ if(s.x<v.x||s.y<v.y||s.x>v.x+v.w||s.y>v.y+v.h)return; var k=ZSTAMP.of(s.k); if(!k)return; var x=(s.x-v.x)*sc, y=(s.y-v.y)*sc; ctx.fillStyle='rgba(20,14,6,.55)'; ctx.beginPath(); ctx.arc(x,y,Math.max(10,cw/80),0,Math.PI*2); ctx.fill(); ctx.fillStyle='#fff'; ctx.fillText(k[1],x,y+1); }); ctx.restore(); },
  reveal:function(ws,w){ var EG=ws._expGrid?ws._expGrid():ws.playerState.exploredGrid; if(!EG||typeof EXP_SCALE==='undefined')return; var cx=Math.floor(w.x/EXP_SCALE), cy=Math.floor(w.y/EXP_SCALE), R=Math.round(ZSTAMP.R/EXP_SCALE);
    for(var dy=-R;dy<=R;dy++)for(var dx=-R;dx<=R;dx++){ if(Math.hypot(dx,dy)>R)continue; var x=cx+dx, y=cy+dy; if(x>=0&&x<EXP_W&&y>=0&&y<EXP_H)EG[y*EXP_W+x]=1; } ws._expVer=(ws._expVer||0)+1; ws._worldFogDirty=true; } };
(function(){ if(typeof _wmDrawView==='function'){ var d0=_wmDrawView; _wmDrawView=function(ctx,cw,ch,ws,v,o){ var r=d0.apply(this,arguments); try{ if(ZSTAMP.on&&o&&o.full)ZSTAMP.draw(ctx,v,cw,ws); }catch(e){} return r; }; }
  if(typeof openWorldMap==='function'){ var om=openWorldMap; openWorldMap=function(){ var r=om.apply(this,arguments); try{ if(ZSTAMP.on){ ZSTAMP.bar(); var cv=document.getElementById('minimap-canvas'); if(cv&&!cv._zst){ cv._zst=1; cv.addEventListener('click',ZSTAMP.click,true); cv.addEventListener('mousedown',function(e){ if(ZSTAMP.tool)e.stopImmediatePropagation(); },true); } } }catch(e){} return r; }; }
  if(typeof WorldScene!=='undefined'&&WorldScene.prototype._activateWaystone){ var aw=WorldScene.prototype._activateWaystone; WorldScene.prototype._activateWaystone=function(w){ var r=aw.apply(this,arguments); try{ if(ZSTAMP.on)ZSTAMP.reveal(this,w); }catch(e){} return r; }; } })();

// ── the Tome as a collection: stickers ──
var ZBOOK={ on:true,
  ST:[['begin','🌄','Set out from the village',function(){ return true; }],['home','🛏','A bed of your own',function(){ return true; }],
    ['lamb','🐑','Saved the lamb',function(ps){ return (ps.firstWin||0)>=3; }],['boss1','🏆','First boss down',function(ps){ return (ps.zst||{}).boss; }],['spell1','✨','First spell',function(ps){ return (ps.spellsLearned||[]).length>0; }],
    ['fam1','🐾','A familiar at your side',function(ps){ return !!ps.familiar; }],['mount1','🐎','First ride',function(ps){ return (ps.mounts||[]).length>0||!!ps.mount; }],['spirit1','👻','A spirit set free',function(ps){ return (ps.spiritsFreed||[]).length>0; }],
    ['spirit10','🕯','Ten spirits home',function(ps){ return (ps.spiritsFreed||[]).length>=10; }],['realm2','🌊','Into the Wetlands',function(ps){ return (ps.unlockedSections||[]).indexOf(2)>=0; }],['realm3','⛰','Into the Highlands',function(ps){ return (ps.unlockedSections||[]).indexOf(3)>=0; }],
    ['realm4','🌋','Into the Ashlands',function(ps){ return (ps.unlockedSections||[]).indexOf(4)>=0; }],['end','🌸','The saga\'s end',function(ps){ return !!ps.spiritsHome; }],['lv10','⭐','Level 10',function(ps){ return (ps.level||1)>=10; }],['lv25','🌟','Level 25',function(ps){ return (ps.level||1)>=25; }],
    ['secret1','🔎','A first secret',function(ps){ return Object.keys(ps.secrets||{}).length>0; }],['secret30','🗝','Thirty secrets',function(ps){ return Object.keys(ps.secrets||{}).length>=30; }],['secret120','👑','Every secret',function(ps){ return Object.keys(ps.secrets||{}).length>=120; }],
    ['fest1','🎉','A festival kept',function(ps){ return (ps.zst||{}).fest; }],['fest5','🎪','All five festivals',function(ps){ return Object.keys(ps.ribbons||{}).length>=5; }],['echo1','🔔','First echo',function(ps){ return Object.keys(ps.medals||{}).length>0; }],
    ['gold1','🥇','A gold rune (no hit)',function(ps){ var M=ps.medals||{}; return Object.keys(M).some(function(k){ return M[k]>=3; }); }],['letter','✉','Letters from home',function(ps){ return (ps.zst||{}).letters; }],['photo','📷','A picture taken',function(ps){ return (ps.zst||{}).photo; }],
    ['stamp','📍','A map stamp',function(ps){ return (ps.stamps||[]).length>0; }],['hearth','🔥','Rested by the hearth',function(ps){ return (ps.zst||{}).hearth; }],['bond','❤️','A full bond',function(ps){ var B=ps.bonds||{}; return Object.keys(B).some(function(k){ return (B[k]||0)>=15; }); }],['trophy','🏺','A trophy on the shelf',function(ps){ var T=ps.trophySpots||{}; return Object.keys(T).some(function(k){ return T[k]; }); }]],
  tick:function(){ if(!ZBOOK.on||!Z2.playing())return; var ps=Z2.ps(), S=ps.stickers||(ps.stickers={}); ZBOOK.ST.forEach(function(s){ if(S[s[0]])return; var ok=false; try{ ok=!!s[3](ps); }catch(e){} if(ok){ S[s[0]]=Math.floor(ps.gday||0)+1; if(s[0]!=='begin'&&s[0]!=='home'&&typeof showNotif==='function')showNotif('📖 A sticker for your Tome: '+s[1]+' '+s[2],'#ffe9a8'); } }); },
  page:function(){ var ps=Z2.ps()||{}, b=typeof Tome!=='undefined'?Tome.book()||{}:{}, S=ps.stickers||{}, h='<div class="zbk">';
    h+='<h4>How full is your Tome?</h4><div class="zbk-ch">'+TOME_CATS.filter(function(c){ return !c.page; }).map(function(c){ var L=Tome.list(c.k), n=L.filter(function(id){ return b[c.k]&&b[c.k][id]; }).length, p=L.length?Math.round(n*100/L.length):0;
      return '<div class="zbk-r"><span>'+c.i+' '+c.n+'</span><i><b style="width:'+p+'%"></b></i><em>'+p+' %</em></div>'; }).join('')+'</div>';
    var got=ZBOOK.ST.filter(function(s){ return S[s[0]]; }).length;
    h+='<h4>Stickers <small>'+got+' / '+ZBOOK.ST.length+'</small></h4><div class="zbk-st">'+ZBOOK.ST.map(function(s){ var on=S[s[0]], p=Z2.pic('stk_'+s[0]); return '<div class="zbk-s'+(on?' on':'')+'" title="'+Z2.esc(s[2])+(on?' — day '+on:'')+'">'+(on?(p?'<img src="'+p+'" alt="">':'<span>'+s[1]+'</span>'):'<span>?</span>')+'<small>'+(on?Z2.esc(s[2]):'???')+'</small></div>'; }).join('')+'</div>';
    if(typeof ZSECRET!=='undefined'){ var C=ZSECRET.count(ps); h+='<h4>Secrets <small>'+C.got+' / '+C.all+'</small></h4><div class="zbk-ch">'+[1,2,3,4].map(function(q){ var c=C.by[q]||{got:0,all:0}, p=c.all?Math.round(c.got*100/c.all):0; return '<div class="zbk-r"><span>'+Z2.REALM[q].replace('the ','')+'</span><i><b style="width:'+p+'%"></b></i><em>'+c.got+' / '+c.all+'</em></div>'; }).join('')+'</div>'; }
    if(typeof ZECHO!=='undefined'){ var M=ps.medals||{}, ks=Object.keys(M); h+='<h4>Echo runes <small>'+ks.length+' bosses</small></h4>'+(ks.length?'<div class="zbk-med">'+ks.map(function(k){ return '<span>'+['','🥉','🥈','🥇'][M[k]]+' '+Z2.esc((ps.medalNames||{})[k]||k)+'</span>'; }).join('')+'</div>':'<p class="tome-empty">Beaten bosses wait as echoes in the crypt by the Green.</p>'); }
    var R=ps.ribbons||{}; h+='<h4>Festival ribbons <small>'+Object.keys(R).length+' / 5</small></h4><div class="zbk-med">'+['sp','su','au','wi','bl'].map(function(s){ return '<span class="'+(R[s]?'':'off')+'">'+ZDAY.FICON[s]+' '+ZDAY.FNAME[s]+'</span>'; }).join('')+'</div>';
    return h+'</div>'; } };
setTimeout(function(){ if(typeof Tome==='undefined'||typeof TOME_CATS==='undefined')return; TOME_CATS.push({k:'book',n:'Collection',i:'🏷️',page:1});
  var l0=Tome.list; Tome.list=function(cat){ return cat==='book'?[]:l0.call(Tome,cat); };
  var r0=Tome.render; Tome.render=function(){ r0.call(Tome); if(Tome.ui.cat!=='book')return; var g=document.getElementById('tome-grid'), d=document.getElementById('tome-detail'); if(!g)return; g.classList.add('tome-page'); g.innerHTML=ZBOOK.page(); if(d)d.innerHTML='<p class="tome-empty">Your saga, collected: every chapter, the firsts you have earned, the secrets, the echo runes and the festival ribbons.</p>'; }; },0);
ZEV.sub('boss',function(d,ps){ if(!d.echo){ (ps.zst||(ps.zst={})).boss=1; } });
ZEV.sub('festival',function(d,ps){ (ps.zst||(ps.zst={})).fest=1; });
ZEV.sub('letters',function(d,ps){ (ps.zst||(ps.zst={})).letters=1; });

// ── rest by the hearth ──
var ZHEARTH={ on:true,
  show:function(d){ if(!ZHEARTH.on||document.querySelector('.zhearth'))return; var ps=Z2.ps(), bg=Z2.pic('hearth_tableau'), its={}; (d.items||[]).forEach(function(i){ its[i]=(its[i]||0)+1; });
    var IT=Object.keys(its).slice(0,8).map(function(i){ var I=typeof ITEMS!=='undefined'&&ITEMS[i]; return I?I.icon+' '+I.name+(its[i]>1?' ×'+its[i]:''):i; });
    var mm=Math.floor(d.t/60), ss=d.t%60;
    var el=Z2.overlay('zhearth',(bg?'<img class="zh-bg" src="'+bg+'" alt="">':'<div class="zh-fire">🔥</div>')+'<div class="zh-box"><small>'+(d.boss?'The guardian has fallen':'The site is quiet')+'</small><h2>'+Z2.esc(d.boss||d.name)+'</h2>'+
      '<table><tr><td>⏱ Time</td><td>'+mm+':'+(ss<10?'0':'')+ss+'</td></tr><tr><td>🪙 Gold</td><td>+'+d.gold+'</td></tr><tr><td>⭐ Experience</td><td>+'+d.xp+'</td></tr><tr><td>🎒 Found</td><td>'+(IT.length?Z2.esc(IT.join(', ')):'—')+'</td></tr>'+(d.hits===0?'<tr><td>🛡</td><td>Not a scratch!</td></tr>':'')+'</table>'+
      '<div class="zh-b"><button class="zh-on">Onward</button><button class="zh-rest">🔥 Rest by the hearth</button>'+(typeof ZSHARE!=='undefined'?'<button class="zh-card">📜 Saga card</button>':'')+'</div></div>');
    var close=function(){ el.classList.add('out'); setTimeout(function(){ el.remove(); },400); };
    el.querySelector('.zh-on').onclick=close; el.querySelector('.zh-rest').onclick=function(){ close(); ZHEARTH.rest(); };
    var c=el.querySelector('.zh-card'); if(c)c.onclick=function(){ ZSHARE.card({kind:'boss',title:d.boss?(Z2.hero(ps)+' defeated '+d.boss):(Z2.hero(ps)+' cleared '+d.name),sub:'Day '+ZDAY.day(ps)+' · '+mm+':'+(ss<10?'0':'')+ss+(d.hits===0?' · not a scratch':''),pic:d.boss?null:null}); }; },
  rest:function(){ var ws=Z2.ws(), ps=ws&&ws.playerState; if(!ps)return; try{ if(ws._save)ws._save(); }catch(e){} (ps.zst||(ps.zst={})).hearth=1;
    var bg=Z2.pic('hearth_dusk'), d=Z2.overlay('zdusk',(bg?'<img src="'+bg+'" alt="">':'')+'<div class="zd-c"><p>The lamps are lit along the Green. Smoke from every chimney. Your saga is saved and will wait for you.</p><div><button class="zd-k">Keep playing</button><button class="zd-q">Rest for tonight (to the title)</button></div></div>');
    d.querySelector('.zd-k').onclick=function(){ d.classList.add('out'); setTimeout(function(){ d.remove(); },600); };
    d.querySelector('.zd-q').onclick=function(){ d.remove(); if(typeof doReturnToTitle==='function')doReturnToTitle(); }; } };
ZEV.sub('site',function(d){ setTimeout(function(){ if(Z2.act('World'))ZHEARTH.show(d); },1400); });

// ── photo mode ──
var ZPHOTO={ on:true, frame:'wl_frame_saga', grade:'none',
  FR:[['','No frame'],['wl_frame_saga','The illuminated saga'],['wl_frame_runestone','The runestones'],['wl_frame_tapestry','The tapestry'],['wl_frame_stage','The puppet stage']],
  GR:{none:['As it is',''],warm:['Lantern light','sepia(.25) saturate(1.2) brightness(1.05)'],dusk:['Dusk','saturate(1.15) hue-rotate(-12deg) brightness(.85) contrast(1.05)'],frost:['Frost','saturate(.6) hue-rotate(12deg) brightness(1.08)'],moon:['Moonlight','saturate(.45) hue-rotate(190deg) brightness(.8)'],saga:['Old saga','sepia(.75) contrast(1.05)']},
  frames:function(){ var B=(typeof ZBANNER!=='undefined'?ZBANNER.ids():[]).map(function(id){ return [id,'Banner '+id.replace(/\D/g,'')]; }); return ZPHOTO.FR.concat(B).filter(function(f){ return !f[0]||Z2.pic(f[0]); }); },
  cv:function(){ return document.querySelector('#game-container canvas')||document.querySelector('#phaser-root canvas')||document.querySelector('canvas'); },
  open:function(){ if(!ZPHOTO.on||document.querySelector('.zphoto-bar'))return; if(typeof ZPAUSE!=='undefined')ZPAUSE.closeAll(); document.body.classList.add('zphoto'); var fr=ZPHOTO.frames();
    var bar=Z2.overlay('zphoto-bar','<b>📷 Photo</b><label>Frame <select class="zph-f">'+fr.map(function(f){ return '<option value="'+f[0]+'"'+(f[0]===ZPHOTO.frame?' selected':'')+'>'+f[1]+'</option>'; }).join('')+'</select></label>'+
      '<label>Light <select class="zph-g">'+Object.keys(ZPHOTO.GR).map(function(k){ return '<option value="'+k+'"'+(k===ZPHOTO.grade?' selected':'')+'>'+ZPHOTO.GR[k][0]+'</option>'; }).join('')+'</select></label>'+
      '<label>Face <select class="zph-p"><option value="down">Towards you</option><option value="left">Left</option><option value="right">Right</option><option value="up">Away</option></select></label><button class="zph-s">💾 Save the picture</button><button class="zph-x">✕ Done</button>');
    var lay=Z2.overlay('zphoto-frame',''); ZPHOTO.apply();
    bar.querySelector('.zph-f').onchange=function(){ ZPHOTO.frame=this.value; ZPHOTO.apply(); }; bar.querySelector('.zph-g').onchange=function(){ ZPHOTO.grade=this.value; ZPHOTO.apply(); };
    bar.querySelector('.zph-p').onchange=function(){ ZPHOTO.face(this.value); }; bar.querySelector('.zph-s').onclick=ZPHOTO.save; bar.querySelector('.zph-x').onclick=ZPHOTO.close;
    ZPHOTO._kd=function(e){ if(e.key==='Escape'){ e.preventDefault(); e.stopImmediatePropagation(); ZPHOTO.close(); } }; document.addEventListener('keydown',ZPHOTO._kd,true);
    try{ var sc=typeof _activePlayScene==='function'&&_activePlayScene(false); if(sc&&!sc.sys.isPaused()){ sc.scene.pause(); ZPHOTO._sc=sc; } }catch(e){} },
  apply:function(){ var c=ZPHOTO.cv(); if(c)c.style.filter=ZPHOTO.GR[ZPHOTO.grade][1]; var l=document.querySelector('.zphoto-frame'); if(l){ var p=ZPHOTO.frame&&Z2.pic(ZPHOTO.frame); l.innerHTML=(p?'<img src="'+p+'" alt="">':'')+'<span class="zph-mark">The Quests of Zola and Zoldor</span>'; } },
  face:function(dir){ try{ var sc=ZPHOTO._sc||(typeof _activePlayScene==='function'&&_activePlayScene(true)); var st=sc&&(sc.pWalkSt||sc.walkSt||sc._heroSt); if(st){ st.dir=dir; st.facing=dir; } if(sc&&sc._zHeroSpr&&sc._zHeroSpr.setFlipX)sc._zHeroSpr.setFlipX(dir==='left'); if(sc&&typeof _heroAnimate==='function'&&st){ var spr=sc._zHeroSpr||sc.pSprite||sc.bSprite; if(spr)_heroAnimate(sc,spr,st,{left:-1,right:1}[dir]||0,{up:-1,down:1}[dir]||0,16,0,0); } }catch(e){} },
  save:function(){ var g=game&&game.renderer; if(!g||!g.snapshot)return; g.snapshot(function(img){ try{ var c=document.createElement('canvas'), W=img.width, H=img.height; c.width=W; c.height=H; var x=c.getContext('2d'); x.filter=ZPHOTO.GR[ZPHOTO.grade][1]||'none'; x.drawImage(img,0,0); x.filter='none';
      var fp=ZPHOTO.frame&&Z2.pic(ZPHOTO.frame), fin=function(){ x.font='600 '+Math.round(H/38)+'px Georgia,serif'; x.textAlign='right'; x.fillStyle='rgba(255,240,200,.85)'; x.shadowColor='#000'; x.shadowBlur=6; x.fillText('The Quests of Zola and Zoldor',W-W/40,H-H/30);
        c.toBlob(function(b){ var a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='zeldara-photo-'+Date.now()+'.png'; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); },500); var ps=Z2.ps(); if(ps)(ps.zst||(ps.zst={})).photo=1; if(typeof showNotif==='function')showNotif('📷 Picture saved','#ffe9a8'); }); };
      if(fp){ var im=new Image(); im.onload=function(){ x.drawImage(im,0,0,W,H); fin(); }; im.src=fp; } else fin(); }catch(e){ if(typeof console!=='undefined')console.warn(e); } }); },
  close:function(){ document.querySelectorAll('.zphoto-bar,.zphoto-frame').forEach(function(e){ e.remove(); }); document.body.classList.remove('zphoto'); var c=ZPHOTO.cv(); if(c)c.style.filter=''; document.removeEventListener('keydown',ZPHOTO._kd,true);
    try{ if(ZPHOTO._sc){ ZPHOTO._sc.scene.resume(); ZPHOTO._sc=null; } }catch(e){} } };
setTimeout(function(){ if(typeof ZPAUSE!=='undefined'&&ZPAUSE.TABS){ var _zpi=ZPAUSE.TABS.findIndex(function(t){ return t.id==='dev'; }); ZPAUSE.TABS.splice(_zpi<0?ZPAUSE.TABS.length:_zpi,0,{id:'photo',ic:'📷',n:'Photo',el:['zphoto-none'],open:function(){ setTimeout(ZPHOTO.open,60); }}); } },0);

// ── saga cards ──
var ZSHARE={ on:true,
  BG:{boss:'wl_vista_scar',festival:'wl_vista_silverrun',end:'wl_vista_lilies',site:'wl_vista_silverrun'},
  draw:function(o,cb){ var W=1200, H=630, c=document.createElement('canvas'); c.width=W; c.height=H; var x=c.getContext('2d'), p=o.pic||Z2.pic(ZSHARE.BG[o.kind]||'wl_vista_silverrun');
    var fin=function(){ var g=x.createLinearGradient(0,H*0.45,0,H); g.addColorStop(0,'rgba(6,8,14,0)'); g.addColorStop(1,'rgba(6,8,14,.88)'); x.fillStyle=g; x.fillRect(0,0,W,H);
      var fr=Z2.pic('wl_frame_saga'), txt=function(){ x.textAlign='center'; x.shadowColor='#000'; x.shadowBlur=10; x.fillStyle='#ffe9a8'; x.font='700 52px Georgia,serif'; x.fillText(o.title,W/2,H-150,W-160); x.fillStyle='#e8eef6'; x.font='28px Georgia,serif'; x.fillText(o.sub||'',W/2,H-100,W-160);
        x.font='italic 20px Georgia,serif'; x.fillStyle='rgba(255,240,200,.8)'; x.fillText('The Quests of Zola and Zoldor',W/2,H-50); cb(c); };
      if(fr){ var im=new Image(); im.onload=function(){ x.drawImage(im,0,0,W,H); txt(); }; im.onerror=txt; im.src=fr; } else txt(); };
    if(p){ var im=new Image(); im.onload=function(){ var s=Math.max(W/im.width,H/im.height); x.drawImage(im,(W-im.width*s)/2,(H-im.height*s)/2,im.width*s,im.height*s); fin(); }; im.onerror=function(){ x.fillStyle='#1a2a3a'; x.fillRect(0,0,W,H); fin(); }; im.src=p; }
    else { var gg=x.createLinearGradient(0,0,W,H); gg.addColorStop(0,'#2a3a5a'); gg.addColorStop(1,'#5a3a2a'); x.fillStyle=gg; x.fillRect(0,0,W,H); fin(); } },
  card:function(o){ if(!ZSHARE.on)return; ZSHARE.draw(o,function(c){ var url=c.toDataURL('image/png'), d=Z2.overlay('zshare','<div class="zs-box"><img src="'+url+'" alt=""><div class="zs-b"><button class="zs-save">💾 Save</button><button class="zs-copy">📋 Copy</button>'+(navigator.share?'<button class="zs-share">↗ Share</button>':'')+'<button class="zs-x">Close</button></div></div>');
      d.querySelector('.zs-x').onclick=function(){ d.remove(); };
      d.querySelector('.zs-save').onclick=function(){ var a=document.createElement('a'); a.href=url; a.download='zeldara-saga-card.png'; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); },500); };
      d.querySelector('.zs-copy').onclick=function(){ var b=this; c.toBlob(function(bl){ try{ navigator.clipboard.write([new ClipboardItem({'image/png':bl})]).then(function(){ b.textContent='Copied ✓'; },function(){ b.textContent='Copy not allowed here'; }); }catch(e){ b.textContent='Copy not allowed here'; } }); };
      var sh=d.querySelector('.zs-share'); if(sh)sh.onclick=function(){ c.toBlob(function(bl){ try{ navigator.share({files:[new File([bl],'zeldara-saga-card.png',{type:'image/png'})],title:o.title}).catch(function(){}); }catch(e){} }); }; }); },
  offer:function(o){ if(!ZSHARE.on||typeof ZCARD==='undefined')return; setTimeout(function(){ ZCARD.show({who:'A saga card',icon:'📜',text:o.title+' — a card to keep or share?',cls:'zc-hook',btns:[{t:'Make the card',f:function(){ ZSHARE.card(o); }},{t:'Not now'}]}); },2600); } };
ZEV.sub('festival',function(d,ps){ ZSHARE.offer({kind:'festival',title:Z2.hero(ps)+' kept '+ZDAY.FNAME[d.s],sub:'Day '+ZDAY.day(ps)+' · '+ZDAY.NAME[d.s]}); });
ZEV.sub('end',function(d,ps){ ZSHARE.offer({kind:'end',title:'The saga of '+Z2.hero(ps)+' is told',sub:'Day '+ZDAY.day(ps)+' · level '+(ps.level||1)}); });

// ── challenge codes ──
var ZCODE={ AL:'ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
  sum:function(s){ var h=7; for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%1048573; return h; },
  b32:function(n,len){ var s=''; for(var i=0;i<len;i++){ s=ZCODE.AL[n%32]+s; n=Math.floor(n/32); } return s; },
  un32:function(s){ var n=0; for(var i=0;i<s.length;i++){ var k=ZCODE.AL.indexOf(s[i]); if(k<0)return -1; n=n*32+k; } return n; },
  // boss key index (in ZECHO's list) + time in seconds + medal → ZQ-XXX-XXXX-XX
  make:function(bi,secs,medal){ var body=ZCODE.b32(bi,2)+ZCODE.b32(Math.min(32767,secs),3)+ZCODE.b32(medal,1); return 'ZQ-'+body.slice(0,3)+'-'+body.slice(3)+'-'+ZCODE.b32(ZCODE.sum(body)%1024,2); },
  read:function(code){ var s=String(code||'').toUpperCase().replace(/[^A-Z0-9]/g,''); if(s.indexOf('ZQ')!==0||s.length!==10)return null; var body=s.slice(2,8), ck=s.slice(8); if(ZCODE.b32(ZCODE.sum(body)%1024,2)!==ck)return null;
    return {bi:ZCODE.un32(body.slice(0,2)),secs:ZCODE.un32(body.slice(2,5)),medal:ZCODE.un32(body.slice(5,6))}; } };

if(typeof setInterval!=='undefined')setInterval(function(){ try{ ZEV.tick(); ZDAY.tick(); ZLETTER.tick(); ZBOOK.tick(); }catch(e){ if(typeof console!=='undefined')console.warn('wave2',e); } },1000);
(function(){ if(typeof document==='undefined')return; var st=document.createElement('style'); st.textContent=
  '#zday{position:absolute;left:4px;bottom:4px;z-index:3;padding:1px 7px;border-radius:8px;background:rgba(8,12,20,.72);color:#e8dcc0;font:600 10.5px "Segoe UI";pointer-events:none;white-space:nowrap}#zday.fest{color:#ffe27a;box-shadow:0 0 8px rgba(255,210,110,.5)}'+
  '.zk-plb{display:flex;gap:6px;margin:4px 0 6px}.zk-plb button{padding:3px 9px;border-radius:6px;border:1px solid #445;background:#1a2230;color:#c8d4e4;font-size:12px;cursor:pointer}'+
  '#zletters-btn{position:absolute;left:50%;bottom:90px;transform:translateX(-50%);z-index:60;padding:8px 16px;border-radius:10px;border:1px solid rgba(255,226,122,.6);background:rgba(40,28,10,.85);color:#ffe9a8;font:600 15px Georgia,serif;cursor:pointer;animation:zdPulse 2s infinite}'+
  '.zletters,.zrecap,.zhearth,.zdusk,.zshare{position:fixed;inset:0;z-index:140;display:flex;align-items:center;justify-content:center;background:rgba(4,6,10,.62);animation:zcpIn .5s ease-out;transition:opacity .45s}.zrecap.out,.zhearth.out,.zdusk.out{opacity:0}'+
  '.zl-box{width:min(560px,92vw);max-height:86vh;overflow:auto;padding:20px 26px;border-radius:6px;background:linear-gradient(180deg,#efe2c0,#d8c49a);color:#3a2812;font:16px/1.55 Georgia,serif;box-shadow:0 18px 60px rgba(0,0,0,.7)}.zl-box h2{margin:0 0 10px;font-size:22px;color:#6a2a10}'+
  '.zl-l{border-top:1px dashed #8a6a3a;padding:10px 0}.zl-s{text-align:right;font-style:italic}.zl-g{font-size:13.5px;color:#5a3a12}.zl-box button,.zr-box button,.zh-b button,.zd-c button,.zs-b button{margin-top:10px;padding:7px 18px;border-radius:8px;border:1px solid #2a1404;background:linear-gradient(180deg,#8a4a1a,#5a2a0a);color:#f8e8c0;font:600 14px Georgia,serif;cursor:pointer}'+
  '.zr-bg,.zh-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.55) saturate(1.1);animation:zmsKen 18s ease-out both}.zr-box,.zh-box{position:relative;width:min(620px,92vw);padding:22px 28px;border-radius:14px;background:rgba(10,14,22,.78);border:1px solid rgba(255,226,122,.45);color:#e8eef6;font:15px/1.5 Georgia,serif;box-shadow:0 18px 60px rgba(0,0,0,.7)}'+
  '.zr-box small,.zh-box small{font:12px "Segoe UI";letter-spacing:.12em;text-transform:uppercase;color:#c8b8e8}.zr-box h2,.zh-box h2{margin:4px 0 10px;font-size:28px;color:#ffe27a}.zr-box h3{font-size:15px;color:#ffcf9a;margin:12px 0 4px}.zr-did{margin:4px 0;padding-left:20px;color:#d8e2ee}.zr-g{padding-left:4px;list-style:none;margin:0}.zr-g li{margin:4px 0}.zr-g span{display:inline-block;width:28px}.zr-g small{color:#9ab0c8;text-transform:none;letter-spacing:0;margin-left:6px}.zr-l{color:#ffe9a8}'+
  '.zh-fire{position:absolute;font-size:120px;opacity:.35;filter:blur(1px);animation:zdPulse 2s infinite}.zh-box table{width:100%;border-collapse:collapse;margin:6px 0}.zh-box td{padding:4px 6px;border-bottom:1px dashed rgba(255,255,255,.18)}.zh-box td:last-child{text-align:right;color:#ffe9a8}.zh-b{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}'+
  '.zdusk{background:linear-gradient(180deg,rgba(40,20,60,.55),rgba(255,120,40,.35));backdrop-filter:sepia(.4) saturate(1.3) brightness(.7)}.zdusk img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.zd-c{position:relative;max-width:560px;text-align:center;color:#ffe9c8;font:italic 20px/1.5 Georgia,serif;text-shadow:0 2px 8px #000}.zd-c div{display:flex;gap:10px;justify-content:center}'+
  '.zstamp-bar{display:flex;flex-wrap:wrap;align-items:center;gap:4px;margin:2px 0 6px;font:12px "Segoe UI";color:#9ab0c8}.zstamp-bar button{width:30px;height:28px;padding:0;border-radius:6px;border:1px solid #445;background:#141c28;font-size:16px;cursor:pointer}.zstamp-bar button.on{background:#5a4a14;border-color:#ffd76a}.zstamp-bar img{width:22px;height:22px;object-fit:contain}'+
  '.zbk h4{margin:12px 0 6px;font:600 15px Georgia,serif;color:#5a3a12}.zbk h4 small{font-weight:400;color:#8a6a3a}.zbk-r{display:grid;grid-template-columns:160px 1fr 70px;gap:8px;align-items:center;font:13px "Segoe UI";color:#3a2812;margin:2px 0}.zbk-r i{height:9px;border-radius:5px;background:rgba(90,60,20,.18);overflow:hidden}.zbk-r i b{display:block;height:100%;background:linear-gradient(90deg,#c8a040,#ffd76a)}.zbk-r em{font-style:normal;text-align:right}'+
  '.zbk-st{display:grid;grid-template-columns:repeat(auto-fill,minmax(86px,1fr));gap:6px}.zbk-s{display:flex;flex-direction:column;align-items:center;padding:6px 2px;border-radius:10px;border:2px dashed rgba(90,60,20,.3);color:#8a7a5a;text-align:center}.zbk-s span{font-size:28px;filter:grayscale(1) opacity(.4)}.zbk-s.on{border-style:solid;border-color:#c8a040;background:rgba(255,230,160,.35);color:#3a2812}.zbk-s.on span{filter:none}.zbk-s img{width:44px;height:44px;object-fit:contain}.zbk-s small{font:11px/1.2 "Segoe UI"}'+
  '.zbk-med{display:flex;flex-wrap:wrap;gap:6px}.zbk-med span{padding:2px 8px;border-radius:9px;background:rgba(255,230,160,.45);font:12.5px "Segoe UI";color:#3a2812}.zbk-med span.off{opacity:.4}'+
  'body.zphoto #hud,body.zphoto #dungeon-hud,body.zphoto #minimap-hud,body.zphoto #action-icon-bar,body.zphoto #zhud,body.zphoto .zcard,body.zphoto #ztouch,body.zphoto #zpause,body.zphoto #ctrl-hint,body.zphoto #region-name,body.zphoto .abtn{visibility:hidden!important}'+
  '.zphoto-bar{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:160;display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:8px 14px;border-radius:12px;background:rgba(8,12,20,.85);border:1px solid rgba(255,226,122,.45);color:#e8eef6;font:13px "Segoe UI"}.zphoto-bar select{background:#141c28;color:#ffe9a8;border:1px solid #445;border-radius:6px}.zphoto-bar button{padding:4px 12px;border-radius:7px;border:1px solid rgba(255,226,122,.5);background:#3a2e10;color:#ffe9a8;cursor:pointer}'+
  '.zphoto-frame{position:fixed;inset:0;z-index:150;pointer-events:none}.zphoto-frame img{width:100%;height:100%;object-fit:fill}.zph-mark{position:absolute;right:2.5%;bottom:3.5%;font:600 15px Georgia,serif;color:rgba(255,240,200,.85);text-shadow:0 2px 6px #000}'+
  '.zs-box{width:min(760px,94vw);text-align:center}.zs-box img{width:100%;border-radius:10px;box-shadow:0 18px 60px rgba(0,0,0,.7)}.zs-b{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}';
  document.head.appendChild(st); })();
