// ═══════════════════════════════════════════════════════════════════════
// ║ 10zt-twin.js — round 68: THE OTHER TWIN STAYS IN THE VILLAGE (doc 30; Kris's answer S1: "stays in the village").
// ║ Zeldara and Zeldor: the one you do not play stands by the Home, keeps the village going and pieces the old sagas together — what they
// ║ say follows how far you have come (doc 30 §10.1, first draft). Elder Runa tells of the storm and the basket.
// ║ Drawn with the other hero's own painted sprite (its idle frames, front view). Talk with [Tab] as with the village folk.
// ═══════════════════════════════════════════════════════════════════════
var ZTWIN={ on:true,
  other:function(ps){ var f=ps&&ps.hero==='f'; return {ch:f?'hero_m':'hero_f', name:f?'Zeldor':'Zeldara'}; },
  line:function(ps){ var n=(ps.spiritsFreed||[]).length, full=[1,2,3,4].some(function(q){ return typeof ZSPIRIT!=='undefined'&&ZSPIRIT.count(ps,q)>=10; });
    if(ps.spiritsHome)return 'We did it — both of us. Listen… the children are laughing again.';
    if(ps.asgardDown)return 'The basket came from the lake. Whatever is up there, it knows us.';
    if(n>=20)return 'Bring me the map. The lines… they\'re drawing something. Something that wants to be finished.';
    if(full)return 'The Ashlands fell first, the sagas say. The same night the sky went quiet.';
    if(n>=1)return 'The line it left — I\'ve seen that pattern before, cut into the oldest stone on the Green.';
    return 'I\'ll keep the village going — you bring them home. Come back and tell me everything you find.'; },
  elder:function(ps,base){ var n=(ps.spiritsFreed||[]).length; if(ps.spiritsHome)return base;
    if(n<3)return 'Twenty winters, and not one cradle. Then the storm — and the lake brought you two.';
    if(n<12)return 'Your eyes shone like the old runes when you came. Goat\'s milk put the light out — or hid it.';
    return base; },
  // round 80 (Kris: "the other twin studying needs to be in a separate library building … the other twin sleeps there at night"; L4: the library
  // by day, the second bed in your Home at night): where the twin is now — 'library' (at their desk, 16v), 'bed' (asleep in your Home) or
  // 'out' (after the end, by day: out on the Green with everyone)
  night:function(ws){ ws=ws||(typeof game!=='undefined'&&game.scene&&game.scene.getScene('World')); return !!ws&&(ws._night||0)>0.5; },
  where:function(ps,ws){ if(ZTWIN.night(ws))return 'bed'; return ps&&ps.spiritsHome?'out':'library'; },
  spot:function(ws){ var tx=CENTER_X-10, ty=CENTER_Y+12; for(var r=0;r<8;r++)for(var a=0;a<Math.max(1,r*8);a++){ var an=a/Math.max(1,r*8)*Math.PI*2, x=Math.round(tx+Math.cos(an)*r), y=Math.round(ty+Math.sin(an)*r), wx=x*TILE+16, wy=y*TILE+16;
      if(!ws._canGo||ws._canGo(wx,wy,null))return {x:wx,y:wy}; } return {x:tx*TILE+16,y:ty*TILE+16}; },
  tick:function(){ try{ if(!ZTWIN.on||typeof game==='undefined'||!game.scene)return; var ws=game.scene.getScene('World'); if(!ws||!ws.wd||ws.wd.islKey||!ws.playerState||!ws.player||!ws.sys.isActive())return;
    var ps=ws.playerState, O=ZTWIN.other(ps), T=ws._twin;
    var el0=(ws._villageNPCs||[]).find(function(n){ return n.id==='vf_elder'; }); if(el0){ if(el0._base===undefined)el0._base=el0.line; el0.line=ZTWIN.elder(ps,el0._base); }
    if(ZTWIN.where(ps,ws)!=='out'){ if(T){ if(T.im.scene)T.im.destroy(); ws._villageNPCs=(ws._villageNPCs||[]).filter(function(n){ return n.id!=='vf_twin'; }); ws._twin=null; } return; }      /* round 80: in the library or asleep at Home */
    if(T&&(T.ch!==O.ch||!T.im.scene)){ if(T.im.scene)T.im.destroy(); ws._villageNPCs=(ws._villageNPCs||[]).filter(function(n){ return n.id!=='vf_twin'; }); T=ws._twin=null; }
    if(!T){ if(typeof ZAtlas==='undefined'||!ZAtlas.has(O.ch)||!ZAtlas.ready(O.ch)){ if(typeof ZAtlas!=='undefined'&&ZAtlas.has(O.ch))ZAtlas.state(O.ch); return; }
      var p=ZTWIN.spot(ws), im=ws.add.image(p.x,p.y+12,'__WHITE').setOrigin(0.5,1);
      if(!ZAtlas.set(im,O.ch,'idle','f',0)){ im.destroy(); return; } im.setScale(ZAtlas.heroK()).setDepth(WR_DEPTH(p.y));
      var npc={id:'vf_twin',n:O.name,icon:'💬',line:'',x:p.x,y:p.y,folk:true}; (ws._villageNPCs=ws._villageNPCs||[]).push(npc);
      T=ws._twin={im:im,ch:O.ch,npc:npc,i:0}; ws.events.once('shutdown',function(){ ws._twin=null; }); }
    T.i++; ZAtlas.set(T.im,T.ch,'idle','f',T.i); T.im.setScale(ZAtlas.heroK());
    var px=ws.player.x; T.im.setFlipX(px<T.im.x&&Math.abs(px-T.im.x)<TILE*4);
    T.npc.line=ZTWIN.line(ps);
    var el=(ws._villageNPCs||[]).find(function(n){ return n.id==='vf_elder'; }); if(el){ if(el._base===undefined)el._base=el.line; el.line=ZTWIN.elder(ps,el._base); }
  }catch(e){ if(!ZTWIN._err){ ZTWIN._err=1; console.warn('twin',e); } } }
};
setInterval(ZTWIN.tick,220);
