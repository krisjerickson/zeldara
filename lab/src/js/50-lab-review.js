// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 5 REVIEW TABS: Mage Towers (24 walkable looks), Bosses (every
// ║ boss in the game on one page) and Monster Camps (all 60 camp types).
// ═══════════════════════════════════════════════════════════════════════
// ── Mage Towers: walk each look, tag which tower(s) should use it ──
LAB_TABS.push({ id:'mage', name:'Mage Towers', regionLabel:'Use this look for which tower(s)?',
  regionList:MAGE_TOWERS.map(function(M,i){ return {k:i+1,n:M.name.replace(/^The /,'')+' ('+['','G','W','H','A'][M.q]+')'}; }),
  blurb:'<b>24 looks for the 16 mage towers</b> — 4 per quadrant, each teaching one spell. Walk a look (this is a normal floor; the top floor is the master\'s summoning sanctum). <b>Pick the ones you like and tag which tower(s) should use them</b>; the game uses the ★ default until you choose. Starts from the Sorcerer\'s Apothecary and goes much further: observatories, floating libraries, crypts, aquariums, void rifts, a puppet theatre…',
  designs:MAGE_STYLES.map(function(S){ var users=MAGE_TOWERS.filter(function(M){ return M.bg===S.id; });
    return { id:S.id, name:S.name+(users.length?' ★':''), tagline:S.tagline, blurb:S.blurb, seed:S.seed, facts:S.facts.concat(users.length?['★ In the game now for: '+users.map(function(M){ return M.name; }).join(', ')]:[]),
      build:function(seed){ return buildTower(S,S.plan,seed); } }; }) });

// ── shared card grid for the Bosses + Monster Camps tabs ──
var RVT={ vis:new Set(),
  card:function(tab,id,title,sub,body,cw,ch,extra){ var p=LabApp.picks[tab+'-'+id]||{};
    return '<article class="mn-card rv-card" data-tab="'+tab+'" data-cid="'+id+'" data-verdict="'+(p.verdict||'')+'">'+
      '<div class="mn-top"><canvas class="rv-cv" width="'+cw+'" height="'+ch+'" data-tab="'+tab+'" data-cid="'+id+'" style="background:radial-gradient(circle,#1c2a3a,#0a1018);border-radius:10px;image-rendering:pixelated"></canvas><div class="mn-head"><b>'+title+'</b><span class="mn-role">'+sub+'</span></div></div>'+
      '<dl>'+body+'</dl>'+(extra||'')+'<div class="sp-actions">'+[['pick','Looks good'],['maybe','Tweak'],['no','Redo']].map(function(v){ return '<button class="vbtn rv-v" data-tab="'+tab+'" data-cid="'+id+'" data-v="'+v[0]+'" aria-pressed="'+(p.verdict===v[0])+'">'+v[1]+'</button>'; }).join('')+'</div>'+
      '<textarea class="mn-notes rv-notes" data-tab="'+tab+'" data-cid="'+id+'" rows="2" placeholder="Notes (optional): tweaks, ideas…">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea></article>'; },
  bind:function(frames){ var self=this; if(this._io)this._io.disconnect(); this.vis.clear(); this._frames=frames;
    this._io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting)self.vis.add(e.target); else self.vis.delete(e.target); }); },{rootMargin:'100px'});
    document.querySelectorAll('.rv-cv').forEach(function(cv){ self._io.observe(cv); });
    if(!this._raf)this._loop(); },
  _loop:function(){ var self=this; this._raf=requestAnimationFrame(function(t){ self._raf=null; if(['bosses','camps'].indexOf(LabApp.tab)<0)return; var f=Math.floor(t/220);
      self.vis.forEach(function(cv){ if(!cv.isConnected||cv._f===f)return; cv._f=f; try{ self._frames(cv,f); }catch(e){} }); self._loop(); }); },
  refresh:function(){ document.querySelectorAll('.rv-card').forEach(function(c){ var p=LabApp.picks[c.dataset.tab+'-'+c.dataset.cid]||{}; c.dataset.verdict=p.verdict||''; c.querySelectorAll('.rv-v').forEach(function(b){ b.setAttribute('aria-pressed',String(p.verdict===b.dataset.v)); }); }); }
};
// kit strings → plain words
var RV_MOVE={chase:'chases you',kite:'keeps its distance',drift:'drifts around you',lumber:'lumbers after you',hover:'hovers',orbit:'circles you',still:'stands its ground',blink:'teleports around',leap:'leaps at you',guard:'guards its spot',seek:'heads for its target'};
var RV_ATK={melee:'hits up close',lunge:'lunges',sweep:'sweeps in an arc',slam:'slams the ground',shoot:'shoots',lob:'lobs bombs',beam:'fires beams',breath:'breathes fire',ring:'sends out rings',pull:'pulls you in',gust:'blasts you back',grab:'grabs you',summon:'summons help',trap:'lays traps',cloud:'makes clouds',drain:'drains your life',strike:'strikes if you stand still',marks:'marks the ground for strikes',swap:'swaps places with you',wall:'raises walls',echo:'echoes your attacks',charge:'charges'};
var RV_ST={slow:'slow',root:'root',freeze:'freeze',poison:'poison',burn:'burn',blind:'blind',reverse:'reversed controls',charm:'charm',shrink:'shrink',mark:'marked',frog:'frog',slip:'ice floor',stun:'stun'};
function _rvKit(kit){ if(!kit)return '—'; var parts=String(kit).split('|').map(function(x){ return x.trim(); }).filter(Boolean), out=[];
  parts.forEach(function(p,i){ var name=p.split(/\s+/)[0], st=(p.match(/\b(?:st|zone)=(\w+)/)||[])[1], id=(p.match(/\bid=(\w+)/)||[])[1];
    var kv={}; p.split(/\s+/).slice(1).forEach(function(t){ var q=t.split('='); kv[q[0]]=q.length>1?(isNaN(+q[1])?q[1]:+q[1]):1; });
    var w=i===0&&RV_MOVE[name]?RV_MOVE[name]:(typeof FAM_COUNTER_TXT!=='undefined'&&FAM_COUNTER_TXT[name]?'🐾 '+FAM_COUNTER_TXT[name](kv):null)||RV_ATK[name]||({armor:'armoured',reflect:'reflects projectiles',regen:'regenerates',thorns:'thorny',dodge:'dodges'}[name])||name;
    if(st&&RV_ST[st])w+=' ('+RV_ST[st]+')'; if(id&&typeof MON_BY_ID!=='undefined'&&MON_BY_ID[id])w+=' — '+MON_BY_ID[id].name; out.push(w); });
  return out.join(' · '); }
