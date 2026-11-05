# 44 — More variety in the music (round 89)

Kris asked for:
- more electronic influences, with electric fiddles and electric lyres instead of only the acoustic lyre and fiddle;
- a more punchy bass, described the way Victor Wooten and Béla Fleck and the Flecktones play;
- more kinds of wordless voices, grand and epic;
- Celtic electronic beside the Norse;
- full EDM for the boss fights.

His references, from his Spotify playlist "medievalcore EDM": Immortal Flame (Panda Eyes, Teminite, Anna Yvette), Warbringer (TheFatRat, Everen Maxwell, Lindsey Stirling), Lindsey Stirling's recent work, and Wanderlust (Everen Maxwell).

Suno refuses artist names, so the prompts describe the sound instead (`src/js/07zau4-music89.js`):

| Ask | In the prompt |
|---|---|
| Electric folk | The house style is Nordic folktronica: electric fiddles and electric lyres beside the folk instruments. Lead instruments now include the electric hardanger fiddle (chorus and delay), an electric lyre (shimmering delay), an electric nyckelharpa (overdrive), an electric cello and an electric hurdy-gurdy. |
| The bass (Wooten / Flecktones) | One technique per piece (`ZAUD.BASS89`): slap and pop with double-thumbed triplet runs; open-hand tapping; natural and artificial harmonics; envelope-filter (auto-wah) funk; chordal strums and a melodic bass solo break; a singing fretless; a jazz-fusion groove in 7/8 and 5/4; slap locked to the kick with fuzz bass under the drops. |
| Voices | Twelve wordless kinds (`ZAUD.VOXNAME`), each with its own Lyrics box of meta tags and vocables: kulning (high herding calls), a northern chanting call, overtone throat singing, a war band's chant, a valkyrie soprano, a women's harmony choir, Celtic lilting, Celtic mouth music, a low monks' chant, whispers, a giant's growl, and a man and a woman in call and answer. The elven voice, the dwarven voices and the violin stay. |
| Celtic electronic | `ZAUD.STYLE_CELT` (uilleann pipes, tin whistle, Celtic harp and bodhrán over electronic beats) for the village day, the shops, the green, the Wetlands, the islands, the fairy trials and the celebration. |
| The violin as the hero (Warbringer, Lindsey Stirling) | The violin voice is now an electric violin: aching in the quiet parts, dancing with fast runs, slides and bow-bounce when the beat comes in. It leads the Guardian boss, the escape and the skyports. |
| The journeys (Wanderlust) | Cinematic adventure electronic for the realms by day, the skyports, the islands, the towers and the green: orchestral swells, a soaring melody and uplifting melodic drops. |
| Boss fights in full EDM (Immortal Flame) | Each battle is its own kind (`ZAUD.EDM89`), and "EDM drop, dubstep" is no longer excluded for them: electro-house (skirmish, 145 bpm), melodic dubstep with an electric violin hero (Guardian), epic melodic dubstep and drumstep with the valkyrie soprano (realm bosses), glitchy neurofunk drum and bass (mage duels, 174), heavy dubstep and drumstep with the giant's growl (Surtharn), dark cinematic EDM with organ and hardstyle kicks (Solmyrk), and violin drum and bass (the escape, 174). |

- The Style box is rebuilt in one compact order: what it is · the voice · tempo · length · lead instruments · the journey · the bass · the house sound. Every piece fits Suno's 1000-character limit; the longest is about 920.
- The 13 pieces already made keep their sound. Their cards show the new words in case Kris remakes one.
- The Lab's Music & sound tab shows the new palette above "Still to make", and badges on the cards: the voice, ⚡ full EDM, ☘ Celtic electronic.
- "Waiting for your picks" retired the sound picks, the dialogue box and the boss shapes.
- Tests: `test_round72h` (the voices are counted by kind) and `test_round72` (stale counts).
