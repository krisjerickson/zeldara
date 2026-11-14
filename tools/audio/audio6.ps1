# Zeldara audio round 104: REMAKE ALL - five brand-new takes for each effect in sprites\requests\sfx_remake.json (the words are also in
# sprites\requests\sfx_remake104.md, and in the Lab: Sound effects -> "Remake all"). Saved as audio\incoming\<id>.x1.mp3 ... .x5.mp3.
# A take already in audio\incoming is skipped, so it is safe to run again (it only sends what is missing).
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\audio\audio6.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
node build.mjs | Out-Null
if (-not $env:ELEVENLABS_API_KEY) {
  $k = Read-Host 'Paste your ElevenLabs API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:ELEVENLABS_API_KEY = $k.Trim()
}
Write-Host "`n1/3  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/audio/sfx.mjs --set remake --dry-run
Write-Host "`n2/3  The new takes - sending:" -ForegroundColor Cyan
node tools/audio/sfx.mjs --set remake --concurrency 2
Write-Host "`n3/3  Into the Lab's player:" -ForegroundColor Cyan
python tools/audio/sfx_preview.py
Write-Host "`nDone. Tell Claude the new sounds are in - they show in the Lab (Sound effects, 'Remake all'). Lines starting with an X failed - run this again to retry." -ForegroundColor Green
