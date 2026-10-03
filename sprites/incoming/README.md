# Sprite intake

Save each generated sheet here as `<request id>.png`, for example:

```
sprites/incoming/hero_m.model.png
sprites/incoming/meadow_goblin.core.s.png
```

- The request ids and full request texts are in `sprites/requests/` (made by `node build.mjs`) and in the Design Lab → Sprite Library tab (Copy request).
- The two style references to attach are in `sprites/reference/`.
- `node tools/sprites/generate.mjs --wave N` saves into this folder by itself.
- Transparent background preferred; one flat colour also works. Tell Claude when a batch is in, or run `python tools/sprites/intake.py`.

The six empty folders (blacksmith, firefly, goblin, goblin_king, horse, skeleton) are from the earlier concept pilot and are no longer used.