function _rvSprite(cv,R,f,scale){ if(!R)return; var fr=chFrames(R), x=cv.getContext('2d'); x.clearRect(0,0,cv.width,cv.height); x.imageSmoothingEnabled=false; var im=fr[[0,1,0,2][f%4]%fr.length]||fr[0], s=scale||Math.floor(Math.min(cv.width,cv.height)/im.height);
  x.drawImage(im,(cv.width-im.width*s)/2,(cv.height-im.height*s)/2,im.width*s,im.height*s); }

// ── Bosses: every boss in the game, grouped ──
var RV_BOSSES=(function(){ var L=[], QN=['','Grasslands','Wetlands','Highlands','Ashlands'];
  var st=function(k){ var D=typeof MDEFS!=='undefined'&&MDEFS[k]; return D?'HP '+D.hp+' · ATK '+D.atk+' · DEF '+(D.def||0):''; };
  [['goblin_king',1,'★ dungeon'],['dark_warlock',1,'★ tower'],['swamp_witch',2,'★ dungeon'],['storm_mage',2,'★ tower'],['rock_dragon',3,'★ dungeon'],['iron_sentinel',3,'★ tower'],['lava_titan',4,'★ dungeon'],['shadow_lord',4,'★ tower']].forEach(function(a){ var BP=typeof BOSS_PHASES!=='undefined'&&BOSS_PHASES[a[0]], n=BP?BP.phases.length:1;
    L.push({grp:'guardians',id:'g_'+a[0],sprite:'boss_'+a[0],name:(CHAR_BY_ID['boss_'+a[0]]||{}).name||a[0],q:a[1],sub:QN[a[1]]+' '+a[2]+' guardian · '+n+' phase'+(n>1?'s':''),
      lines:[['Stats',st(a[0])],['Phases',BP?BP.phases.map(function(P,i){ if(!P)return '1 · on the site\'s top floor'; var F=CHAR_BY_ID[P.form]; return (i+1)+' · '+(F?F.name:'?')+' in '+((BOSS_ARENAS[P.arena]||{}).name||P.arena)+(P.bars?' · extra health: '+P.bars.map(function(b){ return BOSS_BAR_INFO[b.k].n; }).join(', '):'')+(P.allies?' · with allies':'')+' — '+_rvKit(P.kit); }).join('<br>'):'1']]}); });
  if(typeof CASTLE_ISLANDS!=='undefined')Object.keys(CASTLE_ISLANDS).forEach(function(k){ var C=CASTLE_ISLANDS[k], W=CHAR_BY_ID[C.warden], T=CHAR_BY_ID[C.teacher];
    L.push({grp:'wardens',id:'w_'+k,sprite:C.warden,name:W?W.name:k,q:C.sec,sub:QN[C.sec]+' castle warden · '+C.name+' · 1 phase',lines:[['Fights',_rvKit(C.kit)],['Guards',T?T.name+' — teaches '+((typeof ITEMS!=='undefined'&&ITEMS[C.skill])||{}).name:'?'],['Looks',W?W.look:'']]}); });
  MAGE_TOWERS.forEach(function(M){ L.push({grp:'mages',id:'m_'+M.key,sprite:M.boss,name:M.bossName+', '+M.title,q:M.q,sub:QN[M.q]+' mage tower · '+M.name+' · 1 phase',
    lines:[['Signature',M.skills.join('<br>')],['Fights',_rvKit(M.kit)],['Teaches',(ITEMS[M.spell]||{}).icon+' '+(ITEMS[M.spell]||{}).name+' — '+(ITEMS[M.spell]||{}).desc],['Looks',M.look]]}); });
  [1,2,3,4].forEach(function(q){ var ek=typeof _bonusMiniBossKey==='function'?_bonusMiniBossKey(q):null, E=ek&&MDEFS[ek]; if(!E)return; var R=E._rid&&MON_BY_ID[E._rid];
    L.push({grp:'elites',id:'e_'+q,sprite:null,rid:E._rid,name:E.name,q:q,sub:QN[q]+' elite · treasure-vault den',lines:[['Stats','HP '+E.hp+' · ATK '+E.atk+' · DEF '+(E.def||0)],['Den','One room: the elite + '+(2+q)+' plain copies of itself; a big named health bar'],['Kit',R&&MX.KITS[R.id]?_rvKit(MX.KITS[R.id]):'its normal attacks, much harder']]}); });
  [1,2,3,4].forEach(function(q){ var R=CHAR_BY_ID['boss_isl_'+q]; if(R)L.push({grp:'islands',id:'i_'+q,sprite:R.id,name:R.name,q:q,sub:QN[q]+' familiar island guardian',lines:[['Fights',R.doing],['Looks',R.look]]}); });
  CHAR_ROSTER.filter(function(R){ return R.cat==='boss'&&R.sub==='Volcano boss rush'; }).forEach(function(R){ L.push({grp:'volcano',id:'v_'+R.id,sprite:R.id,name:R.name,q:0,sub:'Volcano boss rush',lines:[['Fights',R.doing],['Looks',R.look]]}); });
  return L; })();
