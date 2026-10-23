# Zeldara audio round 80: THE GENTLE, ETHEREAL REMAKE OF EVERY SOUND EFFECT (Kris: "the sound effects in the game so far are to harsh
# and piercing ... much more gentle, somewhat ethereal"; "remake every sound effect, but then in the lab, i want to have these as options
# to choose between"; "skills should also have their own sounds"; "when mounting, we should have a sound like the animal you mount").
# 148 effects - today's 107 re-described the gentle way, plus 29 new skill and spell sounds and 11 mount calls - two options each, by the
# ElevenLabs Sound Effects API: about 14,000 credits. Saved as audio\incoming\<id>.e1.mp3 and <id>.e2.mp3 beside today's takes; they
# stay out of the game until you pick in the Lab (Music & sound) - today's take, option 1 or option 2, per effect.
# A sound already in audio\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\audio\audio2.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not (Test-Path 'sprites\requests\audio.json')) { node build.mjs | Out-Null }
if (-not $env:ELEVENLABS_API_KEY) {
  $k = Read-Host 'Paste your ElevenLabs API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:ELEVENLABS_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/audio/sfx.mjs --set ethereal --dry-run | Select-Object -First 1
Write-Host "`n2/2  The ethereal sound effects - sending:" -ForegroundColor Cyan
node tools/audio/sfx.mjs --set ethereal --takes 2 --concurrency 2
Write-Host "`nDone. Tell Claude the new sounds are in - they go to the Lab to pick from. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
