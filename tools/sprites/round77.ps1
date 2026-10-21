# Zeldara round 77 (the round 72 health check): THE LODESTAR'S ICON - the one item in the game that had no painted icon (wave 83, sc_ic_lodestar).
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round77.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round77.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not (Test-Path "sprites\incoming\sc_ic_ui_1.png")) { Write-Host "Missing sprites\incoming\sc_ic_ui_1.png - ask Claude to put it back." -ForegroundColor Red; exit 1 }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids sc_ic_lodestar --dry-run
Write-Host "`n2/2  The Lodestar icon - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids sc_ic_lodestar
Write-Host "`nDone. Tell Claude the round 77 icon is in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
