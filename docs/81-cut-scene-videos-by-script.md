# 81: Cut-scene videos made by script (round 126)

Kris: "if we can script this, that would be ideal, i got a great output from this one `video_requests\04_bram_zeldara_p1` … Let's set that up if possible!"

## What made the Bram video work
The Flow output (`Untitled_Scene_…mp4`) runs 19.9 s at 1280×720 and 24 fps. It has hard cuts at 4, 8, 12 and 16 s: five 4-second clips, each starting exactly on `image1`–`image5`. So every shot begins on its painting, and the edit is simple. Shot 5 drifts away from its painting the most, which is why each shot is now sent on its own with its own words.

## Google's side
- **Google Flow** has no API and no MCP.
- **Veo 3.1 Preview** in the Gemini API was shut down on 22 Oct 2026. Its replacement is **Gemini Omni Flash**, used through the Interactions API (models `gemini-omni-1.2-flash`, then `gemini-omni-1.1-flash`).
- The request shape is taken from Google's own SDK (google-genai 3.6.1). The script sends one `image_to_video` request per painting: 16:9, 4 s, 720p, the picture first and then the words. It polls until the clip is done, then saves it.

## How to run it
```
cd C:\Claude\games\Zeldara-v4
.\tools\video\omni.ps1 -Folder 04_bram_zeldara_p1 -Dry       # shows what would be sent; sends nothing
.\tools\video\omni.ps1 -Folder 04_bram_zeldara_p1            # makes every shot not yet made
.\tools\video\omni.ps1 -Folder 04_bram_zeldara_p1 -Shots 5   # just shot 5 (rename clips\shot05.mp4 first to redo it)
```
- **The key:** the script asks for your Gemini API key (from aistudio.google.com). It stays in that PowerShell window and is never written to disk.
- **The clips** go to `<folder>\clips\shot01.mp4` and so on. A shot already made is kept, so it is safe to stop and run again.
- **The finished video:** when every shot is in, the clips are joined with hard cuts and no sound into the folder's **SAVE AS** name (e.g. `bram_zeldara_p1.mp4`). `intake_video.py` takes it in like any Kling download.
- **Options:**
  - `-Model gemini-omni-1.1-flash` to try the older model.
  - `-Secs 6` for longer shots.
  - The script also takes `--res 1080p`.

## The words sent for each shot
They come from the folder's `PROMPT.txt` (the Locked Shot List):
- the LOOK;
- the shot's title;
- the painting (START);
- the actions in order;
- the end frame;
- the shot's special camera, if it has one;
- an ask for strong, clear motion with the same people and colours as painted, no cuts, no text and no speech.

The **NOT IN THIS SHOT** list is never sent as names, because a video model shows the things it is told about (doc 62). Instead it is said the other way round: a bridge not yet built becomes "the water stays open from bank to bank".

## Cost and checks
- **Cost:** about **$0.10 a second at 720p**, from third-party estimates that are not yet verified. That is about $2 for a 20-second cut-scene, plus any redos. Check the Google bill after the first run.
- **Not yet confirmed:** the exact duration format. The script sends `"4s"` and falls back to `"4"` if Google refuses it; the first real run will settle it.
- **Tests:** `test_round126` (8 checks). They use a dry run on a test folder, so nothing is sent.
