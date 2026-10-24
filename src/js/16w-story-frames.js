// ═══════════════════════════════════════════════════════════════════════
// ║ 16w-story-frames.js — round 82: THE STORY CUT-SCENES IN THE GAME, AS PICTURES (Kris: "as i develop the videos, lets get the current image
// ║ panels and text in the game. make sure there is enough time to read everything").
// ║  · Each story moment now plays its cut-scene's painted frames (07zt6 ZSB, waves 85–89 + round 81) one by one, its line under each, in
// ║    place of the old one or two panels — the version with the hero you play. The frames come from one sheet per cut-scene
// ║    (assets/story/<scene>.webp, tools/video/story_atlas.py); a cut-scene plays its frames only when every one of them is painted, else
// ║    the old panels as before.
// ║  · Time to read: every picture holds 5–16 s by the length of its line (16p ZCUT.hold); click, Space or Enter goes on; Skip ends it.
// ║  · Where each cut-scene plays (ZSFR.MAP — the old set it replaces → the frames):
// ║      the opening (a new game) · each realm's old disaster · the gate (20 spirits) · the two lights (30) · the first spirit freed · each
// ║      builder's crossing (Bram, Mira, Dunn — and now Vela) · the Lodestar made · Muspelheim fallen (the escape, at the sinking) · Asgard
// ║      coming down (sky, lake) · your twin's lesson · the Bifröst (at the notch) · each of Surtharn's and Solmyrk's forms · Solmyrk
// ║      defeated (the citadel shakes; the golden doors) · the feast hall (the orbs; the cast; the gods free) · the truth · the spirits
// ║      going home (the circle, the Bifröst, the spirits, the gods lead them) · lightning and vines (dawn, the lightning, the spring, the
// ║      land) · the celebration · the credits · the World Tree.
// ║  · Later: a montage clip for a cut-scene (assets/video/sb_<scene>_<who>.mp4) plays in place of its frames.
// ═══════════════════════════════════════════════════════════════════════
var ZSFR={ on:true, BASE:'assets/story/',
  // the old cut-scene (16p key, or a panel id given to ZCINE.panel) → [cut-scene, first frame, last frame]
  MAP:{ saga_opening:['opening'], saga_realm1:['quiet'], saga_realm2:['blacktide'], saga_realm3:['stonefall'], saga_realm4:['ashnight'], saga_gate:['gate'], saga_orbs:['orbs'],
    saga_firstfree:['spirit'], saga_build1:['bram'], saga_build2:['mira'], saga_build3:['dunn'], saga_build4:['vela'], saga_lodestar:['lodestar'], saga_worldtree:['worldtree'],
    last_twinteach:['twinteach'], last_fh_crumble:['solfall',1,7], last_fh_doors:['solfall',8,8], last_fh_orbs:['feasthall',1,2], last_fh_cast:['feasthall',3,5], last_fh_free:['feasthall',6,9],
    last_fh_truth:['truth'], last_gods_home:['home',6,10], last_vil_lightning:['village',2,3], last_vil_vines:['village',4,5], last_vil_land:['village',6,12], last_celebrate:['celebrate'], last_after:['credits'],
    surtharn_1:['surt1'], surtharn_2:['surt2'], surtharn_3:['surt3'], surtharn_4:['surt4'], surtharn_5:['surt5'], surtharn_6:['surt6'], grimnir_1:['sol1'], grimnir_2:['sol2'], grimnir_3:['sol3'] },
  PANELS:[[/^pn_musp_sink/,['escape']],[/^pn_asg_sky/,['asgard',1,3]],[/^pn_asg_lake/,['asgard',4,6]],[/^pn_end_cast/,['home',1,3]],[/^pn_end_bif/,['home',4,4]],[/^pn_end_home/,['home',5,5]],[/^pn_end_dawn/,['village',1,1]]],
  idx:function(){ return (typeof ZSTORY_INDEX!=='undefined'&&ZSTORY_INDEX)||{}; },
  scene:function(id){ return typeof ZSB!=='undefined'&&ZSB.SCENES?ZSB.SCENES.find(function(s){ return s.id===id; }):null; },
  ps:function(){ var ws=typeof game!=='undefined'&&game.scene&&game.scene.getScene('World'); return ws&&ws.playerState; },
  // the frames of a cut-scene (from..to, counted from 1) for the hero you play, each with its line — or null if any is not painted
  frames:function(R,ps){ if(!ZSFR.on||!R)return null; var sc=ZSFR.scene(R[0]), I=ZSFR.idx()[R[0]]; if(!sc||!I||!I.at)return null; ps=ps||ZSFR.ps();
    var f=ps&&ps.hero==='f', nm={H:f?'Zeldara':'Zeldor',O:f?'Zeldor':'Zeldara'}, a=(R[1]||1)-1, b=R[2]||sc.beats.length, L=[];
    for(var i=a;i<b&&i<sc.beats.length;i++){ var bt=sc.beats[i], id=bt.ids.length>1?bt.ids[f?1:0]:bt.ids[0]; if(!I.at[id])return null;
      L.push(['sb:'+R[0]+':'+id,String(bt.cap||'').replace(/\{H\}/g,nm.H).replace(/\{O\}/g,nm.O)]); }
    return L.length?L:null; },
  ready:function(key){ return !!ZSFR.frames(ZSFR.MAP[key]); },
  // show a frame inside the cut-scene player: a box the size of the picture, its background the sheet, moved to the frame
  show:function(el,fid,cb){ var p=fid.split(':'), I=ZSFR.idx()[p[1]], at=I&&I.at[p[2]], d=el.querySelector('.zcut-sb'); if(!at){ cb(); return; }
    if(!d){ d=document.createElement('div'); d.className='zcut-sb'; d.style.cssText='width:min(100vw,calc(78vh*16/9));aspect-ratio:16/9;background-repeat:no-repeat;opacity:0;transition:opacity .6s ease'; var img=el.querySelector('.zcut-img'); el.insertBefore(d,img); }
    d.style.display=''; d.style.opacity='0'; var url=ZSFR.BASE+I.file, im=new Image(), done=false;
    var go=function(){ if(done)return; done=true; d.style.backgroundImage='url("'+url+'")'; d.style.backgroundSize=(I.cols*100)+'% '+(I.rows*100)+'%';
      d.style.backgroundPosition=(I.cols>1?at[0]/(I.cols-1)*100:0)+'% '+(I.rows>1?at[1]/(I.rows-1)*100:0)+'%'; setTimeout(function(){ d.style.opacity='1'; cb(); },120); };
    im.onload=go; im.onerror=go; im.src=url; if(im.complete)go(); },
  hide:function(el){ var d=el&&el.querySelector('.zcut-sb'); if(d){ d.style.opacity='0'; d.style.display='none'; } },
  // the sheets of the cut-scenes that may come next are fetched early, so the first frame shows at once
  warm:function(scene){ var I=ZSFR.idx()[scene]; if(!I||ZSFR._w[scene])return; ZSFR._w[scene]=1; var im=new Image(); im.src=ZSFR.BASE+I.file; }, _w:{},
  // play cut-scene frames on their own (the Bifröst at the notch); done() after, or at once if they cannot play
  play:function(key,R,done){ var L=ZSFR.frames(R); if(!L||typeof ZCUT==='undefined'||!ZCUT.on||ZCUT.isOpen()){ if(done)done(); return false; } ZCUT.SETS['story_'+key]=L; return ZCUT._play0('story',key,done); }
};
setTimeout(function(){ if(typeof ZCUT==='undefined')return;
  if(ZCUT.LOOK&&!ZCUT.LOOK.story)ZCUT.LOOK.story={bg:['#0c1a24','#03070b'],glow:'rgba(111,227,245,',sub:'#bff6ff'};
  // every cut-scene that has its frames plays them in place of its old panels
  var p0=ZCUT._play0=ZCUT.play; ZCUT.play=function(boss,ph,done){ var key=boss+'_'+ph, L=ZSFR.frames(ZSFR.MAP[key]); if(L&&boss!=='story'){ ZCUT.SETS['story_'+key]=L; return p0.call(ZCUT,'story',key,done); } return p0.apply(ZCUT,arguments); };
  // a moment that had no painted panels before (Vela's crossing) plays once its frames are in
  if(typeof ZSAGA!=='undefined'){ var r0=ZSAGA.ready; ZSAGA.ready=function(k){ return r0.apply(ZSAGA,arguments)||ZSFR.ready('saga_'+k); }; }
  // the single panels of the escape, Asgard and the ending
  if(typeof ZCINE!=='undefined'&&ZCINE.panel){ var c0=ZCINE.panel; ZCINE.panel=function(id,cap,ms,cb){ var M=id&&ZSFR.PANELS.find(function(q){ return q[0].test(id); });
      if(M&&ZSFR.play('panel_'+id,M[1],cb))return; return c0.apply(ZCINE,arguments); }; }
  // the Bifröst: its cut-scene as you set the Lodestar in the notch, then the bridge builds
  if(typeof ZASG!=='undefined'&&ZASG.bifrost){ var b0=ZASG.bifrost; ZASG.bifrost=function(ws){ var ps=ws&&ws.playerState, self=this, args=arguments;
      if(ps&&!ws._bifBusy&&!ps.bifrost&&(ps.sagaSeen||(ps.sagaSeen=[])).indexOf('sb_bifrost')<0&&ZSFR.frames(['bifrost'],ps)){ ps.sagaSeen.push('sb_bifrost'); ZSFR.play('bifrost',['bifrost'],function(){ b0.apply(self,args); }); return; }
      return b0.apply(this,arguments); }; }
  // fetch a sheet before its moment: the opening at the start, the boss forms in their fights
  if(typeof BossPhases!=='undefined'){ var s0=BossPhases.spawn; BossPhases.spawn=function(scene,key){ try{ var m={surtharn:['surt1','surt2','surt3','surt4','surt5','surt6'],grimnir:['sol1','sol2','sol3','solfall']}[key]; if(m)m.forEach(ZSFR.warm); }catch(e){} return s0.apply(this,arguments); }; }
},0);
