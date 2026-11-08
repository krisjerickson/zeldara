# 50 — Hosting size (round 94)

Kris: "vercel already requested that i upgraded … believe it might be file size from the found zips."

## What was actually happening

The Sonniss zips were **not** the cause. `audio/library` (~80 GB) was never committed, and Vercel builds from GitHub, so it never sees them.

The cause was the build output. Vercel's Hobby plan has **10 GB of Deployment Storage** per team. It keeps the 3 newest production deployments plus the 3 newest of any type, and going over the limit can stop new deploys. Every push makes a deployment, and each one stores the whole `dist/`.

`dist/` was about **1.35 GB per deployment** on Vercel (1.5 GB on the PC, with `lab/preview`):

| Part | Size | Why |
|---|---|---|
| `/play`, `/play3`, `/play4` | 3 × 449 MB | each carried its own copy of every asset |
| music | 92 MB mp3 + 78 MB ogg | every take was in both formats |
| `lab/preview` | 170 MB | PC only; it is gitignored, so Vercel never had it |

Six deployments × 1.35 GB is about 8 GB for Zeldara alone. That is right at the 10 GB line.

## What round 94 changed (build.mjs)

- **One copy of the assets.** They live only under `/play`. `/play3` and `/play4` are now tiny pages that forward to `/play/?engine=3` or `?engine=4`; the game already read `?engine=`. Other query parameters and the `#` part are kept.
- **mp3 only on the host.** `dist/play/index.html` sets `ZAUDIO_EXT="mp3"`, the same as the claude.ai copy, and no `.ogg` is copied. The `.ogg` files stay in `assets/` for local play.
- **mu_home take 1 is not shipped.** The game has played take 2 only since round 92.
- The build now prints the size of `dist/`.
- Safety nets:
  - `.gitignore` now lists `audio/library/`, `audio/incoming/` and `video_requests/`, so a `git add -A` can never pick up the zips or the Kling folders.
  - `.vercelignore` lists `/audio/` (the root folder only; `assets/audio` is the game's), `video_requests/` and `lab/preview/`, so a `vercel` CLI deploy can never upload them.

**Result:** each deployment is about **0.39 GB**, down from 1.35 GB. Six retained deployments now fit in about 2.3 GB.

## Next, if wanted: take the big media off Vercel completely

The game's media is about 385 MB:

- atlas: 132 MB
- scenery: 76 MB
- story: 72 MB
- music and sounds: 95 MB (mp3 only)

All of it is already webp or mp3. Re-encoding the music from 128 to 96 kbps would save about 20 MB; that is small, and it is a choice about quality.

The bigger win is to host the media once, outside the deployments, and point the game at it with an asset-base address. Then each Vercel deployment would be about 10 MB. Options:

- **Cloudflare R2:** 10 GB free, no fee for downloads. The best fit, but it needs a Cloudflare account.
- **GitHub Releases or a second "zeldara-assets" repo served through jsDelivr:** free, but jsDelivr caps files at 20 MB and packages at about 150 MB.
- **Vercel Blob:** simplest to wire up, but it counts against Hobby's own Blob limits.

Players' downloads (Fast Data Transfer, 100 GB a month on Hobby) only become a concern at many hundreds of full plays a month. The atlas pages load per region, and music loads as it plays.
