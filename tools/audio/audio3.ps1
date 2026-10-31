# Zeldara audio round 84: THE SOUND EFFECTS, WORDED BY WHAT HAPPENS (Kris: "we either need to improve the prompts so we get things that
# sound more like the action occuring, or perhaps find a new place to request these" - answered: both). Every effect asked again with its
# action first (what makes the sound, on what, how hard) and a short tail, prompt influence 0.8 - two takes each, saved as
# audio\incoming\<id>.n1.mp3 and .n2.mp3 beside the others. They go to the Lab first (Music & sound -> Pick the sounds), next to today's
# take, the round-80 gentle takes and the real recordings from the Sonniss library; nothing changes in the game until you pick.
# About 147 effects x 2 takes - roughly 13,000 ElevenLabs credits. A take already in audio\incoming is skipped, so it is safe to run again.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\audio\audio3.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
node build.mjs | Out-Null
if (-not $env:ELEVENLABS_API_KEY) {
  $k = Read-Host 'Paste your ElevenLabs API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:ELEVENLABS_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/audio/sfx.mjs --set v84 --takes 2 --dry-run | Select-Object -First 1
Write-Host "`n2/2  The effects - sending:" -ForegroundColor Cyan
node tools/audio/sfx.mjs --set v84 --takes 2 --concurrency 2
Write-Host "`nDone. Tell Claude the new sounds are in - they go to the Lab beside the library recordings. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
