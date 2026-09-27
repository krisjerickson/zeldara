Zeldara V4 — Sprite Library
=============================

sprites/
└── hero/                       Hero character (more entity sub-folders to come:
    ├── front/   front_0..7     monsters/, npcs/, etc.)
    ├── back/    back_0..3      Used when walking UP
    ├── side/    side_0..7      Used when walking RIGHT (mirrored for LEFT)
    ├── attack/  attack_0..6    Sword swing on SPACE
    └── source/                 Original AI-generated source sheets
        ├── attack_sheet_source.png
        └── back_view_source.png

Frame format
  - PNG with transparent background, character bottom-aligned + horizontally
    centered. Walk cells are 64×105; attack cells are 96×105 (wider so the
    extended sword fits).
  - front_0 / side_0 / back_0 are the standing/idle poses (frame shown when
    not moving).
  - front_3 onwards is the actual walking cycle — frames 0/1/2 are the
    stationary breathing poses we skip while moving.

In-game cycle
  - 10 fps. Idle snaps to the per-direction frame 0.
  - down  → front 3-7,  up  → back 1-3,  left/right → side 1-7
  - SPACE → attack 0-6 plays over ~0.45 s (works while walking).

Attack hits a 120° cone in the facing direction (no more 360° sword spin).

Editing workflow
  1. Edit any of the PNGs in this tree.
  2. Tell me you're done — I'll re-bake them into base64 inside
     C:\Claude\games\zeldara-v4-game.html. The HTML inlines the sprites,
     so file edits don't take effect until I rebundle.

Adding a new entity
  - Create sprites/<entity>/<state>/<state>_0..N.png with the same conventions.
  - Tell me what the entity is and what states/cycles it has, and I'll wire
    it into the renderer.
