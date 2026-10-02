# 12 — Hosting (GitHub + Vercel) and player saves

Decided by Kris (Oct 1, 2026):
- Up to ~10 players, mostly each on their own device.
- Saves live in the browser: player profiles, 3 slots each, plus export/import. No database yet.
- Deploy: push to GitHub → Vercel runs `npm run build` and serves `dist/`. Built files stay out of git.
- The game is public at `/`; the Design Lab is at `/lab` (unlisted).

## How it is wired

| Piece | Where | What it does |
|---|---|---|
| Build | `build.mjs` (`npm run build`) | Builds `index.html` (the game), `lab/index.html` (the Lab), then copies both into `dist/` (`dist/index.html`, `dist/lab/index.html`). |
| Vercel config | `vercel.json` | install `npm install`, build `npm run build`, output `dist`, clean URLs. HTML is revalidated on every visit, so a new deploy shows up right away. |
| Upload filter | `.vercelignore` | Uploads only what the build needs: `src/`, `assets/`, `lab/src/`, `build.mjs`, `package*.json`. |
| Git filter | `.gitignore` | `dist/`, `/index.html`, `/lab/index.html`, the generated `src/js/01-sprite-data.js` and sync folders stay out of git. |
| Phaser | cdnjs (Cloudflare) | Loaded from the CDN, as before. |

To play offline: run `npm run build` (or `node build.mjs`), then double-click `index.html`.

## Player saves (`src/js/04d-profiles.js`)

**New Game**
1. Type your name (unique on that device, up to 16 characters).
2. Pick one of your 3 slots. A used slot asks before it is overwritten.

**Returning Player**
1. Pick your name. Names are listed last-played first.
2. On your slots: Continue, start a new game in a slot, ⤓ Export, ⤒ Import, delete a slot, rename yourself or remove yourself.

**Export / import**
- Export downloads a small `.zsave` file. It holds a code starting with `ZLD1:`.
- Import takes that file, or a pasted code, into any slot.
- Use it to back up a save or move it to another device or browser.

**Storage**
- Browser `localStorage`, under these keys:
  - `zeldara_profiles` holds the player list.
  - `zeldara_save_<playerId>_<slot>` holds one game each.
- A save is about 5 KB, so 10 players × 3 slots is about 150 KB. Browsers allow about 5 MB per site.
- Saves belong to one browser on one site. The Vercel URL, a custom domain, the Claude artifact and `file://` each keep their own saves; export/import moves them between these.

**Old save**
- The old single save (`qoz_v2`) moves into **"Player 1", slot 1** the first time the title screen opens.
- A copy is kept as `qoz_v2_moved`. Rename "Player 1" in its slot screen.

**Code**
- Everything goes through `ZSave.store` = `{get, set, remove, keys}`.
- The game itself calls only `ZSave.read()` and `ZSave.write()`.

## Going online later (Supabase), only if needed

You need a database only if players want the **same save on several devices without export/import**, or if you want an overview of everyone's progress. When that day comes:

1. Create a free Supabase project. Then in Table editor → SQL:

   ```sql
   create table saves (
     player text not null,          -- display name (or auth user id)
     slot   int  not null check (slot between 1 and 3),
     data   jsonb not null,
     updated_at timestamptz default now(),
     primary key (player, slot)
   );
   alter table saves enable row level security;
   ```

2. Turn on Supabase Auth with **email magic links**, so each player signs in with a link. Add row-level-security policies so a player can only read and write their own rows.
3. Add a small `ZSave.cloud` store:
   - `get` / `set` call `supabase.from('saves').select()` / `upsert()`.
   - Keep `localStorage` as an offline cache and sync when online.
   - The rest of the game doesn't change, because it only uses `ZSave.read()` / `ZSave.write()`.
4. Put the Supabase URL and anon key in Vercel → Settings → Environment Variables. Have the build write them into the page.

---

## Kris's step-by-step (one-time setup)

You need a GitHub account (you have `krisjerickson`) and a Vercel account (sign up with GitHub, free "Hobby" plan).

### 1. Push the code to GitHub
- The repo on your PC is `C:\Claude\games\Zeldara-v4`. It already points at `https://github.com/krisjerickson/zeldara`.
- The GitHub repo still holds an old April upload ("Add files via upload"). I merged it into the local history, keeping the current files, so a normal push works and nothing is lost.

1. Open **PowerShell** (or Git Bash) in `C:\Claude\games\Zeldara-v4`.
2. Run:
   ```
   git status        # should say: On branch main, nothing to commit
   git push origin main
   ```
3. The first push opens a GitHub sign-in window (Git Credential Manager). Sign in, and it is remembered.
   - If no window appears, install **GitHub Desktop**, then File → Add local repository → this folder → **Push origin**.
4. Check `https://github.com/krisjerickson/zeldara`. You should see `src/`, `assets/`, `lab/`, `build.mjs`, `vercel.json` and the latest commit message.

### 2. Create the Vercel project
1. Go to https://vercel.com → **Sign up / Log in with GitHub**.
2. **Add New… → Project** → find **krisjerickson/zeldara** → **Import**.
   - If it isn't listed, click "Adjust GitHub App Permissions" and give Vercel access to that repo.
3. On the configure screen:
   - **Framework Preset:** Other.
   - **Root Directory:** `./`
   - **Build and Output Settings:** leave them as they are. `vercel.json` sets `npm run build` → `dist`.
   - **Environment Variables:** none needed.
4. Click **Deploy**. The build takes about 1 minute. You get a URL like `zeldara-xxxx.vercel.app`.
5. Optional: Project → Settings → **Domains** → set a nicer name (e.g. `quests-of-zeldara.vercel.app`) or add your own domain.

### 3. Check it
- Open the URL. The title should show **NEW GAME**. Type your name, pick a slot, play, then reload: **RETURNING PLAYER** should show your name.
- Open `…/lab` for the Design Lab. Lab picks made there are saved in that browser, not in the Claude Lab database.
- Send the link to your players. Each of them types their own name.

### 4. From then on
- Every push to `main` redeploys in about 1 minute. Pushing to any other branch makes a **preview link**, which is handy to test before merging.
- I (Claude) commit on your PC. You run `git push` when you want the change live. If you'd like, I can push for you in the future once the PC is signed in to GitHub.
- If a deploy fails: Vercel → the project → **Deployments** → the red one → **Build Logs**. You can also run `npm install` then `npm run build` on the PC; it shows the same error.

### Good to know
- **Saves stay on each player's device and browser.** Clearing browser data deletes them, so tell players to use **⤓ Export** now and then as a backup.
- **Preview deployments** (branches) are protected by Vercel sign-in by default. The production URL is public.
- **Cost:** the Hobby plan is free for personal, non-commercial projects. 10 players is far below any limit.
