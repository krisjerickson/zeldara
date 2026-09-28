// ═══════════════════════════════════════════════════════════════════════
// ║ CHARACTERS tab — every NPC, mount, familiar and boss as a pixel
// ║ stand-in (07s-char-sprites.js), all already in the game. Kris marks
// ║ each "looks good / tweak / redo" with notes; mounts preview the hero
// ║ riding in all three directions.
// ═══════════════════════════════════════════════════════════════════════
var CHT_CATS=[{k:'npc',n:'NPCs'},{k:'mount',n:'Mounts'},{k:'familiar',n:'Familiars'},{k:'boss',n:'Bosses'}];
var CHT_SEAT={quad:-12,drake:-13,gator:-6,bird:-13,serpent:-9,glider:null};
var ChTab={ cat:'npc', vis:new Set(), hero:null,
  key:function(R){ return 'chars-'+R.id; },
  list:function(){ return CHAR_ROSTER.filter(function(R){ return R.cat===ChTab.cat; }); },
  heroImgs:function(){ if(this.hero||typeof HERO_WALK_FRAMES_SIDE==='undefined')return this.hero; var mk=function(src){ var im=new Image(); im.src=src; return im; };
    this.hero={side:HERO_WALK_FRAMES_SIDE.map(mk),front:HERO_WALK_FRAMES_FRONT.map(mk),back:HERO_WALK_FRAMES_BACK.map(mk)}; return this.hero; },
  render:function(){ var self=this;
    var cats='<div class="lab-groups">'+CHT_CATS.map(function(c){ var L=CHAR_ROSTER.filter(function(R){ return R.cat===c.k; }), ok=L.filter(function(R){ var p=LabApp.picks[self.key(R)]; return p&&p.verdict; }).length;
      return '<button class="lab-grp ch-cat" data-cat="'+c.k+'" aria-pressed="'+(c.k===self.cat)+'">'+c.n+' <span class="n">'+ok+'/'+L.length+' reviewed</span></button>'; }).join('')+'</div>';
    var subs=[], cards='';
    this.list().forEach(function(R){ if(subs.indexOf(R.sub)<0){ subs.push(R.sub); cards+='<h3 class="ch-sub">'+R.sub+'</h3>'; }
      var p=LabApp.picks[self.key(R)]||{}, W=R.cat==='mount'?192:128;
      cards+='<article class="mn-card ch-card'+(R.cat==='mount'?' ch-wide':'')+'" data-cid="'+R.id+'" data-verdict="'+(p.verdict||'')+'">'+
        '<div class="mn-top"><canvas class="mn-spr ch-spr" width="'+W+'" height="128" data-cid="'+R.id+'"></canvas>'+
        '<div class="mn-head"><b>'+R.name+'</b><span class="mn-role">'+R.sub+'</span><div class="mn-tags"><span class="mn-tag ter">'+R.where+'</span></div></div></div>'+
        '<dl><dt>Looks</dt><dd>'+R.look+'</dd><dt>'+(R.cat==='boss'?'Fights':R.cat==='mount'?'Moves':'Does')+'</dt><dd>'+R.doing+'</dd>'+(R.extra?'<dt>Also</dt><dd>'+R.extra+'</dd>':'')+'</dl>'+
        '<div class="sp-actions">'+[['pick','Looks good'],['maybe','Tweak'],['no','Redo']].map(function(v){ return '<button class="vbtn ch-v" data-cid="'+R.id+'" data-v="'+v[0]+'" aria-pressed="'+(p.verdict===v[0])+'">'+v[1]+'</button>'; }).join('')+'</div>'+
        '<textarea class="mn-notes ch-notes" data-cid="'+R.id+'" rows="2" placeholder="Notes (optional): colours, outfit, name, size…">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea></article>'; });
    setTimeout(function(){ self.bind(); },0);
    var hint={npc:'Shop keepers, the four craftsmen, village folk (more appear as the village grows) and the island NPCs. Frames loop idle → their job (pouring, hammering, waving…).',
      mount:'Each mount walks in its side view, then shows front and back; the right half shows the hero riding it as in the game. The horse keeps its hand-painted rider sprite in play.',
      familiar:'Familiars orbit the hero and play their action frame when they attack.',
      boss:'Bosses are drawn about twice monster size in the game, with a pulsing aura in their colour. The ★ dungeon and tower guardians now fight in phases (2 in the Grasslands up to 5 in the Ashlands): each later phase moves to a new arena and brings an evolved form, listed under “Evolved forms”. No need to review these yet.'}[this.cat];
    return cats+'<p class="mn-hint"><b>All of these are already in the game.</b> '+hint+' Mark each one and leave notes; ChatGPT sprites can replace them later with the same ids.</p><div class="mn-grid">'+cards+'</div>';
  },
  refresh:function(){ var self=this; document.querySelectorAll('.ch-card').forEach(function(c){ var R=CHAR_BY_ID[c.dataset.cid], p=LabApp.picks[self.key(R)]||{}; c.dataset.verdict=p.verdict||'';
      c.querySelectorAll('.ch-v').forEach(function(b){ b.setAttribute('aria-pressed',String(p.verdict===b.dataset.v)); }); });
    document.querySelectorAll('.ch-cat .n').forEach(function(n,i){ var L=CHAR_ROSTER.filter(function(R){ return R.cat===CHT_CATS[i].k; }); n.textContent=L.filter(function(R){ var p=LabApp.picks[self.key(R)]; return p&&p.verdict; }).length+'/'+L.length+' reviewed'; }); },
  bind:function(){ var self=this; this.vis.clear(); if(this._io)this._io.disconnect(); this.heroImgs();
    this._io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting)self.vis.add(e.target); else self.vis.delete(e.target); }); },{rootMargin:'100px'});
    document.querySelectorAll('.ch-spr').forEach(function(cv){ self._io.observe(cv); cv._R=CHAR_BY_ID[cv.dataset.cid]; cv._ph=Math.floor(Math.random()*10); cv._last=-1; });
    if(!this._raf)this._loop(); },
  drawMount:function(cv,R,step){ var fr=mtFrames(R.spec), x=cv.getContext('2d'), H=this.hero, ph=Math.floor(step/12)%3, k=step%12, seat=CHT_SEAT[R.spec.kind];
    x.clearRect(0,0,cv.width,cv.height); x.imageSmoothingEnabled=false;
    var f=ph===0?k%4:ph===1?4+(k>>1)%2:6+(k>>1)%2; x.drawImage(fr[f],0,0,96,96);           // left: the mount alone
    x.fillStyle='rgba(255,255,255,.55)'; x.font='10px sans-serif'; x.fillText(['side','front','back'][ph],4,122);
    // right: hero riding (as in the game: hero legs hidden, sitting on the saddle)
    var S=3, ox=96+48, base=16*S+40;
    x.drawImage(fr[f],ox-16*S/1.2,base-32*S/1.2+8,32*S/1.2,32*S/1.2);
    var set=H?(ph===0?H.side:ph===1?H.front:H.back):null, im=set&&set[(k%3)+1]||set&&set[0];
    if(im&&im.complete&&im.naturalWidth){ var dw=25*S/1.2*0.8, dh=42*S/1.2*0.8, keep=seat===null?1:0.64, fy=seat===null?base+8-dh+14:base+8+(seat+15)*S/1.2*0.8-dh;
      if(seat===null)x.drawImage(fr[f],ox-16*S/1.2,base-32*S/1.2-40,32*S/1.2,32*S/1.2);
      x.drawImage(im,0,0,im.naturalWidth,im.naturalHeight*keep,ox-dw/2,fy,dw,dh*keep); }
  },
  _loop:function(){ var self=this, SEQ=[0,1,0,1,0,1,2,3,3,2];
    this._raf=requestAnimationFrame(function(t){ self._raf=null; if(LabApp.tab!=='characters')return; var step=Math.floor(t/170);
      self.vis.forEach(function(cv){ if(!cv.isConnected||!cv._R)return; var R=cv._R;
        if(R.cat==='mount'){ self.drawMount(cv,R,step+cv._ph); return; }
        var f=SEQ[(step+cv._ph)%SEQ.length]; if(f===cv._last)return; cv._last=f;
        var x=cv.getContext('2d'); x.clearRect(0,0,cv.width,cv.height); x.imageSmoothingEnabled=false; x.drawImage(chFrames(R)[f],0,0,128,128); });
      self._loop(); });
  }
};
(function(){
  var at=LAB_TABS.findIndex(function(t){return t.id==='monsters';});
  LAB_TABS.splice(at>=0?at+1:LAB_TABS.length,0,{ id:'characters', name:'Characters',
    blurb:'<b>Characters — '+CHAR_ROSTER.length+' pixel stand-ins, all in the game.</b> NPCs, mounts, familiars and bosses, drawn the same way as the monsters. Mark each and leave notes for changes.',
    designs:CHAR_ROSTER.map(function(R){ return {id:R.id,name:R.name+' ('+R.cat+')'}; }),
    render:function(){ return ChTab.render(); } });
  var orig=LabApp.renderGrid;
  LabApp.renderGrid=function(quiet){ if(this.tab==='characters'&&quiet&&document.querySelector('.ch-card')){ ChTab.refresh(); this.renderTabs(); return; } return orig.call(this,quiet); };
  document.addEventListener('click',function(e){
    var c=e.target.closest('.ch-cat'); if(c){ ChTab.cat=c.dataset.cat; LabApp.renderGrid(); return; }
    var v=e.target.closest('.ch-v'); if(v){ var k='chars-'+v.dataset.cid, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===v.dataset.v?null:v.dataset.v; LabApp.persist(k); ChTab.refresh(); LabApp.renderTabs(); return; }
  });
  document.addEventListener('input',function(e){ var ta=e.target.closest&&e.target.closest('.ch-notes'); if(!ta)return; var k='chars-'+ta.dataset.cid, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=ta.value; LabApp.persist(k,900); });
})();
