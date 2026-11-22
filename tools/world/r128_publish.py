"""Round 128 — PUBLISHING, MONEY AND THE LAW (Kris: "create proposals around the main ways in which we could actually release this game …
Steam and … Roblox … convert the game to the right formats … what generative harnesses there are … if claude can do it alone, or if others
would be needed … final file-types … processes … other platforms … amounts to charge and any ongoing fees"; and mid-round: "do an
analysis on legal exposure - i think i need to change the female hero name to Zeldira instead of Zeldara (too close to Zelda) but also think
about anything else related to this, especially considering how much AI we've used and any labels we will need to have on the game").
Facts checked 21 Nov 2026 against the pages in SRC; '(check)' marks a figure I could not confirm on a primary page.
Not legal, tax or financial advice — Claude is not a lawyer or a financial adviser."""

SRC = {
    'steamfee': ['Steam Direct fee explained (Steam Page Analyzer, Oct 2026)', 'https://www.steampageanalyzer.com/blog/steam-direct-fee-explained'],
    'steamcut': ['How much does Steam take (presskit.gg, Sep 2026)', 'https://presskit.gg/field-guides/how-much-does-steam-take'],
    'steamai': ['Steam AI disclosure rules, a practical guide (vgkami, Oct 2026)', 'https://vgkami.com/steam-ai-disclosure-rules-in-a-practical-guide-for-game-developers/'],
    'steamart': ['Steamworks — store graphical assets', 'https://partner.steamgames.com/doc/store/assets/standard'],
    'steamlib': ['Steamworks — library assets', 'https://partner.steamgames.com/doc/store/assets/libraryassets'],
    'steamtrailer': ['Steamworks — trailers', 'https://partner.steamgames.com/doc/store/trailer'],
    'phaserel': ['Phaser — Desktop Heroes: Phaser + Electron on Steam (May 2026)', 'https://phaser.io/news/2026/04/desktop-heroes-phaser-electron-steam'],
    'itch': ['itch.io — payments and open revenue sharing', 'https://itch.io/docs/creators/payments'],
    'itchai': ['Engadget — itch.io asks for generative-AI disclosure (Nov 2024)', 'https://www.engadget.com/ai/itchio-marketplace-now-requires-asset-creators-to-disclose-their-use-of-generative-ai-130031999.html'],
    'epic': ['Epic Games Store — keep 100 % of the first $1M per product per year (Jun 2025)', 'https://store.epicgames.com/news/epic-games-store-updates-revenue-share-keep-100-of-the-first-1m-per-product-per-year'],
    'apple': ['RevenueCat — App Store and Google Play fees (Oct 2026)', 'https://www.revenuecat.com/blog/engineering/small-business-program'],
    'rbxmon': ['Roblox — monetization overview', 'https://create.roblox.com/docs/get-started/monetization'],
    'devex': ['DevEx requirements 2026 (rolearn.dev, third party)', 'https://rolearn.dev/guidance/roblox-devex-requirements-2026/'],
    'rbxmcp': ['Roblox Studio — the built-in MCP server', 'https://create.roblox.com/docs/studio/mcp'],
    'rbxplug': ['Roblox — Studio agent plugin for Claude', 'https://github.com/Roblox/roblox-studio-agent-plugin'],
    'rbxortho': ['DevForum — orthographic camera request (still open)', 'https://devforum.roblox.com/t/orthographic-camera-projection-for-experiences-and-studio/3932266'],
    'discord': ['Discord — Activities', 'https://docs.discord.com/developers/platform/activities.md'],
    'discordmon': ['Discord — app monetization', 'https://docs.discord.com/developers/platform/app-monetization.md'],
    'vercel': ['Vercel — Hobby plan', 'https://vercel.com/docs/plans/hobby'],
    'vercelfu': ['Vercel — fair use guidelines (Hobby: 100 GB transfer a month)', 'https://vercel.com/docs/limits/fair-use-guidelines'],
    'usco': ['US Copyright Office — AI report, part 2: copyrightability (Jan 2025)', 'https://www.copyright.gov/newsnet/2025/1060.html'],
    'uscoblog': ['Copyright Office blog — inside the part 2 report', 'https://blogs.loc.gov/copyright/2025/02/inside-the-copyright-offices-report-copyright-and-artificial-intelligence-part-2-copyrightability/'],
    'euai': ['DLA Piper — the EU\'s new guidelines on AI transparency (Aug 2026)', 'https://www.dlapiper.com/en-pl/insights/publications/2026/08/the-eus-new-guidelines-on-ai-transparency'],
    'euai2': ['Orrick — EU AI Act Article 50 (Aug 2026)', 'https://www.orrick.com/en/insights/2026/08/eu-ai-act-transparency-obligations-for-ai-generated-content-article-50'],
    'openai': ['OpenAI — terms of use (Jan 2026)', 'https://openai.com/policies/row-terms-of-use/'],
    'suno': ['Suno — rights with a paid subscription', 'https://help.suno.com/en/articles/9601665'],
    'sunotos': ['Suno — downloads policy and terms update (Aug 2026)', 'https://about.suno.com/blog/suno-updates-tos'],
    'eleven': ['ElevenLabs — can I publish what I generate', 'https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform'],
    'elevensfx': ['ElevenLabs — creative terms, sound effects exhibit (Oct 2026)', 'https://elevenlabs.io/sound-effects-terms'],
    'kling': ['Kling AI — terms of service (Apr 2026)', 'https://kling.ai/docs/user-policy'],
    'klingsum': ['LicenseOrg — AI video licensing 2026 (third party, Feb 2026)', 'https://licenseorg.com/blog/ai-video-licensing-2026'],
    'gemini': ['Gemini API additional terms (archived Nov 2025 version)', 'https://ai.google.dev/gemini-api/terms-archive/terms_11_20_25'],
    'uspto': ['USPTO — trademark fees', 'https://www.uspto.gov/trademarks/trademark-fee-information'],
    'nfan': ['Wikipedia — Nintendo and fan games', 'https://en.wikipedia.org/wiki/Nintendo_and_fan_games'],
}

