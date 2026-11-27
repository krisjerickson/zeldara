# 97 · Round 141: every Flow prompt matched to its final picture, and the Lab picks acted on

## Flow
- **The third try** (r140_flow, 59 pictures): Kris ✓ 16 of the 17 problems and Vela's new sky-captain sheet.
- **Opening 4** (`sc_sb_opening_04`): the third try had no chains at all. It is painted once more (`r141_redo`): every spirit in small, human-sized iron shackles, the chains led back to the hooded Binder, none in the sky.
- **The prompts** (`tools/video/flow.py`): all 368 shot prompts are rebuilt.
  - `ACT141`: the actions for every third-try picture, written from what each one now shows. Examples: the Lodestar raised on the causeway, kneeling by the dark Lodestar in the notch, Vela at the deck rail, the skiff gliding in to the cliff landing.
  - `RULE141`: a rule for every shot of a scene.
    - Surtharn's six scenes: deep underground, no sky, aurora or stars; the spirits are villagers, not skulls or demons.
    - The opening: the chains are small and human-sized.
    - The celebration: only grown-ups until shot 4, the first child.
  - Every shot that names the Lodestar also describes it: a white-gold twisted staff whose head is a gold ring of six coloured gems round a glowing lens.
  - Notes: `WAIT … (round 141)` marks opening 4 until it is painted again. The old round-138 notes are renamed `READY`.
- **Vela in the game** (`crafts_4.core.f`): painted again from her new sheet (`ZSPR.REWORD`, `ZSPR.REFX`), in `r141_redo`.

## The picks
| Lab | Pick | Done |
|---|---|---|
| The fair greeter | Marta | She is the greeter (playing since round 140c). |
| Health & mana bars | World Tree roots; "the numbers need to be easier to see" | The inventory bars sit in the painted roots frame. Heart and drop are in the socket. Numbers are 16 px, heavy, white and outlined, right on the bar. |
| The crypt | The long hall; the door that grows | The door on the Green shows its stage (6 paintings: none beaten, 1–4, 5–12, 13–16, the end, the end at night). Asked: the hall as a room at 5 stages and its pieces (`r141_crypt`, 6 sheets). The echoes need no painting: each guardian's own figure as a still, pale-blue echo. The hall itself is built when its paintings are in. |
| What should move | ✓ every row | **In code now** (`ZMOVE.CODE`): the kite and the boats sway; the wind harp, glowing plants and wisps breathe light; bees round the hives; smoke from the forge chimney; the crypt runes. **Painted loops asked** (`r141_motion`, 13 sheets, 26 loops): fires, torches, braziers, the bonfire, candles, fountains, banners, the laundry, the flower pole, the bellows, the spinning wheel, the sun-wheel, the crystal ball, the portal. `ZMOVE` plays each as soon as it is in, in rooms, the world, dungeons and placed pieces (`Z3.img`). |

## For Kris to run
```
.\tools\sprites\redo.ps1 -List r141_redo
.\tools\sprites\paint.ps1 -List r141_paint
python tools/video/storyboards.py
python tools/video/flow.py
```
