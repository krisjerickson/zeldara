// ═══════════════════════════════════════════════════════════════════════
// ║ 10zr-ring-heal.js — round 110 (Kris: "there's also the glowing mushroom rune glades. let's make these slowly heal you, and a pop-up the
// ║ first time that tells you this").
// ║  · Standing inside a fairy ring (the circles of glowing toadstools round a rune ring — the Queen's Ring and the small rings of the
// ║    Ringmeadow, the Glade isle's ring) slowly mends you: about 2.5 % of your health a second (at least 1), while you stay inside.
// ║  · The first time, a pop-up says so; after that a soft "+n ❤" now and then shows it working.
// ║ ZRING.on: the switch.
// ═══════════════════════════════════════════════════════════════════════
var ZRING={ on:true, PER:0.025, IN:0.92,
  rings:function(sc){ var wd=sc.wd; if(!wd)return []; if(sc._zrg&&sc._zrg.wd===wd)return sc._zrg.L;
    var L=(wd.props||[]).filter(function(p){ return p&&p.prop==='mushring'; }).map(function(p){ return {x:(p.x+p.w/2)*TILE,y:(p.y+p.h/2)*TILE,r:Math.max(TILE*1.5,(Math.min(p.w,p.h)/2)*TILE-6)}; });
    sc._zrg={wd:wd,L:L}; return L; },
  inside:function(sc){ var P=sc.player; if(!P)return null; return ZRING.rings(sc).find(function(R){ return Math.hypot(P.x-R.x,P.y-R.y)<R.r*ZRING.IN; })||null; },
  tick:function(sc,dt){ if(!ZRING.on||!sc||!sc.player||!sc.playerState||!sc.sys||!sc.sys.isActive())return; if(typeof _anyModalOpen==='function'&&_anyModalOpen())return;
    var ps=sc.playerState, R=ZRING.inside(sc); if(!R){ sc._zrA=0; return; }
    if(!ps.ringHealSeen){ ps.ringHealSeen=1; var t='The runes of the fairy ring wake under your feet. While you stand inside a ring of glowing toadstools, its light slowly mends your wounds.';
      if(typeof ZDLG!=='undefined'&&ZDLG.on)ZDLG.say('The fairy ring',t,{icon:'🍄'}); else showNotif('🍄 '+t,'#e8b8ff'); }
    var mh=ps.maxHp||30; if((ps.hp||0)>=mh){ sc._zrA=0; return; }
    sc._zrA=(sc._zrA||0)+Math.max(1,mh*ZRING.PER)*dt; var n=Math.floor(sc._zrA); if(n<1)return; sc._zrA-=n; ps.hp=Math.min(mh,(ps.hp||0)+n);
    sc._zrShown=(sc._zrShown||0)+n; var now=Date.now(); if(!sc._zrT||now-sc._zrT>1500){ if(sc._floatText)sc._floatText(sc.player.x,sc.player.y-34,'+'+sc._zrShown+' ❤','#e8b8ff'); sc._zrT=now; sc._zrShown=0;
      try{ var g=sc.add.circle(R.x,R.y,R.r*0.5,0xe0a8ff,0.18).setDepth(typeof WR_DEPTH==='function'?WR_DEPTH(R.y)-1:1); sc.tweens.add({targets:g,radius:R.r,alpha:0,duration:900,onComplete:function(){ g.destroy(); }}); }catch(e){} }
    if(sc._emitUI)try{ sc._emitUI(); }catch(e){} }
};
setTimeout(function(){ [typeof WorldScene!=='undefined'?WorldScene:null, typeof IslandScene!=='undefined'?IslandScene:null].forEach(function(C){ if(!C||!C.prototype||!Object.prototype.hasOwnProperty.call(C.prototype,'update'))return; var u0=C.prototype.update;      /* an island that keeps the world's update is not wrapped twice */
  C.prototype.update=function(t,ms){ var r=u0.apply(this,arguments); try{ ZRING.tick(this,(ms||16)/1000); }catch(e){ if(!ZRING._w){ ZRING._w=1; console.warn('ring heal',e); } } return r; }; }); },0);
// ── round 142 (Kris: "the healing on glades is too powerful. let's make it so it max can heal ~1 heart, and you can only do it once per day
// (day in the game), and each additional glade you use like this heals half as much"): each glade mends you once a game day; the first one
// you use that day gives up to one heart, the next half a heart, then a quarter … Once a glade has given its share, it rests till tomorrow.
ZRING.heart=function(mh){ try{ if(typeof ZHUD!=='undefined'&&ZHUD.hearts)return ZHUD.hearts(mh).per; }catch(e){} return 10; };
ZRING.day=function(ps){ return typeof ZDAY!=='undefined'&&ZDAY.day?ZDAY.day(ps):Math.floor(ps.gday||0)+1; };
(function(){ var t0=ZRING.tick; ZRING.tick=function(sc,dt){ if(!ZRING.on||!sc||!sc.player||!sc.playerState)return t0.apply(this,arguments); var ps=sc.playerState, R=ZRING.inside(sc); if(!R)return t0.apply(this,arguments);
    var day=ZRING.day(ps), G=ps.gladeDay&&ps.gladeDay.d===day?ps.gladeDay:(ps.gladeDay={d:day,used:{},n:0}), k=Math.round(R.x)+'_'+Math.round(R.y), mh=ps.maxHp||30;
    var u=G.used[k]; if(!u){ if((ps.hp||0)>=mh)return t0.apply(this,arguments); u=G.used[k]={cap:ZRING.heart(mh)*Math.pow(0.5,G.n),got:0}; G.n++; }
    if(u.got>=u.cap-0.01){ if(!sc._zrRest||Date.now()-sc._zrRest>6000){ sc._zrRest=Date.now(); if(sc._floatText)sc._floatText(sc.player.x,sc.player.y-34,'The glade rests till tomorrow','#c8b0e8'); } sc._zrA=0; return; }
    var hp0=ps.hp||0; t0.apply(this,arguments); var gained=(ps.hp||0)-hp0; if(gained>0){ var over=u.got+gained-u.cap; if(over>0){ ps.hp=Math.max(hp0,Math.round((ps.hp-over)*10)/10); gained-=over; } u.got+=gained; } }; })();
