// ═══════════════════════════════════════════════════════════════════════
// ║ MONSTERS tab — 240 candidates (4 quadrants × mainland 20 / dungeon
// ║ 10 melee + 10 ranged / tower 20). Kris down-selects to half.
// ═══════════════════════════════════════════════════════════════════════
var MON_SEGS=[{k:'main',n:'Mainland',want:10,f:function(m){return m.seg==='main';}},
  {k:'melee',n:'Dungeon · melee',want:5,f:function(m){return m.seg==='dun'&&m.role==='melee';}},
  {k:'ranged',n:'Dungeon · ranged',want:5,f:function(m){return m.seg==='dun'&&m.role==='ranged';}},
  {k:'tow',n:'Tower · magic',want:10,f:function(m){return m.seg==='tow';}}];
var MON_REUSE_NAMES={goblin:'Goblin',skeleton:'Skeleton',mud_troll:'Mud Troll',bog_serpent:'Bog Serpent',swamp_witch:'Swamp Witch',stone_golem:'Stone Golem',harpy:'Harpy',iron_sentinel:'Iron Sentinel',fire_imp:'Fire Imp',ash_wraith:'Ash Wraith',dark_warlock:'Dark Warlock',storm_mage:'Storm Mage',rock_dragon:'Rock Dragon',lava_titan:'Lava Titan'};
var MonTab={ q:1, seg:'main', show:'all', vis:new Set(), t0:0,
  key:function(m){ return 'monsters-'+m.id; },
  list:function(){ var S=MON_SEGS.find(function(s){return s.k===MonTab.seg;}); return MON_ROSTER.filter(function(m){ if(m.q!==MonTab.q||!S.f(m))return false; var p=LabApp.picks[MonTab.key(m)]||{};
    if(MonTab.show==='picked')return p.verdict==='pick'; if(MonTab.show==='open')return !p.verdict; return true; }); },
  count:function(q,S,v){ return MON_ROSTER.filter(function(m){ var p=LabApp.picks[MonTab.key(m)]; return m.q===q&&S.f(m)&&p&&p.verdict===v; }).length; },
  strategy:function(){
    return '<details class="mn-strat"><summary>Spawn strategy (what these picks feed into)</summary><div class="mn-strat-grid">'+
      '<div><b>Three segments per quadrant</b><p>Mainland monsters roam the open world; dungeon monsters are ruthless melee or sneaky ranged fighters; tower monsters are magical (mages, sprites, warlocks, creatures of magic).</p></div>'+
      '<div><b>80 / 15 / 5 rule</b><p><span class="mn-pct">80%</span> this quadrant + this segment · <span class="mn-pct">15%</span> this quadrant, another segment · <span class="mn-pct">5%</span> visitors from another quadrant, <i>scaled to the local level</i>.</p></div>'+
      '<div><b>Where they spawn</b><p>Mainland monsters favour their terrain (the <em>T:</em> tag): water monsters near water, lava monsters on crust. Some only come out at <b>night</b>; some spawn in <b>packs</b> with a leader.</p></div>'+
      '<div><b>Difficulty</b><p>Grasslands monsters have one clear mechanic each. Wetlands add status effects, Highlands add terrain, shields and knockback, and Ashlands combine several and add rebirth and armor-break fights. Tiers ★1–5 run within each quadrant.</p></div>'+
      '</div></details>';
  },
  render:function(){
    var self=this, S=MON_SEGS.find(function(s){return s.k===self.seg;});
    var qs='<div class="lab-groups">'+LAB_REGIONS.map(function(R){ var pk=MON_ROSTER.filter(function(m){ var p=LabApp.picks[self.key(m)]; return m.q===R.k&&p&&p.verdict==='pick'; }).length;
      return '<button class="lab-grp mn-q" data-q="'+R.k+'" aria-pressed="'+(R.k===self.q)+'">'+R.n+' <span class="n">'+pk+'/30 picked</span></button>'; }).join('')+'</div>';
    var segs='<div class="mn-segs">'+MON_SEGS.map(function(s){ var n=self.count(self.q,s,'pick'), tot=MON_ROSTER.filter(function(m){return m.q===self.q&&s.f(m);}).length;
      return '<button class="mn-seg" data-seg="'+s.k+'" aria-pressed="'+(s.k===self.seg)+'">'+s.n+' <span class="n'+(n>s.want?' over':n===s.want?' done':'')+'">'+n+' / '+s.want+' of '+tot+'</span></button>'; }).join('')+
      '<span class="mn-show">'+[['all','All'],['open','Undecided'],['picked','Picked']].map(function(o){ return '<button class="mn-sh" data-sh="'+o[0]+'" aria-pressed="'+(self.show===o[0])+'">'+o[1]+'</button>'; }).join('')+'</span></div>';
    var cards=this.list().map(function(m){ var p=LabApp.picks[self.key(m)]||{}, stars='★★★★★'.slice(0,m.tier)+'<i>'+'★★★★★'.slice(m.tier)+'</i>';
      var tags=m.tags.map(function(t){ if(t==='pack')return '<span class="mn-tag pack">Pack</span>'; if(t==='night')return '<span class="mn-tag night">Night only</span>'; if(t.indexOf('T:')===0)return '<span class="mn-tag ter">'+t.slice(2)+'</span>'; return ''; }).join('');
      var role=m.seg==='dun'?(m.role==='melee'?'Melee':'Ranged'):m.seg==='tow'?'Magic':'Mainland';
      return '<article class="mn-card" data-mid="'+m.id+'" data-verdict="'+(p.verdict||'')+'">'+
        '<div class="mn-top"><canvas class="mn-spr" width="128" height="128" data-mid="'+m.id+'"></canvas>'+
        '<div class="mn-head"><b>'+m.name+'</b><span class="mn-stars" title="Difficulty within the quadrant">'+stars+'</span><span class="mn-role">'+role+'</span>'+
        (m.reuse?'<span class="mn-reuse">Uses the existing '+(MON_REUSE_NAMES[m.reuse]||m.reuse)+'</span>':'')+'<div class="mn-tags">'+tags+'</div></div></div>'+
        '<div class="mn-kit">In game: '+(typeof MON_LEGACY!=='undefined'&&MON_LEGACY[m.id]?'original '+(MON_REUSE_NAMES[MON_LEGACY[m.id]]||MON_LEGACY[m.id])+' code':((typeof MON_KIT_SRC!=='undefined'&&MON_KIT_SRC[m.id])||'').split('|').map(function(t){ return t.trim().split(/\s+/)[0]; }).join(' · '))+'</div>'+
        '<dl><dt>Looks</dt><dd>'+m.look+'</dd><dt>Moves</dt><dd>'+m.move+'</dd><dt>Attacks</dt><dd>'+m.atk+'</dd><dt>Defends</dt><dd>'+m.def+'</dd><dt>Special</dt><dd>'+m.sp+'</dd></dl>'+
        '<div class="sp-actions">'+['pick','maybe','no'].map(function(vv){return '<button class="vbtn mn-v" data-mid="'+m.id+'" data-v="'+vv+'" aria-pressed="'+(p.verdict===vv)+'">'+({pick:'Pick',maybe:'Maybe',no:'No'})[vv]+'</button>';}).join('')+'</div>'+
        '<textarea class="mn-notes" data-mid="'+m.id+'" rows="2" placeholder="Notes (optional): tweaks, names, ideas…">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea></article>';
    }).join('');
    setTimeout(function(){ self.bindSprites(); },0);
    return this.strategy()+qs+segs+'<p class="mn-hint">'+S.n+': pick <b>'+S.want+'</b> for '+LAB_REGIONS[self.q-1].n+'. The sprites are rough stand-ins that loop idle → wind-up → attack; the picked monsters get proper ChatGPT sprites later.</p><div class="mn-grid">'+(cards||'<p class="lab-empty">Nothing here with this filter.</p>')+'</div>';
  },
  refresh:function(){ // in-place verdict update (keeps typing focus)
    var self=this; document.querySelectorAll('.mn-card').forEach(function(c){ var m=MON_ROSTER.find(function(x){return x.id===c.dataset.mid;}), p=LabApp.picks[self.key(m)]||{}; c.dataset.verdict=p.verdict||'';
      c.querySelectorAll('.mn-v').forEach(function(b){ b.setAttribute('aria-pressed',String(p.verdict===b.dataset.v)); }); });
    document.querySelectorAll('.mn-seg .n').forEach(function(n,i){ var s=MON_SEGS[i], k=self.count(self.q,s,'pick'), tot=MON_ROSTER.filter(function(m){return m.q===self.q&&s.f(m);}).length; n.textContent=k+' / '+s.want+' of '+tot; n.className='n'+(k>s.want?' over':k===s.want?' done':''); });
    document.querySelectorAll('.mn-q .n').forEach(function(n,i){ var q=i+1; n.textContent=MON_ROSTER.filter(function(m){ var p=LabApp.picks[self.key(m)]; return m.q===q&&p&&p.verdict==='pick'; }).length+'/30 picked'; });
  },
  bindSprites:function(){
    var self=this; this.vis.clear();
    if(this._io)this._io.disconnect();
    this._io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting)self.vis.add(e.target); else self.vis.delete(e.target); }); },{rootMargin:'100px'});
    document.querySelectorAll('.mn-spr').forEach(function(cv){ self._io.observe(cv); cv._m=MON_ROSTER.find(function(m){return m.id===cv.dataset.mid;}); cv._ph=Math.floor(Math.random()*10); cv._last=-1; });
    if(!this._raf)this._loop();
  },
  _loop:function(){ var self=this, SEQ=[0,1,0,1,0,1,0,2,3,3];
    this._raf=requestAnimationFrame(function(t){ self._raf=null; if(LabApp.tab!=='monsters'){ return; }
      var step=Math.floor(t/190);
      self.vis.forEach(function(cv){ if(!cv.isConnected||!cv._m)return; var f=SEQ[(step+cv._ph)%SEQ.length]; if(f===cv._last)return; cv._last=f;
        var fr=msFrames(cv._m.spec), x=cv.getContext('2d'); x.clearRect(0,0,128,128); x.imageSmoothingEnabled=false; x.drawImage(fr[f],0,0,128,128); });
      self._loop(); });
  }
};
(function(){
  var at=LAB_TABS.findIndex(function(t){return t.id==='village';});
  var tab={ id:'monsters', name:'Monsters',
    blurb:'<b>Monster gallery — all 240 are in the game</b> (your pick: every one). Per quadrant: 20 mainland, 10 dungeon melee, 10 dungeon ranged and 20 tower mages & magical creatures. The "In game" line shows the engine modules each one uses; the 15 existing monsters keep their original attacks. Notes are still welcome for tweaks.',
    designs:MON_ROSTER.map(function(m){ return {id:m.id,name:m.name+' ('+LAB_REGIONS[m.q-1].n+' · '+(m.seg==='dun'?'dungeon '+m.role:m.seg==='tow'?'tower':'mainland')+')'}; }),
    render:function(){ return MonTab.render(); } };
  LAB_TABS.splice(at>=0?at+1:LAB_TABS.length,0,tab);
  // snapshot re-renders: update verdicts in place so a half-typed note keeps focus
  var orig=LabApp.renderGrid;
  LabApp.renderGrid=function(quiet){ if(this.tab==='monsters'&&quiet&&document.querySelector('.mn-card')){ MonTab.refresh(); this.renderTabs(); return; } return orig.call(this,quiet); };
  document.addEventListener('click',function(e){
    var q=e.target.closest('.mn-q'); if(q){ MonTab.q=+q.dataset.q; LabApp.renderGrid(); return; }
    var s=e.target.closest('.mn-seg'); if(s){ MonTab.seg=s.dataset.seg; LabApp.renderGrid(); return; }
    var sh=e.target.closest('.mn-sh'); if(sh){ MonTab.show=sh.dataset.sh; LabApp.renderGrid(); return; }
    var v=e.target.closest('.mn-v'); if(v){ var k='monsters-'+v.dataset.mid, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===v.dataset.v?null:v.dataset.v; LabApp.persist(k); MonTab.refresh(); LabApp.renderTabs(); return; }
  });
  document.addEventListener('input',function(e){ var ta=e.target.closest&&e.target.closest('.mn-notes[data-mid]'); if(!ta)return; var k='monsters-'+ta.dataset.mid, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=ta.value; LabApp.persist(k,900); });
})();
