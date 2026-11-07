// ═══════════════════════════════════════════════════════════════════════
// ║ 07zau6-music92.js — round 92: Kris's notes on the music (Lab → Music cards, Nov 7).
// ║  · mu_home — "let's only use take 2. take 1 is too slow": the game plays only mu_home.b (take 1 stays on disk, unused).
// ║  · mu_village_night — "this is a bit too slow and reflective, needs to be a bit more crafty and sneaky for a night scene": new Suno words —
// ║    a mischievous tiptoe night theme (pizzicato, plucked nyckelharpa, staccato flute, a walking muted electric bass, brushed drums, finger
// ║    snaps), ~100 bpm, instrumental, still warm and village-sized. The Lab's card copies the new words; the old take plays until a new one is in.
// ═══════════════════════════════════════════════════════════════════════
(function(){
  if(typeof ZAUDIO_INDEX!=='undefined'&&ZAUDIO_INDEX&&ZAUDIO_INDEX.mu_home&&ZAUDIO_INDEX.mu_home.files){ var F=ZAUDIO_INDEX.mu_home.files.filter(function(f){ return /\.b$/.test(f.base); }); if(F.length)ZAUDIO_INDEX.mu_home.files=F; }
  if(typeof ZAUD==='undefined'||!ZAUD.suno)return;
  ZAUD.REDO92={ mu_village_night:{
    words:'the village at night, crafty and sneaky: a mischievous tiptoeing night theme, like slipping between the houses after dark — pizzicato strings and plucked nyckelharpa, staccato wooden flute, playful stops and sudden hushes, a curious, sly melody',
    bpm:100, instr:'pizzicato strings, plucked nyckelharpa, staccato wooden flute, finger snaps, brushed frame drum, muted walking electric bass, soft celesta',
    note:'Kris (round 92): too slow and reflective before — make it crafty and sneaky' } };
  if(ZAUD.VOX)ZAUD.VOX.mu_village_night=null;      // instrumental: the sneaking theme carries no voice
  Object.keys(ZAUD.REDO92).forEach(function(id){ if(ZAUD.INSTR)ZAUD.INSTR[id]=ZAUD.REDO92[id].instr; });
  var s3=ZAUD.suno; ZAUD.suno=function(c){ var R=ZAUD.REDO92[c.id]; if(!R)return s3.apply(ZAUD,arguments);
    var S=s3.call(ZAUD,Object.assign({},c,{words:R.words,bpm:R.bpm}));
    var TAIL='fantasy RPG score, playful Nordic folktronica: plucked folk instruments over a light electronic groove, sly and light-footed, cinematic but never grand';
    [ZAUD.STYLE_SOFT,ZAUD.STYLE].forEach(function(t){ if(t&&S.style.indexOf(t)>=0)S.style=S.style.replace(t,TAIL); });      /* not the soft lullaby sound any more, nor the grand one */
    S.style=S.style.replace(/bass: [^;.]*/,'bass: a muted walking electric bass, plucked, sly and bouncy');
    S.redo=R.note; S.instrumental=true; S.lyrics=''; if(!/vocals$/.test(S.exclude||''))S.exclude=(S.exclude?S.exclude+', ':'')+'vocals'; S.exclude+=', lullaby, slow ambient, reflective'; return S; };
})();
