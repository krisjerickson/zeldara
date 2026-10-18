# Zeldara round 65b: Surtharn's intro cut-scene panel (scenery wave 71) - one painted panel as he first rises.
# Solmyrk's intro panel and his sprite sheets come once his three forms are picked in the Lab.
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round67.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round67.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  Surtharn's intro panel (wave 71) - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 71 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 71 --concurrency 2
Write-Host "`nDone. Tell Claude the round 67 sheet are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
