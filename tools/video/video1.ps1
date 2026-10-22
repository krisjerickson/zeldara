# Zeldara round 73 (answer C1): THE FIRST CUT-SCENE CLIPS - wave 1, the pilot (5 clips): the Lodestar made, the chains falling away,
# Bram's bridge, the twins casting Godsbane, the World Tree under the lake. Each starts from its painted panel, so run round78.ps1 first
# (and tell Claude the images are in) - a clip whose panel is not in yet is skipped.
# A clip already in sprites\video_incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\video\video1.ps1                (or:  .\tools\video\video1.ps1 -Res 360p   for cheap drafts)
# The key is a Google AI Studio (Gemini API) key on a paid project. It is read from this window and never written to disk.
param([string]$Res = '720p', [int]$Wave = 1)
Set-Location (Join-Path $PSScriptRoot '..\..')
Write-Host "`n1/3  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
python tools/video/clips.py --wave $Wave --res $Res --dry-run
if ($LASTEXITCODE -ne 0) { exit 1 }
if (-not $env:GEMINI_API_KEY) {
  $k = Read-Host 'Paste your Gemini API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:GEMINI_API_KEY = $k.Trim()
}
Write-Host "`n2/3  Wave $Wave - sending (each clip takes a minute or two):" -ForegroundColor Cyan
python tools/video/clips.py --wave $Wave --res $Res
Write-Host "`n3/3  Taking the clips in:" -ForegroundColor Cyan
python tools/video/intake_video.py
node build.mjs | Select-String 'video|minified game'
Write-Host "`nDone. Tell Claude the clips are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