# ═══ the routes ═══ each: who does what (Claude / Kris / others), the files that ship, fees, price, time, reach, risks
ROUTES = [
 {'id': 'web', 'n': 'Free first chapter on the web (our site + itch.io)', 'ic': '🌐', 'rec': 'first',
  'what': 'The first region (to the first realm guardian) free in the browser, with "get the whole saga" pointing to Steam and to a paid itch.io build.',
  'how': ['split the build into a demo and the full game (one flag in build.mjs)', 'the first-pack streaming of proposal "Start in seconds"', 'an itch.io page (HTML5 zip) and a paid download (the same zip, or the Steam desktop build)'],
  'files': 'HTML5: a .zip with index.html and the assets (webp pictures, mp3 sound, mp4 films). Desktop on itch: the same Windows build as Steam.',
  'claude': 'the demo flag, the zip, the page text and pictures, the upload script (butler, itch\'s uploader)',
  'kris': 'the itch.io account, its tax interview and payout choice, pressing upload',
  'others': 'none needed',
  'fees': 'itch: you choose its share (default 10 %) + payment fees (≈ 2.9 % + $0.30); a one-time $3 tax-identity fee in "itch collects" mode. Our own site: hosting (see the Vercel note).',
  'price': 'Demo free. Full game on itch: $9.99 (or pay-what-you-want, $5 minimum).',
  'time': '2–3 rounds after "Start in seconds"', 'reach': 'small but immediate; feeds Steam wishlists',
  'risks': 'The 390 MB size (must stream). Vercel Hobby allows ≈ 100 GB transfer a month — about 250 full downloads.', 'src': ['itch', 'itchai', 'vercelfu']},
 {'id': 'steam', 'n': 'Steam — the main paid release (Windows, Steam Deck)', 'ic': '🎮', 'rec': 'first',
  'what': 'The game wrapped as a desktop app with Electron (Phaser\'s own published path to Steam), with Steam achievements, cloud saves and controller support.',
  'how': ['Electron wrapper + electron-builder; the game loads from local files (no 390 MB download)', 'Steamworks through a Node library (steamworks.js / steamworks-ffi-node — third party; Desktop Heroes wrote its own glue)', 'achievements from the Tome, cloud saves from ZSAVE, gamepad (proposal "Any controller")', 'a Coming Soon page early (at least two weeks before release), a demo for Steam Next Fest'],
  'files': 'Windows x64 build (an .exe with resources/app.asar and the assets), uploaded as a depot with SteamPipe. Optional Linux build for the Deck (or Proton). Store: capsules 920×430, 462×174, 1232×706, 748×896; library 600×900, 3840×1240 hero, logo PNG 1280 wide; 5+ screenshots 1920×1080 of play; trailer mp4 (H.264/AAC, up to 1080p).',
  'claude': 'the wrapper, the Steam glue, achievements, cloud saves, build and upload scripts, the store text, the capsule paintings as image requests, a trailer from game footage and Omni/Kling clips, the AI disclosure text',
  'kris': 'the Steamworks account, the $100 fee, tax and bank forms (W-9), identity checks, running the upload with his own login, final picks, testing on a Deck',
  'others': 'a trademark lawyer before the Coming Soon page (the name); playtesters; a Mac only if we ship for macOS',
  'fees': '$100 per game, paid back once the game passes $1,000 adjusted revenue. Valve keeps 30 % (25 % above $10M, 20 % above $50M). Refunds within 14 days / 2 hours of play (median ≈ 9.5 % of units).',
  'price': '$14.99 (12–15 hours of play) with a 15 % launch discount; Valve\'s regional prices. Soundtrack + art book DLC $4.99.',
  'time': 'about 4–6 rounds of build work + 30 days\' wait after paying + 2 weeks Coming Soon + review (3–5 working days; plan 7)',
  'reach': 'the largest PC audience; wishlists drive the launch',
  'risks': 'Needs the new name first. The AI disclosure is public on the page (some players avoid AI games). Valve says it will not ban AI tools.', 'src': ['steamfee', 'steamcut', 'steamai', 'steamart', 'steamlib', 'steamtrailer', 'phaserel']},
 {'id': 'portals', 'n': 'Web game portals (CrazyGames, Poki) — the free demo with ads', 'ic': '🕹️', 'rec': 'later',
  'what': 'The free first chapter on the big web portals, paid by their ads, as a funnel to Steam.',
  'how': ['the portal SDK: ads only at natural breaks (after a site), never in fights', 'the ≈ 15 MB first pack is a must (CrazyGames asks under 20 MB and under 10 s)'],
  'files': 'HTML5 zip as for itch, with the portal SDK added.',
  'claude': 'the SDK, the ad breaks, the small first pack', 'kris': 'the portal accounts, contracts and payout forms', 'others': 'Poki is by invitation / application',
  'fees': 'no fee; you receive a share of the portal\'s ad income (each portal\'s contract) (check)', 'price': 'free',
  'time': '1–2 rounds after the first pack', 'reach': 'very large (Poki reports 100M+ players a month); 62 % of their players have later bought a game they first played on the web',
  'risks': 'Little money; ads clash with a premium feel — keep them out of the paid builds.', 'src': ['itch']},
 {'id': 'epic', 'n': 'Epic Games Store (later, same desktop build)', 'ic': '🛒', 'rec': 'later',
  'what': 'The same Windows build on Epic\'s store.', 'how': ['the same Electron build; Epic\'s own uploader (BuildPatchTool)', 'Epic achievements are optional'],
  'files': 'the same Windows build', 'claude': 'the build and the store text', 'kris': 'the Epic developer account and forms', 'others': 'none',
  'fees': 'Epic keeps nothing on the first $1M per product per year (since June 2025), then 12 %. A submission fee per game (check).', 'price': 'same as Steam',
  'time': '1 round after Steam', 'reach': 'smaller than Steam for small games', 'risks': 'little, once Steam is done', 'src': ['epic']},
 {'id': 'mobile', 'n': 'Phones and tablets (iOS, Android)', 'ic': '📱', 'rec': 'later',
  'what': 'The web game wrapped as an app with Capacitor: the first chapter free, the full saga unlocked once.',
  'how': ['Capacitor wrapper', 'touch controls finished', 'the assets delivered as Play asset packs / on-demand on iOS because of their size'],
  'files': 'Android: an .aab app bundle (+ asset packs). iOS: an .ipa built with Xcode (needs a Mac).',
  'claude': 'the wrapper, touch polish, the unlock purchase code, store text', 'kris': 'the Apple ($99 a year) and Google ($25 once) accounts, signing keys, the age-rating forms, a Mac or a rented one for iOS', 'others': 'a Mac (or a cloud Mac service) for the iOS build',
  'fees': 'Apple $99/year, Google $25 once; both 15 % on the first $1M a year (Apple\'s Small Business Program must be applied for; 30 % otherwise).', 'price': 'free first chapter; full saga $6.99 once',
  'time': '3–5 rounds', 'reach': 'large, but crowded and expensive to be found', 'risks': 'the size; review times; touch for a sword game', 'src': ['apple']},
 {'id': 'discord', 'n': 'Discord Activity — play together in a call', 'ic': '💬', 'rec': 'later',
  'what': 'The web game as a Discord Activity, launched in a voice channel — best after two-player co-op exists.',
  'how': ['Discord\'s Embedded App SDK in an iframe', 'one-time purchases or subscriptions as Discord SKUs'],
  'files': 'the hosted web build (a URL) + the Discord app settings', 'claude': 'the SDK, the hosting set-up, the purchase checks', 'kris': 'the Discord developer account, monetization sign-up', 'others': 'none',
  'fees': 'Discord bills the players; its share and payout rules are not on the pages I read (check)', 'price': 'free with the full saga as a one-time unlock ($6.99)',
  'time': '2 rounds after co-op', 'reach': 'friends and families who already talk on Discord', 'risks': 'needs co-op to make sense', 'src': ['discord', 'discordmon']},
 {'id': 'roblox', 'n': 'Roblox — a companion game, not a port', 'ic': '🧱', 'rec': 'maybe',
  'what': 'Roblox cannot run our Phaser game: it is its own 3D engine with Luau scripts. A "Zeldara-world" companion (the village, a site, a boss echo) built in Roblox Studio, using our paintings as flat billboards.',
  'how': ['a new place in Roblox Studio, scripted in Luau', 'a top-down camera (a true flat camera is still only a request; a far camera with a narrow lens is the workaround)', 'our pictures uploaded as images (Roblox shrinks them to at most 1024 px) (check)', 'Claude can drive Studio through Roblox\'s own MCP server and its official Claude plugin — on Kris\'s Windows PC, with Studio open'],
  'files': 'a Roblox place (.rbxl) and uploaded images and sounds; nothing from our build ships as is',
  'claude': 'most of the building and scripting through the Studio MCP (on the PC)', 'kris': 'the Roblox account (13+; ID check for cashing out), uploads, testing, moderation', 'others': 'Roblox players to test; perhaps a Roblox builder for 3D pieces',
  'fees': 'Game passes and items: the creator gets 70 % of the Robux. Cashing out (DevEx): $0.0038 per earned Robux, from 30,000 Robux (≈ $114). In all, about a fifth of what a player spends reaches you.',
  'price': 'free to play; cosmetic passes 99–399 Robux; never paid power',
  'time': '8+ rounds — it is a second game', 'reach': 'huge and young', 'risks': 'A different game; a young audience (strict moderation and child-safety rules); the name problem applies here too.', 'src': ['rbxmon', 'devex', 'rbxmcp', 'rbxplug', 'rbxortho']},
 {'id': 'supporters', 'n': 'Soundtrack, art book and supporters', 'ic': '🎼', 'rec': 'maybe',
  'what': 'The music as a Steam soundtrack DLC, a painted art book (PDF), and a Ko-fi / Patreon page for people who want to follow the making.',
  'how': ['a soundtrack DLC on Steam (its own App ID)', 'an art book made from the paintings'],
  'files': 'mp3/flac + cover art; a PDF', 'claude': 'the album and the book', 'kris': 'the store entries', 'others': 'none',
  'fees': 'Steam\'s 30 %; Ko-fi / Patreon fees (check)', 'price': 'soundtrack $3.99–4.99; art book $4.99; or both with the game',
  'time': '1 round', 'reach': 'only fans', 'risks': 'Suno songs need paid-plan downloads to be sold (see the law).', 'src': ['steamcut', 'suno']},
 {'id': 'consoles', 'n': 'Consoles (Switch, Xbox, PlayStation)', 'ic': '🕹', 'rec': 'no',
  'what': 'Not now. Consoles need dev kits, a publisher relationship and an engine they support; Phaser is not one. A porting studio could do it after a Steam success.',
  'how': ['a porting partner later'], 'files': '—', 'claude': 'little', 'kris': 'the partner deal', 'others': 'a porting studio',
  'fees': 'large (porting is usually paid by revenue share or fee)', 'price': '—', 'time': '—', 'reach': '—',
  'risks': 'Nintendo\'s own store is the worst place to launch a name that sounds like Zelda.', 'src': []},
]

