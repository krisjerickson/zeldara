# Zeldara round 73b: THE CUT-SCENE CLIPS, MADE BY HAND (Kris: "we have few enough videos we don't need to use an api, i can hand place
# the requests"). No key, nothing sent from here.
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\video\video1.ps1            1) makes the first frames (sprites\video_frames\<id>.png, 16:9) with <id>.txt beside each
#                                          (the words to paste) and opens the folder
#   .\tools\video\video1.ps1 -Intake    2) after you have downloaded the clips: takes them in from your Downloads, then builds
# In the video app: start image = the frame, prompt = the PROMPT in the .txt (or the Copy box in the Lab, tab "Cut-scene clips"),
# 16:9, about 8 seconds; download, and name the file <id>.mp4 (or leave the name - step 2 asks which clip each new video is).
# Wave 1 (the pilot, 5 clips) needs round 78's pictures first (.\tools\sprites\round78.ps1) - until then its frames are listed as missing.
param([switch]$Intake, [int]$Wave = 0)
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $Intake) {
  if ($Wave -gt 0) { python tools/video/frames.py --wave $Wave } else { python tools/video/frames.py }
  if ($LASTEXITCODE -eq 0) { Start-Process explorer.exe (Resolve-Path sprites\video_frames) }
  Write-Host "`nMake the clips in the video app, then run:  .\tools\video\video1.ps1 -Intake" -ForegroundColor Green
  exit 0
}
python tools/video/intake_video.py --from "$env:USERPROFILE\Downloads" --ask
node build.mjs | Select-String 'video|index.html'
Write-Host "`nDone. Tell Claude the clips are in." -ForegroundColor Green
