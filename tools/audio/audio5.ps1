# Zeldara audio round 93: THEMATIC TAKES - five to choose from for every effect (Kris: "making sure that the sounds are thematic. A lightning
# spell should sound like lightning. Starfall should make you think of a shooting star"). The takes you kept stay; the new words name the real
# sound first (src/js/07zau7-sfx93.js, from tools/audio/sfx93_words.py) and are saved as audio\incoming\<id>.w1.mp3 ... .w5.mp3.
# A take already in audio\incoming is skipped, so it is safe to run again (it only sends what is missing).
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\audio\audio5.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
node build.mjs | Out-Null
if (-not $env:ELEVENLABS_API_KEY) {
  $k = Read-Host 'Paste your ElevenLabs API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:ELEVENLABS_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/audio/sfx.mjs --set v93 --dry-run | Select-Object -First 1
Write-Host "`n2/2  The new takes - sending:" -ForegroundColor Cyan
node tools/audio/sfx.mjs --set v93 --concurrency 2
Write-Host "`nDone. Tell Claude the new sounds are in - they go to the Lab (Sound effects, top). Lines starting with an X failed - run this again to retry." -ForegroundColor Green