var RV_BOSS_GROUPS=[['guardians','★ Quadrant guardians (multi-phase)'],['mages','🔮 Mage-tower masters (new)'],['wardens','🏰 Castle wardens'],['elites','💎 Elites (treasure vaults)'],['islands','🏝 Island guardians'],['volcano','🌋 Volcano boss rush']];
LAB_TABS.push({ id:'bosses', name:'Bosses',
  blurb:'<b>Every boss in one place</b>: the multi-phase ★ guardians, the <b>16 new mage-tower masters</b>, castle wardens, elites, island guardians and the volcano boss rush. Each card lists how it fights (in words), its phases or signature tricks and where it waits. <b>Mark any you want changed</b> and leave notes.',
  designs:RV_BOSSES.map(function(B){ return {id:B.id,name:B.name}; }),
  render:function(){ setTimeout(function(){ RVT.bind(function(cv,f){ var B=RV_BOSSES.find(function(x){ return x.id===cv.dataset.cid; }); if(!B)return; if(B.sprite)_rvSprite(cv,CHAR_BY_ID[B.sprite],f); else if(B.rid&&MON_BY_ID[B.rid]){ var fr=msFrames(MON_BY_ID[B.rid].spec), x=cv.getContext('2d'), im=fr[f%2]; x.clearRect(0,0,cv.width,cv.height); x.imageSmoothingEnabled=false; x.drawImage(im,(cv.width-96)/2,(cv.height-96)/2,96,96); } }); },0);
    return RV_BOSS_GROUPS.map(function(G){ var L=RV_BOSSES.filter(function(B){ return B.grp===G[0]; }); if(!L.length)return '';
      return '<h3 class="ch-sub">'+G[1]+' — '+L.length+'</h3><div class="mn-grid">'+L.map(function(B){ return RVT.card('bosses',B.id,B.name,B.sub,B.lines.map(function(l){ return '<dt>'+l[0]+'</dt><dd>'+l[1]+'</dd>'; }).join(''),120,120); }).join('')+'</div>'; }).join(''); } });