FEES = [
    ['Steam', '$100 per game (paid back at $1,000)', '30 % → 25 % above $10M → 20 % above $50M', 'none', 'steamfee'],
    ['Epic Games Store', 'a submission fee (check)', '0 % on the first $1M per product per year, then 12 %', 'none', 'epic'],
    ['itch.io', 'none ($3 tax-identity fee once)', 'you choose (default 10 %) + ≈ 2.9 % + $0.30 payment fees', 'none', 'itch'],
    ['Apple App Store', '—', '15 % (Small Business, under $1M a year), else 30 %', '$99 a year', 'apple'],
    ['Google Play', '$25 once', '15 % on the first $1M a year', 'none', 'apple'],
    ['Roblox', '—', 'Roblox keeps 30 % of Robux; DevEx pays $0.0038 per Robux (min. 30,000)', 'none', 'rbxmon'],
    ['Web portals', '—', 'a share of ad income (contract)', 'none', ''],
    ['Hosting (Vercel)', '—', '—', 'Hobby: free up to ≈ 100 GB transfer a month; Pro from $20 a user a month', 'vercelfu'],
    ['A trademark (USPTO)', '$350 per class (games: classes 9 and 41 → $700)', '—', 'renewals every 10 years', 'uspto'],
    ['Copyright registration (US)', '≈ $45–65 per work (check)', '—', 'none', ''],
    ['Suno (to sell its songs)', '—', '—', 'a paid plan while downloading the songs', 'suno'],
    ['ElevenLabs (sounds)', '—', '—', 'a paid plan while generating (already true: Creator)', 'eleven'],
]

