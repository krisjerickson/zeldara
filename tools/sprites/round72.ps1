# Zeldara round 69: FIVE SAGA PANELS AGAIN, WITHOUT THE HERO (doc 30).
#   Scenery wave 77 (5 panels): the storm on the runestones, the Ash Night, the Stone-Fall, the Black Tide, the Long Quiet - they happen
#   long before the twins were born, so no hero in them this time. The six good panels from round 71 are the style reference.
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round72.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round72.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
foreach ($r in @('sc_pn_saga_cradles','sc_pn_saga_basket')) { if (-not (Test-Path "sprites\incoming\$r.png")) { Write-Host "Missing sprites\incoming\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 77 --dry-run
Write-Host "`n2/2  Five saga panels without the hero (scenery wave 77) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 77 --concurrency 3
Write-Host "`nDone. Tell Claude the round 72 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
