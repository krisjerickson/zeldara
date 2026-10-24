// ═══════════════════════════════════════════════════════════════════════
// ║ 16v-twin-library.js — round 81: THE TWIN'S LIBRARY (Kris: "the other twin studying needs to be in a separate library building. right now
// ║ being outside your home looks weird. also ok to have another bed in your house, and the other twin sleeps there at night. we might need to
// ║ make space for a library in the town, and you should be able to enter it like other buildings"; L2 near your Home, L3 a Norse timber
// ║ saga-hall, L4 the library by day and the second bed at night). Pictures: wave 90 (07zt7).
// ║  · The library stands across the street from your Home (07l VILLAGE_CORE, 05 worldgen) — [Tab] at its door goes in, like the shops.
// ║  · Inside: tall shelves, a scroll rack and ladder, the four realms' banners, the World Tree panel, a rune window and a star chart, the
// ║    saga lectern, a reading table, a map table, candle stands, the rune tablets and a saga stone. By day the other twin sits at their
// ║    desk (twin_study_m / _f) — [Tab] talks to them (and, with the Lodestar in hand, they teach you GODSBANE, 16u).
// ║  · At night the twin sleeps in the second bed in your Home (twin_sleep_m / _f; the empty bed if_bed_twin by day). [Tab] by them wakes
// ║    them only when it matters (the Lodestar); otherwise they mumble in their sleep. The library's desk stands empty; the lectern reads.
// ║  · After the end, by day, the twin is out on the Green with everyone (10zt) and the library is quiet.
// ║  · Which painting of the hall: LIB_TAKE ('a' or 'b' — Kris picks in the Lab, Library tab).
// ═══════════════════════════════════════════════════════════════════════
var LIB_TAKE='a';
var ZLIB={
  mf:function(ps){ return typeof ZTWIN!=='undefined'&&ZTWIN.other(ps).ch==='hero_f'?'f':'m'; },
  ws:function(){ return typeof game!=='undefined'&&game.scene?game.scene.getScene('World'):null; },
  where:function(){ var ws=ZLIB.ws(), ps=ws&&ws.playerState; if(!ps||typeof ZTWIN==='undefined')return 'library'; return ZTWIN.where(ps,ws); },
  READ:['The oldest saga begins: "Before the forges there were the runes — and the runes remembered everything."',
    '"Four realms around one lake, and a road of light between them." The page is worn thin where a finger has followed the line.',
    'A note in the margin, in your twin\'s hand: "Ask the stones. They answer us — why only us?"',
    '"When the sky goes quiet, the spirits labour in chains." Someone has underlined it twice.',
    'A star chart, half finished. Two bright stars are circled, side by side.'],
  read:function(){ ZLIB._r=((ZLIB._r||0)+1)%ZLIB.READ.length; if(typeof showNotif==='function')showNotif('📖 '+ZLIB.READ[ZLIB._r],'#cfeaff'); }
};
(function(){ if(typeof INTERIOR_THEMES==='undefined'||typeof INTERIOR_LAYOUTS==='undefined')return;
  INTERIOR_THEMES.library={name:'The Library',npc:null,wall:'panel',floor:'planks',wallA:'#5a3a24',wallB:'#3e2816',trim:'#6fe3f5',floorA:'#8a5e3a',floorB:'#5e3e22',light:'#ffd49a',rug:'#2a4a6a',rug2:'#6fe3f5',
    blurb:'A Norse timber saga-hall: tall shelves of old books and scrolls, a ladder for the high ones, the four realms\' banners, the World Tree carved in the wall, a rune window, a star chart, the great saga on its lectern and a saga stone whose rune glows — and, by day, your twin at their desk, reading.'};
  var P=function(x,y,w,h,pid,fb,o){ return ['hf',x,y,w,h,Object.assign({pid:pid,fb:fb},o||{})]; };
  INTERIOR_LAYOUTS.library={ deco:[['banner',3.7,1.8,'#3a6a8a','iw_realm_banners'],['painting',6,2,null,'iw_tree_panel'],['window',8,0.9,null,'iw_rune_window'],['painting',9,1.1,null,'iw_star_chart']], rug:[4,5,5,3], npc:[2.5,5.6],
    props:[P(1,2,2,1,'if_lib_shelf','bookshelf'),P(3,2,1,1,'if_lib_ladder','rack'),P(4,2,2,1,'if_scroll_rack','shelfunit',{goods:'jars'}),P(10,2,2,1,'if_lib_shelf','bookshelf'),P(12,2,1,1,'if_lib_shelf','bookshelf'),
      P(6,3,2,1,'if_saga_lectern','lectern',{lect:1}),
      P(1,5,3,1,'twin_study_m','desk',{desk:1}),P(9,5,3,1,'if_lib_table','longtable'),P(12,5,1,1,'if_saga_stone','lectern'),
      P(1,7,2,1,'if_lib_shelf_low','bookshelf'),P(5,7,1,1,'if_lib_candles','candelabra'),P(8,7,1,1,'if_lib_candles','candelabra'),P(10,7,2,1,'if_map_table','maptable'),P(12,7,1,1,'if_rune_tablets','shelfunit')],
    lights:[[2.5,4.4,100,0.38,{flicker:0.22}],[7,3.2,120,0.42,{pulse:0.3,period:2100,col:'#6fe3f5'}],[12.5,4.4,70,0.4,{pulse:0.35,period:1700,col:'#6fe3f5'}],[5.5,6.2,70,0.32,{flicker:0.25}],[8.5,6.2,70,0.32,{flicker:0.25}],[10.5,4.6,90,0.3,{flicker:0.2}],[8.4,1.4,90,0.35,{pulse:0.25,period:2600,col:'#9fe8ff'}]],
    particles:'dust', dark:0.06 };
  if(typeof INTERIOR_TYPES!=='undefined'&&INTERIOR_TYPES.indexOf('library')<0)INTERIOR_TYPES.push('library');
  // the second bed in your Home (by the hearth); the chest moves down beside the first bed
  var H=INTERIOR_LAYOUTS.house; if(H&&!H.props.some(function(p){ return p[5]&&p[5].twinBed; })){
    H.props=H.props.map(function(p){ return p[0]==='chest'?['chest',3,6,1,1]:p; }); H.props.push(P(5,3,2,2,'if_bed_twin','bed',{col:'#2a8a8a',twinBed:1}));
    INTERIOR_THEMES.house.blurb='A cosy cottage room: a quilted bed, and by the warm hearth a second bed — your twin\'s, with a pile of old books by the pillow — a small table, a bookshelf and a travel chest. Rest in your bed for free.'; }
  // which picture each piece shows now: the twin at the desk by day, asleep in the second bed by night
  var b0=buildInterior; buildInterior=function(type){ var lib=type==='library', house=type==='house'; if(!lib&&!house)return b0.apply(this,arguments);
    var ws=ZLIB.ws(), ps=ws&&ws.playerState, mf=ps?ZLIB.mf(ps):'m', at=ZLIB.where(), Z=typeof _scn==='function'?_scn():null, L=INTERIOR_LAYOUTS[type], E=null;
    L.props.forEach(function(p){ var o=p[5]||{};
      if(lib&&o.desk){ E=p; o.pid=at==='library'?'twin_study_'+mf:'if_desk'; }
      if(house&&o.twinBed){ E=p; o.pid=at==='bed'&&Z&&Z.has&&Z.has('twin_sleep_'+mf)?'twin_sleep_'+mf:'if_bed_twin'; } });
    var m=b0.apply(this,arguments); if(!E)return m;
    if(lib){ m.twinHere=at==='library'; if(!m.twinHere){ var lp=L.props.find(function(p){ return p[5]&&p[5].lect; }); m.npc.x=(lp[1]+lp[3]/2)*LT; m.npc.y=(lp[2]+lp[4]+0.6)*LT; } }
    if(house)m.twinBed={x:(E[1]+E[3]/2)*LT,y:(E[2]+E[4]*0.6)*LT,asleep:at==='bed'};
    return m; };
  setTimeout(function(){ if(typeof BuildingScene==='undefined')return; var B=BuildingScene.prototype;
    var name=function(sc){ var ps=sc.worldScene&&sc.worldScene.playerState; return ps&&typeof ZTWIN!=='undefined'?ZTWIN.other(ps).name:'your twin'; };
    var sn=B._spawnNPC; B._spawnNPC=function(type){ var m=this._imap;
      if(type==='library'){ var N=m.npc; this.npcX=N.x; this.npcY=N.y; domText(this,N.x,N.y-(m.twinHere?116:62),m.twinHere?name(this):'The old sagas',{fontSize:'8px',color:m.twinHere?'#fff2b0':'#cfeaff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(9400); return; }
      var r=sn.apply(this,arguments);
      if(type==='house'&&m.twinBed&&m.twinBed.asleep){ var self=this, T=m.twinBed, z=0; this.time.addEvent({delay:900,loop:true,callback:function(){ z++; var t=domText(self,T.x+6,T.y-30,z%2?'z':'Z',{fontSize:(7+z%3*2)+'px',color:'#cfe0ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5).setDepth(9300);
        self.tweens.add({targets:t,y:T.y-56,x:T.x+16,alpha:0,duration:1700,onComplete:function(){ t.destroy(); }}); }}); }
      return r; };
    var ci=B._checkBuildingInteraction; B._checkBuildingInteraction=function(){ var m=this._imap, type=this.building&&this.building.type;
      if(type==='house'&&m&&m.twinBed&&m.twinBed.asleep&&!this._resting){ var T=m.twinBed, d=Math.hypot(this.bx-T.x,this.by-T.y), d0=Math.hypot(this.bx-this.npcX,this.by-this.npcY);
        if(d<TILE*1.9&&d<d0){ var ws=this.worldScene, can=typeof ZTGB!=='undefined'&&ZTGB.canTeach(ws.playerState);
          this.interactPrompt.setText(can?'[Tab] Wake '+name(this):'💤 '+name(this)+' is asleep').setVisible(true).setPosition(this.bx,this.by-34);
          if(Phaser.Input.Keyboard.JustDown(this.keys.TAB)){ if(can)ZTGB.talk(ws); else showNotif('💤 '+name(this)+' mumbles in their sleep: "…the oldest stone on the Green… it remembers…"','#cfe0ff'); }
          return; } }
      var r=ci.apply(this,arguments);
      if(type==='library'&&this.interactPrompt&&this.interactPrompt.visible)this.interactPrompt.setText(m.twinHere?'[Tab] Talk to '+name(this):'[Tab] Read the saga');
      return r; };
    var ni=B._npcInteract; B._npcInteract=function(){ if(this.building&&this.building.type==='library'){ if(this._imap.twinHere&&typeof ZTGB!=='undefined')return ZTGB.talk(this.worldScene); return ZLIB.read(); } return ni.apply(this,arguments); };
  },0);
  if(typeof VB_PAINTED!=='undefined')VB_PAINTED.library='vb_library_'+LIB_TAKE;
})();