MATH = {'price': 14.99, 'copies': 1000, 'refund': 0.095, 'region_vat': 0.15, 'cut': 0.30}

STEAM_STEPS = [
    'Choose and clear the new name (a trademark search; a lawyer\'s opinion) — before anything public.',
    'Make the Steamworks account; pay $100; fill in tax (W-9) and bank forms; identity check (allow 15–30 days).',
    'Build the desktop version (Electron), controller support, cloud saves, achievements.',
    'Paint the capsules (5 store images, 3 library images, the logo) and cut a gameplay trailer.',
    'Fill in the Content Survey, including the AI disclosure (below), and the store page; open Coming Soon (≥ 2 weeks; wishlists start).',
    'Make a demo (the first chapter) for Steam Next Fest.',
    'Upload the build with SteamPipe; ask for the build and store review (3–5 working days; plan 7).',
    'Release (30 days after paying, at the earliest) with a launch discount; answer reviews; patch.',
]

# ═══ the law ═══
NAME = {
    'facts': [
        'Today the heroes are Zeldara and Zeldor and the game is "The Quests of Zeldara and Zeldor" (since round 53). All three begin with ZELD-.',
        'Nintendo holds trademarks for ZELDA and THE LEGEND OF ZELDA for video games, and ZELDA is famous — famous marks are also protected against dilution, not only confusion.',
        'A trademark question asks: would buyers think the product comes from, or is linked to, the owner of the mark? Courts weigh how alike the names look and sound, how alike the products are, how strong the mark is, the shops they are sold in, and what the newcomer intended.',
        'Here the products are the same kind (a top-down sword-and-quest adventure), sold in the same shops (Steam), against one of the strongest marks in games. The beginning of a name counts most.',
        'Nintendo\'s usual tools have been cease-and-desist letters and takedowns (mostly copyright, against fan games). I found no public case about a name merely close to "Zelda" — that is no assurance; a store can take a page down on a complaint.',
    ],
    'verdict': 'Zeldara contains the whole word ZELDA. Zeldira no longer spells ZELDA, which helps a little — but it keeps the ZELD- start, the same kind of game and the same shops, and Zeldor and the title keep it too. In my view Zeldira alone does not take the game out of the risk; renaming both heroes and the title away from ZELD- before anything public (the Steam page, the itch page, ads) is the safe course. A private family build can keep the names (trademark law is about use in trade). Not legal advice — a trademark lawyer\'s clearance before the Steam page is worth the fee.',
    'cost': 'In the code the names appear ≈ 180 times (94 "Zeldara", 82 "Zeldor", plus the title); the title logo, the main theme\'s name, cut-scene captions and saves (internal keys such as zeldara_… can stay — players never see them). A rename is one round, cheapest now.',
    'options': [
        ['zeldira', 'Zeldira', 'Zeldor', 'The Quests of Zeldira and Zeldor', 'high', 'Kris\'s idea. Still ZELD- three times.'],
        ['svala', 'Svala', 'Sverre', 'The Quests of Svala and Sverre', 'check', 'Svala = swallow; Sverre = "the wild one". Alliterating, Norse, easy to say.'],
        ['astrid', 'Astrid', 'Arvid', 'The Quests of Astrid and Arvid', 'check', 'Classic Nordic pair; very common names — hard to own as a mark, easy to clear.'],
        ['sigrun', 'Sigrun', 'Sindre', 'The Quests of Sigrun and Sindre', 'check', '"Victory-rune" and "the sparkling one" (Sindri was the dwarf smith of the myths — fits the forges).'],
        ['eira', 'Eira', 'Elvar', 'The Quests of Eira and Elvar', 'check', 'Soft and short; Eira = "mercy", Elvar = "elf-warrior".'],
        ['embla', 'Embla', 'Brann', 'The Quests of Embla and Brann', 'check', 'Embla = the first woman of the myths (not a god); Brann = "fire, sword".'],
    ],
    'note': 'Avoided because they are already in the game: Runa (Elder Runa), Saga, Ragnar, Vigdis, Dagny, Ylva, Sigurd. Avoided because gods are not named before they are freed: Idun, Siv, Vidar. Every option still needs a trademark search (USPTO, EUIPO) and a Steam / app-store search before choosing.',
}

