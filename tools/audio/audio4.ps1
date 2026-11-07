# Zeldara audio round 89: NEW TAKES FOR THE EFFECTS WITH FEWER THAN THREE PICKS (Kris: "Considered all non-picked sounds as discarded ...
# create 5 new options for each of the unpicked ones ... 3-5 new options for each of the sounds that have less than 3 already picks").
# 105 effects, 389 new takes, every one from its own new prompt (src/js/07zau5-sfx89.js), saved as audio\incoming\<id>.v1.mp3 ... .v5.mp3.
# They go to the Lab first (Sound effects -> Round 89 - new takes), beside the takes you already kept; nothing changes in the game until you pick.
# A take already in audio\incoming is skipped, so it is safe to run again (it only sends what is missing).
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\audio\audio4.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
node build.mjs | Out-Null
if (-not $env:ELEVENLABS_API_KEY) {
  $k = Read-Host 'Paste your ElevenLabs API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:ELEVENLABS_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/audio/sfx.mjs --set v89 --dry-run | Select-Object -First 1
Write-Host "`n2/2  The new takes - sending:" -ForegroundColor Cyan
node tools/audio/sfx.mjs --set v89 --concurrency 2
Write-Host "`nDone. Tell Claude the new sounds are in - they go to the Lab beside the takes you kept. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
