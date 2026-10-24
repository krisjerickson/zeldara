// ═══════════════════════════════════════════════════════════════════════
// ║ 16u-twin-godsbane.js — round 73: KRIS'S SAGA FEEDBACK IN THE GAME (Lab → The saga, end to end; answers C2–C3 in docs/08).
// ║  · "whichever twin you don't pick needs to be studying texts the entire game … the other twin is the one to teach you godsbane"
// ║    (C2: in the village, after the Lodestar): the twin sits at their books by the Home (the painted picture once round 78 is in);
// ║    with the Lodestar in hand, [Tab] by your twin → they find the word in the old sagas and teach you GODSBANE. The pier's notch now
// ║    wants the word first; the spirits there bless the road instead of teaching it.
// ║  · "the 2nd twin comes to help you cast godsbane to liberate odin and freya": in the feast hall your twin walks beside you and casts
// ║    with you — a second beam into the orbs; the cast panel shows the two of you (pn_fh_cast_twins) once painted.
// ║  · New moments told in panels (they play once painted — no stand-ins for the story): the first spirit freed (the chains fall away;
// ║    the line of light brings life), each builder reopening a crossing (Bram, Mira, Dunn), the Lodestar made, and — C3: all forty
// ║    spirits free, after the end — the whole tattoo, then the World Tree glowing under Mirror Lake, which stays.
// ═══════════════════════════════════════════════════════════════════════
if(typeof ZSAGA_SETS!=='undefined'){
  ZSAGA_SETS.firstfree=[['pn_binders_free','The chains fall away — and for the first time in years, a soul of Runeheim is free.'],['pn_lines_life','Its soul-line runs out into the land… and where the light runs, life may one day follow.']];
  ZSAGA_SETS.build1=[['pn_build_bram','Bram raises the Silverrun bridge — for the first time in years, the Grasslands and the Wetlands touch again.']];
  ZSAGA_SETS.build2=[['pn_build_mira','Mira\'s lift climbs the Great Scar — the road to the Highlands is open.']];
  ZSAGA_SETS.build3=[['pn_build_dunn','Dunn drives the last rivet into his iron bridge — across the Cinder Chasm lie the Ashlands.']];
  ZSAGA_SETS.lodestar=[['pn_forges_lodestar','At Muspelheim\'s great hearth the four heart-glasses pour their light into the staff — the Lodestar is made.']];
  ZSAGA_SETS.worldtree=[['pn_world_tree','And under Mirror Lake, where the twins were found, the World Tree shines — whole at last.']];
}
if(typeof ZLAST_SETS!=='undefined')ZLAST_SETS.twinteach=[['pn_twin_teach_{w}','{O} has read the old sagas all this time — and finds the word the Lodestar has waited for: GODSBANE.']];
var ZTGB={ on:true,
  // ── the twin's lesson ──
  canTeach:function(ps){ return !!(ps&&!ps.godsbane&&typeof ZASG!=='undefined'&&ZASG.hasStaff(ps)); },
  talk:function(ws){ var ps=ws.playerState, O=ZTWIN.other(ps); if(!ZTGB.canTeach(ps)){ showNotif('💬 '+ZTWIN.line(ps),'#ffe9a8'); return; }
    var go=function(){ var draw=typeof ZTALK!=='undefined'&&ZTALK.ch?ZTALK.ch(O.ch,null):function(){};
      ZSPIRIT.talk(O.name,'#fff2b0','You found it — the Lodestar! Let me see… <i>yes</i>. It\'s in the oldest saga, the one nobody could read: the staff of the gods sleeps until it hears one word.<br><br>I\'ve been reading these texts since the day you left. Say it with me: <b>GODSBANE</b>. Speak it with the Lodestar in your hand, and the light will answer.<br><br>Set the staff in the notch at the end of the pier — and when you reach the gods, I\'ll be there. We do this together.<br><br><span style="color:#fff2b0">✦ Godsbane — press <b>V</b> (or the ✦ slot) with the Lodestar in your hand.</span>',
        [{t:'✦ Godsbane',f:function(){ ZTGB.learn(ws); }}],draw); };
    var w=ZLS.who(ps); if(typeof ZCUT!=='undefined'&&ZCUT.painted&&ZCUT.painted('pn_twin_teach_'+w))ZLS.play(ps,'twinteach',go); else go(); },
  learn:function(ws){ var ps=ws.playerState; if(ps.godsbane)return; ps.godsbane=1; ps.godsbaneFrom='twin'; if(typeof ZGODS!=='undefined')ZGODS.slot();
    showNotif('✦ You learned GODSBANE from '+ZTWIN.other(ps).name+' — [V] with the Lodestar in hand. Now: the notch at the end of the pier.','#fff2b0');
    if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('Godsbane'); }catch(e){} if(ws._emitUI)ws._emitUI(); },
  // ── the twin at their books (the painted picture, once in; until then the standing twin as before) ──
  // round 80 (Kris: "the other twin studying needs to be in a separate library building. right now being outside your home looks weird"): the desk
  // by the Home is gone — the twin studies in the library now (16v-twin-library.js); this only clears a desk left from before
  study:function(ws){ var D=ws._twinDesk; if(D){ if(D.scene)D.destroy(); ws._twinDesk=null; if(ws._twin&&ws._twin.im&&ws._twin.im.scene)ws._twin.im.setVisible(true); } },
  // ── the feast hall: your twin beside you ──
  fhMake:function(sc){ var ps=sc.worldScene&&sc.worldScene.playerState; if(!ps||typeof ZTWIN==='undefined'||typeof ZAtlas==='undefined')return; var O=ZTWIN.other(ps); if(!ZAtlas.has(O.ch))return;
    var x=sc.bx-46, y=sc.by+4, im=sc.add.image(x,y+12,'__WHITE').setOrigin(0.5,1); var dir=ZAtlas.count&&ZAtlas.count(O.ch,'idle','b')>0?'b':'f';
    if(!ZAtlas.set(im,O.ch,'idle',dir,0)){ im.destroy(); return; } im.setScale(ZAtlas.heroK()).setDepth(y+12).setAlpha(0);
    sc.tweens.add({targets:im,alpha:1,duration:900}); sc._twin={im:im,ch:O.ch,dir:dir,x:x,y:y,i:0};
    sc.time.delayedCall(900,function(){ showNotif('💬 '+O.name+': "I read it in the old texts — we cast it together!"','#ffe9a8'); }); },
  fhTick:function(sc,dt){ var T=sc._twin; if(!T||!T.im.scene)return; var tx=sc.bx-46, ty=sc.by+4, d=Math.hypot(tx-T.x,ty-T.y), k=Math.min(1,dt*4);
    if(d>2){ T.x+=(tx-T.x)*k; T.y+=(ty-T.y)*k; } T.i++; if(!T.cast)ZAtlas.set(T.im,T.ch,d>3&&ZAtlas.count&&ZAtlas.count(T.ch,'walk',T.dir)>0?'walk':'idle',T.dir,Math.floor(T.i/4)); T.im.setPosition(T.x,T.y+12).setDepth(T.y+12); },
  fhCast:function(sc){ var T=sc._twin; if(!T||!T.im.scene)return; T.cast=true; var pose=['magic_staff','cheer','idle'].find(function(a){ return ZAtlas.count&&ZAtlas.count(T.ch,a,T.dir)>0; })||'idle'; ZAtlas.set(T.im,T.ch,pose,T.dir,0);
    var beam=sc.add.graphics().setDepth(9399).setBlendMode(Phaser.BlendModes.ADD), x0=T.x, y0=T.y-26, x1=sc.ox, y1=sc.oy;
    sc.tweens.addCounter({from:0,to:1,duration:900,onUpdate:function(tw){ var v=tw.getValue(); beam.clear(); [[12,0.18],[5,0.45],[2,0.9]].forEach(function(q){ beam.lineStyle(q[0],0xc8f4ff,q[1]); beam.lineBetween(x0,y0,x0+(x1-x0)*v,y0+(y1-y0)*v); }); }});
    sc.time.delayedCall(2600,function(){ sc.tweens.add({targets:beam,alpha:0,duration:900,onComplete:function(){ beam.destroy(); T.cast=false; }}); }); },
  // ── the moments: watched once a second ──
  seen:function(ps,k){ return (ps.sagaSeen||[]).indexOf(k)>=0; },
  tick:function(){ try{ if(!ZTGB.on||typeof game==='undefined'||!game.scene)return; var ws=game.scene.getScene('World'); if(!ws||!ws.playerState||!ws.player||!ws.sys.isActive())return;
    var ps=ws.playerState; ZTGB.study(ws); if(ws._twin&&ws._twin.npc)ws._twin.npc.talk=ZTGB.talk;      /* the twin answers [Tab] (10-scene-world calls npc.talk) */ if(typeof _anyModalOpen==='function'&&_anyModalOpen())return; if(typeof ZCUT!=='undefined'&&ZCUT.isOpen&&ZCUT.isOpen())return;
    // what this game had when it was loaded counts as already told (an old save does not replay three crossings at once)
    var st=ws._ztgb; if(!st||st.ps!==ps){ st=ws._ztgb={ps:ps,res:(ps.rescued||[]).slice(),staff:typeof ZASG!=='undefined'&&ZASG.hasStaff(ps)}; return; }
    for(var k=1;k<=3;k++)if((ps.rescued||[]).indexOf(k)>=0&&st.res.indexOf(k)<0&&!ZTGB.seen(ps,'build'+k)){ st.res.push(k); ZSAGA.play(ps,'build'+k); return; }
    var has=typeof ZASG!=='undefined'&&ZASG.hasStaff(ps); if(has&&!st.staff){ st.staff=true; if(!ZTGB.seen(ps,'lodestar')&&ZSAGA.play(ps,'lodestar'))return; }
    var n=(ps.spiritsFreed||[]).length;
    if(ps.spiritsHome&&n>=40){ if(!ZTGB.seen(ps,'tattoo')&&ZSAGA.play(ps,'tattoo'))return; if(!ps.worldTree){ ps.worldTree=1; ZSAGA.play(ps,'worldtree'); } }
    if(ps.worldTree)ZTGB.lakeTree(ws);
  }catch(e){ if(!ZTGB._err){ ZTGB._err=1; console.warn('saga r73',e); } } },
  // the World Tree's light under Mirror Lake (once painted: fx_lake_tree)
  lakeTree:function(ws){ if(ws._wTree&&ws._wTree.scene)return; var Z=typeof _scn==='function'?_scn():null; if(!Z||!Z.has||!Z.has('fx_lake_tree')||typeof ZASG==='undefined')return;
    var t=Z.texture(ws,'fx_lake_tree',0,{shadow:false}); if(!t)return; var L=ZASG.LAKE, im=ws.add.image((L.x+0.5)*TILE,(L.y+0.5)*TILE,t.key).setOrigin(0.5,0.5).setBlendMode(Phaser.BlendModes.ADD).setDepth(-4.6).setAlpha(0.55);
    im.setScale(110*TILE/Math.max(1,im.width)); im._noCull=true; ws._wTree=im; ws.tweens.add({targets:im,alpha:0.85,duration:3200,yoyo:true,repeat:-1,ease:'Sine.inOut'}); }
};
setTimeout(function(){
  // the twin answers [Tab]: their line, or the lesson once you carry the Lodestar
  // the pier's notch wants the word first
  if(typeof ZASG!=='undefined'){ var c0=ZASG.check; ZASG.check=function(ws){ var ps=ws.playerState, N=ZASG.notchAt&&ZASG.notchAt();
      if(ps&&N&&ws.player&&!ps.bifrost&&!ps.godsbane&&ps.asgardDown&&ZASG.hasStaff(ps)&&Math.hypot(ws.player.x-N.x,ws.player.y-N.y)<=TILE*1.8){
        var t='The Lodestar sleeps — '+ZTWIN.other(ps).name+' may know its word';
        if(!ws._interactPrompt||ws._interactPrompt._zt!==t){ if(ws._interactPrompt)ws._interactPrompt.destroy(); ws._interactPrompt=domText(ws,N.x,N.y-44,t,{fontSize:'10px',color:'#fff2b0',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20); ws._interactPrompt._zsp='notch'; ws._interactPrompt._zt=t; }
        if(Phaser.Input.Keyboard.JustDown(ws.keys.TAB))showNotif('🌟 The staff fits the notch, but it does not wake. '+ZTWIN.other(ps).name+' has read the old sagas all this time — find them in the library and ask.','#fff2b0');
        return true; }
      return c0.apply(this,arguments); }; }
  // the feast hall: your twin with you, and casting with you; the cast panel with both of you once painted
  if(typeof FeastHallScene!=='undefined'){ var F=FeastHallScene.prototype, cr=F.create, up=F.update, ca=F._cast;
    F.create=function(){ var r=cr.apply(this,arguments); try{ ZTGB.fhMake(this); }catch(e){} return r; };
    if(up)F.update=function(t,dt){ var r=up.apply(this,arguments); try{ ZTGB.fhTick(this,(dt||16)/1000); }catch(e){} return r; };
    if(ca)F._cast=function(){ try{ ZTGB.fhCast(this); }catch(e){} return ca.apply(this,arguments); }; }
  if(typeof ZLS!=='undefined'&&typeof ZLAST_SETS!=='undefined'){ var lp=ZLS.play; ZLS.play=function(ps,k){ if(k==='fh_cast'){ var both=typeof ZCUT!=='undefined'&&ZCUT.painted&&ZCUT.painted('pn_fh_cast_twins');
      ZLAST_SETS.fh_cast=[[both?'pn_fh_cast_twins':'pn_fh_cast_{w}',both?'Godsbane — the two of you together, into the very centre, where the two lights meet.':'Godsbane — into the very centre, where the two lights meet.']]; } return lp.apply(this,arguments); }; }
  // the first spirit freed: the chains fall away and the line of light (it plays before the realm's old disaster)
  if(typeof ZSAGA!=='undefined'){ var at=ZSAGA.afterTrace; ZSAGA.afterTrace=function(ws,s){ var ps=ws&&ws.playerState; if(ps&&(ps.spiritsFreed||[]).length>=1&&!ZTGB.seen(ps,'firstfree')&&ZSAGA.ready('firstfree')){ setTimeout(function(){ ZSAGA.play(ps,'firstfree',function(){ at.call(ZSAGA,ws,s); }); },900); return; }
      // the whole tattoo waits for the end (C3) — the 40th before the ending is told then
      if(ps&&!ps.spiritsHome){ var L=ZSAGA.seen(ps), had=L.indexOf('tattoo')>=0; if(!had)L.push('tattoo'); at.apply(this,arguments); if(!had){ var i=L.indexOf('tattoo'); if(i>=0)L.splice(i,1); } return; }
      return at.apply(this,arguments); }; }
},0);
setInterval(ZTGB.tick,1000);