LAW = [
    {'id': 'name', 'n': 'The heroes\' and the game\'s name', 'lvl': 'high',
     'what': 'ZELD- in both heroes and the title, for the same kind of game, against a famous mark.',
     'do': 'Pick a new pair below; clear it (search + lawyer); rename in one round; then file our own trademark ($350 a class).', 'src': ['uspto', 'nfan']},
    {'id': 'kling', 'n': 'Kling\'s terms for selling its films', 'lvl': 'high',
     'what': 'Kling\'s own terms (Apr 2026, s.4.6) say its output may not be used commercially without Kling\'s written permission; third-party guides say paid plans include commercial rights. Kling also keeps a broad licence (including training) and may ask for a "Kling AI" mark.',
     'do': 'Before selling: read the paid-plan terms in Kling\'s account or ask Kling in writing. Otherwise remake the shipped cut-scenes with Gemini Omni (Google claims no ownership; no commercial ban in the terms I read).', 'src': ['kling', 'klingsum', 'gemini']},
    {'id': 'suno', 'n': 'Suno songs made on the free plan', 'lvl': 'high',
     'what': 'Only songs downloaded while on a paid plan may be used commercially; free-plan downloads are personal use only (since 3 Sep 2026, and it applies to older songs too).',
     'do': 'List every song in the game with the plan it was downloaded on; re-download on a paid month (Pro) or replace any free-plan one.', 'src': ['suno', 'sunotos']},
    {'id': 'copyright', 'n': 'What we own (copyright)', 'lvl': 'med',
     'what': 'In the US, pictures, music and film made by AI from prompts are not protected by copyright; the human parts are — the story, the writing Kris shaped, the design, the selection and arrangement of it all. Others could copy single AI pictures; the game as a whole and its name are what protect it.',
     'do': 'Register the game\'s copyright, claiming the human authorship and excluding the AI-generated material; lean on a trademark for the name.', 'src': ['usco', 'uscoblog']},
    {'id': 'labels', 'n': 'AI labels the game must carry', 'lvl': 'med',
     'what': 'Steam: the Content Survey must disclose pre-made AI content (art, sound, music, video, text) and shows it on the store page. itch.io: tagging is required for asset packs, optional for games — use it anyway. OpenAI\'s terms forbid presenting AI output as made by a person. EU (since 2 Aug 2026): deep-fake labels for realistic content; for creative and fictional work a light, non-intrusive notice; whether credits alone suffice is unsettled.',
     'do': 'One honest sentence in four places: the store page, the title screen\'s About, the credits and the itch tags (text below).', 'src': ['steamai', 'itchai', 'openai', 'euai', 'euai2']},
    {'id': 'openai', 'n': 'The paintings (OpenAI images)', 'lvl': 'low',
     'what': 'We own the output and OpenAI assigns its rights to us; the only catch is not to claim a person painted it. API use falls under OpenAI\'s business terms (similar).',
     'do': 'Credit the paintings as "made with OpenAI image models, directed by Kris Erickson".', 'src': ['openai']},
    {'id': 'eleven', 'n': 'The sound effects (ElevenLabs) and the Sonniss library', 'lvl': 'low',
     'what': 'ElevenLabs: made on a paid plan → commercial use in games allowed (not as a standalone sound library). The Sonniss GDC archive is royalty-free for commercial games.',
     'do': 'Keep a record of the plan months; keep the Sonniss licence file with the game.', 'src': ['eleven', 'elevensfx']},
    {'id': 'thirdparty', 'n': 'Fonts, Phaser and Electron', 'lvl': 'low',
     'what': 'Cinzel, Cinzel Decorative, Marcellus SC, Eagle Lake and Uncial Antiqua are SIL Open Font Licence fonts (free to embed and sell with the game, the licence must travel with them). Phaser and Electron are MIT-licensed (keep their notices).',
     'do': 'A "licences" page in the About section and a LICENSES folder in every build.', 'src': []},
    {'id': 'lookalike', 'n': 'Looking like Zelda or Hollow Knight', 'lvl': 'low',
     'what': 'Ideas, genres and styles are free; specific characters, items and tunes are not. The painting requests are clean (no "Zelda" / "Hollow Knight" in any prompt), code comments name them (the minified build already strips comments) and one internal id, hyrule_keep, ships in the game\'s data.',
     'do': 'Rename hyrule_keep; keep release builds minified; keep the rule "inspiration is style only, never characters".', 'src': []},
    {'id': 'kids', 'n': 'Children, privacy and ratings', 'lvl': 'med',
     'what': 'A family game will have young players. Collecting any data from children (US COPPA, EU GDPR) brings strict rules; stores ask for an age rating (IARC questionnaire for Google, Microsoft and others; Apple\'s own; Steam\'s survey). Google\'s Gemini terms bar using its API in apps likely used by under-18s — the game never calls Gemini, only our tools do.',
     'do': 'Keep the game offline and data-free; the play-data proposal must be opt-in and off for children. Expect a mild-fantasy-violence rating (about E10+ / PEGI 7).', 'src': ['gemini']},
    {'id': 'business', 'n': 'Business, tax and hosting', 'lvl': 'med',
     'what': 'Steam and itch withhold tax without forms; selling as yourself mixes the game\'s risk with your own. Vercel\'s Hobby plan has a ≈ 100 GB monthly transfer guide — about 250 full downloads of the game; read Vercel\'s terms on commercial use.',
     'do': 'Talk to an accountant about a small LLC; host paid builds on Steam / itch (they carry the downloads); move big media off Vercel before a public launch.', 'src': ['steamcut', 'vercel', 'vercelfu']},
]

