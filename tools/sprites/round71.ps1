# Zeldara round 68d: THE HAMLETS and THE FIRST SAGA PANELS (doc 30).
#   Scenery wave 75 (6 sheets): a workshop for each of the 20 trades of the freed spirits (4 per sheet) and a sheet of new cottages,
#   a well, a play yard and a settler's cart - the hamlets that stand in the runestone rings after the credits.
#   Scenery wave 76 (11 panels): the opening (the empty cradles, the storm, the basket, the twins raised, their rune eyes, the send-off)
#   and the old disasters (Ash Night, Stone-Fall, Black Tide, the Long Quiet, the gate shut).
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round71.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round71.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
foreach ($r in @('sc_vill_core_2','sc_vill_houses','sc_pn_end_dawn_b','sc_pn_end_home_b')) { if (-not (Test-Path "sprites\incoming\$r.png")) { Write-Host "Missing sprites\incoming\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/3  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 75 --dry-run
node tools/sprites/generate.mjs --set scenery --wave 76 --dry-run
Write-Host "`n2/3  The hamlets (scenery wave 75, 6 sheets) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 75 --concurrency 3
Write-Host "`n3/3  The first saga panels (scenery wave 76, 11 panels) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 76 --concurrency 3
Write-Host "`nDone. Tell Claude the round 71 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
