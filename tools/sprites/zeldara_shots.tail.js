(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[ZSSF.WAVE]='Round 122 — the Zeldara versions of the shots kept in the shot series';
  var HF='Zeldara (the girl hero: long auburn braids with silver clasps, a small glowing teal gem on her brow, big teal eyes, a short teal-green mantle with a pale fur collar — exactly as in the hero reference)';
  var NO=' No lion, no centaur, no animal companion unless named, no valknut symbol. No text, no letters, no frame, no split panels: ONE picture.';
  var b0=ZSCN.body; ZSCN.body=function(S){ if(!S||!S.ss||S.ss.who!=='f')return b0.apply(ZSCN,arguments); var it=S.items[0];      /* not a new camera on a story frame: the same shot, the other twin */
    return 'Create ONE image for a 2D action RPG called The Quests of Zeldara and Zeldor: '+S.title+'.\n'+it[2]+'\nThe references show how the named characters look; draw them exactly like that, in the same bold hand-drawn cartoon look, not a photo, not 3D. The painting fills the whole image edge to edge like a wide film still. No text, no labels, no frame, no UI, no comic panels.'; };
  ZSSF.LIST.forEach(function(r){ var sc=r[0], n=r[1], k=r[2], mid=r[3], SB=typeof ZSB!=='undefined'&&ZSB.SCENES.find(function(x){ return x.id===sc; }), B=SB&&SB.beats.find(function(x){ return x.n===n; }), who=B&&B.who||'h', id=mid.replace(/_m$/,'_f'), M=ZSCN.SHEETS.find(function(x){ return x.id===mid; });
    var frame='sc_sb_'+sc+'_'+('0'+n).slice(-2)+'_f', lens=M&&M.items&&M.items[0]?M.items[0][1]:'shot';
    var d='THE SAME SHOT AS THE FIRST REFERENCE, for the other hero. Keep the first reference exactly: the camera, framing, angle, place, light, colours, painted style and every other person and thing. Change only the hero: it is '+HF+', not Zeldor — in the same place and pose, doing the same thing.'+
      (who==='o'?' Where the first reference shows Zeldara beside him, Zeldor (the boy: spiky brown hair, moss-green cape, exactly as in his reference) now stands there instead — the twins swap places.':' Zeldor is not in this shot.')+
      ' The second reference is the same moment as a story frame in Zeldara\'s version: match how she looks in it.'+NO;
    var refs=[mid,frame,'hero_f.model'].concat(who==='o'?['hero_m.model']:[]);
    ZSCN.SHEETS.push({id:id,wave:ZSSF.WAVE,fam:'series',kind:'room',panel:true,cols:1,rows:1,size:'1536x1024',noStyle:true,refs:refs,
      title:(M?M.title:'Shot series — '+sc+' '+n+', shot '+k)+' — Zeldara\'s version',items:[[id.replace(/^sc_/,''),lens+' (Zeldara)',d,1536,1024]],ss:{scene:sc,n:n,k:k,who:'f'}}); });
})();
