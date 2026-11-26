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
