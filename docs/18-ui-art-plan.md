# 18 — UI art plan: controls bar, inventory and menus (round 32)

> **Built in round 35** (changelog [319]–[327]): `ZIcon`, the frame, control bar and HUD, the new inventory, icons in shops / quick-pick / quests / mounts / familiars. Open: notifications, map canvas and legend, tome headings, status pills; the painted ornaments.

Kris, Oct 7: the controls at the bottom and the inventory "need better sprites or images … following the Zeldara themes". His choices: **every menu**; **frames drawn in code, icons painted**; inventory as **hero + gear slots + item grid**; **one icon per item**.

## What is there today
- **Bottom bar** (`#action-icon-bar`, `#action-bar` in `src/body.html`): 10 action slots and 7 menu buttons, all emoji on flat dark tiles.
- **HUD panel** (`#stats-panel`): emoji heart / drop / star / coin beside CSS bars.
- **Inventory** (`updateInventoryModal`, `21-ui.js`): 8 tabs; "Equipped" is a loose grid of dashed boxes with emoji; the other tabs are text rows with an emoji and an Equip button. No picture of the hero, no item detail, no comparison.
- **Items** (`ITEMS`, `03-data.js`): 206, sharing 79 emoji (ten helmets all show 🪖, thirteen shields 🛡️, ten leg pieces 🦵).
- The page holds about 745 emoji in all: shops, quick-pick, quests, tome, map legend, mounts, familiars, buffs.

## Art: 16 sheets, 312 icons
Same road as the scenery: `07zv-icons.js` → `sprites/requests/scenery.json` → `icons.ps1` → `sprites/incoming/sc_ic_*.png` → `intake_scenery.py` → `assets/scenery/icons-N.webp`.

| Wave | Sheet | Icons | What |
|---|---|---|---|
| 33 | `sc_ic_ui_1` (pilot, style anchor) | 25 | control bar (attack, ranged, ammo, defend, potion, food, spell, mount, familiar, special), menu buttons (map, quests, inventory, tome, help, sound on / off, tools), heart, mana, star, gold, key, lock, close |
| 33 | `sc_ic_ui_2` | 25 | 14 empty gear-slot silhouettes; inventory tabs; buy / sell |
| 33 | `sc_ic_ui_3` | 25 | map markers (18) and quest icons (7) |
| 33 | `sc_ic_ui_4` | 25 | status effects (12), elements (4), tome chapters (8), level up |
| 33 | `sc_ic_orn` | 6 | panel ornaments: corner, divider, header banner, medallion, arrow, name plate |
| 34 | `sc_ic_melee` (pilot), `sc_ic_ranged` | 22 + 19 | melee weapons; bows, staffs, arrows, darts |
| 35 | `sc_ic_armor`, `sc_ic_headlegs`, `sc_ic_handsfeet`, `sc_ic_neckback` | 25 + 20 + 20 + 22 | body armor and shields; headgear and legs; gauntlets and boots; amulets and cloaks |
| 36 | `sc_ic_treasure`, `sc_ic_potions`, `sc_ic_food`, `sc_ic_spells`, `sc_ic_skills` | 24 + 14 + 12 + 16 + 12 | rings, gems, keys, materials; potions; food; spell emblems; skill emblems |

Ids: `ui_*`, `sl_<slot>`, `tab_*`, `mk_*`, `q_*`, `st_*`, `el_*`, `tm_*`, `orn_*`, `ic_<item key>`. Item looks are made from the item's name and slot (`make_icons.py`; a keyword table gives flame / frost / storm / dragon / shadow / arcane / sky … their colours). Run `python tools/sprites/make_icons.py` after adding items.

Mounts, familiars, monsters, bosses and villagers need no icons: their painted sprites are used as thumbnails.

Cost at list prices: about $0.70 for the 16 sheets (estimate, from the scenery sheets' price).

## Frames in code (no art needed)
One set of CSS pieces, used by every menu, in the colours of the game's logo and the painted sprites:
- **Panel**: deep green-black stone, a double edge (dark outline + thin gold line), teal rune-light on the upper-left edge and a violet rim on the lower-right, as on the sprites; cut corners; the painted corner ornament on the four corners; a header banner with the title.
- **Slot tile** (controls bar, gear slots, item grid): bevelled dark stone tile, inner shadow; states: empty (slot silhouette), filled, hover (teal edge), selected (gold edge + glow), locked. A small key cap for the shortcut, a count badge, a thin tier line under the icon (tier colours as in shops today).
- **Button** and **tab**: carved plate, same edge treatment; pressed and active states.
- **Bars**: health / mana / experience in a carved channel with the painted icon on the left end.

## Inventory layout
- **Left**: the hero's painted sprite (his current look) on a round rune dais, gear slots round him in body order: head above, cloak and amulet at the shoulders, body in the middle, melee left hand, shield / ranged right hand, gauntlets, legs, boots; magic weapon, spell and skill in a row below; rings in a strip. Empty slots show their silhouette.
- **Right**: filter tabs with icons (all, weapons, armor, accessories, ammo, food, gems, potions) over a grid of item tiles; what is worn is marked.
- **Bottom / side**: detail panel for the tile under the pointer or selected: large icon, name, tier, what it does, and the change against what is worn (green / red numbers); buttons Equip / Use / Unequip. Stats block (level, health, attack, defense, mana, gold) with painted icons.
- Keys and mouse as today (I opens, click to select, double-click or Enter to equip / use); nothing about items, slots or saves changes.

## Order of work
1. `ZIcon`: an icon by id as an `<i>` with the picture, the emoji as fallback while a sheet is missing (so sheets can arrive in any order) — in the page and in the Phaser scenes.
2. Frames in code; controls bar and HUD (the pilot sheet covers them).
3. New inventory; quick-pick; shops (same tiles).
4. Quests, tome, map legend and markers, mounts, familiars, spells and skills, buffs, notifications.
5. Tests: every item has an icon id; every emoji left in the page is listed and intended.

## Settled (Kris, round 35)
- Bar: icon + key, name on hover. Hero in the inventory: idle animation.
