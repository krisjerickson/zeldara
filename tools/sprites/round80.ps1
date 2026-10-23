# Zeldara round 80: THE TWIN'S LIBRARY (wave 90, src/js/07zt7-art-r80.js) - the Norse timber saga-hall near your Home (two takes to
# pick from in the Lab), its furniture and wall pieces, and the second bed in your Home (empty by day; the twin asleep in it at night,
# a Zeldor and a Zeldara version). 4 sheets.
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round80.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
foreach ($r in @('sc_glimmerhall','sc_vill_core_1','sc_int_1','hero_m.model','hero_f.model','sc_twin_study')) { if (-not (Test-Path "sprites\incoming\$r.png")) { Write-Host "Missing sprites\incoming\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 90 --dry-run
Write-Host "`n2/2  Wave 90, the library - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 90 --concurrency 3
Write-Host "`nDone. Tell Claude the round 80 images are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
