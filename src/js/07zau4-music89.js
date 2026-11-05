// ═══════════════════════════════════════════════════════════════════════
// ║ 07zau4-music89.js — round 89: MORE VARIETY IN THE MUSIC (Kris: "we still need more variety on the music … more electronic influences …
// ║ more electric fiddles and electric lyres … more punchy bass. look into victor wooten and bela fleck and flecktones for how to describe
// ║ some of the bass effects … more variety of vocals. still no words … grand and epic … celtic electronic. For boss fights, we can go more
// ║ towards full EDM"; examples from his playlist "medievalcore EDM": Immortal Flame by Panda Eyes, Teminite and Anna Yvette; Warbringer by TheFatRat, Everen
// ║ Maxwell and Lindsey Stirling, Lindsey Stirling's recent work; Wanderlust by Everen Maxwell for the journeys).
// ║ Their sound in words: melodic dubstep and drumstep (soaring supersaw chords, a soaring female voice, glitchy chopped leads, growling
// ║ basses, halftime drops) and the electric violin as the hero of the track — fast, dancing runs and slides over cinematic EDM.
// ║ Suno refuses artist names, so the bass is described by its techniques (slap and pop, double-thumb triplets, open-hand tapping,
// ║ harmonics, envelope-filter funk, chordal strums, fretless lines, odd meters) and the playlist by its sound (melodic dubstep and
// ║ drumstep: soaring supersaw chords, a soaring female voice, glitchy chopped leads, growling basses, halftime drops).
// ║  · The house styles: Nordic and Celtic folktronica — electric fiddles and electric lyres beside the acoustic ones.
// ║  · Eight bass colours (ZAUD.BASS89), one per piece.
// ║  · Twelve wordless voices (was two): kulning calls, a northern chanting call, overtone throat singing, a war band's chant, a valkyrie
// ║    soprano, raw women's harmony choir, Celtic lilting, Celtic mouth music, a low monks' chant, whispers, a giant's growl, a male and female duet.
// ║  · Celtic electronic for the Wetlands, the islands, the village day and the celebration.
// ║  · The battles go full EDM, each its own kind (ZAUD.EDM89).
// ║ It changes the words for every piece (the Lab shows them), so the ones still to make — and any you remake — get the new sound.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZAUD==='undefined')return;
  ZAUD.STYLE='epic fantasy RPG score, Nordic folktronica: electric fiddles and lyres with folk instruments, driving electronic drums, deep sub bass, a punchy virtuosic electric bass, synth arpeggios; cinematic, energetic, grand';
  ZAUD.STYLE_SOFT='fantasy RPG game score, Nordic folk with a clear electronic pulse: an electric lyre and acoustic folk instruments, a warm, melodic electric bass, a light electronic beat, shimmering synth pads; uplifting, engaging and quietly epic, moving forward';
  ZAUD.STYLE_CELT='epic fantasy RPG game score, Celtic electronic (Celtic folktronica): uilleann pipes, tin whistle, Celtic harp and bodhrán over driving electronic beats, an electric fiddle, a bouncing, funky electric bass and bright synth arpeggios; joyful, energetic and grand';
  ZAUD.CELT89={mu_village_day:1,mu_shops:1,mu_wet_day:1,mu_wet_night:1,mu_island:1,mu_trial:1,mu_celebration:1,mu_green:1};
  // ── the bass, in words a music model understands (the techniques of the great fusion bassists, without their names) ──
  ZAUD.BASS89={
    slap:'a punchy slap-and-pop electric bass with fast double-thumbed triplet runs and ghost notes',
    tap:'an open-hand tapping electric bass line, both hands on the fretboard, rippling and melodic',
    harm:'a melodic electric bass that rings out natural and artificial harmonics like bells between the grooves',
    wah:'an envelope-filter (auto-wah) funk bass, quacking and bubbly, locked to the kick',
    chord:'a chordal electric bass strummed like a guitar, full and resonant, then a melodic bass solo break',
    fretless:'a singing fretless bass with slides and vibrato carrying the melody',
    odd:'a virtuosic jazz-fusion electric bass groove in an odd meter (7/8 and 5/4), with slap accents and fast fills',
    fuzz:'a punchy slap bass locked to the kick and a distorted fuzz bass growling under the drops'};
  var B={mu_title:'harm',mu_saga_storm:'fretless',mu_saga_old:'fretless',mu_glimpse:'harm',mu_village_day:'slap',mu_village_night:'fretless',mu_home:'harm',mu_shops:'wah',mu_glimmerhall:'tap',mu_green:'slap',
    mu_grass_day:'slap',mu_grass_night:'harm',mu_wet_day:'wah',mu_wet_night:'fretless',mu_high_day:'chord',mu_high_night:'harm',mu_ash_day:'odd',mu_ash_night:'fretless',
    mu_dungeon:'odd',mu_tower:'tap',mu_castle:'chord',mu_mage:'tap',mu_island:'slap',mu_trial:'wah',mu_sky:'tap',
    mu_fight:'fuzz',mu_boss:'fuzz',mu_boss_realm:'fuzz',mu_boss_mage:'odd',mu_forges:'chord',mu_muspelheim:'odd',mu_surtharn:'fuzz',mu_escape:'slap',
    mu_asgard_down:'harm',mu_asgard:'fretless',mu_citadel:'odd',mu_solmyrk:'fuzz',mu_feast_hall:'fretless',mu_gods_free:'harm',mu_bifrost:'tap',mu_village_moment:'chord',mu_celebration:'slap',mu_credits:'chord'};
  ZAUD.BASSOF=B;
  // ── the voices: still no words — twelve kinds, grand and epic ──
  ZAUD.VOXNAME={elf:'🧝 elven woman\'s voice (wordless)',dwarf:'⛏ deep dwarven men\'s voices (wordless)',violin:'🎻 slow solo violin',
    kulning:'🏔 kulning — high herding calls echoing over the mountains',yoik:'🌌 a northern chanting call on vocables',throat:'🪨 overtone throat singing',
    war:'⚔ a war band\'s chant — shouts, grunts and stamping',valkyrie:'🛡 a valkyrie soprano soaring over the battle',harmony:'❄ a raw women\'s harmony choir',
    lilt:'☘ Celtic lilting — an ornamented women\'s vocalise',mouth:'🎶 Celtic mouth music — rhythmic vocables',monk:'🕯 a low monks\' chant in a stone hall',
    whisper:'🌫 whispers and ghostly sighs',jotun:'🔥 a giant\'s growling chant',duet:'⚡ a man and a woman, call and answer (wordless)'};
  Object.assign(ZAUD.VOXSTYLE,{
    kulning:'kulning: a woman\'s high, piercing Scandinavian herding calls, wordless, ringing and echoing across the mountains between the phrases',
    yoik:'a northern chanting call: a man\'s circular, rhythmic chant on vocables (lo-lo-loo, voi-ja), earthy and hypnotic, wordless',
    throat:'deep overtone throat singing: a low growling drone with whistling overtones above it, ancient and powerful, wordless',
    war:'a war band\'s chant: rhythmic shouts and grunts (hey! ha! hu!), stamping and shield-beats, huge and tribal, wordless',
    valkyrie:'a soaring operatic soprano vocalise, wordless, powerful and heroic, riding over the drops like a valkyrie in the storm',
    harmony:'a raw women\'s harmony choir in close, ringing, dissonant harmonies, bright and ancient, wordless',
    lilt:'Celtic lilting: a woman\'s ornamented, flowing sean-nós vocalise with grace notes, wordless and longing',
    mouth:'Celtic mouth music: quick, rhythmic, joyful vocables (diddly-dum, ho-ro) sung like a dance tune, wordless',
    monk:'a low men\'s chant in unison on open vowels, like monks in a vast stone hall, grave, echoing and ancient, wordless',
    whisper:'layered breathy whispers, ghostly sighs and soft wordless murmurs drifting in the reverb',
    jotun:'a giant\'s chant: very deep, growling, slowed-down men\'s voices and huge roars, monstrous and wordless',
    duet:'a man\'s deep voice and a woman\'s high voice in wordless call and answer, rising together into one line, noble and moving'});
  Object.assign(ZAUD.VOXLYRICS,{
    kulning:'[Intro]\n[Instrumental]\n\n[Verse]\n[Kulning, high herding call, echoing]\nHoooo… aa-aa… hoooo…\n\n[Instrumental break]\n\n[Verse]\n[Kulning call answered by the echo]\nHeee-aaa… hoooo…\n\n[Outro]\n[Instrumental]',
    yoik:'[Intro]\n[Instrumental]\n\n[Verse]\n[Chanting call on vocables, rhythmic]\nLo-lo-loo… voi-ja… lo-loo…\n\n[Instrumental break]\n\n[Verse]\n[Chanting call, circling]\nVoi-ja-ja… lo-lo-loo…\n\n[Outro]\n[Instrumental]',
    throat:'[Intro]\n[Low drone]\n\n[Verse]\n[Overtone throat singing, deep drone]\nOhhhhh… mmmm…\n\n[Instrumental break]\n\n[Verse]\n[Throat singing with whistling overtones]\nOhhhhh…\n\n[Outro]\n[Low drone]',
    war:'[Intro]\n[War drums]\n\n[Chant]\n[Rhythmic war shouts]\nHey! Ha! Hey! Ha!\nHu! Hu! Hu!\n\n[Drop]\n[Instrumental]\n\n[Chant]\n[War shouts and stamping]\nHey! Ha! Hu!\n\n[Drop]\n[Instrumental]',
    valkyrie:'[Intro]\n[Instrumental]\n\n[Build]\n[Soaring soprano vocalise, wordless]\nAaaaah… aaah…\n\n[Drop]\n[Instrumental]\n\n[Build]\n[Soprano vocalise, higher]\nAaaaah… ohhh…\n\n[Drop]\n[Instrumental]',
    harmony:'[Intro]\n[Instrumental]\n\n[Verse]\n[Women\'s harmony choir, close dissonant harmonies, wordless]\nAaa… eee… aaa…\n\n[Instrumental break]\n\n[Verse]\n[Harmony choir, ringing]\nEee… aaa…\n\n[Outro]\n[Instrumental]',
    lilt:'[Intro]\n[Instrumental]\n\n[Verse]\n[Ornamented female vocalise, Celtic lilting, wordless]\nAh-ee-oh… ah-ah…\n\n[Instrumental break]\n\n[Verse]\n[Lilting vocalise, longing]\nOh-ee-ah…\n\n[Outro]\n[Instrumental]',
    mouth:'[Intro]\n[Instrumental]\n\n[Verse]\n[Celtic mouth music, quick rhythmic vocables]\nDiddly-dum, diddly-dee, ho-ro, ho-ro\nDum-diddly, ho-ro-ee\n\n[Instrumental break]\n\n[Verse]\n[Mouth music, faster]\nHo-ro, diddly-dum, ho-ro-ee\n\n[Outro]\n[Instrumental]',
    monk:'[Intro]\n[Low drone]\n\n[Verse]\n[Low male unison chant on vowels, echoing]\nOooo… aaa… oooo…\n\n[Instrumental break]\n\n[Verse]\n[Monks\' chant, grave]\nAaa… oooo…\n\n[Outro]\n[Low drone]',
    whisper:'[Intro]\n[Instrumental]\n\n[Verse]\n[Breathy whispers and ghostly sighs, wordless]\nHhhaah… shhh… hhaah…\n\n[Instrumental break]\n\n[Verse]\n[Whispers drifting]\nShhh… hhaah…\n\n[Outro]\n[Instrumental]',
    jotun:'[Intro]\n[Colossal drums]\n\n[Chant]\n[Giant\'s deep growling chant, wordless]\nUhhh… ohhh… UHH!\n\n[Drop]\n[Instrumental]\n\n[Chant]\n[Giant roars]\nOHHH… UHH!\n\n[Drop]\n[Instrumental]',
    duet:'[Intro]\n[Instrumental]\n\n[Verse]\n[Deep male vocalise, wordless]\nOhhh… ohh…\n[High female vocalise answers]\nAaah… aah…\n\n[Instrumental break]\n\n[Verse]\n[Male and female voices together, wordless]\nAaah… ohhh…\n\n[Outro]\n[Instrumental]'});
  // who sings where (the pieces already made keep theirs; these are the ones still to make, and new colours for a remake)
  Object.assign(ZAUD.VOX,{mu_wet_day:'lilt',mu_wet_night:'whisper',mu_high_day:'kulning',mu_high_night:'yoik',mu_ash_day:'throat',mu_castle:'monk',mu_mage:'harmony',
    mu_island:'mouth',mu_fight:'war',mu_boss:'war',mu_boss_realm:'valkyrie',mu_boss_mage:'harmony',mu_muspelheim:'throat',mu_surtharn:'jotun',
    mu_solmyrk:'monk',mu_asgard:'whisper',mu_citadel:'monk',mu_gods_free:'duet',mu_celebration:'mouth',mu_tower:'valkyrie'});
  // ── the battles: full EDM, each its own kind (from Kris's "medievalcore EDM": melodic dubstep and drumstep with folk leads) ──
  ZAUD.EDM89={
    mu_fight:['medieval midcore EDM: a mid-tempo electro groove with a hurdy-gurdy and electric fiddle lead, sidechained synth chords, a quick build and a short punchy drop',115],
    mu_boss:['medieval midcore EDM with an electric violin as the hero: the violin dances runs and slides over mid-tempo melodic bass music — soaring supersaw chords, chopped folk leads, a heavy but controlled halftime drop, war drums under it all',120],
    mu_boss_realm:['epic melodic midcore EDM: emotional build-ups, a soaring soprano over big supersaw chords, then a deep melodic drop with a rolling wobble bass, war horns',122],
    mu_boss_mage:['glitchy mid-tempo electronica: stuttering glitch edits, FM bells and choir stabs, a rolling bass, clever and restless',118],
    mu_surtharn:['heavy mid-tempo bass music: colossal halftime drops, deep growling basses, a giant\'s roar, war drums and fire, relentless but never harsh',120],
    mu_solmyrk:['dark cinematic midcore EDM: darksynth, a pipe organ and a monks\' chant over a steady four-on-the-floor, trailer-sized drops',120],
    mu_escape:['driving cinematic violin EDM: a racing electric violin lead over busy breakbeats and a rolling bass, urgent, no rest',125]};
  // round 89b (Kris: "the medievalcore EDM at 145 BPM for the mu_fight was too much. I toned it down by saying medieval midcore EDM at 115 BPM. Let's
  // recheck prompts so we don't get into hardcore EDM, and keep at or below 125 BPM"): every battle is midcore, no piece above 125 bpm
  ZAUD.BPMMAX=125; ZAUD.EDMEXCL='hardcore EDM, hardstyle, gabber, drum and bass, screeching brostep, harsh distortion';
  // the electric violin as a lead voice (Kris: Warbringer, Lindsey Stirling): aching in the quiet parts, dancing over the drops
  ZAUD.VOXSTYLE.violin='an electric violin carries the melody as the hero of the piece — aching and soaring in the quiet parts, dancing with fast runs, slides and bow-bounce when the beat comes in';
  Object.assign(ZAUD.VOX,{mu_sky:'violin',mu_high_day:'kulning'});      /* the sky: violin EDM over open air */
  ZAUD.MUSIC.forEach(function(c){ var E=ZAUD.EDM89[c[0]]; if(E)c[8]=E[1]; if(c[8]>ZAUD.BPMMAX)c[8]=ZAUD.BPMMAX; }); ZAUD._all=null;
  // ── lead instruments: the electric fiddles and lyres, the Celtic colours ──
  Object.assign(ZAUD.INSTR,{
    mu_wet_day:'uilleann pipes, electric lyre with shimmering delay, Celtic harp, bodhrán, a bubbly synth arpeggio',
    mu_wet_night:'low whistle, electric lyre through a long echo, soft bells, a deep pulsing synth',
    mu_high_day:'electric hardanger fiddle through chorus and delay, goat horn (bukkehorn), big war drums, a soaring analog synth brass',
    mu_high_night:'electric lyre with frosty delay, a cold glassy synth pad, a soft four-on-the-floor pulse',
    mu_ash_day:'electric nyckelharpa through overdrive, hurdy-gurdy, jaw harp, metallic industrial percussion',
    mu_ash_night:'electric cello, slow taiko, a smouldering synth drone',
    mu_tower:'electric lyre arpeggios, celesta, a climbing sequenced synth, light breakbeat',
    mu_castle:'electric fiddle, Swedish bagpipe (säckpipa), marching snare, low brass, a pulsing synth',
    mu_mage:'electric lyre, glass harmonica, FM bells, a pulsing analog synth',
    mu_island:'electric fiddle, tin whistle, accordion, bodhrán, a sea-shanty electronic beat',
    mu_trial:'electric lyre, music box, kalimba, pizzicato strings, playful chiptune arpeggios, a tin whistle',
    mu_sky:'electric violin lead over cinematic EDM, wide strings, an airy synth lead, a light breakbeat',
    mu_fight:'electric fiddle, hurdy-gurdy, taiko, a hard electronic beat',
    mu_boss:'electric fiddle, hurdy-gurdy, war drums, supersaw chords',
    mu_boss_realm:'war horns, full choir, electric fiddle, supersaw chords',
    mu_boss_mage:'electric lyre, frantic harp, FM bells, choir stabs',
    mu_forges:'anvil percussion, electric nyckelharpa through overdrive, low brass',
    mu_muspelheim:'electric cello and electric fiddle in octaves, taiko, low brass drones',
    mu_surtharn:'colossal drums, frantic electric hurdy-gurdy, war horns',
    mu_escape:'racing electric fiddle, breakbeats, a racing synth arpeggio',
    mu_asgard:'harp, electric lyre, distant lur horns, a cathedral organ, a slow-burning synth pulse',
    mu_citadel:'pipe organ, electric cello, ticking percussion, a dark synth pulse',
    mu_solmyrk:'pipe organ, enormous drums, horns, darksynth leads',
    mu_gods_free:'warm strings, harp, electric lyre, a gentle beat',
    mu_bifrost:'soaring strings, electric lyre, shimmering harp, glittering synth arpeggios',
    mu_village_moment:'thunder drums, blooming strings, tin whistle, an electric fiddle, a bright synth swell',
    mu_celebration:'fast electric fiddles, tin whistle, accordion, bodhrán, stamping and clapping',
    mu_credits:'the instruments of the whole game: electric fiddle and lyre, tin whistle, choir, harp, synth arpeggios'});
  // the journeys by day (Kris: Wanderlust by Everen Maxwell): cinematic adventure electronic — orchestral swells and soaring melodies over
  // melodic electronic drops, wide and hopeful, made for travelling
  var ADV='cinematic adventure electronic: orchestral swells, a soaring melody, uplifting melodic drops, wide and hopeful, made for travelling';
  ZAUD.ADV89={mu_grass_day:ADV,mu_high_day:ADV,mu_ash_day:ADV.replace('wide and hopeful','wide and defiant'),mu_sky:ADV,mu_island:ADV,mu_green:ADV,mu_tower:ADV.replace('made for travelling','made for climbing')};
  // ── the words that go to Suno ──
  // the Style box is rebuilt in one compact order (Suno takes about 1000 characters): what it is · the voice · tempo · length · lead
  // instruments · the journey · the bass · the house sound
  var s2=ZAUD.suno; ZAUD.suno=function(c){ var S=s2.apply(ZAUD,arguments), id=c.id, E=ZAUD.EDM89[id], b=ZAUD.BASS89[B[id]], v=ZAUD.VOX[id], L=ZAUD.LONG[id], I=ZAUD.INSTR[id], A=!E&&ZAUD.ADV89[id];
    var soft=!A&&(c.group==='village'||c.group==='last'||/_night$/.test(id)||v==='elf'||(v==='violin'&&!E));
    var P=[E?E[0]:c.words], fl=!E&&!A&&ZAUD.FLAVOR[c.group];      /* the group's feel (the dungeon's deeper bass from Kris's remix) when there is room */
    if(v&&ZAUD.VOXSTYLE[v])P.push(ZAUD.VOXSTYLE[v]);
    if(c.bpm)P.push('about '+c.bpm+' bpm');
    if(L>=480)P.push('a ~10-minute long-form piece, variations that return to the theme, no ending, no fade-out');
    else if(c.loop)P.push((L?'about '+Math.round(L/60)+' minutes, ':'')+'steady so it can loop, no fade-out');
    if(I)P.push('lead instruments: '+I);
    if(A)P.push(A);
    if(b)P.push('bass: '+b);
    var tail=E?'epic fantasy RPG boss battle, medieval midcore EDM: folk instruments over mid-tempo electronic drops, punchy and cinematic, never harsh':ZAUD.CELT89[id]?ZAUD.STYLE_CELT:soft?ZAUD.STYLE_SOFT:ZAUD.STYLE;
    if(fl){ var P2=P.slice(); P2.splice(1,0,fl); if(P2.join('; ').length+tail.length<960)P=P2; }
    S.style=P.join('; ')+'. '+tail;
    if(E)S.exclude=S.exclude.replace('EDM drop, dubstep, ','').replace(', EDM drop, dubstep','')+', '+ZAUD.EDMEXCL;
    var voiced=v&&v!=='violin'; S.instrumental=!voiced; if(voiced){ S.lyrics=ZAUD.VOXLYRICS[v]||''; S.exclude=S.exclude.replace('lyrics, words, ','clear words, ').replace(/, vocals$/,''); }
    else { S.lyrics=''; if(!/vocals$/.test(S.exclude))S.exclude+=', vocals'; }
    S.edm=!!E; S.celt=!!ZAUD.CELT89[id]; S.bass=B[id]||''; return S; };
})();