// ── Monster Camps: the 60 camp types (what the monsters guard) ──
var RV_REWARD=function(R){ var nm=function(id){ return (typeof ITEMS!=='undefined'&&ITEMS[id]&&ITEMS[id].name)||String(id).replace(/_/g,' '); };
  var g=function(){ return R.gold?R.gold[0]+'–'+R.gold[1]+' gold':''; };
  switch(R.k){ case 'food': return 'Food: '+(R.items||[]).map(nm).join(', ')+' ('+(R.n||3)+' pieces) — respawns';
    case 'chest': return 'Chest: '+g()+' + '+(R.items||[]).map(nm).join(' / ')+' — one time';
    case 'well': return 'Healing spring — full HP; refills after ~10 min';
    case 'mana': return 'Mana spring — full mana; refills';
    case 'buff': return 'Blessing: '+({atkUp:'+25% attack',defUp:'+25% defence',spdUp:'+25% speed'}[R.b]||R.b)+' for 2 minutes; recharges';
    case 'xp': return 'Rune stone: +'+R.xp+' XP — one time';
    case 'ammo': return 'Arrows: '+(R.qty||0)+' × '+nm(R.id)+' — respawns';
    case 'gems': return 'Gems: '+(R.items||[]).map(nm).join(', ')+(R.gold?' + '+g():'')+' — one time'; }
  return R.k; };
LAB_TABS.push({ id:'camps', name:'Monster Camps',
  blurb:'<b>60 monster camps</b> — two thirds of the world\'s monsters guard one of these (15 kinds per quadrant). The picture shows the camp while guarded, once the guards are beaten, and when used up. Guards now <b>stay with their treasure</b> (they give up the chase and walk back), and a cleared camp\'s loot is collected with one <b>[Tab]</b>. <b>Mark any you want changed.</b>',
  designs:[1,2,3,4].reduce(function(a,q){ return a.concat(CAMP_TYPES[q].map(function(T){ return {id:T.id,name:T.name}; })); },[]),
  render:function(){ setTimeout(function(){ RVT.bind(function(cv,f){ var T=CAMP_BY_ID[cv.dataset.cid]; if(!T)return; var fr=_campPropFrames(T.prop,T.tint), x=cv.getContext('2d'); x.clearRect(0,0,cv.width,cv.height); x.imageSmoothingEnabled=false;
      var anim=/campfire|lantern|moonwell|obelisk|crystal|totem|cauldron/.test(T.prop); [0,1,2].forEach(function(i){ var im=fr[i===0&&anim?f%2:i]; x.globalAlpha=i===2?0.75:1; x.drawImage(im,6+i*80,10,64,64); x.globalAlpha=1; x.fillStyle='#9ab'; x.font='10px sans-serif'; x.textAlign='center'; x.fillText(['guarded','cleared','used up'][i],38+i*80,88); }); }); },0);
    return [1,2,3,4].map(function(q){ return '<h3 class="ch-sub">'+WM_REGION_NAMES[q]+' — 15 camps</h3><div class="mn-grid">'+CAMP_TYPES[q].map(function(T){
      return RVT.card('camps',T.id,T.name,WM_REGION_NAMES[q]+' · '+T.prop,'<dt>Reward</dt><dd>'+RV_REWARD(T.r)+'</dd><dt>Guards</dt><dd>3–5 of the quadrant\'s monsters (sometimes led by a bigger alpha); they stay within ~8 tiles of the camp</dd>',246,94); }).join('')+'</div>'; }).join(''); } });

(function(){ var orig=LabApp.renderGrid;
  LabApp.renderGrid=function(quiet){ if(['bosses','camps'].indexOf(this.tab)>=0&&quiet&&document.querySelector('.rv-card')){ RVT.refresh(); this.renderTabs(); return; } return orig.call(this,quiet); };
  document.addEventListener('click',function(e){ var v=e.target.closest('.rv-v'); if(!v)return; var k=v.dataset.tab+'-'+v.dataset.cid, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===v.dataset.v?null:v.dataset.v; LabApp.persist(k); RVT.refresh(); LabApp.renderTabs(); });
  document.addEventListener('input',function(e){ var ta=e.target.closest&&e.target.closest('.rv-notes'); if(!ta)return; var k=ta.dataset.tab+'-'+ta.dataset.cid, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=ta.value; LabApp.persist(k,900); });
})();
