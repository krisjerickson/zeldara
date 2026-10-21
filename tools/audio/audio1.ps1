# Zeldara audio, wave 1 (round 72, doc 32; Kris's answers M1-M4): the ambience loops and sound effects of the first wave, made by the
# ElevenLabs Sound Effects API - 71 sounds, two takes each (about 27,000 credits: a Creator month has 121,000).
# The music is made by hand in Suno (Premier): Lab -> Music & sound -> "Copy for Suno" on each card, Instrumental on, download as
# audio\incoming\<cue id>.wav - then run the intake (step 3 below) for those too.
# A sound already in audio\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\audio\audio1.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\audio\audio1.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not (Test-Path 'sprites\requests\audio.json')) { node build.mjs | Out-Null }
if (-not $env:ELEVENLABS_API_KEY) {
  $k = Read-Host 'Paste your ElevenLabs API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:ELEVENLABS_API_KEY = $k.Trim()
}
Write-Host "`n1/3  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/audio/sfx.mjs --tier 1 --dry-run
Write-Host "`n2/3  The first wave of ambience and effects - sending:" -ForegroundColor Cyan
node tools/audio/sfx.mjs --tier 1 --takes 2 --concurrency 2
Write-Host "`n3/3  The intake (needs ffmpeg: winget install Gyan.FFmpeg, then a new PowerShell window):" -ForegroundColor Cyan
if (Get-Command ffmpeg -ErrorAction SilentlyContinue) { python tools/audio/intake_audio.py } else { Write-Host 'ffmpeg is not installed yet - install it, then run:  python tools/audio/intake_audio.py' -ForegroundColor Yellow }
Write-Host "`nDone. Tell Claude the audio is in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
