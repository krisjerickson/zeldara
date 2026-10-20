# 32 — Music and sound: the proposal (round 72)

Kris (round 72, N1): "music and ambiance are going to be new files requests with Suno. we might need to do API requests like we did for painted images. Prepare a proposal for this, including all of the music you think we need throughout the game as well as what sounds effects, and how to pull this off".

The list lives in `src/js/07zau-audio-cues.js` (ZAUD). The game and the Lab both read it, and this doc's tables are written from it. **Lab → Music & sound** shows every music cue on its own card, each with a Copy button for Suno, plus the ambience and effects sheet and the plan card.

## 1. In short

- **175 sounds in all:**
  - 43 music cues (about 88 minutes);
  - 9 stingers (short musical moments);
  - 16 ambience loops;
  - 107 sound effects.
  - 99 of them are in the **first wave**.
- **Music in Suno, by hand.** Suno still has **no official API**.
  - The unofficial "Suno APIs" work by logging in with your browser cookie and paying a CAPTCHA solver. That breaks Suno's terms, which ban "robots, scraping".
  - Suno's terms also say a song not downloaded "through an approved channel" can't be used commercially. **We don't use them.**
  - Instead, the Lab is the request sheet. Copy a cue's words into Suno (Instrumental on), pick the better of the two takes, download it, and name it after the cue.
- **Ambience and effects by script, the way the painted pictures are made.**
  - A PowerShell script asks for the key in its window and sends each request to the **ElevenLabs Sound Effects API**. That API is official and runs on an API key, it can make seamless loops, and output from paid plans is licensed for commercial use.
  - Files land in `audio\incoming\`.
- **One intake on your PC** handles every file:
  - trims it and sets the loop points;
  - evens out the loudness;
  - writes small Ogg files with MP3 fall-backs, plus an index for the game.
- **In the game:**
  - A small music director picks the music by place, day or night, fights and bosses, and the story moments, and crossfades between cues.
  - Ambience runs under the music, and effects play on top.
  - Today's procedural sounds stay as the fall-back for anything not yet made.
- **Rough cost** (prices to confirm on the day; see §6):
  - Suno: a **Premier** month covers all the first-wave music (Premier allows 60 downloads a month, Pro 20).
  - ElevenLabs: one **Creator** month (about $22, 121k credits) covers every ambience loop and effect, two takes each.

## 2. Where things stand (research, October 2026)

- **Suno API:**
  - No public API.
  - On 1 July 2026 Suno said it is *exploring* one for a curated group of partners. There are no docs and no date (Music Business Worldwide, 2 July 2026; Digital Music News, 3 July 2026).
  - Nothing since says it has launched.
- **Suno in the app:**
  - Models v6, v6‑wild and v6‑mini (September 2026). Songs up to 8 minutes.
  - An Instrumental switch, Extend, and stems (split tracks).
  - MP3 on every plan; WAV on Pro and Premier.
  - **Suno Sounds** is a beta for short effects, one-shot or loop, in the app only.
- **Suno terms** (effective 3 September 2026):
  - On **Pro and Premier** you own what you make and may use it commercially. On Free, personal non-commercial use only.
  - **Download caps:** Pro 20 a month, Premier 60 a month, Premier with Suno Studio unlimited.
  - No credit to Suno is needed.
- **ElevenLabs Sound Effects:**
  - `POST https://api.elevenlabs.io/v1/sound-generation` with an `xi-api-key` header.
  - Fields:
    - `text`;
    - `duration_seconds` (0.5–30);
    - `loop` (seamless loops);
    - `prompt_influence` (0–1);
    - `model_id` (`eleven_text_to_sound_v2`).
  - **Cost:** 40 credits per second.
  - **Commercial use:** on paid plans. Free requires credit and allows no commercial use.
- **ElevenLabs Music** (an official alternative to Suno):
  - `POST /v1/music` with `prompt`, `music_length_ms` (3,000–600,000) and `force_instrumental`. API access is on Starter and up.
  - Its terms for games conflict:
    - The 9 October 2026 page allows "indie games" (under $500k lifetime revenue).
    - An older page allows games only from Pro.
  - **Check the terms before relying on it.**
- **Stable Audio 3.0** (Stability):
  - About $0.08 a generation, tracks up to 6 minutes, and a small model for effects.
  - It's unclear whether its licence covers output made through the API.
- **Game-audio practice** used below:
  - Loop a clean 8- or 16-bar phrase and test it 6–10 times over.
  - Keep the WAV master.
  - Ogg for the web with an MP3 fall-back (MP3 adds gaps at loop points, so use constant bitrate if MP3 must loop).
  - Even loudness: about −16 LUFS for web and mobile music, peaks under −1 dBTP.

## 3. How to pull it off

### 3.1 Music — Suno, by hand (the Lab is the request sheet)

1. Open **Lab → Music & sound**. Each cue card says where the music plays, how long it is, and whether it loops or plays once. Its box holds the words for Suno.
   - The words are the cue's own description followed by the house style: *instrumental, Nordic folk fantasy game score, nyckelharpa, hardanger fiddle, tagelharpa, wooden flute, lyre, frame drum, low wordless choir …*
   - **Copy for Suno** puts them on the clipboard.
2. In Suno, use **Create → Custom**:
   - paste the words into *Style of music*;
   - switch **Instrumental** on;
   - title it with the cue's id (for example `mu_village_day`);
   - Create.
   Suno makes two takes. Keep the better one, or make it again.
