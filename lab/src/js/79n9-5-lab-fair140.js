// ═══════════════════════════════════════════════════════════════════════
// ║ 79n9-5-lab-fair140.js — round 140c (Kris: "when the fair starts, there also needs to be some explanation about this, perhaps someone that
// ║ meets you when you first come back to the village to tell you about the fair once it starts. propose whom it would be, and if they need to
// ║ be able to walk to greet you, we may need new sprites … should be the same for all fairs").
// ║ Five greeters to choose from; what they say at each of the five fairs; how it plays. Picks: fair140-<k> (pick|maybe|cut, notes), fair140-all.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }, P=function(k){ return LabApp.picks[k]||{}; };
  var tag=function(k){ var v=P(k).verdict; return '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ This one'],['maybe','?'],['cut','✕']].map(function(b){ return '<button class="vbtn wl-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+(ph||'Note…')+'">'; };
  var WHO=[['marta','Marta the Cart Vendor','The fair is her trade: she brings her cart to the Green for every fair — even the first, before she lives in the village. Cheerful, quick, knows every stall. Playing now, until you pick.','Has walking frames — nothing to paint.',1],
    ['runa','Elder Runa','The village\'s voice: she opens each fair. Warm and a little grand. She already teaches you the waystones, so it is one more thing from her.','Has walking frames — nothing to paint.',0],
    ['tob','Tob the Farmer','The fairs follow the farming year — thaw, midsummer, harvest, yule, blossom — and Tob feels each one in his fields. Homely. Lives in the village from the start.','Has walking frames — nothing to paint.',0],
    ['fenwick','Old Fenwick the Lamplighter','Lights the fair lanterns and knows the old songs and customs — a storyteller. Comes to live in the village later; for fairs before that he would visit.','Has walking frames — nothing to paint.',0],
    ['crier','A new face: the fair-crier','Someone who comes only with the fairs — a travelling crier with a horn and a ribbon staff. Seeing her means a fair has begun. Needs a name.','New paintings: her standing sheet and her walk (2 sheets).',0]];
  var F=[['sp','🌱','The Thaw-fair','the first fair since the long winter broke. We sweep out the old year and hang green on every door','Twenty-eight winters without a fair — nobody remembers the old rules, so we are making them up.'],
    ['su','🔥','The Midsummer Fires','the longest day of the year. The bonfire on the Green burns all night and nobody sleeps','Bring a wish for the fire. Everyone does.'],
    ['au','🍂','The Harvest Fires','the harvest is in. We feast on what the land gave back to us','Mind the barrels. Last time Rolf rolled one into the pond.'],
    ['wi','🕯','Yule','the longest night. We light the great log and keep each other warm till the sun comes back','Stay by the fires, and listen for the old songs.'],
    ['bl','🌸','The Blossom Feast','spring in full flower: garlands on every post and dancing round the pole','Wear a flower. You will be the only one without one otherwise.']];
  LAB_TABS.push({ id:'fair140', name:'The fair greeter',
    blurb:'<b>Round 140 — someone to tell you about the fair.</b> The same for every fair: the first time you come into the village after a fair begins (and nothing is chasing you), the greeter walks up to you, says what the fair is, the three games at the board and the ribbon, then walks back to the board and stands there while the fair lasts. Once per fair. <b>It plays now with Marta</b> — ✓ who it should be.',
    designs:[{id:'fair140',name:'The fair greeter'}],
    render:function(){ var h='<div class="w4-c"><h3>Who greets you</h3>'+WHO.map(function(w){ var k='fair140-'+w[0]; return '<div class="r40-p"><div><b>'+esc(w[1])+'</b>'+(w[4]?' <small class="mv40-ask">playing now</small>':'')+' — '+esc(w[2])+' <i style="color:#9fb0c4">'+esc(w[3])+'</i></div><div class="w4-a">'+tag(k)+note(k)+'</div></div>'; }).join('')+'</div>';
      h+='<div class="w4-c"><h3>What they say (three lines, the same shape at every fair)</h3><table class="r40-t"><tr><th>Fair</th><th>The words</th></tr>'+F.map(function(f){ return '<tr><td>'+f[1]+' <b>'+esc(f[2])+'</b></td><td>“There you are! '+esc(f[2])+' has begun on the Green — '+esc(f[3])+'.”<br>“For three days there are games at the fair board: the rune toss, rune memory, and a race round the Green. Play any one of them and the fair\'s ribbon is yours to keep.”<br>“'+esc(f[4])+' Come and find me at the board — I will show you how they go.”</td></tr>'; }).join('')+'</table>'+
        '<p class="w4-p">When: only after your first win and your first cleared site (or day 3), never during a fight or a story scene. The greeter finds a way round the houses to you, and goes home (or back to the board) after.</p></div>';
      return h+'<textarea class="wl-n wl-all" data-k="fair140-all" placeholder="Changes to the words, or anything else…">'+esc(P('fair140-all').notes||'')+'</textarea>'; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'fair140',label:'🎀 The fair greeter: ✓ who meets you when a fair begins',where:'The fair greeter tab',done:function(){ return WHO.some(function(w){ return P('fair140-'+w[0]).verdict==='pick'; }); },go:function(){ LTODO.goTo('fair140',null,0); }});
})();
