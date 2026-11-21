// ═══════════════════════════════════════════════════════════════════════
// ║ 79k4-lab-music-ask.js — round 121 (Kris: "i don't think i've selected all of the music i need to, but don't see this in the lab. float
// ║ these into the updated lab"): Music & sound moves into the main Lab (99-lab-sets LAB_NEW; its previews joined into two files by
// ║ tools/audio/music_join.py), with an ask that stays open until every music cue has your ☆ or a note.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LTODO==='undefined'||typeof ZAUD==='undefined'||typeof LBR==='undefined')return;
  var MU=ZAUD.all().filter(function(c){ return c.kind==='music'&&/^mu_/.test(c.id); }), P=function(k){ return (typeof LabApp!=='undefined'&&LabApp.picks[k])||{}; };
  var open=function(){ return MU.filter(function(c){ var p=P('audio-'+c.id); return !p.verdict&&!(p.notes||'').trim(); }); };
  LTODO.add({id:'music121',label:'♫ Music: '+MU.length+' music cues — ☆ the ones to keep or make, a note on any to change',where:'Music & sound tab (now in this Lab)',
    done:function(){ return open().length===0; },go:function(){ LTODO.goTo('audio','.br-grid',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('audio')<0)LAB_ACTIVE.unshift('audio');
})();