3. **Make the main theme first** (`mu_title`). Then build on it so the whole score shares the twins' four-note motif:
   - Use **Cover** with the main theme for the variations (the village, Runeheim green again, the credits), if your plan has Cover.
   - Use **Extend** to lengthen a take that ends too soon.
4. **Download** WAV if your plan allows it (Pro and Premier), otherwise MP3.
   - Save it as `C:\Claude\games\Zeldara-v4\audio\incoming\<cue id>.wav` (or `.mp3`).
   - For the bosses, `mu_boss_realm` and `mu_solmyrk`, also download the **stems** into `audio\incoming\<cue id>\`, so later phases can add drums and choir.
5. Run the intake (§3.4). Then tell me the wave is in, and I'll wire it into the game and the Lab.

**Stingers** (3–6 seconds) are hard to get from Suno at that length. There are two ways:
- Make each one as its own short piece and the intake cuts the best few seconds.
- Or send the stingers to the effects model with the script (the words are written for either).

### 3.2 Ambience and effects — by script, like the painted pictures

- `tools\audio\audioNN.ps1` (to be written once you choose; the same shape as `round76.ps1`):
  - asks for the ElevenLabs key **in the window**, never written to disk;
  - shows what it will send (a dry run);
  - then sends.
- `tools/audio/sfx.mjs` (to be written; the same shape as `generate.mjs`):
  - reads the list from the build: `sprites/requests/audio.json`, written by `build.mjs` from ZAUD;
  - for each ambience loop or effect, posts the words with the length, `loop: true` for ambience and the riding loops, and `prompt_influence` 0.5;
  - saves the result as `audio\incoming\<id>.mp3`;
  - with `--takes 2`, keeps a second take as `<id>.b.mp3` so the better one can be picked in the Lab;
  - skips any file that already exists, so it is safe to stop and run again (nothing is paid for twice).
- Effects shorter than half a second are asked for at 0.5 s, the API's minimum, and trimmed by the intake.
- **Credits** (40 a second):
  - the first wave of ambience and effects ≈ 27k credits for two takes each;
  - everything ≈ 48k.
  - A Creator month (121k credits) leaves room to redo any that miss.

### 3.3 If you'd rather script the music too

ElevenLabs Music (`/v1/music`, instrumental, length in milliseconds) can be sent by the same script. Every cue's words work as they are.

- **Against it:**
  - its game terms conflict (§2);
  - the music would sound less like one score than a Suno set built from one main theme.
- **For it:** no download caps, and nothing to do by hand.

This is question **M2**.

### 3.4 The intake on your PC

`tools/audio/intake_audio.py`, using ffmpeg (to be written):

1. **Trim.** Cut the silence at both ends.
2. **Loop.** For music that loops, find the loop points:
   - with the cue's tempo, take the longest whole 8- or 16-bar stretch after the opening;
   - or keep the whole track and join its end to its start with a 30 ms crossfade.
   - Write `loopStart` and `loopEnd` to the index. A note in the Lab can move them.
3. **Even loudness** (ffmpeg `loudnorm`, two passes):
   - music −16 LUFS;
   - stingers −14;
   - ambience −24;
   - effects peaks −1 dBTP, matched by group.
4. **Encode:**
   - music: Ogg Vorbis, stereo, about 96 kbps;
   - ambience: Ogg, mono, about 64 kbps;
   - effects: Ogg, mono, 32 kHz.
   - Each also gets an MP3 at constant bitrate for older Safari.
   - Keep the WAV masters in `audio\masters\`. They're kept out of the repo; they are your originals.
5. **Pack the effects** into a few sound sheets by group (one file and an index of start/length each), so the game makes a handful of requests, not a hundred.
6. **Write** `assets/audio/index.json` (id → files, length, loop points, gain), and short previews for the Lab's players.

### 3.5 In the game

- **One sound engine**, extending today's `04c-audio.js` (ZSFX), on Web Audio:
  - four buses (music, ambience, effects, menus) under a master;
  - **volume sliders** in Settings for each, with today's 🔊 button still muting all.
- **The music director** checks once a second what should be playing:
  - the scene (world, a site, a building, the feast hall, a cut-scene);
  - in the world: the realm under your feet, day or night, inside the village;
  - fights: monsters engaged near you;
  - boss and phase;
  - the special runs: the escape, Asgard, the citadel.
  - When the cue changes it **crossfades** over 2 s. A fight fades in fast (0.6 s) and fades out 4 s after the last blow.
  - The realm bosses and Solmyrk add their stem layers phase by phase.
  - A cue you leave and come back to soon resumes where it was.
- **Stingers duck the music** for a moment. The saga panels and cut-scenes play their own cue and bring the place's music back after.
- **Ambience** follows the place and the weather, under the music. Short spot sounds play near their source (a lava burst by a forge, the anvil in the smith's).
- **Effects** replace today's procedural sounds name by name: `hit`, `swing`, `roar`, `boom`, `stomp`, `warp`, `hurt`, the fanfare, the pickup. New ones are hooked where the game already knows the moment (attacks, spells by element, pickups, doors, waystones, menus).
  - Each effect varies its pitch by ±5% and alternates its two takes, so repeats don't grate.
  - **Anything not yet made falls back to today's procedural sound**, so the game never goes silent mid-way.
- **Phones and loading:**
  - Nothing loads before the title page. The title theme streams.
  - Music always **streams** from an `<audio>` element into Web Audio. A two-minute piece decoded into memory would take about 40 MB, too much for a phone. To loop it seamlessly, a second element starts at the loop point with a 30 ms crossfade.
  - Ambience and effects are decoded (they are small).
  - The effect sheets load after the first click or touch, which browsers require before any sound plays.
  - The sound pauses when the tab is hidden and resumes on return. On iPhone the first touch unlocks the sound.
- **Sizes:**
  - all the music ≈ 62 MB as Ogg (≈ 82 MB more as MP3 fall-backs) on the server, but a player only downloads what they hear: about 1–2 MB per place, as they reach it;
  - ambience ≈ 4 MB;
  - effects ≈ 1 MB.
- **Where it's served:**
  - Vercel serves `assets/audio/` like the paintings.
  - The claude.ai artifact copy of the game can carry the first wave at a lower bitrate. Each file there must stay under 15 MB, and a version under 256 MB in all.

## 4. Waves

| Wave | Music | Stingers | Ambience | Effects | Made with |
|---|---|---|---|---|---|
| First | 22 | 6 | 9 | 62 | Suno by hand (music) · script (ambience, effects) |
| Second | 19 | 3 | 6 | 38 | Suno by hand (music) · script (ambience, effects) |
| Third (nice to have) | 2 | 0 | 1 | 7 | Suno by hand (music) · script (ambience, effects) |

The first wave covers the whole path through the game once:
- the title and the opening;
- the village by day and night;
- each realm by day;
- caverns, fights and bosses;
- the forges, Surtharn and the escape;
- Asgard and Solmyrk;
- the feast hall to the credits.

The second wave adds the nights, the other site kinds and the quieter places. The third wave is nice to have.

## 5. What already exists

`src/js/04c-audio.js` (round 7) makes every sound with code:
- the boss music (drone, drums and an ostinato, faster each phase);
- hits, swings, roars, booms, stomps and the warp;
- the camp fanfare.

It adds nothing to the download and stays as the fall-back.

## 6. Questions for Kris

- **M1 — The Suno plan for the music?**
  - Premier for one month: 60 downloads, enough for the whole first wave plus redos.
  - Or Pro across two to three months: 20 downloads a month.
  - Check the prices on suno.com on the day; we couldn't confirm them.
- **M2 — How to make the ambience and effects?**
  - ElevenLabs Sound Effects by script (recommended; about $22 for a month).
  - Or Suno Sounds by hand in the app.
  - Or script the music as well with ElevenLabs Music (§3.3).
- **M3 — The sound of the score?**
  - Nordic folk: nyckelharpa, hardanger fiddle, frame drums, wordless choir (the house style above).
  - Or a bigger cinematic orchestra with Nordic colour.
  - Or something else.
- **M4 — How much first?**
  - The first wave (99 sounds).
  - Or everything at once.

## 7. The full list

### Title & story (4)

| id | Name | Where it plays | Length | Wave | Words for Suno (the house style is added) |
|---|---|---|---|---|---|
| `mu_title` | The Quests of Zeldara and Zeldor — main theme | the title page and the save slots | 2:30 ⟲ · 72 bpm | 1st | main theme; a slow noble melody on hardanger fiddle over a droning nyckelharpa and a low choir hum, a four-note rising motif (the twins) that returns, builds to one hopeful full statement with frame drums, then settles so it can loop |
| `mu_saga_storm` | The storm and the foundlings | the opening saga panels: the storm on Mirror Lake, two babies found in the reeds | 1:40 · 60 bpm | 1st | storm at night giving way to a fragile lullaby; thunder-like drums at first, then a solo lyre and a soft wordless female voice; the twins' four-note motif at the end |
| `mu_saga_old` | The old sorrows | the saga panels of the old disasters (the Ash Night, the Stone-Fall, the Black Tide, the Long Quiet) | 2:00 · 56 bpm | 2nd | somber legend; slow tagelharpa and low male choir, distant horn, a heavy grief; like an old tale told by a fire |
| `mu_glimpse` | A glimpse of the past | the saga glimpses after freed spirits (the gate, the two orbs, the tattoo) | 45 s · 64 bpm | 2nd | mysterious memory; shimmering bowed strings and a music-box lyre, a hint of the twins' motif, unresolved |

### The village & home (6)

| id | Name | Where it plays | Length | Wave | Words for Suno (the house style is added) |
|---|---|---|---|---|---|
| `mu_village_day` | Mirror Lake village — day | the village and the Green, by day | 2:00 ⟲ · 96 bpm | 1st | cheerful lakeside village; plucked lute and wooden flute, light hand drum, a gentle fiddle dance; homely and safe |
| `mu_village_night` | Mirror Lake village — night | the village at night | 2:00 ⟲ · 70 bpm | 1st | quiet village night; solo lyre and soft flute, sparse, a lullaby, room for crickets |
| `mu_home` | The hearth | your home, with the other twin; sleeping | 1:30 ⟲ · 66 bpm | 2nd | cozy hearth; gentle lyre and humming, warm, slow, like a family song |
| `mu_shops` | Shops and workshops | the smith, the jeweller, the apothecary, Mira's workshop, the hamlet workshops | 1:30 ⟲ · 100 bpm | 2nd | busy friendly craft music; lute and fiddle, wooden percussion like tools tapping, bright |
| `mu_glimmerhall` | Glimmerhall | Glimmerhall, with Sólveig | 1:30 ⟲ · 72 bpm | 3rd | magical shimmering hall; bowed glass-like strings, harp, soft choir, wonder |
| `mu_green` | Runeheim green again | the village and the hamlets after the end (free roam) | 2:30 ⟲ · 92 bpm | 2nd | the main theme as a joyful pastoral: flute and fiddle, children-song lightness, sunlight; the four-note motif |

### The four realms (8)

| id | Name | Where it plays | Length | Wave | Words for Suno (the house style is added) |
|---|---|---|---|---|---|
| `mu_grass_day` | The Grasslands — day | the Grasslands (north-east), by day | 2:30 ⟲ · 100 bpm | 1st | rolling meadows and open sky; wandering fiddle melody over plucked strings and light frame drum, adventurous and bright |
| `mu_grass_night` | The Grasslands — night | the Grasslands at night | 2:00 ⟲ · 70 bpm | 2nd | calm open night; soft flute, slow lyre, distant drone, stars |
| `mu_wet_day` | The Wetlands — day | the Wetlands, by day | 2:30 ⟲ · 84 bpm | 1st | misty marsh; reed pipes and watery harp, slow nyckelharpa, a little eerie but beautiful |
| `mu_wet_night` | The Wetlands — night | the Wetlands at night | 2:00 ⟲ · 64 bpm | 2nd | will-o'-the-wisp night; airy flute, deep drone, soft bells, mysterious |
| `mu_high_day` | The Highlands — day | the Highlands, by day | 2:30 ⟲ · 90 bpm | 1st | mountain wind and cliffs; big horn calls, wordless high herding call, strong drums, majestic |
| `mu_high_night` | The Highlands — night | the Highlands at night | 2:00 ⟲ · 60 bpm | 2nd | cold mountain night; lonely fiddle, wind-like choir, slow |
| `mu_ash_day` | The Ashlands — day | the Ashlands, by day | 2:30 ⟲ · 88 bpm | 1st | smouldering wasteland; low drones, metallic hand percussion, tagelharpa, tense and dry |
| `mu_ash_night` | The Ashlands — night | the Ashlands at night | 2:00 ⟲ · 58 bpm | 2nd | embers at night; deep drone, slow heartbeat drum, dark choir murmur |

### Adventure sites (7)

| id | Name | Where it plays | Length | Wave | Words for Suno (the house style is added) |
|---|---|---|---|---|---|
| `mu_dungeon` | Caverns below | the dungeons and caves (floors going down) | 2:30 ⟲ · 70 bpm | 1st | dark cavern exploration; dripping plucks, low drone, slow bowed strings, cautious tension, no melody that tires |
| `mu_tower` | Towers above | the towers (floors going up), the master builders' towers | 2:00 ⟲ · 84 bpm | 2nd | climbing a strange tower; airy strings and harp arpeggios, curious, rising |
| `mu_castle` | Castle halls | the island castles | 2:00 ⟲ · 92 bpm | 2nd | stern old castle; horns, marching frame drum, low strings, proud and cold |
| `mu_mage` | The mage towers | the sixteen mage towers | 2:00 ⟲ · 76 bpm | 2nd | arcane study; bell-like tones, harp, whispering choir, magical and uneasy |
| `mu_island` | Harbor islands | the harbor islands and their dungeons' shores | 2:00 ⟲ · 104 bpm | 2nd | sea-going adventure; shanty-like fiddle and drum, waves of strings, brave |
| `mu_trial` | The fairy trials | the trial realm of the fairies | 1:30 ⟲ · 116 bpm | 2nd | playful otherworldly game; music-box lyre, pizzicato, light bells, a little mischievous |
| `mu_sky` | Skyports and floating islands | the skyports and the floating islands | 2:00 ⟲ · 96 bpm | 3rd | soaring high above; wide strings, flute, light drums, freedom |

### Fights (4)

| id | Name | Where it plays | Length | Wave | Words for Suno (the house style is added) |
|---|---|---|---|---|---|
| `mu_fight` | Skirmish | fighting a pack or a camp's guards in the open | 1:00 ⟲ · 140 bpm | 1st | fast skirmish; driving frame drums and fiddle ostinato, urgent, short loop |
| `mu_boss` | Guardian | the bosses of the adventure sites | 2:00 ⟲ · 132 bpm | 1st | boss fight; pounding drums, aggressive fiddles, low choir shouts without words, heavy and relentless |
| `mu_boss_realm` | The bane of the realm | the four realms' great multi-phase bosses | 2:30 ⟲ · 128 bpm | 1st | epic boss fight in rising stages; huge war drums, full choir, horns, a menacing riff; download the stems too so later phases can add layers |
| `mu_boss_mage` | The master's duel | the mage towers' masters | 2:00 ⟲ · 136 bpm | 2nd | magical duel; frantic harp and strings, bells, choir stabs, clever and dangerous |

### The forges, Muspelheim & Asgard (8)

| id | Name | Where it plays | Length | Wave | Words for Suno (the house style is added) |
|---|---|---|---|---|---|
| `mu_forges` | The forges | the four forges and their challenges | 2:00 ⟲ · 110 bpm | 1st | molten forge; anvil hits as percussion, deep bellows-like drones, heavy and hot, determined |
| `mu_muspelheim` | Muspelheim | inside Muspelheim | 2:30 ⟲ · 100 bpm | 2nd | the fire realm; overwhelming low brass-like drones, war drums, roaring choir, hellish heat |
| `mu_surtharn` | Surtharn | the fight with Surtharn | 2:30 ⟲ · 138 bpm | 1st | fire giant boss; colossal drums, roaring low choir, frantic fiddles, apocalyptic |
| `mu_escape` | Escape! | the escape run out of Muspelheim, and the sinking causeway | 1:30 ⟲ · 164 bpm | 1st | frantic escape against the clock; very fast drums and fiddle runs, rising, no rest |
| `mu_asgard_down` | Asgard comes down | the descent: a ring of light, the golden city settles into the lake | 1:00 · 60 bpm | 2nd | awe; slow choir swelling, bright bells, a vast golden chord, then silence |
| `mu_asgard` | The golden city | walking Asgard's empty streets | 2:30 ⟲ · 76 bpm | 1st | majestic but hollow golden city; slow choir, harp, distant horns, something missing, eerie beauty |
| `mu_citadel` | The citadel | the citadel's four floors | 2:00 ⟲ · 96 bpm | 2nd | rising dread; low strings, ticking percussion, choir whispers, climbing to the throne |
| `mu_solmyrk` | Solmyrk, the Black Sun | the final fight with Solmyrk (three phases) | 3:00 ⟲ · 126 bpm | 1st | final boss; enormous drums, dark full choir, a false-god anthem twisted, horns; stems so the last phase can add choir and drums |

### The last saga (6)

| id | Name | Where it plays | Length | Wave | Words for Suno (the house style is added) |
|---|---|---|---|---|---|
| `mu_feast_hall` | The feast hall | the feast hall after Solmyrk: the two joined orbs | 2:00 ⟲ · 60 bpm | 1st | held breath; the orbs' hum, slow celestial strings, two soft wordless voices (a man and a woman) far away |
| `mu_gods_free` | Odin and Freya | the orbs burst; the gods stand free and tell the truth | 1:40 · 66 bpm | 1st | revelation and tenderness; full warm strings and choir, the twins' four-note motif at last complete |
| `mu_bifrost` | The Bifröst | the gods lead the spirits up the new Bifröst | 2:00 · 72 bpm | 1st | ascension; soaring choir and strings, shimmering harp, a rainbow of sound, farewell |
| `mu_village_moment` | Lightning and vines | back at the village: Odin's blue lightning, Freya's green vines, the land turning green | 1:30 · 84 bpm | 2nd | rebirth; thunder drums giving way to blooming strings and flutes, joy rising |
| `mu_celebration` | The celebration | the feast for the twins, time passing, children born again | 2:00 ⟲ · 128 bpm | 1st | joyous village feast dance; fast fiddles, stamping, clapping, flutes, everyone dancing |
| `mu_credits` | Credits | the credits | 4:00 · 84 bpm | 1st | a credits suite: the main theme, then the village, the four realms and the celebration, ending in the twins' motif, about four minutes |

### Stingers (short musical moments) (9)

| id | Name | Where it plays | Length | Wave | Words for Suno (the house style is added) |
|---|---|---|---|---|---|
| `st_spirit` | A spirit is freed | a spirit freed from its bindstone | 6 s | 1st | short uplifting sting, choir swell and bright chime, 6 seconds |
| `st_rune` | A soul-line lights | a runestone lights and its line is traced | 4 s | 1st | short rising shimmer sting with a soft drum, 4 seconds |
| `st_quest` | Quest done | a quest is finished | 4 s | 1st | short triumphant folk fanfare on fiddle and drum, 4 seconds |
| `st_level` | Level up | you go up a level | 3 s | 1st | short bright rising arpeggio, 3 seconds |
| `st_boss_down` | Boss defeated | a boss falls | 6 s | 1st | short victorious horn and choir sting, 6 seconds |
| `st_death` | You fall | the hero falls | 5 s | 1st | short sorrowful low strings sting, 5 seconds |
| `st_discover` | A new place | you find a new place or site | 4 s | 2nd | short curious flute and harp sting, 4 seconds |
| `st_treasure` | Treasure | a rare item or a chest | 3 s | 2nd | short sparkling sting with a plucked chord, 3 seconds |
| `st_glimpse` | A glimpse opens | a saga glimpse begins | 4 s | 2nd | short mysterious swell, 4 seconds |

### Ambience (loops under the music) (16)

| id | Name | Where it plays | Length | Wave | Words sent |
|---|---|---|---|---|---|
| `am_meadow_day` | Meadow by day | Grasslands days; the village edge | 30 s ⟲ | 1st | birdsong, light breeze in long grass, distant insects |
| `am_meadow_night` | Meadow at night | Grasslands and the village at night | 30 s ⟲ | 1st | crickets, a far owl now and then, soft wind |
| `am_marsh` | Marsh | the Wetlands | 30 s ⟲ | 1st | frogs, reeds rustling, water lapping, a heron far off |
| `am_highwind` | Mountain wind | the Highlands | 30 s ⟲ | 1st | strong gusting wind over rocks, a hawk far off |
| `am_ash` | Ashlands | the Ashlands | 30 s ⟲ | 1st | low rumbling earth, crackling embers, dry hot wind |
| `am_lake` | Lake shore | Mirror Lake, the pier, the harbors | 30 s ⟲ | 1st | gentle waves on a shore, wooden boats creaking, gulls far off |
| `am_village` | Village life | the village by day | 30 s ⟲ | 2nd | distant chatter without words, a hammer on an anvil far off, chickens, a cart |
| `am_rain` | Rain | rain anywhere outdoors | 30 s ⟲ | 2nd | steady rain on grass and leaves |
| `am_cave` | Cave | the dungeons and caves | 30 s ⟲ | 1st | water dripping in a cave, low hollow air, faint distant rumble |
| `am_tower` | Tower | the towers and mage towers | 30 s ⟲ | 2nd | wind whistling through stone windows, creaking wood, faint magic hum |
| `am_castle` | Castle hall | the castles | 30 s ⟲ | 2nd | large stone hall air, distant torches crackling, chains clinking faintly |
| `am_forge` | Forge | the forges and Muspelheim | 30 s ⟲ | 1st | roaring furnace, bubbling lava, bellows breathing |
| `am_asgard` | Asgard | the golden city and the citadel | 30 s ⟲ | 2nd | high clean wind, soft wind chimes, a distant choir-like hum |
| `am_sky` | Sky | the skyports and floating islands | 30 s ⟲ | 3rd | high altitude wind, flapping banners |
| `am_sea` | Open sea | the coasts and the islands | 30 s ⟲ | 2nd | ocean waves on rocks, wind, gulls |
| `am_orbs` | The joined orbs | the feast hall | 20 s ⟲ | 1st | a deep resonant magical hum, slowly pulsing, faint whispers of light |

### Hero (20)

| id | Name | Where it plays | Length | Wave | Words sent |
|---|---|---|---|---|---|
| `sfx_step_grass` | Footsteps on grass | walking (each step, pitch varies) | 0.5 s | 2nd | a single soft footstep on grass |
| `sfx_step_stone` | Footsteps on stone | floors, roads, Asgard | 0.5 s | 2nd | a single boot footstep on stone |
| `sfx_step_wood` | Footsteps on wood | piers, bridges, houses | 0.5 s | 2nd | a single boot footstep on wooden planks |
| `sfx_step_water` | Splashing step | shallow water | 0.5 s | 3rd | a single footstep splash in shallow water |
| `sfx_sword_swing` | Sword swing | attack (Space) | 0.5 s | 1st | a quick sword whoosh |
| `sfx_sword_hit` | Sword hit | a sword blow lands | 0.5 s | 1st | a sword striking a creature, meaty slash |
| `sfx_axe_swing` | Axe swing | the heavy axe swing | 0.7 s | 1st | a heavy axe whoosh, slower and deeper |
| `sfx_axe_hit` | Axe hit | an axe blow lands | 0.6 s | 1st | a heavy axe chop impact |
| `sfx_bow_draw` | Bow draw | drawing the bow | 0.6 s | 2nd | a wooden bow string being drawn |
| `sfx_bow_shot` | Bow shot | loosing an arrow | 0.6 s | 1st | an arrow released from a bow, twang and whoosh |
| `sfx_crossbow` | Crossbow | a crossbow shot | 0.6 s | 2nd | a crossbow firing, mechanical click and thunk |
| `sfx_arrow_hit` | Arrow hit | an arrow lands | 0.4 s | 1st | an arrow thudding into a target |
| `sfx_block` | Shield block | blocking with the shield | 0.5 s | 1st | a blow hitting a wooden shield with metal rim |
| `sfx_roll` | Roll | rolling (Alt) | 0.6 s | 1st | a quick body roll on the ground, cloth and dust |
| `sfx_hurt` | Hurt | the hero is hit | 0.4 s | 1st | a short grunt-free impact on leather armor with a thump |
| `sfx_fall` | The hero falls | the hero is knocked down | 1 s | 1st | a body collapsing to the ground with armor rattle |
| `sfx_drink` | Drink a potion | potions and tonics | 1 s | 1st | uncorking a small glass bottle and drinking |
| `sfx_eat` | Eat | food | 0.6 s | 2nd | a crunchy bite of bread or apple |
| `sfx_dig` | Dig | digging | 0.8 s | 2nd | a spade digging into soil |
| `sfx_chop` | Chop | chopping trees | 0.6 s | 2nd | an axe chopping into a tree trunk |

### Spells & skills (12)

| id | Name | Where it plays | Length | Wave | Words sent |
|---|---|---|---|---|---|
| `sfx_fire` | Fire spell | fire spells, fire skills | 1 s | 1st | a fireball whooshing and bursting |
| `sfx_frost` | Frost spell | frost and ice | 1 s | 1st | an ice shard spell crystallising and shattering |
| `sfx_lightning` | Lightning | lightning spells | 1 s | 1st | a crackling lightning bolt strike |
| `sfx_earth` | Earth | earth spells, quakes | 1 s | 1st | a rumbling rock eruption from the ground |
| `sfx_nature` | Nature | nature and vines | 1 s | 1st | vines and roots bursting from the ground, leaves rustling |
| `sfx_water` | Water | water spells | 1 s | 1st | a surging water wave splash |
| `sfx_light` | Light | light, healing, sovereign | 1 s | 1st | a warm magical chime with a soft glow swell |
| `sfx_dark` | Shadow | shadow and curses | 1 s | 2nd | a dark whispering magical pulse |
| `sfx_godsbane` | Godsbane | the Lodestar's beam | 2 s | 1st | a massive holy beam of white-gold light firing, choir-like shimmer and a deep boom |
| `sfx_mana` | Mana restored | mana restored | 0.8 s | 2nd | a cool magical sparkle rising |
| `sfx_nomana` | Can't cast | not enough mana, cooldown | 0.5 s | 1st | a soft dull magical fizzle |
| `sfx_skill` | Skill | a skill (Z) | 0.8 s | 2nd | a quick powerful whoosh with a magical edge |

### Monsters (15)

| id | Name | Where it plays | Length | Wave | Words sent |
|---|---|---|---|---|---|
| `sfx_beast_growl` | Beast growl | wolves, boars, bears — alert | 1 s | 1st | an animal growl, wolf-like |
| `sfx_beast_bite` | Bite | beasts attacking | 0.4 s | 1st | a snapping animal bite |
| `sfx_slime` | Slime | slimes and blobs | 0.5 s | 1st | a wet squelch |
| `sfx_insect` | Insect | spiders, beetles, wasps | 0.8 s | 1st | insect chittering and clicking |
| `sfx_undead` | Undead | skeletons, wraiths | 1 s | 1st | bones rattling and a hollow moan |
| `sfx_spirit_mon` | Spirit | spirits and ghosts | 1 s | 2nd | an eerie ghostly wail, airy |
| `sfx_golem` | Golem | stone and metal creatures | 1 s | 2nd | grinding stone and heavy rocky footsteps |
| `sfx_bird` | Bird | harpies, birds | 0.6 s | 2nd | a sharp bird screech |
| `sfx_serpent` | Serpent | snakes, wyrms | 0.8 s | 2nd | a long hiss |
| `sfx_drake` | Drake | drakes and dragons | 2 s | 2nd | a dragon roar, mid-sized |
| `sfx_spit` | Spit / shot | monster projectiles | 0.5 s | 1st | a creature spitting a glob |
| `sfx_summon` | Summon | a monster summons others | 1 s | 2nd | a magical portal opening with a crackle |
| `sfx_mon_hit` | Monster hit | a monster takes a blow | 0.3 s | 1st | a fleshy hit impact |
| `sfx_mon_armor` | Armoured hit | an armoured or shelled monster | 0.3 s | 2nd | a blow on armor plates, metallic clank |
| `sfx_mon_die` | Monster dies | a monster is defeated | 0.8 s | 1st | a creature collapsing and fading in a poof of dust |

### Bosses (7)

| id | Name | Where it plays | Length | Wave | Words sent |
|---|---|---|---|---|---|
| `sfx_boss_roar` | Boss roar | a boss wakes or turns | 2 s | 1st | a huge monstrous roar, deep and long |
| `sfx_boss_stomp` | Stomp | heavy boss steps and slams | 1 s | 1st | a colossal stomp shaking the ground |
| `sfx_boss_slam` | Slam | area slams | 1 s | 1st | a giant weapon slamming the ground, debris |
| `sfx_boss_phase` | Phase change | a boss enters a new phase | 3 s | 1st | a dark magical transformation surge rising to a burst |
| `sfx_boss_charge` | Desperation charge | a boss's desperation move charging | 2 s | 1st | an ominous charging-up hum rising in pitch |
| `sfx_shield_break` | Ward breaks | a boss ward or shield breaks | 1 s | 1st | a magical barrier shattering like glass |
| `sfx_boss_fall` | Boss falls | a boss is defeated | 3 s | 1st | a giant creature crashing down, rumble fading |

### Familiars & mounts (8)

| id | Name | Where it plays | Length | Wave | Words sent |
|---|---|---|---|---|---|
| `sfx_fam_call` | Familiar appears | a familiar joins | 1 s | 2nd | a small magical creature appearing with a chime |
| `sfx_fam_grass` | Grass familiar | the grass familiar's attack | 0.6 s | 2nd | a burst of leaves and a whip of vine |
| `sfx_fam_water` | Water familiar | the water familiar's attack | 0.6 s | 2nd | a water bubble shot popping |
| `sfx_fam_earth` | Earth familiar | the earth familiar's attack | 0.6 s | 2nd | a pebble burst thud |
| `sfx_fam_fire` | Fire familiar | the fire familiar's attack | 0.6 s | 2nd | a small flame puff |
| `sfx_whistle` | Call the mount | M: call mount | 0.8 s | 1st | a short two-tone whistle |
| `sfx_hooves` | Hooves | riding (loop) | 3 s ⟲ | 2nd | horse hooves trotting on dirt, steady |
| `sfx_wings` | Wings | a flying mount (loop) | 3 s ⟲ | 2nd | large wings flapping steadily |

### World & objects (18)

| id | Name | Where it plays | Length | Wave | Words sent |
|---|---|---|---|---|---|
| `sfx_chest` | Chest opens | chests | 1 s | 1st | a wooden chest creaking open with a clink of coins |
| `sfx_door` | Door | doors into buildings and sites | 1 s | 1st | a heavy wooden door opening |
| `sfx_locked` | Locked | a locked or sealed door | 0.6 s | 2nd | a locked door rattling |
| `sfx_stairs` | Stairs | stairs between floors | 1 s | 2nd | quick footsteps on stone stairs |
| `sfx_coin` | Coins | gold picked up | 0.5 s | 1st | coins clinking |
| `sfx_pickup` | Pick up | items picked up | 0.3 s | 1st | a soft item pickup pop |
| `sfx_gem` | Gem | gems and shards | 0.6 s | 1st | a crystal gem chime |
| `sfx_waystone` | Waystone wakes | activating a waystone | 2 s | 1st | an ancient stone awakening with a magic hum |
| `sfx_travel` | Travel | travelling by waystone | 2 s | 1st | a magical teleport whoosh |
| `sfx_camp` | Camp cleared | a camp's guards all beaten | 2 s | 1st | short victorious folk fanfare with a cheer-free drum roll |
| `sfx_lever` | Lever / switch | switches and lifts | 0.6 s | 3rd | a heavy iron lever |
| `sfx_trap` | Trap | spikes and traps | 0.5 s | 2nd | metal spikes springing |
| `sfx_rubble` | Rubble | falling rocks, crumbling | 2 s | 1st | rocks crumbling and falling |
| `sfx_splash` | Splash | something falls in water | 0.8 s | 2nd | a big splash |
| `sfx_anvil` | Anvil | the smith, the forges | 0.6 s | 2nd | a hammer striking an anvil |
| `sfx_lava` | Lava burst | lava bursts, magma | 1 s | 2nd | a burst of bubbling lava |
| `sfx_bell` | Village bell | the village bell (morning, events) | 3 s | 3rd | a bronze village bell ringing three times |
| `sfx_sleep` | Sleep | resting in a bed | 2 s | 3rd | a soft blanket rustle and a calm magical chime |

### Story moments (12)

| id | Name | Where it plays | Length | Wave | Words sent |
|---|---|---|---|---|---|
| `sfx_spirit_free` | A spirit rises | a spirit is freed from its stone | 2 s | 1st | a ghostly sigh turning into a bright rising chime |
| `sfx_rune_wake` | Runestone wakes | a runestone lights | 2 s | 1st | a deep stone hum rising into a glowing chime |
| `sfx_line_trace` | Soul-line traced | the light runs along a soul-line | 3 s | 1st | a long magical shimmer travelling, rising |
| `sfx_lodestar` | The Lodestar set | the Lodestar set in the pier notch / the circle | 2 s | 1st | a heavy crystal staff set into stone with a resonant ring |
| `sfx_bifrost` | The Bifröst rises | the rainbow bridge forms | 3 s | 1st | a rising rainbow shimmer, bright and vast |
| `sfx_orbs_burst` | The orbs burst | Godsbane into the joined orbs | 3 s | 1st | two giant glass orbs bursting into millions of shards of light, sparkling rain |
| `sfx_thunder` | Odin's lightning | the village moment, the storm | 3 s | 1st | a huge thunderclap with a crackling lightning strike |
| `sfx_vines` | Freya's vines | the vines grow across the land | 3 s | 1st | vines and flowers growing fast, rustling and creaking, magical |
| `sfx_crumble` | The citadel shakes | after Solmyrk: the citadel crumbles | 3 s | 1st | a great stone building shaking and crumbling, deep rumble |
| `sfx_great_door` | The great doors | the feast hall's doors swing open | 3 s | 1st | enormous golden doors swinging open slowly with a deep groan |
| `sfx_sink` | Sinking | Muspelheim, the causeway, Asgard sinking | 3 s | 2nd | a vast structure sinking into water, rumbling and bubbling |
| `sfx_page` | Saga page | a saga panel turns | 0.6 s | 1st | an old parchment page turning |

### Menus & screens (10)

| id | Name | Where it plays | Length | Wave | Words sent |
|---|---|---|---|---|---|
| `sfx_ui_click` | Click | buttons | 0.2 s | 1st | a soft wooden UI click |
| `sfx_ui_open` | Open | opening a menu, the Tome, the map | 0.5 s | 1st | a leather book opening |
| `sfx_ui_close` | Close | closing a menu | 0.4 s | 1st | a leather book closing softly |
| `sfx_ui_tab` | Page / tab | Tome tabs, pages | 0.3 s | 2nd | a quick page flip |
| `sfx_ui_equip` | Equip | equipping gear | 0.5 s | 2nd | a buckle and leather strap being fastened |
| `sfx_ui_buy` | Buy / sell | shops | 0.6 s | 1st | coins dropped on a wooden counter |
| `sfx_ui_error` | Can't do that | a refused action | 0.3 s | 1st | a soft dull wooden knock |
| `sfx_ui_note` | Notice | a notice pops up | 0.5 s | 1st | a gentle chime |
| `sfx_ui_save` | Saved | the game is saved | 0.8 s | 2nd | a quill scratch and a soft seal stamp |
| `sfx_talk` | Talk | a talk box opens | 0.4 s | 2nd | a soft parchment unroll |

### Village life (5)

| id | Name | Where it plays | Length | Wave | Words sent |
|---|---|---|---|---|---|
| `sfx_kids` | Children playing | the children at play (after the end) | 4 s ⟲ | 2nd | distant children laughing and playing, no words |
| `sfx_sheep` | Sheep | village sheep | 1 s | 3rd | a sheep bleating |
| `sfx_goat` | Goats | goats | 1 s | 3rd | a goat bleating |
| `sfx_hens` | Hens | hens in the village | 2 s | 3rd | hens clucking |
| `sfx_feast` | The feast | the celebration (loop) | 6 s ⟲ | 2nd | a happy crowd at a feast, cheering, mugs clinking, no clear words |

**House style** (added to every music request): *instrumental, Nordic folk fantasy game score, nyckelharpa, hardanger fiddle, tagelharpa, wooden flute, lyre, frame drum, low wordless choir, warm hall reverb, organic acoustic, no lyrics, no modern drums, no synths, no electric guitar*.  
**Ambience** (added): *seamless looping ambience for a fantasy game, no music, no voices, steady, no sudden events*.  
**Effects** (added): *fantasy adventure game sound effect, clean, close, no music, no voices*.

⟲ = loops. Waves: 1st = first wave, 2nd = second, 3rd = nice to have.
