# 84 — Releasing the game, the money and the law (round 128)

Kris asked for two things.

- On releasing: "create proposals around the main ways in which we could actually release this game … Steam and … Roblox … convert the game to the right formats … what generative harnesses there are … if claude can do it alone, or if others would be needed … final file-types … processes … other platforms … amounts to charge and any ongoing fees."
- Then, mid-round: "do an analysis on legal exposure - i think i need to change the female hero name to Zeldira instead of Zeldara (too close to Zelda) but also think about anything else related to this, especially considering how much AI we've used and any labels we will need to have on the game."

Lab › **Releasing the game**. The data is in `tools/world/r128_publish.py`, with every source linked. The facts were checked on 21 Nov 2026. **This is not legal, tax or financial advice.**

## My recommendation, in order

1. **Rename first.** Rename both heroes and the title away from ZELD-, and clear the new name with a trademark search and a lawyer before anything public.
2. **Fix the licences.** Sort out the Suno songs downloaded on the free plan and Kling's commercial terms.
3. **Put the free first chapter on the web and itch.io**, once the game starts in seconds.
4. **Release on Steam as the main paid version**, at $14.99, with a Next Fest demo.
5. **Later:**
   - Epic, which keeps nothing on the first $1M.
   - The web portals, as a funnel.
   - Phones.
   - Discord, once co-op exists.
6. **Maybe a small Roblox companion.** It would be a second game, not a port.
7. **Not consoles for now.**

## The routes

| Route | Files that ship | Claude does | Kris does | Fees | Price |
|---|---|---|---|---|---|
| Web + itch.io | HTML5 zip | demo flag, zip, page, butler script | account, tax interview, upload | itch share you choose (default 10 %) + ≈ 2.9 % + $0.30 | demo free; full $9.99 |
| **Steam** | Electron Windows build via SteamPipe; capsules 920×430, 462×174, 1232×706, 748×896; library 600×900, 3840×1240, logo; 5+ 1080p shots; mp4 trailer | wrapper, Steam glue, achievements, cloud saves, scripts, store text, capsule requests, trailer, AI disclosure | account, $100, W-9, ID, upload, Deck test | $100 (paid back at $1,000); 30 % → 25 % → 20 % | **$14.99**; soundtrack + art book $4.99 |
| Portals | HTML5 + SDK | SDK, ad breaks, small first pack | accounts, contracts | ad-income share (check) | free |
| Epic | same build | build, text | account | 0 % on first $1M/yr, then 12 % | as Steam |
| Phones | .aab / .ipa (needs a Mac) | Capacitor wrap, touch, unlock | Apple $99/yr, Google $25, a Mac | 15 % under $1M/yr | free chapter; $6.99 unlock |
| Discord | hosted URL + app settings | SDK, purchase checks | developer account | not stated in docs (check) | $6.99 unlock |
| Roblox | a new place (.rbxl) in Luau | most of the build, through Roblox's own Studio MCP and its Claude plugin, on the Windows PC | account (13+, ID to cash out) | creator gets 70 % of Robux; DevEx $0.0038/Robux from 30,000 → about a fifth of player spend | free; cosmetic passes |
| Consoles | — | — | a porting partner | large | — |

**An illustration, not a forecast:** 1,000 Steam copies at $14.99 come to $14,990 gross. Refunds take ≈ 9.5 %, and regional prices and tax take ≈ 15 %. Valve's 30 % then leaves **≈ $8,070** before income tax.

## The law

### The name

The heroes are Zeldara and Zeldor, and the game is "The Quests of Zeldara and Zeldor". All three start with ZELD-.

- Nintendo's ZELDA is a famous mark for the same kind of product, sold in the same shops.
- The start of a name weighs most.
- Zeldara contains the whole word ZELDA. Zeldira does not, which helps a little, but it keeps ZELD-, and so do Zeldor and the title.

**My view:** rename both heroes and the title before any public page. The rename touches about 180 strings, the logo, the theme's name and the captions; internal keys can stay.

Six pairs are offered, each still to be cleared:

- Zeldira & Zeldor (still a high risk)
- Svala & Sverre
- Astrid & Arvid
- Sigrun & Sindre
- Eira & Elvar
- Embla & Brann

Names already used in the game (Runa, Saga, Ragnar …) and gods' names were avoided.

### Everything else

| | Matters | Do |
|---|---|---|
| Kling | a lot | Its own terms (s.4.6) say no commercial use without written permission; third-party guides disagree. Check the paid terms or ask in writing, or remake the shipped clips with Gemini Omni. |
| Suno | a lot | Only songs downloaded on a paid plan can be sold. List every song with its plan, and re-download or replace the free ones. |
| Copyright | matters | In the US, AI-made pictures, music and film are not protected; the story, the writing, the design and the arrangement are. Register the game claiming the human parts, and rely on a trademark for the name ($350 per class; classes 9 and 41). |
| AI labels | matters | Steam's Content Survey (shown on the store page). itch.io tags (optional for games; use them). OpenAI forbids passing output off as human-made. EU Art. 50 (since 2 Aug 2026): a light notice for creative work. |
| Children, privacy, ratings | matters | Keep the game data-free; play data opt-in and off for children; IARC and Apple age ratings (about E10+ / PEGI 7). |
| Business, tax, hosting | matters | Talk to an accountant about an LLC. Steam and itch carry the downloads. Vercel Hobby has ≈ 100 GB of transfer a month (about 250 full downloads); read its terms on commercial use. |
| OpenAI images | small | We own them; just don't claim a person painted them. |
| ElevenLabs, Sonniss | small | Paid-plan sounds can be used in games; keep the Sonniss licence. |
| Fonts, Phaser, Electron | small | SIL Open Font Licence and MIT: ship the licence texts. |
| Looking like Zelda / Hollow Knight | small | Prompts are clean. Rename the internal id `hyrule_keep`; the release build is already minified, so comments do not ship. |

**The one sentence, in four places** (the store page, the About screen, the credits, the itch tags):

> The paintings, music, sound effects and films in this game were made with generative AI tools — OpenAI image models, Suno, ElevenLabs, Kling and Google Gemini — from prompts written for this game, then chosen, edited and assembled by Kris Erickson. Much of the code and the in-game writing was made with Claude (Anthropic) under his direction. Nothing is generated while you play.
