# 22 — Performance: the lag around the village (round 44)

*Oct 10. Kris: "we're having lag issues, especially around in the village. Check to see what is causing this and come up with recommendations on how to fix it" — and "when you enter your house, sometimes the bed and other features are not showing up".*

## How it was measured

Profiled in the test browser (headless Chromium with a software GPU) using the DevTools CPU profiler, WebGL draw-call counts, and per-phase timings of the chunk painter. **Caveat:** that browser draws everything on the CPU (about 2 fps), so its frame times are not your frame times. The JavaScript costs below are real; the drawing costs are estimates. Your own numbers can come from the new readout (below).

## What costs the most

| Where | Measured | Effect |
|---|---|---|
| Painting a ground chunk (1024 × 1024 px) on the main thread | 90–360 ms per chunk (village 120–170 ms, sea 360 ms); split into 6–14 ms slices, but single steps reached **57 ms** | the stutter while walking — every new chunk |
| Mounting a finished chunk (uploading its pictures to the GPU) | 10–38 ms each, **in the same frame** as the last painting step | a long frame every time a chunk appeared |
| World monsters | 803 monster objects exist all the time (≈3 200 display objects, hidden when far) | the scene's list is re-sorted whenever something changes depth |
| Lights in the village | 196 additive glow images, ≈2.6 M px² of glow (est. ≈10 M screen pixels a frame) | GPU fill — the main village-only cost (estimate) |
| Draw calls | ≈300 a frame in the village | many texture switches |
| Round 43 terrain life | 270–460 swaying images and 25–45 animals around the hero | small in JS (< 0.6 ms/frame), adds draw calls |

## Fixed now (round 44)

1. **Chunks wholly off screen are not drawn** — their pieces, lights, animals and emitters are hidden until they come back into view (8 mounted chunks → 2 hidden in the test, 226 objects not drawn).
2. **Mounting is spread out** — a finished chunk is mounted at the start of a later frame, one per frame, instead of in the frame that painted it.
3. **Finer slices** — the moving-water frames are painted one per step (were two).
4. **Swaying and animals only on screen** — off-screen chunks skip the wind and the animals.
5. **The vanishing bed** — not lag: a painted piece's picture was emptied after its first use (to save memory) and then reused. Pictures that are reused are now kept, and an emptied one is redrawn. The bed, the chest and the rest show on every visit.
6. **Performance readout** — Dev panel → "📈 Performance readout", or **F9**, or `?perf=1`. It shows fps, average and worst frame (and what caused the worst one: painting, mounting, or the game/drawing), draw calls, objects drawn, painting and mounting time per second, and where you are. **Copy the last 10 s** puts it on the clipboard to paste to Claude.

## Recommended next (biggest first)

1. **Paint the ground textures and the moving-water frames in the worker** (OffscreenCanvas) — they are the 30–200 ms steps that still run on the main thread. Expected: most of the walking stutter gone. Effort: large (a day of work).
2. **Create monsters only near the hero** (about 1.5 screens) and release them when far; today all 803 exist. Expected: a smaller, faster display list everywhere. Effort: medium.
3. **Bake the steady lights** (lamps, windows) into one light picture per chunk; keep only pulsing ones as separate glows. Expected: the village's GPU cost down sharply (most of its 196 glows are steady). Effort: medium.
4. **One shared texture for all painted terrain pieces** (swaying plants, animals), so they draw in a few batches instead of switching textures. Effort: small.
5. **Keep the village's painted chunks in memory** when you walk away (a small cache), so coming back does not repaint them. Effort: small.
6. **A "lighter" setting** in the Dev panel: 12 samples per tile instead of 16 for the terrain edges, fewer swaying pieces, no flipbook — for slower machines. Effort: small.

What would help me most: open the game on your PC, walk into the village with the readout on (F9), press **Copy the last 10 s** and paste it here — it tells which of the above matters on your machine.
