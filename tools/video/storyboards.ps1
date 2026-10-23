# Zeldara round 79: the story cut-scenes' pictures, ready for the video app. Run after round79.ps1 (or while it runs - safe to repeat).
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\video\storyboards.ps1
# Makes sprites\storyboards\<cut-scene>\<zeldor|zeldara|all>\ with the frames in order (01.png, 02.png ... cropped to 16:9) and
# montage.txt - the words to paste into the video app (the montage instruction, every shot with its line, the negative prompt) -
# then opens the folder. Make one montage clip per folder and save it as <cut-scene>_<who>.mp4 (e.g. spirit_zeldor.mp4), or one clip
# per shot as <cut-scene>_<who>_<nn>.mp4 (spirit_zeldor_01.mp4 ...) - then  .\tools\video\video1.ps1 -Intake  joins and takes them in.
Set-Location (Join-Path $PSScriptRoot '..\..')
python tools/video/storyboards.py
if ($LASTEXITCODE -ne 0) { Write-Host "`nThe storyboards were not made (see the error above)." -ForegroundColor Red; exit 1 }
Start-Process explorer.exe (Resolve-Path sprites\storyboards)
Write-Host "`nOne montage per folder; then  .\tools\video\video1.ps1 -Intake" -ForegroundColor Green