LABEL_TEXT = ('The paintings, music, sound effects and films in this game were made with generative AI tools — OpenAI image models, Suno, '
              'ElevenLabs, Kling and Google Gemini — from prompts written for this game, then chosen, edited and assembled by Kris Erickson. '
              'Much of the code and the in-game writing was made with Claude (Anthropic) under his direction. Nothing is generated while you play.')

LABELS = [
    ['Steam Content Survey → AI disclosure (shown on the store page)', 'Pre-generated: yes (art, sound, music, video, text, code assistance). Live-generated: no.'],
    ['Title screen → About, and the credits', 'the sentence above, plus a tools list'],
    ['itch.io page', 'AI generation disclosure: graphics, sounds, text and dialogue, code'],
    ['Kling clips (if kept)', 'a "made with Kling AI" line in the credits, if Kling\'s terms ask for it'],
    ['App stores', 'no AI label found for pre-made content; answer the age-rating forms'],
]


def data():
    assert all(r['src'] is not None for r in ROUTES)
    m = MATH; gross = m['price'] * m['copies']; net = gross * (1 - m['refund']) * (1 - m['region_vat']); you = net * (1 - m['cut'])
    m = dict(m, gross=round(gross), net=round(net), you=round(you))
    return {'src': SRC, 'routes': ROUTES, 'fees': FEES, 'math': m, 'steam_steps': STEAM_STEPS, 'name': NAME, 'law': LAW, 'label_text': LABEL_TEXT, 'labels': LABELS}
