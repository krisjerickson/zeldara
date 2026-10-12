# 27 — Round 49 notes: dungeon lag, stairs, walls round the sites, soft effects

*Oct 12. Kris: "It was also laggy in the dungeon - look into if adding in the background imagery is causing lag and come up with ideas of how to address".*

## What the lag was

Measured in the test browser (software GPU, so the absolute times are not Kris's; the proportions and the GPU call counts are). Each part of a dungeon frame was switched off in turn, and the WebGL calls per frame were counted.

| Part | Share of the frame (before) | Note |
|---|---|---|
| **Darkness of dark floors** | **≈ 99 %** | A render texture the size of the whole floor (up to 2560 × 1920 px). Every frame it was cleared and filled, then cut once per light. Each cut was its own render pass over the whole picture. The GPU's capture buffer was also re-made every time it switched between this and the hero's outline. |
| Fog of war | small CPU, many triangles | Up to 50 000 rectangles in one Graphics, rebuilt into triangles every frame. |
| Hero's outline (behind things) | ~15 render passes a frame | Only when something stands in front of him. |
| Painted background (tile layers, drifting fog / clouds / sky, trees, vignette) | ≈ 1–3 % together | **Not the cause.** |

## What changed

- **Darkness:** it is now a small canvas picture of just the view plus a margin, at a quarter of the resolution (about 300 × 225 px). It is drawn with plain canvas operations (no render passes) and stretched up with smooth filtering. It looks the same because the darkness is soft anyway.
- **Fog:** one picture, one pixel per tile, stretched with hard edges. It is redrawn only when you uncover more.
- **Outline:** three batched passes instead of one per piece.
- **Result:** framebuffer binds per frame fell from 54 to 23, and no textures or framebuffers are made per frame any more (there were 2.2 re-makes a frame).

## Ideas if it still stutters on your PC (biggest first)

1. **F9 readout in a dungeon** — paste it here; it shows draw calls and the worst frame's cause.
2. **Darkness every other frame** — the light holes move slowly. This halves the upload.
3. **Bake the steady torches** into the floor picture's light, and cut holes only for the hero and moving lights.
4. **Hide the off-screen pieces** of the painted background and floor objects (as the overworld does, `WR_CULL`).
5. **A "lighter" switch** (Dev panel): no drifting pictures, no vignette, fewer trees round the site, a lower-resolution darkness.

## Stairs

Every one of the 203 site floors was checked in the running game, walking from where you arrive with the hero's own collision. Every way down (and every goal on a last floor) is reachable. The likely cause of "no stairs": on the big floors the stairs sit far off in the dark. The site minimap now marks the way down (gold) and the way back from the moment you arrive. Lightning Rod's vault is the exception: it stays hidden until its door is found, as asked in round 46.

## Walls round sites in open land

Where a floor would meet the open ground, a ring of wall is added outside it, showing its face to the land below. A built site's outer masonry is cleared, so the land comes right up to that wall. Trees and rocks are placed only where the whole picture, plus a margin, stands on open ground. This fixes the stage 4 mage towers, where trees stood over the walls.
